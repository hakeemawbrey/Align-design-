// ZODIAC HOT SEAT: the shared look of the 24 Month 2 trial reels khse01–khse24 (promo/films/month2/m35.md).
// Lives in khse01's folder; khse02–khse24 import it read-only. No end card, no card cut, no logo, never the brand name.
//
// The show: one sign in a red swivel chair under a hard white spotlight on a dark stage. THE STARS (the off-screen host)
// fire rapid questions: each slams in as a card at the top with a shrinking red timer, the sign blurts the answer in a
// bubble. Then the LAST QUESTION: the music drops out (tape stop), the light goes soft and warm, the honest answer types
// slowly, Pisces (the buzzer operator, bottom-right booth) sobs, and THE STARS close with one warm line at the top.
//
//   makeHotSeat(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.sign, cfg.name, cfg.accent (headline accent colour)
//     cfg.hook: the hook line (on screen, fully, at frame 0), `*accent*` and `|` for a line break
//     cfg.qs: [{ q, a, mood, cues?, draw?(x, t, S) }]  2–3 quick questions (answers can be '' for a silent gag)
//     cfg.final: { q, a, mood, draw? }   the honest one
//     cfg.last: THE STARS' last line
//     cfg.ending: 'cut' | 'loop'
//     cfg.breakFx: the first-second pattern break: 'scratch' (record scratch + freeze) | 'whip' | 'shake' | 'glitch' | 'flash'
//     cfg.frame0(x, t, S): extra drawing for the hook (S.k: 1 during the hook, easing to 0 as the show starts)
//     cfg.hero0: the hero's frame-0 pose { x, y, s, rot, mood, look }, eased into the seated pose by T.settle
//     cfg.chair: { spin(t), tip(t), off } optional chair motion overrides; cfg.props(x, t, S) drawn every frame
//     cfg.booth: { sign: 'pisces' } who runs the buzzer; cfg.seatPisces: Pisces is in the chair (e12)
//     cfg.music: { style, key, seed }
//     cfg.tail: seconds held after the last line has typed (default 1.0)
// Everything draws as a pure function of t; DOM and canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, lineTimes, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import * as HK from '../../hookkit.js'
export { HK }

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', SKYB = '#8fe3ff', MINT = '#9fe6b0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_RED = '#ff5a6e'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, el }

