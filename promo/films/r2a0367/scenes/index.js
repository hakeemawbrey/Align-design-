// r2a0367: star_advice, ADVICE SOLO, "How to check in | *on a Virgo.*" (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine gentle ways to check in on a Virgo, each a relatable truth + a warm reframe. Ending: callback.
//   0.0–3.6    "How to check in | *on a Virgo.*"
//   3.6–37.8   nine cards: ask how they are, not what they did · help without redoing their system
//              · tell them it's good enough (the crooked frame) · make the tea exactly right · notice the effort out loud
//              · plan the hangout for them · let them vent in bullet points · remind them rest is productive
//              · say thank you, they keep it all running
//  37.8        "Be specific. | *That’s love to them.*"
//  41.2        CALLBACK: "The nap went | *to schedule.*"  the pillow comes back, NAP: COMPLETE ✓.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

// ── props
/** a long to-do list, every box ticked */
function todo(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const h = 60 + n * 46
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, h + 10)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, h + 16); x.fillStyle = CREAM; x.fillRect(-126, -196, 252, h)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TO DO', 0, -168)
  for (let i = 0; i < n; i++) { const y = -128 + i * 46; x.fillStyle = INK; x.fillRect(-104, y - 12, 24, 24); x.fillStyle = MINT; x.fillRect(-100, y - 8, 16, 16); x.fillStyle = '#c9c2e6'; x.fillRect(-64, y - 4, 150 - (i % 3) * 30, 8) }
  x.restore()
}
/** colour-coded storage boxes */
function boxes(x, cx, cy, k) {
  if (k <= 0.01) return
  const C = [PINK, SKYB, GOLD, MINT, LAV, '#ffb34a']
  for (let i = 0; i < 6; i++) {
    const bx = cx + ((i % 3) - 1) * 130, by = cy + Math.floor(i / 3) * 120 - 60
    x.save(); x.translate(bx, by); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-60, -50, 120, 100); x.fillStyle = C[i]; x.fillRect(-52, -42, 104, 84)
    x.fillStyle = CREAM; x.fillRect(-30, -12, 60, 24); x.restore()
  }
}
/** a picture frame hung slightly crooked */
function frame(x, t, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.strokeStyle = '#9aa0b4'; x.lineWidth = 4; x.beginPath(); x.moveTo(-80, -120); x.lineTo(0, -190); x.lineTo(80, -120); x.stroke()
  x.fillStyle = INK; x.fillRect(-150, -130, 300, 240); x.fillStyle = WOOD; x.fillRect(-142, -122, 284, 224)
  x.fillStyle = '#8fd3ff'; x.fillRect(-118, -98, 236, 176)
  x.fillStyle = '#5fd068'; x.fillRect(-118, 30, 236, 48); x.fillStyle = GOLD; x.fillRect(50, -70, 40, 40)
  x.restore()
}
const CUP = ['.S.S....', '..S.S...', 'WWWWWW..', 'WTTTTWWW', 'WTTTTW.W', 'WTTTTWWW', 'WWWWWW..', '.WWWW...']
const CUP_C = { S: '#e8e4f8', W: CREAM, T: '#c98f5a' }
const GOLDSTAR = ['....Y....', '...YYY...', 'YYYYWYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY']
/** a calendar with one slot circled */
function calendar(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = CREAM; x.fillRect(-162, -142, 324, 284)
  x.fillStyle = RED; x.fillRect(-162, -142, 324, 54); x.fillStyle = BONE; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -114)
  x.fillStyle = '#c9c2e6'; for (let i = 0; i < 4; i++) x.fillRect(-140, -60 + i * 50, 280, 4)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.fillText('2pm  you + me', -136, 15)
  if (p > 0) { x.strokeStyle = PINK; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 15, 170 * 0.9, 34, 0, 0, Math.PI * 2 * p); x.stroke() }
  x.restore()
}
const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWLWWWWWWLWWW', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const PILLOW_C = { W: CREAM, L: LAV }
const GEAR = ['..K.KK.K..', '.KKKKKKKK.', 'KKGGGGGGKK', '.KGGKKGGK.', 'KKGK..KGKK', 'KKGK..KGKK', '.KGGKKGGK.', 'KKGGGGGGKK', '.KKKKKKKK.', '..K.KK.K..']

