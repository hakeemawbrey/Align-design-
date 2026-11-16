// The season's road-trip van (STARTALK5.md, EP 041–070): a retro pixel van, side view, facing right.
// Cream top, an orange + yellow stripe, a teal skirt, four side windows (riders are drawn INSIDE them through a clip),
// a slanted windshield, chrome bumpers, spinning wheels and a roof rack. Pure canvas, pure f(args): no `document` here.
//   drawVan(x, X, Y, c, t, { wheelA, riders(k, rect), glare })   X, Y: the body's top-left (row 0 = the rack rail), c: cell px
//   → { windows: [rect…], ground, rackY, wheels }   rect = { x, y, w, h, cx, cy }
// The van spans 64 × 29 cells (+ the rack items above row 0, drawn by the film).
import { clamp } from '../../src/lib.js'

export const VAN_W = 64, VAN_GROUND = 28.7
const COL = { ink: '#140c2c', cream: '#efe3c8', creamHi: '#fff6e2', creamS: '#cdbd9c', teal: '#3fb6a0', tealS: '#2a8a78',
  stripe: '#f28a3c', stripe2: '#ffd166', chrome: '#c9c3d8', chromeS: '#7d7694', glass: '#221a48', red: '#ff5a5a', lamp: '#ffe08a', seam: '#b9a986' }
export const WINDOWS = [[4, 13], [16, 25], [28, 37], [40, 49]].map(([i0, i1]) => ({ i0, i1, j0: 4, j1: 13 }))
const WHEELS = [[12.5, 24], [50.5, 24]]
const R_ARCH = 5.7, R_TIRE = 4.7

const rightEdge = j => 55 + Math.floor((j - 2) * 0.75)
function inBody(i, j) {
  if (j < 1 || j > 23) return false
  if (WHEELS.some(([wx, wy]) => Math.hypot(i + 0.5 - wx, j + 0.5 - wy) < R_ARCH)) return false
  if (j === 1) return i >= 4 && i <= 52
  if (j === 2) return i >= 2 && i <= 54
  if (j <= 12) return i >= 1 && i <= rightEdge(j)
  if (j === 23) return i >= 2 && i <= 62
  return i >= 1 && i <= 63
}
const inShield = (i, j) => j >= 4 && j <= 12 && i >= 52 + Math.floor((j - 4) * 0.75) && i <= rightEdge(j) - 2
const winOf = (i, j) => WINDOWS.findIndex(w => i >= w.i0 && i <= w.i1 && j >= w.j0 && j <= w.j1)

let CELLS = null
function cells() {
  if (CELLS) return CELLS
  const body = [], outline = [], glass = []
  const shape = (i, j) => inBody(i, j)
  for (let j = 0; j <= 24; j++) for (let i = -1; i <= 65; i++) {
    if (!shape(i, j)) {
      if (shape(i + 1, j) || shape(i - 1, j) || shape(i, j + 1) || shape(i, j - 1)) outline.push([i, j])
      continue
    }
    if (winOf(i, j) >= 0 || inShield(i, j)) { glass.push([i, j, inShield(i, j)]); continue }
    let col = j <= 2 ? COL.creamHi : j <= 14 ? COL.cream : j <= 15 ? COL.stripe : j === 16 ? COL.stripe2 : j >= 22 ? COL.tealS : COL.teal
    // frames around the windows
    if (j <= 14 && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => winOf(i + a, j + b) >= 0 || inShield(i + a, j + b))) col = COL.creamS
    if ((i === 27 || i === 39) && j >= 3 && j <= 21) col = j <= 14 ? COL.seam : j >= 17 ? COL.tealS : col      // door seams
    if (j >= 20 && (i <= 2 || i >= 61)) col = j === 20 ? COL.chrome : COL.chromeS                               // bumpers
    if (i >= 62 && (j === 13 || j === 14)) col = COL.lamp                                                       // headlight
    if (i <= 2 && (j === 13 || j === 14)) col = COL.red                                                         // tail light
    if (j === 18 && (i === 34 || i === 35)) col = COL.chrome                                                    // door handle
    body.push([i, j, col])
  }
  return (CELLS = { body, outline, glass })
}

