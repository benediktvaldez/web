import type { Metadata } from 'next';
import { nunito, overpass, outfit } from '@/lib/fonts';
import './globals.css';

const baseUrl = 'https://benedikt.valdez.is';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Benedikt D. Valdez',
    template: '%s | Benedikt D. Valdez',
  },
  description: 'Developer and creator of digital experiences. 15 years building for the web.',
  authors: [{ name: 'Benedikt D. Valdez', url: baseUrl }],
  creator: 'Benedikt D. Valdez',
  openGraph: {
    type: 'website',
    siteName: 'Benedikt D. Valdez',
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
              'name': 'Benedikt D. Valdez',
              'url': baseUrl,
              'author': {
                '@type': 'Person',
                'name': 'Benedikt D. Valdez',
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
      </body>
    </html>
  );
}
