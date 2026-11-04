// HOME FOR THE HOLIDAYS: the shared look of Star Talk Season 15, episodes nh15e01–nh15e12 (one sign per episode brings
// someone home; rows in promo/films/next30/b03.md). The other episodes import this file from here:
//   import { makeHome, ... } from '../../nh15e01/homekit.js'
//
// What the kit owns (every episode looks like one show):
//   · the bug "HOME FOR THE HOLIDAYS" (Inter 800 small caps, letter-spaced, top-left 56 px), always on
//   · the sets, drawn in pixel blocks: the snowy house front (door that opens, wreath, roof lights, lit windows),
//     the living room (window with snow, tree with blinking lights, garland, fireplace, sofa), the dining table
//   · falling snow, the family name tags, props (pie, mug, gift, stocking, tissue box, plates), Pisces' tears
//   · headlines (popText), dialogue boxes, the optional LESSON UNLOCKED, the short end card (no card cut since 4 Nov)
//   · the hand-off: everything fades back to the plain sky H by STORY_END (endcard.js contract)
// What an episode gives makeHome(cfg):
//   id, duration, hero (sign id), date (sign id)
//   heads:  [{ text, at, out: [a, b], accent?, top?, size?, accentSize?, late?, lateAt?, wobble? }]   (at < 0 = on at frame 0)
//   lines:  [{ t, speaker, text, color? }]       boxes: [{ from, to, open?, close?, y? }] (indexes into lines)
//   draw(x, t, K)   paints the scene on the main canvas (sets, cast, props); K = kit helpers (see `kit` below)
//   lesson? { at, out, text, chip }       cuts: unused since 4 Nov (no card transition); duration: slate length, film = −2 s
//   flashes: [t…] white jump-cut flashes   shakes: [t…] little camera bumps   cues: extra sound cues
// Pure f(t); DOM and canvases are only made inside build(). Nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText, buildLesson, lessonCues } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#e8344e', GREEN = '#3fae6a', SNOW = '#f4f1ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ffb36b'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inK = (t, a, d = 0.3) => ease.outCubic(prog(t, a, a + d))
export const win = (t, a, b) => t >= a && t < b
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }
export const sign = id => ({ ...signStar(id), id, name: id === 'sagittarius' ? 'Sagittarius' : id[0].toUpperCase() + id.slice(1) })
/** the speaker tag for a sign: '♈︎ ARIES' */
export const tagOf = id => `${signStar(id).glyph}︎ ${id.toUpperCase()}`
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const FLOOR = 1350          // where everyone stands (interiors and the porch)
/** sprite centre y for a star of size s standing on floor y */
export const stand = (s, floor = FLOOR) => floor - 0.46 * s

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = 520 + 260 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt
    const sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble (canvas), popping at t0, gone by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a small family name tag (a bone pill with ink text), e.g. "MOM" under a star */
