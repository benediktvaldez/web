import fs from "fs";
import path from "path";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

const THOUGHTS_DIR = path.join(process.cwd(), "src/thoughts");

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(THOUGHTS_DIR)) return [];

  const files = fs.readdirSync(THOUGHTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const content = fs.readFileSync(path.join(THOUGHTS_DIR, filename), "utf-8");
    const meta = parseFrontmatter(content);

    return {
      slug,
      title: meta.title || slug,
      date: meta.date || "",
      summary: meta.summary || "",
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  }
  return meta;
}
