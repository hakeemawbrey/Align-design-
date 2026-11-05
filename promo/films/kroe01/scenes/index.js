// kroe01: RATE THE OPENER, "Opened With 'hey'" (10 s vertical, star_advice trial reel, Month 2 boost m37, pop · D).
// The format look lives in ../openerkit.js (shared by kroe01–kroe24). No end card, no card cut. Loops.
//   0.00   frame 0: "Opened with 'hey.' | Just hey." slammed; ♊ Gemini mid-scream at its phone, a tiny lonely "hey"
//          bubble mid-flight toward the lens, the judges' paddles mid-flip.
//   0.40   record scratch + freeze, red circle on "hey": "JUST HEY."
//   1.90   THE STARS: 2/10 "nothing to answer" (Pisces, sobbing, gives it a 10 anyway)
//   3.10   the red pen slashes "hey"; THE STARS write: "hey! is that trail in your photo hard?"
//   5.30   9/10 "a real question" · 6.40 reply "SO hard. you hike?" · Pisces bawls · 6.90 the last line.
//   9.55–10.0  loop back into frame 0.
import { makeOpener, R, BONE, INK, GOLD, clamp } from '../openerkit.js'

// Gemini's scream lines at frame 0 (fade once the bubble lands)
function prop(x, e, S) {
  const k = 1 - clamp((e - 0.6) / 0.4)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 4; i++) {
    const a = -1.2 + i * 0.35, r0 = 145 + 8 * Math.sin(e * 30 + i), r1 = r0 + 55
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(160 + Math.cos(a) * r0, 1190 + Math.sin(a) * r0); x.lineTo(160 + Math.cos(a) * r1, 1190 + Math.sin(a) * r1); x.stroke()
    x.strokeStyle = GOLD; x.lineWidth = 7; x.beginPath(); x.moveTo(160 + Math.cos(a) * r0, 1190 + Math.sin(a) * r0); x.lineTo(160 + Math.cos(a) * r1, 1190 + Math.sin(a) * r1); x.stroke()
  }
  x.restore()
  void R; void BONE; void S
}

const EP = makeOpener({
  id: 'kroe01', dur: 10, sign: 'gemini', brk: 'scratch', fix: 'slash', ending: 'loop',
  hook: 'Opened with ‘hey.’ | *Just hey.*',
  opener: 'hey', opSize: 84,
  bad: ['2', 'nothing to answer'],
  better: 'hey! is that trail in your photo hard?',
  good: ['9', 'a real question'],
  reply: 'SO hard. you hike?',
  last: 'Give them | *something to answer.*',
  match: 'Sam', sub: 'new match · hiking pics',
  recCap: 'just “hey.” *that’s the whole message.*',
  prop,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
