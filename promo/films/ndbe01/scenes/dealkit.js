// DEALBREAKER OR NOT?: the shared look of the 24 star_advice trial reels ndbe01–ndbe24 (promo/films/next30/b41.md).
// This file lives in ndbe01 and every other episode imports it from here (read-only for them).
//
// The format (15 s, story 0–10.6, then the shared end card):
//   0.00–3.90   THE SITUATION. Frame 0 is the thumbnail: the bug, the situation headline already landed at the top, and
//               the sign mid-action with its prop. cfg.scene(x, t, S) draws it (S.u = t).
//   3.90        the one card cut (flip).
//   3.90–6.10   THE VOTE. "Dealbreaker… | or *not?*", a red DEALBREAKER button and a green NOT button, a needle swinging
//               between them over a ticking clock, the sign thinking, Pisces chewing a tissue.
//   6.10        THE STARS' stamp slams the verdict on the frame ("NOT A | DEALBREAKER." green / "DEALBREAKER." red).
//               A dealbreaker adds the chip "ADDED TO MY DEALBREAKERS".
//   6.55–10.2   THE STARS say the last line (cfg.last) while cfg.finale(x, t, S) plays (S.u = t - T.stamp). Pisces cries:
//               happy tears on a NOT, proud tears on a DEALBREAKER.
//
//   makeDeal(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.sign, cfg.date (a sign id, or 'grey' for the date whose behaviour is the dealbreaker)
//     cfg.hook: the situation headline ('They turn every walk | into a *race.*'), cfg.accent: its accent colour
//     cfg.verdict: 'not' | 'deal', cfg.last: THE STARS' last line (≤ 50 characters)
//     cfg.scene(x, t, S), cfg.finale(x, t, S), cfg.sceneCues / cfg.finaleCues: [[name, u, ...]] (times relative)
//     cfg.castHasPisces: the date is Pisces (no second Pisces in the vote / finale)
//     cfg.heroIsPisces: the sign is Pisces (no second Pisces in the vote / finale; the sign cries instead)
//     cfg.pis: Pisces' spot in the situation ({ x, y, s, look, hide }), cfg.voteMood: the sign's mood in the vote
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', GREEN = '#3fcf7a', SKYB = '#7fd0ff'
export const GREY = '#a29cba'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ff9a6b'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in all 24 films)
export const DURATION = 15
export const STORY_END = DURATION - ENDCARD_LEN          // 10.6
export const T = {
  bug: -1, h0: -1.2, h0Out: [3.72, 3.9],
  vote: 3.9, h1: 4.0, h1Out: [5.95, 6.08], btnIn: 4.15, needle: [4.35, 6.0],
  stampDrop: [5.8, 6.08], stamp: 6.1, chip: 6.95,
  starsIn: 6.3, pisIn: 6.35, last: 6.55, boxClose: 10.15,
  out: [10.15, 10.55], bugOut: [10.25, 10.55],
}
const CPS = 30

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
export const NOTE_BM = ['..NNN', '..N.N', '..N..', 'NNN..', 'NNN..']
/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
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
/** music notes floating up from (cx, cy), looping while t in [t0, t1] */
export function notes(x, t, t0, t1, cx, cy, { n = 4, cell = 6, cols = [GOLD, PINK, SKYB], spread = 140 } = {}) {
  if (t < t0 || t > t1 + 1.2) return
  for (let i = 0; i < n; i++) {
    const ph = ((t - t0) * 0.8 + i / n) % 1
    const born = t - ph / 0.8
    if (born < t0 || born > t1) continue
    drawBits(x, NOTE_BM, { N: cols[i % cols.length] }, cx + Math.sin(i * 2.1 + ph * 4) * spread * 0.5, cy - ph * 240, cell, { alpha: 1 - ease.inQuad(ph), rot: 0.2 * Math.sin(ph * 6 + i) })
  }
}
/** pixel confetti falling from a burst at t0 */
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, '#9fe6b0', BONE] } = {}) {
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
/** gentle pixel snowfall over the whole frame (or a band) */
export function snowfall(x, t, { n = 46, top = 300, bottom = 1400, a = 0.8 } = {}) {
  x.save(); x.globalAlpha = a
  for (let i = 0; i < n; i++) {
    const sp = 60 + (i * 37) % 70, ph = ((t * sp + i * 173) % (bottom - top))
    const sx = ((i * 211) % 1080) + 22 * Math.sin(t * 1.3 + i)
    const s = 5 + (i % 3) * 3
    R(x, i % 4 ? '#f4f0ff' : '#cfe8ff', sx, top + ph, s, s)
  }
  x.restore()
}
/** a pixel speech bubble (canvas), popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, down = true } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 - 2 || t > t1) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  if (down) { x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9) }
  else { x.fillStyle = INK; x.fillRect(tx - 14, -h / 2 - 16, 14, 12); x.fillRect(tx - 7, -h / 2 - 22, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, -h / 2 - 9, 9, 9) }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
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
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a warm glow pool */
export function glow(x, cx, cy, r, a, col = '255,214,150') {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
}
/** a snowy ground band from y down to 1420 */
export function snowGround(x, y = 1150) {
  R(x, INK, 0, y - 6, 1080, 8); R(x, '#e9ecff', 0, y, 1080, 1420 - y); R(x, '#c9cdf0', 0, y + 40, 1080, 1420 - y - 40)
  for (let i = 0; i < 12; i++) R(x, '#ffffff', (i * 97) % 1080, y + 10 + (i * 23) % 26, 40, 8)
}
/** an indoor floor band (warm boards) from y down to 1420 */
export function floor(x, y = 1150, col = '#3a2a4f') {
  R(x, INK, 0, y - 6, 1080, 8); R(x, col, 0, y, 1080, 1420 - y)
  for (let j = 0; j < 4; j++) R(x, 'rgba(6,4,18,0.35)', 0, y + 40 + j * 62, 1080, 5)
}
/** a little café / dinner table: top centred at (cx, y) */
export function table(x, cx, y, w = 520, { cloth = '#d8546a', top = '#8a5a3c' } = {}) {
  box(x, cx - w / 2, y, w, 26, top, { b: 6, hi: '#a87452' })
  if (cloth) { R(x, INK, cx - w / 2 + 34, y + 26, w - 68, 74); R(x, cloth, cx - w / 2 + 40, y + 26, w - 80, 68); for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.18)', cx - w / 2 + 52 + i * (w - 104) / 6, y + 32, 18, 56) }
  R(x, INK, cx - 18, y + 26, 36, 1150 - y - 26); R(x, '#5a3a28', cx - 12, y + 26, 24, 1150 - y - 26)
  box(x, cx - 90, 1138, 180, 14, '#5a3a28', { b: 5 })
}
/** a candle on a saucer at (cx, y); lit 0…1 */
export function candle(x, t, cx, y, lit = 1) {
  box(x, cx - 26, y - 6, 52, 10, BONE, { b: 4 })
  box(x, cx - 10, y - 66, 20, 60, '#fff1c8', { b: 4 })
  if (lit > 0.02) {
    glow(x, cx, y - 82, 120 * lit, 0.28 * lit)
    const fl = 1 + 0.12 * Math.sin(t * 23) + 0.06 * Math.sin(t * 37)
    x.save(); x.globalAlpha = lit; drawBits(x, ['.Y.', 'YOY', 'YOY', '.Y.'], { Y: '#ffd23a', O: '#ff8a3a' }, cx, y - 84, 6 * fl, { outline: null }); x.restore()
  } else { x.save(); x.globalAlpha = 0.5; R(x, '#cfc8e8', cx - 3, y - 96 - 20 * Math.sin(t * 2), 6, 18); x.restore() }
}
/** a comfy couch, seat top at y */
export function couch(x, cx, y, w = 640, col = '#6a4fb0') {
  box(x, cx - w / 2, y - 150, w, 130, col, { b: 7, hi: 'rgba(255,255,255,0.18)' })
  box(x, cx - w / 2 - 40, y - 90, 70, 150, col, { b: 7 }); box(x, cx + w / 2 - 30, y - 90, 70, 150, col, { b: 7 })
  box(x, cx - w / 2 + 30, y - 20, w - 60, 80, col, { b: 7, hi: 'rgba(255,255,255,0.12)' })
  R(x, INK, cx - w / 2 - 20, y + 60, 20, 30); R(x, INK, cx + w / 2, y + 60, 20, 30)
}
/** a phone at (cx, cy), rot; draws a screen fill and calls fn(x) in screen space (0,0 at top-left of 200×340) */
export function phoneProp(x, cx, cy, s = 1, rot = 0, fn = null, { col = '#2a2148' } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -112, -190, 224, 380, col, { b: 7 })
  R(x, '#14102a', -100, -170, 200, 340)
  if (fn) { x.save(); x.translate(-100, -170); x.beginPath(); x.rect(0, 0, 200, 340); x.clip(); fn(x); x.restore() }
  R(x, '#3a3060', -24, 174, 48, 6)
  x.restore()
}
/** a wall clock at (cx, cy), r: shows hh:mm as hands */
export function clockFace(x, cx, cy, r, h, m) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, cx + Math.sin(a) * r * 0.8 - 3, cy - Math.cos(a) * r * 0.8 - 3, 6, 6) }
  const hand = (a, L, w) => { x.save(); x.translate(cx, cy); x.rotate(a); R(x, INK, -w / 2, -L, w, L); x.restore() }
  hand(((h % 12) + m / 60) / 12 * Math.PI * 2, r * 0.5, 9); hand(m / 60 * Math.PI * 2, r * 0.78, 6)
  R(x, RED, cx - 5, cy - 5, 10, 10); x.restore()
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
/** a pixel scarf around the sprite's middle (sprite cells) */
export function scarfCells(ctx, t, col = RED, col2 = BONE, fly = 0) {
  for (let i = 0; i < 18; i++) { ctx.fillStyle = INK; ctx.fillRect(9 + i - 0.2, 25.3, 1.4, 3.4); ctx.fillStyle = (i >> 1) % 2 ? col : col2; ctx.fillRect(9 + i, 25.5, 1, 3) }
  for (let j = 0; j < 7; j++) { const wv = fly * (j * 1.2) + Math.sin(t * 9 + j) * fly * 0.8; ctx.fillStyle = INK; ctx.fillRect(10 - wv - 0.2, 28 + j * 0.9 - 0.2, 3.4, 1.3); ctx.fillStyle = j % 2 ? col : col2; ctx.fillRect(10 - wv, 28 + j * 0.9, 3, 1) }
}

