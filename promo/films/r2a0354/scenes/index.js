// r2a0354: star_advice, ADVICE ROLL CALL (twelve signs), "Each sign's | *most romantic habit.*" (~63 s vertical,
// signs3kit social cut, music: lofi · E). One warm, specific, relatable line per sign with a light visual gag. Ending: card.
//   0.0–3.6    "Each sign's | *most romantic habit.*"
//   3.6–49.2   twelve cards: Aries plans the date before you ask · Taurus cooks your favourite, perfectly · Gemini sends
//              you every funny thing · Cancer remembers the tiny details · Leo hypes you up in public · Virgo fixes the
//              thing you mentioned once · Libra leaves little notes · Scorpio's full attention · Sagittarius turns errands
//              into adventures · Capricorn shows up, every time · Aquarius loves your weird parts · Pisces writes you a
//              song, cries at the chorus
//  49.2        "Love speaks | *twelve languages.*"
//  52.4        LESSON UNLOCKED: "Notice how | they *love you.*"  HEART: SEEN
//  58.3        "Cap showed up. | *Pisces sang.*" over the match card: Capricorn + Pisces.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8fb1', PAPER = '#fff4e2'
const L = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 30, font: MONO, weight: 700, ...o })

// ── props
const TICKET = [
  'GGGGGGGGGGGGG',
  'GWWWWWWWWWWWG',
  '.WKKKKKWWHWW.',
  '.WWWWWWWHHHW.',
  '.WKKKWWWWHWW.',
  'GWWWWWWWWWWWG',
  'GGGGGGGGGGGGG',
]
const TICKET_C = { G: GOLD, W: PAPER, K: '#9aa5c4', H: '#ff4f86' }
const PLATE = [
  '...SSSSSSS...',
  '..SPPPPPPPS..',
  '.SPPYYYYYPPS.',
  'SPPYRRRRRYPPS',
  'SPPYYYYYYYPPS',
  '.SPPPPPPPPPS.',
  '..SSSSSSSSS..',
]
const PLATE_C = { S: '#d8dbe8', P: '#ffffff', Y: '#ffd23a', R: '#ff6b5a' }
const PHONE = ['KKKKKKKKK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KKKKWKKKK']
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', W: '#9aa5c4' }
const MEGA = [
  '........RR',
  '......RRRR',
  'KK..RRRRRR',
  'KKRRRRRRRR',
  'KKRRRRRRRR',
  'KK..RRRRRR',
  '......RRRR',
  '........RR',
]
const MEGA_C = { R: '#ffb34a', K: INK }
const WRENCH = [
  '.GG...',
  'GG.G..',
  'G..GG.',
  '.GGGGG',
  '....GG',
  '.....G',
]
const NOTE = ['YYYYYYYY', 'YYYYYYYY', 'YKKKKKYY', 'YYYYYYYY', 'YKKKYYYY', 'YYYYYYYY', 'YYYYYYYY']
const NOTE_C = { Y: '#ffe36a', K: '#c98a4e' }
const CART = [
  'K..........',
  '.KBBBBBBBBB',
  '.KBGBRBYBBB',
  '..BBBBBBBB.',
  '..KKKKKKKK.',
  '...K....K..',
  '..KKK..KKK.',
]
const CART_C = { K: '#9aa5c4', B: '#6b62a8', G: '#5fd068', R: '#ff6b5a', Y: '#ffd23a' }
const UMB = [
  '....KKKKK....',
  '..KBBBBBBBK..',
  '.KBBBBBBBBBK.',
  'KBBBBBBBBBBBK',
  'KKKKKKKKKKKKK',
  '......H......',
  '......H......',
  '......H......',
  '....H.H......',
  '.....HH......',
]
const UMB_C = { K: INK, B: '#9aa5c4', H: '#c98a4e' }
function rain(x, t, l, tp, w, h, a) {
  if (a <= 0.01) return
  x.save(); x.beginPath(); x.rect(l, tp, w, h); x.clip(); x.globalAlpha = a
  x.strokeStyle = 'rgba(143,227,255,0.6)'; x.lineWidth = 4
  for (let i = 0; i < 16; i++) { const rx = l + ((i * 97) % w), ry = tp + (((i * 53) + t * 500) % (h + 60)) - 30; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 6, ry + 30); x.stroke() }
  x.restore()
}

