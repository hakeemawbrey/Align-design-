// ktre12: TEXT RESCUE, "Who was that in your story" (23 s vertical, Month 2 boost m12, star_advice post, music: cinematic · Dm)
// Scorpio drafts an interrogation. Name the feeling, not the suspect. Hard cut.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre12', len: 23,
ending: 'cut', sender: 'scorpio', partner: 'libra',
  hook: 'Scorpio drafted | *the question.*', hookColor: '#c9283c',
  thread: [{ side: 'L', text: 'had the best day at the lake' }],
  rounds: [{
    draft: 'who was that in your story',
    caught: 'who was that',
    head: 'Name the *feeling.*',
    lines: [
      { text: "that's a *case file*, not a feeling." },
      { retry: 'just curious. no reason. who.', caught: 'no reason' },
      { who: 'sender', text: 'ok. I felt a little *left out*.' },
      { text: 'that is the real text. say *that*.' },
    ],
    rewrite: "hey, I felt a little insecure today. can we talk later? nothing's wrong, I just want to be close.",
    replies: ['of course. thank you for telling me', 'call at 8?'],
  }],
  last: 'Name the feeling, | *not the suspect.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
