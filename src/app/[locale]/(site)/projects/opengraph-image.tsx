import { generateOgImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = locale === 'is' ? 'Verkefni' : 'Projects';
  return generateOgImage({
    title,
    gradientFrom: '#1a3380',
    gradientTo: '#000a1a',
  });
}
