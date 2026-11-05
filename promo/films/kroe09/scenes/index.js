// kroe09: RATE THE OPENER, Pizza Debate Opener (9 s vertical, star_advice trial reel, Month 2 boost m37, jazzy · F).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♉ Taurus mid-chomp with a pizza slice, a "settle this: pineapple on pizza?" bubble mid-flight; hook "Taurus opened with | a *food debate.*" slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: ?/10 (undecided…) · Pisces sobbing on the end of the panel
//   3.10   the red pen hovers… and leaves: nothing to fix
//   after  10/10 “easy + fun to answer” · reply “YES. fight me.” · Pisces bawls · last line “A fun question beats a perfect line.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

const PIZZA = ["....YY", "...YYY", "..YRYY", ".YYYYY", "YRYYRY", "CCCCCC"]
function prop(x, e, S) {
  const k = 0 ? 1 - clamp((S.t - 0) / 0.3) : 1
  if (k <= 0) return
  drawBits(x, PIZZA, { Y: GOLD, R: '#e8344e', C: '#c98a3e' }, 330 + 6 * Math.sin(e * 5), 1120 + 6 * Math.cos(e * 4), 14, { rot: 0.25 * Math.sin(e * 2), alpha: k })
}


const EP = makeOpener({
  id: 'kroe09',
  dur: 9,
  sign: "taurus",
  brk: "scratch",
  fix: "none",
  ending: "loop",
  hook: "Taurus opened with | a *food debate.*",
  opener: "settle this: pineapple on pizza?",
  opSize: 56,
  bad: ["?", ""],
  good: ["10", "easy + fun to answer"],
  reply: "YES. fight me.",
  last: "A fun question | *beats a perfect line.*",
  match: "Kai",
  sub: "new match",
  mood0: "happy",
  recCap: "wait for it… *the red pen…*",
  endGood: "10",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
