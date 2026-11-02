// hxsugarland · props: helpers copied from sxhoodmidtown/scenes/props.js (ink, sparkle, chip, the star transform, tears,
// asides, show bug, table, pool, hearts) plus this film's own Sugar Land pieces (tidy lawns, a lake + fountain, the calendar, a kite).
import { clamp, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', BLUE = '#8fd8f6', ROSE = '#f59cc4', VIOLET = '#9a7be0', LAV = '#c9a6ff', AMBER = '#ffb86b'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
export const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(ctx, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = rgba(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}

// ── pixel-star sparkle burst
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(ctx, x, y, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  ctx.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  ctx.restore()
}

// ── a glowing orb with a soft halo
export function orb(ctx, px, py, r, color, a = 1, halo = 3.2) {
  if (a <= 0 || r <= 0.5) return
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = ctx.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, hr, 0, TAU); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = a
  const s = ctx.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.45, color); s.addColorStop(1, rgba(color, 0.85))
  ctx.fillStyle = s; ctx.beginPath(); ctx.arc(px, py, r, 0, TAU); ctx.fill()
  ctx.restore()
}

/** a label chip (mono caps on a dark pill) centred at (x, y) */
export function chip(ctx, x, y, text, k, { size = 26, col = BONE, edge = LAV } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const w = ctx.measureText(text).width + size * 1.1, h = size * 1.6
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2)
  ctx.fillStyle = 'rgba(14,9,34,0.88)'; ctx.fill(); ink(ctx, edge, { w: 3, fa: 0, glow: 10 })
  ctx.fillStyle = col; ctx.fillText(text, 0, 1)
  ctx.restore()
}

// ───────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar; from stelevator's kit)
const G = 36, HALF = 18
const SC = { y: 19.6, R: 17.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)
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
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
export const cellToWorld = (F, i, j) => [F.ox + (i - HALF) * F.cell * F.sx, F.oy + (j - HALF) * F.cell * F.sy - F.base * F.sy]
const INKC = '#1b1236'
/** tears from both eyes (cells). k: 0 none · 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INKC; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
/** a pixel speech chip with a little tail toward (tx, ty) (Pisces' asides) */
export function aside(ctx, x, y, text, k, { size = 30, col = BONE, edge = '#c9a6ff', tx = null, ty = null } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const w = ctx.measureText(text).width + 36, h = size + 26
  if (tx !== null) { ctx.fillStyle = INKC; ctx.beginPath(); ctx.moveTo(-14, h / 2 - 2); ctx.lineTo((tx - x) / k * 0.35, (ty - y) / k * 0.6); ctx.lineTo(14, h / 2 - 2); ctx.fill() }
  ctx.fillStyle = INKC; ctx.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  ctx.fillStyle = 'rgba(20,12,44,0.97)'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = edge; ctx.fillRect(-w / 2, h / 2 - 5, w, 5)
  ctx.fillStyle = col; ctx.fillText(text, 0, 2)
  ctx.restore()
}

