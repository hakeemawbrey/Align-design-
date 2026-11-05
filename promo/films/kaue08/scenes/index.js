// kaue08 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E08 "Didn't check their story. Not once." (18 s, screwed · Fm, hard cut).
//   0.0  Frame 0: 2 a.m., Scorpio's thumb mid-hover over a glowing story ring, the screen shaking. Hook "Thumb. Hovering. *Do not.*"
//   1.2  countdown 3-2-1 over the ring, "DON’T."   3.0 wide: Scorpio in bed in the dark, phone glowing
//   3.6  the phone flips face down → 4.4 ★ WILLPOWER
//   6.4  the kitchen: tea instead. "tea. not them." → 8.4 ★ 2 A.M. SURVIVED
//   10.4 Pisces cam sobbing: "i’m SO proud of you"   12.0 back in bed, phone face down, Scorpio drifts off
//   16.2 last line "Didn’t look. *Still* glowing." · hard cut at 18.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, label, sparkles, hearts, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawScorpioHome } from '../../st9scorpiohome.js'

function phone(x, t, X, Y, s, flip, buzz) {
  x.save(); x.translate(X + (buzz ? Math.sin(t * 60) * 6 : 0), Y); x.scale(s * Math.cos(flip * Math.PI), s)
  const back = flip > 0.5
  box(x, -150, -270, 300, 540, back ? '#3a2a4a' : '#1a1430', { b: 10 })
  if (back) { R(x, '#5a4a6a', -40, -220, 80, 80); x.restore(); return }
  R(x, '#0e0a20', -130, -244, 260, 490)
  label(x, '2:04', 0, -210, { size: 26, col: BONE })
  // the story ring
  const pulse = 1 + 0.05 * Math.sin(t * 6)
  for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2 + t; R(x, ['#ff5c8a', '#ffd24a', '#c9a6ff'][k % 3], Math.cos(a) * 92 * pulse - 9, -40 + Math.sin(a) * 92 * pulse - 9, 18, 18) }
  box(x, -66, -106, 132, 132, '#6a5a8a', { b: 5 }); R(x, '#9a8ab8', -30, -86, 60, 50); R(x, '#9a8ab8', -50, -30, 100, 50)
  label(x, 'them · 1h', 0, 96, { size: 24, col: '#c9c0e0' })
  R(x, '#2a2448', -100, 160, 200, 40); label(x, 'tap to view', 0, 180, { size: 18, col: '#8a80a8' })
  x.restore()
}
function thumb(x, t, X, Y) {
  x.save(); x.translate(X, Y + Math.sin(t * 9) * 12)
  box(x, -50, -30, 100, 240, '#f0b88a', { b: 6 }); R(x, '#f8d0aa', -36, -20, 40, 50); R(x, '#d89870', -44, 120, 88, 8)
  x.restore()
}
function mug(x, t, X, Y) {
  box(x, X - 60, Y - 70, 120, 120, '#c8344e', { b: 6, hi: '#e85a70' }); box(x, X + 60, Y - 40, 30, 60, '#c8344e', { b: 5 })
  for (let k = 0; k < 4; k++) { const ph = (t * 0.7 + k / 4) % 1; x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * ph); R(x, '#fff', X - 30 + k * 18 + Math.sin(ph * 6) * 10, Y - 100 - ph * 160, 16, 16); x.restore() }
}
function scene(x, t, S) {
  const kit = S.i === 2
  daySky(x, t, { hour: 2 })
  drawScorpioHome(x, t, { room: kit ? 'kitchen' : 'bedroom', dark: kit ? 0.25 : 0.6, hour: 2 })
  const flip = ease.inOutCubic(prog(t, 3.6, 4.1))
  if (S.i === 0) { phone(x, t, 540, 1080, 1.75, 0, t < 1.2); thumb(x, t, 690, 1560 - Math.max(0, 1 - t) * 40) }
  else if (!kit) {
    // in bed: the phone lights Scorpio's face, then goes dark face down
    const glow = 1 - flip
    if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(560, 1150, 20, 560, 1150, 420); g.addColorStop(0, `rgba(160,180,255,${0.35 * glow})`); g.addColorStop(1, 'rgba(160,180,255,0)'); x.fillStyle = g; x.fillRect(100, 700, 900, 900); x.restore() }
    const late = t > 12
    hero(x, t, 'scorpio', 460, 1160, 320, { mood: late ? 'sleepy' : t < 3.6 ? 'squint' : t < 4.4 ? 'wide' : 'happy', look: late ? [0, 0] : [1, 1], seed: 10, hops: [4.4, 4.8] })
    phone(x, t, 700, late ? 1330 : 1220, 0.42, late ? 1 : flip, false)
    sparkles(x, t, 600, 1150, 4.4, 12, 300, 0.2)
  } else {
    hero(x, t, 'scorpio', 470, 1170, 320, { mood: 'happy', look: [1, 0], seed: 10, hops: [6.6, 7.0, 7.4] })
    mug(x, t, 760, 1240)
    hearts(x, t, 8.5, 760, 1100, { n: 5 })
  }
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 18, ending: 'cut', key: 'Fm',
  shots: [{ at: 0, cam: [1.05, 560, 1160] }, { at: 3.0, cam: [1.25, 560, 1150] }, { at: 6.4, cam: [1.25, 600, 1150] }, { at: 10.4, cam: [1.2, 560, 1150] }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 600, cy: 1150 }, { at: 3.0, from: 1.4 }],
  shakes: [{ at: 0, dur: 1.2, amp: 10 }, { at: 3.62, dur: 0.35, amp: 18 }],
  kit: [['countdown', { at: 1.25, from: 3, gap: 0.5, go: 'DON’T.', y: 760 }]],
  hook: { text: 'Thumb. Hovering. | *Do not.*', out: 1.2 },
  bubbles: [
    { at: 6.7, out: 8.3, x: 470, y: 900, text: 'tea. not them.', size: 46, tail: 0 },
    { at: 12.6, out: 14.4, x: 460, y: 900, text: 'still didn’t look. zzz', tail: 0 },
  ],
  achs: [
    { at: 4.4, out: 6.2, title: 'WILLPOWER', sub: 'thumb withdrawn at 2:04 a.m.', xp: 999, icon: 'star' },
    { at: 8.4, out: 10.2, title: '2 A.M. SURVIVED', xp: 500, icon: 'heart' },
  ],
  cams: [{ at: 10.4, out: 13.4, line: 'i’m SO proud of you', lineAt: 10.8, tears: 3 }],
  last: { at: 16.2, text: 'Didn’t look. | *Still* glowing.', top: 330 },
})
