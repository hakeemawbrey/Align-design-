// stname props: small pixel drawings on canvas (Star Talk season 3, "Even stars get a name."). Everything here is a pure
// function of its arguments (and t); nothing touches `document` at module top level (the sound build imports
// scenes/index.js in node).
//
//   castStar(ctx, x, y, size, t, o)  drawStarChar + accessories that sit exactly on the 36-cell sprite grid, so they hop,
//       squash and bob with it. o = drawStarChar opts plus:
//         glasses { down 0…1, glint }     tiny pixel reading glasses (the aunties)
//         shades  { down 0…1 }            pixel sunglasses (Aquarius); down slides them off the eyes
//         crown   true                    Leo's tiny crown on the top point
//         mitts   { cover 0…1, peek 0…1 } two of the star's own points folded over its eyes (peek drops the right one)
//         scale   extra smooth scale about the feet (Aquarius shrinking "a few pixels")
//       returns drawStarChar's { x, y, size, top } mapped through `scale`, plus eye geometry { ex, ey, edx, px }.
//   drawLabelMaker(ctx, x, y, px, { rot, buzz })      Virgo's chunky handheld label printer (x, y = centre)
//   drawLabelTape(ctx, x, y, text, { h, reveal, rot, split, tear })   embossed label tape (x, y = left-middle)
//   drawPlate(ctx, cx, cy, w, h, t, { flash })          the brass name plate: "THE ZODIAC · EST. ANTIQUITY"
//   drawGhostSlot(ctx, x, y, R, t, { alpha })           Aquarius's empty, reserved spot in the ring
//   drawTear / tearFountain / sparkleRing / drawNote / drawSweat
import { clamp, lerp, prog, ease, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { drawStarChar } from '../../startalk.js'

const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
const INK = '#1b1236', GOLD = '#f2c75c', BONE = '#efe6d6'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], k))) }
const lum = hex => { const [r, g, b] = hexToRgb(hex); return (0.299 * r + 0.587 * g + 0.114 * b) / 255 }
/** the sprite's own body colours (same recipe as startalk.js), for the points folded over the eyes */
function bodyPal(color) {
  const lift = clamp((0.78 - lum(color)) * 0.75, 0.1, 0.5)
  const body = mixHex(color, '#fff3dc', lift)
  return { body, light: mixHex(body, '#fffbea', 0.5), shade: mixHex(color, '#a02a6c', 0.14), line: mixHex(color, '#140a2e', 0.74) }
}

/** the hop curve startalk uses (copied so the accessories follow the exact lift + squash) */
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

