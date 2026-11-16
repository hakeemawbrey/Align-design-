// stsupernova props — the pixel drawings for "Supernova." (Star Talk season 3 #4), shared inside this film only
// (promo/films/STARTALK2.md: props live in the film's own folder). Every helper is a pure function of its arguments
// (and t); nothing touches `document` at module top level (the sound build imports scenes/index.js in node).
//
//   hoodieStar(ctx, x, y, size, t, opts)   drawStarChar wearing the matching pink hoodie: the hood is the top point (a
//       heart on it), the arms are sleeves (the tips poke out of ribbed cuffs), drawstrings, a ribbed hem, bare legs.
//       opts = drawStarChar opts + hoodie: { on 0…1, down 0…1 (the hood pulled down over the eyes), lift px (pops off) }.
//   drawFlatHoodie(ctx, x, y, px, stage, opts)   the hoodie laid flat (0), sleeves folded in (1), in half (2), neat (3).
//   drawBubble(ctx, x, y, text, opts)   an incoming chat bubble (stepped pixel corners, tail bottom-left) + its label.
//   drawRingBox(ctx, x, y, px, open, t)   a velvet ring box; open 0…1 flips the lid up on a sparkling ring.
//   drawSun(ctx, x, y, cell, t, opts)   the Sun: a round pixel disc with chunky rays and star-style eyes; rot rolls it.
//   drawNova(ctx, t, t0, cx, cy, opts)   the supernova: a pixel shock ring, a soft nebula and drifting pixel debris.
//   bmp / drawTears / eyesOf / drawSweat / drawHearts / sparkBurst / speedLines / drawScorecard / glowAt — see each.
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { drawStarChar } from '../../startalk.js'
import { easeOutBack } from '../../wheel.js'

const TAU = Math.PI * 2
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const mixHex = (a, b, k) => { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16); return toHex(lerp(A >> 16, B >> 16, k), lerp((A >> 8) & 255, (B >> 8) & 255, k), lerp(A & 255, B & 255, k)) }
const canvasOf = (w, h) => (typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(w, h) : Object.assign(document.createElement('canvas'), { width: w, height: h }))
const BM = s => s.trim().split(/\s+/)

/** char bitmap, top-left at x, y ('.' = clear, other chars looked up in pal) */
export function bmp(ctx, rows, x, y, px, pal, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (!c) continue; ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } })
  ctx.restore()
}

/** soft additive glow */
export function glowAt(ctx, x, y, r, color, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.4, rgba(color, 0.2 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
  ctx.restore()
}

// ─────────────────────────────────────────────── the star sprite's grid (the same geometry as startalk.js)
const G = 36, HALF = 18
const SC = { x: HALF, y: 19.6, R: 17.6, r: 9.4, round: 2.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)
function starPoly() {
  const V = [], R0 = SC.R - SC.round, r0 = SC.r - SC.round * 0.55
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r0 : R0; V.push([SC.x + Math.cos(a) * rr, SC.y + Math.sin(a) * rr]) }
  return V
}
function sdPoly(px, py, V) {
  let d = (px - V[0][0]) ** 2 + (py - V[0][1]) ** 2, s = 1
  for (let i = 0, j = V.length - 1; i < V.length; j = i, i++) {
    const ex = V[j][0] - V[i][0], ey = V[j][1] - V[i][1], wx = px - V[i][0], wy = py - V[i][1]
    const h = clamp((wx * ex + wy * ey) / (ex * ex + ey * ey), 0, 1), bx = wx - ex * h, by = wy - ey * h
    d = Math.min(d, bx * bx + by * by)
    const c1 = py >= V[i][1], c2 = py < V[j][1], c3 = ex * wy > ey * wx
    if ((c1 && c2 && c3) || (!c1 && !c2 && !c3)) s = -s
  }
  return s * Math.sqrt(d)
}
let MASK = null
function starMask() {
  if (MASK) return MASK
  const V = starPoly(), m = new Uint8Array(G * G)
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) if (sdPoly(i + 0.5, j + 0.5, V) - SC.round <= 0) m[j * G + i] = 1
  return (MASK = m)
}
const inS = (i, j) => i >= 0 && j >= 0 && i < G && j < G && starMask()[j * G + i] === 1

/** the same hop curve startalk uses (copied so the hoodie follows the exact squash) */
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

