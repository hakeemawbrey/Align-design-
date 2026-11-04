// b13base: shared helpers for the Trends Vol. 2 batch b13 (nt2e41–nt2e60). The four format kits (mckit.js here,
// ../../nt2e46/scenes/badkit.js, ../../nt2e51/scenes/excusekit.js, ../../nt2e56/scenes/latekit.js) import from this file.
// Pixel props, bubbles, sparkles, the sprite frame (for props riding on a star), Pisces' tears, the format bug, caption
// stickers, the stamp and a few weather particles. Everything is a pure f(t); DOM is only touched inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar, STAR } from '../../startalk.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_PINK = '#ff7eb6'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

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
export function confetti(x, t, t0, cx, cy, { n = 26, spread = 420, life = 2.2, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE] } = {}) {
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
  void spread
}
/** a pixel speech bubble (canvas), popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
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
/** a warm spotlight cone from (tx, top) down to an ellipse at (bx, by) */
export function spotlight(x, tx, top, bx, by, w, a, col = '255,236,180') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${col},${0.05 * a})`); g.addColorStop(1, `rgba(${col},${0.26 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 30, top); x.lineTo(tx + 30, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${col},${0.3 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
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


// ── any sign's star, glyph shown when big enough
export function sign(x, t, id, o = {}) {
  const S = signStar(id)
  return drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: o.s >= 150 ? S.glyph : null, glow: 1, ...o })
}
/** Pisces (with tears: 1 sniffle · 2 streams · 3 fountains); returns the sprite frame for props */
export function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
  const opts = { color: signStar('pisces').color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
  drawStarChar(x, P.x, P.y, P.s, t, opts)
  const F = starFrame(P.x, P.y, P.s, t, opts)
  if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
  return F
}
/** a tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** falling pixel snow over a rect; slow < 1 = slow motion */
export function snow(x, t, { n = 60, X = 0, Y = 0, W = 1080, H = 1920, speed = 90, size = 8, alpha = 0.85, seed = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.fillStyle = '#f4f1ff'
  for (let i = 0; i < n; i++) {
    const r = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453, f = r - Math.floor(r)
    const sp = speed * (0.6 + 0.8 * f), sz = Math.round(size * (0.5 + f))
    const px = X + ((i * 97.13 + f * W + Math.sin(t * 0.9 + i) * 18) % W + W) % W
    const py = Y + ((f * H + t * sp) % H + H) % H
    x.fillRect(Math.round(px), Math.round(py), sz, sz)
  }
  x.restore()
}
/** rain streaks on glass (window) */
export function rain(x, t, { n = 40, X = 0, Y = 0, W = 1080, H = 1920, speed = 700, alpha = 0.5, seed = 2 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.fillStyle = '#bfe0ff'
  for (let i = 0; i < n; i++) {
    const r = Math.sin(i * 7.31 + seed * 3.7) * 9631.17, f = r - Math.floor(r)
    const px = X + (i * 53.7 + f * W) % W, py = Y + ((f * H + t * speed * (0.7 + 0.6 * f)) % H)
    x.fillRect(Math.round(px), Math.round(py), 4, 26 + 20 * f)
  }
  x.restore()
}

// ── the bug: "<FORMAT> · TRENDS" in Inter 800 small caps, letter-spaced, top-left 56 px
export function buildBug(root, at, main) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none', zIndex: 5 }, root)
  el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    `${main.replace(/ /g, '&nbsp;')}<span style="color:rgba(255,255,255,0.6)">&nbsp;·&nbsp;TRENDS</span>`)
  return {
    update(t, out = 1) {
      const k = (t < at ? 1 : pop01(t, at, 0.36, 2.2)) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
      b.style.transform = `scale(${(0.6 + 0.4 * clamp(k, 0, 1.2)).toFixed(4)})`
    },
  }
}

// ── a caption sticker: tilted bone card, optional badge, Inter 800 + one *italic* accent
export function buildSticker(root, { badgeText = null, text, deep = RED, badge = GOLD, at, out, tilt = -2, top = 1330, size = 50, bg = BONE, ink = INK, badgeW = 74 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '940px', padding: `18px 34px 20px ${badgeText ? 22 : 34}px`, background: bg, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrap)
  if (badgeText) el('div', { flex: '0 0 auto', minWidth: badgeW + 'px', height: '74px', padding: '0 10px', boxSizing: 'border-box', borderRadius: '37px', background: badge, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 ${String(badgeText).length > 2 ? 30 : 40}px ${INTER}`, color: INK, letterSpacing: '0.04em' }, st, String(badgeText))
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${Math.round(size * 1.28)}px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 ${size}px ${INTER}`, lineHeight: '1.08', color: ink, letterSpacing: '-0.01em' }, st, html)
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.34), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}

