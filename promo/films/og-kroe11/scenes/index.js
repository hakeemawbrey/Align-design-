// og-kroe11: social rework of kroe11. Static HOOK (box) 0–3.0 replaces the slam hook; no series bug; no
// record scratch / slam titles; hard cut on the last line; crazier Aries (booked the table before saying hello); kit copy ../openerkit.js (social safe zones).
// Original notes: kroe11, "Dinner Tomorrow, 7 PM" (10 s vertical, star_advice trial reel, Month 2 boost m37, chiptune · E).
// The format look lives in ../openerkit.js (social copy of ../../kroe01/openerkit.js). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♈ Aries mid-sprint, a "dinner tomorrow 7pm. ok?" bubble mid-flight, a stopwatch at 0:00:02; hook "Matched 2 seconds ago. | *Dinner tomorrow?*" slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: 4/10 “too soon” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi! I’m excited to chat. how’s your week going?”
//   after  9/10 “warm, no rush” · reply “better now haha” · Pisces bawls · last line “Excited is cute. Give it a minute.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((S.t - S.T.pen) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  box(x, 360, 1120, 300, 86, '#140c28', { b: 6 })
  x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ff5c8a'
  x.fillText(`0:00:0${Math.min(9, 2 + Math.floor(e * 0.8))}`, 510, 1165)
  label(x, 'since the match', 510, 1240, { size: 24, col: BONE })
  x.restore()
}


export const HOOK = 'Matched 2 secs ago. | *Dinner tomorrow?*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0

const EP = makeOpener({
  id: 'og-kroe11',
  dur: 10,
  sign: "aries",
  brk: "scratch",
  fix: "slash",
  ending: "loop",
  hook: "Matched 2 seconds ago. | *Dinner tomorrow?*",
  hookSize: 90,
  opener: "dinner tomorrow 7pm. ok? I already booked it.",
  opSize: 60,
  bad: ["4", "booked before hello"],
  better: "hi! I’m excited to chat. how’s your week going?",
  good: ["9", "warm, no rush"],
  reply: "better now haha",
  last: "Excited is cute. | *Give it a minute.*",
  match: "Dev",
  sub: "matched 2 seconds ago",
  recCap: "two seconds. *two.*",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
