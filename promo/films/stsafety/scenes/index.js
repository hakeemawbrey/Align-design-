// stsafety — "Safety Demonstration." (45 s vertical Align ad, Star Talk "Wild Lessons" #20, music: jazzy · D, an in-flight
// lounge trio). Story 0–40.6, then the shared end card.
//   0.0–4.4    "Before takeoff: | a *safety demo.*"  A glass-roofed star liner cruising the nebula (the sky slides past
//              the dome). BING-BONG, the seatbelt sign lights. ♍ VIRGO (pillbox hat, neck bow) pops up in the aisle:
//              "welcome to flight 5H. destination: love." Rows of passengers: ♐ SAG + ♋ CANCER (front left), ♈ ARIES
//              + ♌ LEO (front right), ♓ PISCES (back row, already sobbing at the safety demo) and ♉ TAURUS (peanuts).
//   4.45–10.6  "Seatbelt: | *commitment.*"  Virgo clicks a demo belt: "it should hold you. not trap you." Meanwhile
//              Cancer leans over and buckles SAG's belt for him, then tugs it tight (squash). SAG: "I can buckle my own
//              belt."
//  10.7        card cut (flip).
//  10.75–14.6 "Exits: your | *dealbreakers.*"  Three EXIT signs light one by one as Virgo points (gold arrows): ✕ RUDE TO
//              WAITERS · ✕ 'I DON'T DO PLANS' · ✕ NEVER ASKS ABOUT YOU. The whole cabin turns its heads in sync.
//              VIRGO: "know them before you board."
//  14.65–18.7 "Life vest: | your *friends.*"  Virgo pulls the tab, FWOOMP, two little friend stars pop out of the vest and
//              hold Virgo up: "if it gets rough, friends keep you up." Cancer inflates Sag's vest for him (FWOOMP, Sag
//              puffs). Pisces blows its vest whistle while crying.
//  18.8–26.6  "In case of | *heartbreak…*"  The masks drop. VIRGO: "your own mask first. then help others." Aries, Leo and
//              Pisces do it right. Cancer grabs its mask… and puts it on Sag. Cancer goes pale and faints onto Sag's
//              shoulder (dizzy stars). SAG: "...thanks?"  "She did it | *again.*" Cancer revives (snrk!), grabs Sag's
//              dangling mask, hops into the aisle and puts it on VIRGO. Faints flat on the carpet. VIRGO, masked,
//              deadpan: "ma'am. I work here."
//  26.7–31.0  "This is your | *captain* speaking."  BING-BONG: THE STARS in the cockpit porthole, in a captain's hat:
//              "you can't pour from an empty tank."  A spare mask boings down in front of Cancer. Cancer puts on its OWN.
//              Hhhhh: the colour floods back, it pops up sparkling. "Breathe *first.* | Then help."  It fixes Sag's strap.
//  31.05      card cut (deal) into ★ LESSON UNLOCKED: "Put your own | mask on *first.* | Then love well." (+1 SELF-CARE)
//  35.5–38.3  "Your exits. | On your *card.*"  Cancer's card: the three dealbreakers from the exit signs stamp on, one per
//              beat. THE STARS: "pick them at signup. day one."
//  38.28–40.42 "Enjoy the | *flight.*"  The whole cabin waves; Virgo bows; Pisces sobs. Everything pops out by 40.42; the
//              end card takes over at 40.6.
// One canvas (sky + cabin + cast + props), DOM type + dialogue boxes + the shared lesson, grain on top. Pure f(t);
// nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawCabin, drawSeatBack, drawSeatFront, drawHatch, drawMask, drawStrap, drawTube, drawPillbox, drawCaptainHat, drawScarf, drawBelt,
  drawSeatBelt, drawVest, drawExitSign, drawSeatbeltSign, drawBubble, drawTear, drawSweat, drawPixelHeart, drawTissue, drawPeanuts, drawDizzy } from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', MINT = '#7dffb0', SKYBLUE = '#7fd0f0', RED = '#ff5a6e'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid
export const KEY = 'D'

const VIR = signStar('virgo'), CAN = signStar('cancer'), SAG = signStar('sagittarius'), ARI = signStar('aries'), LEO = signStar('leo'), PIS = signStar('pisces'), TAU = signStar('taurus')
const VIR_T = '#9fe0a8', CAN_T = '#7fd3ff', SAG_T = '#d2a6ff'
const PALE = '#9aa3bd'

// ── the timeline
export const T = {
  black: [0, 0.3],
  // the hook
  h0: 0.12, h0Land: BEAT(1), h0Out: [4.22, 4.38], chime: 0.35, signOff: 4.3, virIn: 0.55, l1: 1.45,
  // seatbelt
  h1: 4.45, h1Land: BEAT(8), h1Out: [10.42, 10.58], beltIn: [4.55, 4.9], click: BEAT(9), beltOut: [10.2, 10.5], l2: 5.0,
  canLean1: [6.95, 7.2], canClick: 7.35, canTug: 7.75, canBack1: [7.95, 8.2], l3: 8.25,
  cut1: 10.7,
  // exits
  h2: 10.75, h2Land: BEAT(19), h2Out: [14.42, 14.58], exits: [BEAT(20), BEAT(21) + 0.08, BEAT(22) + 0.16], l4: 11.6, exitsOff: 14.5,
  // life vest
  h3: 14.65, h3Land: BEAT(26), h3Out: [18.6, 18.76], vestIn: [14.7, 15.05], tab: BEAT(27), friends: 16.0, vestOut: [18.55, 18.85], l5: 15.4,
  canLean2: [16.85, 17.1], sagPuff: 17.35, canBack2: [17.55, 17.75], tweet: [17.85, 18.15],
  // masks
  h4: 18.8, h4Land: BEAT(34), h4Out: [23.75, 23.91], drop: 19.1, l6: 19.6, virMask: [19.95, 21.4],
  ariMask: 20.85, leoMask: 21.05, pisMask: 21.3,
  grab1: 20.3, put1: 20.6, pale1: [20.8, 21.55], faint1: BEAT(38), l7: 22.85, revive: 23.75,
  h4b: 23.95, h4bLand: BEAT(43), h4bOut: [26.5, 26.66], hop: [24.05, 24.42], put2: 24.5, pale2: [24.6, 25.15], faint2: 25.2, l8: 25.4,
  // the captain
  capIn: 26.7, h5: 26.75, h5Land: BEAT(48), h5Out: [28.92, 29.08], l9: 27.7, spare: 28.0, look: 28.35, own: BEAT(51) + 0.02, breathe: [28.98, 29.55],
  rise: [29.45, 29.8], h5b: 29.12, h5bLand: 29.5, h5bOut: [30.85, 31.0], help: 30.1, closeA: 30.9,
  cut2: 31.05,
  // the lesson
  lesson: BEAT(55), lessonOut: [35.25, 35.45],
  // dealbreakers on the card
  masksOut: [35.3, 35.6], canHome: [35.55, 35.95], panel: [35.4, 35.85], h6: 35.5, h6Land: BEAT(64), l10: 35.75,
  stamps: [BEAT(64) + 0.08, BEAT(65) + 0.08, BEAT(66) + 0.08], panelOut: [38.02, 38.3], h6Out: [38.08, 38.24], closeB: 38.4,
  // the last line
  h7: 38.28, h7Land: BEAT(68), wave: [38.5, 38.9, 39.3], bow: 38.6, out: [40.02, 40.42], h7Out: [40.18, 40.42],
}

