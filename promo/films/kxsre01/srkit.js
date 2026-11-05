// SILENT REVIEW: EXTENDED kit (star_talk posts kxsre01–kxsre06, promo/films/month2/m42.md). Lives in kxsre01; the
// other five films import it from here (read-only for everyone else).
// It continues Silent Review Vol. 1–2 (trsilent*, nsre*): the same pink bug, fairy lights, closed captions, muted-speaker
// badge, single tear and THE VERDICT card. Those kits import endcard.js / cardfx.js, which Month 2 forbids, so the
// format pieces are copied in here. The shared modules (startalk.js, lesson.js, sky.js, hookkit.js) are imported read-only.
//
// The format (60 s, no end card, no card transition): a sign reviews a WHOLE DATE silently, course by course. Faces only:
// the reviewer never speaks, closed captions narrate the face ("[ one eyebrow ]"). The date may talk (speech bubbles).
//   0.0–3.0     HOOK: frame 0 is mid-chaos (cfg.hook.draw) and mid-whip-zoom, the hook line already slammed (hookkit);
//               at 0.55 a RECORD SCRATCH freezes it with the promise as its caption ("wait for the *final score.*") and the
//               red CAUGHT circle lands (cfg.hook.circle); 2.25 a glitchy ◀◀ REWIND into course 1.
//   3.0–48.5    four COURSES (chapter sticker each). Inside a course, cfg shots cut between the wide two-shot and close-ups
//               (jump cuts with a punch); CC lines narrate; Pisces the server pops in with a tray and cries; the course's
//               mini score card slams in at the end.
//   48.5–60.0   THE VERDICT: the camera pulls back, the card rises with four rows and a stamped total, the mute badge
//               pops off (still no words: just a grin), and the last line lands at ~58.3 and holds to the hard cut.
//               cfg.loop: hookkit loopBack cross-blends frame 0 over the last 0.4 s instead (seamless replay).
//
//   makeSR(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.reviewer, cfg.date (sign ids), cfg.accent, cfg.hookLine ('Silent review: | *a whole first date.*')
//     cfg.promise ('wait for the final score'), cfg.plate ('VIRGO · CRITIC')
//     cfg.venue(x, t, P) backdrop in world space (behind the cast); cfg.table(x, t, P) props on the table (world space)
//     cfg.hook: { draw(x, t, S) the mid-chaos tableau (world space), circle: { x, y, r, label, arrow } (screen) }
//     cfg.hookFace(t) / cfg.hookDate(t) the cast in the hook; cfg.fx: [{ scene, cues }] extra hookkit effects
//     cfg.courses: [{ title, shots: [[u, 'wide' | 'rev' | 'date' | 'tight' | 'two']], cc: [[u, '[ … ]']],
//                     face: [[u, preset, extra?]], date: (u, t) → { mood, look, hops, x, y, s }, bubbles: [[u0, u1, text]],
//                     card: '4/10' | 4 (stars), pis: { at, tears, mood }, draw(x, t, P, S) world extras, over(tx, t, P),
//                     cues: [[kind, u, …]] }] × 4
//     cfg.verdict: { rows: [[label, 0…5 | '*text*'] × 4], total: '9/10' }, cfg.last, cfg.noPis (Pisces reviews)
//     cfg.over(tx, t, P) screen extras (counters…), cfg.sky
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, signStar, STAR } from '../startalk.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, caught, caughtCues,
  chapter, chapterCues, glitch, glitchCues, loopBack, loopCues } from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', SKYB = '#8fe3ff', CREAM = '#fff6ea'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_PINK = '#ff7eb6'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const ramp = (t, a, b, v0, v1) => lerp(v0, v1, ease.inOutCubic(prog(t, a, b)))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline
export const DURATION = 60
export const T = {
  hook: [0, 3.0], rec: [0.55, 1.35], h0Out: [2.75, 2.95], rewind: [2.25, 2.95],
  courses: [[3.0, 14.0], [14.0, 25.0], [25.0, 36.0], [36.0, 48.5]],
  card: 1.9,                         // the mini score card slams this long before a course ends
  verdict: 48.5, cam: [48.5, 49.1], cardIn: [49.0, 49.5], rows: [50.0, 51.2, 52.4, 53.6], total: 55.2,
  badgeOff: 56.6, pisIn: 50.4, dateUp: 49.6, last: 58.6,
  loop: [59.6, 60.0],
}
const SEGS = [...T.courses, [T.verdict, DURATION]]

// ── the world (camera space): the reviewer behind the table (left of centre), the date at the right, facing it
export const REV = { x: 400, y: 905, s: 330 }
export const DATE = { x: 812, y: 950, s: 250 }
export const TABLE = { back: 1060, front: 1290, lip: 1322 }
const FY = 900
const PIS_W = { x: 150, y: 1000, s: 160 }          // Pisces the server, popping up at the left end of the table