export function nameTag(x, text, cx, cy, { col = BONE, ink = INK, size = 24, alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + 26, h = size + 14
  R(x, INK, cx - w / 2 - 4, cy - h / 2 - 4, w + 8, h + 8); R(x, col, cx - w / 2, cy - h / 2, w, h)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, cx, cy + 1)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha *= a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function spotlight(x, tx, top, bx, by, w, a, col = '255,236,180') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${col},${0.05 * a})`); g.addColorStop(1, `rgba(${col},${0.26 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 30, top); x.lineTo(tx + 30, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${col},${0.3 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a warm radial glow */
export function glow(x, cx, cy, r, a, col = '255,206,140') {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, `rgba(${col},${0.3 * a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props and tears sit on the sprite through hops
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
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
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
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** a knitted scarf round the star's middle (sprite cells) */
export function scarfCells(ctx, col = RED, stripe = BONE) {
  ctx.fillStyle = INK; ctx.fillRect(9.4, 25.4, 17.2, 4.2); ctx.fillRect(21.4, 27, 4.2, 8.2)
  ctx.fillStyle = col; ctx.fillRect(10, 26, 16, 3); ctx.fillRect(22, 27.6, 3, 7)
  ctx.fillStyle = stripe; for (let i = 11; i < 26; i += 3) ctx.fillRect(i, 26, 1, 3); ctx.fillRect(22, 31, 3, 1)
}
/** a bobble hat (sprite cells) */
export function hatCells(ctx, col = RED, band = BONE) {
  ctx.fillStyle = INK; ctx.fillRect(12.4, 2.4, 11.2, 5.6); ctx.fillRect(16.4, -0.6, 3.2, 3.6)
  ctx.fillStyle = col; ctx.fillRect(13, 3, 10, 3.6); ctx.fillStyle = band; ctx.fillRect(13, 6, 10, 1.4); ctx.fillRect(17, 0, 2, 2.4)
}

// ── falling snow (pure f(t)), in front or behind
export function snow(x, t, { n = 70, alpha = 1, speed = 1, seed = 0, top = 0, bottom = 1920 } = {}) {
  x.save(); x.globalAlpha *= alpha
  for (let i = 0; i < n; i++) {
    const h = (i * 7919 + seed * 131) % 1000 / 1000, v = (60 + 90 * ((i * 37) % 10) / 10) * speed
    const sz = 4 + ((i * 13) % 3) * 2
    const yy = top + (((h * (bottom - top) + t * v) % (bottom - top)) + (bottom - top)) % (bottom - top)
    const xx = ((i * 263.7 + seed * 50) % 1100) - 10 + Math.sin(t * 0.9 + i) * 18
    x.fillStyle = i % 4 ? SNOW : '#cfd8ff'
    x.fillRect(Math.round(xx), Math.round(yy), sz, sz)
  }
  x.restore()
}

// ── the sets
const LIGHT_COLS = ['#ff5c6c', '#ffd23a', '#5fd38a', '#7fd0ff', '#ff8fd0']
/** a string of blinking holiday bulbs from (x0, y0) to (x1, y1), sagging */
export function bulbs(x, t, x0, y0, x1, y1, { n = 12, sag = 30, size = 12 } = {}) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 4
  x.beginPath()
  for (let i = 0; i <= 24; i++) { const u = i / 24, px = lerp(x0, x1, u), py = lerp(y0, y1, u) + sag * Math.sin(Math.PI * u); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.restore()
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n, px = lerp(x0, x1, u), py = lerp(y0, y1, u) + sag * Math.sin(Math.PI * u) + 6
    const on = Math.sin(t * 3 + i * 1.9) > -0.4
    const col = LIGHT_COLS[i % LIGHT_COLS.length]
    if (on) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, px, py + size / 2, size * 2.6, 0.9, col === '#ffd23a' ? '255,210,90' : '255,160,170'); x.restore() }
    R(x, INK, px - size / 2 - 3, py - 3, size + 6, size * 1.3 + 6)
    R(x, on ? col : '#4a3f66', px - size / 2, py, size, size * 1.3)
  }
}
/** the wreath (on a door) */
export function wreath(x, cx, cy, r = 52) {
  for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; R(x, INK, cx + Math.cos(a) * r - 14, cy + Math.sin(a) * r - 14, 28, 28) }
  for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; R(x, i % 2 ? '#2f8f55' : GREEN, cx + Math.cos(a) * r - 10, cy + Math.sin(a) * r - 10, 20, 20) }
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.3; R(x, RED, cx + Math.cos(a) * r - 5, cy + Math.sin(a) * r - 5, 10, 10) }
  R(x, INK, cx - 22, cy + r - 8, 44, 26); R(x, RED, cx - 18, cy + r - 4, 36, 18)
}
/**
 * The house front at night: wall, roof with snow and bulbs, two lit windows, the door (open 0…1 shows warm light
 * and the hallway), a wreath, the porch step and the snowy yard. Everything stands on FLOOR.
 *   o: { open, wall, door, zoom (1 = whole house), cx, wreath, sign (house number), lightsOn }
 */
export function drawHouse(x, t, { open = 0, wall = '#7a4f6e', trim = '#5a3552', door = '#b0353e', zoom = 1, cx = 540, wreathOn = true, inside = null } = {}) {
  x.save(); x.translate(cx, FLOOR); x.scale(zoom, zoom); x.translate(-540, -FLOOR)
  // roof
  const RY = 560
  x.fillStyle = INK; x.beginPath(); x.moveTo(60, RY + 14); x.lineTo(540, RY - 250); x.lineTo(1020, RY + 14); x.closePath(); x.fill()
  x.fillStyle = '#3a2547'; x.beginPath(); x.moveTo(84, RY); x.lineTo(540, RY - 236); x.lineTo(996, RY); x.closePath(); x.fill()
  x.fillStyle = SNOW; x.beginPath(); x.moveTo(84, RY); x.lineTo(540, RY - 236); x.lineTo(996, RY); x.lineTo(960, RY - 4); x.lineTo(540, RY - 206); x.lineTo(120, RY - 4); x.closePath(); x.fill()
  // chimney
  box(x, 760, RY - 220, 90, 140, '#8a4a48', { b: 6 }); R(x, SNOW, 754, RY - 226, 102, 18)
  // wall
  box(x, 110, RY, 860, FLOOR - RY, wall, { b: 6 })
  for (let yy = RY + 40; yy < FLOOR; yy += 48) R(x, trim, 110, yy, 860, 4)
  // windows
  for (const wx of [180, 760]) {
    const lit = 0.85 + 0.15 * Math.sin(t * 1.3 + wx)
    box(x, wx, RY + 150, 150, 170, '#ffd88a', { b: 8 })
    x.save(); x.globalAlpha *= lit; R(x, '#ffe7b0', wx + 8, RY + 158, 134, 154); x.restore()
    R(x, INK, wx + 71, RY + 150, 8, 170); R(x, INK, wx, RY + 231, 150, 8)
    R(x, SNOW, wx - 14, RY + 318, 178, 16)
    x.save(); x.globalCompositeOperation = 'lighter'; glow(x, wx + 75, RY + 235, 190, 0.5); x.restore()
  }
  // door frame + hallway light
  const DX = 430, DW = 220, DY = FLOOR - 400, DH = 400
  box(x, DX - 18, DY - 18, DW + 36, DH + 18, '#efe0c8', { b: 6 })
  R(x, '#ffd68f', DX, DY, DW, DH)
  if (open > 0) {
    R(x, '#f0b860', DX, DY + DH - 70, DW, 70)
    if (inside) inside(x, t, { DX, DY, DW, DH })
    x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, FLOOR - 120, 420, open); x.restore()
  }
  // the door swings in (shrinks toward the hinge on the left)
  const dw = DW * (1 - 0.86 * ease.inOutCubic(clamp(open)))
  box(x, DX, DY, dw, DH, door, { b: 5, hi: 'rgba(255,255,255,0.14)' })
  if (dw > 60) {
    R(x, 'rgba(0,0,0,0.18)', DX + dw * 0.12, DY + 40, dw * 0.76, 140); R(x, 'rgba(0,0,0,0.18)', DX + dw * 0.12, DY + 220, dw * 0.76, 140)
    R(x, GOLD, DX + dw * 0.82, DY + 210, 16, 16)
    if (wreathOn) wreath(x, DX + dw / 2, DY + 120, 52 * dw / DW)
  }
  // roof bulbs
  bulbs(x, t, 110, RY + 10, 540, RY - 210, { n: 9, sag: 22 }); bulbs(x, t, 540, RY - 210, 970, RY + 10, { n: 9, sag: 22 })
  x.restore()
}
/** the snowy yard in front of the house (the ground the cast stands on) */
export function drawYard(x, t, { path = true } = {}) {
  R(x, '#dfe4ff', 0, FLOOR, 1080, 1920 - FLOOR); R(x, '#c3c9ef', 0, FLOOR, 1080, 14)
  for (let i = 0; i < 9; i++) R(x, '#eef0ff', ((i * 173) % 1080), FLOOR + 40 + (i * 61) % 400, 120, 10)
  if (path) { x.fillStyle = '#b9b2d8'; x.beginPath(); x.moveTo(440, FLOOR); x.lineTo(640, FLOOR); x.lineTo(820, 1920); x.lineTo(260, 1920); x.closePath(); x.fill() }
  void t
}
/** the living room: wallpaper, a window with falling snow, the tree, garland, fireplace, floorboards */
export function drawRoom(x, t, { wall = '#5b3a63', stripe = '#664270', windowX = 120, tree = true, treeX = 860, fire = true, fireX = 540, garland = true, stockings = [] } = {}) {
  R(x, wall, 0, 0, 1080, FLOOR)
  for (let xx = 0; xx < 1080; xx += 72) R(x, stripe, xx, 0, 30, FLOOR)
  // window
  if (windowX != null) {
    box(x, windowX, 520, 230, 300, '#121a3e', { b: 10 })
    x.save(); x.beginPath(); x.rect(windowX, 520, 230, 300); x.clip(); R(x, '#1a2452', windowX, 520, 230, 300)
    snow(x, t, { n: 24, seed: 3, top: 500, bottom: 840, speed: 0.6 })
    R(x, SNOW, windowX, 790, 230, 30); x.restore()
    R(x, '#efe0c8', windowX + 111, 520, 8, 300); R(x, '#efe0c8', windowX, 666, 230, 8)
    R(x, '#efe0c8', windowX - 24, 820, 278, 18)
  }
  // fireplace
  if (fire) {
    box(x, fireX - 200, 880, 400, FLOOR - 880, '#8a4a48', { b: 6 })
    for (let yy = 900; yy < FLOOR; yy += 40) for (let xx = fireX - 200 + ((yy / 40) % 2) * 30; xx < fireX + 200; xx += 60) R(x, '#7a3e3e', xx, yy, 50, 4)
    box(x, fireX - 236, 860, 472, 30, '#efe0c8', { b: 6 })
    R(x, '#1a0e1e', fireX - 110, 1010, 220, FLOOR - 1010)
    // the fire (pixel flames)
    for (let i = 0; i < 7; i++) {
      const fh = 60 + 50 * Math.abs(Math.sin(t * 6 + i * 1.7)), fx = fireX - 84 + i * 26
      R(x, '#ff8a3a', fx, FLOOR - fh, 22, fh); R(x, '#ffd23a', fx + 5, FLOOR - fh * 0.6, 12, fh * 0.6)
    }
    x.save(); x.globalCompositeOperation = 'lighter'; glow(x, fireX, FLOOR - 80, 340, 0.8 + 0.1 * Math.sin(t * 7)); x.restore()
    stockings.forEach((s, i) => stocking(x, fireX - 150 + i * 100, 950, s.col || RED, s.name, s.k ?? 1))
  }
  if (garland) { bulbs(x, t, 0, 380, 540, 360, { n: 8, sag: 40, size: 11 }); bulbs(x, t, 540, 360, 1080, 380, { n: 8, sag: 40, size: 11 }) }
  if (tree) drawTree(x, t, treeX, FLOOR)
  // floor
  R(x, '#6b3f2f', 0, FLOOR, 1080, 1920 - FLOOR); for (let yy = FLOOR + 30; yy < 1920; yy += 56) R(x, '#5a3426', 0, yy, 1080, 5)
  R(x, INK, 0, FLOOR - 6, 1080, 10)
  x.save(); x.globalAlpha *= 0.5; x.fillStyle = '#a03a46'; x.beginPath(); x.ellipse(540, FLOOR + 110, 420, 70, 0, 0, Math.PI * 2); x.fill(); x.restore()
}
/** a pixel tree with blinking lights and a star on top, base on floor y */
export function drawTree(x, t, cx, base = FLOOR, s = 1) {
  x.save(); x.translate(cx, base); x.scale(s, s)
  box(x, -26, -60, 52, 60, '#6b3f2f', { b: 5 })
  const tiers = [[-60, 170, 160], [-190, 140, 150], [-310, 105, 140], [-420, 66, 120]]
  for (const [y, hw, h] of tiers) { x.fillStyle = INK; x.beginPath(); x.moveTo(-hw - 8, y + 6); x.lineTo(0, y - h - 8); x.lineTo(hw + 8, y + 6); x.closePath(); x.fill() }
  for (const [y, hw, h] of tiers) { x.fillStyle = '#2f8f55'; x.beginPath(); x.moveTo(-hw, y); x.lineTo(0, y - h); x.lineTo(hw, y); x.closePath(); x.fill(); x.fillStyle = '#3fae6a'; x.beginPath(); x.moveTo(-hw * 0.3, y - h * 0.3); x.lineTo(0, y - h); x.lineTo(hw * 0.1, y - h * 0.3); x.fill() }
  for (let i = 0; i < 16; i++) {
    const tier = tiers[i % 4], u = ((i * 0.37) % 1) - 0.5, py = tier[0] - 18 - ((i * 23) % 50), px = u * tier[1] * 1.4 * (1 - (tier[0] - 18 - py) / tier[2])
    const on = Math.sin(t * 2.6 + i * 2.1) > -0.3
    R(x, INK, px - 8, py - 8, 16, 16); R(x, on ? LIGHT_COLS[i % 5] : '#4a3f66', px - 5, py - 5, 10, 10)
  }
  drawPixelStar(x, 0, -560, 40, 2, GOLD)
  x.restore()
}
/** a stocking hung on the mantel; name stitched on the cuff (k 0…1 pops it) */
export function stocking(x, cx, top, col = RED, name = '', k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  const S = ['WWWWWW..', 'WWWWWW..', 'CCCCCC..', 'CCCCCC..', 'CCCCCC..', 'CCCCCC..', 'CCCCCCC.', 'CCCCCCCC', '.CCCCCCC', '..CCCCC.']
  drawBits(x, S, { W: BONE, C: col }, 0, 58, 12)
  if (name) { x.font = `700 14px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, -12, 12) }
  x.restore()
}
/** the dining table (draw it AFTER the cast sitting behind it); dishes: [{ kind, x }] */
export function drawTable(x, t, { y = 1180, x0 = 60, x1 = 1020, cloth = '#efe0c8', dishes = [] } = {}) {
  box(x, x0, y, x1 - x0, 46, cloth, { b: 6 })
  R(x, '#d9c6a8', x0, y + 30, x1 - x0, 16)
  for (let i = 0; i < 12; i++) R(x, RED, x0 + 30 + i * ((x1 - x0 - 60) / 11), y + 46, 14, 40)
  R(x, INK, x0 - 6, y + 46, x1 - x0 + 12, 6)
  box(x, x0, y + 52, x1 - x0, FLOOR + 150 - y - 52, '#6b3f2f', { b: 6 })
  for (const d of dishes) dish(x, t, d.kind, d.x, y - 6, d.s || 1, d)
}
/** a dish on the table (y = the table top) */
export function dish(x, t, kind, cx, y, s = 1, o = {}) {
  x.save(); x.translate(cx, y); x.scale(s, s)
  if (kind === 'plate') { R(x, INK, -62, -16, 124, 22); R(x, '#ffffff', -56, -12, 112, 14); if (o.food) R(x, o.food, -30, -22, 60, 14) }
  else if (kind === 'pie') pie(x, 0, -24, 1, o.slices ?? 8)
  else if (kind === 'rolls') { R(x, INK, -70, -20, 140, 26); R(x, '#a07850', -64, -16, 128, 18); for (let i = 0; i < 4; i++) { box(x, -56 + i * 30, -44, 24, 22, '#e0a860', { b: 4, hi: '#f2c27a' }) } }
  else if (kind === 'greens') { R(x, INK, -66, -20, 132, 26); R(x, '#ffffff', -60, -16, 120, 18); for (let i = 0; i < 7; i++) R(x, i % 2 ? '#3fae6a' : '#2f8f55', -50 + i * 15, -34 - (i % 3) * 5, 14, 20) }
  else if (kind === 'gravy') { box(x, -40, -46, 80, 40, '#ffffff', { b: 5 }); R(x, '#8a5a32', -32, -40, 64, 14); R(x, INK, 40, -34, 26, 8); const st = 0.5 + 0.5 * Math.sin(t * 3); x.save(); x.globalAlpha *= 0.5 * st; R(x, BONE, -14, -80 - st * 10, 6, 20); R(x, BONE, 8, -88 - st * 12, 6, 20); x.restore() }
  else if (kind === 'roast') { R(x, INK, -86, -20, 172, 26); R(x, '#ffffff', -80, -16, 160, 18); box(x, -60, -70, 120, 52, '#c0703a', { b: 5, hi: '#e08a4a' }) }
  else if (kind === 'candle') { box(x, -10, -90, 20, 84, BONE, { b: 4 }); const f = 1 + 0.15 * Math.sin(t * 11); R(x, '#ffb03a', -6, -112 * f + 0, 12, 20 * f); x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 0, -102, 90, 0.8); x.restore() }
  else if (kind === 'mug') mug(x, 0, -30, 1, o.col)
  x.restore()
}
/** a pie (slices 0…8 left), centred */
export function pie(x, cx, cy, s = 1, slices = 8) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -84, 4, 168, 26); R(x, '#d9c6a8', -78, 8, 156, 16)
  for (let i = 0; i < 8; i++) {
    if (i >= slices) continue
    const a0 = Math.PI + (i / 8) * Math.PI, a1 = Math.PI + ((i + 1) / 8) * Math.PI
    x.fillStyle = INK; x.beginPath(); x.moveTo(0, 8); x.arc(0, 8, 76, a0, a1); x.closePath(); x.fill()
    x.fillStyle = '#e09a4a'; x.beginPath(); x.moveTo(0, 8); x.arc(0, 8, 70, a0 + 0.02, a1 - 0.02); x.closePath(); x.fill()
    x.fillStyle = '#c0703a'; x.beginPath(); x.moveTo(0, 8); x.arc(0, 8, 46, a0 + 0.05, a1 - 0.05); x.closePath(); x.fill()
  }
  x.restore()
}
export function mug(x, cx, cy, s = 1, col = RED) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -26, -30, 52, 56, col, { b: 5, hi: 'rgba(255,255,255,0.2)' }); R(x, INK, 26, -18, 18, 30); R(x, col, 26, -12, 10, 18)
  R(x, '#8a5a32', -22, -26, 44, 8)
  x.restore()
}
export function gift(x, cx, cy, s = 1, col = '#7fd0ff', rib = RED) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -50, -40, 100, 80, col, { b: 6 }); R(x, rib, -8, -40, 16, 80); R(x, rib, -50, -6, 100, 14)
  drawBits(x, ['RR...RR', '.RR.RR.', '..RRR..'], { R: rib }, 0, -52, 7)
  x.restore()
}
export function tissueBox(x, cx, cy, s = 1, tissueUp = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -50, -26, 100, 56, '#9fd8f6', { b: 5, hi: '#c9ecfb' })
  R(x, INK, -20, -30, 40, 8)
  if (tissueUp > 0) { R(x, INK, -16, -30 - 40 * tissueUp - 4, 32, 40 * tissueUp + 4); R(x, '#ffffff', -12, -30 - 40 * tissueUp, 24, 40 * tissueUp) }
  x.restore()
}
/** a pixel clock face (h, m) */
export function clockFace(x, cx, cy, r, h, m) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, Math.cos(a) * r * 0.82 - 3, Math.sin(a) * r * 0.82 - 3, 6, 6) }
  x.strokeStyle = INK; x.lineCap = 'square'
  const ah = ((h % 12) + m / 60) / 12 * Math.PI * 2 - Math.PI / 2, am = m / 60 * Math.PI * 2 - Math.PI / 2
  x.lineWidth = 9; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ah) * r * 0.5, Math.sin(ah) * r * 0.5); x.stroke()
  x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(am) * r * 0.75, Math.sin(am) * r * 0.75); x.stroke()
  x.restore()
}
/** a sofa (back + seat + arms), cast sits on it: seat top ≈ y */
export function sofa(x, cx, y, w = 640, col = '#3f6d9a') {
  box(x, cx - w / 2, y - 170, w, 140, col, { b: 6, hi: 'rgba(255,255,255,0.12)' })
  box(x, cx - w / 2 - 50, y - 90, 70, 180, col, { b: 6 }); box(x, cx + w / 2 - 20, y - 90, 70, 180, col, { b: 6 })
  box(x, cx - w / 2 + 20, y - 30, w - 40, 70, col, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  R(x, INK, cx - w / 2, y + 40, 20, 40); R(x, INK, cx + w / 2 - 20, y + 40, 20, 40)
}

// ── the bug: "HOME FOR THE HOLIDAYS", Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,179,107,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'HOME&nbsp;FOR<span style="color:rgba(255,255,255,0.65)">&nbsp;THE&nbsp;HOLIDAYS</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(out) } }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeHome(cfg) {
  // cfg.duration is the slate length with the old 4.4 s end card; since 4 Nov every film plays the SHORT end card (2.4 s)
  // and no card-back cut, so the story keeps its timing and the film runs 2.0 s shorter.
  const DURATION = +(cfg.duration - 2).toFixed(2), STORY_END = DURATION - ENDCARD_SHORT_LEN
  const OUT = [STORY_END - 0.55, STORY_END - 0.08]          // everything leaves; the plain sky remains for the end card
  const CPS = cfg.cps || 30
  const HERO = sign(cfg.hero), DATE = sign(cfg.date), PIS = sign('pisces')
  const lines = cfg.lines || []
  const hopsOf = sp => talkHops(lines, sp, { cps: CPS })

  // cast helpers (the scene calls these with { x, y, s, mood, look, hops, pop, tears, tag, ... })
  const star = (x, t, o) => {
    const { col, glyph, tears = 0, tag, tagCol, scarf, hat, ...rest } = o
    const opts = { color: col, glyph: o.s >= 150 ? glyph : null, glow: 1, ...rest }
    if (o.alpha === 0 || o.pop === 0) return null
    const ga = x.globalAlpha
    opts.alpha = (o.alpha ?? 1) * ga                      // drawStarChar sets absolute alphas: fold the scene fade in
    x.save(); x.globalAlpha *= 1
    const r = drawStarChar(x, o.x, o.y, o.s, t, opts)
    x.restore()
    const F = starFrame(o.x, o.y, o.s, t, opts)
    if (scarf || hat || tears) inSprite(x, F, () => { if (scarf) scarfCells(x, scarf === true ? RED : scarf); if (hat) hatCells(x, hat === true ? RED : hat); if (tears) tearsCells(x, t, tears) })
    if (tag) nameTag(x, tag, o.x, o.y + o.s * 0.5 + 26, { col: tagCol || BONE, alpha: (o.alpha ?? 1) * clamp(o.pop ?? 1), size: o.s > 200 ? 24 : 21 })
    return { ...r, F }
  }
  const kit = {
    HERO, DATE, PIS, STORY_END, OUT, DURATION,
    hero: (x, t, o) => star(x, t, { col: HERO.color, glyph: HERO.glyph, seed: 3, glow: 1.1, ...o }),
    date: (x, t, o) => star(x, t, { col: DATE.color, glyph: DATE.glyph, seed: 7, ...o }),
    fam: (x, t, id, o) => { const S = sign(id); return star(x, t, { col: S.color, glyph: S.glyph, seed: 11, glow: 0.9, ...o }) },
    stars: (x, t, o) => star(x, t, { col: STAR.sky, seed: 2, glow: 1.05, ...o }),
    pisces: (x, t, o) => star(x, t, { col: PIS.color, glyph: PIS.glyph, seed: 6, glow: 0.8, tips: false, mood: 'sparkle', tears: 2, ...o }),
    hops: hopsOf, out: t => outK(t, OUT), stand,
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 34px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "700 14px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const heads = (cfg.heads || []).map(h => ({ h, P: popText(root, h.text, { top: h.top ?? 168, size: h.size ?? 92, accentSize: h.accentSize ?? 124, at: h.at, gap: h.gap ?? 0.08, late: h.late || 0, lateAt: h.lateAt, wobble: !!h.wobble, accentColor: h.accent || HERO.color, fit: true }) }))
    const boxes = (cfg.boxes || []).map(b => dialogueBox(root, { lines: lines.slice(b.from, b.to + 1), y: b.y ?? 1440, open: b.open, close: b.close, cps: CPS }))
    const lesson = cfg.lesson ? buildLesson(root, { ...cfg.lesson, accentColor: cfg.lesson.accentColor || GOLD }) : null
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const flashes = cfg.flashes || [], shakes = cfg.shakes || []

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const ok = outK(t, OUT)
        let sh = 0
        for (const s of shakes) { const d = t - s; if (d > 0 && d < 0.45) sh += 14 * Math.exp(-d * 9) * Math.sin(d * 60) }
        if (ok > 0.001) {
          x.save(); x.globalAlpha *= ok; x.translate(0, sh)
          cfg.draw(x, t, kit)
          x.restore()
        }
        for (const { h, P } of heads) P.update(t, outK(t, h.out))
        boxes.forEach(b => b.update(t))
        if (lesson) lesson.update(t)
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END - 0.05]))
        let fl = 0
        for (const c of flashes) if (t >= c && t < c + 0.12) fl = Math.max(fl, 1 - (t - c) / 0.12)
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = cfg.cuts || []      // kept for reference only: no card transition plays (4 Nov change)
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br', fadeIn: 0 })]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    // sleigh-bell sparkle on the cold open
    ['glitter', 0.0, 0.5], ['bell', 0.05, 2349.32, 0.02, 0.9, 0.3],
    ...(cfg.heads || []).filter(h => h.at > 0).flatMap((h, i) => wordPops(h.at, Math.min(6, h.text.split(/\s+/).length), h.gap ?? 0.08, i)),
    ...(cfg.flashes || []).flatMap(c => [['whoosh', r3(c - 0.08), 0.28, 0.035], ['tick', c, 0.05]]),
    ...(cfg.shakes || []).flatMap(s => [['tom', s, 96, { gain: 0.22, decay: 0.25 }], ['tick', s, 0.05]]),
    ...talkCues(lines, { cps: CPS }),
    ...(cfg.lesson ? lessonCues(cfg.lesson.at, { text: cfg.lesson.text, chip: cfg.lesson.chip }) : []),
    ...(cfg.cues || []),
    ['whoosh', OUT[0], 0.35, 0.03],
    ...endcardCues(STORY_END, { short: true }),
  ].sort((a, b) => a[1] - b[1])
  return { DURATION, STORY_END, SCENES, CUES, CUTS, OUT, kit }
}
