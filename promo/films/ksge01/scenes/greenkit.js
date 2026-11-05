// SPOT THE GREEN FLAG: the shared look of the Month 2 trial reels ksge01–ksge24 (promo/films/month2/m32.md).
// Every film in the batch imports this module read-only from ksge01. No end card, no card cut, no logo.
//
// The format: ONE sign, TWO takes of the same moment, side by side. Take A (left) and Take B (right) play the same
// relatable situation two ways; a 3-2-1 timer lands on the centre divider; then the reveal: a pixel green flag slams
// into the winning take with a ding and the other take drains to grey. Same sign in both takes, so the joke is on the
// behaviour, never on a sign. Pisces judges from a little facecam under the divider and cries in every film.
// THE STARS say the last line in the dialogue box. Endings: a hard cut on the line, or a loop that rewinds every
// layer back into the exact frame-0 composition.
//
//   makeGreen(cfg) → { DURATION, SCENES, CUES, T }       (short, ≈ 9–11 s)
//     cfg.id, cfg.sign ('aries'…), cfg.name ('Aries'), cfg.hook ('SAME *ARIES.* ONE GREEN FLAG.')
//     cfg.premise ('They’re running *20 minutes* late.'), cfg.win: 'A' | 'B' | 'both', cfg.last (THE STARS)
//     cfg.ending: 'cut' | 'loop', cfg.you: colour of the "you" star (default lavender)
//     cfg.takes: { A: { draw(x, tk, S), bg }, B: { ... } }   draw() paints in panel-local px (0…PW, 0…PH), clipped.
//        S = { side, tk (take time), t (film time), f0, f1 (this side's focus window), PW, PH, hero(), you(), date(),
//              bubble(), won (0…1 after the reveal for the winner), lost (0…1 for the other side) }
//     cfg.cues: extra cue list (film time). cfg.verdict: the top banner after the reveal (default from win).
//   Helpers for the take drawings are exported below (R, box, drawBits, pbubble, label, shadow, sparkles, hearts …).
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR, lineTimes } from '../../startalk.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, countdown, countdownCues,
  screenShake, shakeCues, loopBack, loopCues } from '../../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const GREEN = '#5fe08a', GREEN_D = '#1f8a4c', GREEN_L = '#b8f5c9', SKYB = '#7fd0ff', YOU = '#b9a8ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── layout (1080 × 1920)
export const PW = 504, PH = 860, SET_K = 1.12      // takes are drawn on a 504 × 770 set, scaled ×1.12 into the panel
export const PANEL = { A: { x: 24, y: 420 }, B: { x: 552, y: 420 } }
export const FLOOR = 600                        // panel-local floor line used by most sets
export const CAM = { x: 540, y: 1424, w: 360, h: 220 }  // Pisces' judge cam (centre)
const TIMER = { x: 540, y: 815, r: 104 }

