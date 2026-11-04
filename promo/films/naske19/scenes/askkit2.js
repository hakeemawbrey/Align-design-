// askkit2 — the shared look of Ask the Stars, Volume 2 (naske19 … naske36, promo/films/next30/b26.md). Every episode
// imports this file from naske19/scenes, so all eighteen read as one format. Read-only for the other films.
//
// The format (20 s, story 0–15.6, then the shared end card with the default CTA):
//   0.00–2.70   hook: the viewer's anonymous DM (the question) buzzes at the top; the answering sign's star is already
//               mid-action in its winter gag below it. Light pixel snow falls all film. Bug "ASK THE STARS" top-left.
//   2.70        the DM tucks away into a small "ASKED" strip at the top (so the question stays readable).
//   3.00–12.0   the sign's star answers in three box lines (3.0, 5.9, 8.8), each with its own visual beat (cfg.scene).
//               One real-astrology chip under the scene. Pisces sniffles in the background with a tissue box.
//   8.75        the one card-cut candidate (cardfx picks it; it hides the swap into beat 3).
//   12.1–15.5   the last line pops in big; the sign's star beams and Pisces happy-cries beside it.
// Pisces cries in every episode (in the Pisces episodes, the hero does).
//
//   makeAsk(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.sign ('libra'), cfg.name ('LIBRA'), cfg.question ('How do we *disagree* without a fight?'), cfg.qSize (DM type px)
//     cfg.lines: three strings (≤ 46 chars), cfg.chip ('♎ CARDINAL AIR · RULED BY VENUS', '|' = second row)
//     cfg.last ('Same *team.* | Different view.'), cfg.lastLate (how many end words pop late, default 1)
//     cfg.scene(x, t, S): draws the hero and its props for 0–12.0. S = { k: beat index 0–3 (0 = hook), u: time into it,
//       b: [beat starts], hero(x, t, o), partner(x, t, o), pisces(x, t, P, tears, mood, look), out (1 → 0 at 12.0) }
//     cfg.finale(x, t, S) optional: replaces the default finale cast. cfg.pis: background Pisces {x, y, s} or false.
//     cfg.partner: a sign id for the partner star (default 'leo'). cfg.cues: extra sound cues (absolute times).
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9b8f0', RED = '#e8344e', ICE = '#bfe9ff', SNOW = '#f4f8ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const GLYPH = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
export const BUG_COL = '#9fd8ff'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in all eighteen films)
export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
export const T = {
  bug: 0, dmOut: [2.5, 2.8], asked: 2.75,
  open: 2.82, l: [3.0, 5.9, 8.8], chip: 3.55, close: 12.0,
  cut: 8.75, last: 12.12, lastLand: 12.62, finIn: 12.05, pisIn: 12.3,
  out: [15.1, 15.5], bugOut: [15.2, 15.5],
}
export const BEATS = [0, ...T.l]           // beat k starts at BEATS[k] (0 = the hook)
const CPS = 30

