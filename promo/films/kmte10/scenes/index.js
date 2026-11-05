// kmte10: MIRROR TALK No. 10, "Too busy to be loved." (20 s vertical, star_advice post, house · D). Hard cut.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Capricorn mid-juggle of three calendars, two alarms ringing, a laptop mid-slide along the shelf.
//          Hook "Too busy for love. | (*Lie.*)"  1.0: the calendars slam together into one week, every slot full.
//   2.8    "Every slot. *Booked.*"  CAP: "I'll date when things *calm down*."  REFLECTION: "when did things last *calm down*?"
//   8.2    CAP: "…2019?"  record scratch: "spoiler: they *don't.*"
//   10.4   REFLECTION: "you'd tell a friend: leave one *evening* free."  13.0: Capricorn drags FRIDAY 7 PM out → OPEN;
//          the week exhales. 15.4: a pencilled heart in the open slot.  Pisces cries at the empty slot.
//   18.4   last line "Pencil in | a *heart.*"  Hard cut at 20.
import { makeMirror, hearts, sparkles, drawBits, HEART, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, BONE, GOLD, r3, INTER, MONO } from '../../kmte01/mirrorkit.js'

const T = { slam: 1.0, s1: 3.2, m1: 5.6, s2: 8.2, rec: 8.75, m2: 10.4, drag: [13.0, 13.6], exhale: 13.7, pencil: [15.4, 16.2], last: 18.4 }
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const SLOT = ['meeting', 'gym', 'emails', 'meeting about the meeting', 'laundry', 'call back', 'prep', 'meeting', 'catch up', 'errands', 'review', 'plan the plan']
const CAL = { cx: 540, top: 530, w: 560, h: 370 }

function week(x, t) {
  const k = easeOutBack(prog(t, T.slam - 0.1, T.slam + 0.25), 1.8) * outK(t, [T.last - 0.15, T.last + 0.2])
  if (k <= 0.01) return
  const ex = t > T.exhale ? 1 + 0.06 * Math.exp(-(t - T.exhale) * 4) * Math.sin((t - T.exhale) * 14) : 1
  const { cx, top, w, h } = CAL
  x.save(); x.translate(cx, top + h / 2); x.scale(k * ex, k * ex); x.translate(-w / 2, -h / 2)
  R(x, 'rgba(6,4,18,0.45)', 14, 18, w, h)
  box(x, 0, 0, w, h, '#fff4dc', { b: 6 })
  R(x, '#2a1f55', 0, 0, w, 48)
  x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const cw = w / 7, rh = (h - 58) / 4
  DAYS.forEach((d, i) => { x.fillStyle = i === 4 ? GOLD : BONE; x.fillText(d, cw * i + cw / 2, 25) })
  for (let i = 0; i < 7; i++) for (let j = 0; j < 4; j++) {
    const X = cw * i + 4, Y = 54 + rh * j + 3
    const target = i === 4 && j === 3
    let dx = 0, open = false
    if (target && t > T.drag[0]) { dx = ease.inCubic(prog(t, ...T.drag)) * 700; open = t > T.drag[1] }
    if (open) {
      const ok = pop01(t, T.drag[1], 0.3, 2.4)
      x.save(); x.translate(X + (cw - 8) / 2, Y + (rh - 6) / 2); x.scale(ok, ok)
      R(x, '#2fbf71', -(cw - 8) / 2, -(rh - 6) / 2, cw - 8, rh - 6)
      x.font = `800 18px ${INTER}`; x.fillStyle = '#fff'; x.fillText('OPEN', 0, -10); x.font = `700 15px ${MONO}`; x.fillText('7 PM', 0, 12)
      x.restore()
      // the pencilled heart
      const pp = prog(t, ...T.pencil)
      if (pp > 0) { x.save(); x.beginPath(); x.rect(X, Y, (cw - 8) * pp, rh - 6); x.clip(); drawBits(x, HEART, { H: '#ff4f86' }, X + (cw - 8) / 2, Y + (rh - 6) / 2 + 2, 4.2, { outline: '#fff' }); x.restore() }
      continue
    }
    const col = ['#ffb3c1', '#9fd8f6', '#ffe27a', '#c9f0c8'][(i + j) % 4]
    R(x, col, X + dx, Y, cw - 8, rh - 6)
    x.font = `700 13px ${INTER}`; x.fillStyle = INK
    const s = SLOT[(i * 4 + j) % SLOT.length]
    const ws = s.split(' '); const L = ws.length > 2 ? [ws.slice(0, 2).join(' '), ws.slice(2).join(' ')] : [s]
    L.forEach((q, n) => x.fillText(q, X + dx + (cw - 8) / 2, Y + (rh - 6) / 2 + (n - (L.length - 1) / 2) * 15, cw - 12))
  }
  x.restore()
}
function miniCal(x, cx, cy, rot, k) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -50, -44, 100, 88, '#fff4dc', { b: 5 }); R(x, '#e8344e', -50, -44, 100, 24)
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) R(x, '#3a2a5a', -38 + i * 28, -8 + j * 24, 18, 14)
  x.restore()
}
function alarm(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const sh = Math.sin(t * 60) * 5
  x.save(); x.translate(cx + sh, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 44, 0, 7); x.fill(); x.fillStyle = '#ff6b7f'; x.beginPath(); x.arc(0, 0, 38, 0, 7); x.fill()
  x.fillStyle = '#fff4dc'; x.beginPath(); x.arc(0, 0, 28, 0, 7); x.fill()
  R(x, INK, -3, -20, 6, 22); R(x, INK, 0, -3, 16, 6)
  for (const d of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.arc(d * 30, -40, 16, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(d * 30, -40, 11, 0, 7); x.fill() }
  x.strokeStyle = '#fff'; x.lineWidth = 5
  for (const d of [-1, 1]) for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(d * (58 + i * 4), -30 + i * 22); x.lineTo(d * (78 + i * 6), -40 + i * 26); x.stroke() }
  x.restore()
}

