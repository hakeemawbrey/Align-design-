// naske11 · Ask the Stars, Volume 2, ep 11 · "I'm bad at saying how I feel." (18 s, star_advice post)
// Story 0–15.6, then the short end card (2.4 s). The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♒ Aquarius tightening a bolt on a little robot that holds up a sign: "I LIKE YOU".
//   2.5   AQUARIUS: "you don't need perfect words."  chip ♒ FIXED AIR · SATURN (TRAD.) & URANUS (MODERN)
//   ~3.6  the robot fizzles: "bzzt", sparks, a puff of steam; the sign droops; the robot slumps. Aquarius shrugs.
//   ~5.3  "'i like spending time with you' works."
//   ~8.0  "say it once. it gets easier after."  Aquarius says it itself, in a small bubble: "i like you." A pink star
//         peeks in from the right, blushing.
//   box closes → "Plain words. | *Real* feelings."  Pisces (left) cries happily.
import { askFilm, crier, drawBits, drawBurst, drawSign, drawBubble, floatHeart, lerp, prog, ease, clamp, pop01, INK, PINK } from '../../naske01/askkit.js'

const BOT = [
  '....A.....',
  '....A.....',
  '..MMMMMM..',
  '..MEMMEM..',
  '..MMMMMM..',
  '..MMGGMM..',
  '...MMMM...',
  '.BBBBBBBB.',
  '.BBLBBLBB.',
  '.BBBBBBBB.',
  '.BBBBBBBB.',
  '..W....W..',
  '..W....W..',
  '.WW....WW.',
]
const BOT_C = on => ({ A: '#aab3c8', M: '#9fb4d8', E: on ? '#7cf5ff' : '#3a3f5a', G: '#5a6388', B: '#38c4ec', L: on ? '#ffd34d' : '#4a4f66', W: '#7a8398' })
const BX = 790, BY = 1080

const F = askFilm({
  id: 'naske11', sign: 'aquarius',
  question: "I'm bad at *saying* how I feel.",
  qSize: 94,
  lines: ["you don't need perfect words.", "'i like spending time with you' works.", 'say it once. it gets easier after.'],
  chip: '♒ FIXED AIR|SATURN (TRAD.) & URANUS (MODERN)',
  chipTop: 1262,
  last: 'Plain words. | *Real* feelings.', late: 2,
  hero: { x: 400, y: 1010, size: 340 },
  extraT: T => ({ fizz: T.l[0] + 1.1, say: T.l[2] + 0.4, peek: T.l[2] + 1.0 }),
  state(t, T) {
    if (t < T.fizz) return { mood: 'squint', look: [1, 0] }
    if (t < T.fizz + 0.4) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.fizz + 1.4) return { mood: 'eyeroll', squash: -0.08 * Math.sin(Math.PI * prog(t, T.fizz + 0.4, T.fizz + 1.4)) }
    if (t < T.say) return { mood: 'neutral', look: [0, 0] }
    return { mood: 'happy', blush: true }
  },
  front(x, t, T, H) {
    const ok = H.ok
    if (ok <= 0.01) return
    const dead = t > T.fizz
    const slump = ease.outBack(prog(t, T.fizz + 0.2, T.fizz + 0.8))
    const shake = t > T.fizz && t < T.fizz + 0.5 ? 6 * Math.sin(t * 80) : 0
    drawBits(x, BOT, BOT_C(!dead), BX + shake, BY + slump * 20, 17 * ok, { rot: 0.25 * slump })
    // the sign on a pole from its hands
    const sr = lerp(-0.04, 0.45, slump)
    x.save(); x.translate(BX + 70 + shake, BY - 10 + slump * 30); x.rotate(sr)
    x.fillStyle = INK; x.fillRect(-7, -190, 14, 190); x.fillStyle = '#c9c4d8'; x.fillRect(-3, -186, 6, 186)
    drawSign(x, 0, -250, 'I LIKE\nYOU', { w: 230, size: 48, color: '#38c4ec', scale: ok })
    x.restore()
    // the fizzle: sparks + a small steam puff
    drawBurst(x, BX + 60, BY - 220, 90, t, T.fizz, { word: 'bzzt', size: 44, color: '#7cf5ff', life: 0.9 })
    if (t > T.fizz && t < T.fizz + 1.6) {
      for (let i = 0; i < 6; i++) {
        const p = prog(t, T.fizz + i * 0.08, T.fizz + 1.0 + i * 0.08)
        if (p <= 0 || p >= 1) continue
        x.fillStyle = `rgba(214,222,240,${0.6 * (1 - p)})`; const s = 18 + p * 34
        x.fillRect(Math.round(BX - 10 + (i - 3) * 16 - s / 2), Math.round(BY - 140 - p * 160), s, s)
      }
    }
    // it says it itself
    const bk = pop01(t, T.say, 0.35, 2.4) * (1 - prog(t, T.close - 0.1, T.close + 0.15))
    if (bk > 0.01) drawBubble(x, H.x + 40, H.y - 290, 'i like you.', { tx: H.x + 30, ty: H.y - 180, size: 54, scale: bk })
    // the pink star peeks in from the right edge
    const pk = ease.outBack(prog(t, T.peek, T.peek + 0.6))
    if (pk > 0) crier(x, t, { x: lerp(1200, 980, pk), y: 700, size: 200 }, { color: PINK, mood: 'heart', look: [-1, 0], seed: 5, glow: 0.7, pop: ok, blush: true, hops: [T.peek + 0.7, T.h2Land] })
    floatHeart(x, t, T.peek + 0.6, 950, 580)
    floatHeart(x, t, T.h2Land, H.x + 80, H.y - 220)
  },
  cues: T => [
    ['tick', 0.2, 0.03], ['tick', 0.45, 0.03], ['tick', 0.7, 0.03], ['pop', 1.0, 1318.51, 0.02, 0.4], ['pop', 1.6, 1567.98, 0.02, 0.4],
    ['pop', T.fizz, 233.08, 0.05, 0.4], ['tick', T.fizz + 0.05, 0.04], ['tick', T.fizz + 0.12, 0.04], ['tick', T.fizz + 0.2, 0.035], ['whoosh', T.fizz + 0.2, 0.8, 0.025], ['boom', T.fizz + 0.8, 0.06],
    ['pluck', T.fizz + 0.6, 392, 0.03, 0.5, -0.2],
    ['pop', T.say, 1174.66, 0.035, -0.2], ['whoosh', T.peek, 0.4, 0.03], ['pop', T.peek + 0.6, 1318.51, 0.035, 0.4], ['glitter', T.peek + 0.6, T.peek + 1.0],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