// ── drawing helpers (same as the Vol. 2 kit)
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
export const RSTAR = ['...S...', '..SSS..', 'SSSSSSS', '.SSSSS.', '.SS.SS.', 'SS...SS']
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, rise = 200, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * rise
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, shadow = true } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4) }
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function glow(x, cx, cy, r, rgb, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
}
/** a pixel speech bubble (canvas), popping at t0, fading by t1; tail −1…1 along the bottom */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, maxW = 620 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = wrap(x, text, maxW)
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 44, h = size * 1.15 * lines.length + 26
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((ln, i) => x.fillText(ln, 0, (i - (lines.length - 1) / 2) * size * 1.15 + 2))
  x.restore()
}
function wrap(x, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let cur = ''
    for (const w of para.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (x.measureText(nx).width > maxW && cur) { out.push(cur); cur = w } else cur = nx }
    out.push(cur)
  }
  return out
}
/** a small handwritten note (serif italic) */
export function scrawl(x, text, cx, cy, { size = 30, col = '#2a2a6a', align = 'center', alpha = 1, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.font = `italic 500 ${size}px ${SERIF}`; x.fillStyle = col; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(text, 0, 0); x.restore()
}
/** a bowl / plate on the table: kind 'plate' | 'bowl'; food: a draw(x) callback in local coords */
export function plate(x, cx, cy, w, { kind = 'plate', col = '#f4efe6', food = null } = {}) {
  shadow(x, cx, cy + 10, w * 1.1, 0.3)
  if (kind === 'bowl') { box(x, cx - w / 2, cy - w * 0.28, w, w * 0.32, col, { b: 5, lo: '#d9d0c0' }); R(x, '#c9bba4', cx - w / 2, cy - w * 0.28, w, 6) }
  else { R(x, INK, cx - w / 2 - 5, cy - 14, w + 10, 22); R(x, col, cx - w / 2, cy - 10, w, 14); R(x, '#ffffff', cx - w / 2 + 8, cy - 10, w * 0.4, 4) }
  if (food) { x.save(); x.translate(cx, cy - (kind === 'bowl' ? w * 0.28 : 10)); food(x); x.restore() }
}
/** a pixel dumpling (local coords, centred) */
export function dumpling(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -34, -20, 68, 34); R(x, INK, -26, -28, 52, 10)
  R(x, '#fbf3df', -30, -16, 60, 26); R(x, '#fbf3df', -22, -24, 44, 10)
  for (let i = 0; i < 4; i++) R(x, '#e2d2b0', -18 + i * 11, -26, 4, 10)
  R(x, '#ffffff', -22, -12, 10, 6)
  x.restore()
}
/** a mug with steam (cx = centre, cy = bottom) */
export function mug(x, t, cx, cy, s = 1, col = '#e8605c', steam = true) {
  box(x, cx - 34 * s, cy - 70 * s, 68 * s, 70 * s, col, { b: 5, hi: 'rgba(255,255,255,0.25)' })
  R(x, INK, cx + 34 * s, cy - 54 * s, 22 * s, 36 * s); R(x, col, cx + 34 * s, cy - 46 * s, 12 * s, 20 * s)
  if (steam) for (let i = 0; i < 3; i++) { const p = ((t * 0.8 + i / 3) % 1); x.save(); x.globalAlpha = 0.45 * Math.sin(Math.PI * p); R(x, BONE, cx - 16 * s + i * 14 * s + Math.sin(t * 3 + i) * 6, cy - 84 * s - p * 70 * s, 8 * s, 18 * s); x.restore() }
}

// ── star sprite frame (mirrors startalk.js) so overlays sit on the sprite through hops and squash
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
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = SKYB; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
    ctx.fillStyle = SKYB; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
export function singleTear(ctx, t, t0) {
  const u = t - t0
  if (u < 0 || u > 3.2) return
  const well = clamp(u / 0.35), roll = ease.inOutQuad(clamp((u - 0.35) / 1.9))
  const x0 = 10.4, y0 = 21.6, y = y0 + roll * 10.5, xx = x0 - roll * 1.2
  const a = 1 - clamp((u - 2.6) / 0.6)
  ctx.save(); ctx.globalAlpha *= a
  if (roll > 0) { ctx.fillStyle = 'rgba(143,227,255,0.55)'; ctx.fillRect(xx + 0.2, y0 + 0.6, 0.8, y - y0) }
  const w = 1.4 + 0.9 * well, h = 1.6 + 1.4 * well
  ctx.fillStyle = INK; ctx.fillRect(xx - 0.35, y - 0.35, w + 0.7, h + 0.7)
  ctx.fillStyle = SKYB; ctx.fillRect(xx, y, w, h)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(xx + 0.2, y + 0.2, 0.6, 0.6)
  ctx.restore()
}
export function browsCells(ctx, { l = 0, r = 0, sl = 0, sr = 0 } = {}) {
  for (const side of [-1, 1]) {
    const raise = side < 0 ? l : r, slant = side < 0 ? sl : sr
    for (let k = 0; k < 5; k++) {
      const inner = k / 4
      const cx = side < 0 ? 11.2 + k * 1.05 : 24.8 - k * 1.05
      const cy = 13.1 - raise * 2.0 - slant * 1.7 * (inner - 0.5)
      ctx.fillStyle = INK; ctx.fillRect(cx - 0.75, cy - 0.85, 1.55, 1.8)
    }
  }
}
export function mouthCells(ctx, t, kind) {
  if (!kind) return
  const p = (i, j, c = INK) => { ctx.fillStyle = c; ctx.fillRect(i, j, 1, 1) }
  if (kind === 'flat') { ctx.fillStyle = INK; ctx.fillRect(16, 25.3, 4, 1) }
  else if (kind === 'tight') { ctx.fillStyle = INK; ctx.fillRect(16.6, 25.4, 2.8, 0.75) }
  else if (kind === 'smile') { for (const [i, j] of [[15, 24.8], [16, 25.8], [17, 26.2], [18, 26.2], [19, 25.8], [20, 24.8]]) p(i, j) }
  else if (kind === 'smirk') { for (const [i, j] of [[16, 25.6], [17, 25.6], [18, 25.4], [19, 25], [20, 24.4]]) p(i, j) }
  else if (kind === 'grin') { ctx.fillStyle = INK; ctx.fillRect(15, 24.6, 6, 2.6); ctx.fillStyle = '#fff6ea'; ctx.fillRect(15.8, 25, 4.4, 0.9); ctx.fillStyle = '#c4405e'; ctx.fillRect(16.4, 26.1, 3.2, 0.7) }
  else if (kind === 'o') { ctx.fillStyle = INK; ctx.fillRect(16.5, 24.6, 3, 3); ctx.fillStyle = '#7a2340'; ctx.fillRect(17.2, 25.3, 1.6, 1.6) }
  else if (kind === 'scream') { ctx.fillStyle = INK; ctx.fillRect(15.4, 24, 5.2, 5.4); ctx.fillStyle = '#7a2340'; ctx.fillRect(16.2, 24.8, 3.6, 3.8); ctx.fillStyle = '#ff8fa8'; ctx.fillRect(16.6, 27.2, 2.8, 1.2) }
  else if (kind === 'wobble') { for (let k = 0; k < 5; k++) p(15.5 + k, 25.4 + 0.55 * Math.sin(t * 26 + k * 1.9)) }
  else if (kind === 'chew') { const o = Math.abs(Math.sin(t * 9)); ctx.fillStyle = INK; ctx.fillRect(16, 25 + 0.3 * o, 4, 0.8 + 1.2 * o) }
}

