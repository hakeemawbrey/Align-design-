// stswap — "Sign Swap." (60 s vertical Align ad, Star Talk "Wild Lessons" #12, music: house, E). Freaky Friday.
// Story 0–55.6, then the shared end card.
//   0.00–7.40   "Virgo × Sag. | A *square.*"  ♍ Virgo (pink, reading glasses, clipboard) and ♐ Sag (purple, shades pushed
//               up, passport) float side by side, a red dashed SQUARE line between them (90° apart: the friction aspect).
//               VIRGO: "dinner: 7:00. table 4. backup: table 6."  SAG: "or we just wander till we smell food?" Virgo's eye
//               twitches, steam. Pisces cries in the corner (all film).
//   7.50–13.93  "Then: a | shooting *star.*"  A shooting star crosses the sky; both wish on it, eyes shut.
//               VIRGO: "I wish Sag would just PLAN something."  SAG: "I wish Virgo would just LIVE a little." They doze off.
//  13.93        ZAP. The star swoops back and zaps them in their sleep: white flash, the badges and the held kits (clipboard
//               ↔ passport) fly across, glasses ↔ shades swap, the colours swap. "*ZAP.*"
//  15.55        card cut
//  15.60–21.90  "Next morning: | *wrong sign.*"  The sun comes up, a chiptune rooster. They wake. VIRGO (now ♐, purple):
//               "why do I suddenly own a passport?"  SAG (now ♍, pink): "why do I have opinions about fonts?"
//  21.95–25.15  "Tonight's | *rules.*"  A rules card: ♐ VIRGO → be spontaneous (Virgo faints), ♍ SAG → book a table
//               (Sag faints), and Pisces faints too, in solidarity (the third one, twisted).
//  25.20        card cut
//  25.30–30.00  "Virgo vs. | *spontaneity.*"  VIRGO: "spontaneous thing #1: 6:05. sharp." A SPONTANEITY PLAN card ticks off:
//               6:05 be wild ("wheee…", a hop) · 6:10 be free ("whee.") · 6:12 lie down (faints again: callback).
//  30.10–36.45  "Sag vs. | *a reservation.*"  Ring ring. SAG: "a table for… vibes o'clock?" ☎ THE RESTAURANT: "sir. we
//               need a time." The clock spins, Sag's eyes spin… then the card flips: TABLE 4 · 7:00 ✓ (Virgo's table).
//  36.50        card cut
//  36.55–39.50  "7:00 PM. | The *date.*"  A café table and a candle. Sag is there first: ARRIVED: 6:52 (…early?!). Virgo
//               runs in late, "no plan!!", with a flower it picked on the way, and hands it over. Heart-eyes.
//  39.55–46.15  "Wait. | *Oh.*"  VIRGO: "winging it is SCARY. you do this daily?"  SAG: "and you plan… because you care."
//               They drift together; the square line comes back gold: □ SQUARE ♥. THE NEW PLAN: 7:00 dinner ✓ · then: ??? ✓
//  46.16–50.60  ★ LESSON UNLOCKED: "Spend a day in their *orbit.* | You'll get it."  +1 EMPATHY
//  50.65        card cut
//  50.70–53.00  "Every square | has a *pull.*"  The Push / Pull / Align reading between the two charts (♍ × ♐).
//  53.05–55.43  "Swap back? | …*Maybe Tuesday.*"  The shooting star swings by again ("swap?"); they look up, look at each
//               other, and wink. Everything pops out by 55.43; the end card takes over at 55.6.
// One canvas (sky + cast + props), DOM type, dialogue boxes and the shared lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, drawWheelH, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  INK, rgba, mixHex, starFrame, inSprite, cellToWorld, glassesCells, shadesCells, tearsCells, drawClipboard, drawPassport,
  drawPhone, drawFlower, drawTable, drawSun, drawCoin, shootingStar, pixelPanel, checkMark, confetti, sparkBurst, drawHeart,
  drawHearts, dizzyStars, steamPuffs, sweatDrop, floatWord,
} from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', MINT = '#7dffb0', RED = '#ff5a6a'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const BL = 60 / 108
const B = n => +(0.6 + n * BL).toFixed(3)     // the 108 bpm grid
const VIR = signStar('virgo'), SAG = signStar('sagittarius'), PIS = signStar('pisces')
const V_COL = '#ff8fbd', S_COL = '#c9a0ff'    // tag colours (lighter than the bodies, for the dark box)
const V_TAG = `${VIR.glyph}︎ VIRGO`, S_TAG = `${SAG.glyph}︎ SAG`
const V2_TAG = `VIRGO, NOW ${SAG.glyph}︎`, S2_TAG = `SAG, NOW ${VIR.glyph}︎`
const R_TAG = '☎︎ THE RESTAURANT'

