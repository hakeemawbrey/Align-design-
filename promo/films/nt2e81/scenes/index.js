// nt2e81: CORPORATE SPEAK FOR DATING, "Capricorn's Quarterly Feelings Review" (20 s vertical, Trends Vol. 2 ep 81,
// music: house · G). Story 0–15.6, then the shared end card. The format look lives in ./t2kit.js (makeCorp).
//   0.0–2.4    hook: "Corporate speak for *dating*, presented by Capricorn." Capricorn (tiny tie) clicks to the title
//              slide "Q4: US" with a rising bar chart; Taurus (the date) and Pisces sit in the audience.
//   2.4        slide 1 "Let's take this offline." → TRANSLATION: "Can we talk *in person?*"
//   5.4        slide 2 "Per my last text…" → TRANSLATION: "You didn't answer about *Friday.*"
//   8.4        card cut · slide 3 "I'd like to set up a recurring meeting." → "Every Sunday. Same diner. *You.*"
//   11.6       slide "ANY QUESTIONS?" · Taurus raises a heart sign · Pisces fountains.
//   12.05      THE STARS: "Consistency is the *real* perk."
import { makeCorp } from './t2kit.js'

const EP = makeCorp({
  id: 'nt2e81', sign: 'capricorn', date: 'taurus', deep: '#1f8a6a', title: 'Q4: US',
  slides: [
    ['Let’s take this offline.', 'Can we talk *in person?*'],
    ['Per my last text…', 'You didn’t answer about *Friday.*'],
    ['I’d like to set up a recurring meeting.', 'Every Sunday. Same diner. *You.*'],
  ],
  last: 'Consistency is the *real* perk.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
