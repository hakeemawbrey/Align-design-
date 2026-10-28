// stick — "Is it, though?" (45 s vertical Align ad, Star Talk season 3 #7, music: pop · A). Story 0–40.6, then the end card.
//   0.0–4.6    "He clapped when | the plane *landed.*"  A chubby pixel plane touches down; *clap* *clap* *clap* pops out of
//              it. ♎ LIBRA watches with heart-eyes… that go flat on the third clap, and its little gold scales tip hard
//              (clunk). LIBRA: "it's over. I have the ick."
//   4.6–14.5   "Ick court is | now in *session.*"  The hook set drops away and the sky convenes ICK COURT around Libra: the
//              bench slams down, ♑ CAPRICORN pops up in a judge's wig, the easel springs up (LIBRA v. HIM), the gallery
//              (♌ Leo, ♏ Scorpio, ♉ Taurus, ♓ Pisces with tissues) pops up over the rail. BANG: the drop.
//              Libra presents: A "expresso" (cup, the X circled) · B he runs for the bus · C he said "yummy". The gallery
//              gasps louder each time (Leo's crown pops off; Pisces cries because the bus guy is adorable). The twist:
//              Taurus, small: "…i say yummy." Everyone turns. Taurus sinks. Gavel.
//  14.55       card cut (flip): the tables turn.
//  14.6–23.8   "The court calls | *Libra.*"  THE STARS float down, deadpan: "babe. you clap at the end of movies."
//              The board flips through Libra's own file: D claps at the movies · E baby-talks dogs · F SAME FLIGHT (Libra
//              in the window, clapping). Double-takes, a huge gasp, Leo faints. The music tape-stops. LIBRA, sweating:
//              "...that's different."  Crickets. THE STARS, a slow blink: "is it, though?"  Synced eye-roll, bwomp.
//  23.85–27.5  "The *verdict.*"  Drumroll, the gavel comes down: ICK: DISMISSED stamps the board. Cheers; Leo comes to.
//  27.55       card cut (deal) into ★ LESSON UNLOCKED: "Everyone's a | little cringe. | Look for *kind.*" (+1 GRACE)
//              The court is struck under the cut, so the lesson plays over clean sky (Libra dimmed, looking up).
//  32.0–37.3   "Card first. | Face *last.*"  A mystery card deals in and flips (face veiled). THE STARS: "get to know them
//              before the little things." His card's line: "I always clap for the pilot. Someone should." Libra's eyes
//              go soft, its scales level out (ding), and it claps too: *clap* *clap*.
//  37.4–40.42  "Give the ick | a *minute.*"  Pisces pops up, sobbing into a tissue. Everything pops out by 40.42; the
//              end card takes over at 40.6.
// One canvas (sky + world-space set and cast + screen-space bits), DOM type + dialogue boxes + the shared lesson, grain.
// Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawScales, drawGavel, drawSoundBlock, drawWig, drawBench, drawLectern, drawRail, drawEaselLegs, drawPlane, drawRunway,
  drawBus, drawRunner, drawCup, drawPlate, drawDog, drawSeats, drawBubble, drawTear, drawSweat, drawCrown, drawTissue, drawStamp } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#e8344e', INK = '#1b1236', SKYBLUE = '#7fd0f0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid
export const KEY = 'A'

const LIB = signStar('libra'), CAP = signStar('capricorn'), LEO = signStar('leo'), SCO = signStar('scorpio'), TAU = signStar('taurus'), PIS = signStar('pisces')
const LIB_T = '#f59ae9'                      // Libra's name-tag / accent tint

// ── the timeline
export const T = {
  black: [0, 0.3],
  // the hook
  h0: 0.12, h0Land: 0.95, h0Out: [4.42, 4.6],
  plane: [0.0, 0.95], taxi: [0.95, 1.75], claps: [1.22, 1.56, 1.9], flat: 1.9, tip: 2.14, l1: 2.38,
  hookOut: [4.42, 4.72],
  // ick court
  hop: [4.55, 4.98], bench: [4.6, 4.84], easel: [4.66, 4.96], rail: [4.68, 4.94], lect: [4.84, 5.06], capUp: [4.78, 5.0], gal: 4.92,
  h1: 4.66, bang1: BEAT(8),                                   // 5.044: the gavel = the drop
  exA: 5.75, l2: 6.0, exB: 8.7, l3: 8.78, exC: 11.42, l4: 11.56,
  yum: [13.0, 14.36], stareTau: 13.45, sink: [13.6, 13.9], bangO: 14.0,
  h1Out: [14.22, 14.4],
  cut1: 14.55,
  // the tables turn
  starsIn: [14.6, 15.12], h2: 14.68, h2Land: 15.0,
  l5: 15.2, exD: 15.5, claps2: [15.85, 16.2, 16.55], lookD: 16.78, exE: 16.98, lookE: 17.8, exF: 18.36, claps3: [18.62, 18.9],
  gaspF: 19.02, faint: [19.06, 19.5], freeze: 19.1,
  l6: 19.3, crk: [20.15, 20.95], blink: [20.62, 21.42], l7: 21.6, roll: 22.5, close1: 23.72,
  h2Out: [23.58, 23.76],
  // the verdict
  h3: 23.85, h3Land: 24.15, raise: [23.95, 24.62], roll2: [23.98, BEAT(44)], bang2: BEAT(44),   // 25.044
  cheer: [25.1, 26.9], leoUp: 25.3, h3Out: [27.22, 27.4],
  cut2: 27.55,
  // the lesson
  lesson: BEAT(49), lessonOut: [31.8, 32.0],                  // 27.822
  strike: [27.549, 27.55], glide: [27.549, 27.55],          // struck under the card cut: the lesson plays over clean sky
  // card first, face last
  h4: 32.05, h4Land: 32.4, deal: [31.86, 32.26], flip: [32.26, 32.6], l8: 32.75, quote: 34.6, soft: 35.15, level: 35.55,
  claps4: [36.05, 36.4], close2: 36.6, h4Out: [37.12, 37.3],
  // the last line
  h5: 37.42, h5Land: 37.8, pisUp: 37.95, out: [40.02, 40.42], h5Out: [40.18, 40.42],
}
const GASP = []   // filled below from the typing schedule: the gallery gasps as each exhibit line finishes

// ── the lines
const SL = `${LIB.glyph}︎ LIBRA`, SS = 'THE STARS'
const LINES1 = [
  { t: T.l1, speaker: SL, color: LIB_T, text: "it's over. I have the *ick.*" },
  { t: T.l2, speaker: SL, color: LIB_T, text: "exhibit A: he says *'expresso.'*" },
  { t: T.l3, speaker: SL, color: LIB_T, text: 'exhibit B: he *runs* for the bus.' },
  { t: T.l4, speaker: SL, color: LIB_T, text: "exhibit C: he said *'yummy.'*" },
  { t: T.l5, speaker: SS, color: GOLD, text: 'babe. you clap at the end of *movies.*' },
  { t: T.l6, speaker: SL, color: LIB_T, text: "...that's *different.*" },
  { t: T.l7, speaker: SS, color: GOLD, text: 'is it, *though?*' },
]
const LINES2 = [{ t: T.l8, speaker: SS, color: GOLD, text: 'get to know them before the *little things.*' }]
const CPS = 28
export const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
GASP.push(+(LT1[1].done + 0.06).toFixed(3), +(LT1[2].done + 0.06).toFixed(3), +(LT1[3].done + 0.06).toFixed(3))
const HOPS = { lib: talkHops(LINES1, SL, { cps: CPS }), stars: [...talkHops(LINES1, SS, { cps: CPS }), ...talkHops(LINES2, SS, { cps: CPS })] }

const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Everyone’s a | little cringe. | Look for *kind.*', chip: '+1 GRACE', accentColor: GOLD, dim: 0.6 }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inW = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
/** keyed state: the last entry with key ≤ t */
const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }
/** a damped spring step 0 → 1 (overshoots) */
const springStep = (d, w = 22, k = 7) => d <= 0 ? 0 : 1 - Math.exp(-d * k) * Math.cos(d * w)

// ── where things are (world coords == screen coords at the rest camera)
const HOOK_LIB = [300, 1150, 340], COURT_LIB = [205, 1045, 250], TIE_LIB = [235, 1150, 280]
const CAP_P = [540, 572, 200]
const STARS_P = [905, 600, 190], STARS_TIE = [935, 560, 150]
const GAL = { leo: [115, 1302, 140], sco: [335, 1302, 140], tau: [745, 1302, 140], pis: [965, 1302, 140] }
const BENCH = { x: 540, y: 632, w: 430, h: 150 }
const BOARD = { cx: 690, cy: 1000, w: 600, h: 420 }
const RAIL_Y = 1352
const LECT = { x: 205, y: 1132, w: 170, h: 200 }
const RUNWAY_Y = 1400
const CARD = { cx: 665, cy: 1015, w: 470, h: 690 }
const SEED = { lib: 5, cap: 3, stars: 9, leo: 13, sco: 7, tau: 17, pis: 23 }

