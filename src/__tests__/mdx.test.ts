import { describe, it, expect } from 'vitest';
import { getAllPosts, getPostLocale } from '@/lib/mdx';

describe('MDX utilities', () => {
  describe('getAllPosts', () => {
    it('returns english posts', () => {
      const posts = getAllPosts('en');
      expect(posts.length).toBeGreaterThan(0);
    });

    it('posts have required fields', () => {
      const posts = getAllPosts('en');
      for (const post of posts) {
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('date');
        expect(post.slug).toBeTruthy();
        expect(post.title).toBeTruthy();
      }
    });

    it('posts are sorted by date descending', () => {
      const posts = getAllPosts('en');
      for (let i = 1; i < posts.length; i++) {
        expect(posts[i - 1].date >= posts[i].date).toBe(true);
      }
    });

    it('returns empty for locale with no posts', () => {
      const isPosts = getAllPosts('is');
      // is/ directory exists but has no .mdx files
      expect(isPosts.length).toBe(0);
    });
  });

  describe('getPostLocale', () => {
    it('returns en for english posts', () => {
      expect(getPostLocale('hello-world', 'en')).toBe('en');
    });

    it('falls back to en for missing icelandic post', () => {
      expect(getPostLocale('hello-world', 'is')).toBe('en');
    });
  });
});
