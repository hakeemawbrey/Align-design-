// og-kroe03: social rework of kroe03. Static HOOK (box) 0–3.0 replaces the slam hook; no series bug; no
// record scratch / slam titles; hard cut on the last line; crazier Virgo (an intro with footnotes, alphabetised spices); kit copy ../openerkit.js (social safe zones).
// Original notes: kroe03, The Six-Paragraph Hello (11 s vertical, star_advice trial reel, Month 2 boost m37, lofi · Bb).
// The format look lives in ../openerkit.js (social copy of ../../kroe01/openerkit.js). No end card, no card cut. Ending: loop.
//   0.00   frame 0: ♍ Virgo mid-scroll as an essay bubble unrolls, a scroll bar reading "1 of 6 paragraphs"; hook "First message. | *Six paragraphs.*" slammed, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on the opener
//   1.90   THE STARS: 4/10 “a lot. so much.” · Pisces sobbing on the end of the panel
//   3.10   the red pen slashes it; THE STARS write: “hi! you said you bake. best thing you’ve made?”
//   after  9/10 “short + about them” · reply “a lemon tart. want the recipe?” · Pisces bawls · last line “Leave room for them to talk.”
import { makeOpener, R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp } from '../openerkit.js'

function prop(x, e, S) {
  const k = 1 - clamp((S.t - S.T.pen) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  R(x, INK, 924, 760, 16, 520); R(x, '#5a5470', 928, 764, 8, 512)
  const p = clamp(e / 1.2); R(x, GOLD, 926, 764 + 500 * p * 0.1, 12, 24)
  label(x, '1 of 6 paragraphs', 640, 1190, { size: 30, col: GOLD })
  x.restore()
}


export const HOOK = 'Virgo’s first text | had *footnotes.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0

const EP = makeOpener({
  id: 'og-kroe03',
  dur: 11,
  sign: "virgo",
  brk: "scratch",
  fix: "slash",
  ending: "loop",
  hook: "First message. | *Six paragraphs.*",
  opener: "hi! quick intro (with footnotes): I alphabetise my spices, I bake on Sundays, I’ve ranked every font, and",
  opSize: 40,
  bad: ["4", "it has footnotes"],
  better: "hi! you said you bake. best thing you’ve made?",
  good: ["9", "short + about them"],
  reply: "a lemon tart. want the recipe?",
  last: "Leave room for *them to talk.*",
  match: "Noor",
  sub: "new match · loves baking",
  recCap: "and that was *paragraph one.*",
  prop, 
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [R, box, drawBits, hearts, label, BONE, INK, GOLD, MONO, clamp]
