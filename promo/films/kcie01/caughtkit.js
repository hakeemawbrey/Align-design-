// CAUGHT IN 4K: the shared look and engine of the Month 2 series kcie01–kcie20 (promo/films/month2/m02.md).
// Lives in kcie01's folder; every other episode imports it read-only ('../../kcie01/caughtkit.js').
//
// The format: frame 0 is a FREEZE FRAME of the most embarrassing moment (desaturated, a red "caught" circle around the
// sign, "YEP. THAT'S ME.", the hook line). A record scratch, a tape REWIND to "N MINUTES EARLIER", and the story plays
// in "world time" w until it reaches that moment again. Then either
//   loop: the freeze comes back, the last line lands, and the last ~0.45 s settles into exactly the frame-0 composition;
//   cut:  a short re-freeze ("and that's how"), then the story runs on to the punchline and hard-cuts after ~0.8 s.
// Long episodes chain five catches (freeze → whip to the next catch), each with a chapter sticker.
//
// Everything is a pure function of the film time t. The world is drawn at world time w = wAt(t), so freezes really
// freeze (characters take w, not t). DOM is only made inside build(); nothing touches `document` at module top level.
//
//   makeCaught(cfg) → { DURATION, SCENES, CUES, TL, wAt, segs }
//   cfg: {
//     id, sign ('virgo'), name ('Virgo'), music hints are in each film's cues.js,
//     hook: popText string ('Take four. | Still sounds *weird.*'), hookColor,
//     earlier: '6 MINUTES EARLIER',
//     catches: [{ s (world start), c (world climax = the freeze), circle(w) → { x, y, rx, ry }, yep, sticker, when }],
//     ending: 'loop' | 'cut', wEnd (cut: world time of the very last frame), last: the last line (text), lastAt (world),
//     world(x, w, K): draw the whole world at w (K = kit helpers + { t, seg }), cues: [[name, worldT, ...]] (world time),
//     filmCues: [[name, filmT, ...]], clock0: '21:40' (the REC timecode start, h:m)
//   }
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratchCues, caughtCues, chapter, chapterCues, loopBack, loopCues } from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#ff2d3f', SKYB = '#7fd0ff', MINT = '#9fe6b0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const win = (t, a, b, f = 0.18) => (t < a || t > b) ? 0 : Math.min(1, pop01(t, a, f, 2.2)) * outK(t, [b - 0.15, b])
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR }

