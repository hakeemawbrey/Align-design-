// kpvee10 · Planet Talk: Venus to Capricorn — "Not a Promotion" (28.4 s vertical, star_advice, hard cut). house · C.
//   0.00  frame 0: Venus mid-zoom smashing through a giant spreadsheet, cells flying like tiles; Capricorn at the desk
//         under a sticky note "DATE WHEN I'VE EARNED IT". Slam "CAPRICORN. Love isn't a *promotion.*"
//   3.0   THE PLAN: Q3 get promoted · Q4 deserve love (caught). Capricorn: "I'll date when I've earned it."
//   7.8   Venus: "Darling. You don't earn love." / "You're already enough to be loved."  "But the spreadsheet…"
//  14.8   the clock hits 6:00: "It's six. Close it." The laptop lid shuts. "still on for friday?" → "Yes. I'm leaving on
//         time." The sticky note now reads FRIDAY · 7 PM. Pisces cries into the sticky notes.
//  26.0   slam "Worthy *before* the goal." Hard cut.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { episode, panel, txt, rich, heart, sparkleBurst, pop01, outK, sobCues, INK, ROSE, CREAM, GOLD, BONE, VRIM } from '../../kpvee01/venuskit.js'

const T = { plan: [3.0, 7.6], six: 15.6, shut: 17.4, notif: 18.0, flipNote: 21.0, sob: 23.6, last: 26.0 }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

