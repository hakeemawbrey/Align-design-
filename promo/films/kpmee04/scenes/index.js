// kpmee04: PLANET TALK · MERCURY to CANCER, "The Paragraph You Didn't Send" (28 s vertical, star_advice, dreamy · Bb). Loops.
// Cancer's "quick check-in" to a friend who went quiet has chapters. Mercury edits it down to one true sentence.
//   0.00  frame 0: the kitchen. A draft text unrolls off Cancer's phone as a paper scroll across the floor, Mercury
//         surfing in on it at speed. Slam "CANCER. | This text has *chapters.*" Whip on frame 0.
//   0.80  record scratch + freeze: "a quick check-in. *900 words.*"
//   2.80  the scroll close-up flying by (CHAPTER 4: remember the picnic, FOOTNOTE 12…), Mercury speed-reads, steaming:
//         "page *nine?*" / "is that a *footnote?*"
//   7.00  two-shot: Cancer "I just want them to know I *care.*" · Pisces reading over its shoulder: "it's *beautiful*" (sobbing)
//  11.00  Mercury: "it IS beautiful." / "lead with the *feeling.*" / "keep *one* ask."
//  15.40  phone: red-pen strike, the rewrite "I missed you this week. Can we talk Sunday?" → sent → "missed you too.
//         Sunday." / "sorry I went quiet. hard week."
//  22.40  kitchen: the scroll zips back into the phone, Cancer hops, Pisces happy-sobs. Slam "Keep the feeling. |
//         Cut the *footnotes.*" 27.6–28 eases back into frame 0.
import { film, track, merc, sign, room, phone, burst, label, hearts, smoke, box, clamp, lerp, prog, ease, GOLD, INK, BONE, RED, INTER, MONO } from '../../kpmee01/mercurykit.js'

export const DURATION = 28
const KITCHEN = { wall: '#2e3a5a', wall2: '#172036', floor: '#3a3a5e', win: { x: 640, y: 320, w: 330, h: 330 }, lamp: { x: 300, y: 600, k: 0.7 } }
const PAPER = '#f4e8cc', PAPER_D = '#d9c7a0'

const LINES = ['Hi!! so I’ve been thinking', 'about everything since', 'CHAPTER 2: the vibe lately', 'and I know you’re busy but', 'CHAPTER 4: remember the picnic', 'which reminds me (see below)', 'FOOTNOTE 12: I still have', 'your umbrella btw', 'CHAPTER 7: no pressure!!', 'but also like, a little', 'pressure, lovingly', 'P.S. and P.P.S. and', 'APPENDIX: photos']

function unroll(t) { return t > 22.4 ? lerp(1500, 0, ease.inCubic(prog(t, 22.5, 23.1))) : Math.min(1500, 260 + 330 * (t + 0.6)) }
const MK = [
  [7.0, { x: 770, y: 760, size: 310, mood: 'neutral' }],
  [8.0, { mood: 'sad' }],
  [11.0, { mood: 'happy' }],
  [22.4, { x: 780, y: 720, size: 300, mood: 'happy' }],
  [24.7, { mood: 'proud' }],
]
const CK = [
  [0, { x: 300, y: 1000, size: 290, mood: 'wide', look: [1, 0.8] }],
  [7.0, { x: 300, y: 1040, mood: 'sparkle', look: [1, -0.3] }],
  [11.0, { mood: 'neutral' }],
  [22.4, { mood: 'happy', look: [0, 0] }],
]
const CHOPS = [7.2, 7.6, 8.0, 22.5, 22.9, 23.3, 23.7]

const PH = { name: 'Dani', sub: 'last seen 6 days ago', color: '#9fe6b0' }
const MSGS = [
  { at: -5, side: 'R', text: 'hey! you ok?' },
  { at: 19.3, side: 'R', text: 'I missed you this week. Can we talk Sunday?' },
  { at: 21.0, side: 'L', text: 'missed you too. Sunday.' },
  { at: 21.75, side: 'L', text: 'sorry I went quiet. hard week.' },
]
const COMPOSE = [
  { t0: -5, text: 'Hi!! so I’ve been thinking about everything since the', cps: 0, strike: 15.9, clear: 16.8 },
  { t0: 17.0, text: 'I missed you this week. Can we talk Sunday?', cps: 24, sent: 19.3, gold: true },
]
const DOTS = [[19.7, 21.0]]

