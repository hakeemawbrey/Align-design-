// hxdowntown · props: helpers copied from sxhoodmidtown/scenes/props.js (ink, sparkle, chip, the star transform, tears,
// asides, show bug, table, pool, hearts) plus this film's own Downtown pieces (the cutaway: towers above, the tunnel below).
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

// ═════════════════════════════════════════ Downtown pieces (generic: no names, no brands)
const INK = '#1b1236'

/** the sky above street level, tinted: day 0…1 (pale blue), sunset 0…1 (pink → amber at the horizon); g = street y */
export function skyTint(ctx, g, { day = 0, sunset = 0, alpha = 1 } = {}) {
  if (alpha <= 0 || (day <= 0 && sunset <= 0)) return
  ctx.save(); ctx.globalAlpha *= alpha
  if (day > 0) { const G = ctx.createLinearGradient(0, 0, 0, g); G.addColorStop(0, `rgba(88,120,200,${0.75 * day})`); G.addColorStop(1, `rgba(170,200,240,${0.8 * day})`); ctx.fillStyle = G; ctx.fillRect(0, 0, 1080, g) }
  if (sunset > 0) { const G = ctx.createLinearGradient(0, 0, 0, g); G.addColorStop(0, `rgba(60,30,110,${0.5 * sunset})`); G.addColorStop(0.55, `rgba(255,111,145,${0.7 * sunset})`); G.addColorStop(1, `rgba(255,184,107,${0.9 * sunset})`); ctx.fillStyle = G; ctx.fillRect(0, 0, 1080, g)
    ctx.globalCompositeOperation = 'lighter'; const S = ctx.createRadialGradient(540, g - 40, 10, 540, g - 40, 380); S.addColorStop(0, `rgba(255,214,150,${0.55 * sunset})`); S.addColorStop(1, 'rgba(255,214,150,0)'); ctx.fillStyle = S; ctx.fillRect(0, g - 420, 1080, 420) }
  ctx.restore()
}

