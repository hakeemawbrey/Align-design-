// r2a0366: star_advice, ADVICE SOLO, "Aquarius, you can | *be a beginner.*" (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine gentle beginner truths for an Aquarius, each a relatable truth + a warm reframe. Ending: lesson.
//   0.0–3.6    "Aquarius, you can | *be a beginner.*"
//   3.6–37.8   nine cards: training wheels are allowed · no genius required on day one · ask the "silly" question
//              · the lumpy first vase still counts · follow the recipe, just this once · level two counts
//              · let someone teach you · your first draft is still yours · future you says thanks
//  37.8        "Start messy. | *Stay curious.*"
//  41.0        LESSON UNLOCKED: "Nobody starts out great. | *You get to grow.*"  BEGINNER: BRAVE
//  46.9        "Wobble on, | *Aquarius.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#6fc3ff', CREAM = '#fff4e2', RED = '#e23d4e', CLAY = '#d98a5a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

// ── props
/** a little pixel bike with training wheels; wob = wobble angle */
function bike(x, cx, cy, k, wob = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(wob); x.scale(k, k)
  const wheel = (wx, wy, r) => { x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(wx, wy, r, 0, 7); x.stroke(); x.strokeStyle = '#9aa0b4'; x.lineWidth = 8; x.beginPath(); x.arc(wx, wy, r, 0, 7); x.stroke() }
  wheel(-110, 40, 64); wheel(110, 40, 64)
  wheel(-170, 82, 22); wheel(-50, 82, 22)                   // the training wheels
  x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.moveTo(-110, 40); x.lineTo(-20, -40); x.lineTo(80, -40); x.lineTo(110, 40); x.moveTo(-20, -40); x.lineTo(10, 40); x.lineTo(-110, 40); x.moveTo(80, -40); x.lineTo(70, -90); x.stroke()
  x.strokeStyle = ACC; x.lineWidth = 10; x.beginPath(); x.moveTo(-110, 40); x.lineTo(-20, -40); x.lineTo(80, -40); x.lineTo(110, 40); x.moveTo(-20, -40); x.lineTo(10, 40); x.lineTo(-110, 40); x.moveTo(80, -40); x.lineTo(70, -90); x.stroke()
  x.fillStyle = INK; x.fillRect(-50, -62, 64, 22); x.fillRect(46, -104, 62, 20); x.fillStyle = PINK; x.fillRect(-46, -58, 56, 14); x.fillStyle = GOLD; x.fillRect(50, -100, 54, 12)
  x.restore()
}
const BULB = ['..YYYY..', '.YYYYYY.', 'YYYWYYYY', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
/** a lumpy clay vase on a wheel */
function vase(x, cx, cy, k, t, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, 120, 300, 30); x.fillStyle = '#9aa0b4'; x.fillRect(-144, 124, 288, 20)
  const wob = 1 + 0.06 * Math.sin(t * 9)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, 122); x.bezierCurveTo(-150 * wob, 40, -30, -20, -60, -110); x.lineTo(20, -122); x.bezierCurveTo(90, -30, 150 * wob, 30, 80, 122); x.closePath(); x.fill()
  x.fillStyle = CLAY; x.beginPath(); x.moveTo(-60, 114); x.bezierCurveTo(-136 * wob, 40, -20, -20, -50, -104); x.lineTo(12, -112); x.bezierCurveTo(78, -30, 136 * wob, 30, 70, 114); x.closePath(); x.fill()
  x.fillStyle = '#b86a3e'; x.fillRect(-60, 10, 110, 10); x.fillRect(-40, -50, 70, 8)
  x.restore()
}
/** a recipe card */
function recipe(x, cx, cy, k, rows, done) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 316, 316)
  x.fillStyle = INK; x.fillRect(-162, -162, 324, 324); x.fillStyle = CREAM; x.fillRect(-154, -154, 308, 308)
  x.fillStyle = RED; x.fillRect(-154, -154, 308, 54); x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('RECIPE', 0, -126)
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'
  rows.forEach((r, i) => { x.fillStyle = INK; x.fillText(r, -110, -60 + i * 56); x.fillStyle = INK; x.fillRect(-140, -72 + i * 56, 22, 22); x.fillStyle = i < done ? MINT : CREAM; x.fillRect(-136, -68 + i * 56, 14, 14) })
  x.restore()
}
/** a game-style progress bar with a level badge */
function levelBar(x, cx, cy, k, f, lvl) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -36, 360, 72); x.fillStyle = '#140c30'; x.fillRect(-170, -26, 340, 52)
  x.fillStyle = MINT; x.fillRect(-170, -26, 340 * f, 52)
  x.fillStyle = INK; x.fillRect(-60, -110, 120, 64); x.fillStyle = GOLD; x.fillRect(-54, -104, 108, 52)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`LV ${lvl}`, 0, -77)
  x.restore()
}
const GUITAR = ['.......KK', '......KK.', '.....KK..', '....KK...', '.BBBK....', 'BBBBBB...', 'BBOBBB...', 'BBBBBB...', '.BBBB....']
/** an easel canvas with a wobbly scribble */
function canvasArt(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#8a4a2e'; x.fillRect(-90, 110, 16, 150); x.fillRect(74, 110, 16, 150)
  x.fillStyle = INK; x.fillRect(-160, -150, 320, 270); x.fillStyle = CREAM; x.fillRect(-150, -140, 300, 250)
  x.save(); x.beginPath(); x.rect(-150, -140, 300, 250); x.clip()
  const cols = [ACC, PINK, GOLD, MINT]
  for (let s = 0; s < 4; s++) { x.strokeStyle = cols[s]; x.lineWidth = 16; x.beginPath(); for (let i = 0; i <= 20 * p; i++) { const u = i / 20, px = -120 + u * 240, py = -80 + s * 50 + 26 * Math.sin(u * 11 + s * 2); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore(); x.restore()
}

const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Training wheels? | *Totally allowed.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bike(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 0.08 * Math.sin(t * 6) * (lt < 1.4 ? 1 : 0.3))
      L(x, 790, 650, 'WOBBLE: NORMAL', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04)
    } },
  { sign: S, cap: 'Genius on day one? | *Not required.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const g = clamp((lt - 0.4) / 1.4)
      drawBits(x, BULB, { Y: g > 0.9 ? GOLD : '#6b6290', W: g > 0.9 ? '#fff' : '#8a84b0', G: '#9aa0b4' }, 790, 800, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (g > 0.9) sparkles(x, t, 790, 780, P.t0 + 1.9 * (3.1 / 2.4) - 0.3, 7, 150, 0.2)
      L(x, 790, 1090, g > 0.9 ? 'IDEA: ON' : 'IDEA: LOADING…', pop01(t, P.t0 + 0.6, 0.3, 2.4), g > 0.9 ? GOLD : BONE)
    } },
  { sign: S, cap: 'Ask the “silly” question. | *Everyone wanted to.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'um, quick | question?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 700, 860, 'same!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      bubble(x, 870, 980, 'me too!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      bubble(x, 690, 1100, 'thank you', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, col: GOLD, tail: 'br' })
    } },
  { sign: S, cap: 'Lumpy first vase? | *Still a vase.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      vase(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), t, lt)
      L(x, 790, 1110, 'HOLDS FLOWERS ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04)
    } },
  { sign: S, cap: 'Follow the recipe. | *Just this once.*', mood: lt => lt > 1.6 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      recipe(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), ['flour', 'eggs', 'no glitter', 'bake'], Math.floor(clamp((lt - 0.5) / 1.2) * 4))
      L(x, 790, 1100, 'IMPROVISED: 0 STEPS', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'Level two | *counts. Celebrate it.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const f = clamp((lt - 0.4) / 1.0)
      levelBar(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), f < 1 ? f : 0.12, f < 1 ? 1 : 2)
      if (f >= 1) sparkles(x, t, 790, 800, P.t0 + 1.4 * (3.1 / 2.4), 8, 170, 0.5)
      L(x, 790, 1080, 'LEVEL UP!', pop01(t, P.t0 + 1.9, 0.3, 2.4), GOLD, -0.05, 40)
    } },
  { sign: S, cap: 'Let someone teach you. | *That’s connection.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 17, glyph: false })
      drawBits(x, GUITAR, { K: '#8a4a2e', B: '#ffb34a', O: INK }, 560, 1010, 16 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.3 })
      bubble(x, 800, 690, 'like this!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Your first draft | *is still yours.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      canvasArt(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.3) / 1.2))
      L(x, 790, 640, 'MASTERPIECE (V1)', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04)
    } },
  { sign: S, cap: 'Future you | *says thank you.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 900, 230 * k, { mood: 'sparkle', look: [-1, 0], seed: 19, glyph: false, alpha: 0.85 })
      L(x, 800, 1110, 'YOU, NEXT YEAR', pop01(t, P.t0 + 0.8, 0.3, 2.4), LAV)
      bubble(x, 800, 660, 'thanks for | starting!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bc' })
      if (lt > 1.4) hearts(x, t, 560, 800, P.t0 + 1.5, { n: 4, life: 1.4, spread: 100, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0366', key: 'D', accent: ACC, solo: 'aquarius', ending: 'lesson',
  title: 'Aquarius, you can | *be a beginner.*',
  cameos: CAMEOS,
  group: { cap: 'Start messy. | *Stay curious.*', mood: 'sparkle' },
  lesson: { text: 'Nobody starts out great. | *You get to grow.*', chip: 'BEGINNER: BRAVE' },
  last: { text: 'Wobble on, | *Aquarius.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