function sheetBlast(x, t) {
  const a = 1 - prog(t, 0.8, 1.8)
  if (a <= 0) return
  const ph = clamp((t + 0.7) / 2.4)
  for (let i = 0; i < 9; i++) for (let j = 0; j < 12; j++) {
    const cx = 540 + (i - 4) * 110, cy = 620 + (j - 5.5) * 64
    const d = Math.hypot(cx - 540, cy - 620) + 1, push = ph * (300 + fr(i * 12 + j, 1) * 500)
    const px = cx + (cx - 540) / d * push, py = cy + (cy - 620) / d * push + ph * ph * 300
    x.save(); x.globalAlpha = a; x.translate(px, py); x.rotate((fr(i * 12 + j, 2) - 0.5) * 4 * ph)
    x.fillStyle = INK; x.fillRect(-55, -32, 110, 64); x.fillStyle = (i + j) % 5 ? '#e9f5ea' : '#7fd09a'; x.fillRect(-51, -28, 102, 56)
    if ((i * 3 + j) % 4 === 0) { x.fillStyle = INK; x.font = '700 20px Inter'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(['Q3', '100%', 'KPI', '=SUM', 'GOAL'][(i + j) % 5], 0, 0) }
    x.restore()
  }
}
function desk(x, t) {
  x.fillStyle = INK; x.fillRect(150, 1500, 30, 170); x.fillRect(900, 1500, 30, 170)
  x.fillStyle = INK; x.beginPath(); x.roundRect(120, 1470, 840, 50, 10); x.fill(); x.fillStyle = '#8a5a3a'; x.beginPath(); x.roundRect(126, 1476, 828, 38, 8); x.fill()
  // laptop
  const shut = ease.inCubic(prog(t, T.shut - 0.25, T.shut))
  x.save(); x.translate(300, 1470)
  x.fillStyle = INK; x.fillRect(-140, -16, 280, 16)
  x.scale(1, Math.max(0.04, 1 - shut))
  x.fillStyle = INK; x.beginPath(); x.roundRect(-130, -200, 260, 190, 12); x.fill()
  x.fillStyle = shut > 0.9 ? '#3a2d5a' : '#dff2e2'; x.fillRect(-118, -188, 236, 166)
  if (shut < 0.9) for (let i = 0; i < 4; i++) for (let j = 0; j < 6; j++) { x.fillStyle = (i + j) % 3 ? '#b8e6c2' : '#7fd09a'; x.fillRect(-110 + i * 58, -180 + j * 26, 52, 20) }
  x.restore()
  // mug
  x.fillStyle = INK; x.fillRect(720, 1390, 80, 84); x.fillStyle = CREAM; x.fillRect(726, 1396, 68, 72); x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(806, 1430, 20, -1.2, 1.2); x.stroke()
}
function clock(x, t) {
  const cx = 190, cy = 840
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 92, 0, 7); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(cx, cy, 82, 0, 7); x.fill()
  const m = t < T.six ? 59 : 0, h = t < T.six ? 5 : 6
  const ma = (m / 60) * Math.PI * 2 - Math.PI / 2, ha = ((h + m / 60) / 12) * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 10; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ha) * 44, cy + Math.sin(ha) * 44); x.stroke()
  x.lineWidth = 6; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ma) * 66, cy + Math.sin(ma) * 66); x.stroke()
  if (t > T.six && t < T.six + 1) { const k = 1 - prog(t, T.six, T.six + 1); x.strokeStyle = `rgba(255,214,120,${k})`; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy, 100 + (1 - k) * 60, 0, 7); x.stroke() }
  txt(x, t < T.six ? '5:59' : '6:00', cx, cy + 130, { size: 40, color: t < T.six ? BONE : GOLD, font: "700 40px 'Space Mono', monospace", stroke: INK, sw: 6 })
}
function sticky(x, t) {
  const f = ease.inOutCubic(prog(t, T.flipNote, T.flipNote + 0.5)), sx = Math.abs(Math.cos(f * Math.PI))
  const after = f >= 0.5
  x.save(); x.translate(870, 820); x.rotate(0.06 + Math.sin(t * 1.3) * 0.01); x.scale(Math.max(0.03, sx), 1)
  x.fillStyle = 'rgba(6,4,18,0.4)'; x.fillRect(-102, -92, 220, 210)
  x.fillStyle = after ? '#ffc0d4' : '#ffe27a'; x.fillRect(-110, -105, 220, 210)
  if (!after) { ['DATE WHEN', 'I’VE', 'EARNED IT'].forEach((l, i) => txt(x, l, 0, -50 + i * 50, { size: 34, color: INK })) }
  else { txt(x, 'FRIDAY', 0, -30, { size: 46, color: INK }); txt(x, '7 PM', 0, 26, { size: 40, color: VRIM }); heart(x, 0, 74, 18) }
  x.restore()
}
function plan(x, t) {
  const k = pop01(t, T.plan[0], 0.4, 2) * outK(t, [T.plan[1], T.plan[1] + 0.25])
  if (k <= 0.01) return
  panel(x, 540, 1080, 700, 250, { fill: CREAM, rad: 14, s: k, rot: -0.03 })
  x.save(); x.translate(540, 1080); x.rotate(-0.03); x.scale(k, k)
  txt(x, 'THE PLAN', 0, -80, { size: 32, color: VRIM })
  txt(x, 'Q3: get promoted', -280, -10, { size: 46, align: 'left', color: INK, weight: 700 })
  txt(x, 'Q4: deserve love', -280, 60, { size: 46, align: 'left', color: INK, weight: 700 })
  x.restore()
}

