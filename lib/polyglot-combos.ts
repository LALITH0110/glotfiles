// Single source of truth for the landing page: every polyglot combination the
// generator supports, keyed by the route it maps to under /create/[type].

export type FormatKey = "pdf" | "image" | "video" | "zip" | "html"

export interface Format {
  key: FormatKey
  label: string
  ext: string
  color: string
}

export const FORMATS: Format[] = [
  { key: "pdf", label: "PDF", ext: ".pdf", color: "#E5484D" },
  { key: "image", label: "Image", ext: ".png .jpg", color: "#8E4EC6" },
  { key: "video", label: "Video", ext: ".mp4 .mov", color: "#0090FF" },
  { key: "zip", label: "ZIP", ext: ".zip", color: "#F5A524" },
  { key: "html", label: "HTML", ext: ".html", color: "#12A594" },
]

export const FORMAT_BY_KEY: Record<FormatKey, Format> = Object.fromEntries(
  FORMATS.map((f) => [f.key, f]),
) as Record<FormatKey, Format>

export interface Combo {
  /** Must match a route segment under /create */
  id: string
  formats: FormatKey[]
  title: string
  description: string
  featured?: boolean
  /**
   * Hidden from the "Every mix we build" grid, but still fully supported: the
   * page is generated, the builder resolves to it and the sitemap lists it.
   * Use this to take a combination off the shelf without breaking its URL.
   */
  unlisted?: boolean
}

export const COMBOS: Combo[] = [
  {
    id: "pdf-image",
    formats: ["pdf", "image"],
    title: "PDF + Image",
    description: "A document that also opens as a picture, wherever you send it.",
    featured: true,
  },
  {
    id: "image-zip",
    formats: ["image", "zip"],
    title: "Image + ZIP",
    description: "A perfectly normal image that unzips into a full archive.",
    featured: true,
  },
  {
    id: "pdf-zip",
    formats: ["pdf", "zip"],
    title: "PDF + ZIP",
    description: "Carry an entire folder inside a readable PDF.",
    featured: true,
  },
  {
    id: "pdf-mp4",
    formats: ["pdf", "video"],
    title: "PDF + Video",
    description: "Reads as a document, plays as a video.",
  },
  {
    id: "zip-mp4",
    formats: ["zip", "video"],
    title: "ZIP + Video",
    description: "An archive that streams like any other clip.",
    unlisted: true,
  },
  {
    id: "image-mp4",
    formats: ["image", "video"],
    title: "Image + Video",
    description: "A still that turns into footage when you press play.",
  },
  {
    id: "pdf-html",
    formats: ["pdf", "html"],
    title: "PDF + HTML",
    description: "A PDF that renders as a live web page in the browser.",
  },
  {
    id: "html-zip",
    formats: ["html", "zip"],
    title: "HTML + ZIP",
    description: "A web page that unzips into the project it documents.",
  },
  {
    id: "pdf-video-zip",
    formats: ["pdf", "video", "zip"],
    title: "PDF + Video + ZIP",
    description: "Document, footage and archive folded into one artifact.",
  },
  {
    id: "zip-video-image",
    formats: ["zip", "video", "image"],
    title: "ZIP + Video + Image",
    description: "Archive, footage and artwork in a single download.",
  },
  {
    id: "image-video-pdf",
    formats: ["image", "video", "pdf"],
    title: "Image + Video + PDF",
    description: "Three formats, one file, no compromises.",
  },
  {
    id: "pdf-video-image-zip",
    formats: ["pdf", "video", "image", "zip"],
    title: "PDF + Video + Image + ZIP",
    description: "The full stack: four valid formats in one set of bytes.",
  },
  {
    id: "pdf-image-video-zip-html",
    formats: ["pdf", "image", "video", "zip", "html"],
    title: "PDF + Image + Video + ZIP + HTML",
    description: "Every format we support, folded into a single file.",
  },
]

/** The combinations shown in the landing page grid. */
export const LISTED_COMBOS: Combo[] = COMBOS.filter((c) => !c.unlisted)

/** Order-independent identity for a set of formats. */
export const comboKey = (formats: FormatKey[]): string => [...new Set(formats)].sort().join("+")

const COMBO_INDEX = new Map(COMBOS.map((c) => [comboKey(c.formats), c]))

export const findCombo = (formats: FormatKey[]): Combo | undefined =>
  COMBO_INDEX.get(comboKey(formats))

/** Combinations reachable by adding or removing a single format. */
export const nearestCombos = (formats: FormatKey[], limit = 3): Combo[] => {
  const selected = new Set(formats)
  return COMBOS.map((combo) => {
    const overlap = combo.formats.filter((f) => selected.has(f)).length
    const distance = combo.formats.length + selected.size - 2 * overlap
    return { combo, distance, overlap }
  })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => a.distance - b.distance || b.overlap - a.overlap)
    .slice(0, limit)
    .map(({ combo }) => combo)
}
