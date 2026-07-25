# glotfiles — landing page redesign

A full copy of `polyglot-front` with a rebuilt landing page. Everything past the
landing page is byte-identical to the original.

## Run it

```bash
cd glotfiles-redesign
pnpm install
pnpm dev
```

## What changed

| File | Change |
| --- | --- |
| `app/page.tsx` | Rewritten landing page |
| `components/landing/combo-builder.tsx` | **New** — interactive format picker in the hero |
| `components/landing/hex-rain.tsx` | **New** — animated hex-dump hero backdrop |
| `components/landing/site-header.tsx` | **New** — header that collapses into a floating pill on scroll |
| `components/landing/logo.tsx` | **New** — shared mark, same artwork as the favicon |
| `components/landing/live-counter.tsx` | **New** — live Firebase generation count |
| `lib/polyglot-combos.ts` | **New** — single source of truth for the 11 combinations |
| `app/globals.css` | Locked to `color-scheme: light`, wired Geist Mono to `font-mono`, hid the native `<details>` marker |
| `app/layout.tsx` | Fixed the font CSS vars (they were set to class names, not font families); dropped the `icons` metadata block |
| `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` | **New** — favicon set (see below) |
| `public/favicon-options/` | **New** — the six favicon candidates, kept for reference |

| `app/create/**` | Rewritten chrome — all four routes now render `CreateShell` |
| `components/create/*` | **New** — create-page shell and all user-facing guidance copy |
| `components/polyglot-creator.tsx`, `components/file-upload-card.tsx` | Redesigned; generation logic unchanged |
| `lib/polyglot-limits.ts` | **New** — one source of truth for size limits and formatting |

Untouched: `app/privacy-terms`, all of `components/ui`.

## Design notes

- **Light mode only.** No `.dark` class is ever applied and `color-scheme: light`
  stops the OS preference from tinting form controls.
- **Generation lives on the first page.** The hero contains the actual product:
  pick 2–4 formats, the matching polyglot resolves live, one button goes straight
  to upload. The full 11-card grid still sits below for people who prefer to browse.
- **Unsupported mixes degrade gracefully** — `nearestCombos()` suggests the closest
  combinations we do build instead of dead-ending.
- **Palette:** near-black actions on white, one warm accent (`#FF5C35`), and a fixed
  per-format colour (PDF red / Image violet / Video blue / ZIP amber / HTML teal)
  used only as small dots so the page stays calm.
- **Firebase is lazy-loaded** inside `LiveCounter`, which keeps the landing page at
  ~108 kB first-load JS versus 242 kB on the create pages.

## The create page

Same shell for all four routes (`/create/[type]` plus the three dedicated ones),
so there is one implementation instead of four near-copies. Layout is a two-column
split: a numbered work flow on the left, a sticky reference sidebar on the right.

Every feature from the old page is preserved, just relocated:

| Old | Now |
| --- | --- |
| Upload cards with drag/drop, browse, replace, remove | Same, restyled; whole zone is a drop target and a button, and a selected file reveals its magic bytes (see below) |
| Per-file size validation + message | Unchanged wording, now from `lib/polyglot-limits.ts` |
| "File size limits" line under the button | Still there, **plus** an always-visible sidebar card |
| "Please upload both/all three/all four files" | Same wording, beside the generate button |
| Error banner, 5-second "hang tight" banner | Same, restyled; error text now honours its line break |
| Success message + download button | Same, plus the parsed `content-disposition` filename |
| "How to use polyglot files" (4 bullets) | Shown on success **and** in the sidebar |
| Per-type guidance (pdf-zip, pdf-image, image-mp4) | Sidebar card, same wording |
| Download security dialog | Same copy and Radix dialog, restyled |
| `notFound()` for unknown types, Coming Soon block | Preserved |

The create page deliberately has **no site nav and no footer** — it's a focused
task, and the only chrome is the `← All combinations` link.

### Magic bytes (`components/create/magic-bytes.tsx`)

When a file is selected, its first 32 bytes are read with `file.slice(0, 32)` and
rendered as a real hex dump with an ASCII gutter. The recognised format signature
is highlighted in that format's colour — `25 50 44 46` for `%PDF`, `89 50 4E 47`
for PNG, `50 4B 03 04` for ZIP, `ftyp` at offset 4 for MP4, and so on.

It's the landing hero's idea made concrete: those are the user's own bytes, and the
signature shown is exactly what the generator has to keep valid. Rows fade in
staggered by 60ms (disabled under `prefers-reduced-motion`). Detection failure is
not an error — it falls back to "no known signature at offset 0" and never blocks
generation.

### Two bugs found and fixed on the way

