// stwestern — "High Noon." (45 s vertical Align ad, Star Talk "Wild Lessons" #2, music: lofi · Am, a spaghetti-western
// whistle on top). Story 0–40.6, then the shared end card.
//   0.0–4.5    "Date went great. | Who texts *first?*"  A dusty pixel saloon town on a rock in space: the SALOON, the
//              TELEGRAPH office, a clock tower at 11:59. ♌ LEO (cream hat) and ♏ SCORPIO (black hat) square off down the
//              street, phones holstered. BONG: high noon. A tumbleweed. LEO: "first one to text loses."
//   4.5–9.0    "High *noon.*"  SCORPIO: "then I'll never lose."  Letterbox, three Western extreme close-ups: Leo's
//              squint · Scorpio's squint · a phone in its holster, Leo's point twitching beside it.
//   9.0–11.2   "The town *watches.*"  ♋ CANCER (reading glasses) throws open the saloon shutters: "somebody just say
//              hi!!" Both stars turn and glare. She sinks; SLAM.
//  11.3        card cut (flip).
//  11.3–15.4   "1 PM. | Nobody *blinks.*"  Leo's phone twitches; Scorpio flinches; the town gasps (♉ Taurus at the saloon
//              doors with popcorn, Cancer peeking, ♓ Pisces sobbing in the telegraph window, as ever). Leo slowly lifts
//              the phone… LEO: "...just checking the time."  Synced eye-roll, womp.
//  15.45–19.6  "3 PM. | Someone's *typing…*"  Scorpio lifts its phone; a "typing…" bubble! Leo's double-take, the town
//              leans in… the bubble vanishes. SCORPIO: "nope. deleted it."  Groan.
//  19.7–23.2   "6 PM. | The sun gives *up.*"  The sun sinks, the sky goes orange; both stars doze off standing (zzz). A
//              huge tumbleweed rolls in, stops between them, sighs, and leaves. THE STARS: "babe. it's been six hours."
//              Both snap awake.
//  23.25–28.8  "9 PM. | *Draw.*"  Night. The score tape-stops into real silence; crickets; letterbox. Both phones rise
//              slowly… both thumbs fly… and two bubbles pop at the same instant: "had fun!" "had fun!" ✓✓. Beat. BZZT
//              BZZT: the music crashes back in, the double-take, heart-eyes, hats in the air, the whole town cheers.
//              "Same. Exact. *Second.*"  THE STARS: "nine hours. for 'had fun!'"
//  28.85       card cut (deal) into ★ LESSON UNLOCKED: "Nobody wins a | text-first standoff. | Just *text.*" (+1 BRAVE)
//  33.45–37.9  "Answers stay hidden | till you *both play.*"  A talk card ("Planned date or spontaneous date?"); each
//              star plays a face-down answer; both flip at the same moment: "Planned." ✓ ✓  THE STARS: "nobody goes
//              first. you both play."
//  37.95–40.42 "This town's big | enough for *two.*"  The two hop together, side by side, hats on; Pisces sobs. Everything
//              pops out by 40.42; the end card takes over at 40.6.
// One canvas (sky + world-space town and cast + screen-space close-ups and bars), DOM type + dialogue boxes + the shared
// lesson, grain on top. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawHat, drawPhone, drawHolster, drawTumbleweed, drawMesas, drawGround, drawSaloon, drawStore, drawShutters, drawWindowBack,
  drawWindowSill, drawClockTower, drawSun, drawCactus, drawPopcorn, drawGlasses, drawBubble, drawTear, drawSweat, drawPixelHeart, drawTissue, WOOD, WOOD2 } from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', SUN = '#ffb347', SKYBLUE = '#7fd0f0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid
export const KEY = 'Am'

const LEO = signStar('leo'), SCO = signStar('scorpio'), CAN = signStar('cancer'), TAU = signStar('taurus'), PIS = signStar('pisces')
const LEO_T = '#ffb45c', SCO_T = '#ff7f9e', CAN_T = '#7fd3ff'

// ── the timeline
export const T = {
  black: [0, 0.3],
  // the hook
  h0: 0.12, h0Land: 0.95, h0Out: [4.3, 4.48],
  bong: [BEAT(3), BEAT(4), BEAT(5)], tw1: [2.5, 5.3], l1: 2.3,
  // high noon
  h1: 4.6, h1Land: BEAT(8), l2: 4.85, h1Out: [8.82, 8.98],
  bars: [5.4, 5.62], barsOut: [8.9, 9.1], ecu: [5.6, 6.65, 7.7, 8.95], twitchE: [8.1, 8.55],
  // the town watches
  h1b: 9.05, h1bLand: 9.4, canOpen: [8.98, 9.2], canUp: 9.1, l3: 9.2, glare: 10.2, canDown: [10.5, 10.75], slam: 10.78, h1bOut: [11.08, 11.24],
  cut1: 11.3,
  // 1 PM
  spin1: 11.3, h2: 11.38, h2Land: BEAT(20), canPeek: 12.0, tauUp: 11.9,
  twitch: 12.35, flinch: 12.4, lift1: [12.75, 13.05], l4: 13.1, roll1: 14.35, lower1: [14.6, 14.9], h2Out: [15.24, 15.4],
  // 3 PM
  spin2: 15.45, h3: 15.5, h3Land: 16.1, lift2: [15.65, 15.95], typing: [16.1, 17.5], dbl: 16.3, lean: [16.4, 17.5], l5: 17.8, groan: 18.35, lower2: [18.8, 19.1], h3Out: [19.5, 19.66],
  // 6 PM
  spin3: 19.7, h4: 19.78, h4Land: 20.35, doze: 20.4, tw3: [20.3, 21.1, 22.55, 23.3], sigh: 21.85,
  starsIn: [20.62, 21.05], l6: 21.1, wake: 22.75, closeA: 23.15, h4Out: [23.08, 23.22],
  // 9 PM
  spin4: 23.25, h5: 23.32, h5Land: BEAT(42), crk: [23.7, 24.35], lift3: [24.05, 24.6], type: [24.6, 25.0], sent: BEAT(44), buzz: BEAT(45),
  look: 25.78, love: 26.12, cheer: [26.12, 27.9], hats: [26.15, 26.95], h5Out: [26.12, 26.26],
  h5b: 26.3, h5bLand: 26.7, l7: 26.5, closeB: 28.72, h5bOut: [28.6, 28.76],
  cut2: 28.85,
  // the lesson
  lesson: BEAT(51), lessonOut: [33.25, 33.45],               // 28.933
  // talk cards
  h6: 33.5, h6Land: BEAT(60), tie: [33.4, 33.9], talk: [33.5, 33.92], playA: 34.25, playB: 34.42, l8: 34.6, trem: [35.4, BEAT(64)], flip: BEAT(64),
  cardsOut: [37.55, 37.85], closeC: 37.7, h6Out: [37.72, 37.88],
  // the last line
  h7: 37.98, h7Land: BEAT(68), together: [37.9, 38.35], heart: 38.5, out: [40.02, 40.42], h7Out: [40.18, 40.42],
}

// ── the lines
const SLEO = `${LEO.glyph}︎ LEO`, SSCO = `${SCO.glyph}︎ SCORPIO`, SCAN = `${CAN.glyph}︎ CANCER`, SS = 'THE STARS'
const LINES_A = [
  { t: T.l1, speaker: SLEO, color: LEO_T, text: 'first one to text *loses.*' },
  { t: T.l2, speaker: SSCO, color: SCO_T, text: "then I'll *never* lose." },
  { t: T.l3, speaker: SCAN, color: CAN_T, text: 'somebody just say *hi!!*' },
  { t: T.l4, speaker: SLEO, color: LEO_T, text: '...just checking the *time.*' },
  { t: T.l5, speaker: SSCO, color: SCO_T, text: 'nope. *deleted* it.' },
  { t: T.l6, speaker: SS, color: GOLD, text: "babe. it's been *six hours.*" },
]
const LINES_B = [{ t: T.l7, speaker: SS, color: GOLD, text: "nine hours. for *'had fun!'*" }]
const LINES_C = [{ t: T.l8, speaker: SS, color: GOLD, text: 'nobody goes first. you *both* play.' }]
const CPS = 28
export const LTA = lineTimes(LINES_A, { cps: CPS }), LTB = lineTimes(LINES_B, { cps: CPS }), LTC = lineTimes(LINES_C, { cps: CPS })
const HOPS = {
  leo: talkHops(LINES_A, SLEO, { cps: CPS }), sco: talkHops(LINES_A, SSCO, { cps: CPS }), can: talkHops(LINES_A, SCAN, { cps: CPS }),
  stars: [...talkHops(LINES_A, SS, { cps: CPS }), ...talkHops(LINES_B, SS, { cps: CPS }), ...talkHops(LINES_C, SS, { cps: CPS })],
}

