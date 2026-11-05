// ktre15: TEXT RESCUE, ""Had fun I guess"" (20 s vertical, Month 2 boost m12, star_advice post, music: funk · E)
// Cancer undersells a great first date. Say the good part out loud. Loop.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre15', len: 20,
ending: 'loop', sender: 'cancer', partner: 'aries',
  hook: 'Great first date. | *Terrible* text.', hookColor: '#ffb347',
  thread: [{ side: 'L', text: 'home safe? :)' }],
  rounds: [{
    draft: 'had fun i guess',
    caught: 'i guess',
    head: 'Say it was *good.*',
    lines: [
      { text: "you're allowed to say it was *good*." },
      { who: 'sender', text: "what if I'm more into it than *they* are?" },
      { text: 'then they get to know a *nice* thing.' },
    ],
    rewrite: 'I had a really good time tonight. can I see you again?',
    replies: ['I was literally typing the same thing', 'yes please'],
  }],
  last: 'Say the good part | *out loud.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
