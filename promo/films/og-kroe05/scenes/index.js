// og-kroe05: social rework of kroe05. Static HOOK (box) 0–3.0 replaces the slam hook; no series bug; no
// record scratch / slam titles; hard cut on the last line; crazier Sagittarius (the voice note was recorded mid-hike); kit copy ../openerkit.js (social safe zones).
// Original notes: kroe05, The Four-Minute Voice Note (10 s vertical, star_advice trial reel, Month 2 boost m37, house · C).
// The format look lives in ../openerkit.js (social copy of ../../kroe01/openerkit.js). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♐ Sagittarius mid-ramble, a voice-note waveform stretching across the phone, 4:12; hook "First message: a | *four-minute* voice note." slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: 3/10 “that’s a podcast” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “your travel photos are great. where’s the café one?”
//   after  9/10 “short + curious” · reply “a tiny place in Lisbon!” · Pisces bawls · last line “Short and curious wins the first hello.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((S.t - S.T.pen) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 16; i++) { const h = 20 + 60 * Math.abs(Math.sin(e * 7 + i * 0.8)); R(x, i % 2 ? '#c9a6ff' : BONE, 350 + i * 30, 1160 - h / 2, 16, h) }
  label(x, '4:12', 900, 1160, { size: 40, col: GOLD })
  x.restore()
}


export const HOOK = 'First hello: a | *4-minute* voice note.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0

const EP = makeOpener({
  id: 'og-kroe05',
  dur: 10,
  sign: "sagittarius",
  brk: "scratch",
  fix: "slash",
  ending: "loop",
  hook: "First message: a | *four-minute* voice note.",
  hookSize: 90,
  opener: "[voice note · 4:12]",
  opSize: 60,
  bad: ["3", "recorded mid-hike"],
  better: "your travel photos are great. where’s the café one?",
  good: ["9", "short + curious"],
  reply: "a tiny place in Lisbon!",
  last: "Short and curious wins | *the first hello.*",
  match: "Ana",
  sub: "new match · travel pics",
  recCap: "four minutes. *zero breaths.*",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
