// PISCES CRIES ABOUT…: the shared look of the twelve star_advice trial reels npce01–npce12 (promo/films/next30/b48.md).
// Lives in npce01; the other eleven films import it from here (read-only for them).
//
// The format (14 s, story 0–9.6, then the shared end card):
//   0.00–2.60   hook (frame 0 = thumbnail): the top caption "Pisces cries about… | *<topic>.*" is already up, the bug
//               "PISCES CRIES ABOUT…" top-left, the TISSUES counter top-right, Pisces mid-sniffle next to the thing.
//   2.60–5.60   it escalates: a caption sticker slaps on (2.75), tears go sniffle → streams → fountains (cfg.peak),
//               the tissue counter keeps climbing.
//   5.60        the one card cut (flip).
//   5.60–9.60   THE STARS pop in and say the last line next to a happy-crying Pisces (box 5.85 → 9.2).
//
//   makeCry(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.topic ('a note in their coat'), cfg.accent (caption accent colour), cfg.deep (sticker accent ink)
//     cfg.sticker: sticker text with one *accent*; cfg.peak: when the fountains start (default 4.5)
//     cfg.scene(x, t, S): draws 0–5.6. S = { pis(x, t, o), star(x, t, sign, o), tears(t), u: t }
//     cfg.finale(x, t, S): optional, draws extra props in 5.6–9.6 (S.ok = pop-out factor, S.pisF = Pisces' sprite frame)
//     cfg.tissues: times the counter ticks up (start 1)    cfg.cues: extra sound cues (absolute times)
//     cfg.last: THE STARS' last line (≤ 40 chars)
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', TEAR = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const PIS_COL = signStar('pisces').color
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

