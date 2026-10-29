// st9cancerhome — Cancer's one home for Star Talk season 9, "A Day in the Life" (promo/films/STARTALK10.md), shared by
// its five episodes (st9canceram · st9cancerwork · st9cancerlove · st9cancercrew · st9cancer3am) so the set never changes.
// Pixel cells in startalk.js's style: flat fills, a 1-cell ink outline, one highlight run per prop.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { CAN, drawCancerHome, cancerRoom, drawShell } from '../../st9cancerhome.js'
//
// drawCancerHome(ctx, t, { room, ep, dark = 0, hour = 9, alpha = 1 }) → the room's anchors (same as cancerRoom(room))
//   Paints a full-bleed 1080×1920 room. Every window is a HOLE: draw the sky first (drawSky + st9day's daySky), then the
//   home, and the sky shows through the glass. Draw the cast after it.
//     room  'bedroom' | 'kitchen' | 'desk' | 'window'
//     ep    'am' | 'work' | 'love' | 'crew' | '3am': the one tiny change per episode (the moon lamp waxes a phase each
//           episode, crescent → full; the fridge collects one more photo: 5 · 6 · 7 · 9 · 9).
//     dark  0…1: lights off (the 3 AM rooms). The window and the moon lamp stay lit.
//     hour  the in-world hour (0–24), for the light patch the window throws on the floor.
// cancerRoom(room) → { floor, win: { x, y, w, h }, spots: { … [x, y] } }: where things stand (pure, no drawing):
//     bedroom: bed (a star's centre in bed), shell (the shelf's shell), stage (open floor)
//     kitchen: stove (the pot), stage, fridge
//     desk:    chair (a star's centre at the desk), boxes (the shoebox stack), stage
//     window:  seat, seat2, seat3 (window-seat star centres), sill
// drawShell(ctx, cx, cy, cell)  the crab shell itself (the season-4 prop): a coral pixel dome, for a star to wear or hold.
// CAN: the palette ({ wall, floor, wood, sea, coral, cream, silver, ink }).
//
// The three recurring props: the crab shell on its shelf, the moon lamp, the fridge of everyone's photos (+ the soup pot).
// Nothing touches `document` at module top level; pure f(t).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp } from '../src/lib.js'

export const CAN = {
  wall: '#1d3352', wallDk: '#172a45', wallLt: '#26406a', floor: '#2e3a52', wood: '#c69a6a', woodDk: '#94704a',
  sea: '#3fb6f0', seaDk: '#2a86b8', coral: '#f2895a', coralDk: '#c9643c', cream: '#f3e8d2', silver: '#cfd8ea',
  pink: '#ff9fb8', bone: '#efe6d6', ink: '#1b1236', steel: '#8d9ab0',
}
const INK = CAN.ink, C = 6
const MONO = "'Space Mono', ui-monospace, monospace"
const EPS = ['am', 'work', 'love', 'crew', '3am']

