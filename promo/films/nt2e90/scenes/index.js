// nt2e90: ME EXPLAINING TO MY FRIENDS, "Pisces at the Puppy Party" (18 s vertical, Star Talk Trends Vol. 2, music: funk · Bb).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeExplain):
//   0.0 hook: the hero mid-jab at the whiteboard · 2.3 EXHIBIT A · 5.0 EXHIBIT B · 7.7 jump cut, EXHIBIT C (the twist) ·
//   ~8.7 the friends react · 11.65 THE STARS pop in · 11.95 the last line. Pisces cries on the couch (or at the board).
import { makeExplain } from '../../nt2e81/scenes/t2kit.js'

const EP = makeExplain({
  id: 'nt2e90',
  sign: 'pisces', friends: ['leo', 'libra'], deep: '#5a52c8',
  hook: 'Me explaining to my friends why I cried at a *puppy’s birthday.*',
  board: 'THE PUPPY PARTY',
  exhibits: [
    { icon: 'hat', label: ['tiny party hat'], sticker: 'A *tiny* party hat.' },
    { icon: 'note', label: ['everyone sang'], sticker: 'Everyone *sang.*' },
    { icon: 'heart', label: ['“this is', 'my person”'], sticker: 'They introduced me as *“my person.”*' },
  ],
  twist: { friendLine: 'okay now WE’RE crying', friendX: 700, friendsCry: true, moods: ['sparkle', 'sparkle'] },
  last: 'Happy tears are *data*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
