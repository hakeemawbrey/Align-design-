// stawards props — small pixel drawings on canvas, shared inside this film only (STARTALK2.md: props live in the film's
// own folder). Pure functions of their arguments; nothing touches `document` at module load.
//
//   starFrame / inSprite / tearsCells / blit     the overlay maths from stcomet / stpirates (the transform drawStarChar uses),
//                                                so costume pieces drawn in sprite CELLS ride every hop and squash
//   glassesCells   the aunties' tiny reading glasses (from staunties): fog, and "up" = pushed up onto the head
//   headsetCells · drawMic                       the Booth's headsets and its one shared mic (from stlive5th)
//   tieCells · shadesCells                       Capricorn's tiny tie (stmetfirst2) · the comet's sunglasses (stcomet)
//   drawTrophy · drawPodium · drawPlacard · drawEnvelope · drawScroll · confetti     the awards-night props (px)
import { clamp, lerp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)

// ── colour helpers
export const hexRgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255] }
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const mixHex = (a, b, k) => { const A = hexRgb(a), B = hexRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], clamp(k)))) }
export const rgba = (hex, a) => { const [r, g, b] = hexRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

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
/** the star's base (feet) y offset from its centre, as a fraction of size: place a star standing on y0 at y0 − FOOT·size */
export const FOOT = (FOOT_ROW - HALF) / G

function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}
/** rows of chars → cells, using a palette; ox/oy = the cell of the top-left char */
function grid(rows, pal, ox, oy) {
  const out = []
  rows.forEach((r, j) => [...r].forEach((c, i) => { if (pal[c]) out.push([ox + i, oy + j, pal[c]]) }))
  return out
}

// ── happy tears (from stcomet). k: 1 sniffle · 2 streams · 3 fountains
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


export function blit(ctx, rows, pal, x, y, c, { outline = INK, flip = false } = {}) {
  const w = rows[0].length, h = rows.length, ox = Math.round(x - w * c / 2), oy = Math.round(y - h * c / 2)
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && pal[rows[j][flip ? w - 1 - i : i]]
  if (outline) {
    ctx.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) ctx.fillRect(ox + i * c, oy + j * c, c, c)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const col = on(i, j); if (col) { ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c + 0.5, c + 0.5) } }
}

