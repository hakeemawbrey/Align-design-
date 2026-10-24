// birthtime · GRAIN (0–15): the film's ONE grain layer, over every scene (LOOK A light grain, opacity 0.22, overlay).
// Overlay on pure black stays black, so the final black frame is untouched.
import { rng, el } from '../../../src/lib.js'
import { W, H } from '../../../src/scenes/common.js'

const GRAIN = 0.22
function tiles() {
  return Array.from({ length: 5 }, (_, k) => {
    const c = document.createElement('canvas'); c.width = c.height = 384
    const g = c.getContext('2d'), d = g.createImageData(384, 384), r = rng(900 + k)
    for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 150; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255 }
    g.putImageData(d, 0, 0)
    return c.toDataURL()
  })
}
export default async function build(stage) {
  const T = tiles()
  const root = el('div', { position: 'absolute', left: '-384px', top: '-384px', width: (W + 768) + 'px', height: (H + 768) + 'px', mixBlendMode: 'overlay', opacity: GRAIN, pointerEvents: 'none' }, stage)
  return {
    start: 0, end: 15.01, root,
    update(t) {
      const fi = Math.round(t * 30), rr = rng(fi * 7 + 3)
      root.style.backgroundImage = `url(${T[fi % T.length]})`
      root.style.transform = `translate(${Math.floor(rr() * 384)}px, ${Math.floor(rr() * 384)}px)`
    },
  }
}
