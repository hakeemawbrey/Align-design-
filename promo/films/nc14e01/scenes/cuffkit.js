// CUFFING SEASON: the shared look of the Season 14 Star Talk films (promo/films/next30/b01.md, nc14e01–nc14e12).
// Lives in nc14e01's folder; the other episodes import it from here. Read-only for every other film.
//
//   makeCuff(cfg) → { DURATION, STORY_END, SCENES, CUES, CUTS }
//     cfg.id, cfg.duration (incl. the 4.4 s end card), cfg.ep (1…24: the bug's thermometer drops a notch per episode)
//     cfg.heads   [{ text, at, out: [a, b], top?, size?, accentSize?, accent?, late?, lateAt?, wobble?, gap? }]
//                 popText headlines (Inter 800 + one *italic* accent). The hook uses at < 0 so it is fully in at t = 0.
//     cfg.boxes   [{ lines: [{ t, speaker, text, color? }], open?, close?, y? }]  RPG dialogue boxes (startalk.js)
//     cfg.lesson  optional { at, out, text, chip, accentColor }  (lesson.js LESSON UNLOCKED)
//     cfg.cuts    card-cut candidates for cardfx (it plays the middle one)
//     cfg.draw(x, t, K)   the scene, a pure f(t). K = helpers below (star, stars, pisces, …)
//     cfg.over(x, t, K)   optional: drawn on a canvas above the headlines/boxes (stickers, stamps)
//     cfg.snow    0…1 snow amount (default 1) or a function of t
//     cfg.sky     optional f(t) → drawSky options
//     cfg.flashes [t…] white flash on hard cuts; cfg.shakes [t…] camera shakes
//     cfg.ghost   { x, y, at, from } one drawGhostCameo easter egg
//     cfg.cues    extra sound cues
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText, buildLesson, lessonCues } from '../../lesson.js'
import { drawGhostCameo } from '../../stlore.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const ICE = '#9fd8ff', MINT = '#9fe6b0', COCOA = '#7a4a2e', CREAM = '#fff1c8'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
/** on-window: pops in at a, out over [b - d, b] */
export const win = (t, a, b, d = 0.25) => t < a || t > b ? 0 : pop01(t, a, 0.32, 2) * outK(t, [b - d, b])
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, talkHops, lineTimes }
export const CPS = 30

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** an ink-outlined block (pixel-chunky prop) */
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
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
export const FLAKE = ['..W..', 'W.W.W', '.WWW.', 'WWWWW', '.WWW.', 'W.W.W', '..W..']
export const sparkles = (x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) => {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
/** hearts floating up from (cx, cy) from t0 */
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** pixel confetti falling from a burst at t0 */
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, ICE, MINT, BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = 520 + 260 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt
    const sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble, popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, up = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  if (up) { x.fillStyle = INK; x.fillRect(tx - 14, -h / 2 - 16, 14, 12); x.fillRect(tx - 7, -h / 2 - 22, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, -h / 2 - 9, 9, 9) }
  else { x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9) }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** a thought bubble (round puffs) holding a drawing fn(x) in a w×h box centred on (cx, cy) */
