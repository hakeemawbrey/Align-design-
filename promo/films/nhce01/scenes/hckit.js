// HOT TAKE, COLD TAKE (winter edition): the shared look of the 24 star_advice trial reels nhce01–nhce24
// (promo/films/next30/b44.md). nhce02–24 import this file from nhce01; nothing here touches a shared module.
//
// The format (16 s, story 0–11.6, then the shared end card):
//   0.00–2.40  hook (frame 0 is the thumbnail): the winter moment as a bold top caption, the screen split down the
//              middle: the left half on fire (embers, warm glow, a HOT TAKE tag), the right half frozen (snow, frost, a
//              COLD TAKE tag). The hot sign is mid-hop on the left, the cold sign shivers on the right, a pixel
//              thermometer stands on the seam. Pisces sniffles into a tissue at the bottom.
//   2.40–5.30  HOT TAKE: white-flash jump cut, the fire takes the frame, the thermometer shoots up and rattles. Header
//              "Hot take:", the take on a sticker, the hot sign acts it out with a prop and a bubble line.
//   5.30–8.20  COLD TAKE: the one card cut (flip), the frost takes the frame, the thermometer drops. Same layout.
//   8.20–11.6  WARM TAKE: the two halves melt into one amber frame, the thermometer glides to the middle and settles on
//              JUST RIGHT, both signs calm down, THE STARS say the last line. Pisces: happy-tear fountains.
//
//   makeHC(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.id · cfg.hook ('Your crush texts: | *“it’s snowing!!”*') · cfg.last (THE STARS)
//     cfg.hot / cfg.cold: { sign, take, say, prop, text: [..], n, mood, look, at: [x, y], extra(x, t, S) }
//       prop: one of PROPS below (worn props: 'scarf', 'partyhat', 'blanket', 'skates')
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#e8344e'
export const FIRE = '#ff7a3d', EMBER = '#ffb347', ICE = '#9fdcff', FROST = '#e6f6ff', AMBER = '#ffc46b'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in all 24 films)
export const DURATION = 16
export const STORY_END = DURATION - ENDCARD_LEN          // 11.6
export const T = {
  hook: [0, 2.4], hot: [2.4, 5.3], cold: [5.3, 8.2], warm: [8.2, STORY_END],
  hookOut: [2.2, 2.4], cut: 5.3,
  melt: [8.2, 8.75], starsIn: 8.24, sidesIn: 8.4, last: 8.8, pisFount: 9.6, boxClose: 11.15,
  out: [11.15, 11.55], bugOut: [11.25, 11.55],
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
export const FLAME = ['...F....', '..FF..F.', '..FFF.FF', '.FFYFFFF', '.FYYYFF.', 'FFYWYYFF', 'FYYWWYYF', 'FYYWWYYF', '.FYYYYF.', '..FFFF..']
export const FLAKE = ['...S...', '.S.S.S.', '..SSS..', 'SSSWSSS', '..SSS..', '.S.S.S.', '...S...']
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
/** a pixel speech bubble (canvas), popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 40, tail = 0, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 48, h = size + 34
  const X = clamp(cx, w / 2 + 30, 1050 - w / 2)                 // never off the frame
  x.translate(X, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = clamp(cx - X + tail * 60, -w / 2 + 30, w / 2 - 30)
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
/** sweat drops flicking off the top (sprite cells), for the overheated hot sign */
function sweatCells(ctx, t) {
  for (let q = 0; q < 3; q++) {
    const ph = ((t * 1.6 + q / 3) % 1 + 1) % 1, d = q % 2 ? 1 : -1
    const px = 18 + d * (7 + 9 * ph), py = 6 - 6 * ph + 14 * ph * ph
    ctx.fillStyle = INK; ctx.fillRect(px - 0.2, py - 0.2, 1.4, 1.8); ctx.fillStyle = '#bfefff'; ctx.fillRect(px, py, 1, 1.4)
  }
}
/** a frost rim on the top tips (sprite cells), for the frozen cold sign */
function frostCells(ctx) {
  ctx.fillStyle = 'rgba(230,246,255,0.9)'
  for (const [i, j, w] of [[16, 2, 4], [17, 1, 2], [4, 13, 4], [28, 13, 4], [15, 4, 1], [20, 4, 1]]) ctx.fillRect(i, j, w, 1)
}

// ── worn props (sprite cells; the sprite is 36 cells wide, eyes around row 17–20, feet at ~34)
function wornScarf(ctx, t, col = '#e8344e', col2 = BONE) {
  for (let i = 0; i < 18; i++) { ctx.fillStyle = INK; ctx.fillRect(9 + i, 23.4, 1, 4.2) }
  for (let i = 0; i < 16; i++) { ctx.fillStyle = (i >> 1) % 2 ? col2 : col; ctx.fillRect(10 + i, 24, 1, 3) }
  const sw = Math.sin(t * 5) * 0.8
  ctx.fillStyle = INK; ctx.fillRect(21 + sw - 0.6, 26, 4.2, 9.6)
  for (let j = 0; j < 8; j++) { ctx.fillStyle = (j >> 1) % 2 ? col2 : col; ctx.fillRect(21.6 + sw, 26.6 + j, 3, 1) }
}
function wornPartyHat(ctx, t) {
  const rows = [[17.5, 1], [17, 2], [16.5, 3], [16, 4], [15.5, 5], [15, 6], [14.5, 7]]
  rows.forEach(([i, w], j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.6, -5 + j, w + 1.2, 1) })
  rows.forEach(([i, w], j) => { ctx.fillStyle = j % 2 ? GOLD : PINK; ctx.fillRect(i, -5 + j, w, 1) })
  ctx.fillStyle = ICE; ctx.fillRect(17 + Math.sin(t * 8) * 0.4, -7, 2, 2)
}
function wornBlanket(ctx, t, col = '#7b6cc4') {
  ctx.fillStyle = INK; ctx.fillRect(3, 23.5, 30, 13); ctx.fillStyle = col; ctx.fillRect(4, 24.5, 28, 11)
  ctx.fillStyle = '#9d90e0'; for (let i = 0; i < 4; i++) ctx.fillRect(5 + i * 7, 26 + (i % 2) * 4, 3, 3)
  ctx.fillStyle = INK; ctx.fillRect(4, 29 + Math.sin(t * 2) * 0.3, 28, 0.8)
}
function wornSkates(ctx, t) {
  for (const fx of [8, 22]) {
    ctx.fillStyle = INK; ctx.fillRect(fx - 0.6, 31.4, 7.2, 4.4); ctx.fillStyle = BONE; ctx.fillRect(fx, 32, 6, 3)
    ctx.fillStyle = INK; ctx.fillRect(fx - 1, 35.6, 8, 1.2); ctx.fillStyle = '#cfd8e6'; ctx.fillRect(fx - 0.6, 35.8, 7.2, 0.6)
  }
  void t
}

