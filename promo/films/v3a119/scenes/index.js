// v3a119: star_advice, ADVICE ROLLCALL, "Each sign’s | biggest strength." (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific strength each, with one light gag:
//   ♈ courage: off the high dive first · ♉ loyalty: an anchor, STILL HERE · ♊ curiosity: QUESTION #48 · ♋ care: checked on
//   six friends · ♌ generosity: the biggest slice is yours · ♍ help: the wobbly table, FIXED. QUIETLY. · ♎ fairness: the mic
//   gets passed · ♏ depth: skipped the weather · ♐ hope: a rainbow out of a rain cloud · ♑ grit: STEP 400 · ♒ vision: IDEA
//   #1,000 · ♓ empathy: crying with you
//  49.2   "Twelve signs. | *Twelve gifts.*"  group photo
//  52.4   LESSON UNLOCKED: "Find yours. | *Use it kindly.*"  STRENGTHS: 12/12
//  58.3   "Go be *you.* | Out loud."
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', AMBER = '#ffc04d'

const ANCHOR = ['...SSS...', '...S.S...', '...SSS...', '.SSSSSSS.', '....S....', '....S....', 'S...S...S', 'SS..S..SS', '.SSSSSSS.', '...SSS...']
const PIZZA = ['CCCCCCCCC', '.YYRYYYY.', '.YYYYRYY.', '..YRYYY..', '..YYYY...', '...YRY...', '...YY....', '....Y....']
const BULB = ['..YYYY..', '.YYYYYY.', 'YYYWYYYY', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
const MIC = ['.MMM.', 'MMMMM', 'MMMMM', '.MMM.', '..K..', '..K..', '..K..', '.KKK.']
function dive(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-20, -200, 40, 360); x.fillStyle = BONE; x.fillRect(-14, -194, 28, 348)
  x.fillStyle = INK; x.fillRect(-160, -214, 200, 30); x.fillStyle = SKYB; x.fillRect(-154, -208, 188, 18)
  x.fillStyle = '#4fb6e8'; x.fillRect(-200, 160, 400, 60); x.fillStyle = '#7fd0f2'; for (let i = 0; i < 5; i++) x.fillRect(-180 + i * 80 + 8 * Math.sin(t * 3 + i), 172, 40, 8)
  x.restore()
}
function table(x, cx, cy, k, fixed) {
  if (k <= 0.01) return
  const wob = fixed ? 0 : 0.06 * Math.sin(Date.now ? 0 : 0)
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(fixed ? 0 : -0.08)
  x.fillStyle = INK; x.fillRect(-160, -20, 320, 34); x.fillStyle = WOOD; x.fillRect(-154, -14, 308, 22)
  x.fillStyle = INK; x.fillRect(-140, 14, 22, 140); x.fillRect(118, 14, 22, fixed ? 140 : 110)
  x.fillStyle = '#a8743f'; x.fillRect(-136, 18, 14, 132); x.fillRect(122, 18, 14, fixed ? 132 : 102)
  if (fixed) { x.fillStyle = MINT; x.fillRect(116, 120, 26, 34) }
  x.fillStyle = INK; x.beginPath(); x.ellipse(-40, -38, 40, 18, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.fillRect(-58, -82, 36, 46)
  x.restore()
}
function rainbow(x, t, cx, cy, k, show) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (show > 0.01) {
    x.globalAlpha = clamp(show); x.lineWidth = 22
    ;[RED, '#ffb34a', GOLD, '#5fd068', SKYB, LAV].forEach((c, i) => { x.strokeStyle = c; x.beginPath(); x.arc(40, 160, 200 - i * 22, Math.PI, 0); x.stroke() })
    x.globalAlpha = 1
  }
  x.fillStyle = INK; for (const [a, b, r] of [[-60, -40, 64], [10, -70, 78], [80, -40, 60]]) { x.beginPath(); x.arc(a, b, r + 6, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#9aa5c4'; for (const [a, b, r] of [[-60, -40, 64], [10, -70, 78], [80, -40, 60]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
  if (show < 0.5) { x.fillStyle = SKYB; for (let i = 0; i < 6; i++) x.fillRect(-90 + i * 34, 20 + ((t * 160 + i * 23) % 80), 7, 20) }
  x.restore()
}
function stairs(x, cx, cy, k, climb) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(-180 + i * 60, 120 - i * 50, 66, 50 + i * 50); x.fillStyle = i % 2 ? '#7a86b8' : '#9aa5c4'; x.fillRect(-176 + i * 60, 124 - i * 50, 58, 46 + i * 50) }
  x.fillStyle = INK; x.fillRect(150, -280, 8, 110); x.fillStyle = RED; x.beginPath(); x.moveTo(158, -280); x.lineTo(220, -255); x.lineTo(158, -230); x.fill()
  const s = Math.min(5, Math.floor(climb * 6)); x.fillStyle = GOLD; x.fillRect(-170 + s * 60, 100 - s * 50, 40, 20)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Courage. | You *go first.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { dive(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) { label(x, 790, 640, 'FIRST IN. AGAIN.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: '#ff6b5a', rot: -0.04, font: MONO, weight: 700 }) } },
  { sign: 'taurus', cap: 'Loyalty. | *You stay.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ANCHOR, { S: '#c9c4d8' }, 790, 870, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'STILL HERE. YEAR 9.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Curiosity. | *The best questions.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 690, 'ok but | WHY though?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      const n = Math.min(48, 1 + Math.floor(Math.max(0, lt - 0.4) * 34))
      label(x, 790, 930, `QUESTION #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 42, bg: AMBER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Care. You *check in.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 690, 'you ok? | (for real)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.6) * 5))
      label(x, 790, 930, `FRIENDS CHECKED: ${n}`, pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Generosity. | *Biggest slice? Yours.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PIZZA, { C: WOOD, Y: GOLD, R: RED }, lerp(820, 740, ease.inOutCubic(prog(lt, 0.8, 1.3))), 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.15 })
      label(x, 790, 1110, 'HEART: HUGE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: '#ffb34a', rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Help. Fixed | *before you asked.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      table(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.1)
      if (lt > 1.1) sparkles(x, t, 900, 1010, P.t0 + 1.1 * (3.1 / 2.4), 6, 80, 0.3)
      label(x, 790, 660, 'FIXED. QUIETLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Fairness. | *Everyone gets heard.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200, s: 270 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), pass = ease.inOutCubic(prog(lt, 0.8, 1.3))
      if (k > 0.01) signChar(x, t, 'virgo', 840, 980, 190 * k, { mood: lt > 1.3 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 111, glyph: false, hops: [P.t0 + 1.8] })
      drawBits(x, MIC, { M: '#9aa5c4', K: INK }, lerp(500, 690, pass), 940, 24 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: lerp(-0.4, 0.4, pass) })
      label(x, 760, 660, 'YOUR TURN ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: '#ff9ccf', rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Depth. | *No small talk.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 690, 'so. what’s your | biggest dream?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 930, 'SKIPPED THE WEATHER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Hope. | *Always a bright side.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      rainbow(x, t, 790, 800, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.9, 1.4)))
      label(x, 790, 1100, 'LOOK! A RAINBOW!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: '#ff9a4a', rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Grit. | *You never quit.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -190 },
    front(x, t, lt, P) {
      stairs(x, 780, 900, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.4, 1.8))
      const n = Math.min(400, Math.round(400 * ease.outCubic(prog(lt, 0.4, 1.8))))
      label(x, 780, 1150, `STEP ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 40, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Vision. | *You see what’s next.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const on = lt > 1.0
      drawBits(x, BULB, { Y: on ? GOLD : '#7a86b8', W: on ? '#ffffff' : '#9aa5c4', G: '#9aa5c4' }, 790, 840, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (on) sparkles(x, t, 790, 800, P.t0 + 1.0 * (3.1 / 2.4), 8, 170, 0.5)
      label(x, 790, 1110, 'IDEA #1,000', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Empathy. | *You feel it with us.*', mood: 'wide', tears: 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 960, 190 * k, { mood: 'squint', look: [-1, 0], seed: 112, glyph: false, tears: 1 })
      label(x, 800, 680, 'CRYING WITH YOU', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a119', key: 'G', accent: AMBER, ending: 'lesson',
  title: 'Each sign’s | *biggest strength.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Twelve gifts.*' },
  lesson: { text: 'Find yours. | *Use it kindly.*', chip: 'STRENGTHS: 12/12' },
  last: { text: 'Go be *you.* | Out loud.' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
