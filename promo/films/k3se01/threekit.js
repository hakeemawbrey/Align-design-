// 3-SECOND ADVICE: the shared look of the Month 2 trial reels k3se01–k3se24 (promo/films/month2/m28.md).
// Lives in k3se01's folder; k3se02–k3se24 import it read-only. No end card, no card cut, no logo: the film ends on its
// last story frame (hard cut) or eases back into frame 0 (loop).
//
// The short format (8–11 s):
//   0.00        frame 0 = the thumbnail: the scene is already mid-chaos, the hook line is on screen, the bug is up,
//               Pisces sniffles in the corner (tissue box).
//   ~0.5        the pattern break: 'freeze' (record scratch + freeze frame, colour drains, frame brackets) or
//               'whip' (a whip zoom onto cfg.focus, then the frame holds). The scene stays frozen under the countdown.
//   T.c3/c2/c1  a giant 3 · 2 · 1 slams over the frozen frame (ring timer, shake, tick-tock).
//   T.fix       the advice: the scene unfreezes into its 'fix' phase, THE STARS' line slams in on a bone sticker.
//   end         'cut': the last gag lands and holds, hard cut. 'loop': the last LOOP_LEN s cross-fades into exactly the
//               frame-0 composition (hookkit's loop helper when available, else a straight world cross-fade).
//
//   makeThree(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.sign ('aries'…), cfg.hook ('Left on read. *Again.*'), cfg.advice ('…*accent*…'), cfg.dur (s)
//     cfg.brk 'freeze' | 'whip', cfg.focus [x, y] (whip target), cfg.ending 'cut' | 'loop'
//     cfg.scene(x, t, S)  draws the story into the world canvas. S = { phase: 'hook' | 'fix', u, t, hero, star, pisces,
//                         T, k } — u = seconds into the phase (hook phase: u = t, frozen during the countdown).
//     cfg.pis { x, y, s, look } | false (false: the scene draws Pisces itself)   cfg.cues: [[kind, t, ...]] (absolute)
//     cfg.music { style, key, seed }   cfg.adviceTop (px, default 1250)   cfg.accent (hook accent colour)
// Everything is a pure function of t; DOM and canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, signStar, STAR } from '../startalk.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, countdown, countdownCues, loopBack, loopCues } from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ffd34d'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, el }
export const W = 1080, H = 1920

