import { generateOgImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = locale === 'is' ? 'Byrjum á einhverju' : "Let's build something";
  return generateOgImage({
    title,
    gradientFrom: '#8a3a1a',
    gradientTo: '#1a0800',
  });
}
