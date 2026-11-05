// BIO GLOW-UP series kit (Month 2 boost, batch m34; promo/films/month2/m34.md). Owned by kbge01; kbge02–24 import it
// read-only. A bad dating-profile bio on a fictional profile screen (no app name), THE STARS' red pen slashes it, the
// honest, specific, kind glow-up types on, and ♓ Pisces, the bio judge, sobs. No end card, no card cut, no logo.
//
//   makeBio(cfg) → { DURATION, SCENES, CUES, T }
//   cfg:
//     id, sign ('aries'…), name ('Aries'), age (27), D (story length, s)
//     hook   headline on screen at frame 0 ('Aries, your bio is *yelling.*')     last  the last line (headline at T.last)
//     bad    the bad bio ('Reply fast or don't bother.')                          good  the rewrite ('I reply *fast.* …')
//     circle { word, label } a phrase of `bad` to circle in red, with a tag (optional)
//     says   [{ t, text }] THE STARS' little speech bubbles (optional)
//     fx     the pattern break at T.fx: 'whip' | 'scratch' | 'flash' | 'glitch' | 'silence' | 'shake'
//     end    'cut' | 'loop'
//     T      time overrides: { fx, circle, strike:[a,b], swap, glow, last }
//     photo(x, t, S)  extra drawing inside the photo window (after the star) · under(x, t, S) behind the card
//     over(x, t, S)   over the card (props, mid-action chaos) · mood(t) → the sign star's mood (optional)
//     cues   extra sound cues
//   S (passed to the hooks): { T, D, card geometry, star(x, t, opts), pis, shakeAt(t) }
//
// Everything is a pure function of t. DOM / offscreen canvases are only made in build (no `document` at module top level).
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, signStar, STAR } from '../startalk.js'
import {
  whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, screenShake, shakeCues,
  glitch as kitGlitch, glitchCues, loopBack, loopCues,
} from '../hookkit.js'
export * as KIT from '../hookkit.js'
import * as KITN from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#e2343f', MINT = '#7dffb0'
export const PAPER = '#f7f0e4', INKT = '#231a3e', GREY = '#7a7290', ACC = '#c2306f'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const GLYPH = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }
export const PIS = signStar('pisces')

// ── geometry
export const CARD = { x: 150, y: 470, w: 780, h: 900, r: 34 }
export const PHOTO = { x: CARD.x + 28, y: CARD.y + 86, w: CARD.w - 56, h: 360 }
export const BIO = { x: CARD.x + 54, y: CARD.y + 640, w: CARD.w - 108, size: 58, lh: 76 }
export const JUDGE = { x: 915, y: 1580, s: 215 }
export const NAR = { x: 150, y: 1590, s: 170 }

// ── small drawing helpers
export function R(x, c, a, b, w, h) { x.fillStyle = c; x.fillRect(a, b, w, h) }
export function rrect(x, a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath() }
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) { x.fillStyle = outline; for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, Rr, seed = 1, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  x.restore()
}
/** floating hearts rising from (cx, cy) after t0 */
export function hearts(x, t, t0, cx, cy, n = 6, life = 1.6) {
  const tt = t - t0
  if (tt < 0 || tt > life + 0.6) return
  for (let i = 0; i < n; i++) {
    const p = (tt - i * 0.09) / life
    if (p < 0 || p > 1) continue
    drawBits(x, HEART, { H: i % 2 ? PINK : '#ff5a8a' }, cx + Math.sin(i * 2.3 + p * 4) * 60 + (i - n / 2) * 26, cy - p * 260, 5 + (i % 3), { alpha: 1 - ease.inQuad(p) })
  }
}
/** a pixel speech bubble (canvas text), popping at t0 and gone at t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { size = 34, col = BONE, fg = INK, tail = 0, maxW = 640, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.26, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = wrap(x, text, maxW - 50)
  const w = Math.max(...lines.map(l => x.measureText(l.replace(/\*/g, '')).width)) + 50, lh = size * 1.18, h = lines.length * lh + 28
  R(x, INK, -w / 2 - 5, -h / 2, w + 10, h); R(x, INK, -w / 2, -h / 2 - 5, w, h + 10)
  R(x, col, -w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 30)
  R(x, INK, tx - 14, h / 2 + 3, 16, 14); R(x, col, tx - 9, h / 2 - 2, 9, 12)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => richLine(x, l, 0, -h / 2 + 14 + lh * (i + 0.5), { size, font, weight, fg, acc: ACC, center: true }))
  x.restore()
}

