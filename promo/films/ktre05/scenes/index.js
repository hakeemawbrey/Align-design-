// ktre05: TEXT RESCUE, ""So like… what are we lol"" (22 s vertical, Month 2 boost m12, star_advice post, music: house · C)
// Gemini drafts the situationship question wrapped in jokes. Loop.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre05', len: 22,
ending: 'loop', sender: 'gemini', partner: 'pisces',
  hook: 'The situationship text. | *Drafted.*', hookColor: '#ffe27a',
  thread: [{ side: 'L', text: 'last night was really nice' }, { side: 'R', text: 'it really was' }],
  rounds: [{
    draft: 'so like what are we lol jk unless',
    caught: 'lol jk unless',
    head: 'Ask it *straight.*',
    lines: [
      { text: "the 'lol' is a *helmet*." },
      { retry: 'anyway what are u eating', caught: 'anyway' },
      { who: 'sender', text: 'what if they say *nothing*?' },
      { text: 'then you get your answer. that *helps* too.' },
    ],
    rewrite: 'I really like what we have. are we seeing other people?',
    replies: ['honestly? I was hoping you would ask', 'just you'],
  }],
  last: 'Delete the *lol.* | Keep the question.',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