// ── face presets: cfg.courses[i].face = [[u, preset, extra?], …] (each holds until the next)
export const FACES = {
  poker: () => ({}),
  side: () => ({ look: [1, 0] }),
  eyebrow: (u) => ({ brows: { l: ramp(u, 0, 0.25, 0, 1), r: -0.25, sl: ramp(u, 0, 0.25, 0, -0.7), sr: -0.3 } }),
  suspicious: (u) => ({ mood: 'squint', look: [Math.sin(u * 2.2) > 0 ? 1 : 0.4, 0], brows: { l: -0.4, r: -0.4, sl: -0.9, sr: -0.9 }, mouth: 'tight' }),
  squint: (u) => ({ mood: 'squint', look: [Math.sin(u * 1.6), 1], brows: { l: -0.2, r: -0.2, sl: -0.5, sr: -0.5 } }),
  blink: (u) => ({ blink: clamp(Math.sin(Math.PI * clamp(u / 1.6))) * 1.0, brows: { l: -0.2, r: -0.2, sl: -0.3, sr: -0.3 }, mouth: 'tight' }),
  wide: (u) => ({ mood: 'wide', look: [0.5, 0], brows: { l: ramp(u, 0, 0.12, 0.3, 1), r: ramp(u, 0, 0.12, 0.3, 1), sl: 0.2, sr: 0.2 }, mouth: 'o', squash: -0.04 * Math.exp(-u * 6) }),
  nod: (u, P, e = {}) => ({ look: [e.lx ?? 0.6, 0.4], brows: { l: 0.3, r: 0.3, sl: 0, sr: 0 }, nod: [{ at: P.t0 + P.fu, n: e.n ?? 3, period: 0.85, amp: 22 }] }),
  fight: (u) => ({ look: [0.8, 0], brows: { l: 0.4, r: 0.1, sl: 0.3, sr: 0 }, mouth: Math.sin(u * 7) > 0.3 ? 'smirk' : 'tight', blush: 0.4, shake: 0.8 }),
  smile: () => ({ mood: 'happy', mouth: 'smile', brows: { l: 0.4, r: 0.4, sl: 0.4, sr: 0.4 } }),
  grin: () => ({ mood: 'happy', mouth: 'grin', brows: { l: 0.5, r: 0.5, sl: 0.3, sr: 0.3 } }),
  touched: (u) => ({ look: [0.6, 0], brows: { l: 0.35, r: 0.35, sl: ramp(u, 0, 0.3, 0, 0.95), sr: ramp(u, 0, 0.3, 0, 0.95) }, mouth: 'wobble', blush: 0.7, shake: 1.4 }),
  tear: (u, P) => ({ look: [0.5, 0], brows: { l: 0.35, r: 0.35, sl: 0.95, sr: 0.95 }, mouth: 'wobble', blush: 0.8, shake: 1.6, tear: P.t0 + P.fu + 0.15 }),
  scream: (u) => ({ mood: 'wide', brows: { l: 1, r: 1, sl: 0.6, sr: 0.6 }, mouth: 'scream', shake: 5, squash: -0.05 }),
  clench: (u) => ({ mood: 'squint', brows: { l: -0.6, r: -0.6, sl: -1, sr: -1 }, mouth: 'tight', shake: 2.4, squash: 0.05 }),
  chew: (u) => ({ mood: 'squint', mouth: 'chew', brows: { l: 0.1, r: -0.2, sl: -0.3, sr: -0.2 } }),
  sob: () => ({ mood: 'sparkle', mouth: 'wobble', tears: 2, brows: { l: 0.4, r: 0.4, sl: 1, sr: 1 }, shake: 1.2 }),
  heart: () => ({ mood: 'heart', mouth: 'smile' }),
  cheer: (u, P) => ({ mood: 'happy', mouth: 'grin', brows: { l: 0.7, r: 0.7, sl: 0.3, sr: 0.3 }, hops: Array.from({ length: 8 }, (_, k) => P.t0 + P.fu + k * 0.45) }),
  tilt: (u) => ({ tilt: ramp(u, 0, 0.3, 0, -0.16), look: [1, -0.2], brows: { l: 0.6, r: -0.1, sl: 0.2, sr: -0.4 } }),
}

// ── the format bug: "SILENT REVIEW" (Inter 800 small caps, letter-spaced) top-left 56 px, + "EXTENDED"
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'SILENT<span style="color:rgba(255,255,255,0.6)">&nbsp;REVIEW&nbsp;·&nbsp;EXTENDED</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(out) } }
}
// ── closed captions: a dark CC strip, Space Mono, "[ … ]"
function buildCC(root, items) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1560px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '14px 30px 16px', background: 'rgba(6,4,18,0.9)', borderRadius: '8px', font: `700 44px ${MONO}`, color: BONE, letterSpacing: '0.01em', whiteSpace: 'nowrap', boxShadow: '0 0 0 3px rgba(239,230,214,0.12)', transformOrigin: '50% 50%' }, wrap)
  let cur = null
  return {
    update(t) {
      const it = items.find(c => t >= c.a && t < c.b)
      wrap.style.display = it ? 'flex' : 'none'
      if (!it) return
      if (cur !== it) { st.innerHTML = it.text.replace(/\*([^*]+)\*/g, `<span style="color:${GOLD}">$1</span>`); cur = it; st.style.fontSize = '44px'; const w = st.offsetWidth; if (w > 1000) st.style.fontSize = (44 * 1000 / w).toFixed(1) + 'px' }
      const k = prog(t, it.a, it.a + 0.08), o = outK(t, [it.b - 0.08, it.b])
      st.style.opacity = String(clamp(k) * o)
      st.style.transform = `scale(${(0.94 + 0.06 * ease.outCubic(k)).toFixed(4)})`
    },
  }
}
// ── the progress bar: 5 segments (four courses + the verdict) under the bug
function drawBar(x, t, col) {
  const X0 = 56, X1 = 1024, GAP = 10, n = SEGS.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120, Hh = 8
  x.save()
  SEGS.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.25)', sx, Y, w, Hh)
    const f = prog(t, a, b)
    if (f > 0) R(x, i === n - 1 ? col : BONE, sx, Y, w * f, Hh)
  })
  x.restore()
}

