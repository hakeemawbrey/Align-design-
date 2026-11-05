// kute07: THE UNSENT TEXT, "“So… what are we?” draft six" (10 s vertical trial reel, music: house · C).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Libra mid-wobble, a tiny scale tipping, "no pressure but lol" mid-delete · 0.30 whip zoom
//   1.00 "so like… what are we haha" ✗ (wipe) · 3.50 "i want to know where we stand." · 6.60 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, BLUE, ease, clamp, prog } from '../../kute01/unsentkit.js'
// a tiny balance scale over Libra's head: it tips wildly while the drafts flip, and settles level on the honest one
function scale(c, t, o) {
  const cx = o.x + 10, cy = o.y - o.s * 0.62 - 40
  const tip = t < 5.6 ? 0.45 * Math.sin(t * 4.2) : 0.45 * Math.sin(5.6 * 4.2) * Math.exp(-(t - 5.6) * 4)
  R(c, INK, cx - 5, cy - 6, 10, 60); R(c, GOLD, cx - 2, cy - 4, 4, 56)
  c.save(); c.translate(cx, cy); c.rotate(tip)
  R(c, INK, -78, -6, 156, 12); R(c, GOLD, -76, -3, 152, 6)
  for (const d of [-1, 1]) { const px = d * 70; c.save(); c.translate(px, 0); c.rotate(-tip); R(c, INK, -2, 0, 4, 34); R(c, INK, -30, 30, 60, 14); R(c, GOLD, -27, 32, 54, 8); c.restore() }
  c.restore()
}
const EP = makeUnsent({
  id: 'kute07', duration: 10,
  sign: 'libra', name: 'Libra', to: 'Jules', status: 'online', avatar: '#9fe6b0',
  hook: 'Asking “what are we?” | *Draft* six.', ending: 'cut', draftBase: 4,
  msgs: [{ text: 'last night was really nice', at: -9, stamp: 'yesterday' }, { text: 'it really was', at: -8.8, from: 'me' }],
  drafts: [
    { text: 'no pressure but lol', at: -1.6, cps: 15, del: -0.25, delCps: 26 },
    { text: 'so like… what are we haha', at: 1.0, cps: 15, del: 3.1, wipe: true },
    { text: 'i want to know where we stand.', at: 3.5, cps: 15 },
  ],
  breaks: [{ kind: 'whip', at: 0.3, from: 1.6 }],
  onHero: (c, t, S, o) => scale(c, t, o),
  lines: [{ t: 6.6, text: 'Ask *clearly.* Hear the answer kindly.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
