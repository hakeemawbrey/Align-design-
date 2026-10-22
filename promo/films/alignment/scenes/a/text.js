// alignment v2 · part A — grain overlay and springy word-by-word headlines.
import { clamp, prog, ease, el } from '../../../../src/lib.js'
import { W, H } from '../../../../src/scenes/common.js'
import { drawGrain } from '../../../sky.js'
import { TYPE, easeOutBack } from '../../../wheel.js'

export const BONE = '#efe6d6'
export const CAP_SHADOW = '0 3px 28px rgba(5,6,10,0.9), 0 0 3px rgba(5,6,10,0.75)'

/** the film-series grain (sky.js drawGrain) on an overlay canvas */
export function grainLayer(parent, opacity = 0.4, z = '4000', blend = 'overlay') {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: blend, opacity, pointerEvents: 'none', zIndex: z }, parent)
  c.width = W; c.height = H
  const gx = c.getContext('2d')
  return { el: c, update(t, op) { if (op != null) c.style.opacity = String(op); drawGrain(gx, t) } }
}

/**
 * A centred headline whose words pop in one by one: each scales 0.6 → ~1.06 → 1 and rises 30 px over 0.28 s, 0.07 s apart.
 * words: [[text, colour?, 'sans'?], …]. A coloured word is the accent (EB Garamond italic 500) unless marked 'sans'.
 * update(t, [in, out0, out1]): words pop out together (shrink + fade) over out0 → out1.
 */
export function popWords(parent, words, style, at, { font = TYPE.head, accentFont = TYPE.accent, line = TYPE.headLine, gap = 0.07, dur = 0.28 } = {}) {
  const box = el('div', { position: 'absolute', textAlign: 'center', font, lineHeight: line, color: BONE, textShadow: CAP_SHADOW, ...style }, parent)
  const ws = words.map(([w, col, kind], i) => {
    const e = el('span', { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 70%', ...(col ? { color: col } : {}), ...(col && kind !== 'sans' ? { font: accentFont, lineHeight: line, letterSpacing: '-0.005em' } : { letterSpacing: '-0.02em' }) }, box, w)
    return { t: at + i * gap, e }
  })
  return {
    box,
    update(t, [, o0, o1]) {
      const on = t >= at - 0.02 && t < o1 + 0.02
      box.style.display = on ? 'block' : 'none'
      if (!on) return
      const out = prog(t, o0, o1), ok = 1 - ease.inQuad(out), os = 1 - 0.25 * ease.inQuad(out)
      for (const w of ws) {
        const p = prog(t, w.t, w.t + dur), s = 0.6 + 0.4 * easeOutBack(p, 2.2)
        w.e.style.opacity = String(clamp(p * 3) * ok)
        w.e.style.transform = p >= 1 && out <= 0 ? 'none' : `translateY(${((1 - ease.outCubic(p)) * 30).toFixed(2)}px) scale(${(s * os).toFixed(4)})`
      }
    },
  }
}
