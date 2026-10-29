// st9arieshome — the Aries home for Star Talk season 9 "A Day in the Life" (STARTALK10.md), shared by S9 E01–E05.
// One home, four rooms, drawn in crisp pixels on the 1080×1920 canvas. Draw the sky first (drawSky + daySky for the
// hour), then the room: the walls are cut around the window so the real sky shows through it.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { drawAriesHome, ARIES_HOME } from '../../st9arieshome.js'
//   const g = drawAriesHome(ctx, t, { room = 'bedroom', ep = 1, dark = 0, ring = false, ribbon = false })
//     room   'bedroom' | 'kitchen' | 'desk' | 'window'
//     ep     1…5: the tiny change that rewards bingeing. The cork board of IDEAS gains one sticky note per episode
//            (ep + 1 notes); the 3rd-place mini-golf ribbon (E04) is pinned to it from E05 on (or force it: ribbon: true).
//     dark   0…1: lights out (the 3 AM room): the room goes deep indigo, the window glows, a moon shaft falls in.
//     ring   true: the bedside alarm clock rings (shakes, rays).
//     notes  optional override of the cork-board notes (array of short strings).
//   Returns the room's anchors: { floor, stand: [x, y], bed: [x, y], seat: [x, y], window: { x0, y0, x1, y1 },
//            clock: [x, y], spots: { … } (ghost cameo spots) }.
//
// The three recurring props: the red boxing gloves on a hook, the dumbbell (bedroom floor, kitchen corner), and the
// cork board of IDEAS (more started projects than finished ones). Palette: brick-red walls, charcoal floor, ram-gold trim.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, ease } from '../src/lib.js'

const W = 1080, H = 1920, P = 6
export const ARIES_HOME = {
  wall: '#6b2a2f', wall2: '#5c2328', wallHi: '#7b3337', trim: '#2b1418', floor: '#34262a', plank: '#2a1d21', plankHi: '#41303a',
  gold: '#f2c75c', red: '#f0603a', red2: '#c8432a', cream: '#f3e3c8', wood: '#8a5636', wood2: '#6c3f27', ink: '#1b1236',
  steel: '#9aa0b4', steel2: '#5f6478', neon: '#ff6a4a',
}
const C = ARIES_HOME
const q = v => Math.round(v / P) * P
const R = (x, a, b, w, h, c) => { x.fillStyle = c; x.fillRect(q(a), q(b), q(w), q(h)) }
const NOTE_COLS = ['#ffe36e', '#ff9ec4', '#8fe3ff', '#b6f58a', '#ffbf6e', '#d5b4ff']
const IDEAS = ['START A PODCAST', 'RUN A MARATHON', 'LEARN GUITAR', 'OPEN A GYM', 'FINISH ONE', 'SAY SORRY']

