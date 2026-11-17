import { useEffect, useRef } from 'react'

/**
 * "The stars aligned", the same pixel moment as the beta website: sparkle
 * stars swirl in, the seven chakra stars drop into a column over the card,
 * a beam joins them, then dotted rings and pixel debris burst off it.
 * Drawn at 1/3 scale on a canvas and blown up with hard pixels.
 */

const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const SPARKS = ['#f2c75c', '#fff4cf', '#ffbdf6', '#c9b6f0', '#efe6d6']
/** one canvas pixel = 3 screen px */
const PX = 3
/** frames per second: the stepped, pixel-game feel */
const FPS = 15

/** pixel-star sprites, smallest to biggest ('W' is the white centre) */
const SPRITES = [
  ['X'],
  ['.X.', 'XWX', '.X.'],
  ['..X..', '..X..', 'XXWXX', '..X..', '..X..'],
  ['...X...', '...X...', '..XWX..', 'XXWWWXX', '..XWX..', '...X...', '...X...'],
  ['....X....', '....X....', '...XWX...', '..X.W.X..', 'XXWWWWWXX', '..X.W.X..', '...XWX...', '....X....', '....X....'],
].map((rows) => rows.map((r) => [...r]))

function star(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  const s = SPRITES[Math.max(0, Math.min(SPRITES.length - 1, size))]
  const o = (s.length - 1) / 2, cx = Math.round(x), cy = Math.round(y)
  for (let r = 0; r < s.length; r++) for (let c = 0; c < s[r].length; c++) {
    const ch = s[r][c]
    if (ch === '.') continue
    ctx.fillStyle = ch === 'W' ? '#ffffff' : color
    ctx.fillRect(cx + c - o, cy + r - o, 1, 1)
  }
}

/** a dotted pixel ring, a little squashed */
function ring(ctx: CanvasRenderingContext2D, x: number, y: number, rad: number, color: string) {
  const n = Math.max(12, Math.round(rad * 2.2))
  ctx.fillStyle = color
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    ctx.fillRect(Math.round(x + Math.cos(a) * rad), Math.round(y + Math.sin(a) * rad * 0.86), 1, 1)
  }
}

const rng = (seed: number) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
const clamp = (v: number) => Math.min(1, Math.max(0, v))
const easeIn = (v: number) => clamp(v) ** 2.4

/** the beats, in seconds from `fire` */
const RINGS_AT = 1.6
const FIRST_AT = 1.05
const STEP = 0.07
const BEAM_AT = 1.54
const END = 3.5

interface Props {
  /** bump to play it (0 = off) */
  fire: number
  /** start part way in, in seconds */
  from?: number
  /** the card it plays over, in screen px; the canvas centres on it */
  w: number
  h: number
}

