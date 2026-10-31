// sxorbit2 props — Ep 2 only (the cast lives in ../../sxorbit1/scenes/orbit.js). Pixel overlays in sprite CELLS (the
// 36-cell star grid; call inside inSprite), plus a few canvas props. Pure functions; no document access.
//   shadesCells(ctx)            cool dark shades over both eyes ("Tide expected: mysterious")
//   sweatbandCells(ctx)         a pink sweatband across the top point (Tide tries Ember's Sunday)
//   quiltCells(ctx)             a patchwork blanket-fort quilt draped over the top of a star (Ember tries Tide's)
//   drawWagTail(ctx, x, y, c, t, k)   a golden-retriever pixel tail, wagging (k = wag speed 0…1)
//   drawBubble(ctx, cx, cy, w, h, k)  a pink thought bubble (with its little trail toward (tx, ty))
//   drawAnswer(ctx, cx, cy, w, t, o)  a talk-card answer chip: face-down back (o.flip 0) → face with o.text (o.flip 1)
import { clamp, lerp } from '../../../src/lib.js'
import { INK, GOLD, BONE, ORBIT_PINK, SERIF, MONO, rgba, drawCardBack } from '../../sxorbit1/scenes/orbit.js'

function paint(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  ctx.fillStyle = outline
  for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}
export function shadesCells(ctx) {
  const cells = []
  for (let i = 9; i <= 26; i++) cells.push([i, 16, '#120a24'])
  for (const x0 of [9, 20]) for (let j = 17; j <= 21; j++) for (let i = x0; i < x0 + 7; i++) {
    if (j === 21 && (i === x0 || i === x0 + 6)) continue
    cells.push([i, j, (i === x0 + 1 && j === 17) || (i === x0 + 2 && j === 18) ? '#c9c2ff' : '#120a24'])
  }
  paint(ctx, cells)
}
export function sweatbandCells(ctx) {
  const cells = []
  for (let i = 12; i <= 23; i++) for (let j = 11; j <= 12; j++) cells.push([i, j, (i + j) % 4 === 0 ? '#ffe1ee' : ORBIT_PINK])
  cells.push([24, 12, ORBIT_PINK], [25, 13, ORBIT_PINK], [25, 14, '#ffb0d0'])
  paint(ctx, cells)
}
const QUILT = ['#ff9ec8', '#ffd76a', '#9ad8f0', '#c9a6ff', '#fff3e0', '#7fe0b0']
export function quiltCells(ctx) {
  const cells = []
  for (let j = 0; j <= 14; j++) {
    const half = 1 + j * 1.25
    for (let i = Math.round(18 - half); i <= Math.round(17 + half); i++) cells.push([i, j, QUILT[(Math.floor(i / 3) + Math.floor(j / 3) * 2) % QUILT.length]])
  }
  // the drapes down both sides
  for (let j = 15; j <= 27; j++) for (const [a, b] of [[0, 8], [28, 36]]) for (let i = a; i < b; i++) {
    if (j > 22 && (i < a + (j - 22) || i >= b - (j - 22))) continue
    cells.push([i, j, QUILT[(Math.floor(i / 3) + Math.floor(j / 3) * 2) % QUILT.length]])
  }
  paint(ctx, cells)
  // stitch dashes
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  for (let j = 3; j <= 27; j += 3) for (let i = 0; i < 36; i += 3) if (cells.some(c => c[0] === i && c[1] === j)) ctx.fillRect(i + 0.3, j, 0.5, 0.25)
}
export function drawWagTail(ctx, x, y, c, t, k = 1) {
  const a0 = -0.6 + 0.65 * Math.sin(t * 22) * k
  ctx.save(); ctx.translate(Math.round(x), Math.round(y))
  for (let i = 0; i < 9; i++) {
    const a = a0 - i * 0.12, r = i * c * 1.05
    const px = -Math.cos(a) * r, py = Math.sin(a) * r - i * i * c * 0.06
    const s = c * (i < 7 ? 1.8 : 1.4)
    ctx.fillStyle = INK; ctx.fillRect(px - s / 2 - c * 0.4, py - s / 2 - c * 0.4, s + c * 0.8, s + c * 0.8)
  }
  for (let i = 0; i < 9; i++) {
    const a = a0 - i * 0.12, r = i * c * 1.05
    const px = -Math.cos(a) * r, py = Math.sin(a) * r - i * i * c * 0.06
    const s = c * (i < 7 ? 1.8 : 1.4)
    ctx.fillStyle = i > 6 ? '#fff0c8' : '#ffb347'; ctx.fillRect(px - s / 2, py - s / 2, s, s)
  }
  ctx.restore()
}
export function drawBubble(ctx, cx, cy, w, h, k, { tx = cx, ty = cy + h } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.globalAlpha *= clamp(k * 2)
  const s = lerp(0.3, 1, clamp(k))
  // trail dots toward the thinker
  for (let i = 0; i < 3; i++) {
    const p = (i + 1) / 4, r = (14 - i * 4) * s
    ctx.beginPath(); ctx.arc(lerp(cx, tx, 0.55 + p * 0.45), lerp(cy + h / 2, ty, p), r, 0, Math.PI * 2)
    ctx.fillStyle = '#fff0f7'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = ORBIT_PINK; ctx.stroke()
  }
  ctx.translate(cx, cy); ctx.scale(s, s)
  ctx.beginPath()
  const lobes = 9
  for (let i = 0; i < lobes; i++) {
    const a = i / lobes * Math.PI * 2, px = Math.cos(a) * w / 2 * 0.86, py = Math.sin(a) * h / 2 * 0.82
    ctx.moveTo(px + w * 0.16, py); ctx.arc(px, py, w * 0.16, 0, Math.PI * 2)
  }
  ctx.fillStyle = '#ff5f9c'; ctx.save(); ctx.translate(0, 8); ctx.fill(); ctx.restore()
  ctx.fillStyle = '#fff0f7'; ctx.fill()
  ctx.beginPath(); ctx.ellipse(0, 0, w * 0.46, h * 0.44, 0, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
export function drawAnswer(x, cx, cy, w, t, { flip = 0, text = '', who = '', col = GOLD, alpha = 1, rot = 0 } = {}) {
  if (alpha <= 0) return
  const h = w * 0.62, sx = Math.cos(Math.PI * clamp(flip))
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  if (sx > 0) {
    // the back: a small Align card back lying sideways
    x.save(); x.scale(sx, 1); x.rotate(Math.PI / 2); drawCardBack(x, 0, 0, h, w, t); x.restore()
  } else {
    x.scale(-sx, 1)
    x.save(); x.shadowColor = rgba(col, 0.7); x.shadowBlur = 40
    rr(x, -w / 2, -h / 2, w, h, 20); x.fillStyle = '#fff6ea'; x.fill(); x.restore()
    x.lineWidth = 6; x.strokeStyle = col; rr(x, -w / 2, -h / 2, w, h, 20); x.stroke()
    x.fillStyle = rgba(INK, 0.7); x.font = `700 ${Math.round(w * 0.065)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(who, 0, -h * 0.28)
    x.fillStyle = INK; x.font = `italic 600 ${Math.round(w * 0.16)}px ${SERIF}`
    x.fillText(text, 0, h * 0.1)
  }
  x.restore()
}
export { BONE }
