// hxclearlake · props: helpers copied from sxhoodmidtown/scenes/props.js (ink, sparkle, chip, the star transform, tears,
// asides, show bug, table, pool, hearts) plus this film's own Clear Lake pieces (the marina, the dock, a model rocket, orbit diagrams).
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

// ═════════════════════════════════════════ Clear Lake pieces (generic: no names, no brands)
const INK = '#1b1236'

/** the lake at night: far shore, a marina of sailboat masts (rocking), the water with a moon path; y = waterline */
export function lake(ctx, t, { y = 1060, alpha = 1, moonX = 800 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  // far shore: low trees + a few lights
  ctx.fillStyle = '#140d33'; for (let i = 0; i < 20; i++) { const tx = i * 60 - 20, th = 30 + ((i * 37) % 40); ctx.fillRect(tx, y - th, 64, th) }
  ctx.fillStyle = '#ffd98a'; for (let i = 0; i < 9; i++) ctx.fillRect(40 + i * 120 + (i % 3) * 14, y - 18 - (i % 2) * 10, 6, 6)
  // marina masts
  for (let i = 0; i < 7; i++) {
    const mx = 70 + i * 150, rock = 0.04 * Math.sin(t * 1.3 + i * 1.7)
    ctx.save(); ctx.translate(mx, y + 40); ctx.rotate(rock)
    ctx.fillStyle = INK; ctx.fillRect(-60, -24, 120, 26); ctx.fillStyle = '#efe6d6'; ctx.fillRect(-56, -20, 112, 14)
    ctx.fillStyle = '#c9c2b4'; ctx.fillRect(-3, -260 - (i % 3) * 30, 6, 240 + (i % 3) * 30)
    ctx.globalAlpha *= Math.sin(t * 3 + i) > 0.6 ? 1 : 0.35; ctx.fillStyle = '#ff3d6e'; ctx.fillRect(-4, -270 - (i % 3) * 30, 8, 8)
    ctx.restore()
  }
  // water + moon path ripples
  const W = ctx.createLinearGradient(0, y, 0, 1920); W.addColorStop(0, '#1a1550'); W.addColorStop(1, '#0b0826')
  ctx.fillStyle = W; ctx.fillRect(0, y + 40, 1080, 1920 - y)
  for (let j = 0; j < 14; j++) { const yy = y + 60 + j * 22, w = 120 - j * 4 + 30 * Math.sin(t * 1.5 + j), sh = 10 * Math.sin(t * 0.9 + j * 1.3)
    ctx.fillStyle = `rgba(255,243,214,${0.35 - j * 0.02})`; ctx.fillRect(moonX - w / 2 + sh, yy, w, 5) }
  ctx.restore()
}

/** the dock (boards) the dates sit on, top at y */
export function dock(ctx, y, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = INK; ctx.fillRect(-10, y - 6, 1100, 70)
  ctx.fillStyle = '#7a5a3a'; ctx.fillRect(-10, y, 1100, 56)
  ctx.fillStyle = '#5a3f28'; for (let i = 0; i < 22; i++) ctx.fillRect(i * 52, y, 4, 56)
  ctx.fillStyle = '#9a7650'; ctx.fillRect(-10, y, 1100, 6)
  ctx.fillStyle = INK; for (const px of [60, 360, 700, 1000]) ctx.fillRect(px, y + 56, 22, 200)
  ctx.restore()
}

/** a model rocket (nose up) standing on its fins at (x, y); s = scale; rot radians; flame 0…1 (a pretend whoosh) */
export function rocket(ctx, x, y, s, rot = 0, a = 1, flame = 0, t = 0) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  if (flame > 0) { const f = flame * (1 + 0.2 * Math.sin(t * 40)); ctx.fillStyle = '#ffb86b'; ctx.fillRect(-10, 0, 20, 40 * f); ctx.fillStyle = '#fff3c4'; ctx.fillRect(-5, 0, 10, 24 * f) }
  ctx.fillStyle = INK; ctx.fillRect(-20, -150, 40, 150); ctx.beginPath(); ctx.moveTo(-20, -150); ctx.lineTo(0, -196); ctx.lineTo(20, -150); ctx.fill()
  ctx.fillRect(-40, -44, 80, 44)
  ctx.fillStyle = '#efe6d6'; ctx.fillRect(-16, -148, 32, 146)
  ctx.fillStyle = '#ff6f6f'; ctx.beginPath(); ctx.moveTo(-16, -150); ctx.lineTo(0, -188); ctx.lineTo(16, -150); ctx.fill()
  ctx.fillStyle = '#ff6f6f'; ctx.fillRect(-36, -40, 20, 38); ctx.fillRect(16, -40, 20, 38)
  ctx.fillStyle = '#8fd8f6'; ctx.fillRect(-8, -120, 16, 16)
  ctx.restore()
}

