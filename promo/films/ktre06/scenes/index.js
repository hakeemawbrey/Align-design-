// ktre06: TEXT RESCUE, "Per my last message, my crush" (20 s vertical, Month 2 boost m12, star_advice post, music: chiptune · G)
// Capricorn texts a crush like a work email. Hard cut.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre06', len: 20,
ending: 'cut', sender: 'capricorn', partner: 'cancer',
  hook: 'Capricorn texted a crush. | *Like email.*', hookColor: '#c9b48a',
  thread: [{ side: 'L', text: 'cannot wait for dinner tomorrow!' }],
  rounds: [{
    draft: 'Per my last message, are we still on for 7? Kind regards.',
    caught: 'Per my last message',
    head: "Let them hear you're *excited.*",
    lines: [
      { text: 'this is a *crush*, not a meeting.' },
      { retry: 'Confirming attendance.', caught: 'attendance' },
      { who: 'sender', text: 'but I *am* excited. very professionally.' },
      { text: 'then let them *hear* it.' },
    ],
    rewrite: "still on for 7? I've been looking forward to it all day.",
    replies: ['same!!', 'counting down'],
  }],
  endMood: 'happy',
  last: 'Your crush is not | *a meeting invite.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
