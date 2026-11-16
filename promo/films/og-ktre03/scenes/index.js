// og-ktre03: social rework of ktre03, TEXT RESCUE, "Sometime, maybe, lol" (22 s vertical, star_advice, music: funk · A).
// Same phone, cast and story (Leo asks someone out so vaguely it is not a question). Static HOOK (outline) instead of the
// slammed title, no series bug, no shakes/flashes, layout inside the full-frame safe zone, crazier Leo. Hard cut.
// Built on the og copy of the Text Rescue kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre03', len: 22,
ending: 'cut', sender: 'leo', partner: 'sagittarius',
  thread: [{ side: 'L', text: 'haha you are actually so funny' }, { side: 'R', text: 'I know. I rehearse.' }],
  rounds: [{
    draft: 'we should hang sometime maybe? lol unless',
    caught: 'maybe? lol unless',
    head: 'Name the *day.*',
    lines: [
      { text: "they can't say yes to *sometime*." },
      { retry: 'or whatever. no pressure. lol', caught: 'or whatever' },
      { who: 'sender', text: "if it's vague my *mane* can't get rejected." },
      { text: 'it also cannot get a *yes*. name the plan.' },
    ],
    rewrite: "I'd love to take you to the night market saturday. you in?",
    replies: ['YES', 'what time??'],
  }],
  last: 'Say the day. | *Say the plan.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Leo asked them out. | *Kind of.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = F.HOOK_UNTIL
