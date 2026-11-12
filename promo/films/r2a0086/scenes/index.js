// r2a0086: ADVICE SOLO, "Signs a Taurus | needs a break." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one gag each.
//   0.0–3.6    "Signs a Taurus | *needs a break.*"
//   3.6–37.8   held your ground all week (now sit) · watered every plant (water you too) · pushing like a bulldozer
//              (even bulldozers park) · ate over the sink (use the good plates) · your blanket misses you
//              · ran a bath (actually get in) · every weekend booked (keep one empty) · stubborn? be stubborn about rest
//              · a five-minute flower stop (make it ten)
//  37.8        "Steady is good. | So is *still.*"
//  41.0        LESSON: "Rest isn’t quitting. | It’s *how you last.*"  STATUS: RECHARGED
//  46.9        "The bulldozer | is *on a break.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#9fd8a8', BROWN = '#8a4a2e', RED = '#e23d4e', YEL = '#ffd23a'

// ── props
const CHAIR = [
  '.RRRRRRRRR.',
  'RRRRRRRRRRR',
  'RRrRRRRRrRR',
  'RRrRRRRRrRR',
  'RRRRRRRRRRR',
  'RRCCCCCCCRR',
  'RRCCCCCCCRR',
  'RRRRRRRRRRR',
  '.K.......K.',
  '.K.......K.',
]
const CHAIR_C = { R: '#c97bff', r: '#a35ee0', C: LAV, K: BROWN }
const CAN = [
  '....GGGG.....',
  '...G....G....',
  '..GGGGGGGG..S',
  '..GGGGGGGG.S.',
  '..GgGGGGGGS..',
  '..GgGGGGGG...',
  '..GGGGGGGG...',
  '..GGGGGGGG...',
]
const CAN_C = { G: '#6fc3ff', g: '#ffffff', S: '#6fc3ff' }
const GLASS = ['W.....W', 'W.....W', 'WBBBBBW', 'WBbBBBW', 'WBBBBBW', 'WBBBBBW', '.WWWWW.']
const GLASS_C = { W: '#e6f4ff', B: SKYB, b: '#ffffff' }
const DOZER = [
  '....YYYYY.......',
  '....YKKKY.......',
  '....YKKKY.......',
  'YYYYYYYYYYYYY.SS',
  'YYYYYYYYYYYYY.SS',
  'YYYYYYYYYYYYYSSS',
  '.DDDDDDDDDDD.SSS',
  'DGDGDGDGDGDGD...',
  '.DDDDDDDDDDD....',
]
const DOZER_C = { Y: YEL, K: '#2a2350', S: '#9aa5c4', D: INK, G: '#6b62a8' }
const PLATE = ['..WWWWWWWWW..', '.WGGGGGGGGGW.', 'WGWWWWWWWWWGW', 'WGWWWWWWWWWGW', '.WGGGGGGGGGW.', '..WWWWWWWWW..']
const PLATE_C = { W: '#fff4e2', G: GOLD }
const BLANKET = [
  'PPPPPPPPPPPPPP',
  'PWPPPPWPPPPWPP',
  'PPPPPPPPPPPPPP',
  'PPPWPPPPPWPPPP',
  'PPPPPPPPPPPPPP',
  'PWPPPPWPPPPWPP',
  'PPPPPPPPPPPPPP',
  'PPPWPPPPPWPPPP',
]
const TUB = [
  '.B.B..B.B..B..',
  'BBBBBBBBBBBBBB',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
  '..WWWWWWWWWW..',
  '..K........K..',
]
const TUB_C = { B: '#e6f4ff', W: '#fff4e2', K: '#9aa5c4' }
const HANGER = [
  '....KKK....',
  '...K...K...',
  '...K...K...',
  'RRRRKKKRRRR',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
  'RRRRRRRRRRR',
]
const TULIP = ['.P.P.', 'PPPPP', 'PPPPP', '.PPP.', '..G..', 'G.G..', 'GGG..', '..G..', '..G..']
const POT = ['TTTTTTTTT', '.TTTTTTT.', '.TTTTTTT.', '..TTTTT..']
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']

