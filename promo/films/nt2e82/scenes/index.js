// nt2e82: CORPORATE SPEAK FOR DATING, "Virgo Runs the Sync" (18 s vertical, Star Talk Trends Vol. 2, music: house · A).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeCorp):
//   0.0 hook + title slide · 2.4 slide 1 + TRANSLATION · 5.4 slide 2 · 8.4 jump cut, slide 3 (the twist) ·
//   11.6 ANY QUESTIONS? + the date's heart sign · 12.05 THE STARS' last line. Pisces cries in the audience throughout.
import { makeCorp } from '../../nt2e81/scenes/t2kit.js'

const EP = makeCorp({
  id: 'nt2e82',
  sign: 'virgo', date: 'leo', deep: '#c23a72', title: 'Q4: US',
  slides: [
    ['Quick sync?', 'I miss you. *Can I call?*'],
    ['Let’s circle back.', 'I need a minute to *feel things.*'],
    ['I have bandwidth for this.', 'I have room in my life *for you.*'],
  ],
  last: 'Make room, not *excuses*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
