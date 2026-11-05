// RATE THE OPENER: the shared format look of kroe01–kroe24 (Month 2 boost, star_advice trial reels, batch m37).
// Imported read-only by every episode. Built on promo/films/hookkit.js (hook effects + loop helper).
// No end card, no card transition, no logo: DURATION is the story length.
//
// The short format (9–11 s; the times below are for 10 s, everything after 3.0 s stretches with the length):
//   0.00        FRAME 0: the hook line is slammed on screen; the first message is mid-flight out of the phone toward the
//               lens (tilted, huge, motion streaks), the sender sign star is mid-reaction beside the phone, and the
//               judges' score paddles are mid-flip on the desk.
//   0.40–1.15   pattern break: record scratch + freeze (red "caught" circle on the opener) or a whip zoom into it.
//   1.15–1.60   the bubble lands in the chat.
//   1.90        THE STARS' paddle flips to the first score (buzzer); the desk nameplate says why.
//   3.10        a red pen slashes the opener (or adds a line, or hovers and leaves when the opener is already good).
//   3.60–4.90   THE STARS' better opener types itself into the chat.
//   5.00        SEND · 5.30 the paddles flip to the new score (ding) · 5.80 typing dots · 6.40 the reply lands.
//   6.60        Pisces (the judge on the end of the panel) bawls; 6.90 the last line slams in at the top and holds.
//   end         hard cut (holds on the last line) or loop (the last 0.45 s rewinds into the exact frame-0 picture).
//
//   makeOpener(cfg) → { DURATION, SCENES, CUES, T }
//   cfg: id, dur, sign (sender), opener (text), better (text), reply (text), last (THE STARS' last line),
//        hook (the hook line, *accent*), bad: [score, why], good: [score, why], fix: 'slash' | 'add' | 'none',
//        brk: 'scratch' | 'whip', ending: 'loop' | 'cut', mood0 (sender mood at frame 0), judge (end judge, 'pisces'),
//        match (the match's name in the chat header), night (darker sky), prop(x, t, S) / back(x, t, S) (episode
//        drawings, in front of / behind the phone), hero: { x, y, s } (sender placement).
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', GREEN = '#5fd68a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ffd166'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, el, fill, drawSky, drawGrain, layerCanvas, SKY_H, GRAIN_H, popText }

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
}
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  x.restore()
}
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    drawBits(x, HEART, { H: cols[i % cols.length] }, cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, cy - p * 200, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = 520 + 260 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt, sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]; x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4); x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }

