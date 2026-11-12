// r2t0057: star_talk, SOLO film, "Scorpios running late | be like." (~46 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through: nine running-late situations, each the most extreme Scorpio version.
//   0.0–3.6    "Scorpios running late | *be like.*"
//   3.6–37.8   "5 min away" (still in bed) · outfit change seven, all black · sunglasses indoors · walked in late, made it an
//              entrance (spotlight) · apologised with a look · blamed Mercury, didn't elaborate · ran for the bus, pretended
//              not to · left your text on read, showed up instead · late to the first date, still got a second
//  37.8        "Late. | *Worth the wait.*"
//  41.2        CALLBACK: "Next time? | *Outfit eight.*"  the rack of black shirts comes back, one more added.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CRIM = '#ff5a6e', BROWN = '#8a4a2e'

const BED = ['P.............', 'P.............', 'PWWW..........', 'PWWWLLLLLLLLLL', 'PLLLLLLLLLLLLL', 'PLLLLLLLLLLLLL', 'PBBBBBBBBBBBBP', 'P............P']
const SHIRT = ['...H...', 'KKKHKKK', 'KKKKKKK', 'KKKKKKK', '.KKKKK.', '.KKKKK.', '.KKKKK.', '.KKKKK.', '.KKKKK.', '.KKKKK.']
const SHADES = ['KKKKKK.KKKKKK', 'KGKKKKKKGKKKK', 'KKKKKK.KKKKKK', '.KKKK...KKKK.']
const BUS = ['YYYYYYYYYYYYYYYY', 'YSSYSSYSSYSSYSSY', 'YSSYSSYSSYSSYSSY', 'YYYYYYYYYYYYYYYY', 'YYYYYYYYYYYYYYYY', '.KK.........KK..']
function rack(x, cx, cy, n, k, seed = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 30 + n * 52
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -136, w + 12, 18); x.fillStyle = '#d8dbe8'; x.fillRect(-w / 2, -132, w, 10)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -136, 12, 300); x.fillRect(w / 2 - 8, -136, 12, 300)
  x.fillStyle = '#d8dbe8'; x.fillRect(-w / 2, -132, 4, 292); x.fillRect(w / 2 - 4, -132, 4, 292)
  for (let i = 0; i < n; i++) drawBits(x, SHIRT, { K: i % 2 ? '#1c1630' : '#28203e', H: '#d8dbe8' }, -w / 2 + 41 + i * 52, -30, 11, { outline: '#9a8fd0', rot: Math.sin(i * 1.7 + seed) * 0.04 })
  x.restore()
}

const S = 'scorpio'
const CAMEOS = [
  { sign: S, cap: 'Texted "5 min away." | *Still in bed.*', mood: 'sleepy', look: [1, 0], star: { x: -170, y: 30 },
    back(x, t, lt, P) { drawBits(x, BED, { P: BROWN, W: BONE, L: '#3a2a5a', B: '#5a3a2a' }, 380, 1060, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 760, '5 min away', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 940, 'LOCATION: BED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Outfit change seven. | *All black.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.min(7, 1 + Math.floor(prog(lt, 0.2, 1.4) * 7))
      rack(x, 760, 880, n, pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 780, 1110, 'NEW LOOK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: CRIM, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sunglasses on. | *Indoors.* At night.', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      const y = lerp(F.top - 160, F.top + 120, ease.outCubic(prog(lt, 0.5, 0.9)))
      if (k > 0.01) drawBits(x, SHADES, { K: '#141020', G: '#8a8aa0' }, F.x, y, 15 * k)
      label(x, 790, 820, 'IT’S 9 P.M.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Walked in late. | Made it *an entrance.*', mood: 'wink', look: [0, 0], star: { x: 0, y: 0 },
    back(x, t, lt, P) {
      const a = 0.28 * ease.outCubic(prog(lt, 0.2, 0.8))
      x.fillStyle = `rgba(255,241,200,${a.toFixed(3)})`; x.beginPath(); x.moveTo(500, 470); x.lineTo(580, 470); x.lineTo(760, 1180); x.lineTo(320, 1180); x.fill()
    },
    front(x, t, lt, P) {
      label(x, 300, 640, 'SLOW WALK', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: CRIM, color: BONE, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 540, 880, P.t0 + 0.9, 8, 200, 0.4)
    } },
  { sign: S, cap: 'Apologised? | Gave *a look* instead.', mood: 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, '…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 80, col: LAV, tail: 'bl' })
      label(x, 790, 970, 'APOLOGY: IMPLIED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Blamed Mercury. | *Did not elaborate.*', mood: 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, '☿ RETROGRADE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'you know why.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Ran for the bus. | *Denies it.*', mood: lt => lt > 1.4 ? 'neutral' : 'wide', look: [-1, 0], star: { x: 170 }, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      const p = prog(lt, 0.1, 1.2)
      drawBits(x, BUS, { Y: GOLD, S: SKYB, K: INK }, lerp(420, 300, p), 1020, 18 * pop01(t, P.t0 + 0.1, 0.3, 2))
      bubble(x, 330, 760, 'i was walking.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: S, cap: 'Left your text on read. | *Showed up instead.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'where are u??', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: SKYB, tail: 'br' })
      label(x, 860, 830, 'READ', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 26, bg: BONE, font: MONO, weight: 700 })
      label(x, 790, 1000, 'DING DONG', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 44, bg: CRIM, color: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Late to the first date. | *Got a second.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 780, '✦ DATE #2?', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 42, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'yes. 8pm.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 1080, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0057', key: 'E', accent: CRIM, solo: S, ending: 'callback',
  title: 'Scorpios running | late *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Late. | *Worth the wait.*', mood: 'wink' },
  last: {
    text: 'Next time? | *Outfit eight.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'scorpio', 340, 1060, 240 * k, { mood: 'wink', look: [1, 0], seed: 40 })
      rack(x, 720, 1080, lt > 1.3 ? 8 : 7, pop01(t, t - lt + 0.6, 0.35, 2), 1)
      sparkles(x, t, 880, 1040, t - lt + 1.3, 7, 110, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
