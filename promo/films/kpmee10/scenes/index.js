// kpmee10: PLANET TALK · MERCURY to CAPRICORN, "You Sent Your Crush an Agenda" (26 s vertical, star_advice, house · Am).
// Capricorn texts a crush like a work email. Mercury keeps the plan and adds the heart. Hard cut.
//   0.00  frame 0: the office after hours; Mercury bursting out of a calendar invite on Capricorn's laptop ("Date:
//         Saturday · please confirm by EOD"). Slam "CAPRICORN. | That's a *meeting invite.*" Whip on frame 0, shake.
//   0.90  record scratch + freeze: "texting a crush. *in work mode.*"
//   2.60  the chat: "Following up re: Saturday. Please confirm." · the next draft "Per my last message," gets struck out
//   6.50  Capricorn "clear plans are *respectful.*" → Mercury: "the plan is *great.*" / "where's the *heart?*" /
//         "say why you *want* to go."
//  10.50  the chat: "Saturday still on? I'd really like to see you." → "I've been smiling all day"
//  15.50  Pisces at the next desk, reading over the partition, sobbing: "that's so *romantic*"
//  18.50  the calendar: the event renamed "Saturday: see Robin :)" · Mercury "still a *plan.*"
//  21.50  the office: slam "Keep the plan. | Add the *heart.*" 24.3, hard cut at 26.
import { film, track, merc, sign, room, phone, burst, label, hearts, box, entrance, drawEntranceFx, entranceCues, clamp, lerp, prog, ease, easeOutBack, GOLD, INK, BONE, RED, PINK, INTER, MONO } from '../../kpmee01/mercurykit.js'

export const DURATION = 26
const IN = { at: -0.2, len: 0.55, x: 520, y: 640, size: 330 }
const LAND = entrance('burst', 0, IN).land
const OFFICE = { wall: '#24304a', wall2: '#121a2c', floor: '#2a3448', win: { x: 640, y: 300, w: 360, h: 300 }, lamp: { x: 300, y: 700, k: 0.5 } }

function laptop(x, t, cx, by, mode) {
  // mode: 'invite' | 'event'
  box(x, cx - 330, by - 470, 660, 420, '#3a3f58', { r: 22, b: 9 })
  x.fillStyle = '#0f1428'; x.fillRect(cx - 306, by - 446, 612, 372)
  box(x, cx - 380, by - 50, 760, 50, '#5a6080', { r: 10, b: 7 })
  // calendar grid
  x.strokeStyle = 'rgba(255,255,255,0.08)'; x.lineWidth = 2
  for (let i = 0; i < 7; i++) { x.beginPath(); x.moveTo(cx - 306 + i * 88, by - 446); x.lineTo(cx - 306 + i * 88, by - 74); x.stroke() }
  if (mode === 'invite') {
    box(x, cx - 250, by - 400, 500, 280, BONE, { r: 16, b: 6 })
    x.fillStyle = '#4f8df0'; x.fillRect(cx - 250, by - 400, 500, 56)
    label(x, 'MEETING INVITE', cx, by - 372, { size: 30, font: MONO, weight: 700, col: BONE, stroke: null })
    x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('Date: Saturday, 7–9 PM', cx - 220, by - 300); x.font = `600 28px ${INTER}`
    x.fillText('Agenda: dinner, conversation', cx - 220, by - 250); x.fillText('(please confirm by EOD)', cx - 220, by - 205)
    box(x, cx - 220, by - 170, 120, 38, '#5fd38a', { r: 10, b: 3 }); label(x, 'ACCEPT', cx - 160, by - 151, { size: 22, col: INK, stroke: null })
  } else {
    const k = clamp((t - 19.0) / 1.6)
    const txt = 'Saturday: see Robin :)'
    box(x, cx - 220, by - 330, 440, 160, PINK, { r: 18, b: 6 })
    x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText(t < 19.0 ? 'Meeting re: Saturday' : txt.slice(0, Math.floor(k * txt.length)), cx - 196, by - 268)
    label(x, '7 PM', cx - 160, by - 210, { size: 28, font: MONO, weight: 700, col: INK, stroke: null })
    if (t > 20.6) hearts(x, t, 20.6, cx, by - 300, { n: 6, spread: 300 })
  }
}
function desk(x, cx, ty, w) { box(x, cx - w / 2, ty, w, 36, '#6b5a4a', { r: 8 }); box(x, cx - w / 2 + 30, ty + 40, 24, 420, '#4a3a30', { r: 6 }); box(x, cx + w / 2 - 54, ty + 40, 24, 420, '#4a3a30', { r: 6 }) }
function partition(x) { box(x, 880, 1000, 24, 440, '#5a6a8a', { r: 8 }) }

