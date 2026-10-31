// sxorbit4 props — the ORBIT cast kit + small pixel props (pure functions; nothing touches `document` at module load).
// The colour helpers, the star transform (starFrame / inSprite), tears / hankie cells, the comet head + tail and
// makeTalkCard are copied from stcomet/scenes/props.js (films keep their props inside their own folder).
// New for ORBIT:
//   drawShell(ctx, x, y, R, t, o)   Tide's tiny pixel spiral shell (pearl pink), with peeking eyes in the opening
//   drawTide(ctx, x, y, size, t, o) Tide (♋ Cancer, signStar('cancer')) + the shell: o.hide 0 = out (shell on the back) … 1 = all the way in
//   drawViolin(ctx, x, y, c, t, o)  the soap-opera violin (o.play bows it, o.snapped = the string pinged off)
//   drawTissues(ctx, x, y, c, o)    Pisces' tissue box
//   drawBubble(ctx, x, y, w, h, o)  a pixel speech / thought bubble
//   buildBug(root, ep)              the fixed ORBIT show bug: "ORBIT" (Inter 800 small caps, pink) + " · EP n" (white 60%)
//   drawNextTime(ctx, t, t0, o)     the pink "NEXT TIME ON Orbit…" card

import { clamp, lerp, rng, el } from '../../../src/lib.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { easeOutBack } from '../../wheel.js'

const TAU = Math.PI * 2
const INK = '#1b1236'
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
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

/** cells with a 1-cell ink outline */
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

// ── happy tears (cells). Eyes sit at (13.4, 19.2) and (22.6, 19.2); drops leave the outer corners.
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
export function hankieCells(ctx, side) {
  const x0 = side < 0 ? 9 : 20, cells = []
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) cells.push([x0 + i, 19 + j, (i === 0 || j === 0 || i === 5 || j === 4) ? '#ff8fb1' : (i + j) % 3 ? '#fff6ee' : '#ffd6e2'])
  paintCells(ctx, cells)
}

// ── a pulsing anger mark (four little brackets) floating beside the top point (cells)
export function veinCells(ctx, t, k = 1) {
  if (k <= 0) return
  const s = 1 + 0.18 * Math.max(0, Math.sin(t * 9))
  ctx.save(); ctx.translate(27.5, 8.5); ctx.scale(s * k, s * k)
  const R = ['.XX.XX.', 'XX...XX', 'X.....X', '.......', 'X.....X', 'XX...XX', '.XX.XX.']
  const cells = []
  R.forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') cells.push([i - 3.5, j - 3.5, '#ff4058']) }))
  paintCells(ctx, cells)
  ctx.restore()
}

