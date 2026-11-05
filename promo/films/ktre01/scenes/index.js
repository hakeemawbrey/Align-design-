// ktre01: TEXT RESCUE, "Left on read for two days" (22 s vertical, Month 2 boost m12, star_advice post, music: pop · D)
// Frame 0: Aries mid-lunge, the hand mid-slam on SEND under "hello??? did I do something or". Red pen slash at 0.6.
// THE STARS: three question marks is a siren → ask once, kindly. Rewrite → reply "friday 7?". Hard cut on the last line.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({
  id: 'ktre01', len: 22, ending: 'cut', sender: 'aries', partner: 'libra',
  hook: 'Left on read. | *Two days.*',
  thread: [{ side: 'R', text: 'ok that taco place was elite' }, { side: 'L', text: 'that was so fun!!' }, { side: 'R', text: 'see you friday?' }],
  receipt: 'Read 2 days ago',
  rounds: [{
    draft: 'hello??? did I do something or',
    caught: 'hello???',
    head: 'Ask *once.*',
    lines: [
      { who: 'sender', text: 'but they *read* it. two days ago!!' },
      { text: 'three question marks is a *siren*.' },
      { retry: 'wow ok. noted.', caught: 'noted.' },
      { text: "the quiet version is *still* a siren." },
      { text: "ask once, kindly. then *let it breathe*." },
    ],
    rewrite: 'hey! still up for friday? totally fine if plans changed.',
    replies: ['omg yes, sorry, crazy week!!', 'friday 7?'],
  }],
  last: 'Ask once. | *Then let it breathe.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
