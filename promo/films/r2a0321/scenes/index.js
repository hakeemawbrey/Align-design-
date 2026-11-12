// r2a0321: star_advice, ADVICE SOLO (sagittarius), "Sagittarius, let yourself | be loved." (signs3kit social cut, music:
// lofi · D). Nine cards: a true Sagittarius habit + a warm reframe, one gag each. Ending: card (Sagittarius + Libra, the
// travel buddy from card one).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#ff9a4a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const PACK = ['...KKKK...', '..KK..KK..', '.OOOOOOOO.', 'OOOOOOOOOO', 'OOYYYYYYOO', 'OOYOOOOYOO', 'OOYYYYYYOO', 'OOOOOOOOOO', 'OOOOOOOOOO', '.OOOOOOOO.']
const SOUP = ['..S...S...', '...S...S..', '..S...S...', 'KKKKKKKKKK', 'KOOOOOOOOK', 'KOOGOOOGOK', '.KOOOOOOK.', '..KKKKKK..']
const MITT = ['..BBBBB...', '.BBBBBBB..', 'BBBBBBBBB.', 'BBBLLLBBBB', 'BBBLLLBBBB', 'BBBBBBBBB.', '.BBBBBBB..', '..BBBBB...', '...BBB....']
const SOCK = ['..WWW', '..WRW', '..WWW', '..WWW', 'WWWWW', 'WWWW.']
const CHAIR = ['KKKKKK..', 'KCCCCK..', 'KCCCCK..', 'KCCCCK..', 'KCCCCKKK', 'KCCCCCCK', 'KKKKKKKK', 'K.K..K.K', 'K.K..K.K', 'K.K..K.K']
const CLOUD = ['...WWWW.....', '.WWWWWWWW...', 'WWWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const HAT = ['....Y....', '...YPY...', '..YPPPY..', '.YPPYPPY.', 'YPPPPPPPY']
const HEARTBM = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}
/** an open door with warm light spilling out */
function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-104, -210, 208, 420)
  x.fillStyle = '#ffe7a8'; x.fillRect(-92, -198, 184, 408)
  x.save(); x.globalAlpha = 0.28 * open; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(-92, 210); x.lineTo(92, 210); x.lineTo(200, 300); x.lineTo(-200, 300); x.closePath(); x.fill(); x.restore()
  const w = 184 * (1 - 0.75 * open)
  x.fillStyle = INK; x.fillRect(-98, -204, w + 10, 416)
  x.fillStyle = '#c9915a'; x.fillRect(-92, -198, w, 404)
  x.fillStyle = '#a8743f'; x.fillRect(-92 + w * 0.15, -170, w * 0.7, 150); x.fillRect(-92 + w * 0.15, 10, w * 0.7, 160)
  x.fillStyle = GOLD; x.fillRect(-92 + w - 26, 0, 14, 14)
  x.restore()
}

const S = 'sagittarius', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Scared of strings? | Love can *come along.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PACK, { K: INK, O: ACC, Y: GOLD }, 250, 1080, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'libra', 800, 940, 190 * k, { mood: 'sparkle', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.4] })
        drawBits(x, PACK, { K: INK, O: PINK, Y: BONE }, 900, 1060, 11 * k)
      }
      bubble(x, 790, 680, 'where to?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Joke when it gets deep? | They *still listen.*', mood: lt => lt > 1.4 ? 'happy' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'haha ANYWAY—', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 780, 860, "I'm still | here. go on.", pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      L(x, 790, 1080, 'DEFLECTION: CAUGHT', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Need freedom? | Love *holds the door.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.7, 1.3)))
      L(x, 790, 600, 'COME & GO', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Dodging compliments? | *Catch one.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const W = ['so kind', 'so funny', 'so brave']
      W.forEach((w, i) => { const p = prog(lt, 0.2 + i * 0.3, 0.8 + i * 0.3); if (p > 0 && p < 1) bubble(x, lerp(900, 520, p), 620 + i * 110, w, 1, { size: 32, col: i === 2 ? PINK : BONE, tail: 'bl' }) })
      drawBits(x, MITT, { B: '#c9915a', L: '#8a4a2e' }, 560, 960, 16 * pop01(t, P.t0 + 1.3, 0.3, 2))
      if (lt > 1.6) drawBits(x, HEARTBM, { H: PINK, W: '#fff' }, 560, 930, 10)
      L(x, 760, 1140, 'CAUGHT: 1', pop01(t, P.t0 + 1.8, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Hate a fuss? | Let them *make soup.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 880, 170 * k, { mood: 'heart', look: [-1, 0], seed: 11, glyph: false })
      drawBits(x, SOUP, { K: INK, O: '#ffb34a', G: '#5fd068', S: '#ffffff' }, 640, 1060, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 650, 'SOUP: ACCEPTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Always the fun one? | *Bad days* are allowed.', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CLOUD, { W: '#9aa5c4' }, 370, 590, 16 * k)
    },
    front(x, t, lt, P, F) {
      const s = ease.inCubic(prog(lt, 0.4, 1.0))
      drawBits(x, HAT, { Y: GOLD, P: PINK }, F.x + 40 * s, F.top - 30 + 220 * s, 12, { rot: 1.4 * s })
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 920, 170 * k, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false })
      L(x, 800, 680, 'STILL INVITED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Bag by the door? | *Unpack.* Stay a while.', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PACK, { K: INK, O: ACC, Y: GOLD }, 790, 980, 18 * k)
      const p = prog(lt, 0.8, 1.4)
      if (p > 0) drawBits(x, SOCK, { W: '#ffffff', R: RED }, lerp(790, 860, p), lerp(900, 700, p) + 160 * p * p, 12, { rot: 2 * p })
      L(x, 790, 640, 'UNPACKED: 1 SOCK', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'They asked for your chart? | *Not a trap.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 800, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1010, 'JUST CURIOUS', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'They saved you a seat? | *Sit.* It’s yours.', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { K: INK, C: ACC }, 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 640, 'RESERVED: SAG', pop01(t, P.t0 + 0.6, 0.3, 2.4), GOLD, -0.04, 34)
      hearts(x, t, 800, 1000, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0321', key: 'D', accent: ACC, solo: 'sagittarius', ending: 'card',
  title: 'Sagittarius, let | yourself *be loved.*',
  cameos: CAMEOS,
  group: { cap: 'Wild heart. | *Worth holding.*', mood: 'heart' },
  lesson: { text: "Love isn't a cage. | It's a *window seat.*", chip: 'STATUS: LOVED' },
  card: { a: 'sagittarius', b: 'libra', chip: 'ALIGNED' },
  last: { text: 'Pack for *two.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
