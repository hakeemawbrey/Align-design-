// st10scorpio kit: Scorpio's props (the dark dust cloud, the tally wall, the infrared goggles, the pink sock). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

const INK = '#1b1236'
const r3 = v => +v.toFixed(3)

const R = Math.round

// the dark dust cloud in the nursery corner. layer 'back' = the big puffs behind Scorpio, 'front' = the low puffs in front
// (their top edge sits ~20 px under the cloud's centre, so a star centred 90 px above it shows only its eyes).
// thin 0…1 fades the front once Scorpio has come out.
const BACK = [[-210, -80, 140], [-90, -190, 160], [80, -200, 150], [210, -90, 140], [0, -60, 200], [-170, 60, 130], [180, 60, 130]]
const FRONT = [[-240, 160, 120], [-120, 130, 140], [20, 120, 150], [160, 140, 140], [260, 170, 110], [-60, 220, 160], [110, 230, 150]]
export function dustCloud(x, t, cx, cy, { layer = 'back', thin = 0 } = {}) {
  const P = layer === 'back' ? BACK : FRONT
  x.save(); x.globalAlpha = layer === 'front' ? 1 - 0.65 * thin : 1 - 0.4 * thin
  P.forEach(([dx, dy, r], i) => {
    const w = 1 + 0.025 * Math.sin(t * 1.4 + i * 1.7)
    x.fillStyle = layer === 'back' ? '#24152a' : '#33203a'
    x.beginPath(); x.arc(cx + dx, cy + dy, r * w, 0, Math.PI * 2); x.fill()
  })
  // rim light and dust specks
  x.fillStyle = layer === 'back' ? 'rgba(150,110,160,0.25)' : 'rgba(170,130,180,0.3)'
  P.forEach(([dx, dy, r], i) => { x.fillRect(R(cx + dx - r * 0.5), R(cy + dy - r * 0.92), R(r * 0.6), 6) })
  for (let i = 0; i < 18; i++) { const a = i * 2.39 + t * 0.15, rr = 120 + (i * 37) % 200; x.fillStyle = 'rgba(200,170,200,0.35)'; x.fillRect(R(cx + Math.cos(a) * rr * 1.3), R(cy - 40 + Math.sin(a) * rr * 0.7), 4, 4) }
  x.restore()
}

// the crayon tally board on the wall: "DAY n", tally marks (one per day, up to 25), and a big "100!" on the last day
export function tallyBoard(x, t, { day, x: cx, y: cy, at }) {
  const k = easeOutBack(clamp(prog(t, at, at + 0.35)), 1.8)
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -116, 352, 232); x.fillStyle = '#fbf4e6'; x.fillRect(-168, -108, 336, 216)
  x.font = "800 58px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText(`DAY ${day}`, 3, -50); x.fillStyle = '#e8628a'; x.fillText(`DAY ${day}`, 0, -53)
  const n = Math.min(day, 25)
  x.strokeStyle = '#5a4a8a'; x.lineWidth = 6; x.lineCap = 'round'
  for (let i = 0; i < n; i++) {
    const g = Math.floor(i / 5), j = i % 5, gx = -150 + g * 62, wob = Math.sin(i * 3.3) * 3
    x.beginPath()
    if (j < 4) { x.moveTo(gx + j * 11, 10 + wob); x.lineTo(gx + j * 11 + 2, 70 - wob) }
    else { x.moveTo(gx - 6, 60); x.lineTo(gx + 44, 18) }
    x.stroke()
  }
  if (day > 25) { x.fillStyle = '#5a4a8a'; x.font = "800 40px Inter, sans-serif"; x.fillText('+', 160, 40) }
  if (day >= 100) {
    const b = easeOutBack(clamp(prog(t, at + 0.4, at + 0.8)), 2.4)
    x.save(); x.translate(120, 50); x.rotate(-0.2); x.scale(b, b)
    x.font = "800 80px Inter, sans-serif"; x.fillStyle = INK; x.fillText('100!', 4, 4); x.fillStyle = '#ffd36e'; x.fillText('100!', 0, 0)
    x.restore()
  }
  x.restore()
}

// the KEEP OUT crayon sign stuck in the cloud (maybe: a small "…maybe" added under it later)
export function keepOut(x, t, cx, cy, { maybe = false } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(0.08 + 0.02 * Math.sin(t * 1.5))
  x.fillStyle = '#8a5a3a'; x.fillRect(-6, 0, 12, 150)
  x.fillStyle = INK; x.fillRect(-124, -64, 248, 92); x.fillStyle = '#fbf4e6'; x.fillRect(-118, -58, 236, 80)
  x.font = "800 40px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#e23d66'; x.fillText('KEEP OUT', 0, -18)
  if (maybe) { x.fillStyle = INK; x.fillRect(-90, 34, 180, 44); x.fillStyle = '#ffd0e0'; x.fillRect(-86, 38, 172, 36); x.font = "italic 500 34px 'EB Garamond', serif"; x.fillStyle = INK; x.fillText('…maybe', 0, 56) }
  x.restore()
}

