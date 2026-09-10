"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const MOBILE_CANVAS_DELAY_MS = 5_000

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
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Desktop has ample main-thread headroom and keeps the immediate effect.
    // On phones, let the hero paint and hydrate before starting a decorative
    // canvas and its animation loop. The same backdrop fades in shortly after.
    if (!window.matchMedia("(max-width: 639px)").matches) {
      setReady(true)
      return
    }

    const timeout = window.setTimeout(() => setReady(true), MOBILE_CANVAS_DELAY_MS)
    return () => window.clearTimeout(timeout)
  }, [])

  return ready ? <HexRain /> : null
}
