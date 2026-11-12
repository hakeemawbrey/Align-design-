// r2t0355: star_talk, ROLL CALL (twelve signs), "The signs at | *a food festival.*" (~57 s vertical, signs3kit social cut,
// music: lofi · F). Each sign's most extreme festival self. Ending: callback.
//   0.0–3.6    "The signs at | *a food festival.*"
//   3.6–49.2   twelve cards: Aries ate the hottest wing first · Taurus tried every stall, twice · Gemini ordered from six
//              stalls at once · Cancer brought containers for leftovers · Leo won the eating contest, took a bow · Virgo
//              read every ingredient list · Libra can't choose, still in line · Scorpio found the secret menu
//              · Sagittarius is now working the grill · Capricorn has a map with a route · Aquarius invented a sauce
//              · Pisces dropped the ice cream, held a funeral
//  49.2        "Twelve signs. | *One food coma.*"
//  52.6        CALLBACK: "Libra finally chose. | *The festival closed.*"  Libra back in line, CLOSED sign.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', PAPER = '#fff4e2'
const L = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 30, font: MONO, weight: 700, ...o })

// ── props
const WING = [
  '....RRR..',
  '..RRRRRR.',
  '.RRrRRRRR',
  'RRRRRRrRR',
  'RRrRRRRR.',
  '.RRRRR...',
  '..WW.....',
  '.WW......',
]
const WING_C = { R: '#e2552e', r: '#ff9a4a', W: PAPER }
const FLAME = ['..Y...', '.YY.Y.', '.YOYY.', 'YOOOY.', 'YORROY', '.ORRO.']
const FLAME_C = { Y: '#ffd23a', O: '#ff9a4a', R: '#ff4f2e' }
const TUB = ['.LLLLLLLL.', 'LLLLLLLLLL', 'BBBBBBBBBB', 'BWWWWWWWWB', 'BWWWWWWWWB', 'BBBBBBBBBB']
const TUB_C = { L: '#7dffb0', B: '#d8dbe8', W: '#ffffff' }
const TROPHY = [
  'YYYYYYYYY',
  'YYYYYYYYY',
  'Y.YYYYY.Y',
  '.YYYYYYY.',
  '..YYYYY..',
  '...YYY...',
  '....Y....',
  '..BBBBB..',
  '.BBBBBBB.',
]
const TROPHY_C = { Y: '#ffd23a', B: '#c98a4e' }
const GLASS = [
  '..KKKK....',
  '.KWWWWK...',
  'KWW..WWK..',
  'KW....WK..',
  'KWW..WWK..',
  '.KWWWWKK..',
  '..KKKK.KK.',
  '........KK',
]
const GLASS_C = { K: '#9aa5c4', W: '#d8f4ff' }
const STALL = [
  'RWRWRWRWRWRWRW',
  'RWRWRWRWRWRWRW',
  '.K..........K.',
  '.K..........K.',
  '.BBBBBBBBBBBB.',
  '.BBBBBBBBBBBB.',
  '.BBBBBBBBBBBB.',
]
const STALL_C = { R: '#ff6b5a', W: PAPER, K: '#6b62a8', B: '#c98a4e' }
const GRILL = [
  'KKKKKKKKKKKK',
  'K.K.K.K.K.KK',
  'KKKKKKKKKKKK',
  '.GGGGGGGGGG.',
  '.GRRRRRRRRG.',
  '..GGGGGGGG..',
  '...K....K...',
  '..KK....KK..',
]
const GRILL_C = { K: '#2a2350', G: '#6b62a8', R: '#ff9a4a' }
const HAT = ['.WWWWWW.', 'WWWWWWWW', 'WWWWWWWW', '.WWWWWW.', '.WWWWWW.', '.KKKKKK.']
const BOTTLE = ['...KK...', '...KK...', '..BBBB..', '.BBBBBB.', '.BWWWWB.', '.BWWWWB.', '.BBBBBB.', '.BBBBBB.', '..BBBB..']
const BOTTLE_C = { K: '#ff6b5a', B: '#7dffb0', W: PAPER }
const CONE = [
  '..PPPP..',
  '.PPWPPP.',
  'PPPPPPPP',
  '.PPPPPP.',
  '.CCCCCC.',
  '..CCCC..',
  '..CCCC..',
  '...CC...',
]
const CONE_C = { P: '#ff8fb1', W: '#ffffff', C: '#e8a24a' }
const SPLAT = ['..PP.P..', '.PPPPPP.', 'PPPWPPPP', '.PPPPPPP', 'P.PPPP.P']
function map(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.04)
  x.fillStyle = INK; x.fillRect(-176, -126, 352, 252)
  x.fillStyle = PAPER; x.fillRect(-170, -120, 340, 240)
  const pts = [[-130, 80], [-60, -60], [20, 50], [100, -80], [130, 60]]
  x.strokeStyle = '#ff6b5a'; x.lineWidth = 6; x.setLineDash([14, 10]); x.beginPath()
  const n = 1 + Math.floor(clamp(lt / 1.5) * 4)
  pts.slice(0, n).forEach((p, i) => i ? x.lineTo(...p) : x.moveTo(...p)); x.stroke(); x.setLineDash([])
  pts.forEach(([a, b], i) => { x.fillStyle = i < n ? '#5fd068' : '#9aa5c4'; x.fillRect(a - 14, b - 14, 28, 28) })
  x.restore()
}

