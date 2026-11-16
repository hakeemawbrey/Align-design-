// og-kute13: the social rework of kute13, THE UNSENT TEXT, "Aries typing angry" (9.2 s vertical).
// Same phone, cast and story; the kit copy is ../unsentkit.js (no series bug, no slam title, no screen shake, hard cut).
//   0.00 frame 0: Aries typing at furious speed, keycaps flying, "WOW OK. WOW. OK." mid-type.
//        HOOK (static box, until 3.3): "Aries is typing | in *ALL CAPS.*"
//   1.20 wipe · 1.60 "FINE. I'LL START MY OWN CREW." ✗ · 4.40 Aries breathes, the screen cools blue · 5.10 THE STARS
import { makeUnsent } from '../unsentkit.js'
import { box, BONE, MONO, clamp } from '../unsentkit.js'

export const HOOK = 'Aries is typing | in *ALL CAPS.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.3

// keycaps flying off the keyboard while Aries types angry (frame 0 → 1.2; again on the second rant)
function keycaps(c, t) {
  for (const [t0, t1] of [[-0.6, 1.2], [1.6, 3.2]]) for (let i = 0; i < 9; i++) {
    const b = t0 + i * ((t1 - t0) / 9), a = t - b
    if (a < 0 || a > 0.9) continue
    const h = ((i * 7919) % 1000) / 1000, px = 380 + h * 420 + (h - 0.5) * 500 * a, py = 1340 - 800 * a + 1400 * a * a
    c.save(); c.globalAlpha = 1 - a / 0.9; c.translate(px, py); c.rotate(a * 8 * (h - 0.5)); box(c, -24, -24, 48, 48, '#3b3366', { b: 4 }); c.font = `700 26px ${MONO}`; c.fillStyle = BONE; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('QWERTYUIO'[i], 0, 2); c.restore()
  }
}
const EP = makeUnsent({
  id: 'og-kute13', duration: 9.2,
  sign: 'aries', name: 'Aries', to: 'group: the crew', status: '5 members', avatar: '#ff8fb1',
  hook: '', ending: 'cut', draftBase: 1,
  msgs: [{ text: 'we already picked the place without you lol', at: -9, stamp: '9:31 pm' }],
  drafts: [
    { text: 'WOW OK. WOW. OK.', at: -0.6, cps: 16, del: 1.2, wipe: true },
    { text: 'FINE. I’LL START MY OWN CREW.', at: 1.6, cps: 18, del: 3.35, delCps: 40 },
  ],
  moods: [[-9, 'squint', [1, -0.4]], [1.2, 'wide', [0, 0]], [1.6, 'squint', [1, -0.4]], [3.35, 'wide', [0, 0]], [4.4, 'sleepy', [0, 0]], [5.7, 'happy', [1, 0.3]]],
  heroHops: [-0.3, -0.15, 0.0, 0.15, 0.3, 1.7, 2.0, 2.3, 2.6],
  screen: (c, t, S) => { const k = clamp((t - 4.4) / 0.5); if (k > 0) { c.save(); c.globalAlpha = 0.35 * k; c.fillStyle = '#4f8cff'; c.fillRect(S.SCR.x, S.SCR.y, S.SCR.w, S.SCR.h); c.restore() } },
  front: (c, t) => keycaps(c, t),
  sob: t => t > 3.4 ? 3 : 2,
  lines: [{ t: 5.1, text: 'Angry? Wait an *hour,* then type.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