export function thought(x, t, cx, cy, w, h, t0, t1, fromX, fromY, fn) {
  const k = pop01(t, t0, 0.35, 2.2) * outK(t, [t1 - 0.2, t1])
  if (k <= 0.01 || t > t1) return
  x.save()
  for (let i = 0; i < 3; i++) { const f = (i + 1) / 4, rr = 10 + i * 8; x.fillStyle = INK; x.beginPath(); x.arc(lerp(fromX, cx, f * 0.7), lerp(fromY, cy + h / 2, f * 0.85), (rr + 5) * k, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(lerp(fromX, cx, f * 0.7), lerp(fromY, cy + h / 2, f * 0.85), rr * k, 0, 7); x.fill() }
  x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, BONE, { b: 7 })
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); fn(x); x.restore()
  x.restore()
}
/** pixel label text on canvas (Space Mono), with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { if (w <= 1) return; x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a warm glow pool */
export function glow(x, cx, cy, r, a, col = '255,214,150') {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
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
/** a knitted scarf round the star's middle (sprite cells), with a tail that swings */
export function scarfCells(ctx, t, col, { stripe = BONE, tail = 1, swing = 0 } = {}) {
  ctx.fillStyle = INK; ctx.fillRect(9.4, 25.2, 17.2, 4.2)
  ctx.fillStyle = col; ctx.fillRect(10, 25.8, 16, 3)
  ctx.fillStyle = stripe; for (let i = 0; i < 4; i++) ctx.fillRect(11 + i * 4, 25.8, 1, 3)
  if (tail) {
    const sw = Math.round((swing * Math.sin(t * 6)) * 2) / 2
    ctx.fillStyle = INK; ctx.fillRect(20.4 + sw, 27.6, 4.2, 8.4)
    ctx.fillStyle = col; ctx.fillRect(21 + sw, 28.2, 3, 7.2)
    ctx.fillStyle = stripe; ctx.fillRect(21 + sw, 33, 3, 0.8)
    ctx.fillStyle = INK; for (let i = 0; i < 3; i++) ctx.fillRect(21 + sw + i * 1.1, 35.4, 0.6, 1.4)
  }
}
/** a bobble hat (sprite cells) */
export function hatCells(ctx, col, { stripe = BONE, bob = GOLD } = {}) {
  ctx.fillStyle = INK; ctx.fillRect(13.4, 1.4, 9.2, 6.6); ctx.fillRect(15.4, -0.6, 5.2, 3)
  ctx.fillStyle = col; ctx.fillRect(14, 2, 8, 5.4)
  ctx.fillStyle = stripe; ctx.fillRect(14, 6, 8, 1.4)
  ctx.fillStyle = bob; ctx.fillRect(16.2, -0.2, 3.6, 2.6)
}
/** shiver: a fast side-to-side jitter (px) */
export const shiver = (t, amt = 1, seed = 0) => amt * (3 * Math.sin(t * 61 + seed * 3) + 2 * Math.sin(t * 37 + seed))

// ── winter props
/** falling pixel snow; amt 0…1, layer 0 = far (small, slow), 1 = near */
export function drawSnow(x, t, amt = 1, layer = 0, { wind = 0.3 } = {}) {
  if (amt <= 0) return
  const N = Math.round((layer ? 34 : 60) * amt)
  x.save()
  for (let i = 0; i < N; i++) {
    const h1 = Math.sin(i * 12.9898 + layer * 7.1) * 43758.5453, r1 = h1 - Math.floor(h1)
    const h2 = Math.sin(i * 78.233 + layer * 3.3) * 12345.678, r2 = h2 - Math.floor(h2)
    const sp = layer ? 150 + 90 * r2 : 70 + 50 * r2
    const yy = ((r2 * 2100 + t * sp) % 2100) - 90
    const xx = ((r1 * 1180 + t * sp * wind + Math.sin(t * 1.3 + i) * 22) % 1180 + 1180) % 1180 - 50
    const sz = layer ? 8 + Math.round(r1 * 2) * 3 : 4 + Math.round(r2 * 2) * 2
    x.globalAlpha = (layer ? 0.85 : 0.5) * (0.6 + 0.4 * r1)
    x.fillStyle = r2 > 0.85 ? ICE : '#f6f2ff'
    x.fillRect(Math.round(xx), Math.round(yy), sz, sz)
  }
  x.restore()
}
/** frost creeping in from the frame edges; k 0…1 */
export function frost(x, k) {
  if (k <= 0) return
  x.save()
  const g = x.createRadialGradient(540, 960, 520, 540, 960, 1150)
  g.addColorStop(0, 'rgba(190,230,255,0)'); g.addColorStop(1, `rgba(200,236,255,${0.42 * k})`)
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // pixel ice crystals along the edges
  x.globalAlpha = 0.7 * k
  for (let i = 0; i < 46; i++) {
    const h = Math.sin(i * 91.7) * 9999, r = h - Math.floor(h)
    const side = i % 4, along = (i * 173 + r * 400) % (side < 2 ? 1080 : 1920)
    const depth = (24 + r * 90) * k
    const [px, py] = side === 0 ? [along, depth * 0.4] : side === 1 ? [along, 1920 - depth * 0.4] : side === 2 ? [depth * 0.4, along] : [1080 - depth * 0.4, along]
    drawBits(x, FLAKE, { W: '#eaf7ff' }, px, py, 3 + (i % 3), { outline: null })
  }
  x.restore()
}
/** a pixel thermometer (cx, cy = bulb centre); level 0…1 */
export function thermometer(x, cx, cy, s, level, { col = RED } = {}) {
  const w = 18 * s, hgt = 120 * s
  box(x, cx - w / 2, cy - hgt, w, hgt, BONE, { b: 5 * s })
  R(x, col, cx - w / 4, cy - hgt * clamp(level), w / 2, hgt * clamp(level))
  x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy + 4 * s, 20 * s, 0, 7); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy + 4 * s, 14 * s, 0, 7); x.fill(); x.restore()
  for (let i = 1; i < 6; i++) R(x, INK, cx + w / 2 - 2, cy - hgt * i / 6, 10 * s, 3 * s)
}
/** a mug of cocoa with steam */
export function mug(x, t, cx, cy, s = 1, { col = '#e86a5a', steam = 1 } = {}) {
  box(x, cx - 34 * s, cy - 40 * s, 68 * s, 72 * s, col, { b: 5 * s, hi: 'rgba(255,255,255,0.22)' })
  R(x, INK, cx + 34 * s, cy - 26 * s, 22 * s, 40 * s); R(x, col, cx + 34 * s, cy - 18 * s, 12 * s, 24 * s)
  R(x, COCOA, cx - 30 * s, cy - 40 * s, 60 * s, 10 * s); R(x, CREAM, cx - 14 * s, cy - 46 * s, 22 * s, 10 * s)
  if (steam > 0) {
    x.save(); x.globalAlpha = 0.55 * steam
    for (let i = 0; i < 3; i++) {
      const ph = ((t * 0.7 + i / 3) % 1)
      R(x, '#f4f0ff', cx - 18 * s + i * 16 * s + 6 * s * Math.sin(t * 3 + i), cy - 60 * s - ph * 70 * s, 8 * s, 14 * s * (1 - ph))
    }
    x.restore()
  }
}
/** a phone (portrait) with a chat thread; msgs [{ at, side: 'L'|'R', text }] pop in */
export function phone(x, t, cx, top, w, h, { title = '', msgs = [], typing = null, alpha = 1, rot = 0, size = 30 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, top + h / 2); x.rotate(rot); x.translate(-cx, -(top + h / 2))
  box(x, cx - w / 2, top, w, h, '#2a2148', { b: 8 })
  R(x, '#14102a', cx - w / 2 + 16, top + 64, w - 32, h - 110)
  R(x, '#3a2f66', cx - 44, top + 22, 88, 14)
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = ICE; x.fillText(title, cx, top + 92)
  // messages stack from the bottom up
  const shown = msgs.filter(m => t >= m.at)
  let y = top + h - 76
  x.save(); x.beginPath(); x.rect(cx - w / 2 + 16, top + 112, w - 32, h - 160); x.clip()
  const lay = []
  x.font = `700 ${size}px ${INTER}`
  for (let i = shown.length - 1; i >= 0; i--) {
    const m = shown[i], maxW = w - 120
    const words = m.text.split(' '), rows = []
    let cur = ''
    for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr).width > maxW && cur) { rows.push(cur); cur = wd } else cur = tr }
    rows.push(cur)
    const bw = Math.max(...rows.map(r => x.measureText(r).width)) + 36, bh = rows.length * (size + 8) + 22
    y -= bh + 14
    lay.push({ m, rows, bw, bh, y })
  }
  if (typing && t > typing[0] && t < typing[1]) {
    const yy = top + h - 76 - 50
    R(x, '#3a2f66', cx - w / 2 + 40, yy, 110, 44); for (let i = 0; i < 3; i++) R(x, BONE, cx - w / 2 + 62 + i * 26, yy + 18 + (Math.floor(t * 6 + i) % 2) * -5, 12, 12)
  }
  for (const L of lay) {
    const k = easeOutBack(prog(t, L.m.at, L.m.at + 0.22), 2)
    const left = L.m.side === 'L'
    const bx = left ? cx - w / 2 + 36 : cx + w / 2 - 36 - L.bw
    x.save(); x.translate(bx + (left ? 0 : L.bw), L.y + L.bh / 2); x.scale(k, k); x.translate(-(bx + (left ? 0 : L.bw)), -(L.y + L.bh / 2))
    R(x, left ? '#3a2f66' : (L.m.col || '#4f8cff'), bx, L.y, L.bw, L.bh)
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'top'; x.font = `700 ${size}px ${INTER}`
    L.rows.forEach((r, j) => x.fillText(r, bx + 18, L.y + 12 + j * (size + 8)))
    x.restore()
  }
  x.restore()
  x.restore()
}
/** a talk card image (loaded in build) dropped onto the scene */
export function talkCard(x, img, cx, cy, w, rot = 0, alpha = 1) {
  if (!img || alpha <= 0 || w <= 1) return
  const h = w * img.height / img.width
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 16, -h / 2 + 20, w, h)
  x.drawImage(img, -w / 2, -h / 2, w, h)
  x.restore()
}
/** snowy ground: a soft white drift band at y */
export function snowGround(x, y, { col = '#e9f2ff', shade = '#b9c9ea' } = {}) {
  R(x, shade, 0, y, 1080, 1920 - y)
  R(x, col, 0, y, 1080, 26)
  for (let i = 0; i < 12; i++) R(x, col, i * 96 + ((i * 37) % 30), y - 10 - ((i * 13) % 12), 70 + ((i * 29) % 40), 16)
  R(x, 'rgba(255,255,255,0.4)', 0, y + 40, 1080, 6)
}
/** a lit window frame with frost corners (a room's backdrop) */
export function windowFrame(x, cx, cy, w, h, { night = true } = {}) {
  box(x, cx - w / 2, cy - h / 2, w, h, night ? '#1d2550' : '#9fd8ff', { b: 12 })
  R(x, '#6b4a2f', cx - 6, cy - h / 2, 12, h); R(x, '#6b4a2f', cx - w / 2, cy - 6, w, 12)
  for (const [ax, ay] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) for (let i = 0; i < 4; i++) R(x, 'rgba(234,247,255,0.7)', cx + ax * (w / 2 - 14 - i * 12) - 6, cy + ay * (h / 2 - 14) - 6 - ay * i * 4, 12, 12)
}