// ═══════════════════════════════════════════ the comet ═══════════════════════════════════════════
const C_PAL = { line: '#16234e', rim: '#5fc4f0', shade: '#9fd2f2', deep: '#78b4e2', body: '#dcf4ff', light: '#f4fcff', hi: '#ffffff', ice: '#bfe6fa' }
const EYE_O = ['.XX.', 'XWXX', 'XXXX', 'XXXX', '.XX.']
const EYE_H = ['....', '.XX.', 'X..X', '....', '....']
/** the tail: a soft ribbon + streaming pixel sparkles. ang = the direction the tail points (from the head, radians) */
export function drawCometTail(ctx, x, y, R, t, { ang = -0.62, len = 3.4, alpha = 1, wag = 0, seed = 7 } = {}) {
  if (alpha <= 0) return
  const L = R * len, c = Math.max(2, Math.round(R / 11))
  const dir = (u) => ang + wag * Math.sin(t * 7 - u * 3) * u
  const pt = (u, v) => { const a = dir(u), w = R * (0.9 + 1.1 * u) * v; return [x + Math.cos(a) * L * u - Math.sin(a) * w, y + Math.sin(a) * L * u + Math.cos(a) * w] }
  ctx.save(); ctx.globalAlpha *= alpha; ctx.globalCompositeOperation = 'lighter'
  // ribbon glow
  for (const [wk, a] of [[1, 0.3], [0.55, 0.42], [0.22, 0.6]]) {
    ctx.beginPath()
    for (let i = 0; i <= 20; i++) { const [px, py] = pt(i / 20, -wk); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py) }
    for (let i = 20; i >= 0; i--) { const [px, py] = pt(i / 20, wk); ctx.lineTo(px, py) }
    ctx.closePath()
    const g = ctx.createLinearGradient(x, y, x + Math.cos(ang) * L, y + Math.sin(ang) * L)
    g.addColorStop(0, `rgba(170,232,255,${a})`); g.addColorStop(0.45, `rgba(255,150,200,${a * 0.6})`); g.addColorStop(1, 'rgba(200,160,255,0)')
    ctx.fillStyle = g; ctx.fill()
  }
  ctx.globalCompositeOperation = 'source-over'
  // sparkles streaming out along the tail
  const r = rng(seed * 131 + 5), COLS = ['#ffffff', '#bff0ff', '#ff9ed0', '#ffe08a', '#d3b8ff', '#9fe8ff']
  for (let i = 0; i < 96; i++) {
    const sp = 0.35 + r() * 0.5, off = r(), v = (r() * 2 - 1) * 0.85, big = r() < 0.26, col = COLS[i % COLS.length]
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
/** the comet head. o: pop, alpha, shades (1 on the eyes … 0 pushed up), mood 'neutral' | 'happy' | 'wink', look, blink (0…1),
 *  squash (+ wide), tilt (rad), tag (the HELLO sticker), glint (time of a lens glint) */
export function drawComet(ctx, x, y, R, t, o = {}) {
  const { pop = 1, alpha = 1, shades = 1, mood = 'neutral', look = [0, 0], blink = 0, squash = 0, tilt = 0, tag = true, tagText = 'STREAK', glint = -9, stretch = 0, stretchAng = 0 } = o
  if (pop <= 0.01 || alpha <= 0) return
  const n = 11, c = Math.max(2, Math.round(R * pop / n))
  ctx.save(); ctx.globalAlpha *= alpha
  // coma glow
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, R * 2.1 * pop)
  g.addColorStop(0, 'rgba(190,240,255,0.55)'); g.addColorStop(0.45, 'rgba(120,200,255,0.18)'); g.addColorStop(1, 'rgba(120,200,255,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R * 2.1 * pop, 0, TAU); ctx.fill(); ctx.restore()
  ctx.translate(Math.round(x), Math.round(y))
  if (stretch) { ctx.rotate(stretchAng); ctx.scale(1 + stretch, 1 - stretch * 0.5); ctx.rotate(-stretchAng) }
  ctx.rotate(tilt)
  ctx.scale(1 + squash, 1 - squash * 0.85)
  const px = (i, j, col) => { ctx.fillStyle = col; ctx.fillRect(i * c, j * c, c + 0.5, c + 0.5) }
  // head: a pixel disc, lit from the upper left
  for (let j = -n - 1; j <= n; j++) for (let i = -n - 1; i <= n; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5)
    if (d > n + 0.9) continue
    if (d > n) { px(i, j, C_PAL.line); continue }
    const s = (i + 0.5 + j + 0.5) / n
    let col = C_PAL.body
    if (d > n - 1.3 && s > 0.35) col = C_PAL.deep
    else if (s > 0.62) col = C_PAL.shade
    else if (d > n - 1.2) col = C_PAL.rim
    else if (s < -0.75 && d < n - 2) col = C_PAL.light
    px(i, j, col)
  }
  for (const [i, j] of [[-6, -7], [-7, -6], [-5, -8], [-7, -5], [-8, -4]]) px(i, j, C_PAL.hi)
  for (const [i, j] of [[4, 5], [5, 4], [-3, 6], [6, -2], [2, 7]]) px(i, j, C_PAL.ice)
  // eyes (seen when the shades are pushed up)
  const eyeY = -1, eyes = [[-4.5, eyeY], [1.5, eyeY]]
  const lx = clamp(Math.round(look[0]), -1, 1), ly = clamp(Math.round(look[1]), -1, 1)
  for (const [ex, ey] of eyes) {
    const bm = mood === 'happy' || (mood === 'wink' && ex > 0) ? EYE_H : blink > 0.5 ? ['....', '....', '....', 'XXXX', '.XX.'] : EYE_O
    const ox = bm === EYE_O ? lx : 0, oy = bm === EYE_O ? ly : 0
    bm.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') px(ex + i + ox, ey + j - 2 + oy, INK); else if (ch === 'W') px(ex + i + ox, ey + j - 2 + oy, '#ffffff') }))
  }
  // cheeks
  ctx.globalAlpha *= 0.85; for (const i of [-7, -6, 5, 6]) px(i, 3, '#ff9ec8'); ctx.globalAlpha /= 0.85
  // shades: on the eyes (shades = 1) … pushed up onto the head (0)
  const sy = Math.round(lerp(-9, -3, clamp(shades))), sr = lerp(-0.12, 0, clamp(shades))
  ctx.save(); ctx.rotate(sr)
  const FR = '#ff4fa3', FRH = '#ffa3d2', LENS = '#140c26'
  for (let i = -8; i <= 7; i++) px(i, sy, i < -6 ? FRH : FR)
  for (const [x0, w] of [[-7, 6], [1, 6]]) {
    for (let j = 1; j <= 4; j++) {
      const inset = j === 4 ? 1 : 0
      for (let i = x0 + inset; i < x0 + w - inset; i++) px(i, sy + j, LENS)
      px(x0 - 1 + inset, sy + j, FR); px(x0 + w - inset, sy + j, FR)
    }
    px(x0 + 1, sy + 1, '#ffffff'); px(x0 + 2, sy + 2, '#cfd6ff'); px(x0 + 1, sy + 2, '#7f86b8')
  }
  px(-1, sy + 1, FR); px(0, sy + 1, FR)
  px(-9, sy, FR); px(8, sy, FR)
  ctx.restore()
  // glint: a 4-point star flashing on the left lens
  const gt = t - glint
  if (gt >= 0 && gt < 0.45 && shades > 0.5) {
    const k = Math.sin(Math.PI * gt / 0.45), L = Math.round(2 + 4 * k)
    ctx.fillStyle = '#ffffff'
    const gx = -5, gy = sy + 1.5
    ctx.fillRect((gx - 0.5) * c, (gy - L) * c, c, (2 * L) * c); ctx.fillRect((gx - L) * c, (gy - 0.5) * c, (2 * L) * c, c)
  }
  // the HELLO sticker
  if (tag) {
    ctx.save(); ctx.translate(-0.15 * n * c, 0.62 * n * c); ctx.rotate(-0.1)
    const w = 13.5 * c, h = 7.6 * c
    ctx.fillStyle = INK; ctx.fillRect(-w / 2 - c * 0.5, -h / 2 - c * 0.5, w + c, h + c)
    ctx.fillStyle = '#e8344e'; ctx.fillRect(-w / 2, -h / 2, w, h * 0.42)
    ctx.fillStyle = '#fbf6ec'; ctx.fillRect(-w / 2, -h / 2 + h * 0.42, w, h * 0.58)
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = '#ffffff'; ctx.font = `800 ${Math.round(h * 0.3)}px Inter, Arial, sans-serif`; ctx.fillText('HELLO', 0, -h / 2 + h * 0.22)
    ctx.fillStyle = INK; ctx.font = `800 ${Math.round(h * (tagText.length > 5 ? 0.34 : 0.4))}px Inter, Arial, sans-serif`; ctx.fillText(tagText, 0, -h / 2 + h * 0.72)
    ctx.restore()
  }
  ctx.restore()
}

