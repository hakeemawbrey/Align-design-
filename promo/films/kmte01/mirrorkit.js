// MIRROR TALK: the shared look of kmte01–kmte20 (Month 2 boost, batch m21, promo/films/month2/m21.md).
// A sign talks to its reflection, and the reflection talks back with the advice they'd give a friend.
// Imported read-only by kmte02–20. No end card, no card cut, no logo: DURATION is the story.
//
//   makeMirror(cfg) → { DURATION, SCENES, CUES }
//   cfg:
//     id, sign ('aries'…), dur (s), loop (bool: the last LOOP_LEN s ease back to the frame-0 composition)
//     hook: { text, accent }          the frame-0 caption (already on screen at t = 0), out time `hook.out`
//     caps: [{ at, out, text, accent, top? }]   later top captions (popText)
//     lines: [{ t, who, text }]       who: 'S' (the sign) · 'M' (THE REFLECTION) · 'P' (Pisces) · any other name tag
//     boxes: [[open, close], …]       dialogue box windows; each line belongs to the window that contains its t
//     pose: (t) → { x, y, s, mood, look, squash, rot, alpha, pop, draw }   overrides of the sign pose (default stance)
//     refl: (t) → { … }               overrides of the reflection pose (inside the glass)
//     pis:  (t) → { x, y, s, tears, mood, look, alpha }   Pisces (default: on the vanity shelf, crying)
//     cam:  (t) → { zoom, dx, dy, rot }  extra camera; shakes: [[t, amp]]; flashes: [[t, colour]]
//     back(x, t, K) · glass(x, t, K) · front(x, t, K) · over(x, t, K): custom canvas layers (K = kit helpers)
//     dom(root, K) → { update(t) }: custom DOM layers (built after fonts)
//     chapters: [{ at, n, text }]     long episodes: hookkit chapter stickers (top-left under the bug; put caps at top ≥ 250)
//     fx: [{ k: 'whipZoom' | 'recordScratch' | 'screenShake' | 'caught' | 'notification' | 'loadingBar' | 'glitch' | …, ...opts }]
//                                     hookkit effects (recordScratch also freezes the build); their cues are added
//     cues: [...]                     extra sound cues; talk blips, hops, box ticks are added automatically
//     bulbs: (t) → 0…1                the vanity bulbs' brightness (default 1)
//     glassTint: '#…'                 the glass colour (default cool blue)
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import * as HK from '../hookkit.js'

export { clamp, lerp, prog, ease, el, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, popText }
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const CYAN = '#8fe9ff', MINT = '#9fe6b0', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#8fe9ff'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inK = (t, a, d = 0.3) => ease.outCubic(prog(t, a, a + d))
export const win = (t, a, b, fi = 0.25, fo = 0.25) => clamp(prog(t, a, a + fi)) * (1 - clamp(prog(t, b - fo, b)))
export const LOOP_LEN = 0.45

// ─────────────────────────────────────────────── layout
export const MIR = { x: 250, y: 500, w: 580, h: 705 }          // the glass (inside the frame)
export const SHELF = { y: 1222, h: 34 }
export const SIGN_AT = { x: 300, y: 1225, s: 280 }              // the sign, in the room, lower left
export const REFL_AT = { x: 650, y: 905, s: 250 }               // its reflection, in the glass, upper right
export const PIS_AT = { x: 808, y: 1140, s: 140 }               // Pisces, sitting on the shelf
export const TISSUE_AT = { x: 690, y: 1192 }

