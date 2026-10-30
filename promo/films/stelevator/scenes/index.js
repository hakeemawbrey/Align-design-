// stelevator — "Stuck." (60 s vertical Align ad, Star Talk "Wild Lessons" #23, music: jazzy, Eb). Two stars, one elevator.
// Story 0–55.6, then the shared end card.
//   0.00–4.4    "Two stars. | One *elevator.*"  A glass elevator climbs a shaft in the night sky (floor beams scroll past,
//               the LED counts 9, 10, 11). The doors shut on ♍ Virgo (your star) and ♑ Capricorn (its crush). CAPRICORN:
//               "going up?" VIRGO: "…yep." They take turns sneaking looks. Muzak notes drift from the ceiling speaker
//               ("NOW PLAYING: sad pan flute"); ♓ Pisces is in the back corner, already sobbing.
//   4.49        THUNK (drop): the car jolts, the lights flicker, the counter freezes on 12.  "Floor 12. | *Stuck.*"
//               Virgo hops to the panel and slams the red ALARM… and the muzak gets LOUDER ("VOLUME: MAX").
//               VIRGO: "that's the alarm?"  Pisces: "(it's the pan flute)".
//  10.0        card cut (flip)
//  10.1–23.1   Small talk, three rounds, a STUCK timer ticking (4 MIN · 19 MIN · 41 MIN):
//               "so… crazy weather, huh?" / "we're in space." · "nice… buttons." / "thanks. they came with it." · then
//               nothing at all. "Small talk: | *depleted.*" Both stare at the counter, glance, look away. Pisces: HONK.
//  23.35       card cut (deal)
//  23.45–27.6  "Both waiting for | the *perfect* moment."  Thought bubbles with laminated plans. VIRGO: "confess on the
//               ROOF · at SUNSET, 7:42 PM · with a VIOLIN". CAPRICORN: "when it's PERFECT · ETA: Q3 (maybe Q4)".
//  28.38       CLICK (breakdown): the lights die, the muzak tape-stops, a red emergency lamp pulses; only the stars glow.
//               "*Click.*"  "No music. | No *exit.*"  VIRGO: "…can I say something weird?" CAPRICORN: "only if I can
//               say one too."
//  34.0–41.6   "Real talk. | *No* violin."  VIRGO: "I like you. like, a lot." (lift 35.6: the lights come back pink and
//               the muzak SWELLS, hearts out of the speaker) CAPRICORN: "I spilled that coffee on purpose." VIRGO: "…I knew
//               it." They drift together. "Key *change.*" Pisces is a fountain.
//  41.95       card cut (shuffle) over the counter racing 13…40
//  42.27       DING (hit): ROOF. The doors open on a sunset, string lights, a banner (THE PERFECT MOMENT · 7:42 PM) and
//               ♉ Taurus on violin. Both: "…wait."  "…*wait.*"  Virgo hops back to the panel and presses CLOSE. The doors
//               shut on Taurus mid-note (boing).
//  45.6–50.3   ★ LESSON UNLOCKED: "Stop waiting for | the perfect moment. | *This* is it."  +1 NOW
//  50.4        card cut (flip)
//  50.5–53.4   "Card first. | Face *last.*"  A veiled mystery card: "LIKES YOU. A LOT." · "SPILLS COFFEE" · "(ON PURPOSE)".
//               VIRGO: "say the real stuff first."
//  53.5–55.45  "Going *up.*"  The car shoots up past the roof into the stars, the counter reads ▲ SKY, hearts; Pisces sobs.
// One canvas (sky + shaft + car + cast + props), DOM type, dialogue boxes and the shared lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  INK, starFrame, inSprite, cellToWorld, tearsCells, confetti, sparkBurst, drawHearts, sweatDrop,
  CAR, drawShaft, drawCables, drawRoof, drawCar, drawFrame, drawFloorDisplay, drawButtons, drawDoors, drawNotes, drawChip,
  drawPlan, drawViolin, drawBanner, drawMysteryCard, speedLines,
} from './props.js'

export const DURATION = 60
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', MINT = '#7dffb0', RED = '#ff5c5c'
const MONO = "'Space Mono', ui-monospace, monospace"
const BL = 60 / 108
const B = n => +(0.6 + n * BL).toFixed(3)     // the 108 bpm grid
const VIR = signStar('virgo'), CAP = signStar('capricorn'), PIS = signStar('pisces'), TAU_ = signStar('taurus')
const V_COL = '#ff8fb8', C_COL = '#6ff0c4', BOTH_COL = '#ffd27a'
const V_TAG = `${VIR.glyph}︎ VIRGO`, C_TAG = `${CAP.glyph}︎ CAPRICORN`, BOTH_TAG = `${VIR.glyph}︎ + ${CAP.glyph}︎ BOTH`

