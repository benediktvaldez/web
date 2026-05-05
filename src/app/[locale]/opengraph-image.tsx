import { ImageResponse } from 'next/og';
import { loadOgFonts } from '@/lib/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const greeting = locale === 'is' ? 'hæ.' : 'hi.';
  const fonts = await loadOgFonts();

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #bf1313 0%, #370000 100%)',
        fontFamily: 'Outfit',
      }}
    >
      <span
        style={{
          fontSize: 120,
          fontWeight: 700,
          color: '#eff1f3',
        }}
      >
        {greeting}
      </span>
      <span
        style={{
          fontSize: 32,
          fontWeight: 300,
          color: '#eff1f3',
          opacity: 0.8,
          marginTop: 16,
        }}
      >
        Benedikt Valdez
      </span>
    </div>,
    { ...size, fonts },
  );
}
