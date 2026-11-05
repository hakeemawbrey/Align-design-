// kaue14 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E14 "Third wheel, main character" (17 s, funk · E, hard cut).
//   0.0  Frame 0: Leo mid-squeeze between a cuddling couple (Cancer + Scorpio) on a bench, both mid-gasp.
//        Hook "Third wheel? *Main* character."
//   1.4  the couple: "oh! hi, Leo!"  2.4 ★ THIRD WHEEL EQUIPPED
//   4.4  Leo hops up with a camera: "okay, you two. SMILE." flash, flash → the polaroid → 7.0 ★ BEST CAMEO · PHOTOGRAPHER
//   9.0  Pisces cam crying at the photo: "frame it. FRAME IT."
//   9.6  the couple pulls Leo into the shot: polaroid two, all three → 11.4 ★ SQUAD PHOTO UNLOCKED
//   15.6 last line "Third wheel. *Best* wheel." · hard cut at 17.
import { makeAch } from '../../kaue01/achengine.js'
import { drawStreet } from '../../kaue01/sets.js'
import { hero, R, box, label, sparkles, hearts, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, signColor } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'

function camera(x, X, Y) { box(x, X - 70, Y - 46, 140, 92, '#2a2448', { b: 6 }); x.fillStyle = INK; x.beginPath(); x.arc(X, Y, 32, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7fd0ff'; x.beginPath(); x.arc(X, Y, 22, 0, Math.PI * 2); x.fill(); R(x, '#fff', X - 10, Y - 12, 8, 8); box(x, X + 30, Y - 66, 30, 16, '#c8c4d8', { b: 4 }) }
function polaroid(x, t, at, out, X, Y, signs, rot) {
  const k = ease.outBack(prog(t, at, at + 0.4)) * (1 - ease.inCubic(prog(t, out, out + 0.3)))
  if (k <= 0) return
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.5)', -170, -160, 360, 360); box(x, -180, -180, 360, 380, BONE, { b: 6 }); R(x, '#3a2a6a', -150, -150, 300, 270)
  const dev = clamp((t - at - 0.3) / 0.8)
  signs.forEach((s, i) => { const cx = -150 + 300 * (i + 0.5) / signs.length; x.save(); x.globalAlpha = dev; hero(x, t, s, cx, -10, 110, { mood: 'happy', look: [0, 0], seed: i + 3, bob: 0, tips: false }); x.restore() })
  hearts(x, t, at + 0.6, 0, -40, { n: 4, cell: 4 })
  x.restore()
}
function scene(x, t, S) {
  daySky(x, t, { hour: 18.5 })
  drawStreet(x, t, { bench: true })
  const up = ease.inOutCubic(prog(t, 4.3, 4.7)) - ease.inOutCubic(prog(t, 9.6, 10.0))
  const squeeze = Math.max(0, 1 - t / 0.5)
  const spread = lerp(1, 0, up)
  // the couple, budged apart by Leo, then together while Leo takes the photo
  hero(x, t, 'cancer', lerp(330, 430, up) - squeeze * 30, 1230, 250, { mood: t < 1.3 ? 'wide' : 'happy', look: [1, 0], seed: 4, hops: [1.45, 1.8, 10.0] })
  hero(x, t, 'scorpio', lerp(750, 650, up) + squeeze * 30, 1230, 250, { mood: t < 1.3 ? 'wide' : 'happy', look: [-1, 0], seed: 5, hops: [1.5, 10.0] })
  if (up > 0.5) hearts(x, t, 4.7, 540, 1100, { n: 5 })
  const lx = lerp(540, 540, up), ly = lerp(1210 + squeeze * 20, 1560, up)
  hero(x, t, 'leo', lx, ly, lerp(270, 330, up), { mood: t < 1.3 ? 'wide' : t < 4.4 ? 'sparkle' : up > 0.5 ? 'wink' : 'happy', look: up > 0.5 ? [0, -1] : [0, 0], squash: squeeze * 0.22, seed: 9, crown: true, hops: [0.6, 2.5, 4.4, 5.2, 10.1] })
  if (up > 0.5) camera(x, lx + 150, ly - 60)
  void spread
  polaroid(x, t, 6.4, 9.4, 540, 820, ['cancer', 'scorpio'], -0.06)
  polaroid(x, t, 10.4, 15.2, 540, 820, ['cancer', 'leo', 'scorpio'], 0.05)
  sparkles(x, t, 540, 820, 11.4, 14, 360, 0.3)
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 17, ending: 'cut', key: 'E',
  shots: [{ at: 0, cam: [1.45, 540, 1200] }, { at: 4.3, cam: [1.25, 540, 1180] }, { at: 9.6, cam: [1.25, 540, 1180], noBlink: true, silent: true }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 540, cy: 1200 }, { at: 4.3, from: 1.3 }, { at: 10.4, from: 1.25 }],
  flashes: [{ at: 5.4, a: 0.85 }, { at: 5.9, a: 0.85 }, { at: 10.35, a: 0.85 }],
  shakes: [{ at: 0.02, dur: 0.4, amp: 18 }],
  hook: { text: 'Third wheel? | *Main* character.', out: 1.35 },
  bubbles: [
    { at: 1.4, out: 2.6, x: 540, y: 940, text: 'oh! hi, Leo!', tail: 0 },
    { at: 4.6, out: 6.2, x: 540, y: 1300, text: 'okay, you two. SMILE.', tail: 0 },
    { at: 9.7, out: 10.3, x: 540, y: 960, text: 'get IN here!', tail: 0 },
  ],
  achs: [
    { at: 2.4, out: 4.2, title: 'THIRD WHEEL EQUIPPED', xp: 50, icon: 'star' },
    { at: 7.0, out: 8.8, title: 'BEST CAMEO · PHOTOGRAPHER', xp: 250, size: 40 },
    { at: 11.4, out: 13.2, title: 'SQUAD PHOTO UNLOCKED', xp: 300, icon: 'heart' },
  ],
  cams: [{ at: 8.9, out: 11.0, line: 'frame it. FRAME IT.', lineAt: 9.2, tears: 3, y: 1330 }],
  last: { at: 15.6, text: 'Third wheel. | *Best* wheel.', top: 330 },
  cues: [['pop', 5.42, 1760, 0.03, 0], ['pop', 5.92, 1760, 0.03, 0], ['pop', 10.37, 1760, 0.03, 0]],
})
