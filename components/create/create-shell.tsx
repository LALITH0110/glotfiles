import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PolyglotCreator from "@/components/polyglot-creator"
import ReferencePanel from "./reference-panel"
import { colorForType } from "@/lib/polyglot-limits"
import { getExplainer } from "@/lib/combo-explainers"

interface FileSlot {
  label: string
  accept: string
  type: string
}

export interface PolyglotConfig {
  title: string
  description: string
  /**
   * Optional practical caveat shown under the description. Kept separate from
   * `description`, which feeds the page metadata and JSON-LD.
   */
  note?: string
  file1: FileSlot
  file2: FileSlot
  file3?: FileSlot
  file4?: FileSlot
  file5?: FileSlot
}

export default function CreateShell({ config, type }: { config: PolyglotConfig; type: string }) {
  const slots = [config.file1, config.file2, config.file3, config.file4, config.file5].filter(
    Boolean,
  ) as FileSlot[]
  const explainer = getExplainer(type)

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      <main>
        {/* Page head: no site nav here; this is a focused task, not a landing page */}
        <section className="px-5 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-10">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/#combinations"
              className="group inline-flex items-center gap-1.5 text-[13px] text-zinc-500 transition-colors hover:text-zinc-900"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              All combinations
            </Link>

            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-[2.5rem] sm:leading-[1.1]">
              {config.title}
            </h1>
            <p className="mt-3 max-w-xl text-pretty text-[16px] leading-relaxed text-zinc-600 sm:text-[17px]">
              {config.description}
            </p>

            {config.note ? (
              <p className="mt-2 max-w-xl text-pretty text-[14px] leading-relaxed text-zinc-500">
                {config.note}
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              {slots.map((slot, i) => (
                <span
                  key={`${slot.type}-${i}`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-zinc-50 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-zinc-500 ring-1 ring-inset ring-zinc-200/70"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: colorForType(slot.type) }}
                  />
                  {slot.type}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Work area: one column, full width for the dropzones */}
        <section className="px-5 pb-16 sm:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <PolyglotCreator config={config} type={type} />
            <ReferencePanel slots={slots} type={type} />
          </div>
        </section>

        {/* Explainer: unique per combination, and the passage most likely to be
            quoted by a search or AI engine answering "what is a {X}+{Y} polyglot" */}
        {explainer && (
          <section className="border-t border-zinc-100 px-5 py-14 sm:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-balance text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                What is a {config.title.replace(/ Polyglot$/, "")} polyglot?
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-[16px] leading-relaxed text-zinc-600">
                {explainer.what}
              </p>

              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                    How the formats coexist
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-600">
                    {explainer.mechanism}
                  </p>
                </div>

                <div>
                  <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                    Why people build these
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {explainer.useCases.map((useCase) => (
                      <li
                        key={useCase}
                        className="flex gap-2 text-[15px] leading-relaxed text-zinc-600"
                      >
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-10 text-[13px] leading-relaxed text-zinc-500">
                Files are processed in memory and never stored. Generated polyglots are
                intended for educational, research and testing use. See{" "}
                <Link href="/privacy-terms" className="text-zinc-900 underline underline-offset-2">
                  privacy and terms
                </Link>
                .
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
