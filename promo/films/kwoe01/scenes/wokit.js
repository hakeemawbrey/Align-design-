// WHICH ONE ARE YOU?: the shared format of the Month 2 trial reels kwoe01–kwoe24 (promo/films/month2/m27.md).
// Every kwo film imports this file read-only from promo/films/kwoe01/scenes/wokit.js.
//
// The format: four signs in a 2 × 2 grid, numbered 1–4, all doing the same relatable thing four different ways.
//   frame 0   the grid is already mid-action and mid-zoom (whip zoom out of the hero panel), the hook line is slammed at
//             the top and the bug "WHICH ONE ARE YOU?" sits top-left.
//   ~0.45 s   the whip lands on a record-scratch freeze + colour flash (the first-second pattern break).
//   turns     each panel gets its spotlight in turn (gold frame, the others dim) with its caption in the strip.
//   end       the headline swaps to "Comment your number.", and Pisces shoves into the middle of the grid as a sobbing
//             number 5 with the film's last line. Then a hard cut (held ~0.8 s) or a seamless loop back to frame 0.
// No end card, no card transition, no logo: DURATION is the story length.
//
//   makeWhich(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.hook ('Left on *read.* | Which one are you?'), cfg.hero (0–3: the panel the whip zooms out of)
//     cfg.panels: [{ sign, caption, bg, draw(x, t, P), cues: [[kind, tLocal, ...]] }] × 4
//        P = { u (t − turn start; negative before the turn), on (0…1 spotlight), t, i, W, H, star(x, t, o), turn: [a, b] }
//        draw in panel space: 480 × 560, origin top-left (the panel is clipped).
//     cfg.pisces: the last line ('cries at the tiny word *"Read."*'), shown as "5 · …"
//     cfg.ending: 'loop' | 'cut'.   cfg.turn: seconds per panel (default 1.6).   cfg.flash: the colour-flash tint.
//   makeWhichLong(cfg) → the 60 s version (rounds, chapter stickers, tally HUD, verdict). See below.
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { recordScratch, recordScratchCues, loopK, loopCues, chapter, chapterCues } from '../../hookkit.js'
export { chapter, chapterCues, loopK, loopCues, recordScratch, recordScratchCues }

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const BLUE = '#7fd0ff', MINT = '#9fe6b0', TEAR = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG = '#7fe3d0'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const osc = (t, f = 1, ph = 0) => Math.sin((t * f + ph) * Math.PI * 2)
export const saw = (t, p = 1) => ((t / p) % 1 + 1) % 1
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

export const PW = 480, PH = 560
// the grid: panel origins (1080 × 1920 frame)
export const GRID = [[40, 420], [560, 420], [40, 1000], [560, 1000]]
export const CENTER = [540, 990]

