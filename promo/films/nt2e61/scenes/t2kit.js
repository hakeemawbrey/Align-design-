// t2kit: the shared engine of Star Talk Trends, Volume 2, episodes 61–80 (batch b14, promo/films/next30/b14.md).
// Four formats use it, each through its own module: nt2e61/scenes/house.js (IN THIS HOUSE), nt2e66/scenes/twist.js
// (PLOT TWIST), nt2e71/scenes/weather.js (IF THE SIGNS WERE WEATHER) and nt2e76/scenes/treat.js (LITTLE TREAT).
// Adapted from the Vol. 1 tell kit (promo/films/trtellleo/scenes/tellkit.js), with a live frame 0.
//
// The film (20 s; story 0–15.6, then the shared end card):
//   0.00–2.10   hook: the bold top caption is already up at t = 0 and the hero is mid-action (frame 0 = thumbnail).
//   2.10–10.95  three beats (rule of three, the third twisted), each a jump cut with a caption sticker. One card cut.
//   10.95–15.5  the optional stamp slams; THE STARS say the last line; Pisces is moved (happy-tear fountains).
//   Pisces cries somewhere in the background of every beat (the running gag).
//
//   makeT2(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.id, cfg.sign, cfg.name, cfg.date (sign id), cfg.deep (sticker accent ink), cfg.accent (headline accent)
//     cfg.bug: [bright, dim]  the format bug text (pink + white 60%)
//     cfg.hookText  popText string ('*word*' accent, '|' line break)   cfg.hookTop / hookSize / hookAccent
//     cfg.bg(x, t, S)  background (default: the night sky). S = { phase: 'hook' | 'tell' | 'finale', i, u }
//     cfg.hook(x, t, S)  the hook drawing (the hero mid-action). Default: the hero hopping.
//     cfg.tells: [{ caption, draw(x, t, S), cues, pis, stickerAt, badge, punch }] × 3
//     cfg.stamp: inner html of the stamp, or null for none.  cfg.score: Pisces' card text (default '10/10')
//     cfg.finale(x, t, S)  the finale cast.   cfg.dom(root, api) → { update(t) }  extra DOM on top.
//     cfg.overlay(x, t)  extra drawing on the top canvas.  cfg.cut: the card-cut time (default 7.6).
//     cfg.flashes: hard-cut flash times (default the starts of beats 1 and 2).   cfg.cues: extra sound cues.
//     cfg.last: THE STARS' last line.
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
export { el, popText, drawSky, layerCanvas, SKY_H }

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

// ── the fixed timeline (same in all twenty films). Frame 0 is the thumbnail: the hook caption and the hero are already
//    on screen at t = 0 (no fade from black); the hero is mid-action from the first frame.
export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
export const T = {
  bug: -1, bar: -1,
  h0: -1.6, h0Out: [10.85, 11.05],
  heroIn: -1, wink: 1.15,
  tells: [[2.1, 4.85], [4.85, 7.6], [7.6, 10.95]],
  cut: 7.6,
  stampDrop: [11.0, 11.32], stamp: 11.35, starsIn: 11.5, pisIn: 11.6, score: 12.4,
  last: 11.95, boxClose: 15.1,
  out: [15.1, 15.5], bugOut: [15.2, 15.5],
}
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

// ── the format bug: Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root, at, [main, dim = ''], plate = false) {
  const b = el('div', { position: 'absolute', left: plate ? '42px' : '56px', top: plate ? '48px' : '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none',
    ...(plate ? { background: 'rgba(16,9,38,0.72)', padding: '4px 16px', borderRadius: '10px' } : {}) }, root)
  el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  const nb = s => s.replace(/ /g, '&nbsp;')
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    nb(main) + (dim ? `<span style="color:rgba(255,255,255,0.6)">&nbsp;${nb(dim)}</span>` : ''))
  return {
    update(t, out = 1) {
      const k = (t < at + 0.36 ? pop01(t, at, 0.36, 2.2) : 1) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
      b.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── the caption sticker: a tilted bone sticker, a badge, Inter 800 + one *italic* accent
export function buildSticker(root, { badge, text, deep, badgeCol, at, out, tilt, top = 1330, size = 50 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '960px', padding: '18px 34px 20px 22px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrap)
  if (badge !== null) el('div', { flex: '0 0 auto', minWidth: '74px', height: '74px', padding: '0 10px', boxSizing: 'border-box', borderRadius: '37px', background: badgeCol, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 ${String(badge).length > 2 ? 30 : 40}px ${INTER}`, color: INK }, st, String(badge))
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${Math.round(size * 1.28)}px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 ${size}px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
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

// ── the stamp imprint (DOM): a double border, tilted, slammed at T.stamp
function buildStamp(root, { html, ink }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '190px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '22px 54px 30px', border: `12px solid ${ink}`, outline: `5px solid ${ink}`, outlineOffset: '10px', borderRadius: '10px', transform: 'rotate(-6deg)', transformOrigin: '50% 50%',
    font: `800 120px ${INTER}`, letterSpacing: '-0.02em', color: ink, lineHeight: '1', whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.03)', textShadow: '0 4px 18px rgba(6,4,18,0.6)' }, wrap,
    html.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 150px ${SERIF};letter-spacing:0">$1</span>`))
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
      st.style.transform = `rotate(-6deg) scale(${(sc * fitK * Math.max(0.01, o)).toFixed(4)})`
    },
  }
}

// the rubber stamp itself (canvas): slams down onto the imprint at T.stamp, then lifts away
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

// ── the fake progress bar: 4 segments (three beats + the finale) under the bug
const SEGS = [[2.1, 4.85], [4.85, 7.6], [7.6, 10.95], [10.95, 15.1]]
function drawBar(x, t, col) {
  const k = outK(t, T.out)
  if (k <= 0.01) return
  const X0 = 56, X1 = 980, GAP = 10, n = SEGS.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120, Hh = 8
  x.save(); x.globalAlpha = clamp(k)
  SEGS.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.25)', sx, Y, w, Hh)
    const f = i === 0 ? Math.max(0.12, prog(t, 0, b)) : prog(t, a, b)
    if (f > 0) R(x, i === 3 ? col : BONE, sx, Y, w * f, Hh)
  })
  x.restore()
}

