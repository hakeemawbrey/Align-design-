// kroe21: RATE THE OPENER, Three Days Late (10 s vertical, star_advice trial reel, Month 2 boost m37, lofi · C).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♉ Taurus mid-wake under a blanket, "matched 3 days ago", a "sorry was busy" bubble mid-flight; hook "Three days late. | *‘sorry was busy.’*" slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: 4/10 “a bit flat” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi! took me a minute, your profile made me nervous, honestly”
//   after  9/10 “late, but honest” · reply “aw. that’s the nicest late text” · Pisces bawls · last line “Late is fine. Honest is better.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((S.t - S.T.pen) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  box(x, 20, 1215, 300, 90, '#9a7ad8', { b: 6, hi: '#b79cf0' })
  for (let i = 0; i < 5; i++) R(x, '#7f62c0', 40 + i * 58, 1240, 26, 50)
  x.restore()
}


const EP = makeOpener({
  id: 'kroe21',
  dur: 10,
  sign: "taurus",
  brk: "scratch",
  fix: "slash",
  ending: "loop",
  hook: "Three days late. | *‘sorry was busy.’*",
  opener: "sorry was busy",
  opSize: 64,
  bad: ["4", "a bit flat"],
  better: "hi! took me a minute, your profile made me nervous, honestly",
  good: ["9", "late, but honest"],
  reply: "aw. that’s the nicest late text",
  last: "Late is fine. | *Honest is better.*",
  match: "Rae",
  sub: "matched 3 days ago",
  mood0: "sleepy",
  recCap: "three days. *two words.*",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
