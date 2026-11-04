// TAKEOVER: the shared look of Sag Season Takeover (nsage01–nsage12) and Capricorn Season Takeover (ncape01–ncape08),
// promo/films/next30/b10.md. Every episode imports this file from here (read-only for everyone else).
//
// The format (story = slate length − 4.4 s, then the SHORT 2.4 s end card, so 18, 23 or 28 s):
//   hook      frame 0 is the thumbnail: the hook headline is already up and the host star is mid-action at t = 0.
//   beats     2–4 jump-cut beats, each with an Inter 800 headline (one italic accent), pixel props, speech bubbles
//             (with the speaker's name tag) and Pisces somewhere in the back with tissues, crying a little more each beat.
//             No Align card transition: every beat boundary is a white-flash jump cut.
//   finale    the host (and THE STARS when they speak) + Pisces in happy-tear fountains; the last line types in the
//             RPG dialogue box and holds.
//   chrome    the series bug top-left ("SAG SEASON TAKEOVER", Inter 800 small caps, letter-spaced, host colour), a REC
//             chip top-right (the account is being "taken over"), and a host lanyard pin under the bug.
//
//   makeTakeover(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.host ('sag' | 'cap'), cfg.duration (20 | 25 | 30)
//     cfg.hook  = { text, accent?, dur = 2.6, draw(x, t, S), cues: [] }        S = { u, t0, t1, ... } (see below)
//     cfg.beats = [{ dur, head, accent?, draw(x, t, S), cues: [], says: [Say], pis: {x,y,s,look} | false, flash? }]
//                 Say = { at (beat-relative), text, x, y, who?: sign id | 'stars' | 'host', until? (beat-relative),
//                         size?, col?, tail? (−1…1), tag? (custom name tag) }
//     cfg.last  = { who: 'host' | 'stars', text }
//     cfg.finale(x, t, S) optional: draw the finale yourself (S.ok = pop-out factor). Default: host + THE STARS.
//     cfg.images: ['card-talk-6.png', …] → S.img['card-talk-6.png'] (loaded in build, null if missing)
//   S handed to every draw: { u, t0, t1, i, host(x,t,o), star(x,t,id,o), pisces(x,t,P,tears,mood,look), img, HOST, HC }
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', SKYB = '#7fd0ff', MINT = '#9fe6b0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

