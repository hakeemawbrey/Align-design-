// srdummies props (copied from srastro101): planet orbs with pixel eyes, the stopwatch, the teacher's cap + pointer, sparkles, tears, chips.
// Every draw is a pure function of its arguments (t drives idle motion only). Nothing touches `document` at top level.
import { clamp, lerp, prog, ease, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', CYAN = '#8fdcff', MINT = '#7dffb0'
export const MONO = "'Space Mono', ui-monospace, monospace"
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inR = (t, [a, b]) => t >= a && t < b

/** a pixel star with an alpha (sky.js drawPixelStar has kinds 1/2 and no alpha) */
export function pstar(x, cx, cy, size, alpha, color, kind = 1) {
  if (alpha <= 0 || size <= 0) return
  x.save(); x.globalAlpha *= clamp(alpha); drawPixelStar(x, cx, cy, size, kind, color); x.restore()
}

/** soft additive glow disc */
export function glow(x, cx, cy, r, color, a = 1) {
  if (a <= 0 || r <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, rgba(color, 0.45 * a)); g.addColorStop(0.4, rgba(color, 0.14 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
}

/** a planet character: shaded orb + chunky pixel eyes. mood: neutral | happy | wide | squint | angry | sleepy | heart | shades */
export function orbChar(x, cx, cy, r, t, { color = GOLD, mood = 'neutral', look = [0, 0], seed = 1, ring = false, alpha = 1, pop = 1, blink = true, glowK = 1 } = {}) {
  const R = r * pop
  if (R <= 0.5 || alpha <= 0) return { x: cx, y: cy, r: R }
  glow(x, cx, cy, R * 3.2, color, 0.9 * alpha * glowK)
  x.save(); x.globalAlpha *= alpha
  if (ring) { x.strokeStyle = rgba('#efe0b0', 0.85); x.lineWidth = Math.max(3, R * 0.14); x.beginPath(); x.ellipse(cx, cy, R * 1.75, R * 0.5, -0.32, Math.PI * 0.98, Math.PI * 2.02); x.stroke() }
  const s = x.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.08, cx, cy, R)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.42, color); s.addColorStop(1, rgba(color, 0.9))
  x.fillStyle = s; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill()
  if (ring) { x.strokeStyle = rgba('#efe0b0', 0.95); x.lineWidth = Math.max(3, R * 0.14); x.beginPath(); x.ellipse(cx, cy, R * 1.75, R * 0.5, -0.32, Math.PI * 0.02, Math.PI * 0.98); x.stroke() }
  // eyes
  const c = Math.max(2, Math.round(R / 7)), ex = Math.round(R * 0.36), ey = Math.round(cy - R * 0.08)
  const ph = (t * 0.31 + seed * 0.37) % 1, shut = blink && ph > 0.955
  for (const sgn of [-1, 1]) {
    const qx = Math.round(cx + sgn * ex)
    x.fillStyle = INK
    if (mood === 'shades') {
      x.fillRect(qx - c * 2.2, ey - c * 1.4, c * 4.4, c * 2.6); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(qx - c * 1.6, ey - c, c, c * 0.8)
      if (sgn < 0) { x.fillStyle = INK; x.fillRect(qx + c * 2.2, ey - c * 0.8, ex * 2 - c * 4.4, c * 0.8) }
      continue
    }
    if (shut || mood === 'sleepy') { x.fillRect(qx - c * 1.5, ey, c * 3, c); continue }
    if (mood === 'happy') { x.fillRect(qx - c * 1.5, ey, c, c); x.fillRect(qx - c * 0.5, ey - c, c, c); x.fillRect(qx + c * 0.5, ey, c, c); continue }
    if (mood === 'heart') {
      x.fillStyle = '#ff3d77'; const b = 1 + 0.15 * Math.sin(t * 12)
      const hc = c * 0.8 * b
      ;[[-1, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [0, 2]].forEach(([i, j]) => x.fillRect(qx + (i - 0.5) * hc, ey + (j - 1) * hc, hc, hc))
      continue
    }
    if (mood === 'squint' || mood === 'angry') {
      x.fillRect(qx - c * 1.5, ey, c * 3, c)
      if (mood === 'angry') { x.fillRect(qx - c * 1.5 * sgn - c * 0.5, ey - c * 2.2, c, c); x.fillRect(qx - c * 0.5 * sgn - c * 0.5, ey - c * 1.6, c, c); x.fillRect(qx + c * 0.5 * sgn - c * 0.5, ey - c * 1.0, c, c) }
      continue
    }
    const big = mood === 'wide' ? 1.35 : 1
    x.fillStyle = '#ffffff'; x.fillRect(qx - c * 1.5 * big, ey - c * 1.5 * big, c * 3 * big, c * 3 * big)
    x.fillStyle = INK; x.fillRect(qx - c * 0.75 + look[0] * c * 0.7, ey - c * 0.75 + look[1] * c * 0.7, c * 1.5, c * 1.5)
  }
  x.restore()
  return { x: cx, y: cy, r: R }
}

/** the stopwatch (top-left): secs left as m:ss, a sweeping hand, a crown button that dips when pressed */
export function stopwatch(x, cx, cy, r, t, secs, { alpha = 1, press = 0, flash = 0, color = GOLD, below = false } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  glow(x, cx, cy, r * 2.2, color, 0.5 + flash)
  x.fillStyle = INK; x.fillRect(cx - r * 0.18, cy - r * 1.32 + press * r * 0.12, r * 0.36, r * 0.26)
  x.fillStyle = color; x.fillRect(cx - r * 0.12, cy - r * 1.28 + press * r * 0.12, r * 0.24, r * 0.2)
  x.fillStyle = 'rgba(16,9,38,0.94)'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.strokeStyle = color; x.lineWidth = r * 0.12; x.stroke()
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; x.fillStyle = rgba(BONE, 0.7); x.fillRect(cx + Math.cos(a) * r * 0.78 - 2, cy + Math.sin(a) * r * 0.78 - 2, 4, 4) }
  const a = -Math.PI / 2 + ((60 - secs) / 60) * Math.PI * 2
  x.strokeStyle = PINK; x.lineWidth = 4; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r * 0.7, cy + Math.sin(a) * r * 0.7); x.stroke()
  const s = Math.max(0, Math.ceil(secs)), txt = `0:${String(s).padStart(2, '0')}`
  const fs = below ? Math.round(r * 0.5) : Math.round(r * 0.62)
  x.font = `700 ${fs}px ${MONO}`; x.textAlign = below ? 'center' : 'left'; x.textBaseline = 'middle'
  const tx = below ? cx : cx + r * 1.25, ty = below ? cy + r * 1.42 : cy
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(txt, tx + 3, ty + 4)
  x.fillStyle = flash > 0.05 ? GOLD : BONE; x.fillText(txt, tx, ty)
  x.restore()
}