// ── props (canvas px). Each: (x, t, cx, cy, k, P) where P = { text, n, u, t0 }
function phone(x, t, cx, cy, k, P) {
  const lines = P.text || []
  x.save(); x.translate(cx, cy); x.rotate(P.rot ?? 0.08); x.scale(k * 1.45, k * 1.45)
  box(x, -110, -190, 220, 380, '#2a2148', { b: 7 })
  R(x, '#14102a', -96, -168, 192, 330)
  R(x, '#3a3060', -96, -168, 192, 34)
  x.textBaseline = 'middle'
  x.font = `700 17px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText(P.title || 'messages', 0, -151)
  let y = -116
  lines.forEach((ln, i) => {
    const show = P.u === undefined || P.u >= (P.lineAt ? P.lineAt[i] : i * 0.28)
    if (!show) return
    const mine = ln.startsWith('>'), txt = mine ? ln.slice(1) : ln
    x.font = `700 19px ${INTER}`
    const parts = wrap(x, txt, 150)
    const bh = parts.length * 24 + 16, bw = Math.min(170, Math.max(...parts.map(p => x.measureText(p).width)) + 24)
    const bx = mine ? 86 - bw : -86
    R(x, mine ? '#5aa9ff' : '#d9d3e8', bx, y, bw, bh)
    x.fillStyle = mine ? '#ffffff' : INK; x.textAlign = 'left'
    parts.forEach((p, j) => x.fillText(p, bx + 12, y + 20 + j * 24))
    y += bh + 10
  })
  if (P.status) { x.font = `700 15px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.7)'; x.textAlign = 'right'; x.fillText(P.status, 86, Math.min(150, y + 6)) }
  x.restore()
}
function wrap(x, text, w) {
  const out = []; let cur = ''
  for (const word of text.split(' ')) { const tst = cur ? cur + ' ' + word : word; if (x.measureText(tst).width > w && cur) { out.push(cur); cur = word } else cur = tst }
  if (cur) out.push(cur)
  return out
}
function snowman(x, t, cx, cy, k, P) {
  const g = clamp((P.u ?? 9) / 0.9)                      // builds up ball by ball
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const ball = (r, y) => { x.fillStyle = INK; x.beginPath(); x.arc(0, y, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4fbff'; x.beginPath(); x.arc(0, y, r, 0, Math.PI * 2); x.fill(); x.fillStyle = '#cfe6f5'; x.fillRect(-r * 0.6, y + r * 0.3, r * 1.1, r * 0.25) }
  if (g > 0) ball(95, 120)
  if (g > 0.4) ball(68, -15)
  if (g > 0.75) {
    ball(48, -115)
    R(x, INK, -16, -126, 9, 9); R(x, INK, 10, -126, 9, 9)
    R(x, INK, -4, -108, 30, 12); R(x, FIRE, 0, -105, 26, 6)
    box(x, -42, -190, 84, 18, '#2a2148', { b: 5 }); box(x, -28, -238, 56, 48, '#2a2148', { b: 5 })
  }
  x.restore()
}
function scarfFolded(x, t, cx, cy, k, P = {}) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 4; i++) { box(x, -110, 60 - i * 46, 220, 36, i % 2 ? BONE : '#e8344e', { b: 5 }); R(x, i % 2 ? '#e8344e' : BONE, -110, 60 - i * 46 + 14, 220, 8) }
  box(x, 40, -150, 110, 54, '#9fe6b0', { b: 5 }); x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(P.tag || '✓ 1 HR', 95, -122)
  x.restore()
}
function snacks(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -170, 40, 340, 26, '#6b4a2f', { b: 6 })                         // a little table
  R(x, INK, -150, 70, 14, 140); R(x, INK, 136, 70, 14, 140)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 10, 116, 50, 0, 0, Math.PI); x.fill()
  x.fillStyle = '#7fd0ff'; x.beginPath(); x.ellipse(0, 10, 106, 42, 0, 0, Math.PI); x.fill()
  for (let i = 0; i < 9; i++) { const a = i * 0.7; R(x, INK, -84 + i * 19 - 2, -12 - (i % 3) * 8 - 2, 20, 18); R(x, i % 2 ? GOLD : EMBER, -84 + i * 19, -12 - (i % 3) * 8, 16, 14); void a }
  x.restore()
}
function calendar(x, t, cx, cy, k, P) {
  const marks = P.n ?? 5
  x.save(); x.translate(cx, cy); x.rotate(P.rot ?? -0.05); x.scale(k, k)
  box(x, -150, -170, 300, 330, BONE, { b: 7 })
  R(x, P.col || RED, -150, -170, 300, 60)
  x.font = `800 34px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(P.title || 'DEC', 0, -139)
  for (let j = 0; j < 5; j++) for (let i = 0; i < 5; i++) {
    const n = j * 5 + i, X = -126 + i * 52, Y = -92 + j * 50
    R(x, '#d8cdb8', X, Y, 44, 40)
    const on = n < marks && (P.u === undefined || P.u > 0.25 + n * 0.06)
    if (on) drawBits(x, P.mark === 'x' ? ['X...X', '.X.X.', '..X..', '.X.X.', 'X...X'] : HEART, { H: '#ff5c8a', X: RED }, X + 22, Y + 20, 5, { outline: null })
  }
  x.restore()
}
function gifts(x, t, cx, cy, k, P) {
  const n = P.n ?? 4
  const spots = [[-120, 90, 150, 120, RED], [60, 100, 130, 110, '#7fd0ff'], [-40, -20, 140, 110, '#9fe6b0'], [110, -10, 100, 90, GOLD], [-150, -40, 90, 80, PINK], [20, -120, 110, 90, '#c9a6ff'], [-100, -140, 80, 70, EMBER]]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  spots.slice(0, n).forEach(([X, Y, w, h, c], i) => {
    const pk = P.u === undefined ? 1 : pop01(t, P.t0 + 0.2 + i * 0.16, 0.25, 2.6)
    if (pk <= 0.01) return
    x.save(); x.translate(X, Y); x.scale(pk, pk)
    box(x, -w / 2, -h / 2, w, h, c, { b: 6 }); R(x, BONE, -7, -h / 2, 14, h); R(x, BONE, -w / 2, -7, w, 14)
    R(x, INK, -24, -h / 2 - 22, 18, 18); R(x, INK, 6, -h / 2 - 22, 18, 18); R(x, BONE, -20, -h / 2 - 18, 10, 10); R(x, BONE, 10, -h / 2 - 18, 10, 10)
    x.restore()
  })
  x.restore()
}
function suitcase(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.rotate(0.04 * Math.sin(t * 6)); x.scale(k, k)
  box(x, -140, -110, 280, 220, '#c45a12', { b: 7, hi: '#e07a2e' })
  box(x, -50, -150, 100, 30, '#6b4a2f', { b: 6 })
  R(x, INK, -80, -110, 12, 220); R(x, INK, 68, -110, 12, 220)
  drawBits(x, HEART, { H: PINK }, 0, 10, 8)
  box(x, -120, -160, 70, 50, '#9fe6b0', { b: 4 })                       // a snack poking out
  x.restore()
}
function sofa(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -200, -60, 400, 120, '#7b6cc4', { b: 7, hi: '#9d90e0' })
  box(x, -230, -20, 50, 120, '#6a5cb0', { b: 7 }); box(x, 180, -20, 50, 120, '#6a5cb0', { b: 7 })
  box(x, -200, 40, 400, 70, '#6a5cb0', { b: 7 })
  R(x, INK, -190, 115, 14, 30); R(x, INK, 176, 115, 14, 30)
  x.restore()
}
function pen(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.rotate(-0.7 + 0.05 * Math.sin(t * 4)); x.scale(k, k)
  box(x, -16, -150, 32, 260, '#5a5470', { b: 6, hi: '#7a7490' }); box(x, -16, -170, 32, 22, '#2a2148', { b: 6 })
  x.fillStyle = INK; x.beginPath(); x.moveTo(-22, 116); x.lineTo(22, 116); x.lineTo(0, 170); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-14, 116); x.lineTo(14, 116); x.lineTo(0, 154); x.fill()
  x.restore()
  label(x, 'a pen.', cx + 40 * k, cy + 170 * k, { size: 30 * k, col: BONE, font: INTER, weight: 800 })
}
function frame(x, t, cx, cy, k, P) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -150, -170, 300, 250, GOLD, { b: 7, hi: '#ffe08a' })
  R(x, P.night ? '#1d2a5a' : '#bfe8ff', -126, -146, 252, 202)
  if (P.portrait) {
    drawStarChar(x, 0, -40, 150, t, { color: signStar(P.portrait).color, mood: 'happy', look: [0, 0], seed: 9, glow: 0, tips: false, bob: 0 })
    drawBits(x, HEART, { H: '#ff5c8a' }, 96, -118, 5)
  } else {
    R(x, '#9fe6b0', -126, 10, 252, 46); x.fillStyle = INK; x.beginPath(); x.arc(40, -60, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(40, -60, 28, 0, Math.PI * 2); x.fill()
    R(x, INK, -80, -40, 60, 60); R(x, PINK, -74, -34, 48, 48)
  }
  R(x, INK, -60, 86, 12, 120); R(x, INK, 48, 86, 12, 120)                // easel legs
  x.restore()
}
function clipboard(x, t, cx, cy, k, P) {
  const lines = P.text || []
  x.save(); x.translate(cx, cy); x.rotate(P.rot ?? 0.06); x.scale(k * 1.3, k * 1.3)
  box(x, -150, -200, 300, 400, '#a07850', { b: 7 })
  R(x, '#fffdf4', -128, -170, 256, 350)
  box(x, -50, -216, 100, 34, '#cfd8e6', { b: 5 })
  x.textBaseline = 'middle'; x.textAlign = 'left'
  lines.forEach((ln, i) => {
    if (P.u !== undefined && P.u < 0.25 + i * 0.22) return
    x.font = `700 ${P.size || 24}px ${MONO}`; x.fillStyle = INK; x.fillText(ln, -114, -140 + i * 40)
  })
  if (P.laminated) { x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(-128, -170, 256, 350); R(x, 'rgba(255,255,255,0.6)', -110, -160, 18, 120) }
  x.restore()
}
function gloves(x, t, cx, cy, k, P) {
  const u = P.u ?? 1
  x.save(); x.translate(cx, cy); x.scale(k, k)
  ;[-1, 1].forEach((d, i) => {
    const p = clamp((u - 0.3 - i * 0.15) / 0.7), fx = d * (60 + 160 * p), fy = -40 - 260 * p + 380 * p * p
    drawBits(x, ['..GGG.', '.GGGG.', 'GGGGGG', 'GGGGGG', '.GGGGG', '.GGGG.', '.WWWW.'], { G: i ? '#7fd0ff' : RED, W: BONE }, fx, fy, 14, { rot: d * p * 4 })
  })
  x.restore()
}
function notes(x, t, cx, cy, k, P) {
  clipboard(x, t, cx, cy, k, { ...P, text: P.text || ['SAD SONG', 'verse 1…', 'verse 2…', 'verse 7 (!!)'] })
  for (let i = 0; i < 4; i++) {
    const ph = ((t * 0.6 + i / 4) % 1)
    drawBits(x, ['..NN', '..N.', '..N.', 'NNN.', 'NNN.'], { N: [GOLD, PINK, ICE, BONE][i] }, cx + (-140 + i * 90) * k + Math.sin(t * 3 + i) * 12, cy - (160 + ph * 220) * k, 9 * k, { alpha: Math.sin(Math.PI * ph) })
  }
}
function tickets(x, t, cx, cy, k, P) {
  const L = P.text || ['ROOFTOP', 'BAND', 'BOAT', 'BOAT 2?']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  L.forEach((s, i) => {
    const pk = P.u === undefined ? 1 : pop01(t, P.t0 + 0.25 + i * 0.3, 0.25, 2.6)
    if (pk <= 0.01) return
    x.save(); x.translate(-20 + (i % 2) * 40, -150 + i * 92); x.rotate((i % 2 ? 0.08 : -0.07)); x.scale(pk, pk)
    box(x, -140, -36, 280, 72, [GOLD, PINK, ICE, '#9fe6b0'][i % 4], { b: 6 })
    for (let j = 0; j < 5; j++) R(x, INK, 70, -30 + j * 14, 4, 8)
    x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, -24, 2)
    x.restore()
  })
  x.restore()
}
function stall(x, t, cx, cy, k, P) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -190, -200, 14, 380); R(x, INK, 176, -200, 14, 380)
  for (let i = 0; i < 8; i++) { R(x, INK, -206 + i * 52, -236, 52, 64); R(x, i % 2 ? BONE : RED, -200 + i * 52, -230, 46, 52) }
  box(x, -200, 60, 400, 110, '#6b4a2f', { b: 7, hi: '#8a6440' })
  const mit = ['.MMM.', 'MMMMM', 'MMMMM', 'MMMMM', '.WWW.']
  for (let i = 0; i < 6; i++) drawBits(x, mit, { M: [RED, ICE, '#9fe6b0', GOLD, PINK, '#c9a6ff'][i], W: BONE }, -150 + i * 60, -120 + Math.sin(t * 3 + i) * 4, 9)
  for (let i = 0; i < 4; i++) drawBits(x, mit, { M: [ICE, RED, GOLD, '#9fe6b0'][i], W: BONE }, -120 + i * 80, 30, 9)
  if (P.sold) { x.save(); x.translate(60, -30); x.rotate(-0.15); box(x, -110, -34, 220, 68, '#9fe6b0', { b: 6 }); x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SOLD OUT', 0, 2); x.restore() }
  x.restore()
}
function candles(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -200, 60, 400, 40, '#6b4a2f', { b: 6 })
  ;[[-140, 120, PINK], [-60, 170, BONE], [20, 100, ICE], [100, 150, GOLD]].forEach(([X, h, c], i) => {
    box(x, X - 26, 60 - h, 52, h, c, { b: 5 })
    const fl = 1 + 0.15 * Math.sin(t * 13 + i * 2)
    drawBits(x, ['.F.', 'FYF', 'FYF', '.F.'], { F: FIRE, Y: '#fff1a8' }, X, 60 - h - 26, 8, { sy: fl })
  })
  x.restore()
}
function card(x, t, cx, cy, k, P) {
  const lines = P.text || []
  x.save(); x.translate(cx, cy); x.rotate(P.rot ?? -0.06); x.scale(k, k)
  box(x, -170, -210, 340, 400, P.col || '#fffdf4', { b: 7 })
  R(x, '#2f8a57', -170, -210, 340, 40); for (let i = 0; i < 9; i++) drawBits(x, FLAKE, { S: BONE, W: GOLD }, -150 + i * 38, -190, 3, { outline: null })
  if (P.crest) {
    box(x, -60, -140, 120, 140, GOLD, { b: 6 }); drawBits(x, HEART, { H: RED }, 0, -84, 8); R(x, INK, -60, -26, 120, 6)
  }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((ln, i) => {
    if (P.u !== undefined && P.u < 0.3 + i * 0.3) return
    x.font = i === 0 && !P.crest ? `italic 500 50px ${SERIF}` : `800 32px ${INTER}`; x.fillStyle = INK; x.fillText(ln, 0, (P.crest ? 50 : -80) + i * 56)
  })
  x.restore()
}
function moon(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff3c4'; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e9d9a0'; [[-40, -30, 22], [30, 20, 16], [-10, 50, 12], [50, -50, 10]].forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() })
  x.restore()
  for (let i = 0; i < 6; i++) drawPixelStar(x, cx + (-220 + i * 90) * k, cy + (150 + (i % 2) * 60) * k, 20 * k, i % 2 ? 1 : 2, [BONE, GOLD][i % 2])
}
function telescope(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -6, 0, 12, 170); for (const d of [-1, 1]) { x.save(); x.translate(0, 160); x.rotate(d * 0.45); R(x, INK, -6, 0, 12, 90); x.restore() }
  x.save(); x.rotate(-0.55); box(x, -150, -34, 300, 68, '#5a5470', { b: 7, hi: '#7a7490' }); box(x, 150, -44, 50, 88, '#2a2148', { b: 7 }); box(x, -190, -20, 40, 40, '#2a2148', { b: 6 }); x.restore()
  x.restore()
  for (let i = 0; i < 4; i++) drawPixelStar(x, cx + (120 + i * 40) * k, cy - (200 + i * 50) * k, 18 * k, 2, GOLD)
}
function sled(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  box(x, -190, -30, 380, 50, RED, { b: 7, hi: '#ff6b7f' })
  R(x, INK, -150, 20, 12, 50); R(x, INK, 140, 20, 12, 50); R(x, INK, -200, 66, 400, 12); R(x, INK, 196, 20, 12, 58)
  x.restore()
}
function cocoa(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -60, -50, 120, 110, RED, { b: 6, hi: '#ff6b7f' }); R(x, '#6b3a1f', -54, -44, 108, 18)
  R(x, INK, 60, -30, 30, 12); R(x, INK, 78, -30, 12, 56); R(x, INK, 60, 18, 30, 12)
  for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; R(x, BONE, -30 + i * 26 + Math.sin(t * 3 + i) * 6, -70 - ph * 90, 8, 22) }
  x.globalAlpha = 1
  x.restore()
}
function shiverBits(x, t, cx, cy, k) {     // "brrr" text over the cold sign
  label(x, 'brrr', cx + Math.sin(t * 40) * 3, cy, { size: 34 * k, col: FROST, font: INTER, weight: 800 })
}
export const PROPS = { phone, snowman, folded: scarfFolded, snacks, calendar, gifts, suitcase, sofa, pen, frame, clipboard, gloves, notes, tickets, stall, candles, card, moon, telescope, sled, cocoa, none: () => {} }
const WORN = { scarf: wornScarf, partyhat: wornPartyHat, blanket: wornBlanket, skates: wornSkates }

// ── the halves: fire and frost
function fireHalf(x, t, X0, X1, a = 1) {
  if (a <= 0 || X1 <= X0) return
  x.save(); x.beginPath(); x.rect(X0, 0, X1 - X0, 1920); x.clip()
  x.globalAlpha = a
  const g = x.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, 'rgba(255,80,40,0.22)'); g.addColorStop(0.55, 'rgba(255,100,40,0.42)'); g.addColorStop(1, 'rgba(255,150,60,0.62)')
  x.fillStyle = g; x.fillRect(X0, 0, X1 - X0, 1920)
  // embers rising
  for (let i = 0; i < 40; i++) {
    const ph = ((t * (0.18 + (i % 5) * 0.03) + i * 0.137) % 1 + 1) % 1
    const ex = X0 + ((i * 197) % 1000) / 1000 * (X1 - X0) + Math.sin(t * 2 + i) * 18, ey = 1920 - ph * 1700
    const sz = 6 + (i % 3) * 4
    x.globalAlpha = a * Math.sin(Math.PI * ph) * 0.9
    R(x, i % 3 ? EMBER : FIRE, ex, ey, sz, sz)
  }
  x.globalAlpha = a
  // a row of pixel flames along the floor
  for (let fx = X0 - 40; fx < X1 + 40; fx += 92) {
    const fl = 1 + 0.18 * Math.sin(t * 11 + fx * 0.05)
    drawBits(x, FLAME, { F: FIRE, Y: EMBER, W: '#fff1a8' }, fx, 1880, 10, { sy: fl })
  }
  x.restore()
}
function frostHalf(x, t, X0, X1, a = 1) {
  if (a <= 0 || X1 <= X0) return
  x.save(); x.beginPath(); x.rect(X0, 0, X1 - X0, 1920); x.clip()
  x.globalAlpha = a
  const g = x.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, 'rgba(70,150,255,0.26)'); g.addColorStop(0.55, 'rgba(110,190,255,0.38)'); g.addColorStop(1, 'rgba(200,236,255,0.52)')
  x.fillStyle = g; x.fillRect(X0, 0, X1 - X0, 1920)
  snow(x, t, X0, X1, a)
  // snow bank along the floor
  x.globalAlpha = a
  for (let sx = X0 - 30; sx < X1 + 60; sx += 60) { x.fillStyle = INK; x.beginPath(); x.arc(sx, 1910, 66, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4fbff'; x.beginPath(); x.arc(sx, 1914, 60, 0, Math.PI * 2); x.fill() }
  // frost in the corners
  for (const [cx, cy] of [[X0, 0], [X1, 0]]) for (let i = 0; i < 9; i++) drawBits(x, FLAKE, { S: FROST, W: ICE }, cx + (cx === X0 ? 1 : -1) * (30 + (i * 53) % 160), cy + 220 + ((i * 71) % 220), 5, { outline: null, alpha: 0.6 })
  x.restore()
}
function snow(x, t, X0, X1, a = 1, n = 46) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * (0.09 + (i % 4) * 0.025) + i * 0.173) % 1 + 1) % 1
    const sx = X0 + ((i * 263) % 1000) / 1000 * (X1 - X0) + Math.sin(t * 1.3 + i) * 26, sy = ph * 1960 - 30
    x.globalAlpha = a * 0.9
    const sz = 6 + (i % 3) * 4
    R(x, i % 4 ? '#f4fbff' : ICE, sx, sy, sz, sz)
  }
  x.globalAlpha = 1
}

// ── the thermometer (the format's signature). level 0…1; col the mercury
function thermo(x, t, cx, top, h, level, col, { w = 64, scale = 1, labels = true, rattle = 0 } = {}) {
  x.save(); x.translate(cx + rattle * Math.sin(t * 70), top); x.scale(scale, scale)
  const bulbR = w * 0.95, tubeH = h - bulbR * 1.4
  // outline
  R(x, INK, -w / 2 - 8, -8, w + 16, tubeH + 16)
  x.fillStyle = INK; x.beginPath(); x.arc(0, tubeH + bulbR * 0.55, bulbR + 8, 0, Math.PI * 2); x.fill()
  R(x, '#f4efe4', -w / 2, 0, w, tubeH)
  x.fillStyle = '#f4efe4'; x.beginPath(); x.arc(0, tubeH + bulbR * 0.55, bulbR, 0, Math.PI * 2); x.fill()
  // ticks
  for (let i = 1; i < 10; i++) R(x, '#b9ae9a', -w / 2, tubeH * i / 10 - 2, w * 0.35, 4)
  // mercury
  const mh = clamp(level) * (tubeH - 14)
  R(x, col, -w / 2 + 14, tubeH - mh, w - 28, mh + 10)
  x.fillStyle = col; x.beginPath(); x.arc(0, tubeH + bulbR * 0.55, bulbR - 12, 0, Math.PI * 2); x.fill()
  R(x, 'rgba(255,255,255,0.55)', -w / 2 + 18, tubeH - mh + 6, 8, Math.max(0, mh - 6))
  // the warm band in the middle (JUST RIGHT)
  R(x, 'rgba(255,196,107,0.9)', w / 2 + 4, tubeH * 0.36, 14, tubeH * 0.16)
  if (labels) {
    x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    drawBits(x, FLAME, { F: FIRE, Y: EMBER, W: '#fff1a8' }, 0, -50, 5)
    drawBits(x, FLAKE, { S: ICE, W: BONE }, 0, tubeH + bulbR * 2 + 26, 6)
  }
  x.restore()
}

// ── the bug: "HOT TAKE, COLD TAKE" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root, at) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: `linear-gradient(90deg, ${FIRE} 50%, ${ICE} 50%)`, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,180,120,0.6)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: FIRE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, `HOT&nbsp;TAKE,<span style="color:${ICE}">&nbsp;COLD&nbsp;TAKE</span>`)
  void at
  return {
    update(t, out = 1) {
      b.style.display = out <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(out))
    },
  }
}

// ── the take sticker: a tilted bone sticker with a flame / snowflake badge, Inter 800 + one *italic* accent
function buildSticker(root, { text, deep, badge, icon, at, out, tilt }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1330px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '24px', maxWidth: '960px', padding: '20px 36px 22px 22px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrap)
  const bd = el('canvas', { flex: '0 0 auto', width: '84px', height: '84px', borderRadius: '50%', background: badge, border: `5px solid ${INK}`, imageRendering: 'pixelated' }, st)
  bd.width = 84; bd.height = 84
  const bx = bd.getContext('2d')
  drawBits(bx, icon === 'fire' ? FLAME : FLAKE, icon === 'fire' ? { F: '#fff1a8', Y: BONE, W: '#ffffff' } : { S: '#ffffff', W: INK }, 42, 42, icon === 'fire' ? 5.4 : 7)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 64px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 52px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
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

// a pill tag on the canvas ("HOT TAKE" / "COLD TAKE" over each half in the hook)
function tag(x, t, cx, cy, text, col, icon, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(icon === 'fire' ? -0.05 : 0.05); x.scale(k, k)
  x.font = `800 44px ${INTER}`
  const w = x.measureText(text).width + 110, h = 78
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, col, -w / 2, -h / 2, w, h)
  drawBits(x, icon === 'fire' ? FLAME : FLAKE, icon === 'fire' ? { F: RED, Y: GOLD, W: '#fff1a8' } : { S: '#ffffff', W: INK }, -w / 2 + 42, 0, icon === 'fire' ? 5 : 6)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 30, 3)
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeHC(cfg) {
  const HOT = signStar(cfg.hot.sign), COLD = signStar(cfg.cold.sign), PIS = signStar('pisces')
  const pisMain = cfg.hot.sign === 'pisces' ? 'hot' : cfg.cold.sign === 'pisces' ? 'cold' : null
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const PIS_DEF = { x: 930, y: 1700, s: 120 }

  const hotStar = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HOT.color, glyph: o.s >= 150 ? HOT.glyph : null, seed: 3, glow: 1.1, ...o })
  const coldStar = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: COLD.color, glyph: o.s >= 150 ? COLD.glyph : null, seed: 7, glow: 0.8, ...o })
  // decorations on a drawn star (worn prop, sweat / frost, tears if it's Pisces)
  function deco(x, t, side, o, { tears = 0, heat = 0, frost = 0 } = {}) {
    const F = starFrame(o.x, o.y, o.s, t, o)
    const tc = side === 'hot' ? cfg.hot : cfg.cold
    inSprite(x, F, () => {
      if (heat) sweatCells(x, t)
      if (frost) frostCells(x)
      if (tc.prop && WORN[tc.prop] && o.worn !== false) WORN[tc.prop](x, t, tc.col, tc.col2)
      if (tears) tearsCells(x, t, tears)
    })
    return F
  }
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
      await Promise.all(["800 104px Inter", "800 52px Inter", "800 44px Inter", "800 28px Inter", "italic 500 140px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 22px 'Space Mono'", "700 17px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    // the hook caption is already landed on frame 0 (the thumbnail)
    const H0 = popText(root, cfg.hook, { top: 150, size: 76, accentSize: 104, at: -2, gap: 0.01, accentColor: cfg.accent || GOLD, fit: true })
    const HH = popText(root, '*Hot* take:', { top: 160, size: 92, accentSize: 140, at: T.hot[0] + 0.06, gap: 0.08, accentColor: FIRE })
    const HC = popText(root, '*Cold* take:', { top: 160, size: 92, accentSize: 140, at: T.cold[0] + 0.12, gap: 0.08, accentColor: ICE })
    const HW = popText(root, '*Warm* take:', { top: 160, size: 92, accentSize: 140, at: T.warm[0] + 0.2, gap: 0.08, accentColor: AMBER })
    const stickers = [
      buildSticker(root, { text: cfg.hot.take, deep: '#c4361a', badge: FIRE, icon: 'fire', at: T.hot[0] + 0.4, out: [T.hot[1] - 0.18, T.hot[1]], tilt: -1.8 }),
      buildSticker(root, { text: cfg.cold.take, deep: '#2a6fb8', badge: ICE, icon: 'frost', at: T.cold[0] + 0.45, out: [T.cold[1] - 0.18, T.cold[1]], tilt: 1.6 }),
    ]
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, 0)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    // ── 0–2.4 the hook: split screen
    function hook(t) {
      if (t >= T.hot[0]) return
      fireHalf(x, t, 0, 540); frostHalf(x, t, 540, 1080)
      // the seam
      for (let y = 432; y < 1920; y += 24) R(x, (y / 24) % 2 ? FIRE : ICE, 534, y, 12, 24)
      const hHops = [-0.15, 0.5, 1.15, 1.8]
      shadow(x, 270, 1150, 230); shadow(x, 810, 1150, 230)
      const ho = { x: 270, y: 990, s: 250, mood: t < 1.2 ? 'sparkle' : 'happy', look: [1, -0.3], hops: hHops }
      hotStar(x, t, ho); deco(x, t, 'hot', { ...ho, worn: false }, { heat: 1, tears: pisMain === 'hot' ? 1 : 0 })
      const jit = Math.sin(t * 52) * 3
      const co = { x: 810 + jit, y: 990, s: 250, mood: 'squint', look: [-1, 0], squash: 0.03 * Math.sin(t * 47), bob: 2 }
      coldStar(x, t, co); deco(x, t, 'cold', { ...co, worn: false }, { frost: 1, tears: pisMain === 'cold' ? 1 : 0 })
      shiverBits(x, t, 880, 780, 1)
      tag(x, t, 270, 600, 'HOT TAKE', EMBER, 'fire', 1 + 0.04 * Math.sin(t * 6))
      tag(x, t, 810, 600, 'COLD TAKE', ICE, 'frost', 1 + 0.04 * Math.sin(t * 6 + 1.5))
      const lv = 0.5 + 0.12 * Math.sin(t * 3.4)
      thermo(x, t, 540, 700, 470, lv, lv > 0.5 ? FIRE : '#5aa9ff', { w: 56 })
      // Pisces at the bottom, sniffling into a tissue
      if (!pisMain) { tissues(x, 290, 1610, 70); pisces(x, t, { x: 400, y: 1560, s: 150 }, 1, 'wide', [1, -1]) }
    }

    // ── a take (hot or cold): the side takes the frame
    function take(t, side) {
      const [a, b] = side === 'hot' ? T.hot : T.cold
      if (t < a || t >= b) return
      const u = t - a, tc = side === 'hot' ? cfg.hot : cfg.cold
      if (side === 'hot') fireHalf(x, t, 0, 1080); else frostHalf(x, t, 0, 1080)
      const punch = 1 + 0.07 * (1 - ease.outCubic(prog(t, a, a + 0.28)))
      x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
      const [hx, hy] = tc.at || [330, 1010]
      shadow(x, hx, hy + 150, 250)
      const S = { u, t0: a, t1: b, side, x, t }
      const pr = PROPS[tc.prop]
      const [px, py] = tc.propAt || [730, 860]
      const pk = pop01(t, a + 0.15, 0.3, 2.2)
      if (pr && tc.prop !== 'none' && pk > 0.01) pr(x, t, px, py, (tc.propK || 1) * pk, { text: tc.text, n: tc.n, u, t0: a, ...(tc.propOpts || {}) })
      if (side === 'hot') {
        const hops = tc.hops || [a + 0.12, a + 0.7, a + 1.3, a + 1.9, a + 2.4]
        const o = { x: hx + (tc.wobble ? 14 * Math.sin(t * 9) : 0), y: hy, s: 290, mood: tc.mood || (u < 1.2 ? 'sparkle' : 'happy'), look: tc.look || [1, -0.4], hops, squash: tc.wobble ? 0.05 * Math.sin(t * 9) : 0 }
        hotStar(x, t, o); deco(x, t, 'hot', o, { heat: tc.noSweat ? 0 : 1, tears: pisMain === 'hot' ? 2 : 0 })
      } else {
        const jit = tc.still ? 0 : Math.sin(t * 52) * 3
        const o = { x: hx + jit, y: hy, s: 290, mood: tc.mood || 'squint', look: tc.look || [1, 0], squash: tc.still ? 0 : 0.025 * Math.sin(t * 47), bob: tc.still ? undefined : 2, hops: tc.hops || [a + 0.3] }
        coldStar(x, t, o); deco(x, t, 'cold', o, { frost: 1, tears: pisMain === 'cold' ? 2 : 0 })
        if (!tc.still) shiverBits(x, t, hx + 140, hy - 190, 1)
      }
      if (tc.extra) tc.extra(x, t, S)
      x.restore()
      bubble(x, t, tc.sayAt ? tc.sayAt[0] : hx + 60, tc.sayAt ? tc.sayAt[1] : 640, a + 0.9, b, tc.say, { size: 40, col: side === 'hot' ? '#fff1dc' : FROST, tail: -0.3 })
      // the thermometer: shoots up and rattles (hot) / drops and frosts (cold)
      const lv = side === 'hot' ? lerp(0.5, 0.98, ease.outCubic(prog(t, a + 0.1, a + 0.7))) : lerp(0.5, 0.03, ease.outCubic(prog(t, a + 0.1, a + 0.8)))
      thermo(x, t, 990, 520, 560, lv, side === 'hot' ? RED : '#5aa9ff', { w: 46, rattle: side === 'hot' && u > 0.6 ? 2.5 : 0 })
      if (side === 'hot' && u > 0.65) sparkles(x, t, 990, 500, a + 0.65, 8, 70, 1, [FIRE, GOLD, EMBER])
      // Pisces in the corner, sniffling
      if (!pisMain) {
        const k = pop01(t, a + 0.3, 0.3, 2) * outK(t, [b - 0.15, b])
        if (k > 0.01) { tissues(x, PIS_DEF.x - 90, PIS_DEF.y + 30, 60 * Math.min(1, k)); pisces(x, t, { ...PIS_DEF, pop: k }, side === 'hot' ? 1 : 2, 'wide', [-1, -0.6]) }
      }
    }

    // ── 8.2–11.6 the warm take
    function warm(t) {
      if (t < T.warm[0] || t > T.out[1]) return
      const ok = popOut(t, T.out)
      const m = ease.inOutCubic(prog(t, ...T.melt))
      // the frost melts into amber: cold half fades, a warm glow rises
      frostHalf(x, t, 0, 1080, 1 - m)
      x.save(); x.globalAlpha = m
      const g = x.createRadialGradient(540, 1000, 80, 540, 1000, 1100)
      g.addColorStop(0, 'rgba(255,196,107,0.38)'); g.addColorStop(1, 'rgba(255,140,80,0.10)')
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore()
      snow(x, t, 0, 1080, 0.45 * m + (1 - m), 22)
      // the thermometer glides to the middle and settles on JUST RIGHT
      const lv = lerp(0.03, 0.44, easeOutBack(prog(t, T.warm[0] + 0.1, T.warm[0] + 0.9), 1.6))
      const tx = lerp(990, 540, ease.inOutCubic(prog(t, T.warm[0], T.warm[0] + 0.6))), ty = lerp(520, 400, ease.inOutCubic(prog(t, T.warm[0], T.warm[0] + 0.6)))
      const ts = lerp(1, 0.62, ease.inOutCubic(prog(t, T.warm[0], T.warm[0] + 0.6)))
      x.save(); x.globalAlpha = clamp(ok)
      thermo(x, t, tx, ty, 560, lv, AMBER, { w: 46, scale: ts, labels: false })
      const jk = pop01(t, T.warm[0] + 0.85, 0.3, 2.4) * ok
      if (jk > 0.01) { x.save(); x.translate(tx + 120, ty + 150); x.rotate(-0.06); x.scale(jk, jk); box(x, -100, -28, 200, 56, AMBER, { b: 5 }); x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('JUST RIGHT', 0, 2); x.restore(); drawBits(x, HEART, { H: '#ff5c8a' }, tx - 70, ty + 150, 6 * jk) }
      x.restore()
      sparkles(x, t, tx, ty + 200, T.warm[0] + 0.85, 10, 120, 2, [AMBER, GOLD, BONE])
      if (ok <= 0) return
      // THE STARS in the middle
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      shadow(x, 540, 1250, 230 * sk)
      if (sk > 0.01) drawStarChar(x, 540, 1060, 240, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [0, -0.2], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.15 })
      // the two signs either side, calmed down (the hot one cooled, the cold one thawed)
      const hk = pop01(t, T.sidesIn, 0.34, 2.2) * ok, ck = pop01(t, T.sidesIn + 0.12, 0.34, 2.2) * ok
      if (hk > 0.01) { const o = { x: 190, y: 1180, s: 170, pop: hk, mood: 'happy', look: [1, -0.3], hops: [T.sidesIn + 0.3, T.last + 2.2] }; shadow(x, 190, 1290, 150 * hk); hotStar(x, t, o); deco(x, t, 'hot', o, { tears: pisMain === 'hot' ? (t > T.pisFount ? 3 : 2) : 0 }) }
      if (ck > 0.01) { const o = { x: 890, y: 1180, s: 170, pop: ck, mood: 'happy', look: [-1, -0.3], hops: [T.sidesIn + 0.42, T.last + 2.3] }; shadow(x, 890, 1290, 150 * ck); coldStar(x, t, o); deco(x, t, 'cold', o, { tears: pisMain === 'cold' ? (t > T.pisFount ? 3 : 2) : 0 }); if (t > T.sidesIn + 0.4) hearts(x, t, T.sidesIn + 0.5, 890, 1060, { n: 3 }) }
      // Pisces: peeks over the dialogue box, happy-tear fountains
      if (!pisMain) {
        const pk = pop01(t, T.sidesIn + 0.3, 0.34, 2.2) * ok
        if (pk > 0.01) pisces(x, t, { x: 540, y: 1335, s: 140, pop: pk, hops: [T.pisFount, T.pisFount + 0.6] }, t > T.pisFount ? 3 : 2, 'sparkle', [0, -1])
      }
      if (cfg.warmExtra) cfg.warmExtra(x, t, { ok })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        hook(t)
        take(t, 'hot')
        take(t, 'cold')
        warm(t)
        H0.update(t, outK(t, T.hookOut))
        HH.update(t, t < T.hot[1] ? outK(t, [T.hot[1] - 0.15, T.hot[1]]) : 0)
        HC.update(t, t < T.cold[1] ? outK(t, [T.cold[1] - 0.15, T.cold[1]]) : 0)
        HW.update(t, outK(t, T.out))
        stickers.forEach(s => s.update(t))
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const c = T.hot[0], fl = t >= c && t < c + 0.14 ? 1 - (t - c) / 0.14 : 0
        flash.style.opacity = String(0.6 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate: the swap into the cold take
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const sub = (list, a) => (list || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)])
  const CUES = [
    ['pop', 0.02, 880, 0.04, -0.3], ['pop', 0.1, 1318.51, 0.03, 0.3], ['tick', 0.02, 0.05],
    ...[0.5, 1.15, 1.8].map(h => ['pop', r3(h + 0.05), 987.77, 0.025, -0.4]),
    ['tick', 0.9, 0.03], ['tick', 1.6, 0.03],
    // the hot take: jump cut, header, sticker, bubble, the thermometer shoots up
    ['whoosh', r3(T.hot[0] - 0.1), 0.3, 0.04], ['tick', T.hot[0], 0.06], ['boom', T.hot[0], 0.18],
    ['pop', r3(T.hot[0] + 0.06), 1174.66, 0.04, 0], ['pop', r3(T.hot[0] + 0.14), 1567.98, 0.03, 0],
    ['riser', r3(T.hot[0] + 0.1), 0.6, 0.02], ['pop', r3(T.hot[0] + 0.4), 1174.66, 0.045, 0.1], ['tick', r3(T.hot[0] + 0.42), 0.04],
    ['pop', r3(T.hot[0] + 0.9), 1318.51, 0.035, -0.3], ['glitter', r3(T.hot[0] + 0.65), r3(T.hot[0] + 1.0)],
    ...sub(cfg.hot.cues, T.hot[0]),
    // the cold take (under the card cut)
    ['pop', r3(T.cold[0] + 0.12), 659.25, 0.04, 0], ['pop', r3(T.cold[0] + 0.2), 587.33, 0.03, 0],
    ['pluck', r3(T.cold[0] + 0.3), 2349.32, 0.02, 0.3, 0.6], ['pop', r3(T.cold[0] + 0.45), 880, 0.045, -0.1], ['tick', r3(T.cold[0] + 0.47), 0.04],
    ['bell', r3(T.cold[0] + 0.6), 2637.02, 0.02, 1.0, 0.3], ['pop', r3(T.cold[0] + 0.9), 739.99, 0.035, 0.3],
    ...sub(cfg.cold.cues, T.cold[0]),
    // the warm take
    ['whoosh', r3(T.warm[0] - 0.05), 0.5, 0.03], ['glitter', T.warm[0], r3(T.warm[0] + 0.6)],
    ['pop', r3(T.warm[0] + 0.2), 880, 0.035, 0], ['bell', r3(T.warm[0] + 0.85), 1760, 0.03, 1.2, 0], ['pop', r3(T.warm[0] + 0.85), 1318.51, 0.035, 0.2],
    ['pop', T.starsIn + 0.05, 739.99, 0.035, 0], ['pop', T.sidesIn + 0.05, 987.77, 0.03, -0.4], ['pop', r3(T.sidesIn + 0.17), 1174.66, 0.03, 0.4],
    ['pluck', T.pisFount, 1567.98, 0.035, 0.4, 0.2], ['glitter', T.pisFount, r3(T.pisFount + 0.3)],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
