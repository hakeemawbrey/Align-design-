// ksre12: FALLING IN LOVE: SPEEDRUN · Pisces: Daydream% (16 s vertical, star_talk post, Month 2 boost m03)
// music: dreamy · Ab. Hard cut. No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: Pisces mid-cry at split one (EYE CONTACT), tears flying, a dream bubble already open; the hook line.
//   0.5   record scratch + freeze: "they haven't even said *hi* yet."
//   2.0   the daydream runs ahead of the real run: FIRST DATE · HOLIDAYS TOGETHER · A DOG NAMED BISCUIT · GROW OLD
//   7.6   "hi, I'm Sam." — the dream pops, every dream split greys out (NOT YET) · 8.6 "hi!! I'm Pisces" (happy sobbing)
//   9.6   SAY HI gold · 10.4 achievement · 13.8 "Daydream% is | not a category." · cut 16.0.
import { makeRun, splitCues, fmtClock, runAt, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, LAV, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, drawBits } from '../../ksre01/srkit.js'

const D = 16
const T = { rec: 0.5, d1: 2.2, d2: 3.5, d3: 4.8, d4: 6.1, hi: 7.6, pop: 7.75, back: 8.6, s: 9.6, ach: 10.4, last: 13.8 }
const DREAMS = [['FIRST DATE', T.d1], ['HOLIDAYS TOGETHER', T.d2], ['A DOG NAMED BISCUIT', T.d3], ['GROW OLD', T.d4]]
const splits = t => [
  { name: 'EYE CONTACT', at: -0.2, time: '0:00.20', state: 'gold', delta: '-0:03' },
  ...DREAMS.map(([n, a]) => t < T.pop ? { name: n, at: a, time: 'DREAM', state: 'blue', delta: '' } : { name: n, at: a, time: 'NOT YET', state: 'skip', delta: '' }),
  { name: 'SAY HI', at: T.s, time: '0:09.60', state: 'gold', delta: '' },
]
const timer = t => ({ text: fmtClock(runAt([[0, 0.2], [D, 0.2 + D]], t)), col: t > T.s ? GOLD : t < T.pop && t > T.d1 ? BLUE : GREEN, sub: t > T.d1 && t < T.pop ? 'DAYDREAM DETECTED' : t > T.s ? 'REAL RUN' : 'EYE CONTACT', subCol: t > T.d1 && t < T.pop ? BLUE : undefined })
const cam = t => {
  if (t < T.hi) return { mood: 'sparkle', tears: 3, look: [-1, 0.8], say: t > T.d3 ? 'BISCUIT 😭'.replace(' 😭', '!!') : undefined, sayAt: T.d3 + 0.1, sayEnd: T.hi - 0.1, sayX: 690, sayY: 650 }
  return { mood: t > T.back ? 'happy' : 'wide', tears: 3, look: [-1, 0.6], hops: [T.back, T.s] }
}
const TREE = ['...G...', '..GGG..', '.GGRGG.', 'GGGGGGG', '..GGG..', '.GGGGG.', 'GGGGGGG', '...B...']
const DOG = ['.........DD.', '........BBBB', 'B......BBEBB', 'BB....BBBBBN', '.BBBBBBBBBB.', '.BBBBBBBBB..', '.B.B...B.B..']
function dream(x, t, S) {
  const k = (t < 0.2 ? 1 : 1) * (1 - ease.inCubic(prog(t, T.pop, T.pop + 0.2)))
  const burst = t > T.pop && t < T.pop + 0.5
  if (burst) for (let i = 0; i < 14; i++) { const a = i * 0.45, d = (t - T.pop) * 700; x.fillStyle = i % 2 ? LAV : BONE; x.globalAlpha = 1 - (t - T.pop) / 0.5; x.fillRect(640 + Math.cos(a) * d, 900 + Math.sin(a) * d * 0.6, 16, 16); x.globalAlpha = 1 }
  if (k <= 0.01) return
  const grow = t < T.d1 ? 0.75 : 1
  x.save(); x.translate(650, 900); x.scale(k * grow, k * grow)
  // the cloud
  x.fillStyle = INK; for (const [cx, cy, r] of [[-220, 0, 120], [-80, -70, 140], [90, -60, 140], [220, 10, 120], [0, 50, 170]]) { x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#e9e2ff'; for (const [cx, cy, r] of [[-220, 0, 120], [-80, -70, 140], [90, -60, 140], [220, 10, 120], [0, 50, 170]]) { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
  // the scene inside, changing per dream
  const sc = t < T.d2 ? 0 : t < T.d3 ? 1 : t < T.d4 ? 2 : 3
  const st = (id, px, py, s, mood, o = {}) => S.star(x, t, { id, x: px, y: py, s, mood, look: [px < 0 ? 1 : -1, 0], glyph: false, seed: id.length, ...o })
  if (sc === 0) { x.fillStyle = INK; x.fillRect(-120, 70, 240, 14); x.fillRect(-8, 84, 16, 60); st('pisces', -150, 30, 130, 'heart'); st('virgo', 150, 30, 130, 'happy'); S.heartBits(x, 0, -60, 8, PINK) }
  if (sc === 1) { drawBits(x, TREE, { G: '#5fd38a', R: RED, B: '#8a5a3c' }, 0, -10, 20); st('pisces', -190, 50, 120, 'heart'); st('virgo', 190, 50, 120, 'happy'); for (let i = 0; i < 6; i++) { x.fillStyle = BONE; x.fillRect(-260 + i * 100, -120 + ((t * 60 + i * 40) % 200), 8, 8) } }
  if (sc === 2) { drawBits(x, DOG, { B: '#c9a07a', D: '#8a5a3c', E: INK, N: INK }, 0, 40, 14); x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('BISCUIT', 0, -60); st('pisces', -210, 40, 110, 'heart'); st('virgo', 210, 40, 110, 'happy') }
  if (sc === 3) { st('pisces', -90, 20, 150, 'happy', { glow: 0.5 }); st('virgo', 90, 20, 150, 'happy', { glow: 0.5 }); x.fillStyle = '#d8d8e0'; x.fillRect(-140, -70, 100, 16); x.fillRect(40, -70, 100, 16); x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('YEAR 60', 0, 140) }
  x.restore()
  // the little thought dots up from Pisces
  for (const [dx, dy, r] of [[300, 1080, 16], [360, 1030, 24]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 5, 0, 7); x.fill(); x.fillStyle = '#e9e2ff'; x.beginPath(); x.arc(dx, dy, r * k, 0, 7); x.fill() }
}
function world(x, t, S) {
  S.level(x, t, { theme: 'park', floor: 1300 })
  dream(x, t, S)
  let mood = 'sparkle', look = [1, -0.6]
  if (t > T.hi) { mood = 'wide'; look = [1, 0] }
  if (t > T.back) mood = 'happy'
  if (t > T.s) mood = 'heart'
  S.shadow(x, 250, 1302, 220)
  S.pisces(x, t, { x: 250, y: 1170, s: 230, mood, look, tears: 3, seed: 6, squash: t > T.hi && t < T.hi + 0.4 ? -0.1 : 0, hops: [T.d1, T.d2, T.d3, T.d4, T.hi + 0.05, T.back, T.s] })
  const vk = pop01(t, T.hi - 0.4, 0.3, 2.2)
  S.shadow(x, 820, 1302, 200 * vk)
  S.star(x, t, { id: 'virgo', x: 820, y: 1180, s: 210, mood: t > T.s ? 'happy' : 'neutral', look: [-1, 0], seed: 8, pop: vk, hops: [T.hi, T.s + 0.1] })
  S.bubble(x, t, 800, 960, T.hi, T.back + 0.6, "hi, I'm Sam.", { size: 40, col: '#ffd9e8', tail: 0.1 })
  S.bubble(x, t, 330, 960, T.back, T.last - 0.3, "hi!! I'm Pisces (sorry, happy tears)", { size: 32, tail: -0.4, maxW: 560 })
}
const HOOK = { at: -1, text: 'PISCES CRIED AT | *split one.*', top: 600, size: 112, out: [1.9, 2.1] }
const REC = { at: T.rec, len: 1.4, caption: "they haven't even said *hi* yet.", sub: 'split one: eye contact', top: 1520 }
const SHK = { at: T.pop, len: 0.4, amp: 20 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], text: 'planned a whole *life* in six seconds', y: 1520 }
const LAST = { at: T.last, text: 'Daydream% is | *not a category.*', top: 600, size: 106 }
const EP = makeRun({
  id: 'ksre12', duration: D, runner: 'pisces', category: 'ANY%',
  fx: [['slamTitle', HOOK, true], ['recordScratch', REC], ['screenShake', SHK], ['achievement', ACH], ['slamTitle', LAST]],
  splits, timer, cam, world, current: t => t < T.pop ? Math.min(4, 1 + DREAMS.filter(d => t >= d[1]).length) : 5, ending: { type: 'cut' },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES, ...splitCues(splits(0).filter(s => s.at > 0 && s.name === 'SAY HI')),
  ...DREAMS.map(([n, a], i) => ['bell', a, 1318.51 * (1 + i * 0.12), 0.035, 1.0, 0.2]), ...DREAMS.map(([n, a]) => ['glitter', a, a + 0.4]),
  ['pluck', 0.1, 440, 0.03, 0.5, -0.3], ['pluck', 0.3, 415.3, 0.03, 0.5, -0.3],
  ['pop', T.hi, 880, 0.05, 0.3], ['pop', T.pop, 1760, 0.05, 0], ['whoosh', T.pop, 0.3, 0.06], ['pop', T.back, 1174.66, 0.045, -0.3],
]
void [RED, GREEN, shake, lerp, clamp]
