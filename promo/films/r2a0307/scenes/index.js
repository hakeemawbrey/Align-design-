// r2a0307: star_advice, ADVICE SOLO (pisces), "Pisces, let yourself | be loved." (signs3kit social cut, music: lofi · F). Ending: card (pisces + cancer).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** a square sticky note with a few lines of text */
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -134, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = bg; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.25))
  x.restore()
}
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** little "z z z" drifting up */
function zzz(x, t, cx, cy, { alpha = 1, size = 40 } = {}) {
  x.save(); x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 6) * 8, cy - ph * 120) }
  x.restore()
}
const ST = { x: -170 }

const ACC = '#b7a6ff'
const GIFT = ['...R...R...', '....RRR....', 'KKKKKRKKKKK', 'KPPPPRPPPPK', 'KPPPPRPPPPK', 'KRRRRRRRRRK', 'KPPPPRPPPPK', 'KPPPPRPPPPK', 'KPPPPRPPPPK', 'KKKKKKKKKKK']
const TISSUE = ['....WW....', '...WWWW...', 'KKKKKKKKKK', 'KBBBBBBBBK', 'KBWWWWWWBK', 'KBBBBBBBBK', 'KKKKKKKKKK']
const BUCKET = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', '.KGGGGGGGGK.', '.KGGGGGGGGK.', '.KGGGGGGGGK.', '..KGGGGGGK..', '..KKKKKKKK..']
const DOOR = ['KKKKKKKK', 'KDDDDDDK', 'KDKKKKDK', 'KDKDDKDK', 'KDKKKKDK', 'KDDDDDDK', 'KDDDDYDK', 'KDDDDDDK', 'KDKKKKDK', 'KDKDDKDK', 'KDKKKKDK', 'KDDDDDDK', 'KKKKKKKK']
const FR = 'cancer'
const friend = (x, t, P, at, cx = 830, cy = 940, s = 170, mood = 'happy') => {
  const k = pop01(t, P.t0 + at, 0.35, 2)
  if (k > 0.01) signChar(x, t, FR, cx, cy, s * k, { mood, look: [-1, 0], seed: 13, glyph: false })
}

const S = 'pisces'
const CAMEOS = [
  { sign: S, cap: 'Always giving? | *Receiving counts too.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', tears: lt => lt > 1.3 ? 3 : 1, star: ST,
    front(x, t, lt, P) {
      drawBits(x, GIFT, { K: INK, R: GOLD, P: PINK }, 790, 880, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      L(x, 790, 680, 'FOR: YOU', pop01(t, P.t0 + 0.7, 0.3, 2), GOLD, 0.04, 36)
      L(x, 790, 1090, '(YES, YOU)', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'Said “I’m fine” again? | They *see you anyway.*', mood: 'wide', tears: 3, star: ST,
    front(x, t, lt, P) {
      bubble(x, 560, 620, 'i’m fine!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      friend(x, t, P, 0.7, 840, 980, 160)
      drawBits(x, TISSUE, { K: INK, B: SKYB, W: '#ffffff' }, 760, 850, 14 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 700, 'TISSUES: ON US', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Cried at a kind text? | *That’s allowed.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: lt => lt > 1.0 ? 3 : 1, star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: PINK, lines: [
        ['proud of you', MINT, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['so much', MINT, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
      ] })
      L(x, 800, 1110, 'CRYING: VALID', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: S, cap: 'Got a compliment? | Just say *thank you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', tears: 2, star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'you’re amazing', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      if (pop01(t, P.t0 + 0.5, 0.3, 2) > 0.5) swapLabel(x, 790, 900, lt, 1.0, 'NO, YOU', 'THANK YOU', { size: 42, toBg: GOLD })
    } },
  { sign: S, cap: 'Feel like a bother? | *You’re a gift.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', tears: 2, star: ST,
    front(x, t, lt, P) {
      friend(x, t, P, 0.3, 830, 960, 170, 'heart')
      bubble(x, 790, 700, 'never a bother. | ever.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'br' })
      hearts(x, t, 680, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Big feelings? | They *want all of them.*', mood: 'wide', tears: 3, star: { x: -130 },
    front(x, t, lt, P) {
      drawBits(x, BUCKET, { K: INK, S: '#9aa5c4', G: SKYB }, 560, 1120, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 560, 1030, 'FEELINGS', pop01(t, P.t0 + 0.5, 0.3, 2), SKYB, 0.03, 26)
      friend(x, t, P, 0.9, 840, 900, 160, 'happy')
      bubble(x, 800, 680, 'still room!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: S, cap: 'Asked for help? | *Brave,* not needy.', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', tears: 1, star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM', headCol: GOLD, lines: [
        ['can you call?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['calling now', MINT, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['♡ always', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Left yourself off the list? | *Add your name.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', tears: lt => lt > 1.4 ? 1 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ['TAKE CARE OF:', 'mom · friends', 'the cat', lt > 1.2 ? '+ ME ♡' : ''], { bg: '#ffe76a', size: 32, rot: 0.04 })
      if (lt > 1.2) sparkles(x, t, 790, 900, P.t0 + 1.2, 6, 140, 0.4)
    } },
  { sign: S, cap: 'Someone loves you back? | *Let it in.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 3, star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const op = ease.outCubic(prog(lt, 0.5, 1.0))
      drawBits(x, DOOR, { K: INK, D: '#c97b5a', Y: GOLD }, 820, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 - 0.75 * op })
      if (lt > 0.9) hearts(x, t, 800, 1000, P.t0 + 0.9, { n: 7, life: 1.8, spread: 160, cell: 8, seed: 6 })
      L(x, 790, 640, 'HEART: OPEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0307', key: 'F', accent: ACC, solo: 'pisces', ending: 'card',
  title: 'Pisces, let yourself | *be loved.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Soft heart. | *Strong heart.*', mood: 'heart' },
  lesson: { text: 'You deserve the love | *you give.*', chip: 'STATUS: LOVED' },
  last: { text: 'Pisces cried. | *Happy tears.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
