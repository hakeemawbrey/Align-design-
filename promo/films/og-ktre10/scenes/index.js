// og-ktre10: social rework of ktre10, TEXT RESCUE, "The 600-word love confession" (24 s vertical, star_advice, music: dreamy · E).
// Same phone, cast and story. Static HOOK (box) instead of the slammed title, no series bug, no shakes/flashes, layout inside
// the full-frame safe zone, crazier signs. Ends on the last line (hard cut). Built on the og copy of the kit (../rescuekit.js).
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre10', len: 24,
ending: 'cut', sender: 'pisces', partner: 'cancer', peek: 'aquarius',
  thread: [{ side: 'L', text: 'thanks for today, it was really fun' }],
  rounds: [{
    tall: true, live: false,
    draft: 'I think about you every second and I wrote you a poem, part one of four. Ode to the way you hold a coffee cup. Verse one. When the morning light falls on your sleeve I feel the ocean in my chest and also the moon and also',
    caught: 'part one of four',
    head: 'Save the *poem.*',
    lines: [
      { who: 'sender', text: "it's *only* four parts!! and a dance. (sob)" },
      { text: 'big feelings, *small* first text.' },
      { retry: 'never mind. forget it. moving to the sea. bye forever.', caught: 'bye forever' },
      { text: 'no swimming away *either*, sweet fish.' },
      { text: 'save the poem. send the *invite*.' },
    ],
    rewrite: 'I really like you. want to get coffee this week?',
    replies: ['I was SO hoping you would say that', 'thursday?'],
  }],
  last: 'Big feelings. | *Small text.*', rec: 'hold on. *part one?*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Pisces confessed. | *Part one of four.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = F.HOOK_UNTIL
