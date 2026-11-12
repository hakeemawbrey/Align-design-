// r2t0346: THE SIGNS AS… v3, ROLLCALL, "The signs | *making the bed.*" (signs3kit social cut, music: lofi · C). Ending: group.
//   ♈ made in three seconds, pillow on the floor · ♉ fourteen pillows, all essential · ♊ half made, then a new match
//   · ♋ tucked in every plushie · ♌ made it, waited for applause · ♍ ironed sheets, measured the fold · ♎ couldn't pick
//   a duvet, used both · ♏ all-black sheets, made in the dark · ♐ sleeps in a hammock · ♑ 5 a.m., hotel corners
//   · ♒ sleeps sideways, made it sideways · ♓ cried, it's so cozy · group: "Bed's made. | *Back in it.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', STEEL = '#9aa5c4', ACC = '#8fd0ff'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 34, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, color, font: MONO, weight: 700 })

/** a pixel bed seen from the side: frame, mattress, blanket, pillow */
function bed(x, cx, cy, k, { w = 360, blanket = SKYB, blanket2 = null, pillow = BONE, pillowOn = true, rot = 0, sheet = '#fff4e2', frame = BROWN, mess = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -40, w, 150)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -110, 36, 230); x.fillRect(-w / 2 - 8, 10, w + 16, 70); x.fillRect(w / 2 - 28, -50, 36, 170)
  x.fillStyle = frame; x.fillRect(-w / 2, -102, 20, 214); x.fillRect(-w / 2, 18, w, 54); x.fillRect(w / 2 - 20, -42, 20, 154)
  x.fillStyle = INK; x.fillRect(-w / 2 + 16, -34, w - 32, 60)
  x.fillStyle = sheet; x.fillRect(-w / 2 + 22, -28, w - 44, 48)
  if (blanket2) {
    x.fillStyle = blanket; x.fillRect(-w / 2 + 110, -34 - mess * 8, (w - 132) / 2, 62)
    x.fillStyle = blanket2; x.fillRect(-w / 2 + 110 + (w - 132) / 2, -34, (w - 132) / 2, 62)
  } else {
    x.fillStyle = blanket; x.fillRect(-w / 2 + 110, -34 - mess * 10, w - 132, 62 + mess * 10)
    x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(-w / 2 + 110, -34 - mess * 10, w - 132, 10)
  }
  if (pillowOn) { x.fillStyle = INK; x.fillRect(-w / 2 + 24, -64, 84, 40); x.fillStyle = pillow; x.fillRect(-w / 2 + 30, -58, 72, 28) }
  x.restore()
}
const PILLOW = ['.WWWWWWWW.', 'WWWWWWWWWW', 'WWWWWWWWWW', '.WWWWWWWW.']
const BUN = ['.B...B.', '.BB.BB.', '.BBBBB.', 'BBKBKBB', 'BBBPBBB', '.BBBBB.']
const RULER = ['YYYYYYYYYYYYYY', 'YKYKYKYKYKYKYK', 'YKY.YKY.YKY.YK', 'YYYYYYYYYYYYYY']
const PHONE = ['KKKKKKK', 'KGGGGGK', 'KGGGGGK', 'KGGGGGK', 'KGGGGGK', 'KKKKKKK', 'KKWWWKK', 'KKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Made in three seconds. | *Pillow on the floor.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      bed(x, 780, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { blanket: RED, pillowOn: false, mess: 1 })
      const fall = ease.outCubic(prog(lt, 0.5, 1.0))
      drawBits(x, PILLOW, { W: BONE }, lerp(660, 600, fall), lerp(820, 1080, fall), 10 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: fall * 0.5 })
      L(x, 790, 640, '0:03 · DONE', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 40)
    } },
  { sign: 'taurus', cap: 'Fourteen pillows. | *All essential.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      const COLS = [PINK, MINT, LAV, BONE, SKYB, GOLD, '#ffb34a']
      const n = Math.min(14, Math.floor(clamp((lt - 0.2) / 1.3) * 14) + 1)
      for (let i = 0; i < n; i++) drawBits(x, PILLOW, { W: COLS[i % 7] }, 790 + ((i % 2) ? 26 : -26) + Math.sin(i * 1.7) * 14, 1120 - i * 34, 12, { rot: Math.sin(i * 2.3) * 0.12 })
      L(x, 790, 600, `PILLOW ${n}/14`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Made half the bed. | *Then: a new match.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: lt => lt > 1.0 ? [1, 0] : [0, 1], star: { x: -170 },
    front(x, t, lt, P) {
      bed(x, 790, 1000, pop01(t, P.t0 + 0.15, 0.3, 2), { blanket: '#ffd23a', blanket2: '#5b4a8a' })
      drawBits(x, PHONE, { K: '#2a2350', G: MINT, W: STEEL }, 800, 720, 16 * pop01(t, P.t0 + 0.8, 0.3, 2.2), { rot: 0.08 })
      L(x, 800, 560, '♡ NEW MATCH', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.05, 34)
      L(x, 800, 1150, 'BED: 50%', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Tucked in the plushies. | *All of them.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bed(x, 790, 960, k, { blanket: '#c9e8ff', pillowOn: false })
      const COLS = ['#c98a5a', PINK, LAV, MINT]
      for (let i = 0; i < 4; i++) drawBits(x, BUN, { B: COLS[i], K: INK, P: PINK }, 690 + i * 66, 912, 7 * pop01(t, P.t0 + 0.5 + i * 0.18, 0.3, 2))
      bubble(x, 790, 700, 'night night, | everyone', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Made the bed. | Waited for *applause.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bed(x, 790, 980, pop01(t, P.t0 + 0.2, 0.3, 2), { blanket: '#ffb34a', pillow: GOLD })
      sparkles(x, t, 790, 960, P.t0 + 0.6, 7, 190, 0.3)
      L(x, 790, 650, 'APPLAUSE?', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.05, 48)
      bubble(x, 420, 600, 'any second now', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Ironed the sheets. | *Measured the fold.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bed(x, 790, 980, pop01(t, P.t0 + 0.2, 0.3, 2), { blanket: '#d8f5e4' })
      drawBits(x, RULER, { Y: '#ffd23a', K: INK }, 820, 860, 16 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.02 })
      L(x, 800, 660, 'FOLD: 45.0°', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.05, 40)
      if (lt > 1.4) sparkles(x, t, 790, 960, P.t0 + 1.4, 7, 180, 0.5, [MINT, BONE, SKYB])
    } },
  { sign: 'libra', cap: 'Couldn’t pick a duvet. | *Used both.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: lt => lt > 1.4 ? [0, 0] : [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const both = lt > 1.4
      bed(x, 790, 980, pop01(t, P.t0 + 0.2, 0.3, 2), both ? { blanket: PINK, blanket2: SKYB } : { blanket: Math.floor(lt * 2.6) % 2 ? SKYB : PINK })
      bubble(x, 790, 700, both ? 'perfect balance' : 'pink? blue?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      if (both) L(x, 790, 1140, 'DUVETS: ALIGNED', pop01(t, P.t0 + 1.8, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'All-black sheets. | *Made in the dark.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bed(x, 790, 980, pop01(t, P.t0 + 0.2, 0.3, 2), { blanket: '#120a24', pillow: '#120a24', sheet: '#1d1438', frame: '#2a2350' })
      const dark = clamp((lt - 0.9) / 0.3)
      if (dark > 0) { x.save(); x.globalAlpha = 0.55 * dark; x.fillStyle = '#05040c'; x.fillRect(110, 480, 860, 740); x.restore() }
      L(x, 790, 650, 'LIGHTS: OFF', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.05, 40)
      if (lt > 1.6) bubble(x, 790, 1140, 'perfect.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Didn’t make the bed. | *Sleeps in a hammock.*', mood: 'sparkle', star: { x: -160, y: -40 }, hops: [0.8],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = BROWN; x.fillRect(150, 620, 22, 520); x.fillRect(560, 620, 22, 520)
      x.strokeStyle = '#ffd23a'; x.lineWidth = 16; x.beginPath(); x.moveTo(165, 760); x.quadraticCurveTo(370, 1080, 570, 760); x.stroke()
      x.strokeStyle = '#ff7a59'; x.lineWidth = 8; x.beginPath(); x.moveTo(165, 776); x.quadraticCurveTo(370, 1096, 570, 776); x.stroke()
      x.restore()
    },
    front(x, t, lt, P) {
      bed(x, 800, 1060, pop01(t, P.t0 + 0.6, 0.3, 2) * 0.7, { blanket: STEEL })
      L(x, 800, 960, 'BED: DECOR', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.05, 32)
      bubble(x, 790, 660, 'freedom!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Made it at 5 a.m. | *Hotel-grade corners.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bed(x, 790, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), { blanket: '#6a7a5a', pillow: BONE })
      L(x, 790, 640, '05:00 AM', pop01(t, P.t0 + 0.4, 0.3, 2), RED, -0.05, 44, BONE)
      L(x, 790, 800, '✓ INSPECTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.05, 36)
    } },
  { sign: 'aquarius', cap: 'Sleeps sideways. | So *made it sideways.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const r = ease.inOutCubic(prog(lt, 0.4, 1.1)) * Math.PI / 2
      bed(x, 760, 880, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9, { blanket: ACC, rot: r })
      L(x, 790, 1150, 'IT’S A SYSTEM', pop01(t, P.t0 + 1.4, 0.3, 2.2), ACC, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Made the bed. | Cried. *It’s so cozy.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', tears: lt => lt > 0.9 ? 2 : 1, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bed(x, 790, 980, pop01(t, P.t0 + 0.2, 0.3, 2), { blanket: '#b9a6ff', pillow: '#fff4e2' })
      hearts(x, t, 800, 900, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 6 })
      bubble(x, 790, 680, 'it’s so | beautiful', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: '#c9e8ff', tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0346', key: 'C', accent: ACC, ending: 'group',
  title: 'The signs | *making the bed.*',
  cameos: CAMEOS,
  group: { cap: 'Bed’s made. | *Back in it.*', moods: ['sleepy', 'sleepy', 'happy', 'sleepy', 'wink', 'squint', 'sleepy', 'neutral', 'sleepy', 'neutral', 'sleepy', 'sleepy'] },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
