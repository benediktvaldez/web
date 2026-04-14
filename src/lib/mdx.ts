import fs from 'fs';
import path from 'path';
import type { Locale } from '@/i18n/config';

export type PostType = 'post' | 'archive';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  type: PostType;
  era?: string;
  related?: string;
  localeSlug?: Record<string, string>;
}

function getThoughtsDir(locale: Locale): string {
  return path.join(process.cwd(), 'src/thoughts', locale);
}

export function getAllPosts(locale: Locale): PostMeta[] {
  const dir = getThoughtsDir(locale);
  const fallbackDir = getThoughtsDir('en');

  // Use locale-specific dir, fall back to English
  const targetDir = fs.existsSync(dir) ? dir : fallbackDir;
  if (!fs.existsSync(targetDir)) return [];

  const files = fs.readdirSync(targetDir).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const content = fs.readFileSync(path.join(targetDir, filename), 'utf-8');
    const meta = parseFrontmatter(content);

    // Collect locale_* fields into a map
    const localeSlug: Record<string, string> = {};
    for (const [key, value] of Object.entries(meta)) {
      if (key.startsWith('locale_') && value) {
        localeSlug[key.replace('locale_', '')] = value;
      }
    }

    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      summary: meta.summary || '',
      type: (meta.type as PostType) || 'post',
      era: meta.era || undefined,
      related: meta.related || undefined,
      localeSlug: Object.keys(localeSlug).length > 0 ? localeSlug : undefined,
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Check if a post exists for the given locale, fall back to "en".
 */
export function getPostLocale(slug: string, locale: Locale): Locale {
  const localeFile = path.join(getThoughtsDir(locale), `${slug}.mdx`);
  if (fs.existsSync(localeFile)) return locale;
  return 'en';
}

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
    meta[key] = value;
  }
  return meta;
}