// ── drawing helpers (pixel-chunky, ink outlines)
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
export const NOTE_BM = ['..XXX', '..X.X', '..X..', 'XXX..', 'XXX..']
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, rise = 200, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * rise
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** hearts that are always in the air (periodic), for frame-0 chaos */
export function heartLoop(x, t, cx, cy, { n = 6, cell = 6, spread = 220, rise = 260, rate = 0.7, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const p = ((t * rate + i / n) % 1 + 1) % 1
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 12, hy = cy - p * rise
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
/** confetti that is always falling (periodic), for frame-0 chaos */
export function confettiRain(x, t, { n = 40, cols = [GOLD, PINK, SKYB, MINT, BONE], y0 = 380, y1 = 1300 } = {}) {
  for (let i = 0; i < n; i++) {
    const sp = 0.35 + (i * 37 % 10) / 25, p = ((t * sp + i * 0.137) % 1 + 1) % 1
    const px = ((i * 211) % 1000) + 40 + Math.sin(t * 2 + i) * 20, py = lerp(y0, y1, p)
    const sz = 12 + (i % 3) * 4
    x.save(); x.translate(px, py); x.rotate(t * (3 + i % 4) + i); x.fillStyle = cols[i % cols.length]; x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
}
/** a pixel speech bubble, popping at t0 (k forced if given), fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, k: kf = null, tailUp = false } = {}) {
  const k = kf ?? (pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1]))
  if (k <= 0.01 || (kf == null && t < t0)) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  if (tailUp) { x.fillStyle = INK; x.fillRect(tx - 14, -h / 2 - 16, 14, 12); x.fillRect(tx - 7, -h / 2 - 22, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, -h / 2 - 9, 9, 9) }
  else { x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9) }
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
/** comic speed lines radiating from (cx, cy) (periodic flicker) */
export function speedLines(x, t, cx, cy, { n = 26, r0 = 260, r1 = 900, col = 'rgba(239,230,214,0.5)', w = 8 } = {}) {
  x.save(); x.fillStyle = col
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + 0.13 * Math.sin(i * 7.1), jit = 40 * Math.sin(t * 30 + i * 3.7)
    x.save(); x.translate(cx, cy); x.rotate(a); x.fillRect(r0 + jit, -w / 2, (r1 - r0) * (0.5 + 0.5 * Math.abs(Math.sin(i * 1.7))), w); x.restore()
  }
  x.restore()
}
/** motion streaks behind a moving thing (dir: unit vector of travel) */
export function streaks(x, cx, cy, dir, { n = 4, len = 120, gap = 34, col = 'rgba(239,230,214,0.55)', w = 10 } = {}) {
  x.save(); x.fillStyle = col
  for (let i = 0; i < n; i++) {
    const off = (i - (n - 1) / 2) * gap
    const px = cx - dir[0] * (60 + i * 18) - dir[1] * off, py = cy - dir[1] * (60 + i * 18) + dir[0] * off
    x.save(); x.translate(px, py); x.rotate(Math.atan2(dir[1], dir[0])); x.fillRect(-len, -w / 2, len * (0.6 + 0.4 * ((i * 3) % 2)), w); x.restore()
  }
  x.restore()
}
/** a pixel puff cloud (dust) */
export function puff(x, cx, cy, s, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  for (const [dx, dy, r] of [[-0.6, 0.1, 0.42], [0, -0.15, 0.55], [0.6, 0.08, 0.45], [-0.25, 0.3, 0.4], [0.3, 0.32, 0.38]]) {
    x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s, cy + dy * s, r * s + 6, 0, Math.PI * 2); x.fill()
  }
  for (const [dx, dy, r] of [[-0.6, 0.1, 0.42], [0, -0.15, 0.55], [0.6, 0.08, 0.45], [-0.25, 0.3, 0.4], [0.3, 0.32, 0.38]]) {
    x.fillStyle = '#d9cfe8'; x.beginPath(); x.arc(cx + dx * s, cy + dy * s, r * s, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
/** a chunky phone (screen fn draws inside a 0,0 → sw,sh screen box) */
export function phone(x, cx, cy, { w = 300, h = 540, rot = 0, sc = 1, col = '#2a2148', screen = '#14102a', draw = null } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
  box(x, -w / 2, -h / 2, w, h, col, { b: 8 })
  R(x, screen, -w / 2 + 16, -h / 2 + 34, w - 32, h - 68)
  R(x, '#0c0920', -24, -h / 2 + 12, 48, 10)
  if (draw) { x.save(); x.translate(-w / 2 + 16, -h / 2 + 34); x.beginPath(); x.rect(0, 0, w - 32, h - 68); x.clip(); draw(x, w - 32, h - 68); x.restore() }
  x.restore()
}
/** a chat bubble inside a phone screen (left = theirs, right = yours) */
export function chat(x, sw, y, text, { mine = false, size = 26, col = null, k = 1, maxW = null } = {}) {
  if (k <= 0.01) return 0
  x.save(); x.font = `700 ${size}px ${INTER}`
  const tw = Math.min(x.measureText(text).width, maxW ?? sw - 70), bw = tw + 34, bh = size + 26
  const bx = mine ? sw - 16 - bw : 16
  x.translate(bx + bw / 2, y + bh / 2); x.scale(k, k)
  R(x, col || (mine ? '#4f7cd8' : '#3a3358'), -bw / 2, -bh / 2, bw, bh)
  R(x, col || (mine ? '#4f7cd8' : '#3a3358'), mine ? bw / 2 - 14 : -bw / 2, bh / 2 - 4, 14, 10)
  x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 1, maxW ?? sw - 70)
  x.restore()
  return bh
}
/** a tiny pixel clock badge "2:07" */
export function clockBadge(x, cx, cy, txt, { col = RED, size = 40 } = {}) {
  x.save(); x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(txt).width + 36
  box(x, cx - w / 2, cy - size * 0.75, w, size * 1.5, '#120c26', { b: 6 })
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, cx, cy + 2)
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
/** a tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** a star character by sign id (+ optional tears 1–3) */
export function star(x, t, id, o = {}) {
  const S = id === 'stars' ? { color: STAR.sky, glyph: null } : signStar(id)
  const opts = { color: S.color, glyph: o.s >= 150 && o.glyph !== false ? S.glyph : null, seed: o.seed ?? 3, glow: o.glow ?? 1, ...o }
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  const F = starFrame(o.x, o.y, o.s, t, opts)
  if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
  return F
}

// ── the bug: "3-SECOND ADVICE" in Inter 800 small caps, letter-spaced, top-left, with a tiny timer dial
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '22px', height: '22px', borderRadius: '50%', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,211,77,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, '3-SECOND<span style="color:rgba(255,255,255,0.65)">&nbsp;ADVICE</span>')
  return b
}

// ── the advice sticker: THE STARS tab + a bone card, Inter 800 with one *serif italic* accent
export function buildAdvice(root, text, { top = 1250, size = 60, accent = '#b0306a' } = {}) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const col = el('div', { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '960px', transformOrigin: '50% 40%' }, wrap)
  const tab = el('div', { display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 20px 10px', marginLeft: '26px', background: GOLD, border: `5px solid ${INK}`, borderBottom: 'none', borderRadius: '10px 10px 0 0',
    font: `800 26px ${INTER}`, letterSpacing: '0.16em', color: INK }, col, '★ THE STARS SAY')
  void tab
  const html = text.replace(/\s*\|\s*/g, '<br>').replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${Math.round(size * 1.3)}px ${SERIF};color:${accent};letter-spacing:0">$1</span>`)
  el('div', { padding: '22px 36px 26px', background: BONE, border: `6px solid ${INK}`, borderRadius: '16px', boxShadow: '12px 12px 0 rgba(6,4,18,0.75)',
    font: `800 ${size}px ${INTER}`, lineHeight: '1.1', color: INK, letterSpacing: '-0.01em', textAlign: 'left' }, col, html)
  return {
    update(t, at, out = 1) {
      const on = t >= at && out > 0
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, at, at + 0.16), d = t - at
      const sc = lerp(1.7, 1, ease.outCubic(p)) * (1 + 0.035 * Math.exp(-d * 7) * Math.sin(d * 38))
      col.style.opacity = String(clamp(p * 2.5) * out)
      col.style.transform = `scale(${(sc * lerp(0.92, 1, out)).toFixed(4)}) rotate(${(-1.6 + 1.2 * Math.exp(-d * 5) * Math.sin(d * 20)).toFixed(2)}deg)`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the short episode
// Built on the shared hook kit: slamTitle (the hook, landed on frame 0), recordScratch or whipZoom (the break),
// frozen() (the story holds under the countdown), countdown (3 · 2 · 1), whipZoom (the advice punch), loopBack.
export function makeThree(cfg) {
  const DURATION = cfg.dur
  const T = { brk: cfg.freezeAt ?? 0.5, c3: cfg.c3 ?? 0.95, fix: cfg.fixAt ?? 2.45, ...(cfg.T || {}) }
  const GAP = r3((T.fix - T.c3) / 3)
  const HERO = cfg.sign
  const PIS = cfg.pis === false ? null : { x: 920, y: 1680, s: 175, look: [-1, -0.7], ...(cfg.pis || {}) }
  const loop = cfg.ending === 'loop'
  const fc = cfg.focus || [540, 860]

  // hook-kit option objects (the same object feeds the picture and the sound)
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop ?? 215, size: cfg.hookSize ?? 92, accentColor: cfg.accent || GOLD, width: 960 }
  const FREEZE = { at: T.brk, len: r3(T.fix - T.brk) }
  const REC = { ...FREEZE, caption: cfg.caption ?? 'ok. *3 seconds.*', top: cfg.captionTop ?? 1490, sat: 0.15 }
  const WHIP = { at: T.brk, len: 0.42, from: cfg.whipFrom ?? 1.9, to: 1, cx: fc[0], cy: fc[1] }
  const CD = { at: T.c3, from: 3, gap: GAP, go: null, y: cfg.cdY ?? 830, color: GOLD }
  const PUNCH = { at: T.fix, len: 0.4, from: 1.35, to: 1, cx: 540, cy: cfg.punchY ?? 1000, lines: false, flash: 0.45 }
  const hero = (x, t, o = {}) => star(x, t, HERO, { seed: 3, glow: 1.1, ...o })

  // t is already frozen by frozen() during [brk, fix)
  const phaseOf = t => t < T.fix ? { phase: 'hook', u: Math.min(t, T.brk) } : { phase: 'fix', u: t - T.fix }

  async function build(stage) {
    try {
      await Promise.all(["800 60px Inter", "800 28px Inter", "italic 500 78px 'EB Garamond'", "700 40px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const ph = phaseOf(t)
        drawSky(x, t, SKY_H)
        cfg.scene(x, t, { phase: ph.phase, u: ph.u, t, hero, star, T })
        if (PIS) {
          const tears = ph.phase === 'fix' ? 3 : 2
          tissues(x, PIS.x - PIS.s * 0.78, PIS.y + PIS.s * 0.22, PIS.s * 0.52)
          star(x, t, 'pisces', { x: PIS.x, y: PIS.y, s: PIS.s, mood: ph.phase === 'fix' ? 'sparkle' : 'wide', look: PIS.look, seed: 6, glow: 0.8, tips: false, tears, hops: ph.phase === 'fix' ? [T.fix + 0.1, T.fix + 0.5] : null })
        }
        drawGrain(gx, t)
      },
    }
  }
  // the UI (bug + advice): its own scene layer, outside the camera
  async function buildUI(stage) {
    try { await Promise.all(["800 60px Inter", "800 28px Inter", "italic 500 78px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const ui = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none' }, stage)
    ui.dataset.hookcam = 'off'
    const adv = buildAdvice(ui, cfg.advice, { top: cfg.adviceTop ?? 1250, size: cfg.adviceSize ?? 60, accent: cfg.adviceAccent ?? '#b0306a' })
    const bug = buildBug(ui)
    return {
      start: 0, end: DURATION + 0.01, root: ui,
      update(t) {
        adv.update(t, T.fix)
        // the scratch overlay has its own PAUSED tag top-left: the bug steps aside while it shows
        bug.style.opacity = cfg.brk === 'freeze' && t >= T.brk && t < T.fix ? '0' : '1'
      },
    }
  }

  const loopBuilders = [build, buildUI, slamTitle(HOOK)]
  const SCENES = [
    frozen(build, [FREEZE]),
    buildUI,
    ...(cfg.brk === 'whip' ? [whipZoom(WHIP)] : [recordScratch(REC)]),
    slamTitle(HOOK),
    countdown(CD),
    whipZoom(PUNCH),
    ...(cfg.extra || []),
    ...(loop ? [loopBack(loopBuilders, { duration: DURATION, len: 0.45 })] : []),
  ]
  const CUES = [
    ...(cfg.brk === 'whip' ? whipZoomCues(WHIP) : recordScratchCues(REC)),
    ...slamTitleCues(HOOK),
    ...countdownCues(CD),
    ['boom', T.fix, 0.3], ['crash', T.fix, { gain: 0.08 }], ['bell', r3(T.fix + 0.04), 1760, 0.035, 1.1, 0], ['glitter', r3(T.fix + 0.02), r3(T.fix + 0.5)],
    ['pop', r3(T.fix + 0.12), 1174.66, 0.04, 0.2], ['pop', r3(T.fix + 0.6), 987.77, 0.03, 0.4],
    ...(cfg.cues || []),
    ...(loop ? loopCues({ duration: DURATION, len: 0.45 }) : []),
  ]
  return { DURATION, SCENES, CUES, T }
}
