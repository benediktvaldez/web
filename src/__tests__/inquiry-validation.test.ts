import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Mirror the schema from actions.ts for unit testing without server deps
const inquirySchema = z.object({
  type: z.string().min(1),
  details: z.string().optional().default(''),
  timeline: z.string().optional().default(''),
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional().default(''),
  locale: z.string().min(2).max(2),
});

describe('inquiry validation', () => {
  it('accepts valid complete submission', () => {
    const result = inquirySchema.safeParse({
      type: 'Build a new product',
      details: 'A recipe app',
      timeline: '1-3 months',
      name: 'Test User',
      email: 'test@example.com',
      company: 'Acme Inc',
      locale: 'en',
    });
    expect(result.success).toBe(true);
  });

  it('accepts minimal submission (only required fields)', () => {
    const result = inquirySchema.safeParse({
      type: 'Something else',
      name: 'Test',
      email: 'test@example.com',
      locale: 'en',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing type', () => {
    const result = inquirySchema.safeParse({
      type: '',
      name: 'Test',
      email: 'test@example.com',
      locale: 'en',
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing name', () => {
    const result = inquirySchema.safeParse({
      type: 'Build a new product',
      name: '',
      email: 'test@example.com',
      locale: 'en',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = inquirySchema.safeParse({
      type: 'Build a new product',
      name: 'Test',
      email: 'not-an-email',
      locale: 'en',
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing email', () => {
    const result = inquirySchema.safeParse({
      type: 'Build a new product',
      name: 'Test',
      email: '',
      locale: 'en',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid locale', () => {
    const result = inquirySchema.safeParse({
      type: 'Build a new product',
      name: 'Test',
      email: 'test@example.com',
      locale: 'english',
    });
    expect(result.success).toBe(false);
  });

  it('defaults optional fields to empty string', () => {
    const result = inquirySchema.safeParse({
      type: 'Technical consultation',
      name: 'Test',
      email: 'test@example.com',
      locale: 'is',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.details).toBe('');
      expect(result.data.timeline).toBe('');
      expect(result.data.company).toBe('');
    }
  });
});