// ─────────────────────────────────────────────── the worn hoodie (an overlay on the star's 36-cell grid)
const HG = 40, HO = 2                                     // the hoodie grid is 2 cells bigger all round (it's puffy)
const HEM = 29.6                                          // the ribbed hem runs straight across the upper legs
const ARM_L = [1.26, 14.16], ARM_R = [34.74, 14.16]
const FACE = { x: 18, y: 19.6, rx: 9.7, ry: 6.1 }         // a rounded-rect face opening (superellipse, n = 4)
export const HOOD = { fab: '#ffb3cd', hi: '#ffdce9', sh: '#e47fab', lin: '#5e1840', lin2: '#7d2756', cuff: '#f394bd', cuffDk: '#d9709f', out: '#2e0a20', heart: '#ff3d6e', str: '#fff3f8', aglet: '#5e1840' }
const HEART5 = BM(`.X.X. XXXXX .XXX. ..X..`)
const HEART7 = BM(`.XX.XX. XXXXXXX .XXXXX. ..XXX.. ...X...`)
const HOOD_IMG = new Map()
function hoodieImage(down) {
  const key = Math.round(clamp(down) * 24)
  if (HOOD_IMG.has(key)) return HOOD_IMG.get(key)
  const dn = key / 24
  const c = canvasOf(HG, HG), x = c.getContext('2d')
  const N = HG * HG, cov = new Uint8Array(N)            // 1 fabric · 2 cuff · 3 hem
  const topY = lerp(FACE.y - FACE.ry, FACE.y + FACE.ry - 1.3, dn)
  const face = (fx, fy) => Math.abs((fx - FACE.x) / FACE.rx) ** 4 + Math.abs((fy - FACE.y) / FACE.ry) ** 4 < 1
  const open = (i, j) => inS(i, j) && face(i + 0.5, j + 0.5) && j + 0.5 > topY
  for (let J = 0; J < HG; J++) for (let I = 0; I < HG; I++) {
    const i = I - HO, j = J - HO, fx = i + 0.5, fy = j + 0.5
    if (!(inS(i, j) || inS(i + 1, j) || inS(i - 1, j) || inS(i, j + 1) || inS(i, j - 1))) continue
    if (fy > HEM) continue                                 // a long hoodie: the leg tips poke out under the hem
    const d = Math.min(Math.hypot(fx - ARM_L[0], fy - ARM_L[1]), Math.hypot(fx - ARM_R[0], fy - ARM_R[1]))
    if (d < 3.0) continue                                  // the hands poke out of the sleeves
    if (open(i, j)) continue
    cov[J * HG + I] = d < 4.8 ? 2 : fy > HEM - 1.05 ? 3 : 1
  }
  const at = (I, J) => (I >= 0 && J >= 0 && I < HG && J < HG ? cov[J * HG + I] : 0)
  const px = (I, J, col) => { x.fillStyle = col; x.fillRect(I, J, 1, 1) }
  for (let J = 0; J < HG; J++) for (let I = 0; I < HG; I++) {
    const cv = at(I, J)
    if (!cv) {
      if ((at(I + 1, J) || at(I - 1, J) || at(I, J + 1) || at(I, J - 1)) && !inS(I - HO, J - HO)) px(I, J, HOOD.out)
      continue
    }
    let col = cv === 2 ? (J % 2 ? HOOD.cuffDk : HOOD.cuff) : cv === 3 ? (I % 2 ? HOOD.cuffDk : HOOD.cuff) : HOOD.fab
    if (cv === 1) {
      const dr = !at(I + 1, J) || !at(I, J + 1) || !at(I + 1, J + 1), ul = !at(I - 1, J) || !at(I, J - 1) || !at(I - 1, J - 1)
      if (dr) col = HOOD.sh; else if (ul) col = HOOD.hi
    }
    px(I, J, col)
  }
  // the hood's lining: fabric next to the face opening goes dark (two cells deep where the hood overhangs the top)
  for (let J = 0; J < HG; J++) for (let I = 0; I < HG; I++) {
    if (!at(I, J)) continue
    const i = I - HO, j = J - HO
    let edge = false, chin = false
    for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [1, 1], [-1, 1]]) if (open(i + a, j + b)) edge = true
    for (const [a, b] of [[0, -1], [1, -1], [-1, -1]]) if (open(i + a, j + b)) chin = true
    if (edge) { px(I, J, open(i, j + 1) ? HOOD.lin : HOOD.lin2); continue }
    if (chin) { px(I, J, HOOD.sh); continue }
    if (open(i, j + 2) || open(i - 1, j + 2) || open(i + 1, j + 2)) px(I, J, HOOD.lin2)
  }
  // a heart on the hood + the drawstrings
  HEART7.forEach((row, r) => [...row].forEach((ch, q) => { if (ch === 'X') px(15 + q + HO, 7 + r + HO, HOOD.heart) }))
  px(16 + HO, 7 + HO, '#ffd0de'); px(16 + HO, 8 + HO, '#ff8fb1')
  HOOD_IMG.set(key, c)
  return c
}

