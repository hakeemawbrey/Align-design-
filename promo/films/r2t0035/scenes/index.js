// r2t0035: star_talk ROLLCALL, "The signs at a | hardware store." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order at a hardware store, each the most extreme version of itself:
//   ♈ bought a power drill for one nail · ♉ came for a lightbulb, left with a garden · ♊ forty questions, bought tape
//   · ♋ picked the paint called "Warm Hug" · ♌ gold paint, for everything · ♍ sorted the screw aisle, unpaid
//   · ♎ forty swatches, all white · ♏ asked for the strongest lock · ♐ rode the flatbed cart
//   · ♑ price-checked one nail, twice · ♒ parts for a robot, don't ask · ♓ cried in the garden section
//  49.2   "Nobody bought | *what they came for.*"  group photo
//  52.6   CALLBACK: "One nail. | *One group photo.*"  Aries, the drill, the photo on the nail
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ff9a4a', STEEL = '#9aa5c4'
const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
// ── props
const DRILL = ['OOOOOOOOO.....', 'OOOOOOOOOSSSSS', 'OOOOOOOOO.....', '..OOO.........', '..KKK.........', '..KKK.........', '..KKK.........', '.KKKKK........']
const DRILL_C = { O: ORANGE, S: STEEL, K: INK }
const NAIL = ['SSSSS', '..S..', '..S..', '..S..', '..S..', '..S..', '..S..']
const BULB = ['.YYYY.', 'YYYYYY', 'YYWYYY', 'YYYYYY', '.YYYY.', '..SS..', '..SS..']
const PLANT = ['....GG.G....', '..G.GGGG.G..', '.GGGG..GGGG.', '..GGGGGGGG..', '....GGGG....', '..TTTTTTTT..', '...TTTTTT...', '...TTTTTT...']
const PLANT_C = { G: '#7dd36b', T: '#c96a3a' }
const TAPE = ['..SSSS..', '.SSSSSS.', 'SSS..SSS', 'SS....SS', 'SSS..SSS', '.SSSSSS.', '..SSSS..']
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'GGGGGGGG', 'GGGKKGGG', 'GGGKKGGG', 'GGGGGGGG', 'GGGGGGGG']
const GEAR = ['..S.S..', '.SSSSS.', 'SSS.SSS', '.S...S.', 'SSS.SSS', '.SSSSS.', '..S.S..']
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..']
/** a paint can with a coloured lid drip and a name label */
function paintCan(x, cx, cy, k, col, name) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -120, 220, 250); x.fillStyle = STEEL; x.fillRect(-102, -112, 204, 234)
  x.fillStyle = col; x.fillRect(-102, -112, 204, 40); x.fillRect(-60, -72, 24, 40); x.fillRect(30, -72, 18, 26)
  x.fillStyle = BONE; x.fillRect(-82, -10, 164, 90)
  x.restore()
  label(x, cx, cy + 35 * k, name, k, { size: 40, bg: col, font: MONO, weight: 700, rot: 0 })
}
/** a framed group photo of the twelve, hung on a nail */
function groupPhoto(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(Math.sin(t * 2) * 0.03); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-90, -110); x.lineTo(0, -160); x.lineTo(90, -110); x.stroke()
  x.fillStyle = INK; x.fillRect(-170, -120, 340, 230); x.fillStyle = '#8a4a2e'; x.fillRect(-162, -112, 324, 214); x.fillStyle = '#1d1440'; x.fillRect(-144, -94, 288, 178)
  x.restore()
  for (let i = 0; i < 12; i++) signChar(x, t, SIGNS[i], cx + ((i % 6) - 2.5) * 46 * k, cy - 30 * k + Math.floor(i / 6) * 60 * k, 52 * k, { mood: 'happy', seed: 50 + i, glyph: false, tears: i === 11 ? 1 : 0 })
  drawBits(x, NAIL, { S: STEEL }, cx, cy - 166 * k, 5 * k)
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Bought a power drill. | *For one nail.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DRILL, DRILL_C, 790, 780, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lt > 1.0 ? Math.sin(t * 40) * 0.03 : 0 })
      drawBits(x, NAIL, { S: STEEL }, 800, 1010, 10 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 800, 1140, 'NAILS NEEDED: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: ORANGE, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Came for a lightbulb. | *Left with a garden.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BULB, { Y: '#fff1b0', W: BONE, S: STEEL }, 790, 660, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 5; i++) drawBits(x, PLANT, PLANT_C, 650 + (i % 3) * 140 + (i > 2 ? 70 : 0), 990 - (i > 2 ? 130 : 0), 12 * pop01(t, P.t0 + 0.8 + i * 0.15, 0.3, 2))
    } },
  { sign: 'gemini', cap: 'Forty questions. | *Bought tape.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const qs = ['and this?', 'what’s that?', 'why tho?']
      for (let i = 0; i < 3; i++) bubble(x, 790 + (i % 2 ? 40 : -20), 640 + i * 110, qs[i], pop01(t, P.t0 + 0.2 + i * 0.3, 0.25, 2.4) * (1 - ease.inCubic(prog(lt, 1.3, 1.5))), { size: 34, tail: 'bl' })
      drawBits(x, TAPE, { S: '#c9c2e8' }, 790, 850, 22 * pop01(t, P.t0 + 1.4, 0.3, 2.4))
      label(x, 790, 1100, 'TOTAL: ONE TAPE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Chose the paint | *called “Warm Hug.”*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paintCan(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), '#ffb38a', 'WARM HUG')
      hearts(x, t, 790, 700, P.t0 + 1.0, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Gold paint. | *For everything.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      paintCan(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, 'GOLD x 9')
      sparkles(x, t, 790, 820, P.t0 + 1.0, 10, 200, 0.2)
      label(x, 790, 1120, 'EVEN THE FENCE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Sorted the screw aisle. | *Unpaid.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) {
          x.fillStyle = INK; x.fillRect(-150 + i * 100, -150 + j * 76, 92, 66); x.fillStyle = '#c9c2e8'; x.fillRect(-146 + i * 100, -146 + j * 76, 84, 58)
          const sorted = lt > 0.6 + (j * 3 + i) * 0.08
          x.fillStyle = sorted ? MINT : '#ff8fb1'; x.fillRect(-134 + i * 100, -132 + j * 76, 60, 10)
        }
        x.restore()
      }
      label(x, 790, 1140, 'BY SIZE. THEN SHINE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Forty paint swatches. | *All “white.”*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const whites = ['#ffffff', '#fbf6ec', '#f6f1ff', '#f3fbf4', '#fff8f0']
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2)
        if (k <= 0.01) continue
        x.save(); x.translate(650 + i * 70, 820); x.rotate(-0.3 + i * 0.15); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-40, -150, 80, 300); x.fillStyle = whites[i]; x.fillRect(-34, -144, 68, 288); x.restore()
      }
      bubble(x, 790, 1100, 'eggshell? linen?', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Asked for | *the strongest lock.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LOCK, { K: STEEL, G: GOLD }, 790, 820, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'FOR MY DIARY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: '#c97bff', color: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Rode the | *flatbed cart.*', mood: 'sparkle', star: { x: -40, y: -30 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.05, 0.3, 1.8), dx = Math.sin(lt * 3) * 30
      if (k <= 0.01) return
      x.save(); x.globalAlpha *= Math.min(1, k)
      x.fillStyle = INK; x.fillRect(260 + dx, 1000, 480, 34); x.fillStyle = ORANGE; x.fillRect(266 + dx, 1004, 468, 22)
      x.fillStyle = INK; x.fillRect(720 + dx, 760, 20, 260)
      for (const wx of [320, 680]) { x.beginPath(); x.arc(wx + dx, 1060, 26, 0, Math.PI * 2); x.fill() }
      x.fillStyle = BONE; for (let i = 0; i < 4; i++) { const ph = (t * 3 + i * 0.27) % 1; x.fillRect(200 - ph * 100, 880 + i * 40, 90, 8) }
      x.restore()
    },
    front(x, t, lt, P) { label(x, 790, 640, 'WHEEEE', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 48, bg: ORANGE, font: MONO, weight: 700 }) } },
  { sign: 'capricorn', cap: 'Price-checked one nail. | *Twice.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, NAIL, { S: STEEL }, 790, 820, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 720, 660, 'AISLE 3: 4¢', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: '#9fd8a8', font: MONO, weight: 700, rot: -0.05 })
      label(x, 860, 1060, 'AISLE 9: 4¢', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: '#9fd8a8', font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Bought parts | *for a robot.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, GEAR, { S: i % 2 ? SKYB : STEEL }, 700 + i * 90, 820 + (i % 2) * 70, 16 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: t * (i % 2 ? -1 : 1) })
      bubble(x, 790, 1080, 'don’t ask.', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 44, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried in | *the garden section.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, FLOWER, { P: [PINK, LAV, SKYB, '#ffb38a'][i], Y: GOLD, G: '#7dd36b' }, 680 + i * 80, 900 + (i % 2) * 40, 16 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      label(x, 790, 680, 'THEY’RE SO SMALL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LAV, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0035', key: 'F', accent: ORANGE, ending: 'callback',
  title: 'The signs at a | *hardware store.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody bought | *what they came for.*' },
  last: {
    text: 'One nail. | *One group photo.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 250, 1180, 240 * k, { mood: lt > 1.6 ? 'sparkle' : 'happy', look: [1, -1], seed: 40, hops: [t - lt + 1.4] })
      drawBits(x, DRILL, DRILL_C, 420, 1330, 14 * pop01(t, t - lt + 0.6, 0.35, 2))
      groupPhoto(x, t, 640, 1000, 1.45 * pop01(t, t - lt + 1.0, 0.4, 2))
      sparkles(x, t, 640, 1000, t - lt + 1.5, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
