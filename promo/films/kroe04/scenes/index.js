// kroe04: RATE THE OPENER, The Cheesy Pickup Line (10 s vertical, star_advice trial reel, Month 2 boost m37, funk · A).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♌ Leo mid-finger-guns, a pickup-line bubble, a pixel cheese wedge flying; hook "Leading with | a *pickup line?*" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 6/10 “corny, but brave” · Pisces sobbing on the end of the panel
//   3.10   the red pen adds a line: “ok that was cheesy. what’s your go-to pizza?”
//   after  9/10 “corny + a question” · reply “haha. extra cheese, obviously” · Pisces bawls · last line “Corny works. Follow it with a real question.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

const CHEESE = ["..YY", ".YOY", "YYYY", "YOYY"]
function prop(x, e, S) {
  const k = S.T.pen ? 1 - clamp((S.t - S.T.pen) / 0.3) : 1
  if (k <= 0) return
  drawBits(x, CHEESE, { Y: GOLD, O: '#d99a2b' }, 470 + 6 * Math.sin(e * 5), 1150 + 6 * Math.cos(e * 4), 14, { rot: 0.25 * Math.sin(e * 2), alpha: k })
}


const EP = makeOpener({
  id: 'kroe04',
  dur: 10,
  sign: "leo",
  brk: "whip",
  fix: "add",
  ending: "cut",
  hook: "Leading with | a *pickup line?*",
  opener: "are you a parking ticket? because you’ve got FINE written all over you",
  opSize: 46,
  bad: ["6", "corny, but brave"],
  better: "ok that was cheesy. what’s your go-to pizza?",
  good: ["9", "corny + a question"],
  reply: "haha. extra cheese, obviously",
  last: "Corny works. | *Follow it with a real question.*",
  lastSize: 80,
  match: "Jess",
  sub: "new match",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
