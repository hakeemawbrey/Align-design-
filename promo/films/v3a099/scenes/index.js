// v3a099: star_advice, ADVICE SOLO, "Leo, stop doing | this in love." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): gentle, kind love advice for Leo, one gag each.
//   0.0–3.6    "Leo, stop doing | *this in love.*"
//   3.6–37.8   nine cards (3.8 s each):
//              hiding the hurt behind a grin (SAY OUCH) · needing applause for every text (an APPLAUSE sign that stays dark)
//              · paying for everything (Cancer grabs the bill: MY TREAT) · sharing the stage (a CO-STAR sticker)
//              · the 40-question loyalty quiz (just ask) · pride after a fight (a tiny "sorry" that gets bigger)
//              · grand gestures only (one daisy wins) · comparing to other couples (NOT A CONTEST)
//              · quiet doesn't mean gone (QUIET IS STILL LOVE)
//  37.8        "Big heart. | *Let it be held.*"  Leo comes back, big.
//  41.0        LESSON UNLOCKED: "You don't have to perform | *to be loved.*"  HEART: HELD
//  46.9        "Still a star. | *Off stage, too.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LEO = '#f39a3a', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'leo'

const DAISY = ['..WW.WW..', '.WWWWWWW.', 'WWWYYYWWW', '.WWYYYWW.', 'WWWYYYWWW', '.WWWWWWW.', '..WW.WW..', '....G....', '...GG....', '....G.GG.', '....GGG..', '....G....', '....G....']
const DAISY_C = { W: '#fff4e2', Y: GOLD, G: '#5fd068' }

function sign(x, cx, cy, k, text, lit) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -56, 340, 112); x.fillStyle = lit ? RED : '#3a1f2a'; x.fillRect(-160, -46, 320, 92)
  if (lit) { x.shadowColor = RED; x.shadowBlur = 30 }
  x.fillStyle = lit ? '#fff4e2' : '#6a4a5a'; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
function bill(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-80, -110, 160, 220); x.fillStyle = '#fff4e2'; x.fillRect(-72, -102, 144, 204)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BILL', 0, -74)
  x.fillStyle = 'rgba(27,18,54,0.4)'; for (let i = 0; i < 4; i++) x.fillRect(-52, -36 + i * 30, 104, 8)
  x.restore()
}
function frame(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -120, 280, 240); x.fillStyle = GOLD; x.fillRect(-130, -110, 260, 220); x.fillStyle = '#3d3470'; x.fillRect(-108, -88, 216, 176)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Hiding the hurt | *behind a grin.*', mood: lt => lt > 1.4 ? 'neutral' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'I’m FINE!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 900, 'IT’S OKAY TO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'SAY OUCH', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 48, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Your texts don’t | *need applause.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, -1], star: { x: -220 }, hops: [0.6],
    front(x, t, lt, P) {
      sign(x, 790, 700, pop01(t, P.t0 + 0.2, 0.3, 2), 'APPLAUSE', lt < 1.2)
      bubble(x, 790, 920, 'good morning!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl', col: '#ffe2b8' })
      label(x, 790, 1090, 'STILL CUTE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Paying for everything. | *Let them treat you.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 840, 990, 170 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.1] })
      const grab = ease.inOutCubic(prog(lt, 0.7, 1.2))
      bill(x, lerp(560, 760, grab), lerp(900, 860, grab), pop01(t, P.t0 + 0.3, 0.3, 2), lerp(-0.2, 0.15, grab))
      label(x, 800, 620, 'MY TREAT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: SKYB, rot: 0.05 })
    } },
  { sign: S, cap: 'Share the stage. | *It’s romantic.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -160 }, hops: [1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.4, 1.4)
      x.save(); x.globalAlpha = 0.25 * clamp(k); x.fillStyle = '#fff1c8'
      x.beginPath(); x.moveTo(300, 470); x.lineTo(480, 470); x.lineTo(560, 1180); x.lineTo(160, 1180); x.fill()
      if (lt > 1.0) { x.beginPath(); x.moveTo(680, 470); x.lineTo(860, 470); x.lineTo(960, 1180); x.lineTo(580, 1180); x.fill() }
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 1.0 * 1.29, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 770, 960, 210 * k, { mood: 'heart', look: [-1, 0], seed: 22, glyph: false, tears: 2, hops: [P.t0 + 1.6] })
      label(x, 770, 700, 'CO-STAR', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Loyalty quizzes? | *Just ask.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -190, 280, 380); x.fillStyle = '#fff4e2'; x.fillRect(-132, -182, 264, 364)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOYALTY QUIZ', 0, -146)
        x.font = `800 24px ${INTER}`; x.textAlign = 'left'; ['Q1. would you…', 'Q2. what if…', 'Q3. but WOULD', 'Q4. …', 'Q40. final'].forEach((s, i) => x.fillText(s, -110, -90 + i * 56))
        x.restore()
      }
      if (lt > 1.4) bubble(x, 470, 660, 'you okay?', pop01(t, P.t0 + 1.45, 0.25, 2.4), { size: 36, tail: 'bl', col: '#ffd2e0' })
    } },
  { sign: S, cap: 'After a fight, | *say sorry first.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const g = 0.5 + ease.outBack(prog(lt, 0.8, 1.6)) * 0.9
      bubble(x, 760, 840, 'sorry', pop01(t, P.t0 + 0.3, 0.25, 2.2) * g, { size: 40, tail: 'bl', col: '#ffe2b8' })
      label(x, 790, 1100, 'BIGGER. LOUDER.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Small gestures | *count too.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 840, 990, 170 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.2] })
      drawBits(x, DAISY, DAISY_C, 660, 920, 12 * pop01(t, P.t0 + 0.5, 0.3, 2.2), { rot: -0.2 })
      label(x, 720, 660, 'ONE DAISY. SWOON.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 840, 900, P.t0 + 1.0, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Comparing to | *other couples.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      frame(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) { signChar(x, t, 'aries', 750, 830, 90 * k, { mood: 'heart', seed: 24, glyph: false }); signChar(x, t, 'libra', 830, 830, 90 * k, { mood: 'heart', seed: 25, glyph: false }) }
      label(x, 790, 1060, 'NOT A CONTEST', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Quiet doesn’t | *mean gone.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 830, 990, 170 * k, { mood: 'sleepy', look: [-1, 0], seed: 26, glyph: false })
      bubble(x, 820, 690, '(reading next | to you)', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 28, tail: 'br' })
      label(x, 560, 1130, 'QUIET IS STILL LOVE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a099', key: 'G', accent: LEO, solo: S, ending: 'lesson',
  title: 'Leo, stop doing | *this in love.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Let it be held.*', mood: 'heart' },
  lesson: { text: 'You don’t have to perform | *to be loved.*', chip: 'HEART: HELD' },
  last: { text: 'Still a star. | *Off stage, too.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