const F = makeMirror({
  id: 'kmte10', sign: 'capricorn', dur: 20,
  hook: { text: 'Too busy for love. | (*Lie.*)', accentColor: '#ff6b7f', out: [2.6, 2.85] },
  fx: [
    { k: 'screenShake', at: 0.0, amp: 14, len: 1.0, freq: 30 },
    { k: 'screenShake', at: T.slam + 0.1, amp: 22, len: 0.45 },
    { k: 'whipZoom', at: T.m1 - 0.08, from: 1.3 },
    { k: 'recordScratch', at: T.rec, len: 1.3, caption: 'spoiler: they *don’t.*', top: 990 },
    { k: 'whipZoom', at: T.m2 - 0.08, from: 1.25 },
    { k: 'whipZoom', at: T.drag[1] - 0.05, from: 1.2 },
  ],
  caps: [
    { at: 2.9, out: [10.1, 10.3], text: 'Every slot. | *Booked.*', accent: '#ff6b7f' },
    { at: 10.35, out: [18.1, 18.3], text: 'One evening. | *Open.*', accent: '#7dffb0' },
    { at: T.last, out: [99, 100], text: 'Pencil in | a *heart.*', accent: '#ffd36b', size: 104, accentSize: 140, gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: "I'll date when things *calm down*." },
    { t: T.m1, who: 'M', text: 'when did things last *calm down*?' },
    { t: T.s2, who: 'S', text: '…*2019*?' },
    { t: T.m2, who: 'M', text: "you'd tell a friend: leave one *evening* free." },
  ],
  boxes: [[3.0, 13.4]],
  pose(t) {
    const b = ease.outCubic(prog(t, T.slam, T.slam + 0.5))
    const p = { x: lerp(420, 300, b), y: lerp(1150, 1225, b), s: lerp(300, 280, b), mood: 'wide', look: [0, -1], blink: false, squash: t < T.slam ? 0.05 * Math.sin(t * 30) : 0 }
    if (t > T.slam + 0.4) { p.mood = 'squint'; p.look = [1, -0.8]; p.blink = undefined }
    if (t > T.s1) { p.mood = 'neutral'; p.look = [1, -0.6] }
    if (t > T.m1) { p.mood = 'wide'; p.look = [1, -1] }
    if (t > T.s2) { p.mood = 'neutral'; p.look = [0, -1] }
    if (t > T.m2) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.drag[1]) { p.mood = 'happy'; p.look = undefined }
    if (t > T.pencil[1]) p.mood = 'heart'
    return p
  },
  signHops: [T.drag[0], T.pencil[1] + 0.2],
  refl(t) {
    const p = { x: 690, y: 1060, s: 200, mood: 'neutral', look: [-1, 0.4] }
    if (t < T.slam) { p.x = 560; p.y = 1000; p.s = 240; p.mood = 'wide'; p.look = [0, -1] }
    if (t > T.m1) p.mood = 'happy'
    if (t > T.s2 + 0.4 && t < T.m2) p.mood = 'eyeroll'
    if (t > T.m2) p.mood = 'happy'
    if (t > T.drag[1]) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { tears: 1, mood: 'wide' }
    if (t > T.m2) p.tears = 2
    if (t > T.drag[1]) { p.tears = 3; p.mood = 'sparkle' }
    return p
  },
  tissuePulls: [T.drag[1] + 0.2, T.drag[1] + 0.6, T.pencil[1]],
  front(x, t) {
    // frame 0: the juggle, alarms, the laptop sliding
    if (t < T.slam) {
      for (let i = 0; i < 3; i++) {
        const a = t * 7 + i * 2.1
        miniCal(x, 420 + Math.cos(a) * 170, 860 - Math.abs(Math.sin(a)) * 170, a * 0.5, 1)
      }
    }
    if (t > T.slam - 0.15 && t < T.slam + 0.05) for (let i = 0; i < 3; i++) { const p = prog(t, T.slam - 0.15, T.slam); miniCal(x, lerp(420 + (i - 1) * 160, 540, p), lerp(800, 700, p), 0, 1 - p * 0.5) }
    const ak = 1 - prog(t, T.slam + 0.3, T.slam + 0.6)
    alarm(x, t, 150, 980, ak); alarm(x, t + 0.03, 930, 860, ak)
    const lap = prog(t, -0.8, 0.9)
    if (t < 1.2) { x.save(); x.translate(lerp(560, 760, ease.outCubic(lap)), 1192); x.rotate(0.05); R(x, INK, -84, -50, 168, 56); R(x, '#5a5470', -78, -44, 156, 44); R(x, '#9fd8f6', -70, -38, 140, 32); R(x, INK, -96, 4, 192, 14); R(x, '#8f8ab2', -92, 6, 184, 8); x.restore() }
    week(x, t)
    sparkles(x, t, CAL.cx + 132, CAL.top + 300, T.drag[1], 10, 120, 2, ['#7dffb0', BONE, GOLD])
    hearts(x, t, T.pencil[1], CAL.cx + 132, CAL.top + 300, { n: 6, cell: 6, spread: 120 })
  },
  cues: [
    ...Array.from({ length: 10 }, (_, i) => ['pluck', r3(i * 0.09), i % 2 ? 2093 : 2349.32, 0.014, 0.08, i % 2 ? -0.6 : 0.6]),
    ['whoosh', 0.1, 0.4, 0.03], ['whoosh', 0.5, 0.4, 0.03],
    ['boom', T.slam + 0.1, 0.2], ['pop', T.slam + 0.12, 587.33, 0.05, 0],
    ['whoosh', T.drag[0], 0.6, 0.04], ['pop', T.drag[1], 1174.66, 0.05, 0.2], ['bell', T.drag[1] + 0.05, 2349.32, 0.025, 1.0, 0.2], ['glitter', T.drag[1], T.drag[1] + 0.4],
    ['swell', T.exhale - 0.1, T.exhale + 0.7, { gain: 0.03, f0: 400, f1: 3000 }],
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.pencil[0] + i * 0.1), 0.02]),
    ['bell', T.last + 0.5, 1760, 0.03, 1.0, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