/** a tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ── the series bug: "DEALBREAKER OR NOT?" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,154,107,0.7)` }, b)
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'DEALBREAKER<span style="color:rgba(255,255,255,0.7)">&nbsp;OR&nbsp;NOT?</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(clamp(out)) } }
}

// ── the verdict imprint (DOM): two lines, tilted, double border
function buildStamp(root, verdict) {
  const ink = verdict === 'deal' ? '#ff3b55' : '#38e07f'
  const wrap = el('div', { position: 'absolute', left: '0', top: '170px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const html = verdict === 'deal'
    ? `<span style="font:italic 500 168px ${SERIF};letter-spacing:0">Deal</span>BREAKER.`
    : `NOT A<br><span style="font:italic 500 150px ${SERIF};letter-spacing:0">deal</span>BREAKER.`
  const st = el('div', { padding: '18px 44px 26px', border: `12px solid ${ink}`, outline: `5px solid ${ink}`, outlineOffset: '10px', borderRadius: '10px', transform: 'rotate(-5deg)', transformOrigin: '50% 50%', textAlign: 'center',
    font: `800 ${verdict === 'deal' ? 120 : 110}px ${INTER}`, letterSpacing: '-0.02em', color: ink, lineHeight: '0.98', whiteSpace: 'nowrap', background: 'rgba(6,4,18,0.35)', textShadow: '0 4px 18px rgba(6,4,18,0.6)' }, wrap, html)
  wrap.style.display = 'flex'
  const fitK = Math.min(1, 940 / Math.max(1, st.offsetWidth || 1))
  wrap.style.display = 'none'
  return {
    update(t) {
      const on = t >= T.stamp - 0.02 && t < T.out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, T.stamp - 0.02, T.stamp + 0.06), o = popOut(t, T.out)
      const sc = lerp(1.3, 1, ease.outCubic(p)) * (1 + 0.03 * Math.exp(-(t - T.stamp) * 8) * Math.sin((t - T.stamp) * 40))
      st.style.opacity = String(clamp(p * 2) * clamp(o))
      st.style.transform = `rotate(-5deg) scale(${(sc * fitK * Math.max(0.01, o)).toFixed(4)})`
    },
  }
}
// the dealbreaker chip (a real app feature): "ADDED TO MY DEALBREAKERS"
function buildChip(root) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '445px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const c = el('div', { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 28px', background: BONE, border: `5px solid ${INK}`, borderRadius: '40px', boxShadow: '8px 8px 0 rgba(6,4,18,0.7)', font: `800 32px ${INTER}`, letterSpacing: '0.06em', color: INK, whiteSpace: 'nowrap' }, wrap,
    `<span style="display:inline-grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#ff3b55;color:#fff;font:800 26px ${INTER}">✓</span>ADDED TO MY DEALBREAKERS`)
  return {
    update(t) {
      const on = t >= T.chip && t < T.out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, T.chip, T.chip + 0.34), 2.4), o = outK(t, T.out)
      c.style.opacity = String(clamp(prog(t, T.chip, T.chip + 0.1)) * o)
      c.style.transform = `scale(${(lerp(0.4, 1, k) * o).toFixed(4)}) rotate(2deg)`
    },
  }
}

// the rubber stamp itself (canvas)
function drawStampTool(x, t, ink) {
  const [a] = T.stampDrop, b = T.stamp
  if (t < a || t > b + 0.6) return
  let y, rot = -0.1
  if (t < b) { const p = ease.inCubic(prog(t, a, b)); y = lerp(-420, 300, p); rot = lerp(-0.35, -0.1, p) }
  else { const q = ease.inOutCubic(prog(t, b + 0.1, b + 0.6)); y = lerp(300, -460, q); rot = lerp(-0.1, 0.25, q) }
  const sq = t >= b && t < b + 0.1 ? 0.12 * Math.sin(Math.PI * (t - b) / 0.1) : 0
  x.save(); x.translate(540, y); x.rotate(rot); x.scale(1 + sq, 1 - sq)
  box(x, -330, -40, 660, 110, '#6b4a2f', { b: 8, hi: '#8a6440' })
  R(x, ink, -330, 70, 660, 20)
  box(x, -50, -170, 100, 130, '#7b5634', { b: 8, hi: '#98704a' })
  box(x, -110, -260, 220, 100, ink, { b: 8, hi: 'rgba(255,255,255,0.3)' })
  x.restore()
}

// ── the vote: two buttons and a needle that swings between them, faster and faster, then settles
const BTN = { y: 930, w: 430, h: 170, L: 290, Rr: 790 }
function needleAngle(t, verdict) {
  const [a, b] = T.needle
  if (t < a) return 0
  const fin = verdict === 'deal' ? -0.62 : 0.62
  if (t >= b) return fin + 0.05 * Math.exp(-(t - b) * 6) * Math.sin((t - b) * 30)
  const p = prog(t, a, b)
  // a swing that speeds up (phase ~ p²), with amplitude shrinking into the final side over the last 25 %
  const sw = 0.7 * Math.sin(Math.PI * 2 * (1.2 * p + 2.2 * p * p))
  const s = ease.inOutCubic(prog(p, 0.75, 1))
  return lerp(sw, fin, s)
}
function drawVote(x, t, verdict) {
  const k = pop01(t, T.btnIn, 0.34, 2.2)
  if (k <= 0.01 || t > T.stamp + 0.5) return
  const settled = t > T.stamp
  const chosenL = verdict === 'deal'
  const btn = (cx, col, hi, txt, i) => {
    const isChosen = (i === 0) === chosenL
    let s = k * (settled ? (isChosen ? 1 + 0.12 * Math.exp(-(t - T.stamp) * 5) : 1 - ease.inCubic(prog(t, T.stamp, T.stamp + 0.35))) : 1)
    const dy = settled && !isChosen ? 300 * ease.inCubic(prog(t, T.stamp, T.stamp + 0.4)) : 0
    const alpha = settled ? (isChosen ? outK(t, [T.stamp + 0.04, T.stamp + 0.22]) : 1) : 1
    if (s <= 0.01 || alpha <= 0.01) return
    const ang = needleAngle(t, verdict), lit = (i === 0 ? ang < -0.25 : ang > 0.25) ? 1 : 0
    x.save(); x.globalAlpha *= alpha; x.translate(cx, BTN.y + dy); x.scale(s, s); x.rotate(settled && !isChosen ? 0.4 * prog(t, T.stamp, T.stamp + 0.4) * (i ? 1 : -1) : 0)
    R(x, 'rgba(6,4,18,0.6)', -BTN.w / 2 + 14, -BTN.h / 2 + 18, BTN.w, BTN.h)
    box(x, -BTN.w / 2, -BTN.h / 2, BTN.w, BTN.h, col, { b: 8, hi, lo: 'rgba(6,4,18,0.3)' })
    if (lit) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(-BTN.w / 2, -BTN.h / 2, BTN.w, BTN.h); x.restore() }
    x.font = `800 ${i === 0 ? 50 : 76}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillText(txt, 3, 8); x.fillStyle = '#fff'; x.fillText(txt, 0, 4)
    x.restore()
  }
  btn(BTN.L, '#d8283f', '#ff6177', 'DEALBREAKER', 0)
  btn(BTN.Rr, '#22a85a', '#5fe397', 'NOT', 1)
  // the needle on a pivot above, swinging
  const nk = pop01(t, T.btnIn + 0.12, 0.3, 2) * (settled ? outK(t, [T.stamp + 0.05, T.stamp + 0.3]) : 1)
  if (nk > 0.01) {
    const ang = needleAngle(t, verdict)
    x.save(); x.translate(540, 780); x.scale(nk, nk)
    // an arc gauge
    x.lineWidth = 16; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 210, Math.PI * 1.15, Math.PI * 1.85); x.stroke()
    x.lineWidth = 8
    x.strokeStyle = '#ff6177'; x.beginPath(); x.arc(0, 0, 210, Math.PI * 1.15, Math.PI * 1.47); x.stroke()
    x.strokeStyle = '#5fe397'; x.beginPath(); x.arc(0, 0, 210, Math.PI * 1.53, Math.PI * 1.85); x.stroke()
    x.rotate(ang)
    R(x, INK, -11, -230, 22, 230); R(x, GOLD, -5, -224, 10, 218)
    drawBits(x, ['.G.', 'GGG', 'GGG'], { G: GOLD }, 0, -236, 9)
    x.restore()
    x.save(); x.translate(540, 780); x.scale(nk, nk); box(x, -26, -26, 52, 52, BONE, { b: 6 }); x.restore()
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeDeal(cfg) {
  const HERO = signStar(cfg.sign), PIS = signStar('pisces')
  const DATE = cfg.date === 'grey' ? { color: GREY, glyph: null } : signStar(cfg.date || 'libra')
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const deal = cfg.verdict === 'deal'
  const INKV = deal ? '#ff3b55' : '#38e07f'

  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const date = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: DATE.color, glyph: o.s >= 150 ? DATE.glyph : null, seed: 7, glow: cfg.date === 'grey' ? 0.4 : 1, ...o })
  const heroF = (t, o) => starFrame(o.x, o.y, o.s, t, { seed: 3, ...o })
  const dateF = (t, o) => starFrame(o.x, o.y, o.s, t, { seed: 7, ...o })

  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 30px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hook, { top: 150, size: 92, accentSize: 128, at: T.h0, gap: 0.06, accentColor: cfg.accent || HERO.color, fit: true })
    const H1 = popText(root, 'Dealbreaker… | or *not?*', { top: 160, size: 104, accentSize: 150, at: T.h1, gap: 0.12, accentColor: GOLD, wobble: true })
    const stamp = buildStamp(root, cfg.verdict)
    const chip = deal ? buildChip(root) : null
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function scene(t) {
      if (t >= T.vote) return
      const S = { u: t, hero, date, heroF, dateF, HERO, DATE, pisces, out: outK(t, [T.vote - 0.12, T.vote]) }
      cfg.scene(x, t, S)
      // Pisces in the background with tissues, sniffling (the running gag)
      const P = { x: 950, y: 1320, s: 140, look: [-1, -0.6], ...(cfg.pis || {}) }
      if (!P.hide) {
        const pk = pop01(t, 0.9, 0.3, 2) * outK(t, [T.vote - 0.15, T.vote])
        if (pk > 0.01) {
          if (!P.noTissues) tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
          pisces(x, t, { ...P, pop: pk }, t > 2.2 ? 2 : 1, P.mood || 'wide', P.look)
        }
      }
    }

    function vote(t) {
      if (t < T.vote || t > T.stamp + 0.5) return
      // the sign, small, thinking (looking up at the needle)
      const hk = pop01(t, T.vote + 0.1, 0.36, 2.1) * outK(t, [T.stamp, T.stamp + 0.3])
      if (hk > 0.01) {
        shadow(x, 540, 1330, 200 * hk)
        hero(x, t, { x: 540, y: 1160, s: 240, pop: hk, mood: cfg.voteMood || 'squint', look: [Math.sin((t - T.vote) * 4) > 0 ? 0.8 : -0.8, -1], hops: [T.vote + 0.4, T.needle[1] - 0.2] })
        if (cfg.heroIsPisces) inSprite(x, heroF(t, { x: 540, y: 1160, s: 240, pop: hk, hops: [T.vote + 0.4, T.needle[1] - 0.2] }), () => tearsCells(x, t, 2))
        // a thought cloud "…"
        const ck = pop01(t, T.vote + 0.5, 0.3, 2) * hk
        if (ck > 0.01) drawBits(x, ['.BBBBBBB.', 'BBBBBBBBB', 'BBDBDBDBB', 'BBBBBBBBB', '.BBBBBBB.', '..BB.....', '.B.......'], { B: BONE, D: INK }, 700, 1050, 8 * ck)
      }
      drawVote(x, t, cfg.verdict)
      // Pisces chewing a tissue
      const pk = (cfg.heroIsPisces || cfg.castHasPisces) ? 0 : pop01(t, T.vote + 0.25, 0.3, 2) * outK(t, [T.stamp, T.stamp + 0.3])
      if (pk > 0.01) {
        tissues(x, 800, 1320, 70 * Math.min(1, pk))
        const F = pisces(x, t, { x: 920, y: 1240, s: 150, pop: pk, hops: [T.vote + 0.6, T.vote + 1.2, T.vote + 1.6, T.vote + 1.9] }, 2, 'wide', [-1, -1])
        inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(13.6, 25.6 + Math.abs(Math.sin(t * 14)) * 0.8, 8.8, 4.4); x.fillStyle = '#ffffff'; x.fillRect(14, 26 + Math.abs(Math.sin(t * 14)) * 0.8, 8, 3.6) })
      }
      // a ticking clock top-right of the gauge
      const ck = pop01(t, T.btnIn + 0.2, 0.3, 2) * outK(t, [T.stamp - 0.1, T.stamp + 0.1])
      if (ck > 0.01) {
        const remain = Math.max(0, Math.ceil((T.needle[1] - t) / 0.55))
        x.save(); x.translate(150, 640); x.scale(ck, ck)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI * 2); x.fill()
        x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill()
        x.fillStyle = RED; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 58, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * prog(t, T.needle[0], T.needle[1])); x.closePath(); x.fill()
        x.font = `800 56px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(String(remain || '!'), 0, 4)
        x.restore()
      }
    }

    function finale(t) {
      if (t < T.stamp || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const S = { u: t - T.stamp, ok, hero, date, heroF, dateF, HERO, DATE, pisces, k: pop01(t, T.stamp + 0.25, 0.4, 2.1) * ok }
      cfg.finale(x, t, S)
      // THE STARS
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) drawStarChar(x, 160, 1280, 150, t, { color: STAR.sky, mood: t > T.last + 1.6 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
      // Pisces: happy tears on a NOT, proud tears on a DEALBREAKER (holding up a little sign)
      const pk = (cfg.heroIsPisces || cfg.castHasPisces) ? 0 : pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01) {
        const F = pisces(x, t, { x: 925, y: 1280, s: 150, pop: pk, hops: [T.pisIn + 0.3, T.last + 0.9, T.last + 1.6] }, t > T.last + 0.6 ? 3 : 2, deal ? 'wide' : 'sparkle', [-1, -1])
        const ck = pop01(t, T.last + 0.6, 0.3, 2.6) * ok
        if (ck > 0.01) {
          x.save(); x.translate(925, F.cy - 150 - 8 * Math.sin(t * 5)); x.rotate(0.08 * Math.sin(t * 4)); x.scale(ck, ck)
          box(x, -92, -44, 184, 88, BONE, { b: 6 }); R(x, INK, -6, 44, 12, 60)
          x.font = `800 ${deal ? 34 : 40}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = deal ? '#d8283f' : '#22a85a'; x.fillText(deal ? 'PROUD!!' : 'CUTE!!', 0, 4)
          x.restore()
        }
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 2.5))
        const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
        drawSky(x, t, base)
        const dS = t - T.stamp, shake = dS > 0 && dS < 0.45 ? 18 * Math.exp(-dS * 9) * Math.sin(dS * 60) : 0
        x.save(); x.translate(0, shake)
        scene(t)
        // the vote: a zoom punch in on the swap
        if (t >= T.vote && t < T.stamp + 0.5) {
          const punch = 1 + 0.06 * (1 - ease.outCubic(prog(t, T.vote, T.vote + 0.3)))
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900); vote(t); x.restore()
        }
        finale(t)
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        tx.save(); tx.translate(0, shake); drawStampTool(tx, t, INKV); tx.restore()
        sparkles(tx, t, 540, 320, T.stamp + 0.02, 14, 430, 1, deal ? ['#ff3b55', BONE, GOLD] : ['#38e07f', BONE, GOLD])
        H0.update(t, outK(t, T.h0Out))
        H1.update(t, outK(t, T.h1Out))
        stamp.update(t)
        if (chip) chip.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = t >= T.stamp && t < T.stamp + 0.1 ? 0.6 * (1 - (t - T.stamp) / 0.1) : 0
        flash.style.opacity = String(0.55 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.vote, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  // the needle ticks: one per swing reversal, faster and faster
  const ticks = []
  { let prev = 0; for (let tt = T.needle[0]; tt < T.needle[1]; tt += 0.02) { const a = needleAngle(tt, cfg.verdict), d = a - needleAngle(tt - 0.02, cfg.verdict); if (prev && Math.sign(d) !== Math.sign(prev) && tt - (ticks.length ? ticks[ticks.length - 1] : 0) > 0.12) ticks.push(r3(tt)); prev = d } }
  const CUES = [
    ['pop', 0.02, 1174.66, 0.035, 0], ['glitter', 0.02, 0.3],
    ...(cfg.sceneCues || []).map(c => [c[0], r3(c[1]), ...c.slice(2)]),
    // the vote
    ['whoosh', r3(T.vote - 0.08), 0.3, 0.035], ...wordPops(T.h1, 3, 0.12, 2),
    ['pop', T.btnIn, 659.25, 0.045, -0.4], ['pop', r3(T.btnIn + 0.1), 987.77, 0.045, 0.4],
    ...ticks.map((tt, i) => ['tick', tt, 0.05 + 0.002 * i]),
    ['riser', T.needle[0], T.needle[1], 0.02],
    ['pluck', r3(T.vote + 0.7), 2349.32, 0.012, 0.3, 0.6],
    // the stamp
    ['whoosh', T.stampDrop[0], 0.3, 0.04], ['boom', T.stamp, 0.32], ['tom', T.stamp, deal ? 74 : 98, { gain: 0.3, decay: 0.3 }], ['tick', T.stamp, 0.08],
    ['bell', r3(T.stamp + 0.08), deal ? 1318.51 : 1760, 0.03, 1.2, 0], ['glitter', r3(T.stamp + 0.05), r3(T.stamp + 0.55)],
    ['pop', r3(T.starsIn + 0.05), 739.99, 0.035, -0.4], ['pop', r3(T.pisIn + 0.05), 987.77, 0.03, 0.4],
    ['pop', r3(T.last + 0.6), 1318.51, 0.04, 0.4], ['pop', r3(T.last + 0.68), 1760, 0.03, 0.4],
    ...(deal ? [['pop', T.chip, 1174.66, 0.045, 0], ['pluck', r3(T.chip + 0.08), 1567.98, 0.035, 0.4, 0]] : []),
    ...(cfg.finaleCues || []).map(c => [c[0], r3(c[1] + T.stamp), ...c.slice(2)]),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}

/** the score block for cues.js: drop under the situation's beat, breakdown at the vote, lift + hit at the stamp */
export function dealMusic({ style, key, seed, drop = 1.9 }) {
  return { style, key, seed, sections: { drop, breakdown: [T.vote], lift: [T.stamp], outroAt: DURATION - ENDCARD_LEN }, hits: [T.stamp] }
}
