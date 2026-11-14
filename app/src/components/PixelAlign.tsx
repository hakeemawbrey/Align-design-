import { useEffect, useRef } from 'react'

/**
 * The pixel-star alignment, from the reels: scattered pixel stars twinkle,
 * seven of them (the Align mark's seven colours) fly into a column, and the
 * moment they line up they burst. Drawn on a canvas with hard pixels, the
 * same sprites the reels use.
 */

/** 7×7 pixel-star sprites, big to small ('C' is the bright centre) */
const SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map((rows) => rows.flatMap((row, y) => [...row].map((ch, x) => (ch === '.' ? null : ([x, y, ch === 'C'] as const)))).filter((v): v is readonly [number, number, boolean] => !!v))

export function drawPixelStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, kind: number, color: string, centre = '#fff3e0') {
  const px = Math.max(1, Math.round(size / 7)), x0 = Math.round(cx - px * 3.5), y0 = Math.round(cy - px * 3.5)
  for (const [x, y, c] of SPRITES[kind % SPRITES.length]) {
    ctx.fillStyle = c ? centre : color
    ctx.fillRect(x0 + x * px, y0 + y * px, px, px)
  }
}

/** the Align mark's column, bottom (root, red) to top (crown, violet) */
export const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff'] as const
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']

/** the beats, in seconds from mount */
export const ALIGN_AT = { gather: 0.9, aligned: 2.0, burst: 2.1, settle: 2.6 }

const rng = (seed: number) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
const ease = (p: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3)

interface Props {
  /** centre of the column, in the canvas's own px */
  cx: number
  cy: number
  /** distance between the seven aligned stars */
  gap: number
  width?: number
  height?: number
  /** called once, when the seven line up and burst */
  onBurst?: () => void
  /** stars below this y dim after the burst, so text over them stays readable */
  quietBelow?: number
}

export default function PixelAlign({ cx, cy, gap, width = 390, height = 844, onBurst, quietBelow }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const burst = useRef(onBurst)
  burst.current = onBurst

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const dpr = Math.min(3, window.devicePixelRatio || 1)
    canvas.width = width * dpr; canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    ctx.imageSmoothingEnabled = false

    const r = rng(77)
    // the sky: stars that only twinkle
    const sky = Array.from({ length: 54 }, () => ({ x: r() * width, y: r() * height, size: 8 + r() * 16, kind: Math.floor(r() * 4), col: SPARK[Math.floor(r() * SPARK.length)], sp: 1.2 + r() * 2.4, ph: r() * 10 }))
    // the seven: each starts somewhere far off and comes home to its place in the column
    const seven = CHAKRAS.map((col, i) => {
      const a = r() * Math.PI * 2, d = 240 + r() * 220
      return { col, x0: cx + Math.cos(a) * d, y0: cy + Math.sin(a) * d * 1.3, x1: cx, y1: cy + (3 - i) * gap, wob: r() * 6 }
    })
    // the burst: two rings of sparkle
    const sparks = Array.from({ length: 34 }, (_, i) => {
      const ring = i < 20 ? 1 : 0.5
      return { a: (i / (i < 20 ? 20 : 14)) * Math.PI * 2 + r() * 0.5, d: (150 + r() * 190) * ring, size: (ring === 1 ? 26 : 18) * (0.7 + r() * 0.6), kind: Math.floor(r() * 4), col: SPARK[Math.floor(r() * SPARK.length)] }
    })

    const still = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now() - (still ? ALIGN_AT.settle * 1000 : 0)
    let raf = 0, fired = false
    const frame = (now: number) => {
      const t = (now - t0) / 1000
      ctx.clearRect(0, 0, width, height)

      // sky twinkles, brighter once the seven are home
      const lift = 0.55 + 0.45 * ease((t - ALIGN_AT.burst) / 0.6)
      for (const s of sky) {
        // stars under the words stay faint once the words are there
        const under = quietBelow != null && s.y > quietBelow ? 1 - 0.72 * ease((t - ALIGN_AT.burst) / 0.6) : 1
        ctx.globalAlpha = lift * under * (0.25 + 0.75 * Math.max(0, Math.sin(t * s.sp + s.ph)))
        drawPixelStar(ctx, s.x, s.y, s.size, s.kind, s.col)
      }

      // the seven: drift, then fly into line one after another
      seven.forEach((s, i) => {
        const p = ease((t - ALIGN_AT.gather - i * 0.07) / (ALIGN_AT.aligned - ALIGN_AT.gather - 0.42))
        const drift = (1 - p) * 10
        const x = s.x0 + (s.x1 - s.x0) * p + Math.sin(t * 1.3 + s.wob) * drift
        const y = s.y0 + (s.y1 - s.y0) * p + Math.cos(t * 1.1 + s.wob) * drift
        // a short trail while it flies
        if (p > 0.02 && p < 0.98) for (let k = 1; k <= 3; k++) {
          const q = Math.max(0, p - k * 0.06)
          ctx.globalAlpha = 0.28 / k
          drawPixelStar(ctx, s.x0 + (s.x1 - s.x0) * q, s.y0 + (s.y1 - s.y0) * q, 16, 2, s.col, s.col)
        }
        const home = t > ALIGN_AT.burst
        const pulse = home ? 1 + 0.12 * Math.sin((t - ALIGN_AT.burst) * 3 + i * 0.6) : 1
        ctx.globalAlpha = 0.5 + 0.5 * Math.min(1, t / 0.5)
        drawPixelStar(ctx, x, y, (home ? 26 : 22) * pulse, 0, s.col)
      })

      // the burst
      const tb = t - ALIGN_AT.burst
      if (tb >= 0 && !fired) { fired = true; burst.current?.() }
      if (tb >= 0 && tb < 1.1) {
        const p = ease(tb / 0.85)
        for (const s of sparks) {
          ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tb - 0.3) / 0.8)
          drawPixelStar(ctx, cx + Math.cos(s.a) * s.d * p, cy + Math.sin(s.a) * s.d * p, s.size * (1 - 0.35 * p), s.kind, s.col)
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [cx, cy, gap, width, height, quietBelow])

  return <canvas ref={ref} aria-hidden style={{ position: 'absolute', left: 0, top: 0, width, height, pointerEvents: 'none', imageRendering: 'pixelated' }} />
}
