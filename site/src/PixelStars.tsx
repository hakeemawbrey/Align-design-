import { useEffect, useRef } from 'react'

/** the Align mark's chakra column, bottom → top: root red … crown violet */
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const SCATTER = ['#f2c75c', '#fff4cf', '#ffbdf6', '#c9b6f0', '#efe6d6']

/** one pixel of the effect, in CSS px: chunky like a 16-bit sprite */
const PX = 3
/** the effect runs at a game's frame rate, not the screen's */
const FPS = 15

/** sparkle sprites, smallest → biggest; W is the white core, X takes the star's colour */
const SPRITES = [
  ['X'],
  ['.X.', 'XWX', '.X.'],
  ['..X..', '..X..', 'XXWXX', '..X..', '..X..'],
  ['...X...', '...X...', '..XWX..', 'XXWWWXX', '..XWX..', '...X...', '...X...'],
  ['....X....', '....X....', '...XWX...', '..X.W.X..', 'XXWWWWWXX', '..X.W.X..', '...XWX...', '....X....', '....X....'],
].map((rows) => rows.map((r) => [...r]))

function sprite(g: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  const s = SPRITES[Math.max(0, Math.min(SPRITES.length - 1, size))]
  const h = (s.length - 1) / 2
  const X = Math.round(x), Y = Math.round(y)
  for (let r = 0; r < s.length; r++) for (let c = 0; c < s[r].length; c++) {
    const k = s[r][c]
    if (k === '.') continue
    g.fillStyle = k === 'W' ? '#ffffff' : color
    g.fillRect(X + c - h, Y + r - h, 1, 1)
  }
}

/** a ring of single pixels, the shockwave */
function ring(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string) {
  const n = Math.max(12, Math.round(r * 2.2))
  g.fillStyle = color
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    g.fillRect(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.86), 1, 1)
  }
}

function rng(seed: number) {
  let s = seed
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
}

const clamp = (t: number) => Math.min(1, Math.max(0, t))
const easeIn = (t: number) => clamp(t) ** 2.4

/**
 * The beats, in seconds from the start. The burst lands at BURST, which the hero lines up
 * with the moment her card turns over.
 */
export const BURST = 1.6
const T_GATHER = 1.05 // stars spiral in from all round the card
const T_LOCK = 0.07 // then lock into the column one by one, bottom to top
const T_BEAM = T_GATHER + T_LOCK * 7 // the column is whole: a beam runs up it
const T_END = BURST + 1.9

/**
 * Pixel stars that align: they spiral in around the card, lock into a straight column in the
 * Align mark's seven colours, a beam runs up it, then it bursts: a pixel shockwave, sparks with
 * trails, and a few stars left twinkling. Drawn on a coarse grid, stepped at 15fps.
 * Bump `fire` to play it; `from` starts it partway (seconds); `w` × `h` is the box it centres on.
 */
