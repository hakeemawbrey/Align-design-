// klge19 · Your Sign's Love Glitch · "Sagittarius.exe: Joke Shield" (LONG, 76 s vertical, star_advice post, loop).
//   0.0   frame 0: SAGITTARIUS.EXE deflected with a joke. Sag mid-punchline, a rubber chicken frozen mid-air, the LAUGH
//         sign lit, its partner (a Cancer star) in tears. Promise: wait for the patch notes.
//   CH 1  THE GLITCH (3.0): "do you ever get scared about us?" → "only of your cooking!" · "how are you really?" →
//         juggling · "i had a rough day." → HONK. The laugh track every time.
//   CH 2  WHERE IT COMES FROM (21.0): ★ astrology says: Sagittarius is ruled by Jupiter. THE STARS: optimism is the
//         gift, but jokes can be a wall too. A wall of HA HA HA bricks builds between them.
//   CH 3  WHAT IT COSTS (38.0): the partner types "i had the worst—" and sends "never mind :)". Error: connection
//         shallow. Pisces cries. Friends laugh, but nobody knows Sag.
//   CH 4  PATCH NOTES (56.0): SAGITTARIUS.EXE 2.0; notes: one serious sentence first · jokes are welcome after · ask
//         a real question back. The replay: "that sounds hard. i'm glad you told me." Then one small honk; both laugh.
//   72.0  last line "Mean it, *then* joke."   75.55 loop back into frame 0.
import { makeGlitch, R, box, label, bubble, phone, hearts, sparkles, sticker, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const CH = [3.0, 21.0, 38.0, 56.0]
const SX = 300, SY = 1200, EX = 780, EY = 1200
const REPLAY = 66.6
const BITS = [{ at: 4.0, q: 'do you ever get scared about us?', a: 'only of your cooking!' }, { at: 9.0, q: 'how are you, really?', a: 'ta-da!! *juggles*' }, { at: 14.0, q: 'i had a rough day.', a: 'HONK.' }]
const laughOn = t => (t < 3) || BITS.some(b => t > b.at + 1.0 && t < b.at + 2.6) || (t > 50.4 && t < 55.4) || (t > 70.0 && t < 72.5)
function chicken(x, t, px, py, rot) {
  x.save(); x.translate(px, py); x.rotate(rot)
  box(x, -60, -14, 110, 28, '#f4e8a8', { b: 4 }); box(x, 46, -28, 34, 30, '#f4e8a8', { b: 4 }); R(x, '#f39a3a', 80, -18, 18, 10); R(x, RED, 50, -40, 16, 12); R(x, INK, 60, -20, 5, 5)
  R(x, '#f39a3a', -40, 14, 6, 26); R(x, '#f39a3a', -10, 14, 6, 26)
  x.restore()
}
function laughSign(x, t) {
  const on = laughOn(t)
  box(x, 400, 610, 280, 80, on ? RED : '#4a2030', { b: 5 })
  label(x, on ? 'LAUGH ✦' : 'LAUGH', 540, 652, { size: 40, col: on ? BONE : '#8a5a6a', font: INTER, weight: 900 })
  if (on && Math.floor(t * 6) % 2) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.25; R(x, RED, 380, 590, 320, 120); x.restore() }
}
function hahaWall(x, t) {
  const p = clamp(prog(t, 30.0, 34.5)) * (1 - prog(t, 37.5, 38.0))
  if (p <= 0) return
  const rows = Math.ceil(7 * p)
  for (let r = 0; r < rows; r++) for (let c = 0; c < 2; c++) {
    const bx = 470 + c * 80, by = 1330 - (r + 1) * 70
    box(x, bx, by, 72, 62, '#b0402e', { b: 4 }); label(x, 'HA', bx + 36, by + 33, { size: 26, col: BONE, font: INTER, weight: 900 })
  }
}
function friends(x, t) {
  const k = pop01(t, 50.2, 0.3, 2.2) * outK(t, [55.3, 55.6])
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  box(x, 110, 720, 860, 260, '#22184a', { b: 5 }); label(x, 'THE GROUP CHAT', 540, 746, { size: 22, col: GOLD })
  const S = [['gemini', 260], ['leo', 440], ['aries', 620], ['aquarius', 800]]
  S.forEach(([s, px], i) => K0.star(x, t, s, px, 870, 110, { mood: 'happy', seed: 10 + i, hops: [50.6 + i * 0.2, 51.6 + i * 0.2, 52.6] }))
  label(x, '"you’re SO funny"  ·  "lol legend"  ·  "never change"', 540, 952, { size: 22, col: BONE })
  x.restore()
}
let K0 = null

