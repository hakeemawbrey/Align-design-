// npve01 · POV: You're Dating a ___ · ep 1 · "POV: you're dating an Aries." (18 s vertical, pop · E)
// Story 0–15.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ./datekit.js (shared by npve01–24).
//   0.0–2.3   hook: ♈ ARIES on the snowy street, beanie on, jogging on the spot, staring into the lens. Caption on at frame 0.
//   2.3–5.6   (1) YOU: "maybe a walk later?"  Aries is GONE (speed lines), then back: "WALKING! let's go!"
//             Sticker: "you said *maybe*".
//   5.6–9.0   (2) it races you to the corner: a finish ribbon snaps, arms up: "I WIN!"  Sticker: "it was not a *race*".
//   9.15      card cut.
//   9.2–12.7  (3, the twist) the crossing: the signal says WAIT. Aries stops, turns back, holds out a hand for yours.
//             ARIES: "wait for you? *always.*"  Sticker: "but at every crossing…"
//   12.95     Last line: "*Fast* feet. Patient heart."  Pisces, under the lamp post, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, drawArm, beanie, speedLines, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, MINT, INTER, r3 } from './datekit.js'
import { talkHops } from '../../startalk.js'

const AR = signStar('aries'), AN = `${AR.glyph}︎ ARIES`, YN = 'YOU'
const T = { gone: 2.85, back: 3.75, race: 5.7, ribbon: 7.05, win: 7.2, cut: 9.15, cross: 9.3, turn: 10.25, hand: [10.6, 11.2], green: 12.2, last: 12.95 }
const LINES = [
  { t: 2.35, speaker: YN, text: 'maybe a walk later?', color: '#c9a6ff' },
  { t: 4.0, speaker: AN, text: 'WALKING! let’s go!', color: '#ff8a7a' },
  { t: 7.4, speaker: AN, text: 'I WIN!', color: '#ff8a7a' },
  { t: 10.7, speaker: AN, text: 'wait for you? *always.*', color: '#ff8a7a' },
]
const HOPS = [...talkHops(LINES, AN), T.back, T.win, T.win + 0.35, T.turn, T.last + 0.3, T.last + 0.8]

