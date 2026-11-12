// r2t0097: star_talk, BELIKE, "Out of their snack? | Zodiacs be like." (~61 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each one's most extreme reaction to the store being out of their snack. Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ went into the back room · ♉ held a vigil at the shelf · ♊ bought six new snacks · ♋ wrote it a goodbye letter
//              · ♌ "do you know who I am?" · ♍ formal complaint, three pages · ♎ can't pick a backup, day two in aisle four
//              · ♏ has a secret stash · ♐ drove to another city · ♑ bought the store, restocked it · ♒ invented a new snack
//              · ♓ cried in aisle four, a stranger hugged them
//  49.2        "One empty shelf. | *Total chaos.*"
//  52.4        LESSON UNLOCKED: "Plans change. So do snacks. | *Try something new.*"  SNACK: SWAPPED
//  58.3        "Plot twist: | the new one’s *better.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a'

function card(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function text(x, s, cx, cy, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
// a crinkly snack bag
const BAG = [
  'KKKKKKKKK',
  'BBBBBBBBB',
  'BBWWWWWBB',
  'BBWYYYWBB',
  'BBWYYYWBB',
  'BBWWWWWBB',
  'BBBBBBBBB',
  'BBBBBBBBB',
  'KKKKKKKKK',
]
const bag = (x, cx, cy, cell, col, o = {}) => drawBits(x, BAG, { K: '#2a2350', B: col, W: CREAM, Y: GOLD }, cx, cy, cell, o)
// an empty store shelf with a little SOLD OUT tag
function shelf(x, cx, cy, k, { tag = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -150, 360, 300); x.fillStyle = '#3a3166'; x.fillRect(-172, -142, 344, 284)
  x.fillStyle = INK; x.fillRect(-180, -10, 360, 18); x.fillRect(-180, 132, 360, 18)
  x.fillStyle = '#9aa5c4'; x.fillRect(-172, -6, 344, 10); x.fillRect(-172, 136, 344, 10)
  if (tag) { x.fillStyle = INK; x.fillRect(-84, 6, 168, 46); x.fillStyle = RED; x.fillRect(-80, 10, 160, 38); text(x, 'SOLD OUT', 0, 30, 24, CREAM, MONO, 700) }
  x.restore()
}
const CANDLE = ['..F..', '.FYF.', '..F..', '.WWW.', '.WWW.', '.WWW.', '.WWW.', 'KKKKK']
const LETTER = ['KKKKKKKKKKK', 'KCCCCCCCCCK', 'KCKCCCCCKCK', 'KCCKCCCKCCK', 'KCCCKCKCCCK', 'KCCCCKCCCCK', 'KCCCCCCCCCK', 'KKKKKKKKKKK']
const CAR = [
  '...RRRRR.....',
  '..RSSRSSR....',
  '.RRSSRSSRRRR.',
  'RRRRRRRRRRRRR',
  'RRRRRRRRRRRRR',
  '.KK.......KK.',
  '.KK.......KK.',
]
const KEY = ['.YYY......', 'Y...Y.....', 'Y...YYYYYY', 'Y...Y..Y.Y', '.YYY......']
const FLASK = ['..KK..', '..GG..', '..GG..', '.GGGG.', 'GGGGGG', 'GgGGgG', 'GGGGGG']

const CAMEOS = [
  { sign: 'aries', cap: 'Checked the back room. | *Personally.*', mood: 'sparkle', star: { x: -150 }, hops: [0.5, 1.0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      card(x, 800, 880, 230, 360, '#5a4a8a', { k })
      if (k > 0.5) { x.fillStyle = INK; x.fillRect(745, 880, 16, 16); label(x, 800, 780, 'STAFF ONLY', 1, { size: 26, bg: RED, color: CREAM, rot: 0, font: MONO, weight: 700 }) }
      bubble(x, 520, 640, 'I’ll look | myself', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Held a vigil | *at the shelf.*', mood: lt => lt > 0.8 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      shelf(x, 800, 820, pop01(t, P.t0 + 0.15, 0.35, 2))
      drawBits(x, CANDLE, { F: ORANGE, Y: GOLD, W: CREAM, K: INK }, 720, 1070, 12 * pop01(t, P.t0 + 0.8, 0.3, 2), { sx: 1 + 0.05 * Math.sin(t * 9) })
      drawBits(x, CANDLE, { F: ORANGE, Y: GOLD, W: CREAM, K: INK }, 880, 1070, 12 * pop01(t, P.t0 + 1.0, 0.3, 2), { sx: 1 + 0.05 * Math.sin(t * 8 + 1) })
      label(x, 800, 1150, 'GONE, NOT FORGOTTEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 26, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Bought six new snacks. | *Forgot the old one.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const cols = [PINK, SKYB, MINT, ORANGE, LAV, RED]
      cols.forEach((c, i) => bag(x, 700 + (i % 3) * 100, 1010 - Math.floor(i / 3) * 140, 13 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2.2), c, { rot: (i - 2.5) * 0.12 }))
      bubble(x, 800, 640, 'what snack?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Wrote it | *a goodbye letter.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, LETTER, { K: INK, C: CREAM }, 800, 860, 26 * k, { rot: -0.05 })
      if (k > 0.8) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 800, 900, 9, { rot: -0.05 })
      label(x, 800, 1090, '“DEAR CRUNCHY…”', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.03 })
    } },
  { sign: 'leo', cap: 'Asked the clerk: | *“Do you know me?”*', mood: 'sparkle', star: { x: -170 }, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 820, 980, 190 * k, { mood: lt > 1.4 ? 'squint' : 'neutral', look: [-1, 0], seed: 13, glyph: false })
      label(x, 820, 820, 'CLERK', k, { size: 26, bg: BONE, rot: 0, font: MONO, weight: 700 })
      bubble(x, 820, 660, 'nope.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Filed a complaint. | *Three pages.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let p = 2; p >= 0; p--) {
        const k = pop01(t, P.t0 + 0.2 + (2 - p) * 0.3, 0.3, 2)
        card(x, 790 + p * 20, 860 - p * 20, 290, 360, CREAM, { k, rot: 0.03 * (p - 1) })
        if (k > 0.5 && p === 0) { x.save(); x.translate(790, 860); text(x, 'RE: AISLE 4', 0, -140, 30, INK, MONO, 700); for (let i = 0; i < 7; i++) { x.fillStyle = '#9aa5c4'; x.fillRect(-120, -90 + i * 34, 240 - (i * 41) % 90, 12) } x.restore() }
      }
      label(x, 790, 1110, 'CC: MANAGER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a backup. | *Still in aisle four.*', mood: 'wide', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: 0, y: 30, s: 260 },
    front(x, t, lt, P) {
      bag(x, 300, 820, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), PINK, { rot: Math.sin(t * 3) * 0.15 })
      bag(x, 780, 820, 14 * pop01(t, P.t0 + 0.35, 0.3, 2), SKYB, { rot: -Math.sin(t * 3) * 0.15 })
      label(x, 540, 640, 'DAY 2', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Calm. They hid three | *last week.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2), open = ease.outCubic(prog(lt, 0.7, 1.1))
      card(x, 800, 900, 320, 260, WOOD, { k })
      if (k > 0.5) {
        x.fillStyle = '#5b2e1a'; x.fillRect(660, 790, 280, 220)
        for (let i = 0; i < 3; i++) bag(x, 720 + i * 80, 920 - open * 40, 11, [RED, RED, RED][i])
        x.fillStyle = INK; x.fillRect(650, 780 + open * 250 - 4, 300, 8)
        x.fillStyle = WOOD; x.fillRect(654, 780 + open * 250 - 240 * (1 - open), 292, 240 * (1 - open))
      }
      label(x, 800, 660, 'EMERGENCY STASH', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Drove to | *another city.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const drive = ease.inOutCubic(prog(lt, 0.5, 2.0))
      drawBits(x, CAR, { R: ORANGE, S: SKYB, K: INK }, lerp(600, 800, drive), 960 + Math.sin(t * 14) * 3, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'ROAD TRIP: SNACK', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Bought the store. | *Restocked it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      shelf(x, 800, 840, k, { tag: lt < 1.0 })
      if (lt > 1.0) for (let i = 0; i < 8; i++) bag(x, 680 + (i % 4) * 80, 790 + Math.floor(i / 4) * 142 - 10, 7.5 * pop01(t, P.t0 + 1.0 * 1.29 + i * 0.05, 0.2, 2), [RED, ORANGE][i % 2])
      label(x, 800, 1100, 'NEW OWNER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04 })
      drawBits(x, KEY, { Y: GOLD }, 520, 680, 10 * pop01(t, P.t0 + 1.7, 0.3, 2), { rot: -0.3 })
    } },
  { sign: 'aquarius', cap: 'Invented | *their own snack.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, FLASK, { K: INK, G: MINT, g: '#c8ffe0' }, 720, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 10) * 0.08 * (lt < 1.2 ? 1 : 0) })
      if (lt > 1.2) bag(x, 870, 900, 15, '#4ad6c0')
      sparkles(x, t, 870, 900, P.t0 + 1.2 * 1.29, 7, 150, 0.4)
      label(x, 800, 1110, 'FLAVOR: “BLUE”', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried in aisle four. | A stranger *hugged them.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 780, 1020, 180 * k, { mood: 'heart', look: [-1, 0], seed: 19, glyph: false })
      x.fillStyle = 'rgba(143,227,255,0.6)'; const pw = 220 * ease.outCubic(prog(lt, 0.6, 2.0)); x.beginPath(); x.ellipse(400, 1130, pw, 24, 0, 0, Math.PI * 2); x.fill()
      hearts(x, t, 600, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0097', key: 'E', accent: ORANGE, ending: 'lesson',
  title: 'Out of their snack? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One empty shelf. | *Total chaos.*' },
  lesson: { text: 'Plans change. So do snacks. | *Try something new.*', chip: 'SNACK: SWAPPED' },
  last: {
    text: 'Plot twist: | the new one’s *better.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      bag(x, 540, 700, 20 * k, MINT, { rot: 0.06 * Math.sin(t * 2) })
      sparkles(x, t, 540, 700, t - lt + 0.9, 8, 200, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