function scene(x, t, K) {
  K0 = K
  R(x, '#1a1236', 70, 556, 940, 880); R(x, '#2a2048', 70, 1330, 940, 106)
  laughSign(x, t)
  const after = t >= REPLAY
  // the partner (Cancer star)
  const quiet = t >= CH[2] && !after
  K.star(x, t, 'cancer', EX, EY, 240, { mood: after ? (t > 68.6 ? 'happy' : 'neutral') : quiet ? 'neutral' : t < 3 ? 'wide' : 'neutral', look: [-1, 0], seed: 2, tears: t < 3 || (t > 14 && t < 16.5) ? 2 : 0, hops: [...BITS.map(b => b.at), REPLAY, 68.6, 70.1] })
  // Sag
  K.hero(x, t, SX, SY, 260, { mood: after ? (t > 70.0 ? 'happy' : 'neutral') : quiet && t > 44.5 && t < 46.5 ? 'wide' : 'sparkle', look: [1, 0], squash: !after && laughOn(t) ? -0.08 : 0, hops: [...BITS.map(b => b.at + 1.0), 67.4, 70.0, 70.3] })
  // the props: the frozen chicken (frame 0), juggling balls, the honk
  if (t < 3) chicken(x, t, 450, 860 + Math.sin(t * 3) * 6, -0.4)
  if (t > 9.8 && t < 12.6) for (let i = 0; i < 3; i++) { const a = t * 6 + i * 2.1; R(x, INK, SX - 14 + Math.cos(a) * 90, 920 + Math.sin(a) * 50 - 14, 28, 28); R(x, [RED, GOLD, '#3fb6f0'][i], SX - 10 + Math.cos(a) * 90, 920 + Math.sin(a) * 50 - 10, 20, 20) }
  if (t > 14.8 && t < 17.2) { chicken(x, t, SX + 140, 960, Math.sin(t * 20) * 0.2); sticker(x, t, 'HONK', SX + 160, 860, 15.0, 17.0, { col: GOLD, size: 44, rot: 0.1 }) }
  if (t > 70.0 && t < 72.6) { chicken(x, t, SX + 140, 960, 0.1); sticker(x, t, 'honk', SX + 160, 870, 70.2, 72.4, { col: GOLD, size: 32, rot: 0.1 }) }
  hahaWall(x, t)
  for (const b of BITS) { bubble(x, t, EX - 40, 950, b.at, b.at + 2.4, b.q, { size: 28, col: '#d8f4ff', maxW: 360 }); bubble(x, t, SX + 30, 960, b.at + 1.0, b.at + 3.0, b.a, { size: 32 }) }
  // ch 3: the partner stops sharing
  const pk = pop01(t, 39.0, 0.3, 2.2) * outK(t, [43.8, 44.1])
  if (pk > 0.01) {
    const typed = t < 40.6 ? 'i had the worst—'.slice(0, Math.floor(prog(t, 39.3, 40.4) * 16)) : t < 41.4 ? 'i had the worst—'.slice(0, Math.max(0, 16 - Math.floor(prog(t, 40.6, 41.2) * 16))) : 'never mind :)'
    x.save(); x.translate(EX - 20, 880); x.scale(pk, pk); box(x, -200, -60, 400, 120, '#f4f0fa', { b: 5 }); label(x, 'to SAG', -180, -36, { size: 18, align: 'left', col: '#6a5a9a' }); label(x, typed, -180, 10, { size: 30, align: 'left', col: INK, font: INTER, weight: 800 }); x.restore()
  }
  friends(x, t)
  bubble(x, t, EX - 40, 950, REPLAY, 69.4, 'i had a rough day.', { size: 30, col: '#d8f4ff' })
  bubble(x, t, SX + 40, 900, 67.4, 71.2, 'that sounds hard. i’m glad you told me.', { size: 28, maxW: 380 })
  if (t > 70.0) { hearts(x, t, 70.0, 540, 1080, { n: 8 }); sparkles(x, t, 540, 1050, 70.1, 12, 200, 1) }
}

