// ktre11: TEXT RESCUE, ""Sorry, just saw this" (3 days later)" (21 s vertical, Month 2 boost m12, star_advice post, music: screwed · Fm)
// Aquarius replies three days late with a fib. Late and honest beats fast and fake. Loop.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre11', len: 21,
ending: 'loop', sender: 'aquarius', partner: 'leo',
  hook: 'Three days late. | *Just saw it.*', hookColor: '#7fd0f0',
  thread: [{ side: 'L', text: 'back from my trip!! so much to tell you' }],
  receipt: 'Delivered 3 days ago',
  rounds: [{
    draft: 'omg sorry just saw this!!',
    caught: 'just saw this',
    head: 'Honest *beats* fast.',
    lines: [
      { text: 'they know you saw it. it said *read*.' },
      { who: 'sender', text: 'I went quiet. I needed a *minute*.' },
      { text: 'then say that. it is a *real* reason.' },
    ],
    rewrite: 'sorry for the slow reply, I went quiet for a bit. still want to hear about your trip!',
    replies: ['totally get it', 'ok the trip was WILD'],
  }],
  last: 'Late and honest | beats *fast and fake.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