// ── the timeline
const ZAP = B(24)                               // 13.933
const T = {
  black: [0, 0.3],
  // 0 · the square
  h0: 0.15, h0Land: 0.6, h0Out: [7.25, 7.4], sqLine: [0.45, 0.9], sqOut: [7.1, 7.35],
  openA: 0.7, l0: 0.92, l1: 4.55, twitch: [6.0, 7.2], closeA: 7.4,
  // 1 · the wish
  h1: 7.5, h1Land: 7.9, h1Out: [13.5, 13.65], star1: [7.55, 8.7],
  openB: 7.55, l2: 7.78, l3: 10.6, closeB: 13.55, doze: 13.0,
  // 2 · ZAP
  swoop: [13.3, ZAP], zap: ZAP, fly: [ZAP + 0.07, ZAP + 0.8], hz: ZAP + 0.04, hzOut: [15.35, 15.5],
  // 3 · next morning
  h3: 15.6, h3Land: 16.0, h3Out: [21.75, 21.9], sun: [15.5, 16.4], sunOut: [21.6, 22.1], wake: 15.8,
  openC: 16.2, l4: 16.4, l5: 19.1, closeC: 21.85,
  // 4 · the rules
  h4: 21.95, h4Land: 22.3, h4Out: [25.0, 25.15], rules: [22.05, 22.4], row1: 22.55, row2: 23.4, rulesOut: [24.85, 25.1],
  faintV: 22.9, faintS: 23.75, faintP: 24.3, upV: [24.7, 25.0], upS: [24.75, 25.05], upP: [24.8, 25.1],
  cut2: 25.2,
  // 5 · Virgo vs spontaneity
  h5: 25.3, h5Land: 25.7, h5Out: [29.85, 30.0], openD: 25.65, l6: 25.85, closeD: 28.95,
  note: [27.35, 27.65], tick1: 27.9, tick2: 28.45, tick3: 29.0, noteOut: [29.65, 29.9], faint2: 29.05, up2: [29.6, 29.9],
  // 6 · Sag vs a reservation
  h6: 30.1, h6Land: 30.5, h6Out: [36.3, 36.45], ring: [30.15, 30.8], phone: 30.2, phoneOut: [36.15, 36.45],
  openE: 30.65, l7: 30.87, l8: 33.65, closeE: 36.15, spin: [34.6, 35.1], booked: 35.1, bookOut: [36.2, 36.45],
  cut3: 36.5,
  // 7 · the date (no words: Sag is EARLY, Virgo runs in late with a flower)
  h7: 36.55, h7Land: 36.95, h7Out: [39.35, 39.5], table: [36.6, 36.95], vOut: [36.5, 36.85], early: [36.9, 37.2], earlyOut: [39.15, 39.4],
  vIn: [37.6, 38.15], give: [38.4, 38.8], tableOut: [39.4, 39.7],
  // 8 · the turn
  h8: 39.55, h8Land: 39.9, h8Out: [46.0, 46.15], openG: 39.85, l10: 40.07, l11: 43.2, closeG: 46.15,
  sqBack: 44.6, plan: [44.75, 45.05], planOut: [45.95, 46.2],
  // 9 · lesson
  lesson: B(82), lessonOut: [50.4, 50.6],
  cut4: 50.65,
  // 10 · the reading
  h9: 50.7, h9Land: 51.1, h9Out: [52.85, 53.0], panel: [50.7, 51.05], panelOut: [52.75, 53.0], arcs: [51.15, 51.5, 51.85],
  // 11 · swap back?
  h10: 53.05, h10Land: 53.6, h10Out: [55.05, 55.3], star3: [53.05, 53.8], wink: 54.15, out: [55.05, 55.43],
}
const BOX_A = [
  { t: T.l0, speaker: V_TAG, color: V_COL, text: 'dinner: 7:00. table 4. backup: *table 6.*' },
  { t: T.l1, speaker: S_TAG, color: S_COL, text: 'or we just wander till we *smell food?*' },
]
const BOX_B = [
  { t: T.l2, speaker: V_TAG, color: V_COL, text: 'I wish Sag would just *PLAN* something.' },
  { t: T.l3, speaker: S_TAG, color: S_COL, text: 'I wish Virgo would just *LIVE* a little.' },
]
const BOX_C = [
  { t: T.l4, speaker: V2_TAG, color: S_COL, text: 'why do I suddenly own a *passport?*' },
  { t: T.l5, speaker: S2_TAG, color: V_COL, text: 'why do I have *opinions* about fonts?' },
]
const BOX_D = [{ t: T.l6, speaker: V2_TAG, color: S_COL, text: 'spontaneous thing #1: 6:05. *sharp.*' }]
const BOX_E = [
  { t: T.l7, speaker: S2_TAG, color: V_COL, text: 'a table for… *vibes o’clock?*' },
  { t: T.l8, speaker: R_TAG, color: '#9fe4ff', text: 'sir. we need a *time.*' },
]
const BOX_G = [
  { t: T.l10, speaker: V2_TAG, color: S_COL, text: 'winging it is SCARY. you do this *daily?*' },
  { t: T.l11, speaker: S2_TAG, color: V_COL, text: 'and you plan… because you *care.*' },
]
const BOXES = [[BOX_A, T.openA, T.closeA], [BOX_B, T.openB, T.closeB], [BOX_C, T.openC, T.closeC], [BOX_D, T.openD, T.closeD], [BOX_E, T.openE, T.closeE], [BOX_G, T.openG, T.closeG]]
const ALL_LINES = BOXES.flatMap(b => b[0])
const CPS = 28
const LT = new Map(BOXES.map(([L]) => [L, lineTimes(L, { cps: CPS })]))
const doneOf = (L, i) => LT.get(L)[i].done
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Spend a day in their *orbit.* | You’ll get it.', chip: '+1 EMPATHY' }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const D2R = Math.PI / 180, TAU = Math.PI * 2
const swapK = t => ease.inOutQuad(prog(t, ZAP + 0.08, ZAP + 0.6))

// ── the cast
const SIZE = 270
const V_HOME = { x: 300, y: 1060 }, S_HOME = { x: 780, y: 1060 }
const PIS_AT = { x: 968, y: 1300, s: 104 }
const FOOT_DY = 127                              // star centre → its lower tips (cells 5.85 × 8 px … + rounding)

/** faint angle (radians) for a star: falls over at f, lies there, pops back up over [u0, u1] */
function faintRot(t, f, [u0, u1], dir) {
  if (t < f) return 0
  if (t < u0) { const p = prog(t, f, f + 0.32); return dir * (Math.PI / 2) * (p < 1 ? ease.inQuad(p) : 1 + 0.06 * Math.exp(-(t - f - 0.32) * 9) * Math.cos((t - f - 0.32) * 30)) }
  if (t < u1) return dir * (Math.PI / 2) * (1 - easeOutBack(prog(t, u0, u1), 2.2))
  return 0
}
function virgoPos(t) {
  let x = V_HOME.x, y = V_HOME.y
  if (inR(t, T.vOut[0], T.vIn[0])) x = lerp(V_HOME.x, -220, ease.inCubic(prog(t, ...T.vOut)))
  else if (inR(t, T.vIn[0], T.vIn[1] + 0.01)) { const p = prog(t, ...T.vIn); x = lerp(-220, V_HOME.x, ease.outCubic(p)); y -= Math.abs(Math.sin(p * Math.PI * 3)) * 60 * (1 - p) }
  return { x: x + closer(t), y }
}
/** the turn: they drift toward each other as they get it, and back apart for the reading */
const closer = t => 55 * ease.inOutCubic(prog(t, T.l11, T.l11 + 1.4)) * (1 - ease.inOutCubic(prog(t, T.h9 - 0.3, T.h9 + 0.3)))
const sagPos = t => ({ x: S_HOME.x - closer(t), y: S_HOME.y })