/** a star character wearing the hoodie (it squashes, hops and bobs with the sprite) */
export function hoodieStar(ctx, x, y, size, t, o = {}) {
  const pop = o.pop ?? 1, seed = o.seed ?? 1, alpha = o.alpha ?? 1
  const hs = hopState(t, o.hops)
  const sq0 = (o.squash || 0) + hs.sq
  const r = drawStarChar(ctx, x, y - hs.lift * size * 0.09, size, t, { ...o, hops: null, squash: sq0 })
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const sq = sq0 + 0.018 * Math.sin(t * 3.1 + seed * 1.7), sx = 1 + sq, sy = 1 - sq * 0.9
  const base = (FOOT_ROW - HALF) * cell
  const geo = { ...r, cell, sx, sy, base, eyeY: r.y + ((19.2 - HALF) * cell) * sy, eyeDX: 4.6 * cell * sx }
  const H = o.hoodie
  if (!H || pop <= 0 || alpha <= 0 || (H.on ?? 1) <= 0) return geo
  ctx.save()
  ctx.globalAlpha *= alpha * clamp(H.on ?? 1)
  ctx.translate(Math.round(x), Math.round(r.y + base) - (H.lift || 0)); ctx.scale(sx, sy)
  const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false
  ctx.drawImage(hoodieImage(H.down || 0), (-HALF - HO) * cell, (-HALF - HO) * cell - base, HG * cell, HG * cell)
  ctx.imageSmoothingEnabled = sm
  ctx.restore()
  return geo
}

