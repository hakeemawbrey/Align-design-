// st9taurushome — the Taurus home for Star Talk season 9 "A Day in the Life" (STARTALK10.md), shared by S9 E06–E10.
// One home, four rooms, crisp pixels on the 1080×1920 canvas. Draw the sky first (drawSky + daySky for the hour), then
// the room: the walls are cut around the window so the real sky shows through.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { drawTaurusHome, drawMonstera, drawRecordPlayer, TAURUS_HOME } from '../../st9taurushome.js'
//   const g = drawTaurusHome(ctx, t, { room = 'bedroom', ep = 1, dark = 0, spin = false, candles = 0, steam = 0,
//                                      leafAt = null })
//     room    'bedroom' | 'kitchen' | 'desk' | 'window'
//     ep      1…5 (E06 = 1 … E10 = 5): the tiny change that rewards bingeing. The monstera has 2 + ep leaves (it grows
//             one per episode), wherever it stands.
//     leafAt  a time: the newest leaf unfurls then (with a sparkle) instead of already being there.
//     dark    0…1: lights out (3 AM). spin: the record turns (and notes drift up). candles: 0…3 lit on the kitchen table.
//     steam   0…1: the kettle / pot steams (kitchen). robe: false = the robe is off its hook (Taurus is wearing it).
//   Returns { floor, stand: [x, y], seat: [x, y], window: { x0, y0, x1, y1 }, screen? (desk), table? (kitchen),
//            plant: [x, y], spots: { … } (ghost cameo spots) }.
//
// The three recurring props: the monstera (it grows), the record player (a record always on), and the big cosy armchair
// with its knit throw (plus the robe on its hook). Palette: sage plaster, cream trim, warm oak floor, terracotta.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, ease, prog } from '../src/lib.js'

const W = 1080, H = 1920, P = 6
export const TAURUS_HOME = {
  wall: '#56705a', wall2: '#4b634f', wallHi: '#64806a', trim: '#e9dfc6', panel: '#4a6150', floor: '#7a5536', plank: '#664429',
  cream: '#f3e8cf', oak: '#a8744a', oak2: '#835735', terra: '#c8693e', terra2: '#a4512c', leaf: '#3f9a52', leaf2: '#2e7a40',
  rose: '#e9b24a', ink: '#1b1236', knit: '#e9b24a', knit2: '#c9902e', brass: '#d7b46a',
}
const C = TAURUS_HOME
const q = v => Math.round(v / P) * P
const R = (x, a, b, w, h, c) => { x.fillStyle = c; x.fillRect(q(a), q(b), q(w), q(h)) }