// ── drawing helpers (panel-local or global; all pure)
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
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 5, spread = 110, life = 1.4, rise = 180, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 8, hy = cy - p * rise
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.0, v0 = 480, cols = [GREEN, GOLD, PINK, SKYB, BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = v0 + 240 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 12, py = cy + Math.sin(a) * v * tt + 620 * tt * tt
    const sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble on canvas; text may hold '\n' line breaks; pops at t0, fades by t1 */
export function pbubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 28, tail = 0, tailUp = false, font = INTER, weight = 800, maxW = 420 } = {}) {
  const k = pop01(t, t0, 0.24, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  const lines = String(text).split('\n')
  x.save(); x.font = `${weight} ${size}px ${font}`
  const tw = Math.max(...lines.map(s => x.measureText(s).width))
  const fit = Math.min(1, (maxW - 40) / tw)
  const w = tw * fit + 40, lh = size * 1.18 * fit, h = lh * lines.length + 26
  const X = clamp(cx, w / 2 + 36, PW - w / 2 - 36)
  x.translate(X, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = clamp(tail * (w / 2 - 30) + (cx - X), -w / 2 + 20, w / 2 - 20)
  if (tailUp) { x.fillStyle = INK; x.fillRect(tx - 14, -h / 2 - 16, 14, 12); x.fillRect(tx - 7, -h / 2 - 22, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, -h / 2 - 9, 9, 9) }
  else { x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9) }
  x.font = `${weight} ${Math.round(size * fit)}px ${font}`
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((s, i) => x.fillText(s, 0, 2 + (i - (lines.length - 1) / 2) * lh))
  x.restore()
}
export function label(x, text, cx, cy, { size = 26, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha *= a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** motion lines (speed streaks) behind something moving along dir */
export function streaks(x, t, cx, cy, { n = 5, len = 90, dir = -1, col = 'rgba(239,230,214,0.6)', gap = 26 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = (t * 3 + i * 0.37) % 1
    R(x, col, cx + dir * (40 + ph * 60) - (dir < 0 ? len : 0), cy - (n / 2) * gap + i * gap, len * (1 - ph * 0.5), 6)
  }
}
/** sweat drop pixels */
export function sweat(x, t, cx, cy, s = 1) {
  const ph = (t * 1.4) % 1
  drawBits(x, ['.S.', 'SSS', 'SWS', '.S.'], { S: '#8fe3ff', W: '#ffffff' }, cx, cy + ph * 24 * s, 5 * s, { alpha: 1 - ph * 0.6 })
}

// ── sets: quick reusable backdrops for the takes (panel-local)
export function room(x, { wall = '#3a2d66', wall2 = '#33285c', floor = '#2a2148', line = FLOOR } = {}) {
  R(x, wall, 0, 0, PW, line); for (let i = 0; i < PW; i += 56) R(x, wall2, i, 0, 28, line)
  R(x, INK, 0, line - 6, PW, 10); R(x, floor, 0, line + 4, PW, PH - line)
  for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.05)', i * 96 - 20, line + 40 + (i % 2) * 40, 70, 8)
}
export function nightStreet(x, t, { sky = '#1c1640', ground = '#2a2148', line = FLOOR } = {}) {
  R(x, sky, 0, 0, PW, line)
  for (let i = 0; i < 18; i++) { const a = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + i * 2.1)); R(x, `rgba(239,230,214,${0.5 * a})`, (i * 97) % PW, (i * 53) % (line - 260), 4, 4) }
  for (let i = 0; i < 4; i++) { const bx = i * 140 - 20, bh = 220 + (i % 2) * 80; box(x, bx, line - bh, 120, bh, '#2d2456', { b: 4 }); for (let j = 0; j < 3; j++) R(x, j % 2 ? '#f2c75c' : '#5a4c8c', bx + 24 + j * 30, line - bh + 40, 16, 22) }
  R(x, INK, 0, line - 6, PW, 10); R(x, ground, 0, line + 4, PW, PH - line)
}
export function table(x, cx, top, w = 300, col = '#7b5634') {
  box(x, cx - w / 2, top, w, 26, col, { b: 6, hi: '#98704a' })
  R(x, INK, cx - w / 2 + 24, top + 30, 16, FLOOR - top - 24); R(x, INK, cx + w / 2 - 40, top + 30, 16, FLOOR - top - 24)
}
/** a pixel phone, centred; screen(x, w, h) paints inside the screen (local, top-left origin) */
export function phone(x, cx, cy, { w = 150, h = 270, rot = 0, col = '#2a2148', screen = null, glow = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 10, 0, 0, h); g.addColorStop(0, `rgba(190,220,255,${0.25 * glow})`); g.addColorStop(1, 'rgba(190,220,255,0)'); x.fillStyle = g; x.fillRect(-h, -h, 2 * h, 2 * h); x.restore() }
  box(x, -w / 2, -h / 2, w, h, col, { b: 6 })
  R(x, '#14102a', -w / 2 + 10, -h / 2 + 18, w - 20, h - 36)
  if (screen) { x.save(); x.translate(-w / 2 + 10, -h / 2 + 18); x.beginPath(); x.rect(0, 0, w - 20, h - 36); x.clip(); screen(x, w - 20, h - 36); x.restore() }
  x.restore()
}
/** a chat bubble inside a phone screen (left = them, right = you) */
export function chat(x, text, y, sw, { me = false, size = 15, col } = {}) {
  x.font = `700 ${size}px ${INTER}`
  const lines = String(text).split('\n'), tw = Math.max(...lines.map(s => x.measureText(s).width)), w = Math.min(sw - 16, tw + 18), h = lines.length * size * 1.2 + 12
  const X = me ? sw - w - 8 : 8
  R(x, col || (me ? '#7fd0ff' : BONE), X, y, w, h)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'top'
  lines.forEach((s, i) => x.fillText(s, X + 9, y + 6 + i * size * 1.2))
  return y + h + 8
}

