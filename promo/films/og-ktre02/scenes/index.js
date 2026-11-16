// og-ktre02: social rework of ktre02, TEXT RESCUE, ""It's fine." (it is not fine)" (20 s vertical, star_advice, music: lofi · F).
// Same phone, cast and story (Cancer, shell clamped, drafting "it's fine" after a cancel). Static HOOK (box) instead of
// the slammed title, no series bug, no whip zoom / shakes / flashes, layout inside the full-frame safe zone, crazier
// Cancer, and it ends on the last line (no loop back to frame 0). Built on the og copy of the Text Rescue kit.
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre02', len: 20,
ending: 'cut', sender: 'cancer', partner: 'scorpio',
  hook: "*It's fine.* | (It's not fine.)",
  thread: [{ side: 'R', text: 'cannot wait for tonight!! outfit picked' }, { side: 'L', text: 'so sorry, have to cancel tonight' }],
  rounds: [{
    draft: "it's fine. do whatever you want.",
    caught: "it's fine.",
    head: 'Say the *real* feeling.',
    lines: [
      { text: "'fine' makes them *guess* the feeling." },
      { retry: 'no worries!! (sobbing in my shell)', caught: '(sobbing in my shell)' },
      { who: 'sender', text: "but I don't want to seem *needy*." },
      { text: 'having feelings is not *needy*.' },
    ],
    rewrite: 'honestly I was looking forward to it. can we pick a new night?',
    replies: ['me too. thursday?', "I'll bring the snacks"],
  }],
  last: "'Fine' is never | the *whole* text.",
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = '“It’s fine.” | *(It is NOT fine.)*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = F.HOOK_UNTIL
