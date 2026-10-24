// htxenergy · line-art props (bold, friendly, thick glowing strokes, flat fills, no faces, no logos).
// Every draw fn is a pure function of its arguments (the lightning jitter is keyed to a quantised t).
import { clamp, rng, noise1 } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', BLUE = '#8fd8f6', ROSE = '#f59cc4', VIOLET = '#9a7be0', LAV = '#c9a6ff'
export const ELEC = '#ffe36e', CYAN = '#7ff3ff', WHITE = '#fff8ea'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
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
  ctx.globalAlpha = clamp(a)
  const s = ctx.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.45, color); s.addColorStop(1, rgba(color, 0.85))
  ctx.fillStyle = s; ctx.beginPath(); ctx.arc(px, py, r, 0, TAU); ctx.fill()
  ctx.restore()
}

/** a pictogram person (no face), feet at (x, y), ~270 units tall at s = 1. lean tilts from the feet (radians). */
export function person(ctx, x, y, s, { body = LAV, line = BONE, a = 1, sq = 1, w = 8, lean = 0, glow = 10 } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(lean); ctx.scale(s / sq, s * sq); ctx.globalAlpha *= a
  ctx.beginPath(); ctx.moveTo(-46, 0); ctx.lineTo(-40, -150); ctx.quadraticCurveTo(-40, -186, 0, -188); ctx.quadraticCurveTo(40, -186, 40, -150); ctx.lineTo(46, 0); ctx.closePath()
  ink(ctx, line, { w, fa: 0.45, fill: body, glow })
  ctx.beginPath(); ctx.arc(0, -232, 36, 0, TAU); ink(ctx, line, { w, fa: 0.9, fill: line, glow })
  ctx.restore()
}

/** a label chip (mono caps on a dark pill) centred at (x, y) */
export function chip(ctx, x, y, text, k, { size = 26, col = BONE, edge = LAV } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const w = ctx.measureText(text).width + size * 1.1, h = size * 1.6
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2)
  ctx.fillStyle = 'rgba(14,9,34,0.9)'; ctx.fill(); ink(ctx, edge, { w: 3.5, fa: 0, glow: 12 })
  ctx.fillStyle = col; ctx.fillText(text, 0, 1)
  ctx.restore()
}

/** a crackling lightning bolt along path(u) (u 0..1 → {x, y}), drawn from u0 to u1.
 *  The jitter re-rolls `fps` times a second (keyed to floor(t·fps)), so it is a pure function of t. */
export function bolt(ctx, path, t, { col = ELEC, w = 10, amp = 26, seed = 1, u0 = 0, u1 = 1, n = 22, fps = 18, a = 1, branches = 2, core = WHITE } = {}) {
  if (a <= 0 || u1 <= u0) return
  const r = rng(seed * 7919 + Math.floor(t * fps) * 131)
  const pts = []
  for (let i = 0; i <= n; i++) {
    const u = u0 + (u1 - u0) * (i / n)
    const p = path(u), q = path(Math.min(1, u + 0.01)), q0 = path(Math.max(0, u - 0.01))
    let nx = -(q.y - q0.y), ny = q.x - q0.x
    const L = Math.hypot(nx, ny) || 1; nx /= L; ny /= L
    const taper = Math.pow(Math.sin(Math.PI * u), 0.6)
    const off = (i === 0 || i === n) ? 0 : (r() - 0.5) * 2 * amp * taper
    pts.push({ x: p.x + nx * off, y: p.y + ny * off, nx, ny })
  }
  const stroke = (list, lw, glowCol, coreCol, glow) => {
    ctx.beginPath(); list.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'
    ctx.shadowColor = glowCol; ctx.shadowBlur = glow
    ctx.strokeStyle = glowCol; ctx.lineWidth = lw; ctx.stroke()
    ctx.shadowBlur = 0
    ctx.strokeStyle = coreCol; ctx.lineWidth = Math.max(1.5, lw * 0.36); ctx.stroke()
  }
  ctx.save(); ctx.globalAlpha *= clamp(a)
  stroke(pts, w, col, core, 30)
  for (let b = 0; b < branches; b++) {
    const i0 = 2 + Math.floor(r() * (n - 4)), p = pts[i0], side = r() < 0.5 ? -1 : 1, len = 2 + Math.floor(r() * 2)
    const br = [p]
    let cx = p.x, cy = p.y
    const dx = (pts[Math.min(n, i0 + 1)].x - p.x), dy = (pts[Math.min(n, i0 + 1)].y - p.y)
    for (let k = 0; k < len; k++) { cx += dx * 0.55 + p.nx * side * (9 + r() * 12); cy += dy * 0.55 + p.ny * side * (9 + r() * 12); br.push({ x: cx, y: cy }) }
    stroke(br, w * 0.5, col, core, 18)
  }
  ctx.restore()
}

