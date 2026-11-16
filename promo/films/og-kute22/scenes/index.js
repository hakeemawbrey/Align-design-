// og-kute22: the social rework of kute22, "Making a friend as an adult" (7 s vertical, chiptune · A).
// Same phone, Aquarius, pottery friend and story; kit copy ../unsentkit.js (no series bug, no slam title, no scratch flash).
// Static HOOK (outline, until 3.0): "Adult friendship, | *Aquarius style.*"; Aquarius pushed to full alien.
//   0.00 frame 0: Aquarius mid-tumble, "would u ever wanna co-found a commune" mid-delete
//   1.00 "no worries if not, i'm an alien" ✗ · 2.90 "want to get coffee saturday?" (Pisces happy-cries) · 4.70 THE STARS · hard cut
import { makeUnsent } from '../unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../unsentkit.js'

const EP = makeUnsent({
  id: 'og-kute22', duration: 7,
  sign: 'aquarius', name: 'Aquarius', to: 'Juno (from pottery)', status: 'online', avatar: '#f2c75c',
  hook: '', hero: { x: 205 }, ending: 'cut', draftBase: 2,
  msgs: [{ text: 'your mug was SO good today', at: -9, stamp: 'tuesday' }],
  drafts: [
    { text: 'would u ever wanna co-found a commune', at: -2.4, cps: 20, del: -0.25, delCps: 44 },
    { text: 'no worries if not, i’m an alien', at: 1.0, cps: 24, del: 2.55, delCps: 44 },
    { text: 'want to get coffee saturday?', at: 2.9, cps: 18 },
  ],
  tilt: t => t < 0.5 ? -0.18 * (1 - clamp(t / 0.5)) : 0,
  sob: t => t > 4.4 ? 3 : 2, pisMood: t => t > 4.4 ? 'heart' : 'sparkle',
  lines: [{ t: 4.7, text: 'Friends need *asking* too.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Adult friendship, | *Aquarius style.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
