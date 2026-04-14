/**
 * Upload a file to Vercel Blob.
 *
 * Usage:
 *   npx tsx scripts/upload.ts path/to/image.jpg [folder]
 *
 * Examples:
 *   npx tsx scripts/upload.ts photo.jpg blog/form5
 *   npx tsx scripts/upload.ts resume.pdf documents
 *
 * Outputs the public URL on success.
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { put } from '@vercel/blob';
import { readFileSync } from 'fs';
import { basename } from 'path';

async function main() {
  const [, , filePath, folder] = process.argv;

  if (!filePath) {
    console.error('Usage: npx tsx scripts/upload.ts <file> [folder]');
    process.exit(1);
  }

  const fileName = basename(filePath);
  const pathname = folder ? `${folder}/${fileName}` : fileName;
  const file = readFileSync(filePath);

  const blob = await put(pathname, file, {
    access: 'public',
    addRandomSuffix: false,
  });

  console.log(blob.url);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