// the scales: how far they tip (+ = his side, the right pan, goes down)
const SCALE_KEYS = [[T.tip, 0.42], [GASP[0], 0.48], [GASP[1], 0.54], [GASP[2], 0.6], [16.0, 0.36], [17.4, 0.12], [T.gaspF - 0.12, -0.46], [T.bang2, 0.04], [T.level, 0]]
function scaleAng(t) {
  let a = 0, prev = 0
  for (const [tk, v] of SCALE_KEYS) { if (t < tk) break; a = prev + (v - prev) * springStep(t - tk, tk === T.tip ? 26 : 20, tk === T.tip ? 5 : 6); prev = v }
  if (t < T.tip) a += 0.05 * Math.sin(t * 2.4)
  if (t >= T.l6 && t < T.bang2) a += 0.05 * Math.sin((t - T.l6) * 9) * Math.exp(-(t - T.l6) * 0.6)
  if (t >= T.bang2 && t < T.level) a += 0.06 * Math.sin(t * 2.2) * clamp((t - T.bang2 - 1) * 0.6)
  return a
}

// ── moods: [t, { mood, look, blink, sq, dy }]
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const LIB_K = [
  [0, S_('heart', [1, 0])], [T.claps[1], S_('heart', [1, 0], { sq: 0.05 })], [T.flat, S_('neutral', [1, 0], { blink: 0.55, sq: 0.07, dy: 8 })],
  [T.l1, S_('neutral', [0, 0], { blink: 0.55, sq: 0.04, dy: 4 })],
  [T.hop[0], S_('wide', [0, -1], { blink: false })], [T.bang1 + 0.05, S_('wide', [1, 0], { blink: false, sq: 0.08 })], [T.bang1 + 0.4, S_('squint', [1, 0])],
  [T.l2, S_('squint', [1, 0])], [GASP[0], S_('happy', [1, 0])], [T.exB, S_('squint', [1, 0])], [GASP[1], S_('happy', [1, 0])],
  [T.exC, S_('squint', [1, 0])], [GASP[2], S_('happy', [1, 0])], [T.stareTau, S_('neutral', [1, 1])], [T.bangO, S_('wide', [1, -1], { blink: false })], [T.bangO + 0.4, S_('neutral', [1, 0])],
  [T.cut1, S_('neutral', [1, -1])], [T.l5, S_('wide', [1, -1], { blink: false })], [T.exD + 0.3, S_('wide', [1, 0], { blink: false })],
  [T.lookD, S_('neutral', [1, -1], { blink: 0.4, sq: 0.03 })], [T.exE + 0.25, S_('wide', [1, 0])], [T.lookE, S_('neutral', [0, 1], { blink: 0.4, sq: 0.05, dy: 4 })],
  [T.exF + 0.2, S_('wide', [1, 0], { blink: false })], [T.gaspF, S_('wide', [1, 0], { blink: false, sq: -0.07 })],
  [T.l6, S_('neutral', [-1, 0], { blink: 0.25, sq: 0.03 })], [20.2, S_('neutral', [-1, -1], { blink: 0.25 })], [20.7, S_('neutral', [1, -1], { blink: 0.25 })],
  [T.l7, S_('wide', [1, -1], { blink: false })], [T.roll, S_('neutral', [0, 1], { blink: 0.5, sq: 0.12, dy: 14 })],
  [T.h3, S_('wide', [1, -1], { blink: false, sq: 0.06, dy: 6 })], [T.bang2, S_('wide', [1, -1], { blink: false, sq: -0.05 })], [T.bang2 + 0.35, S_('happy', [0, 0])], [26.3, S_('sparkle', [0, -1])],
  [T.glide[0], S_('neutral', [0, -1])], [T.lesson + 1.05, S_('sparkle', [0, -1])], [T.lessonOut[0], S_('neutral', [1, 0])],
  [T.flip[0], S_('wide', [1, 0])], [T.flip[1] + 0.3, S_('neutral', [1, 0])], [T.l8, S_('neutral', [1, -1])], [33.9, S_('neutral', [1, 0])],
  [T.quote, S_('wide', [1, 0], { blink: false })], [T.soft, S_('sparkle', [1, 0])], [T.claps4[0] - 0.1, S_('happy', [0, 0])], [36.9, S_('sparkle', [1, 0])],
  [T.h5, S_('sparkle', [0, 0])], [38.7, S_('happy', [0, 0])], [39.4, S_('sparkle', [1, 0])],
]
const CAP_K = [
  [0, S_('squint', [0, 0])], [T.capUp[0], S_('wide', [0, 0], { blink: false })], [T.bang1, S_('squint', [0, 0])], [T.bang1 + 0.5, S_('squint', [1, 1])],
  [GASP[0], S_('neutral', [0, 1])], [GASP[0] + 0.8, S_('squint', [1, 1])], [GASP[1], S_('neutral', [-1, 1])], [GASP[1] + 0.8, S_('squint', [1, 1])],
  [GASP[2], S_('neutral', [0, 1], { blink: 0.4 })], [T.stareTau, S_('squint', [1, 1])], [T.bangO - 0.15, S_('squint', [0, 0], { sq: -0.05 })], [T.bangO + 0.3, S_('squint', [0, 0])],
  [T.cut1, S_('neutral', [1, 0])], [T.l5 + 0.4, S_('squint', [-1, 1])], [T.gaspF, S_('wide', [-1, 1], { blink: false })],
  [T.l6, S_('squint', [-1, 1])], [T.roll, S_('eyeroll', [0, -1])], [T.roll + 0.8, S_('squint', [-1, 1])],
  [T.raise[0], S_('neutral', [0, 0], { blink: false })], [T.bang2, S_('happy', [0, 0], { sq: 0.06 })], [T.bang2 + 0.5, S_('happy', [0, 0])], [26.4, S_('wink', [0, 0])], [27.0, S_('happy', [0, 0])],
]
const STARS_K = [
  [0, S_('neutral', [-1, 1], { blink: 0.45 })], [T.l5, S_('neutral', [-1, 1], { blink: 0.45 })], [T.lookD, S_('neutral', [-1, 1], { blink: 0.45 })],
  [T.l6, S_('neutral', [-1, 1], { blink: 0.45 })], [T.l7, S_('neutral', [-1, 1], { blink: 0.5 })], [T.roll, S_('neutral', [-1, 1], { blink: 0.55 })],
  [T.h3, S_('neutral', [-1, 0], { blink: 0.45 })], [T.bang2, S_('happy', [0, 0])], [26.6, S_('wink', [-1, 0])], [27.1, S_('happy', [0, 0])],
  [T.glide[0], S_('happy', [0, -1])], [T.flip[1], S_('neutral', [-1, 1])], [T.l8, S_('happy', [-1, 1])], [34.4, S_('neutral', [-1, 1])], [T.soft, S_('sparkle', [-1, 1])],
  [T.h5, S_('happy', [0, 0])], [38.9, S_('wink', [0, 0])], [39.5, S_('happy', [0, 0])],
]
// the gallery: watching the board, gasping, double-taking at Libra, rolling their eyes in sync, cheering
const toBoard = { leo: [1, -1], sco: [1, -1], tau: [0, -1], pis: [-1, -1] }
const toLib = { leo: [1, -1], sco: [-1, -1], tau: [-1, -1], pis: [-1, -1] }
const toStars = { leo: [1, -1], sco: [1, -1], tau: [1, -1], pis: [0, -1] }
const toTau = { leo: [1, 0], sco: [1, 0], tau: [0, 0], pis: [-1, 0] }
const toCap = { leo: [1, -1], sco: [1, -1], tau: [-1, -1], pis: [-1, -1] }
function galState(id, t) {
  const B = toBoard[id]
  if (t < T.gal + 0.3) return S_('wide', B)
  // the court: gasps
  for (let i = 0; i < 3; i++) if (inW(t, GASP[i], GASP[i] + 0.75)) {
    if (id === 'pis' && i === 1) return S_('sparkle', [-1, -1])
    return S_('wide', B, { blink: false, sq: -0.06 * bump(t, GASP[i], 0.4) })
  }
  if (id === 'pis' && inW(t, GASP[1] + 0.75, T.exC)) return S_('sparkle', [-1, -1])
  if (t >= GASP[2] + 0.75 && t < T.bangO) {
    if (id === 'tau') return t < T.stareTau ? S_('neutral', [Math.floor(t * 4) % 2 ? 1 : -1, 0], { blink: false }) : S_('neutral', [0, 1], { blink: 0.35 })
    if (t >= T.stareTau) return S_('squint', toTau[id])
    return S_('neutral', B)
  }
  if (inW(t, T.bangO, T.bangO + 0.45)) return S_('wide', [0, -1], { blink: false, sq: -0.1 * bump(t, T.bangO, 0.35) })
  if (t < T.cut1) return S_('neutral', B)
  // the cross-examination
  if (t < T.exD + 0.2) return S_('neutral', toStars[id])
  if (t < T.lookD) return S_('neutral', B)
  if (t < T.exE + 0.15) return S_('wide', toLib[id], { blink: false })
  if (t < T.lookE) return id === 'pis' ? S_('heart', B) : S_('neutral', B)
  if (t < T.exF + 0.15) return id === 'pis' ? S_('sparkle', toLib[id]) : S_('wide', toLib[id], { blink: false })
  if (t < T.gaspF) return S_('neutral', B)
  if (t < T.l6) return S_('wide', B, { blink: false, sq: -0.08 * bump(t, T.gaspF, 0.4) })
  if (t < T.roll) return S_('neutral', toLib[id], { blink: false })
  if (t < T.roll + 0.85) return S_('eyeroll', [0, -1])
  if (t < T.h3) return S_('neutral', toLib[id], { blink: 0.4 })
  // the verdict
  if (t < T.bang2) return S_('wide', toCap[id], { blink: false })
  if (t < T.bang2 + 0.3) return S_('wide', [0, -1], { blink: false, sq: -0.08 })
  if (id === 'pis') return S_('sparkle', [0, 0])
  return S_(t < 26.2 ? 'happy' : (id === 'sco' ? 'wink' : 'happy'), [0, 0])
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "600 32px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type (DOM, above the canvas)
  const H0 = popText(root, 'He clapped when | the plane *landed.*', { top: 172, size: 100, accentSize: 140, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.08, accentColor: SKYBLUE })
  const H1 = popText(root, 'Ick court is | now in *session.*', { top: 172, size: 104, accentSize: 146, at: T.h1, late: 1, lateAt: T.bang1, wobble: true, gap: 0.07, accentColor: GOLD })
  const H2 = popText(root, 'The court calls | *Libra.*', { top: 172, size: 104, accentSize: 168, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.07, accentColor: LIB_T })
  const H3 = popText(root, 'The *verdict.*', { top: 200, size: 124, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: RED })
  const H4 = popText(root, 'Card first. | Face *last.*', { top: 172, size: 108, accentSize: 160, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: PINK })
  const H5 = popText(root, 'Give the ick | a *minute.*', { top: 172, size: 112, accentSize: 172, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, gap: 0.08, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1478, width: 960, height: 290, open: T.l1 - 0.24, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1478, width: 960, height: 290, open: T.l8 - 0.24, close: T.close2, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── camera: (fx, fy) maps to the screen (540, 1000) at scale s
  function cam(t) {
    let s = 1, fx = 540, fy = 1000
    if (t < T.hookOut[0]) { s = 1 + 0.035 * ease.inOutQuad(prog(t, 0.4, 4.3)); fx = 520; fy = 1040 }
    else if (t < T.cut1) { for (const g of GASP) s += 0.03 * bump(t, g, 0.35); s += 0.025 * bump(t, T.bang1, 0.3) }
    else if (t < T.h3) {
      s = 1 + 0.03 * bump(t, T.gaspF, 0.4)
      const k = ease.inOutCubic(prog(t, T.l6, T.l7 + 0.4)) * (1 - ease.inOutCubic(prog(t, T.roll + 0.3, T.h3)))
      s += 0.06 * k; fx = lerp(540, 548, k); fy = lerp(1000, 935, k)
    } else {
      // the verdict: push in so the court fills the frame (the box is shut), then ease back under the lesson
      const k = t < T.cut2 ? ease.inOutCubic(prog(t, T.h3, T.bang2 - 0.15)) : 0
      s = 1 + 0.1 * k + 0.035 * bump(t, T.bang2, 0.4); fx = lerp(540, 556, k); fy = lerp(1000, 925, k)
    }
    return { s, fx, fy }
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.bang1, 14], [T.bangO, 8], [T.tip, 5], [T.bang2, 18], [T.bench[1], 6]]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }

  // ── little helpers drawn on the canvas
  /** an onomatopoeia ("*clap*", "*gasp*") popping up and drifting, with a dark outline so it reads anywhere */
  function ono(text, px, py, t, t0, { size = 46, color = BONE, rot = 0, life = 0.95, rise = 46, ticks = true } = {}) {
    const k = t - t0
    if (k < 0 || k > life) return
    const p = easeOutBack(prog(k, 0, 0.2), 2.6), fade = 1 - prog(k, life - 0.25, life)
    x.save(); x.translate(px, py - rise * ease.outCubic(k / life)); x.rotate(rot); x.scale(p, p); x.globalAlpha *= fade
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = size * 0.2; x.strokeStyle = 'rgba(10,6,24,0.9)'; x.strokeText(text, 0, 0)
    x.fillStyle = color; x.fillText(text, 0, 0)
    if (ticks) {
      const w = x.measureText(text).width / 2 + size * 0.3, q = prog(k, 0, 0.3)
      x.fillStyle = color; x.globalAlpha *= 1 - q
      for (const [dx, dy, a] of [[-w, -size * 0.45, -0.6], [w, -size * 0.45, 0.6], [-w - 6, size * 0.25, -2.6], [w + 6, size * 0.25, 2.6]]) {
        x.save(); x.translate(dx * (1 + 0.2 * q), dy); x.rotate(a); x.fillRect(-3, -size * 0.28, 6, size * 0.32); x.restore()
      }
    }
    x.restore()
  }
  function sparkleRing(t, cx, cy, t0, n, R, seed, life = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p) * 0.8, 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }
  /** tears arcing out of both eyes from t0 on (pure f(t)) */
  function tears(cx, cy, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 34)
    for (const side of [-1, 1]) {
      const ex = cx + side * size * 0.13, ey = cy + size * 0.04
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = side * (110 + ((k * 37) % 5) * 24) * spread * size / 200, vy = -(150 + ((k * 53) % 4) * 36) * size / 200
        drawTear(x, ex + vx * a, ey + vy * a + 800 * a * a, px)
      }
    }
  }

  // ── a character
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1, rot = 0 } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    const col = { lib: LIB, cap: CAP, leo: LEO, sco: SCO, tau: TAU, pis: PIS }[id]
    x.save()
    if (rot) { x.translate(px0, py0 + sz * 0.4); x.rotate(rot); x.translate(-px0, -(py0 + sz * 0.4)) }
    const r = drawStarChar(x, px0, py0 + (st.dy || 0), sz, t, { color: id === 'stars' ? STAR.sky : col.color, glyph: glyph && sz >= 120 && id !== 'stars' ? col.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id], pop, glow: 0.9, bob: sz * 0.03, alpha })
    x.restore()
    return { ...r, c: r.size / 36 }
  }

  // ── Libra's place
  function libPlace(t) {
    if (t < T.hop[0]) return HOOK_LIB
    if (t < T.hop[1]) { const p = prog(t, ...T.hop), e = ease.inOutCubic(p); return [lerp(HOOK_LIB[0], COURT_LIB[0], e), lerp(HOOK_LIB[1], COURT_LIB[1], e) - Math.sin(p * Math.PI) * 160, lerp(HOOK_LIB[2], COURT_LIB[2], e)] }
    if (t < T.glide[0]) return COURT_LIB
    const p = prog(t, ...T.glide), e = ease.inOutCubic(p)
    return [lerp(COURT_LIB[0], TIE_LIB[0], e), lerp(COURT_LIB[1], TIE_LIB[1], e) - Math.sin(p * Math.PI) * 80, lerp(COURT_LIB[2], TIE_LIB[2], e)]
  }
  function drawLibra(t) {
    const P = libPlace(t)
    const st = keyed(t, LIB_K)
    const hops = [...HOPS.lib, T.hop[1], T.bang2 + 0.08, T.bang2 + 0.62, ...GASP.map(g => g + 0.1), T.claps4[0], T.claps4[1], T.h5Land + 0.1]
    let sq = st.sq || 0
    for (const c of T.claps4) sq += 0.1 * bump(t, c - 0.04, 0.16)
    const k = popOut(t, T.out)
    const r = star('lib', P, t, { ...st, sq }, { pop: k, hops })
    if (!r) return null
    // the scales, floating above the top tip
    const spx = Math.max(3, Math.round(r.c * 0.62))
    const ang = scaleAng(t)
    const glint = t >= T.level ? 1 - prog(t, T.level + 0.1, T.level + 0.9) : 0
    drawScales(x, r.x, r.top - 13.5 * spx - r.c * 1.5, spx, ang, { alpha: clamp(k), glint: t >= T.level ? glint * (Math.floor(t * 12) % 2 ? 1 : 0.6) : 0 })
    if (t >= T.level && t < T.level + 0.7) sparkleRing(t, r.x, r.top - 9 * spx, T.level, 8, 70, 0.4, 0.7)
    // the callback: now Libra claps too
    T.claps4.forEach((c, i) => ono('*clap*', [150, 350][i], [1352, 1330][i], t, c, { size: 54, rot: [-0.12, 0.1][i], life: 1.05, rise: 26 }))
    // sweat: ...that's different
    if (t >= T.gaspF + 0.1 && t < T.h3 + 0.4) {
      const a = 1 - prog(t, T.h3, T.h3 + 0.4)
      for (let i = 0; i < 2; i++) {
        const ph = ((t - T.gaspF) * 0.7 + i * 0.5) % 1
        x.save(); x.globalAlpha = a * Math.min(1, ph * 6) * (1 - prog(ph, 0.8, 1))
        drawSweat(x, r.x + (i ? -0.36 : 0.34) * r.size, r.top + r.size * (0.3 + 0.25 * ph), Math.max(3, Math.round(r.c * 0.8)))
        x.restore()
      }
    }
    return r
  }

  // ── the hook set: the plane, the runway, the claps
  function planePose(t) {
    if (t < T.plane[1]) {
      const p = prog(t, ...T.plane), e = ease.outQuad(p)
      return { x: lerp(1460, 930, e), y: lerp(760, RUNWAY_Y, ease.inOutQuad(p)), tilt: p < 0.75 ? -0.13 : lerp(-0.13, 0.07, prog(p, 0.75, 1)), gear: clamp(p * 3) }
    }
    const p = prog(t, ...T.taxi)
    const bounce = -10 * Math.abs(Math.sin(Math.PI * prog(t, T.plane[1], T.plane[1] + 0.22))) * (t < T.plane[1] + 0.22 ? 1 : 0)
    return { x: lerp(930, 790, ease.outCubic(p)), y: RUNWAY_Y + bounce, tilt: 0.07 * (1 - ease.outCubic(prog(t, T.plane[1], T.plane[1] + 0.3))), gear: 1 }
  }
  function drawHookSet(t) {
    if (t >= T.hookOut[1]) return
    const drop = ease.inCubic(prog(t, ...T.hookOut)) * 900
    x.save(); x.translate(0, drop)
    drawRunway(x, 430, 1080, RUNWAY_Y, t)
    const P = planePose(t)
    // touchdown puffs: soft round clouds kicked up behind the main gear
    const td = t - T.plane[1]
    if (td >= 0 && td < 0.7) {
      x.save(); x.globalAlpha = 0.85 * (1 - td / 0.7)
      for (let i = 0; i < 4; i++) { const r0 = 12 + td * 50 + i * 5; x.fillStyle = i % 2 ? '#d9cdf0' : '#fbf6ec'; x.beginPath(); x.arc(P.x + 40 + i * 30 + td * 140, RUNWAY_Y - 10 - i * 6 - td * 20, r0, 0, Math.PI * 2); x.fill() }
      x.restore()
    }
    drawPlane(x, P.x, P.y, 9, { tilt: P.tilt, gear: P.gear })
    x.restore()
    // *clap* ×3 out of the cabin
    const spots = [[600, 1252, -0.12], [780, 1140, 0.05], [895, 1250, 0.12]]
    T.claps.forEach((c, i) => ono('*clap*', spots[i][0], spots[i][1] + drop, t, c, { size: 54 + i * 7, rot: spots[i][2], life: 1.7 - i * 0.2, rise: 30 }))
  }

  // ── the court set
  function drawCourtBack(t) {
    const strike = 1 - ease.inCubic(prog(t, ...T.strike))
    if (t < T.bench[0] || strike <= 0) return
    // bench: drops in from the top, lands with a squash
    const pb = prog(t, ...T.bench), by = BENCH.y - (1 - ease.inQuad(pb)) * 900, land = t - T.bench[1]
    const sq = land > 0 && land < 0.3 ? 0.06 * Math.exp(-land * 12) * Math.cos(land * 40) : 0
    x.save(); x.globalAlpha = strike; x.translate(BENCH.x, by + BENCH.h); x.scale(1 + sq, 1 - sq); x.translate(-BENCH.x, -(by + BENCH.h))
    // Capricorn sits behind it
    drawJudge(t, by)
    drawBench(x, BENCH.x, by, BENCH.w, BENCH.h)
    drawSoundBlock(x, BENCH.x + 150, by - 6, 4)
    drawGavelArm(t, by)
    x.restore()
  }
  let capR = null
  function drawJudge(t, by) {
    if (t < T.capUp[0]) { capR = null; return }
    const up = easeOutBack(prog(t, ...T.capUp), 2)
    const P = [CAP_P[0], CAP_P[1] + (by - BENCH.y) + (1 - up) * 140, CAP_P[2]]
    const st = keyed(t, CAP_K)
    const r = star('cap', P, t, st, { hops: [T.bang1 + 0.02, T.bangO, T.bang2 + 0.02] })
    if (!r) { capR = null; return }
    drawWig(x, r.x, r.top, r.c)
    capR = r
  }
  /** gavel pose: rest, raised, bang (on the block) */
  function gavelRot(t) {
    let rot = -0.55
    for (const b of [T.bang1, T.bangO]) {
      if (inW(t, b - 0.45, b)) rot = lerp(-0.55, -1.6, ease.outCubic(prog(t, b - 0.45, b - 0.12))) + lerp(0, 1.6 + 0.35, ease.inQuad(prog(t, b - 0.12, b)))
      if (inW(t, b, b + 0.4)) rot = 0.3 - 0.85 * ease.outCubic(prog(t, b + 0.05, b + 0.4))
    }
    if (inW(t, T.raise[0], T.bang2)) rot = t < T.bang2 - 0.1 ? lerp(-0.55, -1.75, ease.outBack(prog(t, ...T.raise))) + 0.04 * Math.sin(t * 30) * prog(t, T.raise[1], T.bang2) : lerp(-1.75, 0.3, ease.inQuad(prog(t, T.bang2 - 0.1, T.bang2)))
    if (inW(t, T.bang2, T.bang2 + 0.5)) rot = 0.3 - 0.85 * ease.outCubic(prog(t, T.bang2 + 0.1, T.bang2 + 0.5))
    return rot
  }
  function drawGavelArm(t, by) {
    if (!capR) return
    const gx = capR.x + capR.size * 0.4, gy = capR.y - capR.size * 0.04
    drawGavel(x, gx, gy, 4.2, gavelRot(t))
    // the bang: a white impact flash on the block
    for (const b of [T.bang1, T.bangO, T.bang2]) {
      const k = t - b
      if (k >= 0 && k < 0.25) {
        x.save(); x.globalAlpha = 1 - k / 0.25; x.fillStyle = '#fff6d0'
        const bx0 = BENCH.x + 150, by0 = by - 10
        for (const [dx, dy, w, h] of [[-46, -22, 16, 6], [36, -22, 16, 6], [-58, 0, 14, 6], [50, 0, 14, 6], [-6, -40, 6, 16]]) x.fillRect(bx0 + dx * (1 + k * 2), by0 + dy * (1 + k), w, h)
        x.restore()
      }
    }
  }

  // ── the exhibit board
  const EX = [[0, 'title'], [T.exA, 'A'], [T.exB, 'B'], [T.exC, 'C'], [T.cut1, 'title2'], [T.exD, 'D'], [T.exE, 'E'], [T.exF, 'F'], [T.h3 + 0.12, 'verdict']]
  function exAt(t) { let cur = EX[0]; for (const e of EX) if (t >= e[0]) cur = e; return cur }
  function drawBoardFrame(cx, cy, w, h, sx, dark) {
    const L = -w / 2, Tp = -h / 2
    x.save(); x.translate(cx, cy); x.scale(sx, 1)
    x.fillStyle = 'rgba(8,4,20,0.5)'; x.fillRect(L + 10, Tp + 14, w, h)
    x.fillStyle = '#1a1030'; x.fillRect(L - 6, Tp - 6, w + 12, h + 12)
    x.fillStyle = '#9a5a2c'; x.fillRect(L, Tp, w, h)
    x.fillStyle = '#c27a3e'; x.fillRect(L, Tp, w, 6); x.fillRect(L, Tp, 6, h)
    x.fillStyle = '#5e3216'; x.fillRect(L, Tp + h - 6, w, 6); x.fillRect(L + w - 6, Tp, 6, h)
    x.fillStyle = '#1a1030'; x.fillRect(L + 16, Tp + 16, w - 32, h - 32)
    x.fillStyle = dark ? '#16102e' : '#fbf3e2'; x.fillRect(L + 18, Tp + 18, w - 36, h - 36)
    x.restore()
  }
  function exTag(label, w, h, t, t0) {
    const k = pop01(t, t0 + 0.1, 0.3, 2.6)
    if (k <= 0) return
    x.save(); x.translate(-w / 2 + 92, -h / 2 + 12); x.rotate(-0.07); x.scale(k, k)
    x.fillStyle = '#1a1030'; x.fillRect(-82, -24, 164, 48)
    x.fillStyle = RED; x.fillRect(-79, -21, 158, 42)
    x.fillStyle = '#fff1ea'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText(label, 2, 2)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    // the pin
    x.fillStyle = '#1a1030'; x.fillRect(-6, -30, 12, 12); x.fillStyle = '#ffd23f'; x.fillRect(-4, -28, 8, 8)
    x.restore()
  }
  function caption(text, w, h, color = '#2a1846') {
    x.fillStyle = 'rgba(26,16,48,0.12)'; x.fillRect(-w / 2 + 18, h / 2 - 78, w - 36, 60)
    x.fillStyle = color; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    if ('letterSpacing' in x) x.letterSpacing = '2px'
    x.fillText(text, 0, h / 2 - 47)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
  }
  function vsCard(a, ac, b, bc, w, h) {
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(42,24,70,0.55)'; x.font = `700 20px ${MONO}`
    if ('letterSpacing' in x) x.letterSpacing = '4px'
    x.fillText('ICK COURT · CASE Nº 1', 0, -h / 2 + 54)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.font = `800 82px ${INTER}`; x.fillStyle = ac; x.fillText(a, 0, -64)
    x.font = `italic 500 60px ${SERIF}`; x.fillStyle = '#2a1846'; x.fillText('v.', 0, 10)
    x.font = `800 82px ${INTER}`; x.fillStyle = bc; x.fillText(b, 0, 84)
  }
  function exhibitArt(id, t, t0, w, h) {
    const iw = w - 36, ih = h - 36
    x.save(); x.beginPath(); x.rect(-iw / 2, -ih / 2, iw, ih); x.clip()
    if (id === 'title') vsCard('LIBRA', '#b0309f', 'HIM', '#3a5bd9', w, h)
    else if (id === 'title2') vsCard('THE STARS', '#b5740e', 'LIBRA', '#b0309f', w, h)
    else if (id === 'verdict') {
      x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = 'rgba(42,24,70,0.55)'; x.font = `700 20px ${MONO}`
      if ('letterSpacing' in x) x.letterSpacing = '4px'
      x.fillText('ICK COURT · THE VERDICT', 0, -h / 2 + 54)
      if ('letterSpacing' in x) x.letterSpacing = '0px'
      x.font = `800 40px ${INTER}`; x.fillStyle = 'rgba(42,24,70,0.4)'; x.fillText('LIBRA  v.  HIM', 0, -h / 2 + 108)
      x.fillStyle = 'rgba(42,24,70,0.12)'
      for (let k = 0; k < 4; k++) x.fillRect(-w / 2 + 70, -10 + k * 40, w - 140 - (k % 2) * 90, 6)
    }
    else if (id === 'A') {
      drawCup(x, -4, -24, 9, t)
      x.font = `800 84px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2a1846'
      const word = '“EXPRESSO”', ty = 92
      x.fillText(word, 0, ty)
      // circle the X (marker, drawn on)
      const full = x.measureText(word).width, pre = x.measureText('“E').width, xw = x.measureText('X').width
      const cxX = -full / 2 + pre + xw / 2, k = prog(t, GASP[0] - 0.55, GASP[0] - 0.15)
      if (k > 0) {
        x.strokeStyle = '#ff2e4f'; x.lineWidth = 8; x.lineCap = 'round'
        x.beginPath(); x.ellipse(cxX, ty + 2, xw * 0.82, 58, -0.1, -1.9, -1.9 + Math.PI * 2.15 * k); x.stroke()
      }
    } else if (id === 'B') {
      // the road + speed lines; the bus pulls away, he runs after it
      x.fillStyle = '#d9cdf0'; x.fillRect(-iw / 2, 96, iw, 8)
      for (let k = 0; k < 6; k++) { const lx = (-iw / 2 + ((k * 97 + (t - t0) * 260) % (iw + 120))) - 60; x.fillStyle = 'rgba(42,24,70,0.35)'; x.fillRect(iw / 2 - (lx + iw / 2) - 40, 112, 50, 5) }
      const bx = 108 + (t - t0) * 22
      for (let k = 0; k < 3; k++) { x.fillStyle = 'rgba(42,24,70,0.4)'; x.fillRect(bx - 186 - k * 14, -6 + k * 22, 40 - k * 6, 5) }
      drawBus(x, bx, 96, 7.4, t)
      const rx = -196 + Math.sin((t - t0) * 2.2) * 6
      drawRunner(x, rx, 96, 7, t)
      // dust puffs at his feet
      for (let k = 0; k < 3; k++) { const ph = ((t - t0) * 2.6 + k / 3) % 1; x.save(); x.globalAlpha = 0.6 * (1 - ph); x.fillStyle = '#c9c0d8'; x.fillRect(rx - 30 - ph * 50 - k * 6, 84 - ph * 16, 10 + ph * 10, 8); x.restore() }
      drawBubble(x, rx - 66, -132, 150, 64, { tail: 'down', tailX: 70, px: 5 })
      x.fillStyle = '#2a1846'; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WAIT!', rx + 9, -99)
    } else if (id === 'C') {
      drawBubble(x, -190, -150, 380, 120, { tail: 'down', tailX: 150, px: 6 })
      x.fillStyle = '#d0307a'; x.font = `800 74px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('yummy :)', 0, -88)
      drawPlate(x, 10, 92, 8)
    } else if (id === 'D') {
      // a cinema: THE END on the screen, two rows of seats, Libra popping up to clap
      x.fillStyle = '#efe6d6'; x.fillRect(-200, -150, 400, 168)
      x.fillStyle = 'rgba(255,240,200,0.35)'; x.fillRect(-200, -150, 400, 10)
      x.fillStyle = '#1a1030'; x.font = `italic 600 66px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('The End', 0, -66)
      // projector beam
      x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,240,200,0.06)'; x.beginPath(); x.moveTo(-200, -150); x.lineTo(200, -150); x.lineTo(40, 160); x.lineTo(-40, 160); x.closePath(); x.fill(); x.restore()
      const up = easeOutBack(prog(t, t0 + 0.15, t0 + 0.45), 2)
      drawSeats(x, 0, 52, iw - 40, 5, { n: 5 })
      const ms = drawStarChar(x, 0, 52 - 30 * up + (1 - up) * 50, 92, t, { color: LIB.color, mood: 'happy', blink: false, seed: 31, glow: 0.8, bob: 0, hops: T.claps2.map(c => c - 0.05) })
      void ms
      drawSeats(x, 0, 112, iw - 10, 5, { n: 5, color: '#8a1d33' })
      T.claps2.forEach((c, i) => ono('*clap*', [-112, 118, -10][i], [-12, -30, -40][i], t, c, { size: 34, rot: [-0.15, 0.12, -0.04][i], life: 0.8, rise: 22 }))
      caption('CLAPS AT MOVIES', w, h, '#fff1ea')
    } else if (id === 'E') {
      drawDog(x, 130, 98, 8, t)
      drawStarChar(x, -150, 30, 96, t, { color: LIB.color, mood: 'sparkle', look: [1, 0], seed: 32, glow: 0.8, bob: 3, hops: [t0 + 0.3, t0 + 0.6, t0 + 0.9] })
      drawBubble(x, -238, -158, 360, 104, { tail: 'down', tailX: 70, px: 5 })
      x.fillStyle = '#b0309f'; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('who’s a good', -58, -126); x.fillText('boy?? YOU ARE', -58, -84)
      caption('BABY-TALKS DOGS', w, h)
    } else if (id === 'F') {
      // the side of the same plane: three windows, Libra in the middle one, clapping
      x.fillStyle = '#c6d4ff'; x.fillRect(-iw / 2, -ih / 2, iw, ih)
      x.fillStyle = '#f6f2ff'; x.fillRect(-iw / 2, -150, iw, 230)
      x.fillStyle = '#5b7bff'; x.fillRect(-iw / 2, 52, iw, 18)
      for (const wx of [-180, 0, 180]) {
        x.fillStyle = '#1a1030'; x.beginPath(); x.roundRect(wx - 60, -128, 120, 156, 54); x.fill()
        x.fillStyle = wx === 0 ? '#ffe6a8' : '#8fdcff'; x.beginPath(); x.roundRect(wx - 50, -118, 100, 136, 46); x.fill()
      }
      x.save(); x.beginPath(); x.roundRect(-50, -118, 100, 136, 46); x.clip()
      drawStarChar(x, 0, -26, 96, t, { color: LIB.color, mood: 'happy', blink: false, seed: 33, glow: 0.6, bob: 0, hops: T.claps3.map(c => c - 0.05) })
      x.restore()
      T.claps3.forEach((c, i) => ono('*clap*', [-118, 120][i], [-120, -134][i], t, c, { size: 34, rot: [-0.12, 0.12][i], life: 0.9, rise: 20 }))
      const k = prog(t, T.gaspF - 0.5, T.gaspF - 0.1)
      if (k > 0) { x.strokeStyle = '#ff2e4f'; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.ellipse(0, -50, 92, 110, -0.08, -1.9, -1.9 + Math.PI * 2.15 * k); x.stroke() }
      caption('SAME FLIGHT.', w, h, '#d01c3c')
    }
    x.restore()
  }
  const EX_TAG = { A: 'EXHIBIT A', B: 'EXHIBIT B', C: 'EXHIBIT C', D: 'EXHIBIT D', E: 'EXHIBIT E', F: 'EXHIBIT F' }
  function drawEasel(t) {
    const strike = 1 - ease.inCubic(prog(t, ...T.strike))
    if (t < T.easel[0] || strike <= 0) return
    const up = easeOutBack(prog(t, ...T.easel), 1.7)
    const yoff = (1 - up) * 700
    const { cx, cy, w, h } = BOARD
    x.save(); x.globalAlpha = strike; x.translate(0, yoff)
    drawEaselLegs(x, cx, cy - h / 2, w, h, 6)
    // flip between exhibits: the board turns edge-on around its vertical axis and back
    const [t0, id] = exAt(t)
    const flipIn = t0 > 0 && t0 !== T.cut1 ? prog(t, t0, t0 + 0.16) : 1
    let sx = ease.outCubic(flipIn)
    const nxt = EX.find(e => e[0] > t)
    if (nxt && nxt[0] !== T.cut1 && t > nxt[0] - 0.14) sx = Math.min(sx, 1 - ease.inCubic(prog(t, nxt[0] - 0.14, nxt[0])))
    sx = Math.max(0.02, sx)
    const dark = id === 'D'
    drawBoardFrame(cx, cy, w, h, sx, dark)
    x.save(); x.translate(cx, cy); x.scale(sx, 1)
    exhibitArt(id, t, t0, w, h)
    if (EX_TAG[id]) exTag(EX_TAG[id], w, h, t, t0)
    // the verdict stamp lands on the board
    if (t >= T.bang2 - 0.06) {
      const k = prog(t, T.bang2 - 0.06, T.bang2)
      drawStamp(x, 0, 30, 480, 236, { k: 1, rot: -0.09, scale: lerp(2.6, 1, ease.inQuad(k)) + 0.05 * Math.exp(-(t - T.bang2) * 9) * Math.sin((t - T.bang2) * 40) })
    }
    x.restore()
    x.restore()
  }
  function drawRailAndGallery(t) {
    const strike = 1 - ease.inCubic(prog(t, ...T.strike))
    if (t < T.rail[0] || strike <= 0) return
    const up = ease.outBack(prog(t, ...T.rail))
    const ry = RAIL_Y + (1 - up) * 400
    // the gallery behind the rail
    const order = ['leo', 'sco', 'tau', 'pis']
    order.forEach((id, i) => {
      const t0 = T.gal + i * 0.07
      if (t < t0) return
      const P = [...GAL[id]]
      const upk = easeOutBack(prog(t, t0, t0 + 0.34), 2.2)
      P[1] += (1 - upk) * 150 + (ry - RAIL_Y)
      // Taurus sinks after "…i say yummy"
      if (id === 'tau') P[1] += 46 * ease.inOutCubic(prog(t, ...T.sink)) * (1 - ease.outBack(prog(t, T.bangO + 0.5, T.bangO + 0.9)))
      // Leo faints at SAME FLIGHT and comes to at the verdict
      let rot = 0
      if (id === 'leo' && t >= T.faint[0]) {
        const f = ease.inCubic(prog(t, ...T.faint)) * (1 - easeOutBack(prog(t, T.leoUp, T.leoUp + 0.4), 1.8))
        rot = -1.35 * f; P[1] += 120 * f
      }
      // the strike: drop back down behind the rail
      P[1] += ease.inCubic(prog(t, T.strike[0] + i * 0.05, T.strike[1] + i * 0.05)) * 200
      const st = galState(id, t)
      const hops = [GASP[0], GASP[1], GASP[2], T.gaspF, T.cheer[0] + i * 0.05, T.cheer[0] + 0.56 + i * 0.05, T.cheer[0] + 1.12 + i * 0.05, t0 + 0.34].filter(h => !(id === 'leo' && h > T.faint[0] && h < T.leoUp))
      if (id === 'tau') hops.push(GASP[2] + 0.5)
      const r = star(id, P, t, st, { hops, rot, alpha: strike })
      if (!r) return
      // props on the gallery
      if (id === 'leo') {
        // the crown: pops off at exhibit B, lands crooked; flies at the faint; back on (crooked) at the verdict
        let cxp = r.x + r.c * 0.6, cyp = r.top + r.c * 3.6, crot = -0.12
        const fly = prog(t, GASP[1], GASP[1] + 0.62)
        if (fly > 0 && fly < 1) { cyp -= Math.sin(fly * Math.PI) * 90; crot = -0.12 + fly * Math.PI * 2 }
        if (t >= GASP[1] + 0.62) crot = 0.42
        const gone = t >= T.faint[0] && t < T.leoUp + 0.2
        if (gone) {
          const f = prog(t, T.faint[0], T.faint[0] + 0.6)
          if (f < 1) { x.save(); x.globalAlpha = 1 - f; drawCrown(x, cxp - 80 * f, cyp - Math.sin(f * Math.PI) * 120, Math.max(3, r.c * 0.9), 0.42 - f * 5); x.restore() }
        } else drawCrown(x, cxp, cyp, Math.max(3, r.c * 0.9), t >= T.leoUp ? 0.42 : crot)
      }
      if (id === 'pis') {
        drawTissue(x, r.x - r.size * 0.46, r.y - r.size * 0.02, Math.max(3, r.c * 0.8), t)
        const cry = [[GASP[1] + 0.05, T.exC - 0.2], [T.exE + 0.1, T.exF], [T.bang2 + 0.25, T.cut2 + 1]]
        for (const [a, b] of cry) tears(r.x, r.y, r.size, t, a, b, { gap: 0.09, spread: 0.9 })
        if (t < T.cut2 && !cry.some(([a, b]) => t >= a && t < b + 0.6) && Math.floor(t * 0.9) % 2 === 0) drawTear(x, r.x + r.size * 0.13, r.y + r.size * 0.12 + ((t * 0.8) % 1) * 22, Math.max(3, r.c * 0.75))
      }
      if (id === 'tau' && t >= GASP[2] + 0.4 && t < T.bangO + 0.6) drawSweat(x, r.x + r.size * 0.36, r.top + r.size * 0.32 + ((t * 0.7) % 1) * 18, Math.max(3, Math.round(r.c * 0.8)))
      if (id === 'tau' && t >= T.yum[0] && t < T.yum[1]) {
        const k = pop01(t, T.yum[0], 0.3, 2.4) * (1 - ease.inQuad(prog(t, T.yum[1] - 0.2, T.yum[1])))
        x.save(); x.translate(r.x + 30, r.top - 14); x.scale(k, k)
        drawBubble(x, -180, -100, 360, 84, { tail: 'down', tailX: 150, px: 5 })
        x.fillStyle = '#2a1846'; x.font = `700 38px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('…i say yummy', 0, -56)
        x.restore()
      }
    })
    drawRail(x, 0, W, ry, 6, { alpha: strike })
  }

  // ── THE STARS
  function starsPlace(t) {
    if (t < T.starsIn[0]) return null
    if (t < T.starsIn[1]) { const p = prog(t, ...T.starsIn), e = ease.outCubic(p); return [lerp(1220, STARS_P[0], e), lerp(240, STARS_P[1], e), STARS_P[2]] }
    if (t < T.glide[0]) return STARS_P
    const p = prog(t, ...T.glide), e = ease.inOutCubic(p)
    return [lerp(STARS_P[0], STARS_TIE[0], e), lerp(STARS_P[1], STARS_TIE[1], e), lerp(STARS_P[2], STARS_TIE[2], e)]
  }
  function drawStars(t) {
    const P = starsPlace(t)
    if (!P) return
    let st = keyed(t, STARS_K)
    // the slow blink before "is it, though?"
    if (inW(t, ...T.blink)) { const p = prog(t, ...T.blink); st = { ...st, blink: p < 0.45 ? lerp(0.45, 1, ease.inOutQuad(p / 0.45)) : p < 0.62 ? 1 : lerp(1, 0.5, ease.inOutQuad((p - 0.62) / 0.38)) } }
    // off stage during the lesson (it would peek out behind the banner); back with a sparkle for the card
    if (t >= T.cut2 && t < T.lessonOut[0]) return
    let k = popOut(t, T.out)
    if (t >= T.lessonOut[0]) k *= pop01(t, T.lessonOut[0], 0.36, 2.2)
    const r = star('stars', P, t, st, { pop: k, hops: [...HOPS.stars, T.starsIn[1], T.bang2 + 0.1, T.lessonOut[0] + 0.36] })
    if (!r) return
    if (t >= T.lessonOut[0] && t < T.lessonOut[0] + 0.7) sparkleRing(t, r.x, r.y, T.lessonOut[0] + 0.05, 8, 100, 0.9, 0.6)
    if (t < T.starsIn[1] + 0.3) sparkleRing(t, r.x, r.y, T.starsIn[1] - 0.1, 10, 120, 0.3, 0.6)
    // a falling trail on the way in
    if (inW(t, T.starsIn[0], T.starsIn[1])) {
      for (let i = 1; i <= 4; i++) { const tt = t - i * 0.05, Q = starsPlace(Math.max(T.starsIn[0], tt)); if (Q) drawPixelStar(x, Q[0] + 30, Q[1] - 20, 30 - i * 5, i % 2, GOLD) }
    }
  }

  // ── the mystery card (tie-in)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function cardBack(w, h) {
    rr(-w / 2, -h / 2, w, h, 34)
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#6a3fd0'); g.addColorStop(1, '#3a1d86')
    x.fillStyle = g; x.fill(); x.lineWidth = 6; x.strokeStyle = 'rgba(255,240,200,0.9)'; x.stroke()
    x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 3
    const r0 = w * 0.13
    x.beginPath(); x.arc(0, 0, r0, 0, Math.PI * 2); x.stroke()
    for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; x.beginPath(); x.arc(Math.cos(a) * r0, Math.sin(a) * r0, r0, 0, Math.PI * 2); x.stroke() }
    x.beginPath(); x.arc(0, 0, r0 * 2, 0, Math.PI * 2); x.stroke()
  }
  function cardFace(w, h, t) {
    const L = -w / 2, Tp = -h / 2
    x.save(); x.shadowColor = 'rgba(180,108,255,0.55)'; x.shadowBlur = 60
    rr(L, Tp, w, h, 34); x.fillStyle = '#150c2c'; x.fill(); x.restore()
    const gr = x.createLinearGradient(L, Tp, L + w, Tp + h); gr.addColorStop(0, '#ffd27a'); gr.addColorStop(0.35, '#ff6fb5'); gr.addColorStop(0.7, '#b46cff'); gr.addColorStop(1, '#7fd0f0')
    x.lineWidth = 7; x.strokeStyle = gr; rr(L, Tp, w, h, 34); x.stroke()
    // header
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.font = `italic 500 46px ${SERIF}`; x.fillText('Mystery card', L + 34, Tp + 74)
    const pulse = 0.65 + 0.35 * Math.sin(t * 5)
    x.save(); x.shadowColor = '#b46cff'; x.shadowBlur = 20 + 22 * pulse
    x.beginPath(); x.arc(-L - 58, Tp + 58, 30, 0, Math.PI * 2); x.fillStyle = '#b46cff'; x.fill(); x.restore()
    x.font = `700 36px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#1a0e30'
    x.fillText('♐︎', -L - 58, Tp + 61)
    // the veiled photo
    const ax = L + 26, ay = Tp + 100, aw = w - 52, ah = 236
    x.save(); rr(ax, ay, aw, ah, 20); x.clip()
    const g = x.createRadialGradient(ax + aw / 2, ay + ah * 0.55, 10, ax + aw / 2, ay + ah * 0.55, aw * 0.75)
    g.addColorStop(0, '#ff6fb5'); g.addColorStop(0.45, '#b46cff'); g.addColorStop(1, '#2a1a6e')
    x.fillStyle = g; x.fillRect(ax, ay, aw, ah)
    x.fillStyle = 'rgba(26,14,48,0.4)'; x.filter = 'blur(14px)'
    x.beginPath(); x.arc(ax + aw / 2, ay + ah * 0.42, aw * 0.15, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.ellipse(ax + aw / 2, ay + ah * 1.02, aw * 0.34, ah * 0.36, 0, 0, Math.PI * 2); x.fill()
    x.filter = 'none'
    const vs = ((t * 0.5) % 1.4) - 0.2
    const vg = x.createLinearGradient(ax + aw * vs - 60, ay, ax + aw * vs + 60, ay + ah); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(0.5, 'rgba(255,255,255,0.22)'); vg.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = vg; x.fillRect(ax, ay, aw, ah)
    x.font = `800 120px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = rgba(BONE, 0.85); x.fillText('?', ax + aw / 2, ay + ah * 0.47)
    x.restore()
    x.lineWidth = 3; x.strokeStyle = 'rgba(255,111,181,0.7)'; rr(ax, ay, aw, ah, 20); x.stroke()
    x.font = `700 18px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = rgba(BONE, 0.8)
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('NO PHOTO YET', ax + 16, ay + ah - 16)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    // sign row
    const ry = ay + ah + 54
    x.font = `600 34px ${SERIF}`; x.fillStyle = '#d2a8ff'; x.textAlign = 'left'; x.fillText('SAGITTARIUS', L + 34, ry)
    x.font = `700 18px ${MONO}`; const pw = 86, pxl = -L - pw - 30
    rr(pxl, ry - 28, pw, 38, 19); x.strokeStyle = '#ff8a3a'; x.lineWidth = 2.5; x.stroke()
    x.fillStyle = '#ff8a3a'; x.textBaseline = 'middle'; x.textAlign = 'center'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('FIRE', pxl + pw / 2 + 2, ry - 8)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    // his line (the payoff): the ick, reframed
    const qk = prog(t, T.quote, T.quote + 0.6)
    const qy = ry + 70, lines = ['“I always clap for', 'the pilot. Someone', 'should.”']
    if (qk > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const hg = x.createLinearGradient(L, 0, L + w, 0); hg.addColorStop(0, 'rgba(242,199,92,0)'); hg.addColorStop(0.5, `rgba(242,199,92,${0.22 * qk})`); hg.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = hg; x.fillRect(L + 14, qy - 40, w - 28, lines.length * 50 + 24)
      x.restore()
    }
    x.font = `italic 500 44px ${SERIF}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = BONE
    lines.forEach((ln, i) => x.fillText(ln, L + 34, qy + i * 50))
    if (qk > 0) {
      x.fillStyle = GOLD
      lines.forEach((ln, i) => { const lw = x.measureText(ln).width, u = clamp(qk * 3 - i); if (u > 0) x.fillRect(L + 34, qy + i * 50 + 9, lw * u, 4) })
    }
  }
  function drawCard(t) {
    if (t < T.deal[0] || t >= T.out[1]) return
    const { cx, cy, w, h } = CARD
    const p = prog(t, ...T.deal), e = easeOutBack(p, 1.4)
    const ccx = lerp(cx + 260, cx, ease.outCubic(p)), ccy = lerp(cy + 1100, cy, e)
    const rot = lerp(0.5, 0.05, ease.outCubic(p)) + 0.012 * Math.sin(t * 1.6)
    const f = prog(t, ...T.flip), sx = Math.cos(f * Math.PI)
    const k = popOut(t, T.out)
    // the payoff push: the card leans in a touch while its line glows
    const lean = 1 + 0.05 * ease.inOutCubic(prog(t, T.quote, T.quote + 0.7)) * (1 - ease.inOutCubic(prog(t, T.claps4[1], T.h4Out[1])))
    x.save(); x.translate(ccx, ccy); x.rotate(rot); x.scale(Math.abs(sx) * k * lean, k * lean)
    if (sx > 0) cardBack(w, h); else cardFace(w, h, t)
    x.restore()
    if (f > 0.45 && f < 1) sparkleRing(t, ccx, ccy, T.flip[0] + 0.2, 12, 330, 1)
  }

  // Pisces pops up for the last line, sobbing into a tissue (the running gag)
  function drawPisFinal(t) {
    if (t < T.pisUp) return
    const k = easeOutBack(prog(t, T.pisUp, T.pisUp + 0.4), 2.2) * popOut(t, T.out)
    if (k <= 0.02) return
    const P = [905, 1560 + (1 - Math.min(1, k)) * 120, 200]
    const r = star('pis', P, t, S_('sparkle', [-1, -1]), { pop: k, hops: [T.pisUp + 0.4, 38.9, 39.5] })
    if (!r) return
    drawTissue(x, r.x - r.size * 0.46, r.y - r.size * 0.02, Math.max(3, r.c), t)
    tears(r.x, r.y, r.size, t, T.pisUp + 0.3, T.out[0], { gap: 0.08, spread: 1 })
  }

  // the crickets during the silence
  function crickets(t) {
    T.crk.forEach((c, i) => ono('*chirp*', 205 + i * 40, 575 + i * 70, t, c, { size: 40, color: 'rgba(239,230,214,0.92)', life: 1.0, rise: 24, ticks: false }))
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t)
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        // back to front: the bench (+ judge), THE STARS, the easel + board, the hook set, Libra + lectern, the gallery + rail
        drawCourtBack(t)
        drawStars(t)
        drawEasel(t)
        drawHookSet(t)
        drawCard(t)
        drawLibra(t)
        if (t >= T.lect[0] && t < T.strike[1]) {
          const k = easeOutBack(prog(t, ...T.lect), 2) * (1 - ease.inCubic(prog(t, ...T.strike)))
          x.save(); x.translate(LECT.x, LECT.y + LECT.h); x.scale(k, k); x.translate(-LECT.x, -(LECT.y + LECT.h))
          drawLectern(x, LECT.x, LECT.y, LECT.w, LECT.h)
          x.restore()
        }
        drawRailAndGallery(t)
        drawPisFinal(t)
        // the gasps, louder each time
        ;['*gasp*', '*GASP*', '*GASP!!*'].forEach((g, i) => ono(g, 540, 1408, t, GASP[i], { size: 46 + i * 10, color: i === 2 ? '#ffd0d8' : BONE, life: 0.85, rise: 22 }))
        ono('*GASP!!*', 540, 1408, t, T.gaspF, { size: 68, color: '#ffd0d8', life: 0.9, rise: 22 })
        x.restore()
        crickets(t)
        if (t >= T.bang1 && t < T.bang1 + 0.7) sparkleRing(t, 540, 760, T.bang1, 12, 300, 0.6)
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

