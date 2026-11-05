// kroe10: RATE THE OPENER, The Ghost Hypothetical (10 s vertical, star_advice trial reel, Month 2 boost m37, synthwave · Am).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♒ Aquarius in a bedsheet ghost costume, a ghost-hypothetical bubble mid-flight; hook "Aquarius opened with | a *ghost question.*" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: ?/10 (undecided…) · Pisces sobbing on the end of the panel
//   3.10   the red pen hovers… and leaves: nothing to fix
//   after  9/10 “weird. fun weird.” · reply “the bakery. obviously.” · Pisces bawls · last line “Weird is fine. Weird is a door.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  // a bedsheet ghost costume over Aquarius (two eye holes), until the score lands
  const k = 1 - clamp((S.t - S.T.score2 - 0.4) / 0.4), F = S.F
  if (k <= 0 || !F) return
  const cx = 160, cy = F.cy - 10, w = 270 * (0.9 + 0.1 * k)
  x.save(); x.globalAlpha = 0.93 * k
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w / 2 - 8, cy + 130); x.quadraticCurveTo(cx - w / 2 - 8, cy - 150, cx, cy - 158); x.quadraticCurveTo(cx + w / 2 + 8, cy - 150, cx + w / 2 + 8, cy + 130); x.closePath(); x.fill()
  x.fillStyle = '#f4f1ff'; x.beginPath(); x.moveTo(cx - w / 2, cy + 120)
  for (let i = 0; i <= 6; i++) x.lineTo(cx - w / 2 + i * w / 6, cy + 120 + (i % 2 ? 26 : 0) + 6 * Math.sin(e * 6 + i))
  x.quadraticCurveTo(cx + w / 2, cy - 140, cx, cy - 148); x.quadraticCurveTo(cx - w / 2, cy - 140, cx - w / 2, cy + 120); x.fill()
  R(x, INK, cx - 50, cy - 40, 30, 38); R(x, INK, cx + 20, cy - 40, 30, 38)
  x.restore()
}


const EP = makeOpener({
  id: 'kroe10',
  dur: 10,
  sign: "aquarius",
  brk: "whip",
  fix: "none",
  ending: "cut",
  night: true,
  hook: "Aquarius opened with | a *ghost question.*",
  opener: "hypothetical: you’re a ghost. where do you haunt first?",
  opSize: 48,
  bad: ["?", ""],
  good: ["9", "weird. fun weird."],
  reply: "the bakery. obviously.",
  last: "Weird is fine. | *Weird is a door.*",
  match: "Ren",
  sub: "new match",
  mood0: "happy",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