// ── the show bug: a pixel snowflake + "CUFFING SEASON" (ice, Inter 800 small caps) + a tiny thermometer
function buildBug(root, ep) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const fl = el('canvas', { width: '28px', height: '28px', imageRendering: 'pixelated' }, b)
  fl.width = 7; fl.height = 7
  { const c = fl.getContext('2d'); ['...W...', '.W.W.W.', '..WWW..', 'WWWWWWW', '..WWW..', '.W.W.W.', '...W...'].forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'W') { c.fillStyle = ICE; c.fillRect(i, j, 1, 1) } })) }
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: ICE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'CUFFING&nbsp;SEASON')
  const th = el('canvas', { width: '16px', height: '40px', imageRendering: 'pixelated', marginLeft: '2px' }, b)
  th.width = 4; th.height = 10
  { const c = th.getContext('2d'); const lvl = Math.max(1, 7 - Math.floor((ep - 1) / 2)); c.fillStyle = BONE; c.fillRect(1, 0, 2, 8); c.fillRect(0, 7, 4, 3); c.fillStyle = RED; c.fillRect(1, 8 - lvl, 2, lvl); c.fillRect(1, 8, 2, 1) }
  return {
    update(t, out = 1) {
      b.style.display = out <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(out))
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeCuff(cfg) {
  const DURATION = cfg.duration
  const STORY_END = DURATION - ENDCARD_LEN
  const PIS = signStar('pisces')
  const OUT = [STORY_END - 0.5, STORY_END - 0.1]
  const boxes = cfg.boxes || []
  const allLines = boxes.flatMap(b => b.lines)

  const star = (x, t, id, o = {}) => {
    const S = id === 'stars' ? { color: STAR.sky, glyph: null } : signStar(id)
    const opts = { color: S.color, glyph: o.s >= 150 && o.badge !== false ? S.glyph : null, seed: o.seed ?? (id.length * 3), glow: 1.05, ...o }
    const r = drawStarChar(x, o.x + (o.shiver ? shiver(t, o.shiver, opts.seed) : 0), o.y, o.s, t, opts)
    const F = starFrame(o.x + (o.shiver ? shiver(t, o.shiver, opts.seed) : 0), o.y, o.s, t, opts)
    if (o.scarf) inSprite(x, F, () => scarfCells(x, t, o.scarf, { swing: o.swing ?? 0.6, stripe: o.stripe || BONE }))
    if (o.hat) inSprite(x, F, () => hatCells(x, o.hat))
    if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
    return { ...r, F }
  }
  const pisces = (x, t, P, tears = 2, mood = 'wide', look = [-1, -0.5]) => star(x, t, 'pisces', { mood, look, seed: 6, glow: 0.8, tips: false, tears, ...P })
  const stars = (x, t, P) => star(x, t, 'stars', { seed: 2, ...P })
  const hopsFor = sp => talkHops(allLines, sp, { cps: CPS })
  const K = { star, pisces, stars, hopsFor, OUT, STORY_END, DURATION, PIS, img: {} }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const load = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + src })
    for (const [k, src] of Object.entries(cfg.images || {})) K.img[k] = await load(src)
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const heads = (cfg.heads || []).map(h => ({ h, P: popText(root, h.text, { top: h.top ?? 168, size: h.size ?? 96, accentSize: h.accentSize ?? Math.round((h.size ?? 96) * 1.36), at: h.at, gap: h.gap ?? 0.08, late: h.late || 0, lateAt: h.lateAt ?? null, wobble: !!h.wobble, accentColor: h.accent || ICE, fit: true }) }))
    const dboxes = boxes.map(b => dialogueBox(root, { lines: b.lines, y: b.y ?? 1400, open: b.open, close: b.close, cps: CPS }))
    const top = layerCanvas(root), tx = top.getContext('2d')
    const lesson = cfg.lesson ? buildLesson(root, { dim: 0.55, ...cfg.lesson }) : null
    const bug = buildBug(root, cfg.ep || 1)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#f4fbff', opacity: 0, pointerEvents: 'none' }, root)

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const sk = cfg.sky ? cfg.sky(t) : SKY_H
        drawSky(x, t, sk)
        const snow = typeof cfg.snow === 'function' ? cfg.snow(t) : (cfg.snow ?? 1)
        drawSnow(x, t, snow * 0.8, 0)
        const shake = Math.max(0, ...(cfg.shakes || []).map(s => { const d = t - s; return d > 0 && d < 0.45 ? 16 * Math.exp(-d * 9) * Math.sin(d * 60) : 0 }).map(Math.abs)) * Math.sign(Math.sin(t * 60))
        x.save(); x.translate(0, shake)
        if (t < STORY_END) cfg.draw(x, t, K)
        x.restore()
        drawSnow(x, t, snow, 1)
        if (cfg.ghost) drawGhostCameo(x, t, cfg.ghost)
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.over && t < STORY_END) { tx.save(); tx.translate(0, shake); cfg.over(tx, t, K); tx.restore() }
        for (const { h, P } of heads) P.update(t, h.out ? outK(t, h.out) : 1)
        for (const b of dboxes) b.update(t)
        if (lesson) lesson.update(t)
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END]))
        const fl = Math.max(0, ...(cfg.flashes || []).map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.55 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = cfg.cuts || []
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), ...(CUTS.length ? [cardCuts(CUTS)] : [])]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ...(cfg.heads || []).flatMap((h, i) => {
      if (h.at < 0) return []
      const n = h.text.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length
      return [...wordPops(h.at, Math.max(1, n - (h.late || 0)), h.gap ?? 0.08, i), ...(h.late ? [['pop', r3(h.lateAt), 1174.66, 0.045, 0], ['pop', r3(h.lateAt + 0.08), 1567.98, 0.03, 0]] : [])]
    }),
    ...talkCues(allLines, { cps: CPS }),
    ...(cfg.lesson ? lessonCues(cfg.lesson.at, { text: cfg.lesson.text, chip: cfg.lesson.chip }) : []),
    ...(cfg.flashes || []).flatMap(c => [['whoosh', r3(c - 0.08), 0.28, 0.035], ['tick', r3(c), 0.05]]),
    ...(cfg.shakes || []).flatMap(c => [['boom', r3(c), 0.25], ['tom', r3(c), 90, { gain: 0.25, decay: 0.3 }]]),
    ...(cfg.cues || []),
    ['whoosh', r3(OUT[0]), 0.35, 0.03],
    ...(CUTS.length ? cardCutCues(CUTS) : []),
    ...endcardCues(STORY_END),
  ].filter(c => c[1] >= 0 && c[1] < DURATION)
  return { DURATION, STORY_END, SCENES, CUES, CUTS, OUT }
}
