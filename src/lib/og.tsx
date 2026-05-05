import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\(/);
  if (!match) throw new Error(`failed to parse font CSS for ${family} ${weight}`);
  const fontResponse = await fetch(match[1]);
  if (!fontResponse.ok) throw new Error(`failed to fetch font file for ${family} ${weight}`);
  return fontResponse.arrayBuffer();
}

export async function loadOgFonts() {
  const [bold, light] = await Promise.all([
    loadGoogleFont('Outfit', 700),
    loadGoogleFont('Outfit', 300),
  ]);
  return [
    { name: 'Outfit', data: bold, style: 'normal' as const, weight: 700 as const },
    { name: 'Outfit', data: light, style: 'normal' as const, weight: 300 as const },
  ];
}

interface OgParams {
  title: string;
  gradientFrom: string;
  gradientTo: string;
}

export async function generateOgImage({ title, gradientFrom, gradientTo }: OgParams) {
  const fonts = await loadOgFonts();
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
        fontFamily: 'Outfit',
      }}
    >
      <span
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: '#eff1f3',
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
        }}
      >
        Benedikt Valdez
      </span>
    </div>,
    { ...ogSize, fonts },
  );
}
