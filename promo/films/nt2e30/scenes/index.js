// nt2e30 · PETTY OR VALID · "Sagittarius Posts a Quote" (20 s vertical, Trends Vol. 2 ep 30, music: chiptune · E).
// The format lives in ../../nt2e26/scenes/pettykit.js (eps 26–30) on ../../nt2e21/scenes/trendkit.js (the batch core).
// Hook "Petty or *valid?* | Sagittarius edition."; three confessions, the needle judges; round 3 (card cut 8.1) wobbles to
// VALID + "so say it."; the sign says it to its person; THE STARS: the last line; Pisces fountains.
//   #1 "I posted a vague quote about *freedom* after we bickered." → PETTY · #2 "I need a night *alone* sometimes." → VALID
//   #3 "I’m hurt they laughed at my *big plan.*" → VALID, so say it.  Sag to ♊: "my big plan matters to me. can we talk?"
//   Last: "Tell them the dream *matters.*"
import { makePetty } from '../../nt2e26/scenes/pettykit.js'
import { backpackProp, phoneProp, pillowProp, mugProp, mapProp, label, INTER } from '../../nt2e21/scenes/trendkit.js'

const EP = makePetty({
  id: 'nt2e30', sign: 'sagittarius', date: 'gemini', deep: '#6a2ab0', accent: '#a35cf0',
  hookMood: 'happy',
  hookDraw(x, t, S) { if (S.under) backpackProp(x, S.o.x + 150, S.o.y + 40, { rot: 0.2 }) },
  rounds: [
    { text: 'I posted a vague quote about *freedom* after we bickered.', verdict: 'petty', mood: 'squint', look: [1, 0],
      draw(x, t, S) { if (!S.under) phoneProp(x, 770, 1050, { rot: 0.1, s: 1.1, lines: ['“be free.”', 'who is it for'], head: 'MY PAGE' }) } },
    { text: 'I need a night *alone* sometimes.', verdict: 'valid', mood: 'happy', look: [0, 0],
      draw(x, t, S) {
        if (S.under) { pillowProp(x, 540, 1170, 300, 70, '#7c74f0'); return }
        mugProp(x, 790, 1130, { col: '#e9b24a', s: 0.9, steam: 1, t }); label(x, 'ME TIME', 790, 1010, { size: 30, col: '#efe6d6', font: INTER, weight: 800 })
      } },
    { text: 'I’m hurt they laughed at my *big plan.*', verdict: 'valid', mood: 'neutral', look: [0, 1],
      draw(x, t, S) { if (!S.under) mapProp(x, 790, 1100, { rot: -0.06, s: 0.85 }) } },
  ],
  say: 'my big plan matters to me. can we talk?',
  last: 'Tell them the dream *matters.*',
  pisCard: 'VALID!!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
