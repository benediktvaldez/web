import type { Metadata } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { nunito, overpass, outfit } from '@/lib/fonts';
import './globals.css';

const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

const baseUrl = 'https://benedikt.valdez.is';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Benedikt Valdez',
    template: '%s | Benedikt Valdez',
  },
  description: 'Developer and creator of digital experiences. 15 years building for the web.',
  authors: [{ name: 'Benedikt Valdez', url: baseUrl }],
  creator: 'Benedikt Valdez',
  openGraph: {
    type: 'website',
    siteName: 'Benedikt Valdez',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    'theme-color': '#bf1313',
    'apple-mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${nunito.variable} ${overpass.variable} ${outfit.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              'name': 'Benedikt Valdez',
              'url': baseUrl,
              'author': {
                '@type': 'Person',
                'name': 'Benedikt Valdez',
                'url': baseUrl,
                'jobTitle': 'Full Stack Digital Product Developer',
                'sameAs': [
                  'https://github.com/benediktvaldez',
                  'https://linkedin.com/in/benediktvaldez',
                ],
              },
            }),
          }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
        {umamiWebsiteId && (
          <Script
            src="https://stats.valdez.is/stats.js"
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
        <SpeedInsights />
      </body>
    </html>
  );
}
