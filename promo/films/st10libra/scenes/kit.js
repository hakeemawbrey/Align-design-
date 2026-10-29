// st10libra kit: Libra's props (the lunch tray, the cafeteria scale, the high chair spoons, the equinox window). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'
import { drawAcademy } from '../../st10kids.js'

const INK = '#1b1236'
const r3 = v => +v.toFixed(3)

const R = Math.round

// the cafeteria: the Academy hall with a serving counter, a menu board and a lunch-room floor
export function cafeteria(x, t) {
  drawAcademy(x, t, { room: 'hall', banner: false })
  // the counter along the back wall
  x.fillStyle = INK; x.fillRect(0, 1130, 1080, 90); x.fillStyle = '#d9cdf0'; x.fillRect(0, 1136, 1080, 20); x.fillStyle = '#b7a6e0'; x.fillRect(0, 1156, 1080, 58)
  for (let i = 0; i < 5; i++) { x.fillStyle = '#9ad0ff'; x.fillRect(80 + i * 200, 1096, 120, 34); x.fillStyle = INK; x.fillRect(80 + i * 200, 1126, 120, 4) }
  // the menu board (rewatch bait)
  x.save(); x.translate(840, 470); x.rotate(0.03)
  x.fillStyle = INK; x.fillRect(-150, -84, 300, 168); x.fillStyle = '#2b4a3a'; x.fillRect(-142, -76, 284, 152)
  x.fillStyle = 'rgba(255,255,255,0.9)'; x.font = "700 24px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('TODAY', 0, -44); x.font = "700 32px 'Space Mono', monospace"; x.fillText('THAI', 0, 0); x.fillText('· SUSHI ·', 0, 40)
  x.restore()
}

// one lunch table seen from the front: a tabletop at y, half-width `half`, with a little cloth
export function lunchTable(x, t, cx, y, half) {
  x.fillStyle = INK; x.fillRect(R(cx - half - 6), y - 6, R(2 * half + 12), 40)
  x.fillStyle = '#f39a7a'; x.fillRect(R(cx - half), y, R(2 * half), 28)
  x.fillStyle = '#fbf4e6'; for (let i = 0; i < 2 * half; i += 40) x.fillRect(R(cx - half + i), y, 20, 28)
  x.fillStyle = INK; x.fillRect(R(cx - half + 20), y + 34, 14, 120); x.fillRect(R(cx + half - 34), y + 34, 14, 120)
  x.fillStyle = 'rgba(27,18,54,0.35)'; x.fillRect(R(cx - half), y + 150, R(2 * half), 10)
}

// the giant scale over the room: a gold beam on a hanging pivot, a pan over each table. level 0…1 snaps it flat.
export function scaleBeam(x, t, { tilt = 0, level = 0, L = 230, R: Rx = 850 }) {
  const a = tilt * (1 - ease.outCubic(level)), px = 540, py = 760, arm = 360
  x.save()
  x.fillStyle = '#c9a24a'; x.fillRect(px - 4, 300, 8, py - 300)
  x.translate(px, py)
  x.save(); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-arm - 8, -18, 2 * arm + 16, 36); x.fillStyle = '#f2c75c'; x.fillRect(-arm, -11, 2 * arm, 22); x.fillStyle = '#fff1b8'; x.fillRect(-arm, -11, 2 * arm, 6)
  x.restore()
  x.fillStyle = INK; x.fillRect(-34, -34, 68, 68); x.fillStyle = '#f2c75c'; x.fillRect(-27, -27, 54, 54)
  x.fillStyle = INK; x.font = "800 40px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♎', 0, 1)
  for (const s of [-1, 1]) {
    const ex = s * arm * Math.cos(a), ey = s * arm * Math.sin(a)
    const panY = ey + 190
    x.strokeStyle = '#f2c75c'; x.lineWidth = 5
    x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex - 100, panY); x.moveTo(ex, ey); x.lineTo(ex + 100, panY); x.stroke()
    x.fillStyle = INK; x.beginPath(); x.moveTo(ex - 130, panY - 6); x.lineTo(ex + 130, panY - 6); x.lineTo(ex + 90, panY + 44); x.lineTo(ex - 90, panY + 44); x.closePath(); x.fill()
    x.fillStyle = '#f2c75c'; x.beginPath(); x.moveTo(ex - 120, panY); x.lineTo(ex + 120, panY); x.lineTo(ex + 84, panY + 36); x.lineTo(ex - 84, panY + 36); x.closePath(); x.fill()
  }
  x.restore()
  if (level > 0.6) { x.save(); x.globalAlpha = clamp((level - 0.6) * 3); for (let i = 0; i < 6; i++) drawPixelStar(x, 540 + Math.cos(i + t * 2) * 380, 760 + Math.sin(i * 2 + t * 2) * 50, 12, i % 2, '#f2c75c', '#fff6d0'); x.restore() }
}

