/**
 * Per-combination explanatory copy.
 *
 * The generator pages previously carried ~270 words each, almost all UI chrome,
 * with only the title and a one-line description differing between them — eight
 * of the eleven had no unique prose at all. This gives each page a real answer to
 * "what is this specific combination, and why would anyone make one", which is
 * both the thin-content fix and the passage an AI engine can actually cite.
 *
 * `mechanism` explains the structural trick honestly; `useCases` are the real
 * reasons people build these. Keep them factual — no superlatives.
 */

export interface ComboExplainer {
  /** Answers "what is a {X} + {Y} polyglot?" in one citable paragraph. */
  what: string
  /** How the two formats structurally coexist. */
  mechanism: string
  /** Concrete, honest reasons to build one. */
  useCases: string[]
}

export const COMBO_EXPLAINERS: Record<string, ComboExplainer> = {
  "pdf-image": {
    what: "A PDF + Image polyglot is one file that a PDF reader opens as a document and an image viewer opens as a picture. Neither application is being tricked or seeing a renamed file — the same bytes genuinely satisfy both the PDF specification and the PNG or JPEG specification at once.",
    mechanism:
      "Image formats identify themselves from a signature in the first few bytes, while PDF readers scan for the %PDF header near the start of the file and read structure from the trailer at the end. That tolerance leaves room for both structures to occupy one byte stream.",
    useCases: [
      "Testing whether an upload filter validates file type by extension, MIME type, or actual content",
      "CTF challenges where a submitted image also has to be a readable document",
      "Sending one attachment that opens sensibly whichever way the recipient's software treats it",
    ],
  },
  "image-zip": {
    what: "An Image + ZIP polyglot displays as an ordinary picture and extracts as a complete archive. Opening it in an image viewer shows the image; passing the same file to an unzip tool yields the archived contents.",
    mechanism:
      "ZIP readers locate the end-of-central-directory record by scanning backwards from the end of the file, so an archive does not have to begin at byte zero. That lets the image data sit in front of it while the archive stays fully valid.",
    useCases: [
      "The classic CTF steganography setup, where an innocuous image hides a payload in plain sight",
      "Checking that a scanner inspects entire file contents rather than stopping at the image header",
      "Bundling source files alongside the rendered image they produce, as a single download",
    ],
  },
  "pdf-zip": {
    what: "A PDF + ZIP polyglot reads as a normal document in any PDF viewer and unpacks as a normal archive in any ZIP tool. One file, two complete and independently valid structures.",
    mechanism:
      "PDF tolerates leading bytes before its header and locates its object table from the trailer, while ZIP locates its central directory from the end. Both formats read inward from opposite directions, so they can share a file without either being malformed.",
    useCases: [
      "Shipping a report together with the raw data behind it, as one attachment",
      "Security research into file-type detection, where a document and an archive share a signature",
      "CTF challenges that require finding a second format hidden inside a readable document",
    ],
  },
  "pdf-mp4": {
    what: "A PDF + Video polyglot opens as a readable document in a PDF viewer and plays as video in a media player. The file is simultaneously a valid document and valid MP4 container.",
    mechanism:
      "MP4 files are built from a sequence of length-prefixed atoms, and readers skip atoms they do not recognise. Placing the PDF structure inside an ignored atom keeps the video valid while leaving the document intact.",
    useCases: [
      "Distributing a talk recording alongside its written transcript in a single file",
      "Testing how content-inspection pipelines classify a file with two valid container formats",
      "Demonstrating MP4 atom parsing behaviour in teaching material",
    ],
  },
  "zip-mp4": {
    what: "A ZIP + Video polyglot plays as a normal video and extracts as a normal archive. Media players stream it; archive tools unpack it.",
    mechanism:
      "The MP4 atom structure is read from the front and skips unknown atoms, while the ZIP central directory is found by scanning from the end. Neither reader is disturbed by the other's data.",
    useCases: [
      "Shipping a video with its project files, subtitles or assets attached to the same file",
      "Testing whether media-upload validation inspects beyond the container header",
      "CTF challenges built around media file internals",
    ],
  },
  "image-mp4": {
    what: "An Image + Video polyglot shows a still image in an image viewer and plays footage in a media player — a genuine dual-format file rather than a thumbnail embedded in metadata.",
    mechanism:
      "Both formats are identified from structures near the start of the file, so the layout has to interleave carefully: the image signature stays where viewers expect it while the MP4 atom chain remains walkable from its own offset.",
    useCases: [
      "Pairing a poster frame with the clip it represents in one file",
      "Testing thumbnail-generation and media-validation pipelines against ambiguous input",
      "CTF and forensics exercises on magic-byte based file identification",
    ],
  },
  "pdf-html": {
    what: "A PDF + HTML polyglot opens as a document in a PDF reader and renders as a web page in a browser. The same file is both a printable document and a live page.",
    mechanism:
      "Browsers parse HTML leniently and ignore bytes they cannot interpret as markup, while PDF readers tolerate content before the %PDF header. Each parser finds its own structure and disregards the rest.",
    useCases: [
      "Publishing documentation that reads correctly whether opened in a browser or a PDF reader",
      "Testing how upload filters and email gateways classify dual-parse content",
      "Research into browser and PDF parser leniency",
    ],
  },
  "pdf-video-zip": {
    what: "A triple polyglot valid as a PDF document, an MP4 video and a ZIP archive at the same time — three complete format structures sharing one file.",
    mechanism:
      "It combines all three tricks: the MP4 atom chain skips unrecognised regions, PDF reads inward from its header and trailer, and ZIP finds its central directory from the end of the file.",
    useCases: [
      "Delivering a recording, its written notes and its supporting files as a single artifact",
      "Stress-testing content-inspection tooling against a file with three valid identities",
      "Advanced CTF challenges with multiple nested formats to discover",
    ],
  },
  "zip-video-image": {
    what: "A triple polyglot that plays as video, displays as an image and extracts as an archive. Three formats, one set of bytes, all independently valid.",
    mechanism:
      "The image signature sits where viewers look for it, the MP4 atom chain remains walkable, and the ZIP central directory is discovered by scanning backwards — three readers, three entry points, no conflict.",
    useCases: [
      "Packaging a clip, its cover image and its assets as one download",
      "Testing multi-stage media validation pipelines",
      "Forensics training on files that resist single-format classification",
    ],
  },
  "image-video-pdf": {
    what: "A triple polyglot valid as an image, an MP4 video and a PDF document simultaneously — each opens correctly in its own application with no conversion step.",
    mechanism:
      "The image header stays at the front for viewers, the MP4 atom structure carries the remaining formats in regions media players skip, and the PDF structure is located from its own header and trailer.",
    useCases: [
      "Distributing a still, its footage and its written documentation together",
      "Probing how classification tools resolve a file with three competing signatures",
      "Demonstrating format-detection ambiguity in security teaching",
    ],
  },
  "pdf-video-image-zip": {
    what: "The four-format polyglot: one file that is at once a valid PDF, a valid MP4, a valid image and a valid ZIP archive. Four applications, four correct interpretations, one set of bytes.",
    mechanism:
      "Each format is located differently — image by leading signature, MP4 by its atom chain, PDF by header and trailer, ZIP by scanning back from the end — and those four strategies can be satisfied simultaneously with careful layout.",
    useCases: [
      "Demonstrating just how far file-format ambiguity extends",
      "Testing whether a security pipeline detects every format present, not just the first",
      "Building CTF challenges with several layers to uncover",
    ],
  },
}

export const getExplainer = (type: string): ComboExplainer | undefined =>
  COMBO_EXPLAINERS[type]
