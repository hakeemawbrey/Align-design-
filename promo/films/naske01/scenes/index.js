// naske01 · Ask the Stars, Volume 2, ep 1 · "How do I slow down when I really like someone?" (18 s, star_advice post)
// Story 0–15.6, then the short end card (2.4 s). The look lives in ../askkit.js (shared by every naske film).
//   0.00  frame 0: the DM question; ♈ Aries rockets across the snow on a sled, wide-eyed, speed lines and spray.
//   1.25  it yanks the brake: "SKRRT!", a snow spray, a skid to a stop.
//   2.5   ARIES: "liking someone fast isn't a problem."  chip ♈ CARDINAL FIRE · RULED BY MARS
//   ~5.6  "just let plans grow one date at a time."  (it nudges the sled forward one tiny scoot per beat)
//   ~8.8  "ask what pace feels good to them too."  a second sled glides in, slowly, with a pink star waving
//   box closes → "Fast heart. | *Slow* steps."  The two sleds drift together, side by side. Pisces (right) cries happily.
import { askFilm, drawBits, drawBurst, crier, lerp, prog, ease, clamp, pop01, INK, PINK } from '../askkit.js'

const SLED = [
  '.WWWWWWWWWWWWWWWWWWW.',
  'WLLLLLLLLLLLLLLLLLLLW',
  'WWWWWWWWWWWWWWWWWWWWW',
  '...D.............D...',
  '...D.............D...',
  'RRRRRRRRRRRRRRRRRRRRR.',
  '....................RR',
].map(r => r.padEnd(22, '.'))
const SLED_C = { W: '#b8743c', L: '#d9965a', D: '#5a3a26', R: '#e8414f' }

const BRAKE = 1.25, STOP = 1.85
function aX(t, T) {
  if (t < BRAKE) return lerp(170, 470, t / BRAKE)
  if (t < STOP) return lerp(470, 540, ease.outCubic(prog(t, BRAKE, STOP)))
  // one small scoot per beat while "one date at a time" types
  let x = 540
  for (let i = 0; i < 3; i++) x -= 18 * ease.inOutCubic(prog(t, T.l[1] + 0.3 + i * 0.5, T.l[1] + 0.55 + i * 0.5))
  return lerp(x, 380, ease.inOutCubic(prog(t, T.l[2] + 0.2, T.l[2] + 1.0)))
}
const fX = (t, T) => lerp(1300, 770, ease.outCubic(prog(t, T.l[2] + 0.2, T.l[2] + 2.2)))
const RUN_Y = 1182

const F = askFilm({
  id: 'naske01', sign: 'aries',
  question: 'How do I *slow down* when I really like someone?',
  lines: ["liking someone fast isn't a problem.", 'just let plans grow one date at a time.', 'ask what pace feels good to them too.'],
  chip: '♈ CARDINAL FIRE · RULED BY MARS',
  last: 'Fast heart. | *Slow* steps.', late: 2,
  pisces: { x: 965, y: 1150, size: 190 },
  state(t, T) {
    const dx = aX(t, T) - 540, dy = -30
    if (t < BRAKE) return { dx, dy, mood: 'wide', look: [1, 0], blink: false, squash: -0.06, bob: 0, hops: false }
    if (t < STOP) return { dx, dy, mood: 'squint', look: [1, 0], squash: 0.14 * Math.exp(-(t - BRAKE) * 4), bob: 0, hops: false }
    if (t < T.l[2] + 1.6) return { dx, dy, mood: t < T.l[1] ? 'happy' : 'neutral', look: t < T.l[1] ? undefined : [0, 0] }
    return { dx, dy, mood: 'heart', look: [1, 0] }
  },
  back(x, t, T, H) {
    // speed lines + the spray at the brake
    if (t < STOP) {
      x.save(); x.fillStyle = 'rgba(244,248,255,0.75)'
      const k = t < BRAKE ? 1 : 1 - prog(t, BRAKE, STOP)
      for (let i = 0; i < 6; i++) { const yy = 860 + i * 52, len = (90 + (i * 53) % 120) * k; x.fillRect(Math.round(H.x - 230 - len - (i % 3) * 30), yy, len, 6) }
      x.restore()
    }
    if (t > BRAKE - 0.05 && t < STOP + 0.6) {
      for (let i = 0; i < 16; i++) {
        const p = prog(t, BRAKE + i * 0.02, BRAKE + 0.7 + i * 0.02)
        if (p <= 0 || p >= 1) continue
        const a = -0.4 - (i % 5) * 0.28, r = 60 + p * (160 + (i * 37) % 90)
        x.fillStyle = `rgba(244,248,255,${0.9 * (1 - p)})`
        const s = 10 + (i % 3) * 6
        x.fillRect(Math.round(H.x + 200 + Math.cos(a) * r), Math.round(RUN_Y - 10 + Math.sin(a) * r + p * p * 120), s, s)
      }
    }
  },
  front(x, t, T, H) {
    drawBits(x, SLED, SLED_C, H.x - 10, RUN_Y, 18 * H.ok, { rot: t < BRAKE ? -0.03 : t < STOP ? 0.06 * Math.exp(-(t - BRAKE) * 5) : 0 })
    // the brake lever (yanked back at BRAKE)
    const lv = t < BRAKE ? 0 : 1
    x.save(); x.translate(H.x + 150, RUN_Y - 30); x.rotate(lerp(0.35, -0.6, lv * clamp((t - BRAKE) * 8)))
    x.fillStyle = INK; x.fillRect(-9, -112, 18, 116); x.fillStyle = '#c9c4d8'; x.fillRect(-5, -108, 10, 108); x.fillStyle = '#e8414f'; x.fillRect(-12, -128, 24, 24)
    x.restore()
    drawBurst(x, H.x + 290, 820, 120, t, BRAKE, { word: 'SKRRT!', size: 50, life: 0.9 })
    // the second sled: a pink star, gliding in slowly and waving
    const fx = fX(t, T)
    if (fx < 1250 && H.ok > 0.01) {
      const P = { x: fx, y: 1040, size: 230 }
      crier(x, t, P, { color: PINK, mood: t > T.l[2] + 2.0 ? 'heart' : 'happy', look: [-1, 0], seed: 7, glow: 0.8, pop: H.ok, hops: [T.l[2] + 2.3, T.h2Land + 0.2] })
      drawBits(x, SLED, SLED_C, fx, RUN_Y, 12 * H.ok, { flipX: true })
    }
  },
  cues: T => [
    ['whoosh', 0.0, 1.2, 0.05], ['tick', 0.5, 0.02], ['tick', 0.9, 0.02],
    ['whoosh', BRAKE, 0.5, 0.06], ['tick', BRAKE, 0.05], ['tick', BRAKE + 0.07, 0.045], ['tick', BRAKE + 0.14, 0.04], ['tick', BRAKE + 0.21, 0.035], ['pop', BRAKE + 0.02, 1567.98, 0.045, 0.3], ['glitter', BRAKE, BRAKE + 0.5],
    ['tick', T.l[1] + 0.3, 0.025], ['tick', T.l[1] + 0.8, 0.025], ['tick', T.l[1] + 1.3, 0.025],
    ['whoosh', T.l[2] + 0.2, 1.6, 0.025], ['pop', T.l[2] + 2.3, 1174.66, 0.03, 0.4],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