export const HOSTS = {
  sag: { id: 'sagittarius', name: 'SAGITTARIUS', short: 'SAG', bug: 'SAG SEASON', pin: 'SAG', accent: '#c58bff' },
  cap: { id: 'capricorn', name: 'CAPRICORN', short: 'CAP', bug: 'CAPRICORN SEASON', pin: 'CAP', accent: '#9fd3c7' },
}
const NAMES = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
const SEEDS = { aries: 11, taurus: 9, gemini: 4, cancer: 13, leo: 3, virgo: 8, libra: 7, scorpio: 12, sagittarius: 5, capricorn: 10, aquarius: 14, pisces: 6 }
export const tagOf = id => id === 'stars' ? 'THE STARS' : `${signStar(id).glyph}︎ ${NAMES[id]}`
export const colOf = id => id === 'stars' ? STAR.sky : signStar(id).color

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
/** pixel confetti falling from a burst at t0 */
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
/** wraps text to lines no wider than maxW (canvas font must be set) */
function wrap(x, text, maxW) {
  const words = text.split(' '), out = []; let cur = ''
  for (const w of words) { const n = cur ? cur + ' ' + w : w; if (x.measureText(n).width > maxW && cur) { out.push(cur); cur = w } else cur = n }
  if (cur) out.push(cur)
  return out
}
/** a pixel speech bubble (canvas), popping at t0, fading by t1; `tag` = a small name tag on its top-left edge.
 *  The bubble is clamped inside x 40…1040. Long text wraps (maxW). */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 36, tail = 0, font = INTER, weight = 800, tag = null, tagCol = GOLD, maxW = 760, think = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  x.save()
  x.font = `${weight} ${size}px ${font}`
  const lines = wrap(x, text, maxW)
  const lh = size * 1.12
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 48, h = lines.length * lh + 30
  const ccx = clamp(cx, 40 + w / 2, 1040 - w / 2)
  x.translate(ccx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = clamp(cx - ccx + tail * (w / 2 - 40), -w / 2 + 30, w / 2 - 30)
  if (think) {
    for (const [dx, dy, s] of [[0, 22, 16], [-10, 50, 11]]) { x.fillStyle = INK; x.fillRect(tx + dx - s / 2 - 4, h / 2 + dy - s / 2 - 4, s + 8, s + 8); x.fillStyle = col; x.fillRect(tx + dx - s / 2, h / 2 + dy - s / 2, s, s) }
  } else {
    x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
    x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 15 + lh * (i + 0.5) + 1))
  if (tag) {
    x.font = `700 22px ${MONO}`
    const tw = x.measureText(tag).width + 22
    const X0 = -w / 2 + 14, Y0 = -h / 2 - 30
    x.fillStyle = INK; x.fillRect(X0 - 4, Y0 - 4, tw + 8, 36)
    x.fillStyle = tagCol; x.fillRect(X0, Y0, tw, 28)
    x.fillStyle = INK; x.textAlign = 'left'; x.fillText(tag, X0 + 11, Y0 + 15)
  }
  x.restore()
}
/** pixel label text on canvas (Space Mono), with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, shadowCol = 'rgba(6,4,18,0.85)' } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (shadowCol) { x.fillStyle = shadowCol; x.fillText(text, 3, 4) }
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** plain ink text on a prop (no shadow) */
export function ink(x, text, cx, cy, { size = 26, col = INK, align = 'center', font = MONO, weight = 700, rot = 0, strike = false } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, 0, 0)
  if (strike) { const w = x.measureText(text).width, x0 = align === 'left' ? 0 : align === 'right' ? -w : -w / 2; x.fillStyle = RED; x.fillRect(x0 - 6, -3, (w + 12) * (strike === true ? 1 : strike), 6) }
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { if (w <= 0) return; x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a warm radial glow */
export function glow(x, cx, cy, r, a, col = '255,214,150') { if (a <= 0) return; const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r) }
/** a floor band (room) */
export function floor(x, y = 1180, col = '#231c3c', edge = '#2e2650') { R(x, col, 0, y, 1080, 1920 - y); R(x, edge, 0, y, 1080, 10) }

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
/** one single tear rolling down the left cheek, p 0…1 (sprite cells) */
export function oneTearCells(ctx, p) {
  if (p <= 0 || p >= 1) return
  const j = 20.5 + 9 * p, i = 10.4 - 0.6 * p
  ctx.fillStyle = INK; ctx.fillRect(i - 0.25, j - 0.25, 1.7, 2.1); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1.2, 1.6); ctx.fillStyle = '#fff'; ctx.fillRect(i, j, 0.5, 0.5)
}

// ── host accessories (sprite cells, 36-cell sprite: top tip at about (18, 1), eyes at about rows 15–20)
/** Sag: a trail backpack behind the star (draw BEFORE the star) */
export function sagPackBehind(ctx) {
  ctx.fillStyle = INK; ctx.fillRect(24, 12, 12.5, 18); ctx.fillStyle = '#5d8a4e'; ctx.fillRect(25, 13, 10.5, 16)
  ctx.fillStyle = '#76a862'; ctx.fillRect(25, 13, 10.5, 3); ctx.fillStyle = '#3f6a34'; ctx.fillRect(27, 21, 7, 5)
  ctx.fillStyle = INK; ctx.fillRect(24.5, 8.5, 11, 4.5); ctx.fillStyle = '#c96a3b'; ctx.fillRect(25.5, 9.5, 9, 2.5)   // the bedroll
}
/** Sag: (no strap: it crossed the face) */
export function sagStrap() {}
/** Cap: two little curled sea-goat horns on the top tip (draw AFTER the star) */
export function capHorns(ctx) {
  const H = [[0, 0], [-1, -1], [-2, -2], [-2, -3], [-1, -4]]
  for (const d of [-1, 1]) {
    for (const [i, j] of H) { ctx.fillStyle = INK; ctx.fillRect(18 + d * (2.2 - i) - 0.75, 5 + j - 0.75, 2.5, 2.5) }
    for (const [i, j] of H) { ctx.fillStyle = '#e9dcc2'; ctx.fillRect(18 + d * (2.2 - i) - 0.5, 5 + j - 0.5, 1.5, 1.5) }
    ctx.fillStyle = '#c8b48f'; ctx.fillRect(18 + d * 2.2 - 0.5, 4.5, 1.5, 1)
  }
}

