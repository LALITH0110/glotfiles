"use client"

import { ArrowLeft } from "lucide-react"

/** Isolated so app/not-found.tsx can stay a Server Component and export metadata. */
export default function GoBackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
    >
      <ArrowLeft className="h-4 w-4" />
      Go back
    </button>
  )
}
