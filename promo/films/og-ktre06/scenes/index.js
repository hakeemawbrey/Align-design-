// og-ktre06: social rework of ktre06, TEXT RESCUE, "Per my last message, my crush" (22 s vertical, star_advice, music: chiptune · G).
// Same phone, cast and story. Static HOOK (box) instead of the slammed title, no series bug, no shakes/flashes, layout inside
// the full-frame safe zone, crazier signs. Ends on the last line (hard cut). Built on the og copy of the kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre06', len: 22,
ending: 'cut', sender: 'capricorn', partner: 'cancer',
  thread: [{ side: 'L', text: 'cannot wait for dinner tomorrow!' }],
  rounds: [{
    draft: 'Per my last message, are we still on for 7? Agenda attached. Kind regards.',
    caught: 'Agenda attached',
    head: "Let them hear you're *excited.*",
    lines: [
      { text: 'this is a *crush*, not a quarterly review.' },
      { retry: 'Confirming attendance. cc: my calendar.', caught: 'cc: my calendar' },
      { who: 'sender', text: 'but I *am* excited. it is on the agenda. item one.' },
      { text: 'then let them *hear* it.' },
    ],
    rewrite: "still on for 7? I've been looking forward to it all day.",
    replies: ['same!!', 'counting down'],
  }],
  endMood: 'happy',
  last: 'Your crush is not | *a meeting invite.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Capricorn flirts | *via memo.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = F.HOOK_UNTIL