export default function PixelStars({ fire, from = 0, w, h }: { fire: number; from?: number; w: number; h: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  // the canvas overhangs the card so the gather and the burst have room
  const OW = Math.ceil((w * 2) / PX), OH = Math.ceil((h * 1.45) / PX)

  useEffect(() => {
    const cv = ref.current
    if (!fire || !cv) return
    const g = cv.getContext('2d')!
    const r = rng(17 + fire * 13)
    const cx = OW / 2, cy = OH / 2
    // the column runs down the middle of the card
    const gap = Math.round((h * 0.58) / PX / (CHAKRAS.length - 1))
    const slots = CHAKRAS.map((c, i) => ({ x: cx, y: cy + (3 - i) * gap, c, at: T_GATHER + i * T_LOCK }))
    // four stars spiral into each slot from all round the card
    const stars = Array.from({ length: CHAKRAS.length * 4 }, (_, i) => {
      const slot = slots[i % CHAKRAS.length]
      return {
        a: r() * Math.PI * 2, d: 0.6 + r() * 0.4, spin: (r() < 0.5 ? -1 : 1) * (1.6 + r() * 1.4),
        slot, c: SCATTER[i % SCATTER.length], born: r() * 0.35, ph: Math.floor(r() * 4),
      }
    })
    // the burst: sparks out of every star in the column, and a few that hang about after
    const sparks = slots.flatMap((s) => Array.from({ length: 9 }, () => {
      const a = r() * Math.PI * 2
      const v = 40 + r() * 70
      return { x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 14, c: r() < 0.3 ? '#fff4cf' : s.c, life: 0.9 + r() * 0.9 }
    }))
    const lingers = Array.from({ length: 14 }, () => ({
      x: cx + (r() - 0.5) * (w / PX) * 1.3, y: cy + (r() - 0.5) * (h / PX) * 1.05,
      c: SCATTER[Math.floor(r() * SCATTER.length)], ph: Math.floor(r() * 6), at: 0.25 + r() * 0.9,
    }))

    let raf = 0
    let last = -1
    const t0 = performance.now() - from * 1000
    const frame = (now: number) => {
      const t = (now - t0) / 1000
      const step = Math.floor(t * FPS)
      if (step !== last) {
        last = step
        const tq = step / FPS
        g.clearRect(0, 0, OW, OH)

        if (tq < BURST) {
          // gather: each star spirals toward its slot, faster as it closes in
          for (const s of stars) {
            if (tq < s.born || tq >= s.slot.at) continue
            const k = easeIn((tq - s.born) / (s.slot.at - s.born))
            const a = s.a + s.spin * k * Math.PI
            const rx = (OW / 2 - 6) * s.d * (1 - k), ry = (OH / 2 - 6) * s.d * (1 - k)
            sprite(g, s.slot.x + Math.cos(a) * rx, s.slot.y + Math.sin(a) * ry, k > 0.7 ? 2 : [1, 2, 3, 2][(step + s.ph) % 4], k > 0.55 ? s.slot.c : s.c)
          }
          // lock in: each slot pops big the frame it fills, then holds
          for (const s of slots) {
            if (tq < s.at) continue
            const age = tq - s.at
            sprite(g, s.x, s.y, age < 0.07 ? 4 : 3, s.c)
            // a ping: two pixel ticks either side, flying out
            if (age < 0.2) {
              const o = 6 + Math.round(age * 60)
              g.fillStyle = s.c
              g.fillRect(s.x - o, s.y, 2, 1); g.fillRect(s.x + o - 1, s.y, 2, 1)
            }
          }
          // the beam: the whole column lights up and past both ends
          if (tq >= T_BEAM) {
            const top = slots[6].y - gap * 0.9, bot = slots[0].y + gap * 0.9
            const flick = step % 2 === 0
            g.fillStyle = flick ? '#ffffff' : '#fff4cf'
            g.fillRect(Math.round(cx), Math.round(top), 1, Math.round(bot - top))
            g.fillStyle = flick ? 'rgba(242,199,92,0.9)' : 'rgba(255,255,255,0.7)'
            g.fillRect(Math.round(cx) - 1, Math.round(top + gap * 0.4), 1, Math.round(bot - top - gap * 0.8))
            g.fillRect(Math.round(cx) + 1, Math.round(top + gap * 0.4), 1, Math.round(bot - top - gap * 0.8))
            for (const s of slots) sprite(g, s.x, s.y, 4, s.c)
          }
        } else if (tq < T_END) {
          const bt = tq - BURST
          // the shockwave rings out
          if (bt < 0.6) {
            ring(g, cx, cy, 8 + bt * 230, bt < 0.3 ? '#fff4cf' : '#f2c75c')
            if (bt > 0.08) ring(g, cx, cy, 4 + (bt - 0.08) * 170, '#ffbdf6')
          }
          // sparks: fly out, fall a little, shrink, and blink off at the end of their life
          for (const p of sparks) {
            const left = 1 - bt / p.life
            if (left <= 0 || (left < 0.25 && step % 2)) continue
            const x = p.x + p.vx * bt, y = p.y + p.vy * bt + 26 * bt * bt
            // a short trail of single pixels behind each spark
            g.fillStyle = p.c
            for (let k = 1; k <= 3; k++) g.fillRect(Math.round(x - p.vx * 0.022 * k), Math.round(y - (p.vy + 52 * bt) * 0.022 * k), 1, 1)
            sprite(g, x, y, left > 0.7 ? 3 : left > 0.4 ? 2 : 1, p.c)
          }
          // the column hangs on for a beat as the card turns
          if (bt < 0.2) for (const s of slots) sprite(g, s.x, s.y, 4, s.c)
          // and a few stars stay twinkling round her
          for (const l of lingers) {
            if (bt < l.at || (bt > T_END - BURST - 0.35 && step % 2)) continue
            sprite(g, l.x, l.y, [0, 1, 2, 3, 2, 1][(step + l.ph) % 6], l.c)
          }
        }
      }
      if (t < T_END + 0.1) raf = requestAnimationFrame(frame)
      else g.clearRect(0, 0, OW, OH)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); g.clearRect(0, 0, OW, OH) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fire])

  return (
    <canvas ref={ref} width={OW} height={OH} aria-hidden
      style={{
        position: 'absolute', left: '50%', top: '50%', width: OW * PX, height: OH * PX, translate: '-50% -50%',
        imageRendering: 'pixelated', pointerEvents: 'none', zIndex: 4,
      }} />
  )
}
