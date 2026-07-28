// File size limits and formatting, shared by the upload cards, the generator and
// the create-page sidebar so the numbers can never drift apart.

/** Conservative file size limits (in bytes) */
export const FILE_SIZE_LIMITS = {
  PDF: 50 * 1024 * 1024, // 50MB
  Image: 25 * 1024 * 1024, // 25MB
  Video: 100 * 1024 * 1024, // 100MB
  ZIP: 100 * 1024 * 1024, // 100MB
  HTML: 1 * 1024 * 1024, // 1MB
  Audio: 50 * 1024 * 1024, // 50MB (for any future audio types)
} as const

export const DEFAULT_LIMIT = 25 * 1024 * 1024

/** Compact form used for limits and validation messages: "50MB", "512KB". */
export const formatLimit = (bytes: number): string => {
  if (bytes >= 1024 * 1024) return `${Math.round(bytes / (1024 * 1024))}MB`
  if (bytes >= 1024) return `${Math.round(bytes / 1024)}KB`
  return `${bytes}B`
}

/** Precise form used when showing a selected file: "1.23 MB". */
export const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

// Looked up case-insensitively. The previous implementation title-cased the type
// ("PDF" -> "Pdf"), which missed the PDF, ZIP and HTML keys entirely and silently
// fell back to the 25MB default while the UI advertised 50MB/100MB/1MB.
const LIMIT_BY_KEY: Record<string, number> = Object.fromEntries(
  Object.entries(FILE_SIZE_LIMITS).map(([key, value]) => [key.toLowerCase(), value]),
)

export const getFileSizeLimit = (fileType: string): number =>
  LIMIT_BY_KEY[fileType.toLowerCase()] ?? DEFAULT_LIMIT

export const validateFileSize = (
  file: File,
  fileType: string,
): { valid: boolean; message?: string } => {
  const limit = getFileSizeLimit(fileType)
  if (file.size > limit) {
    return {
      valid: false,
      message: `${fileType} file is too large (${formatLimit(file.size)}). Maximum allowed size is ${formatLimit(limit)}.`,
    }
  }
  return { valid: true }
}

/** Every limit, in the order shown in the sidebar and the inline hint. */
export const ALL_LIMITS: { type: string; limit: number }[] = [
  { type: "PDF", limit: FILE_SIZE_LIMITS.PDF },
  { type: "Image", limit: FILE_SIZE_LIMITS.Image },
  { type: "Video", limit: FILE_SIZE_LIMITS.Video },
  { type: "ZIP", limit: FILE_SIZE_LIMITS.ZIP },
  { type: "HTML", limit: FILE_SIZE_LIMITS.HTML },
]

/** Accent colour per format, matching the landing page palette. */
export const TYPE_COLORS: Record<string, string> = {
  pdf: "#E5484D",
  image: "#8E4EC6",
  video: "#0090FF",
  zip: "#F5A524",
  html: "#12A594",
  audio: "#12A594",
}

export const colorForType = (fileType: string): string =>
  TYPE_COLORS[fileType.toLowerCase()] ?? "#71717A"
