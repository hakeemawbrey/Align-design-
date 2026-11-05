// kroe12: RATE THE OPENER, "Hi, I Already Love You" (10 s vertical, star_advice trial reel, Month 2 boost m37, dreamy · Db).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♓ Pisces mid-swoon, tears flying, a "hi I already love you" bubble mid-flight; hook "Pisces’ first message: | ‘*I love you.*’" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 3/10 “big heart, big leap” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi! your laugh in that video looks contagious.”
//   after  9/10 “warm, not a leap” · reply “it IS. ask my friends” · Pisces bawls · last line “Big heart. Small first step.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  hearts(x, e, -0.6, 200, 1080, { n: 6, cell: 9, life: 1.6 })
  hearts(x, e, 0.0, 240, 1060, { n: 4, cell: 7, life: 1.4 })
}


const EP = makeOpener({
  id: 'kroe12',
  dur: 10,
  sign: "pisces",
  judge: "cancer",
  brk: "whip",
  fix: "slash",
  ending: "cut",
  hook: "Pisces’ first message: | ‘*I love you.*’",
  opener: "hi I already love you",
  opSize: 62,
  bad: ["3", "big heart, big leap"],
  better: "hi! your laugh in that video looks contagious.",
  good: ["9", "warm, not a leap"],
  reply: "it IS. ask my friends",
  last: "Big heart. | *Small first step.*",
  match: "Ari",
  sub: "new match · laughing video",
  mood0: "heart",
  endBad: "8",
  endGood: "10",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
