// t2kit: the shared look of batch b15 of Star Talk Trends, Volume 2 (nt2e81–nt2e100, formats 17–20 of the slate in
// promo/posting/next-30-days.md; rows in promo/films/next30/b15.md). Every film in the batch imports this file.
//
//   makeCorp(cfg)    17 CORPORATE SPEAK FOR DATING · 20 s: a sign in a tiny tie presents three slides; each corporate
//                    phrase gets a TRANSLATION sticker (the third one twisted sweet). The date raises a heart sign.
//   makeExplain(cfg) 18 ME EXPLAINING TO MY FRIENDS · 20 s: whiteboard, pointer, three exhibits, two friends on a couch
//                    going blank → confused → (twist) they get it, or set the record straight.
//   makeFlag(cfg)    19 INSTANT GREEN FLAG · 15 s: "When they…", one small kind act, heart eyes, a giant green flag.
//   makeSelect(cfg)  20 CHOOSE YOUR SIGN · 20 s: a retro character-select grid, three hovered picks with stat cards,
//                    the third twisted, SELECTED!
// Every film: the format name is the bug (top-left, Inter 800 small caps, 56 px), the hook caption and a character
// mid-action are on screen at t = 0 (no fade from black), Pisces cries somewhere, THE STARS pop in at the top and say
// the last line, one card cut (cardfx), the shared end card (endcard.js, default CTA). Everything is a pure f(t);
// DOM and canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', GREEN = '#46c97a', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_PINK = '#ff7eb6'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }
const CPS = 30
const NAMES = { aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces' }
export const ORDER = Object.keys(NAMES)
export const signName = id => NAMES[id]

// ── drawing helpers ─────────────────────────────────────────────────────────────────────────────
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
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
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch] || cols.X || INK; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** small pixel icons for props and whiteboard doodles (X = main colour, W = white, Y = gold, P = pink, K = ink, G = green, B = blue) */
export const ICONS = {
  heart: { bm: HEART, cols: { H: '#ff5c8a' } },
  moon: { bm: ['..XXX..', '.XX....', 'XX.....', 'XX.....', 'XX.....', '.XX....', '..XXX..'], cols: { X: GOLD } },
  star: { bm: ['...X...', '...X...', 'XXXXXXX', '.XXXXX.', '..XXX..', '.XX.XX.', 'X.....X'], cols: { X: GOLD } },
  clock: { bm: ['..XXXXX..', '.XWWWWWX.', 'XWWWKWWWX', 'XWWWKWWWX', 'XWWWKKKWX', 'XWWWWWWWX', 'XWWWWWWWX', '.XWWWWWX.', '..XXXXX..'], cols: { X: INK, W: BONE, K: RED } },
  phone: { bm: ['XXXXX', 'XBBBX', 'XBBBX', 'XBBBX', 'XBBBX', 'XXWXX'], cols: { X: INK, B: SKYB, W: BONE } },
  bread: { bm: ['..XXXXX..', '.XYYYYYX.', 'XYYWYYWYX', 'XYYYYYYYX', 'XXXXXXXXX'], cols: { X: '#9a5a2a', Y: '#e9b24a', W: '#fff1c8' } },
  plate: { bm: ['.XXXXXXX.', 'XWWWWWWWX', 'XWWYYYWWX', 'XWWWWWWWX', '.XXXXXXX.'], cols: { X: INK, W: BONE, Y: '#e9b24a' } },
  galaxy: { bm: ['..PP.....', '.P..PPP..', 'P..W...P.', 'P.WYW..P.', '.P.W..P..', '..P..PP.P', '...PP...P', '........P'], cols: { P: LAV, W: BONE, Y: GOLD } },
  hand: { bm: ['.X.X.X..', '.X.X.X..', '.X.X.X.X', '.XXXXXXX', 'XXXXXXXX', '.XXXXXX.', '..XXXX..'], cols: { X: '#ffd7b0' } },
  hat: { bm: ['...Y...', '...P...', '..PYP..', '..YPY..', '.PYPYP.', '.YPYPY.', 'PPPPPPP'], cols: { P: PINK, Y: GOLD } },
  note: { bm: ['...XXXX', '...X..X', '...X..X', '...X..X', '.XXX.XX', 'XXXXXXX', '.XX.XX.'], cols: { X: LAV } },
  check: { bm: ['......X', '.....XX', 'X...XX.', 'XX.XX..', '.XXX...', '..X....'], cols: { X: GREEN } },
  arrowUp: { bm: ['...X...', '..XXX..', '.XXXXX.', 'XXXXXXX', '..XXX..', '..XXX..', '..XXX..'], cols: { X: GREEN } },
  thumb: { bm: ['...XX...', '...XX...', '..XXX...', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXX.', 'XXXXXX..'], cols: { X: GOLD } },
  question: { bm: ['.XXXX.', 'XX..XX', '....XX', '...XX.', '..XX..', '......', '..XX..'], cols: { X: RED } },
  bang: { bm: ['XX', 'XX', 'XX', 'XX', '..', 'XX'], cols: { X: RED } },
  zz: { bm: ['XXXX', '..X.', '.X..', 'XXXX'], cols: { X: SKYB } },
  sparkle: { bm: ['...X...', '...X...', '..XXX..', 'XXXWXXX', '..XXX..', '...X...', '...X...'], cols: { X: GOLD, W: '#fffbea' } },
  gift: { bm: ['.P...P.', '..P.P..', 'XXXPXXX', 'XXXPXXX', 'PPPPPPP', 'XXXPXXX', 'XXXPXXX'], cols: { X: GREEN, P: RED } },
  dessert: { bm: ['...P...', '..WWW..', '.WWWWW.', 'XXXXXXX', 'XYXYXYX', '.XXXXX.'], cols: { W: BONE, P: RED, X: '#9a5a2a', Y: '#e9b24a' } },
  map: { bm: ['XXXXXXXX', 'XGGBBGGX', 'XGRRBGGX', 'XGGRRRGX', 'XBGGGRGX', 'XXXXXXXX'], cols: { X: INK, G: '#9fe6b0', B: SKYB, R: RED } },
  snack: { bm: ['.XXXXX.', 'XYYYYYX', 'XYWWWYX', 'XYYYYYX', 'XYYYYYX', '.XXXXX.'], cols: { X: RED, Y: '#ffd98a', W: BONE } },
  booth: { bm: ['XX....XX', 'XX....XX', 'XXWWWWXX', 'XX.KK.XX', 'XXXXXXXX'], cols: { X: '#c45a8a', W: BONE, K: INK } },
  candle: { bm: ['...Y...', '..YWY..', '...Y...', '..XXX..', '..XXX..', '..XXX..', '.KKKKK.'], cols: { Y: GOLD, W: '#fffbea', X: BONE, K: INK } },
  rock: { bm: ['..XXXX..', '.XWXXLX.', 'XXXLXXXX', 'XLXXXWXX', '.XXXXXX.'], cols: { X: '#8a7fb8', W: '#fffbea', L: SKYB } },
  mirror: { bm: ['.YYYYY.', 'YLLLLLY', 'YLWLLLY', 'YLLWLLY', 'YLLLLLY', '.YYYYY.', '...Y...', '..YYY..'], cols: { Y: GOLD, L: '#bfe8ff', W: '#ffffff' } },
}
export function icon(x, name, cx, cy, cell, opts) { const I = ICONS[name]; if (I) drawBits(x, I.bm, I.cols, cx, cy, cell, opts) }

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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, '#9fe6b0', BONE] } = {}) {
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
/** a pixel speech bubble (canvas), popping at t0, gone by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, tailUp = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40), sgn = tailUp ? -1 : 1, ty = sgn * h / 2
  x.fillStyle = INK; x.fillRect(tx - 14, ty + (tailUp ? -16 : 4), 14, 12); x.fillRect(tx - 7, ty + (tailUp ? -22 : 14), 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, ty + (tailUp ? -9 : 0), 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, shadow = true } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4) }
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** greedy word wrap on the canvas → lines */
export function wrap(x, text, maxW) {
  const out = []; let cur = ''
  for (const w of text.split(' ')) { const tryL = cur ? cur + ' ' + w : w; if (cur && x.measureText(tryL).width > maxW) { out.push(cur); cur = w } else cur = tryL }
  if (cur) out.push(cur)
  return out
}
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
export function shadesCells(ctx, up = 0) {
  const y = 16.6 - up * 7
  for (const ex of [13.4, 22.6]) { ctx.fillStyle = INK; ctx.fillRect(ex - 3.6, y - 0.6, 7.2, 5.2); ctx.fillStyle = '#2b2140'; ctx.fillRect(ex - 3, y, 6, 4); ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(ex - 2.4, y + 0.6, 1.6, 0.8) }
  ctx.fillStyle = INK; ctx.fillRect(16.8, y + 0.4, 2.4, 1.2)
}
/** a tiny tie under the face (sprite cells) */
export function tieCells(ctx, col = RED) {
  const C = ['.KKK.', 'KXXXK', '.KXK.', '.KXK.', 'KXXXK', 'KXXXK', '.KXK.', '..K..']
  C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; ctx.fillStyle = ch === 'K' ? INK : col; ctx.fillRect(15.5 + i, 26 + j * 0.9, 1, 0.95) }))
}
/** a party hat on the top tip (sprite cells) */
export function hatCells(ctx) {
  const C = ['..Y..', '..P..', '.PYP.', '.YPY.', 'PYPYP']
  C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; ctx.fillStyle = ch === 'P' ? PINK : GOLD; ctx.fillRect(15.5 + i, -3.5 + j, 1, 1) }))
}
/** draw a sign star; returns its sprite frame. o: { x, y, s, mood, look, hops, pop, tears, shades, tie, hat, seed, glyph } */
export function sign(x, t, id, o) {
  const S = id === 'you' ? { color: '#c9a6ff', glyph: null } : signStar(id)
  const opts = { color: S.color, glyph: o.s >= 150 && o.glyph !== false ? S.glyph : null, mood: o.mood || 'neutral', look: o.look, hops: o.hops, seed: o.seed ?? 3, glow: o.glow ?? 1, pop: o.pop ?? 1, alpha: o.alpha ?? 1, blush: o.blush, tips: o.tips }
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  const F = starFrame(o.x, o.y, o.s, t, opts)
  if ((o.pop ?? 1) > 0.01 && (o.tears || o.shades !== undefined || o.tie || o.hat)) inSprite(x, F, () => {
    if (o.tie) tieCells(x, o.tie === true ? RED : o.tie)
    if (o.hat) hatCells(x)
    if (o.shades !== undefined && o.shades !== false) shadesCells(x, typeof o.shades === 'number' ? o.shades : 0)
    if (o.tears) tearsCells(x, t, o.tears)
  })
  return F
}
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** a pixel phone with chat bubbles. msgs: [{ text, me, at }] */
export function chatPhone(x, t, cx, cy, msgs, { w = 380, h = 560, rot = 0, k = 1, name = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 8 })
  R(x, '#14102a', -w / 2 + 16, -h / 2 + 40, w - 32, h - 70)
  if (name) label(x, name, 0, -h / 2 + 22, { size: 20, col: 'rgba(239,230,214,0.7)', shadow: false })
  x.font = `700 26px ${INTER}`
  let y = -h / 2 + 70
  for (const m of msgs) {
    const p = pop01(t, m.at, 0.25, 2.2)
    if (p <= 0.01) continue
    const lines = wrap(x, m.text, w - 120), bw = Math.max(...lines.map(L => x.measureText(L).width)) + 30, bh = lines.length * 32 + 18
    const bx = m.me ? w / 2 - 26 - bw : -w / 2 + 26
    x.save(); x.translate(bx + bw / 2, y + bh / 2); x.scale(p, p)
    R(x, m.me ? '#5b8cff' : '#efe6d6', -bw / 2, -bh / 2, bw, bh)
    x.fillStyle = m.me ? '#ffffff' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    lines.forEach((L, i) => x.fillText(L, -bw / 2 + 15, -bh / 2 + 25 + i * 32))
    x.restore()
    y += bh + 16
  }
  x.restore()
}

