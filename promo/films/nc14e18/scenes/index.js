// nc14e18: CUFFING SEASON, "The ex shows up with cocoa" (40 s vertical, promo/films/next30/b02.md, music: cinematic · Cm)
// Story 0–35.6, then the shared end card. The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–6.8    "Your ex. At your door. | With *cocoa.*"  Frame 0: ♎ Libra frozen in its warm doorway; ♊ Gemini on the step
//              holding two steaming mugs. GEMINI: "hi! cocoa? for *old times?*"
//   6.8–14.2   "The scales | *wobble.*"  A big pixel balance over Libra: THEN (a mug) vs NOW (a photo of ♌ Leo), tipping
//              back and forth. LIBRA: "it does smell *really* good…"  GEMINI: "remember the *snow day?*"  (ghost, 11.4)
//  14.2        card cut.
//  14.3–21.8   "Nostalgia is cozy. | It isn't a *plan.*"  THE STARS: "nostalgia is cozy. it isn't a *plan.*"  LIBRA (kind,
//              clear): "that's sweet. i'm *happy* where i am."  The scales settle on NOW. GEMINI: "fair. i had to try *once.*"
//  22.0        ★ LESSON UNLOCKED "Be kind | *and* be clear."  chip "+2 cocoas (Gemini kept both)"
//  27.0–35.1   Gemini strolls off sipping both cocoas; Libra's phone: "home soon ♡" from Leo. Pisces cries behind the hedge.
//              Last line: "Warm door. | *Closed* chapter."
import { makeEp, star, mug, door, bubble, hearts, sparkles, shadow, R, box, glow, drawBits, HEART, label, lights,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, INK, BONE, INTER, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', LIB = '♎︎ LIBRA', GEM = '♊︎ GEMINI', BC = '#f4a6ee', GC = '#ffe27a'
const L1 = [{ t: 1.0, speaker: GEM, color: GC, text: 'hi! cocoa? for *old times?*' }]
const L2 = [
  { t: 7.3, speaker: LIB, color: BC, text: 'it does smell *really* good…' },
  { t: 10.3, speaker: GEM, color: GC, text: 'remember the *snow day?*' },
]
const L3 = [
  { t: 14.6, speaker: SP, text: 'nostalgia is cozy. it isn’t a *plan.*' },
  { t: 17.1, speaker: LIB, color: BC, text: "that's sweet. i'm *happy* where i am." },
  { t: 19.6, speaker: GEM, color: GC, text: 'fair. i had to try *once.*' },
]
const T = { b2: 6.8, cut: 14.2, b3: 14.3, settle: 17.8, lesson: 22.0, lessonOut: [26.6, 26.8], fin: 27.0, walk: 27.4, text: 29.4 }
const LIB_HOPS = [0.2, 7.4, 8.4, ...talkHops(L3, LIB, { cps: 30 }), T.text + 0.1, 31.6, 33.4]
const GEM_HOPS = [0.4, ...talkHops(L1, GEM, { cps: 30 }), ...talkHops(L2, GEM, { cps: 30 }), ...talkHops(L3, GEM, { cps: 30 }), 28.0, 28.5, 29.0, 29.5, 30.0]

function house(x, t) {
  R(x, INK, -10, 560, 620, 740)
  R(x, '#5a3a4a', 0, 568, 600, 724)
  for (let j = 0; j < 18; j++) for (let i = 0; i < 8; i++) R(x, '#4a2e3e', i * 80 + (j % 2) * 40, 580 + j * 40, 70, 4)
  R(x, INK, -10, 520, 640, 60); R(x, SNOW, -10, 510, 640, 22)
  lights(x, t, 0, 540, 610, 540, { n: 8, sag: 30 })
  // the doorway, open: warm light pours out
  door(x, 190, 790, 280, 500, 1, { col: '#7a3a4a' })
  // inside: a framed photo of Leo on the wall
  box(x, 360, 850, 80, 90, GOLD, { b: 5 }); R(x, '#2a1f4a', 368, 858, 64, 74)
  drawBits(x, ['..O..', '.OOO.', 'OOOOO', '.O.O.'], { O: '#f39a3a' }, 400, 895, 9)
  // the step
  box(x, 150, 1290, 360, 30, '#8c86a8', { b: 6, hi: SNOW })
}
function scales(x, t, tilt, k) {
  if (k <= 0.01) return
  x.save(); x.translate(330, 690); x.scale(k, k)
  R(x, INK, -10, -40, 20, 160); R(x, GOLD, -5, -36, 10, 152); box(x, -50, 112, 100, 20, GOLD, { b: 5 })
  x.rotate(tilt)
  R(x, INK, -200, -46, 400, 16); R(x, GOLD, -196, -42, 392, 8)
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * 190, -38); x.rotate(-tilt)
    R(x, INK, -3, 0, 6, 60); box(x, -70, 60, 140, 16, GOLD, { b: 5 })
    if (d < 0) mug(x, t, 0, 46, 0.6, '#f2cf4a', { steam: 0.6 })
    else { box(x, -34, 4, 68, 56, BONE, { b: 4 }); drawBits(x, ['..O..', '.OOO.', 'OOOOO', '.O.O.'], { O: '#f39a3a' }, 0, 28, 7) }
    x.font = `800 24px ${INTER}`; x.fillStyle = d < 0 ? GC : '#ffc27a'; x.textAlign = 'center'; x.fillText(d < 0 ? 'THEN' : 'NOW', 0, 110)
    x.restore()
  }
  x.restore()
}
function hedge(x, cx, cy) {
  R(x, INK, cx - 170, cy - 110, 340, 130); R(x, '#2f6a54', cx - 162, cy - 102, 324, 114)
  for (let i = 0; i < 6; i++) R(x, '#3c8268', cx - 150 + i * 54, cy - 96, 30, 18)
  R(x, SNOW, cx - 170, cy - 122, 340, 22)
}

