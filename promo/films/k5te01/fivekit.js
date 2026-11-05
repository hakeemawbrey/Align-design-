// FIVE THINGS: the shared look of "5 Things Every ___ Needs to Hear" (Month 2 boost, batch m33, star_advice trial reels,
// promo/films/month2/m33.md). Owned by k5te01; k5te02–k5te24 import it read-only from ../../k5te01/fivekit.js.
// No end card, no card cut, no logo: DURATION is the story.
//
// The short format (9.5–12 s):
//   0.00        frame 0 = the thumbnail: the sign star already mid-chaos (cfg.hook) and the hook line on screen.
//   brk.at      the pattern break (cfg.brk.type: whip | scratch | flash | silence | glitch), and the "5 THINGS" chip slams.
//   H           the list: five beats. A giant number slams in on the left, the line sticker pops, the sign reacts on the
//               right with a tiny prop (an icon or cfg.items[i].draw). Pisces sniffles in the corner, fountaining by 5.
//   itemsEnd    THE STARS' last line slams in big. Ending 'cut' holds it to the last frame; 'loop' eases the last LOOP s
//               back into the exact frame-0 composition (the hook layer at t = 0), so a replay is seamless.
//
//   makeFive(cfg) → { DURATION, SCENES, CUES, T, MUSIC }
//     cfg.id, cfg.sign, cfg.name ('Aries'; the bug says 'SAG' style names via cfg.bugName), cfg.accent
//     cfg.D (duration), cfg.ending 'cut' | 'loop', cfg.brk = { type, at }
//     cfg.hookLine ('Aries. *Slow down.* Read this.')  ← '*word*' = accent, '|' = line break
//     cfg.hook(x, th, S)  draws the sign mid-action. th = hook time (frozen during a scratch/silence freeze). S = { hero, k, t }
//     cfg.items: 5 × { text, mood, icon, look, draw(x, t, S) }    cfg.last: the last line
//     cfg.music = { style, key, seed }
// Everything is a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, glitch, glitchCues, screenShake, shakeCues, loopK } from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
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
    x.fillStyle = cols[ch] || BONE; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
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
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
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
/** flying debris (paper bits, socks, crumbs…) frozen mid-air at th = 0 and drifting on. pure f(th) */
export function debris(x, th, cx, cy, { n = 14, spread = 420, cols = [BONE, GOLD, PINK], sz = 22, seed = 1, v = 1, grav = 260, shape = null } = {}) {
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed * 1.7 + Math.sin(i * 3.1) * 0.4
    const d0 = spread * (0.35 + 0.65 * (((i * 37 + seed * 11) % 17) / 16))
    const sp = 120 + 90 * ((i * 13) % 5)
    const tt = th + 0.25
    const px = cx + Math.cos(a) * (d0 + sp * tt * v), py = cy + Math.sin(a) * (d0 * 0.8 + sp * tt * v) + grav * tt * tt * v
    const rot = tt * (2 + (i % 4)) + i
    x.save(); x.translate(px, py); x.rotate(rot)
    if (shape) shape(x, i, sz)
    else { const s = sz * (0.7 + 0.5 * ((i * 7) % 3) / 2); R(x, INK, -s / 2 - 3, -s / 3 - 3, s + 6, s * 0.66 + 6); R(x, cols[i % cols.length], -s / 2, -s / 3, s, s * 0.66) }
    x.restore()
  }
}
/** speed lines radiating from (cx, cy) */
export function speedLines(x, t, cx, cy, a = 1, { n = 26, r0 = 380, r1 = 1300, col = BONE, seed = 1 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a * 0.55; x.strokeStyle = col; x.lineCap = 'butt'
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + seed + Math.sin(i * 2.7) * 0.08
    const ph = ((t * 3 + i * 0.37) % 1)
    const ra = r0 + ph * 200, rb = Math.min(r1, ra + 260 + 140 * Math.sin(i))
    x.lineWidth = 6 + (i % 3) * 4
    x.beginPath(); x.moveTo(cx + Math.cos(ang) * ra, cy + Math.sin(ang) * ra); x.lineTo(cx + Math.cos(ang) * rb, cy + Math.sin(ang) * rb); x.stroke()
  }
  x.restore()
}
/** a pixel speech bubble (canvas) */
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
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a phone (canvas) at (cx, cy), w wide, rotated; content(x, w, h) draws in screen space (origin top-left of the screen) */
export function phone(x, cx, cy, w, rot, content, { col = '#2a2148', glow = 0 } = {}) {
  const h = w * 1.9
  x.save(); x.translate(cx, cy); x.rotate(rot)
  if (glow > 0) { const g = x.createRadialGradient(0, 0, w * 0.3, 0, 0, w * 2.2); g.addColorStop(0, `rgba(190,220,255,${0.35 * glow})`); g.addColorStop(1, 'rgba(190,220,255,0)'); x.fillStyle = g; x.fillRect(-w * 2.2, -w * 2.2, w * 4.4, w * 4.4) }
  box(x, -w / 2, -h / 2, w, h, col, { b: 7 })
  R(x, '#14102a', -w / 2 + 10, -h / 2 + 18, w - 20, h - 36)
  x.save(); x.translate(-w / 2 + 10, -h / 2 + 18); if (content) content(x, w - 20, h - 36); x.restore()
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite
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
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
const PIS = signStar('pisces')
/** Pisces (with tears 0–3) */
export function pisces(x, t, P, tears, mood = 'wide', look = [-1, -0.5]) {
  const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false, squash: P.squash || 0 }
  drawStarChar(x, P.x, P.y, P.s, t, opts)
  const F = starFrame(P.x, P.y, P.s, t, opts)
  if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
  return F
}

