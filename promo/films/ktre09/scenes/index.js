// ktre09: TEXT RESCUE, "Not feeling it, lol bye" (22 s vertical, Month 2 boost m12, star_advice post, music: cinematic · Eb)
// Sagittarius ends things at speed. Kind and clear can share a text. Loop.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre09', len: 22,
ending: 'loop', sender: 'sagittarius', partner: 'aquarius',
  hook: 'Sag is ending it. | *At speed.*', hookColor: '#c9a6ff',
  thread: [{ side: 'L', text: 'had fun last night! want to go again?' }],
  rounds: [{
    draft: 'not feeling it lol bye',
    caught: 'lol bye',
    head: 'Kind *and* clear.',
    lines: [
      { text: "honest, yes. but they're a *person*." },
      { retry: '...', caught: '...' },
      { text: 'and silence is not an *answer* either.' },
      { who: 'sender', text: 'ok. honest *and* kind. both. got it.' },
    ],
    rewrite: "I had a nice time, but I don't feel a spark. wishing you the best.",
    replies: ['thanks for being honest', 'you too!'],
  }],
  last: 'Clear is kind. | *Kind is clear.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
