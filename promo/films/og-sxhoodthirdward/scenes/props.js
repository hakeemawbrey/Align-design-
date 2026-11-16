// sxhoodthirdward · props: helpers copied from sxhoodeado/scenes/props.js (ink, sparkle, chip, the star transform, tears,
// asides, show bug, pool, hearts), the aunties' reading glasses from stawards, plus this film's porch street pieces.
import { clamp, lerp, rng } from '../../../src/lib.js'
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


// ───────────────────────────────────────── Third Ward: a generic street of shotgun houses with deep front porches
const HOUSES = [
  { x: -10, w: 370, wall: '#5a3d6e', trim: '#efe6d6' },
  { x: 355, w: 370, wall: '#2f5a6e', trim: '#ffd98a' },
  { x: 720, w: 370, wall: '#6e3d45', trim: '#efe6d6' },
]
export const PORCH_Y = 1330
/** the houses (walls, gables, windows, porch roof, posts, rails, steps); curtain(i) → 0…1 how far house i's curtain twitches */
export function houses(ctx, t, { a = 1, lit = 1, curtain = () => 0 } = {}) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  HOUSES.forEach((h, i) => {
    const L = h.x, R = h.x + h.w, top = 930, y = PORCH_Y
    // wall + gable
    ctx.fillStyle = h.wall; ctx.fillRect(L + 20, top, h.w - 40, y - top)
    ctx.fillStyle = '#1b1236'; ctx.beginPath(); ctx.moveTo(L, top + 6); ctx.lineTo((L + R) / 2, top - 150); ctx.lineTo(R, top + 6); ctx.closePath(); ctx.fill()
    ctx.fillStyle = h.wall; ctx.beginPath(); ctx.moveTo(L + 22, top); ctx.lineTo((L + R) / 2, top - 132); ctx.lineTo(R - 22, top); ctx.closePath(); ctx.fill()
    ctx.fillStyle = 'rgba(0,0,0,0.18)'; for (let j = top - 120; j < y; j += 18) ctx.fillRect(L + 20, j, h.w - 40, 3)     // clapboard
    // gable vent
    ctx.fillStyle = h.trim; ctx.fillRect((L + R) / 2 - 22, top - 70, 44, 30); ctx.fillStyle = '#1b1236'; for (let k = 0; k < 4; k++) ctx.fillRect((L + R) / 2 - 18, top - 66 + k * 7, 36, 3)
    // tall windows + door, warm light
    const win = (wx, curt) => {
      ctx.fillStyle = '#1b1236'; ctx.fillRect(wx - 6, top + 60, 82, 150)
      ctx.fillStyle = lit > 0 ? '#ffd98a' : '#2a1d4e'; ctx.fillRect(wx, top + 66, 70, 138)
      ctx.fillStyle = '#ffeec2'; ctx.fillRect(wx, top + 66, 70, 10)
      // curtains (twitch open a crack when the neighbors peek)
      ctx.fillStyle = '#c2459a'; const op = 8 + 22 * curt
      ctx.fillRect(wx, top + 66, 35 - op, 138); ctx.fillRect(wx + 35 + op, top + 66, 35 - op, 138)
      ctx.fillStyle = '#1b1236'; ctx.fillRect(wx + 33, top + 66, 4, 138 * (1 - curt)); ctx.fillRect(wx, top + 132, 70, 4)
    }
    win(L + 60, 0); win(R - 140, curtain(i))
    ctx.fillStyle = '#1b1236'; ctx.fillRect((L + R) / 2 - 40, top + 80, 80, y - top - 80)
    ctx.fillStyle = '#3b2a20'; ctx.fillRect((L + R) / 2 - 34, top + 86, 68, y - top - 86)
    ctx.fillStyle = '#ffd98a'; ctx.fillRect((L + R) / 2 + 18, top + 190, 8, 8)
    // porch roof + posts + rail
    const pr = top + 250
    ctx.fillStyle = '#1b1236'; ctx.fillRect(L + 4, pr - 14, h.w - 8, 26)
    ctx.fillStyle = h.trim; ctx.fillRect(L + 8, pr - 10, h.w - 16, 16)
    for (const px of [L + 20, (L + R) / 2 - 90, (L + R) / 2 + 80, R - 34]) { ctx.fillStyle = '#1b1236'; ctx.fillRect(px - 2, pr, 18, y - pr); ctx.fillStyle = h.trim; ctx.fillRect(px + 2, pr, 10, y - pr) }
    ctx.fillStyle = h.trim
    for (const [a0, a1] of [[L + 20, (L + R) / 2 - 90], [(L + R) / 2 + 80, R - 34]]) {
      ctx.fillRect(a0, y - 70, a1 - a0, 8)
      for (let bx = a0 + 16; bx < a1; bx += 20) ctx.fillRect(bx, y - 62, 5, 62)
    }
    // porch floor + steps
    ctx.fillStyle = '#1b1236'; ctx.fillRect(L, y, h.w, 26)
    ctx.fillStyle = '#8a6a4a'; ctx.fillRect(L + 4, y + 2, h.w - 8, 18)
    ctx.fillStyle = '#6b4f38'; ctx.fillRect((L + R) / 2 - 60, y + 26, 120, 22); ctx.fillRect((L + R) / 2 - 76, y + 48, 152, 22)
  })
  ctx.fillStyle = '#1d1440'; ctx.fillRect(0, PORCH_Y + 70, 1080, 260)       // the sidewalk / yard
  ctx.fillStyle = '#2b2160'; ctx.fillRect(0, PORCH_Y + 70, 1080, 8)
  ctx.restore()
}

