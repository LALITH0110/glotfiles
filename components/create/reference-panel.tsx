import { GeneralUsage, TypeGuidance, hasTypeGuidance, SECURITY_TERMS } from "./usage-guide"
import { ALL_LIMITS, colorForType, formatLimit } from "@/lib/polyglot-limits"

interface FileSlot {
  type: string
}

/**
 * Reference material — how to open the result, size limits, usage terms.
 * Collapsed by default: it matters *after* you have a file, so it shouldn't
 * compete with the upload flow.
 */
export default function ReferencePanel({ slots, type }: { slots: FileSlot[]; type: string }) {
  const used = (t: string) => slots.some((s) => s.type.toLowerCase() === t.toLowerCase())

  return (
    <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <Row title="How to open your polyglot file" hint="Rename the extension">
        <div className="space-y-4">
          {hasTypeGuidance(type) && <TypeGuidance type={type} />}
          <GeneralUsage />
        </div>
      </Row>

      <Row title="File size limits" hint="Checked before upload">
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {ALL_LIMITS.map((entry) => (
            <li
              key={entry.type}
              className={`flex items-center justify-between gap-3 text-[13px] ${
                used(entry.type) ? "text-zinc-900" : "text-zinc-400"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: used(entry.type) ? colorForType(entry.type) : "#d4d4d8" }}
                />
                {entry.type}
              </span>
              <span className="font-mono tabular-nums">{formatLimit(entry.limit)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">
          Highlighted formats apply to this combination. Limits are enforced in your browser, so an
          oversized file never leaves your machine.
        </p>
      </Row>

      <Row title="Usage terms" hint="Confirmed at download">
        <ul className="space-y-2">
          {SECURITY_TERMS.map((term) => (
            <li key={term} className="flex gap-2 text-[13px] leading-relaxed text-zinc-600">
              <span className="text-zinc-300">—</span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </Row>
    </div>
  )
}

function Row({
  title,
  hint,
  children,
}: {
  title: string
  hint: string
  children: React.ReactNode
}) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-zinc-50/70">
        <span className="text-[14px] font-medium tracking-[-0.01em] text-zinc-900">{title}</span>
        <span className="flex items-center gap-3">
          <span className="hidden text-[12px] text-zinc-400 sm:block">{hint}</span>
          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            <span className="absolute h-[1.5px] w-3 rounded-full bg-zinc-400" />
            <span className="absolute h-3 w-[1.5px] rounded-full bg-zinc-400 transition-all duration-200 group-open:rotate-90 group-open:opacity-0" />
          </span>
        </span>
      </summary>
      <div className="px-5 pb-5">{children}</div>
    </details>
  )
}
