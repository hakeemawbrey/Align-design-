// st11sag/kit.js — the small set kit shared by S11 E09–E12 (st11sag, st11capricorn, st11aquarius, st11pisces), built
// on top of st11space.js. Owned by the E09–E12 session. Pure f(t), no `document` at module top level.
//   R(ctx, color, x, y, w, h)                       a crisp rect (whole px)
//   drawPad(ctx, t)                                 the launch pad at night: deck, gantry tower + walkway arm (deck top 1490,
//                                                   walkway 1190 from x 640 to 780), red beacon
//   cockpit(ctx, t, { warp, speed, label, tint })   the cockpit: a big window (x 70–1010, y 470–1110) with st11space's
//                                                   starfield in it, struts, walls, the blinking dash with a label screen
//   seatBack(ctx, cx, tint) / seatFront(ctx, cx, tint)   the two seats (draw a sitter between them)
//   confetti(ctx, t, t0, cols)                      the Mission Control cheer
//   hearts(ctx, t, cx, cy, t0, t1)                  pixel hearts floating up
//   COCKPIT_SEATS = [330, 750]
import { drawBits } from '../st5cast.js'
import { starfield } from '../st11space.js'

const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff5d73', MINT = '#7dffb8', PINK = '#ff8fb1'
const MONO = "'Space Mono', ui-monospace, monospace"
export const COCKPIT_SEATS = [330, 750]

export const R = (x, c, X, Y, w, h) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }

export function drawPad(x, t) {
  const g = x.createLinearGradient(0, 1300, 0, 1560)
  g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(1, 'rgba(255,140,90,0.22)')
  x.fillStyle = g; x.fillRect(0, 1300, 1080, 260)
  R(x, '#120c26', 0, 1520, 1080, 400); R(x, '#241a44', 0, 1520, 1080, 10)
  R(x, INK, 300, 1490, 480, 36); R(x, '#4a4266', 306, 1494, 468, 26); R(x, '#6a6290', 306, 1494, 468, 6)
  const gx = 770
  R(x, INK, gx, 820, 110, 680); R(x, '#3a3358', gx + 8, 826, 94, 668)
  x.strokeStyle = '#5c5480'; x.lineWidth = 6
  for (let y = 840; y < 1480; y += 80) { x.beginPath(); x.moveTo(gx + 12, y); x.lineTo(gx + 98, y + 70); x.moveTo(gx + 98, y); x.lineTo(gx + 12, y + 70); x.stroke() }
  R(x, INK, 640, 1190, 140, 24); R(x, '#6a6290', 644, 1194, 132, 8)
  for (let i = 0; i < 5; i++) R(x, INK, 648 + i * 28, 1150, 5, 44)
  R(x, INK, 640, 1146, 140, 6)
  if ((t * 1.3) % 1 < 0.5) {
    R(x, RED, gx + 44, 800, 22, 22)
    x.save(); x.globalCompositeOperation = 'lighter'
    const b = x.createRadialGradient(gx + 55, 811, 0, gx + 55, 811, 70); b.addColorStop(0, 'rgba(255,80,100,0.5)'); b.addColorStop(1, 'rgba(255,80,100,0)')
    x.fillStyle = b; x.fillRect(gx - 20, 740, 150, 150); x.restore()
  } else R(x, '#7a2a3a', gx + 44, 800, 22, 22)
}

export function cockpit(x, t, { warp = 0, speed = 1, label = '▲ ONWARD', tint = '#1d1636', sky = null } = {}) {
  x.save(); x.beginPath(); x.rect(70, 470, 940, 640); x.clip()
  if (sky) sky(x, t); else starfield(x, t, { speed, warp })
  x.restore()
  R(x, INK, 60, 460, 960, 22); R(x, INK, 60, 1100, 960, 22); R(x, INK, 60, 460, 22, 660); R(x, INK, 998, 460, 22, 660)
  R(x, INK, 529, 460, 22, 660); R(x, '#3a3358', 534, 470, 12, 640)
  R(x, tint, 0, 1120, 1080, 520); R(x, '#2a2150', 0, 1120, 1080, 10)
  R(x, tint, 0, 300, 1080, 160)
  R(x, INK, 40, 1310, 1000, 150); R(x, '#3a3358', 48, 1318, 984, 134); R(x, '#5c5480', 48, 1318, 984, 8)
  const blinks = [RED, MINT, GOLD, '#7fdcff']
  for (let i = 0; i < 14; i++) { const on = Math.floor(t * 3 + i * 1.7) % 3 !== 0; R(x, on ? blinks[i % 4] : '#2a2448', 90 + i * 66, 1350, 26, 18) }
  R(x, '#0b0918', 340, 1385, 400, 52); x.font = `700 28px ${MONO}`; x.fillStyle = MINT; x.textAlign = 'center'
  x.fillText(label, 540, 1421); x.textAlign = 'left'
}
export function seatBack(x, cx, tint = '#4a3a7a') { R(x, INK, cx - 130, 1060, 260, 290); R(x, tint, cx - 120, 1070, 240, 270); R(x, 'rgba(255,255,255,0.12)', cx - 120, 1070, 240, 12) }
export function seatFront(x, cx, tint = '#5f4c98') { R(x, INK, cx - 150, 1250, 300, 70); R(x, tint, cx - 142, 1258, 284, 54); R(x, 'rgba(255,255,255,0.18)', cx - 142, 1258, 284, 8) }

export function confetti(x, t, t0, cols = [GOLD, PINK, MINT, '#7fdcff', '#a35cf0'], dur = 2.2) {
  const tt = t - t0
  if (tt < 0 || tt > dur + 1) return
  for (let i = 0; i < 90; i++) {
    const sx = (i * 97) % 1080, vy = 260 + (i * 31) % 240, sy = -40 + tt * vy - ((i * 53) % 400)
    if (sy < -20 || sy > 1920) continue
    const w = Math.sin(tt * 6 + i) > 0 ? 14 : 6
    R(x, cols[i % cols.length], sx + Math.sin(tt * 3 + i) * 30, sy, w, 14)
  }
}

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
export function hearts(x, t, cx, cy, t0, t1) {
  for (let i = 0; i < 5; i++) for (let b = t0 + i * 0.3; b < t1; b += 1.5) {
    if (t < b || t > b + 1.3) continue
    const p = (t - b) / 1.3
    drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + (i - 2) * 40 + Math.sin(p * 6 + i) * 10), Math.round(cy - p * 160), 5, { alpha: Math.sin(Math.PI * p) })
  }
}
