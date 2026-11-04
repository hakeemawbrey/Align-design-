// nt2e32 · WHAT THEY SAID vs WHAT THEY MEANT · "Scorpio Says Fine" (20 s vertical, Trends Vol. 2 ep 32, music: lofi · Bm).
// The format lives in ../../nt2e31/scenes/saidkit.js (eps 31–35) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "What a Scorpio *says* | vs what they *mean.*" ♏ in sunglasses, mid-sip.
//   2.1   SAID "I'm fine." (shades) / MEANT "I've thought about it for *nine hours.*" (a THINKING clock: 9 hrs)
//   5.1   SAID "interesting." (shades) / MEANT "I'm *obsessed* with this detail about you." (a notebook of hearts)
//   8.1   card cut. SAID = MEANT "I want to know where *we're going.*" → ✓ SAME
//   11.4  Scorpio + ♉ Taurus.  12.0 THE STARS: "Mystery is fun. *Clarity* is kinder."  Pisces: CLEAR!, fountaining.
import { makeSaid } from '../../nt2e31/scenes/saidkit.js'
import { mugProp, paperProp, bookProp, starFrame, inSprite, shadesCells, prog } from '../../nt2e21/scenes/trendkit.js'

const shades = (x, t, o) => inSprite(x, starFrame(o.x, o.y, o.s, t, { hops: o.hops, seed: 3, pop: o.pop ?? 1 }), () => shadesCells(x, 0))
const EP = makeSaid({
  id: 'nt2e32', sign: 'scorpio', date: 'taurus', deep: '#9a1a3e', accent: '#e23d66',
  hookDraw(x, t, S) { if (!S.under) { shades(x, t, S.o); mugProp(x, S.o.x + 200, S.o.y + 40, { s: 1.1, steam: 1, t, col: '#e8344e' }) } },
  pairs: [
    { said: 'I’m fine.', meant: 'I’ve thought about it for *nine hours.*', saidMood: 'neutral',
      saidDraw(x, t, S) { if (!S.under) shades(x, t, S.so) },
      meantDraw(x, t, S) { if (!S.under) { x.save(); x.translate(770, 1430); x.scale(S.mk, S.mk); paperProp(x, 0, 0, 220, 170, { rot: 0.06, title: 'THINKING', big: '9 hrs', bigCol: '#9a1a3e' }); x.restore() } } },
    { said: 'interesting.', meant: 'I’m *obsessed* with this detail about you.', saidMood: 'neutral', meantMood: 'heart',
      saidDraw(x, t, S) { if (!S.under) shades(x, t, S.so) },
      meantDraw(x, t, S) { if (!S.under) { x.save(); x.translate(770, 1430); x.scale(0.8 * S.mk, 0.8 * S.mk); bookProp(x, 0, 0, { col: '#5a1a3a', writing: prog(S.u, 1.3, 2.2), hearts: prog(S.u, 1.6, 2.5) }); x.restore() } } },
    { said: 'I want to know where we’re going.', saidSize: 32, meant: 'I want to know where *we’re going.*', saidMood: 'happy', meantMood: 'happy' },
  ],
  last: 'Mystery is fun. *Clarity* is kinder.',
  pisCard: 'CLEAR!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
