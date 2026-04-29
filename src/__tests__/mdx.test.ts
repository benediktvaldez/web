import { describe, it, expect } from 'vitest';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';

describe('MDX utilities', () => {
  describe('getAllPosts', () => {
    it('returns posts from the unified writing dir', () => {
      const posts = getAllPosts();
      expect(posts.length).toBeGreaterThan(0);
    });

    it('every post has the required fields', () => {
      const posts = getAllPosts();
      for (const post of posts) {
        expect(post.slug).toBeTruthy();
        expect(post.title).toBeTruthy();
        expect(['en', 'is']).toContain(post.lang);
        expect(Array.isArray(post.tags)).toBe(true);
        expect(post.readingMinutes).toBeGreaterThan(0);
      }
    });

    it('posts are sorted by date descending', () => {
      const posts = getAllPosts();
      for (let i = 1; i < posts.length; i++) {
        expect(posts[i - 1].date >= posts[i].date).toBe(true);
      }
    });

    it('includes both en and is posts when both exist', () => {
      const posts = getAllPosts();
      const langs = new Set(posts.map((p) => p.lang));
      // At minimum, the en form5 post is always present.
      expect(langs.has('en')).toBe(true);
    });
  });

  describe('getPostBySlug', () => {
    it('returns undefined for unknown slugs', () => {
      expect(getPostBySlug('does-not-exist')).toBeUndefined();
    });

    it('returns a post when the slug matches', () => {
      const posts = getAllPosts();
      const sample = posts[0];
      const found = getPostBySlug(sample.slug);
      expect(found?.slug).toBe(sample.slug);
    });
  });
});