1. **Size limits were never applied to PDF, ZIP or HTML.** `getFileSizeLimit()`
   title-cased the type (`"PDF"` → `"Pdf"`), which matched no key in
   `FILE_SIZE_LIMITS`, so all three silently fell back to the 25MB default while
   the UI advertised 50MB / 100MB / 1MB. Lookup is now case-insensitive, so the
   advertised limits are the real ones. **If the backend enforces a stricter cap,
   this will surface as server-side rejections that the browser used to catch.**
2. **A slow Firebase could strand the UI mid-generation.** The counter increment
   was awaited inside the `try`, so if Firebase hung — routinely the case with ad
   blockers — the `finally` never ran, leaving `isGenerating` true and the "hang
   tight" banner stuck on screen next to the finished file. It is now
   fire-and-forget with the same logging and the same failure tolerance.

## The header (`site-header.tsx`)

Flush and full-width at the top of the page, transparent so the hex backdrop runs
behind it. Past ~48px of scroll it collapses into a floating pill: narrower
(620px on desktop, 430px on mobile), shorter (64 → 56px), detached from the top
edge, with the three groups pulled tight against each other. It then follows you
down the page.

- It is **`fixed`, not `sticky`, on purpose.** A sticky header occupies flow space,
  so shrinking its height would shorten the document, which can bounce the scroll
  position back across the threshold and flicker the pill. Fixed removes the
  feedback loop entirely; the hero carries extra top padding to clear it.
- Thresholds are asymmetric (condense past 48px, expand below 20px) so resting
  exactly on the boundary can't oscillate either.
- The scroll handler is rAF-coalesced and `{ passive: true }`.
- Nav links are `whitespace-nowrap` — the condensed width is deliberately snug and
  they would otherwise wrap when the pill tightens.

## The hero backdrop (`hex-rain.tsx`)

A slowly drifting hex dump in which real magic numbers surface, glow in their
format colour, and fade back into the noise — `%PDF`, `PK␃␄`, `\x89PNG`, `JFIF`,
`ftyp`, `moov`, `<!DO`, `GIF8`. These are the same signatures the generator splices
together, so the background is the product rather than decoration.

Things worth knowing before editing it:

- **Never give the backdrop a negative `z-index`.** It sits inside a wrapper with an
  opaque white background, so `-z-10` hides it completely. The content column
  carries `relative` instead, which keeps it above the canvas via DOM order.
- The static byte field is rasterised once into an offscreen tile and blitted twice
  per frame; only the ~10 live signatures are drawn with `fillText`. Per-frame cost
  stays roughly flat as the hero grows.
- Signatures are placed in the **outer column bands only** — the mask punches a hole
  through the middle for the headline, so centre spawns would be invisible. Spawn
  columns are also clamped so the bytes and their ASCII gloss never clip off a
  narrow viewport.
- Nine signatures are seeded with staggered ages on first paint, otherwise the hero
  spends its first six seconds filling up.
- **Resizing is non-destructive.** The picker card changes the hero's height every
  time it swaps state (valid combination 1044px / unsupported mix 1055px / too few
  formats 1009px), which fires the `ResizeObserver`. Regenerating the byte field
  there would reshuffle every character on screen, so the tile carries 16 rows of
  headroom and is only rebuilt on a width or DPR change — never on height alone —
  and live signatures are never cleared.
- It stops on `prefers-reduced-motion` (rendering one static composition), when the
  tab is hidden, and once the hero scrolls out of view.

## Favicon

The mark is **E · Two files** — an orange document behind a white one, both with
turned corners. It replaces the old glossy multi-colour icon, which collapsed into
something indistinguishable from the Chrome logo at 16px.

Next's file conventions do all the wiring, so there is no `icons` block in metadata:

| File | Size | Notes |
| --- | --- | --- |
| `app/icon.svg` | vector | Rounded corners baked in; primary icon |
| `app/favicon.ico` | 16 + 32 + 48 | Multi-frame, for legacy surfaces |
| `app/apple-icon.png` | 180×180 | **Full-bleed square, no rounded corners** — iOS applies its own mask, and it cannot read WebP (which is why the old home-screen icon was broken) |

The other five candidates live in `public/favicon-options/`, and
`favicon-preview.html` at the project root renders all six at true sizes over light
and dark tab strips. To swap: copy the chosen SVG over `app/icon.svg` and regenerate
the raster pair from it.

The legacy `public/favicon.png`, `favicon.webp`, `favicon1.png` and `favicon1.ico`
are no longer referenced but were left in place in case anything external points at
them. They're ~780 kB in total and safe to delete once you've confirmed nothing does.

## Adding a combination

Add one entry to `COMBOS` in `lib/polyglot-combos.ts`. The `id` must match a key in
`polyglotConfigs` in `app/create/[type]/page.tsx` — both the grid and the hero
builder pick it up automatically. `formats` must be a set no other combo already
uses, since lookup is order-independent.
