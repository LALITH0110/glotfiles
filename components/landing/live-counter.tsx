"use client"

import { useEffect, useState } from "react"

const COUNTER_DELAY_MS = 12_000

/**
 * Live global generation count. Firebase is imported lazily so it stays out of
 * the landing page's initial bundle, and the whole thing degrades to nothing if
 * the subscription fails.
 */
export default function LiveCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    let cancelled = false
    let idleCallback: number | undefined

    // Firebase's Firestore client is intentionally kept out of the initial
    // loading window. The counter is decorative; parsing its ~260 kB chunk
    // while the page is becoming interactive creates avoidable long tasks on
    // slower phones. It still becomes live shortly after the useful UI does.
    const timeout = window.setTimeout(() => {
      const subscribe = () => {
        import("@/lib/firebase")
          .then(({ subscribeToCounter }) => {
            if (cancelled) return
            unsubscribe = subscribeToCounter((value) => setCount(value))
          })
          .catch(() => {
            /* counter is decorative, stay silent */
          })
      }

      if ("requestIdleCallback" in window) {
        idleCallback = window.requestIdleCallback(subscribe, { timeout: 2_000 })
      } else {
        subscribe()
      }
    }, COUNTER_DELAY_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
      if (idleCallback !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallback)
      }
      unsubscribe?.()
    }
  }, [])

  if (count === null) return null

  return (
    <span className="inline-flex items-center gap-2 text-[13px] text-zinc-500">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      <strong className="font-semibold tabular-nums text-zinc-900">{count.toLocaleString()}</strong>
      files generated so far
    </span>
  )
}
