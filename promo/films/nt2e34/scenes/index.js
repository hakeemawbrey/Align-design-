// nt2e34 · WHAT THEY SAID vs WHAT THEY MEANT · "Capricorn Is Just Busy" (20 s vertical, Trends Vol. 2 ep 34, music: lofi · Dm).
// The format lives in ../../nt2e31/scenes/saidkit.js (eps 31–35) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "What a Capricorn *says* | vs what they *mean.*" ♑ peeking over a stack of folders.
//   2.1   SAID "I'm just busy this week." (folders) / MEANT "I *cleared Friday* for you." (FRIDAY: FREE)
//   5.1   SAID "let's be practical." / MEANT "I already *named* our plant." (a plant tagged SPROUT)
//   8.1   card cut. SAID = MEANT "*You* matter to me." → ✓ SAME
//   11.4  Capricorn + ♍ Virgo.  12.0 THE STARS: "Your heart isn't *off the clock.*"  Pisces: MATTERS!, fountaining.
import { makeSaid } from '../../nt2e31/scenes/saidkit.js'
import { folderStack, paperProp, plantProp } from '../../nt2e21/scenes/trendkit.js'

const EP = makeSaid({
  id: 'nt2e34', sign: 'capricorn', date: 'virgo', deep: '#1a7a5a', accent: '#2fc79a',
  hookMood: 'squint',
  hookDraw(x, t, S) { if (!S.under) folderStack(x, S.o.x + 230, S.o.y + 150, 7, { w: 220 }) },
  pairs: [
    { said: 'I’m just busy this week.', meant: 'I *cleared Friday* for you.', saidMood: 'squint',
      saidDraw(x, t, S) { if (!S.under) folderStack(x, 500, 790, 5, { w: 170 }) },
      meantDraw(x, t, S) { if (!S.under) { x.save(); x.translate(770, 1420); x.scale(S.mk, S.mk); paperProp(x, 0, 0, 220, 190, { rot: 0.06, title: 'FRIDAY', big: 'FREE', bigCol: '#1a8a5a' }); x.restore() } } },
    { said: 'let’s be practical.', meant: 'I already *named* our plant.', saidMood: 'neutral', meantMood: 'heart',
      meantDraw(x, t, S) { if (!S.under) plantProp(x, 730, 1520, { s: S.mk, tag: 'SPROUT' }) } },
    { said: 'You matter to me.', meant: '*You* matter to me.', saidMood: 'happy', meantMood: 'happy' },
  ],
  last: 'Your heart isn’t *off the clock.*',
  pisCard: 'MATTERS!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
