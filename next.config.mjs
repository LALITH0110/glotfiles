/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production'

// Only HSTS was set previously (by Vercel). GTM is loaded on every page, so a
// scoped CSP is worth having; frame-ancestors replaces X-Frame-Options.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    // REPORT-ONLY on purpose. This policy is well-formed and allows everything
    // the app is known to use, but a CSP that is wrong in production silently
    // breaks file generation — and generation posts to a host supplied by an
    // environment variable, which cannot be fully verified from the repo.
    //
    // Deploy this, open the console on a real generation + download, confirm no
    // violations are reported, then rename this key to 'Content-Security-Policy'
    // to start enforcing.
    key: 'Content-Security-Policy-Report-Only',
    value: [
      "default-src 'self'",
      // Next.js requires 'unsafe-inline'/'unsafe-eval' for its runtime and the
      // inline JSON-LD; GTM and Vercel Analytics are the only third parties.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
      "font-src 'self' data:",
      // The generator POSTs multipart uploads to api.glotfiles.dev (verified: GET
      // returns 405, so the route exists and is POST-only) and reads the counter
      // from Firestore. In development the API host is whatever the local env var
      // points at, so connect-src is left open there — see below.
      `connect-src 'self' ${isDev ? 'http: https: ws: wss:' : "https://*.google-analytics.com https://*.googletagmanager.com https://va.vercel-scripts.com https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://app.glotfiles.dev https://api.glotfiles.dev"}`,
      // 'none' blocks embedding entirely (clickjacking protection). Relaxed to
      // 'self' in development so local test harnesses can frame the app.
      `frame-ancestors ${isDev ? "'self'" : "'none'"}`,
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; '),
  },
]

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
