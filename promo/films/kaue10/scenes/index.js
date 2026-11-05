// kaue10 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E10 "Did nothing on Friday, on purpose" (16 s, lofi · G, hard cut).
//   0.0  Frame 0: Capricorn mid-dive into the armchair, the planner flying out of its hands. Hook "Friday. *No* plans. On purpose."
//   1.6  "okay. scheduling the nothing."  2.0 the calendar block: FRI 7–11 PM · NOTHING
//   4.0  "…is the nothing on track?"   5.8 the block crumbles, shake; Capricorn yawns → 7.0 ★ DID NOTHING · NO GUILT
//   9.0  Pisces cam happy-crying under a blanket: "rest counts too"   10 the blanket, zzz → 11.2 ★ NAPPED WITHOUT A TIMER
//   13.8 last line "Nothing planned. *Everything* fine." · hard cut at 16.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, label, sparkles, prog, ease, lerp, clamp, INK, BONE, GOLD, RED } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawCapHome, drawCapHomeFront } from '../../st9caphome.js'

function planner(x, t) {
  if (t > 1.6) return
  const p = t + 0.3
  x.save(); x.translate(760 + p * 260, 980 - p * 520 + p * p * 500); x.rotate(p * 5)
  box(x, -60, -80, 120, 160, '#8a3a3a', { b: 6 }); R(x, BONE, -46, -66, 92, 132); for (let k = 0; k < 5; k++) R(x, '#9a8a7a', -36, -50 + k * 24, 72, 6)
  x.restore()
}
function block(x, t) {
  const k = ease.outBack(prog(t, 2.0, 2.35)), crumble = prog(t, 5.8, 6.8)
  if (k <= 0 || crumble >= 1) return
  const X = 580, Y = 840, W = 500, H = 200
  if (crumble <= 0) {
    x.save(); x.translate(X, Y); x.scale(k, k)
    box(x, -W / 2, -H / 2, W, H, BONE, { b: 8 }); R(x, '#3a6ad8', -W / 2, -H / 2, W, 54)
    label(x, 'FRIDAY', 0, -H / 2 + 28, { size: 30, col: BONE })
    label(x, '7:00 – 11:00 PM', 0, -6, { size: 34, col: INK })
    label(x, 'NOTHING (on purpose)', 0, 52, { size: 30, col: RED })
    x.restore(); return
  }
  // crumbling: the block falls apart into pixel chunks
  for (let i = 0; i < 10; i++) for (let j = 0; j < 4; j++) {
    const d = crumble, vx = ((i * 7 + j * 3) % 5 - 2) * 60
    x.save(); x.globalAlpha = 1 - d
    R(x, j === 0 ? '#3a6ad8' : BONE, X - W / 2 + i * 60 + vx * d, Y - H / 2 + j * 55 + 900 * d * d * (0.6 + (i % 3) * 0.2), 56, 52)
    x.restore()
  }
}
function scene(x, t) {
  daySky(x, t, { hour: 20.5 })
  drawCapHome(x, t, { room: 'window', lamp: 1, dark: 0.15 })
  box(x, 440, 960, 260, 200, '#e8d8b8', { b: 6, hi: '#f8ecd4' })      // a cream cushion so Capricorn pops off the green chair
  const dive = prog(t, 0, 0.45)
  const sleepy = t > 6.4
  hero(x, t, 'capricorn', lerp(760, 570, ease.outCubic(dive)), lerp(860, 1080, ease.inCubic(dive)), 280, {
    mood: t < 0.45 ? 'wide' : t < 4.0 ? 'squint' : t < 5.8 ? 'wide' : sleepy ? 'sleepy' : 'neutral', look: t < 4 ? [1, -1] : [0, -1], squash: t < 0.45 ? -0.1 : 0, seed: 13, hops: [0.5, 1.7, 2.1, 4.1], blink: t < 0.45 ? false : undefined })
  // the blanket drapes over at 10
  const bk = ease.outCubic(prog(t, 10.0, 10.6))
  if (bk > 0) { x.save(); x.translate(570, lerp(760, 1215, bk)); box(x, -170, -50, 340, 110, '#e8a23a', { b: 6, hi: '#ffc25a' }); for (let k = 0; k < 4; k++) R(x, '#c8842a', -150 + k * 90, -40, 40, 90); x.restore() }
  drawCapHomeFront(x, t, { room: 'window' })
  planner(x, t)
  block(x, t)
  sparkles(x, t, 570, 1000, 7.0, 12, 300, 0.2)
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 16, ending: 'cut', key: 'G',
  shots: [{ at: 0, cam: [1.55, 600, 1020] }, { at: 4.0, cam: [1.75, 570, 1030] }, { at: 8.8, cam: [1.55, 600, 1020] }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 640, cy: 1000 }, { at: 4.0, from: 1.3 }],
  shakes: [{ at: 0.45, dur: 0.35, amp: 18 }, { at: 5.8, dur: 0.5, amp: 22 }],
  hook: { text: 'Friday. *No* plans. | On purpose.', out: 1.5 },
  bubbles: [
    { at: 1.6, out: 3.8, x: 560, y: 1000, text: 'okay. scheduling the nothing.', size: 36, tail: 0 },
    { at: 4.1, out: 5.7, x: 560, y: 1000, text: '…is the nothing on track?', size: 36, tail: 0 },
    { at: 6.2, out: 7.0, x: 560, y: 1000, text: '*yawn*', tail: 0 },
  ],
  achs: [
    { at: 7.0, out: 8.8, title: 'DID NOTHING · NO GUILT', xp: 400, icon: 'heart' },
    { at: 11.2, out: 13.0, title: 'NAPPED WITHOUT A TIMER', xp: 200, size: 40, icon: 'star' },
  ],
  cams: [{ at: 9.0, out: 12.6, line: 'rest counts too', lineAt: 9.4, tears: 3, mood: 'happy', y: 760 }],
  last: { at: 13.8, text: 'Nothing planned. | *Everything* fine.', top: 330, accentSize: 140 },
})
