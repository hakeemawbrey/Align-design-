// nt2e98: CHOOSE YOUR SIGN, "Choose Your First-Date Planner" (18 s vertical, Star Talk Trends Vol. 2, music: chiptune · C#).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeSelect):
//   0.0 hook: the cursor roaming the grid · 2.2 pick 1 + stat card · 5.4 pick 2 · 8.6 jump cut, pick 3 (the twist) ·
//   11.8 SELECTED! + confetti · 11.9 THE STARS · 12.25 the last line. Pisces's tile cries the whole time.
import * as K from '../../nt2e81/scenes/t2kit.js'

const { makeSelect } = K
const EP = makeSelect({
  id: 'nt2e98',
  hook: 'Choose your *first-date* planner.', roam: ['pisces', 'libra', 'gemini', 'leo'],
  picks: [
    { sign: 'aries', stats: [['SPEED', 5], ['RESERVATIONS', 1]], move: 'picked the place four minutes ago' },
    { sign: 'taurus', stats: [['COMFORT', 5], ['NEW PLACES', 1]], move: 'booked the comfiest booth in town' },
    { sign: 'scorpio', stats: [['LISTENING', 5], ['SMALL TALK', 1]], move: 'found a quiet spot where you can actually talk' },
  ],
  last: 'A good plan has *room for you*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
