// kute24: THE UNSENT TEXT, "One text, all night" (60 s vertical trial reel, music: dreamy · E).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   A long episode (60 s): one text to an ex-best-friend after a falling out, drafted all night, chaptered by the clock.
//   0.00 frame 0: Pisces mid-sob, tears on the screen, "you know EXACTLY what you did" mid-delete · hook "One text. All night. *Wait* for the reply."
//   11:04 PM ANGRY   0–9    the angry one ✗ · "and honestly? i'm done" ✗ (wipe)
//   11:58 PM SAD     9–18   "i guess we're done" ✗ · "i didn't mean all of it" ✗
//   1:12 AM PETTY   18–27   a notification (Vee shared a new photo) · "good for you, really" ✗ · "saw you're doing great." ✗
//   2:30 AM HONEST  27–33   "i miss us" (kept)
//   3:00 AM         33–42   the screen dims; THE STARS: "Sleep. The *true* one keeps." · Pisces sleeps, the sky warms to morning
//   9:00 AM SENT    42–60   "i'm sorry for my part. i miss you. coffee?" → SENT · typing… · "i've missed you so much" · Pisces happy-sobs · last line
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'
import { chapter, chapterCues, notification, notificationCues } from '../../hookkit.js'
// the night turns to morning behind everything: a warm wash rising from 38 s, full by 42 s
function morning(c, t) {
  const k = ease.inOutCubic(clamp((t - 38) / 4))
  if (k <= 0) return
  const g = c.createLinearGradient(0, 1920, 0, 0)
  g.addColorStop(0, `rgba(255,184,120,${0.55 * k})`); g.addColorStop(0.55, `rgba(255,143,177,${0.25 * k})`); g.addColorStop(1, 'rgba(255,143,177,0)')
  c.fillStyle = g; c.fillRect(0, 0, 1080, 1920)
  c.save(); c.globalAlpha = k; c.fillStyle = INK; c.beginPath(); c.arc(900, 1640 - 120 * k, 96, 0, Math.PI * 2); c.fill(); c.fillStyle = '#ffd36b'; c.beginPath(); c.arc(900, 1640 - 120 * k, 88, 0, Math.PI * 2); c.fill(); c.restore()
}
// while Pisces sleeps, a time-lapse clock spins from 3:00 to 9:00 next to them
function clockSpin(c, t) {
  const p = clamp((t - 36.2) / 5.4), hr = 3 + 6 * p, cx = 175, cy = 900
  box(c, cx - 70, cy - 70, 140, 140, BONE, { b: 6 }); R(c, '#c9a6ff', cx - 70, cy - 70, 140, 14)
  const a = (hr % 12) / 12 * Math.PI * 2
  c.save(); c.translate(cx, cy + 6); c.strokeStyle = INK; c.lineCap = 'square'; c.lineWidth = 9; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(a) * 34, -Math.cos(a) * 34); c.stroke()
  c.lineWidth = 5; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(a * 12) * 50, -Math.cos(a * 12) * 50); c.stroke(); c.restore()
  label(c, `${Math.floor(hr)}:${String(Math.floor((hr % 1) * 60)).padStart(2, '0')} AM`, cx, cy + 104, { size: 30, col: GOLD })
}
const EP = makeUnsent({
  id: 'kute24', duration: 60,
  sign: 'pisces', name: 'Pisces', ending: 'cut', pisHero: true, pis: false,
  hook: 'One text. All night. | *Wait* for the reply.', hookOut: [3.0, 3.3],
  to: 'Vee', avatar: '#ffd36b',
  header: t => ({ status: t < 9 ? '11:04 pm' : t < 18 ? '11:58 pm' : t < 27 ? '1:12 am' : t < 33 ? '2:30 am' : t < 42 ? '3:00 am' : '9:00 am', statusCol: t < 42 ? '#c9a6ff' : '#ffd36b' }),
  draftNo: (t, st) => st.k >= 0 && !(t > 33 && t < 42.5) ? `DRAFT ${st.k + 1}` : null,
  msgs: [
    { text: 'honestly i can’t believe you said that', at: -9, stamp: 'tonight 10:47 pm' },
    { text: 'i’ve missed you so much', at: 50.6, typing: [47.4, 50.6] },
    { text: 'yes. 10am. same spot?', at: 53.2, typing: [51.4, 53.2] },
  ],
  drafts: [
    { text: 'you know EXACTLY what you did', at: -2.4, cps: 14, del: -0.35, delCps: 12 },
    { text: 'and honestly? i’m done', at: 2.8, cps: 14, del: 5.2, wipe: true },
    { text: 'i guess we’re done', at: 9.8, cps: 11, del: 13.0, delCps: 18 },
    { text: 'i didn’t mean all of it', at: 14.0, cps: 13, del: 16.8, wipe: true },
    { text: 'good for you, really', at: 20.6, cps: 13, del: 23.0, delCps: 24 },
    { text: 'saw you’re doing great.', at: 23.6, cps: 15, del: 25.8, wipe: true },
    { text: 'i miss us', at: 28.2, cps: 7, hide: 42.4 },
    { text: 'i’m sorry for my part. i miss you. coffee?', at: 43.0, cps: 15, send: 46.6 },
  ],
  breaks: [{ kind: 'whip', at: 0.3, from: 1.6 }, { kind: 'whip', at: 9.0, from: 1.3 }, { kind: 'whip', at: 18.0, from: 1.3 }, { kind: 'whip', at: 27.0, from: 1.3 }, { kind: 'flash', at: 42.0, amt: 0.8 }],
  effects: [
    ...[[1, '11:04 PM · ANGRY', 3.3, 8.6], [2, '11:58 PM · SAD', 9.2, 17.6], [3, '1:12 AM · PETTY', 18.2, 26.6], [4, '2:30 AM · HONEST', 27.2, 32.8], [5, '3:00 AM', 33.2, 41.6], [6, '9:00 AM · SENT', 42.2, 49.0]].map(([n, title, at, o]) =>
      ({ fx: chapter, cues: chapterCues, o: { at, out: [o, o + 0.3], n, title, y: 250, color: n === 6 ? '#ffd36b' : '#c9a6ff' } })),
    { fx: notification, cues: notificationCues, o: { at: 18.9, out: [21.0, 21.3], title: 'photos', body: 'Vee shared a *new photo*', glyph: '♉', time: '1:12 am' } },
  ],
  moods: [[-9, 'wide', [1, -0.6]], [2.8, 'squint', [1, -0.3]], [5.2, 'wide', [0, 0]], [9.8, 'sparkle', [1, -0.3]], [13.0, 'wide', [0, 0]], [14.0, 'sparkle', [1, -0.3]],
    [18.9, 'wide', [1, -0.8]], [20.6, 'eyeroll', [1, -0.3]], [23.0, 'squint', [1, -0.3]], [25.8, 'wide', [0, 0]], [28.2, 'sparkle', [1, -0.3]],
    [34.6, 'sleepy', [0, 0]], [42.0, 'wide', [0, 0]], [43.0, 'sparkle', [1, -0.3]], [46.6, 'wide', [0, 0]], [50.6, 'heart', [0, 0]], [53.2, 'happy', [0, 0]]],
  heroTears: t => t < 18 ? 3 : t < 27 ? 1 : t < 33 ? 3 : t < 42 ? 1 : t < 50.6 ? 1 : 3,
  heroHops: [-0.25, 0.1, 0.3, 50.6, 50.9, 51.2, 53.2, 53.5],
  screen: (c, t, S) => { const k = clamp((t - 33.2) / 0.6) * (1 - clamp((t - 41.9) / 0.2)); if (k > 0) { c.save(); c.globalAlpha = 0.85 * k; c.fillStyle = '#05030c'; c.fillRect(S.SCR.x, S.SCR.y, S.SCR.w, S.SCR.h); c.restore() } },
  back: (c, t) => morning(c, t),
  front: (c, t) => { if (t > 50.6) { hearts(c, t, 50.7, 220, 1050, { n: 7, cell: 7 }); hearts(c, t, 53.3, 220, 1050, { n: 7, cell: 7 }); hearts(c, t, 55.8, 220, 1050, { n: 7, cell: 7 }) } if (t > 36 && t < 42) clockSpin(c, t) },
  segs: [
    { lines: [{ t: 34.0, text: 'Sleep. The *true* one keeps.' }], close: 37.6 },
    { lines: [{ t: 57.6, text: 'Slept on it. *Still* meant it.' }] },
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
