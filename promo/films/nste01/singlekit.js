// SINGLE AND THRIVING: the shared format kit for nste01–nste24 (Next 30, batch b33, star_advice posts, 25 s).
// Every episode imports this file from nste01 (other films never edit it). Rows: promo/films/next30/b33.md.
//
// The format (25 s = story 0–20.6, then the shared end card):
//   0.0–6.8    THE MOMENT: the hook caption is already up at frame 0 over the sign mid-action in a December
//              single-life moment; two bubbles carry the feeling. Pisces sniffles in the background with tissues.
//   6.8        the card cut (flip) → 6.8–13.6 THE STARS: a top caption, THE STARS pop in, two dialogue lines of advice,
//              the sign listening, a small visual metaphor (cfg.s2).
//   13.6–17.4  THE THRIVE: the sign tries the healthy thing (cfg.s3); the THRIVING meter fills (full at 16.5).
//   17.4–20.6  "<Sign>: *thriving.*", the sign glowing, THE STARS say the last line, Pisces fountains happy tears.
//
//   makeSingle(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.sign ('aries'…), cfg.name ('Aries'), cfg.accent (headline accent colour; default the sign colour)
//     cfg.hook  '“So… *seeing anyone?*”'  (| = line break)      cfg.h1, cfg.h2: top captions for THE STARS / the thrive
//     cfg.lines: [lineA, lineB] (THE STARS, ≤ 45 chars each)   cfg.last: the last line (THE STARS)
//     cfg.s1/s2/s3(x, t, S): the three scenes (S = { u, t0, t1, hero, star, k }); cfg.fin(x, t, S) optional extras.
//     cfg.bubbles: [{ t0, t1, x, y, text, col, size, tail }] canvas speech bubbles (drawn above the scenes)
//     cfg.pis1 / cfg.pis3: Pisces' spot in scenes 1 and 3 ({ x, y, s, noTissues, look }); cfg.pisces = true when the
//     hero IS Pisces (then the background Pisces is skipped and the hero cries itself).
//     cfg.meter: { x, y } for the THRIVING meter (default 540, 1580).   cfg.cues: extra sound cues (absolute times).
// Pure f(t); DOM / canvases only inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill, A } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ffb36b'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, A }

