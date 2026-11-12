// r2a0082: star_advice, ADVICE SOLO, "Slow down, | Sagittarius." (~49 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Sagittarius truth + a warm reframe, one gag each.
//   0.0–3.6    "Slow down, | *Sagittarius.*"
//   3.6–37.8   nine cards (3.8 s each):
//              three trips booked → unpack one bag · twelve hobbies → pick a favourite · yes to every plan → the couch misses you
//              · rushing off → stay for dessert · blunt truth → add a little sugar · a match wants a slow date → say yes
//              · restless → adventure fits in a walk · always the next horizon → the telescope turns round · rest is a pit stop
//  37.8        "Wild heart. | *Gentle pace.*"  Sagittarius comes back, big.
//  41.2        callback: "The bags? | *One unpacked.*"  The suitcase tower comes back, one open.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'sagittarius', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#8a4a2e', PURP = '#c97bff'
const CASE_COLS = ['#ff9a4a', '#6fc3ff', PINK]
// a tower of three suitcases; `open` (0..1) pops the top one open with clothes folded inside
function suitcases(x, t, cx, cy, k, open = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 3; i++) {
    const w = 220 - i * 30, h = 110, y = -i * 120
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, y - h / 2 - 6, w + 12, h + 12)
    x.fillStyle = CASE_COLS[i]; x.fillRect(-w / 2, y - h / 2, w, h)
    x.fillStyle = INK; x.fillRect(-w / 2 + 20, y - 4, w - 40, 8)
    if (i === 2 && open > 0.01) {
      x.save(); x.translate(-w / 2, y - h / 2); x.rotate(-1.2 * open)
      x.fillStyle = INK; x.fillRect(-6, -h * 0.6 - 6, w + 12, h * 0.6 + 6); x.fillStyle = CASE_COLS[i]; x.fillRect(0, -h * 0.6, w, h * 0.6)
      x.restore()
      x.fillStyle = MINT; x.fillRect(-w / 2 + 16, y - h / 2 - 2, w - 32, 22 * open); x.fillStyle = GOLD; x.fillRect(-w / 2 + 16, y - h / 2 + 22, w - 32, 22 * open)
    } else { x.fillStyle = INK; x.fillRect(-26, y - h / 2 - 22, 52, 10); x.fillRect(-26, y - h / 2 - 22, 8, 22); x.fillRect(18, y - h / 2 - 22, 8, 22) }
  }
  x.restore()
}
const COUCH = [
  'BB........BB',
  'BBCCCCCCCCBB',
  'BBCCCCCCCCBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'K..........K',
]
const COUCH_C = { B: '#7a6fd6', C: '#9a90ee', K: WOOD }
const CAKE = ['....R....', '...CCC...', '..PPPPP..', '.CCCCCCC.', 'PPPPPPPPP']
const CAKE_C = { R: RED, C: CREAM, P: PINK }
const CUBE = ['WWWWW', 'WWWSW', 'WWWWW', 'WSWWW', 'WWWWW']
const SCOPE = [
  'KKK..........',
  'KGGKKKKK.....',
  'KGGGGGGGKKKK.',
  'KGGGGGGGGGGGK',
  'KGGGGGGGKKKK.',
  'KGGKKKKK.....',
  'KKK..........',
]
const CUP = ['..s.s....', '.s.s.....', 'WWWWWWW..', 'WTTTTTWWW', 'WTTTTTW.W', 'WTTTTTWWW', 'WWWWWWW..', '.WWWWW...']
const CUP_C = { W: CREAM, T: '#c98f6a', s: 'rgba(239,230,214,0.7)' }
function phone(x, cx, cy, k, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = MINT; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ YOUR MATCH', 0, -132)
  draw(x); x.restore()
}
function msg(x, cx, cy, txt, col, k, size = 28) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(txt).width + 30
  x.fillStyle = col; x.fillRect(-w / 2, -size, w, size * 2); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Three trips this month? | *Unpack one bag.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', star: { x: -200 }, hops: [0.5],
    front(x, t, lt, P) {
      suitcases(x, t, 790, 1020, pop01(t, P.t0 + 0.2, 0.35, 2), 0)
      label(x, 790, 650, 'GATE CLOSING', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Twelve new hobbies? | *Pick a favourite.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', star: { x: -200 },
    front(x, t, lt, P) {
      const H = ['POTTERY', 'SURFING', 'BANJO', 'FRENCH', 'JUGGLING']
      const COLS = [PINK, SKYB, GOLD, MINT, PURP]
      H.forEach((h, i) => label(x, 780 + (i % 2 ? 30 : -20), 610 + i * 105, h, pop01(t, P.t0 + 0.2 + i * 0.18, 0.25, 2.2), { size: 32, bg: COLS[i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
      const k = pop01(t, P.t0 + 1.6, 0.3, 2.4)
      if (k > 0.01) { x.save(); x.strokeStyle = RED; x.lineWidth = 7 * k; x.beginPath(); x.ellipse(780, 820, 130, 46, -0.05, 0, Math.PI * 2); x.stroke(); x.restore() }
    } },
  { sign: S, cap: 'Yes to every plan? | *Your couch misses you.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, COUCH, COUCH_C, 790, 1010, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 760, 'come home | sometime?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 790, 1150, 'COUCH: LONELY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PURP, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Off to the next thing? | *Stay for dessert.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 960, 26 * pop01(t, P.t0 + 0.25, 0.35, 2))
      bubble(x, 790, 720, 'one more bite', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 790, 940, P.t0 + 1.2, 6, 140, 0.3)
    } },
  { sign: S, cap: 'Brutal honesty? | *Add a little sugar.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 680, lt > 1.3 ? 'love you, but…' : 'that’s bad.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      for (let i = 0; i < 3; i++) {
        const d = prog(lt, 0.6 + i * 0.2, 1.1 + i * 0.2)
        if (d > 0) drawBits(x, CUBE, { W: '#fff', S: '#d9e2ff' }, 740 + i * 60, lerp(560, 980, ease.inQuad(d)), 14, { rot: i * 0.4 })
      }
      label(x, 790, 1100, 'SWEETENED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match wants a slow date. | *Say yes.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), x => {
        msg(x, -6, -60, 'picnic? no flights', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2), 24)
        msg(x, 6, 20, 'just… sit?', PINK, pop01(t, P.t0 + 0.9, 0.25, 2.2))
        msg(x, -6, 110, 'okay. yes.', GOLD, pop01(t, P.t0 + 1.5, 0.25, 2.2))
      })
      hearts(x, t, 620, 1000, P.t0 + 1.6, { n: 5, life: 1.5, spread: 120, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Restless at home? | *Adventures fit in a walk.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#9fe0a0'; x.fillRect(-142, -142, 284, 284)
        x.fillStyle = SKYB; x.fillRect(40, -142, 50, 284)
        x.fillStyle = INK; const n = Math.floor(prog(lt, 0.4, 1.4) * 9)
        for (let i = 0; i < n; i++) x.fillRect(-110 + i * 20, 90 - Math.sin(i * 0.8) * 60 - i * 12, 10, 10)
        x.fillStyle = RED; x.fillRect(60, -40, 22, 22)
        x.restore()
      }
      label(x, 790, 1090, 'TRIP: 10 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Always the next horizon? | *Look where you are.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: lt => [lt > 1.3 ? -1 : 1, 0], star: { x: -200 },
    front(x, t, lt, P, F) {
      const flip = ease.inOutCubic(prog(lt, 0.9, 1.3))
      drawBits(x, SCOPE, { K: INK, G: GOLD }, F.x + 200, F.cy - 40, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 - 2 * flip })
      label(x, 790, 650, flip > 0.5 ? 'VIEW: HERE ♥' : 'VIEW: FAR', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: flip > 0.5 ? PINK : SKYB, rot: -0.04, font: MONO, weight: 700 })
      if (flip > 0.5) hearts(x, t, 400, 900, P.t0 + 1.4, { n: 5, life: 1.5, spread: 180, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Rest isn’t wasted time. | *It’s a pit stop.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 760, 960, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 700, 'PIT STOP: 1 NAP', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1130, 'REFUELLED ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0082', key: 'F', accent: '#c97bff', solo: S, ending: 'callback',
  title: 'Slow down, | *Sagittarius.*',
  cameos: CAMEOS,
  group: { cap: 'Wild heart. | *Gentle pace.*', mood: 'sparkle' },
  last: {
    text: 'The bags? | *One unpacked.*',
    draw(x, t, lt) {
      suitcases(x, t, 540, 1330, 1.25 * pop01(t, t - lt + 0.6, 0.4, 2), ease.outBack ? clamp(prog(lt, 1.4, 1.9)) : 0)
      sparkles(x, t, 540, 1050, t - lt + 1.9, 8, 160, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
