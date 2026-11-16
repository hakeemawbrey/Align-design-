// og-ktre07: social rework of ktre07, TEXT RESCUE, "Idk, whatever you want!!" (21 s vertical, star_advice, music: dreamy · Ab).
// Same phone, cast and story. Static HOOK (outline) instead of the slammed title, no series bug, no shakes/flashes, layout inside
// the full-frame safe zone, crazier signs. Ends on the last line (hard cut). Built on the og copy of the kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre07', len: 21,
ending: 'cut', sender: 'libra', partner: 'taurus',
  thread: [{ side: 'L', text: 'starving. where do you wanna eat?' }],
  rounds: [{
    draft: 'idk whatever you want! or not! up to you!! or me! or both!',
    caught: 'whatever you want!',
    head: 'Pick *one.*',
    lines: [
      { text: "'whatever' hands them *all* the work." },
      { retry: 'ok here is a spreadsheet of ALL the options', caught: 'ALL the options' },
      { who: 'sender', text: 'but what if they hate my pick? *forever?*' },
      { text: 'pick one, then *leave room* for theirs.' },
    ],
    rewrite: "dumpling place? or pick another, I'm happy either way.",
    replies: ['dumplings. perfect.', 'see you at 7'],
  }],
  last: 'Make one choice. | *Leave room for theirs.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Where to eat? | Libra: *all of it.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = F.HOOK_UNTIL
