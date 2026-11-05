// kroe15: RATE THE OPENER, All About Me (10 s vertical, star_advice trial reel, Month 2 boost m37, funk · Bb).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♌ Leo mid-pose in a spotlight, an "about me" bubble mid-flight; hook "Opener: a list of | *your* achievements." slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: 4/10 “where are they?” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi! your concert photo looks fun. what was it like?”
//   after  9/10 “about them” · reply “LOUD. amazing. you go to shows?” · Pisces bawls · last line “Make the first question about them.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'


function back(x, e, S) {
  const k = 1 - clamp((S.t - S.T.pen) / 0.5)
  if (k <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, 300, 0, 1300); g.addColorStop(0, `rgba(255,236,180,${0.04 * k})`); g.addColorStop(1, `rgba(255,236,180,${0.3 * k})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(120, 300); x.lineTo(200, 300); x.lineTo(340, 1300); x.lineTo(-20, 1300); x.closePath(); x.fill(); x.restore()
}

const EP = makeOpener({
  id: 'kroe15',
  dur: 10,
  sign: "leo",
  brk: "scratch",
  fix: "slash",
  ending: "loop",
  hook: "Opener: a list of | *your* achievements.",
  hookSize: 92,
  opener: "about me: funny, great cook, I run, I travel, very humble",
  opSize: 48,
  bad: ["4", "where are they?"],
  better: "hi! your concert photo looks fun. what was it like?",
  good: ["9", "about them"],
  reply: "LOUD. amazing. you go to shows?",
  last: "Make the first question | *about them.*",
  match: "Zoe",
  sub: "new match · concert pic",
  mood0: "sparkle",
  recCap: "“very humble.” *sure.*",
  back, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
