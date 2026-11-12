// r2t0058: star_talk, SOLO film, "Aquarians on a | day off be like." (~43 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine day-off situations, each the most extreme Aquarius version. Ending: the group beat.
//   0.0–3.6    "Aquarians on a | *day off be like.*"
//   3.6–37.8   three new hobbies by 10 a.m. · rearranged the furniture onto the ceiling · took a walk, adopted a
//              goose · phone on silent for three days · one video, now an octopus expert · stargazing at noon (telescope at
//              the sun... with a filter, a pixel sun) · built a robot to do the dishes (it said no) · a day off from people,
//              threw a party · short nap, woke up an inventor (blueprints)
//  37.8        GROUP ending: "Relaxing? | *Never heard of it.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQUA = '#6fe3e0', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a'

const LAMP = ['...K...', '...K...', '..YYY..', '.YYYYY.', 'YYYYYYY', '...B...', '...B...', '...B...', '..BBB..']
const SOFA = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPWWWWWWWWPP', 'PPPPPPPPPPPP', 'B..........B']
const GOOSE = ['...WW....', '..WWKO...', '..WW.....', '..WW.....', '..WW.....', '.WWWWWW..', 'WWWWWWWWW', 'WWWWWWWW.', '.WWWWWW..', '...O.O...']
const OCTO = ['..PPPPP..', '.PPPPPPP.', 'PPWKPWKPP', 'PPPPPPPPP', '.PPPPPPP.', 'P.P.P.P.P', 'P.P.P.P.P', '.P..P..P.']
const SCOPE = ['.........SS', '.......SSSS', '.....SSSS..', '...SSSS....', '.SSSS......', 'SSS........', '....K......', '...K.K.....', '..K...K....']
const SUN = ['..Y.Y.Y..', '.........', 'Y.YYYYY.Y', '..YYYYY..', 'Y.YYYYY.Y', '..YYYYY..', 'Y.YYYYY.Y', '.........', '..Y.Y.Y..']
const ROBOT = ['...R...', '.GGGGG.', 'GWGGGWG', 'GGGGGGG', 'GGKKKGG', '..GGG..', 'GGGGGGG', 'G.GGG.G', 'G.GGG.G', '..G.G..', '..G.G..']
const HAT = ['...Y...', '..PPP..', '..PYP..', '.PPPPP.', '.PYPPY.', 'PPPPPPP']
function blueprint(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-156, -116, 312, 232)
  x.fillStyle = '#2f6fd0'; x.fillRect(-148, -108, 296, 216)
  x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 2
  for (let i = -128; i <= 128; i += 32) { x.beginPath(); x.moveTo(i, -100); x.lineTo(i, 100); x.stroke() }
  for (let j = -96; j <= 96; j += 32) { x.beginPath(); x.moveTo(-140, j); x.lineTo(140, j); x.stroke() }
  x.strokeStyle = BONE; x.lineWidth = 5
  x.beginPath(); x.arc(-40, 10, 50, 0, Math.PI * 2); x.stroke(); x.strokeRect(20, -50, 90, 70)
  x.beginPath(); x.moveTo(-40, 10); x.lineTo(65, -15); x.stroke()
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('IT HUMS?', 0, 88)
  x.restore()
}

const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Three new hobbies. | *By 10 a.m.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      ;['POTTERY', 'BANJO', 'BEEKEEPING?'].forEach((w, i) => label(x, 790, 720 + i * 130, w, pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2.2), { size: 34, bg: [GOLD, PINK, MINT][i], rot: i % 2 ? 0.05 : -0.04, font: MONO, weight: 700 }))
    } },
  { sign: S, cap: 'Moved the furniture. | *To the ceiling.*', mood: 'wink', look: [0, -1], star: { x: -170, y: 60 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SOFA, { P: LAV, W: BONE, B: BROWN }, 790, 600, 20 * k, { sy: -1 })
      drawBits(x, LAMP, { K: INK, Y: GOLD, B: BROWN }, 600, 590, 14 * k, { sy: -1 })
      label(x, 790, 1000, 'FENG SHUI?', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: AQUA, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Took a walk. | *Adopted a goose.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GOOSE, { W: BONE, K: INK, O: ORANGE }, 790, 920, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 820, 650, 'HONK', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 50, tail: 'bl' })
    } },
  { sign: S, cap: 'Phone on silent. | *For three days.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'DO NOT DISTURB', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 28, bg: BONE, font: MONO, weight: 700 })
      label(x, 790, 900, 'DAY 3', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 60, bg: AQUA, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Watched one video. | Now an *octopus expert.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, OCTO, { P: PINK, W: BONE, K: INK }, 790, 860 + Math.sin(t * 3) * 10, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1090, 'three hearts, btw', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: S, cap: 'Stargazing. | *At noon.*', mood: 'squint', look: [1, -1], star: { x: -200, y: 60 },
    back(x, t, lt, P) { drawBits(x, SUN, { Y: GOLD }, 820, 610, 20 * pop01(t, P.t0 + 0.6, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, SCOPE, { S: '#b8c2d0', K: INK }, 560, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1020, 'STARS: SOON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Built a robot | to do the dishes. *It quit.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ROBOT, { R: RED, G: '#b8c2d0', W: SKYB, K: INK }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, 'no.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 52, col: SKYB, tail: 'bc' })
    } },
  { sign: S, cap: 'A day off from people. | *Threw a party.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.0, 1.6],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, { P: PINK, Y: GOLD }, F.x, F.top - 30, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 800, 'GUESTS: STRANGERS', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: GOLD, font: MONO, weight: 700 })
      notes(x, t, 790, 1080, { n: 5, cell: 8, col: AQUA, alpha: pop01(t, P.t0 + 1.0, 0.3, 2) })
    } },
  { sign: S, cap: 'Short nap. | Woke up *an inventor.*', mood: lt => lt > 1.1 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      blueprint(x, 790, 860, pop01(t, P.t0 + 1.0, 0.35, 2))
      sparkles(x, t, 790, 860, P.t0 + 1.1, 8, 190, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2t0058', key: 'G', accent: AQUA, solo: S, ending: 'group',
  title: 'Aquarians on a | *day off be like.*',
  cameos: CAMEOS,
  group: { cap: 'Relaxing? | *Never heard of it.*', mood: 'wink' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
