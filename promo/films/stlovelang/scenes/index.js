// stlovelang — "Love, Translated." (60 s vertical Align ad, Star Talk season 3 #22, jazzy in G). Story 0–55.6, then the
// shared end card.
//   0.0–4.4   "Two stars. | Two love *languages.*"  A tiny date table (checkered cloth, a candle). ♉ TAURUS (oven mitt) and
//             ♌ LEO (crown) frown at each other; they sigh in sync; crickets. ♓ PISCES, the waiter, is already crying.
//   4.4–10.5  "Misfire *#1.*"  Taurus hops a lattice pie over the candle to Leo: "I baked this for you." LEO: "...ok but do
//             you think I'm *amazing?*" Taurus double-takes; the pie's steam wilts (womp).
//  10.5       card cut.
//  10.5–16.7 "Live *translation.*"  A summit interpreter booth drops in (ON AIR): ♊ GEMINI in headphones. "TRANSLATION: the
//             pie means 'I love you.'" Leo stares at the pie… "...so is that a yes on *amazing?*" Gemini and Taurus eye-roll.
//  16.7–24.4 "Misfire *#2.*"  Drumroll: Leo unrolls a painted banner, YOU'RE GREAT ♥. TAURUS: "...is it *edible?*" Taurus
//             stretches up and bites the corner. GEMINI: "TRANSLATION: the banner means 'I love you.'"
//  24.45      card cut.
//  24.4–31.7 "Crossed *wires.*"  The camera whips sideways through the sky while the booth stays put, its LED strip blinking
//             TRANSLATING…: ♋ CANCER folds a growing stack of laundry next to ♎ LIBRA, patting the empty bench seat: "...or we
//             could just *sit together?*" Whip: ♈ ARIES goes in for a hug, ♍ VIRGO glides off to its spice rack and Aries face-
//             plants. VIRGO: "One sec. Cumin goes after *cardamom.*" Gemini sweats and swaps headsets; the strip goes red.
//  31.7–38.7 "Radical idea: | just *ask.*"  Whip home. Gemini rips its headphones off (record scratch, the band stops):
//             "You could just *ASK* each other." Crickets. A talk card lands: "How do you like to be loved?" Both play an
//             answer face-down; they flip: TAURUS "Make me / something." · LEO "Tell me. / Out loud."
//  38.7       card cut.
//  38.7–44.9 "Message | *received.*"  TAURUS, stiffly: "you're… *amazing.*" Leo melts (heart eyes, its crown pops), eats
//             the pie: "mmph. *i love you too.*" Pisces wails. Click: the booth's ON AIR light goes off; Gemini dozes.
//  45.05      ★ LESSON UNLOCKED: "Ask how they | feel loved. | Then *speak* it." (+1 FLUENT)
//  49.45      card cut.
//  49.45–52.7 "Talk *cards.*"  The talk card, two answers face-down beside it. GEMINI: "Answers stay hidden till you *both play.*"
//  52.7–55.6 "Booth | *closed.*"  A CLOSED sign swings onto the booth; Taurus and Leo lean in under a heart. GEMINI: "Love,
//             *translated.*" Everyone pops out by 55.45.
// One canvas (sky, the camera-moved date world, the screen-space booth and cards), DOM type + the dialogue boxes, the
// shared LESSON beat, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawTable, drawPie, drawCrown, drawMitt, drawHeadphones, drawBooth, drawDeskMic, drawGreatBanner, drawLaundry, drawBench,
  drawSpiceRack, drawPixelHeart, drawTear, drawSweat, drawTalkCard, drawAnswer, bitmap } from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', MINT = '#7dffb0', RED = '#ff5c7a'
const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)     // the 108 bpm grid

// ── the timeline
export const T = {
  black: [0, 0.3],
  h0: 0.15, h0Land: 0.95, sigh: 2.45, crick0: 3.2, h0Out: [4.22, 4.4],
  h1: 4.5, h1Land: 4.75, slide: [5.0, 5.55], l1: 5.0, l2: 7.5, take: 8.85, wilt: 9.25, h1Out: [10.22, 10.4],
  cut1: 10.5,
  booth: [10.55, 11.05], h2: 10.6, h2Land: 10.85, l3: 11.3, l4: 14.6, roll1: 15.85, h2Out: [16.5, 16.68],
  h3: 16.8, h3Land: 17.05, drum: [17.15, 17.9], unveil: [17.9, 18.4], l5: 18.7, nibble: [19.9, 20.35], chomp1: 20.2, l6: 21.2, h3Out: [24.15, 24.33],
  whipA: [24.3, 24.6], cut2: 24.45, h4: 24.6, h4Land: 24.85, l7: 25.0, offer: 27.0,
  whipB: [28.05, 28.35], l8: 28.6, lunge: [28.95, 29.3], miss: 29.1, flop: 29.35, swap: [30.25, 30.75], alarm: [30.4, 31.5], h4Out: [31.4, 31.58],
  whipH: [31.45, 31.75], rip: 31.9, h5: 32.0, h5Land: 32.55, l9: 32.3, crick1: 33.9, glance: 34.0,
  card: [34.7, 35.1], ins: [34.75, 35.15], insOut: [36.1, 36.45], playA: 36.3, playB: 36.5, flip: 36.9, h5Out: [38.45, 38.62],
  cut3: 38.7,
  h6: 38.8, h6Land: 39.2, l10: 39.0, melt: 39.95, push: [40.4, 40.8], bite1: 41.1, bite2: 41.55, l11: 41.6, wail: 41.9, lightOff: 43.25, close1: 44.3, h6Out: [44.7, 44.88],
  lesson: BEAT(80),                    // 45.048
  lessonOut: [49.2, 49.4],
  cut4: 49.45,
  h7: 49.5, h7Land: 49.75, deal: [49.5, 49.95], l12: 49.6, h7Out: [52.45, 52.62],
  h8: 52.75, h8Land: 53.1, sign: [52.7, 53.15], l13: 52.9, lean: [53.1, 53.6], close2: 55.25, out: [55.0, 55.45], h8Out: [55.2, 55.42],
}