// ── DOM pieces ──────────────────────────────────────────────────────────────────────────────────
function buildBug(root, [main, dim = ''], at = -1) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  const nb = s => s.replace(/ /g, '&nbsp;')
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    nb(main) + (dim ? `<span style="color:rgba(255,255,255,0.6)">&nbsp;${nb(dim)}</span>` : ''))
  return {
    update(t, out = 1) {
      const k = (t < 0.4 && at < 0 ? 1 : pop01(t, at, 0.36, 2.2)) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
    },
  }
}
/** a tilted bone sticker: optional kicker (mono, small) + Inter 800 text with one *italic* accent; badge optional */
export function buildSticker(root, { top = 1370, kicker = '', text, deep = '#c45a12', badge = null, badgeText = '', at, out, tilt = -1.5, size = 50 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '940px', padding: badge ? '18px 34px 20px 22px' : '16px 36px 20px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrap)
  if (badge) el('div', { flex: '0 0 auto', width: '74px', height: '74px', borderRadius: '50%', background: badge, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 ${badgeText.length > 1 ? 30 : 40}px ${INTER}`, color: INK }, st, badgeText)
  const col = el('div', { display: 'flex', flexDirection: 'column', gap: '4px' }, st)
  if (kicker) el('div', { font: `700 24px ${MONO}`, letterSpacing: '0.18em', color: deep }, col, kicker)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${Math.round(size * 1.28)}px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 ${size}px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, col, html)
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
/** a big stamped banner (DOM): Inter 800 with one *italic* accent, slams in at `at` */
export function buildBanner(root, { top, text, col = BONE, accent = GREEN, size = 96, at, out, tilt = -4, bg = null, border = null }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${Math.round(size * 1.25)}px ${SERIF};color:${accent};letter-spacing:0">$1</span>`)
  const st = el('div', { font: `800 ${size}px ${INTER}`, color: col, letterSpacing: '-0.01em', whiteSpace: 'nowrap', lineHeight: '1.05', padding: bg ? '14px 40px 22px' : '0', background: bg || 'transparent',
    border: border ? `8px solid ${border}` : 'none', borderRadius: '16px', textShadow: bg ? 'none' : '0 6px 22px rgba(6,4,18,0.85)', boxShadow: bg ? '12px 12px 0 rgba(6,4,18,0.7)' : 'none', transformOrigin: '50% 50%' }, wrap, html)
  wrap.style.display = 'flex'; const fitK = Math.min(1, 980 / Math.max(1, st.offsetWidth || 1)); wrap.style.display = 'none'
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, at, at + 0.12), o = outK(t, out)
      const sc = lerp(1.6, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - at) * 7) * Math.sin((t - at) * 38))
      st.style.opacity = String(clamp(p * 2) * o)
      st.style.transform = `rotate(${tilt}deg) scale(${(sc * fitK * lerp(0.8, 1, o)).toFixed(4)})`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the shared film engine
