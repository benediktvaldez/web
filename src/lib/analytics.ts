import type { Locale } from '@/i18n/config';

export const WIZARD_STEPS = ['type', 'details', 'timeline', 'contact', 'submitted'] as const;
export type WizardStep = (typeof WIZARD_STEPS)[number] | 'dismissed';

declare global {
  interface Window {
    umami?: {
      track: (event: string, props?: Record<string, string>) => void;
    };
  }
}

export function trackWizardStep(step: WizardStep, locale: Locale, extra?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  window.umami?.track('wizard_step', { step, locale, ...extra });
}

export function trackInquirySubmitted(locale: Locale, type: string, timeline: string) {
  if (typeof window === 'undefined') return;
  window.umami?.track('inquiry_submitted', {
    locale,
    type: type || 'unspecified',
    timeline: timeline || 'unspecified',
  });
}
