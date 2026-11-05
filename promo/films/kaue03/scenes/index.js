// kaue03 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E03 "Went to the concert solo" (17 s, pop · A, hard cut).
//   0.0  Frame 0: Gemini mid-scream at the front of a crowd, arms-up light sticks mid-air, mid whip zoom.
//        Hook "Went to the concert *alone.*"   0.6 colour flash (the lights drop)
//   2.0  Gemini turns: "did you SEE th—" … the spot next to them is empty → 3.4 ★ NO ONE TO TALK TO (tried)
//   5.6  closer: Gemini sings both parts of the duet, high and low → 8.4 ★ DUET FOR ONE
//   10.2 Pisces cam, sobbing with a phone torch up: "the HARMONIES"
//   11.6 ★ FRONT ROW, NO PLUS-ONE · 14.8 last line "Sang both parts. *Nailed* both." · hard cut at 17.
import { makeAch } from '../../kaue01/achengine.js'
import { drawStage } from '../../kaue01/sets.js'
import { hero, R, box, label, sparkles, hearts, confetti, prog, ease, lerp, INK, GOLD, PINK, CYAN, BONE } from '../../kaue01/achkit.js'

function stick(x, t, X, Y, r, col) {
  x.save(); x.translate(X, Y); x.rotate(r)
  R(x, INK, -10, -60, 20, 120); R(x, col, -6, -56, 12, 80); R(x, '#2a2448', -6, 24, 12, 32)
  x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35; R(x, col, -18, -66, 36, 96); x.restore()
}
function scene(x, t, S) {
  drawStage(x, t, { lights: t < 0.6 ? 0.5 : 1 })
  const close = S.i === 1
  const gx = 540, gy = 1330
  // the empty spot next to Gemini (a gap in the front row with a little floor arrow)
  const gap = t > 2.6 && !close ? Math.min(1, (t - 2.6) * 3) : 0
  const sing = close ? Math.sin(Math.floor((t - 5.6) / 1.2) * Math.PI) : 0
  const high = close && Math.floor((t - 5.6) / 1.2) % 2 === 0
  hero(x, t, 'gemini', gx + (close ? (high ? -30 : 30) : 0), gy - (close && high ? 30 : 0), 330, {
    mood: t < 2.0 ? 'wide' : t < 2.6 ? 'happy' : t < 5.6 ? 'wide' : t < 10.8 ? (high ? 'sparkle' : 'squint') : 'heart',
    look: t >= 2.0 && t < 4.4 ? [1, 0] : [0, -1], squash: close ? (high ? -0.12 : 0.1) : (t < 0.5 ? -0.14 : 0), hops: [0.1, 0.5, 1.0, 1.5, 2.0, 11.0, 11.4], seed: 5, blink: t < 2 ? false : undefined })
  // light sticks: flying up at frame 0, then held
  const fly = t < 1.6
  if (fly) { stick(x, t, 300 + t * 60, 1100 - t * 420, -0.4 + t * 3, PINK); stick(x, t, 800 - t * 40, 1060 - t * 380, 0.5 - t * 2.6, CYAN) }
  else { stick(x, t, gx - 200, 1180 + Math.sin(t * 6) * 20, -0.3 + Math.sin(t * 6) * 0.25, PINK); stick(x, t, gx + 200, 1180 + Math.cos(t * 6) * 20, 0.3 - Math.sin(t * 6) * 0.25, CYAN) }
  if (close) for (let k = 0; k < 4; k++) { const ph = ((t * 0.8 + k / 4) % 1); R(x, high ? PINK : CYAN, gx + (high ? -200 : 160) + Math.sin(ph * 6 + k) * 30, 1100 - ph * 260, 14, 22) }
  // the front row of the crowd, in front of Gemini (with an empty spot to Gemini's right)
  for (let i = -1; i < 10; i++) {
    const hx = i * 120 + 20, bob = Math.abs(Math.sin(t * 6.5 + i * 1.7)) * 16
    if (Math.abs(hx - gx) < 110) continue
    if (gap > 0 && hx > 700 && hx < 900) continue
    R(x, '#120d2a', hx - 52, 1520 - bob, 104, 420); R(x, '#120d2a', hx - 38, 1470 - bob, 76, 60)
    if (i % 3 === 0) { R(x, '#120d2a', hx + 30, 1330 - bob, 18, 150); R(x, i % 2 ? PINK : CYAN, hx + 28, 1300 - bob, 22, 40) }
  }
  if (gap > 0) {
    x.save(); x.globalAlpha = gap
    x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,240,200,0.22)'; x.beginPath(); x.moveTo(780, 700); x.lineTo(820, 700); x.lineTo(900, 1600); x.lineTo(700, 1600); x.closePath(); x.fill()
    x.globalCompositeOperation = 'source-over'
    label(x, '(nobody)', 800, 1560, { size: 34, col: BONE })
    x.restore()
  }
  sparkles(x, t, gx, 1250, 8.4, 12, 280, 0.4)
  confetti(x, t, 11.5, 540, 900)
  hearts(x, t, 11.6, gx, 1150, { n: 7 })
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 17, ending: 'cut', key: 'A',
  shots: [{ at: 0, cam: [1.1, 560, 1150] }, { at: 5.6, cam: [1.4, 540, 1220] }, { at: 10.2, cam: [1.12, 560, 1150], noBlink: true }],
  scene,
  whips: [{ at: -0.22, from: 1.5, blur: 8, cx: 540, cy: 1200 }, { at: 5.6, from: 1.35 }],
  flashes: [{ at: 0.6, col: '#ff5cc8', a: 0.7, dur: 0.25 }, { at: 1.0, col: '#7fe3ff', a: 0.5, dur: 0.2 }, { at: 11.5, col: '#fff3c0', a: 0.5 }],
  shakes: [{ at: 0.05, dur: 0.45, amp: 22 }],
  hook: { text: 'Went to the concert | *alone.*', out: 2.2 },
  bubbles: [
    { at: 2.0, out: 3.3, x: 680, y: 900, text: 'did you SEE th—', size: 46, tail: -0.4 },
    { at: 6.0, out: 7.1, x: 360, y: 860, text: '♪ ooh (high part)', tail: 0.4 },
    { at: 7.2, out: 8.3, x: 720, y: 860, text: '♪ ohh (low part)', tail: -0.4 },
  ],
  achs: [
    { at: 3.4, out: 5.3, title: 'NO ONE TO TALK TO', sub: '(tried anyway)', xp: 10 },
    { at: 8.4, out: 10.0, title: 'DUET FOR ONE', xp: 200, icon: 'star' },
    { at: 11.6, out: 13.4, title: 'FRONT ROW, NO PLUS-ONE', xp: 150, size: 40, icon: 'heart' },
  ],
  cams: [{ at: 10.1, out: 13.6, line: 'the HARMONIES', lineAt: 10.5, tears: 3, mood: 'sparkle' }],
  last: { at: 14.8, text: 'Sang both parts. | *Nailed* both.', top: 330 },
})