// ── text: wrapping + `*accent*` runs
const WRAPS = new Map()
export function wrap(x, text, maxW) {
  const key = x.font + '|' + maxW + '|' + text
  if (WRAPS.has(key)) return WRAPS.get(key)
  const words = text.split(/\s+/), lines = []
  let cur = ''
  for (const w of words) {
    const tryL = cur ? cur + ' ' + w : w
    if (x.measureText(tryL.replace(/\*/g, '')).width > maxW && cur) { lines.push(cur); cur = w } else cur = tryL
  }
  if (cur) lines.push(cur)
  // carry an open accent across a line break
  let open = false
  const fixed = lines.map(l => { let s = open ? '*' + l : l; const n = (l.match(/\*/g) || []).length; if (n % 2) open = !open; if (open) s += '*'; return s })
  WRAPS.set(key, fixed)
  return fixed
}
/** draw one line with *accent* runs (accent = Garamond italic in acc colour); returns its width */
export function richLine(x, line, cx, cy, { size, font = INTER, weight = 700, fg = INKT, acc = ACC, center = false, chars = Infinity }) {
  const runs = []
  line.split('*').forEach((s, i) => { if (s) runs.push({ s, a: i % 2 === 1 }) })
  const fontOf = a => a ? `italic 600 ${Math.round(size * 1.12)}px ${SERIF}` : `${weight} ${size}px ${font}`
  let W = 0
  for (const r of runs) { x.font = fontOf(r.a); W += x.measureText(r.s).width }
  let px = center ? cx - W / 2 : cx, left = chars
  x.save(); x.textAlign = 'left'; x.textBaseline = 'middle'
  for (const r of runs) {
    if (left <= 0) break
    const s = r.s.slice(0, Math.max(0, left)); left -= r.s.length
    x.font = fontOf(r.a); x.fillStyle = r.a ? acc : fg; x.fillText(s, px, cy + (r.a ? 2 : 0))
    px += x.measureText(s).width
  }
  x.restore()
  return { W, end: px }
}
const plain = s => s.replace(/\*/g, '')

// ── the red pen (a chunky pixel marker) with its tip at (tx, ty)
export function drawPen(x, tx, ty, rot = -0.6, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(tx, ty); x.rotate(rot); x.scale(k, k)
  R(x, INK, -7, -150, 34, 132); R(x, '#b8202c', -2, -146, 24, 124); R(x, '#ff6b74', 2, -142, 6, 110)
  R(x, INK, -10, -186, 40, 42); R(x, '#f2ede4', -6, -182, 32, 34); R(x, '#c9c2d6', 18, -182, 8, 34)
  R(x, INK, -3, -24, 20, 24); R(x, '#f2ede4', 1, -22, 12, 14); R(x, INK, 3, -10, 8, 10); R(x, RED, 5, -8, 4, 8)
  x.restore()
}
/** a hand-drawn marker stroke along pts (array of [x, y]) up to fraction p */
function stroke(x, pts, p, w = 10, col = RED) {
  if (p <= 0 || pts.length < 2) return null
  const L = []; let tot = 0
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d }
  let left = tot * clamp(p), end = pts[0]
  x.save(); x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round'
  x.beginPath(); x.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length && left > 0; i++) {
    const f = Math.min(1, left / L[i - 1]); left -= L[i - 1]
    end = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]
    x.lineTo(end[0], end[1])
  }
  x.stroke(); x.restore()
  return end
}
const ellipsePts = (cx, cy, rx, ry, turns = 1.12, n = 60, seed = 1) => Array.from({ length: n + 1 }, (_, i) => {
  const a = -2.4 + (i / n) * Math.PI * 2 * turns, wob = 1 + 0.05 * Math.sin(i * 0.7 + seed)
  return [cx + Math.cos(a) * rx * wob, cy + Math.sin(a) * ry * wob]
})

// ── a red tag (the circle's label)
export function tag(x, t, cx, cy, t0, text, { rot = -0.06, size = 30, col = RED, fg = '#fff', life = 99 } = {}) {
  const k = pop01(t, t0, 0.3, 2.6) * outK(t, [t0 + life - 0.15, t0 + life])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 36, h = size + 22
  R(x, INK, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8); R(x, col, -w / 2, -h / 2, w, h)
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.save(); x.letterSpacing = '0.08em'; x.fillText(text, 0, 2); x.restore()
  x.restore()
}

/** a rubber stamp that slams in at t0 */
export function stamp(x, t, cx, cy, t0, text, { size = 60, col = '#2bb673', rot = -0.18, life = 99 } = {}) {
  if (t < t0 || t > t0 + life) return
  const p = prog(t, t0, t0 + 0.22), sc = lerp(2.4, 1, ease.inCubic(p)), a = clamp(p * 2.5)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc); x.globalAlpha *= a
  x.font = `900 ${size}px ${INTER}`
  const w = x.measureText(text).width + 50, h = size + 34
  x.strokeStyle = col; x.lineWidth = 8; x.strokeRect(-w / 2, -h / 2, w, h); x.lineWidth = 3; x.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