// ── sprite frame (mirrors startalk.js) so props can sit on a star through hops and squash
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
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 3, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.8
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.8 * ph; py = 21 + 10 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ── the flags
const FLAG_BM = ['GGGGGGGGGGG', 'GGGGGGGGGG.', 'GGGGGGGGG..', 'GGGGGGGGGG.', 'GGGGGGGGGGG']
/** a pixel flag on a pole planted at (px, py); k: drop progress (0 above → 1 planted), droop 0…1 wilts it */
export function flag(x, t, px, py, { col = GREEN, dark = GREEN_D, k = 1, h = 330, droop = 0, wave = 1, text = null } = {}) {
  if (k <= 0) return
  const y = lerp(py - 900, py, ease.inCubic(clamp(k)))
  x.save(); x.translate(px, y)
  R(x, INK, -9, -h - 8, 18, h + 8); R(x, '#d9cfbd', -4, -h - 4, 8, h + 4)
  box(x, -14, -h - 26, 28, 22, GOLD, { b: 5 })
  x.save(); x.translate(8, -h + 10); x.rotate(droop * 1.25)
  const cell = 16, cols = FLAG_BM[0].length
  for (let i = 0; i < cols; i++) {
    const off = wave * 6 * Math.sin(t * 8 - i * 0.7) * (i / cols)
    for (let j = 0; j < FLAG_BM.length; j++) {
      if (FLAG_BM[j][i] === '.') continue
      R(x, INK, i * cell - 3, j * cell + off - 3, cell + 6, cell + 6)
    }
  }
  for (let i = 0; i < cols; i++) {
    const off = wave * 6 * Math.sin(t * 8 - i * 0.7) * (i / cols)
    for (let j = 0; j < FLAG_BM.length; j++) {
      if (FLAG_BM[j][i] === '.') continue
      R(x, j === 0 ? (col === GREEN ? GREEN_L : '#ff9aa6') : j === FLAG_BM.length - 1 ? dark : col, i * cell, j * cell + off, cell, cell)
    }
  }
  if (text) { x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 78, 40 + wave * 3 * Math.sin(t * 8 - 3)) }
  x.restore()
  x.restore()
}

// ── the series bug: "SPOT THE GREEN FLAG" Inter 800 small caps, letter-spaced, top-left
export function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: GREEN, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(95,224,138,0.75)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: GREEN, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'SPOT&nbsp;THE<span style="color:rgba(255,255,255,0.7)">&nbsp;GREEN&nbsp;FLAG</span>')
  return { update(alpha = 1) { b.style.opacity = String(alpha) } }
}
// ── a bone sticker (DOM) with one *accent*: the premise
export function buildSticker(root, { text, top = 1600, tilt = -1.6, size = 50, chip = 'THE MOMENT' }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { position: 'relative', maxWidth: '960px', padding: '26px 38px 26px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px', boxShadow: '10px 10px 0 rgba(6,4,18,0.7)', transformOrigin: '50% 50%' }, wrap)
  if (chip) el('div', { position: 'absolute', left: '26px', top: '-24px', padding: '6px 14px', background: GREEN, border: `5px solid ${INK}`, font: `700 22px ${MONO}`, color: INK, letterSpacing: '0.08em', whiteSpace: 'nowrap' }, st, chip)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${Math.round(size * 1.25)}px ${SERIF};color:${GREEN_D};letter-spacing:0">$1</span>`)
  el('div', { font: `800 ${size}px ${INTER}`, lineHeight: '1.1', color: INK, letterSpacing: '-0.01em', textAlign: 'center' }, st, html)
  return {
    update(t, at, out, alpha = 1) {
      const on = t >= at && t < out[1] && alpha > 0
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.34), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o * alpha)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}
// ── the verdict banner (DOM): "GREEN FLAG: TAKE B"
export function buildVerdict(root, html) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '196px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '18px 40px 22px', background: GREEN, border: `8px solid ${INK}`, borderRadius: '16px', boxShadow: '12px 12px 0 rgba(6,4,18,0.7)', font: `800 74px ${INTER}`, color: INK, letterSpacing: '-0.01em', whiteSpace: 'nowrap', transform: 'rotate(-3deg)' }, wrap, html)
  return {
    update(t, at, alpha = 1) {
      const on = t >= at && alpha > 0
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.3), 2.8)
      st.style.opacity = String(clamp(prog(t, at, at + 0.06) * 2) * alpha)
      st.style.transform = `rotate(-3deg) scale(${(lerp(1.6, 1, k) * (0.6 + 0.4 * alpha)).toFixed(4)})`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════ shared episode pieces
