// og-nt2e98: the social rework of nt2e98, CHOOSE YOUR SIGN, "Choose Your First-Date Planner" (Star Talk Trends Vol. 2). Same set, cast and story; static HOOK (box) from
// frame 0 instead of the animated caption, no series bug, crazier lines. The look lives in ./t2kit.js (og social copy
// of ../../nt2e81/scenes/t2kit.js); the film ends on THE STARS' last line.
import * as K from './t2kit.js'

export const HOOK = 'Who’s planning | the *first date?*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0

const { makeSelect } = K
const EP = makeSelect({
  id: 'og-nt2e98',
  hook: '', roam: ['pisces', 'libra', 'gemini', 'leo'],
  picks: [
    { sign: 'aries', stats: [['SPEED', 5], ['RESERVATIONS', 0]], move: 'picked the place mid-sentence. leaving now.' },
    { sign: 'taurus', stats: [['COMFORT', 5], ['NEW PLACES', 0]], move: 'booked the comfy booth for the whole year' },
    { sign: 'scorpio', stats: [['LISTENING', 5], ['SMALL TALK', 0]], move: 'found a spot quiet enough for secrets' },
  ],
  last: 'A good plan has *room for you*.',
})
export const DURATION = EP.DURATION
export const STORY_END = EP.STORY_END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