function aries(x, t) {
  let px = 540, py = 1010, s = 360, mood = 'sparkle', look = [0, 0], alpha = 1, hops = HOPS
  // hook: jogging on the spot (quick little hops)
  if (t < T.gone) hops = [...HOPS, ...Array.from({ length: 12 }, (_, i) => i * 0.24)]
  if (t >= T.gone && t < T.back) alpha = 0                                   // gone
  if (t >= T.back && t < T.race) { px = lerp(1300, 540, ease.outBack(prog(t, T.back, T.back + 0.35))); mood = 'happy' }
  if (t >= T.race && t < T.cut) {                                          // the race to the corner (down the street)
    const k = ease.inOutCubic(prog(t, T.race, T.ribbon))
    px = lerp(540, 760, k); py = lerp(1010, 900, k); s = lerp(360, 230, k); mood = t > T.win ? 'happy' : 'wide'
    if (t > T.win) { mood = 'sparkle'; hops = [...HOPS, T.win + 0.7, T.win + 1.1] }
  }
  if (t >= T.cut && t < T.last) { mood = t > T.turn ? 'happy' : 'neutral'; look = t > T.turn ? [0, 0] : [1, -0.4]; px = 560; py = 1010; s = 340 }
  if (t >= T.last) { mood = 'heart'; px = 560; py = 1010; s = 340 }
  if (alpha <= 0) return
  const o = { x: px, y: py, s, hops, seed: 2, pop: pop01(t, -1) }
  drawStarChar(x, px, py, s, t, { color: AR.color, glyph: AR.glyph, mood, look, hops, seed: 2, glow: 1.1, blush: t > T.turn ? 1 : 0 })
  beanie(x, t, o, '#ff6a4f')
  if (t >= T.back && t < T.back + 0.4) speedLines(x, t, px, py, 1, 1 - prog(t, T.back + 0.1, T.back + 0.4))
  if (t >= T.race && t < T.ribbon) speedLines(x, t, px, py, -1, 0.8)
}
function goneDust(x, t) {
  if (t < T.gone || t > T.back) return
  const k = 1 - prog(t, T.gone, T.gone + 0.6)
  if (k > 0) { x.save(); x.globalAlpha = k; for (let i = 0; i < 8; i++) { const a = i * 0.8, r = 40 + 160 * prog(t, T.gone, T.gone + 0.6); R(x, '#f4f1ff', 540 + Math.cos(a) * r, 1150 + Math.sin(a) * r * 0.4, 22, 22) } x.restore() }
  // a little cartoon outline where it stood
  if (t > T.gone + 0.15) { x.save(); x.globalAlpha = 0.55 * (1 - prog(t, T.back - 0.3, T.back)); x.setLineDash([16, 14]); x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.ellipse(540, 1020, 150, 170, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
}
function ribbon(x, t) {
  if (t < T.race - 0.2 || t > T.cut) return
  const k = pop01(t, T.race - 0.2, 0.3)
  // two little posts at the corner, a ribbon that snaps
  for (const px of [640, 900]) { R(x, INK, px - 8, 1000 - 400 * k, 16, 400 * k); R(x, BONE, px - 4, 1004 - 400 * k, 8, 392 * k) }
  if (t < T.ribbon) { R(x, INK, 640, 600, 260, 14); R(x, HOT, 640, 603, 260, 8) }
  else { const f = prog(t, T.ribbon, T.ribbon + 0.4); x.save(); x.fillStyle = HOT; x.translate(640, 606); x.rotate(0.9 * f); x.fillRect(0, -4, 120, 8); x.restore(); x.save(); x.fillStyle = HOT; x.translate(900, 606); x.rotate(-0.9 * f); x.fillRect(-120, -4, 120, 8); x.restore() }
}
function crossing(x, t) {
  if (t < T.cut) return
  // zebra stripes on the snowy road + a signal post
  for (let i = 0; i < 6; i++) { const y = 1200 + i * 46; R(x, 'rgba(255,255,255,0.8)', 80 - i * 20, y, 920 + i * 40, 22) }
  R(x, INK, 868, 560, 24, 620); R(x, '#4a4466', 872, 560, 16, 620)
  R(x, INK, 820, 470, 120, 150); R(x, '#241c3a', 828, 478, 104, 134)
  const go = t > T.green
  if (!go) drawBits(x, ['.HHH.', 'HHHHH', 'HHHHH', 'HHHH.', '.HHH.'], { H: '#ff5a4a' }, 880, 545, 12)
  else drawBits(x, ['..W..', '.WWW.', 'W.W.W', '.W.W.', 'W...W'], { W: MINT }, 880, 545, 12)
  x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillStyle = go ? MINT : '#ff5a4a'; x.fillText(go ? 'WALK' : 'WAIT', 880, 664)
}

const EP = makePOV({
  id: 'npve01', duration: 18, set: 'street',
  caption: 'you’re dating an *Aries.*',
  lines: LINES,
  boxes: [{ from: 0, to: 4, open: 2.15, close: 12.75 }],
  stickers: [
    { at: 3.0, out: [5.3, 5.5], text: 'you said *maybe*', x: 540, y: 330, rot: -3, size: 46, kind: 'you' },
    { at: 6.0, out: [8.8, 9.0], text: 'it was not a *race*', x: 540, y: 330, rot: 2.5, size: 46, kind: 'dark' },
    { at: 9.4, out: [10.9, 11.1], text: 'but at every *crossing*…', x: 540, y: 330, rot: -2, size: 44, kind: 'light' },
  ],
  last: { at: T.last, text: '*Fast* feet. Patient heart.', color: '#ff8a7a' },
  cuts: [T.cut],
  punch: [{ at: T.back, dur: 0.9, z: 0.1, x: 540, y: 1000 }, { at: T.turn, dur: 1.3, z: 0.12, x: 640, y: 1040 }],
  pitch: { [AN]: 784, [YN]: 587.33 },
  scene(x, t) {
    pisces(x, t, { x: 150, y: 1090, s: 140, tears: t > T.last ? 3 : t > T.turn ? 2 : 1, mood: t > T.turn ? 'happy' : 'sparkle', look: [1, 0], pop: pop01(t, -1) })
    crossing(x, t)
    ribbon(x, t)
    goneDust(x, t)
    aries(x, t)
    if (t > T.win && t < T.cut) sparkles(x, t, 760, 840, T.win, 10, 160, 1, [GOLD, BONE, HOT])
    if (t > T.last) { sparkles(x, t, 560, 980, T.last + 0.35, 12, 240, 1, ['#ff8a7a', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 560 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 960 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  front(x, t) {
    // your hand reaches out to take Aries'
    const r = ease.outCubic(prog(t, ...T.hand)) * outK(t, [15.0, 15.4])
    if (r > 0) drawArm(x, 1250, lerp(1250, 800, r), lerp(1300, 1130, r), { r: 50, rot: 0.3, by: 1330 })
    if (t > T.hand[1] + 0.05 && t < T.last) drawBits(x, HEART, { H: HOT }, 700, 1000 - 40 * prog(t, T.hand[1], T.hand[1] + 0.6), 8, { alpha: 1 - prog(t, T.hand[1] + 1.2, T.hand[1] + 1.6) })
  },
  cues: [
    ['whoosh', r3(T.gone - 0.03), 0.25, 0.04], ['tick', r3(T.gone), 0.06], ['whoosh', r3(T.back - 0.05), 0.3, 0.04], ['pop', r3(T.back + 0.1), 1318.51, 0.04, 0.3],
    ['riser', r3(T.race), r3(T.ribbon), 0.014], ['tick', r3(T.ribbon), 0.07], ['pop', r3(T.win), 1567.98, 0.05, 0.2], ['glitter', r3(T.win), r3(T.win + 0.5)],
    ['tick', r3(T.cross + 0.3), 0.04], ['tick', r3(T.cross + 0.9), 0.04], ['tick', r3(T.cross + 1.5), 0.04],
    ['pluck', r3(T.hand[1]), 1174.66, 0.04, 0.5, 0], ['pluck', r3(T.hand[1] + 0.12), 1567.98, 0.035, 0.5, 0], ['bell', r3(T.green), 1318.51, 0.025, 0.8, 0.3],
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(0.12 + i * 0.24), 0.018]),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
