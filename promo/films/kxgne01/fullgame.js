// STAR TALK GAME NIGHT: FULL GAMES — the shared 2-minute set, timeline and sound (promo/films/month2/m39.md).
// Lives in kxgne01's folder; kxgne01–08 import it read-only: import { makeFullGame } from '../../kxgne01/fullgame.js'
// The studio, podiums, host and props are copied from the old show's kit (promo/films/ngne01/gamekit.js, not imported,
// because that file pulls in endcard.js / cardfx.js). No end card, no card cut, no logo: DURATION = the story.
//
// The full game (≈ 116 s):
//   0–10      hook (frame 0 mid-chaos via cfg.draw, the hook line up), a record-scratch freeze at 0.5 s, THE STARS
//             welcome + the promise ("wait for the final. it's worth *double.*", sticker), contestant name cards 6–10.
//   10–70     three rounds of 20 s (chapter stickers ROUND 1/2/3): FINISH THE TEXT · GREEN FLAG OR RED FLAG ·
//             WHAT WOULD YOU DO?  u 0 sticker · 0.3 head · 0.6 card · 2.0 buzz · 2.3 ans1 · 5.2 ans2 · 7.6 gag/then ·
//             9.6 verdict · 12.4 +1 KIND · 13.6–17.4 AUDIENCE CAM (the fan sobbing in the marquee) · 17.6 scoreboard.
//   70–90     LIGHTNING ROUND: four yes/no situations, 4.4 s each, both flag at once, +1 for each kind call.
//   90–110    THE FINAL ×2: lights down, drum roll, one situation, double points, the cam, a drum roll to the result.
//   110–end   final score, confetti, the prize talk card (face down, then flipped), THE STARS' last line, hard cut
//             (or loop: the last 0.45 s eases back into the frame-0 picture).
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill, A as ASSETS } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, chapter, chapterCues, loopBack, loopCues } from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#e8344e', GREEN = '#4fcf7e', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const BUG_COL = '#ffd23a'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── layout
const POD = { A: 250, B: 830, top: 1150, w: 300, h: 170 }
const CAST_Y = 1040, CAST_S = 250
const HOST = { x: 540, y: 1196, s: 150 }
const MARQ = { x0: 44, x1: 1036, y0: 360, y1: 662 }
const BUB_Y = 790
const FAN = { x: 290, y: 1776, s: 180 }

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
export function confetti(x, t, t0, cx, cy, { n = 30, life = 2.6, cols = [GOLD, PINK, SKYB, '#9fe6b0', BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.6, v = 560 + 280 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 640 * tt * tt
    const sz = 12 + (i % 3) * 4
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
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
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function spotlight(x, tx, top, bx, by, w, a, col = '255,236,180') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${col},${0.05 * a})`); g.addColorStop(1, `rgba(${col},${0.24 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 26, top); x.lineTo(tx + 26, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${col},${0.28 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** word-wrap for canvas text (x.font must be set) */
export function wrapLines(x, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let cur = ''
    for (const w of para.split(' ')) {
      const nx = cur ? cur + ' ' + w : w
      if (x.measureText(nx).width > maxW && cur) { out.push(cur); cur = w } else cur = nx
    }
    out.push(cur)
  }
  return out
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
/** one single tear (sprite cells), for a sign that "doesn't cry" */
export function oneTear(ctx, t, t0) {
  const p = ((t - t0) % 1.6) / 1.6
  if (t < t0) return
  const j = 21 + 9 * p * p
  ctx.fillStyle = INK; ctx.fillRect(24.85, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(25, j, 1, 1.4)
}

// ── props held at the contestant's side (canvas px; (hx, hy) = the hand point, k = scale 0…1)
export function drawProp(x, t, kind, hx, hy, k = 1, { rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(hx, hy); x.rotate(rot); x.scale(k, k)
  if (kind === 'clipboard') {
    box(x, -46, -62, 92, 124, '#b98a52', { b: 5 }); R(x, BONE, -38, -48, 76, 104)
    box(x, -20, -70, 40, 16, '#9aa0b8', { b: 4 })
    for (let i = 0; i < 5; i++) { R(x, i === 4 ? RED : '#6a6488', -30, -34 + i * 18, i === 4 ? 30 : 56, 5); R(x, GREEN, 24, -36 + i * 18, 8, 8) }
  } else if (kind === 'soup') {
    for (let i = 0; i < 3; i++) { const p = ((t * 0.7 + i / 3) % 1); x.save(); x.globalAlpha = 0.55 * (1 - p); R(x, '#f4ecff', -24 + i * 22 + 6 * Math.sin(t * 3 + i), -50 - p * 70, 10, 18); x.restore() }
    R(x, INK, -66, -30, 132, 10); R(x, '#f3a64a', -60, -26, 120, 8)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-66, -22); x.lineTo(66, -22); x.lineTo(46, 34); x.lineTo(-46, 34); x.closePath(); x.fill()
    x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-58, -20); x.lineTo(58, -20); x.lineTo(40, 28); x.lineTo(-40, 28); x.closePath(); x.fill()
    R(x, '#9fd8f6', -40, -8, 80, 8)
  } else if (kind === 'planner') {
    box(x, -58, -44, 116, 88, '#2fc79a', { b: 5, hi: '#57e0b4' }); R(x, INK, -3, -44, 6, 88)
    R(x, BONE, -50, -36, 44, 72); R(x, BONE, 6, -36, 44, 72)
    for (let i = 0; i < 4; i++) { R(x, '#6a6488', -44, -26 + i * 16, 32, 4); R(x, i === 1 ? RED : '#6a6488', 12, -26 + i * 16, 32, 4) }
  } else if (kind === 'tea') {
    for (let i = 0; i < 2; i++) { const p = ((t * 0.6 + i / 2) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, '#f4ecff', -10 + i * 18 + 5 * Math.sin(t * 3 + i), -40 - p * 50, 8, 16); x.restore() }
    box(x, -30, -26, 60, 52, BONE, { b: 5 }); R(x, '#c98a5a', -24, -20, 48, 10)
    R(x, INK, 30, -14, 18, 28); R(x, BONE, 30, -8, 10, 16)
  } else if (kind === 'sandwich') {
    const bite = t > 0.6 ? 1 : 0
    box(x, -60, -30, 120, 20, '#e8c27a', { b: 4 }); R(x, '#5fd38a', -62, -10, 124, 10); R(x, '#e8344e', -56, 0, 112, 8); box(x, -60, 10, 120, 20, '#e8c27a', { b: 4 })
    if (bite) { x.fillStyle = '#05040c'; x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(64, -8, 22, 0, Math.PI * 2); x.fill(); x.globalCompositeOperation = 'source-over' }
  } else if (kind === 'tissue') {
    box(x, -36, -16, 72, 40, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
    x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-12, -16); x.quadraticCurveTo(0 + 6 * Math.sin(t * 6), -60, 14, -16); x.closePath(); x.fill()
  } else if (kind === 'wrench') {
    x.rotate(0.5 + 0.25 * Math.sin(t * 9))
    R(x, INK, -8, -50, 16, 100); R(x, '#b8bed6', -4, -46, 8, 92)
    box(x, -22, -70, 44, 26, '#b8bed6', { b: 4 }); R(x, '#05040c', -8, -72, 16, 16)
  } else if (kind === 'flagG' || kind === 'flagR') {
    const col = kind === 'flagG' ? GREEN : RED, w = Math.sin(t * 8) * 6
    R(x, INK, -6, -110, 12, 150); R(x, '#d8b98a', -3, -108, 6, 146)
    x.fillStyle = INK; x.beginPath(); x.moveTo(0, -116); x.lineTo(96, -96 + w); x.lineTo(0, -48); x.closePath(); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(4, -108); x.lineTo(84, -94 + w); x.lineTo(4, -56); x.closePath(); x.fill()
  } else if (kind === 'watch') {
    R(x, INK, -30, -10, 60, 20); box(x, -20, -20, 40, 40, BONE, { b: 5 }); R(x, INK, -2, -14, 4, 16); R(x, INK, -2, -2, 12, 4)
  } else if (kind === 'sticker') {
    drawBits(x, ['...G...', '..GGG..', 'GGGWGGG', '.GGGGG.', '.GG.GG.', 'GG...GG'], { G: GOLD, W: '#fff6d0' }, 0, 0, 9)
  }
  x.restore()
}

// ── the show bug: "STAR TALK GAME NIGHT" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,210,58,0.7)` }, b)
  el('div', { font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'STAR&nbsp;TALK&nbsp;GAME&nbsp;NIGHT<span style="color:rgba(255,255,255,0.65)">:&nbsp;FULL&nbsp;GAMES</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(out) } }
}

// ── the marquee: chasing bulbs around the prompt area
function drawMarquee(x, t, k, col = GOLD) {
  if (k <= 0.01) return
  const { x0, x1, y0, y1 } = MARQ, step = 44, phase = Math.floor(t * 7)
  x.save(); x.globalAlpha *= k
  R(x, 'rgba(16,9,38,0.72)', x0, y0, x1 - x0, y1 - y0)
  R(x, INK, x0 - 10, y0 - 10, x1 - x0 + 20, 10); R(x, INK, x0 - 10, y1, x1 - x0 + 20, 10); R(x, INK, x0 - 10, y0, 10, y1 - y0); R(x, INK, x1, y0, 10, y1 - y0)
  R(x, '#3a2d66', x0 - 4, y0 - 4, x1 - x0 + 8, 4); R(x, '#3a2d66', x0 - 4, y1, x1 - x0 + 8, 4)
  const pts = []
  for (let X = x0; X <= x1; X += step) { pts.push([X, y0 - 5]); }
  for (let Y = y0 + step; Y <= y1 - step / 2; Y += step) pts.push([x1 + 5, Y])
  for (let X = x1; X >= x0; X -= step) pts.push([X, y1 + 5])
  for (let Y = y1 - step; Y >= y0 + step / 2; Y -= step) pts.push([x0 - 5, Y])
  pts.forEach(([px, py], i) => {
    const lit = (i + phase) % 3 === 0
    R(x, INK, px - 9, py - 9, 18, 18)
    R(x, lit ? '#fff6d0' : '#8a6a2a', px - 6, py - 6, 12, 12)
    if (lit) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,214,120,0.18)'; x.beginPath(); x.arc(px, py, 20, 0, Math.PI * 2); x.fill(); x.restore() }
  })
  x.restore()
  void col
}

// ── the stage: floor boards, curtains at the sides, audience risers
function drawStage(x, t) {
  // side curtains
  for (const side of [0, 1]) {
    const X = side ? 1080 - 70 : 0
    R(x, '#5a1838', X, 300, 70, 1030)
    for (let i = 0; i < 4; i++) R(x, '#7a2450', X + 8 + i * 16, 300, 6, 1030)
    R(x, INK, side ? X : X + 64, 300, 6, 1030)
  }
  R(x, '#3e1430', 0, 290, 1080, 22); R(x, INK, 0, 308, 1080, 6)
  // floor
  R(x, INK, 0, 1316, 1080, 8)
  R(x, '#2b2050', 0, 1324, 1080, 96)
  for (let i = 0; i < 9; i++) R(x, '#352a60', i * 124 + ((i % 2) * 40), 1324, 4, 96)
  R(x, GOLD, 0, 1320, 1080, 4)
  // audience pit
  const g = x.createLinearGradient(0, 1700, 0, 1920); g.addColorStop(0, 'rgba(8,5,20,0)'); g.addColorStop(1, 'rgba(8,5,20,0.85)')
  x.fillStyle = g; x.fillRect(0, 1700, 1080, 220)
  void t
}

// ── the podium (canvas): sign band, glyph, name, score box, buzzer dome
function drawPodium(x, t, cx, sign, score, { buzz = -9, lit = 0, k = 1, dome = true } = {}) {
  const s = SIGNS.find(q => q.id === sign)
  const { top, w, h } = POD, X = cx - w / 2
  x.save()
  box(x, X, top, w, h, '#2e2358', { b: 7, hi: '#41347a' })
  R(x, s.color, X, top + 34, w, 46); R(x, 'rgba(255,255,255,0.18)', X, top + 34, w, 8)
  const nm = s.name.toUpperCase(), nf = nm.length > 9 ? 25 : nm.length > 7 ? 29 : 32
  x.font = `700 ${nf}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText(s.name.toUpperCase(), cx + 2, top + 59)
  x.fillStyle = BONE; x.fillText(s.name.toUpperCase(), cx, top + 57)
  // score box
  box(x, cx - 46, top + 96, 92, 64, '#0d0920', { b: 5 })
  x.font = `700 54px ${MONO}`; x.fillStyle = lit > 0 ? '#fff6d0' : GOLD; x.fillText(String(score), cx, top + 130)
  if (lit > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = lit; x.fillStyle = 'rgba(255,214,120,0.5)'; x.fillRect(cx - 46, top + 96, 92, 64); x.restore() }
  // glyph coins on the band corners
  x.font = `600 34px ${GLYPH_FONT}`; x.fillStyle = INK
  x.fillText(s.glyph + '︎', X + 26, top + 58); x.fillText(s.glyph + '︎', X + w - 26, top + 58)
  // buzzer dome (pressed for 0.18 s after a buzz)
  if (!dome) { x.restore(); return { bx: cx + (cx < 540 ? 92 : -92), by: top - 8 } }
  const pressed = t >= buzz && t < buzz + 0.18
  const bx = cx + (cx < 540 ? 92 : -92), by = top - 8
  R(x, INK, bx - 40, by - 4, 80, 16); R(x, '#5a5470', bx - 34, by, 68, 8)
  const dh = pressed ? 10 : 22
  x.fillStyle = INK; x.beginPath(); x.ellipse(bx, by - 2, 34, dh + 6, 0, Math.PI, 0); x.fill()
  x.fillStyle = t >= buzz && t < buzz + 0.6 ? '#ff6b7f' : RED; x.beginPath(); x.ellipse(bx, by - 2, 28, dh, 0, Math.PI, 0); x.fill()
  R(x, 'rgba(255,255,255,0.5)', bx - 14, by - dh + 4, 10, 5)
  if (t >= buzz && t < buzz + 0.5) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 1 - (t - buzz) / 0.5; x.fillStyle = 'rgba(255,80,100,0.35)'; x.beginPath(); x.arc(bx, by - 10, 80, 0, Math.PI * 2); x.fill(); x.restore() }
  x.restore()
  void k
  return { bx, by }
}

// a pixel mic for the host
function drawMic(x, cx, cy, cell, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -cell * 0.9, 0, cell * 1.8, cell * 7); R(x, '#5a5470', -cell * 0.5, cell * 0.4, cell, cell * 6.2)
  R(x, INK, -cell * 2.2, -cell * 3.6, cell * 4.4, cell * 4.2); R(x, '#cfd3e6', -cell * 1.7, -cell * 3.1, cell * 3.4, cell * 3.2)
  R(x, '#8a8fa8', -cell * 1.7, -cell * 1.6, cell * 3.4, cell * 0.6); R(x, '#ffffff', -cell * 1.2, -cell * 2.8, cell * 0.8, cell * 0.8)
  x.restore()
}

// ── answer bubble (canvas): bone, sign-coloured top bar, multi-line, tail toward the speaker
function drawAnswer(x, t, cx, t0, t1, text, col, side, { replaceAt = null, text2 = null } = {}) {
  const k = pop01(t, t0, 0.26, 2.4) * outK(t, [t1 - 0.18, t1])
  if (k <= 0.01 || t < t0) return
  const swap = replaceAt != null && t >= replaceAt
  const txt = swap ? text2 : text
  const punch = swap ? 1 + 0.08 * Math.exp(-(t - replaceAt) * 9) * Math.sin((t - replaceAt) * 30) : 1
  x.save()
  x.font = `800 36px ${INTER}`
  let lines = wrapLines(x, txt, 430)
  for (let mw = 420; mw > 200; mw -= 10) { const l2 = wrapLines(x, txt, mw); if (l2.length > lines.length) break; lines = l2 }   // balance the rows
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 48, lh = 44, h = lines.length * lh + 34
  const bx = clamp(cx, w / 2 + 24, 1080 - w / 2 - 24)
  x.translate(bx, BUB_Y); x.scale(k * punch, k * punch)
  R(x, 'rgba(6,4,18,0.55)', -w / 2 + 10, -h / 2 + 12, w, h)
  R(x, INK, -w / 2 - 5, -h / 2, w + 10, h); R(x, INK, -w / 2, -h / 2 - 5, w, h + 10)
  R(x, BONE, -w / 2, -h / 2, w, h); R(x, col, -w / 2, -h / 2, w, 8)
  const tx = (cx - bx) + (side === 'A' ? -10 : 10)
  R(x, INK, tx - 14, h / 2 + 4, 14, 14); R(x, INK, tx - 7, h / 2 + 16, 8, 10); R(x, BONE, tx - 9, h / 2, 9, 10)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 22 + lh / 2 + i * lh))
  x.restore()
}

// ── the prompt card in the marquee (kind: 'text' | 'flag' | 'wwyd' | 'light' | 'final')
const KIND = {
  text: { label: 'FINISH THE TEXT', col: SKYB, head: '*Finish* the text.' },
  flag: { label: 'GREEN FLAG OR RED FLAG?', col: GREEN, head: 'Green flag or *red?*' },
  wwyd: { label: 'WHAT WOULD YOU DO?', col: PINK, head: 'What would *you* do?' },
  light: { label: 'LIGHTNING', col: '#ffd23a', head: 'Lightning *round!*' },
  final: { label: 'THE FINAL · DOUBLE POINTS', col: GOLD, head: 'The *final.* | Double points.' },
}
function drawPromptCard(x, t, kind, text, t0, t1, { y = 512, small = false, n = 0 } = {}) {
  const k = easeOutBack(prog(t, t0, t0 + 0.4), 1.5), o = outK(t, [t1 - 0.22, t1])
  if (k <= 0.01 || o <= 0.01 || t < t0) return
  const K = KIND[kind]
  const cx = 540, cy = lerp(-200, y, k) + (1 - o) * -60, rot = lerp(-0.2, [-0.015, 0.012, -0.01, 0.014][n % 4], k)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha = o
  const w = 900, h = small ? 196 : 232
  R(x, 'rgba(6,4,18,0.5)', -w / 2 + 14, -h / 2 + 18, w, h)
  box(x, -w / 2, -h / 2, w, h, BONE, { b: 8 })
  x.font = `700 26px ${MONO}`
  const lw = x.measureText(K.label).width + 36
  box(x, -w / 2 + 26, -h / 2 + 20, lw, 40, K.col, { b: 4 })
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(K.label, -w / 2 + 44, -h / 2 + 41)
  if (kind === 'flag' || kind === 'light') { drawProp(x, t, 'flagG', w / 2 - 130, -h / 2 + 64, 0.38); drawProp(x, t, 'flagR', w / 2 - 70, -h / 2 + 64, 0.38) }
  if (kind === 'text') { box(x, w / 2 - 110, -h / 2 + 18, 70, 46, SKYB, { b: 4 }); for (let d = 0; d < 3; d++) R(x, INK, w / 2 - 96 + d * 18, -h / 2 + 37, 8, 8) }
  if (kind === 'wwyd') { x.font = `800 60px ${INTER}`; x.fillStyle = PINK; x.textAlign = 'center'; x.fillText('?', w / 2 - 70, -h / 2 + 46) }
  if (kind === 'final') { x.font = `800 44px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('×2', w / 2 - 70, -h / 2 + 42) }
  x.font = `800 52px ${INTER}`
  let lines = wrapLines(x, text, 830)
  if (lines.length > 2) { x.font = `800 44px ${INTER}`; lines = wrapLines(x, text, 840) }
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  const top = (small ? 28 : 36) - (lines.length - 1) * 30
  lines.forEach((l, j) => x.fillText(l, 0, top + j * 60))
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the full game
// makeFullGame(cfg) → { DURATION, SCENES, CUES, CHECK, T, WIN, finalA, finalB, LAST_END }
//   cfg.id · cfg.hook ('line one | line *two*') · cfg.accent · cfg.welcome (THE STARS, ≤ 40 chars)
//   cfg.A / cfg.B: { sign, stat: 'patience: loading', prop?, propUntil?, intro?: { mood, look, buzz, squash },
//                    idle?, finale?: { mood, look }, cry?: [[t0, k]…], oneTear?: t0 }
//   cfg.rounds × 3: { prompt, first: 'A'|'B', buzzAt?, a: ANS, b: ANS, point: 'A'|'B'|'both', host, gag?, cam? }
//   cfg.lightning × 4: { prompt, first?, a: ANS, b: ANS, point }
//   cfg.final: { prompt, first, buzzAt?, a: ANS, b: ANS, point, host, gag?, cam? }          (double points)
//      ANS = { text, mood?, look?, flag?: 'G'|'R'|'GR', then?: { at: u, text, flag?, mood? }, lose? }
//   cfg.last (THE STARS' last line) · cfg.talk ('card-talk-N.png') · cfg.fan (default pisces; cancer if Pisces plays)
//   cfg.ending: 'cut' | 'loop' · cfg.draw(x, t, S) (after the cast) · cfg.drawTop(x, t, S) (above the answers)
//   cfg.freeze: [t0, t1] picture freeze for the record scratch (default [0.5, 1.0]); cfg.music: { style, key, seed }
export const R0 = 10, RL = 20, L0 = 70, F0 = 90, FIN = 110
const U = { sticker: 0, head: 0.3, card: 0.6, buzz: 2.0, ans1: 2.3, ans2: 5.2, gag: 7.6, host: 9.6, point: 12.4, cardOut: 13.4, cam: [13.6, 17.4], board: [17.6, 19.8] }
const CPS = 30
const CHAPTERS = ['FINISH THE TEXT', 'GREEN FLAG OR RED', 'WHAT WOULD YOU DO', 'LIGHTNING ROUND', 'THE FINAL ×2']
const CHAP_COL = [SKYB, GREEN, PINK, '#ffd23a', GOLD]
const KINDS = ['text', 'flag', 'wwyd']
const CAM_DEFAULT = ['(sobbing) so KIND', '(sobbing) I felt that', '(sobbing) everyone hug', '(sobbing) best final ever']

export function makeFullGame(cfg) {
  const SA = signStar(cfg.A.sign), SB = signStar(cfg.B.sign)
  const nameOf = id => SIGNS.find(s => s.id === id).name
  const NA = nameOf(cfg.A.sign), NB = nameOf(cfg.B.sign)
  const FANS = cfg.fan || (cfg.A.sign === 'pisces' || cfg.B.sign === 'pisces' ? 'cancer' : 'pisces')
  const SPEAK = 'THE STARS'
  const HOSTIN = 1.0

  // ── the question list (absolute times)
  const Q = []
  cfg.rounds.forEach((r, i) => {
    const a = R0 + i * RL, b = a + RL
    const buzz = a + (r.buzzAt ?? U.buzz)
    Q.push({ ...r, kind: KINDS[i], n: i, seg: i, a, b, pts: 1, buzz, ans1: Math.max(a + U.ans1, buzz + 0.25), ans2: a + U.ans2, gagAt: a + U.gag, hostAt: a + U.host, pointAt: a + U.point,
      cardIn: a + U.card, cardOut: a + U.cardOut, bubOut: a + U.cam[1], hostClose: a + U.cam[1] - 0.1, cam: [a + U.cam[0], a + U.cam[1]], board: [a + U.board[0], a + U.board[1]], camText: r.cam || CAM_DEFAULT[i] })
  })
  cfg.lightning.forEach((r, j) => {
    const q = L0 + 2.0 + j * 4.4
    Q.push({ ...r, first: r.first || (j % 2 ? 'B' : 'A'), kind: 'light', n: j, seg: 3, a: q, b: q + 4.3, pts: 1, buzz: null, ans1: q + 1.0, ans2: q + 1.3, hostAt: null, pointAt: q + 2.6,
      cardIn: q, cardOut: q + 4.2, bubOut: q + 4.2, cam: null, board: null })
  })
  {
    const r = cfg.final, a = F0
    const buzz = a + (r.buzzAt ?? 2.6)
    Q.push({ ...r, kind: 'final', n: 0, seg: 4, a, b: FIN, pts: 2, buzz, ans1: Math.max(a + 2.9, buzz + 0.25), ans2: a + 5.8, gagAt: a + 8.2, hostAt: a + 10.2, pointAt: a + 12.9,
      cardIn: a + 0.9, cardOut: a + 13.6, bubOut: a + 17.4, hostClose: a + 17.3, cam: [a + 13.8, a + 17.4], board: null, camText: r.cam || CAM_DEFAULT[3] })
  }
  const won = (q, side) => q.point === side || q.point === 'both'
  const scoreAt = (side, t) => Q.filter(q => t >= q.pointAt && won(q, side)).reduce((s, q) => s + q.pts, 0)
  const finalA = scoreAt('A', 1e9), finalB = scoreAt('B', 1e9)
  const WIN = finalA === finalB ? 'both' : finalA > finalB ? 'A' : 'B'
  const finHead = WIN === 'both' ? `${finalA}–${finalB}. A *tie!*` : `Kindest heart: | *${WIN === 'A' ? NA : NB}.*`

  // ── dialogue
  const LW = [{ t: 1.4, speaker: SPEAK, text: cfg.welcome }, { t: 3.75, speaker: SPEAK, text: cfg.promise || "wait for the final. it's *double.*" }]
  const LQ = Q.filter(q => q.hostAt != null).map(q => ({ q, lines: [{ t: q.hostAt, speaker: SPEAK, text: q.host }] }))
  const LL = [{ t: L0 + 0.25, speaker: SPEAK, text: cfg.lightningLine || 'four questions. *GO GO GO.*' }]
  const LF = [{ t: FIN + 2.5, speaker: SPEAK, text: cfg.last }]
  const lastDone = lineTimes(LF, { cps: CPS })[0].done
  const LAST_END = +(lastDone + 1.5).toFixed(2)
  const LOOP = cfg.ending === 'loop' ? 0.45 : 0
  const DURATION = +(LAST_END + LOOP).toFixed(2)
  const T = { hostIn: HOSTIN, welcomeClose: 6.7, h0Out: [5.4, 5.8], cards: [[6.0, 8.0], [8.0, 10.0]], lightBox: [L0 + 0.05, L0 + 3.0],
    finRoll: [F0 + 17.6, FIN], fin: FIN, finHead: FIN + 0.25, confetti: FIN + 0.35, prize: [FIN + 0.8, FIN + 1.25], flip: [FIN + 1.5, FIN + 1.9], last: FIN + 2.5, end: LAST_END, DURATION }
  const ALL_LINES = [...LW, ...LQ.flatMap(o => o.lines), ...LL, ...LF]
  const HOST_HOPS = [HOSTIN + 0.32, ...talkHops(ALL_LINES, SPEAK, { cps: CPS }), FIN + 0.1]

  const hopsFor = side => {
    const h = []
    if (cfg[side].intro?.buzz) h.push(0.02, 0.36, 0.7, 1.4)
    h.push(side === 'A' ? 6.05 : 8.05, side === 'A' ? 6.5 : 8.5)
    for (const q of Q) {
      const mine = q.first === side ? q.ans1 : q.ans2
      if (q.first === side && q.buzz != null) h.push(q.buzz - 0.05)
      h.push(mine + 0.02)
      const ans = side === 'A' ? q.a_ : q.b_
      if (ans?.then) h.push(q.a + ans.then.at)
      if (won(q, side)) h.push(q.pointAt + 0.04, q.pointAt + 0.5)
    }
    if (WIN === side || WIN === 'both') h.push(FIN + 0.12, FIN + 0.55, FIN + 1.0, T.flip[1])
    return h.sort((p, q) => p - q)
  }
  Q.forEach(q => { q.a_ = q.a !== undefined && typeof q.a === 'object' ? q.a : null })
  // (q.a is the start time; the answers live in cfg — keep them as ansA / ansB)
  const src = [...cfg.rounds, ...cfg.lightning, cfg.final]
  Q.forEach((q, i) => { q.ansA = src[i].a; q.ansB = src[i].b; q.a_ = q.ansA; q.b_ = q.ansB; q.firstAns = q.first === 'A' ? q.ansA : q.ansB; q.secondAns = q.first === 'A' ? q.ansB : q.ansA })
  const HOPS = { A: hopsFor('A'), B: hopsFor('B') }
  const pointTimes = Q.map(q => q.pointAt)
  const segStarts = [R0, R0 + RL, R0 + 2 * RL, L0, F0]

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 46px Inter", "800 32px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "600 34px 'EB Garamond'", "700 54px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const loadImg = s => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = ASSETS + s })
    const [backImg, talkImg] = await Promise.all([loadImg('card-back.png'), loadImg(cfg.talk || 'card-talk-1.png')])
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const HF = popText(root, finHead, { top: 132, size: 84, accentSize: 120, at: T.finHead, gap: 0.08, late: 2, lateAt: T.finHead + 0.35, wobble: true, accentColor: GOLD, fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const boxes = [
      dialogueBox(root, { lines: LW, y: 1412, open: LW[0].t - 0.2, close: T.welcomeClose, cps: CPS }),
      ...LQ.map(({ q, lines }) => dialogueBox(root, { lines, y: 1412, open: q.hostAt - 0.2, close: q.hostClose, cps: CPS })),
      dialogueBox(root, { lines: LL, y: 1412, open: LL[0].t - 0.2, close: T.lightBox[1], cps: CPS }),
      dialogueBox(root, { lines: LF, y: 1412, open: LF[0].t - 0.2, close: LAST_END + 5, cps: CPS }),
    ]
    const bug = buildBug(root)
    const fx = layerCanvas(root), fxx = fx.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    const qAt = t => Q.find(q => t >= q.a && t < q.b)

    function contestant(t, side) {
      const C = cfg[side], S = side === 'A' ? SA : SB, cx = POD[side]
      const q = qAt(t)
      let mood = C.idle || 'happy', look = side === 'A' ? [1, 0] : [-1, 0], squash = 0
      if (t < 3.2) { mood = C.intro?.mood || mood; look = C.intro?.look || look; squash = C.intro?.squash || 0 }
      const card = side === 'A' ? T.cards[0] : T.cards[1]
      if (t >= card[0] && t < card[1]) { mood = 'sparkle'; look = [0, 0] }
      if (q) {
        const ans = side === 'A' ? q.ansA : q.ansB
        const mine = q.first === side ? q.ans1 : q.ans2
        look = [0, -0.8]
        if (q.buzz != null && q.first === side && t > q.buzz - 0.1 && t < mine + 0.6) { mood = 'wide'; look = [0, 0] }
        if (t > mine) { mood = ans.mood || 'happy'; look = ans.look || [0, 0] }
        if (ans.then && t > q.a + ans.then.at) { mood = ans.then.mood || 'wide'; look = ans.then.look || [0, 0] }
        if (q.hostAt != null && t > q.hostAt) look = [side === 'A' ? 1 : -1, 0.3]
        if (t > q.pointAt) { mood = won(q, side) ? 'sparkle' : (ans.lose || 'neutral'); look = won(q, side) ? [0, 0] : (ans.loseLook || [side === 'A' ? 1 : -1, 0]) }
      }
      if (t >= FIN) {
        const w = WIN === side || WIN === 'both'
        mood = w ? (t > T.flip[1] ? 'heart' : 'sparkle') : (C.finale?.mood || 'happy'); look = w ? [0, 0] : (C.finale?.look || [side === 'A' ? 1 : -1, 0])
      }
      const opts = { color: S.color, glyph: S.glyph, mood, look, hops: HOPS[side], seed: side === 'A' ? 3 : 9, glow: 1.1, squash }
      drawStarChar(x, cx, CAST_Y, CAST_S, t, opts)
      const F = starFrame(cx, CAST_Y, CAST_S, t, { hops: HOPS[side], seed: opts.seed, squash })
      const cryK = C.cry ? C.cry.reduce((k, [t0, kk]) => (t >= t0 ? kk : k), 0) : 0
      if (cryK) inSprite(x, F, () => tearsCells(x, t, cryK))
      if (C.oneTear != null) inSprite(x, F, () => oneTear(x, t, C.oneTear))
      const handX = cx + (side === 'A' ? -1 : 1) * CAST_S * 0.46, handY = F.cy + 40
      if (C.prop && t < (C.propUntil ?? 1e9)) drawProp(x, t, C.prop, handX, handY, C.propUntil ? outK(t, [C.propUntil - 0.2, C.propUntil]) : 1, { rot: side === 'A' ? -0.12 : 0.12 })
      // flags (green/red round, lightning, any answer with a flag)
      if (q) {
        const ans = side === 'A' ? q.ansA : q.ansB
        const mine = q.first === side ? q.ans1 : q.ans2
        let fl = ans.flag
        if (ans.then?.flag && t > q.a + ans.then.at) fl = ans.then.flag
        const fk = pop01(t, mine - 0.05, 0.3, 2.4) * outK(t, [q.bubOut - 0.2, q.bubOut])
        const fxp = cx + (side === 'A' ? 1 : -1) * CAST_S * 0.52, fy = F.cy - 20
        if (fl && fk > 0.01 && t >= mine - 0.05) {
          if (fl === 'GR') { drawProp(x, t, 'flagG', fxp - 26, fy, fk, { rot: -0.2 }); drawProp(x, t, 'flagR', fxp + 26, fy, fk, { rot: 0.2 }) }
          else drawProp(x, t, fl[fl.length - 1] === 'G' ? 'flagG' : 'flagR', fxp, fy, fk, { rot: side === 'A' ? -0.12 : 0.12 })
        }
      }
      return F
    }

    function host(t) {
      const k = pop01(t, HOSTIN, 0.38, 2.1)
      if (k <= 0.02) return
      let mood = 'happy', look
      for (const q of Q) {
        if (q.hostAt != null && t > q.a && t < q.hostAt) { mood = 'neutral'; look = [q.first === 'A' ? -1 : 1, 0] }
        if (q.buzz != null && t > q.buzz && t < q.buzz + 0.5) mood = 'wide'
      }
      if (t > F0 && t < F0 + 2.4) { mood = 'squint'; look = [0, 0] }
      if (t > T.finRoll[0] && t < FIN) { mood = 'squint'; look = [0, 0] }
      if (t >= FIN) mood = 'sparkle'
      drawStarChar(x, HOST.x, HOST.y, HOST.s, t, { color: STAR.sky, mood, look, hops: HOST_HOPS, pop: k, seed: 2, glow: 1.05 })
      const F = starFrame(HOST.x, HOST.y, HOST.s, t, { pop: k, hops: HOST_HOPS, seed: 2 })
      drawMic(x, F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.06, F.cell * 1.1, 0.35 + 0.05 * Math.sin(t * 2))
      box(x, HOST.x - 66, 1262, 132, 56, '#41347a', { b: 6, hi: '#5a4aa0' })
      x.save(); x.font = `600 30px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('★', HOST.x, 1292); x.restore()
    }

    const clapTimes = [...pointTimes, FIN + 0.1, FIN + 0.6]
    const cheerHops = clapTimes.flatMap(c => [c + 0.05, c + 0.4])
    const fanTears = t => (t < R0 ? 2 : 3)
    function audience(t) {
      const crowd = [['leo', 92, 1868], ['gemini', 560, 1880], ['taurus', 700, 1860], ['aquarius', 840, 1876], ['scorpio', 985, 1866]]
      const used = new Set([cfg.A.sign, cfg.B.sign, FANS]); const spare = ['cancer', 'libra', 'virgo', 'capricorn', 'sagittarius', 'aries', 'pisces'].filter(s => !used.has(s))
      let si = 0
      crowd.forEach(([sg, cx, cy], i) => {
        if (used.has(sg)) sg = spare[si++]
        drawStarChar(x, cx, cy, 96, t, { color: signStar(sg).color, mood: 'happy', hops: cheerHops.map(h => h + i * 0.03), seed: 11 + i, glow: 0.5, alpha: 0.72, tips: false })
      })
      const S = signStar(FANS)
      drawStarChar(x, FAN.x, FAN.y, FAN.s, t, { color: S.color, mood: t > FIN ? 'sparkle' : 'wide', look: [0.6, -1], seed: 6, glow: 0.8, hops: cheerHops, tips: false })
      const F = starFrame(FAN.x, FAN.y, FAN.s, t, { hops: cheerHops, seed: 6 })
      inSprite(x, F, () => tearsCells(x, t, fanTears(t)))
      drawProp(x, t, 'tissue', FAN.x + 125, FAN.y + 44, 0.9)
    }

    // the marquee screen contents: intro sign, name cards, scoreboards, the audience cam, lightning clock, final score
    function inMarquee(fn) { const { x0, x1, y0, y1 } = MARQ; x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip(); fn(); x.restore() }
    function screenBg(col = 'rgba(10,6,28,0.94)') { R(x, col, MARQ.x0, MARQ.y0, MARQ.x1 - MARQ.x0, MARQ.y1 - MARQ.y0) }
    function nameCard(t, side, [a, b]) {
      if (t < a || t >= b) return
      const S = side === 'A' ? SA : SB, C = cfg[side], o = outK(t, [b - 0.2, b])
      const k = easeOutBack(prog(t, a, a + 0.35), 2.2)
      inMarquee(() => {
        screenBg()
        for (let i = 0; i < 8; i++) R(x, i % 2 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0)', MARQ.x0 + i * 124, MARQ.y0, 124, 302)
        x.save(); x.globalAlpha = o; x.translate(540 + (1 - k) * (side === 'A' ? -900 : 900), 512)
        x.textAlign = 'center'; x.textBaseline = 'middle'
        x.font = `700 30px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.8)'; x.fillText(side === 'A' ? 'CONTESTANT ONE' : 'CONTESTANT TWO', 0, -96)
        x.font = `800 120px ${INTER}`; x.fillStyle = INK; x.fillText((side === 'A' ? NA : NB).toUpperCase(), 6, 6); x.fillStyle = S.color; x.fillText((side === 'A' ? NA : NB).toUpperCase(), 0, 0)
        x.font = `700 36px ${MONO}`; x.fillStyle = GOLD; x.fillText(C.stat || '', 0, 96)
        x.restore()
      })
    }
    function cam(t, q) {
      if (!q.cam || t < q.cam[0] || t >= q.cam[1]) return
      const [a, b] = q.cam, k = easeOutBack(prog(t, a, a + 0.3), 1.6), o = outK(t, [b - 0.2, b])
      inMarquee(() => {
        screenBg('rgba(14,10,34,0.97)')
        x.save(); x.globalAlpha = o
        const S = signStar(FANS), sz = 290 * (0.6 + 0.4 * k) * (1 + 0.04 * (t - a))
        drawStarChar(x, 540, 505, sz, t, { color: S.color, mood: 'wide', look: [0.3, -0.6], seed: 6, glow: 0.9, hops: [a + 0.1, a + 1.6, a + 2.8] })
        const F = starFrame(540, 505, sz, t, { hops: [a + 0.1, a + 1.6, a + 2.8], seed: 6 })
        inSprite(x, F, () => tearsCells(x, t, 3))
        drawProp(x, t, 'tissue', 790, 560, 1.4, { rot: 0.1 })
        // scanlines + REC chrome
        for (let y = MARQ.y0; y < MARQ.y1; y += 6) R(x, 'rgba(0,0,0,0.12)', MARQ.x0, y, MARQ.x1 - MARQ.x0, 2)
        if (Math.floor(t * 2) % 2 === 0) { x.fillStyle = RED; x.beginPath(); x.arc(MARQ.x0 + 40, MARQ.y0 + 38, 12, 0, Math.PI * 2); x.fill() }
        label(x, 'AUDIENCE CAM', MARQ.x0 + 64, MARQ.y0 + 38, { size: 28, col: BONE, align: 'left' })
        label(x, signStar(FANS) && nameOf(FANS).toUpperCase(), MARQ.x1 - 30, MARQ.y0 + 38, { size: 26, col: S.color, align: 'right' })
        const cp = pop01(t, a + 0.5, 0.3, 2.2)
        if (cp > 0.01) {
          x.save(); x.translate(540, MARQ.y1 - 44); x.scale(cp, cp)
          x.font = `800 40px ${INTER}`; const w = x.measureText(q.camText).width + 40
          box(x, -w / 2, -28, w, 56, BONE, { b: 5 }); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(q.camText, 0, 2)
          x.restore()
        }
        x.restore()
      })
    }
    function board(t, q) {
      if (!q.board || t < q.board[0] || t >= q.board[1]) return
      const [a, b] = q.board, k = pop01(t, a, 0.32, 2.2), o = outK(t, [b - 0.2, b])
      const sA = scoreAt('A', t), sB = scoreAt('B', t)
      inMarquee(() => {
        screenBg()
        x.save(); x.globalAlpha = o; x.translate(540, 512); x.scale(k, k)
        x.textAlign = 'center'; x.textBaseline = 'middle'
        x.font = `700 32px ${MONO}`; x.fillStyle = BONE; x.fillText(`AFTER ${CHAPTERS[q.seg]}`, 0, -96)
        x.font = `800 140px ${INTER}`; x.fillStyle = INK; x.fillText(`${sA}–${sB}`, 6, 22); x.fillStyle = GOLD; x.fillText(`${sA}–${sB}`, 0, 16)
        x.font = `600 80px ${GLYPH_FONT}`; x.fillStyle = SA.color; x.fillText(SA.glyph + '︎', -300, 16); x.fillStyle = SB.color; x.fillText(SB.glyph + '︎', 300, 16)
        x.font = `700 26px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.75)'; x.fillText(q.seg < 2 ? 'FINAL STILL WORTH ×2' : 'NEXT: LIGHTNING ROUND', 0, 112)
        x.restore()
      })
    }
    function lightClock(t) {
      const a = L0 + 1.6, b = L0 + 19.6
      if (t < a || t >= b + 0.3) return
      const left = Math.max(0, Math.ceil(b - t)), k = pop01(t, a, 0.3, 2.2) * outK(t, [b, b + 0.3])
      x.save(); x.translate(540, MARQ.y1 + 66); x.scale(k, k)
      box(x, -74, -34, 148, 68, left <= 5 ? RED : INK, { b: 5 })
      x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = left <= 5 ? '#fff6d0' : '#ffd23a'
      x.fillText(`0:${String(left).padStart(2, '0')}`, 0, 2)
      x.restore()
      const p = clamp((t - a) / (b - a))
      R(x, INK, MARQ.x0, MARQ.y1 + 14, MARQ.x1 - MARQ.x0, 16); R(x, p > 0.75 ? RED : '#ffd23a', MARQ.x0 + 3, MARQ.y1 + 17, (MARQ.x1 - MARQ.x0 - 6) * (1 - p), 10)
    }
    function prize(t, cx, cy, side) {
      if (t < T.prize[0]) return
      const k = easeOutBack(prog(t, ...T.prize), 1.3)
      const fp = prog(t, ...T.flip), sx = Math.abs(Math.cos(Math.PI * fp)), face = fp >= 0.5
      const img = face ? talkImg : backImg
      if (!img) return
      const w = 230, h = w * img.height / img.width
      const px = lerp(540, cx, k), py = lerp(-260, cy, k), rot = lerp(side === 'A' ? -0.6 : 0.6, side === 'A' ? -0.07 : 0.07, k)
      x.save(); x.translate(px, py + 6 * Math.sin(t * 3)); x.rotate(rot); x.scale(Math.max(0.02, sx), 1)
      R(x, 'rgba(6,4,18,0.45)', -w / 2 + 16, -h / 2 + 20, w, h)
      x.drawImage(img, -w / 2, -h / 2, w, h)
      x.restore()
      if (face) sparkles(x, t, px, py, T.flip[0] + 0.2, 10, 170, side === 'A' ? 1 : 2, [GOLD, BONE, PINK])
    }
    // the promise sticker: pops big at 3.5, docks top-right by 6.2, pulses at the final
    function promise(t) {
      if (t < 3.75 || t >= FIN) return
      const p = ease.inOutCubic(prog(t, 5.9, 6.6)), k = pop01(t, 3.75, 0.35, 2.6)
      const live = t >= F0 ? 1 + 0.08 * Math.sin((t - F0) * 9) * Math.exp(-(t - F0) * 0.6) : 1
      const cx = lerp(540, 900, p), cy = lerp(716, 318, p), sc = lerp(1, 0.56, p) * k * live
      fxx.save(); fxx.translate(cx, cy); fxx.rotate(lerp(-0.05, 0.06, p)); fxx.scale(sc, sc)
      fxx.font = `800 40px ${INTER}`; const txt = t >= F0 ? 'THE FINAL ×2: NOW' : 'WAIT FOR THE FINAL ×2', w = fxx.measureText(txt).width + 44
      box(fxx, -w / 2, -32, w, 64, t >= F0 ? GOLD : '#ffd23a', { b: 6 }); fxx.fillStyle = INK; fxx.textAlign = 'center'; fxx.textBaseline = 'middle'; fxx.fillText(txt, 0, 2)
      fxx.restore()
    }
    function camera(t) {
      // slow drift + punch on every point + a whip zoom out of each chapter start + the final's push-in
      let z = 1 + 0.012 * Math.sin(t * 0.37) + 0.01 * Math.sin(t * 0.83 + 1)
      for (const p of pointTimes) if (t >= p && t < p + 0.5) z += 0.035 * Math.exp(-(t - p) * 8)
      if (t >= F0 + 2 && t < FIN) z += 0.03 * ease.inOutCubic(prog(t, F0 + 2, F0 + 12))
      const lastPt = [...pointTimes, FIN].filter(p => p <= t).pop()
      const dP = lastPt != null ? t - lastPt : 9, shake = dP < 0.35 ? 10 * Math.exp(-dP * 10) * Math.sin(dP * 55) : 0
      return { z, shake }
    }
    const S = { POD, CAST_Y, CAST_S, MARQ, HOST, FAN, Q, WIN, scoreAt, SA, SB, NA, NB }

    function paint(t) {
      drawSky(x, t, SKY_H)
      const cam0 = camera(t)
      x.save(); x.translate(540, 900); x.scale(cam0.z, cam0.z); x.translate(-540, -900 + cam0.shake)
      drawStage(x, t)
      const sw = Math.sin(t * 0.9)
      let tA = POD.A, tB = POD.B
      if (t >= FIN) { const wx = WIN === 'A' ? POD.A : WIN === 'B' ? POD.B : null; if (wx) { tA = wx; tB = wx } }
      const lights = t >= F0 && t < FIN ? 1.25 : 0.8
      if (t >= F0 && t < FIN) { x.save(); x.globalAlpha = 0.4 * clamp((t - F0) / 0.4) * outK(t, [FIN - 0.1, FIN]); R(x, '#05030c', 0, 300, 1080, 1100); x.restore() }
      spotlight(x, 160, 300, lerp(tA + 60 * sw, tA, t >= FIN ? 1 : 0), 1318, 360, lights)
      spotlight(x, 920, 300, lerp(tB - 60 * sw, tB, t >= FIN ? 1 : 0), 1318, 360, lights)
      drawMarquee(x, t, 1)
      if (t < 6.0) {
        x.save()
        x.font = `800 104px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillStyle = INK; x.fillText('GAME NIGHT', 546, 478); x.fillStyle = GOLD; x.fillText('GAME NIGHT', 540, 472)
        x.font = `600 70px ${GLYPH_FONT}`; x.fillStyle = SA.color; x.fillText(SA.glyph + '︎', 380, 588)
        x.fillStyle = SB.color; x.fillText(SB.glyph + '︎', 700, 588)
        x.font = `italic 500 64px ${SERIF}`; x.fillStyle = BONE; x.fillText('vs', 540, 584)
        x.restore()
      }
      nameCard(t, 'A', T.cards[0]); nameCard(t, 'B', T.cards[1])
      for (const q of Q) drawPromptCard(x, t, q.kind, q.prompt, q.cardIn, q.cardOut, { small: q.kind === 'light', n: q.n })
      for (const q of Q) { cam(t, q); board(t, q) }
      lightClock(t)
      if (t >= FIN - 0.02) {
        const k = pop01(t, FIN + 0.05, 0.35, 2.2)
        x.save(); x.translate(540, 512); x.scale(k, k)
        x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('FINAL SCORE', 0, -84)
        x.font = `800 150px ${INTER}`; x.fillStyle = INK; x.fillText(`${finalA}–${finalB}`, 6, 30); x.fillStyle = GOLD; x.fillText(`${finalA}–${finalB}`, 0, 24)
        x.font = `700 26px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.75)'; x.fillText('SPEED: 0 PTS', 0, 118)
        x.restore()
      }
      const FA = contestant(t, 'A'), FB = contestant(t, 'B')
      host(t)
      const buzzOf = side => Q.filter(q => q.first === side && q.buzz != null).map(q => q.buzz).concat(cfg[side].intro?.buzz ? [0.0, 0.36, 0.7, 1.4] : []).filter(b => b <= t).pop() ?? -9
      const litOf = side => Math.max(0, ...Q.filter(q => won(q, side)).map(q => t >= q.pointAt ? 1 - prog(t, q.pointAt, q.pointAt + 0.8) : 0))
      drawPodium(x, t, POD.A, cfg.A.sign, scoreAt('A', t), { buzz: buzzOf('A'), lit: litOf('A'), dome: !(cfg.A.domeOff && t >= cfg.A.domeOff[0] && t < cfg.A.domeOff[1]) })
      drawPodium(x, t, POD.B, cfg.B.sign, scoreAt('B', t), { buzz: buzzOf('B'), lit: litOf('B'), dome: !(cfg.B.domeOff && t >= cfg.B.domeOff[0] && t < cfg.B.domeOff[1]) })
      if (cfg.draw) cfg.draw(x, t, { ...S, FA, FB })
      for (const q of Q) {
        if (q.buzz != null) {
          const cx = POD[q.first]
          if (t > q.buzz && t < q.buzz + 0.6) label(x, 'BZZT!', cx + (q.first === 'A' ? 92 : -92), POD.top - 70 - 60 * prog(t, q.buzz, q.buzz + 0.6), { size: 40, col: '#ff8f9f', font: INTER, weight: 800, alpha: 1 - prog(t, q.buzz + 0.3, q.buzz + 0.6), rot: q.first === 'A' ? -0.15 : 0.15 })
          const sk = pop01(t, q.buzz + 0.15, 0.3, 2.6) * outK(t, [q.bubOut - 0.25, q.bubOut])
          if (sk > 0.01 && t > q.buzz) {
            x.save(); x.translate(cx, 1352); x.rotate(q.first === 'A' ? -0.04 : 0.04); x.scale(sk, sk)
            x.font = `700 28px ${MONO}`; const w = x.measureText('SPEED: 0 PTS').width + 28
            box(x, -w / 2, -20, w, 40, '#ffd23a', { b: 4 }); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SPEED: 0 PTS', 0, 1)
            x.restore()
          }
        }
        for (const side of ['A', 'B']) {
          if (!won(q, side)) continue
          const pk = t - q.pointAt
          if (pk < 0 || pk > 1.4) continue
          label(x, q.pts === 2 ? '+2 KIND' : '+1 KIND', POD[side], POD.top - 20 - 120 * ease.outCubic(Math.min(1, pk / 0.9)), { size: q.pts === 2 ? 58 : 46, col: GOLD, font: INTER, weight: 800, alpha: 1 - prog(pk, 1.0, 1.4) })
          sparkles(x, t, POD[side], POD.top + 128, q.pointAt, 8, 90, side === 'A' ? 1 : 2, [GOLD, BONE, PINK])
        }
        // the gag beat: the audience reacts (or cfg.gag text)
        if (q.gagAt != null && !(q.ansA.then || q.ansB.then) && t >= q.gagAt && t < q.gagAt + 1.6) {
          const g = q.gag || 'OOOOH', k = pop01(t, q.gagAt, 0.3, 2.6) * outK(t, [q.gagAt + 1.3, q.gagAt + 1.6])
          label(x, g, 690, 1700 - 30 * prog(t, q.gagAt, q.gagAt + 1.6), { size: 56, col: '#ffd23a', font: INTER, weight: 800, alpha: clamp(k), rot: -0.04 })
        }
      }
      if (t >= FIN) {
        confetti(x, t, T.confetti, 540, 700); confetti(x, t, T.confetti + 1.4, 300, 760, { n: 18 }); confetti(x, t, T.confetti + 2.2, 780, 760, { n: 18 })
        if (WIN === 'A' || WIN === 'both') prize(t, POD.A, 700, 'A')
        if (WIN === 'B' || WIN === 'both') prize(t, POD.B, 700, 'B')
        const pk = pop01(t, T.flip[1], 0.3, 2.4)
        if (pk > 0.01) for (const side of WIN === 'both' ? ['A', 'B'] : [WIN]) label(x, 'PRIZE: A TALK CARD', POD[side], 890, { size: 26, col: BONE, alpha: clamp(pk) })
      }
      audience(t)
      x.restore()
      // answers (top canvas, above the cast)
      tx.clearRect(0, 0, 1080, 1920)
      tx.save(); tx.translate(540, 900); tx.scale(cam0.z, cam0.z); tx.translate(-540, -900 + cam0.shake)
      for (const q of Q) {
        const s1 = q.first, s2 = q.first === 'A' ? 'B' : 'A'
        const col = s => (s === 'A' ? SA : SB).color
        drawAnswer(tx, t, POD[s1], q.ans1, q.bubOut, q.firstAns.text, col(s1), s1, q.firstAns.then ? { replaceAt: q.a + q.firstAns.then.at, text2: q.firstAns.then.text } : {})
        drawAnswer(tx, t, POD[s2], q.ans2, q.bubOut, q.secondAns.text, col(s2), s2, q.secondAns.then ? { replaceAt: q.a + q.secondAns.then.at, text2: q.secondAns.then.text } : {})
      }
      if (cfg.drawTop) cfg.drawTop(tx, t, S)
      tx.restore()
      fxx.clearRect(0, 0, 1080, 1920)
      promise(t)
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        paint(t)
        HF.update(t, 1)
        boxes.forEach(b => b.update(t))
        bug.update(t, 1)
        const cuts = [FIN]
        const fl = Math.max(0, ...cuts.map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // hook-kit layers: frame 0 is mid-whip with the hook slammed on; a record-scratch freeze at 0.5 s; a whip zoom into
  // every chapter with its sticker; loop films blend back into frame 0 over the last 0.45 s
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop ?? 138, size: cfg.hookSize ?? 100, accentColor: cfg.accent || SB.color, out: [5.4, 5.8] }
  const WHIP0 = { at: -0.12, from: 1.3, blur: 6 }
  const REC = { at: 0.5, len: 0.85, caption: cfg.scratch || 'the *full* game. no skips.', top: 820, sub: cfg.scratchSub ?? null }
  const WHIPS = segStarts.map(a => ({ at: a, from: 1.5, len: 0.42 }))
  const CHAPS = segStarts.map((a, i) => ({ at: a, out: [(i < 3 ? a + RL : i === 3 ? F0 : FIN) - 0.35, (i < 3 ? a + RL : i === 3 ? F0 : FIN) - 0.1], n: i + 1, title: CHAPTERS[i], x: 60, y: 192, color: CHAP_COL[i] }))
  const BUILD = frozen(build, [REC])
  const SCENES = [BUILD, whipZoom(WHIP0), ...WHIPS.map(whipZoom), slamTitle(HOOK), recordScratch(REC), ...CHAPS.map(chapter), ...(cfg.scenes || []),
    ...(LOOP ? [loopBack([build, whipZoom(WHIP0), slamTitle(HOOK), ...(cfg.loopScenes || [])], { duration: DURATION, len: LOOP })] : [])]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const buzzSnd = (t0, pan) => [['chip', r3(t0), 98, 0.34, { gain: 0.05, wave: 'square', duty: 0.3, decay: 0.4, sustain: 0.9, pan, dly: 0 }], ['chip', r3(t0), 147, 0.34, { gain: 0.03, wave: 'square', duty: 0.5, decay: 0.4, sustain: 0.9, pan, dly: 0 }], ['tick', r3(t0), 0.06]]
  const ding = t0 => [['bell', r3(t0), 1760, 0.045, 1.0, 0], ['bell', r3(t0 + 0.09), 2349.32, 0.035, 1.1, 0], ['pop', r3(t0), 1318.51, 0.04, 0]]
  const claps = (t0, n = 7) => Array.from({ length: n }, (_, i) => ['clap', r3(t0 + 0.08 + i * 0.11 + (i % 3) * 0.02), { gain: 0.09, pan: ((i * 37) % 10) / 10 - 0.5 }])
  const roll = (a, b) => Array.from({ length: Math.round((b - a) / 0.05) }, (_, i) => ['tom', r3(a + i * 0.05), 150 + (i % 2) * 12, { gain: 0.06 + 0.04 * i / ((b - a) / 0.05), decay: 0.12 }])
  const introBuzz = side => cfg[side].intro?.buzz ? [0.0, 0.36, 1.4].flatMap(b => buzzSnd(b, side === 'A' ? -0.4 : 0.4)) : []
  const CUES = [
    ['pop', 0.02, 880, 0.03, 0], ...introBuzz('A'), ...introBuzz('B'), ...(cfg.introCues || []),
    ['pop', r3(HOSTIN + 0.05), 987.77, 0.045, 0], ['pop', r3(HOSTIN + 0.12), 1318.51, 0.03, 0], ['glitter', r3(HOSTIN), r3(HOSTIN + 0.3)],
    ['pop', 3.75, 1174.66, 0.05, 0], ['pop', 3.83, 1567.98, 0.04, 0], ['whoosh', 5.4, 0.3, 0.03],
    ...[6.0, 8.0].flatMap((c, i) => [['whoosh', r3(c - 0.06), 0.3, 0.04], ['boom', r3(c + 0.05), 0.12], ['pop', r3(c + 0.3), NOTE[3 + i], 0.04, i ? 0.3 : -0.3]]),
    ...Q.flatMap(q => [
      ['whoosh', r3(q.cardIn), 0.4, q.kind === 'light' ? 0.03 : 0.04], ['tick', r3(q.cardIn + 0.4), 0.05],
      ...(q.buzz != null ? buzzSnd(q.buzz, q.first === 'A' ? -0.4 : 0.4) : []),
      ['pop', r3(q.ans1), 880, 0.04, q.first === 'A' ? -0.3 : 0.3], ['pop', r3(q.ans1 + 0.06), 1174.66, 0.03, q.first === 'A' ? -0.3 : 0.3],
      ['pop', r3(q.ans2), 739.99, 0.04, q.first === 'A' ? 0.3 : -0.3], ['pop', r3(q.ans2 + 0.06), 987.77, 0.03, q.first === 'A' ? 0.3 : -0.3],
      ...(q.ansA.flag || q.ansB.flag ? [['whoosh', r3(q.ans1 - 0.05), 0.25, 0.03], ['whoosh', r3(q.ans2 - 0.05), 0.25, 0.03]] : []),
      ...[q.ansA, q.ansB].flatMap(an => an.then ? [['pop', r3(q.a + an.then.at), 1567.98, 0.045, 0], ['tick', r3(q.a + an.then.at), 0.05]] : []),
      ...(q.gagAt != null && !(q.ansA.then || q.ansB.then) ? [['pop', r3(q.gagAt), 659.25, 0.035, 0], ...claps(q.gagAt, 3)] : []),
      ...ding(q.pointAt), ...claps(q.pointAt, q.kind === 'light' ? 4 : 7),
      ...(q.cam ? [['tick', r3(q.cam[0]), 0.05], ['whoosh', r3(q.cam[0]), 0.25, 0.03], ['pop', r3(q.cam[0] + 0.5), 1318.51, 0.035, 0]] : []),
      ...(q.board ? [['whoosh', r3(q.board[0]), 0.25, 0.03], ['pop', r3(q.board[0] + 0.05), 1174.66, 0.04, 0]] : []),
    ]),
    ...Array.from({ length: 18 }, (_, i) => ['tick', r3(L0 + 2.6 + i), i >= 13 ? 0.07 : 0.04]),
    ...talkCues(ALL_LINES, { cps: CPS }),
    ...roll(F0 + 0.4, F0 + 1.6), ['boom', r3(F0 + 1.6), 0.18],
    ...roll(T.finRoll[0], FIN),
    ['crash', FIN, { gain: 0.08, len: 2.4 }], ['boom', FIN, 0.25], ...claps(FIN + 0.05, 12), ['glitter', T.confetti, r3(T.confetti + 0.8)],
    ...wordPops(T.finHead, 2, 0.08, 3), ['pop', r3(T.finHead + 0.35), 1174.66, 0.045, 0], ['pop', r3(T.finHead + 0.45), 1567.98, 0.04, 0],
    ['whoosh', T.prize[0], 0.4, 0.04], ['whoosh', r3(T.flip[0]), 0.2, 0.03], ['pluck', T.flip[1], 1318.51, 0.045, 0.6, 0], ['glitter', T.flip[1], r3(T.flip[1] + 0.4)],
    ...whipZoomCues(WHIP0), ...WHIPS.flatMap(whipZoomCues), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...CHAPS.flatMap(chapterCues),
    ...(cfg.cues || []), ...(LOOP ? loopCues({ duration: DURATION, len: LOOP }) : []),
  ].filter(c => c[1] >= 0 && c[1] < DURATION)

  const CHECK = () => {
    const segs = [[LW, T.welcomeClose], ...LQ.map(({ q, lines }) => [lines, q.hostClose]), [LL, T.lightBox[1]], [LF, LAST_END]]
    return segs.flatMap(([ls, close]) => { const tm = lineTimes(ls, { cps: CPS }); return ls.map((l, i) => ({ text: l.text, len: l.text.replace(/\*/g, '').length, hold: +(((tm[i + 1]?.start ?? close) - tm[i].done)).toFixed(2) })) })
  }
  return { DURATION, SCENES, CUES, T, CHECK, WIN, finalA, finalB, LAST_END, Q }
}

// ── a small phone prop (episodes draw it in cfg.draw): bone screen lines, top line in `col`
export function drawPhone(x, t, cx, cy, k = 1, { lines = [], rot = 0, col = SKYB, w = 120, h = 200, size = 20 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#2a2244', { b: 6 }); R(x, '#0d0920', -w / 2 + 8, -h / 2 + 14, w - 16, h - 30)
  x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { x.fillStyle = i === 0 ? col : BONE; x.fillText(l, 0, -h / 2 + 44 + i * (size + 10)) })
  R(x, '#5a5470', -16, h / 2 - 12, 32, 5)
  x.restore()
}
/** a flying buzzer dome (frame-0 chaos): from (x0,y0) up in an arc and back, spinning; p 0…1 */
export function flyingDome(x, t, x0, y0, t0, t1, { height = 520, drift = 120, spins = 2.2 } = {}) {
  if (t < t0 || t >= t1) return
  const p = (t - t0) / (t1 - t0), px = x0 + drift * Math.sin(Math.PI * p), py = y0 - height * 4 * p * (1 - p)
  x.save(); x.translate(px, py); x.rotate(spins * Math.PI * 2 * p)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 40, 34, 0, Math.PI, 0); x.fill(); R(x, INK, -42, -2, 84, 14)
  x.fillStyle = RED; x.beginPath(); x.ellipse(0, -2, 32, 26, 0, Math.PI, 0); x.fill(); R(x, 'rgba(255,255,255,0.5)', -16, -22, 10, 6)
  x.restore()
  for (let i = 0; i < 4; i++) { const a = i * 1.6 + t * 3; R(x, '#fff1c8', px - 50 + 26 * i + 8 * Math.sin(a), py + 50 + 10 * Math.cos(a), 8, 8) }
}
/** a big card slamming into the marquee (frame-0 chaos): at may be negative (already landing at frame 0), out = [a, b] */
export function drawSlamCard(x, t, { at = -0.15, out = [5.6, 6.0], lines = [], col = RED, size = 92, sub = null, rot = -0.04, bg = BONE, ink = INK } = {}) {
  if (t >= out[1]) return
  const p = prog(t, at, at + 0.3), k = lerp(2.2, 1, ease.inCubic(p)), o = outK(t, out)
  const after = t - at - 0.3, wob = after > 0 ? 0.05 * Math.exp(-after * 6) * Math.sin(after * 40) : 0
  x.save(); x.translate(540 + (after > 0 ? 0 : 0), 512); x.rotate(rot + wob); x.scale(k * o, k * o); x.globalAlpha = clamp(p * 3)
  const w = 930, h = 270
  R(x, 'rgba(6,4,18,0.55)', -w / 2 + 16, -h / 2 + 20, w, h)
  box(x, -w / 2, -h / 2, w, h, bg, { b: 9 }); R(x, col, -w / 2, -h / 2, w, 14)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (sub) { x.font = `700 28px ${MONO}`; x.fillStyle = col; x.fillText(sub, 0, -h / 2 + 46) }
  x.font = `800 ${size}px ${INTER}`; x.fillStyle = ink
  const y0 = (sub ? 22 : 6) - (lines.length - 1) * size * 0.55
  lines.forEach((l, i) => x.fillText(l, 0, y0 + i * size * 1.1))
  x.restore()
  // impact lines
  if (after > -0.05 && after < 0.6) {
    const a = 1 - prog(after, 0, 0.6)
    x.save(); x.globalAlpha = a; x.strokeStyle = BONE; x.lineWidth = 8
    for (let i = 0; i < 10; i++) { const ang = i / 10 * Math.PI * 2, r0 = 500 + 80 * prog(after, 0, 0.6), r1 = r0 + 70; x.beginPath(); x.moveTo(540 + Math.cos(ang) * r0, 512 + Math.sin(ang) * r0 * 0.4); x.lineTo(540 + Math.cos(ang) * r1, 512 + Math.sin(ang) * r1 * 0.4); x.stroke() }
    x.restore()
  }
}
/** scream / panic lines around a point (frame-0 chaos) until `until` */
export function screamLines(x, t, cx, cy, until, { text = null, col = '#ffd23a', r = 170 } = {}) {
  if (t >= until) return
  const o = outK(t, [until - 0.3, until])
  x.save(); x.globalAlpha = o; x.strokeStyle = col; x.lineWidth = 9; x.lineCap = 'square'
  for (let i = 0; i < 7; i++) {
    const ang = -Math.PI / 2 + (i - 3) * 0.32, j = 10 * Math.sin(t * 30 + i)
    x.beginPath(); x.moveTo(cx + Math.cos(ang) * (r + j), cy + Math.sin(ang) * (r + j)); x.lineTo(cx + Math.cos(ang) * (r + 60 + j), cy + Math.sin(ang) * (r + 60 + j)); x.stroke()
  }
  x.restore()
  if (text) label(x, text, cx, cy - r - 100, { size: 64, col, font: INTER, weight: 800, alpha: o, rot: 0.06 * Math.sin(t * 25) })
}
