import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

const baseUrl = 'https://valdez.is';

const staticPages = [
  { en: '/en', is: '/is' },
  { en: '/en/who-i-am', is: '/is/hver-eg-er' },
  { en: '/en/projects', is: '/is/verkefni' },
  { en: '/en/writing', is: '/is/skrif' },
  { en: '/en/resume', is: '/is/ferilskra' },
  { en: '/en/lets-go', is: '/is/byrjum' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const pages: MetadataRoute.Sitemap = staticPages.map(({ en, is }) => ({
    url: `${baseUrl}${en}`,
    alternates: {
      languages: {
        en: `${baseUrl}${en}`,
        is: `${baseUrl}${is}`,
      },
    },
  }));

  // Each post is reachable from both locale lists with identical content,
  // so we emit both URLs but do not declare them as language alternates of
  // each other (the body is in a single language).
  const postPages: MetadataRoute.Sitemap = posts.flatMap((post) => [
    {
      url: `${baseUrl}/en/writing/${post.slug}`,
      lastModified: post.date,
    },
    {
      url: `${baseUrl}/is/skrif/${post.slug}`,
      lastModified: post.date,
    },
  ]);

  return [...pages, ...postPages];
}
