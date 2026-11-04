// nt2e38 · NATURE DOCUMENTARY NARRATOR · "The Cancer Hosts" (23 s vertical, Trends Vol. 2 ep 38, music: cinematic · Ebm).
// The format lives in ../../nt2e36/scenes/natkit.js (eps 36–40) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "Behold the *Cancer*, | in its shell." ♋ fluffing a pillow fort. THE CANCER · Cancer hospitalis.
//   2.4   I · THE SHELL  "It builds a shell of *pillows.*"  Pillows stack up around it.
//   7.4   II · THE FEAST  "It feeds every visitor. *Every* visitor."  Cookies fly to three tiny visitors; the stacks grow.
//   12.4  flash cut. III · RARELY SEEN  "Rarely seen: it *lets* someone feed it."  ♏ Scorpio offers a cookie; Cancer takes it.
//   17.0  together.  17.3 THE NARRATOR: "Hosts deserve *hosting*, too."  Pisces cries in the hide.
import { makeNat } from '../../nt2e36/scenes/natkit.js'
import { pillowProp, cookieProp, crowd, prog, ease, lerp, clamp } from '../../nt2e21/scenes/trendkit.js'

const PIL = [[300, 1190, '#c9a6ff', -0.1], [780, 1190, '#ff8fb1', 0.1], [330, 1120, '#9fd8f6', -0.2], [750, 1120, '#f2c75c', 0.2], [540, 840, '#c9a6ff', 0]]
function fort(x, n) { PIL.slice(0, n).forEach(([px, py, c, r]) => pillowProp(x, px, py, 200, 70, c, r)) }
const EP = makeNat({
  id: 'nt2e38', sign: 'cancer', mate: 'scorpio', latin: 'Cancer hospitalis', accent: '#3fb6f0',
  hook: 'Behold the *Cancer*, | in its shell.',
  hookMood: 'happy',
  hookDraw(x, t, S) { if (S.under) fort(x, 2); else { fort(x, 0); pillowProp(x, 540 + 10 * Math.sin(t * 8), 830, 200, 70, '#c9a6ff', 0.15 * Math.sin(t * 8)) } },
  chapters: [
    { tag: 'THE SHELL', line: 'It builds a shell of *pillows.*',
      pose: () => ({ x: 540, mood: 'happy', look: [0, -0.5], hops: [3.3, 4.2, 5.1, 6.0] }),
      draw(x, t, S) { const n = Math.min(5, Math.floor(S.u / 0.9) + 1); if (S.under) fort(x, Math.min(4, n)); else if (n >= 5) fort(x, 0), pillowProp(x, 540, 840, 200, 70, '#c9a6ff', 0) },
      cues: [['pop', 0.9, 659.25, 0.03, -0.3], ['pop', 1.8, 739.99, 0.03, 0.3], ['pop', 2.7, 880, 0.03, -0.3], ['pop', 3.6, 987.77, 0.035, 0.3]] },
    { tag: 'THE FEAST', line: 'It feeds every visitor. *Every* visitor.',
      pose: u => ({ x: 360, mood: 'happy', look: [1, 0], hops: [8.2, 9.0, 9.8, 10.6, 11.4] }),
      draw(x, t, S) {
        if (S.under) { crowd(x, t, ['aries', 'gemini', 'leo'], 640, 900, 1150, 110, { mood: 'wide', look: [-1, 0] }); return }
        ;[0.8, 1.6, 2.4, 3.2, 4.0].forEach((d, i) => {
          const p = ease.inOutQuad(prog(S.u, d, d + 0.5)), tx = [640, 770, 900][i % 3], stack = Math.floor(clamp((S.u - d - 0.5) * 10))
          if (p > 0 && p < 1) cookieProp(x, lerp(400, tx, p), lerp(1000, 1020, p) - Math.sin(Math.PI * p) * 160, 1)
          if (stack > 0) cookieProp(x, tx, 1070 - Math.floor(i / 3) * 34, 1)
        })
      },
      cues: [['whoosh', 0.8, 0.4, 0.02], ['whoosh', 1.6, 0.4, 0.02], ['whoosh', 2.4, 0.4, 0.02], ['whoosh', 3.2, 0.4, 0.02], ['whoosh', 4.0, 0.4, 0.02]] },
    { tag: 'RARELY SEEN', line: 'Rarely seen: it *lets* someone feed it.',
      pose: u => ({ x: 380, mood: u < 1.6 ? 'wide' : 'heart', look: [1, 0], hops: [12.4 + 1.7] }),
      draw(x, t, S) {
        if (S.under) { S.mate(x, t, { x: 720, y: 1100, s: 240, mood: 'happy', look: [-1, 0], hops: [S.a + 0.6] }); return }
        const p = ease.inOutCubic(prog(S.u, 0.9, 1.6))
        cookieProp(x, lerp(640, 470, p), 1010 - Math.sin(Math.PI * p) * 60, 1.4)
      },
      cues: [['pluck', 1.65, 1174.66, 0.04, 0.6, 0]] },
  ],
  finaleDraw(x, t, S) { if (S.under) fort(x, 4) },
  last: 'Hosts deserve *hosting*, too.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