/** a little tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** a mug (of cocoa / tea) */
export function mug(x, cx, cy, s = 1, col = '#e86a5a', steam = 0, t = 0) {
  box(x, cx - 26 * s, cy - 30 * s, 52 * s, 56 * s, col, { b: 5, hi: 'rgba(255,255,255,0.25)' })
  R(x, INK, cx + 26 * s, cy - 16 * s, 16 * s, 28 * s); R(x, col, cx + 26 * s, cy - 10 * s, 9 * s, 16 * s)
  R(x, '#6b3d22', cx - 20 * s, cy - 26 * s, 40 * s, 8 * s)
  if (steam > 0) for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = steam * Math.sin(Math.PI * p) * 0.6; R(x, BONE, cx - 12 * s + i * 12 * s + Math.sin(t * 3 + i) * 5, cy - 40 * s - p * 60 * s, 6 * s, 14 * s); x.restore() }
}
/** a talk card / any card image, drawn centred at (cx, cy), w wide, rotated */
export function cardImg(x, img, cx, cy, w, rot = 0, alpha = 1) {
  if (!img || alpha <= 0 || w <= 0) return
  const h = w * img.height / img.width
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 14, -h / 2 + 18, w, h)
  x.drawImage(img, -w / 2, -h / 2, w, h)
  x.restore()
}
/** a couch (seat top at cy) */
export function couch(x, cx, cy, w = 760, col = '#6a4fb0') {
  box(x, cx - w / 2, cy - 170, w, 150, col, { b: 7, hi: 'rgba(255,255,255,0.14)' })
  box(x, cx - w / 2 - 50, cy - 90, 70, 170, col, { b: 7, hi: 'rgba(255,255,255,0.14)' }); box(x, cx + w / 2 - 20, cy - 90, 70, 170, col, { b: 7, hi: 'rgba(255,255,255,0.14)' })
  box(x, cx - w / 2 + 20, cy - 20, w - 40, 100, col, { b: 7, lo: 'rgba(0,0,0,0.18)' })
  R(x, INK, cx - w / 2 + 10, cy + 80, 26, 30); R(x, INK, cx + w / 2 - 36, cy + 80, 26, 30)
}
/** a table top (top edge at cy) */
export function table(x, cx, cy, w = 900, col = '#8a5a3a') {
  box(x, cx - w / 2, cy, w, 34, col, { b: 6, hi: '#a87048' })
  R(x, INK, cx - w / 2 + 40, cy + 40, 26, 1920); R(x, INK, cx + w / 2 - 66, cy + 40, 26, 1920)
}
/** a pixel phone with a message thread. msgs = [{ at, side: 'L'|'R', text }] (absolute t) */
export function phone(x, t, { cx = 540, top = 480, w = 560, h = 820, title = '', msgs = [], typing = null, alpha = 1, scroll = 0, size = 30 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  box(x, cx - w / 2, top, w, h, '#2a2148', { b: 8 })
  R(x, '#120d26', cx - w / 2 + 18, top + 70, w - 36, h - 110)
  R(x, '#1d1640', cx - w / 2 + 18, top + 18, w - 36, 48)
  x.font = `700 24px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, cx, top + 43)
  // messages from the bottom up
  x.save(); x.beginPath(); x.rect(cx - w / 2 + 18, top + 70, w - 36, h - 110); x.clip()
  x.font = `700 ${size}px ${INTER}`
  const shown = msgs.filter(m => t >= m.at)
  let y = top + h - 60 + scroll
  const tyOn = typing && t >= typing[0] && t < typing[1]
  if (tyOn) {
    R(x, '#3a3070', cx - w / 2 + 34, y - 52, 110, 48)
    for (let i = 0; i < 3; i++) R(x, BONE, cx - w / 2 + 54 + i * 26, y - 34 + (Math.sin(t * 12 + i) > 0 ? -5 : 0), 12, 12)
    y -= 66
  }
  for (let i = shown.length - 1; i >= 0; i--) {
    const m = shown[i], lines = wrap(x, m.text, w - 150), lh = size * 1.15
    const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 36, bh = lines.length * lh + 20
    const k = easeOutBack(prog(t, m.at, m.at + 0.22), 2)
    const bx = m.side === 'R' ? cx + w / 2 - 34 - bw : cx - w / 2 + 34
    x.save(); x.translate(bx + (m.side === 'R' ? bw : 0), y); x.scale(k, k)
    const ox = m.side === 'R' ? -bw : 0
    R(x, m.side === 'R' ? '#5fb8ff' : '#3a3070', ox, -bh, bw, bh)
    x.fillStyle = m.side === 'R' ? INK : BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
    lines.forEach((l, j) => x.fillText(l, ox + 18, -bh + 10 + lh * (j + 0.5)))
    x.restore()
    y -= bh + 16
  }
  x.restore()
  x.restore()
}
/** a pinned paper note with lines of text */
export function note(x, cx, cy, w, lines, { col = '#fff1a8', size = 30, rot = 0, pin = RED, lh = 1.35, align = 'left', font = MONO } = {}) {
  const h = lines.length * size * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, 'rgba(6,4,18,0.4)', -w / 2 + 12, -h / 2 + 14, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  if (pin) { R(x, INK, -11, -h / 2 - 11, 22, 22); R(x, pin, -7, -h / 2 - 7, 14, 14) }
  lines.forEach((l, i) => {
    const L = typeof l === 'string' ? { text: l } : l
    if (L.hide) return
    ink(x, L.text, align === 'left' ? -w / 2 + 26 : 0, -h / 2 + 25 + size * lh * (i + 0.5), { size: L.size || size, align, col: L.col || INK, strike: L.strike, font: L.font || font, weight: L.weight || 700 })
  })
  x.restore()
  return h
}

// ── the series bug: "SAG SEASON TAKEOVER" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root, H, col) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: col, boxShadow: `0 0 0 4px ${INK}, 0 0 16px ${col}` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: col, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    `${H.bug.replace(/ /g, '&nbsp;')}<span style="color:rgba(255,255,255,0.6)">&nbsp;TAKEOVER</span>`)
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(clamp(out)) } }
}
// the REC chip, top-right: a blinking red dot + "REC" + the takeover clock
function drawRec(x, t, out) {
  if (out <= 0.01) return
  x.save(); x.globalAlpha = clamp(out)
  const X1 = 1024, Y = 78
  const s = Math.floor(t), clock = `00:${String(s).padStart(2, '0')}`
  x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
  const w = x.measureText(clock).width
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(clock, X1 + 3, Y + 4); x.fillStyle = BONE; x.fillText(clock, X1, Y)
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText('REC', X1 - w - 18 + 3, Y + 4); x.fillStyle = BONE; x.fillText('REC', X1 - w - 18, Y)
  const rw = x.measureText('REC').width
  if (Math.floor(t * 1.6) % 2 === 0) { R(x, INK, X1 - w - 18 - rw - 38, Y - 13, 26, 26); R(x, RED, X1 - w - 18 - rw - 34, Y - 9, 18, 18) }
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeTakeover(cfg) {
  const H = HOSTS[cfg.host], HOST = signStar(H.id), PIS = signStar('pisces')
  const HC = cfg.bugCol || H.accent
  // cfg.duration is the slate length (4.4 s end card); the story is unchanged and the short 2.4 s end card follows it
  const STORY_END = cfg.duration - ENDCARD_LEN, DURATION = r3(STORY_END + ENDCARD_SHORT_LEN)
  const CPS = 30
  const hookDur = cfg.hook.dur ?? 2.6
  // the beat timeline
  const beats = []
  let t0 = hookDur
  for (const b of cfg.beats) { beats.push({ ...b, t0: r3(t0), t1: r3(t0 + b.dur) }); t0 += b.dur }
  const FIN = r3(t0)
  if (STORY_END - FIN < 4.2) throw new Error(`${cfg.id}: finale too short (${(STORY_END - FIN).toFixed(2)} s)`)
  const T = { hook: [0, hookDur], fin: FIN, last: r3(FIN + (cfg.lastAt ?? 0.55)), boxClose: r3(STORY_END - 0.42), out: [r3(STORY_END - 0.42), r3(STORY_END - 0.02)], beats: beats.map(b => [b.t0, b.t1]) }
  const LAST_SPEAK = cfg.last.who === 'stars' ? 'THE STARS' : tagOf(H.id)
  const LINES = [{ t: T.last, speaker: LAST_SPEAK, text: cfg.last.text, color: cfg.last.who === 'stars' ? undefined : HC }]
  const LAST_HOPS = talkHops(LINES, LAST_SPEAK, { cps: CPS })

  const hostDraw = (x, t, o = {}) => {
    const opts = { color: HOST.color, glyph: o.s >= 150 && o.glyph !== false ? HOST.glyph : null, seed: 5, glow: 1.1, ...o }
    if (opts.pop <= 0 || opts.alpha <= 0) return null
    const F = starFrame(o.x, o.y, o.s, t, opts)
    if (cfg.host === 'sag' && o.acc !== false) inSprite(x, F, () => sagPackBehind(x))
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    inSprite(x, F, () => {
      if (cfg.host === 'sag' && o.acc !== false) sagStrap(x)
      if (cfg.host === 'cap' && o.acc !== false) capHorns(x)
      if (o.tears) tearsCells(x, t, o.tears)
      if (o.oneTear !== undefined) oneTearCells(x, o.oneTear)
    })
    return F
  }
  const starDraw = (x, t, id, o = {}) => {
    if (id === 'stars') return drawStarChar(x, o.x, o.y, o.s, t, { color: STAR.sky, seed: 2, glow: 1.05, ...o })
    if (id === H.id) return hostDraw(x, t, o)
    const opts = { color: signStar(id).color, glyph: o.s >= 150 && o.glyph !== false ? signStar(id).glyph : null, seed: SEEDS[id] || 1, glow: 1, ...o }
    if (id === 'pisces') opts.tips = false
    const r = drawStarChar(x, o.x, o.y, o.s, t, opts)
    if (o.tears) { const F = starFrame(o.x, o.y, o.s, t, opts); inSprite(x, F, () => tearsCells(x, t, o.tears)) }
    if (o.oneTear !== undefined) { const F = starFrame(o.x, o.y, o.s, t, opts); inSprite(x, F, () => oneTearCells(x, o.oneTear)) }
    return r
  }
  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false, glyph: P.s >= 150 ? PIS.glyph : null }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  const PIS_DEF = { x: 948, y: 1660, s: 130 }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 36px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const img = {}
    await Promise.all((cfg.images || []).map(n => new Promise(res => { const i = new Image(); i.onload = () => { img[n] = i; res() }; i.onerror = () => { img[n] = null; res() }; i.src = A + n })))
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const hd = cfg.hook
    const H0 = popText(root, hd.text, { top: hd.top ?? 168, size: hd.size ?? 92, accentSize: hd.accentSize ?? 128, at: -3, gap: 0.01, accentColor: hd.accent || HC, fit: true })
    const HEADS = beats.map(b => b.head ? popText(root, b.head, { top: b.top ?? 176, size: b.size ?? 84, accentSize: b.accentSize ?? 116, at: b.t0 + 0.12, gap: 0.07, accentColor: b.accent || HC, fit: true }) : null)
    const FH = cfg.finaleHead ? popText(root, cfg.finaleHead, { top: 176, size: 84, accentSize: 116, at: FIN + 0.1, gap: 0.07, accentColor: HC, fit: true }) : null
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: cfg.boxY ?? 1420, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, H, HC)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const S0 = { host: hostDraw, star: starDraw, pisces, img, HOST, HC, H }

    function finaleDefault(t, ok) {
      const S = { ...S0, u: t - FIN, t0: FIN, t1: STORY_END, ok, LAST_HOPS }
      if (cfg.finale) cfg.finale(x, t, S)
      else {
        shadow(x, 540, 1120, 260 * ok)
        hostDraw(x, t, { x: 540, y: 900, s: 300, pop: ok, mood: 'happy', look: [0, 0], hops: [FIN + 0.1, ...(cfg.last.who === 'host' ? LAST_HOPS : [T.last + 1.2])] })
      }
      if (cfg.last.who === 'stars' && !cfg.noStars) {
        const sk = pop01(t, FIN + 0.15, 0.38, 2.1) * ok
        if (sk > 0.01) drawStarChar(x, 170, 1255, 160, t, { color: STAR.sky, mood: t > T.last + 1.6 ? 'happy' : 'neutral', look: [1, -0.3], hops: [FIN + 0.45, ...LAST_HOPS], pop: sk, seed: 2, glow: 1.05 })
      }
      if (!cfg.noFinalePisces) {
        const P = cfg.finalePis || { x: 905, y: 1240, s: 150 }
        const pk = pop01(t, FIN + 0.3, 0.36, 2.2) * ok
        if (pk > 0.01) pisces(x, t, { ...P, pop: pk, hops: [FIN + 0.6, T.last + 1.0] }, 3, 'happy', [-1, -1])
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 2.5))
        const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
        drawSky(x, t, cfg.sky ? { ...base, ...cfg.sky } : base)
        const sh = cfg.shake ? cfg.shake(t) : 0
        x.save(); x.translate(0, sh)
        // hook
        if (t < hookDur) { x.save(); x.translate(0, cfg.dy ?? 0); hd.draw(x, t, { ...S0, u: t, t0: 0, t1: hookDur, i: -1 }); x.restore() }
        // beats
        beats.forEach((b, i) => {
          if (t < b.t0 || t >= b.t1) return
          const punch = b.noPunch ? 1 : 1 + 0.06 * (1 - ease.outCubic(prog(t, b.t0, b.t0 + 0.28)))
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          const S = { ...S0, u: t - b.t0, t0: b.t0, t1: b.t1, i }
          const dy = b.dy ?? cfg.dy ?? 0
          x.save(); x.translate(0, dy)
          b.draw(x, t, S)
          // Pisces in the background with tissues, crying a little more each beat
          if (b.pis !== false) {
            const P = { ...PIS_DEF, ...(b.pis || {}) }
            const pk = pop01(t, b.t0 + (P.at ?? 0.3), 0.3, 2) * outK(t, [b.t1 - 0.15, b.t1])
            if (pk > 0.01) {
              if (!P.noTissues) tissues(x, P.x - P.s * 0.74, P.y - dy + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
              pisces(x, t, { ...P, y: P.y - dy, pop: pk }, P.tears ?? Math.min(3, 1 + Math.floor(i * 2 / Math.max(1, beats.length - 1))), P.mood || (i === beats.length - 1 ? 'sparkle' : 'wide'), P.look || [-1, -0.6])
            }
          }
          // bubbles
          for (const s of b.says || []) {
            const who = s.who === 'host' ? H.id : s.who
            const tag = s.tag !== undefined ? s.tag : who ? tagOf(who) : null
            bubble(x, t, s.x, s.y, b.t0 + s.at, b.t0 + (s.until ?? b.dur), s.text, { size: s.size || 36, tail: s.tail ?? 0, col: s.col || BONE, tag, tagCol: who ? colOf(who) : GOLD, think: s.think, maxW: s.maxW || 760 })
          }
          x.restore()
          x.restore()
        })
        // finale
        if (t >= FIN) finaleDefault(t, popOut(t, T.out))
        x.restore()
        drawRec(x, t, outK(t, T.out))
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.top) cfg.top(tx, t, S0)
        H0.update(t, outK(t, [hookDur - 0.2, hookDur]))
        HEADS.forEach((h, i) => h && h.update(t, outK(t, [beats[i].t1 - 0.15, beats[i].t1])))
        if (FH) FH.update(t, outK(t, T.out))
        box1.update(t)
        bug.update(t, outK(t, T.out))
        // white flash on the hard cuts (not the card cut)
        let fl = 0
        beats.forEach(b => { if (b.flash !== false && b.t0 !== CUT_T && t >= b.t0 && t < b.t0 + 0.12) fl = 1 - (t - b.t0) / 0.12 })
        if (FIN !== CUT_T && t >= FIN && t < FIN + 0.12) fl = Math.max(fl, 1 - (t - FIN) / 0.12)
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // no Align card transition (owner's change, 4 Nov): every beat boundary is the film's own jump cut
  const CUT_T = -1
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' })]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const words = s => s.replace(/[|*]/g, ' ').trim().split(/\s+/).length
  const CUES = [
    ['pop', 0.02, 1174.66, 0.04, 0], ['glitter', 0.02, 0.4],
    ...(cfg.hook.cues || []),
    ...beats.flatMap((b, i) => [
      ...(b.t0 !== CUT_T ? [['whoosh', r3(b.t0 - 0.08), 0.28, 0.035], ['tick', b.t0, 0.05]] : []),
      ...(b.head ? wordPops(b.t0 + 0.12, Math.min(8, words(b.head)), 0.07, i) : []),
      ...(b.pis !== false ? [['pluck', r3(b.t0 + 0.32), 2349.32, 0.012, 0.3, 0.6]] : []),
      ...(b.says || []).flatMap((s, j) => [['pop', r3(b.t0 + s.at), NOTE[(i * 2 + j) % 7], 0.04, (s.x - 540) / 700], ['pop', r3(b.t0 + s.at + 0.06), NOTE[(i * 2 + j + 2) % 7] * 2, 0.02, (s.x - 540) / 700]]),
      ...(b.cues || []).map(c => [c[0], r3(c[1] + b.t0), ...c.slice(2)]),
    ]),
    ...(FIN !== CUT_T ? [['whoosh', r3(FIN - 0.08), 0.28, 0.035], ['tick', FIN, 0.05]] : []),
    ['pop', r3(FIN + 0.12), 880, 0.035, -0.3], ['pop', r3(FIN + 0.32), 987.77, 0.03, 0.4], ['glitter', r3(FIN + 0.3), r3(FIN + 0.7)],
    ...(cfg.finaleCues || []).map(c => [c[0], r3(c[1] + FIN), ...c.slice(2)]),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...endcardCues(STORY_END, { short: true }),
  ]
  return { DURATION, SCENES, CUES, T, STORY_END }
}

// ── shared props used by several episodes
/** a big pixel keyring (the account's keys); swing = rotation */
export function keyring(x, cx, cy, s = 1, swing = 0) {
  x.save(); x.translate(cx, cy); x.rotate(swing); x.scale(s, s)
  // the ring
  for (let a = 0; a < 20; a++) { const q = a / 20 * Math.PI * 2; R(x, INK, Math.cos(q) * 30 - 8, Math.sin(q) * 30 - 8, 16, 16) }
  for (let a = 0; a < 20; a++) { const q = a / 20 * Math.PI * 2; R(x, '#d8d2e8', Math.cos(q) * 30 - 5, Math.sin(q) * 30 - 5, 10, 10) }
  // three keys hanging off the bottom
  const KEY = ['.GGG.', 'GG.GG', '.GGG.', '..G..', '..G..', '..GG.', '..G..', '..GG.']
  ;[[-0.5, GOLD], [0, '#c9c3dd'], [0.5, '#e88a5a']].forEach(([d, c], i) => {
    x.save(); x.translate(Math.sin(d) * 30, 30 + Math.cos(d) * 4); x.rotate(d * 0.8 + Math.sin(swing * 3 + i) * 0.1)
    drawBits(x, KEY, { G: c }, 0, 34, 7)
    x.restore()
  })
  x.restore()
}
/** a door frame; open 0…1 swings the door away (drawn as a narrowing slab) */
export function door(x, cx, by, open = 0, col = '#a8603a', w = 260, h = 470) {
  box(x, cx - w / 2 - 16, by - h - 16, w + 32, h + 16, '#3a2d58', { b: 6 })
  R(x, '#ffe7b0', cx - w / 2, by - h, w, h)
  glow(x, cx, by - h / 2, 320, 0.18 * open, '255,231,176')
  const dw = w * (1 - 0.82 * open)
  box(x, cx - w / 2, by - h, dw, h, col, { b: 5, hi: 'rgba(255,255,255,0.12)' })
  R(x, GOLD, cx - w / 2 + dw - 30, by - h / 2, 14, 14)
}
/** a tiny pixel car (bottom of the wheels at cy) */
export function car(x, cx, cy, col, w = 420, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  const h = 100
  box(x, -w * 0.3, -h - 78, w * 0.6, 84, col, { b: 6 })
  R(x, '#bfe8ff', -w * 0.26, -h - 68, w * 0.23, 58); R(x, '#bfe8ff', w * 0.03, -h - 68, w * 0.23, 58)
  box(x, -w / 2, -h, w, h - 20, col, { b: 6, hi: 'rgba(255,255,255,0.25)' })
  R(x, '#fff1a8', w / 2 - 26, -h + 18, 18, 16); R(x, RED, -w / 2 + 6, -h + 18, 16, 16)
  for (const d of [-0.3, 0.3]) { R(x, INK, d * w - 36, -40, 72, 52); R(x, '#5a5470', d * w - 16, -22, 32, 18) }
  x.restore()
}
