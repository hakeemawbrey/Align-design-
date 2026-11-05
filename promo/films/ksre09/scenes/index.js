// ksre09: FALLING IN LOVE: SPEEDRUN · Sagittarius: Side Quest (16 s vertical, star_talk post, Month 2 boost m03)
// music: house · A. Hard cut. No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: Sagittarius mid-leap off the route toward a puppy, WRONG WAY flashing; the hook line. 0.3 whip zoom.
//   0.8   side quest 1: pet the dog ✓ · 2.4 → 2.9 side quest 2: help someone read a map ✓
//   5.4   the main-route arrow fades: MAIN QUEST ABANDONED? · Pisces crying "that's so them"
//   6.4   side quest 3: the dumpling cart… someone else reaching for the last one · 8.6 "split it?"
//   9.4   new split MET ON A SIDE QUEST (gold) · 10.4 achievement · 14.2 "Wrong turn. | Right person." · cut 16.0.
import { makeRun, splitCues, fmtClock, runAt, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, drawBits } from '../../ksre01/srkit.js'

const D = 16
const T = { whip: 0.3, q1: 1.6, mv1: 2.4, q2: 4.4, mv2: 5.4, beg: 5.6, cart: 6.6, reach: 7.6, split: 8.6, s2: 9.4, ach: 10.4, last: 14.2 }
const SPLITS = [
  { name: 'LEFT THE HOUSE', at: -1, time: '0:00.50', state: 'gold', delta: '-0:01' },
  { name: 'FIND SOMEONE', at: T.s2, time: '0:09.40', state: 'gold', delta: '-1:20' },
]
const timer = t => ({ text: fmtClock(runAt([[0, 0.9], [D, 0.9 + D]], t)), col: t > T.s2 ? GOLD : GREEN, sub: `SIDE QUESTS: ${t > T.cart + 1 ? 3 : t > T.q2 ? 2 : t > T.q1 ? 1 : 0}/3`, subCol: GOLD })
const cam = t => {
  if (t < T.beg) return { mood: 'sparkle', tears: 1, look: [-1, 0.8] }
  if (t < T.reach) return { mood: 'wide', tears: 2, look: [-1, 0.8], say: "that's so them", sayAt: T.beg, sayEnd: T.reach - 0.1, sayX: 700, sayY: 650 }
  return { mood: t > T.split ? 'heart' : 'wide', tears: 3, look: [-1, 0.6], hops: [T.split, T.s2] }
}
const scrollAt = t => 1080 * (ease.inOutCubic(prog(t, T.mv1, T.mv1 + 0.5)) + ease.inOutCubic(prog(t, T.mv2, T.mv2 + 0.9)))
const DOG = ['.........DD.', '........BBBB', 'B......BBEBB', 'BB....BBBBBN', '.BBBBBBBBBB.', '.BBBBBBBBB..', '.B.B...B.B..', '.B.B...B.B..']
const MAP = ['PPPPPPP', 'PGGPBBP', 'PGPPPBP', 'PPPRPPP', 'PBBPGGP', 'PPPPPPP']
function world(x, t, S) {
  const sc = scrollAt(t)
  S.level(x, t, { theme: 'park', floor: 1300, scroll: sc })
  // the main-route arrow on the ground (points right, fades as the quests pile up)
  const ra = 1 - prog(t, T.mv2, T.mv2 + 0.6)
  if (ra > 0) { x.save(); x.globalAlpha = 0.8 * ra; drawBits(x, ['....G...', '....GG..', 'GGGGGGG.', 'GGGGGGGG', 'GGGGGGG.', '....GG..', '....G...'], { G: GOLD }, 170, 1380, 12, { sx: -1 }); x.restore(); if (ra > 0.5) S.txt(x, 'MAIN QUEST', 170, 1460, { size: 26, font: MONO, weight: 700, col: GOLD, ls: 3, alpha: ra }) }
  // screen 0: the puppy
  const o0 = -sc
  drawBits(x, DOG, { B: '#c9a07a', D: '#8a5a3c', E: INK, N: INK }, 700 + o0, 1226, 16, { sx: t > 0.8 && t < T.mv1 && Math.sin(t * 18) > 0 ? -1 : 1 })
  if (t > 0.9 && t < T.mv1) S.heartBits(x, 700 + o0, 1110 - 40 * ((t * 1.5) % 1), 6, PINK, 1 - ((t * 1.5) % 1))
  // screen 1: someone with a map
  const o1 = 1080 - sc
  S.star(x, t, { id: 'taurus', x: 760 + o1, y: 1200, s: 180, mood: t > T.q2 - 0.6 ? 'happy' : 'wide', look: [-1, 0], seed: 2, hops: [T.q2] })
  drawBits(x, MAP, { P: '#f4e8cc', G: '#6fd06a', B: '#6fb8ff', R: RED }, 640 + o1 + (t > T.q2 - 0.8 ? 80 : 0), 1150, 12, { rot: t > T.q2 - 0.8 ? 0 : 0.6 })
  // screen 2: the dumpling cart
  const o2 = 2100 - sc
  x.fillStyle = INK; x.fillRect(560 + o2, 1060, 300, 240); x.fillStyle = '#d06a5a'; x.fillRect(568 + o2, 1068, 284, 160); x.fillStyle = '#f4e8cc'; x.fillRect(568 + o2, 1068, 284, 30)
  for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#f4e8cc' : '#d06a5a'; x.fillRect(548 + o2 + i * 54, 1010, 54, 40) }
  x.font = `900 34px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('DUMPLINGS', 710 + o2, 1084)
  for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.fillRect(610 + o2 + i * 80, 1238, 40, 64); x.fillStyle = '#5a5470'; x.fillRect(616 + o2 + i * 80, 1244, 28, 52) }
  // the last dumpling (on the counter)
  const dk = t < T.split ? 1 : 1 - prog(t, T.split + 0.2, T.split + 0.6)
  if (dk > 0) drawBits(x, ['.WWWW.', 'WWWWWW', 'WWWWWW', '.WWWW.'], { W: '#fff3dc' }, 710 + o2, 1046, 9)
  if (t > T.split + 0.2) { drawBits(x, ['.WW.', 'WWWW', '.WW.'], { W: '#fff3dc' }, 520 + o2, 1090, 8); drawBits(x, ['.WW.', 'WWWW', '.WW.'], { W: '#fff3dc' }, 900 + o2, 1090, 8) }
  const ck = pop01(t, T.cart - 0.3, 0.3, 2.2)
  if (o2 < 1100) S.star(x, t, { id: 'capricorn', x: 990 + o2, y: 1180, s: 210, mood: t > T.split ? 'heart' : t > T.reach ? 'wide' : 'happy', look: t > T.reach ? [-1, 0] : [0, -0.6], seed: 8, pop: ck, hops: [T.reach, T.split + 0.1] })
  // Sagittarius
  let sx = 380, sy = 1160, rot = 0, mood = 'sparkle', look = [1, 0]
  if (t < 0.6) { sy -= 140 * Math.sin(Math.PI * clamp(0.5 + t / 1.2)); rot = 0.25 }
  if (t > T.mv1 && t < T.mv1 + 0.5) rot = 0.12
  if (t > T.mv2 && t < T.mv2 + 0.9) rot = 0.12
  if (t > T.cart) { sx = 350 }
  if (t > T.reach) { mood = 'wide'; look = [1, 0] }
  if (t > T.split) { mood = 'heart' }
  S.shadow(x, sx, 1302, 210)
  if ((t > T.mv1 && t < T.mv1 + 0.5) || (t > T.mv2 && t < T.mv2 + 0.9)) S.speedLines(x, t, sx, 1130, { n: 8 })
  S.star(x, t, { id: 'sagittarius', x: sx, y: sy, s: 230, mood, look, rot, seed: 5, hops: [0.8, 1.2, T.q1, 3.2, T.q2, T.reach, T.split + 0.15] })
  S.bubble(x, t, 640, 900 - 0, 3.0, T.q2 - 0.1, 'the pier? that way!', { size: 32, tail: 0.3 })
  S.bubble(x, t, 760, 900, T.reach + 0.1, T.split - 0.1, 'oh! the last one…', { size: 34, col: '#ffd9e8', tail: 0.4 })
  S.bubble(x, t, 340, 920, T.split, T.ach + 1.4, 'split it?', { size: 42, tail: -0.1 })
}
function over(x, t, S) {
  S.stamp(x, 'WRONG WAY', 560, 970, t < 1.2 ? (Math.sin(t * 14) > -0.4 ? 1 : 0) : 0, { size: 64, col: RED, rot: -0.06, fillc: 'rgba(16,10,40,0.85)' })
  S.toast(x, t, T.q1, T.mv1, 'SIDE QUEST COMPLETE', 'pet the dog', { cy: 880, col: GREEN, icon: 'star' })
  S.toast(x, t, T.q2, T.mv2 + 0.2, 'SIDE QUEST COMPLETE', 'helped with a map', { cy: 880, col: GREEN, icon: 'star' })
  S.stamp(x, 'MAIN QUEST ABANDONED?', 540, 880, pop01(t, T.mv2 + 0.4, 0.2, 2.8) * outK(t, [T.cart + 0.3, T.cart + 0.5]), { size: 50, col: RED, rot: 0.05 })
}
const HOOK = { at: -1, text: 'SAGITTARIUS TOOK A | *side quest.*', top: 612, size: 100, out: [1.4, 1.6] }
const WHIP = { at: T.whip, len: 0.45, from: 1.5, cx: 380, cy: 1150 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], title: 'NEW SPLIT', text: 'met someone *off the map*', y: 1520 }
const LAST = { at: T.last, text: 'Wrong turn. | *Right person.*', top: 620, size: 116 }
const EP = makeRun({
  id: 'ksre09', duration: D, runner: 'sagittarius', category: 'ANY%',
  fx: [['slamTitle', HOOK, true], ['whipZoom', WHIP], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, current: () => 1, ending: { type: 'cut' },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ['pop', 0.9, 1318.51, 0.04, 0.3], ['pop', 1.1, 1567.98, 0.035, 0.3],
  ['bell', T.q1, 1760, 0.04, 0.9, 0], ['whoosh', T.mv1, 0.5, 0.05], ['pop', 3.0, 987.77, 0.035, 0.2], ['bell', T.q2, 1760, 0.04, 0.9, 0],
  ['whoosh', T.mv2, 0.9, 0.05], ['pluck', T.mv2 + 0.4, 233.08, 0.04, 0.3, 0], ['pluck', T.beg + 0.1, 440, 0.035, 0.5, 0.4], ['pluck', T.beg + 0.3, 415.3, 0.035, 0.5, 0.4],
  ['pop', T.reach, 880, 0.045, 0.2], ['pop', T.reach + 0.1, 880, 0.045, -0.2], ['pop', T.split, 1174.66, 0.05, -0.2], ['glitter', T.split + 0.2, T.split + 0.8],
]
void [BLUE, MONO, BONE, lerp]
