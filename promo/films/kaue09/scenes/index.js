// kaue09 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E09 "Booked the solo trip at 1 a.m." (15 s, synthwave · Bm, loop).
//   0.0  Frame 0: Sagittarius mid-leap onto an overstuffed suitcase, clothes flying. Hook "Booked it. At *1 a.m.*"
//   1.0  loading bar "booking…" → 100%   3.4 the ticket pops: PASSENGERS: 1 · SEAT 12A WINDOW → 3.8 ★ PASSPORT STAMPED · PARTY OF ONE
//   6.2  the plane: Sag at the window, clouds rolling past → 7.0 ★ WINDOW SEAT SECURED
//   9.0  Pisces cam crying at the clouds: "bring me a postcard"
//   10.6 last line "One seat. *Window* seat." · 14.6–15.0 loops back into the leap.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, label, sparkles, hearts, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, RED } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawSagHome } from '../../st9saghome.js'

const CLOTH = ['#ff5c8a', '#7fd0ff', '#ffd24a', '#9fe6b0', '#c9a6ff', '#f0603a']
function suitcase(x, t, sq) {
  x.save(); x.translate(540, 1420); x.scale(1 + sq, 1 - sq)
  box(x, -260, -190, 520, 200, '#3f6ad8', { b: 8, hi: '#5f8af0' }); R(x, '#2a4ab0', -260, -100, 520, 12)
  box(x, -60, -230, 120, 40, '#2a2448', { b: 6 })
  for (const k of [-1, 1]) R(x, '#ffd24a', k * 180 - 10, -190, 20, 200)
  // clothes poking out
  for (let k = 0; k < 6; k++) R(x, CLOTH[k], -230 + k * 80, -200 - (k % 2) * 16, 60, 26)
  x.restore()
}
function ticket(x, t, k) {
  x = x
  if (k <= 0) return
  x.save(); x.translate(540, 940); x.rotate(-0.06); x.scale(k * 0.8, k * 0.8)
  box(x, -300, -110, 600, 220, BONE, { b: 8 })
  R(x, RED, -300, -110, 600, 50); label(x, 'BOARDING PASS', 0, -84, { size: 30, col: BONE })
  label(x, 'PASSENGERS: 1', -40, -14, { size: 34, col: INK })
  label(x, 'SEAT 12A · WINDOW', -40, 36, { size: 30, col: INK })
  for (let i = 0; i < 9; i++) R(x, INK, 200 + (i % 3) * 22, -30 + Math.floor(i / 3) * 22, 14, 14)
  x.restore()
}
function plane(x, t) {
  R(x, '#3a3f5e', 0, 0, 1080, 1920)
  for (let i = 0; i < 1920; i += 160) R(x, '#33374f', 0, i, 1080, 6)
  // the oval window
  const X = 640, Y = 880
  x.save(); x.beginPath(); x.ellipse(X, Y, 220, 300, 0, 0, Math.PI * 2); x.clip()
  const g = x.createLinearGradient(0, Y - 300, 0, Y + 300); g.addColorStop(0, '#5fa8ff'); g.addColorStop(1, '#ffd2a8'); x.fillStyle = g; x.fillRect(X - 230, Y - 310, 460, 620)
  for (let k = 0; k < 6; k++) { const cx = X + 300 - ((t * 120 + k * 160) % 760), cy = Y - 160 + k * 70; R(x, '#ffffff', cx - 70, cy, 140, 40); R(x, '#ffffff', cx - 40, cy - 24, 80, 30) }
  x.restore()
  x.lineWidth = 26; x.strokeStyle = '#8a8fa8'; x.beginPath(); x.ellipse(X, Y, 232, 312, 0, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 8; x.strokeStyle = INK; x.beginPath(); x.ellipse(X, Y, 246, 326, 0, 0, Math.PI * 2); x.stroke()
  // the seat back
  box(x, 80, 1080, 340, 760, '#3a4a8a', { b: 8, hi: '#4a5aa0' })
}
function scene(x, t, S) {
  if (S.i < 2) {
    daySky(x, t, { hour: 1 })
    drawSagHome(x, t, { room: 'bed', dark: 0.35, lamp: 1 })
    const land = prog(t, 0, 0.5)
    const sq = t > 0.5 ? 0.12 * Math.exp(-(t - 0.5) * 7) * Math.cos((t - 0.5) * 22) : -0.06
    suitcase(x, t, sq)
    const y = lerp(1000, 1140, ease.inCubic(land))
    hero(x, t, 'sagittarius', 540, y, 320, { mood: t < 0.5 ? 'wide' : t < 3.4 ? 'squint' : 'sparkle', look: [0, -1], squash: t < 0.5 ? -0.12 : sq, seed: 11, hops: [3.5, 3.9], blink: t < 0.5 ? false : undefined })
    // clothes flying at the leap
    if (t < 2) for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + (k - 4.5) * 0.32, v = 700 + (k % 3) * 120, tt = t + 0.25; R(x, CLOTH[k % 6], 540 + Math.cos(a) * v * tt - 30, 1250 + Math.sin(a) * v * tt + 900 * tt * tt, 60, 26) }
    ticket(x, t, ease.outBack(prog(t, 3.4, 3.75)) * (1 - ease.inCubic(prog(t, 5.8, 6.1))))
    sparkles(x, t, 540, 900, 3.8, 12, 340, 0.3)
  } else {
    plane(x, t)
    hero(x, t, 'sagittarius', 360, 1100, 300, { mood: t < 7 ? 'sparkle' : 'happy', look: [1, -1], seed: 11, hops: [6.4, 7.1] })
    hearts(x, t, 7.1, 600, 1000, { n: 6 })
  }
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 15, ending: 'loop', key: 'Bm',
  shots: [{ at: 0, cam: [1.5, 540, 1180] }, { at: 3.3, cam: [1.45, 540, 1150], noBlink: true, silent: true }, { at: 6.2, cam: [1.05, 540, 1000] }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 540, cy: 1200 }, { at: 6.2, from: 1.4 }],
  shakes: [{ at: 0.5, dur: 0.4, amp: 22 }],
  kit: [['loadingBar', { at: 1.0, len: 2.3, label: 'booking…', stallAt: 100, error: null, y: 760 }]],
  hook: { text: 'Booked it. | At *1 a.m.*', out: 1.0 },
  bubbles: [{ at: 7.6, out: 9.2, x: 380, y: 860, text: 'hi, clouds. it’s just me.', tail: 0 }],
  achs: [
    { at: 3.8, out: 5.8, title: 'PASSPORT STAMPED', sub: 'party of one', xp: 300, icon: 'star', y: 1150 },
    { at: 7.0, out: 8.8, title: 'WINDOW SEAT SECURED', xp: 300, icon: 'heart' },
  ],
  cams: [{ at: 9.0, out: 12.0, line: 'bring me a postcard', lineAt: 9.4, tears: 3, y: 1360 }],
  last: { at: 10.6, text: 'One seat. | *Window* seat.', top: 330, out: 14.5 },
})
