// og-ngne06: social rework of ngne06 "Aries vs Leo: The Main Event" (static HOOK outline 0–2.95; no show bug, no
// GAME NIGHT sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the
// ngne01 kit). Story 0–30.6.
//   0.0    HOOK "Two fire signs. | *One* spotlight."  Leo bows under its own spotlight, Aries hammering the buzzer.
//   R1 Leo (rents a parade for your new job) · R2 Aries ("never been wrong"… then admits it, mid-argument) · R3 both.
//   Final 2–2. Last line (THE STARS): "The spotlight fits *two.*"
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../gamekit.js'

export const HOOK = 'Two fire signs. | *One* spotlight.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95

const POD = { A: 250, B: 830 }
const EP = makeGame({
  id: 'og-ngne06',
  A: { sign: 'aries', intro: { mood: 'wide', look: [0.4, 0.5], buzz: true } },
  B: { sign: 'leo', intro: { mood: 'sparkle', look: [0, 0], squash: 0.1 } },
  accent: '#f39a3a',
  welcome: 'two egos. one *stage.*',
  rounds: [
    {
      prompt: 'congrats on the new job! ___',
      first: 'A',
      a: { text: 'cool. I got TWO jobs while you said that.', lose: 'squint' },
      b: { text: "I rented a parade. you're on the float." },
      point: 'B',
      host: 'a parade for *them.* point, Leo!',
    },
    {
      prompt: 'They admit they were wrong, mid-argument.',
      first: 'A',
      a: { text: "RED. I've never been wrong. ever.", flag: 'R', then: { at: 3.0, text: '…wait. GREEN. I was wrong. once.', flag: 'G', mood: 'sparkle' } },
      b: { text: "GREEN. I'd frame it. in gold.", flag: 'G', lose: 'happy' },
      point: 'A',
      host: 'Aries *changed its mind!* point!',
    },
    {
      prompt: 'Your date gets more compliments at the party.',
      first: 'B',
      a: { text: "proud. I'll out-compliment the whole room." },
      b: { text: 'I start a standing ovation. for them.' },
      point: 'both',
      host: 'both *proud.* both score!',
    },
  ],
  last: 'The spotlight fits *two.*',
  talk: 'card-talk-6.png',
  draw(x, t) {
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