const MK = [
  [LAND, { x: 520, y: 640, size: 330, mood: 'wide' }],
  [2.6, { x: 540, y: 640 }],
  [6.5, { x: 760, y: 760, size: 310, mood: 'neutral' }],
  [7.6, { mood: 'happy' }],
  [15.5, { x: 520, y: 600, size: 280, mood: 'love' }],
  [21.5, { x: 520, y: 600, size: 290, mood: 'happy' }],
  [24.2, { mood: 'proud' }],
]
const CK = [
  [0, { x: 200, y: 1150, size: 270, mood: 'wide', look: [1, -0.8] }],
  [6.5, { x: 320, y: 1160, mood: 'neutral', look: [1, -0.4] }],
  [8.3, { mood: 'squint' }],
  [15.5, { x: 200, y: 1150, mood: 'happy', look: [1, -0.2] }],
  [21.5, { mood: 'happy', look: [0, 0] }],
]
function shotOffice(x, t, H) {
  room(x, t, OFFICE)
  desk(x, 420, 1300, 760)
  sign(x, 'capricorn', t, track(t, CK), { hops: [0.3, 6.7, 7.1, 15.6, 16.0, 21.6, 22.0, 24.3] })
  x.save(); x.translate(600, 1300); x.scale(0.72, 0.72); x.translate(-600, -1300); laptop(x, t, 600, 1300, t < 3 ? 'invite' : 'event'); x.restore()
  partition(x)
  const late = t > 15.5
  sign(x, 'pisces', t, { x: 985, y: late ? 1090 : 1160, size: late ? 200 : 170, mood: late ? 'sparkle' : 'neutral', look: [-1, 0], tears: late ? 3 : 1 }, { hops: late ? [15.7, 16.1, 16.5, 16.9, 21.7, 22.1] : null })
  box(x, 900, 1300, 200, 36, '#6b5a4a', { r: 8 })
  if (t < LAND) drawEntranceFx(x, 'mercury', 'burst', t, IN)
  const P = t < LAND ? { ...entrance('burst', t, IN), mood: 'wide' } : track(t, MK)
  merc(x, t, P, { talk: H.mouth(t), sweat: t < 3, hops: [24.2] })
  if (late) hearts(x, t, 15.7, 930, 880, { n: 7 })
}
function shotTwo(x, t, H) {
  room(x, t, OFFICE)
  desk(x, 420, 1360, 760)
  sign(x, 'capricorn', t, track(t, CK), { hops: [6.7, 7.1] })
  merc(x, t, track(t, MK), { talk: H.mouth(t), hops: [7.6, 8.4, 9.2] })
}
function shotCal(x, t, H) {
  room(x, t, { ...OFFICE, dim: 0.5 })
  x.save(); x.translate(540, 1000); x.scale(1.35, 1.35); x.translate(-540, -1000)
  laptop(x, t, 540, 1250, 'event')
  x.restore()
  merc(x, t, { x: 880, y: 470, size: 230, mood: 'happy', look: [-1, 1] }, { talk: H.mouth(t) })
}
const RP = { name: 'Robin', sub: 'online', color: PINK }
const MSGS = [
  { at: -5, side: 'L', text: 'that was such a fun walk :)' },
  { at: -5, side: 'R', text: 'Following up re: Saturday. Please confirm.' },
  { at: 13.3, side: 'R', text: 'Saturday still on? I’d really like to see you.' },
  { at: 15.0, side: 'L', text: 'I’ve been smiling all day' },
]
const COMPOSE = [
  { t0: 4.3, text: 'Per my last message,', cps: 20, strike: 5.5, clear: 6.2 },
  { t0: 10.9, text: 'Saturday still on? I’d really like to see you.', cps: 24, sent: 13.3, gold: true },
]
function shotChat(x, t, H, t0) {
  room(x, t, { ...OFFICE, dim: 0.55 })
  const k = ease.outCubic(prog(t, t0, t0 + 0.35))
  phone(x, t, { ...RP, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(0.15, 0, k), msgs: MSGS, compose: COMPOSE, dots: [[13.7, 15.0]], receipt: t < 6.5 ? { at: 0, text: 'Read 3:02 PM' } : null })
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 15 ? 'love' : t > 10 ? 'happy' : t > 5.4 ? 'wide' : 'sly', look: [-1, 1] }, { talk: H.mouth(t), sweat: t > 5 && t < 6.5 })
  if (t > 5.6 && t < 6.5) { const s = easeOutBack(prog(t, 5.6, 5.9), 2.4); x.save(); x.translate(540, 1640); x.rotate(-0.05); x.scale(s, s); box(x, -270, -50, 540, 100, '#ff3b3b', { r: 14 }); label(x, 'PER MY LAST?!', 0, 2, { size: 60, col: BONE, stroke: null }); x.restore() }
}