// ── drawing helpers (canvas)
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** an ink-outlined block (pixel-chunky prop) */
export function box(x, X, Y, w, h, col, { b = 5, hi = null, lo = null } = {}) {
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
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK], size = 22) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 5, spread = 100, life = 1.4, rise = 170, cols = ['#ff5c8a', PINK, GOLD], loop = 0 } = {}) {
  for (let i = 0; i < n; i++) {
    let b = t0 + i * 0.16
    if (loop && t > b) b += Math.floor((t - b) / loop) * loop
    const p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 8, hy = cy - p * rise
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 22, life = 2, v0 = 420, g = 560, cols = [GOLD, PINK, BLUE, MINT, BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = v0 + v0 * 0.5 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 12, py = cy + Math.sin(a) * v * tt + g * tt * tt
    const sz = 9 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble, popping at t0, gone at t1 (t1 = Infinity keeps it) */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 28, tail = 0, font = INTER, weight = 800, maxW = 440, tailUp = false } = {}) {
  const k = pop01(t, t0, 0.22, 2.4) * (t1 === Infinity ? 1 : outK(t, [t1 - 0.12, t1]))
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  let w = x.measureText(text).width + 36
  const sc = w > maxW ? maxW / w : 1
  if (sc < 1) { x.scale(sc, sc) }
  const h = size + 26
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 34)
  if (tailUp) { x.fillStyle = INK; x.fillRect(tx - 12, -h / 2 - 15, 12, 12); x.fillStyle = col; x.fillRect(tx - 8, -h / 2 - 8, 8, 9) }
  else { x.fillStyle = INK; x.fillRect(tx - 12, h / 2 + 3, 12, 10); x.fillRect(tx - 6, h / 2 + 12, 7, 7); x.fillStyle = col; x.fillRect(tx - 8, h / 2, 8, 8) }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** a thought cloud (three dots trailing to it) */
export function thought(x, t, cx, cy, t0, t1, text, { size = 26, col = '#e8e2ff', fromX = 0, fromY = 90 } = {}) {
  const k = pop01(t, t0, 0.25, 2.2) * (t1 === Infinity ? 1 : outK(t, [t1 - 0.12, t1]))
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 40, h = size + 30
  for (const [dx, dy, r] of [[fromX * 0.35, h / 2 + 18, 9], [fromX * 0.7, h / 2 + 40, 6]]) { x.fillStyle = INK; x.fillRect(dx - r - 3, dy - r - 3, 2 * r + 6, 2 * r + 6); x.fillStyle = col; x.fillRect(dx - r, dy - r, 2 * r, 2 * r) }
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 + 6, w + 8, h - 12); x.fillRect(-w / 2 + 8, -h / 2 - 4, w - 16, h + 8)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2 + 6, w, h - 12); x.fillRect(-w / 2 + 8, -h / 2, w - 16, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
  void fromY
}
/** pixel label text, with an ink drop shadow */
export function label(x, text, cx, cy, { size = 26, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 3)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha *= a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function glow(x, cx, cy, r, col = '255,240,200', a = 0.3) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
}
/** motion / action lines around a point */
export function actionLines(x, t, cx, cy, r0, r1, n = 10, col = BONE, a = 0.8, seed = 0) {
  x.save(); x.globalAlpha *= a; x.strokeStyle = col; x.lineWidth = 5; x.lineCap = 'square'
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + seed, w = 0.5 + 0.5 * osc(t, 5, i * 0.37)
    x.beginPath(); x.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0); x.lineTo(cx + Math.cos(ang) * lerp(r0, r1, w), cy + Math.sin(ang) * lerp(r0, r1, w)); x.stroke()
  }
  x.restore()
}
export function sweat(x, t, cx, cy, k = 1) {
  for (let i = 0; i < 2; i++) {
    const p = saw(t * 1.6 + i * 0.5)
    drawBits(x, ['.T.', 'TTT', 'TTT', '.T.'], { T: TEAR }, cx + i * 22, cy + p * 40, 4 * k, { alpha: 1 - p })
  }
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
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = TEAR; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
    ctx.fillStyle = TEAR; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** a sign star in panel space + optional tears; returns the sprite frame */
export function drawSign(x, sign, t, o = {}) {
  const S = signStar(sign)
  const opts = { color: S.color, glyph: o.s >= 150 && o.glyph !== false ? S.glyph : null, seed: o.seed ?? 3, glow: 0.9, ...o }
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  const F = starFrame(o.x, o.y, o.s, t, opts)
  if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
  return F
}

// ── props (panel space)
/** a handheld phone; screen(x, w, h) draws on the screen in phone-local space (origin top-left of the screen) */
export function phone(x, cx, cy, { s = 1, rot = 0, screen = null, col = '#2a2148', glowA = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (glowA > 0) glow(x, 0, 0, 160, '190,220,255', glowA)
  box(x, -48, -86, 96, 172, col, { b: 5 })
  R(x, '#14102a', -40, -74, 80, 146)
  if (screen) { x.save(); x.translate(-40, -74); x.beginPath(); x.rect(0, 0, 80, 146); x.clip(); screen(x, 80, 146); x.restore() }
  R(x, '#5a5470', -12, -82, 24, 4)
  x.restore()
}
/** chat bubbles on a phone screen: [{ me, text, col }] bottom-up */
export function chat(x, w, h, msgs, { size = 11 } = {}) {
  let y = h - 10
  x.font = `700 ${size}px ${INTER}`; x.textBaseline = 'middle'
  for (let i = msgs.length - 1; i >= 0; i--) {
    const m = msgs[i]; const tw = Math.min(w - 16, x.measureText(m.text).width + 12), bh = size + 10
    const bx = m.me ? w - tw - 5 : 5
    R(x, m.col || (m.me ? '#5aa0ff' : '#3a3358'), bx, y - bh, tw, bh)
    x.fillStyle = m.ink || BONE; x.textAlign = 'left'; x.fillText(m.text, bx + 6, y - bh / 2 + 1)
    y -= bh + 6
  }
}
export function bed(x, X, Y, w, { col = '#6d5bd0', sheet = '#c9c2ff' } = {}) {
  box(x, X, Y, w, 70, '#5a3f2e', { b: 5 }); box(x, X + 8, Y - 26, w - 16, 34, sheet, { b: 5 }); box(x, X + 14, Y - 50, 90, 30, BONE, { b: 5 })
  R(x, col, X + 120, Y - 26, w - 136, 34)
}
export function couch(x, X, Y, w, col = '#c0587a') {
  box(x, X, Y - 120, w, 70, col, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  box(x, X - 20, Y - 70, w + 40, 70, col, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  box(x, X - 34, Y - 110, 30, 110, col, { b: 6 }); box(x, X + w + 4, Y - 110, 30, 110, col, { b: 6 })
}
export function desk(x, X, Y, w, col = '#8a6440') { box(x, X, Y, w, 22, col, { b: 5, hi: '#a87e54' }); R(x, INK, X + 10, Y + 22, 12, 120); R(x, INK, X + w - 22, Y + 22, 12, 120) }
export function laptop(x, cx, cy, { s = 1, screen = null } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -70, -96, 140, 92, '#3a3358', { b: 5 }); R(x, '#14102a', -62, -88, 124, 76)
  if (screen) { x.save(); x.translate(-62, -88); x.beginPath(); x.rect(0, 0, 124, 76); x.clip(); screen(x, 124, 76); x.restore() }
  box(x, -86, -4, 172, 12, '#8c86a8', { b: 5 })
  x.restore()
}
export function windowFrame(x, X, Y, w, h, { night = true, moon = true } = {}) {
  box(x, X, Y, w, h, night ? '#1d2a5c' : '#9fd8f6', { b: 7 })
  if (night) { for (let i = 0; i < 7; i++) R(x, BONE, X + ((i * 53) % w), Y + ((i * 37) % h), 4, 4); if (moon) { R(x, '#fff1c8', X + w - 60, Y + 20, 34, 34); R(x, night ? '#1d2a5c' : '#9fd8f6', X + w - 50, Y + 14, 30, 30) } }
  R(x, INK, X + w / 2 - 3, Y, 6, h); R(x, INK, X, Y + h / 2 - 3, w, 6)
}
export function mirror(x, cx, cy, w, h) { box(x, cx - w / 2, cy - h / 2, w, h, '#bfe8ff', { b: 8 }); R(x, 'rgba(255,255,255,0.5)', cx - w / 2 + 14, cy - h / 2 + 14, 12, h * 0.4); R(x, 'rgba(255,255,255,0.35)', cx - w / 2 + 32, cy - h / 2 + 14, 6, h * 0.25) }
export function clock(x, cx, cy, text, { col = '#ff6b7f', s = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -78, -32, 156, 64, '#140f24', { b: 5 }); x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, 0, 3)
  x.restore()
}
export function sandwich(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -44, -10, 88, 16, '#e9b24a', { b: 4 }); R(x, MINT, -46, -16, 92, 6); R(x, '#ff6b7f', -42, -22, 84, 6); box(x, -44, -38, 88, 16, '#e9b24a', { b: 4 })
  x.restore()
}
export function mug(x, cx, cy, t = 0, col = '#ff8fb1') {
  box(x, cx - 22, cy - 26, 44, 46, col, { b: 4 }); R(x, INK, cx + 22, cy - 16, 14, 4); R(x, INK, cx + 32, cy - 16, 4, 22); R(x, INK, cx + 22, cy + 2, 14, 4)
  for (let i = 0; i < 3; i++) { const p = saw(t * 0.8 + i / 3); x.save(); x.globalAlpha *= 0.5 * (1 - p); R(x, BONE, cx - 12 + i * 10 + 4 * osc(t, 1, i), cy - 36 - p * 40, 5, 10); x.restore() }
}
export function blanket(x, cx, cy, w, h, col = '#ffb36b') {
  x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w / 2 + 6, h / 2 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2); x.fill()
  x.strokeStyle = 'rgba(27,18,54,0.35)'; x.lineWidth = 6; for (let i = -1; i <= 1; i++) { x.beginPath(); x.moveTo(cx + i * w * 0.22, cy - h * 0.4); x.lineTo(cx + i * w * 0.26, cy + h * 0.45); x.stroke() }
  x.restore()
}
export function pillow(x, cx, cy, w = 150, h = 70, col = BONE, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -w / 2, -h / 2, w, h, col, { b: 5 }); R(x, 'rgba(27,18,54,0.15)', -w / 2 + 8, h / 2 - 16, w - 16, 8); x.restore() }
export function card(x, cx, cy, w, h, text, { col = BONE, ink = INK, size = 22, rot = 0, font = INTER, weight = 800 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = ink
  String(text).split('\n').forEach((ln, i, a) => x.fillText(ln, 0, (i - (a.length - 1) / 2) * size * 1.15 + 2))
  x.restore()
}
export function floor(x, col = '#2a2148', y = 470) { R(x, col, 0, y, PW, PH - y); R(x, 'rgba(255,255,255,0.08)', 0, y, PW, 6) }
export function speedStreaks(x, t, k = 1, col = BONE, dir = 1) {
  x.save(); x.globalAlpha *= 0.55 * k
  for (let i = 0; i < 9; i++) { const y = 40 + i * 60, p = saw(t * 3 + i * 0.37); R(x, col, dir > 0 ? lerp(-120, PW, p) : lerp(PW, -120, p), y, 90 + (i % 3) * 30, 5) }
  x.restore()
}

// the panel backgrounds: a flat room colour, a soft gradient and a wall line
export const ROOMS = {
  night: ['#1a1640', '#2a2160'], bedroom: ['#2b2058', '#3b2a72'], cafe: ['#4a2a3a', '#6b3a4a'], office: ['#23324a', '#2f4466'],
  party: ['#3a1a52', '#5a2470'], street: ['#1d2a4a', '#2a3d66'], kitchen: ['#2f3a3a', '#3f5050'], dusk: ['#5a2f5a', '#c0587a'],
  mint: ['#1f3a3a', '#2a5a52'], gold: ['#4a3a1a', '#6b5224'], dark: ['#0e0b1e', '#1a1436'], wedding: ['#4a2f4a', '#7a4a6a'],
  stage: ['#2a1238', '#3d1a52'], park: ['#1f3a2a', '#2f5a3a'], blue: ['#1a2a5a', '#2a3f80'],
}
function room(x, bg) {
  const [a, b] = ROOMS[bg] || ROOMS.night
  const g = x.createLinearGradient(0, 0, 0, PH); g.addColorStop(0, a); g.addColorStop(1, b)
  x.fillStyle = g; x.fillRect(0, 0, PW, PH)
}

// ── DOM pieces
function buildBug(root, text = 'WHICH&nbsp;ONE<span style="color:rgba(255,255,255,0.62)">&nbsp;ARE&nbsp;YOU?</span>') {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(127,227,208,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, text)
  return b
}
/** the caption strip under the grid: a numbered badge + Inter 800 + one *italic* accent */
function buildStrip(root, { n, text, badge, accent, top = 1598 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '980px', padding: '16px 32px 18px 18px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: '10px 10px 0 rgba(6,4,18,0.7)', transformOrigin: '50% 50%' }, wrap)
  el('div', { flex: '0 0 auto', width: '78px', height: '78px', borderRadius: '50%', background: badge, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 46px ${INTER}`, color: INK }, st, String(n))
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 60px ${SERIF};color:${accent};letter-spacing:0">$1</span>`)
  const tx = el('div', { font: `800 46px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
  return { wrap, st, tx }
}
function stripUpdate(S, t, at, out, tilt = 0, dur = 0.3) {
  const on = t >= at && t < out[1]
  S.wrap.style.display = on ? 'flex' : 'none'
  if (!on) return
  const k = easeOutBack(prog(t, at, at + dur), 2.6), o = outK(t, out)
  S.st.style.opacity = String(clamp(prog(t, at, at + 0.08)) * o)
  S.st.style.transform = `translateY(${((1 - o) * 24).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
}
/** a slammed headline (big, from 1.6× to 1 with a squash), `*word*` accent, `|` line break */
function buildSlam(root, text, { top = 150, size = 88, accent = GOLD, accentSize, color = BONE } = {}) {
  const wrap = el('div', { position: 'absolute', left: '50px', width: '980px', top: top + 'px', display: 'none', textAlign: 'center', pointerEvents: 'none', transformOrigin: '50% 40%' }, root)
  const AS = accentSize || Math.round(size * 1.3)
  const html = text.split('|').map(s => s.trim().replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${AS}px ${SERIF};color:${accent};letter-spacing:0">$1</span>`)).join('<br>')
  el('div', { font: `800 ${size}px ${INTER}`, lineHeight: '1.04', color, letterSpacing: '-0.02em', textShadow: '0 6px 0 rgba(6,4,18,0.85), 0 0 30px rgba(6,4,18,0.8)' }, wrap, html)
  return {
    update(t, at, out = 1, from = 1.7) {
      const on = t >= at && out > 0.001
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      const p = prog(t, at, at + 0.16), q = t - at - 0.16
      const sc = lerp(from, 1, ease.outCubic(p)) * (q > 0 ? 1 + 0.05 * Math.exp(-q * 9) * Math.sin(q * 38) : 1)
      wrap.style.opacity = String(clamp(p * 3) * out)
      wrap.style.transform = `scale(${sc.toFixed(4)})`
    },
  }
}

// ── the whip / freeze / loop camera
export const ZOOM0 = 2.1
function panelCenter(i) { const [X, Y] = GRID[i]; return [X + PW / 2, Y + PH / 2] }

// ═══════════════════════════════════════════════════════════════════════════ the grid painter (shared)
function makeGrid({ hero = 0, flash = '255,240,220' } = {}) {
  void flash
  /** paint the 4 panels (+ number badges); spot(i) → 0…1 spotlight, dim(i) → 0…1 dim; tp = panel time */
  function paint(x, t, tp, panels, { spot, dim, frozen = 0 }) {
    panels.forEach((p, i) => {
      const [X, Y] = GRID[i]
      const sp = spot(i), dm = dim(i)
      x.save(); x.translate(X, Y)
      // frame
      const lift = 6 * sp
      x.translate(PW / 2, PH / 2); x.scale(1 + 0.025 * sp, 1 + 0.025 * sp); x.translate(-PW / 2, -PH / 2 - lift)
      R(x, 'rgba(6,4,18,0.6)', 12, 14, PW, PH)
      R(x, sp > 0.05 ? GOLD : INK, -8, -8, PW + 16, PH + 16)
      if (sp > 0.05) { x.save(); x.globalAlpha *= sp; R(x, '#fff1c8', -8, -8, PW + 16, 4); x.restore() }
      x.save(); x.beginPath(); x.rect(0, 0, PW, PH); x.clip()
      room(x, p.bg)
      const PP = p.P(tp); PP.on = sp
      p.draw(x, tp, PP)
      if (frozen > 0 && false) { x.save(); x.globalAlpha = 0.18 * frozen; x.fillStyle = '#bfe8ff'; x.fillRect(0, 0, PW, PH); x.restore() }
      if (dm > 0) R(x, `rgba(5,4,14,${(0.55 * dm).toFixed(3)})`, 0, 0, PW, PH)
      x.restore()
      // number badge
      const bk = 1 + 0.18 * sp * Math.exp(-Math.max(0, t - p.turn[0]) * 6)
      x.save(); x.translate(46, 46); x.scale(bk, bk)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 38, 0, Math.PI * 2); x.fill()
      x.fillStyle = sp > 0.05 ? GOLD : BONE; x.beginPath(); x.arc(0, 0, 32, 0, Math.PI * 2); x.fill()
      x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(String(i + 1), 0, 2)
      x.restore()
      x.restore()
    })
  }
  return { paint, hero }
}

/** Pisces, number 5, shoved into the centre of the grid, sobbing */
export function drawPisces5(x, t, k, t0, { cx = CENTER[0], cy = CENTER[1], s = 210, hops = [], fountain = 3, wobble = true } = {}) {
  if (k <= 0.01) return
  const PIS = signStar('pisces')
  // a shove: slides in from the right with a squash
  const sl = 1 - ease.outBack(prog(t, t0, t0 + 0.32))
  const X = cx + sl * 620, Y = cy
  glow(x, X, Y, 230, '170,210,255', 0.25 * k)
  // the 5 badge behind
  x.save(); x.translate(X + s * 0.42, Y - s * 0.55); x.rotate(0.12 + (wobble ? 0.05 * osc(t, 2) : 0)); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.arc(0, 0, 43, 0, Math.PI * 2); x.fill()
  x.font = `800 56px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('5', 0, 3)
  x.restore()
  const opts = { color: PIS.color, glyph: PIS.glyph, mood: 'sparkle', look: [0, -0.3], seed: 6, glow: 1, pop: k, hops: [t0 + 0.3, t0 + 0.75, t0 + 1.2, ...hops], squash: sl * 0.25 }
  shadow(x, X, Y + s * 0.5, s * 0.9 * k, 0.45)
  drawStarChar(x, X, Y, s, t, opts)
  const F = starFrame(X, Y, s, t, opts)
  inSprite(x, F, () => tearsCells(x, t, fountain))
  // a tissue in hand, waving
  x.save(); x.translate(X - s * 0.55, Y + s * 0.05 + 8 * osc(t, 3)); x.rotate(-0.3 + 0.25 * osc(t, 2.5)); x.scale(k, k)
  R(x, INK, -16, -22, 32, 44); R(x, '#ffffff', -12, -18, 24, 36); R(x, '#dfe9ff', -12, 8, 24, 10)
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the short episode
export function makeWhich(cfg) {
  const TL = cfg.turn || 1.6
  const T0 = 1.0
  const turns = [0, 1, 2, 3].map(i => [r3(T0 + i * TL), r3(T0 + (i + 1) * TL)])
  const E = r3(T0 + 4 * TL)
  const LOOP = cfg.ending === 'loop'
  const TAIL = LOOP ? 2.5 : 2.0
  const DURATION = r3(cfg.dur || E + TAIL)
  const LOOPLEN = 0.45
  const T = {
    whip: [0, 0.45], freeze: [0.45, 1.0], turns, E, comment: E, pis: r3(E + 0.12), pisLine: r3(E + 0.42),
    loop: [r3(DURATION - LOOPLEN), DURATION], end: DURATION,
  }
  const hero = cfg.hero ?? 0
  const REC = { at: T.freeze[0], len: r3(T.freeze[1] - T.freeze[0]), caption: cfg.freeze || 'pick *one.*', top: 1690 }
  const grid = makeGrid({ hero })
  const SIGN_COL = cfg.panels.map(p => signStar(p.sign).color)
  // panel time: freezes during the record-scratch
  const ptime = t => t < T.freeze[0] ? t : t < T.freeze[1] ? T.freeze[0] : t - (T.freeze[1] - T.freeze[0])
  const panels = cfg.panels.map((p, i) => ({
    ...p, turn: turns[i],
    P: tp => ({ u: tp - ptime(turns[i][0]), on: 0, t: tp, i, W: PW, H: PH, turn: turns[i].map(ptime), sign: p.sign, col: SIGN_COL[i],
      star: (x, t, o) => drawSign(x, p.sign, t, { x: 240, y: 330, s: 200, seed: 3 + i, ...o }) }),
  }))
  const spotK = (t, i) => { const [a, b] = turns[i]; return clamp(prog(t, a - 0.05, a + 0.12)) * (1 - clamp(prog(t, b - 0.08, b + 0.04))) }
  const anyTurn = t => t >= turns[0][0] - 0.05 && t < E

  function camera(t) {
    // frame-0 pose: zoomed into the hero panel; whip out by 0.45; the loop whips back in
    const [hx, hy] = panelCenter(hero)
    const pose = k => ({ s: lerp(1, ZOOM0, k), cx: lerp(540, hx, k), cy: lerp(990, hy, k) })
    let k = 0
    if (t < T.whip[1]) k = 1 - ease.outCubic(prog(t, 0, T.whip[1]))
    if (LOOP && t > T.loop[0]) k = loopK(t, DURATION, LOOPLEN)
    return pose(k)
  }

  function paintAll(x, t, { forFrame0 = false } = {}) {
    const tp = ptime(t)
    const frozen = t >= T.freeze[0] && t < T.freeze[1] ? 1 : 0
    const cam = camera(t)
    drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * (1 + (cam.s - 1) * 0.15) })
    x.save()
    x.translate(540, 990); x.scale(cam.s, cam.s); x.translate(-cam.cx, -cam.cy)
    // whip motion blur: a few ghosted copies are too heavy; use streaks over the frame instead (below)
    const endOn = t >= T.comment && !forFrame0
    grid.paint(x, t, tp, panels, {
      spot: i => forFrame0 ? 0 : spotK(t, i),
      dim: i => (forFrame0 || !anyTurn(t)) ? 0 : 1 - spotK(t, i),
      frozen,
    })
    // Pisces #5
    if (endOn) {
      const k = pop01(t, T.pis, 0.3, 2) * (LOOP ? 1 - ease.inQuad(prog(t, T.loop[0], T.loop[1] - 0.1)) : 1)
      drawPisces5(x, t, k, T.pis, { s: 240 })
      sparkles(x, t, CENTER[0], CENTER[1], T.pis + 0.3, 10, 200, 0.4, [TEAR, BONE, PINK])
    }
    x.restore()
    // a scrim behind the headline (matters while the camera is zoomed in)
    { const g = x.createLinearGradient(0, 0, 0, 470); g.addColorStop(0, 'rgba(5,4,14,0.9)'); g.addColorStop(0.7, 'rgba(5,4,14,0.55)'); g.addColorStop(1, 'rgba(5,4,14,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 470) }
    // the film's own screen-space layer (frame-0 slams etc.), also painted into the loop plate
    if (cfg.fx) cfg.fx(x, t, { T, forFrame0, cam })
    // whip streaks
    const ws = t < T.whip[1] ? 1 - prog(t, 0, T.whip[1]) : (LOOP && t > T.loop[0] ? prog(t, T.loop[0], T.loop[1]) * (forFrame0 ? 0 : 1) : 0)
    if (ws > 0.02) {
      x.save(); x.globalAlpha = 0.5 * ws; x.strokeStyle = BONE; x.lineWidth = 6
      for (let i = 0; i < 26; i++) {
        const a = (i / 26) * Math.PI * 2 + 0.3, r0 = 380 + 140 * ((i * 7) % 5) / 4
        x.beginPath(); x.moveTo(540 + Math.cos(a) * r0, 990 + Math.sin(a) * r0); x.lineTo(540 + Math.cos(a) * (r0 + 260 * ws), 990 + Math.sin(a) * (r0 + 260 * ws)); x.stroke()
      }
      x.restore()
    }
  }

  async function build(stage) {
    try {
      await Promise.all(["800 88px Inter", "800 46px Inter", "800 28px Inter", "italic 500 112px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 40px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    // the frame-0 plate for the seamless loop (painted lazily, pure: always the t = 0 composition)
    let plate = null
    const hookS = buildSlam(root, cfg.hook, { top: 160, size: cfg.hookSize || 86, accent: cfg.accent || GOLD })
    const commentS = buildSlam(root, 'Comment your *number.*', { top: 176, size: 92, accent: PINK })
    const strips = panels.map((p, i) => buildStrip(root, { n: i + 1, text: p.caption, badge: SIGN_COL[i], accent: cfg.deep || '#7a3aa0' }))
    const pisStrip = buildStrip(root, { n: 5, text: cfg.pisces, badge: PINK, accent: '#2a6fd0' })
    buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flashD = el('div', { position: 'absolute', inset: 0, background: cfg.flash || '#ff7eb6', opacity: 0, pointerEvents: 'none', mixBlendMode: 'screen' }, root)
    void el('div', { position: 'absolute', left: '0', top: '1720px', width: '1080px', textAlign: 'center', display: 'none', font: `700 34px ${MONO}`, letterSpacing: '0.3em', color: BONE, textShadow: '0 3px 0 rgba(6,4,18,0.9)', pointerEvents: 'none' }, null, '')

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const shake = (() => { const d = t - T.comment; return d > 0 && d < 0.4 ? 14 * Math.exp(-d * 9) * Math.sin(d * 60) : 0 })()
        x.save(); x.translate(0, shake)
        paintAll(x, t)
        x.restore()
        // the loop: cross into the frame-0 plate over the last LOOPLEN
        const lk = LOOP ? loopK(t, DURATION, LOOPLEN) : 0
        if (lk > 0) {
          if (!plate) { plate = document.createElement('canvas'); plate.width = 1080; plate.height = 1920; paintAll(plate.getContext('2d'), 0, { forFrame0: true }) }
          x.save(); x.globalAlpha = lk; x.drawImage(plate, 0, 0); x.restore()
        }
        // DOM: the hook is on from frame 0; it hands over to "Comment your number." at E, and comes back for the loop
        const hookOut = t < T.comment ? 1 : (LOOP ? lk : 0)
        hookS.update(t, t < T.comment ? -1 : T.loop[0], hookOut, 1.15)
        commentS.update(t, T.comment, t >= T.comment ? (LOOP ? 1 - lk : 1) : 0)
        strips.forEach((s, i) => stripUpdate(s, t, turns[i][0] + 0.04, [turns[i][1] - 0.12, turns[i][1]], [-1.6, 1.4, -1.2, 1.6][i]))
        stripUpdate(pisStrip, t, T.pisLine, LOOP ? [T.loop[0] - 0.05, T.loop[0] + 0.25] : [DURATION + 1, DURATION + 2], -1.2)
        const fl = Math.max(0, t >= T.comment && t < T.comment + 0.12 ? 0.7 * (1 - (t - T.comment) / 0.12) : 0)
        flashD.style.opacity = String(0.6 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ['whoosh', 0, 0.42, 0.05], ['boom', r3(T.freeze[0] - 0.02), 0.2],
    // the record scratch + freeze (hook kit: wika-wika + a tape stop on the music = the sudden silence)
    ...recordScratchCues(REC),
    ...turns.flatMap(([a], i) => [
      ['whoosh', r3(a - 0.06), 0.2, 0.028], ['pop', r3(a + 0.02), NOTE[i * 2 % 7], 0.045, [-0.4, 0.4, -0.3, 0.3][i]], ['tick', r3(a + 0.04), 0.05],
      ...(cfg.panels[i].cues || []).map(c => [c[0], r3(Math.max(0, ptime(a) + c[1] + (T.freeze[1] - T.freeze[0]))), ...c.slice(2)]),
    ]),
    // the comment slam + Pisces shove + sob
    ['boom', T.comment, 0.3], ['tom', T.comment, 92, { gain: 0.28, decay: 0.3 }], ['tick', T.comment, 0.08], ['crash', T.comment, { gain: 0.05, len: 1.4 }],
    ['whoosh', r3(T.pis - 0.04), 0.3, 0.04], ['pop', r3(T.pis + 0.28), 987.77, 0.05, 0.2],
    ...sobCues(r3(T.pis + 0.4)),
    ['pop', r3(T.pisLine + 0.02), 1318.51, 0.04, 0.3], ['tick', r3(T.pisLine + 0.03), 0.05],
    ...(LOOP ? loopCues({ duration: DURATION, len: LOOPLEN }) : []),
    ...(cfg.cues || []),
  ]
  const SCENES = [build, recordScratch(REC)]
  return { DURATION, SCENES, CUES, T, ptime }
}

/** a big slammed object for frame 0: scale from 1.5 → 1 over [0, 0.3], fades out over out = [a, b] */
export function slam0(t, out = [0.85, 1.05]) {
  const p = ease.outBack(prog(t, -0.05, 0.3)), o = 1 - ease.inQuad(prog(t, out[0], out[1]))
  return { s: lerp(1.5, 1, p), a: o }
}

/** a record scratch: a fast pitched-down chirp pair + a tick, then the freeze tone */
export function scratchCues(t) {
  return [['pop', r3(t), 1760, 0.06, -0.2], ['pop', r3(t + 0.03), 1174.66, 0.06, 0.2], ['pop', r3(t + 0.06), 587.33, 0.06, 0], ['tick', r3(t), 0.1], ['tick', r3(t + 0.05), 0.08], ['bell', r3(t + 0.08), 1760, 0.02, 0.6, 0]]
}
/** Pisces' sob: three wobbly falling plucks + glitter (tears) */
export function sobCues(t) {
  return [['pluck', r3(t), 987.77, 0.045, 0.35, 0.2], ['pluck', r3(t + 0.16), 880, 0.045, 0.35, 0.2], ['pluck', r3(t + 0.3), 739.99, 0.05, 0.5, 0.2], ['glitter', r3(t), r3(t + 0.6)]]
}