// ── Pisces, the bio judge: tissue in hand, tears by level (1 sniffle · 2 streams · 3 fountains), a 10 paddle
export function tearsAt(x, t, F, k) {
  // tears drawn relative to the sprite frame (mirrors startalk sprite geometry: eyes at cells ~10 and ~25, row ~20)
  if (k <= 0) return
  const cell = F.cell, ox = F.ox - F.S / 2, oy = F.oy - F.S / 2 - F.base
  const drop = (i, j) => { R(x, INK, ox + (i - 0.15) * cell, oy + (j - 0.15) * cell, 1.3 * cell, 1.7 * cell); R(x, '#8fe3ff', ox + i * cell, oy + j * cell, cell, 1.4 * cell); R(x, '#fff', ox + i * cell, oy + j * cell, 0.5 * cell, 0.5 * cell) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph } else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph } else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
    R(x, '#8fe3ff', ox + (d < 0 ? 10 : 20) * cell, oy + 23.2 * cell, 6 * cell, 0.9 * cell)
  }
}
// star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
/** Pisces with tears (level 0–3); returns the frame */
export function pisces(x, t, P, tears, { mood = 'wide', look = [-1, -0.6], hops, seed = 6, pop = 1, alpha = 1 } = {}) {
  const o = { color: PIS.color, glyph: P.s >= 120 ? PIS.glyph : null, mood, look, seed, glow: 0.85, pop, alpha, hops }
  drawStarChar(x, P.x, P.y, P.s, t, o)
  const F = starFrame(P.x, P.y, P.s, t, { pop, hops, seed })
  x.save(); x.globalAlpha *= alpha
  tearsAt(x, t, F, tears)
  x.restore()
  return F
}
function judge(x, t, T, D, cfg) {
  const lvl = t < T.circle ? 1 : t < T.glow ? 2 : 3
  const glowed = t >= T.glow
  const hops = [T.glow + 0.02, T.glow + 0.42, T.glow + 0.82, T.last + 0.1]
  const F = pisces(x, t, JUDGE, lvl, { mood: glowed ? 'happy' : t > T.strike[0] ? 'wide' : 'sparkle', look: glowed ? [0, 0] : [-1, -0.7], hops })
  // the tissue (left point) and the 10 paddle (after the glow)
  const wig = Math.sin(t * 11) * 0.15
  x.save(); x.translate(F.ox - F.S * 0.42, F.oy - F.base - F.S * 0.05); x.rotate(-0.3 + wig)
  R(x, INK, -22, -34, 44, 40); R(x, '#fbf7ff', -18, -30, 36, 32); R(x, '#dfe3f7', 4, -30, 6, 32)
  R(x, INK, -12, -46, 24, 16); R(x, '#fbf7ff', -8, -44, 16, 14)
  x.restore()
  const pk = pop01(t, T.glow + 0.15, 0.3, 2.4)
  if (pk > 0.01) {
    x.save(); x.translate(F.ox + F.S * 0.42, F.oy - F.base - F.S * 0.3); x.rotate(0.12 + 0.06 * Math.sin(t * 6)); x.scale(pk, pk)
    R(x, INK, -6, 10, 12, 90); R(x, '#a07850', -3, 10, 6, 88)
    R(x, INK, -50, -66, 100, 84); R(x, BONE, -46, -62, 92, 76)
    x.font = `900 54px ${INTER}`; x.fillStyle = ACC; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('10', 0, -22)
    x.restore()
  }
  // the JUDGE label
  x.save(); x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.fillStyle = 'rgba(239,230,214,0.85)'; x.letterSpacing = '0.2em'; x.fillText('BIO JUDGE', JUDGE.x, JUDGE.y + 132); x.restore()
  void D; void cfg
}

// ── the profile card
function header(x, k = 1) {
  const { x: cx, y, w } = CARD
  x.save(); x.globalAlpha *= k
  // back chevron, title, dots
  x.fillStyle = INKT; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.save(); x.letterSpacing = '0.28em'; x.fillText('PROFILE', cx + w / 2, y + 46); x.restore()
  drawBits(x, ['..X', '.X.', 'X..', '.X.', '..X'], { X: INKT }, cx + 50, y + 46, 5, { outline: null })
  for (let i = 0; i < 3; i++) R(x, INKT, cx + w - 74 + i * 16, y + 42, 8, 8)
  x.restore()
}

// ── the default star in the photo window
export function photoDefault(x, t, S, cfg) {
  const { x: px, y: py, w, h } = PHOTO
  const sg = signStar(cfg.sign)
  const g = x.createLinearGradient(0, py, 0, py + h)
  g.addColorStop(0, cfg.photoTop || '#2a1f5a'); g.addColorStop(1, cfg.photoBot || '#4a2f7a')
  x.fillStyle = g; x.fillRect(px, py, w, h)
  // tiny pixel stars in the photo backdrop
  for (let i = 0; i < 14; i++) drawPixelStar(x, px + 40 + ((i * 137) % (w - 80)), py + 30 + ((i * 89) % (h - 120)), 10 + (i % 3) * 4, 1, i % 3 ? BONE : GOLD)
  const mood = cfg.mood ? cfg.mood(t, S) : (t >= S.T.glow ? 'sparkle' : t >= S.T.strike[0] ? 'wide' : 'neutral')
  if (cfg.photoUnder) cfg.photoUnder(x, t, S)
  const [sx, sy] = cfg.starXY ? cfg.starXY(t, S) : [px + w / 2, py + h * 0.56]
  drawStarChar(x, sx, sy, cfg.starS || 250, t, { color: sg.color, glyph: sg.glyph, mood, seed: 3, glow: 1.05, hops: [S.T.glow + 0.05, S.T.glow + 0.4], ...(cfg.starOpts ? cfg.starOpts(t, S) : {}) })
}

