// r2a0060: star_advice, ADVICE ROLLCALL, "Each sign's | autumn ritual." (~61 s vertical, signs3kit, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific, relatable autumn ritual per sign + a light visual gag.
//   0.0–3.6    "Each sign’s | *autumn ritual.*"
//   3.6–49.2   Aries: first in the big scarf · Taurus: bakes a pie, shares a slice · Gemini: two sweaters, both cosy · Cancer:
//              a blanket fort with room for you · Leo: a leaf-pile entrance · Virgo: rakes leaves by colour · Libra: the
//              perfect candle · Scorpio: walks at golden hour · Sagittarius: a road trip for the leaves · Capricorn: plans
//              next year with cocoa · Aquarius: stargazing on longer nights · Pisces: cries at a pretty leaf
//  49.2        "Cosy season. | *Everyone’s in.*"
//  52.4        LESSON: "Slow down like the season. | *Rest is allowed.*"  STATUS: COSY
//  58.3        "Grab a blanket. | *Stay a while.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RUST = '#e0763a', RED = '#e23d4e', BROWN = '#8a4a2e', AMBER = '#ffb347', OLIVE = '#b5b84a'

const LEAF = ['....L....', '...LLL...', '..LLLLL..', '.LLLSLLL.', 'LLLLSLLLL', '.LLLSLLL.', '..LLSLL..', '....S....', '....S....']
const LEAF_COLS = [RUST, AMBER, RED, OLIVE, GOLD]
const SCARF = ['RRRRRRRRRRRR', 'RWRRWRRWRRWR', 'RRRRRRRRRRRR', '........RRR.', '........RWR.', '........RRR.', '........RWR.', '........W.W.']
const PIE = ['.....CCCCCC.....', '...CCCCCCCCCC...', '.CCCCCcCCcCCCCC.', 'CCcCCCCCCCCCcCCC', 'BBBBBBBBBBBBBBBB', '.BBBBBBBBBBBBBB.']
const SLICE = ['CC....', 'CcCC..', 'CCCCC.', 'BBBBBB']
const SWEATER = ['..SSS...SSS..', '.SSSSSSSSSSS.', 'SSSSSSSSSSSSS', 'SS.SWSWSWS.SS', 'SS.SSSSSSS.SS', 'SS.SWSWSWS.SS', '...SSSSSSS...']
const CANDLE = ['....F....', '...FYF...', '....K....', '.CCCCCCC.', '.CWCCCCC.', '.CCCCCCC.', '.CCCCCCC.', '.CCCCCCC.', 'GGGGGGGGG']
const MUG = ['.S.S.....', 'BBBBBBB..', 'BMMMMMBBB', 'BBBBBBB.B', 'BBBBBBB.B', 'BBBBBBBBB', '.BBBBB...']
const STAR = ['...Y...', '...Y...', 'YYYYYYY', '.YYYYY.', '..YYY..', '.YY.YY.', 'Y.....Y']
const CAR = ['....BBBBB.....', '...BSSBSSB....', 'BBBBBBBBBBBBBB', 'BBBBBBBBBBBBBB', '.KK.......KK..']
function leaf(x, cx, cy, cell, i, rot = 0, k = 1) { drawBits(x, LEAF, { L: LEAF_COLS[i % 5], S: BROWN }, cx, cy, cell * k, { rot }) }
function falling(x, t, cx, cy, n, w, h, a = 1, seed = 0) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.35 + i / n + seed * 0.1) % 1 + 1) % 1
    x.save(); x.globalAlpha = a * Math.sin(Math.PI * ph); leaf(x, cx - w / 2 + ((i * 97 + seed * 31) % w) + Math.sin(ph * 8 + i) * 30, cy - h / 2 + ph * h, 7, i + seed, Math.sin(ph * 6 + i)); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'First in the big scarf. | *You set the mood.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P, F) {
      drawBits(x, SCARF, { R: RED, W: BONE }, F.x + 20, F.cy + 150, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 820, 'DAY 1 OF FALL', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: AMBER, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Bakes a whole pie. | *Shares a slice.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PIE, { C: '#d99a4e', c: BROWN, B: '#b8763a' }, 790, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const s = ease.outCubic(prog(lt, 1.1, 1.6))
      if (s > 0) drawBits(x, SLICE, { C: '#d99a4e', c: BROWN, B: '#b8763a' }, lerp(820, 860, s), lerp(860, 700, s), 18)
      label(x, 790, 1060, 'FOR YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two sweaters on. | *Both cosy.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { S: AMBER, W: BONE }, 720, 820, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      drawBits(x, SWEATER, { S: OLIVE, W: BONE }, 860, 960, 14 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: 0.08 })
      label(x, 790, 1120, 'LAYERS: 2', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Blanket fort. | *Room for you.*', mood: 'heart', look: [1, 0], star: { x: -170, y: 40 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(380, 1120); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.moveTo(-230, 0); x.lineTo(0, -300); x.lineTo(230, 0); x.fill()
      x.fillStyle = '#7a8fd0'; x.beginPath(); x.moveTo(-210, -6); x.lineTo(0, -280); x.lineTo(210, -6); x.fill()
      x.fillStyle = '#2a2350'; x.beginPath(); x.moveTo(-120, -6); x.lineTo(0, -170); x.lineTo(120, -6); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'come in!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 48, col: PINK, tail: 'bl' })
      label(x, 790, 960, 'SEATS: 1 MORE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Leaf-pile entrance. | *Iconic.*', mood: 'sparkle', star: { x: 0, y: 0 }, hops: [0.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      for (let i = 0; i < 14; i++) leaf(x, 320 + (i % 7) * 72, 1110 - Math.floor(i / 7) * 40, 9, i, i * 0.7, k)
    },
    front(x, t, lt, P) {
      const b = ease.outCubic(prog(lt, 0.6, 1.4))
      if (b > 0 && b < 1) for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i - 3.5) * 0.35; x.save(); x.globalAlpha = 1 - b; leaf(x, 540 + Math.cos(a) * 340 * b, 1000 + Math.sin(a) * 340 * b, 8, i, b * 6); x.restore() }
      label(x, 790, 640, 'TA-DA', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Rakes leaves | *by colour.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let c = 0; c < 3; c++) for (let j = 0; j < 3; j++) leaf(x, 690 + c * 100, 1040 - j * 70, 9, [0, 1, 3][c], 0, pop01(t, P.t0 + 0.3 + c * 0.3 + j * 0.1, 0.25, 2))
      label(x, 790, 720, 'SORTED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: OLIVE, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Finds the perfect | *cosy candle.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CANDLE, { F: AMBER, Y: '#fff1b0', K: INK, C: PINK, W: BONE, G: GOLD }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'SCENT: CRISP AIR', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Walks at golden hour. | *Soft era.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const a = ease.outCubic(prog(lt, 0.2, 1.0))
      const g = x.createRadialGradient(780, 760, 10, 780, 760, 340); g.addColorStop(0, `rgba(255,179,71,${(0.55 * a).toFixed(3)})`); g.addColorStop(1, 'rgba(255,179,71,0)')
      x.fillStyle = g; x.fillRect(110, 480, 860, 740)
    },
    front(x, t, lt, P) {
      falling(x, t, 790, 860, 5, 320, 520, pop01(t, P.t0 + 0.3, 0.3, 2), 2)
      label(x, 790, 1080, 'GOLDEN HOUR', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: AMBER, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Road trip | *for the leaves.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      drawBits(x, CAR, { B: RUST, S: SKYB, K: INK }, lerp(260, 340, prog(lt, 0, 2.4)), 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 320, 760, 'FOLIAGE →', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: OLIVE, rot: -0.05, font: MONO, weight: 700 })
      falling(x, t, 320, 860, 4, 300, 500, 1, 4)
    } },
  { sign: 'capricorn', cap: 'Plans next year. | *With cocoa.*', mood: 'happy', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      label(x, 300, 740, 'NEXT YEAR: PLAN', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: BONE, font: MONO, weight: 700 })
      drawBits(x, MUG, { S: '#cfc7ff', B: OLIVE, M: BROWN }, 320, 940, 22 * pop01(t, P.t0 + 0.9, 0.3, 2))
    } },
  { sign: 'aquarius', cap: 'Longer nights. | *More stars to see.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 7; i++) drawBits(x, STAR, { Y: i % 2 ? GOLD : BONE }, 660 + (i * 83) % 260, 640 + (i * 131) % 380, 9 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.25, 2) * (0.85 + 0.15 * Math.sin(t * 4 + i)))
      label(x, 790, 1100, 'SKY: FREE SHOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries at a | *pretty leaf.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      leaf(x, 790, lerp(620, 880, ease.outCubic(prog(lt, 0.2, 1.4))), 22, 0, Math.sin(t * 2) * 0.3, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'SO PRETTY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0060', key: 'G', accent: AMBER, ending: 'lesson',
  title: 'Each sign’s | *autumn ritual.*',
  cameos: CAMEOS,
  group: { cap: 'Cosy season. | *Everyone’s in.*', draw(x, t, lt) { falling(x, t, 540, 1080, 10, 900, 700, 0.9, 1) } },
  lesson: { text: 'Slow down like the season. | *Rest is allowed.*', chip: 'STATUS: COSY' },
  last: { text: 'Grab a blanket. | *Stay a while.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
