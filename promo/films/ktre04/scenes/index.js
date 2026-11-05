// ktre04: TEXT RESCUE, "The twelve-paragraph apology" (24 s vertical, Month 2 boost m12, star_advice post, music: jazzy · Bb)
// Virgo's apology draft is so long it fills the phone. A loading bar, a slash, three honest lines.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre04', len: 24,
ending: 'cut', sender: 'virgo', partner: 'gemini',
  hook: "Virgo's apology | has *chapters.*", hookColor: '#9fe6b0',
  thread: [{ side: 'L', text: 'hey, that was kind of harsh earlier' }],
  rounds: [{
    tall: true,
    draft: "I want to start by saying that I have reflected deeply on the events of this afternoon, which I will now summarise in order. Firstly, at 2:14 I said your plan was \"not ideal\", which, in context, and I want to be fair to myself here, was technically accurate, however the tone, which I have analysed from three angles, was",
    caught: 'technically accurate',
    head: 'Own it. *Short.*',
    lines: [
      { text: 'you lost them at *paragraph two*.' },
      { retry: 'sorry.', caught: 'sorry.' },
      { text: 'ok, now too short. aim for *three* lines.' },
      { who: 'sender', text: "but I need them to know I *thought* about it." },
      { text: 'they will know. say sorry, *warm and short*.' },
    ],
    rewrite: "I was short with you earlier. I'm sorry. you didn't deserve that.",
    replies: ['thank you for saying that', "we're good"],
  }],
  last: 'A real sorry | fits in *three lines.*', rec: 'hold on. *page twelve?*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
