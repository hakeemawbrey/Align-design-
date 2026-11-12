// r2a0347: star_advice, ADVICE SOLO (taurus), "How to apologise | *to a Taurus.*" (signs3kit social cut, music: lofi · F).
// Ending: callback (the croissants come back).
//   nine cards: lead with croissants · forgiveness loads slowly (snail) · skip the "sry" text · they can tell if you mean
//   it · fix the mug, not just the words · a blanket says sorry too · remember their order · the stubborn face is melting
//   inside · once they forgive, it's real
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', STEEL = '#9aa5c4', ACC = '#9fe06a', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, color, font: MONO, weight: 700 })
const CROI = ['....CCCC....', '..CCDCCDCC..', '.CCDCCCCDCC.', 'CCDCCCCCCDCC', 'CDCCCCCCCCDC', '.CC......CC.']
const CROI_C = { C: '#e8a64a', D: '#b86a2a' }
const SNAIL = ['.....SSS.....', '....SWWWS....', '...SWSSSWS...', '...SWSWSWS.KK', '...SWSSWWS.YK', 'YYYYSSSSYYYY.', 'YYYYYYYYYYY..']
const MUG = ['.WWWWWW..', '.WPWWPW..', '.WWWWWWWW', '.WPWWPW.W', '.WWWWWWWW', '.WWWWWW..', '..WWWW...']
const BLANKET = ['PPPPPPPPPPPPPP', 'PWPPWPPWPPWPPW', 'PPPPPPPPPPPPPP', 'PPWPPWPPWPPWPP', 'PPPPPPPPPPPPPP']
const CUP = ['.WWWWWW.', 'KKKKKKKK', '.BBBBBB.', '.BBBBBB.', '.BWWWWB.', '.BBBBBB.', '..BBBB..']
const PHONE = ['KKKKKKK', 'KGGGGGK', 'KGGGGGK', 'KGGGGGK', 'KGGGGGK', 'KKKKKKK', 'KKWWWKK', 'KKKKKKK']
const ST = { x: -180 }

