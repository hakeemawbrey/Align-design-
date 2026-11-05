// m23kit — small shared drawing helpers for batch m23 (Zodiac Lie Detector kld*, Long Distance Notes kln*).
// Copied in spirit from the Trends tellkit (pixel props, bubbles, tears) so the two m23 kits share one look.
// No end card, no card cuts: nothing here imports endcard.js or cardfx.js. Pure f(t); no `document` at top level.
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { drawPixelStar } from '../sky.js'
import { easeOutBack } from '../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#7dffb0', CYAN = '#7fe0ff', TEAR = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const FONTS = ["800 112px Inter", "800 30px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"]
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const winK = (t, a, b, fin = 0.25, fout = 0.2) => (t < a || t > b) ? 0 : pop01(t, a, fin, 2) * outK(t, [b - fout, b])
export const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** an ink-outlined block (pixel-chunky prop) */
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  if (cell <= 0.01 || alpha <= 0) return
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
    x.fillStyle = cols[ch] || BONE; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
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
/** pixel confetti / paper scraps flying from a burst at t0 */
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, v0 = 520, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE], size = 10 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.6, v = v0 + v0 * 0.5 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt
    const sz = size + (i % 3) * size * 0.3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble (canvas), popping at t0, gone by t1. text may be an array of lines */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 38, tail = 0, font = INTER, weight = 800, maxW = 520 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  const lines = Array.isArray(text) ? text : [text]
  x.save(); x.font = `${weight} ${size}px ${font}`
  let tw = Math.max(...lines.map(l => x.measureText(l).width))
  const fit = Math.min(1, maxW / tw); tw *= fit
  const lh = size * 1.15 * fit, w = tw + 44, h = lh * lines.length + 30
  // keep the bubble on screen
  const half = w * k / 2; cx = clamp(cx, half + 24, 1080 - half - 24)
  x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.font = `${weight} ${size * fit}px ${font}`
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, 2 + (i - (lines.length - 1) / 2) * lh))
  x.restore()
}
/** pixel label text on canvas, with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, maxW = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`
  if (maxW) { const w = x.measureText(text).width; if (w > maxW) x.font = `${weight} ${size * maxW / w}px ${font}` }
  x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { if (w <= 0) return; x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a warm light cone from (tx, top) down to an ellipse at (bx, by) */
export function spotlight(x, tx, top, bx, by, w, a, col = '255,236,180') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${col},${0.06 * a})`); g.addColorStop(1, `rgba(${col},${0.24 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 30, top); x.lineTo(tx + 30, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${col},${0.26 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
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
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = TEAR; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
    ctx.fillStyle = TEAR; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** pixel sunglasses over the eyes (sprite cells); up 0…1 pushes them onto the head */
export function shadesCells(ctx, up = 0) {
  const y = 16.6 - up * 7
  for (const ex of [13.4, 22.6]) { ctx.fillStyle = INK; ctx.fillRect(ex - 3.6, y - 0.6, 7.2, 5.2); ctx.fillStyle = '#2b2140'; ctx.fillRect(ex - 3, y, 6, 4); ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(ex - 2.4, y + 0.6, 1.6, 0.8) }
  ctx.fillStyle = INK; ctx.fillRect(16.8, y + 0.4, 2.4, 1.2)
}
/** a tissue box (canvas), with one tissue sticking up */
export function tissueBox(x, cx, cy, s = 1, t = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -48, -34, 96, 60, '#8fd3ff', { b: 5, hi: '#c9ecff' })
  R(x, '#ffffff', -30, -30, 60, 8)
  const w = 3 * Math.sin(t * 5)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-20, -30); x.quadraticCurveTo(-6 + w, -82, 18 + w, -70); x.lineTo(16, -30); x.closePath(); x.fill()
  x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-14, -32); x.quadraticCurveTo(-4 + w, -74, 12 + w, -64); x.lineTo(10, -32); x.closePath(); x.fill()
  x.restore()
}

// ── the series bug (top-left, Inter 800 small caps, letter-spaced), visible from frame 0
export function buildBug(root, { name, sub = '', col = '#ff7eb6', dot = col }) {
  const b = el('div', { position: 'absolute', left: '56px', top: '58px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: dot, boxShadow: `0 0 0 4px ${INK}, 0 0 16px ${dot}` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: col, textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    name.replace(/ /g, '&nbsp;') + (sub ? `<span style="color:rgba(255,255,255,0.6)">&nbsp;${sub.replace(/ /g, '&nbsp;')}</span>` : ''))
  return { el: b, update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(clamp(out)) } }
}

// ── a DOM rubber-stamp word (LIE / TRUTH / VERDICT …): slams in at `at`, wobbles, leaves over `out`
export function buildStamp(root, { text, ink, top = 520, size = 210, rot = -8, sub = null }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '14px 48px 22px', border: `12px solid ${ink}`, outline: `5px solid ${ink}`, outlineOffset: '9px', borderRadius: '10px', transformOrigin: '50% 50%',
    font: `800 ${size}px ${INTER}`, letterSpacing: '0.02em', color: ink, lineHeight: '1', whiteSpace: 'nowrap', background: 'rgba(10,6,20,0.35)', textShadow: '0 4px 18px rgba(6,4,18,0.6)', textAlign: 'center' }, wrap,
    text + (sub ? `<div style="font:italic 500 ${Math.round(size * 0.34)}px ${SERIF};letter-spacing:0;margin-top:6px">${sub}</div>` : ''))
  return {
    update(t, at, out) {
      const on = at != null && t >= at - 0.02 && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, at - 0.02, at + 0.07), o = outK(t, out)
      const sc = lerp(1.6, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - at) * 8) * Math.sin((t - at) * 40))
      st.style.opacity = String(clamp(p * 2) * clamp(o))
      st.style.transform = `rotate(${rot}deg) scale(${(sc * lerp(0.8, 1, o)).toFixed(4)})`
    },
  }
}

// ── a tilted caption sticker (DOM): "THE TRUTH", chapter names, etc.
export function buildSticker(root, { text, bg = BONE, ink = INK, accent = RED, top = 1250, size = 50, tilt = -3 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '14px 34px 16px', background: bg, border: `6px solid ${INK}`, borderRadius: '14px', boxShadow: '10px 10px 0 rgba(6,4,18,0.7)', maxWidth: '940px', textAlign: 'center',
    font: `800 ${size}px ${INTER}`, lineHeight: '1.08', color: ink, transformOrigin: '50% 50%' }, wrap,
    text.replace(/\s*\|\s*/g, '<br>').replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${Math.round(size * 1.25)}px ${SERIF};color:${accent}">$1</span>`))
  return {
    update(t, at, out) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.3), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.08)) * o)
      st.style.transform = `scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}

export { clamp, lerp, prog, ease, el, easeOutBack, drawPixelStar }