/** a pixel mortarboard sitting on a star's top tip */
export function gradCap(x, cx, topY, cell, t, { alpha = 1, tilt = -0.12 } = {}) {
  if (alpha <= 0) return
  const c = Math.max(2, cell)
  x.save(); x.globalAlpha *= alpha; x.translate(Math.round(cx), Math.round(topY)); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-c * 8, -c * 3, c * 16, c * 2.4); x.fillRect(-c * 4, -c * 1, c * 8, c * 3)
  x.fillStyle = '#3a2a6a'; x.fillRect(-c * 7.4, -c * 2.6, c * 14.8, c * 1.2)
  const sw = Math.sin(t * 3) * c * 0.6
  x.fillStyle = GOLD; x.fillRect(c * 5, -c * 2, c * 0.8, c * 4); x.fillRect(c * 4.6 + sw, c * 2, c * 1.6, c * 1.6)
  x.fillRect(-c * 0.6, -c * 2.6, c * 1.2, c * 1.2)
  x.restore()
}

/** a pointer stick from (x0, y0) to (x1, y1) with a glowing gold tip */
export function pointer(x, x0, y0, x1, y1, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.lineCap = 'round'
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke()
  x.strokeStyle = '#b07a3a'; x.lineWidth = 8; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke()
  x.restore()
  glow(x, x1, y1, 46, GOLD, alpha)
  pstar(x, x1, y1, 22, alpha, GOLD)
}

/** a burst of pixel sparkles flying out from (cx, cy) at t0 */
export function sparkBurst(x, t, cx, cy, t0, { n = 12, R = 200, size = 24, seed = 1, cols = [GOLD, BONE, PINK, LAV], life = 0.8 } = {}) {
  const p = prog(t, t0, t0 + life)
  if (p <= 0 || p >= 1) return
  const r = rng(seed)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.5, d = R * (0.5 + 0.5 * r()) * ease.outCubic(p)
    pstar(x, cx + Math.cos(a) * d, cy + Math.sin(a) * d, size * (1 - p * 0.6), (1 - p) * 0.95, cols[i % cols.length])
  }
}

/** pixel tears falling from two eyes around (cx, ey) */
export function tears(x, t, cx, ey, dx, { amount = 1, cell = 6, seed = 1, color = '#8fdcff' } = {}) {
  if (amount <= 0) return
  x.save(); x.fillStyle = color
  for (const s of [-1, 1]) for (let k = 0; k < 4; k++) {
    const ph = ((t * 1.3 + k / 4 + seed * 0.21 + (s > 0 ? 0.12 : 0)) % 1)
    x.globalAlpha = amount * (1 - ph)
    x.fillRect(Math.round(cx + s * (dx + ph * 18)), Math.round(ey + ph * 90), cell, cell * 1.4)
  }
  x.restore()
}

