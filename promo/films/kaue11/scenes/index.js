// kaue11 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E11 "A kitchen dance party for one" (14 s, house · Eb, loop).
//   0.0  Frame 0: Aquarius mid-spin with a wooden-spoon microphone, socks sliding. Hook "Kitchen concert. Audience: *zero.*"
//   0.8  the fridge light turns disco → 2.6 ★ KITCHEN CONCERT · SOLD OUT (1 seat)
//   4.4  the sock slide across the floor, "thank you, kitchen!!" → 6.4 ★ SOCK SLIDE · PERFECT 10
//   7.6  Pisces cam crying, phone torch up: "ENCORE"
//   9.4  last line "Audience of one. *Standing* ovation." · 13.6–14.0 loops back into the spin.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, sparkles, confetti, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, CYAN } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawAquaHome } from '../../st9aquahome.js'

const DISCO = ['255,92,200', '127,227,255', '255,210,74', '157,255,154']
function disco(x, t) {
  const on = prog(t, 0.8, 1.0)
  if (on <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 4; i++) {
    const a = t * (1.2 + i * 0.3) + i * 1.6, ox = 540, oy = 380
    const ex = ox + Math.cos(a) * 900, ey = oy + 1300
    x.fillStyle = `rgba(${DISCO[i]},${0.22 * on})`; x.beginPath(); x.moveTo(ox - 20, oy); x.lineTo(ox + 20, oy); x.lineTo(ex + 160, ey); x.lineTo(ex - 160, ey); x.closePath(); x.fill()
  }
  x.restore()
  // the ball
  for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { if ((i - 2.5) ** 2 + (j - 2.5) ** 2 > 8) continue; R(x, (i + j + Math.floor(t * 8)) % 3 ? '#c8d0e8' : '#ffffff', 510 + i * 10, 350 + j * 10, 9, 9) }
  R(x, INK, 538, 260, 4, 90)
}
function spoon(x, t, X, Y, r) { x.save(); x.translate(X, Y); x.rotate(r); box(x, -10, -10, 20, 140, '#c98a4a', { b: 5 }); box(x, -26, -70, 52, 66, '#c98a4a', { b: 5, hi: '#e0a060' }); x.restore() }
function scene(x, t) {
  daySky(x, t, { hour: 22 })
  drawAquaHome(x, t, { room: 'kitchen', dark: 0.35 })
  disco(x, t)
  const slide = ease.inOutCubic(prog(t, 4.4, 5.6)) - ease.inOutCubic(prog(t, 8.0, 9.4))
  const X = lerp(420, 740, slide), Y = 1220
  const spin = t < 0.6 ? 0 : 0
  hero(x, t, 'aquarius', X, Y, 320, { mood: t < 2.6 ? 'happy' : t < 4.4 ? 'sparkle' : t < 6.4 ? 'wide' : 'happy', look: [0, -1], squash: 0.08 * Math.sin(t * 9.7), hops: Array.from({ length: 26 }, (_, i) => +(0.54 * i).toFixed(2)).filter(v => v < 4.3 || v > 6.2), seed: 14 })
  spoon(x, t, X + 150, Y - 60, -0.4 + Math.sin(t * 9.7) * 0.2 + spin)
  // sock-slide speed streaks
  if (t > 4.4 && t < 5.6) for (let k = 0; k < 5; k++) R(x, 'rgba(255,255,255,0.5)', X - 260 - k * 40, Y + 60 + k * 18, 160, 8)
  confetti(x, t, 2.6, 540, 900)
  sparkles(x, t, X, Y - 40, 6.4, 12, 280, 0.6)
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 14, ending: 'loop', key: 'Eb',
  shots: [{ at: 0, cam: [1.25, 560, 1100] }, { at: 4.4, cam: [1.15, 580, 1100], push: 0.08 }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 480, cy: 1150 }, { at: 4.4, from: 1.3 }],
  flashes: [{ at: 0.8, col: '#ff5cc8', a: 0.6, dur: 0.2 }, { at: 1.05, col: '#7fe3ff', a: 0.5, dur: 0.2 }],
  shakes: [{ at: 5.55, dur: 0.3, amp: 14 }],
  hook: { text: 'Kitchen concert. | Audience: *zero.*', out: 2.3 },
  bubbles: [{ at: 5.4, out: 7.2, x: 740, y: 900, text: '♪ thank you, kitchen!!', tail: 0 }],
  achs: [
    { at: 2.6, out: 4.4, title: 'KITCHEN CONCERT · SOLD OUT', sub: '(1 seat)', xp: 250, size: 38, icon: 'star' },
    { at: 6.4, out: 8.0, title: 'SOCK SLIDE · PERFECT 10', xp: 150, icon: 'heart' },
  ],
  cams: [{ at: 7.6, out: 10.4, line: 'ENCORE', lineAt: 8.0, tears: 3, mood: 'sparkle' }],
  last: { at: 9.4, text: 'Audience of one. | *Standing* ovation.', top: 330, accentSize: 140, out: 13.5 },
})