// ─────────────────────────────── accessories, in sprite cells (eyes: cols 10–15 / 20–25, rows 15–22)
const LENS = [[8, 14], [19, 14]]
function ring9(x0, y0) {
  const out = []
  for (let j = 0; j < 9; j++) for (let i = 0; i < 9; i++) {
    const edge = i === 0 || j === 0 || i === 8 || j === 8, corner = (i === 0 || i === 8) && (j === 0 || j === 8)
    if (edge && !corner) out.push([x0 + i, y0 + j])
  }
  for (const [i, j] of [[1, 1], [7, 1], [1, 7], [7, 7]]) out.push([x0 + i, y0 + j])
  return out
}
function glassesCells(px, g) {
  const dy = Math.round((g.down || 0) * 5), frame = g.frame || '#7a1f3d', hi = g.hi || '#ffd98a'
  for (const [lx, ly0] of LENS) {
    const ly = ly0 + dy
    px(lx + 1, ly + 1, rgba('#bfefff', 0.18), 7, 7)
    for (const [i, j] of ring9(lx, ly)) px(i, j, frame)
    px(lx + 2, ly + 1, hi); px(lx + 1, ly + 2, hi)
    if (g.glint) px(lx + 5, ly + 2, '#ffffff', 2, 2)
  }
  px(17, 16 + dy, frame, 2, 1); px(6, 16 + dy, frame, 2, 1); px(28, 16 + dy, frame, 2, 1)
}
const SHADE = ['XXXXXXXX', 'XLLLLLLX', 'XLLLLLLX', 'XLLLLLLX', '.XLLLLX.', '..XXXX..']
function shadesCells(px, s) {
  const dy = Math.round((s.down || 0) * 6)
  for (const x0 of [9, 19]) {
    SHADE.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') px(x0 + i, 15 + dy + j, '#0b0618'); else if (ch === 'L') px(x0 + i, 15 + dy + j, j === 1 ? '#3b2a72' : '#1c1240') }))
    px(x0 + 2, 17 + dy, '#9fe8ff'); px(x0 + 3, 16 + dy, '#ffffff')
  }
  px(17, 16 + dy, '#0b0618', 2, 1)
  px(6, 16 + dy, '#0b0618', 3, 1); px(27, 16 + dy, '#0b0618', 3, 1)
}
const CROWN = ['L...L...L', 'GL.LGL.LG', 'GGLGGGLGG', 'GGGGGGGGG', 'GRGGBGGRG', 'GGGGGGGGG', 'LLLLLLLLL']
const CROWN_PAL = { L: '#7a4a10', G: '#ffd23f', R: '#ff3d6e', B: '#38c4ec' }
// two hands (the star's own side points) over the eyes, see-no-evil style: 10×8 cells each with three finger tips,
// a full dark outline (like the sprite's own) so they read against the body; the right hand mirrors the left
const HAND = ['.XX.XX.XX.', 'XXXXXXXXXX', 'XXXXXXXXXX', 'XXXXXXXXXX', 'XXXXXXXXXX', '.XXXXXXXXX', '..XXXXXXX.', '...XXXXX..']
const HW = 10
function mittsCells(px, m, P) {
  const k = clamp(m.cover ?? 1)
  if (k <= 0) return
  for (const side of [-1, 1]) {
    const peek = side > 0 ? clamp(m.peek || 0) : 0
    const x0 = (side < 0 ? 8 : 18) + Math.round(side * (1 - k) * 8), y0 = 13 + Math.round((1 - k) * 10 + peek * 8)
    const on = (i, j) => { const r = HAND[j]; if (!r || i < 0 || i >= HW) return false; return r[side < 0 ? i : HW - 1 - i] === 'X' }
    for (let j = -1; j <= HAND.length; j++) for (let i = -1; i <= HW; i++) {
      if (on(i, j)) continue
      if (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1)) px(x0 + i, y0 + j, P.line)
    }
    for (let j = 0; j < HAND.length; j++) for (let i = 0; i < HW; i++) if (on(i, j)) px(x0 + i, y0 + j, j <= 1 ? P.light : j >= 6 ? P.shade : P.body)
    for (const fi of [3, 6]) px(x0 + (side < 0 ? fi : HW - 1 - fi), y0 + 1, P.line, 1, 2)
  }
}