// ═══════════════════════════════════════════ the talk card ═══════════════════════════════════════════
/** card-talk-6.png (VI The Lovers, 732×1170) with its question repainted: lines = ['What helps you', 'feel secure?'] */
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

// ═══════════════════════════════════════════ ORBIT: Tide's shell ═══════════════════════════════════════════
const SH = { line: '#3a1838', base: '#ffe1ec', stripe: '#ec78aa', shade: '#d97fa8', hi: '#fff8fb', lip: '#fff3f7', hole: '#251030', hole2: '#3b1a46' }
const inShell = (i, j) => Math.hypot(i, j) <= 9 || Math.hypot(i - 6.2, j + 6.4) <= 3.7 || Math.hypot(i - 8.8, j + 9.2) <= 1.7
const APX = -4.6, APY = 3.2, ARX = 4.2, ARY = 3.5
/** Tide's tiny spiral shell centred at (x, y), radius R px (the whorl). o: alpha, rot, peek (0…1 eyes in the opening),
 *  look ([-1…1, -1…1]), blink (0…1), squash (+ wide), glow */
export function drawShell(ctx, x, y, R, t, { alpha = 1, rot = 0, peek = 0, look = [-1, 0], blink = 0, squash = 0, flipX = false } = {}) {
  if (alpha <= 0 || R <= 2) return
  const c = R / 9
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot); ctx.scale((1 + squash) * (flipX ? -1 : 1), 1 - squash * 0.85)
  const px = (i, j, col) => { ctx.fillStyle = col; ctx.fillRect(i * c, j * c, c + 0.6, c + 0.6) }
  for (let j = -13; j <= 11; j++) for (let i = -11; i <= 12; i++) {
    const cx = i + 0.5, cy = j + 0.5
    const inside = inShell(cx, cy)
    if (!inside) {
      if (inShell(cx + 1, cy) || inShell(cx - 1, cy) || inShell(cx, cy + 1) || inShell(cx, cy - 1)) px(i, j, SH.line)
      continue
    }
    const da = Math.hypot((cx - APX) / ARX, (cy - APY) / ARY)
    if (da < 0.78) { px(i, j, cy < APY - 1 ? SH.hole2 : SH.hole); continue }
    if (da < 1.08) { px(i, j, SH.lip); continue }
    // spiral stripes around the whorl's centre
    const qx = cx - 1.6, qy = cy + 1.4, r = Math.hypot(qx, qy), th = Math.atan2(qy, qx)
    const s = ((th / TAU + r / 5.2) % 1 + 1) % 1
    let col = s < 0.3 ? SH.stripe : SH.base
    if (cx + cy > 8.5 || Math.hypot(cx, cy) > 8.1 && cx + cy > 2) col = s < 0.3 ? SH.shade : '#f3c3d8'
    if (cx + cy < -9 && Math.hypot(cx, cy) > 6.6) col = SH.hi
    px(i, j, col)
  }
  // gloss
  for (const [i, j] of [[-3, -7], [-2, -7], [-4, -6], [5, -9], [-5, -5]]) px(i, j, '#ffffff')
  // peeking eyes in the opening
  if (peek > 0.01) {
    ctx.globalAlpha *= clamp(peek)
    const lx = clamp(Math.round(look[0]), -1, 1), ly = clamp(Math.round(look[1]), -1, 0)
    for (const ex of [APX - 2.2, APX + 0.9]) {
      const e0 = Math.round(ex), j0 = Math.round(APY - 1.5)
      if (blink > 0.5) { px(e0, j0 + 2, '#fff6ea'); px(e0 + 1, j0 + 2, '#fff6ea'); continue }
      for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) px(e0 + i, j0 + j, '#fff6ea')
      px(e0 + (lx < 0 ? 0 : 1), j0 + 1 + ly, INK); px(e0 + (lx < 0 ? 0 : 1), j0 + 2 + ly, INK)
    }
  }
  ctx.restore()
}