// ── drawing helpers (pixel-chunky props, same language as the Star Talk kits)
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
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / 0.7)
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
/** a pixel speech bubble. k = scale (0…1). tail: -1…1 along the bottom edge */
export function bubbleK(x, cx, cy, k, text, { col = BONE, ink = INK, size = 44, tail = 0, font = INTER, weight = 800, maxW = 940 } = {}) {
  if (k <= 0.01 || !text) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  let fs = size, tw = x.measureText(text).width
  if (tw + 44 > maxW) { fs = size * (maxW - 44) / tw; x.font = `${weight} ${fs}px ${font}`; tw = x.measureText(text).width }
  const w = tw + 48, h = fs + 34
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2, w + 12, h); x.fillRect(-w / 2, -h / 2 - 6, w, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 15, h / 2 + 4, 15, 13); x.fillRect(tx - 8, h / 2 + 15, 9, 9)
  x.fillStyle = col; x.fillRect(tx - 10, h / 2, 10, 10)
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
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha *= a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a phone prop (screen lines are drawn by fn(x) in local coords, screen = −58…58 × −108…102) */
export function phone(x, cx, cy, rot, fn, { s = 1, glow = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 20, 0, 0, 300); g.addColorStop(0, `rgba(190,220,255,${0.3 * glow})`); g.addColorStop(1, 'rgba(190,220,255,0)'); x.fillStyle = g; x.fillRect(-300, -300, 600, 600); x.restore() }
  box(x, -70, -125, 140, 250, '#2a2148', { b: 7 })
  R(x, '#14102a', -58, -108, 116, 210)
  if (fn) { x.save(); x.beginPath(); x.rect(-58, -108, 116, 210); x.clip(); fn(x); x.restore() }
  x.restore()
}
/** a red "caught" circle drawn on (canvas), progress p 0…1 */
export function caught(x, cx, cy, rx, ry, p, { col = RED, w = 12 } = {}) {
  if (p <= 0) return
  x.save(); x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'
  x.beginPath(); x.ellipse(cx, cy, rx, ry, -0.12, -Math.PI * 0.6, -Math.PI * 0.6 + Math.PI * 2.15 * ease.outCubic(clamp(p)))
  x.stroke(); x.restore()
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
export function shadesCells(ctx, up = 0) {
  const y = 16.6 - up * 7
  for (const ex of [13.4, 22.6]) { ctx.fillStyle = INK; ctx.fillRect(ex - 3.6, y - 0.6, 7.2, 5.2); ctx.fillStyle = '#2b2140'; ctx.fillRect(ex - 3, y, 6, 4); ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(ex - 2.4, y + 0.6, 1.6, 0.8) }
  ctx.fillStyle = INK; ctx.fillRect(16.8, y + 0.4, 2.4, 1.2)
}
/** sweat drops off the brow (sprite cells) */
export function sweatCells(ctx, t, k = 1) {
  if (k <= 0) return
  for (let q = 0; q < 2; q++) {
    const ph = ((t * 1.3 + q * 0.5) % 1)
    const i = 28 + q * 1.5 + ph * 2, j = 9 + ph * 10
    ctx.globalAlpha = 1 - ph
    ctx.fillStyle = INK; ctx.fillRect(i - 0.2, j - 0.2, 1.6, 2.2); ctx.fillStyle = SKYB; ctx.fillRect(i, j, 1.2, 1.8)
    ctx.globalAlpha = 1
  }
}

// ── the set
/** the hard white spotlight: a cone from (tx, top) to an ellipse at (bx, by). warm 0…1 shifts it gold and soft */
export function spotlight(x, tx, bx, by, w, a, warm = 0, top = -60) {
  if (a <= 0) return
  const col = warm > 0 ? [Math.round(lerp(235, 255, warm)), Math.round(lerp(245, 214, warm)), Math.round(lerp(255, 150, warm))] : [235, 245, 255]
  const c = col.join(',')
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${c},${0.1 * a})`); g.addColorStop(1, `rgba(${c},${(0.3 - 0.08 * warm) * a})`)
  const tw = 46 + 30 * warm
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - tw, top); x.lineTo(tx + tw, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${c},${0.32 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.11, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** the stage floor: a dark round platform with a bulb rim */
export function stage(x, t, { lit = 1 } = {}) {
  R(x, '#0d0920', 0, 1250, 1080, 670)
  const g = x.createLinearGradient(0, 1250, 0, 1920); g.addColorStop(0, '#1d1540'); g.addColorStop(1, '#07050f')
  x.fillStyle = g; x.fillRect(0, 1250, 1080, 670)
  x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(540, 1292, 470, 92, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2c2158'; x.beginPath(); x.ellipse(540, 1284, 458, 82, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#3a2d72'; x.beginPath(); x.ellipse(540, 1278, 440, 70, 0, 0, Math.PI * 2); x.fill()
  x.restore()
  // rim bulbs chasing
  for (let i = 0; i < 22; i++) {
    const a = Math.PI * (i / 21), bx = 540 - Math.cos(a) * 452, by = 1292 + Math.sin(a) * 84
    const on = ((i + Math.floor(t * 6)) % 3) === 0
    R(x, INK, bx - 7, by - 7, 14, 14); R(x, on ? (lit > 0.5 ? GOLD : '#a07a3a') : '#5a4a30', bx - 4, by - 4, 8, 8)
  }
}
/** the red swivel chair. spin: −1…1 (back turns), tip: radians, part 'back' | 'front' */
export function chair(x, cx, cy, { spin = 0, tip = 0, part = 'back', col = RED, s = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(tip); x.scale(s, s)
  const sw = Math.cos(spin * Math.PI)            // the back narrows as it turns
  if (part === 'back') {
    // the base: a five-leg star + wheels, the gas stem
    R(x, INK, -10, -40, 20, 150); R(x, '#a9a4c4', -5, -36, 10, 142)
    for (const d of [-1, -0.45, 0.45, 1]) { x.save(); x.translate(0, 110); x.rotate(d * 1.25); R(x, INK, -8, 0, 16, 92); R(x, '#8c86a8', -4, 0, 8, 88); R(x, INK, -12, 86, 24, 20); x.restore() }
    // the back: tall, tufted
    const w = 300 * Math.max(0.12, Math.abs(sw))
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, -326, w / 2 + 8, 52, 0, Math.PI, 0); x.fill()
    x.fillStyle = sw >= 0 ? col : '#8a1f33'; x.beginPath(); x.ellipse(0, -326, w / 2, 44, 0, Math.PI, 0); x.fill()
    box(x, -w / 2, -330, w, 300, sw >= 0 ? col : '#8a1f33', { b: 8 })
    if (sw > 0.3) for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) R(x, 'rgba(27,18,54,0.45)', (-0.3 + i * 0.3) * w - 5, -280 + j * 85, 10, 10)
  } else {
    // the seat cushion and the arms (in front of the sitter)
    box(x, -190, -52, 380, 56, col, { b: 8, hi: 'rgba(255,255,255,0.2)' })
    for (const d of [-1, 1]) { box(x, d * 200 - 22, -130, 44, 120, '#b8243c', { b: 7, hi: 'rgba(255,255,255,0.18)' }) }
  }
  x.restore()
}
/** the buzzer booth (bottom-right): a desk, a big red buzzer dome, a tissue box. press 0…1 squashes the dome */
export function booth(x, t, { press = 0, x0 = 770, y0 = 1600, tissues = 1 } = {}) {
  box(x, x0, y0, 290, 170, '#3a2d66', { b: 7, hi: '#4b3b84' })
  R(x, '#2a2050', x0 + 14, y0 + 60, 262, 96)
  label(x, 'BUZZER', x0 + 145, y0 + 108, { size: 30, col: GOLD, font: INTER, weight: 800 })
  // the dome
  const sq = 1 - 0.45 * press
  R(x, INK, x0 + 34, y0 - 16, 112, 22); R(x, '#a9a4c4', x0 + 40, y0 - 12, 100, 14)
  x.save(); x.translate(x0 + 90, y0 - 12); x.scale(1 + 0.12 * press, sq)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 50, 46, 0, Math.PI, 0); x.fill()
  x.fillStyle = RED; x.beginPath(); x.ellipse(0, 0, 42, 38, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#ff8a98'; x.fillRect(-24, -30, 14, 10)
  x.restore()
  // the tissue box
  if (tissues > 0) {
    const tx = x0 + 230, ty = y0 - 30
    box(x, tx - 40, ty - 20, 80, 46, '#9fd8f6', { b: 5, hi: '#c9ecfb' })
    R(x, INK, tx - 16, ty - 24, 32, 7)
    R(x, '#ffffff', tx - 11, ty - 54 + 4 * Math.sin(t * 6), 22, 34)
  }
}

// ── the fixed timeline (short): hook 0–1.35, quick questions every 1.5 s, the last question, the last line
export function timeline(cfg) {
  const n = cfg.qs.length, GAP = cfg.gap ?? 1.5
  const H = cfg.hookLen ?? 1.5
  const qs = cfg.qs.map((_, i) => H + i * GAP)
  const fq = H + n * GAP
  const fa = fq + (cfg.final.ansDelay ?? 1.05)
  const lastAt = fa + (cfg.final.hold ?? 1.6)
  const brk = cfg.breakAt ?? 0.3
  return { H, GAP, qs, fq, fa, lastAt, brk, freeze: [brk, brk + (cfg.freezeLen ?? 0.6)], settle: [H - 0.45, H], bug: 0 }
}

// ── the bug: "ZODIAC HOT SEAT" (Inter 800 small caps, letter-spaced) with an ON-AIR dot. Visible at frame 0.
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  const dot = el('div', { width: '18px', height: '18px', borderRadius: '50%', background: BUG_RED, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,90,110,0.8)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_RED, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'ZODIAC<span style="color:rgba(255,255,255,0.7)">&nbsp;HOT&nbsp;SEAT</span>')
  return { update(t, o = 1) { b.style.opacity = String(o); dot.style.opacity = String(0.55 + 0.45 * (Math.sin(t * 6) > 0 ? 1 : 0)) } }
}
/** a static headline (visible in full at any t): `*accent*`, `|` line break */
export function headline(root, text, { top, size = 84, accentSize = 112, accent = GOLD, width = 960, color = BONE, lineHeight = 1.04 } = {}) {
  const wrap = el('div', { position: 'absolute', left: ((1080 - width) / 2) + 'px', top: top + 'px', width: width + 'px', textAlign: 'center', pointerEvents: 'none', transformOrigin: '50% 50%' }, root)
  const html = text.split('|').map(s => s.trim().replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${accentSize}px ${SERIF};color:${accent};letter-spacing:0">$1</span>`)).join('<br>')
  const inner = el('div', { font: `800 ${size}px ${INTER}`, lineHeight: String(lineHeight), color, letterSpacing: '-0.015em', textShadow: '0 4px 0 rgba(6,4,18,0.9), 0 0 28px rgba(6,4,18,0.85)' }, wrap, html)
  // fit to width
  wrap.style.visibility = 'hidden'; wrap.style.display = 'block'
  const k = Math.min(1, (width - 10) / Math.max(1, inner.scrollWidth))
  if (k < 1) { inner.style.fontSize = (size * k) + 'px'; inner.querySelectorAll('span').forEach(s => { s.style.fontSize = (accentSize * k) + 'px' }) }
  wrap.style.visibility = 'visible'
  return {
    root: wrap,
    set(o, { dx = 0, dy = 0, sc = 1, rot = 0 } = {}) {
      wrap.style.display = o > 0.01 ? 'block' : 'none'
      wrap.style.opacity = String(clamp(o))
      wrap.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${sc.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
    },
  }
}
/** the question card (DOM): a bone card, a numbered badge, the question. kind 'q' | 'last' */
function buildCard(root, { n, text, kind = 'q', accent }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '176px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const last = kind === 'last'
  const st = el('div', { position: 'relative', display: 'flex', alignItems: 'center', gap: '24px', maxWidth: '960px', padding: '26px 38px 30px 26px', background: last ? '#fff3d6' : BONE, border: `7px solid ${INK}`, borderRadius: '16px', boxShadow: `12px 12px 0 rgba(6,4,18,0.75)`, transformOrigin: '50% 40%' }, wrap)
  el('div', { flex: '0 0 auto', minWidth: '96px', height: '96px', padding: '0 10px', boxSizing: 'border-box', borderRadius: '48px', background: last ? GOLD : RED, border: `6px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 ${last ? 26 : 44}px ${INTER}`, color: last ? INK : '#fff', lineHeight: '1', textAlign: 'center' }, st, last ? 'LAST<br>Q' : `Q${n}`)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 74px ${SERIF};color:${accent};letter-spacing:0">$1</span>`)
  el('div', { font: `800 58px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
  // the timer bar under the card
  const bar = el('div', { position: 'absolute', left: '26px', right: '26px', bottom: '-30px', height: '12px', background: 'rgba(239,230,214,0.25)', border: `4px solid ${INK}`, borderRadius: '8px', overflow: 'hidden' }, st)
  const fillB = el('div', { height: '100%', width: '100%', background: last ? GOLD : RED, transformOrigin: '0% 50%' }, bar)
  return {
    update(t, { at, out, dur, slow = false }) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, at, at + (slow ? 0.5 : 0.22)), o = outK(t, out)
      const k = slow ? ease.outCubic(p) : easeOutBack(p, 2.2)
      const sc = slow ? lerp(0.9, 1, k) : lerp(1.6, 1, k)
      const rot = slow ? 0 : lerp(-9, (n % 2 ? -1.6 : 1.6), k)
      const dy = slow ? lerp(-30, 0, k) : lerp(-260, 0, ease.outCubic(p))
      st.style.opacity = String(clamp(p * 4) * o)
      st.style.transform = `translateY(${(dy - (1 - o) * 60).toFixed(1)}px) scale(${(sc * lerp(0.8, 1, o)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      fillB.style.transform = `scaleX(${(1 - prog(t, at, at + dur)).toFixed(4)})`
    },
  }
}
/** THE STARS' last line: a speaker tag and the line, typed */
function buildLast(root, { text, at, accent, cps = 30 }) {
  const wrap = el('div', { position: 'absolute', left: '60px', top: '170px', width: '960px', display: 'none', flexDirection: 'column', alignItems: 'center', gap: '18px', pointerEvents: 'none' }, root)
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.24em', color: GOLD, textShadow: '0 2px 10px rgba(6,4,18,0.9)', fontVariant: 'small-caps', display: 'flex', alignItems: 'center', gap: '12px' }, wrap, `<span style="display:inline-block;width:16px;height:16px;background:${GOLD};box-shadow:0 0 0 4px ${INK}"></span>THE&nbsp;STARS`)
  const line = el('div', { font: `800 76px ${INTER}`, lineHeight: '1.08', color: BONE, textAlign: 'center', letterSpacing: '-0.015em', textShadow: '0 4px 0 rgba(6,4,18,0.9), 0 0 30px rgba(6,4,18,0.85)' }, wrap)
  // pre-laid characters, revealed one by one
  const chars = []; let acc = false
  for (const ch of text) { if (ch === '*') { acc = !acc; continue } chars.push({ ch, acc }) }
  const spans = chars.map(c => { const s = el('span', c.acc ? { font: `italic 500 96px ${SERIF}`, color: accent, letterSpacing: '0' } : {}, line); s.textContent = c.ch; return s })
  const times = lineTimes([{ t: at, speaker: 'THE STARS', text }], { cps })[0]
  wrap.style.display = 'flex'
  const k = Math.min(1, 950 / Math.max(1, line.scrollWidth))
  if (k < 1) { line.style.fontSize = (76 * k) + 'px'; spans.forEach((s, i) => { if (chars[i].acc) s.style.fontSize = (96 * k) + 'px' }) }
  wrap.style.display = 'none'
  return {
    done: times.done,
    update(t, o = 1) {
      const on = t >= at - 0.15 && o > 0.01
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      wrap.style.opacity = String(clamp(prog(t, at - 0.15, at)) * o)
      spans.forEach((s, i) => { s.style.visibility = t >= times.chars[i] ? 'visible' : 'hidden' })
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode (short)
export function makeHotSeat(cfg) {
  const T = timeline(cfg)
  const HERO = signStar(cfg.seatPisces ? 'pisces' : cfg.sign), PIS = signStar('pisces')
  const BOOTH = signStar(cfg.booth?.sign || 'pisces')
  const accent = cfg.accent || HERO.color
  const CPS = 30
  const lastTimes = lineTimes([{ t: T.lastAt, speaker: 'THE STARS', text: cfg.last }], { cps: CPS })[0]
  const DURATION = r3(Math.ceil((lastTimes.done + (cfg.tail ?? 1.0)) * 10) / 10)
  T.end = DURATION
  const LOOP = cfg.ending === 'loop', LOOP_LEN = 0.42
  T.loopFrom = DURATION - LOOP_LEN
  const quickOut = i => (i + 1 < cfg.qs.length ? T.qs[i + 1] : T.fq)

  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const pressTimes = [...T.qs, T.fq]
  const pressK = t => { let k = 0; for (const p of pressTimes) { const d = t - p; if (d >= -0.06 && d < 0.3) k = Math.max(k, d < 0 ? 1 + d / 0.06 : 1 - d / 0.3) } return clamp(k) }

  // hero pose: frame-0 pose easing into the seat
  const SEAT = { x: 540, y: 1036, s: 290 }
  function heroPose(t) {
    const h0 = { ...SEAT, rot: 0, mood: 'wide', ...(cfg.hero0 || {}) }
    const k = ease.inOutCubic(prog(t, ...T.settle))
    return { x: lerp(h0.x, SEAT.x, k), y: lerp(h0.y, SEAT.y, k), s: lerp(h0.s, SEAT.s, k), rot: lerp(h0.rot || 0, 0, k), mood0: h0.mood, look0: h0.look, k }
  }
  function moodAt(t, P) {
    if (t < T.settle[1] - 0.1) return P.mood0
    for (let i = cfg.qs.length - 1; i >= 0; i--) if (t >= T.qs[i]) return t >= T.qs[i] + 0.5 ? (cfg.qs[i].mood || 'happy') : 'wide'
    if (t >= T.fa) return t >= T.lastAt + 0.4 ? (cfg.final.endMood || 'happy') : (cfg.final.mood || 'squint')
    if (t >= T.fq) return 'neutral'
    return 'neutral'
  }
  // the camera: the pattern break and the push-in on the last question
  function camera(t) {
    let zoom = 1, dx = 0, dy = 0, rot = 0
    // every quick question: a tiny punch
    for (const q of T.qs) { const d = t - q; if (d >= 0 && d < 0.25) zoom *= 1 + 0.05 * (1 - d / 0.25) }
    // the last question: a slow push in
    const pk = ease.inOutCubic(prog(t, T.fq, T.lastAt))
    zoom *= 1 + 0.1 * pk; dy += -40 * pk
    const back = ease.inOutCubic(prog(t, T.lastAt, T.lastAt + 0.6))
    zoom = lerp(zoom, 1 + 0.04 * pk, back)
    return { zoom, dx, dy, rot }
  }

  async function build(stageEl) {
    try { await Promise.all(['800 84px Inter', '800 58px Inter', '800 44px Inter', '800 30px Inter', "italic 500 112px 'EB Garamond'", "italic 500 74px 'EB Garamond'", "700 28px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const root = fill(stageEl, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const cards = cfg.qs.map((q, i) => buildCard(root, { n: i + 1, text: q.q, accent }))
    const lastCard = buildCard(root, { n: 0, text: cfg.final.q, kind: 'last', accent })
    const lastLine = buildLast(root, { text: cfg.last, at: T.lastAt, accent, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const S = { hero, HERO, T, cfg, booth, chair }

    // the whole canvas scene at time t
    function scene(x, t) {
      const cam = camera(t)
      const lastK = prog(t, T.fq - 0.05, T.fq + 0.5) * (1 - prog(t, T.lastAt + 0.2, T.lastAt + 0.9) * 0.4)
      drawSky(x, t, { zoom: 1.5 * cam.zoom, dim: lerp(0.5, 0.32, lastK), stars: 1, dx: cam.dx, dy: cam.dy })
      x.save(); x.translate(540 + cam.dx, 960 + cam.dy); x.scale(cam.zoom, cam.zoom); x.rotate(cam.rot); x.translate(-540, -960)
      x.translate(540, 1310); x.scale(1.28, 1.28); x.translate(-540, -1250)     // the set, framed big
      stage(x, t, { lit: 1 - lastK })
      const P = heroPose(t)
      const ch = cfg.chair || {}
      const spin = ch.spin ? ch.spin(t) : 0, tip = ch.tip ? ch.tip(t) : 0, cx = ch.x ? ch.x(t) : 540
      // the spotlight (hard white → soft warm on the last question)
      const swing = cfg.spot ? cfg.spot(t) : { x: 540, w: 640 }
      spotlight(x, 540 + (swing.tx || 0), swing.x, 1290, swing.w * lerp(1, 0.86, lastK), 1, lastK)
      if (cfg.backdrop) cfg.backdrop(x, t, S)
      shadow(x, cx, 1290, 420, 0.4)
      if (!ch.off || !ch.off(t)) chair(x, cx, 1210, { spin, tip, part: 'back' })
      if (cfg.behind) cfg.behind(x, t, S, P)
      const heroOpts = { x: P.x, y: P.y, s: P.s, mood: moodAt(t, P), look: t < T.settle[1] ? P.look0 : [0, t >= T.fa ? 0.3 : 0], hops: cfg.hops || [T.qs[0] + 0.5, ...T.qs.slice(1).map(q => q + 0.5), T.lastAt + 0.4], blush: cfg.blush ? cfg.blush(t) : undefined }
      if (!cfg.hideHero || !cfg.hideHero(t)) {
        x.save(); x.translate(P.x, P.y); x.rotate(P.rot); x.translate(-P.x, -P.y)
        if (cfg.heroDraw) cfg.heroDraw(x, t, S, heroOpts)
        else hero(x, t, heroOpts)
        const F = starFrame(heroOpts.x, heroOpts.y, heroOpts.s, t, { hops: heroOpts.hops, seed: 3 })
        if (cfg.seatPisces) inSprite(x, F, () => tearsCells(x, t, t >= T.fa ? 3 : 2))
        if (cfg.onHero) inSprite(x, F, () => cfg.onHero(x, t, S))
        if (t >= T.fq + 0.3 && t < T.lastAt && !cfg.seatPisces) inSprite(x, F, () => sweatCells(x, t, 1))
        x.restore()
      }
      if (!ch.off || !ch.off(t)) chair(x, cx, 1210, { spin, tip, part: 'front' })
      // frame-0 action
      const hk = 1 - ease.inOutCubic(prog(t, ...T.settle))
      if (cfg.frame0 && hk > 0.001) cfg.frame0(x, t, { ...S, k: hk, P })
      if (cfg.props) cfg.props(x, t, S, P)
      // quick answers
      cfg.qs.forEach((q, i) => {
        const a = T.qs[i] + (q.ansDelay ?? 0.55), b = quickOut(i)
        if (q.draw) q.draw(x, t, { ...S, u: t - T.qs[i], t0: T.qs[i], t1: b, P })
        if (t < a || t >= b) return
        const k = pop01(t, a, 0.22, 2.6) * outK(t, [b - 0.12, b])
        bubbleK(x, 540 + (q.bx || 0), 760, k, q.a, { size: q.size || 50, tail: q.tail ?? 0 })
      })
      // the final answer: typed slowly with a leading "…"
      if (cfg.final.draw) cfg.final.draw(x, t, { ...S, u: t - T.fq, t0: T.fq, P })
      if (t >= T.fa && t < T.lastAt + 0.25 && cfg.final.a) {
        const n = Math.max(1, Math.floor((t - T.fa) * 26)), txt = [...cfg.final.a].slice(0, n).join('')
        const k = pop01(t, T.fa - 0.05, 0.25, 2) * outK(t, [T.lastAt, T.lastAt + 0.25])
        bubbleK(x, 540, 760, k, txt, { size: cfg.final.size || 50, col: '#fff3d6' })
      }
      x.restore()
      // the booth (not zoomed, so it stays put)
      drawBooth(x, t)
    }
    function drawBooth(x, t) {
      const pk = pressK(t)
      const sob = cfg.seatPisces ? 1 : t >= T.fa + 0.3 ? 3 : t >= T.fq ? 2 : 1
      const bx = 905, by = 1500
      const bo = cfg.booth?.sign || 'pisces'
      const opts = { color: BOOTH.color, glyph: null, mood: bo === 'pisces' ? (t >= T.fa + 0.3 ? 'sparkle' : 'wide') : (t >= T.fa + 0.3 ? 'happy' : 'neutral'), look: [-1, -0.6], seed: 6, glow: 0.8, hops: [...pressTimes.map(p => p - 0.08), T.fa + 0.3, T.fa + 0.9, T.lastAt + 0.6], tips: false }
      drawStarChar(x, bx, by, 210, t, opts)
      const F = starFrame(bx, by, 210, t, { hops: opts.hops, seed: 6 })
      if (bo === 'pisces') inSprite(x, F, () => tearsCells(x, t, sob))
      booth(x, t, { press: pk })
      if (bo === 'pisces' && t >= T.fa + 0.3) hearts(x, t, T.fa + 0.35, 905, 1390, { n: 4, cell: 5, spread: 90 })
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        scene(x, t)
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.overlay) cfg.overlay(tx, t, S)
        cards.forEach((c, i) => c.update(t, { at: T.qs[i], out: [quickOut(i) - 0.1, quickOut(i)], dur: T.GAP }))
        lastCard.update(t, { at: T.fq, out: [T.lastAt - 0.2, T.lastAt], dur: T.lastAt - T.fq, slow: true })
        lastLine.update(t, 1)
        bug.update(t, 1)
        const fl2 = t >= T.lastAt && t < T.lastAt + 0.12 ? 0.35 * (1 - (t - T.lastAt) / 0.12) : 0
        flash.style.opacity = String(fl2)
        drawGrain(gx, t)
      },
    }
  }

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  // the kit effects: the hook title (landed at frame 0), the first-second break, any extras, the loop-back
  const bf = cfg.breakFx || 'scratch'
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop ?? 196, size: cfg.hookSize ?? 100, accentColor: accent, out: [T.H - 0.22, T.H], width: 980 }
  const BRK = bf === 'scratch' ? [HK.recordScratch, HK.recordScratchCues, { at: T.brk, len: cfg.freezeLen ?? 0.6, caption: cfg.scratch || 'wait for *the last question.*', top: 1420 }]
    : bf === 'whip' ? [HK.whipZoom, HK.whipZoomCues, { at: T.brk - 0.1, len: 0.45, from: 1.5 }]
    : bf === 'shake' ? [HK.screenShake, HK.shakeCues, { at: T.brk, len: 0.5, amp: 30 }]
    : bf === 'glitch' ? [HK.glitch, HK.glitchCues, { at: T.brk, len: 0.55, dialog: false }]
    : [HK.whipZoom, HK.whipZoomCues, { at: -0.08, len: 0.45, from: 1.6 }]
  const FX = [BRK, ...(cfg.fx || [])]
  const wins = bf === 'scratch' ? [BRK[2]] : []
  const base = wins.length ? HK.frozen(build, wins) : build
  const SCENES = [base, ...FX.map(([f, , o]) => f(o)), HK.slamTitle(HOOK)]
  if (LOOP) SCENES.push(HK.loopBack([build, HK.slamTitle(HOOK)], { duration: DURATION, len: LOOP_LEN }))
  const BUZZ = t => [['chip', r3(t), 98, 0.3, { wave: 'square', duty: 0.5, gain: 0.045, decay: 0.28, sustain: 0.6, rev: 0.05, dly: 0 }], ['chip', r3(t), 104, 0.3, { wave: 'square', duty: 0.25, gain: 0.03, decay: 0.28, sustain: 0.6, rev: 0.05, dly: 0 }]]
  const CUES = [
    ...HK.slamTitleCues(HOOK).filter(c => c[1] >= 0),
    ...FX.flatMap(([, cf, o]) => cf(o)),
    ...(LOOP ? HK.loopCues({ duration: DURATION, len: LOOP_LEN }) : []),
    ['whoosh', r3(T.settle[0]), 0.3, 0.025], ['pop', r3(T.settle[1] - 0.05), 880, 0.03, 0],
    // every quick question: the buzzer, the card slap, the answer pop
    ...cfg.qs.flatMap((q, i) => [
      ...BUZZ(T.qs[i] - 0.04), ['whoosh', r3(T.qs[i] - 0.1), 0.18, 0.03], ['tick', r3(T.qs[i] + 0.12), 0.06],
      ['pop', r3(T.qs[i] + (q.ansDelay ?? 0.55)), NOTE[(i * 2 + 1) % 7], 0.045, (i % 2 ? 0.2 : -0.2)], ['pop', r3(T.qs[i] + (q.ansDelay ?? 0.55) + 0.07), NOTE[(i * 2 + 3) % 7], 0.03, 0],
      ...(q.cues || []).map(c => [c[0], r3(c[1] + T.qs[i]), ...c.slice(2)]),
    ]),
    // the last question: buzzer, then the music stops (tape stop) → near silence, one bell
    ...BUZZ(T.fq - 0.04), ['tapeStop', r3(T.fq - 0.05), 0.4], ['bell', r3(T.fq + 0.35), 880, 0.02, 1.4, 0],
    ...Array.from({ length: Math.min(14, Math.floor([...cfg.final.a].length / 2)) }, (_, i) => ['pop', r3(T.fa + i * 0.076), NOTE[i % 4], 0.012, 0]),
    ['pluck', r3(T.fa + 0.3), 2349.32, 0.014, 0.3, 0.6], ['glitter', r3(T.fa + 0.35), r3(T.fa + 0.9)],
    ...(cfg.final.cues || []).map(c => [c[0], r3(c[1] + T.fq), ...c.slice(2)]),
    // the last line: music back in
    ['bell', r3(T.lastAt), 1174.66, 0.035, 1.2, -0.2], ['bell', r3(T.lastAt + 0.06), 1760, 0.025, 1.2, 0.2],
    ...talkCues([{ t: T.lastAt, speaker: 'THE STARS', text: cfg.last }], { cps: CPS }),
    ...(cfg.cues || []),
  ]
  return { DURATION, SCENES, CUES, T, LOOP }
}

/** the cues.js object for a short episode */
export function hotCues(ep, cfg) {
  const T = ep.T, D = ep.DURATION
  return {
    id: cfg.id, duration: D,
    music: { style: cfg.music.style, key: cfg.music.key, seed: cfg.music.seed ?? 1, beat0: 0.05,
      sections: { drop: cfg.music.drop ?? 0.32, breakdown: [T.fq], lift: [T.lastAt], outroAt: cfg.ending === 'loop' ? D - 0.4 : Math.max(T.lastAt + 0.6, D - 1.4) }, hits: [T.lastAt] },
    cues: ep.CUES,
  }
}
