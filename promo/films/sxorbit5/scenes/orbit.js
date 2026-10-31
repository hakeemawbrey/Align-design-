// SNAPSHOT of promo/films/sxorbit1/scenes/orbit.js (Group A's ORBIT cast kit), copied unchanged into this film's folder so
// Eps 4–6 draw Ember, Tide + her shell, Streak, Pisces, the bug, PREVIOUSLY ON / NEXT TIME exactly like Eps 1–3.
// orbit — the ORBIT soap kit (Star Talk Shows, promo/films/STARTALK-SHOWS.md, Show 1). Built with sxorbit1 and shared by
// every episode (sxorbit2…6 import it from '../../sxorbit1/scenes/orbit.js', so the cast always matches).
//
// ═══════════════════════════════════════ THE CAST ═══════════════════════════════════════
//   drawEmber(ctx, x, y, size, t, opts)   ♈ EMBER: an Aries star, signStar('aries') red. opts = drawStarChar opts
//                                         (mood, look, hops, squash, pop, blush…) + rot (radians, about the base: faints).
//   drawTide(ctx, x, y, size, t, opts)    ♋ TIDE: a Cancer star, signStar('cancer') silvery-blue, with her tiny pearl spiral
//                                         SHELL carried on her lower-left point. opts = drawStarChar opts plus
//                                           hide  0…1   0 = out (the shell is tiny, at her side) → 1 = inside: the shell grows
//                                                       over her and only the shell shows
//                                           peek  0…1   while hidden: two eyes in the doorway (+ the shell lifts a touch)
//                                           peekLook [x, y]  where the peeking eyes point
//                                           thump 0…1   a heartbeat glowing through the shell (pink heart over the door)
//                                           door  0…1   a little wooden door shut over the doorway (Ep 3)
//                                           shake 0…1   the shell rattles (a knock)
//   drawStreak(ctx, x, y, R, t, opts)     ☄ STREAK: the comet, Ember's ex. Pearly-pink head, heart-pink shades, a gold star
//                                         clip, and the glittery tail (drawStreakTail first, then drawStreak on top).
//                                         opts: pop, alpha, shades (1 on … 0 pushed up), mood 'neutral'|'happy'|'wink',
//                                         look, squash, tilt, glint (time of a lens glint), stretch, stretchAng.
//   drawStreakTail(ctx, x, y, R, t, { ang, len, alpha, wag })   ang = the direction the tail points (from the head).
//   drawPisces(ctx, x, y, size, t, { tears 0…3, hank, box, ...drawStarChar opts })   the running gag: Pisces sobbing
//                                         into a tissue box at the edge of every episode.
//
// ═══════════════════════════════════════ THE SHOW ═══════════════════════════════════════
//   showBug(root, ep, { at })             the fixed ORBIT bug (DOM): "ORBIT" Inter 800 small caps, letter-spaced, pink
//                                         #ff7eb6, then " · EP n" white at 60%. Top-left, 56 px from the edges.
//                                         → { update(t, alpha = 1) }. Use cardFrame({ corners: 'tr bl br' }).
//   buildLogo(root, ep, title, { at, fly }) the glossy ORBIT title that opens Ep 1 and then shrinks into the bug.
//   buildPreviously(root, { at, len, label }) the 1 s "PREVIOUSLY ON ORBIT…" flash (Eps 2–6). → { update(t), on(t) }
//   drawFreeze(ctx, t, t0)                the cliffhanger freeze-frame grade (pink tint, scanlines, flash at t0).
//   buildNextTime(root, { at, out })      the pink "NEXT TIME ON Orbit…" card. → { update(t) }
//   soapZoom helpers: makeCam(keys), toS, dramaFx(ctx, t, snaps, ranges)   the soap-opera snap zooms + rose vignette.
//   drawMysteryCard(ctx, cx, cy, w, t, o) a veiled blind mystery card (sign coin, aura, "NO PHOTO YET").
//                                         o.face(ctx, x, y, size) + o.faceK 0…1: the reveal (Ep 2) draws a portrait in the aura.
//   makeTalkCard(doc, img, lines)         a talk card asset (card-talk-*.png, 732×1170) with our own question set in.
//   drawYes(ctx, cx, cy, s, t, o)         the YES pill under a card (o.on = pressed / stamped).
//   tearsCells / starFrame / inSprite     overlays seated on a star sprite (36-cell grid).
// Pure functions of their arguments; nothing touches `document` at module load.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar } from '../../startalk.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
export const ORBIT_PINK = '#ff7eb6'
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', ROSE = '#ff6b9a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const EMBER = signStar('aries'), TIDE = signStar('cancer'), PISCES = signStar('pisces')
export const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)

// ── colour helpers
export const hexRgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255] }
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const mixHex = (a, b, k) => { const A = hexRgb(a), B = hexRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], clamp(k)))) }
export const rgba = (hex, a) => { const [r, g, b] = hexRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

// ── small timing helpers
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const inR = (t, a, b) => t >= a && t < b
export const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
export const r3 = v => +v.toFixed(3)

// ═══════════════════════════════════════ sprite overlays (36-cell grid, same maths as startalk.js) ═══════════════════════
const G = 36, HALF = 18, SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)
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
/** happy/sad tears from the eye corners (k: 1 sniffle · 2 streams · 3 fountains) */
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
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}
export function hankieCells(ctx, side) {
  const x0 = side < 0 ? 9 : 20, cells = []
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) cells.push([x0 + i, 19 + j, (i === 0 || j === 0 || i === 5 || j === 4) ? '#ff8fb1' : (i + j) % 3 ? '#fff6ee' : '#ffd6e2'])
  paintCells(ctx, cells)
}

// ═══════════════════════════════════════ EMBER ═══════════════════════════════════════
/** Ember (♈ Aries, red). rot tips the star about its base (a faint: rot ≈ −1.5 falls back to the left). */
export function drawEmber(ctx, x, y, size, t, opts = {}) {
  const { rot = 0, overlay = null, ...o } = opts
  const so = { color: EMBER.color, glyph: size >= 120 ? EMBER.glyph : null, seed: 3, ...o }
  ctx.save()
  if (rot) { const F = starFrame(x, y, size, t, so); ctx.translate(F.ox, F.oy); ctx.rotate(rot); ctx.translate(-F.ox, -F.oy) }
  const r = drawStarChar(ctx, x, y, size, t, so)
  if (overlay) overlay(starFrame(x, y, size, t, so))
  ctx.restore()
  return r
}

