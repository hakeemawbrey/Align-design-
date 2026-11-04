// nt2e33 · WHAT THEY SAID vs WHAT THEY MEANT · "Pisces Is Not Crying" (20 s vertical, Trends Vol. 2 ep 33, music: lofi · Cm).
// The format lives in ../../nt2e31/scenes/saidkit.js (eps 31–35) on ../../nt2e21/scenes/trendkit.js.
// Pisces leads this one, so the background Pisces sits out: the hero cries in every shot instead.
//   0.0   hook: "What a Pisces *says* | vs what they *mean.*" ♓ dabbing its eyes with a tissue.
//   2.1   SAID "I'm not crying." (tears anyway) / MEANT "I am. It's a *nice song.*" (fountains, music notes)
//   5.1   SAID "I'm okay with whatever." / MEANT "I've imagined our *whole winter.*" (blanket, two mugs)
//   8.1   card cut. SAID = MEANT "I need a minute, *then a hug.*" → ✓ SAME
//   11.4  Pisces + ♋ Cancer, happy tears.  12.0 THE STARS: "Soft hearts can *speak up.*"
import { makeSaid } from '../../nt2e31/scenes/saidkit.js'
import { starFrame, inSprite, tearsCells, tissues, label, blanketProp, mugProp, GOLD, INTER } from '../../nt2e21/scenes/trendkit.js'

const cry = (x, t, o, k) => inSprite(x, starFrame(o.x, o.y, o.s, t, { hops: o.hops, seed: 3, pop: o.pop ?? 1 }), () => tearsCells(x, t, k))
const EP = makeSaid({
  id: 'nt2e33', sign: 'pisces', date: 'cancer', deep: '#4a3ab0', accent: '#a9a2ff', corner: false, finPis: false,
  hookMood: 'sparkle',
  hookDraw(x, t, S) { if (!S.under) { cry(x, t, S.o, 2); tissues(x, S.o.x + 210, S.o.y + 80, 110) } },
  pairs: [
    { said: 'I’m not crying.', meant: 'I am. It’s a *nice song.*', saidMood: 'neutral', meantMood: 'sparkle',
      saidDraw(x, t, S) { if (!S.under) cry(x, t, S.so, 1) },
      meantDraw(x, t, S) {
        if (S.under) return
        cry(x, t, S.mo, 3)
        for (let i = 0; i < 4; i++) { const ph = (t * 0.6 + i / 4) % 1; label(x, i % 2 ? '♪' : '♫', 640 + i * 90, 1450 - ph * 160, { size: 52, col: GOLD, alpha: S.mk * (1 - ph), font: INTER, weight: 800 }) }
      } },
    { said: 'I’m okay with whatever.', meant: 'I’ve imagined our *whole winter.*', saidMood: 'happy', meantMood: 'heart',
      saidDraw(x, t, S) { if (!S.under) cry(x, t, S.so, 1) },
      meantDraw(x, t, S) {
        if (S.under) return
        cry(x, t, S.mo, 2)
        x.save(); x.translate(780, 1460); x.scale(S.mk, S.mk); blanketProp(x, 0, 40, 260, 90, { col: '#7c74f0' }); mugProp(x, -60, -40, { col: '#ff8fb1', s: 0.7, steam: 1, t }); mugProp(x, 60, -40, { col: '#3fb6f0', s: 0.7, steam: 1, t }); x.restore()
      } },
    { said: 'I need a minute, then a hug.', saidSize: 32, meant: 'I need a minute, *then a hug.*', saidMood: 'sparkle', meantMood: 'sparkle',
      saidDraw(x, t, S) { if (!S.under) cry(x, t, S.so, 2) },
      meantDraw(x, t, S) { if (!S.under) cry(x, t, S.mo, 2) } },
  ],
  finaleDraw(x, t, S) { cry(x, t, { x: 420, y: 1000, s: 280, pop: S.ok, hops: [11.5, 12.0, 13.6] }, 3) },
  last: 'Soft hearts can *speak up.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
