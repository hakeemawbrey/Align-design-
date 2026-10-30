// srp1mystery kit: small pixel helpers for this film (local copy; no shared module is edited). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const W = 1080
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#7fe0b0', SKYB = '#7fdcff'
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const BEAT = n => 0.6 + n * 0.5556            // the 108 bpm grid

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.' || !cols[ch]) continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

/** a ring burst of little pixel stars from (cx, cy), 0.7 s long from t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

export const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
/** little pixel hearts floating up from (cx, cy) between t0 and t1 */
export function floatHearts(x, t, cx, cy, t0, t1, seed, cell = 7, spread = 260) {
  for (let i = 0; i < 7; i++) {
    const born = t0 + i * 0.17, life = 1.1
    if (t < born || born > t1) continue
    const p = (t - born) / life
    if (p >= 1) continue
    const side = ((i * 37 + seed) % 7) / 6 - 0.5
    const hx = cx + side * spread + Math.sin(p * 7 + i) * 18, hy = cy - 60 - p * 260
    drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
  }
}

const TEAR = ['.B.', 'BBB', 'BWB', '.B.']
/** Pisces-style crying: drops spray left and right of (cx, cy) while t in [t0, t1] */
export function tears(x, t, cx, cy, t0, t1, cell = 5, spread = 40) {
  if (t < t0 || t > t1 + 0.6) return
  for (let i = 0; i < 8; i++) {
    const born = t0 + i * 0.13
    if (t < born || born > t1) continue
    const p = (t - born) / 0.6
    if (p >= 1) continue
    const side = i % 2 ? 1 : -1
    drawBits(x, TEAR, { B: '#6fc3ff', W: '#e6f6ff' }, cx + side * (spread + p * 60), cy - 10 - 70 * p + 160 * p * p, cell, { alpha: 1 - p * 0.6 })
  }
}

/** a stepped-corner pixel tag with mono text (canvas) */
export function pixelTag(x, cx, cy, text, { size = 26, fg = BONE, bg = 'rgba(16,9,38,0.92)', border = GOLD, alpha = 1, rot = 0, pad = 18 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `700 ${size}px ${MONO}`
  const w = Math.ceil(x.measureText(text).width) + pad * 2, h = Math.round(size * 1.7), P = 5
  const L = -w / 2, T = -h / 2
  x.fillStyle = border
  x.fillRect(L + P, T - P, w - 2 * P, P); x.fillRect(L + P, T + h, w - 2 * P, P); x.fillRect(L - P + P, T, -P, h); x.fillRect(L + w, T, P, h)
  x.fillRect(L, T, P, P); x.fillRect(L + w - P, T, P, P); x.fillRect(L, T + h - P, P, P); x.fillRect(L + w - P, T + h - P, P, P)
  x.fillStyle = bg; x.fillRect(L + P, T, w - 2 * P, h); x.fillRect(L, T + P, w, h - 2 * P)
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
  return w
}

/** a big rubber stamp (canvas): slams in at t0 with a scale overshoot */
export function stamp(x, t, t0, cx, cy, text, { color = '#ff5a6e', size = 64, rot = -0.14, alpha = 1 } = {}) {
  const p = prog(t, t0, t0 + 0.18)
  if (p <= 0) return
  const s = lerp(2.2, 1, ease.outCubic(p)) * (1 + 0.06 * Math.exp(-(t - t0 - 0.18) * 14) * (t > t0 + 0.18 ? 1 : 0))
  x.save(); x.globalAlpha *= clamp(p * 2) * alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.font = `800 ${size}px Inter, Arial, sans-serif`
  const w = x.measureText(text).width + 50, h = size * 1.45
  x.strokeStyle = color; x.lineWidth = 9; x.strokeRect(-w / 2, -h / 2, w, h)
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}

/** loads an image; resolves null on failure */
export const loadImg = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src })

/** draw a card image centred on (cx, cy) at width w, with a soft glow and a rounded clip */
export function drawCard(x, im, cx, cy, w, { rot = 0, alpha = 1, glow = 0.6, glowCol = '255,190,240', crop = null, sx = 1 } = {}) {
  if (!im || alpha <= 0.01) return
  const c = crop || { x: 0, y: 0, w: im.width, h: im.height }
  const h = w * c.h / c.w, r = w * 0.055
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  if (glow > 0) { x.shadowColor = `rgba(${glowCol},${0.7 * glow})`; x.shadowBlur = 50 * glow }
  x.fillStyle = '#1a1036'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, r); x.fill()
  x.shadowColor = 'transparent'
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, r); x.clip()
  x.drawImage(im, c.x, c.y, c.w, c.h, -w / 2, -h / 2, w, h)
  x.restore()
}
// the opaque bodies of the card PNGs (their glow margins cropped off)
export const CROP_PROFILE = { x: 120, y: 114, w: 1254, h: 2002 }
export const CROP_BACK = { x: 119, y: 119, w: 1320, h: 2107 }

/** a hop/squash state matching startalk's maths (for placing props on a hopping star) */
export function hopLift(t, hops) {
  if (!hops || !hops.length) return 0
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt < 0.05 || dt > 0.31) return 0
  return Math.sin(Math.PI * (dt - 0.05) / 0.26)
}
