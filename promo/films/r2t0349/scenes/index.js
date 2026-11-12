// r2t0349: THE SIGNS AS… v3, SOLO (virgo), "Virgos at a party | *be like.*" (signs3kit social cut, music: lofi · D).
// Ending: callback (the double-dipper is still on the list).
//   nine cards: arrived early, cleaned the host's kitchen · brought their own coasters · labelled every bowl · saw the
//   double-dip from across the room · asked everyone's sign, made a seating chart · corrected grammar, kindly · needed a
//   break, found the host's cat · danced once, rated their form · left at 10, sent a thank-you note
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', STEEL = '#9aa5c4', ACC = '#8fe6a0', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 34, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, color, font: MONO, weight: 700 })
const SPRAY = ['..KKKK.', '..KWWK.', 'KKKKKK.', '...BB..', '..BBBB.', '..BBBB.', '..BWWB.', '..BBBB.', '..BBBB.']
const COASTER = ['.CCCCC.', 'CCWWWCC', 'CWCCCWC', 'CCWWWCC', '.CCCCC.']
const BOWL = ['YYYYYYYYYY', 'BBBBBBBBBB', '.BBBBBBBB.', '..BBBBBB..']
const CAT = ['K...K....', 'KK.KK....', 'KKKKK....', 'KWKWK...K', 'KKPKK..K.', '.KKKKKKK.', '.KKKKKKK.', '.K.K.K.K.']
const ENVELOPE = ['WWWWWWWWWWWW', 'WKWWWWWWWWKW', 'WWKWWWWWWKWW', 'WWWKWWWWKWWW', 'WWWWKPPKWWWW', 'WWWWWPPWWWWW', 'WWWWWWWWWWWW']
const BOOK = ['KKKKKKKK', 'KWWWWWWK', 'KWKKKKWK', 'KWWWWWWK', 'KWKKKWWK', 'KWWWWWWK', 'KKKKKKKK']
const ST = { x: -180 }

