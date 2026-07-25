"use client"

import { useEffect, useState } from "react"

/**
 * Reads the first bytes of a freshly selected file and renders them as a real
 * hex dump, highlighting the format signature it recognises. It is the same idea
 * the landing hero animates — except these are the user's actual bytes.
 */

interface Signature {
  label: string
  offset: number
  bytes: number[]
  color: string
}

// Checked in order; first match wins.
const SIGNATURES: Signature[] = [
  { label: "PDF document", offset: 0, bytes: [0x25, 0x50, 0x44, 0x46], color: "#E5484D" },
  { label: "PNG image", offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47], color: "#8E4EC6" },
  { label: "JPEG image", offset: 0, bytes: [0xff, 0xd8, 0xff], color: "#8E4EC6" },
  { label: "GIF image", offset: 0, bytes: [0x47, 0x49, 0x46, 0x38], color: "#8E4EC6" },
  { label: "ZIP archive", offset: 0, bytes: [0x50, 0x4b, 0x03, 0x04], color: "#F5A524" },
  { label: "ZIP archive", offset: 0, bytes: [0x50, 0x4b], color: "#F5A524" },
  { label: "MP4 / MOV video", offset: 4, bytes: [0x66, 0x74, 0x79, 0x70], color: "#0090FF" },
  { label: "WebP image", offset: 8, bytes: [0x57, 0x45, 0x42, 0x50], color: "#8E4EC6" },
  { label: "AVI video", offset: 8, bytes: [0x41, 0x56, 0x49, 0x20], color: "#0090FF" },
  { label: "HTML document", offset: 0, bytes: [0x3c, 0x21], color: "#12A594" },
  { label: "HTML document", offset: 0, bytes: [0x3c, 0x68], color: "#12A594" },
]

const ROW_BYTES = 8
const ROWS = 4
const PREVIEW_BYTES = ROW_BYTES * ROWS

const hex = (n: number) => n.toString(16).toUpperCase().padStart(2, "0")
const printable = (n: number) => (n >= 0x20 && n <= 0x7e ? String.fromCharCode(n) : ".")

const detect = (bytes: Uint8Array): Signature | null =>
  SIGNATURES.find(
    (sig) =>
      bytes.length >= sig.offset + sig.bytes.length &&
      sig.bytes.every((b, i) => bytes[sig.offset + i] === b),
  ) ?? null

export default function MagicBytes({ file, tone }: { file: File; tone: string }) {
  const [bytes, setBytes] = useState<Uint8Array | null>(null)

  useEffect(() => {
    let cancelled = false
    setBytes(null)

    file
      .slice(0, PREVIEW_BYTES)
      .arrayBuffer()
      .then((buffer) => {
        if (!cancelled) setBytes(new Uint8Array(buffer))
      })
      .catch(() => {
        /* preview is decorative — never block on it */
      })

    return () => {
      cancelled = true
    }
  }, [file])

  if (!bytes || bytes.length === 0) return null

  const signature = detect(bytes)
  const inSignature = (i: number) =>
    signature !== null && i >= signature.offset && i < signature.offset + signature.bytes.length

  const rows = Array.from({ length: Math.ceil(bytes.length / ROW_BYTES) }, (_, r) =>
    Array.from({ length: ROW_BYTES }, (_, c) => r * ROW_BYTES + c),
  )

  return (
    <div className="mt-4 rounded-xl border border-zinc-100 bg-zinc-50/60 p-3">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 font-mono text-[11px] leading-[1.7]">
          <tbody>
            {rows.map((row, r) => (
              <tr
                key={r}
                className="animate-[byteIn_0.4s_ease-out_both]"
                style={{ animationDelay: `${r * 60}ms` }}
              >
                <td className="pr-3 tabular-nums text-zinc-300">
                  {(r * ROW_BYTES).toString(16).toUpperCase().padStart(6, "0")}
                </td>
                {row.map((i) => (
                  <td
                    key={i}
                    className="px-[3px] tabular-nums"
                    style={{
                      color: i < bytes.length ? (inSignature(i) ? signature!.color : "#a1a1aa") : "transparent",
                      fontWeight: inSignature(i) ? 600 : 400,
                    }}
                  >
                    {i < bytes.length ? hex(bytes[i]) : "··"}
                  </td>
                ))}
                <td className="pl-3 whitespace-pre text-zinc-400">
                  {row
                    .map((i) => (i < bytes.length ? printable(bytes[i]) : " "))
                    .join("")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2.5 flex items-center gap-2 border-t border-zinc-200/70 pt-2.5">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: signature ? signature.color : tone }}
        />
        <span className="text-[11px] text-zinc-500">
          {signature ? (
            <>
              Magic bytes recognised —{" "}
              <span className="font-medium text-zinc-900">{signature.label}</span>
            </>
          ) : (
            "Header read — no known signature at offset 0"
          )}
        </span>
      </div>
    </div>
  )
}
