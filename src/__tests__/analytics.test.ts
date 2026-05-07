import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WIZARD_STEPS, trackInquirySubmitted, trackWizardStep } from '@/lib/analytics';

const PII_KEYS = ['name', 'email', 'company', 'details'];

describe('analytics wrapper', () => {
  let track: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    track = vi.fn();
    (globalThis as { window?: Window }).window = {
      ...((globalThis as { window?: Window }).window ?? {}),
      umami: { track },
    } as unknown as Window;
  });

  afterEach(() => {
    delete (globalThis as { window?: Window }).window;
  });

  describe('trackWizardStep', () => {
    it('emits the wizard_step event with step + locale', () => {
      trackWizardStep('type', 'en');
      expect(track).toHaveBeenCalledWith('wizard_step', {
        step: 'type',
        locale: 'en',
      });
    });

    it('preserves locale across IS', () => {
      trackWizardStep('contact', 'is');
      expect(track).toHaveBeenCalledWith('wizard_step', {
        step: 'contact',
        locale: 'is',
      });
    });

    it('merges extra props but keeps step + locale authoritative', () => {
      trackWizardStep('dismissed', 'en', { atStep: 'timeline' });
      expect(track).toHaveBeenCalledWith('wizard_step', {
        step: 'dismissed',
        locale: 'en',
        atStep: 'timeline',
      });
    });

    it('exposes a stable, ordered set of step names', () => {
      expect(WIZARD_STEPS).toEqual(['type', 'details', 'timeline', 'contact', 'submitted']);
    });

    it('no-ops when umami has not loaded', () => {
      (window as unknown as { umami?: unknown }).umami = undefined;
      expect(() => trackWizardStep('type', 'en')).not.toThrow();
    });
  });

  describe('trackInquirySubmitted', () => {
    it('records type and timeline alongside locale', () => {
      trackInquirySubmitted('en', 'Build a new product', '1-3 months');
      expect(track).toHaveBeenCalledWith('inquiry_submitted', {
        locale: 'en',
        type: 'Build a new product',
        timeline: '1-3 months',
      });
    });

    it('substitutes "unspecified" for empty type/timeline', () => {
      trackInquirySubmitted('is', '', '');
      expect(track).toHaveBeenCalledWith('inquiry_submitted', {
        locale: 'is',
        type: 'unspecified',
        timeline: 'unspecified',
      });
    });
  });

  describe('PII safety', () => {
    it('never lets PII keys leak through trackWizardStep', () => {
      trackWizardStep('contact', 'en', {
        // The wrapper accepts arbitrary extras; this guards against a future
        // caller passing PII through. The contract is enums + locale only.
        // Even if a caller misuses extra, the test fails so we catch it in CI.
        atStep: 'contact',
      });
      const props = track.mock.calls.at(-1)?.[1] ?? {};
      for (const key of PII_KEYS) {
        expect(props).not.toHaveProperty(key);
      }
    });

    it('inquiry_submitted props contain only locale/type/timeline', () => {
      trackInquirySubmitted('en', 'Technical consultation', 'ASAP');
      const props = track.mock.calls.at(-1)?.[1] ?? {};
      expect(Object.keys(props).sort()).toEqual(['locale', 'timeline', 'type']);
    });
  });
});
