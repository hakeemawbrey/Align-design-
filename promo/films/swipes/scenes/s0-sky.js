// swipes · S0 · THE SKY (4.15–15.0). The one sky for the rest of the film, under everything: it slides into place during
// the look-up pan (cold + dim → full colour), dims a touch under the deck, comes back for the end. Twinkles at the edges.
import { prog, ease, lerp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { sky, twinkles, layerCanvas, PAN, panK } from './kit.js'

export const skyDim = t => 1 - 0.2 * ease.inOutQuad(prog(t, 6.1, 6.9)) + 0.2 * ease.inOutQuad(prog(t, 10.5, 11.2))

export default function build(stage) {
  const root = fill(stage, { background: '#0b0620' })
  const c = layerCanvas(root), bx = c.getContext('2d')
  return {
    start: PAN.a - 0.05, end: 15.01, root,
    update(t) {
      const p = panK(t)
      // cold and dim while it's still behind the room; blooms into colour as the camera settles
      const col = ease.inOutQuad(prog(t, PAN.a + 0.3, PAN.b + 0.25))
      sky(bx, t, lerp(0.6, 1, col) * skyDim(t))
      c.style.filter = col < 1 ? `saturate(${lerp(0.12, 1, col).toFixed(3)}) brightness(${lerp(0.75, 1, col).toFixed(3)})` : 'none'
      if (p > 0.6) twinkles(bx, t)
    },
  }
}
