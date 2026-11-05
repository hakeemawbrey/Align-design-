// kpmee11: PLANET TALK · MERCURY to AQUARIUS, "Facts, Not Feelings" (24 s vertical, star_talk, chiptune · F#m). Loops.
// The crush asks "so do you like me?" and Aquarius answers with an octopus fact. Mercury: cute, now one feeling.
//   0.00  frame 0: a rooftop at night; Mercury glitching out of a satellite dish in sparks and pixels; Aquarius on the
//         bench mid-type, Pisces beside it with a cushion. Slam "AQUARIUS. | That's a fact. Not an *answer.*"
//   0.90  record scratch + freeze: "they asked *'do you like me?'*"
//   2.60  the chat: "so do you like me?" → "octopuses have three hearts" · stamp "THAT'S A FACT." → "…ok?"
//   7.00  Aquarius "facts are *safe.*" → Mercury: "cute fact." / "true, too." / "now *one* feeling."
//  11.50  the chat: "Three hearts and I'd still pick you. Yes, I like you." → "I like you too. (and octopuses)"
//  17.00  Pisces sobbing into the cushion  19.5 the rooftop. Slam "Facts are cute. | *Feelings* are the reply."
//         23.6–24 eases back into frame 0.
import { film, track, merc, sign, phone, burst, label, hearts, box, clamp, lerp, prog, ease, easeOutBack, GOLD, INK, BONE, RED, PINK, INTER, MONO } from '../../kpmee01/mercurykit.js'
import { drawSpace } from '../../planetkit.js'

export const DURATION = 24
const AQ = '#7fd0f0'
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

function roof(x, t, dim = 0) {
  drawSpace(x, t, { planet: 'uranus', seed: 4 })
  // city skyline
  x.fillStyle = '#120c2a'
  for (let i = 0; i < 9; i++) { const w = 120 + fr(i) * 80, h = 200 + fr(i, 2) * 300; x.fillRect(i * 125 - 20, 1250 - h, w, h + 10) }
  x.fillStyle = '#ffd98a'
  for (let i = 0; i < 40; i++) if (Math.sin(t * 0.7 + i) > -0.6) x.fillRect(fr(i, 4) * 1060, 1000 + fr(i, 5) * 230, 10, 14)
  // roof floor
  x.fillStyle = INK; x.fillRect(0, 1250, 1080, 12)
  const g = x.createLinearGradient(0, 1260, 0, 1920); g.addColorStop(0, '#3a3456'); g.addColorStop(1, '#1a1430'); x.fillStyle = g; x.fillRect(0, 1260, 1080, 660)
  // the dish
  x.save(); x.translate(830, 760); x.rotate(-0.5)
  box(x, -10, 60, 20, 200, '#8a8aa8', { r: 6, b: 5 })
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 170, 120, 0, 0, Math.PI); x.fill()
  x.fillStyle = '#c8c8e0'; x.beginPath(); x.ellipse(0, 0, 160, 110, 0, 0, Math.PI); x.fill()
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -120); x.stroke(); x.fillStyle = RED; x.beginPath(); x.arc(0, -126, 14, 0, Math.PI * 2); x.fill()
  x.restore()
  box(x, 790, 1010, 80, 250, '#5a5a78', { r: 8 })
  // bench
  box(x, 120, 1300, 760, 60, '#7a5a8a', { r: 16 }); box(x, 160, 1360, 30, 130, '#4a3a5a', { r: 6 }); box(x, 810, 1360, 30, 130, '#4a3a5a', { r: 6 })
  if (dim) { x.fillStyle = `rgba(5,3,14,${dim})`; x.fillRect(0, 0, 1080, 1920) }
}
function sparks(x, t, cx, cy, k) {
  if (k <= 0) return
  for (let i = 0; i < 16; i++) {
    const ph = (t * 2 + fr(i)) % 1, a = fr(i, 3) * Math.PI * 2
    x.globalAlpha = k * (1 - ph); x.fillStyle = i % 2 ? GOLD : AQ
    x.fillRect(cx + Math.cos(a) * ph * 260, cy + Math.sin(a) * ph * 260, 14, 14)
  }
  x.globalAlpha = 1
}
function glitchMerc(x, t, H, P, k) {
  if (k > 0) {
    // pixel slices offset while it materialises
    for (let s = 0; s < 3; s++) { x.save(); x.globalAlpha = 0.35 * k; x.translate((fr(Math.floor(t * 20) + s) - 0.5) * 80 * k, 0); merc(x, t, P, { glow: 0, talk: 0 }); x.restore() }
  }
  merc(x, t, { ...P, alpha: 1 - 0.4 * k * (Math.floor(t * 18) % 2) }, { talk: H.mouth(t), sweat: k > 0 })
}
const MK = [
  [-1, { x: 760, y: 600, size: 300, mood: 'wide' }],
  [2.6, { x: 760, y: 600 }],
  [7.0, { x: 760, y: 640, size: 300, mood: 'sly' }],
  [8.2, { mood: 'happy' }],
  [19.5, { x: 760, y: 620, size: 300, mood: 'happy' }],
  [21.5, { mood: 'proud' }],
  [23.4, { x: 760, y: 600, mood: 'wide' }],
]
const AK = [
  [0, { x: 330, y: 1170, size: 290, mood: 'squint', look: [0.5, 1] }],
  [7.0, { mood: 'neutral', look: [1, -0.5] }],
  [9.0, { mood: 'wide' }],
  [19.5, { mood: 'happy', look: [0, 0] }],
  [23.4, { mood: 'squint', look: [0.5, 1] }],
]
const PK = [
  [0, { x: 680, y: 1210, size: 210, mood: 'wide', look: [-1, 0], tears: 1 }],
  [19.5, { mood: 'sparkle', tears: 3 }],
  [23.4, { mood: 'wide', tears: 1 }],
]
function cushion(x, cx, cy) { box(x, cx - 80, cy - 60, 160, 120, '#f2a0c8', { r: 30, b: 6 }) }
function shotRoof(x, t, H) {
  roof(x, t)
  const A = track(t, AK)
  sign(x, 'aquarius', t, A, { hops: [7.2, 7.6, 19.6, 20.0, 20.4] })
  box(x, A.x + 110, A.y - 40, 70, 120, '#2b2350', { r: 12, b: 5 })
  sign(x, 'pisces', t, track(t, PK), { hops: [19.7, 20.1, 20.5, 20.9] })
  cushion(x, 830, 1290)
  const gk = t < 1.0 ? 1 - t : t > 23.0 ? (t - 23.0) : 0
  sparks(x, t, 820, 700, t < 1.4 ? 1 - t / 1.4 : t > 23.0 ? 1 : 0)
  glitchMerc(x, t, H, track(t, MK), clamp(gk))
  if (t > 19.6) hearts(x, t, 19.7, 500, 950, { n: 8, col: AQ })
}
const CP = { name: 'Jo', sub: 'online', color: '#f39a3a' }
const MSGS = [
  { at: -5, side: 'L', text: 'so do you like me?' },
  { at: 3.2, side: 'R', text: 'octopuses have three hearts' },
  { at: 6.0, side: 'L', text: '…ok?' },
  { at: 14.4, side: 'R', text: 'Three hearts and I’d still pick you. Yes, I like you.' },
  { at: 16.0, side: 'L', text: 'I like you too. (and octopuses)' },
]
const COMPOSE = [
  { t0: -5, text: 'octopuses have three hearts', cps: 0, sent: 3.2 },
  { t0: 11.9, text: 'Three hearts and I’d still pick you. Yes, I like you.', cps: 26, sent: 14.4, gold: true },
]
function shotChat(x, t, H, t0) {
  roof(x, t, 0.55)
  const k = ease.outCubic(prog(t, t0, t0 + 0.35))
  phone(x, t, { ...CP, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(0.15, 0, k), msgs: MSGS, compose: COMPOSE, dots: [[5.0, 6.0], [14.8, 16.0]] })
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 16 ? 'love' : t > 11 ? 'happy' : 'sly', look: [-1, 1] }, { talk: H.mouth(t) })
  if (t > 4.2 && t < 7.0) { const s = easeOutBack(prog(t, 4.2, 4.5), 2.4); x.save(); x.translate(540, 1640); x.rotate(-0.05); x.scale(s, s); box(x, -270, -50, 540, 100, '#ff3b3b', { r: 14 }); label(x, 'THAT’S A FACT.', 0, 2, { size: 58, col: BONE, stroke: null }); x.restore() }
}
function shotPisces(x, t) {
  roof(x, t, 0.2)
  x.save(); x.translate(540, 1000); x.scale(1.6, 1.6); x.translate(-680, -1210)
  sign(x, 'pisces', t, { x: 680, y: 1210, size: 210, mood: 'sparkle', look: [0, 0.5], tears: 3 }, { hops: [17.2, 17.6, 18.0, 18.4, 18.8] })
  cushion(x, 800, 1280)
  x.restore()
  hearts(x, t, 17.1, 540, 700, { n: 9, spread: 520 })
}

