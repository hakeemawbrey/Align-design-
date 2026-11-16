// og-kroe09: social rework of kroe09. Static HOOK (box) 0–3.0 replaces the slam hook; no series bug; no
// record scratch / slam titles; hard cut on the last line; crazier Taurus (asks with a slice already in hand); kit copy ../openerkit.js (social safe zones).
// Original notes: kroe09, Pizza Debate Opener (9 s vertical, star_advice trial reel, Month 2 boost m37, jazzy · F).
// The format look lives in ../openerkit.js (social copy of ../../kroe01/openerkit.js). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♉ Taurus mid-chomp with a pizza slice, a "settle this: pineapple on pizza?" bubble mid-flight; hook "Taurus opened with | a *food debate.*" slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: ?/10 (undecided…) · Pisces sobbing on the end of the panel
//   3.10   the red pen hovers… and leaves: nothing to fix
//   after  10/10 “easy + fun to answer” · reply “YES. fight me.” · Pisces bawls · last line “A fun question beats a perfect line.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../openerkit.js'

const PIZZA = ["....YY", "...YYY", "..YRYY", ".YYYYY", "YRYYRY", "CCCCCC"]
function prop(x, e, S) {
  const k = 0 ? 1 - clamp((S.t - 0) / 0.3) : 1
  if (k <= 0) return
  drawBits(x, PIZZA, { Y: GOLD, R: '#e8344e', C: '#c98a3e' }, 100 + 6 * Math.sin(e * 5), 1000 + 6 * Math.cos(e * 4), 14, { rot: 0.25 * Math.sin(e * 2), alpha: k })
}


export const HOOK = 'Taurus opened with | a *pizza debate.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0

const EP = makeOpener({
  id: 'og-kroe09',
  dur: 9,
  sign: "taurus",
  brk: "scratch",
  fix: "none",
  ending: "loop",
  hook: "Taurus opened with | a *food debate.*",
  opener: "settle this: pineapple on pizza? asking with a slice in hand",
  opSize: 50,
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