const S = (sign, o) => ({ sign, star: { x: -170 }, look: [1, 0], ...o })
const CAMEOS = [
  S('aries', { cap: 'Hottest wing at the fest? | Ate it *first.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', hops: [0.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, WING, WING_C, 790, 920, 22 * k, { rot: 0.1 })
      drawBits(x, FLAME, FLAME_C, 900, 780 + 6 * Math.sin(t * 9), 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 790, 640, 'SPICE: VOLCANO', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: '#ff6b5a', size: 32 })
    } }),
  S('taurus', { cap: 'Tried every stall. | *Twice.*', mood: lt => lt < 1.4 ? 'heart' : 'sleepy',
    front(x, t, lt, P) {
      const n = Math.min(40, Math.floor(lt * 18))
      L(x, 790, 860, `STALLS: ${n}/20`, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: GOLD, size: 40, rot: 0 })
      L(x, 790, 1040, 'LAP TWO', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: PINK, size: 32 })
    } }),
  S('gemini', { cap: 'Ordered from | *six stalls at once.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0],
    front(x, t, lt, P) {
      const w = ['TACOS', 'PIE', 'NOODLES', 'CORN', 'WAFFLE', 'DUMPLINGS']
      for (let i = 0; i < 6; i++) L(x, 690 + (i % 2) * 200, 680 + Math.floor(i / 2) * 140, w[i], pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2), { bg: [GOLD, PINK, MINT, SKYB, LAV, BONE][i], size: 28, rot: i % 2 ? 0.06 : -0.06 })
    } }),
  S('cancer', { cap: 'Brought containers | *for the leftovers.*', mood: lt => lt < 1.2 ? 'happy' : 'heart',
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, TUB, TUB_C, 790 + (i % 2 ? 16 : -16), 1100 - i * 90, 14 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2))
      L(x, 790, 640, 'FOR LATER. AND YOU.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: MINT, size: 28 })
    } }),
  S('leo', { cap: 'Won the eating contest. | *Took a bow.*', mood: 'sparkle', hops: [1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.3, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 900, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 650, 'CHAMPION', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: GOLD, size: 40 })
      sparkles(x, t, 790, 900, P.t0 + 1.1, 8, 180, 0.3)
    } }),
  S('virgo', { cap: 'Read every | *ingredient list.*', mood: 'squint',
    front(x, t, lt, P) {
      L(x, 790, 860, 'INGREDIENTS: 14', pop01(t, P.t0 + 0.2, 0.3, 2), { bg: BONE, size: 32, rot: 0 })
      drawBits(x, GLASS, GLASS_C, 790 + 80 * Math.sin(t * 2), 960, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 1060, 'STALLS APPROVED: 2', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: MINT, size: 28 })
    } }),
  S('libra', { cap: 'Couldn’t choose. | *Still in line.*', mood: lt => lt < 1.2 ? 'squint' : 'wide', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0],
    front(x, t, lt, P) {
      drawBits(x, STALL, STALL_C, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, lt < 1.2 ? 'WAIT: 10 MIN' : 'WAIT: 3 HOURS', pop01(t, P.t0 + 0.7, 0.3, 2.2), { bg: LAV, size: 32 })
    } }),
  S('scorpio', { cap: 'Found the | *secret menu.*', mood: lt => lt < 1.2 ? 'squint' : 'wink',
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'psst… | it’s under | the counter', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bl', col: LAV })
      L(x, 790, 1040, 'MENU #2 UNLOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: '#c97bff', size: 30 })
    } }),
  S('sagittarius', { cap: 'Made friends with the chef. | *Now works there.*', mood: 'sparkle', hops: [0.9, 1.6],
    front(x, t, lt, P) {
      drawBits(x, HAT, { W: '#ffffff', K: INK }, 370, 690, 12 * pop01(t, P.t0 + 1.0, 0.3, 2.4), { rot: -0.1 })
      drawBits(x, GRILL, GRILL_C, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'NEW JOB: GRILL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: '#ff9a4a', size: 30 })
    } }),
  S('capricorn', { cap: 'Made a map. | *With a route.*', mood: 'squint',
    front(x, t, lt, P) {
      map(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1100, 'NO WASTED STEPS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: MINT, size: 30 })
    } }),
  S('aquarius', { cap: 'Invented their | *own sauce* on the spot.', mood: lt => lt < 1.2 ? 'sparkle' : 'wide',
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, BOTTLE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 5) })
      L(x, 790, 650, 'FLAVOUR: PURPLE?', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: SKYB, size: 32 })
    } }),
  S('pisces', { cap: 'Dropped the ice cream. | Held *a funeral.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3,
    front(x, t, lt, P) {
      const fall = ease.inQuad(prog(lt, 0.5, 0.9))
      if (lt < 0.9) drawBits(x, CONE, CONE_C, 790, lerp(800, 1080, fall), 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else drawBits(x, SPLAT, { P: '#ff8fb1', W: '#fff' }, 790, 1100, 20)
      if (lt > 1.2) L(x, 790, 760, 'R.I.P. STRAWBERRY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: BONE, size: 30 })
    } }),
]

const F = makeFilm({
  id: 'r2t0355', key: 'F', accent: ACC, ending: 'callback',
  title: 'The signs at | *a food festival.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One food coma.*', moods: Array(12).fill('sleepy') },
  last: {
    text: 'Libra finally chose. | *The festival closed.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      drawBits(x, STALL, STALL_C, 720, 1120, 20 * k)
      signChar(x, t, 'libra', 380, 1160, 280 * k, { mood: lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], seed: 33, hops: [t0 + 0.9] })
      label(x, 720, 1110, 'CLOSED', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 48, bg: '#ff6b5a', rot: -0.08, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
