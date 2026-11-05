// kroe18: RATE THE OPENER, Meet My Family (Opener) (10 s vertical, star_advice trial reel, Month 2 boost m37, jazzy · Ab).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♋ Cancer mid-wave in the snow, a holiday-invite bubble mid-flight; hook "First message: | *meet my family?*" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 3/10 “warm. too fast.” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi! cocoa or tea person, now that it’s cold?”
//   after  9/10 “cosy + easy” · reply “cocoa. with way too many marshmallows” · Pisces bawls · last line “Save the family dinner for later.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'


function back(x, e, S) {
  for (let i = 0; i < 40; i++) { const px = (i * 173.3 + 30 * Math.sin(e + i)) % 1080, py = ((i * 97.1 + e * (70 + (i % 5) * 20)) % 1920); R(x, i % 3 ? BONE : '#cfeeff', px, py, 8 + (i % 3) * 3, 8 + (i % 3) * 3) }
}

const EP = makeOpener({
  id: 'kroe18',
  dur: 10,
  sign: "cancer",
  brk: "whip",
  fix: "slash",
  ending: "cut",
  hook: "First message: | *meet my family?*",
  opener: "want to come to my family’s for the holidays?",
  opSize: 50,
  bad: ["3", "warm. too fast."],
  better: "hi! cocoa or tea person, now that it’s cold?",
  good: ["9", "cosy + easy"],
  reply: "cocoa. with way too many marshmallows",
  last: "Save the family dinner | *for later.*",
  match: "Sol",
  sub: "new match",
  mood0: "happy",
  back, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