// ─────────────────────────────────────────────── the hoodie laid flat, and folded (28 × 23 cells, centre 14, 11.5)
const FW = 28, FH = 23
const inPoly = (x, y, V) => { let s = false; for (let i = 0, j = V.length - 1; i < V.length; j = i++) { const [xi, yi] = V[i], [xj, yj] = V[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) s = !s } return s }
const mirror = V => V.map(([a, b]) => [FW - a, b])
const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
// codes: 1 fabric · 2 cuff · 3 hem · 4 pocket · 5 lining · 6 shade (a fold line)
const SLEEVE = [[9.2, 6], [9.2, 11.6], [4.4, 19.4], [0.6, 17.4]], CUFF = [[2.0, 15.3], [5.4, 17.6], [4.4, 19.4], [0.6, 17.4]]
const FLAT_SHAPES = [
  [[SLEEVE, 1], [mirror(SLEEVE), 1], [CUFF, 2], [mirror(CUFF), 2], [rect(8, 6, 20, 20.6), 1], [rect(8, 18.7, 20, 20.6), 3], [rect(10, 14.4, 18, 18.2), 4], ['hood', 1]],
  [[rect(8, 6, 20, 20.6), 1], [rect(8, 18.7, 20, 20.6), 3], [rect(8, 10.4, 15, 13.0), 6], [rect(12.8, 10.4, 15, 13.0), 2], [rect(13, 13.4, 20, 16.0), 6], [rect(13, 13.4, 15.2, 16.0), 2], ['hood', 1]],
  [[rect(8, 6, 20, 14.2), 1], [rect(8, 12.4, 20, 14.2), 3], ['hood', 1]],
  [[rect(7.5, 9, 20.5, 17.2), 1], [rect(7.5, 15.6, 20.5, 17.2), 3], [rect(7.5, 9, 20.5, 10.0), 6]],
]
const FLAT_HEART = [8, null, 7, 11]
const FLAT_IMG = new Map()
function flatImage(stage) {
  if (FLAT_IMG.has(stage)) return FLAT_IMG.get(stage)
  const c = canvasOf(FW, FH), x = c.getContext('2d'), code = new Uint8Array(FW * FH)
  for (let j = 0; j < FH; j++) for (let i = 0; i < FW; i++) {
    const fx = i + 0.5, fy = j + 0.5
    for (const [sh, cd] of FLAT_SHAPES[stage]) {
      if (sh === 'hood') {
        if (Math.abs((fx - 14) / 5.4) ** 3 + Math.abs((fy - 3.6) / 3.8) ** 3 < 1) code[j * FW + i] = ((fx - 14) / 3.0) ** 2 + ((fy - 4.3) / 2.0) ** 2 < 1 ? 5 : 1
      } else if (inPoly(fx, fy, sh)) code[j * FW + i] = cd
    }
  }
  const at = (i, j) => (i >= 0 && j >= 0 && i < FW && j < FH ? code[j * FW + i] : 0)
  const px = (i, j, col) => { x.fillStyle = col; x.fillRect(i, j, 1, 1) }
  for (let j = 0; j < FH; j++) for (let i = 0; i < FW; i++) {
    const cd = at(i, j)
    if (!cd) { if (at(i + 1, j) || at(i - 1, j) || at(i, j + 1) || at(i, j - 1)) px(i, j, HOOD.out); continue }
    let col = cd === 2 ? (j % 2 ? HOOD.cuffDk : HOOD.cuff) : cd === 3 ? (i % 2 ? HOOD.cuffDk : HOOD.cuff) : cd === 4 ? HOOD.sh : cd === 5 ? HOOD.lin : cd === 6 ? HOOD.sh : HOOD.fab
    if (cd === 1) { const dr = !at(i + 1, j) || !at(i, j + 1), ul = !at(i - 1, j) || !at(i, j - 1); if (dr) col = HOOD.sh; else if (ul) col = HOOD.hi }
    px(i, j, col)
  }
  // pocket seam, heart, drawstrings
  if (stage === 0) for (let i = 10; i < 18; i++) px(i, 14, HOOD.lin2)
  const hy = FLAT_HEART[stage], hx = 11
  if (hy != null) { HEART7.forEach((row, r) => [...row].forEach((ch, q) => { if (ch === 'X') px(hx + q, hy + r, HOOD.heart) })); px(hx + 1, hy, '#ffd0de') }
  FLAT_IMG.set(stage, c)
  return c
}
/** the flat hoodie centred at x, y (one cell = px); stage 0 flat, 1 sleeves in, 2 in half, 3 neat square */
export function drawFlatHoodie(ctx, x, y, px, stage, { alpha = 1, rot = 0, sx = 1, sy = 1 } = {}) {
  if (alpha <= 0 || px <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sx, sy)
  if (stage === 3) { ctx.fillStyle = 'rgba(10,4,20,0.35)'; ctx.fillRect(-6.8 * px, 6.0 * px, 13.6 * px, 1.4 * px) }
  const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false
  ctx.drawImage(flatImage(clamp(Math.round(stage), 0, 3)), -FW / 2 * px, -FH / 2 * px, FW * px, FH * px)
  ctx.imageSmoothingEnabled = sm
  ctx.restore()
}

