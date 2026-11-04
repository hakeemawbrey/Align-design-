// nf16e09: MEET THE FAMILY, Ep 9, "Two families, one holiday." (40 s vertical, star_advice, music: dreamy · Ab).
// Story 0–35.6, then the shared end card. The series look lives in ../../nf16e01/scenes/familykit.js.
// Pisces asks this time, so Pisces cries as the lead (overwhelmed, then happy).
//   0.0–3.2    DEAR STARS: "“Both our families | want *the same day.*”" — a Pisces, holding two invitations. ♓ Pisces mid-sob,
//              an invitation in each hand: OURS · SATURDAY and THEIRS · SATURDAY.
//   3.2–11.0   "Two doors. | *One* day."  Two lit houses pull the couple apart on two ribbons, back and forth… until they
//              land in a heap. ♈ ARIES: "my dad already made a *seating chart.*" PISCES: "so we just… *split* in half?"
//  11.0–19.8   "Decide | *together.*"  THE STARS: "this isn't you vs. them. it's *you two.*" → "put every option on the *table.*"
//              Three option cards pop up: SPLIT THE DAY · SWAP YEARS · HOST BOTH.
//  19.8        card cut.
//  19.8–26.2   "Pick one. | *Same* team."  ARIES: "lunch at yours, dinner at *mine?*" PISCES: "and next year we *swap.*"
//              SPLIT THE DAY and SWAP YEARS get a gold check.
//  26.2        ★ LESSON UNLOCKED: "Choose *together.* | Tell *together.*"  +1 SAME TEAM
//  30.2–35.6   "One plan. | *Two* happy doors."  Both houses glow. THE STARS: "Make the plan as a team. Share it as one."
import { makeFamily, K, box, R, ink, sparkles, hearts, shadow, house, invite, snow, drawBits,
  pop01, outK, prog, lerp, clamp, ease, easeOutBack, GOLD, BONE, PINK, MINT, SKYB, BERRY, INTER, INK } from '../../nf16e01/scenes/familykit.js'

const PIS = K.tag('pisces'), SAG = K.tag('aries')
const T = { b1: 3.2, b2: 11.0, b3: 19.8, lesson: 26.2, b4: 30.2, end: 35.61, heap: 9.0, opts: [15.4, 16.0, 16.6], check: [21.4, 23.6] }
const BOXES = [
  { open: 5.4, close: 10.8, lines: [
    { t: 5.6, speaker: SAG, color: '#ff9a8a', text: 'my dad already made a *seating chart.*' },
    { t: 8.4, speaker: PIS, color: '#9fe6ff', text: 'so we just… *split* in half?' },
  ] },
  { open: 11.4, close: 19.6, lines: [
    { t: 11.6, speaker: K.STARS, text: "this isn't you vs. them. it's *you two.*" },
    { t: 14.4, speaker: K.STARS, text: 'put every option on the *table.*' },
  ] },
  { open: 20.0, close: 26.0, lines: [
    { t: 20.2, speaker: SAG, color: '#ff9a8a', text: 'lunch at yours, dinner at *mine?*' },
    { t: 22.6, speaker: PIS, color: '#9fe6ff', text: 'and next year we *swap.*' },
  ] },
  { open: 30.75, close: 35.1, lines: [{ t: 30.95, speaker: K.STARS, text: 'Make the plan as a team. Share it as one.' }] },
]
const OPTS = ['SPLIT THE DAY', 'SWAP YEARS', 'HOST BOTH']

