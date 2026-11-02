// hxasiatown · props: helpers copied from sxhoodmidtown/scenes/props.js (ink, sparkle, chip, the star transform, tears,
// asides, show bug, table, pool, hearts) plus this film's own Asiatown pieces (Bellaire plaza, lanterns, boba, dishes).
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

// ═════════════════════════════════════════ Asiatown pieces (generic: pictogram signs, no names, no brands)
const INK = '#1b1236'
const SHOPS = [
  { x: -10, w: 230, sign: '#ff6f91', pic: 'bowl' }, { x: 220, w: 210, sign: '#6fd6c8', pic: 'cup' }, { x: 430, w: 230, sign: '#ffb86b', pic: 'dumpling' },
  { x: 660, w: 200, sign: '#c9a6ff', pic: 'bun' }, { x: 860, w: 230, sign: '#8fd8f6', pic: 'bowl' },
]
function pictogram(ctx, kind, cx, cy, c, col) {   // tiny pixel food icons for the shop signs (c = cell px)
  ctx.fillStyle = col
  const R = (i, j, w = 1, h = 1) => ctx.fillRect(cx + i * c, cy + j * c, w * c, h * c)
  if (kind === 'bowl') { R(-4, 0, 8, 1); R(-3, 1, 6, 1); R(-2, 2, 4, 1); R(-1, -3, 1, 2); R(1, -3, 1, 2) }
  else if (kind === 'cup') { R(-2, -3, 4, 1); R(-2, -2, 4, 5); R(0, -5, 1, 2); ctx.fillStyle = INK; R(-1, 1, 1, 1); R(1, 0, 1, 1) }
  else if (kind === 'dumpling') { R(-3, 0, 6, 2); R(-2, -1, 4, 1); R(-1, -2, 2, 1); ctx.fillStyle = INK; R(-2, -1, 1, 1); R(1, -1, 1, 1) }
  else { R(-3, -1, 6, 3); R(-2, -2, 4, 1); R(-1, -3, 2, 1) }
}
/** Bellaire Blvd at night: a long strip plaza with pictogram signs, a tall pole sign, a few palms, the wide boulevard */
export function plaza(ctx, t, { y = 1410, alpha = 1, dim = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  // palms behind the plaza
  for (const [px, ph] of [[120, 520], [960, 560], [560, 470]]) {
    ctx.fillStyle = '#140d33'; ctx.fillRect(px - 8, y - ph, 16, ph)
    for (let k = 0; k < 6; k++) { const an = -Math.PI / 2 + (k - 2.5) * 0.55 + 0.03 * Math.sin(t * 1.3 + k); for (let s = 0; s < 9; s++) ctx.fillRect(px + Math.cos(an) * s * 14 - 6, y - ph + Math.sin(an) * s * 14 + s * s * 0.9, 13, 9) }
  }
  // the pole sign: stacked blank coloured panels (each one a pictogram)
  const PX = 760, PT = y - 760
  ctx.fillStyle = INK; ctx.fillRect(PX - 10, PT, 20, 760)
  ;['#ff6f91', '#6fd6c8', '#ffb86b', '#c9a6ff', '#9fe08a'].forEach((c, i) => {
    const yy = PT + i * 62, on = 1 - dim * 0.7
    ctx.fillStyle = INK; ctx.fillRect(PX - 96, yy - 4, 192, 58)
    ctx.globalAlpha = alpha * on; ctx.shadowColor = c; ctx.shadowBlur = 16; ctx.fillStyle = c; ctx.fillRect(PX - 90, yy, 180, 50); ctx.shadowBlur = 0
    pictogram(ctx, ['bowl', 'cup', 'dumpling', 'bun', 'bowl'][i], PX, yy + 26, 5, INK)
    ctx.globalAlpha = alpha
  })
  // the strip of shops
  const top = y - 300
  ctx.fillStyle = '#1d1446'; ctx.fillRect(-10, top, 1100, 300)
  ctx.fillStyle = '#2c1f5e'; ctx.fillRect(-10, top, 1100, 10)
  SHOPS.forEach((s, i) => {
    const on = (1 - dim * 0.75) * (Math.sin(t * 2.3 + i * 1.7) > 0.97 ? 0.6 : 1)
    ctx.fillStyle = INK; ctx.fillRect(s.x + 16, top + 26, s.w - 32, 74)
    ctx.globalAlpha = alpha * on; ctx.shadowColor = s.sign; ctx.shadowBlur = 22; ctx.fillStyle = s.sign; ctx.fillRect(s.x + 22, top + 32, s.w - 44, 62); ctx.shadowBlur = 0
    pictogram(ctx, s.pic, s.x + s.w / 2, top + 64, 6, INK)
    ctx.globalAlpha = alpha
    // awning stripes + a lit window
    for (let k = 0; k < (s.w - 20) / 24; k++) { ctx.fillStyle = k % 2 ? s.sign : BONE; ctx.globalAlpha = alpha * 0.75 * on; ctx.fillRect(s.x + 10 + k * 24, top + 112, 24, 22) }
    ctx.globalAlpha = alpha * (0.55 + 0.45 * (1 - dim)); ctx.fillStyle = '#ffd98a'; ctx.fillRect(s.x + 26, top + 150, s.w - 52, 110)
    ctx.fillStyle = '#e9b866'; for (let k = 0; k < 3; k++) ctx.fillRect(s.x + 26 + k * (s.w - 52) / 3, top + 150, 4, 110)
    ctx.globalAlpha = alpha
  })
  // the boulevard: wide asphalt, lane dashes
  ctx.fillStyle = '#120c2c'; ctx.fillRect(0, y, 1080, 520)
  ctx.fillStyle = '#2b2160'; ctx.fillRect(0, y, 1080, 12)
  ctx.fillStyle = '#3a2d78'; for (let k = 0; k < 9; k++) ctx.fillRect(((k * 160 - t * 40) % 1440 + 1440) % 1440 - 180, y + 150, 90, 8)
  ctx.restore()
}

/** a string of paper lanterns sagging between x0 and x1 at height y (sway; lit 0…1) */
export function lanterns(ctx, t, x0, x1, y, { a = 1, lit = 1, n = 7, sag = 60, cols = ['#ff6f6f', '#ffb86b', '#ff8fb1'] } = {}) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.strokeStyle = '#3a2d78'; ctx.lineWidth = 3; ctx.beginPath()
  for (let i = 0; i <= 40; i++) { const u = i / 40, xx = x0 + (x1 - x0) * u, yy = y + sag * 4 * u * (1 - u); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy) }
  ctx.stroke()
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n, lx = x0 + (x1 - x0) * u, ly = y + sag * 4 * u * (1 - u) + 6, sw = 3 * Math.sin(t * 1.6 + i)
    const c = cols[i % cols.length]
    ctx.save(); ctx.translate(lx + sw, ly)
    ctx.shadowColor = c; ctx.shadowBlur = 26 * lit
    ctx.fillStyle = INK; ctx.fillRect(-20, 6, 40, 46)
    ctx.fillStyle = c; ctx.globalAlpha *= 0.55 + 0.45 * lit; ctx.fillRect(-16, 10, 32, 38)
    ctx.shadowBlur = 0; ctx.fillStyle = '#fff3c4'; ctx.globalAlpha *= lit; ctx.fillRect(-6, 18, 12, 20)
    ctx.restore()
    ctx.fillStyle = INK; ctx.fillRect(lx + sw - 12, ly, 24, 8); ctx.fillRect(lx + sw - 12, ly + 50, 24, 6)
  }
  ctx.restore()
}

