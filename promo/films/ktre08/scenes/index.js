// ktre08: TEXT RESCUE, "The fake excuse spiral" (23 s vertical, Month 2 boost m12, star_advice post, music: synthwave · Bm)
// Taurus is cancelling and the excuse keeps growing. Tired is a full reason. Hard cut.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre08', len: 23,
ending: 'cut', sender: 'taurus', partner: 'virgo',
  hook: 'Taurus is cancelling. | With *fiction.*', hookColor: '#9fe6b0',
  thread: [{ side: 'L', text: 'still on for tonight? 8pm?' }],
  rounds: [{
    draft: 'so my cat is sick and my car broke and also my',
    caught: 'my cat is sick',
    head: 'You don\'t need a *plot.*',
    lines: [
      { text: "you don't have a *cat*." },
      { retry: 'and a pigeon stole my keys and the moon is', caught: 'a pigeon stole my keys' },
      { who: 'sender', text: "I'm just *so* tired. is that allowed?" },
      { text: 'yes. tired is a *whole* reason.' },
    ],
    rewrite: "I'm wiped tonight. can we move to sunday? I really want to see you.",
    replies: ['rest!!', 'sunday it is'],
  }],
  last: 'Tired is | a *full* reason.',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
