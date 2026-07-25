import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import './globals.css'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Polyglot File Generator',
  description: 'Create files that are valid in multiple formats simultaneously',
  generator: 'Polyglot Generator',
  // Icons are picked up automatically from app/icon.svg, app/favicon.ico and
  // app/apple-icon.png — declaring them here as well would emit duplicate tags.
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
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M6CR35K4VZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
