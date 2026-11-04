// nf16e07: MEET THE FAMILY, Ep 7, "Don't leave them alone at the party." (30 s vertical, star_advice, music: chiptune · G).
// Story 0–25.6, then the shared end card. The series look lives in ../../nf16e01/scenes/familykit.js.
//   0.0–3.0    DEAR STARS: "“Where did | you *go?*”" — a Virgo, on the couch. ♍ Virgo wedged between two cousins, mid-wave
//              for help.
//   3.0–10.4   "One hour. | *Seventeen* questions."  The cousins fire questions (do you ski? · pie or cake? · fave pine
//              needle?), a counter ticks Q 17; far off in the kitchen doorway ♌ Leo laughs with the aunties.
//              VIRGO: "I have answered *seventeen* questions."
//  10.4        card cut.
//  10.4–17.0   "A glance. A squeeze. | *“You good?”*"  THE STARS: "you brought them. *stay* with them." → "a glance, a squeeze,
//              a *'you good?'*"  Leo zips back with two plates.
//  17.0–25.6   "Side *by side.*"  LEO: "brought you pie. *you good?*" VIRGO: "*now* I am." Pisces fountains by the pine.
//              THE STARS: "Bring them home, then stay beside them."
import { makeFamily, K, box, R, ink, hearts, shadow, livingRoom, bubble, drawBits,
  pop01, outK, prog, lerp, clamp, ease, GOLD, BONE, PINK, MINT, SKYB, RED, EXCL } from '../../nf16e01/scenes/familykit.js'

const VIR = K.tag('virgo'), LEO = K.tag('leo')
const T = { b1: 3.0, b2: 10.4, b3: 17.0, end: 25.61, back: 14.6 }
const BOXES = [
  { open: 6.6, close: 10.2, lines: [{ t: 6.8, speaker: VIR, color: MINT, text: 'I have answered *seventeen* questions.' }] },
  { open: 10.8, close: 16.8, lines: [
    { t: 11.0, speaker: K.STARS, text: 'you brought them. *stay* with them.' },
    { t: 13.4, speaker: K.STARS, text: "a glance, a squeeze, a *'you good?'*" },
  ] },
  { open: 17.2, close: 25.1, lines: [
    { t: 17.4, speaker: LEO, color: GOLD, text: 'brought you pie. *you good?*' },
    { t: 19.4, speaker: VIR, color: MINT, text: '*now* I am.' },
    { t: 21.3, speaker: K.STARS, text: 'Bring them home, then stay beside them.' },
  ] },
]
const COUS = [{ color: '#ff9a6a', acc: [['beanie', '#3f7cf0']], seed: 51 }, { color: '#c9a6ff', acc: [['bow', '#e8344e']], seed: 52 }]
const QS = ['do you ski?', 'pie or cake?', 'fave pine needle?', 'cats or dogs?', 'where are you FROM?']

