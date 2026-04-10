import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

const baseUrl = 'https://valdez.is';

const staticPages = [
  { en: '/en', is: '/is' },
  { en: '/en/about', is: '/is/um' },
  { en: '/en/projects', is: '/is/verkefni' },
  { en: '/en/thoughts', is: '/is/hugleidingar' },
  { en: '/en/resume', is: '/is/ferilskra' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts('en');

  const pages: MetadataRoute.Sitemap = staticPages.map(({ en, is }) => ({
    url: `${baseUrl}${en}`,
    alternates: {
      languages: {
        en: `${baseUrl}${en}`,
        is: `${baseUrl}${is}`,
      },
    },
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/en/thoughts/${post.slug}`,
    lastModified: post.date,
    alternates: {
      languages: {
        en: `${baseUrl}/en/thoughts/${post.slug}`,
        is: `${baseUrl}/is/hugleidingar/${post.slug}`,
      },
    },
  }));

  return [...pages, ...postPages];
}
