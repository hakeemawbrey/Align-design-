// kute02: THE UNSENT TEXT, "Asking them to dinner, attempt nine" (8 s vertical trial reel, music: lofi · F).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Taurus mid-gasp, the phone mid-tumble (tilted), "do u wanna maybe" mid-delete, mid whip zoom
//   0.80 "u like food?" ✗ · 2.50 "want to get dinner friday?" → SENT 4.70 (Pisces happy-cries) · 5.20 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, ease, clamp, prog } from '../../kute01/unsentkit.js'

const EP = makeUnsent({
  id: 'kute02', duration: 8,
  sign: 'taurus', name: 'Taurus', to: 'Sam', status: 'online', avatar: '#9fe6b0',
  hook: 'Asking them out. | *Attempt* nine.', ending: 'cut', draftBase: 7,
  msgs: [{ text: 'that was so fun today!', at: -9, stamp: 'today 6:12 pm' }],
  drafts: [
    { text: 'do u wanna maybe', at: -1.4, cps: 15, del: -0.3, delCps: 24 },
    { text: 'u like food?', at: 0.8, cps: 13, del: 2.1, delCps: 30 },
    { text: 'want to get dinner friday?', at: 2.5, cps: 15, send: 4.7 },
  ],
  breaks: [{ kind: 'whip', at: 0.3, from: 1.6 }],
  tilt: t => t < 0.55 ? 0.26 * (1 - ease.outCubic(clamp(t / 0.55))) * Math.cos(t * 9) : 0,
  sob: t => t > 4.75 ? 3 : 2, pisMood: t => t > 4.75 ? 'heart' : 'sparkle',
  heroHops: [-0.2, 0.15],
  lines: [{ t: 5.2, text: 'The *simple* version is the brave one.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
