// kaue13 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E13 "“So, are you seeing anyone?”" (18 s, cinematic · G, hard cut).
//   0.0  Frame 0: a December family dinner, Aries mid-forkful, every head snapping round. Hook "The question just *dropped.*"
//   0.7  record scratch freeze: "so… are you *seeing* anyone?"
//   2.6  BOSS: THE QUESTION (an HP bar)   3.4 ARIES: "nope. and i’m thriving." → the HP drains → 5.4 ★ SURVIVED THE QUESTION
//   7.4  Capricorn: "potatoes?" · Aries: "yes please."   10.2 Pisces across the table cries "so proud of you"
//   12.0 ★ SIDE QUEST: SECONDS   15.4 last line "Single. *Thriving.* Pass the potatoes." · hard cut at 18.
import { makeAch } from '../../kaue01/achengine.js'
import { drawDinner } from '../../kaue01/sets.js'
import { hero, R, box, label, sparkles, hearts, prog, ease, lerp, clamp, INK, BONE, GOLD, RED, INTER, MONO } from '../../kaue01/achkit.js'

const SEATS = [['taurus', 250, 1150, [1, 0]], ['capricorn', 390, 1110, [1, 0]], ['cancer', 720, 1110, [-1, 0]], ['pisces', 860, 1150, [-1, 0]]]
function bossBar(x, t) {
  const k = ease.outBack(prog(t, 2.5, 2.8)) * (1 - ease.inCubic(prog(t, 6.6, 6.9)))
  if (k <= 0.01) return
  const hp = 1 - ease.inOutCubic(prog(t, 4.0, 4.7))
  x.save(); x.translate(540, 560); x.scale(k, k)
  x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.fillStyle = 'rgba(6,4,18,0.8)'; x.fillText('BOSS: THE QUESTION', 3, -38); x.fillStyle = '#ff6b7f'; x.fillText('BOSS: THE QUESTION', 0, -42)
  R(x, INK, -404, -14, 808, 48); R(x, '#3a1020', -396, -6, 792, 32)
  R(x, hp > 0.3 ? RED : '#ff9a3a', -396, -6, 792 * hp, 32); R(x, 'rgba(255,255,255,0.3)', -396, -6, 792 * hp, 8)
  x.restore()
}
function potatoes(x, t, X, Y) { box(x, X - 80, Y - 20, 160, 60, '#f3ead8', { b: 6 }); for (let k = 0; k < 5; k++) R(x, '#f0d28a', X - 60 + k * 26, Y - 40 - (k % 2) * 12, 26, 26) }
function scene(x, t) {
  drawDinner(x, t, { warm: 1 })
  const snap = ease.outCubic(prog(t, 0, 0.35))
  for (const [s, X, Y, lk] of SEATS) {
    const pis = s === 'pisces'
    hero(x, t, s, X, Y, 230, { mood: pis && t > 10 ? 'sparkle' : t < 5.4 ? 'wide' : 'happy', look: t < 5.4 ? [lk[0], 0] : lk, seed: X, blink: t < 2 ? false : undefined, tears: pis ? (t > 10 ? 3 : 1) : 0, squash: (1 - snap) * 0.1 })
  }
  // Aries in the middle, fork mid-air
  const fork = Math.max(0, 1 - t / 0.7)
  hero(x, t, 'aries', 555, 1080, 300, { mood: t < 3.4 ? 'wide' : t < 5.4 ? 'squint' : 'happy', look: t < 3.4 ? [0, 0] : [-1, 0], seed: 2, hops: [3.5, 3.9, 4.3, 8.7], blink: t < 3 ? false : undefined })
  x.save(); x.translate(700, 1080 - fork * 60); x.rotate(-0.6); R(x, INK, -6, -60, 12, 120); R(x, '#c8c4d8', -3, -56, 6, 112); R(x, '#c8c4d8', -16, -80, 32, 24); R(x, '#f0d28a', -14, -100, 28, 22); x.restore()
  // plates + the potatoes sliding from Capricorn to Aries
  for (const px of [250, 390, 555, 720, 860]) box(x, px - 70, 1228, 140, 16, BONE, { b: 4 })
  const slide = ease.inOutCubic(prog(t, 7.6, 8.4))
  potatoes(x, t, lerp(400, 560, slide), 1200)
  sparkles(x, t, 555, 1000, 5.4, 12, 300, 0.4)
  hearts(x, t, 10.4, 860, 1000, { n: 6 })
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 18, ending: 'cut', key: 'G',
  shots: [{ at: 0, cam: [1.4, 555, 1060] }, { at: 3.3, cam: [1.8, 555, 1040] }, { at: 7.3, cam: [1.55, 480, 1070] }, { at: 10.1, cam: [1.6, 780, 1060] }, { at: 12.0, cam: [1.4, 555, 1060] }],
  scene, overlay: bossBar,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 555, cy: 1060 }, { at: 3.3, from: 1.4 }],
  freezes: [{ at: 0.7, dur: 1.7, text: 'so… are you *seeing* anyone?', sub: 'every holiday dinner, ever', top: 1480 }],
  shakes: [{ at: 0.02, dur: 0.35, amp: 16 }, { at: 4.0, dur: 0.6, amp: 24 }],
  hook: { text: 'The question | just *dropped.*', out: 0.7 },
  bubbles: [
    { at: 3.4, out: 5.3, x: 555, y: 820, text: 'nope. and i’m THRIVING.', size: 48, tail: 0 },
    { at: 7.4, out: 8.7, x: 390, y: 860, text: 'potatoes?', tail: 0 },
    { at: 8.6, out: 9.9, x: 600, y: 860, text: 'yes please.', tail: -0.2 },
    { at: 10.3, out: 12.0, x: 760, y: 860, text: 'so proud of you', tail: 0.4 },
  ],
  achs: [
    { at: 5.4, out: 7.2, title: 'SURVIVED THE QUESTION', xp: 1000, icon: 'star' },
    { at: 12.0, out: 13.8, title: 'SIDE QUEST: SECONDS', xp: 200, icon: 'heart' },
  ],
  last: { at: 15.4, text: 'Single. *Thriving.* | Pass the potatoes.', top: 330, size: 96, accentSize: 128 },
})
