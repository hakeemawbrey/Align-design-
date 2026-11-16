// og-kroe04: social rework of kroe04. Static HOOK (outline) 0–3.0 replaces the slam hook; no series bug; no
// record scratch / slam titles; hard cut on the last line; crazier Leo (applauds his own pickup line); kit copy ../openerkit.js (social safe zones).
// Original notes: kroe04, The Cheesy Pickup Line (10 s vertical, star_advice trial reel, Month 2 boost m37, funk · A).
// The format look lives in ../openerkit.js (social copy of ../../kroe01/openerkit.js). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♌ Leo mid-finger-guns, a pickup-line bubble, a pixel cheese wedge flying; hook "Leading with | a *pickup line?*" slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 6/10 “corny, but brave” · Pisces sobbing on the end of the panel
//   3.10   the red pen adds a line: “ok that was cheesy. what’s your go-to pizza?”
//   after  9/10 “corny + a question” · reply “haha. extra cheese, obviously” · Pisces bawls · last line “Corny works. Follow it with a real question.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../openerkit.js'

const CHEESE = ["..YY", ".YOY", "YYYY", "YOYY"]
function prop(x, e, S) {
  const k = S.T.pen ? 1 - clamp((S.t - S.T.pen) / 0.3) : 1
  if (k <= 0) return
  drawBits(x, CHEESE, { Y: GOLD, O: '#d99a2b' }, 470 + 6 * Math.sin(e * 5), 1150 + 6 * Math.cos(e * 4), 14, { rot: 0.25 * Math.sin(e * 2), alpha: k })
}


export const HOOK = 'Leo opened with | a *pickup line.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0

const EP = makeOpener({
  id: 'og-kroe04',
  dur: 10,
  sign: "leo",
  brk: "whip",
  fix: "add",
  ending: "cut",
  hook: "Leading with | a *pickup line?*",
  opener: "are you a parking ticket? you’ve got FINE written all over you. (I’m clapping)",
  opSize: 40,
  bad: ["6", "he applauded himself"],
  better: "ok, cheesy. what’s your go-to pizza?",
  good: ["9", "corny + a question"],
  reply: "extra cheese, duh",
  last: "Corny works. | *Follow it with a real question.*",
  lastSize: 80,
  match: "Jess",
  sub: "new match",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
