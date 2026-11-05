// kbge19: BIO GLOW-UP, "The group chat wrote it" (11 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Libra's bio mid-tug-of-war: four chat bubbles yanking the card in different directions; hook "Libra let the | *group chat* write it."
//   0.35  screen shake · 1.35 circle "(say 3)" → GROUP CHAT · 1.9 THE STARS · 2.75 strike
//   3.5   the glow-up in Libra's own voice: "I make a mean playlist and I always *share the fries.*" · Pisces cries
//   a message · 9.5 last line. Hard cut.
import { makeBio, signStar, bubble, R, INK, prog, ease, lerp, outK } from '../../kbge01/biokit.js'
const SAG = signStar('sagittarius')
const PULLS = [['add a pun!', 250, 560, -1], ['NO puns!!', 830, 600, 1], ['say you hike', 250, 1440, -1], ['say you DON’T', 830, 1450, 1]]
function tug(x, t, S) {
  const k = outK(t, [S.T.strike[0] - 0.2, S.T.strike[0] + 0.1])
  if (k <= 0.01) return
  PULLS.forEach(([txt, px, py, d], i) => {
    const yank = Math.sin(t * 9 + i * 1.7) * 14
    x.save(); x.globalAlpha *= k
    // the rope to the card edge
    x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 5; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(px + yank * d, py); x.lineTo(d < 0 ? S.CARD.x + 10 : S.CARD.x + S.CARD.w - 10, py < 900 ? S.CARD.y + 200 : S.CARD.y + S.CARD.h - 120); x.stroke(); x.setLineDash([])
    x.restore()
    bubble(x, t, px + yank * d, py, -1 + i * 0.05, S.T.strike[0] + 0.1, txt, { size: 30, tail: d * 0.5, col: i % 2 ? '#c9f2d4' : '#ffd6e4' })
  })
  void R; void INK; void prog; void ease; void lerp
}
const EP = makeBio({
  id: 'kbge19', sign: 'libra', name: 'Libra', age: 27, D: 11,
  hook: 'Libra let the | *group chat* write it.', hookColor: '#ffb3d1', hookSize: 94,
  bad: 'Loves sushi?? Gym 5x (say 3) adventurous?? no wait, funny',
  circle: { word: '(say 3)', label: 'GROUP CHAT' },
  says: [{ t: 1.95, text: 'and what do *you* sound like?' }],
  good: 'I make a mean playlist and I always *share the fries.*',
  fx: 'shake', shake0: 10, cps: 26,
  reply: { body: 'sharing fries is *elite* behaviour', glyph: SAG.glyph, color: SAG.color },
  camera: (t, S, c) => ({ ...c, cxp: 540 + (t < S.T.strike[0] ? 10 * Math.sin(t * 9) : 0) }),
  top: tug,
  last: 'Friends can help. | *You* write it.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
