// sets — the out-of-home locations of ACHIEVEMENT UNLOCKED: SINGLE LIFE (kaue01–kaue20). Owned by kaue01, read-only
// for the rest of the batch. Every painter fills the whole 1080 × 1920 frame in crisp pixel blocks (the same chunky
// style as the season-9 homes), pure f(t). Windows paint their own little night sky.
//
//   drawDiner(x, t, { room = 'door' | 'booth', lamps = 1 })   a cosy little restaurant: burgundy walls, gold pendant
//     lamps, a night window, a host stand by the door ('door') or a long red booth + table ('booth', table top y 1290).
//   drawStage(x, t, { lights = 1, crowd = 1 })                a concert hall from the crowd: stage, light beams, crowd
//     silhouettes (row of heads from y 1500).
//   drawStreet(x, t, { bench = true, signs = null })          an evening street: shop fronts, lamp post, a bench (seat y 1330).
//   drawDinner(x, t, { warm = 1 })                            a long family dinner table with a tablecloth (top y 1240),
//     fairy lights, a wreath on the wall (December).
import { R, box, label, INK, BONE, GOLD, PINK } from './achkit.js'
import { prog, ease } from '../../src/lib.js'

const PX = 6
const px = v => Math.round(v / PX) * PX

function wallpaper(x, col, stripe, y0 = 0, y1 = 1920) {
  R(x, col, 0, y0, 1080, y1 - y0)
  for (let i = 0; i < 1080; i += 72) R(x, stripe, i, y0, 18, y1 - y0)
}
function floorBoards(x, y0, a = '#5a3a2a', b = '#4a2e22') {
  R(x, a, 0, y0, 1080, 1920 - y0)
  for (let j = 0, y = y0; y < 1920; j++, y += 60) {
    R(x, b, 0, y, 1080, 6)
    for (let i = (j % 2) * 120; i < 1080; i += 240) R(x, b, i, y, 6, 60)
  }
}
function pendant(x, t, cx, top, on = 1) {
  R(x, INK, cx - 2, 0, 4, top)
  box(x, cx - 46, top, 92, 40, GOLD, { b: 6, hi: '#ffe39a' })
  if (on > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, top + 60, 10, cx, top + 60, 340)
    g.addColorStop(0, `rgba(255,214,140,${0.32 * on})`); g.addColorStop(1, 'rgba(255,214,140,0)')
    x.fillStyle = g; x.fillRect(cx - 340, top - 280, 680, 680); x.restore()
    R(x, '#fff3c0', cx - 20, top + 40, 40, 10)
  }
  void t
}
function nightWindow(x, X, Y, w, h) {
  // a little night sky in the glass
  const g = x.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#120c3a'); g.addColorStop(1, '#3a2470')
  x.fillStyle = g; x.fillRect(X, Y, w, h)
  for (let i = 0; i < 18; i++) R(x, i % 4 ? 'rgba(255,255,255,0.7)' : GOLD, X + (i * 89) % w, Y + (i * 53) % (h - 20), i % 5 ? 4 : 6, i % 5 ? 4 : 6)
  x.fillStyle = '#f3ead0'; x.beginPath(); x.arc(X + w * 0.75, Y + h * 0.25, 30, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#120c3a'; x.beginPath(); x.arc(X + w * 0.75 + 14, Y + h * 0.25 - 8, 26, 0, Math.PI * 2); x.fill()
  box(x, X - 18, Y - 18, w + 36, 18, '#e9d9b8'); box(x, X - 18, Y + h, w + 36, 22, '#e9d9b8')
  R(x, '#e9d9b8', X - 18, Y, 18, h); R(x, '#e9d9b8', X + w, Y, 18, h)
  R(x, '#e9d9b8', X + w / 2 - 6, Y, 12, h); R(x, '#e9d9b8', X, Y + h / 2 - 6, w, 12)
  R(x, 'rgba(255,255,255,0.12)', X + 20, Y + 10, 22, h - 20)
}
function plant(x, cx, by, s = 1) {
  box(x, cx - 50 * s, by - 90 * s, 100 * s, 90 * s, '#c56a3a', { b: 6, hi: '#e08a52' })
  const L = [[-60, -190, -0.5], [0, -230, 0], [60, -190, 0.5], [-30, -150, -0.3], [34, -150, 0.3]]
  for (const [dx, dy, r] of L) { x.save(); x.translate(cx + dx * s, by + dy * s); x.rotate(r); box(x, -22 * s, -60 * s, 44 * s, 120 * s, '#3f9a5a', { b: 5, hi: '#64c07a' }); x.restore() }
}

export function drawDiner(x, t, { room = 'door', lamps = 1 } = {}) {
  wallpaper(x, '#5b1f36', '#4e1a2f')
  R(x, '#3a1426', 0, 1060, 1080, 30)                      // dado rail
  R(x, '#41162a', 0, 1090, 1080, 280)
  for (let i = 30; i < 1080; i += 150) box(x, i, 1120, 110, 210, '#4a1a30', { b: 4 })
  floorBoards(x, 1370, '#3e2a3e', '#30203a')
  if (room === 'door') {
    nightWindow(x, 560, 420, 380, 420)
    // the front door (open, swung toward us at the left)
    box(x, 60, 520, 330, 850, '#2a1220', { b: 8 })
    R(x, '#1a0c16', 76, 536, 298, 834)
    box(x, 0, 500, 120, 880, '#8a4a2a', { b: 8, hi: '#a8603a' })      // the door leaf, flung open
    R(x, GOLD, 86, 940, 18, 30)
    // the host stand + a sign
    box(x, 700, 1060, 230, 300, '#7a4a2a', { b: 8, hi: '#9a6238' })
    box(x, 690, 1040, 250, 30, '#9a6238', { b: 6 })
    box(x, 740, 860, 150, 150, BONE, { b: 6 })
    label(x, 'PARTY', 815, 905, { size: 26, col: INK, alpha: 1 })
    label(x, 'OF ___', 815, 950, { size: 26, col: '#c22' })
    R(x, INK, 812, 1010, 6, 30)
    plant(x, 990, 1370, 0.9)
  } else {
    nightWindow(x, 300, 360, 480, 440)
    // the long red booth: back, seat, table
    box(x, 90, 900, 900, 300, '#b8283c', { b: 8, hi: '#d8455a' })
    for (let i = 0; i < 5; i++) R(x, '#9a1f32', 150 + i * 180, 930, 8, 250)
    box(x, 60, 1180, 960, 110, '#a02236', { b: 8, hi: '#c83a4e' })
    box(x, 220, 1290, 640, 34, '#e9d9b8', { b: 6 })                     // tabletop
    R(x, '#c9b898', 226, 1318, 628, 6)
    box(x, 520, 1324, 40, 150, '#3a2030', { b: 6 })
    // a little LED candle
    box(x, 520, 1240, 40, 50, '#f0e6d0', { b: 5 })
    const fl = 0.8 + 0.2 * Math.sin(t * 13) * Math.sin(t * 7.3)
    R(x, '#ffcf5a', 532, 1218, 16, 22 * fl); R(x, '#fff3b0', 536, 1226, 8, 12 * fl)
  }
  for (const cx of [270, 540, 810]) pendant(x, t, cx, room === 'door' ? 230 : 200, lamps)
}

export function drawStage(x, t, { lights = 1, crowd = 1 } = {}) {
  R(x, '#0b0820', 0, 0, 1080, 1920)
  // stage + backdrop
  box(x, 40, 760, 1000, 420, '#1d1340', { b: 8 })
  for (let i = 0; i < 12; i++) R(x, i % 2 ? '#24185a' : '#1d1340', 48 + i * 82, 768, 82, 404)
  box(x, 0, 1170, 1080, 90, '#3a2a6a', { b: 8, hi: '#5a46a0' })
  // speakers
  for (const sx of [70, 900]) { box(x, sx, 900, 110, 270, '#151028', { b: 6 }); for (let k = 0; k < 2; k++) { x.fillStyle = '#2a2050'; x.beginPath(); x.arc(sx + 55, 960 + k * 110, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(sx + 55, 960 + k * 110, 14, 0, Math.PI * 2); x.fill() } }
  // light beams
  if (lights > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const cols = ['255,120,200', '120,220,255', '255,220,120', '170,140,255']
    for (let i = 0; i < 4; i++) {
      const ox = 180 + i * 240, sw = Math.sin(t * (1.3 + i * 0.27) + i) * 340
      const g = x.createLinearGradient(ox, 0, ox + sw, 1200)
      g.addColorStop(0, `rgba(${cols[i]},${0.5 * lights})`); g.addColorStop(1, `rgba(${cols[i]},0)`)
      x.fillStyle = g; x.beginPath(); x.moveTo(ox - 14, 0); x.lineTo(ox + 14, 0); x.lineTo(ox + sw + 150, 1300); x.lineTo(ox + sw - 150, 1300); x.closePath(); x.fill()
    }
    x.restore()
  }
  // truss + cans
  R(x, '#3a3460', 0, 120, 1080, 24)
  for (let i = 0; i < 4; i++) box(x, 160 + i * 240, 140, 40, 40, '#2a2448', { b: 4 })
  // the crowd: rows of heads
  if (crowd > 0) for (let row = 0; row < 3; row++) {
    const y0 = 1330 + row * 150, col = ['#2a1f52', '#211843', '#181232'][row]
    for (let i = -1; i < 9; i++) {
      const hx = i * 130 + (row % 2) * 65 + 30, bob = Math.abs(Math.sin(t * 6 + i * 1.3 + row)) * 18
      R(x, col, hx - 50, y0 + 40 - bob, 100, 400); R(x, col, hx - 36, y0 - bob, 72, 60)
      if ((i + row) % 3 === 0) R(x, col, hx + 30, y0 - 120 - bob, 18, 140)        // an arm up
    }
  }
}

export function drawStreet(x, t, { bench = true } = {}) {
  // shop fronts (opaque top half: draw the sky first if you want stars above the roofline)
  const fronts = [['#3a2a5a', '#ffcf7a'], ['#2a4a5a', '#9fe6ff'], ['#5a2a3a', '#ffb0c8']]
  fronts.forEach(([c, glow], i) => {
    const X = i * 360
    box(x, X, 520, 360, 820, c, { b: 6 })
    R(x, 'rgba(0,0,0,0.25)', X, 520, 360, 40)
    box(x, X + 40, 760, 280, 300, '#120c26', { b: 6 })
    x.save(); x.globalAlpha = 0.55 + 0.1 * Math.sin(t * 2 + i); R(x, glow, X + 46, 766, 268, 288); x.restore()
    R(x, INK, X + 176, 766, 8, 288)
    for (let k = 0; k < 6; k++) R(x, k % 2 ? '#e8e0d0' : '#c8344e', X + 30 + k * 50, 700, 50, 40)    // awning
  })
  R(x, '#2a2440', 0, 1340, 1080, 40)                      // kerb
  R(x, '#3a3456', 0, 1380, 1080, 540)                     // pavement
  for (let i = 0; i < 1080; i += 180) R(x, '#2e2a48', i, 1380, 6, 540)
  for (let j = 1440; j < 1920; j += 120) R(x, '#2e2a48', 0, j, 1080, 6)
  // lamp post
  box(x, 960, 640, 24, 740, '#2a2440', { b: 6 })
  box(x, 930, 600, 84, 50, '#3a3456', { b: 6 })
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(972, 660, 10, 972, 660, 380); g.addColorStop(0, 'rgba(255,220,150,0.42)'); g.addColorStop(1, 'rgba(255,220,150,0)')
  x.fillStyle = g; x.fillRect(560, 260, 820, 820); x.restore()
  R(x, '#fff1c0', 944, 650, 56, 14)
  if (bench) {
    box(x, 200, 1200, 680, 40, '#8a5a32', { b: 6, hi: '#a8703e' })    // backrest
    box(x, 200, 1250, 680, 30, '#8a5a32', { b: 6 })
    box(x, 180, 1310, 720, 36, '#a8703e', { b: 6, hi: '#c4884c' })     // seat
    for (const lx of [220, 840]) box(x, lx, 1346, 24, 120, '#2a2440', { b: 5 })
  }
}

export function drawDinner(x, t, { warm = 1 } = {}) {
  wallpaper(x, '#2f4a3a', '#2a4234')
  R(x, '#24382d', 0, 1000, 1080, 20)
  // fairy lights
  for (let i = 0; i < 18; i++) {
    const lx = 30 + i * 60, ly = 300 + Math.sin(i * 0.7) * 26
    R(x, '#1a2a20', lx, ly - 30, 3, 30)
    const on = (Math.floor(t * 3) + i) % 3 !== 0
    R(x, on ? ['#ffcf5a', '#ff8fb1', '#9fe6ff', '#9fe6b0'][i % 4] : '#4a5a50', lx - 6, ly, 14, 18)
  }
  // a wreath
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; box(x, 540 + Math.cos(a) * 90 - 18, 560 + Math.sin(a) * 90 - 18, 36, 36, k % 2 ? '#3f8a4a' : '#2f7a3a', { b: 4 }) }
  box(x, 520, 640, 40, 30, '#c8344e', { b: 4 })
  // the table
  box(x, -20, 1240, 1120, 70, '#f3ead8', { b: 8 })
  R(x, '#e3d6bc', -20, 1300, 1120, 180)
  for (let i = 0; i < 1100; i += 60) R(x, '#d8c8aa', i, 1310, 6, 170)
  R(x, INK, -20, 1480, 1120, 8)
  floorBoards(x, 1488, '#4a3428', '#3a281e')
  if (warm > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.12 * warm; R(x, '#ffb060', 0, 0, 1080, 1920); x.restore() }
}
