// kpmee09: PLANET TALK · MERCURY to SAGITTARIUS, "Forty-Two Unreads" (23 s vertical, star_talk, synthwave · E). Loops.
// Sagittarius went away for two weeks with the phone face-down. Mercury, courier of messages, hauls the backlog home.
//   0.00  frame 0: a big travel map, Mercury sliding across it mid-air hauling a bursting sack of unread messages,
//         envelopes spilling. Slam "SAGITTARIUS. | You have *forty-two* unreads." Whip on frame 0, glitch at 0.8.
//   2.60  Sag's room: suitcase, phone face-down with a 42 badge; the sack lands and spills · Sag "I was *offline* for two weeks!"
//   6.00  the pile: one envelope glows, "Pisces · voice note" → 7.0 Pisces sobbing "are you *alive??*"
//   9.50  Sag "now I have to write an *essay?*" → Mercury: "no essay." / "own the *gap.*" / "then ask about *them.*"
//  13.80  the chat: "I vanished, sorry. I missed you. Tell me everything." → "YOU'RE BACK"
//  18.50  Pisces happy-sobbing "they're *BACK!!*"  20.2 the map again, the sack empty. Slam "Own the gap. | Then *ask
//         about them.*" 22.6–23 eases back into frame 0.
import { film, track, merc, sign, room, phone, burst, label, hearts, box, clamp, lerp, prog, ease, easeOutBack, GOLD, INK, BONE, RED, PINK, INTER, MONO } from '../../kpmee01/mercurykit.js'

export const DURATION = 23
const ROOM = { wall: '#3a2a20', wall2: '#1c1430', floor: '#4a3428', win: { x: 680, y: 330, w: 300, h: 330 }, lamp: { x: 300, y: 600, k: 0.6 } }
const PROOM = { wall: '#1e2a5a', wall2: '#101634', floor: '#24305c', win: { x: 110, y: 300, w: 300, h: 340 } }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

