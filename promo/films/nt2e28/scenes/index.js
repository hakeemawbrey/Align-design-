// nt2e28 · PETTY OR VALID · "Scorpio's Dramatic Exit" (20 s vertical, Trends Vol. 2 ep 28, music: chiptune · C).
// The format lives in ../../nt2e26/scenes/pettykit.js (eps 26–30) on ../../nt2e21/scenes/trendkit.js (the batch core).
// Hook "Petty or *valid?* | Scorpio edition."; three confessions, the needle judges; round 3 (card cut 8.1) wobbles to
// VALID + "so say it."; the sign says it to its person; THE STARS: the last line; Pisces fountains.
//   #1 "I remember *exactly* what they wore on date one." → VALID · #2 "I made a *dramatic exit*… to the kitchen." → PETTY
//   #3 "I want to know where this is *going.*" → VALID, so say it.  Scorpio to ♋: "so… where is this going? i’d like to know."
//   Last: "Ask the *big* question out loud."
import { makePetty } from '../../nt2e26/scenes/pettykit.js'
import { capeProp, paperProp, mapProp, box, label, prog, ease, INTER } from '../../nt2e21/scenes/trendkit.js'

function door(x, cx, cy) {
  box(x, cx - 80, cy - 150, 160, 280, '#7b5634', { b: 7, hi: '#98704a' }); x.fillStyle = '#f2c75c'; x.fillRect(cx + 44, cy, 14, 14)
  box(x, cx - 70, cy - 210, 140, 40, '#efe6d6', { b: 5 }); label(x, 'KITCHEN', cx, cy - 190, { size: 24, col: '#1b1236', font: INTER, weight: 800 })
}
const EP = makePetty({
  id: 'nt2e28', sign: 'scorpio', date: 'cancer', deep: '#9a1a3e', accent: '#e23d66',
  hookMood: 'squint',
  hookDraw(x, t, S) { if (S.under) capeProp(x, t, S.o.x, S.o.y + 30, 330, 0.3 * Math.sin(t * 4)) },
  rounds: [
    { text: 'I remember *exactly* what they wore on date one.', verdict: 'valid', mood: 'squint', look: [1, -1],
      draw(x, t, S) { if (!S.under) paperProp(x, 790, 1050, 220, 160, { rot: 0.07, title: 'DATE ONE', lines: 0, big: 'green', bigCol: '#2f8a5a' }) } },
    { text: 'I made a *dramatic exit*… to the kitchen.', verdict: 'petty', mood: 'squint', look: [1, 0],
      draw(x, t, S) {
        if (S.under) { door(x, 860, 1060); capeProp(x, t, 540 + 60 * ease.inOutCubic(prog(S.u, 0.4, 1.0)), 1090, 290, 0.6 * Math.sin(Math.min(S.u, 1.6) * 5)); return }
      } },
    { text: 'I want to know where this is *going.*', verdict: 'valid', mood: 'neutral', look: [0, 1],
      draw(x, t, S) { if (!S.under) mapProp(x, 790, 1100, { rot: 0.06, s: 0.85 }) } },
  ],
  say: 'so… where is this going? i’d like to know.',
  last: 'Ask the *big* question out loud.',
  pisCard: 'ASK IT!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
