// og-nt2e97: the social rework of nt2e97, CHOOSE YOUR SIGN, "Choose Your Road-Trip Co-Pilot" (Star Talk Trends Vol. 2). Same set, cast and story; static HOOK (outline) from
// frame 0 instead of the animated caption, no series bug, crazier lines. The look lives in ./t2kit.js (og social copy
// of ../../nt2e81/scenes/t2kit.js); the film ends on THE STARS' last line.
import * as K from './t2kit.js'

export const HOOK = 'Pick your road-trip | *co-pilot.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0

const { makeSelect } = K
const EP = makeSelect({
  id: 'og-nt2e97',
  hook: '', roam: ['libra', 'aries', 'leo', 'virgo'],
  picks: [
    { sign: 'sagittarius', stats: [['ADVENTURE', 5], ['DIRECTIONS', 0]], move: 'the “shortcut” added a whole extra day' },
    { sign: 'capricorn', stats: [['PREPARED', 5], ['SPONTANEOUS', 0]], move: 'printed the route. laminated it. twice.' },
    { sign: 'cancer', stats: [['SNACKS', 5], ['CARE', 5]], move: 'packed your snacks, labelled by mood' },
  ],
  last: 'The best route has *good company*.',
})
export const DURATION = EP.DURATION
export const STORY_END = EP.STORY_END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
