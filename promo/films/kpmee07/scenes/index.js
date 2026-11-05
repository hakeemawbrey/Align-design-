// kpmee07: PLANET TALK · MERCURY to LIBRA, "Typing, Stopped, Typing" (25 s vertical, star_talk, jazzy · C). Loops.
// Pisces asked Libra to dinner. Libra has two drafts on a scale and the typing dots have bounced for 40 minutes.
//   0.00  frame 0: three giant typing dots bouncing like trampolines, Mercury mid-flip on the middle one; Libra below
//         with a wobbling scale holding two drafts. Slam "LIBRA. | Pick a *reply* already." Whip on frame 0.
//   0.80  record scratch + freeze: "typing… for *40 minutes.*"
//   2.80  Pisces on the other end, watching the dots, sobbing: "are they *mad??*"
//   6.20  Libra "both are *nice!*" → Mercury: "ok." / "heads: the *honest* one." / "tails: the *safe* one."
//  10.50  the coin flip, slow-mo · Libra's face lights up mid-air ("THERE IT IS.") · "you *hoped* for heads."
//  13.60  Mercury: "notice the *hope.*" / "that's your *answer.*"
//  16.00  the chat: "I'd love to. Saturday?" → sent → "YES omg"
//  20.50  Pisces happy-sobbing · 22.0 Libra, the scale finally still. Slam "The coin knew. | *You* knew first."
//         24.6–25 eases back into frame 0.
import { film, track, merc, sign, room, phone, burst, label, hearts, box, clamp, lerp, prog, ease, easeOutBack, GOLD, INK, BONE, RED, PINK, INTER, MONO } from '../../kpmee01/mercurykit.js'

export const DURATION = 25
const ROOM = { wall: '#3a2a5e', wall2: '#1c1438', floor: '#46366a', win: { x: 680, y: 1000, w: 300, h: 300 }, lamp: { x: 540, y: 300, k: 0.5 } }
const PROOM = { wall: '#1e2a5a', wall2: '#101634', floor: '#24305c', win: { x: 110, y: 300, w: 300, h: 340 } }
const DOT = [300, 540, 780]

function dotY(i, t) { return 840 - Math.abs(Math.sin(t * 4.2 - i * 0.9)) * 70 }
function dots(x, t, k = 1) {
  DOT.forEach((dx, i) => {
    const y = dotY(i, t), sq = 1 + 0.12 * Math.cos(t * 8.4 - i * 1.8)
    x.save(); x.translate(dx, y); x.scale(k * sq, k / sq)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#d8d0f0'; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.4)'; x.beginPath(); x.arc(-30, -34, 30, 0, Math.PI * 2); x.fill()
    x.restore()
  })
}
function scale(x, t, cx, cy, still) {
  const tilt = still ? 0 : 0.28 * Math.sin(t * 2.6)
  box(x, cx - 10, cy - 10, 20, 180, '#c9a45a', { r: 6, b: 5 })
  x.save(); x.translate(cx, cy); x.rotate(tilt)
  box(x, -260, -12, 520, 24, '#e2c27e', { r: 10, b: 5 })
  const pans = [['maybe! :)', '#7fd0f0'], ['I’d love to.', GOLD]]
  pans.forEach(([txt, col], i) => {
    const px = i ? 230 : -230
    x.save(); x.translate(px, 0); x.rotate(-tilt)
    x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 70); x.stroke()
    box(x, -120, 70, 240, 76, col, { r: 20, b: 5 })
    x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 109)
    x.restore()
  })
  x.restore()
}
const MK = [
  [-1, { x: 540, y: 470, size: 280, mood: 'happy' }],
  [2.8, { x: 540, y: 470 }],
  [6.2, { x: 780, y: 760, size: 300, mood: 'sly', rot: 0 }],
  [10.4, { x: 780, y: 760 }],
  [13.6, { x: 790, y: 760, mood: 'happy' }],
  [22.0, { x: 780, y: 740, size: 290, mood: 'proud' }],
  [24.6, { x: 540, y: 470, size: 280, mood: 'happy' }],
]
function mercFlipRot(t) { return t < 2.8 || t > 24.0 ? t * 6.3 : 0 }
const LK = [
  [0, { x: 380, y: 1400, size: 280, mood: 'wide', look: [1, -1] }],
  [6.2, { x: 380, y: 1160, mood: 'squint', look: [1, -0.4] }],
  [13.6, { mood: 'sparkle' }],
  [22.0, { x: 380, y: 1400, mood: 'happy', look: [0, 0] }],
  [24.6, { x: 380, y: 1400, mood: 'wide', look: [1, -1] }],
]
const LHOPS = [6.4, 6.8, 13.7, 22.1, 22.5, 22.9]

