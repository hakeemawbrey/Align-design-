// nt2e27 · PETTY OR VALID · "Gemini Renames a Contact" (18 s vertical, Trends Vol. 2 ep 27, music: chiptune · B).
// The format lives in ../../nt2e26/scenes/pettykit.js (eps 26–30) on ../../nt2e21/scenes/trendkit.js (the batch core).
// Hook "Petty or *valid?* | Gemini edition."; three confessions, the needle judges; round 3 (flash cut 8.1, no card-back) wobbles to
// VALID + "so say it."; the sign says it to its person; THE STARS: the last line; Pisces fountains.
//   #1 "I renamed them in my phone to *‘Mr. Late.’*" → PETTY · #2 "I’m annoyed they *talked over* my story twice." → VALID
//   #3 "I wish they’d ask about *my* day." → VALID, so say it.  Gemini to ♐: "can you ask about my day sometimes?"
//   Last: "Say the quiet part *kindly.*"
import { makePetty } from '../../nt2e26/scenes/pettykit.js'
import { phoneProp, bubble, paperProp } from '../../nt2e21/scenes/trendkit.js'

const EP = makePetty({
  id: 'nt2e27', sign: 'gemini', date: 'sagittarius', deep: '#8a6a00', accent: '#f2cf4a',
  hookMood: 'squint',
  hookDraw(x, t, S) { if (!S.under) phoneProp(x, S.o.x + 170, S.o.y + 40, { rot: 0.15, lines: ['typing…'], head: 'NEW CONTACT' }) },
  rounds: [
    { text: 'I renamed them in my phone to *‘Mr. Late.’*', verdict: 'petty', mood: 'squint', look: [1, 0],
      draw(x, t, S) { if (!S.under) phoneProp(x, 760, 1050, { rot: 0.1, s: 1.1, lines: ['Mr. Late', 'omw!!'], head: 'CONTACT' }) } },
    { text: 'I’m annoyed they *talked over* my story twice.', verdict: 'valid', mood: 'neutral', look: [0, -1],
      draw(x, t, S) {
        if (S.under) return
        bubble(x, t, 280, 930, S.a + 0.4, S.b - 0.1, 'so anyway, the—', { size: 30, tail: 0.5 })
        bubble(x, t, 800, 870, S.a + 0.75, S.b - 0.1, 'OH that reminds me!', { size: 30, tail: -0.5, col: '#ffd1de' })
        bubble(x, t, 760, 950, S.a + 1.1, S.b - 0.1, 'ALSO—', { size: 30, tail: -0.5, col: '#ffd1de' })
      } },
    { text: 'I wish they’d ask about *my* day.', verdict: 'valid', mood: 'neutral', look: [0, 1],
      draw(x, t, S) { if (!S.under) paperProp(x, 770, 1080, 190, 170, { rot: 0.08, title: 'MY DAY', lines: 4 }) } },
  ],
  say: 'can you ask about my day sometimes?',
  last: 'Say the quiet part *kindly.*',
  pisCard: 'VALID!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