function homes(x, t, glowK = 1) {
  snow(x, t, { n: 40, y0: 380, y1: 1360, seed: 9 })
  house(x, 190, 1180, 0.9, { body: '#3b2f5e', door: '#8c2f3c', lit: glowK })
  house(x, 890, 1180, 0.9, { body: '#2f4a5e', door: '#2f8a5c', lit: glowK })
  R(x, INK, 0, 1176, 1080, 8); R(x, '#eef3ff', 0, 1184, 1080, 150)
}
function hook(x, t, S) {
  shadow(x, 540, 1350, 280)
  S.asker(x, t, { x: 540, y: 1170, s: 280, mood: 'wide', look: [0, -0.4], tears: 3, hops: [-0.12, 1.3, 2.5] })
  invite(x, 250, 1000 + 8 * Math.sin(t * 4), { w: 300, h: 190, text: 'OURS', text2: 'SATURDAY', rot: -0.14 })
  invite(x, 830, 1000 + 8 * Math.sin(t * 4 + 1), { w: 300, h: 190, text: 'THEIRS', text2: 'SATURDAY', rot: 0.14, col: '#e6f2ff' })
}
function beat1(x, t, S) {
  homes(x, t)
  const pre = t < T.heap
  const pull = pre ? Math.sin((t - S.t0) * 3.2) : 0
  const sep = pre ? 90 + 40 * Math.abs(pull) : 0
  const cx = 540 + pull * 70, land = ease.outCubic(prog(t, T.heap, T.heap + 0.3))
  const py = lerp(1080, 1230, land)
  // the two ribbons from the doors
  if (pre) {
    x.save(); x.lineWidth = 10; x.strokeStyle = PINK; x.beginPath(); x.moveTo(190, 1090); x.lineTo(cx - sep, py); x.stroke()
    x.strokeStyle = MINT; x.beginPath(); x.moveTo(890, 1090); x.lineTo(cx + sep, py); x.stroke(); x.restore()
  }
  S.asker(x, t, { x: cx - sep, y: py, s: 190, mood: pre ? 'wide' : 'squint', tears: pre ? 2 : 3, look: [-1, 0], squash: pre ? 0 : 0.2 * (1 - prog(t, T.heap + 0.3, T.heap + 1)), hops: [] })
  S.partner(x, t, { x: cx + sep, y: py - (pre ? 0 : 60), s: 190, mood: pre ? 'wide' : 'squint', look: [1, 0], hops: [] })
  if (!pre) { sparkles(x, t, cx, py, T.heap, 10, 140, 2, [GOLD, BONE]); for (let i = 0; i < 3; i++) drawBits(x, ['..S..', 'SSSSS', '..S..'], { S: GOLD }, cx - 60 + i * 60 + 20 * Math.cos(t * 4 + i * 2), py - 150 + 10 * Math.sin(t * 4 + i * 2), 5) }
}
function optCard(x, t, cx, cy, text, k, chk) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -150, -60, 300, 120, chk > 0 ? '#fff1c8' : BONE, { b: 6 })
  ink(x, text, 0, 2, { size: 32, font: INTER, weight: 800 })
  if (chk > 0.01) drawBits(x, ['.....GG', '....GG.', 'G..GG..', 'GGGG...', '.GG....'], { G: GOLD }, 120, -60, 9 * chk)
  x.restore()
}
function beat2(x, t, S) {
  homes(x, t)
  OPTS.forEach((o, i) => optCard(x, t, [270, 810, 540][i], [560, 560, 720][i], o, pop01(t, T.opts[i], 0.3, 2.4), 0))
  shadow(x, 420, 1350, 200); shadow(x, 660, 1350, 200)
  S.asker(x, t, { x: 420, y: 1210, s: 200, mood: t > 11.8 ? 'sparkle' : 'squint', tears: 2, look: [1, -0.5] })
  S.partner(x, t, { x: 660, y: 1210, s: 200, mood: t > 11.8 ? 'happy' : 'neutral', look: [-1, -0.5] })
}
function beat3(x, t, S) {
  homes(x, t)
  OPTS.forEach((o, i) => optCard(x, t, [270, 810, 540][i], [560, 560, 720][i], o, 1, i < 2 ? easeOutBack(prog(t, T.check[i], T.check[i] + 0.3), 2.4) : 0))
  for (const a of T.check) sparkles(x, t, 540, 600, a, 8, 200, 1)
  shadow(x, 420, 1350, 200); shadow(x, 660, 1350, 200)
  S.asker(x, t, { x: 420, y: 1210, s: 200, mood: t > T.check[1] ? 'heart' : 'happy', tears: 3, look: [1, -0.5], hops: [22.6, T.check[1] + 0.2] })
  S.partner(x, t, { x: 660, y: 1210, s: 200, mood: 'happy', look: [-1, -0.5], hops: [20.2, T.check[0]] })
  hearts(x, t, T.check[1] + 0.2, 540, 1040, { n: 6 })
}
function beat4(x, t, S) {
  homes(x, t, 1.6)
  hearts(x, t, S.t0 + 0.5, 190, 860, { n: 5 }); hearts(x, t, S.t0 + 0.9, 890, 860, { n: 5 })
  shadow(x, 420, 1350, 200); shadow(x, 660, 1350, 200)
  S.asker(x, t, { x: 420, y: 1210, s: 200, mood: 'happy', tears: 3, look: [1, -0.5], hops: [S.t0 + 0.4, 33.4] })
  S.partner(x, t, { x: 660, y: 1210, s: 200, mood: 'happy', look: [-1, -0.5], hops: [S.t0 + 0.55, 33.5] })
}

const EP = makeFamily({
  id: 'nf16e09', D: 40, key: 'Ab', asker: 'pisces', partner: 'aries',
  askerAcc: [['beanie', '#ff8fb1']], partnerAcc: [['scarf', '#f2c75c']],
  q: { text: '“Both our families | want *the same day.*”', sign: '— a Pisces, holding two invitations', out: [2.9, 3.2], size: 78, accentSize: 100 },
  hook,
  beats: [
    { t0: T.b1, t1: T.b2, head: 'Two doors. | *One* day.', accent: PINK, draw: beat1, stars: null, pis: null },
    { t0: T.b2, t1: T.b3, head: 'Decide | *together.*', accent: MINT, draw: beat2, stars: { x: 140, y: 1300, s: 140 }, pis: null },
    { t0: T.b3, t1: T.lesson, head: 'Pick one. | *Same* team.', accent: GOLD, draw: beat3, stars: null, pis: null },
    { t0: T.lesson, t1: T.b4, head: null, draw: beat3, stars: null, pis: null, punch: false },
    { t0: T.b4, t1: T.end, head: 'One plan. | *Two* happy doors.', accent: PINK, draw: beat4, stars: { x: 140, y: 1300, s: 140 }, pis: null },
  ],
  boxes: BOXES,
  lesson: { at: T.lesson, out: [30.0, 30.2], text: 'Choose *together.* | Tell *together.*', chip: '+1 SAME TEAM', accentColor: MINT, dim: 0.6 },
  cuts: [T.b2, { t: T.b3, kind: 'flip' }, T.b4],
  flashes: [T.b1, T.b2],
  shakes: [T.heap],
  cues: [
    ...[3.7, 4.68, 5.66, 6.64, 7.62, 8.6].map((a, i) => ['whoosh', a, 0.3, 0.025]),
    ['tom', T.heap, 96, { gain: 0.3, decay: 0.3 }], ['boom', T.heap, 0.2], ['pluck', T.heap + 0.2, 659.25, 0.03, 0.4, 0],
    ...T.opts.map((a, i) => ['pop', a, [1174.66, 1318.51, 1567.98][i], 0.04, i - 1]),
    ...T.check.map(a => ['bell', a, 1760, 0.03, 1, 0]),
    ['glitter', T.b4 + 0.5, T.b4 + 1.0], ['pluck', 33.4, 1174.66, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [SKYB, BERRY, clamp, outK]