// ── the fixed timeline (same in all 24 films)
export const DURATION = 25
export const STORY_END = DURATION - ENDCARD_LEN          // 20.6
export const T = {
  bug: 0.25,
  h0Out: [6.55, 6.75],
  s1: [0, 6.8], cut: 6.8, s2: [6.8, 13.6], s3: [13.6, 17.4], fin: [17.4, STORY_END],
  h1: 6.95, h1Out: [13.4, 13.6], starsIn: 7.0, A: 7.3, B: 10.4, box1: [7.1, 13.55],
  h2: 13.7, h2Out: [17.2, 17.4], meter: [14.7, 16.5], full: 16.5,
  h3: 17.5, last: 17.85, box2: [17.65, 20.25], score: 18.4,
  out: [20.15, 20.55], bugOut: [20.2, 20.5],
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
/** a pixel speech bubble (canvas), popping at t0, fading by t1. tail −1…1 along the bottom; up: tail on top */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, up = false, think = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  const ccx = clamp(cx, w / 2 + 34, 1080 - w / 2 - 34)
  tail = clamp(tail + (cx - ccx) / Math.max(1, w / 2 - 40), -1, 1)
  x.save(); x.translate(ccx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40), sy = up ? -1 : 1
  if (think) {
    for (const [dx, dy, r] of [[0, h / 2 + 18, 9], [tail * 14, h / 2 + 40, 6]]) { x.fillStyle = INK; x.fillRect(tx + dx - r - 3, sy * dy - r - 3, 2 * r + 6, 2 * r + 6); x.fillStyle = col; x.fillRect(tx + dx - r, sy * dy - r, 2 * r, 2 * r) }
  } else if (up) {
    x.fillStyle = INK; x.fillRect(tx - 14, -h / 2 - 16, 14, 12); x.fillRect(tx - 7, -h / 2 - 22, 8, 8)
    x.fillStyle = col; x.fillRect(tx - 9, -h / 2 - 9, 9, 9)
  } else {
    x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
    x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  }
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
/** ink text straight on a prop (no shadow) */
export function ink(x, text, cx, cy, { size = 26, col = INK, align = 'center', font = INTER, weight = 800, rot = 0, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { if (w <= 0) return; x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a soft warm glow */
export function glow(x, cx, cy, r, a, col = '255,214,150') {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
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
/** a little hat / scarf / headphones etc. live in the episodes; this one is shared: a knit scarf under the face */
export function scarfCells(ctx, col = RED, col2 = BONE) {
  for (let i = 0; i < 18; i++) { ctx.fillStyle = INK; ctx.fillRect(8.5 + i, 26.4, 1.2, 3.6) }
  for (let i = 0; i < 17; i++) { ctx.fillStyle = i % 4 < 2 ? col : col2; ctx.fillRect(9 + i, 26.8, 1, 2.8) }
  ctx.fillStyle = INK; ctx.fillRect(21.6, 28.8, 3.6, 7.2); ctx.fillStyle = col; ctx.fillRect(22, 29.2, 2.8, 6.4); ctx.fillStyle = col2; ctx.fillRect(22, 33, 2.8, 1)
}
/** a pointy party hat on top of the sprite */
export function partyHatCells(ctx, col = PINK, col2 = GOLD) {
  const rows = ['....P....', '...PPP...', '...PGP...', '..PPPPP..', '..PGPGP..', '.PPPPPPP.', '.PGPGPGP.', 'PPPPPPPPP']
  rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; ctx.fillStyle = INK; ctx.fillRect(18.5 + i - 0.3, -6 + j - 0.3, 1.6, 1.6) }))
  rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; ctx.fillStyle = ch === 'G' ? col2 : col; ctx.fillRect(18.5 + i, -6 + j, 1, 1) }))
  ctx.fillStyle = INK; ctx.fillRect(22.2, -8.6, 2.6, 2.6); ctx.fillStyle = BONE; ctx.fillRect(22.5, -8.3, 2, 2)
}

