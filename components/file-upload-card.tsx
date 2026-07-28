"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Check, Upload, X, type LucideIcon } from "lucide-react"
import { formatSize } from "@/lib/polyglot-limits"
import MagicBytes from "@/components/create/magic-bytes"

interface FileUploadCardProps {
  label: string
  accept: string
  file: File | null
  onFileSelect: (file: File | null) => void
  icon: LucideIcon
  /** Format accent colour, used for the dot and the filled state. */
  tone?: string
  /** Human-readable size cap, e.g. "50MB". */
  limitLabel?: string
  /** Position in the sequence, e.g. 1. */
  index?: number
}

export default function FileUploadCard({
  label,
  accept,
  file,
  onFileSelect,
  icon: Icon,
  tone = "#71717A",
  limitLabel,
  index,
}: FileUploadCardProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleBrowse = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div
      className={`rounded-2xl border bg-white transition-all duration-200 ${
        isDragOver
          ? "border-zinc-900 shadow-[0_0_0_4px_rgba(9,9,11,0.06)]"
          : file
            ? "border-zinc-200 shadow-[0_1px_2px_rgba(9,9,11,0.04)]"
            : "border-zinc-200"
      }`}
    >
      {/* Card head: which slot this is, what it accepts, and its cap */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          {index !== undefined && (
            <span className="font-mono text-[11px] tabular-nums text-zinc-300">
              {String(index).padStart(2, "0")}
            </span>
          )}
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: tone }} />
          <span className="truncate text-[13px] font-medium text-zinc-900">{label}</span>
        </div>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-zinc-400">
          {accept.split(",")[0]}
          {limitLabel ? ` · ${limitLabel}` : ""}
        </span>
      </div>

      <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileSelect} className="hidden" />

      {!file ? (
        <button
          type="button"
          onClick={handleBrowse}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex w-full flex-col items-center justify-center gap-4 rounded-b-2xl px-4 py-16 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:py-20 ${
            isDragOver ? "bg-zinc-50" : "hover:bg-zinc-50/70"
          }`}
        >
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all ${
              isDragOver ? "scale-105 border-zinc-300 bg-white" : "border-zinc-200 bg-zinc-50"
            }`}
          >
            <Upload className="h-[22px] w-[22px] text-zinc-400" strokeWidth={1.6} />
          </span>
          <span>
            <span className="block text-[16px] font-medium text-zinc-900">Drop your file here</span>
            <span className="mt-1 block text-[13px] text-zinc-500">
              or <span className="underline decoration-zinc-300 underline-offset-2">browse</span> to
              choose
            </span>
          </span>
        </button>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="px-4 py-5"
        >
          <div className="flex items-center gap-3.5">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${tone}1A` }}
            >
              <Icon className="h-[20px] w-[20px]" style={{ color: tone }} strokeWidth={1.75} />
            </span>

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 truncate text-[14px] font-medium text-zinc-900">
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={3} />
                <span className="truncate">{file.name}</span>
              </p>
              <p className="mt-0.5 text-[12px] tabular-nums text-zinc-500">{formatSize(file.size)}</p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={handleBrowse}
                className="rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                aria-label={`Remove ${file.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <MagicBytes file={file} tone={tone} />
        </div>
      )}
    </div>
  )
}
