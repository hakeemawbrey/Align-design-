// ktre03: TEXT RESCUE, "Sometime, maybe, lol" (22 s vertical, Month 2 boost m12, star_advice post, music: funk · A)
// Leo asks someone out so vaguely it is not a question. Hard cut.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre03', len: 22,
ending: 'cut', sender: 'leo', partner: 'sagittarius',
  hook: 'Leo asked them out. | *Kind of.*', hookColor: '#ffb347',
  thread: [{ side: 'L', text: 'haha you are actually so funny' }, { side: 'R', text: 'I know' }],
  rounds: [{
    draft: 'we should hang sometime maybe? lol unless',
    caught: 'maybe? lol unless',
    head: 'Name the *day.*',
    lines: [
      { text: "they can't say yes to *sometime*." },
      { retry: 'or whatever', caught: 'or whatever' },
      { who: 'sender', text: "if it's vague I can't get *rejected*." },
      { text: 'you also cannot get a *yes*. name the plan.' },
    ],
    rewrite: "I'd love to take you to the night market saturday. you in?",
    replies: ['YES', 'what time??'],
  }],
  last: 'Say the day. | *Say the plan.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