// ═══════════════════════════════════════════ sets and props (shared look)
/** falling pixel snow over an area */
export function snow(x, t, { X = 0, Y = 0, w = 1080, h = 1920, n = 40, seed = 1, a = 0.8, size = 6, speed = 70 } = {}) {
  x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
  x.fillStyle = `rgba(239,236,250,${a})`
  for (let i = 0; i < n; i++) {
    const r = ((i * 9301 + seed * 49297) % 233280) / 233280, q = ((i * 4973 + seed * 7919) % 1000) / 1000
    const sp = speed * (0.6 + 0.8 * q)
    const py = Y + (((r * h + t * sp) % h) + h) % h
    const px = X + (q * w + Math.sin(t * 1.2 + i) * 14 + w) % w
    const sz = size * (0.6 + 0.6 * r)
    x.fillRect(Math.round(px), Math.round(py), sz, sz)
  }
  x.restore()
}
/** string lights along a sagging line from (x0, y0) to (x1, y1) */
export function stringLights(x, t, x0, y0, x1, y1, { n = 12, sag = 40, on = 1, cols = [GOLD, PINK, SKYB, MINT, '#ff9b5c'] } = {}) {
  const pt = s => [lerp(x0, x1, s), lerp(y0, y1, s) + sag * Math.sin(Math.PI * s)]
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 24; i++) { const [px, py] = pt(i / 24); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke()
  for (let i = 0; i < n; i++) {
    const [px, py] = pt((i + 0.5) / n), c = cols[i % cols.length]
    const tw = on * (0.75 + 0.25 * Math.sin(t * 3 + i * 1.7))
    if (on > 0) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, px, py + 14, 46, 0.22 * tw, c === GOLD ? '242,199,92' : c === PINK ? '255,143,177' : c === SKYB ? '127,208,255' : c === MINT ? '159,230,176' : '255,155,92'); x.restore() }
    R(x, INK, px - 8, py + 2, 16, 24); R(x, on > 0.3 ? c : '#4a4266', px - 5, py + 5, 10, 18)
  }
}
/** an interior: back wall + floor, an optional snowy window. Returns the floor y. */
export function room(x, t, { wall = '#2a2050', wall2 = '#241a46', floor = '#3a2a4a', floorY = 1420, win = { x: 620, y: 470, w: 300, h: 330 }, top = 420, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  R(x, wall, 0, top, 1080, floorY - top)
  for (let i = 0; i < 1080; i += 90) R(x, wall2, i, top, 44, floorY - top)
  R(x, 'rgba(5,4,12,0.35)', 0, top, 1080, 16)
  if (win) {
    box(x, win.x, win.y, win.w, win.h, '#0e0b26', { b: 10 })
    R(x, '#151040', win.x, win.y, win.w, win.h)
    for (let i = 0; i < 9; i++) drawPixelStar(x, win.x + 30 + ((i * 97) % (win.w - 60)), win.y + 30 + ((i * 61) % (win.h * 0.6)), 10, 1, i % 3 ? BONE : GOLD)
    snow(x, t, { X: win.x, Y: win.y, w: win.w, h: win.h, n: 18, seed: 3, size: 6 })
    R(x, '#e9e6f4', win.x, win.y + win.h - 26, win.w, 26)
    R(x, INK, win.x + win.w / 2 - 5, win.y, 10, win.h); R(x, INK, win.x, win.y + win.h / 2 - 5, win.w, 10)
    R(x, '#5a4a7a', win.x - 24, win.y + win.h + 10, win.w + 48, 18)
  }
  R(x, INK, 0, floorY - 6, 1080, 10)
  R(x, floor, 0, floorY + 4, 1080, 1920 - floorY)
  for (let j = 0; j < 4; j++) R(x, 'rgba(255,255,255,0.04)', 0, floorY + 40 + j * 90, 1080, 6)
  x.restore()
  return floorY
}
/** an outdoor winter night: snowbanks, lamp posts, a few houses, snow */
export function street(x, t, { groundY = 1240, lamps = [160, 920], houses = true, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  if (houses) {
    const H = [[-20, 900, 220, 340, '#2b2352'], [230, 960, 200, 280, '#30275c'], [450, 880, 240, 360, '#271f4c'], [720, 940, 210, 300, '#2e2558'], [930, 900, 200, 340, '#2a2252']]
    for (const [hx, hy, hw, hh, c] of H) {
      box(x, hx, hy, hw, hh, c, { b: 6 })
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const lit = ((hx + i * 7 + j * 3) % 5) > 1; R(x, INK, hx + 34 + i * (hw - 110), hy + 50 + j * 110, 50, 60); R(x, lit ? '#ffd98a' : '#3a3266', hx + 38 + i * (hw - 110), hy + 54 + j * 110, 42, 52) }
      R(x, '#eceaf8', hx - 6, hy - 14, hw + 12, 16)
    }
  }
  R(x, INK, 0, groundY - 6, 1080, 10); R(x, '#8f89b8', 0, groundY, 1080, 1920 - groundY); R(x, '#7a74a6', 0, groundY + 50, 1080, 1920 - groundY); R(x, '#6a6496', 0, groundY + 150, 1080, 1920 - groundY)
  for (const lx of lamps) {
    R(x, INK, lx - 9, groundY - 420, 18, 420); R(x, '#4a4270', lx - 4, groundY - 416, 8, 412)
    box(x, lx - 30, groundY - 470, 60, 56, '#ffe7a6', { b: 7 })
    x.save(); x.globalCompositeOperation = 'lighter'; glow(x, lx, groundY - 440, 220, 0.25); x.restore()
  }
  snow(x, t, { n: 46, seed: 7, size: 7 })
  x.restore()
  return groundY
}
/** a mug of cocoa with steam */
export function mug(x, t, cx, cy, { s = 1, col = '#e8344e', steam = true } = {}) {
  const w = 64 * s, h = 60 * s
  box(x, cx - w / 2, cy - h, w, h, col, { b: 5, hi: 'rgba(255,255,255,0.22)' })
  R(x, INK, cx + w / 2, cy - h * 0.75, 16 * s, 8 * s); R(x, INK, cx + w / 2 + 10 * s, cy - h * 0.75, 8 * s, 34 * s); R(x, INK, cx + w / 2, cy - h * 0.75 + 28 * s, 16 * s, 8 * s)
  R(x, '#6b3d2a', cx - w / 2 + 6 * s, cy - h + 4 * s, w - 12 * s, 8 * s)
  if (steam) for (let i = 0; i < 3; i++) {
    const p = ((t * 0.7 + i / 3) % 1)
    x.save(); x.globalAlpha = 0.55 * Math.sin(Math.PI * p)
    R(x, BONE, cx - 14 * s + i * 14 * s + 6 * Math.sin(t * 3 + i), cy - h - 14 * s - p * 70 * s, 7 * s, 16 * s)
    x.restore()
  }
}
/** a sofa (seat at cy) */
export function couch(x, cx, cy, w = 560, col = '#6a4fa8') {
  box(x, cx - w / 2, cy - 170, w, 120, col, { b: 7, hi: 'rgba(255,255,255,0.12)' })
  box(x, cx - w / 2 + 20, cy - 60, w - 40, 70, col, { b: 7, hi: 'rgba(255,255,255,0.16)' })
  box(x, cx - w / 2 - 50, cy - 120, 60, 140, col, { b: 7 }); box(x, cx + w / 2 - 10, cy - 120, 60, 140, col, { b: 7 })
  R(x, INK, cx - w / 2 - 30, cy + 16, 18, 30); R(x, INK, cx + w / 2 + 12, cy + 16, 18, 30)
}
/** a pine tree, `lit` 0…1 lights it up, `orn` = ornament list [[dx, dy, col]] (relative to the base centre) */
export function tree(x, t, cx, baseY, { h = 520, lit = 0, orn = [], topStar = true, bare = false } = {}) {
  R(x, INK, cx - 34, baseY - 70, 68, 76); R(x, '#7a5232', cx - 28, baseY - 64, 56, 64)
  const tiers = 4
  for (let i = 0; i < tiers; i++) {
    const tw = lerp(h * 0.95, h * 0.35, i / (tiers - 1)), ty = baseY - 60 - i * (h - 80) / tiers - (h - 80) / tiers
    x.fillStyle = INK; x.beginPath(); x.moveTo(cx, ty - 46 - 8); x.lineTo(cx + tw / 2 + 10, ty + (h - 80) / tiers + 6); x.lineTo(cx - tw / 2 - 10, ty + (h - 80) / tiers + 6); x.closePath(); x.fill()
    x.fillStyle = i % 2 ? '#2f8a5e' : '#277a52'; x.beginPath(); x.moveTo(cx, ty - 46); x.lineTo(cx + tw / 2, ty + (h - 80) / tiers); x.lineTo(cx - tw / 2, ty + (h - 80) / tiers); x.closePath(); x.fill()
  }
  if (!bare && lit > 0) for (let i = 0; i < 18; i++) {
    const py = baseY - 110 - (i / 18) * (h - 160), half = lerp(h * 0.42, h * 0.08, i / 18), px = cx + Math.sin(i * 2.4) * half * 0.8
    const c = [GOLD, PINK, SKYB, MINT][i % 4], on = clamp(lit * 18 - i) * (0.7 + 0.3 * Math.sin(t * 4 + i))
    if (on > 0) { R(x, c, px - 5, py - 5, 10, 10); x.save(); x.globalCompositeOperation = 'lighter'; glow(x, px, py, 34, 0.25 * on, '255,230,160'); x.restore() }
  }
  for (const [dx, dy, c] of orn) { R(x, INK, cx + dx - 17, baseY + dy - 17, 34, 34); R(x, c, cx + dx - 13, baseY + dy - 13, 26, 26); R(x, 'rgba(255,255,255,0.6)', cx + dx - 8, baseY + dy - 8, 7, 7) }
  if (topStar) drawPixelStar(x, cx, baseY - h + 10, 44, 2, lit > 0.5 ? GOLD : '#7a6a9a')
}
/** a wrapped gift box */
export function gift(x, cx, cy, { w = 150, h = 120, col = '#3fb08a', rib = GOLD, bow = 1 } = {}) {
  box(x, cx - w / 2, cy - h, w, h, col, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  R(x, rib, cx - 10, cy - h, 20, h); R(x, rib, cx - w / 2, cy - h * 0.55, w, 18)
  if (bow > 0) { const b = bow; drawBits(x, ['BB...BB', 'BBB.BBB', '.BBBBB.', 'BBB.BBB', 'BB...BB'], { B: rib }, cx, cy - h - 18 * b, 9 * b) }
}
/** a table top with legs (top surface at y) */
export function table(x, cx, y, w = 640, col = '#6b4a2f') {
  box(x, cx - w / 2, y, w, 34, col, { b: 6, hi: '#8a6440' })
  R(x, INK, cx - w / 2 + 24, y + 40, 22, 160); R(x, INK, cx + w / 2 - 46, y + 40, 22, 160)
}
/** a sticky note / card with up to 2 lines of text */
export function note(x, cx, cy, text, { w = 220, h = 130, col = '#ffe27a', rot = 0, size = 30, k = 1, txt = INK } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.4)', -w / 2 + 10, -h / 2 + 12, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  const lines = String(text).split('|')
  lines.forEach((l, i) => ink(x, l, 0, (i - (lines.length - 1) / 2) * size * 1.15, { size, col: txt }))
  x.restore()
}
/** a phone with a message thread: msgs [{ at, side: 'L'|'R', text }]; typing [a, b] shows the dots */
export function phone(x, t, { cx = 540, top = 520, w = 520, h = 760, title = '', msgs = [], typing = null, alpha = 1, rot = 0, size = 30 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, top + h / 2); x.rotate(rot); x.translate(-cx, -(top + h / 2))
  box(x, cx - w / 2, top, w, h, '#2a2148', { b: 8 })
  R(x, '#120e28', cx - w / 2 + 16, top + 70, w - 32, h - 100)
  R(x, INK, cx - 50, top + 22, 100, 14)
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(title, cx, top + 100)
  R(x, 'rgba(239,230,214,0.15)', cx - w / 2 + 16, top + 128, w - 32, 3)
  // lay out bottom-up so the newest message sits at the bottom
  const shown = msgs.filter(m => t >= m.at)
  const maxW = w - 120
  x.font = `700 ${size}px ${INTER}`
  const wrap = s => { const out = []; let cur = ''; for (const wd of s.split(' ')) { const nx = cur ? cur + ' ' + wd : wd; if (x.measureText(nx).width > maxW - 36 && cur) { out.push(cur); cur = wd } else cur = nx } if (cur) out.push(cur); return out }
  let y = top + h - 60
  if (typing && t > typing[0] && t < typing[1]) {
    R(x, INK, cx - w / 2 + 30, y - 52, 116, 56); R(x, '#3a3170', cx - w / 2 + 34, y - 48, 108, 48)
    for (let i = 0; i < 3; i++) R(x, BONE, cx - w / 2 + 52 + i * 28, y - 30 - (Math.floor(t * 6 + i) % 3 === 0 ? 6 : 0), 14, 14)
    y -= 70
  }
  x.save(); x.beginPath(); x.rect(cx - w / 2 + 16, top + 132, w - 32, h - 162); x.clip()
  for (let i = shown.length - 1; i >= 0; i--) {
    const m = shown[i], L = wrap(m.text), bw = Math.min(maxW, Math.max(...L.map(l => x.measureText(l).width)) + 36), bh = L.length * size * 1.2 + 24
    const k = pop01(t, m.at, 0.22, 2.4)
    const bx = m.side === 'R' ? cx + w / 2 - 30 - bw : cx - w / 2 + 30
    const col = m.side === 'R' ? (m.col || '#5fa8ff') : (m.col || '#efe6d6')
    x.save(); x.translate(bx + (m.side === 'R' ? bw : 0), y); x.scale(k, k); x.translate(-(bx + (m.side === 'R' ? bw : 0)), -y)
    R(x, INK, bx - 4, y - bh - 4, bw + 8, bh + 8); R(x, col, bx, y - bh, bw, bh)
    x.fillStyle = m.side === 'R' ? '#ffffff' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    L.forEach((l, j) => x.fillText(l, bx + 18, y - bh + 12 + size * 0.6 + j * size * 1.2))
    x.restore()
    y -= bh + 18
  }
  x.restore()
  x.restore()
}
/** a pixel tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** an Align card image (talk card, card back…) drawn rotated; img comes from S.img(name) */
export function cardImg(x, img, cx, cy, w, { rot = 0, k = 1, sx = 1 } = {}) {
  if (!img || k <= 0.01) return
  const h = w * img.height / img.width
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * sx, k)
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 14, -h / 2 + 18, w, h)
  x.drawImage(img, -w / 2, -h / 2, w, h)
  x.restore()
}

