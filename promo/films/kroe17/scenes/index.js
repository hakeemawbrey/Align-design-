// kroe17: RATE THE OPENER, The Job Interview Opener (10 s vertical, star_advice trial reel, Month 2 boost m37, house · D).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♑ Capricorn mid-slam of a clipboard, a five-year-plan question mid-flight; hook "Opener: ‘*Where do you | see yourself?*’" slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: 3/10 “it’s a chat” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “what’s the best thing you ate this week?”
//   after  9/10 “easy + fun” · reply “a dumpling the size of my fist” · Pisces bawls · last line “It’s a chat, not a job interview.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((S.t - S.T.pen) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k; x.translate(400, 1150); x.rotate(-0.12 + 0.05 * Math.sin(e * 4))
  box(x, -70, -90, 140, 180, '#a07850', { b: 6 }); R(x, BONE, -56, -70, 112, 150); box(x, -30, -102, 60, 26, '#5a5470', { b: 4 })
  for (let i = 0; i < 5; i++) R(x, '#9a90b0', -44, -50 + i * 26, 88 - (i % 2) * 24, 8)
  x.restore()
}


const EP = makeOpener({
  id: 'kroe17',
  dur: 10,
  sign: "capricorn",
  brk: "scratch",
  fix: "slash",
  ending: "loop",
  hook: "Opener: ‘*Where do you | see yourself?*’",
  hookSize: 92,
  opener: "where do you see yourself in five years?",
  opSize: 54,
  bad: ["3", "it’s a chat"],
  better: "what’s the best thing you ate this week?",
  good: ["9", "easy + fun"],
  reply: "a dumpling the size of my fist",
  last: "It’s a chat, | *not a job interview.*",
  match: "Eli",
  sub: "new match",
  mood0: "neutral",
  recCap: "a first message. *or round one?*",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
