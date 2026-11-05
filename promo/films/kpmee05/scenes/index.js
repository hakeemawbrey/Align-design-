// kpmee05: PLANET TALK · MERCURY to LEO, "Refreshing the Viewer List" (24 s vertical, star_talk, funk · D). Hard cut.
// Leo posted a story for one person and refreshes who viewed it every 30 seconds. Mercury: just message them.
//   0.00  frame 0: Leo mid-refresh, a giant spinning VIEWS counter overhead, Mercury ricocheting off it (impact burst).
//         Slam "LEO. | Stop refreshing the *viewer list.*" Whip on frame 0, glitch at 0.7.
//   2.80  phone close: the viewer list, refresh #41… #43, then "Avery" appears at the top · caught: "THEY SAW IT."
//   7.00  two-shot: Leo "they saw it! now *another* story?" → Mercury: "posting *at* them?" / "that's a *hint.*" /
//         "just *message* them."
//  11.50  the chat: "saw you saw my story. coffee?" → sent → "finally lol. yes."
//  16.50  bedroom: Leo hops; Pisces slides in, crying, holding up "viewed ×9": "I'm so *proud.*" Mercury bounces off
//         the counter again; it turns into a heart. Slam "Hints are posters. | *Messages* are doors." 22.3, cut at 24.
import { film, track, merc, sign, room, phone, burst, label, hearts, box, clamp, lerp, prog, ease, easeOutBack, GOLD, INK, BONE, RED, PINK, INTER, MONO } from '../../kpmee01/mercurykit.js'

export const DURATION = 24
const ROOM = { wall: '#3a2350', wall2: '#1e1236', floor: '#45305c', win: { x: 700, y: 900, w: 300, h: 300 }, lamp: { x: 540, y: 400, k: 0.6 } }
const LEO = '#f39a3a'
const CNT = { x: 470, y: 610 }

const MK = [
  [-1, { x: 980, y: 260, size: 300, mood: 'wide', rot: 0.5 }],
  [0.05, { x: CNT.x + 230, y: CNT.y - 40, mood: 'wide', squash: 0.3 }, 'in'],
  [0.55, { x: 820, y: 900, squash: 0, rot: -0.3 }, 'out'],
  [1.6, { x: 800, y: 860, rot: 0, mood: 'angry' }],
  [7.0, { x: 780, y: 780, size: 310, mood: 'sly' }],
  [8.5, { mood: 'happy' }],
  [16.5, { x: 820, y: 800, size: 280, mood: 'happy' }],
  [19.4, { x: 820, y: 800 }],
  [19.7, { x: CNT.x + 200, y: CNT.y + 20, squash: 0.3 }, 'in'],
  [20.2, { x: 820, y: 800, squash: 0, mood: 'proud' }, 'out'],
]
const LK = [
  [0, { x: 330, y: 1180, size: 320, mood: 'wide', look: [0.3, 1] }],
  [7.0, { x: 320, y: 1170, mood: 'sparkle', look: [1, -0.4] }],
  [9.0, { mood: 'squint' }],
  [16.5, { mood: 'happy', look: [0, 0] }],
]
const LHOPS = [0.2, 0.5, 7.2, 7.6, 16.6, 17.0, 17.4, 17.8, 20.3]
const PK = [
  [16.5, { x: 1300, y: 1250, size: 240, mood: 'sparkle', tears: 3, look: [-1, 0] }],
  [17.0, { x: 860, y: 1250 }, 'back'],
]

function counter(x, t, n, heart) {
  const k = 1 + 0.06 * Math.sin(t * 10)
  x.save(); x.translate(CNT.x, CNT.y); x.scale(k, k)
  box(x, -230, -110, 460, 220, '#1b1440', { r: 40, b: 10 })
  if (heart) {
    const B = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
    B.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'H') { x.fillStyle = PINK; x.fillRect(-150 + i * 22, -66 + j * 22, 22, 22) } }))
    label(x, 'replied', 90, 0, { size: 56, col: PINK, stroke: null })
  } else {
    // eye
    x.fillStyle = BONE; x.beginPath(); x.ellipse(-120, 0, 72, 44, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.beginPath(); x.arc(-120, 0, 26, 0, Math.PI * 2); x.fill()
    label(x, String(n), 80, 4, { size: 110, font: MONO, weight: 700, col: GOLD, stroke: null })
  }
  x.restore()
}
function impact(x, t, at, cx, cy) {
  const a = t - at
  if (a < -0.2 || a > 0.5) return
  const q = clamp((a + 0.2) / 0.7)
  x.save(); x.globalAlpha = 1 - q; x.strokeStyle = GOLD; x.lineWidth = 10
  for (let i = 0; i < 10; i++) { const an = (i / 10) * Math.PI * 2; x.beginPath(); x.moveTo(cx + Math.cos(an) * (40 + q * 80), cy + Math.sin(an) * (40 + q * 80)); x.lineTo(cx + Math.cos(an) * (110 + q * 160), cy + Math.sin(an) * (110 + q * 160)); x.stroke() }
  x.restore()
}
function handPhone(x, t, cx, cy, spin) {
  box(x, cx - 70, cy - 120, 140, 240, '#2b2350', { r: 18, b: 6 })
  x.fillStyle = '#0f0a26'; x.fillRect(cx - 56, cy - 104, 112, 208)
  if (spin) { x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy - 50, 26, t * 12, t * 12 + 4.6); x.stroke() }
}

