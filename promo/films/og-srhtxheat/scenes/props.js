// srhtxheat props — drawings for this film only. Pure f(args); nothing touches `document` at load.
//   starFrame / inSprite / tearsCells / sweatCells   (the stlive5th / srhtxhumidity helpers, same maths as startalk.js)
//   sunRays(x, cx, cy, R, t, a)          the sun-star's rotating, beat-pumping rays (drawn behind the star)
//   shadesCells(x, a)                    sunglasses in sprite cells, sitting over the star's eyes
//   drawCar(x, cx, gy, w, sizzle, a)     a parked car, side view (the door handle glows red when hot)
//   drawShimmer(x, x0, x1, y, t, a)      heat-shimmer lines   ·  drawPuddle(x, cx, gy, w, col, a)
//   drawTable(x, cx, top, w, t, melt, a) a café table with a melting candle  ·  drawPhone(x, cx, cy, s, a)
//   drawChat(x, cx, cy, w, h, text, k)   a chat bubble  ·  drawDealCard(x, w, h)  ·  drawStamp(x, text, a)
import { clamp, lerp, hexToRgb } from '../../../src/lib.js'

export const INK = '#1b1236'
export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff4d4a', FIRE = '#ff7a3a', SUN = '#ffc93a', CYAN = '#8fd8f6', GREY = '#9a95b4'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
export const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(k)))).join(',')})` }
const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }

const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)

// ── star transform (mirrors startalk.js drawStarChar)
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}

// ── tears (cells): k 1 sniffle · 2 streams · 3 fountains
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let x, y
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
// sweat drops flying off both temples (cells); k = how many (1–3)
export function sweatCells(ctx, t, k = 1) {
  const one = (ph, x0, d) => {
    const i = x0 + d * 4 * ph, j = 11 + 8 * ph * ph - 3 * ph
    ctx.fillStyle = INK; ctx.fillRect(i - 0.3, j - 1.2, 1.8, 2.6)
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j - 0.9, 1.2, 2); ctx.fillStyle = '#fff'; ctx.fillRect(i, j - 0.9, 0.5, 0.5)
  }
  for (let q = 0; q < k; q++) {
    one(((t * 1.6 + q * 0.37) % 1), 28.5, 1)
    if (k > 1) one(((t * 1.6 + q * 0.37 + 0.5) % 1), 6.5, -1)
  }
}

// ── the sun-star's rays (world px, behind the star)
export function sunRays(x, cx, cy, R, t, a = 1, beat0 = 0.6, beat = 0.5556) {
  if (a <= 0) return
  const u = (t - beat0) / beat, ph = u - Math.floor(u)
  const pump = 1 + 0.08 * Math.exp(-ph * 5) * (t > beat0 ? 1 : 0)
  x.save(); x.translate(cx, cy); x.globalAlpha *= a
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(0, 0, R * 0.4, 0, 0, R * 2.6); g.addColorStop(0, rgba(SUN, 0.42)); g.addColorStop(0.5, rgba(FIRE, 0.14)); g.addColorStop(1, rgba(FIRE, 0))
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, R * 2.6, 0, Math.PI * 2); x.fill(); x.restore()
  x.rotate(t * 0.45)
  for (let i = 0; i < 12; i++) {
    const a0 = (i / 12) * Math.PI * 2, long = i % 2 === 0
    const r0 = R * 1.02, r1 = R * (long ? 1.42 : 1.26) * pump
    glowStroke(x, long ? SUN : FIRE, long ? 18 : 13, 16)
    x.beginPath(); x.moveTo(Math.cos(a0) * r0, Math.sin(a0) * r0); x.lineTo(Math.cos(a0) * r1, Math.sin(a0) * r1); x.stroke()
  }
  x.restore()
}

/** pixel sunglasses in sprite cells (the eyes sit at cells 13.4 / 22.6, row 19.2) */
const SHADES = [
  'KKKKKKKKKKKKKKKKKKK',
  'KLLLLLLLKKKLLLLLLLK',
  'KLHLLLLLK.KLHLLLLLK',
  'KLLHLLLLK.KLLHLLLLK',
  '.KLLLLLK...KLLLLLK.',
  '..KKKKK.....KKKKK..',
]
export function shadesCells(ctx, a = 1) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  const x0 = 8.5, y0 = 16.2
  const col = { K: '#07040f', L: '#1d1438', H: rgba(PINK, 0.85) }
  SHADES.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; ctx.fillStyle = col[ch]; ctx.fillRect(x0 + i, y0 + j, 1.02, 1.02) }))
  // the arms
  ctx.fillStyle = '#07040f'; ctx.fillRect(x0 - 1.5, y0, 1.6, 1); ctx.fillRect(x0 + 19, y0, 1.6, 1)
  ctx.restore()
}

/** a parked car, side view, nose left, sitting on gy */
export function drawCar(x, cx, gy, w, sizzle = 0, a = 1) {
  if (a <= 0) return
  const h = w * 0.42
  x.save(); x.translate(cx, gy); x.globalAlpha *= a
  x.beginPath()
  x.moveTo(-w * 0.5, -h * 0.25); x.quadraticCurveTo(-w * 0.5, -h * 0.55, -w * 0.38, -h * 0.58)
  x.lineTo(-w * 0.22, -h * 0.62); x.quadraticCurveTo(-w * 0.12, -h * 1.0, w * 0.06, -h * 1.0); x.lineTo(w * 0.24, -h * 1.0)
  x.quadraticCurveTo(w * 0.36, -h * 0.98, w * 0.42, -h * 0.62); x.quadraticCurveTo(w * 0.52, -h * 0.58, w * 0.5, -h * 0.25)
  x.lineTo(w * 0.5, -h * 0.12); x.lineTo(-w * 0.5, -h * 0.12); x.closePath()
  x.fillStyle = '#3a2150'; x.fill(); glowStroke(x, PINK, 7, 18); x.stroke(); x.shadowBlur = 0
  x.fillStyle = rgba(CYAN, 0.28)
  x.beginPath(); x.moveTo(-w * 0.18, -h * 0.64); x.quadraticCurveTo(-w * 0.1, -h * 0.9, w * 0.04, -h * 0.9); x.lineTo(w * 0.04, -h * 0.64); x.closePath(); x.fill()
  x.beginPath(); x.moveTo(w * 0.09, -h * 0.64); x.lineTo(w * 0.09, -h * 0.9); x.lineTo(w * 0.23, -h * 0.9); x.quadraticCurveTo(w * 0.32, -h * 0.88, w * 0.36, -h * 0.64); x.closePath(); x.fill()
  x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath(); x.moveTo(-w * 0.02, -h * 0.94); x.lineTo(w * 0.18, -h * 0.94); x.stroke()
  x.fillStyle = sizzle > 0 ? mixHex(BONE, RED, sizzle) : BONE
  if (sizzle > 0) { x.shadowColor = RED; x.shadowBlur = 34 * sizzle }
  x.beginPath(); x.roundRect(-w * 0.14, -h * 0.5, w * 0.11, 12, 6); x.fill(); x.shadowBlur = 0
  for (const wx of [-w * 0.3, w * 0.3]) {
    x.fillStyle = '#0a0716'; x.beginPath(); x.arc(wx, -h * 0.12, h * 0.25, 0, Math.PI * 2); x.fill()
    glowStroke(x, BONE, 5, 10); x.stroke(); x.shadowBlur = 0
    x.fillStyle = GREY; x.beginPath(); x.arc(wx, -h * 0.12, h * 0.1, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
export const carHandle = (cx, gy, w) => ({ x: cx - w * 0.085, y: gy - w * 0.42 * 0.5 })

/** wavy heat-shimmer lines rising from a band */
export function drawShimmer(x, x0, x1, yBase, t, a, n = 5, rise = 300) {
  if (a <= 0) return
  x.save(); x.lineCap = 'round'
  for (let i = 0; i < n; i++) {
    const s = ((t * 0.55 + i / n) % 1)
    const y = yBase - s * rise
    x.globalAlpha = a * Math.sin(Math.PI * s) * 0.5
    x.strokeStyle = i % 2 ? SUN : BONE; x.lineWidth = 5
    x.beginPath()
    for (let px = x0; px <= x1; px += 12) { const yy = y + 9 * Math.sin(px * 0.035 + t * 6 + i * 1.7); px === x0 ? x.moveTo(px, yy) : x.lineTo(px, yy) }
    x.stroke()
  }
  x.restore()
}

/** the street: a hot kerb band */
export function drawStreet(x, gy, a, hot = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  const g = x.createLinearGradient(0, gy, 0, gy + 140); g.addColorStop(0, mixHex('#2a1838', '#5a2a2a', hot)); g.addColorStop(1, 'rgba(10,6,20,0)')
  x.fillStyle = g; x.fillRect(0, gy, 1080, 140)
  glowStroke(x, hot > 0.5 ? FIRE : GOLD, 5, 14); x.beginPath(); x.moveTo(0, gy); x.lineTo(1080, gy); x.stroke(); x.shadowBlur = 0
  x.setLineDash([46, 34]); x.strokeStyle = rgba(BONE, 0.35); x.lineWidth = 6; x.beginPath(); x.moveTo(0, gy + 64); x.lineTo(1080, gy + 64); x.stroke()
  x.restore()
}

/** a glossy puddle (the melted star) */
export function drawPuddle(x, cx, gy, w, col, a = 1) {
  if (a <= 0 || w <= 1) return
  x.save(); x.globalAlpha *= a
  x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 24
  x.beginPath(); x.ellipse(cx, gy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.shadowBlur = 0
  x.fillStyle = 'rgba(255,255,255,0.45)'; x.beginPath(); x.ellipse(cx - w * 0.2, gy - w * 0.025, w * 0.12, w * 0.016, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}

/** a café table (top surface at `top`) with a candle that melts (melt 0…1) */
export function drawTable(x, cx, top, w, t, melt = 0, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  // legs
  x.fillStyle = '#2a1a44'; x.fillRect(cx - 12, top + 18, 24, 170); x.fillRect(cx - 90, top + 180, 180, 16)
  // top
  x.fillStyle = '#4a2f6a'; x.beginPath(); x.roundRect(cx - w / 2, top, w, 26, 12); x.fill()
  glowStroke(x, GOLD, 4, 12); x.stroke(); x.shadowBlur = 0
  // candle (shrinks into a puddle of wax)
  const m = clamp(melt), ch = lerp(96, 14, m), cw = lerp(26, 34, m)
  x.fillStyle = BONE; x.beginPath(); x.roundRect(cx - cw / 2, top - ch, cw, ch, 6); x.fill()
  x.beginPath(); x.ellipse(cx, top - 2, lerp(18, 64, m), lerp(6, 10, m), 0, 0, Math.PI * 2); x.fill()
  // drips
  if (m > 0.05) { x.fillRect(cx - cw / 2 - 2, top - ch * 0.6, 7, ch * 0.5); x.fillRect(cx + cw / 2 - 5, top - ch * 0.45, 7, ch * 0.4) }
  // flame
  const fl = 1 + 0.12 * Math.sin(t * 19) + 0.08 * Math.sin(t * 31)
  x.save(); x.translate(cx, top - ch - 6); x.scale(1, fl)
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(0, -10, 2, 0, -10, 70); g.addColorStop(0, rgba(SUN, 0.55)); g.addColorStop(1, rgba(FIRE, 0))
  x.fillStyle = g; x.beginPath(); x.arc(0, -10, 70, 0, Math.PI * 2); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.fillStyle = SUN; x.beginPath(); x.moveTo(0, -38); x.quadraticCurveTo(13, -10, 0, 0); x.quadraticCurveTo(-13, -10, 0, -38); x.fill()
  x.fillStyle = '#fff6c8'; x.beginPath(); x.moveTo(0, -24); x.quadraticCurveTo(6, -8, 0, -2); x.quadraticCurveTo(-6, -8, 0, -24); x.fill()
  x.restore()
  x.restore()
}

/** a small phone held up, screen glowing */
export function drawPhone(x, cx, cy, s = 1, a = 1, rot = 0) {
  if (a <= 0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.globalAlpha *= a
  x.fillStyle = '#0c0818'; x.beginPath(); x.roundRect(-40, -70, 80, 140, 14); x.fill()
  glowStroke(x, BONE, 4, 10); x.stroke(); x.shadowBlur = 0
  const g = x.createLinearGradient(0, -60, 0, 60); g.addColorStop(0, '#8fd8f6'); g.addColorStop(1, '#5a6ee0')
  x.fillStyle = g; x.beginPath(); x.roundRect(-32, -60, 64, 118, 8); x.fill()
  x.restore()
}

/** a chat bubble with a tail at bottom-left */
export function drawChat(x, cx, cy, w, h, text, k, fillC = '#d8d4ea') {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha *= clamp(k * 2)
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
  x.moveTo(-w * 0.22, h / 2 - 2); x.lineTo(-w * 0.36, h / 2 + h * 0.42); x.lineTo(-w * 0.05, h / 2 - 2)
  x.fillStyle = fillC; x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 30; x.fill(); x.shadowBlur = 0
  glowStroke(x, BONE, 5, 14); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.stroke(); x.shadowBlur = 0
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 ${Math.round(h * 0.56)}px ${INTER}`; x.fillText(text, 0, 2)
  x.restore()
}

