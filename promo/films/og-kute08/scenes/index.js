// og-kute08: social rework of kute08, THE UNSENT TEXT, "Scorpio typed "k."" (star_advice). Same phone, cast and story.
// Static HOOK instead of the slammed title, no series bug, no flash / whip / shake / glitch (a calm caption sticker keeps
// the joke), no loop (hard cut on THE STARS' last line), layout inside the full-frame safe zone, Scorpio’s “k.” and “i’ll know.” before the honest line.
// Built on the og copy of the kit (../unsentkit.js).
import { makeUnsent } from '../unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, BLUE, ease, clamp, prog } from '../unsentkit.js'

const EP = makeUnsent({
  id: 'og-kute08', duration: 10,
  sign: 'scorpio', name: 'Scorpio', to: 'Remy', status: 'online', avatar: '#c9a6ff',
  hook: '', ending: 'loop', draftBase: 1,
  msgs: [{ text: 'can’t make it tonight, sorry', at: -9, stamp: 'today 8:02 pm' }],
  drafts: [
    { text: 'k.', at: -0.9, cps: 5, del: -0.12, delCps: 6 },
    { text: 'do whatever you want. i’ll know.', at: 1.3, cps: 20, del: 3.0, delCps: 32 },
    { text: 'that hurt my feelings. can we talk?', at: 3.4, cps: 16 },
  ],
  breaks: [{ kind: 'note', at: 0.3, len: 1.2, caption: 'that “k.” was *a speech.*' }],
  moods: [[-9, 'squint', [1, -0.4]], [1.3, 'squint', [1, -0.3]], [3.0, 'wide', [0, 0]], [3.4, 'neutral', [1, -0.3]], [6.7, 'happy', [1, 0.3]]],
  lines: [{ t: 6.1, text: 'Say *hurt.* Not “k.”' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const HOOK = 'Scorpio typed *“k.”* | Then deleted it.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.2
