// kute22: THE UNSENT TEXT, "Making a friend as an adult" (7 s vertical trial reel, music: chiptune · A).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Aquarius mid-tumble, "would u ever wanna" mid-delete · 0.30 record scratch
//   1.00 "no worries if not but" ✗ · 2.90 "want to get coffee saturday?" (Pisces happy-cries) · 4.70 THE STARS · loop
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'

const EP = makeUnsent({
  id: 'kute22', duration: 7,
  sign: 'aquarius', name: 'Aquarius', to: 'Juno (from pottery)', status: 'online', avatar: '#f2c75c',
  hook: 'Making a friend | as an *adult.*', ending: 'loop', draftBase: 2,
  msgs: [{ text: 'your mug was SO good today', at: -9, stamp: 'tuesday' }],
  drafts: [
    { text: 'would u ever wanna', at: -1.5, cps: 15, del: -0.25, delCps: 26 },
    { text: 'no worries if not but', at: 1.0, cps: 16, del: 2.55, delCps: 34 },
    { text: 'want to get coffee saturday?', at: 2.9, cps: 18 },
  ],
  breaks: [{ kind: 'scratch', at: 0.3, len: 0.75, caption: 'adult friendship is *hard.*' }],
  tilt: t => t < 0.5 ? -0.18 * (1 - clamp(t / 0.5)) : 0,
  sob: t => t > 4.4 ? 3 : 2, pisMood: t => t > 4.4 ? 'heart' : 'sparkle',
  lines: [{ t: 4.7, text: 'Friends need *asking* too.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
