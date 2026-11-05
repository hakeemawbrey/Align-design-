// kute05: THE UNSENT TEXT, "Typing "congrats" and mostly meaning it" (9 s vertical trial reel, music: funk · A).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Leo mid-shriek, tiny crown mid-fall, "must be nice" mid-delete, mid whip zoom
//   0.90 "congrats i guess" ✗ · 2.80 "so proud of you. you earned it." → SENT 5.20 · 6.20 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, ease, clamp, prog } from '../../kute01/unsentkit.js'
// Leo's tiny crown: knocked off by the shriek at frame 0, it lands back on the top point by 0.7 s
function crown(c, t, o) {
  const p = ease.outCubic(clamp((t + 0.25) / 0.95)), top = o.y - o.s * 0.55
  const x = o.x + (1 - p) * 120, y = top - 30 - (1 - p) * 140 + 60 * Math.sin(Math.PI * p) * (1 - p), rot = (1 - p) * 1.4
  drawBits(c, ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG'], { G: GOLD, R: RED }, x, y, 11, { rot })
}
const EP = makeUnsent({
  id: 'kute05', duration: 9,
  sign: 'leo', name: 'Leo', to: 'Nico', status: 'online', avatar: '#7fd0ff',
  hook: 'Typing *congrats.* | Meaning it… mostly.', ending: 'cut', draftBase: 2,
  msgs: [{ text: 'I GOT THE JOB!!!', at: -9, stamp: 'today 4:20 pm' }],
  drafts: [
    { text: 'must be nice', at: -1.2, cps: 14, del: -0.2, delCps: 22 },
    { text: 'congrats i guess', at: 0.9, cps: 14, del: 2.4, delCps: 30 },
    { text: 'so proud of you. you earned it.', at: 2.8, cps: 16, send: 5.2 },
  ],
  breaks: [{ kind: 'whip', at: 0.3, from: 1.6 }],
  onHero: (c, t, S, o) => crown(c, t, o),
  sob: t => t > 5.25 ? 3 : 2, pisMood: t => t > 5.25 ? 'heart' : 'sparkle',
  lines: [{ t: 6.2, text: 'Envy and joy can share a *text.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