export function windowRects(X, Y, c) {
  return WINDOWS.map(w => {
    const x = X + w.i0 * c, y = Y + w.j0 * c, ww = (w.i1 - w.i0 + 1) * c, hh = (w.j1 - w.j0 + 1) * c
    return { x, y, w: ww, h: hh, cx: x + ww / 2, cy: y + hh / 2 }
  })
}

export function drawVan(x, X, Y, c, t, { wheelA = 0, riders = null, glare = 1, lights = 0 } = {}) {
  X = Math.round(X); Y = Math.round(Y)
  const { body, outline, glass } = cells()
  x.save()
  // the rack: two posts and a rail over the roof
  x.fillStyle = COL.ink; x.fillRect(X + 7 * c, Y - c * 0.4, 42 * c, c * 1.4)
  x.fillStyle = COL.chrome; x.fillRect(X + 7 * c, Y, 42 * c, c * 0.6)
  for (const i of [9, 46]) { x.fillStyle = COL.chromeS; x.fillRect(X + i * c, Y, c, c) }
  for (const [i, j] of outline) { x.fillStyle = COL.ink; x.fillRect(X + i * c, Y + j * c, c + 0.5, c + 0.5) }
  for (const [i, j, col] of body) { x.fillStyle = col; x.fillRect(X + i * c, Y + j * c, c + 0.5, c + 0.5) }
  for (const [i, j] of glass) { x.fillStyle = COL.glass; x.fillRect(X + i * c, Y + j * c, c + 0.5, c + 0.5) }
  const rects = windowRects(X, Y, c)
  if (riders) rects.forEach((r, k) => { x.save(); x.beginPath(); x.rect(r.x, r.y, r.w, r.h); x.clip(); riders(k, r); x.restore() })
  // glass glare: two soft diagonal streaks per window + the windshield
  if (glare > 0) {
    x.save(); x.globalAlpha = 0.13 * glare; x.fillStyle = '#ffffff'
    for (const r of rects) {
      x.save(); x.beginPath(); x.rect(r.x, r.y, r.w, r.h); x.clip()
      x.beginPath(); x.moveTo(r.x + r.w * 0.55, r.y); x.lineTo(r.x + r.w * 0.75, r.y); x.lineTo(r.x + r.w * 0.35, r.y + r.h); x.lineTo(r.x + r.w * 0.15, r.y + r.h); x.fill()
      x.fillRect(r.x, r.y, r.w, c * 0.5)
      x.restore()
    }
    x.restore()
  }
  // wheels: ink ring, tire, chrome hub, three spokes turning
  const wheels = WHEELS.map(([wx, wy]) => ({ x: X + wx * c, y: Y + wy * c }))
  for (const w of wheels) {
    x.fillStyle = COL.ink; x.beginPath(); x.arc(w.x, w.y, (R_TIRE + 0.6) * c, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#2d2548'; x.beginPath(); x.arc(w.x, w.y, R_TIRE * c, 0, Math.PI * 2); x.fill()
    x.fillStyle = COL.chromeS; x.beginPath(); x.arc(w.x, w.y, 2.5 * c, 0, Math.PI * 2); x.fill()
    x.fillStyle = COL.chrome; x.beginPath(); x.arc(w.x, w.y, 2.0 * c, 0, Math.PI * 2); x.fill()
    x.save(); x.translate(w.x, w.y); x.rotate(wheelA)
    x.fillStyle = COL.chromeS
    for (let k = 0; k < 3; k++) { x.rotate(Math.PI * 2 / 3); x.fillRect(-c * 0.35, -c * 2.0, c * 0.7, c * 1.5) }
    x.restore()
    x.fillStyle = COL.ink; x.fillRect(Math.round(w.x - c * 0.5), Math.round(w.y - c * 0.5), c, c)
  }
  // headlight beam
  if (lights > 0) {
    const hx = X + 64 * c, hy = Y + 14 * c
    const g = x.createLinearGradient(hx, hy, hx + 260, hy)
    g.addColorStop(0, `rgba(255,224,138,${0.55 * clamp(lights)})`); g.addColorStop(1, 'rgba(255,224,138,0)')
    x.fillStyle = g; x.beginPath(); x.moveTo(hx, hy - c); x.lineTo(hx + 260, hy - 4 * c); x.lineTo(hx + 260, hy + 5 * c); x.lineTo(hx, hy + 2 * c); x.fill()
  }
  x.restore()
  return { windows: rects, ground: Y + VAN_GROUND * c, rackY: Y, wheels }
}
