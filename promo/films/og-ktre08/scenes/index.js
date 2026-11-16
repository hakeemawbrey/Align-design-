// og-ktre08: social rework of ktre08, TEXT RESCUE, "The fake excuse spiral" (23 s vertical, star_advice, music: synthwave · Bm).
// Same phone, cast and story. Static HOOK (box) instead of the slammed title, no series bug, no shakes/flashes, layout inside
// the full-frame safe zone, crazier signs. Ends on the last line (hard cut). Built on the og copy of the kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre08', len: 23,
ending: 'cut', sender: 'taurus', partner: 'virgo',
  thread: [{ side: 'L', text: 'still on for tonight? 8pm?' }],
  rounds: [{
    draft: 'so my cat is sick and my car broke and also my',
    caught: 'my cat is sick',
    head: 'You don\'t need a *plot.*',
    lines: [
      { text: "you don't have a *cat*." },
      { retry: 'and a pigeon stole my keys and my couch needs me', caught: 'a pigeon stole my keys' },
      { who: 'sender', text: "I'm just *so* tired. my couch and I are one now." },
      { text: 'yes. tired is a *whole* reason.' },
    ],
    rewrite: "I'm wiped tonight. can we move to sunday? I really want to see you.",
    replies: ['rest!!', 'sunday it is'],
  }],
  last: 'Tired is | a *full* reason.',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Taurus cancelled | with a *fake cat.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = F.HOOK_UNTIL
