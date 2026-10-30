// srcityaustin props (pure canvas drawing, no document access at module top level). Line-art props adapted from
// cityaustin/scenes/film.js (the food truck, guitar, bats, the DEALBREAKERS card) so the remix keeps the original's look.
import { clamp, lerp, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff3d3d', CYAN = '#8fd8f6', INK = '#1b1236', DARK = '#140f2a'
export const LILAC = '#c9a6ff', TEAL = '#2fc7b0', ORANGE = '#ff9b4a', WOOD = '#8a5428', MINT = '#7dffb0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2

export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}

const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  x.restore()
}

/** an acoustic guitar in its own frame: body at the origin, neck along −x. snap 0..1 = the top string has snapped (curls) */
export function guitar(x, col, { snap = 0 } = {}) {
  const bodyPath = () => { x.beginPath(); x.arc(34, 0, 76, 0, TAU); x.moveTo(52, 0); x.arc(-44, 0, 58, 0, TAU) }
  x.beginPath(); x.roundRect(-330, -13, 240, 26, 6); x.fillStyle = WOOD; x.fill(); x.lineWidth = 5; x.strokeStyle = BONE; x.shadowColor = rgba(GOLD, 0.6); x.shadowBlur = 10; x.stroke(); x.shadowBlur = 0
  x.beginPath(); x.roundRect(-392, -21, 66, 42, 10); x.fillStyle = DARK; x.fill(); x.lineWidth = 5; x.stroke()
  for (let i = 0; i < 3; i++) { x.fillStyle = BONE; x.beginPath(); x.arc(-378 + i * 20, -27, 6, 0, TAU); x.arc(-378 + i * 20, 27, 6, 0, TAU); x.fill() }
  x.save(); bodyPath(); x.strokeStyle = BONE; x.lineWidth = 16; x.shadowColor = rgba(col, 0.9); x.shadowBlur = 22; x.stroke(); x.restore()
  bodyPath(); x.fillStyle = col; x.fill()
  x.save(); bodyPath(); x.clip(); x.fillStyle = 'rgba(255,255,255,0.18)'; x.beginPath(); x.ellipse(10, -40, 120, 30, 0, 0, TAU); x.fill(); x.restore()
  x.beginPath(); x.arc(-26, 0, 24, 0, TAU); x.fillStyle = DARK; x.fill()
  x.beginPath(); x.roundRect(58, -22, 14, 44, 4); x.fillStyle = DARK; x.fill()
  x.strokeStyle = rgba(BONE, 0.8); x.lineWidth = 3
  for (const dy of [-8, -3, 3, 8]) {
    if (dy === -8 && snap > 0) {     // the snapped string curls up off the bridge
      x.beginPath(); x.moveTo(64, dy); x.quadraticCurveTo(80 + 40 * snap, -60 * snap, 30, -90 * snap); x.stroke()
      x.beginPath(); x.moveTo(-330, dy * 0.8); x.quadraticCurveTo(-300, -50 * snap, -250, -70 * snap); x.stroke()
      continue
    }
    x.beginPath(); x.moveTo(64, dy); x.lineTo(-330, dy * 0.8); x.stroke()
  }
}

/** a tambourine (ring + jingles), shake 0..1 */
export function tambourine(x, t, shake = 0) {
  x.save(); x.rotate(0.25 * Math.sin(t * 22) * shake)
  x.beginPath(); x.arc(0, 0, 70, 0, TAU); x.fillStyle = rgba('#fff3e0', 0.85); x.fill()
  x.lineWidth = 18; x.strokeStyle = PINK; x.shadowColor = PINK; x.shadowBlur = 14; x.stroke(); x.shadowBlur = 0
  for (let i = 0; i < 6; i++) { const a = i * TAU / 6 + 0.3; x.fillStyle = GOLD; x.beginPath(); x.ellipse(Math.cos(a) * 70, Math.sin(a) * 70, 14, 9, a, 0, TAU); x.fill() }
  x.restore()
}

