export interface GradientConfig {
  hue: number;
  lightness: string;
  chroma: number;
  chromaDark: number;
}

const gradients: Record<string, GradientConfig> = {
  'home': { hue: 28.28, lightness: '51.18%', chroma: 0.201, chromaDark: 0.5 },
  'who-i-am': { hue: 55, lightness: '48%', chroma: 0.14, chromaDark: 0.5 },
  'projects': { hue: 240, lightness: '42%', chroma: 0.12, chromaDark: 0.4 },
  'thoughts': { hue: 310, lightness: '40%', chroma: 0.15, chromaDark: 0.4 },
  'resume': { hue: 40, lightness: '44%', chroma: 0.15, chromaDark: 0.4 },
  'lets-go': { hue: 15, lightness: '50%', chroma: 0.18, chromaDark: 0.5 },
};

/**
 * Get gradient config for a route path.
 * Falls back to the about gradient for unknown routes.
 */
export function getGradientForPath(pathname: string): GradientConfig {
  const segments = pathname.split('/').filter(Boolean);
  // segments: [locale, slug?, ...rest]
  const slug = segments[1] || '';

  // Map localized slugs to their English route name
  const slugToRoute: Record<string, string> = {
    'hver-eg-er': 'who-i-am',
    'verkefni': 'projects',
    'hugleidingar': 'thoughts',
    'ferilskra': 'resume',
    'byrjum': 'lets-go',
  };

  const route = slugToRoute[slug] || slug;
  if (!route) return gradients.home;
  return gradients[route] || gradients.home;
}
