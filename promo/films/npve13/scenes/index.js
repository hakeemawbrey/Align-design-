// npve13 · POV: You're Dating a ___ · ep 13 · "POV: you're dating an Aries. Snow day." (15 s vertical, pop · D)
// Story 0–12.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♈ ARIES in fresh snow, shoving a giant snowball across the frame, fast (snow spraying).
//   2.3–6.0   (1) a whole snowman in four seconds flat: ball, ball, head, twig arms, a timer stuck at 0:04.
//             ARIES: "DONE! new *record!*"  Sticker: "a snowman *speedrun*".
//   6.2       card cut.
//   6.3–9.8   (2, the turn) next to it, a little one: for you. It waits, patiently, while your hand adds the nose.
//             ARIES: "your turn. *I waited.*"  Sticker: "it *waited* for you".
//   10.0      Last line: "First to *build.* Built for two."  Pisces, by the lamp post, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, beanie, drawArm, speedLines, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, MONO, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const AR = signStar('aries'), AN = `${AR.glyph}︎ ARIES`
const T = { b1: 2.4, b2: 3.2, b3: 3.9, arms: 4.4, done: 4.7, cut: 6.2, small: [6.4, 7.0], nose: [8.0, 8.7], last: 10.0 }
const LINES = [
  { t: 4.75, speaker: AN, text: 'DONE! new *record!*', color: '#ff8a7a' },
  { t: 7.1, speaker: AN, text: 'your turn. *I waited.*', color: '#ff8a7a' },
]
const HOPS = [T.b1, T.b2, T.b3, T.done, T.done + 0.35, ...talkHops(LINES, AN), T.nose[1] + 0.1, T.last + 0.3, T.last + 0.8]

function ball(x, cx, cy, r, k = 1) {
  if (k <= 0.01) return
  r *= k
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 7, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f1ff'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c3e6'; x.beginPath(); x.arc(cx + r * 0.25, cy + r * 0.3, r * 0.7, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f1ff'; x.beginPath(); x.arc(cx - r * 0.1, cy - r * 0.1, r * 0.78, 0, Math.PI * 2); x.fill()
}
function face(x, cx, cy, s, nose = 1) {
  R(x, INK, cx - 26 * s, cy - 14 * s, 14 * s, 14 * s); R(x, INK, cx + 12 * s, cy - 14 * s, 14 * s, 14 * s)
  for (let i = 0; i < 5; i++) R(x, INK, cx - 28 * s + i * 13 * s, cy + 22 * s + Math.abs(i - 2) * -4 * s, 9 * s, 9 * s)
  if (nose > 0) { x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 4 * s, cy - 6 * s); x.lineTo(cx + 48 * s * nose, cy + 4 * s); x.lineTo(cx - 4 * s, cy + 14 * s); x.fill(); x.fillStyle = '#ff8a3a'; x.beginPath(); x.moveTo(cx, cy - 2 * s); x.lineTo(cx + 40 * s * nose, cy + 4 * s); x.lineTo(cx, cy + 10 * s); x.fill() }
}
function twig(x, cx, cy, d, s) { x.save(); x.strokeStyle = INK; x.lineWidth = 14 * s; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + d * 110 * s, cy - 60 * s); x.moveTo(cx + d * 70 * s, cy - 38 * s); x.lineTo(cx + d * 90 * s, cy - 80 * s); x.stroke(); x.strokeStyle = '#7a4a2f'; x.lineWidth = 7 * s; x.stroke(); x.restore() }

