// klge17 · Your Sign's Love Glitch · "Libra.exe: Peace at All Costs" (LONG, 72 s vertical, star_advice post, loop).
//   0.0   frame 0: LIBRA.EXE: keeping the peace. (crashing) Libra mid-smile while cracks spread across the window, the
//         folder STUFF I DIDN'T SAY at 99 %. Promise: "wait for the patch notes". 0.5 whip onto the folder.
//   CH 1  THE GLITCH (3.0): every small annoyance gets "it's fine!" and a file flies into the folder: the leftovers,
//         skipping the friend's thing, the dishes, birthday plans with *their* friends.
//   CH 2  WHERE IT COMES FROM (21.0): ★ astrology says: Libra is ruled by Venus. THE STARS: keeping things kind is the
//         gift, but silent peace isn't peace. Inside the folder: leftovers.txt, the plans.txt, dishes (again).txt.
//   CH 3  WHAT IT COSTS (36.0): FOLDER FULL. Libra blurts "I'M DONE." The partner: "wait… done with what??" Pisces.
//   CH 4  PATCH NOTES (52.0): LIBRA.EXE 2.0; notes: small honest no's · say it the day it happens · a disagreement
//         isn't a breakup. The replay: "actually, can we not do that?" → "oh! sorry. i'll get you noodles."
//   68.0  last line "Small no's save *big* love."   71.55 loop back into frame 0.
import { makeGlitch, R, box, label, bubble, progressBar, hearts, sparkles, sticker, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const CH = [3.0, 21.0, 36.0, 52.0]
const LX = 300, LY = 1200, MX = 770, MY = 1200
const ANNOY = [
  { at: 4.0, them: 'i ate your leftovers lol', file: 'leftovers.txt' },
  { at: 8.5, them: 'can we skip your friend’s thing?', file: 'the friend thing.txt' },
  { at: 12.5, them: '(leaves the dishes. again.)', file: 'dishes (again).txt' },
  { at: 16.5, them: 'booked your birthday… with MY friends!', file: 'the plans.txt' },
]
const FULL = 37.0, BLURT = 40.0, REPLAY = 62.6
const folderV = t => {
  if (t < 3) return 0.99
  if (t < FULL) return clamp(0.15 + ANNOY.filter(a => t > a.at + 1.6).length * 0.17 + prog(t, 30, FULL) * 0.17)
  if (t < CH[3] + 2.4) return 1
  return lerp(1, 0, ease.inOutQuad(prog(t, CH[3] + 2.4, CH[3] + 4)))
}
function cracks(x, t, k) {
  if (k <= 0) return
  x.save(); x.strokeStyle = '#f4f0fa'; x.lineWidth = 5; x.globalAlpha = 0.8
  const seg = [[540, 556, 500, 700, 560, 820, 520, 960], [1010, 900, 900, 950, 860, 1080], [70, 1000, 200, 1040, 240, 1180]]
  for (const s of seg) { x.beginPath(); x.moveTo(s[0], s[1]); const n = (s.length / 2 - 1) * Math.min(1, k); for (let i = 1; i <= n; i++) x.lineTo(s[i * 2], s[i * 2 + 1]); x.stroke() }
  x.restore()
}
function folder(x, t, px, py, sc) {
  x.save(); x.translate(px, py); x.scale(sc, sc)
  const v = folderV(t), full = v >= 1 && t < CH[3] + 2.4
  const sh = full && t > FULL && t < BLURT + 0.5 ? Math.sin(t * 50) * 4 : 0
  x.translate(sh, 0)
  box(x, -120, -70, 90, 30, '#e9b24a', { b: 4 }); box(x, -120, -48, 240, 150, full ? '#e8344e' : '#e9b24a', { b: 5 })
  label(x, 'STUFF I', 0, -6, { size: 22, col: INK }); label(x, 'DIDN’T SAY', 0, 22, { size: 22, col: INK })
  progressBar(x, -110, 60, 220, v, { h: 30, col: v > 0.85 ? RED : GOLD, text: `${Math.round(v * 100)}%`, size: 18 })
  x.restore()
}
function flyFile(x, t, at, name) {
  const p = prog(t, at + 1.0, at + 1.6)
  if (p <= 0 || p >= 1) return
  const fx = lerp(LX, 860, ease.inOutCubic(p)), fy = lerp(1000, 700, ease.inOutCubic(p)) - Math.sin(Math.PI * p) * 120
  x.save(); x.translate(fx, fy); x.rotate(p * 4); box(x, -50, -30, 100, 60, '#f4f0fa', { b: 4 }); label(x, '.txt', 0, 2, { size: 20, col: INK }); x.restore()
  void name
}
function insideFolder(x, t) {
  // ch 2: the folder's contents, files drifting
  const k = pop01(t, 30.0, 0.3, 2.2) * outK(t, [35.6, 35.9])
  if (k <= 0.01) return
  x.save(); x.translate(540, 900); x.scale(k, k)
  box(x, -400, -260, 800, 520, '#2a2148', { b: 6 }); R(x, '#e9b24a', -400, -260, 800, 56); label(x, 'STUFF I DIDN’T SAY', 0, -232, { size: 26, col: INK })
  const files = ['leftovers.txt', 'the friend thing.txt', 'dishes (again).txt', 'the plans.txt', 'that tone.txt', 'the thing in may.txt']
  files.forEach((f, i) => {
    const fx = -260 + (i % 2) * 400 + Math.sin(t * 1.5 + i) * 14, fy = -130 + Math.floor(i / 2) * 130 + Math.cos(t * 1.3 + i) * 10
    const kk = pop01(t, 30.3 + i * 0.4, 0.25, 2.4)
    if (kk <= 0.01) return
    x.save(); x.translate(fx, fy); x.scale(kk, kk); box(x, -30, -36, 60, 72, '#f4f0fa', { b: 4 }); label(x, f, 50, 0, { size: 26, align: 'left', col: BONE, font: INTER, weight: 800 }); x.restore()
  })
  x.restore()
}

function scene(x, t, K) {
  R(x, '#1b1438', 70, 556, 940, 880)
  // home: a sofa
  box(x, 120, 1300, 840, 60, '#7a4a8e', { b: 6 }); R(x, '#2a2048', 70, 1366, 940, 70)
  const after = t >= REPLAY
  const blurt = t >= BLURT && t < CH[3]
  // the partner (Taurus star)
  K.star(x, t, 'taurus', MX, MY, 240, { mood: blurt ? 'wide' : after ? (t > 65.2 ? 'happy' : 'neutral') : 'happy', look: [-1, 0], seed: 5, hops: [...ANNOY.map(a => a.at), BLURT + 1, REPLAY + 0.2, 65.2] })
  // Libra: smile glued on, then the blurt, then honest
  const strain = t < CH[2] ? prog(t, 3, CH[2]) : 0
  K.hero(x, t, LX, LY, 260, { mood: blurt ? 'wide' : after ? (t > 65.2 ? 'heart' : 'neutral') : t > FULL && t < BLURT ? 'squint' : 'happy', look: [1, 0], squash: blurt ? -0.15 : 0.02 + strain * 0.05, hops: [...ANNOY.map(a => a.at + 0.9), BLURT, BLURT + 0.3, 63.6, 65.4] })
  if (!after && t < CH[2] && Math.floor(t * 1.5) % 2) R(x, '#8fd8ff', LX + 110, 1040, 12, 18)
  folder(x, t, 860, 700, 1)
  for (const a of ANNOY) { bubble(x, t, MX - 40, 960, a.at, a.at + 2.4, a.them, { size: 28, col: '#ffe9c8', maxW: 380 }); bubble(x, t, LX + 30, 960, a.at + 0.9, a.at + 2.6, a === ANNOY[3] ? 'it’s FINE.' : 'it’s fine!', { size: 32 }); flyFile(x, t, a.at, a.file) }
  insideFolder(x, t)
  cracks(x, t, t < 3 ? 0.6 + t * 0.1 : t >= FULL && t < CH[3] + 2.4 ? 1 : 0)
  // the blurt
  if (blurt) sticker(x, t, 'I’M DONE.', LX + 60, 900, BLURT, 44.0, { col: RED, ink: '#fff', size: 64, rot: -0.08 })
  bubble(x, t, MX - 40, 920, BLURT + 1.0, 44.5, 'wait… done with WHAT??', { size: 28, col: '#ffe9c8', maxW: 380 })
  // the replay
  bubble(x, t, MX - 40, 960, REPLAY + 0.2, 64.6, 'i ate your leftovers lol', { size: 28, col: '#ffe9c8', maxW: 380 })
  bubble(x, t, LX + 40, 900, 63.6, 67.6, 'actually, can we not do that?', { size: 30, maxW: 380 })
  bubble(x, t, MX - 40, 1010, 65.2, 71.3, 'oh! sorry. i’ll get you noodles.', { size: 28, col: '#ffe9c8', maxW: 380 })
  if (t > 65.2) { hearts(x, t, 65.2, 540, 1080, { n: 8 }); sparkles(x, t, 540, 1080, 65.3, 12, 200, 1) }
}

const F = makeGlitch({
  id: 'klge17', sign: 'libra', len: 72, ending: 'loop',
  hook: 'LIBRA.EXE: keeping the peace. *(crashing)*',
  promise: 'wait for the *patch notes* ↓',
  err: { msg: ['Unsaid things: 99%.', 'Smile: holding.'], out: 2.75 },
  notResp: [[-1, 2.7], [FULL, 39.5]],
  hits: [
    { kind: 'whip', at: 0.5, x: 860, y: 720, z: 0.4, hold: 0.5 }, { kind: 'whip', at: 12.5, x: MX, y: 1100, z: 0.25, hold: 0.8 }, { kind: 'scratch', at: 17.6, dur: 0.6 },
    { kind: 'flash', at: 30.0, col: '#e9b24a' }, { kind: 'glitch', at: FULL, dur: 0.6, g: 0.9 }, { kind: 'shake', at: BLURT, dur: 0.6, amp: 26 }, { kind: 'flash', at: BLURT, col: RED },
    { kind: 'whip', at: REPLAY, x: 540, y: 1050, z: 0.2, hold: 0.6 },
  ],
  chapters: [{ at: CH[0], n: 1, text: 'THE GLITCH' }, { at: CH[1], n: 2, text: 'WHERE IT COMES FROM' }, { at: CH[2], n: 3, text: 'WHAT IT COSTS' }, { at: CH[3], n: 4, text: 'PATCH NOTES' }],
  caps: [
    { at: 5.6, out: 20.6, text: 'every annoyance: *"it’s fine!"*' },
    { at: 23.6, out: 29.7, text: '★ astrology says: Libra is ruled by *Venus*', size: 56 },
    { at: 30.2, out: 35.8, text: 'every "it’s fine" gets *saved*' },
    { at: 42.0, out: 47.0, text: 'small stuff, saved up, comes out *big*' },
    { at: REPLAY + 0.1, out: 67.8, text: 'the replay:' },
  ],
  errs: [{ at: FULL, out: 39.5, msg: ['FOLDER FULL.', 'Saved feelings: 47.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 47.2, out: 50.0, text: 'they never even knew *sob*', tears: 3 }],
  stars: [{ t: 21.6, text: 'keeping things kind is your *gift.*' }, { t: 25.2, text: 'but peace that’s *silent* isn’t peace.' }],
  box: [{ open: 21.35, close: 29.8 }],
  patch: { at: CH[3] + 0.5, ver: '2.0', name: 'LIBRA.EXE 2.0', dur: 1.5, out: 55.2 },
  notes: { at: 55.3, out: 62.4, ver: '2.0', gap: 1.9, items: ['small, honest *no’s.*', 'say it the *day* it happens.', 'a disagreement isn’t a *breakup.*'] },
  last: { at: 68.0, text: 'Small no’s save *big* love.' },
  scene, accent: '#a03a9a',
  cues: [...ANNOY.flatMap(a => [['pop', a.at, 659.25, 0.04, 0.3], ['pop', +(a.at + 0.9).toFixed(2), 880, 0.04, -0.3], ['whoosh', +(a.at + 1.0).toFixed(2), 0.5, 0.03], ['tick', +(a.at + 1.6).toFixed(2), 0.05]]), ['tom', BLURT, 70, { gain: 0.3 }], ['pop', REPLAY + 0.2, 659.25, 0.04, 0.3], ['pop', 63.6, 880, 0.04, -0.3], ['bell', 65.2, 1318.51, 0.05, 1.2, 0], ['glitter', 65.2, 66.2]],
  music: { style: 'pop', key: 'Bb', seed: 1817, drop: 3.0, breakdown: [30.0, BLURT], lift: [CH[3], REPLAY] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