/** the wall (with the window cut out), baseboard, floor planks */
function shell(x, win, floorY = 1260) {
  x.save()
  x.beginPath(); x.rect(-200, -200, W + 400, floorY + 200)
  if (win) x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0)
  x.fillStyle = C.wall; x.fill('evenodd')
  x.restore()
  // brick texture (pixel courses), skipping the window
  for (let r = 0; r < floorY / 36; r++) {
    const yy = r * 36, off = (r % 2) * 48
    for (let c = -1; c < W / 96 + 1; c++) {
      const xx = c * 96 + off
      if (win && xx + 90 > win.x0 && xx < win.x1 && yy + 30 > win.y0 && yy < win.y1) continue
      x.fillStyle = (r * 7 + c * 3) % 5 === 0 ? C.wallHi : C.wall2
      x.fillRect(xx, yy + 30, 90, 6); x.fillRect(xx + 90, yy, 6, 36)
    }
  }
  // ceiling shadow
  const g = x.createLinearGradient(0, 0, 0, 360); g.addColorStop(0, 'rgba(10,4,12,0.55)'); g.addColorStop(1, 'rgba(10,4,12,0)')
  x.fillStyle = g; x.fillRect(0, 0, W, 360)
  // floor
  R(x, -200, floorY, W + 400, H - floorY + 200, C.floor)
  for (let i = 0; i < 12; i++) { R(x, 0, floorY + 24 + i * 60, W, 6, C.plank); R(x, ((i * 173) % 900) + 40, floorY + 30 + i * 60, 6, 54, C.plank) }
  R(x, 0, floorY - 18, W, 24, C.trim); R(x, 0, floorY - 18, W, 6, '#3d1e24')
}
function windowFrame(x, w, { curtains = true, sill = true } = {}) {
  const { x0, y0, x1, y1 } = w
  R(x, x0 - 18, y0 - 18, x1 - x0 + 36, 18, C.cream); R(x, x0 - 18, y1, x1 - x0 + 36, 18, C.cream)
  R(x, x0 - 18, y0, 18, y1 - y0, C.cream); R(x, x1, y0, 18, y1 - y0, C.cream)
  R(x, (x0 + x1) / 2 - 6, y0, 12, y1 - y0, C.cream); R(x, x0, (y0 + y1) / 2 - 6, x1 - x0, 12, C.cream)
  // glass glint
  x.save(); x.globalAlpha = 0.12; x.fillStyle = '#ffffff'
  x.beginPath(); x.moveTo(x0 + 30, y1); x.lineTo(x0 + 90, y0); x.lineTo(x0 + 120, y0); x.lineTo(x0 + 60, y1); x.fill(); x.restore()
  if (sill) { R(x, x0 - 36, y1 + 12, x1 - x0 + 72, 24, C.cream); R(x, x0 - 30, y1 + 36, x1 - x0 + 60, 8, '#c9b597') }
  if (curtains) {
    for (const [a, s] of [[x0 - 60, 1], [x1 + 12, -1]]) {
      R(x, a, y0 - 48, 48, y1 - y0 + 120, C.red2)
      for (let i = 0; i < 3; i++) R(x, a + 8 + i * 14, y0 - 48, 6, y1 - y0 + 120, i % 2 ? '#a83522' : '#d9533a')
      void s
    }
    R(x, x0 - 84, y0 - 66, x1 - x0 + 168, 18, C.ink)
  }
}
function corkBoard(x, bx, by, ep, notes, ribbon) {
  R(x, bx - 12, by - 12, 348, 228, C.wood2); R(x, bx, by, 324, 204, '#c08a54')
  for (let i = 0; i < 30; i++) R(x, bx + ((i * 97) % 312), by + ((i * 53) % 192), 6, 6, '#a8743f')
  x.save(); x.font = `700 20px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = C.ink; x.fillText('IDEAS', bx + 162, by + 22); x.restore()
  const list = notes || IDEAS.slice(0, clamp(ep + 1, 1, 6))
  list.forEach((s, i) => {
    const nx = bx + 16 + (i % 3) * 100, ny = by + 44 + Math.floor(i / 3) * 78, rot = ((i * 37) % 9 - 4) * 0.02
    x.save(); x.translate(nx + 44, ny + 34); x.rotate(rot)
    x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-40, -28, 88, 66)
    x.fillStyle = NOTE_COLS[i % NOTE_COLS.length]; x.fillRect(-44, -32, 88, 66)
    x.fillStyle = C.red; x.fillRect(-4, -36, 8, 8)
    x.font = `700 13px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = C.ink
    const words = s.split(' '), half = Math.ceil(words.length / 2)
    x.fillText(words.slice(0, half).join(' '), 0, -8); x.fillText(words.slice(half).join(' '), 0, 10)
    if (s === 'FINISH ONE') { x.strokeStyle = '#2a8a3a'; x.lineWidth = 3; x.strokeRect(-38, -24, 76, 50) }
    x.restore()
  })
  if (ribbon) {
    const rx = bx + 290, ry = by + 150
    R(x, rx - 14, ry + 10, 12, 44, '#3a7bd5'); R(x, rx + 2, ry + 10, 12, 44, '#3a7bd5')
    x.fillStyle = '#cd7f32'; x.beginPath(); x.arc(rx, ry, 24, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#f0b070'; x.beginPath(); x.arc(rx, ry, 16, 0, Math.PI * 2); x.fill()
    x.save(); x.font = `700 16px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = C.ink; x.fillText('3RD', rx, ry + 1); x.restore()
  }
}
export function drawGloves(x, gx, gy, t = 0, sway = 1) {
  const a = Math.sin(t * 1.3) * 0.05 * sway
  x.save(); x.translate(gx, gy); x.rotate(a)
  R(x, -4, -10, 8, 10, C.steel2)                                 // the hook
  x.strokeStyle = C.cream; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-30, 40); x.moveTo(0, 0); x.lineTo(30, 46); x.stroke()
  for (const [ox, oy] of [[-34, 40], [26, 46]]) {
    R(x, ox - 24, oy, 54, 60, C.red); R(x, ox - 24, oy + 60, 54, 24, C.cream); R(x, ox - 30, oy + 12, 12, 30, C.red2)
    R(x, ox - 12, oy + 6, 18, 12, '#ff8c6a')
  }
  x.restore()
}
export function drawDumbbell(x, dx, dy, s = 1) {
  x.save(); x.translate(dx, dy); x.scale(s, s)
  R(x, -60, -6, 120, 12, C.steel)
  for (const sx of [-1, 1]) { R(x, sx * 54 - 12, -30, 24, 60, C.ink); R(x, sx * 54 - 6, -24, 12, 48, C.steel2); R(x, sx * 72 - 6, -18, 12, 36, C.ink) }
  x.restore()
}
function rug(x, cx, cy, w) {
  R(x, cx - w / 2, cy - 30, w, 60, '#8e2f2a'); R(x, cx - w / 2 + 12, cy - 18, w - 24, 36, '#b2463a')
  for (let i = 0; i < w / 48; i++) R(x, cx - w / 2 + 24 + i * 48, cy - 6, 24, 12, C.gold)
}
function alarmClock(x, cx, cy, t, ring) {
  const sh = ring ? Math.sin(t * 70) * 5 : 0, hop = ring ? Math.abs(Math.sin(t * 22)) * 8 : 0
  x.save(); x.translate(cx + sh, cy - hop)
  R(x, -42, -36, 84, 72, C.red); R(x, -30, -24, 60, 48, C.cream)
  R(x, -48, -54, 24, 18, C.gold); R(x, 24, -54, 24, 18, C.gold); R(x, -36, 36, 12, 12, C.ink); R(x, 24, 36, 12, 12, C.ink)
  x.fillStyle = C.ink; x.fillRect(-3, -18, 6, 20); x.fillRect(-3, -2, 16, 5)
  x.restore()
  if (ring) {
    x.save(); x.strokeStyle = C.gold; x.lineWidth = 5; x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 30)
    for (const s of [-1, 1]) for (const r of [64, 88]) { x.beginPath(); x.arc(cx, cy, r, s > 0 ? -0.6 : Math.PI - 0.6, s > 0 ? 0.6 : Math.PI + 0.6); x.stroke() }
    x.restore()
  }
}
function lamp(x, lx, ly, on = 1) {
  R(x, lx - 6, ly - 120, 12, 120, C.ink); R(x, lx - 48, ly - 168, 96, 54, '#f4c27a'); R(x, lx - 36, ly, 72, 12, C.ink)
  if (on > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(lx, ly - 120, 0, lx, ly - 120, 300); g.addColorStop(0, `rgba(255,200,120,${0.22 * on})`); g.addColorStop(1, 'rgba(255,200,120,0)')
    x.fillStyle = g; x.fillRect(lx - 300, ly - 420, 600, 600); x.restore()
  }
}
function darkness(x, t, win, dark) {
  if (dark <= 0) return
  x.save()
  x.beginPath(); x.rect(-200, -200, W + 400, H + 400); if (win) x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0)
  x.fillStyle = `rgba(8,6,34,${0.72 * dark})`; x.fill('evenodd')
  if (win) {
    x.globalCompositeOperation = 'lighter'
    x.globalAlpha = 0.16 * dark
    const g = x.createLinearGradient(0, win.y1, 0, 1900); g.addColorStop(0, 'rgba(150,170,255,1)'); g.addColorStop(1, 'rgba(150,170,255,0)')
    x.fillStyle = g
    x.beginPath(); x.moveTo(win.x0, win.y1); x.lineTo(win.x1, win.y1); x.lineTo(win.x1 + 220, 1900); x.lineTo(win.x0 + 60, 1900); x.closePath(); x.fill()
  }
  x.restore()
}

export function drawAriesHome(x, t, { room = 'bedroom', ep = 1, dark = 0, ring = false, ribbon = null, notes = null } = {}) {
  const rib = ribbon ?? ep >= 5
  x.save(); x.imageSmoothingEnabled = false
  let g
  if (room === 'bedroom') {
    const win = { x0: 618, y0: 560, x1: 942, y1: 900 }
    shell(x, win); windowFrame(x, win)
    corkBoard(x, 108, 560, ep, notes, rib)
    drawGloves(x, 1000, 960, t)
    // the bed (side view), headboard left
    R(x, 60, 980, 36, 300, C.wood2); R(x, 60, 980, 120, 30, C.wood)
    R(x, 84, 1120, 480, 120, '#f3e3c8'); R(x, 84, 1104, 480, 30, '#fff4e0')
    R(x, 210, 1092, 360, 150, C.red); R(x, 210, 1092, 360, 18, '#ff8466')
    for (let i = 0; i < 6; i++) R(x, 222 + i * 60, 1140, 24, 24, C.red2)
    R(x, 102, 1060, 120, 60, '#fff8ea'); R(x, 108, 1110, 108, 8, '#d9c8aa')
    R(x, 84, 1240, 492, 24, C.wood2); R(x, 96, 1264, 24, 30, C.wood2); R(x, 540, 1264, 24, 30, C.wood2)
    // nightstand + alarm clock
    R(x, 600, 1110, 150, 160, C.wood); R(x, 612, 1130, 126, 50, C.wood2); R(x, 612, 1196, 126, 50, C.wood2); R(x, 666, 1150, 18, 8, C.gold); R(x, 666, 1216, 18, 8, C.gold)
    alarmClock(x, 676, 1056, t, ring)
    rug(x, 780, 1420, 420)
    drawDumbbell(x, 880, 1330, 0.9)
    g = { floor: 1260, stand: [800, 1130], bed: [380, 1010], seat: [420, 1060], window: win, clock: [676, 1056], spots: { curtain: [960, 720], bed: [60, 1200], board: [108, 520] } }
    darkness(x, t, win, dark)
  } else if (room === 'kitchen') {
    const win = { x0: 396, y0: 600, x1: 696, y1: 880 }
    shell(x, win); windowFrame(x, win, { curtains: false })
    // fridge
    R(x, 60, 540, 258, 720, '#e8e4ee'); R(x, 60, 540, 258, 12, '#ffffff'); R(x, 60, 846, 258, 10, '#b9b4c6')
    R(x, 270, 640, 14, 140, '#9a94aa'); R(x, 270, 900, 14, 160, '#9a94aa')
    R(x, 96, 600, 120, 84, '#ffe36e')                                // the note on the fridge
    x.save(); x.font = `700 16px 'Space Mono', monospace`; x.fillStyle = C.ink; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('EAT', 156, 618); x.fillText('SITTING', 156, 640); x.fillText('DOWN (pls)', 156, 662); x.restore()
    R(x, 120, 720, 30, 30, C.red); R(x, 180, 740, 30, 30, '#8fe3ff')
    // upper cabinets
    R(x, 738, 540, 282, 252, C.wood); R(x, 750, 552, 126, 228, C.wood2); R(x, 882, 552, 126, 228, C.wood2); R(x, 858, 650, 12, 30, C.gold); R(x, 888, 650, 12, 30, C.gold)
    // counter + lower cabinets
    R(x, 318, 990, 762, 30, '#d8cbb4'); R(x, 318, 1020, 762, 240, C.wood)
    for (let i = 0; i < 4; i++) { R(x, 336 + i * 186, 1038, 168, 204, C.wood2); R(x, 408 + i * 186, 1056, 24, 8, C.gold) }
    // stove top + pan, toaster, kettle
    R(x, 790, 972, 200, 18, C.ink); R(x, 820, 950, 60, 22, '#3b3654'); R(x, 900, 950, 60, 22, '#3b3654')
    R(x, 470, 920, 120, 70, '#c9ccd8'); R(x, 490, 910, 30, 10, C.ink); R(x, 540, 910, 30, 10, C.ink); R(x, 590, 940, 12, 20, C.ink)
    // kettlebell in the corner (the gym never stops)
    x.fillStyle = C.ink; x.beginPath(); x.arc(1010, 1220, 34, 0, Math.PI * 2); x.fill(); R(x, 990, 1166, 40, 12, C.ink); R(x, 982, 1166, 12, 30, C.ink); R(x, 1026, 1166, 12, 30, C.ink)
    // the little table and chair, front right
    R(x, 600, 1370, 360, 24, C.wood); R(x, 618, 1394, 18, 200, C.wood2); R(x, 924, 1394, 18, 200, C.wood2)
    g = { floor: 1260, stand: [520, 1190], seat: [780, 1290], table: [780, 1370], window: win, toaster: [530, 920], spots: { fridge: [318, 760], cabinet: [738, 700] } }
    darkness(x, t, win, dark)
  } else if (room === 'desk') {
    const win = { x0: 640, y0: 520, x1: 960, y1: 820 }
    shell(x, win); windowFrame(x, win)
    corkBoard(x, 96, 500, ep, notes, rib)
    drawGloves(x, 560, 740, t, 0.6)
    // desk
    R(x, 40, 1120, 1000, 30, C.wood); R(x, 40, 1150, 1000, 18, C.wood2); R(x, 60, 1168, 24, 260, C.wood2); R(x, 996, 1168, 24, 260, C.wood2)
    R(x, 60, 1168, 300, 200, C.wood); R(x, 78, 1186, 264, 74, C.wood2); R(x, 78, 1276, 264, 74, C.wood2)
    // monitor (screen area returned so episodes draw the call into it)
    R(x, 66, 756, 468, 318, C.ink); R(x, 270, 1074, 60, 30, C.ink); R(x, 220, 1100, 160, 20, C.ink)
    R(x, 84, 774, 432, 282, '#14102a')
    // mug + stopwatch
    R(x, 420, 1068, 48, 54, C.cream); R(x, 468, 1080, 14, 28, C.cream); R(x, 426, 1074, 36, 8, '#6b3a22')
    lamp(x, 960, 1120, dark ? 0 : 0.7)
    drawDumbbell(x, 860, 1460, 0.8)
    g = { floor: 1260, stand: [760, 1040], window: win, screen: { x0: 84, y0: 774, x1: 516, y1: 1056 }, spots: { monitor: [534, 820], lamp: [1000, 1000] } }
    darkness(x, t, win, dark)
  } else {
    // window: the window seat, the big view
    const win = { x0: 180, y0: 420, x1: 900, y1: 1040 }
    shell(x, win); windowFrame(x, win)
    R(x, 120, 1084, 840, 108, C.wood); R(x, 132, 1068, 816, 42, C.red); R(x, 132, 1068, 816, 10, '#ff8466')
    for (let i = 0; i < 5; i++) R(x, 150 + i * 168, 1120, 132, 54, C.wood2)
    R(x, 156, 1000, 96, 72, C.gold); R(x, 168, 1012, 72, 48, '#ffd98a')           // a cushion
    drawGloves(x, 990, 720, t, 0.6)
    rug(x, 540, 1460, 560)
    g = { floor: 1260, stand: [540, 1000], seat: [540, 1010], window: win, spots: { sill: [900, 1000], seat: [120, 1150] } }
    darkness(x, t, win, dark)
  }
  x.restore()
  return g
}
