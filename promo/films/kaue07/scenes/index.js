// kaue07 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E07 "Picked the restaurant in under a minute" (15 s, house · C, hard cut).
//   0.0  Frame 0: Libra mid-spin between two restaurant fronts, a speedrun timer already running (0:52).
//        Hook "Libra. Choosing dinner. *Solo.*"
//   1.4  "noodles? tacos? noodles?"  · 3.0 Libra turns to ask someone… nobody. "who do i ask… oh. me."
//   4.6  "i want… NOODLES."  splits: CRAVING · MENU · DECIDED (0:58) → 6.6 ★ DECIDED IN UNDER A MINUTE
//   8.4  Pisces cam crying: "they grew up so fast"   9.2 Libra skips in, the sign glows
//   12.4 last line "No one to ask. *Finally* decided." · hard cut at 15.
import { makeAch } from '../../kaue01/achengine.js'
import { drawStreet } from '../../kaue01/sets.js'
import { hero, R, box, label, sparkles, hearts, prog, ease, lerp, INK, BONE, GOLD, PINK } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'

function signs(x, t) {
  const glow = t > 9.2 ? 1 : 0.5 + 0.5 * Math.abs(Math.sin(t * 3))
  for (const [X, txt, col, on] of [[180, 'NOODLES', '#ffcf7a', t > 9.2 ? 1 : glow], [900, 'TACOS', '#9fe6ff', t > 9.2 ? 0.3 : glow]]) {
    box(x, X - 150, 600, 300, 80, '#1a1230', { b: 6 })
    x.save(); x.globalAlpha = on; label(x, txt, X, 642, { size: 46, col }); x.restore()
  }
}
function scene(x, t, S) {
  daySky(x, t, { hour: 20 })
  drawStreet(x, t, { bench: false })
  signs(x, t)
  const spin = t < 6.2
  const look = spin ? (Math.floor(t * (t < 1.4 ? 5 : 2.5)) % 2 ? [1, 0] : [-1, 0]) : [-1, 0]
  const walk = ease.inOutCubic(prog(t, 9.2, 11.2))
  hero(x, t, 'libra', lerp(540, 250, walk), 1500 - Math.abs(Math.sin(t * 9)) * 30 * walk, 400, {
    mood: t < 3.0 ? 'wide' : t < 4.6 ? 'squint' : t < 6.2 ? 'sparkle' : 'happy', look, squash: t < 0.4 ? 0.15 * Math.sin(t * 30) : 0,
    hops: [1.4, 1.9, 2.4, 4.6, 5.2, 6.3], seed: 8, blink: t < 1.4 ? false : undefined, alpha: 1 - prog(t, 11.0, 11.4) })
  sparkles(x, t, 540, 1450, 6.6, 12, 300, 0.4)
  hearts(x, t, 9.3, 300, 1300, { n: 6 })
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 15, ending: 'cut', key: 'C',
  shots: [{ at: 0, cam: [1.3, 540, 1180] }, { at: 4.6, cam: [1.5, 540, 1200] }, { at: 8.4, cam: [1.25, 540, 1160] }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 540, cy: 1150 }, { at: 4.6, from: 1.35 }],
  shakes: [{ at: 0.02, dur: 0.3, amp: 14 }],
  kit: [['gameHud', { at: -0.6, out: [7.6, 7.9], start: -52.6, title: 'LIBRA · DINNER · SOLO%', splits: [{ at: 2.2, name: 'craving' }, { at: 4.4, name: 'menu' }, { at: 6.2, name: 'DECIDED' }] }]],
  hook: { text: 'Libra. Choosing dinner. | *Solo.*', out: 1.35, top: 560 },
  bubbles: [
    { at: 1.4, out: 2.9, x: 540, y: 1180, text: 'noodles? tacos? noodles?', tail: 0 },
    { at: 3.0, out: 4.5, x: 540, y: 1180, text: 'who do i ask… oh. me.', tail: 0 },
    { at: 4.7, out: 6.4, x: 540, y: 1180, text: 'i want… NOODLES.', size: 54, tail: 0 },
  ],
  achs: [{ at: 6.6, out: 8.6, title: 'DECIDED IN UNDER A MINUTE', xp: 500, size: 38, icon: 'star', y: 520 }],
  cams: [{ at: 8.4, out: 11.6, line: 'they grew up so fast', lineAt: 8.8, tears: 3 }],
  last: { at: 12.4, text: 'No one to ask. | *Finally* decided.', top: 330 },
})