/** a big oak overhead: dark leafy canopy along the top of the street, gently swaying */
export function oak(ctx, t, a = 1) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.fillStyle = '#1a1030'; ctx.fillRect(-20, 640, 54, 760)                                  // trunk at the far left
  ctx.fillStyle = '#24163e'; ctx.fillRect(-20, 640, 20, 760)
  const r = rng(5)
  for (let i = 0; i < 16; i++) {
    const cx = -80 + r() * 380, cy = 600 + r() * 150 + Math.sin(t * 0.8 + i) * 4, R = 44 + r() * 50
    ctx.fillStyle = i % 3 ? '#182a26' : '#20362c'
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill()
  }
  // a branch reaching right
  ctx.fillStyle = '#1a1030'; ctx.beginPath(); ctx.moveTo(10, 700); ctx.quadraticCurveTo(200, 640, 420, 660); ctx.lineTo(420, 672); ctx.quadraticCurveTo(200, 660, 10, 724); ctx.fill()
  ctx.restore()
}

/** music notes drifting up out of a window at (x, y) */
export function notes(ctx, t, x, y, a = 1, seed = 0) {
  if (a <= 0) return
  for (let i = 0; i < 5; i++) {
    const p = ((t * 0.32 + i / 5 + seed * 0.13) % 1)
    const nx = x + Math.sin(p * 6 + i * 2) * 50 + p * 120, ny = y - p * 380
    ctx.save(); ctx.globalAlpha *= a * Math.sin(Math.PI * p); ctx.translate(Math.round(nx), Math.round(ny))
    ctx.fillStyle = i % 2 ? GOLD : '#ffeec2'
    const c = 6
    ctx.fillRect(0, 0, 3 * c, 2 * c); ctx.fillRect(2 * c, -5 * c, c, 6 * c)
    if (i % 2) { ctx.fillRect(2 * c, -5 * c, 3 * c, c); ctx.fillRect(4 * c, -5 * c, c, 5 * c); ctx.fillRect(2 * c + 2 * c, 0, 3 * c, 2 * c) }
    else ctx.fillRect(3 * c, -4 * c, c, 2 * c)
    ctx.restore()
  }
}

// the aunties' reading glasses (sprite cells; from stawards/scenes/props.js)
const LENS = [[8, 14], [19, 14]], LW = 9, LH = 9
export function glassesCells(ctx, { up = 0, frame = '#7a1f3d' } = {}) {
  ctx.save(); ctx.translate(0, -lerp(0, 11, clamp(up)))
  for (const [lx, ly] of LENS) {
    ctx.fillStyle = rgba('#bfefff', 0.18); ctx.fillRect(lx + 1, ly + 1, LW - 2, LH - 2)
    ctx.fillStyle = frame
    for (let i = 0; i < LW; i++) for (let j = 0; j < LH; j++) {
      const edge = i === 0 || j === 0 || i === LW - 1 || j === LH - 1, corner = (i === 0 || i === LW - 1) && (j === 0 || j === LH - 1)
      if (edge && !corner) ctx.fillRect(lx + i, ly + j, 1.02, 1.02)
    }
    ctx.fillStyle = '#ffd98a'; ctx.fillRect(lx + 2, ly + 1, 1, 1); ctx.fillRect(lx + 1, ly + 2, 1, 1)
  }
  ctx.fillStyle = frame; ctx.fillRect(17, 16, 2, 1); ctx.fillRect(6, 16, 2, 1); ctx.fillRect(28, 16, 2, 1)
  ctx.restore()
}
/** a flat cap on the top point (sprite cells) */
export function capCells(ctx, col = '#4a5a3a') {
  ctx.fillStyle = '#1b1236'; ctx.fillRect(11, -1, 15, 6); ctx.fillRect(22, 2, 9, 3)
  ctx.fillStyle = col; ctx.fillRect(12, 0, 13, 4); ctx.fillStyle = '#6b7f52'; ctx.fillRect(13, 0, 6, 1)
  ctx.fillStyle = '#3a4a2c'; ctx.fillRect(23, 3, 7, 1)
}
/** a little bow tie under the face (sprite cells) */
export function bowCells(ctx, col = '#d6334f') {
  ctx.fillStyle = '#1b1236'; ctx.fillRect(12, 25, 12, 6)
  ctx.fillStyle = col; ctx.fillRect(13, 26, 4, 4); ctx.fillRect(19, 26, 4, 4); ctx.fillStyle = '#ff6b7f'; ctx.fillRect(17, 27, 2, 2)
}
/** a sweat drop beside the head (sprite cells) */
export function sweatCells(ctx, t) {
  const p = (t * 1.2) % 1
  ctx.fillStyle = '#1b1236'; ctx.fillRect(29, 9 + p * 6, 3, 4); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(29.5, 9.5 + p * 6, 2, 3)
}

