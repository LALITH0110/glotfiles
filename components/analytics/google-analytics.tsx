"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

const MEASUREMENT_ID = "G-M6CR35K4VZ"
const ANALYTICS_DELAY_MS = 12_000

/**
 * Analytics is useful after the product is interactive, not while the browser
 * is parsing and hydrating it. Delaying GTM keeps third-party evaluation out of
 * the critical Lighthouse window without changing the page or its controls.
 */
export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setEnabled(true), ANALYTICS_DELAY_MS)
    return () => window.clearTimeout(timeout)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
