// og-kroe02: social rework of kroe02. Static HOOK (outline) 0–3.0 replaces the slam hook; no series bug; softer whip;
// crazier Scorpio (typed from the shadows, still picks the darkest booth); kit copy ../openerkit.js (social safe zones).
// Original notes: kroe02, The 2 a.m. "u up?" (10 s vertical, star_advice trial reel, Month 2 boost m37, screwed · Em).
// The format look lives in ../openerkit.js (social copy of ../../kroe01/openerkit.js). No end card, no card cut. Ending: hard cut.
//   0.00   frame 0: ♏ Scorpio mid-type in the dark, the clock glowing 2:04 AM, a "u up?" bubble mid-launch; hook "Sending ‘*u up?*’ | at 2:04 a.m." slammed, the judges' paddles mid-flip.
//   0.40   whip zoom into the opener
//   1.90   THE STARS: 1/10 “it’s 2 a.m.” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “morning! coffee this week?”
//   after  9/10 “daylight + a plan” · reply “yes! thursday?” · Pisces bawls · last line “Daylight messages get daylight answers.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../openerkit.js'

function prop(x, e, S) {
  const sun = clamp((S.t - S.T.send) / 0.6)
  box(x, 360, 1120, 250, 86, sun > 0.5 ? '#ffe9a8' : '#140c28', { b: 6 })
  x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = sun > 0.5 ? INK : '#ff5c8a'
  x.fillText(sun > 0.5 ? '9:00 AM' : '2:04 AM', 485, 1165)
}
function back(x, e, S) {
  const sun = clamp((S.t - S.T.send) / 0.6)
  if (sun <= 0) return
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, `rgba(255,190,120,${0.55 * sun})`); g.addColorStop(1, `rgba(255,120,160,${0.25 * sun})`)
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
}


export const HOOK = '‘u up?’ at 2:04 a.m. | *Scorpio, no.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0

const EP = makeOpener({
  id: 'og-kroe02',
  dur: 10,
  sign: "scorpio",
  brk: "whip",
  fix: "slash",
  ending: "cut",
  night: true,
  hook: "Sending ‘*u up?*’ | at 2:04 a.m.",
  opener: "u up?",
  opSize: 80,
  bad: ["1", "sent from the void"],
  better: "morning! coffee thursday? I’ll pick the darkest booth.",
  good: ["9", "daylight + a plan"],
  reply: "yes! (why so dark lol)",
  last: "Daylight messages get | *daylight answers.*",
  match: "Riley",
  sub: "matched today",
  mood0: "squint",
  prop, back, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