/** a music note (eighth) centred near its head */
export function note(x, px, py, s, col, a, rot = 0, dbl = false) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(px, py); x.rotate(rot); x.scale(s, s)
  x.fillStyle = col; x.strokeStyle = col; x.shadowColor = col; x.shadowBlur = 16; x.lineCap = 'round'
  const head = (hx) => { x.beginPath(); x.ellipse(hx, 0, 17, 12, -0.35, 0, TAU); x.fill() }
  head(0); x.lineWidth = 6; x.beginPath(); x.moveTo(14, -4); x.lineTo(14, -70); x.stroke()
  if (dbl) { head(46); x.beginPath(); x.moveTo(60, -4); x.lineTo(60, -70); x.stroke(); x.lineWidth = 12; x.beginPath(); x.moveTo(14, -66); x.lineTo(60, -66); x.stroke() }
  else { x.beginPath(); x.moveTo(14, -70); x.quadraticCurveTo(40, -54, 36, -28); x.stroke() }
  x.restore()
}

/** the food truck (drawn in the original's 1080-wide frame; scale it from outside): teal body, lit window, awning, TACOS */
export function truck(x, t, lit = 1) {
  x.beginPath(); x.roundRect(110, 700, 860, 740, 46)
  x.save(); x.clip()
  const bg = x.createLinearGradient(0, 700, 0, 1440); bg.addColorStop(0, '#174f55'); bg.addColorStop(1, '#0f2f3a'); x.fillStyle = bg; x.fillRect(100, 690, 880, 760)
  x.fillStyle = rgba(TEAL, 0.35); x.fillRect(100, 1300, 880, 26)
  x.restore()
  x.beginPath(); x.roundRect(110, 700, 860, 740, 46); ink(x, TEAL, { w: 9, fa: 0, glow: 22 })
  const wg = x.createRadialGradient(540, 960, 40, 540, 960, 520); wg.addColorStop(0, rgba(ORANGE, 0.35 * lit)); wg.addColorStop(1, rgba(ORANGE, 0))
  x.fillStyle = wg; x.fillRect(0, 600, 1080, 700)
  x.save(); x.beginPath(); x.roundRect(210, 840, 660, 240, 20); x.clip()
  const ig = x.createLinearGradient(0, 840, 0, 1080); ig.addColorStop(0, '#ffe2a0'); ig.addColorStop(1, '#ffa45a'); x.fillStyle = ig; x.fillRect(200, 830, 680, 260)
  const vx = 690 + 10 * Math.sin(t * 2.2)
  x.fillStyle = rgba(DARK, 0.85); x.beginPath(); x.arc(vx, 950, 46, 0, TAU); x.fill()
  x.beginPath(); x.roundRect(vx - 90, 1006, 180, 120, [60, 60, 0, 0]); x.fill()
  x.fillStyle = rgba(DARK, 0.75); x.beginPath(); x.roundRect(260, 880, 200, 150, 10); x.fill()
  x.fillStyle = rgba('#ffe2a0', 0.9); for (let i = 0; i < 4; i++) x.fillRect(282, 908 + i * 32, 150 - (i % 2) * 50, 10)
  x.restore()
  x.beginPath(); x.roundRect(210, 840, 660, 240, 20); ink(x, BONE, { w: 7, fa: 0, glow: 14 })
  x.beginPath(); x.roundRect(186, 1072, 708, 28, 10); ink(x, BONE, { w: 6, fa: 0.5, glow: 12 })
  x.save()
  x.beginPath(); x.moveTo(170, 770); x.lineTo(910, 770); x.lineTo(930, 830)
  const nS = 10
  for (let i = nS; i > 0; i--) { const x1 = 150 + (780 / nS) * i, x0 = x1 - 780 / nS; x.quadraticCurveTo((x0 + x1) / 2, 870, x0, 830) }
  x.closePath()
  x.save(); x.clip(); x.fillStyle = BONE; x.fillRect(140, 760, 800, 120)
  x.fillStyle = PINK; for (let i = 0; i < nS; i += 2) x.fillRect(150 + (780 / nS) * i, 760, 780 / nS, 120)
  x.restore()
  ink(x, BONE, { w: 5, fa: 0, glow: 12 })
  x.restore()
  x.font = `900 92px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = GOLD; x.shadowBlur = 20; x.fillStyle = GOLD; x.fillText('TACOS', 540, 1196); x.shadowBlur = 0
}

/** string lights draped across the frame at y0 */
export function stringLights(x, t, y0 = 600, sag = 70) {
  const r = rng(11)
  for (const [x0, x1] of [[-20, 540], [540, 1100]]) {
    x.save(); x.strokeStyle = rgba(BONE, 0.6); x.lineWidth = 3; x.beginPath()
    for (let i = 0; i <= 24; i++) { const u = i / 24, px = lerp(x0, x1, u), py = y0 + sag * 4 * u * (1 - u); i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke(); x.restore()
    for (let i = 1; i < 9; i++) {
      const u = i / 9, px = lerp(x0, x1, u), py = y0 + sag * 4 * u * (1 - u) + 12
      const col = [GOLD, PINK, CYAN, ORANGE, LILAC][Math.floor(r() * 5)], tw = 0.65 + 0.35 * Math.sin(t * 6 + r() * 6)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(px, py, 2, px, py, 34); g.addColorStop(0, rgba(col, 0.7 * tw)); g.addColorStop(1, rgba(col, 0))
      x.fillStyle = g; x.beginPath(); x.arc(px, py, 34, 0, TAU); x.fill(); x.restore()
      x.fillStyle = col; x.beginPath(); x.ellipse(px, py, 9, 12, 0, 0, TAU); x.fill()
    }
  }
}

/** a bat silhouette, flap 0..1 */
export function bat(x, px, py, s, flap) {
  x.save(); x.translate(px, py); x.scale(s, s)
  const up = Math.sin(flap * TAU) * 26
  x.beginPath()
  x.moveTo(0, -6)
  for (const sd of [1, -1]) {
    x.lineTo(sd * 20, -10)
    x.quadraticCurveTo(sd * 46, -24 - up, sd * 78, -16 - up * 1.4)
    x.lineTo(sd * 66, -2 - up * 0.6); x.lineTo(sd * 52, 4 - up * 0.3); x.lineTo(sd * 38, 2); x.lineTo(sd * 24, 10); x.lineTo(sd * 8, 8)
    x.lineTo(0, 12)
    if (sd === 1) x.moveTo(0, -6)
  }
  x.closePath()
  x.fillStyle = DARK; x.shadowColor = rgba(LILAC, 0.9); x.shadowBlur = 14; x.fill()
  x.strokeStyle = rgba(LILAC, 0.9); x.lineWidth = 3; x.stroke()
  x.beginPath(); x.arc(0, -12, 9, 0, TAU); x.fill(); x.stroke()
  x.restore()
}

/** a white chat bubble centred at the origin, tail toward (tdx, tdy) */
export function chatBubble(x, txt, size, tdx, tdy) {
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(txt).width + size * 1.1, h = size * 1.6
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
  const bx = clamp(tdx, -w / 2 + 50, w / 2 - 50)
  x.moveTo(bx - 22, h / 2 - 4); x.lineTo(tdx, tdy); x.lineTo(bx + 16, h / 2 - 4)
  x.fillStyle = '#f3eefc'; x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 30; x.shadowOffsetY = 10; x.fill(); x.shadowOffsetY = 0
  ink(x, BONE, { w: 5, fa: 0, glow: 16 })
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 3)
}

/** the DEALBREAKERS card (illustrated), centred at the origin, w × h */
export const CARD = { w: 840, h: 700 }
export const CHIP_Y = [-60, 90, 240]
export function dealCard(x) {
  const { w, h } = CARD
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
  x.fillStyle = 'rgba(18,12,40,0.95)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(LILAC, 0.2)); gr.addColorStop(1, rgba(LILAC, 0.02))
  x.fillStyle = gr; x.fill()
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); ink(x, GOLD, { w: 9, fa: 0, glow: 26 })
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = GOLD; x.font = `700 38px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 76)
  x.fillStyle = BONE; x.font = `italic 500 66px ${SERIF}`; x.fillText('Said up front.', 0, -h / 2 + 158)
  CHIP_Y.forEach(y => { x.save(); x.setLineDash([14, 12]); x.strokeStyle = rgba(BONE, 0.32); x.lineWidth = 4; x.beginPath(); x.roundRect(-345, y - 50, 690, 100, 50); x.stroke(); x.restore() })
}
/** a red ✕ chip (dealbreaker), centred at the origin */
export function xChip(x, label, hot = 0) {
  const cw = 700, ch = 104
  x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 52)
  x.fillStyle = 'rgba(58,10,22,0.96)'; x.fill()
  ink(x, RED, { w: 7, fa: 0, glow: 18 + 30 * hot })
  x.save(); x.translate(-cw / 2 + 62, 0); x.beginPath(); x.moveTo(-17, -17); x.lineTo(17, 17); x.moveTo(17, -17); x.lineTo(-17, 17); ink(x, '#ff5a52', { w: 10, fa: 0, glow: 12 }); x.restore()
  let fs = 58
  x.font = `900 ${fs}px ${INTER}`
  const room = cw - 170, mw = x.measureText(label).width
  if (mw > room) { fs = Math.floor(fs * room / mw); x.font = `900 ${fs}px ${INTER}` }
  x.fillStyle = '#ffe2dc'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(label, 30, 3)
}

