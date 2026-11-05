// kroe14: RATE THE OPENER, Correcting Their Bio (10 s vertical, star_advice trial reel, Month 2 boost m37, lofi · D).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♍ Virgo mid-correction, a lone "*you're" bubble mid-flight; hook "First message: | *fixing their grammar.*" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 2/10 “not a teacher” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “your bio made me laugh. is the cat story true?”
//   after  9/10 “lead with a like” · reply “100% true. he steals socks” · Pisces bawls · last line “Lead with what you liked.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((e - 0.6) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 4; i++) {
    const a = -1.2 + i * 0.35, r0 = 145 + 8 * Math.sin(e * 30 + i), r1 = r0 + 55, cx = 160, cy = 1190
    for (const [c, w] of [[INK, 14], ['#ff5c8a', 7]]) { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); x.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); x.stroke() }
  }
  x.restore()
}


const EP = makeOpener({
  id: 'kroe14',
  dur: 10,
  sign: "virgo",
  brk: "whip",
  fix: "slash",
  ending: "cut",
  hook: "First message: | *fixing their grammar.*",
  opener: "*you’re",
  opSize: 84,
  bad: ["2", "not a teacher"],
  better: "your bio made me laugh. is the cat story true?",
  good: ["9", "lead with a like"],
  reply: "100% true. he steals socks",
  last: "Lead with | *what you liked.*",
  match: "Lou",
  sub: "new match · cat person",
  mood0: "squint",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