// ═══════════════════════════════════════ TIDE + her shell ═══════════════════════════════════════
// the shell: a pearly spiral dome with a pointed tip and an arched doorway (procedural pixels, 26 × 24 cells)
const SH = { w: 26, h: 24 }
const SH_PAL = { line: '#2a1a4a', a: '#fbf3ff', b: '#e6d6f6', c: '#c9b2ea', d: '#a98ad6', pink: '#ffc8de', door: '#1a1030', hi: '#ffffff' }
let shellCache = null
function shellCells() {
  if (shellCache) return shellCache
  const cells = []
  const cx = 13, cy = 14.2
  for (let j = 0; j < SH.h; j++) for (let i = 0; i < SH.w; i++) {
    const u = i + 0.5, v = j + 0.5
    // dome body: an ellipse, flat at the bottom; plus a cone tip on top (slightly right)
    const inDome = ((u - cx) / 12.6) ** 2 + ((v - cy) / 9.6) ** 2 <= 1 && v <= 22.6
    const tipW = (v - 2) * 0.55
    const inTip = v >= 2 && v < 8 && Math.abs(u - 15.5) <= tipW
    if (!inDome && !inTip) continue
    const dx = u - cx - 1.5, dy = v - cy + 0.5, r = Math.hypot(dx, dy), th = Math.atan2(dy, dx)
    const band = ((r / 3.1 - th / TAU) % 1 + 1) % 1
    let col = band < 0.14 ? SH_PAL.d : band < 0.5 ? SH_PAL.b : band < 0.8 ? SH_PAL.a : SH_PAL.c
    if (inTip && !inDome) col = (j % 2) ? SH_PAL.c : SH_PAL.b
    if (v > 19.5 && col === SH_PAL.a) col = SH_PAL.b
    if (u > 21 && col !== SH_PAL.d) col = SH_PAL.c
    if (u < 6 && v < 12 && col === SH_PAL.b) col = SH_PAL.a
    // pink lip near the doorway
    const dd = ((u - 13) / 6.2) ** 2 + ((v - 23) / 7.6) ** 2
    if (dd <= 1.25 && dd > 1) col = SH_PAL.pink
    if (dd <= 1) col = 'DOOR'
    cells.push([i, j, col])
  }
  shellCache = cells
  return cells
}
/** the shell centred at (x, y) = the doorway bottom centre, c = px per cell. o: door, thump, peek, peekLook, eyeCol */
export function drawShell(ctx, x, y, c, t, { door = 0, thump = 0, peek = 0, peekLook = [0, 0], alpha = 1, glowCol = TIDE.color } = {}) {
  if (c <= 0 || alpha <= 0) return
  const cells = shellCells()
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x - 13 * c), Math.round(y - 22.6 * c))
  const px = (i, j, col) => { ctx.fillStyle = col; ctx.fillRect(Math.floor(i * c), Math.floor(j * c), Math.ceil(c) + 0.5, Math.ceil(c) + 0.5) }
  // outline
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b)) && j + b < 23) px(i + a, j + b, SH_PAL.line)
  for (const [i, j, col] of cells) px(i, j, col === 'DOOR' ? SH_PAL.door : col)
  // inner glow of the star inside (through the doorway)
  const g = 0.35 + 0.25 * thump
  for (const [i, j, col] of cells) if (col === 'DOOR' && j > 18) { ctx.globalAlpha = alpha * g * (j - 18) / 5; px(i, j, glowCol) }
  ctx.globalAlpha = alpha
  // pearly highlights
  for (const [i, j] of [[5, 9], [6, 8], [7, 7], [5, 10], [15, 3], [16, 4]]) px(i, j, SH_PAL.hi)
  // the peeking eyes
  if (peek > 0.02) {
    const lx = clamp(Math.round(peekLook[0]), -1, 1), ly = clamp(Math.round(peekLook[1]), -1, 1)
    const eyeY = 22 - Math.round(3 * clamp(peek * 1.4))
    for (const ex of [10, 14]) {
      for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) px(ex + i, eyeY + j, '#fffaf0')
      px(ex + (lx > 0 ? 1 : 0), eyeY + 1 + (ly > 0 ? 1 : ly < 0 ? -1 : 0), INK)
    }
  }
  // the door (Ep 3): planks, a knob, a tiny sign
  if (door > 0.01) {
    ctx.globalAlpha = alpha * clamp(door)
    for (const [i, j, col] of cells) if (col === 'DOOR') px(i, j, (i % 3 === 0) ? '#8a5a34' : (j % 4 === 0 ? '#b67a46' : '#a26a3c'))
    px(16, 20, GOLD); px(16, 21, '#c98a1f')
    ctx.globalAlpha = alpha
  }
  ctx.restore()
  // the heartbeat: a pink pixel heart thumping over the shell
  if (thump > 0.01) {
    const H = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
    const hc = c * (0.9 + 0.5 * thump)
    const hx = x - 3.5 * hc, hy = y - 31 * c - 3 * hc
    ctx.save(); ctx.globalAlpha *= alpha * clamp(thump * 1.4)
    ctx.shadowColor = 'rgba(255,110,170,0.9)'; ctx.shadowBlur = 30 * thump
    H.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { ctx.fillStyle = (i === 1 && j === 1) ? '#ffe1ee' : '#ff5f9c'; ctx.fillRect(hx + i * hc, hy + j * hc, hc + 0.5, hc + 0.5) } }))
    ctx.restore()
  }
}
/** Tide (♋ Cancer, silvery-blue) with her shell. See the header for opts. */
export function drawTide(ctx, x, y, size, t, opts = {}) {
  const { hide = 0, peek = 0, peekLook = [0, 0], thump = 0, door = 0, shake = 0, overlay = null, shellAlpha = 1, ...o } = opts
  const so = { color: TIDE.color, glyph: size >= 120 ? TIDE.glyph : null, seed: 6, ...o }
  const h = clamp(hide)
  const F = starFrame(x, y, size, t, so)
  const pop = so.pop ?? 1
  // shell geometry: tiny at her lower-left point → covering her
  const cSmall = size / 36 * 0.34, cBig = size / 36 * 1.22
  const e = ease.inOutCubic(h)
  const c = lerp(cSmall, cBig, e) * pop
  const footY = F.oy + 0.4 * F.cell
  const sx = lerp(F.ox - F.S * 0.36, F.ox, e) + shake * 10 * Math.sin(t * 70)
  const sy = lerp(F.oy - F.S * 0.02, footY, e) - peek * size * 0.06
  // the star: shrinks and slips inside as the shell takes over
  if (h < 0.75) {
    ctx.save()
    const k = 1 - clamp(h / 0.75)
    drawStarChar(ctx, x, y + (1 - k) * size * 0.2, size, t, { ...so, pop: pop * lerp(0.55, 1, k), alpha: (so.alpha ?? 1) * lerp(0.0, 1, k) })
    if (overlay && h < 0.05) overlay(F)
    ctx.restore()
  }
  if (shellAlpha > 0) drawShell(ctx, sx, sy, c, t, { door, thump, peek: h > 0.9 ? peek : 0, peekLook, alpha: shellAlpha * (so.alpha ?? 1) })
  return { F, shell: { x: sx, y: sy, c } }
}

