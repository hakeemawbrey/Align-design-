// og-ktre09: social rework of ktre09, TEXT RESCUE, "Not feeling it, lol bye" (22 s vertical, star_advice, music: cinematic · Eb).
// Same phone, cast and story. Static HOOK (outline) instead of the slammed title, no series bug, no shakes/flashes, layout inside
// the full-frame safe zone, crazier signs. Ends on the last line (hard cut). Built on the og copy of the kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre09', len: 22,
ending: 'cut', sender: 'sagittarius', partner: 'aquarius',
  thread: [{ side: 'L', text: 'had fun last night! want to go again?' }],
  rounds: [{
    draft: 'not feeling it lol bye',
    caught: 'lol bye',
    head: 'Kind *and* clear.',
    lines: [
      { text: "honest, yes. but they're a *person*, not a layover." },
      { retry: '...', caught: '...' },
      { text: 'and silence is not an *answer* either.' },
      { who: 'sender', text: 'ok. honest *and* kind. both. at full speed.' },
    ],
    rewrite: "I had a nice time, but I don't feel a spark. wishing you the best.",
    replies: ['thanks for being honest', 'you too!'],
  }],
  last: 'Clear is kind. | *Kind is clear.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Sag ended it in | *five words.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = F.HOOK_UNTIL
