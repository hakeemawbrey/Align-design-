// st9geminihome — Gemini's one home for Star Talk season 9, "A Day in the Life" (promo/films/STARTALK10.md), shared by
// its five episodes (st9geminiam · st9geminiwork · st9geminilove · st9geminicrew · st9gemini3am) so the set never changes.
// Pixel cells in startalk.js's style: flat fills, a 1-cell ink outline, one highlight run per prop.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { GEM, drawGeminiHome, geminiRoom } from '../../st9geminihome.js'
//
// drawGeminiHome(ctx, t, { room, ep, dark = 0, hour = 9, alpha = 1 }) → the room's anchors (same as geminiRoom(room))
//   Paints a full-bleed 1080×1920 room. Every window is a HOLE: draw the sky first (drawSky + st9day's daySky), then the
//   home, and the sky shows through the glass. Draw the cast after it.
//     room  'bedroom' | 'kitchen' | 'desk' | 'window'
//     ep    'am' | 'work' | 'love' | 'crew' | '3am': the one tiny change per episode (the corkboard's sticky notes
//           multiply: 3 · 6 · 8 · 11, the 3 AM corkboard has a last note "BE BORING W/ ME?"; the mug that's out moves).
//     dark  0…1: lights off (the 3 AM rooms). The window stays bright; a lamp/phone glow is the caller's.
//     hour  the in-world hour (0–24), for the light patch the window throws on the floor.
// geminiRoom(room) → { floor, win: { x, y, w, h }, spots: { … [x, y] } }: where things stand (pure, no drawing):
//     bedroom: bunkTop, bunkLow (pillow centres), stand (the nightstand top), stage (open floor, a star's centre)
//     kitchen: counter (counter top y at x), mugs, stage, fridge
//     desk:    chair (a star's centre at the desk), laptop (screen centre), board (corkboard centre), stage
//     window:  seat (window-seat star centre), seat2 (a second star), sill
// GEM: the palette ({ wall, wallDk, floor, wood, yellow, mint, lilac, bone, ink }).
//
// The three recurring props: the twin bunk bed (top bunk = the other twin's, pillow with a little mustache),
// the corkboard of side-hustle sticky notes, and the two mugs "ME" / "ALSO ME".
// Nothing touches `document` at module top level; pure f(t).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp } from '../src/lib.js'

export const GEM = {
  wall: '#2b2758', wallDk: '#221f49', wallLt: '#35306a', floor: '#3b2f52', floorLt: '#47395f', wood: '#b9844f', woodDk: '#8a5d36',
  yellow: '#f2cf4a', yellowDk: '#c9a52c', mint: '#7fe0c4', mintDk: '#4fb59a', lilac: '#b9a4f0', pink: '#ff8fb1',
  bone: '#efe6d6', ink: '#1b1236', glass: '#0b0820', steel: '#8d8fb0',
}
const INK = GEM.ink, C = 6                       // one pixel cell
const MONO = "'Space Mono', ui-monospace, monospace"
const EPS = ['am', 'work', 'love', 'crew', '3am']

