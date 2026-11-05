// kpmee12: PLANET TALK · MERCURY to PISCES, "Six Sorrys" (26 s vertical, star_advice, dreamy · Eb). Hard cut.
// Pisces was five minutes late to dinner and has typed sorry six times, crying. Mercury: one sorry, then a thank-you.
//   0.00  frame 0: a giant phone screen spotted with tear drops, "sorry sorry sorry…" in the compose bar, Mercury
//         skidding across the glass, smearing the letters. Slam "PISCES. | You said *sorry* six times." Whip on frame 0.
//   0.90  record scratch + freeze: "five minutes late. *six sorrys.*"
//   2.60  outside the café, 7:05: Pisces sobbing at the phone: "they must *hate* me"
//   6.50  the chat: "here! got us a table :)" → six sorrys fire off · counter SORRY ×6
//  10.50  Pisces "what if one isn't *enough?*" → Mercury: "one is *enough.*" / "then say *thanks.*" / "they *waited* for you."
//  14.50  the chat: "Sorry I was late. Thank you for waiting for me." → "you're worth waiting for"
//  19.50  Pisces happy-sobbing; Mercury zooms in with a tissue at speed. "I'm *happy* crying" · slam "One sorry. |
//         Then a *thank you.*" 24.3, hard cut at 26.
import { film, track, merc, sign, room, phone, burst, label, hearts, box, tissue, clamp, lerp, prog, ease, easeOutBack, GOLD, INK, BONE, RED, PINK, INTER, MONO } from '../../kpmee01/mercurykit.js'

export const DURATION = 26
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }
const STREET = { wall: '#2a2050', wall2: '#141030', floor: '#3a3050', win: { x: 600, y: 420, w: 380, h: 420 }, lamp: { x: 790, y: 640, k: 1 } }

function tearDrops(x, t, k = 1) {
  for (let i = 0; i < 16; i++) {
    const cx = 160 + fr(i) * 760, cy = 520 + fr(i, 2) * 900 + ((t * 40 * fr(i, 3)) % 80), r = 22 + fr(i, 4) * 30
    x.save(); x.globalAlpha = 0.55 * k
    x.fillStyle = '#9fd8ff'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.arc(cx - r * 0.3, cy - r * 0.3, r * 0.25, 0, Math.PI * 2); x.fill()
    x.restore()
  }
}
const MK0 = [
  [-1, { x: 1200, y: 980, size: 300, mood: 'wide', rot: 0.3 }],
  [1.2, { x: 420, y: 980, rot: -0.2 }, 'out'],
  [2.6, { x: 360, y: 960, rot: 0 }],
]
function shotScreen(x, t, H) {
  room(x, t, { ...STREET, dim: 0.6 })
  phone(x, t, { x: 540, y: 1000, s: 1.55, name: 'Ash', sub: 'online', color: '#f2c75c', msgs: [{ at: -5, side: 'L', text: 'here! :)' }], compose: [{ t0: -5, text: 'sorry sorry sorry sorry sorry sorry', cps: 0 }] })
  tearDrops(x, t)
  const P = track(t, MK0)
  // smear streak behind Mercury
  x.save(); x.globalAlpha = 0.4; x.fillStyle = '#9fd8ff'; x.fillRect(P.x, P.y + 120, 1200 - P.x, 40); x.restore()
  merc(x, t, P, { talk: H.mouth(t), sweat: true })
}
const PK = [
  [2.6, { x: 420, y: 1140, size: 360, mood: 'wide', look: [0.5, 1], tears: 3 }],
  [10.5, { x: 330, y: 1160, size: 310, mood: 'wide', look: [1, -0.4], tears: 2 }],
  [12.0, { mood: 'neutral', tears: 1 }],
  [19.5, { x: 420, y: 1150, size: 380, mood: 'sparkle', look: [0, 0], tears: 3 }],
]
const MK = [
  [2.6, { x: 820, y: 640, size: 280, mood: 'wide' }],
  [10.5, { x: 780, y: 760, size: 310, mood: 'neutral' }],
  [11.8, { mood: 'happy' }],
  [19.5, { x: 1250, y: 700, size: 280, mood: 'happy' }],
  [20.2, { x: 760, y: 720, mood: 'love' }, 'snap'],
  [24.0, { x: 780, y: 720, mood: 'proud' }],
]
function cafeFront(x, t) {
  room(x, t, STREET)
  box(x, 780, 1080, 200, 56, '#c84a6a', { r: 10 })
  label(x, 'CAFÉ', 880, 1108, { size: 36, col: BONE, stroke: null })
  box(x, 60, 360, 220, 120, '#0f0a26', { r: 16, b: 6 })
  label(x, '7:05', 170, 420, { size: 64, font: MONO, weight: 700, col: '#ff6b6b', stroke: null })
}
function shotCafe(x, t, H) {
  cafeFront(x, t)
  const P = track(t, PK)
  sign(x, 'pisces', t, P, { hops: [3.0, 3.5, 4.0, 4.5, 10.7, 19.6, 20.0, 20.4, 20.8, 21.2, 22.4, 24.4] })
  if (t < 10.5) box(x, P.x + 150, P.y - 30, 80, 130, '#2b2350', { r: 12, b: 5 })
  const M = track(t, MK)
  merc(x, t, M, { talk: H.mouth(t), hops: [11.8, 12.6, 13.4, 24.0] })
  if (t > 20.0) { const tk = easeOutBack(prog(t, 20.0, 20.3), 2); tissue(x, M.x - 170, M.y + 80, tk) }
  if (t > 19.6) hearts(x, t, 19.8, 420, 900, { n: 9 })
}
const AP = { name: 'Ash', sub: 'online', color: '#f2c75c' }
const SORRYS = ['sorry', 'sorry!!', 'SO sorry', 'sorry sorry', 'I’m the worst, sorry', 'sorry']
const MSGS = [
  { at: -5, side: 'L', text: 'here! got us a table :)' },
  ...SORRYS.map((s, i) => ({ at: +(6.9 + i * 0.32).toFixed(2), side: 'R', text: s, out: 14.5 })),
  { at: 17.3, side: 'R', text: 'Sorry I was late. Thank you for waiting for me.' },
  { at: 18.8, side: 'L', text: 'you’re worth waiting for' },
]
function shotChat(x, t, H, t0) {
  cafeFront(x, t)
  x.fillStyle = 'rgba(5,3,14,0.55)'; x.fillRect(0, 0, 1080, 1920)
  const k = ease.outCubic(prog(t, t0, t0 + 0.35))
  phone(x, t, { ...AP, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(0.15, 0, k), msgs: MSGS, compose: [{ t0: 14.9, text: 'Sorry I was late. Thank you for waiting for me.', cps: 24, sent: 17.3, gold: true }], dots: [[17.7, 18.8]] })
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 18.8 ? 'love' : t > 14 ? 'happy' : 'wide', look: [-1, 1] }, { talk: H.mouth(t), sweat: t < 10.5 })
  if (t > 7.0 && t < 10.5) {
    const n = Math.min(6, Math.floor((t - 6.9) / 0.32) + 1)
    const s = 1 + 0.15 * Math.max(0, 1 - ((t - 6.9) % 0.32) / 0.2)
    x.save(); x.translate(540, 1640); x.rotate(-0.05); x.scale(s, s); box(x, -230, -50, 460, 100, '#ff3b3b', { r: 14 }); label(x, `SORRY ×${n}`, 0, 2, { size: 62, col: BONE, stroke: null }); x.restore()
  }
}