// ── a rubber-stamp imprint (DOM) with html text, slamming at `at`, gone over `out`
export function buildStamp(root, { html, ink = RED, at, out, top = 190, size = 130, rot = -6 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '20px 48px 28px', border: `12px solid ${ink}`, outline: `5px solid ${ink}`, outlineOffset: '10px', borderRadius: '10px', transform: `rotate(${rot}deg)`, transformOrigin: '50% 50%',
    font: `800 ${size}px ${INTER}`, letterSpacing: '-0.02em', color: ink, lineHeight: '1', whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.03)', textShadow: '0 4px 18px rgba(6,4,18,0.6)' }, wrap, html)
  wrap.style.display = 'flex'
  const fitK = Math.min(1, 940 / Math.max(1, st.offsetWidth || 1))
  wrap.style.display = 'none'
  return {
    update(t) {
      const on = t >= at - 0.02 && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, at - 0.02, at + 0.06), o = popOut(t, out)
      const sc = lerp(1.25, 1, ease.outCubic(p)) * (1 + 0.03 * Math.exp(-(t - at) * 8) * Math.sin((t - at) * 40))
      st.style.opacity = String(clamp(p * 2) * clamp(o))
      st.style.transform = `rotate(${rot}deg) scale(${(sc * fitK * Math.max(0.01, o)).toFixed(4)})`
    },
  }
}
/** the rubber stamp tool (canvas): drops from `a`, lands at `b` (y = landY), lifts away */
export function drawStampTool(x, t, a, b, ink = RED, landY = 330) {
  if (t < a || t > b + 0.6) return
  let y, rot = -0.1
  if (t < b) { const p = ease.inCubic(prog(t, a, b)); y = lerp(-420, landY, p); rot = lerp(-0.35, -0.1, p) }
  else { const q = ease.inOutCubic(prog(t, b + 0.1, b + 0.6)); y = lerp(landY, -460, q); rot = lerp(-0.1, 0.25, q) }
  const sq = t >= b && t < b + 0.1 ? 0.12 * Math.sin(Math.PI * (t - b) / 0.1) : 0
  x.save(); x.translate(540, y); x.rotate(rot); x.scale(1 + sq, 1 - sq)
  box(x, -330, -40, 660, 110, '#6b4a2f', { b: 8, hi: '#8a6440' })
  R(x, ink, -330, 70, 660, 20)
  box(x, -50, -170, 100, 130, '#7b5634', { b: 8, hi: '#98704a' })
  box(x, -110, -260, 220, 100, RED, { b: 8, hi: '#ff6b7f' })
  x.restore()
}
/** a fake progress bar of segments [[a, b]…] under the bug */
export function drawBar(x, t, segs, col, k = 1) {
  if (k <= 0.01) return
  const X0 = 56, X1 = 980, GAP = 10, n = segs.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120, Hh = 8
  x.save(); x.globalAlpha = clamp(k)
  segs.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.25)', sx, Y, w, Hh)
    const f = prog(t, a, b)
    if (f > 0) R(x, i === n - 1 ? col : BONE, sx, Y, w * f, Hh)
  })
  x.restore()
}
/** a pixel scarf hanging from (cx, cy) along a list of points */
export function ribbon(x, pts, col, w = 26, stripe = '#ffffff') {
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < pts.length; i++) {
    const [px, py] = pts[i]
    if (pass === 0) R(x, INK, px - w / 2 - 5, py - w / 2 - 5, w + 10, w + 10)
    else R(x, (Math.floor(i / 3) % 2) ? stripe : col, px - w / 2, py - w / 2, w, w)
  }
}
