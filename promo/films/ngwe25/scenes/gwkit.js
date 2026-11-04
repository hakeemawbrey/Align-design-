// gwkit.js — the frame of every "Your Star Guide: Winter" film (Next 30, promo/films/next30/b24.md, ngwe25–ngwe48).
// The classic Star Guide (the sign's star + its gold lantern, the "♎ YOUR STAR" RPG box, the ★ ASTROLOGY SAYS chip)
// in winter: pixel snow, a snow bank, the bug YOUR STAR GUIDE: WINTER, the chip "♎ LIBRA · WINTER NOTE 1 / 4", and
// Pisces sniffling into a tissue box in a corner (happy tears by the last line). Builds on the shared kits stguide.js,
// startalk.js, lesson.js, cardfx.js, endcard.js and sky.js; edits none of them. Other ngwe films import this file.
//
//   winterGuide(S) → { DURATION, SCENES, CUES, STORY_END, T }
//   S = {
//     sign ('libra'), note (1…4), duration (20 | 25),
//     hook ('*Libra* in love, | winter edition.'), hookOut?: [a, b]
//     lines [{ t, text }]                      the guide's RPG box lines (≤ 46 chars)
//     fact ('LIBRA: CARDINAL AIR, RULED BY VENUS'), factAt?, factDur?
//     last ('*You* are the | cozy part.'), lastLate? (words that pop late, default 1)
//     guide(t) → { x, y, size, mood, look, squash, pop, side, lantern, flame, tears }   the hero (tears 0…3 for Pisces)
//     drawBack(x, t, K), drawMid(x, t, K), drawFront(x, t, K, r)   the film's own canvas layers
//     pisces(t) → { x, y, s, tears, mood, look, hops, pop } | null   the corner Pisces (default: bottom right)
//     tissues?: false to hide the tissue box, snow?: { n, speed }, cues
//   }
//   T (default timeline): 25 s → open 2.8, l1 3.0, l2 7.4, l3 11.8, close 15.3, cut 15.45, last 15.5, lateAt 16.0, out [20.15, 20.5]
//                         20 s → open 2.8, l1 3.0, l2 6.6, l3 9.0,  close 10.55, cut 10.68, last 10.75, lateAt 11.2, out [15.15, 15.5]
//   K = { R, box, drawBits, sparkles, burst, bubble, star(opts), lantern, pop01, popOut, outK, shadow, … }
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, guideSign, drawBits, drawBurst, sparkles, wordPops,
  pop01, outK, popOut, W, GOLD, BONE, PINK, INK, LAV, INTER, MONO, SERIF, GLYPH } from '../../stguide.js'
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, drawPixelStar, drawBits, drawBurst, sparkles, wordPops,
  pop01, outK, popOut, W, GOLD, BONE, PINK, INK, LAV, INTER, MONO, SERIF, GLYPH }

export const SNOW = '#eef4ff', SNOW_SH = '#b9c8ea', SNOW_DEEP = '#8fa2d4', ICE = '#bfe8ff', WOOD = '#8a5a3a', WOOD_D = '#5e3a24'
export const PIS = signStar('pisces')