// Taurus's bowl of mashed peas (S10 E02's one food)
export function peasBowl(x, t, cx, cy) {
  x.fillStyle = INK; x.fillRect(R(cx - 56), R(cy - 30), 112, 50); x.fillStyle = '#9ad0ff'; x.fillRect(R(cx - 50), R(cy - 24), 100, 38)
  x.fillStyle = '#7ad04a'; x.fillRect(R(cx - 46), R(cy - 34), 92, 14)
  x.fillStyle = '#a8e870'; for (let i = 0; i < 6; i++) x.fillRect(R(cx - 40 + i * 15), R(cy - 40 + (i % 2) * 4), 9, 9)
}
// the picture book Taurus reads aloud
export function picBook(x, t, cx, cy) {
  x.save(); x.translate(cx, cy); x.rotate(-0.05 + 0.03 * Math.sin(t * 2))
  x.fillStyle = INK; x.fillRect(-90, -60, 180, 110); x.fillStyle = '#ffd0e0'; x.fillRect(-84, -54, 82, 98); x.fillStyle = '#d9f0ff'; x.fillRect(2, -54, 82, 98)
  drawPixelStar(x, -43, -6, 22, 0, '#f2c75c', '#fff6d0'); x.fillStyle = '#3a2a5a'; for (let i = 0; i < 4; i++) x.fillRect(14, -36 + i * 18, 58, 5)
  x.restore()
}
// the block tower built on DAY 9 (blocks land one by one from `at`)
export function blockTower(x, t, cx, by, at) {
  const C = ['#ff5a5a', '#ffd23a', '#3ab0ff', '#7ad04a', '#a35cf0']
  C.forEach((c, i) => {
    const k = ease.outCubic(prog(t, at + 0.4 + i * 0.35, at + 0.6 + i * 0.35))
    if (k <= 0) return
    const y = by - (i + 1) * 58 - (1 - k) * 120, dx = (i % 2 ? 6 : -4)
    x.fillStyle = INK; x.fillRect(R(cx - 34 + dx), R(y), 68, 58); x.fillStyle = c; x.fillRect(R(cx - 28 + dx), R(y + 6), 56, 46)
    x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(R(cx - 22 + dx), R(y + 12), 14, 14)
  })
}

// the one pink sock (adult Scorpio's secret, st9scorpioam): on the star's lower-left point, or alone (sticking out of the cloud)
export function pinkSock(x, r, size, { alone = false } = {}) {
  const c = size / 30
  const sx = alone ? r.x : r.x - size * 0.3, sy = alone ? r.y : r.y + size * 0.36
  x.save(); x.translate(R(sx), R(sy)); x.rotate(alone ? 0.4 : 0.25)
  x.fillStyle = INK; x.fillRect(R(-2.6 * c), R(-1 * c), R(5.2 * c), R(6 * c)); x.fillRect(R(-2.6 * c), R(3.4 * c), R(7.4 * c), R(3.4 * c))
  x.fillStyle = '#ff8fc8'; x.fillRect(R(-1.8 * c), R(-0.3 * c), R(3.6 * c), R(5 * c)); x.fillRect(R(-1.8 * c), R(4 * c), R(6 * c), R(2 * c))
  x.fillStyle = '#ffd0e8'; x.fillRect(R(-1.8 * c), R(-0.3 * c), R(3.6 * c), R(1.2 * c))
  x.restore()
}

// the Moon's infrared goggles, pulled down over her eyes at `at`
export function irGoggles(x, t, m, at) {
  const k = ease.outBack(prog(t, at, at + 0.35))
  const cy = lerp(m.top - 30, m.y - m.r * 0.1, k)
  x.save()
  x.fillStyle = INK; x.fillRect(R(m.x - m.r * 1.02), R(cy - 8), R(m.r * 2.04), 16)
  for (const s of [-1, 1]) {
    const gx = m.x + s * m.r * 0.38
    x.fillStyle = INK; x.beginPath(); x.arc(gx, cy, m.r * 0.32, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ff4a2a'; x.beginPath(); x.arc(gx, cy, m.r * 0.24, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffd0a0'; x.fillRect(R(gx - m.r * 0.12), R(cy - m.r * 0.14), R(m.r * 0.1), R(m.r * 0.1))
  }
  x.restore()
}

// the infrared view: the whole frame goes heat-map red/orange, the dust turns see-through and the hidden star glows
export function infrared(x, t, { at, star, draw }) {
  const k = ease.outCubic(prog(t, at, at + 0.5))
  x.save()
  x.globalAlpha = k
  x.globalCompositeOperation = 'multiply'; x.fillStyle = '#ff5a30'; x.fillRect(-200, -200, 1480, 2320)
  x.globalCompositeOperation = 'screen'; x.fillStyle = 'rgba(70,0,40,1)'; x.fillRect(-200, -200, 1480, 2320)
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(star[0], star[1], 0, star[0], star[1], 300); g.addColorStop(0, 'rgba(255,230,140,0.85)'); g.addColorStop(0.4, 'rgba(255,140,60,0.4)'); g.addColorStop(1, 'rgba(255,80,40,0)')
  x.fillStyle = g; x.fillRect(star[0] - 300, star[1] - 300, 600, 600)
  x.globalCompositeOperation = 'source-over'
  draw()
  // the HUD tag
  x.font = "700 34px 'Space Mono', monospace"; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillStyle = (Math.floor(t * 2) % 2) ? '#ffdd88' : '#ff7a4a'; x.fillText('◉ INFRARED', 120, 330)
  x.restore()
}
