// npve12 · POV: You're Dating a ___ · ep 12 · "POV: you're dating a Pisces." (20 s vertical, dreamy · Ab)
// Story 0–15.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♓ PISCES on the sofa, already crying happy tears. Sticker: "you said *hi.*"
//   2.3–5.6   (1) movie night: the TV glow flickers on its face; it sobs. PISCES: "it's just the *trailer.*"
//             Sticker: "it's the *trailer*".
//   5.6–9.0   (2) your hand passes it the fries. It fountains. PISCES: "you *shared?* with ME?"
//             Sticker: "a *fry.* one fry.".
//   9.15      card cut.
//   9.3–12.7  (3, the twist) now YOU tear up (drops roll down the lens). It hands you the tissue box; its tears
//             turn into little hearts. PISCES: "here. we cry *together.*"  Sticker: "wait, now *you're* crying".
//   12.95     Last line: "Cries a lot. Loves *more*."
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, drawArm, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, INTER, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const PI = signStar('pisces'), PN = `${PI.glyph}︎ PISCES`
const T = { tv: 2.3, fry: [5.7, 6.3], cut: 9.15, tears: 9.3, box: [10.2, 10.8], last: 12.95 }
const LINES = [
  { t: 2.6, speaker: PN, text: 'it’s just the *trailer.*', color: '#b9a4ff' },
  { t: 6.4, speaker: PN, text: 'you *shared?* with ME?', color: '#b9a4ff' },
  { t: 10.9, speaker: PN, text: 'here. we cry *together.*', color: '#b9a4ff' },
]
const HOPS = [0.4, ...talkHops(LINES, PN), T.fry[1], T.box[1], T.last + 0.3, T.last + 0.8]

function fries(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  for (let i = 0; i < 7; i++) { R(x, INK, -60 + i * 18, -110 - (i % 3) * 18, 18, 90); R(x, '#ffd36a', -57 + i * 18, -107 - (i % 3) * 18, 12, 84) }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-74, -50); x.lineTo(74, -50); x.lineTo(56, 70); x.lineTo(-56, 70); x.fill()
  x.fillStyle = '#e8283c'; x.beginPath(); x.moveTo(-66, -44); x.lineTo(66, -44); x.lineTo(50, 64); x.lineTo(-50, 64); x.fill()
  drawBits(x, HEART, { H: '#fff8ef' }, 0, 8, 6)
  x.restore()
}
function tissues(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.06)
  R(x, INK, -110, -60, 220, 120); R(x, '#9fd8ff', -104, -54, 208, 108); for (let i = 0; i < 4; i++) R(x, '#fff8ef', -90 + i * 52, -20, 20, 60)
  R(x, INK, -40, -66, 80, 16)
  x.fillStyle = '#fff8ef'; x.beginPath(); x.moveTo(-30, -60); x.quadraticCurveTo(-10, -130 + 6 * Math.sin(t * 4), 20, -120); x.quadraticCurveTo(30, -90, 30, -60); x.fill()
  x.restore()
}

