import { readFileSync } from 'fs';
import { join } from 'path';

export const contentType = 'image/svg+xml';
export const size = { width: 32, height: 32 };

export default async function Icon({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const filename = locale === 'is' ? 'favicon-is.svg' : 'favicon-en.svg';
  const svg = readFileSync(join(process.cwd(), 'src/assets', filename));

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
