// og-nt2e85: social rework of nt2e85 (static HOOK outline 0–3.4, no bug/animated title/flashes/end card, crazier slides,
// og kit copy ../../og-nt2e81/scenes/t2kit.js). Was: CORPORATE SPEAK FOR DATING, "Scorpio's Deep Dive" (18 s vertical, Star Talk Trends Vol. 2, music: house · D).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeCorp):
//   0.0 hook + title slide · 2.4 slide 1 + TRANSLATION · 5.4 slide 2 · 8.4 jump cut, slide 3 (the twist) ·
//   11.6 ANY QUESTIONS? + the date's heart sign · 12.05 THE STARS' last line. Pisces cries in the audience throughout.
import { makeCorp } from '../../og-nt2e81/scenes/t2kit.js'

const EP = makeCorp({
  id: 'og-nt2e85',
  sign: 'scorpio', date: 'sagittarius', deep: '#b02448', title: 'Q4: US', shades: true,
  slides: [
    ['Let’s do a deep dive.', 'Tell me about your childhood. *All of it.*'],
    ['That’s low-hanging fruit.', 'You brought snacks. *I’m obsessed.*'],
    ['I want stakeholder buy-in.', 'I want to meet your best friend. *Tonight.*'],
  ],
  last: 'All in. *No exit strategy.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Scorpio’s first date | *is a deep dive.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.4
