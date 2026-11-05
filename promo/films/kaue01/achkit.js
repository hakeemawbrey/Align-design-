// achkit — the shared look of ACHIEVEMENT UNLOCKED: SINGLE LIFE (Month 2 boost, batch m07, kaue01–kaue20).
// Owned by kaue01. Imported read-only by kaue02–kaue20. Single life, played as a video game: every small win of being
// single pops a game achievement. The running gag: Pisces watches every run from a little "P2 · SPECTATING" corner cam
// and cries (happy tears) whenever an achievement lands.
//
// No end card, no card cut, no logo, no wordmark, no seed-of-life mark (Month 2 rules). Pure f(t) canvas helpers; DOM
// helpers are made only inside build().
//
// ═══════════════════════════════════════ API (copy-paste)
//   import { R, box, drawBits, sparkles, hearts, confetti, bubble, label, shadow, starFrame, inSprite, tearsCells,
//            hero, piscesCam, achBug, xpBar, flash, speedLines, INK, BONE, GOLD, PINK, RED, LAV, CYAN, GREEN, INTER,
//            SERIF, MONO, r3, pop01, outK, popOut } from '../../kaue01/achkit.js'
//
// hero(x, t, sign, X, Y, size, o)   a sign star (drawStarChar) + extras. sign = 'aries' … 'pisces'. o = drawStarChar opts
//   plus: tears 0 | 1 sniffle | 2 streams | 3 fountains · shades 0…1 (pixel sunglasses; 1 = on the face) · crown.
//   Returns drawStarChar's { x, y, size, top }.
// piscesCam(x, t, { at, out, tears = 3, line = null, lineAt, mood = 'sparkle', x, y, w, h })
//   The spectator cam: a framed picture-in-picture (top-right by default) with a red ● and "P2 · SPECTATING", Pisces
//   inside it, crying. `line` = a bubble under the cam from lineAt. Pops in at `at`, out at `out`.
// achBug(root, at)   DOM bug top-left: a pixel trophy + "ACHIEVEMENT UNLOCKED · SINGLE LIFE" (Inter 800 small caps).
//   → { update(t, out = 1) }
// xpBar(x, t, { gains: [{ at, xp }], level = 1, y = 132, alpha = 1 })   a slim XP bar + "LV n" + the running XP total,
//   under the bug; each gain makes the bar jump with a flash. The level ticks up every 1000 XP.
// flash(x, t, at, { dur = 0.18, col = '#ffffff', a = 0.8 })   a full-frame colour flash.
// speedLines(x, t, a, { cx = 540, cy = 960, col })   radial anime speed lines (a = 0…1).
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { drawPixelStar } from '../sky.js'
import { easeOutBack } from '../wheel.js'
import { drawStarChar, signStar } from '../startalk.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const CYAN = '#7fe3ff', GREEN = '#7dff9a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, drawPixelStar }

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
export const TROPHY = ['GGGGGGG', 'GHGGGGG', '.GGGGG.', '..GGG..', '...G...', '..GGG..', '.BBBBB.']
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
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE] } = {}) {
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
/** a pixel speech bubble (canvas), popping at t0, gone by t1. tail −1…1 = where the tail sits along the bottom edge */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, maxW = 900 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const tw = Math.min(maxW - 44, x.measureText(text).width), w = tw + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2, maxW - 44)
  x.restore()
}
/** pixel label text on canvas (Space Mono), with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, maxW } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4, maxW)
  x.fillStyle = col; x.fillText(text, 0, 0, maxW)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a full-frame colour flash at `at` */
export function flash(x, t, at, { dur = 0.18, col = '#ffffff', a = 0.8 } = {}) {
  const p = prog(t, at, at + dur)
  if (t < at || p >= 1) return
  x.save(); x.globalAlpha = a * (1 - p); x.fillStyle = col; x.fillRect(0, 0, 1080, 1920); x.restore()
}
/** radial anime speed lines, strength a 0…1 */
export function speedLines(x, t, a, { cx = 540, cy = 960, col = 'rgba(255,255,255,0.55)', n = 40, inner = 380 } = {}) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = clamp(a); x.fillStyle = col
  for (let i = 0; i < n; i++) {
    const ang = i / n * Math.PI * 2 + Math.floor(t * 24) * 0.37 + i * 1.7
    const r0 = inner + ((i * 53) % 140), r1 = 1400, wd = 0.012 + ((i * 7) % 5) * 0.004
    x.beginPath(); x.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0)
    x.lineTo(cx + Math.cos(ang - wd) * r1, cy + Math.sin(ang - wd) * r1); x.lineTo(cx + Math.cos(ang + wd) * r1, cy + Math.sin(ang + wd) * r1); x.closePath(); x.fill()
  }
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
/** happy tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
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
/** a little pixel crown on top of the sprite */
function crownCells(x) {
  const C = ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG']
  C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = INK; x.fillRect(15.5 + i - 0.25, -2.4 + j - 0.25, 1.5, 1.5) }))
  C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'R' ? RED : GOLD; x.fillRect(15.5 + i, -2.4 + j, 1, 1) }))
}

const SIGN_ID = { aqua: 'aquarius', sag: 'sagittarius', cap: 'capricorn' }
export const NAMES = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
export const tag = sign => { const id = SIGN_ID[sign] || sign; return `${signStar(id).glyph} ${NAMES[id]}` }
export const signColor = sign => signStar(SIGN_ID[sign] || sign).color

