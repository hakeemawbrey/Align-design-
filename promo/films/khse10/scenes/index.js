// khse10: ZODIAC HOT SEAT, "Capricorn booked the hot seat" (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Capricorn mid-glance at a big wristwatch, a meeting invite "HOT SEAT · 3:00–3:02" mid-slide across
//         the lens; the hook "Capricorn booked this *in the calendar.*" landed. 0.3 a loading bar: "squeezing in
//         feelings…" stalls at 12%.  Q1 "Last day off?" → "…loading."  Q2 "Reply speed?" → "business hours."
//   the last question (silence): "When did you last rest without guilt?" → "…can I get back to you?"
//   THE STARS: "Rest isn't a *reward.* It's allowed."  Hard cut.
import { makeHotSeat, HK, box, R, label, prog, ease, lerp, INK, BONE, RED, INTER, MONO } from '../../khse01/scenes/hotkit.js'

function invite(x, t, k) {
  const p = ease.outCubic(prog(t, -0.6, 1.2))
  x.save(); x.globalAlpha = k; x.translate(lerp(1000, 760, p), 760); x.rotate(0.06)
  box(x, -190, -70, 380, 140, BONE, { b: 7 }); R(x, '#4f7cd8', -190, -70, 16, 140)
  label(x, 'HOT SEAT', -160, -30, { size: 38, col: INK, font: INTER, weight: 800, align: 'left' })
  label(x, '3:00 – 3:02', -160, 22, { size: 30, col: '#4f7cd8', font: MONO, weight: 700, align: 'left' })
  x.restore()
}
function watch(x, t, cx, cy) {
  box(x, cx - 18, cy - 70, 36, 140, '#5a5470', { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 46, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, 38, 0, Math.PI * 2); x.fill()
  x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + 30 * Math.sin(t * 6), cy - 30 * Math.cos(t * 6)); x.stroke()
  x.strokeStyle = INK; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + 18, cy - 10); x.stroke()
}
const LOAD = { at: 0.3, len: 1.1, label: 'squeezing in feelings…', stallAt: 12, error: null, y: 1480 }

const EP = makeHotSeat({
  id: 'khse10', sign: 'capricorn', name: 'Capricorn', accent: '#8fb0d8',
  hook: 'Capricorn booked this | *in the calendar.*',
  breakFx: 'none', fx: [[HK.loadingBar, HK.loadingBarCues, LOAD]],
  hero0: { x: 520, y: 1036, s: 290, mood: 'squint', rot: -0.05, look: [1, 1] },
  frame0(x, t, S) { invite(x, t, S.k); x.save(); x.globalAlpha = S.k; watch(x, t, 720, 1010); x.restore() },
  qs: [
    { q: 'Last *day off?*', a: '…loading.', mood: 'squint' },
    { q: 'Reply *speed?*', a: 'business hours.', mood: 'neutral' },
  ],
  final: { q: 'When did you last rest *without guilt?*', a: '…can I get back to you?', mood: 'neutral', endMood: 'happy' },
  last: 'Rest isn’t a *reward.* It’s allowed.',
  ending: 'cut',
  music: { style: 'chiptune', key: 'G', seed: 3510 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
