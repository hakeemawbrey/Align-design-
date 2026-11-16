// og-nt2e35: OG social cut of nt2e35 (same split screen, Aquarius, star map and story). Static HOOK (outline) 0–3.0 replaces the
// kit's animated headline (hook beat 1 s longer); no series bug / flashes; crazier Aquarius; ends on the finale.
// Kits: ./saidkit.js + ./trendkit.js (social copies).
// nt2e35 · WHAT THEY SAID vs WHAT THEY MEANT · "Aquarius Is Not a Romance Person" (18 s vertical, Trends Vol. 2 ep 35,
// music: lofi · Em). The format lives in ../../nt2e31/scenes/saidkit.js (eps 31–35) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "What an Aquarius *says* | vs what they *mean.*" ♒ mid-shrug.
//   2.1   SAID "I'm not really a romance person." / MEANT "I drew you a *star map* by hand." (it draws itself)
//   5.1   SAID "cool." / MEANT "best night of my *whole year.*" (MY YEAR, a gold star on one night)
//   8.1   flash cut. SAID = MEANT "I *missed* you today." → ✓ SAME
//   11.4  Aquarius + ♊ Gemini.  12.0 THE STARS: "Let the *warm* part show."  Pisces: WARM!, fountaining.
import { makeSaid } from './saidkit.js'
import { starMapProp, paperProp, goldStarSticker, label, prog, BONE, INTER } from './trendkit.js'

const EP = makeSaid({
  id: 'og-nt2e35', sign: 'aquarius', date: 'gemini', deep: '#1a7a9a', accent: '#38c4ec',
  hookMood: 'neutral',
  hookDraw(x, t, S) { if (!S.under) label(x, '*shrug*', S.o.x, S.o.y - 230, { size: 52, col: BONE, font: INTER, weight: 800, rot: -0.06 }); S.o.squash = 0.06 * Math.max(0, Math.sin(t * 5)) },
  pairs: [
    { said: 'I’m not really a romance person.', saidSize: 30, meant: 'I hand-drew you a *star map.* To scale.', saidMood: 'neutral', saidLook: [1, 0],
      meantDraw(x, t, S) { if (!S.under) starMapProp(x, 770, 1430, { s: S.mk, rot: 0.06, k: prog(S.u, 1.3, 2.3) }) } },
    { said: 'cool.', meant: 'best night of my *whole decade.*', saidMood: 'neutral', meantMood: 'heart',
      meantDraw(x, t, S) { if (!S.under) { x.save(); x.translate(770, 1430); x.scale(S.mk, S.mk); paperProp(x, 0, 0, 220, 190, { rot: 0.06, title: 'MY DECADE', lines: 5 }); goldStarSticker(x, 60, 30, 0.9, 0.2); x.restore() } } },
    { said: 'I missed you today.', meant: 'I *missed* you today.', saidMood: 'happy', meantMood: 'happy' },
  ],
  last: 'Let the *warm* part show.',
  pisCard: 'WARM!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const HOOK = 'Aquarius is “not a | *romance person.*”'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