const F = makeGlitch({
  id: 'klge19', sign: 'sagittarius', len: 76, ending: 'loop',
  hook: 'SAGITTARIUS.EXE deflected *with a joke.*', hookSize: 74,
  promise: 'wait for the *patch notes* ↓',
  err: { msg: ['Partner: crying.', 'Response: rubber chicken.'], out: 2.75 },
  notResp: [[-1, 2.7], [44.5, 46.5]],
  hits: [
    { kind: 'whip', at: 0.5, x: 450, y: 860, z: 0.4, hold: 0.5 }, { kind: 'shake', at: 5.0, dur: 0.3, amp: 10 }, { kind: 'whip', at: 10.0, x: SX, y: 950, z: 0.3, hold: 0.8 }, { kind: 'scratch', at: 15.0, dur: 0.7 },
    { kind: 'flash', at: 30.0, col: '#b0402e' }, { kind: 'whip', at: 41.4, x: EX, y: 900, z: 0.35, hold: 1.2 }, { kind: 'glitch', at: 44.5, dur: 0.6 }, { kind: 'flash', at: 50.2, col: GOLD },
    { kind: 'whip', at: 67.4, x: 540, y: 1000, z: 0.2, hold: 1.0 },
  ],
  chapters: [{ at: CH[0], n: 1, text: 'THE GLITCH' }, { at: CH[1], n: 2, text: 'WHERE IT COMES FROM' }, { at: CH[2], n: 3, text: 'WHAT IT COSTS' }, { at: CH[3], n: 4, text: 'PATCH NOTES' }],
  caps: [
    { at: 5.6, out: 18.6, text: 'every serious moment gets *a bit*' },
    { at: 23.6, out: 29.8, text: '★ astrology says: Sagittarius is ruled by *Jupiter*', size: 54 },
    { at: 30.2, out: 37.6, text: 'jokes keep scary feelings *outside*' },
    { at: 41.6, out: 44.3, text: 'they stop telling you *things*' },
    { at: 50.4, out: 55.5, text: 'everyone laughs. nobody *knows* you.' },
    { at: REPLAY, out: 71.6, text: 'the replay:' },
  ],
  errs: [{ at: 44.5, out: 46.5, msg: ['CONNECTION: SHALLOW.', 'Laughs: 100. Talks: 0.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 46.8, out: 49.8, text: 'even the chicken looks sad *sob*', tears: 3 }],
  stars: [{ t: 21.6, text: 'optimism is your *gift.*' }, { t: 24.4, text: 'but jokes can be a *wall*, too.' }],
  box: [{ open: 21.35, close: 29.4 }],
  patch: { at: CH[3] + 0.5, ver: '2.0', name: 'SAGITTARIUS.EXE 2.0', dur: 1.5, out: 59.2 },
  notes: { at: 59.3, out: 66.4, ver: '2.0', gap: 1.9, items: ['one *serious* sentence first.', 'jokes are welcome *after.*', 'ask a real question *back.*'] },
  last: { at: 72.0, text: 'Mean it, *then* joke.' },
  scene, accent: '#6a3ab0',
  cues: [...BITS.flatMap(b => [['pop', b.at, 659.25, 0.04, 0.3], ['pop', +(b.at + 1.0).toFixed(2), 880, 0.04, -0.3], ['clap', +(b.at + 1.1).toFixed(2), { gain: 0.12 }], ['clap', +(b.at + 1.35).toFixed(2), { gain: 0.1 }], ['clap', +(b.at + 1.6).toFixed(2), { gain: 0.08 }]]), ['chip', 15.0, 330, 0.25, { wave: 'square', duty: 0.25, gain: 0.04, decay: 0.2, sustain: 0.5 }], ...[0, 1, 2, 3, 4, 5, 6].map(i => ['tick', +(30.0 + i * 0.65).toFixed(2), 0.05]), ['pop', 39.3, 523.25, 0.03, 0.3], ['pop', REPLAY, 659.25, 0.04, 0.3], ['pop', 67.4, 880, 0.04, -0.3], ['chip', 70.2, 392, 0.15, { wave: 'square', duty: 0.25, gain: 0.03, decay: 0.15, sustain: 0.4 }], ['bell', 70.0, 1318.51, 0.05, 1.2, 0], ['glitter', 70.0, 71.0]],
  music: { style: 'funk', key: 'Gm', seed: 1819, drop: 3.0, breakdown: [30.0, 46.8], lift: [CH[3], REPLAY] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
