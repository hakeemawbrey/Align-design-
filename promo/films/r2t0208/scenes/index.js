// r2t0208: THE SIGNS AS… v3, ROLLCALL, "The signs | as bus drivers." (~57 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "The signs | *as bus drivers.*"
//   3.6–49.2   ♈ skipped every stop, record time · ♉ pulled over for a sandwich · ♊ a new route every day · ♋ waited for
//              every runner, handed out tea · ♌ gave a tour of their own life · ♍ left at 8:00:00 exactly · ♎ seated
//              passengers by compatibility · ♏ only drives the night bus · ♐ missed the last stop by a country · ♑ bought
//              the bus company by Friday · ♒ route 12, via the moon · ♓ cried at every goodbye
//  49.2        "Twelve drivers. | *Nobody got home.*"
//  52.6        callback: "Taurus is still | *on lunch.*"  the sandwich comes back, a BACK IN 5 sign swings.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, clock, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = SUN
const ST = { x: -170 }

/** a pixel steering wheel */
function wheel(x, cx, cy, r, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#55507a'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r - 22, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#55507a'; x.fillRect(-r, -9, 2 * r, 18); x.fillRect(-9, 0, 18, r)
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 22, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a bus-stop sign on a pole with a line of text */
function stopSign(x, cx, cy, k, text, { bg = SKYB, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -20, 20, 260); x.fillStyle = GREY; x.fillRect(-5, -20, 10, 260)
  x.restore()
  label(x, cx, cy - 40 * k, text, k, { size: 32, bg, rot: rot - 0.03, font: MONO, weight: 700 })
}
const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'YYYYYYYYYYYY', 'RRRRRRRRRRRR', '.BBBBBBBBBB.']
const SAND_C = { B: '#e8a24a', G: '#5fd068', Y: '#ffd86b', R: '#d0453a' }
const MUG = ['.WWWWWW.', 'WTTTTTTWWW', 'WTTTTTTW.W', 'WTTTTTTWWW', 'WTTTTTTW', '.WWWWWW.']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']
const BUS = ['.YYYYYYYYYYYYYY.', 'YYWWWYWWWYWWWYYY', 'YYWWWYWWWYWWWYWY', 'YYYYYYYYYYYYYYYY', 'YYYYYYYYYYYYYYRY', 'YYKKYYYYYYYKKYYY', '..KK.......KK...']
const BUS_C = { Y: SUN, W: SKYB, K: INK, R: '#e23d4e' }

const CAMEOS = [
  { sign: 'aries', cap: 'Skipped every stop. | *Record time.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -150 }, hops: [0.5, 1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      wheel(x, 380, 1040, 90, pop01(t, P.t0 + 0.15, 0.3, 2), Math.sin(lt * 8) * 0.6)
      for (let i = 0; i < 3; i++) stopSign(x, 680 + i * 120, 980 - i * 40, pop01(t, P.t0 + 0.4 + i * 0.15, 0.3, 2), 'STOP', { bg: lt > 0.9 + i * 0.2 ? GREY : SKYB, rot: lt > 0.9 + i * 0.2 ? 0.25 : 0 })
      label(x, 790, 650, 'ROUTE: 4 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#ff6b5a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Pulled the bus over | *for a sandwich.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SAND_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 680, 'PASSENGERS: 40', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'LUNCH: 1 HOUR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#5fd068', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A new route | *every single day.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const R = ['ROUTE 7', 'ROUTE 12?', 'ROUTE 3!', 'ROUTE ???']
      stopSign(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), R[Math.min(3, Math.floor(lt * 2))], { bg: '#ffd23a' })
      bubble(x, 790, 1120, 'trust me!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Waited for every runner. | *Handed out tea.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, MUG, { W: '#fff4e2', T: '#c98f6a' }, 680 + i * 110, 960 - (i % 2) * 40, 14 * pop01(t, P.t0 + 0.4 + i * 0.15, 0.3, 2))
      label(x, 790, 700, 'WAITED: 9 MIN', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'TEA: FREE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 790, 900, P.t0 + 1.4 * 1.29, { n: 4, life: 1.4, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Gave a tour. | *Of their own life.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'on your left:', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 790, 850, 'my old school!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 780, 1030, 'my best angle!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      sparkles(x, t, 370, 860, P.t0 + 1.5, 6, 170, 0.6)
    } },
  { sign: 'virgo', cap: 'Left at 8:00. | *And zero seconds.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clock(x, 790, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), 8, 0)
      label(x, 790, 1040, 'DOORS: CLOSED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 780, 1160, 'wait!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
    } },
  { sign: 'libra', cap: 'Seated passengers | *by compatibility.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'SEATING', 0, -130, { size: 30, font: MONO, weight: 700 })
        ;['ROW 1 · ♈︎ + ♎︎', 'ROW 2 · ♉︎ + ♋︎', 'ROW 3 · ♊︎ + ♒︎'].forEach((s, i) => { if (lt > 0.5 + i * 0.25) txt(x, s, 0, -60 + i * 60, { size: 30, font: MONO, weight: 700, color: '#c94f7c' }) })
      })
      label(x, 790, 1110, 'VIBES: BALANCED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Only drives | *the night bus.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 860, 680, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      stopSign(x, 760, 900, pop01(t, P.t0 + 0.5, 0.35, 2), 'ROUTE: MIDNIGHT', { bg: LAV })
      label(x, 790, 1150, 'DAYLIGHT: NO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Missed the last stop. | *By a whole country.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, BUS, BUS_C, lerp(700, 820, ease.inOutCubic(prog(lt, 0.3, 1.6))), 1020, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'NEXT STOP: ABROAD', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 760, 860, 'scenic!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Drove for a week. | *Bought the company.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'BUS CO.', 0, -60, { size: 36, font: MONO, weight: 700 })
        txt(x, lt > 1.1 ? 'OWNER: ♑︎' : 'OWNER: ?', 0, 20, { size: 36, color: lt > 1.1 ? '#2f7f5a' : INK })
      })
      label(x, 790, 1080, 'PROMOTED: SELF', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Route 12. | *Via the moon.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      x.save(); x.fillStyle = INK; x.beginPath(); x.arc(860, 700, 88 * pop01(t, P.t0 + 0.2, 0.35, 2), 0, Math.PI * 2); x.fill(); x.fillStyle = '#e6e0c8'; x.beginPath(); x.arc(860, 700, 80 * pop01(t, P.t0 + 0.2, 0.35, 2), 0, Math.PI * 2); x.fill(); x.restore()
      const p = ease.inOutCubic(prog(lt, 0.5, 1.8))
      drawBits(x, BUS, BUS_C, lerp(640, 820, p), lerp(1050, 760, p), 10 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.35 })
      label(x, 760, 1130, 'NEXT STOP: MOON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at every stop. | *Every goodbye.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'bye! get home safe!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      label(x, 790, 960, 'STOP 3 OF 40', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'TISSUES: LOW', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0208', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs | *as bus drivers.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve drivers. | *Nobody got home.*' },
  last: {
    text: 'Taurus is still | *on lunch.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 1080, 280 * k, { mood: 'heart', seed: 52, hops: [t - lt + 1.4] })
      drawBits(x, SANDWICH, SAND_C, 720, 1100, 20 * pop01(t, t - lt + 0.9, 0.35, 2), { rot: 0.06 })
      stopSign(x, 800, 1380, pop01(t, t - lt + 1.5, 0.35, 2), 'BACK IN 5', { bg: GOLD, rot: 0.06 * Math.sin(t * 3) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
