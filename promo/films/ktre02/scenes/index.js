// ktre02: TEXT RESCUE, ""It's fine." (it is not fine)" (20 s vertical, Month 2 boost m12, star_advice post, music: lofi · F)
// Cancer, shell clamped, drafting "it's fine. do whatever you want." after a cancel. Loop back to frame 0.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre02', len: 20,
ending: 'loop', sender: 'cancer', partner: 'scorpio',
  hook: "*It's fine.* | (It's not fine.)",
  thread: [{ side: 'R', text: 'cannot wait for tonight!!' }, { side: 'L', text: 'so sorry, have to cancel tonight' }],
  rounds: [{
    draft: "it's fine. do whatever you want.",
    caught: "it's fine.",
    head: 'Say the *real* feeling.',
    lines: [
      { text: "'fine' makes them *guess* the feeling." },
      { retry: 'no worries!! (crying)', caught: '(crying)' },
      { who: 'sender', text: "but I don't want to seem *needy*." },
      { text: 'having feelings is not *needy*.' },
    ],
    rewrite: 'honestly I was looking forward to it. can we pick a new night?',
    replies: ['me too. thursday?', "I'll bring the snacks"],
  }],
  last: "'Fine' is never | the *whole* text.",
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
