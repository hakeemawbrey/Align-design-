// r2a0233: star_advice, ADVICE SOLO, "What Libras need | on a bad day." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): what helps a Libra on a rough day, warmly.
//   0.0–3.6    "What Libras need | *on a bad day.*"
//   3.6–37.8   nine cards (3.8 s each):
//              no decisions today, we picked · a pretty little something · soft talks, not hard ones · quiet company
//              · permission to be not okay (the smile comes off) · their favourite song on repeat · a reminder they're
//              lovely · cosy over cute (a big blanket) · tomorrow the balance comes back
//  37.8        "Soft day. | *Softer heart.*"  Libra comes back, big.
//  41.2        callback: "Blanket on. | *Bad day: over.*"  the blanket comes back, Libra wrapped up and glowing.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN } from './props.js'

const LIB = '#ff9fc6'
const S = 'libra', ST = { x: -170 }
const M = { font: MONO, weight: 700 }

const VASE = ['..R.R..', '.RRYRR.', '..RRR..', '...G...', '..GGG..', '...G...', '.BBBBB.', 'BBBBBBB', 'BBBBBBB', '.BBBBB.']
const BOOK = ['KKKKKKKKKK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KKKKKKKKKK']

/** a big cosy blanket wrapped around the star at (cx, cy) */
function blanket(x, cx, cy, s, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s / 300, k * s / 300)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-190, -10); x.quadraticCurveTo(0, -120, 190, -10); x.lineTo(170, 170); x.lineTo(-170, 170); x.closePath(); x.fill()
  x.fillStyle = '#b7a6ff'; x.beginPath(); x.moveTo(-178, -2); x.quadraticCurveTo(0, -108, 178, -2); x.lineTo(160, 160); x.lineTo(-160, 160); x.closePath(); x.fill()
  x.fillStyle = '#d6ccff'; for (let i = -2; i <= 2; i++) for (let j = 0; j < 3; j++) x.fillRect(i * 64 - 14, j * 50 + 10, 28, 28)
  x.restore()
}
/** the balance scale; tip -1…1 */
function scale(x, cx, cy, k, tip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -150, 24, 270); x.fillRect(-90, 110, 180, 30)
  x.fillStyle = GOLD; x.fillRect(-6, -144, 12, 258); x.fillRect(-84, 116, 168, 18)
  x.save(); x.translate(0, -140); x.rotate(tip * 0.35)
  x.fillStyle = INK; x.fillRect(-170, -8, 340, 16); x.fillStyle = GOLD; x.fillRect(-166, -4, 332, 8)
  for (const sx of [-150, 150]) { x.save(); x.translate(sx, 0); x.rotate(-tip * 0.35); x.fillStyle = INK; x.fillRect(-3, 0, 6, 80); x.beginPath(); x.moveTo(-64, 76); x.lineTo(64, 76); x.lineTo(44, 106); x.lineTo(-44, 106); x.closePath(); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.moveTo(-56, 80); x.lineTo(56, 80); x.lineTo(40, 100); x.lineTo(-40, 100); x.closePath(); x.fill(); x.restore() }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'No decisions today. | *We picked.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const g = ease.inOutCubic(prog(lt, 1.1, 1.4))
      card(x, 700, 820, 170, 120, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - g), { bg: MINT, rot: -0.05 }, () => txt(x, 'SALAD?', 0, 4, { size: 30, ...M }))
      card(x, 890, 820, 170, 120, pop01(t, P.t0 + 0.35, 0.3, 2) * (1 - g), { bg: GOLD, rot: 0.05 }, () => txt(x, 'PASTA?', 0, 4, { size: 30, ...M }))
      label(x, 790, 820, 'CHOSEN: SOUP ♥', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, ...M })
      bubble(x, 790, 1020, 'you rest', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'A pretty little | *something.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, VASE, { R: '#ff6b9a', Y: GOLD, G: GREEN, B: SKYB }, 790, 920, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 790, 800, P.t0 + 0.8, 6, 120, 0.3)
      label(x, 790, 650, 'JUST BECAUSE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, ...M })
    } },
  { sign: S, cap: 'No hard talks. | *Just soft ones.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'rough day?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: CREAM, tail: 'bl' })
      bubble(x, 790, 880, 'come here.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      label(x, 790, 1060, 'DEBATES: CLOSED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GREY, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'Company, but | *quiet company.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 810, 1000, 200 * k, { mood: 'sleepy', look: [0, 1], seed: 21, glyph: false })
      drawBits(x, BOOK, { K: INK, P: CREAM }, 810, 1110, 11 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 800, 760, 'SMALL TALK: 0', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, ...M })
    } },
  { sign: S, cap: 'Permission to be | *not okay.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = ease.inOutCubic(prog(lt, 0.9, 1.4))
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(lerp(370, 790, g), lerp(870, 820, g)); x.rotate(g * 0.3); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 96, 70, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 0, 88, 62, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.fillRect(-44, -18, 18, 10); x.fillRect(26, -18, 18, 10); x.lineWidth = 8; x.strokeStyle = INK; x.beginPath(); x.arc(0, 4, 36, 0.2, Math.PI - 0.2); x.stroke(); x.restore() }
      label(x, 790, 1040, 'MASK: OFF', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, ...M })
      hearts(x, t, 370, 760, P.t0 + 1.7, { n: 3, life: 1.4, spread: 120, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'Their favourite song, | *on repeat.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: DEEP, rot: 0.03 }, () => {
        x.save(); x.rotate(t * 2); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.fill(); x.fillStyle = LIB; x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.fillRect(40, -6, 30, 12); x.restore()
      })
      notes(x, t, 790, 720, { n: 4, cell: 7, col: PINK })
      label(x, 790, 1060, `REPLAY ×${1 + Math.floor(lt * 4)}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'A reminder: | they’re *so lovely.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const a = s => pop01(t, P.t0 + s, 0.25, 2)
      phone(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '✦ YOUR MATCH', headCol: PINK, lines: [['thinking of u', CREAM, a(0.6)], ['you’re lovely.', PINK, a(1.0)], ['that’s all ♥', CREAM, a(1.4)]], size: 24 })
      hearts(x, t, 370, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Cosy over | *cute.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: { x: -170, y: 0 },
    front(x, t, lt, P) {
      blanket(x, 370, 1010, 320, pop01(t, P.t0 + 0.5, 0.35, 2))
      label(x, 790, 820, 'OUTFIT: BLANKET', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, ...M })
      bubble(x, 790, 990, 'still iconic', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Tomorrow, | *the balance returns.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const tip = lt < 1.1 ? 0.8 + 0.1 * Math.sin(t * 4) : 0.8 * (1 - ease.outBack(prog(lt, 1.1, 1.6)))
      scale(x, 780, 980, 0.8 * pop01(t, P.t0 + 0.2, 0.35, 2), tip)
      sparkles(x, t, 790, 820, P.t0 + 1.6, 7, 170, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0233', key: 'C', accent: LIB, solo: S, ending: 'callback',
  title: 'What Libras need | *on a bad day.*',
  cameos: CAMEOS,
  group: { cap: 'Soft day. | *Softer heart.*', mood: 'heart' },
  last: {
    text: 'Blanket on. | *Bad day: over.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 540, 1150, 340 * k, { mood: lt > 1.4 ? 'heart' : 'sleepy', seed: 44, hops: [t0 + 1.4] })
      blanket(x, 540, 1290, 360, pop01(t, t0 + 0.8, 0.4, 2))
      sparkles(x, t, 540, 1120, t0 + 1.4, 8, 220, 0.4)
      hearts(x, t, 540, 960, t0 + 1.5, { n: 6, life: 1.8, spread: 220, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
