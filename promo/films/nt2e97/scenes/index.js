// nt2e97: CHOOSE YOUR SIGN, "Choose Your Road-Trip Co-Pilot" (18 s vertical, Star Talk Trends Vol. 2, music: chiptune · B).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeSelect):
//   0.0 hook: the cursor roaming the grid · 2.2 pick 1 + stat card · 5.4 pick 2 · 8.6 jump cut, pick 3 (the twist) ·
//   11.8 SELECTED! + confetti · 11.9 THE STARS · 12.25 the last line. Pisces's tile cries the whole time.
import * as K from '../../nt2e81/scenes/t2kit.js'

const { makeSelect } = K
const EP = makeSelect({
  id: 'nt2e97',
  hook: 'Choose your *road-trip* co-pilot.', roam: ['libra', 'aries', 'leo', 'virgo'],
  picks: [
    { sign: 'sagittarius', stats: [['ADVENTURE', 5], ['DIRECTIONS', 1]], move: 'the “shortcut” (it is not a shortcut)' },
    { sign: 'capricorn', stats: [['PREPARED', 5], ['SPONTANEOUS', 1]], move: 'printed the route. twice.' },
    { sign: 'cancer', stats: [['SNACKS', 5], ['CARE', 5]], move: 'packed your favourite snacks, labelled' },
  ],
  last: 'The best route has *good company*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
