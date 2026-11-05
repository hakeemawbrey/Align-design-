// kroe06: RATE THE OPENER, "I Hope This Message Finds You Well" (10 s vertical, star_advice trial reel, Month 2 boost m37, cinematic · Gm).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♑ Capricorn stiff-backed beside a formal letter-bubble ("Dear Jordan…") mid-flight, clipboard in hand; hook "Opened like | a *cover letter.*" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 3/10 “very formal” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi Jordan! settle this: best sandwich in town?”
//   after  9/10 “fun + easy” · reply “ok I have STRONG opinions” · Pisces bawls · last line “Hi works. You’re not applying for a job.”
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
  id: 'kroe06',
  dur: 10,
  sign: "capricorn",
  brk: "whip",
  fix: "slash",
  ending: "cut",
  hook: "Opened like | a *cover letter.*",
  opener: "Dear Jordan, I hope this message finds you well. Kind regards.",
  opSize: 46,
  bad: ["3", "very formal"],
  better: "hi Jordan! settle this: best sandwich in town?",
  good: ["9", "fun + easy"],
  reply: "ok I have STRONG opinions",
  last: "Hi works. You’re not | *applying for a job.*",
  match: "Jordan",
  sub: "new match",
  mood0: "neutral",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
