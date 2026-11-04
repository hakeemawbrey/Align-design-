// nt2e83: CORPORATE SPEAK FOR DATING, "Gemini's All-Hands Apology" (20 s vertical, Star Talk Trends Vol. 2, music: house · B).
// Story 0–15.6, then the shared end card. The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeCorp):
//   0.0 hook + title slide · 2.4 slide 1 + TRANSLATION · 5.4 slide 2 · 8.4 card cut, slide 3 (the twist) ·
//   11.6 ANY QUESTIONS? + the date's heart sign · 12.05 THE STARS' last line. Pisces cries in the audience throughout.
import { makeCorp } from '../../nt2e81/scenes/t2kit.js'

const EP = makeCorp({
  id: 'nt2e83',
  sign: 'gemini', date: 'aquarius', deep: '#a88a10', title: 'Q4: US',
  slides: [
    ['Let’s touch base.', 'Are we still on *for tonight?*'],
    ['Looping in stakeholders.', 'I told my best friend *about you.*'],
    ['I take full ownership.', 'That was on me. *I’m sorry.*'],
  ],
  last: 'Owning it is *hot*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
