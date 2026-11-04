// nt2e26 · PETTY OR VALID · "Taurus and the Last Dumpling" (18 s vertical, Trends Vol. 2 ep 26, music: chiptune · A).
// The format lives in ./pettykit.js (eps 26–30) on ../../nt2e21/scenes/trendkit.js (the batch core).
//   0.0   hook: "Petty or *valid?* | Taurus edition." ♉ mid-hug of a takeout box, the needle twitching.
//   2.1   #1 "I didn't share my fries. They said *‘I’m not hungry.’*"  Taurus guards the fries → VALID.
//   5.1   #2 "I gave them *the slow stare* for taking the last dumpling."  The last dumpling floats away → PETTY (hehe).
//   8.1   flash cut. #3 "I’m sad they forgot our *cozy night* and I didn’t say so."  Taurus under a blanket with a mug;
//         the needle wobbles… VALID + "so say it."
//   11.4  Taurus to ♍ Virgo: "hey, i missed our cozy night."  Virgo melts.
//   12.15 THE STARS: "Say it with *words*, not fries."  Pisces: VALID!, fountaining.
import { makePetty } from './pettykit.js'
import { takeoutProp, friesProp, dumplingProp, blanketProp, mugProp, label, prog, ease, BONE } from '../../nt2e21/scenes/trendkit.js'

const EP = makePetty({
  id: 'nt2e26', sign: 'taurus', date: 'virgo', deep: '#8a5a10', accent: '#e9b24a',
  hookMood: 'heart',
  hookDraw(x, t, S) { if (!S.under) takeoutProp(x, S.o.x + 10, S.o.y + 110, 0.95) },
  rounds: [
    { text: 'I didn’t share my fries. They said *‘I’m not hungry.’*', verdict: 'valid', mood: 'squint', look: [1, 0],
      draw(x, t, S) { if (!S.under) { friesProp(x, 690, 1110, 1.2); label(x, 'MINE', 690, 980, { size: 34, col: BONE, font: 'Inter', weight: 800 }) } } },
    { text: 'I gave them *the slow stare* for taking the last dumpling.', verdict: 'petty', mood: 'squint', look: [-1, 0],
      draw(x, t, S) {
        if (S.under) return
        const p = ease.inOutQuad(prog(S.u, 0.4, 1.5))
        dumplingProp(x, 300 - p * 220, 1060 - p * 80, 1.3)
        label(x, 'the last one', 300 - p * 220, 980 - p * 80, { size: 26, alpha: 1 - p })
      } },
    { text: 'I’m sad they forgot our *cozy night* and I didn’t say so.', verdict: 'valid', mood: 'neutral', look: [0, 1],
      draw(x, t, S) {
        if (S.under) return
        blanketProp(x, 540, 1130, 320, 110, { col: '#c45a7a', stripe: '#f2c75c' })
        mugProp(x, 760, 1150, { col: '#7c74f0', s: 0.9, steam: 1, t })
      } },
  ],
  say: 'hey, i missed our cozy night.',
  last: 'Say it with *words*, not fries.',
  pisCard: 'VALID!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