function shotDots(x, t, H) {
  room(x, t, ROOM)
  dots(x, t)
  const P = track(t, MK)
  const mi = t < 2.8 || t > 24 ? { ...P, y: dotY(1, t) - 190 - Math.abs(Math.sin(t * 4.2 - 0.9 + 1.4)) * 70, rot: mercFlipRot(t) } : P
  merc(x, t, mi, { talk: H.mouth(t), sweat: true })
  const L = track(t, LK)
  scale(x, t, L.x + 10, L.y - 330, t > 22)
  sign(x, 'libra', t, L, { hops: LHOPS })
  label(x, 'typing…', 540, 1010, { size: 46, font: MONO, weight: 700, col: '#9fe6b0' })
}
function shotTwo(x, t, H) {
  room(x, t, ROOM)
  const L = track(t, LK)
  scale(x, t, L.x + 10, L.y - 330, t > 13.6)
  sign(x, 'libra', t, L, { hops: LHOPS })
  merc(x, t, track(t, MK), { talk: H.mouth(t), hops: [6.9, 7.6, 8.4, 13.8, 14.6] })
}
function shotPisces(x, t, H) {
  room(x, t, PROOM)
  const happy = t > 20
  sign(x, 'pisces', t, { x: 540, y: 1150, size: 400, mood: happy ? 'sparkle' : 'wide', look: [0, 1], tears: 3 }, { hops: happy ? [20.6, 21.0, 21.4, 21.8] : [3.3, 3.9, 4.5, 5.1] })
  box(x, 700, 1200, 140, 230, '#2b2350', { r: 18, b: 6 })
  x.fillStyle = '#0f0a26'; x.fillRect(714, 1214, 112, 202)
  if (!happy) for (let i = 0; i < 3; i++) { x.fillStyle = BONE; x.beginPath(); x.arc(742 + i * 28, 1315 - 8 * Math.abs(Math.sin(t * 8 - i)), 9, 0, Math.PI * 2); x.fill() }
  else { label(x, 'YES', 770, 1315, { size: 34, col: GOLD, stroke: null }); hearts(x, t, 20.6, 540, 900, { n: 9, spread: 520 }) }
  if (!happy) label(x, '40:00', 540, 520, { size: 90, font: MONO, weight: 700, col: '#ff6b6b' })
}
function coin(x, t, cx, cy) {
  const sp = (t - 10.5) * 9
  const sy = Math.abs(Math.cos(sp))
  x.save(); x.translate(cx, cy); x.scale(1, Math.max(0.06, sy))
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#c9a45a'; x.lineWidth = 10; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.stroke()
  label(x, Math.cos(sp) > 0 ? 'H' : 'T', 0, 6, { size: 120, col: INK, stroke: null })
  x.restore()
}
function shotCoin(x, t, H) {
  room(x, t, { ...ROOM, dim: 0.35 })
  const p = prog(t, 10.5, 13.6)
  const cy = 1200 - Math.sin(p * Math.PI) * 700
  coin(x, t, 540, cy)
  const lit = t > 11.6
  sign(x, 'libra', t, { x: 300, y: 1420, size: 320, mood: lit ? 'sparkle' : 'neutral', look: [1, -1] }, { hops: [11.65] })
  merc(x, t, { x: 840, y: 1400, size: 260, mood: lit ? 'sly' : 'wide', look: [-1, -1] }, { talk: H.mouth(t) })
  if (lit) { const k = Math.min(1, (t - 11.6) / 0.2); x.save(); x.translate(330, 1130); x.rotate(-0.06); x.scale(k, k); box(x, -210, -44, 420, 88, '#ff3b3b', { r: 14 }); label(x, 'THERE IT IS.', 0, 2, { size: 50, col: BONE, stroke: null }); x.restore() }
}
const PP = { name: 'Pisces', sub: 'online', color: '#7a8cf0' }
const MSGS = [
  { at: -5, side: 'L', text: 'want to get dinner sometime?' },
  { at: 18.0, side: 'R', text: 'I’d love to. Saturday?' },
  { at: 19.6, side: 'L', text: 'YES omg' },
]
function shotChat(x, t, H) {
  room(x, t, { ...ROOM, dim: 0.55 })
  const k = ease.outCubic(prog(t, 16.0, 16.35))
  phone(x, t, { ...PP, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(0.15, 0, k), msgs: MSGS, compose: [{ t0: 16.4, text: 'I’d love to. Saturday?', cps: 20, sent: 18.0, gold: true }], dots: [[18.4, 19.6]] })
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 19.6 ? 'love' : 'happy', look: [-1, 1] }, { talk: H.mouth(t) })
}

