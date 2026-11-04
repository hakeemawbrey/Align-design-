// nt2e31 · WHAT THEY SAID vs WHAT THEY MEANT · "Aries Is Not Cold" (18 s vertical, Trends Vol. 2 ep 31, music: lofi · Am).
// The format lives in ./saidkit.js (eps 31–35) on ../../nt2e21/scenes/trendkit.js (the batch core).
//   0.0   hook: "What an Aries *says* | vs what they *mean.*" ♈ shivering, arms crossed, snow drifting.
//   2.1   SAID "I'm not even cold." (shivering) / MEANT "please offer me *your jacket.*" (dreaming of a jacket)
//   5.1   SAID "I'll text you whenever." / MEANT "I'll text you in *four minutes.*" (phone, thumb hovering)
//   8.1   flash cut. SAID = MEANT "I like you. *A lot.*" → ✓ SAME
//   11.4  Aries + ♎ Libra.  12.0 THE STARS: "Say the meant part *first.*"  Pisces: SAID IT!, fountaining.
import { makeSaid } from './saidkit.js'
import { jacketProp, phoneProp, label, BONE, INTER } from '../../nt2e21/scenes/trendkit.js'

function snow(x, t, y0, y1) { for (let i = 0; i < 18; i++) { const ph = (t * 0.25 + i * 0.137) % 1; x.fillStyle = 'rgba(239,230,214,0.8)'; x.fillRect(((i * 211) % 1040) + 20 + Math.sin(t + i) * 14, y0 + ph * (y1 - y0), 8, 8) } }
const shiver = t => 4 * Math.sin(t * 60)
const EP = makeSaid({
  id: 'nt2e31', sign: 'aries', date: 'libra', deep: '#b0321a', accent: '#f0603a',
  hookMood: 'squint',
  hookDraw(x, t, S) { if (S.under) snow(x, t, 300, 1250); else label(x, 'brr', S.o.x + 210, S.o.y - 170, { size: 54, col: BONE, font: INTER, weight: 800, rot: 0.1 + 0.03 * Math.sin(t * 30) }); S.o.x = 540 + shiver(t) },
  pairs: [
    { said: 'I’m not even cold.', meant: 'please offer me *your jacket.*', saidMood: 'squint',
      saidDraw(x, t, S) { if (S.under) snow(x, t, 200, 800); S.so.x = 300 + shiver(t) },
      meantDraw(x, t, S) { if (!S.under) jacketProp(x, 760, 1420, { s: 0.9 * S.mk, rot: 0.1 }) } },
    { said: 'I’ll text you whenever.', meant: 'I’ll text you in *four minutes.*', saidMood: 'neutral', saidLook: [1, 0],
      meantDraw(x, t, S) { if (!S.under) phoneProp(x, 760, 1430, { s: S.mk, rot: 0.08, lines: ['hi', 'hi!!'], head: '0:04 LEFT' }) } },
    { said: 'I like you. A lot.', meant: 'I like you. *A lot.*', saidMood: 'happy', meantMood: 'happy' },
  ],
  last: 'Say the meant part *first.*',
  pisCard: 'SAID IT!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