// a little tissue box (Pisces' prop)
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeT2(cfg) {
  const HERO = signStar(cfg.sign), PIS = signStar('pisces'), DATE = signStar(cfg.date || 'libra')
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const HERO_HOOK_HOPS = cfg.hookHops || [0.25, 0.85, T.wink - 0.05, 1.7]
  const HERO_FIN_HOPS = [T.stamp + 0.04, T.stamp + 0.5, T.last + 1.6]
  const PIS_DEF = { x: 940, y: 1650, s: 130 }
  const CUT = cfg.cut ?? T.cut
  const FLASHES = cfg.flashes || [T.tells[0][0], T.tells[1][0]]

  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const date = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: DATE.color, glyph: o.s >= 150 ? DATE.glyph : null, seed: 7, glow: 1, ...o })
  const star = (id, x, t, o = {}) => { const S = signStar(id); return drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: o.s >= 150 ? S.glyph : null, seed: 5, glow: 1, ...o }) }
  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  const api = { hero, date, star, pisces, HERO, DATE, PIS }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hookText, { top: cfg.hookTop ?? 158, size: cfg.hookSize ?? 78, accentSize: cfg.hookAccent ?? 112, at: T.h0, gap: 0.04, accentColor: cfg.accent || HERO.color, color: cfg.hookColor || BONE, fit: true })
    if (cfg.hookShadow !== undefined) H0.root.style.textShadow = cfg.hookShadow
    const stickers = cfg.tells.map((tl, i) => buildSticker(root, { badge: tl.badge !== undefined ? tl.badge : (cfg.badges ? cfg.badges[i] : i + 1), text: tl.caption, deep: cfg.deep, badgeCol: i === 2 ? PINK : (cfg.badge || HERO.color),
      at: T.tells[i][0] + (tl.stickerAt ?? (i === 2 ? 0.55 : 0.35)), out: [T.tells[i][1] - 0.18, T.tells[i][1]], tilt: [-2.2, 1.8, -1.4][i], top: tl.stickerTop ?? cfg.stickerTop ?? 1330, size: tl.stickerSize ?? 50 }))
    const stamp = cfg.stamp ? buildStamp(root, { html: cfg.stamp, ink: cfg.stampInk || RED }) : null
    const top = layerCanvas(root), tx = top.getContext('2d')
    const extra = cfg.dom ? cfg.dom(root, { ...api, T }) : null
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, T.bug, cfg.bug, cfg.bugPlate)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function hook(t) {
      if (t > T.tells[0][0]) return
      if (cfg.hook) { cfg.hook(x, t, { ...api, k: 1, HOPS: HERO_HOOK_HOPS }); return }
      const mood = t > T.wink && t < T.wink + 0.5 ? 'wink' : (cfg.hookMood || 'happy')
      shadow(x, 540, 1150, 260)
      hero(x, t, { x: 540, y: 930, s: 330, mood, look: [0, 0], hops: HERO_HOOK_HOPS })
    }

    function finale(t) {
      if (t < T.stamp || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const S = { ...api, ok, HERO_FIN_HOPS }
      if (cfg.finale) cfg.finale(x, t, S)
      else {
        shadow(x, 540, 1060, 240 * ok)
        hero(x, t, { x: 540, y: 860, s: 290, pop: ok, mood: t > T.stamp + 0.15 ? 'sparkle' : 'wide', look: [0, 0], hops: HERO_FIN_HOPS })
      }
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) drawStarChar(x, 190, 1220, 170, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
      if (cfg.noFinalePisces) return
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01) {
        const F = pisces(x, t, { x: 890, y: 1225, s: 160, pop: pk, hops: [T.pisIn + 0.3, T.score + 0.02, T.score + 0.6] }, t > T.score ? 3 : 2, 'sparkle', [-1, -1])
        const ck = pop01(t, T.score, 0.3, 2.6) * ok
        if (ck > 0.01) {
          const txt = cfg.score || '10/10'
          x.save(); x.translate(890 + 4, F.cy - 150 - 8 * Math.sin(t * 5)); x.rotate(0.08 * Math.sin(t * 4)); x.scale(ck, ck)
          x.font = `800 ${txt.length > 6 ? 40 : 52}px ${INTER}`
          const w = Math.max(156, x.measureText(txt).width + 40)
          box(x, -w / 2, -50, w, 100, BONE, { b: 6 }); R(x, INK, -6, 50, 12, 70)
          x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText(txt, 0, 4)
          x.restore()
        }
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const phase = t < T.tells[0][0] ? 'hook' : t < T.stamp ? 'tell' : 'finale'
        const ti = phase === 'tell' ? (t < T.tells[1][0] ? 0 : t < T.tells[2][0] ? 1 : 2) : -1
        const S0 = { phase, i: ti, u: ti >= 0 ? t - T.tells[ti][0] : t }
        if (cfg.bg) cfg.bg(x, t, S0)
        else drawSky(x, t, t < 2.5 ? { ...SKY_H, zoom: lerp(1.65, SKY_H.zoom, ease.inOutCubic(prog(t, 0, 2.5))), dy: lerp(-30, 0, ease.inOutCubic(prog(t, 0, 2.5))) } : SKY_H)
        const dS = t - T.stamp, shake = cfg.stamp && dS > 0 && dS < 0.45 ? 18 * Math.exp(-dS * 9) * Math.sin(dS * 60) : 0
        x.save(); x.translate(0, shake)
        hook(t)
        cfg.tells.forEach((tl, i) => {
          const a = T.tells[i][0], b = i === 2 ? T.stamp : T.tells[i][1]
          if (t < a || t >= b) return
          const punch = tl.punch === false ? 1 : (i === 2 ? 1 : 1 + 0.07 * (1 - ease.outCubic(prog(t, a, a + 0.28))))
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          tl.draw(x, t, { ...api, u: t - a, t0: a, t1: b, i })
          x.restore()
          const P = { ...PIS_DEF, ...(tl.pis || {}) }
          if (P.none) return
          const pk = pop01(t, a + 0.25, 0.3, 2) * outK(t, [b - 0.15, b])
          if (pk > 0.01) {
            if (!P.noTissues) tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
            pisces(x, t, { ...P, pop: pk }, P.tears ?? (i === 2 ? 2 : 1), P.mood ?? (i === 2 ? 'sparkle' : 'wide'), P.look || [-1, -0.6])
          }
        })
        finale(t)
        x.restore()
        drawBar(x, t, BUG_PINK)
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.stamp) { tx.save(); tx.translate(0, shake); drawStampTool(tx, t, cfg.stampInk || RED); tx.restore(); sparkles(tx, t, 540, 330, T.stamp + 0.02, 14, 430, 1, [GOLD, BONE, PINK]) }
        if (cfg.overlay) cfg.overlay(tx, t, { ...api, phase, i: ti })
        H0.update(t, outK(t, T.h0Out) * (cfg.hookOut ? cfg.hookOut(t) : 1))
        stickers.forEach(s => s.update(t))
        if (stamp) stamp.update(t)
        if (extra) extra.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = Math.max(0, ...FLASHES.map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0), cfg.stamp && t >= T.stamp && t < T.stamp + 0.1 ? 0.6 * (1 - (t - T.stamp) / 0.1) : 0)
        flash.style.opacity = String(0.55 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: CUT, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ['pop', 0.05, 987.77, 0.03, 0], ['pluck', T.wink, 1567.98, 0.03, 0.4, 0.2], ['glitter', 0.1, 0.5],
    ...(cfg.hookCues || []),
    ...cfg.tells.flatMap((tl, i) => {
      const a = T.tells[i][0], st = a + (tl.stickerAt ?? (i === 2 ? 0.55 : 0.35))
      return [
        ...(FLASHES.some(f => Math.abs(f - a) < 1e-6) ? [['whoosh', r3(a - 0.08), 0.28, 0.035], ['tick', a, 0.05]] : []),
        ['pop', r3(st), 1174.66, 0.045, 0.1], ['pop', r3(st + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(st + 0.02), 0.04],
        ['pluck', r3(a + 0.3), 2349.32, 0.012, 0.3, 0.6],
        ...(tl.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    ...(cfg.stamp ? [['whoosh', T.stampDrop[0], 0.32, 0.04], ['boom', T.stamp, 0.32], ['tom', T.stamp, 88, { gain: 0.3, decay: 0.3 }], ['tick', T.stamp, 0.08],
      ['bell', r3(T.stamp + 0.08), 1760, 0.03, 1.2, 0], ['glitter', r3(T.stamp + 0.05), r3(T.stamp + 0.55)]] : [['bell', T.stamp, 1760, 0.028, 1.2, 0], ['glitter', T.stamp, r3(T.stamp + 0.5)]]),
    ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
    ['pop', T.score, 1318.51, 0.045, 0.4], ['pop', r3(T.score + 0.08), 1760, 0.035, 0.4], ['glitter', T.score, r3(T.score + 0.3)],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  void NOTE
  return { DURATION, SCENES, CUES, T, CUTS }
}