// ── tiny pixel icons for the reactions (cell grids; '.' = empty)
export const ICONS = {
  heart: [['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5c8a', W: '#ffd0dc' }],
  phone: [['KKKKK', 'KSSSK', 'KSSSK', 'KSSSK', 'KSSSK', 'KKWKK'], { K: '#3a2d66', S: SKYB, W: BONE }],
  chat: [['BBBBBBB', 'BDBDBDB', 'BBBBBBB', '.B.....'], { B: BONE, D: INK }],
  clock: [['.BBBBB.', 'BWWDWWB', 'BWWDWWB', 'BWWDDWB', 'BWWWWWB', '.BBBBB.'], { B: GOLD, W: BONE, D: INK }],
  shield: [['SSSSSSS', 'SWWSWWS', 'SWSSSWS', 'SSSSSSS', '.SSSSS.', '..SSS..', '...S...'], { S: SKYB, W: BONE }],
  cup: [['.S.S.', 'CCCCC.', 'CCCCCC', 'CCCC.C', 'CCCCC.', '.CCC..'].map(r => r.padEnd(6, '.')), { C: '#f59cc4', S: BONE }],
  house: [['...R...', '..RRR..', '.RRRRR.', 'RRRRRRR', '.WWWWW.', '.WDWWW.', '.WDWWW.'], { R: RED, W: BONE, D: '#a07850' }],
  star: [['...G...', '..GGG..', 'GGGGGGG', '.GGGGG.', '..GGG..', '.GG.GG.'], { G: GOLD }],
  check: [['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....'], { G: MINT }],
  crown: [['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG'], { G: GOLD, R: RED }],
  key: [['.GGG.....', 'G...GGGGG', 'G...G.G.G', '.GGG.....'], { G: GOLD }],
  plant: [['.L.L.', 'LLLLL', '..L..', 'PPPPP', '.PPP.'], { L: MINT, P: '#c96a3a' }],
  sun: [['G..G..G', '.GGGGG.', '.GWWWG.', 'GGWWWGG', '.GWWWG.', '.GGGGG.', 'G..G..G'], { G: GOLD, W: '#fff1c8' }],
  moon: [['..BBB.', '.BB...', 'BB....', 'BB....', 'BB....', '.BB...', '..BBB.'], { B: '#fff1c8' }],
  plane: [['...W...', '..WWW..', 'WWWWWWW', '...W...', '..WWW..'], { W: BONE }],
  hug: [['HH.HH..', 'HHHHH..', '.HHH.PP', '..H.PPP', '....PPP', '.....P.'], { H: '#ff5c8a', P: LAV }],
  bag: [['..BBB..', '.B...B.', 'SSSSSSS', 'SWSSSWS', 'SSSSSSS', 'SSSSSSS'], { B: '#6b4a2f', S: '#c98a4a', W: GOLD }],
  calendar: [['R.R.R', 'RRRRR', 'WWWWW', 'WDWDW', 'WWWWW', 'WDWWW'], { R: RED, W: BONE, D: INK }],
  door: [['DDDDD', 'DWWWD', 'DWWWD', 'DWWGD', 'DWWWD', 'DWWWD'], { D: '#6b4a2f', W: '#c98a4a', G: GOLD }],
  flag: [['PGGGG', 'PGGGG', 'PGGG.', 'P....', 'P....'], { P: BONE, G: MINT }],
  bridge: [['B.....B', 'BB...BB', 'BBBBBBB', 'B.B.B.B'], { B: GOLD }],
  mic: [['.GGG.', 'GGGGG', 'GGGGG', '.GGG.', '..W..', '.WWW.'], { G: '#8c86a8', W: BONE }],
  sparkle: [['...W...', '...W...', '.WWWWW.', 'WWWGWWW', '.WWWWW.', '...W...', '...W...'], { W: '#fff1c8', G: GOLD }],
  zz: [['ZZZ.', '..Z.', '.Z..', 'ZZZ.'], { Z: LAV }],
  eye: [['.WWWWW.', 'WWBBBWW', 'WBBDBBW', 'WWBBBWW', '.WWWWW.'], { W: BONE, B: SKYB, D: INK }],
  hand: [['.W.W.W.', '.W.W.W.', '.WWWWWW', 'WWWWWWW', '.WWWWW.', '..WWW..'], { W: '#ffd9b0' }],
  pizza: [['YYYYYYY', '.YRYYY.', '..YYRY.', '...YY..', '...Y...'], { Y: '#ffd23a', R: RED }],
  map: [['WMWMWMW', 'MWWMWWM', 'WMWRWMW', 'MWWMWWM'], { W: BONE, M: MINT, R: RED }],
  water: [['..B..', '.BBB.', 'BBWBB', 'BBBBB', '.BBB.'], { B: SKYB, W: BONE }],
  mirror: [['.GGGGG.', 'GSSSSSG', 'GSWSSSG', 'GSSSSSG', 'GSSSSSG', '.GGGGG.', '...G...', '..GGG..'], { G: GOLD, S: '#bfe8ff', W: BONE }],
}
export function icon(x, name, cx, cy, cell, opts = {}) { const ic = ICONS[name]; if (!ic) return; drawBits(x, ic[0], ic[1], cx, cy, cell, opts) }

