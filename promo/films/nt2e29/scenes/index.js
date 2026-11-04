// nt2e29 · PETTY OR VALID · "Capricorn Sends Minutes" (18 s vertical, Trends Vol. 2 ep 29, music: chiptune · D).
// The format lives in ../../nt2e26/scenes/pettykit.js (eps 26–30) on ../../nt2e21/scenes/trendkit.js (the batch core).
// Hook "Petty or *valid?* | Capricorn edition."; three confessions, the needle judges; round 3 (flash cut 8.1, no card-back) wobbles to
// VALID + "so say it."; the sign says it to its person; THE STARS: the last line; Pisces fountains.
//   #1 "I put our date in my calendar *in pen.*" → VALID · #2 "I sent *meeting notes* after our little argument." → PETTY
//   #3 "I want them to *plan* something for once." → VALID, so say it.  Capricorn to ♉: "could you plan our next date? i’d love that."
//   Last: "Say the need. *Skip* the memo."
import { makePetty } from '../../nt2e26/scenes/pettykit.js'
import { laptopProp, paperProp, folderStack } from '../../nt2e21/scenes/trendkit.js'

const EP = makePetty({
  id: 'nt2e29', sign: 'capricorn', date: 'taurus', deep: '#1a7a5a', accent: '#2fc79a',
  hookMood: 'squint',
  hookDraw(x, t, S) { if (!S.under) laptopProp(x, S.o.x, S.o.y + 170, { s: 0.75, text: 'RE: us|(agenda)' }) },
  rounds: [
    { text: 'I put our date in my calendar *in pen.*', verdict: 'valid', mood: 'happy', look: [1, 0],
      draw(x, t, S) { if (!S.under) paperProp(x, 790, 1060, 200, 190, { rot: 0.06, title: 'FRIDAY', big: 'DATE', bigCol: '#c42a4e' }) } },
    { text: 'I sent *meeting notes* after our little argument.', verdict: 'petty', mood: 'squint', look: [1, 0],
      draw(x, t, S) { if (!S.under) paperProp(x, 790, 1060, 210, 230, { rot: 0.08, title: 'MINUTES', lines: 6 }) } },
    { text: 'I want them to *plan* something for once.', verdict: 'valid', mood: 'neutral', look: [1, 1],
      draw(x, t, S) { if (S.under) folderStack(x, 800, 1170, 7) } },
  ],
  say: 'could you plan our next date? i’d love that.',
  last: 'Say the need. *Skip* the memo.',
  pisCard: 'NO MEMO!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