const R = Math.round
function px(x, xx, y, w, h, col) { x.fillStyle = col; x.fillRect(R(xx), R(y), R(w), R(h)) }
/** an ink-outlined block with a top highlight run */
function box(x, xx, y, w, h, col, { hi = null, ink = INK, lw = C } = {}) {
  px(x, xx - lw, y - lw, w + 2 * lw, h + 2 * lw, ink)
  px(x, xx, y, w, h, col)
  if (hi) px(x, xx, y, w, lw, hi)
}
function label(x, text, cx, cy, size, col, { weight = 700, align = 'center' } = {}) {
  x.font = `${weight} ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, cx, cy)
}

// ── the rooms' static layout (all in 1080×1920 stage px)
const FLOOR = 1250                 // the props' own floor; the whole set is drawn OY px lower
const OY = 150, FL = FLOOR + OY    // the floor on screen
const ROOMS = {
  bedroom: { win: { x: 650, y: 600, w: 300, h: 330 } },
  kitchen: { win: { x: 360, y: 640, w: 330, h: 270 } },
  desk: { win: { x: 730, y: 560, w: 250, h: 340 } },
  window: { win: { x: 130, y: 520, w: 820, h: 640 } },
}
export function geminiRoom(room) {
  const w0 = ROOMS[room].win, win = { ...w0, y: w0.y + OY }
  const spots = {
    bedroom: { bunkTop: [300, 742], bunkLow: [300, 1062], stand: [585, 1010], stage: [760, 1150] },
    kitchen: { counter: 1040, mugs: [250, 1030], stage: [540, 1150], fridge: [900, 900] },
    desk: { chair: [360, 1100], laptop: [420, 900], board: [350, 690], stage: [800, 1150] },
    window: { seat: [380, 1110], seat2: [700, 1110], sill: 1160 },
  }[room]
  for (const k in spots) if (Array.isArray(spots[k])) spots[k] = [spots[k][0], spots[k][1] + OY]; else spots[k] += OY
  return { floor: FL, win, spots }
}

/** wall + floor with the window holes punched out (even-odd), a pixel wallpaper of tiny ♊ diamonds */
function shell(x, t, holes, k) {
  x.save()
  x.beginPath(); x.rect(0, 0, 1080, FL)
  for (const h of holes) x.rect(h.x + h.w, h.y, -h.w, h.h)     // reversed → a hole under nonzero and even-odd alike
  x.clip('evenodd')
  px(x, 0, 0, 1080, FL, GEM.wall)
  // wallpaper: alternating little diamonds (two of everything)
  for (let j = 0; j < 22; j++) for (let i = 0; i < 12; i++) {
    const cx = 45 + i * 90 + (j % 2) * 45, cy = 30 + j * 56
    px(x, cx - 3, cy - 3, 6, 6, (i + j) % 2 ? GEM.wallLt : GEM.wallDk)
  }
  // a picture rail
  px(x, 0, 470 + OY, 1080, 6, GEM.wallDk); px(x, 0, 476 + OY, 1080, 4, GEM.wallLt)
  x.restore()
  // the floor: wide boards, a skirting
  px(x, 0, FL, 1080, 1920 - FL, GEM.floor)
  for (let j = 0; j < 12; j++) {
    const y = FL + 18 + j * 56
    px(x, 0, y, 1080, 4, INK)
    for (let i = 0; i < 6; i++) px(x, ((i * 230 + j * 110) % 1180) - 50, y + 4, 4, 52, INK)
  }
  px(x, 0, FL - 6, 1080, 18, INK); px(x, 0, FL - 2, 1080, 8, GEM.wallLt)
  void t; void k
}

/** a window frame around a hole: frame, mullion cross, sill, two curtains */
function windowFrame(x, w, { curtains = true, sill = true } = {}) {
  const F = 14
  x.fillStyle = INK
  x.fillRect(w.x - F - C, w.y - F - C, w.w + 2 * (F + C), F + C); x.fillRect(w.x - F - C, w.y + w.h, w.w + 2 * (F + C), F + C)
  x.fillRect(w.x - F - C, w.y - F, F + C, w.h + 2 * F); x.fillRect(w.x + w.w, w.y - F, F + C, w.h + 2 * F)
  px(x, w.x - F, w.y - F, w.w + 2 * F, F, GEM.bone); px(x, w.x - F, w.y + w.h, w.w + 2 * F, F, GEM.bone)
  px(x, w.x - F, w.y, F, w.h, GEM.bone); px(x, w.x + w.w, w.y, F, w.h, GEM.bone)
  // mullions
  px(x, w.x + w.w / 2 - 6, w.y, 12, w.h, INK); px(x, w.x + w.w / 2 - 3, w.y, 6, w.h, GEM.bone)
  px(x, w.x, w.y + w.h * 0.45 - 6, w.w, 12, INK); px(x, w.x, w.y + w.h * 0.45 - 3, w.w, 6, GEM.bone)
  // glass glint
  x.save(); x.globalAlpha = 0.18; x.fillStyle = '#ffffff'
  x.beginPath(); x.moveTo(w.x + 20, w.y + w.h * 0.45 - 10); x.lineTo(w.x + 60, w.y + 6); x.lineTo(w.x + 84, w.y + 6); x.lineTo(w.x + 44, w.y + w.h * 0.45 - 10); x.fill()
  x.restore()
  if (sill) box(x, w.x - F - 18, w.y + w.h + F, w.w + 2 * F + 36, 16, GEM.bone, { hi: '#ffffff' })
  if (curtains) for (const s of [-1, 1]) {
    const cx = s < 0 ? w.x - F - 40 : w.x + w.w + F + 4, cw = 36
    box(x, cx, w.y - F - 30, cw, w.h + 2 * F + 60, GEM.mint, { hi: '#b8f3e2' })
    for (let k = 1; k < 3; k++) px(x, cx + k * 12, w.y - F - 30, 3, w.h + 2 * F + 60, GEM.mintDk)
  }
  px(x, w.x - F - 60, w.y - F - 38, w.w + 2 * F + 120, 8, INK)          // the rod
}

/** the light the window throws on the floor, by hour */
function lightPatch(x, w, hour, k) {
  const day = clamp(1 - Math.abs(hour - 13) / 7)
  if (day <= 0 || k <= 0) return
  const col = hour < 9 ? '255,196,150' : hour > 17 ? '220,160,255' : '255,250,230'
  x.save(); x.globalAlpha = 0.16 * day * k; x.fillStyle = `rgb(${col})`
  const sk = hour < 13 ? 1 : -1
  x.beginPath()
  x.moveTo(w.x, FL + 20); x.lineTo(w.x + w.w, FL + 20)
  x.lineTo(w.x + w.w + sk * 180, FL + 380); x.lineTo(w.x + sk * 180, FL + 380); x.fill()
  x.restore()
}

// ── the props
const NOTES = ['DOG WALKS', 'ETSY', 'PODCAST', 'DJ SETS', 'TUTOR', 'NEWSLETTER', 'NAIL ART', 'RESELL', 'TRIVIA HOST', 'APP IDEA', 'VOICEOVER']
const NOTE_COL = [GEM.yellow, GEM.mint, GEM.pink, GEM.lilac, '#ffd98a', '#9fe0ff']
const NOTE_N = { am: 3, work: 6, love: 8, crew: 11, '3am': 11 }

function corkboard(x, t, cx, cy, ep) {
  const w = 440, h = 300
  box(x, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28, GEM.wood, { hi: '#d8a56c' })
  px(x, cx - w / 2, cy - h / 2, w, h, '#a8784a')
  for (let i = 0; i < 40; i++) px(x, cx - w / 2 + ((i * 97) % (w - 8)), cy - h / 2 + ((i * 61) % (h - 8)), 6, 6, '#93653b')
  const n = NOTE_N[ep] ?? 3
  for (let i = 0; i < n; i++) {
    const col = i % 4, row = Math.floor(i / 4)
    const nx = cx - w / 2 + 18 + col * 104 + (row % 2) * 16, ny = cy - h / 2 + 16 + row * 92
    x.save(); x.translate(nx + 46, ny + 34); x.rotate(((i * 37) % 7 - 3) * 0.02)
    box(x, -46, -34, 92, 68, NOTE_COL[i % NOTE_COL.length], { lw: 3 })
    px(x, -6, -40, 12, 12, '#ff3d6e')                                                     // the pin
    label(x, NOTES[i].split(' ')[0], 0, -6, 15, INK)
    if (NOTES[i].includes(' ')) label(x, NOTES[i].split(' ')[1], 0, 14, 15, INK)
    x.restore()
  }
  if (ep === '3am') {                                                                       // the last note, the soft one
    x.save(); x.translate(cx + w / 2 - 60, cy + h / 2 - 34); x.rotate(-0.06)
    box(x, -70, -30, 140, 60, GEM.bone, { lw: 3 }); px(x, -6, -36, 12, 12, '#ff3d6e')
    label(x, 'BE BORING', 0, -8, 15, INK); label(x, 'W/ ME?', 0, 12, 15, INK)
    x.restore()
  }
}

function mugs(x, cx, cy, ep) {
  // two identical yellow mugs, ME and ALSO ME; the one that's "out" (steaming) changes per episode
  const out = { am: 0, work: 1, love: 0, crew: 1, '3am': -1 }[ep] ?? 0
  ;['ME', 'ALSO ME'].forEach((s, i) => {
    const mx = cx + i * 120 - 60, my = cy
    box(x, mx - 40, my - 70, 80, 70, GEM.yellow, { hi: '#fff1a8' })
    px(x, mx + 40 + C, my - 54, 14, 6, INK); px(x, mx + 54, my - 54, 6, 34, INK); px(x, mx + 40 + C, my - 26, 14, 6, INK)
    label(x, s, mx, my - 30, s.length > 3 ? 13 : 18, INK)
    if (i === out) for (let k = 0; k < 3; k++) px(x, mx - 18 + k * 16, my - 100 - (k % 2) * 10, 6, 18, 'rgba(239,230,214,0.55)')
  })
}

function bunkBed(x, t, ep) {
  const x0 = 70, x1 = 540
  // posts + ladder
  for (const xx of [x0, x1 - 24]) box(x, xx, 600, 24, FLOOR - 600, GEM.wood, { hi: '#d8a56c' })
  for (const y of [800, 1120]) {                                                           // the two bunks
    box(x, x0 + 24, y, x1 - x0 - 48, 30, GEM.wood, { hi: '#d8a56c' })
    box(x, x0 + 30, y - 40, x1 - x0 - 60, 34, y < 1000 ? GEM.lilac : GEM.mint, { hi: y < 1000 ? '#ddd0ff' : '#b8f3e2' })   // blankets
  }
  // pillows: the top one wears a tiny mustache (the other twin's bunk)
  box(x, x0 + 40, 742, 110, 44, GEM.bone, { hi: '#ffffff' })
  px(x, x0 + 72, 770, 18, 6, INK); px(x, x0 + 98, 770, 18, 6, INK); px(x, x0 + 66, 764, 6, 6, INK); px(x, x0 + 116, 764, 6, 6, INK)
  box(x, x0 + 40, 1062, 110, 44, GEM.bone, { hi: '#ffffff' })
  // ladder rungs on the right
  for (let k = 0; k < 5; k++) px(x, x1 - 76, 860 + k * 52, 52, 8, GEM.woodDk)
  px(x, x1 - 82, 820, 8, 300, GEM.woodDk)
  // name plates: "ME" / "ALSO ME"
  box(x, x0 + 190, 812, 110, 14, GEM.yellow, { lw: 3 }); label(x, 'ALSO ME', x0 + 245, 820, 12, INK)
  box(x, x0 + 190, 1132, 110, 14, GEM.yellow, { lw: 3 }); label(x, 'ME', x0 + 245, 1140, 12, INK)
  void t; void ep
}

function nightstand(x, t, ep) {
  box(x, 560, 1020, 130, FLOOR - 1020, GEM.woodDk, { hi: GEM.wood })
  px(x, 610, 1090, 30, 8, INK)
  // a lamp: a little two-tone shade
  box(x, 606, 940, 14, 80, GEM.steel)
  box(x, 570, 900, 88, 48, ep === '3am' ? '#5a4c8a' : GEM.yellow, { hi: '#fff1a8' })
  void t
}

function kitchen(x, t, ep) {
  // upper cabinets, the counter + drawers, a fridge with magnets, the two mugs
  for (let i = 0; i < 3; i++) box(x, 60 + i * 96, 560, 84, 150, GEM.mint, { hi: '#b8f3e2' })
  for (let i = 0; i < 3; i++) px(x, 132 + i * 96, 630, 6, 20, INK)
  box(x, 30, 1040, 760, 26, GEM.bone, { hi: '#ffffff' })                                    // the counter top
  box(x, 40, 1072, 740, FLOOR - 1078, GEM.mintDk)
  for (let i = 0; i < 4; i++) { px(x, 50 + i * 184, 1080, 6, FLOOR - 1090, INK); px(x, 120 + i * 184, 1110, 40, 8, INK) }
  // the sink under the window
  px(x, 430, 1034, 190, 10, INK); box(x, 500, 990, 10, 44, GEM.steel); px(x, 500, 990, 50, 10, GEM.steel)
  // the fridge
  box(x, 810, 600, 220, FLOOR - 606, '#e9e4f2', { hi: '#ffffff' })
  px(x, 810, 860, 220, 6, INK); px(x, 830, 760, 8, 70, INK); px(x, 830, 900, 8, 90, INK)
  const mag = [[870, 650, GEM.pink], [960, 700, GEM.yellow], [900, 940, GEM.lilac], [980, 1010, GEM.mint]]
  for (const [mx, my, c] of mag) box(x, mx, my, 26, 26, c, { lw: 3 })
  // a fridge note: the grocery list, with two of everything
  box(x, 880, 1040, 110, 120, GEM.bone, { lw: 3 })
  label(x, '2x MILK', 935, 1066, 13, INK); label(x, '2x EGGS', 935, 1092, 13, INK); label(x, '2x OAT', 935, 1118, 13, INK)
  mugs(x, 250, 1040, ep)
  void t
}

function desk(x, t, ep) {
  corkboard(x, t, 350, 690, ep)
  // the desk + the laptop
  box(x, 90, 1000, 640, 26, GEM.wood, { hi: '#d8a56c' })
  for (const xx of [110, 690]) box(x, xx, 1030, 20, FLOOR - 1036, GEM.woodDk)
  box(x, 300, 880, 240, 120, '#2a2a40', { hi: '#3a3a58' })                                // the screen
  px(x, 312, 892, 216, 96, '#141428')
  box(x, 270, 1000, 300, 10, GEM.steel)
  // a tiny tab strip on the screen (always too many)
  for (let i = 0; i < 9; i++) px(x, 316 + i * 23, 896, 20, 10, i === 2 ? GEM.yellow : '#3d3d66')
  // one of the mugs, here today
  box(x, 610, 940, 60, 54, GEM.yellow, { hi: '#fff1a8' }); label(x, ep === 'work' ? 'ME' : 'ALSO', 640, 970, 12, INK)
  void t
}

function windowSeat(x, t, ep) {
  // a long cushioned window seat with two cushions (one each)
  box(x, 90, 1170, 900, FLOOR - 1176, GEM.woodDk, { hi: GEM.wood })
  box(x, 110, 1130, 860, 36, GEM.lilac, { hi: '#ddd0ff' })
  box(x, 160, 1070, 120, 60, GEM.yellow, { hi: '#fff1a8' }); box(x, 800, 1070, 120, 60, GEM.mint, { hi: '#b8f3e2' })
  // a little plant on the sill, two leaves more each episode
  const n = 2 + 2 * Math.max(0, EPS.indexOf(ep))
  box(x, 506, 1190, 68, 50, '#c86a4a', { hi: '#e08a64' })
  for (let i = 0; i < n; i++) { const a = -1.2 + (i / Math.max(1, n - 1)) * 2.4; px(x, 534 + Math.sin(a) * (20 + i * 4), 1170 - Math.cos(a) * (14 + i * 5), 14, 10, '#6fdc6a') }
  void t
}

export function drawGeminiHome(ctx, t, { room = 'bedroom', ep = 'am', dark = 0, hour = 9, alpha = 1 } = {}) {
  const L = geminiRoom(room)
  if (alpha <= 0) return L
  const x = ctx
  x.save(); x.globalAlpha *= alpha
  shell(x, t, [L.win], 1)
  lightPatch(x, L.win, hour, 1 - dark)
  x.save(); x.translate(0, OY)
  windowFrame(x, ROOMS[room].win, { curtains: room !== 'window', sill: room !== 'kitchen' })
  if (room === 'bedroom') { bunkBed(x, t, ep); nightstand(x, t, ep) }
  else if (room === 'kitchen') kitchen(x, t, ep)
  else if (room === 'desk') desk(x, t, ep)
  else windowSeat(x, t, ep)
  x.restore()
  if (dark > 0) {                                                                            // lights off: the room goes indigo, the glass doesn't
    x.save(); x.beginPath(); x.rect(0, 0, 1080, 1920); x.rect(L.win.x + L.win.w, L.win.y, -L.win.w, L.win.h); x.clip('evenodd')
    x.globalAlpha = 0.62 * clamp(dark); x.fillStyle = '#07051a'; x.fillRect(0, 0, 1080, 1920); x.restore()
  }
  x.restore()
  return L
}