// ── the set
export function fairyLights(x, t, y0 = 520) {
  const pts = 15
  x.save()
  x.strokeStyle = 'rgba(27,18,54,0.9)'; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 60; i++) { const u = i / 60, X = -20 + u * 1120, Y = y0 + 70 * Math.sin(Math.PI * u); i ? x.lineTo(X, Y) : x.moveTo(X, Y) }
  x.stroke()
  for (let i = 0; i < pts; i++) {
    const u = (i + 0.5) / pts, X = -20 + u * 1120, Y = y0 + 70 * Math.sin(Math.PI * u) + 14
    const col = [GOLD, PINK, '#9fe6b0', LAV][i % 4], tw = 0.75 + 0.25 * Math.sin(t * 2.4 + i * 1.7)
    glow(x, X, Y, 46, i % 4 === 1 ? '255,143,177' : '242,199,92', 0.16 * tw)
    R(x, INK, X - 9, Y - 12, 18, 26); R(x, col, X - 6, Y - 6, 12, 17); R(x, '#fff6ea', X - 4, Y - 4, 4, 4)
    R(x, '#3a2d66', X - 5, Y - 14, 10, 7)
  }
  x.restore()
}
/** the restaurant table: a tablecloth top, the front lip and the cloth hanging down */
function table(x, cloth = '#f1e6d2', check = '#e2c9a3') {
  x.save()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-60, TABLE.back - 8); x.lineTo(1140, TABLE.back - 8); x.lineTo(1220, TABLE.front + 4); x.lineTo(-140, TABLE.front + 4); x.closePath(); x.fill()
  x.fillStyle = cloth; x.beginPath(); x.moveTo(-52, TABLE.back); x.lineTo(1132, TABLE.back); x.lineTo(1210, TABLE.front); x.lineTo(-130, TABLE.front); x.closePath(); x.fill()
  x.fillStyle = check
  for (const v of [0.3, 0.65]) { const yy = lerp(TABLE.back, TABLE.front, v); x.fillRect(lerp(-52, -130, v), yy, lerp(1184, 1340, v), 6) }
  for (let i = 0; i < 9; i++) { x.fillRect(lerp(40, -20, 0.5) + i * 140, TABLE.back, 6, TABLE.front - TABLE.back) }
  x.restore()
  R(x, INK, -400, TABLE.front, 1880, TABLE.lip - TABLE.front + 8)
  R(x, cloth, -400, TABLE.front + 4, 1880, TABLE.lip - TABLE.front - 6)
  R(x, '#ffffff', -400, TABLE.front + 4, 1880, 5)
  R(x, check, -400, TABLE.lip + 2, 1880, 1400)
  for (let i = 0; i < 14; i++) R(x, 'rgba(27,18,54,0.12)', -400 + i * 140 + 60, TABLE.lip + 2, 10, 1400)
}
function candle(x, t, cx, cy) {
  const fl = 0.8 + 0.2 * Math.sin(t * 13) * Math.sin(t * 7.3)
  glow(x, cx, cy - 70, 150, '255,200,120', 0.22 * fl)
  box(x, cx - 14, cy - 60, 28, 60, CREAM, { b: 5 })
  R(x, INK, cx - 2, cy - 74, 4, 14)
  R(x, '#ffb347', cx - 7, cy - 92 - 4 * fl, 14, 20 + 4 * fl); R(x, '#fff1a8', cx - 3, cy - 86 - 2 * fl, 6, 10)
}
export function tissueBox(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 5, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.2 - 4, cy - s * 0.3 - 4, s * 0.4 + 8, 8)
  R(x, INK, cx - s * 0.14 - 4, cy - s * 0.3 - s * 0.36 - 4, s * 0.28 + 8, s * 0.38 + 4)
  R(x, '#ffffff', cx - s * 0.14, cy - s * 0.3 - s * 0.36, s * 0.28, s * 0.38)
}
function muteBadge(x, cx, cy, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -40, -40, 80, 80); R(x, BONE, -34, -34, 68, 68)
  drawBits(x, ['..S.....', '.SS.X..X', 'SSS..XX.', 'SSS..XX.', '.SS.X..X', '..S.....'], { S: INK, X: RED }, 0, 0, 7, { outline: null })
  x.restore()
}
function nameplate(x, text) {
  if (!text) return
  x.save(); x.font = `800 30px ${INTER}`
  const w = x.measureText(text).width + 0.22 * 30 * text.length + 60, cy = TABLE.lip + 88
  box(x, REV.x - w / 2, cy - 30, w, 60, '#d9a94a', { b: 7, hi: '#f2cf7a', lo: '#a87a2c' })
  x.letterSpacing = '0.22em'
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, REV.x + 0.11 * 30, cy + 2)
  x.restore()
}
/** the default venue: a warm restaurant wall with two windows of night city lights */
export function defaultVenue(x, t, { wall = '#3a2348', trim = '#2a1838', win = '#132046' } = {}) {
  R(x, wall, -300, 300, 1680, 800); R(x, trim, -300, 960, 1680, 110)
  for (const wx of [40, 760]) {
    box(x, wx, 600, 280, 300, win, { b: 8 })
    for (let i = 0; i < 9; i++) { const lx = wx + 20 + (i * 67) % 240, ly = 640 + (i * 41) % 220; R(x, i % 3 ? GOLD : PINK, lx, ly, 10, 10 + (i % 2) * 6) }
    R(x, INK, wx + 136, 600, 8, 300); R(x, INK, wx, 746, 280, 8)
  }
  glow(x, 540, 820, 520, '255,220,170', 0.14)
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeSR(cfg) {
  const REVS = signStar(cfg.reviewer), PIS = signStar('pisces'), DAT = signStar(cfg.date)
  const C = cfg.courses
  // absolute course windows
  const CW = T.courses.map(([a, b], i) => ({ a, b, i, cardAt: b - T.card }))
  // the CC timeline
  const CC = []
  C.forEach((c, i) => {
    const { a, cardAt } = CW[i]
    c.cc.forEach(([u, text], j) => CC.push({ a: r3(a + u), b: r3(j + 1 < c.cc.length ? a + c.cc[j + 1][0] - 0.04 : cardAt - 0.05), text }))
  })
  if (cfg.hookCC) CC.unshift({ a: 1.0, b: T.hook[1] - 0.05, text: cfg.hookCC })

  function phaseAt(t) {
    if (t < T.hook[1]) return { ph: 'hook', i: -1, u: t, t0: 0, t1: T.hook[1] }
    for (const w of CW) if (t < w.b) return { ph: 'course', i: w.i, u: t - w.a, t0: w.a, t1: w.b, card: t >= w.cardAt, cu: t - w.cardAt }
    return { ph: 'verdict', i: 4, u: t - T.verdict, t0: T.verdict, t1: DURATION }
  }
  function shotAt(P) {
    if (P.ph !== 'course') return { kind: P.ph === 'hook' ? 'wide' : 'verdict', since: P.u, at: P.t0 }
    const sh = C[P.i].shots || [[0, 'wide']]
    let cur = sh[0], at = sh[0][0]
    for (const s of sh) if (P.u >= s[0]) { cur = s; at = s[0] }
    if (P.card) return { kind: 'wide', since: P.cu, at: CW[P.i].cardAt }
    return { kind: cur[1], since: P.u - at, at: P.t0 + at }
  }
  // all the shot-change times (for punches, flashes and whooshes)
  const CUT_TIMES = []
  C.forEach((c, i) => { (c.shots || [[0, 'wide']]).forEach(([u]) => CUT_TIMES.push(r3(CW[i].a + u))); CUT_TIMES.push(r3(CW[i].cardAt)) })

  function faceAt(t, P) {
    const BASE = { mood: 'neutral', look: [0, 0], brows: { l: 0, r: 0, sl: 0, sr: 0 }, mouth: 'flat', tears: 0 }
    if (P.ph === 'hook') return { ...BASE, ...(cfg.hookFace ? cfg.hookFace(t) : FACES.eyebrow(1)) }
    if (P.ph === 'verdict') {
      const f = { ...BASE, mood: t > T.total + 0.1 ? 'sparkle' : 'happy', look: [0.3, 0], brows: { l: 0.35, r: 0.35, sl: 0.6, sr: 0.6 }, mouth: t > T.badgeOff ? 'grin' : 'smile', tears: t > T.total ? (cfg.noPis ? 3 : 1) : 0, hops: [T.total + 0.05, T.total + 0.5, T.badgeOff + 0.1] }
      return cfg.verdictFace ? cfg.verdictFace(t, f) : f
    }
    const seq = C[P.i].face || [[0, 'poker']]
    let cur = seq[0]
    for (const s of seq) if (P.u >= s[0]) cur = s
    const fu = cur[0], fn = FACES[cur[1]] || FACES.poker
    const f = { ...BASE, ...fn(P.u - fu, { ...P, fu }, cur[2] || {}) }
    if (cfg.noPis) f.tears = Math.max(f.tears || 0, C[P.i].pis?.tears ?? 1)
    return f
  }

  function drawReviewer(x, t, P, F) {
    let dy = 0, sq = F.squash || 0
    for (const nd of F.nod || []) {
      const u = t - nd.at
      if (u < 0 || u > nd.n * nd.period) continue
      const w = (1 - Math.cos(2 * Math.PI * (u / nd.period))) / 2
      dy += nd.amp * w; sq += 0.03 * w
    }
    const dx = F.shake ? F.shake * Math.sin(t * 57) : 0
    x.save(); x.translate(REV.x + dx, REV.y + dy); x.rotate(F.tilt || 0); x.translate(-REV.x, -REV.y)
    const opts = { color: REVS.color, glyph: REVS.glyph, mood: F.mood, look: F.look, blink: F.blink, blush: F.blush, hops: F.hops, squash: sq, seed: 3, glow: 1.1, zzz: false }
    drawStarChar(x, REV.x, REV.y, REV.s, t, opts)
    const SF = starFrame(REV.x, REV.y, REV.s, t, opts)
    inSprite(x, SF, () => {
      if (F.brows) browsCells(x, F.brows)
      mouthCells(x, t, F.mouth)
      if (F.tears) tearsCells(x, t, F.tears)
      for (const t0 of [].concat(F.tear ?? [])) singleTear(x, t, t0)
      if (cfg.wear) cfg.wear(x, t, P, F)
    })
    x.restore()
  }
  const dateDefault = (t, P) => ({ mood: P.ph === 'verdict' ? (t > T.total ? 'heart' : 'wide') : 'happy', look: [-1, 0] })
  function drawDate(x, t, P) {
    const d = { ...dateDefault(t, P), ...(P.ph === 'course' && C[P.i].date ? C[P.i].date(P.u, t, P.t0) : P.ph === 'verdict' && cfg.verdictDate ? cfg.verdictDate(t) : P.ph === 'hook' && cfg.hookDate ? cfg.hookDate(t) : {}) }
    const o = { x: DATE.x, y: DATE.y, s: DATE.s, ...d }
    if (o.hidden) return
    const opts = { color: DAT.color, glyph: DAT.glyph, seed: 7, glow: 1, ...o }
    x.save(); if (o.rot) { x.translate(o.x, o.y); x.rotate(o.rot); x.translate(-o.x, -o.y) }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    if (o.tears || o.brows || o.mouth || o.extra) { const F = starFrame(o.x, o.y, o.s, t, opts); inSprite(x, F, () => { if (o.brows) browsCells(x, o.brows); if (o.mouth) mouthCells(x, t, o.mouth); if (o.tears) tearsCells(x, t, o.tears); if (o.extra) o.extra(x, t) }) }
    x.restore()
  }
  function pisces(x, t, P, tears, mood = 'sparkle', look = [1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  /** Pisces the server: a little towel over one point, a tray */
  function server(x, t, P, k, tears, mood) {
    if (k <= 0.01) return
    const F = pisces(x, t, { ...P, pop: k }, tears, mood, [1, -0.3])
    const tw = P.s * 0.5 * k
    box(x, P.x - tw * 1.1, F.cy + P.s * 0.08 * k, tw * 0.5, tw * 0.22, CREAM, { b: 4 })
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 84px Inter", "800 42px Inter", "800 40px Inter", "800 28px Inter", "800 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 116px 'EB Garamond'", "italic 500 52px 'EB Garamond'", "italic 500 34px 'EB Garamond'", "700 44px 'Space Mono'", "700 30px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const cc = buildCC(root, CC)
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function cam(t, P) {
      const S = shotAt(P)
      const punch = 1 + 0.06 * (1 - ease.outCubic(clamp(S.since / 0.28)))
      let z = 1, fx = 540, fy = FY
      if (S.kind === 'wide') { z = 1.08 + 0.025 * clamp(S.since / 6); fy = 935 }
      else if (S.kind === 'two') { z = 1.12 + 0.02 * clamp(S.since / 4); fx = 600; fy = 930 }
      else if (S.kind === 'rev') { z = 1.42 + 0.05 * clamp(S.since / 4); fx = REV.x + 30; fy = 905 }
      else if (S.kind === 'tight') { z = 1.75 + 0.12 * ease.inOutCubic(clamp(S.since / 3)); fx = REV.x + 10; fy = 900 }
      else if (S.kind === 'date') { z = 1.5 + 0.04 * clamp(S.since / 4); fx = DATE.x - 40; fy = 940 }
      else if (S.kind === 'verdict') { const k = ease.inOutCubic(prog(t, ...T.cam)); z = lerp(1.3, 0.86, k); fx = lerp(REV.x + 30, 560, k); fy = lerp(905, 760, k) }
      return { z: z * punch, fx, fy }
    }

    function world(t, P) {
      if (cfg.venue) cfg.venue(x, t, P); else defaultVenue(x, t)
      fairyLights(x, t)
      drawReviewer(x, t, P, faceAt(t, P))
      drawDate(x, t, P)
      // Pisces the server, popping up at the left end of the table during each course
      if (!cfg.noPis && P.ph === 'hook') server(x, t, { ...PIS_W, ...(cfg.hookPis || {}), hops: [0.2, 1.6, 2.4] }, 1, 2, 'wide')
      if (!cfg.noPis && P.ph === 'course') {
        const pc = C[P.i].pis || {}
        const at = pc.at ?? 1.4, k = pop01(t, P.t0 + at, 0.34, 2) * outK(t, [CW[P.i].cardAt - 0.2, CW[P.i].cardAt])
        server(x, t, { ...PIS_W, ...(pc.pos || {}), hops: [P.t0 + at + 0.3, P.t0 + at + 1.4] }, k, pc.tears ?? Math.min(3, P.i + 1), pc.mood || (P.i ? 'sparkle' : 'wide'))
      }
      table(x, cfg.cloth, cfg.check)
      candle(x, t, 600, 1150)
      if (P.ph === 'hook' || shotAt(P).kind === 'wide') nameplate(x, cfg.plate)
      if (cfg.table) cfg.table(x, t, P)
      if (P.ph === 'course' && C[P.i].draw) C[P.i].draw(x, t, P, { REV, DATE, TABLE })
      if (P.ph === 'hook' && cfg.hook?.draw) cfg.hook.draw(x, t, { REV, DATE, TABLE })
      // the muted-speaker badge by the reviewer's head (pops off at the verdict)
      const mk = pop01(t, -1, 0.3, 2.4)
      if (t < T.badgeOff) muteBadge(x, REV.x - 200, 700, mk * (1 + 0.05 * Math.sin(t * 4)))
      else {
        const u = t - T.badgeOff
        if (u < 1.2) muteBadge(x, REV.x - 200 - 220 * u, 700 - 500 * u + 900 * u * u, 1, u * 7)
      }
    }

    // the speech bubbles: anchored to the date in the world, drawn in screen space and kept inside the frame
    function speech(t, P, Cm) {
      if (P.ph !== 'course') return
      for (const [u0, u1, text, o] of C[P.i].bubbles || []) {
        const wx = o?.x ?? DATE.x - 40, wy = o?.y ?? 690
        let sx = 540 + (wx - Cm.fx) * Cm.z, sy = FY + (wy - Cm.fy) * Cm.z
        tx.font = `800 40px ${INTER}`
        const w = Math.min(600, Math.max(...wrap(tx, text, 600).map(l => tx.measureText(l).width))) + 60
        sx = clamp(sx, w / 2 + 24, 1080 - w / 2 - 24); sy = clamp(sy, 420, 1380)
        bubble(tx, t, sx, sy, P.t0 + u0, P.t0 + u1, text, { size: 40, tail: o?.tail ?? 0.4, maxW: 600 })
      }
    }

    // the mini score card between courses (screen space)
    function miniCard(t, P) {
      if (P.ph !== 'course' || !P.card) return
      const c = C[P.i], u = P.cu
      const k = easeOutBack(prog(u, 0, 0.3), 1.6), o = outK(t, [CW[P.i].b - 0.18, CW[P.i].b])
      const cx = 540, cy = 1320
      tx.save(); tx.translate(lerp(1500, cx, k), cy); tx.rotate(-0.04 + 0.02 * Math.sin(u * 3)); tx.scale(o, o)
      tx.fillStyle = 'rgba(6,4,18,0.5)'; tx.fillRect(-300 + 14, -120 + 16, 600, 240)
      box(tx, -300, -120, 600, 240, BONE, { b: 8 })
      tx.textAlign = 'center'; tx.textBaseline = 'middle'
      tx.font = `700 28px ${MONO}`; tx.fillStyle = INK; tx.fillText(`COURSE ${P.i + 1} · ${c.title}`, 0, -76)
      R(tx, RED, -260, -50, 520, 5)
      const sk = prog(u, 0.32, 0.42)
      if (typeof c.card === 'number') {
        for (let s = 0; s < 5; s++) {
          const pk = pop01(u, 0.35 + s * 0.08, 0.2, 2.6), sx = -176 + s * 88
          drawBits(tx, RSTAR, { S: '#d8ccb6' }, sx, 30, 10, { outline: '#bfb19a' })
          if (s < c.card && pk > 0.01) drawBits(tx, RSTAR, { S: GOLD }, sx, 30, 10 * pk)
        }
      } else if (sk > 0) {
        const sc = lerp(1.8, 1, ease.outCubic(sk)) * (1 + 0.05 * Math.exp(-(u - 0.42) * 8) * Math.sin((u - 0.42) * 40))
        tx.save(); tx.translate(0, 34); tx.rotate(-0.08); tx.scale(sc, sc); tx.globalAlpha = clamp(sk * 2)
        tx.font = `800 104px ${INTER}`; tx.fillStyle = RED; tx.fillText(c.card, 0, 4)
        tx.restore()
      }
      tx.restore()
    }

    // THE VERDICT card (screen space)
    const CARD = { cx: 540, cy: 1325, w: 820, h: 520 }
    function verdict(t) {
      if (t < T.cardIn[0]) return
      const k = easeOutBack(prog(t, ...T.cardIn), 1.25)
      const cy = lerp(CARD.cy + 900, CARD.cy, k), o = cfg.loop ? outK(t, [T.loop[0] - 0.2, T.loop[0] + 0.15]) : 1
      if (o <= 0.01) return
      tx.save(); tx.translate(CARD.cx, cy + (1 - o) * 300); tx.rotate(-0.025)
      const W2 = CARD.w / 2, H2 = CARD.h / 2
      tx.fillStyle = 'rgba(6,4,18,0.5)'; tx.fillRect(-W2 + 16, -H2 + 20, CARD.w, CARD.h)
      box(tx, -W2, -H2, CARD.w, CARD.h, BONE, { b: 8 })
      R(tx, '#e4d8c2', -W2, H2 - 18, CARD.w, 18)
      tx.textBaseline = 'middle'; tx.textAlign = 'center'
      tx.font = `700 30px ${MONO}`; tx.fillStyle = INK; tx.fillText('★  T H E   V E R D I C T  ★', 0, -H2 + 46)
      R(tx, RED, -W2 + 40, -H2 + 78, CARD.w - 80, 5)
      cfg.verdict.rows.forEach(([lab, val], i) => {
        const at = T.rows[i], rk = pop01(t, at, 0.28, 2.2)
        if (rk <= 0.01) return
        const ry = -H2 + 128 + i * 72
        tx.save(); tx.globalAlpha = clamp(rk * 1.5)
        tx.textAlign = 'left'; tx.font = `800 40px ${INTER}`; tx.fillStyle = INK
        const lw = tx.measureText(lab).width, ls = Math.min(1, 380 / lw)
        tx.save(); tx.translate(-W2 + 44, ry); tx.scale(ls, 1); tx.fillText(lab, 0, 0); tx.restore()
        if (typeof val === 'number') {
          for (let s = 0; s < 5; s++) {
            const sk = pop01(t, at + 0.12 + s * 0.07, 0.2, 2.6), sx = W2 - 262 + s * 52
            drawBits(tx, RSTAR, { S: '#d8ccb6' }, sx, ry, 6, { outline: '#bfb19a' })
            if (s < val && sk > 0.01) drawBits(tx, RSTAR, { S: GOLD }, sx, ry, 6 * sk)
          }
        } else {
          const txt = val.replace(/\*/g, '')
          tx.textAlign = 'right'; tx.font = `italic 500 52px ${SERIF}`; tx.fillStyle = RED
          const sc = Math.min(1, 330 / Math.max(1, tx.measureText(txt).width))
          tx.save(); tx.translate(W2 - 40, ry + 2); tx.scale(sc * (0.6 + 0.4 * clamp(rk)), sc * (0.6 + 0.4 * clamp(rk))); tx.fillText(txt, 0, 0); tx.restore()
        }
        R(tx, 'rgba(27,18,54,0.18)', -W2 + 40, ry + 34, CARD.w - 80, 3)
        tx.restore()
      })
      const sk = prog(t, T.total - 0.04, T.total + 0.06)
      if (sk > 0) {
        tx.textAlign = 'left'; tx.font = `800 42px ${INTER}`; tx.fillStyle = INK; tx.fillText('TOTAL', -W2 + 44, H2 - 66)
        const sc = lerp(1.7, 1, ease.outCubic(sk)) * (1 + 0.04 * Math.exp(-(t - T.total) * 8) * Math.sin((t - T.total) * 40))
        tx.save(); tx.translate(W2 - 175, H2 - 68); tx.rotate(-0.12); tx.scale(sc, sc); tx.globalAlpha = clamp(sk * 2)
        tx.font = `800 76px ${INTER}`; tx.textAlign = 'center'
        const tw = tx.measureText(cfg.verdict.total).width + 44
        tx.strokeStyle = RED; tx.lineWidth = 7; tx.strokeRect(-tw / 2, -50, tw, 100)
        tx.fillStyle = RED; tx.fillText(cfg.verdict.total, 0, 4)
        tx.restore()
      }
      tx.restore()
      sparkles(tx, t, CARD.cx + 230, CARD.cy + 170, T.total + 0.02, 12, 170, 1, [GOLD, RED, BONE])
    }
    function verdictCast(t) {
      if (t < T.verdict) return
      const o = cfg.loop ? outK(t, [T.loop[0] - 0.2, T.loop[0] + 0.1]) : 1
      if (cfg.noPis) return
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * o
      if (pk > 0.01) {
        pisces(tx, t, { x: 935, y: 1720, s: 150, pop: pk, hops: [T.pisIn + 0.3, T.total + 0.03, T.total + 0.6, T.last + 0.3] }, 3, 'sparkle', [-1, -1])
        tissueBox(tx, 1010, 1840, 70)
        label(tx, '[ the server is sobbing ]', 700, 1612, { size: 34, col: BONE, alpha: clamp(prog(t, T.total + 0.4, T.total + 0.6)) * o })
      }
    }
    // Pisces leaning in from the right edge during a close-up (screen space)
    function pisLean(t, P) {
      if (cfg.noPis || P.ph !== 'course') return
      const S = shotAt(P)
      if (S.kind !== 'tight' && S.kind !== 'rev') return
      if ((C[P.i].lean ?? (P.i >= 2)) === false) return
      const k = ease.outBack(prog(S.since, 0.5, 0.9)) * outK(t, [CW[P.i].cardAt - 0.2, CW[P.i].cardAt])
      if (k <= 0.01) return
      pisces(tx, t, { x: lerp(1200, 1000, k), y: 1150, s: 170, hops: [S.at + 1.0, S.at + 2.2] }, Math.min(3, P.i + 1), 'sparkle', [-1, -0.8])
    }

    // ◀◀ REWIND: VHS tag + scanlines while the hook rewinds into course 1
    function rewindTag(t) {
      const [a, b] = T.rewind
      if (t < a || t >= b) return
      const u = t - a
      tx.save(); tx.globalAlpha = 0.16; tx.fillStyle = BONE
      for (let i = 0; i < 24; i++) tx.fillRect(0, ((i * 83 + u * 900) % 1920), 1080, 4)
      tx.restore()
      label(tx, '◀◀ REWIND', 980, 1440, { size: 64, col: BONE, align: 'right', font: MONO, alpha: Math.floor(u * 6) % 2 ? 0.55 : 1 })
      label(tx, cfg.rewindSub || 'EARLIER THAT EVENING', 980, 1515, { size: 30, col: GOLD, align: 'right', font: MONO })
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const P = phaseAt(t)
        const tw = t
        drawSky(x, tw, { ...SKY_H, ...(cfg.sky || {}) })
        const dS = t - T.total, shake = dS > 0 && dS < 0.45 ? 14 * Math.exp(-dS * 9) * Math.sin(dS * 60) : 0
        const Cm = cam(tw, P)
        x.save(); x.translate(540, FY + shake); x.scale(Cm.z, Cm.z); x.translate(-Cm.fx, -Cm.fy)
        world(tw, P)
        x.restore()
        drawBar(x, t, BUG_PINK)
        tx.clearRect(0, 0, 1080, 1920)
        pisLean(t, P)
        speech(t, P, { ...Cm, fy: Cm.fy - shake / Cm.z })
        tx.save(); tx.translate(0, shake * 0.5); verdict(t); tx.restore()
        verdictCast(t)
        miniCard(t, P)
        if (P.ph === 'course' && C[P.i].over) C[P.i].over(tx, t, P)
        if (cfg.over) cfg.over(tx, t, P)
        rewindTag(t)
        cc.update(t)
        bug.update(t, 1)
        let fl = 0
        for (const c of CUT_TIMES) if (t >= c && t < c + 0.1) fl = Math.max(fl, 1 - (t - c) / 0.1)
        if (t >= T.total && t < T.total + 0.1) fl = Math.max(fl, 0.6 * (1 - (t - T.total) / 0.1))
        flash.style.opacity = String(0.4 * fl)
        drawGrain(gx, t)
      },
    }
  }
  // ── hookkit effects: frame 0 mid-whip with the hook line slammed, the record scratch + caught circle, the rewind
  //    glitch, one chapter sticker per course, the last line slammed; loopBack for the loops
  const WHIP = { at: -0.2, len: 0.5, from: 1.5, blur: 10 }
  const HOOK = { at: -1, text: cfg.hookLine, top: 210, size: 104, accentColor: cfg.accent || REVS.color, out: T.h0Out }
  const REC = { at: T.rec[0], len: T.rec[1] - T.rec[0], caption: cfg.promise || 'wait for the *final score.*', sub: cfg.recSub || 'you’re probably wondering how we got here', top: 1480 }
  const CAUGHT = { at: T.rec[0] + 0.12, out: [T.rec[1] + 0.6, T.rec[1] + 0.75], arrow: null, label: null, ...(cfg.hook?.circle || { x: 520, y: 900, r: 170 }) }
  const GL = { at: T.rewind[0], len: 0.5, dialog: false, amp: 0.7 }
  const CHAPS = C.map((c, i) => ({ at: CW[i].a + 0.05, out: [CW[i].a + 2.9, CW[i].a + 3.05], n: i + 1, title: c.title, y: 170 }))
  const LAST = { at: T.last, text: cfg.last, top: 200, size: 100, accentColor: cfg.accent || REVS.color, ...(cfg.loop ? { out: [T.loop[0] - 0.05, T.loop[0] + 0.1] } : {}) }
  const MAIN = frozen(build, [REC])
  const FX = cfg.fx || []
  const SCENES = [MAIN, whipZoom(WHIP), recordScratch(REC), glitch(GL), ...FX.map(f => f.scene), caught(CAUGHT), ...CHAPS.map(chapter), slamTitle(HOOK), slamTitle(LAST),
    ...(cfg.loop ? [loopBack([MAIN, whipZoom(WHIP), slamTitle(HOOK)], { duration: DURATION })] : [])]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ['tick', 0.0, 0.06], ['pop', 0.02, 987.77, 0.04, 0],
    ...(cfg.hookCues || []),
    ...CC.map(c => ['tick', r3(c.a), 0.035]),
    ...CUT_TIMES.map(c => ['whoosh', r3(c - 0.06), 0.24, 0.028]),
    ...C.flatMap((c, i) => {
      const { a, cardAt } = CW[i]
      const pisAt = c.pis?.at ?? 1.4
      return [
        ...(cfg.noPis ? [] : [['pop', r3(a + pisAt + 0.05), 987.77, 0.03, -0.4]]),
        ['whoosh', r3(cardAt - 0.05), 0.35, 0.035],
        ...(typeof c.card === 'number'
          ? Array.from({ length: c.card }, (_, s) => ['pop', r3(cardAt + 0.35 + s * 0.08), NOTE[(s + 2) % 7] * 2, 0.024, -0.3 + s * 0.15])
          : [['tom', r3(cardAt + 0.42), 90, { gain: 0.22, decay: 0.25 }], ['tick', r3(cardAt + 0.42), 0.07], ['pluck', r3(cardAt + 0.5), 1174.66, 0.03, 0.4, 0.2]]),
        ...(c.cues || []).map(q => [q[0], r3(q[1] + a), ...q.slice(2)]),
      ]
    }),
    ['whoosh', T.cam[0], 0.45, 0.035], ['whoosh', T.cardIn[0], 0.4, 0.04], ['tick', T.cardIn[1], 0.05],
    ...cfg.verdict.rows.flatMap(([, val], i) => [
      ['pop', T.rows[i], 880, 0.04, -0.2],
      ...(typeof val === 'number' ? Array.from({ length: val }, (_, s) => ['pop', r3(T.rows[i] + 0.12 + s * 0.07), NOTE[(s + 2) % 7] * 2, 0.022, -0.3 + s * 0.15]) : [['pluck', r3(T.rows[i] + 0.1), 1174.66, 0.04, 0.6, 0.3], ['glitter', r3(T.rows[i] + 0.1), r3(T.rows[i] + 0.4)]]),
    ]),
    ['boom', T.total, 0.3], ['tom', T.total, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.total, 0.08],
    ['bell', r3(T.total + 0.08), 1760, 0.03, 1.2, 0], ['glitter', r3(T.total + 0.05), r3(T.total + 0.55)],
    ...(cfg.noPis ? [] : [['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4]]),
    ['pop', T.badgeOff, 1318.51, 0.04, -0.3], ['whoosh', T.badgeOff + 0.02, 0.4, 0.03],
    ...(cfg.extraCues || []),
    ...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...caughtCues(CAUGHT), ...glitchCues(GL),
    ...CHAPS.flatMap(chapterCues), ...slamTitleCues(LAST), ...FX.flatMap(f => f.cues || []),
    ...(cfg.loop ? loopCues({ duration: DURATION }) : []),
  ].filter(c => c[1] >= 0 && c[1] < DURATION)
  return { DURATION, SCENES, CUES, T, CW }
}
