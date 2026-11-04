// RATE MY DATE IDEA: the shared look of the 24 Star Talk trial reels nrde01–nrde24 (promo/films/next30/b45.md).
// This file lives in nrde01 and the other 23 films import it from here (nobody else edits it).
//
// The format (16 s, story 0–13.6, then the short 2.4 s end card; no card transition — owner's change, 4 Nov):
//   0.00–2.60   hook: frame 0 already shows the bug, the bold top caption "Rate my *date idea:*", the pitch sticker (the
//               idea in quotes) and the pitching sign star mid-hop beside its prop, so a stranger gets it in one second.
//   2.60–5.80   THE PLAN: sticker 1 + scene A (a jump cut with a zoom punch).
//   5.80        a jump cut (flash + zoom punch) into BUT…: sticker 2 + scene B (the snag or the twist).
//   9.00–13.55  THE STARS' rating stamp slams "8/10 · *word*"; THE STARS say the last line; Pisces (who gives every
//               idea 10/10) fountains happy tears. Pisces sniffles in the back of both beats.
//
//   makeDate(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.id, cfg.sign (pitcher), cfg.date (the date's sign), cfg.idea ('Ice skating. *7 AM.* Be ready.'),
//     cfg.accent (headline accent colour), cfg.deep (sticker accent ink),
//     cfg.hook(x, t, S) draws the pitcher + its prop (S = { hero, date, k, HOOK_HOPS }); default: the pitcher alone,
//     cfg.beats: [{ caption, draw(x, t, S), cues: [], pis: { x, y, s } }] × 2   S = { u, t0, t1, hero, date, ... },
//     cfg.score ('8/10'), cfg.word ('once you slowed down'), cfg.pisScore ('10/10'), cfg.last, cfg.finale(x, t, S).
//   hero(x, t, o) / date(x, t, o) take { x, y, s, mood, look, hops, pop, tears } (tears 1…3 = happy tears).
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

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


// ── the fixed timeline (same in all 24 films)
export const STORY_END = 13.6
export const DURATION = STORY_END + ENDCARD_SHORT_LEN     // 16 (the short end card, owner's change 4 Nov)
export const T = {
  h0Out: [8.85, 9.05],
  beats: [[2.6, 5.8], [5.8, 9.0]],
  cut: 5.8,
  stampDrop: [9.0, 9.3], stamp: 9.32, starsIn: 9.45, pisIn: 9.55, score: 10.15,
  last: 9.8, boxClose: 13.15,
  out: [13.15, 13.55], bugOut: [13.25, 13.55],
}
const CPS = 30
export const HOOK = { x: 540, y: 1060, s: 320 }            // the pitcher's default hook spot