// ─────────────────────────────────────────────── chat bubbles
const stepFill = (ctx, x, y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }
/** an incoming chat bubble with its top-left at x, y; k pops it from the tail (bottom-left); returns { w, h } */
export function drawBubble(ctx, x, y, text, { label = '', k = 1, alpha = 1, size = 44, h = 92, padX = 30, P = 8, fill = '#ffe8f1', ink = '#36102c', edge = '#ff8fb8', rot = 0 } = {}) {
  ctx.save()
  ctx.font = `700 ${size}px Inter, 'Helvetica Neue', Arial, 'Noto Color Emoji', sans-serif`
  const w = Math.ceil(ctx.measureText(text).width + 2 * padX)
  if (k <= 0.001 || alpha <= 0) { ctx.restore(); return { w, h } }
  ctx.globalAlpha *= alpha
  ctx.translate(x, y + h); ctx.rotate(rot); ctx.scale(k, k); ctx.translate(-x, -(y + h))
  if (label) {
    ctx.font = "700 26px 'Space Mono', ui-monospace, monospace"; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = 'rgba(6,4,18,0.75)'; ctx.fillText(label, x + 14, y - 12); ctx.fillStyle = 'rgba(239,230,214,0.82)'; ctx.fillText(label, x + 12, y - 14)
  }
  // drop shadow, edge, fill, tail
  stepFill(ctx, x + 6, y + 8, w, h, P, 'rgba(6,4,18,0.55)')
  stepFill(ctx, x - P / 2, y - P / 2, w + P, h + P, P, edge)
  stepFill(ctx, x, y, w, h, P, fill)
  ctx.fillStyle = edge
  for (let i = 0; i < 3; i++) ctx.fillRect(x + P * (1 - i) - P / 2, y + h - P + i * P, P * (3 - i) + P / 2, P + P / 2)
  ctx.fillStyle = fill
  for (let i = 0; i < 3; i++) ctx.fillRect(x + P * (1 - i), y + h - P + i * P, P * (3 - i) - P / 2, P)
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillRect(x + 3 * P, y + P, w - 6 * P, P / 2)
  ctx.font = `700 ${size}px Inter, 'Helvetica Neue', Arial, 'Noto Color Emoji', sans-serif`
  ctx.fillStyle = ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  ctx.fillText(text, x + padX, y + h / 2 + 2)
  ctx.restore()
  return { w, h }
}

// ─────────────────────────────────────────────── the ring box (16 cells wide)
const BOX_SHUT = BM(`
..LLLLLLLLLLLL..
.LMMMMMMMMMMMMk.
LMMhMMMMMMMMMMMk
GGGGGGGGGGGGGGGG
BBhBBBBBBBBBBBBD
BBBBBBBBBBBBBBBD
BBBBBBBBBBBBBBBD
.DDDDDDDDDDDDDD.`)
const BOX_LID = BM(`
..LLLLLLLLLLLL..
.LIIIIIIIIIIIIk.
LIIIIIIIIIIIIIIk
LIIIIIIIIIIIIIIk
GGGGGGGGGGGGGGGG`)
const BOX_OPEN = BM(`
BCCCCCRRRRCCCCCD
BCCCCRCCCCRCCCCD
BCCCCRCCCCRCCCCD
BCCCCCRRRRCCCCCD
BBhBBBBBBBBBBBBD
BBBBBBBBBBBBBBBD
.DDDDDDDDDDDDDD.`)
const GEM = BM(`.WWW. WwwwW .WwW. ..W..`)
const BOX_PAL = { L: '#8a1f45', M: '#b4325f', k: '#5c0f2c', h: '#e0628c', G: '#f2c75c', B: '#9c2550', D: '#5c0f2c', I: '#f6e7ee', C: '#3a0b22', R: '#f7d06b', W: '#bff4ff', w: '#ffffff' }
/** the ring box, centred at x, bottom at y; open 0…1 */
export function drawRingBox(ctx, x, y, px, open, t, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  const w = 16 * px, x0 = x - w / 2
  if (open < 0.5) {
    bmp(ctx, BOX_SHUT, x0, y - BOX_SHUT.length * px, px, BOX_PAL, alpha)
    return
  }
  const yb = y - BOX_OPEN.length * px
  bmp(ctx, BOX_OPEN, x0, yb, px, BOX_PAL, alpha)
  // the lid stands open behind
  bmp(ctx, BOX_LID, x0, yb - BOX_LID.length * px, px, BOX_PAL, alpha)
  // the gem on the ring, glinting
  const gy = yb - 3 * px
  bmp(ctx, GEM, x - 2.5 * px, gy, px, BOX_PAL, alpha)
  const tw = (Math.sin(t * 7) + 1) / 2
  ctx.save(); ctx.globalAlpha *= alpha * (0.5 + 0.5 * tw)
  drawPixelStar(ctx, x + 2.6 * px, gy - 0.4 * px, px * 3.2, tw > 0.5 ? 2 : 1, '#ffffff', '#ffffff')
  ctx.restore()
}

