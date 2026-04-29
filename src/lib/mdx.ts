import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostType = 'post' | 'archive';
export type PostLang = 'en' | 'is';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  type: PostType;
  lang: PostLang;
  tags: string[];
  readingMinutes: number;
  era?: string;
  related?: string;
}

const WORDS_PER_MINUTE = 225;

function getWritingDir(): string {
  return path.join(process.cwd(), 'src/writing');
}

export function getAllPosts(): PostMeta[] {
  const dir = getWritingDir();
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
    const { data, content } = matter(raw);

    const lang = data.lang === 'is' ? 'is' : 'en';
    const tags = Array.isArray(data.tags) ? data.tags.map((t: unknown) => String(t)) : [];

    return {
      slug,
      title: typeof data.title === 'string' ? data.title : slug,
      date: typeof data.date === 'string' ? data.date : '',
      summary: typeof data.summary === 'string' ? data.summary : '',
      type: (data.type === 'archive' ? 'archive' : 'post') as PostType,
      lang: lang as PostLang,
      tags,
      readingMinutes: estimateReadingMinutes(content),
      era: typeof data.era === 'string' ? data.era : undefined,
      related: typeof data.related === 'string' ? data.related : undefined,
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

function estimateReadingMinutes(body: string): number {
  const stripped = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~`]/g, ' ');
  const words = stripped.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
