"use client"

import { useEffect, useRef } from "react"

/**
 * Ambient hero background: a slowly drifting hex dump in which real file-format
 * magic numbers surface, glow in their format colour, and fade back into the
 * noise — the same signatures the generator actually splices together.
 *
 * The static byte field is rendered once into an offscreen tile and blitted each
 * frame, so per-frame work is two drawImage calls plus a handful of fillText.
 */

interface Signature {
  bytes: string[]
  ascii: string
  color: string
}

const SIGNATURES: Signature[] = [
  { bytes: ["25", "50", "44", "46"], ascii: "%PDF", color: "#E5484D" },
  { bytes: ["50", "4B", "03", "04"], ascii: "PK..", color: "#F5A524" },
  { bytes: ["89", "50", "4E", "47"], ascii: ".PNG", color: "#8E4EC6" },
  { bytes: ["FF", "D8", "FF", "E0"], ascii: "JFIF", color: "#8E4EC6" },
  { bytes: ["66", "74", "79", "70"], ascii: "ftyp", color: "#0090FF" },
  { bytes: ["6D", "6F", "6F", "76"], ascii: "moov", color: "#0090FF" },
  { bytes: ["3C", "21", "44", "4F"], ascii: "<!DO", color: "#12A594" },
  { bytes: ["47", "49", "46", "38"], ascii: "GIF8", color: "#8E4EC6" },
]

const CELL_W = 27
const LINE_H = 23
/** Spare rows baked into the tile so height changes don't trigger a rebuild. */
const TILE_HEADROOM_ROWS = 16
const GUTTER = 66
const FONT = '500 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
const BASE_INK = "rgba(9, 9, 11, 0.07)"
const OFFSET_INK = "rgba(9, 9, 11, 0.1)"
const DRIFT = 11 // px per second
const SPAWN_EVERY = 520 // ms
const MAX_ACTIVE = 12
const LIFETIME = 5200 // ms
const FADE_IN = 700
const FADE_OUT = 1400
const PEAK_ALPHA = 0.7

const HEX = "0123456789ABCDEF"
const randomByte = () => HEX[(Math.random() * 16) | 0] + HEX[(Math.random() * 16) | 0]

interface Active {
  sig: Signature
  row: number
  col: number
  born: number
}

