// og-nt2e81: social rework of nt2e81 (static HOOK outline 0–3.4, no bug/animated title/flashes/end card, crazier slides,
// og kit copy ./t2kit.js with the screen and audience moved into the safe zones). Was: CORPORATE SPEAK FOR DATING, "Capricorn's Quarterly Feelings Review" (18 s vertical, Trends Vol. 2 ep 81,
// music: house · G). Story 0–15.6, then the short shared end card (2.4 s). The format look lives in ./t2kit.js (makeCorp).
//   0.0–2.4    hook: "Corporate speak for *dating*, presented by Capricorn." Capricorn (tiny tie) clicks to the title
//              slide "Q4: US" with a rising bar chart; Taurus (the date) and Pisces sit in the audience.
//   2.4        slide 1 "Let's take this offline." → TRANSLATION: "Can we talk *in person?*"
//   5.4        slide 2 "Per my last text…" → TRANSLATION: "You didn't answer about *Friday.*"
//   8.4        jump cut · slide 3 "I'd like to set up a recurring meeting." → "Every Sunday. Same diner. *You.*"
//   11.6       slide "ANY QUESTIONS?" · Taurus raises a heart sign · Pisces fountains.
//   12.05      THE STARS: "Consistency is the *real* perk."
import { makeCorp } from './t2kit.js'

const EP = makeCorp({
  id: 'og-nt2e81', sign: 'capricorn', date: 'taurus', deep: '#1f8a6a', title: 'Q4: US',
  slides: [
    ['Let’s take this offline.', 'Can we talk in person? *I printed an agenda.*'],
    ['Per my last text…', 'Friday. *I have a backup Friday.*'],
    ['I’d like to set up a recurring meeting.', 'Every Sunday. Same diner. *Forever.*'],
  ],
  last: 'Motion carried. *Unanimously.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Capricorn flirts | *in slide decks.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.4
