// swipes · grain: ONE film-series grain layer (sky.js drawGrain, overlay 0.5) over every scene for all 15s, so the
// grain never steps between the room, the sky and the end. (Overlay on pure black stays black: the last frame is black.)
import { el } from '../../../src/lib.js'
import { W, H } from '../../../src/scenes/common.js'
import { drawGrain, GRAIN_OPACITY } from '../../sky.js'

export default function build(stage) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none', mixBlendMode: 'overlay', opacity: String(GRAIN_OPACITY) }, stage)
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  c.width = W; c.height = H
  const gx = c.getContext('2d')
  return { start: 0, end: 15.01, root, update(t) { drawGrain(gx, t) } }
}
