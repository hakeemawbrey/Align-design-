// r2t0005: star_talk, BELIKE, "Took their stuff? | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each one's most extreme reaction when someone borrows their things. Ending: the group beat.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ wants it back before you leave · ♉ borrowed their pen? wanted poster · ♊ lent their match a book, forgot it's theirs
//              · ♋ lent their match a sweater, sent care instructions · ♌ you can't look better in their jacket · ♍ logged the charger
//              · ♎ you borrow one thing, they style the whole outfit · ♏ moved their charger? they already know
//              · ♐ borrowed your bike, back next summer · ♑ lent you ten bucks, charged interest · ♒ lent a lamp, it's a robot now
//              · ♓ cried when the hoodie came back
//  49.2        group (the ending): "Just give it back. | *Please.*"  Over the photo, a LOST & FOUND box.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#4fd1c5', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', GREEN = '#5fd068'

// ── props
const PEN = ['......KK', '.....BBK', '....BBB.', '...BBB..', '..BBB...', '.BBB....', 'GBB.....', 'G.......']
const PEN_C = { K: INK, B: SKYB, G: '#9aa5c4' }
const BOOK = ['RRRRRRRRRR', 'RWWWWWWWWR', 'RWKKKKKKWR', 'RWWWWWWWWR', 'RWKKKKKWWR', 'RWWWWWWWWR', 'RRRRRRRRRR']
const BOOK_C = { R: '#c97bff', W: CREAM, K: '#b9b0a0' }
const SWEATER = [
  '..SSS..SSS..',
  '.SSSSSSSSSS.',
  'SSSSSSSSSSSS',
  'SSS.SSSS.SSS',
  'SS..SHSS..SS',
  'SS..SSSS..SS',
  '....SSSS....',
  '....SSSS....',
  '....ssss....',
]
const JACKET = [
  '..JJJ..JJJ..',
  '.JJJJ..JJJJ.',
  'JJJJJ..JJJJJ',
  'JJ.JJGGJJ.JJ',
  'JJ.JJ..JJ.JJ',
  'JJ.JJGGJJ.JJ',
  '...JJ..JJ...',
  '...JJJJJJ...',
]
const JACKET_C = { J: '#ffb34a', G: GOLD }
const BIKE = [
  '.........HH...',
  '...SSSS...H...',
  '....S..SSSH...',
  '.KKK.S.S.KKK..',
  'K...KSSSK...K.',
  'K...K...K...K.',
  '.KKK.....KKK..',
]
const BIKE_C = { K: INK, S: RED, H: '#9aa5c4' }
const LAMP = [
  '..YYYYYY..',
  '.YYYYYYYY.',
  'YYYYYYYYYY',
  '....KK....',
  '....KK....',
  '...KKKK...',
  '..KKKKKK..',
]
const LAMP_C = { Y: '#fff1b0', K: '#6a7594' }
const HOODIE = [
  '...HHHH...',
  '..HHHHHH..',
  '.HH....HH.',
  'HHHH..HHHH',
  'HHHHHHHHHH',
  'HH.HHHH.HH',
  'HH.HHHH.HH',
  '...HHHH...',
  '...hhhh...',
]
const HOODIE_C = { H: '#b7a6ff', h: '#8f7ee0' }