const CAN = signStar('cancer')
/** Tide = ♋ Cancer star + the shell. hide: 0 out (the shell rides on the back) · 0.5 peeking over the rim · 1 all the way in
 *  (only the shell, eyes in the opening). Other opts go to drawStarChar (mood, look, blink, hops, seed, squash, blush, glow, pop).
 *  shellLook / shellBlink steer the peeking eyes; shake jiggles the shell; returns { x, y, size, shell: { x, y, R } } */
export function drawTide(ctx, x, y, size, t, o = {}) {
  const { hide = 0, pop = 1, alpha = 1, shellLook = [-1, 0], shellBlink = 0, shake = 0, glyph = true, ...star } = o
  if (pop <= 0.01 || alpha <= 0) return { x, y, size }
  const h = clamp(hide), s = size * pop
  const back = { x: x + 0.37 * s, y: y + 0.2 * s, R: 0.2 * s, rot: 0.35 }
  const front = { x: x - 0.02 * s, y: y + 0.5 * s, R: 0.36 * s, rot: -0.06 }
  const k = clamp(h / 0.22), ke = k * k * (3 - 2 * k)
  const jig = shake ? shake * Math.sin(t * 47) * 0.05 : 0
  const S = { x: lerp(back.x, front.x, ke) + (shake ? shake * 6 * Math.sin(t * 61) : 0), y: lerp(back.y, front.y, ke), R: lerp(back.R, front.R, ke), rot: lerp(back.rot, front.rot, ke) + jig }
  // the star: rises a touch toward the peek, then sinks into the shell
  const sy = h < 0.5 ? lerp(y, y - 0.12 * s, h / 0.5) : lerp(y - 0.12 * s, y + 0.5 * s, (h - 0.5) / 0.5)
  const sp = h < 0.5 ? lerp(1, 0.8, h / 0.5) : lerp(0.8, 0.3, (h - 0.5) / 0.5)
  const starA = h < 0.88 ? 1 : 1 - clamp((h - 0.88) / 0.1)
  ctx.save(); ctx.globalAlpha *= alpha
  const inFront = h >= 0.12
  if (!inFront) drawShell(ctx, S.x, S.y, S.R, t, { rot: S.rot })
  if (starA > 0) drawStarChar(ctx, x, sy, size * pop * sp, t, { color: CAN.color, glyph: glyph && h < 0.3 ? CAN.glyph : null, ...star, alpha: starA, pop: 1, bob: h > 0.1 ? 0 : star.bob })
  if (inFront) drawShell(ctx, S.x, S.y, S.R, t, { rot: S.rot, peek: clamp((h - 0.9) / 0.08), look: shellLook, blink: shellBlink, squash: shake ? 0.04 * Math.sin(t * 40) * shake : 0 })
  ctx.restore()
  return { x, y: sy, size: size * pop * sp, shell: S }
}

