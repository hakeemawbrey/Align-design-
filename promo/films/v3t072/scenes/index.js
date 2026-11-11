// v3t072: THE SIGNS AS… v3, "The signs | at a concert." (~57 s vertical, signs3kit social cut, music: lofi · D)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "The signs | *at a concert.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one concert per sign (3.8 s each), pushed to the extreme:
//              ♈ front row, got there yesterday · ♉ came for the music, stayed for the nachos · ♊ sang along, wrong song
//              · ♋ friendship bracelets for the whole stadium · ♌ the band waved at them (it was everyone)
//              · ♍ colour-coded earplugs · ♎ couldn't pick a T-shirt, bought all six · ♏ guessed the singer's sign from one note
//              · ♐ crowd-surfed to the car park · ♑ left before the encore, beat traffic · ♒ loves the opening act's opening act
//              · ♓ slow song, texted their match (sobbing)
//  49.2        "Best night. | *Zero sleep.*"  The twelve fly up into a group photo.
//  52.6        "Aries is already in line | for *next year.*"  (Aries' queue ticket comes back: DAY 1.)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a'

// ── props
const NACHOS = [
  '..Y......Y..',
  '.YYY....YYY.',
  'YYYYY..YYYYY',
  '.YRYYYYYYGY.',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
]
const NACHOS_C = { Y: '#ffd23a', R: RED, G: '#5fd068', W: '#fff4e2' }
const SHIRT = [
  'CC.CC',
  'CCCCC',
  '.CCC.',
  '.CCC.',
]
const PLUG = ['.CC.', 'CCCC', 'CCCC', '.CC.', '.KK.', '.KK.']
const CAR = [
  '...RRRRR....',
  '..RSSRSSR...',
  'RRRRRRRRRRRR',
  'RRRRRRRRRRRY',
  '.KK.....KK..',
]
const CAR_C = { R: '#2fc79a', S: SKYB, Y: GOLD, K: INK }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSHHSHHK',
  'KSHHHHHK',
  'KSSHHHSK',
  'KSSSHSSK',
  'KSSSSSSK',
  'KKKGGKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', H: '#ff4f86', G: '#6b62a8' }

