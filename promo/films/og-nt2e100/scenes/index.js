// og-nt2e100: social rework of nt2e100. Static HOOK (outline) 0–2.9 replaces the animated title; no bug, flashes,
// shakes, fade or end card; the grid sits below the hook; Gemini and Capricorn pushed further.
// nt2e100: CHOOSE YOUR SIGN, "Choose Your Cuffing-Season Character" (18 s vertical, Star Talk Trends Vol. 2, music: chiptune · F#).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeSelect):
//   0.0 hook: the cursor roaming the grid · 2.2 pick 1 + stat card · 5.4 pick 2 · 8.6 jump cut, pick 3 (the twist) ·
//   11.8 SELECTED! + confetti · 11.9 THE STARS · 12.25 the last line. Pisces's tile cries the whole time.
import * as K from './t2kit.js'

const { makeSelect } = K
const EP = makeSelect({
  id: 'og-nt2e100',
  hook: 'Choose your *cuffing-season* character.', roam: ['aries', 'leo', 'sagittarius', 'pisces', 'gemini'],
  picks: [
    { sign: 'gemini', stats: [['ENERGY', 5], ['SCHEDULE', 0]], move: 'two plans in one night, plus a backup plan' },
    { sign: 'capricorn', stats: [['GOALS', 5], ['SLOW DOWN', 0]], move: 'a five-year plan by date two, laminated' },
    { sign: 'you', name: 'YOU', stats: [['SELF-RESPECT', 5], ['SETTLING', 0]], move: 'knowing what you want before winter does' },
  ],
  youTile: 'YOU', selected: 'SELECTED: *YOU*',
  last: 'Start as your *own* player one.',
})
export const HOOK = 'Cuffing season: | *pick a fighter.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.9
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
