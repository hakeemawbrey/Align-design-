// og-nt2e96: the social rework of nt2e96, CHOOSE YOUR SIGN, "Choose Your Party Plus-One" (Star Talk Trends Vol. 2). Same set, cast and story; static HOOK (box) from
// frame 0 instead of the animated caption, no series bug, crazier lines. The look lives in ./t2kit.js (og social copy
// of ../../nt2e81/scenes/t2kit.js); the film ends on THE STARS' last line.
import * as K from './t2kit.js'

export const HOOK = 'Pick your holiday | party *plus-one.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0

const { makeSelect } = K
const EP = makeSelect({
  id: 'og-nt2e96',
  hook: '', roam: ['aries', 'cancer', 'gemini', 'taurus'],
  picks: [
    { sign: 'leo', stats: [['CHARISMA', 5], ['INDOOR VOICE', 0]], move: 'gave a toast at someone else’s party' },
    { sign: 'virgo', stats: [['PLANNING', 5], ['CHILL', 1]], move: 'brought three backup gifts, labelled' },
    { sign: 'pisces', stats: [['HUGS', 5], ['DRY EYES', 0]], move: 'sobbed at the toast. and the snacks.', mood: 'sparkle' },
  ],
  last: 'Pick the one who *picks you* back.',
})
export const DURATION = EP.DURATION
export const STORY_END = EP.STORY_END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