const SPEECH = [
  { t0: 7.2, t1: 10.9, x: 330, y: 880, who: 'aquarius', text: 'facts are *safe.*', size: 46, tail: 0 },
  ...burst(8.2, ['cute fact.', 'true, too.', 'now *one* feeling.'], { x: 520, y: 300, gap: 0.8, t1: 11.2 }),
  { t0: 17.3, t1: 19.2, x: 540, y: 560, who: 'pisces', text: 'I’m not crying, *you’re* crying', size: 46, maxW: 700 },
]

function draw(x, t, H) {
  if (t < 2.6) shotRoof(x, t, H)
  else if (t < 7.0) shotChat(x, t, H, 2.6)
  else if (t < 11.5) shotRoof(x, t, H)
  else if (t < 17.0) shotChat(x, t, H, 11.5)
  else if (t < 19.5) shotPisces(x, t)
  else shotRoof(x, t, H)
}

const F = film({
  id: 'kpmee11', duration: DURATION, draw, speech: SPEECH, ending: 'loop',
  hook: { text: 'AQUARIUS. | That’s a fact. Not an *answer.*', top: 180, size: 96, out: [2.45, 2.6] },
  last: { at: 21.5, text: 'Facts are cute. | *Feelings* are the reply.', top: 180, size: 96 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['glitch', { at: -0.1, len: 0.7, dialog: false }],
    ['rec', { at: 0.9, len: 1.3, caption: 'they asked *‘do you like me?’*', sub: 'aquarius, deflecting', top: 1580 }],
    ['whip', { at: 2.6, len: 0.35, from: 1.3 }],
    ['whip', { at: 17.0, len: 0.3, from: 1.3 }],
  ],
  extraCues: [
    ['whoosh', 3.2, 0.3, 0.05], ['pop', 3.25, 1318.51, 0.04, 0.2], ['tom', 4.2, 80, { gain: 0.25, decay: 0.3 }], ['pop', 6.0, 880, 0.04, -0.2],
    ['whoosh', 14.4, 0.3, 0.05], ['pop', 14.45, 1318.51, 0.04, 0.2], ['pop', 16.0, 1567.98, 0.05, -0.2], ['glitter', 16.0, 16.8],
    ['pluck', 17.3, 659.25, 0.035, 0.5, 0.3], ['pluck', 17.5, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [PINK, GOLD, INTER, MONO]