const EP = makePOV({
  id: 'npve12', duration: 20, set: 'sofa',
  caption: 'you’re dating a *Pisces.*',
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 2.4, close: 12.75 }],
  stickers: [
    { at: -1, out: [2.1, 2.3], text: 'you said *hi.*', x: 540, y: 330, rot: -3, size: 50, kind: 'you' },
    { at: 3.5, out: [5.4, 5.6], text: 'it’s the *trailer*', x: 540, y: 330, rot: 2.5, size: 46, kind: 'dark' },
    { at: 7.4, out: [8.9, 9.05], text: 'a *fry.* one fry.', x: 540, y: 330, rot: -2.5, size: 48, kind: 'light' },
    { at: 9.6, out: [12.6, 12.8], text: 'wait, now *you’re* crying', x: 540, y: 330, rot: 2, size: 44, kind: 'hot' },
  ],
  last: { at: T.last, text: 'Cries a lot. Loves *more.*', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.fry[1], dur: 1.2, z: 0.12, x: 540, y: 1000 }, { at: T.box[0], dur: 2.0, z: 0.1, x: 540, y: 1100 }],
  pitch: { [PN]: 830.61 },
  scene(x, t) {
    let tears = 2, mood = 'happy', look = [0, 0]
    if (t > T.tv) { tears = 2; mood = 'wide'; look = [0, -0.2] }
    if (t > T.fry[1]) { tears = 3; mood = 'sparkle' }
    if (t > T.cut) { tears = 1; mood = 'wide' }
    if (t > T.box[0]) { tears = 0; mood = 'happy' }
    if (t > T.last) { tears = 1; mood = 'heart' }
    pisces(x, t, { x: 540, y: 1000, s: 360, tears, mood, look, hops: HOPS, seed: 6, pop: pop01(t, -1) })
    // its tears turn into hearts
    if (t > T.box[0]) for (let i = 0; i < 6; i++) { const ph = (t - T.box[0] - i * 0.3) % 1.8; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? '#8fe3ff' : HOT }, 540 + (i % 2 ? 1 : -1) * (120 + ph * 60), 1000 - ph * 120, 7, { alpha: clamp(1 - ph / 1.8) }) }
    // the TV glow (the TV is behind you)
    if (t > T.tv && t < T.fry[0]) { const f = 0.15 + 0.1 * Math.abs(Math.sin(t * 7)) + 0.06 * Math.sin(t * 23); x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(110,170,255,${f})`; x.fillRect(-100, -100, 1300, 2200); x.restore() }
    if (t > T.fry[0] && t < T.cut) { const k = ease.outCubic(prog(t, ...T.fry)); fries(x, lerp(1000, 760, k), lerp(1400, 1150, k), 1.1) }
    tissues(x, t, 330, 1170, pop01(t, T.box[0], 0.35, 2.2) * outK(t, [15.0, 15.4]))
    if (t > T.box[1]) sparkles(x, t, 330, 1120, T.box[1], 10, 150, 1, [GOLD, BONE, HOT])
    if (t > T.last) { sparkles(x, t, 540, 980, T.last + 0.35, 12, 240, 1, ['#b9a4ff', GOLD, BONE]) }
  },
  front(x, t) {
    if (t > T.fry[0] - 0.2 && t < T.cut) { const k = ease.outCubic(prog(t, T.fry[0] - 0.2, T.fry[0] + 0.4)) * outK(t, [8.6, 9.0]); if (k > 0) drawArm(x, 1250, lerp(1250, 900, k), lerp(1500, 1240, k), { r: 48, by: 1600 }) }
    // your tears, rolling down the lens
    if (t > T.tears && t < T.box[1] + 0.8) for (let i = 0; i < 5; i++) { const ph = clamp((t - T.tears - i * 0.25) / 1.6); if (ph <= 0) continue; const px = [120, 260, 860, 960, 200][i], py = 300 + ph * 1100; x.save(); x.globalAlpha = 0.75 * (1 - prog(t, T.box[1], T.box[1] + 0.8)); x.fillStyle = 'rgba(160,220,255,0.85)'; x.beginPath(); x.ellipse(px, py, 30, 44, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(px - 8, py - 18, 8, 10); x.fillStyle = 'rgba(160,220,255,0.4)'; x.fillRect(px - 10, py - 400 * ph, 20, 400 * ph); x.restore() }
  },
  cues: [
    ['pluck', 0.3, 830.61, 0.03, 0.6, 0], ['pluck', 0.6, 1046.5, 0.03, 0.6, 0],
    ['whoosh', r3(T.tv), 0.3, 0.025], ['tick', r3(T.tv + 0.05), 0.04],
    ['whoosh', r3(T.fry[0]), 0.4, 0.03], ['pop', r3(T.fry[1]), 1244.51, 0.045, 0.3], ['glitter', r3(T.fry[1]), r3(T.fry[1] + 0.5)],
    ['pluck', r3(T.tears), 622.25, 0.03, 0.8, 0], ['pop', r3(T.box[0] + 0.1), 1046.5, 0.04, -0.3], ['bell', r3(T.box[1]), 1661.22, 0.028, 1.2, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