/** a pixel bubble tea (boba) centred on its base (x, y): s = scale; straws 1 or 2 (the ending: a second straw) */
export function boba(ctx, x, y, s, t, { a = 1, straws = 1, level = 1, rot = 0, col = '#d9a87a' } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  const strawCols = ['#ff6f91', '#6fd6c8']
  for (let k = 0; k < straws; k++) { const dx = straws === 2 ? (k ? 12 : -12) : 6, lean = straws === 2 ? (k ? 0.22 : -0.22) : 0.12
    ctx.save(); ctx.translate(dx, -96); ctx.rotate(lean); ctx.fillStyle = INK; ctx.fillRect(-7, -66, 14, 82); ctx.fillStyle = strawCols[k]; ctx.fillRect(-4, -62, 8, 74); ctx.restore() }
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-40, -104); ctx.lineTo(40, -104); ctx.lineTo(30, 4); ctx.lineTo(-30, 4); ctx.fill()
  ctx.fillStyle = 'rgba(239,230,214,0.35)'; ctx.beginPath(); ctx.moveTo(-34, -98); ctx.lineTo(34, -98); ctx.lineTo(26, -2); ctx.lineTo(-26, -2); ctx.fill()
  const top = -2 - 92 * level
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-26 - 8 * level * 0.98, top); ctx.lineTo(26 + 8 * level * 0.98, top); ctx.lineTo(26, -2); ctx.lineTo(-26, -2); ctx.fill()
  ctx.fillStyle = '#2a1608'
  for (let i = 0; i < 9; i++) { const bx = -20 + (i % 5) * 10 + (i > 4 ? 5 : 0), by = -12 - (i > 4 ? 10 : 0) + Math.sin(t * 2 + i) * 1.5; ctx.fillRect(bx - 4, by - 4, 8, 8) }
  ctx.fillStyle = BONE; ctx.fillRect(-44, -110, 88, 8)
  ctx.fillStyle = '#ffffff'; ctx.globalAlpha *= 0.5; ctx.fillRect(-28, -90, 6, 60)
  ctx.restore()
}

