// srhtxbrunch props — drawings for this film only (STARTALK2.md: props live in your own folder). Pure f(args); nothing
// touches `document` at load. The brunch line art (table, flutes, pancakes, seated people, thought clouds, BRUNCH #n
// stickers, the TOO LATE stamp, the DEALBREAKERS card + chips) is adapted from promo/films/htxbrunch; the star props
// (starFrame / inSprite / tears) mirror startalk.js maths so they stay seated on a star through hops and squash.
//
//   starFrame / inSprite / tearsCells / bowtieCells     a star's sprite transform + cells drawn on it (36-cell grid)
//   person / table / flute / pancakes / cloud / sticker / stamp / dealCard / chip / notepad
import { clamp, lerp, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff3d3d', FIRE = '#f0603a', INK = '#1a1430'
export const DULL = '#b9b3d6', MIMOSA = '#ffb347', LILAC = '#c9a6ff', MINT = '#7af0b8'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const D2R = Math.PI / 180, TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
export const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
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

// ── star transform (mirrors startalk.js drawStarChar)
const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
// waiter's bow tie under the eyes (cells)
const BOW = ['XX.....XX', 'XRX...XRX', 'XRRXXXRRX', 'XRRRKRRRX', 'XRRXXXRRX', 'XRX...XRX', 'XX.....XX']
export function bowtieCells(ctx, col = '#e8364a') {
  const i0 = HALF - 4.5, j0 = 24.4
  BOW.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.') return
    ctx.fillStyle = ch === 'X' ? INK : ch === 'K' ? '#ffd0d6' : col
    ctx.fillRect(i0 + i, j0 + j * 0.8, 1.02, 0.84)
  }))
}