// ── the lines
const SVIR = `${VIR.glyph}︎ VIRGO`, SSAG = `${SAG.glyph}︎ SAG`, SS = 'THE STARS'
const LINES_A = [
  { t: T.l1, speaker: SVIR, color: VIR_T, text: 'welcome to flight 5H. *destination: love.*' },
  { t: T.l2, speaker: SVIR, color: VIR_T, text: 'it should *hold* you. not trap you.' },
  { t: T.l3, speaker: SSAG, color: SAG_T, text: 'I can buckle my own *belt.*' },
  { t: T.l4, speaker: SVIR, color: VIR_T, text: 'know them *before* you board.' },
  { t: T.l5, speaker: SVIR, color: VIR_T, text: 'if it gets rough, *friends* keep you up.' },
  { t: T.l6, speaker: SVIR, color: VIR_T, text: 'your own mask *first.* then help others.' },
  { t: T.l7, speaker: SSAG, color: SAG_T, text: '...*thanks?*' },
  { t: T.l8, speaker: SVIR, color: VIR_T, text: "ma'am. I *work* here." },
  { t: T.l9, speaker: SS, color: GOLD, text: "you can't pour from an *empty tank.*" },
]
const LINES_B = [{ t: T.l10, speaker: SS, color: GOLD, text: 'pick them at signup. *day one.*' }]
const CPS = 28
export const LTA = lineTimes(LINES_A, { cps: CPS }), LTB = lineTimes(LINES_B, { cps: CPS })
const HOPS = {
  vir: talkHops(LINES_A, SVIR, { cps: CPS }), sag: talkHops(LINES_A, SSAG, { cps: CPS }),
  stars: [...talkHops(LINES_A, SS, { cps: CPS }), ...talkHops(LINES_B, SS, { cps: CPS })],
}

const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Put your own | mask on *first.* | Then love well.', chip: '+1 SELF-CARE', accentColor: GOLD, dim: 0.62 }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const hexMix = (a, b, k) => { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), m = s => Math.round(lerp((A >> s) & 255, (B >> s) & 255, clamp(k))); return '#' + ((1 << 24) | (m(16) << 16) | (m(8) << 8) | m(0)).toString(16).slice(1) }
const inW = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const win = (t, [a, b], [c, d]) => ease.inOutCubic(prog(t, a, b)) * (1 - ease.inOutCubic(prog(t, c, d)))

// ── where things are (screen coords)
const VIR_P = [540, 985, 220]
const SAG_P = [140, 1200, 160], CAN_P = [330, 1190, 165], ARI_P = [750, 1200, 155], LEO_P = [945, 1195, 160]
const PIS_P = [330, 815, 92], TAU_P = [750, 815, 92]
const AISLE = [455, 1135, 165], FLOOR = [520, 1262, 165]
const CAP = { x: 920, y: 572, r: 86 }
const EXITS = [{ x: 180, y: 735, label: '✕ RUDE TO WAITERS', look: [-1, -1] }, { x: 900, y: 735, label: "✕ 'I DON'T DO PLANS'", look: [1, -1] }, { x: 540, y: 655, label: '✕ NEVER ASKS ABOUT YOU', look: [0, -1] }]
const HATCH_Y = 590
const SEED = { vir: 5, can: 9, sag: 3, ari: 13, leo: 17, pis: 23, tau: 29, stars: 11, f1: 31, f2: 37 }
const COLS = { vir: VIR, can: CAN, sag: SAG, ari: ARI, leo: LEO, pis: PIS, tau: TAU }

/** which exit sign is "current" (−1 = none) */
const exitIdx = t => (t < T.exits[0] || t >= T.exitsOff) ? -1 : t >= T.exits[2] ? 2 : t >= T.exits[1] ? 1 : 0
/** the passengers' synced head-turns during the exit demo */
const exitLook = (t, base) => { const i = exitIdx(t); return i < 0 ? base : EXITS[i].look }

// ── moods
const VIR_K = [
  [0, S_('happy', [0, 0])], [T.l2, S_('neutral', [0, 0])], [T.click, S_('happy', [0, 0])], [T.canLean1[0], S_('neutral', [-1, 1])], [T.l3 + 1.2, S_('happy', [0, 0])],
  [T.exits[0], S_('neutral', [-1, -1])], [T.exits[1], S_('neutral', [1, -1])], [T.exits[2], S_('neutral', [0, -1])], [T.exitsOff - 0.6, S_('happy', [0, 0])],
  [T.friends, S_('sparkle', [0, 0])], [T.sagPuff, S_('neutral', [-1, 1])], [T.tweet[0], S_('happy', [0, 0])],
  [T.drop, S_('neutral', [0, 0])], [T.put1 + 0.1, S_('wide', [-1, 1], { blink: false })], [T.faint1 + 0.3, S_('eyeroll', [0, -1])], [T.faint1 + 1.2, S_('neutral', [-1, 1])],
  [T.hop[0], S_('wide', [-1, 1], { blink: false })], [T.put2, S_('wide', [0, 0], { blink: false, sq: -0.06 })], [T.put2 + 0.4, S_('neutral', [0, 0], { blink: 0.55 })],
  [T.capIn, S_('neutral', [1, -1], { blink: 0.4 })], [T.own, S_('wide', [-1, 1])], [T.rise[0], S_('happy', [-1, 1])],
  [T.h7, S_('happy', [0, 0])], [39.3, S_('wink', [0, 0])],
]
const SAG_K = [
  [0, S_('neutral', [1, 0])], [T.canClick, S_('wide', [1, 0], { blink: false })], [T.canTug, S_('wide', [0, -1], { blink: false, sq: -0.12 })], [T.canTug + 0.3, S_('squint', [1, 0])],
  [T.l3, S_('squint', [0, 0])], [T.l3 + 1.6, S_('neutral', [1, 0])],
  [T.sagPuff, S_('wide', [0, 0], { blink: false })], [T.sagPuff + 0.5, S_('squint', [1, 0])],
  [T.drop, S_('neutral', [0, -1])], [T.put1, S_('wide', [1, 0], { blink: false })], [T.faint1, S_('wide', [1, 1], { blink: false })], [T.l7, S_('squint', [0, 0], { blink: 0.4 })],
  [T.hop[0], S_('neutral', [1, 0])], [T.put2, S_('wide', [1, 0], { blink: false })], [T.faint2 + 0.3, S_('eyeroll', [0, -1])], [T.faint2 + 1.1, S_('squint', [1, 0])],
  [T.own, S_('neutral', [1, 0])], [T.help, S_('happy', [1, 0])], [T.h7, S_('happy', [0, 0])],
]
const CAN_K = [
  [0, S_('sparkle', [0, -1])], [T.canLean1[0], S_('happy', [-1, 0])], [T.canBack1[1], S_('sparkle', [0, -1])], [T.l3, S_('neutral', [-1, 0])], [T.l3 + 1.6, S_('sparkle', [0, -1])],
  [T.canLean2[0], S_('happy', [-1, 0])], [T.canBack2[1], S_('sparkle', [0, 0])],
  [T.drop, S_('wide', [0, -1], { blink: false })], [T.grab1, S_('happy', [-1, 0])], [T.pale1[0], S_('neutral', [-1, 0], { blink: 0.3 })], [T.pale1[0] + 0.4, S_('neutral', [0, 0], { blink: 0.6 })],
  [T.faint1, S_('sleepy', [0, 0], { zzz: false })], [T.revive, S_('wide', [0, 0], { blink: false, sq: -0.08 })], [T.revive + 0.25, S_('sparkle', [1, -1])],
  [T.hop[0], S_('happy', [1, -1])], [T.pale2[0], S_('neutral', [1, -1], { blink: 0.4 })], [T.faint2, S_('sleepy', [0, 0], { zzz: false })],
  [T.look, S_('neutral', [0, -1], { blink: 0.5 })], [T.look + 0.3, S_('wide', [0, -1], { blink: false })], [T.own, S_('neutral', [0, 0], { blink: 0.7 })], [T.breathe[0] + 0.25, S_('sparkle', [0, 0])],
  [T.rise[1], S_('sparkle', [0, 0])], [T.help, S_('happy', [-1, 0])], [T.help + 0.7, S_('sparkle', [0, 0])],
  [T.h7, S_('happy', [0, 0])], [39.4, S_('heart', [0, 0])],
]
const STARS_K = [[0, S_('neutral', [-1, 1], { blink: 0.4 })], [T.l9 + 1.6, S_('happy', [-1, 1])], [T.own + 0.3, S_('sparkle', [-1, 1])], [T.h7, S_('happy', [-1, 1])], [39.0, S_('wink', [-1, 1])]]