const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Nobody wins a | text-first standoff. | Just *text.*', chip: '+1 BRAVE', accentColor: GOLD, dim: 0.62 }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inW = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })

// ── the clock: minutes after midnight (each jump spins the hands over half a second)
const MIN_KEYS = [[0, 719], [T.bong[0] - 0.04, 720], [T.spin1, 780], [T.spin2, 900], [T.spin3, 1080], [T.spin4, 1260]]
function clockMin(t) {
  let v = MIN_KEYS[0][1]
  for (let i = 1; i < MIN_KEYS.length; i++) {
    const [k, m] = MIN_KEYS[i]
    if (t < k) break
    const d = i === 1 ? 0.12 : 0.5
    v = lerp(MIN_KEYS[i - 1][1], m, ease.inOutCubic(prog(t, k, k + d)))
  }
  return v
}
// the sky's hour, with a slow extra sink while the sun sets
const hourAt = t => clockMin(t) / 60 + 0.55 * ease.inOutQuad(prog(t, 19.9, 23.0))
function sunXY(t) {
  const h = hourAt(t)
  if (h <= 18) { const u = clamp((h - 12) / 6); return [lerp(940, 688, u), lerp(575, 960, u * u)] }
  return [688, 960 + (h - 18) / 0.55 * 360]
}
const warmK = t => { const h = hourAt(t); return clamp((h - 15.4) / 2.4) * (1 - clamp((h - 19.2) / 1.6)) }
const nightK = t => clamp((hourAt(t) - 19.3) / 1.6)

// ── where things are (world coords == screen coords at the rest camera)
const GROUND = 1300
const SAL = { x0: 10, x1: 330, top: 760 }, STO = { x0: 750, x1: 1070, top: 790 }, TOWER = { cx: 540, top: 560 }
const WIN = { w: 130, h: 112 }
const CAN_WIN = [190, 920], PIS_WIN = [890, 950]
const LEO_P = [250, 1185, 240], SCO_P = [830, 1185, 240]
const LEO_TIE = [168, 1210, 196], SCO_TIE = [912, 1210, 196]
const LEO_END = [425, 1185, 240], SCO_END = [655, 1185, 240]
const TAU_P = [84, 1170, 96]
const STARS_P = [905, 560, 150]
const SEED = { leo: 5, sco: 3, can: 9, tau: 17, pis: 23, stars: 11 }