// mood tables: [t0, t1, mood, look?, extra?]; the last matching row wins
function virgoState(t) {
  const st = { mood: 'neutral', look: [1, 0], squash: 0, sweat: 0, steam: 0, rot: 0, blink: undefined, zzz: false }
  const R = [
    [0, T.l0, 'happy', [0, 0]], [T.l0, T.l1, 'squint', [-1, 1]],
    [T.l1, T.twitch[0], 'wide', [1, 0]],
    [T.twitch[0], T.closeA + 0.1, 'squint', [1, 0]],
    [T.h1, T.l2, 'sparkle', [1, -1]], [T.l2, T.l3, 'happy', [0, -1]], [T.l3, T.doze, 'squint', [1, 0]],
    [T.doze, T.wake, 'sleepy', [0, 0]],
    [T.wake, T.l4, 'wide', [0, 1]], [T.l4, T.l5, 'wide', [-1, 1]], [T.l5, T.h4, 'squint', [1, 0]],
    [T.h4, T.row1 + 0.2, 'neutral', [0, -1]], [T.row1 + 0.2, T.faintV, 'wide', [0, -1]],
    [T.h5, T.l6, 'neutral', [0, 0]], [T.l6, T.tick1, 'squint', [0, -1]], [T.tick1, T.faint2, 'wide', [0, -1]],
    [T.up2[1], T.l8, 'neutral', [1, 0]], [T.l8, T.booked, 'wide', [1, 0]], [T.booked, T.vOut[0], 'happy', [1, 0]],
    [T.vIn[0], T.give[1], 'happy', [1, 0]], [T.give[1], T.l10, 'sparkle', [1, 0]],
    [T.l10, doneOf(BOX_G, 0) + 0.2, 'wide', [1, 0]], [doneOf(BOX_G, 0) + 0.2, T.l11, 'neutral', [1, 0]],
    [T.l11, doneOf(BOX_G, 1), 'sparkle', [1, 0]], [doneOf(BOX_G, 1), T.lesson, 'heart', [1, 0]],
    [T.lesson, T.h9, 'happy', [0, 0]], [T.h9, T.h10, 'sparkle', [0, -1]],
    [T.h10, T.wink - 0.2, 'wide', [1, -1]], [T.wink - 0.2, 99, 'happy', [1, 0]],
  ]
  for (const [a, b, m, l] of R) if (inR(t, a, b)) { st.mood = m; if (l) st.look = l }
  if (t >= T.wink && t < T.out[0]) st.mood = 'wink'
  if (inR(t, T.twitch[0], T.twitch[1])) { st.steam = 1; const k = Math.floor((t - T.twitch[0]) * 7); st.mood = k % 3 === 2 ? 'wide' : 'squint'; st.squash = k % 3 === 2 ? -0.05 : 0 }
  if (inR(t, T.doze, T.wake)) st.zzz = true
  if (inR(t, T.wake, T.wake + 0.5)) st.squash = -0.14 * bump(t, T.wake, 0.5)
  if (inR(t, T.l4, T.l5)) st.sweat = 1
  if (inR(t, T.tick1, T.faint2)) st.sweat = 1
  if (inR(t, T.l10, T.l11)) st.sweat = 0.8
  st.rot = faintRot(t, T.faintV, T.upV, -1) + faintRot(t, T.faint2, T.up2, -1)
  if (st.rot !== 0 && Math.abs(st.rot) > 0.5) { st.mood = 'neutral'; st.blink = 1 }
  return st
}
function sagState(t) {
  const st = { mood: 'happy', look: [-1, 0], squash: 0, sweat: 0, steam: 0, rot: 0, blink: undefined, zzz: false, dizzy: 0 }
  const R = [
    [0, T.l0, 'happy', [0, 0]], [T.l0, T.l1, 'neutral', [-1, 0]], [T.l1, T.twitch[0], 'sparkle', [-1, -1]], [T.twitch[0], T.h1, 'happy', [-1, 0]],
    [T.h1, T.l2, 'sparkle', [-1, -1]], [T.l2, T.l3, 'neutral', [-1, 0]], [T.l3, doneOf(BOX_B, 1) + 0.6, 'happy', [0, -1]], [doneOf(BOX_B, 1) + 0.6, T.doze, 'neutral', [-1, 0]],
    [T.doze, T.wake + 0.12, 'sleepy', [0, 0]],
    [T.wake + 0.12, T.l4, 'wide', [0, 1]], [T.l4, T.l5, 'wide', [-1, 0]], [T.l5, T.h4, 'wide', [1, 1]],
    [T.h4, T.row2 + 0.2, 'neutral', [0, -1]], [T.row2 + 0.2, T.faintS, 'wide', [0, -1]],
    [T.h5, T.tick1, 'neutral', [-1, 0]], [T.tick1, T.faint2, 'squint', [-1, -1]], [T.faint2, T.h6, 'wide', [-1, 0]],
    [T.h6, T.l7, 'neutral', [0, 0]], [T.l7, T.l8, 'sparkle', [0, 0]], [T.l8, T.spin[0], 'wide', [0, 0]], [T.spin[0], T.booked, 'eyeroll', [0, 0]],
    [T.booked, T.h7, 'happy', [0, 0]],
    [T.h7, T.vIn[0], 'sparkle', [0, 0]], [T.vIn[0], T.give[0], 'wide', [-1, 0]], [T.give[0], T.l10, 'heart', [-1, 0]],
    [T.l10, T.l11, 'wide', [-1, 0]], [T.l11, doneOf(BOX_G, 1), 'sparkle', [-1, 0]], [doneOf(BOX_G, 1), T.lesson, 'heart', [-1, 0]],
    [T.lesson, T.h9, 'happy', [0, 0]], [T.h9, T.h10, 'sparkle', [0, -1]],
    [T.h10, T.wink - 0.2, 'wide', [-1, -1]], [T.wink - 0.2, 99, 'happy', [-1, 0]],
  ]
  for (const [a, b, m, l] of R) if (inR(t, a, b)) { st.mood = m; if (l) st.look = l }
  if (t >= T.wink + 0.12 && t < T.out[0]) st.mood = 'wink'
  if (inR(t, T.doze, T.wake + 0.12)) st.zzz = true
  if (inR(t, T.wake + 0.12, T.wake + 0.6)) st.squash = -0.14 * bump(t, T.wake + 0.12, 0.5)
  if (inR(t, T.l5, T.h4)) st.sweat = 1
  if (inR(t, T.l8, T.booked)) st.sweat = 1
  if (inR(t, T.spin[0], T.booked + 0.2)) st.dizzy = 1 - prog(t, T.booked, T.booked + 0.2)
  if (inR(t, T.early[0], T.vIn[0])) st.sweat = 0.7
  st.rot = faintRot(t, T.faintS, T.upS, 1)
  if (Math.abs(st.rot) > 0.5) { st.mood = 'neutral'; st.blink = 1 }
  return st
}

