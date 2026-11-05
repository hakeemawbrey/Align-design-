// kaue02 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E02 "Slept diagonal, woke up thriving" (14 s, lofi · F, loop).
//   0.0  Frame 0: Taurus mid-starfish-flop over a huge bed, pillows mid-air. Hook "Slept diagonal. *Zero* complaints."
//   0.4  record scratch: the flop freezes mid-air, "the whole bed. *mine.*" · 1.8 Taurus lands diagonal
//   2.6  ★ STARFISH MODE · 4.6 ★ ALL FOUR PILLOWS (they slide in) · 6.8 ★ NOBODY STOLE THE BLANKET
//   8.3  Pisces cam, crying into a pillow: "i’m so happy for you"
//   10.6 last line "The whole bed. *Every* night."  13.6–14.0 loops back into the mid-air flop.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, box, R, sparkles, hearts, prog, ease, lerp, clamp, INK, BONE } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawTaurusHome } from '../../st9taurushome.js'

const PIL = [[260, 1150, -0.6], [820, 1140, 0.5], [270, 1340, 0.3], [810, 1350, -0.4]]
function bed(x, t) {
  box(x, 110, 1060, 860, 120, '#8a5a3a', { b: 8, hi: '#a8703e' })           // headboard
  box(x, 90, 1180, 900, 230, '#f3ead8', { b: 8 })                            // mattress
  box(x, 90, 1250, 900, 160, '#7fa8d8', { b: 6, hi: '#9fc4ec' })            // the blanket
  for (let i = 0; i < 6; i++) R(x, '#6a90c4', 120 + i * 150, 1270, 8, 130)
  box(x, 110, 1410, 30, 70, '#6a4a2a', { b: 5 }); box(x, 940, 1410, 30, 70, '#6a4a2a', { b: 5 })
}
function pillow(x, X, Y, r) { x.save(); x.translate(X, Y); x.rotate(r); box(x, -80, -42, 160, 84, '#fffaf0', { b: 6, hi: '#ffffff' }); R(x, '#e8dcc8', -70, 20, 140, 8); x.restore() }
function scene(x, t) {
  daySky(x, t, { hour: 23 })
  drawTaurusHome(x, t, { room: 'bedroom', dark: 0.35 })
  bed(x, t)
  // pillows: flying at the flop, then sliding in to the four corners (4.6)
  const land = ease.outCubic(prog(t, 1.8, 2.2)), gather = ease.inOutCubic(prog(t, 4.2, 4.7))
  PIL.forEach(([px, py, r], i) => {
    const fly = [[200, 760, -1.2], [880, 740, 1.0], [140, 900, 0.8], [940, 920, -0.9]][i]
    let X = lerp(fly[0], px, land), Y = lerp(fly[1], py - 40, land) + Math.sin(t * 3 + i) * 10 * (1 - land), rr = lerp(fly[2], r, land)
    const near = [[350, 1170], [730, 1170], [380, 1320], [700, 1320]][i]
    X = lerp(X, near[0], gather); Y = lerp(Y, near[1], gather)
    pillow(x, X, Y, rr)
  })
  // Taurus: mid-air flop → lands diagonal across the bed
  const y = lerp(960, 1230, ease.inCubic(prog(t, 1.8, 2.1)))
  const sq = t > 2.1 ? 0.2 * Math.exp(-(t - 2.1) * 6) * Math.cos((t - 2.1) * 20) : -0.08
  x.save(); x.translate(540, y); x.rotate(lerp(-0.25, -0.72, land))
  hero(x, t, 'taurus', 0, 0, 340, { mood: t < 2.1 ? 'wide' : t < 8.8 ? 'happy' : 'sleepy', look: [0, -1], squash: sq, bob: t > 2.1 ? 3 : 8, seed: 3, blink: t < 2.1 ? false : undefined })
  x.restore()
  sparkles(x, t, 540, 1200, 2.6, 10, 280, 0.2)
  hearts(x, t, 6.9, 540, 1080, { n: 6 })
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 14, ending: 'loop', key: 'F',
  shots: [{ at: 0, cam: [1.12, 540, 1060], push: 0.08 }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 540, cy: 1000 }],
  freezes: [{ at: 0.4, dur: 1.4, text: 'the whole bed. *mine.*', sub: 'party of one, bed for four', top: 1560 }],
  shakes: [{ at: 2.05, dur: 0.4, amp: 20 }],
  punch: [{ at: 8.8, dur: 1.6, z: 0.15, x: 540, y: 1150 }],
  hook: { text: 'Slept diagonal. | *Zero* complaints.', out: 2.4 },
  achs: [
    { at: 2.6, out: 4.2, title: 'STARFISH MODE', xp: 100, icon: 'star' },
    { at: 4.6, out: 6.4, title: 'ALL FOUR PILLOWS', xp: 150 },
    { at: 6.8, out: 8.6, title: 'NOBODY STOLE THE BLANKET', xp: 250, size: 38, icon: 'heart' },
  ],
  cams: [{ at: 8.2, out: 10.4, line: 'i’m so happy for you', lineAt: 8.6, tears: 3, mood: 'happy' }],
  last: { at: 10.6, text: 'The whole bed. | *Every* night.', top: 330 },
})