// ── the THRIVING meter (series signature)
function drawMeter(x, t, cx, cy) {
  const k = pop01(t, T.meter[0] - 0.45, 0.32, 2) * outK(t, T.h2Out)
  if (k <= 0.01 || t > T.s3[1]) return
  const W2 = 560, Hh = 44, n = 10, cw = W2 / n
  const f = ease.inOutQuad(prog(t, ...T.meter))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText('THRIVING', -W2 / 2 + 3, -54 + 4); x.fillStyle = BUG_COL; x.fillText('THRIVING', -W2 / 2, -54)
  x.textAlign = 'right'; x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(`${Math.round(f * 100)}%`, W2 / 2 + 3, -50); x.fillStyle = BONE; x.fillText(`${Math.round(f * 100)}%`, W2 / 2, -54)
  R(x, INK, -W2 / 2 - 8, -Hh / 2 - 8, W2 + 16, Hh + 16); R(x, '#2a1f55', -W2 / 2, -Hh / 2, W2, Hh)
  for (let i = 0; i < n; i++) if ((i + 1) / n <= f + 0.001) { const c = i < 4 ? '#ffb36b' : i < 8 ? PINK : GOLD; R(x, c, -W2 / 2 + i * cw + 3, -Hh / 2 + 4, cw - 6, Hh - 8); R(x, 'rgba(255,255,255,0.35)', -W2 / 2 + i * cw + 3, -Hh / 2 + 4, cw - 6, 6) }
  const hk = pop01(t, T.full, 0.3, 3)
  if (hk > 0.01) drawBits(x, HEART, { H: '#ff5c8a' }, W2 / 2 + 50, 0, 9 * hk)
  x.restore()
}

