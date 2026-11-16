// og-nt2e90: the social rework of nt2e90, ME EXPLAINING TO MY FRIENDS, "Pisces at the Puppy Party" (Star Talk Trends
// Vol. 2, funk · Bb). Same whiteboard, couch, cast and story; static HOOK (box) from frame 0 instead of the animated
// caption, no series bug, an even soggier Pisces. The look lives in ./t2kit.js (og social copy of the nt2e81 kit).
//   0.0 HOOK over Pisces mid-jab · 2.3 / 5.0 / 7.7 EXHIBITS A–C · ~8.7 the friends cry too · 11.65 THE STARS ·
//   11.95 the last line; the film ends on it (15.6).
import { makeExplain } from './t2kit.js'

export const HOOK = 'I cried at a | *puppy’s* birthday.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.2

const EP = makeExplain({
  id: 'og-nt2e90',
  sign: 'pisces', friends: ['leo', 'libra'], deep: '#5a52c8',
  hook: '',
  board: 'WHY I SOBBED',
  exhibits: [
    { icon: 'hat', label: ['a party hat the', 'size of a grape'], sticker: 'A party hat *the size of a grape.*' },
    { icon: 'note', label: ['everyone sang.', 'to a DOG.'], sticker: 'Everyone sang. *To a dog.*' },
    { icon: 'heart', label: ['“this is', 'my person”'], sticker: 'Then they called me *“my person.”*' },
  ],
  twist: { friendLine: 'okay now WE’RE sobbing', friendX: 700, friendsCry: true, moods: ['sparkle', 'sparkle'] },
  last: 'Happy tears count as *cardio.*',
})
export const DURATION = EP.DURATION
export const STORY_END = EP.STORY_END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