/** a pixel label chip (Space Mono on a dark plate), centred at (px, py), scaled by k */
export function tag(x, px, py, text, k, { size = 28, col = BONE, bar = GOLD, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const tw = x.measureText(text).width + 32, th = size + 22
  x.fillStyle = INK; x.fillRect(-tw / 2 - 4, -th / 2 - 4, tw + 8, th + 8)
  x.fillStyle = 'rgba(20,12,44,0.97)'; x.fillRect(-tw / 2, -th / 2, tw, th); x.fillStyle = bar; x.fillRect(-tw / 2, th / 2 - 5, tw, 5)
  x.fillStyle = col; x.fillText(text, 0, 2)
  x.restore()
}

/** pixel tears under the eyes of a star drawn at (px, cy) with sprite size S (k: 1 sniffle · 2 streams) */
export function tears(x, t, px, cy, S, k = 2) {
  const c = Math.max(3, Math.round(S / 36))
  const n = k >= 2 ? 4 : 2
  for (const d of [-1, 1]) {
    const ex = px + d * 7.5 * c
    for (let q = 0; q < n; q++) {
      const ph = ((t * 1.3 + q / n + (d > 0 ? 0.2 : 0)) % 1 + 1) % 1
      const tx = ex + d * 2 * c * ph, ty = cy + 2 * c + 12 * c * ph * ph
      x.globalAlpha = 1 - ph * 0.6
      x.fillStyle = INK; x.fillRect(tx - c * 0.65, ty - c * 0.65, c * 1.3, c * 1.8)
      x.fillStyle = '#8fe3ff'; x.fillRect(tx - c / 2, ty - c / 2, c, c * 1.4)
      x.globalAlpha = 1
    }
  }
}

/** points of a heart shape (n points), centred at (cx, cy), size s */
export function heartPts(n, cx, cy, s) {
  return Array.from({ length: n }, (_, i) => {
    const a = i / n * TAU
    const hx = 16 * Math.sin(a) ** 3, hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))
    return [cx + hx * s / 16, cy + hy * s / 16]
  })
}
