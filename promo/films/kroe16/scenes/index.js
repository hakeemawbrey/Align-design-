// kroe16: RATE THE OPENER, "What's Your Deepest Fear?" (10 s vertical, star_advice trial reel, Month 2 boost m37, screwed · Cm).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♏ Scorpio by candlelight, a "what's your deepest fear?" bubble mid-flight; hook "Scorpio opened with | ‘*deepest fear?*’" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 5/10 “deep end, day one” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “what’s something small that made your day?”
//   after  9/10 “an easy door” · reply “a stranger’s dog waved at me” · Pisces bawls · last line “Go deep later. Start with a small door.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  box(x, 400, 1150, 40, 90, BONE, { b: 5 }); R(x, INK, 417, 1132, 6, 20)
  const f = 1 + 0.15 * Math.sin(e * 23) + 0.1 * Math.sin(e * 41)
  x.save(); x.translate(420, 1122); x.scale(1, f)
  drawBits(x, ['.Y.', 'YOY', 'YOY', '.O.'], { Y: GOLD, O: '#ff8a3a' }, 0, 0, 9); x.restore()
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(420, 1120, 0, 420, 1120, 260); g.addColorStop(0, 'rgba(255,180,90,0.25)'); g.addColorStop(1, 'rgba(255,180,90,0)'); x.fillStyle = g; x.fillRect(160, 860, 520, 520); x.restore()
}


const EP = makeOpener({
  id: 'kroe16',
  dur: 10,
  sign: "scorpio",
  brk: "whip",
  fix: "slash",
  ending: "cut",
  night: true,
  hook: "Scorpio opened with | ‘*deepest fear?*’",
  opener: "what’s your deepest fear?",
  opSize: 58,
  bad: ["5", "deep end, day one"],
  better: "what’s something small that made your day?",
  good: ["9", "an easy door"],
  reply: "a stranger’s dog waved at me",
  last: "Go deep later. | *Start with a small door.*",
  match: "Mia",
  sub: "new match",
  mood0: "squint",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