function shell(x, win, floorY = 1260) {
  x.save()
  x.beginPath(); x.rect(-200, -200, W + 400, floorY + 200)
  if (win) x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0)
  x.fillStyle = C.wall; x.fill('evenodd')
  x.restore()
  // limewash mottling
  for (let i = 0; i < 60; i++) {
    const a = (i * 271) % 1300 - 100, b = (i * 137) % 900
    if (win && a + 60 > win.x0 && a < win.x1 && b + 40 > win.y0 && b < win.y1) continue
    R(x, a, b, 60 + (i % 3) * 30, 36, i % 2 ? C.wall2 : C.wallHi)
  }
  // wainscot panels
  R(x, -200, 1010, W + 400, 12, C.trim)
  for (let i = -1; i < 9; i++) { R(x, i * 140 + 20, 1046, 108, 180, C.panel); R(x, i * 140 + 20, 1046, 108, 6, C.wallHi) }
  const g = x.createLinearGradient(0, 0, 0, 360); g.addColorStop(0, 'rgba(10,14,8,0.5)'); g.addColorStop(1, 'rgba(10,14,8,0)')
  x.fillStyle = g; x.fillRect(-200, 0, W + 400, 360)
  R(x, -200, floorY, W + 400, H - floorY + 200, C.floor)
  for (let i = 0; i < 12; i++) { R(x, -200, floorY + 24 + i * 60, W + 400, 6, C.plank); R(x, ((i * 211) % 900) + 60, floorY + 30 + i * 60, 6, 54, C.plank) }
  R(x, -200, floorY - 18, W + 400, 24, C.trim); R(x, -200, floorY + 2, W + 400, 6, '#c9bc9c')
}
function windowFrame(x, w, { curtains = true, sill = true } = {}) {
  const { x0, y0, x1, y1 } = w
  R(x, x0 - 18, y0 - 18, x1 - x0 + 36, 18, C.cream); R(x, x0 - 18, y1, x1 - x0 + 36, 18, C.cream)
  R(x, x0 - 18, y0, 18, y1 - y0, C.cream); R(x, x1, y0, 18, y1 - y0, C.cream)
  R(x, (x0 + x1) / 2 - 6, y0, 12, y1 - y0, C.cream)
  x.save(); x.globalAlpha = 0.12; x.fillStyle = '#ffffff'
  x.beginPath(); x.moveTo(x0 + 30, y1); x.lineTo(x0 + 90, y0); x.lineTo(x0 + 120, y0); x.lineTo(x0 + 60, y1); x.fill(); x.restore()
  if (sill) { R(x, x0 - 36, y1 + 12, x1 - x0 + 72, 24, C.cream); R(x, x0 - 30, y1 + 36, x1 - x0 + 60, 8, '#c9bc9c') }
  if (curtains) {
    for (const a of [x0 - 66, x1 + 18]) {
      R(x, a, y0 - 48, 48, y1 - y0 + 130, C.cream)
      for (let i = 0; i < 3; i++) R(x, a + 8 + i * 14, y0 - 48, 6, y1 - y0 + 130, i % 2 ? '#e2d4b4' : '#fff6e2')
    }
    R(x, x0 - 90, y0 - 66, x1 - x0 + 180, 14, C.brass)
  }
}
/** the monstera in a terracotta pot: `leaves` leaves, the newest unfurling at leafAt */
export function drawMonstera(x, cx, base, leaves, t, { leafAt = null, s = 1 } = {}) {
  x.save(); x.translate(cx, base); x.scale(s, s)
  const SPOTS = [[-70, -260, -0.6], [70, -290, 0.5], [-20, -350, -0.1], [-110, -190, -1.0], [100, -200, 0.95], [40, -400, 0.25], [-80, -390, -0.4], [120, -330, 0.75]]
  for (let i = 0; i < Math.min(leaves, SPOTS.length); i++) {
    const [lx, ly, rot] = SPOTS[i]
    const isNew = i === leaves - 1 && leafAt != null
    const k = isNew ? ease.outBack ? clamp((t - leafAt) / 0.8) : 1 : 1
    if (k <= 0) continue
    const sway = Math.sin(t * 1.1 + i) * 0.04
    x.strokeStyle = C.leaf2; x.lineWidth = 8; x.beginPath(); x.moveTo(0, -60); x.quadraticCurveTo(lx * 0.3, ly * 0.5, lx * k, (ly + 40) * k - 60 * (1 - k)); x.stroke()
    x.save(); x.translate(lx * k, ly * k); x.rotate(rot + sway); x.scale(k, k)
    x.fillStyle = C.leaf; x.beginPath(); x.ellipse(0, 0, 70, 52, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = C.leaf2; x.fillRect(-2, -50, 4, 100)
    // the monstera splits
    x.fillStyle = C.leaf2
    for (const sy of [-26, 0, 26]) { x.fillRect(34, sy - 3, 38, 6); x.fillRect(-72, sy - 3, 38, 6) }
    x.fillStyle = '#58b868'; x.fillRect(-40, -30, 18, 10)
    x.restore()
    if (isNew && t > leafAt && t < leafAt + 1.2) {
      const p = (t - leafAt) / 1.2
      x.save(); x.globalAlpha = 1 - p; x.fillStyle = '#fff1a8'
      for (let j = 0; j < 8; j++) { const a = j * 0.785; x.fillRect(lx + Math.cos(a) * (40 + p * 70), ly + Math.sin(a) * (40 + p * 70), 8, 8) }
      x.restore()
    }
  }
  // the pot
  R(x, -66, -66, 132, 18, C.terra2); R(x, -58, -50, 116, 50, C.terra); R(x, -52, -44, 18, 36, '#de8656')
  x.restore()
}
export function drawRecordPlayer(x, cx, cy, t, spin = true) {
  R(x, cx - 120, cy, 240, 54, C.oak2); R(x, cx - 112, cy - 12, 224, 18, C.oak)
  const a = spin ? t * 3.5 : 0
  x.save(); x.translate(cx - 18, cy - 14); x.scale(1, 0.32)
  x.fillStyle = '#0a0812'; x.beginPath(); x.arc(0, 0, 82, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#2a2640'; x.lineWidth = 4; for (const r of [36, 56, 72]) { x.beginPath(); x.arc(0, 0, r, a, a + 4.5); x.stroke() }
  x.fillStyle = C.terra; x.beginPath(); x.arc(0, 0, 22, 0, Math.PI * 2); x.fill()
  x.restore()
  R(x, cx + 78, cy - 50, 10, 40, '#c9ccd8'); R(x, cx + 38, cy - 52, 50, 8, '#c9ccd8')
  if (spin) {
    x.save(); x.fillStyle = C.cream; x.font = `700 34px 'EB Garamond', serif`
    for (let i = 0; i < 3; i++) { const p = ((t * 0.5 + i / 3) % 1); x.globalAlpha = Math.sin(Math.PI * p) * 0.9; x.fillText(i % 2 ? '♪' : '♫', cx - 40 + i * 30 + Math.sin(p * 6 + i) * 14, cy - 40 - p * 140) }
    x.restore()
  }
  // the record crate
  R(x, cx - 120, cy + 54, 240, 90, C.oak); for (let i = 0; i < 6; i++) R(x, cx - 108 + i * 38, cy + 30, 30, 40, ['#c8693e', '#e9b24a', '#3f9a52', '#5a7bd5', '#e9dfc6', '#a35cf0'][i])
}
function armchair(x, cx, cy) {
  R(x, cx - 200, cy - 170, 400, 200, C.terra2)                         // back
  R(x, cx - 230, cy - 60, 90, 170, C.terra); R(x, cx + 140, cy - 60, 90, 170, C.terra)   // arms
  R(x, cx - 150, cy + 10, 300, 90, C.terra); R(x, cx - 150, cy + 10, 300, 14, '#de8656')
  R(x, cx - 200, cy + 110, 24, 40, C.oak2); R(x, cx + 176, cy + 110, 24, 40, C.oak2)
  // the knit throw over one arm
  R(x, cx + 120, cy - 90, 120, 210, C.knit)
  for (let i = 0; i < 7; i++) R(x, cx + 126, cy - 80 + i * 30, 108, 8, C.knit2)
  for (let i = 0; i < 5; i++) R(x, cx + 126 + i * 22, cy + 120, 8, 24, C.knit2)
}
function robeHook(x, hx, hy, t) {
  R(x, hx - 6, hy - 12, 12, 12, C.brass)
  const s = Math.sin(t * 1.2) * 3
  R(x, hx - 60 + s, hy, 120, 260, '#e8a0a8'); R(x, hx - 60 + s, hy, 120, 30, '#f7c4c8'); R(x, hx - 8 + s, hy + 30, 16, 230, '#d88890')
  R(x, hx - 70 + s, hy + 140, 140, 16, '#f7c4c8')
}
function lamp(x, lx, ly, on = 1) {
  R(x, lx - 6, ly - 120, 12, 120, C.oak2); R(x, lx - 54, ly - 172, 108, 58, '#f6e2b0'); R(x, lx - 36, ly, 72, 12, C.oak2)
  if (on > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(lx, ly - 120, 0, lx, ly - 120, 320); g.addColorStop(0, `rgba(255,210,140,${0.22 * on})`); g.addColorStop(1, 'rgba(255,210,140,0)')
    x.fillStyle = g; x.fillRect(lx - 320, ly - 440, 640, 640); x.restore()
  }
}
function candle(x, cx, cy, t, lit, i) {
  R(x, cx - 9, cy - 60, 18, 60, C.cream); R(x, cx - 15, cy - 6, 30, 10, C.brass)
  if (lit) {
    const f = 1 + 0.15 * Math.sin(t * 17 + i * 2)
    x.fillStyle = '#ffb347'; x.beginPath(); x.ellipse(cx, cy - 76, 7 * f, 14 * f, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff1a8'; x.beginPath(); x.ellipse(cx, cy - 72, 3, 7, 0, 0, Math.PI * 2); x.fill()
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy - 74, 0, cx, cy - 74, 200); g.addColorStop(0, 'rgba(255,180,90,0.22)'); g.addColorStop(1, 'rgba(255,180,90,0)')
    x.fillStyle = g; x.fillRect(cx - 200, cy - 274, 400, 400); x.restore()
  }
}
function steamPuffs(x, t, cx, cy, k) {
  if (k <= 0) return
  x.save()
  for (let i = 0; i < 5; i++) {
    const p = (t * 0.6 + i / 5) % 1
    x.globalAlpha = k * 0.5 * Math.sin(Math.PI * p)
    x.fillStyle = '#ffffff'
    x.beginPath(); x.arc(cx + Math.sin(p * 5 + i) * 16, cy - p * 160, 14 + p * 20, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
function darkness(x, t, win, dark) {
  if (dark <= 0) return
  x.save()
  x.beginPath(); x.rect(-200, -200, W + 400, H + 400); if (win) x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0)
  x.fillStyle = `rgba(8,8,34,${0.72 * dark})`; x.fill('evenodd')
  if (win) {
    x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.16 * dark
    const g = x.createLinearGradient(0, win.y1, 0, 1900); g.addColorStop(0, 'rgba(150,170,255,1)'); g.addColorStop(1, 'rgba(150,170,255,0)')
    x.fillStyle = g
    x.beginPath(); x.moveTo(win.x0, win.y1); x.lineTo(win.x1, win.y1); x.lineTo(win.x1 - 120, 1900); x.lineTo(win.x0 - 200, 1900); x.closePath(); x.fill()
  }
  x.restore()
}

export function drawTaurusHome(x, t, { room = 'bedroom', ep = 1, dark = 0, spin = false, candles = 0, steam = 0, leafAt = null, plant = true, robe = true } = {}) {
  const leaves = 2 + clamp(ep, 1, 6)
  x.save(); x.imageSmoothingEnabled = false
  let g
  if (room === 'bedroom') {
    const win = { x0: 180, y0: 540, x1: 520, y1: 880 }
    shell(x, win); windowFrame(x, win)
    if (robe) robeHook(x, 980, 600, t); else R(x, 974, 588, 12, 12, C.brass)
    // the bed (headboard right), sage + cream linens
    R(x, 900, 940, 48, 340, C.oak2); R(x, 828, 940, 120, 36, C.oak)
    R(x, 420, 1110, 500, 130, C.cream); R(x, 420, 1092, 500, 30, '#fff8e8')
    R(x, 420, 1086, 380, 156, '#7fa37f'); R(x, 420, 1086, 380, 18, '#9cc29a')
    for (let i = 0; i < 6; i++) R(x, 432 + i * 60, 1140, 30, 12, '#6a8f6a')
    R(x, 790, 1046, 124, 66, '#fff8e8'); R(x, 796, 1100, 112, 8, '#ded2b6')
    R(x, 420, 1240, 510, 24, C.oak2); R(x, 432, 1264, 24, 30, C.oak2); R(x, 894, 1264, 24, 30, C.oak2)
    // nightstand left of the bed, the phone, a mug
    R(x, 230, 1110, 160, 160, C.oak); R(x, 242, 1130, 136, 54, C.oak2); R(x, 242, 1196, 136, 54, C.oak2); R(x, 300, 1150, 20, 8, C.brass); R(x, 300, 1216, 20, 8, C.brass)
    R(x, 340, 1062, 36, 48, C.cream); R(x, 376, 1074, 10, 24, C.cream)
    if (plant) drawMonstera(x, 110, 1262, leaves, t, { leafAt, s: 0.9 })
    g = { floor: 1260, stand: [620, 1130], bed: [640, 1040], nightstand: [300, 1100], window: win, plant: [110, 1262], spots: { robe: [1040, 760], curtain: [114, 700], headboard: [948, 1000] } }
    darkness(x, t, win, dark)
  } else if (room === 'kitchen') {
    const win = { x0: 600, y0: 560, x1: 900, y1: 860 }
    shell(x, win); windowFrame(x, win, { curtains: false })
    // open shelves with jars
    for (const sy of [640, 800]) {
      R(x, 80, sy, 420, 18, C.oak)
      for (let i = 0; i < 5; i++) { const jx = 100 + i * 80; R(x, jx, sy - 70, 56, 70, 'rgba(240,235,220,0.85)'); R(x, jx, sy - 80, 56, 14, C.oak2); R(x, jx + 6, sy - 40, 44, 34, ['#c8693e', '#e9b24a', '#6b3a22', '#3f9a52', '#f3e8cf'][i]) }
    }
    // counter + cabinets
    R(x, 40, 990, 1000, 30, '#e9dfc6'); R(x, 40, 1020, 1000, 240, C.oak)
    for (let i = 0; i < 5; i++) { R(x, 58 + i * 196, 1038, 178, 204, C.oak2); R(x, 130 + i * 196, 1056, 30, 8, C.brass) }
    // stove + pot, kettle, pour-over
    R(x, 720, 972, 240, 18, C.ink); R(x, 760, 900, 130, 72, '#3a3654'); R(x, 744, 908, 18, 12, '#3a3654'); R(x, 888, 908, 18, 12, '#3a3654')
    steamPuffs(x, t, 826, 890, steam)
    R(x, 470, 920, 84, 70, '#c9ccd8'); R(x, 540, 934, 40, 12, '#c9ccd8'); R(x, 490, 906, 44, 16, C.ink)
    R(x, 300, 930, 60, 48, '#f6f0e0'); R(x, 292, 920, 76, 14, '#f6f0e0'); R(x, 306, 978, 48, 12, '#6b3a22')
    steamPuffs(x, t, 512, 900, steam * 0.6)
    // the table (front), the candles
    R(x, 200, 1380, 680, 24, C.oak); R(x, 220, 1404, 20, 200, C.oak2); R(x, 840, 1404, 20, 200, C.oak2)
    R(x, 200, 1370, 680, 12, '#f7efe0')
    if (candles > 0 || dark < 1) for (let i = 0; i < 3; i++) candle(x, 470 + i * 70, 1372, t, i < candles, i)
    if (plant) drawMonstera(x, 990, 1262, leaves, t, { leafAt, s: 0.8 })
    g = { floor: 1260, stand: [540, 1180], seat: [540, 1290], table: [540, 1370], window: win, pot: [826, 900], plant: [990, 1262], spots: { shelf: [500, 700], window: [600, 800] } }
    darkness(x, t, win, dark)
  } else if (room === 'desk') {
    const win = { x0: 620, y0: 520, x1: 940, y1: 820 }
    shell(x, win); windowFrame(x, win)
    R(x, 40, 1120, 1000, 30, C.oak); R(x, 40, 1150, 1000, 18, C.oak2); R(x, 60, 1168, 24, 260, C.oak2); R(x, 996, 1168, 24, 260, C.oak2)
    R(x, 60, 1168, 300, 200, C.oak); R(x, 78, 1186, 264, 74, C.oak2); R(x, 78, 1276, 264, 74, C.oak2)
    R(x, 66, 756, 468, 318, C.ink); R(x, 270, 1074, 60, 30, C.ink); R(x, 220, 1100, 160, 20, C.ink)
    R(x, 84, 774, 432, 282, '#14102a')
    R(x, 430, 1068, 48, 54, C.cream); R(x, 478, 1080, 14, 28, C.cream); R(x, 436, 1074, 36, 8, '#6b3a22')
    lamp(x, 980, 1120, dark ? 0 : 0.6)
    drawRecordPlayer(x, 160, 560, t, spin)
    if (plant) drawMonstera(x, 600, 1122, leaves, t, { leafAt, s: 0.45 })
    g = { floor: 1260, stand: [780, 1040], window: win, screen: { x0: 84, y0: 774, x1: 516, y1: 1056 }, plant: [600, 1122], spots: { lamp: [1030, 1000], monitor: [534, 820] } }
    darkness(x, t, win, dark)
  } else {
    const win = { x0: 160, y0: 420, x1: 760, y1: 960 }
    shell(x, win); windowFrame(x, win)
    armchair(x, 520, 1150)
    drawRecordPlayer(x, 140, 1110, t, spin)
    if (plant) drawMonstera(x, 920, 1262, leaves, t, { leafAt, s: 0.95 })
    R(x, 120, 1390, 840, 160, '#c9902e'); R(x, 140, 1406, 800, 128, '#e9b24a')                // the rug
    for (let i = 0; i < 9; i++) R(x, 160 + i * 88, 1460, 40, 20, '#c8693e')
    g = { floor: 1260, stand: [520, 1060], seat: [520, 1070], window: win, plant: [920, 1262], spots: { chair: [720, 1120], sill: [760, 940] } }
    darkness(x, t, win, dark)
  }
  x.restore()
  return g
}