export function cast(cfg) {
  const HERO = signStar(cfg.sign), PIS = signStar('pisces')
  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 0.9, ...o })
  const you = (x, t, o = {}) => {
    const r = drawStarChar(x, o.x, o.y, o.s, t, { color: cfg.you || YOU, seed: 9, glow: 0.7, tips: false, ...o })
    if (o.tag !== false && (o.pop ?? 1) > 0.5) label(x, 'you', o.x, o.y + o.s * 0.56, { size: 20, col: BONE, alpha: o.alpha ?? 1 })
    return r
  }
  const other = (sign, seed = 5) => { const S = signStar(sign); return (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: o.s >= 150 ? S.glyph : null, seed, glow: 0.8, ...o }) }
  const pisces = (x, t, P, tears, mood = 'sparkle', look = [0, 0]) => {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  return { HERO, PIS, hero, you, other, pisces }
}

/** draw one panel (frame, set, take) at its place on the main canvas */
export function drawPanel(x, side, tk, t, cfg, S0, { dim = 0, grey = 0, glow = 0, tag = true }) {
  const P = PANEL[side], take = cfg.takes[side]
  x.save(); x.translate(P.x, P.y)
  // frame + glow
  if (glow > 0) { x.save(); x.shadowColor = `rgba(95,224,138,${0.9 * glow})`; x.shadowBlur = 40 * glow; R(x, GREEN, -14, -14, PW + 28, PH + 28); x.restore() }
  R(x, glow > 0.05 ? GREEN : INK, -10, -10, PW + 20, PH + 20); R(x, INK, -4, -4, PW + 8, PH + 8)
  x.save(); x.beginPath(); x.rect(0, 0, PW, PH); x.clip()
  R(x, take.bg || '#2a2148', 0, 0, PW, PH)
  x.save(); x.translate(PW / 2, 0); x.scale(SET_K, SET_K); x.translate(-PW / 2, 0)
  take.draw(x, tk, { ...S0, side, tk, t })
  x.restore()
  if (grey > 0) {
    x.save(); x.globalCompositeOperation = 'saturation'; x.globalAlpha = grey; R(x, '#808080', 0, 0, PW, PH); x.restore()
    R(x, `rgba(14,10,30,${0.38 * grey})`, 0, 0, PW, PH)
  }
  if (dim > 0) R(x, `rgba(8,5,20,${dim})`, 0, 0, PW, PH)
  x.restore()
  // the take tag
  if (tag) {
    x.font = `700 24px ${MONO}`
    const s = `TAKE ${side}`, w = x.measureText(s).width + 26
    R(x, glow > 0.05 ? GREEN : INK, 14, 14, w, 40)
    x.fillStyle = glow > 0.05 ? INK : BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(s, 27, 35)
  }
  x.restore()
}

