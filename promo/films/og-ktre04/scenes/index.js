// og-ktre04: social rework of ktre04, TEXT RESCUE, "The twelve-paragraph apology" (24 s vertical, star_advice, music: jazzy · Bb).
// Same phone, cast and story. Static HOOK (box) instead of the slammed title, no series bug, no shakes/flashes, layout inside
// the full-frame safe zone, crazier signs. Ends on the last line (hard cut). Built on the og copy of the kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre04', len: 24,
ending: 'cut', sender: 'virgo', partner: 'gemini',
  thread: [{ side: 'L', text: 'hey, that was kind of harsh earlier' }],
  rounds: [{
    tall: true,
    draft: "I want to start by saying that I have reflected deeply on the events of this afternoon, which I will now summarise in order, with footnotes. Firstly, at 2:14 I said your plan was \"not ideal\", which, in context, and I want to be fair to myself here, was technically accurate, however the tone, which I have analysed from three angles and colour-coded, was",
    caught: 'technically accurate',
    head: 'Own it. *Short.*',
    lines: [
      { text: 'you lost them at *footnote one*.' },
      { retry: 'sorry.', caught: 'sorry.' },
      { text: 'ok, now too short. aim for *three* lines.' },
      { who: 'sender', text: "but the appendix is *colour-coded*." },
      { text: 'keep the binder. send the *sorry*.' },
    ],
    rewrite: "I was short with you earlier. I'm sorry. you didn't deserve that.",
    replies: ['thank you for saying that', "we're good"],
  }],
  last: 'A real sorry | fits in *three lines.*', rec: 'hold on. *page twelve?*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = "Virgo's apology | has *footnotes.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = F.HOOK_UNTIL