// ── extra props shared by the episodes
/** a mug with steam (cx = centre, cy = bottom) */
export function mug(x, t, cx, cy, s = 1, col = '#e8605c', steam = true) {
  box(x, cx - 34 * s, cy - 70 * s, 68 * s, 70 * s, col, { b: 5, hi: 'rgba(255,255,255,0.25)' })
  R(x, INK, cx + 34 * s, cy - 54 * s, 22 * s, 36 * s); R(x, col, cx + 34 * s, cy - 46 * s, 12 * s, 20 * s)
  if (steam) for (let i = 0; i < 3; i++) { const p = ((t * 0.8 + i / 3) % 1); x.save(); x.globalAlpha = 0.45 * Math.sin(Math.PI * p); R(x, BONE, cx - 16 * s + i * 14 * s + Math.sin(t * 3 + i) * 6, cy - 84 * s - p * 70 * s, 8 * s, 18 * s); x.restore() }
}
/** gentle falling pixel snow over the whole frame (or a region) */
export function snow(x, t, { n = 40, a = 0.7, x0 = 0, x1 = 1080, y0 = 0, y1 = 1920 } = {}) {
  x.save(); x.globalAlpha = a
  for (let i = 0; i < n; i++) {
    const sp = 60 + (i * 37) % 70, ph = (i * 0.618) % 1
    const py = y0 + (((t * sp) / (y1 - y0) + ph) % 1) * (y1 - y0)
    const px = x0 + ((i * 97) % (x1 - x0)) + Math.sin(t * 1.3 + i) * 18
    const sz = 6 + (i % 3) * 3
    R(x, i % 4 ? '#ffffff' : '#dff2ff', px, py, sz, sz)
  }
  x.restore()
}
/** a string of twinkly pixel fairy lights along a sagging line */
export function fairyLights(x, t, x0, y0, x1, y1, { n = 12, sag = 40, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0'] } = {}) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 24; i++) { const p = i / 24, px = lerp(x0, x1, p), py = lerp(y0, y1, p) + sag * Math.sin(Math.PI * p); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.restore()
  for (let i = 0; i < n; i++) {
    const p = (i + 0.5) / n, px = lerp(x0, x1, p), py = lerp(y0, y1, p) + sag * Math.sin(Math.PI * p) + 10
    const on = 0.6 + 0.4 * Math.sin(t * 4 + i * 1.9), c = cols[i % cols.length]
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * on
    const g = x.createRadialGradient(px, py, 2, px, py, 34); g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(px - 34, py - 34, 68, 68); x.restore()
    R(x, INK, px - 9, py - 9, 18, 22); R(x, c, px - 5, py - 5, 10, 14)
  }
}
/** a simple floor band (a room or a ground) from y down to the bottom of the scene */
export function floor(x, y, col = '#2a2148', line = '#3a2f62', h = 1300 - y) {
  R(x, col, 0, y, 1080, h); R(x, line, 0, y, 1080, 8)
}
/** a pixel table top (cx, y top), width w */
export function table(x, cx, y, w, col = '#8a5a3a') {
  box(x, cx - w / 2, y, w, 26, col, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  R(x, INK, cx - w / 2 + 20, y + 30, 18, 150); R(x, INK, cx + w / 2 - 38, y + 30, 18, 150)
}
/** pixel text on a little sign / card */
export function card(x, cx, cy, w, h, text, { col = BONE, ink = INK, size = 30, rot = 0, font = INTER, weight = 800, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = ink
  String(text).split('\n').forEach((ln, i, a) => x.fillText(ln, 0, (i - (a.length - 1) / 2) * size * 1.15 + 2))
  x.restore()
}
/** a moving "zoom" streak trail behind a fast thing */
export function speedLines(x, cx, cy, dir = -1, n = 4, len = 120, a = 0.6) {
  x.save(); x.globalAlpha = a
  for (let i = 0; i < n; i++) R(x, BONE, cx + dir * (60 + i * 24), cy - 50 + i * 30, dir * len * (1 - i * 0.15), 6)
  x.restore()
}

// ── the format bug: "RATE MY DATE IDEA" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'RATE&nbsp;MY<span style="color:rgba(255,255,255,0.6)">&nbsp;DATE&nbsp;IDEA</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(out) } }
}

// ── the pitch sticker: the idea in quotes, on a bone card, already on screen at frame 0
function buildPitch(root, { text, deep }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '318px', width: '1080px', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { maxWidth: '900px', padding: '20px 36px 24px', background: BONE, border: `6px solid ${INK}`, borderRadius: '16px', boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`,
    transform: 'rotate(-1.6deg)', textAlign: 'center' }, wrap)
  const html = '“' + text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 66px ${SERIF};color:${deep};letter-spacing:0">$1</span>`) + '”'
  el('div', { font: `800 52px ${INTER}`, lineHeight: '1.1', color: INK, letterSpacing: '-0.01em' }, st, html)
  return {
    update(t, out = 1) {
      wrap.style.display = out <= 0.01 ? 'none' : 'flex'
      if (out <= 0.01) return
      const wob = 1 + 0.035 * Math.sin(t * 9) * Math.exp(-t * 2.2)                 // a lively settle from frame 0
      st.style.opacity = String(out)
      st.style.transform = `translateY(${((1 - out) * -24).toFixed(1)}px) rotate(${(-1.6 + 1.2 * Math.sin(t * 7) * Math.exp(-t * 2)).toFixed(3)}deg) scale(${(wob * lerp(0.86, 1, out)).toFixed(4)})`
    },
  }
}

// ── the beat sticker: a tilted bone sticker with a pill tag (THE PLAN / BUT…), Inter 800 + one *italic* accent
function buildSticker(root, { tag, text, deep, badge, at, out, tilt }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1330px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '960px', padding: '18px 34px 20px 20px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrap)
  el('div', { flex: '0 0 auto', padding: '10px 18px 12px', borderRadius: '40px', background: badge, border: `5px solid ${INK}`, font: `800 30px ${INTER}`, letterSpacing: '0.06em', color: INK, whiteSpace: 'nowrap' }, st, tag)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 62px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 48px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
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

// ── the rating imprint (DOM): "RATED" + the score in red ink + the italic word, a double border, tilted
function buildStamp(root, { score, word, ink }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '150px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '14px 46px 22px', border: `12px solid ${ink}`, outline: `5px solid ${ink}`, outlineOffset: '10px', borderRadius: '10px', transform: 'rotate(-5deg)', transformOrigin: '50% 50%',
    color: ink, textAlign: 'center', background: 'rgba(255,255,255,0.03)', textShadow: '0 4px 18px rgba(6,4,18,0.6)', whiteSpace: 'nowrap' }, wrap)
  el('div', { font: `800 34px ${INTER}`, letterSpacing: '0.3em', lineHeight: '1.2' }, st, 'THE STARS RATE IT')
  el('div', { font: `800 150px ${INTER}`, letterSpacing: '-0.03em', lineHeight: '1' }, st, score)
  el('div', { font: `italic 500 70px ${SERIF}`, lineHeight: '1.05' }, st, word)
  wrap.style.display = 'flex'
  const fitK = Math.min(1, 960 / Math.max(1, st.offsetWidth || 1))
  wrap.style.display = 'none'
  return {
    update(t) {
      const on = t >= T.stamp - 0.02 && t < T.out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, T.stamp - 0.02, T.stamp + 0.06), o = popOut(t, T.out)
      const sc = lerp(1.25, 1, ease.outCubic(p)) * (1 + 0.03 * Math.exp(-(t - T.stamp) * 8) * Math.sin((t - T.stamp) * 40))
      st.style.opacity = String(clamp(p * 2) * clamp(o))
      st.style.transform = `rotate(-5deg) scale(${(sc * fitK * Math.max(0.01, o)).toFixed(4)})`
    },
  }
}