// cfg: { id, DURATION, bug: [main, dim], hook, hookTop, hookSize, hookAccent, accent, hookOut: [a, b],
//        starsAt, last, lastAt, boxClose, cut, setup(root) → { draw(x, t), top(tx, t), update(t) }, cues: [] }
export function makeFilm(cfg) {
  const DURATION = cfg.DURATION, STORY_END = DURATION - ENDCARD_LEN
  const OUT = [STORY_END - 0.5, STORY_END - 0.08]
  const SPEAK = 'THE STARS'
  const LINES = [{ t: cfg.lastAt, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [cfg.starsAt + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const boxClose = cfg.boxClose ?? STORY_END - 0.5

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "700 26px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hook, { top: cfg.hookTop ?? 150, size: cfg.hookSize ?? 70, accentSize: cfg.hookAccent ?? 104, at: -1.2, gap: 0.05, accentColor: cfg.accent, fit: true })
    const scene = cfg.setup(root)
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: cfg.lastAt - 0.22, close: boxClose, cps: CPS })
    const bug = buildBug(root, cfg.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const fade = el('div', { position: 'absolute', inset: 0, background: '#05040c', opacity: 0, pointerEvents: 'none' }, root)
    const shakeAt = cfg.shakeAt || []
    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, zoom: lerp(1.25, SKY_H.zoom, ease.inOutCubic(prog(t, 0, 3))) })
        let shake = 0
        for (const s of shakeAt) { const d = t - s; if (d > 0 && d < 0.45) shake += 16 * Math.exp(-d * 9) * Math.sin(d * 60) }
        x.save(); x.translate(0, shake)
        scene.draw(x, t)
        // THE STARS pop in at the top for the last line
        const ok = outK(t, OUT)
        const sk = pop01(t, cfg.starsAt, 0.38, 2.1) * ok
        if (sk > 0.01) {
          drawStarChar(x, 540, 300, 190, t, { color: STAR.sky, mood: t > cfg.lastAt + 1.6 ? 'happy' : 'neutral', look: [0, 0.6], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.1 })
          sparkles(x, t, 540, 300, cfg.starsAt + 0.05, 10, 170, 2, [GOLD, BONE, '#fffbea'])
        }
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        tx.save(); tx.translate(0, shake); if (scene.top) scene.top(tx, t); tx.restore()
        H0.update(t, outK(t, cfg.hookOut))
        if (scene.update) scene.update(t)
        box1.update(t)
        bug.update(t, outK(t, OUT))
        const fl = Math.max(0, ...(cfg.flashes || []).map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        fade.style.opacity = String(0.85 * ease.inQuad(prog(t, OUT[0] + 0.1, OUT[1])))
        drawGrain(gx, t)
      },
    }
  }
  const CUTS = [{ t: cfg.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]
  const CUES = [
    ...(cfg.cues || []),
    ['pop', r3(cfg.starsAt + 0.05), 739.99, 0.04, 0], ['glitter', r3(cfg.starsAt + 0.05), r3(cfg.starsAt + 0.45)],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', r3(OUT[0]), 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ].sort((a, b) => a[1] - b[1])
  return { DURATION, SCENES, CUES, STORY_END }
}
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]