// ═══════════════════════════════════════ STREAK (the comet) ═══════════════════════════════════════
const S_PAL = { line: '#3a1a4e', rim: '#ff9fd0', shade: '#f2b8e6', deep: '#d890d6', body: '#ffe6f6', light: '#fff6fc', hi: '#ffffff', ice: '#ffd0ec' }
const EYE_O = ['.XX.', 'XWXX', 'XXXX', 'XXXX', '.XX.']
const EYE_H = ['....', '.XX.', 'X..X', '....', '....']
export function drawStreakTail(ctx, x, y, R, t, { ang = -0.62, len = 3.6, alpha = 1, wag = 0, seed = 11 } = {}) {
  if (alpha <= 0) return
  const L = R * len, c = Math.max(2, Math.round(R / 11))
  const dir = (u) => ang + wag * Math.sin(t * 7 - u * 3) * u
  const pt = (u, v) => { const a = dir(u), w = R * (0.9 + 1.1 * u) * v; return [x + Math.cos(a) * L * u - Math.sin(a) * w, y + Math.sin(a) * L * u + Math.cos(a) * w] }
  ctx.save(); ctx.globalAlpha *= alpha; ctx.globalCompositeOperation = 'lighter'
  for (const [wk, a] of [[1, 0.3], [0.55, 0.42], [0.22, 0.6]]) {
    ctx.beginPath()
    for (let i = 0; i <= 20; i++) { const [px, py] = pt(i / 20, -wk); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py) }
    for (let i = 20; i >= 0; i--) { const [px, py] = pt(i / 20, wk); ctx.lineTo(px, py) }
    ctx.closePath()
    const g = ctx.createLinearGradient(x, y, x + Math.cos(ang) * L, y + Math.sin(ang) * L)
    g.addColorStop(0, `rgba(255,190,230,${a})`); g.addColorStop(0.45, `rgba(255,214,120,${a * 0.55})`); g.addColorStop(1, 'rgba(200,160,255,0)')
    ctx.fillStyle = g; ctx.fill()
  }
  ctx.globalCompositeOperation = 'source-over'
  const r = rng(seed * 131 + 5), COLS = ['#ffffff', '#ffd0ec', '#ff8fc8', '#ffe08a', '#d3b8ff', '#fff2b0']
  for (let i = 0; i < 110; i++) {
    const sp = 0.35 + r() * 0.5, off = r(), v = (r() * 2 - 1) * 0.85, big = r() < 0.3, col = COLS[i % COLS.length]
    const u = ((t * sp + off) % 1 + 1) % 1
    const [px, py] = pt(u, v * (0.3 + 0.7 * u))
    const a = (1 - u) ** 1.2 * (0.55 + 0.45 * Math.sin(t * 9 + i))
    if (a < 0.05) continue
    ctx.globalAlpha = alpha * clamp(a)
    ctx.fillStyle = col
    const s = big ? c * 1.5 : c * (u < 0.3 ? 1 : 0.75)
    const X = Math.round(px), Y = Math.round(py)
    ctx.fillRect(X - s / 2, Y - s / 2, s, s)
    if (big && a > 0.45) { ctx.fillRect(X - s * 1.5, Y - s / 4, s * 3, s / 2); ctx.fillRect(X - s / 4, Y - s * 1.5, s / 2, s * 3) }
  }
  ctx.restore()
}
export function drawStreak(ctx, x, y, R, t, o = {}) {
  const { pop = 1, alpha = 1, shades = 1, mood = 'happy', look = [0, 0], blink = 0, squash = 0, tilt = 0, glint = -9, stretch = 0, stretchAng = 0 } = o
  if (pop <= 0.01 || alpha <= 0) return
  const n = 11, c = Math.max(2, Math.round(R * pop / n))
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, R * 2.1 * pop)
  g.addColorStop(0, 'rgba(255,200,236,0.55)'); g.addColorStop(0.45, 'rgba(255,150,210,0.18)'); g.addColorStop(1, 'rgba(255,150,210,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R * 2.1 * pop, 0, TAU); ctx.fill(); ctx.restore()
  ctx.translate(Math.round(x), Math.round(y))
  if (stretch) { ctx.rotate(stretchAng); ctx.scale(1 + stretch, 1 - stretch * 0.5); ctx.rotate(-stretchAng) }
  ctx.rotate(tilt)
  ctx.scale(1 + squash, 1 - squash * 0.85)
  const px = (i, j, col) => { ctx.fillStyle = col; ctx.fillRect(i * c, j * c, c + 0.5, c + 0.5) }
  for (let j = -n - 1; j <= n; j++) for (let i = -n - 1; i <= n; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5)
    if (d > n + 0.9) continue
    if (d > n) { px(i, j, S_PAL.line); continue }
    const s = (i + 0.5 + j + 0.5) / n
    let col = S_PAL.body
    if (d > n - 1.3 && s > 0.35) col = S_PAL.deep
    else if (s > 0.62) col = S_PAL.shade
    else if (d > n - 1.2) col = S_PAL.rim
    else if (s < -0.75 && d < n - 2) col = S_PAL.light
    px(i, j, col)
  }
  for (const [i, j] of [[-6, -7], [-7, -6], [-5, -8], [-7, -5], [-8, -4]]) px(i, j, S_PAL.hi)
  // eyes (with lashes) when the shades are up
  const lx = clamp(Math.round(look[0]), -1, 1), ly = clamp(Math.round(look[1]), -1, 1)
  for (const ex of [-4.5, 1.5]) {
    const bm = mood === 'happy' || (mood === 'wink' && ex > 0) ? EYE_H : blink > 0.5 ? ['....', '....', '....', 'XXXX', '.XX.'] : EYE_O
    const ox = bm === EYE_O ? lx : 0, oy = bm === EYE_O ? ly : 0
    bm.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') px(ex + i + ox, -1 + j - 2 + oy, INK); else if (ch === 'W') px(ex + i + ox, -1 + j - 2 + oy, '#ffffff') }))
    px(ex + (ex < 0 ? -1 : 4), -3, INK)    // a lash
  }
  ctx.globalAlpha *= 0.85; for (const i of [-7, -6, 5, 6]) px(i, 3, '#ff7fb8'); ctx.globalAlpha /= 0.85
  // a tiny smile
  for (const [i, j] of [[-2, 5], [-1, 6], [0, 6], [1, 5]]) px(i, j, INK)
  // heart-pink shades: on the eyes (1) … pushed up (0)
  const sy = Math.round(lerp(-9, -3, clamp(shades))), sr = lerp(-0.12, 0, clamp(shades))
  ctx.save(); ctx.rotate(sr)
  const FR = '#ff3f8e', FRH = '#ff9fc8', LENS = '#2a0c26'
  for (let i = -8; i <= 7; i++) px(i, sy, i < -6 ? FRH : FR)
  for (const x0 of [-7, 1]) {
    const HEART = ['XX.XX.', 'XXXXXX', 'XXXXXX', '.XXXX.', '..XX..']
    HEART.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') px(x0 + i, sy + 1 + j, (i === 0 || i === 5 || j === 4 || (j === 3 && (i === 1 || i === 4))) ? FR : LENS) }))
    px(x0 + 1, sy + 2, '#ffffff'); px(x0 + 2, sy + 3, '#ffc0dc')
  }
  px(-1, sy + 1, FR); px(0, sy + 1, FR)
  ctx.restore()
  const gt = t - glint
  if (gt >= 0 && gt < 0.45 && shades > 0.5) {
    const k = Math.sin(Math.PI * gt / 0.45), L = Math.round(2 + 4 * k)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect((-5 - 0.5) * c, (sy + 2 - L) * c, c, 2 * L * c); ctx.fillRect((-5 - L) * c, (sy + 2 - 0.5) * c, 2 * L * c, c)
  }
  // the gold star clip (her signature)
  ctx.save(); ctx.translate(7 * c, -8 * c); ctx.rotate(0.3)
  drawPixelStar(ctx, 0, 0, 6 * c, 2, GOLD)
  ctx.restore()
  ctx.restore()
}

