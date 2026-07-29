import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Layers,
  Lock,
  Terminal,
} from "lucide-react"
import ComboBuilder from "@/components/landing/combo-builder"
import HexRain from "@/components/landing/hex-rain-lazy"
import LiveCounter from "@/components/landing/live-counter"
import SiteFooter from "@/components/landing/site-footer"
import SiteHeader from "@/components/landing/site-header"
import { FORMAT_BY_KEY, LISTED_COMBOS } from "@/lib/polyglot-combos"

export const metadata: Metadata = {
  // `absolute` opts out of the layout's "%s · glotfiles" template; the brand is
  // already in this title, so the template would render it twice.
  title: { absolute: "glotfiles: one file, every format" },
  description:
    "Merge a PDF, image, video, ZIP or HTML file into a single file that stays valid in every one of those formats. No account, no installs, nothing stored.",
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      <SiteHeader />
      <main>
        <Hero />
        <Combinations />
        <HowItWorks />
        <Features />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}

/* -------------------------------------------------------------------- hero */

function Hero() {
  return (
    // Top padding clears the fixed header, which floats over this section so the
    // hex backdrop runs behind it.
    <section id="builder" className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36">
      {/* backdrop: live hex dump, warm glow, and a fade into the next section */}
      {/* No negative z-index here: it would slip behind the page's white background. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <HexRain />
        <div className="absolute -top-48 left-1/2 h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,92,53,0.13),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <a
            href="https://app.glotfiles.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 py-1 pl-1 pr-3 text-[13px] backdrop-blur transition-colors hover:border-zinc-300"
          >
            <span className="rounded-full bg-[#FF5C35] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
              New
            </span>
            {/* The full line wraps below ~420px, so phones get the short form */}
            <span className="text-zinc-600 sm:hidden">The API is live</span>
            <span className="hidden text-zinc-600 sm:inline">
              The API is live: build polyglots programmatically
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <h1 className="mt-7 max-w-4xl text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.042em] sm:text-6xl lg:text-[4.5rem]">
            One file that is
            <br className="hidden sm:block" />{" "}
            <span className="relative whitespace-nowrap">
              every file
              <svg
                aria-hidden
                viewBox="0 0 320 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-[10px] w-full text-[#FF5C35]"
              >
                <path
                  d="M2 9.5C58 4 122 2.5 190 4.5c50 1.5 92 4 128 6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-[17px] leading-relaxed text-zinc-600 sm:text-[19px]">
            Fuse a PDF, image, video, ZIP or HTML into a single set of bytes that every app still
            opens correctly. Pick your formats, drop your files, download in seconds.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <LiveCounter />
            <span className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.75} />
              Nothing stored, ever
            </span>
          </div>
        </div>

        <div className="mt-12 sm:mt-14">
          <ComboBuilder />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ combinations */

function Combinations() {
  return (
    <section id="combinations" className="scroll-mt-20 border-t border-zinc-100 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Combinations"
          title="Every mix we build"
          description="Each one is a real, spec-valid file, not a renamed extension or a container trick."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
          {LISTED_COMBOS.map((combo) => (
            <Link
              key={combo.id}
              href={`/create/${combo.id}`}
              className="group relative flex flex-col justify-between gap-6 bg-white p-6 transition-colors hover:bg-zinc-50/80"
            >
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {combo.formats.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 rounded-md bg-zinc-50 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-zinc-500 ring-1 ring-inset ring-zinc-200/70"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: FORMAT_BY_KEY[f].color }}
                      />
                      {FORMAT_BY_KEY[f].label}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.015em]">{combo.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-500">{combo.description}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-zinc-900">
                Create
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}

          <div className="flex flex-col justify-between gap-6 bg-white p-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-50 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-zinc-500 ring-1 ring-inset ring-zinc-200/70">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                Yours
              </span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.015em]">
                Need a different mix?
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-500">
                Tell us the formats you want fused and we&apos;ll look at adding them.
              </p>
            </div>
            <a
              href="https://github.com/LALITH0110/glotfiles/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-zinc-900"
            >
              Request a combination
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ how it works */

const STEPS = [
  {
    title: "Pick your formats",
    body: "Choose two to four formats. We resolve them to the exact polyglot structure that satisfies all of them at once.",
  },
  {
    title: "Drop your files",
    body: "Drag them in, or click to browse. Everything is validated in the browser before a single byte is uploaded.",
  },
  {
    title: "Download the result",
    body: "One file comes back. Rename the extension and it opens as whichever format you need at that moment.",
  },
]

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-zinc-100 bg-zinc-50/60 px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, about ten seconds"
          description="No account. No CLI. No file-format PhD required."
        />

        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 font-mono text-[12px] font-semibold text-white">
                  {i + 1}
                </span>
                <span className="h-px flex-1 bg-zinc-200" />
              </div>
              <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.015em]">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- features */

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Processed in memory",
    body: "Your files are never written to disk and never stored. The result streams straight back to you.",
  },
  {
    icon: Zap,
    title: "Genuinely fast",
    body: "Most combinations finish in a couple of seconds, including large video and archive payloads.",
  },
  {
    icon: Layers,
    title: "Spec-valid output",
    body: "Real polyglots built from format internals. Every reader you open it in sees a well-formed file.",
  },
  {
    icon: Terminal,
    title: "There's an API",
    body: "Everything the site does is available programmatically, so you can wire it into your own pipeline.",
    href: "https://app.glotfiles.dev/docs",
    linkLabel: "Read the docs",
  },
]

function Features() {
  return (
    <section className="border-t border-zinc-100 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Why glotfiles"
          title="Built properly, not as a party trick"
          description="Polyglot files have been a research curiosity for years. This makes them a two-click tool."
        />

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white">
                <feature.icon className="h-[17px] w-[17px] text-zinc-700" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-[16px] font-semibold tracking-[-0.015em]">{feature.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-600">{feature.body}</p>
                {feature.href && (
                  <a
                    href={feature.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1 text-[14px] font-medium text-zinc-900 hover:text-zinc-600"
                  >
                    {feature.linkLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------- faq */

const FAQS = [
  {
    q: "What actually is a polyglot file?",
    a: "A single file whose bytes are simultaneously valid under two or more format specifications. The same file can be opened as a PDF and as a ZIP, and both readers consider it well-formed. Nothing is hidden or renamed.",
  },
  {
    q: "Do you keep my files?",
    a: "No. Files are held in memory only for as long as the generation takes, then discarded. Nothing is written to disk, logged, or shared.",
  },
  {
    q: "How large can my files be?",
    a: "Up to 50MB for PDFs, 25MB for images, 100MB for video and ZIP archives, and 1MB for HTML. Limits are enforced in the browser before upload.",
  },
  {
    q: "Which extension should I use on the result?",
    a: "Any of the formats it contains. Change the extension and the matching application will open it. The bytes on disk stay identical.",
  },
  {
    q: "Is there an API?",
    a: "Yes. Every combination available here can be generated programmatically. The documentation covers endpoints, limits and examples.",
  },
]

function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-zinc-100 bg-zinc-50/60 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" align="left" />

        <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium tracking-[-0.01em]">
                {faq.q}
                <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                  <span className="absolute h-[1.5px] w-3 rounded-full bg-zinc-400" />
                  <span className="absolute h-3 w-[1.5px] rounded-full bg-zinc-400 transition-all duration-200 group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- helpers */

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string
  title: string
  description?: string
  align?: "center" | "left"
}) {
  const centered = align === "center"
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.032em] sm:text-[2.5rem] sm:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-[16px] leading-relaxed text-zinc-600 sm:text-[17px]">
          {description}
        </p>
      )}
    </div>
  )
}
