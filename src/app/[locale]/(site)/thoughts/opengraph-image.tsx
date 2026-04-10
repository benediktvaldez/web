import { generateOgImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = locale === 'is' ? 'Hugleiðingar' : 'Thoughts';
  return generateOgImage({
    title,
    gradientFrom: '#6b1a6b',
    gradientTo: '#1a001a',
  });
}
