// og-ktre12: social rework of ktre12, TEXT RESCUE, "Who was that in your story" (23 s vertical, star_advice, music: cinematic · Dm).
// Same phone, cast and story. Static HOOK (box) instead of the slammed title, no series bug, no shakes/flashes, layout inside
// the full-frame safe zone, crazier signs. Ends on the last line (hard cut). Built on the og copy of the kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre12', len: 23,
ending: 'cut', sender: 'scorpio', partner: 'libra',
  thread: [{ side: 'L', text: 'had the best day at the lake' }],
  rounds: [{
    draft: 'who was that in your story. zoomed in. 400%.',
    caught: 'who was that',
    head: 'Name the *feeling.*',
    lines: [
      { text: "that's a *case file*, not a feeling." },
      { retry: 'just curious. no reason. who. full name.', caught: 'no reason' },
      { who: 'sender', text: 'ok. I felt a little *left out*.' },
      { text: 'that is the real text. say *that*.' },
    ],
    rewrite: "hey, I felt a little insecure today. can we talk later? nothing's wrong, I just want to be close.",
    replies: ['of course. thank you for telling me', 'call at 8?'],
  }],
  last: 'Name the feeling, | *not the suspect.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Who was that | *in your story?*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = F.HOOK_UNTIL
