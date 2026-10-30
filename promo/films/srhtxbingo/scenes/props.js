// srhtxbingo props — drawings for this film only. Pure f(args); nothing touches `document` at load. The bingo card
// (frame, nine squares + icons, the dauber blots) is adapted from promo/films/htxbingo; the star props (starFrame /
// inSprite / tears) mirror startalk.js maths (as in srhtxbrunch) so they stay seated on a star through hops and squash.
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff3d3d', INK = '#1a1430', DULL = '#b9b3d6'
export const CYAN = '#8fd8f6', LILAC = '#c9a6ff', ORANGE = '#ffa45c', MINT = '#7fe0b8'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const D2R = Math.PI / 180, TAU = Math.PI * 2
export const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
export const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
export const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
export const thud = (t, t0, f = 30, k = 9) => t > t0 ? Math.sin((t - t0) * f) * Math.exp(-(t - t0) * k) : 0

export function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}
export const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  x.restore()
}
export function glow(x, px, py, R, col, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(px, py, 0, px, py, R)
  g.addColorStop(0, rgba(col, 0.42 * a)); g.addColorStop(0.45, rgba(col, 0.14 * a)); g.addColorStop(1, rgba(col, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, R, 0, TAU); x.fill(); x.restore()
}
export const CARD = { x: 91, y: 652, w: 898, head: 92, pad: 25, tile: 272, gap: 16 }
CARD.h = CARD.head + CARD.tile * 3 + CARD.gap * 2 + CARD.pad
CARD.cx = CARD.x + CARD.w / 2; CARD.cy = CARD.y + CARD.h / 2
export const tileC = i => ({ x: CARD.x + CARD.pad + CARD.tile / 2 + (i % 3) * (CARD.tile + CARD.gap), y: CARD.y + CARD.head + CARD.tile / 2 + Math.floor(i / 3) * (CARD.tile + CARD.gap) })
export const SQUARES = [
  { lines: ['Blames', 'I-45'], icon: 'shield' },
  { lines: ['“So what', 'do you do?”'], icon: 'ask' },
  { lines: ['Phone', 'on table'], icon: 'phone' },
  { lines: ['Talks about', 'the heat'], icon: 'sun' },
  { lines: ['FREE', 'SPACE'], icon: 'star' },
  { lines: ['Mentions', 'an ex'], icon: 'broken' },
  { lines: ['Late', 'again'], icon: 'clock' },
  { lines: ['“idk lol”'], icon: 'dots' },
  { lines: ['Small', 'talk'], icon: 'chat' },
]
export const DAUB = [PINK, CYAN, GOLD, LILAC, ORANGE, MINT, PINK, CYAN]
export function icon(x, kind, col, t) {
  x.save()
  switch (kind) {
    case 'shield': {   // a plain, generic freeway shield
      x.beginPath(); x.moveTo(-44, -40); x.quadraticCurveTo(0, -54, 44, -40); x.quadraticCurveTo(52, 10, 0, 46); x.quadraticCurveTo(-52, 10, -44, -40); x.closePath()
      ink(x, col, { w: 6, fa: 0.25, glow: 10 })
      x.fillStyle = col; x.font = `900 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('45', 0, 0); break
    }
    case 'ask': {
      x.beginPath(); x.roundRect(-50, -40, 100, 66, 22); x.moveTo(-20, 26); x.lineTo(-34, 46); x.lineTo(0, 26)
      ink(x, col, { w: 6, fa: 0.2, glow: 10 })
      x.fillStyle = col; x.font = `900 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, -6); break
    }
    case 'phone': {
      x.rotate(-12 * D2R); x.beginPath(); x.roundRect(-26, -46, 52, 92, 12); ink(x, col, { w: 6, fa: 0.2, glow: 10 })
      x.beginPath(); x.roundRect(-16, -34, 32, 58, 4); x.fillStyle = rgba(col, 0.5); x.fill()
      const buzz = Math.sin(t * 40) * (Math.sin(t * 3) > 0.4 ? 1 : 0)
      x.beginPath(); x.moveTo(36 + buzz * 3, -20); x.lineTo(44, -10); x.moveTo(-36 - buzz * 3, 20); x.lineTo(-44, 10); ink(x, col, { w: 5, fa: 0, glow: 8 }); break
    }
    case 'sun': {
      x.rotate(t * 0.8)
      x.beginPath(); x.arc(0, 0, 22, 0, TAU); ink(x, col, { w: 6, fa: 0.4, glow: 12 })
      x.beginPath(); for (let i = 0; i < 8; i++) { const a = i * TAU / 8; x.moveTo(Math.cos(a) * 32, Math.sin(a) * 32); x.lineTo(Math.cos(a) * 46, Math.sin(a) * 46) }
      ink(x, col, { w: 6, fa: 0, glow: 10 }); break
    }
    case 'star': {
      x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 20 : 46; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } x.closePath()
      ink(x, col, { w: 6, fa: 0.4, glow: 14 }); break
    }
    case 'broken': {
      const heart = (sd) => { x.beginPath(); x.moveTo(0, -24); x.bezierCurveTo(sd * 14, -46, sd * 52, -40, sd * 46, -6); x.bezierCurveTo(sd * 40, 16, sd * 12, 30, 0, 44); x.lineTo(sd * 8, 18); x.lineTo(sd * -6, 2); x.lineTo(sd * 6, -12); x.closePath() }
      x.save(); x.translate(-5, 2); x.rotate(-8 * D2R); heart(-1); ink(x, col, { w: 5, fa: 0.3, glow: 10 }); x.restore()
      x.save(); x.translate(5, -2); x.rotate(8 * D2R); heart(1); ink(x, col, { w: 5, fa: 0.3, glow: 10 }); x.restore(); break
    }
    case 'clock': {
      x.beginPath(); x.arc(0, 0, 42, 0, TAU); ink(x, col, { w: 6, fa: 0.15, glow: 10 })
      const a1 = t * 6, a2 = t * 0.5
      x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a1) * 30, -Math.cos(a1) * 30); x.moveTo(0, 0); x.lineTo(Math.sin(a2) * 20, -Math.cos(a2) * 20); ink(x, col, { w: 6, fa: 0, glow: 8 }); break
    }
    case 'dots': {
      x.beginPath(); x.roundRect(-52, -34, 104, 62, 30); x.moveTo(24, 28); x.lineTo(40, 46); x.lineTo(4, 28); ink(x, col, { w: 6, fa: 0.2, glow: 10 })
      x.fillStyle = col; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(-24 + i * 24, -3 - 5 * Math.max(0, Math.sin(t * 7 - i * 0.9)), 7, 0, TAU); x.fill() } break
    }
    case 'chat': {
      x.beginPath(); x.roundRect(-52, -42, 70, 44, 16); ink(x, col, { w: 5, fa: 0.2, glow: 8 })
      x.beginPath(); x.roundRect(-14, -2, 68, 42, 16); ink(x, col, { w: 5, fa: 0.2, glow: 8 })
      x.fillStyle = col; x.font = `700 20px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('…', -17, -24); x.fillText('…', 20, 16); break
    }
  }
  x.restore()
}

/** one square, centred at (0,0). d = dauber progress (0 none, then slam), col = dauber colour */
export function square(x, i, t, { d = -1, col = PINK, dim = 1 } = {}) {
  const S = SQUARES[i], s = CARD.tile
  const free = i === 4
  x.beginPath(); x.roundRect(-s / 2, -s / 2, s, s, 30)
  x.fillStyle = free ? 'rgba(52,36,22,0.95)' : 'rgba(26,18,52,0.95)'; x.fill()
  ink(x, free ? GOLD : rgba(BONE, 0.8), { w: 4, fa: 0, glow: free ? 14 : 6 })
  // the dauber blot, under the text
  if (d >= 0) {
    const sp = clamp(d / 0.16)                                      // drop in
    const sc = lerp(1.9, 1, ease.inCubic(sp)) * (1 + 0.12 * thud(d, 0.16, 30, 9))
    x.save(); x.scale(sc, sc * (1 - 0.1 * thud(d, 0.16, 30, 9))); x.globalAlpha *= clamp(sp * 2.5) * dim
    const r = rng(7 + i * 13)
    x.beginPath()
    for (let k = 0; k <= 28; k++) { const a = k / 28 * TAU, rr = 112 + 6 * Math.sin(a * 5 + i) + 4 * r(); x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) }
    x.closePath(); x.fillStyle = rgba(col, 0.62); x.shadowColor = col; x.shadowBlur = 30; x.fill(); x.shadowBlur = 0
    x.lineWidth = 5; x.strokeStyle = rgba('#ffffff', 0.35); x.stroke()
    // splats
    for (let k = 0; k < 5; k++) { const a = r() * TAU, rr = 124 + r() * 14; x.beginPath(); x.arc(Math.cos(a) * rr, Math.sin(a) * rr, 6 + r() * 8, 0, TAU); x.fillStyle = rgba(col, 0.75); x.fill() }
    x.restore()
  }
  const stamped = d >= 0.12
  x.save(); x.translate(0, -58)
  icon(x, S.icon, stamped ? '#fff7ea' : free ? GOLD : col, t)
  x.restore()
  x.fillStyle = stamped ? '#ffffff' : free ? GOLD : BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  let fs = free ? 50 : 42
  x.font = `${free ? 900 : 800} ${fs}px ${INTER}`
  const mw = Math.max(...S.lines.map(l => x.measureText(l).width))
  if (mw > s - 30) { fs = Math.floor(fs * (s - 30) / mw); x.font = `${free ? 900 : 800} ${fs}px ${INTER}` }
  if (stamped) { x.shadowColor = 'rgba(10,4,30,0.85)'; x.shadowBlur = 10 }
  const y0 = S.lines.length > 1 ? 52 : 70
  S.lines.forEach((l, k) => x.fillText(l, 0, y0 + k * fs * 1.08))
  x.shadowBlur = 0
}

/** the card frame + header (no squares) */
export function bingoFrame(x, a = 1) {
  const { x: X, y: Y, w, h } = CARD
  x.save(); x.globalAlpha *= a
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 44; x.shadowOffsetY = 18
  x.fillStyle = 'rgba(16,10,36,0.96)'; x.beginPath(); x.roundRect(X, Y, w, h, 40); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  x.beginPath(); x.roundRect(X, Y, w, h, 40); ink(x, PINK, { w: 9, fa: 0, glow: 26 })
  // header
  x.fillStyle = PINK; x.font = `900 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const L = ['B', 'I', 'N', 'G', 'O']
  L.forEach((c, i) => x.fillText(c, CARD.cx + (i - 2) * 118, Y + CARD.head / 2 + 6))
  ;[-1, 1].forEach(sd => drawPixelStar(x, CARD.cx + sd * 380, Y + CARD.head / 2 + 4, 30, 1, GOLD))
  x.restore()
}

