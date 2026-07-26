import type { MetadataRoute } from 'next'
import { SITE_URL } from './layout'

/**
 * Replaces the hand-written public/robots.txt, which pointed its Sitemap
 * directive at the apex host (which redirects) and carried keyword-stuffed
 * "notes for crawlers" comments that served no purpose.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/private'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