export const DURATION = 14
export const STORY_END = DURATION - ENDCARD_LEN          // 9.6
export const T = {
  bug: -1, h0: -2, h0Out: [2.45, 2.65],
  sticker: 2.75, stickerOut: [5.4, 5.6],
  cut: 5.6, starsIn: 5.7, pisIn: 5.62, last: 5.95, boxClose: 9.15,
  out: [9.15, 9.55], bugOut: [9.2, 9.55],
}
const CPS = 30

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
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
/** a pixel speech bubble, popping at t0, gone by t1 */
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
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** dark ink text (no shadow) for paper props */
export function ink(x, text, cx, cy, { size = 28, col = INK, align = 'center', font = MONO, weight = 700, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, 0, 0); x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a warm room glow / lamp pool */
export function glow(x, cx, cy, r, a, col = '255,226,170') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${0.3 * a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
}
/** slow falling pixel snow (pure f(t)) */
export function snow(x, t, { n = 40, y0 = 0, y1 = 1920, a = 0.8, seed = 1 } = {}) {
  x.save(); x.globalAlpha = a; x.fillStyle = '#f4f1ff'
  for (let i = 0; i < n; i++) {
    const r = (Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453) % 1, rr = Math.abs(r)
    const sp = 60 + 50 * ((i * 7) % 5) / 4, sz = 6 + (i % 3) * 3
    const yy = y0 + ((rr * (y1 - y0) + t * sp) % (y1 - y0)), xx = (rr * 1300 + i * 97) % 1080 + Math.sin(t * 1.3 + i) * 14
    x.fillRect(Math.round(xx), Math.round(yy), sz, sz)
  }
  x.restore()
}
/** a phone (screen area centred), returns screen rect */
export function phone(x, cx, cy, { w = 300, h = 540, rot = 0, body = '#2a2148', screen = '#14102a' } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, body, { b: 7 })
  R(x, screen, -w / 2 + 14, -h / 2 + 30, w - 28, h - 60)
  R(x, '#4a4070', -30, -h / 2 + 12, 60, 8)
  x.restore()
  return { x: cx - w / 2 + 14, y: cy - h / 2 + 30, w: w - 28, h: h - 60 }
}
/** a chat bubble inside a phone screen (left = them, right = me) */
export function chat(x, t, t0, text, X, Y, W, { me = false, size = 24, col } = {}) {
  const k = pop01(t, t0, 0.22, 2.2)
  if (k <= 0.01) return
  x.save(); x.font = `700 ${size}px ${INTER}`
  const tw = Math.min(W - 30, x.measureText(text).width + 30), h = size + 24
  const bx = me ? X + W - tw - 8 : X + 8
  x.translate(bx + tw / 2, Y + h / 2); x.scale(k, k)
  R(x, col || (me ? '#7fd0ff' : BONE), -tw / 2, -h / 2, tw, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 1)
  x.restore()
}
/** typing dots in a phone screen */
export function dots(x, t, X, Y, { me = false, W = 0 } = {}) {
  const bx = me ? X + W - 98 : X + 8
  R(x, me ? '#7fd0ff' : BONE, bx, Y, 90, 44)
  for (let i = 0; i < 3; i++) R(x, INK, bx + 18 + i * 22, Y + 18 + 5 * Math.sin(t * 9 - i), 12, 12)
}
/** a cozy blanket over a sprite's lower half */
export function blanket(x, cx, cy, w, col = '#c96b8f') {
  box(x, cx - w / 2, cy, w, w * 0.42, col, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  for (let i = 0; i < 4; i++) R(x, 'rgba(255,255,255,0.22)', cx - w / 2 + 20 + i * (w - 40) / 3.4, cy + 10, 12, w * 0.42 - 20)
}
/** a mug with steam */
export function mug(x, t, cx, cy, s = 70, col = '#e86a5a') {
  box(x, cx - s / 2, cy - s * 0.6, s, s * 0.8, col, { b: 5 }); R(x, INK, cx + s / 2 + 2, cy - s * 0.45, 16, s * 0.48); R(x, col, cx + s / 2 + 5, cy - s * 0.4, 8, s * 0.36)
  R(x, '#6b3f2a', cx - s / 2 + 6, cy - s * 0.6 + 4, s - 12, 10)
  x.save(); x.globalAlpha = 0.5
  for (let i = 0; i < 3; i++) { const p = (t * 0.7 + i / 3) % 1; R(x, '#f4f1ff', cx - 14 + i * 14 + 6 * Math.sin(t * 3 + i), cy - s * 0.7 - p * 70, 8, 8) }
  x.restore()
}
/** a tissue box */
export function tissueBox(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
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

// ── the bug: "PISCES CRIES ABOUT…" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: TEAR, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(143,227,255,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: TEAR, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'PISCES&nbsp;CRIES<span style="color:rgba(255,255,255,0.6)">&nbsp;ABOUT…</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(out) } }
}

// ── the caption sticker: a tilted bone sticker with a tissue badge
function buildSticker(root, { text, deep, at, out, tilt = -1.8 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1330px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '940px', padding: '18px 34px 20px 22px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrap)
  el('div', { flex: '0 0 auto', width: '74px', height: '74px', borderRadius: '50%', background: TEAR, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 40px ${INTER}`, color: INK }, st, '!')
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 64px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 50px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
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

// ── the TISSUES counter (canvas, top-right)
function drawCounter(x, t, times, out) {
  if (out <= 0.01) return
  let n = 1, last = -9
  for (const c of times) if (t >= c) { n++; last = c }
  const k = 1 + 0.35 * Math.exp(-(t - last) * 9) * (t - last < 0.6 ? 1 : 0)
  x.save(); x.globalAlpha = out; x.translate(905, 78); x.scale(k, k)
  box(x, -120, -30, 250, 60, 'rgba(16,9,38,0.9)', { b: 4 })
  tissueBox(x, -86, 8, 44)
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.75)'; x.fillText('TISSUES', -54, 1)
  x.font = `700 34px ${MONO}`; x.textAlign = 'right'; x.fillStyle = TEAR; x.fillText(String(n), 118, 2)
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeCry(cfg) {
  const PIS = signStar('pisces')
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const peak = cfg.peak ?? 4.5
  const tissues = cfg.tissues || [1.1, 2.9, 3.6, peak, peak + 0.3, peak + 0.55, peak + 0.8]
  const tears = t => t < T.sticker ? 1 : t < peak ? 2 : 3

  const pis = (x, t, o = {}) => {
    const opts = { color: PIS.color, glyph: o.s >= 150 ? PIS.glyph : null, mood: o.mood || 'sparkle', look: o.look, seed: 6, glow: 0.9, pop: o.pop ?? 1, hops: o.hops, blush: o.blush, alpha: o.alpha ?? 1 }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    const F = starFrame(o.x, o.y, o.s, t, opts)
    const k = o.tears === undefined ? tears(t) : o.tears
    if (k) inSprite(x, F, () => tearsCells(x, t, k))
    return F
  }
  const star = (x, t, sign, o = {}) => {
    const S = signStar(sign)
    return drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: o.s >= 150 ? S.glyph : null, seed: o.seed ?? 4, glow: 1, ...o })
  }

  async function build(stage) {
    try {
      await Promise.all(["800 76px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "italic 500 104px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, `Pisces cries about… | *${cfg.topic}${/[”?!.]$/.test(cfg.topic) ? '' : '.'}*`, { top: 160, size: 76, accentSize: 104, at: T.h0, gap: 0.05, accentColor: cfg.accent || TEAR, fit: true })
    const sticker = buildSticker(root, { text: cfg.sticker, deep: cfg.deep || '#2a7fb0', at: T.sticker, out: T.stickerOut, tilt: cfg.tilt ?? -1.8 })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#eaf9ff', opacity: 0, pointerEvents: 'none' }, root)

    function finale(t) {
      if (t < T.cut) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      if (cfg.finaleBack) cfg.finaleBack(x, t, { ok, pis, star })
      shadow(x, 740, 1250, 260 * ok)
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
      const pisF = pk > 0.01 ? pis(x, t, { x: 740, y: 1040, s: 300, pop: pk, mood: t > T.last + 1.2 ? 'happy' : 'sparkle', look: [-1, -0.4], hops: [T.pisIn + 0.3, T.last + 0.9, T.last + 1.9], tears: 3 }) : null
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) drawStarChar(x, 250, 1180, 190, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
      if (cfg.finale) cfg.finale(x, t, { ok, pis, star, pisF })
      hearts(x, t, T.last + 1.1, 740, 820, { n: 5 })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, dim: cfg.dim ?? 0.85 })
        if (t < T.cut) {
          const punch = t >= T.sticker ? 1 + 0.05 * (1 - ease.outCubic(prog(t, T.sticker, T.sticker + 0.3))) : 1
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          cfg.scene(x, t, { pis, star, tears, u: t })
          x.restore()
        }
        finale(t)
        tx.clearRect(0, 0, 1080, 1920)
        sparkles(tx, t, 740, 900, peak, 10, 260, 1, [TEAR, BONE, PINK])
        drawCounter(tx, t, tissues, outK(t, T.bugOut))
        H0.update(t, outK(t, T.h0Out))
        sticker.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = t >= T.sticker && t < T.sticker + 0.12 ? 1 - (t - T.sticker) / 0.12 : 0
        flash.style.opacity = String(0.45 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br', fadeIn: 0 }), cardCuts(CUTS)]

  const CUES = [
    ['pluck', 0.05, 1174.66, 0.03, 0, 0.4],
    ...tissues.map((c, i) => ['pop', r3(c), [880, 987.77, 1174.66, 1318.51, 1567.98][i % 5], 0.03, 0.45]),
    ['whoosh', r3(T.sticker - 0.08), 0.28, 0.035], ['tick', T.sticker, 0.06], ['pop', r3(T.sticker + 0.02), 1174.66, 0.045, 0.1], ['pop', r3(T.sticker + 0.09), 1567.98, 0.03, -0.1],
    ['glitter', r3(peak), r3(peak + 0.6)], ['bell', r3(peak + 0.02), 1760, 0.025, 1.0, 0],
    ['pop', r3(T.pisIn + 0.05), 987.77, 0.035, 0.4], ['pop', r3(T.starsIn + 0.05), 739.99, 0.035, -0.4],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
