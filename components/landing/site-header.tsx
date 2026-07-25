"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Github } from "lucide-react"
import Logo from "./logo"

const NAV_LINKS = [
  { hash: "#combinations", label: "Combinations" },
  { hash: "#how-it-works", label: "How it works" },
  { hash: "#faq", label: "FAQ" },
]

/**
 * Sits flush and full-width at the top of the page, then collapses into a
 * floating pill once you scroll — narrower, shorter, tighter, detached from the
 * top edge, and following you down the page.
 *
 * It's `fixed` rather than `sticky` on purpose: a sticky header occupies flow
 * space, so shrinking its height would shorten the document, which can bounce
 * the scroll position back across the threshold and make the pill flicker.
 *
 * `variant="landing"` scrolls within the page; `variant="app"` is for routes that
 * aren't the landing page, where the same links have to navigate home first.
 */
export default function SiteHeader({ variant = "landing" }: { variant?: "landing" | "app" }) {
  const [condensed, setCondensed] = useState(false)
  const prefix = variant === "app" ? "/" : ""

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      // Asymmetric thresholds — it takes more scroll to condense than to expand,
      // so hovering right at the boundary can't oscillate.
      setCondensed((was) => (was ? window.scrollY > 20 : window.scrollY > 48))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const ease = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] ${ease} ${
        condensed ? "px-4" : "px-0"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between rounded-full border transition-[max-width,height,margin-top,padding,background-color,border-color,box-shadow] ${ease} ${
          condensed
            ? "mt-3 h-14 max-w-[430px] border-zinc-900/[0.08] bg-white/75 px-2 pl-4 shadow-[0_1px_2px_rgba(9,9,11,0.04),0_14px_34px_-14px_rgba(9,9,11,0.3)] backdrop-blur-xl md:max-w-[620px]"
            : "mt-0 h-16 max-w-6xl border-transparent bg-transparent px-5 sm:px-8"
        }`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Logo />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">glotfiles</span>
        </Link>

        <nav
          className={`hidden items-center transition-[gap] md:flex ${ease} ${
            condensed ? "gap-0" : "gap-1"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.hash}
              href={`${prefix}${link.hash}`}
              className={`whitespace-nowrap rounded-lg py-2 text-[14px] text-zinc-600 transition-[padding,color] ${ease} hover:text-zinc-900 ${
                condensed ? "px-2.5" : "px-3"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://app.glotfiles.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
            className={`whitespace-nowrap rounded-lg py-2 text-[14px] text-zinc-600 transition-[padding,color] ${ease} hover:text-zinc-900 ${
              condensed ? "px-2.5" : "px-3"
            }`}
          >
            API
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href="https://github.com/LALITH0110/glotfiles"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-900/5 hover:text-zinc-900"
          >
            <Github className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </a>
          <a
            href={`${prefix}#builder`}
            className="inline-flex h-9 items-center rounded-full bg-zinc-900 px-4 text-[14px] font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Create a file
          </a>
        </div>
      </div>
    </header>
  )
}
