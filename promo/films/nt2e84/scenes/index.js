// nt2e84: CORPORATE SPEAK FOR DATING, "Libra Tables the Motion" (20 s vertical, Star Talk Trends Vol. 2, music: house · C).
// Story 0–15.6, then the shared end card. The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeCorp):
//   0.0 hook + title slide · 2.4 slide 1 + TRANSLATION · 5.4 slide 2 · 8.4 card cut, slide 3 (the twist) ·
//   11.6 ANY QUESTIONS? + the date's heart sign · 12.05 THE STARS' last line. Pisces cries in the audience throughout.
import { makeCorp } from '../../nt2e81/scenes/t2kit.js'

const EP = makeCorp({
  id: 'nt2e84',
  sign: 'libra', date: 'cancer', deep: '#a8329c', title: 'Q4: US',
  slides: [
    ['Let’s table this.', 'I can’t decide *where to eat.*'],
    ['Let’s revisit next quarter.', 'I’m not ready to *label this* yet.'],
    ['Going forward: full transparency.', 'Tell me how you feel. *I’ll go first.*'],
  ],
  last: 'Honest is the *new* polite.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