// ── the timeline
export const T = {
  black: [0, 0.3],
  // 0 · hook
  doorsShut: [0.3, 0.8], h0: 0.15, h0Land: 0.6, h0Out: [4.25, 4.42], openA: 0.7, l0: 0.9, l1: 2.75, closeA: 4.45,
  // 1 · stuck
  thunk: B(7), h1: 4.62, h1Land: 4.95, h1Out: [9.66, 9.84], toPanel: [6.15, 6.55], alarm: 6.75, fromPanel: [8.75, 9.2],
  openB: 7.2, l2: 7.4, pisLabel: [8.2, 9.75], closeB: 9.7,
  cut1: 10.0,
  // 2 · small talk
  h2: 10.12, h2Land: 10.42, h2Out: [15.3, 15.45], openC: 10.2, l3: 10.4, l4: 13.15,
  h3: 15.52, h3Land: 15.8, h3Out: [20.3, 20.45], l5: 15.6, l6: 17.95, closeC: 20.65,
  timer: [10.3, 15.5, 20.55, 23.05],
  h4: 20.55, h4Land: 20.85, h4Out: [22.9, 23.05], glance: [21.15, 21.7], honk: 22.15,
  cut2: 23.35,
  // 3 · the plans
  h5: 23.45, h5Land: 23.85, h5Out: [27.4, 27.55], planV: 23.75, planC: 24.55, planOut: [27.25, 27.55],
  // 4 · lights out
  out1: B(50), h6: 28.45, h6Out: [29.75, 29.9], openD: 28.8, l7: 29.0, h7: 30.0, h7Land: 30.3, h7Out: [33.7, 33.85], l8: 31.5,
  // 5 · real talk
  h8: 33.95, h8Land: 34.3, h8Out: [38.3, 38.45], l9: 34.0, swell: B(63), l10: 36.75, h9: 38.5, h9Land: 38.75, h9Out: [41.4, 41.55],
  l11: 39.5, closeD: 41.55, drift: [34.6, 40.6],
  cut3: 41.95,
  // 6 · the roof
  spin: [41.6, B(75)], ding: B(75), doors: [42.35, 42.85], tauIn: 42.45, banner: 42.55,
  h10: 42.55, h10Out: [45.25, 45.42], openE: 42.6, l12: 42.8, toPanel2: [43.55, 43.9], press: 44.0, shut: [44.1, 44.55], boing: 44.55, closeE: 45.0,
  // 7 · lesson
  lesson: B(81), lessonOut: [50.1, 50.3],
  cut4: 50.4, lift2: B(89),
  // 8 · card first
  h11: 50.5, h11Land: 50.85, h11Out: [53.27, 53.4], card: [50.55, 53.15, 53.4], openG: 50.62, l13: 50.85, closeG: 53.4,
  // 9 · going up
  h12: 53.5, h12Land: 53.7, h12Out: [55.02, 55.25], launch: 53.45, out: [55.0, 55.42],
}
const BOX_A = [
  { t: T.l0, speaker: C_TAG, color: C_COL, text: 'going *up?*' },
  { t: T.l1, speaker: V_TAG, color: V_COL, text: '…*yep.*' },
]
const BOX_B = [{ t: T.l2, speaker: V_TAG, color: V_COL, text: "that's the *alarm?*" }]
const BOX_C = [
  { t: T.l3, speaker: C_TAG, color: C_COL, text: 'so… crazy weather, *huh?*' },
  { t: T.l4, speaker: V_TAG, color: V_COL, text: "we're in *space.*" },
  { t: T.l5, speaker: V_TAG, color: V_COL, text: 'nice… *buttons.*' },
  { t: T.l6, speaker: C_TAG, color: C_COL, text: 'thanks. they came with *it.*' },
]
const BOX_D = [
  { t: T.l7, speaker: V_TAG, color: V_COL, text: '…can I say something *weird?*' },
  { t: T.l8, speaker: C_TAG, color: C_COL, text: 'only if I can say one *too.*' },
  { t: T.l9, speaker: V_TAG, color: V_COL, text: 'I like you. like, a *lot.*' },
  { t: T.l10, speaker: C_TAG, color: C_COL, text: 'I spilled that coffee *on purpose.*' },
  { t: T.l11, speaker: V_TAG, color: V_COL, text: '…I *knew* it.' },
]
const BOX_E = [{ t: T.l12, speaker: BOTH_TAG, color: BOTH_COL, text: '…*wait.*' }]
const BOX_G = [{ t: T.l13, speaker: V_TAG, color: V_COL, text: 'say the real stuff *first.*' }]
const BOXES = [[BOX_A, T.openA, T.closeA], [BOX_B, T.openB, T.closeB], [BOX_C, T.openC, T.closeC], [BOX_D, T.openD, T.closeD], [BOX_E, T.openE, T.closeE], [BOX_G, T.openG, T.closeG]]
export const ALL_BOXES = BOXES
const ALL_LINES = BOXES.flatMap(b => b[0])
const CPS = 28
const LT = new Map(BOXES.map(([L]) => [L, lineTimes(L, { cps: CPS })]))
const doneOf = (L, i) => LT.get(L)[i].done
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Stop waiting for | the perfect moment. | *This* is it.', chip: '+1 NOW' }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── state over time
const staged = t => t >= T.cut4                                  // the last beats re-stage under the flip cut
const isDark = t => t >= T.out1 && t < T.swell
const roofK = t => (t >= T.ding - 0.05 && t < T.cut4 ? clamp(prog(t, T.ding - 0.05, T.ding + 0.15)) : 0)
/** the shaft scroll (px): pure, piecewise — climbing, stuck, the race to the roof, the launch */
function scrollAt(t) {
  const v0 = 330
  let s = v0 * Math.min(t, T.thunk)
  if (t > T.thunk) s += v0 * 0.08 * Math.min(1, (t - T.thunk) / 0.1)   // the jolt overshoot
  if (t > T.spin[0]) { const d = Math.min(t, T.spin[1]) - T.spin[0]; s += 2200 * d * d / (T.spin[1] - T.spin[0]) * 0.5 + 900 * d }
  if (t > T.launch) { const d = t - T.launch; s += 400 * d + 1400 * d * d }
  return s
}
function floorText(t) {
  if (t < T.thunk) return { text: String(9 + Math.min(3, Math.floor(t / 1.25))), arrow: 1 }
  if (t < T.out1) return { text: '12', arrow: 0 }
  if (t < T.swell) return { text: '--', arrow: 0 }
  if (t < T.spin[0]) return { text: '12', arrow: 0 }
  if (t < T.ding) return { text: String(Math.min(40, 13 + Math.floor(prog(t, ...T.spin) ** 1.6 * 28))), arrow: 1 }
  if (t < T.launch) return { text: 'ROOF', arrow: 0 }
  return { text: 'SKY', arrow: 1 }
}
function virgoX(t) {
  if (staged(t)) return 410
  let x = 370
  if (t >= T.toPanel[0] && t < T.fromPanel[1]) x = lerp(370, 290, ease.inOutCubic(prog(t, ...T.toPanel))) + 80 * ease.inOutCubic(prog(t, ...T.fromPanel))
  if (t >= T.drift[0]) x = lerp(370, 425, ease.inOutCubic(prog(t, ...T.drift)))
  if (t >= T.toPanel2[0]) x = lerp(425, 292, ease.inOutCubic(prog(t, ...T.toPanel2)))
  return x
}
const capX = t => (staged(t) ? 670 : t >= T.drift[0] ? lerp(700, 640, ease.inOutCubic(prog(t, ...T.drift))) : 700)
const STAR_Y = 1182, STAR_S = 240

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS())]
function CUTS() { return [4.43, { t: T.cut1, kind: 'flip' }, 15.48, { t: T.cut2, kind: 'deal' }, 29.95, { t: T.cut3, kind: 'shuffle' }, 45.5, { t: T.cut4, kind: 'flip' }, 53.45] }

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "900 200px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 146, wobble: true, late: 1, ...o })
  const HEADS = [
    [H('Two stars. | One *elevator.*', { top: 128, at: T.h0, lateAt: T.h0Land, accentColor: PINK, accentSize: 134 }), T.h0Out],
    [H('Floor 12. | *Stuck.*', { top: 128, at: T.h1, lateAt: T.h1Land, accentColor: RED }), T.h1Out],
    [H('Small talk, | round *one.*', { top: 128, at: T.h2, lateAt: T.h2Land, accentColor: GOLD }), T.h2Out],
    [H('Round *two.*', { top: 150, size: 110, accentSize: 160, at: T.h3, lateAt: T.h3Land, accentColor: GOLD }), T.h3Out],
    [H('Small talk: | *depleted.*', { top: 128, at: T.h4, lateAt: T.h4Land, accentColor: '#9fd8ff' }), T.h4Out],
    [H('Both waiting for | the *perfect* moment.', { top: 128, size: 88, accentSize: 128, at: T.h5, late: 2, lateAt: T.h5Land, accentColor: PINK }), T.h5Out],
    [H('*Click.*', { top: 150, size: 120, accentSize: 210, at: T.h6, lateAt: T.h6, accentColor: RED }), T.h6Out],
    [H('No music. | *No exit.*', { top: 128, at: T.h7, lateAt: T.h7Land, accentColor: RED, late: 2 }), T.h7Out],
    [H('Real talk. | *No* violin.', { top: 128, at: T.h8, late: 2, lateAt: T.h8Land, accentColor: PINK }), T.h8Out],
    [H('Key *change.*', { top: 150, size: 116, accentSize: 170, at: T.h9, lateAt: T.h9Land, accentColor: GOLD }), T.h9Out],
    [H('…*wait.*', { top: 150, size: 120, accentSize: 210, at: T.h10, lateAt: T.h10, accentColor: BOTH_COL }), T.h10Out],
    [H('Card first. | Face *last.*', { top: 128, at: T.h11, lateAt: T.h11Land, accentColor: GOLD }), T.h11Out],
    [H('Going *up.*', { top: 150, size: 120, accentSize: 190, at: T.h12, lateAt: T.h12Land, accentColor: PINK }), T.h12Out],
  ]
  const BOX = { y: 1450, width: 960, height: 270, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── hops
  const V_HOPS = [...talkHops(ALL_LINES, V_TAG, { cps: CPS }), ...talkHops(ALL_LINES, BOTH_TAG, { cps: CPS }), T.toPanel[1], T.alarm, T.honk, T.swell, T.toPanel2[1], T.press, T.lesson + 0.1, T.h12Land]
  const C_HOPS = [...talkHops(ALL_LINES, C_TAG, { cps: CPS }), ...talkHops(ALL_LINES, BOTH_TAG, { cps: CPS }), T.honk, T.swell, doneOf(BOX_D, 4) + 0.1, T.lesson + 0.15, T.h12Land + 0.1]
  const P_HOPS = [T.honk, T.swell + 0.1, T.ding + 0.1, T.h12Land + 0.15]

  // ── moods
  // the hook: classic sneaking looks — one looks while the other looks away
  const sneak = (t, off) => (Math.floor((t - 0.9 + off) / 0.9) % 2 === 0)
  function virgoState(t) {
    const st = { mood: 'neutral', look: [0, 0], squash: 0, sweat: 0 }
    if (t < T.thunk) { const l = sneak(t, 0); st.mood = l ? 'sparkle' : 'happy'; st.look = l ? [1, 0] : [0, 0] }
    else if (t < T.toPanel[0]) { st.mood = 'wide'; st.look = [0, -1]; st.squash = 0.14 * bump(t, T.thunk, 0.35) }
    else if (t < T.alarm) { st.mood = 'squint'; st.look = [-1, 0] }
    else if (t < T.fromPanel[1]) { st.mood = t < T.alarm + 0.5 ? 'wide' : 'squint'; st.look = t < T.l2 ? [0, -1] : [0, 0]; st.squash = 0.12 * bump(t, T.alarm, 0.3) }
    else if (t < T.l4) { st.mood = 'neutral'; st.look = [1, 0] }
    else if (t < T.l5) { st.mood = 'squint'; st.look = [1, 0] }
    else if (t < T.l6) { st.mood = 'happy'; st.look = [1, 0]; st.sweat = 1 }
    else if (t < T.h4) { st.mood = 'neutral'; st.look = [1, 0]; st.sweat = 1 }
    else if (t < T.honk) { st.mood = 'neutral'; st.look = inR(t, T.glance[0], T.glance[1]) ? [1, 0] : [0, -1]; st.sweat = 1 }
    else if (t < T.cut2) { st.mood = 'wide'; st.look = [1, 0]; st.squash = 0.12 * bump(t, T.honk, 0.3) }
    else if (t < T.out1) { st.mood = 'sparkle'; st.look = [0, -1] }
    else if (t < T.l7) { st.mood = 'wide'; st.look = [0, 0]; st.squash = 0.12 * bump(t, T.out1, 0.3) }
    else if (t < T.l9) { st.mood = t < T.l8 ? 'neutral' : 'wide'; st.look = [1, 0] }
    else if (t < T.swell) { st.mood = 'sparkle'; st.look = [1, 0] }
    else if (t < T.l10) { st.mood = 'heart'; st.look = [1, 0] }
    else if (t < T.l11) { st.mood = t < doneOf(BOX_D, 3) ? 'heart' : 'wide'; st.look = [1, 0] }
    else if (t < T.spin[0]) { st.mood = t < doneOf(BOX_D, 4) + 0.2 ? 'squint' : 'heart'; st.look = [1, 0] }
    else if (t < T.l12) { st.mood = 'wide'; st.look = [0, 0] }
    else if (t < T.toPanel2[0]) { st.mood = 'neutral'; st.look = t < doneOf(BOX_E, 0) + 0.3 ? [0, 0] : [1, 0] }
    else if (t < T.lesson) { st.mood = t < T.press ? 'squint' : 'wink'; st.look = [-1, 0] }
    else st.mood = t >= T.h12 ? 'heart' : 'happy'
    return st
  }
  function capState(t) {
    const st = { mood: 'neutral', look: [0, 0], squash: 0, sweat: 0 }
    if (t < T.thunk) { const l = sneak(t, 0.9); st.mood = l ? 'sparkle' : 'neutral'; st.look = l ? [-1, 0] : [0, 0] }
    else if (t < T.alarm) { st.mood = 'wide'; st.look = [0, -1]; st.squash = 0.14 * bump(t, T.thunk, 0.35) }
    else if (t < T.cut1) { st.mood = t < T.alarm + 0.5 ? 'wide' : 'squint'; st.look = [-1, 0] }
    else if (t < T.l4) { st.mood = 'happy'; st.look = [-1, 0] }
    else if (t < T.l6) { st.mood = t < doneOf(BOX_C, 1) ? 'happy' : 'neutral'; st.look = [-1, 0]; st.sweat = t > doneOf(BOX_C, 1) ? 1 : 0 }
    else if (t < T.h4) { st.mood = 'happy'; st.look = [-1, 0]; st.sweat = 1 }
    else if (t < T.honk) { st.mood = 'neutral'; st.look = inR(t, T.glance[0] + 0.15, T.glance[1] + 0.1) ? [-1, 0] : [0, -1]; st.sweat = 1 }
    else if (t < T.cut2) { st.mood = 'wide'; st.look = [-1, 0]; st.squash = 0.12 * bump(t, T.honk, 0.3) }
    else if (t < T.out1) { st.mood = 'sparkle'; st.look = [0, -1] }
    else if (t < T.l8) { st.mood = 'wide'; st.look = t < T.l7 ? [0, 0] : [-1, 0]; st.squash = 0.12 * bump(t, T.out1, 0.3) }
    else if (t < T.l9) { st.mood = 'neutral'; st.look = [-1, 0] }
    else if (t < T.swell) { st.mood = 'wide'; st.look = [-1, 0] }
    else if (t < T.spin[0]) { st.mood = inR(t, T.l10, doneOf(BOX_D, 3) + 0.4) ? 'happy' : 'heart'; st.look = [-1, 0] }
    else if (t < T.l12) { st.mood = 'wide'; st.look = [0, 0] }
    else if (t < T.press) { st.mood = 'neutral'; st.look = t < doneOf(BOX_E, 0) + 0.3 ? [0, 0] : [-1, 0] }
    else if (t < T.lesson) { st.mood = 'happy'; st.look = [-1, 0] }
    else st.mood = t >= T.h12 ? 'heart' : 'happy'
    return st
  }

  function drawVirgo(t) {
    const st = virgoState(t), px = virgoX(t)
    const opts = { color: VIR.color, glyph: VIR.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: V_HOPS, seed: 4, bob: 6, glow: 1 }
    drawStarChar(x, px, STAR_Y, STAR_S, t, opts)
    const F = starFrame(px, STAR_Y, STAR_S, t, opts)
    if (st.sweat) { const [sx, sy] = cellToWorld(F, 30, 8); sweatDrop(x, t, sx, sy, 5) }
    return F
  }
  function drawCap(t) {
    const st = capState(t), px = capX(t)
    const opts = { color: CAP.color, glyph: CAP.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: C_HOPS, seed: 9, bob: 5, glow: 1 }
    drawStarChar(x, px, STAR_Y, STAR_S, t, opts)
    const F = starFrame(px, STAR_Y, STAR_S, t, opts)
    if (st.sweat) { const [sx, sy] = cellToWorld(F, 6, 8); sweatDrop(x, t, sx, sy, 5) }
    return F
  }
  function drawPisces(t) {
    const px = 858, py = 1166, s = 118
    let tears = 2, mood = 'sparkle', look = [-1, 0]
    if (inR(t, T.swell, T.spin[0]) || t >= T.h12) tears = 3
    if (inR(t, T.honk - 0.1, T.honk + 0.5)) { mood = 'squint'; tears = 1 }
    if (inR(t, T.ding, T.lesson)) look = [1, 0]
    const opts = { color: PIS.color, glyph: null, mood, look, hops: P_HOPS, seed: 19, bob: 3, glow: 0.8, squash: 0.2 * bump(t, T.honk, 0.3) }
    drawStarChar(x, px, py, s, t, opts)
    const F = starFrame(px, py, s, t, opts)
    inSprite(x, F, () => tearsCells(x, t, tears))
  }
  function drawTaurus(t) {
    if (t < T.tauIn || t >= T.cut4) return
    const k = pop01(t, T.tauIn, 0.35, 2.2)
    const shut = t >= T.boing
    const opts = { color: TAU_.color, glyph: TAU_.glyph, mood: shut ? 'neutral' : 'happy', look: shut ? [0, 0] : [-1, 0], pop: k, hops: [T.tauIn + 0.3], seed: 7, bob: 4, glow: 0.9, squash: 0.18 * bump(t, T.boing, 0.35) }
    const tx = 905, ty = 1292, s = 190
    drawStarChar(x, tx, ty, s, t, opts)
    const F = starFrame(tx, ty, s, t, opts)
    const [vx, vy] = cellToWorld(F, 10, 14)
    drawViolin(x, t, vx, vy, 6 * k, { bow: shut ? 0 : t * 9, rot: shut ? -0.2 : -0.5 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = popOut(t, T.out)
        const shake = inR(t, T.thunk, T.thunk + 0.55) ? Math.sin((t - T.thunk) * 70) * 16 * (1 - prog(t, T.thunk, T.thunk + 0.55)) : 0
        const shake2 = t >= T.launch ? Math.sin(t * 90) * 3 * clamp(prog(t, T.launch, T.launch + 0.3)) : 0
        x.save(); x.globalAlpha = clamp(o); x.translate(540, 1000); x.scale(lerp(0.85, 1, clamp(o)), lerp(0.85, 1, clamp(o))); x.translate(-540, -1000 + shake + shake2)
        const sc = scrollAt(t)
        const launched = t >= T.launch
        const rk = roofK(t)
        // outside: the shaft (or, after the launch, open sky and speed lines), the roof at the top
        if (!staged(t)) drawShaft(x, t, { scroll: sc, alpha: 1 - rk, blur: inR(t, T.spin[0], T.ding) ? prog(t, T.spin[0], T.spin[0] + 0.3) : 0 })
        drawRoof(x, t, rk)
        if (staged(t)) speedLines(x, t, launched ? clamp(prog(t, T.launch, T.launch + 0.4)) : 0.25)
        drawCables(x)
        // the car
        const flick = inR(t, T.thunk, T.thunk + 0.5) ? ([1, 0, 1, 0.3, 1, 0][Math.floor((t - T.thunk) / 0.08)] ?? 0) : 0
        const dark = isDark(t) ? clamp(prog(t, T.out1, T.out1 + 0.08)) * (1 - clamp(prog(t, T.swell - 0.1, T.swell + 0.2))) : flick * 0.6
        const red = isDark(t) && t > T.out1 + 0.4 ? 0.6 + 0.4 * Math.sin((t - T.out1) * 4) : 0
        const warm = inR(t, T.swell, T.spin[0]) ? clamp(prog(t, T.swell, T.swell + 0.4)) : t >= T.h12 ? 1 : 0
        drawCar(x, t, { dark, red, warm })
        drawButtons(x, t, { alarm: inR(t, T.alarm, T.alarm + 1.6) ? (Math.floor(t * 8) % 2 ? 1 : 0.6) : 0, close: inR(t, T.press, T.press + 0.9) ? 1 : 0, dark })
        // the muzak
        let nk = 1, big = 0, heart = 0
        if (isDark(t)) nk = 0
        if (inR(t, T.alarm, T.fromPanel[1])) big = clamp(prog(t, T.alarm, T.alarm + 0.3)) * (1 - prog(t, T.fromPanel[0], T.fromPanel[1]))
        if (inR(t, T.swell, T.spin[0])) { heart = 1; big = 0.5 * clamp(prog(t, T.swell, T.swell + 0.5)) }
        if (inR(t, T.ding, T.cut4)) nk = 0
        if (staged(t)) heart = 1
        if (!isDark(t)) drawNotes(x, t, { k: nk, big, heart, y: 590 })
        // the cast
        drawPisces(t)
        drawVirgo(t)
        drawCap(t)
        if (inR(t, T.swell, T.spin[0])) drawHearts(x, t, T.swell + 0.2, 540, 1040, { n: 6, px: 6, spread: 260, life: 1.8, loop: true })
        if (t >= T.h12) drawHearts(x, t, T.h12 + 0.1, 540, 1040, { n: 6, px: 6, spread: 300, life: 1.6, loop: true })
        // the doors + the frame
        let open = 1 - ease.inOutCubic(prog(t, ...T.doorsShut))
        if (t >= T.doors[0] && t < T.shut[0]) open = ease.inOutCubic(prog(t, ...T.doors))
        else if (t >= T.shut[0] && t < T.cut4) open = 1 - ease.inOutCubic(prog(t, ...T.shut))
        drawDoors(x, t, open)
        drawFrame(x, t)
        const ft = floorText(t)
        drawFloorDisplay(x, t, { ...ft, on: isDark(t) ? 0.35 : 1 - 0.7 * flick, col: t >= T.ding && t < T.launch ? MINT : '#ff4b3e' })
        if (t >= T.ding && t < T.ding + 0.6) sparkBurst(x, t, 540, 515, T.ding, { n: 10, R: 190, size: 24, seed: 3 })
        // the emergency lamp
        if (isDark(t)) { const p = 0.5 + 0.5 * Math.sin((t - T.out1) * 4); x.fillStyle = INK; x.fillRect(690, 490, 52, 40); x.fillStyle = `rgba(255,${60 + 40 * p},70,1)`; x.fillRect(696, 496, 40, 28); x.fillStyle = `rgba(255,60,70,${0.3 * p})`; x.beginPath(); x.arc(716, 510, 70, 0, Math.PI * 2); x.fill() }
        // Taurus + the banner at the roof
        drawBanner(x, t, t >= T.banner && t < T.lesson + 0.2 ? pop01(t, T.banner, 0.35, 2) * outK(t, [T.lesson, T.lesson + 0.2]) : 0)
        drawTaurus(t)
        // ── chips + labels
        if (inR(t, 1.3, 4.3)) drawChip(x, 540, 640, 'NOW PLAYING: sad pan flute', { k: pop01(t, 1.3) * outK(t, [4.1, 4.3]), size: 26, bar: '#c9a6ff' })
        if (inR(t, T.alarm + 0.1, T.fromPanel[1])) drawChip(x, 540, 640, 'VOLUME: MAX', { k: pop01(t, T.alarm + 0.1, 0.3, 2.6) * outK(t, [T.fromPanel[1] - 0.2, T.fromPanel[1]]), size: 40, col: RED, bar: RED })
        if (inR(t, T.pisLabel[0], T.pisLabel[1])) drawChip(x, 830, 1010, '(it’s the pan flute)', { k: pop01(t, T.pisLabel[0], 0.3, 2.4) * outK(t, [T.pisLabel[1] - 0.2, T.pisLabel[1]]), size: 26, bar: '#c9a6ff' })
        if (inR(t, T.timer[0], T.timer[3])) {
          const i = t < T.timer[1] ? 0 : t < T.timer[2] ? 1 : 2, t0 = T.timer[i]
          drawChip(x, 540, 640, ['STUCK: 4 MIN', 'STUCK: 19 MIN', 'STUCK: 41 MIN'][i], { k: pop01(t, t0, 0.3, 2.4) * outK(t, [T.timer[3] - 0.2, T.timer[3]]), size: 30, col: RED, bar: RED })
        }
        if (inR(t, T.honk, T.honk + 0.9)) drawChip(x, 830, 1010, 'HONK.', { k: pop01(t, T.honk, 0.2, 3) * outK(t, [T.honk + 0.7, T.honk + 0.9]), size: 40, bar: '#c9a6ff' })
        if (inR(t, T.swell + 0.1, T.spin[0])) drawChip(x, 540, 640, 'MUZAK: SWELLING', { k: pop01(t, T.swell + 0.1, 0.3, 2.4) * outK(t, [T.spin[0] - 0.2, T.spin[0]]), size: 30, col: PINK, bar: PINK })
        if (inR(t, T.press, T.press + 1.4)) drawChip(x, 300, 950, 'CLOSE', { k: pop01(t, T.press, 0.25, 2.6) * outK(t, [T.press + 1.2, T.press + 1.4]), size: 30, col: MINT, bar: MINT })
        if (inR(t, T.boing, T.boing + 0.8)) drawChip(x, 930, 1080, 'boing.', { k: pop01(t, T.boing, 0.2, 3) * outK(t, [T.boing + 0.6, T.boing + 0.8]), size: 28, bar: TAU_.color })
        // ── the plans (thought bubbles)
        if (inR(t, T.planV, T.planOut[1])) {
          const vk = pop01(t, T.planV, 0.35, 2) * outK(t, T.planOut), ck = pop01(t, T.planC, 0.35, 2) * outK(t, T.planOut)
          drawPlan(x, t, { cx: 300, cy: 780, k: vk, hx: virgoX(t) - 20, hy: 1040, title: 'THE PLAN', tag: '(laminated)', col: '#d23f73', rows: ['confess on the ROOF', 'at SUNSET, 7:42 PM', 'with a VIOLIN'] })
          if (t >= T.planC) drawPlan(x, t, { cx: 780, cy: 780, k: ck, hx: capX(t) + 20, hy: 1040, title: 'THE PLAN', tag: '(draft 14)', col: '#1f8f6a', rows: ['tell her when it’s', 'PERFECT', 'ETA: Q3 (maybe Q4)'] })
        }
        // ── the mystery card (card first)
        if (inR(t, T.card[0], T.card[2])) {
          const k = easeOutBack(prog(t, T.card[0], T.card[0] + 0.4), 1.8) * (1 - ease.inCubic(prog(t, T.card[1], T.card[2])))
          x.save(); x.globalAlpha = clamp(k); x.fillStyle = 'rgba(6,4,18,0.6)'; x.fillRect(0, 0, 1080, 1920); x.restore()
          drawMysteryCard(x, 540, 900, 560, 760, t, { k, rot: -0.03 + 0.01 * Math.sin(t * 2), glyph: VIR.glyph, badge: VIR.color, lines: ['LIKES YOU. A LOT.', 'SPILLS COFFEE', '(ON PURPOSE)'] })
          if (t > T.card[0] + 0.4) sparkBurst(x, t, 540, 900, T.card[0] + 0.4, { n: 10, R: 360, size: 26, seed: 5 })
        }
        if (t >= T.swell && t < T.swell + 1.2) confetti(x, t, T.swell, { x0: 540, y0: 640, n: 40, seed: 2, life: 2.4 })
        x.restore()
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// ── sound (pop / pluck / bell are written in D major and the engine moves them into the score's key; chips are written
//    directly in Eb major)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const E = { Eb4: 311.13, F4: 349.23, G4: 392, Ab4: 415.3, Bb4: 466.16, C5: 523.25, D5: 587.33, Eb5: 622.25, F5: 698.46, G5: 783.99, Ab5: 830.61, Bb5: 932.33, C6: 1046.5, Eb6: 1244.51 }
const FX = { rev: 0.06, dly: 0, bus: 'fx' }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chip = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.035, duty: 0.25, decay: 0.08, sustain: 0.6, ...FX, ...o }]
const ding = (t, g = 1) => [['bell', +t.toFixed(3), 1479.98, 0.045 * g, 1.6, 0], ['bell', +(t + 0.22).toFixed(3), 1174.66, 0.045 * g, 2.0, 0]]
const thud = (t, g = 1) => [['boom', +t.toFixed(3), 0.2 * g], ['tom', +t.toFixed(3), 70, { gain: 0.32 * g, decay: 0.35 }], chip(t, 300, 0.18, { wave: 'noise', gain: 0.05 * g, decay: 0.15, sustain: 0 })]
const flute = (t0, notes, len, g = 0.03) => notes.map((f, i) => chip(t0 + i * len, f, len * 0.95, { wave: 'tri', gain: g, vib: 0.04, decay: len, sustain: 0.8 }))
const chirp = (t0, pan) => [0, 0.05, 0.1].map(d => chip(t0 + d, 4400, 0.03, { gain: 0.02, decay: 0.02, sustain: 0.7, pan }))

export const CUES = [
  // 0 · hook
  ['whoosh', T.doorsShut[0], 0.45, 0.04], ['tick', T.doorsShut[1], 0.06], chip(T.doorsShut[1], 140, 0.1, { wave: 'tri', gain: 0.04, decay: 0.08, sustain: 0 }),
  ...head(T.h0, 3, T.h0Land, 0),
  ...[1.25, 2.5, 3.75].map(t => ['bell', t, 2349.3, 0.012, 0.4, 0]),
  // 1 · stuck
  ...thud(T.thunk, 1.3), ['crash', T.thunk, { gain: 0.04, len: 1.2 }],
  ...[0, 1, 3, 4].map(i => chip(T.thunk + i * 0.08, 90, 0.06, { wave: 'noise', gain: 0.025, decay: 0.05, sustain: 0.3 })),
  ...head(T.h1, 2, T.h1Land, 3),
  ['whoosh', T.toPanel[0] + 0.1, 0.3, 0.03], ['tick', T.alarm, 0.07], ['pop', T.alarm, 330, 0.05, -0.4],
  ...flute(T.alarm + 0.05, [E.Bb5, E.G5, E.Eb5, E.F5, E.G5, E.Ab5, E.G5, E.F5, E.Eb5], 0.22, 0.05),
  // 2 · small talk
  ...head(T.h2, 3, T.h2Land, 1), ['pop', T.timer[0], 880, 0.03, 0.2],
  ...head(T.h3, 1, T.h3Land, 2), ['pop', T.timer[1], 880, 0.03, 0.2],
  ...head(T.h4, 2, T.h4Land, 4), ['pop', T.timer[2], 880, 0.03, 0.2],
  ...[0, 1, 2].flatMap(i => chirp(T.h4Land + 0.4 + i * 0.36, [-0.5, 0.5, 0][i])),
  ['tick', T.glance[0], 0.03], ['tick', T.glance[1], 0.03],
  chip(T.honk, 233, 0.32, { duty: 0.5, gain: 0.06, slide: -3, decay: 0.3, sustain: 0.7 }), chip(T.honk + 0.02, 116, 0.3, { duty: 0.25, gain: 0.04, decay: 0.3 }),
  // 3 · the plans
  ...head(T.h5, 3, T.h5Land, 0),
  ['pop', T.planV, 784, 0.04, -0.4], ['bell', T.planV + 0.05, 1567.98, 0.02, 0.8, -0.4], ['pop', T.planC, 659.25, 0.04, 0.4], ['bell', T.planC + 0.05, 1318.51, 0.02, 0.8, 0.4],
  ['whoosh', T.planOut[0], 0.3, 0.03],
  // 4 · lights out
  ['tapeStop', T.out1 - 0.05, 0.4], ['tick', T.out1, 0.09], ...thud(T.out1, 0.5),
  chip(T.out1 + 0.3, 60, T.swell - T.out1 - 0.5, { wave: 'tri', gain: 0.025, decay: 6, sustain: 1, vib: 0.02 }),
  ['pop', T.h6, 1174.66, 0.05, 0], ['pluck', T.h6 + 0.04, 587.33, 0.04, 0.8, 0],
  ...head(T.h7, 2, T.h7Land, 3),
  // 5 · real talk
  ...head(T.h8, 2, T.h8Land, 1),
  ['swell', T.swell - 0.6, T.swell, { gain: 0.06, f0: 600, f1: 6000 }], ['crash', T.swell, { gain: 0.06, len: 2.2 }], ['glitter', T.swell, T.swell + 1.2],
  ...flute(T.swell + 0.1, [E.Eb5, E.G5, E.Bb5, E.Eb6, E.D5 * 2, E.Bb5, E.C6, E.Eb6], 0.3, 0.025),
  ...head(T.h9, 1, T.h9Land, 4), ['bell', T.h9Land, 1760, 0.03, 1.2, 0],
  // 6 · the roof
  ['riser', T.spin[0], T.ding, 0.05], ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.spin[0] + i * 0.065).toFixed(3), 0.03]),
  ...ding(T.ding, 1.2), ['whoosh', T.doors[0], 0.45, 0.04],
  ...flute(T.tauIn + 0.3, [E.G5, E.Bb5, E.Eb6, E.D5 * 2, E.C6, E.Bb5, E.Ab5, E.G5], 0.2, 0.035),
  ['pop', T.h10, 1174.66, 0.05, 0], ['pluck', T.h10 + 0.04, 587.33, 0.04, 0.8, 0],
  ['tick', T.press, 0.07], ['pop', T.press, 988, 0.045, -0.4], ['whoosh', T.shut[0], 0.4, 0.04], ['tick', T.shut[1], 0.06],
  chip(T.boing, E.G5, 0.5, { wave: 'tri', gain: 0.045, slide: -12, vib: 0.3, decay: 0.45 }),
  // 7 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Eb' }),
  // 8 · card first
  ...head(T.h11, 3, T.h11Land, 1), ['whoosh', T.card[0] + 0.15, 0.4, 0.04], ['bell', T.card[0] + 0.4, 1760, 0.03, 1.2, 0], ['whoosh', T.card[1] + 0.15, 0.3, 0.03],
  // 9 · going up
  ...ding(T.launch - 0.1, 0.8), ['riser', T.launch, T.out[1], 0.05], ['whoosh', T.launch + 0.2, 0.8, 0.05],
  ...head(T.h12, 1, T.h12Land, 2), ['bell', T.h12Land + 0.05, 1174.66, 0.03, 1.4, 0],
  // the dialogue + cuts + end card
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [V_TAG]: 880, [C_TAG]: 587.33, [BOTH_TAG]: 739.99 } })),
  ...cardCutCues(CUTS()),
  ...endcardCues(STORY_END),
]
