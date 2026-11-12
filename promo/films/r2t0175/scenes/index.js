// r2t0175: star_talk, ROLL CALL, "The signs at | *a lemonade stand.*" (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself running a lemonade stand. Ending: group.
//   0.0–3.6    "The signs at | *a lemonade stand.*"
//   3.6–49.2   ♈ sold out in four minutes · ♉ drank all the profits · ♊ chatted an hour, sold one cup · ♋ free cup if you
//              look sad · ♌ the sign is ten feet tall (with their face) · ♍ lemons sorted by size · ♎ pink or yellow? made both
//              · ♏ already poured yours · ♐ moved the stand to the beach · ♑ ice costs extra · ♒ a stand for dogs (it's water)
//              · ♓ someone tipped, Pisces cried
//  49.2        "Twelve stands. | *One lemon left.*"  (group is the ending; the last lemon wobbles above the line-up)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', LEMON = '#ffe24a'

// ── props
const LEMON_BM = ['...GG....', '..KKKKK..', '.KYYYYYK.', 'KYYWYYYYK', 'KYYYYYYYK', 'KYYYYYYYK', '.KYYYYYK.', '..KKKKK..']
const LEMON_C = { K: INK, Y: LEMON, W: '#fff8c0', G: '#4ac77d' }
function lemon(x, cx, cy, cell, rot = 0) { drawBits(x, LEMON_BM, LEMON_C, cx, cy, cell, { rot }) }
function pitcher(x, cx, cy, k, fill, col = LEMON) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-90, -130); x.lineTo(80, -130); x.lineTo(96, 140); x.lineTo(-96, 140); x.closePath(); x.fill()
  x.fillStyle = 'rgba(220,240,255,0.85)'; x.beginPath(); x.moveTo(-82, -122); x.lineTo(72, -122); x.lineTo(88, 132); x.lineTo(-88, 132); x.closePath(); x.fill()
  if (fill > 0) { const top = 132 - 250 * fill; x.fillStyle = col; x.fillRect(-86, top, 172, 132 - top) }
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(96, 0, 54, -1.2, 1.2); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-90, -130); x.lineTo(-130, -150); x.lineTo(-90, -100); x.fill()
  x.restore()
}
function standSign(x, t, cx, cy, k, text, { w = 320, h = 120, col = BONE, size = 40, face = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 + 30, h / 2, 16, 140); x.fillRect(w / 2 - 46, h / 2, 16, 140)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (face) { signChar(x, t, face, 0, -h / 2 + 130, 190, { mood: 'sparkle', seed: 70, glyph: false, glow: 0.4 }); x.fillStyle = INK; x.fillText(text, 0, h / 2 - 44) }
  else x.fillText(text, 0, 2)
  x.restore()
}
function cupSmall(x, cx, cy, k, col = LEMON) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-56, -70); x.lineTo(56, -70); x.lineTo(44, 74); x.lineTo(-44, 74); x.closePath(); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-48, -62); x.lineTo(48, -62); x.lineTo(38, 66); x.lineTo(-38, 66); x.closePath(); x.fill()
  x.fillStyle = col; x.fillRect(-44, -36, 88, 98)
  x.fillStyle = PINK; x.fillRect(10, -110, 10, 70)
  x.restore()
}
const BOWL = ['K..........K', 'KSSSSSSSSSSK', 'KWWWWWWWWWWK', '.KWWWWWWWWK.', '..KKKKKKKK..']
const DOG = ['KK......KK', 'KBK....KBK', 'KBBKKKKBBK', 'KBBBBBBBBK', 'KBWKBBKWBK', 'KBBBBBBBBK', '.KBBNNBBK.', '..KBBBBK..', '...KKKK...']
const BILL = ['KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGWGGGGGGWGK', 'KGGGG$$GGGGK'.replace(/\$/g, 'D'), 'KGWGGGGGGWGK', 'KGGGGGGGGGGK', 'KKKKKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Sold out | *in four minutes.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      standSign(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 'SOLD OUT!' : 'LEMONADE', { col: lt > 1.0 ? RED : LEMON })
      pitcher(x, 790, 1020, pop01(t, P.t0 + 0.4, 0.3, 2) * 0.6, lerp(0.9, 0, clamp((lt - 0.4) / 0.6)))
    } },
  { sign: 'taurus', cap: 'Drank all | *the profits.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      pitcher(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(0.95, 0.05, clamp((lt - 0.4) / 1.0)))
      label(x, 790, 1110, 'SALES: 0. HAPPY: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Chatted for an hour. | *Sold one cup.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'and THEN she said…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      cupSmall(x, 800, 930, pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 800, 1110, 'CUPS SOLD: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Free cup if | *you look sad.*', mood: 'heart', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      standSign(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'SAD? FREE.', { col: '#ffd0dc' })
      cupSmall(x, 790, 1030, pop01(t, P.t0 + 1.0, 0.3, 2))
      hearts(x, t, 790, 960, P.t0 + 1.4, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'The sign is *ten feet tall.* | Their face is on it.', mood: 'sparkle', look: [1, 0], star: { x: -220, s: 240 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      standSign(x, t, 750, 760, pop01(t, P.t0 + 0.3, 0.35, 1.8), 'LEO-MONADE', { w: 400, h: 330, col: GOLD, size: 42, face: 'leo' })
    } },
  { sign: 'virgo', cap: 'Lemons sorted | *by size.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2); if (k > 0.01) lemon(x, 590 + i * 92, 930 - i * 10, (7 + i * 2.5) * k) }
      label(x, 790, 1110, 'QUALITY CONTROL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Pink or yellow? | *Made both.* And a blend.', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      pitcher(x, 650, 900, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.62, 0.8, PINK)
      pitcher(x, 780, 900, pop01(t, P.t0 + 0.5, 0.3, 2) * 0.62, 0.8, LEMON)
      pitcher(x, 900, 900, pop01(t, P.t0 + 1.2, 0.3, 2) * 0.62, 0.8, '#ffb34a')
      label(x, 820, 1100, 'NO WRONG ANSWER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Read the customer. | *Already poured yours.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const dx = lerp(120, 0, ease.outCubic(clamp((lt - 0.3) / 0.6)))
      cupSmall(x, 790 - dx, 920, pop01(t, P.t0 + 0.3, 0.3, 2) * 1.3, PINK)
      label(x, 790, 680, 'EXTRA ICE. RIGHT?', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1120, 'how did you…', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'tl', col: SKYB })
    } },
  { sign: 'sagittarius', cap: 'Moved the stand | *to the beach.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.6, 1.2],
    back(x, t, lt, P) {
      const k = clamp(pop01(t, P.t0 + 0.1, 0.4, 1.4))
      x.save(); x.globalAlpha = k
      x.fillStyle = '#e8d8a0'; x.fillRect(110, 1060, 860, 170)
      x.fillStyle = '#3d8fd8'; x.fillRect(110, 990, 860, 70)
      x.fillStyle = 'rgba(255,255,255,0.6)'; for (let i = 0; i < 6; i++) x.fillRect(140 + ((i * 150 + t * 50) % 800), 1010 + (i % 2) * 24, 60, 6)
      x.restore()
    },
    front(x, t, lt, P) {
      standSign(x, t, 790, 760, pop01(t, P.t0 + 0.3, 0.3, 2), 'NEW SPOT!', { col: SKYB })
      label(x, 790, 1150, 'WORTH THE DRIVE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ice costs extra. | *Business is business.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      standSign(x, t, 790, 770, pop01(t, P.t0 + 0.2, 0.3, 2), 'ICE: +5¢', { col: BONE, size: 48 })
      label(x, 790, 1060, 'NO DISCOUNTS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Opened a stand *for dogs.* | (It’s water.)', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, BOWL, { K: INK, S: '#9aa5c4', W: SKYB }, 760, 1050, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      drawBits(x, DOG, { K: INK, B: '#c98f5a', W: '#fff', N: '#2a2350' }, 820, 840, 18 * k, { rot: Math.sin(t * 4) * 0.05 })
      label(x, 790, 650, 'PUPS ONLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Someone left a tip. | Pisces *cried.*', mood: 'happy', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BILL, { K: INK, G: '#7ad86a', W: '#c9f0b0', D: '#2f9a5a' }, 790, 880 + Math.sin(t * 3) * 10, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.1 })
      label(x, 790, 1100, 'BEST DAY EVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 180, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0175', key: 'F', accent: LEMON, ending: 'group',
  title: 'The signs at | *a lemonade stand.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve stands. | *One lemon left.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.4, 0.4, 2)
      if (k > 0.01) lemon(x, 540, 640, 22 * k, Math.sin(t * 3) * 0.1)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
