// og-kroe08: social rework of kroe08. Static HOOK (outline) 0–3.0 replaces the slam hook; no series bug; no
// record scratch / slam titles; hard cut on the last line; crazier Cancer (three sorrys in one hello); kit copy ../openerkit.js (social safe zones).
// Original notes: kroe08, Sorry to Bother You (10 s vertical, star_advice trial reel, Month 2 boost m37, lofi · F).
// The format look lives in ../openerkit.js (social copy of ../../kroe01/openerkit.js). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♋ Cancer mid-cringe, an apologetic "sorry to bother you…" bubble mid-flight; hook "Opening with | an *apology?*" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 4/10 “you’re not bothering” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi! your dog looks like a tiny judge. name?”
//   after  9/10 “warm + specific” · reply “his name is Judge. no joke” · Pisces bawls · last line “Don’t apologise for saying hi.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((e - 0.6) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 4; i++) {
    const a = -1.2 + i * 0.35, r0 = 145 + 8 * Math.sin(e * 30 + i), r1 = r0 + 55, cx = 160, cy = 1190
    for (const [c, w] of [[INK, 14], ['#8fe3ff', 7]]) { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); x.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); x.stroke() }
  }
  x.restore()
}


export const HOOK = 'Cancer apologised | for *saying hi.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0

const EP = makeOpener({
  id: 'og-kroe08',
  dur: 10,
  sign: "cancer",
  brk: "whip",
  fix: "slash",
  ending: "cut",
  hook: "Opening with | an *apology?*",
  opener: "sorry to bother you, you probably won’t reply but hi. sorry. ok bye. sorry",
  opSize: 48,
  bad: ["4", "three sorrys"],
  better: "hi! your dog looks like a tiny judge. name?",
  good: ["9", "warm + specific"],
  reply: "his name is Judge. no joke",
  last: "Don’t apologise | *for saying hi.*",
  match: "Max",
  sub: "new match · dog pics",
  mood0: "squint",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