const R = Math.round
function px(x, xx, y, w, h, col) { x.fillStyle = col; x.fillRect(R(xx), R(y), R(w), R(h)) }
function box(x, xx, y, w, h, col, { hi = null, ink = INK, lw = C } = {}) {
  px(x, xx - lw, y - lw, w + 2 * lw, h + 2 * lw, ink)
  px(x, xx, y, w, h, col)
  if (hi) px(x, xx, y, w, lw, hi)
}
function label(x, text, cx, cy, size, col, { weight = 700 } = {}) {
  x.font = `${weight} ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, cx, cy)
}

const FLOOR = 1250                 // the props' own floor; the whole set is drawn OY px lower
const OY = 150, FL = FLOOR + OY    // the floor on screen
const ROOMS = {
  bedroom: { win: { x: 680, y: 600, w: 280, h: 320 } },
  kitchen: { win: { x: 330, y: 620, w: 320, h: 280 } },
  desk: { win: { x: 120, y: 560, w: 260, h: 330 } },
  window: { win: { x: 130, y: 520, w: 820, h: 640 } },
}
export function cancerRoom(room) {
  const w0 = ROOMS[room].win, win = { ...w0, y: w0.y + OY }
  const spots = {
    bedroom: { bed: [330, 1010], shell: [330, 690], stage: [790, 1150] },
    kitchen: { stove: [220, 990], stage: [560, 1150], fridge: [900, 900] },
    desk: { chair: [700, 1100], boxes: [920, 900], stage: [300, 1150] },
    window: { seat: [300, 1100], seat2: [540, 1100], seat3: [780, 1100], sill: 1160 },
  }[room]
  for (const k in spots) if (Array.isArray(spots[k])) spots[k] = [spots[k][0], spots[k][1] + OY]; else spots[k] += OY
  return { floor: FL, win, spots }
}

const SHELL = ['....oooo....', '..oOOOOOOo..', '.oOoOOOOoOo.', 'oOOoOOOOoOOo', 'oOOoOOOOoOOo', 'dddddddddddd']
const SHELL_C = { o: CAN.coral, O: '#ffb08a', d: CAN.coralDk }
export function drawShell(x, cx, cy, cell = 8) {
  const w = SHELL[0].length, h = SHELL.length
  const x0 = cx - (w * cell) / 2, y0 = cy - (h * cell) / 2
  x.fillStyle = INK
  SHELL.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') x.fillRect(R(x0 + i * cell - cell / 2), R(y0 + j * cell - cell / 2), R(cell * 2), R(cell * 2)) }))
  SHELL.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') px(x, x0 + i * cell, y0 + j * cell, cell + 0.5, cell + 0.5, SHELL_C[ch]) }))
}

function shell(x, holes) {
  x.save()
  x.beginPath(); x.rect(0, 0, 1080, FL)
  for (const h of holes) x.rect(h.x + h.w, h.y, -h.w, h.h)
  x.clip('evenodd')
  px(x, 0, 0, 1080, FL, CAN.wall)
  // wallpaper: soft wave rows
  for (let j = 0; j < 20; j++) for (let i = 0; i < 18; i++) {
    const cx = i * 64 + (j % 2) * 32, cy = 40 + j * 62
    px(x, cx, cy, 18, 6, CAN.wallLt); px(x, cx + 18, cy - 6, 14, 6, CAN.wallLt)
  }
  px(x, 0, 470 + OY, 1080, 6, CAN.wallDk); px(x, 0, 476 + OY, 1080, 4, CAN.wallLt)
  x.restore()
  // a soft rug-plank floor
  px(x, 0, FL, 1080, 1920 - FL, CAN.floor)
  for (let j = 0; j < 12; j++) {
    const y = FL + 18 + j * 56
    px(x, 0, y, 1080, 4, INK)
    for (let i = 0; i < 6; i++) px(x, ((i * 230 + j * 140) % 1180) - 50, y + 4, 4, 52, INK)
  }
  px(x, 0, FL - 6, 1080, 18, INK); px(x, 0, FL - 2, 1080, 8, CAN.wallLt)
}

function windowFrame(x, w, { curtains = true, sill = true } = {}) {
  const F = 14
  x.fillStyle = INK
  x.fillRect(w.x - F - C, w.y - F - C, w.w + 2 * (F + C), F + C); x.fillRect(w.x - F - C, w.y + w.h, w.w + 2 * (F + C), F + C)
  x.fillRect(w.x - F - C, w.y - F, F + C, w.h + 2 * F); x.fillRect(w.x + w.w, w.y - F, F + C, w.h + 2 * F)
  px(x, w.x - F, w.y - F, w.w + 2 * F, F, CAN.cream); px(x, w.x - F, w.y + w.h, w.w + 2 * F, F, CAN.cream)
  px(x, w.x - F, w.y, F, w.h, CAN.cream); px(x, w.x + w.w, w.y, F, w.h, CAN.cream)
  px(x, w.x + w.w / 2 - 6, w.y, 12, w.h, INK); px(x, w.x + w.w / 2 - 3, w.y, 6, w.h, CAN.cream)
  x.save(); x.globalAlpha = 0.16; x.fillStyle = '#ffffff'
  x.beginPath(); x.moveTo(w.x + 20, w.y + w.h - 20); x.lineTo(w.x + 70, w.y + 10); x.lineTo(w.x + 94, w.y + 10); x.lineTo(w.x + 44, w.y + w.h - 20); x.fill()
  x.restore()
  if (sill) box(x, w.x - F - 18, w.y + w.h + F, w.w + 2 * F + 36, 16, CAN.cream, { hi: '#ffffff' })
  if (curtains) for (const s of [-1, 1]) {
    const cx = s < 0 ? w.x - F - 40 : w.x + w.w + F + 4
    box(x, cx, w.y - F - 30, 36, w.h + 2 * F + 60, CAN.pink, { hi: '#ffd0dc' })
    for (let k = 0; k < 5; k++) px(x, cx + 6, w.y + k * 60, 24, 6, '#ffd0dc')                     // a little scallop print
  }
  px(x, w.x - F - 60, w.y - F - 38, w.w + 2 * F + 120, 8, INK)
}

function lightPatch(x, w, hour, k) {
  const day = clamp(1 - Math.abs(hour - 13) / 7)
  if (day <= 0 || k <= 0) return
  const col = hour < 9 ? '255,196,150' : hour > 17 ? '220,160,255' : '255,250,230'
  x.save(); x.globalAlpha = 0.16 * day * k; x.fillStyle = `rgb(${col})`
  const sk = hour < 13 ? 1 : -1
  x.beginPath(); x.moveTo(w.x, FL + 20); x.lineTo(w.x + w.w, FL + 20)
  x.lineTo(w.x + w.w + sk * 180, FL + 380); x.lineTo(w.x + sk * 180, FL + 380); x.fill()
  x.restore()
}

// ── the moon lamp: one phase further each episode (waxing crescent → full)
const PHASE = { am: 0.18, work: 0.3, love: 0.4, crew: 0.5, '3am': 0.5 }
function moonLamp(x, t, cx, cy, ep, r = 34) {
  const ph = PHASE[ep] ?? 0.18                     // 0 new · 0.25 first quarter · 0.5 full
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r * 3.4); g.addColorStop(0, 'rgba(220,235,255,0.35)'); g.addColorStop(1, 'rgba(220,235,255,0)')
  x.fillStyle = g; x.fillRect(cx - r * 3.4, cy - r * 3.4, r * 6.8, r * 6.8); x.restore()
  // the lit part, pixel by pixel: x² + y² ≤ r² and the terminator from the phase
  const cell = 6, k = Math.cos(ph * 2 * Math.PI)          // 1 = new, −1 = full
  for (let j = -r; j < r; j += cell) for (let i = -r; i < r; i += cell) {
    const X = i + cell / 2, Y = j + cell / 2
    if (X * X + Y * Y > r * r) continue
    const half = Math.sqrt(r * r - Y * Y), lit = X > k * half
    px(x, cx + i, cy + j, cell, cell, lit ? (((i + j) / cell) % 3 ? CAN.silver : '#ffffff') : '#3a4566')
  }
  box(x, cx - 26, cy + r + 4, 52, 16, CAN.woodDk)          // its little stand
  void t
}

const PHOTOS = { am: 5, work: 6, love: 7, crew: 9, '3am': 9 }
const PHOTO_C = [CAN.sea, CAN.coral, '#f2cf4a', '#2fc79a', '#e23d66', '#7c74f0', '#efe6d6', '#ef5c94', '#a35cf0']
function fridge(x, cx, ep) {
  box(x, cx, 600, 220, FLOOR - 606, '#e8eef6', { hi: '#ffffff' })
  px(x, cx, 860, 220, 6, INK); px(x, cx + 20, 760, 8, 70, INK); px(x, cx + 20, 900, 8, 90, INK)
  const n = PHOTOS[ep] ?? 5
  for (let i = 0; i < n; i++) {
    const fx = cx + 46 + (i % 3) * 58, fy = 640 + Math.floor(i / 3) * 140 + (i % 2) * 12
    box(x, fx, fy, 46, 56, '#ffffff', { lw: 3 })
    px(x, fx + 4, fy + 4, 38, 34, PHOTO_C[i % PHOTO_C.length])
    px(x, fx + 17, fy + 12, 12, 12, '#ffffff')              // a little star-face in every photo
  }
  label(x, '♥', cx + 190, 1180, 26, CAN.pink)
}

function bedroom(x, t, ep) {
  // the shelf + the shell
  box(x, 150, 740, 360, 16, CAN.wood, { hi: '#e2bb8c' })
  for (const xx of [180, 470]) px(x, xx, 756, 10, 24, INK)
  drawShell(x, 330, 700, 9)
  // the bed: a headboard and a mountain of pillows
  box(x, 70, 860, 520, 120, CAN.woodDk, { hi: CAN.wood })
  box(x, 70, 1060, 520, 80, CAN.sea, { hi: '#8fd6f6' })
  box(x, 76, 1146, 508, FLOOR - 1152, CAN.woodDk)
  const pil = [[100, 980, CAN.cream], [210, 970, CAN.pink], [330, 984, CAN.cream], [440, 972, '#9fd8ff']]
  for (const [px0, py, c] of pil) box(x, px0, py, 120, 70, c, { hi: '#ffffff' })
  // nightstand + moon lamp
  box(x, 610, 1060, 120, FLOOR - 1060, CAN.woodDk, { hi: CAN.wood })
  moonLamp(x, t, 670, 1004, ep, 30)
}

function kitchen(x, t, ep) {
  for (let i = 0; i < 3; i++) box(x, 40 + i * 92, 560, 80, 150, CAN.sea, { hi: '#8fd6f6' })
  box(x, 30, 1040, 750, 26, CAN.cream, { hi: '#ffffff' })
  box(x, 40, 1072, 730, FLOOR - 1078, CAN.seaDk)
  for (let i = 0; i < 4; i++) { px(x, 50 + i * 182, 1080, 6, FLOOR - 1090, INK); px(x, 118 + i * 182, 1110, 40, 8, INK) }
  // the stove + the soup pot (steam)
  box(x, 110, 1022, 220, 14, '#3a3a4e'); for (const xx of [150, 270]) px(x, xx, 1016, 40, 6, '#ff6d3a')
  box(x, 150, 950, 140, 70, CAN.coral, { hi: '#ffb08a' }); box(x, 140, 940, 160, 12, CAN.coralDk)
  for (const s of [-1, 1]) px(x, s < 0 ? 128 : 300, 960, 12, 10, INK)
  for (let k = 0; k < 3; k++) { const ph = (t * 0.9 + k / 3) % 1; x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); px(x, 190 + k * 26 + Math.sin(t * 3 + k) * 6, 920 - ph * 90, 8, 18, CAN.cream); x.globalAlpha = 1 }
  // the window sill herbs
  for (let i = 0; i < 3; i++) { box(x, 380 + i * 90, 990, 50, 40, CAN.coralDk); px(x, 392 + i * 90, 966, 26, 24, '#6fdc6a') }
  fridge(x, 810, ep)
  void ep
}

function desk(x, t, ep) {
  // a wall calendar of moon phases (the page for this month), the desk, the keepsake shoebox stack
  box(x, 440, 560, 260, 300, CAN.cream, { hi: '#ffffff' })
  px(x, 440, 560, 260, 46, CAN.sea); label(x, 'MOON · JUNE', 570, 584, 18, INK)
  for (let i = 0; i < 28; i++) {
    const cx = 466 + (i % 7) * 35, cy = 630 + Math.floor(i / 7) * 52, k = Math.cos((i / 29.5) * 2 * Math.PI)
    px(x, cx - 10, cy - 10, 20, 20, '#3a4566')
    const w = (1 - k) / 2 * 20
    px(x, cx + 10 - w, cy - 10, w, 20, CAN.silver)
  }
  box(x, 400, 1000, 640, 26, CAN.wood, { hi: '#e2bb8c' })
  for (const xx of [420, 1000]) box(x, xx, 1030, 20, FLOOR - 1036, CAN.woodDk)
  // laptop (closed-ish, a sticker) + the moon lamp
  box(x, 560, 960, 220, 40, '#9aa6c0', { hi: '#c4cde0' }); px(x, 650, 970, 30, 20, CAN.pink)
  moonLamp(x, t, 470, 940, ep, 26)
  // keepsake shoeboxes, labelled by year
  ;['2019', '2021', '2023', 'YOU'].forEach((s, i) => {
    const y = 940 - i * 74
    box(x, 830, y, 170, 60, i % 2 ? CAN.coral : CAN.sea, { hi: '#ffffff' })
    box(x, 824, y - 4, 182, 12, i % 2 ? CAN.coralDk : CAN.seaDk)
    label(x, s, 915, y + 34, 18, INK)
  })
  void t
}

function windowSeat(x, t, ep) {
  box(x, 90, 1170, 900, FLOOR - 1176, CAN.woodDk, { hi: CAN.wood })
  box(x, 110, 1130, 860, 36, CAN.sea, { hi: '#8fd6f6' })
  box(x, 130, 1070, 120, 60, CAN.pink, { hi: '#ffd0dc' }); box(x, 830, 1070, 120, 60, CAN.cream, { hi: '#ffffff' })
  // a folded quilt + a small shell on the sill
  for (let i = 0; i < 4; i++) box(x, 420, 1114 - i * 14, 160, 10, [CAN.coral, CAN.cream, CAN.sea, CAN.pink][i])
  drawShell(x, 900, 1150, 4)
  void t; void ep
}

export function drawCancerHome(ctx, t, { room = 'bedroom', ep = 'am', dark = 0, hour = 9, alpha = 1 } = {}) {
  const L = cancerRoom(room)
  if (alpha <= 0) return L
  const x = ctx
  x.save(); x.globalAlpha *= alpha
  shell(x, [L.win])
  lightPatch(x, L.win, hour, 1 - dark)
  x.save(); x.translate(0, OY)
  windowFrame(x, ROOMS[room].win, { curtains: room !== 'window', sill: room !== 'kitchen' })
  if (room === 'bedroom') bedroom(x, t, ep)
  else if (room === 'kitchen') kitchen(x, t, ep)
  else if (room === 'desk') desk(x, t, ep)
  else windowSeat(x, t, ep)
  x.restore()
  if (dark > 0) {
    x.save(); x.beginPath(); x.rect(0, 0, 1080, 1920); x.rect(L.win.x + L.win.w, L.win.y, -L.win.w, L.win.h); x.clip('evenodd')
    x.globalAlpha = 0.62 * clamp(dark); x.fillStyle = '#05081a'; x.fillRect(0, 0, 1080, 1920); x.restore()
    // the moon lamp still glows in the dark
    const lamp = room === 'bedroom' ? [670, 1004, 30] : room === 'desk' ? [470, 940, 26] : null
    if (lamp) moonLamp(x, t, lamp[0], lamp[1] + OY, ep, lamp[2])
  }
  x.restore()
  return L
}
void EPS