export function castStar(ctx, x, y, size, t, o = {}) {
  const pop = o.pop ?? 1, seed = o.seed ?? 1, alpha = o.alpha ?? 1, scale = o.scale ?? 1
  if (pop <= 0.001 || alpha <= 0.001) return { x, y, size: 0, top: y, ex: x, ey: y, edx: 0, px: 3 }
  const hs = hopState(t, o.hops)
  const sq0 = (o.squash || 0) + hs.sq
  const fy = y + size * 0.42
  ctx.save()
  if (scale !== 1) { ctx.translate(x, fy); ctx.scale(scale, scale); ctx.translate(-x, -fy) }
  const r = drawStarChar(ctx, x, y - hs.lift * size * 0.09, size, t, { ...o, hops: null, squash: sq0 })
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const sq = sq0 + 0.018 * Math.sin(t * 3.1 + seed * 1.7), sx = 1 + sq, sy = 1 - sq * 0.9
  const base = (FOOT_ROW - HALF) * cell
  if (o.glasses || o.shades || o.crown || o.mitts) {
    ctx.save(); ctx.globalAlpha *= alpha
    ctx.translate(Math.round(x), Math.round(r.y + base)); ctx.scale(sx, sy)
    const px = (i, j, c, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect((i - HALF) * cell, (j - HALF) * cell - base, cell * w, cell * h) }
    if (o.glasses) glassesCells(px, o.glasses)
    if (o.shades) shadesCells(px, o.shades)
    if (o.mitts) mittsCells(px, o.mitts, bodyPal(o.color || '#f7cf68'))
    if (o.crown) {
      ctx.save(); ctx.translate((18.5 - HALF) * cell, (1 - HALF) * cell - base); ctx.rotate(-0.16)
      CROWN.forEach((row, j) => [...row].forEach((ch, i) => { const c = CROWN_PAL[ch]; if (c) { ctx.fillStyle = c; ctx.fillRect((i - 4.5) * cell, (j - 6) * cell, cell, cell) } }))
      ctx.fillStyle = '#fff6c0'; ctx.fillRect(-3.5 * cell, -4 * cell, cell, cell)
      ctx.restore()
    }
    ctx.restore()
  }
  ctx.restore()
  // geometry back in the caller's space (through `scale`)
  const map = (px0, py0) => [x + (px0 - x) * scale, fy + (py0 - fy) * scale]
  const [rx, ry] = map(r.x, r.y), [, top] = map(r.x, r.top)
  const eyeY = r.y + base + ((19.2 - HALF) * cell - base) * sy
  const [, ey] = map(x, eyeY)
  return { x: rx, y: ry, size: r.size * scale, top, ex: rx, ey, edx: 4.6 * cell * sx * scale, px: Math.max(3, Math.round(cell * scale)), cell: cell * scale }
}

// ─────────────────────────────── bitmaps
export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

export function drawTear(ctx, x, y, px) {
  bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px)
}
/** tears arcing out of both eyes from t0 (to t1), one drop every `gap` s: pure f(t) */
export function tearFountain(ctx, t, ex, ey, edx, px, t0, t1 = 1e9, { gap = 0.09, spread = 1, life = 0.6, up = 1 } = {}) {
  if (t < t0) return
  for (const side of [-1, 1]) {
    const sx = ex + side * edx, k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
    for (let k = k0; k <= k1; k++) {
      const a = t - (t0 + k * gap)
      if (a < 0 || a > life) continue
      const vx = side * (90 + ((k * 37) % 5) * 22) * spread, vy = -(140 + ((k * 53) % 4) * 36) * up
      drawTear(ctx, sx + vx * a, ey + vy * a + 820 * a * a, px)
    }
  }
}
/** a single slow tear sliding down from an eye (the quiet cry) */
export function slowTear(ctx, t, ex, ey, px, t0, { period = 1.1, drop = 60 } = {}) {
  if (t < t0) return
  const ph = ((t - t0) / period) % 1
  ctx.save(); ctx.globalAlpha *= 1 - ph * ph
  drawTear(ctx, ex, ey + px * 3 + ph * drop, px)
  ctx.restore()
}

