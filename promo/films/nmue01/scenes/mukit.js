// THE MAKE-UP TALK: the shared show kit for nmue01–nmue12 (promo/films/next30/b31.md). The other episodes import it
// from here (promo/films/nmue01/scenes/mukit.js). Pure f(t): DOM / canvases are only made inside build().
//
// The spine (28 s, story 0–25.6, then the shared short 2.4 s end card):
//   0.00–3.00   HOOK   the hook headline is already up at frame 0 (the thumbnail); the couple, just after the fight, is
//                      mid-hop; a CRACKED pixel heart floats between them. The bug "THE MAKE-UP TALK" sits top-left.
//   3.00–9.60   TRAP   what we tend to do (the gag). Headline 2.
//   9.60        a hard cut into the move (no card transition).
//   9.70–17.20  MOVE   THE STARS' advice in the box (two lines) with a demo. Headline 3.
//   17.20–22.40 TRY    the couple tries it (one or two lines in the box); the heart MENDS with gold seams at T.mend.
//   22.40–25.50 LAST   the last line; the mended heart glows; everything pops out by 25.5.
// Pisces cries in the background of every beat (or inside the couple when Pisces is one of them).
//
// makeEpisode(cfg) → { DURATION, SCENES, CUES, T }
//   cfg.id, cfg.ep, cfg.A / cfg.B   sign ids ('aries'…), the couple (A stands left, B right)
//   cfg.heads = { hook, trap, move, try, last }   headline texts ('|' = line break, *accent*)
//   cfg.accent                       the headline accent colour (default rose)
//   cfg.lines = [{ t, who: 'S'|'A'|'B', text }]   box lines (the box opens at 10.0, closes at 22.25)
//   cfg.hook / trap / move / try / last (x, t, S)   beat draws. S = { u, t0, t1, A(x,t,o), B(x,t,o), stars(x,t,o),
//                      pisces(x,t,o,tears), couple(x,t,o), heart(x,t,o), bubble, ... }. Without a draw the kit draws the couple.
//   cfg.pis = { hook, trap, move, try }   background Pisces spots { x, y, s } (null = none), cfg.pisInCouple = true to skip
//   cfg.heart = { hook: {x,y,cell}, try: {x,y,cell} }   heart spots
//   cfg.cues                         extra sound cues (absolute times)
//   cfg.images = { key: 'card-talk-5.png' }   promo/assets images, loaded at build, handed to the beats as S.img[key]
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const ROSE = '#ffb39a', MINT = '#9fe6b0', SKYB = '#7fd0ff', CREAM = '#fff1c8'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in all twelve films)
export const DURATION = 28                                // the story (25.6) + the short end card (2.4)
export const STORY_END = DURATION - ENDCARD_SHORT_LEN    // 25.6
export const T = {
  bug: -1, hookOut: [2.82, 3.0],
  trap: [3.0, 9.6], h1: 3.08, h1Out: [9.35, 9.55],
  cut: 9.6,
  move: [9.7, 17.2], h2: 9.8, h2Out: [16.98, 17.18], starsIn: 9.75, starsOut: [16.95, 17.25],
  boxOpen: 10.0, boxClose: 22.2,
  try: [17.2, 22.4], h3: 17.28, h3Out: [22.15, 22.35], heartIn: 17.4, mend: 21.0,
  last: [22.4, 25.5], h4: 22.5, h4Land: 23.05, out: [25.05, 25.48], bugOut: [25.2, 25.5],
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** a pixel speech bubble (canvas), popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, rot = 0 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
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
/** pixel label text on canvas, with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a pixel card / note (bone panel with ink border) with centred lines of text; k scales it in */
export function note(x, cx, cy, w, h, lines, { k = 1, rot = 0, col = BONE, ink = INK, size = 34, font = INTER, weight = 800, accent = RED, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 12, -h / 2 + 14, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 6 })
  x.textAlign = 'center'; x.textBaseline = 'middle'
  const lh = size * 1.25, y0 = -(lines.length - 1) * lh / 2
  lines.forEach((ln, i) => {
    const acc = ln.startsWith('*')
    x.font = acc ? `italic 600 ${size * 1.12}px ${SERIF}` : `${weight} ${size}px ${font}`
    x.fillStyle = acc ? accent : ink
    x.fillText(ln.replace(/\*/g, ''), 0, y0 + i * lh + 2)
  })
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { if (w <= 1) return; x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** pixel steam / heat puffs rising from (cx, cy) */
export function steam(x, t, cx, cy, { n = 5, a = 1, col = '#e9e4f6', rise = 160, size = 22 } = {}) {
  if (a <= 0.01) return
  x.save()
  for (let i = 0; i < n; i++) {
    const p = ((t * 0.9 + i / n) % 1)
    x.globalAlpha = a * 0.7 * Math.sin(Math.PI * p)
    const q = Math.round(size * (0.6 + p))
    R(x, col, cx + Math.sin(p * 7 + i * 2) * 26 - q / 2, cy - p * rise, q, q)
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
/** a tiny tissue box (Pisces' prop) */
export function tissues(x, cx, cy, s) {
  if (s <= 2) return
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ── THE HEART: a pixel heart that is cracked down the middle (crack 0…1 splits the halves) and mends with gold seams
const HB = [
  '..HHH...HHH..',
  '.HHHHH.HHHHH.',
  'HHLLHHHHHHHHH',
  'HHLHHHHHHHHHH',
  'HHHHHHHHHHHHH',
  'HHHHHHHHHHHHH',
  '.HHHHHHHHHHH.',
  '..HHHHHHHHH..',
  '...HHHHHHH...',
  '....HHHHH....',
  '.....HHH.....',
  '......H......',
]
// the crack: per row, the column where the left half ends (a zig-zag)
const CRACK = [6, 6, 5, 6, 7, 6, 5, 6, 7, 6, 6, 6]
/** crack 0…1: how far the halves sit apart. mend 0…1: halves close, the seam turns gold. glow: extra glow (last beat) */
export function drawHeart(x, t, cx, cy, cell, { crack = 1, mend = 0, k = 1, glow = 0, rot = 0 } = {}) {
  if (k <= 0.01) return
  const gap = cell * 1.6 * crack * (1 - ease.inOutCubic(mend))
  const tilt = 0.12 * crack * (1 - mend)
  const c = cell * k
  x.save(); x.translate(cx, cy); x.rotate(rot)
  if (glow > 0 || mend > 0.9) {
    const gA = Math.max(glow, (mend - 0.9) * 10 * 0.5)
    const g = x.createRadialGradient(0, 0, 0, 0, 0, c * 13)
    g.addColorStop(0, `rgba(255,190,140,${0.35 * gA})`); g.addColorStop(1, 'rgba(255,190,140,0)')
    x.fillStyle = g; x.fillRect(-c * 13, -c * 13, c * 26, c * 26)
  }
  const W = 13, H = HB.length, ox = -W * c / 2, oy = -H * c / 2
  const cellAt = (i, j) => j >= 0 && j < H && i >= 0 && i < W && HB[j][i] !== '.'
  for (const side of [-1, 1]) {
    x.save()
    x.translate(side * gap / 2, 0); x.rotate(side * tilt)
    const mine = (i, j) => cellAt(i, j) && (side < 0 ? i < CRACK[j] : i >= CRACK[j])
    // outline
    x.fillStyle = INK
    for (let j = -1; j <= H; j++) for (let i = -1; i <= W; i++) if (!mine(i, j) && (mine(i + 1, j) || mine(i - 1, j) || mine(i, j + 1) || mine(i, j - 1))) x.fillRect(ox + i * c, oy + j * c, c + 0.5, c + 0.5)
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
      if (!mine(i, j)) continue
      const ch = HB[j][i]
      x.fillStyle = ch === 'L' ? '#ffd0dc' : (j > 7 ? '#d8325a' : '#f04a6e')
      x.fillRect(ox + i * c, oy + j * c, c + 0.5, c + 0.5)
    }
    x.restore()
  }
  // the gold seam
  if (mend > 0.55) {
    const a = clamp((mend - 0.55) / 0.3)
    x.save(); x.globalAlpha *= a
    for (let j = 0; j < H; j++) {
      if (!cellAt(CRACK[j], j) && !cellAt(CRACK[j] - 1, j)) continue
      const sx = ox + CRACK[j] * c - c * 0.35
      x.fillStyle = j % 2 ? GOLD : CREAM
      x.fillRect(sx, oy + j * c, c * 0.7, c + 0.5)
      if (j > 0 && CRACK[j] !== CRACK[j - 1]) { const lo = Math.min(CRACK[j], CRACK[j - 1]); x.fillStyle = GOLD; x.fillRect(ox + lo * c - c * 0.35, oy + j * c - c * 0.2, Math.abs(CRACK[j] - CRACK[j - 1]) * c + c * 0.7, c * 0.5) }
    }
    x.restore()
  }
  x.restore()
}

// ── the bug: a pixel heart with a plaster + "THE MAKE-UP TALK" (Inter 800 small caps, letter-spaced, rose gold)
const BUG_ICON = ['.HH.HH.', 'HHHHHHH', 'HPPPPPH', 'HPPPPPH', '.HHHHH.', '..HHH..', '...H...']
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '44px', height: '44px', imageRendering: 'pixelated' }, b)
  ic.width = 44; ic.height = 44
  drawBits(ic.getContext('2d'), BUG_ICON, { H: '#f04a6e', P: '#f6d6b8' }, 22, 22, 4.6)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: ROSE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    'THE&nbsp;<span style="color:#ffd9c9">MAKE-UP</span>&nbsp;TALK')
  return {
    update(t, out = 1) {
      b.style.display = out <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(out))
      b.style.transform = `scale(${(0.6 + 0.4 * out).toFixed(4)})`
    },
  }
}

