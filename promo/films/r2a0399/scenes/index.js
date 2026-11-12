// r2a0399: star_advice ADVICE ROLLCALL, "How to host | each sign." (signs3kit social cut, music: lofi · E). Ending: lesson.
//   ♈ give them a job · ♉ feed them first · ♊ seat them by their best match · ♋ let them help in the kitchen · ♌ toast them
//   (literally) · ♍ coasters out · ♎ decide the menu for them · ♏ a cosy corner · ♐ plan a surprise outing · ♑ start on
//   time · ♒ invite their unusual friend · ♓ put on their comfort film
//   group: "Full house. | Full hearts."  lesson: "Everyone feels at home | when you notice them."  last: "Leftovers? | Taurus has them."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffcf6a', RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
const PLATE = ['...RRGG...', '..RRRGGG..', 'WWWWWWWWWW', '.WWWWWWWW.', '..WWWWWW..']
const PLATE_C = { R: '#e8a24a', G: '#5fd068', W: '#ffffff' }
const MITT = ['.RRR....', 'RRRRR...', 'RRRRR.RR', 'RRRRRRRR', 'RRRRRRR.', 'RRRRRR..', 'WWWWWW..']
const TOAST = ['.TTTTTT.', 'TTTTTTTT', 'TBBBBBBT', 'TBBBBBBT', 'TBBBBBBT', 'TBBBBBBT', 'TTTTTTTT']
const COASTER = ['.CCCCCC.', 'CCCCCCCC', 'CWWWWWWC', 'CCCCCCCC', '.CCCCCC.']
const CHAIR = ['.AAAAAA.', 'AAAAAAAA', 'AACCCCAA', 'AACCCCAA', 'AAAAAAAA', 'K......K']
const LAMP = ['.YYYY.', 'YYYYYY', '..KK..', '..KK..', '..KK..', '.KKKK.']
const PIN = ['.RRR.', 'RRWRR', 'RRRRR', '.RRR.', '..R..']
const CLOCK = ['..KKKKK..', '.KWWWWWK.', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWWWWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']
const TV = ['K........K', '.K......K.', '..K....K..', 'KKKKKKKKKK', 'KSSSSSSSSK', 'KSSPPSSSSK', 'KSSPPPSSSK', 'KSSSSSSSSK', 'KKKKKKKKKK', '..K....K..']

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Give them a job. | *Instantly happy.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      L(x, 800, 800, 'HEAD OF ICE', pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.05, 48)
      bubble(x, 800, 1000, 'on it!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Feed them first. | *Then say hi.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 800, 920, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 720, 'WELCOME PLATE', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.04, 34)
      hearts(x, t, 370, 800, P.t0 + 1.2, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Seat them by | *their best match.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 960, 170 * k, { mood: 'sparkle', look: [-1, 0], seed: 13, glyph: false })
      L(x, 800, 690, 'COMPATIBLE: VERY', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 32)
      bubble(x, 640, 800, 'so anyway—', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Let them help | *in the kitchen.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, MITT, { R: PINK, W: '#ffffff' }, F.x + 170, F.cy + 10, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      L(x, 800, 720, 'SOUS-CHEF: CANCER', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, -0.04, 30)
      L(x, 800, 1080, 'MADE EXTRA, OBVIOUSLY', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: 'leo', cap: 'Make a toast. | *Literally, to them.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, TOAST, { T: '#c98f2a', B: '#f0c27a' }, 800, 900, 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
      L(x, 800, 700, 'TO LEO!', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.05, 48)
      sparkles(x, t, 800, 900, P.t0 + 1.1, 8, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Coasters out. | *They’ll notice.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, COASTER, { C: '#5fa84a', W: '#d8f08a' }, 800, 1000 - i * 34, 18 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      L(x, 800, 740, 'NOTICED: YES', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 38)
    } },
  { sign: 'libra', cap: 'Pick the menu | *for them.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 880, 280, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 }, () => {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -130)
        x.font = `700 22px ${MONO}`; ['pasta', 'salad', 'dessert'].forEach((s, i) => x.fillText(s, 0, -60 + i * 60))
        x.fillStyle = PINK; x.font = `700 22px ${MONO}`; x.fillText('(decided ♡)', 0, 120)
      })
      bubble(x, 790, 1120, 'oh thank goodness', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Save them | *a cosy corner.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { A: '#5b2e8a', C: '#c97bff', K: INK }, 760, 1000, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, LAMP, { Y: '#ffe36a', K: INK }, 895, 900, 18 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 720, 'VIEW OF THE DOOR', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#c97bff', -0.04, 30, CREAM)
    } },
  { sign: 'sagittarius', cap: 'Plan a surprise | *field trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      card(x, 800, 880, 300, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.04, bg: '#d8f0c8' }, () => {
        x.strokeStyle = '#5fa84a'; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-110, 80); x.bezierCurveTo(-40, -60, 40, 80, 100, -60); x.stroke(); x.setLineDash([])
        drawBits(x, PIN, { R: RED, W: '#ffffff' }, 100, -80, 10)
      })
      L(x, 800, 1090, 'DESSERT: ON A HILL', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Start on time. | *They’ll adore you.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CLOCK, { K: INK, W: BONE }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, '7:00 SHARP', pop01(t, P.t0 + 0.9, 0.3, 2.4), MINT, -0.04, 44)
    } },
  { sign: 'aquarius', cap: 'Invite their | *unusual friend too.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 300, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 }, () => {
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+1', 0, -50)
        x.font = `700 22px ${MONO}`; x.fillText('builds tiny robots', 0, 20); x.fillText('very welcome', 0, 64)
      })
      bubble(x, 790, 1090, 'you get us!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Put on | *their comfort film.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TV, { K: INK, S: SKYB, P: PINK }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, 'TISSUES: PROVIDED', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0399', key: 'E', accent: ACC, ending: 'lesson',
  title: 'How to host | *each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Full house. | *Full hearts.*' },
  lesson: { text: 'Everyone feels at home | when you *notice them.*', chip: 'STATUS: GREAT HOST' },
  last: {
    text: 'Leftovers? | *Taurus has them.*',
    draw(x, t, lt) {
      const t0 = t - lt
      for (let i = 0; i < 3; i++) drawBits(x, PLATE, PLATE_C, 300, 790 - i * 44, 20 * pop01(t, t0 + 0.6 + i * 0.2, 0.35, 2))
      L(x, 640, 740, 'SAVED FOR LATER', pop01(t, t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