// ─────────────────────────────────────────────── the Sun (a 60-cell sprite: disc r 17.5, chunky rays, eyes)
const SG = 60, SCX = 30, SDR = 17.5
const SUN = { body: '#ffcc4a', core: '#ffe486', light: '#fff2b8', shade: '#f6a234', deep: '#e57d22', line: '#7f3410', ray: '#ffb83a', rayHi: '#ffe08a', rayLine: '#93400f', blush: '#ff7a6e' }
const SUN_EYES = {
  open: BM(`.XXXX. XWWXXX XWWXXX XWXXXX XXXXXX XXXXXX XXXXWX .XXXX.`),
  half: BM(`...... ...... ...... XXXXXX XXXXXX XWXXXX XXXXWX .XXXX.`),
  shut: BM(`...... ...... ...... ...... ...... XXXXXX .XXXX. ......`),
  happy: BM(`...... ...... .XXXX. XXXXXX XX..XX X....X ...... ......`),
}
let SUN_BUF = null
function paintSun(t, eyeL, eyeR, lx, ly, blush) {
  if (!SUN_BUF) { const c = canvasOf(SG, SG); SUN_BUF = { c, x: c.getContext('2d') } }
  const x = SUN_BUF.x
  x.clearRect(0, 0, SG, SG)
  const px = (i, j, col) => { x.fillStyle = col; x.fillRect(i, j, 1, 1) }
  const Lx = -0.62, Ly = -0.78
  // rays: 12 chunky triangles, long and short in turn
  for (let j = 0; j < SG; j++) for (let i = 0; i < SG; i++) {
    const dx = i + 0.5 - SCX, dy = j + 0.5 - SCX, d = Math.hypot(dx, dy)
    if (d < SDR - 0.2 || d > 26.5) continue
    const a = Math.atan2(dy, dx) + Math.PI / 2, k = Math.round(a / (TAU / 12)), off = a - k * TAU / 12
    const len = k % 2 ? 23.6 : 26.2, wid = (1 - (d - SDR) / (len - SDR)) * 0.19
    if (d > SDR && d < len && Math.abs(off) < wid) px(i, j, Math.abs(off) < wid - 0.075 ? (dx * Lx + dy * Ly > 0 ? SUN.rayHi : SUN.ray) : SUN.rayLine)
  }
  // the disc, lit from the upper-left
  for (let j = 0; j < SG; j++) for (let i = 0; i < SG; i++) {
    const dx = i + 0.5 - SCX, dy = j + 0.5 - SCX, d = Math.hypot(dx, dy)
    if (d > SDR + 0.9) continue
    if (d > SDR) { px(i, j, SUN.line); continue }
    const f = (dx * Lx + dy * Ly) / (d || 1)
    let col = SUN.body
    if (d > SDR - 1.4 && f < -0.2) col = SUN.deep
    else if (d > SDR - 2.6 && f < -0.05) col = SUN.shade
    else if (d > SDR - 1.6 && f > 0.25) col = SUN.light
    else if (d < 9) col = SUN.core
    px(i, j, col)
  }
  for (const [i, j] of [[19, 16], [20, 15], [21, 14], [18, 17], [22, 14]]) px(i, j, '#fffbe6')
  if (blush > 0) { x.globalAlpha = blush; for (const i of [18, 19, 20, 40, 41, 42]) { px(i, 35, SUN.blush); px(i, 36, SUN.blush) } x.globalAlpha = 1 }
  const put = (bm, x0, y0) => bm.forEach((row, jj) => [...row].forEach((ch, ii) => { if (ch !== '.') px(x0 + ii, y0 + jj, ch === 'X' ? '#1b1236' : '#ffffff') }))
  put(eyeL, 21 + (eyeL === SUN_EYES.open ? lx : 0), 26 + (eyeL === SUN_EYES.open ? ly : 0))
  put(eyeR, 33 + (eyeR === SUN_EYES.open ? lx : 0), 26 + (eyeR === SUN_EYES.open ? ly : 0))
  return SUN_BUF.c
}
const lidOf = (k, base) => (k >= 0.75 ? SUN_EYES.shut : k >= 0.25 ? SUN_EYES.half : base)
/** the Sun centred at x, y; cell = px per sprite cell (disc ≈ 35 cells across). eyes: 'open' | 'half' | 'happy';
 *  wink 0…1 closes the right eye into a happy arc; blink 0…1 both lids; rot = roll angle (radians) */
