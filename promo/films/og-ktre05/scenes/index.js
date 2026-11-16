// og-ktre05: social rework of ktre05, TEXT RESCUE, "So like… what are we lol" (22 s vertical, star_advice, music: house · C).
// Same phone, cast and story. Static HOOK (outline) instead of the slammed title, no series bug, no shakes/flashes, layout inside
// the full-frame safe zone, crazier signs. Ends on the last line (hard cut). Built on the og copy of the kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre05', len: 22,
ending: 'cut', sender: 'gemini', partner: 'pisces',
  thread: [{ side: 'L', text: 'last night was really nice' }, { side: 'R', text: 'it really was' }],
  rounds: [{
    draft: 'so like what are we lol jk unless',
    caught: 'lol jk unless',
    head: 'Ask it *straight.*',
    lines: [
      { text: "the 'lol' is a *helmet*." },
      { retry: 'anyway what are u eating. asking for my twin', caught: 'asking for my twin' },
      { who: 'sender', text: 'both of me are *terrified*. what if they say nothing?' },
      { text: 'then you get your answer. that *helps* too.' },
    ],
    rewrite: 'I really like what we have. are we seeing other people?',
    replies: ['honestly? I was hoping you would ask', 'just you'],
  }],
  last: 'Delete the *lol.* | Keep the question.',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'What are we? | *lol jk unless*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = F.HOOK_UNTIL
