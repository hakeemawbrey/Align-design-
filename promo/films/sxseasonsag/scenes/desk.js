// SEASONAL SKY: the forecast-desk kit (Star Talk Shows, show 8). The same look in all three episodes
// (sxseasonscorpio, sxseasonsag, sxseasoncap each carry an identical copy of this file).
//
//   buildBug(root, { at, dot })            the show bug, top-left 56 px: a pixel dot + "SEASONAL SKY" (Inter 800 small caps)
//   buildTicker(root, { text, at, out, accent })   the forecast crawl under the dialogue box (y 1722–1782)
//   drawWheel(x, t, { cx, cy, r, rot, hi, hiK, alpha, tint })   the big zodiac wheel (rotating; glyphs stay upright)
//   rotFor(signId)                         the wheel rotation that puts that sign's wedge at 12 o'clock
//   drawMarker(x, t, cx, top, color, k)    the gold pixel pointer above the wheel (the "you are here" of the season)
//   drawDesk(x, { x0, x1, y, h, tint, accent }) the anchor desk (front panel + "SEASONAL SKY · LOVE FORECAST" plate)
//   drawPointer(x, x0, y0, x1, y1, k)      the forecaster's pointer stick (a pixel line with a gold tip)
//   board(x, x0, y0, w, h, { title, k, accent })   a forecast board panel (stepped pixel corners) → inner rect
//   drawBits(x, rows, cols, cx, cy, cell, opts)    tiny pixel bitmaps (1-cell ink outline)
//   drawPisces(x, t, { x, y, size, cry, mood, pop, look, hops, color })   the background Pisces, crying (the running gag)
//   tintRect / tintCircle(x, color, k, …)  the "everything goes <colour>" wash (canvas 'color' blend: keeps light, swaps hue)
import { clamp, lerp, prog, ease, el, hexToRgb } from '../../../src/lib.js'
import { SIGNS, easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { starFrame, inSprite, tearsCells } from '../../stlive5th/scenes/props.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const TAU = Math.PI * 2

const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], clamp(k)))) }
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

