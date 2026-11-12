// r2t0360: star_talk, ROLLCALL, "The signs | plant *shopping.*" (topic: The signs at a plant nursery) (signs3kit social cut, music: lofi · F). Ending: callback (Taurus is still hugging the fern).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#5fd068', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a sheet of paper with an optional coloured header */
function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD, bg = BONE } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
/** a pixel phone with chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 58); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 34, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** a polaroid with a sign star inside */
function polaroid(x, t, cx, cy, k, id, { cap = '', rot = 0.06, mood = 'happy', seed = 50, tears = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -142, 256, 304)
  x.fillStyle = INK; x.fillRect(-134, -154, 268, 308); x.fillStyle = CREAM; x.fillRect(-126, -146, 252, 292)
  x.fillStyle = '#2a2350'; x.fillRect(-108, -128, 216, 196)
  signChar(x, t, id, 0, -24, 150, { mood, seed, glyph: false, glow: 0.6, tears })
  if (cap) { x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cap, 0, 108) }
  x.restore()
}

const POTC = { P: '#c0504d', p: '#8a3a36' }
const FERN = ['G.G.G.G.G', '.GGGGGGG.', 'GG.GGG.GG', '.GGGGGGG.', 'G..GGG..G', '...GGG...', '.PPPPPPP.', '.PpPPPpP.', '..PPPPP..']
const TREE = ['...GGGG...', '.GGGGGGGG.', 'GGGGGGGGGG', 'GGGGGGGGGG', '.GGGGGGGG.', '...GGGG...', '....BB....', '....BB....', '....BB....', '..PPPPPP..', '..PPPPPP..', '...PPPP...']
const CACTUS = ['...G...', '.G.G...', '.GGG.G.', '...GGG.', '...G...', '.PPPPP.', '.PPPPP.', '..PPP..']
const SUN = ['..Y.Y.Y..', '.YYYYYYY.', 'YYYBBBYYY', '.YYBBBYY.', 'YYYBBBYYY', '.YYYYYYY.', '..Y.G.Y..', '....G....', '...GG....', '....GG...', '....G....', '..PPPPP..', '...PPP...']
const TRAP = ['GG.....GG', 'GRG...GRG', 'GRRG.GRRG', '.GRRGRRG.', '..GGGGG..', '....G....', '...GG....', '..PPPPP..', '...PPP...']
const MOSS = ['..GGGG..', '.GgGGgG.', 'GGGgGGGG', 'GgGGGgGG', '.PPPPPP.', '.PPPPPP.']
const VASE = ['..PPPP..', '.PPWWPP.', 'PPWPPWPP', 'PPPPPPPP', 'PPWPPWPP', '.PPPPPP.', '..PPPP..']
const MAG = ['..KKK...', '.KSSSK..', 'KSWSSSK.', 'KSSSSSK.', '.KSSSK..', '..KKKK..', '.....KK.', '......KK']
const G = { G: '#5fd068', g: '#2f9a48', B: '#8a4a2e', Y: '#ffd23a', R: '#ff6b5a', W: '#ffffff', ...POTC }
const CAMEOS = [
  { sign: 'aries', cap: 'Bought a whole tree. | *Carried it home.*', mood: 'wide', star: { x: -200 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P, F) {
      drawBits(x, TREE, G, F.x + 20, F.top - 105, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 * Math.sin(t * 4) })
      L(x, 800, 800, 'HOME: 3 MILES', pop01(t, P.t0 + 0.8, 0.3, 2.2), ORANGE, -0.04, 34)
      L(x, 800, 1000, 'CAR: WHY?', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Hugged a fern. | *Wouldn’t let go.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FERN, G, 640, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 810, 720, 'FERN: ADOPTED', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 32)
      L(x, 810, 1100, 'STAFF: WORRIED', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 30)
      hearts(x, t, 600, 800, P.t0 + 0.8, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: 'gemini', cap: 'Named forty plants. | *Remembered none.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const NAMES = ['Gary?', 'Bob??', 'Fernando', 'um…']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      drawBits(x, MOSS, G, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, NAMES[n], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 1110, 'REMEMBERED: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.03, 32)
    } },
  { sign: 'cancer', cap: 'Rescued the saddest one. | *From the sale shelf.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, ['....G....', '...G.....', '..GG.....', '...G..G..', '....GG...', '....G....', '.PPPPPPP.', '.PpPPPpP.', '..PPPPP..'], G, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'CLEARANCE', pop01(t, P.t0 + 0.5, 0.3, 2), RED, -0.05, 36, CREAM)
      L(x, 790, 1100, 'NOW: FAMILY ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Bought a sunflower. | *It faces them.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const turn = ease.inOutCubic(prog(lt, 0.7, 1.2))
      drawBits(x, SUN, G, 810, 870, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: lerp(-1, 1, turn) < 0 ? -1 : 1, rot: lerp(0.3, -0.25, turn) })
      L(x, 810, 1120, 'SUN: ME, OBVIOUSLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), ORANGE, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Inspected every leaf. | *For three hours.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FERN, G, 820, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, MAG, { K: INK, S: SKYB, W: '#ffffff' }, 720 + 40 * Math.sin(t * 2), 830, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 411)
      L(x, 800, 660, `LEAF ${n}: OK`, pop01(t, P.t0 + 0.5, 0.3, 2), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Chose the prettiest pot. | *Forgot the plant.*', mood: lt => lt > 1.4 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, VASE, { P: PINK, W: '#fff4e2' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 880, P.t0 + 0.6, 7, 160, 0.2)
      L(x, 790, 1100, 'PLANT: ???', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, 0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Bought a flytrap. | *Kindred spirit.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TRAP, G, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 - 0.1 * Math.max(0, Math.sin(t * 5)) })
      L(x, 790, 1100, 'BEST FRIEND: FOUND', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Bought a palm tree. | *Lives in a studio.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, TREE, { ...G, G: '#2fc79a' }, 800, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, 'CEILING: TOUCHED', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Bought a cactus. | *Zero needs. Respect.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CACTUS, G, 790, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1100, 'WATERING: QUARTERLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Bought moss. | *For its personality.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, MOSS, G, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'he gets me', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Saw one wilting leaf. | *Took it home.*', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      drawBits(x, ['...GG', '..GGG', '.GGGG', 'GGGG.', 'GGG..', '.G...', 'G....'], { G: '#a8b04a' }, 790, 820, 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.6 })
      L(x, 790, 1040, 'ONE LEAF. LOVED.', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0360', key: 'F', accent: ACC, ending: 'callback',
  title: 'The signs | plant *shopping.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *Zero green thumbs.*',
  },
  last: {
    text: 'The fern? | *Still being hugged.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 430, 1000, 300 * k, { mood: 'heart', look: [1, 0], seed: 7, hops: [t0 + 1.4] })
      drawBits(x, FERN, G, 650, 1080, 28 * pop01(t, t0 + 0.5, 0.4, 2))
      if (lt > 1.0) hearts(x, t, 560, 900, t0 + 1.0, { n: 6, life: 1.8, spread: 300, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
