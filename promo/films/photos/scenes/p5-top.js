// photos · P5 top layer (0–15): the ONE film-grain layer (≈0.22, film 1) over every scene, and the moon-phase badge
// top-left on #fx (new moon over the hook → crescent → quarter → FULL at the face reveal 9.0; gone by 10.1).
import { el, prog } from '../../../src/lib.js'
import { W, H, grainLayer, drawBadge } from './kit.js'

export default async function build(stage) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', pointerEvents: 'none' }, stage)
  const grain = grainLayer(root, 0.22)
  return {
    start: 0, end: 15.01, root,
    update(t) { grain.update(t); grain.el.style.opacity = String(0.22 * (1 - prog(t, 14.5, 14.85))) },   // grain leaves with the fade: the last frames are pure black
    fx(ctx, t) { drawBadge(ctx, t) },
  }
}