/** the illustrated DEALBREAKERS card (not app UI): dark glass, gold rim, two chip rows. Centred at (0,0). */
export function drawDealCard(x, w, h) {
  x.save()
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
  x.fillStyle = 'rgba(18,12,40,0.95)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 36); x.fill()
  x.shadowOffsetY = 0
  const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(FIRE, 0.24)); gr.addColorStop(1, rgba(FIRE, 0.03))
  x.fillStyle = gr; x.fill()
  glowStroke(x, GOLD, 9, 26); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 36); x.stroke()
  x.shadowBlur = 0; x.lineWidth = 2; x.globalAlpha *= 0.4; x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 26); x.stroke(); x.globalAlpha /= 0.4
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = GOLD; x.font = `700 38px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 74)
  x.strokeStyle = rgba(GOLD, 0.5); x.lineWidth = 3; x.beginPath(); x.moveTo(-w * 0.3, -h / 2 + 118); x.lineTo(w * 0.3, -h / 2 + 118); x.stroke()
  for (const [y, cw] of [[-40, w * 0.74], [150, w * 0.68]]) {
    x.strokeStyle = rgba(BONE, 0.45); x.lineWidth = 4; x.beginPath(); x.roundRect(-cw / 2, y - 44, cw, 88, 44); x.stroke()
    x.fillStyle = rgba(BONE, 0.16); x.beginPath(); x.roundRect(-cw / 2 + 34, y - 8, cw - 68, 16, 8); x.fill()
  }
  x.restore()
}

/** a rubber stamp "✕ TEXT", centred at (0,0) */
export function drawStamp(x, text, a, size = 54) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.font = `900 ${size}px ${INTER}`
  const tw = x.measureText(text).width, w = tw + 80, h = size * 2.1
  x.strokeStyle = RED; x.lineWidth = 10; x.shadowColor = rgba(RED, 0.8); x.shadowBlur = 26
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 20); x.stroke()
  x.lineWidth = 4; x.beginPath(); x.roundRect(-w / 2 + 13, -h / 2 + 13, w - 26, h - 26, 12); x.stroke()
  x.fillStyle = 'rgba(30,8,20,0.85)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 20); x.fill()
  x.shadowBlur = 14; x.fillStyle = '#ff5a52'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, 0, 3)
  x.restore()
}

/** a warm tint over the whole frame: heat (orange) → dusk (violet) */
export function tint(x, heat, dusk) {
  if (heat > 0) { x.save(); x.globalAlpha = heat * 0.5; x.fillStyle = FIRE; x.globalCompositeOperation = 'soft-light'; x.fillRect(0, 0, 1080, 1920); x.restore()
    x.save(); x.globalAlpha = heat * 0.3; const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, rgba(SUN, 0.0)); g.addColorStop(0.55, rgba(FIRE, 0.7)); g.addColorStop(1, rgba(FIRE, 0.2)); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore() }
  if (dusk > 0) { x.save(); x.globalAlpha = dusk * 0.22; const g = x.createLinearGradient(0, 600, 0, 1500); g.addColorStop(0, 'rgba(180,70,160,0)'); g.addColorStop(1, 'rgba(255,120,90,0.9)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore() }
}