// ───────────────────────── a generic night skyline (invented tower shapes, no logos), standing on y = 0
export const TOWERS = [
  { x: 40, w: 100, h: 300, top: 'flat' }, { x: 145, w: 92, h: 440, top: 'slant' }, { x: 248, w: 112, h: 560, top: 'step' },
  { x: 360, w: 96, h: 700, top: 'spire' }, { x: 478, w: 128, h: 820, top: 'pyramid' }, { x: 600, w: 106, h: 640, top: 'flat' },
  { x: 705, w: 92, h: 760, top: 'slant2' }, { x: 812, w: 116, h: 520, top: 'step' }, { x: 925, w: 100, h: 400, top: 'spire' },
  { x: 1035, w: 104, h: 300, top: 'flat' },
]
const WIN = TOWERS.map((b, i) => {
  const r = rng(40 + i), out = []
  const cols = Math.max(2, Math.floor((b.w - 30) / 24)), rows = Math.floor((b.h - 70) / 34)
  for (let rr = 0; rr < rows; rr++) for (let c = 0; c < cols; c++) if (r() < 0.5) out.push({ c, rr, cols, seed: r() * 100, gold: r() < 0.75, beat: Math.floor(r() * 4) })
  return out
})
export const ORDER = [4, 3, 6, 5, 2, 7, 1, 8, 0, 9]
function towerPath(ctx, b, h) {
  const l = b.x - b.w / 2, r = b.x + b.w / 2, y = -h
  ctx.beginPath(); ctx.moveTo(l, 0)
  switch (b.top) {
    case 'slant': ctx.lineTo(l, y + 40); ctx.lineTo(r, y); break
    case 'slant2': ctx.lineTo(l, y); ctx.lineTo(r, y + 50); break
    case 'step': ctx.lineTo(l, y + 50); ctx.lineTo(l + b.w * 0.2, y + 50); ctx.lineTo(l + b.w * 0.2, y); ctx.lineTo(r - b.w * 0.2, y); ctx.lineTo(r - b.w * 0.2, y + 50); ctx.lineTo(r, y + 50); break
    case 'spire': ctx.lineTo(l, y + 30); ctx.lineTo(b.x - 10, y + 10); ctx.lineTo(b.x, y - 60); ctx.lineTo(b.x + 10, y + 10); ctx.lineTo(r, y + 30); break
    case 'pyramid': ctx.lineTo(l, y + 60); ctx.lineTo(b.x, y - 20); ctx.lineTo(r, y + 60); break
    default: ctx.lineTo(l, y); ctx.lineTo(r, y)
  }
  ctx.lineTo(r, 0); ctx.closePath()
}
/** the skyline on baseY. k(j) 0..1 per tower in ORDER (springs up); lit 0..1 = extra window light; edge = outline colour */
export function skyline(ctx, t, baseY, k = () => 1, { sc = 1, a = 1, lit = 0, edge = '#b39ce8', beat = -1 } = {}) {
  if (a <= 0) return
  ctx.save(); ctx.translate(0, baseY); ctx.globalAlpha = a
  const g = ctx.createLinearGradient(0, -560 * sc, 0, 0)
  g.addColorStop(0, 'rgba(242,140,90,0)'); g.addColorStop(1, rgba('#f29a4a', (0.2 + 0.25 * lit) * a))
  ctx.fillStyle = g; ctx.fillRect(0, -560 * sc, 1080, 560 * sc)
  ORDER.forEach((i, j) => {
    const b = TOWERS[i], kk = k(j)
    if (kk <= 0) return
    const h = b.h * sc * kk
    ctx.save()
    towerPath(ctx, b, h)
    ctx.fillStyle = '#120c2c'; ctx.fill()
    ctx.fillStyle = rgba(VIOLET, 0.16 + 0.1 * lit); ctx.fill()
    ctx.clip()
    for (const wdw of WIN[i]) {
      const wx = b.x - (wdw.cols * 24) / 2 + wdw.c * 24 + 4, wy = -h + 70 + wdw.rr * 34
      if (wy > -16) continue
      const tw = 0.55 + 0.45 * noise1(t * 0.8 + wdw.seed, wdw.seed)
      const on = beat >= 0 && wdw.beat === beat % 4 ? 0.5 : 0
      ctx.fillStyle = rgba(wdw.gold ? '#ffd98a' : '#bfe6ff', clamp(0.75 * tw + lit + on))
      ctx.fillRect(wx, wy, 12, 16)
    }
    ctx.restore()
    towerPath(ctx, b, h)
    ink(ctx, edge, { w: 5, fa: 0, glow: 14 + 20 * lit })
    if (b.top === 'spire' || b.top === 'pyramid') {   // a blinking red aircraft light
      if (Math.sin(t * 4 + i) > 0.2) { ctx.fillStyle = '#ff5a5a'; ctx.shadowColor = '#ff5a5a'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.arc(b.x, -h - (b.top === 'spire' ? 64 : 24), 6, 0, TAU); ctx.fill(); ctx.shadowBlur = 0 }
    }
  })
  ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(1090, 0); ink(ctx, '#c9a6ff', { w: 6, fa: 0, glow: 12 })
  ctx.fillStyle = '#0b0620'; ctx.fillRect(0, 3, 1080, 500)
  ctx.restore()
}