const S = id => signStar(id)
const TAU = S('taurus'), LEO = S('leo'), GEM = S('gemini'), PIS = S('pisces'), CAN = S('cancer'), LIB = S('libra'), ARI = S('aries'), VIR = S('virgo')
const COL = { tau: TAU, leo: LEO, gem: GEM, pis: PIS, can: CAN, lib: LIB, ari: ARI, vir: VIR }
const NAME = { tau: '♉ TAURUS', leo: '♌ LEO', gem: '♊ GEMINI', can: '♋ CANCER', lib: '♎ LIBRA', ari: '♈ ARIES', vir: '♍ VIRGO', pis: '♓ PISCES' }
const SEED = { tau: 3, leo: 13, gem: 7, pis: 23, can: 11, lib: 17, ari: 5, vir: 19 }
const LINES1 = [
  { t: T.l1, speaker: NAME.tau, color: TAU.color, text: 'I baked this *for you.*' },
  { t: T.l2, speaker: NAME.leo, color: LEO.color, text: "...ok but do you think I'm *amazing?*" },
  { t: T.l3, speaker: NAME.gem, color: GEM.color, text: "TRANSLATION: the pie means *'I love you.'*" },
  { t: T.l4, speaker: NAME.leo, color: LEO.color, text: '...so is that a yes on *amazing?*' },
  { t: T.l5, speaker: NAME.tau, color: TAU.color, text: '...is it *edible?*' },
  { t: T.l6, speaker: NAME.gem, color: GEM.color, text: "TRANSLATION: the banner means *'I love you.'*" },
  { t: T.l7, speaker: NAME.lib, color: LIB.color, text: '...or we could just *sit together?*' },
  { t: T.l8, speaker: NAME.vir, color: VIR.color, text: 'One sec. Cumin goes after *cardamom.*' },
  { t: T.l9, speaker: NAME.gem, color: GEM.color, text: 'You could just *ASK* each other.' },
  { t: T.l10, speaker: NAME.tau, color: TAU.color, text: "you're… *amazing.*" },
  { t: T.l11, speaker: NAME.leo, color: LEO.color, text: 'mmph. *i love you too.*' },
]
const LINES2 = [
  { t: T.l12, speaker: NAME.gem, color: GEM.color, text: 'Answers stay hidden till you *both play.*' },
  { t: T.l13, speaker: NAME.gem, color: GEM.color, text: 'Love, *translated.*' },
]
const CPS = 28
export const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Ask how they | feel loved. | Then *speak* it.', chip: '+1 FLUENT' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inW = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.4) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(k / d * Math.PI) }

// ── the world: the date at x 0…1080, the laundry vignette at +1080, the spice rack at +2160. The camera maps world
//    (fx, fy) to screen (540, 1000) at scale s. The booth and the cards live in screen space.
const P0 = { tau: [300, 1100, 250], leo: [780, 1100, 250], pis: [968, 930, 112] }
const TABLE = { x: 540, y: 1222 }
const VA = 1080, VB = 2160
const P1 = { can: [VA + 300, 1090, 230], lib: [VA + 770, 1080, 230] }
const P2 = { ari: [VB + 250, 1100, 230], vir: [VB + 640, 1100, 230] }
const CAM = [   // [t, s, fx, fy]; consecutive keys tween; a key 0.001 s after another = a hard cut
  [0, 1.28, 540, 1061], [T.slide[0], 1.28, 540, 1061], [T.take, 1.34, 560, 1075], [T.cut1 - 0.001, 1.36, 560, 1075],
  [T.cut1, 1, 540, 1000], [T.whipA[0], 1, 540, 1000],
  [T.whipA[1], 1, 540 + VA, 1000], [T.whipB[0], 1, 540 + VA, 1000], [T.whipB[1], 1, 540 + VB, 1000], [T.whipH[0], 1, 540 + VB, 1000],
  [T.whipH[1], 1, 540, 1000], [T.cut3 - 0.001, 1, 540, 1000],
  [T.cut3, 1.08, 540, 1030], [T.lesson, 1.1, 540, 1030], [T.cut4, 1, 540, 1000],
]
function cam(t) {
  if (t <= CAM[0][0]) return { s: CAM[0][1], fx: CAM[0][2], fy: CAM[0][3] }
  for (let i = 1; i < CAM.length; i++) {
    if (t < CAM[i][0]) {
      const a = CAM[i - 1], b = CAM[i], d = b[0] - a[0]
      const e = (d < 0.5 ? ease.inOutQuad : ease.inOutCubic)(clamp((t - a[0]) / d))
      return { s: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e) }
    }
  }
  const z = CAM[CAM.length - 1]; return { s: z[1], fx: z[2], fy: z[3] }
}

// ── the booth (screen space)
const BOOTH = { x: 310, y: 482, w: 460, h: 300 }
const GEM_AT = [540, 640, 170]