export default function PixelStarsAligned({ fire, from = 0, w, h }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const cw = Math.ceil((w * 2) / PX), ch = Math.ceil((h * 1.45) / PX)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!fire || !canvas || !ctx) return
    const r = rng(17 + fire * 13)
    const cx = cw / 2, cy = ch / 2
    const gap = Math.round((h * 0.58) / PX / (CHAKRAS.length - 1))
    // the seven, root at the bottom, crown at the top
    const seven = CHAKRAS.map((c, i) => ({ x: cx, y: cy + (3 - i) * gap, c, at: FIRST_AT + i * STEP }))
    // sparkle that spirals in to each of the seven
    const swirl = Array.from({ length: CHAKRAS.length * 4 }, (_, i) => ({
      a: r() * Math.PI * 2, d: 0.6 + r() * 0.4, spin: (r() < 0.5 ? -1 : 1) * (1.6 + r() * 1.4),
      slot: seven[i % CHAKRAS.length], c: SPARKS[i % SPARKS.length], born: r() * 0.35, ph: Math.floor(r() * 4),
    }))
    // debris thrown off each star at the burst
    const debris = seven.flatMap((s) => Array.from({ length: 9 }, () => {
      const a = r() * Math.PI * 2, v = 40 + r() * 70
      return { x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 14, c: r() < 0.3 ? '#fff4cf' : s.c, life: 0.9 + r() * 0.9 }
    }))
    // twinkles that pop up around the card afterwards
    const twinkles = Array.from({ length: 14 }, () => ({
      x: cx + (r() - 0.5) * (w / PX) * 1.3, y: cy + (r() - 0.5) * (h / PX) * 1.05,
      c: SPARKS[Math.floor(r() * SPARKS.length)], ph: Math.floor(r() * 6), at: 0.25 + r() * 0.9,
    }))

    const still = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now() - (still ? RINGS_AT * 1000 : from * 1000)
    let raf = 0, last = -1
    const frame = (now: number) => {
      const real = (now - t0) / 1000
      const f = Math.floor(real * FPS)
      if (f !== last) {
        last = f
        const t = f / FPS
        ctx.clearRect(0, 0, cw, ch)
        if (t < RINGS_AT) {
          for (const s of swirl) {
            if (t < s.born || t >= s.slot.at) continue
            const p = easeIn((t - s.born) / (s.slot.at - s.born))
            const a = s.a + s.spin * p * Math.PI
            const rx = (cw / 2 - 6) * s.d * (1 - p), ry = (ch / 2 - 6) * s.d * (1 - p)
            star(ctx, s.slot.x + Math.cos(a) * rx, s.slot.y + Math.sin(a) * ry, p > 0.7 ? 2 : [1, 2, 3, 2][(f + s.ph) % 4], p > 0.55 ? s.slot.c : s.c)
          }
          for (const s of seven) {
            if (t < s.at) continue
            const since = t - s.at
            star(ctx, s.x, s.y, since < 0.07 ? 4 : 3, s.c)
            if (since < 0.2) {
              const k = 6 + Math.round(since * 60)
              ctx.fillStyle = s.c
              ctx.fillRect(s.x - k, s.y, 2, 1)
              ctx.fillRect(s.x + k - 1, s.y, 2, 1)
            }
          }
          if (t >= BEAM_AT) {
            const top = seven[6].y - gap * 0.9, bot = seven[0].y + gap * 0.9, even = f % 2 === 0
            ctx.fillStyle = even ? '#ffffff' : '#fff4cf'
            ctx.fillRect(Math.round(cx), Math.round(top), 1, Math.round(bot - top))
            ctx.fillStyle = even ? 'rgba(242,199,92,0.9)' : 'rgba(255,255,255,0.7)'
            ctx.fillRect(Math.round(cx) - 1, Math.round(top + gap * 0.4), 1, Math.round(bot - top - gap * 0.8))
            ctx.fillRect(Math.round(cx) + 1, Math.round(top + gap * 0.4), 1, Math.round(bot - top - gap * 0.8))
            for (const s of seven) star(ctx, s.x, s.y, 4, s.c)
          }
        } else if (t < END) {
          const tb = t - RINGS_AT
          if (tb < 0.6) {
            ring(ctx, cx, cy, 8 + tb * 230, tb < 0.3 ? '#fff4cf' : '#f2c75c')
            if (tb > 0.08) ring(ctx, cx, cy, 4 + (tb - 0.08) * 170, '#ffbdf6')
          }
          for (const d of debris) {
            const life = 1 - tb / d.life
            if (life <= 0 || (life < 0.25 && f % 2)) continue
            const x = d.x + d.vx * tb, y = d.y + d.vy * tb + 26 * tb * tb
            ctx.fillStyle = d.c
            for (let k = 1; k <= 3; k++) ctx.fillRect(Math.round(x - d.vx * 0.022 * k), Math.round(y - (d.vy + 52 * tb) * 0.022 * k), 1, 1)
            star(ctx, x, y, life > 0.7 ? 3 : life > 0.4 ? 2 : 1, d.c)
          }
          if (tb < 0.2) for (const s of seven) star(ctx, s.x, s.y, 4, s.c)
          for (const s of twinkles) {
            if (tb < s.at || (tb > 1.55 && f % 2)) continue
            star(ctx, s.x, s.y, [0, 1, 2, 3, 2, 1][(f + s.ph) % 6], s.c)
          }
        }
      }
      if (real < 3.6) raf = requestAnimationFrame(frame)
      else ctx.clearRect(0, 0, cw, ch)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ctx.clearRect(0, 0, cw, ch) }
  }, [fire, from, cw, ch, w, h])

  return (
    <canvas ref={ref} width={cw} height={ch} aria-hidden
      style={{ position: 'absolute', left: '50%', top: '50%', width: cw * PX, height: ch * PX, translate: '-50% -50%', imageRendering: 'pixelated', pointerEvents: 'none', zIndex: 6 }} />
  )
}
