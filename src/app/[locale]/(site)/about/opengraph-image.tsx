import { generateOgImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = locale === 'is' ? 'Hver er ég' : 'Who am I';
  return generateOgImage({
    title,
    gradientFrom: '#8a6b1a',
    gradientTo: '#1a0f00',
  });
}
