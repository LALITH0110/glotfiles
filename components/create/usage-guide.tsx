import type { ReactNode } from "react"

/**
 * Every piece of guidance the create flow shows. Kept in one file so the wording
 * stays identical wherever it appears (sidebar, result panel, download dialog).
 */

const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-zinc-900/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-zinc-800">
    {children}
  </code>
)

/** Shown for every combination: how to actually open the generated file. */
export function GeneralUsage() {
  return (
    <ul className="space-y-2.5 text-[13px] leading-relaxed text-zinc-600">
      <li className="flex gap-2">
        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
        <span>
          To access different file types, simply rename the file extension (e.g. <Code>.zip</Code>,{" "}
          <Code>.mp4</Code>, <Code>.jpg</Code>, etc.).
        </span>
      </li>
      <li className="flex gap-2">
        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
        <span>
          If your computer can&apos;t open <Code>.zip</Code> files, try using the command line:{" "}
          <Code>unzip filename.zip</Code>
        </span>
      </li>
      <li className="flex gap-2">
        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
        <span>
          <Code>.mp4</Code> files may not play in some video players, but work fine with popular ones
          like VLC or QuickTime Player.
        </span>
      </li>
      <li className="flex gap-2">
        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
        <span>
          These files are polyglots and may behave differently depending on the software used to open
          them.
        </span>
      </li>
    </ul>
  )
}

/** Combinations that have extra, format-specific instructions. */
export const TYPES_WITH_GUIDANCE = [
  "pdf-zip",
  "pdf-image",
  "image-mp4",
  "pdf-image-video-zip-html",
]

export function hasTypeGuidance(type: string): boolean {
  return TYPES_WITH_GUIDANCE.includes(type)
}

export function TypeGuidance({ type }: { type: string }) {
  if (!hasTypeGuidance(type)) return null

  return (
    <ul className="space-y-2.5 text-[13px] leading-relaxed text-zinc-600">
      {type === "pdf-zip" && (
        <>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As PDF:</strong> rename to{" "}
              <Code>.pdf</Code> and open in any PDF viewer.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As ZIP:</strong> rename to{" "}
              <Code>.zip</Code> and use Terminal: <Code>unzip filename.zip</Code>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">Note:</strong> use Terminal for ZIP
              extraction. macOS Archive Utility may not work.
            </span>
          </li>
        </>
      )}
      {type === "pdf-image" && (
        <>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As Image:</strong> rename to{" "}
              <Code>.png</Code> or <Code>.jpg</Code> and open in any image viewer.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As PDF:</strong> rename to{" "}
              <Code>.pdf</Code> and open in any PDF viewer.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">Note:</strong> the file works as both
              image and PDF depending on the extension.
            </span>
          </li>
        </>
      )}
      {type === "image-mp4" && (
        <>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As Video:</strong> rename to{" "}
              <Code>.mp4</Code> and open in any video player.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As Image:</strong> rename to{" "}
              <Code>.ico</Code> and open in any image viewer.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">Note:</strong> both formats work
              simultaneously, a true polyglot.
            </span>
          </li>
        </>
      )}
      {type === "pdf-image-video-zip-html" && (
        <>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As Video:</strong> keep the{" "}
              <Code>.mp4</Code> extension it downloads with and open it in any video player.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As PDF:</strong> rename to{" "}
              <Code>.pdf</Code> and open in any PDF viewer.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As Image:</strong> rename to{" "}
              <Code>.ico</Code> and open in any image viewer. The image is carried in the icon
              header at the start of the file, so <Code>.png</Code> and <Code>.jpg</Code> will not
              work here.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As ZIP:</strong> rename to{" "}
              <Code>.zip</Code> and use Terminal: <Code>unzip filename.zip</Code>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">As HTML:</strong> rename to{" "}
              <Code>.html</Code> and open it in a browser.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            <span>
              <strong className="font-medium text-zinc-900">Note:</strong> five formats is a lot of
              work for the server. Generation usually takes a minute or two.
            </span>
          </li>
        </>
      )}
    </ul>
  )
}

/** The terms the download dialog asks the user to accept. */
export const SECURITY_INTRO =
  "These files may be interpreted differently by different programs and can potentially be used to bypass filters or security mechanisms."

export const SECURITY_TERMS = [
  "Use it only for educational, research, or testing purposes.",
  "Not use the output for malicious purposes, phishing, or exploiting vulnerabilities.",
  "Take full responsibility for any consequences of using the generated files.",
]
