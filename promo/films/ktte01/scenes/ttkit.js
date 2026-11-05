// THIS OR THAT: LOVE EDITION: the shared format engine for the m29 batch (ktte01–ktte24). Other episodes import it
// read-only from '../../ktte01/scenes/ttkit.js'. Month 2 rules: no end card, no card cut, no logo, the word never on
// screen; DURATION is the story; endings are a hard cut or a seamless loop back to frame 0.
//
// The look: two big tilted pixel cards (THIS, pink, left · THAT, blue, right) with a VS spark between them, a speed-timer
// bar over them, the hook line at the top, the series bug top-left. The sign(s) stand under the cards and pick at speed:
// a lunge + slam into one card (gold check stamp), the other card goes flying, the next pair whips in. The last round
// is the twist (a truer question, a warm answer); then the winner card holds centre and the last line lands.
// Pisces cries in every film: in the bottom "TISSUE CAM" when it isn't on screen as a hero.
//
//   makeTT(cfg) → { DURATION, SCENES, CUES, T, LOOP }
//   cfg.id, cfg.mode 'solo' | 'duel' | 'crowd', cfg.signs: ['aries'] | ['aries', 'libra'] | (crowd: all 12 by default)
//   cfg.hook  '…*accent*…' (≤ 7 words; on screen, fully drawn, at frame 0)      cfg.accent: hook accent colour
//   cfg.rounds [{ a, b, pick, d, pickAt, c, hover, buzz, both, freeze, ia, ib, extra(x, t, S), cues: [[kind, u, …]] }]
//      a / b: card text ('\n' = line break); ia / ib: optional pixel icon names (see ICONS).
//      pick: solo 'a' | 'b' | 'c' | null ; duel ['a', 'b'] (one per sign) ; crowd: array of 12 ('a' | 'b' | 'c' | null).
//      d: round length (s); pickAt: slam time inside the round; c: a third card that drops in (label) at c.at.
//      hover: sweating sway between the cards before the pick; buzz: the timer runs out (BZZT), no pick;
//      both: the solo hero grabs both cards (BZZT "PICK ONE!"); freeze: [u0, u1] the frame freezes (record scratch).
//   cfg.last  '…*accent*…' the last line (big caption, top)       cfg.lastBy: small tag over it (default 'THE STARS')
//   cfg.fin   finale length (default 1.9)                         cfg.ending 'cut' | 'loop'
//   cfg.brk   the first-second pattern break: { kind: 'whip' | 'scratch' | 'shake' | 'glitch' | 'flash' | 'silence', t }
//   cfg.finale(x, t, S) optional extra finale drawing; cfg.over(x, t, S) optional drawing over everything (top canvas)
//   cfg.dom(root, T) optional extra DOM builder → { update(t) }
//   cfg.cues extra sound cues (absolute times)
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, screenShake, shakeCues, glitch, glitchCues, loopBack, loopCues } from '../../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', BLUE = '#7fd0ff', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#9fe6b0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ffb3d1'
export const ALL = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
export const r3 = v => +(+v).toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export { clamp, lerp, prog, ease, el, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.12))
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
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  x.restore()
}
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    drawBits(x, HEART, { H: cols[i % cols.length] }, cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, cy - p * 200, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, BLUE, MINT, BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = 520 + 260 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt, sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]; x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble popping at t0, gone by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = String(text).split('\n'), lh = size * 1.12
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 44, h = lh * lines.length + 26
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, 2 + (i - (lines.length - 1) / 2) * lh))
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

// ── star sprite frame (mirrors startalk.js) so tears sit on the sprite through hops
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
/** sweat drops flicking off the sprite (cells) */
export function sweatCells(ctx, t) {
  for (let q = 0; q < 3; q++) {
    const ph = ((t * 1.6 + q / 3) % 1 + 1) % 1, d = q % 2 ? 1 : -1
    const px = 18 + d * (12 + 8 * ph), py = 6 + 10 * ph * ph - 4 * ph
    ctx.fillStyle = INK; ctx.fillRect(px - 0.2, py - 0.2, 1.6, 2); ctx.fillStyle = '#bfe8ff'; ctx.fillRect(px, py, 1.2, 1.6)
  }
}
/** draw a sign star with optional tears (0–3) and sweat; returns the sprite frame */
export function star(x, t, id, o = {}) {
  const S = signStar(id)
  const opts = { color: S.color, glyph: o.s >= 150 ? S.glyph : null, seed: o.seed ?? ALL.indexOf(id) + 2, glow: o.glow ?? 1, ...o }
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  const F = starFrame(o.x, o.y, o.s, t, opts)
  if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
  if (o.sweat) inSprite(x, F, () => sweatCells(x, t))
  return F
}

