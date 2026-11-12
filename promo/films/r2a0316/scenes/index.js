// r2a0316: star_advice, ADVICE SOLO, "Sag, celebrate | *the small wins.*" (topic: Sagittarius, celebrate the small wins) (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Sagittarius truth + a warm reframe, one light gag each.
// Ending: callback.
//   0.0–3.6    hook
//   3.6–37.8   look back at the trail · one chapter counts · got up and stretched: gold medal · a slightly burnt pancake is still a win
//              · answered one text: victory lap · saved a little: future-you says thanks · the plant has a new leaf
//              · made the bed · messaged a new match: brave
//  37.8        "Small wins | *add up.*"
//  41.2        callback: "Made it to the end? | *Another medal.*" — card 3's medal comes back and lands.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SLATE = '#9fb4c8', RED = '#e23d4e', CREAM = '#fff8ea', WOOD = '#c98f5a', SAND = '#f3d79a'
// ── props
/** a paper sheet / screen with a coloured header and text rows: [text, colour?, k?] */
function sheet(x, cx, cy, k, { w = 330, h = 380, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30, scale = 1.12, paper = CREAM, ink = INK, font = MONO } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  const top = -h / 2 + (head ? 60 : 0) + 44
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || ink; x.font = `700 ${size}px ${font}`
    x.fillText(txt, -w / 2 + 22, top + i * (size + 16)); x.restore()
  })
  x.restore()
}
/** a wall clock */
function clock(x, cx, cy, k, hh, mm) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 100 - 5, Math.sin(a) * 100 - 5, 10, 10) }
  const ha = ((hh % 12) + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = mm / 60 * Math.PI * 2 - Math.PI / 2
  x.lineCap = 'square'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 56, Math.sin(ha) * 56); x.stroke()
  x.lineWidth = 9; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 88, Math.sin(ma) * 88); x.stroke()
  x.fillStyle = INK; x.fillRect(-10, -10, 20, 20)
  x.restore()
}
/** a mini birth-chart wheel */
function chartWheel(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', SAND, SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
const LAPTOP = ['..KKKKKKKKKKKK..', '..KSSSSSSSSSSK..', '..KSWWWWWWWSSK..', '..KSSSSSSSSSSK..', '..KSWWWWWSSSSK..', '..KSSSSSSSSSSK..', '..KKKKKKKKKKKK..', 'GGGGGGGGGGGGGGGG', '.GGGGGGGGGGGGGG.']
const LAPTOP_C = { K: INK, S: SKYB, W: CREAM, G: '#a9a9bf' }
const UMBRELLA = ['....RRRRRRR....', '..RRWWRRRWWRR..', '.RRWWWRRRWWWRR.', 'RRRRRRRRRRRRRRR', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '......KK.......']
const UMBRELLA_C = { R: '#ff6b5a', W: CREAM, K: INK }
const CAKE = ['....F..F..F....', '....C..C..C....', '..PPPPPPPPPPP..', '..PWPWPWPWPWP..', '..BBBBBBBBBBB..', '.BBBBBBBBBBBBB.', '.PPPPPPPPPPPPP.', 'BBBBBBBBBBBBBBB', 'BBBBBBBBBBBBBBB', 'KKKKKKKKKKKKKKK']
const CAKE_C = { F: GOLD, C: CREAM, P: PINK, W: CREAM, B: '#c98f5a', K: '#8a4a2e' }
/** a phone with message bubbles: [text, colour, k, right?] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 32px ${INTER}`; const w = x.measureText(txt).width + 30
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 15, 2)
    x.restore()
  })
  x.restore()
}
const MEDAL = ['RR.....RR', '.RR...RR.', '..RR.RR..', '...RRR...', '..GGGGG..', '.GGYYYGG.', 'GGYGGGYGG', 'GGYGGGYGG', 'GGYGGGYGG', '.GGYYYGG.', '..GGGGG..']
const MEDAL_C = { R: '#e23d4e', G: GOLD, Y: '#fff1a8' }
const BOOK = ['KKKKKKKKKKKKKKKK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLLLWK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLLWWK', 'KWWWWWWKKWWWWWWK', 'KWLLLWWKKWLLLLWK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLWWWK', 'KWWWWWWKKWWWWWWK', 'KKKKKKKKKKKKKKKK']
const BOOK_C = { K: '#8a4a2e', W: '#fff8ea', L: '#9a90b8' }
const PIGGY = ['......PP....', '.PPPPPPPPP..', 'PPPPPPPPPPP.', 'PPKPPPPPPPPS', 'PPPPPPPPPPPS', 'PPPPPPPPPPP.', '.PPPPPPPPP..', '.PP.....PP..']
const PIGGY_C = { P: '#ff9cc0', K: INK, S: '#ff6fa3' }
const COIN = ['.YYYY.', 'YYWYYY', 'YWYYYY', 'YYYYYY', 'YYYYYY', '.YYYY.']
const COIN_C = { Y: GOLD, W: '#fff1a8' }
const PLANT = ['....L.L....', '...LL.LL...', '..LLL.LLL..', '...LLLLL...', '.....L.....', '.....L.....', '.TTTTTTTTT.', '.TTTTTTTTT.', '..TTTTTTT..', '..TTTTTTT..', '...TTTTT...']
const PLANT_C = { L: '#5fd068', T: '#d9774a' }
const BED = ['WW.............', 'WW.............', 'WWPPPBBBBBBBBBB', 'WWPPPBBBBBBBBBB', 'WWBBBBBBBBBBBBB', 'WWWWWWWWWWWWWWW', 'W.............W']
const BED_C = { W: '#c98f5a', P: '#fff8ea', B: '#8fb8ff' }

const ORANGE = '#ff9a4a', VIOLET = '#b07bff'
/** a dotted trail across a little map, with a YOU ARE HERE pin at the end */
function trail(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-196, -166, 392, 332); x.fillStyle = '#e9dcb8'; x.fillRect(-188, -158, 376, 316)
  x.fillStyle = '#b6d79a'; x.fillRect(-150, 40, 110, 70); x.fillRect(40, -120, 120, 60); x.fillStyle = '#9ccbe8'; x.fillRect(-60, -110, 70, 50)
  const pts = []; for (let i = 0; i <= 14; i++) { const u = i / 14; pts.push([-160 + u * 300, 110 - u * 230 + Math.sin(u * 9) * 40]) }
  const n = Math.floor(clamp((lt - 0.2) / 1.2) * pts.length)
  x.fillStyle = RED; pts.slice(0, n).forEach(([a, b]) => x.fillRect(a - 6, b - 6, 12, 12))
  if (n >= pts.length) { const [a, b] = pts[pts.length - 1]; x.fillStyle = INK; x.fillRect(a - 16, b - 54, 32, 40); x.fillStyle = GOLD; x.fillRect(a - 10, b - 48, 20, 28); x.fillStyle = INK; x.fillRect(a - 3, b - 14, 6, 16) }
  x.restore()
}
/** a frying pan with a (slightly burnt) pancake */
function pan(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(110, -14, 170, 28); x.fillStyle = '#3a3358'; x.fillRect(116, -8, 160, 16)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 140, 100, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#4a4468'; x.beginPath(); x.ellipse(0, 0, 128, 88, 0, 0, Math.PI * 2); x.fill()
  const fy = -Math.max(0, Math.sin(Math.PI * clamp((lt - 0.4) / 0.6))) * 160
  x.fillStyle = '#e7a84a'; x.beginPath(); x.ellipse(0, fy, 86, 56, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#8a4a2e'; x.beginPath(); x.ellipse(-20, fy + 8, 40, 22, 0.3, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a little oval running track with the star doing a lap */
function track(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 200, 120, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e07a5a'; x.beginPath(); x.ellipse(0, 0, 190, 110, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#5fd068'; x.beginPath(); x.ellipse(0, 0, 140, 64, 0, 0, Math.PI * 2); x.fill()
  x.strokeStyle = CREAM; x.lineWidth = 3; x.setLineDash([12, 10]); x.beginPath(); x.ellipse(0, 0, 165, 87, 0, 0, Math.PI * 2); x.stroke(); x.setLineDash([])
  x.restore()
  if (k > 0.5) { const a = lt * 2.6 + 1.6; signChar(x, t, 'sagittarius', cx + Math.cos(a) * 165 * k, cy + Math.sin(a) * 87 * k - 30, 90, { mood: 'sparkle', seed: 55, glyph: false, glow: 0.6 }) }
}

const S = 'sagittarius'
const CAMEOS = [
  { sign: S, cap: 'Chasing the next thing? | *Look how far you came.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      trail(x, t, 770, 840, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 770, 1080, 'MILES: SO MANY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Only read one chapter? | *That counts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 780, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 780, 1070, 'CHAPTER 1 ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 860, P.t0 + 1.25, 6, 180, 0.2)
    } },
  { sign: S, cap: 'Got up and stretched? | *Gold medal.*', mood: lt => lt > 1.1 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.5, 1.1))
      if (lt > 0.45) drawBits(x, MEDAL, MEDAL_C, lerp(780, 780, d), lerp(560, 860, d), 22, { rot: 0.08 * Math.sin(t * 3) })
      label(x, 780, 1090, 'WORLD CLASS STRETCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 860, P.t0 + 1.15, 7, 170, 0.4)
    } },
  { sign: S, cap: 'The pancake’s a bit burnt. | *Still a win.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      pan(x, 690, 900, 0.85 * pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      bubble(x, 780, 640, 'chef’s kiss', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Answered one text? | *Take a victory lap.*', mood: 'sparkle', look: [1, 0], star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      track(x, t, 760, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 760, 660, 'REPLIED ✓', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saved a little money? | *Future-you says thanks.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PIGGY, PIGGY_C, 780, 930, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const d = prog(lt, 0.6, 1.1)
      if (d < 1 && lt > 0.55) drawBits(x, COIN, COIN_C, 800, lerp(600, 820, ease.inQuad(d)), 14)
      bubble(x, 780, 650, 'thanks! – you, later', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: PINK, tail: 'br' })
    } },
  { sign: S, cap: 'The plant grew a new leaf. | *So did you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 780, 880, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const lk = pop01(t, P.t0 + 1.0, 0.35, 2.4)
      if (lk > 0.01) drawBits(x, ['.LL', 'LLL', 'LL.'], { L: MINT }, 850, 700, 16 * lk, { rot: 0.3 })
      label(x, 780, 1110, 'NEW LEAF ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Made the bed? | *Fresh start, unlocked.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 770, 940, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      sparkles(x, t, 770, 920, P.t0 + 1.0, 8, 200, 0.6)
      label(x, 770, 680, 'NEAT. NEATER. NEATEST.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said hi to a new match? | *Brave. Celebrate it.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 770, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '♐︎ NEW MATCH', headCol: ORANGE, lines: [
        ['hi :)', SKYB, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['sent ✓', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2), true],
        ['hi!! ♡', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2), false],
      ] })
      hearts(x, t, 560, 780, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0316', key: 'D', accent: ORANGE, solo: 'sagittarius', ending: 'callback',
  title: 'Sag, celebrate | *the small wins.*',
  cameos: CAMEOS,
  group: { cap: 'Small wins | *add up.*', mood: 'sparkle' },
  last: {
    text: 'Made it to the end? | *Another medal.*',
    draw(x, t, lt) {
      const t0 = t - lt, d = ease.outBounce ? ease.outBounce(prog(lt, 0.6, 1.3)) : ease.outCubic(prog(lt, 0.6, 1.3))
      if (lt > 0.55) drawBits(x, MEDAL, MEDAL_C, 540, lerp(700, 1020, d), 30, { rot: 0.06 * Math.sin(t * 3) })
      sparkles(x, t, 540, 1020, t0 + 1.3, 9, 230, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