// ── star transform (mirrors startalk.js drawStarChar)
export const G = 36, HALF = 18
export const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
export function hopState(t, hops) {
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
/** a cell (i, j) of a star's sprite → world coords */
export const cellToWorld = (F, i, j) => [F.ox + (i - HALF) * F.cell * F.sx, F.oy + (j - HALF) * F.cell * F.sy - F.base * F.sy]

// tears (cells): k 1 sniffle · 2 streams · 3 fountains
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
  }
}

// ── new for the remix
/** the caller's bingo dauber (a fat bottle with a coloured foam tip), held at (cx, cy), tip pointing down-left by rot */
export function dauber(x, cx, cy, { rot = 0.5, s = 1, col = PINK, a = 1 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.beginPath(); x.roundRect(-30, -96, 60, 112, 18); ink(x, BONE, { w: 6, fa: 0.25, glow: 12 })
  x.fillStyle = rgba(col, 0.85); x.fillRect(-24, -60, 48, 50)
  x.fillStyle = INK; x.font = `900 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('B', 0, -35)
  x.beginPath(); x.roundRect(-20, 14, 40, 22, 6); ink(x, BONE, { w: 5, fa: 0.4, glow: 8 })
  x.beginPath(); x.ellipse(0, 46, 22, 14, 0, 0, TAU); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 16; x.fill(); x.shadowBlur = 0
  x.restore()
}
/** Pisces' own little bingo card (3×3, all daubed), held up at (cx, cy) */
export function miniCard(x, cx, cy, t, { s = 1, a = 1, rot = 0, filled = 9 } = {}) {
  if (a <= 0 || s <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.beginPath(); x.roundRect(-80, -92, 160, 184, 16); x.fillStyle = 'rgba(16,10,36,0.96)'; x.fill(); ink(x, PINK, { w: 5, fa: 0, glow: 14 })
  x.fillStyle = PINK; x.font = `900 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BINGO', 0, -70)
  for (let i = 0; i < 9; i++) {
    const px = -48 + (i % 3) * 48, py = -30 + Math.floor(i / 3) * 48
    x.beginPath(); x.roundRect(px - 20, py - 20, 40, 40, 8); x.strokeStyle = rgba(BONE, 0.6); x.lineWidth = 3; x.stroke()
    if (i < filled) { x.beginPath(); x.arc(px, py, 16, 0, TAU); x.fillStyle = rgba(DAUB[i % 8], 0.8); x.fill() }
  }
  x.restore()
}
export function heartPath(x, R) { x.beginPath(); for (let k = 0; k <= 40; k++) { const th = k / 40 * TAU; const hx = 16 * Math.pow(Math.sin(th), 3), hy = -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th)); x.lineTo(hx * R / 16, hy * R / 16) } x.closePath() }
export function person(x, px, py, col, s = 1, a = 1) {
  x.save(); x.globalAlpha *= a; x.translate(px, py); x.scale(s, s)
  x.beginPath(); x.moveTo(-74, 20); x.lineTo(-74, -80); x.quadraticCurveTo(-74, -136, -22, -140); x.lineTo(22, -140); x.quadraticCurveTo(74, -136, 74, -80); x.lineTo(74, 20); x.closePath()
  ink(x, col, { w: 8, fa: 0.3, glow: 18 })
  x.beginPath(); x.arc(0, -190, 38, 0, TAU); ink(x, col, { w: 8, fa: 0.4, glow: 20 })
  x.restore()
}
/** the bingo caller's green visor (cells, on the star's forehead above the eyes) */
const VIS = ['..XXXXXXXXXXXXX..', '.XGGGGGGGGGGGGGX.', 'XGGLLLLLLLLLLLGGX', 'XXXXXXXXXXXXXXXXX']
export function visorCells(ctx) {
  const i0 = HALF - 8.5, j0 = 10.6
  VIS.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.') return
    ctx.fillStyle = ch === 'X' ? INK : ch === 'L' ? 'rgba(160,255,190,0.85)' : 'rgba(60,200,120,0.92)'
    ctx.fillRect(i0 + i, j0 + j, 1.02, 1.02)
  }))
}