const S = (sign, o) => ({ sign, star: { x: -170 }, look: [1, 0], ...o })
const CAMEOS = [
  S('aries', { cap: 'Plans the date | *before you ask.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wink', hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, TICKET, TICKET_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      L(x, 790, 1080, 'BOOKED: FRIDAY 7PM', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: '#ff6b5a', size: 28 })
    } }),
  S('taurus', { cap: 'Cooks your favourite. | *Perfectly.*', mood: lt => lt < 1.2 ? 'happy' : 'heart',
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 690, 'EXTRA CHEESE, AS USUAL', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: GOLD, size: 26 })
    } }),
  S('gemini', { cap: 'Sends you | *every funny thing.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle',
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(9, Math.floor(lt / 0.2))
      L(x, 790, 880, `${n} NEW`, pop01(t, P.t0 + 0.3, 0.3, 2), { bg: PINK, size: 34, rot: 0 })
      bubble(x, 790, 660, 'this is SO us', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } }),
  S('cancer', { cap: 'Remembers the | *tiny details.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart',
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'you said you | liked yellow', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 980, '(IN MARCH. ONCE.)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: '#ffe36a', size: 30 })
    } }),
  S('leo', { cap: 'Hypes you up | *in public.*', mood: 'sparkle', hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, MEGA, MEGA_C, 720, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 830, 700, 'THAT’S | MY PERSON!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl', col: GOLD })
      sparkles(x, t, 820, 900, P.t0 + 0.8, 8, 140, 0.3)
    } }),
  S('virgo', { cap: 'Fixes the thing | *you mentioned once.*', mood: lt => lt < 1.3 ? 'squint' : 'wink',
    front(x, t, lt, P) {
      drawBits(x, WRENCH, { G: '#9aa5c4' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 6) * 0.3 })
      L(x, 790, 1060, lt < 1.3 ? 'SQUEAKY DOOR' : 'NOT SQUEAKY ✓', pop01(t, P.t0 + 0.5, 0.3, 2), { bg: lt < 1.3 ? BONE : MINT, size: 32 })
    } }),
  S('libra', { cap: 'Leaves *little notes* | everywhere.', mood: lt => lt < 1.2 ? 'happy' : 'heart',
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, NOTE, NOTE_C, 700 + (i % 2) * 170, 720 + Math.floor(i / 2) * 230, 14 * pop01(t, P.t0 + 0.2 + i * 0.3, 0.25, 2.2), { rot: (i % 2 ? 0.1 : -0.08) })
      L(x, 790, 1130, 'ON THE MIRROR TOO', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: PINK, size: 28 })
    } }),
  S('scorpio', { cap: 'Looks at you like | *nobody else exists.*', mood: lt => lt < 1.2 ? 'squint' : 'heart',
    front(x, t, lt, P) {
      L(x, 790, 700, 'PHONE: FACE DOWN', pop01(t, P.t0 + 0.3, 0.3, 2), { bg: LAV, size: 32 })
      L(x, 790, 1000, 'ATTENTION: 100% YOU', pop01(t, P.t0 + 1.1, 0.3, 2.2), { bg: '#c97bff', size: 28 })
      hearts(x, t, 540, 840, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } }),
  S('sagittarius', { cap: 'Turns errands | into *adventures.*', mood: 'sparkle', hops: [0.7, 1.4, 2.0],
    front(x, t, lt, P) {
      drawBits(x, CART, CART_C, lerp(700, 850, ease.inOutCubic(prog(lt, 0.3, 1.8))), 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'GROCERY RUN: 4 HOURS', pop01(t, P.t0 + 1.1, 0.3, 2.2), { bg: '#ff9a4a', size: 28 })
    } }),
  S('capricorn', { cap: 'Shows up. | *Every single time.*', mood: lt => lt < 1.2 ? 'squint' : 'happy',
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { rain(x, t, 120, 480, 840, 740, pop01(t, P.t0 + 0.1, 0.3, 1.5)) },
    front(x, t, lt, P) {
      drawBits(x, UMB, UMB_C, 790, 860, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1090, 'EVEN IN THE RAIN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: SKYB, size: 30 })
    } }),
  S('aquarius', { cap: 'Loves your | *weird parts* most.', mood: lt => lt < 1.1 ? 'wink' : 'heart',
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'tell me about | the frog facts', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 990, 'FAVOURITE TOPIC', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: MINT, size: 30 })
    } }),
  S('pisces', { cap: 'Writes you a song. | *Cries at the chorus.*', mood: lt => lt < 1.0 ? 'sparkle' : 'heart', tears: lt => lt < 1.0 ? 1 : 3,
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 5, cell: 10, col: PINK, alpha: pop01(t, P.t0 + 0.2, 0.3, 2), seed: 1 })
      L(x, 790, 1100, 'TRACK 1: YOU', pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: PINK, size: 32 })
    } }),
]

const F = makeFilm({
  id: 'r2a0354', key: 'E', accent: ACC, ending: 'card',
  title: 'Each sign’s most | *romantic habit.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'pisces', chip: 'ALIGNED' },
  group: { cap: 'Love speaks | *twelve languages.*' },
  lesson: { text: 'Notice how | they *love you.*', chip: 'HEART: SEEN' },
  last: { text: 'Cap showed up. | *Pisces sang.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
