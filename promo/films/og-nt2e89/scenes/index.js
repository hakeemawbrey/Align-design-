// og-nt2e89: the social rework of nt2e89, ME EXPLAINING TO MY FRIENDS, "Taurus and Our Place" (Star Talk Trends Vol. 2,
// funk · A). Same whiteboard, couch, cast and story; static HOOK (outline) from frame 0 instead of the animated caption,
// no series bug, crazier Taurus. The look lives in ./t2kit.js (the og social copy of ../../nt2e81/scenes/t2kit.js).
//   0.0 HOOK over Taurus mid-jab · 2.3 EXHIBIT A · 5.0 EXHIBIT B · 7.7 EXHIBIT C (the twist) · ~8.7 the friends cave ·
//   11.65 THE STARS · 11.95 the last line; the film ends on it (15.6). Pisces cries on the couch.
import { makeExplain } from './t2kit.js'

export const HOOK = 'Date three: same | spot, same *bread.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.2

const EP = makeExplain({
  id: 'og-nt2e89',
  sign: 'taurus', friends: ['gemini', 'pisces'], deep: '#a8700f',
  hook: '',
  board: 'SAME SPOT. FOREVER.',
  exhibits: [
    { icon: 'bread', label: ['the bread.', 'THE BREAD.'], sticker: 'Exhibit A: I would *marry* this bread.' },
    { icon: 'plate', label: ['they start our', 'order at the door'], sticker: 'They start our order *when we park.*' },
    { icon: 'heart', label: ['our booth has', 'a nickname'], sticker: 'Our booth has *a nickname* now.' },
  ],
  twist: { friendLine: '…okay, that’s illegally cute.', friendX: 690, cheer: true },
  last: 'Same booth, same bread, *new* chapter.',
})
export const DURATION = EP.DURATION
export const STORY_END = EP.STORY_END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
