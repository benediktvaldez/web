import { describe, it, expect } from 'vitest';
import { socialLinks } from '@/content/social';

describe('social links', () => {
  it('has all expected platforms', () => {
    const names = socialLinks.map((l) => l.name);
    expect(names).toContain('GitHub');
    expect(names).toContain('LinkedIn');
    expect(names).toContain('Instagram');
    expect(names).toContain('Email');
  });

  it('all external links have valid URLs', () => {
    for (const link of socialLinks.filter((l) => l.external)) {
      expect(link.href).toMatch(/^https:\/\//);
    }
  });

  it('email link uses mailto protocol', () => {
    const email = socialLinks.find((l) => l.name === 'Email');
    expect(email?.href).toMatch(/^mailto:/);
    expect(email?.external).toBe(false);
  });

  it('all links have an iconName', () => {
    for (const link of socialLinks) {
      expect(link.iconName).toBeTruthy();
    }
  });
});
