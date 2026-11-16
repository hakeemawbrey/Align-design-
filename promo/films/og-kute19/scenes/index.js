// og-kute19: the social rework of kute19, THE UNSENT TEXT, "Libra about to say yes again" (12.8 s vertical).
// Same phone, cast and story; the kit copy is ../unsentkit.js (no series bug, no slam title, no whip zoom).
//   0.00 frame 0: Libra mid-spin, party hat on, "yes!! i'll be there!! bringing dip!!" mid-delete.
//        HOOK (static box, until 3.3): "Libra’s about to | say *yes* again."
//   1.20 "yes!! also yes to the other party" ✗ · 4.00 "maybe? what do YOU think i want?" ✗
//   6.80 "i'm going to sit this one out. have fun!" (nightcap on) → SENT 9.20 · 9.60 THE STARS · 10.10 Bea replies
import { makeUnsent } from '../unsentkit.js'
import { R, INK, GOLD, BONE } from '../unsentkit.js'

export const HOOK = 'Libra’s about to | say *yes* again.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.3

const COZY = 6.8
// party hat (while the yeses are typed) vs a pajama nightcap (once Libra picks rest)
function hat(c, t, o) {
  const top = o.y - o.s * 0.55, x = o.x + 6, cozy = t > COZY
  const wob = t < 0.5 ? 0.6 * (1 - t / 0.5) * Math.sin(t * 25) : 0.06 * Math.sin(t * 3)
  c.save(); c.translate(x, top - 6); c.rotate(wob)
  if (!cozy) { c.fillStyle = INK; c.beginPath(); c.moveTo(-40, 6); c.lineTo(0, -96); c.lineTo(40, 6); c.closePath(); c.fill(); c.fillStyle = '#ff8fb1'; c.beginPath(); c.moveTo(-32, 0); c.lineTo(0, -84); c.lineTo(32, 0); c.closePath(); c.fill(); R(c, GOLD, -20, -30, 40, 8); R(c, GOLD, -10, -60, 20, 8); R(c, INK, -10, -110, 20, 20); R(c, GOLD, -6, -106, 12, 12) }
  else { c.fillStyle = INK; c.beginPath(); c.moveTo(-48, 8); c.quadraticCurveTo(0, -70, 70, -20); c.lineTo(48, 8); c.closePath(); c.fill(); c.fillStyle = '#7fd0ff'; c.beginPath(); c.moveTo(-40, 2); c.quadraticCurveTo(0, -60, 62, -18); c.lineTo(40, 2); c.closePath(); c.fill(); R(c, INK, 60, -34, 26, 26); R(c, BONE, 64, -30, 18, 18); R(c, BONE, -46, -6, 92, 12) }
  c.restore()
}
const EP = makeUnsent({
  id: 'og-kute19', duration: 12.8,
  sign: 'libra', name: 'Libra', to: 'Bea', status: 'online', avatar: '#ff8fb1',
  hook: '', ending: 'cut', draftBase: 1,
  msgs: [{ text: 'party at mine sat!! you’re coming right??', at: -9, stamp: 'today 3:47 pm' }, { text: 'totally get it, rest up!', at: 10.1, typing: [9.65, 10.1] }],
  drafts: [
    { text: 'yes!! i’ll be there!! bringing dip!!', at: -2.7, cps: 15, del: -0.3, delCps: 45 },
    { text: 'yes!! also yes to the other party', at: 1.2, cps: 18, del: 3.1, delCps: 44 },
    { text: 'maybe? what do YOU think i want?', at: 4.0, cps: 18, del: 5.9, delCps: 44 },
    { text: 'i’m going to sit this one out. have fun!', at: COZY, cps: 18, send: 9.2 },
  ],
  onHero: (c, t, S, o) => hat(c, t, o),
  sob: t => t > 9.25 ? 3 : 2, pisMood: t => t > 9.25 ? 'heart' : 'sparkle',
  lines: [{ t: 9.6, text: 'A kind no beats a *tired* yes.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