// ═══════════════════════════════════ costumes (cells) ═══════════════════════════════════
const LENS = [[8, 14], [19, 14]], LW = 9, LH = 9
/** the aunties' reading glasses. up 0 = on the eyes · 1 = pushed up onto the top point; fog 0…1 */
export function glassesCells(ctx, { up = 0, fog = 0, frame = '#7a1f3d', chain = false, t = 0 } = {}) {
  const dy = -lerp(0, 11, clamp(up))
  ctx.save(); ctx.translate(0, dy)
  for (const [lx, ly] of LENS) {
    ctx.fillStyle = rgba('#bfefff', 0.18 + 0.6 * clamp(fog)); ctx.fillRect(lx + 1, ly + 1, LW - 2, LH - 2)
    if (fog > 0.05) { ctx.fillStyle = rgba('#ffffff', 0.6 * clamp(fog)); for (const [a, b] of [[2, 2], [3, 2], [5, 3], [2, 5], [6, 6], [4, 6], [3, 4]]) ctx.fillRect(lx + a, ly + b, 1, 1) }
    ctx.fillStyle = frame
    for (let i = 0; i < LW; i++) for (let j = 0; j < LH; j++) {
      const edge = i === 0 || j === 0 || i === LW - 1 || j === LH - 1, corner = (i === 0 || i === LW - 1) && (j === 0 || j === LH - 1)
      if (edge && !corner) ctx.fillRect(lx + i, ly + j, 1.02, 1.02)
    }
    ctx.fillStyle = '#ffd98a'; ctx.fillRect(lx + 2, ly + 1, 1, 1); ctx.fillRect(lx + 1, ly + 2, 1, 1)
  }
  ctx.fillStyle = frame; ctx.fillRect(17, 16, 2, 1); ctx.fillRect(6, 16, 2, 1); ctx.fillRect(28, 16, 2, 1)
  if (chain && up < 0.5) {
    const sw = Math.sin(t * 2.4) * 1.2
    for (let k = 0; k <= 12; k += 2) { const u = k / 12; ctx.fillStyle = k % 4 === 0 ? '#ffd98a' : '#fff3dc'; ctx.fillRect(Math.round(lerp(6, 29, u)), Math.round(17 + Math.sin(u * Math.PI) * (9 + sw)), 1, 1) }
  }
  ctx.restore()
}
// headset: band over the top point, two cups on the sides of the top arm (stlive5th)
const HS = new Map()
function headsetList(accent) {
  const out = [], seen = new Set()
  const put = (i, j, c) => { const k = i + ',' + j; if (seen.has(k)) return; seen.add(k); out.push([i, j, c]) }
  for (let a = 0; a <= 180; a += 2) { const r = a * Math.PI / 180; put(Math.round(17.5 - Math.cos(r) * 6.2), Math.round(11 - Math.sin(r) * 10.6), a > 60 && a < 120 ? '#9aa0c8' : '#5d6288') }
  for (const [x0, d] of [[9, 1], [23, -1]]) for (let j = 8; j <= 14; j++) for (let i = 0; i < 4; i++) {
    if ((j === 8 || j === 14) && (i === 0 || i === 3)) continue
    put(x0 + i, j, i === (d > 0 ? 3 : 0) ? accent : (j === 9 && i === (d > 0 ? 1 : 2)) ? '#6e7399' : '#2c2f4c')
  }
  return out
}
export function headsetCells(ctx, accent) { if (!HS.has(accent)) HS.set(accent, headsetList(accent)); paintCells(ctx, HS.get(accent)) }
/** Capricorn's tiny tie */
export function tieCells(ctx) {
  const rows = ['.KKK.', 'KKKKK', '.KRK.', '.RRR.', '.RYR.', 'RRRRR', 'RRRRR', '.RRR.', '..R..']
  paintCells(ctx, grid(rows, { K: '#3a2a6a', R: '#4a5fb8', Y: '#f2c75c' }, 15.5, 24))
}
/** big black shades across both eyes, with a glint */
export function shadesCells(ctx, glint = 0) {
  const rows = ['.KKKKKKKK..KKKKKKKK.', 'KKSSSSSSKKKKSSSSSSKK', '.KSSSSSSK..KSSSSSSK.', '.KSSSSSSK..KSSSSSSK.', '..KSSSSK....KSSSSK..', '...KKKK......KKKK...']
  paintCells(ctx, grid(rows, { K: '#0c0718', S: '#2b2350' }, 8, 15.5), null)
  ctx.fillStyle = '#ffffff'; const g = Math.round(glint * 4); ctx.fillRect(10 + g, 17.5, 1, 1); ctx.fillRect(22 + g, 17.5, 1, 1)
}

