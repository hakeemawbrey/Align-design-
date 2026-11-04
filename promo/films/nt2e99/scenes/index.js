// nt2e99: CHOOSE YOUR SIGN, "Choose Your Bad-Day Person" (18 s vertical, Star Talk Trends Vol. 2, music: chiptune · E).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeSelect):
//   0.0 hook: the cursor roaming the grid · 2.2 pick 1 + stat card · 5.4 pick 2 · 8.6 jump cut, pick 3 (the twist) ·
//   11.8 SELECTED! + confetti · 11.9 THE STARS · 12.25 the last line. Pisces's tile cries the whole time.
import * as K from '../../nt2e81/scenes/t2kit.js'

const { makeSelect } = K
const EP = makeSelect({
  id: 'nt2e99',
  hook: 'Choose your *bad-day* person.', roam: ['virgo', 'sagittarius', 'cancer', 'gemini'], p2: true,
  picks: [
    { sign: 'aquarius', stats: [['FUN FACTS', 5], ['HUGS', 2]], move: 'sends exactly one fun fact. it helps.' },
    { sign: 'libra', stats: [['DESSERTS', 5], ['DECISIONS', 1]], move: 'brings two desserts so you can choose' },
    { sign: 'you', name: 'YOU', stats: [['SHOWING UP', 5], ['KEEPING SCORE', 0]], move: 'being someone’s bad-day person too' },
  ],
  youTile: 'PLAYER 2', selected: '2 PLAYERS *READY!*',
  last: 'Comfort is a *two-player* game.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