const S = 'taurus'
const CAMEOS = [
  { sign: S, cap: 'Lead with croissants. | *It genuinely helps.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (const [i, cx, cy] of [[0, 700, 990], [1, 880, 990], [2, 790, 880]]) drawBits(x, CROI, CROI_C, cx, cy, 13 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.15 })
      bubble(x, 790, 700, 'i’m sorry | (and hungry?)', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1120, 'MOOD: SOFTENING', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, 0.04, 32)
    } },
  { sign: S, cap: 'Give them time. | *Forgiveness loads slowly.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SNAIL, { S: '#c98a5a', W: '#ffd9a0', Y: '#c9e88a', K: INK }, 700 + lt * 40, 980, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const p = clamp((lt - 0.3) / 1.9)
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 740); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -30, 340, 60); x.fillStyle = '#2a2350'; x.fillRect(-162, -22, 324, 44)
        x.fillStyle = ACC; x.fillRect(-162, -22, 324 * p, 44); x.restore()
      }
      L(x, 790, 640, 'FORGIVENESS…', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, -0.04, 32)
      L(x, 790, 1120, 'WORTH THE WAIT', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Skip the “sry” text. | *Say it face to face.*', mood: lt => lt > 1.4 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: '#2a2350', G: BONE, W: STEEL }, 620, 800, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      if (lt > 0.2) { x.save(); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.globalAlpha = clamp((lt - 0.3) * 3); x.fillText('sry', 620, 780); x.restore() }
      if (lt > 0.8) { const p = clamp((lt - 0.8) / 0.2); x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(550, 710); x.lineTo(550 + 140 * p, 710 + 180 * p); x.stroke(); x.restore() }
      const k = pop01(t, P.t0 + 1.1, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 840, 960, 190 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 840, 730, 'i’m really sorry', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
  { sign: S, cap: 'They can tell | *if you mean it.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = BONE; x.fillRect(-142, -102, 284, 204)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('SINCERITY METER', 0, -70)
        x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.arc(0, 60, 100, Math.PI, 0); x.stroke()
        const a = Math.PI + lerp(0.2, 2.8, ease.outBack ? clamp((lt - 0.6) / 0.8) : 0)
        x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 60); x.lineTo(Math.cos(a) * 86, 60 + Math.sin(a) * 86); x.stroke()
        x.restore()
      }
      L(x, 790, 1060, 'READING: GENUINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, 0.04, 32)
    } },
  { sign: S, cap: 'Words are nice. | *Fixing it is nicer.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fixed = lt > 1.2, k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (!fixed) {
        drawBits(x, MUG, { W: BONE, P: PINK }, 760, 900, 22 * k, { rot: -0.2 })
        x.save(); x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(720, 830); x.lineTo(760, 880); x.lineTo(730, 920); x.lineTo(770, 970); x.stroke(); x.restore()
        L(x, 790, 680, 'THEIR FAVOURITE MUG', pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.04, 28)
      } else {
        drawBits(x, MUG, { W: BONE, P: PINK }, 790, 900, 22, { rot: 0 })
        x.save(); x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.moveTo(750, 830); x.lineTo(790, 880); x.lineTo(760, 920); x.lineTo(800, 970); x.stroke(); x.restore()
        sparkles(x, t, 790, 900, P.t0 + 1.25, 7, 170, 0.4)
        L(x, 790, 680, 'GLUED. WITH GOLD.', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 32)
      }
    } },
  { sign: S, cap: 'Comfort counts. | *A blanket says sorry too.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', star: { x: -160, y: 20 },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.3, 0.9))
      if (lt > 0.25) drawBits(x, BLANKET, { P: LAV, W: BONE }, F.x, lerp(560, F.cy + 70, d), 24, { rot: 0.03 })
      L(x, 800, 720, 'COZY APOLOGY', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, 0.05, 36)
      bubble(x, 800, 1060, '…fine. stay.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Remember their order. | *Details say sorry.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CUP, { W: BONE, K: INK, B: '#c98a5a' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'OAT, NO FOAM, EXTRA HOT', pop01(t, P.t0 + 0.6, 0.3, 2.2), BONE, -0.04, 26)
      L(x, 790, 1110, 'REMEMBERED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), ACC, 0.04, 34)
      hearts(x, t, 370, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Stubborn face? | *It’s melting inside.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: lt => lt > 1.6 ? [0, 0] : [-1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 760, 'OUTSIDE: STONE', pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, -0.04, 34)
      L(x, 790, 900, 'INSIDE: MARSHMALLOW', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.04, 34)
      if (lt > 1.6) hearts(x, t, 370, 800, P.t0 + 1.6, { n: 5, life: 1.4, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Once they forgive? | *It’s real. And it lasts.*', mood: 'heart', look: [1, 0], star: { x: -150 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 720, 900, 230 * k, { mood: lt > 0.9 ? 'heart' : 'happy', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.1] })
      hearts(x, t, 540, 760, P.t0 + 0.9, { n: 7, life: 2.0, spread: 300, cell: 8, seed: 3 })
      L(x, 790, 1120, 'BESTIES AGAIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0347', key: 'F', accent: ACC, solo: 'taurus', ending: 'callback',
  title: 'How to apologise | *to a Taurus.*',
  cameos: CAMEOS,
  group: { cap: 'Patient. Gentle. Real. | *That’s the apology.*', mood: 'heart' },
  last: {
    text: 'And the croissants? | *Still essential.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 380, 1080, 280 * k, { mood: lt > 1.0 ? 'heart' : 'squint', seed: 7, look: [1, 0], hops: [t0 + 1.1, t0 + 1.8] })
      for (const [i, cx, cy] of [[0, 650, 1180], [1, 850, 1180], [2, 750, 1060]]) drawBits(x, CROI, CROI_C, cx, cy, 15 * pop01(t, t0 + 0.5 + i * 0.2, 0.35, 2), { rot: (i - 1) * 0.2 })
      if (lt > 1.0) sparkles(x, t, 740, 1100, t0 + 1.0, 7, 160, 0.3)
      if (lt > 1.4) hearts(x, t, 560, 1000, t0 + 1.4, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
