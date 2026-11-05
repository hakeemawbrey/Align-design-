// kroe13: RATE THE OPENER, Hi [NAME]! (10 s vertical, star_advice trial reel, Month 2 boost m37, pop · G).
// The format look lives in ../../kroe01/openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♊ Gemini mid-gasp, a "Hi [NAME]!" template bubble mid-flight; hook "Gemini sent | the *template.*" slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: 2/10 “the brackets, though” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi Sam! you said you play piano. what’s your go-to song?”
//   after  9/10 “written for them” · reply “honestly? the one from cartoons” · Pisces bawls · last line “Write it for them. Only them.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../../kroe01/openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((e - 0.6) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 4; i++) {
    const a = -1.2 + i * 0.35, r0 = 145 + 8 * Math.sin(e * 30 + i), r1 = r0 + 55, cx = 160, cy = 1190
    for (const [c, w] of [[INK, 14], ['#ff5c8a', 7]]) { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); x.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); x.stroke() }
  }
  x.restore()
}


const EP = makeOpener({
  id: 'kroe13',
  dur: 10,
  sign: "gemini",
  brk: "scratch",
  fix: "slash",
  ending: "loop",
  hook: "Gemini sent | the *template.*",
  opener: "Hi [NAME]! I love your vibe :)",
  opSize: 56,
  bad: ["2", "the brackets, though"],
  better: "hi Sam! you said you play piano. what’s your go-to song?",
  good: ["9", "written for them"],
  reply: "honestly? the one from cartoons",
  last: "Write it for them. | *Only them.*",
  match: "Sam",
  sub: "new match · plays piano",
  recCap: "[NAME]. *with the brackets.*",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
