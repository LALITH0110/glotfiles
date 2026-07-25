import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PolyglotCreator from "@/components/polyglot-creator"
import ReferencePanel from "./reference-panel"
import { colorForType } from "@/lib/polyglot-limits"

interface FileSlot {
  label: string
  accept: string
  type: string
}

export interface PolyglotConfig {
  title: string
  description: string
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

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      <main>
        {/* Page head — no site nav here; this is a focused task, not a landing page */}
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

        {/* Work area — one column, full width for the dropzones */}
        <section className="px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <PolyglotCreator config={config} type={type} />
            <ReferencePanel slots={slots} type={type} />
          </div>
        </section>
      </main>
    </div>
  )
}