// card-motif candidates: 4.62 (hook → court; the set slams in on its own), 14.55 (court → the tables turn, flip),
// 23.85 (→ the verdict; the drumroll carries it), 27.55 (→ the LESSON, deal). The default selection keeps 14.55 and 27.55.
export const CUTS = [4.62, { t: T.cut1, kind: 'flip' }, 23.85, { t: T.cut2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. pop / pluck / bell are moved into A by the engine; chip / clap / tom / snare cues ride the 'sfx' bus and are
//    written straight in A major.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const A_ = { A3: 220, B3: 246.94, Cs4: 277.18, D4: 293.66, E4: 329.63, Fs4: 369.99, Gs4: 415.3, A4: 440, B4: 493.88, Cs5: 554.37, D5: 587.33, E5: 659.25, Fs5: 739.99, A5: 880, Cs6: 1108.73, E6: 1318.51, A6: 1760 }
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const claps = (t, g = 0.16, pan = 0) => [['clap', t, { ...FX, gain: g, pan, tone: 1300 }], ['clap', +(t + 0.012).toFixed(3), { ...FX, gain: g * 0.6, pan: -pan, tone: 1050 }]]
const gasp = (t, g = 0.06, f = 392) => [['whoosh', +(t - 0.04).toFixed(3), 0.22, g], ['pop', t, f, 0.045, 0], ['pop', +(t + 0.05).toFixed(3), f * 1.5, 0.03, 0]]
const bang = (t, big = 1) => [['tom', t, 78, { ...FX, gain: 0.34 * big, decay: 0.32 }], ['boom', t, 0.1 * big], ['clap', +(t + 0.004).toFixed(3), { ...FX, gain: 0.16 * big }], ['tick', t, 0.1]]
const womp = t => [['chip', t, A_.E4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', +(t + 0.34).toFixed(3), A_.Cs4, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const cricket = (t, pan = 0.5) => [0, 0.045, 0.09, 0.26, 0.305, 0.35].map(d => ['pop', +(t + d).toFixed(3), 4186, 0.022, pan])
const snareRoll = (t0, t1) => { const out = []; for (let t = t0; t < t1; t += 0.045) out.push(['snare', +t.toFixed(3), { ...FX, gain: 0.05 + 0.1 * ((t - t0) / (t1 - t0)), decay: 0.07, tone: 200 }]); return out }
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.05, f0: 900, f1: 2600 }]]; for (let k = 0; k < 16; k++) out.push(['clap', +(t0 + 0.1 + k * 0.12 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.08, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), +(f * (1 - i * 0.06)).toFixed(2), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.018, decay: 0.08, sustain: 0.5 }])
/** real silence in the score: a tape stop at t0, then more stops chained over its own silent tail until `until` */
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L; q0 = +(q0 + L * 0.84).toFixed(4) }
  return out
}
const PITCH = { [SL]: 1040, [SS]: 760 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · the hook: the plane lands, three claps, the ick
  ...head(T.h0, 5, T.h0Land, 0),
  ['whoosh', 0.1, 0.8, 0.05], ['tick', T.plane[1], 0.09], ['boom', T.plane[1], 0.05], ['whoosh', T.plane[1] + 0.02, 0.4, 0.04],
  ...claps(T.claps[0], 0.12, -0.2), ...claps(T.claps[1], 0.14, 0.2), ...claps(T.claps[2], 0.18, 0),
  ['pop', T.flat, 523.25, 0.03, 0],
  ['tom', T.tip, 96, { ...FX, gain: 0.22, decay: 0.2 }], ['tick', T.tip, 0.07], ...womp(T.tip + 0.06),
  ['pop', T.l1 - 0.24, 659.25, 0.035, 0], ['pop', T.l1 - 0.18, 880, 0.03, 0],
  // 2 · ick court slams in
  ['whoosh', T.hookOut[0], 0.35, 0.05], ['whoosh', T.bench[0], 0.3, 0.06], ['tom', T.bench[1], 70, { ...FX, gain: 0.2, decay: 0.25 }],
  ['pop', T.easel[0] + 0.12, 783.99, 0.03, 0.3], ...[0, 1, 2, 3].map(i => ['pop', +(T.gal + i * 0.07 + 0.12).toFixed(3), NOTE[(i * 2 + 1) % 7], 0.025, -0.4 + i * 0.27]),
  ...wordPops(T.h1, 5, 0.07, 1, 0.024), ...bang(T.bang1), ['pluck', T.bang1, 1174.66, 0.04, 0.6, 0],
  // the exhibits: a board flip each, a gasp each (louder), the bus, the circle, the sinking Taurus, a gavel
  ...[T.exA, T.exB, T.exC].flatMap(e => [['tick', +(e - 0.12).toFixed(3), 0.05], ['whoosh', +(e - 0.12).toFixed(3), 0.22, 0.03], ['pop', +(e + 0.1).toFixed(3), 880, 0.025, 0.3]]),
  ['pluck', GASP[0] - 0.5, 1318.51, 0.03, 0.3, 0.3],
  ...gasp(GASP[0], 0.05), ...gasp(GASP[1], 0.065, 349.23), ...gasp(GASP[2], 0.08, 329.63),
  ['pop', GASP[1] + 0.1, 1567.98, 0.03, -0.4], ['pop', GASP[1] + 0.62, 659.25, 0.03, -0.4],
  ...sob(GASP[1] + 0.15, A_.A5),
  ['pop', T.yum[0], 523.25, 0.03, 0.2], ['pop', T.yum[0] + 0.08, 440, 0.025, 0.2],
  ['whoosh', T.stareTau, 0.25, 0.03], ['chip', T.sink[0], A_.E5, 0.4, { ...FX, wave: 'tri', slide: -14, gain: 0.03, decay: 0.3, sustain: 0.5 }],
  ...bang(T.bangO, 0.7),
  // 3 · the tables turn
  ['whoosh', T.starsIn[0], 0.5, 0.06], ['glitter', T.starsIn[0] + 0.1, T.starsIn[1] + 0.2], ['bell', T.starsIn[1], 1318.51, 0.03, 1.2, 0.3],
  ...head(T.h2, 3, T.h2Land, 3),
  ...[T.exD, T.exE, T.exF].flatMap(e => [['tick', +(e - 0.12).toFixed(3), 0.05], ['whoosh', +(e - 0.12).toFixed(3), 0.22, 0.03]]),
  ...T.claps2.flatMap((c, i) => claps(c, 0.07, i % 2 ? 0.3 : -0.3)),
  ['whoosh', T.lookD, 0.18, 0.04], ['pop', T.lookD + 0.02, 440, 0.03, 0], ['whoosh', T.lookE, 0.18, 0.04], ['pop', T.lookE + 0.02, 392, 0.03, 0],
  ...sob(T.exE + 0.15, A_.Cs6, 2),
  ...T.claps3.flatMap(c => claps(c, 0.08, 0)),
  ...gasp(T.gaspF, 0.1, 293.66), ['whoosh', T.faint[0] + 0.1, 0.4, 0.05], ['tom', T.faint[1], 60, { ...FX, gain: 0.15, decay: 0.3 }],
  ...silence(T.freeze, 0.5, T.roll2[0]),
  ...cricket(T.crk[0]), ...cricket(T.crk[1], -0.4),
  ['tick', T.blink[0] + 0.3, 0.025], ['tick', T.blink[1] - 0.25, 0.025],
  ...womp(T.roll + 0.1),
  // 4 · the verdict
  ...head(T.h3, 1, T.h3Land, 2), ['whoosh', T.raise[0], 0.3, 0.04],
  ...snareRoll(T.roll2[0], T.roll2[1]),
  ...bang(T.bang2, 1.3), ['glitter', T.bang2, T.bang2 + 0.7],
  ...cheers(T.cheer[0], T.cheer[1]),
  ...sob(T.bang2 + 0.3, A_.E6), ...sob(T.bang2 + 0.9, A_.Cs6),
  ['pop', T.leoUp, 783.99, 0.035, -0.4],
  // 5 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 6 · card first, face last
  ['whoosh', T.deal[0], 0.45, 0.05], ['tick', T.flip[0] + 0.15, 0.07], ['bell', T.flip[1], 1318.51, 0.035, 1.4, 0], ['glitter', T.flip[0] + 0.15, T.flip[1] + 0.4],
  ...head(T.h4, 3, T.h4Land, 4),
  ['pop', T.l8 - 0.24, 659.25, 0.035, 0],
  ['glitter', T.quote, T.quote + 0.6], ['pluck', T.quote + 0.1, 1567.98, 0.03, 0.6, 0.2],
  ['bell', T.soft, 1760, 0.025, 1.4, -0.2],
  ['bell', T.level, 2349.32, 0.04, 1.8, -0.3], ['pop', T.level, 1174.66, 0.04, -0.3],
  ...claps(T.claps4[0], 0.11, -0.25), ...claps(T.claps4[1], 0.13, -0.25),
  // 7 · give the ick a minute
  ...head(T.h5, 5, T.h5Land, 1),
  ['pop', T.pisUp + 0.1, 1046.5, 0.03, 0.4], ...sob(T.pisUp + 0.3, A_.A5),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES1, { cps: CPS, pitch: PITCH }), ...talkCues(LINES2, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