const EP = makePOV({
  id: 'npve13', duration: 15, set: 'street',
  caption: 'you’re dating an *Aries.* Snow day.',
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 4.6, close: 9.8 }],
  stickers: [
    { at: 2.5, out: [5.9, 6.1], text: 'a snowman *speedrun*', x: 540, y: 330, rot: -2.5, size: 46, kind: 'hot' },
    { at: 8.8, out: [9.6, 9.8], text: 'it *waited* for you', x: 540, y: 330, rot: 2, size: 46, kind: 'you' },
  ],
  last: { at: T.last, text: 'First to *build.* Built for two.', color: '#ff8a7a' },
  cuts: [T.cut],
  punch: [{ at: T.done, dur: 1.0, z: 0.08, x: 540, y: 1000 }, { at: T.nose[0], dur: 1.6, z: 0.16, x: 360, y: 1050 }],
  pitch: { [AN]: 784 },
  scene(x, t) {
    pisces(x, t, { x: 110, y: 1090, s: 120, tears: t > T.last ? 3 : t > T.nose[1] ? 2 : 1, mood: t > T.nose[1] ? 'happy' : 'sparkle', look: [1, 0], pop: pop01(t, -1) })
    // hook: the giant snowball rolling, Aries pushing
    if (t < T.b1) {
      const bx = lerp(520, 300, t / T.b1)
      ball(x, bx, 1110, 150 + 20 * t)
      for (let i = 0; i < 6; i++) { const ph = (t * 3 + i / 6) % 1; R(x, '#f4f1ff', bx + 150 + ph * 120, 1230 - ph * 140 + i * 6, 16, 16) }
      drawStarChar(x, bx + 280, 1080, 300, t, { color: AR.color, glyph: AR.glyph, mood: 'squint', look: [-1, 0], hops: [0.1, 0.4, 0.7, 1.0, 1.3, 1.6, 1.9], seed: 2, glow: 1.1, squash: 0.06 })
      beanie(x, t, { x: bx + 280, y: 1080, s: 300, hops: [0.1, 0.4, 0.7, 1.0, 1.3, 1.6, 1.9], seed: 2 }, '#ff6a4f')
      speedLines(x, t, bx + 280, 1080, 1, 0.9)
      return
    }
    // the big snowman (built in a blur)
    const SX = 700
    ball(x, SX, 1130, 170, ease.outBack(prog(t, T.b1, T.b1 + 0.3)))
    ball(x, SX, 900, 120, ease.outBack(prog(t, T.b2, T.b2 + 0.3)))
    ball(x, SX, 720, 86, ease.outBack(prog(t, T.b3, T.b3 + 0.3)))
    if (t > T.arms) { twig(x, SX - 110, 900, -1, 1); twig(x, SX + 110, 900, 1, 1); face(x, SX, 712, 1.3) }
    // the small one, for you
    const sk = ease.outBack(prog(t, ...T.small))
    if (t > T.small[0]) { ball(x, 330, 1180, 110, sk); ball(x, 330, 1040, 76, sk); if (sk > 0.9) face(x, 330, 1034, 0.9, ease.outBack(prog(t, ...T.nose))) }
    // Aries
    let px = lerp(480, 520, prog(t, T.b1, T.done)), mood = 'squint', look = [0, 0]
    if (t < T.done) px = 380 + 260 * Math.abs(Math.sin(t * 9))
    if (t > T.done) { mood = 'sparkle'; px = 480 }
    if (t > T.cut) { mood = 'happy'; px = 520; look = [-1, 0.4] }
    if (t > T.nose[1]) { mood = 'sparkle'; look = [0, 0] }
    if (t > T.last) mood = 'heart'
    const o = { x: px, y: 1060, s: 300, hops: HOPS, seed: 2 }
    if (t > T.cut || t > T.done) { drawStarChar(x, o.x, o.y, o.s, t, { color: AR.color, glyph: AR.glyph, mood, look, hops: HOPS, seed: 2, glow: 1.1 }); beanie(x, t, o, '#ff6a4f') }
    else { speedLines(x, t, px, 1060, Math.sin(t * 9) > 0 ? -1 : 1, 1, 'rgba(255,138,122,0.8)'); drawStarChar(x, o.x, o.y, o.s, t, { color: AR.color, glyph: AR.glyph, mood, look, hops: HOPS, seed: 2, glow: 1.1, alpha: 0.85 }) }
    if (t > T.done && t < T.cut) { x.save(); x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('0:04', 700, 560); x.restore(); sparkles(x, t, 700, 800, T.done, 12, 260, 1, [GOLD, BONE, HOT]) }
    if (t > T.nose[1]) sparkles(x, t, 330, 1040, T.nose[1], 10, 140, 1, [GOLD, BONE, '#ff8a3a'])
    if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 520 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
  },
  front(x, t) {
    const r = ease.outCubic(prog(t, T.nose[0] - 0.5, T.nose[0])) * outK(t, [T.nose[1] + 0.2, T.nose[1] + 0.7])
    if (r > 0) drawArm(x, -150, lerp(-100, 330, r), lerp(1500, 1110, r), { r: 46, by: 1500 })
  },
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(0.1 + i * 0.3), 0.025]),
    ['pop', r3(T.b1 + 0.1), 659.25, 0.045, -0.2], ['pop', r3(T.b2 + 0.1), 880, 0.045, 0], ['pop', r3(T.b3 + 0.1), 1174.66, 0.045, 0.2], ['tick', r3(T.arms), 0.05],
    ['bell', r3(T.done), 1479.98, 0.03, 1, 0], ['glitter', r3(T.done), r3(T.done + 0.5)],
    ['pop', r3(T.small[0] + 0.1), 783.99, 0.035, -0.3], ['pop', r3(T.small[0] + 0.35), 987.77, 0.035, -0.3],
    ['whoosh', r3(T.nose[0] - 0.5), 0.4, 0.025], ['pluck', r3(T.nose[1]), 1174.66, 0.04, 0.5, 0], ['pluck', r3(T.nose[1] + 0.12), 1479.98, 0.035, 0.5, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