// a wanted poster
function wanted(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = '#ead7a8'; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = INK; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WANTED', 0, -140)
  x.fillStyle = '#c4ad7a'; x.fillRect(-100, -100, 200, 170)
  drawBits(x, PEN, PEN_C, 0, -15, 16)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('FOR: TAKING', 0, 110); x.fillText('THE GOOD PEN', 0, 140)
  x.restore()
}
// a clipboard with a loan log
function clipboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -200, 300, 400); x.fillStyle = WOOD; x.fillRect(-142, -192, 284, 384)
  x.fillStyle = CREAM; x.fillRect(-124, -160, 248, 336)
  x.fillStyle = '#9aa5c4'; x.fillRect(-50, -214, 100, 40)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOAN LOG', 0, -126)
  x.textAlign = 'left'; x.font = `700 20px ${MONO}`
  const L = ['item: charger', 'to: you', 'out: 3:02 PM', 'due: 3:30 PM', 'cond: perfect']
  L.forEach((s, i) => { if (lt > 0.4 + i * 0.22) x.fillText(s, -104, -76 + i * 46) })
  x.restore()
}
// an invoice
function invoice(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -180, 280, 360); x.fillStyle = CREAM; x.fillRect(-132, -172, 264, 344)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVOICE', 0, -130)
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'
  x.fillText('loan .... $10', -110, -60)
  if (lt > 0.9) x.fillText('interest . $1', -110, -16)
  if (lt > 1.2) x.fillText('admin .... $1', -110, 28)
  x.fillStyle = INK; x.fillRect(-110, 60, 220, 4)
  if (lt > 1.5) { x.font = `800 30px ${INTER}`; x.fillText('TOTAL  $12', -110, 100) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Wants it back | *before you leave.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'done yet?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 820, 860, 'how about now?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1060, 'RETURN BY: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Borrowed their pen? | *Wanted poster.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { wanted(x, t, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2)) } },
  { sign: 'gemini', cap: 'Lent their match a book. | *Forgot it’s theirs.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bubble(x, 790, 700, 'ooh, cool book. | can I borrow it?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 790, 1110, 'IT WAS THEIRS.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Lent their match a sweater. | *Sent care instructions.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { S: SKYB, s: '#6fa3cf', H: PINK }, 690, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(870, 880); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-90, -150, 180, 300); x.fillStyle = CREAM; x.fillRect(-82, -142, 164, 284)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 8; i++) x.fillRect(-64, -116 + i * 32, 128 - (i % 3) * 20, 10)
        x.restore()
      }
      label(x, 790, 650, 'PAGE 1 OF 4', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Lent you their jacket. | *Don’t look better.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        const F2 = signChar(x, t, 'virgo', 800, 960, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false })
        drawBits(x, JACKET, JACKET_C, F2.x, F2.cy + 40, 14 * k)
      }
      sparkles(x, t, 800, 920, P.t0 + 0.9, 7, 160, 0.4)
      bubble(x, 420, 640, 'hm. | take it off.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Lent a charger. | *Logged it.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { clipboard(x, 790, 870, pop01(t, P.t0 + 0.15, 0.35, 2), lt) } },
  { sign: 'libra', cap: 'You borrow one thing. | *They style the outfit.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        const F2 = signChar(x, t, 'capricorn', 800, 960, 200 * k, { mood: lt > 1.4 ? 'wide' : 'neutral', look: [-1, 0], seed: 22, glyph: false })
        const n = Math.floor(Math.max(0, lt - 0.4) / 0.3)
        if (n > 0) drawBits(x, ['..R..', '.RRR.', 'RRRRR'], { R: PINK }, F2.x, F2.top - 20, 12)
        if (n > 1) drawBits(x, ['GGGGGGGG'], { G: GOLD }, F2.x, F2.cy + 20, 14)
        if (n > 2) drawBits(x, ['LL..LL', 'LLLLLL'], { L: LAV }, F2.x + 80, F2.cy + 60, 12)
      }
      label(x, 800, 650, 'LOOK: COMPLETE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Moved their charger? | *They already know.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ['.K.K.', '.K.K.', 'WWWWW', 'WWWWW', '.WWW.', '..C..', '..C..', '..CC.', '...C.', '...CC'], { K: '#9aa5c4', W: CREAM, C: '#9aa5c4' }, 880, 870, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      bubble(x, 790, 700, 'left drawer. | why?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1000, 'MOVED: 4 SEC AGO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Borrowed your bike. | *Back next summer.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const ride = ease.inCubic(prog(lt, 0.9, 1.9))
      drawBits(x, BIKE, BIKE_C, lerp(790, 900, ride), 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - ride })
      bubble(x, 790, 690, 'quick ride!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1120, 'RETURN: JULY?', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Lent you ten bucks. | *Charged interest.*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { invoice(x, 790, 870, pop01(t, P.t0 + 0.15, 0.35, 2), lt) } },
  { sign: 'aquarius', cap: 'Lent you a lamp. | It’s *a robot now.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, LAMP, LAMP_C, 790, 860, 20 * k)
      if (lt > 1.2) {
        x.fillStyle = INK; x.fillRect(745, 820, 22, 22); x.fillRect(815, 820, 22, 22)
        x.fillStyle = '#9aa5c4'; x.fillRect(700, 1000, 30, 70); x.fillRect(850, 1000, 30, 70)
      }
      bubble(x, 790, 650, 'beep. hello.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: 'pisces', cap: 'Got the hoodie back. | *Sobbed.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 800, 910, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 * Math.sin(t * 3) })
      hearts(x, t, 800, 820, P.t0 + 0.9, { n: 6, life: 1.6, spread: 160, cell: 7, seed: 4 })
      label(x, 800, 1120, 'REUNITED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0005', key: 'F', accent: TEAL, ending: 'group',
  title: 'Took their stuff? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Just give it back. | *Please.*',
    draw(x, t, lt) {
      label(x, 540, 700, 'LOST & FOUND: FULL', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