// ═════════════════════════════════════════════════════ drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** an ink-outlined block (pixel-chunky prop) */
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** canvas text with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, shadow = true, maxW = 0 } = {}) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (maxW) { const w = x.measureText(text).width; if (w > maxW) x.scale(maxW / w, maxW / w) }
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4) }
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a pixel speech bubble at world time w (pops at w0, gone by w1). tail −1…1 along the bottom; up: tail on top */
export function bubble(x, w, cx, cy, w0, w1, text, { col = BONE, ink = INK, size = 36, tail = 0, font = INTER, weight = 800, rot = 0, maxW = 900, up = false } = {}) {
  if (w < w0 || w > w1) return
  const k = pop01(w, w0, 0.22, 2.4) * outK(w, [w1 - 0.12, w1])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = String(text).split('|'), tw = Math.min(maxW, Math.max(...lines.map(l => x.measureText(l).width)))
  const bw = tw + 46, lh = size * 1.15, bh = lh * lines.length + 30
  x.fillStyle = INK; x.fillRect(-bw / 2 - 5, -bh / 2, bw + 10, bh); x.fillRect(-bw / 2, -bh / 2 - 5, bw, bh + 10)
  x.fillStyle = col; x.fillRect(-bw / 2, -bh / 2, bw, bh)
  const tx = tail * (bw / 2 - 40), ty = up ? -bh / 2 : bh / 2, d = up ? -1 : 1
  x.fillStyle = INK; x.fillRect(tx - 14, ty + d * 4 - (up ? 12 : 0), 14, 12); x.fillRect(tx - 7, ty + d * 14 - (up ? 8 : 0), 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, ty - (up ? 9 : 0), 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { const lw = x.measureText(l).width; x.save(); x.translate(0, (i - (lines.length - 1) / 2) * lh + 2); if (lw > maxW) x.scale(maxW / lw, 1); x.fillText(l, 0, 0); x.restore() })
  x.restore()
}
/** a tilted bone caption sticker (canvas), world time; accent words in *stars* */
export function sticker(x, w, cx, cy, w0, w1, text, { col = BONE, ink = INK, accent = RED, size = 46, rot = -0.03, badge = null } = {}) {
  if (w < w0 || w > w1) return
  const k = pop01(w, w0, 0.3, 2.6) * outK(w, [w1 - 0.15, w1])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const parts = String(text).split('*')
  const fonts = parts.map((_, i) => i % 2 ? `italic 600 ${Math.round(size * 1.22)}px ${SERIF}` : `800 ${size}px ${INTER}`)
  let tw = 0; parts.forEach((p, i) => { x.font = fonts[i]; tw += x.measureText(p).width })
  const bx = badge ? size * 1.5 : 0, bw = tw + 60 + bx, bh = size * 1.7
  R(x, 'rgba(6,4,18,0.7)', -bw / 2 + 10, -bh / 2 + 10, bw, bh)
  box(x, -bw / 2, -bh / 2, bw, bh, col, { b: 6 })
  if (badge) { box(x, -bw / 2 + 16, -size * 0.55, size * 1.1, size * 1.1, badge.col || GOLD, { b: 4 }); label(x, badge.text, -bw / 2 + 16 + size * 0.55, 2, { size: size * 0.7, col: INK, font: INTER, weight: 800, shadow: false }) }
  let px = -bw / 2 + 30 + bx
  x.textBaseline = 'middle'; x.textAlign = 'left'
  parts.forEach((p, i) => { x.font = fonts[i]; x.fillStyle = i % 2 ? accent : ink; x.fillText(p, px, 3); px += x.measureText(p).width })
  x.restore()
}
/** sparkles burst at t0 */
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const dt = t - t0
  if (dt < 0 || dt > 0.9) return
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed, r = Rr * (0.4 + 0.6 * ease.outCubic(dt / 0.9)) * (0.7 + 0.3 * Math.sin(i * 7.3 + seed))
    const sz = 10 * (1 - dt / 0.9)
    x.fillStyle = cols[i % cols.length]
    const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r
    x.fillRect(px - sz / 2, py - sz / 6, sz, sz / 3); x.fillRect(px - sz / 6, py - sz / 2, sz / 3, sz)
  }
}
/** hearts drifting up from (cx, cy) after t0 */
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.12, dt = t - b
    if (dt < 0 || dt > life) continue
    const p = dt / life
    drawBits(x, HEART, { H: cols[i % cols.length] }, cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(dt * 4 + i) * 12, cy - p * 220, cell * (1 - p * 0.3), { alpha: 1 - p * p })
  }
}
/** confetti burst */
export function confetti(x, t, t0, cx, cy, { n = 26, spread = 420, life = 2.2, cols = [GOLD, PINK, SKYB, MINT, BONE] } = {}) {
  const dt = t - t0
  if (dt < 0 || dt > life) return
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (Math.sin(i * 12.9898) * 0.5) * 2.2, v = 0.5 + 0.5 * Math.abs(Math.sin(i * 78.233))
    const px = cx + Math.cos(a) * spread * v * Math.min(1, dt * 2.2), py = cy + Math.sin(a) * spread * v * Math.min(1, dt * 2.2) + 380 * dt * dt
    x.save(); x.globalAlpha = 1 - dt / life; x.fillStyle = cols[i % cols.length]; x.translate(px, py); x.rotate(dt * (4 + i % 5) + i); x.fillRect(-7, -3, 14, 7); x.restore()
  }
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** motion lines (speed streaks) behind something moving along dir */
export function speedLines(x, cx, cy, len, dir = -1, n = 5, col = BONE, a = 0.8) {
  x.save(); x.globalAlpha = a
  for (let i = 0; i < n; i++) R(x, col, cx + dir * (40 + (i % 3) * 30), cy - 70 + i * 34, dir * len * (0.6 + 0.4 * ((i * 7) % 3) / 2), 7)
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops and squash
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
/** pixel sunglasses over the eyes (sprite cells); up 0…1 pushes them onto the head */
export function shadesCells(ctx, up = 0) {
  const y = 16.6 - up * 7
  for (const ex of [13.4, 22.6]) { ctx.fillStyle = INK; ctx.fillRect(ex - 3.6, y - 0.6, 7.2, 5.2); ctx.fillStyle = '#2b2140'; ctx.fillRect(ex - 3, y, 6, 4); ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(ex - 2.4, y + 0.6, 1.6, 0.8) }
  ctx.fillStyle = INK; ctx.fillRect(16.8, y + 0.4, 2.4, 1.2)
}

/** a sign star (o: { x, y, s, mood, look, hops, pop, alpha, tears, seed, squash, blush }); returns the sprite frame */
export function star(x, w, sign, o) {
  const S = signStar(sign)
  const opts = { color: S.color, glyph: o.s >= 150 && o.glyph !== false ? S.glyph : null, mood: o.mood || 'happy', look: o.look, hops: o.hops, pop: o.pop ?? 1, alpha: o.alpha ?? 1, seed: o.seed ?? 3, glow: o.glow ?? 1, squash: o.squash || 0, blush: o.blush, blink: o.blink, bob: o.bob, tips: o.tips }
  if (o.shadow !== false && (o.pop ?? 1) > 0.05) shadow(x, o.x, o.y + o.s * 0.52, o.s * 0.9 * (o.pop ?? 1), 0.3)
  drawStarChar(x, o.x, o.y, o.s, w, opts)
  const F = starFrame(o.x, o.y, o.s, w, { pop: opts.pop, hops: o.hops, seed: opts.seed, squash: opts.squash, bob: o.bob })
  if (o.tears) inSprite(x, F, () => tearsCells(x, w, o.tears))
  if (o.shades != null) inSprite(x, F, () => shadesCells(x, o.shades))
  if (o.prop) inSprite(x, F, () => o.prop(x, F))
  return F
}
/** Pisces (always crying somewhere): o.tears 1–3 */
export const pisces = (x, w, o) => star(x, w, 'pisces', { mood: 'sparkle', seed: 6, glow: 0.85, tips: false, tears: 2, ...o })
/** a little tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ═════════════════════════════════════════════════════ sets (pixel-chunky rooms, 1080 × 1920, floor line ~1250)
const nightSky = (x, X, Y, w, h, seed = 1, day = false) => {
  const g = x.createLinearGradient(0, Y, 0, Y + h)
  if (day) { g.addColorStop(0, '#8fd0f6'); g.addColorStop(1, '#ffe2b8') } else { g.addColorStop(0, '#120c33'); g.addColorStop(1, '#3a2a6e') }
  x.fillStyle = g; x.fillRect(X, Y, w, h)
  if (!day) for (let i = 0; i < 14; i++) { const sx = X + ((i * 73 + seed * 31) % w), sy = Y + ((i * 47 + seed * 17) % (h * 0.8)); R(x, i % 3 ? BONE : GOLD, sx, sy, i % 4 ? 4 : 6, i % 4 ? 4 : 6) }
  if (!day) { R(x, '#f4e8cc', X + w * 0.72, Y + h * 0.16, 30, 30); R(x, '#3a2a6e', X + w * 0.72 + 12, Y + h * 0.16 - 4, 26, 26) }
}
export function windowFrame(x, X, Y, w, h, { day = false, seed = 1, frame = '#efe6d6' } = {}) {
  box(x, X, Y, w, h, frame, { b: 6 }); nightSky(x, X + 14, Y + 14, w - 28, h - 28, seed, day)
  R(x, frame, X + w / 2 - 6, Y, 12, h); R(x, frame, X, Y + h / 2 - 6, w, 12)
}
const PALS = {
  bedroom: { wall: ['#3b2b66', '#2a1f4e'], floor: ['#5a3d2e', '#47301f'], trim: '#22183f' },
  living: { wall: ['#2f4a63', '#203448'], floor: ['#6b4a35', '#553a28'], trim: '#182638' },
  cafe: { wall: ['#6a3b33', '#4e2a25'], floor: ['#2f2a3a', '#25202e'], trim: '#2c1714' },
  office: { wall: ['#3d4f5a', '#2c3a43'], floor: ['#4a4f5c', '#3a3e49'], trim: '#1e272d' },
  aisle: { wall: ['#e8e2d0', '#cfc6ae'], floor: ['#bfb8a6', '#a59e8c'], trim: '#8b846f' },
  party: { wall: ['#3a1f5c', '#26133f'], floor: ['#2a2238', '#1f192b'], trim: '#160c26' },
  kitchen: { wall: ['#4c6b5a', '#3a5446'], floor: ['#d9cdb4', '#c2b498'], trim: '#24362c' },
  bus: { wall: ['#2a3a5c', '#1c2944'], floor: ['#3a3a48', '#2c2c38'], trim: '#121a2c' },
  brunch: { wall: ['#f2d3a8', '#e3bd8a'], floor: ['#c98f5a', '#b07a48'], trim: '#8a5a32' },
  street: { wall: ['#1d1840', '#2f2766'], floor: ['#3a3550', '#2c2840'], trim: '#120e28' },
  park: { wall: ['#2a2366', '#5a3d8a'], floor: ['#2f5a3a', '#244a2e'], trim: '#1a3622' },
}
/** wall + floor + skirting for a set; floor line at fy */
export function room(x, kind, { fy = 1250, seed = 1 } = {}) {
  const P = PALS[kind] || PALS.bedroom
  const g = x.createLinearGradient(0, 0, 0, fy); g.addColorStop(0, P.wall[1]); g.addColorStop(1, P.wall[0]); x.fillStyle = g; x.fillRect(0, 0, 1080, fy)
  const f = x.createLinearGradient(0, fy, 0, 1920); f.addColorStop(0, P.floor[0]); f.addColorStop(1, P.floor[1]); x.fillStyle = f; x.fillRect(0, fy, 1080, 1920 - fy)
  if (kind === 'street' || kind === 'park') { nightSky(x, 0, 0, 1080, fy, seed); x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(0, fy, 1080, 1920 - fy) }
  else {
    // wallpaper texture: faint vertical stripes / tiles
    x.save(); x.globalAlpha = 0.08; for (let i = 0; i < 1080; i += 90) R(x, '#ffffff', i, 0, 30, fy); x.restore()
    R(x, P.trim, 0, fy - 24, 1080, 24)
  }
  // floor planks
  x.save(); x.globalAlpha = 0.18; for (let j = fy + 60; j < 1920; j += 90) R(x, '#000000', 0, j, 1080, 6); x.restore()
}
/** furniture & props (all pixel-chunky boxes) */
export const furn = {
  bed(x, X, Y, w = 520, col = '#c9a6ff') { box(x, X, Y, w, 110, col, { b: 6, hi: '#e6d4ff' }); box(x, X - 20, Y - 110, 40, 240, '#7a5234', { b: 6 }); box(x, X + 30, Y - 40, 150, 50, BONE, { b: 5 }); R(x, '#7a5234', X, Y + 110, 26, 60); R(x, '#7a5234', X + w - 26, Y + 110, 26, 60) },
  couch(x, X, Y, w = 560, col = '#d0566e') { box(x, X, Y - 120, w, 120, col, { b: 6, hi: '#e57a8f' }); box(x, X - 30, Y - 60, 60, 150, col, { b: 6 }); box(x, X + w - 30, Y - 60, 60, 150, col, { b: 6 }); box(x, X + 10, Y, w - 20, 80, col, { b: 6, hi: '#e57a8f' }); R(x, INK, X + 20, Y + 86, 20, 30); R(x, INK, X + w - 40, Y + 86, 20, 30) },
  table(x, cx, Y, w = 380, col = '#8a5a32') { box(x, cx - w / 2, Y, w, 30, col, { b: 6, hi: '#a87444' }); R(x, INK, cx - w / 2 + 30, Y + 36, 22, 180); R(x, INK, cx + w / 2 - 52, Y + 36, 22, 180) },
  desk(x, cx, Y, w = 520) { box(x, cx - w / 2, Y, w, 40, '#b7a58a', { b: 6, hi: '#d0bfa2' }); box(x, cx - w / 2 + 10, Y + 46, 140, 170, '#9a8a72', { b: 5 }); R(x, INK, cx + w / 2 - 40, Y + 46, 20, 170) },
  lamp(x, cx, Y, on = 1) { R(x, INK, cx - 6, Y, 12, 200); box(x, cx - 60, Y - 70, 120, 70, '#f2c75c', { b: 5 }); if (on > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, Y - 30, 10, cx, Y - 30, 360); g.addColorStop(0, `rgba(255,220,150,${0.32 * on})`); g.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = g; x.fillRect(cx - 360, Y - 390, 720, 720); x.restore() } },
  plant(x, cx, Y, s = 1) { box(x, cx - 40 * s, Y - 60 * s, 80 * s, 60 * s, '#c96a3a', { b: 5 }); for (let i = 0; i < 5; i++) { x.save(); x.translate(cx, Y - 60 * s); x.rotate(-0.9 + i * 0.45); box(x, -9 * s, -110 * s, 18 * s, 100 * s, i % 2 ? '#5fb36a' : '#4a9a58', { b: 4 }); x.restore() } },
  shelf(x, X, Y, w = 300) { box(x, X, Y, w, 20, '#7a5234', { b: 5 }); const cols = [PINK, SKYB, GOLD, MINT, LAV]; for (let i = 0; i < 6; i++) box(x, X + 14 + i * (w - 28) / 6, Y - 70 + (i % 2) * 10, (w - 40) / 6 - 6, 64 - (i % 2) * 10, cols[i % 5], { b: 3 }) },
  frame(x, cx, cy, w, h, fill = '#f4e8cc', draw) { box(x, cx - w / 2, cy - h / 2, w, h, '#8a5a32', { b: 6 }); R(x, fill, cx - w / 2 + 14, cy - h / 2 + 14, w - 28, h - 28); if (draw) draw() },
  clock(x, cx, cy, r = 54, h = 3, m = 0) { box(x, cx - r, cy - r, 2 * r, 2 * r, BONE, { b: 6 }); x.save(); x.translate(cx, cy); x.rotate(h / 12 * Math.PI * 2); R(x, INK, -4, -r * 0.5, 8, r * 0.5); x.restore(); x.save(); x.translate(cx, cy); x.rotate(m / 60 * Math.PI * 2); R(x, RED, -3, -r * 0.8, 6, r * 0.8); x.restore() },
  door(x, X, Y, w = 200, h = 420, open = 0) { box(x, X, Y, w, h, '#2a1a12', { b: 6 }); box(x, X, Y, w * (1 - open * 0.8), h, '#8a5a32', { b: 6, hi: '#a87444' }); R(x, GOLD, X + w * (1 - open * 0.8) - 34, Y + h / 2, 14, 14) },
  lights(x, w, Y = 160) { for (let i = 0; i < 14; i++) { const px = 40 + i * 76, py = Y + 26 * Math.sin(i * 0.9); R(x, INK, px - 1, py - 18, 2, 18); const on = (Math.floor(w * 3 + i) % 3) !== 0; box(x, px - 9, py, 18, 22, on ? [GOLD, PINK, SKYB, MINT][i % 4] : '#4a3d6a', { b: 3 }) } },
  counter(x, Y = 1150, col = '#6a4a3a') { box(x, -20, Y, 1120, 60, col, { b: 6, hi: '#8a6a52' }); R(x, '#4a3226', 0, Y + 66, 1080, 1920) },
  shelfUnit(x, X, Y, w, h, seed = 1) {
    box(x, X, Y, w, h, '#c8beaa', { b: 6 }); const rows = 4, rh = h / rows; const cols = ['#e8634a', '#f2c75c', '#5fb36a', '#4aa3e8', '#d0566e', '#9a7be0', '#f29a4a']
    for (let r = 0; r < rows; r++) { R(x, '#8b846f', X, Y + (r + 1) * rh - 10, w, 10); for (let i = 0; i < Math.floor(w / 46); i++) { const c = cols[(i * 3 + r * 5 + seed) % cols.length]; box(x, X + 10 + i * 46, Y + r * rh + 18 + ((i + r) % 2) * 8, 34, rh - 34 - ((i + r) % 2) * 8, c, { b: 3, hi: 'rgba(255,255,255,0.35)' }) } }
  },
  whiteboard(x, cx, cy, w = 560, h = 380) { box(x, cx - w / 2, cy - h / 2, w, h, '#f6f3ea', { b: 8 }); R(x, '#a8a29a', cx - w / 2, cy + h / 2 + 8, w, 14) },
  cubicle(x, X, Y, w = 420, h = 260) { box(x, X, Y, w, h, '#8e8a7c', { b: 6, hi: '#a8a496' }); x.save(); x.globalAlpha = 0.2; for (let i = 8; i < w; i += 22) R(x, INK, X + i, Y + 8, 4, h - 16); x.restore() },
}

