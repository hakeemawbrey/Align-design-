// CUTE, NOT AN ICK: the shared look of the five Star Talk Trends films trickclap, trickmenu, trickdogs, trickyummy and
// trickrun (promo/films/STARTALK-TRENDS.md §11). Every episode carries an identical copy of this file in its own folder,
// so the five films look like one format without touching another film's folder.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.00–2.30   hook: the bold top caption "Should be an *ick…* | but it’s *them.*" pops word by word. Two stars pop in:
//               THEM (the one doing the thing) and ME (the one who should be cringing). ME goes heart-eyed.
//   2.30–11.30  three moments (rule of three, the third twisted), each a jump cut with a numbered caption sticker. In
//               every moment a red "ICK?" buzzer badge slams in with a harsh buzz… wobbles… and flips into a pink
//               "CUTE" heart. The three-slot ICK tally under the bug fills: ✗ → ♥, ✗ → ♥, ✗ → ♥. Moment 3 starts under
//               the one card cut (8.1).
//   11.35–15.5  the verdict: a pink rubber-stamp imprint "NOT AN *ICK.*" slams over the frame; ME says the last line;
//               Pisces is a puddle of happy tears behind a "SO CUTE" sign.
// Pisces cries somewhere in the background of every moment (the running gag).
//
//   makeIck(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.id, cfg.them / cfg.me: sign ids, cfg.meName ('CAPRICORN'), cfg.deep (sticker accent ink), cfg.accent (headline accent)
//     cfg.moments: [{ caption, draw(x, t, S), cues: [[kind, dt, ...]], badge: { x, y }, pis: { x, y, s, noTissues } }] × 3
//        S = { u, t0, t1, buzz, flip, them, me, meMood(t), THEM, ME, i }
//     cfg.hook(x, t, S) optional extra hook drawing. cfg.finale(x, t, S) optional (default: both stars side by side).
//     cfg.last: the last line (said by ME).
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', HOT = '#ff5c8a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_PINK = '#ff7eb6'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in all five films)
export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
export const T = {
  black: [0, 0.3], bug: 0.35, tally: 0.5,
  h0: 0.15, h0Out: [2.1, 2.3],
  themIn: 0.45, meIn: 0.7, swoon: 1.45,
  moments: [[2.3, 5.2], [5.2, 8.1], [8.1, 11.3]],
  buzzAt: [1.35, 1.35, 1.65],        // the ICK? buzzer, seconds into each moment
  flipAfter: 0.62,                   // …and its flip into the CUTE heart
  cut: 8.1,
  stampDrop: [11.0, 11.32], stamp: 11.35, pisIn: 11.6, sign: 12.3,
  last: 11.95, boxClose: 15.1,
  out: [15.1, 15.5], bugOut: [15.2, 15.5],
}
export const BUZZ = T.moments.map(([a], i) => r3(a + T.buzzAt[i]))
export const FLIP = BUZZ.map(b => r3(b + T.flipAfter))
const CPS = 30

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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, rise = 200, cols = [HOT, PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * rise
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
/** a pixel speech bubble (canvas), popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, italic = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** pixel label text on canvas, with an ink drop shadow */
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
/** a warm pool of light (the jazzy club glow) */
export function glowPool(x, cx, cy, Rr, a = 1, col = '255,190,150') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, Rr * 0.1, cx, cy, Rr)
  g.addColorStop(0, `rgba(${col},${0.22 * a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - Rr, cy - Rr, Rr * 2, Rr * 2); x.restore()
}
/** "speed lines" behind a fast mover, trailing to the left (dir 1) or right (dir -1) */
export function speedLines(x, t, cx, cy, dir = 1, { n = 6, len = 160, a = 1, col = 'rgba(239,230,214,0.6)' } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  for (let i = 0; i < n; i++) {
    const yy = cy - 90 + i * 36, ph = (t * 7 + i * 0.37) % 1, l = len * (0.5 + 0.5 * Math.sin(i * 2.1 + 1))
    R(x, col, dir > 0 ? cx - 130 - l - ph * 60 : cx + 130 + ph * 60, yy, l, 6)
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
/** a hex colour mixed toward white by k (0…1): the stars' mittens are a light tint of their own colour */
export function tint(hex, k = 0.5) {
  const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v + (255 - v) * k))
  return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('')
}
// a pixel mitten (the stars' "hands"): drawn at an arm tip of a star frame
const MITT = ['.MM.', 'MMMM', 'MMMM', 'MMMM', '.MM.']
const MITT_T = ['.M...', 'MM.MM', 'MMMMM', 'MMMMM', '.MMM.']
export function mitt(x, F, side, { col = BONE, dx = 0, dy = 0, rot = 0, thumb = false, k = 1 } = {}) {
  if (k <= 0.01) return
  const hx = F.ox + side * 17.5 * F.cell * F.sx + dx, hy = F.cy - 4.5 * F.cell + dy
  drawBits(x, thumb ? MITT_T : MITT, { M: col }, hx, hy, F.cell * 1.7 * k, { rot, sx: side < 0 ? -1 : 1 })
}
/** a wave: the mitten up on the arm tip, waggling */
export function waveHand(x, t, F, side, { col = BONE, speed = 16, amp = 0.55, k = 1 } = {}) {
  const a = Math.sin(t * speed) * amp
  mitt(x, F, side, { col, dx: side * 2 * F.cell, dy: -6 * F.cell + Math.abs(a) * 2 * F.cell, rot: side * 0.3 + a, thumb: true, k })
}
/** a clap: both mittens meeting in front of the star at the clap times */
export function clapHands(x, t, F, claps, { col = BONE } = {}) {
  let d = 1
  for (const c of claps) { const dt = t - c; if (dt > -0.12 && dt < 0.16) d = Math.min(d, Math.abs(dt) / 0.12) }
  const off = lerp(0.6, 9, clamp(d)) * F.cell
  for (const side of [-1, 1]) drawBits(x, MITT_T, { M: col }, F.ox + side * off, F.cy + 8.5 * F.cell, F.cell * 1.9, { rot: side * 0.25, sx: side < 0 ? -1 : 1 })
}

// ═══════════════════════════════════════════ the format pieces: bug, ICK tally, buzzer badge, sticker, stamp
// the bug: "NOT AN ICK" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root, at) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'NOT&nbsp;AN<span style="color:rgba(255,255,255,0.6)">&nbsp;ICK</span>')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
      b.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

const XMARK = ['X...X', '.X.X.', '..X..', '.X.X.', 'X...X']
/** the three-slot ICK tally under the bug: empty → red ✗ at each buzz → pink ♥ at each flip */
function drawTally(x, t) {
  const k = pop01(t, T.tally, 0.3, 2) * outK(t, T.out)
  if (k <= 0.01) return
  const X0 = 64, Y = 146, SZ = 58, GAP = 16
  x.save(); x.globalAlpha = clamp(k * 1.5)
  label(x, 'ICKS:', X0 - 6, Y, { size: 32, col: 'rgba(239,230,214,0.75)', align: 'left', font: INTER, weight: 800 })
  for (let i = 0; i < 3; i++) {
    const cx = X0 + 112 + i * (SZ + GAP) + SZ / 2
    const b = BUZZ[i], f = FLIP[i]
    const fk = t < f - 0.1 ? 1 : t < f ? (f - t) / 0.1 : t < f + 0.1 ? (t - f) / 0.1 : 1
    const isHeart = t >= f
    const pk = t < b ? 0 : pop01(t, b, 0.22, 3)
    const hb = isHeart ? 1 + 0.25 * Math.exp(-(t - f) * 6) * Math.sin((t - f) * 20) : 1
    box(x, cx - SZ / 2, Y - SZ / 2, SZ, SZ, 'rgba(27,18,54,0.85)', { b: 4 })
    if (pk > 0.01) {
      x.save(); x.translate(cx, Y); x.scale(fk * pk * hb, pk * hb)
      if (isHeart) drawBits(x, HEART, { H: HOT }, 0, 1, 5.4)
      else drawBits(x, XMARK, { X: RED }, 0, 0, 6.4, { outline: null })
      x.restore()
    }
  }
  x.restore()
}

const BADGE_OCT = ['..RRRRRRRRRRRR..', '.RRRRRRRRRRRRRR.', 'RRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRR', '.RRRRRRRRRRRRRR.', '..RRRRRRRRRRRR..']
const BIG_HEART = ['..HHH...HHH..', '.HHHHH.HHHHH.', 'HHHHHHHHHHHHH', 'HHHHHHHHHHHHH', 'HHHHHHHHHHHHH', '.HHHHHHHHHHH.', '..HHHHHHHHH..', '...HHHHHHH...', '....HHHHH....', '.....HHH.....', '......H......']
/** the buzzer badge: a red "ICK?" octagon slams in at b (shaking), flips at f into a pink "CUTE" heart, holds to end */
function drawBadge(x, t, cx, cy, b, f, end) {
  if (t < b || t > end) return
  const o = outK(t, [end - 0.18, end])
  if (t < f) {
    const k = easeOutBack(prog(t, b, b + 0.16), 3)
    const fl = t > f - 0.12 ? (f - t) / 0.12 : 1
    const sh = 10 * Math.exp(-(t - b) * 5) * Math.sin((t - b) * 70)
    x.save(); x.translate(cx + sh, cy); x.rotate(-0.08 + 0.04 * Math.sin((t - b) * 50) * Math.exp(-(t - b) * 4)); x.scale(lerp(1.6, 1, k) * fl, lerp(1.6, 1, k))
    x.globalAlpha *= clamp(k * 3)
    drawBits(x, BADGE_OCT, { R: RED }, 0, 0, 16, { outline: INK })
    R(x, 'rgba(255,255,255,0.22)', -112, -70, 224, 12)
    x.font = `800 84px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillText('ICK?', 4, 10); x.fillStyle = BONE; x.fillText('ICK?', 0, 6)
    x.restore()
    // buzz rays
    const rk = 1 - prog(t, b, b + 0.4)
    if (rk > 0) for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.2, r0 = 170 + (1 - rk) * 60; x.save(); x.globalAlpha = rk; x.translate(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * 0.75); x.rotate(a); R(x, RED, -18, -5, 36, 10); x.restore() }
  } else {
    const fl = clamp((t - f) / 0.12)
    const beat = 1 + 0.06 * Math.max(0, Math.sin((t - f) * 9.5)) + 0.18 * Math.exp(-(t - f) * 7)
    x.save(); x.translate(cx, cy - 6 * Math.sin((t - f) * 3)); x.rotate(0.06); x.scale(fl * beat * o, beat * o)
    drawBits(x, BIG_HEART, { H: HOT }, 0, 6, 19, { outline: INK })
    R(x, 'rgba(255,255,255,0.35)', -88, -70, 30, 30)
    x.font = `800 62px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillText('CUTE', 3, -8); x.fillStyle = BONE; x.fillText('CUTE', 0, -12)
    x.restore()
    sparkles(x, t, cx, cy, f + 0.02, 10, 170, 0.4, [GOLD, BONE, PINK])
  }
}

// the caption sticker: a tilted bone sticker, numbered badge, Inter 800 + one *italic* accent
function buildSticker(root, { n, text, deep, badge, at, out, tilt }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1330px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '940px', padding: '18px 34px 20px 22px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrap)
  el('div', { flex: '0 0 auto', width: '74px', height: '74px', borderRadius: '50%', background: badge, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 40px ${INTER}`, color: INK }, st, String(n))
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