// ─────────────────────────────────────────────── the film
export function makeBio(cfg) {
  const D = cfg.D
  const T0 = {
    fx: 0.35, circle: 1.35, strike: [2.75, 3.35], swap: 3.5, glow: 0, last: 0,
  }
  const T = { ...T0, ...(cfg.T || {}) }
  const CPS = cfg.cps || 26
  // the rewrite types from swap; glow when it's done (+0.2) unless set
  const goodChars = plain(cfg.good).length
  T.typeEnd = T.swap + 0.15 + goodChars / CPS
  if (!T.glow) T.glow = +(T.typeEnd + 0.2).toFixed(2)
  if (!T.last) T.last = +(D - 1.5).toFixed(2)
  const LOOP = cfg.end === 'loop' ? (cfg.loopLen || 0.45) : 0
  const sg = signStar(cfg.sign)

  let BS = cfg.bioSize || BIO.size, BLH = Math.round(BS * 1.31), GS = cfg.goodSize || BIO.size, GLH = Math.round(GS * 1.31)
  const BOXH = CARD.y + CARD.h - 22 - BIO.y
  async function build(stage) {
    try { await Promise.all(['800 96px Inter', '700 50px Inter', '600 50px Inter', '900 54px Inter', "italic 600 56px 'EB Garamond'", "italic 500 120px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    // the bug
    const bug = el('div', { position: 'absolute', left: '56px', top: '58px', font: `800 30px ${INTER}`, letterSpacing: '0.26em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', pointerEvents: 'none' }, root, 'BIO&nbsp;GLOW-UP')
    void bug
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flashEl = el('div', { position: 'absolute', inset: 0, background: cfg.flashCol || '#fff', opacity: 0, pointerEvents: 'none' }, root)

    // layout of the bad bio (measured once fonts are in)
    // shrink either bio until it fits the box
    let badLines, goodLines
    for (;;) { x.font = `600 ${BS}px ${INTER}`; badLines = wrap(x, cfg.bad, BIO.w); BLH = Math.round(BS * 1.31); if (badLines.length * BLH <= BOXH || BS < 30) break; BS -= 2 }
    for (;;) { x.font = `700 ${GS}px ${INTER}`; goodLines = wrap(x, cfg.good, BIO.w); GLH = Math.round(GS * 1.31); if (goodLines.length * GLH <= BOXH || GS < 30) break; GS -= 2 }
    const bioY = i => BIO.y + BLH * (i + 0.5), bioYG = i => BIO.y + GLH * (i + 0.5)
    // where the circled phrase sits
    let circ = null
    if (cfg.circle) {
      x.font = `600 ${BS}px ${INTER}`
      const wd = cfg.circle.word
      badLines.forEach((l, i) => {
        if (circ) return
        const pl = plain(l)
        let w2 = wd, j = pl.indexOf(w2)
        // the phrase wraps: circle the longest leading part that sits on one line
        while (j < 0 && w2.includes(' ')) { w2 = w2.slice(0, w2.lastIndexOf(' ')); j = pl.indexOf(w2) }
        if (j < 0 || (w2 !== wd && !pl.endsWith(w2) && !pl.endsWith(w2 + ','))) return
        const a = x.measureText(pl.slice(0, j)).width, b = x.measureText(w2).width
        circ = { cx: BIO.x + a + b / 2, cy: bioY(i), rx: b / 2 + 34, ry: BLH * 0.62, line: i }
      })
    }
    // strike paths
    const strikes = badLines.map((l, i) => { x.font = `600 ${BS}px ${INTER}`; const w = x.measureText(plain(l)).width; const y = bioY(i) + 2; return [[BIO.x - 12, y + 3], [BIO.x + w * 0.33, y - 5], [BIO.x + w * 0.66, y + 4], [BIO.x + w + 14, y - 3]] })

    const shakeAt = t => {
      let s = 0
      for (const [a, amp] of [[T.strike[0], 8], [T.glow, 12], ...(cfg.shakes || [])]) { const d = t - a; if (d > 0 && d < 0.45) s += amp * Math.exp(-d * 9) * Math.sin(d * 60) }
      if (t < 0.3 && cfg.shake0) s += cfg.shake0 * Math.sin(t * 70 + 0.6)
      return s
    }
    const S = { T, D, CARD, PHOTO, BIO, shakeAt, sg, cfg, badLines, goodLines, bioY, circ }

    function scene(x, t) {
      // the camera: whip zoom / freeze / shake around the card
      let zoom = 1, cxp = 540, cyp = 920
      const zIn = cfg.zoom0 ?? 1.12
      if (t < T.fx) zoom = lerp(zIn, zIn + 0.04, t / T.fx)
      else zoom = lerp(zIn + 0.04, 1, ease.outCubic(prog(t, T.fx, T.fx + 0.4)))
      // push in on the bio while it reads, then back for the glow
      zoom *= 1 + 0.06 * ease.inOutCubic(prog(t, T.fx + 0.5, T.circle + 0.6)) * (1 - ease.inOutCubic(prog(t, T.glow - 0.2, T.glow + 0.4)))
      if (cfg.camera) ({ zoom, cxp, cyp } = cfg.camera(t, S, { zoom, cxp, cyp }))
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * (1 + (zoom - 1) * 0.3) })
      const sh = shakeAt(t)
      x.save(); x.translate(540 + sh, 960 + sh * 0.4); x.scale(zoom, zoom); x.translate(-cxp, -(960 + (cyp - 960) * (1 - 1 / zoom)))
      if (cfg.under) cfg.under(x, t, S)
      drawCard(x, t)
      if (cfg.over) cfg.over(x, t, S)
      x.restore()
      // narrator + judge sit outside the camera (they're our hosts)
      narrator(x, t)
      if (!cfg.noJudge) judge(x, t, T, D, cfg)
      if (cfg.top) cfg.top(x, t, S)
    }

    function drawCard(x, t) {
      const { x: cx, y, w, h, r } = CARD
      const glow = prog(t, T.glow, T.glow + 0.3)
      // the glow-up halo
      if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, y + h / 2, 100, 540, y + h / 2, 760); g.addColorStop(0, `rgba(255,214,120,${0.3 * glow * (0.85 + 0.15 * Math.sin(t * 5))})`); g.addColorStop(1, 'rgba(255,214,120,0)'); x.fillStyle = g; x.fillRect(0, y - 400, 1080, h + 800); x.restore() }
      // frame + paper
      x.fillStyle = INK; rrect(x, cx - 8, y - 8, w + 16, h + 16, r + 6); x.fill()
      x.fillStyle = glow > 0 ? `rgb(${Math.round(lerp(150, 242, glow))},${Math.round(lerp(140, 199, glow))},${Math.round(lerp(170, 92, glow))})` : '#9a92b0'; rrect(x, cx - 4, y - 4, w + 8, h + 8, r + 3); x.fill()
      x.fillStyle = PAPER; rrect(x, cx, y, w, h, r); x.fill()
      header(x)
      // photo window
      x.save(); rrect(x, PHOTO.x, PHOTO.y, PHOTO.w, PHOTO.h, 22); x.clip()
      if (cfg.photoBase) cfg.photoBase(x, t, S); else photoDefault(x, t, S, cfg)
      if (cfg.photo) cfg.photo(x, t, S)
      x.restore()
      // name row
      x.save(); x.textBaseline = 'middle'; x.textAlign = 'left'
      x.font = `500 52px ${GLYPH}`; x.fillStyle = sg.color; x.fillText(sg.glyph + '︎', CARD.x + 52, PHOTO.y + PHOTO.h + 62)
      x.font = `800 48px ${INTER}`; x.fillStyle = INKT; x.fillText(`${cfg.name}, ${cfg.age}`, CARD.x + 112, PHOTO.y + PHOTO.h + 62)
      x.font = `700 24px ${INTER}`; x.fillStyle = GREY; x.save(); x.letterSpacing = '0.22em'; x.fillText(cfg.glowLabel && t >= T.glow ? cfg.glowLabel : 'ABOUT ME', BIO.x, BIO.y - 36); x.restore()
      R(x, '#e4dccd', BIO.x, BIO.y - 14, BIO.w, 3)
      x.restore()
      // the bio
      const out = ease.inCubic(prog(t, T.swap - 0.15, T.swap + 0.12))
      if (out < 1) {
        x.save(); x.globalAlpha *= 1 - out; x.translate(0, -out * 40)
        badLines.forEach((l, i) => richLine(x, l, BIO.x, bioY(i), { size: BS, weight: 600, fg: cfg.badCol || '#5d5575', acc: '#5d5575' }))
        // circle + tag
        if (circ) {
          const p = ease.inOutCubic(prog(t, T.circle, T.circle + 0.45))
          stroke(x, ellipsePts(circ.cx, circ.cy, circ.rx, circ.ry), p, 8)
          tag(x, t, clamp(circ.cx + 40, 330, 760), circ.cy - BLH * 0.95 - (circ.line === 0 ? 4 : 0), T.circle + 0.35, cfg.circle.label, { rot: -0.07 })
        }
        // frame 0 flash-forward: the pen is already mid-slash (the pattern break rewinds it)
        if (cfg.preSlash && t < T.fx) S.preEnd = stroke(x, strikes[cfg.preSlash.line || 0], cfg.preSlash.p || 0.45, 11)
        // strikes
        const n = strikes.length
        strikes.forEach((s, i) => { const a = lerp(T.strike[0], T.strike[1], i / n), b = lerp(T.strike[0], T.strike[1], (i + 1) / n); stroke(x, s, ease.inOutQuad(prog(t, a, b)), 11) })
        x.restore()
      }
      // the rewrite types on
      if (t >= T.swap) {
        let left = Math.floor((t - T.swap - 0.15) * CPS)
        goodLines.forEach((l, i) => {
          if (left <= 0) return
          const n = plain(l).length
          const r2 = richLine(x, l, BIO.x, bioYG(i), { size: GS, weight: 700, fg: INKT, acc: ACC, chars: left })
          if (left < n && Math.floor(t * 3) % 2 === 0) R(x, ACC, r2.end + 4, bioYG(i) - GS * 0.45, 5, GS * 0.9)
          left -= n
        })
        if (t < T.swap + 0.15 + 0.01 || (left > 0 && t < T.glow && Math.floor(t * 3) % 2 === 0 && false)) R(x, ACC, BIO.x, bioYG(0) - GS * 0.45, 5, GS * 0.9)
      }
      // the red pen: hovers, circles, strikes, then writes, then leaves
      penTrack(x, t)
      // glow-up stamp on the photo corner + sparkles
      stamp(x, t, PHOTO.x + PHOTO.w - 150, PHOTO.y + 70, T.glow + 0.05, cfg.stampText || 'GLOWED UP', { size: 44, col: '#22a05f', rot: 0.14 })
      sparkles(x, t, 540, CARD.y + CARD.h * 0.72, T.glow, 14, 380, 1, [GOLD, BONE, PINK])
      sparkles(x, t, PHOTO.x + PHOTO.w - 150, PHOTO.y + 70, T.glow + 0.1, 8, 120, 2, [MINT, BONE])
      hearts(x, t, T.glow + 0.1, 540, CARD.y + 300, 7)
    }

    function penTrack(x, t) {
      let tx, ty, rot = -0.55, k = 1
      const rest = [CARD.x + CARD.w - 40, CARD.y + CARD.h - 60]
      const hover = (tt) => [rest[0] + 8 * Math.sin(tt * 3), rest[1] + 6 * Math.sin(tt * 4.2)]
      ;[tx, ty] = hover(t)
      // frame 0: already moving in (mid-action)
      if (t < T.circle - 0.25) { const p = ease.inOutCubic(prog(t, 0, T.circle - 0.25)); const c = circ ? [circ.cx - circ.rx, circ.cy] : [BIO.x, bioY(0)]; tx = lerp(rest[0] - 120, c[0], p); ty = lerp(rest[1] - 220, c[1], p) + Math.sin(t * 8) * 6 * (1 - p) }
      if (circ && t >= T.circle - 0.25 && t < T.circle + 0.55) { const p = ease.inOutCubic(prog(t, T.circle, T.circle + 0.45)); const pts = ellipsePts(circ.cx, circ.cy, circ.rx, circ.ry); const i = Math.min(pts.length - 1, Math.floor(p * (pts.length - 1))); [tx, ty] = pts[i] }
      if (t >= T.circle + 0.55 && t < T.strike[0]) { const p = ease.inOutCubic(prog(t, T.circle + 0.55, T.strike[0])); const a = circ ? [circ.cx + circ.rx * 0.6, circ.cy + circ.ry] : [BIO.x, bioY(0)]; tx = lerp(a[0], strikes[0][0][0], p); ty = lerp(a[1], strikes[0][0][1], p) }
      if (!circ && t >= T.circle - 0.25 && t < T.strike[0]) { tx = strikes[0][0][0] + 10 * Math.sin(t * 5); ty = strikes[0][0][1] - 10 }
      if (t >= T.strike[0] && t < T.strike[1]) {
        const n = strikes.length, f = prog(t, T.strike[0], T.strike[1]) * n, i = Math.min(n - 1, Math.floor(f)), s = strikes[i], q = ease.inOutQuad(f - i)
        const seg = q * 3, j = Math.min(2, Math.floor(seg)), qq = seg - j
        tx = lerp(s[j][0], s[j + 1][0], qq); ty = lerp(s[j][1], s[j + 1][1], qq)
      }
      if (t >= T.strike[1] && t < T.typeEnd + 0.1) {
        // follow the typing caret
        let left = Math.max(0, Math.floor((t - T.swap - 0.15) * CPS)), li = 0
        for (; li < goodLines.length; li++) { const n = plain(goodLines[li]).length; if (left <= n) break; left -= n }
        li = Math.min(li, goodLines.length - 1)
        x.save(); x.font = `700 ${GS}px ${INTER}`
        const w = x.measureText(plain(goodLines[li]).slice(0, left)).width; x.restore()
        const p = ease.outCubic(prog(t, T.strike[1], T.swap + 0.15))
        tx = lerp(strikes[strikes.length - 1][3][0], BIO.x + w + 8, p); ty = lerp(strikes[strikes.length - 1][3][1], bioYG(li) + 18, p) + Math.sin(t * 40) * 3
        rot = -0.45
      }
      if (t >= T.typeEnd + 0.1) { const p = ease.inCubic(prog(t, T.typeEnd + 0.1, T.typeEnd + 0.45)); tx = lerp(tx, 1250, p); ty = lerp(BIO.y + 100, 300, p); k = 1 - p * 0.2; rot = -0.55 - p * 0.6 }
      if (cfg.preSlash && t < T.fx && S.preEnd) { [tx, ty] = S.preEnd; rot = -0.5 }
      if (t >= T.typeEnd + 0.45) return
      drawPen(x, tx, ty, rot, k)
    }

    // THE STARS: a small gold star bottom-left, saying a line or two
    function narrator(x, t) {
      const says = cfg.says || []
      const talking = says.some(s => t > s.t && t < s.t + 0.8)
      const hops = says.flatMap(s => [s.t + 0.02, s.t + 0.4])
      drawStarChar(x, NAR.x, NAR.y, NAR.s, t, { color: STAR.sky, mood: t >= T.glow ? 'happy' : talking ? 'neutral' : 'squint', look: [1, -0.8], hops, seed: 2, glow: 1.05 })
      x.save(); x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.fillStyle = 'rgba(239,230,214,0.85)'; x.letterSpacing = '0.2em'; x.fillText('THE STARS', NAR.x, NAR.y + 118); x.restore()
      says.forEach((s, i) => { const end = s.end ?? (says[i + 1] ? says[i + 1].t - 0.05 : T.glow); bubble(x, t, s.x ?? 520, s.y ?? 1462, s.t, end, s.text, { size: s.size || 44, tail: s.tail ?? -0.75, col: s.col || BONE, maxW: s.maxW || 720 }) })
    }

    function frame(x, t) {
      scene(x, t)
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        frame(x, t)
        // the glow-up flash
        const fl = 0.35 * (1 - prog(t, T.glow, T.glow + 0.25)) * (t >= T.glow ? 1 : 0)
        flashEl.style.opacity = String(fl.toFixed(3))
        drawGrain(gx, t)
      },
    }
  }

  // ── sound
  const scribble = (t0, d, gain = 0.014) => Array.from({ length: Math.max(1, Math.floor(d / 0.07)) }, (_, i) => ['tick', +(t0 + i * 0.07 + (i % 3) * 0.01).toFixed(3), gain])
  const typeTicks = (t0, n) => Array.from({ length: Math.ceil(n / 2) }, (_, i) => ['tick', +(t0 + (i * 2) / CPS).toFixed(3), 0.018])
  // ── the kit layers: hook + last line slam titles, the pattern break, extra kit effects, the loop
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop || 168, size: cfg.hookSize || 100, accentColor: cfg.hookColor || PINK, out: cfg.hookOut || (cfg.reply ? [T.glow + 0.25, T.glow + 0.45] : [T.last - 0.3, T.last - 0.08]), shake: 8 }
  const LASTO = { at: T.last, text: cfg.last, top: cfg.hookTop || 168, size: cfg.lastSize || 96, accentColor: GOLD, gap: 0.08, ...(LOOP ? { out: [D - LOOP, D - LOOP + 0.18] } : {}) }
  const FX = { at: T.fx, ...(cfg.fxOpts || {}) }
  const FXK = {
    whip: [o => whipZoom({ from: 1.4, len: 0.45, cx: 540, cy: 900, ...o }), whipZoomCues],
    flash: [o => whipZoom({ from: 1.1, len: 0.3, lines: false, flash: 0.95, ...o }), o => [['bell', o.at, 1760, 0.05, 0.9, 0], ['whoosh', o.at, 0.3, 0.07], ['tom', o.at + 0.02, 80, { gain: 0.2, decay: 0.2 }]]],
    scratch: [o => recordScratch({ len: 1.0, top: 1460, ...o }), o => recordScratchCues({ len: 1.0, ...o })],
    silence: [o => recordScratch({ len: 0.9, top: 1460, ...o }), o => recordScratchCues({ len: 0.9, ...o })],
    glitch: [o => kitGlitch({ len: 0.8, dialog: false, ...o }), o => glitchCues({ len: 0.8, ...o })],
    shake: [o => screenShake({ len: 0.5, amp: 30, ...o }), o => shakeCues({ len: 0.5, ...o })],
  }[cfg.fx]
  const freezeWins = (cfg.fx === 'scratch' || cfg.fx === 'silence') ? [{ at: T.fx, len: cfg.fx === 'scratch' ? 1.0 : 0.9, ...(cfg.fxOpts || {}) }] : []
  const extras = [...(cfg.kit || [])]           // [[sceneFactory, cuesFn, opts]]
  if (cfg.reply) { const RP = { at: T.glow + 0.55, out: [T.last - 0.3, T.last - 0.1], title: 'new message', time: 'now', y: 110, ...cfg.reply }; extras.push([KITN.notification, KITN.notificationCues, RP]) }
  const base = freezeWins.length ? frozen(build, freezeWins) : build
  const SCENES = [base, ...(FXK ? [FXK[0](FX)] : []), ...extras.map(([f, , o]) => f(o)), ...(cfg.noTitles ? [] : [slamTitle(HOOK), slamTitle(LASTO)])]
  if (LOOP) SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: D, len: LOOP }))
  const says = cfg.says || []
  const CUES = [
    ...(FXK ? FXK[1](FX) : []), ...extras.flatMap(([, c, o]) => c ? c(o) : []),
    ...(cfg.noTitles ? [] : [...slamTitleCues(HOOK).filter(c => c[1] >= 0), ...slamTitleCues(LASTO)]),
    ...(cfg.circle ? [['whoosh', T.circle, 0.3, 0.03], ...scribble(T.circle, 0.45, 0.012), ['pop', T.circle + 0.36, 523.25, 0.05, -0.2]] : []),
    ...says.flatMap(s => [['pop', s.t, 880, 0.035, -0.4], ['pop', s.t + 0.1, 1174.66, 0.025, -0.4]]),
    ['whoosh', T.strike[0], 0.25, 0.04], ...scribble(T.strike[0], T.strike[1] - T.strike[0], 0.02), ['tick', T.strike[1], 0.06],
    ['whoosh', T.swap - 0.1, 0.3, 0.03], ...typeTicks(T.swap + 0.15, goodChars),
    ['pop', T.glow, 1318.51, 0.06, 0], ['bell', T.glow + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.glow, T.glow + 0.55],
    ['tom', T.glow + 0.05, 110, { gain: 0.16, decay: 0.2 }], ['pop', T.glow + 0.17, 987.77, 0.04, 0.5],
    ['pluck', T.glow + 0.3, 1174.66, 0.035, 0.5, 0.6], ['pluck', T.glow + 0.42, 1479.98, 0.03, 0.5, 0.6],     // Pisces sobs
    ...(LOOP ? loopCues({ duration: D, len: LOOP }) : []),
    ...(cfg.cues || []),
  ]
  return { DURATION: D, SCENES, CUES, T }
}