// ── the show bug
export function buildBug(root, { at = 0.2, dot = '#ff8fb1' } = {}) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', display: 'flex', alignItems: 'center', gap: '14px', opacity: 0, transformOrigin: '0 50%' }, root)
  const d = el('div', { width: '16px', height: '16px', background: dot, boxShadow: `0 0 14px ${dot}`, imageRendering: 'pixelated' }, box)
  el('div', { fontFamily: INTER, fontWeight: 800, fontSize: '30px', letterSpacing: '0.24em', fontVariant: 'small-caps', color: BONE, textShadow: '0 2px 10px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'seasonal sky')
  return {
    update(t, out = 1) {
      const p = easeOutBack(prog(t, at, at + 0.35), 2.2)
      box.style.opacity = String(clamp(p * 2) * out)
      box.style.transform = `scale(${(0.7 + 0.3 * p).toFixed(3)})`
      d.style.opacity = String(0.55 + 0.45 * Math.max(0, Math.sin(t * 3.4)))
    },
  }
}

// ── the forecast crawl (DOM, clipped to the frame's inner edge)
export function buildTicker(root, { text, at = 0.6, out = [25.0, 25.4], accent = GOLD, speed = 120 }) {
  const wrap = el('div', { position: 'absolute', left: '84px', width: '912px', top: '1722px', height: '60px', overflow: 'hidden', opacity: 0 }, root)
  el('div', { position: 'absolute', inset: 0, background: 'rgba(14,8,34,0.86)', borderTop: `3px solid ${accent}`, borderBottom: '3px solid rgba(239,230,214,0.25)' }, wrap)
  const tag = el('div', { position: 'absolute', left: 0, top: 0, bottom: 0, padding: '0 18px', display: 'flex', alignItems: 'center', background: accent, color: INK,
    font: `700 26px ${MONO}`, letterSpacing: '0.1em', zIndex: 2 }, wrap, 'FORECAST')
  const strip = el('div', { position: 'absolute', left: 0, top: '11px', whiteSpace: 'nowrap', font: `700 30px ${MONO}`, color: BONE, letterSpacing: '0.04em' }, wrap)
  strip.textContent = (text + '   ·   ').repeat(4)
  void tag
  return {
    update(t) {
      const k = clamp((t - at) / 0.3) * (1 - prog(t, out[0], out[1]))
      wrap.style.display = k <= 0 ? 'none' : 'block'
      if (k <= 0) return
      wrap.style.opacity = String(k)
      strip.style.transform = `translateX(${(220 - (t - at) * speed).toFixed(1)}px)`
    },
  }
}

// ── the wheel
export const rotFor = id => { const i = SIGNS.findIndex(s => s.id === id); return -Math.PI / 2 - (Math.PI - (i * 30 + 15) * Math.PI / 180) }
export function drawWheel(x, t, { cx, cy, r, rot = 0, hi = -1, hiK = 0, alpha = 1, tint = null, tintK = 0 }) {
  if (alpha <= 0) return
  const rIn = r * 0.79, rG = r * 0.895
  x.save(); x.globalAlpha = alpha
  // a soft disc behind (the "map")
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r * 1.08)
  g.addColorStop(0, 'rgba(40,24,90,0.55)'); g.addColorStop(0.8, 'rgba(24,14,60,0.45)'); g.addColorStop(1, 'rgba(24,14,60,0)')
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r * 1.08, 0, TAU); x.fill()
  SIGNS.forEach((s, i) => {
    const a0 = Math.PI - (i * 30) * Math.PI / 180 + rot, a1 = Math.PI - (i * 30 + 30) * Math.PI / 180 + rot
    const on = i === hi ? hiK : 0
    x.globalAlpha = alpha * (0.18 + 0.5 * on)
    x.fillStyle = tint && tintK > 0 ? mixHex(s.color, tint, tintK) : s.color
    x.beginPath(); x.arc(cx, cy, r, a1, a0); x.arc(cx, cy, rIn, a0, a1, true); x.closePath(); x.fill()
  })
  // inner face: twelve faint spokes + rings
  x.globalAlpha = alpha * 0.9
  x.strokeStyle = BONE; x.lineWidth = 4
  x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.stroke()
  x.lineWidth = 3
  x.beginPath(); x.arc(cx, cy, rIn, 0, TAU); x.stroke()
  for (let i = 0; i < 12; i++) {
    const a = Math.PI - (i * 30) * Math.PI / 180 + rot
    x.beginPath(); x.moveTo(cx + Math.cos(a) * rIn, cy + Math.sin(a) * rIn); x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); x.stroke()
  }
  x.globalAlpha = alpha * 0.22; x.lineWidth = 2
  for (let i = 0; i < 12; i++) {
    const a = Math.PI - (i * 30) * Math.PI / 180 + rot
    x.beginPath(); x.moveTo(cx + Math.cos(a) * r * 0.16, cy + Math.sin(a) * r * 0.16); x.lineTo(cx + Math.cos(a) * rIn, cy + Math.sin(a) * rIn); x.stroke()
  }
  x.beginPath(); x.arc(cx, cy, r * 0.42, 0, TAU); x.stroke()
  x.globalAlpha = alpha * 0.85; x.fillStyle = GOLD; x.fillRect(cx - 6, cy - 6, 12, 12)
  // glyphs, upright
  x.font = `bold ${Math.round(r * 0.17)}px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  SIGNS.forEach((s, i) => {
    const a = Math.PI - (i * 30 + 15) * Math.PI / 180 + rot
    const on = i === hi ? hiK : 0
    const px = cx + Math.cos(a) * rG, py = cy + Math.sin(a) * rG
    x.globalAlpha = alpha * (0.85 + 0.15 * on)
    const sc = 1 + 0.35 * on
    x.save(); x.translate(px, py); x.scale(sc, sc)
    x.fillStyle = on > 0.5 ? '#fffbea' : (tint && tintK > 0 ? mixHex(s.color, tint, tintK) : s.color)
    x.fillText(s.glyph + '︎', 0, 2)
    x.restore()
  })
  x.restore()
}
export function drawMarker(x, t, cx, top, color = GOLD, k = 1) {
  if (k <= 0) return
  const c = 8, bob = Math.round(Math.sin(t * 4) * 1.5) * 2
  const rows = ['XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
  drawBits(x, rows, { X: color }, cx, top - 26 + bob, c * k)
}

// ── tiny pixel bitmaps
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch] || '#ff00ff'; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// ── stepped pixel rectangles
const step = (x, x0, y0, w, h, P, col) => { x.fillStyle = col; x.fillRect(x0 + 2 * P, y0, w - 4 * P, h); x.fillRect(x0, y0 + 2 * P, w, h - 4 * P); x.fillRect(x0 + P, y0 + P, w - 2 * P, h - 2 * P) }

export function drawDesk(x, { x0 = 84, x1 = 996, y = 1190, h = 150, tint = null, tintK = 0, accent = GOLD } = {}) {
  const P = 8, tc = c => (tint && tintK > 0 ? mixHex(c, tint, tintK) : c)
  step(x, x0 - P, y - P, x1 - x0 + 2 * P, h + 2 * P, P, INK)
  step(x, x0, y, x1 - x0, h, P, tc('#2c1f4e'))
  x.fillStyle = tc(accent); x.fillRect(x0 + P, y, x1 - x0 - 2 * P, P)
  x.fillStyle = '#fff1c8'; x.fillRect(x0 + 3 * P, y, 8 * P, P / 2)
  x.fillStyle = tc('#3d2c68'); x.fillRect(x0 + 2 * P, y + 2 * P, x1 - x0 - 4 * P, P / 2)
  // the name plate
  const pw = 600, ph = 74, px = (x0 + x1) / 2 - pw / 2, py = y + h / 2 - ph / 2 + 6
  step(x, px - 4, py - 4, pw + 8, ph + 8, 6, INK)
  step(x, px, py, pw, ph, 6, tc('#1a1036'))
  x.fillStyle = tc(accent); x.fillRect(px + 12, py + 6, pw - 24, 3)
  x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = tc(accent); x.fillText('SEASONAL SKY', (x0 + x1) / 2, py + ph / 2 - 1)
  x.fillStyle = tc('#3d2c68')
  for (const xx of [x0 + 6 * P, x1 - 6 * P]) x.fillRect(xx, y + 3 * P, P / 2, h - 4 * P)
}

export function drawPointer(x, x0, y0, x1, y1, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  const n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0) / 6))
  for (let i = 0; i <= n; i++) {
    const u = i / n, px = Math.round(lerp(x0, x1, u) / 3) * 3, py = Math.round(lerp(y0, y1, u) / 3) * 3
    x.fillStyle = INK; x.fillRect(px - 5, py - 5, 10, 10)
  }
  for (let i = 0; i <= n; i++) {
    const u = i / n, px = Math.round(lerp(x0, x1, u) / 3) * 3, py = Math.round(lerp(y0, y1, u) / 3) * 3
    x.fillStyle = u > 0.92 ? GOLD : '#b88a5a'; x.fillRect(px - 3, py - 3, 6, 6)
  }
  x.fillStyle = '#fff1c8'; x.fillRect(Math.round(x1) - 4, Math.round(y1) - 4, 8, 8)
  x.restore()
}

/** a forecast board: panel + title strip; returns the inner rect */
export function board(x, x0, y0, w, h, { title = 'LOVE FORECAST', k = 1, accent = GOLD, fill = 'rgba(16,9,38,0.94)' } = {}) {
  if (k <= 0) return null
  const P = 8
  x.save(); x.globalAlpha *= clamp(k)
  const cx = x0 + w / 2, cy = y0 + h / 2, s = lerp(0.85, 1, easeOutBack(clamp(k), 2))
  x.translate(cx, cy); x.scale(s, s); x.translate(-cx, -cy)
  x.save(); x.shadowColor = rgba(accent, 0.6); x.shadowBlur = 26; step(x, x0, y0, w, h, P, accent); x.restore()
  step(x, x0, y0, w, h, P, accent)
  step(x, x0 + P, y0 + P, w - 2 * P, h - 2 * P, P, INK)
  step(x, x0 + 2 * P, y0 + 2 * P, w - 4 * P, h - 4 * P, P, fill)
  // title strip
  x.fillStyle = accent; x.fillRect(x0 + 3 * P, y0 + 3 * P, w - 6 * P, 50)
  x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText(title, cx, y0 + 3 * P + 26)
  x.restore()
  return { x0: x0 + 3 * P, y0: y0 + 3 * P + 64, w: w - 6 * P, h: h - 6 * P - 64 }
}

// ── the running gag: Pisces, crying somewhere in the back
const PIS = signStar('pisces')
export function drawPisces(x, t, { x: px, y: py, size = 104, cry = 1, mood = 'sparkle', pop = 1, look = [0, 0], hops = null, color = PIS.color, seed = 12, alpha = 1 }) {
  if (pop <= 0.02 || alpha <= 0) return null
  const r = drawStarChar(x, px, py, size, t, { color, mood, look, pop, hops, seed, glow: 0.8, blink: false, alpha })
  if (cry > 0) {
    const F = starFrame(px, py, size, t, { pop, hops, seed })
    x.save(); x.globalAlpha *= alpha
    inSprite(x, F, () => tearsCells(x, t, cry))
    x.restore()
  }
  return r
}

// ── the colour wash ('color' blend: luminance stays, hue swaps). Apply AFTER drawing the things to tint.
export function tintRect(x, color, k, x0, y0, w, h) {
  if (k <= 0) return
  x.save(); x.globalCompositeOperation = 'color'; x.globalAlpha = clamp(k); x.fillStyle = color; x.fillRect(x0, y0, w, h); x.restore()
}
export function tintCircle(x, color, k, cx, cy, r) {
  if (k <= 0) return
  x.save(); x.globalCompositeOperation = 'color'; x.globalAlpha = clamp(k); x.fillStyle = color; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill(); x.restore()
}

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
