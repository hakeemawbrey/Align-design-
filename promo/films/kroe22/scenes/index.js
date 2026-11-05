// kroe22: RATE THE OPENER, "Wanna Go to Lisbon?" (10 s vertical, star_advice trial reel, Month 2 boost m37, cinematic · E).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♐ Sagittarius mid-leap with plane tickets and a suitcase, a "wanna go to Lisbon?" bubble mid-flight; hook "First message: | a *plane ticket.*" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 4/10 “trip before hello” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “what’s the best trip you’ve ever taken?”
//   after  9/10 “curious first” · reply “ok I need 20 minutes for this” · Pisces bawls · last line “Ask about the trip before you book it.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((S.t - S.T.pen) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 2; i++) { x.save(); x.translate(430 + i * 150, 1150 - 20 * Math.sin(e * 3 + i)); x.rotate(-0.2 + i * 0.3); box(x, -80, -40, 160, 80, '#7fd0ff', { b: 5 }); R(x, INK, 30, -40, 4, 80); x.font = `700 26px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LIS', -22, 2); x.restore() }
  box(x, 690, 1110, 180, 130, '#e8344e', { b: 6, hi: '#ff6b7f' }); R(x, INK, 750, 1090, 60, 20)
  x.restore()
}


const EP = makeOpener({
  id: 'kroe22',
  dur: 10,
  sign: "sagittarius",
  brk: "whip",
  fix: "slash",
  ending: "cut",
  hook: "First message: | a *plane ticket.*",
  opener: "wanna go to Lisbon?",
  opSize: 66,
  bad: ["4", "trip before hello"],
  better: "what’s the best trip you’ve ever taken?",
  good: ["9", "curious first"],
  reply: "ok I need 20 minutes for this",
  last: "Ask about the trip | *before you book it.*",
  match: "Tess",
  sub: "new match · travel pics",
  mood0: "sparkle",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
