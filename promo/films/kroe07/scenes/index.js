// kroe07: RATE THE OPENER, "You're Gorgeous" (That's It) (9 s vertical, star_advice trial reel, Month 2 boost m37, dreamy · Eb).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♎ Libra mid-swoon with heart eyes, a "you're gorgeous" bubble mid-flight trailing hearts; hook "Just ‘*you’re gorgeous.*’ | That’s it." slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: 5/10 “sweet, but a dead end” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “your bookshelf photo has taste. favourite one?”
//   after  9/10 “noticed what they chose” · reply “ok you get me. the space one” · Pisces bawls · last line “Compliment what they chose, not just their face.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  hearts(x, e, -0.6, 200, 1080, { n: 6, cell: 9, life: 1.6 })
  hearts(x, e, 0.0, 240, 1060, { n: 4, cell: 7, life: 1.4 })
}


const EP = makeOpener({
  id: 'kroe07',
  dur: 9,
  sign: "libra",
  brk: "scratch",
  fix: "slash",
  ending: "loop",
  hook: "Just ‘*you’re gorgeous.*’ | That’s it.",
  opener: "you’re gorgeous",
  opSize: 66,
  bad: ["5", "sweet, but a dead end"],
  better: "your bookshelf photo has taste. favourite one?",
  good: ["9", "noticed what they chose"],
  reply: "ok you get me. the space one",
  last: "Compliment what they chose, | *not just their face.*",
  lastSize: 80,
  match: "Theo",
  sub: "new match · bookshelf pic",
  mood0: "heart",
  recCap: "sweet. *and then… nothing.*",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
