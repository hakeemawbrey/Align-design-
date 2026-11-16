// srcityatlanta props: line-art trees (bold glowing outline over flat fills, no brands), fireflies, a falling card.
// Pure functions of their args; no document access at module top level.
import { clamp, lerp, rng } from '../../../src/lib.js'
import { rgba, ink } from '../../citymiami/scenes/props.js'

const TAU = Math.PI * 2
export const LEAF = ['#2fc79a', '#3fd08a', '#1fa88a', '#5ad6a0', '#2ab7a8']

/** one tree: trunk from (cx, base) up, a lumpy canopy of overlapping circles. k 0..1 grows it up from the base.
 *  dim 0..1 darkens it (for the back row / when the deck falls). */
export function tree(x, t, { cx, base, h = 700, r = 210, col = LEAF[0], k = 1, dim = 0, seed = 1, sway = 1 } = {}) {
  if (k <= 0.01) return
  const R = rng(seed)
  const lumps = Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + (i - 2.5) * 0.55 + (R() - 0.5) * 0.3
    return [Math.cos(a) * r * 0.62, Math.sin(a) * r * 0.42 + r * 0.1, r * (0.5 + 0.18 * R())]
  })
  x.save(); x.translate(cx, base); x.scale(k, k)
  const sw = Math.sin(t * 0.9 + seed) * 0.02 * sway
  // trunk
  x.beginPath(); x.moveTo(-r * 0.12, 0); x.lineTo(-r * 0.08, -h + r * 0.4); x.lineTo(r * 0.08, -h + r * 0.4); x.lineTo(r * 0.12, 0); x.closePath()
  x.fillStyle = '#3a2418'; x.fill(); ink(x, '#a8774a', { w: 6, fa: 0, glow: 8 })
  // canopy
  x.translate(0, -h); x.rotate(sw)
  const path = () => { x.beginPath(); for (const [lx, ly, lr] of lumps) { x.moveTo(lx + lr, ly); x.arc(lx, ly, lr, 0, TAU) } }
  x.save(); path(); x.strokeStyle = rgba(col, 0.95); x.lineWidth = 16; x.shadowColor = col; x.shadowBlur = 24; x.stroke(); x.restore()
  path(); x.fillStyle = '#123a34'; x.fill()
  x.save(); path(); x.clip()
  const g = x.createLinearGradient(0, -r, 0, r); g.addColorStop(0, rgba(col, 0.55)); g.addColorStop(1, rgba(col, 0.12)); x.fillStyle = g; x.fillRect(-r * 1.4, -r * 1.2, r * 2.8, r * 2.4)
  // leaf dashes
  x.strokeStyle = rgba('#d8ffe8', 0.25); x.lineWidth = 5; x.lineCap = 'round'
  for (let i = 0; i < 14; i++) { const px = (R() - 0.5) * r * 1.6, py = (R() - 0.5) * r * 1.0; x.beginPath(); x.moveTo(px, py); x.lineTo(px + 18, py - 10); x.stroke() }
  x.restore()
  if (dim > 0) { path(); x.fillStyle = `rgba(6,4,18,${clamp(dim) * 0.7})`; x.fill() }
  x.restore()
}

/** drifting fireflies across a band of the frame */
export function fireflies(x, t, { n = 26, y0 = 700, y1 = 1500, a = 1, seed = 5 } = {}) {
  if (a <= 0) return
  const R = rng(seed)
  x.save(); x.globalCompositeOperation = 'lighter'
  for (let i = 0; i < n; i++) {
    const bx = R() * 1080, by = lerp(y0, y1, R()), ph = R() * TAU, sp = 0.3 + R() * 0.5
    const px = bx + Math.sin(t * sp + ph) * 60, py = by + Math.cos(t * sp * 0.8 + ph) * 40
    const tw = Math.max(0, Math.sin(t * (1.2 + R()) + ph)) ** 2 * a
    if (tw < 0.03) continue
    const g = x.createRadialGradient(px, py, 1, px, py, 22); g.addColorStop(0, `rgba(230,255,140,${0.9 * tw})`); g.addColorStop(1, 'rgba(230,255,140,0)')
    x.fillStyle = g; x.fillRect(px - 22, py - 22, 44, 44)
    x.fillStyle = `rgba(255,255,210,${tw})`; x.fillRect(px - 3, py - 3, 6, 6)
  }
  x.restore()
}

/** a card image drawn centred at (px, py), width w, rotation rot, horizontal flip scale sx (−1…1) */
export function drawCard(x, im, px, py, w, rot = 0, sx = 1, a = 1) {
  if (!im || a <= 0 || w <= 0) return
  const h = w * im.height / im.width
  x.save(); x.globalAlpha *= a; x.translate(px, py); x.rotate(rot); x.scale(sx, 1)
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 30; x.shadowOffsetY = 12
  x.drawImage(im, -w / 2, -h / 2, w, h)
  x.restore()
}
