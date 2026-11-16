// og-nt2e99: the social rework of nt2e99, CHOOSE YOUR SIGN, "Choose Your Bad-Day Person" (Star Talk Trends Vol. 2). Same set, cast and story; static HOOK (outline) from
// frame 0 instead of the animated caption, no series bug, crazier lines. The look lives in ./t2kit.js (og social copy
// of ../../nt2e81/scenes/t2kit.js, as in og-nt2e98); the film ends on THE STARS' last line.
import * as K from './t2kit.js'

export const HOOK = 'Your worst day. | Who *shows up?*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0

const { makeSelect } = K
const EP = makeSelect({
  id: 'og-nt2e99',
  hook: '', roam: ['virgo', 'sagittarius', 'cancer', 'gemini'], p2: true,
  picks: [
    { sign: 'aquarius', stats: [['FUN FACTS', 5], ['HUGS', 0]], move: 'sends one octopus fun fact. it helps.' },
    { sign: 'libra', stats: [['DESSERTS', 5], ['DECISIONS', 0]], move: 'brings two desserts. and a spare one.' },
    { sign: 'you', name: 'YOU', stats: [['SHOWING UP', 5], ['KEEPING SCORE', 0]], move: 'being someone’s bad-day person too' },
  ],
  youTile: 'PLAYER 2', selected: '2 PLAYERS *READY!*',
  last: 'Comfort is a *two-player* game.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const STORY_END = EP.STORY_END
