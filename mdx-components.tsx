import type { MDXComponents } from 'mdx/types';
import { BlogImage } from '@/components/BlogImage/BlogImage';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: ({ src, alt }) => (src ? <BlogImage src={src} alt={alt || ''} /> : null),
  };
}