// ─────────────────────────────────────────────── props (shared by the episodes)
export const ICONS = {
  Q: { bm: ['.QQQQ.', 'QQ..QQ', '....QQ', '...QQ.', '..QQ..', '..QQ..', '......', '..QQ..'], cols: { Q: GOLD } },
  TROPHY: { bm: ['GGGGGGG', 'GWGGGGG', '.GGGGG.', '..GGG..', '...G...', '..GGG..', '.BBBBB.'], cols: { G: GOLD, W: '#fff6c8', B: '#a07850' } },
  SUITCASE: { bm: ['...BBBB...', '...B..B...', 'OOOOOOOOOO', 'OYOOOOOOYO', 'OYOOOOOOYO', 'OOOOOOOOOO', 'OYOOOOOOYO', 'OOOOOOOOOO'], cols: { B: '#5a4030', O: '#e0782f', Y: '#ffd28a' } },
  PIN: { bm: ['.RRRR.', 'RRWWRR', 'RRWWRR', 'RRRRRR', '.RRRR.', '..RR..', '..RR..', '...R..'], cols: { R: RED, W: '#fff' } },
  LOCK: { bm: ['..GGGG..', '.G....G.', '.G....G.', 'GGGGGGGG', 'GGGDDGGG', 'GGGDDGGG', 'GGGGDGGG', 'GGGGGGGG'], cols: { G: '#b9b4c8', D: INK } },
  KEY: { bm: ['.GGG.....', 'G...G....', 'G...GGGGG', 'G...G.G.G', '.GGG.....'], cols: { G: GOLD } },
  BREAD: { bm: ['..BBBBBB..', '.BLBBLBBB.', 'BBBLBBLBBB', 'BBBBBBBBBB', '.CCCCCCCC.'], cols: { B: '#d99a4e', L: '#f3cd8a', C: '#a96a2e' } },
  MUG: { bm: ['MMMMMM..', 'MWMMMMMM', 'MMMMMM.M', 'MMHMMM.M', 'MMMMMMMM', 'MMMMMM..', '.MMMM...'], cols: { M: '#7fd0f0', W: '#e8f8ff', H: PINK } },
  CANDLE: { bm: ['...F...', '..FYF..', '...W...', '.CCCC..', '.CCCCC.', '..CCCC.', '.CCCCC.', '.CCCCC.'], cols: { F: '#ff9a3a', Y: '#ffe27a', W: INK, C: '#f6b6d0' } },
  CHAIR: { bm: ['BB....', 'BB....', 'BB....', 'BBBBBB', 'BBBBBB', 'B....B', 'B....B'], cols: { B: '#c98a52' } },
  HEART: { bm: HEART, cols: { H: '#ff5a8a' } },
  NOODLES: { bm: ['.Y.Y.Y.Y.', 'YYYYYYYYY', 'BBBBBBBBB', '.BBBBBBB.', '..BBBBB..'], cols: { Y: '#ffe27a', B: '#e2343f' } },
  DUST: { bm: ['.DD.D', 'DDDDD', '.DDD.'], cols: { D: '#b9ad9c' } },
}
export function icon(x, name, cx, cy, cell, opts = {}) { const I = ICONS[name]; drawBits(x, I.bm, opts.cols || I.cols, cx, cy, cell, opts) }
/** an icon that pops in at t0 (springy) and pops out at t1, bobbing */
export function popIcon(x, t, name, cx, cy, cell, t0, t1 = 1e9, { rot = 0, bob = 6 } = {}) {
  const k = pop01(t, t0, 0.3, 2.4) * outK(t, [t1, t1 + 0.18])
  if (k <= 0.01 || t < t0) return
  icon(x, name, cx, cy + Math.sin(t * 3 + cx) * bob, cell * k, { rot: rot + 0.05 * Math.sin(t * 2.4 + cy) })
}
/** props thrown in: each { name, x, y, cell, at (landing time), rot, from: [dx, dy] }; they fly in, land with a bounce,
 *  and leave (fly off) during out = [a, b]. at < 0 → already mid-flight on frame 0. */