// ── big slam number (canvas)
function bigNumber(x, t, n, t0, t1, col, cx = 260, cy = 800) {
  const k = clamp(prog(t, t0, t0 + 0.12)), o = outK(t, [t1 - 0.12, t1])
  if (k <= 0 || o <= 0) return
  const sc = lerp(2.4, 1, ease.outCubic(k)) * (1 + 0.06 * Math.exp(-(t - t0 - 0.12) * 9) * Math.sin((t - t0) * 40) * (t > t0 + 0.12 ? 1 : 0))
  x.save(); x.translate(cx, cy); x.rotate(-0.08 + 0.03 * Math.sin(n * 2.1)); x.scale(sc * lerp(0.8, 1, o), sc * lerp(0.8, 1, o)); x.globalAlpha = clamp(k * 3) * o
  x.font = `800 480px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineJoin = 'round'; x.lineWidth = 34; x.strokeStyle = INK; x.strokeText(String(n), 10, 14)
  x.fillStyle = 'rgba(6,4,18,0.6)'; x.fillText(String(n), 22, 30)
  x.strokeText(String(n), 0, 0)
  x.fillStyle = col; x.fillText(String(n), 0, 0)
  x.fillStyle = 'rgba(255,255,255,0.28)'; x.save(); x.beginPath(); x.rect(-200, -210, 400, 120); x.clip(); x.fillText(String(n), 0, 0); x.restore()
  x.restore()
}

// ── DOM pieces
function buildBug(root, name, col) {
  const b = el('div', { position: 'absolute', left: '56px', top: '58px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: col, boxShadow: `0 0 0 4px ${INK}, 0 0 16px ${col}` }, b)
  el('div', { font: `800 27px ${INTER}`, letterSpacing: '0.17em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    `5&nbsp;THINGS&nbsp;EVERY&nbsp;<span style="color:${col}">${name.toUpperCase()}</span>&nbsp;<span style="color:rgba(239,230,214,0.6)">NEEDS&nbsp;TO&nbsp;HEAR</span>`)
  return { update(out = 1) { b.style.opacity = String(clamp(out)) } }
}
function buildSticker(root, { text, col, tilt }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1300px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { maxWidth: '960px', padding: '22px 40px 26px', background: BONE, border: `7px solid ${INK}`, borderRadius: '16px', boxShadow: `12px 12px 0 rgba(6,4,18,0.75)`, transformOrigin: '50% 50%', textAlign: 'center' }, wrap)
  const html = text.replace(/\s*\|\s*/g, '<br>').replace(/\*([^*]+)\*/g, `<span style="font:italic 500 82px ${SERIF};color:${col};letter-spacing:0">$1</span>`)
  el('div', { font: `800 66px ${INTER}`, lineHeight: '1.06', color: INK, letterSpacing: '-0.015em' }, st, html)
  return {
    update(t, at, out) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.26), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.06)) * o)
      st.style.transform = `translateY(${((1 - o) * -40).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.9, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}
function buildChip(root, text, col) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '560px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '12px 30px 14px', background: col, border: `6px solid ${INK}`, borderRadius: '10px', boxShadow: `8px 8px 0 rgba(6,4,18,0.75)`, font: `800 46px ${INTER}`, letterSpacing: '0.08em', color: INK, whiteSpace: 'nowrap', transform: 'rotate(-3deg)' }, wrap, text)
  return {
    update(t, at, out) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, at, at + 0.1), o = outK(t, out)
      const sc = lerp(1.9, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - at) * 8) * Math.sin((t - at) * 40))
      st.style.opacity = String(clamp(p * 3) * o)
      st.style.transform = `rotate(-3deg) scale(${(sc * lerp(0.7, 1, o)).toFixed(4)})`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeFive(cfg) {
  const HERO = signStar(cfg.sign)
  const D = cfg.D, LOOP = cfg.ending === 'loop' ? 0.45 : 0
  const H = cfg.H ?? 1.45
  const END = cfg.endLen ?? 1.95
  const itemsEnd = r3(D - END - LOOP)
  const d = (itemsEnd - H) / 5
  const brk = { type: 'whip', at: 0.45, ...(cfg.brk || {}) }
  // the pattern break comes from the shared hook kit (promo/films/hookkit.js)
  const FX = {
    whip: { at: brk.at, len: 0.42, from: brk.from ?? 1.55 },
    scratch: { at: brk.at, len: brk.len ?? 0.8, caption: brk.caption || 'yep. *mid-chaos.*', sub: brk.sub || null, top: brk.top ?? 1540 },
    silence: { at: brk.at, len: brk.len ?? 0.8, caption: brk.caption || '*…*', sub: brk.sub || null, top: brk.top ?? 1540, sat: 0.6 },
    glitch: { at: brk.at, len: brk.len ?? 0.6, dialog: !!brk.text, text: brk.text || '', amp: 1 },
    flash: { at: brk.at, len: 0.45, amp: 24 },
  }[brk.type]
  const T = {
    brk: brk.at, chip: r3(brk.at + 0.08), hookOut: [H - 0.16, H],
    items: Array.from({ length: 5 }, (_, i) => [r3(H + i * d), r3(H + (i + 1) * d)]),
    last: itemsEnd, starsIn: r3(itemsEnd + 0.05), loop: [r3(D - LOOP), D], end: D,
  }
  const accent = cfg.accent || HERO.color
  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const HERO_POS = { x: 740, y: 930, s: 340 }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 66px Inter", "800 46px Inter", "800 27px Inter", "800 420px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 82px 'EB Garamond'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const lv = layerCanvas(root), lx = lv.getContext('2d')        // the loop-back layer (frame-0 composition)
    const HOOK = popText(root, cfg.hookLine, { top: 176, size: 96, accentSize: 128, at: -3, gap: 0.01, accentColor: accent, fit: true, wobble: false })
    const chip = buildChip(root, cfg.chip || '5 THINGS. GO.', accent)
    const stickers = cfg.items.map((it, i) => buildSticker(root, { text: it.text, col: cfg.deep || '#5a2d9a', tilt: [-2, 1.6, -1.2, 2, -1.6][i] }))
    const LAST = popText(root, cfg.last, { top: cfg.lastTop ?? 1210, size: 84, accentSize: 116, at: T.last + 0.05, gap: 0.07, accentColor: GOLD, fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const bug = buildBug(root, cfg.bugName || cfg.name, accent)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    // the frame-0 composition: sky + the hook drawing at hook time th
    function hookLayer(c, t, th) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(c, t, { ...SKY_H, zoom: lerp(1.7, SKY_H.zoom, ss) })
      cfg.hook(c, th, { hero, k: 1, t, HERO })
    }

    function items(t) {
      cfg.items.forEach((it, i) => {
        const [a, b] = T.items[i]
        const end = i === 4 ? T.last : b
        if (t < a - 0.01 || t >= end) return
        const u = t - a
        const S = { u, t0: a, t1: b, hero, HERO, i, x, P: HERO_POS }
        bigNumber(x, t, i + 1, a, end, i === 4 ? GOLD : accent)
        if (it.draw) it.draw(x, t, S)
        else {
          shadow(x, HERO_POS.x, HERO_POS.y + 170, 240)
          const ho = { ...HERO_POS, mood: it.mood || 'happy', look: it.look || [-0.6, 0.2], hops: [a + 0.02, a + d * 0.55] }
          hero(x, t, ho)
          if (cfg.heroTears) inSprite(x, starFrame(ho.x, ho.y, ho.s, t, { hops: ho.hops, seed: 3 }), () => tearsCells(x, t, i < 2 ? 1 : i < 4 ? 2 : 3))
          if (it.icon) {
            const k = pop01(t, a + 0.12, 0.3, 2.6) * outK(t, [end - 0.1, end])
            if (k > 0.01) icon(x, it.icon, HERO_POS.x + 150, HERO_POS.y - 210 + 8 * Math.sin(t * 5), 11 * k, { rot: 0.1 * Math.sin(t * 4) })
            sparkles(x, t, HERO_POS.x + 150, HERO_POS.y - 210, a + 0.14, 8, 90, i, [GOLD, BONE, accent])
          }
        }
      })
    }

    function finale(t) {
      if (t < T.last) return
      const k = pop01(t, T.last, 0.34, 2.2)
      shadow(x, 540, 1070, 260 * k)
      const fo = { x: 540, y: 880, s: 300, pop: k, mood: cfg.lastMood || 'sparkle', look: [0, 0], hops: [T.last + 0.05, T.last + 0.8] }
      hero(x, t, fo)
      if (cfg.heroTears) inSprite(x, starFrame(fo.x, fo.y, fo.s, t, { pop: k, hops: fo.hops, seed: 3 }), () => tearsCells(x, t, 3))
      if (cfg.finale) cfg.finale(x, t, { hero, HERO, k })
      hearts(x, t, T.last + 0.2, 540, 700, { n: 6 })
      const sk = pop01(t, T.starsIn, 0.3, 2.1)
      if (sk > 0.01) {
        drawStarChar(x, 170, 1640, 150, t, { color: STAR.sky, mood: 'happy', look: [1, -0.6], pop: sk, seed: 2, glow: 1, hops: [T.starsIn + 0.25, T.starsIn + 0.7] })
        label(x, 'THE STARS', 170, 1760, { size: 26, col: GOLD, alpha: clamp(sk) })
      }
    }

    function piscesCorner(t) {
      if (cfg.heroTears) return
      const a = T.items[0][0], z = cfg.ending === 'loop' ? T.loop[0] : D + 1
      const pk = pop01(t, a + 0.2, 0.3, 2) * outK(t, [z, z + 0.3])
      if (pk <= 0.01) return
      let tears = 1
      if (t > T.items[2][0]) tears = 2
      if (t > T.items[4][0]) tears = 3
      const P = cfg.pis || { x: 920, y: 1650, s: 175 }
      tissues(x, P.x - P.s * 0.75, P.y + P.s * 0.28, P.s * 0.5 * Math.min(1, pk))
      pisces(x, t, { ...P, pop: pk, hops: T.items.map(([s]) => s + 0.1) }, tears, t > T.items[4][0] ? 'sparkle' : 'wide', [-1, -0.7])
      if (t > T.items[4][0] + 0.1 && t < T.items[4][0] + 1.3) label(x, '*sob*', P.x - 10, P.y - 120 - 30 * prog(t, T.items[4][0], T.items[4][0] + 1.3), { size: 30, col: SKYB, alpha: 1 - prog(t, T.items[4][0] + 0.9, T.items[4][0] + 1.3) })
    }

    function pips(c, t, alpha) {
      if (alpha <= 0) return
      const X0 = 56, w = 36, gap = 12, Y = 122
      c.save(); c.globalAlpha = alpha
      for (let i = 0; i < 5; i++) {
        const on = t >= T.items[i][0]
        R(c, INK, X0 + i * (w + gap) - 4, Y - 4, w + 8, 18)
        R(c, on ? (i === 4 ? GOLD : accent) : 'rgba(239,230,214,0.22)', X0 + i * (w + gap), Y, w, 10)
      }
      c.restore()
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        const th = t
        // camera: a punch on each number (the break itself is the hook kit's camera)
        let zoom = 1
        for (const [a] of T.items) { const p = t - a; if (p > 0 && p < 0.3) zoom *= 1 + 0.05 * Math.exp(-p * 14) }
        const dS = Math.min(...T.items.map(([a]) => (t >= a ? t - a : 9)))
        const shake = dS < 0.25 ? 12 * Math.exp(-dS * 14) * Math.sin(dS * 70) : 0
        x.clearRect(0, 0, 1080, 1920)
        x.save(); x.translate(540, 900); x.scale(zoom, zoom); x.translate(-540 + shake, -900)
        if (t < H + 0.02) {
          hookLayer(x, t, th)
        } else {
          drawSky(x, t, SKY_H)
          items(t)
          finale(t)
          piscesCorner(t)
        }
        x.restore()
        // the loop-back: the frame-0 composition eases in over the last LOOP s (exact at the last frame)
        lx.clearRect(0, 0, 1080, 1920)
        let q = 0
        if (LOOP && t > T.loop[0]) {
          q = loopK(t, D, LOOP)
          lx.save(); lx.globalAlpha = q; hookLayer(lx, 0, 0); lx.restore()
          if (q > 0.999) { x.clearRect(0, 0, 1080, 1920) }
        }
        lv.style.opacity = '1'
        // top layer: the pips + any top-layer extras
        tx.clearRect(0, 0, 1080, 1920)
        pips(tx, t, t >= H ? 1 - q : 0)
        if (cfg.top) cfg.top(tx, t, { th, q, T })
        HOOK.update(t < H ? 0 : 0, t < H ? outK(t, T.hookOut) : q)
        chip.update(t, T.chip, T.hookOut)
        stickers.forEach((s, i) => s.update(t, T.items[i][0] + 0.06, i === 4 ? [T.last - 0.12, T.last] : [T.items[i][1] - 0.1, T.items[i][1]]))
        LAST.update(t, 1 - q)
        bug.update(1)
        // flashes: the break (colour flash) and a quick white tick on every number
        let fl = 0, fcol = '#fff6ea'
        if (brk.type === 'flash' && t >= brk.at && t < brk.at + 0.16) { fl = 0.9 * (1 - (t - brk.at) / 0.16); fcol = accent }
        for (const [a] of T.items) if (t >= a && t < a + 0.08) fl = Math.max(fl, 0.22 * (1 - (t - a) / 0.08))
        if (t >= H - 0.02 && t < H + 0.1) fl = Math.max(fl, 0.35 * (1 - (t - H + 0.02) / 0.12))
        flash.style.background = fcol; flash.style.opacity = String(fl)
        drawGrain(gx, q > 0.999 ? 0 : t)
      },
    }
  }

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const brkCues = {
    whip: () => whipZoomCues(FX),
    flash: () => [...shakeCues(FX), ['bell', brk.at, 1760, 0.035, 0.8, 0], ['whoosh', r3(brk.at - 0.1), 0.22, 0.05]],
    glitch: () => glitchCues(FX),
    scratch: () => recordScratchCues(FX),
    silence: () => recordScratchCues(FX),
  }[brk.type]?.() || []
  const CUES = [
    ...brkCues,
    ['pop', T.chip, 1174.66, 0.05, 0], ['tom', T.chip, 110, { gain: 0.22, decay: 0.2 }],
    ['whoosh', r3(H - 0.15), 0.2, 0.04],
    ...T.items.flatMap(([a], i) => [
      ['tom', a, 98 - i * 6, { gain: 0.3, decay: 0.25 }], ['tick', a, 0.07], ['pop', r3(a + 0.06), NOTE[(i * 2) % 7], 0.045, (i % 2 ? 0.2 : -0.2)],
      ['pop', r3(a + 0.14), NOTE[(i * 2 + 2) % 7] * 2, 0.025, 0.3], ['pluck', r3(a + 0.3), 2349.32, 0.012, 0.3, 0.6],
      ...((cfg.items[i].cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)])),
    ]),
    ['pluck', r3(T.items[4][0] + 0.12), 1567.98, 0.03, 0.5, 0.6],
    ['bell', r3(T.last + 0.05), 1760, 0.035, 1.2, 0], ['glitter', r3(T.last + 0.05), r3(T.last + 0.6)], ['pop', T.starsIn, 739.99, 0.035, -0.4],
    ...(LOOP ? [['whoosh', T.loop[0], LOOP, 0.035]] : []),
    ...(cfg.cues || []),
  ]
  const MUSIC = { style: cfg.music.style, key: cfg.music.key, seed: cfg.music.seed, sections: { drop: T.items[0][0], lift: [T.items[4][0]], outroAt: r3(Math.max(T.last, D - 1.2)) }, hits: [T.items[4][0]] }
  const fxScene = { whip: whipZoom, scratch: recordScratch, silence: recordScratch, glitch, flash: screenShake }[brk.type]
  const main = ['scratch', 'silence'].includes(brk.type) ? frozen(build, [FX]) : build
  const SCENES = [main, ...(fxScene ? [fxScene(FX)] : []), ...(cfg.scenes || [])]
  return { DURATION: D, SCENES, CUES, T, MUSIC, FX }
}
