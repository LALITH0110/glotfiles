import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import GoBackButton from "@/components/go-back-button"
import Logo from "@/components/landing/logo"
import { COMBOS, FORMAT_BY_KEY } from "@/lib/polyglot-combos"

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist. Browse the polyglot combinations glotfiles can build.",
  robots: { index: false, follow: true },
}

/** Surface a few real combinations so a 404 is still a useful entry point. */
const SUGGESTIONS = COMBOS.filter((c) => c.featured).slice(0, 3)

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5 py-16 text-zinc-900 antialiased">
      <div className="w-full max-w-lg text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Logo className="h-7 w-7" />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">glotfiles</span>
        </Link>

        <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.16em] text-zinc-400">
          Error 404
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-[2.5rem] sm:leading-[1.1]">
          That page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-[16px] leading-relaxed text-zinc-600">
          The combination you asked for isn&apos;t one we build, or the link is out of date.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link
            href="/#combinations"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 text-[15px] font-medium text-white transition-colors hover:bg-zinc-800"
          >
            See all combinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <GoBackButton />
        </div>

        <div className="mt-12 border-t border-zinc-100 pt-8">
          <p className="text-[13px] text-zinc-500">Popular combinations</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((combo) => (
              <Link
                key={combo.id}
                href={`/create/${combo.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
              >
                {combo.formats.map((f) => (
                  <span
                    key={f}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: FORMAT_BY_KEY[f].color }}
                  />
                ))}
                {combo.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
