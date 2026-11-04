// nt2e85: CORPORATE SPEAK FOR DATING, "Scorpio's Deep Dive" (20 s vertical, Star Talk Trends Vol. 2, music: house · D).
// Story 0–15.6, then the shared end card. The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeCorp):
//   0.0 hook + title slide · 2.4 slide 1 + TRANSLATION · 5.4 slide 2 · 8.4 card cut, slide 3 (the twist) ·
//   11.6 ANY QUESTIONS? + the date's heart sign · 12.05 THE STARS' last line. Pisces cries in the audience throughout.
import { makeCorp } from '../../nt2e81/scenes/t2kit.js'

const EP = makeCorp({
  id: 'nt2e85',
  sign: 'scorpio', date: 'sagittarius', deep: '#b02448', title: 'Q4: US', shades: true,
  slides: [
    ['Let’s do a deep dive.', 'Tell me about *your childhood.*'],
    ['That’s low-hanging fruit.', 'You had me at *“I brought snacks.”*'],
    ['I want stakeholder buy-in.', 'I want to meet *your best friend.*'],
  ],
  last: 'All in, *zero* drama.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