function shotRoom(x, t, H) {
  room(x, t, ROOM)
  const late = t > 16.5
  counter(x, t, late ? '99+' : 38 + Math.floor((t + 1) * 9) % 60, late && t > 19.75)
  impact(x, t, 0.05, CNT.x + 200, CNT.y - 40); impact(x, t, 19.7, CNT.x + 180, CNT.y + 20)
  const L = track(t, LK)
  sign(x, 'leo', t, L, { hops: LHOPS })
  handPhone(x, t, L.x + 150, L.y - 20, !late)
  if (t < 2.8) { label(x, 'refresh #41', L.x + 150, L.y - 190, { size: 40, font: MONO, weight: 700, col: GOLD }) }
  if (late) {
    const P = track(t, PK)
    sign(x, 'pisces', t, P, { hops: [17.1, 17.5, 17.9, 18.3] })
    if (t > 17.0) { x.save(); x.translate(P.x - 40, P.y + 190); x.rotate(0.08); box(x, -120, -40, 240, 80, BONE, { r: 12 }); label(x, 'viewed ×9', 0, 2, { size: 38, col: INK, stroke: null }); x.restore() }
    hearts(x, t, 17.0, 330, 980, { n: 8, col: LEO })
  }
  merc(x, t, track(t, MK), { talk: H.mouth(t), sweat: t < 3, hops: [8.6, 9.4, 10.2, 20.3] })
}