// ── moods: [t, { mood, look, blink, sq, dy }]
const LEO_K = [
  [0, S_('squint', [1, 0])], [T.bong[0], S_('squint', [1, 0], { sq: 0.04 })], [T.l1, S_('squint', [1, 0])],
  [T.l2, S_('squint', [1, 0], { blink: false })],
  [T.l3, S_('neutral', [-1, -1])], [T.glare, S_('squint', [-1, -1], { blink: false })], [T.slam, S_('wide', [-1, -1], { blink: false, sq: -0.05 })], [T.slam + 0.4, S_('squint', [1, 0])],
  [T.twitch - 0.15, S_('neutral', [1, 1], { blink: false })], [T.flinch + 0.2, S_('neutral', [1, 1])], [T.lift1[1], S_('neutral', [1, 0], { blink: 0.4 })],
  [T.l4, S_('neutral', [0, 0], { blink: 0.45, sq: 0.03 })], [T.lower1[0], S_('squint', [1, 0])],
  [T.dbl, S_('wide', [1, -1], { blink: false, sq: -0.06 })], [T.dbl + 0.3, S_('wide', [1, -1], { blink: false })], [T.typing[1], S_('neutral', [1, 0], { blink: 0.5 })],
  [T.l5 + 0.4, S_('happy', [0, 0])], [T.groan, S_('squint', [1, 0])],
  [T.doze, S_('squint', [1, 0], { blink: 0.6, dy: 4 })], [T.doze + 0.7, S_('sleepy', [0, 0], { dy: 10, sq: 0.05 })],
  [T.wake, S_('wide', [0, -1], { blink: false, sq: -0.08 })], [T.wake + 0.35, S_('squint', [1, 0])],
  [T.h5, S_('squint', [1, 0], { blink: false })], [T.lift3[1], S_('squint', [1, 1], { blink: false })], [T.sent, S_('neutral', [1, 1], { blink: false })],
  [T.buzz, S_('wide', [1, 1], { blink: false, sq: -0.06 })], [T.look, S_('wide', [1, 0], { blink: false })], [T.love, S_('heart', [1, 0])],
  [T.cut2, S_('happy', [0, -1])], [T.lessonOut[0], S_('neutral', [1, -1])], [T.flip, S_('wide', [1, 0])], [T.flip + 0.4, S_('heart', [1, 0])],
  [T.h7, S_('heart', [1, 0])], [38.9, S_('happy', [1, 0])], [39.5, S_('heart', [1, 0])],
]
const SCO_K = [
  [0, S_('squint', [-1, 0])], [T.bong[0], S_('squint', [-1, 0], { sq: 0.04 })], [T.l2, S_('squint', [-1, 0], { blink: false })], [T.l2 + 1.2, S_('squint', [-1, 0])],
  [T.l3, S_('neutral', [-1, -1])], [T.glare, S_('squint', [-1, -1], { blink: false })], [T.slam, S_('wide', [-1, -1], { blink: false, sq: -0.05 })], [T.slam + 0.4, S_('squint', [-1, 0])],
  [T.flinch, S_('wide', [-1, 0], { blink: false, sq: -0.1 })], [T.flinch + 0.4, S_('wide', [-1, 0], { blink: false })], [T.l4 + 0.5, S_('squint', [-1, 0])],
  [T.roll1, S_('eyeroll', [0, -1])], [T.roll1 + 0.85, S_('squint', [-1, 0])],
  [T.lift2[0], S_('neutral', [-1, 1], { blink: false })], [T.typing[1] - 0.2, S_('squint', [-1, 1])], [T.l5, S_('squint', [-1, 0])],
  [T.doze, S_('squint', [-1, 0], { blink: 0.6, dy: 4 })], [T.doze + 0.5, S_('sleepy', [0, 0], { dy: 10, sq: 0.05 })],
  [T.wake + 0.05, S_('wide', [0, -1], { blink: false, sq: -0.08 })], [T.wake + 0.4, S_('squint', [-1, 0])],
  [T.h5, S_('squint', [-1, 0], { blink: false })], [T.lift3[1], S_('squint', [-1, 1], { blink: false })], [T.sent, S_('neutral', [-1, 1], { blink: false })],
  [T.buzz, S_('wide', [-1, 1], { blink: false, sq: -0.06 })], [T.look, S_('wide', [-1, 0], { blink: false })], [T.love, S_('heart', [-1, 0])],
  [T.cut2, S_('happy', [0, -1])], [T.lessonOut[0], S_('neutral', [-1, -1])], [T.flip, S_('wide', [-1, 0])], [T.flip + 0.4, S_('heart', [-1, 0])],
  [T.h7, S_('heart', [-1, 0])], [39.1, S_('happy', [-1, 0])], [39.6, S_('heart', [-1, 0])],
]
const STARS_K = [
  [0, S_('neutral', [-1, 1], { blink: 0.45 })], [T.l6 + 1.2, S_('neutral', [-1, 1], { blink: 0.55 })], [T.wake, S_('happy', [-1, 1])],
  [T.love, S_('happy', [0, 0])], [T.l7, S_('neutral', [-1, 1], { blink: 0.45 })], [T.lessonOut[0], S_('happy', [-1, 1])], [T.flip + 0.3, S_('sparkle', [-1, 1])],
  [T.h7, S_('happy', [0, 0])], [38.9, S_('wink', [-1, 1])], [39.5, S_('happy', [0, 0])],
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 44px Inter", "italic 500 190px 'EB Garamond'", "italic 500 48px 'EB Garamond'", "700 52px 'Space Mono'", "700 44px 'Space Mono'", "700 36px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, talkIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-6.png')])
  const BACK = bake(backIm, 400), TALK = bake(talkIm, 560)
  const BACK_BODY = 1320 / 1528, TALK_BODY = 610 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type (DOM, above the canvas)
  const H0 = popText(root, 'Date went great. | Who texts *first?*', { top: 172, size: 92, accentSize: 132, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.08, accentColor: SUN })
  const H1 = popText(root, 'High *noon.*', { top: 196, size: 124, accentSize: 178, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H1b = popText(root, 'The town | *watches.*', { top: 172, size: 104, accentSize: 150, at: T.h1b, late: 1, lateAt: T.h1bLand, wobble: true, accentColor: CAN_T })
  const H2 = popText(root, '1 PM. | Nobody *blinks.*', { top: 172, size: 104, accentSize: 150, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD })
  const H3 = popText(root, '3 PM. | Someone’s *typing…*', { top: 172, size: 96, accentSize: 140, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: SKYBLUE, fit: true })
  const H4 = popText(root, '6 PM. | The sun gives *up.*', { top: 172, size: 96, accentSize: 140, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: SUN, fit: true })
  const H5 = popText(root, '9 PM. | *Draw.*', { top: 172, size: 110, accentSize: 176, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: GOLD })
  const H5b = popText(root, 'Same. Exact. | *Second.*', { top: 172, size: 104, accentSize: 168, at: T.h5b, late: 1, lateAt: T.h5bLand, wobble: true, accentColor: PINK })
  const H6 = popText(root, 'Answers stay hidden | till you *both play.*', { top: 168, size: 82, accentSize: 112, at: T.h6, late: 2, lateAt: T.h6Land, wobble: true, accentColor: LAV, lineHeight: 1.12, fit: true })
  const H7 = popText(root, 'This town’s big | enough for *two.*', { top: 172, size: 100, accentSize: 156, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, gap: 0.08, accentColor: PINK, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H1b, T.h1bOut], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H5b, T.h5bOut], [H6, T.h6Out], [H7, T.h7Out]]
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1478, width: 960, height: 290, open: T.l1 - 0.24, close: T.closeA, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1478, width: 960, height: 290, open: T.l7 - 0.24, close: T.closeB, cps: CPS })
  const boxC = dialogueBox(root, { lines: LINES_C, y: 1478, width: 960, height: 290, open: T.l8 - 0.24, close: T.closeC, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── camera: (fx, fy) maps to the screen (540, 1000) at scale s
  function cam(t) {
    let s = 1, fx = 540, fy = 1000
    if (t < T.h1) { s = 1 + 0.03 * ease.inOutQuad(prog(t, 0.3, 4.4)); fy = 1010 }
    // the draw: a slow push into the street, eased back when the town erupts
    const k = ease.inOutCubic(prog(t, T.h5, T.sent)) * (1 - ease.inOutCubic(prog(t, T.love, T.love + 0.8)))
    s += 0.12 * k; fy = lerp(fy, 1060, k)
    s += 0.03 * bump(t, T.flinch, 0.35) + 0.025 * bump(t, T.slam, 0.3) + 0.04 * bump(t, T.buzz, 0.4)
    return { s, fx, fy }
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.slam, 9], [T.bong[0], 5], [T.buzz, 12], [T.love, 6], [T.wake, 5]]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }

  // ── little helpers drawn on the canvas
  /** an onomatopoeia ("*bzzt*", "*gasp*") popping up and drifting, with a dark outline so it reads anywhere */
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
  /** tears arcing out of both eyes from t0 to t1 (pure f(t)) */
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
  const COLS = { leo: LEO, sco: SCO, can: CAN, tau: TAU, pis: PIS }
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1, rot = 0 } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    x.save()
    if (rot) { x.translate(px0, py0 + sz * 0.4); x.rotate(rot); x.translate(-px0, -(py0 + sz * 0.4)) }
    const r = drawStarChar(x, px0, py0 + (st.dy || 0), sz, t, { color: id === 'stars' ? STAR.sky : COLS[id].color, glyph: glyph && sz >= 120 && id !== 'stars' ? COLS[id].glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id], pop, glow: 0.9, bob: st.mood === 'sleepy' ? sz * 0.012 : sz * 0.03, alpha })
    x.restore()
    return { ...r, c: r.size / 36 }
  }

  // ── the town
  function drawTown(t) {
    const warm = warmK(t), night = nightK(t)
    // the sunset glow over the sky, then a deeper night
    if (warm > 0) {
      const g = x.createLinearGradient(0, 300, 0, GROUND)
      g.addColorStop(0, rgba('#ff7a59', 0)); g.addColorStop(0.55, rgba('#ff8a4a', 0.32 * warm)); g.addColorStop(1, rgba('#ffc06a', 0.55 * warm))
      x.fillStyle = g; x.fillRect(-200, 300, W + 400, GROUND - 300)
    }
    if (night > 0) { x.fillStyle = rgba('#0a0620', 0.32 * night); x.fillRect(-200, -200, W + 400, GROUND + 200) }
    // the sun crosses the sky with the clock and sinks behind the town
    const [sx, sy] = sunXY(t)
    if (sy < GROUND + 80) drawSun(x, sx, sy, 54)
    drawMesas(x, GROUND, W)
    const mins = clockMin(t)
    drawClockTower(x, TOWER.cx, TOWER.top, GROUND, mins, night)
    // the clock face bonks on each strike / spin
    drawSaloon(x, SAL.x0, SAL.x1, SAL.top, GROUND, night)
    drawStore(x, STO.x0, STO.x1, STO.top, GROUND, night)
    if (night > 0 || warm > 0) { x.fillStyle = rgba('#1a0c34', 0.22 * warm + 0.3 * night); x.fillRect(-200, 420, W + 400, GROUND - 420) }
    drawGround(x, GROUND, W, H - GROUND + 200)
    drawCactus(x, 1040, 1330, 6)
    drawCactus(x, 40, 1360, 5)
  }
  // the windows: their insides, who's in them, the sills and shutters
  function canShutter(t) {
    let o = 0
    if (t >= T.canOpen[0]) o = ease.outBack(prog(t, ...T.canOpen))
    if (t >= T.slam - 0.12) o = 1 - ease.inQuad(prog(t, T.slam - 0.12, T.slam))
    if (t >= T.canPeek) o = 0.55 * ease.outCubic(prog(t, T.canPeek, T.canPeek + 0.4))
    if (t >= T.love) o = Math.max(o, ease.outBack(prog(t, T.love, T.love + 0.2)))
    return clamp(o, 0, 1.1)
  }
  function canState(t) {
    // [rise 0…1, mood]
    let up = 0
    if (t >= T.canUp) up = easeOutBack(prog(t, T.canUp, T.canUp + 0.32), 2)
    if (t >= T.canDown[0]) up = 1 - ease.inCubic(prog(t, ...T.canDown))
    if (t >= T.canPeek) up = 0.42 * ease.outCubic(prog(t, T.canPeek + 0.2, T.canPeek + 0.6))
    if (inW(t, T.flinch, T.l4 + 1.4)) up = Math.max(up, lerp(0.42, 0.85, easeOutBack(prog(t, T.flinch, T.flinch + 0.25), 2)))
    if (inW(t, T.lean[0], T.groan + 0.6)) up = Math.max(up, lerp(0.42, 0.8, ease.outCubic(prog(t, T.lean[0], T.lean[0] + 0.3))))
    if (t >= T.love) up = easeOutBack(prog(t, T.love, T.love + 0.3), 2.2)
    let mood = S_('sparkle', [1, 0])
    if (t < T.glare) mood = S_('wide', [1, 1], { blink: false })
    else if (t < T.canDown[1]) mood = S_('neutral', [1, 1], { blink: 0.45 })
    else if (inW(t, T.flinch, T.l4)) mood = S_('wide', [1, 0], { blink: false })
    else if (inW(t, T.roll1, T.roll1 + 0.85)) mood = S_('eyeroll', [0, -1])
    else if (inW(t, T.lean[0], T.typing[1])) mood = S_('sparkle', [1, 0])
    else if (inW(t, T.groan, T.groan + 0.85)) mood = S_('eyeroll', [0, -1])
    else if (inW(t, T.doze, T.wake)) mood = S_('sleepy', [0, 0])
    else if (inW(t, T.h5, T.love)) mood = S_('wide', [1, 0], { blink: false })
    else if (t >= T.love) mood = S_('heart', [1, 0])
    return { up, mood }
  }
  function drawWindows(t) {
    const night = nightK(t)
    // Cancer's saloon window
    {
      const [cx, cy] = CAN_WIN
      drawWindowBack(x, cx, cy, WIN.w, WIN.h, night)
      const { up, mood } = canState(t)
      if (up > 0.02) {
        x.save(); x.beginPath(); x.rect(cx - WIN.w / 2, cy - WIN.h / 2 - 140, WIN.w, WIN.h + 140); x.clip()
        const P = [cx, cy + 70 - up * 70, 100]
        const hops = [...HOPS.can, T.flinch + 0.02, T.love + 0.3, T.love + 0.85, T.love + 1.4]
        const r = star('can', P, t, mood, { hops, glyph: false })
        if (r) drawGlasses(x, r.x, r.y + (mood.dy || 0), r.size)
        x.restore()
      }
      drawWindowSill(x, cx, cy, WIN.w, WIN.h)
      drawShutters(x, cx, cy, WIN.w, WIN.h, canShutter(t), WOOD)
    }
    // Pisces' telegraph window: always there, always crying
    {
      const [cx, cy] = PIS_WIN
      drawWindowBack(x, cx, cy, WIN.w, WIN.h, night)
      const up = easeOutBack(prog(t, 0.6, 0.95), 2) * popOut(t, T.out)
      if (up > 0.02) {
        x.save(); x.beginPath(); x.rect(cx - WIN.w / 2, cy - WIN.h / 2 - 140, WIN.w, WIN.h + 140); x.clip()
        const big = inW(t, T.lean[0], T.typing[1]) || t >= T.love || inW(t, T.flinch, T.flinch + 0.8)
        const P = [cx, cy + 70 - (big ? 0.85 : 0.55) * 70 * up, 100]
        const mood = inW(t, T.doze, T.wake) ? S_('sleepy', [0, 0]) : inW(t, T.h5, T.love) ? S_('wide', [-1, 0], { blink: false }) : S_('sparkle', [-1, 0])
        const r = star('pis', P, t, mood, { hops: [T.flinch, T.dbl, T.love + 0.1, T.love + 0.6, T.love + 1.1, T.heart], glyph: false })
        x.restore()
        if (r) {
          drawTissue(x, r.x - r.size * 0.5, cy + 34, 4, t)
          const cry = [[1.2, 3.4], [T.flinch, T.flinch + 1.2], [T.dbl, T.typing[1]], [20.0, T.doze + 0.4], [T.love + 0.05, T.cheer[1] + 0.8], [T.flip + 0.2, T.flip + 1.4], [T.h7 + 0.3, T.out[0]]]
          for (const [a, b] of cry) tears(r.x, r.y, r.size, t, a, b, { gap: 0.1, spread: 0.7, life: 0.5 })
        }
      }
      drawWindowSill(x, cx, cy, WIN.w, WIN.h)
      drawShutters(x, cx, cy, WIN.w, WIN.h, 1, WOOD2)
    }
  }
  // Taurus at the saloon doors with popcorn (from 1 PM on)
  function drawTaurus(t) {
    if (t < T.tauUp) return
    const k = easeOutBack(prog(t, T.tauUp, T.tauUp + 0.35), 2.2) * popOut(t, T.out)
    if (k <= 0.02) return
    let st = S_('neutral', [1, 0])
    if (inW(t, T.flinch, T.l4)) st = S_('wide', [1, 0], { blink: false })
    else if (inW(t, T.roll1, T.roll1 + 0.85)) st = S_('eyeroll', [0, -1])
    else if (inW(t, T.lean[0], T.typing[1])) st = S_('wide', [1, -1], { blink: false })
    else if (inW(t, T.groan, T.groan + 0.85)) st = S_('eyeroll', [0, -1])
    else if (inW(t, T.doze, T.wake)) st = S_('sleepy', [0, 0])
    else if (inW(t, T.h5, T.love)) st = S_('wide', [1, 0], { blink: false })
    else if (t >= T.love) st = S_('happy', [0, 0])
    const r = star('tau', TAU_P, t, st, { pop: k, hops: [T.flinch, T.love + 0.05, T.love + 0.55, T.love + 1.05], glyph: false })
    if (!r) return
    const munch = inW(t, T.l4, T.lower1[1]) || inW(t, T.l5, T.l5 + 1.5) || inW(t, T.h4, T.doze)
    drawPopcorn(x, r.x + r.size * 0.42, r.y + r.size * 0.36 - (munch && Math.floor(t * 6) % 2 ? 4 : 0), 4)
    // popcorn flies at the flinch and at the cheer
    for (const t0 of [T.flinch, T.love]) {
      const a = t - t0
      if (a < 0 || a > 1) continue
      for (let i = 0; i < 7; i++) {
        const vx = (i - 3) * 60, vy = -320 - (i % 3) * 80
        x.fillStyle = i % 3 ? '#fffaf0' : '#ffd23f'
        x.fillRect(Math.round(r.x + r.size * 0.42 + vx * a), Math.round(r.y + r.size * 0.2 + vy * a + 700 * a * a), 8, 8)
      }
    }
  }

  // ── the two duelists
  function place(t, who) {
    const P0 = who === 'leo' ? LEO_P : SCO_P, PT = who === 'leo' ? LEO_TIE : SCO_TIE, PE = who === 'leo' ? LEO_END : SCO_END
    const hopTo = (A, B, a, b) => { const p = prog(t, a, b), e = ease.inOutCubic(p); return [lerp(A[0], B[0], e), lerp(A[1], B[1], e) - Math.sin(p * Math.PI) * 90, lerp(A[2], B[2], e)] }
    if (t < T.tie[0]) return P0
    if (t < T.together[0]) return hopTo(P0, PT, ...T.tie)
    return hopTo(PT, PE, ...T.together)
  }
  /** the phone: where it is (holster or raised), its size, its screen */
  function phoneState(t, who) {
    const lifts = who === 'leo' ? [[T.lift1, T.lower1]] : [[T.lift2, T.lower2]]
    lifts.push([T.lift3, [T.cut2 - 0.01, T.cut2]])
    let raise = 0
    for (const [up, down] of lifts) {
      if (t >= up[0] && t < down[1]) raise = Math.max(raise, ease.inOutCubic(prog(t, ...up)) * (1 - ease.inOutCubic(prog(t, ...down))))
    }
    let mode = 'off'
    if (raise > 0.5) {
      if (who === 'sco' && inW(t, T.typing[0] - 0.15, T.typing[1])) mode = 'type'
      else if (inW(t, T.type[0], T.sent)) mode = 'type'
      else if (t >= T.sent && t < T.cut2) mode = 'sent'
      else mode = 'lit'
    }
    // jiggles: the twitch (Leo), the buzz (both)
    let jx = 0, jy = 0
    if (who === 'leo' && inW(t, T.twitch, T.twitch + 0.32)) { jx = 6 * Math.sin(t * 120); jy = -5 * bump(t, T.twitch, 0.32) }
    if (inW(t, T.buzz, T.buzz + 0.5)) jx = 7 * Math.sin(t * 140) * (1 - prog(t, T.buzz, T.buzz + 0.5))
    return { raise, mode, jx, jy }
  }
  function drawDuelist(t, who) {
    const P = place(t, who), side = who === 'leo' ? 1 : -1
    const st = keyed(t, who === 'leo' ? LEO_K : SCO_K)
    const hops = [...(who === 'leo' ? HOPS.leo : HOPS.sco), T.slam + 0.02, T.wake, T.love + 0.02, T.love + 0.55, T.love + 1.1, T.flip + 0.35, T.heart, 39.2]
    if (who === 'sco') hops.push(T.flinch)
    const k = popOut(t, T.out)
    let sq = st.sq || 0
    if (who === 'sco') sq -= 0.1 * bump(t, T.flinch, 0.3)
    const r = star(who, P, t, { ...st, sq }, { pop: k, hops })
    if (!r) return null
    const c = r.c
    // the phone (behind the holster when holstered; in front of the face when raised)
    const ph = phoneState(t, who)
    const hx = r.x + side * r.size * 0.27, hy = r.y + r.size * 0.24
    const rx = r.x + side * r.size * 0.52, ry = r.y - r.size * 0.02
    const ppx = lerp(c * 0.55, c * 0.85, ph.raise) * clamp(k)
    const pxx = lerp(hx, rx, ph.raise) + ph.jx, pyy = lerp(hy, ry, ph.raise) - Math.sin(ph.raise * Math.PI) * 30 + ph.jy
    drawPhone(x, pxx, pyy, ppx, { mode: ph.mode, t, glow: ph.mode === 'off' ? 0 : ph.raise, rot: side * lerp(0.15, -0.08, ph.raise) })
    if (k > 0.3) drawHolster(x, hx, hy + c * 0.6, c * 0.55)
    // the hat (flies at the cheer)
    let hy0 = r.top + c * 4.2, hrot = side * -0.06, hdx = 0
    if (inW(t, ...T.hats)) { const p = prog(t, ...T.hats); hy0 -= Math.sin(p * Math.PI) * 230; hrot += side * p * Math.PI * 2; hdx = side * -20 * Math.sin(p * Math.PI) }
    drawHat(x, r.x + hdx, hy0, c * 0.95, who === 'leo' ? { hat: '#ecd3a0', band: '#c8324a', rot: hrot, alpha: clamp(k) } : { hat: '#2e2640', band: '#ff6f9a', rot: hrot, alpha: clamp(k) })
    // sweat: "...just checking the time"
    if (who === 'leo' && inW(t, T.l4 - 0.2, T.lower1[1] + 0.3)) drawSweat(x, r.x - r.size * 0.34, r.top + r.size * 0.32 + ((t * 0.8) % 1) * 18, Math.max(3, Math.round(c * 0.75)))
    if (inW(t, T.h5 + 0.6, T.sent)) drawSweat(x, r.x - side * r.size * 0.36, r.top + r.size * 0.3 + ((t * 0.6 + (who === 'leo' ? 0 : 0.5)) % 1) * 18, Math.max(3, Math.round(c * 0.75)))
    return r
  }

  // ── the bubbles: Scorpio's "typing…" and the two "had fun!"s
  function drawTyping(t, r) {
    if (!r || !inW(t, T.typing[0], T.typing[1] + 0.25)) return
    const k = pop01(t, T.typing[0], 0.28, 2.4) * (1 - ease.inCubic(prog(t, T.typing[1], T.typing[1] + 0.22)))
    if (k <= 0.02) return
    const bx = r.x - 30, by = r.top - 118
    x.save(); x.translate(bx, by); x.scale(k, k)
    drawBubble(x, -110, -52, 220, 104, { tail: 'down', tailX: 140, px: 6 })
    for (let i = 0; i < 3; i++) { const jy = -10 * Math.max(0, Math.sin((t - T.typing[0]) * 9 - i * 0.9)); x.fillStyle = '#6a5a8a'; x.fillRect(-58 + i * 44, -10 + jy, 26, 26) }
    x.restore()
  }
  function drawHadFun(t, r, who) {
    if (!r || t < T.sent || t >= T.cut2) return
    const k = pop01(t, T.sent, 0.3, 2.6) * (1 - ease.inQuad(prog(t, T.cut2 - 0.25, T.cut2)))
    const side = who === 'leo' ? 1 : -1
    const bx = r.x + side * 26, by = r.top - 128
    x.save(); x.translate(bx, by); x.scale(k, k); x.rotate(side * -0.03)
    drawBubble(x, -150, -60, 300, 112, { tail: 'down', tailX: side > 0 ? 110 : 190, px: 6, fill: '#e7f4ff' })
    x.fillStyle = '#1e3a8a'; x.font = `800 50px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('had fun!', -14, -4)
    x.fillStyle = '#2f9e5f'; x.font = `700 24px ${MONO}`; x.fillText('✓✓', 112, 22)
    x.restore()
    if (t < T.sent + 0.7) sparkleRing(t, bx, by, T.sent, 8, 150, side, 0.6)
  }

  // ── the close-ups (screen space): Leo's eyes · Scorpio's eyes · the phone in its holster
  const BAND = [610, 1190]
  function drawBars(t) {
    const kECU = ease.outCubic(prog(t, ...T.bars)) * (1 - ease.inCubic(prog(t, ...T.barsOut)))
    const kDraw = ease.inOutCubic(prog(t, T.h5, T.h5 + 0.6)) * (1 - ease.inOutCubic(prog(t, T.buzz, T.buzz + 0.4)))
    if (kECU > 0) {
      x.fillStyle = 'rgba(4,2,10,0.97)'
      x.fillRect(0, 0, W, BAND[0] * kECU); x.fillRect(0, H - (H - BAND[1]) * kECU, W, (H - BAND[1]) * kECU)
    }
    if (kDraw > 0) {
      x.fillStyle = 'rgba(4,2,10,0.9)'
      x.fillRect(0, 0, W, 120 * kDraw); x.fillRect(0, H - 130 * kDraw, W, 130 * kDraw)
    }
  }
  function drawECU(t) {
    const [e0, e1, e2, e3] = T.ecu
    if (t < e0 || t >= e3) return
    x.save(); x.beginPath(); x.rect(0, BAND[0], W, BAND[1] - BAND[0]); x.clip()
    if (t < e2) {
      const leo = t < e1, a = leo ? e0 : e1, p = prog(t, a, leo ? e1 : e2)
      const size = 1680 + 120 * p, cy = 900 - size * 0.04
      x.fillStyle = '#120a22'; x.fillRect(0, BAND[0], W, BAND[1] - BAND[0])
      drawStarChar(x, 540 + (leo ? 30 : -30), cy + size * 0.06, size, t, { color: leo ? LEO.color : SCO.color, glyph: null, mood: 'squint', look: leo ? [1, 0] : [-1, 0], blink: p > 0.55 ? 0.35 + 0.25 * ease.inOutQuad(prog(p, 0.55, 0.9)) : 0.25, bob: 0, glow: 0, tips: false, seed: leo ? 5 : 3 })
      // the hat brim across the top of the frame
      const hat = leo ? '#ecd3a0' : '#2e2640'
      x.fillStyle = '#1a1030'; x.fillRect(0, BAND[0], W, 92)
      x.fillStyle = hat; x.fillRect(0, BAND[0], W, 80)
      x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(0, BAND[0] + 64, W, 16)
      // a bead of sweat on the second one
      if (!leo && p > 0.3) drawSweat(x, 820, 760 + ease.inQuad(prog(p, 0.3, 1)) * 120, 12)
      if (leo) { x.fillStyle = 'rgba(255,200,120,0.12)'; x.fillRect(0, BAND[0], W, BAND[1] - BAND[0]) }
    } else {
      // the holster: Leo's point twitches beside the phone
      const g = x.createLinearGradient(0, BAND[0], 0, BAND[1]); g.addColorStop(0, '#ffc98a'); g.addColorStop(1, '#f39a3a')
      x.fillStyle = g; x.fillRect(0, BAND[0], W, BAND[1] - BAND[0])
      x.fillStyle = 'rgba(160,60,30,0.25)'; for (let k = 0; k < 6; k++) x.fillRect(0, BAND[0] + 40 + k * 96, W, 8)
      const tw = (inW(t, T.twitchE[0], T.twitchE[0] + 0.22) || inW(t, T.twitchE[1], T.twitchE[1] + 0.22)) ? 10 * Math.sin(t * 130) : 0
      // the point: a big tapered pixel wedge from the left, its tip twitching toward the phone
      const tipX = 470 + tw, tipY = 880, P = 12
      for (let dy = -200; dy <= 200; dy += P) {
        const reach = tipX - Math.abs(dy) * 1.55
        if (reach < 0) continue
        x.fillStyle = '#1a1030'; x.fillRect(0, tipY + dy, Math.round(reach + P), P)
        x.fillStyle = dy < -60 ? '#ffd27a' : dy < 60 ? '#f7b55a' : '#e07a2a'; x.fillRect(0, tipY + dy, Math.round(reach), P)
      }
      drawPhone(x, 720, 820, 15, { mode: 'off' })
      drawHolster(x, 720, 870, 16)
      ono('*twitch*', 470, 700, t, T.twitchE[0], { size: 54, life: 0.5, rise: 14 })
      ono('*twitch*', 500, 1010, t, T.twitchE[1], { size: 54, life: 0.5, rise: 14, rot: 0.1 })
    }
    x.restore()
  }

  // ── tumbleweeds
  function drawTumbleweeds(t) {
    // the first: small, quick, across the front
    if (inW(t, ...T.tw1)) {
      const p = prog(t, ...T.tw1), X = lerp(-90, W + 90, p), r = 42
      drawTumbleweed(x, X, GROUND + 22 - r - Math.abs(Math.sin(p * Math.PI * 5)) * 46, r, X / r)
    }
    // the second: under "...just checking the time"
    if (inW(t, 13.9, 15.6)) {
      const p = prog(t, 13.9, 15.6), X = lerp(W + 80, -80, p), r = 34
      drawTumbleweed(x, X, GROUND - 40 - r - Math.abs(Math.sin(p * Math.PI * 4)) * 30, r, -X / r)
    }
    // the third: huge, stops between them, sighs, leaves
    const [a, b, c, d] = T.tw3
    if (inW(t, a, d)) {
      const r = 104
      let X, bounce = 0, rot
      if (t < b) { const p = ease.outCubic(prog(t, a, b)); X = lerp(-140, 540, p); bounce = Math.abs(Math.sin(p * Math.PI * 3)) * 40 * (1 - p) }
      else if (t < c) { X = 540 + 8 * Math.sin((t - b) * 5) * Math.exp(-(t - b) * 1.5) }
      else { const p = ease.inCubic(prog(t, c, d)); X = lerp(540, W + 160, p); bounce = Math.abs(Math.sin(p * Math.PI * 3)) * 30 * p }
      rot = X / r
      drawTumbleweed(x, X, GROUND + 14 - r - bounce, r, rot)
      ono('*sigh*', 540, GROUND - 250, t, T.sigh, { size: 48, life: 1.0, rise: 30, ticks: false, color: 'rgba(239,230,214,0.95)' })
    }
  }

  // ── THE STARS
  function drawStars(t) {
    if (t < T.starsIn[0]) return
    if (t >= T.cut2 && t < T.lessonOut[0]) return
    const pIn = prog(t, ...T.starsIn)
    const P = pIn < 1 ? [lerp(1220, STARS_P[0], ease.outCubic(pIn)), lerp(240, STARS_P[1], ease.outCubic(pIn)), STARS_P[2]] : STARS_P
    let k = popOut(t, T.out)
    if (t >= T.lessonOut[0]) k *= pop01(t, T.lessonOut[0], 0.36, 2.2)
    const r = star('stars', P, t, keyed(t, STARS_K), { pop: k, hops: [...HOPS.stars, T.starsIn[1], T.love + 0.1, T.lessonOut[0] + 0.36] })
    if (!r) return
    if (pIn > 0 && pIn < 1) for (let i = 1; i <= 4; i++) drawPixelStar(x, P[0] + 30 * i, P[1] - 20 * i, 30 - i * 5, i % 2, GOLD)
    if (t < T.starsIn[1] + 0.3) sparkleRing(t, r.x, r.y, T.starsIn[1] - 0.1, 10, 120, 0.3, 0.6)
    if (t >= T.lessonOut[0] && t < T.lessonOut[0] + 0.7) sparkleRing(t, r.x, r.y, T.lessonOut[0] + 0.05, 8, 100, 0.9, 0.6)
  }

  // ── the tie-in: a talk card, two face-down answers, one flip
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function cardImg(img, body, cx, cy, wBody, rot = 0, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / body, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function answerFace(cx, cy, w, sx, stampK, rot = 0) {
    const h = w * 1.52
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
    x.save(); x.shadowColor = 'rgba(242,199,92,0.5)'; x.shadowBlur = 30
    rr(-w / 2, -h / 2, w, h, 20); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2e1c62'); g.addColorStop(1, '#130a2e'); x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 6; x.strokeStyle = GOLD; rr(-w / 2, -h / 2, w, h, 20); x.stroke()
    x.lineWidth = 2; x.strokeStyle = 'rgba(242,199,92,0.55)'; rr(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 10); x.stroke()
    x.fillStyle = GOLD; x.font = `700 17px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('A N S W E R', 0, -h / 2 + 40)
    x.fillStyle = BONE; x.font = `italic 500 46px ${SERIF}`
    x.fillText('Planned.', 0, -h / 2 + 118)
    drawPixelHeart(x, 0, -h / 2 + 190, 6)
    if (stampK > 0) {
      const k = easeOutBack(clamp(stampK), 2.6)
      x.save(); x.translate(0, h / 2 - 50); x.rotate(-0.18); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 38, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#46cf82'; x.beginPath(); x.arc(0, 0, 33, 0, Math.PI * 2); x.fill()
      x.strokeStyle = '#ffffff'; x.lineWidth = 9; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(-15, 2); x.lineTo(-4, 13); x.lineTo(17, -12); x.stroke()
      x.restore()
    }
    x.restore()
  }
  const TALK_AT = { x: 540, y: 740, w: 350 }, ANS_W = 182
  const ANS = [{ x: 388, y: 1250, from: 'leo', tp: T.playA, rot: -0.06 }, { x: 692, y: 1250, from: 'sco', tp: T.playB, rot: 0.06 }]
  function drawTie(t) {
    if (t < T.tie[0] || t >= T.cardsOut[1]) return
    const o = ease.inCubic(prog(t, ...T.cardsOut))
    // a scrim over the town so the cards read
    x.fillStyle = rgba('#07041a', 0.5 * ease.outCubic(prog(t, ...T.tie)) * (1 - o)); x.fillRect(0, 0, W, H)
    const tp = easeOutBack(prog(t, ...T.talk), 1.6)
    const g = x.createRadialGradient(TALK_AT.x, TALK_AT.y, 0, TALK_AT.x, TALK_AT.y, 460)
    g.addColorStop(0, rgba(LAV, 0.28 * clamp(tp) * (1 - o))); g.addColorStop(1, rgba(LAV, 0)); x.fillStyle = g; x.fillRect(TALK_AT.x - 460, TALK_AT.y - 460, 920, 920)
    cardImg(TALK, TALK_BODY, TALK_AT.x, TALK_AT.y - o * 800, TALK_AT.w * tp, (1 - clamp(tp)) * -0.4, 1, clamp(tp * 3) * (1 - o))
    ANS.forEach((C, i) => {
      if (t < C.tp) return
      const S0 = place(t, C.from), p = prog(t, C.tp, C.tp + 0.36), e = ease.outCubic(p)
      const tr = prog(t, ...T.trem), jit = tr > 0 && tr < 1 ? 2 + tr * 6 : 0
      const cx = lerp(S0[0], C.x, e) + jit * Math.sin(t * 61 + i * 2), cy = lerp(S0[1] - 60, C.y, e) - Math.sin(Math.PI * p) * 80 + o * 900
      const rot = lerp(i ? 0.8 : -0.8, C.rot, e)
      const f = prog(t, T.flip, T.flip + 0.22), sx = Math.cos(f * Math.PI)
      if (sx > 0) cardImg(BACK, BACK_BODY, cx, cy, ANS_W, rot, sx, clamp(p * 4))
      else answerFace(cx, cy, ANS_W, -sx, prog(t, T.flip + 0.3 + i * 0.1, T.flip + 0.55 + i * 0.1), rot)
      if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, T.flip + 0.1, 10, 170, 1 + i, 0.7)
    })
  }

  // the last line: a heart pops between the two
  function drawEnd(t) {
    if (t < T.heart) return
    const k = pop01(t, T.heart, 0.34, 2.4) * popOut(t, T.out)
    if (k <= 0.02) return
    x.save(); x.translate(540, 1000 - 10 * Math.sin((t - T.heart) * 3)); x.scale(k, k)
    drawPixelHeart(x, 0, 0, 13)
    x.restore()
    if (t < T.heart + 0.7) sparkleRing(t, 540, 1000, T.heart, 10, 150, 0.4, 0.6)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t)
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        drawTown(t)
        drawWindows(t)
        drawTaurus(t)
        drawStars(t)
        drawTumbleweeds(t)
        const rl = drawDuelist(t, 'leo'), rs = drawDuelist(t, 'sco')
        drawTyping(t, rs)
        drawHadFun(t, rl, 'leo'); drawHadFun(t, rs, 'sco')
        // onomatopoeia in the world
        if (rl) ono('*bzzt*', rl.x + rl.size * 0.62, rl.y - rl.size * 0.38, t, T.buzz, { size: 46, life: 0.8, rise: 20, rot: 0.1, color: '#bff0ff' })
        if (rs) ono('*bzzt*', rs.x - rs.size * 0.62, rs.y - rs.size * 0.38, t, T.buzz + 0.02, { size: 46, life: 0.8, rise: 20, rot: -0.1, color: '#bff0ff' })
        ono('*gasp*', 540, 1000, t, T.flinch + 0.05, { size: 50, life: 0.8, rise: 24 })
        ono('*SLAM*', CAN_WIN[0], CAN_WIN[1] - 110, t, T.slam, { size: 50, life: 0.8, rise: 18, color: '#ffd0a0' })
        ono('*ugh*', 540, 1040, t, T.groan, { size: 50, life: 0.85, rise: 20 })
        ono('BONG', 540, 470, t, T.bong[0], { size: 40, life: 0.5, rise: 16, color: GOLD })
        ono('BONG', 540, 470, t, T.bong[1], { size: 44, life: 0.5, rise: 16, color: GOLD })
        ono('BONG', 540, 470, t, T.bong[2], { size: 48, life: 0.5, rise: 16, color: GOLD })
        if (inW(t, T.doze + 0.7, T.wake)) for (const [zx, ph] of [[LEO_P[0] + 60, 0], [SCO_P[0] - 60, 0.5]]) { const q = ((t - T.doze) * 0.7 + ph) % 1; x.save(); x.globalAlpha = Math.sin(q * Math.PI); x.font = `700 ${34 + q * 20}px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('z', zx + q * 30, 1040 - q * 90); x.restore() }
        drawEnd(t)
        drawTie(t)
        x.restore()
        // crickets in the silence
        T.crk.forEach((c, i) => ono('*chirp*', [210, 860][i], [1300, 1260][i], t, c, { size: 40, color: 'rgba(239,230,214,0.92)', life: 1.0, rise: 24, ticks: false }))
        drawBars(t)
        drawECU(t)
        if (t >= T.love && t < T.love + 0.7) sparkleRing(t, 540, 1000, T.love, 14, 380, 0.6)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      boxA.update(t); boxB.update(t); boxC.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.55 (hook → high noon), 11.3 (the town → 1 PM, flip), 23.2 (6 PM → 9 PM), 28.85 (→ the LESSON,
// deal). The default selection keeps 11.3 and 28.85; the others stay inert.
export const CUTS = [4.55, { t: T.cut1, kind: 'flip' }, 23.2, { t: T.cut2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. pop / pluck / bell are moved by the engine from the D-major palette into C (Am's relative major), i.e. down
//    two semitones, so the pitched notes below are written ×UP to land in A minor; chip / lead / tom ride the 'sfx' bus as
//    written.
const UP = 2 ** (2 / 12)
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const N_ = { A3: 220, C4: 261.63, D4: 293.66, E4: 329.63, G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.51 }
const POPN = [N_.A4, N_.C5, N_.D5, N_.E5, N_.G5, N_.A5, N_.C6].map(f => f * UP)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), POPN[(base + i) % POPN.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, N_.A5 * UP, 0.05, 0], ['pluck', land, N_.A5 * UP, 0.04, 0.6, 0]]
/** the whistle: a sine voice with glides and a late vibrato, on the SFX bus */
const whistle = (t0, notes, gain = 0.05) => notes.map(([d, f, len, from]) => ['lead', +(t0 + d).toFixed(3), f, len, { ...FX, wave: 'sine', gain, detune: 0.0015, cutoff: 7000, env: 0, vib: 0.014, vibRate: 5.6, from, glide: 0.12, attack: 0.04, decay: 0.25, sustain: 0.85, release: 0.18, rev: 0.55, dly: 0.3 }])
const twang = (t, f = 110, g = 0.06) => [['pluck', t, f * UP, g, 1.4, -0.2], ['pluck', +(t + 0.012).toFixed(3), f * 2 * UP, g * 0.5, 1.0, 0.2]]
const bong = (t, g = 1) => [['bell', t, N_.A3 * UP, 0.07 * g, 2.6, 0], ['bell', +(t + 0.01).toFixed(3), N_.E4 * UP, 0.03 * g, 2.0, 0], ['tom', t, 66, { ...FX, gain: 0.18 * g, decay: 0.6 }]]
const gasp = (t, g = 0.06, f = 392) => [['whoosh', +(t - 0.04).toFixed(3), 0.22, g], ['pop', t, f * UP, 0.045, 0], ['pop', +(t + 0.05).toFixed(3), f * 1.5 * UP, 0.03, 0]]
const womp = t => [['chip', t, N_.E4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', +(t + 0.34).toFixed(3), 277.18, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const cricket = (t, pan = 0.5) => [0, 0.045, 0.09, 0.26, 0.305, 0.35].map(d => ['pop', +(t + d).toFixed(3), 4186, 0.022, pan])
const buzz = (t, pan = 0) => [0, 0.16].map(d => ['chip', +(t + d).toFixed(3), 98, 0.12, { ...FX, wave: 'square', duty: 0.25, vib: 0.06, gain: 0.05, decay: 0.05, sustain: 0.9, pan }])
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.05, f0: 900, f1: 2600 }]]; for (let k = 0; k < 16; k++) out.push(['clap', +(t0 + 0.1 + k * 0.12 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.08, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), +(f * (1 - i * 0.06)).toFixed(2), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.018, decay: 0.08, sustain: 0.5 }])
const snore = (t, f) => [['chip', t, f, 0.6, { ...FX, wave: 'tri', slide: 3, gain: 0.02, decay: 0.3, sustain: 0.6 }], ['chip', +(t + 0.7).toFixed(3), f * 1.2, 0.5, { ...FX, wave: 'tri', slide: -5, gain: 0.016, decay: 0.3, sustain: 0.5 }]]
const taps = (t0, t1, pan) => { const out = []; for (let t = t0; t < t1; t += 0.07) out.push(['tick', +t.toFixed(3), 0.03 + 0.01 * ((t * 13) % 1)]); void pan; return out }
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L; q0 = +(q0 + L * 0.84).toFixed(4) }
  return out
}
const PITCH = { [SLEO]: 900, [SSCO]: 640, [SCAN]: 1180, [SS]: 760 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · the hook: the whistle, the clock strikes noon, a tumbleweed
  ...head(T.h0, 6, T.h0Land, 0),
  ...whistle(0.3, [[0, N_.A4, 0.34, N_.E4], [0.42, N_.E5, 0.7, N_.D5], [1.2, N_.D5, 0.2], [1.42, N_.E5, 1.0, N_.C5]]),
  ...T.bong.flatMap((b, i) => bong(b, 1 - i * 0.15)),
  ['whoosh', T.tw1[0], 2.4, 0.03], ['shaker', T.tw1[0] + 0.4, { gain: 0.02, len: 0.3, bus: 'sfx' }], ['shaker', T.tw1[0] + 1.2, { gain: 0.02, len: 0.3, bus: 'sfx' }],
  // 2 · high noon: the drop, three close-ups, three twangs
  ...wordPops(T.h1, 1, 0.07, 2), ['pop', T.h1Land, N_.A5 * UP, 0.05, 0], ...twang(T.h1Land, 110, 0.07),
  ...whistle(T.ecu[0], [[0, N_.A5, 0.55, N_.E5], [0.66, N_.G5, 0.22], [0.92, N_.E5, 1.1, N_.G5]], 0.045),
  ...T.ecu.slice(0, 3).flatMap((e, i) => [['whoosh', +(e - 0.08).toFixed(3), 0.2, 0.05], ['tick', e, 0.06], ...twang(e + 0.02, [82.41, 87.31, 98][i], 0.05)]),
  ...T.twitchE.flatMap(e => [['tick', e, 0.05], ['tick', +(e + 0.06).toFixed(3), 0.04], ['pop', e, 1318.51 * UP, 0.02, 0.3]]),
  // 3 · the town is watching: shutters fly open, SLAM
  ['whoosh', T.canOpen[0], 0.25, 0.04], ['tom', T.canOpen[1], 140, { ...FX, gain: 0.12, decay: 0.15 }],
  ...head(T.h1b, 3, T.h1bLand, 3),
  ['whoosh', T.glare, 0.2, 0.04], ['pop', T.glare + 0.02, N_.E4 * UP, 0.03, 0],
  ['chip', T.canDown[0], N_.E5, 0.3, { ...FX, wave: 'tri', slide: -14, gain: 0.025, decay: 0.2, sustain: 0.5 }],
  ['tom', T.slam, 90, { ...FX, gain: 0.28, decay: 0.2 }], ['boom', T.slam, 0.06], ['clap', T.slam + 0.005, { ...FX, gain: 0.12 }],
  // 4 · 1 PM: the clock spins, the twitch, the flinch, "just checking the time"
  ['whoosh', T.spin1, 0.45, 0.04], ...bong(T.spin1 + 0.45, 0.5),
  ...head(T.h2, 4, T.h2Land, 1),
  ['tick', T.twitch, 0.07], ['tick', T.twitch + 0.08, 0.05], ...gasp(T.flinch, 0.08, 349.23),
  ['pop', T.tauUp + 0.1, 784 * UP, 0.025, -0.4], ['whoosh', T.lift1[0], 0.3, 0.03],
  ...womp(T.roll1 + 0.1),
  ['whoosh', 13.9, 1.6, 0.02],
  // 5 · 3 PM: someone's typing… and not
  ['whoosh', T.spin2, 0.45, 0.04], ...bong(T.spin2 + 0.45, 0.5),
  ...head(T.h3, 4, T.h3Land, 2),
  ['pop', T.typing[0], N_.C6 * UP, 0.04, 0.3], ...taps(T.typing[0], T.typing[1], 0.3),
  ['whoosh', T.dbl, 0.2, 0.04], ['pop', T.dbl + 0.02, N_.E5 * UP, 0.035, -0.2], ...sob(T.dbl + 0.2, N_.A5, 2),
  ['pop', T.typing[1], N_.E4 * UP, 0.04, 0.3], ['chip', T.typing[1] + 0.05, N_.A4, 0.3, { ...FX, wave: 'square', duty: 0.25, slide: -10, gain: 0.03, decay: 0.2, sustain: 0.5 }],
  ...gasp(T.groan, 0.05, 293.66), ...womp(T.groan + 0.1),
  // 6 · 6 PM: the sun sets, they doze, the big tumbleweed sighs, THE STARS
  ['whoosh', T.spin3, 0.45, 0.04], ...bong(T.spin3 + 0.45, 0.5),
  ...head(T.h4, 5, T.h4Land, 0),
  ...whistle(T.h4Land + 0.1, [[0, N_.E5, 0.5, N_.G5], [0.55, N_.C5, 0.45, N_.E5], [1.05, N_.A4, 1.3, N_.C5]], 0.04),
  ...snore(T.doze + 0.9, 196), ...snore(T.doze + 2.4, 174.61),
  ['whoosh', T.tw3[0], 0.9, 0.04], ['shaker', T.tw3[1], { gain: 0.03, len: 0.3, bus: 'sfx' }],
  ['whoosh', T.sigh, 0.8, 0.035], ['chip', T.sigh, N_.G4, 0.7, { ...FX, wave: 'tri', slide: -4, gain: 0.025, decay: 0.4, sustain: 0.5 }],
  ['whoosh', T.tw3[2], 0.7, 0.04],
  ['whoosh', T.starsIn[0], 0.5, 0.06], ['glitter', T.starsIn[0] + 0.1, T.starsIn[1] + 0.2], ['bell', T.starsIn[1], N_.E6 * UP, 0.03, 1.2, 0.3],
  ['pop', T.wake, N_.C6 * UP, 0.045, 0], ['chip', T.wake, N_.A4, 0.18, { ...FX, wave: 'square', duty: 0.25, slide: 30, gain: 0.03, decay: 0.1, sustain: 0.6 }],
  // 7 · 9 PM: real silence, crickets, the draw, two "had fun!"s at once, BZZT, the town erupts
  ['whoosh', T.spin4, 0.45, 0.04], ...bong(T.spin4 + 0.45, 0.6),
  ...wordPops(T.h5, 2, 0.07, 1), ['pop', T.h5Land, N_.A5 * UP, 0.05, 0], ...twang(T.h5Land, 82.41, 0.07),
  ...silence(T.h5 + 0.1, 0.6, T.buzz - 0.02),
  ...cricket(T.crk[0]), ...cricket(T.crk[1], -0.4),
  ['whoosh', T.lift3[0], 0.55, 0.03], ['whoosh', T.lift3[0] + 0.05, 0.5, 0.025],
  ...taps(T.type[0], T.type[1]), ...taps(T.type[0] + 0.03, T.type[1]),
  ['pop', T.sent, N_.A5 * UP, 0.06, -0.3], ['pop', T.sent, N_.A5 * UP, 0.06, 0.3], ['bell', T.sent + 0.02, N_.E6 * UP, 0.04, 1.4, 0], ['glitter', T.sent, T.sent + 0.5],
  ...buzz(T.buzz, -0.4), ...buzz(T.buzz + 0.02, 0.4), ['boom', T.buzz, 0.05],
  ['whoosh', T.look, 0.2, 0.04], ['pop', T.look + 0.02, N_.E5 * UP, 0.04, 0],
  ['bell', T.love, N_.A5 * UP, 0.04, 1.6, 0], ['glitter', T.love, T.love + 0.8], ...cheers(T.cheer[0], T.cheer[1]),
  ['whoosh', T.hats[0], 0.4, 0.04], ['tom', T.hats[1], 120, { ...FX, gain: 0.08, decay: 0.12 }],
  ...sob(T.love + 0.3, N_.E6), ...sob(T.love + 0.9, N_.C6),
  ...head(T.h5b, 4, T.h5bLand, 3),
  // 8 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 9 · talk cards: both play, both flip
  ...head(T.h6, 5, T.h6Land, 2),
  ['whoosh', T.talk[0], 0.4, 0.05], ['bell', T.talk[1], N_.E6 * UP, 0.03, 1.2, 0],
  ['whoosh', T.playA, 0.25, 0.04], ['tick', T.playA + 0.36, 0.06], ['whoosh', T.playB, 0.25, 0.04], ['tick', T.playB + 0.36, 0.06],
  ['pop', T.l8 - 0.24, N_.E5 * UP, 0.035, 0],
  ['tick', T.flip, 0.08], ['bell', T.flip + 0.1, N_.A5 * UP, 0.04, 1.6, -0.2], ['bell', T.flip + 0.1, N_.E6 * UP, 0.03, 1.6, 0.2], ['glitter', T.flip, T.flip + 0.6],
  ['pop', T.flip + 0.3, N_.C6 * UP, 0.04, -0.3], ['pop', T.flip + 0.4, N_.E6 * UP, 0.04, 0.3],
  ['whoosh', T.cardsOut[0], 0.3, 0.035],
  // 10 · this town's big enough for two
  ...head(T.h7, 5, T.h7Land, 0),
  ...whistle(T.h7Land + 0.05, [[0, N_.C5, 0.3, N_.A4], [0.34, N_.E5, 0.3], [0.68, N_.G5, 0.3], [1.02, N_.A5, 0.9, N_.G5]], 0.045),
  ['whoosh', T.together[0], 0.35, 0.04], ['pop', T.heart, N_.A5 * UP, 0.04, 0], ['bell', T.heart + 0.02, N_.E6 * UP, 0.03, 1.2, 0],
  ...sob(T.h7 + 0.4, N_.A5),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES_A, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_B, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_C, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