/** a bowl of noodle soup centred on its base (x, y), with steam; big = the shared bowl */
export function noodleBowl(ctx, x, y, s, t, { a = 1, steam = 1, col = '#ff6f91' } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
  for (let k = 0; k < 3; k++) {          // steam wisps (pixel squares drifting up)
    for (let q = 0; q < 5; q++) { const ph = ((t * 0.6 + q / 5 + k * 0.31) % 1), sx = (k - 1) * 26 + Math.sin(ph * 6 + k) * 10, sy = -64 - ph * 90
      ctx.fillStyle = `rgba(239,230,214,${0.35 * steam * Math.sin(Math.PI * ph)})`; ctx.fillRect(sx - 6, sy - 6, 12, 12) }
  }
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-74, -54); ctx.lineTo(74, -54); ctx.quadraticCurveTo(70, 6, 0, 8); ctx.quadraticCurveTo(-70, 6, -74, -54); ctx.fill()
  ctx.fillStyle = BONE; ctx.beginPath(); ctx.moveTo(-68, -50); ctx.lineTo(68, -50); ctx.quadraticCurveTo(62, 0, 0, 2); ctx.quadraticCurveTo(-62, 0, -68, -50); ctx.fill()
  ctx.fillStyle = col; ctx.fillRect(-60, -30, 120, 8)
  ctx.fillStyle = '#e9a64a'; ctx.fillRect(-64, -56, 128, 10)                 // broth line
  ctx.fillStyle = '#ffe3a0'; for (let i = 0; i < 6; i++) ctx.fillRect(-50 + i * 18, -64 + (i % 2) * 4, 14, 8)   // noodles
  ctx.fillStyle = '#9fe08a'; ctx.fillRect(16, -66, 14, 8); ctx.fillRect(-30, -64, 10, 6)                    // herbs
  ctx.fillStyle = INK; ctx.fillRect(-14, 2, 28, 10)
  ctx.restore()
}

