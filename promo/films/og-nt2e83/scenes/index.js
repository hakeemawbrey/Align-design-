// og-nt2e83: social rework of nt2e83 (static HOOK outline 0–3.4, no bug/animated title/flashes/end card, crazier slides,
// og kit copy ../../og-nt2e81/scenes/t2kit.js). Was: CORPORATE SPEAK FOR DATING, "Gemini's All-Hands Apology" (18 s vertical, Star Talk Trends Vol. 2, music: house · B).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeCorp):
//   0.0 hook + title slide · 2.4 slide 1 + TRANSLATION · 5.4 slide 2 · 8.4 jump cut, slide 3 (the twist) ·
//   11.6 ANY QUESTIONS? + the date's heart sign · 12.05 THE STARS' last line. Pisces cries in the audience throughout.
import { makeCorp } from '../../og-nt2e81/scenes/t2kit.js'

const EP = makeCorp({
  id: 'og-nt2e83',
  sign: 'gemini', date: 'aquarius', deep: '#a88a10', title: 'Q4: US',
  slides: [
    ['Let’s touch base.', 'Are we on tonight? *Asking all my selves.*'],
    ['Looping in stakeholders.', 'I told my best friend. *And six group chats.*'],
    ['I take full ownership.', 'That was on me. *Both of me.*'],
  ],
  last: 'Apology accepted. *By all of you.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Gemini apologized | *with a slide deck.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.4