const S = 'virgo'
const CAMEOS = [
  { sign: S, cap: 'Ask how they are. | *Not what they did.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      todo(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), Math.min(6, 1 + Math.floor(clamp(lt / 1.0) * 6)))
      bubble(x, 520, 620, 'but how | are YOU?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Help out. | *Keep their system.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      boxes(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1100, 'SYSTEM: RESPECTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD)
    } },
  { sign: S, cap: 'Tell them it’s | *good enough.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      frame(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 0.12)
      L(x, 790, 1100, 'CROOKED = CUTE', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: S, cap: 'Make the tea. | *Exactly how they like it.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 780, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 660, '3 MIN · NO SUGAR', pop01(t, P.t0 + 0.8, 0.3, 2.4), MINT, 0.04)
      L(x, 790, 1110, 'PERFECT ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.05, 40)
    } },
  { sign: S, cap: 'Notice the effort. | *Out loud.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GOLDSTAR, { Y: GOLD, W: '#fff' }, 790, 830, 30 * pop01(t, P.t0 + 0.9, 0.35, 2.2), { rot: 0.1 * Math.sin(t * 3) })
      sparkles(x, t, 790, 830, P.t0 + 1.2, 8, 170, 0.3)
      bubble(x, 790, 1080, 'you worked SO hard', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Plan the hangout | *so they don’t have to.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calendar(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.8) / 0.6))
      L(x, 790, 1110, 'ALREADY SORTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT)
    } },
  { sign: S, cap: 'Let them vent. | *In bullet points.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const pts = ['• the email', '• the dishes', '• that one guy', '• also, the dishes']
      pts.forEach((p, i) => bubble(x, 790, 620 + i * 120, p, pop01(t, P.t0 + 0.3 + i * 0.35, 0.25, 2.2), { size: 32, col: i % 2 ? LAV : BONE, tail: 'bl' }))
      if (lt > 1.9) bubble(x, 470, 1120, 'go on ♡', pop01(t, P.t0 + 1.9 * (3.1 / 2.4) + 0.0, 0.25, 2.2), { size: 32, col: PINK, tail: 'br' })
    } },
  { sign: S, cap: 'Remind them | *rest is productive too.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', star: ST,
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 790, 950, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 680, 'NAP: SCHEDULED', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, 0.04, 36)
      if (lt > 1.4) { x.fillStyle = BONE; x.font = `800 ${40 + 6 * Math.sin(t * 3)}px ${INTER}`; x.fillText('z', 520, 700 - (t * 30) % 60); x.fillText('Z', 560, 640 - (t * 30) % 60) }
    } },
  { sign: S, cap: 'Say thank you. | *They keep it all running.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, GEAR, { K: INK, G: '#9aa5c4' }, 740, 820, 18 * k, { rot: t * 1.2 })
      drawBits(x, GEAR, { K: INK, G: GOLD }, 870, 940, 14 * k, { rot: -t * 1.6 })
      L(x, 790, 1110, 'THANK YOU ♥', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 38)
      if (lt > 1.4) hearts(x, t, 560, 800, P.t0 + 1.5, { n: 4, life: 1.4, spread: 100, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0367', key: 'F', accent: ACC, solo: 'virgo', ending: 'callback',
  title: 'How to check in | *on a Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Be specific. | *That’s love to them.*', mood: 'heart' },
  last: {
    text: 'The nap went | *to schedule.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      drawBits(x, PILLOW, PILLOW_C, 560, 1250, 30 * k)
      signChar(x, t, 'virgo', 560, 1090, 320 * k, { mood: 'sleepy', seed: 33 })
      if (lt > 1.0) { x.fillStyle = BONE; x.font = `800 ${56 + 6 * Math.sin(t * 3)}px ${INTER}`; x.fillText('z', 780, 920 - (t * 30) % 60); x.fillText('Z', 830, 850 - (t * 30) % 60) }
      label(x, 560, 1420, 'NAP: COMPLETE ✓', pop01(t, t0 + 1.5, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