function room(x, t) { livingRoom(x, t, { top: 420, floor: 1340, couchX: 470, couchW: 640 }) }
function kitchenDoor(x, t, leoK) {
  // a warm doorway at the back, top left: Leo laughing with the aunties
  box(x, 60, 500, 220, 300, '#ffe1a6', { b: 8 })
  if (leoK > 0.01) for (let i = 0; i < 2; i++) drawBits(x, ['..A..', '.AAA.', 'AAAAA', '.A.A.'], { A: ['#ffb0c8', '#9fd0a0'][i] }, 110 + i * 120, 740 - 6 * Math.abs(Math.sin(t * 5 + i)), 9)
}
function couchRow(x, t, S, { virMood = 'wide', virLook = [0, -1], cousMood = 'happy', virHops = [] } = {}) {
  COUS.forEach((c, i) => S.rel(x, t, { ...c, x: [250, 690][i], y: 1090, s: 190, mood: cousMood, look: [i ? -1 : 1, 0], hops: [S.t0 + 0.4 + i * 0.6, S.t0 + 1.6 + i * 0.6, S.t0 + 3 + i * 0.4] }))
  return S.asker(x, t, { x: 470, y: 1090, s: 210, mood: virMood, look: virLook, hops: virHops })
}
function hook(x, t, S) {
  room(x, t)
  kitchenDoor(x, t, 1)
  S.partner(x, t, { x: 170, y: 690, s: 95, mood: 'happy', look: [1, 0], hops: [0.4, 1.2, 2.0] })
  couchRow(x, t, S, { virHops: [-0.12, 0.5, 1.0, 1.5, 2.0, 2.5] })
  // a little waving hand of pixels
  drawBits(x, ['.W.W.', 'WWWWW', 'WWWWW', '.WWW.'], { W: BONE }, 470 + 14 * Math.sin(t * 12), 900, 7)
}
function beat1(x, t, S) {
  const u = t - S.t0
  room(x, t)
  kitchenDoor(x, t, 1)
  S.partner(x, t, { x: 170, y: 690, s: 95, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.5, S.t0 + 2, S.t0 + 3.5] })
  couchRow(x, t, S, { virMood: 'wide', virLook: [Math.sin(t * 3) > 0 ? 1 : -1, 0] })
  QS.forEach((q, i) => bubble(x, t, [250, 690, 300, 700, 480][i], [880, 860, 780, 760, 680][i], S.t0 + 0.5 + i * 0.9, S.t0 + 0.5 + i * 0.9 + 1.4, q, { size: 32, tail: i % 2 ? -0.3 : 0.3, col: i === 4 ? '#ffd1de' : BONE }))
  const n = Math.min(17, Math.floor(u * 3.2) + 1)
  box(x, 800, 470, 220, 80, BONE, { b: 6 }); ink(x, `Q ${n}`, 910, 512, { size: 40, col: RED, font: "Inter, sans-serif", weight: 800 })
}
function beat2(x, t, S) {
  room(x, t)
  kitchenDoor(x, t, 0)
  couchRow(x, t, S, { virMood: t > T.back + 0.4 ? 'happy' : 'neutral', virLook: [1, -0.5] })
  // Leo zips across the room with two plates
  const p = ease.inOutCubic(prog(t, T.back - 0.8, T.back))
  if (p > 0) {
    const lx = lerp(170, 880, p), ly = lerp(700, 1060, p)
    S.partner(x, t, { x: lx, y: ly, s: lerp(95, 190, p), mood: 'happy', look: [-1, 0], hops: [T.back + 0.05] })
    plates(x, lx - 80 * p, ly + 30 * p, p)
  }
}
function plates(x, cx, cy, k) {
  for (let i = 0; i < 2; i++) { box(x, cx - 60 + i * 70, cy, 60, 12, '#ffffff', { b: 4 }); R(x, '#e3a05a', cx - 50 + i * 70, cy - 12, 40, 12) }
  void k
}
function beat3(x, t, S) {
  room(x, t)
  COUS.forEach((c, i) => S.rel(x, t, { ...c, x: [190, 880][i], y: 1100, s: 170, mood: 'happy', look: [i ? -1 : 1, 0] }))
  S.asker(x, t, { x: 420, y: 1090, s: 210, mood: t > 19.4 ? 'heart' : 'happy', look: [1, 0], hops: [19.4, 19.8] })
  S.partner(x, t, { x: 650, y: 1090, s: 210, mood: 'happy', look: [-1, 0], hops: [17.4, 17.9] })
  plates(x, 540, 1180, 1)
  hearts(x, t, 19.5, 530, 920, { n: 6 })
}

const EP = makeFamily({
  id: 'nf16e07', D: 30, key: 'G', asker: 'virgo', partner: 'leo',
  askerAcc: [['glasses']], partnerAcc: [['scarf', '#e8344e']],
  q: { text: '“Where did | you *go?*”', sign: '— a Virgo, on the couch', out: [2.7, 3.0], accentSize: 130 },
  hook,
  beats: [
    { t0: T.b1, t1: T.b2, head: 'One hour. | *Seventeen* questions.', accent: PINK, draw: beat1, stars: null, pis: { x: 960, y: 1250, s: 110, tears: 1, look: [-1, -1], at: 1.0, noTissues: true } },
    { t0: T.b2, t1: T.b3, head: 'A glance. A squeeze. | *“You good?”*', accent: GOLD, draw: beat2, stars: { x: 150, y: 1300, s: 140 }, pis: { x: 960, y: 1250, s: 110, tears: 2, look: [-1, -1], at: 1.0, noTissues: true } },
    { t0: T.b3, t1: T.end, head: 'Side *by side.*', accent: MINT, size: 104, accentSize: 140, draw: beat3, stars: { x: 150, y: 1300, s: 140, at: 4.0 }, pis: { x: 960, y: 1250, s: 120, tears: 3, mood: 'happy', look: [-1, -1], at: 2.4, noTissues: true } },
  ],
  boxes: BOXES,
  cuts: [{ t: T.b2, kind: 'flip' }],
  flashes: [T.b1],
  cues: [
    ...QS.map((_, i) => ['pop', +(T.b1 + 0.5 + i * 0.9).toFixed(3), [987.77, 1174.66, 1318.51, 1567.98, 1760][i], 0.035, i % 2 ? 0.3 : -0.3]),
    ['whoosh', T.back - 0.8, 0.8, 0.04], ['pop', T.back, 1318.51, 0.05, 0.3],
    ['pluck', 19.5, 1174.66, 0.04, 0.5, 0], ['bell', 19.6, 1760, 0.025, 1, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [SKYB, EXCL, clamp, pop01, outK]
