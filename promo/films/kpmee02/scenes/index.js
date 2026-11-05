// kpmee02: PLANET TALK · MERCURY to TAURUS, "The Three-Day Reply" (26 s vertical, star_advice, lofi · F). Loops.
// Taurus has spent three days perfecting a reply to one sweet text. Mercury: slow is fine, silent isn't.
//   0.00  frame 0: the sofa at night. Mercury stuck mid-sprint inside a giant spinning loading spiral above Taurus, a
//         DAY 3 calendar on the wall. Slam "TAURUS. | It's been *three days.*" Whip zoom on frame 0.
//   0.80  record scratch + freeze: "day 3 of *the perfect reply.*"
//   2.60  the spiral shatters, Mercury zooms down: "three days?!" / "my whole *year* is 88 days." / "you spent *three* on one text."
//   7.40  phone: Pisces's sweet message, the draft retyped again and again, loading bar "perfecting reply…" 99 % → error
//  11.10  two-shot: Taurus "it has to be *perfect.*" → Mercury: "take your *time.*" / "but say *something.*" / "a little now, *more* later."
//  16.00  phone: "loved this. proper reply tonight" → sent → "you're so sweet" / "ok I'm crying"
//  20.70  cut to Pisces in its room, sobbing happy tears at the phone: "they *replied!!*"
//  22.60  the sofa: Taurus relaxed. Slam "Slow is *fine.* | Silent isn't." 25.6–26 eases back into frame 0.
import { film, track, merc, sign, room, sofa, phone, burst, label, hearts, box, clamp, lerp, prog, ease, easeOutBack, GOLD, INK, BONE, RED, INTER, MONO } from '../../kpmee01/mercurykit.js'

export const DURATION = 26
const ROOM = { wall: '#2c2450', wall2: '#181232', floor: '#3c2c58', win: { x: 640, y: 330, w: 320, h: 360 }, lamp: { x: 180, y: 900, k: 0.8 } }
const SPIN = { x: 540, y: 640 }

const MK = [
  [0, { x: SPIN.x, y: SPIN.y, size: 300, mood: 'wide', rot: 0 }],
  [2.6, { x: SPIN.x, y: SPIN.y, size: 300, mood: 'wide' }],
  [3.0, { x: 760, y: 820, size: 320, mood: 'angry' }, 'snap'],
  [3.4, { mood: 'wide' }],
  [11.1, { x: 770, y: 760, size: 310, mood: 'neutral' }],
  [12.3, { mood: 'happy' }],
  [22.6, { x: 760, y: 720, size: 300, mood: 'happy' }],
  [23.3, { mood: 'proud' }],
]
const TK = [
  [0, { x: 330, y: 1150, size: 290, mood: 'squint', look: [0.4, 1] }],
  [3.0, { mood: 'wide', look: [1, -0.5] }],
  [11.1, { mood: 'squint', look: [1, -0.2] }],
  [12.3, { mood: 'neutral', look: [1, -0.4] }],
  [22.6, { mood: 'happy', look: [0, 0] }],
]
const THOPS = [3.05, 11.3, 11.7, 22.7, 23.1]

const PH = { name: 'Pisces', sub: 'last seen 3 days ago', color: '#7a8cf0' }
const DRAFT = [
  { t0: -5, text: 'Wow, I am so deeply touched by this, truly, I', cps: 0, clear: 8.0 },
  { t0: 8.2, text: 'Thank you. This means so much. In fact I', cps: 26, clear: 9.6 },
  { t0: 9.8, text: 'Dear Pisces, where do I even beg', cps: 28, clear: 11.0 },
  { t0: 16.3, text: 'loved this. proper reply tonight', cps: 22, sent: 18.1, gold: true },
]
const MSGS = [
  { at: -5, side: 'L', text: 'drew you a tiny card for your birthday' },
  { at: -5, side: 'L', text: 'no pressure to reply!' },
  { at: 18.1, side: 'R', text: 'loved this. proper reply tonight' },
  { at: 19.8, side: 'L', text: 'you’re so sweet' },
  { at: 20.35, side: 'L', text: 'ok I’m crying' },
]
const DOTS = [[18.5, 19.8]]

const SPEECH = [
  ...burst(3.4, ['three days?!', 'my whole *year* is 88 days.', 'you spent *three* on one text.'], { x: 540, y: 300, gap: 0.75, t1: 7.2 }),
  { t0: 11.3, t1: 14.6, x: 330, y: 860, who: 'taurus', text: 'it has to be *perfect.*', size: 44, tail: -40 },
  ...burst(12.4, ['take your *time.*', 'but say *something.*', 'a little now, *more* later.'], { x: 560, y: 300, gap: 0.8, t1: 15.8 }),
  { t0: 21.0, t1: 22.5, x: 540, y: 560, who: 'pisces', text: 'they *replied!!*', size: 52 },
]

