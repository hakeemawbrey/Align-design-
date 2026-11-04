// nt2e96: CHOOSE YOUR SIGN, "Choose Your Party Plus-One" (18 s vertical, Star Talk Trends Vol. 2, music: chiptune · A).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeSelect):
//   0.0 hook: the cursor roaming the grid · 2.2 pick 1 + stat card · 5.4 pick 2 · 8.6 jump cut, pick 3 (the twist) ·
//   11.8 SELECTED! + confetti · 11.9 THE STARS · 12.25 the last line. Pisces's tile cries the whole time.
import * as K from '../../nt2e81/scenes/t2kit.js'

const { makeSelect } = K
const EP = makeSelect({
  id: 'nt2e96',
  hook: 'Choose your *holiday party* plus-one.', roam: ['aries', 'cancer', 'gemini', 'taurus'],
  picks: [
    { sign: 'leo', stats: [['CHARISMA', 5], ['INDOOR VOICE', 1]], move: 'knows everyone’s name in five minutes' },
    { sign: 'virgo', stats: [['PLANNING', 5], ['CHILL', 2]], move: 'brought a backup gift, just in case' },
    { sign: 'pisces', stats: [['HUGS', 5], ['DRY EYES', 0]], move: 'cries at the toast (happy tears)', mood: 'sparkle' },
  ],
  last: 'Pick the one who *picks you* back.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