export function sparkleRing(ctx, t, cx, cy, t0, { n = 12, R0 = 200, size = 28, seed = 0.4, life = 0.75, cols = [GOLD, BONE, '#ff8fb1', '#c9a6ff', '#7fe0ff'], squash = 0.8 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(ctx, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p) * squash, size * (1 - 0.45 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  ctx.restore()
}
/** a burst of random pixel stars (the banner-style burst) */
export function sparkBurst(ctx, t, cx, cy, t0, { n = 18, R0 = 320, seed = 7, life = 0.9, cols = [GOLD, BONE, '#ff8fb1', '#c9a6ff', '#7fe0ff'] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life), r = rng(seed)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, d = R0 * (0.35 + r() * 0.65)
    drawPixelStar(ctx, cx + Math.cos(a) * d * p, cy + Math.sin(a) * d * p * 0.85, (18 + r() * 22) * (1 - 0.35 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  ctx.restore()
}

/** a floating pixel music note (Aquarius vibing) */
export function drawNote(ctx, x, y, px, col = '#7fe0ff') {
  bitmap(ctx, ['...XX', '...XX', '...X.', '...X.', '.XXX.', 'XXXX.', '.XX..'], { X: col }, x - 2.5 * px, y - 3.5 * px, px)
}
export function drawSweat(ctx, x, y, px) {
  bitmap(ctx, ['..X..', '.XWX.', 'XWWXX', 'XWXXX', '.XXX.'], { X: '#8fdcff', W: '#ffffff' }, x - 2.5 * px, y - 2.5 * px, px)
}

// ─────────────────────────────── Virgo's label maker
const LM = { body: '#4fd8c0', hi: '#a6f5e6', lo: '#259a8a', line: '#10302c', lcd: '#c9f2c4', lcdInk: '#2d4a2a', key: '#f4fbf8' }
/** a chunky handheld label printer, 14×20 art pixels, centred on (x, y). buzz 0…1 shakes it while printing */
export function drawLabelMaker(ctx, x, y, px, { rot = 0.1, buzz = 0, t = 0, stub = true } = {}) {
  ctx.save()
  ctx.translate(x + (buzz ? Math.sin(t * 90) * px * 0.4 * buzz : 0), y); ctx.rotate(rot)
  const w = 14, h = 20, ox = -w / 2 * px, oy = -h / 2 * px
  // outline + body (rounded by trimming the corners)
  R(ctx, ox - px, oy + px, (w + 2) * px, (h - 2) * px, LM.line); R(ctx, ox, oy, w * px, h * px, LM.line)
  R(ctx, ox, oy + px, w * px, (h - 2) * px, LM.body); R(ctx, ox + px, oy, (w - 2) * px, h * px, LM.body)
  R(ctx, ox + px, oy + px, px, (h - 3) * px, LM.hi); R(ctx, ox + 2 * px, oy, (w - 4) * px, px, LM.hi)
  R(ctx, ox + (w - 1) * px, oy + 2 * px, px, (h - 4) * px, LM.lo); R(ctx, ox + 2 * px, oy + (h - 1) * px, (w - 4) * px, px, LM.lo)
  // the tape slot along the top + a strip of tape peeking out
  R(ctx, ox + 3 * px, oy - px, 8 * px, px, LM.line)
  if (stub) {
    R(ctx, ox + 4.5 * px, oy - 5 * px, 5 * px, 4.4 * px, '#17131f'); R(ctx, ox + 4.5 * px, oy - 5 * px, 5 * px, px * 0.6, '#2c2638')
    for (const [a, b] of [[5.5, -3.8], [7, -3.8], [8.4, -3.8], [5.5, -2.4], [7.6, -2.4]]) R(ctx, ox + a * px, oy + b * px, px * 0.8, px * 0.8, '#f6f2ff')
  }
  // LCD with a blinking cursor line of "text"
  R(ctx, ox + 2 * px, oy + 2 * px, 10 * px, 5 * px, LM.line); R(ctx, ox + 2.5 * px, oy + 2.5 * px, 9 * px, 4 * px, LM.lcd)
  for (let k = 0; k < 4; k++) R(ctx, ox + (3.5 + k * 1.8) * px, oy + 3.8 * px, px * 1.2, px * 1.4, LM.lcdInk)
  if (Math.floor(t * 3) % 2 === 0) R(ctx, ox + 10.6 * px, oy + 3.6 * px, px * 0.5, px * 1.8, LM.lcdInk)
  // keypad (4×4 keys) + a big red PRINT key
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) R(ctx, ox + (2.3 + i * 2.4) * px, oy + (9 + j * 2.2) * px, px * 1.6, px * 1.3, i === 3 && j === 3 ? '#ff5c7a' : LM.key)
  ctx.restore()
}

// ─────────────────────────────── embossed label tape
/** measure once per font size (canvas measure, no document) */
export function tapeWidth(ctx, text, h = 50) {
  ctx.save(); ctx.font = `700 ${Math.round(h * 0.54)}px ${MONO}`
  const w = ctx.measureText(text).width + h * 0.9
  ctx.restore(); return w
}
/** dark embossed tape with raised white letters. (x, y) = left-middle. reveal 0…1 = how much has come out of the
 *  printer (clips from the left). split = the char index where "(pending)" starts; tear 0…1 peels that part off */
export function drawLabelTape(ctx, x, y, text, { h = 50, reveal = 1, rot = 0, split = -1, tear = 0, glow = 0 } = {}) {
  if (reveal <= 0) return
  ctx.save()
  ctx.font = `700 ${Math.round(h * 0.54)}px ${MONO}`
  const pad = h * 0.45, tw = ctx.measureText(text).width, w = tw + pad * 2
  ctx.translate(x, y); ctx.rotate(rot)
  const cutX = split >= 0 ? pad + ctx.measureText(text.slice(0, split)).width - h * 0.12 : w
  const piece = (x0, x1, txt, tx) => {
    // tape body with notched ends + a top highlight; then the embossed letters
    ctx.fillStyle = 'rgba(4,2,12,0.45)'; ctx.fillRect(x0 + 4, -h / 2 + 6, x1 - x0, h)
    ctx.fillStyle = '#17131f'; ctx.fillRect(x0, -h / 2, x1 - x0, h)
    ctx.fillStyle = '#2c2638'; ctx.fillRect(x0, -h / 2, x1 - x0, h * 0.14)
    ctx.fillStyle = '#0c0a12'; ctx.fillRect(x0, h / 2 - h * 0.1, x1 - x0, h * 0.1)
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
    ctx.fillStyle = '#05040a'; ctx.fillText(txt, tx + 2, 3)
    ctx.fillStyle = '#f6f2ff'; ctx.fillText(txt, tx, 0)
  }
  ctx.save()
  ctx.beginPath(); ctx.rect(-6, -h, Math.max(0, w * clamp(reveal)) + 6, h * 2); ctx.clip()
  if (glow > 0) { ctx.save(); ctx.shadowColor = rgba(GOLD, 0.8 * glow); ctx.shadowBlur = 30 * glow; ctx.fillStyle = rgba(GOLD, 0.25 * glow); ctx.fillRect(0, -h / 2, Math.min(w, cutX), h); ctx.restore() }
  if (split < 0 || tear <= 0) piece(0, w, text, pad)
  else {
    piece(0, cutX, text.slice(0, split), pad)
    // the torn-off part: drops, spins and fades
    const p = clamp(tear), fall = ease.inQuad(p)
    ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(p)
    ctx.translate(cutX + p * 40, fall * 260); ctx.rotate(p * 0.9)
    piece(0, w - cutX, text.slice(split), pad + ctx.measureText(text.slice(0, split)).width - cutX)
    ctx.restore()
  }
  ctx.restore()
  ctx.restore()
  return w
}

// ─────────────────────────────── the name plate
/** stepped-corner pixel panel (screen coords, top-left x, y) */
export function pixelPanel(ctx, x, y, w, h, { px = 6, fill = 'rgba(13,8,32,0.94)', border = GOLD, inner = '#7a5a18', glow = 1 } = {}) {
  const step = (o, col) => {
    ctx.fillStyle = col
    ctx.fillRect(x + o + 2 * px, y + o, w - 2 * o - 4 * px, h - 2 * o)
    ctx.fillRect(x + o, y + o + 2 * px, w - 2 * o, h - 2 * o - 4 * px)
    ctx.fillRect(x + o + px, y + o + px, w - 2 * o - 2 * px, h - 2 * o - 2 * px)
  }
  ctx.save()
  if (glow > 0) { ctx.shadowColor = `rgba(242,199,92,${0.55 * glow})`; ctx.shadowBlur = 36 * glow }
  step(0, border)
  ctx.restore()
  step(px, inner)
  step(px * 2, fill)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x + 2 * px, y, px * 4, px / 2 + 1); ctx.fillRect(x, y + 2 * px, px / 2 + 1, px * 3)
}
/** the brass name plate (centred): "THE ZODIAC" + "EST. ANTIQUITY". flash 0…1 = the gold glow when it's complete */
export function drawPlate(ctx, cx, cy, w, h, t, { flash = 0, title = 'THE ZODIAC', sub = 'EST. ANTIQUITY' } = {}) {
  const x0 = cx - w / 2, y0 = cy - h / 2
  pixelPanel(ctx, x0, y0, w, h, { px: 6, glow: 0.7 + 0.25 * Math.sin(t * 2.4) + flash * 1.4, fill: 'rgba(24,12,46,0.96)' })
  // brass screws
  for (const [sx, sy] of [[x0 + 26, y0 + 26], [x0 + w - 26, y0 + 26], [x0 + 26, y0 + h - 26], [x0 + w - 26, y0 + h - 26]]) {
    R(ctx, sx - 5, sy - 5, 10, 10, '#7a5a18'); R(ctx, sx - 4, sy - 4, 8, 8, '#e8c26a'); R(ctx, sx - 4, sy - 1, 8, 2, '#7a5a18')
  }
  ctx.save()
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  let fs = Math.round(h * 0.4)
  ctx.font = `600 ${fs}px ${SERIF}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(h * 0.05)}px`
  const tw0 = ctx.measureText(title).width
  if (tw0 > w - 92) { fs = Math.floor(fs * (w - 92) / tw0); ctx.font = `600 ${fs}px ${SERIF}` }
  const g = ctx.createLinearGradient(0, cy - h * 0.3, 0, cy + h * 0.1)
  g.addColorStop(0, '#fff3c4'); g.addColorStop(0.5, '#f2c75c'); g.addColorStop(1, '#c8902e')
  ctx.shadowColor = rgba(GOLD, 0.45 + 0.5 * flash); ctx.shadowBlur = 14 + 30 * flash
  ctx.fillStyle = g; ctx.fillText(title, cx + h * 0.03, cy + h * 0.08)
  ctx.shadowBlur = 0
  ctx.fillStyle = rgba('#f2c75c', 0.55); ctx.fillRect(cx - w * 0.3, cy + h * 0.17, w * 0.6, 2)
  ctx.font = `700 ${Math.round(h * 0.135)}px ${MONO}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(h * 0.04)}px`
  ctx.fillStyle = rgba(BONE, 0.72); ctx.fillText(sub, cx + h * 0.02, cy + h * 0.36)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.restore()
}

// ─────────────────────────────── Aquarius's reserved spot: a dashed star outline + the ♒ glyph
export function drawGhostSlot(ctx, x, y, R0, t, { alpha = 1, color = '#38c4ec', glyph = '♒' } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const pts = []
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? R0 * 0.5 : R0; pts.push([x + Math.cos(a) * rr, y + 4 + Math.sin(a) * rr]) }
  ctx.beginPath(); pts.forEach(([a, b], i) => (i ? ctx.lineTo(a, b) : ctx.moveTo(a, b))); ctx.closePath()
  ctx.fillStyle = rgba(color, 0.12 + 0.05 * Math.sin(t * 3)); ctx.fill()
  ctx.setLineDash([12, 9]); ctx.lineDashOffset = -t * 18; ctx.lineWidth = 5; ctx.strokeStyle = rgba('#a8ecff', 0.9); ctx.stroke()
  ctx.setLineDash([])
  ctx.font = `700 ${Math.round(R0 * 0.62)}px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = rgba('#a8ecff', 0.85); ctx.fillText(glyph + '︎', x, y + 8)
  ctx.restore()
}

/** a constellation line (gold, glowing), drawn from a to b up to k (0…1) */
export function goldLine(ctx, ax, ay, bx, by, k, { w = 5, alpha = 1, col = '#f7d77a' } = {}) {
  if (k <= 0 || alpha <= 0) return
  const ex = lerp(ax, bx, clamp(k)), ey = lerp(ay, by, clamp(k))
  ctx.save(); ctx.globalAlpha *= alpha; ctx.lineCap = 'round'
  ctx.shadowColor = 'rgba(242,199,92,0.9)'; ctx.shadowBlur = 16
  ctx.strokeStyle = col; ctx.lineWidth = w
  ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ex, ey); ctx.stroke()
  ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(255,250,225,0.9)'; ctx.lineWidth = Math.max(1.5, w * 0.36)
  ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ex, ey); ctx.stroke()
  ctx.restore()
}
