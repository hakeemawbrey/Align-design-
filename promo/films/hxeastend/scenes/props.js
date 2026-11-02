// hxeastend · props: helpers copied from sxhoodmidtown/scenes/props.js (ink, sparkle, chip, the star transform, tears,
// asides, show bug, table, pool, hearts) plus this film's own East End pieces (the wall, murals, roller, freight line).
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

// ═════════════════════════════════════════ East End pieces (generic: no names, no brands)
const INK = '#1b1236'
export const PAINT = ['#ff6f6f', '#ffb86b', '#f2c75c', '#6fd6c8', '#8fd8f6', '#c9a6ff', '#ff8fb1']

/** behind the wall: sawtooth warehouse roofs, a water tower, power lines (sway) */
export function backdrop(ctx, t, { y = 760, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = '#160f3a'
  for (let i = 0; i < 6; i++) { const x0 = -40 + i * 200; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0, y - 120); ctx.lineTo(x0 + 120, y - 190); ctx.lineTo(x0 + 120, y - 120); ctx.lineTo(x0 + 200, y - 120); ctx.lineTo(x0 + 200, y); ctx.fill() }
  // water tower
  ctx.fillStyle = '#1d1446'; ctx.fillRect(850, y - 400, 150, 110); ctx.beginPath(); ctx.moveTo(840, y - 400); ctx.lineTo(925, y - 460); ctx.lineTo(1010, y - 400); ctx.fill()
  for (const lx of [862, 980]) ctx.fillRect(lx, y - 290, 10, 290)
  ctx.fillRect(862, y - 200, 128, 8)
  // power poles + sagging lines
  ctx.fillStyle = '#120c2c'; for (const px of [120, 620]) { ctx.fillRect(px - 6, y - 420, 12, 420); ctx.fillRect(px - 50, y - 400, 100, 8) }
  ctx.strokeStyle = 'rgba(58,45,120,0.9)'; ctx.lineWidth = 3
  for (const dy of [-396, -372]) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, xx = -40 + 1160 * u, sg = Math.sin(Math.PI * ((xx - 120) / 500 % 1 + 1) % 1) * 40 + 2 * Math.sin(t * 1.2); i ? ctx.lineTo(xx, y + dy + sg) : ctx.moveTo(xx, y + dy + sg) } ctx.stroke() }
  ctx.restore()
}

/** the long cinder-block wall (x0…x1, top at y0, ground at y1) + the sidewalk; the murals paint onto it */
export function wall(ctx, x0, x1, y0, y1, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = INK; ctx.fillRect(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 8)
  ctx.fillStyle = '#3b2f6e'; ctx.fillRect(x0, y0, x1 - x0, y1 - y0)
  ctx.fillStyle = '#33285f'
  for (let j = 0, yy = y0 + 40; yy < y1; yy += 40, j++) { ctx.fillRect(x0, yy, x1 - x0, 3); for (let xx = x0 + (j % 2 ? 40 : 0); xx < x1; xx += 80) ctx.fillRect(xx, yy - 40, 3, 40) }
  ctx.fillStyle = '#4b3d8a'; ctx.fillRect(x0, y0, x1 - x0, 12)
  // sidewalk + street
  ctx.fillStyle = '#2b2160'; ctx.fillRect(0, y1, 1080, 30)
  ctx.fillStyle = '#120c2c'; ctx.fillRect(0, y1 + 30, 1080, 600)
  ctx.fillStyle = '#3a2d78'; for (let k = 0; k < 8; k++) ctx.fillRect(k * 150 + 20, y1 + 170, 80, 8)
  ctx.restore()
}