function calendar(x, t, cx, cy) {
  box(x, cx - 90, cy - 100, 180, 200, BONE, { r: 10 })
  x.fillStyle = RED; x.fillRect(cx - 90, cy - 100, 180, 50)
  label(x, 'DAY', cx, cy - 75, { size: 30, col: BONE, stroke: null })
  label(x, '3', cx, cy + 30, { size: 110, col: INK, stroke: null })
  x.strokeStyle = RED; x.lineWidth = 6
  for (let k = 0; k < 2; k++) { x.beginPath(); x.moveTo(cx - 70 + k * 30, cy + 70); x.lineTo(cx - 50 + k * 30, cy + 90); x.moveTo(cx - 50 + k * 30, cy + 70); x.lineTo(cx - 70 + k * 30, cy + 90); x.stroke() }
}
function spiral(x, t, k) {
  if (k <= 0) return
  x.save(); x.translate(SPIN.x, SPIN.y)
  const n = 14
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + t * 5
    const sh = (1 - k) * 700
    const r = 250 + sh * (0.5 + (i % 3) * 0.3)
    x.globalAlpha = (0.25 + 0.75 * (i / n)) * k
    x.fillStyle = INK; x.beginPath(); x.arc(Math.cos(a) * r, Math.sin(a) * r, 36, 0, Math.PI * 2); x.fill()
    x.fillStyle = i > n - 4 ? GOLD : BONE; x.beginPath(); x.arc(Math.cos(a) * r, Math.sin(a) * r, 28, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}

function sofaShot(x, t, H) {
  room(x, t, ROOM)
  calendar(x, t, 170, 760)
  sofa(x, 470, 1430, 700, '#6a4aa8')
  const T = track(t, TK)
  sign(x, 'taurus', t, T, { hops: THOPS, shadow: false })
  // Taurus's phone in hand
  if (t < 3) { box(x, 420, 1100, 70, 120, '#2b2350', { r: 12, b: 5 }); x.fillStyle = '#7a8cf0'; x.fillRect(430, 1112, 50, 90) }
  spiral(x, t, t < 2.6 ? 1 : 1 - prog(t, 2.6, 3.0))
  const P = track(t, MK)
  if (t < 2.6) P.rot = t * 7
  merc(x, t, P, { talk: H.mouth(t), sweat: t < 7, hops: [3.4, 4.15, 4.9, 12.4, 13.2, 14.0, 23.3] })
  if (t < 2.6) { label(x, 'loading…', SPIN.x, SPIN.y + 330, { size: 40, font: MONO, weight: 700, col: GOLD }) }
}
function phoneShot(x, t, H) {
  room(x, t, { ...ROOM, dim: 0.55 })
  const t0 = t < 16 ? 7.4 : 16.0
  const k = ease.outCubic(prog(t, t0, t0 + 0.35))
  phone(x, t, { ...PH, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(-0.15, 0, k), msgs: MSGS, compose: DRAFT, dots: DOTS, receipt: t > 18.1 && t < 19.8 ? { at: 18.1, text: 'Delivered' } : null })
  merc(x, t, { x: 910, y: 470, size: 200, mood: t > 19.8 ? 'love' : t > 16 ? 'happy' : 'wide', look: [-1, 1] }, { talk: H.mouth(t), sweat: t < 11 })
}
function piscesShot(x, t) {
  room(x, t, { wall: '#1e2a5a', wall2: '#101634', floor: '#24305c', win: { x: 110, y: 300, w: 300, h: 340 } })
  sign(x, 'pisces', t, { x: 540, y: 1050, size: 420, mood: 'sparkle', look: [0, 0.6], tears: 3 }, { hops: [20.8, 21.2, 21.6, 22.0] })
  box(x, 760, 1120, 110, 190, '#2b2350', { r: 16, b: 6 }); x.fillStyle = '#9fb4ff'; x.fillRect(772, 1134, 86, 150)
  hearts(x, t, 20.9, 540, 800, { n: 8, spread: 500 })
}

function draw(x, t, H) {
  if (t < 7.4) sofaShot(x, t, H)
  else if (t < 11.1) phoneShot(x, t, H)
  else if (t < 16.0) sofaShot(x, t, H)
  else if (t < 20.7) phoneShot(x, t, H)
  else if (t < 22.6) piscesShot(x, t, H)
  else sofaShot(x, t, H)
}

const F = film({
  id: 'kpmee02', duration: DURATION, draw, speech: SPEECH, ending: 'loop',
  hook: { text: 'TAURUS. | It’s been *three days.*', top: 200, size: 104, out: [2.45, 2.6] },
  last: { at: 23.3, text: 'Slow is *fine.* | Silent isn’t.', top: 240, size: 104 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['rec', { at: 0.8, len: 1.4, caption: 'day 3 of *the perfect reply.*', sub: 'taurus, replying to one sweet text' }],
    ['shake', { at: 2.62, len: 0.4, amp: 22 }],
    ['whip', { at: 7.4, len: 0.35, from: 1.3 }],
    ['load', { at: 8.3, len: 2.6, label: 'perfecting reply…', error: 'Error: too perfect to send', y: 520 }],
    ['whip', { at: 20.7, len: 0.35, from: 1.35 }],
  ],
  extraCues: [
    ['tick', 0.1, 0.05], ['tick', 0.4, 0.05],
    ['crash', 2.62, { gain: 0.06, len: 1.4 }], ['whoosh', 2.7, 0.4, 0.06],
    ['whoosh', 18.1, 0.3, 0.05], ['pop', 18.15, 1318.51, 0.04, 0.2],
    ['pop', 19.8, 1567.98, 0.05, -0.2], ['pop', 20.35, 1760, 0.05, -0.2],
    ['pluck', 21.0, 659.25, 0.035, 0.5, 0.3], ['pluck', 21.2, 587.33, 0.035, 0.5, 0.3], ['glitter', 20.8, 22.0],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [clamp, easeOutBack, INTER]
