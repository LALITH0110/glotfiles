"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  CheckCircle2,
  Download,
  FileImage,
  FileText,
  Loader2,
  Music,
  Sparkles,
  Upload,
  Video,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import FileUploadCard from "@/components/file-upload-card"
import { GeneralUsage, SECURITY_INTRO, SECURITY_TERMS } from "@/components/create/usage-guide"
import { incrementPolyglotCounter } from "@/lib/firebase"
import {
  colorForType,
  formatLimit,
  getFileSizeLimit,
  validateFileSize,
} from "@/lib/polyglot-limits"

interface FileSlot {
  label: string
  accept: string
  type: string
}

interface PolyglotConfig {
  title: string
  description: string
  file1: FileSlot
  file2: FileSlot
  file3?: FileSlot
  file4?: FileSlot
  file5?: FileSlot
}

interface PolyglotCreatorProps {
  config: PolyglotConfig
  type: string
}

const getIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case "pdf":
      return FileText
    case "image":
      return FileImage
    case "zip":
      return Archive
    case "video":
      return Video
    case "audio":
      return Music
    case "html":
      return FileText
    default:
      return Upload
  }
}

export default function PolyglotCreator({ config, type }: PolyglotCreatorProps) {
  const [file1, setFile1] = useState<File | null>(null)
  const [file2, setFile2] = useState<File | null>(null)
  const [file3, setFile3] = useState<File | null>(null)
  const [file4, setFile4] = useState<File | null>(null)
  const [file5, setFile5] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [downloadFilename, setDownloadFilename] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [showLongWaitMessage, setShowLongWaitMessage] = useState(false)

  // Wrapper functions for file selection with validation
  const handleFileSelect = (
    file: File | null,
    fileType: string,
    setter: (file: File | null) => void,
  ) => {
    setErrorMessage("") // Clear any existing errors

    if (!file) {
      setter(null)
      return
    }

    const validation = validateFileSize(file, fileType)
    if (!validation.valid) {
      setErrorMessage(validation.message!)
      return
    }

    setter(file)
  }

  const canGenerate =
    file1 &&
    file2 &&
    (!config.file3 || file3) &&
    (!config.file4 || file4) &&
    (!config.file5 || file5) &&
    !isGenerating &&
    !errorMessage

  const slots = [config.file1, config.file2, config.file3, config.file4, config.file5].filter(
    Boolean,
  ) as FileSlot[]
  const files = [file1, file2, file3, file4, file5]
  const setters = [setFile1, setFile2, setFile3, setFile4, setFile5]
  const selectedCount = files.slice(0, slots.length).filter(Boolean).length

  const handleGenerate = async () => {
    if (!canGenerate) return

    setIsGenerating(true)
    setErrorMessage("") // Clear any existing errors
    setShowLongWaitMessage(false)

    // Show message after 5 seconds if still generating
    const longWaitTimer = setTimeout(() => {
      setShowLongWaitMessage(true)
    }, 5000)

    try {
      const formData = new FormData()
      formData.append("file1", file1)
      formData.append("file2", file2)
      if (file3) formData.append("file3", file3)
      if (file4) formData.append("file4", file4)
      if (file5) formData.append("file5", file5)
      formData.append("type", type)

      let response
      try {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/generate-polyglot`, {
          method: "POST",
          body: formData,
        })
      } catch (fetchError) {
        // Network errors, CORS errors, server unreachable, etc.
        throw new Error("SERVICE_UNAVAILABLE")
      }

      if (!response.ok) {
        if (response.status >= 500) {
          // Server errors (5xx)
          throw new Error("SERVICE_UNAVAILABLE")
        } else {
          // Client errors (4xx) - try to get specific error message
          try {
            const errorData = await response.json()
            throw new Error(errorData.detail || "Failed to generate polyglot file")
          } catch (jsonError) {
            throw new Error("Failed to generate polyglot file")
          }
        }
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)

      // Get filename from response headers
      const contentDisposition = response.headers.get("content-disposition")
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          setDownloadFilename(filenameMatch[1])
        }
      }

      // Increment the global counter after successful generation.
      // Deliberately not awaited: Firebase is frequently slow or blocked outright
      // by ad blockers, and awaiting it here would hold `isGenerating` true (and
      // the "hang tight" banner visible) long after the file is ready.
      incrementPolyglotCounter()
        .then(() => {
          console.log(`Global counter incremented for successful ${type} polyglot generation`)
        })
        .catch((counterError) => {
          console.error("Error incrementing counter:", counterError)
          // Don't fail the generation process if counter fails
        })
    } catch (error) {
      console.error("Error generating polyglot:", error)

      // Handle different types of errors
      if (error instanceof Error && error.message === "SERVICE_UNAVAILABLE") {
        // Network/connection errors or server errors (5xx)
        setErrorMessage(
          "Our servers are currently experiencing a high volume of requests.\nPlease try again in a few minutes.",
        )
      } else if (error instanceof Error) {
        // Server responded with a specific error message
        setErrorMessage(error.message)
      } else {
        // Generic fallback
        setErrorMessage("Failed to generate polyglot file. Please try again.")
      }
    } finally {
      clearTimeout(longWaitTimer)
      setIsGenerating(false)
      setShowLongWaitMessage(false)
    }
  }

  const handleDownload = () => {
    setShowWarningModal(true)
  }

  const proceedWithDownload = () => {
    if (downloadUrl) {
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = downloadFilename || `polyglot-${type}-${Date.now()}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
    setShowWarningModal(false)
  }

  const missingLabel =
    config.file4 ? "all four files" : config.file3 ? "all three files" : "both files"

  return (
    <div className="space-y-10">
      {/* ---------------------------------------------------- 01 · add files */}
      <section>
        <StepHeading
          index="01"
          title="Add your files"
          trailing={
            <span className="font-mono text-[11px] tabular-nums text-zinc-400">
              {selectedCount}/{slots.length} added
            </span>
          }
        />
        <div className={`mt-4 grid gap-3 ${slots.length > 2 ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
          {slots.map((slot, i) => (
            <FileUploadCard
              key={`${slot.label}-${i}`}
              label={slot.label}
              accept={slot.accept}
              file={files[i]}
              onFileSelect={(file) => handleFileSelect(file, slot.type, setters[i])}
              icon={getIcon(slot.type)}
              tone={colorForType(slot.type)}
              limitLabel={formatLimit(getFileSizeLimit(slot.type))}
              index={i + 1}
            />
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- 02 · generate */}
      <section>
        <StepHeading index="02" title="Generate" />

        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
          {/* Error Message Display */}
          {errorMessage && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <AlertTriangle className="mt-0.5 h-[17px] w-[17px] shrink-0 text-red-600" strokeWidth={1.75} />
              <p className="whitespace-pre-line text-[13px] leading-relaxed text-red-700">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Long Wait Info Message */}
          {showLongWaitMessage && isGenerating && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <Sparkles className="mt-0.5 h-[17px] w-[17px] shrink-0 text-blue-600" strokeWidth={1.75} />
              <p className="text-[13px] leading-relaxed text-blue-700">
                Hang tight! This usually takes 1-2 minutes. We&apos;re crafting your polyglot file
                with care.
              </p>
            </div>
          )}

          {!downloadUrl ? (
            <div className="flex flex-col items-center gap-5 py-2 text-center">
              <div className="min-w-0">
                {!canGenerate && !isGenerating ? (
                  <>
                    <p className="text-[14px] text-zinc-600">
                      Please upload {missingLabel} to generate your polyglot file
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-zinc-400">
                      Limits ·{" "}
                      {slots
                        .map((s) => `${s.type} ${formatLimit(getFileSizeLimit(s.type))}`)
                        .join(" · ")}
                    </p>
                  </>
                ) : (
                  <p className="text-[14px] text-zinc-600">
                    {isGenerating
                      ? "Fusing your files into a single set of bytes…"
                      : "Everything's ready — this usually takes a couple of seconds."}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 text-[15px] font-medium text-white transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    Generate polyglot
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-disabled:translate-x-0" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center gap-5 py-2 text-center">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2
                    className="h-[18px] w-[18px] shrink-0 text-emerald-600"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-zinc-900">
                      Polyglot file generated successfully!
                    </p>
                    {downloadFilename && (
                      <p className="mt-0.5 truncate font-mono text-[12px] text-zinc-500">
                        {downloadFilename}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 text-[15px] font-medium text-white transition-colors hover:bg-zinc-800"
                >
                  <Download className="h-4 w-4" />
                  Download file
                </button>
              </div>

              {/* General usage instructions for all polyglots */}
              <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4">
                <h4 className="mb-3 text-[13px] font-semibold text-zinc-900">
                  How to use polyglot files
                </h4>
                <GeneralUsage />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Warning Modal — Radix keeps focus trapping, Escape and scroll locking */}
      <Dialog open={showWarningModal} onOpenChange={setShowWarningModal}>
        <DialogContent className="gap-0 overflow-hidden rounded-2xl border-zinc-200 p-0 sm:max-w-[560px]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.01em] text-zinc-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF5C35]/10">
                  <AlertTriangle className="h-[17px] w-[17px] text-[#FF5C35]" strokeWidth={1.9} />
                </span>
                Important Security Warning
              </DialogTitle>
              <DialogDescription className="pt-2 text-left text-[14px] leading-relaxed text-zinc-600">
                {SECURITY_INTRO}
              </DialogDescription>
            </DialogHeader>

            <p className="mt-4 text-[14px] font-semibold text-zinc-900">
              By using this tool, you agree to:
            </p>
            <ul className="mt-2.5 space-y-2">
              {SECURITY_TERMS.map((term) => (
                <li key={term} className="flex gap-2.5 text-[14px] leading-relaxed text-zinc-600">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>

          <DialogFooter className="flex-col-reverse gap-2 border-t border-zinc-100 bg-zinc-50/70 p-4 sm:flex-row sm:justify-end sm:gap-2">
            <button
              type="button"
              onClick={() => setShowWarningModal(false)}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-[14px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={proceedWithDownload}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#FF5C35] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#ef4f28]"
            >
              I Understand, Proceed
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StepHeading({
  index,
  title,
  trailing,
}: {
  index: string
  title: string
  trailing?: React.ReactNode
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-zinc-100 pb-3">
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
        {index} — {title}
      </h2>
      {trailing}
    </div>
  )
}