const BLOBS = [[200, 640, 210, 150], [330, 780, 120, 220], [640, 600, 260, 170], [820, 820, 180, 140], [560, 1180, 150, 240], [880, 1300, 170, 120], [240, 1320, 200, 150]]
function map(x, t) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#173a6a'); g.addColorStop(1, '#0f2448')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  x.strokeStyle = 'rgba(255,255,255,0.07)'; x.lineWidth = 3
  for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(0, 200 + i * 140); x.lineTo(1080, 200 + i * 140); x.stroke(); x.beginPath(); x.moveTo(i * 100, 0); x.lineTo(i * 100, 1920); x.stroke() }
  BLOBS.forEach(([bx, by, w, h], i) => {
    x.fillStyle = INK; x.beginPath(); x.ellipse(bx, by, w * 0.62 + 8, h * 0.62 + 8, i * 0.4, 0, Math.PI * 2); x.fill()
    x.fillStyle = i % 2 ? '#6fbf73' : '#8fd48a'; x.beginPath(); x.ellipse(bx, by, w * 0.62, h * 0.62, i * 0.4, 0, Math.PI * 2); x.fill()
  })
  // the route
  x.strokeStyle = GOLD; x.lineWidth = 8; x.setLineDash([22, 18]); x.lineDashOffset = -t * 120
  x.beginPath(); x.moveTo(120, 1500); x.quadraticCurveTo(300, 600, 960, 900); x.stroke(); x.setLineDash([])
  for (const [px, py] of [[120, 1500], [960, 900]]) { x.fillStyle = RED; x.beginPath(); x.arc(px, py, 22, 0, Math.PI * 2); x.fill() }
}
function envelope(x, cx, cy, rot, s = 1, col = BONE) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -50, -34, 100, 68, col, { r: 6, b: 5 })
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-50, -34); x.lineTo(0, 6); x.lineTo(50, -34); x.stroke()
  x.restore()
}
function sack(x, t, cx, cy, full = 1) {
  x.save(); x.translate(cx, cy)
  const s = 0.6 + 0.4 * full
  x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 150, 140, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#b88a52'; x.beginPath(); x.ellipse(0, 40, 138, 128, 0, 0, Math.PI * 2); x.fill()
  box(x, -40, -110, 80, 40, '#8a6238', { r: 10, b: 5 })
  if (full > 0.5) for (let i = 0; i < 4; i++) envelope(x, -60 + i * 40, -110 - (i % 2) * 20, -0.4 + i * 0.25, 0.8)
  label(x, full > 0.5 ? '42' : '0', 0, 60, { size: 70, col: INK, stroke: null })
  x.restore()
}
function spill(x, t, cx, cy) {
  for (let i = 0; i < 8; i++) {
    const ph = (t * 1.4 + i / 8) % 1
    x.save(); x.globalAlpha = 1 - ph
    envelope(x, cx - 60 - ph * 260 + fr(i) * 80, cy + ph * 380 + fr(i, 2) * 40, ph * 5 + i, 0.8)
    x.restore()
  }
}
const MK = [
  [-1.2, { x: 120, y: 1180, size: 260, mood: 'wide', rot: -0.2 }],
  [2.6, { x: 1000, y: 720, size: 260, mood: 'wide', rot: -0.2 }, 'lin'],
]
const MKB = [
  [20.2, { x: 160, y: 1120, size: 260, mood: 'happy', rot: -0.15 }],
  [22.6, { x: 560, y: 890, size: 260, mood: 'happy', rot: -0.2 }, 'lin'],
]
function shotMap(x, t, H) {
  map(x, t)
  const late = t > 20
  const P = track(t, late ? MKB : MK)
  P.y += Math.sin(t * 7) * 14
  sack(x, t, P.x - 150, P.y + 60, late ? 0 : 1)
  if (!late) spill(x, t, P.x - 150, P.y + 40)
  merc(x, t, P, { talk: H.mouth(t), sweat: !late })
}
const SK = [
  [2.6, { x: 330, y: 1200, size: 300, mood: 'wide', look: [1, -0.6] }],
  [3.2, { mood: 'squint' }],
  [9.5, { x: 320, y: 1180, mood: 'squint', look: [1, -0.3] }],
  [11.0, { mood: 'neutral' }],
]
function suitcase(x, cx, by) {
  box(x, cx - 130, by - 200, 260, 200, '#d86a3a', { r: 20 })
  box(x, cx - 40, by - 240, 80, 40, '#7a3a20', { r: 10 })
  for (const [sx, sy, c] of [[-70, -150, '#7fd0f0'], [40, -120, GOLD], [-20, -60, '#9fe6b0']]) { x.fillStyle = c; x.beginPath(); x.arc(cx + sx, by + sy, 28, 0, Math.PI * 2); x.fill() }
}
function shotRoom(x, t, H) {
  room(x, t, ROOM)
  suitcase(x, 820, 1420)
  // the phone face-down with the badge
  box(x, 530, 1380, 140, 40, '#2b2350', { r: 10, b: 5 })
  x.fillStyle = RED; x.beginPath(); x.arc(670, 1370, 34, 0, Math.PI * 2); x.fill(); label(x, '42', 670, 1372, { size: 34, col: BONE, stroke: null })
  sign(x, 'sagittarius', t, track(t, SK), { hops: [2.8, 3.3, 3.8, 9.7, 10.1] })
  const drop = ease.outCubic(prog(t, 2.6, 3.0))
  if (t < 9.5) {
    sack(x, t, 640, lerp(400, 1250, drop), 1)
    if (t > 3.0) for (let i = 0; i < 14; i++) envelope(x, 500 + fr(i) * 420, 1420 - fr(i, 3) * 80, fr(i, 4) * 3, 0.8)
    merc(x, t, { x: 800, y: 720, size: 300, mood: 'happy', look: [-1, 0.5] }, { talk: H.mouth(t) })
  } else {
    for (let i = 0; i < 14; i++) envelope(x, 500 + fr(i) * 420, 1420 - fr(i, 3) * 80, fr(i, 4) * 3, 0.8)
    merc(x, t, { x: 780, y: 760, size: 310, mood: t > 10.6 ? 'happy' : 'sly' }, { talk: H.mouth(t), hops: [10.6, 11.4, 12.2] })
  }
}
function shotPile(x, t, H) {
  room(x, t, { ...ROOM, dim: 0.5 })
  for (let i = 0; i < 18; i++) envelope(x, 140 + (i % 6) * 160, 760 + Math.floor(i / 6) * 200 + fr(i) * 40, (fr(i, 2) - 0.5) * 0.8, 1.6)
  const g = 0.5 + 0.5 * Math.sin(t * 8)
  x.save(); x.shadowColor = '#9fb4ff'; x.shadowBlur = 40 * g; envelope(x, 540, 980, -0.08, 2.6, '#cfe0ff'); x.restore()
  label(x, 'Pisces · voice note', 540, 1170, { size: 50, col: '#9fb4ff' })
  merc(x, t, { x: 880, y: 460, size: 230, mood: 'wide', look: [-1, 1] }, { talk: H.mouth(t) })
}
function shotPisces(x, t) {
  room(x, t, PROOM)
  const happy = t > 18
  sign(x, 'pisces', t, { x: 540, y: 1100, size: 420, mood: happy ? 'sparkle' : 'wide', look: [0, 0.4], tears: 3 }, { hops: happy ? [18.6, 19.0, 19.4, 19.8] : [7.1, 7.6, 8.1, 8.6, 9.1] })
  box(x, 120, 1340, 360, 90, '#2b2350', { r: 30, b: 6 })
  label(x, happy ? '● typing' : '▶ voice note 0:38', 300, 1385, { size: 28, font: MONO, weight: 700, col: GOLD, stroke: null })
  for (let i = 0; i < 9; i++) { const h = 10 + 50 * Math.abs(Math.sin(t * 11 + i)); x.fillStyle = GOLD; x.fillRect(520 + i * 26, 1385 - h / 2, 14, h) }
  if (happy) hearts(x, t, 18.6, 540, 820, { n: 9, spread: 520 })
}
const PP = { name: 'Pisces', sub: 'online', color: '#7a8cf0' }
const MSGS = [
  { at: -5, side: 'L', text: '▶ voice note 0:38' },
  { at: -5, side: 'L', text: 'hello??' },
  { at: 16.6, side: 'R', text: 'I vanished, sorry. I missed you. Tell me everything.' },
  { at: 18.0, side: 'L', text: 'YOU’RE BACK' },
]
function shotChat(x, t, H) {
  room(x, t, { ...ROOM, dim: 0.55 })
  const k = ease.outCubic(prog(t, 13.8, 14.15))
  phone(x, t, { ...PP, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(0.15, 0, k), msgs: MSGS, compose: [{ t0: 14.2, text: 'I vanished, sorry. I missed you. Tell me everything.', cps: 26, sent: 16.6, gold: true }], dots: [[17.0, 18.0]] })
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 18 ? 'love' : 'happy', look: [-1, 1] }, { talk: H.mouth(t) })
}

