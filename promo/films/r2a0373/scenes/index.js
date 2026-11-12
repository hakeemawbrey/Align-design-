// r2a0373: star_advice, ADVICE SOLO (libra), "What Libras need | *from a friend.*" (signs3kit social cut, music: lofi · C). Ending: lesson.
//   nine Libra truths, each with a warm reframe and one gag: can't pick a restaurant, a friend just picks
//   · hate conflict, a friend says it gently · always the peacemaker, let someone keep yours · outfit advice, "both, truly"
//   · said "I don't mind", they ask again · love pretty things, they notice the details · need balance, they share the effort
//   · big date, they check the chart · over-apologising, "you're fine"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#ff9ad5', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

/** a friend star popping in beside the Libra */
const friend = (x, t, id, cx, cy, s, k, mood, seed, extra = {}) => k > 0.01 && signChar(x, t, id, cx, cy, s * k, { mood, look: [-1, 0], seed, glyph: false, ...extra })
/** a menu card with two dishes */
function menu(x, cx, cy, k, pick) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -150, 276, 316)
  x.fillStyle = INK; x.fillRect(-142, -166, 284, 324); x.fillStyle = CREAM; x.fillRect(-134, -158, 268, 308)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -118)
  x.font = `700 28px ${MONO}`; x.fillText('noodles', 0, -40); x.fillText('tacos', 0, 40)
  if (pick > 0) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 40, 110 * pick, 36 * pick, -0.05, 0, Math.PI * 2); x.stroke() }
  x.restore()
}
const DOVE = ['....WW.....', '...WWWW....', 'KWWWKWW....', '..WWWWWW...', '...WWWWWWW.', '...WWWWWWWW', '....WWWWWW.', '......WW...']
const SHIRT = ['CC...CC', 'CCCCCCC', '.CCCCC.', '.CCCCC.', '.CCCCC.', '.CCCCC.']
const VASE = ['.F...F..', 'FYF.FYF.', '.F.G.F..', '...G....', '..GGG...', '.VVVVV..', 'VVVVVVV.', 'VVVVVVV.', '.VVVVV..']
const SCALE = ['......K......', '.....KKK.....', 'KKKKKKKKKKKKK', 'K.....K.....K', 'K.....K.....K', 'KK....K....KK', 'GGG...K...GGG', '......K......', '....KKKKK....']
const MUG = ['KKKKKK.', 'KMMMMKK', 'KMWMMK.K', 'KMMMMKK', '.KKKK..']
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.4)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a struck-through bubble */
function struck(x, cx, cy, text, k, p) {
  bubble(x, cx, cy, text, k, { size: 34, col: '#9aa5c4', tail: 'bl' })
  if (p > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 170, cy + 8); x.lineTo(cx - 170 + 340 * clamp(p), cy - 8); x.stroke(); x.restore() }
}

const S = 'libra', ST = { x: -190 }
const CAMEOS = [
  { sign: S, cap: 'Can’t pick a restaurant? | A friend *just picks.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      menu(x, 760, 820, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.9) / 0.3))
      friend(x, t, 'leo', 900, 1050, 150, pop01(t, P.t0 + 0.6, 0.3, 2), 'wink', 12)
      L(x, 700, 1130, 'DECIDED ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Hate conflict? | A friend *says it gently.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 820, 1000, 190, pop01(t, P.t0 + 0.2, 0.3, 2), 'happy', 13)
      bubble(x, 780, 700, 'tiny thing, | no stress…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: CREAM, tail: 'br' })
      L(x, 500, 610, 'TONE: SOFT', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 30)
    } },
  { sign: S, cap: 'Always the peacemaker? | Let *someone keep yours.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.3, 1.4))
      drawBits(x, DOVE, { W: CREAM, K: INK }, lerp(400, 800, fly), lerp(760, 820, fly) - Math.sin(Math.PI * fly) * 120, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 })
      friend(x, t, 'taurus', 820, 1020, 170, pop01(t, P.t0 + 0.9, 0.3, 2), 'happy', 14)
      L(x, 790, 640, 'PEACE: COVERED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'This or that outfit? | *“Both. Truly.”*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHIRT, { C: SKYB }, 690, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      drawBits(x, SHIRT, { C: ACC }, 880, 840, 22 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.08 })
      L(x, 690, 1000, '10/10', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.05, 40)
      L(x, 880, 1000, '10/10', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.05, 40)
    } },
  { sign: S, cap: 'Said “I don’t mind”? | They *ask again.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 520, 620, 'I don’t mind!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      friend(x, t, 'virgo', 840, 1030, 170, pop01(t, P.t0 + 0.6, 0.3, 2), 'happy', 15)
      bubble(x, 790, 800, 'but what do | YOU want?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: MINT, tail: 'br' })
    } },
  { sign: S, cap: 'Love pretty things? | They *notice the details.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, VASE, { F: PINK, Y: GOLD, G: '#5fd068', V: SKYB }, 740, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, 'new vase?! | gorgeous.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: CREAM, tail: 'bl' })
      sparkles(x, t, 740, 900, P.t0 + 0.9, 7, 140, 0.2)
    } },
  { sign: S, cap: 'Need things fair? | They *share the effort.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const tilt = lt < 1.0 ? 0.12 : 0.12 * (1 - ease.outCubic(prog(lt, 1.0, 1.4)))
      x.save(); x.translate(790, 900); x.rotate(-tilt); x.translate(-790, -900)
      drawBits(x, SCALE, { K: GOLD, G: GOLD }, 790, 900, 22 * k)
      drawBits(x, MUG, { K: INK, M: ACC, W: CREAM }, 660, 800, 12 * k)
      if (lt > 0.9) drawBits(x, MUG, { K: INK, M: SKYB, W: CREAM }, 920, 800, 12 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      x.restore()
      L(x, 790, 1120, 'SPLIT: 50/50', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Big date? | They *check the chart.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 800, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 640, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.4, 0.3, 2), LAV, -0.04, 30)
      friend(x, t, 'gemini', 880, 1060, 140, pop01(t, P.t0 + 0.8, 0.3, 2), 'sparkle', 16)
      bubble(x, 640, 1060, 'ooh, cute', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
  { sign: S, cap: 'Over-apologising? | They say *“you’re fine.”*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      struck(x, 780, 680, 'sorry sorry | sorry!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), clamp((lt - 1.0) / 0.3))
      friend(x, t, 'aquarius', 840, 1040, 160, pop01(t, P.t0 + 0.5, 0.3, 2), 'happy', 17)
      L(x, 790, 880, 'NOTHING TO FORGIVE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2a0373', key: 'C', accent: ACC, solo: 'libra', ending: 'lesson',
  title: 'What Libras need | *from a friend.*',
  cameos: CAMEOS,
  group: { cap: 'Fair to everyone. | *Including you.*', mood: 'heart' },
  lesson: { text: 'Your friends want | *your* opinion too.', chip: 'STATUS: HEARD' },
  last: {
    text: 'Pick the restaurant. | We *promise* to eat.',
    draw(x, t, lt) {
      const t0 = t - lt
      menu(x, 540, 1200, pop01(t, t0 + 0.7, 0.35, 2) * 0.8, clamp((lt - 1.4) / 0.3))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
