// stmission — "Mission Control." (45 s vertical Align ad, Star Talk "Wild Lessons" #18, music: synthwave · Am).
// Story 0–40.6, then the shared end card.
//   0.0–4.4    "Incoming | *text.*"  STAR CONTROL: a big main screen (COMMS + PAD CAM), a red T-minus strip and a long
//              console desk floating in the night sky. "had fun tonight :)" lands on COMMS. ♑ CAPRICORN (flight
//              director, headset): "Star Control. we have a text." ♍ Virgo (RULES) and ♏ Scorpio (STRATEGY) snap to.
//              ♓ Pisces sits at the tiny FEELINGS console, already crying.
//   4.4–7.6    PAD CAM. "The reply's on | the *launch pad.*"  The reply is a rocket with "had fun / too!!" painted on its
//              side; ♈ ARIES in a fishbowl helmet bounces beside it: "reply's typed. sending it now!!"  T-10 s, counting.
//   7.6–10.9   "Go or | *no-go?*"  CAPRICORN slams HOLD: "HOLD. all stations: go or no-go?"  The clock freezes.
//  10.9–13.6   "Rule one: | the *3-hour rule.*"  VIRGO hoists THE RULES (vol. 3): "no-go. the 3-hour rule."  NO-GO; the
//              clock spins to 03:00:00. Aries droops on the pad cam.
//  13.65       card cut (flip).
//  13.65–17.6  "Strategy: | be *mysterious.*"  Sunglasses drop onto SCORPIO: "no-go. make it 3h 07m. mysterious."
//              NO-GO; 03:07:00. Pisces' lamp blinks GO!! and nobody looks.
//  17.6–22.4   PAD: Aries happily paints a ♥ under "too!!"… KLAXON. "*ABORT!* | Too eager!"  The room goes red, everyone
//              sweats. CAPRICORN: "who put a HEART on it?!"  PAD: ARIES, tiny: "...it's a small heart."  A robot sponge
//              wipes the ♥ and the "!!": "too."
//  22.4–25.1   "Hour two. | *Riveting.*"  The score tape-stops. Crickets. 02:06:58 ticking, everyone sweating, Scorpio
//              asleep, Capricorn chewing a pencil. On the pad cam ARIES: "but I *want* to talk to them."  Capricorn
//              looks at Aries… and yanks the clock's plug. *yoink*. Dark.
//  25.1–26.7   PAD: "T-*zero.*"  Aries slaps the ♥ and the "!!" back on, presses GO: ignition, LIFTOFF.
//  26.8–30.4   "Reply time: | *4 seconds.*"  COMMS: "had fun too!! ♥" ✓✓ … and back in a blink: "yay!! was hoping
//              you'd text ♥". The room erupts, headsets fly, Pisces wails. THE STARS: "they weren't counting. you were."
//  30.45       card cut (deal) into ★ LESSON UNLOCKED: "Text back when | you *want* to. | Games are boring." (+1 GENUINE)
//  35.2–38.0   "No countdown. | You *both play.*"  A talk card ("Morning person or night owl?") on the main screen; YOU and
//              THEM each play a face-down answer; both flip at once: "Night owl." ✓ ✓  THE STARS: "no games. just play."
//  38.0–40.42  PAD: "*Liftoff.*"  Aries can't wait either: it blasts off itself, a sparkle trail behind it; Pisces sobs.
// One canvas (sky + room or pad, the pad cam drawn from the same pad scene), DOM type + dialogue boxes + the shared lesson,
// grain on top. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawHeadset, drawHelmet, drawShades, drawBinder, drawPencil, drawBrush, drawRocket, drawFlame, drawGantry, drawRock, drawDesk, drawPill,
  drawBubble, drawTear, drawSweat, drawPixelHeart, drawTissue } from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', RED = '#ff4f5e', AMBER = '#ffb347', MINT = '#7dffb0', SKYBLUE = '#7fd0f0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid
export const KEY = 'Am'

const ARI = signStar('aries'), CAP = signStar('capricorn'), VIR = signStar('virgo'), SCO = signStar('scorpio'), PIS = signStar('pisces')
const ARI_T = '#ff9a7a', CAP_T = '#c9b8ff', VIR_T = '#9be7a8', SCO_T = '#ff7f9e'

// ── the timeline
export const T = {
  black: [0, 0.3],
  // incoming text
  h0: 0.12, h0Land: 0.95, inMsg: 0.45, l1: 0.95, snap: 1.4, h0Out: [4.22, 4.38],
  // the pad
  v1: 4.4, h1: 4.48, h1Land: BEAT(8), l2: 4.7, count: 4.75, h1Out: [7.42, 7.58],
  // go / no-go
  v2: 7.6, h2: 7.68, h2Land: 8.15, l3: 7.85, hold: 7.95, h2Out: [10.75, 10.9],
  // the 3-hour rule
  h3: 10.95, h3Land: 11.45, binder: 10.95, l4: 11.1, nogoV: 11.3, spinA: [11.8, 12.2], droop: 12.0, h3Out: [13.45, 13.6],
  cut1: 13.65,
  // be mysterious
  h4: 13.72, h4Land: 14.25, shades: [13.75, 14.05], l5: 13.95, nogoS: 14.1, spinB: [15.3, 15.6], pisGo: 16.4, h4Out: [17.45, 17.58],
  // ABORT
  v3: 17.6, paint: [17.75, 18.2], klaxon: BEAT(32), v4: 18.62, h5: 18.4, h5Land: 18.4, l6: 18.75, red: [BEAT(32), 20.3],
  v5: 20.35, l7: 21.25, wipe: [21.65, 22.15], h5Out: [22.25, 22.4],
  // hour two
  v6: 22.45, h6: 22.5, h6Land: 22.98, crk: [23.1, 24.4], l8: 23.8, look: 24.6, yank: 25.1, closeA: 26.55, h6Out: [25.0, 25.15],
  // T-zero, liftoff
  v7: 25.25, h7: 25.3, h7Land: 25.62, restore: 25.32, press: 25.48, ignite: BEAT(45), lift: [25.78, 26.72], h7Out: [26.66, 26.8],
  // 4 seconds
  v8: 26.8, h8: 26.86, h8Land: 27.28, sent: 26.85, reply: 27.1, hats: [27.1, 27.95], starsIn: [27.12, 27.45], l9: 27.42, closeB: 30.48, h8Out: [30.3, 30.45],
  cut2: 30.45,
  // the lesson
  lesson: BEAT(54), lessonOut: [35.0, 35.2],                  // 30.602
  // talk cards
  h9: 35.25, h9Land: 35.7, tie: [35.15, 35.6], talk: [35.2, 35.6], playA: 35.6, playB: 35.78, l10: 35.35, trem: [36.2, BEAT(65)], flip: BEAT(65),
  cardsOut: [37.72, 37.98], closeC: 38.02, h9Out: [37.85, 37.98],
  // liftoff
  v9: 38.0, h10: 38.06, h10Land: BEAT(68), blast: [38.75, 39.7], out: [40.02, 40.42], h10Out: [40.18, 40.42],
}
const VIEWS = [[0, 'room'], [T.v1, 'pad'], [T.v2, 'room'], [T.v3, 'pad'], [T.v4, 'room'], [T.v5, 'pad'], [T.v6, 'room'], [T.v7, 'pad'], [T.v8, 'room'], [T.v9, 'pad']]
const viewAt = t => { let v = 'room'; for (const [k, s] of VIEWS) if (t >= k) v = s; return v }
const lastSwitch = t => { let s = -9; for (const [k] of VIEWS) if (k > 0 && t >= k) s = k; return s }