// ── the series bug: "SINGLE AND THRIVING", Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root, at) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,179,107,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'SINGLE&nbsp;AND<span style="color:rgba(255,255,255,0.7)">&nbsp;THRIVING</span>')
  return {
    update(t, out = 1) {
      const k = (t < at ? 1 : 1) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k))
      b.style.transform = `scale(${(0.6 + 0.4 * clamp(k)).toFixed(4)})`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeSingle(cfg) {
  const HERO = signStar(cfg.sign), PIS = signStar('pisces')
  const SPEAK = 'THE STARS'
  const LINES1 = [{ t: T.A, speaker: SPEAK, text: cfg.lines[0] }, { t: T.B, speaker: SPEAK, text: cfg.lines[1] }]
  const LINES2 = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES1, SPEAK, { cps: CPS })]
  const STARS_FIN_HOPS = [T.fin[0] + 0.35, ...talkHops(LINES2, SPEAK, { cps: CPS })]
  const accent = cfg.accent || HERO.color
  const BUBBLES = cfg.bubbles || []

  const star = (x, t, sign, o = {}) => { const s = signStar(sign); return drawStarChar(x, o.x, o.y, o.s, t, { color: s.color, glyph: o.s >= 150 && o.glyph !== false ? s.glyph : null, seed: o.seed ?? 5, glow: 1, ...o }) }
  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 && o.glyph !== false ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false, glyph: P.s >= 150 ? PIS.glyph : null }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 30px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const imgs = {}
    await Promise.all((cfg.images || []).map(n => new Promise(res => { const i = new Image(); i.onload = () => { imgs[n] = i; res() }; i.onerror = () => res(); i.src = A + n })))
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hook, { top: cfg.hookTop || 160, size: cfg.hookSize || 92, accentSize: (cfg.hookSize || 92) * 1.38, at: -1, gap: 0, accentColor: accent, fit: true })
    const H1 = popText(root, cfg.h1, { top: 170, size: 84, accentSize: 120, at: T.h1, gap: 0.08, accentColor: GOLD, fit: true })
    const H2 = popText(root, cfg.h2, { top: 170, size: 84, accentSize: 120, at: T.h2, gap: 0.08, accentColor: accent, fit: true })
    const H3 = popText(root, `${cfg.name}: | *thriving.*`, { top: 170, size: 86, accentSize: 140, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3 + 0.3, wobble: true, accentColor: BUG_COL, fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES1, y: 1400, open: T.box1[0], close: T.box1[1], cps: CPS })
    const box2 = dialogueBox(root, { lines: LINES2, y: 1400, open: T.box2[0], close: T.box2[1], cps: CPS })
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const img = n => imgs[n] || null
    const S0 = { hero, star, pisces, img, HERO }

    function bgPisces(x, t, P, a, b, tears) {
      if (cfg.pisces || !P) return
      const pk = pop01(t, a + 0.3, 0.3, 2) * outK(t, [b - 0.15, b])
      if (pk <= 0.01) return
      if (!P.noTissues) tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
      pisces(x, t, { ...P, pop: pk }, tears, P.mood || 'wide', P.look || [-1, -0.6])
    }

    function starsBeat(t) {
      const [a, b] = T.s2
      if (t < a || t >= b) return
      const k = pop01(t, T.starsIn, 0.4, 2.1) * outK(t, [b - 0.2, b])
      const P = cfg.starsAt || { x: 540, y: 700, s: 230 }
      if (k > 0.01) {
        x.save(); x.globalCompositeOperation = 'lighter'; glow(x, P.x, P.y, 330, 0.16 * k, '247,207,104'); x.restore()
        drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [0, 0.4], hops: STARS_HOPS, pop: k, seed: 2, glow: 1.15 })
        sparkles(x, t, P.x, P.y, T.starsIn + 0.05, 10, P.s * 0.9, 2, [GOLD, BONE])
      }
    }

    function finale(t) {
      const [a] = T.fin
      if (t < a || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const S = { ...S0, ok, u: t - a, t0: a, t1: T.out[1] }
      x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 980, 460, 0.18 * ok, '255,179,107'); x.restore()
      if (cfg.fin) cfg.fin(x, t, S)
      else {
        shadow(x, 540, 1150, 260 * ok)
        hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: t > T.last + 1.2 ? 'happy' : 'sparkle', look: [0, 0], hops: [a + 0.1, a + 0.6, T.last + 1.5] })
      }
      sparkles(x, t, 540, 940, a + 0.12, 12, 260, 1, [BUG_COL, GOLD, BONE])
      // THE STARS
      const sk = pop01(t, a + 0.1, 0.38, 2.1) * ok
      if (sk > 0.01) drawStarChar(x, 180, 1230, 160, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_FIN_HOPS, pop: sk, seed: 2, glow: 1.05 })
      // Pisces: happy-tear fountains (or the hero itself, when the hero is Pisces)
      if (!cfg.pisces) {
        const pk = pop01(t, a + 0.25, 0.36, 2.2) * ok
        if (pk > 0.01) pisces(x, t, { x: 900, y: 1235, s: 150, pop: pk, hops: [a + 0.55, T.score + 0.02, T.score + 0.6] }, 3, 'sparkle', [-1, -1])
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3))
        const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
        drawSky(x, t, base)
        const scenes = [['s1', T.s1, cfg.pis1, 1], ['s2', T.s2, null, 0], ['s3', T.s3, cfg.pis3, 2]]
        for (const [key, [a, b], P, tears] of scenes) {
          if (t < a || t >= b) continue
          const punch = key === 's1' ? 1 : 1 + 0.06 * (1 - ease.outCubic(prog(t, a, a + 0.3)))
          x.save(); x.translate(540, 960); x.scale(punch, punch); x.translate(-540, -960)
          if (cfg[key]) cfg[key](x, t, { ...S0, u: t - a, t0: a, t1: b, k: 1 })
          if (key === 's2') starsBeat(t)
          bgPisces(x, t, P, a, b, tears)
          if (key === 's3') drawMeter(x, t, (cfg.meter || {}).x || 490, (cfg.meter || {}).y || 1580)
          x.restore()
        }
        finale(t)
        // top layer: bubbles
        tx.clearRect(0, 0, 1080, 1920)
        for (const B of BUBBLES) bubble(tx, t, B.x, B.y, B.t0, B.t1, B.text, B)
        if (cfg.top) cfg.top(tx, t, S0)
        H0.update(t, outK(t, T.h0Out))
        H1.update(t, outK(t, T.h1Out))
        H2.update(t, outK(t, T.h2Out))
        H3.update(t, outK(t, T.out))
        box1.update(t); box2.update(t)
        bug.update(t, outK(t, T.bugOut))
        // white flash on the hard cuts (the card cut has its own)
        const fl = Math.max(0, ...[T.s3[0], T.fin[0]].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate: under the swap into THE STARS' advice
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nw = s => s.replace(/\|/g, ' ').trim().split(/\s+/).length
  const CUES = [
    ['pop', 0.05, 880, 0.03, -0.3], ['glitter', 0.1, 0.45],
    ...BUBBLES.flatMap((B, i) => [['pop', r3(B.t0), NOTE[(i * 2 + 1) % 7], 0.04, B.x < 540 ? -0.25 : 0.25], ['tick', r3(B.t0 + 0.02), 0.03]]),
    ['pluck', 1.0, 2349.32, 0.012, 0.3, 0.6], ['pluck', 3.6, 2349.32, 0.012, 0.3, 0.6],
    ...wordPops(T.h1, Math.min(8, nw(cfg.h1)), 0.08, 1),
    ['pop', T.starsIn + 0.05, 739.99, 0.04, 0], ['bell', r3(T.starsIn + 0.1), 1760, 0.025, 1.0, 0], ['glitter', T.starsIn, r3(T.starsIn + 0.4)],
    ...talkCues(LINES1, { cps: CPS }),
    ['whoosh', r3(T.s3[0] - 0.1), 0.3, 0.035], ['tick', T.s3[0], 0.05],
    ...wordPops(T.h2, Math.min(8, nw(cfg.h2)), 0.08, 2),
    ['pop', r3(T.meter[0] - 0.4), 987.77, 0.035, 0.2], ['riser', T.meter[0], T.meter[1], 0.025],
    ...Array.from({ length: 10 }, (_, i) => ['pop', r3(T.meter[0] + (i + 1) / 10 * (T.meter[1] - T.meter[0]) * 0.97), NOTE[i % 7] * 2, 0.012, 0.1]),
    ['pop', T.full, 1318.51, 0.05, 0.3], ['bell', r3(T.full + 0.04), 2349.32, 0.03, 1.0, 0.3], ['glitter', T.full, r3(T.full + 0.4)],
    ['whoosh', r3(T.fin[0] - 0.1), 0.3, 0.03], ['tick', T.fin[0], 0.05],
    ...wordPops(T.h3, 1, 0.1, 0), ['pop', r3(T.h3 + 0.3), 1174.66, 0.045, 0], ['pop', r3(T.h3 + 0.38), 1567.98, 0.035, 0], ['glitter', r3(T.h3 + 0.3), r3(T.h3 + 0.7)],
    ['pop', r3(T.fin[0] + 0.15), 739.99, 0.035, -0.4], ['pop', r3(T.fin[0] + 0.3), 987.77, 0.03, 0.4],
    ['pluck', T.score, 1567.98, 0.03, 0.4, 0.4], ['pluck', r3(T.score + 0.12), 2093, 0.025, 0.4, 0.4],
    ...talkCues(LINES2, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []).map(c => [c[0], r3(c[1]), ...c.slice(2)]),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
