// r2a0109: star_advice, ADVICE ROLLCALL, "How each sign | stays patient." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific line each about patience, with one light visual gag.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ count to ten, out loud is fine · ♉ you wait hours for good food, same skill · ♊ let them finish their sentence
//              · ♋ some things bloom on their own time · ♌ the spotlight always comes back · ♍ let the dough rise, no poking
//              · ♎ can't decide yet? sleep on it · ♏ don't skip to the last page · ♐ the adventure starts after the queue
//              · ♑ step three of three hundred, still climbing · ♒ the world will catch up · ♓ waiting on your match? make tea first
//  49.2        "Breathe. | *It’s coming.*"
//  52.6        "Virgo’s bread? | *Worth the wait.*"  The dough from Virgo's card comes back as a golden loaf (callback).
import { prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#9fe0b0', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a'

// ── props
const POT = ['..KKKKKK..', '.KMMMMMMK.', 'KKKKKKKKKK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', '.KKKKKKKK.', '.K......K.']
const POT_C = { K: INK, M: '#9aa5c4', S: '#c96a4a' }
const CAN = ['......BB..', '.....B..B.', 'GGGGGG...B', 'GGGGGGGGB.', 'GGGGGG....', 'GGGGGG....']
const CAN_C = { G: '#7ad18a', B: '#5fb07a' }
const LAMP = ['..KKKK..', '.KGGGGK.', 'KGGGGGGK', 'KGGGGGGK', '.KKKKKK.']
const LAMP_C = { K: INK, G: '#9aa5c4' }
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const PILLOW_C = { W: '#e8e2f2' }
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', '.YY...', '..YYY.']
const BULB = ['..YYYY..', '.YYYYYY.', 'YYYWYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..KKKK..', '..KKKK..']
const BULB_C = { Y: '#fff1a8', W: '#ffffff', K: '#9aa5c4' }
const CUP = ['..s.s....', '.s.s.....', 'WWWWWWW..', 'WTTTTTWWW', 'WTTTTTW.W', 'WTTTTTWWW', 'WWWWWWW..', '.WWWWW...']
const CUP_C = { W: CREAM, T: '#c98f6a', s: 'rgba(239,230,214,0.7)' }
const PASSPORT = ['NNNNNNNN', 'NNNYYNNN', 'NNYNNYNN', 'NNNYYNNN', 'NNNNNNNN', 'NNYYYYNN', 'NNNNNNNN']
const PASSPORT_C = { N: '#3a5aa8', Y: GOLD }

// a dough ball that rises, with a finger hovering and pulling back
function dough(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const rise = ease.inOutSine ? ease.inOutSine(prog(lt, 0.2, 2.2)) : prog(lt, 0.2, 2.2)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, 40, 300, 30); x.fillStyle = '#d8c7a8'; x.fillRect(-142, 44, 284, 22)
  const w = lerp(100, 140, rise), h = lerp(60, 120, rise)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40 - h / 2, w + 6, h / 2 + 6, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#ffe9c4'; x.beginPath(); x.ellipse(0, 40 - h / 2, w, h / 2, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#ffffff'; x.fillRect(-w * 0.4, 40 - h * 0.85, 22, 12)
  x.restore()
}
// a book with a "no peeking" bookmark
function book(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -150, 256, 316)
  x.fillStyle = INK; x.fillRect(-132, -162, 264, 324); x.fillStyle = '#7a2a4a'; x.fillRect(-124, -154, 248, 308)
  x.fillStyle = GOLD; x.fillRect(-90, -110, 180, 8); x.fillRect(-90, 100, 180, 8)
  x.fillStyle = CREAM; x.font = `italic 600 34px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Chapter 1', 0, -40)
  x.fillStyle = RED; x.fillRect(60, -180, 34, 120); x.beginPath(); x.moveTo(60, -60); x.lineTo(77, -76); x.lineTo(94, -60); x.fillStyle = '#7a2a4a'; x.fill()
  x.restore()
}
// a staircase climbing to a little flag
function stairs(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(-180 + i * 60, 140 - i * 50, 64, 50 + i * 50); x.fillStyle = '#c9b8e8'; x.fillRect(-176 + i * 60, 144 - i * 50, 56, 44 + i * 50) }
  x.fillStyle = INK; x.fillRect(150, -220, 8, 90); x.fillStyle = GOLD; x.fillRect(158, -220, 50, 32)
  x.restore()
}
// a queue of small stars, shuffling forward
function queue(x, t, lt) {
  const IDS = ['aries', 'taurus', 'leo', 'virgo', 'pisces']
  IDS.forEach((id, i) => signChar(x, t, id, 640 + i * 70, 1000 - (i % 2) * 6, 100, { mood: i === 4 ? 'wide' : 'sleepy', seed: 50 + i, glyph: false, tears: id === 'pisces' ? 1 : 0, alpha: 0.9 }))
}

const CAMEOS = [
  { sign: 'aries', cap: 'Count to ten. | *Out loud is fine.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      const n = Math.min(10, 1 + Math.floor(lt * 4.6))
      label(x, 790, 860, `${n}…`, pop01(t, P.t0 + 0.2, 0.3, 2.4), { size: 110, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'okay. calm.', pop01(t, P.t0 + 2.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'You wait for slow food. | *Same skill.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 800, 950, 28 * pop01(t, P.t0 + 0.15, 0.3, 2))
      for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.fillStyle = `rgba(239,230,214,${(0.5 * (1 - ph)).toFixed(3)})`; x.fillRect(740 + i * 50 + Math.sin(ph * 6) * 10, 830 - ph * 140, 18, 24) }
      label(x, 790, 650, 'SLOW COOK: 8 HRS', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Let them finish | *their sentence first.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P, F) {
      const s = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (s > 0.01) signChar(x, t, 'cancer', 820, 980, 190 * s, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false })
      bubble(x, 790, 700, 'so then I realised…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: SKYB, tail: 'br' })
      x.fillStyle = INK; const z = pop01(t, P.t0 + 0.9, 0.3, 2); if (z > 0.01) { x.save(); x.translate(F.x + 40, F.cy + 30); x.scale(z, z); x.fillRect(-40, -8, 80, 16); x.fillStyle = GOLD; for (let i = -36; i < 40; i += 12) x.fillRect(i, -4, 6, 8); x.restore() }
      label(x, 400, 1130, 'LISTENING MODE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Some things bloom | *on their own time.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.7],
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.4, 1.7)), k = pop01(t, P.t0 + 0.15, 0.3, 2)
      x.fillStyle = INK; x.fillRect(710, 1000, 180, 130); x.fillStyle = '#c96a4a'; x.fillRect(718, 1006, 164, 118)
      x.fillStyle = '#5fd068'; x.fillRect(790, lerp(1000, 790, g), 20, lerp(0, 210, g))
      if (g > 0.4) { x.fillRect(810, 890, 60, 18); x.fillRect(730, 930, 60, 18) }
      if (lt > 1.7) drawBits(x, ['.PP.PP.', 'PPPYPPP', '.PPPPP.', '..PPP..'], { P: PINK, Y: GOLD }, 800, 780, 20 * pop01(t, P.t0 + 1.7, 0.3, 2.4))
      drawBits(x, CAN, CAN_C, 600, 880, 14 * k, { rot: -0.4 })
      hearts(x, t, 800, 800, P.t0 + 1.8, { n: 4, life: 1.2, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'The spotlight | *always comes back.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: lt => [lt > 1.3 ? 0 : 1, -1], star: { x: -200 }, hops: [1.4],
    back(x, t, lt, P, F) {
      const sw = ease.inOutCubic(prog(lt, 0.3, 1.3)), ax = lerp(860, F.x, sw)
      x.save(); x.globalAlpha = 0.35; x.fillStyle = '#fff1a8'; x.beginPath(); x.moveTo(820, 520); x.lineTo(ax - 140, 1150); x.lineTo(ax + 140, 1150); x.closePath(); x.fill(); x.restore()
      drawBits(x, LAMP, LAMP_C, 820, 530, 12 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P, F) {
      label(x, 790, 1120, 'WORTH THE WAIT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.35, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Let the dough rise. | *No poking.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      dough(x, t, 800, 1000, 1.3 * pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 680, 'HANDS OFF ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Can’t decide yet? | *Sleep on it.*', mood: lt => lt > 1.0 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 790, 1030, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, MOON, { Y: GOLD }, 880, 640, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 760, 820, 'decide | tomorrow', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'No skipping to the end. | *Let it unfold.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      book(x, 800, 900, pop01(t, P.t0 + 0.15, 0.35, 2))
      label(x, 790, 1130, 'NO PEEKING', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: '#c66bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'The adventure starts | *after the queue.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -240 }, hops: [1.4],
    front(x, t, lt, P, F) {
      if (pop01(t, P.t0 + 0.15, 0.3, 2) > 0.5) queue(x, t, lt)
      drawBits(x, PASSPORT, PASSPORT_C, F.x + 110, F.cy + 10, 12 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.2 })
      label(x, 790, 700, 'QUEUE: 40 MIN', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'still fun!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Step 3 of 300? | *Still climbing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -240 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      stairs(x, t, 790, 900, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      label(x, 760, 640, 'STEP 3/300', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Your ideas are early. | *The world will catch up.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BULB, BULB_C, 800, 880, 27 * pop01(t, P.t0 + 0.15, 0.3, 2))
      sparkles(x, t, 800, 860, P.t0 + 0.5, 7, 170, 0.3)
      label(x, 790, 1120, 'ARRIVING: SOON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Waiting on your match? | *Make tea first.*', mood: 'wide', tears: 3, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 800, 960, 25 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 700, 'TYPING…', pop01(t, P.t0 + 0.6, 0.3, 2.4) * (lt < 1.6 ? 1 : 0), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 700, 'NEW MESSAGE ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0109', key: 'E', accent: SAGE, ending: 'callback',
  title: 'How each sign | *stays patient.*',
  cameos: CAMEOS,
  group: { cap: 'Breathe. | *It’s coming.*' },
  last: {
    text: 'Virgo’s bread? | *Worth the wait.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) {
        x.save(); x.translate(640, 1120); x.scale(1.6 * k, 1.6 * k)
        x.fillStyle = INK; x.fillRect(-160, 40, 320, 30); x.fillStyle = WOOD; x.fillRect(-152, 44, 304, 22)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 146, 76, 0, Math.PI, 0); x.fill(); x.fillRect(-146, -2, 292, 44)
        x.fillStyle = '#e0a24a'; x.beginPath(); x.ellipse(0, 4, 140, 70, 0, Math.PI, 0); x.fill(); x.fillRect(-140, 2, 280, 36)
        x.fillStyle = '#b8742a'; for (let i = -1; i <= 1; i++) x.fillRect(i * 50 - 16, -40, 32, 10)
        x.restore()
      }
      signChar(x, t, 'virgo', 290, 1000, 220, { mood: lt > 1.3 ? 'heart' : 'sparkle', pop: pop01(t, t0 + 0.7, 0.4, 2), seed: 9, hops: [t0 + 1.3], look: [1, 0] })
      for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.fillStyle = `rgba(239,230,214,${(0.5 * (1 - ph) * k).toFixed(3)})`; x.fillRect(580 + i * 60 + Math.sin(ph * 6) * 10, 940 - ph * 160, 18, 26) }
      sparkles(x, t, 640, 1060, t0 + 1.0, 8, 240, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
