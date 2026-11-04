// ONE-LINE ADVICE FOR YOUR SIGN: the shared format of the 24 star_advice trial reels nole01–nole24
// (promo/films/next30/b42.md). Every episode imports this file from ../../nole01/scenes/olkit.js.
//
// The format (12–14 s including the 4.4 s end card; story 0 … STORY_END):
//   0 … CUT      THE MOMENT. Frame 0 is the thumbnail: the hook caption ("*Aries*, when the date | gets *moved.*") is
//                fully on screen and the sign's star is mid-action in a little winter scene (cfg.sit). One small turn
//                in the middle (the sign does the relatable thing).
//   CUT          one card flip (the only card cut).
//   CUT … END    THE LINE. Eyebrow "★ ONE LINE FOR YOU, ARIES" (Space Mono, gold), then THE STARS' one line pops in big
//                (Inter 800 + one EB Garamond italic accent, it is the film's last line). THE STARS (gold star) sits
//                bottom-left, the sign's star reacts (cfg.after), and Pisces cries happy tears bottom-right into a
//                tissue (when the sign is Pisces, the sign's own star does the crying).
//   The bug "ONE-LINE ADVICE · FOR YOUR SIGN" sits top-left 56 px from the edges the whole story.
//
//   makeOneLine(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.sign ('aries'…), cfg.name ('Aries'), cfg.len (12 | 13 | 14), cfg.hook (hook text, '|' = line break,
//     '*word*' = accent), cfg.line (THE STARS' one line), cfg.accent (accent colour, default the sign's colour),
//     cfg.date (a sign id for the other star, default 'libra'),
//     cfg.sit(x, t, S)    draws the moment (0 … CUT).    S = { u: t, T, hero, date, HERO, DATE, k }
//     cfg.after(x, t, S)  draws the sign's star + props in THE LINE (CUT … END).  S = { u: t − CUT, T, hero, date, ok, ... }
//                         Default: the sign's star, happy, at (760, 1170).
//     cfg.cues            extra sound cues (absolute times).
//     cfg.hookTop / hookSize / hookAccent / lineSize / lineAccent: type tweaks.
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { hookPOV, hookPOVCues, phoneScreen, phoneCues, speechBubble, speechCues, DAY_FONTS } from '../../st9day.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', SKYB = '#7fd0ff', MINT = '#9fe6b0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, phoneScreen, phoneCues, speechBubble, speechCues }

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
/** a pixel speech bubble (canvas), popping at t0, gone by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, rot = 0 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** a puffy pixel thought cloud centred on (cx, cy), w × h, with three trailing puffs toward (fx, fy) */
export function cloud(x, cx, cy, w, h, k = 1, { fx = null, fy = null, col = BONE } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const puffs = [[-0.32, -0.18, 0.34], [0, -0.3, 0.38], [0.32, -0.16, 0.34], [-0.36, 0.14, 0.3], [0.36, 0.14, 0.3], [0, 0.18, 0.4]]
  for (const pass of [0, 1]) for (const [px, py, r] of puffs) {
    x.fillStyle = pass ? col : INK
    x.beginPath(); x.ellipse(px * w, py * h, r * w * 0.62 + (pass ? 0 : 6), r * h * 1.05 + (pass ? 0 : 6), 0, 0, Math.PI * 2); x.fill()
  }
  x.restore()
  if (fx !== null) for (let i = 0; i < 3; i++) {
    const q = (i + 1) / 4, r = (14 - i * 4) * k
    const px = lerp(cx, fx, 0.55 + q * 0.45), py = lerp(cy + h * 0.45, fy, 0.55 + q * 0.45)
    x.fillStyle = INK; x.beginPath(); x.arc(px, py, r + 5, 0, Math.PI * 2); x.fill()
    x.fillStyle = col; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill()
  }
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
/** falling pixel snow over a rect */
export function snow(x, t, { x0 = 0, y0 = 0, w = 1080, h = 1920, n = 60, alpha = 0.8, seed = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.fillStyle = '#ffffff'
  for (let i = 0; i < n; i++) {
    const r1 = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453, fx = r1 - Math.floor(r1)
    const r2 = Math.sin(i * 39.3468 + seed * 11.135) * 23421.631, fy = r2 - Math.floor(r2)
    const sp = 60 + 70 * fx, s = 4 + Math.round(fx * 3) * 2
    const py = y0 + ((fy * h + t * sp) % h), px = x0 + ((fx * w + Math.sin(t * 1.3 + i) * 16) % w + w) % w
    x.fillRect(Math.round(px), Math.round(py), s, s)
  }
  x.restore()
}
/** a small café table (top at y) */
export function table(x, cx, y, w = 520) {
  box(x, cx - w / 2, y, w, 26, '#8a5a3c', { b: 6, hi: '#a8724e' })
  R(x, INK, cx - 16, y + 32, 32, 1300 - y); R(x, '#6b4a2f', cx - 9, y + 32, 18, 1300 - y)
}
/** a little pixel phone (no app chrome): bubbles = [{ at, side: 'L'|'R', text, col }]; typing = [a, b] dots */
export function miniPhone(x, t, { cx, cy, w = 380, h = 600, rot = 0, k = 1, title = '', msgs = [], typing = null, buzz = null, size = 28 } = {}) {
  if (k <= 0.01) return
  let shake = 0
  if (buzz) for (const b of [].concat(buzz)) if (t > b && t < b + 0.35) shake = 7 * Math.sin((t - b) * 80) * (1 - (t - b) / 0.35)
  x.save(); x.translate(cx + shake, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 7 })
  R(x, '#141029', -w / 2 + 16, -h / 2 + 56, w - 32, h - 90)
  R(x, '#3b3166', -w / 2 + 16, -h / 2 + 16, w - 32, 40)
  x.font = `700 20px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 37)
  R(x, '#5a5470', -30, h / 2 - 24, 60, 8)
  // bubbles stack from the bottom
  const shown = msgs.filter(m => t >= m.at)
  let y = h / 2 - 54
  if (typing && t > typing[0] && t < typing[1]) {
    box(x, -w / 2 + 34, y - 52, 110, 46, '#3b3166', { b: 3 })
    for (let i = 0; i < 3; i++) { const a = 0.4 + 0.6 * Math.max(0, Math.sin(t * 9 - i)); x.globalAlpha = a; R(x, BONE, -w / 2 + 56 + i * 26, y - 36, 14, 14) }
    x.globalAlpha = 1; y -= 64
  }
  x.font = `700 ${size}px ${INTER}`
  for (let i = shown.length - 1; i >= 0; i--) {
    const m = shown[i], kk = pop01(t, m.at, 0.25, 2.4)
    const lines = wrapText(x, m.text, w - 120)
    const lh = size * 1.25, bw = Math.max(...lines.map(l => x.measureText(l).width)) + 32, bh = lines.length * lh + 20
    if (y - bh < -h / 2 + 64) break
    const bx = m.side === 'R' ? w / 2 - 32 - bw : -w / 2 + 32
    x.save(); x.translate(bx + (m.side === 'R' ? bw : 0), y); x.scale(kk, kk); x.translate(-(bx + (m.side === 'R' ? bw : 0)), -y)
    box(x, bx, y - bh, bw, bh, m.col || (m.side === 'R' ? '#5fa8ff' : '#e9e2f5'), { b: 3 })
    x.fillStyle = m.side === 'R' ? '#ffffff' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    lines.forEach((l, j) => x.fillText(l, bx + 16, y - bh + 10 + lh * (j + 0.5)))
    x.restore()
    y -= bh + 16
  }
  x.restore()
}
export function wrapText(x, text, maxW) {
  const words = String(text).split(' '), out = []
  let cur = ''
  for (const w of words) { const n = cur ? cur + ' ' + w : w; if (x.measureText(n).width > maxW && cur) { out.push(cur); cur = w } else cur = n }
  if (cur) out.push(cur)
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
/** a tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** a pixel scarf wrapped at the star's neck (sprite cells) */
export function scarfCells(ctx, col = '#e8344e', col2 = '#ffffff') {
  for (let i = 0; i < 14; i++) { ctx.fillStyle = INK; ctx.fillRect(11 + i, 23.6, 1, 3.4) }
  for (let i = 0; i < 14; i++) { ctx.fillStyle = i % 4 < 2 ? col : col2; ctx.fillRect(11 + i, 24, 1, 2.6) }
  ctx.fillStyle = INK; ctx.fillRect(21.6, 25.6, 3.8, 6.8); ctx.fillStyle = col; ctx.fillRect(22, 26, 3, 6); ctx.fillStyle = col2; ctx.fillRect(22, 30, 3, 1)
}

// ── the bug: "ONE-LINE ADVICE · FOR YOUR SIGN" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: GOLD, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(242,199,92,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'ONE-LINE&nbsp;ADVICE<span style="color:rgba(255,255,255,0.6)">&nbsp;·&nbsp;FOR&nbsp;YOUR&nbsp;SIGN</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(clamp(out)) } }
}

// the eyebrow over the line: "★ ONE LINE FOR YOU, ARIES"
function buildEyebrow(root, { text, col, at, out }) {
  const w = el('div', { position: 'absolute', left: '0', top: '330px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const p = el('div', { font: `700 34px ${MONO}`, letterSpacing: '0.14em', color: INK, background: col, padding: '10px 26px 12px', border: `5px solid ${INK}`, boxShadow: '8px 8px 0 rgba(6,4,18,0.7)', whiteSpace: 'nowrap', transform: 'rotate(-2deg)' }, w, text)
  return {
    update(t) {
      const on = t >= at && t < out[1]
      w.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.3), 2.4) * outK(t, out)
      p.style.opacity = String(clamp(k * 2)); p.style.transform = `rotate(-2deg) scale(${Math.max(0.01, k).toFixed(4)})`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeOneLine(cfg) {
  const DURATION = cfg.len || 12
  const STORY_END = r3(DURATION - ENDCARD_LEN)
  const CUT = cfg.cut || { 12: 3.6, 13: 4.1, 14: 4.6 }[DURATION] || 3.6
  const T = {
    cut: CUT, hookOut: [CUT - 0.22, CUT - 0.02],
    eyebrow: r3(CUT + 0.3), line: r3(CUT + 0.5), starsIn: r3(CUT + 0.15), heroIn: r3(CUT + 0.25), pisIn: r3(CUT + 0.55),
    end: STORY_END, out: [r3(STORY_END - 0.42), r3(STORY_END - 0.02)], bugOut: [r3(STORY_END - 0.3), STORY_END],
  }
  const words = cfg.line.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length
  T.land = r3(T.line + 0.09 * (words - 1) + 0.45)          // the accent lands last
  T.react = r3(T.land + 0.25)
  const HERO = signStar(cfg.sign), PIS = signStar('pisces'), DATE = signStar(cfg.date || 'libra')
  const ACC = cfg.accent || HERO.color
  const isPis = cfg.sign === 'pisces'

  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const date = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: DATE.color, glyph: o.s >= 150 ? DATE.glyph : null, seed: 7, glow: 1, ...o })
  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }

  async function build(stage) {
    try {
      await Promise.all([...DAY_FONTS, "800 112px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "700 34px 'Space Mono'", "700 20px 'Space Mono'", "700 28px Inter"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const hook = hookPOV(root, { text: cfg.hook, at: 0, out: T.hookOut, top: cfg.hookTop ?? 200, size: cfg.hookSize ?? 92, accentSize: cfg.hookAccent ?? 128, accentColor: ACC })
    const brow = buildEyebrow(root, { text: `★ ONE LINE FOR YOU, ${cfg.name.toUpperCase()}`, col: GOLD, at: T.eyebrow, out: T.out })
    const line = popText(root, cfg.line, { top: cfg.lineTop ?? 450, size: cfg.lineSize ?? 104, accentSize: cfg.lineAccent ?? 150, at: T.line, gap: 0.09, late: 1, lateAt: T.land - 0.12, wobble: true, accentColor: ACC, fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function theLine(t) {
      if (t < CUT || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const S = { u: t - CUT, T, hero, date, HERO, DATE, ok, pisces }
      // THE STARS, bottom-left, proud
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) {
        shadow(x, 230, 1420, 200 * sk)
        drawStarChar(x, 230, 1280, 200, t, { color: STAR.sky, mood: t > T.land ? 'happy' : 'neutral', look: [1, -0.6], hops: [T.starsIn + 0.3, T.line + 0.05, T.land], pop: sk, seed: 2, glow: 1.05 })
        label(x, 'THE STARS', 230, 1470, { size: 24, col: GOLD, alpha: clamp(sk) })
      }
      if (cfg.after) cfg.after(x, t, S)
      else {
        const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
        shadow(x, 640, 1330, 220 * hk)
        hero(x, t, { x: 640, y: 1170, s: 250, pop: hk, mood: t > T.react ? 'happy' : 'wide', look: [-0.6, -0.8], hops: [T.heroIn + 0.3, T.react, T.react + 0.5] })
      }
      // Pisces, bottom-right, crying happy tears into a tissue (when the hero is Pisces, cfg.after does the crying)
      if (!isPis && !cfg.noPis) {
        const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
        if (pk > 0.01) {
          tissues(x, 1010, 1575, 80 * Math.min(1, pk))
          pisces(x, t, { x: 880, y: 1500, s: 170, pop: pk, hops: [T.pisIn + 0.3, T.land + 0.05] }, t > T.land ? 3 : 2, 'sparkle', [-1, -1])
        }
      }
      sparkles(x, t, 540, 560, T.land, 12, 360, 1, [GOLD, BONE, ACC])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, t < CUT ? { ...SKY_H, zoom: SKY_H.zoom * 1.12 } : SKY_H)
        if (t < CUT) {
          // a slow push-in on the moment
          const z = 1 + 0.035 * prog(t, 0, CUT)
          x.save(); x.translate(540, 1000); x.scale(z, z); x.translate(-540, -1000)
          cfg.sit(x, t, { u: t, T, hero, date, HERO, DATE, pisces })
          x.restore()
        }
        theLine(t)
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.top) cfg.top(tx, t, { T, hero, date, HERO, DATE, pisces })
        hook.update(t)
        brow.update(t)
        line.update(t, outK(t, T.out))
        bug.update(t, outK(t, T.bugOut))
        const fl = t >= T.land && t < T.land + 0.12 ? 1 - (t - T.land) / 0.12 : 0
        flash.style.opacity = String(0.22 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate: the flip into THE LINE
  const CUTS = [{ t: CUT, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br', fadeIn: 0 }), cardCuts(CUTS)]

  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ...hookPOVCues(0),
    ['pop', T.starsIn, 739.99, 0.035, -0.4], ['pop', T.heroIn, 987.77, 0.035, 0.1],
    ['pop', T.eyebrow, 1174.66, 0.04, 0], ['tick', r3(T.eyebrow + 0.02), 0.04],
    ...Array.from({ length: words }, (_, i) => ['pop', r3(T.line + i * 0.09), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]),
    ['pop', T.land, 1318.51, 0.05, 0], ['bell', r3(T.land + 0.03), 1760, 0.03, 1.2, 0], ['glitter', T.land, r3(T.land + 0.45)],
    ...(isPis ? [] : [['pop', T.pisIn, 987.77, 0.03, 0.4], ['pluck', r3(T.land + 0.1), 2349.32, 0.015, 0.4, 0.5]]),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS, STORY_END }
}
