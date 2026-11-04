// Dating kit: the shared look of "POV: You're Dating a ___" (Next 30, batch b43; rows in promo/films/next30/b43.md).
// npve02–npve24 import this file from here. Derived from the Trends POV kit (trpovthirdwheel/scenes/povkit.js).
//
// The look: second-person camera (a slow handheld sway + punch-ins); winter-night sets (café, sofa, street, kitchen,
// market, party, door) with real sky through the windows and pixel snow; a white "POV: you're dating a *Sign*." caption
// on screen from frame 0 (no fade from black: frame 0 is the thumbnail); beat stickers; a fake progress bar; the series
// bug "POV: YOU'RE DATING A ___" top-left (56 px, Inter 800 small caps); the Star Talk dialogue box; a big last line;
// the shared end card and one cardfx cut.
//
//   makePOV(cfg) → { DURATION, SE, SCENES, CUES }
//     cfg = { id, duration, set: 'cafe' | 'sofa' | 'street' | 'kitchen' | 'market' | 'party' | 'door' | (x, t) => void,
//             caption, lines, boxes: [{ from, to, open, close, y }], stickers: [{ at, out, text, x, y, rot, size,
//             kind: 'light' | 'dark' | 'you' | 'hot' }], last: { at, text, top, size, color }, cuts,
//             punch: [{ at, dur, z, x, y }], images, scene(x, t, K), front(x, t, K), cues: [], pitch }
//     scene() draws inside the camera (on top of the set), front() on top of the vignette (no camera). K = { imgs, SE }.
//   Helpers: R, drawBits, sparkles, pop01, outK, popOut, starFrame, inSprite, tearsCells, pisces, drawArm, drawImg,
//            bubble, snow, bulbs, table, mug, colours. Everything is a pure function of t; nothing touches `document`
//            at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', HOT = '#ff4fa8', CYAN = '#5ff0ff', LAV = '#c9a6ff', MINT = '#7dffb0'
export const YOU = '#b9a4ff'                       // "you" (the camera): a soft lavender
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const R = (x, c, X, Y, w, h) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export { drawStarChar, signStar, lerp, prog, ease, clamp, easeOutBack, A }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
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

/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, HOT]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops and squash
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
const PIS = signStar('pisces')
/** the running gag: Pisces somewhere in the back, crying (tears 1–3) */
export function pisces(x, t, { x: X, y: Y, s = 130, tears = 2, mood = 'wide', look = [0, 0], pop = 1, hops = null, seed = 6 }) {
  if (pop <= 0.01) return
  const opts = { color: PIS.color, glyph: s >= 120 ? PIS.glyph : null, mood, look, seed, glow: 0.8, pop, hops }
  drawStarChar(x, X, Y, s, t, opts)
  inSprite(x, starFrame(X, Y, s, t, opts), () => tearsCells(x, t, tears))
}

/** "your" arm + mitten hand reaching up from the bottom edge (the viewer is a lavender star) */
export function drawArm(x, bx, hx, hy, { r = 46, col = YOU, rot = 0, by = 2000 } = {}) {
  x.save(); x.lineCap = 'round'
  x.strokeStyle = INK; x.lineWidth = r * 1.25 + 12; x.beginPath(); x.moveTo(bx, by); x.lineTo(hx, hy); x.stroke()
  x.strokeStyle = col; x.lineWidth = r * 1.25; x.stroke()
  x.translate(hx, hy); x.rotate(rot)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(-r * 0.35, -r * 0.35, r * 0.28, 0, Math.PI * 2); x.fill()
  x.restore()
}

/** an image (card art etc.) centred, rotated, with a soft drop shadow */
export function drawImg(x, img, cx, cy, w, { rot = 0, alpha = 1, sx = 1 } = {}) {
  if (!img || alpha <= 0 || w <= 0) return
  const h = w * img.height / img.width
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 16, -h / 2 + 20, w, h)
  x.drawImage(img, -w / 2, -h / 2, w, h)
  x.restore()
}