// moods: per star a list of [t, mood, look, { sq, dy, blink }] keys; the last key at or before t wins
const FWD = [0, 0], UP = [0, -1]
const MOODS = {
  tau: [[0, 'squint', [1, 0]], [T.sigh, 'squint', [0, 1], { sq: 0.14 }], [T.sigh + 0.7, 'squint', [1, 0]], [T.h1, 'happy', [1, 0]],
    [T.l2, 'happy', [1, 0]], [T.take, 'wide', [1, 0], { dy: -26, sq: -0.1, blink: false }], [T.take + 0.35, 'wide', [1, 0], { blink: false }], [T.wilt, 'neutral', [0, 1], { sq: 0.1, dy: 6 }],
    [T.l3 - 0.2, 'neutral', [1, -1]], [T.l3 + 1.6, 'happy', [1, -1]], [T.l4 + 0.4, 'neutral', [1, 0]], [T.roll1, 'eyeroll', UP], [T.roll1 + 0.8, 'neutral', [1, 0]],
    [T.unveil[0], 'wide', [1, -1], { blink: false }], [T.l5, 'squint', [1, -1]], [T.nibble[0], 'happy', [1, -1], { sq: -0.24, dy: -70 }], [T.nibble[1], 'happy', [1, 0], { sq: 0.06 }],
    [T.l6, 'happy', [1, -1]],
    [T.whipH[1], 'wide', [1, -1], { blink: false }], [T.glance, 'neutral', [1, 0]], [T.card[0], 'wide', [1, 0], { blink: false }], [T.playA, 'neutral', [1, 0]], [T.flip + 0.3, 'sparkle', [1, 0]],
    [T.l10, 'squint', FWD, { sq: -0.12 }], [T.melt - 0.1, 'happy', [1, 0], { sq: 0.04 }], [T.push[0], 'happy', [1, 0]], [T.bite1, 'sparkle', [1, 0]],
    [T.lesson - 0.3, 'sparkle', UP], [T.cut4, 'happy', [1, 0]], [T.lean[0], 'heart', [1, 0]]],
  leo: [[0, 'squint', [-1, 0]], [T.sigh, 'squint', [0, 1], { sq: 0.14 }], [T.sigh + 0.7, 'squint', [-1, 0]], [T.slide[1] - 0.1, 'neutral', [-1, 1]],
    [T.l2, 'sparkle', [-1, 0]], [T.take, 'sparkle', [-1, 0]],
    [T.l3 - 0.2, 'wide', [-1, -1]], [T.l3 + 1.7, 'neutral', [-1, 1]], [T.l4, 'sparkle', [-1, -1]], [T.h3, 'happy', FWD],
    [T.unveil[0], 'happy', [-1, 0], { sq: 0.06 }], [T.l5 + 0.55, 'wide', [-1, 0], { blink: false }], [T.nibble[0] + 0.2, 'wide', [-1, -1], { blink: false, sq: -0.08 }], [T.l6, 'neutral', [-1, -1]],
    [T.whipH[1], 'wide', [-1, -1], { blink: false }], [T.glance, 'neutral', [-1, 0]], [T.card[0], 'wide', [-1, 0], { blink: false }], [T.playA, 'neutral', [-1, 0]], [T.flip + 0.3, 'sparkle', [-1, 0]],
    [T.l10, 'wide', [-1, 0], { blink: false }], [T.melt, 'heart', [-1, 0], { sq: -0.06 }], [T.push[1], 'sparkle', [-1, 1]], [T.bite1, 'heart', FWD, { sq: 0.12 }], [T.bite1 + 0.25, 'heart', FWD],
    [T.lesson - 0.3, 'sparkle', UP], [T.cut4, 'happy', [-1, 0]], [T.lean[0], 'heart', [-1, 0]]],
  gem: [[0, 'happy', FWD], [T.l3, 'neutral', [-1, 1]], [T.l3 + 0.9, 'neutral', [1, 1]], [T.l3 + 1.7, 'happy', FWD], [T.l4 + 0.6, 'neutral', [1, 1]], [T.roll1, 'eyeroll', UP], [T.roll1 + 0.8, 'neutral', FWD],
    [T.unveil[0], 'wide', [0, 1], { blink: false }], [T.l6, 'neutral', [-1, 1]], [T.l6 + 1.8, 'squint', FWD],
    [T.whipA[0], 'wide', [-1, 0], { blink: false }], [T.whipA[0] + 1.6, 'wide', [1, 0], { blink: false }], [T.whipB[0], 'wide', [-1, 1], { blink: false }], [T.alarm[0], 'squint', FWD, { sq: 0.05 }],
    [T.rip, 'squint', FWD, { sq: -0.14, dy: -16 }], [T.rip + 0.3, 'squint', FWD], [T.l9 + 1.2, 'neutral', [0, 1]], [T.flip + 0.3, 'sparkle', [0, 1]],
    [T.cut3, 'sparkle', [0, 1]], [T.lightOff, 'sleepy', FWD, { dy: 12, sq: 0.08 }],
    [T.lesson - 0.3, 'sleepy', FWD, { dy: 12, sq: 0.08 }], [T.cut4, 'happy', FWD], [T.l13, 'happy', FWD], [T.l13 + 0.9, 'wink', FWD]],
  pis: [[0, 'sparkle', [-1, 0]], [T.take, 'wide', [-1, 0]], [T.take + 0.6, 'sparkle', [-1, 0]], [T.melt, 'sparkle', [-1, 0]], [T.wail, 'sparkle', FWD, { sq: 0.06 }], [T.cut4, 'sparkle', [-1, 0]]],
  can: [[0, 'happy', [0, 1]], [T.offer, 'sparkle', [1, 0], { dy: -10 }], [T.offer + 0.9, 'happy', [0, 1]]],
  lib: [[0, 'sparkle', [-1, 0]], [T.l7 + 1.4, 'neutral', [-1, 0], { sq: 0.1, dy: 6 }], [T.offer + 0.1, 'neutral', [-1, 0], { sq: 0.1, dy: 6, blink: 0.5 }]],
  ari: [[0, 'happy', [1, 0]], [T.lunge[0], 'heart', [1, 0], { sq: -0.2 }], [T.flop, 'wide', [1, 1], { sq: 0.38, blink: false }], [T.flop + 0.55, 'neutral', [0, 1], { sq: 0.34, blink: 0.6 }]],
  vir: [[0, 'squint', [1, 0]], [T.miss, 'squint', [1, -1]], [T.swap[1], 'happy', [1, -1]]],
}
function moodAt(id, t) {
  let k = MOODS[id][0]
  for (const m of MOODS[id]) if (m[0] <= t) k = m
  const o = k[3] || {}
  // a held key eases its squash / lift in over 0.12 s and back out with the next key
  const age = t - k[0], ein = clamp(age / 0.12)
  return { mood: k[1], look: k[2], sq: (o.sq || 0) * ein, dy: (o.dy || 0) * ein, blink: o.blink }
}
const HOPS = {}
for (const id of Object.keys(NAME)) HOPS[id] = talkHops([...LINES1, ...LINES2], NAME[id], { cps: CPS })
HOPS.leo.push(T.unveil[1], T.melt + 0.1, T.bite1 - 0.1, T.lean[1])
HOPS.tau.push(T.h1 + 0.1, T.flip + 0.3, T.lean[1] + 0.05)
HOPS.gem.push(T.booth[1], T.cut4 + 0.1)
HOPS.can.push(T.offer)
for (let k = 0; k < 8; k++) HOPS.pis.push(T.wail + k * 0.3)

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 70px Inter", "italic 500 160px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 28px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H = (text, o) => popText(root, text, { wobble: true, fit: true, top: 190, size: 112, accentSize: 156, ...o })
  const HEADS = [
    [H('Two stars. | Two love *languages.*', { size: 100, accentSize: 132, at: T.h0, late: 1, lateAt: T.h0Land, gap: 0.08, accentColor: PINK }), T.h0Out],
    [H('Misfire *#1.*', { size: 128, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, top: 200, accentColor: TAU.color }), T.h1Out],
    [H('Live *translation.*', { size: 112, accentSize: 150, at: T.h2, late: 1, lateAt: T.h2Land, top: 220, accentColor: GEM.color }), T.h2Out],
    [H('Misfire *#2.*', { size: 128, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, top: 200, accentColor: LEO.color }), T.h3Out],
    [H('Crossed *wires.*', { size: 120, accentSize: 164, at: T.h4, late: 1, lateAt: T.h4Land, top: 210, accentColor: RED }), T.h4Out],
    [H('Radical idea: | just *ask.*', { size: 100, accentSize: 150, at: T.h5, late: 1, lateAt: T.h5Land, top: 170, accentColor: GOLD }), T.h5Out],
    [H('Message | *received.*', { size: 104, accentSize: 146, at: T.h6, late: 1, lateAt: T.h6Land, top: 170, accentColor: PINK }), T.h6Out],
    [H('Talk *cards.*', { size: 128, accentSize: 176, at: T.h7, late: 1, lateAt: T.h7Land, top: 200, accentColor: GOLD }), T.h7Out],
    [H('Booth | *closed.*', { size: 104, accentSize: 150, at: T.h8, late: 1, lateAt: T.h8Land, top: 170, accentColor: GEM.color }), T.h8Out],
  ]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1480, width: 960, height: 300, open: T.l1 - 0.25, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1480, width: 960, height: 300, open: T.l12 - 0.25, close: T.close2, cps: CPS })
  const lesson = buildLesson(root, { ...LESSON, accentColor: PINK, dim: 0.62 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── tears: drops arc out of both eyes from t0 on, every `gap` s (pure f(t))
  function tears(cx, cy, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 34)
    for (const side of [-1, 1]) {
      const ex = cx + side * size * 0.13, ey = cy + size * 0.04
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = side * (90 + ((k * 37) % 5) * 22) * spread, vy = -(120 + ((k * 53) % 4) * 34)
        drawTear(x, ex + vx * a, ey + vy * a + 800 * a * a, px)
      }
    }
  }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, life = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R0 * (0.7 + 0.5 * p), cy + Math.sin(a) * R0 * (0.7 + 0.5 * p) * 0.8, 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }
  function heartBurst(t, cx, cy, t0, n = 7, R0 = 150, life = 1.0) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (i - (n - 1) / 2) * 0.42
      drawPixelHeart(x, cx + Math.cos(a) * R0 * p, cy + Math.sin(a) * R0 * p - 40 * p, 6 + (i % 2) * 2, i % 2 ? '#ff4f7e' : PINK)
    }
    x.restore()
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.booth[1], 10], [T.flop, 12], [T.rip, 8], [T.card[1], 8], [T.unveil[1], 6]]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }
  // a name tag (Space Mono, in the star's colour) above a star: who's who in the montage
  function tag(cx, cy, txt, col, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const w = x.measureText(txt).width + 34
    x.fillStyle = 'rgba(13,8,32,0.85)'; x.beginPath(); x.roundRect(cx - w / 2, cy - 22, w, 44, 10); x.fill()
    x.strokeStyle = rgba(col, 0.9); x.lineWidth = 3; x.stroke()
    x.fillStyle = col; x.fillText(txt, cx, cy + 1)
    x.restore()
  }

  // ── a star with its props (world coords, inside the camera transform)
  function star(id, wx, wy, sz, t, { pop = 1, extraSq = 0, extraDy = 0 } = {}) {
    if (pop <= 0.02) return null
    const st = moodAt(id, t)
    return drawStarChar(x, wx, wy + st.dy + extraDy, sz, t, { color: COL[id].color, glyph: sz >= 120 ? COL[id].glyph : null, mood: st.mood, look: st.look, blink: st.blink,
      squash: st.sq + extraSq, hops: HOPS[id], seed: SEED[id], pop, glow: 0.9, bob: sz * 0.03 })
  }

  // ── the date (world)
  const outAllAt = t => popOut(t, T.out)
  function pieAt(t) {
    // on Taurus' side, hopped over the candle to Leo's side; Taurus nudges it closer for the payoff
    const p = prog(t, ...T.slide), e = ease.inOutCubic(p)
    let px0 = lerp(398, 640, e), py0 = TABLE.y - 2 - Math.sin(p * Math.PI) * 70
    const q = ease.inOutCubic(prog(t, ...T.push)); px0 = lerp(px0, 676, q)
    return [px0, py0]
  }
  function drawDate(t, ok) {
    const lean = ease.inOutCubic(prog(t, ...T.lean))
    // Pisces the waiter, behind everything: a towel on its arm, crying (it always is)
    {
      const [px0, py0, sz] = P0.pis
      x.save(); x.globalAlpha = ok
      const r = star('pis', px0, py0, sz, t)
      if (r) {
        bitmap(x, ['WWWWW', 'WWWWW', 'W.W.W', 'W...W'], { W: '#fbf3e2' }, r.x - sz * 0.62, r.y + sz * 0.02, Math.max(3, sz / 26))
        const wail = t >= T.wail && t < T.cut4 + 3
        tears(r.x, r.y, sz, t, 0.3, 99, { gap: wail ? 0.07 : 0.22, spread: wail ? 1.2 : 0.6, life: 0.55 })
      }
      x.restore()
    }
    // Taurus + Leo (their glyphs face out), the table between them
    const hopY = id => 0
    const tauX = P0.tau[0] + lean * 70, leoX = P0.leo[0] - lean * 70 - (t >= T.push[1] && t < T.lesson ? 34 * bump(t, T.bite1 - 0.15, 0.5) + 34 * bump(t, T.bite2 - 0.15, 0.5) : 0)
    x.save(); x.globalAlpha = ok
    const tr = star('tau', tauX, P0.tau[1], P0.tau[2], t)
    if (tr) {
      const cs = tr.size
      drawMitt(x, tr.x + cs * 0.44, tr.y + cs * 0.08 + Math.sin(t * 2) * 3, Math.max(3, cs / 34), 0.4)
    }
    const lr = star('leo', leoX, P0.leo[1], P0.leo[2], t)
    if (lr) {
      const cs = lr.size, melt = bump(t, T.melt, 0.7)
      const spin = t >= T.melt && t < T.melt + 0.7 ? (t - T.melt) / 0.7 * Math.PI * 2 : 0
      drawCrown(x, lr.x + cs * 0.02, lr.top + cs * 0.1 - melt * 90, Math.max(3, cs / 32), -0.12 + spin)
    }
    drawTable(x, TABLE.x, TABLE.y, t)
    // the pie
    if (t >= 0) {
      const [qx, qy] = pieAt(t)
      const steam = t < T.wilt ? 1 : t < T.push[0] ? 0 : prog(t, T.push[0], T.push[0] + 0.6)
      const bite = t < T.bite1 ? 0 : t < T.bite2 ? 0.55 : 1
      drawPie(x, qx, qy, 7, { bite, steam, t })
      // the wilt: one sad curl of steam sinking
      if (t >= T.wilt && t < T.wilt + 0.9) { const k = prog(t, T.wilt, T.wilt + 0.9); x.globalAlpha = ok * (1 - k); bitmap(x, ['X.', '.X', 'X.', 'XX'], { X: '#fffbea' }, qx - 4, qy - 70 + k * 40, 7); x.globalAlpha = ok }
    }
    // Leo's banner
    if (t >= T.unveil[0] && t < T.cut2) {
      const k = ease.outCubic(prog(t, ...T.unveil))
      drawGreatBanner(x, 222, 864, 878, t, { k, bite: ease.outBack(prog(t, T.chomp1, T.chomp1 + 0.12)) })
    }
    x.restore()
    // tags (the hook)
    const tk = clamp(prog(t, 0.6, 0.9)) * (1 - prog(t, 3.9, 4.2))
    tag(P0.tau[0], P0.tau[1] + 172, '♉ TAURUS', TAU.color, tk)
    tag(P0.leo[0], P0.leo[1] + 172, '♌ LEO', LEO.color, tk)
    // sighs: two puffs
    if (inW(t, T.sigh, T.sigh + 0.8)) {
      const k = prog(t, T.sigh, T.sigh + 0.8)
      x.save(); x.globalAlpha = (1 - k) * 0.85
      for (const [sx, d] of [[P0.tau[0] + 40, 1], [P0.leo[0] - 40, -1]]) bitmap(x, ['.XX.', 'XXXX', '.XX.'], { X: '#d8e6ff' }, sx + d * k * 40, P0.tau[1] + 20 + k * 30, 8)
      x.restore()
    }
    // Leo melts: hearts
    if (lr) heartBurst(t, lr.x, lr.top, T.melt + 0.05, 7, 170)
    if (lr) heartBurst(t, lr.x, lr.top, T.bite1 + 0.1, 5, 140)
    if (tr && lr) heartBurst(t, (tr.x + lr.x) / 2, Math.min(tr.top, lr.top) - 20, T.lean[1], 9, 200, 1.4)
    if (lr && t >= T.lean[1] && t < T.out[1]) { const k = pop01(t, T.lean[1] + 0.1, 0.4, 2.4) * ok; if (k > 0) drawPixelHeart(x, (tr.x + lr.x) / 2, Math.min(tr.top, lr.top) - 30 + Math.sin(t * 3) * 6, 14 * k, '#ff4f7e') }
  }

  // ── vignette A: Cancer folds laundry, Libra pats the bench
  function drawVignetteA(t) {
    if (t < T.whipA[0] || t > T.whipB[1] + 0.05) return
    const [cx0, cy0, cs0] = P1.can, [lx0, ly0, ls0] = P1.lib
    drawBench(x, lx0 + 70, ly0 + 108, 7)
    const lr = star('lib', lx0, ly0, ls0, t)
    // pat-pat on the cushion (little hearts float up)
    for (let k = 0; k < 6; k++) {
      const pt = 24.85 + k * 0.62, a = t - pt
      if (a < 0 || a > 0.9 || pt > T.l7 + 1.4) continue
      x.save(); x.globalAlpha = 1 - a / 0.9; drawPixelHeart(x, lx0 + 170 + (k % 2) * 30, ly0 + 70 - a * 90, 5, PINK); x.restore()
    }
    const n = 2 + Math.floor(clamp((t - 24.6) / 0.85, 0, 8)), fold = ((t - 24.6) / 0.85) % 1
    const cr = star('can', cx0, cy0, cs0, t)
    drawLaundry(x, cx0 + 20, cy0 + 196, 7, n, t < 24.6 ? 0 : fold, t)
    // the offered shirt (held up toward Libra)
    if (t >= T.offer && t < T.offer + 1.0 && cr) {
      const k = bump(t, T.offer, 1.0)
      bitmap(x, ['LLLLLLLLLL', 'LBBBBBBBBL', 'LBWWWWWWBL', 'LBBBBBBBBL', 'LLLLLLLLLL'], { L: '#1a1030', B: '#ffd98a', W: '#fff3c0' }, cr.x + 120, cr.y - 40 - k * 40, 7)
    }
    tag(cx0, cy0 - 168, '♋ CANCER', CAN.color, 1)
    tag(lx0, ly0 - 168, '♎ LIBRA', LIB.color, 1)
    // the labels (what each one means by it)
    lab(cx0 + 20, cy0 + 252, 'FOLDS YOUR LAUNDRY', CAN.color)
    lab(lx0 + 40, ly0 + 252, 'JUST WANTS TO SIT', LIB.color)
  }
  function lab(cx, cy, txt, col) { // 28px Space Mono caption
    x.save(); x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    if ('letterSpacing' in x) x.letterSpacing = '2px'
    x.fillStyle = 'rgba(6,4,18,0.6)'; const w = x.measureText(txt).width + 24; x.fillRect(cx - w / 2, cy - 21, w, 42)
    x.fillStyle = col; x.fillText(txt, cx, cy + 1)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.restore()
  }
  // ── vignette B: Aries goes in for the hug, Virgo alphabetises
  function drawVignetteB(t) {
    if (t < T.whipB[0] - 0.05 || t > T.whipH[1] + 0.05) return
    drawSpiceRack(x, VB + 818, 880, 7, t, { swap: ease.inOutCubic(prog(t, ...T.swap)) })
    const [vx0, vy0, vs0] = P2.vir, [ax0, ay0, as0] = P2.ari
    const vg = ease.inOutCubic(prog(t, T.miss - 0.15, T.miss + 0.2))
    star('vir', vx0 + vg * 120, vy0 - vg * 30, vs0, t)
    const lp = prog(t, ...T.lunge), le = ease.inQuad(lp)
    const ax = lerp(ax0, vx0 - 20, le), ay = ay0 - Math.sin(lp * Math.PI) * 60 + (t >= T.flop ? 60 : 0)
    star('ari', ax, ay, as0, t)
    if (t >= T.flop && t < T.flop + 0.5) sparkleRing(t, ax, ay + 60, T.flop, 8, 140, 0.5, 0.5)
    tag(ax0, ay0 - 168, '♈ ARIES', ARI.color, 1 - prog(t, T.lunge[0], T.lunge[0] + 0.15))
    tag(vx0 + vg * 120, vy0 - 168 - vg * 30, '♍ VIRGO', VIR.color, 1)
    lab(ax0 + 20, ay0 + 252, 'WANTS A HUG', ARI.color)
    lab(vx0 + 120, vy0 + 252, 'ALPHABETISES FOR YOU', VIR.color)
  }

  // ── the booth (screen space)
  const HEADSET = ['#38c4ec', '#ff8fb1', '#7dffb0', '#c9a6ff']
  function boothState(t) {
    if (t < T.booth[0]) return null
    const drop = easeOutBack(prog(t, ...T.booth), 1.6), oy = (1 - drop) * -760
    const on = t < T.lightOff ? 1 : t < T.cut4 ? (Math.floor((t - T.lightOff) * 20) % 2 && t < T.lightOff + 0.15 ? 1 : 0) : 0
    let screen = '', blink = false, alarm = 0
    if (t < T.l4) screen = 'TAURUS → LEO'
    else if (t < T.unveil[0]) screen = 'LEO → TAURUS'
    else if (t < T.whipA[0]) screen = 'LEO → TAURUS'
    else if (t < T.alarm[0]) { screen = 'TRANSLATING…'; blink = true }
    else if (t < T.rip) { screen = 'TRANSLAT—'; blink = true; alarm = 1 }
    else if (t < T.lightOff) screen = 'JUST ASK'
    else if (t >= T.sign[0]) screen = ''
    return { oy, on, screen, blink, alarm }
  }
  function drawBoothAll(t) {
    const B = boothState(t)
    if (!B) return
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const dim = t >= T.lesson && t < T.lessonOut[1] ? 1 : 1
    x.save(); x.globalAlpha = ok * dim
    const sh = shakeAt(t)
    x.translate(sh[0] * 0.4, B.oy + sh[1] * 0.4)
    drawBooth(x, BOOTH.x, BOOTH.y, BOOTH.w, BOOTH.h, t, { ...B, back: true, front: false })
    // Gemini
    const [gx0, gy0, gs] = GEM_AT
    const st = moodAt('gem', t)
    const r = drawStarChar(x, gx0, gy0 + st.dy, gs, t, { color: GEM.color, glyph: null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq, hops: HOPS.gem, seed: SEED.gem, glow: 0.8, bob: gs * 0.03 })
    // headphones: on (swapped in a panic in the montage), ripped off at the turn
    if (t < T.rip + 0.8) {
      let col = HEADSET[0], lift = 0, rot = 0, a = 1, dx = 0
      if (t >= T.whipA[0] + 0.5 && t < T.rip) {
        const ph = (t - T.whipA[0] - 0.5) / 0.55, i = Math.floor(ph), f = ph - i
        col = HEADSET[(i + 1) % HEADSET.length]; lift = Math.sin(clamp(f / 0.45) * Math.PI) * 34
      }
      if (t >= T.rip) { const k = prog(t, T.rip, T.rip + 0.75); lift = ease.outQuad(k) * 420; dx = ease.outQuad(k) * 260; rot = k * 5; a = 1 - prog(k, 0.6, 1) }
      x.save(); x.translate(dx, 0); drawHeadphones(x, r.x, r.y, r.size, { col, lift, rot, alpha: a }); x.restore()
    }
    // sweat in the montage
    if (t >= T.whipA[0] + 0.3 && t < T.rip) {
      for (let k = 0; k < 2; k++) { const a = ((t * 1.3 + k * 0.5) % 1); x.save(); x.globalAlpha = 1 - a; drawSweat(x, r.x + (k ? 1 : -1) * gs * 0.36, r.y - gs * 0.24 + a * 70, 5); x.restore() }
    }
    drawDeskMic(x, 612, BOOTH.y + BOOTH.h - 76, 5)
    drawBooth(x, BOOTH.x, BOOTH.y, BOOTH.w, BOOTH.h, t, { ...B, back: false, front: true })
    // the CLOSED sign swings on at the end
    if (t >= T.sign[0]) {
      const k = easeOutBack(prog(t, ...T.sign), 2.2), sw = Math.sin((t - T.sign[0]) * 6) * 0.12 * Math.exp(-(t - T.sign[0]) * 2.2)
      x.save(); x.translate(540, BOOTH.y + 40); x.rotate(sw); x.scale(k, k)
      x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(-70, 0); x.lineTo(0, -34); x.lineTo(70, 0); x.stroke()
      x.fillStyle = '#1a1030'; x.fillRect(-154, -4, 308, 104)
      x.fillStyle = '#fbf3e2'; x.fillRect(-148, 2, 296, 92)
      x.fillStyle = '#e8455e'; x.font = `800 50px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CLOSED', 0, 38)
      x.fillStyle = '#2a1846'; x.font = `700 18px ${MONO}`; x.fillText("(THEY'RE FLUENT)", 0, 76)
      x.restore()
    }
    x.restore()
    // the ON AIR click
    if (t >= T.lightOff && t < T.lightOff + 0.5) sparkleRing(t, BOOTH.x + BOOTH.w - 34, BOOTH.y - 12, T.lightOff, 6, 60, 0.3, 0.4)
  }

  // ── the talk card + the answers (screen space)
  const TC_TABLE = [560, 1180], ANS = { tau: [300, 862], leo: [780, 862] }
  function drawCards(t) {
    if (t >= T.card[0] && t < T.cut3) {
      const p = prog(t, ...T.card), e = easeOutBack(p, 1.5)
      const ins = ease.inOutCubic(prog(t, ...T.ins)) * (1 - ease.inOutCubic(prog(t, ...T.insOut)))
      let cx = lerp(540, TC_TABLE[0], e), cy = lerp(-400, TC_TABLE[1], e), w = 110, rot = lerp(-1.2, -0.05, ease.outCubic(p))
      if (ins > 0) {
        x.fillStyle = `rgba(6,4,16,${0.55 * ins})`; x.fillRect(0, 0, W, 1920)
        cx = lerp(cx, 540, ins); cy = lerp(cy, 960, ins); w = lerp(w, 430, ins); rot = lerp(rot, 0, ins)
      }
      drawTalkCard(x, cx, cy, w, { rot, glow: ins })
      if (ins > 0.3 && ins < 1) sparkleRing(t, cx, cy, T.ins[0] + 0.2, 10, 320, 2)
      // the answers: dealt face-down, then flipped
      const flipCol = { tau: TAU.color, leo: LEO.color }
      ;[['tau', T.playA, -1, 0, ['Make me', 'something.']], ['leo', T.playB, 1, 0.12, ['Tell me.', 'Out loud.']]].forEach(([id, tp, d, off, lines]) => {
        if (t < tp) return
        const q = prog(t, tp, tp + 0.32), e2 = ease.outBack(q)
        const [ax, ay] = ANS[id]
        const f = prog(t, T.flip + off, T.flip + off + 0.22), sx = Math.cos(f * Math.PI)
        const cx2 = lerp(ax + d * 460, ax, e2), rot2 = d * 0.06 + (1 - e2) * d * 0.4
        drawAnswer(x, cx2, ay, 236, { rot: rot2, sx: Math.abs(sx), back: sx > 0, who: NAME[id], lines, col: flipCol[id], stamp: prog(t, T.flip + off + 0.35, T.flip + off + 0.6) })
        if (f > 0.5 && f < 1) sparkleRing(t, cx2, ay, T.flip + off + 0.1, 8, 180, 1 + d)
      })
    }
    // the tie-in: the talk card again, two answers face-down beside it (hidden till you both play)
    if (t >= T.deal[0] && t < T.h7Out[1] + 0.05) {
      const k = outK(t, [T.h7Out[0] - 0.1, T.h7Out[1]])
      const e = easeOutBack(prog(t, ...T.deal), 1.6)
      x.save(); x.globalAlpha = k
      x.fillStyle = `rgba(6,4,16,${0.45 * clamp(prog(t, T.deal[0], T.deal[0] + 0.3))})`; x.fillRect(0, 0, W, 1920)
      drawTalkCard(x, 540, lerp(1500, 930, e), 360, { rot: -0.03, glow: 0.6 })
      ;[[-1, 0.12], [1, 0.22]].forEach(([d, off]) => {
        const q = ease.outBack(prog(t, T.deal[0] + off + 0.2, T.deal[0] + off + 0.55))
        const wob = Math.sin(t * 5 + d) * 0.02
        drawAnswer(x, lerp(540, 540 + d * 330, q), 1060 + (1 - q) * 120, 190, { rot: d * 0.12 + wob, back: true })
        if (q > 0.6) {
          // a little padlock on each: hidden till you both play
          x.save(); x.translate(540 + d * 330, 1060 - 150); x.fillStyle = '#1a1030'; x.fillRect(-26, -6, 52, 44); x.fillStyle = GOLD; x.fillRect(-22, -2, 44, 36)
          x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.arc(0, -8, 14, Math.PI, 0); x.stroke(); x.fillStyle = '#1a1030'; x.fillRect(-4, 8, 8, 14); x.restore()
        }
      })
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t)
        const ok = outAllAt(t)
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        drawDate(t, ok)
        drawVignetteA(t)
        drawVignetteB(t)
        x.restore()
        drawBoothAll(t)
        drawCards(t)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      box1.update(t); box2.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change). The default selection keeps 10.5 (misfire → booth), 24.45 (→ the montage),
// 38.7 (the answers → the payoff) and 49.45 (the lesson → talk cards); the others play as the film's own whips/pops.
export const CUTS = [4.42, T.cut1, 16.7, T.cut2, T.whipB[0] + 0.15, T.whipH[0] + 0.15, T.cut3, 44.95, T.cut4, 52.7]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. Pitched SFX (pop, pluck, bell) are shifted into the score's key by the engine; chip/lead/snare/tom cues sit
//    on a private 'sfx' bus and are written straight in G major.
const NOTE = [587.33, 659.25, 739.99, 783.99, 880, 987.77, 1174.66]
const G = { G3: 196, B3: 246.94, D4: 293.66, E4: 329.63, G4: 392, A4: 440, B4: 493.88, D5: 587.33, G5: 783.99, B5: 987.77, D6: 1174.66, G6: 1567.98 }
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const scratch = t => [['whoosh', t + 0.06, 0.12, 0.2], ['whoosh', t + 0.2, 0.16, 0.24], ['tick', t, 0.08], ['tick', t + 0.13, 0.06]]
const crickets = t => Array.from({ length: 4 }, (_, i) => ['pop', +(t + i * 0.035).toFixed(3), 3520, 0.012, 0.5])
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const snareRoll = (t0, t1) => { const out = []; for (let t = t0; t < t1; t += 0.045) out.push(['snare', +t.toFixed(3), { ...FX, gain: 0.05 + 0.1 * ((t - t0) / (t1 - t0)), decay: 0.07, tone: 200 }]); return out }
const womp = t => [['chip', t, G.D4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.045, decay: 0.2, sustain: 0.8 }], ['chip', t + 0.34, G.B3 * 1.06, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.045, decay: 0.3, sustain: 0.8 }]]
const sigh = t => [['chip', t, G.B4, 0.6, { ...FX, wave: 'tri', slide: -7, gain: 0.03, decay: 0.3, sustain: 0.6 }], ['chip', t + 0.02, G.G4, 0.6, { ...FX, wave: 'tri', slide: -7, gain: 0.025, decay: 0.3, sustain: 0.6 }]]
const chomp = t => [['tom', t, 120, { ...FX, gain: 0.2, decay: 0.12 }], ['tick', t, 0.09], ['tick', t + 0.07, 0.05]]
const ding = (t, f = G.G6) => [['chip', t, f, 0.18, { ...FX, wave: 'square', duty: 0.25, gain: 0.03, decay: 0.12, sustain: 0.4 }]]
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.04, f0: 900, f1: 2600 }]]; for (let k = 0; k < 12; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const beeps = (t0, t1) => { const out = []; for (let t = t0, i = 0; t < t1; t += 0.22, i++) out.push(['chip', +t.toFixed(3), i % 2 ? 1760 : 1318.5, 0.1, { ...FX, wave: 'square', duty: 0.5, gain: 0.018, decay: 0.05, sustain: 0.6 }]); return out }

const PITCH = { [NAME.tau]: 620, [NAME.leo]: 1180, [NAME.gem]: 960, [NAME.lib]: 1240, [NAME.vir]: 1050 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · the hook
  ...head(T.h0, 4, T.h0Land, 0),
  ...sigh(T.sigh), ...crickets(T.crick0), ...crickets(T.crick0 + 0.3),
  // misfire 1
  ...head(T.h1, 1, T.h1Land, 2),
  ['whoosh', T.slide[0] + 0.1, 0.35, 0.05], ['pop', T.slide[1], 523.25, 0.04, 0.2], ['tick', T.slide[1], 0.06],
  ['pop', T.take, 392, 0.045, 0], ['tick', T.take, 0.08], ...womp(T.wilt),
  // the booth
  ['whoosh', T.booth[0], 0.4, 0.08], ['boom', T.booth[1], 0.1], ['tick', T.booth[1], 0.09], ...ding(T.booth[1] + 0.12), ...ding(T.booth[1] + 0.3, G.D6),
  ...head(T.h2, 1, T.h2Land, 4),
  ['pop', T.roll1 + 0.05, 440, 0.03, -0.2], ['pop', T.roll1 + 0.1, 494, 0.03, 0.2],
  // misfire 2
  ...head(T.h3, 1, T.h3Land, 1),
  ...snareRoll(T.drum[0], T.drum[1]), ['boom', T.unveil[0], 0.1], ['bell', T.unveil[0] + 0.02, 1174.66, 0.04, 1.4, 0.3], ['glitter', T.unveil[0], T.unveil[1] + 0.3], ...cheers(T.unveil[0] + 0.05, T.unveil[0] + 1.3),
  ['whoosh', T.nibble[0], 0.25, 0.05], ...chomp(T.chomp1), ...chomp(T.chomp1 + 0.25),
  // crossed wires
  ['whoosh', T.whipA[0] + 0.1, 0.35, 0.07], ...head(T.h4, 1, T.h4Land, 3),
  ...Array.from({ length: 4 }, (_, k) => ['tick', +(24.6 + 0.85 * (k + 1)).toFixed(3), 0.05]),
  ...Array.from({ length: 4 }, (_, k) => ['pop', +(24.85 + k * 0.62).toFixed(3), 880, 0.015, 0.3]),
  ['pluck', T.offer + 0.05, 987.77, 0.03, 0.4, -0.3],
  ['whoosh', T.whipB[0] + 0.1, 0.35, 0.07],
  ['whoosh', T.lunge[0], 0.3, 0.06], ['boom', T.flop, 0.12], ['tom', T.flop, 70, { ...FX, gain: 0.25, decay: 0.25 }], ['tick', T.flop, 0.08],
  ['pop', T.swap[0] + 0.1, 1567.98, 0.025, 0.4], ['pop', T.swap[1], 1760, 0.025, 0.4], ['tick', T.swap[1], 0.05],
  ...Array.from({ length: 11 }, (_, k) => ['tick', +(T.whipA[0] + 0.5 + k * 0.55).toFixed(3), 0.03]),
  ...beeps(T.alarm[0], T.alarm[1]),
  // the turn
  ['whoosh', T.whipH[0] + 0.1, 0.35, 0.07],
  ...scratch(T.rip), ['tapeStop', T.rip, 1.2], ['whoosh', T.rip + 0.05, 0.4, 0.06],
  ...head(T.h5, 3, T.h5Land, 0),
  ...crickets(T.crick1), ...crickets(T.crick1 + 0.3), ...crickets(T.crick1 + 0.6),
  ['whoosh', T.card[0], 0.35, 0.06], ['bell', T.ins[1], 1567.98, 0.035, 1.6, 0], ['glitter', T.ins[0] + 0.1, T.ins[1] + 0.6],
  ['tick', T.playA + 0.25, 0.07], ['pop', T.playA + 0.27, 659.25, 0.03, -0.3], ['tick', T.playB + 0.25, 0.07], ['pop', T.playB + 0.27, 783.99, 0.03, 0.3],
  ['pluck', T.flip + 0.1, 1174.66, 0.035, 0.5, -0.3], ['pluck', T.flip + 0.22, 1567.98, 0.035, 0.5, 0.3],
  // the payoff
  ...head(T.h6, 1, T.h6Land, 2),
  ['pluck', T.melt, 1567.98, 0.04, 0.8, 0.2], ['glitter', T.melt, T.melt + 0.8], ['pop', T.melt + 0.35, 1174.66, 0.03, 0.2],
  ['whoosh', T.push[0], 0.25, 0.04], ...chomp(T.bite1), ...chomp(T.bite2),
  ...sob(T.wail, G.D6), ...sob(T.wail + 0.55, G.B5), ...sob(T.wail + 1.1, G.D6, 2),
  ['tick', T.lightOff, 0.1], ['pop', T.lightOff + 0.02, 196, 0.04, 0.3],
  // the lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'G' }),
  // talk cards
  ...head(T.h7, 1, T.h7Land, 4),
  ['whoosh', T.deal[0] + 0.05, 0.35, 0.06], ['tick', T.deal[0] + 0.32, 0.06], ['tick', T.deal[0] + 0.42, 0.06], ['bell', T.deal[1], 1174.66, 0.03, 1.2, 0],
  // booth closed
  ...head(T.h8, 1, T.h8Land, 2),
  ['tick', T.sign[0] + 0.2, 0.08], ['pluck', T.sign[0] + 0.25, 783.99, 0.035, 0.5, 0],
  ['pop', T.lean[1], 987.77, 0.035, 0], ['bell', T.lean[1] + 0.05, 1567.98, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES1, { cps: CPS, pitch: PITCH }), ...talkCues(LINES2, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export { LESSON }
