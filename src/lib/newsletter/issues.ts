import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { locales, type Locale } from '@/i18n/config';

export interface IssueMeta {
  slug: string;
  subject: string;
  date: string;
  locale: Locale;
  preview?: string;
  body: string;
}

function getIssuesDir(): string {
  return process.env.NEWSLETTER_DIR
    ? path.resolve(process.env.NEWSLETTER_DIR)
    : path.resolve(process.cwd(), '../.local/newsletter');
}

export function getIssueBySlug(slug: string): IssueMeta | undefined {
  const file = path.join(getIssuesDir(), `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);

  if (!isLocale(data.locale)) {
    throw new Error(`Issue "${slug}" has invalid or missing locale (got: ${String(data.locale)}).`);
  }
  if (typeof data.subject !== 'string' || !data.subject.trim()) {
    throw new Error(`Issue "${slug}" has invalid or missing subject.`);
  }
  const date = normalizeDate(data.date);
  if (!date) {
    throw new Error(`Issue "${slug}" has invalid or missing date.`);
  }

  return {
    slug,
    subject: data.subject,
    date,
    locale: data.locale,
    preview: typeof data.preview === 'string' ? data.preview : undefined,
    body: content,
  };
}

function normalizeDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string' && value.trim()) return value;
  return undefined;
}

export function getAllIssues(): IssueMeta[] {
  const dir = getIssuesDir();
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md');

  const issues: IssueMeta[] = [];
  for (const filename of files) {
    const slug = filename.replace(/\.md$/, '');
    const issue = getIssueBySlug(slug);
    if (issue) issues.push(issue);
  }
  return issues.sort((a, b) => (a.date > b.date ? -1 : 1));
}

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}