// ── seated pictogram person: head + rounded shoulders; (cx, by) = where the torso meets the table
export function person(x, cx, by, col, { a = 1, s = 1, bob = 0, lean = 0 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(cx, by); x.rotate(lean * D2R); x.scale(s, s); x.translate(0, bob)
  x.beginPath()
  x.moveTo(-104, 20); x.lineTo(-104, -120)
  x.quadraticCurveTo(-104, -196, -30, -200); x.lineTo(30, -200); x.quadraticCurveTo(104, -196, 104, -120)
  x.lineTo(104, 20); x.closePath()
  ink(x, col, { w: 8, fa: 0.26, glow: 18 })
  x.beginPath(); x.arc(0, -268, 52, 0, TAU)
  ink(x, col, { w: 8, fa: 0.34, glow: 22 })
  x.restore()
}

/** the table at (cx, ty) top centre: thick top, tablecloth with a scalloped hem, pedestal */
export function table(x, cx, ty, a, k = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.translate(cx, ty); x.scale(k, k)
  x.beginPath(); x.moveTo(-26, 150); x.lineTo(-26, 290); x.lineTo(26, 290); x.lineTo(26, 150); x.closePath(); ink(x, BONE, { w: 6, fa: 0.12, glow: 10 })
  x.beginPath(); x.roundRect(-150, 282, 300, 28, 14); ink(x, BONE, { w: 6, fa: 0.2, glow: 10 })
  x.beginPath(); x.moveTo(-430, 0); x.lineTo(-430, 150)
  const n = 9
  for (let i = 0; i < n; i++) { const x0 = -430 + (860 / n) * i, x1 = x0 + 860 / n; x.quadraticCurveTo((x0 + x1) / 2, 186, x1, 150) }
  x.lineTo(430, 0); x.closePath()
  ink(x, PINK, { w: 7, fa: 0.16, glow: 16 })
  x.save(); x.clip(); x.globalAlpha *= 0.18; x.fillStyle = PINK
  for (let i = -430; i < 430; i += 72) x.fillRect(i, 0, 30, 200)
  x.restore()
  x.beginPath(); x.roundRect(-460, -14, 920, 28, 14); ink(x, BONE, { w: 7, fa: 0.3, glow: 18 })
  x.restore()
}

/** a champagne flute standing at (cx, by); level 0..1 of mimosa, bubbles fizz */
export function flute(x, cx, by, t, { level = 0.8, a = 1, s = 1, rot = 0, seed = 1, col = BONE } = {}) {
  if (a <= 0 || s <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, by); x.rotate(rot * D2R); x.scale(s, s)
  const top = -250, bowlB = -110
  const bowl = () => { x.beginPath(); x.moveTo(-38, top); x.lineTo(38, top); x.quadraticCurveTo(36, bowlB + 10, 6, bowlB); x.lineTo(-6, bowlB); x.quadraticCurveTo(-36, bowlB + 10, -38, top); x.closePath() }
  if (level > 0.01) {
    x.save(); bowl(); x.clip()
    const ly = lerp(bowlB, top + 14, level)
    const g = x.createLinearGradient(0, ly, 0, bowlB); g.addColorStop(0, '#ffd27a'); g.addColorStop(1, MIMOSA)
    x.fillStyle = g; x.fillRect(-50, ly, 100, bowlB - ly + 4)
    const r = rng(seed), A0 = x.globalAlpha
    x.fillStyle = '#fff3d0'
    for (let i = 0; i < 7; i++) {
      const bx = -20 + r() * 40, sp = 0.5 + r() * 0.6, ph = r()
      const u = ((t * sp + ph) % 1)
      const yy = lerp(bowlB - 4, ly + 6, u)
      x.globalAlpha = A0 * 0.85 * Math.sin(Math.PI * u); x.beginPath(); x.arc(bx + 3 * Math.sin(t * 5 + i), yy, 3.5 + 2 * r(), 0, TAU); x.fill()
    }
    x.restore()
  }
  bowl(); ink(x, col, { w: 6, fa: 0.08, glow: 14 })
  x.beginPath(); x.moveTo(0, bowlB); x.lineTo(0, -8); ink(x, col, { w: 6, fa: 0, glow: 10 })
  x.beginPath(); x.ellipse(0, -5, 38, 8, 0, 0, TAU); ink(x, col, { w: 6, fa: 0.2, glow: 10 })
  x.globalAlpha *= 0.7; x.strokeStyle = '#fffaf0'; x.lineWidth = 4; x.lineCap = 'round'
  x.beginPath(); x.moveTo(-24, top + 20); x.lineTo(-20, top + 70); x.stroke()
  x.restore()
}

/** a pancake stack on a plate, butter pat and a syrup drip */
export function pancakes(x, cx, by, t, { a = 1, s = 1, n = 3 } = {}) {
  if (a <= 0 || s <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, by); x.scale(s, s)
  x.beginPath(); x.ellipse(0, -8, 150, 22, 0, 0, TAU); ink(x, BONE, { w: 6, fa: 0.22, glow: 12 })
  for (let i = 0; i < n; i++) {
    const y = -36 - i * 34
    x.beginPath(); x.roundRect(-110 + (i % 3) * 6, y - 16, 220 - (i % 3) * 12, 34, 17); ink(x, GOLD, { w: 6, fa: 0.34, glow: 14 })
  }
  const topY = -36 - (n - 1) * 34 - 20
  x.save(); x.translate(0, topY); x.rotate(-8 * D2R); x.beginPath(); x.roundRect(-24, -14, 48, 26, 5); x.fillStyle = '#ffe9a6'; x.fill(); ink(x, BONE, { w: 4, fa: 0, glow: 8 }); x.restore()
  const drip = 14 + 8 * Math.sin(t * 2.2)
  x.beginPath(); x.moveTo(-70, topY + 14); x.quadraticCurveTo(0, topY - 4, 74, topY + 14); x.lineTo(74, topY + 26 + drip); x.arc(68, topY + 26 + drip, 6, 0, Math.PI); x.lineTo(62, topY + 22); x.quadraticCurveTo(0, topY + 18, -40, topY + 22); x.lineTo(-40, topY + 40 + drip * 0.6); x.arc(-46, topY + 40 + drip * 0.6, 6, 0, Math.PI); x.lineTo(-52, topY + 22); x.closePath()
  ink(x, FIRE, { w: 4, fa: 0.75, glow: 12 })
  x.restore()
}

/** a thought cloud of w×h centred at (0,0) with text lines; bumps along the rim */
export function cloud(x, w, h, lines, { a = 1, size = 60, fillC = '#f3eefc', rim = BONE } = {}) {
  const bumps = []
  const nx = Math.max(3, Math.round(w / 80)), ny = Math.max(1, Math.round(h / 80))
  const r = 40
  for (let i = 0; i <= nx; i++) { const px = -w / 2 + (w * i) / nx; bumps.push([px, -h / 2, r + ((i * 37) % 3) * 5], [px + 20, h / 2, r + ((i * 53) % 3) * 5]) }
  for (let j = 0; j <= ny; j++) { const py = -h / 2 + (h * j) / ny; bumps.push([-w / 2, py, r], [w / 2, py, r]) }
  x.save(); x.globalAlpha *= a
  x.shadowColor = rim; x.shadowBlur = 22; x.fillStyle = rim
  for (const [px, py, rr] of bumps) { x.beginPath(); x.arc(px, py, rr + 7, 0, TAU); x.fill() }
  x.beginPath(); x.rect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14); x.fill()
  x.shadowBlur = 0; x.fillStyle = fillC
  for (const [px, py, rr] of bumps) { x.beginPath(); x.arc(px, py, rr, 0, TAU); x.fill() }
  x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.fill()
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 ${size}px ${INTER}`
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.08 + 3))
  x.restore()
}
/** small thought-trail dots from (x0,y0) toward (x1,y1) */
export function trail(x, x0, y0, x1, y1, a) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.fillStyle = '#f3eefc'; x.shadowColor = BONE; x.shadowBlur = 12
  for (let i = 0; i < 3; i++) { const u = (i + 0.5) / 3; x.beginPath(); x.arc(lerp(x0, x1, u), lerp(y0, y1, u), 9 + i * 6, 0, TAU); x.fill() }
  x.restore()
}

/** the BRUNCH #n sticker */
export function sticker(x, label, a) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.font = `700 32px ${MONO}`
  const tw = x.measureText(label).width + 44
  x.beginPath(); x.roundRect(-tw / 2, -28, tw, 56, 28); x.fillStyle = '#1b1336'; x.fill(); ink(x, GOLD, { w: 5, fa: 0, glow: 16 })
  x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, 2)
  x.restore()
}

/** a big red rubber stamp */
export function stamp(x, l1, a, { w = 720, h = 210, size = 132 } = {}) {
  x.save(); x.globalAlpha *= a
  x.strokeStyle = RED; x.lineWidth = 14; x.shadowColor = rgba(RED, 0.8); x.shadowBlur = 28
  x.fillStyle = 'rgba(40,6,14,0.72)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 24); x.fill(); x.stroke()
  x.lineWidth = 5; x.beginPath(); x.roundRect(-w / 2 + 18, -h / 2 + 18, w - 36, h - 36, 14); x.stroke()
  x.shadowBlur = 16; x.fillStyle = '#ff5a52'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `900 ${size}px ${INTER}`; x.fillText(l1, 0, 8)
  x.restore()
}

/** the DEALBREAKERS card (illustrated, not app UI): dark glass, gold rim, the question, three chip slots */
export const DCARD = { w: 820, h: 700 }
export const CHIP_Y = [-60, 70, 220]
export const CHIPS = [['NO KIDS EVER'], ['NOT LOOKING FOR SERIOUS'], ['“JUST SEEING', 'WHERE IT GOES”']]
export function dealCard(x) {
  const { w, h } = DCARD
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
  x.fillStyle = 'rgba(18,12,40,0.94)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(LILAC, 0.2)); gr.addColorStop(1, rgba(LILAC, 0.02))
  x.fillStyle = gr; x.fill()
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); ink(x, GOLD, { w: 9, fa: 0, glow: 26 })
  x.save(); x.globalAlpha *= 0.4; x.strokeStyle = GOLD; x.lineWidth = 2; x.beginPath(); x.roundRect(-w / 2 + 18, -h / 2 + 18, w - 36, h - 36, 28); x.stroke(); x.restore()
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = GOLD; x.font = `700 36px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 70)
  x.fillStyle = BONE; x.font = `italic 500 62px ${SERIF}`; x.fillText('What ends it before it starts?', 0, -h / 2 + 146)
  CHIP_Y.forEach((y, i) => { const ch = i === 2 ? 150 : 92; x.save(); x.setLineDash([14, 12]); x.strokeStyle = rgba(BONE, 0.32); x.lineWidth = 4; x.beginPath(); x.roundRect(-340, y - ch / 2, 680, ch, 46); x.stroke(); x.restore() })
}
export function chip(x, lines, hot = 0) {
  const cw = 690, ch = lines.length > 1 ? 154 : 96
  x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 48)
  x.fillStyle = 'rgba(58,10,22,0.95)'; x.fill()
  ink(x, RED, { w: 7, fa: 0, glow: 18 + 30 * hot })
  x.save(); x.translate(-cw / 2 + 58, 0); x.beginPath(); x.moveTo(-16, -16); x.lineTo(16, 16); x.moveTo(16, -16); x.lineTo(-16, 16); ink(x, '#ff5a52', { w: 9, fa: 0, glow: 12 }); x.restore()
  let fs = 50
  x.font = `900 ${fs}px ${INTER}`
  const room = cw - 150
  const mw = Math.max(...lines.map(l => x.measureText(l).width))
  if (mw > room) { fs = Math.floor(fs * room / mw); x.font = `900 ${fs}px ${INTER}` }
  x.fillStyle = '#ffe2dc'; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 28, 3 + (i - (lines.length - 1) / 2) * fs * 1.12))
}

/** the waiter's little order pad (pixel-ish), held at (cx, cy); scribble lines grow with k */
export function notepad(x, cx, cy, k, { a = 1, rot = -0.12, text = null, s = 1 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const w = 120, h = 150
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fbf3df'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#e8364a'; x.fillRect(-w / 2, -h / 2, w, 18)
  x.fillStyle = '#9a8f78'
  for (let i = 0; i < 5; i++) { const lw = (w - 30) * clamp(k * 5 - i) * (0.6 + 0.4 * ((i * 37) % 5) / 4); if (lw > 0) x.fillRect(-w / 2 + 15, -h / 2 + 36 + i * 22, lw, 7) }
  if (text) { x.fillStyle = '#e8364a'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, h / 2 - 22) }
  x.restore()
}
