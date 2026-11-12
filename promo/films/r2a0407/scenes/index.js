// r2a0407: star_advice, ADVICE SOLO (virgo), "What Virgos need | *from a friend.*" (signs3kit social cut, music: lofi · F).
// Ending: callback (the friend with the magnifying glass noticed the haircut).
//   nine cards: noticed back · on time, early even · let someone help · the text read kindly · honesty as love
//   · a messy day, no judgement · soup for the helper · quiet hangs count · the friend profile says: enough
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, clock, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = '#7ee0a0'
const ST = { x: -170 }
const S = 'virgo'
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

/** a magnifying glass, lens centred on (cx, cy) */
function magnifier(x, cx, cy, r, k, rot = 0.6) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, r, 28, r * 1.3); x.fillStyle = BROWN; x.fillRect(-8, r + 6, 16, r * 1.3 - 12)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 12, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, r + 4, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(143,227,255,0.35)'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-r * 0.5, -r * 0.6, r * 0.25, r * 0.4)
  x.restore()
}
const WRENCH = ['.KK...KK.', 'KGGK.KGGK', 'KGGGKGGGK', '.KGGGGGK.', '..KGGGK..', '..KGGGK..', '..KGGGK..', '..KGGGK..', '..KGGGK..', '..KGGGK..', '..KGGGK..', '...KKK...']
const BOOK = ['KKKKKKKKKK', 'KBBBBKBBBK', 'KBBBBKBBBK', 'KBBBBKBBBK', 'KBBBBKBBBK', 'KKKKKKKKKK']
const SOCK = ['.KKKK...', '.KSSK...', '.KSSK...', '.KSSK...', '.KSSKKKK', 'KSSSSSSK', 'KSSSSSSK', '.KKKKKK.']

/** a bowl of soup with steam */
function soup(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 40, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffb34a'; x.beginPath(); x.ellipse(0, 0, 138, 30, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, 0); x.quadraticCurveTo(-140, 120, 0, 120); x.quadraticCurveTo(140, 120, 150, 0); x.fill()
  x.fillStyle = SKYB; x.beginPath(); x.moveTo(-138, 8); x.quadraticCurveTo(-128, 108, 0, 108); x.quadraticCurveTo(128, 108, 138, 8); x.fill()
  x.fillStyle = GREEN; for (const [a, b] of [[-60, -4], [20, 6], [70, -6]]) x.fillRect(a, b, 16, 10)
  x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 8; x.lineCap = 'round'
  for (let i = 0; i < 3; i++) { x.beginPath(); for (let j = 0; j <= 9; j++) { const yy = -40 - j * 14, xx = -50 + i * 50 + Math.sin(t * 4 + j * 0.7 + i) * 10; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You notice everything. | Friends *notice you, too.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 840, 960, 180 * k, { mood: 'sparkle', look: [-1, 0], seed: 13, glyph: false })
      magnifier(x, 700, 860, 60, pop01(t, P.t0 + 0.5, 0.35, 2), -0.7)
      lab(x, 790, 650, 'SPOTTED: NEW HAIRCUT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: GOLD, rot: 0.04, size: 30 })
    } },
  { sign: S, cap: 'Love a plan? | They *arrive on time.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clock(x, 790, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), 6, lt > 1.0 ? 55 : 50)
      lab(x, 790, 1050, 'EARLY, EVEN', pop01(t, P.t0 + 1.1, 0.3, 2.4), { bg: MINT, rot: -0.04, size: 40 })
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Always fixing things? | *Let someone help.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 850, 960, 180 * k, { mood: 'happy', look: [-1, 0], seed: 14, glyph: false })
      const p = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, WRENCH, { K: INK, G: '#c9c9d8' }, lerp(800, 640, p), 800, 20 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.8, outline: null })
      lab(x, 790, 650, 'HELP: ACCEPTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: GREEN, rot: 0.04 })
    } },
  { sign: S, cap: 'Rewrote the text twice? | They *read it kindly.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'DRAFT 14', headCol: ACC, lines: [
        ['hey! no rush but', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['haha love this', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
        ['you’re the best', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Your honesty? | *A love language.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'your tag | is sticking out', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 800, 960, 170 * k, { mood: lt > 1.4 ? 'heart' : 'wide', look: [-1, 0], seed: 15, glyph: false })
      lab(x, 790, 1140, 'FRIEND: GRATEFUL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Messy room, messy day? | *No judgement.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const cols = [PINK, SKYB, SUN, LAV, MINT]
      for (let i = 0; i < 5; i++) drawBits(x, SOCK, { K: INK, S: cols[i] }, 660 + (i % 3) * 120, 1040 - Math.floor(i / 3) * 130, 18 * k, { rot: (i - 2) * 0.3, outline: null })
      lab(x, 790, 1170, 'SOCKS: EVERYWHERE', pop01(t, P.t0 + 0.6, 0.3, 2), { bg: SUN, rot: -0.03, size: 28 })
      lab(x, 790, 700, 'JUDGEMENT-FREE ZONE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: MINT, rot: 0.04, size: 28 })
    } },
  { sign: S, cap: 'Always the helper? | Now *they bring soup.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      soup(x, t, 790, 920, pop01(t, P.t0 + 0.3, 0.35, 2))
      lab(x, 790, 1120, 'NO NOTES. PERFECT.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Need quiet? | *Quiet hangs count.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 1], star: ST,
    back(x, t, lt, P, F) { drawBits(x, BOOK, { K: INK, B: ACC }, F.x + 60, F.cy + 90, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { outline: null }) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'pisces', 800, 930, 180 * k, { mood: 'happy', look: [0, 1], seed: 16, glyph: false, tears: 1 }); drawBits(x, BOOK, { K: INK, B: PINK }, 800, 1020, 12 * k, { outline: null }) }
      lab(x, 790, 680, 'WORDS SAID: 0', pop01(t, P.t0 + 1.1, 0.3, 2.4), { bg: LAV, rot: 0.04 })
      lab(x, 790, 1140, 'VIBE: PERFECT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Feel like not enough? | You’re *more than enough.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = ACC; x.fillRect(-165, -190, 330, 60); txt(x, 'FRIEND PROFILE', 0, -160, { size: 28, font: MONO, weight: 700 })
        ;['kind', 'funny', 'enough'].forEach((s, i) => {
          txt(x, s, -40, -70 + i * 80, { size: 40, align: 'center' })
          if (lt > 0.6 + i * 0.35) txt(x, '✓', 100, -70 + i * 80, { size: 52, color: GREEN })
        })
      })
      sparkles(x, t, 790, 860, P.t0 + 1.6, 8, 210, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0407', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'What Virgos need | *from a friend.*',
  cameos: CAMEOS,
  group: { cap: 'Not a perfect friend. | *A kind one.*', mood: 'heart' },
  last: {
    text: 'Also, they noticed | *the new haircut.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 380, 1090, 280 * k, { mood: lt > 1.3 ? 'sparkle' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      magnifier(x, 720, 1040, 80, pop01(t, t0 + 0.6, 0.4, 2), -0.6)
      lab(x, 560, 1320, '10/10 HAIRCUT', pop01(t, t0 + 1.3, 0.3, 2.4), { bg: GOLD, rot: -0.03, size: 40 })
      sparkles(x, t, 380, 1000, t0 + 1.3, 7, 180, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