// the lunch tray: a soup bowl (steam while warm) and a sandwich; split 0…1 sends one half to each table and leaves them there
export function tray(x, t, cx, cy, { warm = 1, split = 0, L = 230, R: Rx = 850 }) {
  x.fillStyle = INK; x.fillRect(R(cx - 116), R(cy - 10), 232, 52); x.fillStyle = '#7fe0c4'; x.fillRect(R(cx - 110), R(cy - 4), 220, 40)
  // bowl
  x.fillStyle = INK; x.fillRect(R(cx - 86), R(cy - 34), 84, 42); x.fillStyle = '#fbf4e6'; x.fillRect(R(cx - 80), R(cy - 28), 72, 30); x.fillStyle = '#ff9a3a'; x.fillRect(R(cx - 76), R(cy - 28), 64, 10)
  if (warm > 0) { x.save(); x.globalAlpha = 0.6 * warm; x.fillStyle = '#ffffff'; for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; x.fillRect(R(cx - 66 + i * 22 + 6 * Math.sin(t * 4 + i)), R(cy - 40 - p * 70), 8, 14) } x.restore() }
  // sandwich (whole, or two halves flying out to the tables)
  const half = (hx, hy, rot) => { x.save(); x.translate(R(hx), R(hy)); x.rotate(rot); x.fillStyle = INK; x.fillRect(-30, -22, 60, 40); x.fillStyle = '#f2d28a'; x.fillRect(-26, -18, 52, 32); x.fillStyle = '#7ad04a'; x.fillRect(-26, -4, 52, 6); x.fillStyle = '#ff7a7a'; x.fillRect(-26, 2, 52, 4); x.restore() }
  if (split <= 0) { half(cx + 34, cy - 14, 0); half(cx + 76, cy - 14, 0) }
  else {
    const k = ease.inOutCubic(split)
    half(lerp(cx + 34, L, k), lerp(cy - 14, 1450, k) - 260 * Math.sin(Math.PI * k), -k * 6)
    half(lerp(cx + 76, Rx, k), lerp(cy - 14, 1450, k) - 260 * Math.sin(Math.PI * k), k * 6)
  }
}

// cold soup: frost pixels round the bowl
export function frost(x, t, cx, cy) {
  x.save(); x.fillStyle = '#d6f0ff'
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2 + t * 0.4, r = 70 + 8 * Math.sin(t * 3 + i); const px = cx - 44 + Math.cos(a) * r, py = cy - 30 + Math.sin(a) * r * 0.6; x.fillRect(R(px - 6), R(py - 1), 12, 3); x.fillRect(R(px - 1), R(py - 6), 3, 12) }
  x.restore()
}

// the baby's high chair (cx, base y)
export function highChair(x, t, cx, by) {
  x.fillStyle = INK; x.fillRect(cx - 120, by - 40, 22, 190); x.fillRect(cx + 98, by - 40, 22, 190); x.fillRect(cx - 160, by + 140, 320, 16)
  x.fillStyle = '#ffd0e8'; x.fillRect(cx - 114, by - 34, 10, 176); x.fillRect(cx + 104, by - 34, 10, 176)
  x.fillStyle = INK; x.fillRect(cx - 190, by - 60, 380, 40); x.fillStyle = '#fff6fb'; x.fillRect(cx - 184, by - 54, 368, 28)
}

// a baby spoon with a scoop of food on it (peas green, carrots orange)
export function spoon(x, t, cx, cy, food, rot = 0) {
  x.save(); x.translate(R(cx), R(cy)); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-6, 0, 12, 110); x.fillStyle = '#c9c4d8'; x.fillRect(-3, 2, 6, 104)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -14, 32, 22, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#dcd7ea'; x.beginPath(); x.ellipse(0, -14, 26, 16, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = food; for (let i = 0; i < 5; i++) x.fillRect(-18 + i * 7, -26 + (i % 2) * 6, 10, 10)
  x.restore()
}