// ── drawing helpers (canvas)
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
export const MUG = ['.SSS.....', '..S.S....', 'WWWWWWW..', 'WCCCCCWWW', 'WWWWWWW.W', 'WWWWWWW.W', 'WWWWWWWWW', '.WWWWW...']
/** a steaming mug (cols: W body, C cocoa) */
export function mug(x, t, cx, cy, cell, { body = '#f5eedf', cocoa = '#7a4a2a', alpha = 1, rot = 0 } = {}) {
  drawBits(x, MUG.slice(2), { W: body, C: cocoa }, cx, cy, cell, { alpha, rot })
  x.save(); x.globalAlpha *= alpha * 0.7; x.fillStyle = BONE
  for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i * 0.33) % 1; x.globalAlpha = alpha * 0.7 * Math.sin(Math.PI * ph); x.fillRect(Math.round(cx - cell * 2 + i * cell * 1.6 + Math.sin(ph * 6 + i) * cell * 0.6), Math.round(cy - cell * 4 - ph * cell * 6), cell * 0.8, cell * 0.8) }
  x.restore()
}
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
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, alpha = 1 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
  return { w, h }
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
/** a pixel snow bank along the floor at y */
export function snowBank(x, y, { a = 1, x0 = 0, x1 = 1080 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  for (let X = x0; X < x1; X += 24) { const h = 22 + 14 * Math.abs(Math.sin(X * 0.013)) + 8 * Math.abs(Math.sin(X * 0.051)); R(x, INK, X, y - h - 6, 24, h + 40); R(x, '#dfe9f7', X, y - h, 24, h + 40); R(x, SNOW, X, y - h, 24, 8) }
  x.restore()
}
/** a talk card (face up with text, or a face-down back) */
export function talkCard(x, cx, cy, w, { rot = 0, text = '', kicker = 'TALK CARD', color = GOLD, alpha = 1, back = false, size = 34 } = {}) {
  const h = w * 1.4
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  R(x, 'rgba(6,4,18,0.5)', -w / 2 + 10, -h / 2 + 14, w, h)
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  if (back) {
    R(x, '#2a1d5c', -w / 2, -h / 2, w, h); x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28)
    drawPixelStar(x, 0, 0, w * 0.3, 2, GOLD)
  } else {
    R(x, BONE, -w / 2, -h / 2, w, h); R(x, color, -w / 2, -h / 2, w, 12)
    x.font = `700 ${Math.round(size * 0.62)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = color === GOLD ? '#8a6a1c' : color
    x.fillText(kicker, 0, -h / 2 + 50)
    x.font = `800 ${size}px ${INTER}`; x.fillStyle = INK
    const words = text.split(' '), rows = []; let cur = ''
    for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr).width > w - 40 && cur) { rows.push(cur); cur = wd } else cur = tr }
    if (cur) rows.push(cur)
    rows.forEach((r, i) => x.fillText(r, 0, (i - (rows.length - 1) / 2) * size * 1.18 + 10))
  }
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props and tears sit on the sprite through hops and squash
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
/** draw in sprite cells (0…36) of a star drawn with the same options */
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
/** a scarf wrapped under the eyes (sprite cells) */
export function scarfCells(ctx, col = '#e8414f', stripe = BONE, tail = 0) {
  ctx.fillStyle = INK; ctx.fillRect(8.4, 23.6, 19.2, 4.4); ctx.fillStyle = col; ctx.fillRect(9, 24.2, 18, 3.2)
  ctx.fillStyle = stripe; for (let i = 0; i < 4; i++) ctx.fillRect(10.5 + i * 4.5, 24.2, 1.2, 3.2)
  ctx.fillStyle = INK; ctx.fillRect(22.4, 26.6, 4.4, 7 + tail); ctx.fillStyle = col; ctx.fillRect(23, 27, 3.2, 6.2 + tail)
}
/** a bobble hat on the top point (sprite cells) */
export function hatCells(ctx, col = '#4fb3ff', band = BONE) {
  ctx.fillStyle = INK; ctx.fillRect(13.4, 1.4, 9.2, 6.4); ctx.fillRect(16.2, -1.6, 3.6, 3.6)
  ctx.fillStyle = col; ctx.fillRect(14, 2, 8, 5); ctx.fillStyle = band; ctx.fillRect(14, 5.6, 8, 1.6); ctx.fillRect(16.8, -1, 2.4, 2.4)
}
/** a tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ── the falling snow: chunky pixel flakes, pure f(t)
function drawSnow(x, t, a = 1) {
  x.save()
  for (let i = 0; i < 46; i++) {
    const sp = 60 + (i * 37) % 70, sz = 6 + (i % 3) * 3
    const yy = ((i * 211.7 + t * sp) % 2000) - 40
    const xx = ((i * 389.3) % 1080) + Math.sin(t * 0.8 + i) * 18
    x.globalAlpha = a * (0.35 + 0.4 * ((i * 13) % 5) / 4)
    x.fillStyle = SNOW; x.fillRect(Math.round(xx), Math.round(yy), sz, sz)
  }
  x.restore()
}

// ── the bug: "ASK THE STARS" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(159,216,255,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.22em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'ASK&nbsp;<span style="color:rgba(255,255,255,0.62)">THE&nbsp;STARS</span>')
  return { update(t, out = 1) { b.style.display = out <= 0 ? 'none' : 'flex'; b.style.opacity = String(out) } }
}

/** rich text: `*word*` → Garamond italic accent */
function richHTML(text, accent, accentScale = 1.12) {
  return text.split(' ').map(w => {
    if (w === '|') return '<br>'
    const acc = w.startsWith('*') || w.endsWith('*')
    const s = w.replace(/\*/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
    return acc ? `<span style="font-family:${SERIF};font-style:italic;font-weight:500;font-size:${accentScale}em;color:${accent};letter-spacing:0">${s}</span>` : s
  }).join(' ').replace(/ <br> /g, '<br>')
}
const ENV = ['GGGGGGGGG', 'GBGGGGGBG', 'GBBGGGBBG', 'GBGBGBGBG', 'GBBGBGBBG', 'GBBBBBBBG', 'GGGGGGGGG']

/** the viewer's question as a phone DM notification: settled at t = 0 (buzzing); out 1→0 slides it up and away */
function dmCard(parent, { question, accent, top = 150, size = 92 }) {
  const root = el('div', { position: 'absolute', left: '60px', top: top + 'px', width: '960px', transformOrigin: '50% 0%' }, parent)
  el('div', { position: 'absolute', inset: '0', borderRadius: '40px', background: 'linear-gradient(180deg, rgba(38,26,78,0.95), rgba(20,13,46,0.95))',
    border: '3px solid rgba(239,230,214,0.28)', boxShadow: '0 18px 60px rgba(4,2,14,0.75), inset 0 2px 0 rgba(255,255,255,0.08)' }, root)
  const head = el('div', { position: 'relative', display: 'flex', alignItems: 'center', gap: '18px', padding: '30px 40px 0 40px', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: GOLD }, root)
  const ic = el('canvas', { width: '63px', height: '49px', imageRendering: 'pixelated', flex: '0 0 auto' }, head)
  ic.width = 63; ic.height = 49
  { const c = ic.getContext('2d'); ENV.forEach((r, j) => [...r].forEach((ch, i) => { c.fillStyle = ch === 'G' ? GOLD : '#2a1d5c'; c.fillRect(i * 7, j * 7, 7, 7) })) }
  el('div', { flex: '1 1 auto' }, head, 'NEW QUESTION')
  el('div', { font: `400 28px ${MONO}`, color: LAV, letterSpacing: '0.04em' }, head, 'now')
  el('div', { position: 'relative', padding: '6px 40px 0 121px', font: `400 28px ${MONO}`, color: LAV, letterSpacing: '0.04em' }, root, 'asked anonymously')
  el('div', { position: 'relative', padding: '16px 44px 42px 44px', fontFamily: INTER, fontWeight: 800, fontSize: size + 'px', lineHeight: 1.04, color: BONE, letterSpacing: '-0.015em',
    textShadow: '0 3px 0 rgba(6,4,18,0.7)' }, root, richHTML(question, accent))
  return {
    update(t, out = 1) {
      root.style.display = out > 0 ? 'block' : 'none'
      if (out <= 0) return
      const buzz = Math.sin(t * 46) * 7 * Math.exp(-t * 1.1) + (t > 1.2 && t < 1.6 ? Math.sin(t * 52) * 5 * Math.sin(Math.PI * (t - 1.2) / 0.4) : 0)
      const sc = lerp(0.82, 1, out)
      root.style.opacity = String(out)
      root.style.transform = `translate(${buzz.toFixed(2)}px, ${((1 - out) * -90).toFixed(1)}px) scale(${sc.toFixed(4)}) rotate(${(buzz * 0.08).toFixed(2)}deg)`
    },
  }
}
/** the question kept small at the top while the star answers */
function askedStrip(parent, { question, accent, at, out }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '134px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, parent)
  const pill = el('div', { maxWidth: '940px', padding: '14px 28px 14px', borderRadius: '22px', background: 'rgba(20,13,46,0.88)', border: '3px solid rgba(239,230,214,0.25)',
    font: `800 38px ${INTER}`, color: BONE, letterSpacing: '-0.005em', textAlign: 'center', lineHeight: 1.15, boxShadow: '0 10px 30px rgba(4,2,14,0.6)' }, wrap,
    `<span style="font:700 24px ${MONO};letter-spacing:0.12em;color:${GOLD};margin-right:14px;vertical-align:3px">ASKED</span>` + richHTML(question.replace(/\s*\|\s*/g, ' '), accent, 1.15))
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.35), 2), o = outK(t, out)
      pill.style.opacity = String(clamp(k * 2) * o)
      pill.style.transform = `translateY(${((1 - k) * -30).toFixed(1)}px) scale(${lerp(0.7, 1, k).toFixed(4)})`
    },
  }
}
/** the real-astrology note: a small pill. text rows separated by '|' */
function noteChip(parent, { text, color, top = 1330, at, size = 29 }) {
  const root = el('div', { position: 'absolute', left: '0', width: '1080px', top: top + 'px', display: 'none', justifyContent: 'center' }, parent)
  const pill = el('div', { padding: '13px 30px 12px', borderRadius: '999px', background: 'rgba(16,10,38,0.92)', border: `3px solid ${color}`, boxShadow: `0 0 26px ${color}55, 0 8px 30px rgba(4,2,14,0.7)`,
    font: `700 ${size}px ${MONO}`, letterSpacing: '0.05em', color: BONE, textAlign: 'center', lineHeight: 1.3, transformOrigin: '50% 50%', maxWidth: '900px' }, root,
    text.split('|').join('<br>').replace(/^(\S+)/, `<span style="font-family:${GLYPH};font-size:1.25em;color:${color};margin-right:0.3em;vertical-align:-0.06em">$1\uFE0E</span>`))
  return {
    update(t, out = 1) {
      const show = t >= at && out > 0
      root.style.display = show ? 'flex' : 'none'
      if (!show) return
      const p = easeOutBack(prog(t, at, at + 0.36), 2.6)
      pill.style.opacity = String(clamp(p * 3) * out)
      pill.style.transform = `scale(${(lerp(0.4, 1, p) * lerp(0.8, 1, out)).toFixed(4)}) rotate(${((1 - p) * -5).toFixed(2)}deg)`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeAsk(cfg) {
  const HERO = signStar(cfg.sign), PIS = signStar('pisces'), PART = signStar(cfg.partner || 'leo')
  const SPEAK = `${HERO.glyph} ${cfg.name} STAR`
  const tints = cfg.tints || [HERO.color, cfg.tint2 || '#ffd28a', HERO.color]
  const LINES = cfg.lines.map((text, i) => ({ t: T.l[i], speaker: SPEAK, text, color: tints[i] }))
  const HOPS = talkHops(LINES, SPEAK, { cps: CPS })
  const FIN_HOPS = [T.finIn + 0.3, T.lastLand + 0.02, T.lastLand + 1.3]
  const PIS_DEF = { x: 952, y: 1218, s: 118 }

  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const partner = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: PART.color, glyph: o.s >= 150 ? PART.glyph : null, seed: 7, glow: 1, ...o })
  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.85, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: P.tips ?? false, squash: P.squash || 0 }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  const lineHops = i => HOPS.filter(h => h >= T.l[i] && h < (T.l[i + 1] ?? T.close))

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 92px Inter", "800 38px Inter", "800 28px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'", "400 28px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const DM = dmCard(root, { question: cfg.question, accent: cfg.accent || HERO.color, size: cfg.qSize || 92 })
    const ASKED = askedStrip(root, { question: cfg.question, accent: cfg.accent || HERO.color, at: T.asked, out: [T.close - 0.15, T.close + 0.05] })
    const CHIP = noteChip(root, { text: cfg.chip, color: HERO.color, at: T.chip, top: cfg.chipTop || 1330 })
    const H2 = popText(root, cfg.last, { top: cfg.lastTop || 330, size: cfg.lastSize || 120, accentSize: cfg.lastAccent || 168, at: T.last, gap: 0.08, late: cfg.lastLate ?? 1, lateAt: T.lastLand, lateGap: 0.12, accentColor: cfg.accent || HERO.color, lineHeight: 1.0, fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function finale(t) {
      if (t < T.finIn || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const S = { hero, partner, pisces, ok, FIN_HOPS, x: tx }
      if (cfg.finale) { cfg.finale(x, t, S); return }
      const hk = pop01(t, T.finIn, 0.4, 2.2) * ok
      if (hk > 0.01) {
        shadow(x, 330, 1420, 280 * hk)
        hero(x, t, { x: 330, y: 1210, s: 340, pop: hk, mood: t > T.lastLand ? 'happy' : 'sparkle', look: [0.6, -0.3], hops: FIN_HOPS })
        if (cfg.finProp) cfg.finProp(x, t, { ...S, k: hk })
      }
      const pk = pop01(t, T.pisIn, 0.38, 2.2) * ok
      if (pk > 0.01) {
        shadow(x, 770, 1420, 230 * pk)
        tissues(x, 950, 1400, 100 * pk)
        pisces(x, t, { x: 770, y: 1240, s: 270, pop: pk, hops: [T.pisIn + 0.3, T.lastLand + 0.1, T.lastLand + 1.6] }, t > T.lastLand ? 3 : 2, 'sparkle', [-1, -0.4])
      }
      hearts(x, t, T.lastLand + 0.1, 550, 1080, { n: 6, cell: 7, spread: 260 })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.85 })
        drawSnow(x, t, 1)
        if (cfg.backdrop) cfg.backdrop(x, t)
        if (t < T.close + 0.4) {
          const k = t < T.l[0] ? 0 : t < T.l[1] ? 1 : t < T.l[2] ? 2 : 3
          const out = outK(t, [T.close - 0.05, T.close + 0.35])
          // Pisces in the background, sniffling more each beat
          const P = cfg.pis === false ? null : { ...PIS_DEF, ...(cfg.pis || {}) }
          if (P && t > T.l[0] + 0.2) {
            const pk = pop01(t, T.l[0] + 0.25, 0.3, 2) * out
            if (pk > 0.01) { tissues(x, P.x - P.s * 0.7, P.y + P.s * 0.28, P.s * 0.5 * Math.min(1, pk)); pisces(x, t, { ...P, pop: pk }, k >= 3 ? 2 : 1, k >= 3 ? 'sparkle' : 'wide', P.look || [-1, -0.6]) }
          }
          cfg.scene(x, t, { k, u: t - BEATS[k], b: BEATS, hero, partner, pisces, out, hops: lineHops, tx, HERO, PART })
        }
        finale(t)
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.top) cfg.top(tx, t)
        sparkles(tx, t, 540, 400, T.lastLand + 0.02, 12, 380, 1, [GOLD, BONE, PINK])
        DM.update(t, outK(t, T.dmOut))
        ASKED.update(t)
        CHIP.update(t, outK(t, [T.close - 0.1, T.close + 0.1]))
        box1.update(t)
        H2.update(t, outK(t, T.out))
        bug.update(t, outK(t, T.bugOut))
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate: under the swap into beat 3
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const nW = cfg.last.split(' ').filter(w => w !== '|').length, late = cfg.lastLate ?? 1
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    // the DM buzz at the top
    ['pop', 0.02, 987.77, 0.045, 0], ['pop', 0.09, 1318.51, 0.03, 0], ['tick', 0.12, 0.04], ['tick', 0.24, 0.035], ['tick', 0.36, 0.03],
    ['tick', 1.24, 0.03], ['tick', 1.36, 0.03], ['tick', 1.48, 0.025],
    ['whoosh', T.dmOut[0], 0.3, 0.03], ['pop', r3(T.asked + 0.1), 880, 0.03, 0],
    ['pop', T.open, 739.99, 0.04, 0], ['pop', r3(T.open + 0.06), 987.77, 0.03, 0],
    ...talkCues(LINES, { cps: CPS }),
    ['pluck', T.chip, 1174.66, 0.04, 0.5, 0],
    ['pop', r3(T.l[0] + 0.3), 1567.98, 0.02, 0.6], ['pluck', r3(T.l[2] + 0.4), 2349.32, 0.014, 0.3, 0.6],
    ['pop', T.close, 880, 0.03, 0], ['pop', r3(T.close + 0.07), 587.33, 0.03, 0],
    // the last line
    ...wordPops(T.last, nW - late, 0.08, 1), ['pop', T.lastLand, 1318.51, 0.05, 0], ['pluck', T.lastLand, 1174.66, 0.05, 0.7, 0], ['bell', r3(T.lastLand + 0.3), 1760, 0.022, 1.0, 0],
    ['glitter', r3(T.lastLand + 0.02), r3(T.lastLand + 0.5)], ['pop', r3(T.pisIn + 0.05), 987.77, 0.03, 0.4],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