const SPEECH = [
  ...burst(3.4, ['page *nine?*', 'is that a *footnote?*'], { x: 470, y: 330, gap: 0.9, t1: 6.8, size: 46 }),
  { t0: 7.3, t1: 10.8, x: 330, y: 760, who: 'cancer', text: 'I just want them to know I *care.*', size: 42, tail: -40, maxW: 560 },
  { t0: 8.6, t1: 10.8, x: 780, y: 1040, who: 'pisces', text: 'it’s *beautiful*', size: 44, tail: 100 },
  ...burst(11.2, ['it IS beautiful.', 'lead with the *feeling.*', 'keep *one* ask.'], { x: 560, y: 300, gap: 0.9, t1: 15.2 }),
]

function kitchen(x, t) {
  room(x, t, KITCHEN)
  // counter + cabinets
  box(x, -20, 1180, 560, 240, '#5a4a78', { r: 10 })
  box(x, -20, 1150, 580, 40, '#c9b8e8', { r: 8 })
  for (let i = 0; i < 3; i++) box(x, 20 + i * 175, 1220, 150, 170, '#4a3c68', { r: 10, b: 4 })
  box(x, 30, 560, 420, 200, '#4a3c68', { r: 12 })
}
function scroll(x, t, L) {
  if (L <= 0) return
  // from the phone on the counter down to the floor and along it
  x.save()
  x.fillStyle = INK; x.fillRect(240, 1150, 150, 420); x.fillRect(240, 1500, L + 20, 140)
  x.fillStyle = PAPER; x.fillRect(250, 1160, 130, 400); x.fillRect(250, 1510, L, 120)
  x.fillStyle = PAPER_D
  for (let i = 0; i < 6; i++) x.fillRect(266, 1190 + i * 56, 98, 12)
  for (let j = 0; j < L / 90; j++) { x.fillRect(270 + j * 90, 1540, 60, 10); x.fillRect(270 + j * 90, 1580, 40, 10) }
  // the roll at the end
  x.fillStyle = INK; x.beginPath(); x.arc(250 + L, 1570, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = PAPER; x.beginPath(); x.arc(250 + L, 1570, 62, 0, Math.PI * 2); x.fill()
  x.strokeStyle = PAPER_D; x.lineWidth = 6; x.beginPath(); x.arc(250 + L, 1570, 34, t * 9, t * 9 + 4.5); x.stroke()
  x.restore()
  box(x, 260, 1080, 110, 80, '#2b2350', { r: 12, b: 5 })
}
function shotKitchen(x, t, H) {
  kitchen(x, t)
  const L = unroll(t)
  const C = track(t, CK)
  sign(x, 'cancer', t, C, { hops: CHOPS, shadow: false })
  scroll(x, t, L)
  const late = t > 22.4
  sign(x, 'pisces', t, { x: 880, y: late ? 1200 : 1240, size: late ? 230 : 200, mood: late ? 'sparkle' : 'wide', look: [-1, -0.3], tears: late ? 3 : t > 8.5 ? 3 : 2 }, { hops: late ? [22.6, 23.0, 23.4, 23.8] : [8.6, 9.0] })
  if (t < 3) {
    // Mercury surfing the roll
    const mx = 250 + L - 20, my = 1420 + Math.sin(t * 14) * 10
    const v = t < 2.2 ? 2600 : 0
    merc(x, t, { x: Math.min(mx, 1500), y: my - 40, size: 340, mood: 'wide', rot: -0.2, v, dir: 0 }, { sweat: true })
  } else {
    merc(x, t, track(t, MK), { talk: H.mouth(t), hops: [11.2, 12.1, 13.0, 24.7] })
  }
  if (late) hearts(x, t, 22.6, 330, 840, { n: 8 })
}
function shotScroll(x, t, H) {
  x.fillStyle = '#172036'; x.fillRect(0, 0, 1080, 1920)
  const off = (t - 2.8) * 520
  x.save(); x.translate(540, 0); x.rotate(-0.08)
  box(x, -380, -200, 760, 2400, PAPER, { r: 6, b: 10 })
  for (let i = 0; i < 40; i++) {
    const y = 300 + i * 120 - off % (LINES.length * 120)
    const ln = LINES[i % LINES.length]
    if (y < -100 || y > 2100) continue
    const head = /^(CHAPTER|FOOTNOTE|APPENDIX|P\.S)/.test(ln)
    x.font = `${head ? 800 : 600} ${head ? 50 : 42}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillStyle = head ? RED : '#3a2f55'; x.fillText(ln, -330, y)
  }
  x.restore()
  label(x, `page ${Math.min(9, 1 + Math.floor((t - 2.8) * 2))} of 9`, 540, 1640, { size: 44, font: MONO, weight: 700, col: GOLD })
  const P = { x: 880, y: 600 + Math.sin(t * 6) * 40, size: 260, mood: 'wide', look: [-1, 0.3] }
  smoke(x, t, P.x, P.y - 140, { k: prog(t, 3.5, 4.5), col: '#ffffff' })
  merc(x, t, P, { talk: H.mouth(t), sweat: true })
}
function shotPhone(x, t, H) {
  kitchen(x, t)
  x.fillStyle = 'rgba(5,3,14,0.55)'; x.fillRect(0, 0, 1080, 1920)
  const k = ease.outCubic(prog(t, 15.4, 15.75))
  phone(x, t, { ...PH, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(-0.15, 0, k), msgs: MSGS, compose: COMPOSE, dots: DOTS })
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 21 ? 'love' : 'happy', look: [-1, 1] }, { talk: H.mouth(t) })
  if (t > 16.0 && t < 16.9) label(x, '✂ CUT.', 540, 1650, { size: 70, col: RED, rot: -0.06 })
}

function draw(x, t, H) {
  if (t < 2.8) shotKitchen(x, t, H)
  else if (t < 7.0) shotScroll(x, t, H)
  else if (t < 15.4) shotKitchen(x, t, H)
  else if (t < 22.4) shotPhone(x, t, H)
  else shotKitchen(x, t, H)
}

const F = film({
  id: 'kpmee04', duration: DURATION, draw, speech: SPEECH, ending: 'loop',
  hook: { text: 'CANCER. | This text has *chapters.*', top: 200, size: 104, out: [2.65, 2.8] },
  last: { at: 24.8, text: 'Keep the feeling. | Cut the *footnotes.*', top: 240, size: 96 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['rec', { at: 0.8, len: 1.3, caption: 'a quick check-in. *900 words.*', sub: 'cancer, texting a friend who went quiet', top: 640 }],
    ['whip', { at: 2.8, len: 0.35, from: 1.35 }],
    ['whip', { at: 15.4, len: 0.35, from: 1.3 }],
    ['whip', { at: 22.4, len: 0.35, from: 1.3 }],
  ],
  extraCues: [
    ['whoosh', 0.05, 0.6, 0.06], ['riser', 2.8, 6.8, 0.03],
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(3.0 + i * 0.4).toFixed(2), 0.04]),
    ['crash', 15.9, { gain: 0.04, len: 0.8 }], ['whoosh', 15.95, 0.25, 0.06],
    ['whoosh', 19.3, 0.3, 0.05], ['pop', 19.35, 1318.51, 0.04, 0.2],
    ['pop', 21.0, 1567.98, 0.05, -0.2], ['pop', 21.75, 1760, 0.05, -0.2],
    ['whoosh', 22.5, 0.6, 0.07],
    ['pluck', 8.8, 659.25, 0.035, 0.5, 0.3], ['pluck', 9.0, 587.33, 0.035, 0.5, 0.3], ['glitter', 22.6, 23.8],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [clamp, BONE]
