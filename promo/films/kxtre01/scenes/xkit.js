// xkit: the episode engine of TRENDS: EXTENDED (Month 2 boost, batch m41, rows in promo/films/month2/m41.md).
// Twelve ~2-minute episodes of the trend formats from Trends 1 (tr*) and Trends 2 (nt2e*): the same pixel-star cast, the
// night sky, bone caption stickers, Inter 800 with EB Garamond italic accents. Every episode imports this file.
// No end card, no card transition, no logo / CTA: DURATION is the story, and it ends on a hard cut or a seamless loop.
//
//   makeEp(cfg) → { DURATION, SCENES, CUES, MUSIC, T }
//   cfg.id, cfg.bug (format name, the series bug), cfg.lead (sign id), cfg.accent (accent colour), cfg.deep (sticker ink)
//   cfg.music: { style, key, seed }
//   cfg.hook: { text, len, draw(x, t, S), cues }      frame 0: text on screen from t = 0, the scene already mid-action
//   cfg.promise: 'the ending, *though.*'                 the promised payoff tag (from ~1.2 s to the first chapter + 3 s)
//   cfg.chapters: [{ name, dur, caption, captionAt, stamp, draw(x, t, S), bubbles, cues, pis, stage }]
//       bubbles: [{ at, end, x, y, text, tail, size, col, ink, think }]  (chapter-relative seconds; auto pop cues)
//       cues: [[kind, u, ...args]]  chapter-relative sound cues.   stamp: a timestamp chip ('9:04 AM').
//   cfg.last: { text, at }   the last line (popText, big, centred at ~y 300), `at` relative to the last chapter's start
//   cfg.ending: 'cut' | 'loop'   (loop: the last LOOP s ease back into the frame-0 composition: hook text + hook(x, 0))
//   cfg.overlay(x, t, S)  extra top-canvas drawing.  cfg.cues: absolute extra cues.  cfg.hits: music hit times.
//
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, screenShake, shakeCues,
  caught, caughtCues, incomingCall, incomingCallCues, notification, notificationCues, loadingBar, loadingBarCues,
  countdown, countdownCues, newsDesk, newsDeskCues, gameHud, gameHudCues, achievement, achievementCues, chapter,
  chapterCues, glitch, glitchCues, loopBack, loopCues,
} from '../../hookkit.js'
export { clamp, lerp, prog, ease, el, easeOutBack, drawSky, drawPixelStar, drawStarChar, signStar, STAR, SKY_H, popText }

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', SKYB = '#7fd0ff', MINT = '#9fe6b0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_PINK = '#ff7eb6'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const win = (t, a, b, fi = 0.25, fo = 0.2) => (t < a || t > b) ? 0 : Math.min(pop01(t, a, fi, 2), outK(t, [b - fo, b]))
export const FLOOR = 1240

// ═════════════════════════════════════════════ drawing helpers (canvas)
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
export function sparkles(x, t, cx, cy, t0, n = 10, Rr = 160, seed = 1, cols = [GOLD, BONE, PINK]) {
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, MINT, BONE] } = {}) {
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
/** wrap text into lines that fit maxW at the current font */
export function wrap(x, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let line = ''
    for (const w of para.split(' ')) {
      const tryL = line ? line + ' ' + w : w
      if (x.measureText(tryL).width > maxW && line) { out.push(line); line = w } else line = tryL
    }
    out.push(line)
  }
  return out
}
/** a pixel speech bubble at absolute times (pops at t0, out by t1); think = a thought cloud */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 40, tail = 0, font = INTER, weight = 800, maxW = 560, think = false, rot = 0, fit = false } = {}) {
  if (t < t0 || t > t1) return
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = wrap(x, text, maxW)
  const lw = Math.max(...lines.map(l => x.measureText(l).width))
  const w = lw + 48, h = lines.length * size * 1.12 + 30
  if (fit) { x.restore(); x.save(); cx = clamp(cx, w / 2 + 34, 1046 - w / 2); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); x.font = `${weight} ${size}px ${font}` }
  if (think) {
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w / 2 + 14, h / 2 + 14, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = col; x.beginPath(); x.ellipse(0, 0, w / 2 + 8, h / 2 + 8, 0, 0, Math.PI * 2); x.fill()
    for (const [dx, dy, r] of [[tail * w * 0.3, h / 2 + 26, 14], [tail * w * 0.38, h / 2 + 54, 9]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
  } else {
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
    const tx = tail * (w / 2 - 40)
    x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
    x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, 2 + (i - (lines.length - 1) / 2) * size * 1.12))
  x.restore()
}
/** canvas label with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, k = 1 } = {}) {
  if (alpha <= 0 || k <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a sticker tag (canvas): bone plate, ink border, Inter 800 */