// ───────────────────────────────────────── the show bug (DOM): "NEIGHBORHOOD STARS · <HOOD>", top-left, 56 px in
export function showBug(el, root, hood) {
  return el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 30px ${INTER}`, fontVariant: 'all-small-caps', letterSpacing: '0.16em',
    color: GOLD, textShadow: '0 3px 14px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', opacity: 0, pointerEvents: 'none' }, root,
    `★ NEIGHBORHOOD STARS<span style="color:rgba(239,230,214,0.6)"> · ${hood}</span>`)
}

/** a table top seen from the front: a slab with legs, from x0 to x1, top surface at y */
export function table(ctx, x0, x1, y, { a = 1, cloth = '#efe6d6', edge = '#c9a6ff' } = {}) {
  if (a <= 0 || x1 <= x0) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.fillStyle = '#1b1236'; ctx.fillRect(x0 - 6, y - 6, x1 - x0 + 12, 46)
  ctx.fillStyle = cloth; ctx.fillRect(x0, y, x1 - x0, 34)
  ctx.fillStyle = edge; ctx.fillRect(x0, y + 26, x1 - x0, 8)
  ctx.fillStyle = '#1b1236'
  for (let lx = x0 + 30; lx < x1 - 20; lx += 260) ctx.fillRect(lx, y + 40, 14, 150)
  ctx.fillRect(x1 - 44, y + 40, 14, 150)
  ctx.restore()
}
/** a warm pool of light on the ground / table (additive) */
export function pool(ctx, cx, cy, rx, ry, a, col = '255,214,150') {
  if (a <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(cx, cy); ctx.scale(1, ry / rx)
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
  g.addColorStop(0, `rgba(${col},${0.42 * a})`); g.addColorStop(1, `rgba(${col},0)`)
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx, 0, TAU); ctx.fill()
  ctx.restore()
}

/** little pixel hearts floating up from (cx, cy) between t0 and t1 */
export function floatHearts(ctx, t, cx, cy, t0, t1, seed = 0, cell = 7, spread = 200) {
  const HB = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
  for (let i = 0; i < 7; i++) {
    const born = t0 + i * 0.22, life = 1.2
    if (t < born || born > t1) continue
    const p = (t - born) / life
    if (p >= 1) continue
    const side = ((i * 37 + seed) % 7) / 6 - 0.5
    const hx = Math.round(cx + side * spread + Math.sin(p * 7 + i) * 16), hy = Math.round(cy - 40 - p * 220)
    const c = cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6)))
    ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * p)
    HB.forEach((row, j) => [...row].forEach((ch, k) => { if (ch === '.') return; ctx.fillStyle = ch === 'W' ? '#ffd1de' : '#ff4f86'; ctx.fillRect(hx + (k - 2.5) * c, hy + (j - 2.5) * c, c + 0.5, c + 0.5) }))
    ctx.restore()
  }
}

// ═════════════════════════════════════════ Sugar Land pieces (generic: no names, no brands)
const INK = '#1b1236'

/** the tidy suburb: matching rooftops, identical round hedges, a lake with a fountain, a gazebo; y = lawn line */
export function suburb(ctx, t, { y = 1180, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  // houses across the lake (all the same, perfectly spaced)
  for (let i = 0; i < 6; i++) {
    const hx = -40 + i * 200, hy = y - 290
    ctx.fillStyle = '#1d1446'; ctx.fillRect(hx, hy, 170, 140)
    ctx.beginPath(); ctx.moveTo(hx - 14, hy); ctx.lineTo(hx + 85, hy - 70); ctx.lineTo(hx + 184, hy); ctx.fill()
    ctx.fillStyle = '#ffd98a'; ctx.globalAlpha = alpha * 0.85; ctx.fillRect(hx + 20, hy + 40, 40, 36); ctx.fillRect(hx + 110, hy + 40, 40, 36); ctx.globalAlpha = alpha
    ctx.fillStyle = '#2c1f5e'; ctx.fillRect(hx + 70, hy + 70, 30, 70)
    for (let k = 0; k < 3; k++) { ctx.fillStyle = '#245a3a'; ctx.beginPath(); ctx.arc(hx + 30 + k * 55, hy + 140, 24, Math.PI, 0); ctx.fill() }
  }
  // the lake (between the houses and our lawn) + its fountain
  ctx.fillStyle = '#1a1550'; ctx.fillRect(0, y - 150, 1080, 150)
  ctx.fillStyle = 'rgba(143,216,246,0.25)'; for (let j = 0; j < 4; j++) ctx.fillRect(100 + ((j * 170 + t * 20) % 900), y - 130 + j * 32, 90, 4)
  const FX = 900, FY = y - 60
  for (let q = 0; q < 14; q++) { const ph = (t * 0.8 + q / 14) % 1, side = q % 2 ? 1 : -1, dx = side * ph * 50, dy = -110 * ph + 130 * ph * ph
    ctx.fillStyle = `rgba(200,236,255,${0.7 * (1 - ph)})`; ctx.fillRect(FX + dx - 5, FY + dy - 5, 10, 10) }
  ctx.fillStyle = 'rgba(200,236,255,0.8)'; ctx.fillRect(FX - 4, FY - 100, 8, 100)
  // the lawn (ours, in front), neatly edged
  ctx.fillStyle = '#1c3a2c'; ctx.fillRect(0, y, 1080, 760)
  ctx.fillStyle = '#245a3a'; for (let i = 0; i < 27; i++) ctx.fillRect(i * 40 + (i % 2) * 6, y, 4, 10)
  // gazebo (left)
  const GX = 150, GY = y - 10
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(GX - 110, GY - 190); ctx.lineTo(GX, GY - 270); ctx.lineTo(GX + 110, GY - 190); ctx.fill()
  ctx.fillStyle = '#efe6d6'; ctx.beginPath(); ctx.moveTo(GX - 100, GY - 194); ctx.lineTo(GX, GY - 262); ctx.lineTo(GX + 100, GY - 194); ctx.fill()
  ctx.fillStyle = '#efe6d6'; for (const px of [-90, -30, 30, 90]) ctx.fillRect(GX + px - 5, GY - 190, 10, 170)
  ctx.fillRect(GX - 110, GY - 30, 220, 14)
  ctx.restore()
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const BLOCK_COLS = ['#8fd8f6', '#9fe08a', '#ffb86b', '#c9a6ff', '#ff8fb1', '#f2c75c']
/** the big planner calendar on an easel, centred at (x, y) (w × h). fillK 0…1 colour-blocks every square; mess 0…1 spills
 *  extra blocks off the edges; keep = only Saturday's plan + a dashed blank square stay; doodle 0…1 draws a heart in it */
export function calendar(ctx, x, y, w, h, t, { a = 1, fillK = 1, mess = 0, keep = 0, doodle = 0, shake = 0 } = {}) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.translate(x + shake * 6 * Math.sin(t * 60), y)
  // easel legs
  ctx.fillStyle = '#7a5a3a'; ctx.fillRect(-w * 0.36, h * 0.4, 14, h * 0.5); ctx.fillRect(w * 0.36 - 14, h * 0.4, 14, h * 0.5)
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  ctx.fillStyle = BONE; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#ff8fb1'; ctx.fillRect(-w / 2, -h / 2, w, 46)
  for (let i = 0; i < 5; i++) { ctx.fillStyle = INK; ctx.fillRect(-w / 2 + 30 + i * (w - 60) / 4 - 6, -h / 2 - 16, 12, 30) }
  const cw = (w - 20) / 7, top = -h / 2 + 56, ch = (h - 66 - 30) / 4
  ctx.font = `700 22px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  DAYS.forEach((d, i) => { ctx.fillStyle = INK; ctx.fillText(d, -w / 2 + 10 + cw * (i + 0.5), top + 12) })
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
    const bx = -w / 2 + 10 + c * cw, by = top + 30 + r * ch
    ctx.fillStyle = '#d8ccb8'; ctx.fillRect(bx, by, cw - 3, 2); ctx.fillRect(bx, by, 2, ch - 3)
    const isSat = c === 6 && r === 1, n = r * 7 + c
    const on = fillK * 28 > n
    if (isSat) continue
    if (on && keep < 1) { ctx.globalAlpha = a * (1 - keep); ctx.fillStyle = BLOCK_COLS[(n * 5) % BLOCK_COLS.length]; ctx.fillRect(bx + 5, by + 6, cw - 13, ch * 0.32); ctx.fillRect(bx + 5, by + 6 + ch * 0.4, (cw - 13) * 0.7, ch * 0.22); ctx.globalAlpha = a }
  }
  // Saturday: the big plan block (stays) + the blank square next to it (appears with keep)
  const sx = -w / 2 + 10 + 6 * cw, sy = top + 30 + ch
  ctx.fillStyle = '#ff6f91'; ctx.fillRect(sx + 4, sy + 5, cw - 11, ch - 13)
  ctx.fillStyle = BONE; ctx.fillRect(sx + 12, sy + 16, cw - 28, 6); ctx.fillRect(sx + 12, sy + 30, cw - 40, 6)
  if (keep > 0) {
    const bx = -w / 2 + 10 + 6 * cw, by = top + 30 + 2 * ch
    ctx.globalAlpha = a * keep; ctx.strokeStyle = '#ff6f91'; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.strokeRect(bx + 6, by + 6, cw - 15, ch - 15); ctx.setLineDash([])
    ctx.fillStyle = '#ff6f91'; ctx.font = `700 26px ${MONO}`; ctx.fillText('???', bx + cw / 2, by + ch / 2)
    if (doodle > 0) {
      const HB = ['.H.H.', 'HHHHH', 'HHHHH', '.HHH.', '..H..'], c = 6
      let n = 0; HB.forEach((row, j) => [...row].forEach((chh, k) => { if (chh === '.') return; if (n++ / 17 > doodle) return; ctx.fillStyle = '#ff4f86'; ctx.fillRect(bx + cw / 2 + (k - 2.5) * c, by + ch / 2 - 30 + (j - 2.5) * c, c, c) }))
    }
    ctx.globalAlpha = a
  }
  // the mess: blocks spilling off the edges (C)
  if (mess > 0) for (let i = 0; i < 9; i++) {
    const ph = Math.min(1, mess * 1.4 - i * 0.05); if (ph <= 0) continue
    const ang = -0.9 + i * 0.25, dist = 40 + ph * (180 + (i % 3) * 60)
    ctx.save(); ctx.translate(Math.cos(ang) * (w / 2 + dist * 0.4) * (i % 2 ? 1 : -1), -h / 2 + 60 + i * 40 + ph * 30); ctx.rotate((i % 2 ? 1 : -1) * ph * 0.6)
    ctx.fillStyle = INK; ctx.fillRect(-34, -18, 68, 36); ctx.fillStyle = BLOCK_COLS[i % BLOCK_COLS.length]; ctx.fillRect(-30, -14, 60, 28); ctx.restore()
  }
  ctx.restore()
}

