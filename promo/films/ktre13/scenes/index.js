// ktre13: TEXT RESCUE, "The strong friend needs a minute" (22 s vertical, Month 2 boost m12, star_advice post, music: lofi · G)
// Leo gives everyone advice and never takes it. The group chat shows up. Loop.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre13', len: 22,
ending: 'loop', sender: 'leo', title: '✦ the group chat',
  hook: 'The advice friend. | *Never* takes it.', hookColor: '#ffb347',
  thread: [{ side: 'L', text: '♓︎ leo you always know what to say' }, { side: 'L', text: '♊︎ ok how are YOU tho' }],
  rounds: [{
    draft: "I'm good!! anyway how are YOU",
    caught: "I'm good!!",
    head: 'Let them *hold* you.',
    lines: [
      { text: 'you hold everyone. let them *hold you*.' },
      { who: 'sender', text: "but I'm the *strong* one." },
      { text: 'the strong one gets to *lean* too.' },
      { who: 'pisces', text: 'we have been WAITING for this (sob)' },
    ],
    rewrite: "actually, could I vent for a sec? it's been a week.",
    replies: ['♋︎ ALWAYS', '♉︎ calling you now', '♓︎ on my way with snacks'],
  }],
  last: 'The strong friend | gets to *text too.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
