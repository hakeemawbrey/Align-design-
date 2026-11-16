// st11cancer set pieces (copied from st11aries) (local to this episode): the Houston launch pad at night, a constellation painter, a radar
// mini-map and a pixel flag. Pure f(t); no `document` at module top level.
import { clamp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c'
const MONO = "'Space Mono', ui-monospace, monospace"
const R = Math.round
export const rect = (x, a, b, w, h, c) => { x.fillStyle = c; x.fillRect(R(a), R(b), R(w), R(h)) }
export const box6 = (x, a, b, w, h, c, hi) => { rect(x, a - 6, b - 6, w + 12, h + 12, INK); rect(x, a, b, w, h, c); if (hi) rect(x, a, b, w, 6, hi) }
export const txt = (x, s, a, b, font, c, align = 'center') => { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, a, b) }
export const pop01 = (t, t0, d = 0.3, s = 1.8) => easeOutBack(prog(t, t0, t0 + d), s)

/** the Houston skyline + the launch pad: a ground band from y = ground, a lattice tower at towerX */
export function drawPad(x, t, { ground = 1480, towerX = 470, alpha = 1, lights = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  // skyline silhouette (downtown Houston, pixel blocks) with lit windows
  const B = [[40, 150], [120, 230], [190, 170], [250, 330], [320, 260], [400, 200], [600, 280], [680, 390], [760, 250], [830, 310], [900, 190], [980, 240]]
  B.forEach(([bx, h], i) => {
    const w = 64 + (i % 3) * 10
    rect(x, bx, ground - 120 - h, w, h + 120, '#141033')
    for (let j = 0; j < h / 24; j++) for (let k = 0; k < 3; k++) if ((i * 7 + j * 3 + k) % 4 === 0) rect(x, bx + 10 + k * 18, ground - 110 - h + 14 + j * 24, 8, 10, (Math.floor(t * 0.7 + i + j) % 5) ? 'rgba(255,214,140,0.55)' : 'rgba(255,214,140,0.2)')
  })
  // ground
  rect(x, 0, ground, 1080, 1920 - ground, '#1d1838'); rect(x, 0, ground, 1080, 8, '#2e2858')
  for (let k = 0; k < 14; k++) rect(x, k * 80 + 10, ground + 60, 40, 6, '#28224c')
  // pad
  box6(x, 560, ground - 24, 400, 24, '#4a4570', '#6a6494')
  for (let k = 0; k < 6; k++) { const on = lights && (t * 2 + k * 0.3) % 1 < 0.5; rect(x, 580 + k * 66, ground - 16, 14, 8, on ? '#ff5d6a' : '#5a2a3a') }
  // the lattice tower with a swing arm
  const top = ground - 760
  rect(x, towerX - 30, top, 60, 760, INK)
  rect(x, towerX - 24, top, 48, 760, '#c8432a')
  for (let j = 0; j < 760; j += 48) { rect(x, towerX - 24, top + j, 48, 6, INK); x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(towerX - 22, top + j + 6); x.lineTo(towerX + 22, top + j + 46); x.stroke() }
  rect(x, towerX + 24, top + 120, 130, 22, INK); rect(x, towerX + 24, top + 124, 126, 14, '#9aa0b4')
  // the beacon
  const on = (t * 1.2) % 1 < 0.5
  rect(x, towerX - 10, top - 26, 20, 26, INK); rect(x, towerX - 6, top - 22, 12, 18, on ? '#ff5d6a' : '#6a2a3a')
  x.restore()
  return { ground, arm: [towerX + 90, top + 142], tower: [towerX, top] }
}

/** a constellation: pixel stars joined by faint lines, an optional label under it; reveal 0…1 draws the lines on */
export function drawConstellation(x, t, pts, { links = null, label = null, labelAt = null, color = '#cfe6ff', alpha = 1, reveal = 1, size = 1, names = null } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const L = links || pts.slice(1).map((_, i) => [i, i + 1])
  x.strokeStyle = 'rgba(207,230,255,0.45)'; x.lineWidth = 3; x.setLineDash([10, 8])
  L.forEach(([a, b], i) => {
    const k = clamp(reveal * L.length - i); if (k <= 0) return
    const [ax, ay] = pts[a], [bx, by] = pts[b]
    x.beginPath(); x.moveTo(ax, ay); x.lineTo(ax + (bx - ax) * k, ay + (by - ay) * k); x.stroke()
  })
  x.setLineDash([])
  x.imageSmoothingEnabled = false
  pts.forEach(([px, py, big], i) => {
    const tw = 0.75 + 0.25 * Math.sin(t * 2.3 + i * 1.9)
    drawPixelStar(x, px, py, R((big ? 34 : 22) * size * tw), i % 2, '#ffffff', color)
  })
  x.imageSmoothingEnabled = true
  if (names) names.forEach(([i, s, dx = 0, dy = 40]) => txt(x, s, pts[i][0] + dx, pts[i][1] + dy, `700 22px ${MONO}`, 'rgba(239,230,214,0.75)'))
  if (label) { const [lx, ly] = labelAt || [540, 1180]; txt(x, label, lx, ly, `700 34px ${MONO}`, GOLD) }
  x.restore()
}

/** a pixel flag on a short pole (planted in space: it just floats) */
export function drawFlag(x, t, fx, fy, { text = '★ START', color = GOLD, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(fx, fy); x.scale(k, k)
  rect(x, -5, -170, 10, 190, INK); rect(x, -2, -168, 4, 186, '#c9cfe6')
  x.font = `700 26px ${MONO}`; const w = x.measureText(text).width + 40
  for (let j = 0; j < 4; j++) {
    const wave = R(Math.sin(t * 5 + j * 0.9) * 5)
    rect(x, 4, -168 + j * 18 + wave * 0, w + 6, 18, INK)
    rect(x, 4, -166 + j * 18, w, 16 - (j === 3 ? 2 : 0), color)
  }
  txt(x, text, 4 + w / 2, -134, `700 26px ${MONO}`, INK)
  x.restore()
}