/** a pixel speech bubble on the canvas (small asides) */
export function bubble(x, t, cx, cy, t0, text, { col = BONE, fg = INK, size = 30, out = null, tail = 'down' } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * (out ? outK(t, out) : 1)
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${INTER}`
  const w = x.measureText(text).width + 40, h = size + 30
  R(x, INK, -w / 2 - 4, -h / 2, w + 8, h); R(x, INK, -w / 2, -h / 2 - 4, w, h + 8); R(x, col, -w / 2, -h / 2, w, h)
  if (tail === 'down') { R(x, INK, -12, h / 2 + 4, 12, 10); R(x, col, -8, h / 2, 8, 8) }
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

// ── the winter-night sets. Walls are drawn with window holes (even-odd), so the real starry sky shows through them.
//   kind: 'cafe' · 'sofa' · 'street' · 'kitchen' · 'market' · 'party' · 'door'
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
/** falling pixel snow inside a rect, pure f(t) */
export function snow(x, t, X, Y, W, H, { n = 40, size = 8, speed = 70, alpha = 0.9, seed = 1 } = {}) {
  x.save(); x.beginPath(); x.rect(X, Y, W, H); x.clip()
  for (let i = 0; i < n; i++) {
    const r = hash(i + seed * 31), r2 = hash(i * 7 + seed), r3 = hash(i * 13 + 5 + seed)
    const sp = speed * (0.6 + 0.8 * r3), s = Math.round(size * (0.55 + 0.7 * r2))
    const py = Y - 20 + ((r2 * (H + 40) + t * sp) % (H + 40))
    const px = X + r * W + 14 * Math.sin(t * (0.8 + r) + i)
    x.globalAlpha = alpha * (0.5 + 0.5 * r)
    x.fillStyle = '#f4f1ff'; x.fillRect(Math.round(px), Math.round(py), s, s)
  }
  x.restore()
}
function holes(x, col, rects, area = [-140, -140, 1360, 2200]) {
  x.save(); x.beginPath(); x.rect(...area)
  for (const [a, b, c, d] of rects) x.rect(a, b, c, d)
  x.fillStyle = col; x.fill('evenodd'); x.restore()
}
function frame(x, X, Y, W, H, col = '#4a2f2a', b = 18, mull = true) {
  R(x, INK, X - b - 6, Y - b - 6, W + 2 * b + 12, b + 6); R(x, INK, X - b - 6, Y + H, W + 2 * b + 12, b + 6)
  R(x, INK, X - b - 6, Y - b, b + 6, H + 2 * b); R(x, INK, X + W, Y - b, b + 6, H + 2 * b)
  R(x, col, X - b, Y - b, W + 2 * b, b); R(x, col, X - b, Y + H, W + 2 * b, b); R(x, col, X - b, Y, b, H); R(x, col, X + W, Y, b, H)
  if (mull) R(x, col, X + W / 2 - b / 2, Y, b, H)          // mullion
  R(x, 'rgba(255,255,255,0.18)', X - b, Y - b, W + 2 * b, 4)
}
/** a sagging string of warm bulbs from (x0,y0) to (x1,y1) */
export function bulbs(x, t, x0, y0, x1, y1, { n = 12, sag = 50, cols = ['#ffd36a', '#ff7eb6', '#7dffb0', '#9fd8ff'] } = {}) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + sag * 2, x1, y1); x.stroke()
  for (let i = 1; i < n; i++) {
    const p = i / n, bx = lerp(x0, x1, p), by = lerp(y0, y1, p) + sag * 4 * p * (1 - p)
    const c = cols[i % cols.length], tw = 0.65 + 0.35 * Math.sin(t * 3 + i * 1.7)
    x.globalAlpha = 0.35 * tw; x.fillStyle = c; x.beginPath(); x.arc(bx, by + 14, 26, 0, Math.PI * 2); x.fill()
    x.globalAlpha = 1; R(x, INK, bx - 9, by + 2, 18, 26); R(x, c, bx - 6, by + 5, 12, 20); R(x, '#fff', bx - 4, by + 7, 4, 5)
  }
  x.restore()
}
function lamp(x, cx, cy, h = 420) {
  R(x, INK, cx - 9, cy, 18, h); R(x, '#3b3556', cx - 5, cy, 10, h)
  const g = x.createRadialGradient(cx, cy, 6, cx, cy + 40, 260); g.addColorStop(0, 'rgba(255,214,140,0.55)'); g.addColorStop(1, 'rgba(255,214,140,0)')
  x.fillStyle = g; x.fillRect(cx - 270, cy - 220, 540, 560)
  R(x, INK, cx - 40, cy - 46, 80, 50); R(x, '#ffe2a0', cx - 34, cy - 40, 68, 38)
}
function ground(x, t, y0, col = '#dcd8f0') {
  R(x, INK, -140, y0 - 8, 1360, 10)
  const g = x.createLinearGradient(0, y0, 0, 2000); g.addColorStop(0, col); g.addColorStop(0.35, '#b3add6'); g.addColorStop(1, '#5d5788')
  x.fillStyle = g; x.fillRect(-140, y0, 1360, 2100 - y0)
  for (let i = 0; i < 18; i++) R(x, 'rgba(255,255,255,0.6)', ((i * 173) % 1300) - 100, y0 + 30 + ((i * 97) % 600), 30 + (i % 3) * 20, 6)
}
function skyline(x, t, y0) {
  const B = [[-120, 300], [80, 420], [250, 260], [400, 520], [600, 340], [760, 460], [930, 300], [1080, 380]]
  for (const [bx, h] of B) {
    R(x, '#1a1438', bx, y0 - h, 170, h); R(x, '#f4f1ff', bx, y0 - h - 10, 170, 12)
    for (let j = 0; j < Math.floor(h / 70); j++) for (let i = 0; i < 3; i++) if (hash(bx + i * 3 + j * 11) > 0.45) R(x, hash(bx + j) > 0.5 ? '#ffd36a' : '#ffb36a', bx + 22 + i * 48, y0 - h + 34 + j * 70, 22, 30)
  }
}
function tree(x, t, cx, by, s = 1) {
  const L = [[0, 1.0], [1, 0.78], [2, 0.56], [3, 0.36]]
  R(x, INK, cx - 26 * s, by - 60 * s, 52 * s, 66 * s); R(x, '#6b3f2a', cx - 18 * s, by - 56 * s, 36 * s, 58 * s)
  for (const [i, w] of L) {
    const y = by - 60 * s - i * 90 * s, hw = 170 * w * s
    x.fillStyle = INK; x.beginPath(); x.moveTo(cx - hw - 10, y + 8); x.lineTo(cx, y - 140 * s - 10); x.lineTo(cx + hw + 10, y + 8); x.fill()
    x.fillStyle = i % 2 ? '#2f8a5a' : '#256e48'; x.beginPath(); x.moveTo(cx - hw, y); x.lineTo(cx, y - 140 * s); x.lineTo(cx + hw, y); x.fill()
    for (let k = 0; k < 4; k++) { const c = ['#ffd36a', '#ff4f86', '#9fd8ff', '#ffffff'][(k + i) % 4], tw = 0.6 + 0.4 * Math.sin(t * 3 + k + i * 2); x.globalAlpha = tw; R(x, c, cx + (k - 1.5) * hw * 0.45 - 6, y - 26 * s, 12 * s, 12 * s); x.globalAlpha = 1 }
  }
  drawPixelStar(x, cx, by - 60 * s - 3 * 90 * s - 140 * s, 46 * s, 2, GOLD)
}
export function drawSet(x, t, kind = 'cafe', { snowN = 46 } = {}) {
  if (kind === 'street') {
    snow(x, t, -140, -140, 1360, 1400, { n: 30, size: 6, speed: 40, alpha: 0.5, seed: 9 })
    skyline(x, t, 1160)
    lamp(x, 110, 700, 480); lamp(x, 990, 660, 520)
    ground(x, t, 1160)
    snow(x, t, -140, -140, 1360, 2200, { n: snowN, seed: 2 })
    return
  }
  if (kind === 'market') {
    snow(x, t, -140, -140, 1360, 1400, { n: 30, size: 6, speed: 40, alpha: 0.5, seed: 9 })
    skyline(x, t, 1000)
    for (const [sx, c] of [[-60, '#d8344f'], [380, '#2f8a5a'], [820, '#d8344f']]) {
      R(x, INK, sx - 6, 640, 392, 480); R(x, '#3a2a48', sx, 700, 380, 420)
      for (let i = 0; i < 8; i++) R(x, i % 2 ? '#fff4e6' : c, sx + i * 47.5, 620, 47.5, 90)
      R(x, INK, sx, 708, 380, 8)
      R(x, '#7a4a2f', sx, 960, 380, 160); R(x, INK, sx, 956, 380, 8)
      for (let i = 0; i < 5; i++) R(x, ['#ffd36a', '#ff7eb6', '#c9f2d4', '#ffb36a', '#9fd8ff'][i], sx + 30 + i * 68, 900, 44, 52)
    }
    bulbs(x, t, -40, 560, 1120, 560, { n: 16, sag: 30 })
    ground(x, t, 1120)
    snow(x, t, -140, -140, 1360, 2200, { n: snowN, seed: 2 })
    return
  }
  if (kind === 'door') {     // your front door, at night: the date on the step, snow behind
    snow(x, t, -140, -140, 1360, 2200, { n: snowN, seed: 3 })
    skyline(x, t, 1060); ground(x, t, 1060)
    holes(x, '#3a2346', [[180, 220, 720, 1180]])
    frame(x, 180, 220, 720, 1180, '#e9dccb', 26, false)
    R(x, '#2a1a36', -140, 1400, 1360, 700); R(x, '#5a3a4e', -140, 1400, 1360, 18)
    lamp(x, 1010, 420, 0)
    return
  }
  // interiors
  const wall = { cafe: '#4a2a3e', sofa: '#33284e', kitchen: '#2f4a52', party: '#3e2652' }[kind] || '#3a2a4e'
  const win = kind === 'sofa' ? [[110, 300, 380, 520]] : kind === 'kitchen' ? [[300, 300, 480, 420]] : kind === 'party' ? [[640, 280, 340, 560]] : [[120, 280, 840, 600]]
  for (const w of win) { skyline(x, t, w[1] + w[3] + 60); snow(x, t, ...w, { n: Math.round(w[2] * w[3] / 9000), seed: 4 }) }
  holes(x, wall, win)
  // wallpaper stripes + warm wash
  x.save(); x.beginPath(); x.rect(-140, -140, 1360, 2200); for (const w of win) x.rect(w[0] - 24, w[1] - 24, w[2] + 48, w[3] + 48); x.clip('evenodd')
  for (let i = -2; i < 16; i++) R(x, 'rgba(255,255,255,0.035)', i * 90, -140, 30, 2200)
  const g = x.createRadialGradient(540, 900, 100, 540, 900, 900); g.addColorStop(0, 'rgba(255,190,120,0.16)'); g.addColorStop(1, 'rgba(255,190,120,0)'); x.fillStyle = g; x.fillRect(-140, -140, 1360, 2200)
  x.restore()
  for (const w of win) frame(x, ...w, kind === 'kitchen' ? '#e9dccb' : '#6a3f30')
  if (kind === 'cafe') { bulbs(x, t, 90, 230, 990, 230, { n: 14, sag: 26 }); R(x, INK, -140, 1100, 1360, 10); R(x, '#5b3446', -140, 1108, 1360, 1000) }
  if (kind === 'sofa') {
    R(x, INK, -140, 1180, 1360, 10); R(x, '#4a3a2c', -140, 1188, 1360, 1000)
    lamp(x, 900, 520, 660)
    // the sofa behind the date
    R(x, INK, 150, 870, 780, 330); R(x, '#8a3b5e', 158, 878, 764, 314); R(x, '#a24a70', 158, 878, 764, 20)
    R(x, INK, 110, 960, 110, 240); R(x, '#7a3352', 118, 968, 94, 224); R(x, INK, 860, 960, 110, 240); R(x, '#7a3352', 868, 968, 94, 224)
  }
  if (kind === 'kitchen') {
    for (let j = 0; j < 4; j++) for (let i = 0; i < 12; i++) R(x, (i + j) % 2 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.11)', i * 92 - 10, 780 + j * 92, 88, 88)
    R(x, INK, -140, 1120, 1360, 10); R(x, '#3a2a24', -140, 1128, 1360, 1000)
  }
  if (kind === 'party') {
    tree(x, t, 250, 1130, 1.25)
    bulbs(x, t, -40, 200, 1120, 200, { n: 16, sag: 30 })
    R(x, INK, -140, 1130, 1360, 10); R(x, '#3a2a3a', -140, 1138, 1360, 1000)
  }
}
/** a café table / counter in the foreground: top edge at y */
export function table(x, y = 1170, { col = '#7a4a2f', top = '#a8693f' } = {}) {
  R(x, INK, 40, y - 10, 1000, 400); R(x, col, 50, y, 980, 390); R(x, top, 50, y, 980, 26); R(x, 'rgba(255,255,255,0.22)', 50, y, 980, 6)
}
/** a mug with steam */
export function mug(x, t, cx, by, col = '#ff7eb6', s = 1) {
  R(x, INK, cx - 44 * s, by - 96 * s, 88 * s, 100 * s); R(x, col, cx - 38 * s, by - 90 * s, 76 * s, 88 * s)
  R(x, INK, cx + 38 * s, by - 74 * s, 30 * s, 48 * s); R(x, col, cx + 44 * s, by - 66 * s, 16 * s, 32 * s); R(x, INK, cx + 44 * s, by - 58 * s, 8 * s, 16 * s)
  R(x, '#6b3f2a', cx - 38 * s, by - 90 * s, 76 * s, 12 * s)
  for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.globalAlpha = 0.5 * Math.sin(Math.PI * ph); R(x, '#f4f1ff', cx - 20 * s + i * 18 * s + 8 * Math.sin(t * 2 + i), by - 110 * s - ph * 90 * s, 10 * s, 18 * s); x.globalAlpha = 1 }
}

// ── stickers (DOM): the white "POV: …" caption and the beat captions
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
function stickerHTML(text, accent, size) {
  let open = false
  return esc(text).replace(/\*/g, () => { open = !open; return open ? `<span style="font-family:${SERIF};font-style:italic;font-weight:500;font-size:${Math.round(size * 1.18)}px;color:${accent};letter-spacing:0">` : '</span>' })
}
const KINDS = {
  light: { bg: '#fff8ef', fg: '#140a28', accent: '#e0287e', shadow: '0 8px 0 rgba(10,4,24,0.55)' },
  dark: { bg: 'rgba(20,10,40,0.92)', fg: BONE, accent: GOLD, shadow: '0 8px 0 rgba(6,3,16,0.6), 0 0 0 4px rgba(255,79,168,0.75)' },
  you: { bg: YOU, fg: '#140a28', accent: '#7a1f6e', shadow: '0 8px 0 rgba(10,4,24,0.55)' },
  hot: { bg: HOT, fg: '#fff8ef', accent: '#fff2a8', shadow: '0 8px 0 rgba(10,4,24,0.55)' },
}
export function buildSticker(root, { text, at, out, x = 540, y = 600, rot = -2, size = 46, kind = 'light', maxW = 900, prefix = null }) {
  const K = KINDS[kind] || KINDS.light
  const pre = prefix ? `<span style="color:${prefix.color};margin-right:0.28em">${esc(prefix.text)}</span>` : ''
  const e = el('div', { position: 'absolute', left: x + 'px', top: y + 'px', maxWidth: maxW + 'px', width: 'max-content', padding: `${Math.round(size * 0.3)}px ${Math.round(size * 0.55)}px ${Math.round(size * 0.36)}px`, background: K.bg, color: K.fg,
    font: `800 ${size}px ${INTER}`, lineHeight: '1.08', letterSpacing: '-0.01em', textAlign: 'center', borderRadius: Math.round(size * 0.32) + 'px', boxShadow: K.shadow, display: 'none', transformOrigin: '50% 60%', pointerEvents: 'none' }, root, pre + stickerHTML(text, K.accent, size))
  return {
    update(t) {
      const k = pop01(t, at, 0.34, 2.6) * (out ? outK(t, out) : 1)
      e.style.display = k > 0.01 && t >= at ? 'block' : 'none'
      if (e.style.display === 'none') return
      const wob = 3 * Math.sin((t - at) * 16) * Math.exp(-(t - at) * 4)
      e.style.opacity = String(clamp(k * 2))
      e.style.transform = `translate(-50%, 0) scale(${k.toFixed(4)}) rotate(${(rot + wob).toFixed(2)}deg)`
    },
  }
}

function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '40px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const dot = el('div', { width: '18px', height: '18px', background: '#ff4f86', boxShadow: '0 0 12px rgba(255,79,134,0.9)' }, box)
  el('div', { font: `800 26px ${INTER}`, letterSpacing: '0.22em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', fontVariant: 'small-caps', whiteSpace: 'nowrap' }, box, 'pov: you’re dating a ___')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
      dot.style.opacity = (t % 1.1) < 0.7 ? '1' : '0.25'
    },
  }
}

// ── the camera: handheld sway + punch-ins
function applyCam(x, t, punch) {
  let z = 1, cx = 540, cy = 960
  for (const p of punch) {
    const k = ease.outCubic(prog(t, p.at, p.at + 0.16)) * (1 - ease.inOutQuad(prog(t, p.at + p.dur - 0.3, p.at + p.dur)))
    if (k <= 0) continue
    const jolt = Math.sin((t - p.at) * 70) * 6 * (1 - prog(t, p.at, p.at + 0.25))
    z *= 1 + p.z * k; cx = lerp(cx, p.x ?? 540, k) + jolt; cy = lerp(cy, p.y ?? 960, k)
  }
  const sx = 7 * Math.sin(t * 1.3) + 3 * Math.sin(t * 2.9 + 1), sy = 6 * Math.sin(t * 1.7 + 1), rot = 0.005 * Math.sin(t * 1.1)
  x.translate(540 + sx, 960 + sy); x.rotate(rot); x.scale(z * 1.02, z * 1.02); x.translate(-cx, -cy)
}

function vignette(x, k) {
  if (k <= 0) return
  const g = x.createRadialGradient(540, 960, 520, 540, 960, 1180)
  g.addColorStop(0, 'rgba(6,3,16,0)'); g.addColorStop(1, `rgba(6,3,16,${0.6 * k})`)
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
}
function progressBar(x, t, SE, k) {
  if (k <= 0) return
  const p = clamp(t / SE), X0 = 100, W = 880, Y = 1806
  x.save(); x.globalAlpha *= k
  R(x, 'rgba(255,255,255,0.2)', X0, Y, W, 8)
  const g = x.createLinearGradient(X0, 0, X0 + W, 0); g.addColorStop(0, HOT); g.addColorStop(1, GOLD)
  x.fillStyle = g; x.fillRect(X0, Y, Math.round(W * p), 8)
  R(x, BONE, X0 + W * p - 8, Y - 6, 16, 20)
  x.restore()
}

// ═══════════════════════════════════════ the episode engine
export function makePOV(cfg) {
  const DURATION = cfg.duration ?? 20
  const SE = DURATION - ENDCARD_LEN
  const CPS = 28
  const OUT = [SE - 0.45, SE - 0.05]
  const CAP_AT = cfg.captionAt ?? -1          // already on screen at frame 0
  const lines = cfg.lines || [], boxes = cfg.boxes || [], stickers = cfg.stickers || [], punch = cfg.punch || []
  const last = cfg.last

  async function build(stage) {
    try { await Promise.all(['800 112px Inter', '800 46px Inter', "italic 500 150px 'EB Garamond'", "italic 500 54px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const load = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + src })
    const imgs = {}
    for (const [k, v] of Object.entries(cfg.images || {})) imgs[k] = await load(v)
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const K = { imgs, SE, root }
    const cap = buildSticker(root, { text: cfg.caption, at: CAP_AT, out: OUT, x: 540, y: 140, rot: -1.5, size: cfg.captionSize ?? 50, kind: 'light', maxW: 940, prefix: { text: 'POV:', color: HOT } })
    const sts = stickers.map(s => buildSticker(root, { out: s.out ?? OUT, ...s }))
    const bx = boxes.map(b => dialogueBox(root, { lines: lines.slice(b.from, b.to), y: b.y ?? 1440, width: 960, height: b.h ?? 270, open: b.open, close: b.close, cps: CPS }))
    const lastT = last ? popText(root, last.text, { top: last.top ?? 1440, size: last.size ?? 120, accentSize: last.accentSize ?? 170, at: last.at, gap: 0.09, accentColor: last.color ?? HOT, wobble: true, late: 1, lateAt: last.at + 0.35, fit: true }) : null
    const bug = buildBug(root, -1)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: 0, end: SE + 0.01, root,
      update(t) {
        const k = outK(t, OUT)
        drawSky(x, t, SKY_H)
        if (k > 0) {
          x.save(); x.globalAlpha = k
          applyCam(x, t, punch)
          if (typeof cfg.set === 'function') cfg.set(x, t, K); else drawSet(x, t, cfg.set ?? 'cafe', cfg.setOpts)
          cfg.scene(x, t, K)
          x.restore()
          x.save(); x.globalAlpha = k
          vignette(x, 1)
          if (cfg.front) cfg.front(x, t, K)
          progressBar(x, t, SE, 1)
          x.restore()
        }
        cap.update(t)
        for (const s of sts) s.update(t)
        for (const b of bx) b.update(t)
        if (lastT) lastT.update(t, outK(t, OUT))
        bug.update(t, outK(t, OUT))
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = cfg.cuts
  const SCENES = [build, (stage) => buildEndcard(stage, { start: SE }), cardFrame({ start: 0, end: SE, corners: 'tr bl br' }), cardCuts(CUTS)]
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ['pop', 0.04, 1046.5, 0.045, 0], ['tick', 0.06, 0.04], ['pop', 0.33, 880, 0.03, -0.4],
    ...stickers.flatMap((s, i) => [['pop', r3(s.at + 0.02), NOTE[(i * 3 + 2) % 7] * (s.kind === 'you' ? 0.75 : 1), 0.04, (i % 2 ? 0.25 : -0.25)], ['tick', r3(s.at + 0.06), 0.03]]),
    ...punch.flatMap(p => [['whoosh', r3(p.at - 0.03), 0.18, 0.022], ['pop', r3(p.at + 0.04), 1318.51, 0.03, 0]]),
    ...boxes.map(b => ['pop', r3(b.open ?? lines[b.from].t - 0.22), 739.99, 0.035, 0]),
    ...(lines.length ? talkCues(lines, { cps: CPS, pitch: cfg.pitch || {} }) : []),
    ...(last ? [...wordPops(last.at, 3, 0.09, 2), ['pop', r3(last.at + 0.37), 1174.66, 0.05, 0], ['bell', r3(last.at + 0.4), 1567.98, 0.028, 1.2, 0], ['glitter', r3(last.at + 0.35), r3(last.at + 0.9)]] : []),
    ['whoosh', r3(OUT[0]), 0.35, 0.025],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(SE),
  ]
  return { DURATION, SE, SCENES, CUES, CPS }
}

// ── winter wear that rides on a star sprite (same opts as drawStarChar: { x, y, s, pop, hops, seed })
/** a pixel beanie with a pompom on the top point */
export function beanie(x, t, o, col = '#ff4f86', band = BONE) {
  const F = starFrame(o.x, o.y, o.s, t, o)
  const B = ['...PP...', '..PPPP..', '..CCCC..', '.CCCCCC.', 'CCCCCCCC', 'BBBBBBBB']
  inSprite(x, F, () => {
    B.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = INK; x.fillRect(14 + i - 0.3, -3.6 + j - 0.3, 1.6, 1.6) }))
    B.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'P' ? BONE : ch === 'B' ? band : col; x.fillRect(14 + i, -3.6 + j, 1, 1) }))
  })
}
/** speech-free "speed lines" streaking behind something moving fast */
export function speedLines(x, t, cx, cy, dir = -1, k = 1, col = 'rgba(244,241,255,0.75)') {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  for (let i = 0; i < 6; i++) { const len = 80 + 60 * hash(i + 3), y = cy - 110 + i * 44, ph = (t * 6 + hash(i)) % 1; R(x, col, cx + dir * (150 + ph * 60), y, dir * len, 8) }
  x.restore()
}