// ── a warm floor (a rug and a soft lamp glow), shared by the beats
export function room(x, t, { a = 1, rug = '#3a2a5e', y = 1150, glowX = 540, glowY = 800 } = {}) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a
  const g = x.createRadialGradient(glowX, glowY, 0, glowX, glowY, 700)
  g.addColorStop(0, 'rgba(255,200,150,0.16)'); g.addColorStop(1, 'rgba(255,200,150,0)')
  x.fillStyle = g; x.fillRect(0, 200, 1080, 1300)
  x.fillStyle = INK; x.beginPath(); x.ellipse(540, y, 470, 70, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = rug; x.beginPath(); x.ellipse(540, y - 4, 456, 60, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,179,154,0.25)'; x.beginPath(); x.ellipse(540, y - 4, 380, 44, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = rug; x.beginPath(); x.ellipse(540, y - 4, 360, 38, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeEpisode(cfg) {
  const AS = signStar(cfg.A), BS = signStar(cfg.B), PIS = signStar('pisces')
  const name = id => id.toUpperCase()
  const SPEAK = { S: 'THE STARS', A: `${AS.glyph}︎ ${name(cfg.A)}`, B: `${BS.glyph}︎ ${name(cfg.B)}` }
  const COL = { S: null, A: cfg.colA || AS.color, B: cfg.colB || BS.color }
  const LINES = cfg.lines.map(L => ({ t: L.t, speaker: SPEAK[L.who], text: L.text, ...(COL[L.who] ? { color: COL[L.who] } : {}) }))
  const HOPS = { S: talkHops(LINES, SPEAK.S, { cps: CPS }), A: talkHops(LINES, SPEAK.A, { cps: CPS }), B: talkHops(LINES, SPEAK.B, { cps: CPS }) }
  const ACC = cfg.accent || ROSE
  const pisInCouple = cfg.A === 'pisces' || cfg.B === 'pisces'

  const star = (S2, who, seed) => (x, t, o = {}) => {
    const hops = [...(o.hops || []), ...(o.talk === false ? [] : HOPS[who])]
    const opts = { color: S2.color, glyph: o.s >= 150 ? S2.glyph : null, seed, glow: 1.05, ...o, hops }
    const F = drawStarChar(x, o.x, o.y, o.s, t, opts)
    if (o.tears || (S2 === PIS && o.tears !== 0 && o.tears !== false)) {
      const fr = starFrame(o.x, o.y, o.s, t, opts)
      inSprite(x, fr, () => tearsCells(x, t, o.tears || 1))
    }
    return F
  }
  const A = star(AS, 'A', 3), B = star(BS, 'B', 7)
  const stars = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: STAR.sky, seed: 2, glow: 1.05, ...o, hops: [...(o.hops || []), ...HOPS.S] })
  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  const POS = { A: { x: 300, y: 1020, s: 250 }, B: { x: 780, y: 1020, s: 250 } }
  /** the couple at their standard marks */
  function couple(x, t, o = {}) {
    const a = { ...POS.A, ...(o.a || {}) }, b = { ...POS.B, ...(o.b || {}) }
    const k = o.k ?? 1
    shadow(x, a.x, a.y + a.s * 0.5, a.s * 0.9 * k); shadow(x, b.x, b.y + b.s * 0.5, b.s * 0.9 * k)
    A(x, t, { pop: k, ...a }); B(x, t, { pop: k, ...b })
  }
  const HEART_HOOK = { x: 540, y: 760, cell: 16, ...(cfg.heart?.hook || {}) }
  const HEART_TRY = { x: 540, y: 700, cell: 18, ...(cfg.heart?.try || {}) }
  const PIS_DEF = { hook: { x: 930, y: 1290, s: 170 }, trap: { x: 930, y: 1290, s: 170 }, move: { x: 940, y: 590, s: 140 }, try: { x: 930, y: 1290, s: 170 } }
  const PIS_SPOT = { ...PIS_DEF, ...(cfg.pis || {}) }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 34px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 600 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    // optional images (cfg.images = { key: 'file.png' } from promo/assets), handed to the beats as S.img[key]
    const IMG = {}
    await Promise.all(Object.entries(cfg.images || {}).map(([k, f]) => new Promise(res => { const i = new Image(); i.onload = () => { IMG[k] = i; res() }; i.onerror = () => res(); i.src = ASSETS + f })))
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const hd = cfg.heads
    const H0 = popText(root, hd.hook, { top: 160, size: 92, accentSize: 124, at: -0.9, gap: 0.04, accentColor: ACC, fit: true })
    const H1 = popText(root, hd.trap, { top: 168, size: 84, accentSize: 114, at: T.h1, gap: 0.08, accentColor: ACC, fit: true })
    const H2 = popText(root, hd.move, { top: 168, size: 84, accentSize: 114, at: T.h2, gap: 0.08, accentColor: GOLD, fit: true })
    const H3 = popText(root, hd.try, { top: 168, size: 84, accentSize: 114, at: T.h3, gap: 0.08, accentColor: MINT, fit: true })
    const H4 = popText(root, hd.last, { top: 200, size: 100, accentSize: 140, at: T.h4, late: cfg.lastLate || 1, lateAt: T.h4Land, gap: 0.09, wobble: true, accentColor: ACC, fit: true })
    const HEADS = [[H0, T.hookOut], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, [T.out[0] + 0.1, T.out[1]]]]
    const top = layerCanvas(root), tx = top.getContext('2d')
    const dbox = dialogueBox(root, { lines: LINES, y: 1420, open: T.boxOpen, close: T.boxClose, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    const beatS = (t, a, b, extra = {}) => ({ u: t - a, t0: a, t1: b, A, B, stars, pisces, couple, x, tx, POS, AS, BS, img: IMG, ...extra })

    function bgPisces(t, key, a, b, tears, mood) {
      if (pisInCouple) return
      const P = PIS_SPOT[key]
      if (!P) return
      const pk = (key === 'hook' ? 1 : pop01(t, a + 0.3, 0.3, 2)) * outK(t, [b - 0.15, b])
      if (pk <= 0.01) return
      if (!P.noTissues) tissues(x, P.x - P.s * 0.7, P.y + P.s * 0.3, P.s * 0.5 * Math.min(1, pk))
      pisces(x, t, { ...P, pop: pk, hops: P.hops }, tears, mood, P.look || [-1, -0.6])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3))
        const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
        drawSky(x, t, base)
        tx.clearRect(0, 0, 1080, 1920)
        const dM = t - T.mend, shake = dM > 0 && dM < 0.4 ? 8 * Math.exp(-dM * 10) * Math.sin(dM * 50) : 0
        x.save(); x.translate(0, shake)
        // HOOK
        if (t < T.hookOut[1]) {
          const S = beatS(t, 0, T.hookOut[1])
          if (cfg.hook) cfg.hook(x, t, S); else { room(x, t); couple(x, t, { a: { mood: 'squint', look: [-1, 0], hops: [-0.12] }, b: { mood: 'squint', look: [1, 0], hops: [-0.05] } }) }
          const hk = outK(t, T.hookOut)
          if (!cfg.noHookHeart) drawHeart(x, t, HEART_HOOK.x, HEART_HOOK.y + 6 * Math.sin(t * 2.4), HEART_HOOK.cell, { crack: 1 + 0.15 * Math.sin(t * 9) * (t < 0.6 ? 1 : 0.3), k: hk })
          bgPisces(t, 'hook', 0, T.hookOut[1], 1, 'wide')
        }
        // TRAP
        if (t >= T.trap[0] && t < T.trap[1]) {
          const a = T.trap[0], punch = 1 + 0.06 * (1 - ease.outCubic(prog(t, a, a + 0.28)))
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          cfg.trap(x, t, beatS(t, a, T.trap[1]))
          x.restore()
          bgPisces(t, 'trap', a, T.trap[1], 2, 'wide')
        }
        // MOVE
        if (t >= T.move[0] - 0.1 && t < T.move[1]) {
          const a = T.move[0]
          cfg.move(x, t, beatS(t, a, T.move[1]))
          bgPisces(t, 'move', a, T.move[1], 2, 'sparkle')
          if (!cfg.noStars) {
            const sk = pop01(t, T.starsIn, 0.38, 2.1) * popOut(t, T.starsOut)
            const P = { x: 150, y: 1280, s: 170, ...(cfg.starsAt || {}) }
            if (sk > 0.01) stars(x, t, { ...P, pop: sk, mood: t > 14.6 ? 'happy' : 'neutral', look: [1, -0.4], hops: [T.starsIn + 0.32] })
          }
        }
        // TRY + LAST
        if (t >= T.try[0] && t < T.out[1] + 0.02) {
          const a = T.try[0], ok = popOut(t, T.out)
          const S = beatS(t, a, T.try[1], { ok, mend: ease.inOutCubic(prog(t, T.mend - 0.5, T.mend)), last: t >= T.last[0] })
          if (t < T.last[0] || !cfg.last) { if (cfg.try) cfg.try(x, t, S); else { room(x, t, { a: ok }); couple(x, t, { k: ok }) } }
          if (t >= T.last[0] && cfg.last) cfg.last(x, t, S)
          const hk = pop01(t, T.heartIn, 0.36, 2.2) * ok
          const lift = ease.inOutCubic(prog(t, T.last[0], T.last[0] + 0.6))
          const hy = lerp(HEART_TRY.y, cfg.heart?.lastY ?? 660, lift)
          if (!cfg.noTryHeart) {
            drawHeart(x, t, HEART_TRY.x, hy + 6 * Math.sin(t * 2.4), HEART_TRY.cell * (1 + 0.12 * lift), { crack: 1, mend: S.mend, k: hk, glow: lift * (0.8 + 0.2 * Math.sin(t * 4)) })
            sparkles(x, t, HEART_TRY.x, HEART_TRY.y, T.mend, 14, 210, 1, [GOLD, CREAM, PINK])
            hearts(x, t, T.mend + 0.2, HEART_TRY.x, HEART_TRY.y - 60, { n: 6, cell: 7, spread: 260 })
          }
          if (t < T.last[0]) bgPisces(t, 'try', a, T.last[0] + 3.2, t > T.mend ? 3 : 2, t > T.mend ? 'happy' : 'sparkle')
          else if (!pisInCouple && PIS_SPOT.try) {
            const P = PIS_SPOT.try
            tissues(x, P.x - P.s * 0.7, P.y + P.s * 0.3, P.s * 0.5 * ok)
            pisces(x, t, { ...P, pop: ok, hops: [T.h4Land + 0.02, T.h4Land + 0.7] }, 3, 'happy', [-1, -0.6])
          }
        }
        x.restore()
        // top layer: per-episode overlays
        if (cfg.top) cfg.top(tx, t, beatS(t, 0, STORY_END))
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        dbox.update(t)
        bug.update(t, outK(t, T.bugOut))
        // a soft white flash on the hard cuts (not the card cut)
        const fl = Math.max(0, ...[T.trap[0], T.cut, T.try[0]].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.45 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // no card transition (owner change, 4 Nov): the beats cut on their own whooshes; the short end card closes the film
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const words = s => s.split(/\s+/).filter(w => w && w !== '|').length
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.022) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const hd = cfg.heads
  const nLast = words(hd.last), late = cfg.lastLate || 1
  const CUES = [
    // the hook: a crack tick on the heart, a sniffle
    ['tick', 0.02, 0.05], ['pluck', 0.35, 2349.32, 0.012, 0.3, 0.6], ['tick', 0.5, 0.035],
    // beats: a whoosh into each, the headline words
    ['whoosh', r3(T.trap[0] - 0.08), 0.28, 0.035], ['tick', T.trap[0], 0.05], ...wordPops(T.h1, words(hd.trap), 0.08, 0),
    ...wordPops(T.h2, words(hd.move), 0.08, 2), ['pop', r3(T.starsIn + 0.05), 739.99, 0.035, -0.4],
    ['whoosh', r3(T.try[0] - 0.08), 0.28, 0.03], ['tick', T.try[0], 0.045], ...wordPops(T.h3, words(hd.try), 0.08, 1),
    ['pop', r3(T.heartIn + 0.05), 987.77, 0.035, 0], ['tick', r3(T.heartIn + 0.1), 0.03],
    // the mend: the halves click together, gold, bells
    ['riser', r3(T.mend - 0.5), T.mend, 0.025], ['tick', T.mend, 0.07], ['pop', T.mend, 1174.66, 0.05, 0], ['bell', r3(T.mend + 0.05), 1760, 0.035, 1.3, 0],
    ['bell', r3(T.mend + 0.2), 2349.32, 0.022, 1.2, 0.2], ['glitter', T.mend, r3(T.mend + 0.6)], ['pluck', r3(T.mend + 0.25), 1318.51, 0.03, 0.6, -0.2],
    // the last line
    ...wordPops(T.h4, nLast - late, 0.09, 0, 0.024), ...Array.from({ length: late }, (_, i) => ['pop', r3(T.h4Land + i * 0.1), 1174.66 * (i ? 1.335 : 1), 0.045, 0]),
    ['glitter', T.h4Land, r3(T.h4Land + 0.4)],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []),
    ...endcardCues(STORY_END, { short: true }),
  ]
  return { DURATION, SCENES, CUES, T, LINES }
}