// ═══════════════════════════════════════ PISCES (the running gag) ═══════════════════════════════════════
export function drawTissueBox(ctx, x, y, c, t, { pull = 0 } = {}) {
  ctx.save(); ctx.translate(Math.round(x), Math.round(y))
  const w = 14 * c, h = 8 * c
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - c, -h / 2 - c, w + 2 * c, h + 2 * c)
  ctx.fillStyle = '#9ad8f0'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#ffffff'; for (let i = 0; i < 7; i++) ctx.fillRect(-w / 2 + i * 2 * c, -h / 2 + 2 * c, c, c)
  ctx.fillStyle = '#5fb2d8'; ctx.fillRect(-w / 2, h / 2 - 2 * c, w, 2 * c)
  // the tissue poking out (flutters; pulled higher on a sob)
  const fl = Math.sin(t * 6) * c * 0.8, ph = (3 + 4 * pull) * c
  ctx.fillStyle = INK; ctx.fillRect(-2.5 * c + fl, -h / 2 - ph - c, 5 * c, ph + c)
  ctx.fillStyle = '#fffaf2'; ctx.fillRect(-2 * c + fl, -h / 2 - ph, 4 * c, ph)
  ctx.restore()
}
export function drawPisces(ctx, x, y, size, t, opts = {}) {
  const { tears = 2, hank = 0, box = true, pull = 0, ...o } = opts
  const so = { color: PISCES.color, glyph: null, mood: 'sparkle', look: [-1, -1], seed: 12, glow: 0.8, ...o }
  drawStarChar(ctx, x, y, size, t, so)
  const F = starFrame(x, y, size, t, so)
  inSprite(ctx, F, () => { if (tears) tearsCells(ctx, t, tears); if (hank) hankieCells(ctx, hank) })
  if (box) drawTissueBox(ctx, x + size * 0.55, y + size * 0.42, Math.max(2, size / 36 * 1.1), t, { pull })
}

// ═══════════════════════════════════════ the mystery card + the YES pill ═══════════════════════════════════════
const CARD_SIGN = {
  aries: { glyph: '♈', name: 'ARIES', el: 'FIRE', a1: '#ff7a4a', a2: '#a3201c', a3: '#ffb36b', quote: '“Says yes first.”' },
  cancer: { glyph: '♋', name: 'CANCER', el: 'WATER', a1: '#6fc8ff', a2: '#2a4fa8', a3: '#c9b2ff', quote: '“Soft heart. Great listener.”' },
}
const rrect = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
/** a veiled blind mystery card centred at (cx, cy), width w (height 1.5 w). o: sign 'aries'|'cancer', rot, alpha,
 *  lift 0…1 (the veil starts to lift: the aura brightens, a light bar climbs), glow 0…1 */
