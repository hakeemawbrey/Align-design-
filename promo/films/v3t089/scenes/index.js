// v3t089: THE SIGNS AS… v3, "The signs | first day of school." (~57 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "First day | *of school.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one first day per sign (3.8 s each), each pushed to the extreme:
//              ♈ ran for class president by 9 a.m. · ♉ asked when lunch is, at 8:01 · ♊ passed a note to everyone
//              · ♋ adopted the class hamster · ♌ introduced themself for ten minutes · ♍ labelled their pencils alphabetically
//              · ♎ sat between two groups, joined both · ♏ already knew the seating chart · ♐ asked "but why?" forty times
//              · ♑ brought a briefcase, age seven · ♒ corrected the teacher, was right · ♓ got a gold star, cried
//  49.2        "Class of | *chaos.*"
//  52.6        callback: "Day two? | Aries *re-elected.*" with the VOTE ARIES badge back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', CREAM = '#fff4e2', GREEN = '#5fd068'

const HAMSTER = [
  '.OO......OO.',
  'OPPO....OPPO',
  'OOOOOOOOOOOO',
  'OOKOOOOOOKOO',
  'OOOOOPPOOOOO',
  'OCCCOOOOCCCO',
  'OOCCCCCCCCOO',
  '.OOOOOOOOOO.',
  '..OO....OO..',
]
const HAMSTER_C = { O: '#e9b26a', P: PINK, K: INK, C: CREAM }
const PENCIL = ['P', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'W', 'K']
const CASE = [
  '....KKKK....',
  '....K..K....',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBGGBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
]
const CASE_C = { K: INK, B: BROWN, G: GOLD }
const GSTAR = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY']

function badge(x, cx, cy, k, text = 'VOTE ARIES') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 116, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const [a, b] = text.split(' '); x.fillText(a, 0, -20); x.fillText(b, 0, 22)
  x.restore()
}
function seating(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = '#2a2350'; x.fillRect(-142, -162, 284, 324)
  x.fillStyle = CREAM; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText('SEATING', 0, -126)
  const C = ['#f0603a', '#e9b24a', '#f2cf4a', '#3fb6f0', '#f39a3a', '#ef5c94', '#e163d6', '#e23d66', '#a35cf0', '#2fc79a', '#38c4ec', '#7c74f0']
  for (let i = 0; i < 12; i++) { const px = -100 + (i % 3) * 100, py = -80 + Math.floor(i / 3) * 60; x.fillStyle = INK; x.fillRect(px - 32, py - 18, 64, 40); x.fillStyle = C[i]; x.fillRect(px - 28, py - 14, 56, 32) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ran for class president. | *By 9 a.m.*', mood: 'sparkle', star: { x: -170 }, hops: [0.3, 0.7, 1.1],
    front(x, t, lt, P) {
      badge(x, 800, 860, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 1100, 'VOTES: 1 (MINE)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Asked when lunch is. | *At 8:01.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'is it lunch yet?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 880, '8:01 AM', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 56, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'LUNCH: 12:30', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Passed a note. | *To everyone.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.4) * 9)
      for (let i = 0; i < n; i++) { x.save(); x.translate(660 + (i % 3) * 140, 680 + Math.floor(i / 3) * 140); x.rotate(Math.sin(i * 2.1) * 0.4); x.fillStyle = INK; x.fillRect(-46, -34, 92, 68); x.fillStyle = CREAM; x.fillRect(-40, -28, 80, 56); x.fillStyle = PINK; x.fillRect(-10, -8, 20, 16); x.restore() }
      label(x, 800, 1130, 'NOTE 9 OF 26', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Adopted | *the class hamster.*', mood: 'heart', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, HAMSTER, HAMSTER_C, 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 680, 'HIS NAME IS NUGGET', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 820, P.t0 + 1.3, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Introduced themself | *for ten minutes.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 13)
      label(x, 800, 700, `FUN FACT #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 880, 'my sign? LEO.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1090, 'CLASS: ASLEEP', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Labelled their pencils. | *Alphabetically.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const L = 'ABCDE'
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2); drawBits(x, PENCIL, { P: PINK, Y: '#ffd23a', W: '#f2d49b', K: INK }, 680 + i * 60, 870, 24 * k); label(x, 680 + i * 60, 1010, L[i], k, { size: 30, bg: BONE, rot: 0, font: MONO, weight: 700 }) }
      label(x, 790, 680, 'DAY 1. ORDERED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Sat between two groups. | *Joined both.*', mood: 'heart', star: { x: -40, y: -20, s: 250 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'aries', 260, 960, 170 * k, { mood: 'happy', look: [1, 0], seed: 31, glyph: false }); signChar(x, t, 'virgo', 820, 960, 170 * k, { mood: 'happy', look: [-1, 0], seed: 32, glyph: false }) }
      label(x, 540, 670, 'PEACE TREATY: SIGNED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 820, P.t0 + 1.4, { n: 5, life: 1.6, spread: 300, cell: 6, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'Already knew | *the seating chart.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      seating(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 380, 600, 'back row. left.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 800, 1110, 'TEACHER: CONFUSED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Asked “but why?” | *Forty times.*', mood: lt => Math.floor(lt * 3) % 2 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [0.5, 1.1, 1.7],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.6) * 6)
      for (let i = 0; i < n; i++) bubble(x, 690 + (i % 2) * 190, 660 + Math.floor(i / 2) * 150, 'but why?', 1, { size: 30, tail: i % 2 ? 'br' : 'bl' })
      label(x, 800, 1130, 'WHY COUNT: 40', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Brought a briefcase. | *Age seven.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 800, 900, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 690, 'CAREER PLAN: ✓', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Corrected the teacher. | *Was right.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 690, 'actually…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 900, 'TEXTBOOK: OUTDATED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'A+ (GRUDGING)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Got a gold star. | *Cried.*', mood: lt => lt < 0.8 ? 'happy' : 'heart', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GSTAR, { Y: GOLD }, 800, 870, 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.1 })
      sparkles(x, t, 800, 870, P.t0 + 0.8, 7, 170, 0.2)
      label(x, 800, 1100, 'FRAMING IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t089', key: 'F', accent: GOLD, ending: 'callback',
  title: 'First day | *of school.*',
  cameos: CAMEOS,
  group: { cap: 'Class of | *chaos.*' },
  last: {
    text: 'Day two? | Aries *re-elected.*',
    draw(x, t, lt) {
      badge(x, 540, 1150, 1.3 * pop01(t, t - lt + 0.4, 0.4, 2))
      sparkles(x, t, 540, 1150, t - lt + 0.9, 8, 230, 0.3)
      label(x, 540, 1400, 'UNOPPOSED', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