// talking hops + reactions
const V_HOPS = [...talkHops(ALL_LINES, V_TAG, { cps: CPS }), ...talkHops(ALL_LINES, V2_TAG, { cps: CPS }), T.wake, T.tick1, T.tick1 + 0.32, T.tick2, T.vIn[1], T.give[1], doneOf(BOX_G, 1) + 0.1, T.lesson + 0.1, T.wink]
const S_HOPS = [...talkHops(ALL_LINES, S_TAG, { cps: CPS }), ...talkHops(ALL_LINES, S2_TAG, { cps: CPS }), T.wake + 0.12, T.booked, T.booked + 0.4, T.give[1], doneOf(BOX_G, 1) + 0.15, T.lesson + 0.15, T.wink + 0.12]

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS())]
function CUTS() { return [7.45, 15.55, 21.9, { t: T.cut2, kind: 'deal' }, 30.05, { t: T.cut3, kind: 'shuffle' }, 39.5, { t: T.cut4, kind: 'flip' }, 53.0] }

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "900 200px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 146, wobble: true, late: 1, ...o })
  const HEADS = [
    [H('Virgo × Sag. | A *square.*', { top: 128, at: T.h0, lateAt: T.h0Land, accentColor: RED }), T.h0Out],
    [H('Then: a | shooting *star.*', { top: 128, at: T.h1, lateAt: T.h1Land, accentColor: GOLD }), T.h1Out],
    [H('*ZAP.*', { top: 150, size: 150, accentSize: 220, at: T.hz, lateAt: T.hz, accentColor: '#fff3c4' }), T.hzOut],
    [H('Next morning: | *wrong sign.*', { top: 128, at: T.h3, lateAt: T.h3Land, late: 2, accentColor: '#ffb347' }), T.h3Out],
    [H('Tonight’s | *rules.*', { top: 128, at: T.h4, lateAt: T.h4Land, accentColor: GOLD }), T.h4Out],
    [H('Virgo vs. | *spontaneity.*', { top: 128, at: T.h5, lateAt: T.h5Land, accentColor: S_COL }), T.h5Out],
    [H('Sag vs. | *a reservation.*', { top: 128, at: T.h6, lateAt: T.h6Land, late: 2, accentColor: V_COL }), T.h6Out],
    [H('7:00 PM. | The *date.*', { top: 128, at: T.h7, lateAt: T.h7Land, accentColor: PINK }), T.h7Out],
    [H('Wait. | *Oh.*', { top: 128, size: 108, accentSize: 170, at: T.h8, lateAt: T.h8Land, accentColor: PINK }), T.h8Out],
    [H('Every square | has a *pull.*', { top: 128, at: T.h9, lateAt: T.h9Land, accentColor: READING.pull }), T.h9Out],
    [H('Swap back? | …*Maybe Tuesday.*', { top: 128, size: 96, accentSize: 132, at: T.h10, late: 2, lateAt: T.h10Land, accentColor: GOLD, fit: true }), T.h10Out],
  ]
  const BOX = { y: 1450, width: 960, height: 270, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── a star person
  function hand(F, side) { return cellToWorld(F, side < 0 ? 1.5 : 34.5, 25) }
  function drawPerson(t, who) {
    const isV = who === 'V'
    const p = isV ? virgoPos(t) : sagPos(t), st = isV ? virgoState(t) : sagState(t)
    const k = popOut(t, T.out)
    if (k <= 0.01 || p.x < -200) return null
    const sk = swapK(t)
    const col = isV ? mixHex(VIR.color, SAG.color, sk) : mixHex(SAG.color, VIR.color, sk)
    const preG = isV ? VIR.glyph : SAG.glyph, postG = isV ? SAG.glyph : VIR.glyph
    const glyph = t < T.fly[0] ? preG : t >= T.fly[1] ? postG : null
    const kit = t < ZAP + 0.3 ? (isV ? 'virgo' : 'sag') : (isV ? 'sag' : 'virgo')
    const opts = { color: col, glyph, mood: st.mood, look: st.look, squash: st.squash + (inR(t, ZAP, ZAP + 0.4) ? 0.18 * bump(t, ZAP, 0.4) : 0), hops: isV ? V_HOPS : S_HOPS, seed: isV ? 3 : 8, glow: 0.9, zzz: st.zzz, blink: st.blink, pop: k }
    const side = isV ? -1 : 1
    x.save()
    if (st.rot) { x.translate(p.x, p.y + FOOT_DY); x.rotate(st.rot); x.translate(-p.x, -(p.y + FOOT_DY)) }
    const r = drawStarChar(x, p.x, p.y, SIZE, t, opts)
    const F = starFrame(p.x, p.y, SIZE, t, opts)
    // worn kit: glasses (Virgo's) over the eyes, shades (Sag's) up on the forehead; they fade out / in around the zap
    const wornK = t < ZAP ? 1 : t < T.fly[1] - 0.15 ? 0 : prog(t, T.fly[1] - 0.15, T.fly[1] + 0.1)
    inSprite(x, F, () => { if (kit === 'virgo') glassesCells(x, wornK); else shadesCells(x, wornK) })
    // held kit (outer hand) unless something else is in it
    const [hx, hy] = hand(F, side)
    const sway = 0.12 * Math.sin(t * 2 + (isV ? 0 : 1))
    const busy = (!isV && inR(t, T.phone, T.phoneOut[1])) || (isV && inR(t, T.vIn[0], T.give[0]))
    const heldVis = !inR(t, T.fly[0] - 0.02, T.fly[1])
    if (heldVis && !busy && k > 0.3) {
      if (kit === 'virgo') drawClipboard(x, hx + side * 6, hy, 5 * k, side * 0.2 + sway)
      else drawPassport(x, hx + side * 4, hy, 5 * k, side * 0.18 + sway)
    }
    // the phone (Sag, booking): held up at the ear
    if (!isV && inR(t, T.phone, T.phoneOut[1])) {
      const pk = pop01(t, T.phone, 0.3, 2.4) * (1 - ease.inCubic(prog(t, ...T.phoneOut)))
      const [px, py] = cellToWorld(F, 33, 17)
      const shake = inR(t, ...T.ring) ? Math.sin(t * 70) * 6 : 0
      drawPhone(x, px + 22 + shake, py, 10 * pk, 0.25)
    }
    // the flower (Virgo brings it; it changes hands at the give)
    if (isV && inR(t, T.vIn[0], T.give[0])) drawFlower(x, hx + 30, hy + 40, 9, -0.25 + 0.1 * Math.sin(t * 5))
    const [ex, ey] = cellToWorld(F, 18, 6)
    if (st.steam) steamPuffs(x, t, ex, ey - 10, 7, st.steam)
    if (st.sweat) sweatDrop(x, t, isV ? ex + 80 : ex - 80, ey + 60, 6, st.sweat)
    if (st.dizzy) dizzyStars(x, t, p.x, r.top - 20, 90, { alpha: st.dizzy })
    x.restore()
    return { F, p, r }
  }
  function drawPisces(t) {
    const k = pop01(t, 0.5, 0.4, 2.2) * popOut(t, T.out)
    if (k <= 0.01) return
    let mood = 'sparkle', tears = 1, sq = 0
    if (inR(t, ZAP - 0.2, T.h3)) { mood = 'wide'; tears = 2 }
    if (inR(t, T.row1, T.faintP)) tears = 2
    if (inR(t, T.give[0], T.lesson + 1.5)) tears = 3
    if (t >= T.h10) tears = 2
    const rot = faintRot(t, T.faintP, T.upP, 1)
    const p = PIS_AT
    const opts = { color: PIS.color, mood: Math.abs(rot) > 0.5 ? 'neutral' : mood, blink: Math.abs(rot) > 0.5 ? 1 : undefined, look: [-1, -1], seed: 29, pop: k, glow: 0.7, squash: sq }
    x.save()
    if (rot) { x.translate(p.x, p.y + p.s * 0.45); x.rotate(rot); x.translate(-p.x, -(p.y + p.s * 0.45)) }
    drawStarChar(x, p.x, p.y, p.s, t, opts)
    const F = starFrame(p.x, p.y, p.s, t, opts)
    if (Math.abs(rot) < 0.5) inSprite(x, F, () => tearsCells(x, t, tears))
    x.restore()
  }

  // ── props over the scene
  function drawSquareLine(t) {
    const a = ease.outCubic(prog(t, ...T.sqLine)) * outK(t, T.sqOut)
    const b = t >= T.sqBack ? pop01(t, T.sqBack, 0.35, 2) * outK(t, [T.lesson, T.lesson + 0.2]) : 0
    for (const [k, gold] of [[a, false], [b, true]]) {
      if (k <= 0.01) continue
      const col = gold ? GOLD : RED
      x.save(); x.globalAlpha = clamp(k)
      x.strokeStyle = col; x.lineWidth = 8; x.setLineDash(gold ? [] : [18, 14]); x.lineDashOffset = -t * 40
      x.shadowColor = col; x.shadowBlur = 16
      const w = 170 * clamp(k)
      x.beginPath(); x.moveTo(540 - w, 1020); x.lineTo(540 + w, 1020); x.stroke(); x.setLineDash([])
      x.shadowBlur = 0
      // the chip: "□ SQUARE" (then "□ SQUARE ♥")
      const label = gold ? '□ SQUARE ♥' : '□ SQUARE · 90°'
      x.font = `700 32px ${MONO}`; const tw = x.measureText(label).width + 44
      x.translate(540, 1250); x.scale(clamp(k, 0, 1.2), clamp(k, 0, 1.2))
      x.fillStyle = 'rgba(14,8,32,0.95)'; x.fillRect(-tw / 2, -28, tw, 56); x.fillStyle = col; x.fillRect(-tw / 2, -28, tw, 5); x.fillRect(-tw / 2, 23, tw, 5)
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(label, 0, 2)
      x.restore()
    }
  }
  function drawZap(t) {
    // the wish star crosses; the zap star swoops in from the top right
    shootingStar(x, t, ...T.star1, { x: 1160, y: 560, arc: 120 }, { x: -120, y: 640 }, { size: 40 })
    const z = shootingStar(x, t, ...T.swoop, { x: 1150, y: 380, arc: -80 }, { x: 540, y: 820 }, { size: 56 })
    if (t >= ZAP && t < ZAP + 0.5) {
      // magic beams: zigzag pixel bolts into both stars (sparkly, not weapons)
      const k = 1 - prog(t, ZAP + 0.25, ZAP + 0.5)
      for (const [tx, ty, s] of [[V_HOME.x, V_HOME.y, 1], [S_HOME.x, S_HOME.y, 2]]) {
        x.save(); x.globalAlpha = k; x.strokeStyle = s === 1 ? '#fff3c4' : '#ffd6f0'; x.lineWidth = 12; x.lineJoin = 'miter'; x.shadowColor = GOLD; x.shadowBlur = 30
        x.beginPath(); x.moveTo(540, 820)
        for (let i = 1; i <= 6; i++) { const u = i / 6, jig = i < 6 ? ((i + Math.floor(t * 30)) % 2 ? 26 : -26) : 0; x.lineTo(lerp(540, tx, u) + jig, lerp(820, ty, u) + jig * 0.4) }
        x.stroke(); x.restore()
      }
      sparkBurst(x, t, 540, 820, ZAP, { n: 16, R: 320, size: 34, seed: 2 })
    }
    for (const [tx, s] of [[V_HOME.x, 4], [S_HOME.x, 6]]) sparkBurst(x, t, tx, V_HOME.y, ZAP + 0.12, { n: 10, R: 190, size: 26, seed: s, cols: [GOLD, '#ffffff', PINK, '#c9a6ff'] })
    // the kits + badges fly across, crossing in the middle
    if (t >= T.fly[0] && t < T.fly[1]) {
      const u = ease.inOutCubic(prog(t, ...T.fly))
      const L = { x: V_HOME.x - 150, y: V_HOME.y + 70 }, R = { x: S_HOME.x + 150, y: S_HOME.y + 70 }
      const arc = (a, b, h) => ({ x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u) - Math.sin(Math.PI * u) * h })
      const c1 = arc(L, R, 380), c2 = arc(R, L, 260)
      drawClipboard(x, c1.x, c1.y, 5, u * TAU)
      drawPassport(x, c2.x, c2.y, 5, -u * TAU)
      const bL = { x: V_HOME.x + 60, y: V_HOME.y + 70 }, bR = { x: S_HOME.x + 60, y: S_HOME.y + 70 }
      const g1 = arc(bL, bR, 520), g2 = arc(bR, bL, 160)
      drawCoin(x, g1.x, g1.y, 30, VIR.glyph, VIR.color, u * 3)
      drawCoin(x, g2.x, g2.y, 30, SAG.glyph, SAG.color, -u * 3)
    }
    // the white flash
    const f = t >= ZAP ? Math.exp(-(t - ZAP) * 7) : 0
    if (f > 0.01) { x.save(); x.globalAlpha = 0.85 * f; x.fillStyle = '#fffaf0'; x.fillRect(0, 0, W, 1920); x.restore() }
    void z
  }
  function drawMorning(t) {
    const k = ease.inOutQuad(prog(t, ...T.sun)) * outK(t, T.sunOut)
    if (k <= 0) return
    x.save(); x.globalAlpha = 0.42 * k
    const g = x.createLinearGradient(0, 300, 0, 1920); g.addColorStop(0, 'rgba(255,170,120,0)'); g.addColorStop(0.55, 'rgba(255,150,120,0.6)'); g.addColorStop(1, 'rgba(255,200,130,0.9)')
    x.fillStyle = g; x.fillRect(0, 0, W, 1920); x.restore()
    drawSun(x, t, 160, lerp(900, 640, ease.outCubic(prog(t, ...T.sun))), 70, k)
  }
  function rowText(X, Y, glyph, gcol, name, ncol, val, k, t0, t) {
    if (k <= 0.01) return
    x.save(); x.translate(X, Y); x.scale(k, k)
    drawCoin(x, 0, 0, 34, glyph, gcol)
    x.textAlign = 'left'; x.textBaseline = 'middle'
    x.font = `700 40px ${MONO}`; x.fillStyle = ncol; x.fillText(name, 56, 2)
    const nw = x.measureText(name).width
    x.font = `800 54px ${INTER}`; x.fillStyle = BONE; x.fillText('→ ' + val, 56 + nw + 20, 2)
    x.restore()
    sparkBurst(x, t, X + 300, Y, t0, { n: 8, R: 180, size: 22, seed: Math.round(t0 * 10) })
  }
  function drawRules(t) {
    if (t < T.rules[0] || t >= T.rulesOut[1]) return
    const k = easeOutBack(prog(t, ...T.rules), 1.8) * (1 - ease.inCubic(prog(t, ...T.rulesOut)))
    if (k <= 0.01) return
    x.save(); x.translate(540, 650); x.scale(1, k); x.translate(-540, -650)
    pixelPanel(x, 70, 460, 940, 380, { P: 8, glow: 0.5 })
    x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('THE SWAP · TONIGHT’S DATE', 540, 512)
    rowText(150, 615, SAG.glyph, SAG.color, 'VIRGO', S_COL, 'be spontaneous', pop01(t, T.row1, 0.35, 2.6), T.row1, t)
    rowText(150, 750, VIR.glyph, VIR.color, 'SAG', V_COL, 'book a table', pop01(t, T.row2, 0.35, 2.6), T.row2, t)
    x.restore()
  }
  function drawNote(t) {
    if (t < T.note[0] || t >= T.noteOut[1]) return
    const k = easeOutBack(prog(t, ...T.note), 2) * (1 - ease.inCubic(prog(t, ...T.noteOut)))
    if (k <= 0.01) return
    x.save(); x.translate(320, 640); x.scale(k, k); x.rotate(-0.03); x.translate(-320, -640)
    pixelPanel(x, 60, 450, 600, 390, { P: 8, glow: 0.45, fill: 'rgba(28,18,58,0.96)', border: S_COL })
    x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = S_COL; x.fillText('SPONTANEITY PLAN', 110, 505)
    const rows = [['6:05', 'be wild', T.tick1], ['6:10', 'be free', T.tick2], ['6:12', 'lie down', T.tick3]]
    rows.forEach(([tm, what, tk], i) => {
      const y = 590 + i * 82, done = t >= tk
      x.fillStyle = 'rgba(239,230,214,0.12)'; x.fillRect(110, y - 26, 52, 52)
      checkMark(x, 136, y, 7, prog(t, tk, tk + 0.12))
      x.font = `700 40px ${MONO}`; x.fillStyle = GOLD; x.fillText(tm, 186, y + 2)
      x.font = `800 46px ${INTER}`; x.fillStyle = done ? 'rgba(239,230,214,0.6)' : BONE; x.fillText(what, 316, y + 2)
      if (done) { const w = x.measureText(what).width * clamp((t - tk) / 0.15); x.fillStyle = MINT; x.fillRect(316, y, w, 5) }
    })
    x.restore()
  }
  function drawBooking(t) {
    if (t < T.ring[0] || t >= T.bookOut[1]) return
    // ring ring
    if (inR(t, T.ring[0], T.l7)) { floatWord(x, t, T.ring[0], 'ring!', 900, 860, { col: '#9fe4ff', rot: 0.15, size: 46 }); floatWord(x, t, T.ring[0] + 0.3, 'ring!', 960, 780, { col: '#9fe4ff', rot: -0.1, size: 46 }) }
    // the reservation card: a clock with spinning hands → TABLE 4 · 7:00 ✓
    const k = pop01(t, T.l7 + 0.4, 0.35, 2.2) * (1 - ease.inCubic(prog(t, ...T.bookOut)))
    if (k <= 0.01) return
    const cx = 540, cy = 640
    x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
    const booked = t >= T.booked
    pixelPanel(x, 250, 470, 580, 340, { P: 8, glow: booked ? 0.8 : 0.45, border: booked ? MINT : V_COL })
    x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = booked ? MINT : V_COL
    x.fillText(booked ? 'RESERVATION' : 'TABLE FOR TWO AT…', 540, 520)
    if (!booked) {
      // the clock face; hands spin faster once the restaurant asks for a time
      const sp = t < T.l8 ? 1.2 : t < T.spin[0] ? 3 : 14
      const ang = (t - T.l7) * sp
      x.fillStyle = BONE; x.beginPath(); x.arc(540, 640, 86, 0, TAU); x.fill()
      x.lineWidth = 8; x.strokeStyle = INK; x.stroke()
      for (let i = 0; i < 12; i++) { const a = i * TAU / 12; x.fillStyle = INK; x.fillRect(540 + Math.cos(a) * 66 - 4, 640 + Math.sin(a) * 66 - 4, 8, 8) }
      x.strokeStyle = INK; x.lineCap = 'round'
      x.lineWidth = 10; x.beginPath(); x.moveTo(540, 640); x.lineTo(540 + Math.cos(ang - Math.PI / 2) * 44, 640 + Math.sin(ang - Math.PI / 2) * 44); x.stroke()
      x.lineWidth = 6; x.beginPath(); x.moveTo(540, 640); x.lineTo(540 + Math.cos(ang * 6 - Math.PI / 2) * 68, 640 + Math.sin(ang * 6 - Math.PI / 2) * 68); x.stroke()
      x.font = `700 30px ${MONO}`; x.fillStyle = RED; x.fillText('o’clock: VIBES?', 540, 768)
    } else {
      const bk = pop01(t, T.booked, 0.35, 2.6)
      x.save(); x.translate(540, 650); x.scale(bk, bk)
      x.font = `800 84px ${INTER}`; x.fillStyle = BONE; x.fillText('TABLE 4', 0, -20)
      x.font = `700 52px ${MONO}`; x.fillStyle = GOLD; x.fillText('7:00 ✓', 0, 70)
      x.restore()
      sparkBurst(x, t, 540, 650, T.booked, { n: 14, R: 300, size: 30, seed: 9, cols: [MINT, GOLD, BONE] })
    }
    x.restore()
  }
  function drawDate(t, vR, sR) {
    // the café table + candle between them
    if (t >= T.table[0] && t < T.tableOut[1] + 0.05) {
      const k = pop01(t, T.table[0], 0.35, 2.2) * (1 - ease.inCubic(prog(t, ...T.tableOut)))
      drawTable(x, 540, 1290, 11 * k, t)
    }
    // the flower changes hands, then sits in Sag's inner hand
    if (t >= T.give[0] && t < T.lesson + 0.3 && sR) {
      const [sx, sy] = hand(sR.F, -1)
      const tx = sx - 24, ty = sy + 40
      if (t < T.give[1]) {
        const u = ease.inOutCubic(prog(t, ...T.give)), fx = lerp(V_HOME.x + 175, tx, u), fy = lerp(V_HOME.y + 150, ty, u) - Math.sin(Math.PI * u) * 120
        drawFlower(x, fx, fy, 9, -0.25 + u * 0.5)
      } else drawFlower(x, tx, ty, 8, 0.25 + 0.1 * Math.sin(t * 4), outK(t, [T.lesson, T.lesson + 0.25]))
      drawHearts(x, t, T.give[1], S_HOME.x, S_HOME.y - 150, { n: 5, px: 7, spread: 140 })
    }
    // Sag got there first: an "ARRIVED 6:52" chip (the early joke, no words needed)
    if (t >= T.early[0] && t < T.earlyOut[1]) {
      const k = easeOutBack(prog(t, ...T.early), 2.4) * (1 - ease.inCubic(prog(t, ...T.earlyOut)))
      x.save(); x.translate(800, 790); x.scale(k, k); x.rotate(0.04)
      pixelPanel(x, -230, -75, 460, 150, { P: 6, glow: 0.5, border: V_COL })
      x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = `700 36px ${MONO}`; x.fillStyle = BONE; x.fillText('ARRIVED: 6:52', 0, -22)
      x.font = `italic 500 50px 'EB Garamond', Georgia, serif`; x.fillStyle = PINK; x.fillText('(…early?!)', 0, 30)
      x.restore()
    }
    if (inR(t, T.vIn[1], T.vIn[1] + 1)) floatWord(x, t, T.vIn[1] - 0.15, 'no plan!!', V_HOME.x, V_HOME.y - 190, { col: S_COL, size: 36 })
  }
  function drawPlan(t) {
    if (t < T.plan[0] || t >= T.planOut[1]) return
    const k = easeOutBack(prog(t, ...T.plan), 2.2) * (1 - ease.inCubic(prog(t, ...T.planOut)))
    if (k <= 0.01) return
    x.save(); x.translate(540, 660); x.scale(k, k); x.rotate(0.02); x.translate(-540, -660)
    pixelPanel(x, 220, 520, 640, 280, { P: 8, glow: 0.6 })
    x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('THE NEW PLAN', 540, 570)
    x.textAlign = 'left'
    x.font = `800 52px ${INTER}`; x.fillStyle = BONE; x.fillText('7:00 dinner', 300, 650)
    checkMark(x, 760, 650, 7, prog(t, T.plan[0] + 0.25, T.plan[0] + 0.4))
    x.fillStyle = BONE; x.font = `800 52px ${INTER}`; x.fillText('then: ', 300, 730)
    const tw = x.measureText('then: ').width
    x.font = `italic 500 64px 'EB Garamond', Georgia, serif`; x.fillStyle = PINK; x.fillText('???', 300 + tw, 732)
    checkMark(x, 760, 730, 7, prog(t, T.plan[0] + 0.45, T.plan[0] + 0.6))
    x.restore()
  }
  // the Push / Pull / Align reading between the two charts
  const CH_S = 0.28, CHART_W = { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.92 }, R_DOT = 330 * CH_S
  const CHA = { x: 300, y: 690 }, CHB = { x: 780, y: 690 }
  const READ = [
    { a: -50, b: -130, apex: 520, col: READING.push, label: 'PUSH', t: T.arcs[0] },
    { a: 40, b: 140, apex: 880, col: READING.pull, label: 'PULL', t: T.arcs[1] },
    { a: -15, b: -165, apex: 590, col: READING.align, label: 'ALIGN', t: T.arcs[2] },
  ]
  function drawReading(t) {
    if (t < T.panel[0] || t >= T.panelOut[1]) return
    const k = easeOutBack(prog(t, ...T.panel), 1.8) * (1 - ease.inCubic(prog(t, ...T.panelOut)))
    if (k <= 0.01) return
    x.save(); x.translate(540, 690); x.scale(1, k); x.translate(-540, -690)
    pixelPanel(x, 60, 420, 960, 520, { P: 8, glow: 0.5, fill: 'rgba(12,7,30,0.95)' })
    x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('VIRGO × SAG · THE READING', 540, 466)
    for (const [side, C] of [[0, CHA], [1, CHB]]) {
      x.save(); x.translate(C.x, C.y); x.rotate((side ? 1 : -1) * (1 - ease.outCubic(prog(t, ...T.panel))) * 1.4 + (side ? -1 : 1) * t * 0.04)
      x.scale(CH_S, CH_S); drawWheelH(x, { W: CHART_W, k: 1 }); x.restore()
      x.font = `700 60px ${GLYPH_FONT}`; x.fillStyle = side ? S_COL : V_COL; x.fillText((side ? SAG.glyph : VIR.glyph) + '︎', C.x, C.y + 4)
    }
    READ.forEach((L, i) => {
      const A_ = { x: CHA.x + Math.cos(L.a * D2R) * R_DOT, y: CHA.y + Math.sin(L.a * D2R) * R_DOT }
      const B_ = { x: CHB.x + Math.cos(L.b * D2R) * R_DOT, y: CHB.y + Math.sin(L.b * D2R) * R_DOT }
      const cX = (A_.x + B_.x) / 2, cY = 2 * L.apex - (A_.y + B_.y) / 2
      const lk = ease.inOutCubic(prog(t, L.t, L.t + 0.45))
      if (lk <= 0) return
      const pulse = 1 + 0.4 * Math.exp(-Math.max(0, t - L.t - 0.45) * 4) + (i === 1 ? 0.25 * Math.sin(t * 6) * clamp(t - L.t - 0.5) : 0)
      x.save(); x.strokeStyle = L.col; x.lineCap = 'round'; x.lineWidth = (i === 1 ? 12 : 9) * pulse; x.shadowColor = L.col; x.shadowBlur = 24
      x.beginPath(); x.moveTo(A_.x, A_.y)
      const N = 40
      for (let s = 1; s <= Math.round(N * lk); s++) { const u = s / N, v = 1 - u; x.lineTo(v * v * A_.x + 2 * v * u * cX + u * u * B_.x, v * v * A_.y + 2 * v * u * cY + u * u * B_.y) }
      x.stroke(); x.restore()
      sparkBurst(x, t, B_.x, B_.y, L.t + 0.42, { n: 8, R: 70, size: 18, seed: 11 + i, cols: [L.col, '#fff3e0'] })
      const ck = easeOutBack(prog(t, L.t + 0.3, L.t + 0.6), 2.4)
      if (ck > 0) {
        const ax = cX * 0.5 + (A_.x + B_.x) * 0.25, ay = 0.5 * cY + 0.25 * (A_.y + B_.y)
        x.save(); x.translate(ax, ay); x.scale(ck * (i === 1 ? 1.25 : 1), ck * (i === 1 ? 1.25 : 1))
        x.font = `700 30px ${MONO}`; const tw = x.measureText(L.label).width + 40
        x.fillStyle = 'rgba(14,8,32,0.95)'; x.fillRect(-tw / 2, -24, tw, 48); x.fillStyle = L.col; x.fillRect(-tw / 2, -24, tw, 4); x.fillRect(-tw / 2, 20, tw, 4)
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L.label, 0, 2); x.restore()
      }
    })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        drawMorning(t)
        drawSquareLine(t)
        drawPisces(t)
        drawRules(t)
        drawNote(t)
        drawBooking(t)
        drawPlan(t)
        drawReading(t)
        // the stars (the reading panel sits behind them; the zap's flash goes over everything)
        const vR = drawPerson(t, 'V'), sR = drawPerson(t, 'S')
        drawDate(t, vR, sR)
        if (inR(t, T.tick1, T.tick1 + 1.1)) floatWord(x, t, T.tick1, 'wheee…', V_HOME.x + 150, V_HOME.y - 150, { col: S_COL, size: 38 })
        if (inR(t, T.tick2, T.tick2 + 1.1)) floatWord(x, t, T.tick2, 'whee.', V_HOME.x - 30, V_HOME.y - 190, { col: S_COL, size: 30 })
        if (inR(t, T.doze + 0.3, T.wake)) { /* the zzz's come from drawStarChar */ }
        if (inR(t, T.wake, T.wake + 1.0)) floatWord(x, t, T.wake, '!?', 540, 880, { col: GOLD, size: 60 })
        // the turn: hearts when they get each other
        if (t >= doneOf(BOX_G, 1) && t < T.lesson + 1) { drawHearts(x, t, doneOf(BOX_G, 1), V_HOME.x + closer(t), V_HOME.y - 140, { n: 5 }); drawHearts(x, t, doneOf(BOX_G, 1) + 0.1, S_HOME.x - closer(t), S_HOME.y - 140, { n: 5 }) }
        confetti(x, t, T.booked, { x0: 540, y0: 820, n: 40, seed: 4, life: 2.2, up: 0.6 })
        // swap back?: the shooting star swings by again
        shootingStar(x, t, ...T.star3, { x: -120, y: 640, arc: 140 }, { x: 1180, y: 560 }, { size: 46 })
        if (inR(t, T.star3[1], T.star3[1] + 1.4)) floatWord(x, t, T.star3[1] - 0.1, 'swap?', 880, 540, { col: GOLD, size: 46 })
        drawZap(t)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// ── sound (pop / pluck / bell are written in D major and follow the key; chips are written in E major directly)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const E = { E4: 329.63, Gs4: 415.3, B4: 493.88, E5: 659.25, Fs5: 739.99, Gs5: 830.61, A5: 880, B5: 987.77, Cs6: 1108.73, E6: 1318.51, B6: 1975.53 }