// the rubber stamp itself (canvas): slams onto the imprint at T.stamp, then lifts away
function drawStampTool(x, t, ink) {
  const [a] = T.stampDrop, b = T.stamp
  if (t < a || t > b + 0.6) return
  let y, rot = -0.1
  if (t < b) { const p = ease.inCubic(prog(t, a, b)); y = lerp(-420, 330, p); rot = lerp(-0.35, -0.1, p) }
  else { const q = ease.inOutCubic(prog(t, b + 0.1, b + 0.6)); y = lerp(330, -460, q); rot = lerp(-0.1, 0.25, q) }
  const sq = t >= b && t < b + 0.1 ? 0.12 * Math.sin(Math.PI * (t - b) / 0.1) : 0
  x.save(); x.translate(540, y); x.rotate(rot); x.scale(1 + sq, 1 - sq)
  box(x, -330, -40, 660, 110, '#6b4a2f', { b: 8, hi: '#8a6440' })
  R(x, ink, -330, 70, 660, 20)
  box(x, -50, -170, 100, 130, '#7b5634', { b: 8, hi: '#98704a' })
  box(x, -110, -260, 220, 100, RED, { b: 8, hi: '#ff6b7f' })
  x.restore()
}

// ── the fake progress bar: 4 segments (pitch, plan, but, rating) under the bug
const SEGS = [[0, 2.6], [2.6, 5.8], [5.8, 9.0], [9.0, 13.15]]
function drawBar(x, t, col) {
  const k = outK(t, T.out)
  if (k <= 0.01) return
  const X0 = 56, X1 = 1024, GAP = 10, n = SEGS.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120, Hh = 8
  x.save(); x.globalAlpha = clamp(k)
  SEGS.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.25)', sx, Y, w, Hh)
    const f = Math.max(prog(t, a, b), i === 0 ? 0.04 : 0)
    if (f > 0) R(x, i === 3 ? col : BONE, sx, Y, w * f, Hh)
  })
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeDate(cfg) {
  const HERO = signStar(cfg.sign), PIS = signStar('pisces'), DATE = signStar(cfg.date)
  const heroIsPis = cfg.sign === 'pisces'
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const HOOK_HOPS = [-0.12, 0.75, 1.5, 2.15]
  const FIN_HOPS = [T.stamp + 0.04, T.stamp + 0.5, T.last + 1.6]
  const PIS_DEF = { x: 935, y: 1640, s: 150 }

  const withTears = (x, t, col, o, seed, glow) => {
    const opts = { color: col, seed, glow, ...o, glyph: o.glyph !== undefined ? o.glyph : (o.s >= 150 ? o.g : null) }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    if (o.tears) { const F = starFrame(o.x, o.y, o.s, t, opts); inSprite(x, F, () => tearsCells(x, t, o.tears)) }
  }
  const hero = (x, t, o = {}) => withTears(x, t, HERO.color, { g: HERO.glyph, ...o }, 3, 1.1)
  const date = (x, t, o = {}) => withTears(x, t, DATE.color, { g: DATE.glyph, ...o }, 7, 1)

  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  function tissues(x, cx, cy, s) {
    box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
    R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
    R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
  }

  async function build(stage) {
    try {
      await Promise.all(["800 84px Inter", "800 52px Inter", "800 48px Inter", "800 150px Inter", "800 34px Inter", "800 30px Inter", "800 28px Inter", "italic 500 120px 'EB Garamond'", "italic 500 70px 'EB Garamond'", "italic 500 66px 'EB Garamond'", "italic 500 62px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, 'Rate my *date idea:*', { top: 168, size: 84, accentSize: 120, at: -1, gap: 0.05, accentColor: cfg.accent || HERO.color, fit: true })
    const pitch = buildPitch(root, { text: cfg.idea, deep: cfg.deep })
    const tags = ['THE PLAN', 'BUT…']
    const stickers = cfg.beats.map((b, i) => buildSticker(root, { tag: tags[i], text: b.caption, deep: cfg.deep, badge: i ? PINK : (cfg.badge || HERO.color), at: T.beats[i][0] + (i ? 0.55 : 0.3), out: [T.beats[i][1] - 0.18, T.beats[i][1]], tilt: [-1.8, 1.6][i] }))
    const stamp = buildStamp(root, { score: cfg.score, word: cfg.word, ink: cfg.stampInk || RED })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function hook(t) {
      if (t >= T.beats[0][0]) return
      const S = { hero, date, k: 1, HOOK_HOPS, u: t, ...HOOK }
      if (cfg.hook) cfg.hook(x, t, S)
      else { shadow(x, HOOK.x, HOOK.y + 200, 260); hero(x, t, { ...HOOK, mood: 'sparkle', look: [0, 0], hops: HOOK_HOPS, tears: heroIsPis ? 1 : 0 }) }
      if (!heroIsPis) {   // Pisces already peeking in the corner, misty-eyed at the idea
        const P = { ...PIS_DEF, ...(cfg.hookPis || {}) }
        tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5)
        pisces(x, t, P, 1, 'wide', [-1, -0.8])
      }
    }

    function finale(t) {
      if (t < T.stamp || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const S = { hero, date, ok, FIN_HOPS }
      if (cfg.finale) cfg.finale(x, t, S)
      else {
        shadow(x, 400, 1070, 220 * ok); shadow(x, 690, 1080, 200 * ok)
        hero(x, t, { x: 400, y: 880, s: 250, pop: ok, mood: t > T.stamp + 0.15 ? 'happy' : 'wide', look: [1, 0], hops: FIN_HOPS, tears: heroIsPis ? 3 : 0 })
        date(x, t, { x: 690, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
      }
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) drawStarChar(x, 190, 1225, 170, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
      // Pisces gives every idea a perfect score, crying
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01) {
        const F = heroIsPis ? null : pisces(x, t, { x: 890, y: 1230, s: 160, pop: pk, hops: [T.pisIn + 0.3, T.score + 0.02, T.score + 0.6] }, t > T.score ? 3 : 2, 'sparkle', [-1, -1])
        const ck = pop01(t, T.score, 0.3, 2.6) * ok
        if (ck > 0.01 && F) {
          x.save(); x.translate(894, F.cy - 150 - 8 * Math.sin(t * 5)); x.rotate(0.08 * Math.sin(t * 4)); x.scale(ck, ck)
          box(x, -82, -50, 164, 100, BONE, { b: 6 }); R(x, INK, -6, 50, 12, 70)
          x.font = `800 50px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText(cfg.pisScore || (cfg.score === '10/10' ? '11/10' : '10/10'), 0, 4)
          x.restore()
        }
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 2.5))
        const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
        drawSky(x, t, { ...base, ...(cfg.sky || {}) })
        const dS = t - T.stamp, shake = dS > 0 && dS < 0.45 ? 18 * Math.exp(-dS * 9) * Math.sin(dS * 60) : 0
        x.save(); x.translate(0, shake)
        hook(t)
        cfg.beats.forEach((b, i) => {
          const a = T.beats[i][0], e = i === 1 ? T.stamp : T.beats[i][1]
          if (t < a || t >= e) return
          const punch = 1 + 0.07 * (1 - ease.outCubic(prog(t, a, a + 0.28)))
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          b.draw(x, t, { u: t - a, t0: a, t1: e, hero, date, HERO, DATE, i, pisces })
          x.restore()
          if (!heroIsPis) {
            const P = { ...PIS_DEF, ...(b.pis || {}) }
            const pk = pop01(t, a + 0.25, 0.3, 2) * outK(t, [e - 0.15, e])
            if (pk > 0.01) {
              if (!P.noTissues) tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
              pisces(x, t, { ...P, pop: pk }, i === 1 ? 2 : 1, i === 1 ? 'sparkle' : 'wide', P.look || [-1, -0.6])
            }
          }
        })
        finale(t)
        x.restore()
        drawBar(x, t, BUG_PINK)
        tx.clearRect(0, 0, 1080, 1920)
        tx.save(); tx.translate(0, shake); drawStampTool(tx, t, cfg.stampInk || RED); tx.restore()
        sparkles(tx, t, 540, 330, T.stamp + 0.02, 14, 430, 1, [GOLD, BONE, PINK])
        const hOut = outK(t, T.h0Out)
        H0.update(t, hOut)
        pitch.update(t, hOut)
        stickers.forEach(s => s.update(t))
        stamp.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const c0 = T.beats[0][0]
        const c1 = T.beats[1][0]
        const fl = Math.max(t >= c0 && t < c0 + 0.12 ? 1 - (t - c0) / 0.12 : 0, t >= c1 && t < c1 + 0.12 ? 1 - (t - c1) / 0.12 : 0, t >= T.stamp && t < T.stamp + 0.1 ? 0.6 * (1 - (t - T.stamp) / 0.1) : 0)
        flash.style.opacity = String(0.55 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // no card transition (owner's change 4 Nov): BUT… is a plain jump cut with a flash, like THE PLAN
  const CUTS = []
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END - 2.2, label: 'TONIGHT’S DECK', corners: 'tr bl br' })]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ['pop', 0.02, 987.77, 0.04, 0], ['pluck', 0.1, 1567.98, 0.03, 0.4, 0.2], ['glitter', 0.05, 0.4],
    ...(cfg.hookCues || []),
    ...cfg.beats.flatMap((b, i) => {
      const a = T.beats[i][0], st = a + (i ? 0.55 : 0.3)
      return [
        ['whoosh', r3(a - 0.08), 0.28, 0.035], ['tick', a, 0.05],
        ['pop', r3(st), 1174.66, 0.045, 0.1], ['pop', r3(st + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(st + 0.02), 0.04],
        ['pluck', r3(a + 0.3), 2349.32, 0.012, 0.3, 0.6],
        ...(b.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    ['whoosh', T.stampDrop[0], 0.32, 0.04], ['boom', T.stamp, 0.32], ['tom', T.stamp, 88, { gain: 0.3, decay: 0.3 }], ['tick', T.stamp, 0.08],
    ['bell', r3(T.stamp + 0.08), 1760, 0.03, 1.2, 0], ['glitter', r3(T.stamp + 0.05), r3(T.stamp + 0.55)], ['whoosh', r3(T.stamp + 0.2), 0.3, 0.02],
    ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
    ['pop', T.score, 1318.51, 0.045, 0.4], ['pop', r3(T.score + 0.08), 1760, 0.035, 0.4], ['glitter', T.score, r3(T.score + 0.3)],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...endcardCues(STORY_END, { short: true }),
  ]
  void NOTE
  return { DURATION, SCENES, CUES, T, CUTS }
}