// ── the lines
const SARI = `${ARI.glyph}︎ ARIES`, SCAP = `${CAP.glyph}︎ CAPRICORN`, SVIR = `${VIR.glyph}︎ VIRGO`, SSCO = `${SCO.glyph}︎ SCORPIO`, SS = 'THE STARS'
const LINES_A = [
  { t: T.l1, speaker: SCAP, color: CAP_T, text: 'Star Control. we have a *text.*' },
  { t: T.l2, speaker: SARI, color: ARI_T, text: "reply's typed. sending it *now!!*" },
  { t: T.l3, speaker: SCAP, color: CAP_T, text: 'HOLD. all stations: *go or no-go?*' },
  { t: T.l4, speaker: SVIR, color: VIR_T, text: 'no-go. the *3-hour rule.*' },
  { t: T.l5, speaker: SSCO, color: SCO_T, text: 'no-go. make it 3h 07m. *mysterious.*' },
  { t: T.l6, speaker: SCAP, color: CAP_T, text: 'who put a *HEART* on it?!' },
  { t: T.l7, speaker: SARI, color: ARI_T, text: "...it's a *small* heart." },
  { t: T.l8, speaker: SARI, color: ARI_T, text: 'but I *want* to talk to them.' },
]
const LINES_B = [{ t: T.l9, speaker: SS, color: GOLD, text: "they weren't counting. *you were.*" }]
const LINES_C = [{ t: T.l10, speaker: SS, color: GOLD, text: 'no games. just *play.*' }]
const CPS = 28
export const LTA = lineTimes(LINES_A, { cps: CPS }), LTB = lineTimes(LINES_B, { cps: CPS }), LTC = lineTimes(LINES_C, { cps: CPS })
const HOPS = {
  ari: talkHops(LINES_A, SARI, { cps: CPS }), cap: talkHops(LINES_A, SCAP, { cps: CPS }), vir: talkHops(LINES_A, SVIR, { cps: CPS }), sco: talkHops(LINES_A, SSCO, { cps: CPS }),
  stars: [...talkHops(LINES_B, SS, { cps: CPS }), ...talkHops(LINES_C, SS, { cps: CPS })],
}

const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Text back when | you *want* to. | Games are boring.', chip: '+1 GENUINE', accentColor: PINK, dim: 0.62 }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inW = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const redK = t => inW(t, T.red[0], T.red[1] + 0.3) ? (0.5 + 0.5 * Math.sin((t - T.red[0]) * Math.PI * 4 - Math.PI / 2)) * (1 - prog(t, T.red[1], T.red[1] + 0.3)) : 0
const panic = t => inW(t, T.klaxon, T.v6)
const erupt = t => t >= T.reply

// ── the T-minus clock: { text, col, tag }
const hms = s => { s = Math.max(0, Math.round(s)); const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, ss = s % 60; return [h, m, ss].map(v => String(v).padStart(2, '0')).join(':') }
function clockAt(t) {
  if (t < T.count) return { text: '--:--:--', col: 'rgba(255,79,94,0.35)', tag: '' }
  if (t < T.hold) return { text: hms(10 - Math.floor(t - T.count)), col: AMBER, tag: 'GO' }
  const blink = Math.floor(t * 3) % 2 === 0
  const spin = (a, b, to) => inW(t, a, b) ? hms(Math.floor((t * 977) % 99999)) : to
  if (t < T.spinA[0]) return { text: hms(8), col: RED, tag: blink ? 'HOLD' : '' }
  if (t < T.spinB[0]) return { text: spin(...T.spinA, '03:00:00'), col: RED, tag: blink ? 'HOLD' : '' }
  if (t < T.klaxon) return { text: spin(...T.spinB, '03:07:00'), col: RED, tag: blink ? 'HOLD' : '' }
  if (t < T.v6) return { text: Math.floor(t * 4) % 2 ? 'ABORT!!' : '', col: RED, tag: '' }
  if (t < T.yank) return { text: hms(2 * 3600 + 6 * 60 + 58 - Math.floor(t - T.v6)), col: RED, tag: 'HOLD' }
  if (t < T.v7) return { text: '', col: RED, tag: '' }
  return { text: '00:00:00', col: MINT, tag: 'GO' }
}

// ── where things are
const SCR = { x0: 70, x1: 1010, y0: 450, y1: 880 }
const CLK = { x0: 230, x1: 850, y0: 902, y1: 990 }
const DESK_Y = 1188
const VIR_P = [205, 1112, 200], CAP_P = [540, 1092, 240], SCO_P = [875, 1112, 200], PIS_P = [112, 968, 100], STARS_P = [960, 960, 130]
const GROUND = 1300, ROCKET_X = 600, ROCKET_BASE = 1240
const ARI_PAD = [875, 1172, 220], PIS_PAD = [120, 1238, 100]
const SEED = { ari: 5, cap: 3, vir: 9, sco: 17, pis: 23, stars: 11 }

