"use client"

import { useEffect, useState } from "react"

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

    import("@/lib/firebase")
      .then(({ subscribeToCounter }) => {
        if (cancelled) return
        unsubscribe = subscribeToCounter((value) => setCount(value))
      })
      .catch(() => {
        /* counter is decorative, stay silent */
      })

    return () => {
      cancelled = true
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