export default function HexRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let cols = 0
    let tileRows = 0
    let tileHeight = 0
    let tileWidth = 0
    let tileDpr = 0
    let tile: HTMLCanvasElement | null = null
    let active: Active[] = []
    let scroll = 0
    let lastFrame = 0
    let lastSpawn = 0
    let raf = 0
    let visible = true

    /**
     * Render the faint, non-animated byte field into an offscreen tile.
     * Built with generous vertical headroom so that the hero growing or
     * shrinking — the picker card swapping between its states — doesn't force a
     * rebuild, which would visibly reshuffle every byte on screen.
     */
    const buildTile = (dpr: number) => {
      tileRows = Math.ceil(height / LINE_H) + TILE_HEADROOM_ROWS
      tileHeight = tileRows * LINE_H
      tileWidth = width
      tileDpr = dpr
      cols = Math.max(1, Math.floor((width - GUTTER - 16) / CELL_W))

      const t = document.createElement("canvas")
      t.width = Math.max(1, Math.round(width * dpr))
      t.height = Math.max(1, Math.round(tileHeight * dpr))
      const tctx = t.getContext("2d")
      if (!tctx) return
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      tctx.font = FONT
      tctx.textBaseline = "alphabetic"

      for (let row = 0; row < tileRows; row++) {
        const y = row * LINE_H + LINE_H * 0.75

        tctx.fillStyle = OFFSET_INK
        tctx.fillText(((row * cols) & 0xffffff).toString(16).toUpperCase().padStart(6, "0"), 8, y)

        tctx.fillStyle = BASE_INK
        for (let col = 0; col < cols; col++) {
          tctx.fillText(randomByte(), GUTTER + col * CELL_W, y)
        }
      }
      tile = t
    }

    const spawn = (now: number) => {
      // Prefer a signature that isn't already on screen, so the field reads as a
      // varied dump rather than the same magic number three times over.
      let sig = SIGNATURES[(Math.random() * SIGNATURES.length) | 0]
      for (let pick = 0; pick < 5 && active.some((a) => a.sig === sig); pick++) {
        sig = SIGNATURES[(Math.random() * SIGNATURES.length) | 0]
      }

      const span = sig.bytes.length + 3
      if (cols <= span) return

      // Last column at which the bytes *and* their ASCII gloss still fit on
      // screen — narrow viewports would otherwise clip the run in half.
      const maxCol = Math.floor((width - GUTTER - (sig.bytes.length * CELL_W + 52)) / CELL_W)
      if (maxCol < 1) return

      // The centre of the hero is masked out, so favour the outer bands where
      // signatures are actually visible.
      const leftBand = Math.min(maxCol, Math.max(1, Math.floor(cols * 0.3) - span))
      const rightStart = Math.min(maxCol, Math.ceil(cols * 0.6))
      const rightBand = Math.max(1, maxCol - rightStart + 1)

      for (let attempt = 0; attempt < 6; attempt++) {
        const row = (Math.random() * tileRows) | 0
        const col =
          Math.random() < 0.5
            ? (Math.random() * leftBand) | 0
            : rightStart + ((Math.random() * rightBand) | 0)
        const clashes = active.some((a) => {
          const dRow = Math.abs(a.row - row)
          const dCol = Math.abs(a.col - col)
          // Same line and overlapping, or close enough to read as a cluster.
          return (
            (dRow === 0 && dCol < span + a.sig.bytes.length) || (dRow <= 2 && dCol <= span + 4)
          )
        })
        if (!clashes) {
          active.push({ sig, row, col, born: now })
          return
        }
      }
    }

    const drawSignature = (a: Active, alpha: number, y: number) => {
      if (y < -LINE_H || y > height + LINE_H) return

      const x = GUTTER + a.col * CELL_W
      const baseline = y + LINE_H * 0.75
      const runWidth = a.sig.bytes.length * CELL_W + 46

      // Punch the underlying random bytes out so the signature reads cleanly.
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(x - 5, baseline - 12, runWidth, LINE_H - 4)

      ctx.globalAlpha = alpha
      ctx.fillStyle = a.sig.color
      ctx.shadowColor = a.sig.color
      ctx.shadowBlur = 12
      for (let i = 0; i < a.sig.bytes.length; i++) {
        ctx.fillText(a.sig.bytes[i], x + i * CELL_W, baseline)
      }
      ctx.shadowBlur = 0
      ctx.globalAlpha = alpha * 0.5
      ctx.fillText(a.sig.ascii, x + a.sig.bytes.length * CELL_W + 8, baseline)
      ctx.globalAlpha = 1
      ctx.shadowColor = "transparent"
    }

    const render = (now: number) => {
      if (!tile) return
      ctx.clearRect(0, 0, width, height)

      const y = -(scroll % tileHeight)
      ctx.drawImage(tile, 0, y, width, tileHeight)
      ctx.drawImage(tile, 0, y + tileHeight, width, tileHeight)

      ctx.font = FONT
      ctx.textBaseline = "alphabetic"

      for (const a of active) {
        const age = now - a.born
        const alpha =
          age < FADE_IN
            ? (age / FADE_IN) * PEAK_ALPHA
            : age > LIFETIME - FADE_OUT
              ? Math.max(0, (LIFETIME - age) / FADE_OUT) * PEAK_ALPHA
              : PEAK_ALPHA
        if (alpha <= 0) continue

        const rowY = a.row * LINE_H + y
        drawSignature(a, alpha, rowY)
        drawSignature(a, alpha, rowY + tileHeight)
      }
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) {
        lastFrame = now
        return
      }
      const dt = Math.min(now - lastFrame, 100)
      lastFrame = now

      scroll += (dt / 1000) * DRIFT

      if (now - lastSpawn > SPAWN_EVERY && active.length < MAX_ACTIVE) {
        lastSpawn = now
        spawn(now)
      }
      active = active.filter((a) => now - a.born < LIFETIME)

      render(now)
    }

    /**
     * Called on mount and on every resize. Resizing must be non-destructive:
     * the hero changes height whenever the format picker swaps between its
     * states (valid combination / unsupported mix / too few formats), and the
     * background must not notice.
     */
    const setup = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const nextWidth = Math.max(1, Math.round(rect.width))
      const nextHeight = Math.max(1, Math.round(rect.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      if (nextWidth === width && nextHeight === height && dpr === tileDpr && tile) return

      width = nextWidth
      height = nextHeight

      // Resizing the backing store clears it, which is fine — every frame repaints.
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Only regenerate the bytes when they genuinely can't be reused: a width or
      // DPR change, or the element outgrowing the tile. A height change within
      // the tile's headroom reuses the existing field, so the drift and the live
      // signatures carry straight on.
      const mustRebuild =
        !tile || width !== tileWidth || dpr !== tileDpr || height + LINE_H * 2 > tileHeight

      if (mustRebuild) {
        buildTile(dpr)
        // Cols/rows may have shrunk — drop anything that no longer fits.
        active = active.filter((a) => a.row < tileRows && a.col < cols)
      }

      // Seed a populated field with staggered ages so the hero looks alive on the
      // first paint instead of filling in over the following six seconds. This
      // also gives the reduced-motion path a finished static composition.
      const now = performance.now()
      if (active.length === 0) {
        for (let i = 0; i < 9; i++) spawn(now - Math.random() * (LIFETIME - FADE_OUT))
      }
      render(now)
    }

    setup()

    if (!reduceMotion) {
      lastFrame = performance.now()
      lastSpawn = lastFrame
      raf = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      visible = document.visibilityState === "visible"
    }
    document.addEventListener("visibilitychange", onVisibility)

    // Pause once the hero scrolls away.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && document.visibilityState === "visible"
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const ro = new ResizeObserver(() => setup())
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("visibilitychange", onVisibility)
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full animate-[hexFadeIn_1.4s_ease-out_both] [mask-image:radial-gradient(ellipse_62%_48%_at_50%_40%,transparent_18%,rgba(0,0,0,0.5)_58%,#000_92%)]"
    />
  )
}
