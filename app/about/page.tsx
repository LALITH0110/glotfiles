import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import SiteFooter from "@/components/landing/site-footer"
import { SITE_URL } from "@/app/layout"

export const metadata: Metadata = {
  title: "About",
  description:
    "Who builds glotfiles, how polyglot files actually work, and the prior research the tool is built on.",
  alternates: { canonical: "/about" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#page`,
      url: `${SITE_URL}/about`,
      name: "About glotfiles",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#software` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
      ],
    },
  ],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[13px] text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to glotfiles
          </Link>

          <h1 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-[2.5rem] sm:leading-[1.1]">
            About glotfiles
          </h1>

          <div className="mt-8 space-y-10">
            <section>
              <h2 className="text-[17px] font-semibold tracking-[-0.015em]">What this is</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">
                glotfiles builds polyglot files: single files whose bytes satisfy two or more
                format specifications at the same time. One file can be a valid PDF and a valid
                ZIP, and both readers consider it well-formed. Nothing is renamed, wrapped or
                hidden — the formats genuinely coexist in the same byte stream.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">
                It runs in the browser, needs no account, and processes files in memory. Nothing
                is written to disk or retained after the result is returned.
              </p>
            </section>

            <section>
              <h2 className="text-[17px] font-semibold tracking-[-0.015em]">
                Why polyglots are possible
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">
                File formats disagree about where a file begins. ZIP readers find the central
                directory by scanning backwards from the end, so an archive need not start at byte
                zero. PDF readers look for the <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px]">%PDF</code>{" "}
                header near the start and read structure from the trailer at the end. MP4 is a
                chain of length-prefixed atoms, and parsers skip atoms they do not recognise.
                Image formats identify themselves from a signature in the first few bytes.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">
                Those differing strategies leave room for several complete structures to share one
                file, each discoverable by the reader that cares about it. That is the whole trick
                — no exploit, no corruption, just formats that tolerate bytes they were not looking
                for.
              </p>
            </section>

            <section>
              <h2 className="text-[17px] font-semibold tracking-[-0.015em]">Prior work</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">
                Polyglot files are not a new discovery. The technique has a long history in
                security research and CTF challenges — Ange Albertini&apos;s{" "}
                <a
                  href="https://github.com/corkami/pocs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-zinc-900 underline underline-offset-2"
                >
                  Corkami
                  <ArrowUpRight className="h-3 w-3" />
                </a>{" "}
                proofs-of-concept and file-format posters, and the polyglot issues of{" "}
                <em>PoC‖GTFO</em>, are the canonical references. Command-line tools such as
                TruePolyglot have existed for years.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">
                What glotfiles adds is accessibility: the same constructions, without cloning a
                repository or running a script. If you want to understand the underlying structures
                properly, the prior work above is where to start.
              </p>
            </section>

            <section>
              <h2 className="text-[17px] font-semibold tracking-[-0.015em]">
                Responsible use
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">
                Polyglot files are useful precisely because software disagrees about what they are,
                which is also what makes them a way to probe upload filters and content scanners.
                They are intended here for educational, research and authorised testing use. You
                are asked to confirm that before every download, and you are responsible for what
                you do with the output.
              </p>
            </section>

            <section>
              <h2 className="text-[17px] font-semibold tracking-[-0.015em]">Who builds it</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">
                glotfiles is built and maintained by{" "}
                <a
                  href="https://www.lalithkothuru.com/?utm_source=glotfiles-website&utm_medium=referral&utm_campaign=glotfiles-about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 font-medium text-zinc-900 underline underline-offset-2"
                >
                  Lalith Kothuru
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                . The frontend is{" "}
                <a
                  href="https://github.com/LALITH0110/glotfiles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-zinc-900 underline underline-offset-2"
                >
                  public on GitHub
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                , which is also where bugs and combination requests are tracked. There is an{" "}
                <a
                  href="https://app.glotfiles.dev/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-zinc-900 underline underline-offset-2"
                >
                  API
                  <ArrowUpRight className="h-3 w-3" />
                </a>{" "}
                if you would rather generate these programmatically, and you can reach me at{" "}
                <a
                  href="mailto:lalith.kothuru@gmail.com?subject=[GlotFiles]%20"
                  className="text-zinc-900 underline underline-offset-2"
                >
                  lalith.kothuru@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