export function thrown(x, t, items, out = [1e9, 1e9]) {
  for (const it of items) {
    const fl = 0.45, p = prog(t, it.at - fl, it.at)
    if (t < it.at - fl) continue
    const [fx, fy] = it.from || [0, -700]
    let cx = lerp(it.x + fx, it.x, ease.inQuad(p)), cy = lerp(it.y + fy, it.y, ease.inQuad(p)), rot = (it.rot || 0) + (1 - p) * 2.5
    const d = t - it.at
    if (d > 0) cy -= 40 * Math.abs(Math.sin(d * 9)) * Math.exp(-d * 6)
    const o = prog(t, out[0], out[1])
    if (o >= 1) continue
    if (o > 0) { cx += (it.x > 540 ? 1 : -1) * 900 * ease.inCubic(o); cy -= 200 * o; rot += 3 * o }
    icon(x, it.name, cx, cy, it.cell || 8, { rot })
  }
}
/** a word stamp (e.g. NO / YES) */
export function word(x, text, cx, cy, size, col, rot = 0, alpha = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha *= alpha
  x.font = `900 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const w = x.measureText(text).width + size * 0.6, h = size * 1.25
  x.strokeStyle = col; x.lineWidth = Math.max(3, size * 0.1); x.strokeRect(-w / 2, -h / 2, w, h)
  x.fillStyle = col; x.fillText(text, 0, size * 0.05)
  x.restore()
}

// ─────────────────────────────────────────────── sequences (long films made of several glow-ups)
/** segs: [{ at, len, ep }] where ep = makeBio({ …, noTitles: true }) without kit camera effects. One builder that shows
 *  the active segment (its own root) and runs it on local time t − at. Before the first / after the last segment the
 *  nearest one holds its first / last frame. */
export function sequence(segs) {
  return async stage => {
    const built = []
    for (const s of segs) { const b = await s.ep.SCENES[0](stage); b.root.style.display = 'none'; built.push(b) }
    const root = built[0].root
    return {
      start: -1e9, end: 1e9, root: null,
      update(t) {
        let k = 0
        segs.forEach((s, i) => { if (t >= s.at - 1e-6) k = i })
        built.forEach((b, i) => { b.root.style.display = i === k ? 'block' : 'none' })
        const s = segs[k]
        built[k].update(Math.min(Math.max(t - s.at, 0), s.len - 0.001))
      },
      _root: root,
    }
  }
}
export function sequenceCues(segs) {
  return segs.flatMap(s => s.ep.CUES.map(c => { const d = [...c]; d[1] = +(d[1] + s.at).toFixed(3); if (d[0] === 'glitter' || d[0] === 'riser') d[2] = +(d[2] + s.at).toFixed(3); return d }).filter(c => c[1] >= s.at - 0.05 && c[1] < s.at + s.len))
}