// ═══════════════════════════════════════════ the soap-opera violin ═══════════════════════════════════════════
const VIOLIN = [
  '...KK....', '...KbK...', '...KK....', '...KnK...', '...KnK...', '...KnK...', '...KnK...', '...KnK...', '...KnK...',
  '..KbbbK..', '.KbbbbbK.', 'KbbbbbbbK', 'KbfbbbfbK', 'KbfbbbfbK', '.KbbbbbK.', '..KbbbK..', '.KbbbbbK.', 'KbbbbbbbK', 'KbbbbbbbK', 'KbbtttbbK', '.KbbtbbK.', '..KKKKK..',
]
const V_PAL = { K: '#2a1208', b: '#c0642a', n: '#3a1d10', f: '#2a1208', t: '#1a0c06' }
/** a violin centred at (x, y), cell c px, tilted rot; play = bow sawing (0…1 amplitude); snapped = a string pinged off */
export function drawViolin(ctx, x, y, c, t, { rot = -0.55, play = 0, snapped = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  const w = 9, h = VIOLIN.length, ox = -w * c / 2, oy = -h * c / 2
  VIOLIN.forEach((r, j) => [...r].forEach((ch, i) => { const col = V_PAL[ch]; if (!col) return; ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c + 0.5, c + 0.5) }))
  // highlight
  ctx.fillStyle = '#e89a5a'; ctx.fillRect(ox + 2 * c, oy + 11 * c, c, 2 * c); ctx.fillRect(ox + 2 * c, oy + 17 * c, c, 2 * c)
  // strings
  ctx.fillStyle = '#f4ead8'
  if (snapped <= 0) ctx.fillRect(ox + 4.4 * c, oy + 3 * c, c * 0.25, 17 * c)
  else {   // the snapped string curls off the top
    ctx.fillRect(ox + 4.4 * c, oy + 11 * c, c * 0.25, 9 * c)
    for (let k = 0; k < 10; k++) { const a = k * 0.55 * clamp(snapped * 1.5), rr = c * (1 + k * 0.5); ctx.fillRect(ox + 4.4 * c + Math.sin(a) * rr, oy + 11 * c - k * c * 0.8 - Math.cos(a) * rr * 0.3, c * 0.35, c * 0.35) }
  }
  ctx.fillRect(ox + 4.75 * c, oy + 3 * c, c * 0.2, 17 * c)
  // the bow (a thin stick + hair), sawing across the waist
  const saw = play * Math.sin(t * 9) * 4.5 * c
  ctx.save(); ctx.translate(ox + 4.5 * c + saw, oy + 14.5 * c); ctx.rotate(1.25)
  ctx.fillStyle = '#4a2410'; ctx.fillRect(-13 * c, -0.35 * c, 26 * c, 0.7 * c)
  ctx.fillStyle = '#f4ead8'; ctx.fillRect(-12 * c, 0.35 * c, 24 * c, 0.3 * c)
  ctx.fillStyle = '#1a0c06'; ctx.fillRect(-13.5 * c, -0.8 * c, 2 * c, 1.8 * c)
  ctx.restore()
  ctx.restore()
}