// a paper ticket stub: "IN LINE · DAY n"
function ticket(x, cx, cy, k, text, { rot = -0.06, bg = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const w = 300, h = 150
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(w / 2 - 70, -h / 2 + 8 + i * 24, 6, 12)
  x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('IN LINE', -34, -32)
  x.font = `800 46px ${INTER}`; x.fillText(text, -34, 22)
  x.restore()
}
// a string of friendship-bracelet beads
function beads(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const COLS = [PINK, GOLD, MINT, SKYB, LAV, ORANGE]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2 + t * 0.6
    const bx = Math.cos(a) * 100, by = Math.sin(a) * 60
    x.fillStyle = INK; x.fillRect(bx - 17, by - 17, 34, 34)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(bx - 13, by - 13, 26, 26)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Front row. | Got there *yesterday.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -160 }, hops: [0.6, 1.1, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ticket(x, 790, 880, pop01(t, P.t0 + 0.3, 0.3, 2), 'DAY 2')
      bubble(x, 780, 660, 'FIRST!!', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 54, tail: 'bl' })
      label(x, 790, 1090, 'DOORS: IN 6 HOURS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: RED, color: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Came for the music. | Stayed for *the nachos.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, NACHOS, NACHOS_C, 790, 900, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.04 })
      label(x, 790, 700, 'BAND: ON STAGE', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: LAV, rot: -0.05 })
      label(x, 790, 1080, 'TAURUS: AT THE SNACKS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Sang every word. | *Wrong song.*', mood: lt => lt > 1.5 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [0.7, 1.3],
    front(x, t, lt, P, F) {
      notes(x, t, F.x + 40, F.cy - 120, { n: 4, cell: 7, col: GOLD, seed: 1 })
      bubble(x, 790, 680, 'la la LAAA!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 900, 'NOW PLAYING: | A BALLAD'.split(' | ')[lt > 1.0 ? 1 : 0], pop01(t, P.t0 + 0.7, 0.3, 2), { size: 30, bg: MINT, rot: 0.05 })
      label(x, 790, 1080, 'WRONG SONG', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: RED, color: '#fff4e2', rot: -0.05 })
    } },
  { sign: 'cancer', cap: 'Bracelets for | *the whole stadium.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      beads(x, 790, 820, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      const n = Math.floor(clamp((lt - 0.5) / 1.6) * 40000)
      label(x, 790, 1050, `MADE: ${n.toLocaleString('en-US')}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 820, P.t0 + 1.6, { n: 4, life: 1.5, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'The singer waved. | *At them.* Obviously.', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: { x: -150 }, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'they waved at ME', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 880, 'WAVED AT: 20,000', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 380, 820, P.t0 + 0.9, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Brought earplugs. | *Colour-coded.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [RED, ORANGE, GOLD, '#5fd068', SKYB, LAV]
      COLS.forEach((c, i) => drawBits(x, PLUG, { C: c, K: '#9aa5c4' }, 690 + (i % 3) * 100, 800 + Math.floor(i / 3) * 140, 12 * pop01(t, P.t0 + 0.3 + i * 0.12, 0.3, 2)))
      label(x, 790, 650, 'LOUD · LOUDER · DRUMS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 26, bg: MINT, rot: -0.04 })
      label(x, 790, 1100, 'SPARES: 12', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: "Couldn't pick a shirt. | Bought *all six.*", mood: lt => lt > 1.6 ? 'sparkle' : 'neutral', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [PINK, GOLD, MINT, SKYB, LAV, ORANGE]
      COLS.forEach((c, i) => drawBits(x, SHIRT, { C: c }, 690 + (i % 3) * 100, 800 + Math.floor(i / 3) * 130, 18 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2), { rot: (i % 2 ? 0.08 : -0.08) }))
      bubble(x, 790, 640, 'this one? | or…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1100, 'ALL OF THEM', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05 })
    } },
  { sign: 'scorpio', cap: "Guessed the singer's sign. | *One note.*", mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P, F) {
      notes(x, t, 800, 900, { n: 3, cell: 8, col: '#c97bff', seed: 4 })
      bubble(x, 790, 680, 'hmm.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      label(x, 790, 1000, 'CANCER RISING.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: '#c97bff', color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'CORRECT', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Crowd-surfed. | Ended up *in the car park.*', mood: 'sparkle', star: { x: 150, y: -60 }, hops: [0.4, 0.9, 1.4],
    back(x, t, lt, P) {
      // a sea of little hands under the star
      for (let i = 0; i < 9; i++) { const hx = 330 + i * 70 + 10 * Math.sin(t * 6 + i), hy = 1080 + 14 * Math.sin(t * 8 + i * 1.7); drawBits(x, ['K.K.K', 'KKKKK', '.KKK.', '.KKK.'], { K: '#ffd9b0' }, hx, hy, 9 * pop01(t, P.t0 + 0.1, 0.3, 2)) }
    },
    front(x, t, lt, P) {
      bubble(x, 300, 640, 'wheee!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, tail: 'br' })
      label(x, 310, 880, 'EXIT → CAR PARK', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Left before the encore. | *Beat traffic.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.4))
      drawBits(x, CAR, CAR_C, lerp(680, 820, p), 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'encore? | no thanks.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1100, 'HOME BY 10:02', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: '#2fc79a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: "Loves the opening act's | *opening act.*", mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'you won\'t | know them', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      label(x, 790, 880, 'FANS: 3', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 40, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'ONE IS THEIR MOM', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'pisces', cap: 'Slow song. | Texted *their match.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 800, 900, 20 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.08 })
      bubble(x, 790, 650, 'this song | is US', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 1110, 'FIRST DATE: TUESDAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.05 })
      hearts(x, t, 800, 980, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t072', key: 'D', accent: GOLD, ending: 'callback',
  title: 'The signs | *at a concert.*',
  cameos: CAMEOS,
  group: { cap: 'Best night. | *Zero sleep.*' },
  last: {
    text: 'Aries is already in line | for *next year.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 400, 1150, 260 * k, { mood: 'sparkle', seed: 5, hops: [t - lt + 1.2, t - lt + 2.2] })
      ticket(x, 700, 1150, pop01(t, t - lt + 0.9, 0.3, 2), 'DAY 1', { rot: 0.06 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