const SPEECH = [
  { t0: 3.1, t1: 6.2, x: 420, y: 820, who: 'pisces', text: 'they must *hate* me', size: 50, shake: 2, tail: 0 },
  { t0: 10.7, t1: 14.2, x: 330, y: 860, who: 'pisces', text: 'what if one isn’t *enough?*', size: 42, tail: -30, maxW: 560 },
  ...burst(11.8, ['one is *enough.*', 'then say *thanks.*', 'they *waited* for you.'], { x: 580, y: 300, gap: 0.8, t1: 14.3 }),
  { t0: 20.6, t1: 23.6, x: 400, y: 820, who: 'pisces', text: 'I’m *happy* crying', size: 50, tail: 0 },
]

function draw(x, t, H) {
  if (t < 2.6) shotScreen(x, t, H)
  else if (t < 6.5) shotCafe(x, t, H)
  else if (t < 10.5) shotChat(x, t, H, 6.5)
  else if (t < 14.5) shotCafe(x, t, H)
  else if (t < 19.5) shotChat(x, t, H, 14.5)
  else shotCafe(x, t, H)
}

const F = film({
  id: 'kpmee12', duration: DURATION, draw, speech: SPEECH,
  hook: { text: 'PISCES. | You said *sorry* six times.', top: 180, size: 104, out: [2.45, 2.6] },
  last: { at: 24.3, text: 'One sorry. | Then a *thank you.*', top: 200, size: 108 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['rec', { at: 0.9, len: 1.3, caption: 'five minutes late. *six sorrys.*', sub: 'pisces, running to dinner', top: 1580 }],
    ['whip', { at: 2.6, len: 0.35, from: 1.3 }],
    ['whip', { at: 6.5, len: 0.3, from: 1.25 }],
    ['shake', { at: 8.5, len: 0.4, amp: 16 }],
    ['whip', { at: 19.5, len: 0.3, from: 1.3 }],
  ],
  extraCues: [
    ['whoosh', 0.0, 1.2, 0.06], ['tapeStop', 2.5, 0.4],
    ['pluck', 3.2, 659.25, 0.035, 0.5, 0.3], ['pluck', 3.4, 587.33, 0.035, 0.5, 0.3],
    ...SORRYS.map((_, i) => ['pop', +(6.9 + i * 0.32).toFixed(2), 1318.51 + i * 60, 0.04, 0.2]),
    ['whoosh', 17.3, 0.3, 0.05], ['pop', 17.35, 1318.51, 0.04, 0.2], ['pop', 18.8, 1567.98, 0.05, -0.2], ['glitter', 18.8, 19.6],
    ['whoosh', 19.6, 0.5, 0.07], ['pop', 20.2, 1046.5, 0.05, 0],
    ['pluck', 20.7, 783.99, 0.035, 0.5, 0.3], ['pluck', 20.9, 659.25, 0.035, 0.5, 0.3],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [clamp, GOLD, RED, PINK, INTER]