/** a sweat drop */
export function sweat(x, t, cx, cy, cell = 6) {
  const d = (t * 1.6) % 1
  x.save(); x.globalAlpha = 1 - d * 0.6; x.fillStyle = '#9fe0ff'
  const y = cy + d * 30
  x.fillRect(cx, y, cell, cell); x.fillRect(cx - cell, y + cell, cell * 3, cell * 2); x.fillRect(cx, y + cell * 3, cell, cell)
  x.restore()
}

/** a rounded pixel chip with Space Mono text; returns its width */
export function chip(x, text, cx, cy, { size = 34, fg = BONE, bg = 'rgba(14,8,32,0.92)', border = GOLD, k = 1, alpha = 1, align = 'center' } = {}) {
  if (k <= 0 || alpha <= 0) return 0
  x.save(); x.globalAlpha *= alpha
  x.font = `700 ${size}px ${MONO}`
  const w = Math.round(x.measureText(text).width + size * 1.2), h = Math.round(size * 1.6), P = Math.max(3, Math.round(size / 8))
  const ox = align === 'left' ? cx + w / 2 : cx
  x.translate(Math.round(ox), Math.round(cy)); x.scale(k, k)
  x.fillStyle = border; x.fillRect(-w / 2 - P, -h / 2, w + 2 * P, h); x.fillRect(-w / 2, -h / 2 - P, w, h + 2 * P)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
  return w
}

/** a few pixel hearts floating up from (cx, cy) after t0 */
export function hearts(x, t, cx, cy, t0, { n = 4, px = 6, spread = 100, life = 1.4, seed = 3 } = {}) {
  const r = rng(seed)
  const H = ['.X.X.', 'XXXXX', 'XXXXX', '.XXX.', '..X..']
  for (let i = 0; i < n; i++) {
    const st = t0 + i * 0.18, p = prog(t, st, st + life)
    if (p <= 0 || p >= 1) continue
    const hx = cx + (r() - 0.5) * spread + Math.sin(p * 6 + i) * 10, hy = cy - p * 160
    x.save(); x.globalAlpha = Math.sin(Math.PI * p); x.fillStyle = '#ff5d8f'
    H.forEach((row, j) => [...row].forEach((ch, k) => { if (ch === 'X') x.fillRect(Math.round(hx + (k - 2.5) * px), Math.round(hy + (j - 2.5) * px), px, px) }))
    x.restore()
  }
}

/** steam puffs (anger) above (cx, cy) */
export function steam(x, t, cx, cy, { amount = 1, px = 7 } = {}) {
  if (amount <= 0) return
  for (let i = 0; i < 4; i++) {
    const ph = (t * 1.4 + i / 4) % 1, s = (i % 2 ? 1 : -1)
    x.save(); x.globalAlpha = amount * Math.sin(Math.PI * ph) * 0.85; x.fillStyle = '#f4ece0'
    const qx = cx + s * (20 + ph * 30), qy = cy - ph * 70, w = px * (2 + ph * 3)
    x.fillRect(Math.round(qx - w / 2), Math.round(qy - w / 2), Math.round(w), Math.round(w))
    x.restore()
  }
}

/** a little pixel phone (Mercury's prop) */
export function phone(x, cx, cy, h, t, { alpha = 1, buzz = 0 } = {}) {
  if (alpha <= 0) return
  const w = h * 0.56, jx = buzz ? Math.sin(t * 60) * 3 * buzz : 0
  x.save(); x.globalAlpha *= alpha; x.translate(cx + jx, cy)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = '#2b2150'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#8fdcff'; x.fillRect(-w / 2 + 5, -h / 2 + 8, w - 10, h - 22)
  x.fillStyle = BONE; for (let i = 0; i < 3; i++) x.fillRect(-w / 2 + 9, -h / 2 + 16 + i * h * 0.2, (w - 18) * (i === 1 ? 0.6 : 0.85), h * 0.08)
  x.restore()
}

/** a pixel gold picture frame around a rect */
export function frame(x, cx, cy, w, h, { k = 1, alpha = 1 } = {}) {
  if (k <= 0 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(k, k)
  const b = 30
  x.fillStyle = INK; x.fillRect(-w / 2 - b - 6, -h / 2 - b - 6, w + 2 * b + 12, b + 6); x.fillRect(-w / 2 - b - 6, h / 2, w + 2 * b + 12, b + 6)
  x.fillRect(-w / 2 - b - 6, -h / 2 - b, b + 6, h + 2 * b); x.fillRect(w / 2, -h / 2 - b, b + 6, h + 2 * b)
  x.fillStyle = '#c99a3a'; x.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, b); x.fillRect(-w / 2 - b, h / 2, w + 2 * b, b)
  x.fillRect(-w / 2 - b, -h / 2, b, h); x.fillRect(w / 2, -h / 2, b, h)
  x.fillStyle = GOLD; x.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, 8); x.fillRect(-w / 2 - b, -h / 2 - b, 8, h + 2 * b)
  x.fillStyle = '#fff1c0'; for (const [u, v] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) x.fillRect(u * (w / 2 + b / 2) - 8, v * (h / 2 + b / 2) - 8, 16, 16)
  x.restore()
}
