// r2t0379: star_talk ROLLCALL, "The signs at | *a barbecue.*" (~54 s vertical, signs3kit social cut, lofi · D)
// Twelve signs in zodiac order at a summer barbecue, each the most extreme version of itself:
//   ♈ flipping burgers before the grill was on · ♉ guarding the potato salad · ♊ brought two playlists, played both
//   · ♋ leftovers for everyone, labelled · ♌ a fourteen-minute speech about hot dogs · ♍ checked the temperature of
//   every burger · ♎ napkins colour-matched to the sunset · ♏ only eats the burnt ones · ♐ volleyball: ball gone
//   · ♑ runs the grill like a business · ♒ grilled a watermelon · ♓ cried, the sunset was too pretty
//  49.2   GROUP ending: "One grill. | *Twelve opinions.*"  group photo with the grill smoking above them.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff9a4a'
const BURGER = [
  '..BBBBBB..',
  '.BBbBBbBB.',
  'BBBBBBBBBB',
  'GGGGGGGGGG',
  'MMMMMMMMMM',
  'MMMMMMMMMM',
  'BBBBBBBBBB',
]
const BURGER_C = { B: '#e0a85b', b: '#fff4e2', G: '#5fd07a', M: '#7a3b22' }
const RAW_C = { B: '#e0a85b', b: '#fff4e2', G: '#5fd07a', M: '#ff8fa3' }
const BURNT_C = { B: '#3a2418', b: '#5b3a2a', G: '#2a3a22', M: '#1b100c' }
const BOWL = ['YYYYYYYYYY', 'YyYYYyYYyY', 'WWWWWWWWWW', '.WWWWWWWW.', '..WWWWWW..']
const BOWL_C = { Y: '#fff1b0', y: '#e0c86a', W: '#c4f0ff' }
const BOX = ['KKKKKKKK', 'WWWWWWWW', 'WWWWWWWW', 'WWWWWWWW']
const THERMO = ['.KK.', 'KWWK', 'KWWK', 'KRRK', 'KRRK', 'KRRK', 'RRRR', 'RRRR', '.RR.']
const THERMO_C = { K: INK, W: '#fff4e2', R: '#e23d4e' }
const BALL = ['.WWWW.', 'WWYYWW', 'WYWWYW', 'WWYYWW', '.WWWW.']
const BALL_C = { W: '#fff4e2', Y: '#ffd23a' }
const MELON = ['....GGGG....', '..GGGGGGGG..', '.GRRRRRRRRG.', 'GRRkRRRkRRRG', 'GRRRRRkRRRRG', '.GGGGGGGGGG.']
const MELON_C = { G: '#3e9e5b', R: '#ff6b7a', k: INK }
const GRILL = [
  'KKKKKKKKKKKK',
  'KSKSKSKSKSKK',
  '.KKKKKKKKKK.',
  '..KKKKKKKK..',
  '...K....K...',
  '..K......K..',
]
const GRILL_C = { K: '#6b62a8', S: '#c9c9d8' }
function smoke(x, t, cx, cy, n = 3) {
  x.save(); x.globalAlpha = 0.35; x.strokeStyle = '#fff4e2'; x.lineWidth = 12; x.lineCap = 'round'
  for (let k = 0; k < n; k++) { const dx = (k - (n - 1) / 2) * 50; x.beginPath(); for (let j = 0; j <= 8; j++) { const yy = cy - j * 26, xx = cx + dx + Math.sin(j * 0.8 + t * 3 + k) * 14; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Flipping burgers | *before the grill was on.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      const f = Math.sin(Math.PI * ((lt * 1.6) % 1))
      drawBits(x, BURGER, RAW_C, 790, 860 - f * 120, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: f * 2 })
      drawBits(x, GRILL, GRILL_C, 790, 1020, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'GRILL: OFF', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Guarding | *the potato salad.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'MINE.', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 56, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'Brought two playlists. | *Played both.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 700, 780, 'MIX A', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: '#ffe36a', rot: -0.06, font: MONO, weight: 700 })
      label(x, 880, 900, 'MIX B', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 44, bg: SKYB, rot: 0.06, font: MONO, weight: 700 })
      notes(x, t, 790, 1080, { n: 6, cell: 8, col: '#ffe36a', seed: 3 })
      label(x, 790, 1100, 'AT THE SAME TIME', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.03 })
    } },
  { sign: 'cancer', cap: 'Packed leftovers | *for everyone.* Labelled.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const N = ['ARIES', 'LEO', 'YOU', 'YOU 2'], C = [PINK, GOLD, MINT, LAV]
      N.forEach((n, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2); if (k <= 0.01) return
        drawBits(x, BOX, { K: C[i], W: '#e8f6ff' }, 790, 1060 - i * 100, 22 * k)
        x.save(); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(n, 790, 1066 - i * 100); x.restore()
      })
    } },
  { sign: 'leo', cap: 'Gave a speech | *about the hot dogs.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const m = Math.min(14, Math.floor(clamp((lt - 0.3) / 1.6) * 14))
      label(x, 790, 760, `SPEECH: ${m} MIN`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'and ANOTHER thing | about mustard—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Checked the temperature | of *every burger.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.35))
      for (let i = 0; i < 4; i++) drawBits(x, BURGER, BURGER_C, 700 + (i % 2) * 180, 820 + Math.floor(i / 2) * 170, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const i = n - 1
      drawBits(x, THERMO, THERMO_C, 730 + (i % 2) * 180, 760 + Math.floor(i / 2) * 170, 10 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.5 })
      label(x, 790, 1130, `CHECKED: ${n}/4`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Napkins matched | *to the sunset.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const C = ['#ff6b5a', '#ff9a4a', '#ffd23a', '#ff8fb1', '#c97bff']
      C.forEach((c, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2); if (k <= 0.01) return; x.fillStyle = INK; x.fillRect(686 + i * 44 - 4, 800 - 4, 48, 168); x.fillStyle = c; x.fillRect(686 + i * 44, 800, 40, 160 * k) })
      label(x, 790, 1060, 'PALETTE: SUNSET', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Only eats | *the burnt ones.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BURGER, BURNT_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { outline: '#ff9a4a' })
      smoke(x, t, 790, 790)
      label(x, 790, 1080, 'EXTRA DARK', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: '#ff9a4a', rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Volleyball. | *Ball: gone.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, -1], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.5, 1.4))
      drawBits(x, BALL, BALL_C, lerp(560, 1000, p), lerp(800, 520, p) - Math.sin(Math.PI * p) * 120, 18 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - 0.6 * p))
      label(x, 790, 1020, 'NEW GAME: FIND IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: '#c97bff', color: '#fff4e2', rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Runs the grill | *like a business.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 40 + Math.floor(clamp((lt - 0.3) / 1.5) * 7)
      label(x, 790, 760, `ORDER #${n} UP`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 46, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      drawBits(x, GRILL, GRILL_C, 790, 960, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      smoke(x, t, 790, 900, 2)
      label(x, 790, 1120, 'WAIT TIME: 4 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Grilled | *a watermelon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MELON, MELON_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.globalAlpha = clamp((lt - 0.6) * 2); x.fillStyle = '#3a2418'; for (let i = 0; i < 4; i++) x.fillRect(700 + i * 50, 830, 14, 70); x.restore()
      bubble(x, 790, 1080, 'trust me.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried. The sunset | was *too pretty.*', mood: 'heart', tears: 3, look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.4, 1.6)
      x.save(); x.globalAlpha = 0.85 * clamp(k)
      const g = x.createLinearGradient(0, 600, 0, 1000); g.addColorStop(0, '#c97bff'); g.addColorStop(0.5, '#ff8fb1'); g.addColorStop(1, '#ffb34a')
      x.fillStyle = g; x.fillRect(640, 640, 300, 330)
      x.fillStyle = '#ffe36a'; x.beginPath(); x.arc(790, 930, 70, Math.PI, 0); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 1080, 'TOO. PRETTY.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 42, bg: PINK, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0379', key: 'D', accent: ACC, ending: 'group',
  title: 'The signs at | *a barbecue.*',
  cameos: CAMEOS,
  group: {
    cap: 'One grill. | *Twelve opinions.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.6, 0.4, 2)
      drawBits(x, GRILL, GRILL_C, 540, 780, 32 * k)
      if (k > 0.5) { smoke(x, t, 540, 680, 3); drawBits(x, BURGER, BURGER_C, 540, 680 - Math.abs(Math.sin(lt * 3)) * 70, 15 * k, { rot: Math.sin(lt * 3) }) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