// ═════════════════════════════════════════════════════ the phone (world-time chat)
/** a big pixel phone. P = { cx, cy, w, h, rot, title, msgs: [{ w, side: 'L'|'R'|'C', text, col }], typing: [w0, w1], draft: { text, w0, w1, side }, screen (custom draw fn(x, w, P)), alpha, tilt } */
export function phone(x, w, P) {
  const { cx, cy, w: W = 520, h: H = 900, rot = 0 } = P
  x.save(); x.globalAlpha *= P.alpha ?? 1; x.translate(cx, cy); x.rotate(rot)
  box(x, -W / 2, -H / 2, W, H, '#2a2148', { b: 8 }); R(x, '#100c24', -W / 2 + 16, -H / 2 + 60, W - 32, H - 120)
  R(x, '#3a3060', -40, -H / 2 + 24, 80, 14); R(x, '#3a3060', -36, H / 2 - 42, 72, 16)
  const sx = -W / 2 + 16, sy = -H / 2 + 60, sw = W - 32, sh = H - 120
  x.save(); x.beginPath(); x.rect(sx, sy, sw, sh); x.clip()
  if (P.screen) P.screen(x, w, { sx, sy, sw, sh })
  else {
    // header
    R(x, '#1d1640', sx, sy, sw, 84)
    if (P.title) label(x, P.title, 0, sy + 44, { size: 30, col: BONE, font: INTER, weight: 800, shadow: false, maxW: sw - 40 })
    // bubbles: newest at the bottom, the list scrolls up
    const shown = (P.msgs || []).filter(m => w >= m.w)
    const fs = P.fs || 32, lh = fs * 1.2, pad = 18
    x.font = `700 ${fs}px ${INTER}`
    const wrap = (text, maxW) => { const words = String(text).split(' '); const lines = []; let cur = ''; for (const wd of words) { const tt = cur ? cur + ' ' + wd : wd; if (x.measureText(tt).width > maxW && cur) { lines.push(cur); cur = wd } else cur = tt } if (cur) lines.push(cur); return lines }
    const items = shown.map(m => { const L = wrap(m.text, sw * 0.68); const bw = Math.max(...L.map(l => x.measureText(l).width)) + pad * 2; return { m, L, bw, bh: L.length * lh + pad * 1.4 } })
    let typingH = 0
    const typingOn = P.typing && w >= P.typing[0] && w < P.typing[1]
    if (typingOn) typingH = 80
    let y = sy + sh - 24 - typingH
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i]; y -= it.bh
      if (y + it.bh < sy + 84) break
      const k = pop01(w, it.m.w, 0.2, 2.2)
      const side = it.m.side
      const bx = side === 'R' ? sx + sw - 20 - it.bw : side === 'C' ? -it.bw / 2 : sx + 20
      const col = it.m.col || (side === 'R' ? '#3d7cf0' : side === 'C' ? '#5a5070' : '#efe6d6')
      const ink = it.m.ink || (side === 'R' || side === 'C' ? '#ffffff' : INK)
      x.save(); x.translate(bx + it.bw / 2, y + it.bh / 2); x.scale(k, k)
      box(x, -it.bw / 2, -it.bh / 2, it.bw, it.bh, col, { b: 4 })
      x.fillStyle = ink; x.textAlign = 'left'; x.textBaseline = 'middle'; x.font = `700 ${fs}px ${INTER}`
      it.L.forEach((l, j) => x.fillText(l, -it.bw / 2 + pad, -it.bh / 2 + pad * 0.7 + lh * (j + 0.5)))
      x.restore()
      y -= 16
    }
    if (typingOn) { const ty = sy + sh - 24 - 60; box(x, sx + 20, ty, 120, 56, '#efe6d6', { b: 4 }); for (let i = 0; i < 3; i++) R(x, INK, sx + 44 + i * 26, ty + 22 + 6 * Math.sin(w * 10 + i), 14, 14) }
  }
  // the draft field (typing/deleting): text shown up to w
  if (P.draft) {
    const D = P.draft, fy = H / 2 - 120
    R(x, '#1d1640', sx, fy - 10, sw, 70)
    box(x, sx + 14, fy, sw - 110, 50, '#f6f3ea', { b: 3 })
    const txt = typeof D.text === 'function' ? D.text(w) : D.text
    x.save(); x.beginPath(); x.rect(sx + 14, fy, sw - 110, 50); x.clip()
    label(x, txt + (Math.floor(w * 3) % 2 ? '|' : ''), sx + 24, fy + 26, { size: 26, col: INK, font: INTER, weight: 700, align: 'left', shadow: false })
    x.restore()
    box(x, sx + sw - 82, fy, 68, 50, D.sendCol || '#3d7cf0', { b: 3 }); label(x, '➤', sx + sw - 48, fy + 26, { size: 28, col: '#fff', font: INTER, shadow: false })
  }
  x.restore()
  x.restore()
}
/** typing helper: the visible part of a string at w (typed from w0 at cps; deleted from d0 at dps) */
export function typed(text, w, w0, cps = 14, d0 = Infinity, dps = 30) {
  if (w < w0) return ''
  let n = Math.min(text.length, Math.floor((w - w0) * cps))
  if (w > d0) n = Math.max(0, n - Math.floor((w - d0) * dps))
  return text.slice(0, n)
}

