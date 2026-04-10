import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

interface OgParams {
  title: string;
  gradientFrom: string;
  gradientTo: string;
}

export function generateOgImage({ title, gradientFrom, gradientTo }: OgParams) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: 80,
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      }}
    >
      <span
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: '#eff1f3',
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.1,
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontSize: 28,
          fontWeight: 300,
          color: '#eff1f3',
          opacity: 0.7,
          marginTop: 16,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Benedikt D. Valdez
      </span>
    </div>,
    { ...ogSize },
  );
}
