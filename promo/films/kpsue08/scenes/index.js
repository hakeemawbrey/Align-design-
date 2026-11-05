// kpsue08: PLANET TALK: THE SUN, Ep 8 "Scorpio Opens One Window" (26 s vertical, star_advice post, cinematic · Fm). Loop.
// Frame 0: the Sun mid-drop in front of Scorpio's fortress wall, padlocks clicking shut, hook "SCORPIO. Open one window."
//   3.0 Scorpio: third date, favourite food? "classified" · 6.2 SHARED SO FAR · 8.2 "if I share, they could leave"
//   10.6 Sun: trust grows a little at a time · 14.4 share one small true thing · 17.0 the window opens: "I cry at
//   cartoons" · 19.6 the date: me too · 20.0 Pisces cries · 22.8 "One window. Fresh air." → loops to the drop.
import { episode, drawPanel, rr, INK } from '../../kpsue01/sunkit.js'
import { notification, notificationCues } from '../../hookkit.js'

const NOTIF = { at: 19.6, out: [22.6, 22.9], title: 'the date', body: 'me too. the one with the lost puppy? *every time.*', glyph: '♏', time: 'now', y: 120 }
const ROWS = [{ at: 6.4, text: 'name (probably)' }, { at: 6.8, text: 'favourite food: classified' }, { at: 7.2, text: 'feelings: lol', color: '#c23a3a' }]

function fortress(x, t) {
  x.save()
  const top = 1150
  x.fillStyle = '#2a1a3e'; x.fillRect(0, top, 1080, 520)
  // battlements
  for (let i = 0; i < 9; i++) { x.fillStyle = '#2a1a3e'; x.fillRect(i * 130, top - 60, 80, 62) }
  x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 4
  for (let j = 0; j < 7; j++) for (let i = 0; i < 9; i++) x.strokeRect(i * 130 - (j % 2) * 65, top + j * 70, 130, 70)
  x.fillStyle = 'rgba(150,40,90,0.15)'; x.fillRect(0, top, 1080, 520)
  // the window (right): shutters open at 17.0
  const wx = 830, wy = 1290, k = Math.min(1, Math.max(0, (t - 17.0) / 0.5)), ko = k * k * (3 - 2 * k)
  x.fillStyle = INK; rr(x, wx - 100, wy - 110, 200, 220, 14); x.fill()
  const g = x.createLinearGradient(0, wy - 100, 0, wy + 100); g.addColorStop(0, '#ffd98a'); g.addColorStop(1, '#ff9a6a')
  x.fillStyle = g; rr(x, wx - 88, wy - 98, 176, 196, 10); x.fill()
  if (k > 0) { x.globalAlpha = 0.35 * ko; const lg = x.createRadialGradient(wx, wy, 20, wx, wy, 360); lg.addColorStop(0, '#ffe7a0'); lg.addColorStop(1, 'rgba(255,231,160,0)'); x.fillStyle = lg; x.fillRect(wx - 360, wy - 360, 720, 720); x.globalAlpha = 1 }
  for (const s of [-1, 1]) {
    x.save(); x.translate(wx + s * 88, wy); x.scale(1 - ko * 1.6, 1)
    x.fillStyle = '#5a3a2a'; x.fillRect(s > 0 ? -88 : 0, -98, 88, 196); x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(s > 0 ? -88 : 0, -98, 88, 196)
    x.restore()
  }
  // the big door (left) with padlocks
  x.fillStyle = INK; rr(x, 70, 1250, 210, 310, [100, 100, 0, 0]); x.fill(); x.fillStyle = '#4a2a1e'; rr(x, 82, 1262, 186, 298, [92, 92, 0, 0]); x.fill()
  for (let i = 0; i < 4; i++) {
    const lt = -0.6 + i * 0.25, sh = t < lt ? -18 : t < lt + 0.12 ? -18 * (1 - (t - lt) / 0.12) : 0
    const lx = 175, ly = 1320 + i * 60
    x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.arc(lx, ly - 10 + sh, 16, Math.PI, 0); x.stroke()
    x.fillStyle = '#e9b24a'; rr(x, lx - 22, ly - 10, 44, 34, 6); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; rr(x, lx - 22, ly - 10, 44, 34, 6); x.stroke()
  }
  x.restore()
}

const E = episode({
  sign: 'scorpio', duration: 26, ending: 'loop',
  entrance: { kind: 'drop', at: -1.0, x: 540, y: 560, size: 500 },
  hook: { text: 'SCORPIO. Open | *one* window.', top: 830 },
  tint: '#a03a7a',
  sun: { mood: [[0, 'wide'], [0.6, 'neutral'], [3.0, 'sly'], [6.2, 'wide'], [8.2, 'sad'], [10.6, 'happy'], [14.4, 'proud'], [17.0, 'wide'], [17.6, 'love'], [22.8, 'happy']], hops: [10.6, 14.4, 17.2] },
  me: {
    base: { x: 540, y: 1420, size: 300 },
    mood: [[0, 'squint'], [3.0, 'squint'], [6.2, 'neutral'], [8.2, 'sleepy'], [10.6, 'neutral'], [14.4, 'wide'], [17.0, 'sparkle'], [19.6, 'wide'], [20.2, 'happy'], [25.2, 'squint']],
    look: [[0, [-1, 0]], [3.0, [0, 0]], [6.2, [0, -1]], [17.0, [1, -1]], [19.6, [0, -1]], [25.2, [-1, 0]]],
    tears: [[0, 0], [17.4, 1], [22.6, 0]],
  },
  bubbles: [
    { t0: 3.0, t1: 6.0, who: 'scorpio', text: 'Third date. They asked my favourite food. I said *“classified.”*' },
    { t0: 8.2, t1: 10.4, who: 'scorpio', text: 'If I share, they could *leave.*' },
    { t0: 10.6, t1: 14.2, who: 'sun', text: 'Trust grows a little at a time. You don’t open the *whole* fortress.', y: 1060 },
    { t0: 14.4, t1: 16.8, who: 'sun', text: 'Share one small true thing. *Just one.*', y: 1060 },
    { t0: 17.0, t1: 19.4, who: 'scorpio', text: '…I cry at *cartoons.*' },
    { t0: 20.6, t1: 22.6, who: 'pisces', text: 'Cartoons?! Same. *Crying now.*' },
    { t0: 22.8, t1: 25.5, who: 'scorpio', text: 'One window. *Fresh air.*', size: 54, x: 470, maxW: 700, tail: 60 },
  ],
  pisces: { at: 20.0, out: [25.3, 25.6], tears: [[20.0, 3]], hops: [20.6, 21.0] },
  fx: [notification(NOTIF)], fxCues: notificationCues(NOTIF),
  back: fortress,
  front(x, t) {
    const p = Math.min(1, Math.max(0, (t - 6.1) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - 10.3) / 0.3)))
    if (p > 0.01) drawPanel(x, t, { x: 540, y: 1010, w: 700, h: 320, title: 'SHARED SO FAR', color: '#d06a9a', pop: p, rows: ROWS, size: 38 })
  },
  cues: [...[0, 1, 2, 3].map(i => ['tick', +Math.max(0.02, -0.6 + i * 0.25 + 0.1).toFixed(2), 0.07]), ...ROWS.map((r, i) => ['pop', r.at, 659.25 + i * 80, 0.03, 0.2]), ['whoosh', 17.0, 0.5, 0.08], ['bell', 17.2, 783.99, 0.05, 2.4, 0.3], ['glitter', 17.1, 17.8]],
})
export const { DURATION, SCENES, CUES } = E