export function tag(x, text, cx, cy, k, { bg = BONE, col = INK, size = 40, rot = -0.06, font = INTER } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 28
  box(x, -w / 2, -h / 2, w, h, bg, { b: 6 })
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}
/** a comic sfx word (pops and rises) */
export function sfx(x, t, text, cx, cy, t0, { size = 44, col = BONE, life = 0.7, rot = -0.12 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const k = easeOutBack(clamp(tt / 0.18), 2.6) * (1 - ease.inQuad(prog(tt, life * 0.6, life)))
  label(x, text, cx, cy - tt * 40, { size, col, font: INTER, weight: 800, rot, k })
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function glowSpot(x, cx, cy, r, col = '255,220,160', a = 0.3) {
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
}
/** a loading bar plate: "label… 37%"  (p 0…1) */
export function loadBar(x, cx, cy, w, p, text, { col = PINK, k = 1, size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2, -70, w, 140, '#1d1640', { b: 6 })
  x.font = `800 ${size}px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(text, -w / 2 + 26, -30)
  x.textAlign = 'right'; x.fillStyle = col; x.fillText(`${Math.floor(p * 100)}%`, w / 2 - 26, -30)
  R(x, INK, -w / 2 + 24, 12, w - 48, 36); R(x, '#3a3070', -w / 2 + 28, 16, w - 56, 28); R(x, col, -w / 2 + 28, 16, (w - 56) * clamp(p), 28)
  x.restore()
}

// ── the cast: a sign star, plus Pisces with tears (the running gag)
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
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
let SEEDS = 0
/** draw a sign star: o = { x, y, s, mood, look, hops, pop, alpha, squash, blush, tears, glyph } */
export function star(x, t, id, o = {}) {
  const S = id === 'stars' ? { color: STAR.sky, glyph: null } : signStar(id)
  const seed = o.seed ?? ((id.length * 7 + (SEEDS = (SEEDS + 1) % 97)) % 13 + 1)
  const opts = { color: S.color, glyph: o.glyph === false ? null : (o.s >= 150 ? S.glyph : null), seed, glow: 1, ...o, seed }
  const r = drawStarChar(x, o.x, o.y, o.s, t, opts)
  if (o.tears) inSprite(x, starFrame(o.x, o.y, o.s, t, opts), () => tearsCells(x, t, o.tears))
  return r
}
/** Pisces, crying (k 1…3), with the tissue box unless noBox */
export function pisces(x, t, o = {}) {
  const P = { s: 150, mood: 'sparkle', look: [-1, -0.5], tears: 2, ...o }
  if (!P.noBox) tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.28, P.s * 0.5 * (P.pop ?? 1))
  return star(x, t, 'pisces', { ...P, seed: 6 })
}

// ── sets (all full-frame, 1080 × 1920; the floor line is FLOOR)
function skyWindow(x, t, X, Y, w, h, { night = true, snow = false, moon = true } = {}) {
  box(x, X, Y, w, h, night ? '#1a2250' : '#9fd8f6', { b: 10 })
  x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
  if (night) {
    for (let i = 0; i < 14; i++) { const sx = X + ((i * 97) % w), sy = Y + ((i * 53) % h); const a = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + i)); x.globalAlpha = a; R(x, '#fff6d8', sx, sy, 4, 4) }
    x.globalAlpha = 1
    if (moon) { x.fillStyle = '#f4e8cc'; x.beginPath(); x.arc(X + w * 0.72, Y + h * 0.3, Math.min(w, h) * 0.12, 0, Math.PI * 2); x.fill() }
  } else { R(x, '#ffffff', X + w * 0.15, Y + h * 0.3, w * 0.3, 18); R(x, '#ffffff', X + w * 0.5, Y + h * 0.55, w * 0.25, 14) }
  if (snow) for (let i = 0; i < 18; i++) { const sx = X + ((i * 61 + Math.sin(t + i) * 20) % w + w) % w, sy = Y + (((t * 60 + i * 47) % h) + h) % h; R(x, '#ffffff', sx, sy, 5, 5) }
  x.restore()
  R(x, INK, X + w / 2 - 4, Y, 8, h); R(x, INK, X, Y + h / 2 - 4, w, 8)
}
export function room(x, t, { wall = '#2c2350', wall2 = '#352a60', floor = '#3a2a48', window = true, night = true, snow = false, lamp = true, art = true, warm = 0 } = {}) {
  R(x, wall, 0, 0, 1080, FLOOR)
  for (let i = 0; i < 9; i++) R(x, wall2, i * 130 + 30, 0, 50, FLOOR)
  R(x, floor, 0, FLOOR, 1080, 1920 - FLOOR); R(x, INK, 0, FLOOR - 8, 1080, 12)
  for (let i = 0; i < 6; i++) R(x, 'rgba(0,0,0,0.12)', 0, FLOOR + 60 + i * 110, 1080, 8)
  if (window) skyWindow(x, t, 640, 330, 330, 380, { night, snow })
  if (art) { box(x, 120, 380, 200, 150, '#ffcf8a', { b: 8 }); R(x, '#ff8fb1', 150, 420, 60, 80); R(x, '#7fd0ff', 230, 450, 60, 50) }
  if (lamp) { glowSpot(x, 900, 900, 420, '255,210,150', 0.18 + 0.1 * warm); R(x, INK, 896, 820, 8, FLOOR - 820); box(x, 850, 760, 100, 70, '#ffd98a', { b: 6 }) }
  if (warm > 0) { x.save(); x.globalAlpha = 0.18 * warm; R(x, '#ffb070', 0, 0, 1080, 1920); x.restore() }
}
export function couch(x, cx, cy, { w = 640, col = '#6b4fb0', hi = '#8a6fd0' } = {}) {
  box(x, cx - w / 2, cy - 180, w, 120, col, { b: 8, hi })
  box(x, cx - w / 2 - 40, cy - 120, 80, 200, col, { b: 8, hi })
  box(x, cx + w / 2 - 40, cy - 120, 80, 200, col, { b: 8, hi })
  box(x, cx - w / 2 + 40, cy - 60, w - 80, 120, hi, { b: 8 })
  R(x, INK, cx - w / 2 + 10, cy + 80, 16, 30); R(x, INK, cx + w / 2 - 26, cy + 80, 16, 30)
}
export function table(x, cx, top, { w = 420, h = 200, col = '#8a5a3a', hi = '#a8744c' } = {}) {
  box(x, cx - w / 2, top, w, 34, col, { b: 6, hi })
  R(x, INK, cx - w / 2 + 30, top + 34, 18, h); R(x, INK, cx + w / 2 - 48, top + 34, 18, h)
}
export function cup(x, cx, cy, { col = BONE, label: lb = '', s = 1, steam = true, t = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -40, -60, 80, 110, col, { b: 6 }); box(x, -46, -76, 92, 22, '#ffffff', { b: 5 })
  R(x, '#c98a5a', -40, -20, 80, 26)
  if (lb) { x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lb, 0, 26) }
  if (steam) for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.6; R(x, '#ffffff', -20 + i * 18 + Math.sin(t * 3 + i) * 6, -90 - ph * 70, 8, 16) }
  x.restore()
}
export function cafe(x, t, { warm = 0, night = false } = {}) {
  room(x, t, { wall: '#3a2a3a', wall2: '#432f43', floor: '#4a3428', window: true, night, art: false, lamp: false, warm })
  box(x, 80, 360, 440, 260, '#1f1a1f', { b: 8 })
  x.font = `800 40px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 300, 400)
  x.font = `700 26px ${MONO}`; x.fillStyle = BONE
  ;['OAT · EXTRA HOT', 'SMALL · WARM', 'TEA · HONEY', 'COCOA · FOAM'].forEach((s, i) => x.fillText(s, 300, 450 + i * 40))
  R(x, '#2a6a3a', 560, 760, 60, 120); R(x, '#3a8a4a', 540, 740, 100, 50)
  box(x, 0, 1040, 1080, 70, '#6b4a2f', { b: 6, hi: '#8a6440' })
  glowSpot(x, 540, 300, 600, '255,200,140', 0.12)
}
export function street(x, t, { snow = true, lampX = 780, warm = 0 } = {}) {
  drawSky(x, t, { ...SKY_H, zoom: 1.6, dy: 120, dim: 0.5 })
  const B = [[0, 520, 260, '#241c48'], [240, 640, 220, '#2b2256'], [440, 460, 300, '#211a40'], [720, 600, 360, '#2a2050']]
  for (const [bx0, by, bw, c] of B) {
    R(x, c, bx0, by, bw, FLOOR - by)
    for (let j = by + 50; j < FLOOR - 80; j += 110) for (let i = bx0 + 30; i < bx0 + bw - 40; i += 80) R(x, ((i + j) / 10) % 3 < 1.2 ? '#ffd98a' : '#3a3070', i, j, 40, 54)
  }
  R(x, '#2a2440', 0, FLOOR, 1080, 1920 - FLOOR); R(x, INK, 0, FLOOR - 8, 1080, 12)
  R(x, '#3a3460', 0, FLOOR + 160, 1080, 16)
  R(x, INK, lampX - 6, 640, 12, FLOOR - 640); box(x, lampX - 40, 600, 80, 50, '#ffd98a', { b: 6 })
  glowSpot(x, lampX, 760, 420, '255,220,150', 0.28 + 0.06 * warm)
  if (snow) for (let i = 0; i < 40; i++) { const sx = ((i * 131 + Math.sin(t * 0.8 + i) * 30) % 1080 + 1080) % 1080, sy = (((t * (70 + (i % 5) * 14) + i * 211) % 1500) + 1500) % 1500 + 200; R(x, '#ffffff', sx, sy, 6 + (i % 3) * 2, 6 + (i % 3) * 2) }
}
export function partyRoom(x, t, { warm = 1, lights = true } = {}) {
  room(x, t, { wall: '#3a2456', wall2: '#432a62', floor: '#3a2a48', window: true, night: true, snow: true, art: false, lamp: false, warm: warm * 0.6 })
  if (lights) {
    x.strokeStyle = INK; x.lineWidth = 5; x.beginPath()
    for (let i = 0; i <= 20; i++) { const px = i * 54, py = 300 + 40 * Math.sin(i * 0.8); i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke()
    for (let i = 0; i <= 20; i++) { const px = i * 54, py = 300 + 40 * Math.sin(i * 0.8), on = Math.sin(t * 4 + i * 1.7) > -0.3; R(x, on ? [GOLD, PINK, SKYB, MINT][i % 4] : '#4a3a6a', px - 9, py + 4, 18, 22) }
  }
}
/** a big phone with a chat (msgs: [{ at, me, text }], absolute times); typing: { from, to, text, del } */
export function phone(x, t, cx, cy, { w = 560, h = 900, title = 'CHAT', msgs = [], typing = null, rot = 0, k = 1, size = 32, sent = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#14102c', { b: 10 })
  R(x, '#221b4a', -w / 2, -h / 2, w, 90)
  x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 46)
  // messages stack from the bottom up
  let y = h / 2 - 130
  const shown = msgs.filter(m => t >= m.at).slice(-6).reverse()
  x.font = `700 ${size}px ${INTER}`
  for (const m of shown) {
    const lines = wrap(x, m.text, w * 0.62)
    const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 40, bh = lines.length * size * 1.18 + 26
    const pk = pop01(t, m.at, 0.22, 2.2)
    const bx = m.me ? w / 2 - 24 - bw : -w / 2 + 24
    x.save(); x.translate(bx + bw / 2, y - bh / 2); x.scale(pk, pk)
    R(x, m.me ? (m.col || '#ff8fb1') : '#efe6d6', -bw / 2, -bh / 2, bw, bh)
    x.fillStyle = INK; x.textAlign = 'center'
    lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.18 + 2))
    x.restore()
    y -= bh + 18
    if (y < -h / 2 + 120) break
  }
  // the input bar (typing draft)
  R(x, '#221b4a', -w / 2, h / 2 - 96, w, 96)
  if (typing && t >= typing.from) {
    const full = typing.text
    const n = Math.floor(clamp(prog(t, typing.from, typing.to)) * full.length)
    const d = typing.del ? Math.floor(clamp(prog(t, typing.del[0], typing.del[1])) * full.length) : 0
    const s = full.slice(0, Math.max(0, n - d)) + ((Math.floor(t * 3) % 2) ? '|' : ' ')
    x.font = `700 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(s.length > 34 ? '…' + s.slice(-33) : s, -w / 2 + 26, h / 2 - 48)
  } else { x.font = `700 26px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.4)'; x.textAlign = 'left'; x.fillText('message…', -w / 2 + 26, h / 2 - 48) }
  if (sent !== null) { const sk = pop01(t, sent, 0.2, 3) * outK(t, [sent + 0.8, sent + 1.1]); if (sk > 0.01) tag(x, 'SENT', w / 2 - 90, h / 2 - 150, sk, { bg: MINT, size: 30 }) }
  x.restore()
}
/** split screen: left(x, t), right(x, t) each drawn into its half (clipped, scaled to fit); labels on top */
export function split(x, t, left, right, { labels = null, k = 1, divider = true, vertical = false } = {}) {
  const halves = vertical ? [[0, 0, 1080, 960], [0, 960, 1080, 960]] : [[0, 0, 540, 1920], [540, 0, 540, 1920]]
  ;[left, right].forEach((fn, i) => {
    const [X, Y, w, h] = halves[i]
    x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
    if (vertical) { x.translate(X, Y); x.translate(540, 480); x.scale(0.5, 0.5); x.translate(-540, -960) }
    else { x.translate(X + w / 2 - 540, 0) }
    fn(x, t)
    x.restore()
  })
  if (divider) vertical ? R(x, INK, 0, 954, 1080, 12) : R(x, INK, 534, 0, 12, 1920)
  if (labels) labels.forEach((l, i) => { const [X, Y, w] = halves[i]; tag(x, l, X + w / 2, Y + (vertical ? 70 : 250), k, { bg: i ? PINK : BONE, size: 36, rot: i ? 0.04 : -0.04 }) })
}
export function clock(x, cx, cy, r, mins, { col = BONE } = {}) {
  box(x, cx - r, cy - r, 2 * r, 2 * r, col, { b: 6 })
  const a = (mins / 60) * Math.PI * 2 - Math.PI / 2, ah = (mins / 720) * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineWidth = 8; x.lineCap = 'square'
  x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r * 0.8, cy + Math.sin(a) * r * 0.8); x.stroke()
  x.lineWidth = 10; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ah) * r * 0.5, cy + Math.sin(ah) * r * 0.5); x.stroke()
}
/** a blind mystery card (a real app feature, shown as an object only): face-down with a ? */
export function mysteryCard(x, t, cx, cy, w, { rot = 0, k = 1, text = '?' } = {}) {
  if (k <= 0.01) return
  const h = w * 1.4
  x.save(); x.translate(cx, cy); x.rotate(rot + 0.03 * Math.sin(t * 2)); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#2a1f55', { b: 8 })
  R(x, GOLD, -w / 2 + 14, -h / 2 + 14, w - 28, 6); R(x, GOLD, -w / 2 + 14, h / 2 - 20, w - 28, 6)
  x.font = `italic 500 ${Math.round(w * 0.6)}px ${SERIF}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 6)
  x.restore()
}

// ═════════════════════════════════════════════ DOM pieces
function buildBug(root, main) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, main.replace(/ /g, '&nbsp;'))
  return b
}
function buildSticker(root, { badge, text, deep, badgeCol, at, out, tilt, top = 1500, size = 46 }) {
  const wrapD = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '20px', maxWidth: '960px', padding: '16px 30px 18px 20px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px', boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrapD)
  if (badge != null) el('div', { flex: '0 0 auto', minWidth: '68px', height: '68px', padding: '0 10px', boxSizing: 'border-box', borderRadius: '34px', background: badgeCol, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 ${String(badge).length > 2 ? 26 : 36}px ${INTER}`, color: INK }, st, String(badge))
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${Math.round(size * 1.28)}px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 ${size}px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrapD.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.34), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}

