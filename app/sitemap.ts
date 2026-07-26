import type { MetadataRoute } from 'next'
import { COMBOS } from '@/lib/polyglot-combos'
import { SITE_URL } from './layout'

/**
 * Generated from COMBOS so a new combination can never be missing from the
 * sitemap again — the previous hand-maintained public/sitemap.xml had silently
 * omitted /create/pdf-html.
 *
 * Bump this when page content materially changes. It is deliberately a real
 * date rather than build time: rebuilding the site is not the same as changing
 * its content, and the old sitemap's fabricated dates (one of which predated the
 * page's own existence) are exactly what this avoids.
 */
const CONTENT_UPDATED = new Date('2026-07-26')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...COMBOS.map((combo) => ({
      url: `${SITE_URL}/create/${combo.id}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/about`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy-terms`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
