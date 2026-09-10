import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import GoogleAnalytics from '@/components/analytics/google-analytics'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site'

const geistSans = localFont({
  src: '../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2',
  display: 'swap',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: '../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2',
  display: 'swap',
  preload: false,
  variable: '--font-geist-mono',
  weight: '100 900',
})

/**
 * Canonical origin. The apex (glotfiles.dev) redirects to www, so every absolute
 * URL the site emits (canonicals, OG tags, JSON-LD @ids) must use this host.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'glotfiles: one file, every format',
    template: '%s · glotfiles',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'glotfiles',
  generator: 'Polyglot Generator',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'glotfiles',
    url: '/',
    title: 'glotfiles: one file, every format',
    description: SITE_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'glotfiles: one file, every format',
    description: SITE_DESCRIPTION,
  },
  // Icons are picked up automatically from app/icon.png, app/favicon.ico and
  // app/apple-icon.png; declaring them here as well would emit duplicate tags.
}

// Next supplies this default automatically, but keeping it explicit makes the
// mobile contract visible to non-browser SEO crawlers as well as to maintainers.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
}

/**
 * Site-wide entity graph. Rendered synchronously into the initial HTML (not via
 * next/script) so crawlers see it without executing JavaScript.
 *
 * Deliberately absent: HowTo (rich results removed Sept 2023) for the "How it
 * works" section, and FAQPage. Google retired FAQ rich results for all sites on
 * 7 May 2026, so the landing page's <details> Q&As earn nothing from markup.
 */
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'glotfiles',
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      sameAs: ['https://github.com/LALITH0110/glotfiles'],
      founder: {
        '@type': 'Person',
        name: 'Lalith Kothuru',
        url: 'https://www.lalithkothuru.com/',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'glotfiles',
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#software`,
      name: 'glotfiles',
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any (runs entirely in the browser)',
      browserRequirements: 'Requires JavaScript',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