// ── moods
function ariMood(t) {
  if (t < T.v1) return S_('sparkle', [0, 0])
  if (t < T.hold) return S_(t > T.l2 ? 'happy' : 'sparkle', [-1, 0])
  if (t < T.droop) return S_('wide', [0, -1], { blink: false })
  if (t < T.v3) return S_('neutral', [0, 1], { blink: 0.45, sq: 0.08 })
  if (t < T.klaxon) return S_('happy', [-1, 0])
  if (t < T.v5) return S_('wide', [0, -1], { blink: false })
  if (t < T.v6) return S_('neutral', [-1, 1], { blink: 0.5, sq: 0.06 })
  if (t < T.l8) return S_('neutral', [0, 1], { blink: 0.55 })
  if (t < T.v7) return S_('sparkle', [0, 0])
  if (t < T.ignite) return S_('happy', [-1, 0])
  if (t < T.v9) return S_('heart', [0, -1])
  if (t < T.blast[0] - 0.2) return S_('happy', [0, 0])
  return S_('wide', [0, -1], { blink: false })
}
function capMood(t) {
  if (t < T.snap) return S_('neutral', [0, -1])
  if (t < T.l3) return S_('squint', [0, -1])
  if (t < T.l4) return S_('squint', [0, 0], { blink: false })
  if (t < T.cut1) return S_('neutral', [-1, 0])
  if (t < T.klaxon) return S_('neutral', [1, 0])
  if (t < T.v6) return S_(t < T.l6 ? 'wide' : 'squint', [0, -1], { blink: false })
  if (t < T.look) return S_('squint', [0, -1], { blink: 0.3 })
  if (t < T.yank) return S_('neutral', [1, -1], { blink: false })
  if (t < T.reply) return S_('happy', [0, -1])
  if (t < T.tie[0]) return S_('heart', [0, 0])
  return S_('sparkle', [0, -1])
}
function virMood(t) {
  if (t < T.snap) return S_('neutral', [1, -1])
  if (t < T.l4) return S_('neutral', [1, -1], { blink: false })
  if (t < T.cut1) return S_('squint', [1, 0])
  if (t < T.klaxon) return S_('neutral', [1, 0])
  if (t < T.v6) return S_('wide', [1, -1], { blink: false })
  if (t < T.yank) return S_('neutral', [1, -1], { blink: 0.4 })
  if (t < T.reply) return S_('wide', [1, -1], { blink: false })
  if (t < T.tie[0]) return S_('heart', [0, 0])
  return S_('sparkle', [1, -1])
}
function scoMood(t) {
  if (t < T.snap) return S_('neutral', [-1, -1])
  if (t < T.shades[0]) return S_('squint', [-1, -1])
  if (t < T.klaxon) return S_('squint', [-1, 0])
  if (t < T.v6) return S_('wide', [-1, -1], { blink: false })
  if (t < T.yank) return S_('sleepy', [0, 0], { dy: 6 })
  if (t < T.reply) return S_('wide', [-1, -1], { blink: false })
  if (t < T.tie[0]) return S_('heart', [0, 0])
  return S_('sparkle', [-1, -1])
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 46px Inter", "700 30px Inter", "italic 500 190px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 64px 'Space Mono'", "700 34px 'Space Mono'", "700 26px 'Space Mono'", "700 20px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, talkIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-2.png')])
  const BACK = bake(backIm, 400), TALK = bake(talkIm, 560)
  const BACK_BODY = 1320 / 1528, TALK_BODY = 610 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type (DOM, above the canvas)
  const H0 = popText(root, 'Incoming | *text.*', { top: 150, size: 100, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: PINK })
  const H1 = popText(root, 'The reply’s on | the *launch pad.*', { top: 172, size: 96, accentSize: 140, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: AMBER, fit: true })
  const H2 = popText(root, 'Go or | *no-go?*', { top: 150, size: 100, accentSize: 150, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD })
  const H3 = popText(root, 'Rule one: | the *3-hour rule.*', { top: 150, size: 92, accentSize: 134, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: VIR_T, fit: true })
  const H4 = popText(root, 'Strategy: | be *mysterious.*', { top: 150, size: 92, accentSize: 134, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: SCO_T, fit: true })
  const H5 = popText(root, '*ABORT!* | Too eager!', { top: 150, size: 100, accentSize: 150, at: T.h5, wobble: true, accentColor: RED, gap: 0.09 })
  const H6 = popText(root, 'Hour two. | *Riveting.*', { top: 150, size: 100, accentSize: 150, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: LAV })
  const H7 = popText(root, 'T-minus | *zero.*', { top: 182, size: 108, accentSize: 180, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: MINT })
  const H8 = popText(root, 'Reply time: | *4 seconds.*', { top: 150, size: 92, accentSize: 134, at: T.h8, late: 2, lateAt: T.h8Land, wobble: true, accentColor: PINK, fit: true })
  const H9 = popText(root, 'No countdown. | You *both play.*', { top: 150, size: 92, accentSize: 132, at: T.h9, late: 2, lateAt: T.h9Land, wobble: true, accentColor: LAV, fit: true })
  const H10 = popText(root, '*Liftoff.*', { top: 196, size: 120, accentSize: 210, at: T.h10, late: 1, lateAt: T.h10Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out], [H9, T.h9Out], [H10, T.h10Out]]
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1478, width: 960, height: 290, open: T.l1 - 0.24, close: T.closeA, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1478, width: 960, height: 290, open: T.l9 - 0.24, close: T.closeB, cps: CPS })
  const boxC = dialogueBox(root, { lines: LINES_C, y: 1478, width: 960, height: 290, open: T.l10 - 0.24, close: T.closeC, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

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
  const sweat = (r, t, ph = 0, side = -1) => drawSweat(x, r.x + side * r.size * 0.34, r.top + r.size * 0.3 + ((t * 0.9 + ph) % 1) * 22, Math.max(3, Math.round(r.size / 40)))
  const COLS = { ari: ARI, cap: CAP, vir: VIR, sco: SCO, pis: PIS }
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1 } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    const r = drawStarChar(x, px0, py0 + (st.dy || 0), sz, t, { color: id === 'stars' ? STAR.sky : COLS[id].color, glyph: glyph && sz >= 120 && id !== 'stars' ? COLS[id].glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id], pop, glow: 0.9, alpha })
    return r
  }
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }

  // ════════════════════════════════════ THE PAD (full view, and the pad cam inset)
  function rocketLines(t) {
    const wiped = t >= T.wipe[1] && t < T.restore
    const bang = t < T.wipe[0] || t >= T.restore ? 'too!!' : t < T.wipe[1] ? (prog(t, ...T.wipe) < 0.5 ? 'too!!' : 'too.') : 'too.'
    void wiped
    return [{ text: 'had fun', alpha: 1 }, { text: bang, alpha: 1 }]
  }
  function heartK(t) {
    if (t < T.paint[0] + 0.25) return 0
    if (t < T.wipe[0]) return clamp(prog(t, T.paint[0] + 0.25, T.paint[1]) * 1.2)
    if (t < T.restore) return 1 - prog(t, T.wipe[0] + 0.15, T.wipe[1])
    return 1
  }
  function rocketY(t) {
    if (t < T.lift[0]) return t >= T.ignite ? Math.sin(t * 90) * 3 : 0
    return -ease.inCubic(prog(t, ...T.lift)) * 1700
  }
  function drawPad(t, mini) {
    drawRock(x, GROUND, W, H)
    // the gantry + its T-minus board + a beacon
    drawGantry(x, 330, 700, GROUND)
    const red = t >= T.klaxon && t < T.v6
    x.fillStyle = red && Math.floor(t * 6) % 2 ? '#ff2a3a' : '#5a1020'; x.fillRect(318, 676, 24, 22)
    if (red && Math.floor(t * 6) % 2) { const g = x.createRadialGradient(330, 686, 0, 330, 686, 260); g.addColorStop(0, 'rgba(255,60,70,0.55)'); g.addColorStop(1, 'rgba(255,60,70,0)'); x.fillStyle = g; x.fillRect(70, 426, 520, 520) }
    {
      const c = clockAt(t), bx = 130, by = 560, bw = 400, bh = 90
      x.fillStyle = '#1a1030'; x.fillRect(bx - 6, by - 6, bw + 12, bh + 12); x.fillStyle = '#0a0614'; x.fillRect(bx, by, bw, bh)
      x.fillStyle = rgba(GOLD, 0.9); x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('REPLY T-', bx + 14, by + 20)
      x.fillStyle = c.col; x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.fillText(c.text, bx + bw / 2, by + 56)
      x.fillRect(320, by + bh + 6, 20, 640 - by - bh)
    }
    // the sponge arm (the wipe)
    if (inW(t, T.wipe[0] - 0.35, T.wipe[1] + 0.35)) {
      const reach = ease.outCubic(prog(t, T.wipe[0] - 0.35, T.wipe[0])) * (1 - ease.inCubic(prog(t, T.wipe[1], T.wipe[1] + 0.35)))
      const sx = lerp(390, 650, reach) + (inW(t, ...T.wipe) ? 40 * Math.sin((t - T.wipe[0]) * 30) : 0), sy = ROCKET_BASE - 470 + 260
      x.fillStyle = '#1a1030'; x.fillRect(380, sy - 10, sx - 380, 20); x.fillStyle = '#8a84a8'; x.fillRect(380, sy - 5, sx - 380, 10)
      x.fillStyle = '#1a1030'; x.fillRect(sx - 6, sy - 46, 64, 92); x.fillStyle = '#ffd23f'; x.fillRect(sx, sy - 40, 52, 80); x.fillStyle = '#e8b020'; x.fillRect(sx, sy + 20, 52, 20)
      if (!mini) for (let i = 0; i < 6; i++) { const q = ((t * 2.2 + i / 6) % 1); x.fillStyle = 'rgba(220,240,255,0.85)'; x.fillRect(sx + 20 + Math.cos(i * 2) * q * 70, sy - 50 - q * 80, 10, 10) }
    }
    // smoke + flames at liftoff
    if (t >= T.ignite && t < T.v8 + 0.2) {
      const ry = rocketY(t)
      drawFlame(x, ROCKET_X, ROCKET_BASE + 46 + ry, 110, 160 + 60 * Math.sin(t * 40), t)
      for (let i = 0; i < 14; i++) {
        const a = (t - T.ignite) * (0.9 + (i % 4) * 0.2), side = i % 2 ? 1 : -1
        const px = ROCKET_X + side * (40 + a * (160 + i * 18)), py = GROUND - 30 - a * (20 + (i % 3) * 30), rad = 40 + a * 90
        x.fillStyle = `rgba(${220 - i * 4},${214 - i * 4},${236 - i * 2},${clamp(0.8 - a * 0.35)})`; x.beginPath(); x.arc(px, py, rad, 0, Math.PI * 2); x.fill()
      }
    }
    if (t < T.v8 + 0.2) {
      const ry = rocketY(t)
      drawRocket(x, ROCKET_X, ROCKET_BASE + ry, { lines: rocketLines(t), heart: heartK(t), heartScale: 1 + 0.4 * bump(t, T.restore, 0.35) + 0.3 * bump(t, T.paint[1], 0.3), glow: t >= T.ignite ? 1 : 0 })
      if (!mini && inW(t, T.restore, T.restore + 0.7)) sparkleRing(t, ROCKET_X, ROCKET_BASE - 230, T.restore, 10, 170, 0.4, 0.6)
    }
    // Aries, in a helmet
    {
      let [ax, ay, as] = ARI_PAD
      let dy = 0
      if (t >= T.blast[0]) dy = -ease.inCubic(prog(t, ...T.blast)) * 1500
      const st = ariMood(t)
      const pop = t >= T.v9 ? popOut(t, T.out) : 1
      const hops = [...HOPS.ari, T.press, T.ignite + 0.1, T.ignite + 0.6, T.v9 + 0.2, T.blast[0] - 0.3]
      if (t >= T.blast[0]) { drawFlame(x, ax - 40, ay + as * 0.42 + dy, 40, 120, t); drawFlame(x, ax + 40, ay + as * 0.42 + dy, 40, 120, t + 0.3) }
      const r = star('ari', [ax, ay + dy, as], t, st, { hops, pop })
      if (r) {
        drawHelmet(x, r)
        if (inW(t, T.paint[0] - 0.3, T.klaxon + 0.1)) {
          const p = prog(t, ...T.paint), bx = lerp(r.x - r.size * 0.6, r.x - r.size * 0.75, Math.sin(p * Math.PI * 4) * 0.5 + 0.5)
          drawBrush(x, bx, r.y + r.size * 0.12 - 30 * Math.sin(p * Math.PI * 4), 5, Math.PI + 0.3)
        }
        if (inW(t, T.klaxon, T.v6)) sweat(r, t, 0, 1)
        if (t >= T.blast[0] && !mini) for (let i = 1; i <= 6; i++) drawPixelStar(x, ax + Math.sin(t * 9 + i) * 30, r.y + r.size * 0.6 + i * 70, 34 - i * 4, i % 2, [GOLD, PINK, BONE][i % 3])
        // a little GO button in the glove at the press
        if (inW(t, T.restore, T.lift[0])) {
          const k = pop01(t, T.restore, 0.25, 2.4), dn = bump(t, T.press, 0.22)
          x.save(); x.translate(r.x - r.size * 0.58, r.y + r.size * 0.2); x.scale(k, k)
          x.fillStyle = '#1a1030'; x.fillRect(-46, -14, 92, 52); x.fillStyle = '#3b3456'; x.fillRect(-40, -8, 80, 40)
          x.fillStyle = '#1a1030'; x.fillRect(-30, -30 + dn * 12, 60, 30); x.fillStyle = '#46cf82'; x.fillRect(-25, -26 + dn * 12, 50, 22)
          x.fillStyle = '#0a2a14'; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GO', 0, -15 + dn * 12)
          x.restore()
        }
      }
    }
    // Pisces, ground crew, crying
    if (!mini) {
      const pop = t >= T.v9 ? popOut(t, T.out) : 1
      const r = star('pis', PIS_PAD, t, S_(inW(t, T.klaxon, T.v6) ? 'wide' : 'sparkle', [1, -1]), { hops: [T.ignite, T.ignite + 0.5, T.blast[0] + 0.2, T.blast[0] + 0.7], glyph: false, pop })
      if (r) {
        drawTissue(x, r.x + r.size * 0.55, r.y + r.size * 0.2, 4, t)
        tears(r.x, r.y, r.size, t, 0, 99, { gap: 0.13, spread: 0.7, life: 0.5 })
      }
    }
  }

  // ════════════════════════════════════ THE ROOM
  function drawScreen(t) {
    const { x0, x1, y0, y1 } = SCR
    // struts down to the desk
    x.fillStyle = '#1a1030'; x.fillRect(150, y1, 18, DESK_Y - y1); x.fillRect(912, y1, 18, DESK_Y - y1)
    x.fillStyle = '#3a2d62'; x.fillRect(154, y1, 10, DESK_Y - y1); x.fillRect(916, y1, 10, DESK_Y - y1)
    x.fillStyle = '#1a1030'; x.fillRect(x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 28)
    x.fillStyle = '#4a3a7e'; x.fillRect(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16)
    x.fillStyle = '#0b1830'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    const rk = redK(t); if (rk > 0) { x.fillStyle = rgba('#ff2a3a', 0.35 * rk); x.fillRect(x0, y0, x1 - x0, y1 - y0) }
    // header strip
    x.fillStyle = '#132a4a'; x.fillRect(x0, y0, x1 - x0, 46)
    x.font = `700 24px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
    x.fillStyle = SKYBLUE; x.fillText('STAR CONTROL · COMMS', x0 + 22, y0 + 24)
    x.fillStyle = Math.floor(t * 2) % 2 ? RED : '#7a2030'; x.fillText('● PAD CAM', 690, y0 + 24)
    // COMMS: the thread
    if (t < T.tie[0] + 0.4) drawThread(t)
    // PAD CAM: the pad scene, small
    {
      const cx0 = 650, cy0 = y0 + 58, cw = x1 - 16 - cx0, ch = y1 - 12 - cy0
      x.save(); x.beginPath(); x.rect(cx0, cy0, cw, ch); x.clip()
      x.fillStyle = '#0d0820'; x.fillRect(cx0, cy0, cw, ch)
      const s = cw / 860
      x.translate(cx0 + cw / 2, cy0 + ch / 2 + 6); x.scale(s, s); x.translate(-ROCKET_X - 120, -1010)
      drawPad(t, true)
      x.restore()
      x.strokeStyle = '#7fd0f0'; x.lineWidth = 3; x.strokeRect(cx0, cy0, cw, ch)
    }
    // scanlines
    x.fillStyle = 'rgba(0,0,0,0.16)'; for (let y = y0; y < y1; y += 6) x.fillRect(x0, y, x1 - x0, 2)
  }
  function msg(text, X, Y, { mine = false, k = 1, heart = false, check = false, dashed = false } = {}) {
    if (k <= 0.02) return
    x.save(); x.font = `700 32px ${INTER}`
    const tw = x.measureText(text).width + (heart ? 44 : 0), w = tw + 44, h = 64
    const bx = mine ? X - w : X
    x.translate(mine ? X : X, Y); x.scale(k, k); x.translate(-(mine ? X : X), -Y)
    rr(bx, Y - h / 2, w, h, 22); x.fillStyle = mine ? '#3d7cf0' : '#e7e2f2'; x.globalAlpha *= dashed ? 0.55 : 1; x.fill()
    if (dashed) { x.globalAlpha = 1; x.setLineDash([10, 8]); x.strokeStyle = '#9cc0ff'; x.lineWidth = 3; rr(bx, Y - h / 2, w, h, 22); x.stroke(); x.setLineDash([]) }
    x.fillStyle = mine ? '#ffffff' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, bx + 22, Y + 2)
    if (heart) drawPixelHeart(x, bx + 22 + tw - 22, Y, 4.4)
    if (check) { x.fillStyle = MINT; x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.fillText('✓✓ delivered', X, Y + 50) }
    x.restore()
  }
  function drawThread(t) {
    const fade = 1 - prog(t, T.tie[0], T.tie[0] + 0.35)
    x.save(); x.globalAlpha = fade
    msg('had fun tonight :)', SCR.x0 + 24, SCR.y0 + 112, { k: pop01(t, T.inMsg, 0.3, 2.4) * (t < T.sent + 1.5 ? 1 : 1) })
    if (t >= T.inMsg && t < T.inMsg + 0.6) sparkleRing(t, SCR.x0 + 160, SCR.y0 + 112, T.inMsg, 8, 120, 0.2, 0.6)
    // the draft (dashed until it's sent)
    if (t >= T.l2) {
      const sent = t >= T.sent
      const bang = t < T.wipe[0] || t >= T.restore ? 'had fun too!!' : 'had fun too.'
      const heart = heartK(t) > 0.5
      msg(sent ? bang : bang, 630, SCR.y0 + 200, { mine: true, k: pop01(t, sent ? T.sent : T.l2, 0.3, 2.2), heart, dashed: !sent, check: sent })
      if (!sent) { x.fillStyle = rgba(AMBER, 0.9); x.font = `700 20px ${MONO}`; x.textAlign = 'right'; x.fillText(Math.floor(t * 2) % 2 ? 'DRAFT · NOT SENT' : 'DRAFT', 630, SCR.y0 + 252) }
    }
    if (t >= T.reply) {
      msg("yay!! was hoping you'd text", SCR.x0 + 24, SCR.y0 + 320, { k: pop01(t, T.reply, 0.3, 2.6), heart: true })
      if (t < T.reply + 0.7) sparkleRing(t, SCR.x0 + 260, SCR.y0 + 320, T.reply, 10, 200, 0.6, 0.7)
    }
    x.restore()
  }
  function drawClock(t) {
    const { x0, x1, y0, y1 } = CLK, c = clockAt(t)
    x.fillStyle = '#1a1030'; x.fillRect(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16)
    x.fillStyle = '#3a2d62'; x.fillRect(x0 - 3, y0 - 3, x1 - x0 + 6, y1 - y0 + 6)
    x.fillStyle = '#0a0614'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    x.textBaseline = 'middle'
    x.fillStyle = rgba(GOLD, 0.9); x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillText('REPLY', x0 + 18, y0 + 30); x.fillText('T-MINUS', x0 + 18, y0 + 58)
    if (c.text) {
      x.save(); x.shadowColor = c.col; x.shadowBlur = 18
      x.fillStyle = c.col; x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.fillText(c.text, (x0 + x1) / 2 + 40, (y0 + y1) / 2 + 3)
      x.restore()
    }
    if (c.tag) { x.fillStyle = c.tag === 'GO' ? MINT : RED; x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.fillText(c.tag, x1 - 16, y0 + 44) }
    // the plug + cord down to Capricorn's desk
    const yk = t >= T.yank ? ease.outCubic(prog(t, T.yank, T.yank + 0.3)) : 0
    x.strokeStyle = '#1a1030'; x.lineWidth = 8; x.beginPath(); x.moveTo(x1 - 60, y1); x.quadraticCurveTo(x1 - 40, y1 + 120, 640, DESK_Y - 4); x.stroke()
    x.fillStyle = '#1a1030'; x.fillRect(x1 - 76 - yk * 30, y1 - 2 + yk * 90, 32, 26); x.fillStyle = '#8a84a8'; x.fillRect(x1 - 72 - yk * 30, y1 + 2 + yk * 90, 24, 18)
    if (inW(t, T.yank, T.yank + 0.3)) sparkleRing(t, x1 - 60, y1, T.yank, 6, 50, 0.1, 0.3)
  }
  function drawRoom(t) {
    drawScreen(t)
    drawClock(t)
    // Pisces at the FEELINGS console
    {
      const r = star('pis', PIS_P, t, S_(inW(t, T.klaxon, T.v6) ? 'wide' : 'sparkle', [1, -1]), { hops: [T.pisGo, T.pisGo + 0.5, T.reply + 0.1, T.reply + 0.6, T.reply + 1.1], glyph: false })
      x.fillStyle = '#1a1030'; x.fillRect(40, 1000, 150, 64); x.fillStyle = '#3a2d62'; x.fillRect(44, 1004, 142, 56)
      x.fillStyle = PINK; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FEELINGS', 115, 1032)
      if (r) {
        drawHeadset(x, r, { mic: false })
        drawTissue(x, r.x + r.size * 0.62, r.y + r.size * 0.2, 4, t)
        tears(r.x, r.y, r.size, t, 0, 99, { gap: inW(t, T.reply, T.reply + 2.5) ? 0.06 : 0.14, spread: 0.6, life: 0.5 })
        if (inW(t, T.pisGo, T.v3)) drawPill(x, r.x + 10, r.y - 92, 'GO!!', '#2f9e5f', pop01(t, T.pisGo, 0.3, 2.4) * (Math.floor(t * 4) % 2 ? 1 : 0.92))
      }
    }
    // THE STARS (from the reply, and back for the talk cards)
    if (inW(t, T.starsIn[0], T.cut2) || inW(t, T.lessonOut[0], T.v9)) {
      const k = t < T.cut2 ? pop01(t, T.starsIn[0], 0.35, 2.2) * (1 - prog(t, T.cut2 - 0.15, T.cut2)) : pop01(t, T.lessonOut[0], 0.35, 2.2) * (1 - prog(t, T.v9 - 0.15, T.v9))
      star('stars', STARS_P, t, S_(t < T.l9 + 1.2 ? 'happy' : t > T.flip ? 'sparkle' : 'wink', [-1, 0]), { pop: k, hops: HOPS.stars })
    }
    // the three at the desk
    const pills = []
    const hatFly = t >= T.hats[0]
    const flyOff = (i, r) => { const p = prog(t, ...T.hats); return { dx: (i - 1) * 260 * p, dy: -Math.sin(p * Math.PI) * 300 - p * 400, rot: (i - 1.1) * p * 7, alpha: 1 - prog(t, T.hats[1] - 0.2, T.hats[1]) } }
    const shake = panic(t) ? 4 * Math.sin(t * 70) : 0
    // Virgo
    {
      const st = virMood(t)
      const r = star('vir', [VIR_P[0] + shake, VIR_P[1], VIR_P[2]], t, st, { hops: [...HOPS.vir, T.snap, T.binder + 0.05, T.reply + 0.05, T.reply + 0.6] })
      if (r) {
        drawHeadset(x, r, hatFly ? flyOff(0, r) : {})
        if (inW(t, T.binder, T.v3)) { const k = pop01(t, T.binder, 0.3, 2.2); x.save(); x.translate(r.x + r.size * 0.5, r.y - r.size * 0.05); x.scale(k, k); drawBinder(x, 0, 0, 6, 0.1 + 0.05 * Math.sin(t * 4)); x.restore() }
        if (inW(t, T.nogoV, T.v3)) pills.push([r.x, T.nogoV])
        if (panic(t) || inW(t, T.v6, T.yank)) sweat(r, t, 0.3, -1)
      }
    }
    // Scorpio
    {
      const st = scoMood(t)
      const r = star('sco', [SCO_P[0] - shake, SCO_P[1], SCO_P[2]], t, st, { hops: [...HOPS.sco, T.snap, T.reply + 0.08, T.reply + 0.65] })
      if (r) {
        drawHeadset(x, r, hatFly ? flyOff(2, r) : {})
        if (t >= T.shades[0] && t < T.v6 - 0.01 || inW(t, T.yank, T.reply + 0.8)) {
          const dy = t < T.shades[1] ? -lerp(260, 0, ease.outBounce ? ease.outBounce(prog(t, ...T.shades)) : ease.outCubic(prog(t, ...T.shades))) : 0
          const fly = t >= T.reply ? prog(t, T.reply, T.reply + 0.8) : 0
          drawShades(x, r, { dy: dy - fly * 400, rot: fly * 4, alpha: 1 - fly })
        }
        if (inW(t, T.nogoS, T.v3)) pills.push([r.x, T.nogoS])
        if (panic(t)) sweat(r, t, 0.6, 1)
      }
    }
    // Capricorn, the flight director
    {
      const st = capMood(t)
      const r = star('cap', [CAP_P[0] + shake * 0.5, CAP_P[1], CAP_P[2]], t, st, { hops: [...HOPS.cap, T.snap, T.hold, T.yank, T.reply + 0.1, T.reply + 0.7, T.flip + 0.3] })
      if (r) {
        drawHeadset(x, r, hatFly ? flyOff(1, r) : {})
        if (inW(t, T.v6, T.look)) drawPencil(x, r.x + r.size * 0.02, r.y + r.size * 0.16 + (Math.floor(t * 8) % 2 ? 3 : 0), 5, -0.25)
        if (panic(t) || inW(t, T.v6, T.yank)) { sweat(r, t, 0, -1); sweat(r, t, 0.5, 1) }
      }
    }
    drawDesk(x, DESK_Y, W, t, [[VIR_P[0], 'RULES'], [CAP_P[0], 'FLIGHT'], [SCO_P[0], 'STRATEGY']])
    for (const [px, t0] of pills) drawPill(x, px, DESK_Y + 87, 'NO-GO', '#c8243e', pop01(t, t0, 0.3, 2.4))
    // the big HOLD button on Capricorn's desk
    {
      const dn = bump(t, T.hold, 0.25)
      x.fillStyle = '#1a1030'; x.fillRect(470, DESK_Y + 176, 140, 50); x.fillStyle = '#5a1020'; x.fillRect(476, DESK_Y + 182, 128, 38)
      x.fillStyle = t >= T.hold && t < T.v7 ? RED : '#8a2030'; x.fillRect(486, DESK_Y + 186 + dn * 8, 108, 24)
      x.fillStyle = '#fff'; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HOLD', 540, DESK_Y + 198 + dn * 8)
    }
    // the floor under the desk
    const g = x.createLinearGradient(0, DESK_Y + 270, 0, H); g.addColorStop(0, '#120a2a'); g.addColorStop(1, '#05040c')
    x.fillStyle = g; x.fillRect(0, DESK_Y + 270, W, H)
    drawTie(t)
  }

  // ── the tie-in: a talk card, two face-down answers, one flip
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
    x.fillStyle = GOLD; x.font = `700 16px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('A N S W E R', 0, -h / 2 + 36)
    x.fillStyle = BONE; x.font = `italic 500 44px ${SERIF}`; x.fillText('Night owl.', 0, -h / 2 + 108)
    drawPixelStar(x, 0, -h / 2 + 170, 40, 2, GOLD)
    if (stampK > 0) {
      const k = easeOutBack(clamp(stampK), 2.6)
      x.save(); x.translate(0, h / 2 - 46); x.rotate(-0.18); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 36, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#46cf82'; x.beginPath(); x.arc(0, 0, 31, 0, Math.PI * 2); x.fill()
      x.strokeStyle = '#ffffff'; x.lineWidth = 9; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(-14, 2); x.lineTo(-4, 12); x.lineTo(16, -11); x.stroke()
      x.restore()
    }
    x.restore()
  }
  const TALK_AT = { x: 540, y: 690, w: 300 }, ANS_W = 176
  const ANS = [{ x: 380, y: 1250, from: [205, 1500], tp: T.playA, rot: -0.06, who: 'YOU' }, { x: 700, y: 1250, from: [875, 1500], tp: T.playB, rot: 0.06, who: 'THEM' }]
  function drawTie(t) {
    if (t < T.tie[0] || t >= T.cardsOut[1]) return
    const o = ease.inCubic(prog(t, ...T.cardsOut))
    x.fillStyle = rgba('#07041a', 0.55 * ease.outCubic(prog(t, ...T.tie)) * (1 - o)); x.fillRect(0, 0, W, H)
    const tp = easeOutBack(prog(t, ...T.talk), 1.6)
    const g = x.createRadialGradient(TALK_AT.x, TALK_AT.y, 0, TALK_AT.x, TALK_AT.y, 460)
    g.addColorStop(0, rgba(LAV, 0.28 * clamp(tp) * (1 - o))); g.addColorStop(1, rgba(LAV, 0)); x.fillStyle = g; x.fillRect(TALK_AT.x - 460, TALK_AT.y - 460, 920, 920)
    cardImg(TALK, TALK_BODY, TALK_AT.x, TALK_AT.y - o * 800, TALK_AT.w * tp, (1 - clamp(tp)) * -0.4, 1, clamp(tp * 3) * (1 - o))
    ANS.forEach((C, i) => {
      if (t < C.tp) return
      const p = prog(t, C.tp, C.tp + 0.36), e = ease.outCubic(p)
      const tr = prog(t, ...T.trem), jit = tr > 0 && tr < 1 ? 2 + tr * 6 : 0
      const cx = lerp(C.from[0], C.x, e) + jit * Math.sin(t * 61 + i * 2), cy = lerp(C.from[1], C.y, e) - Math.sin(Math.PI * p) * 80 + o * 900
      const rot = lerp(i ? 0.8 : -0.8, C.rot, e)
      const f = prog(t, T.flip, T.flip + 0.22), sx = Math.cos(f * Math.PI)
      if (sx > 0) cardImg(BACK, BACK_BODY, cx, cy, ANS_W, rot, sx, clamp(p * 4))
      else answerFace(cx, cy, ANS_W, -sx, prog(t, T.flip + 0.3 + i * 0.1, T.flip + 0.55 + i * 0.1), rot)
      // the label
      x.save(); x.globalAlpha = clamp(p * 3) * (1 - o)
      x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 7; x.strokeStyle = 'rgba(10,6,24,0.9)'; x.strokeText(C.who, cx, cy - ANS_W * 0.95)
      x.fillStyle = i ? PINK : ARI_T; x.fillText(C.who, cx, cy - ANS_W * 0.95)
      x.restore()
      if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, T.flip + 0.1, 10, 170, 1 + i, 0.7)
    })
  }

  // ── the camera: a static flash on each cut between the room and the pad
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.klaxon, 10], [T.hold, 6], [T.reply, 10], [T.ignite, 14], [T.yank, 7], [T.blast[0], 8]]) { const k = t - t0; if (k >= 0 && k < 0.35) a = Math.max(a, amp * (1 - k / 0.35)) }
    if (inW(t, T.ignite, T.lift[1]) && viewAt(t) === 'pad') a = Math.max(a, 5)
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }
  function camS(t) {
    let s = 1
    if (viewAt(t) === 'room') s += 0.05 * ease.inOutQuad(prog(t, T.v6, T.yank)) * (1 - prog(t, T.yank, T.yank + 0.3))
    if (viewAt(t) === 'pad' && t >= T.v1 && t < T.v2) s += 0.04 * prog(t, T.v1, T.v2)
    return s
  }
  function staticFlash(t) {
    const s = lastSwitch(t), k = t - s
    if (k < 0 || k > 0.16) return
    const a = 1 - k / 0.16
    x.fillStyle = `rgba(230,240,255,${0.35 * a})`; x.fillRect(0, 0, W, H)
    for (let i = 0; i < 22; i++) { const y = ((i * 397 + Math.floor(t * 60) * 131) % H); x.fillStyle = `rgba(255,255,255,${0.3 * a})`; x.fillRect(0, y, W, 6 + (i % 3) * 6) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const sh = shakeAt(t), s = camS(t), v = viewAt(t)
        x.save(); x.translate(540 + sh[0], 1000 + sh[1]); x.scale(s, s); x.translate(-540, -1000)
        if (v === 'room') drawRoom(t)
        else drawPad(t, false)
        x.restore()
        // the klaxon: the whole frame pulses red
        const rk = redK(t)
        if (rk > 0) { x.fillStyle = rgba('#ff1a2e', 0.22 * rk); x.fillRect(0, 0, W, H) }
        if (v === 'pad') {
          x.fillStyle = Math.floor(t * 2) % 2 ? RED : '#7a2030'; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
          x.fillText('● PAD CAM 1', 44, 1428)
        }
        // onomatopoeia
        ono('*ping!*', 300, 520, t, T.inMsg, { size: 44, life: 0.8, rise: 24, color: PINK })
        ono('WEE-OO', 300, 470, t, T.klaxon, { size: 52, life: 0.6, rise: 10, color: RED })
        ono('WEE-OO', 780, 470, t, T.klaxon + 0.6, { size: 52, life: 0.6, rise: 10, color: RED, rot: 0.08 })
        ono('WEE-OO', 300, 470, t, T.klaxon + 1.2, { size: 52, life: 0.6, rise: 10, color: RED, rot: -0.06 })
        if (v === 'room') ono('*yoink*', 770, 1060, t, T.yank, { size: 48, life: 0.14 + T.v7 - T.yank, rise: 30, color: GOLD })
        ono('*click*', 700, 1080, t, T.press, { size: 44, life: 0.6, rise: 20, color: MINT })
        ono('*scrub scrub*', 235, 1110, t, T.wipe[0], { size: 40, life: 0.7, rise: 16, ticks: false })
        if (v === 'room') T.crk.forEach((c, i) => ono('*chirp*', [250, 830][i], [1120, 1080][i], t, c, { size: 38, color: 'rgba(239,230,214,0.92)', life: 1.0, rise: 24, ticks: false }))
        if (t >= T.reply && t < T.reply + 0.7) sparkleRing(t, 540, 1000, T.reply, 14, 380, 0.6)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
        staticFlash(t)
      }
      boxA.update(t); boxB.update(t); boxC.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.4 (→ the pad), 13.65 (→ be mysterious, flip), 22.45 (→ hour two), 30.45 (→ the LESSON,
// deal). The default selection keeps 13.65 and 30.45; the others stay inert.
export const CUTS = [4.4, { t: T.cut1, kind: 'flip' }, 22.45, { t: T.cut2, kind: 'deal' }]
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
const gasp = (t, g = 0.06, f = 392) => [['whoosh', +(t - 0.04).toFixed(3), 0.22, g], ['pop', t, f * UP, 0.045, 0], ['pop', +(t + 0.05).toFixed(3), f * 1.5 * UP, 0.03, 0]]
const womp = t => [['chip', t, N_.E4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', +(t + 0.34).toFixed(3), 277.18, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const cricket = (t, pan = 0.5) => [0, 0.045, 0.09, 0.26, 0.305, 0.35].map(d => ['pop', +(t + d).toFixed(3), 4186, 0.022, pan])
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.05, f0: 900, f1: 2600 }]]; for (let k = 0; k < 16; k++) out.push(['clap', +(t0 + 0.1 + k * 0.12 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.08, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), +(f * (1 - i * 0.06)).toFixed(2), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.018, decay: 0.08, sustain: 0.5 }])
const beep = (t, f = 1318.51, g = 0.03) => ['chip', t, f, 0.08, { ...FX, wave: 'square', duty: 0.25, gain: g, decay: 0.05, sustain: 0.7 }]
const klaxon = (t0, n) => Array.from({ length: n }, (_, i) => ['chip', +(t0 + i * 0.3).toFixed(3), i % 2 ? 523.25 : 698.46, 0.28, { ...FX, wave: 'square', duty: 0.4, slide: i % 2 ? -2 : 2, gain: 0.04, decay: 0.05, sustain: 0.9 }])
const holdBuzz = t => ['chip', t, 110, 0.35, { ...FX, wave: 'square', duty: 0.3, vib: 0.05, gain: 0.05, decay: 0.1, sustain: 0.9 }]
const spinTicks = (t0, t1) => { const out = []; for (let t = t0; t < t1; t += 0.035) out.push(['tick', +t.toFixed(3), 0.035]); return out }
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L; q0 = +(q0 + L * 0.84).toFixed(4) }
  return out
}
const camWhoosh = t => [['whoosh', +(t - 0.05).toFixed(3), 0.18, 0.035], ['tick', t, 0.04]]
const PITCH = { [SARI]: 1000, [SCAP]: 620, [SVIR]: 880, [SSCO]: 700, [SS]: 760 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  ...VIEWS.slice(1).flatMap(([t]) => camWhoosh(t)),
  // 1 · incoming
  ...head(T.h0, 1, T.h0Land, 0),
  ['pop', T.inMsg, N_.E5 * UP, 0.05, 0], ['pop', T.inMsg + 0.09, N_.A5 * UP, 0.05, 0], ['bell', T.inMsg + 0.02, N_.E6 * UP, 0.03, 1.2, 0],
  ...gasp(T.snap, 0.04, 523.25),
  // 2 · the pad: the drop
  ...head(T.h1, 3, T.h1Land, 2),
  ...Array.from({ length: 3 }, (_, i) => beep(+(T.count + i).toFixed(3), 880, 0.025)),
  // 3 · HOLD
  ...head(T.h2, 2, T.h2Land, 1), holdBuzz(T.hold), ['tom', T.hold, 90, { ...FX, gain: 0.2, decay: 0.2 }],
  // 4 · the rules
  ...head(T.h3, 3, T.h3Land, 3), ['whoosh', T.binder, 0.25, 0.04], ['tom', T.binder + 0.3, 140, { ...FX, gain: 0.12, decay: 0.12 }],
  ['chip', T.nogoV, 196, 0.3, { ...FX, wave: 'square', duty: 0.3, gain: 0.04, decay: 0.1, sustain: 0.8 }], ...spinTicks(...T.spinA), ['boom', T.spinA[1], 0.04],
  ...womp(T.droop + 0.1),
  // 5 · strategy
  ...head(T.h4, 2, T.h4Land, 0), ['whoosh', T.shades[0], 0.3, 0.05], ['pop', T.shades[1], N_.C6 * UP, 0.04, 0.3], ['pluck', T.shades[1], N_.E5 * UP, 0.04, 0.8, 0.3],
  ['chip', T.nogoS, 196, 0.3, { ...FX, wave: 'square', duty: 0.3, gain: 0.04, decay: 0.1, sustain: 0.8 }], ...spinTicks(...T.spinB), ['boom', T.spinB[1], 0.03],
  ...[0, 0.25, 0.5].map(d => beep(+(T.pisGo + d).toFixed(3), 1567.98, 0.02)), ...sob(T.pisGo + 0.7, N_.E6),
  // 6 · the heart, ABORT
  ...[0, 0.15, 0.3].map(d => ['pop', +(T.paint[0] + d).toFixed(3), [N_.C6, N_.E6, N_.A5][Math.round(d / 0.15)] * UP, 0.03, -0.2]),
  ...klaxon(T.klaxon, 7), ['boom', T.klaxon, 0.06], ...wordPops(T.h5, 3, 0.09, 4),
  ...gasp(T.l6 - 0.2, 0.05, 349.23),
  ['whoosh', T.wipe[0] - 0.35, 0.3, 0.035], ['shaker', T.wipe[0], { gain: 0.04, len: 0.25, bus: 'sfx' }], ['shaker', T.wipe[0] + 0.25, { gain: 0.04, len: 0.25, bus: 'sfx' }], ...womp(T.wipe[1]),
  // 7 · hour two: the score stops, crickets, the clock ticks
  ...head(T.h6, 2, T.h6Land, 2),
  ...silence(T.v6 + 0.1, 0.55, T.ignite - 0.02),
  ...cricket(T.crk[0]), ...cricket(T.crk[1], -0.4),
  ...Array.from({ length: 3 }, (_, i) => ['tick', +(T.v6 + 0.5 + i).toFixed(3), 0.05]),
  ['whoosh', T.yank - 0.05, 0.2, 0.05], ['pop', T.yank, N_.A4 * UP, 0.05, 0.3], ['chip', T.yank + 0.05, 880, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -24, gain: 0.03, decay: 0.2, sustain: 0.5 }],
  // 8 · T-zero, liftoff (the lift)
  ...head(T.h7, 2, T.h7Land, 0),
  ['pop', T.restore, N_.A5 * UP, 0.05, 0], ['glitter', T.restore, T.restore + 0.4], ['tick', T.press, 0.08], beep(T.press, 1760, 0.03),
  ['boom', T.ignite, 0.1], ['swell', T.ignite, T.lift[1], { bus: 'sfx', gain: 0.06, f0: 300, f1: 5000 }], ['whoosh', T.lift[0], 1.0, 0.07],
  // 9 · four seconds: delivered, the reply, the room erupts
  ...head(T.h8, 3, T.h8Land, 3),
  ['pop', T.sent, N_.E5 * UP, 0.04, 0.3], ['pop', T.sent + 0.08, N_.A5 * UP, 0.04, 0.3],
  ['pop', T.reply, N_.A5 * UP, 0.06, -0.3], ['bell', T.reply + 0.02, N_.E6 * UP, 0.05, 1.6, 0], ['bell', T.reply + 0.02, N_.A5 * UP, 0.04, 1.6, 0], ['glitter', T.reply, T.reply + 0.8],
  ...cheers(T.reply + 0.05, T.reply + 1.9), ['whoosh', T.hats[0], 0.4, 0.04], ...sob(T.reply + 0.3, N_.E6), ...sob(T.reply + 0.9, N_.C6),
  ['whoosh', T.starsIn[0], 0.4, 0.05], ['bell', T.starsIn[1], N_.E6 * UP, 0.03, 1.2, 0.3],
  // 10 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 11 · talk cards
  ...head(T.h9, 4, T.h9Land, 2),
  ['whoosh', T.talk[0], 0.4, 0.05], ['bell', T.talk[1], N_.E6 * UP, 0.03, 1.2, 0],
  ['whoosh', T.playA, 0.25, 0.04], ['tick', T.playA + 0.36, 0.06], ['whoosh', T.playB, 0.25, 0.04], ['tick', T.playB + 0.36, 0.06],
  ['tick', T.flip, 0.08], ['bell', T.flip + 0.1, N_.A5 * UP, 0.04, 1.6, -0.2], ['bell', T.flip + 0.1, N_.E6 * UP, 0.03, 1.6, 0.2], ['glitter', T.flip, T.flip + 0.6],
  ['pop', T.flip + 0.3, N_.C6 * UP, 0.04, -0.3], ['pop', T.flip + 0.4, N_.E6 * UP, 0.04, 0.3],
  ['whoosh', T.cardsOut[0], 0.3, 0.035],
  // 12 · liftoff
  ...head(T.h10, 0, T.h10Land, 0),
  ['pop', T.blast[0] - 0.3, N_.E5 * UP, 0.04, 0], ['boom', T.blast[0], 0.06], ['whoosh', T.blast[0], 0.9, 0.06], ['glitter', T.blast[0], T.blast[1]],
  ...sob(T.blast[0] + 0.4, N_.A5),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES_A, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_B, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_C, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