// the equinox window: the left half day, the right half night, balanced on a little ♎
export function equinoxWindow(x, t, at) {
  const k = ease.outCubic(prog(t, at, at + 0.6))
  const gd = x.createLinearGradient(0, 300, 0, 1250); gd.addColorStop(0, '#7cc4ff'); gd.addColorStop(1, '#ffe2a8')
  x.fillStyle = gd; x.fillRect(0, 0, 540, 1920)
  const gn = x.createLinearGradient(0, 300, 0, 1250); gn.addColorStop(0, '#120c38'); gn.addColorStop(1, '#4a3a8a')
  x.fillStyle = gn; x.fillRect(540, 0, 540, 1920)
  for (let i = 0; i < 26; i++) drawPixelStar(x, 580 + (i * 137) % 460, 340 + (i * 89) % 820, 6 + (i % 3) * 3 + 2 * Math.sin(t * 3 + i), i % 2, '#ffffff', '#cfe0ff')
  // the Sun setting (left), the Moon rising (right)
  x.fillStyle = '#ffb43a'; x.beginPath(); x.arc(270, 1250 - 60 * k, 110, Math.PI, 0); x.fill(); x.fillRect(160, 1190 - 60 * k, 220, 60 * k + 60)
  x.fillStyle = '#ffd25c'; x.beginPath(); x.arc(270, 1250 - 60 * k, 80, Math.PI, 0); x.fill()
  x.fillStyle = '#f4ead8'; x.beginPath(); x.arc(820, 820 - 40 * k, 70, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d9cdb8'; x.fillRect(790, 790 - 40 * k, 20, 20); x.fillRect(840, 830 - 40 * k, 14, 14)
  // rooftops
  x.fillStyle = '#2a1d4c'; x.fillRect(0, 1250, 1080, 670)
  for (let i = 0; i < 8; i++) { x.fillRect(i * 140, 1190 - (i % 3) * 30, 110, 80); x.fillStyle = i % 2 ? '#ffd36e' : '#2a1d4c'; x.fillRect(i * 140 + 40, 1210 - (i % 3) * 30, 24, 24); x.fillStyle = '#2a1d4c' }
  // the split line + labels
  x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(537, 300, 6, 950)
  x.font = "800 52px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (const [lx, txt] of [[270, 'DAY'], [810, 'NIGHT']]) { x.fillStyle = INK; x.fillRect(lx - 130, 520, 260, 80); x.fillStyle = '#fbf4e6'; x.fillRect(lx - 124, 526, 248, 68); x.fillStyle = INK; x.fillText(txt, lx, 562) }
  x.fillStyle = INK; x.fillRect(500, 520, 80, 80); x.fillStyle = '#f2c75c'; x.fillRect(506, 526, 68, 68); x.fillStyle = INK; x.fillText('=', 540, 560)
  // the window frame
  x.fillStyle = INK; x.fillRect(0, 280, 1080, 24); x.fillRect(0, 1240, 1080, 20)
}

// VHS rewind / play chrome: noisy bands and a big ◀◀ while it rewinds, a ▶ PLAY tag when it plays again
export function vhs(x, t, { rewAt, playAt }) {
  const rw = t >= rewAt && t < rewAt + 0.7, pl = t >= playAt && t < playAt + 0.9
  if (!rw && !pl) return
  x.save()
  if (rw) {
    for (let i = 0; i < 7; i++) { const y = ((i * 311 + t * 2400) % 1920); x.fillStyle = `rgba(255,255,255,${0.14 + 0.08 * (i % 2)})`; x.fillRect(0, R(y), 1080, 18 + (i % 3) * 10) }
    x.fillStyle = 'rgba(40,20,80,0.25)'; x.fillRect(0, 0, 1080, 1920)
  }
  x.font = "700 64px 'Space Mono', monospace"; x.textAlign = 'left'; x.textBaseline = 'middle'
  const txt = rw ? '◀◀ REWIND' : '▶ PLAY'
  x.fillStyle = INK; x.fillText(txt, 124, 424); x.fillStyle = '#ffffff'; x.fillText(txt, 120, 420)
  x.restore()
}