const SPEECH = [
  { t0: 6.7, t1: 10.3, x: 330, y: 860, who: 'capricorn', text: 'clear plans are *respectful.*', size: 42, tail: -30, maxW: 560 },
  ...burst(7.6, ['the plan is *great.*', 'where’s the *heart?*', 'say why you *want* to go.'], { x: 580, y: 300, gap: 0.8, t1: 10.4 }),
  { t0: 16.0, t1: 18.4, x: 760, y: 900, who: 'pisces', text: 'that’s so *romantic*', size: 42, tail: 180 },
  { t0: 20.4, t1: 21.4, x: 560, y: 470, who: 'mercury', text: 'still a *plan.*', size: 46, cps: 46, tail: 260 },
]

function draw(x, t, H) {
  if (t < 2.6) shotOffice(x, t, H)
  else if (t < 6.5) shotChat(x, t, H, 2.6)
  else if (t < 10.5) shotTwo(x, t, H)
  else if (t < 15.5) shotChat(x, t, H, 10.5)
  else if (t < 18.5) shotOffice(x, t, H)
  else if (t < 21.5) shotCal(x, t, H)
  else shotOffice(x, t, H)
}

const F = film({
  id: 'kpmee10', duration: DURATION, draw, speech: SPEECH,
  hook: { text: 'CAPRICORN. | That’s a *meeting invite.*', top: 180, size: 104, out: [2.45, 2.6] },
  last: { at: 24.3, text: 'Keep the plan. | Add the *heart.*', top: 200, size: 104 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['shake', { at: LAND, len: 0.45, amp: 24 }],
    ['rec', { at: 0.9, len: 1.3, caption: 'texting a crush. *in work mode.*', sub: 'capricorn, 6:58 p.m., still at the office', top: 1580 }],
    ['whip', { at: 2.6, len: 0.35, from: 1.3 }],
    ['whip', { at: 15.5, len: 0.3, from: 1.3 }],
    ['whip', { at: 18.5, len: 0.3, from: 1.3 }],
  ],
  extraCues: [
    ...entranceCues('burst', IN), ['bell', 0.0, 1318.51, 0.04, 0.6, 0], ['bell', 0.25, 1046.5, 0.04, 0.6, 0],
    ['crash', 5.5, { gain: 0.04, len: 0.8 }], ['tom', 5.6, 80, { gain: 0.25, decay: 0.3 }],
    ['whoosh', 13.3, 0.3, 0.05], ['pop', 13.35, 1318.51, 0.04, 0.2], ['pop', 15.0, 1567.98, 0.05, -0.2], ['glitter', 15.0, 15.8],
    ['pluck', 16.1, 659.25, 0.035, 0.5, 0.3], ['pluck', 16.3, 587.33, 0.035, 0.5, 0.3],
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(19.0 + i * 0.2).toFixed(2), 0.04]), ['glitter', 20.6, 21.3],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [RED, GOLD]