/** a full dinner plate (generic: greens, cornbread, a scoop of something warm), centred at (x, y) */
export function plate(ctx, x, y, s, a = 1) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = '#1b1236'; ctx.beginPath(); ctx.ellipse(0, 0, 80, 34, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = BONE; ctx.beginPath(); ctx.ellipse(0, -2, 74, 29, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#3f7a3a'; ctx.fillRect(-52, -22, 34, 18); ctx.fillStyle = '#5fa04e'; ctx.fillRect(-48, -26, 20, 8)
  ctx.fillStyle = '#e9b44a'; ctx.fillRect(-8, -24, 30, 22); ctx.fillStyle = '#f7d27a'; ctx.fillRect(-8, -24, 30, 6)
  ctx.fillStyle = '#c96a3a'; ctx.fillRect(28, -20, 28, 18); ctx.fillStyle = '#e08a52'; ctx.fillRect(32, -24, 18, 6)
  // steam
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  for (let k = 0; k < 3; k++) ctx.fillRect(-20 + k * 26, -48 - (k % 2) * 8, 5, 14)
  ctx.restore()
}

/** a baby photo held up: a tiny star in a bow, in a white frame, centred at (x, y) */
export function babyPhoto(ctx, x, y, s, rot, col, t, a = 1) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = '#1b1236'; ctx.fillRect(-96, -96, 192, 212)
  ctx.fillStyle = '#f6efe2'; ctx.fillRect(-90, -90, 180, 200)
  ctx.fillStyle = '#9fd8e8'; ctx.fillRect(-76, -76, 152, 140)
  ctx.fillStyle = '#7fbf6a'; ctx.fillRect(-76, 30, 152, 34)
  drawPixelStar(ctx, 0, -6, 92, 0, col)
  ctx.fillStyle = '#1b1236'; ctx.fillRect(-14, -12, 6, 8); ctx.fillRect(8, -12, 6, 8)
  ctx.fillStyle = '#ff6fa8'; ctx.fillRect(-16, -50, 12, 12); ctx.fillRect(4, -50, 12, 12); ctx.fillStyle = '#d6336f'; ctx.fillRect(-4, -46, 8, 6)
  ctx.fillStyle = '#5a4a3a'; ctx.font = `700 18px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('AGE 2', 0, 88)
  ctx.restore()
}

/** string lights swagged between x0 and x1 along y (sag) */
export function stringLights(ctx, t, x0, x1, y, sag, k, a = 1) {
  if (a <= 0 || k <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  const n = 14, cols = ['#ffd98a', '#ff8fb1', '#8fd8f6', '#9fe08a', '#ffb86b']
  ctx.strokeStyle = '#1b1236'; ctx.lineWidth = 4; ctx.beginPath()
  for (let i = 0; i <= 40 * k; i++) { const u = i / 40, xx = x0 + (x1 - x0) * u, yy = y + Math.sin(Math.PI * u) * sag; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy) }
  ctx.stroke()
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n
    if (u > k) break
    const xx = x0 + (x1 - x0) * u, yy = y + Math.sin(Math.PI * u) * sag + 8
    ctx.shadowColor = cols[i % 5]; ctx.shadowBlur = 16
    ctx.globalAlpha = a * (0.75 + 0.25 * Math.sin(t * 3 + i))
    ctx.fillStyle = cols[i % 5]; ctx.fillRect(xx - 6, yy, 12, 14)
  }
  ctx.restore()
}