// ─────────────────────────────────────────────── canvas helpers (pixel-chunky props)
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
export const BROKEN = ['.HH.HH.', 'HHH.HHH', 'HH.HHHH', '.HH.HH.', '..H.H..', '...H...']
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
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
/** a pixel speech bubble, popping at t0, gone by t1 */
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
  g.addColorStop(0, `rgba(${col},${0.05 * a})`); g.addColorStop(1, `rgba(${col},${0.26 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 30, top); x.lineTo(tx + 30, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${col},${0.3 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}

// ── star sprite frame (mirrors startalk.js) so props sit on the sprite through hops and squash
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
/** a tiny pixel crown / bow / glasses on the sprite (cells) */
export function crownCells(ctx) {
  const C = ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG']
  C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; ctx.fillStyle = INK; ctx.fillRect(15.5 + i - 0.25, -2.4 + j - 0.25, 1.5, 1.5) }))
  C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; ctx.fillStyle = ch === 'R' ? RED : GOLD; ctx.fillRect(15.5 + i, -2.4 + j, 1, 1) }))
}

// ─────────────────────────────────────────────── props
/** a phone: thread of bubbles (msgs: [{ at, side: 'L'|'R', text }]), title bar, optional typing dots window */
export function drawPhone(x, t, { cx, top, w = 440, h = 640, title = '', msgs = [], typing = null, rot = 0, alpha = 1, k = 1, size = 26, read = null } = {}) {
  if (k <= 0.01 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, top + h / 2); x.rotate(rot); x.scale(k, k); x.translate(-w / 2, -h / 2)
  R(x, INK, -10, -10, w + 20, h + 20); R(x, '#2a2147', -4, -4, w + 8, h + 8)
  R(x, '#120d26', 0, 0, w, h)
  R(x, '#231a44', 0, 0, w, 70); R(x, '#3a2e66', 0, 66, w, 4)
  x.font = `700 ${size}px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, w / 2, 36)
  // bubbles stack from the bottom up
  const shown = msgs.filter(m => t >= m.at)
  x.font = `700 ${size}px ${INTER}`
  const wrap = (s, mw) => { const ws = s.split(' '), out = []; let cur = ''; for (const q of ws) { const n = cur ? cur + ' ' + q : q; if (x.measureText(n).width > mw && cur) { out.push(cur); cur = q } else cur = n } if (cur) out.push(cur); return out }
  let y = h - 24 - (typing && t >= typing[0] && t < typing[1] ? 70 : 0)
  if (read && t >= read.at) { x.font = `700 ${size - 6}px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.textAlign = 'right'; x.fillText(read.text, w - 22, y - 6); y -= 40; x.font = `700 ${size}px ${INTER}` }
  for (let i = shown.length - 1; i >= 0 && y > 90; i--) {
    const m = shown[i], L = wrap(m.text, w * 0.62), bh = L.length * (size + 8) + 22
    const bw = Math.max(...L.map(s => x.measureText(s).width)) + 36
    const p = easeOutBack(prog(t, m.at, m.at + 0.22), 2)
    const bx = m.side === 'R' ? w - 20 - bw : 20, by = y - bh
    x.save(); x.translate(bx + (m.side === 'R' ? bw : 0), by + bh); x.scale(p, p); x.translate(-(bx + (m.side === 'R' ? bw : 0)), -(by + bh))
    R(x, m.side === 'R' ? (m.col || '#4f8dff') : (m.col || '#3b335c'), bx, by, bw, bh)
    x.fillStyle = m.side === 'R' ? '#ffffff' : BONE; x.textAlign = 'left'; x.textBaseline = 'top'
    L.forEach((s, j) => x.fillText(s, bx + 18, by + 12 + j * (size + 8)))
    x.restore()
    y = by - 14
  }
  if (typing && t >= typing[0] && t < typing[1]) {
    R(x, '#3b335c', 20, h - 84, 110, 56)
    for (let i = 0; i < 3; i++) { const a = 0.4 + 0.6 * Math.max(0, Math.sin(t * 9 - i * 0.9)); x.fillStyle = `rgba(239,230,214,${a})`; x.fillRect(42 + i * 26, h - 62, 14, 14) }
  }
  x.restore()
}
/** a sheet of paper / note with handwritten-ish lines (lines: [{ text, at, strike?, col? }]) */
export function drawNote(x, t, { cx, cy, w = 460, h = 560, rot = 0, k = 1, lines = [], title = '', size = 34, paper = '#fff4dc', ink = '#3a2a5a', lineGap = 58 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 14, -h / 2 + 18, w, h)
  box(x, -w / 2, -h / 2, w, h, paper, { b: 6 })
  for (let y = -h / 2 + 110; y < h / 2 - 20; y += lineGap) R(x, 'rgba(120,150,220,0.35)', -w / 2 + 20, y + 10, w - 40, 3)
  R(x, 'rgba(232,52,78,0.45)', -w / 2 + 56, -h / 2 + 10, 3, h - 20)
  if (title) { x.font = `800 ${size + 4}px ${INTER}`; x.fillStyle = ink; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillText(title, -w / 2 + 72, -h / 2 + 70) }
  lines.forEach((L, i) => {
    if (t < L.at) return
    const p = clamp(prog(t, L.at, L.at + Math.max(0.25, L.text.length * 0.035)))
    const s = L.text.slice(0, Math.ceil(L.text.length * p))
    const yy = -h / 2 + 110 + i * lineGap
    x.font = `${L.bold ? 800 : 600} ${L.size || size}px ${INTER}`; x.fillStyle = L.col || ink; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.fillText(s, -w / 2 + 72, yy)
    if (L.strike != null && t >= L.strike) {
      const sp = ease.outCubic(prog(t, L.strike, L.strike + 0.25)), tw = x.measureText(L.text).width
      R(x, RED, -w / 2 + 64, yy - (L.size || size) * 0.35, (tw + 16) * sp, 6)
    }
    if (L.check != null && t >= L.check) drawBits(x, ['.....G', '....GG', 'G..GG.', 'GGGG..', '.GG...'], { G: '#2fbf71' }, -w / 2 + 34, yy - 12, 5 * pop01(t, L.check, 0.25, 2.4))
  })
  x.restore()
}
/** a talk card (face-down back or face-up question), drawn in pixels: no brand anywhere */
export function drawTalkCard(x, t, { cx, cy, w = 300, rot = 0, k = 1, flip = 1, text = '', kicker = 'TALK CARD' } = {}) {
  if (k <= 0.01) return
  const h = w * 1.45
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * Math.max(0.02, Math.abs(Math.cos(Math.PI * (1 - clamp(flip))))), k)
  const face = flip > 0.5
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 14, -h / 2 + 18, w, h)
  if (!face) {
    box(x, -w / 2, -h / 2, w, h, '#2a1f55', { b: 6 })
    R(x, GOLD, -w / 2 + 16, -h / 2 + 16, w - 32, 4); R(x, GOLD, -w / 2 + 16, h / 2 - 20, w - 32, 4)
    drawPixelStar(x, 0, 0, w * 0.32, 2, GOLD)
  } else {
    box(x, -w / 2, -h / 2, w, h, '#fff4dc', { b: 6 })
    R(x, '#f2c75c', -w / 2, -h / 2, w, 54)
    x.font = `700 ${Math.round(w * 0.075)}px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(kicker, 0, -h / 2 + 28)
    x.font = `800 ${Math.round(w * 0.12)}px ${INTER}`
    const ws = text.split(' '), L = []; let cur = ''
    for (const q of ws) { const n = cur ? cur + ' ' + q : q; if (x.measureText(n).width > w * 0.8 && cur) { L.push(cur); cur = q } else cur = n }
    if (cur) L.push(cur)
    L.forEach((s, j) => x.fillText(s, 0, (j - (L.length - 1) / 2) * w * 0.15 + 10))
  }
  x.restore()
}
/** the tissue box on the shelf */
export function tissues(x, cx, cy, s = 70, t = 0, pulls = []) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
  for (const p0 of pulls) {        // a tissue flying out
    const p = prog(t, p0, p0 + 0.7)
    if (p <= 0 || p >= 1) continue
    x.save(); x.globalAlpha = 1 - p; x.translate(cx + p * 60, cy - s * 0.4 - p * 120 + 160 * p * p); x.rotate(p * 3)
    R(x, INK, -14, -14, 28, 28); R(x, '#ffffff', -11, -11, 22, 22); x.restore()
  }
}
/** a clock face showing hh:mm (pixel digits) */
export function drawClock(x, cx, cy, text, { k = 1, col = '#ff6b7f', size = 64 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + 50
  box(x, -w / 2, -size * 0.75, w, size * 1.5, '#120d26', { b: 6 })
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = col; x.shadowBlur = 16; x.fillText(text, 0, 4)
  x.restore()
}
/** a polaroid photo with two little stars in it (memories) */
export function drawPhoto(x, { cx, cy, w = 220, rot = 0, k = 1, a = '#f39a3a', b = '#7fd0ff', capt = '', heart = true, faded = 0 } = {}) {
  if (k <= 0.01) return
  const h = w * 1.18
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 10, -h / 2 + 14, w, h)
  box(x, -w / 2, -h / 2, w, h, '#fbf3e4', { b: 5 })
  R(x, '#2a1f55', -w / 2 + 14, -h / 2 + 14, w - 28, w - 28)
  drawPixelStar(x, -w * 0.16, -h / 2 + 14 + (w - 28) * 0.55, w * 0.26, 2, a)
  drawPixelStar(x, w * 0.16, -h / 2 + 14 + (w - 28) * 0.55, w * 0.26, 2, b)
  if (heart) drawBits(x, HEART, { H: '#ff5c8a' }, 0, -h / 2 + 14 + (w - 28) * 0.25, w * 0.025)
  if (faded > 0) { x.globalAlpha = faded; R(x, '#fbf3e4', -w / 2 + 14, -h / 2 + 14, w - 28, w - 28); x.globalAlpha = 1 }
  if (capt) { x.font = `700 ${Math.round(w * 0.09)}px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(capt, 0, h / 2 - w * 0.12) }
  x.restore()
}

// ─────────────────────────────────────────────── the set: wall, vanity mirror with bulbs, shelf
function drawRoom(x, t) {
  // a deep plum bedroom wall over the night sky, with a floor
  const g = x.createLinearGradient(0, 380, 0, 1920)
  g.addColorStop(0, 'rgba(26,16,52,0.0)'); g.addColorStop(0.25, 'rgba(26,16,52,0.55)'); g.addColorStop(1, 'rgba(14,8,30,0.92)')
  x.fillStyle = g; x.fillRect(0, 380, 1080, 1540)
  R(x, 'rgba(10,6,24,0.75)', 0, 1300, 1080, 620)
  R(x, 'rgba(242,199,92,0.10)', 0, 1300, 1080, 4)
  // a soft warm pool of light from the bulbs
  const p = x.createRadialGradient(540, 860, 60, 540, 860, 760)
  p.addColorStop(0, 'rgba(255,214,150,0.16)'); p.addColorStop(1, 'rgba(255,214,150,0)')
  x.fillStyle = p; x.fillRect(0, 300, 1080, 1300)
  void t
}
function drawGlass(x, t, tint) {
  const g = x.createLinearGradient(MIR.x, MIR.y, MIR.x + MIR.w, MIR.y + MIR.h)
  g.addColorStop(0, tint[0]); g.addColorStop(1, tint[1])
  x.fillStyle = g; x.fillRect(MIR.x, MIR.y, MIR.w, MIR.h)
  // a faint mirrored room: the far wall line and a tiny window of stars
  R(x, 'rgba(255,255,255,0.05)', MIR.x, MIR.y + MIR.h * 0.72, MIR.w, 3)
  for (let i = 0; i < 14; i++) {
    const sx = MIR.x + 40 + ((i * 97) % (MIR.w - 80)), sy = MIR.y + 30 + ((i * 53) % 180)
    const a = 0.25 + 0.25 * Math.sin(t * 1.7 + i)
    x.fillStyle = `rgba(220,240,255,${a})`; x.fillRect(sx, sy, 4, 4)
  }
}
function drawGlare(x, t) {
  x.save(); x.globalCompositeOperation = 'lighter'
  for (const [o, w, a] of [[0, 70, 0.07], [120, 26, 0.06], [400, 44, 0.04]]) {
    const sx = MIR.x + o + 30 * Math.sin(t * 0.3)
    x.fillStyle = `rgba(200,240,255,${a})`
    x.beginPath(); x.moveTo(sx, MIR.y); x.lineTo(sx + w, MIR.y); x.lineTo(sx + w - 260, MIR.y + MIR.h); x.lineTo(sx - 260, MIR.y + MIR.h); x.closePath(); x.fill()
  }
  x.restore()
}
const FRAME_B = 26
function drawFrame(x, t, bulbK) {
  const { x: X, y: Y, w, h } = MIR, b = FRAME_B
  // the frame: ink outline, warm wood/gold body, highlight
  R(x, INK, X - b - 8, Y - b - 8, w + 2 * b + 16, h + 2 * b + 16)
  R(x, '#c58f3c', X - b, Y - b, w + 2 * b, h + 2 * b)
  R(x, '#e8b85c', X - b, Y - b, w + 2 * b, 8); R(x, '#8a5a24', X - b, Y + h + b - 8, w + 2 * b, 8)
  R(x, INK, X - 6, Y - 6, w + 12, h + 12)
  // bulbs around the frame
  const pts = []
  for (let i = 0; i < 6; i++) pts.push([X + 30 + i * (w - 60) / 5, Y - b / 2])
  for (let i = 0; i < 6; i++) { pts.push([X - b / 2, Y + 70 + i * (h - 140) / 5]); pts.push([X + w + b / 2, Y + 70 + i * (h - 140) / 5]) }
  pts.forEach(([px, py], i) => {
    const fl = clamp(bulbK * (0.88 + 0.12 * Math.sin(t * 7 + i * 1.3)))
    if (fl > 0.05) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const gg = x.createRadialGradient(px, py, 2, px, py, 60); gg.addColorStop(0, `rgba(255,226,160,${0.6 * fl})`); gg.addColorStop(1, 'rgba(255,226,160,0)')
      x.fillStyle = gg; x.fillRect(px - 60, py - 60, 120, 120); x.restore()
    }
    R(x, INK, px - 13, py - 13, 26, 26)
    R(x, fl > 0.05 ? `rgb(${Math.round(lerp(90, 255, fl))},${Math.round(lerp(80, 240, fl))},${Math.round(lerp(90, 200, fl))})` : '#4a4060', px - 9, py - 9, 18, 18)
    if (fl > 0.4) R(x, '#ffffff', px - 6, py - 6, 6, 6)
  })
}
function drawShelf(x) {
  const X = MIR.x - 80, w = MIR.w + 160
  R(x, INK, X - 6, SHELF.y - 6, w + 12, SHELF.h + 12)
  R(x, '#7a4f2a', X, SHELF.y, w, SHELF.h); R(x, '#a06c3a', X, SHELF.y, w, 8)
  R(x, 'rgba(6,4,18,0.4)', X, SHELF.y + SHELF.h + 6, w, 26)
}

// ─────────────────────────────────────────────── the bug: MIRROR TALK (Inter 800 small caps, letter-spaced)
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '26px', background: 'linear-gradient(135deg,#bff4ff,#5fc8e8)', boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(143,233,255,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'MIRROR&nbsp;<span style="color:rgba(255,255,255,0.65)">TALK</span>')
  return { update() {} }
}

// ─────────────────────────────────────────────── chapter sticker fallback (used when hookkit's isn't passed in)
export function buildChapter(root, { n, text, at, out, col = CYAN }) {
  const wrap = el('div', { position: 'absolute', left: '56px', top: '118px', display: 'none', pointerEvents: 'none', transformOrigin: '0% 50%' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 22px 12px 12px', background: BONE, border: `5px solid ${INK}`, borderRadius: '10px', boxShadow: '6px 6px 0 rgba(6,4,18,0.7)', transform: 'rotate(-3deg)' }, wrap)
  el('div', { width: '50px', height: '50px', borderRadius: '50%', background: col, border: `4px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 28px ${INTER}`, color: INK }, st, String(n))
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.08em', color: INK, whiteSpace: 'nowrap' }, st, text)
  return {
    update(t) {
      const on = t >= at && t < out
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.35), 2.4), o = 1 - ease.inQuad(prog(t, out - 0.25, out))
      wrap.style.opacity = String(clamp(k * 2) * o)
      wrap.style.transform = `scale(${(lerp(0.3, 1, k) * lerp(0.8, 1, o)).toFixed(4)})`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeMirror(cfg) {
  const DURATION = cfg.dur
  const SIGN = signStar(cfg.sign), PIS = signStar('pisces')
  const NAME = cfg.sign.toUpperCase()
  const TAG = { S: `${SIGN.glyph}︎ ${NAME}`, M: 'THE REFLECTION', P: `${PIS.glyph}︎ PISCES` }
  const COL = { S: cfg.signTagCol || '#ffe27a', M: CYAN, P: '#b9a6ff' }
  const CPS = cfg.cps || 30
  const LINES = (cfg.lines || []).map(L => ({ t: L.t, speaker: TAG[L.who] || L.who, color: L.color || COL[L.who] || GOLD, text: L.text }))
  const BOXES = (cfg.boxes || []).map(([o, c]) => ({ open: o, close: c, lines: LINES.filter(L => L.t >= o && L.t < c) }))
  const SIGN_HOPS = [...talkHops(LINES, TAG.S, { cps: CPS }), ...(cfg.signHops || [])]
  const REFL_HOPS = [...talkHops(LINES, TAG.M, { cps: CPS }), ...(cfg.reflHops || [])]
  const PIS_HOPS = [...talkHops(LINES, TAG.P, { cps: CPS }), ...(cfg.pisHops || [])]
  const tint = cfg.glassTint || ['#1d3a5c', '#251a4a']

  const K = {
    SIGN, PIS, TAG, MIR, SHELF, SIGN_AT, REFL_AT, PIS_AT, DURATION,
    sign: (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: SIGN.color, glyph: o.s >= 150 ? SIGN.glyph : null, seed: 3, glow: 1.1, hops: SIGN_HOPS, ...o }),
    pisces: (x, t, P) => {
      const opts = { color: PIS.color, mood: P.mood || 'wide', look: P.look || [-1, -0.5], seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops || PIS_HOPS, tips: false }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      const F = starFrame(P.x, P.y, P.s, t, opts)
      if (P.tears) inSprite(x, F, () => tearsCells(x, t, P.tears))
      return F
    },
  }

  // the poses (defaults, then the film's overrides)
  const signPose = t => ({ ...SIGN_AT, mood: 'neutral', look: [1, -0.8], pop: 1, ...(cfg.pose ? cfg.pose(t) : {}) })
  const reflPose = t => ({ ...REFL_AT, mood: 'happy', look: [-1, 0.6], pop: 1, ...(cfg.refl ? cfg.refl(t) : {}) })
  const pisPose = t => ({ ...PIS_AT, mood: 'wide', tears: 2, look: [-1, -0.4], pop: 1, ...(cfg.pis ? cfg.pis(t) : {}) })

  function camAt(t) {
    let c = { zoom: 1, dx: 0, dy: 0, rot: 0, ...(cfg.cam ? cfg.cam(t) : {}) }
    for (const [t0, amp, dur = 0.45] of (cfg.shakes || [])) {
      const d = t - t0
      if (d > 0 && d < dur) { const e = Math.exp(-d * 9); c.dx += amp * e * Math.sin(d * 63); c.dy += amp * 0.7 * e * Math.cos(d * 51) }
    }
    return c
  }

  /** draw the whole canvas picture at time t (the loop ending calls it at two times and blends) */
  function paint(x, t) {
    const c = camAt(t)
    drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * (0.9 + 0.1 * c.zoom) })
    x.save()
    x.translate(540 + c.dx, 960 + c.dy); x.rotate(c.rot); x.scale(c.zoom, c.zoom); x.translate(-540, -960)
    drawRoom(x, t)
    if (cfg.back) cfg.back(x, t, K)
    drawFrame(x, t, cfg.bulbs ? cfg.bulbs(t) : 1)
    // the glass + its world
    x.save(); x.beginPath(); x.rect(MIR.x, MIR.y, MIR.w, MIR.h); x.clip()
    drawGlass(x, t, tint)
    if (cfg.glassBack) cfg.glassBack(x, t, K)
    const rp = reflPose(t)
    if (rp.alpha !== 0 && !rp.hide) {
      drawStarChar(x, rp.x, rp.y, rp.s, t, { color: SIGN.color, glyph: rp.s >= 150 ? SIGN.glyph : null, mood: rp.mood, look: rp.look, seed: 11, glow: 1.25, hops: REFL_HOPS, pop: rp.pop, alpha: (rp.alpha ?? 1) * 0.94, squash: rp.squash || 0 })
      if (rp.draw) rp.draw(x, t, starFrame(rp.x, rp.y, rp.s, t, { pop: rp.pop, hops: REFL_HOPS, seed: 11, squash: rp.squash || 0 }))
    }
    if (cfg.glass) cfg.glass(x, t, K)
    // the "friend voice" rim: a cool wash
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(120,200,255,0.06)'; x.fillRect(MIR.x, MIR.y, MIR.w, MIR.h); x.restore()
    drawGlare(x, t)
    if (cfg.glassOver) cfg.glassOver(x, t, K)
    x.restore()
    drawShelf(x)
    if (!cfg.noTissues) tissues(x, TISSUE_AT.x, TISSUE_AT.y, 70, t, cfg.tissuePulls || [])
    if (cfg.mid) cfg.mid(x, t, K)
    // Pisces on the shelf
    const pp = pisPose(t)
    if (!pp.hide && pp.pop > 0.01) K.pisces(x, t, pp)
    // the sign in the room
    const sp = signPose(t)
    if (!sp.hide && sp.pop > 0.01) {
      shadow(x, sp.x, sp.y + sp.s * 0.42, sp.s * 0.9, 0.4)
      x.save()
      if (sp.rot) { x.translate(sp.x, sp.y); x.rotate(sp.rot); x.translate(-sp.x, -sp.y) }
      K.sign(x, t, sp)
      if (sp.draw) sp.draw(x, t, starFrame(sp.x, sp.y, sp.s, t, { pop: sp.pop, hops: SIGN_HOPS, seed: 3, squash: sp.squash || 0 }))
      x.restore()
    }
    if (cfg.front) cfg.front(x, t, K)
    x.restore()
    if (cfg.over) cfg.over(x, t, K)
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "600 34px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const caps = (cfg.caps || []).map(c => ({ c, p: popText(root, c.text, { top: c.top || 170, size: c.size || 96, accentSize: c.accentSize || 128, at: c.at, gap: c.gap ?? 0.08, accentColor: c.accent || CYAN, late: c.late || 0, lateAt: c.lateAt ?? null, wobble: !!c.wobble }) }))
    const boxes = BOXES.map(B => dialogueBox(root, { lines: B.lines, y: cfg.boxY || 1400, open: B.open, close: B.close, cps: CPS, size: cfg.boxSize || 50 }))
    const custom = cfg.dom ? cfg.dom(root, K) : null
    buildBug(root)
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none' }, root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function domAt(t) {
      for (const { c, p } of caps) p.update(t, outK(t, c.out))
      for (const b of boxes) b.update(t)
      if (custom) custom.update(t)
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        paint(x, t)
        domAt(t)
        // flashes
        let fa = 0, fc = '#fff'
        for (const [t0, col = '#fff', d = 0.18] of (cfg.flashes || [])) { const p = prog(t, t0, t0 + d); if (t >= t0 && p < 1) { const a = 1 - p; if (a > fa) { fa = a; fc = col } } }
        flash.style.opacity = String(fa * 0.85); flash.style.background = fc
        drawGrain(gx, t)
      },
    }
  }

  // ── sound: talk blips + hops are automatic; the film adds its own cues
  const CUES = [
    ...talkCues(LINES, { cps: CPS, pitch: { [TAG.M]: 520, [TAG.S]: 760, [TAG.P]: 980 } }),
    ...(cfg.caps || []).map(c => ['pop', r3(c.at), 1174.66, 0.035, 0]),
    ...(cfg.shakes || []).map(([t0, amp]) => ['tom', r3(t0), 80, { gain: Math.min(0.3, 0.08 + amp / 120), decay: 0.25 }]),
    ...(cfg.cues || []),
  ]
  // the hook kit: the frame-0 slam title, fx overlays, chapter stickers, the loop-back
  const HOOK = { at: -1, top: 160, size: 100, accentColor: CYAN, out: [2.6, 2.85], ...cfg.hook }
  const FX = (cfg.fx || []).map(o => ({ o, f: HK[o.k], c: HK[o.k + 'Cues'] || (o.k === 'screenShake' ? HK.shakeCues : null) }))
  const CH = (cfg.chapters || []).map((ch, i, a) => ({ at: ch.at, out: ch.out || [a[i + 1] ? a[i + 1].at - 0.25 : DURATION + 1, a[i + 1] ? a[i + 1].at - 0.05 : DURATION + 2], n: ch.n ?? i + 1, title: ch.text, x: 56, y: 118, color: ch.color || CYAN }))
  const recs = FX.filter(e => e.o.k === 'recordScratch').map(e => e.o)
  const main = recs.length ? HK.frozen(build, recs) : build
  const SCENES = [main, HK.slamTitle(HOOK), ...FX.map(e => e.f(e.o)), ...CH.map(c => HK.chapter(c))]
  if (cfg.loop) SCENES.push(HK.loopBack([build, HK.slamTitle(HOOK)], { duration: DURATION, len: cfg.loopLen || LOOP_LEN }))
  CUES.push(...HK.slamTitleCues(HOOK), ...FX.flatMap(e => e.c ? e.c(e.o) : []), ...CH.flatMap(c => HK.chapterCues(c)))
  if (cfg.loop) CUES.push(...HK.loopCues({ duration: DURATION, len: cfg.loopLen || LOOP_LEN }))
  return { DURATION, SCENES, CUES, K, paint }
}
