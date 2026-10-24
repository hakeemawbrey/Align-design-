// bios · backdrop: film 1 "space moods" cross-faded per beat (cold grey-teal → rose → amber → teal → end void).
// Each mood is an opaque layer; the next fades in above the last. One grain layer sits above all of them.
import { prog, ease, el, C } from '../../../src/lib.js'
import { spaceBackdrop, makeStars } from '../../../src/scenes/common.js'
import { W, H, fill, FI, GRAIN, grainTiles } from './kit.js'
import { rng } from '../../../src/lib.js'

// [mood, seed, fade-in start, fade-in end] — a layer is hidden once the one above it is fully in
export const MOODS = [
  ['rose', 3, -1, 0],          // the problem: colour drained out (filter below)
  ['rose', 2, 3.42, 3.92],     // "Your sky doesn't."
  ['amber', 6, 5.12, 5.62],    // One sky. Three yous.
  ['teal', 5, 7.52, 8.02],     // Taurus, the user manual.
]
export const END_IN = [9.86, 10.36]

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const layers = MOODS.map(([mood, seed], i) => {
    const b = spaceBackdrop(root, mood, { seed, grain: 0, stars: 160 })
    if (i === 0) b.root.style.filter = 'saturate(0.28) brightness(0.74) contrast(1.06)'
    return b
  })
  // end: deep void with a soft violet nebula behind the lockup (never flat black)
  const end = fill(root, { background: 'linear-gradient(180deg, #0b0620 0%, #120a2c 100%)', opacity: 0 })
  makeStars(end, 150, 77)
  el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(42% 50% at 50% 50%, rgba(154,123,224,0.30), rgba(11,6,32,0) 72%)' }, end)
  el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(30% 30% at 22% 82%, rgba(232,98,138,0.12), rgba(11,6,32,0) 70%), radial-gradient(32% 34% at 80% 18%, rgba(180,92,255,0.12), rgba(11,6,32,0) 70%)' }, end)
  // ONE grain layer above every mood (same tile recipe and 0.22 overlay as film 1), so grain never changes at a cross-fade
  const gr = el('div', { position: 'absolute', left: '-384px', top: '-384px', width: (W + 768) + 'px', height: (H + 768) + 'px', mixBlendMode: 'overlay', opacity: GRAIN, pointerEvents: 'none' }, root)
  const tiles = grainTiles()
  return {
    start: 0, end: 15.01, root,
    update(t) {
      const ops = MOODS.map(([, , a, b]) => ease.inOutQuad(prog(t, a, b)))
      const eo = ease.inOutQuad(prog(t, END_IN[0], END_IN[1]))
      layers.forEach((l, i) => {
        const covered = (i + 1 < ops.length ? ops[i + 1] >= 1 : false) || eo >= 1
        const vis = ops[i] > 0 && !covered
        l.root.style.display = vis ? 'block' : 'none'
        l.root.style.opacity = String(ops[i])
        if (vis) l.update(t)
      })
      end.style.opacity = String(eo)
      end.style.transform = `scale(${1 + 0.02 * prog(t, 10, 15)})`
      const fi = FI(t), rr = rng(fi * 7 + 3)
      gr.style.backgroundImage = `url(${tiles[fi % tiles.length]})`
      gr.style.transform = `translate(${Math.floor(rr() * 384)}px, ${Math.floor(rr() * 384)}px)`
    },
  }
}
