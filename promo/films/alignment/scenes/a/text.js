// alignment · part A — grain overlay and word-by-word captions (copied from promo/films/disposable/scenes/a/common.js).
import { prog, ease, el } from '../../../../src/lib.js'
import { W, H } from '../../../../src/scenes/common.js'
import { drawGrain } from '../../../sky.js'

export const BONE = '#efe6d6'
export const CAP_SHADOW = '0 2px 30px rgba(5,6,10,0.92), 0 0 2px rgba(5,6,10,0.7)'

/** the film-series grain (sky.js drawGrain) on an overlay canvas */
export function grainLayer(parent, opacity = 0.4, z = '4000', blend = 'overlay') {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: blend, opacity, pointerEvents: 'none', zIndex: z }, parent)
  c.width = W; c.height = H
  const gx = c.getContext('2d')
  return { el: c, update(t, op) { if (op != null) c.style.opacity = String(op); drawGrain(gx, t) } }
}

/** words that land one by one (opacity, rise, de-blur); update(t, out) */
export function words(parent, text, style, at, gap = 0.16, dur = 0.55) {
  const box = el('div', { position: 'absolute', whiteSpace: 'nowrap', ...style }, parent)
  const ws = text.split(' ').map((w, i) => ({ t: at + i * gap, e: el('span', { display: 'inline-block', margin: '0 0.12em', opacity: 0 }, box, w) }))
  return {
    box,
    update(t, out = 1) {
      for (const w of ws) {
        const p = prog(t, w.t, w.t + dur), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${(1 - e) * 14}px)`
        w.e.style.filter = p < 1 ? `blur(${((1 - e) * 5).toFixed(2)}px)` : 'none'
      }
    },
  }
}