const R = (ctx, c, i, j, w = 1, h = 1) => ctx.fillRect(i * c, j * c, w * c, h * c)
/** one mural, centred at (cx, cy), w × h, painted left → right as k goes 0 → 1 (a roller edge travels with it) */
export function mural(ctx, kind, cx, cy, w, h, k, t, { alpha = 1 } = {}) {
  if (k <= 0 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.beginPath(); ctx.rect(cx - w / 2, cy - h / 2, w * Math.min(1, k), h); ctx.clip()
  ctx.fillStyle = '#3b2f6e'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h)            // primer: covers the last mural as it rolls
  ctx.translate(cx, cy)
  if (kind === 'swirl') {             // feelings, abstract: colour bands, spirals, drips
    PAINT.forEach((c, i) => { ctx.fillStyle = c; for (let s = 0; s < 26; s++) { const u = s / 25, a = u * 7 + i * 0.9, r = 40 + u * (h * 0.42) * (0.6 + 0.4 * Math.sin(i)); ctx.fillRect(Math.cos(a) * r * (w / h) * 0.9 - 14 + (i - 3) * 12, Math.sin(a) * r - 14, 28, 28) } })
    ctx.fillStyle = '#ff6f6f'; for (let d = 0; d < 6; d++) ctx.fillRect(-w / 2 + 40 + d * (w - 80) / 5, h / 2 - 70, 10, 40 + (d * 17) % 30)
  } else if (kind === 'heart') {      // meant: a heart. reads: a strawberry (seeds + a leafy top)
    const c = Math.round(h / 16)
    const HB = ['.HH...HH.', 'HHHH.HHHH', 'HHHHHHHHH', 'HHHHHHHHH', '.HHHHHHH.', '..HHHHH..', '...HHH...', '....H....']
    HB.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'H') { ctx.fillStyle = '#ff4f6e'; R(ctx, c, i - 4.5, j - 3.5) } }))
    ctx.fillStyle = '#ffe3a0'; for (const [i, j] of [[-3, -1], [-1, 0], [1, -1], [3, 0], [-2, 1], [0, 2], [2, 1], [0, -1]]) R(ctx, c, i + 0.3, j + 0.3, 0.4, 0.5)
    ctx.fillStyle = '#7fd36a'; R(ctx, c, -2, -5, 4, 1); R(ctx, c, -1, -6, 2, 1); R(ctx, c, -3, -4.6, 1, 0.8); R(ctx, c, 2, -4.6, 1, 0.8)
  } else if (kind === 'hands') {      // meant: two stars holding hands. reads: two tacos (two yellow half-moons)
    for (const d of [-1, 1]) { ctx.fillStyle = '#f2c75c'; ctx.beginPath(); ctx.arc(d * w * 0.22, h * 0.12, h * 0.3, Math.PI, 0); ctx.fill()
      ctx.fillStyle = '#7fd36a'; ctx.fillRect(d * w * 0.22 - h * 0.26, h * 0.06, h * 0.52, h * 0.06); ctx.fillStyle = '#ff6f6f'; ctx.fillRect(d * w * 0.22 - h * 0.2, h * 0.02, h * 0.14, h * 0.05) }
    ctx.fillStyle = '#ff8fb1'; ctx.fillRect(-w * 0.06, h * 0.02, w * 0.12, h * 0.08)
  } else if (kind === 'sun') {        // meant: you light up my day. reads: the weather report
    ctx.fillStyle = '#ffb86b'; ctx.beginPath(); ctx.arc(0, 0, h * 0.24, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#f2c75c'; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + t * 0.2; ctx.save(); ctx.rotate(a); ctx.fillRect(h * 0.3, -8, h * 0.14, 16); ctx.restore() }
    ctx.fillStyle = INK; ctx.fillRect(-h * 0.1, -h * 0.05, h * 0.05, h * 0.05); ctx.fillRect(h * 0.05, -h * 0.05, h * 0.05, h * 0.05); ctx.fillRect(-h * 0.08, h * 0.07, h * 0.16, h * 0.04)
  } else if (kind === 'clear') {      // the ending: a plain heart and the words, said first, painted second
    const c = Math.round(h / 15)
    const HB = ['.HH...HH.', 'HHHH.HHHH', 'HHHHHHHHH', 'HHHHHHHHH', '.HHHHHHH.', '..HHHHH..', '...HHH...', '....H....']
    HB.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'H') { ctx.fillStyle = '#ff4f86'; R(ctx, c, i - 4.5, j - 6.6) } }))
    ctx.font = `800 ${Math.round(h * 0.2)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = INK; ctx.fillText('I LIKE YOU.', 5, h * 0.36 + 5); ctx.fillStyle = BONE; ctx.fillText('I LIKE YOU.', 0, h * 0.36)
  }
  ctx.restore()
  // the wet roller edge
  if (k < 1) { ctx.save(); ctx.globalAlpha *= alpha * 0.8; ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(cx - w / 2 + w * k - 6, cy - h / 2, 6, h); ctx.restore() }
}

/** a paint roller: handle bottom at (x, y), roller head up; rot radians; col = paint */
export function roller(ctx, x, y, s, rot, col, a = 1) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = INK; ctx.fillRect(-8, -150, 16, 150); ctx.fillStyle = '#c99a55'; ctx.fillRect(-5, -80, 10, 80)
  ctx.fillStyle = '#9aa0b8'; ctx.fillRect(-5, -150, 10, 70); ctx.fillRect(-5, -158, 50, 8)
  ctx.fillStyle = INK; ctx.fillRect(20, -196, 90, 50); ctx.fillStyle = col; ctx.fillRect(24, -192, 82, 42)
  ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(24, -192, 82, 8)
  ctx.restore()
}

/** paint on its points: blobs on the five tips of a star drawn with frame F (sprite cells), plus a drip or two */
export function paintTips(ctx, F, t, a = 1) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  inSprite(ctx, F, () => {
    const TIPS = [[16.5, 1.4, 3, 3], [1.2, 12.6, 3.4, 2.8], [31.4, 12.6, 3.4, 2.8], [6.2, 31.6, 3.2, 3], [26.6, 31.6, 3.2, 3]]
    TIPS.forEach(([i, j, w, h], k) => { ctx.fillStyle = PAINT[(k * 2) % PAINT.length]; ctx.fillRect(i, j, w, h)
      const ph = (t * 0.5 + k * 0.37) % 1; if (k > 2) ctx.fillRect(i + 1, j + h, 1, 1 + 3 * ph) })
  })
  ctx.restore()
}

/** a paint bucket on the ground */
export function bucket(ctx, x, y, s, col, a = 1) {
  if (a <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = INK; ctx.fillRect(-36, -70, 72, 70); ctx.fillStyle = '#c8c8d8'; ctx.fillRect(-32, -66, 64, 62)
  ctx.fillStyle = col; ctx.fillRect(-32, -66, 64, 14); ctx.fillRect(-20, -52, 8, 18); ctx.fillRect(10, -52, 6, 10)
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, -66, 34, Math.PI, 0); ctx.stroke()
  ctx.restore()
}

/** a two-column "MEANT / READ" placard row (canvas): left what East End meant, right what Leo read */
export function meantRead(ctx, cx, y, meant, read, k, { w = 900 } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(cx, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5)
  const h = 76
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  ctx.fillStyle = 'rgba(20,12,44,0.97)'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#ff8fb1'; ctx.fillRect(-w / 2, h / 2 - 5, w / 2, 5); ctx.fillStyle = '#ffb86b'; ctx.fillRect(0, h / 2 - 5, w / 2, 5)
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  ctx.font = `700 22px ${MONO}`; ctx.fillStyle = '#ff8fb1'; ctx.fillText('MEANT', -w / 2 + 20, -2); ctx.fillStyle = '#ffb86b'; ctx.fillText('LEO READ', 20, -2)
  ctx.font = `800 32px ${INTER}`; ctx.fillStyle = BONE; ctx.fillText(meant, -w / 2 + 120, 0); ctx.fillText(read, 160, 0)
  ctx.restore()
}