const S = 'virgo'
const CAMEOS = [
  { sign: S, cap: 'Arrived early. | *Cleaned the host’s kitchen.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      drawBits(x, SPRAY, { K: INK, W: BONE, B: SKYB }, F.x + 150, F.cy, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      L(x, 800, 680, '6:15 PM (PARTY: 8)', pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.05, 32)
      if (lt > 0.8) sparkles(x, t, 800, 920, P.t0 + 0.8, 8, 190, 0.3, [MINT, BONE, SKYB])
      L(x, 800, 1090, 'KITCHEN: GLEAMING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'No coasters? | *Brought their own.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(8, Math.floor(clamp((lt - 0.3) / 1.0) * 8) + 1)
      for (let i = 0; i < n; i++) drawBits(x, COASTER, { C: i % 2 ? ACC : '#c98a5a', W: BONE }, 800, 1060 - i * 34, 18, { sy: 0.5 })
      L(x, 800, 680, 'A SET OF TWELVE', pop01(t, P.t0 + 1.3, 0.3, 2.4), BONE, 0.04, 34)
    } },
  { sign: S, cap: 'Snack table chaos? | *Labelled every bowl.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const NAMES = ['CHIPS', 'DIP', 'NUTS (!)']
      NAMES.forEach((n, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2)
        drawBits(x, BOWL, { Y: ['#ffd23a', MINT, '#c98a5a'][i], B: [SKYB, PINK, LAV][i] }, 650 + i * 150, 1040, 13 * k)
        L(x, 650 + i * 150, 920 - (i % 2) * 50, n, pop01(t, P.t0 + 0.8 + i * 0.25, 0.3, 2.4), BONE, (i - 1) * 0.08, 30)
      })
      L(x, 800, 680, 'ALLERGENS: LISTED', pop01(t, P.t0 + 1.7, 0.3, 2.4), ACC, 0.04, 30)
    } },
  { sign: S, cap: 'Someone double-dipped. | *Virgo saw it.*', mood: lt => lt > 0.9 ? 'wide' : 'neutral', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 830, 960, 150 * k, { mood: 'happy', seed: 13, glyph: false })
      drawBits(x, BOWL, { Y: MINT, B: PINK }, 870, 1080, 12 * k)
      L(x, 600, 700, 'ZOOM ×40', pop01(t, P.t0 + 0.9, 0.3, 2.4), RED, -0.05, 36, BONE)
      L(x, 800, 820, 'INCIDENT LOGGED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Asked everyone’s sign. | *Made a seating chart.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = BONE; x.fillRect(-162, -162, 324, 324)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEATING', 0, -128)
        const G = ['♈︎', '♎︎', '♉︎', '♏︎', '♋︎', '♑︎', '♊︎', '♐︎', '♌︎', '♒︎', '♓︎', '♍︎']
        x.font = `700 34px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`
        G.forEach((g, i) => { if (lt > 0.4 + i * 0.08) { x.fillStyle = i % 2 ? '#6b62a8' : '#2fa86a'; x.fillText(g, -110 + (i % 4) * 74, -60 + Math.floor(i / 4) * 80) } })
        x.restore()
      }
      L(x, 800, 1110, 'COMPATIBILITY: SORTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, -0.04, 28)
    } },
  { sign: S, cap: 'Small talk? | *Fixed their grammar. Kindly.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, '“your so fun!”', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      if (lt > 0.9) { const p = clamp((lt - 0.9) / 0.2); x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(700, 726); x.lineTo(700 + 82 * p, 726); x.stroke(); x.restore() }
      L(x, 800, 900, '*you’re ♡', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, 0.05, 44)
      bubble(x, 800, 1080, 'you too though!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Needed a break. | *Found the host’s cat.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAT, { K: '#3a3166', W: GOLD, P: PINK }, 800, 990, 20 * pop01(t, P.t0 + 0.4, 0.35, 2))
      bubble(x, 800, 740, 'finally, | a real friend', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 370, 760, P.t0 + 1.4, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Danced once. | *Reviewed their own form.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', star: ST, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      L(x, 800, 700, 'FORM: 6/10', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.05, 48)
      L(x, 800, 860, 'NOTES: ELBOWS', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, -0.04, 32)
      L(x, 800, 980, 'PRACTICE: TONIGHT', pop01(t, P.t0 + 1.9, 0.3, 2.2), ACC, 0.04, 30)
    } },
  { sign: S, cap: 'Left at 10 p.m. | *Sent a thank-you note.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.9, 1.6))
      drawBits(x, ENVELOPE, { W: BONE, K: STEEL, P: PINK }, lerp(800, 860, fly), lerp(900, 760, fly), 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: lerp(0, 0.2, fly) })
      L(x, 800, 1080, 'HANDWRITTEN. OBVIOUSLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, -0.04, 28)
      if (lt > 1.6) hearts(x, t, 860, 720, P.t0 + 1.6, { n: 4, life: 1.2, spread: 120, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0349', key: 'D', accent: ACC, solo: 'virgo', ending: 'callback',
  title: 'Virgos at a party | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'The party? | *Fully audited.*', mood: 'squint' },
  last: {
    text: 'The double-dipper? | *Still on the list.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 1080, 280 * k, { mood: lt > 1.2 ? 'squint' : 'neutral', seed: 7, look: [1, 0], hops: [t0 + 1.2] })
      const kb = pop01(t, t0 + 0.6, 0.35, 2)
      if (kb > 0.01) {
        x.save(); x.translate(740, 1080); x.rotate(0.06); x.scale(kb, kb)
        x.fillStyle = INK; x.fillRect(-130, -150, 260, 300); x.fillStyle = BONE; x.fillRect(-122, -142, 244, 284)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE LIST', 0, -96)
        x.font = `700 28px ${INTER}`; x.textAlign = 'left'; x.fillText('1. dip person', -100, -30)
        x.fillStyle = STEEL; x.fillRect(-100, 30, 180, 10); x.fillRect(-100, 80, 140, 10)
        x.restore()
      }
      if (lt > 1.1) L(x, 740, 1260, 'LIST: 1 NAME', pop01(t, t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 34)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