// ═══════════════════════════════════════════ Pisces' tissue box ═══════════════════════════════════════════
const TISSUE = [
  '....wWw.....', '...wWWWw....', '....wWw.....',
  'KKKKKKKKKKKK', 'KbbbbbbbbbbK', 'KbBbbBbbBbbK', 'KbbbbbbbbbbK', 'KBbbBbbBbbBK', 'KbbbbbbbbbbK', 'KKKKKKKKKKKK',
]
const T_PAL = { K: INK, b: '#9fd8ff', B: '#ffffff', w: '#f4f4ff', W: '#ffffff' }
export function drawTissues(ctx, x, y, c, { alpha = 1, rot = 0, puff = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  const w = 12, h = TISSUE.length, ox = -w * c / 2, oy = -h * c / 2 - puff * c
  TISSUE.forEach((r, j) => [...r].forEach((ch, i) => { const col = T_PAL[ch]; if (!col) return; ctx.fillStyle = col; ctx.fillRect(ox + i * c, (j < 3 ? oy : -h * c / 2) + j * c, c + 0.5, c + 0.5) }))
  ctx.restore()
}
/** a single tissue flying (pixel square crumpling as it goes) */
export function flyingTissue(ctx, x, y, c, rot) {
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  ctx.fillStyle = INK; ctx.fillRect(-2.5 * c, -2.5 * c, 5 * c, 5 * c)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-2 * c, -2 * c, 4 * c, 4 * c)
  ctx.fillStyle = '#dfe6ff'; ctx.fillRect(0, 0, 2 * c, 2 * c)
  ctx.restore()
}

// ═══════════════════════════════════════════ bubbles ═══════════════════════════════════════════
/** a chunky speech (or thought) bubble with its top-left at (x, y). tail = [tx, ty] the point it aims at */
export function drawBubble(ctx, x, y, w, h, { tail = null, thought = false, alpha = 1, fill = '#fff7ec', line = INK, lw = 7, r = 34, pop = 1 } = {}) {
  if (alpha <= 0 || pop <= 0.01) return
  ctx.save(); ctx.globalAlpha *= alpha
  const cx = x + w / 2, cy = y + h / 2
  ctx.translate(cx, cy); ctx.scale(pop, pop); ctx.translate(-cx, -cy)
  ctx.lineJoin = 'round'; ctx.lineWidth = lw; ctx.strokeStyle = line; ctx.fillStyle = fill
  if (tail && thought) {
    const [tx, ty] = tail
    for (let k = 0; k < 3; k++) { const u = 0.28 + k * 0.26, bx = lerp(cx, tx, u + 0.15), by = lerp(y + h, ty, u + 0.15), br = 22 - k * 6; ctx.beginPath(); ctx.arc(bx, by, br, 0, TAU); ctx.fill(); ctx.stroke() }
  }
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r)
  if (tail && !thought) {
    const [tx, ty] = tail, bx = clamp(tx, x + r + 30, x + w - r - 30), by = ty > y + h ? y + h : y
    ctx.moveTo(bx - 34, by); ctx.lineTo(tx, ty); ctx.lineTo(bx + 34, by)
  }
  ctx.fill(); ctx.stroke()
  if (tail && !thought) { const [tx, ty] = tail, bx = clamp(tx, x + r + 30, x + w - r - 30), by = ty > y + h ? y + h : y; ctx.fillStyle = fill; ctx.fillRect(bx - 30, by - (ty > y + h ? lw : -lw / 2) - 2, 60, lw + 2) }
  ctx.restore()
}