// ═════════════════════════════════════════════════════ the engine
const FZ = 1.45, RW = 0.6       // the cold-open freeze hold, the rewind
/** build the segment list: [{ t0, t1, mode: 'freeze'|'rewind'|'play'|'whip', w0, w1, catch }] */
function buildSegs(cfg) {
  const segs = []; let t = 0
  const add = (d, mode, w0, w1, extra = {}) => { segs.push({ t0: t, t1: t + d, mode, w0, w1, ...extra }); t += d }
  const C = cfg.catches
  add(FZ, 'freeze', C[0].c, C[0].c, { ci: 0, open: true })
  add(RW, 'rewind', C[0].c, C[0].s, { ci: 0 })
  C.forEach((c, i) => {
    add(c.c - c.s, 'play', c.s, c.c, { ci: i })
    const last = i === C.length - 1
    if (!last) add(c.hold ?? 1.15, 'freeze', c.c, c.c, { ci: i })
    else if (cfg.ending === 'cut') { add(c.hold ?? 0.8, 'freeze', c.c, c.c, { ci: i }); add(cfg.wEnd - c.c, 'play', c.c, cfg.wEnd, { ci: i, tail: true }) }
    else { add(cfg.loopHold ?? 2.1, 'freeze', c.c, c.c, { ci: i, final: true }); if (C.length > 1) add(0.5, 'rewind', c.c, C[0].c, { ci: 0, loopBack: true }) }
  })
  return { segs, DURATION: r3(t) }
}

