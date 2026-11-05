// kute19: THE UNSENT TEXT, "Libra about to say yes again" (11 s vertical trial reel, music: funk · E).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Libra mid-spin, half party hat half pajamas, "yes!! i'll be there" mid-delete · 0.30 whip zoom
//   1.20 "yes!! can't wait" ✗ · 3.00 "maybe? depends lol" ✗ · 5.00 "i'm going to sit this one out. have fun!" → SENT 7.40 · 7.80 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'
// party hat (while the yeses are typed) vs a pajama nightcap (once Libra picks rest)
function hat(c, t, o) {
  const top = o.y - o.s * 0.55, x = o.x + 6, cozy = t > 5.0
  const wob = t < 0.5 ? 0.6 * (1 - t / 0.5) * Math.sin(t * 25) : 0.06 * Math.sin(t * 3)
  c.save(); c.translate(x, top - 6); c.rotate(wob)
  if (!cozy) { c.fillStyle = INK; c.beginPath(); c.moveTo(-40, 6); c.lineTo(0, -96); c.lineTo(40, 6); c.closePath(); c.fill(); c.fillStyle = '#ff8fb1'; c.beginPath(); c.moveTo(-32, 0); c.lineTo(0, -84); c.lineTo(32, 0); c.closePath(); c.fill(); R(c, GOLD, -20, -30, 40, 8); R(c, GOLD, -10, -60, 20, 8); R(c, INK, -10, -110, 20, 20); R(c, GOLD, -6, -106, 12, 12) }
  else { c.fillStyle = INK; c.beginPath(); c.moveTo(-48, 8); c.quadraticCurveTo(0, -70, 70, -20); c.lineTo(48, 8); c.closePath(); c.fill(); c.fillStyle = '#7fd0ff'; c.beginPath(); c.moveTo(-40, 2); c.quadraticCurveTo(0, -60, 62, -18); c.lineTo(40, 2); c.closePath(); c.fill(); R(c, INK, 60, -34, 26, 26); R(c, BONE, 64, -30, 18, 18); R(c, BONE, -46, -6, 92, 12) }
  c.restore()
}
const EP = makeUnsent({
  id: 'kute19', duration: 11,
  sign: 'libra', name: 'Libra', to: 'Bea', status: 'online', avatar: '#ff8fb1',
  hook: 'Libra about to | say *yes* again.', ending: 'cut', draftBase: 1,
  msgs: [{ text: 'party at mine sat!! you’re coming right??', at: -9, stamp: 'today 3:47 pm' }, { text: 'totally get it, rest up!', at: 8.3, typing: [7.85, 8.3] }],
  drafts: [
    { text: 'yes!! i’ll be there', at: -1.6, cps: 15, del: -0.25, delCps: 26 },
    { text: 'yes!! can’t wait', at: 1.2, cps: 15, del: 2.6, delCps: 32 },
    { text: 'maybe? depends lol', at: 3.0, cps: 15, del: 4.6, delCps: 32 },
    { text: 'i’m going to sit this one out. have fun!', at: 5.0, cps: 18, send: 7.4 },
  ],
  breaks: [{ kind: 'whip', at: 0.3, from: 1.6 }],
  onHero: (c, t, S, o) => hat(c, t, o),
  sob: t => t > 7.45 ? 3 : 2, pisMood: t => t > 7.45 ? 'heart' : 'sparkle',
  lines: [{ t: 7.8, text: 'A kind no beats a *tired* yes.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
