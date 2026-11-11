// v3t085: THE SIGNS AS… v3, "The signs | at the dentist." (~54 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "The signs | *at the dentist.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one check-up per sign (3.8 s each), each pushed to the extreme:
//              ♈ opened wide before saying hi · ♉ asked if the chair reclines further · ♊ kept talking with the mirror in
//              · ♋ held the dentist's hand the whole time · ♌ asked for teeth that glow · ♍ flossed for an hour before the cleaning
//              · ♎ the whole appointment picking a toothbrush · ♏ a cavity, taken personally · ♐ rescheduled eleven times
//              · ♑ negotiated the bill · ♒ pitched the dentist a better chair · ♓ cried at the lollipop, happy tears
//  49.2        group ending: "Six months later: | “I *floss* daily.”" with one big shiny tooth over the photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', CREAM = '#fff4e2', TEAL = '#2fc79a'

const TOOTH = [
  '.WWWW.WWWW.',
  'WWWWWWWWWWW',
  'WWHWWWWWWWW',
  'WWHWWWWWWWW',
  'WWWWWWWWWWW',
  'WWWWWWWWWWW',
  '.WWWWWWWWW.',
  '.WWWW.WWWW.',
  '.WWW...WWW.',
  '..WW...WW..',
]
const TOOTH_C = { W: '#ffffff', H: SKYB }
const BRUSH = [
  'B.B.B.',
  'BBBBBB',
  'HHHHHH',
  '..HH..',
  '..HH..',
  '..HH..',
  '..HH..',
  '..HH..',
  '..HH..',
  '..HH..',
]
const LOLLY = [
  '..PPPP..',
  '.PWPPPP.',
  'PPPWPPPP',
  'PPPPWPPP',
  'PPPPPWPP',
  '.PPPPPP.',
  '..PPPP..',
  '...WW...',
  '...WW...',
  '...WW...',
  '...WW...',
]
const LOLLY_C = { P: PINK, W: CREAM }
const CHAIR = [
  '...........KK',
  '..........KAA',
  '.........KAA.',
  '........KAA..',
  'AAAAAAAAAAA..',
  'AAAAAAAAAAA..',
  '.....KK......',
  '.....KK......',
  '...KKKKKK....',
]
const CHAIR_C = { K: '#6b62a8', A: TEAL }

// a small calendar where the date keeps getting crossed out
function cal(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -160, 300, 320)
  x.fillStyle = CREAM; x.fillRect(-142, -152, 284, 304)
  x.fillStyle = RED; x.fillRect(-142, -152, 284, 56)
  x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DENTIST', 0, -124)
  const n = Math.floor(clamp((lt - 0.3) / 1.5) * 11)
  for (let d = 0; d < 12; d++) {
    const c = d % 4, r = Math.floor(d / 4), px = -105 + c * 70, py = -50 + r * 70
    x.fillStyle = '#b9b0a0'; x.font = `700 26px ${MONO}`; x.fillText(String(d * 3 + 2), px, py)
    if (d < n) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(px - 22, py - 20); x.lineTo(px + 22, py + 20); x.moveTo(px + 22, py - 20); x.lineTo(px - 22, py + 20); x.stroke() }
  }
  x.restore()
}
// a receipt with a line that keeps getting knocked down
function receipt(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = CREAM; x.fillRect(-112, -172, 224, 344)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BILL', 0, -140)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-90, -100 + i * 32, 120 + (i % 2) * 40, 10)
  const disc = ['-5%', '-10%', '-15%', '-20%']
  const n = Math.floor(clamp((lt - 0.5) / 1.4) * 4)
  x.font = `700 28px ${MONO}`
  for (let i = 0; i < n; i++) { x.fillStyle = TEAL; x.fillText(disc[i], 40, 40 + i * 32) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Opened wide | *before saying hi.*', mood: 'wide', star: { x: -170 }, hops: [0.2, 0.5],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'AAAAH', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 52, tail: 'bl' })
      drawBits(x, CHAIR, CHAIR_C, 800, 950, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 800, 1130, 'DENTIST: NOT IN YET', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Asked if the chair | *reclines further.*', mood: 'sleepy', star: { x: -40, y: -60, s: 260 },
    back(x, t, lt, P) { drawBits(x, CHAIR, CHAIR_C, 540, 980, 40 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'blanket?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 540, 1170, 'NAP: BOOKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Kept talking | *with the mirror in.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'anyway so mmff', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 870, 'and then mff mff', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1070, 'MOUTH: STILL OPEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Held the dentist’s hand. | *The whole time.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 790, 960, 230 * k, { mood: lt > 1.2 ? 'squint' : 'neutral', look: [-1, 0], seed: 19, glyph: false })
      x.fillStyle = INK; x.fillRect(560, 990, 110, 30); x.fillStyle = '#3fb6f0'; x.fillRect(566, 996, 98, 18)
      label(x, 790, 690, 'MINUTE 40', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Asked for teeth | *that glow.*', mood: 'sparkle', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, TOOTH, TOOTH_C, 800, 870, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      sparkles(x, t, 800, 870, P.t0 + 1.0, 8, 190, 0.3)
      sparkles(x, t, 800, 870, P.t0 + 1.6, 6, 150, 1.1)
      label(x, 800, 1120, 'SHADE: SPOTLIGHT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Flossed for an hour. | *Before* the cleaning.', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.strokeStyle = CREAM; x.lineWidth = 6; x.beginPath(); for (let i = 0; i <= 30; i++) { const a = i / 30; const px = 660 + a * 280, py = 860 + Math.sin(a * 12 + t * 6) * 60 * k; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
      label(x, 800, 690, 'FLOSS USED: 40 M', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'nothing to clean?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Whole appointment: | *picking a toothbrush.*', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const C = [PINK, MINT, SKYB]
      for (let i = 0; i < 3; i++) drawBits(x, BRUSH, { B: CREAM, H: C[i] }, 700 + i * 100, 880 + (Math.floor(lt * 2.5) % 3 === i ? -40 : 0), 15 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      label(x, 800, 1110, 'STILL DECIDING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'One cavity. | Took it *personally.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TOOTH, { W: '#ffffff', H: '#3a2418' }, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, 'who did this.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1100, 'GRUDGE: SAVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Rescheduled. | *Eleven times.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P) {
      cal(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 800, 1110, 'NEW DATE: ???', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Negotiated | *the bill.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      receipt(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 800, 1110, 'LOYALTY DISCOUNT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Pitched the dentist | *a better chair.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { K: '#6b62a8', A: '#38c4ec' }, 800, 900, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, ['.Y.Y.', 'YYYYY', '.Y.Y.'], { Y: GOLD }, 900, 790, 12 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 800, 690, 'PROTOTYPE v2', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1110, 'NOW WITH WINGS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Got a lollipop. | *Happy tears.*', mood: lt => lt < 0.8 ? 'happy' : 'heart', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LOLLY, LOLLY_C, 800, 870, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.15 })
      label(x, 800, 1110, 'BEST DAY EVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 760, P.t0 + 1.2, { n: 4, life: 1.5, spread: 120, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3t085', key: 'G', accent: SKYB, ending: 'group',
  title: 'The signs | *at the dentist.*',
  cameos: CAMEOS,
  group: {
    cap: 'Six months later: | “I *floss* daily.”',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.4, 0.4, 2)
      drawBits(x, TOOTH, TOOTH_C, 540, 690, 17 * k, { rot: 0.06 * Math.sin(t * 2) })
      sparkles(x, t, 540, 690, t - lt + 1.8, 7, 120, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
