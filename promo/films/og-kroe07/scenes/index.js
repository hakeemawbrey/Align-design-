// og-kroe07: social rework of kroe07. Static HOOK (box) 0–3.0 replaces the slam hook; no series bug; no
// record scratch / slam titles; hard cut on the last line; crazier Libra (forty minutes to pick one word); kit copy ../openerkit.js (social safe zones).
// Original notes: kroe07, "You're Gorgeous" (That's It) (9 s vertical, star_advice trial reel, Month 2 boost m37, dreamy · Eb).
// The format look lives in ../openerkit.js (social copy of ../../kroe01/openerkit.js). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♎ Libra mid-swoon with heart eyes, a "you're gorgeous" bubble mid-flight trailing hearts; hook "Just ‘*you’re gorgeous.*’ | That’s it." slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: 5/10 “sweet, but a dead end” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “your bookshelf photo has taste. favourite one?”
//   after  9/10 “noticed what they chose” · reply “ok you get me. the space one” · Pisces bawls · last line “Compliment what they chose, not just their face.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../openerkit.js'

function prop(x, e, S) {
  hearts(x, e, -0.6, 200, 1080, { n: 6, cell: 9, life: 1.6 })
  hearts(x, e, 0.0, 240, 1060, { n: 4, cell: 7, life: 1.4 })
}


export const HOOK = 'Libra’s opener: | *‘you’re gorgeous.’*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0

const EP = makeOpener({
  id: 'og-kroe07',
  dur: 9,
  sign: "libra",
  brk: "scratch",
  fix: "slash",
  ending: "loop",
  hook: "Just ‘*you’re gorgeous.*’ | That’s it.",
  opener: "you’re gorgeous. (that took me 40 minutes)",
  opSize: 56,
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