const EP = episode({
  sign: 'capricorn', dur: 28.4, ending: 'cut',
  enter: { kind: 'zoom', at: -0.5, x: 540, y: 600, size: 360 },
  venus: [
    { t: 0, x: 540, y: 600, size: 360, mood: 'angry', look: [0, 1] },
    { t: 1.6, mood: 'sly', look: [0, 1] },
    { t: 7.8, mood: 'love' },
    { t: 12.8, mood: 'sly' },
    { t: 15.0, mood: 'happy' },
    { t: 21.4, mood: 'proud' },
    { t: 25.8, mood: 'love' },
  ],
  signK: [
    { t: 0, x: 580, y: 1360, size: 250, mood: 'wide', look: [0, -1], squash: 0.12 },
    { t: 1.0, mood: 'squint', look: [-1, 0.6], squash: 0 },
    { t: 5.4, mood: 'neutral', look: [0, 0] },
    { t: 7.8, mood: 'wide', look: [0, -1] },
    { t: 12.8, mood: 'squint', look: [-1, 0.6] },
    { t: 15.6, mood: 'wide', look: [-1, -0.6], d: 0.1 },
    { t: 17.6, mood: 'neutral', look: [0, 0] },
    { t: 18.2, mood: 'happy', look: [0, -1] },
    { t: 21.2, mood: 'sparkle', look: [1, -1] },
  ],
  pisK: [
    { t: 0, x: 980, y: 1620, size: 150, mood: 'wide', look: [-1, -1], tears: 1 },
    { t: 8.0, mood: 'sparkle', tears: 2 },
    { t: 23.6, d: 0.5, x: 900, y: 1080, size: 170, mood: 'happy', tears: 3, look: [-0.3, -1] },
  ],
  bubbles: [
    { t0: 5.4, t1: 7.6, who: 'capricorn', text: 'I’ll date when I’ve *earned* it.', x: 540, y: 1780 },
    { t0: 7.8, t1: 10.0, who: 'venus', text: 'Darling. You don’t *earn* love.', y: 300 },
    { t0: 10.2, t1: 12.6, who: 'venus', text: 'You’re already *enough* to be loved.', y: 300 },
    { t0: 12.8, t1: 14.6, who: 'capricorn', text: 'But the *spreadsheet…*', x: 540, y: 1780 },
    { t0: 15.0, t1: 17.0, who: 'venus', text: 'It’s six. *Close* it.', y: 300, size: 60 },
    { t0: 19.0, t1: 21.2, who: 'capricorn', text: 'Yes. I’m leaving *on time.*', x: 540, y: 1780 },
    { t0: 21.4, t1: 23.4, who: 'venus', text: 'Look at you. *Off* the clock.', y: 300 },
    { t0: 23.8, t1: 25.9, who: 'pisces', text: 'sticky notes are *tissues* now', x: 560, y: 1780, tail: 300 },
  ],
  fx: [
    ['slamTitle', { at: -1, text: 'CAPRICORN. Love | isn’t a *promotion.*', top: 160, size: 100, out: [2.6, 2.8] }],
    ['whipZoom', { at: 0.38, from: 1.4, len: 0.4 }],
    ['screenShake', { at: 0.4, len: 0.5, amp: 26 }],
    ['caught', { at: 3.8, x: 470, y: 1137, r: 230, ry: 52, label: 'Q4???', arrow: 'tr', rec: false, out: [7.3, 7.5] }],
    ['screenShake', { at: T.shut, len: 0.35, amp: 16 }],
    ['notification', { at: T.notif, out: [21.4, 21.7], title: 'texts', body: 'friend: still on for *friday?*', glyph: '♑' }],
    ['slamTitle', { at: T.last, text: 'Worthy *before* | the goal.', top: 170, size: 112 }],
  ],
  back(x, t) { sheetBlast(x, t); clock(x, t); sticky(x, t) },
  mid(x, t) { desk(x, t); plan(x, t) },
  front(x, t) {
    sparkleBurst(x, t, 870, 820, T.flipNote + 0.3, { R: 200 })
    void lerp; void rich; void ROSE
  },
  cues: [
    ['whoosh', T.plan[0], 0.35, 0.05], ['pop', T.plan[0] + 0.3, 880, 0.04, 0],
    ['bell', T.six, 1046.5, 0.06, 1.6, -0.4], ['bell', T.six + 0.4, 1046.5, 0.04, 1.4, -0.4],
    ['whoosh', T.shut - 0.25, 0.25, 0.05], ['boom', T.shut, 0.22], ['tick', T.shut, 0.08],
    ['whoosh', T.flipNote, 0.3, 0.04], ['pop', T.flipNote + 0.3, 1318.51, 0.05, 0.3], ['glitter', T.flipNote + 0.3, T.flipNote + 0.7],
    ...sobCues(T.sob, 4),
  ],
})
export const { DURATION, SCENES, CUES } = EP
