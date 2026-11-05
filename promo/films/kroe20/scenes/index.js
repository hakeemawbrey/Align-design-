// kroe20: RATE THE OPENER, The Space Fact Opener (10 s vertical, star_advice trial reel, Month 2 boost m37, synthwave · F#m).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♒ Aquarius at a telescope, a Moon-fact bubble mid-flight; hook "Opened with | a *Moon fact.*" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 7/10 “nerdy is charming” · Pisces sobbing on the end of the panel
//   3.10   the red pen adds a line: “…anyway, what’s your nerdy topic?”
//   after  9/10 “share + ask” · reply “ocean squid. don’t get me started” · Pisces bawls · last line “Share your thing. Then ask for theirs.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((S.t - S.T.pen) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k; x.translate(430, 1180); x.rotate(-0.5)
  box(x, -20, -26, 200, 52, '#c9a6ff', { b: 6, hi: '#e0ccff' }); box(x, 170, -34, 40, 68, '#9a7ad8', { b: 6 })
  x.restore(); x.save(); x.globalAlpha = k; R(x, INK, 420, 1190, 10, 70); R(x, INK, 380, 1250, 90, 10); x.restore()
}


const EP = makeOpener({
  id: 'kroe20',
  dur: 10,
  sign: "aquarius",
  brk: "whip",
  fix: "add",
  ending: "cut",
  night: true,
  hook: "Opened with | a *Moon fact.*",
  opener: "did you know the Moon is slowly drifting away from Earth?",
  opSize: 48,
  bad: ["7", "nerdy is charming"],
  better: "…anyway, what’s your nerdy topic?",
  good: ["9", "share + ask"],
  reply: "ocean squid. don’t get me started",
  last: "Share your thing. | *Then ask for theirs.*",
  match: "Nico",
  sub: "new match",
  mood0: "sparkle",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
