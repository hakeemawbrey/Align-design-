// ktre10: TEXT RESCUE, "The 600-word love confession" (24 s vertical, Month 2 boost m12, star_advice post, music: dreamy · E)
// Pisces writes a confession poem; THE STARS shrink it to two lines. Hard cut.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre10', len: 24,
ending: 'cut', sender: 'pisces', partner: 'cancer', peek: 'aquarius',
  hook: 'Pisces wrote a confession. | *A long one.*', hookColor: '#8fe3ff',
  thread: [{ side: 'L', text: 'thanks for today, it was really fun' }],
  rounds: [{
    tall: true, live: false,
    draft: 'I think about you every second and I wrote you a poem, part one of four. Ode to the way you hold a coffee cup. Verse one. When the morning light falls on your sleeve I feel the ocean in my chest and also the moon and also',
    caught: 'part one of four',
    head: 'Save the *poem.*',
    lines: [
      { who: 'sender', text: "it's *only* four parts!! (sob)" },
      { text: 'big feelings, *small* first text.' },
      { retry: 'never mind. forget it. bye forever.', caught: 'bye forever' },
      { text: 'no running away *either*, sweet fish.' },
      { text: 'save the poem. send the *invite*.' },
    ],
    rewrite: 'I really like you. want to get coffee this week?',
    replies: ['I was SO hoping you would say that', 'thursday?'],
  }],
  last: 'Big feelings. | *Small text.*', rec: 'hold on. *part one?*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
