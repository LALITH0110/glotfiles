import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import './globals.css'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'

/**
 * Canonical origin. The apex (glotfiles.dev) redirects to www, so every absolute
 * URL the site emits (canonicals, OG tags, JSON-LD @ids) must use this host.
 */
export const SITE_URL = 'https://www.glotfiles.dev'

const SITE_DESCRIPTION =
  'Merge a PDF, image, video, ZIP or HTML file into a single file that stays valid in every one of those formats. No account, no installs, nothing stored.'

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
  // Icons are picked up automatically from app/icon.svg, app/favicon.ico and
  // app/apple-icon.png; declaring them here as well would emit duplicate tags.
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
        url: `${SITE_URL}/apple-icon.png`,
        width: 180,
        height: 180,
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
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-geist-sans: ${GeistSans.style.fontFamily};
  --font-geist-mono: ${GeistMono.style.fontFamily};
}
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body>
        {/* lazyOnload, not afterInteractive: GTM is 166kB with ~42% unused and
            was implicated in long tasks during the LCP window. Analytics does
            not need to run before the page has painted. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M6CR35K4VZ"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M6CR35K4VZ');
          `}
        </Script>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
