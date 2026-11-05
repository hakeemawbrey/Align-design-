// ktre14: TEXT RESCUE, "Happy holidays (not in a weird way)" (21 s vertical, Month 2 boost m12, star_advice post, music: pop · F)
// Gemini texts a crush holiday wishes, smothered in brackets. Hard cut.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre14', len: 21,
ending: 'cut', sender: 'gemini', partner: 'capricorn',
  hook: 'Texting your crush | *happy holidays.*', hookColor: '#8fe3ff',
  thread: [{ side: 'L', text: 'good luck with your last exam!' }, { side: 'R', text: 'thank you!! you too' }],
  rounds: [{
    draft: 'happy holidays!!! (not in a weird way) (unless)',
    caught: '(not in a weird way)',
    head: 'Warm. Simple. *Open.*',
    lines: [
      { text: 'the brackets are doing *a lot*.' },
      { retry: 'happy holidays to you and only you', caught: 'only you' },
      { who: 'sender', text: 'but I want them to know I *like* them!' },
      { text: 'warm, simple, and an *open door*.' },
    ],
    rewrite: 'happy holidays! hope your week is cozy. coffee in january?',
    replies: ['happy holidays!!', 'yes to coffee'],
  }],
  last: 'Leave out | *the brackets.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
