// r2a0157: star_advice ADVICE SOLO (gemini), "Change your mind, | *Gemini.*" (topic: you’re allowed to change your mind) (~45 s vertical,
// signs3kit social cut, music: lofi · F). Nine warm truths about Gemini, each with one visual gag:
//   changed the order twice · a new hobby every month · two opinions at once · talks a lot, friends love it
//   · plans are drafts (crossed-out list) · not bored, curious (magnifier on a ladybug) · unsure about a match? ask
//   · a new hat every day · not two-faced, two-hearted
//  37.8   ending (group): "New mind. | *Same heart.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffe066', RED = '#e23d4e', ORANGE = '#ffb34a'
const ST = { x: -170 }
const S = 'gemini'

const LADYBUG = [
  '...KK...',
  '..KKKK..',
  '.RRKRRR.',
  'RKRRKRKR',
  'RRRKRRRR',
  'RKRRKRKR',
  '.RRRKRR.',
  '..R..R..',
]
const GLASS = [
  '..GGGG.....',
  '.G....G....',
  'G......G...',
  'G......G...',
  'G......G...',
  'G......G...',
  '.G....G....',
  '..GGGGHH...',
  '.......HH..',
  '........HH.',
  '.........HH',
]
const HAT = [
  '....HHHH....',
  '...HHHHHH...',
  '...HHHHHH...',
  '...BBBBBB...',
  'HHHHHHHHHHHH',
]
const HOBBY = ['PAINTING', 'POTTERY', 'GUITAR', 'CHESS', 'BAKING']

function sheet(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function txt(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}

const CAMEOS = [
  { sign: S, cap: 'Changed your order? | *That’s allowed.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = lt < 0.7 ? 'PASTA' : lt < 1.3 ? 'SALAD' : 'PASTA'
      label(x, 790, 820, `ORDER: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'actually…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 790, 1020, 'NO PROBLEM!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New hobby again? | *You’re learning.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const i = Math.min(HOBBY.length - 1, Math.floor(lt / 0.45))
      label(x, 790, 820, HOBBY[i], pop01(t, P.t0 + 0.2, 0.3, 2), { size: 52, bg: [PINK, ORANGE, SKYB, LAV, MINT][i], rot: (i % 2 ? 0.05 : -0.05), font: MONO, weight: 700 })
      label(x, 790, 1020, 'SKILLS: GROWING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Two opinions at once? | *Both can be true.*', mood: 'wink', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 720, 680, 'love it', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      bubble(x, 850, 860, 'also… hmm', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 790, 1060, 'BOTH VALID', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You talk a lot. | *Friends love listening.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'and THEN…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 820, 960, 200 * k, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false, hops: [P.t0 + 1.3] })
      label(x, 820, 1150, 'TELL ME MORE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plans changed again? | Plans are *drafts.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 830, 320, 330, BONE, k, 0.04)) {
        txt(x, 'SATURDAY', 0, -125, 32, INK, MONO, 700)
        const items = ['beach', 'museum', 'nap', 'pancakes']
        items.forEach((s, i) => {
          txt(x, s, 0, -60 + i * 58, 36, i < 3 ? '#9a90b8' : INK)
          if (i < 3 && lt > 0.5 + i * 0.35) { x.fillStyle = RED; x.fillRect(-90, -62 + i * 58, 180, 7) }
        })
        x.restore()
      }
      sparkles(x, t, 800, 1000, P.t0 + 1.7, 6, 120, 0.4)
    } },
  { sign: S, cap: 'Not bored. | *Curious.* Big difference.', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LADYBUG, { K: INK, R: RED }, 800, 1000, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, GLASS, { G: '#d8dbe8', H: '#8a4a2e' }, 790 + Math.sin(t * 2) * 20, 950, 22 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 800, 650, 'whoa, tiny!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'Unsure about a match? | *Ask more.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 830, 260, 320, '#2a2350', k, 0.04)) { x.fillStyle = '#140c30'; x.fillRect(-116, -146, 232, 210); txt(x, '♏︎ SCORPIO', 0, 118, 28, LAV, MONO, 700); x.restore() }
      if (k > 0.5) signChar(x, t, 'scorpio', 800, 800, 150, { mood: lt > 1.4 ? 'happy' : 'squint', seed: 11, glyph: false })
      bubble(x, 800, 600, 'fave snack?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: YEL, tail: 'bl' })
    } },
  { sign: S, cap: 'A new look every day? | *It all suits you.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const i = Math.min(3, Math.floor(lt / 0.55))
      const cols = [[PINK, '#d65a8a'], [SKYB, '#4a8ab8'], [MINT, '#2f8a4a'], [ORANGE, '#c2702a']][i]
      drawBits(x, HAT, { H: cols[0], B: cols[1] }, F.x, F.top - 30, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 820, `LOOK #${i + 1}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: cols[0], rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.top - 30, P.t0 + i * 0.55 + 0.05, 5, 90, i)
    } },
  { sign: S, cap: 'Not two-faced. | *Two-hearted.*', mood: 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 720, 820 + Math.sin(t * 3) * 10, 22 * k)
      drawBits(x, HEART, { H: YEL, W: '#fff' }, 880, 820 + Math.cos(t * 3) * 10, 22 * pop01(t, P.t0 + 0.8, 0.35, 2))
      hearts(x, t, 800, 900, P.t0 + 1.3, { n: 6, life: 1.6, spread: 260, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0157', key: 'F', accent: YEL, solo: S, ending: 'group',
  title: 'Change your mind, | *Gemini.*',
  cameos: CAMEOS,
  group: {
    cap: 'New mind. | *Same heart.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