const SPEECH = [
  { t0: 3.3, t1: 6.0, x: 540, y: 760, who: 'pisces', text: 'are they *mad??*', size: 54, shake: 3 },
  { t0: 6.4, t1: 10.2, x: 320, y: 1440, who: 'libra', text: 'both are *nice!*', size: 46, tail: 0, tailUp: true },
  ...burst(7.2, ['ok.', 'heads: the *honest* one.', 'tails: the *safe* one.'], { x: 600, y: 300, gap: 0.8, t1: 10.3 }),
  { t0: 12.2, t1: 13.5, x: 640, y: 520, who: 'mercury', text: 'you *hoped* for heads.', size: 46, cps: 46 },
  ...burst(13.8, ['notice the *hope.*', 'that’s your *answer.*'], { x: 600, y: 300, gap: 0.8, t1: 15.9 }),
]

function draw(x, t, H) {
  if (t < 2.8) shotDots(x, t, H)
  else if (t < 6.2) shotPisces(x, t, H)
  else if (t < 10.5) shotTwo(x, t, H)
  else if (t < 13.6) shotCoin(x, t, H)
  else if (t < 16.0) shotTwo(x, t, H)
  else if (t < 20.5) shotChat(x, t, H)
  else if (t < 22.0) shotPisces(x, t, H)
  else shotDots(x, t, H)
}
// the ending: back in the dots room for the slam; dots fade in again only for the seam (loopBack blends frame 0)

const F = film({
  id: 'kpmee07', duration: DURATION, draw, speech: SPEECH, ending: 'loop',
  hook: { text: 'LIBRA. | Pick a *reply* already.', top: 150, size: 108, out: [2.65, 2.8] },
  last: { at: 22.4, text: 'The coin knew. | *You* knew first.', top: 150, size: 104 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['rec', { at: 0.8, len: 1.3, caption: 'typing… for *40 minutes.*', sub: 'libra, choosing between two replies', top: 1580 }],
    ['whip', { at: 2.8, len: 0.35, from: 1.3 }],
    ['whip', { at: 10.5, len: 0.3, from: 1.25 }],
    ['whip', { at: 20.5, len: 0.3, from: 1.3 }],
  ],
  extraCues: [
    ...Array.from({ length: 6 }, (_, i) => ['tom', +(0.1 + i * 0.37).toFixed(2), 140 + (i % 3) * 30, { gain: 0.12, decay: 0.2 }]),
    ['pluck', 3.4, 659.25, 0.035, 0.5, 0.3], ['pluck', 3.6, 587.33, 0.035, 0.5, 0.3],
    ['whoosh', 10.5, 0.5, 0.05], ...Array.from({ length: 8 }, (_, i) => ['tick', +(10.6 + i * 0.33).toFixed(2), 0.04]),
    ['bell', 11.6, 1318.51, 0.05, 1.2, 0], ['glitter', 11.6, 12.4],
    ['whoosh', 18.0, 0.3, 0.05], ['pop', 18.05, 1318.51, 0.04, 0.2], ['pop', 19.6, 1567.98, 0.05, -0.2],
    ['pluck', 20.7, 783.99, 0.035, 0.5, 0.3], ['pluck', 20.9, 659.25, 0.035, 0.5, 0.3],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [clamp, easeOutBack, RED, PINK]
