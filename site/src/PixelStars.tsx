import { useEffect, useRef } from 'react'

/** the Align mark's chakra column, bottom → top: root red … crown violet */
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const SCATTER = ['#f2c75c', '#fff4cf', '#ffbdf6', '#c9b6f0', '#efe6d6']

/** one screen pixel of the effect, in CSS px: chunky like a 16-bit sprite */
const PX = 3
/** the effect runs at a game's frame rate, not the screen's */
const FPS = 12

/** sparkle sprites, smallest → biggest; W is the white core, X takes the star's colour */
const SPRITES = [
  ['.X.', 'XWX', '.X.'],
  ['..X..', '..X..', 'XXWXX', '..X..', '..X..'],
  ['...X...', '...X...', '..XWX..', 'XXWWWXX', '..XWX..', '...X...', '...X...'],
  ['....X....', '....X....', '....X....', '...XWX...', 'XXXWWWXXX', '...XWX...', '....X....', '....X....', '....X....'],
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

function rng(seed: number) {
  let s = seed
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
}

const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3)

/** seconds: stars appear, then pull into the column, hold, then burst */
const T_SCATTER = 0.45
const T_ALIGN = 0.95
const T_HOLD = 1.15
const T_END = 2.6

/**
 * Pixel stars that align: they twinkle in around the card, snap into a straight column in the
 * Align mark's seven colours, flash, and burst outward. Drawn on a coarse grid, stepped at 12fps.
 * Bump `fire` to play it; `w` × `h` is the box it centres on, in CSS px.
 */
export default function PixelStars({ fire, w, h }: { fire: number; w: number; h: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  // the canvas overhangs the card so the scatter and the burst have room
  const OW = Math.ceil((w * 1.9) / PX), OH = Math.ceil((h * 1.35) / PX)

  useEffect(() => {
    const cv = ref.current
    if (!fire || !cv) return
    const g = cv.getContext('2d')!
    const r = rng(17 + fire * 13)
    const cx = OW / 2, cy = OH / 2
    // the column runs down the middle of the card
    const gap = Math.round((h * 0.62) / PX / (CHAKRAS.length - 1))
    const slots = CHAKRAS.map((c, i) => ({ x: cx, y: cy + (3 - i) * gap, c }))
    // three stars head for each slot, from all around the card
    const stars = Array.from({ length: CHAKRAS.length * 3 }, (_, i) => {
      const a = r() * Math.PI * 2
      const d = 0.55 + r() * 0.45
      return {
        sx: cx + Math.cos(a) * (OW / 2 - 6) * d, sy: cy + Math.sin(a) * (OH / 2 - 6) * d,
        slot: slots[i % CHAKRAS.length], c: SCATTER[i % SCATTER.length], born: r() * 0.3, ph: Math.floor(r() * 4),
      }
    })
    // the burst: sparks thrown out from every star in the column
    const sparks = slots.flatMap((s) => Array.from({ length: 6 }, (_, k) => {
      const a = (k / 6) * Math.PI * 2 + r() * 0.5
      const v = 30 + r() * 46
      return { x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, c: r() < 0.35 ? '#fff4cf' : s.c }
    }))

    let raf = 0
    let last = -1
    const t0 = performance.now()
    const frame = (now: number) => {
      const t = (now - t0) / 1000
      const step = Math.floor(t * FPS)
      if (step !== last) {
        last = step
        const tq = step / FPS
        g.clearRect(0, 0, OW, OH)
        if (tq < T_HOLD) {
          for (const s of stars) {
            if (tq < s.born) continue
            const k = ease((tq - T_SCATTER) / (T_ALIGN - T_SCATTER))
            const x = s.sx + (s.slot.x - s.sx) * k
            const y = s.sy + (s.slot.y - s.sy) * k
            // twinkle by cycling sprite frames; settle to full size once in line
            const size = k >= 1 ? 2 : [0, 1, 2, 1][(step + s.ph) % 4]
            sprite(g, x, y, size, k > 0.6 ? s.slot.c : s.c)
          }
          // in line: the column flashes once
          if (tq >= T_ALIGN) for (const s of slots) sprite(g, s.x, s.y, (step % 2) ? 3 : 2, s.c)
        } else if (tq < T_END) {
          const bt = tq - T_HOLD
          const life = 1 - bt / (T_END - T_HOLD)
          for (const p of sparks) {
            // late sparks blink out, the way old sprites die
            if (life < 0.3 && step % 2) continue
            sprite(g, p.x + p.vx * bt, p.y + p.vy * bt + 18 * bt * bt, life > 0.6 ? 2 : life > 0.3 ? 1 : 0, p.c)
          }
          for (const s of slots) if (life > 0.75) sprite(g, s.x, s.y, 3, s.c)
        }
      }
      if (t < T_END + 0.1) raf = requestAnimationFrame(frame)
      else g.clearRect(0, 0, OW, OH)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); g.clearRect(0, 0, OW, OH) }
  }, [fire, OW, OH, h])

  return (
    <canvas ref={ref} width={OW} height={OH} aria-hidden
      style={{
        position: 'absolute', left: '50%', top: '50%', width: OW * PX, height: OH * PX, translate: '-50% -50%',
        imageRendering: 'pixelated', pointerEvents: 'none', zIndex: 4,
      }} />
  )
}