// ─────────────────────────────────────────────── tiny canvas helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** a pixel box with an ink border and an optional top highlight */
export function box(x, X, Y, w, h, col, { b = 5, hi = null, ink = INK } = {}) {
  R(x, ink, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X + b, Y + b, w - 2 * b, Math.max(3, b))
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha *= a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** wrap canvas text to maxW */
export function wrap(x, text, maxW) {
  const out = []
  for (const para of text.split('\n')) {
    let line = ''
    for (const w of para.split(' ')) { const tryL = line ? line + ' ' + w : w; if (x.measureText(tryL).width > maxW && line) { out.push(line); line = w } else line = tryL }
    out.push(line)
  }
  return out
}

// ─────────────────────────────────────────────── star sprite frame (mirrors startalk.js drawStarChar) for tears
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
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 happy fountains */
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
/** a star with tears on it (any sign); returns the frame */
export function cryingStar(x, t, { x: X, y: Y, s, color = PIS.color, glyph = null, tears = 1, mood = 'wide', look = [-1, -0.5], seed = 6, hops = null, pop = 1, alpha = 1, squash = 0, glow = 0.8 }) {
  const opts = { color, glyph, mood, look, seed, glow, pop, alpha, hops, squash, tips: false }
  drawStarChar(x, X, Y, s, t, opts)
  const F = starFrame(X, Y, s, t, opts)
  if (tears && pop > 0.05) { x.save(); x.globalAlpha *= alpha; inSprite(x, F, () => tearsCells(x, t, tears)); x.restore() }
  return F
}
/** a little tissue box with one tissue sticking up (bottom centre at cx, cy) */
export function tissues(x, cx, cy, s = 70, t = 0, pull = 0) {
  box(x, cx - s / 2, cy - s * 0.6, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, '#7fc0e6', cx - s / 2, cy - s * 0.18, s, s * 0.08)
  R(x, INK, cx - s * 0.2 - 4, cy - s * 0.6 - 4, s * 0.4 + 8, 8)
  const up = s * (0.32 + 0.12 * pull), wob = Math.sin(t * 5) * 3
  R(x, INK, cx - s * 0.13 - 3 + wob, cy - s * 0.6 - up - 3, s * 0.26 + 6, up + 4)
  R(x, '#ffffff', cx - s * 0.13 + wob, cy - s * 0.6 - up, s * 0.26, up)
}

// ─────────────────────────────────────────────── winter set dressing
/** falling pixel snow (deterministic), drawn over the sky */
export function drawSnow(x, t, { n = 70, speed = 1, alpha = 1, front = false, seed = 1 } = {}) {
  x.save()
  for (let i = 0; i < n; i++) {
    const r1 = frac(Math.sin((i + seed * 31) * 12.9898) * 43758.5453), r2 = frac(Math.sin((i + seed * 17) * 78.233) * 12345.678)
    const depth = front ? 1 : 0.35 + 0.65 * r2
    const sz = Math.round((front ? 9 : 3 + 6 * depth))
    const sp = (60 + 90 * depth) * speed
    const y = ((r1 * 2100 + t * sp) % 2100) - 90
    const xx = (r2 * 1160 - 40 + Math.sin(t * (0.6 + r1) + i) * 26 * depth + 1160) % 1160 - 40
    x.globalAlpha = alpha * (front ? 0.85 : 0.35 + 0.55 * depth)
    x.fillStyle = SNOW
    x.fillRect(Math.round(xx), Math.round(y), sz, sz)
    if (sz >= 7) { x.fillRect(Math.round(xx - sz / 3), Math.round(y + sz / 3), Math.round(sz * 5 / 3), Math.round(sz / 3)); x.fillRect(Math.round(xx + sz / 3), Math.round(y - sz / 3), Math.round(sz / 3), Math.round(sz * 5 / 3)) }
  }
  x.restore()
}
const frac = v => v - Math.floor(v)
/** the snow bank along the bottom: top edge ≈ y0 with soft pixel bumps */
export function drawSnowBank(x, t, { y0 = 1290, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  // the field fades from moonlit white at the edge to deep night blue at the bottom
  const g = x.createLinearGradient(0, y0, 0, 1920)
  g.addColorStop(0, '#c9d6f2'); g.addColorStop(0.18, '#7f8fc8'); g.addColorStop(0.55, '#3a3878'); g.addColorStop(1, '#1a1640')
  const step = 12
  for (let X = 0; X < W; X += step) {
    const h = y0 + Math.round((14 * Math.sin(X * 0.009 + 1.2) + 9 * Math.sin(X * 0.023 + 0.4)) / 6) * 6
    R(x, SNOW_DEEP, X, h - 6, step, 12)
    x.fillStyle = g; x.fillRect(X, h, step, 1920 - h)
    R(x, SNOW, X, h + 6, step, 22)
    R(x, '#ffffff', X, h + 6, step, 6)
  }
  // a few sparkles on the snow
  for (let i = 0; i < 9; i++) {
    const ph = frac(t * 0.35 + i * 0.37)
    const a = Math.max(0, Math.sin(ph * Math.PI * 2)) ** 3
    if (a < 0.05) continue
    x.globalAlpha = a * alpha
    const sx = 60 + i * 118 + (i % 2) * 40, sy = y0 + 40 + (i % 3) * 22
    R(x, '#ffffff', sx - 2, sy - 7, 4, 14); R(x, '#ffffff', sx - 7, sy - 2, 14, 4)
  }
  x.restore()
}

// ─────────────────────────────────────────────── props shared across the series
/** a wrapped gift box; open 0…1 lifts the lid off and away. Returns the box's top-centre (for whatever comes out). */
export function giftBox(x, cx, cy, s, t, { color = '#e8344e', ribbon = GOLD, open = 0, wobble = 0, hi = null } = {}) {
  const w = s, h = s * 0.78
  const wob = wobble * Math.sin(t * 22) * 0.06
  x.save(); x.translate(cx, cy); x.rotate(wob)
  shadow(x, 0, h / 2 + 6, w * 1.1, 0.4)
  box(x, -w / 2, -h / 2, w, h, color, { b: 6, hi: hi || 'rgba(255,255,255,0.25)' })
  R(x, ribbon, -w * 0.07, -h / 2, w * 0.14, h)
  x.restore()
  // the lid
  const lp = ease.outCubic(clamp(open))
  const lx = cx + lp * w * 0.9, ly = cy - h / 2 - 14 - lp * s * 0.9, lr = wob + lp * 0.9
  if (open < 1.2) {
    x.save(); x.translate(lx, ly); x.rotate(lr); x.globalAlpha *= 1 - clamp((open - 0.8) / 0.4)
    box(x, -w * 0.56, -s * 0.12, w * 1.12, s * 0.2, color, { b: 6, hi: 'rgba(255,255,255,0.3)' })
    R(x, ribbon, -w * 0.07, -s * 0.12, w * 0.14, s * 0.2)
    // the bow
    const bw = s * 0.2
    x.fillStyle = INK; x.fillRect(-bw - 6, -s * 0.12 - bw * 0.8 - 6, bw * 2 + 12, bw * 0.8 + 6)
    x.fillStyle = ribbon; x.fillRect(-bw, -s * 0.12 - bw * 0.8, bw * 0.9, bw * 0.8); x.fillRect(bw * 0.1, -s * 0.12 - bw * 0.8, bw * 0.9, bw * 0.8)
    x.fillStyle = '#fff2b8'; x.fillRect(-bw * 0.8, -s * 0.12 - bw * 0.7, bw * 0.3, bw * 0.2)
    x.restore()
  }
  return { x: cx, y: cy - h / 2 }
}

/** a paper note / card on the canvas with handwriting (Garamond italic) lines; k scales it in */
export function paperNote(x, cx, cy, w, h, lines, { rot = 0, k = 1, size = 44, color = '#2a1c5a', paper = '#f8f0dc', kicker = null, kickerColor = '#b0485f', lined = true, reveal = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.shadowColor = 'rgba(4,2,14,0.55)'; x.shadowBlur = 26; x.shadowOffsetY = 10
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  x.shadowColor = 'transparent'
  x.strokeStyle = INK; x.lineWidth = 5; x.strokeRect(-w / 2, -h / 2, w, h)
  if (lined) { x.fillStyle = 'rgba(120,150,220,0.25)'; for (let yy = -h / 2 + 70; yy < h / 2 - 10; yy += size * 1.25) x.fillRect(-w / 2 + 16, yy + size * 0.5, w - 32, 2) }
  let y0 = -((lines.length - 1) * size * 1.25) / 2
  if (kicker) {
    x.fillStyle = kickerColor; x.font = `700 ${Math.round(size * 0.55)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(kicker, 0, -h / 2 + size * 0.75); y0 += size * 0.45
  }
  x.fillStyle = color; x.font = `italic 600 ${size}px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const total = lines.join('').length
  let shown = Math.round(total * clamp(reveal))
  lines.forEach((l, i) => { const s = l.slice(0, Math.max(0, shown)); shown -= l.length; x.fillText(s, 0, y0 + i * size * 1.25) })
  x.restore()
}

/** a mug of cocoa with steam */
export function mug(x, cx, cy, s, t, { color = '#e163d6', steam = 1 } = {}) {
  const w = s, h = s * 0.9
  box(x, cx + w * 0.42, cy - h * 0.25, w * 0.24, h * 0.45, color, { b: 5 })
  R(x, INK, cx + w * 0.47, cy - h * 0.14, w * 0.12, h * 0.24)
  box(x, cx - w / 2, cy - h / 2, w, h, color, { b: 5, hi: 'rgba(255,255,255,0.3)' })
  R(x, '#6b3b22', cx - w / 2, cy - h / 2, w, h * 0.12)
  R(x, '#fff7ea', cx - w * 0.2, cy - h / 2 - 2, w * 0.2, h * 0.08)
  if (steam > 0) {
    x.save(); x.globalAlpha *= steam * 0.7
    for (let k = 0; k < 3; k++) {
      const ph = frac(t * 0.5 + k / 3)
      x.globalAlpha = steam * 0.7 * Math.sin(Math.PI * ph)
      R(x, '#ffffff', cx - w * 0.25 + k * w * 0.25 + Math.sin(ph * 6 + k) * 6, cy - h / 2 - 20 - ph * s * 0.8, 6, 14)
    }
    x.restore()
  }
}

/** a string of fairy lights from (x0, y0) to (x1, y1) with a sag; n bulbs; on 0…1 */
export function stringLights(x, t, x0, y0, x1, y1, { sag = 50, n = 9, on = 1, cols = ['#ff7eb6', GOLD, '#7fe3ff', '#9dff8f'] } = {}) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 24; i++) { const p = i / 24, X = lerp(x0, x1, p), Y = lerp(y0, y1, p) + Math.sin(Math.PI * p) * sag; i ? x.lineTo(X, Y) : x.moveTo(X, Y) }
  x.stroke()
  for (let i = 0; i < n; i++) {
    const p = (i + 0.5) / n, X = lerp(x0, x1, p), Y = lerp(y0, y1, p) + Math.sin(Math.PI * p) * sag
    const c = cols[i % cols.length], tw = on * (0.7 + 0.3 * Math.sin(t * 4 + i * 1.7))
    if (on > 0) { x.globalAlpha = 0.35 * tw; x.fillStyle = c; x.beginPath(); x.arc(X, Y + 14, 26, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1 }
    R(x, INK, X - 9, Y + 2, 18, 26); R(x, on > 0.3 ? c : '#4a4266', X - 6, Y + 5, 12, 20); R(x, '#ffffff', X - 4, Y + 7, 4, 5)
  }
  x.restore()
}

/** a knitted scarf strip from (x0, y0) going down `len` px, with stripes */
export function scarf(x, cx, y0, len, { w = 60, color = '#e23d66', stripe = BONE, fringe = true, rot = 0 } = {}) {
  x.save(); x.translate(cx, y0); x.rotate(rot)
  R(x, INK, -w / 2 - 5, -5, w + 10, len + 10); R(x, color, -w / 2, 0, w, len)
  for (let yy = 18; yy < len - 10; yy += 46) R(x, stripe, -w / 2, yy, w, 12)
  for (let yy = 4; yy < len; yy += 12) R(x, 'rgba(0,0,0,0.12)', -w / 2 + ((yy / 12) % 2 ? 6 : 0), yy, 6, 6)
  if (fringe) for (let k = 0; k < 5; k++) R(x, color, -w / 2 + 4 + k * (w - 8) / 4 - 3, len + 4, 6, 18)
  x.restore()
}

/** a frosty window: dark night panes behind a frost layer; `word` is cleared out of the frost left-to-right as
 *  write goes 0→1; wipe 0→1 clears the rest of the frost. Needs an offscreen canvas (K.frost). */
export function frostWindow(x, K, t, cx, cy, w, h, { word = '', write = 0, wipe = 0, frame = WOOD, glow = 0, wordSize = 170, sky = true } = {}) {
  // frame
  box(x, cx - w / 2 - 22, cy - h / 2 - 22, w + 44, h + 44, frame, { b: 6, hi: '#b07a52' })
  // panes: the night outside
  const g = x.createLinearGradient(0, cy - h / 2, 0, cy + h / 2)
  g.addColorStop(0, '#0b1240'); g.addColorStop(1, '#2a2470')
  x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  if (sky) {
    for (let i = 0; i < 18; i++) {
      const sx = cx - w / 2 + 20 + frac(Math.sin(i * 91.7) * 999) * (w - 40), sy = cy - h / 2 + 20 + frac(Math.sin(i * 37.1) * 777) * (h * 0.7)
      const a = 0.5 + 0.5 * Math.sin(t * 2 + i)
      x.globalAlpha = a; R(x, '#fffbea', sx, sy, 5, 5); x.globalAlpha = 1
    }
    // the moon in the corner
    x.fillStyle = '#fff3c4'; x.beginPath(); x.arc(cx + w * 0.3, cy - h * 0.28, w * 0.07, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#0d1442'; x.beginPath(); x.arc(cx + w * 0.3 + w * 0.03, cy - h * 0.28 - w * 0.02, w * 0.065, 0, Math.PI * 2); x.fill()
  }
  // frost layer (offscreen): fill frost, punch out the word up to `write`, fade with wipe
  const f = K.frost(w, h)
  const fx = f.getContext('2d')
  fx.clearRect(0, 0, w, h)
  if (wipe < 1) {
    fx.globalCompositeOperation = 'source-over'; fx.globalAlpha = 1
    fx.fillStyle = 'rgba(214,232,255,0.9)'; fx.fillRect(0, 0, w, h)
    // frost texture: pixel crystals
    for (let i = 0; i < 140; i++) {
      const px = frac(Math.sin(i * 12.3) * 4567) * w, py = frac(Math.sin(i * 7.7) * 8910) * h, s = 6 + (i % 4) * 4
      fx.fillStyle = i % 3 ? 'rgba(255,255,255,0.75)' : 'rgba(170,200,240,0.6)'
      fx.fillRect(Math.round(px), Math.round(py), s, 4); fx.fillRect(Math.round(px + s / 2 - 2), Math.round(py - s / 2 + 2), 4, s)
    }
    if (word && write > 0) {
      fx.save(); fx.globalCompositeOperation = 'destination-out'
      fx.font = `800 ${wordSize}px ${INTER}`; fx.textAlign = 'center'; fx.textBaseline = 'middle'
      const tw = fx.measureText(word).width
      fx.beginPath(); fx.rect(w / 2 - tw / 2 - 20, 0, (tw + 40) * clamp(write), h); fx.clip()
      fx.fillStyle = '#000'; fx.fillText(word, w / 2, h * 0.55)
      fx.restore()
    }
    if (wipe > 0) { fx.globalCompositeOperation = 'destination-out'; fx.fillStyle = `rgba(0,0,0,${clamp(wipe)})`; fx.fillRect(0, 0, w, h); fx.globalCompositeOperation = 'source-over' }
    x.drawImage(f, cx - w / 2, cy - h / 2)
  }
  // the word glows once it's written (behind glass: a warm outline)
  if (word && glow > 0) {
    x.save(); x.globalAlpha *= clamp(glow); x.font = `800 ${wordSize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.shadowColor = GOLD; x.shadowBlur = 40; x.strokeStyle = 'rgba(255,226,140,0.9)'; x.lineWidth = 4
    x.strokeText(word, cx, cy - h / 2 + h * 0.55); x.restore()
  }
  // mullions
  R(x, INK, cx - 8, cy - h / 2, 16, h); R(x, frame, cx - 4, cy - h / 2, 8, h)
  R(x, INK, cx - w / 2, cy - 8, w, 16); R(x, frame, cx - w / 2, cy - 4, w, 8)
  // sill with snow
  box(x, cx - w / 2 - 40, cy + h / 2 + 22, w + 80, 26, frame, { b: 6, hi: '#b07a52' })
  R(x, SNOW, cx - w / 2 - 34, cy + h / 2 + 10, w + 68, 14); R(x, '#ffffff', cx - w / 2 - 30, cy + h / 2 + 10, w + 60, 4)
  // where the writing point is now (for the lantern to trace): x position along the word
  x.save(); x.font = `800 ${wordSize}px ${INTER}`; const tw = word ? x.measureText(word).width : 0; x.restore()
  return { penX: cx - tw / 2 + tw * clamp(write), penY: cy - h / 2 + h * 0.55 + Math.sin(write * 40) * wordSize * 0.25 }
}

/** a pixel speech bubble on the canvas (bone, ink outline, stepped tail) */
export function drawBubble(x, cx, cy, text, { size = 44, pad = 26, k = 1, color = INK, font = INTER, weight = 800, tail = 'down', tailX = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const tw = x.measureText(text).width, w = Math.round(tw + pad * 2), h = Math.round(size + pad * 1.4)
  const px = 6
  const slab = (i, col) => {
    x.fillStyle = col
    x.fillRect(-w / 2 + i + px, -h / 2 + i, w - 2 * i - 2 * px, h - 2 * i)
    x.fillRect(-w / 2 + i, -h / 2 + i + px, w - 2 * i, h - 2 * i - 2 * px)
  }
  slab(-px, INK); slab(0, '#f5eedf')
  x.fillStyle = INK
  const sgn = tail === 'down' ? 1 : -1
  for (let s = 0; s < 4; s++) x.fillRect(tailX - 18 + s * px * 0.5, sgn * (h / 2 + s * px) - (sgn < 0 ? px : 0), (5 - s) * px, px)
  x.fillStyle = '#f5eedf'
  for (let s = 0; s < 3; s++) x.fillRect(tailX - 12 + s * px * 0.5, sgn * (h / 2 - px + s * px) - (sgn < 0 ? px : 0), (3 - s) * px, px)
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

/** pixel heart (cell c) centred on (cx, cy) */
const HEART = [[1, 0], [2, 0], [4, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [2, 4], [3, 4], [4, 4], [3, 5]]
export function heart(x, cx, cy, c, col = PINK, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.fillStyle = INK
  for (const [i, j] of HEART) x.fillRect(cx + (i - 3.5) * c - c * 0.25, cy + (j - 3) * c - c * 0.25, c * 1.5, c * 1.5)
  x.fillStyle = col; for (const [i, j] of HEART) x.fillRect(cx + (i - 3.5) * c, cy + (j - 3) * c, c, c)
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(cx - 2.5 * c, cy - 2 * c, c, c)
  x.restore()
}
/** hearts floating up from (cx, cy) after t0 */
export function heartsUp(x, t, cx, cy, t0, { n = 3, c = 7, col = PINK, life = 1.6, spread = 90 } = {}) {
  for (let i = 0; i < n; i++) {
    const tt = t - t0 - i * 0.3
    if (tt < 0 || tt > life) continue
    const p = tt / life
    heart(x, cx + Math.sin(i * 2.3 + p * 4) * spread * 0.5 + (i - (n - 1) / 2) * spread * 0.6, cy - p * 220, c, col, Math.sin(Math.PI * p))
  }
}

// ─────────────────────────────────────────────── the series bug
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: '#bfe8ff', boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(191,232,255,0.8)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: '#bfe8ff', textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    'YOUR&nbsp;STAR&nbsp;GUIDE<span style="color:rgba(255,255,255,0.6)">:&nbsp;WINTER</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(out) } }
}

// ─────────────────────────────────────────────── default timelines
export function timeline(duration) {
  if (duration >= 25) return { open: 2.8, l1: 3.0, l2: 7.4, l3: 11.8, close: 15.3, cut: 15.45, last: 15.5, lateAt: 16.0, out: [20.15, 20.5], hookOut: [2.5, 2.8] }
  return { open: 2.8, l1: 3.0, l2: 6.6, l3: 9.0, close: 10.55, cut: 10.68, last: 10.75, lateAt: 11.2, out: [15.15, 15.5], hookOut: [2.5, 2.8] }
}

// ─────────────────────────────────────────────── the film
export function winterGuide(S) {
  const DURATION = S.duration, STORY_END = DURATION - ENDCARD_LEN
  const T = { ...timeline(DURATION), ...(S.T || {}) }
  const GS = guideSign(S.sign)
  const COL = S.color || GS.color, ACC = S.accent || lighten(COL)
  const SPEAKER = `${GS.glyph} YOUR STAR`
  const CPS = S.cps || 30
  const LINES = S.lines.map(l => ({ speaker: SPEAKER, color: ACC, ...l }))
  const HOPS = talkHops(LINES, SPEAKER, { cps: CPS }).filter(h => h > LINES[0].t + 0.25)
  const NOTE_NAMES = ['', 'WINTER NOTE 1 / 4', 'WINTER NOTE 2 / 4', 'WINTER NOTE 3 / 4', 'WINTER NOTE 4 / 4']
  const outAll = t => { const p = prog(t, ...T.out); return p <= 0 ? 1 : 1 - ease.inCubic(p) }

  // the corner Pisces: sniffles from frame 0, streams at the turn, happy fountains on the last line
  const pisDefault = t => ({
    x: 948, y: 1232, s: 132,
    tears: t < (S.pisTurn ?? T.l2 + 1.6) ? 1 : t < T.last ? 2 : 3,
    mood: t < T.last ? 'wide' : 'sparkle', look: t < T.last ? [-1, -0.4] : [-1, -0.8],
    hops: [T.last + 0.1, T.lateAt + 0.05, T.lateAt + 0.6, ...(S.pisHops || [])],
  })

  async function build(stage) {
    await loadGuideFonts()
    try { await Promise.all(["800 112px Inter", "800 28px Inter", "800 170px Inter", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "italic 600 44px 'EB Garamond'", "italic 500 150px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const frosts = {}
    const K = {
      R: (...a) => R(x, ...a), box: (...a) => box(x, ...a), shadow: (...a) => shadow(x, ...a),
      drawBits: (...a) => drawBits(x, ...a), sparkles: (...a) => sparkles(x, ...a), burst: (...a) => drawBurst(x, ...a),
      bubble: (...a) => drawBubble(x, ...a), heart: (...a) => heart(x, ...a), heartsUp: (...a) => heartsUp(x, ...a),
      star: (o) => drawStarChar(x, o.x, o.y, o.s ?? o.size, o.t, { hops: o.hops, ...o }),
      frost: (w, h) => { const k = w + 'x' + h; if (!frosts[k]) { const c = document.createElement('canvas'); c.width = w; c.height = h; frosts[k] = c } return frosts[k] },
      pop01, popOut, outK, outAll, T, COL, ACC, HOPS, x,
    }
    const bug = buildBug(root)
    const hook = guideHook(root, { accentColor: COL, text: S.hook, out: T.hookOut, at: 0, top: 196, size: S.hookSize || 100 })
    const chip = noteChip(root, { label: `${GS.glyph} ${GS.name} · ${NOTE_NAMES[S.note]}`, at: 0, out: [STORY_END - 0.45, STORY_END - 0.15], top: 122, color: '#bfe8ff' })
    const head = popText(root, S.last, { top: S.lastTop || 200, size: S.lastSize || 108, accentSize: S.lastAccent || 150, accentColor: ACC, at: T.last, late: S.lastLate ?? 1, lateAt: T.lateAt, wobble: true, gap: 0.08 })
    const box = dialogueBox(root, { lines: LINES, y: 1470, width: 960, height: 260, open: T.open, close: T.close, cps: CPS })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function guideNow(t) {
      const g = S.guide(t)
      if (!g || g.hidden) return null
      const pop = g.pop ?? 1
      if (pop <= 0.01) return null
      const r = drawGuide(x, g.x, g.y, g.size, t, { color: COL, glyph: GS.glyph, hops: HOPS, seed: 3, glow: 1.1, ...g, pop },
        { lantern: g.lantern ?? 1, side: g.side ?? 1, glow: g.lanternGlow ?? 1, flame: g.flame ?? 1, lanternSize: g.lanternSize })
      if (g.tears) { const F = starFrame(g.x, g.y, g.size, t, { pop, hops: g.hops ?? HOPS, squash: g.squash || 0, seed: 3 }); inSprite(x, F, () => tearsCells(x, t, g.tears)) }
      return r
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.8, ...(S.sky ? S.sky(t) : {}) })
        drawSnow(x, t, { n: S.snow?.n ?? 70, speed: S.snow?.speed ?? 1 })
        if (S.drawBack) S.drawBack(x, t, K)
        if (S.bank !== false) drawSnowBank(x, t, { y0: S.bankY || 1290 })
        if (S.drawMid) S.drawMid(x, t, K)
        // the corner Pisces with its tissues (unless the film moves or hides it)
        const P = S.pisces === null ? null : (S.pisces ? S.pisces(t, pisDefault(t)) : pisDefault(t))
        if (P && !P.hidden) {
          const a = (P.alpha ?? 1) * outAll(t)
          if (S.tissues !== false && !P.noTissues) { x.save(); x.globalAlpha *= a; tissues(x, P.tx ?? P.x - 110, P.ty ?? P.y + 76, 64, t, P.tears >= 2 ? 1 : 0); x.restore() }
          cryingStar(x, t, { glyph: P.s >= 150 ? PIS.glyph : null, ...P, alpha: a })
        }
        const r = guideNow(t)
        if (S.drawFront) S.drawFront(x, t, K, r)
        if (S.fact) factChip(x, t, { text: S.fact, at: S.factAt ?? T.l1 + 1.6, dur: S.factDur ?? 3.2, x: 540, y: S.factY || 1372, color: '#bfe8ff', size: 28 })
        hook.update(t)
        chip.update(t)
        bug.update(t, 1 - clamp(prog(t, STORY_END - 0.4, STORY_END - 0.1)))
        box.update(t)
        head.update(t, outK(t, T.out))
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
  const nW = S.last.split(' ').filter(w => w !== '|').length - (S.lastLate ?? 1)
  const CUES = [
    ...guideCues(0.02),
    ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
    ...talkCues(LINES, { cps: CPS }),
    ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
    ...(S.fact ? [['pop', S.factAt ?? T.l1 + 1.6, 987.77, 0.035, 0], ['bell', (S.factAt ?? T.l1 + 1.6) + 0.05, 1760, 0.018, 1.0, 0.2]] : []),
    ...wordPops(T.last, nW, 0.08, 2, 0.026),
    ['pop', T.lateAt, 1318.51, 0.05, 0], ['pluck', T.lateAt, 1174.66, 0.045, 0.6, 0], ['bell', T.lateAt + 0.3, 1760, 0.02, 1.0, 0],
    ...guideCues(T.lateAt + 0.5, { gain: 0.02 }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(S.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, STORY_END, T, LINES, COL, ACC, GS }
}

function lighten(hex, k = 0.45) {
  const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255
  const f = v => Math.round(v + (255 - v) * k).toString(16).padStart(2, '0')
  return '#' + f(r) + f(g) + f(b)
}