/** an orbit diagram drawn in the air: a planet dot, a dashed ellipse, a satellite dot riding it; k = draw-on 0…1 */
export function orbitDiagram(ctx, cx, cy, rx, ry, t, k, { col = '#8fd8f6', planet = '#9fe08a', speed = 1.4, label = null, binary = false } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.globalAlpha *= Math.min(1, k * 1.5)
  ctx.setLineDash([14, 12]); ctx.lineDashOffset = -t * 30
  ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.shadowColor = col; ctx.shadowBlur = 12
  ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, -0.15, 0, Math.PI * 2 * Math.min(1, k)); ctx.stroke()
  ctx.setLineDash([]); ctx.shadowBlur = 0
  const an = t * speed
  if (binary) {   // two bodies circling each other: a conversation, not a lecture
    for (const d of [0, Math.PI]) { const px = cx + Math.cos(an + d) * rx * 0.5, py = cy + Math.sin(an + d) * ry * 0.5; ctx.fillStyle = INK; ctx.fillRect(px - 24, py - 24, 48, 48); ctx.fillStyle = d ? '#ff8fb1' : '#c7b8ff'; ctx.fillRect(px - 19, py - 19, 38, 38) }
  } else {
    ctx.fillStyle = INK; ctx.fillRect(cx - 48, cy - 48, 96, 96); ctx.fillStyle = planet; ctx.fillRect(cx - 44, cy - 44, 88, 88); ctx.fillStyle = '#8fd8f6'; ctx.fillRect(cx - 44, cy - 8, 44, 22)
    const px = cx + Math.cos(an) * rx, py = cy + Math.sin(an) * ry
    ctx.fillStyle = INK; ctx.fillRect(px - 17, py - 17, 34, 34); ctx.fillStyle = '#e8f4ff'; ctx.fillRect(px - 12, py - 12, 24, 24)
  }
  if (label) { ctx.font = `700 30px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowColor = "#05040c"; ctx.shadowBlur = 10; ctx.fillStyle = col; ctx.fillText(label, cx, cy + ry + 38); ctx.fillText(label, cx, cy + ry + 38); ctx.shadowBlur = 0 }
  ctx.restore()
}

/** a picnic blanket (checkered) on the dock, centred at x, top at y */
export function blanket(ctx, x, y, w, a = 1) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  const c = 24
  for (let i = 0; i < w / c; i++) for (let j = 0; j < 2; j++) { ctx.fillStyle = (i + j) % 2 ? '#ff6f6f' : BONE; ctx.fillRect(x - w / 2 + i * c, y + j * 14, c, 14) }
  ctx.restore()
}
/** a little snack basket */
export function basket(ctx, x, y, s, a = 1) {
  if (a <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = INK; ctx.fillRect(-54, -50, 108, 52); ctx.fillStyle = '#c99a55'; ctx.fillRect(-50, -46, 100, 44)
  ctx.fillStyle = '#a77a3a'; for (let i = 0; i < 5; i++) ctx.fillRect(-50 + i * 22, -46, 4, 44)
  ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, -50, 40, Math.PI, 0); ctx.stroke()
  ctx.fillStyle = '#ffd98a'; ctx.fillRect(-30, -62, 22, 14); ctx.fillStyle = '#9fe08a'; ctx.fillRect(6, -66, 18, 18)
  ctx.restore()
}