export function drawSun(ctx, x, y, cell, t, { rot = 0, eyes = 'half', look = [0, 0], wink = 0, blink = 0, glow = 1, alpha = 1, k = 1, blush = 0.7 } = {}) {
  if (alpha <= 0 || k <= 0) return
  const base = SUN_EYES[eyes] || SUN_EYES.half
  const lx = clamp(Math.round(look[0]), -1, 1), ly = clamp(Math.round(look[1]), -1, 1)
  const eL = lidOf(blink, base), eR = wink >= 0.6 ? SUN_EYES.happy : wink >= 0.25 ? SUN_EYES.half : lidOf(blink, base)
  const img = paintSun(t, eL, eR, lx, ly, blush)
  const S = SG * cell * k
  ctx.save(); ctx.globalAlpha *= alpha
  glowAt(ctx, x, y, S * 0.95, '#ff9a2e', glow * (0.85 + 0.15 * Math.sin(t * 1.7)))
  glowAt(ctx, x, y, S * 0.5, '#ffd66a', glow * 0.55)
  ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false
  ctx.drawImage(img, -S / 2, -S / 2, S, S)
  ctx.imageSmoothingEnabled = sm
  ctx.restore()
}

// ─────────────────────────────────────────────── the supernova
const NOVA_COLS = ['#ff8fc0', '#c9a6ff', '#f2c75c', '#8fd8f6', '#ffffff', '#ff6fa8']
const NOVA_P = (() => {
  const r = rng(4242), out = []
  for (let i = 0; i < 130; i++) {
    const a = r() * TAU, v = 380 + Math.pow(r(), 0.7) * 1500, sz = 7 + Math.floor(r() * 4) * 3
    out.push({ a, v, sz, col: NOVA_COLS[Math.floor(r() * NOVA_COLS.length)], star: r() < 0.28, ph: r() * TAU, fall: 10 + r() * 30, life: 3.5 + r() * 5, wob: r() * TAU })
  }
  return out
})()
/** the supernova from t0 at (cx, cy): a pixel shock ring, a soft nebula that lingers (k fades it) and drifting debris */
export function drawNova(ctx, t, t0, cx, cy, { k = 1, scale = 1 } = {}) {
  const dt = t - t0
  if (dt < 0 || k <= 0) return
  // nebula: soft additive clouds that bloom and linger
  const nb = ease.outCubic(clamp(dt / 1.8))
  const NEB = [[0, 0, '#ff6fa8', 1], [-90, 60, '#b48cff', 0.85], [110, -40, '#6fa8ff', 0.7], [40, 110, '#ffcf6a', 0.5], [-60, -100, '#ff8fc0', 0.7]]
  for (const [ox, oy, col, a] of NEB) glowAt(ctx, cx + ox * scale * nb, cy + oy * scale * nb, (90 + 420 * nb) * scale, col, k * a * (0.9 - 0.45 * clamp((dt - 1) / 4)) * (0.92 + 0.08 * Math.sin(t * 1.3 + ox)))
  // the shock ring: pixel squares racing outward
  if (dt < 0.9) {
    const p = ease.outCubic(dt / 0.9), R = (40 + 1150 * p) * scale, n = 72, s = Math.round(18 * (1 - p) + 6)
    ctx.save(); ctx.globalAlpha *= k * (1 - p)
    for (let i = 0; i < n; i++) { const a = i / n * TAU; ctx.fillStyle = i % 3 ? '#fff4fb' : '#ff8fc0'; ctx.fillRect(Math.round(cx + Math.cos(a) * R - s / 2), Math.round(cy + Math.sin(a) * R * 0.92 - s / 2), s, s) }
    ctx.restore()
  }
  // debris: decelerating, then drifting down and twinkling
  ctx.save()
  for (const q of NOVA_P) {
    const rr = q.v * (1 - Math.exp(-2.3 * dt)) / 2.3 * scale
    const life = 1 - clamp((dt - q.life + 1.2) / 1.2)
    if (life <= 0) continue
    const tw = 0.55 + 0.45 * Math.sin(t * 6 + q.ph)
    const qx = cx + Math.cos(q.a) * rr + Math.sin(dt * 0.9 + q.wob) * 10, qy = cy + Math.sin(q.a) * rr * 0.9 + q.fall * dt * dt * 0.6
    ctx.globalAlpha = k * life * tw * clamp(dt * 8)
    if (q.star) drawPixelStar(ctx, qx, qy, q.sz * 2.4, tw > 0.75 ? 2 : 1, q.col)
    else { ctx.fillStyle = q.col; ctx.fillRect(Math.round(qx - q.sz / 2), Math.round(qy - q.sz / 2), q.sz, q.sz) }
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── small bits
/** happy tears: two little arcs of pixel drops springing sideways from the eyes */
export function drawTears(ctx, t, ex, ey, dx, px, { amount = 1, seed = 1, fountain = true } = {}) {
  if (amount <= 0) return
  const r = rng(seed * 991)
  const N = fountain ? 7 : 4
  for (const side of [-1, 1]) {
    for (let k = 0; k < N; k++) {
      const ph = ((t * (fountain ? 1.5 : 0.8)) + k / N + r() * 0.05) % 1
      const vx = fountain ? (60 + 30 * ((k * 7) % 3)) : 10, vy = fountain ? -120 : 0
      const gx = ex + side * dx + side * vx * ph * px / 8
      const gy = ey + px * 2 + vy * ph * px / 8 + 380 * ph * ph * px / 8
      ctx.save(); ctx.globalAlpha *= amount * (1 - ph * 0.7)
      ctx.fillStyle = '#9fe4ff'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), px, px * 2)
      ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), Math.ceil(px / 2), Math.ceil(px / 2))
      ctx.restore()
    }
  }
}
/** eye geometry of a plain drawStarChar result */
export function eyesOf(r) { const cell = r.size / G; return { ex: r.x, ey: r.y + (19.2 - HALF) * cell, dx: 4.6 * cell, px: Math.max(4, Math.round(cell)) } }