/** Cancer: position, tilt, paleness */
function canState(t) {
  let [px, py, s] = CAN_P, rot = 0
  const lean = Math.max(win(t, T.canLean1, T.canBack1), win(t, T.canLean2, T.canBack2), win(t, [T.grab1, T.put1 - 0.05], [T.put1 + 0.2, T.put1 + 0.4]))
  px -= 70 * lean; rot -= 0.16 * lean
  // faint 1: slumps onto Sag's shoulder
  if (inW(t, T.faint1, T.revive)) { const k = easeOutBack(prog(t, T.faint1, T.faint1 + 0.28), 2.2); rot = -0.55 * k; px -= 34 * k; py += 12 * k }
  if (inW(t, T.revive, T.revive + 0.25)) { const k = 1 - ease.outCubic(prog(t, T.revive, T.revive + 0.12)); rot = -0.55 * k; px -= 34 * k }
  // the hop into the aisle, the faint onto the carpet, the rise
  if (t >= T.hop[0]) {
    const p = prog(t, ...T.hop), e = ease.inOutCubic(p)
    px = lerp(CAN_P[0], AISLE[0], e); py = lerp(CAN_P[1], AISLE[1], e) - Math.sin(p * Math.PI) * 120
  }
  if (t >= T.faint2) {
    const k = easeOutBack(prog(t, T.faint2, T.faint2 + 0.32), 1.6)
    px = lerp(AISLE[0], FLOOR[0], k); py = lerp(AISLE[1], FLOOR[1], k); rot = -1.5 * k
  }
  if (t >= T.rise[0]) {
    const p = prog(t, ...T.rise), e = ease.outCubic(p)
    px = lerp(FLOOR[0], AISLE[0], e); py = lerp(FLOOR[1], AISLE[1], e) - Math.sin(p * Math.PI) * 90; rot = -1.5 * (1 - easeOutBack(p, 2))
  }
  if (t >= T.help) { const b = bump(t, T.help, 0.6); px -= 50 * b }
  if (t >= T.canHome[0]) { const p = prog(t, ...T.canHome), e = ease.inOutCubic(p); px = lerp(AISLE[0], CAN_P[0], e); py = lerp(AISLE[1], CAN_P[1], e) - Math.sin(p * Math.PI) * 100; rot = 0 }
  let pale = 0
  if (t >= T.pale1[0]) pale = ease.inOutQuad(prog(t, ...T.pale1))
  if (t >= T.revive) pale = 0.35 * (1 - prog(t, T.revive, T.revive + 0.3))
  if (t >= T.pale2[0]) pale = ease.inOutQuad(prog(t, ...T.pale2))
  if (t >= T.breathe[0]) pale = 1 - ease.outCubic(prog(t, ...T.breathe))
  return { P: [px, py, s], rot, pale }
}
const canInAisle = t => t >= T.hop[0] && t < T.canHome[1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 50px Inter", "italic 500 190px 'EB Garamond'", "italic 500 48px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type (DOM, above the canvas)
  const H0 = popText(root, 'Before takeoff: | a *safety demo.*', { top: 172, size: 92, accentSize: 132, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, gap: 0.08, accentColor: GOLD, fit: true })
  const H1 = popText(root, 'Seatbelt: | *commitment.*', { top: 172, size: 104, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: SKYBLUE, fit: true })
  const H2 = popText(root, 'Exits: your | *dealbreakers.*', { top: 172, size: 100, accentSize: 144, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: MINT, fit: true })
  const H3 = popText(root, 'Life vest: | your *friends.*', { top: 172, size: 100, accentSize: 150, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD, fit: true })
  const H4 = popText(root, 'In case of | *heartbreak…*', { top: 172, size: 104, accentSize: 150, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: PINK, fit: true })
  const H4b = popText(root, 'She did it | *again.*', { top: 172, size: 104, accentSize: 160, at: T.h4b, late: 1, lateAt: T.h4bLand, wobble: true, accentColor: CAN_T, fit: true })
  const H5 = popText(root, 'This is your | *captain* speaking.', { top: 172, size: 96, accentSize: 140, at: T.h5, late: 0, wobble: true, accentColor: GOLD, fit: true })
  const H5b = popText(root, 'Breathe *first.* | Then help.', { top: 172, size: 100, accentSize: 150, at: T.h5b, wobble: true, accentColor: MINT, fit: true })
  const H6 = popText(root, 'Your exits. | On your *card.*', { top: 172, size: 100, accentSize: 150, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: MINT, fit: true })
  const H7 = popText(root, 'Enjoy the | *flight.*', { top: 172, size: 110, accentSize: 176, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, gap: 0.08, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H4b, T.h4bOut], [H5, T.h5Out], [H5b, T.h5bOut], [H6, T.h6Out], [H7, T.h7Out]]
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1478, width: 960, height: 290, open: T.l1 - 0.24, close: T.closeA, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1478, width: 960, height: 290, open: T.l10 - 0.24, close: T.closeB, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── camera: a slow push, little bumps on the thuds
  function cam(t) {
    let s = 1 + 0.025 * ease.inOutQuad(prog(t, 0.3, 4.4))
    s += 0.02 * bump(t, T.faint1, 0.3) + 0.03 * bump(t, T.faint2 + 0.25, 0.3) + 0.02 * bump(t, T.tab, 0.3) + 0.03 * bump(t, T.own, 0.4)
    return s
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.faint1 + 0.1, 6], [T.faint2 + 0.3, 10], [T.tab, 5], [T.sagPuff, 4], [T.put2, 4]]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    // a breath of turbulence: the cabin floats
    return [a * Math.sin(t * 97), a * Math.cos(t * 83) + 2 * Math.sin(t * 1.3)]
  }

  // ── little helpers drawn on the canvas
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
  function sparkleRing(t, cx, cy, t0, n, Rr, seed, life = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p) * 0.8, 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }
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
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1, rot = 0, color = null } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    x.save()
    if (rot) { x.translate(px0, py0 + sz * 0.4); x.rotate(rot); x.translate(-px0, -(py0 + sz * 0.4)) }
    const r = drawStarChar(x, px0, py0 + (st.dy || 0), sz, t, { color: color || (id === 'stars' ? STAR.sky : COLS[id] ? COLS[id].color : LAV), glyph: glyph && sz >= 120 && COLS[id] ? COLS[id].glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id], pop, glow: 0.9, zzz: st.zzz !== false, bob: st.mood === 'sleepy' ? sz * 0.01 : sz * 0.03, alpha })
    x.restore()
    return { ...r, c: r.size / 36 }
  }
  const face = r => [r.x, r.y + r.size * 0.14]
  /** rotate a point about a pivot */
  const rotP = ([px, py], [ox, oy], a) => [ox + (px - ox) * Math.cos(a) - (py - oy) * Math.sin(a), oy + (px - ox) * Math.sin(a) + (py - oy) * Math.cos(a)]

  // ── the sky sliding past + speed streaks
  function drawFlight(t) {
    x.save()
    for (let i = 0; i < 9; i++) {
      const sp = 900 + (i * 173) % 500, y = 120 + (i * 97) % 640, X = W + 300 - ((t * sp + i * 337) % (W + 600))
      x.globalAlpha = 0.22; x.fillStyle = i % 3 ? BONE : LAV
      x.fillRect(Math.round(X), y, 120 + (i * 41) % 120, 3)
    }
    x.restore()
  }

  // ── the back row
  function drawBackRow(t, refs) {
    for (const [id, P] of [['pis', PIS_P], ['tau', TAU_P]]) drawSeatBack(x, P[0], P[1], P[2])
    // Pisces: sobbing at the safety demo, as ever
    {
      let st = S_('sparkle', exitLook(t, [1, -1]))
      if (inW(t, T.put1, T.faint1 + 0.8) || inW(t, T.put2, T.faint2 + 0.9)) st = S_('wide', [1, 1], { blink: false })
      const r = star('pis', PIS_P, t, st, { pop: pop01(t, 0.4, 0.3), hops: [T.tweet[0], T.tweet[1], T.faint1 + 0.05, T.faint2 + 0.2, T.own + 0.3, ...T.wave], glyph: false })
      if (r) {
        refs.pis = r
        const cry = [[1.8, 4.2], [T.click, T.click + 1.2], [T.friends, T.tweet[1] + 0.5], [T.faint1, T.faint1 + 1.0], [T.faint2 + 0.2, T.faint2 + 1.3], [T.own + 0.2, T.closeA], [T.h7, T.out[0]]]
        for (const [a, b] of cry) tears(r.x, r.y, r.size, t, a, b, { gap: 0.1, spread: 0.6, life: 0.45 })
        drawTissue(x, r.x - r.size * 0.55, r.y + r.size * 0.2, 3, t)
      }
    }
    // Taurus: peanuts. Unbothered. Ignores the mask entirely
    {
      let st = S_('happy', exitLook(t, [-1, 0]))
      if (inW(t, T.faint2 + 0.3, T.faint2 + 1.2)) st = S_('eyeroll', [0, -1])
      const r = star('tau', TAU_P, t, st, { pop: pop01(t, 0.5, 0.3), hops: [T.faint2 + 0.3, ...T.wave], glyph: false })
      if (r) { refs.tau = r; drawPeanuts(x, r.x + r.size * 0.5, r.y + r.size * 0.22 - (Math.floor(t * 4) % 2 ? 3 : 0), 4) }
    }
    for (const P of [PIS_P, TAU_P]) drawSeatFront(x, P[0], P[1], P[2])
  }

  // ── Virgo, the attendant
  function drawVirgo(t, refs) {
    let st = keyed(t, VIR_K)
    let [px, py, sz] = VIR_P
    const lift = 24 * win(t, [T.friends, T.friends + 0.3], [T.vestOut[0], T.vestOut[1]])
    py -= lift
    const bow = bump(t, T.bow, 0.7)
    st = { ...st, sq: (st.sq || 0) + 0.14 * bow + 0.06 * bump(t, T.click, 0.25) }
    const hops = [...HOPS.vir, T.virIn + 0.3, T.click, T.tab, T.put2 + 0.02, T.rise[1], ...T.wave]
    const r = star('vir', [px, py, sz], t, st, { pop: pop01(t, T.virIn, 0.36, 2.2) * popOut(t, T.out), hops })
    if (!r) return null
    refs.vir = r
    const c = r.c
    drawScarf(x, r.x, r.y + r.size * 0.3, Math.round(c * 0.9))
    drawPillbox(x, r.x + c * 1, r.top + c * 3.2, Math.round(c * 0.95), '#c8324a', 0.12)
    // the demo belt
    if (inW(t, T.beltIn[0], T.beltOut[1])) {
      const k = ease.outBack(prog(t, ...T.beltIn)) * (1 - ease.inCubic(prog(t, ...T.beltOut)))
      const gap = lerp(150, 0, ease.inCubic(prog(t, T.click - 0.3, T.click)))
      x.save(); x.globalAlpha *= clamp(k * 2); drawBelt(x, r.x, r.y + r.size * 0.36 + (1 - k) * 80, gap, Math.round(c * 0.75)); x.restore()
    }
    // the life vest + the two friends
    if (inW(t, T.vestIn[0], T.vestOut[1])) {
      const k = ease.outBack(prog(t, ...T.vestIn)) * (1 - ease.inCubic(prog(t, ...T.vestOut)))
      const inf = easeOutBack(prog(t, T.tab, T.tab + 0.3), 2.4)
      x.save(); x.globalAlpha *= clamp(k); x.translate(0, (1 - k) * -120); drawVest(x, r.x, r.y, r.size, inf); x.restore()
      if (t >= T.friends) {
        const fk = pop01(t, T.friends, 0.3, 2.4) * (1 - ease.inCubic(prog(t, ...T.vestOut)))
        star('f1', [r.x - r.size * 0.62, r.y + r.size * 0.42, 70], t, S_('happy', [1, -1]), { pop: fk, hops: [T.friends + 0.4, T.friends + 1.0, T.tweet[0]], color: PINK, glyph: false })
        star('f2', [r.x + r.size * 0.62, r.y + r.size * 0.42, 70], t, S_('happy', [-1, -1]), { pop: fk, hops: [T.friends + 0.7, T.friends + 1.3, T.tweet[1]], color: SKYBLUE, glyph: false })
      }
    }
    return r
  }

  // ── the front row
  function drawPassenger(t, id, P, st, hops, refs) {
    const r = star(id, P, t, st, { pop: pop01(t, 0.45 + (P[0] / 4000), 0.3) * popOut(t, T.out), hops })
    if (r) refs[id] = r
    return r
  }
  function drawCancer(t, refs) {
    const { P, rot, pale } = canState(t)
    const st = keyed(t, CAN_K)
    const hops = [T.revive, T.hop[0] + 0.02, T.rise[1], T.help + 0.1, T.canHome[1], ...T.wave, 39.6]
    const r = star('can', P, t, st, { pop: pop01(t, 0.5, 0.3) * popOut(t, T.out), hops, rot, color: hexMix(CAN.color, PALE, pale) })
    if (!r) return null
    refs.can = r
    const pivot = [P[0], P[1] + P[2] * 0.4]
    refs.canFace = rotP(face(r), pivot, rot); refs.canRot = rot
    if ((inW(t, T.faint1 + 0.2, T.revive) || inW(t, T.faint2 + 0.3, T.own))) { const hp = rotP([r.x, r.top + 10], pivot, rot); drawDizzy(x, hp[0], hp[1], r.size * 0.32, t, 5) }
    if (inW(t, T.pale1[0] + 0.3, T.faint1) || inW(t, T.pale2[0] + 0.2, T.faint2)) drawSweat(x, r.x + r.size * 0.3, r.top + r.size * 0.3 + ((t * 0.8) % 1) * 14, 5)
    return r
  }

  // ── oxygen masks: { hatch x, dangle point, who wears it when }
  const dropK = (t, d = 0) => easeOutBack(prog(t, T.drop + d, T.drop + d + 0.42), 2.2)
  function maskAt(t, id, refs) {
    // returns [mx, my, rot, onFace] or null
    const M = {
      sag: { hx: 140, d: 0.02, dang: [196, 1060] }, can: { hx: 330, d: 0.06, dang: [386, 1050] },
      ari: { hx: 750, d: 0.04, dang: [806, 1060] }, leo: { hx: 945, d: 0.08, dang: [1000, 1056] },
      vir: { hx: 640, d: 0.0, dang: [650, 900] }, pis: { hx: 330, d: 0.1, dang: [392, 742], hy: 650 }, tau: { hx: 750, d: 0.12, dang: [812, 742], hy: 650 },
    }[id]
    const hy = M.hy || HATCH_Y
    if (t < T.drop + M.d) return null
    const k = dropK(t, M.d)
    const sw = 6 * Math.sin(t * 2.2 + M.hx)
    let pos = [M.hx + (M.dang[0] - M.hx) * clamp(k), lerp(hy, M.dang[1], k)], on = false
    pos[0] += sw
    const toFace = (who, t0, t1, src) => { const f = refs[who] ? face(refs[who]) : null; if (!f) return; const e = ease.inOutCubic(prog(t, t0, t1)); pos = [lerp(src[0], f[0], e), lerp(src[1], f[1], e) - Math.sin(e * Math.PI) * 60]; on = e >= 1 }
    if (id === 'vir' && inW(t, T.virMask[0] - 0.3, T.virMask[1] + 0.3)) {
      const f = refs.vir ? face(refs.vir) : null
      if (f) { const e = ease.inOutCubic(prog(t, T.virMask[0] - 0.3, T.virMask[0])) * (1 - ease.inOutCubic(prog(t, T.virMask[1], T.virMask[1] + 0.3))); pos = [lerp(pos[0], f[0], e), lerp(pos[1], f[1], e)]; on = e >= 1 }
    }
    if (id === 'ari' && t >= T.ariMask - 0.3) toFace('ari', T.ariMask - 0.3, T.ariMask, pos)
    if (id === 'leo' && t >= T.leoMask - 0.3) toFace('leo', T.leoMask - 0.3, T.leoMask, pos)
    if (id === 'pis' && t >= T.pisMask - 0.3) toFace('pis', T.pisMask - 0.3, T.pisMask, pos)
    if (id === 'can' && t >= T.grab1) toFace('sag', T.grab1, T.put1, pos)
    if (id === 'sag' && t >= T.hop[0]) toFace('vir', T.hop[0], T.put2, pos)
    return [pos[0], pos[1], on, M.hx, hy]
  }
  function drawMasks(t, refs) {
    if (t < T.drop || t >= T.masksOut[1]) return
    const a = 1 - prog(t, ...T.masksOut)
    x.save(); x.globalAlpha *= a
    for (const id of ['pis', 'tau', 'vir', 'sag', 'can', 'ari', 'leo']) {
      const m = maskAt(t, id, refs)
      if (!m) continue
      const [mx, my, on, hx, hy] = m
      drawTube(x, hx, hy + 8, mx, my - 18, t, id === 'pis' || id === 'tau' ? 3 : 5)
      const who = { can: 'sag', sag: 'vir' }[id] || id
      const sz = refs[who] ? refs[who].size : 160
      if (on && refs[who]) drawStrap(x, mx, my - sz * 0.02, sz)
      drawMask(x, mx, my, (on ? sz * 0.3 : (id === 'pis' || id === 'tau' ? 32 : 52)), on ? 0 : 0.05 * Math.sin(t * 3 + hx))
    }
    // the spare that boings down in front of Cancer on the carpet
    if (t >= T.spare && refs.canFace) {
      const hx = 600, hy = 640, k = easeOutBack(prog(t, T.spare, T.spare + 0.45), 2.4)
      const dang = [refs.canFace[0] + 40, refs.canFace[1] - 120]
      let pos = [lerp(hx, dang[0], clamp(k)), lerp(hy, dang[1], k)], on = false
      if (t >= T.own - 0.3) { const e = ease.inOutCubic(prog(t, T.own - 0.3, T.own)); pos = [lerp(pos[0], refs.canFace[0], e), lerp(pos[1], refs.canFace[1], e)]; on = e >= 1 }
      drawTube(x, hx, hy, pos[0], pos[1] - 18, t, 5)
      x.save()
      if (on) { x.translate(pos[0], pos[1]); x.rotate(refs.canRot || 0); x.translate(-pos[0], -pos[1]); drawStrap(x, pos[0], pos[1], 165) }
      drawMask(x, pos[0], pos[1], on ? 50 : 52, 0)
      x.restore()
    }
    x.restore()
  }
  function drawHatches(t) {
    const open = prog(t, T.drop - 0.1, T.drop + 0.1) * (1 - prog(t, ...T.masksOut))
    for (const hx of [140, 330, 750, 945, 640]) drawHatch(x, hx, HATCH_Y, 4, open)
    for (const hx of [330, 750]) drawHatch(x, hx, 650, 3, open)
    drawHatch(x, 600, 640, 4, prog(t, T.spare - 0.1, T.spare) * (1 - prog(t, ...T.masksOut)))
  }

  // ── signs
  function drawSigns(t) {
    const belt = t < T.signOff ? (t >= T.chime ? (Math.floor((t - T.chime) * 3) % 2 === 0 || t > T.chime + 1 ? 1 : 0.3) : 0) : (t < T.h1Out[1] ? 1 : 0)
    drawSeatbeltSign(x, 540, 520, belt)
    const cur = exitIdx(t)
    EXITS.forEach((E, i) => {
      const lit = (t >= T.exits[i] && t < T.exitsOff) ? 1 : (t >= T.panelOut[1] ? 0.6 : 0)
      drawExitSign(x, E.x, E.y, lit)
      if (lit >= 1) {
        const k = pop01(t, T.exits[i], 0.3, 2.2) * (1 - ease.inCubic(prog(t, T.exitsOff - 0.2, T.exitsOff)))
        x.save(); x.translate(E.x, E.y + 66); x.scale(k, k)
        x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const w = x.measureText(E.label).width + 36
        x.fillStyle = 'rgba(16,9,38,0.94)'; x.beginPath(); x.roundRect(-w / 2, -24, w, 48, 24); x.fill()
        x.lineWidth = 3; x.strokeStyle = RED; x.stroke()
        x.fillStyle = '#fff1ea'; x.fillText(E.label, 0, 2)
        x.restore()
        // Virgo's airline point: gold arrows racing to the sign
        if (i === cur && t - T.exits[i] < 1.2) {
          for (let q = 0; q < 4; q++) {
            const u = ((t - T.exits[i]) * 1.6 + q * 0.25) % 1, from = [540, 960]
            const px = lerp(from[0], E.x, 0.25 + u * 0.55), py = lerp(from[1], E.y + 20, 0.25 + u * 0.55)
            x.save(); x.globalAlpha = Math.sin(u * Math.PI); drawPixelStar(x, px, py, 26, 2, GOLD); x.restore()
          }
        }
      }
    })
  }

  // ── the captain's porthole (THE STARS)
  function drawCaptain(t) {
    const vis = t >= T.capIn && (t < T.cut2 || t >= T.lessonOut[0])
    if (!vis) return
    let k = t < T.cut2 ? pop01(t, T.capIn, 0.4, 2.2) : pop01(t, T.lessonOut[0], 0.36, 2.2)
    k *= popOut(t, T.out)
    if (k <= 0.02) return
    x.save(); x.translate(CAP.x, CAP.y); x.scale(k, k)
    x.fillStyle = '#1a1030'; x.beginPath(); x.arc(0, 0, CAP.r + 14, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#6a4fa8'; x.beginPath(); x.arc(0, 0, CAP.r + 9, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#0d0822'; x.beginPath(); x.arc(0, 0, CAP.r, 0, Math.PI * 2); x.fill()
    x.save(); x.beginPath(); x.arc(0, 0, CAP.r, 0, Math.PI * 2); x.clip()
    const r = drawStarChar(x, 0, 18, 128, t, { color: STAR.sky, mood: keyed(t, STARS_K).mood, look: keyed(t, STARS_K).look, blink: keyed(t, STARS_K).blink, hops: [...HOPS.stars, T.capIn + 0.4, ...T.wave], seed: SEED.stars, glow: 0.8 })
    drawCaptainHat(x, r.x + 4, r.top + 14, 4, 0.08)
    x.restore()
    // rivets + the glass glint
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; x.fillStyle = '#c9a6ff'; x.fillRect(Math.cos(a) * (CAP.r + 9) - 3, Math.sin(a) * (CAP.r + 9) - 3, 6, 6) }
    x.globalAlpha = 0.18; x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(-30, -40, 30, 12, -0.6, 0, Math.PI * 2); x.fill()
    x.restore()
    if (t < T.capIn + 0.8) sparkleRing(t, CAP.x, CAP.y, T.capIn + 0.1, 8, 120, 0.4, 0.6)
  }

  // ── the tie-in: Cancer's card, three dealbreakers stamp on
  const PANEL = { x: 120, y: 700, w: 840, h: 640 }
  function drawPanel(t) {
    if (t < T.panel[0] || t > T.panelOut[1]) return
    const k = easeOutBack(prog(t, ...T.panel), 1.8), o = 1 - ease.inCubic(prog(t, ...T.panelOut))
    x.fillStyle = rgba('#07041a', 0.55 * clamp(k) * o); x.fillRect(0, 0, W, H)
    const { x: L0, y: T0, w, h } = PANEL
    x.save()
    x.globalAlpha = clamp(k * 2) * o
    x.translate(L0 + w / 2, T0 + h / 2 + (1 - k) * 260 + (1 - o) * 120); x.scale(lerp(0.85, 1, k), lerp(0.85, 1, k)); x.translate(-(L0 + w / 2), -(T0 + h / 2))
    x.save(); x.shadowColor = rgba(GOLD, 0.45); x.shadowBlur = 50
    x.beginPath(); x.roundRect(L0, T0, w, h, 38)
    const g = x.createLinearGradient(0, T0, 0, T0 + h); g.addColorStop(0, '#2c1660'); g.addColorStop(1, '#160934')
    x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 5; x.strokeStyle = '#f2d27a'; x.beginPath(); x.roundRect(L0, T0, w, h, 38); x.stroke()
    x.lineWidth = 2; x.strokeStyle = 'rgba(242,210,122,0.3)'; x.beginPath(); x.roundRect(L0 + 14, T0 + 14, w - 28, h - 28, 28); x.stroke()
    const cx = L0 + w / 2
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    x.fillStyle = GOLD; x.font = `700 26px ${MONO}`
    if ('letterSpacing' in x) x.letterSpacing = '4px'
    x.fillText(`YOUR CARD · ${CAN.glyph}︎ CANCER`, cx, T0 + 74)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.fillStyle = BONE; x.font = `800 54px ${INTER}`
    x.fillText('Dealbreakers', cx, T0 + 150)
    EXITS.forEach((E, i) => {
      const ts = T.stamps[i]
      if (t < ts) {
        x.save(); x.setLineDash([10, 10]); x.lineWidth = 3; x.strokeStyle = 'rgba(154,123,224,0.45)'
        x.beginPath(); x.roundRect(cx - 320, T0 + 210 + i * 110, 640, 76, 38); x.stroke(); x.restore()
        return
      }
      const kk = easeOutBack(prog(t, ts, ts + 0.22), 2.8), sc = lerp(1.6, 1, clamp(kk))
      const cy = T0 + 248 + i * 110
      x.save(); x.translate(cx, cy); x.rotate((i - 1) * 0.02); x.scale(sc, sc); x.globalAlpha *= clamp(kk * 2)
      x.beginPath(); x.roundRect(-320, -38, 640, 76, 38); x.fillStyle = '#4a1236'; x.fill(); x.lineWidth = 4; x.strokeStyle = RED; x.stroke()
      x.font = `700 32px ${MONO}`; x.textBaseline = 'middle'; x.fillStyle = '#fff1ea'; x.fillText(E.label, 0, 2)
      x.restore()
      const a = t - ts
      if (a > 0 && a < 0.4) {
        const p = ease.outCubic(a / 0.4)
        x.save(); x.globalAlpha = (1 - p) * x.globalAlpha; x.fillStyle = '#ffd0d8'
        for (let q = 0; q < 14; q++) { const an = q / 14 * Math.PI * 2; x.fillRect(cx + Math.cos(an) * (340 + p * 60) - 4, cy + Math.sin(an) * (44 + p * 40) - 4, 8, 8) }
        x.restore()
      }
    })
    x.fillStyle = 'rgba(239,230,214,0.62)'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('PICKED AT SIGNUP · ON YOUR CARD', cx, T0 + h - 40)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dx: 380 - t * 19 })
      if (t < T.out[1] + 0.02) {
        const s = cam(t), sh = shakeAt(t)
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(s, s); x.translate(-540, -1000)
        drawFlight(t)
        drawCabin(x, t)
        drawSigns(t)
        drawHatches(t)
        const refs = {}
        drawBackRow(t, refs)
        drawVirgo(t, refs)
        // front row: seat backs, the passengers, seat fronts
        for (const P of [SAG_P, CAN_P, ARI_P, LEO_P]) drawSeatBack(x, P[0], P[1], P[2])
        const sagSt = keyed(t, SAG_K), sagSq = 0.16 * bump(t, T.canTug, 0.35) + 0.08 * easeOutBack(prog(t, T.sagPuff, T.sagPuff + 0.3), 2.4)
        const rs = drawPassenger(t, 'sag', SAG_P, { ...sagSt, sq: (sagSt.sq || 0) + sagSq }, [...HOPS.sag, T.sagPuff, T.put2 + 0.05, ...T.wave], refs)
        if (rs && t >= T.sagPuff - 0.1) drawVest(x, rs.x, rs.y, rs.size, easeOutBack(prog(t, T.sagPuff, T.sagPuff + 0.3), 2.4))
        const ex = exitLook(t, null)
        let ariSt = S_('happy', ex || [-1, 0]), leoSt = S_('neutral', ex || [-1, 0])
        if (inW(t, T.put1, T.faint1 + 1) || inW(t, T.put2, T.faint2 + 1)) { ariSt = S_('wide', [-1, 1], { blink: false }); leoSt = S_('wide', [-1, 1], { blink: false }) }
        else if (inW(t, T.faint2 + 1, T.faint2 + 1.9)) { ariSt = S_('eyeroll', [0, -1]); leoSt = S_('eyeroll', [0, -1]) }
        else if (t >= T.own) { ariSt = S_('happy', [-1, 0]); leoSt = S_('sparkle', [-1, 0]) }
        drawPassenger(t, 'ari', ARI_P, ariSt, [T.exits[0], T.exits[1], T.exits[2], T.faint2 + 0.3, T.own + 0.2, ...T.wave], refs)
        drawPassenger(t, 'leo', LEO_P, leoSt, [T.exits[0] + 0.05, T.exits[1] + 0.05, T.exits[2] + 0.05, T.faint2 + 0.35, T.own + 0.3, ...T.wave], refs)
        if (!canInAisle(t)) drawCancer(t, refs)
        for (const P of [SAG_P, CAN_P, ARI_P, LEO_P]) drawSeatFront(x, P[0], P[1], P[2])
        if (rs && t >= T.canClick) drawSeatBelt(x, rs.x, rs.y + rs.size * 0.34, rs.size)
        if (canInAisle(t)) drawCancer(t, refs)
        drawMasks(t, refs)
        if (refs.vir && inW(t, T.l8 - 0.6, T.l8 + 2.2)) drawSweat(x, refs.vir.x - refs.vir.size * 0.34, refs.vir.top + refs.vir.size * 0.34, 5)
        // onomatopoeia
        ono('BING', 470, 450, t, T.chime, { size: 40, life: 0.55, rise: 14, color: GOLD, ticks: false })
        ono('BONG', 610, 450, t, T.chime + 0.27, { size: 40, life: 0.6, rise: 14, color: GOLD, ticks: false })
        ono('*CLICK*', 540, 1180, t, T.click, { size: 50, life: 0.8, rise: 20, color: '#dfe6ff' })
        ono('*click*', 250, 1090, t, T.canClick, { size: 40, life: 0.7, rise: 18, color: '#dfe6ff' })
        ono('*hnk!*', 140, 1060, t, T.canTug, { size: 44, life: 0.8, rise: 18, rot: -0.1 })
        ono('*FWOOMP*', 540, 1210, t, T.tab, { size: 52, life: 0.85, rise: 20, color: '#ffe27a' })
        ono('we got you!', 540, 1260, t, T.friends + 0.3, { size: 34, life: 1.2, rise: 10, color: PINK, ticks: false })
        ono('*FWOOMP*', 150, 1080, t, T.sagPuff, { size: 44, life: 0.8, rise: 18, color: '#ffe27a', rot: -0.08 })
        ono('*tweet*', PIS_P[0] + 70, PIS_P[1] - 70, t, T.tweet[0], { size: 36, life: 0.55, rise: 14, color: SKYBLUE })
        ono('*tweet*', PIS_P[0] + 90, PIS_P[1] - 100, t, T.tweet[1], { size: 36, life: 0.55, rise: 14, color: SKYBLUE })
        ono('*thud*', 250, 1060, t, T.faint1 + 0.05, { size: 44, life: 0.8, rise: 18 })
        ono('*snrk!*', 340, 1050, t, T.revive, { size: 44, life: 0.7, rise: 18, rot: 0.08 })
        ono('*gasp*', 820, 1060, t, T.put2 + 0.05, { size: 46, life: 0.8, rise: 22 })
        ono('*THUD*', 520, 1360, t, T.faint2 + 0.28, { size: 54, life: 0.8, rise: 18, color: '#ffd0a0' })
        ono('BING', 860, 470, t, T.capIn, { size: 36, life: 0.55, rise: 12, color: GOLD, ticks: false })
        ono('BONG', 990, 470, t, T.capIn + 0.27, { size: 36, life: 0.6, rise: 12, color: GOLD, ticks: false })
        ono('*boing*', 650, 1120, t, T.spare + 0.35, { size: 40, life: 0.7, rise: 16, color: '#ffe27a' })
        ono('*hhhhhh*', 330, 1040, t, T.own + 0.05, { size: 46, life: 1.0, rise: 30, color: MINT, ticks: false })
        if (refs.can && t >= T.own && t < T.own + 0.9) sparkleRing(t, refs.can.x, refs.can.y, T.own + 0.15, 12, 170, 0.3, 0.8)
        if (refs.sag && t >= T.help + 0.25) { const hk = pop01(t, T.help + 0.25, 0.3, 2.4) * (1 - prog(t, T.help + 1.0, T.help + 1.3)); if (hk > 0.02) { x.save(); x.translate(refs.sag.x, refs.sag.top - 20); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 7); x.restore() } }
        if (refs.can && t >= 39.5) { const hk = pop01(t, 39.5, 0.3, 2.4) * popOut(t, T.out); if (hk > 0.02) { x.save(); x.translate(refs.can.x, refs.can.top - 30); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 8); x.restore() } }
        drawCaptain(t)
        drawPanel(t)
        x.restore()
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      boxA.update(t); boxB.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.4 (hook → seatbelt), 10.7 (→ exits, flip), 18.75 (→ masks), 31.05 (→ the LESSON, deal).
// The default selection keeps 10.7 and 31.05; the others stay inert.
export const CUTS = [4.4, { t: T.cut1, kind: 'flip' }, 18.75, { t: T.cut2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. Key D = the engine's own palette, so pop / pluck / bell are written as heard; chip / lead / tom ride the
//    'sfx' bus as written.
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const N_ = { D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392, A4: 440, B4: 493.88, D5: 587.33, E5: 659.25, Fs5: 739.99, A5: 880, B5: 987.77, D6: 1174.66, Fs6: 1479.98 }
const POPN = [N_.A4, N_.B4, N_.D5, N_.E5, N_.Fs5, N_.A5, N_.D6]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), POPN[(base + i) % POPN.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, N_.A5, 0.05, 0], ['pluck', land, N_.A5, 0.04, 0.6, 0]]
/** the cabin chime: bing (A5) – bong (F#5) */
const chime = (t, g = 1) => [['bell', t, N_.A5, 0.06 * g, 1.8, -0.1], ['bell', +(t + 0.27).toFixed(3), N_.Fs5, 0.06 * g, 2.2, 0.1]]
const gasp = (t, g = 0.06, f = 392) => [['whoosh', +(t - 0.04).toFixed(3), 0.22, g], ['pop', t, f, 0.045, 0], ['pop', +(t + 0.05).toFixed(3), f * 1.5, 0.03, 0]]
const womp = t => [['chip', t, N_.E4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', +(t + 0.34).toFixed(3), 277.18, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const clickS = (t, g = 1) => [['tick', t, 0.08 * g], ['tick', +(t + 0.03).toFixed(3), 0.06 * g], ['pop', t, N_.D6, 0.03 * g, 0]]
const fwoomp = (t, g = 1) => [['whoosh', +(t - 0.05).toFixed(3), 0.35, 0.06 * g], ['chip', t, 130, 0.3, { ...FX, wave: 'tri', slide: 18, gain: 0.05 * g, decay: 0.2, sustain: 0.6 }], ['tom', t, 90, { ...FX, gain: 0.12 * g, decay: 0.2 }]]
const tweet = t => [['chip', t, 2350, 0.12, { ...FX, wave: 'square', duty: 0.25, vib: 0.05, gain: 0.025, decay: 0.05, sustain: 0.9 }], ['chip', +(t + 0.13).toFixed(3), 2600, 0.1, { ...FX, wave: 'square', duty: 0.25, vib: 0.05, gain: 0.022, decay: 0.05, sustain: 0.9 }]]
const thud = (t, g = 1) => [['tom', t, 70, { ...FX, gain: 0.26 * g, decay: 0.25 }], ['boom', t, 0.05 * g], ['clap', +(t + 0.005).toFixed(3), { ...FX, gain: 0.06 * g }]]
const faint = t => [['chip', t, N_.A4, 0.7, { ...FX, wave: 'tri', slide: -20, vib: 0.03, gain: 0.04, decay: 0.4, sustain: 0.6 }]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), +(f * (1 - i * 0.06)).toFixed(2), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.018, decay: 0.08, sustain: 0.5 }])
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.045, f0: 900, f1: 2600 }]]; for (let k = 0; k < 12; k++) out.push(['clap', +(t0 + 0.1 + k * 0.12 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const PITCH = { [SVIR]: 980, [SSAG]: 660, [SS]: 760 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · the hook: the chime, the seatbelt sign, Virgo
  ...head(T.h0, 5, T.h0Land, 0), ['pop', T.h0Land + 0.1, N_.D6, 0.04, 0],
  ...chime(T.chime), ['pop', T.virIn + 0.05, N_.D6, 0.04, 0], ['whoosh', T.virIn - 0.05, 0.3, 0.04],
  ...sob(2.0, N_.A5, 2),
  // 2 · seatbelt
  ...head(T.h1, 1, T.h1Land, 2), ['whoosh', T.beltIn[0], 0.3, 0.04],
  ...clickS(T.click, 1.2), ['bell', T.click + 0.02, N_.D6, 0.03, 1.0, 0],
  ['whoosh', T.canLean1[0], 0.22, 0.03], ...clickS(T.canClick, 0.8), ['chip', T.canTug, 220, 0.12, { ...FX, wave: 'square', duty: 0.25, slide: 24, gain: 0.04, decay: 0.08, sustain: 0.5 }], ['tom', T.canTug, 150, { ...FX, gain: 0.1, decay: 0.1 }],
  ['whoosh', T.beltOut[0], 0.3, 0.03],
  // 3 · exits: three lights, three synced head-turns
  ...head(T.h2, 3, T.h2Land, 1),
  ...T.exits.flatMap((e, i) => [['pop', e, [N_.D5, N_.Fs5, N_.A5][i], 0.05, [-0.5, 0.5, 0][i]], ['bell', +(e + 0.02).toFixed(3), [N_.D6, N_.Fs6 / 1.0, N_.A5 * 2][i] / (i === 2 ? 1 : 1), 0.025, 0.9, [-0.5, 0.5, 0][i]], ['whoosh', +(e - 0.06).toFixed(3), 0.18, 0.035]]),
  // 4 · the life vest
  ...head(T.h3, 3, T.h3Land, 3), ['whoosh', T.vestIn[0], 0.3, 0.04],
  ...fwoomp(T.tab), ['glitter', T.friends, T.friends + 0.5], ['pop', T.friends, N_.Fs5, 0.04, -0.4], ['pop', T.friends + 0.06, N_.A5, 0.04, 0.4],
  ['whoosh', T.canLean2[0], 0.22, 0.03], ...fwoomp(T.sagPuff, 0.7),
  ...tweet(T.tweet[0]), ...tweet(T.tweet[1]), ...sob(T.tweet[1] + 0.25, N_.A5, 2),
  // 5 · the masks drop; Cancer's first rescue, first faint
  ...head(T.h4, 3, T.h4Land, 0),
  ['whoosh', T.drop - 0.05, 0.4, 0.05], ...[0, 0.04, 0.08, 0.12].map(d => ['pop', +(T.drop + 0.4 + d).toFixed(3), N_.D5 * (1 + d), 0.03, d * 4 - 0.3]),
  ['whoosh', T.grab1, 0.28, 0.04], ['pop', T.put1, N_.B5, 0.04, -0.3],
  ...faint(T.pale1[0] + 0.2), ['whoosh', T.faint1 - 0.1, 0.2, 0.04], ...thud(T.faint1 + 0.05, 0.7), ...gasp(T.faint1 + 0.1, 0.05, 349.23),
  ...womp(T.l7 + 0.55),
  // 6 · attempt two: the aisle, Virgo, the carpet
  ['pop', T.revive, N_.D6, 0.045, 0], ['chip', T.revive, N_.A4, 0.18, { ...FX, wave: 'square', duty: 0.25, slide: 30, gain: 0.03, decay: 0.1, sustain: 0.6 }],
  ...head(T.h4b, 3, T.h4bLand, 2),
  ['whoosh', T.hop[0], 0.35, 0.05], ['pop', T.put2, N_.B5, 0.05, 0], ...gasp(T.put2 + 0.05, 0.07, 392),
  ...faint(T.pale2[0]), ...thud(T.faint2 + 0.28, 1.1), ...sob(T.faint2 + 0.4, N_.Fs6 / 2, 3),
  // 7 · the captain; the spare; her own mask; hhhhh
  ...chime(T.capIn, 0.9), ...head(T.h5, 5, T.h5Land, 1),
  ['whoosh', T.spare, 0.4, 0.04], ['chip', T.spare + 0.35, 330, 0.25, { ...FX, wave: 'tri', slide: 12, vib: 0.06, gain: 0.04, decay: 0.15, sustain: 0.6 }],
  ['pop', T.own, N_.D6, 0.05, 0], ['swell', T.own, T.own + 0.6, { bus: 'sfx', gain: 0.03, f0: 600, f1: 2400 }], ['glitter', T.own + 0.1, T.own + 0.8], ['bell', T.own + 0.15, N_.D6, 0.045, 1.8, 0], ['bell', T.own + 0.3, N_.Fs6, 0.03, 1.6, 0.2],
  ...head(T.h5b, 4, T.h5bLand, 3), ['whoosh', T.rise[0], 0.3, 0.04], ...cheers(T.rise[1], T.rise[1] + 1.0), ...sob(T.rise[1] + 0.2, N_.A5),
  ['pop', T.help + 0.25, N_.A5, 0.04, -0.3], ['bell', T.help + 0.27, N_.D6, 0.025, 1.0, -0.3],
  // 8 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 9 · the card: three stamps
  ...head(T.h6, 4, T.h6Land, 2), ['whoosh', T.panel[0], 0.4, 0.05],
  ...T.stamps.flatMap((s, i) => [['tom', s, 110 - i * 8, { ...FX, gain: 0.16, decay: 0.12 }], ['clap', +(s + 0.005).toFixed(3), { ...FX, gain: 0.06 }], ['pop', s + 0.02, [N_.D5, N_.Fs5, N_.A5][i], 0.04, 0]]),
  ['whoosh', T.panelOut[0], 0.3, 0.035],
  // 10 · enjoy the flight
  ...head(T.h7, 3, T.h7Land, 0), ...chime(T.h7Land + 0.3, 0.8),
  ...T.wave.map((w, i) => ['pop', w, [N_.D5, N_.Fs5, N_.A5][i], 0.03, (i - 1) * 0.4]),
  ...sob(T.h7 + 0.5, N_.A5),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES_A, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_B, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