// ═══════════════════════════════════ world props (px) ═══════════════════════════════════
/** the broadcast mic (stlive5th): base at (x, y), capsule angle ang */
export function drawMic(ctx, x, y, ang, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  const P = 6
  ctx.fillStyle = INK; ctx.fillRect(-7 * P, -2 * P, 14 * P, 3 * P); ctx.fillRect(-1.5 * P, -16 * P, 3 * P, 15 * P)
  ctx.fillStyle = '#4a4f72'; ctx.fillRect(-6 * P, -1.5 * P, 12 * P, 2 * P); ctx.fillStyle = '#5d6288'; ctx.fillRect(-0.75 * P, -15.5 * P, 1.5 * P, 14 * P)
  ctx.translate(0, -16 * P); ctx.rotate(ang)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-4.5 * P, -13 * P, 9 * P, 14 * P, 4 * P); ctx.fill()
  ctx.fillStyle = '#9097bd'; ctx.beginPath(); ctx.roundRect(-3.5 * P, -12 * P, 7 * P, 12 * P, 3.4 * P); ctx.fill()
  ctx.fillStyle = '#5d6288'; for (let j = -10; j <= -2; j += 2) ctx.fillRect(-3.5 * P, j * P, 7 * P, P * 0.5)
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(-2.6 * P, -10.5 * P, P * 0.8, 5 * P)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(-4.5 * P, -1.5 * P, 9 * P, 1.6 * P)
  ctx.restore()
}
const TROPHY = [
  '.....S.....',
  '....SSS....',
  'SSSSSHSSSSS',
  '.SSSSSSSSS.',
  '..SSSSSSS..',
  '..SSS.SSS..',
  '.SS.....SS.',
  'GGGGGGGGGGG',
  'GHGGGGGGGDG',
  '.GGGGGGGGD.',
  '..GGGGGGD..',
  '...GGGGD...',
  '....GGD....',
  '.....G.....',
  '....GGG....',
  '..BBBBBBB..',
  '..BPPPPPB..',
  '.BBBBBBBBB.',
]
/** the trophy ("a Stellie"): a gold star on a cup on a plaque. (x, y) = its centre, c = cell px */
export function drawTrophy(ctx, x, y, c, t, { shine = 0, rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  const g = ctx.createRadialGradient(0, -4 * c, 0, 0, -4 * c, 12 * c); g.addColorStop(0, `rgba(255,214,110,${0.35 + 0.35 * shine})`); g.addColorStop(1, 'rgba(255,214,110,0)')
  ctx.fillStyle = g; ctx.fillRect(-12 * c, -16 * c, 24 * c, 24 * c)
  blit(ctx, TROPHY, { S: '#ffd66e', H: '#fff6c8', G: '#f2b33a', D: '#c98a1e', B: '#3a2a5a', P: '#e9c27a' }, 0, 0, c)
  // a glint sweeping across the cup
  const ph = ((t * 0.5) % 1)
  if (ph < 0.3) { ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fillRect(Math.round((-4 + ph / 0.3 * 8) * c), -1.5 * c, c, c * 3) }
  ctx.restore()
}
/** the podium: a plum lectern with a gold star emblem; (x, top) = top centre */
export function drawPodium(ctx, x, top, w = 200, h = 190) {
  const L = Math.round(x - w / 2), B = top + h
  ctx.fillStyle = INK; ctx.fillRect(L - 18, top - 8, w + 36, 30); ctx.fillRect(L - 6, top + 14, w + 12, h - 14)
  ctx.fillStyle = '#6b3a7a'; ctx.fillRect(L - 12, top - 2, w + 24, 18)
  ctx.fillStyle = '#4e2a64'; ctx.fillRect(L, top + 20, w, h - 20)
  ctx.fillStyle = '#5d3474'; ctx.fillRect(L, top + 20, 18, h - 20)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(L - 12, top + 14, w + 24, 6); ctx.fillRect(L, B - 14, w, 6)
  // the star emblem
  const R = 38, cy = top + 20 + (h - 34) / 2
  ctx.fillStyle = '#f2c75c'; ctx.beginPath()
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? R * 0.45 : R; ctx.lineTo(x + Math.cos(a) * r, cy + Math.sin(a) * r) }
  ctx.closePath(); ctx.fill()
}
/** a hand-held placard on a stick: (x, y) = the sign's centre */
export function drawPlacard(ctx, x, y, lines, { k = 1, rot = 0, w = 330, col = '#e8344e' } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  const h = 54 + lines.length * 44
  ctx.fillStyle = INK; ctx.fillRect(-8, 0, 16, h / 2 + 120); ctx.fillStyle = '#a8742a'; ctx.fillRect(-4, 0, 8, h / 2 + 116)
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  ctx.fillStyle = '#fbf3e6'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, 8); ctx.fillRect(-w / 2, h / 2 - 8, w, 8)
  ctx.fillStyle = INK; ctx.font = "700 38px 'Space Mono', monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  lines.forEach((s, i) => ctx.fillText(s, 0, (i - (lines.length - 1) / 2) * 44 + 2))
  ctx.restore()
}
/** the big award envelope: open 0…1 lifts the flap and slides the card up; (x, y) = centre */
export function drawEnvelope(ctx, x, y, s, { open = 0, rot = 0, card = 'YOU.' } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s)
  const W = 300, H = 190, o = clamp(open)
  // the card rising out of it
  if (o > 0) {
    const cy = -H / 2 - 70 * o + 40
    ctx.fillStyle = INK; ctx.fillRect(-W / 2 + 18, cy - 70, W - 36, 150); ctx.fillStyle = '#fffaf0'; ctx.fillRect(-W / 2 + 24, cy - 64, W - 48, 138)
    ctx.fillStyle = '#7a1f3d'; ctx.font = "italic 600 76px 'EB Garamond', serif"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(card, 0, cy + 4)
  }
  ctx.fillStyle = INK; ctx.fillRect(-W / 2 - 8, -H / 2 - 8, W + 16, H + 16)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(-W / 2, -H / 2, W, H)
  ctx.fillStyle = '#e0a93a'; ctx.beginPath(); ctx.moveTo(-W / 2, H / 2); ctx.lineTo(0, 0); ctx.lineTo(W / 2, H / 2); ctx.closePath(); ctx.fill()
  // the flap (folds up as it opens)
  ctx.save(); ctx.translate(0, -H / 2); ctx.scale(1, 1 - 2 * o)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-W / 2 - 4, -2); ctx.lineTo(0, H * 0.55 + 6); ctx.lineTo(W / 2 + 4, -2); ctx.closePath(); ctx.fill()
  ctx.fillStyle = o > 0.5 ? '#c98a1e' : '#ffd66e'; ctx.beginPath(); ctx.moveTo(-W / 2 + 6, 0); ctx.lineTo(0, H * 0.55); ctx.lineTo(W / 2 - 6, 0); ctx.closePath(); ctx.fill()
  ctx.restore()
  // the wax seal (a little star)
  if (o < 0.5) { ctx.fillStyle = '#c42540'; ctx.fillRect(-16, H * 0.0 - 4, 32, 32); ctx.fillStyle = '#ff8fb1'; ctx.fillRect(-6, 6, 12, 12) }
  ctx.restore()
}
/** Pisces' speech: a scroll that unrolls downward from (x, top) to len px */
export function drawScroll(ctx, x, top, w, len, t) {
  if (len <= 2) return
  ctx.fillStyle = INK; ctx.fillRect(x - w / 2 - 6, top, w + 12, len + 6)
  ctx.fillStyle = '#fbf3e4'; ctx.fillRect(x - w / 2, top, w, len)
  ctx.fillStyle = '#b9a9c9'
  for (let y = top + 28, i = 0; y < top + len - 14; y += 26, i++) ctx.fillRect(x - w / 2 + 16, y, w - 32 - ((i * 37) % 60), 7)
  // the roller at the bottom
  ctx.fillStyle = INK; ctx.fillRect(x - w / 2 - 16, top + len - 6, w + 32, 26); ctx.fillStyle = '#d9c3a0'; ctx.fillRect(x - w / 2 - 10, top + len, w + 20, 14)
  void t
}
/** confetti cannon from (x0, y0) at t0 — analytic drag, pure f(t) (stlive5th) */
const CONF = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#ff6b5b', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 5.5 } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > life) return
  const r = rng(seed * 977 + 3), k = 1.5, vty = 330
  for (let i = 0; i < n; i++) {
    const delay = r() * 0.18, vx0 = (r() - 0.5) * 2100 * spread, vy0 = -(1500 + r() * 1300) * up, spin = 4 + r() * 9, sz = 12 + r() * 12, col = CONF[Math.floor(r() * CONF.length)], ph = r() * TAU, sway = 30 + r() * 50
    const dt = dt0 - delay
    if (dt < 0) continue
    const e = (1 - Math.exp(-k * dt)) / k
    const x = x0 + vx0 * e + Math.sin(dt * 3 + ph) * sway * clamp(dt), y = y0 + vty * dt + (vy0 - vty) * e
    if (y > 2000) continue
    ctx.save(); ctx.globalAlpha = clamp((life - dt0) / 0.6); ctx.translate(x, y); ctx.rotate(ph + dt * spin * 0.4); ctx.scale(Math.cos(dt * spin + ph), 1)
    ctx.fillStyle = col; ctx.fillRect(-sz / 2, -sz * 0.35, sz, sz * 0.7); ctx.restore()
  }
}