const FX = { rev: 0.08, dly: 0, bus: 'fx' }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chip = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.035, duty: 0.25, decay: 0.08, sustain: 0.6, ...FX, ...o }]
const faint = t => [chip(t, E.B5, 0.35, { slide: -24, gain: 0.03, duty: 0.5 }), ['tom', +(t + 0.32).toFixed(3), 90, { gain: 0.26 }], ['tick', +(t + 0.32).toFixed(3), 0.04]]
const getUp = t => [chip(t, E.E5, 0.12, { slide: 12, gain: 0.025 }), ['pop', +(t + 0.2).toFixed(3), 880, 0.03, 0]]
const shoot = (t, pan) => [['whoosh', +t.toFixed(3), 0.9, 0.06], ['bell', +(t + 0.3).toFixed(3), 1760, 0.03, 1.4, pan], ['glitter', +(t + 0.1).toFixed(3), +(t + 0.9).toFixed(3)]]
const ring = t => Array.from({ length: 12 }, (_, i) => chip(t + i * 0.05, i % 2 ? E.B6 : E.E6, 0.04, { gain: 0.015, pan: 0.6 }))
const rooster = t => [chip(t, E.E5, 0.12, { gain: 0.03, duty: 0.5 }), chip(t + 0.14, E.Gs5, 0.12, { gain: 0.03, duty: 0.5 }), chip(t + 0.3, E.B5, 0.5, { gain: 0.03, duty: 0.5, slide: -3, vib: 0.05 })]
const tickOff = t => [['pop', +t.toFixed(3), 1318.51, 0.04, -0.3], chip(t, E.B5, 0.06, { gain: 0.025 }), chip(t + 0.06, E.E6, 0.1, { gain: 0.025 })]