const TOWERS = [
  { x: -30, w: 170, h: 520 }, { x: 130, w: 120, h: 700, spire: true }, { x: 240, w: 150, h: 600 }, { x: 380, w: 130, h: 760, step: true },
  { x: 500, w: 160, h: 640 }, { x: 650, w: 120, h: 820, spire: true }, { x: 760, w: 160, h: 560 }, { x: 910, w: 190, h: 680, step: true },
]
/** downtown towers standing on the street at y = g (glass grids; lit 0…1; glint = sunset reflection) + the sidewalk */
export function towers(ctx, t, g, { alpha = 1, lit = 0.3, glint = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  TOWERS.forEach((b, bi) => {
    const T0 = g - b.h * 0.62
    ctx.fillStyle = '#1a1140'; ctx.fillRect(b.x, T0, b.w, g - T0)
    if (b.step) { ctx.fillRect(b.x + 20, T0 - 50, b.w - 40, 50); ctx.fillRect(b.x + 44, T0 - 90, b.w - 88, 40) }
    if (b.spire) { ctx.fillRect(b.x + b.w / 2 - 4, T0 - 110, 8, 110); ctx.globalAlpha = alpha * (Math.sin(t * 4 + bi) > 0 ? 1 : 0.3); ctx.fillStyle = '#ff3d6e'; ctx.fillRect(b.x + b.w / 2 - 5, T0 - 118, 10, 10); ctx.globalAlpha = alpha }
    ctx.fillStyle = '#2c1f5e'; ctx.fillRect(b.x, T0, 4, g - T0)
    for (let j = 0; T0 + 16 + j * 26 < g - 20; j++) for (let i = 0; b.x + 12 + i * 20 < b.x + b.w - 12; i++) {
      const h = Math.sin(bi * 91.7 + i * 12.9898 + j * 78.233) * 43758.5453, r = h - Math.floor(h)
      ctx.globalAlpha = alpha * (r < lit ? 0.9 : 0.25)
      ctx.fillStyle = r < lit ? '#ffd98a' : '#3a2d78'
      ctx.fillRect(b.x + 12 + i * 20, T0 + 16 + j * 26, 12, 16)
    }
    if (glint > 0) { ctx.globalAlpha = alpha * glint * 0.55; ctx.fillStyle = '#ffb86b'; ctx.fillRect(b.x + b.w * 0.55, T0, b.w * 0.45, g - T0) }
    ctx.globalAlpha = alpha
  })
  ctx.fillStyle = '#2b2160'; ctx.fillRect(0, g - 10, 1080, 14)
  ctx.restore()
}

/** a stairwell entrance down to the tunnel at x (rail + a little sign with a down arrow) on the street at g */
export function stairs(ctx, x, g, { alpha = 1, glow = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = INK; ctx.fillRect(x - 90, g - 70, 8, 70); ctx.fillRect(x + 82, g - 70, 8, 70); ctx.fillRect(x - 90, g - 72, 180, 8)
  ctx.fillStyle = '#2a3f8f'; ctx.fillRect(x - 40, g - 170, 80, 60); ctx.fillStyle = INK; ctx.fillRect(x - 4, g - 110, 8, 40)
  ctx.fillStyle = BONE; ctx.fillRect(x - 6, g - 160, 12, 26); ctx.beginPath(); ctx.moveTo(x - 18, g - 136); ctx.lineTo(x + 18, g - 136); ctx.lineTo(x, g - 118); ctx.fill()
  if (glow > 0) { ctx.globalCompositeOperation = 'lighter'; const G = ctx.createRadialGradient(x, g, 5, x, g, 160); G.addColorStop(0, `rgba(255,214,150,${0.5 * glow})`); G.addColorStop(1, 'rgba(255,214,150,0)'); ctx.fillStyle = G; ctx.fillRect(x - 160, g - 160, 320, 320) }
  ctx.restore()
}

/** the ground slab + the tunnel cut below the street (g): ceiling lights + storefront panels scroll by `scroll` px,
 *  wayfinding arrows on the wall; the stairwell shaft at sx connects it to the street */
export function tunnel(ctx, t, g, scroll, { alpha = 1, sx = 860, depth = 500 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const top = g + 50, bot = g + depth
  ctx.fillStyle = '#3b2a1e'; ctx.fillRect(0, g, 1080, 50)                         // earth / slab
  ctx.fillStyle = '#2a1d14'; for (let i = 0; i < 30; i++) ctx.fillRect((i * 97) % 1080, g + 10 + (i * 31) % 30, 14, 8)
  ctx.fillStyle = '#241a4e'; ctx.fillRect(0, top, 1080, depth - 50)              // the tunnel
  ctx.fillStyle = '#2f2462'; ctx.fillRect(0, top, 1080, 40)
  const m = v => ((v % 1080) + 1080) % 1080
  for (let i = 0; i < 6; i++) { const lx = m(i * 200 - scroll); ctx.fillStyle = '#fff3d6'; ctx.shadowColor = '#fff3d6'; ctx.shadowBlur = 20; ctx.fillRect(lx - 50, top + 6, 100, 10); ctx.shadowBlur = 0 }
  const COLS = ['#ff8fb1', '#8fd8f6', '#ffb86b', '#9fe08a', '#c9a6ff']
  for (let i = 0; i < 5; i++) { const px = m(i * 260 - scroll * 0.9) - 100; ctx.fillStyle = INK; ctx.fillRect(px - 4, top + 66, 188, 160); ctx.fillStyle = '#ffd98a'; ctx.globalAlpha = alpha * 0.85; ctx.fillRect(px, top + 70, 180, 152); ctx.globalAlpha = alpha
    ctx.fillStyle = COLS[i]; ctx.fillRect(px, top + 70, 180, 28); ctx.fillStyle = '#e9b866'; ctx.fillRect(px + 88, top + 98, 4, 124) }
  // the floor (shiny tiles)
  ctx.fillStyle = '#3a2d78'; ctx.fillRect(0, bot - 50, 1080, 50)
  ctx.fillStyle = '#4b3d8a'; for (let i = 0; i < 14; i++) ctx.fillRect(m(i * 90 - scroll * 1.1), bot - 50, 4, 50)
  // the stairwell shaft up to the street (warm light spills down at sunset)
  ctx.fillStyle = '#1b1236'; ctx.fillRect(sx - 80, g, 160, 70)
  for (let k = 0; k < 6; k++) { ctx.fillStyle = k % 2 ? '#4b3d8a' : '#3a2d78'; ctx.fillRect(sx - 76 + k * 8, g + k * 12, 152 - k * 16, 12) }
  ctx.fillStyle = '#120c2c'; ctx.fillRect(0, bot, 1080, 1920)
  ctx.restore()
}

/** a briefcase (handle up), centred at (x, y) */
export function briefcase(ctx, x, y, s, rot = 0, a = 1) {
  if (a <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = INK; ctx.fillRect(-48, -34, 96, 70); ctx.fillRect(-18, -50, 36, 20)
  ctx.fillStyle = '#7a4a2a'; ctx.fillRect(-44, -30, 88, 62); ctx.fillStyle = '#5a3420'; ctx.fillRect(-44, -4, 88, 6)
  ctx.fillStyle = '#7a4a2a'; ctx.fillRect(-12, -46, 24, 6); ctx.fillStyle = GOLD; ctx.fillRect(-6, -8, 12, 10)
  ctx.restore()
}
/** a to-go coffee cup */
export function coffee(ctx, x, y, s, rot = 0, a = 1, t = 0) {
  if (a <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-26, -40); ctx.lineTo(26, -40); ctx.lineTo(20, 30); ctx.lineTo(-20, 30); ctx.fill()
  ctx.fillStyle = BONE; ctx.beginPath(); ctx.moveTo(-22, -36); ctx.lineTo(22, -36); ctx.lineTo(17, 26); ctx.lineTo(-17, 26); ctx.fill()
  ctx.fillStyle = '#8fd8f6'; ctx.fillRect(-20, -12, 40, 14); ctx.fillStyle = INK; ctx.fillRect(-30, -50, 60, 12)
  for (let q = 0; q < 3; q++) { const ph = (t * 0.9 + q / 3) % 1; ctx.fillStyle = `rgba(239,230,214,${0.4 * Math.sin(Math.PI * ph)})`; ctx.fillRect(-6 + Math.sin(ph * 6 + q) * 6, -60 - ph * 50, 8, 8) }
  ctx.restore()
}
/** motion streaks trailing behind a runner (dir −1 = streaks to the left) */
export function speedLines(ctx, x, y, t, k, dir = -1) {
  if (k <= 0) return
  ctx.save(); ctx.globalAlpha *= 0.6 * k; ctx.fillStyle = BONE
  for (let i = 0; i < 7; i++) { const yy = y - 90 + i * 30, len = 80 + ((i * 53 + Math.floor(t * 12) * 17) % 90); ctx.fillRect(x + dir * (130 + (i % 3) * 20), yy, dir * len, 5) }
  ctx.restore()
}