function scene(x, t, K) {
  const ok = K.ok
  house(x, t)
  // Pisces cries behind the hedge (right)
  star(x, t, 'pisces', { x: 960, y: 1110, s: 180, mood: t > T.text ? 'heart' : t > T.b3 ? 'sparkle' : 'wide', look: [-1, 0], tears: t > 17 ? 3 : 2, hat: '#7c74f0', seed: 6, pop: ok, hops: [17.2, T.text + 0.2] })
  hedge(x, 970, 1300)
  // Libra in the doorway
  shadow(x, 330, 1290, 240 * ok)
  const libMood = t < T.b2 ? 'wide' : t < T.b3 ? 'heart' : t < 17.0 ? 'squint' : t < T.fin ? 'happy' : 'sparkle'
  const LF = star(x, t, 'libra', { x: 330, y: 1150, s: 250, mood: libMood, look: t < T.fin ? [1, 0] : [0.4, 0.8], hops: LIB_HOPS, scarf: PINK, pop: ok, seed: 8 })
  // Gemini on the step, two mugs… then strolling off sipping both
  const wk = ease.inOutQuad(prog(t, T.walk, T.walk + 4.5))
  const gx = lerp(760, 1180, wk)
  shadow(x, gx, 1300, 240 * ok)
  const gemMood = t < T.b3 ? 'happy' : t < 19.6 ? 'wide' : t < T.fin ? 'happy' : 'sparkle'
  const GF = star(x, t, 'gemini', { x: gx, y: 1160, s: 250, mood: gemMood, look: t < T.fin ? [-1, 0] : [1, 0], hops: GEM_HOPS, hat: '#f2cf4a', pop: ok, seed: 4 })
  if (GF) { mug(x, t, gx - 140, GF.cy + 40, 0.8, RED); mug(x, t, gx + 140, GF.cy + 40, 0.8, '#4f7cd8') }
  bubble(x, t, Math.min(gx, 880), 900, 29.0, 31.4, 'mm. still good.', { size: 34, tail: 0.2 })
  // the scales of nostalgia vs now
  const sk = pop01(t, T.b2 + 0.1, 0.4, 2) * outK(t, [T.lesson - 0.2, T.lesson])
  const settle = ease.inOutCubic(prog(t, T.settle, T.settle + 0.8))
  const tilt = lerp(0.28 * Math.sin((t - T.b2) * 2.2) * Math.min(1, (t - T.b2) * 0.7), 0.26, settle)
  scales(x, t, tilt, sk)
  sparkles(x, t, 520, 650, T.settle + 0.7, 10, 120, 1, [GOLD, '#ffc27a', BONE])
  // THE STARS
  const stk = pop01(t, T.b3, 0.4, 2) * outK(t, [T.lesson - 0.2, T.lesson])
  if (stk > 0.01) star(x, t, 'stars', { x: 820, y: 640, s: 160, pop: stk, mood: 'happy', hops: [T.b3 + 0.2, ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
  // Leo texts: "home soon ♡"
  if (t > T.text && LF) {
    const pk = pop01(t, T.text, 0.35, 2.3) * ok
    x.save(); x.translate(560, 920); x.scale(pk, pk); x.rotate(0.06)
    box(x, -150, -60, 300, 120, '#2a2148', { b: 6 }); R(x, '#14102a', -138, -48, 276, 96)
    x.font = `800 22px ${INTER}`; x.fillStyle = '#ffc27a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♌︎ Leo', 0, -24)
    x.font = `700 32px ${INTER}`; x.fillStyle = BONE; x.fillText('home soon', -14, 16)
    x.restore()
    if (pk > 0.5) drawBits(x, HEART, { H: '#ff5c8a' }, 660, 936, 5)
    hearts(x, t, T.text + 0.3, 330, 960, { n: 6, cell: 7 })
  }
}

const EP = makeEp({
  id: 'nc14e18', ep: 18, duration: 40, key: 'Cm',
  heads: [
    { text: 'Your ex. At your door. | With *cocoa.*', at: -1.3, out: [6.6, 6.8], accentColor: GC, size: 92, accentSize: 140 },
    { text: 'The scales | *wobble.*', at: T.b2 + 0.1, out: [14.0, 14.2], accentColor: BC, size: 108, accentSize: 150 },
    { text: 'Nostalgia is cozy. | It isn’t a *plan.*', at: T.b3 + 0.05, out: [21.7, 21.9], accentColor: GOLD, size: 92, accentSize: 132 },
    { text: 'Warm door. | *Closed* chapter.', at: T.fin + 0.2, late: 2, lateAt: 28.2, wobble: true, out: [35.0, 35.3], accentColor: BC, size: 104, accentSize: 148 },
  ],
  boxes: [
    { lines: L1, open: 0.8, close: 6.6 },
    { lines: L2, open: 7.1, close: 14.0 },
    { lines: L3, open: 14.4, close: 21.8 },
  ],
  lesson: { at: T.lesson, out: T.lessonOut, text: 'Be kind | *and* be clear.', chip: '+2 cocoas (Gemini kept both)', color: BC },
  ghost: { at: 11.4, x: 750, y: 1200, from: 'below', cell: 3 },
  cuts: [6.8, { t: T.cut, kind: 'flip' }, 26.9],
  snow: 0.7, ground: 1300,
  scene,
  cues: [
    ['boom', 0.15, 0.2], ['pluck', 0.5, 523.25, 0.03, 0.6, 0.3],
    ['whoosh', T.b2 + 0.1, 0.4, 0.035], ...[7.6, 8.6, 9.6, 10.6, 11.6, 12.6].map((a, i) => ['tick', a, 0.03 + 0.005 * (i % 2)]),
    ['pop', T.b3 + 0.2, 987.77, 0.04, 0.3], ['tom', T.settle + 0.8, 98, { gain: 0.2, decay: 0.3 }], ['bell', T.settle + 0.85, 1567.98, 0.03, 1.2, 0],
    ['pop', 28.0, 659.25, 0.025, 0.4], ['pop', 29.0, 739.99, 0.025, 0.4],
    ['pop', T.text, 1318.51, 0.05, -0.2], ['pluck', T.text + 0.1, 1174.66, 0.04, 0.5, -0.2], ['glitter', T.text + 0.3, T.text + 0.9],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ICE, MINT, label, glow, clamp, r3]
