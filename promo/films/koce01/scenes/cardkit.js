// ONE CARD, TWO PEOPLE (Month 2 boost, star_advice posts, batch m22): the shared look of koce01–koce20.
// promo/films/month2/m22.md has the rows. The other 19 films import this file (read-only for everyone else).
//
// The format: two signs at a little café table under a pendant lamp, one talk card between them. Pisces is the dealer
// (behind the table, with a tissue box) and cries at every reveal; when Pisces is one of the two players, THE STARS
// (the gold narrator star) deals instead and Pisces cries as a player. The card flips, the question slams up big, both
// answer face down (neither answer shows until both have played), the answers flip together, a reaction gag, THE STARS
// say why the question brings people closer, the last line. No end card, no card cut, no logo, no brand name.
//
//   makeFilm(cfg) → { DURATION, SCENES, CUES }
//   cfg = {
//     id, dur, ending: 'cut' | 'loop', brk: 'whip' | 'scratch' | 'flash' | 'silence' (the first-second pattern break),
//     A: 'aries', B: 'cancer'                    sign ids (left / right player)
//     hook: { text, out }                        ≤ 7 words, *accent*, on screen at t = 0 (out = when it leaves)
//     cards: [{ q, topic, rare, kind, opts, at, big, write, reveal, done, ans: { A, B } }]
//        at = the flip (card 1: the frame-0 mid-air spin lands then), big = when the big question shrinks to the top
//        chip, write = the answer cards go down face down, reveal = they flip, done = everything clears.
//     lines: [{ t, who: 'A' | 'B' | 'P' | 'S', text }]   the dialogue box (S = THE STARS). boxes: [{ from, to, open, close }]
//     last: { at, text }                         the last line (canvas, big, centred at y ≈ 300)
//     mood: { A: [[t, mood, look?, squash?]], B: [...], P: [...] }   step keys (P = Pisces, dealer or player)
//     cry: [[t0, t1, level 1–3]]                 Pisces' tears (and cryA / cryB for the others)
//     f0: { spin }                              frame-0 card spin; draw: { back, cast, mid, front, over }(x, t, S)
//        back: behind the cast · cast: over the cast, under the table · mid: on the table · front: over the cards · over: screen space
//     offset: { A: t => [dx, dy], B, P }           move a character (lunges, leaning in)
//     chapters: [{ at, text }] (long films), stickers: [{ at, out, text, x, y, rot, col }]
//     cam: [[t, zoom, cx, cy]] camera keys (eased), punch: [{ at, dur, z, x, y }], extraCues: [...]
//     music: { style, key, seed, sections }
//   }
// Everything is a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, frozen, screenShake, shakeCues, chapter as kitChapter, chapterCues, loopBack, loopCues } from '../../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', CYAN = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
export const win = (t, a, b, fi = 0.25, fo = 0.25) => clamp(Math.min(prog(t, a, a + fi), 1 - prog(t, b - fo, b)))
export { clamp, lerp, prog, ease, rng, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// the real talk-card topics (app/src/data/talkCards.ts): arcana name + numeral, glyph, colour
export const TOPIC = {
  everyday: { arc: 'THE SUN', num: 'XIX', glyph: '☼', col: '#f2c75c', label: 'EVERYDAY' },
  romance: { arc: 'THE LOVERS', num: 'VI', glyph: '♡', col: '#f08aa8', label: 'ROMANCE' },
  food: { arc: 'THE EMPRESS', num: 'III', glyph: '✿', col: '#f39a3a', label: 'FOOD' },
  family: { arc: 'THE HEARTH', num: 'V', glyph: '⌂', col: '#7fd8b0', label: 'FAMILY & KIDS' },
  money: { arc: 'WHEEL OF FORTUNE', num: 'X', glyph: '◈', col: '#9fd86a', label: 'MONEY' },
  future: { arc: 'THE STAR', num: 'XVII', glyph: '✦', col: '#7fc8f0', label: 'FUTURE' },
  conflict: { arc: 'THE TOWER', num: 'XVI', glyph: '⚡', col: '#ff7a6a', label: 'CONFLICT' },
  fun: { arc: 'THE FOOL', num: '0', glyph: '✧', col: '#b18cff', label: 'JUST FOR FUN' },
}
const NAME = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
export const tagOf = id => `${signStar(id).glyph} ${NAME[id]}`

// ─────────────────────────────────────────────── layout (world px, 1080×1920)
export const POS = { A: [250, 1150], B: [830, 1150], P: [540, 1040], S: [540, 1040] }
export const SIZE = { A: 330, B: 330, P: 200 }
export const TABLE_Y = 1290
export const BIG = { x: 540, y: 870, w: 640, h: 900 }
export const CHIP = { x: 540, y: 330, w: 900, h: 150 }

// ─────────────────────────────────────────────── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
/** bitmap rows of chars → cells, 1-cell ink outline, centred on (cx, cy) */
export function bits(x, bm, cols, cx, cy, cell, { rot = 0, alpha = 1, sx = 1, sy = 1, outline = INK } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) { x.fillStyle = outline; for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch] || cols.X; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

/** split '*accent*' markup into runs: [{ s, acc }] */
function runs(text) { const out = []; let acc = false; for (const part of text.split('*')) { if (part) out.push({ s: part, acc }); acc = !acc } return out }
/** word-wrap a rich string to maxW with the given fonts → lines of runs */
function wrapRich(x, text, maxW, f, fa) {
  const words = []; for (const r of runs(text)) for (const w of r.s.split(/(\s+)/)) if (w) words.push({ s: w, acc: r.acc })
  const lines = [[]]; let w0 = 0
  for (const w of words) {
    x.font = w.acc ? fa : f
    const ww = x.measureText(w.s).width
    if (/^\s+$/.test(w.s)) { if (lines[lines.length - 1].length) { lines[lines.length - 1].push({ ...w, ww }); w0 += ww } continue }
    if (w0 + ww > maxW && lines[lines.length - 1].length) { const L = lines[lines.length - 1]; while (L.length && /^\s+$/.test(L[L.length - 1].s)) L.pop(); lines.push([]); w0 = 0 }
    lines[lines.length - 1].push({ ...w, ww }); w0 += ww
  }
  const L = lines[lines.length - 1]; while (L.length && /^\s+$/.test(L[L.length - 1].s)) L.pop()
  return lines.filter(l => l.length)
}
/** rich centred text: '*word*' in accent colour + serif italic; '|' forces a line break. Returns the block height. */
export function richText(x, text, cx, cy, { size = 80, weight = 800, color = BONE, accent = GOLD, accentSize, maxW = 960, lh = 1.1, align = 'center', shadow = true, stroke = 0, alpha = 1, measure = false } = {}) {
  const aS = accentSize ?? Math.round(size * 1.25)
  const f = `${weight} ${size}px ${INTER}`, fa = `italic 600 ${aS}px ${SERIF}`
  const lines = text.split('|').flatMap(p => wrapRich(x, p.trim(), maxW, f, fa))
  const LH = Math.max(size, aS * 0.86) * lh, H = LH * lines.length
  if (measure) return H
  x.save(); x.globalAlpha *= alpha; x.textBaseline = 'middle'; x.textAlign = 'left'
  lines.forEach((L, i) => {
    const w = L.reduce((a, r) => a + r.ww, 0)
    let X = align === 'center' ? cx - w / 2 : cx
    const Y = cy - H / 2 + LH * (i + 0.5)
    for (const r of L) {
      x.font = r.acc ? fa : f
      if (stroke) { x.lineJoin = 'round'; x.lineWidth = stroke; x.strokeStyle = INK; x.strokeText(r.s, X, Y + (r.acc ? size * 0.04 : 0)) }
      if (shadow) { x.fillStyle = 'rgba(8,4,22,0.75)'; x.fillText(r.s, X + 5, Y + 6 + (r.acc ? size * 0.04 : 0)) }
      x.fillStyle = r.acc ? accent : color; x.fillText(r.s, X, Y + (r.acc ? size * 0.04 : 0))
      X += r.ww
    }
  })
  x.restore()
  return H
}
/** fit a rich text block into maxH by shrinking the size */
export function fitSize(x, text, size, maxW, maxH, o = {}) { let s = size; while (s > 30 && richText(x, text, 0, 0, { ...o, size: s, maxW, measure: true }) > maxH) s -= 4; return s }

// ─────────────────────────────────────────────── the café set
const FAIRY = [[-20, 470], [140, 540], [300, 575], [460, 585], [620, 580], [780, 560], [940, 520], [1100, 455]]
function fairyLights(x, t) {
  x.save(); x.strokeStyle = '#2a1e4a'; x.lineWidth = 5; x.beginPath(); x.moveTo(...FAIRY[0])
  for (let i = 1; i < FAIRY.length; i++) { const [a, b] = FAIRY[i - 1], [c, d] = FAIRY[i]; x.quadraticCurveTo((a + c) / 2, Math.max(b, d) + 26, c, d) }
  x.stroke(); x.restore()
  const cols = ['#ffd98a', '#ff8fb1', '#8fe3ff', '#c9a6ff', '#9fe6b0']
  for (let i = 0; i < 15; i++) {
    const u = (i + 0.5) / 15, k = u * (FAIRY.length - 1), j = Math.min(FAIRY.length - 2, Math.floor(k)), f = k - j
    const [a, b] = FAIRY[j], [c, d] = FAIRY[j + 1]
    const bx = lerp(a, c, f), by = lerp(b, d, f) + Math.sin(Math.PI * f) * 20 + 14
    const tw = 0.65 + 0.35 * Math.sin(t * 2.4 + i * 1.9)
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * tw
    const g = x.createRadialGradient(bx, by, 2, bx, by, 46); g.addColorStop(0, cols[i % 5]); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(bx - 46, by - 46, 92, 92); x.restore()
    R(x, INK, bx - 9, by - 12, 18, 24); R(x, cols[i % 5], bx - 6, by - 9, 12, 18); R(x, '#fffbea', bx - 4, by - 7, 4, 4)
  }
}
function pendant(x, t, warm = 1) {
  R(x, '#2a1e4a', 536, 0, 8, 500)
  // shade
  x.fillStyle = INK; x.beginPath(); x.moveTo(470, 560); x.lineTo(610, 560); x.lineTo(570, 496); x.lineTo(510, 496); x.closePath(); x.fill()
  x.fillStyle = '#e8a64a'; x.beginPath(); x.moveTo(480, 554); x.lineTo(600, 554); x.lineTo(566, 502); x.lineTo(514, 502); x.closePath(); x.fill()
  R(x, '#ffe7a8', 520, 554, 40, 10)
  if (warm > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.16 * warm * (0.95 + 0.05 * Math.sin(t * 7))
    const g = x.createLinearGradient(0, 560, 0, TABLE_Y + 60); g.addColorStop(0, '#ffd98a'); g.addColorStop(1, 'rgba(255,217,138,0)')
    x.fillStyle = g; x.beginPath(); x.moveTo(500, 560); x.lineTo(580, 560); x.lineTo(1000, TABLE_Y + 60); x.lineTo(80, TABLE_Y + 60); x.closePath(); x.fill(); x.restore()
  }
}
function floor(x) {
  const g = x.createLinearGradient(0, TABLE_Y - 40, 0, 1920); g.addColorStop(0, 'rgba(26,14,52,0)'); g.addColorStop(0.25, '#1a0f36'); g.addColorStop(1, '#0e0820')
  x.fillStyle = g; x.fillRect(0, TABLE_Y - 40, 1080, 1920)
}
const CLOTH = '#7a2a4a', CLOTH_HI = '#9a3a62', WOOD = '#8a5a3a'
function table(x) {
  // tabletop + cloth with a scalloped hem
  box(x, 90, TABLE_Y, 900, 40, WOOD, { b: 6, hi: '#a87048' })
  R(x, CLOTH, 120, TABLE_Y + 40, 840, 150)
  for (let i = 0; i < 14; i++) { R(x, CLOTH, 120 + i * 60 + 6, TABLE_Y + 190, 48, 14); R(x, INK, 120 + i * 60, TABLE_Y + 186, 6, 22) }
  R(x, CLOTH_HI, 120, TABLE_Y + 40, 840, 12)
  for (let i = 0; i < 7; i++) R(x, 'rgba(255,255,255,0.06)', 150 + i * 120, TABLE_Y + 60, 30, 130)
  R(x, INK, 116, TABLE_Y + 40, 4, 160); R(x, INK, 960, TABLE_Y + 40, 4, 160)
  R(x, INK, 300, TABLE_Y + 200, 26, 400); R(x, INK, 754, TABLE_Y + 200, 26, 400)
}
/** the dealer's tissue box (the running gag); tissues fly out when Pisces sobs (k 0–3) */
export function tissueBox(x, t, X, Y, k = 0) {
  box(x, X - 56, Y - 52, 112, 52, '#7fd0ff', { b: 5, hi: '#bfeaff' })
  R(x, '#3a8ac0', X - 36, Y - 40, 72, 8)
  bits(x, ['..W..', '.WWW.', 'WWWWW', '.WWW.'], { W: '#fbf7ee' }, X, Y - 66, 7)
  if (k >= 2) for (let i = 0; i < (k >= 3 ? 5 : 2); i++) {
    const ph = (t * 1.3 + i / 5) % 1
    const tx = X + Math.sin(i * 2.1) * 140 * ph, ty = Y - 70 - 360 * ph + 420 * ph * ph
    bits(x, ['WWW', 'WgW', 'WWW'], { W: '#fbf7ee', g: '#cfc6dc' }, tx, ty, 8, { rot: ph * 5 + i, alpha: 1 - ph * 0.5 })
  }
}

// ─────────────────────────────────────────────── the cast
const signColor = id => signStar(id).color
/** step keys [[t, mood, look, squash]] → the pose at t */
function keyAt(keys, t, d) { let k = d; if (keys) for (const e of keys) if (t >= e[0]) k = e; return k }
/** Pisces' tears: level 1 drips, 2 streams, 3 a fountain. r = drawStarChar's return. */
export function tears(x, t, r, level = 1, seed = 1) {
  if (level <= 0) return
  const cell = r.size / 36, px = Math.max(4, Math.round(cell * 1.1))
  const ex = r.x, ey = r.y + 1.6 * cell, dx = 5.6 * cell
  const n = level >= 3 ? 8 : level >= 2 ? 5 : 2, rate = level >= 3 ? 1.8 : level >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0) + seed * 0.07) % 1 + 1) % 1
      if (level === 1 && ph > 0.8) continue
      let gx, gy
      if (level >= 3) { gx = ex + d * (dx + 16 * cell * ph); gy = ey - 9 * cell * ph + 26 * cell * ph * ph }
      else if (level >= 2) { gx = ex + d * (dx + 3.2 * cell * ph); gy = ey + 16 * cell * ph * ph }
      else { gx = ex + d * (dx + 0.6 * cell * ph); gy = ey + 9 * cell * ph * ph }
      x.save(); x.globalAlpha *= 1 - ph * 0.5
      R(x, INK, gx - px * 0.65, gy - px * 0.15, px * 1.3, px * 1.9)
      R(x, '#8fe3ff', gx - px / 2, gy, px, px * 1.6); R(x, '#ffffff', gx - px / 2, gy, px / 2, px / 2)
      x.restore()
    }
    R(x, '#8fe3ff', ex + d * dx - (d < 0 ? 3 * cell : 0) - (d < 0 ? 0 : 0), ey + cell * 0.8, 3 * cell, cell * 0.8)
  }
  if (level >= 3) { // a puddle of happy drops on the table under them
    for (let i = 0; i < 4; i++) R(x, 'rgba(143,227,255,0.55)', ex - 90 + i * 50, TABLE_Y - 6 + (i % 2) * 4, 36, 6)
  }
}
/** a sweat drop at the upper side of a star */
export function sweat(x, t, r, side = 1) {
  const cell = r.size / 36, ph = (t * 1.2) % 1
  bits(x, ['..X..', '.XWX.', 'XWWXX', 'XWXXX', '.XXX.'], { X: '#7fd0f0', W: '#ffffff' }, r.x + side * 13 * cell, r.top + 6 * cell + ph * cell * 5, Math.max(3, cell * 0.8), { alpha: 1 - ph * 0.6 })
}
/** hearts floating up from (cx, cy) from t0 */
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 7, spread = 140, life = 1.5, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const p = (t - t0 - i * 0.16) / life
    if (p < 0 || p > 1) continue
    bits(x, HEART, { H: cols[i % cols.length] }, cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, cy - p * 220, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** pixel sparkles bursting from (cx, cy) at t0 */
export function sparkles(x, t, cx, cy, t0, { n = 10, Rr = 160, seed = 1, cols = [GOLD, BONE, PINK] } = {}) {
  const tt = t - t0; if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.6 + 0.6 * p), cy + Math.sin(a) * Rr * (0.6 + 0.6 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  x.restore()
}
/** a speech/thought bubble on the canvas (pops at t0, gone by t1) */
export function bubble(x, t, cx, cy, t0, t1, text, { size = 38, col = BONE, ink = INK, tail = 0, maxW = 420, accent = '#7a3a9a' } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, t1 - 0.15, t1)
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = richText(x, text, 0, 0, { size, maxW, measure: true, weight: 800 })
  x.font = `800 ${size}px ${INTER}`
  const lines = text.split('|'), wMax = Math.min(maxW, Math.max(...lines.map(s => x.measureText(s.replace(/\*/g, '')).width)))
  const w = wMax + 56, H = h + 40
  rr(x, -w / 2 - 6, -H / 2 - 6, w + 12, H + 12, 26); x.fillStyle = ink; x.fill()
  rr(x, -w / 2, -H / 2, w, H, 22); x.fillStyle = col; x.fill()
  if (tail) { x.fillStyle = ink; x.beginPath(); x.moveTo(tail * 20 - 22, H / 2 - 2); x.lineTo(tail * 70, H / 2 + 44); x.lineTo(tail * 20 + 22, H / 2 - 2); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(tail * 20 - 14, H / 2 - 6); x.lineTo(tail * 62, H / 2 + 32); x.lineTo(tail * 20 + 14, H / 2 - 6); x.fill() }
  richText(x, text, 0, 2, { size, maxW, color: ink, accent, shadow: false })
  x.restore()
}
/** a sticker (rotated label) */
export function sticker(x, t, { at, out, text, x: X = 540, y: Y = 300, rot = -0.06, col = GOLD, ink = INK, size = 40, font = MONO }) {
  const k = pop01(t, at, 0.3, 2.6) * outK(t, out - 0.2, out)
  if (k <= 0.01 || t < at) return
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(k, k)
  x.font = `700 ${size}px ${font}`; const w = x.measureText(text).width + 50, h = size + 34
  R(x, ink, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, col, -w / 2, -h / 2, w, h)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

// ─────────────────────────────────────────────── the talk card
const BACK_STARS = [[0, 0, 3], [-0.28, -0.3, 1], [0.3, -0.26, 1], [-0.3, 0.28, 1], [0.27, 0.32, 1], [0, -0.38, 2], [0, 0.4, 2]]
/** one talk card centred at (0, 0) of size w×h. face: 0 back, 1 front. Draw inside a transform. */
function cardBody(x, t, w, h, face, c, { glint = 0 } = {}) {
  const T = TOPIC[c.topic] || TOPIC.fun, rare = c.rare
  x.save(); x.shadowColor = rare ? 'rgba(255,220,120,0.8)' : 'rgba(242,199,92,0.45)'; x.shadowBlur = 44
  rr(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, w * 0.06); x.fillStyle = INK; x.fill(); x.restore()
  if (!face) {
    rr(x, -w / 2, -h / 2, w, h, w * 0.05); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2c1a5c'); g.addColorStop(1, '#140b34'); x.fillStyle = g; x.fill()
    x.strokeStyle = GOLD; x.lineWidth = Math.max(3, w * 0.008); rr(x, -w / 2 + w * 0.05, -h / 2 + w * 0.05, w * 0.9, h - w * 0.1, w * 0.03); x.stroke()
    // a lattice of tiny diamonds + the gold stars (no logo, no mark)
    x.save(); x.globalAlpha = 0.22; x.fillStyle = LAV
    for (let j = -5; j <= 5; j++) for (let i = -3; i <= 3; i++) { const px = i * w * 0.13 + (j % 2 ? w * 0.065 : 0), py = j * h * 0.085; if (Math.abs(px) < w * 0.4 && Math.abs(py) < h * 0.43) { x.save(); x.translate(px, py); x.rotate(Math.PI / 4); x.fillRect(-w * 0.012, -w * 0.012, w * 0.024, w * 0.024); x.restore() } }
    x.restore()
    for (const [u, v, s] of BACK_STARS) drawPixelStar(x, u * w, v * h, w * (s === 3 ? 0.32 : s === 2 ? 0.1 : 0.07), s === 3 ? 2 : 1, s === 3 ? GOLD : BONE)
    x.font = `700 ${Math.round(w * 0.06)}px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('TALK CARD', 0, h * 0.3)
  } else {
    rr(x, -w / 2, -h / 2, w, h, w * 0.05); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, rare ? '#4a3270' : '#3a2470'); g.addColorStop(1, '#1a1040'); x.fillStyle = g; x.fill()
    x.strokeStyle = rare ? '#ffe49a' : GOLD; x.lineWidth = Math.max(3, w * 0.008); rr(x, -w / 2 + w * 0.05, -h / 2 + w * 0.05, w * 0.9, h - w * 0.1, w * 0.03); x.stroke()
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 ${Math.round(w * 0.05)}px ${MONO}`; x.fillStyle = T.col
    x.fillText(`${T.num} · ${T.arc}`, 0, -h / 2 + h * 0.1)
    // the topic glyph medallion
    const my = -h / 2 + h * 0.22
    x.beginPath(); x.arc(0, my, w * 0.09, 0, Math.PI * 2); x.fillStyle = INK; x.fill(); x.strokeStyle = T.col; x.lineWidth = w * 0.012; x.stroke()
    x.font = `700 ${Math.round(w * 0.1)}px 'DejaVu Sans', 'Noto Sans Symbols', ${SERIF}`; x.fillStyle = T.col; x.fillText(T.glyph + '︎', 0, my + w * 0.008)
    // the question
    const qs = fitSize(x, c.q, Math.round(w * 0.105), w * 0.8, h * 0.42)
    richText(x, c.q, 0, h * 0.06, { size: qs, maxW: w * 0.8, color: BONE, accent: GOLD, shadow: false, lh: 1.08 })
    // pick: the two options; otherwise the "both answer, then flip" footer
    if (c.opts) {
      for (const d of [-1, 1]) {
        const ox = d * w * 0.21, oy = h / 2 - h * 0.17
        rr(x, ox - w * 0.18, oy - h * 0.04, w * 0.36, h * 0.08, w * 0.03); x.fillStyle = 'rgba(13,8,32,0.9)'; x.fill(); x.strokeStyle = T.col; x.lineWidth = 3; x.stroke()
        x.font = `800 ${Math.round(w * 0.045)}px ${INTER}`; x.fillStyle = BONE; x.fillText(c.opts[d < 0 ? 0 : 1], ox, oy + 2)
      }
    }
    x.font = `700 ${Math.round(w * 0.036)}px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.7)'
    x.fillText(c.kind === 'who' ? 'WHO’S MORE LIKELY: ME OR YOU' : 'BOTH ANSWER · THEN FLIP', 0, h / 2 - h * 0.07)
    if (rare) { x.font = `700 ${Math.round(w * 0.04)}px ${MONO}`; x.fillStyle = '#ffe49a'; x.fillText(rare === 'legendary' ? '✦ LEGENDARY ✦' : '✦ RARE ✦', 0, -h / 2 + h * 0.155) }
  }
  if (glint > 0) { // a light sweep across the face
    x.save(); rr(x, -w / 2, -h / 2, w, h, w * 0.05); x.clip(); x.globalCompositeOperation = 'lighter'
    const gx = lerp(-w, w, glint); const g = x.createLinearGradient(gx - w * 0.3, -h / 2, gx + w * 0.3, h / 2); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,246,220,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h); x.restore()
  }
}
/** draw a card at (cx, cy), w wide (h = 1.4 w), rot, flip phase f (0 = back, 1 = front; the face swaps at 0.5) */
export function drawCard(x, t, c, cx, cy, w, { rot = 0, f = 1, alpha = 1, glint = 0, h } = {}) {
  if (alpha <= 0 || w <= 1) return
  const H = h ?? w * 1.4, sx = Math.abs(Math.cos(f * Math.PI))
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(Math.max(0.02, sx), 1)
  cardBody(x, t, w, H, f >= 0.5 ? 1 : 0, c, { glint })
  x.restore()
}
/** one answer card: header (who), the answer (rich text) */
function answerBody(x, w, h, face, who, text, col) {
  x.save(); x.shadowColor = 'rgba(242,199,92,0.4)'; x.shadowBlur = 30; rr(x, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 22); x.fillStyle = INK; x.fill(); x.restore()
  rr(x, -w / 2, -h / 2, w, h, 18)
  if (!face) {
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2c1a5c'); g.addColorStop(1, '#140b34'); x.fillStyle = g; x.fill()
    x.strokeStyle = GOLD; x.lineWidth = 3; rr(x, -w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 12); x.stroke()
    drawPixelStar(x, 0, 0, h * 0.35, 2, GOLD)
    return
  }
  x.fillStyle = '#fbf3e2'; x.fill()
  R(x, col, -w / 2, -h / 2 + 2, w, 52); x.save(); rr(x, -w / 2, -h / 2, w, h, 18); x.clip(); R(x, col, -w / 2, -h / 2, w, 54); x.restore()
  x.font = `700 28px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(who, 0, -h / 2 + 28)
  const s = fitSize(x, text, 54, w - 50, h - 90, { weight: 800 })
  richText(x, text, 0, 26, { size: s, maxW: w - 50, color: INK, accent: '#a8326a', shadow: false, lh: 1.05 })
}
export function drawAnswer(x, cx, cy, w, h, f, who, text, col, { rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const sx = Math.abs(Math.cos(f * Math.PI))
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(Math.max(0.02, sx), 1)
  answerBody(x, w, h, f >= 0.5 ? 1 : 0, who, text, col)
  x.restore()
}
/** scribble lines on a little notepad while writing (k 0–1 progress) */
function pencil(x, t, cx, cy, k) {
  if (k <= 0 || k >= 1) return
  const px = cx - 50 + 100 * ((t * 3.3) % 1), py = cy - 16 + 10 * Math.sin(t * 40)
  x.save(); x.translate(px, py); x.rotate(-0.7)
  R(x, INK, -8, -60, 16, 70); R(x, '#f2c75c', -5, -57, 10, 50); R(x, '#ff8fb1', -5, -62, 10, 8); R(x, '#efe6d6', -3, 0, 6, 8); R(x, INK, -1, 8, 2, 4)
  x.restore()
}

// ─────────────────────────────────────────────── the film
/** break a hook into two balanced lines for the slam title (unless it already has ' | ') */
function splitHook(text) {
  if (text.includes('|')) return text
  const w = text.split(' '); if (w.length < 3) return text
  let best = 1, bd = 1e9, tot = text.replace(/\*/g, '').length
  for (let i = 1; i < w.length; i++) { const a = w.slice(0, i).join(' ').replace(/\*/g, '').length, d = Math.abs(a - (tot - a)); if (d < bd) { bd = d; best = i } }
  // never split inside an *accent* run
  let a = w.slice(0, best).join(' '); if ((a.match(/\*/g) || []).length % 2) return text
  return a + ' | ' + w.slice(best).join(' ')
}
export function makeFilm(cfg) {
  const DUR = cfg.dur
  const ids = { A: cfg.A, B: cfg.B }
  const pisPlayer = cfg.A === 'pisces' ? 'A' : cfg.B === 'pisces' ? 'B' : null
  const dealer = pisPlayer ? 'S' : 'P'
  const pisWho = pisPlayer || 'P'
  const TAG = { A: tagOf(cfg.A), B: tagOf(cfg.B), P: tagOf('pisces'), S: 'THE STARS' }
  const COL = { A: signColor(cfg.A), B: signColor(cfg.B), P: signColor('pisces'), S: STAR.sky }
  const lines = (cfg.lines || []).map(l => ({ t: l.t, speaker: TAG[l.who], text: l.text, color: l.color || (l.who === 'S' ? GOLD : COL[l.who]) }))
  const hopsOf = w => [...talkHops(lines, TAG[w], { cps: 28 }), ...((cfg.hops || {})[w] || [])]
  const HOPS = { A: hopsOf('A'), B: hopsOf('B'), P: hopsOf('P'), S: hopsOf('S') }
  const cards = cfg.cards
  const first = cards[0]
  const LOOP = cfg.ending === 'loop'
  const LOOP_LEN = cfg.loopLen ?? 0.45
  const brk = cfg.brk || 'whip'
  const hook = { out: 1.9, ...cfg.hook }

  // the camera: keys + punches + the first-second break
  const CAM = cfg.cam || [[0, 1, 540, 960]]
  function camAt(t) {
    let z = CAM[0][1], cx = CAM[0][2], cy = CAM[0][3]
    for (let i = 1; i < CAM.length; i++) {
      const [ta, za, xa, ya] = CAM[i - 1], [tb, zb, xb, yb] = CAM[i]
      if (t >= ta) { const k = ease.inOutCubic(prog(t, ta, tb)); z = lerp(za, zb, k); cx = lerp(xa, xb, k); cy = lerp(ya, yb, k) }
    }
    for (const p of cfg.punch || []) {
      const k = ease.outCubic(prog(t, p.at, p.at + 0.14)) * (1 - ease.inOutQuad(prog(t, p.at + p.dur - 0.3, p.at + p.dur)))
      if (k <= 0) continue
      const shake = Math.sin((t - p.at) * 70) * 6 * (1 - prog(t, p.at, p.at + 0.3))
      z *= 1 + p.z * k; cx = lerp(cx, p.x, k) + shake; cy = lerp(cy, p.y, k)
    }
    return [z, cx, cy]
  }
  // the record-scratch freeze: time stands still between [a, b] (the picture holds, desaturated, a FREEZE label)
  const FREEZE = null
  const story = t => t
  // the hook kit: slam title (frame 0), the first-second break, chapters, the loop-back
  const HOOK = { at: -1, text: splitHook(hook.text), top: hook.top ?? 200, size: hook.size ?? 104, accentColor: hook.color ?? PINK, out: [hook.out - 0.3, hook.out] }
  const WHIP = { at: -0.16, from: 1.3, blur: 8, cx: 540, cy: 820 }
  const WHIP2 = { at: cfg.whipAt ?? 0.55, len: 0.4, from: 1.35, cx: 540, cy: 800 }
  const REC = { at: cfg.recAt ?? 0.5, len: cfg.recLen ?? 1.1, caption: cfg.freezeText || 'wait. *rewind.*', top: 1480 }
  const SHAKE = { at: (cfg.flashes || [0.5])[0], len: 0.45, amp: 22 }
  const CHAPS = (cfg.chapters || []).map((c, i) => ({ at: c.at, out: [Math.min((cfg.chapters[i + 1]?.at ?? DUR) - 0.3, c.at + (c.dur ?? 3)) - 0.25, Math.min((cfg.chapters[i + 1]?.at ?? DUR) - 0.3, c.at + (c.dur ?? 3))], n: c.n ?? i + 1, title: c.text, x: 60, y: 160 }))

  // the cards' positions at t
  function cardState(c, i, t) {
    const at = c.at, big = c.big ?? at + 3.2, write = c.write ?? big + 0.4, reveal = c.reveal ?? write + 2.4, done = c.done ?? reveal + 6
    if (t > done + 0.4) return null
    let cx, cy, w, rot = 0, f = 1, alpha = 1, glint = 0
    const BW = BIG.w
    if (i === 0 && t < at) {
      // frame 0: mid-air, mid-spin, above the table; it lands big at `at`
      const s = cfg.f0?.spin ?? 0.38
      const p = ease.inOutCubic(prog(t, 0, at))
      cx = lerp(cfg.f0?.x ?? 640, BIG.x, p); cy = lerp(cfg.f0?.y ?? 640, BIG.y, p) - Math.sin(Math.PI * p) * 60
      w = lerp(BW * 0.5, BW, p); rot = lerp(0.42, 0, p) + Math.sin(t * 9) * 0.03 * (1 - p)
      f = lerp(s, 1, ease.outCubic(prog(t, 0.1, at)))
    } else if (i > 0 && t < at) {
      // dealt: slides from the dealer to the table face down, then lifts and flips at `at`
      const dealAt = c.deal ?? at - 1.2
      if (t < dealAt) return null
      const p = ease.outCubic(prog(t, dealAt, dealAt + 0.5)), q = ease.inOutCubic(prog(t, at - 0.45, at))
      cx = 540; cy = lerp(lerp(POS[dealer][1], TABLE_Y - 40, p), BIG.y, q); w = lerp(lerp(120, 200, p), BW, q)
      rot = lerp(lerp(-1.2, 0.06, p), -0.2, q); f = lerp(0, 0.5, q)
    } else if (t < big) {
      const q = ease.outCubic(prog(t, at, at + 0.45))
      cx = BIG.x; cy = BIG.y; w = BW; rot = (i > 0 ? lerp(-0.2, 0, q) : 0) + Math.sin(t * 2) * 0.006; f = i > 0 ? lerp(0.5, 1, q) : 1
      glint = prog(t, at + 0.1, at + 0.9)
    } else {
      // shrinks to the question chip at the top (drawn as a wide strip instead)
      const p = ease.inOutCubic(prog(t, big, big + 0.45))
      if (p >= 1) return { chip: true, k: outK(t, done, done + 0.4) }
      cx = lerp(BIG.x, CHIP.x, p); cy = lerp(BIG.y, CHIP.y, p); w = lerp(BW, 220, p); alpha = 1 - ease.inQuad(prog(p, 0.6, 1))
      return { cx, cy, w, rot, f, alpha, glint, chipIn: prog(p, 0.55, 1) }
    }
    return { cx, cy, w, rot, f, alpha, glint }
  }
  function qChip(x, t, c, k) {
    if (k <= 0) return
    const T = TOPIC[c.topic] || TOPIC.fun
    const s = fitSize(x, c.q, 46, CHIP.w - 70, 120)
    const h = richText(x, c.q, 0, 0, { size: s, maxW: CHIP.w - 70, measure: true }) + 64
    x.save(); x.globalAlpha *= k; x.translate(CHIP.x, CHIP.y + (1 - k) * -30)
    rr(x, -CHIP.w / 2 - 6, -h / 2 - 6, CHIP.w + 12, h + 12, 26); x.fillStyle = INK; x.fill()
    rr(x, -CHIP.w / 2, -h / 2, CHIP.w, h, 22); x.fillStyle = 'rgba(42,26,90,0.96)'; x.fill(); x.strokeStyle = c.rare ? '#ffe49a' : GOLD; x.lineWidth = 4; x.stroke()
    R(x, T.col, -CHIP.w / 2 + 36, -h / 2 - 20, 260, 40); x.font = `700 24px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${T.glyph}︎ THE CARD`, -CHIP.w / 2 + 166, -h / 2 + 1)
    richText(x, c.q, 0, 8, { size: s, maxW: CHIP.w - 70, shadow: false })
    x.restore()
  }
  // answer cards: on the table face down at `write`, rise + flip together at `reveal`
  function answers(x, t, c) {
    const write = c.write ?? (c.big ?? c.at + 3.2) + 0.4, reveal = c.reveal ?? write + 2.4, done = c.done ?? reveal + 6
    if (t < write || t > done + 0.4 || !c.ans) return
    const out = outK(t, done, done + 0.4)
    for (const w of ['A', 'B']) {
      const [px] = POS[w], d = w === 'A' ? -1 : 1
      const lay = ease.outBack(prog(t, write + (w === 'B' ? 0.35 : 0) + 0.5, write + (w === 'B' ? 0.35 : 0) + 0.9))
      const up = ease.inOutCubic(prog(t, reveal - 0.25, reveal + 0.2))
      const fl = ease.inOutCubic(prog(t, reveal, reveal + 0.35))
      const ax = lerp(lerp(540 + d * 140, px + d * 10, lay), 540 + d * 232, up)
      const ay = lerp(TABLE_Y - 30, c.ansY ?? 700, up)
      const aw = lerp(200, 440, up), ah = lerp(120, 330, up)
      if (lay <= 0.01) { pencil(x, t, px + d * -20, TABLE_Y - 70, prog(t, write, write + 0.6)); continue }
      drawAnswer(x, ax, ay, aw, ah, fl, TAG[w], c.ans[w], COL[w], { rot: lerp(d * 0.06, d * 0.035, up), alpha: out })
      if (up < 0.1) { // a little "✓ answered" tick
        const k = pop01(t, write + (w === 'B' ? 0.35 : 0) + 0.85, 0.25, 2.5) * (1 - up * 10)
        if (k > 0.01) { x.save(); x.translate(ax + 80, ay - 70); x.scale(k, k); R(x, INK, -26, -26, 52, 52); R(x, '#9fe6b0', -20, -20, 40, 40); x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✓', 0, 2); x.restore() }
      }
    }
    // "hidden till you both play" + a 3-2-1 before the flip
    const cdK = win(t, reveal - 1.45, reveal + 0.05, 0.15, 0.1)
    if (cdK > 0) {
      const n = Math.max(1, 3 - Math.floor(prog(t, reveal - 1.45, reveal - 0.05) * 3))
      x.save(); x.globalAlpha *= cdK
      const ph = ((t - (reveal - 1.45)) / 0.47) % 1, s = 1 + 0.4 * (1 - ease.outCubic(ph))
      x.translate(540, TABLE_Y - 220); x.scale(s, s)
      x.font = `900 170px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 18; x.strokeStyle = INK; x.strokeText(String(n), 0, 0); x.fillStyle = GOLD; x.fillText(String(n), 0, 0)
      x.restore()
    }
    const hk = win(t, write + 0.9, reveal - 1.5, 0.2, 0.2)
    if (hk > 0) sticker(x, t, { at: write + 0.9, out: reveal - 1.5, text: 'ANSWERS HIDDEN TILL YOU BOTH PLAY', x: 540, y: TABLE_Y - 230, rot: -0.03, size: 30, col: LAV })
  }

  function cast(x, t, S) {
    const pose = (w, d) => keyAt((cfg.mood || {})[w], t, d)
    const D = { A: [0, 'neutral', [0.6, 0]], B: [0, 'neutral', [-0.6, 0]], P: [0, 'neutral', [0, 0.6]], S: [0, 'happy', [0, 0.6]] }
    const out = {}
    const who = pisPlayer ? ['S', 'A', 'B'] : ['P', 'A', 'B']
    for (const w of who) {
      const k = pose(w === 'S' ? 'S' : w, D[w])
      const id = w === 'A' ? cfg.A : w === 'B' ? cfg.B : w === 'P' ? 'pisces' : null
      const col = w === 'S' ? STAR.sky : signColor(id)
      const off = (cfg.offset || {})[w]?.(t) || [0, 0]
      const size = w === 'P' || w === 'S' ? SIZE.P : SIZE.A
      if (S.hideCast?.includes(w)) continue
      out[w] = drawStarChar(x, POS[w][0] + off[0], POS[w][1] + off[1], size, t, { color: col, glyph: w === 'S' ? null : signStar(id ?? 'pisces').glyph, mood: k[1], look: k[2], squash: k[3] ?? 0, hops: HOPS[w], seed: { A: 3, B: 7, P: 11, S: 5 }[w], glow: 0.8 })
      if (w === 'P' && !pisPlayer) { // the dealer's apron
        const r = out[w], cell = r.size / 36
        R(x, INK, r.x - 7 * cell, r.y + 5 * cell, 14 * cell, 9 * cell); R(x, '#fbf3e2', r.x - 6 * cell, r.y + 6 * cell, 12 * cell, 7 * cell); R(x, '#ff8fb1', r.x - 1.5 * cell, r.y + 8 * cell, 3 * cell, 2.5 * cell)
      }
    }
    return out
  }
  const cryAt = (keys, t) => { let lv = 0; for (const [a, b, l] of keys || []) if (t >= a && t < b) lv = Math.max(lv, l); return lv }

  // one whole picture at time t (pure) — the loop helper draws this at t = 0 over the end
  function paint(x, T, real) {
    const t = story(T)
    const S = { t, T, real, cfg }
    drawSky(x, t, SKY_H)
    const [z, cx, cy] = camAt(t)
    x.save(); x.translate(540, 960); x.scale(z, z); x.translate(-cx, -cy)
    fairyLights(x, t); pendant(x, t); floor(x)
    cfg.draw?.back?.(x, t, S)
    const r = cast(x, t, S); S.r = r
    tears(x, t, r[pisWho] || r.P, cryAt(cfg.cry, t), 1)
    if (r.A) tears(x, t, r.A, cryAt(cfg.cryA, t), 2)
    if (r.B) tears(x, t, r.B, cryAt(cfg.cryB, t), 3)
    cfg.draw?.cast?.(x, t, S)
    table(x)
    if (!pisPlayer) tissueBox(x, t, 700, TABLE_Y, cryAt(cfg.cry, t))
    else tissueBox(x, t, pisPlayer === 'A' ? 400 : 680, TABLE_Y, cryAt(cfg.cry, t))
    cfg.draw?.mid?.(x, t, S)
    cards.forEach(c => answers(x, t, c))
    cards.forEach((c, i) => {
      const st = cardState(c, i, t); if (!st) return
      if (st.chip) { qChip(x, t, c, st.k); return }
      if (st.chipIn) qChip(x, t, c, st.chipIn)
      // speed lines behind a spinning card
      if (i === 0 && t < c.at) { x.save(); x.globalAlpha = 0.5 * (1 - prog(t, 0, c.at)); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2 + 0.2; R(x, BONE, st.cx + Math.cos(a) * 380 - 4, st.cy + Math.sin(a) * 420, 8 + 30 * Math.abs(Math.cos(a)), 8 + 30 * Math.abs(Math.sin(a))) } x.restore() }
      drawCard(x, t, c, st.cx, st.cy, st.w, st)
    })
    cfg.draw?.front?.(x, t, S)
    x.restore()
    cfg.draw?.over?.(x, t, S)
    // stickers + chapters
    for (const s of cfg.stickers || []) sticker(x, t, s)
    // the last line
    if (cfg.last && T >= cfg.last.at) {
      const p = prog(T, cfg.last.at, cfg.last.at + 0.4), k = easeOutBack(p, 2.6)
      const lo = 1
      x.save(); x.translate(540, cfg.last.y ?? 300); x.scale(0.4 + 0.6 * k, 0.4 + 0.6 * k); x.rotate(Math.sin((T - cfg.last.at) * 12) * 0.05 * Math.exp(-(T - cfg.last.at) * 3))
      richText(x, cfg.last.text, 0, 0, { size: cfg.last.size ?? 96, accentSize: cfg.last.accentSize ?? 128, maxW: 980, stroke: 16, alpha: clamp(p * 3) * lo, accent: cfg.last.color ?? GOLD })
      x.restore()
    }
    // the bug: the series name, top-left
    x.save(); x.font = `800 30px ${INTER}`; x.letterSpacing = '5px'; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(8,4,22,0.6)'; x.fillText('ONE CARD, TWO PEOPLE', 62, 92); x.fillStyle = BONE; x.fillText('ONE CARD, TWO PEOPLE', 60, 90)
    R(x, PINK, 60, 112, 90, 5); x.restore()
    // pattern breaks
    if (brk === 'flash' || cfg.flashes) for (const fa of cfg.flashes || [0.5]) { const k = 1 - prog(T, fa, fa + 0.22); if (T >= fa && k > 0) { x.save(); x.globalAlpha = 0.75 * k; x.fillStyle = cfg.flashCol || PINK; x.fillRect(0, 0, 1080, 1920); x.restore() } }
    if (FREEZE && T >= FREEZE[0] && T < FREEZE[1]) {
      x.save(); x.globalCompositeOperation = 'saturation'; x.fillStyle = '#808080'; x.globalAlpha = 0.85; x.fillRect(0, 0, 1080, 1920); x.restore()
      x.save(); x.globalAlpha = 0.25; x.fillStyle = '#000'; for (let y = 0; y < 1920; y += 8) x.fillRect(0, y, 1080, 3); x.restore()
      sticker(x, T, { at: FREEZE[0], out: FREEZE[1] + 0.2, text: cfg.freezeText || 'WAIT. FREEZE.', x: 540, y: 1160, rot: -0.05, col: RED, ink: INK, size: 52 })
    }
    if (brk === 'silence' && T < 0.9) { const k = win(T, 0.35, 0.9, 0.05, 0.2); x.save(); x.globalAlpha = 0.55 * k; x.fillStyle = '#000'; x.fillRect(0, 0, 1080, 1920); x.restore() }
  }
  function chapter(x, t, a, b, text, sub) {
    const k = pop01(t, a, 0.35, 2.4) * outK(t, b - 0.25, b)
    if (k <= 0.01 || t < a) return
    x.save(); x.translate(1080 - 70, 190); x.rotate(0.05); x.scale(k, k)
    x.font = `900 46px ${INTER}`; const w = Math.max(x.measureText(text).width, sub ? 220 : 0) + 60, h = sub ? 118 : 80
    R(x, INK, -w - 6, -6, w + 12, h + 12); R(x, GOLD, -w, 0, w, h)
    x.fillStyle = INK; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(text, -30, 42)
    if (sub) { x.font = `700 24px ${MONO}`; x.fillText(sub, -30, 92) }
    x.restore()
  }

  async function build(stage) {
    try { await Promise.all(["800 92px Inter", "900 92px Inter", "italic 600 118px 'EB Garamond'", "700 30px 'Space Mono'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const BOXES = (cfg.boxes || (lines.length ? [{ from: 0, to: lines.length }] : []))
    const boxes = BOXES.map(b => dialogueBox(root, { lines: lines.slice(b.from, b.to), y: b.y ?? 1500, width: 960, height: b.h ?? 260, open: b.open, close: b.close, cps: 28, size: b.size ?? 50 }))
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: 0, end: DUR + 0.01, root,
      update(t) {
        paint(x, t, true)
        for (const b of boxes) b.update(t)
        drawGrain(gx, t)
      },
    }
  }

  // ── sound
  const PITCH = { [TAG.A]: 660, [TAG.B]: 523.25, [TAG.P]: 987.77, [TAG.S]: 880 }
  const CUES = [
    // frame 0: the card is already spinning — a whoosh + a hit
    ['whoosh', 0, 0.5, 0.05], ['boom', 0.02, 0.22], ['pop', 0.04, 1318.51, 0.05, 0],
    ...(brk === 'flash' ? (cfg.flashes || [0.5]).flatMap(f => [['boom', f, 0.18], ['bell', f + 0.02, 1567.98, 0.04, 0.8, 0]]) : []),
    ...(brk === 'silence' ? [['tick', 0.35, 0.05], ['boom', 0.9, 0.25]] : []),
    ...cards.flatMap((c, i) => {
      const big = c.big ?? c.at + 3.2, write = c.write ?? big + 0.4, reveal = c.reveal ?? write + 2.4
      return [
        ...(i > 0 ? [['whoosh', r3((c.deal ?? c.at - 1.2)), 0.25, 0.03], ['tick', r3((c.deal ?? c.at - 1.2) + 0.45), 0.04]] : []),
        ['whoosh', r3(c.at - 0.3), 0.3, 0.04], ['pop', r3(c.at), 1046.5, 0.05, 0], ['bell', r3(c.at + 0.05), c.rare ? 2093 : 1567.98, 0.035, 1.4, 0], ['glitter', r3(c.at + 0.1), r3(c.at + 0.9)],
        ['whoosh', r3(big), 0.25, 0.025],
        ...(c.ans ? [
          ['tick', r3(write + 0.1), 0.02], ['tick', r3(write + 0.3), 0.02], ['pop', r3(write + 0.55), 659.25, 0.03, -0.3], ['pop', r3(write + 0.9), 783.99, 0.03, 0.3],
          ['riser', r3(reveal - 1.45), r3(reveal)], ['tick', r3(reveal - 1.45), 0.05], ['tick', r3(reveal - 0.98), 0.05], ['tick', r3(reveal - 0.52), 0.05],
          ['boom', r3(reveal), 0.3], ['pop', r3(reveal + 0.02), 880, 0.05, -0.3], ['pop', r3(reveal + 0.02), 1108.73, 0.05, 0.3], ['glitter', r3(reveal), r3(reveal + 0.8)],
        ] : []),
      ]
    }),
    ...(lines.length ? talkCues(lines, { cps: 28, pitch: PITCH }) : []),
    ...(cfg.last ? [['pop', r3(cfg.last.at), 1174.66, 0.05, 0], ['bell', r3(cfg.last.at + 0.05), 1567.98, 0.035, 1.2, 0]] : []),
    ...(cfg.stickers || []).map(s => ['pop', r3(s.at), 987.77, 0.035, 0]),
    ...(cfg.extraCues || []),
  ]
  const main = brk === 'scratch' ? frozen(build, [REC]) : build
  const SCENES = [main, whipZoom(WHIP), slamTitle(HOOK)]
  if (brk === 'whip') SCENES.push(whipZoom(WHIP2))
  if (brk === 'scratch') SCENES.push(recordScratch(REC))
  if (brk === 'flash') SCENES.push(screenShake(SHAKE))
  for (const c of CHAPS) SCENES.push(kitChapter(c))
  if (LOOP) SCENES.push(loopBack([main, whipZoom(WHIP), slamTitle(HOOK)], { duration: DUR, len: LOOP_LEN }))
  CUES.push(...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...(brk === 'whip' ? whipZoomCues(WHIP2) : []), ...(brk === 'scratch' ? recordScratchCues(REC) : []),
    ...(brk === 'flash' ? shakeCues(SHAKE) : []), ...CHAPS.flatMap(c => chapterCues(c)), ...(LOOP ? loopCues({ duration: DUR, len: LOOP_LEN }) : []))
  return { DURATION: DUR, SCENES, CUES: CUES.filter(c => c[1] >= 0 && c[1] < DUR), paint }
}