// ═══════════════════════════════════════════ the ORBIT show bug (DOM) ═══════════════════════════════════════════
/** fixed style (STARTALK-SHOWS.md): "ORBIT" Inter 800 small caps, letter-spaced, pink #ff7eb6, then " · EP n" in white at
 *  60% opacity. Top-left, 56 px from the edges. Call in build after the fonts load; returns the element. */
export function buildBug(root, ep) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', font: "800 46px Inter, 'Helvetica Neue', Arial, sans-serif", fontVariantCaps: 'all-small-caps',
    letterSpacing: '0.2em', lineHeight: '1', whiteSpace: 'nowrap', textShadow: '0 2px 10px rgba(6,4,18,0.85), 0 0 2px rgba(6,4,18,0.7)', pointerEvents: 'none' }, root)
  el('span', { color: '#ff7eb6' }, b, 'ORBIT')
  el('span', { color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em' }, b, ` · EP ${ep}`)
  return b
}

// ═══════════════════════════════════════════ the NEXT TIME card ═══════════════════════════════════════════
/** the pink "NEXT TIME ON Orbit…" card (canvas, screen space). in at t0 (swing-drop), out over [out0, out1]. sub = the tease line */
export function drawNextTime(ctx, t, t0, { out = [1e9, 1e9], sub = '', cx = 540, cy = 930, w = 880, h = 560, label = 'NEXT TIME ON' } = {}) {
  if (t < t0 || t > out[1]) return
  const tau = t - t0, pin = easeOutBack(clamp(tau / 0.42), 1.8), po = clamp((t - out[0]) / (out[1] - out[0]))
  const sc = lerp(0.55, 1, pin) * (1 - 0.25 * po * po), rot = -0.16 * (1 - clamp(tau / 0.42)) + 0.03 * Math.exp(-tau * 3) * Math.sin(tau * 9)
  ctx.save(); ctx.globalAlpha *= clamp(tau / 0.1) * (1 - po * po)
  // a pink wash behind it
  const wash = ctx.createRadialGradient(cx, cy, 80, cx, cy, 1100)
  wash.addColorStop(0, 'rgba(255,126,182,0.45)'); wash.addColorStop(1, 'rgba(90,10,50,0.55)')
  ctx.fillStyle = wash; ctx.fillRect(0, 0, 1080, 1920)
  ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(sc, sc)
  ctx.save(); ctx.shadowColor = 'rgba(40,0,20,0.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20
  ctx.fillStyle = '#f2c75c'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 34); ctx.fill(); ctx.restore()
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#ff8cc0'); g.addColorStop(0.55, '#ff5fa2'); g.addColorStop(1, '#c42a72')
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 24); ctx.fill()
  ctx.strokeStyle = 'rgba(255,240,200,0.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(-w / 2 + 30, -h / 2 + 30, w - 60, h - 60, 14); ctx.stroke()
  // a gloss sweep
  const sx = lerp(-w, w, clamp((tau - 0.3) / 0.8))
  const gl = ctx.createLinearGradient(sx - 120, 0, sx + 120, 0); gl.addColorStop(0, 'rgba(255,255,255,0)'); gl.addColorStop(0.5, 'rgba(255,255,255,0.35)'); gl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 24); ctx.clip(); ctx.fillStyle = gl; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore()
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  ctx.font = "700 40px 'Space Mono', monospace"; ctx.letterSpacing = '12px'; ctx.fillStyle = '#fff4f9'; ctx.fillText(label, 8, -h / 2 + 118); ctx.letterSpacing = '0px'
  ctx.font = "italic 600 220px 'EB Garamond', Georgia, serif"
  ctx.fillStyle = 'rgba(90,0,40,0.45)'; ctx.fillText('Orbit…', 8, 78)
  const tg = ctx.createLinearGradient(0, -120, 0, 80); tg.addColorStop(0, '#ffffff'); tg.addColorStop(1, '#ffe3a0')
  ctx.fillStyle = tg; ctx.fillText('Orbit…', 0, 70)
  if (sub) { ctx.font = "700 32px 'Space Mono', monospace"; ctx.letterSpacing = '5px'; ctx.fillStyle = 'rgba(255,244,249,0.92)'; ctx.fillText(sub, 3, h / 2 - 78); ctx.letterSpacing = '0px' }
  ctx.restore()
}
