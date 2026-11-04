// nc14e15: CUFFING SEASON, "“Are we cuffed or just cold?”" (33 s vertical, promo/films/next30/b02.md, music: lofi · Am)
// Story 0–30.6, then the short end card (no Align card transition). The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–6.5    "“Are we cuffed… | or just *cold?*”"  Frame 0: ♐ Sag + ♒ Aquarius on a snowy park bench under one blanket,
//              side-eyeing each other. Thought bubbles: "is this a winter thing?" / "is this a blanket thing?"
//              SAG: "it's purely for *warmth.*"  AQUARIUS: "obviously. *science.*"
//   6.5–14.2   "Excuse | after *excuse.*"  Layers pile on: a shared scarf, a second blanket, a third, until they're one lump
//              with eyes. Pisces sobs out of a snow bush: "just ASK!!"  (the ghost peeks over the bush, 11.2)
//  14.3–22.0   "There's a | *faster* way."  THE STARS: "there's a faster way to find out. *ask.*"  SAG: "so… is this just a
//              *winter* thing?"  AQUARIUS: "i hoped it's an *every-weather* thing."
//  22.2–30.1   The blankets fly off; they stay close anyway. Last line: "Weather changes. | *Ask anyway.*"
import { makeEp, star, bench, blanket, bubble, hearts, sparkles, shadow, R, glow,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, INK, BONE, LAV, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', SAG = '♐︎ SAGITTARIUS', AQ = '♒︎ AQUARIUS'
const SC = '#d0a8ff', AC = '#8fe6ff'
const L1 = [
  { t: 3.5, speaker: SAG, color: SC, text: "it's purely for *warmth.*" },
  { t: 5.0, speaker: AQ, color: AC, text: 'obviously. *science.*' },
]
const L2 = [
  { t: 7.0, speaker: AQ, color: AC, text: "i'm *still* a little cold." },
  { t: 9.9, speaker: SAG, color: SC, text: 'here. another *blanket.*' },
]
const L3 = [
  { t: 14.6, speaker: SP, text: "there's a faster way to find out. *ask.*" },
  { t: 17.4, speaker: SAG, color: SC, text: 'so… is this just a *winter* thing?' },
  { t: 19.7, speaker: AQ, color: AC, text: "i hoped it's an *every-weather* thing." },
]
const T = { b1: 6.5, scarf: 7.8, bl2: 9.2, bl3: 11.0, cut: 14.2, b3: 14.3, fly: 22.2, fin: 22.3 }
const SAG_HOPS = [0.5, ...talkHops(L1, SAG, { cps: 30 }), ...talkHops(L2, SAG, { cps: 30 }), ...talkHops(L3, SAG, { cps: 30 }), T.fly + 0.05, 24.6, 27.0]
const AQ_HOPS = [0.6, ...talkHops(L1, AQ, { cps: 30 }), ...talkHops(L2, AQ, { cps: 30 }), ...talkHops(L3, AQ, { cps: 30 }), T.fly + 0.1, 25.0, 27.4]

function bush(x, cx, cy) {
  for (const [dx, dy, r] of [[-60, 0, 70], [40, -10, 80], [110, 10, 60], [-10, -60, 60]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx, cy + dy, r + 6, 0, Math.PI * 2); x.fill() }
  for (const [dx, dy, r] of [[-60, 0, 70], [40, -10, 80], [110, 10, 60], [-10, -60, 60]]) { x.fillStyle = '#2f6a54'; x.beginPath(); x.arc(cx + dx, cy + dy, r, 0, Math.PI * 2); x.fill() }
  for (const [dx, dy, w] of [[-100, -50, 90], [0, -110, 80], [60, -70, 110], [120, -30, 60]]) R(x, SNOW, cx + dx, cy + dy, w, 22)
}

function scene(x, t, K) {
  const ok = K.ok
  // a lamp post glow
  R(x, INK, 905, 520, 22, 680); R(x, '#3a3350', 910, 520, 12, 680); R(x, INK, 870, 500, 92, 40); R(x, WARMC, 880, 506, 72, 28)
  glow(x, 916, 560, 420, 0.9)
  // the snow bush (right) with Pisces sobbing out of it
  const pk = pop01(t, 0.0, 0.01) * ok
  star(x, t, 'pisces', { x: 900, y: 1000 + (t > 12.3 && t < 14.0 ? -40 : 0), s: 170, pop: pk, mood: t > T.fin ? 'heart' : t > 12.3 ? 'wide' : 'sparkle', look: [-1, 0.2], tears: t > 12.3 ? 3 : 2, hat: '#7c74f0', seed: 6 })
  bush(x, 880, 1130)
  bubble(x, t, 820, 820, 12.4, 13.9, 'just ASK!!', { size: 40, tail: 0.3, col: '#e2deff' })
  shadow(x, 540, 1290, 640)
  bench(x, 540, 1150, 560)
  // the two on the bench: they scoot closer for the finale
  const fin = ease.inOutCubic(prog(t, T.fin, T.fin + 0.6))
  const sx = lerp(400, 450, fin), ax = lerp(680, 630, fin), y = 1060
  const sagMood = t < T.b1 ? 'squint' : t < T.b3 ? 'happy' : t < 19.7 ? 'wide' : 'heart'
  const aqMood = t < T.b1 ? 'squint' : t < T.b3 ? 'neutral' : t < 19.6 ? 'wide' : 'sparkle'
  star(x, t, 'sagittarius', { x: sx, y, s: 240, mood: sagMood, look: t < T.b1 ? [1, 0] : t > T.b3 && t < 17.3 ? [0, -1] : [1, -0.2], hops: SAG_HOPS, hat: '#a35cf0', pop: ok, seed: 9 })
  star(x, t, 'aquarius', { x: ax, y, s: 240, mood: aqMood, look: t < T.b1 ? [-1, 0] : t > T.b3 && t < 17.3 ? [0, -1] : [-1, -0.2], hops: AQ_HOPS, hat: '#38c4ec', pop: ok, seed: 11 })
  // the layers pile on… then all fly off at once
  const fly = ease.inCubic(prog(t, T.fly, T.fly + 0.7))
  const L = (t0, fn) => {
    if (t < t0 || fly >= 1) return
    const k = ease.outBack(prog(t, t0, t0 + 0.35))
    x.save(); x.translate(540, -900 * fly + (1 - clamp(k)) * -500); x.rotate((1 - clamp(k)) * 0.3 + fly * 0.5); x.translate(-540, 0); fn(); x.restore()
  }
  L(-1, () => blanket(x, t, 540, 1110, 520, 130, '#c8283c', GOLD))
  L(T.scarf, () => { R(x, INK, 300, 1104, 480, 34); R(x, MINT, 306, 1110, 468, 22); for (let i = 0; i < 9; i++) R(x, BONE, 316 + i * 52, 1110, 10, 22) })
  L(T.bl2, () => blanket(x, t, 540, 1098, 600, 170, '#2f6ad8', BONE))
  L(T.bl3, () => blanket(x, t, 540, 1082, 700, 200, '#2fc79a', '#f39a3a'))
  // when the lump is complete, just their eyes peek out: redraw the eye strip on top
  if (false) {
    for (const [cx, col] of [[sx, '#a35cf0'], [ax, '#38c4ec']]) { R(x, INK, cx - 50, 968, 100, 42); R(x, col, cx - 44, 972, 88, 34); R(x, INK, cx - 28, 978, 14, 22); R(x, INK, cx + 14, 978, 14, 22); R(x, '#ffffff', cx - 26, 980, 6, 6); R(x, '#ffffff', cx + 16, 980, 6, 6) }
  }
  // the thought bubbles of the cold open
  bubble(x, t, 330, 770, -1, 3.2, 'is this a winter thing?', { thought: true, size: 32, tail: 0.2 })
  bubble(x, t, 720, 660, 1.6, 4.9, 'is this a blanket thing?', { thought: true, size: 32, tail: -0.2 })
  // THE STARS
  const stk = pop01(t, T.b3, 0.4, 2) * outK(t, [T.fly - 0.2, T.fly])
  if (stk > 0.01) star(x, t, 'stars', { x: 540, y: 690, s: 170, pop: stk, mood: t > 19.7 ? 'sparkle' : 'happy', hops: [T.b3 + 0.2, ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
  hearts(x, t, T.fly + 0.4, 540, 880, { n: 7, cell: 7 })
  sparkles(x, t, 540, 900, T.fly + 0.3, 12, 220, 1, [GOLD, ICE, PINK])
}
const WARMC = '#ffd89a'

const EP = makeEp({
  id: 'nc14e15', ep: 15, duration: 35, key: 'Am',
  heads: [
    { text: '“Are we cuffed… | or just *cold?”*', at: -1.2, out: [6.3, 6.5], accentColor: AC, size: 100, accentSize: 140 },
    { text: 'Excuse | after *excuse.*', at: T.b1 + 0.1, out: [14.0, 14.2], accentColor: '#2fc79a', size: 104, accentSize: 140 },
    { text: "There's a | *faster* way.", at: T.b3 + 0.05, out: [21.9, 22.1], accentColor: GOLD, size: 104, accentSize: 140 },
    { text: 'Weather changes. | *Ask anyway.*', at: T.fin + 0.1, late: 2, lateAt: 23.0, wobble: true, out: [30.0, 30.3], accentColor: SC, size: 96, accentSize: 140 },
  ],
  boxes: [
    { lines: L1, open: 3.3, close: 6.4 },
    { lines: L2, open: 6.8, close: 14.0 },
    { lines: L3, open: 14.4, close: 22.0 },
  ],
  ghost: { at: 11.2, x: 760, y: 1050, from: 'below', cell: 3 },
  snow: 0.8, ground: 1180,
  scene,
  cues: [
    ['pluck', 0.4, 880, 0.025, 0.4, -0.3], ['pluck', 1.7, 987.77, 0.025, 0.4, 0.3],
    ['whoosh', T.scarf, 0.3, 0.03], ['tick', T.scarf + 0.3, 0.04],
    ['whoosh', T.bl2, 0.35, 0.035], ['tom', T.bl2 + 0.3, 110, { gain: 0.14, decay: 0.2 }],
    ['whoosh', T.bl3, 0.4, 0.04], ['tom', T.bl3 + 0.3, 90, { gain: 0.18, decay: 0.25 }],
    ['pop', 12.4, 1318.51, 0.045, 0.4], ['pop', 12.5, 1567.98, 0.04, 0.4],
    ['pop', T.b3 + 0.2, 987.77, 0.04, 0], ['glitter', T.b3, T.b3 + 0.4],
    ['whoosh', T.fly, 0.6, 0.05], ['riser', T.fly - 0.6, T.fly, 0.025], ['glitter', T.fly + 0.3, T.fly + 0.9], ['bell', T.fly + 0.4, 1760, 0.03, 1.2, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [LAV, RED, r3]
