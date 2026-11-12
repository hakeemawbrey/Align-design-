// r2t0365: star_talk, BE LIKE (twelve signs), "First apartment | be like." (~56 s vertical, signs3kit social cut, music: lofi · F)
// Batch topic: "Zodiacs getting their own place | be like." Twelve signs in zodiac order, each the most extreme version of
// itself in a first place of their own. Ending: callback.
//   ♈ moved in in one afternoon · ♉ bought the couch before the bed · ♊ every wall a different colour
//   · ♋ housewarming: cooked for forty · ♌ one room is just mirrors · ♍ labelled the label maker
//   · ♎ moved the couch eleven times · ♏ blackout curtains in every room · ♐ signed the lease, booked a trip
//   · ♑ a spreadsheet for the electric bill · ♒ no sofa, an indoor hammock · ♓ cried at the empty room
//  49.2  "New keys. | *Same chaos.*"
//  52.6  callback: "The couch moved | *one more time.*" (the couch slides back in)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const ACC = '#ffc27a', GREY = '#9aa5c4', RED = '#ff6b5a'
const M = { font: MONO, weight: 700 }
const ST = { x: -170 }
const txt = (x, s, X, Y, font, col, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const COUCH = [
  '.CCCCCCCCCCCCCC.',
  'CCCCCCCCCCCCCCCC',
  'CCCCCCCCCCCCCCCC',
  'AACCCCCCCCCCCCAA',
  'AAPPPPPPPPPPPPAA',
  'AAPPPPPPPPPPPPAA',
  'AAAAAAAAAAAAAAAA',
  '.K............K.',
]
const COUCH_C = { C: '#5fb8a8', A: '#4a9a8c', P: '#7fd1c7', K: INK }
const BOX = [
  'TTTTTTTTTT',
  'TTTTYYTTTT',
  'TTTTYYTTTT',
  'TTTTTTTTTT',
  'TTTTTTTTTT',
  'TTTTTTTTTT',
]
const POT = [
  '..S..S..S...',
  '...S..S..S..',
  'KKKKKKKKKKKK',
  'KGGGGGGGGGGK',
  'KGGGGGGGGGGK',
  'KGGGGGGGGGGK',
  '.KGGGGGGGGK.',
  '..KKKKKKKK..',
]
const POT_C = { K: INK, G: '#9aa5c4', S: '#ffffff' }
/** a mirror: a gold frame and a shine streak */
function mirror(x, cx, cy, w, h, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28)
  x.fillStyle = GOLD; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = '#bfe6ff'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.moveTo(-w / 2 + 10, h / 2 - 20); x.lineTo(-w / 2 + 40, h / 2 - 20); x.lineTo(w / 2 - 10, -h / 2 + 30); x.lineTo(w / 2 - 10, -h / 2 + 6); x.closePath(); x.fill()
  x.restore()
}
/** a spreadsheet: a grid with a highlighted total */
function sheet(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-152, -132, 320, 280)
  x.fillStyle = INK; x.fillRect(-160, -140, 320, 280); x.fillStyle = BONE; x.fillRect(-154, -134, 308, 268)
  x.fillStyle = '#7fd1c7'; x.fillRect(-154, -134, 308, 48); txt(x, 'POWER BILL', 0, -110, `700 26px ${MONO}`, INK)
  x.strokeStyle = GREY; x.lineWidth = 2
  for (let i = 1; i < 5; i++) { x.beginPath(); x.moveTo(-154, -86 + i * 44); x.lineTo(154, -86 + i * 44); x.stroke() }
  for (let j = 1; j < 3; j++) { x.beginPath(); x.moveTo(-154 + j * 103, -86); x.lineTo(-154 + j * 103, 134); x.stroke() }
  ;['LAMP', 'FRIDGE', 'CHARGER', 'TOTAL'].forEach((s, i) => txt(x, s, -144, -64 + i * 44, `700 20px ${MONO}`, INK, 'left'))
  x.fillStyle = GOLD; x.fillRect(-50, 46, 202, 40)
  txt(x, 'TAB 4 OF 9', 50, 112, `700 20px ${MONO}`, '#3a3260')
  x.restore()
}
/** a hammock slung between two hooks */
function hammock(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(Math.sin(t * 1.6) * 0.04)
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(-170, -60); x.quadraticCurveTo(0, 120, 170, -60); x.stroke()
  x.strokeStyle = '#ff9a4a'; x.lineWidth = 8; x.beginPath(); x.moveTo(-170, -60); x.quadraticCurveTo(0, 120, 170, -60); x.stroke()
  x.fillStyle = INK; x.fillRect(-182, -76, 24, 24); x.fillRect(158, -76, 24, 24)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Moved in | *in one afternoon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      const gone = Math.floor(ease.outCubic(prog(lt, 0.3, 1.3)) * 4)
      for (let i = gone; i < 4; i++) drawBits(x, BOX, { T: '#c98f4a', Y: '#e8c88a' }, 720 + (i % 2) * 150, 1000 - Math.floor(i / 2) * 110, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, `BOXES LEFT: ${4 - gone}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: RED, color: BONE, rot: -0.04, ...M })
      if (gone >= 4) label(x, 790, 1000, 'DONE BY 2PM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: 'taurus', cap: 'Bought the couch | *before the bed.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, COUCH, { ...COUCH_C, C: '#c98f6a', A: '#a8724e', P: '#e0a98a' }, 790, 930, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'BED: LATER', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, ...M })
    } },
  { sign: 'gemini', cap: 'Every wall | *a different colour.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = ['#ff6b5a', '#ffd23a', '#5fd068', '#6fc3ff', '#c97bff', '#ff8fb1']
      cols.forEach((c, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2)
        if (k <= 0.01) return
        x.save(); x.translate(690 + (i % 3) * 100, 800 + Math.floor(i / 3) * 140); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-46, -56, 92, 112); x.fillStyle = c; x.fillRect(-40, -50, 80, 100); x.restore()
      })
      label(x, 790, 1120, 'THEME: YES', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'cancer', cap: 'Housewarming? | *Cooked for forty.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'GUESTS: 6', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: SKYB, rot: 0.04, ...M })
      label(x, 790, 1120, 'PORTIONS: 40', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, ...M })
    } },
  { sign: 'leo', cap: 'One whole room: | *just mirrors.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mirror(x, 690, 830, 110, 220, pop01(t, P.t0 + 0.2, 0.3, 2))
      mirror(x, 820, 800, 110, 260, pop01(t, P.t0 + 0.35, 0.3, 2))
      mirror(x, 930, 850, 80, 180, pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 800, 1110, 'THE GALLERY (OF ME)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, ...M })
      sparkles(x, t, 810, 820, P.t0 + 0.9, 6, 180, 0.2, [GOLD, BONE, '#ffb34a'])
    } },
  { sign: 'virgo', cap: 'Labelled | *the label maker.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 800, 660, 'SPOONS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: BONE, rot: -0.06, ...M })
      label(x, 720, 780, 'SMALL SPOONS', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: BONE, rot: 0.05, ...M })
      label(x, 850, 880, 'SPARE LABELS', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: BONE, rot: -0.03, ...M })
      label(x, 790, 1040, 'LABEL MAKER', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 44, bg: MINT, rot: 0.04, ...M })
    } },
  { sign: 'libra', cap: 'Moved the couch | *eleven times.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(11, 1 + Math.floor(lt * 5))
      const slide = Math.sin(lt * 9) * 60 * (lt < 2 ? 1 : 0)
      drawBits(x, COUCH, COUCH_C, 790 + slide, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, `LAYOUT #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: PINK, rot: 0.04, ...M })
      label(x, 790, 1120, 'VIBE: ALMOST', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'scorpio', cap: 'Blackout curtains. | *Every room.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const close = ease.inOutCubic(prog(lt, 0.4, 1.2))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -180, 300, 360); x.fillStyle = '#ffe9a8'; x.fillRect(-140, -170, 280, 340)
        x.fillStyle = '#3a2350'; x.fillRect(-140, -170, 140 * close, 340); x.fillRect(140 - 140 * close, -170, 140 * close, 340)
        x.fillStyle = INK; x.fillRect(-170, -196, 340, 20)
        x.restore()
      }
      label(x, 800, 1120, 'SUNLIGHT: DENIED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: '#c97bff', color: BONE, rot: -0.04, ...M })
    } },
  { sign: 'sagittarius', cap: 'Signed the lease. | *Booked a trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      label(x, 790, 680, 'KEYS: RECEIVED', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: MINT, rot: -0.04, ...M })
      bubble(x, 790, 900, 'brb. | 3 weeks.', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 60, col: BONE, tail: 'bl' })
      label(x, 790, 1120, 'PLANTS: ON THEIR OWN', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: 'capricorn', cap: 'A spreadsheet | *for the power bill.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) { sheet(x, 770, 870, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2)) } },
  { sign: 'aquarius', cap: 'Sofa? No. | *Indoor hammock.*', mood: lt => lt > 1.0 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      hammock(x, 790, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 660, 'FURNITURE: OPTIONAL', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, ...M })
      label(x, 790, 1110, 'LIVING ROOM: COMPATIBLE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'pisces', cap: 'Cried at | *the empty room.*', mood: 'wide', look: [1, 0], star: ST, tears: 3,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'it’s just | so MINE', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 56, col: BONE, tail: 'bl' })
      hearts(x, t, 790, 1080, P.t0 + 0.8, { n: 5, life: 1.8, spread: 240, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2t0365', key: 'F', accent: ACC, ending: 'callback',
  title: 'First apartment | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'New keys. | *Same chaos.*' },
  last: {
    text: 'The couch moved | *one more time.*',
    draw(x, t, lt) {
      const slide = ease.outCubic(prog(lt, 0.4, 1.4)), wob = lt > 1.4 && lt < 2.2 ? Math.sin(lt * 20) * 8 * (2.2 - lt) : 0
      drawBits(x, COUCH, COUCH_C, lerp(1300, 540, slide) + wob, 1150, 22)
      label(x, 540, 1340, 'LAYOUT #12', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.04, ...M })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