/** the 3-2-1 timer on the divider: digits at d[0..2], done at d[3] */
export function drawTimer(x, t, d, { r = TIMER.r, cx = TIMER.x, cy = TIMER.y, alpha = 1 } = {}) {
  if (t < d[0] - 0.02 || alpha <= 0) return
  const k = pop01(t, d[0], 0.28, 2.6) * outK(t, [d[3] + 0.02, d[3] + 0.22])
  if (k <= 0.01) return
  const n = t < d[1] ? 3 : t < d[2] ? 2 : 1, tn = [d[0], d[1], d[2]][3 - n]
  const punch = 1 + 0.16 * Math.exp(-(t - tn) * 10)
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(k * punch, k * punch)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 12, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  const f = prog(t, d[0], d[3])
  x.strokeStyle = n === 1 ? RED : GREEN; x.lineWidth = 16; x.lineCap = 'butt'
  x.beginPath(); x.arc(0, 0, r - 14, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - f)); x.stroke()
  x.font = `800 ${Math.round(r * 1.25)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText(String(n), 0, r * 0.06)
  x.restore()
  // "A or B?" chip under the timer
  const ck = pop01(t, d[0] + 0.12, 0.25, 2.4) * outK(t, [d[3], d[3] + 0.2])
  if (ck > 0.01) {
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy + r + 52); x.scale(ck, ck); x.rotate(-0.04)
    box(x, -86, -28, 172, 56, GREEN, { b: 6 })
    x.font = `800 32px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('A or B?', 0, 2)
    x.restore()
  }
}

