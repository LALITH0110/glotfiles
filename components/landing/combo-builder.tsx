"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, FileText, ImageIcon, Video, Archive, Code2, Sparkles } from "lucide-react"
import {
  COMBOS,
  FORMATS,
  FORMAT_BY_KEY,
  findCombo,
  nearestCombos,
  type FormatKey,
} from "@/lib/polyglot-combos"

const ICONS: Record<FormatKey, typeof FileText> = {
  pdf: FileText,
  image: ImageIcon,
  video: Video,
  zip: Archive,
  html: Code2,
}

const QUICK_PICKS = COMBOS.filter((c) => c.featured)

export default function ComboBuilder() {
  const [selected, setSelected] = useState<FormatKey[]>(["pdf", "image"])

  const toggle = (key: FormatKey) =>
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  const match = findCombo(selected)
  const suggestions = match || selected.length === 0 ? [] : nearestCombos(selected)

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(9,9,11,0.04),0_24px_48px_-24px_rgba(9,9,11,0.18)]">
        {/* Step 1: format selection */}
        <div className="p-5 sm:p-7">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
              01 · Pick your formats
            </p>
            <p className="text-[13px] text-zinc-400">{selected.length} selected</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-2.5">
            {FORMATS.map((format) => {
              const Icon = ICONS[format.key]
              const isOn = selected.includes(format.key)
              return (
                <button
                  key={format.key}
                  type="button"
                  onClick={() => toggle(format.key)}
                  aria-pressed={isOn}
                  className={`group relative flex flex-col items-start gap-2.5 overflow-hidden rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 ${
                    isOn
                      ? "-translate-y-0.5"
                      : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm"
                  }`}
                  style={
                    isOn
                      ? {
                          // Each format keeps its own identity when selected: a wash of
                          // its colour, a solid border in the same hue, and a matching
                          // shadow. The tint is deliberately strong enough that a
                          // selected card never reads as white at a glance.
                          backgroundColor: `${format.color}26`,
                          borderColor: format.color,
                          boxShadow: `0 1px 2px ${format.color}2E, 0 10px 24px -12px ${format.color}99`,
                        }
                      : undefined
                  }
                >
                  {/* Colour bleed from the top-left, so the tint has direction */}
                  {isOn && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-6 -top-6 h-16 w-16 rounded-full opacity-40 blur-2xl"
                      style={{ backgroundColor: format.color }}
                    />
                  )}

                  <span className="relative flex w-full items-center justify-between">
                    <Icon
                      className="h-[18px] w-[18px] transition-colors"
                      style={{ color: format.color }}
                      strokeWidth={1.75}
                    />
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                        isOn ? "" : "border-zinc-200 bg-white group-hover:border-zinc-300"
                      }`}
                      style={
                        isOn
                          ? { backgroundColor: format.color, borderColor: format.color }
                          : undefined
                      }
                    >
                      <Check
                        className={`h-2.5 w-2.5 text-white transition-opacity ${
                          isOn ? "opacity-100" : "opacity-0"
                        }`}
                        strokeWidth={3.5}
                      />
                    </span>
                  </span>
                  <span className="relative leading-tight">
                    <span className="block text-sm font-medium text-zinc-900">{format.label}</span>
                    {/* zinc-600, not the format colour: the colour-on-tint combination
                        measures 1.8:1 to 4.2:1, which fails WCAG AA for 10px text. */}
                    <span
                      className={`mt-0.5 block font-mono text-[10px] transition-colors ${
                        isOn ? "text-zinc-600" : "text-zinc-400"
                      }`}
                    >
                      {format.ext}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2: resolved combination */}
        <div className="border-t border-zinc-100 bg-zinc-50/60 p-5 sm:p-7">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
            02 · Your polyglot
          </p>

          {match ? (
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {match.formats.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 font-mono text-[11px] font-medium text-zinc-600 ring-1 ring-inset ring-zinc-200"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: FORMAT_BY_KEY[f].color }}
                      />
                      {FORMAT_BY_KEY[f].label}
                    </span>
                  ))}
                </div>
                <p className="mt-2.5 text-[15px] text-zinc-600">{match.description}</p>
              </div>
              <Link
                href={`/create/${match.id}`}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-[15px] font-medium text-white transition-all hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
              >
                Upload files
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ) : selected.length === 0 ? (
            <p className="mt-4 text-[15px] text-zinc-500">
              Select two or more formats above to build your file.
            </p>
          ) : selected.length === 1 ? (
            <p className="mt-4 text-[15px] text-zinc-500">
              Add at least one more format. A polyglot needs two.
            </p>
          ) : (
            <div className="mt-4">
              <p className="text-[15px] text-zinc-600">
                That exact mix isn&apos;t supported yet. The closest ones we do build:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((combo) => (
                  <button
                    key={combo.id}
                    type="button"
                    onClick={() => setSelected(combo.formats)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[13px] font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.75} />
                    {combo.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick picks */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[13px]">
        <span className="text-zinc-400">Popular:</span>
        {QUICK_PICKS.map((combo) => (
          <button
            key={combo.id}
            type="button"
            onClick={() => setSelected(combo.formats)}
            className="rounded-full border border-zinc-200 bg-white/80 px-3 py-1 font-medium text-zinc-600 backdrop-blur transition-colors hover:border-zinc-300 hover:text-zinc-900"
          >
            {combo.title}
          </button>
        ))}
      </div>
    </div>
  )
}