export function drawMysteryCard(x, cx, cy, w, t, { sign = 'cancer', rot = 0, alpha = 1, lift = 0, glow = 0, scaleX = 1, seed = 0, face = null, faceK = 0 } = {}) {
  if (alpha <= 0 || w <= 0) return
  const C = CARD_SIGN[sign], h = w * 1.5, u = w / 300
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(scaleX, 1)
  x.save(); x.shadowColor = rgba(C.a1, 0.55 + 0.4 * glow); x.shadowBlur = (40 + 50 * glow) * u
  rrect(x, -w / 2, -h / 2, w, h, 26 * u); x.fillStyle = '#150c2c'; x.fill(); x.restore()
  const gr = x.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); gr.addColorStop(0, C.a1); gr.addColorStop(0.5, '#ff8fc8'); gr.addColorStop(1, C.a3)
  x.lineWidth = 6 * u; x.strokeStyle = gr; rrect(x, -w / 2, -h / 2, w, h, 26 * u); x.stroke()
  // header
  x.fillStyle = BONE; x.font = `italic 500 ${Math.round(34 * u)}px ${SERIF}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
  x.fillText('Mystery card', -w / 2 + 22 * u, -h / 2 + 52 * u)
  const pulse = 0.65 + 0.35 * Math.sin(t * 5 + seed)
  x.save(); x.shadowColor = C.a1; x.shadowBlur = (20 + 22 * pulse) * u
  x.beginPath(); x.arc(w / 2 - 40 * u, -h / 2 + 40 * u, 24 * u, 0, TAU); x.fillStyle = C.a1; x.fill(); x.restore()
  x.font = `700 ${Math.round(30 * u)}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#1a0e30'
  x.fillText(C.glyph + '︎', w / 2 - 40 * u, -h / 2 + 42 * u)
  // the veiled aura
  const ax = -w / 2 + 18 * u, ay = -h / 2 + 80 * u, aw = w - 36 * u, ah = 190 * u
  x.save(); rrect(x, ax, ay, aw, ah, 16 * u); x.clip()
  const g = x.createRadialGradient(0, ay + ah * 0.55, 10 * u, 0, ay + ah * 0.55, aw * 0.75)
  g.addColorStop(0, C.a3); g.addColorStop(0.45, C.a1); g.addColorStop(1, C.a2)
  x.fillStyle = g; x.fillRect(ax, ay, aw, ah)
  x.fillStyle = rgba('#1a0e30', 0.3 + 0.25 * lift); x.filter = `blur(${Math.round(lerp(13, 6, lift) * u)}px)`
  x.beginPath(); x.arc(0, ay + ah * 0.42, aw * 0.16, 0, TAU); x.fill()
  x.beginPath(); x.ellipse(0, ay + ah * 1.02, aw * 0.34, ah * 0.36, 0, 0, TAU); x.fill()
  x.filter = 'none'
  const vs = ((t * 0.5 + seed * 0.4) % 1.4) - 0.2
  const vg = x.createLinearGradient(ax + aw * vs - 60 * u, ay, ax + aw * vs + 60 * u, ay + ah); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(0.5, 'rgba(255,255,255,0.22)'); vg.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = vg; x.fillRect(ax, ay, aw, ah)
  if (lift > 0) {   // the veil lifting: a bright bar climbs, light floods in
    const ly = ay + ah * (1 - lift)
    const lg = x.createLinearGradient(0, ly - 40 * u, 0, ly + 40 * u); lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(0.5, `rgba(255,248,230,${0.9 * clamp(lift * 3)})`); lg.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = lg; x.fillRect(ax, ly - 40 * u, aw, 80 * u)
    x.fillStyle = `rgba(255,240,250,${0.35 * lift})`; x.fillRect(ax, ly, aw, ah)
  }
  x.font = `800 ${Math.round(aw * 0.36)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = rgba(BONE, 0.85 * (1 - lift))
  x.fillText('?', 0, ay + ah * 0.46)
  if (face && faceK > 0) {   // the reveal: face(ctx, cx, cy, size) draws the star's portrait inside the aura
    x.save(); x.globalAlpha *= clamp(faceK); face(x, 0, ay + ah * 0.52, ah * 0.92); x.restore()
    if (faceK < 1) { x.fillStyle = `rgba(255,248,236,${1 - faceK})`; x.fillRect(ax, ay, aw, ah) }
  }
  x.font = `700 ${Math.round(14 * u)}px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = rgba(BONE, 0.8)
  x.fillText(faceK > 0.5 ? 'FACE LAST ✓' : 'NO PHOTO YET', ax + 10 * u, ay + ah - 12 * u)
  x.restore()
  // sign + element pill
  const ry = ay + ah + 44 * u
  x.font = `600 ${Math.round(30 * u)}px ${SERIF}`; x.fillStyle = C.a1; x.textAlign = 'left'; x.fillText(C.name, -w / 2 + 22 * u, ry)
  const nw = x.measureText(C.name).width
  x.font = `700 ${Math.round(14 * u)}px ${MONO}`
  const pw = x.measureText(C.el).width + 26 * u, pxl = -w / 2 + 22 * u + nw + 14 * u
  rrect(x, pxl, ry - 24 * u, pw, 30 * u, 15 * u); x.strokeStyle = rgba(GOLD, 0.8); x.lineWidth = 2 * u; x.stroke()
  x.fillStyle = GOLD; x.fillText(C.el, pxl + 13 * u, ry - 4 * u)
  // the one-line bio
  x.font = `italic 500 ${Math.round(24 * u)}px ${SERIF}`; x.fillStyle = BONE; x.fillText(C.quote, -w / 2 + 22 * u, ry + 44 * u)
  // footer
  x.font = `700 ${Math.round(12 * u)}px ${MONO}`; x.fillStyle = rgba(LAV, 0.75); x.textAlign = 'right'
  x.fillText('MYSTERY CARD', w / 2 - 20 * u, h / 2 - 20 * u)
  x.restore()
}
/** the YES pill (centre cx, cy; s = scale). o.on 0…1 = pressed (pink fill, check). o.label overrides the text. */
export function drawYes(x, cx, cy, s, t, { on = 0, alpha = 1, label = null, press = 0 } = {}) {
  if (alpha <= 0 || s <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(s * (1 - 0.1 * press), s * (1 - 0.1 * press))
  const w = 200, h = 70
  x.save(); x.shadowColor = rgba(ORBIT_PINK, 0.4 + 0.5 * on); x.shadowBlur = 20 + 40 * on
  rrect(x, -w / 2, -h / 2, w, h, 35); x.fillStyle = on > 0.5 ? ORBIT_PINK : 'rgba(20,10,40,0.9)'; x.fill(); x.restore()
  x.lineWidth = 5; x.strokeStyle = ORBIT_PINK; rrect(x, -w / 2, -h / 2, w, h, 35); x.stroke()
  x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = on > 0.5 ? INK : ORBIT_PINK
  x.fillText(label || (on > 0.5 ? 'YES ✓' : 'YES?'), 0, 2)
  x.restore()
}
/** a slammed stamp (rotated pill of big text) — used for "yes. / YES. / YESSS!!" */
export function drawStamp(x, cx, cy, text, size, t, t0, { col = ORBIT_PINK, rot = -0.12, life = 99 } = {}) {
  const dt = t - t0
  if (dt < 0 || dt > life) return
  const k = dt < 0.12 ? lerp(2.2, 1, ease.outCubic(dt / 0.12)) : 1 + 0.05 * Math.exp(-(dt - 0.12) * 9) * Math.cos((dt - 0.12) * 30)
  const a = clamp(dt / 0.06) * (1 - prog(dt, life - 0.25, life))
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const tw = x.measureText(text).width + size * 0.7, th = size * 1.3
  x.lineWidth = size * 0.1; x.strokeStyle = col; rrect(x, -tw / 2, -th / 2, tw, th, size * 0.2); x.stroke()
  x.fillStyle = rgba(col, 0.12); x.fill()
  x.lineJoin = 'round'; x.lineWidth = size * 0.16; x.strokeStyle = INK; x.strokeText(text, 0, size * 0.04)
  x.fillStyle = col; x.fillText(text, 0, size * 0.04)
  x.restore()
}
/** tonight's deck: a little stack of card backs (drawn, no image), centred at (cx, cy), width w */
export function drawDeck(x, cx, cy, w, t, { n = 5, alpha = 1, glow = 0.5 } = {}) {
  if (alpha <= 0) return
  const h = w * 1.5
  x.save(); x.globalAlpha *= alpha
  for (let i = n - 1; i >= 0; i--) {
    const ox = i * 5, oy = -i * 6
    x.save(); x.translate(cx + ox, cy + oy); x.rotate(0.02 * Math.sin(i * 1.7))
    if (i === 0) { x.shadowColor = rgba(GOLD, 0.6 * glow); x.shadowBlur = 50 }
    drawCardBack(x, 0, 0, w, h, t)
    x.restore()
  }
  x.restore()
}
export function drawCardBack(x, cx, cy, w, h, t, { scaleX = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(scaleX, 1)
  const g = x.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); g.addColorStop(0, '#3a2470'); g.addColorStop(1, '#1a0f3c')
  rrect(x, -w / 2, -h / 2, w, h, w * 0.09); x.fillStyle = g; x.fill()
  x.lineWidth = Math.max(2, w * 0.02); x.strokeStyle = rgba(GOLD, 0.85); x.stroke()
  rrect(x, -w / 2 + w * 0.07, -h / 2 + w * 0.07, w * 0.86, h - w * 0.14, w * 0.05); x.lineWidth = Math.max(1, w * 0.008); x.strokeStyle = rgba(BONE, 0.45); x.stroke()
  // seed of life
  x.strokeStyle = rgba(GOLD, 0.75); x.lineWidth = Math.max(1, w * 0.012)
  const r = w * 0.14
  x.beginPath(); x.arc(0, -h * 0.08, r, 0, TAU); x.stroke()
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; x.beginPath(); x.arc(Math.cos(a) * r, -h * 0.08 + Math.sin(a) * r, r, 0, TAU); x.stroke() }
  x.fillStyle = rgba(BONE, 0.8); x.font = `italic 500 ${Math.round(w * 0.16)}px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('Align', 0, h * 0.3)
  x.restore()
}

// ═══════════════════════════════════════ the camera: soap-opera snap zooms ═══════════════════════════════════════
// keys: [t, zoom, focusX, focusY, screenX, screenY, ease into this key]
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic, whip: ease.inOutQuad, step: x => (x >= 1 ? 1 : 0) }
export const IDN = [1, 540, 960, 540, 960]
export function makeCam(CAM) {
  return function cam(t) {
    let i = 0
    while (i + 1 < CAM.length && CAM[i + 1][0] <= t) i++
    const a = CAM[i], b = CAM[i + 1]
    if (!b) return { z: a[1], fx: a[2], fy: a[3], sx: a[4], sy: a[5] }
    const e = (EZ[b[6]] || EZ.io)(prog(t, a[0], b[0]))
    return { z: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e), sx: lerp(a[4], b[4], e), sy: lerp(a[5], b[5], e) }
  }
}
/** a soap snap-zoom onto world point (fx, fy) at t0, held until t1: returns camera keys to splice into CAM */
export function snapKeys(t0, t1, z, fx, fy, sx = 540, sy = 1000, back = 0.3) {
  return [[t0, ...IDN, 'lin'], [r3(t0 + 0.12), z, fx, fy, sx, sy, 'out'], [t1, z * 1.04, fx, fy, sx, sy, 'lin'], [r3(t1 + back), ...IDN, 'io']]
}
export const toS = (C, wx, wy, s = 0) => ({ x: C.sx + (wx - C.fx) * C.z, y: C.sy + (wy - C.fy) * C.z, s: s * C.z })
/** the rose soap vignette (ranges [[a, b, k]…]) + crash-zoom speed lines at each snap time */
export function dramaFx(x, t, snaps, ranges, { cx = 540, cy = 1000, W = 1080, H = 1920 } = {}) {
  const k = ranges.reduce((m, [a, b, kk]) => Math.max(m, kk * clamp((t - a) / 0.08) * (1 - prog(t, b, b + 0.3))), 0)
  if (k > 0.01) {
    const g = x.createRadialGradient(cx, cy, 300, cx, cy, 1180)
    g.addColorStop(0, 'rgba(150,10,64,0)'); g.addColorStop(0.55, `rgba(150,10,64,${0.22 * k})`); g.addColorStop(1, `rgba(56,0,28,${0.78 * k})`)
    x.fillStyle = g; x.fillRect(0, 0, W, H)
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.16 * k
    const lx = 540 + Math.sin(t * 0.9) * 380, lg = x.createLinearGradient(lx - 260, 0, lx + 260, 0)
    lg.addColorStop(0, 'rgba(255,120,170,0)'); lg.addColorStop(0.5, 'rgba(255,150,190,1)'); lg.addColorStop(1, 'rgba(255,120,170,0)')
    x.fillStyle = lg; x.save(); x.translate(lx, 960); x.rotate(-0.35); x.fillRect(-260, -1400, 520, 2800); x.restore()
    x.restore()
  }
  for (const s of snaps) {
    const dt = t - s
    if (dt < 0 || dt > 0.34) continue
    const a = 1 - dt / 0.34, r = rng(Math.round(s * 100))
    x.save(); x.globalAlpha = 0.55 * a; x.strokeStyle = '#fff1f6'; x.lineCap = 'round'
    for (let i = 0; i < 46; i++) {
      const ang = r() * TAU, r0 = 300 + r() * 240 + dt * 900, len = 420 + r() * 700
      x.lineWidth = 2 + r() * 6
      x.beginPath(); x.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0); x.lineTo(cx + Math.cos(ang) * (r0 + len), cy + Math.sin(ang) * (r0 + len)); x.stroke()
    }
    x.restore()
    if (dt < 0.09) { x.fillStyle = `rgba(255,240,246,${0.2 * (1 - dt / 0.09)})`; x.fillRect(0, 0, W, H) }
  }
}
export function sparkleRing(x, t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV, CYAN], dur = 0.7, size = 28) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const p = ease.outCubic(tt / dur)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + seed
    drawPixelStar(x, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

// ═══════════════════════════════════════ the cliffhanger freeze ═══════════════════════════════════════
/** call AFTER drawing the (frozen) world: a pink-violet grade, scanlines, a white flash and a "❚❚" at t0 */
export function drawFreeze(x, t, t0, { W = 1080, H = 1920 } = {}) {
  const dt = t - t0
  if (dt < 0) return
  const k = clamp(dt / 0.12)
  x.save()
  x.globalCompositeOperation = 'color'; x.fillStyle = `rgba(255,110,180,${0.55 * k})`; x.fillRect(0, 0, W, H)
  x.globalCompositeOperation = 'multiply'; x.fillStyle = `rgba(200,140,220,${0.5 * k})`; x.fillRect(0, 0, W, H)
  x.globalCompositeOperation = 'source-over'
  x.fillStyle = `rgba(20,0,20,${0.16 * k})`; for (let y = 0; y < H; y += 6) x.fillRect(0, y, W, 2)
  if (dt < 0.16) { x.fillStyle = `rgba(255,255,255,${0.75 * (1 - dt / 0.16)})`; x.fillRect(0, 0, W, H) }
  x.restore()
}

// ═══════════════════════════════════════ DOM: the bug, the logo, PREVIOUSLY ON, NEXT TIME ═══════════════════════════════════════
const LOGO_CSS = { fontFamily: INTER, fontWeight: '800', letterSpacing: '0.24em', color: ORBIT_PINK, fontVariantCaps: 'all-small-caps' }
/** the fixed show bug, top-left 56 px from the edges */
export function showBug(root, ep, { at = 0 } = {}) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', whiteSpace: 'nowrap', display: 'none', pointerEvents: 'none', lineHeight: '1', transformOrigin: '0 50%',
    textShadow: '0 2px 10px rgba(6,4,18,0.85), 0 0 18px rgba(255,126,182,0.35)' }, root)
  el('span', { ...LOGO_CSS, fontSize: '44px' }, b, 'Orbit')
  el('span', { fontFamily: INTER, fontWeight: '800', fontSize: '28px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }, b, ` · EP ${ep}`)
  return {
    root: b,
    update(t, alpha = 1) {
      const a = alpha * clamp((t - at) / 0.25)
      b.style.display = a > 0.01 ? 'block' : 'none'; b.style.opacity = String(a)
    },
  }
}
/** Ep 1's glossy title: "ORBIT" swoops in, "EPISODE 1 · <title>" under it, then the logo shrinks into the bug's spot */
export function buildLogo(root, ep, title, { at = 0.6, fly = [2.2, 2.7] } = {}) {
  const wrap = el('div', { position: 'absolute', left: 0, top: '560px', width: '1080px', textAlign: 'center', display: 'none', pointerEvents: 'none' }, root)
  const big = el('div', { ...LOGO_CSS, fontSize: '230px', lineHeight: '1', letterSpacing: '0.12em', paddingLeft: '0.12em',
    background: 'linear-gradient(180deg, #fff0f7 0%, #ffb3d4 38%, #ff5fa2 62%, #c2307a 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
    filter: 'drop-shadow(0 8px 0 rgba(60,0,30,0.85)) drop-shadow(0 0 40px rgba(255,126,182,0.6))' }, wrap, 'Orbit')
  const sub = el('div', { marginTop: '18px', fontFamily: MONO, fontWeight: '700', fontSize: '34px', letterSpacing: '0.3em', color: BONE, textShadow: '0 3px 12px rgba(6,4,18,0.9)' }, wrap)
  el('span', {}, sub, `EPISODE ${ep} · `)
  el('span', { fontFamily: SERIF, fontStyle: 'italic', fontWeight: '500', fontSize: '58px', letterSpacing: '0', color: ORBIT_PINK }, sub, title)
  const shine = el('div', { position: 'absolute', left: 0, top: 0, width: '160px', height: '260px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.7), rgba(255,255,255,0))', transform: 'skewX(-20deg)', mixBlendMode: 'overlay' }, wrap)
  return {
    update(t) {
      if (t < at || t >= fly[1]) { wrap.style.display = 'none'; return }
      wrap.style.display = 'block'
      const p = easeOutBack(prog(t, at, at + 0.5), 1.6)
      const f = ease.inOutCubic(prog(t, ...fly))
      // fly: shrink toward the bug (top-left)
      const s = lerp(lerp(0.4, 1, p), 0.2, f)
      const tx = lerp(0, -540 + 56 + 120, f), ty = lerp(0, -560 + 56 - 40, f)
      wrap.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`
      wrap.style.opacity = String(clamp(prog(t, at, at + 0.15)) * (1 - prog(t, fly[1] - 0.15, fly[1])))
      sub.style.opacity = String(clamp(prog(t, at + 0.45, at + 0.7)) * (1 - f * 2))
      shine.style.left = (lerp(-200, 1200, prog(t, at + 0.3, at + 1.2))) + 'px'
    },
  }
}
/** the 1 s "PREVIOUSLY ON ORBIT…" flash (Eps 2–6): a VHS rewind band over the frame; your scene draws the recap under it */
export function buildPreviously(root, { at = 0, len = 1.0 } = {}) {
  const w = el('div', { position: 'absolute', inset: 0, display: 'none', pointerEvents: 'none' }, root)
  el('div', { position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 3px, rgba(0,0,0,0) 3px 7px)', mixBlendMode: 'multiply' }, w)
  const band = el('div', { position: 'absolute', left: 0, top: '170px', width: '1080px', textAlign: 'center', whiteSpace: 'nowrap' }, w)
  el('div', { fontFamily: MONO, fontWeight: '700', fontSize: '40px', letterSpacing: '0.24em', color: BONE, textShadow: '0 3px 12px rgba(6,4,18,0.95)' }, band, '◀◀ PREVIOUSLY ON')
  el('div', { ...LOGO_CSS, fontSize: '130px', lineHeight: '1.05', letterSpacing: '0.14em', textShadow: '0 6px 0 rgba(60,0,30,0.85), 0 0 34px rgba(255,126,182,0.6)' }, band, 'Orbit…')
  return {
    on: t => t >= at && t < at + len,
    update(t) {
      const on = t >= at && t < at + len
      w.style.display = on ? 'block' : 'none'
      if (!on) return
      const jit = Math.floor(t * 24) % 3 - 1
      band.style.transform = `translate(${jit * 3}px, ${(Math.floor(t * 12) % 2) * 2}px)`
      w.style.opacity = String(clamp((t - at) / 0.06) * (1 - prog(t, at + len - 0.08, at + len)))
    },
  }
}
/** the pink "NEXT TIME ON Orbit…" card that closes every episode but the finale (sits around y 560–900) */
export function buildNextTime(root, { at, out = null, top = 600 } = {}) {
  const w = el('div', { position: 'absolute', left: '90px', top: top + 'px', width: '900px', height: '300px', display: 'none', pointerEvents: 'none', transformOrigin: '50% 50%' }, root)
  el('div', { position: 'absolute', inset: 0, borderRadius: '34px', background: 'linear-gradient(160deg, #ff8fc4 0%, #ff4f9a 55%, #c22a77 100%)', boxShadow: '0 0 0 8px #fff0f7, 0 0 0 14px #ff4f9a, 0 30px 80px rgba(60,0,30,0.7), 0 0 120px rgba(255,126,182,0.6)' }, w)
  const shine = el('div', { position: 'absolute', top: 0, bottom: 0, width: '140px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.55), rgba(255,255,255,0))', transform: 'skewX(-20deg)' }, el('div', { position: 'absolute', inset: 0, borderRadius: '34px', overflow: 'hidden' }, w))
  const inner = el('div', { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }, w)
  const col = el('div', {}, inner)
  el('div', { fontFamily: MONO, fontWeight: '700', fontSize: '38px', letterSpacing: '0.3em', color: '#fff6fb', textShadow: '0 3px 0 rgba(120,0,60,0.55)' }, col, 'NEXT TIME ON')
  el('div', { fontFamily: SERIF, fontStyle: 'italic', fontWeight: '600', fontSize: '150px', lineHeight: '1', color: '#fff6fb', textShadow: '0 6px 0 rgba(120,0,60,0.6)' }, col, 'Orbit…')
  return {
    update(t) {
      const on = t >= at && (!out || t < out[1])
      w.style.display = on ? 'block' : 'none'
      if (!on) return
      const p = easeOutBack(prog(t, at, at + 0.45), 1.8), o = out ? 1 - ease.inCubic(prog(t, ...out)) : 1
      w.style.transform = `scale(${p * (1 + 0.012 * Math.sin(t * 3))}) rotate(${lerp(-8, -2, p)}deg)`
      w.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o)
      shine.style.left = lerp(-200, 1100, prog(t, at + 0.35, at + 1.2)) + 'px'
    },
  }
}

/** card-talk-*.png (732×1170) with its question repainted: lines = ['Your perfect', 'Sunday?'] (call in build only) */
export function makeTalkCard(doc, img, lines, { label = 'QUESTION' } = {}) {
  if (!img) return null
  const c = doc.createElement('canvas'); c.width = img.width; c.height = img.height
  const x = c.getContext('2d'); x.drawImage(img, 0, 0)
  const g = x.createLinearGradient(0, 822, 0, 990); g.addColorStop(0, 'rgb(17,9,45)'); g.addColorStop(1, 'rgb(15,8,40)')
  x.fillStyle = g; x.fillRect(114, 822, 504, 162)
  x.fillStyle = '#efe6d6'; x.font = "italic 500 58px 'EB Garamond', Georgia, serif"; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
  lines.forEach((s, i) => x.fillText(s, 366, 874 + i * 62))
  x.fillStyle = 'rgb(14,7,38)'; x.fillRect(340, 1036, 250, 23)
  x.font = "400 21px 'Space Mono', monospace"; x.letterSpacing = '4px'; x.textAlign = 'right'; x.fillStyle = 'rgb(166,144,105)'
  x.fillText(label, 574, 1055)
  x.letterSpacing = '0px'
  return c
}