const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
/** a sweat drop sliding down beside a star */
export function drawSweat(ctx, t, x, y, px, alpha = 1) {
  const ph = (t * 1.2) % 1
  bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#7fd0f0', W: '#ffffff' }, alpha * (1 - ph * 0.6))
}

const HEART = BM(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
/** floating pixel hearts rising from (x, y) from t0 */
export function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 140, life = 1.6, rise = 260, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const k = (t - t0 - i * 0.12) / life
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx - 3.5 * px, y - k * rise, px, { X: cols[i % cols.length] }, alpha * Math.sin(Math.PI * k))
  }
}
/** one pixel heart, centred */
export function pixelHeart(ctx, x, y, px, col = '#ff5c8a', alpha = 1) { bmp(ctx, HEART, x - 3.5 * px, y - 3 * px, px, { X: col }, alpha) }

/** a ring of pixel stars bursting outward from (cx, cy) at t0 */
export function sparkBurst(ctx, t, cx, cy, t0, { n = 12, R = 200, size = 28, seed = 1, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'], life = 0.8, squash = 1 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + seed
    const rr = R * (0.45 + 0.75 * p) * (i % 2 ? 0.8 : 1)
    drawPixelStar(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * squash, size * (1 - 0.45 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  ctx.restore()
}

/** speed lines trailing left of a body moving right (x, y = the body's centre) */
export function speedLines(ctx, x, y, len, { alpha = 1, n = 5, spread = 60, col = '#efe6d6', seed = 1 } = {}) {
  if (alpha <= 0 || len <= 2) return
  const r = rng(seed)
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = col
  for (let i = 0; i < n; i++) { const oy = (i / (n - 1) - 0.5) * spread, l = len * (0.55 + 0.45 * r()); ctx.fillRect(Math.round(x - l - 30 - r() * 20), Math.round(y + oy), Math.round(l), 6) }
  ctx.restore()
}

/** a judge's scorecard on a stick ("10"), the card's centre at x, y */
export function drawScorecard(ctx, x, y, text, { k = 1, alpha = 1, rot = 0 } = {}) {
  if (k <= 0 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  ctx.fillStyle = '#8a5a2b'; ctx.fillRect(-5, 30, 10, 74)
  ctx.fillStyle = 'rgba(6,4,18,0.5)'; ctx.fillRect(-52, -38, 110, 82)
  ctx.fillStyle = '#2e0a20'; ctx.fillRect(-58, -44, 116, 82)
  ctx.fillStyle = '#fff7ee'; ctx.fillRect(-52, -38, 104, 70)
  ctx.font = "900 60px Inter, 'Helvetica Neue', Arial, sans-serif"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = '#e0245e'; ctx.fillText(text, 0, 0)
  ctx.restore()
}