export function makeCaught(cfg) {
  const { segs, DURATION } = buildSegs(cfg)
  const segAt = t => segs.find(s => t >= s.t0 && t < s.t1) || segs[segs.length - 1]
  const wAt = t => {
    const s = segAt(t)
    if (s.mode === 'freeze') return s.w0
    const p = prog(t, s.t0, s.t1)
    if (s.mode === 'rewind') return lerp(s.w0, s.w1, ease.inOutCubic(p))
    return lerp(s.w0, s.w1, p)
  }
  // film time of a world time inside the play segments (for cues and captions); null if never played
  const tOfW = (w, ci) => {
    for (const s of segs) if (s.mode === 'play' && (ci == null || s.ci === ci) && w >= s.w0 - 1e-6 && w < s.w1 + 1e-6) return s.t0 + (w - s.w0)
    return null
  }
  const HERO = cfg.sign
  const P0 = FZ + RW                    // the story starts
  const LOOP_SETTLE = 0.45              // the last 0.45 s of a loop settles into frame 0
  const final = segs.find(s => s.final)
  const loopSeg = segs.find(s => s.loopBack)
  const settleAt = DURATION - LOOP_SETTLE

  // the freeze level (0…1) at t: the cold open, every catch freeze, the final freeze
  const freezeK = t => {
    const s = segAt(t)
    if (s.mode === 'freeze') return s.open ? 1 : Math.min(1, prog(t, s.t0, s.t0 + 0.08))
    if (s.mode === 'rewind' && s.loopBack) return 1
    if (s.mode === 'rewind') return 1 - prog(t, s.t1 - 0.12, s.t1)
    return 0
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 600 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    // the last line (loop: during the final freeze; cut: at the punchline)
    const LL = popText(root, cfg.last, { top: 214, size: 84, accentSize: 116, gap: 0.06, accentColor: cfg.lastColor || PINK, fit: true, at: cfg.ending === 'loop' ? final.t0 + 0.12 : tOfW(cfg.lastAt, cfg.catches.length - 1) })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#ffffff', opacity: 0, pointerEvents: 'none' }, root)

    // the camera: a whip zoom toward the circle in the cold open; a punch on each freeze; settles to 1 for the loop
    function camera(t, w) {
      const C0 = cfg.catches[0].circle(cfg.catches[0].c)
      const B = cfg.frame || { z: 1, fx: 540, fy: 960 }
      let z = 1, fx = 540, fy = 960, jx = 0
      const s = segAt(t)
      if (s.mode === 'rewind' && !s.loopBack) { const p = ease.inOutCubic(prog(t, s.t0, s.t1)); jx = 14 * Math.sin(t * 90) * (1 - p) }
      if (s.mode === 'freeze' && !s.open) {
        const c = cfg.catches[s.ci].circle(s.w0), p = ease.outCubic(prog(t, s.t0, s.t0 + 0.14))
        let k = p
        if (s.final && cfg.ending === 'loop' && cfg.catches.length === 1) k = p * (1 - ease.inOutCubic(prog(t, settleAt, DURATION - 0.04)))
        z = lerp(1, 1.08, k); fx = lerp(540, c.x, 0.5 * k); fy = lerp(960, c.y, 0.5 * k)
      }
      if (s.mode === 'play' && s.t0 > P0 && t - s.t0 < 0.25 && !s.tail) { const p = 1 - ease.outCubic(prog(t, s.t0, s.t0 + 0.25)); z = 1 + 0.12 * p }       // whip into a new catch
      if (s.mode === 'play' && s.tail && t - s.t0 < 0.2) { const p = 1 - ease.outCubic(prog(t, s.t0, s.t0 + 0.2)); z = 1 + 0.08 * p }
      if (cfg.camera) ({ z, fx, fy } = cfg.camera(t, w, { z, fx, fy }) || { z, fx, fy })
      z *= B.z; fx = B.fx + (fx - 540); fy = B.fy + (fy - 960)
      return { z, fx, fy, jx }
    }

    function freezeLook(x, t, k) {
      if (k <= 0) return
      x.save()
      x.globalCompositeOperation = 'saturation'; x.fillStyle = `rgba(128,128,128,${0.82 * k})`; x.fillRect(0, 0, 1080, 1920)
      x.globalCompositeOperation = 'source-over'
      x.fillStyle = `rgba(40,20,70,${0.22 * k})`; x.fillRect(0, 0, 1080, 1920)
      // vignette
      const g = x.createRadialGradient(540, 960, 400, 540, 960, 1200); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${0.5 * k})`); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
      x.restore()
    }
    function rewindLook(x, t, s) {
      // VHS tracking bands + horizontal tear
      const p = prog(t, s.t0, s.t1)
      x.save()
      for (let i = 0; i < 6; i++) { const y = ((i * 337 + t * 2300) % 2100) - 90; x.fillStyle = `rgba(255,255,255,${0.08 + 0.05 * (i % 2)})`; x.fillRect(0, y, 1080, 18 + (i % 3) * 10) }
      x.fillStyle = 'rgba(255,45,63,0.08)'; x.fillRect(0, 0, 1080, 1920)
      x.restore()
      label(x, '◀◀  REW', 540, 960, { size: 96, col: BONE, font: MONO, weight: 700, alpha: Math.sin(Math.PI * p) > 0.2 ? 1 : 0.6 })
    }
    // the caught circle: drawn on over 0.3 s (fully drawn at frame 0), plus "YEP. THAT'S ME." with an arrow
    function circle(x, t, s, alpha = 1) {
      const c = cfg.catches[s.ci].circle(s.w0)
      const p = s.open || (s.mode === 'rewind' && s.loopBack) ? 1 : ease.outCubic(prog(t, s.t0 + 0.04, s.t0 + 0.34))
      if (p <= 0) return
      x.save(); x.globalAlpha = alpha
      x.lineCap = 'round'; x.lineJoin = 'round'
      const path = (lw, col) => {
        x.strokeStyle = col; x.lineWidth = lw; x.beginPath()
        const a0 = -2.2, a1 = a0 + Math.PI * 2.18 * p
        for (let a = a0; a <= a1; a += 0.05) { const wob = 1 + 0.04 * Math.sin(a * 3 + 1.3); const px = c.x + Math.cos(a) * c.rx * wob, py = c.y + Math.sin(a) * c.ry * wob * (1 + 0.05 * (a - a0)); a === a0 ? x.moveTo(px, py) : x.lineTo(px, py) }
        x.stroke()
      }
      path(22, 'rgba(255,255,255,0.9)'); path(13, RED)
      // label + arrow
      const yep = cfg.catches[s.ci].yep || "YEP. THAT'S ME."
      const side = c.labelSide || (c.x > 540 ? -1 : 1)
      const lx = c.lx ?? (c.x + side * (c.rx + 40)), ly = c.ly ?? (c.y - c.ry - 70)
      const lk = s.open || s.loopBack ? 1 : pop01(t, s.t0 + 0.2, 0.3, 2.6)
      if (lk > 0.01) {
        x.save(); x.translate(lx, ly); x.rotate(-0.06 * side); x.scale(lk, lk)
        x.font = `800 54px ${INTER}`; const tw = x.measureText(yep).width
        const bx = side > 0 ? 0 : -tw - 40
        R(x, INK, bx - 6, -44, tw + 52, 88); R(x, RED, bx, -38, tw + 40, 76)
        x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(yep, bx + 20, 3)
        x.restore()
      }
      x.restore()
    }
    // the camcorder overlay: corner brackets, ● REC / ❚❚ PAUSED / ◀◀ REW, 4K, timecode, battery
    function camcorder(x, t, w, s) {
      const a = 0.95
      x.save(); x.globalAlpha = a
      const L = 54, T0 = 150, B0 = 1780, Rr = 1026, len = 70, th = 8
      for (const [cx, cy, dx, dy] of [[L, T0, 1, 1], [Rr, T0, -1, 1], [L, B0, 1, -1], [Rr, B0, -1, -1]]) { R(x, 'rgba(6,4,18,0.6)', cx + 3 + (dx < 0 ? -len : 0), cy + 4 + (dy < 0 ? -th : 0), len, th); R(x, BONE, cx + (dx < 0 ? -len : 0), cy + (dy < 0 ? -th : 0), len, th); R(x, BONE, cx + (dx < 0 ? -th : 0), cy + (dy < 0 ? -len : 0), th, len) }
      // status (top-right)
      const fr = s.mode === 'freeze', rw = s.mode === 'rewind'
      if (rw) label(x, '◀◀ REW', 1000, 96, { size: 34, col: BONE, align: 'right' })
      else if (fr) { label(x, '❚❚ PAUSED', 1000, 96, { size: 34, col: BONE, align: 'right' }) }
      else { if (Math.floor(t * 1.6) % 2 === 0) { x.fillStyle = RED; x.beginPath(); x.arc(870, 96, 13, 0, Math.PI * 2); x.fill() } label(x, 'REC', 1000, 96, { size: 34, col: BONE, align: 'right' }) }
      // bottom row: timecode (world clock) + 4K badge
      const [hh, mm] = (cfg.clock0 || '21:40').split(':').map(Number)
      const secs = Math.max(0, Math.floor((cfg.clockScale || 1) * w)) + hh * 3600 + mm * 60
      const clock = cfg.clockAt ? cfg.clockAt(w) : `${String(Math.floor(secs / 3600) % 24).padStart(2, '0')}:${String(Math.floor(secs / 60) % 60).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
      label(x, clock, 80, 1740, { size: 32, col: BONE, align: 'left' })
      box(x, 880, 1716, 120, 50, 'rgba(6,4,18,0.35)', { b: 4 }); label(x, '4K', 940, 1742, { size: 34, col: BONE, font: INTER, weight: 800, shadow: false })
      x.restore()
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const s = segAt(t), w = wAt(t)
        const cam = camera(t, w)
        x.save(); x.clearRect(0, 0, 1080, 1920)
        x.translate(540 + cam.jx, 960); x.scale(cam.z, cam.z); x.translate(-cam.fx, -cam.fy)
        cfg.world(x, w, { t, seg: s, DURATION })
        x.restore()
        const fk = freezeK(t)
        freezeLook(x, t, fk)
        if (s.mode === 'rewind') rewindLook(x, t, s)
        // overlays on the top canvas
        tx.clearRect(0, 0, 1080, 1920)
        if (s.mode === 'freeze' || (s.mode === 'rewind' && s.loopBack)) {
          tx.save(); tx.translate(540 + cam.jx, 960); tx.scale(cam.z, cam.z); tx.translate(-cam.fx, -cam.fy)
          circle(tx, t, s.loopBack ? { ...segs[0], ci: 0 } : s)
          tx.restore()
        }
        if (cfg.overlay) cfg.overlay(tx, t, w, { seg: s, DURATION, tOfW })
        camcorder(tx, t, w, s)
        // the "N MINUTES EARLIER" sticker after the rewind; chapter stickers for each catch
        sticker(tx, t, 540, 470, P0 - 0.05, P0 + 1.5, '◀◀ ' + cfg.earlier, { size: 46, col: BONE, accent: RED, rot: -0.04 })
        if (cfg.catches.length === 1) cfg.catches.forEach((c, i) => {
          if (!c.sticker) return
          const t0 = tOfW(c.s, i); if (t0 == null) return
          const a = i === 0 ? P0 + 1.5 : t0, b = i === 0 ? P0 + 3.4 : t0 + 2.2
          sticker(tx, t, 540, 470, a, b, c.sticker, { size: 44, col: GOLD, accent: RED, rot: i % 2 ? 0.035 : -0.035, badge: { text: String(i + 1), col: RED } })
        })
        // the last line
        const lastOn = cfg.ending === 'loop' ? (s.final ? outK(t, [settleAt - 0.2, settleAt]) : 0) : (t >= (tOfW(cfg.lastAt, cfg.catches.length - 1) ?? 1e9) ? 1 : 0)
        LL.update(t, lastOn)
        bug.update(t)
        // white flash on every freeze hit and the rewind start
        let fl = 0
        for (const g of segs) { if (g.mode === 'freeze' && !g.open && t >= g.t0 && t < g.t0 + 0.12) fl = Math.max(fl, 1 - (t - g.t0) / 0.12); if (g.mode === 'rewind' && t >= g.t0 && t < g.t0 + 0.08) fl = Math.max(fl, 0.5 * (1 - (t - g.t0) / 0.08)) }
        flash.style.opacity = String(0.6 * fl)
        drawGrain(gx, fk > 0.99 ? 0 : t)
      },
    }
  }

  // ── sound: the freeze hit, record scratch + rewind, whips, the world's cues mapped onto the play segments
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const scratch = t0 => [['whoosh', r3(t0), 0.22, 0.06], ['tick', r3(t0), 0.09], ['tick', r3(t0 + 0.06), 0.07], ['pop', r3(t0 + 0.02), 220, 0.05, 0], ['pop', r3(t0 + 0.1), 330, 0.04, 0], ['whoosh', r3(t0 + 0.12), 0.18, 0.05]]
  const CUES = []
  segs.forEach(g => {
    if (g.mode === 'freeze' && !g.open) CUES.push(['tick', r3(g.t0), 0.1], ['boom', r3(g.t0), 0.2], ['whoosh', r3(g.t0 - 0.04), 0.12, 0.1], ['whoosh', r3(g.t0 + 0.06), 0.14, 0.1])
    if (g.mode === 'rewind' && g.loopBack) CUES.push(...scratch(g.t0 - 0.05))
    if (g.mode === 'rewind') CUES.push(['riser', r3(g.t0), r3(g.t1), 0.04], ['glitter', r3(g.t0), r3(g.t1)])
    if (g.mode === 'play' && g.t0 > P0 + 0.01 && !g.tail) CUES.push(['whoosh', r3(g.t0 - 0.06), 0.3, 0.05], ['tick', r3(g.t0), 0.06])
  })
  CUES.push(['pop', r3(P0), 880, 0.04, 0], ['pop', r3(P0 + 0.08), 1174.66, 0.035, 0])
  for (const c of cfg.cues || []) {
    const ci = c.ci
    const tt = tOfW(c[1], ci)
    if (tt == null) continue
    CUES.push([c[0], r3(tt), ...c.slice(2)])
  }
  for (const c of cfg.filmCues || []) CUES.push(c)
  if (cfg.ending === 'loop') CUES.push(['whoosh', r3(settleAt - 0.1), 0.35, 0.04], ...Array.from({ length: 4 }, (_, i) => ['pop', r3(settleAt + i * 0.05), NOTE[i + 2], 0.025, 0]))
  CUES.sort((a, b) => a[1] - b[1])
  // hook kit: the slam-in hook on frame 0, a whip zoom in the first second, the record scratch, the caught circle,
  // chapter stickers per catch (long films), the loop helper
  const C0 = cfg.catches[0].circle(cfg.catches[0].c)
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop ?? 236, size: cfg.hookSize ?? 112, accentColor: cfg.hookColor || GOLD, out: [FZ - 0.14, FZ] }
  const WHIP = { at: 0.24, len: 0.42, from: 1.32, to: 1, blur: 14, cx: C0.x, cy: C0.y, flash: 0.3 }
  const CHAPS = cfg.catches.length > 1 ? cfg.catches.map((c, i) => { const t0 = i === 0 ? P0 + 0.05 : tOfW(c.s, i); return { at: r3(t0), out: [r3(t0 + 2.3), r3(t0 + 2.5)], n: i + 1, title: c.sticker || `CATCH ${i + 1}`, x: 70, y: 470, color: [GOLD, '#ff8fb1', '#7fd0ff', '#9fe6b0', '#ff6b6b'][i % 5] } }) : []
  const SC = { at: r3(FZ - 0.04), len: RW }
  CUES.push(...slamTitleCues(HOOK), ...whipZoomCues(WHIP), ...recordScratchCues(SC))
  segs.forEach(g => { if (g.mode === 'freeze' && !g.open) CUES.push(...caughtCues({ at: r3(g.t0 + 0.02) })) })
  CHAPS.forEach(c => CUES.push(...chapterCues(c)))
  if (cfg.ending === 'loop') CUES.push(...loopCues({ duration: DURATION }))
  CUES.sort((a, b) => a[1] - b[1])
  const SCENES = [build, slamTitle(HOOK), whipZoom(WHIP), ...CHAPS.map(c => chapter(c))]
  if (cfg.ending === 'loop') SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: DURATION }))
  const TL = { P0, FZ, RW, settleAt, segs }
  return { DURATION, SCENES, CUES: CUES.filter(c => c[1] >= 0 && c[1] < DURATION), TL, wAt, tOfW, segs }
}

// ── the series bug: CAUGHT IN 4K, Inter 800 small caps, letter-spaced, top-left
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', borderRadius: '50%', background: RED, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,45,63,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'CAUGHT&nbsp;IN<span style="color:#ff2d3f">&nbsp;4K</span>')
  return { update() {} }
}
