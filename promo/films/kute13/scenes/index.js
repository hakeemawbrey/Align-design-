// kute13: THE UNSENT TEXT, "Aries typing angry" (8 s vertical trial reel, music: house · Eb).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Aries typing at furious speed, keycaps flying, "WOW OK" mid-type · 0.15 screen shake
//   1.00 wipe · 1.40 "are you serious rn" ✗ · 3.30 Aries breathes, the screen cools blue · 4.00 THE STARS · loop
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'
// keycaps flying off the keyboard while Aries types angry (frame 0 → 1.0; again on the second rant)
function keycaps(c, t) {
  for (const [t0, t1] of [[-0.6, 1.0], [1.4, 2.6]]) for (let i = 0; i < 9; i++) {
    const b = t0 + i * ((t1 - t0) / 9), a = t - b
    if (a < 0 || a > 0.9) continue
    const h = ((i * 7919) % 1000) / 1000, px = 380 + h * 420 + (h - 0.5) * 500 * a, py = 1300 - 900 * a + 1400 * a * a
    c.save(); c.globalAlpha = 1 - a / 0.9; c.translate(px, py); c.rotate(a * 8 * (h - 0.5)); box(c, -24, -24, 48, 48, '#3b3366', { b: 4 }); c.font = `700 26px ${MONO}`; c.fillStyle = BONE; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('QWERTYUIO'[i], 0, 2); c.restore()
  }
}
const EP = makeUnsent({
  id: 'kute13', duration: 8,
  sign: 'aries', name: 'Aries', to: 'group: the crew', status: '5 members', avatar: '#ff8fb1',
  hook: 'Aries typing *ANGRY.* | Hold on.', ending: 'loop', draftBase: 1,
  msgs: [{ text: 'we already picked the place without you lol', at: -9, stamp: '9:31 pm' }],
  drafts: [
    { text: 'WOW OK', at: -0.4, cps: 14, del: 1.0, wipe: true },
    { text: 'are you serious rn', at: 1.4, cps: 17, del: 2.85, delCps: 34 },
  ],
  breaks: [{ kind: 'shake', at: 0.15, len: 0.6, amp: 30 }],
  moods: [[-9, 'squint', [1, -0.4]], [1.0, 'wide', [0, 0]], [1.4, 'squint', [1, -0.4]], [2.85, 'wide', [0, 0]], [3.3, 'sleepy', [0, 0]], [4.6, 'happy', [1, 0.3]]],
  heroHops: [-0.3, -0.15, 0.0, 0.15, 0.3, 1.5, 1.8, 2.1],
  screen: (c, t, S) => { const k = clamp((t - 3.3) / 0.5) * (1 - clamp((t - 7.1) / 0.3)); if (k > 0) { c.save(); c.globalAlpha = 0.35 * k; c.fillStyle = '#4f8cff'; c.fillRect(S.SCR.x, S.SCR.y, S.SCR.w, S.SCR.h); c.restore() } },
  front: (c, t) => keycaps(c, t),
  sob: t => t > 2.9 ? 3 : 2,
  lines: [{ t: 4.0, text: 'Angry? Wait an *hour,* then type.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