const SPEECH = [
  { t0: 3.3, t1: 5.8, x: 340, y: 880, who: 'sagittarius', text: 'I was *offline* for two weeks!', size: 42, tail: -20, maxW: 560 },
  { t0: 4.3, t1: 5.9, x: 700, y: 480, who: 'mercury', text: 'and *they* weren’t.', size: 44, cps: 46, tail: 80 },
  { t0: 7.3, t1: 9.3, x: 540, y: 620, who: 'pisces', text: 'are you *alive??*', size: 58, shake: 3 },
  { t0: 9.7, t1: 13.5, x: 330, y: 860, who: 'sagittarius', text: 'now I have to write an *essay?*', size: 42, tail: -30, maxW: 560 },
  ...burst(10.6, ['no essay.', 'own the *gap.*', 'then ask about *them.*'], { x: 580, y: 300, gap: 0.8, t1: 13.6 }),
  { t0: 19.0, t1: 20.1, x: 540, y: 620, who: 'pisces', text: 'they’re *BACK!!*', size: 58, shake: 3 },
]

function draw(x, t, H) {
  if (t < 2.6) shotMap(x, t, H)
  else if (t < 6.0) shotRoom(x, t, H)
  else if (t < 7.0) shotPile(x, t, H)
  else if (t < 9.5) shotPisces(x, t)
  else if (t < 13.8) shotRoom(x, t, H)
  else if (t < 18.9) shotChat(x, t, H)
  else if (t < 20.2) shotPisces(x, t)
  else shotMap(x, t, H)
}

const F = film({
  id: 'kpmee09', duration: DURATION, draw, speech: SPEECH, ending: 'loop',
  hook: { text: 'SAGITTARIUS. | You have *forty-two* unreads.', top: 180, size: 96, out: [2.45, 2.6] },
  last: { at: 20.6, text: 'Own the gap. | Then *ask about them.*', top: 180, size: 100 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['glitch', { at: 0.8, len: 0.45, dialog: false }],
    ['shake', { at: 3.0, len: 0.4, amp: 22 }],
    ['whip', { at: 6.0, len: 0.3, from: 1.3 }],
    ['whip', { at: 7.0, len: 0.3, from: 1.3 }],
    ['whip', { at: 18.9, len: 0.3, from: 1.3 }],
  ],
  extraCues: [
    ['whoosh', 0.05, 1.2, 0.05], ['whoosh', 1.5, 1.0, 0.04],
    ['boom', 3.0, 0.3], ...Array.from({ length: 8 }, (_, i) => ['tick', +(3.05 + i * 0.07).toFixed(2), 0.05]),
    ['bell', 6.1, 1046.5, 0.04, 1.0, 0],
    ['pluck', 7.4, 659.25, 0.035, 0.5, 0.3], ['pluck', 7.6, 587.33, 0.035, 0.5, 0.3],
    ['whoosh', 16.6, 0.3, 0.05], ['pop', 16.65, 1318.51, 0.04, 0.2], ['pop', 18.0, 1760, 0.05, -0.2],
    ['pluck', 18.9, 783.99, 0.035, 0.5, 0.3], ['pluck', 19.1, 659.25, 0.035, 0.5, 0.3], ['glitter', 18.6, 19.8],
    ['whoosh', 20.3, 1.0, 0.04],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [clamp, easeOutBack, PINK, INTER]