// ═══════════════════════════════════════════════════════════════════════════ 17 CORPORATE SPEAK FOR DATING
// cfg: { id, sign, date, accent, deep, title ('Q4: US'), slides: [[phrase, translation] × 3], last, presenter: { shades } }
export function makeCorp(cfg) {
  const name = signName(cfg.sign), HC = signStar(cfg.sign).color
  const B = [[2.4, 5.4], [5.4, 8.4], [8.4, 11.6]], TR = 1.15, END = 11.6
  const clicks = [-0.15, ...B.map(b => b[0]), END]
  const scrX = 110, scrY = 410, scrW = 860, scrH = 500
  const slideText = i => i < 0 ? null : i < 3 ? cfg.slides[i][0] : 'ANY QUESTIONS?'
  function slideIdx(t) { let k = -1; B.forEach((b, i) => { if (t >= b[0]) k = i }); if (t >= END) k = 3; return k }
  function drawSlide(x, k, ox, t) {
    x.save(); x.translate(ox, 0)
    R(x, '#f7f1e6', scrX, scrY, scrW, scrH)
    R(x, HC, scrX, scrY, scrW, 64)
    label(x, cfg.title, scrX + 26, scrY + 33, { size: 26, col: INK, align: 'left', shadow: false })
    label(x, `${k + 2}/5`, scrX + scrW - 26, scrY + 33, { size: 22, col: INK, align: 'right', shadow: false })
    if (k < 0) {
      // the title slide: a rising bar chart with a heart on the top bar
      x.font = `800 120px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(cfg.title, scrX + 50, scrY + 190)
      label(x, 'FEELINGS ROADMAP', scrX + 54, scrY + 290, { size: 30, col: '#7a6e96', align: 'left', shadow: false })
      for (let i = 0; i < 4; i++) { const h = 50 + i * 42; box(x, scrX + 560 + i * 70, scrY + scrH - 40 - h, 46, h, i === 3 ? '#ff5c8a' : HC, { b: 4 }) }
      icon(x, 'heart', scrX + 583 + 210, scrY + scrH - 40 - 176 - 50, 7)
    } else {
      const txt = k < 3 ? `“${slideText(k)}”` : slideText(k)
      x.font = `800 ${k < 3 ? 70 : 84}px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
      const L = wrap(x, txt, scrW - 120)
      L.forEach((s, i) => x.fillText(s, scrX + scrW / 2, scrY + 250 + (i - (L.length - 1) / 2) * 84))
      // bullet doodles in the corners
      R(x, '#d8cfe6', scrX + 40, scrY + scrH - 60, 200, 10); R(x, '#d8cfe6', scrX + 40, scrY + scrH - 38, 140, 10)
      if (k === 3) icon(x, 'heart', scrX + scrW - 90, scrY + scrH - 70, 6)
      else icon(x, 'arrowUp', scrX + scrW - 80, scrY + scrH - 70, 6, { outline: INK })
    }
    x.restore()
    void t
  }
  function setup(root) {
    const stickers = cfg.slides.map((s, i) => buildSticker(root, { kicker: 'TRANSLATION:', text: s[1], deep: cfg.deep, at: B[i][0] + TR, out: [B[i][1] - 0.2, B[i][1]], tilt: [-1.8, 1.5, -1.2][i], top: 1385 }))
    return {
      draw(x, t) {
        // the room: a dark stage floor + the screen on a stand
        R(x, '#1d1636', 0, 1150, 1080, 770); R(x, '#2a2150', 0, 1150, 1080, 10)
        R(x, INK, 532, scrY + scrH, 16, 240)
        box(x, scrX - 12, scrY - 12, scrW + 24, scrH + 24, '#3a3058', { b: 6 })
        const k = slideIdx(t)
        // slide wipe on each click
        const tc = [...B.map(b => b[0]), END].filter(c => t >= c).pop()
        const w = tc === undefined ? 1 : ease.outCubic(prog(t, tc, tc + 0.28))
        x.save(); x.beginPath(); x.rect(scrX, scrY, scrW, scrH); x.clip()
        if (w < 1) drawSlide(x, k - 1, -w * scrW, t)
        drawSlide(x, k, (1 - w) * scrW, t)
        x.restore()
        // a projector glow
        x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, scrY + 250, 50, 540, scrY + 250, 620); g.addColorStop(0, 'rgba(255,248,225,0.10)'); g.addColorStop(1, 'rgba(255,248,225,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1300); x.restore()
        // the laser dot dances over the phrase
        if (k >= 0 && k < 3) { const lx = 540 + 220 * Math.sin(t * 2.6), ly = scrY + 250 + 30 * Math.sin(t * 4.1); R(x, '#ff3b4f', lx - 6, ly - 6, 12, 12); x.save(); x.globalAlpha = 0.35; R(x, '#ff3b4f', lx - 12, ly - 12, 24, 24); x.restore() }
        // the presenter: tiny tie, remote, a hop on every click
        const twist = t >= B[2][0] + TR
        const pm = t < 0.6 ? 'sparkle' : t >= END ? 'happy' : twist ? 'heart' : (t % 3 < 1.6 ? 'happy' : 'neutral')
        shadow(x, 220, 1210, 220)
        const F = sign(x, t, cfg.sign, { x: 220, y: 1060, s: 250, mood: pm, look: [1, -0.8], hops: clicks, tie: cfg.tie || RED, shades: cfg.shades ? (t < B[0][0] + 0.6 ? 0 : 1) : undefined, seed: 3, blush: twist ? 0.9 : undefined })
        // remote in hand + click spark
        x.save(); x.translate(F.ox + 120, F.cy - 10); x.rotate(-0.5); box(x, -12, -34, 24, 60, '#3a3058', { b: 4 }); R(x, RED, -6, -26, 12, 10); x.restore()
        clicks.forEach(c => sparkles(x, t, F.ox + 140, F.cy - 50, c, 5, 40, c, [GOLD, BONE]))
        // the audience: the date and Pisces in chairs
        const dm = t < B[0][0] + TR ? 'neutral' : t < B[2][0] + TR ? (t % 3 < 1.5 ? 'wide' : 'happy') : 'heart'
        sign(x, t, cfg.date, { x: 650, y: 1270, s: 180, mood: dm, look: [-0.4, -1], hops: [...B.map(b => b[0] + TR + 0.05), END + 0.1], seed: 7, blush: t > B[2][0] + TR ? 1 : undefined })
        const pt = t < B[1][0] ? 1 : t < B[2][0] + TR ? 2 : 3
        tissues(x, 1010, 1330, 70)
        sign(x, t, 'pisces', { x: 900, y: 1285, s: 160, mood: 'sparkle', look: [-0.6, -1], tears: pt, seed: 6, hops: [B[2][0] + TR + 0.1, END + 0.3] })
        for (const cx of [650, 900]) { box(x, cx - 105, 1330, 210, 40, '#4a3c78', { b: 5 }) }
        // the twist: a heart sign goes up in the audience
        const hk = pop01(t, END + 0.15, 0.3, 2.4)
        if (hk > 0.01) { const by = 1060 - 10 * Math.abs(Math.sin(t * 6)); x.save(); x.translate(560, by); x.scale(hk, hk); R(x, INK, -6, 0, 12, 170); R(x, '#a07850', -3, 0, 6, 166); box(x, -70, -110, 140, 110, BONE, { b: 6 }); icon(x, 'heart', 0, -55, 10); x.restore() }
        hearts(x, t, B[2][0] + TR + 0.1, 650, 1150, { n: 6 })
        hearts(x, t, END + 0.3, 560, 960, { n: 5 })
      },
      update(t) { stickers.forEach(s => s.update(t)) },
    }
  }
  const cues = [
    ['pop', 0.35, 987.77, 0.03, -0.3],
    ...clicks.filter(c => c > 0).flatMap(c => [['tick', r3(c), 0.07], ['whoosh', r3(c + 0.02), 0.22, 0.025], ['pop', r3(c + 0.05), 880, 0.03, -0.3]]),
    ...B.flatMap((b, i) => [['pop', r3(b[0] + TR), 1174.66, 0.045, 0.1], ['pop', r3(b[0] + TR + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(b[0] + TR + 0.02), 0.05],
      ...(i === 2 ? [['glitter', r3(b[0] + TR + 0.1), r3(b[0] + TR + 0.9)], ['pluck', r3(b[0] + TR + 0.2), 1318.51, 0.04, 0.5, 0.3]] : [['pluck', r3(b[0] + TR + 0.3), 739.99, 0.025, 0.3, -0.2]])]),
    ['pop', r3(END + 0.15), 1318.51, 0.045, -0.2], ['glitter', r3(END + 0.2), r3(END + 0.6)],
  ]
  return makeFilm({ id: cfg.id, last: cfg.last, DURATION: 20, bug: ['CORPORATE SPEAK', 'FOR DATING'], hook: `Corporate speak for *dating*, | presented by ${name}.`, hookSize: 66, hookAccent: 100, accent: cfg.accent || HC,
    hookOut: [11.6, 11.85], starsAt: 11.75, lastAt: 12.05, boxClose: 15.15, cut: B[2][0], setup, cues, flashes: [B[0][0], B[1][0]] })
}

// ═══════════════════════════════════════════════════════════════════════════ 18 ME EXPLAINING TO MY FRIENDS
// cfg: { id, sign, friends: [a, b], accent, deep, hook, board ('THE CASE'), exhibits: [{ icon, label: [l1, l2], sticker } × 3],
//        twist: { friendLine, heroLine, phone: [msgs], cheer, friendsCry }, last }
export function makeExplain(cfg) {
  const HC = signStar(cfg.sign).color
  const B = [[2.3, 5.0], [5.0, 7.7], [7.7, 11.4]], END = 11.4
  const BX = 300, BY = 440, BW = 720, BH = 560
  const POS = [[BX + 170, BY + 210], [BX + 550, BY + 210], [BX + 360, BY + 430]]
  const isPis = cfg.sign === 'pisces'
  const fr = cfg.friends
  function exhibit(x, t, i) {
    const a = B[i][0] + 0.15, k = pop01(t, a, 0.3, 2.4)
    if (k <= 0.01) return
    const [cx, cy] = POS[i], E = cfg.exhibits[i]
    x.save(); x.translate(cx, cy); x.rotate([-0.05, 0.06, -0.03][i]); x.scale(k, k)
    box(x, -150, -110, 300, 210, ['#fff3a8', '#ffd1e3', '#c9f2d4'][i], { b: 5 })
    R(x, 'rgba(0,0,0,0.12)', -150, -110, 300, 14)
    label(x, `EXHIBIT ${'ABC'[i]}`, 0, -82, { size: 20, col: '#7a6e96', shadow: false })
    icon(x, E.icon, 0, -26, 8)
    const lines = E.label
    lines.forEach((L, j) => label(x, L, 0, 58 + j * 27 - (lines.length - 1) * 13, { size: 22, col: INK, shadow: false }))
    x.restore()
  }
  function strings(x, t) {
    // red marker arrows linking the exhibits as they land
    const seg = (p0, p1, a) => {
      const q = ease.outCubic(prog(t, a, a + 0.4)); if (q <= 0) return
      const x1 = lerp(p0[0], p1[0], q), y1 = lerp(p0[1], p1[1], q)
      x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'; x.setLineDash([18, 12]); x.beginPath(); x.moveTo(p0[0], p0[1]); x.lineTo(x1, y1); x.stroke(); x.restore()
    }
    seg([POS[0][0] + 150, POS[0][1]], [POS[1][0] - 150, POS[1][1]], B[1][0] + 0.45)
    seg([POS[1][0] - 60, POS[1][1] + 105], [POS[2][0] + 120, POS[2][1] - 100], B[2][0] + 0.45)
    if (t > B[1][0] + 0.9) icon(x, 'question', BX + 640, BY + 400, 6, { rot: 0.15 })
    if (t > B[2][0] + 0.9) icon(x, 'bang', BX + 80, BY + 420, 7, { rot: -0.2 })
  }
  function setup(root) {
    const stickers = cfg.exhibits.map((E, i) => buildSticker(root, { badge: [GOLD, PINK, '#9fe6b0'][i], badgeText: 'ABC'[i], text: E.sticker, deep: cfg.deep, at: B[i][0] + 0.45, out: [B[i][1] - (i === 2 ? 1.6 : 0.2), B[i][1] - (i === 2 ? 1.4 : 0)], tilt: [-1.6, 1.4, -1.1][i], top: 1385, size: 46 }))
    const T2 = B[2][0]
    return {
      draw(x, t) {
        // the room
        R(x, '#1d1636', 0, 1180, 1080, 740); R(x, '#2a2150', 0, 1180, 1080, 10)
        // the whiteboard on its easel
        R(x, INK, BX + 90, BY + BH, 18, 200); R(x, INK, BX + BW - 108, BY + BH, 18, 200)
        box(x, BX, BY, BW, BH, '#f4f1ea', { b: 10 })
        R(x, '#bdb6cc', BX, BY + BH - 22, BW, 22)
        label(x, cfg.board, BX + BW / 2, BY + 46, { size: 34, col: '#3a5bd9', shadow: false, rot: -0.02 })
        R(x, '#3a5bd9', BX + BW / 2 - 170, BY + 72, 340, 5)
        strings(x, t)
        for (let i = 0; i < 3; i++) exhibit(x, t, i)
        // the hero with a pointer: jabs at the newest exhibit
        const ti = t < B[0][0] ? -1 : t < B[1][0] ? 0 : t < B[2][0] ? 1 : 2
        const tgt = ti < 0 ? [BX + 360, BY + 60] : POS[ti]
        const jab = [-0.12, 0.95, ...B.flatMap(b => [b[0] + 0.15, b[0] + 0.9, b[0] + 1.6])]
        const hm = t < B[0][0] ? 'wide' : t >= T2 + 1.0 && cfg.twist.heroMood ? (t > T2 + (cfg.twist.heroAt ?? 2.0) ? cfg.twist.heroMood : 'wide') : (t % 1.3 < 0.7 ? 'wide' : 'sparkle')
        shadow(x, 160, 1240, 220)
        const F = sign(x, t, cfg.sign, { x: 160, y: 1090, s: 240, mood: hm, look: [1, -0.6], hops: jab, seed: 3, tears: isPis ? (t > T2 ? 3 : 2) : 0 })
        const wig = 12 * Math.sin(t * 9)
        x.save(); x.strokeStyle = INK; x.lineWidth = 14; x.lineCap = 'round'; x.beginPath(); x.moveTo(F.ox + 90, F.cy - 20); x.lineTo(tgt[0] - 85 + wig, tgt[1] - 10); x.stroke()
        x.strokeStyle = '#c99a5e'; x.lineWidth = 8; x.beginPath(); x.moveTo(F.ox + 90, F.cy - 20); x.lineTo(tgt[0] - 85 + wig, tgt[1] - 10); x.stroke(); R(x, RED, tgt[0] - 93 + wig, tgt[1] - 18, 16, 16); x.restore()
        // the couch with the two friends
        box(x, 430, 1210, 620, 120, '#7a4fb0', { b: 7, hi: '#9a6fd0' })
        box(x, 410, 1150, 50, 180, '#6a3fa0', { b: 6 }); box(x, 1020, 1150, 50, 180, '#6a3fa0', { b: 6 })
        const cheer = cfg.twist.cheer && t > T2 + 1.0
        fr.forEach((id, j) => {
          const fx = j ? 880 : 610
          let mood = ti < 1 ? 'neutral' : ti < 2 ? (j ? 'wide' : 'eyeroll') : (cheer || t > T2 + 1.0 ? (cfg.twist.moods ? cfg.twist.moods[j] : 'happy') : 'squint')
          if (t < B[0][0]) mood = 'neutral'
          const pis = id === 'pisces'
          const hops = cheer ? [T2 + 1.05 + j * 0.1, T2 + 1.5 + j * 0.1, T2 + 1.95 + j * 0.1, T2 + 2.4 + j * 0.1] : [B[0][0] + 1.3 + j * 0.2]
          sign(x, t, id, { x: fx, y: 1165, s: 170, mood, look: [-1, -0.5], hops, seed: 5 + j, tears: pis ? (ti < 1 ? 1 : ti < 2 ? 2 : 3) : (cfg.twist.friendsCry && t > T2 + 1.2 ? 2 : 0) })
          if (ti === 0 && t > B[0][0] + 1.0 && !pis) icon(x, 'question', fx + 70, 1010 - 6 * Math.sin(t * 5), 5)
          if (ti === 1 && t > B[1][0] + 1.0) icon(x, j ? 'bang' : 'question', fx + 70, 1010 - 6 * Math.sin(t * 5 + j), 5)
        })
        if (isPis) tissues(x, 1000, 1110, 60)
        else if (fr.includes('pisces')) tissues(x, 980, 1110, 60)
        if (cheer) { confetti(x, t, T2 + 1.05, 740, 1050); hearts(x, t, T2 + 1.2, 745, 1080, { n: 6 }) }
        if (cfg.twist.friendsCry) hearts(x, t, T2 + 1.3, 745, 1080, { n: 5 })
        // the twist: speech bubbles and an optional phone
        const tw = cfg.twist
        if (tw.friendLine) bubble(x, t, tw.friendX ?? 690, tw.friendY ?? 1035, T2 + 1.0, END + 0.2, tw.friendLine, { size: 34, tail: 0.2 })
        if (tw.heroLine) bubble(x, t, tw.heroX ?? 300, 880, T2 + (tw.heroAt ?? 2.0), END + 0.2, tw.heroLine, { size: 34, tail: -0.5 })
        if (tw.phone) chatPhone(x, t, 830, 640, tw.phone.map(m => ({ ...m, at: T2 + m.at })), { k: pop01(t, T2 + tw.phoneAt, 0.3, 2.2) * outK(t, [END + 0.1, END + 0.4]), rot: 0.08, w: 400, h: 210, name: tw.phoneName || '' })
        hearts(x, t, END + 0.1, 160, 900, { n: 4 })
      },
      update(t) { stickers.forEach(s => s.update(t)) },
    }
  }
  const T2 = B[2][0]
  const cues = [
    ...[-0.12, 0.95].filter(c => c > 0).map(c => ['tom', r3(c), 140, { gain: 0.12, decay: 0.12 }]),
    ...B.flatMap((b, i) => [['whoosh', r3(b[0] + 0.05), 0.22, 0.03], ['tom', r3(b[0] + 0.15), 120, { gain: 0.18, decay: 0.15 }], ['pop', r3(b[0] + 0.17), 987.77, 0.04, 0.2],
      ['pop', r3(b[0] + 0.45), 1174.66, 0.045, 0.1], ['tick', r3(b[0] + 0.47), 0.05], ['tom', r3(b[0] + 0.9), 150, { gain: 0.12, decay: 0.1 }], ['tom', r3(b[0] + 1.6), 150, { gain: 0.12, decay: 0.1 }]]),
    ['riser', r3(B[1][0] + 0.45), r3(B[1][0] + 0.85), 0.012], ['riser', r3(T2 + 0.45), r3(T2 + 0.85), 0.012],
    ...(cfg.twist.cheer ? [['clap', r3(T2 + 1.05), { gain: 0.14, pan: -0.3 }], ['clap', r3(T2 + 1.5), { gain: 0.14, pan: 0.3 }], ['clap', r3(T2 + 1.95), { gain: 0.16 }], ['glitter', r3(T2 + 1.05), r3(T2 + 1.8)]] : []),
    ...(cfg.twist.friendLine ? [['pop', r3(T2 + 1.0), 880, 0.04, 0.3]] : []),
    ...(cfg.twist.heroLine ? [['pop', r3(T2 + (cfg.twist.heroAt ?? 2.0)), 659.25, 0.04, -0.3]] : []),
    ...(cfg.twist.phone ? cfg.twist.phone.map(m => ['pluck', r3(T2 + m.at), 1318.51, 0.035, 0.4, 0.2]) : []),
    ['pluck', r3(END + 0.1), 1567.98, 0.035, 0.4, 0],
  ]
  return makeFilm({ id: cfg.id, last: cfg.last, DURATION: 20, bug: ['ME EXPLAINING', 'TO MY FRIENDS'], hook: cfg.hook, hookSize: cfg.hookSize ?? 62, hookAccent: cfg.hookAccent ?? 92, accent: cfg.accent || HC,
    hookOut: [11.45, 11.7], starsAt: 11.65, lastAt: 11.95, boxClose: 15.15, cut: B[2][0], setup, cues, flashes: [B[0][0], B[1][0]] })
}

// ═══════════════════════════════════════════════════════════════════════════ 19 INSTANT GREEN FLAG (15 s)
// cfg: { id, sign, date, accent, hook, line (the date's bubble), lineAt, prop(x, t, S) optional, phone: [msgs] optional,
//        extra(x, t) optional (crowd etc.), heroMood0, last }
export function makeFlag(cfg) {
  const HC = signStar(cfg.sign).color
  const LINE = cfg.lineAt ?? 1.5, REACT = 3.3, FLAG = 4.1, END = 6.0
  function setup(root) {
    const banner = buildBanner(root, { top: 1500, text: 'INSTANT *GREEN FLAG*', size: 84, accent: '#7cf0a8', at: FLAG + 0.25, out: [END - 0.2, END], bg: INK, border: GREEN, tilt: -3 })
    return {
      draw(x, t) {
        R(x, '#1d1636', 0, 1320, 1080, 600); R(x, '#2a2150', 0, 1320, 1080, 10)
        x.save(); x.translate(0, 140)
        // the flag springs up behind them
        const fk = easeOutBack(prog(t, FLAG, FLAG + 0.5), 1.8)
        if (fk > 0.01) {
          const topY = lerp(1180, 470, fk)
          R(x, INK, 532, topY - 10, 22, 1190 - topY); R(x, '#d8cfe6', 538, topY - 6, 10, 1190 - topY)
          drawPixelStar(x, 543, topY - 18, 40, 2, GOLD)
          // waving cloth
          const cw = 320, ch = 210
          for (let i = 0; i < 16; i++) {
            const sx = 554 + i * cw / 16, wv = 14 * Math.sin(t * 7 - i * 0.55) * (i / 16)
            R(x, INK, sx, topY + wv - 6, cw / 16 + 1, ch + 12)
            R(x, i % 4 === 0 ? '#3fb86c' : GREEN, sx, topY + wv, cw / 16 + 1, ch)
          }
          const wv = 14 * Math.sin(t * 7 - 8 * 0.55) * 0.5
          icon(x, 'check', 554 + cw / 2, topY + ch / 2 + wv, 18, { outline: INK })
          confetti(x, t, FLAG + 0.1, 540, 520, { cols: [GREEN, '#9fe6b0', BONE, GOLD], n: 30 })
          sparkles(x, t, 700, 560, FLAG + 0.05, 12, 260, 1, [GREEN, BONE, GOLD])
        }
        if (cfg.prop) cfg.prop(x, t, { LINE, REACT, FLAG, END })
        // the two of them
        const gone = outK(t, [END + 3.8, END + 4.1])
        const hm = t < REACT ? (cfg.heroMood0 || 'happy') : t < REACT + 0.4 ? 'wide' : 'heart'
        shadow(x, 300, 1190, 230); shadow(x, 780, 1190, 230)
        sign(x, t, cfg.sign, { x: 300, y: 1040, s: 260, mood: hm, look: t < REACT ? [1, 0] : [1, -0.3], hops: [-0.15, REACT, REACT + 0.45, FLAG + 0.1], seed: 3, blush: t > REACT + 0.4 ? 1 : undefined, alpha: gone, ...(cfg.heroOpts || {}) })
        sign(x, t, cfg.date, { x: 780, y: 1040, s: 250, mood: t < LINE ? 'neutral' : cfg.dateMood || 'happy', look: [-1, 0], hops: [LINE - 0.05, FLAG + 0.2], seed: 7, alpha: gone })
        if (cfg.line) bubble(x, t, cfg.lineX ?? 700, cfg.lineY ?? 820, LINE, END - 0.1, cfg.line, { size: cfg.lineSize ?? 34, tail: 0.3 })
        if (cfg.phone) chatPhone(x, t, 560, 720, cfg.phone, { k: pop01(t, cfg.phoneAt ?? 0, 0.3, 2.2) * outK(t, [FLAG - 0.15, FLAG + 0.1]), rot: -0.05, w: 420, h: 400, name: cfg.phoneName || '' })
        hearts(x, t, REACT + 0.45, 300, 860, { n: 7 })
        if (cfg.extra) cfg.extra(x, t, { LINE, REACT, FLAG, END })
        // Pisces in the back, happy-crying at the whole thing
        const pk = pop01(t, cfg.pisAt ?? -1, 0.3, 2)
        tissues(x, 1000, 690, 56)
        sign(x, t, 'pisces', { x: 930, y: 640, s: 120, mood: 'sparkle', look: [-1, 0.6], tears: t < FLAG ? 2 : 3, seed: 6, pop: pk, hops: [FLAG + 0.2, FLAG + 0.6] })
        x.restore()
      },
      update(t) { banner.update(t) },
    }
  }
  const cues = [
    ['pop', r3(LINE), 880, 0.045, 0.3], ['pluck', r3(LINE + 0.1), 1174.66, 0.03, 0.4, 0.3],
    ['tick', r3(REACT), 0.06], ['pop', r3(REACT + 0.05), 659.25, 0.035, -0.3], ['pluck', r3(REACT + 0.45), 1318.51, 0.04, 0.5, -0.3], ['glitter', r3(REACT + 0.45), r3(REACT + 1.0)],
    ['riser', r3(FLAG - 0.6), r3(FLAG), 0.015], ['whoosh', r3(FLAG - 0.1), 0.3, 0.04], ['boom', r3(FLAG + 0.25), 0.28], ['tom', r3(FLAG + 0.25), 92, { gain: 0.28, decay: 0.3 }],
    ['bell', r3(FLAG + 0.3), 1760, 0.04, 1.2, 0], ['bell', r3(FLAG + 0.45), 2349.32, 0.03, 1.0, 0.2], ['glitter', r3(FLAG + 0.25), r3(FLAG + 1.0)],
    ...(cfg.phone ? cfg.phone.map(m => ['pluck', r3(m.at), m.me ? 987.77 : 1318.51, 0.035, 0.4, m.me ? -0.2 : 0.2]) : []),
    ...(cfg.cues || []),
  ]
  return makeFilm({ id: cfg.id, last: cfg.last, DURATION: 15, bug: ['INSTANT', 'GREEN FLAG'], hook: cfg.hook, hookSize: cfg.hookSize ?? 76, hookAccent: cfg.hookAccent ?? 108, accent: cfg.accent || '#7cf0a8',
    hookOut: [END - 0.1, END + 0.15], starsAt: END + 0.05, lastAt: END + 0.35, boxClose: 10.15, cut: END, setup, cues, shakeAt: [FLAG + 0.25] })
}

// ═══════════════════════════════════════════════════════════════════════════ 20 CHOOSE YOUR SIGN
// cfg: { id, hook, accent, picks: [{ sign | 'you', name?, stats: [[label, 1–5], [label, 1–5]], move } × 3],
//        pathAt0: [tile ids the cursor crosses in the hook], selected ('SELECTED!'), p2 (PLAYER 2 JOINED), last }
export function makeSelect(cfg) {
  const B = [[2.2, 5.4], [5.4, 8.6], [8.6, 11.8]], END = 11.8
  const SX = 60, SY = 380, SW = 960, SH = 960
  const tile = id => { const i = ORDER.indexOf(id); return [SX + 130 + (i % 4) * 233, SY + 105 + Math.floor(i / 4) * 160] }
  const you = cfg.picks[2].sign === 'you'
  const YOU_POS = [540, SY + 265]
  // the cursor path: the hook roams, then each pick
  const roam = (cfg.roam || ['aries', 'gemini', 'virgo', 'scorpio']).map(tile)
  function cursorAt(t) {
    if (t < B[0][0]) {
      const n = roam.length - 1, u = ((t + 0.6) / (B[0][0] + 0.6)) * n, i = Math.min(n - 1, Math.floor(u)), f = ease.inOutCubic(clamp(u - i))
      return [lerp(roam[i][0], roam[i + 1][0], f), lerp(roam[i][1], roam[i + 1][1], f)]
    }
    const pts = [roam[roam.length - 1], ...cfg.picks.map(p => p.sign === 'you' ? YOU_POS : tile(p.sign))]
    let k = 0; B.forEach((b, i) => { if (t >= b[0]) k = i })
    const f = ease.inOutCubic(prog(t, B[k][0], B[k][0] + 0.35))
    return [lerp(pts[k][0], pts[k + 1][0], f), lerp(pts[k][1], pts[k + 1][1], f)]
  }
  function cardOf(x, t, i) {
    const P = cfg.picks[i], a = B[i][0] + 0.3, k = easeOutBack(prog(t, a, a + 0.3), 1.6), o = outK(t, i < 2 ? [B[i][1] - 0.15, B[i][1]] : [END + 3.6, END + 3.9])
    if (k * o <= 0.01) return
    const id = P.sign, nm = (P.name || (id === 'you' ? 'YOU' : signName(id))).toUpperCase()
    x.save(); x.translate(lerp(-900, 0, k), 0); x.globalAlpha *= clamp(o)
    box(x, SX + 30, SY + 545, SW - 60, 380, '#120c28', { b: 6 })
    R(x, i === 2 ? PINK : GOLD, SX + 30, SY + 545, SW - 60, 8)
    // portrait
    const px = SX + 180, py = SY + 760
    R(x, '#221a44', px - 120, SY + 575, 240, 320)
    if (id === 'you') icon(x, 'mirror', px, py - 20, 26, { outline: INK })
    sign(x, t, id, { x: px, y: id === 'you' ? py - 30 : py, s: id === 'you' ? 150 : 200, mood: id === 'pisces' ? 'sparkle' : (P.mood || 'happy'), look: [0.6, 0], hops: [a + 0.3, a + 0.9], seed: 4 + i, tears: id === 'pisces' ? 3 : 0, glyph: id !== 'you' })
    // name + stats + special move
    const tx0 = SX + 330
    x.font = `800 58px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(nm, tx0, SY + 605)
    P.stats.forEach(([lab, n], j) => {
      const y = SY + 675 + j * 52
      label(x, lab, tx0, y, { size: 24, col: 'rgba(239,230,214,0.8)', align: 'left', shadow: false })
      for (let q = 0; q < 5; q++) { const fillOn = q < n && t > a + 0.35 + j * 0.15 + q * 0.06; box(x, tx0 + 270 + q * 52, y - 14, 40, 28, fillOn ? (j ? SKYB : GOLD) : '#2c2450', { b: 3 }) }
    })
    label(x, 'SPECIAL MOVE:', tx0, SY + 790, { size: 24, col: i === 2 ? PINK : GOLD, align: 'left', shadow: false })
    x.font = `700 34px ${INTER}`
    const vis = clamp(prog(t, a + 0.6, a + 0.6 + P.move.length / 48))
    const L = wrap(x, P.move, 580)
    let left = Math.round(vis * P.move.length)
    L.forEach((s, j) => { const part = s.slice(0, Math.max(0, left)); left -= s.length + 1; x.fillStyle = BONE; x.fillText(part, tx0, SY + 840 + j * 44) })
    x.restore()
  }
  function setup(root) {
    const sel = buildBanner(root, { top: SY + 150, text: cfg.selected || 'SELECTED*!*', size: 110, accent: GOLD, at: END + 0.05, out: [END + 0.0 + 3.5, END + 3.75], tilt: -3, bg: INK, border: GOLD })
    const p2 = cfg.p2 ? buildBanner(root, { top: SY + 30, text: 'PLAYER 2 *JOINED!*', size: 76, accent: PINK, at: B[2][0] + 0.15, out: [B[2][0] + 1.6, B[2][0] + 1.85], tilt: 2.5, bg: INK, border: PINK }) : null
    return {
      draw(x, t) {
        // the arcade screen
        box(x, SX, SY, SW, SH, '#0c0820', { b: 10 })
        R(x, '#3a2d66', SX, SY, SW, 6)
        const dim = you ? clamp(prog(t, B[2][0], B[2][0] + 0.4)) * outK(t, [END + 3.6, END + 3.9]) : 0
        ORDER.forEach((id, i) => {
          const [cx, cy] = tile(id)
          const hot = t > 0 && cfg.picks.some((p, j) => p.sign === id && t >= B[j][0] + 0.35 && t < (j < 2 ? B[j][1] : 99))
          box(x, cx - 105, cy - 70, 210, 140, hot ? '#3a2d66' : '#1a1338', { b: 4 })
          sign(x, t, id, { x: cx, y: cy + 2, s: 92, mood: id === 'pisces' ? 'sparkle' : hot ? 'happy' : 'neutral', look: [0, 0], seed: i, tears: id === 'pisces' ? 2 : 0, alpha: 1 - 0.65 * dim, tips: false })
          label(x, signName(id).toUpperCase(), cx, cy + 56, { size: 16, col: hot ? GOLD : 'rgba(239,230,214,0.65)', shadow: false, alpha: 1 - 0.6 * dim })
        })
        // the mystery / mirror tile for the 'you' twist
        if (you) {
          const k = pop01(t, B[2][0] + 0.05, 0.35, 2.2) * outK(t, [END + 3.6, END + 3.9])
          if (k > 0.01) {
            x.save(); x.translate(...YOU_POS); x.scale(k, k)
            box(x, -130, -90, 260, 180, '#3a2d66', { b: 6 }); R(x, PINK, -130, -90, 260, 6)
            icon(x, 'mirror', 0, -10, 14, { outline: INK })
            label(x, cfg.youTile || 'YOU', 0, 66, { size: 24, col: PINK, shadow: false })
            x.restore()
          }
        }
        // cursor (P1, gold) — and P2 (pink) if they joined
        const [cx, cy] = cursorAt(t)
        const blink = Math.floor(t * 4) % 2 ? 1 : 0.6
        const cur = (X, Y, col, tag, w = 222, h = 152) => {
          x.save(); x.globalAlpha *= blink
          const L = 30
          for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { R(x, col, X + sx * w / 2 - (sx > 0 ? 8 : 0), Y + sy * h / 2 - (sy > 0 ? L : 0), 8, L); R(x, col, X + sx * w / 2 - (sx > 0 ? L : 0), Y + sy * h / 2 - (sy > 0 ? 8 : 0), L, 8) }
          x.restore()
          box(x, X - w / 2 - 4, Y - h / 2 - 40, 56, 30, col, { b: 3 }); label(x, tag, X - w / 2 + 24, Y - h / 2 - 25, { size: 18, col: INK, shadow: false })
        }
        const onYou = you && t >= B[2][0] + 0.35
        cur(cx, cy, GOLD, 'P1', onYou ? 284 : 222, onYou ? 204 : 152)
        if (cfg.p2 && t >= B[2][0] + 0.1) { const f = ease.outCubic(prog(t, B[2][0] + 0.1, B[2][0] + 0.5)); cur(lerp(1100, YOU_POS[0], f) + 10, YOU_POS[1] + 10, PINK, 'P2', 300, 220) }
        // the idle prompt under the grid until the first pick
        const ik = outK(t, [B[0][0] + 0.15, B[0][0] + 0.35])
        if (ik > 0.01) {
          box(x, SX + 30, SY + 545, SW - 60, 380, '#120c28', { b: 6 })
          label(x, 'PLAYER 1', 540, SY + 640, { size: 64, col: GOLD, alpha: ik })
          label(x, Math.floor(t * 2.5) % 2 ? '▸ PICK A SIGN ◂' : '  PICK A SIGN  ', 540, SY + 730, { size: 40, col: BONE, alpha: ik })
          for (let q = 0; q < 12; q++) drawPixelStar(x, SX + 120 + q * 65, SY + 840, 18, q % 2 ? 1 : 2, q % 3 ? GOLD : PINK)
        }
        for (let i = 0; i < 3; i++) cardOf(x, t, i)
        sparkles(x, t, YOU_POS[0], YOU_POS[1], you ? B[2][0] + 0.4 : -9, 10, 160, 1, [PINK, GOLD, BONE])
        confetti(x, t, END + 0.05, 540, 1100, { n: 34 })
        // scanlines
        x.save(); x.globalAlpha = 0.08; for (let y = SY; y < SY + SH; y += 6) R(x, '#000', SX, y, SW, 2); x.restore()
      },
      update(t) { sel.update(t); if (p2) p2.update(t) },
    }
  }
  const cues = [
    ...[0.15, 0.85, 1.55].map((c, i) => ['pop', r3(c), NOTE[i + 2], 0.03, (i - 1) * 0.3]),
    ...B.flatMap((b, i) => [['tick', r3(b[0]), 0.06], ['pop', r3(b[0] + 0.05), NOTE[3 + i], 0.04, 0], ['whoosh', r3(b[0] + 0.28), 0.25, 0.03], ['pop', r3(b[0] + 0.32), 1174.66, 0.04, -0.2],
      ...[0, 1, 2, 3, 4].map(q => ['pop', r3(b[0] + 0.65 + q * 0.06), NOTE[q], 0.02, 0.3]), ['pluck', r3(b[0] + 1.0), 1318.51, 0.03, 0.4, 0.1]]),
    ...(cfg.p2 ? [['riser', r3(B[2][0] - 0.3), r3(B[2][0] + 0.15), 0.015], ['bell', r3(B[2][0] + 0.15), 1760, 0.035, 1.0, 0.2]] : you ? [['riser', r3(B[2][0] - 0.3), r3(B[2][0] + 0.1), 0.015], ['glitter', r3(B[2][0] + 0.4), r3(B[2][0] + 1.0)]] : [['glitter', r3(B[2][0] + 0.4), r3(B[2][0] + 0.9)]]),
    ['boom', r3(END + 0.05), 0.26], ['tom', r3(END + 0.05), 98, { gain: 0.26, decay: 0.28 }], ['bell', r3(END + 0.12), 1760, 0.04, 1.2, 0], ['glitter', r3(END + 0.1), r3(END + 0.8)],
  ]
  return makeFilm({ id: cfg.id, last: cfg.last, DURATION: 20, bug: ['CHOOSE', 'YOUR SIGN'], hook: cfg.hook, hookSize: 66, hookAccent: 100, accent: cfg.accent || GOLD,
    hookOut: [END + 0.0, END + 0.25], starsAt: END + 0.1, lastAt: END + 0.45, boxClose: 15.15, cut: B[2][0], setup, cues, flashes: [B[0][0], B[1][0]], shakeAt: [END + 0.05] })
}