// ═════════════════════════════════════════════ hook-kit effects by short name: [factory, cues]
const FXK = {
  whip: [whipZoom, whipZoomCues], rec: [recordScratch, recordScratchCues], shake: [screenShake, shakeCues], caught: [caught, caughtCues],
  call: [incomingCall, incomingCallCues], notif: [notification, notificationCues], load: [loadingBar, loadingBarCues], count: [countdown, countdownCues],
  news: [newsDesk, newsDeskCues], hud: [gameHud, gameHudCues], ach: [achievement, achievementCues], glitch: [glitch, glitchCues], slam: [slamTitle, slamTitleCues],
}
const shiftFx = (o, d) => { const q = { ...o, at: r3(o.at + d) }; if (o.out) q.out = o.out.map(v => r3(v + d)); for (const k of ['answerAt', 'declineAt', 'start']) if (o[k] != null) q[k] = r3(o[k] + d); if (o.splits) q.splits = o.splits.map(z => ({ ...z, at: r3(z.at + d) })); return q }

// ═════════════════════════════════════════════ the episode
export const LOOP = 0.4
export function makeEp(cfg) {
  const HOOK = cfg.hook.len ?? 3.6
  const CH = []
  let acc = HOOK
  for (const c of cfg.chapters) { CH.push({ ...c, a: r3(acc), b: r3(acc + c.dur) }); acc += c.dur }
  const DURATION = r3(acc)
  const lastC = CH[CH.length - 1]
  const LAST_AT = r3(lastC.a + cfg.last.at)
  const isLoop = cfg.ending === 'loop'
  const T = { HOOK, CH, DURATION, LAST_AT, loopFrom: r3(DURATION - LOOP) }
  const chapAt = t => { for (let i = CH.length - 1; i >= 0; i--) if (t >= CH[i].a) return i; return -1 }
  const api = { star, pisces, T }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 46px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const promise = buildSticker(root, { badge: '!', text: cfg.promise, deep: cfg.deep || RED, badgeCol: GOLD, at: cfg.promiseAt ?? 2.55, out: [HOOK + 2.6, HOOK + 2.9], tilt: 2.4, top: 1520, size: 44 })
    const caps = CH.map((c, i) => c.caption ? buildSticker(root, { badge: i + 1, text: c.caption, deep: cfg.deep || RED, badgeCol: i % 2 ? PINK : (cfg.accent || GOLD),
      at: c.a + (c.captionAt ?? 0.5), out: [c.b - 0.2, c.b + (i === CH.length - 1 ? 1 : 0)], tilt: [-1.6, 1.4, -1.2, 1.8][i % 4], top: c.capTop ?? cfg.capTop ?? 1560, size: c.capSize ?? 44 }) : null)
    const top = layerCanvas(root), tx = top.getContext('2d')
    buildBug(root, cfg.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const FX = cfg.fx ? cfg.fx(root, { ...api, x, tx }) : null

    const hookS = t => ({ ...api, u: t, t0: 0, t1: HOOK, at: v => v, hops: (...us) => us, w: (a0, b0, fi, fo) => win(t, a0, b0, fi, fo) })
    function drawChapterBar(cx, t) {
      // chapter progress pips under the bug: N segments, the current one filling
      const X0 = 56, X1 = 1024, GAP = 8, n = CH.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120
      CH.forEach((c, i) => {
        const sx = X0 + i * (w + GAP)
        R(cx, 'rgba(239,230,214,0.22)', sx, Y, w, 8)
        const f = prog(t, c.a, c.b)
        if (f > 0) R(cx, i === n - 1 ? (cfg.accent || GOLD) : BONE, sx, Y, w * f, 8)
      })
    }
    function stampChip(cx, t, i) {
      const c = CH[i]
      if (!c.stamp) return
      const k = pop01(t, c.a + 0.2, 0.25, 2.2) * outK(t, [c.b - 0.2, c.b])
      if (k <= 0.01) return
      cx.save(); cx.translate(900, 196); cx.scale(k, k)
      box(cx, -120, -30, 240, 60, '#14102c', { b: 5 })
      cx.font = `700 30px ${MONO}`; cx.fillStyle = BONE; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText(c.stamp, 0, 2)
      cx.restore()
    }

    const CAM = cfg.cam || { s: 1.18, cx: 540, cy: 1000, dy: 110 }
    const camOn = cx => { cx.translate(CAM.cx, CAM.cy + CAM.dy); cx.scale(CAM.s, CAM.s); cx.translate(-CAM.cx, -CAM.cy) }
    function frame(t) {
      const i = chapAt(t)
      x.save()
      if (i < 0) { x.save(); if (!cfg.hook.noCam) camOn(x); cfg.hook.draw(x, t, hookS(t)); x.restore(); drawChapterBar(x, t) }
      else {
        const c = CH[i], u = t - c.a
        // camera: a punch-in on every chapter start, then a slow push (nothing is static)
        const punch = 1 + 0.06 * (1 - ease.outCubic(clamp(u / 0.35))) + 0.03 * prog(t, c.a, c.b)
        const fx = c.focus ?? [540, 960]
        x.translate(fx[0], fx[1]); x.scale(punch, punch); x.translate(-fx[0], -fx[1])
        if (!c.noCam) camOn(x)
        const S = { ...api, u, t0: c.a, t1: c.b, i, at: v => c.a + v, hops: (...us) => us.map(v => c.a + v), w: (a0, b0, fi, fo) => win(t, c.a + a0, c.a + b0, fi, fo) }
        c.draw(x, t, S)
        const M = x.getTransform()
        x.restore(); x.save()
        // speech bubbles in screen space (anchored through the camera, clamped inside the frame, never cropped)
        for (const bb of (c.bubbles || [])) { const P = M.transformPoint(new DOMPoint(bb.x, bb.y)); bubble(x, t, P.x, P.y, c.a + bb.at, c.a + (bb.end ?? bb.at + 2.6), bb.text, { ...bb, fit: true, size: bb.size ? bb.size + 4 : 44 }) }
        drawChapterBar(x, t)
        stampChip(x, t, i)
      }
      x.restore()
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, 1080, 1920)
        frame(t)
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.overlay) cfg.overlay(tx, t, { ...api, i: chapAt(t) })
        promise.update(t)
        caps.forEach(s => s && s.update(t))
        if (FX) FX.update(t)
        // chapter jump-cut flashes
        const fl = Math.max(0, ...CH.map(c => (t >= c.a && t < c.a + 0.1) ? 1 - (t - c.a) / 0.1 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // ── sound: auto cues per chapter (jump cut, chapter sticker, caption, bubbles) + the film's own
  const CUES = [
    ...(cfg.hook.cues || []),
    ['pop', r3(cfg.promiseAt ?? 2.55), 1174.66, 0.04, 0.2], ['tick', r3((cfg.promiseAt ?? 2.55) + 0.02), 0.04],
    ...CH.flatMap((c, i) => [
      ['whoosh', r3(c.a - 0.1), 0.28, 0.035], ['tick', c.a, 0.05],
      ['pop', r3(c.a + 0.08), 880, 0.04, -0.2], ['pop', r3(c.a + 0.16), 1318.51, 0.035, 0.2],
      ...(c.caption ? [['pop', r3(c.a + (c.captionAt ?? 0.5)), 1174.66, 0.04, 0.1], ['tick', r3(c.a + (c.captionAt ?? 0.5) + 0.02), 0.035]] : []),
      ...(c.bubbles || []).map((bb, j) => ['pop', r3(c.a + bb.at), [784, 880, 987.77, 1046.5][j % 4], 0.035, (bb.x - 540) / 600]),
      ...(c.cues || []).map(q => [q[0], r3(q[1] + c.a), ...q.slice(2)]),
    ]),
    ['glitter', r3(LAST_AT + 0.4), r3(LAST_AT + 0.9)],
    ...(cfg.cues || []),
  ]
  // the hook-kit layers: slam title (frame 0), the film's fx (hook + per chapter), chapter stickers, the last line, the loop
  const HOOKT = { at: -1, text: cfg.hook.text, top: cfg.hook.top ?? 250, size: cfg.hook.size ?? 112, out: [HOOK - 0.3, HOOK - 0.1] }
  const LASTT = { at: LAST_AT, text: cfg.last.text, top: cfg.last.top ?? 300, size: cfg.last.size ?? 104, gap: 0.12, out: cfg.last.out ?? null }
  const FXL = [
    ...(cfg.hook.fx || []).map(([k, o]) => [k, o]),
    ...CH.flatMap(c => (c.fx || []).map(([k, o]) => [k, shiftFx(o, c.a)])),
  ]
  const CHAPS = CH.map((c, i) => ({ at: r3(c.a + 0.05), out: [r3(Math.min(c.b - 0.1, c.a + 2.5)), r3(Math.min(c.b, c.a + 2.7))], n: i + 1, title: c.name, color: i % 2 ? PINK : GOLD }))
  const RECS = FXL.filter(([k]) => k === 'rec').map(([, o]) => o)
  const MAIN = RECS.length ? frozen(build, RECS) : build
  const WHIP0 = FXL.filter(([k, o]) => k === 'whip' && o.at <= 0).map(([, o]) => o)
  const SCENES = [MAIN, ...FXL.map(([k, o]) => FXK[k][0](o)), ...CHAPS.map(o => chapter(o)), slamTitle(HOOKT), slamTitle(LASTT),
    ...(isLoop ? [loopBack([MAIN, ...WHIP0.map(o => whipZoom(o)), slamTitle(HOOKT)], { duration: DURATION, len: LOOP })] : [])]
  CUES.push(...slamTitleCues(HOOKT), ...slamTitleCues(LASTT), ...FXL.flatMap(([k, o]) => FXK[k][1](o)), ...CHAPS.flatMap(o => chapterCues(o)), ...(isLoop ? loopCues({ duration: DURATION, len: LOOP }) : []))
  const MUSIC = { style: cfg.music.style, key: cfg.music.key, seed: cfg.music.seed, sections: { drop: r3(HOOK), breakdown: cfg.music.breakdown || [], lift: cfg.music.lift || [], outroAt: r3(isLoop ? DURATION - 0.5 : LAST_AT) }, hits: cfg.hits || [] }
  return { DURATION, SCENES, CUES, MUSIC, T, CH }
}
