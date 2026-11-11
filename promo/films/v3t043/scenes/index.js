// v3t043: THE SIGNS AS… v3, "The signs at | a job interview." (~57 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs at | a *job interview.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one interview per sign (3.8 s each), each pushed to the extreme:
//              ♈ arrived early: yesterday · ♉ asked about salary, then the snacks · ♊ one question, seven answers
//              · ♋ brought the panel muffins · ♌ walked in, waited for applause · ♍ forty pages of references
//              · ♎ greatest weakness? couldn't pick one · ♏ "any questions?" interviewed them back
//              · ♐ five-year plan: "Nepal, probably" · ♑ sent the thank-you note before the interview
//              · ♒ dress code business, wore a cape · ♓ got the job, cried in the lobby
//  49.2        "Everyone *got hired.*"
//  52.6        callback: "Day one? | Aries *slept there.*" (the check-in tag comes back, Aries asleep under it)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', NAVY = '#3a4a8a'

const MUFFIN = [
  '..PPPPP..',
  '.PPWPPPP.',
  'PPPPPPWPP',
  'PPPPPPPPP',
  '.BBBBBBB.',
  '.BKBKBKB.',
  '..BBBBB..',
]
const MUFFIN_C = { P: PINK, W: '#fff4e2', B: '#e8a24a', K: BROWN }
const CAPE = [
  '..RRRRRRR..',
  '.RRRRRRRRR.',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
  'RRRRR.RRRRR',
  'RRRR...RRRR',
]
const CAPE_C = { R: '#c97bff' }
const ENVELOPE = [
  'WWWWWWWWWWWW',
  'WKWWWWWWWWKW',
  'WWKWWWWWWKWW',
  'WWWKWWWWKWWW',
  'WWWWKRRKWWWW',
  'WWWWWRRWWWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
]
const ENV_C = { W: '#fff4e2', K: '#9aa5c4', R: RED }
const MOUNT = [
  '......W......',
  '.....WWW.....',
  '....WWGWW....',
  '...GGGGGGG...',
  '..GGGGGGGGG..',
  '.GGGGGGGGGGG.',
  'GGGGGGGGGGGGG',
]
const MOUNT_C = { W: '#ffffff', G: '#7d8fc4' }

// a pile of paper that grows page by page
function pile(x, cx, cy, n) {
  for (let i = 0; i < n; i++) {
    const y = cy - i * 9, r = Math.sin(i * 1.7) * 0.06
    x.save(); x.translate(cx + Math.sin(i * 2.3) * 8, y); x.rotate(r)
    x.fillStyle = INK; x.fillRect(-104, -16, 208, 26); x.fillStyle = '#fff4e2'; x.fillRect(-100, -12, 200, 18)
    x.restore()
  }
}

const CHECKIN = (x, cx, cy, k) => label(x, cx, cy, 'CHECK-IN: SUNDAY', k, { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })

const CAMEOS = [
  { sign: 'aries', cap: 'Arrived early. | *Yesterday.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      label(x, 800, 690, 'INTERVIEW: MONDAY', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      CHECKIN(x, 800, 880, pop01(t, P.t0 + 1.0, 0.3, 2.2))
      bubble(x, 800, 1070, 'am i late?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Asked about salary. | Then *the snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'the pay?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 800, 900, 'is lunch free?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1090, 'PRIORITIES', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'One question. | *Seven answers.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      label(x, 800, 680, 'QUESTIONS: 1', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 6)
      label(x, 800, 880, `ANSWERS: ${n}`, pop01(t, P.t0 + 0.7, 0.3, 2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'also, fun fact—', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Brought the panel | *homemade muffins.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, MUFFIN, MUFFIN_C, 700 + i * 110, 820 + (i % 2) * 30, 14 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2.2))
      label(x, 800, 1050, 'HIRED? (CRUMBS)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 4, life: 1.5, spread: 200, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Walked in. | Waited *for applause.*', mood: lt => lt > 1.3 ? 'squint' : 'sparkle', star: { x: -180 }, hops: [0.4],
    front(x, t, lt, P) {
      label(x, 800, 720, 'APPLAUSE?', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: GOLD, rot: 0.05 })
      bubble(x, 800, 960, '…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 60, tail: 'bl' })
      label(x, 800, 1110, 'STILL WAITING', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'References? | *Forty pages.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      pile(x, 800, 1060, Math.floor(clamp((lt - 0.3) / 1.4) * 40))
      label(x, 800, 620, 'p. 40 of 40', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Greatest weakness? | *Couldn’t pick one.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 800, 700, 'too nice?', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 860, 'too fair?', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1060, 'can i get back to you?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: '“Any questions?” | *Interviewed them back.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 820, 940, 190 * k, { mood: lt > 1.2 ? 'wide' : 'neutral', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 780, 680, 'why this company?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 820, 1120, 'QUESTION 12 OF 30', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Five-year plan? | *“Nepal, probably.”*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 800, 860, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 800, 1060, 'PLAN: VIBES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Sent the thank-you note | *before the interview.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, ENVELOPE, ENV_C, 800, 800, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
      label(x, 800, 1020, 'SENT: 8:59', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1120, 'INTERVIEW: 9:00', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Dress code: business. | Wore *a cape.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    back(x, t, lt, P, F) { drawBits(x, CAPE, CAPE_C, F.x + 40, F.cy + 70, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { sy: 1 + 0.05 * Math.sin(t * 6) }) },
    front(x, t, lt, P) {
      label(x, 800, 720, 'BUSINESS', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'it’s a power cape', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Got the job. | *Cried in the lobby.*', mood: 'happy', tears: lt => lt > 0.9 ? 3 : 2, star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 800, 720, 'YOU’RE HIRED!', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: MINT, rot: 0.05 })
      bubble(x, 800, 960, 'i love you all', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      hearts(x, t, 800, 880, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3t043', key: 'E', accent: GOLD, ending: 'callback',
  title: 'The signs at | a *job interview.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone | *got hired.*' },
  last: {
    text: 'Day one? | Aries *slept there.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'aries', 540, 1060, 300 * k, { mood: 'sleepy', seed: 31 })
      CHECKIN(x, 540, 800, pop01(t, t - lt + 0.9, 0.3, 2.2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