// the stamp imprint (DOM): "NOT AN ICK." in pink ink, a double border, tilted
function buildStamp(root, ink) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '200px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '20px 50px 28px', border: `12px solid ${ink}`, outline: `5px solid ${ink}`, outlineOffset: '10px', borderRadius: '10px', transform: 'rotate(-5deg)', transformOrigin: '50% 50%',
    font: `800 128px ${INTER}`, letterSpacing: '-0.02em', color: ink, lineHeight: '1', whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.03)', textShadow: '0 4px 18px rgba(6,4,18,0.6)' }, wrap,
    `NOT AN <span style="font:italic 500 168px ${SERIF};letter-spacing:0">ICK.</span>`)
  wrap.style.display = 'flex'
  const fitK = Math.min(1, 940 / Math.max(1, st.offsetWidth || 1))
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
// the rubber stamp itself (canvas): handle + block, slams down onto the imprint at T.stamp, then lifts away
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
  box(x, -110, -260, 220, 100, HOT, { b: 8, hi: '#ff9ab8' })
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeIck(cfg) {
  const THEM = signStar(cfg.them), ME = signStar(cfg.me), PIS = signStar('pisces')
  const SPEAK = `${ME.glyph}︎ ${cfg.meName}`
  const LINES = [{ t: T.last, speaker: SPEAK, color: cfg.meInk || ME.color, text: cfg.last }]
  const ME_FIN_HOPS = [T.stamp + 0.04, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const THEM_FIN_HOPS = [T.stamp + 0.1, T.stamp + 0.55, T.last + 1.7]
  const PIS_DEF = { x: 950, y: 1640, s: 120 }

  const them = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: THEM.color, glyph: o.s >= 150 ? THEM.glyph : null, seed: 3, glow: 1.1, ...o })
  const me = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: ME.color, glyph: o.s >= 150 ? ME.glyph : null, seed: 7, glow: 1, ...o })
  const themF = (t, o) => starFrame(o.x, o.y, o.s, t, { seed: 3, ...o })
  const meF = (t, o) => starFrame(o.x, o.y, o.s, t, { seed: 7, ...o })

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
      await Promise.all(["800 112px Inter", "800 84px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "italic 500 168px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hookText || 'Should be an *ick…* | but it’s *them.*', { top: 210, size: 92, accentSize: 128, at: T.h0, gap: 0.09, accentColor: cfg.accent || PINK, fit: true })
    const stickers = cfg.moments.map((m, i) => buildSticker(root, { n: i + 1, text: m.caption, deep: cfg.deep, badge: i === 2 ? PINK : (cfg.badge || THEM.color), at: T.moments[i][0] + (i === 2 ? 0.4 : 0.3), out: [T.moments[i][1] - 0.18, T.moments[i][1]], tilt: [-2.2, 1.8, -1.4][i] }))
    const stamp = buildStamp(root, cfg.stampInk || HOT)
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const redFlash = el('div', { position: 'absolute', inset: 0, boxShadow: `inset 0 0 0 26px ${RED}, inset 0 0 160px rgba(232,52,78,0.6)`, opacity: 0, pointerEvents: 'none' }, root)
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    function hook(t) {
      if (t > T.moments[0][0]) return
      const tk = pop01(t, T.themIn, 0.42, 2.3), mk = pop01(t, T.meIn, 0.42, 2.3)
      glowPool(x, 540, 1000, 520, clamp(tk))
      if (tk > 0.01) {
        shadow(x, 700, 1210, 240 * tk)
        them(x, t, { x: 700, y: 1000, s: 290, pop: tk, mood: 'happy', look: [0, 0], hops: [T.themIn + 0.35, T.swoon - 0.1, T.swoon + 0.35] })
      }
      if (mk > 0.01) {
        shadow(x, 320, 1220, 200 * mk)
        const mood = t < T.swoon ? 'neutral' : 'heart'
        me(x, t, { x: 320, y: 1040, s: 220, pop: mk, mood, look: [1, -0.4], hops: [T.meIn + 0.35, T.swoon] })
        hearts(x, t, T.swoon + 0.05, 320, 900, { n: 5 })
      }
      if (cfg.hook) cfg.hook(x, t, { them, me, themF, meF, tk, mk })
    }

    function finale(t) {
      if (t < T.stamp || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      glowPool(x, 540, 980, 560, ok)
      const S = { them, me, themF, meF, ok, ME_FIN_HOPS, THEM_FIN_HOPS }
      if (cfg.finale) cfg.finale(x, t, S)
      else {
        shadow(x, 360, 1150, 220 * ok); shadow(x, 700, 1160, 200 * ok)
        them(x, t, { x: 360, y: 940, s: 260, pop: ok, mood: 'happy', look: [1, 0], hops: THEM_FIN_HOPS })
        me(x, t, { x: 700, y: 960, s: 230, pop: ok, mood: 'heart', look: [-1, 0], hops: ME_FIN_HOPS })
      }
      hearts(x, t, T.stamp + 0.3, 540, 820, { n: 8, spread: 400, life: 2, rise: 260 })
      // Pisces: a puddle of happy tears behind a SO CUTE sign
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01) {
        const F = pisces(x, t, { x: 920, y: 1250, s: 140, pop: pk, hops: [T.pisIn + 0.3, T.sign + 0.02, T.sign + 0.6] }, t > T.sign ? 3 : 2, 'sparkle', [-1, -1])
        const ck = pop01(t, T.sign, 0.3, 2.6) * ok
        if (ck > 0.01) {
          x.save(); x.translate(900, F.cy - 150 - 8 * Math.sin(t * 5)); x.rotate(-0.08 * Math.sin(t * 4)); x.scale(ck, ck)
          box(x, -92, -46, 184, 92, BONE, { b: 6 }); R(x, INK, -6, 46, 12, 70)
          x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = HOT; x.fillText('SO CUTE', 0, 3)
          x.restore()
        }
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 2.3))
        const base = t < 2.3 ? { ...SKY_H, zoom: lerp(1.65, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
        drawSky(x, t, base)
        // camera shake from the buzzers and the stamp
        let shake = 0
        for (const b of [...BUZZ, T.stamp]) { const d = t - b; if (d > 0 && d < 0.45) shake += (b === T.stamp ? 18 : 10) * Math.exp(-d * 9) * Math.sin(d * 60) }
        x.save(); x.translate(shake * 0.6, shake)
        hook(t)
        cfg.moments.forEach((m, i) => {
          const a = T.moments[i][0], b = i === 2 ? T.stamp : T.moments[i][1]
          if (t < a || t >= b) return
          const punch = i === 2 ? 1 : 1 + 0.07 * (1 - ease.outCubic(prog(t, a, a + 0.28)))
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          const buzz = BUZZ[i], flip = FLIP[i]
          const meMood = tt => tt < buzz ? 'neutral' : tt < flip ? 'squint' : 'heart'
          m.draw(x, t, { u: t - a, t0: a, t1: b, buzz, flip, them, me, themF, meF, meMood, THEM, ME, i })
          x.restore()
          // Pisces in the background, sniffling more each moment
          const P = { ...PIS_DEF, ...(m.pis || {}) }
          const pk = pop01(t, a + 0.25, 0.3, 2) * outK(t, [b - 0.15, b])
          if (pk > 0.01) {
            if (!P.noTissues) tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
            pisces(x, t, { ...P, pop: pk }, t > flip ? (i === 2 ? 3 : 2) : 1, t > flip ? 'sparkle' : 'wide', P.look || [-1, -0.6])
          }
        })
        finale(t)
        x.restore()
        drawTally(x, t)
        // top layer: the buzzer badges and the stamp tool
        tx.clearRect(0, 0, 1080, 1920)
        cfg.moments.forEach((m, i) => {
          const bp = m.badge || { x: 790, y: 470 }
          drawBadge(tx, t, bp.x, bp.y, BUZZ[i], FLIP[i], i === 2 ? T.stampDrop[0] + 0.1 : T.moments[i][1])
        })
        tx.save(); tx.translate(0, shake); drawStampTool(tx, t, cfg.stampInk || HOT); tx.restore()
        sparkles(tx, t, 540, 330, T.stamp + 0.02, 14, 430, 1, [GOLD, BONE, PINK])
        H0.update(t, outK(t, T.h0Out))
        stickers.forEach(s => s.update(t))
        stamp.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        // white flash on the hard cuts (not the card cut); a red edge pulse on each buzz
        const fl = Math.max(0, ...[T.moments[0][0], T.moments[1][0]].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0), t >= T.stamp && t < T.stamp + 0.1 ? 0.6 * (1 - (t - T.stamp) / 0.1) : 0)
        flash.style.opacity = String(0.55 * fl)
        const rf = Math.max(0, ...BUZZ.map((b, i) => t >= b && t < FLIP[i] ? (0.75 + 0.25 * Math.sin((t - b) * 40)) * (1 - prog(t, FLIP[i] - 0.15, FLIP[i])) : 0))
        redFlash.style.opacity = String(0.7 * rf)
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate: under the swap into the twisted third moment
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine; the buzzer is unpitched on purpose)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const buzzer = b => [
    ['chip', b, 92.5, 0.46, { wave: 'square', duty: 0.5, gain: 0.03, decay: 0.5, sustain: 0.9, rev: 0.05, dly: 0 }],
    ['chip', b, 97.9, 0.46, { wave: 'saw', gain: 0.022, decay: 0.5, sustain: 0.9, rev: 0.05, dly: 0 }],
    ['tom', b, 70, { gain: 0.18, decay: 0.2 }], ['tick', b, 0.06],
  ]
  const cute = f => [
    ['whoosh', r3(f - 0.08), 0.22, 0.025], ['pop', f, 1174.66, 0.045, 0], ['pluck', r3(f + 0.06), 1479.98, 0.04, 0.6, 0.2],
    ['pluck', r3(f + 0.14), 1760, 0.035, 0.7, -0.2], ['bell', r3(f + 0.2), 2349.32, 0.022, 1.4, 0], ['glitter', r3(f + 0.02), r3(f + 0.45)],
  ]
  const CUES = [
    ...wordPops(T.h0, 7, 0.09, 0), ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.tally + 0.05, 0.03],
    ['pop', T.themIn + 0.05, 987.77, 0.045, 0.3], ['pop', T.meIn + 0.05, 739.99, 0.04, -0.3],
    ['pluck', T.swoon, 1567.98, 0.035, 0.6, -0.3], ['pluck', r3(T.swoon + 0.1), 1975.53, 0.03, 0.6, -0.3], ['glitter', T.swoon, r3(T.swoon + 0.4)],
    ...cfg.moments.flatMap((m, i) => {
      const a = T.moments[i][0], st = a + (i === 2 ? 0.4 : 0.3)
      return [
        ...(i < 2 ? [['whoosh', r3(a - 0.08), 0.28, 0.035], ['tick', a, 0.05]] : []),
        ['pop', r3(st), 1174.66, 0.045, 0.1], ['pop', r3(st + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(st + 0.02), 0.04],
        ...buzzer(BUZZ[i]), ...cute(FLIP[i]),
        ...(m.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    // the stamp
    ['whoosh', T.stampDrop[0], 0.32, 0.04], ['boom', T.stamp, 0.32], ['tom', T.stamp, 88, { gain: 0.3, decay: 0.3 }], ['tick', T.stamp, 0.08],
    ['bell', r3(T.stamp + 0.08), 1760, 0.03, 1.2, 0], ['glitter', r3(T.stamp + 0.05), r3(T.stamp + 0.55)], ['whoosh', r3(T.stamp + 0.2), 0.3, 0.02],
    ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
    ['pop', T.sign, 1318.51, 0.045, 0.4], ['pop', r3(T.sign + 0.08), 1760, 0.035, 0.4], ['glitter', T.sign, r3(T.sign + 0.3)],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
