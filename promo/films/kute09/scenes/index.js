// kute09: THE UNSENT TEXT, "Cancelling plans, again" (8 s vertical trial reel, music: synthwave · Bm).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Sagittarius mid-leap, "so about tonight..." mid-delete · 0.40 record scratch
//   1.30 "something came up!!" ✗ · 3.00 "sorry i keep cancelling. sunday, my treat?" → SENT 5.30 · 5.60 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, BLUE, ease, clamp, prog } from '../../kute01/unsentkit.js'

const EP = makeUnsent({
  id: 'kute09', duration: 8,
  sign: 'sagittarius', name: 'Sagittarius', to: 'Dani', status: 'online', avatar: '#f2c75c',
  hook: 'Cancelling plans. | *Again.* Typing…', ending: 'cut', draftBase: 2,
  msgs: [{ text: 'still on for tonight?', at: -9, stamp: '6:40 pm' }],
  drafts: [
    { text: 'so about tonight...', at: -1.5, cps: 15, del: -0.25, delCps: 26 },
    { text: 'something came up!!', at: 1.3, cps: 15, del: 2.7, delCps: 34 },
    { text: 'sorry i keep cancelling. sunday, my treat?', at: 3.0, cps: 20, send: 5.3 },
  ],
  breaks: [{ kind: 'scratch', at: 0.4, len: 0.8, caption: 'third time *this month.*' }],
  heroHops: [-0.3, -0.05],
  sob: t => t > 5.35 ? 3 : 2,
  lines: [{ t: 5.6, text: 'Own it, then *offer* a real plan.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