// viewer list phone
const VIEWERS = [['Pisces', '#7a8cf0', 'viewed ×9'], ['Mo', '#f0603a', ''], ['Tali', '#7fd0f0', ''], ['Kit', '#f39a3a', ''], ['Ines', '#3f7cf0', ''], ['Sky', '#f2c75c', ''], ['Juno', '#5fd38a', '']]
function viewerList(x, t) {
  x.save(); x.translate(540, 1000 - 500 * (1 - ease.outCubic(prog(t, 2.8, 3.15))) * -1)
  box(x, -310, -520, 620, 1040, '#2b2350', { r: 62, b: 12 })
  x.fillStyle = '#0f0a26'; x.beginPath(); x.roundRect(-288, -498, 576, 996, 46); x.fill()
  x.save(); x.beginPath(); x.roundRect(-288, -498, 576, 996, 46); x.clip()
  x.fillStyle = '#1b1440'; x.fillRect(-288, -498, 576, 130)
  const ref = 41 + Math.min(2, Math.floor((t - 2.8) / 0.6))
  label(x, 'viewers', -250, -430, { size: 44, align: 'left', stroke: null })
  label(x, `refresh #${ref}`, 250, -430, { size: 26, font: MONO, weight: 700, col: GOLD, align: 'right', stroke: null })
  const avery = t > 4.5
  const rows = avery ? [['Avery', PINK, 'just now'], ...VIEWERS] : VIEWERS
  const spin = (t - 2.8) % 0.6 < 0.3 && t < 4.6
  if (spin) { x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.arc(0, -320, 26, t * 12, t * 12 + 4.6); x.stroke() }
  rows.forEach((r, i) => {
    const y = -300 + i * 100 + (spin ? 60 : 0)
    if (i === 0 && avery) { x.fillStyle = 'rgba(255,143,177,0.16)'; x.fillRect(-288, y - 46, 576, 92) }
    const k = i === 0 && avery ? easeOutBack(prog(t, 4.5, 4.8), 2.2) : 1
    x.save(); x.translate(-232, y); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = r[1]; x.beginPath(); x.arc(0, 0, 28, 0, Math.PI * 2); x.fill()
    x.restore()
    x.font = `800 34px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(r[0], -176, y)
    if (r[2]) label(x, r[2], 250, y, { size: 24, font: MONO, weight: 700, col: i === 0 && avery ? PINK : 'rgba(239,230,214,0.6)', align: 'right', stroke: null })
  })
  x.restore(); x.restore()
}
function shotViewers(x, t, H) {
  room(x, t, { ...ROOM, dim: 0.6 })
  viewerList(x, t)
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 4.5 ? 'wide' : 'sly', look: [-1, 1] }, { talk: H.mouth(t) })
  if (t > 5.2) { const k = Math.min(1, (t - 5.2) / 0.2); x.save(); x.translate(540, 1620); x.rotate(-0.05); x.scale(k, k); box(x, -220, -46, 440, 92, '#ff3b3b', { r: 14 }); label(x, 'THEY SAW IT.', 0, 2, { size: 54, col: BONE, stroke: null }); x.restore() }
}

const AP = { name: 'Avery', sub: 'online', color: PINK }
const MSGS = [
  { at: -5, side: 'L', text: 'replied to your story: haha cute' },
  { at: 13.8, side: 'R', text: 'saw you saw my story. coffee?' },
  { at: 15.6, side: 'L', text: 'finally lol. yes.' },
]
const COMPOSE = [{ t0: 11.9, text: 'saw you saw my story. coffee?', cps: 22, sent: 13.8, gold: true }]
function shotChat(x, t, H) {
  room(x, t, { ...ROOM, dim: 0.55 })
  const k = ease.outCubic(prog(t, 11.5, 11.85))
  phone(x, t, { ...AP, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(0.15, 0, k), msgs: MSGS, compose: COMPOSE, dots: [[14.2, 15.6]] })
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 15.6 ? 'love' : 'happy', look: [-1, 1] }, { talk: H.mouth(t) })
}

const SPEECH = [
  { t0: 7.2, t1: 10.6, x: 330, y: 860, who: 'leo', text: 'they saw it! now *another* story?', size: 42, tail: -40, maxW: 540 },
  ...burst(8.6, ['posting *at* them?', 'that’s a *hint.*', 'just *message* them.'], { x: 560, y: 300, gap: 0.8, t1: 11.3 }),
  { t0: 17.4, t1: 19.6, x: 700, y: 1040, who: 'pisces', text: 'I’m so *proud.*', size: 46, tail: 90 },
]

function draw(x, t, H) {
  if (t < 2.8) shotRoom(x, t, H)
  else if (t < 7.0) shotViewers(x, t, H)
  else if (t < 11.5) shotRoom(x, t, H)
  else if (t < 16.5) shotChat(x, t, H)
  else shotRoom(x, t, H)
}

const F = film({
  id: 'kpmee05', duration: DURATION, draw, speech: SPEECH,
  hook: { text: 'LEO. | Stop refreshing the *viewer list.*', top: 190, size: 100, out: [2.65, 2.8] },
  last: { at: 22.3, text: 'Hints are posters. | *Messages* are doors.', top: 240, size: 96 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['shake', { at: 0.05, len: 0.4, amp: 24 }],
    ['glitch', { at: 0.7, len: 0.5, dialog: false }],
    ['whip', { at: 2.8, len: 0.35, from: 1.3 }],
    ['caught', { at: 4.8, x: 540, y: 700, r: 300, ry: 60, out: [6.8, 6.95], label: null, arrow: null, rec: false }],
    ['whip', { at: 16.5, len: 0.35, from: 1.3 }],
    ['shake', { at: 19.7, len: 0.35, amp: 18 }],
  ],
  extraCues: [
    ['boom', 0.05, 0.3], ['pop', 0.06, 1318.51, 0.05, 0.3],
    ['tick', 2.9, 0.05], ['tick', 3.5, 0.05], ['tick', 4.1, 0.05], ['pop', 4.5, 1567.98, 0.05, 0],
    ['whoosh', 13.8, 0.3, 0.05], ['pop', 13.85, 1318.51, 0.04, 0.2], ['pop', 15.6, 1567.98, 0.05, -0.2], ['glitter', 15.6, 16.4],
    ['whoosh', 16.6, 0.5, 0.06], ['pluck', 17.5, 659.25, 0.035, 0.5, 0.3], ['pluck', 17.7, 587.33, 0.035, 0.5, 0.3],
    ['boom', 19.7, 0.25], ['glitter', 19.75, 20.5],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [RED]
