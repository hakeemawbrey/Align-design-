// og-ktre11: social rework of ktre11, TEXT RESCUE, "Sorry, just saw this" (3 days later) (21 s vertical, star_advice, music: screwed · Fm).
// Same phone, cast and story. Static HOOK (outline) instead of the slammed title, no series bug, no shakes/flashes, layout inside
// the full-frame safe zone, crazier signs. Ends on the last line (hard cut). Built on the og copy of the kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre11', len: 21,
ending: 'cut', sender: 'aquarius', partner: 'leo',
  thread: [{ side: 'L', text: 'back from my trip!! so much to tell you' }],
  receipt: 'Read 3 days ago',
  rounds: [{
    draft: 'omg sorry just saw this!! my phone was in another dimension',
    caught: 'just saw this',
    head: 'Honest *beats* fast.',
    lines: [
      { text: 'they know you saw it. it said *read*.' },
      { who: 'sender', text: 'I went quiet. I was in my *orbit* for a minute.' },
      { text: 'then say that. it is a *real* reason.' },
    ],
    rewrite: 'sorry for the slow reply, I went quiet for a bit. still want to hear about your trip!',
    replies: ['totally get it', 'ok the trip was WILD'],
  }],
  last: 'Late and honest | beats *fast and fake.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = '3 days later: | *“just saw this!!”*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = F.HOOK_UNTIL
