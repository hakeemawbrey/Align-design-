// kroe08: RATE THE OPENER, Sorry to Bother You (10 s vertical, star_advice trial reel, Month 2 boost m37, lofi · F).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♋ Cancer mid-cringe, an apologetic "sorry to bother you…" bubble mid-flight; hook "Opening with | an *apology?*" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 4/10 “you’re not bothering” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi! your dog looks like a tiny judge. name?”
//   after  9/10 “warm + specific” · reply “his name is Judge. no joke” · Pisces bawls · last line “Don’t apologise for saying hi.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((e - 0.6) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 4; i++) {
    const a = -1.2 + i * 0.35, r0 = 145 + 8 * Math.sin(e * 30 + i), r1 = r0 + 55, cx = 160, cy = 1190
    for (const [c, w] of [[INK, 14], ['#8fe3ff', 7]]) { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); x.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); x.stroke() }
  }
  x.restore()
}


const EP = makeOpener({
  id: 'kroe08',
  dur: 10,
  sign: "cancer",
  brk: "whip",
  fix: "slash",
  ending: "cut",
  hook: "Opening with | an *apology?*",
  opener: "sorry to bother you, you probably won’t reply but hi",
  opSize: 48,
  bad: ["4", "you’re not bothering"],
  better: "hi! your dog looks like a tiny judge. name?",
  good: ["9", "warm + specific"],
  reply: "his name is Judge. no joke",
  last: "Don’t apologise | *for saying hi.*",
  match: "Max",
  sub: "new match · dog pics",
  mood0: "squint",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
