"use client"

import dynamic from "next/dynamic"

/**
 * Client-side wrapper so the hero canvas can be loaded with `ssr: false`, which
 * next/dynamic does not permit directly inside a Server Component.
 *
 * The canvas is decorative (aria-hidden) and was part of the ~1.5s of script
 * evaluation running before the LCP text painted. Deferring it keeps it out of
 * the initial bundle; the hero paints without it and it fades in afterwards.
 */
const HexRain = dynamic(() => import("./hex-rain"), { ssr: false })

export default function HexRainLazy() {
  return <HexRain />
}
