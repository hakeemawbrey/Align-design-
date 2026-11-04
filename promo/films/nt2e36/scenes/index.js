// nt2e36 · NATURE DOCUMENTARY NARRATOR · "The Taurus Nests" (23 s vertical, Trends Vol. 2 ep 36, music: cinematic · Cm).
// The format lives in ./natkit.js (eps 36–40) on ../../nt2e21/scenes/trendkit.js (the batch core).
//   0.0   hook: "In the cold months, | the *Taurus* nests." ♉ dragging a blanket. Lower third: THE TAURUS · Taurus cozius.
//   2.4   I · THE NEST  "It gathers soft things. *Many* soft things."  Blankets and pillows pile up, one by one.
//   7.4   II · THE HOARD  "Approach the snacks *slowly.*"  Taurus curls around a cookie pile, one eye open.
//   12.4  flash cut. III · RARELY SEEN  "Rarely seen: it *shares* the warm blanket."  ♍ Virgo shivers; the Taurus pulls
//         the top blanket over its mate.
//   17.0  together in the nest; THE STARS peek from the left bush.  17.3 THE NARRATOR: "A warm nest is *shared.*"
//   Pisces watches through binoculars from the right bush, crying.
import { makeNat } from './natkit.js'
import { blanketProp, pillowProp, cookieProp, label, shout, pop01, prog, ease, lerp, BONE, INTER } from '../../nt2e21/scenes/trendkit.js'

const COLS = [['#d8577e', '#f2c75c'], ['#4f7cd8', '#9fd8f6'], ['#3fae5a', '#f2c75c'], ['#a35cf0', '#ffd1de'], ['#e9b24a', '#c45a3a']]
function pile(x, t, n, cx = 760, base = 1220) {
  for (let i = 0; i < n; i++) {
    const k = typeof n === 'number' ? 1 : 1
    blanketProp(x, cx + (i % 2 ? 14 : -10), base - 30 - i * 44, 300 - i * 18, 52, { col: COLS[i % 5][0], stripe: COLS[i % 5][1], rot: (i % 3 - 1) * 0.04 })
    void k
  }
}
const EP = makeNat({
  id: 'nt2e36', sign: 'taurus', mate: 'virgo', latin: 'Taurus cozius', accent: '#e9b24a',
  hook: 'In the cold months, | the *Taurus* nests.',
  hookMood: 'squint',
  hookDraw(x, t, S) { if (S.under) { S.o.x = 600 - 10 * Math.sin(t * 3); blanketProp(x, 330 + 14 * Math.sin(t * 3), 1180, 300, 70, { rot: -0.1 }) } },
  chapters: [
    { tag: 'THE NEST', line: 'It gathers soft things. *Many* soft things.',
      pose: u => ({ x: 380, mood: u < 2.5 ? 'squint' : 'happy', look: [1, 0], hops: [2.4 + 0.9, 2.4 + 1.8, 2.4 + 2.7, 2.4 + 3.6] }),
      draw(x, t, S) {
        if (!S.under) return
        const n = Math.min(5, 1 + Math.floor(S.u / 0.9))
        pile(x, t, n)
        if (S.u > 3.8) pillowProp(x, 760, 1220 - 30 - n * 44 - 20, 140, 50, '#c9a6ff', 0.1)
      },
      cues: [['pop', 0.9, 659.25, 0.03, 0.3], ['pop', 1.8, 739.99, 0.03, 0.3], ['pop', 2.7, 880, 0.03, 0.3], ['pop', 3.6, 987.77, 0.035, 0.3], ['pop', 3.85, 1174.66, 0.035, 0.3]] },
    { tag: 'THE HOARD', line: 'Approach the snacks *slowly.*',
      pose: u => ({ x: 560, y: 1110, mood: u < 2.2 ? 'sleepy' : 'squint', look: [1, 0], squash: 0.06 }),
      draw(x, t, S) {
        if (S.under) { for (let i = 0; i < 9; i++) cookieProp(x, 760 + (i % 4) * 52 - (i > 3 ? 26 : 0) - (i > 6 ? 26 : 0), 1215 - Math.floor(i / 4) * 40, 1); pile(x, t, 3, 260); return }
        if (S.u > 2.2) shout(x, t, '!', 700, 900, S.a + 2.2, { size: 90, col: BONE, life: 2.5 })
      },
      cues: [['tick', 2.2, 0.06], ['pop', 2.22, 1318.51, 0.04, 0.3]] },
    { tag: 'RARELY SEEN', line: 'Rarely seen: it *shares* the warm blanket.',
      pose: u => ({ x: 360, mood: u < 1.6 ? 'neutral' : 'happy', look: [1, 0], hops: [12.4 + 1.5] }),
      draw(x, t, S) {
        if (!S.under) {
          // the blanket slides from the pile over the mate
          const p = ease.inOutCubic(prog(S.u, 1.5, 2.3))
          if (p > 0) blanketProp(x, lerp(420, 720, p), lerp(1150, 1150, p) - Math.sin(Math.PI * p) * 120, 260, 90, { col: '#d8577e', stripe: '#f2c75c', rot: lerp(-0.3, 0, p) })
          return
        }
        pile(x, t, 3, 200)
        const shiv = S.u < 2.3 ? 4 * Math.sin(t * 60) : 0
        S.mate(x, t, { x: 720 + shiv, y: 1110, s: 240, mood: S.u < 2.3 ? 'squint' : 'heart', look: [-1, 0], hops: [S.a + 2.35] })
        if (S.u < 2.2) label(x, 'brr', 830, 920, { size: 44, col: BONE, font: INTER, weight: 800, rot: 0.1 })
      },
      cues: [['whoosh', 1.5, 0.7, 0.025], ['pluck', 2.35, 1174.66, 0.04, 0.6, 0.3]] },
  ],
  finaleDraw(x, t, S) { if (S.under) pile(x, t, 4, 860) ; else blanketProp(x, 555, 1190, 520, 90, { col: '#d8577e', stripe: '#f2c75c' }) },
  last: 'A warm nest is *shared.*',
})
void pop01
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
