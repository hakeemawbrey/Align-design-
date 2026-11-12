// r2t0487: star_talk, SOLO (sagittarius), "Sagittarians shopping | *be like.*" (signs3kit social cut, music: lofi · E).
// Ending: lesson (LESSON UNLOCKED, then the last line). No match card.
//   went in for socks, left with a kayak · "that shirt? honestly, no." · no cart, carries everything · bought a tent, lives
//   in an apartment · got lost in aisle 42, called it an adventure · shopped by their horoscope ("bold moves") · returned
//   it, bought a disco ball · tried on one hat, became a captain · budget twenty, spent: yes.
//   group "Came for one thing. | Left with a story."  lesson "Love a Sag? | Love the adventure."
//   last "Still no socks. | Kayak, though."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'sagittarius', ACC = '#ff9a4a', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// ── props
const KAYAK = [
  '..............KK..',
  '.OOOOOOOOOOOOOOOO.',
  'OOOYYYOOOOOOOYYYOO',
  '.OOOOOOOOOOOOOOOO.',
  '......PPPPP.......',
]
const KAYAK_C = { O: '#ff9a4a', Y: GOLD, K: INK, P: SLATE }
const BOXB = ['TTTTTTTT', 'BBBBBBBB', 'BBKBBKBB', 'BBBBBBBB']
const SHIRT = [
  'GG.GGGG.GG',
  'GGGGGGGGGG',
  '.GGPGGPGG.',
  '..GGGGGG..',
  '..GPGGPG..',
  '..GGGGGG..',
]
const SHIRT_C = { G: '#c97bff', P: GOLD }
const TENT = [
  '.....OO.....',
  '....OOOO....',
  '...OOKKOO...',
  '..OOOKKOOO..',
  '.OOOOKKOOOO.',
  'OOOOOKKOOOOO',
]
const TENT_C = { O: MINT, K: INK }
const DISCO = [
  '....KK....',
  '...SWSW...',
  '..WSWSWS..',
  '.SWSWSWSW.',
  '.WSWSWSWS.',
  '.SWSWSWSW.',
  '..WSWSWS..',
  '...SWSW...',
]
const DISCO_C = { K: INK, S: '#c3cbe0', W: '#ffffff' }
const HAT = [
  '...WWWW...',
  '..WWGGWW..',
  '.WWWWWWWW.',
  'KKKKKKKKKK',
  '.KKKKKKKK.',
]
const HAT_C = { W: CREAM, G: GOLD, K: '#2a2350' }
// a paper map with a dotted path and an X
function map(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -136, 352, 272); x.fillStyle = '#f2dca8'; x.fillRect(-170, -130, 340, 260)
  x.fillStyle = '#e0c48a'; x.fillRect(-60, -130, 6, 260); x.fillRect(60, -130, 6, 260)
  x.fillStyle = RED
  for (let i = 0; i < 9; i++) if (i / 9 < p) { const a = i / 8; x.fillRect(-140 + a * 250, 70 - Math.sin(a * 6) * 60 - a * 40, 14, 14) }
  if (p > 0.95) { x.fillStyle = RED; x.save(); x.translate(120, -40); x.rotate(Math.PI / 4); x.fillRect(-26, -6, 52, 12); x.fillRect(-6, -26, 12, 52); x.restore() }
  x.restore()
}
// a horoscope card
function scope(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260); x.fillStyle = CREAM; x.fillRect(-164, -124, 328, 248)
  x.fillStyle = ACC; x.fillRect(-164, -124, 328, 62)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('♐︎ TODAY', 0, -92)
  x.font = `800 40px ${INTER}`; x.fillText('Bold moves.', 0, -10); x.fillText('Say yes.', 0, 50)
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  // 1 · socks → kayak
  { sign: S, cap: 'Went in for socks. | *Left with a kayak.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 620, 'just socks!', pop01(t, P.t0 + 0.2, 0.22, 2.2), { size: 42, tail: 'bl' })
      drawBits(x, KAYAK, KAYAK_C, 760, 900, 22 * pop01(t, P.t0 + 0.9, 0.35, 2), { rot: -0.12 })
      L(x, 790, 1110, 'SOCKS: FORGOT', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  // 2 · brutal honesty
  { sign: S, cap: 'Your shirt? | *Honestly, no.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHIRT, SHIRT_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 620, 'put it back.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      L(x, 800, 1120, 'FILTER: NONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 34)
    } },
  // 3 · no cart
  { sign: S, cap: 'A cart? | *Never. Carries it all.*', mood: 'wide', look: [0, -1], star: { x: -170, y: 60 },
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.22))
      const sway = Math.sin(t * 5) * 0.05 * clamp(lt - 1)
      x.save(); x.translate(370, 880); x.rotate(sway)
      for (let i = 0; i < n; i++) drawBits(x, BOXB, { T: '#e0a56a', B: i % 2 ? '#c98a4e' : ACC, K: INK }, (i % 2 ? 14 : -14), -i * 44, 12 * pop01(t, P.t0 + 0.2 + i * 0.22, 0.2, 2))
      x.restore()
      L(x, 790, 800, 'ITEMS: 41', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 40)
      bubble(x, 780, 1040, 'i got it i got it', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  // 4 · a tent, an apartment
  { sign: S, cap: 'Bought a tent. | *Lives in an apartment.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TENT, TENT_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 640, 'TRIP PLANNED: NO', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, 0.04, 32)
      L(x, 790, 1110, 'IT’S IN THE LIVING ROOM', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 26)
    } },
  // 5 · lost in the store
  { sign: S, cap: 'Got lost in the store. | *Called it a quest.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      map(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.4, 1.4))
      L(x, 790, 1080, 'AISLE 42: UNCHARTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  // 6 · Align: shopped by their horoscope
  { sign: S, cap: 'Horoscope said “bold.” | *Bought bold.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      scope(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1060, 'CART: VERY FULL', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, 0.04, 34)
      sparkles(x, t, 790, 820, P.t0 + 1.4, 8, 200, 0.5)
    } },
  // 7 · returned it, bought weirder
  { sign: S, cap: 'Went to return it. | *Came back with this.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      drawBits(x, DISCO, DISCO_C, 790, 860 + Math.sin(t * 2) * 6, 26 * k, { rot: t * 0.6 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 10, 200, 0.2, [SKYB, BONE, PINK])
      L(x, 790, 620, 'RETURNS DESK', pop01(t, P.t0 + 0.2, 0.3, 2.4), SLATE, -0.04, 32)
      L(x, 790, 1110, 'A DISCO BALL', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 36)
    } },
  // 8 · one hat, a new person
  { sign: S, cap: 'Tried on one hat. | *Became a new person.*', mood: 'wink', look: [1, 0], star: { x: -170, y: 40 },
    front(x, t, lt, P, F) {
      drawBits(x, HAT, HAT_C, F.x + 10, F.top - 30, 26 * pop01(t, P.t0 + 0.5, 0.3, 2.2), { rot: 0.1 })
      bubble(x, 780, 700, 'call me | Captain.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, col: GOLD, tail: 'bl' })
      L(x, 790, 1060, 'NEW NAME: CAPTAIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  // 9 · the budget
  { sign: S, cap: 'Budget: twenty dollars. | *Spent: yes.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 720, 'BUDGET: $20', pop01(t, P.t0 + 0.2, 0.3, 2.4), MINT, -0.04, 40)
      const n = Math.round(lerp(20, 1240, ease.inCubic(prog(lt, 0.6, 1.6))))
      L(x, 790, 900, `SPENT: $${n.toLocaleString('en-US')}`, pop01(t, P.t0 + 0.6, 0.3, 2.4), RED, 0.04, 40)
      bubble(x, 790, 1090, 'worth it', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0487', key: 'E', accent: ACC, solo: S,
  title: 'Sags shopping | *be like.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Came for one thing. | *Left with a story.*', mood: 'sparkle' },
  lesson: { text: 'Love a Sag? | Love *the adventure.*', chip: 'CART: FULL' },
  last: { text: 'Still no socks. | *Kayak, though.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