/** a diamond kite on a string from (hx, hy) to the kite at (kx, ky), tail fluttering */
export function kite(ctx, hx, hy, kx, ky, t, a = 1, s = 1, col = '#ff6f6f') {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.strokeStyle = 'rgba(239,230,214,0.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo((hx + kx) / 2 + 40, (hy + ky) / 2 + 60, kx, ky); ctx.stroke()
  ctx.translate(kx, ky); ctx.rotate(0.15 * Math.sin(t * 2.3)); ctx.scale(s, s)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(0, -66); ctx.lineTo(48, 0); ctx.lineTo(0, 76); ctx.lineTo(-48, 0); ctx.fill()
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, -58); ctx.lineTo(40, 0); ctx.lineTo(0, 0); ctx.fill(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-40, 0); ctx.lineTo(0, 68); ctx.fill()
  ctx.fillStyle = '#f2c75c'; ctx.beginPath(); ctx.moveTo(0, -58); ctx.lineTo(-40, 0); ctx.lineTo(0, 0); ctx.fill(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(40, 0); ctx.lineTo(0, 68); ctx.fill()
  for (let i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? '#8fd8f6' : '#ff8fb1'; ctx.fillRect(-6 + 14 * Math.sin(t * 5 + i * 0.8), 80 + i * 22, 12, 12) }
  ctx.restore()
}

/** a planner's pen (smokes when overworked) */
export function pen(ctx, x, y, s, rot, a = 1, smoke = 0, t = 0) {
  if (a <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = INK; ctx.fillRect(-10, -110, 20, 110); ctx.fillStyle = '#ff6f91'; ctx.fillRect(-6, -106, 12, 80); ctx.fillStyle = BONE; ctx.fillRect(-6, -26, 12, 18); ctx.fillStyle = INK; ctx.fillRect(-3, -8, 6, 10)
  ctx.restore()
  if (smoke > 0) for (let q = 0; q < 6; q++) { const ph = (t * 1.2 + q / 6) % 1; ctx.save(); ctx.globalAlpha = a * smoke * 0.5 * (1 - ph); ctx.fillStyle = '#c8c8d8'; ctx.fillRect(x - 8 + Math.sin(ph * 7 + q) * 14, y - ph * 120, 16, 16); ctx.restore() }
}
