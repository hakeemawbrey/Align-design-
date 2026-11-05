// khee05: HEALING ERA, Ep 5 "The “thriving” selfie" (20 s vertical, Month 2 boost m15, star_advice post, pop · D).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loop ending.
//   0.0    frame 0: Leo on the kitchen floor mid-pose, phone up, a ring light blazing, a big grin… and tears running.
//          DAY 4 on the wall. Hook: "Day 4. Posting proof I'm *thriving.*"
//   0.6    record scratch + freeze: "caption: “never *better.*”"  A red "caught" circle: THE TEAR.
//          "chin up. smile. post." / "why is my face wet"  Pisces sniffles with tissues.
//   6.4    THE STARS: "you don't owe anyone a *comeback.*" / "heal for you, not for the *audience.*"
//   12.4   Leo lowers the phone, the ring light clicks off (Pisces cries at it), Leo calls its sister: "hey. not great.
//          can we talk?"  The calendar tears to DAY 10; Leo laughing for real.
//   17.1   Last line: "Heal *offline* first."  The last 0.42 s eases back into frame 0.
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, glow } from '../../khee01/healkit.js'
import { kitchen, bigPhone } from '../../khee01/healset.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s

function ringLight(x, t, cx, cy, on = 1) {
  R(x, INK, cx - 7, cy + 100, 14, FLOOR - cy - 100); R(x, '#4a4270', cx - 3, cy + 104, 6, FLOOR - cy - 108)
  R(x, INK, cx - 60, FLOOR - 14, 120, 14)
  if (on > 0) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, cy, 420, 0.45 * on, '255,246,220'); x.restore() }
  x.save(); x.lineWidth = 34; x.strokeStyle = INK; x.beginPath(); x.arc(cx, cy, 100, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 22; x.strokeStyle = on > 0.5 ? '#fffbea' : '#6a6290'; x.stroke(); x.restore()
}

function s1(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 4 }, stoveClock: '6:40' })
  ringLight(x, t, 720, 960, 1)
  shadow(x, 360, FLOOR + 4, 300)
  const pose = u < 0.6 ? Math.sin(u * 20) * 0.04 : 0
  crier(x, t, 'leo', { x: 360, y: fy(300), s: 300, mood: u < 3.6 ? 'happy' : 'wide', look: [1, -0.4], squash: -0.05 + pose, seed: 3, glow: 1.1 }, u < 3.6 ? 1 : 2)
  bigPhone(x, t, 560, 1040, { w: 170, h: 290, rot: -0.12, mode: 'camera', col: '#f0a04a' })
}
function s2(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 4 }, stoveClock: '6:45', dim: 0.5 })
  ringLight(x, t, 820, 960, 0.4)
  shadow(x, 540, 1300, 260)
  crier(x, t, 'leo', { x: 540, y: 1185, s: 260, mood: u > 4 ? 'sparkle' : 'neutral', look: [0, -1], seed: 3 }, 1)
}
function s3(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 10 }, stoveClock: u < 2.2 ? '6:52' : '5:15', morning: lerp(0, 0.45, prog(u, 2.2, 3.2)) })
  const on = u < 0.5 ? 1 : 0
  ringLight(x, t, 760, 960, on)
  shadow(x, 360, FLOOR + 4, 290)
  const laugh = u > 2.6
  hero(x, t, { x: 360, y: fy(290), s: 290, mood: u < 0.5 ? 'neutral' : laugh ? 'happy' : 'sparkle', look: [1, -0.2], squash: laugh ? 0.08 * Math.abs(Math.sin(u * 10)) : 0, hops: laugh ? [S.t0 + 2.7, S.t0 + 3.1, S.t0 + 3.5] : [S.t0 + 0.6] })
  if (u < 0.5) bigPhone(x, t, lerp(560, 520, u * 2), lerp(1040, 1200, u * 2), { w: 170, h: 290, rot: -0.12, mode: 'camera', col: '#f0a04a' })
  else if (u < 2.4) { R(x, INK, 470, 1150, 40, 74); R(x, '#5fa8ff', 475, 1156, 30, 60) }
}
function fin(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 10 }, stoveClock: '5:20', morning: 0.45, dim: 0.3 })
  ringLight(x, t, 800, 960, 0)
  shadow(x, 540, 1290, 290)
  hero(x, t, { x: 540, y: 1160, s: 310, mood: 'happy', look: [0, 0], squash: u < 1.2 ? 0.07 * Math.abs(Math.sin(u * 10)) : 0, hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
}

const EP = makeHeal({
  id: 'khee05', sign: 'leo', name: 'Leo', len: 20, ending: 'loop',
  hook: 'Day 4. Posting proof | I’m *thriving.*',
  brk: { kind: 'scratch', at: 0.6, len: 1.4, text: 'caption: “never *better.*”' },
  caught: { at: 0.85, x: 405, y: 1215, r: 90, out: [1.9, 2.0], label: 'THE TEAR', arrow: 'tr' },
  whip: { x: 420, y: 1150 },
  h1: 'No one *needs* the proof.', h2: 'Call someone *real.*',
  lines: ['you don’t owe anyone a *comeback.*', 'heal for you, not for the *audience.*'],
  last: 'Heal *offline* first.', late: 2, day: 4, dayTo: 10,
  bubbles: [
    { t0: 2.2, t1: 4.0, x: 470, y: 960, text: 'chin up. smile. post.', size: 40, tail: -0.4 },
    { t0: 4.1, t1: 6.2, x: 470, y: 960, text: 'why is my face wet', size: 42, tail: -0.4 },
    { t0: 13.4, t1: 15.0, x: 470, y: 930, text: 'hey. not great. can we talk?', size: 36, tail: -0.4 },
  ],
  pis1: { x: 930, y: 1350, s: 150 }, pis3: { x: 940, y: 1352, s: 150 },
  s1, s2, s3, fin,
  cues: [['pop', 0.1, 1318.51, 0.03, 0.2], ['tick', 0.15, 0.05], ['tick', 12.9, 0.07], ['pop', 12.92, 220, 0.05, 0.3], ['bell', 13.3, 1318.51, 0.03, 0.8, -0.2], ['pop', 15.0, 880, 0.04, -0.2], ['pop', 15.2, 1046.5, 0.04, -0.2], ['pop', 15.4, 1174.66, 0.04, -0.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ease, pop01, BONE]