export const CUES = [
  // 0 · the square
  ...head(T.h0, 3, T.h0Land, 0), ['whoosh', T.sqLine[0], 0.35, 0.03], ['pop', T.sqLine[1], 523.25, 0.03, 0],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.twitch[0] + i * 0.15).toFixed(3), 0.03]), chip(T.twitch[0], 1600, 0.6, { wave: 'noise', gain: 0.012, decay: 0.5, sustain: 0.5 }),
  // 1 · the wish
  ...head(T.h1, 3, T.h1Land, 2), ...shoot(T.star1[0], -0.4),
  ...[0, 1, 2].map(i => ['bell', +(T.l2 + 0.05 + i * 0.12).toFixed(3), [1174.66, 1318.51, 1567.98][i], 0.012, 1.2, -0.3]),
  ...[0, 1, 2].map(i => ['bell', +(T.l3 + 0.05 + i * 0.12).toFixed(3), [1318.51, 1567.98, 1760][i], 0.012, 1.2, 0.3]),
  ...[0, 1, 2, 3].map(i => chip(T.doze + 0.2 + i * 0.45, E.E5 * (i % 2 ? 0.75 : 1), 0.3, { gain: 0.012, duty: 0.5, slide: -3 })),
  // 2 · ZAP
  ['riser', T.swoop[0] - 0.2, ZAP, 0.08], ['whoosh', T.swoop[0], 0.65, 0.07],
  ['boom', ZAP, 0.4], ['crash', ZAP, { gain: 0.07, len: 2.4 }], ['glitter', ZAP, ZAP + 0.9], ['bell', ZAP + 0.02, 1760, 0.05, 1.8, 0],
  chip(ZAP, E.E6, 0.5, { slide: -36, gain: 0.04, duty: 0.5 }), chip(ZAP + 0.05, 2400, 0.3, { wave: 'noise', gain: 0.04, decay: 0.2, sustain: 0.3 }),
  ['whoosh', T.fly[0] + 0.1, 0.6, 0.05], ['pop', T.fly[1] - 0.02, 659.25, 0.045, -0.4], ['pop', T.fly[1], 880, 0.045, 0.4],
  ['pop', T.hz, 1174.66, 0.06, 0], ['pluck', T.hz, 1174.66, 0.05, 0.8, 0],
  // 3 · next morning
  ...rooster(T.sun[0] + 0.2), ...head(T.h3, 2, T.h3Land, 1), ['pluck', T.h3Land + 0.1, 1318.51, 0.04, 0.6, 0],
  ['pop', T.wake, 1318.51, 0.05, -0.3], ['pop', T.wake + 0.12, 1318.51, 0.05, 0.3], chip(T.wake, E.B5, 0.18, { slide: 14, gain: 0.03 }),
  // 4 · the rules
  ...head(T.h4, 1, T.h4Land, 3), ['whoosh', T.rules[0], 0.4, 0.04],
  ['boom', T.row1, 0.12], ['pop', T.row1, 523.25, 0.05, -0.2], ['boom', T.row2, 0.12], ['pop', T.row2, 587.33, 0.05, 0.2],
  ...faint(T.faintV), ...faint(T.faintS), ...faint(T.faintP), ...getUp(T.upV[0]), ...getUp(T.upS[0]), ...getUp(T.upP[0]),
  // 5 · Virgo vs spontaneity
  ...head(T.h5, 2, T.h5Land, 4), ['pop', T.note[0] + 0.05, 880, 0.04, -0.4],
  ...tickOff(T.tick1), chip(T.tick1 + 0.05, E.E5, 0.45, { slide: 24, gain: 0.03, duty: 0.5 }),
  ...tickOff(T.tick2), chip(T.tick2 + 0.05, E.E5, 0.3, { slide: 12, gain: 0.022, duty: 0.5 }),
  ...tickOff(T.tick3), ...faint(T.faint2), ...getUp(T.up2[0]),
  // 6 · Sag vs a reservation
  ...head(T.h6, 3, T.h6Land, 0), ...ring(T.ring[0]), ...ring(T.ring[0] + 0.75), ['pop', T.phone, 659.25, 0.035, 0.4],
  ['whoosh', T.l7 + 0.35, 0.35, 0.03],
  ['riser', T.spin[0] - 0.4, T.booked, 0.04], ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.spin[0] + i * 0.06).toFixed(3), 0.025]),
  ['bell', T.booked, 1174.66, 0.05, 1.6, 0], ['pluck', T.booked + 0.08, 1479.98, 0.04, 0.6, 0], ['glitter', T.booked, T.booked + 0.7], ['clap', T.booked + 0.05, { gain: 0.12, pan: -0.3, rev: 0.25, bus: 'fx' }],
  // 7 · the date
  ...head(T.h7, 3, T.h7Land, 2), ['pop', T.table[0] + 0.05, 440, 0.04, 0], ['whoosh', T.vOut[0], 0.35, 0.04],
  ['whoosh', T.vIn[0], 0.4, 0.05], ...[0, 1, 2].map(i => ['tick', +(T.vIn[0] + 0.1 + i * 0.12).toFixed(3), 0.03]), ['pop', T.vIn[1], 783.99, 0.04, -0.4],
  ['whoosh', T.give[0] + 0.1, 0.3, 0.03], ['pluck', T.give[1], 1318.51, 0.045, 0.7, 0.3], ['glitter', T.give[1], T.give[1] + 0.5],
  // 8 · the turn
  ...head(T.h8, 1, T.h8Land, 1), chip(T.h8Land + 0.05, E.Gs5, 0.6, { gain: 0.02, duty: 0.5, vib: 0.04, decay: 0.5 }),
  ['bell', doneOf(BOX_G, 1) + 0.05, 1318.51, 0.04, 1.6, -0.3], ['bell', doneOf(BOX_G, 1) + 0.17, 1567.98, 0.035, 1.6, 0.3], ['glitter', doneOf(BOX_G, 1), doneOf(BOX_G, 1) + 0.7],
  ['pop', T.sqBack, 880, 0.035, 0], ['pop', T.plan[0] + 0.05, 1174.66, 0.04, 0], ...tickOff(T.plan[0] + 0.3), ...tickOff(T.plan[0] + 0.5),
  // 9 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'E' }),
  // 10 · the reading
  ...head(T.h9, 3, T.h9Land, 1), ['whoosh', T.panel[0] + 0.1, 0.4, 0.04],
  ...T.arcs.flatMap((a, i) => [['whoosh', a + 0.2, 0.4, 0.025], ['pluck', +(a + 0.42).toFixed(3), [1046.5, 1318.51, 1567.98][i], 0.035, 0.6, (i - 1) * 0.3]]),
  ['whoosh', T.panelOut[0] + 0.1, 0.3, 0.03],
  // 11 · swap back?
  ...wordPops(T.h10, 2, 0.07, 3), ...shoot(T.star3[0], 0.4), ['pop', T.h10Land, 1174.66, 0.05, 0], ['pluck', T.h10Land + 0.1, 1318.51, 0.045, 0.6, 0],
  ['pop', T.wink, 1567.98, 0.04, -0.3], ['pop', T.wink + 0.12, 1567.98, 0.04, 0.3], ['whoosh', T.out[0], 0.35, 0.03],
  // the dialogue
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [V_TAG]: 1046.5, [V2_TAG]: 1046.5, [S_TAG]: 659.25, [S2_TAG]: 659.25, [R_TAG]: 440 } })),
  ...cardCutCues(CUTS()),
  ...endcardCues(STORY_END),
]
