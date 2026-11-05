// kroe19: RATE THE OPENER, The Multiple-Choice Hello (9 s vertical, star_advice trial reel, Month 2 boost m37, chiptune · G).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♎ Libra mid-spin, a four-option A/B/C/D hello bubble mid-flight; hook "Libra sent a | *multiple-choice* hello." slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: 7/10 “cute, but pick one” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi! (I picked one.) what’s your weekend like?”
//   after  9/10 “one hi + a question” · reply “D. definitely D.” · Pisces bawls · last line “Pick one and press send.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((e - 0.6) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 4; i++) {
    const a = -1.2 + i * 0.35, r0 = 145 + 8 * Math.sin(e * 30 + i), r1 = r0 + 55, cx = 160, cy = 1190
    for (const [c, w] of [[INK, 14], ['#e163d6', 7]]) { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); x.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); x.stroke() }
  }
  x.restore()
}


const EP = makeOpener({
  id: 'kroe19',
  dur: 9,
  sign: "libra",
  brk: "scratch",
  fix: "slash",
  ending: "loop",
  hook: "Libra sent a | *multiple-choice* hello.",
  opener: "A) hi  B) hey  C) hello  D) all of the above",
  opSize: 50,
  bad: ["7", "cute, but pick one"],
  better: "hi! (I picked one.) what’s your weekend like?",
  good: ["9", "one hi + a question"],
  reply: "D. definitely D.",
  last: "Pick one and | *press send.*",
  match: "Ivy",
  sub: "new match",
  recCap: "four options. *for “hi.”*",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