/** a bamboo steamer of dumplings (or bao) centred on its base */
export function steamer(ctx, x, y, s, t, { a = 1, bao = false } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = INK; ctx.fillRect(-62, -44, 124, 48)
  ctx.fillStyle = '#c99a55'; ctx.fillRect(-58, -40, 116, 40)
  ctx.fillStyle = '#a77a3a'; for (let i = 0; i < 6; i++) ctx.fillRect(-58 + i * 20, -40, 4, 40)
  for (let i = 0; i < 3; i++) {
    const dx = -38 + i * 38
    ctx.fillStyle = INK; ctx.fillRect(dx - 18, -66, 36, 26)
    ctx.fillStyle = bao ? '#fff6e6' : '#f7ecd4'; ctx.fillRect(dx - 15, -63, 30, 22)
    if (!bao) { ctx.fillStyle = '#e3cfa6'; ctx.fillRect(dx - 3, -66, 6, 6) } else { ctx.fillStyle = '#ff8fb1'; ctx.fillRect(dx - 3, -58, 6, 4) }
  }
  ctx.restore()
}

/** skewers on a little plate */
export function skewers(ctx, x, y, s, a = 1) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = INK; ctx.fillRect(-64, -10, 128, 14); ctx.fillStyle = BONE; ctx.fillRect(-60, -8, 120, 8)
  for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-30 + i * 30, -14); ctx.rotate(-0.5); ctx.fillStyle = '#c99a55'; ctx.fillRect(-3, -70, 6, 80)
    for (let k = 0; k < 3; k++) { ctx.fillStyle = INK; ctx.fillRect(-11, -62 + k * 20, 22, 18); ctx.fillStyle = k % 2 ? '#e07a3a' : '#b8532a'; ctx.fillRect(-8, -59 + k * 20, 16, 12) }
    ctx.restore() }
  ctx.restore()
}

/** a pair of chopsticks (rot radians), tips at (x, y) */
export function chopsticks(ctx, x, y, s, rot, a = 1, col = '#e9b866') {
  if (a <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  for (const d of [-7, 7]) { ctx.fillStyle = INK; ctx.fillRect(d - 5, -150, 10, 152); ctx.fillStyle = col; ctx.fillRect(d - 2, -146, 4, 146) }
  ctx.restore()
}

/** the crawl list: a paper scroll hanging from (x, y), unrolled to len px, items typed in mono (as many as fit) */
export function crawlList(ctx, x, y, w, len, items, { a = 1, struck = 0, title = 'THE CRAWL' } = {}) {
  if (a <= 0 || len <= 4) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.fillStyle = INK; ctx.fillRect(x - w / 2 - 6, y - 6, w + 12, len + 12)
  ctx.fillStyle = '#f7ecd4'; ctx.fillRect(x - w / 2, y, w, len)
  ctx.fillStyle = '#e3cfa6'; for (let yy = y + 30; yy < y + len; yy += 46) ctx.fillRect(x - w / 2 + 12, yy + 30, w - 24, 2)
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y, w, len); ctx.clip()
  ctx.fillStyle = '#b8532a'; ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(title, x, y + 28)
  ctx.textAlign = 'left'; ctx.font = `700 24px ${MONO}`
  items.forEach((s, i) => { const yy = y + 74 + i * 46; ctx.fillStyle = INK; ctx.fillRect(x - w / 2 + 18, yy - 9, 16, 16); ctx.fillStyle = '#f7ecd4'; ctx.fillRect(x - w / 2 + 21, yy - 6, 10, 10); ctx.fillStyle = INK; ctx.fillText(s, x - w / 2 + 46, yy)
    if (i < struck) { ctx.fillStyle = '#ff6f91'; ctx.fillRect(x - w / 2 + 16, yy - 2, w - 34, 4) } })
  ctx.restore()
  // the roll at the bottom
  ctx.fillStyle = INK; ctx.fillRect(x - w / 2 - 12, y + len - 8, w + 24, 26); ctx.fillStyle = '#e3cfa6'; ctx.fillRect(x - w / 2 - 8, y + len - 4, w + 16, 18)
  ctx.restore()
}