// ── star sprite frame (mirrors startalk.js drawStarChar) so props / tears sit on the sprite through hops and squash
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
  const s = size * pop, cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G, S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob, hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09, base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) { ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell); fn(); ctx.restore() }
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
/** a star character with optional tears; returns the sprite frame */
export function star(x, t, sign, o = {}) {
  const S = sign === 'stars' ? { color: STAR.sky, glyph: null } : signStar(sign)
  const opts = { color: S.color, glyph: o.s >= 150 ? S.glyph : null, seed: o.seed ?? 3, glow: o.glow ?? 1, ...o }
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  const F = starFrame(o.x, o.y, o.s, t, opts)
  if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
  return F
}
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8); R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ── chat pieces
/** wrap text to lines of at most maxW px (font must be set) */
export function wrap(x, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let line = ''
    for (const w of para.split(' ')) { const tryL = line ? line + ' ' + w : w; if (x.measureText(tryL).width > maxW && line) { out.push(line); line = w } else line = tryL }
    out.push(line)
  }
  return out
}
/** measure a chat bubble: { w, h, lines } */
export function measureBubble(x, text, { size = 46, maxW = 620 } = {}) {
  x.save(); x.font = `800 ${size}px ${INTER}`
  const lines = wrap(x, text, maxW), w = Math.max(...lines.map(l => x.measureText(l).width)) + 52, h = lines.length * size * 1.16 + 40
  x.restore()
  return { w, h, lines }
}
/** a chat bubble anchored at its top-right (side 'R') or top-left (side 'L') corner */
export function chatBubble(x, text, side, ax, ay, { col = BONE, ink = INK, size = 46, maxW = 620, k = 1, rot = 0, chars = Infinity, alpha = 1, caret = false, t = 0 } = {}) {
  if (k <= 0.01 || alpha <= 0) return null
  const M = measureBubble(x, text, { size, maxW })
  const { w, h } = M
  const X = side === 'R' ? ax - w : ax, Y = ay
  const px = side === 'R' ? X + w : X, py = Y + h
  x.save(); x.globalAlpha *= alpha
  x.translate(px, py); x.rotate(rot); x.scale(k, k); x.translate(-px, -py)
  const b = 6
  R(x, INK, X - b, Y, w + 2 * b, h); R(x, INK, X, Y - b, w, h + 2 * b)
  R(x, col, X, Y, w, h)
  R(x, 'rgba(255,255,255,0.22)', X + 8, Y + 6, w - 16, 6)
  // the tail
  const tx = side === 'R' ? X + w - 6 : X - 12
  R(x, INK, tx - 6, Y + h - 16, 30, 22); R(x, col, tx, Y + h - 10, 18, 10)
  x.font = `800 ${size}px ${INTER}`; x.fillStyle = ink; x.textAlign = 'left'; x.textBaseline = 'top'
  let left = chars
  M.lines.forEach((l, i) => {
    if (left <= 0) return
    const s = l.slice(0, Math.max(0, left)); left -= l.length + 1
    x.fillText(s, X + 26, Y + 22 + i * size * 1.16)
    if (caret && left <= 0 && Math.floor(t * 4) % 2 === 0) R(x, ink, X + 26 + x.measureText(s).width + 4, Y + 22 + i * size * 1.16, 5, size)
  })
  x.restore()
  return { X, Y, w, h, cx: X + w / 2, cy: Y + h / 2 }
}
/** typing dots in a small bubble */
export function typingDots(x, t, ax, ay, k = 1, side = 'L', col = BONE) {
  if (k <= 0.01) return
  const w = 150, h = 84, X = side === 'L' ? ax : ax - w
  x.save(); x.translate(X + w / 2, ay + h / 2); x.scale(k, k); x.translate(-(X + w / 2), -(ay + h / 2))
  R(x, INK, X - 6, ay, w + 12, h); R(x, INK, X, ay - 6, w, h + 12); R(x, col, X, ay, w, h)
  for (let i = 0; i < 3; i++) { const j = Math.max(0, Math.sin(t * 9 - i * 0.9)) * 10; R(x, '#6a6488', X + 32 + i * 34, ay + 34 - j, 18, 18) }
  x.restore()
}
/** the phone / chat card */
export const CARD = { x: 130, y: 452, w: 820, h: 800 }
export function chatCard(x, t, { match = 'Sam', sub = 'new match · say hi!', night = false, avatar = '#7fd0ff' } = {}) {
  const { x: X, y: Y, w, h } = CARD
  box(x, X, Y, w, h, night ? '#150f2a' : '#1f1840', { b: 8 })
  R(x, night ? '#221a40' : '#2c2356', X, Y, w, 112)
  R(x, INK, X, Y + 112, w, 6)
  // avatar: a little round pixel face
  x.save(); x.fillStyle = INK; x.beginPath(); x.arc(X + 70, Y + 56, 38, 0, Math.PI * 2); x.fill(); x.fillStyle = avatar; x.beginPath(); x.arc(X + 70, Y + 56, 32, 0, Math.PI * 2); x.fill(); x.restore()
  R(x, INK, X + 58, Y + 48, 6, 8); R(x, INK, X + 76, Y + 48, 6, 8); R(x, INK, X + 60, Y + 68, 20, 5)
  x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(match, X + 128, Y + 42)
  x.font = `700 24px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillText(sub, X + 128, Y + 80)
  // a small online dot that pulses
  x.fillStyle = GREEN; x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4); x.fillRect(X + w - 60, Y + 48, 16, 16); x.globalAlpha = 1
}

// ── the judges' desk
export const DESK = { y: 1650 }
/** a score paddle: round face on a stick; flip 0..1 spins it on its vertical axis; text in the middle */
export function paddle(x, cx, cy, text, { flip = 0, col = BONE, ink = RED, r = 104, k = 1, rot = 0, sub = '/10' } = {}) {
  if (k <= 0.01) return
  const sx = Math.cos(flip * Math.PI)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -11, r - 8, 22, 150); R(x, '#a07850', -6, r - 8, 12, 146)
  x.save(); x.scale(Math.max(0.04, Math.abs(sx)), 1)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = sx < 0 ? '#c9bfae' : col; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  if (sx >= 0) {
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-r * 0.5, -r * 0.78, r, 8)
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = ink
    const big = String(text).length > 1 ? 96 : 118
    x.font = `800 ${big}px ${INTER}`; x.fillText(text, 0, sub ? -12 : 0)
    if (sub) { x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.fillText(sub, 0, 58) }
  }
  x.restore(); x.restore()
}
/** the desk: a long panel with a nameplate sticker in the middle */
export function desk(x, t) {
  const Y = DESK.y
  R(x, INK, 0, Y - 8, 1080, 8)
  R(x, '#3a2d66', 0, Y, 1080, 1920 - Y); R(x, '#4a3a80', 0, Y, 1080, 16)
  for (let i = 0; i < 6; i++) R(x, 'rgba(6,4,18,0.25)', 60 + i * 180, Y + 60, 6, 260)
  void t
}
export function nameplate(x, t, text, t0, t1, { col = BONE, ink = INK, y = DESK.y + 140, rot = -0.03 } = {}) {
  const k = pop01(t, t0, 0.3, 2.6) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(540, y); x.rotate(rot); x.scale(k, k)
  x.font = `800 58px ${INTER}`
  const w = Math.min(1000, x.measureText(text.toUpperCase()).width + 70), h = 104
  R(x, 'rgba(6,4,18,0.6)', -w / 2 + 10, -h / 2 + 10, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 6 })
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text.toUpperCase(), 0, 3)
  x.restore()
}

// ── the red pen
export function pen(x, px, py, rot = -0.6, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(k, k)
  // tip at (0,0), body going up-right
  x.fillStyle = INK; x.beginPath(); x.moveTo(-4, 4); x.lineTo(34, -26); x.lineTo(26, -40); x.lineTo(-10, -6); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(28, -26); x.lineTo(24, -34); x.lineTo(-4, -6); x.closePath(); x.fill()
  x.save(); x.translate(30, -33); x.rotate(-0.72)
  box(x, 0, -17, 230, 34, RED, { b: 5, hi: '#ff6b7f' }); R(x, BONE, 150, -17, 14, 34); box(x, 228, -14, 26, 28, '#b81e36', { b: 5 })
  x.restore(); x.restore()
}
/** a red slash line from a to b, drawn on with p 0..1 */
export function slash(x, ax, ay, bx, by, p, w = 16) {
  if (p <= 0) return
  const ex = lerp(ax, bx, p), ey = lerp(ay, by, p)
  x.save(); x.lineCap = 'round'
  x.strokeStyle = INK; x.lineWidth = w + 10; x.beginPath(); x.moveTo(ax, ay); x.lineTo(ex, ey); x.stroke()
  x.strokeStyle = RED; x.lineWidth = w; x.beginPath(); x.moveTo(ax, ay); x.lineTo(ex, ey); x.stroke()
  x.restore()
  return [ex, ey]
}

// ── the bug: "RATE THE OPENER", Inter 800 small caps, letter-spaced, top-left
export function buildBug(root, text = 'RATE&nbsp;THE<span style="color:rgba(255,255,255,0.62)">&nbsp;OPENER</span>') {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,209,102,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, text)
  return b
}

export const FONTS = ["800 112px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"]
export async function loadFonts() { try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* optional */ } }

// ═══════════════════════════════════════════════════════════════════════════ the short episode
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, caught, caughtCues, loopBack, loopCues } from '../hookkit.js'
export * as hook from '../hookkit.js'

/** a lighter tint of a hex colour (mix with white) */
export function tint(hex, k = 0.45) {
  const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255
  const m = v => Math.round(v + (255 - v) * k)
  return `rgb(${m(r)},${m(g)},${m(b)})`
}

export const JUDGES = { stars: { x: 300, y: 1572, s: 240 }, end: { x: 780, y: 1572, s: 232 }, paddleY: 1392 }
export const SLOT = { right: CARD.x + CARD.w - 44, left: CARD.x + 44, top: CARD.y + 150 }

/** the timeline of a short: fixed up to 3.0 s, stretched after it so the length can be 9–11 s */
export function shortTimes(dur, brk) {
  const k = (dur - 3.0) / 7.0, s = v => r3(3.0 + (v - 3.0) * k)
  return {
    fa: 0.4, fb: brk === 'scratch' ? 1.15 : 0.4, land: 1.6, score1: 1.9, why1: 2.05,
    h0Out: [3.0, 3.18], pen: 3.1, slash: [3.15, s(3.5)], fall: [s(3.5), s(3.85)], type: [s(3.62), s(4.9)],
    send: s(5.0), score2: s(5.3), why2: s(5.45), dots: [s(5.8), s(6.35)], reply: s(6.4), bawl: s(6.6), last: s(6.9), dur,
  }
}

export function makeOpener(cfg) {
  const DURATION = cfg.dur
  const brk = cfg.brk || 'scratch', fix = cfg.fix || 'slash', ending = cfg.ending || 'cut'
  const T = shortTimes(DURATION, brk)
  const HERO = signStar(cfg.sign), HCOL = tint(HERO.color, 0.5)
  const endSign = cfg.judge || 'pisces'
  // te: the picture's own clock, held during the record-scratch freeze so nothing jumps when it resumes
  const te = t => brk !== 'scratch' ? t : t < T.fa ? t : t < T.fb ? T.fa : t - (T.fb - T.fa)
  const LAND_E = T.land - (T.fb - T.fa)          // landing time on the te clock
  const HERO_POS = { x: 160, y: 1190, s: 240, ...(cfg.hero || {}) }
  const HOOK = { at: -1, text: cfg.hook, top: 200, size: cfg.hookSize || 96, out: T.h0Out }
  const LAST = { at: T.last, text: cfg.last, top: 190, size: cfg.lastSize || 92 }
  const REC = { at: T.fa, len: T.fb - T.fa, caption: cfg.recCap || 'yep. *they sent it.*', top: 1700 }
  const WHIP = { at: T.fa, len: 0.5, from: 1.85, to: 1, cx: 620, cy: 700 }
  // the opener's resting place, worked out once the canvas exists (needs measureText)
  let OP = null, BT = null, RP = null
  const goodTxt = fix === 'add' ? cfg.better : cfg.better

  async function build(stage) {
    await loadFonts()
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    buildBug(root)
    const gx = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }).getContext('2d')
    // layout
    const mo = measureBubble(x, cfg.opener, { size: cfg.opSize || 58 })
    OP = { ax: SLOT.right, ay: SLOT.top, ...mo }
    const mb = measureBubble(x, goodTxt || ' ', { size: 52 })
    BT = { ax: SLOT.right, ay: fix === 'add' ? OP.ay + OP.h + 30 : SLOT.top, ...mb }
    const mr = measureBubble(x, cfg.reply, { size: 52 })
    const after = fix === 'none' ? OP.ay + OP.h : BT.ay + BT.h
    RP = { ax: SLOT.left, ay: after + 40, ...mr }

    return {
      start: 0, end: DURATION + 1, root, x,
      update(t) {
        const e = te(t)
        drawSky(x, e, { ...SKY_H, dim: cfg.night ? 0.4 : SKY_H.dim, zoom: SKY_H.zoom + 0.03 * Math.sin(e * 0.6) })
        const S = { t, e, T, x, HERO }
        if (cfg.back) cfg.back(x, e, S)
        chatCard(x, e, { match: cfg.match || 'Sam', sub: cfg.sub || 'new match · say hi!', night: cfg.night, avatar: cfg.avatar })
        drawChat(x, t, e)
        // the sender, mid-reaction at the edge of the phone
        const hm = heroMood(t)
        const F = star(x, e, cfg.sign, { ...HERO_POS, mood: hm.mood, look: hm.look, hops: [LAND_E, T.score1 + 0.05, T.send, T.reply + 0.05], tears: cfg.sign === 'pisces' ? (t > T.bawl ? 3 : 2) : 0, seed: 3, squash: e < 0.4 ? -0.06 : 0 })
        S.F = F
        if (t > T.reply) hearts(x, t, T.reply + 0.1, HERO_POS.x + 20, HERO_POS.y - 110, { n: 5 })
        if (cfg.prop) cfg.prop(x, e, S)
        // the judges' desk
        drawJudges(x, t, e)
        drawPen(x, t)
        drawGrain(gx, e)
      },
    }
  }

  function heroMood(t) {
    if (cfg.moods) { const m = cfg.moods(t, T); if (m) return m }
    if (t < T.score1) return { mood: cfg.mood0 || 'wide', look: [1, -1] }
    if (fix === 'none') return t < T.score2 ? { mood: 'wide', look: [1, 1] } : { mood: t > T.reply ? 'heart' : 'sparkle', look: [1, -0.4] }
    if (t < T.pen) return { mood: 'squint', look: [1, 1] }
    if (t < T.send) return { mood: 'wide', look: [1, -0.6] }
    if (t < T.reply) return { mood: 'sparkle', look: [1, -0.6] }
    return { mood: 'heart', look: [1, -0.3] }
  }

  // the chat: the opener (flying at frame 0), the slash / add, the better opener typing, the reply
  function drawChat(x, t, e) {
    // ── the opener
    let k = 1, rot = 0, dx = 0, dy = 0, alpha = 1
    if (e < LAND_E) {
      // mid-flight toward the lens: big, tilted, pushed down-left, then it snaps back into the chat
      const fly = e < T.fa ? 1 : 1 - easeOutBack(prog(e, T.fa, LAND_E), 1.5)
      const drift = e < T.fa ? e / T.fa : 1
      k = 1 + fly * (0.5 + 0.08 * drift); rot = -0.13 * fly; dx = -70 * fly - 10 * drift; dy = 210 * fly + 14 * drift
      // motion streaks back toward the phone
      if (fly > 0.05) {
        x.save(); x.globalAlpha = 0.5 * fly
        for (let i = 0; i < 7; i++) { const yy = OP.ay + dy + 30 + i * (OP.h * 1.4 / 7); R(x, BONE, OP.ax - OP.w * k + dx - 40 - 130 * ((i * 37) % 5) / 4, yy, 120 + 60 * (i % 3), 6) }
        x.restore()
      }
    }
    if (fix === 'slash' && t > T.fall[0]) {
      const p = ease.inCubic(prog(t, T.fall[0], T.fall[1]))
      dy += 700 * p; rot += 0.5 * p; alpha = 1 - p
    }
    if (alpha > 0) {
      x.save(); x.translate(dx, dy)
      chatBubble(x, cfg.opener, 'R', OP.ax, OP.ay, { col: HCOL, size: cfg.opSize || 58, k, rot, alpha })
      // the slash across it
      if (fix === 'slash' && t > T.slash[0]) {
        const p = ease.outCubic(prog(t, T.slash[0], T.slash[1]))
        const X0 = OP.ax - OP.w - 20, Y0 = OP.ay + OP.h + 10, X1 = OP.ax + 20, Y1 = OP.ay - 10
        slash(x, X0, Y0, X1, Y1, p)
      }
      x.restore()
      if (fix === 'add' && t > T.score2) drawCheck(x, t, OP.ax - OP.w - 40, OP.ay + OP.h / 2)
    }
    // ── the better opener (typed by THE STARS' red pen) + SEND
    if (fix !== 'none' && t > T.type[0]) {
      const p = prog(t, T.type[0], T.type[1]), n = Math.floor(goodTxt.length * p)
      const sendK = t > T.send ? 1 + 0.08 * Math.exp(-(t - T.send) * 10) * Math.sin((t - T.send) * 30) : 1
      const k0 = pop01(t, T.type[0], 0.25, 2)
      chatBubble(x, goodTxt, 'R', BT.ax, BT.ay, { col: t > T.send ? HCOL : '#fff6ea', size: 52, k: k0 * sendK, chars: t > T.type[1] ? Infinity : n, caret: t < T.send, t })
      if (t < T.send) label(x, 'DRAFT', BT.ax - 70, BT.ay - 22, { size: 22, col: GOLD })
      else label(x, 'SENT ✓', BT.ax - 70, BT.ay + BT.h + 24, { size: 22, col: GREEN, alpha: clamp((t - T.send) * 4) })
    }
    // ── the reply
    if (t > T.dots[0] && t < T.reply) typingDots(x, t, RP.ax, RP.ay, pop01(t, T.dots[0], 0.2, 2))
    if (t > T.reply) chatBubble(x, cfg.reply, 'L', RP.ax, RP.ay, { col: BONE, size: 52, k: pop01(t, T.reply, 0.28, 2.4) })
  }

  function drawCheck(x, t, cx, cy) {
    const k = pop01(t, T.score2, 0.3, 2.6)
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = GREEN; x.beginPath(); x.arc(0, 0, 28, 0, Math.PI * 2); x.fill()
    x.strokeStyle = INK; x.lineWidth = 9; x.lineCap = 'square'; x.beginPath(); x.moveTo(-13, 1); x.lineTo(-3, 12); x.lineTo(15, -11); x.stroke()
    x.restore()
  }

  // ── the desk with THE STARS and the end judge (Pisces, crying), each with a score paddle
  function drawJudges(x, t, e) {
    const J = JUDGES
    const [b1, w1] = cfg.bad || ['?', '']
    const [b2, w2] = cfg.good
    // paddle states: spinning blank until score1, then the first score, flip to the second at score2
    const spin = (o) => (e * 2.4 + o) % 1
    const flipTo = (t0) => prog(t, t0, t0 + 0.32)
    function state(o, s1, s2) {
      if (t < T.score1) return { flip: spin(o), text: '?' }
      if (t < T.score2) { const f = flipTo(T.score1); return { flip: 1 - f, text: f < 0.5 ? '?' : s1 } }
      const f = flipTo(T.score2); return { flip: f < 0.5 ? f : 1 - f, text: f < 0.5 ? s1 : s2, pulse: f >= 1 ? Math.exp(-(t - T.score2 - 0.32) * 6) : 0 }
    }
    const pS = state(0, b1, b2), pE = state(0.37, cfg.endBad || '10', cfg.endGood || '10')
    const lift = v => (t > T.score1 ? -18 * Math.exp(-(t - T.score1) * 5) : 0) + (t > T.score2 ? -26 * Math.exp(-(t - T.score2) * 4) : 0) + v
    // paddles (behind the judges' hands)
    const colS = t < T.score2 ? (Number(b1) >= 7 ? GREEN : RED) : (Number(b2) >= 7 ? '#1f9e55' : RED)
    paddle(x, J.stars.x, lift(J.paddleY) + 4 * Math.sin(t * 3), pS.text, { flip: pS.flip, ink: pS.text === '?' ? INK : colS, k: 1 + 0.12 * (pS.pulse || 0), rot: -0.06 })
    paddle(x, J.end.x, lift(J.paddleY) + 4 * Math.sin(t * 3 + 1), pE.text, { flip: pE.flip, ink: pE.text === '?' ? INK : '#1f9e55', k: 1 + 0.12 * (pE.pulse || 0), rot: 0.07 })
    // THE STARS
    const sMood = t < T.score1 ? 'wide' : t < T.score2 ? (Number(b1) >= 7 ? 'happy' : 'squint') : 'happy'
    star(x, e, 'stars', { ...J.stars, mood: sMood, look: [0.6, -1], hops: [T.score1, T.score2], seed: 2, glow: 1.05 })
    // the end judge (Pisces): sobbing the whole time, fountains at the bawl
    const pisTears = t > T.bawl ? 3 : t > T.score1 ? 2 : 2
    const eMood = endSign === 'pisces' ? (t > T.bawl ? 'happy' : 'wide') : (t > T.score2 ? 'happy' : 'wide')
    star(x, e, endSign, { ...J.end, mood: eMood, look: [-0.6, -1], hops: [T.score1 + 0.08, T.score2 + 0.08, T.bawl], tears: endSign === 'pisces' ? pisTears : 0, seed: 6, glow: 0.9 })
    desk(x, e)
    tissues(x, 985, DESK.y + 4, 96)
    label(x, 'THE STARS', J.stars.x, DESK.y + 36, { size: 28, col: GOLD })
    label(x, endSign.toUpperCase(), J.end.x, DESK.y + 36, { size: 28, col: tint(signStar(endSign).color, 0.4) })
    // the nameplate: why
    if (w1) nameplate(x, t, w1, T.why1, fix === 'none' ? T.score2 : T.pen + 0.2, { col: Number(b1) >= 7 ? '#d9f7e3' : '#ffd6dc' })
    nameplate(x, t, w2, fix === 'none' ? T.score2 + 0.15 : T.why2, DURATION + 1, { col: '#d9f7e3', rot: 0.025 })
    if (t > T.score2) sparkles(x, t, J.stars.x, lift(J.paddleY), T.score2 + 0.3, 10, 130, 1)
    if (fix === 'none' && Number(b2) >= 10) confetti(x, t, T.score2 + 0.2, 540, 1250)
    if (cfg.judgeExtra) cfg.judgeExtra(x, t, e, J)
  }

  // ── the red pen: swoops in for the slash, then writes the draft (or hovers and leaves when it's already good)
  function drawPen(x, t) {
    if (t < T.pen - 0.1 || t > T.send + 0.4) return
    let px, py, rot = -0.5
    const k = pop01(t, T.pen - 0.1, 0.25, 2) * outK(t, [T.send, T.send + 0.4])
    if (fix === 'slash' && t < T.slash[1]) {
      const p = ease.outCubic(prog(t, T.slash[0], T.slash[1]))
      px = lerp(OP.ax - OP.w - 20, OP.ax + 20, p); py = lerp(OP.ay + OP.h + 10, OP.ay - 10, p)
      if (t < T.slash[0]) { const q = ease.outCubic(prog(t, T.pen - 0.1, T.slash[0])); px = lerp(1100, px, q); py = lerp(1300, py, q) }
    } else if (fix === 'none') {
      // hovers over the opener… shakes its head… and leaves
      const q = ease.outCubic(prog(t, T.pen - 0.1, T.pen + 0.3))
      px = lerp(1100, OP.ax - OP.w / 2 + 40, q) + 40 * Math.sin((t - T.pen) * 14) * clamp((t - T.pen - 0.3) * 3) * outK(t, [T.pen + 1.1, T.pen + 1.3])
      py = lerp(1300, OP.ay + OP.h + 60, q) - 300 * ease.inCubic(prog(t, T.pen + 1.3, T.pen + 1.7))
      if (t > T.pen + 1.7) return
    } else {
      // writing: the tip follows the end of the typed text
      const p = prog(t, T.type[0], T.type[1])
      const row = Math.min(BT.lines.length - 1, Math.floor(p * BT.lines.length))
      const q = (p * BT.lines.length) % 1
      px = BT.ax - BT.w + 30 + q * (BT.w - 60); py = BT.ay + 44 + row * 60 + 8 * Math.sin(t * 40)
      if (t < T.type[0]) { const r = ease.outCubic(prog(t, T.pen - 0.1, T.type[0])); px = lerp(1100, BT.ax - BT.w + 30, r); py = lerp(1300, BT.ay + 40, r) }
    }
    pen(x, px, py, rot, k)
  }

  // where the opener sits at the freeze (estimated from its length: Inter 800 46 px ≈ 26 px a character)
  function caughtSpot() {
    const sz = cfg.opSize || 58, cw = sz * 0.56, words = cfg.opener.split(' ')
    let lines = 1, cur = 0, wMax = 0
    for (const w of words) { const L = (w.length + 1) * cw; if (cur + L > 620 && cur > 0) { lines++; wMax = Math.max(wMax, cur); cur = L } else cur += L }
    wMax = Math.max(wMax, cur)
    const w = wMax + 52, h = lines * sz * 1.16 + 40, k = 1.58
    const bx = SLOT.right - 80, by = SLOT.top + h + 224
    return { x: Math.round(bx - w * k / 2), y: Math.round(by - h * k / 2), r: Math.round(Math.min(470, w * k / 2 + 50)), ry: Math.round(h * k / 2 + 60) }
  }
  // ── scenes
  const brkScenes = brk === 'scratch'
    ? [recordScratch(REC), caught({ at: T.fa + 0.08, ...caughtSpot(), label: null, arrow: null, rec: true, ...(cfg.caught || {}), out: [T.fb - 0.06, T.fb] })]
    : [whipZoom(WHIP)]
  // caught needs the opener's frozen spot: computed from the flight pose at T.fa (worked out on first build)
  const SCENES = [
    build, ...brkScenes, slamTitle(HOOK), slamTitle(LAST),
    ...(ending === 'loop' ? [loopBack([build, slamTitle(HOOK)], { duration: DURATION, len: 0.45 })] : []),
  ]

  // ── sound
  const pitch = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const typeTicks = []
  if (fix !== 'none') for (let i = 0; i < 14; i++) typeTicks.push(['tick', r3(T.type[0] + (T.type[1] - T.type[0]) * i / 14), 0.035])
  const low = v => Number(v) < 7
  const CUES = [
    ...slamTitleCues(HOOK),
    // frame 0: the whoosh of the message flying out
    ['whoosh', 0, 0.35, 0.05],
    ...(brk === 'scratch' ? recordScratchCues(REC) : whipZoomCues(WHIP)),
    ...(brk === 'scratch' ? caughtCues({ at: T.fa + 0.08 }) : []),
    ['pop', r3(T.land - 0.05), 1174.66, 0.04, 0.3], ['tick', r3(T.land), 0.06],
    // score 1: a buzzer for a low score, a happy blip for a good one
    ...(cfg.bad && cfg.bad[0] !== '?' ? (low(cfg.bad[0])
      ? [['chip', T.score1, 110, 0.32, { gain: 0.05, wave: 'square', slide: -30 }], ['chip', r3(T.score1 + 0.02), 116.54, 0.3, { gain: 0.035, wave: 'saw' }], ['tom', T.score1, 90, { gain: 0.2, decay: 0.2 }]]
      : [['pop', T.score1, 1318.51, 0.045, -0.3], ['pluck', r3(T.score1 + 0.08), 1567.98, 0.035, 0.4, -0.3]])
      : [['tom', T.score1, 70, { gain: 0.14, decay: 0.5 }], ['riser', r3(T.score1 - 0.2), r3(T.score1 + 0.6), 0.02]]),
    ['pop', T.why1, 987.77, 0.03, 0],
    // the pen
    ['whoosh', r3(T.pen - 0.1), 0.25, 0.035],
    ...(fix === 'slash' ? [['whoosh', T.slash[0], 0.2, 0.06], ['tick', T.slash[1], 0.07], ['whoosh', T.fall[0], 0.35, 0.03], ['tom', r3(T.fall[1] - 0.05), 140, { gain: 0.08, decay: 0.15 }]] : []),
    ...(fix === 'add' ? [['pop', T.type[0], 1318.51, 0.03, 0.2]] : []),
    ...(fix === 'none' ? [['pluck', r3(T.pen + 0.5), 659.25, 0.03, 0.3, 0], ['pluck', r3(T.pen + 0.75), 587.33, 0.03, 0.3, 0], ['whoosh', r3(T.pen + 1.35), 0.3, 0.03], ['riser', r3(T.score2 - 0.8), T.score2, 0.03]] : []),
    ...typeTicks,
    ...(fix !== 'none' ? [['whoosh', T.send, 0.22, 0.05], ['pop', r3(T.send + 0.02), 1567.98, 0.04, 0.4]] : []),
    // score 2: ding ding
    ['bell', T.score2, 1760, 0.05, 1.2, -0.2], ['bell', r3(T.score2 + 0.12), 2349.32, 0.04, 1.2, 0.2], ['glitter', r3(T.score2 + 0.1), r3(T.score2 + 0.7)],
    ['pop', T.why2, 1174.66, 0.035, 0],
    ...(fix === 'none' && Number(cfg.good[0]) >= 10 ? [['crash', T.score2, { gain: 0.05 }], ['clap', r3(T.score2 + 0.25), { gain: 0.1 }], ['clap', r3(T.score2 + 0.5), { gain: 0.1 }]] : []),
    // the reply + Pisces bawling
    ['tick', T.dots[0], 0.03], ['tick', r3(T.dots[0] + 0.2), 0.03],
    ['pop', T.reply, 1318.51, 0.045, -0.2], ['pop', r3(T.reply + 0.07), 1760, 0.035, -0.2], ['glitter', r3(T.reply + 0.05), r3(T.reply + 0.5)],
    ['pluck', T.bawl, 659.25, 0.035, 0.5, 0.4], ['pluck', r3(T.bawl + 0.16), 587.33, 0.035, 0.5, 0.4], ['pluck', r3(T.bawl + 0.34), 554.37, 0.03, 0.6, 0.4],
    ...slamTitleCues(LAST),
    ...(ending === 'loop' ? loopCues({ duration: DURATION, len: 0.45 }) : []),
    ...(cfg.cues || []),
  ].filter(c => c[1] >= 0 && c[1] < DURATION)
  void pitch
  return { DURATION, SCENES, CUES, T, REC, ending }
}