export function hero(x, t, sign, X, Y, size, o = {}) {
  const id = SIGN_ID[sign] || sign
  const st = signStar(id)
  const r = drawStarChar(x, X, Y, size, t, { color: st.color, glyph: size >= 120 ? st.glyph : null, ...o })
  if (o.tears || o.shades != null || o.crown) {
    const F = starFrame(X, Y, size, t, o)
    if (o.alpha !== undefined && o.alpha <= 0) return r
    x.save(); if (o.alpha !== undefined) x.globalAlpha *= o.alpha
    inSprite(x, F, () => {
      if (o.crown) crownCells(x)
      if (o.shades != null && o.shades > 0) shadesCells(x, 1 - o.shades)
      if (o.tears) tearsCells(x, t, o.tears)
    })
    x.restore()
  }
  return r
}

// ── the spectator cam: Pisces, P2, watching every run and crying
export function piscesCam(x, t, { at = 0, out = 1e9, tears = 3, line = null, lineAt = null, lineOut = null, mood = 'sparkle', x: cx = 852, y: cy = 820, w = 300, h = 300, look = [-1, 0], hops = null } = {}) {
  const k = pop01(t, at, 0.34, 2.2) * outK(t, [out - 0.2, out])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.03)
  // frame + screen
  R(x, 'rgba(6,4,18,0.55)', -w / 2 + 12, -h / 2 + 14, w, h)
  box(x, -w / 2, -h / 2, w, h, '#120c2e', { b: 7 })
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
  const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1d5e'); g.addColorStop(1, '#4a2f78')
  x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
  for (let i = 0; i < 14; i++) { const sx = ((i * 97) % w) - w / 2, sy = ((i * 61) % (h * 0.6)) - h / 2 + 10; R(x, i % 3 ? 'rgba(255,255,255,0.5)' : GOLD, sx, sy, 4, 4) }
  // the couch arm + a tissue box
  R(x, '#6a4a9a', -w / 2, h / 2 - 54, w, 54); R(x, '#83c', -w / 2, h / 2 - 54, w, 6)
  box(x, w / 2 - 92, h / 2 - 96, 66, 38, '#e9f6ff', { b: 4 }); R(x, '#ffffff', w / 2 - 70, h / 2 - 108, 22, 14)
  hero(x, t, 'pisces', -14, 26, 190, { mood, look, tears, seed: 12, hops, glow: 0.7 })
  // scanlines
  x.globalAlpha = 0.12; for (let yy = -h / 2; yy < h / 2; yy += 6) R(x, '#000', -w / 2, yy, w, 2)
  x.restore()
  // the label
  R(x, INK, -w / 2, -h / 2 - 44, w, 40)
  const blink = Math.floor(t * 2) % 2 === 0
  if (blink) { x.fillStyle = RED; x.beginPath(); x.arc(-w / 2 + 22, -h / 2 - 24, 8, 0, Math.PI * 2); x.fill() }
  label(x, 'P2 · SPECTATING', 14, -h / 2 - 24, { size: 21, col: BONE })
  x.restore()
  if (line && t >= (lineAt ?? at + 0.5)) bubble(x, t, cx, cy + h / 2 + 64, lineAt ?? at + 0.5, lineOut ?? out, line, { size: 30, tail: 0.3, col: '#d8f3ff', maxW: 520 })
}

// ── the series bug (DOM)
export function achBug(root, at = 0) {
  const b = el('div', { position: 'absolute', left: '56px', top: '58px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const cv = el('canvas', { width: '36px', height: '40px', imageRendering: 'pixelated' }, b)
  cv.width = 9; cv.height = 10
  const c = cv.getContext('2d')
  drawBits(c, TROPHY, { G: GOLD, H: '#fff6c8', B: '#c98a3a' }, 4.5, 5, 1)
  el('div', { font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.95), 0 0 3px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    'ACHIEVEMENT&nbsp;UNLOCKED<span style="color:rgba(255,255,255,0.75)">&nbsp;·&nbsp;SINGLE&nbsp;LIFE</span>')
  return {
    update(t, out = 1) {
      const k = (t <= at ? 1 : pop01(t, at, 0.36, 2.2)) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2))
      b.style.transform = `scale(${(0.6 + 0.4 * Math.min(1, k)).toFixed(4)})`
    },
  }
}

// ── the XP bar under the bug
export function xpBar(x, t, { gains = [], level = 1, y = 128, alpha = 1, x0 = 58, w = 560 } = {}) {
  if (alpha <= 0) return
  let xp = 0, lastAt = -9
  for (const g of gains) {
    if (t < g.at) continue
    const p = ease.outCubic(prog(t, g.at, g.at + 0.5))
    xp += g.xp * p
    lastAt = g.at
  }
  const lv = level + Math.floor(xp / 1000), f = (xp % 1000) / 1000
  const fl = Math.max(0, 1 - (t - lastAt) / 0.4)
  x.save(); x.globalAlpha *= alpha
  label(x, `LV ${lv}`, x0, y + 9, { size: 24, col: GREEN, align: 'left' })
  const bx = x0 + 92
  R(x, INK, bx - 4, y - 4, w + 8, 26); R(x, '#2a2150', bx, y, w, 18)
  R(x, fl > 0 ? '#eaffef' : GREEN, bx, y, w * f, 18); R(x, 'rgba(255,255,255,0.35)', bx, y, w * f, 5)
  for (let i = 1; i < 10; i++) R(x, INK, bx + w * i / 10 - 1, y, 2, 18)
  label(x, `${Math.round(xp)} XP`, bx + w + 18, y + 9, { size: 22, col: BONE, align: 'left' })
  x.restore()
}
