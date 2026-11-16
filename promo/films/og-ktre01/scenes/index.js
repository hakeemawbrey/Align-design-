// og-ktre01: social rework of ktre01, TEXT RESCUE, "Left on read for two days" (22 s vertical, star_advice, music: pop · D).
// Same phone, cast and story (Aries, left on read, slams SEND on "hello???"). Static HOOK (outline) instead of the slammed
// title, no series bug, no whip zoom / shakes / flashes, layout inside the full-frame safe zone, crazier Aries. Hard cut.
// Built on the og copy of the Text Rescue kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({
  id: 'og-ktre01', len: 22, ending: 'cut', sender: 'aries', partner: 'libra',
  hook: 'Left on read. | *Two days.*',
  thread: [{ side: 'R', text: 'ok that taco place was elite' }, { side: 'L', text: 'that was so fun!!' }, { side: 'R', text: 'see you friday?' }],
  receipt: 'Read 2 days ago',
  rounds: [{
    draft: 'hello??? HELLO??? did I do something or',
    caught: 'hello???',
    head: 'Ask *once.*',
    lines: [
      { who: 'sender', text: "they *read* it. I've drafted *forty* replies!!" },
      { text: 'three question marks is a *siren*.' },
      { retry: 'wow ok. noted. deleting my phone.', caught: 'noted.' },
      { text: "the quiet version is *still* a siren." },
      { text: "ask once, kindly. then *let it breathe*." },
    ],
    rewrite: 'hey! still up for friday? totally fine if plans changed.',
    replies: ['omg yes, sorry, crazy week!!', 'friday 7?'],
  }],
  last: 'Ask once. | *Then let it breathe.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Left on read. | *Aries is spiraling.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = F.HOOK_UNTIL