/** Pisces' judge cam under the divider. tears 1…3, mood, sweat */
export function drawJudge(x, t, C, { tears = 1, mood = 'wide', sweatOn = false, hops = null, alpha = 1, k = 1, look = [0, 0], cam = CAM } = {}) {
  if (alpha <= 0 || k <= 0.01) return
  const { x: cx, y: cy, w, h } = cam
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#17112f', { b: 7 })
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
  // a soft cam backdrop
  const g = x.createRadialGradient(0, 10, 10, 0, 10, w * 0.7); g.addColorStop(0, '#3b2f73'); g.addColorStop(1, '#17112f'); x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
  tissues(x, -w / 2 + 56, h / 2 - 38, 64)
  const F = C.pisces(x, t, { x: 14, y: 40, s: 176, hops }, tears, mood, look)
  if (sweatOn) sweat(x, t, 10 + 58, F.cy - 66, 1)
  x.restore()
  // chrome: JUDGE chip + REC dot
  R(x, GREEN, -w / 2 + 10, -h / 2 + 10, 98, 30); x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('JUDGE', -w / 2 + 18, -h / 2 + 26)
  if (Math.floor(t * 2) % 2 === 0) { x.fillStyle = RED; x.beginPath(); x.arc(w / 2 - 24, -h / 2 + 24, 8, 0, Math.PI * 2); x.fill() }
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════ the short episode
export function makeGreen(cfg) {
  const C = cast(cfg)
  const SPEAK = 'THE STARS', CPS = 30
  const T = {
    whip: [0.18, 0.5], focusA: [0.3, 2.05], focusB: [2.05, 3.65], premise: 0.42,
    timer: [3.65, 4.45, 5.25, 6.05], reveal: 6.05,
  }
  T.last = r3(T.reveal + 0.62)
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const done = lineTimes(LINES, { cps: CPS })[0].done
  const LOOP = cfg.ending === 'loop'
  const LB = 0.4
  const DURATION = r3(Math.max(cfg.minLen || 0, done + (cfg.hold ?? 1.5) + (LOOP ? LB : 0)))
  T.end = DURATION; T.loop = [r3(DURATION - LB), DURATION]
  // the hook kit: slam title on frame 0, a whip zoom in the first second, the timer as a record-scratch freeze with
  // the kit countdown, a shake on the reveal, and (loops) the loop-back cross-blend into frame 0
  const hookText = cfg.hook.includes('|') ? cfg.hook : (() => { const w = cfg.hook.split(' '), h = Math.ceil(w.length / 2); return w.slice(0, h).join(' ') + ' | ' + w.slice(h).join(' ') })()
  const HOOK = { at: -1, text: hookText, top: 140, size: 104, accentColor: GREEN, out: [T.reveal - 0.12, T.reveal + 0.04], width: 1000 }
  const WHIP = { at: T.whip[0], len: 0.45, from: 1.45, cx: 540, cy: 850 }
  const REC = { at: T.timer[0], len: r3(T.reveal - T.timer[0]), caption: cfg.ask || 'Which take is the *green flag?*', sub: 'freeze. look closely.', top: 1610 }
  const CD = { at: T.timer[0], from: 3, gap: r3((T.reveal - T.timer[0]) / 3), go: null, y: 850, color: GREEN }
  const SHK = { at: T.reveal, len: 0.5, amp: 22 }
  const W = cfg.win
  const isWin = s => W === 'both' || W === s
  // the take clock: runs, freezes for the timer, runs again after the reveal; loops rewind it to 0
  const tk = t => t < T.timer[0] ? t : t < T.reveal ? T.timer[0] : T.timer[0] + (t - T.reveal)
  const backK = () => 0
  const verdictHtml = cfg.verdict || (W === 'both' ? `BOTH. <span style="font:italic 600 92px ${SERIF}">Green.</span>` : `GREEN FLAG: <span style="font:italic 600 92px ${SERIF}">Take ${W}</span>`)

  async function build(stage) {
    try { await Promise.all(["800 74px Inter", "800 50px Inter", "800 28px Inter", "italic 500 64px 'EB Garamond'", "italic 600 92px 'EB Garamond'", "700 24px 'Space Mono'", "700 20px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const verdict = buildVerdict(root, verdictHtml)
    const premise = buildSticker(root, { text: cfg.premise })
    const box1 = dialogueBox(root, { lines: LINES, y: 1580, open: T.last - 0.22, close: DURATION + 5, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const S0 = { ...C, PW, PH, T, cfg, focus: { A: T.focusA, B: T.focusB } }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const back = backK(t)                  // 0 … 1 over the loop-back
        const ov = 1 - back                    // overlays that are not in frame 0 fade out on the loop-back
        const k = tk(t)
        drawSky(x, t, { ...SKY_H, dim: 0.5 })
        // a small push toward take B when it takes focus (the kit's whip zoom does the first-second punch)
        const wB = Math.sin(Math.PI * prog(t, T.focusB[0] - 0.12, T.focusB[0] + 0.24)), zB = 0.07 * wB * wB
        x.save()
        x.translate(540, 850); x.scale(1 + zB, 1 + zB); x.translate(-540 + 260 * zB * 2.2, -850)
        // focus dimming (frame 0 and the timer show both fully)
        const inA = t > T.focusA[0] + 0.1 && t < T.focusA[1], inB = t > T.focusB[0] + 0.1 && t < T.focusB[1]
        const dimA = inB ? 0.42 * clamp(prog(t, T.focusB[0], T.focusB[0] + 0.2)) : 0
        const dimB = inA ? 0.42 * clamp(prog(t, T.focusA[0] + 0.1, T.focusA[0] + 0.3)) * outK(t, [T.focusA[1] - 0.15, T.focusA[1]]) : 0
        const rv = clamp(prog(t, T.reveal, T.reveal + 0.35)) * ov
        // freeze frame look during the timer: a quick desaturated flash in, scanlines
        const fz = t >= T.timer[0] && t < T.reveal ? 1 : 0
        for (const s of ['A', 'B']) {
          const won = isWin(s) ? rv : 0, lost = isWin(s) ? 0 : rv
          drawPanel(x, s, k, t, cfg, { ...S0, won, lost, rv }, { dim: (s === 'A' ? dimA : dimB) * ov + (fz ? 0.12 : 0), grey: lost * 0.92, glow: won })
        }
        // flags
        const fk = clamp(prog(t, T.reveal - 0.16, T.reveal)) * ov
        for (const s of ['A', 'B']) {
          const P = PANEL[s]
          if (isWin(s)) flag(x, t, P.x + 40, P.y + PH - 24, { k: fk, text: 'GREEN', h: 250 })
          else if (fk > 0) flag(x, t, P.x + 40, P.y + PH - 24, { k: fk, col: '#b9b2c9', dark: '#7d7690', droop: clamp(prog(t, T.reveal + 0.2, T.reveal + 0.9)), wave: 0.3, h: 210 })
        }
        if (fz) { x.save(); x.globalAlpha = 0.08; for (let yy = PANEL.A.y; yy < PANEL.A.y + PH; yy += 8) R(x, '#000', 0, yy, 1080, 3); x.restore() }
        x.restore()
        // top layer: timer, judge, celebrations
        tx.clearRect(0, 0, 1080, 1920)
        for (const s of ['A', 'B']) if (isWin(s)) {
          const P = PANEL[s]
          sparkles(tx, t, P.x + PW / 2, P.y + PH / 2, T.reveal + 0.02, 12, 220, 1, [GREEN, GOLD, BONE])
          confetti(tx, t, T.reveal + 0.04, P.x + PW / 2, P.y + 260)
        }
        const jt = t < T.reveal ? 2 : 3
        const jm = t < T.timer[0] ? 'wide' : t < T.reveal ? 'wide' : 'sparkle'
        const jl = t < T.timer[0] ? [t < T.focusB[0] ? -1 : 1, -0.6] : [0, 0]
        drawJudge(tx, t, C, { tears: jt, mood: back > 0.5 ? 'wide' : jm, sweatOn: t >= T.timer[0] && t < T.reveal, look: back > 0.5 ? [-1, -0.6] : jl, hops: [T.reveal + 0.04, T.reveal + 0.55, T.last + 1.2] })
        if (t > T.reveal) hearts(tx, t, T.reveal + 0.2, CAM.x + 10, CAM.y - 60, { n: 5, cell: 4, rise: 130 })
        // DOM layers
        verdict.update(t, T.reveal + 0.05, ov)
        premise.update(t, T.premise, [T.timer[0] - 0.14, T.timer[0]], ov)
        box1.update(t)
        bug.update(1)
        drawGrain(gx, t)
        const fl = t >= T.reveal && t < T.reveal + 0.14 ? 1 - (t - T.reveal) / 0.14 : 0
        flash.style.opacity = String(0.6 * fl)
      },
    }
  }

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ['pop', T.premise, 1174.66, 0.04, 0], ['pop', r3(T.premise + 0.07), 1567.98, 0.03, 0],
    ['whoosh', r3(T.focusB[0] - 0.14), 0.26, 0.03], ['tick', T.focusB[0], 0.05],
    // the timer ticks under the kit countdown, a riser into the reveal
    ['tick', r3(T.timer[0] + 0.45), 0.03], ['tick', r3(T.timer[1] + 0.45), 0.03], ['tick', r3(T.timer[2] + 0.45), 0.035],
    ['riser', r3(T.timer[2]), T.reveal, 0.02],
    // the reveal: slam + ding + glitter
    ['boom', T.reveal, 0.3], ['tom', T.reveal, 92, { gain: 0.26, decay: 0.3 }], ['bell', r3(T.reveal + 0.04), 1760, 0.04, 1.4, 0], ['bell', r3(T.reveal + 0.16), 2349.32, 0.03, 1.2, 0.2],
    ['glitter', r3(T.reveal + 0.05), r3(T.reveal + 0.7)], ['pop', r3(T.reveal + 0.3), 987.77, 0.03, 0.4],
    ...talkCues(LINES, { cps: CPS }),
    ...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...countdownCues(CD), ...shakeCues(SHK),
    ...(LOOP ? loopCues({ duration: DURATION, len: LB }) : []),
    ...(cfg.cues || []),
  ].sort((a, b) => a[1] - b[1])
  void NOTE
  const SCENES = [build, whipZoom(WHIP), slamTitle(HOOK), recordScratch(REC), countdown(CD), screenShake(SHK)]
  if (LOOP) SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: DURATION, len: LB }))
  return { DURATION, SCENES, CUES, T, LOOP }
}
