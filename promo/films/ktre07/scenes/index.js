// ktre07: TEXT RESCUE, ""Idk, whatever you want!!"" (21 s vertical, Month 2 boost m12, star_advice post, music: dreamy · Ab)
// Libra hands every decision back. Pick one, leave room. Loop.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre07', len: 21,
ending: 'loop', sender: 'libra', partner: 'taurus',
  hook: 'Where to eat? | Libra: *everything.*', hookColor: '#f59cc4',
  thread: [{ side: 'L', text: 'starving. where do you wanna eat?' }],
  rounds: [{
    draft: 'idk whatever you want! or not! up to you!!',
    caught: 'whatever you want!',
    head: 'Pick *one.*',
    lines: [
      { text: "'whatever' hands them *all* the work." },
      { retry: 'ok what are ALL the options', caught: 'ALL the options' },
      { who: 'sender', text: 'but what if they hate my pick?' },
      { text: 'pick one, then *leave room* for theirs.' },
    ],
    rewrite: "dumpling place? or pick another, I'm happy either way.",
    replies: ['dumplings. perfect.', 'see you at 7'],
  }],
  last: 'Make one choice. | *Leave room for theirs.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