function zzz(x, t, cx, cy, n = 3) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.5 + i / n) % 1)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = BONE; x.font = `800 ${30 + i * 8}px ${INTER}`; x.textAlign = 'center'
    x.fillText('z', cx + i * 30 + Math.sin(ph * 5) * 8, cy - ph * 120); x.restore()
  }
}
function bulldozer(x, t, cx, cy, cell, park) {
  drawBits(x, DOZER, DOZER_C, cx, cy, cell)
  if (park) zzz(x, t, cx + cell * 2, cy - cell * 6)
}

const S = 'taurus'
const CAMEOS = [
  { sign: S, cap: 'Held your ground? | *Now sit.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CHAIR, CHAIR_C, lerp(1100, 790, ease.outCubic(prog(lt, 0.2, 0.8))), 940, 22 * k)
      label(x, 790, 650, 'CHAIR: EARNED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Watered every plant? | *Water you too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAN, CAN_C, 740, 800, 18 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.2 + 0.25 * Math.sin(Math.min(lt, 1.2) * 4) })
      drawBits(x, GLASS, GLASS_C, 860, 1020, 18 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      label(x, 790, 1170, 'HYDRATE: YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even bulldozers | *park at night.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const dx = lerp(1040, 800, ease.outCubic(prog(lt, 0.2, 1.1)))
      if (k > 0.01) bulldozer(x, t, dx, 990, 21 * k, lt > 1.3)
      label(x, 790, 680, 'STATUS: PARKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: YEL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ate over the sink? | Use *the good plates.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 930, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 790, 930, P.t0 + 1.0, 7, 200, 0.3)
      label(x, 790, 1120, 'FANCY. FOR YOU.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Your favourite blanket | *misses you.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BLANKET, { P: PINK, W: '#fff4e2' }, 800, 950, 24 * k, { rot: 0.04 })
      if (k > 0.5) { x.fillStyle = INK; x.fillRect(758, 920, 14, 20); x.fillRect(828, 920, 14, 20); x.fillRect(780, 966, 40, 8) }
      bubble(x, 790, 700, 'where’ve you been?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Ran a bath? | *Actually get in.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TUB, TUB_C, 800, 1000, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      for (let i = 0; i < 4; i++) { const ph = (t * 0.6 + i * 0.25) % 1; x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * ph); x.fillStyle = '#ffffff'; x.fillRect(700 + i * 60, 900 - ph * 160, 10, 26); x.restore() }
      label(x, 790, 700, 'STILL WARM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Every weekend booked? | *Keep one empty.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: YEL }, 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.3 })
      label(x, 790, 1060, 'SATURDAY: NOTHING', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stubborn? Great. | Be stubborn *about rest.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const sw = Math.sin(t * 2.2) * 0.08
      drawBits(x, HANGER, { R: RED, K: BONE }, 800, 900, 26 * k, { rot: sw })
      if (k > 0.6) {
        x.save(); x.translate(800, 920); x.rotate(sw); x.fillStyle = '#fff4e2'; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('DO NOT', 0, -6); x.fillText('DISTURB', 0, 44); x.restore()
      }
      label(x, 790, 1150, 'NOT MOVING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stopped for flowers? | *Stay a while.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 3; i++) drawBits(x, TULIP, { P: [PINK, YEL, '#ff6b5a'][i], G: '#5fd068' }, 720 + i * 75, 880 - (i === 1 ? 30 : 0), 15 * k, { rot: Math.sin(t * 1.5 + i) * 0.05 })
      drawBits(x, POT, { T: BROWN }, 795, 1010, 22 * k)
      hearts(x, t, 790, 800, P.t0 + 1.2, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 6 })
      label(x, 790, 650, 'SMELLED: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0086', key: 'D', accent: SAGE, solo: 'taurus', ending: 'lesson',
  title: 'Signs a Taurus | *needs a break.*',
  cameos: CAMEOS,
  group: { cap: 'Steady is good. | So is *still.*', mood: 'happy' },
  lesson: { text: 'Rest isn’t quitting. | It’s *how you last.*', chip: 'STATUS: RECHARGED' },
  last: {
    text: 'The bulldozer | is *on a break.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      if (k > 0.01) bulldozer(x, t, 560, 1230, 20 * k, lt > 1.0)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