// ── small pixel icons for the cards
const ICON_BM = {
  phone: ['.KKKKK.', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KKKKKKK', 'KKK.KKK', '.KKKKK.'],
  bubble: ['.WWWWWWW.', 'WWWWWWWWW', 'WW.W.W.WW', 'WWWWWWWWW', '.WWWWWWW.', '..WW.....', '.W.......'],
  heart: HEART.map(r => r),
  moon: ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.'],
  sun: ['Y..Y..Y', '.YYYYY.', '.YYYYY.', 'YYYYYYY', '.YYYYY.', '.YYYYY.', 'Y..Y..Y'],
  house: ['...R...', '..RRR..', '.RRRRR.', 'RRRRRRR', '.WWWWW.', '.WWKWW.', '.WWKWW.'],
  star: ['...Y...', '...Y...', 'YYYYYYY', '.YYYYY.', '..YYY..', '.YY.YY.', 'YY...YY'],
  clock: ['.WWWWW.', 'WWWKWWW', 'WWWKWWW', 'WWWKKKW', 'WWWWWWW', 'WWWWWWW', '.WWWWW.'],
  q: ['.WWWW.', 'WW..WW', '....WW', '...WW.', '..WW..', '......', '..WW..'],
  fork: ['W.W.W..', 'W.W.W..', 'WWWWW..', '.WWW...', '..W....', '..W....', '..W....'],
  cam: ['..KKK..', 'KKKKKKK', 'KWWWWWK', 'KWKKKWK', 'KWKSKWK', 'KWKKKWK', 'KKKKKKK'],
  bag: ['..KKK..', '.K...K.', 'RRRRRRR', 'RRRRRRR', 'RRRRRRR', 'RRRRRRR', 'RRRRRRR'],
  zz: ['WWWW...', '..W....', '.W.....', 'WWWW...', '....WWW', '.....W.', '....WWW'],
  sweat: ['..B..', '.BBB.', 'BBBBB', 'BBBBB', '.BBB.'],
  hand: ['.W.W.W.', '.W.W.W.', '.WWWWW.', 'WWWWWW.', '.WWWWW.', '..WWW..', '..WWW..'],
  tissue: ['..WWW..', '..WWW..', 'BBBBBBB', 'BBBBBBB', 'BBBBBBB', 'BBBBBBB'],
  cal: ['RRRRRRR', 'WWWWWWW', 'WKWKWKW', 'WWWWWWW', 'WKWKWKW', 'WWWWWWW'],
  spark: ['...Y...', '..YYY..', 'YYYYYYY', '..YYY..', '...Y...'],
}
const ICON_COL = { K: INK, S: '#9fe6b0', W: BONE, Y: GOLD, R: RED, B: BLUE }
export function icon(x, name, cx, cy, cell = 9, { rot = 0, alpha = 1 } = {}) {
  const bm = ICON_BM[name]; if (!bm) return
  drawBits(x, bm, name === 'heart' ? { H: '#ff5c8a' } : ICON_COL, cx, cy, cell, { rot, alpha })
}

// ── the cards
export const CARD = { w: 440, h: 500, y: 770, ax: 290, bx: 790, cx: 540, cy: 560 }
function wrapLines(x, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let cur = ''
    for (const w of para.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (x.measureText(nx).width > maxW && cur) { out.push(cur); cur = w } else cur = nx }
    out.push(cur)
  }
  return out
}
/** one card centred at (cx, cy): side 'a' | 'b' | 'c', a big label, optional icon; k = scale; glow 0…1 (picked) */
export function drawCard(x, t, { cx, cy, rot = 0, k = 1, side = 'a', text = '', ic = null, glow = 0, checked = 0, tag = null, w = CARD.w, h = CARD.h, dim = 0 }) {
  if (k <= 0.01) return
  const col = side === 'a' ? PINK : side === 'b' ? BLUE : GOLD
  const deep = side === 'a' ? '#c2275f' : side === 'b' ? '#1d6fb0' : '#a8780e'
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (glow > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(0, 0, 40, 0, 0, w * 0.95)
    g.addColorStop(0, `rgba(255,230,150,${0.45 * glow})`); g.addColorStop(1, 'rgba(255,230,150,0)')
    x.fillStyle = g; x.fillRect(-w, -h, w * 2, h * 2); x.restore()
  }
  // drop shadow + stepped pixel card
  R(x, 'rgba(6,4,18,0.55)', -w / 2 + 16, -h / 2 + 18, w, h)
  const b = 8
  R(x, INK, -w / 2 - b, -h / 2 + 8, w + 2 * b, h - 16); R(x, INK, -w / 2 + 8, -h / 2 - b, w - 16, h + 2 * b); R(x, INK, -w / 2 - b + 8, -h / 2 - b + 8, w + 2 * b - 16, h + 2 * b - 16)
  R(x, col, -w / 2 + 8, -h / 2, w - 16, h); R(x, col, -w / 2, -h / 2 + 8, w, h - 16)
  R(x, 'rgba(255,255,255,0.35)', -w / 2 + 14, -h / 2 + 8, w - 28, 10)
  R(x, deep, -w / 2 + 8, h / 2 - 16, w - 16, 8)
  // inner bone panel
  R(x, BONE, -w / 2 + 28, -h / 2 + 70, w - 56, h - 100)
  // the corner tag
  x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText(tag || (side === 'a' ? 'THIS' : side === 'b' ? 'THAT' : 'WAIT—'), 0, -h / 2 + 37)
  // icon + text
  const hasIc = ic && ICON_BM[ic]
  if (hasIc) icon(x, ic, 0, -h / 2 + 150, 10)
  let size = 64
  x.font = `800 ${size}px ${INTER}`
  let lines = wrapLines(x, text, w - 96)
  while ((lines.length * size * 1.04 > (hasIc ? 230 : 320) || Math.max(...lines.map(l => x.measureText(l).width)) > w - 80) && size > 30) { size -= 4; x.font = `800 ${size}px ${INTER}`; lines = wrapLines(x, text, w - 96) }
  const lh = size * 1.04, top = (hasIc ? 60 : 20) - (lines.length - 1) * lh / 2
  x.fillStyle = INK
  lines.forEach((l, i) => x.fillText(l, 0, top + i * lh))
  if (dim > 0) { x.fillStyle = `rgba(10,6,24,${0.55 * dim})`; x.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b) }
  // gold check stamp
  if (checked > 0.01) {
    x.save(); x.translate(w * 0.38, h * 0.43); x.rotate(-0.18); x.scale(checked, checked)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 64, 0, Math.PI * 2); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.fill()
    drawBits(x, ['.......KK', '......KK.', 'KK...KK..', '.KK.KK...', '..KKK....'], { K: INK }, 0, 4, 9, { outline: null })
    x.restore()
  }
  x.restore()
}
/** the VS spark between the cards */
export function drawVS(x, t, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.12 + 0.05 * Math.sin(t * 9))
  const n = 10
  x.fillStyle = INK; x.beginPath()
  for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, r = i % 2 ? 58 : 92; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) }
  x.closePath(); x.fill()
  x.fillStyle = GOLD; x.beginPath()
  for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, r = i % 2 ? 48 : 80; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) }
  x.closePath(); x.fill()
  x.font = `800 italic 58px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('VS', 0, 3)
  x.restore()
}

// ── the bug (DOM): THIS OR THAT · LOVE EDITION
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,143,177,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    'THIS&nbsp;OR&nbsp;THAT<span style="color:rgba(255,255,255,0.62)">&nbsp;·&nbsp;LOVE&nbsp;EDITION</span>')
  return { root: b, update(t, k = 1) { b.style.display = k <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(clamp(k)) } }
}

// ── the speed timer bar (canvas)
export function drawTimer(x, t, f, { y = 452, alarm = 0, frozen = false, alarmText = 'TIME!' } = {}) {
  const X0 = 120, X1 = 960, H = 22
  R(x, INK, X0 - 6, y - 6, X1 - X0 + 12, H + 12)
  R(x, 'rgba(239,230,214,0.18)', X0, y, X1 - X0, H)
  const ff = clamp(f)
  const col = frozen ? BLUE : ff < 0.25 ? (Math.floor(t * 12) % 2 ? RED : '#ff7a8a') : ff < 0.5 ? '#ffb057' : GOLD
  R(x, col, X0, y, (X1 - X0) * ff, H)
  R(x, 'rgba(255,255,255,0.4)', X0, y, (X1 - X0) * ff, 5)
  // a little stopwatch on the left
  icon(x, 'clock', X0 - 50, y + H / 2, 5)
  if (alarm > 0) { x.save(); x.translate(540, 1080); x.rotate(-0.1); x.scale(alarm, alarm); x.font = `800 110px ${INTER}`; const w = x.measureText(alarmText).width + 60; R(x, INK, -w / 2 - 8, -78, w + 16, 156); R(x, RED, -w / 2, -70, w, 140); x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(alarmText, 0, 6); x.restore() }
}

// ── the TISSUE CAM (Pisces crying in a little facecam box)
export const CAM = { x: 712, y: 1440, w: 310, h: 290 }
export function drawTissueCam(x, t, { k = 1, tears = 1, mood = 'sparkle', cam = CAM, label: lab = 'TISSUE CAM', hops = null, look = [-1, -0.4], extra = null } = {}) {
  if (k <= 0.01) return
  const { x: X, y: Y, w, h } = cam
  x.save(); x.translate(X + w / 2, Y + h / 2); x.scale(k, k); x.translate(-(X + w / 2), -(Y + h / 2))
  R(x, INK, X - 8, Y - 8, w + 16, h + 16)
  R(x, '#2a2148', X, Y, w, h)
  R(x, 'rgba(255,255,255,0.05)', X, Y, w, h * 0.5)
  x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
  // tissue box behind Pisces
  box(x, X + 18, Y + h - 70, 70, 46, '#9fd8f6', { b: 4 }); R(x, '#ffffff', X + 40, Y + h - 100, 26, 32)
  star(x, t, 'pisces', { x: X + w / 2 + 22, y: Y + h * 0.6, s: 210, mood, look, tears, hops, glow: 0.6, tips: false })
  if (extra) extra(x, t)
  x.restore()
  // REC dot + label
  if (Math.floor(t * 2) % 2 === 0) { x.fillStyle = RED; x.beginPath(); x.arc(X + 22, Y + 26, 10, 0, Math.PI * 2); x.fill() }
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(lab, X + 40, Y + 26)
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeTT(cfg) {
  const mode = cfg.mode || 'solo'
  const signs = cfg.signs || (mode === 'crowd' ? ALL : ['aries'])
  const heroIsPisces = signs.includes('pisces') && mode !== 'crowd'
  const showCam = cfg.cam ?? (!heroIsPisces && mode !== 'crowd')
  const FIN = cfg.fin ?? 1.9
  const LOOP = cfg.ending === 'loop'
  const TAIL = 0.45

  // the round timeline: round 0 starts before frame 0, so the film opens mid-slam
  const R0 = cfg.r0 ?? -0.62
  let tc = R0
  const rounds = cfg.rounds.map((r, i) => {
    const d = r.d ?? (i === 0 ? 1.55 : 1.45)
    const pickAt = r.pickAt ?? (i === 0 ? 0.74 : d * 0.56)
    const o = { ...r, i, t0: tc, t1: tc + d, d, pickAt, slam: tc + pickAt }
    tc += d
    return o
  })
  const E = tc
  let DURATION = 0     // set below once realOf() exists (freezes add real time)
  const LASTR = rounds[rounds.length - 1]
  const T = { R0, E, DURATION, rounds, last: r3(E + 0.08), loopFrom: r3(DURATION - TAIL), hookOut: cfg.hookOut ?? r3(rounds[Math.min(1, rounds.length - 1)].t0 + 0.9) }

  // heroes' home spots
  const homes = mode === 'solo' ? [{ x: 470, y: 1300, s: 320 }]
    : mode === 'duel' ? [{ x: 300, y: 1265, s: 250 }, { x: 780, y: 1265, s: 250 }]
      : signs.map((id, i) => ({ x: 105 + (i % 6) * 174 + (Math.floor(i / 6) ? 87 : 0), y: Math.floor(i / 6) ? 1395 : 1255, s: 110 }))
  const pickOf = (r, j) => mode === 'solo' ? r.pick : Array.isArray(r.pick) ? r.pick[j] : r.pick
  const cardX = s => s === 'a' ? CARD.ax : s === 'b' ? CARD.bx : CARD.cx
  const cardY = s => s === 'c' ? CARD.cy : CARD.y

  // virtual time: freezes (record scratch) hold the scene still for `len` real seconds; the loop tail replays round 0
  // into frame 0. Rounds are scheduled in virtual time; vt() maps real → virtual, realOf() virtual → real.
  const FREEZES = []
  if (cfg.brk && (cfg.brk.kind === 'scratch' || cfg.brk.kind === 'freeze')) FREEZES.push({ v: cfg.brk.t, len: cfg.brk.len ?? 0.4 })
  for (const r of rounds) if (r.freeze) FREEZES.push({ v: r.t0 + r.freeze[0], len: r.freeze[1] - r.freeze[0] })
  FREEZES.sort((p, q) => p.v - q.v)
  function vt(t) {
    let acc = 0
    for (const f of FREEZES) { const rs = f.v + acc; if (t <= rs) break; if (t < rs + f.len) return f.v; acc += f.len }
    return t - acc
  }
  const frozenAt = t => { let acc = 0; for (const f of FREEZES) { const rs = f.v + acc; if (t >= rs && t < rs + f.len) return true; acc += f.len } return false }
  function realOf(vv) { let acc = 0; for (const f of FREEZES) { if (vv > f.v) acc += f.len; else break } return vv + acc }

  function roundAt(v) { for (const r of rounds) if (v >= r.t0 && v < r.t1) return r; return null }

  // ── draw one round at virtual time v
  function drawRound(x, t, v, r, S) {
    const u = v - r.t0, d = r.d, pa = r.pickAt
    const inK = r.i === 0 ? 1 : easeOutBack(prog(u, 0, 0.24), 1.6)
    const leaving = prog(u, d - 0.16, d)
    const picks = mode === 'solo' ? [r.pick] : signs.map((_, j) => pickOf(r, j))
    const chosen = new Set(picks.filter(Boolean))
    const decided = u >= pa
    const isLast = r === LASTR
    // cards
    for (const side of ['a', 'b']) {
      const sgn = side === 'a' ? -1 : 1
      const win = chosen.has(side)
      let cx = cardX(side), cy = cardY(side), rot = sgn * 0.06, k = 1, glow = 0, chk = 0
      // whip in from the side
      cx += sgn * 700 * (1 - inK); rot += sgn * 0.5 * (1 - inK)
      // hover wobble before the pick
      if (!decided) { rot += 0.02 * Math.sin(v * 10 + sgn); cy += 6 * Math.sin(v * 7 + sgn) }
      if (r.both && u > pa - 0.5 && u < pa + 0.4) { cx -= sgn * 40 * Math.sin(Math.PI * prog(u, pa - 0.5, pa)); rot += sgn * 0.08 * Math.sin(u * 30) }
      if (decided && (r.buzz || r.both || (r.c && !chosen.has(side)) || (!win && chosen.size))) {
        // loser flies off
        const f = ease.inCubic(prog(u, pa + (r.buzz || r.both ? 0.2 : 0.02), pa + (r.buzz || r.both ? 0.55 : 0.36)))
        cx += sgn * 900 * f; cy -= 260 * f; rot += sgn * 1.6 * f
        if (r.buzz && u < pa + 0.2) cx += 10 * Math.sin(u * 80)
      }
      if (decided && win && !r.buzz && !r.both) {
        const p = prog(u, pa, pa + 0.12)
        k = 1 + 0.1 * Math.exp(-(u - pa) * 6) * (p > 0 ? 1 : 0); glow = clamp(1 - (u - pa) * 0.8) * 0.9; chk = easeOutBack(prog(u, pa + 0.02, pa + 0.3), 2.6)
        if (isLast && !LOOP) { glow = Math.max(glow, 0.5) }
        if (!isLast) { const f = ease.inCubic(leaving); cy -= 1100 * f }
      }
      if (isLast && decided && win && !r.buzz) {
        // the winner card glides to centre for the finale
        const f = ease.inOutCubic(prog(u, pa + 0.35, d))
        cx = lerp(cx, 540, f); cy = lerp(cy, 820, f); rot = lerp(rot, -0.03, f); k *= lerp(1, 1.12, f)
      }
      const checked = mode === 'solo' ? chk : 0
      drawCard(x, t, { cx, cy, rot, k, side, text: side === 'a' ? r.a : r.b, ic: side === 'a' ? r.ia : r.ib, glow, checked })
      // duel/crowd: who picked it
      if (mode !== 'solo' && decided && !r.buzz) {
        const who = signs.filter((_, j) => picks[j] === side)
        if (mode === 'duel') who.forEach((id, n) => { const kk = easeOutBack(prog(u, pa + 0.05 + n * 0.08, pa + 0.35 + n * 0.08), 2.4); if (kk > 0.01) star(x, t, id, { x: cx + (who.length > 1 ? (n ? 95 : -95) : 0), y: cy - CARD.h / 2 - 10, s: 120 * kk, mood: 'happy', look: [0, 1], tips: false, glow: 0.5 }) })
      }
    }
    // the third card
    if (r.c) {
      const ca = r.c.at ?? pa - 0.3
      const p = prog(u, ca, ca + 0.3)
      if (p > 0) {
        const win = chosen.has('c')
        let cy = lerp(-400, CARD.cy + 150, ease.outBack ? ease.outBack(p) : easeOutBack(p, 1.4)), k = 1.02, glow = 0, chk = 0
        if (u >= pa && win) { glow = clamp(1 - (u - pa) * 0.8) * 0.9; chk = mode === 'solo' ? easeOutBack(prog(u, pa + 0.02, pa + 0.3), 2.6) : 0 }
        let cx = 540, rot = 0.03 * Math.sin(v * 6)
        if (isLast && win) { const f = ease.inOutCubic(prog(u, pa + 0.35, d)); cy = lerp(cy, 820, f); k *= lerp(1, 1.1, f) }
        else if (!isLast) { cy -= 1100 * ease.inCubic(leaving) }
        drawCard(x, t, { cx, cy, rot, k, side: 'c', text: r.c.text, ic: r.c.ic, glow, checked: chk, tag: r.c.tag })
      }
    }
    // VS spark (hidden once decided)
    const vsK = (r.i === 0 ? 1 : easeOutBack(prog(u, 0.1, 0.34), 2.2)) * (1 - ease.inQuad(prog(u, pa - 0.05, pa + 0.12)))
    drawVS(x, v, 540, CARD.y - 30, vsK)
    if (r.extra) r.extra(x, t, { ...S, u, v, r })
  }

  // ── the heroes in a round
  function heroPose(j, v, r) {
    const H = homes[j], u = v - r.t0, pa = r.pickAt
    const pk = pickOf(r, j)
    let x = H.x, y = H.y, look = [0, -0.4], mood = 'neutral', squash = 0, sweat = false
    // think: glance left / right
    if (u < pa) {
      const g = Math.sin(v * (r.hover ? 9 : 14) + j)
      look = [g > 0 ? 1 : -1, -0.6]
      mood = r.hover ? 'wide' : 'neutral'
      if (r.hover) { x += 60 * Math.sin(v * 5 + j) * (mode === 'crowd' ? 0.3 : 1); sweat = true }
      if (r.both && u > pa - 0.5) { mood = 'happy'; squash = -0.25 * Math.sin(Math.PI * prog(u, pa - 0.5, pa)) }
    }
    if (pk && u >= pa - 0.22 && !r.buzz && !r.both) {
      // lunge + slam into the chosen card, then spring back
      const tx = mode === 'crowd' ? cardX(pk) + ((j % 4) - 1.5) * 70 : cardX(pk), ty = cardY(pk) + (mode === 'crowd' ? 340 + Math.floor(j / 4) * 40 : 250)
      const go = ease.outCubic(prog(u, pa - 0.22, pa)), back = mode === 'crowd' ? 0 : ease.inOutCubic(prog(u, pa + 0.3, Math.min(r.d, pa + 0.75)))
      const f = go * (1 - back)
      x = lerp(H.x, tx, f); y = lerp(H.y, ty, f) - 60 * Math.sin(Math.PI * go) * (1 - back)
      if (u >= pa && u < pa + 0.12) squash = 0.22 * Math.sin(Math.PI * (u - pa) / 0.12)
      mood = u >= pa ? 'happy' : 'wide'; look = [pk === 'a' ? -1 : pk === 'b' ? 1 : 0, -1]
    }
    if ((r.buzz || r.both) && u >= pa) { mood = 'wide'; squash = u < pa + 0.15 ? 0.15 : 0 }
    return { x, y, s: H.s, look, mood, squash, sweat }
  }

  const CUES = []
  async function build(stage) {
    try { await Promise.all(["800 64px Inter", "800 italic 58px Inter", "800 28px Inter", "italic 500 96px 'EB Garamond'", "700 30px 'Space Mono'", "700 20px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const LASTT = popText(root, cfg.last, { top: 200, size: 100, accentSize: 122, at: T.last, gap: 0.06, accentColor: cfg.lastAccent || GOLD, fit: true })
    const byTag = el('div', { position: 'absolute', left: 0, top: '128px', width: '1080px', textAlign: 'center', font: `700 26px ${MONO}`, letterSpacing: '0.18em', color: GOLD, textShadow: '0 2px 10px rgba(6,4,18,0.9)', display: 'none' }, root, cfg.lastBy ?? 'THE STARS SAY')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const extraDom = cfg.dom ? cfg.dom(root, T) : null
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const tail = false
        const v = vt(t)
        const frozen = frozenAt(t)
        const skyT = LOOP ? 2.4 * Math.sin((2 * Math.PI * t) / DURATION) : t
        // camera: the first-second pattern break + small punches on every slam
        let zoom = 1, shx = 0, shy = 0
        const B = cfg.brk || { kind: 'whip', t: 0.12 }
        const shakeAt = (a, amp = 18, dur = 0.45) => { const dS = t - a; if (dS > 0 && dS < dur) { shx += amp * Math.exp(-dS * 9) * Math.sin(dS * 61); shy += amp * 0.6 * Math.exp(-dS * 9) * Math.cos(dS * 47) } }
        for (const r of rounds) if (!r.buzz && !r.both && r.pick) shakeAt(realOf(r.slam), mode === 'crowd' ? 6 : 12, 0.35)
        if (tail) { const p = prog(t, T.loopFrom, DURATION); zoom *= 1 + 0.06 * Math.sin(Math.PI * p) }
        drawSky(x, skyT, { ...SKY_H, zoom: SKY_H.zoom * (0.98 + 0.02 * zoom) })
        x.save(); x.translate(540 + shx, 900 + shy); x.scale(zoom, zoom); x.translate(-540, -900)
        const S = { mode, signs, T, homes, frozen }
        const r = roundAt(v)
        const timeLeft = r ? 1 - clamp(prog(v - r.t0, 0.15, r.pickAt)) : 0
        // the timer bar
        if (v < E + 0.2) drawTimer(x, t, r ? (r.buzz ? 1 - clamp(prog(v - r.t0, 0.1, r.pickAt)) : timeLeft) : 0, { alarm: r && (r.buzz || r.both) ? pop01(v, r.t0 + r.pickAt, 0.2, 2.6) * outK(v, [r.t1 - 0.15, r.t1]) : 0, frozen, alarmText: r ? r.alarm || (r.both ? 'PICK ONE!' : 'TIME!') : '' })
        if (r) drawRound(x, t, v, r, S)
        // finale (winner card has glided centre; the last line lands)
        const finK = !tail && v >= E ? 1 : 0
        if (finK) {
          // keep the winner card in place
          const wSide = mode === 'solo' ? LASTR.pick : (cfg.finSide || 'c')
          const wText = wSide === 'a' ? LASTR.a : wSide === 'b' ? LASTR.b : LASTR.c && LASTR.c.text
          if (wText && !cfg.noFinCard) drawCard(x, t, { cx: 540, cy: 820 + 6 * Math.sin(t * 3), rot: -0.03, k: 1.12 * (mode === 'solo' ? 1 : 1), side: wSide, text: wText, ic: wSide === 'a' ? LASTR.ia : wSide === 'b' ? LASTR.ib : LASTR.c && LASTR.c.ic, glow: 0.45 + 0.1 * Math.sin(t * 6), checked: mode === 'solo' ? 1 : 0, tag: wSide === 'c' ? LASTR.c.tag : null })
          if (cfg.finale) cfg.finale(x, t, { ...S, u: t - E })
          sparkles(x, t, 540, 800, E + 0.05, 12, 330, 1)
        }
        // heroes
        signs.forEach((id, j) => {
          let P
          if (r) P = heroPose(j, v, r)
          else if (v >= E) {
            const H = homes[j]
            P = { x: H.x, y: H.y, s: H.s, look: mode === 'crowd' ? [0, -1] : [0, 0], mood: 'happy', squash: 0 }
            if (mode !== 'solo' && cfg.finPose) Object.assign(P, cfg.finPose(j, t, v - E, H))
          } else P = { ...homes[j], look: [0, 0], mood: 'neutral' }
          if (cfg.pose) Object.assign(P, cfg.pose(j, t, v, P) || {})
          if (P.hide) return
          shadow(x, P.x, P.y + P.s * 0.42, P.s * 0.8, 0.3)
          const hops = cfg.hops ? cfg.hops[j] || cfg.hops : null
          star(x, t, id, { x: P.x, y: P.y, s: P.s, look: P.look, mood: P.mood, squash: P.squash || 0, sweat: P.sweat, tears: id === 'pisces' ? (P.tears ?? (v >= E ? 3 : 2)) : P.tears || 0, hops: Array.isArray(hops) ? hops.map(realOf) : null, glow: mode === 'crowd' ? 0.6 : 1, tips: mode !== 'crowd' })
        })
        if (cfg.mid) cfg.mid(x, t, { ...S, v, r })
        // Pisces' tissue cam
        if (showCam && (cfg.camUntil == null || v < cfg.camUntil)) {
          const camTears = typeof cfg.camTears === 'function' ? cfg.camTears(t, v) : v >= E - 0.6 ? 3 : r && r.i === rounds.length - 1 ? 2 : 1
          drawTissueCam(x, t, { tears: camTears, mood: v >= E - 0.6 ? 'sparkle' : 'wide', cam: cfg.camAt || CAM, look: [-1, -0.6], extra: cfg.camExtra ? (cx, tt) => cfg.camExtra(cx, tt, v) : null })
        }
        x.restore()
        // top layer
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.over) cfg.over(tx, t, { ...S, v, r })
        // type: the hook (on at frame 0, out after round 1), the last line in the finale
        const lastOut = 1
        LASTT.update(tail ? -9 : v, lastOut)
        byTag.style.display = !tail && v >= T.last + 0.1 ? 'block' : 'none'
        byTag.style.opacity = String(clamp(prog(v, T.last + 0.1, T.last + 0.3)) * lastOut)
        if (extraDom) extraDom.update(t, v)
        bug.update(t)
        // flashes: the pattern break + the loop seam
        let fl = 0
        if (B.kind === 'flash' && t >= B.t && t < B.t + 0.18) fl = 1 - (t - B.t) / 0.18
        flash.style.opacity = String(0.6 * fl)
        drawGrain(gx, t)
      },
    }
  }
  T.realOf = realOf
  DURATION = r3(realOf(E + FIN)); T.DURATION = DURATION; T.loopFrom = r3(DURATION - TAIL)

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const B = cfg.brk || { kind: 'whip', t: 0.12 }
  const cue = (...c) => CUES.push(c)
  // frame-0 slam + the pattern break
  cue('boom', 0.04, 0.22); cue('tick', 0.04, 0.08)
  for (const r of rounds) {
    const rr = vv => r3(realOf(vv))
    if (r.i > 0) { cue('whoosh', rr(r.t0), 0.26, 0.04); cue('tick', rr(r.t0 + 0.2), 0.05) }
    if (r.buzz || r.both) {
      cue('tom', rr(r.slam), 70, { gain: 0.32, decay: 0.45 }); cue('tom', rr(r.slam + 0.12), 66, { gain: 0.28, decay: 0.45 })
      cue('whoosh', rr(r.slam + 0.25), 0.3, 0.04)
    } else if (r.pick) {
      cue('whoosh', rr(r.slam - 0.2), 0.2, 0.035); cue('tom', rr(r.slam), 110, { gain: 0.26, decay: 0.25 }); cue('tick', rr(r.slam), 0.07)
      cue('pop', rr(r.slam + 0.05), NOTE[(r.i * 2 + 3) % NOTE.length], 0.045, 0); cue('pop', rr(r.slam + 0.12), NOTE[(r.i * 2 + 5) % NOTE.length], 0.035, 0.2)
      cue('whoosh', rr(r.slam + 0.06), 0.3, 0.03)
    }
    if (r.c) cue('whoosh', rr(r.t0 + (r.c.at ?? r.pickAt - 0.3)), 0.25, 0.05)
    if (r.hover) for (let k = 0; k < 4; k++) cue('tick', rr(r.t0 + 0.3 + k * (r.pickAt - 0.5) / 4), 0.04)
    for (const c of r.cues || []) cue(c[0], rr(r.t0 + c[1]), ...c.slice(2))
  }
  cue('bell', r3(realOf(T.last)), 1318.51, 0.035, 1.4, 0); cue('glitter', r3(realOf(T.last)), r3(realOf(T.last) + 0.5))
  for (const c of cfg.cues || []) cue(...c)
  // ── the hook kit: slam title (on at frame 0), the pattern break, freezes, the loop
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop ?? 175, size: cfg.hookSize ?? 112, accentColor: cfg.accent || GOLD, out: [T.hookOut, r3(T.hookOut + 0.2)] }
  const FX = [], FXC = [...slamTitleCues(HOOK)]
  if (B.kind === 'whip') { const W = { at: B.t, from: B.from ?? 1.6 }; FX.push(whipZoom(W)); FXC.push(...whipZoomCues(W)) }
  if (B.kind === 'shake') { const W = { at: B.t, amp: 30 }; FX.push(screenShake(W)); FXC.push(...shakeCues(W)) }
  if (B.kind === 'glitch') { const W = { at: B.t, len: 0.5, dialog: false }; FX.push(glitch(W)); FXC.push(...glitchCues(W)) }
  for (const f of FREEZES) {
    const rr = rounds.find(r => r.freeze && Math.abs(r.t0 + r.freeze[0] - f.v) < 1e-6)
    const W = { at: r3(realOf(f.v - 1e-6)), len: f.len, caption: (rr && rr.freezeCap) || (cfg.brk && cfg.brk.cap) || 'wait.', top: cfg.capTop ?? 370 }
    FX.push(recordScratch(W)); FXC.push(...recordScratchCues(W))
  }
  CUES.push(...FXC)
  const SCENES = [build, ...FX, slamTitle(HOOK)]
  if (LOOP) { SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: DURATION, len: 0.4 })); CUES.push(...loopCues({ duration: DURATION, len: 0.4 })) }
  return { DURATION, SCENES, CUES, T, LOOP }
}
