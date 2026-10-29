// st9leohome — Leo's home for Star Talk season 9, "A Day in the Life" (promo/films/STARTALK10.md), S9 E21–E25.
// Drawn once here and reused by st9leoam, st9leowork, st9leolove, st9leocrew and st9leo3am (set continuity).
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { LEOHOME, drawLeoHome, leoSpots, drawLeoStar, drawCrown, drawSunflower, drawRingLight } from '../../st9leohome.js'
//
// drawLeoHome(ctx, t, { room, ep, dark = 0, sky = null, light = 1, ring = 1, zoom = null })
//   paints one full-frame (1080×1920) room of Leo's flat, opaque, pixel style (6 px cells).
//   room  'bedroom' | 'kitchen' | 'desk' | 'window'
//   ep    'am' | 'work' | 'love' | 'crew' | '3am'   the binge detail: the sunflower on the sill grows from a bud (am) to
//         full bloom (crew) and bows to the window at 3am, and the polaroid wall swaps selfies for friends, one per
//         episode (am: three selfies · work: + the team · love: + Aquarius · crew: + Sagittarius at the mic).
//   sky   (ctx, rect) => void   paints the view inside the window (clip already set to rect = { x, y, w, h }); pass a
//         function that calls drawSky + st9day's daySky. null = a plain night gradient.
//   dark  0…1   lights out (the 3 AM room): an indigo wash over everything but the window, a moonbeam on the floor.
//   light 0…1   the sunbeam from the window (morning); 0 = none.   ring 0…1 the ring light's glow (desk/bedroom).
//   zoom  { x, y, s } an optional camera punch-in applied to the room (the episode can also do its own).
// leoSpots(room) → { floor, win: {x,y,w,h}, stand: [x, y] (where Leo stands), mirror?, ring?, table?, hide: [{ x, y, from }] }
//   hide = drawGhostCameo spots in that room (the ghost leans out from behind the furniture).
// drawLeoStar(ctx, x, y, size, t, opts)   drawStarChar in Leo's colour with the ♌ badge and the pixel crown seated on the
//   upper tip (opts.crown = true; false for the 3 AM no-crown). All drawStarChar opts pass through. Returns its result.
// drawCrown(ctx, cx, cy, cell, { rot })   the season-3 crown on its own (e.g. on its stand at 3 AM).
// drawSunflower(ctx, x, baseY, cell, t, { grow = 1, droop = 0, sway = 1 })   the pot + stem + flower head.
// drawRingLight(ctx, cx, cy, r, t, { on = 1, stand = 520 })   the tripod ring light.
// LEOHOME = { wall, trim, floor, gold, red, ink, ... } the palette.
//
// Pure f(t). Nothing touches `document` at module top level.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, ease } from '../src/lib.js'
import { drawStarChar, signStar } from './startalk.js'

export const LEOHOME = {
  wall: '#43192c', wall2: '#4d1f33', trim: '#d9a441', trimDk: '#9c6a22', floor: '#6a3a22', floor2: '#5a301b', floorHi: '#7d4a2c',
  gold: '#f2c75c', goldLt: '#ffe39a', red: '#c8363f', redDk: '#8c2232', cream: '#f4e6c8', ink: '#1b1236', glass: '#1e1640',
  lion: signStar('leo').color, bone: '#efe6d6', wood: '#8a5330', woodDk: '#5c3420', steel: '#2b2440', steelLt: '#4a4166',
}
const H = LEOHOME
const CELL = 6
const W = 1080, HH = 1920
const FLOOR = 1380

// ── tiny pixel helpers
const R = (x, px, py, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(px), Math.round(py), Math.round(w), Math.round(h)) }
function box(x, px, py, w, h, c, { edge = H.ink, hi = null, lo = null, e = CELL } = {}) {
  R(x, px - e, py - e, w + 2 * e, h + 2 * e, edge); R(x, px, py, w, h, c)
  if (hi) R(x, px, py, w, e, hi)
  if (lo) R(x, px, py + h - e, w, e, lo)
}
const bitsAt = (x, rows, cols, px, py, c) => { rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const ch = row[i]; if (ch !== '.') R(x, px + i * c, py + j * c, c + 0.5, c + 0.5, cols[ch]) } }) }

// ── the crown (season 3's), and Leo
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
export function drawCrown(x, cx, cy, cell, { rot = 0, alpha = 1 } = {}) {
  const w = CROWN[0].length, h = CROWN.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && CROWN[j][i] !== '.'
  x.fillStyle = H.ink
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = CROWN[j][i]; if (ch !== '.') { x.fillStyle = CROWN_C[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) } }
  x.restore()
}
const LEO = signStar('leo')
export function drawLeoStar(x, px, py, size, t, opts = {}) {
  const { crown = true, crownRot = 0, ...rest } = opts
  const r = drawStarChar(x, px, py, size, t, { color: LEO.color, glyph: size >= 120 ? LEO.glyph : null, ...rest })
  if (crown && (rest.pop ?? 1) > 0.05 && (rest.alpha ?? 1) > 0) {
    const cell = Math.max(3, Math.round(size * (rest.pop ?? 1) / 30))
    drawCrown(x, Math.round(r.x), Math.round(r.top + cell * 0.8), cell, { rot: -0.12 + 0.04 * Math.sin(t * 3) + crownRot, alpha: rest.alpha ?? 1 })
  }
  return r
}

// ── props
export function drawSunflower(x, px, baseY, c, t, { grow = 1, droop = 0, sway = 1 } = {}) {
  // pot
  bitsAt(x, ['.kkkkkkk.', 'kTTTTTTTk', '.kPPPPPk.', '.kPpPPPk.', '.kPPPPPk.', '..kkkkk..'], { k: H.ink, T: '#c9673c', P: '#b4532f', p: '#e08a5a' }, px - 4.5 * c, baseY - 6 * c, c)
  const g = clamp(grow), stemH = Math.round(lerp(4, 17, g)), sw = Math.round(Math.sin(t * 1.3) * sway * 0.6 + droop * 2)
  for (let j = 0; j < stemH; j++) { const off = Math.round(sw * (j / stemH) * (j / stemH)); R(x, px - c / 2 + off * c, baseY - 6 * c - (j + 1) * c, c, c, '#3f8a3a') }
  if (g > 0.3) { R(x, px + c / 2, baseY - 6 * c - Math.round(stemH * 0.45) * c, 2 * c, c, '#5aa84a'); R(x, px - 2.5 * c, baseY - 6 * c - Math.round(stemH * 0.65) * c, 2 * c, c, '#5aa84a') }
  const hx = px + Math.round(sw) * c, hy = baseY - 6 * c - stemH * c - c
  if (g < 0.45) {        // the bud
    bitsAt(x, ['.kk.', 'kGGk', 'kGYk', '.kk.'], { k: H.ink, G: '#5aa84a', Y: '#f7c948' }, hx - 1.5 * c, hy - 2 * c, c)
    return { x: hx, y: hy }
  }
  const open = clamp((g - 0.45) / 0.5)
  x.save(); x.translate(hx, hy); x.rotate(droop * 0.9 + Math.sin(t * 1.3) * 0.04 * sway)
  const rP = Math.round(lerp(2, 5, open)), rD = Math.round(lerp(1, 2.5, open))
  for (let a = 0; a < 12; a++) {
    const an = a / 12 * Math.PI * 2
    const ex = Math.cos(an) * rP * c, ey = Math.sin(an) * rP * c
    R(x, ex - c, ey - c, 2 * c, 2 * c, a % 2 ? '#f7c948' : '#f2b52c')
  }
  R(x, -(rD + 1) * c, -(rD + 1) * c, (2 * rD + 2) * c, (2 * rD + 2) * c, H.ink)
  R(x, -rD * c, -rD * c, 2 * rD * c, 2 * rD * c, '#6b3a1c')
  if (open > 0.6) { R(x, -c, -c, c, c, '#3b200f'); R(x, c * 0.3, c * 0.2, c, c, '#3b200f') }
  x.restore()
  return { x: hx, y: hy }
}
export function drawRingLight(x, cx, cy, r, t, { on = 1, stand = 520 } = {}) {
  // tripod
  R(x, cx - 4, cy + r, 8, stand, H.ink); R(x, cx - 2, cy + r, 4, stand, H.steelLt)
  const fy = cy + r + stand
  x.save(); x.strokeStyle = H.ink; x.lineWidth = 8
  x.beginPath(); x.moveTo(cx, fy - 40); x.lineTo(cx - 70, fy); x.moveTo(cx, fy - 40); x.lineTo(cx + 70, fy); x.moveTo(cx, fy - 40); x.lineTo(cx, fy + 6); x.stroke()
  x.restore()
  // the ring: drawn as pixel blocks round a circle
  const glow = clamp(on)
  if (glow > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 3.2)
    g.addColorStop(0, `rgba(255,236,200,${0.35 * glow})`); g.addColorStop(1, 'rgba(255,236,200,0)')
    x.fillStyle = g; x.fillRect(cx - r * 3.4, cy - r * 3.4, r * 6.8, r * 6.8); x.restore()
  }
  const n = Math.round(r * 0.55)
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2, bx = cx + Math.cos(a) * r, by = cy + Math.sin(a) * r
    R(x, bx - 9, by - 9, 18, 18, H.ink)
  }
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2, bx = cx + Math.cos(a) * r, by = cy + Math.sin(a) * r
    R(x, bx - 6, by - 6, 12, 12, glow > 0.05 ? (i % 3 ? '#fff6e0' : '#ffe3a8') : '#4a4166')
  }
  R(x, cx - 12, cy - 12, 24, 24, H.ink); R(x, cx - 8, cy - 8, 16, 16, H.steelLt)    // the phone clamp
}

// a polaroid; who = 'leo' (a selfie), 'team', or a sign id (a friend), drawn as a little star in their colour
function polaroid(x, px, py, who, rot = 0) {
  x.save(); x.translate(px, py); x.rotate(rot)
  R(x, -27, -33, 54, 66, H.ink); R(x, -24, -30, 48, 60, H.cream)
  const col = who === 'team' ? '#7aa6ec' : signStar(who === 'leo' ? 'leo' : who).color
  R(x, -18, -24, 36, 36, who === 'team' ? '#2a3a6a' : '#3a2050')
  if (who === 'team') { for (let i = 0; i < 4; i++) R(x, -15 + i * 8, -6 - (i % 2) * 4, 6, 6, ['#f39a3a', '#ef5c94', '#38c4ec', '#2fc79a'][i]) }
  else {
    R(x, -6, -18, 12, 24, col); R(x, -12, -12, 24, 12, col); R(x, -3, -9, 2, 4, H.ink); R(x, 2, -9, 2, 4, H.ink)
    if (who === 'leo') { R(x, -9, -24, 18, 4, '#f7c948'); R(x, -9, -27, 3, 3, '#f7c948'); R(x, 6, -27, 3, 3, '#f7c948') }   // the crown
  }
  x.restore()
}
const WALL_PHOTOS = {
  am: ['leo', 'leo', 'leo'],
  work: ['leo', 'leo', 'team'],
  love: ['leo', 'aquarius', 'team'],
  crew: ['sagittarius', 'aquarius', 'team'],
  '3am': ['sagittarius', 'aquarius', 'team'],
}
const FLOWER = { am: { grow: 0.3 }, work: { grow: 0.6 }, love: { grow: 0.85 }, crew: { grow: 1 }, '3am': { grow: 1, droop: 0.7 } }

// ── rooms
function wall(x) {
  R(x, 0, 0, W, FLOOR, H.wall)
  for (let i = 0; i < W; i += 96) R(x, i + 42, 0, 12, FLOOR, H.wall2)              // the wallpaper stripe
  for (let i = 0; i < W; i += 96) for (let j = 60; j < FLOOR - 200; j += 132) R(x, i, j, 6, 6, '#5a2a3d')  // tiny gold-ish dots
  R(x, 0, 980, W, 12, H.trimDk); R(x, 0, 980, W, 6, H.trim)                       // chair rail
  R(x, 0, 992, W, FLOOR - 992, '#3a1526')                                          // the darker wainscot
  for (let i = 30; i < W; i += 150) { R(x, i, 1030, 108, 300, '#341222'); R(x, i + 6, 1036, 96, 288, '#3a1526') }
  R(x, 0, FLOOR - 24, W, 24, H.ink); R(x, 0, FLOOR - 20, W, 14, H.trimDk)         // baseboard
}
function floor(x) {
  R(x, 0, FLOOR, W, HH - FLOOR, H.floor)
  for (let j = FLOOR + 36, row = 0; j < HH; j += 36 + row * 6, row++) {
    R(x, 0, j, W, 6, H.floor2)
    const off = (row * 173) % 260
    for (let i = off; i < W; i += 260) R(x, i, j - 36 - row * 6 + 6, 6, 36 + row * 6, H.floor2)
  }
  R(x, 0, FLOOR, W, 6, H.floorHi)
}
function rug(x, cx, cy, w, h) {
  R(x, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12, H.ink)
  R(x, cx - w / 2, cy - h / 2, w, h, H.red)
  R(x, cx - w / 2 + 18, cy - h / 2 + 12, w - 36, h - 24, H.redDk)
  R(x, cx - w / 2 + 30, cy - h / 2 + 20, w - 60, h - 40, H.red)
  for (let i = cx - w / 2 + 48; i < cx + w / 2 - 48; i += 36) R(x, i, cy - 6, 18, 12, H.gold)
}
function windowFrame(x, t, rect, sky, { curtains = true } = {}) {
  const { x: wx, y: wy, w, h } = rect
  R(x, wx - 24, wy - 24, w + 48, h + 48, H.ink); R(x, wx - 18, wy - 18, w + 36, h + 36, H.cream)
  x.save(); x.beginPath(); x.rect(wx, wy, w, h); x.clip()
  if (sky) sky(x, rect)
  else { const g = x.createLinearGradient(0, wy, 0, wy + h); g.addColorStop(0, '#120c2e'); g.addColorStop(1, '#2a1a4a'); x.fillStyle = g; x.fillRect(wx, wy, w, h) }
  // the city through the glass (generic skyline, a few lit windows)
  const base = wy + h
  const towers = [[0, 0.32, 0.18], [0.14, 0.5, 0.12], [0.27, 0.38, 0.16], [0.45, 0.62, 0.1], [0.56, 0.3, 0.2], [0.78, 0.46, 0.13], [0.9, 0.28, 0.14]]
  for (const [fx, fh, fw] of towers) {
    const tx = wx + fx * w, th = fh * h * 0.75, tw = fw * w
    R(x, tx, base - th, tw, th, '#140d2c')
    for (let j = base - th + 14; j < base - 10; j += 22) for (let i = tx + 8; i < tx + tw - 8; i += 18) if (((i * 7 + j * 13) | 0) % 5 === 0) R(x, i, j, 6, 8, '#ffd98a')
  }
  x.restore()
  R(x, wx + w / 2 - 6, wy, 12, h, H.cream); R(x, wx, wy + h * 0.45, w, 12, H.cream)   // the muntins
  R(x, wx - 36, wy + h + 18, w + 72, 24, H.ink); R(x, wx - 30, wy + h + 18, w + 60, 16, H.cream)   // the sill
  if (curtains) {
    for (const side of [-1, 1]) {
      const cx0 = side < 0 ? wx - 96 : wx + w + 6
      R(x, cx0 - 6, wy - 60, 96, h + 120, H.ink)
      R(x, cx0, wy - 54, 84, h + 108, H.red)
      for (let i = 0; i < 84; i += 24) R(x, cx0 + i + 8, wy - 54, 8, h + 108, H.redDk)
      R(x, cx0, wy + h * 0.5, 84, 14, H.gold)                                      // the tie-back
    }
    R(x, wx - 120, wy - 72, w + 240, 18, H.ink); R(x, wx - 114, wy - 69, w + 228, 12, H.trim)   // the rod
  }
}
function polaroidWall(x, ep, px, py) {
  const ph = WALL_PHOTOS[ep] || WALL_PHOTOS.am
  // a little string of fairy lights the photos hang from
  x.save(); x.strokeStyle = H.ink; x.lineWidth = 4; x.beginPath(); x.moveTo(px - 30, py - 46)
  x.quadraticCurveTo(px + 100, py - 10, px + 230, py - 46); x.stroke(); x.restore()
  ph.forEach((who, i) => polaroid(x, px + i * 100, py, who, (i - 1) * 0.12))
  for (let i = 0; i < 6; i++) R(x, px - 20 + i * 44, py - 42 + Math.abs(i - 2.5) * -4 + 8, 6, 6, i % 2 ? H.goldLt : '#ff8fb1')
}

function bedroom(x, t, o) {
  const win = SPOTS.bedroom.win
  windowFrame(x, t, win, o.sky)
  polaroidWall(x, o.ep, 112, 760)
  // the bed: gold headboard with a mane of scallops, red duvet
  const bx = 40, by = 1120
  R(x, bx - 6, by - 210, 456, 240, H.ink); R(x, bx, by - 204, 444, 228, H.trim)
  for (let i = 0; i < 444; i += 48) { R(x, bx + i + 6, by - 228, 36, 30, H.ink); R(x, bx + i + 12, by - 222, 24, 24, H.trim) }   // the mane
  R(x, bx + 24, by - 180, 396, 180, H.trimDk)
  box(x, bx, by, 444, 140, H.cream, { hi: '#fff6e0' })
  box(x, bx + 30, by - 50, 150, 64, H.cream, { hi: '#fff6e0' })                         // pillow
  box(x, bx + 200, by + 20, 244, 120, H.red, { hi: '#e0525a', lo: H.redDk })            // duvet
  for (let i = bx + 220; i < bx + 430; i += 42) R(x, i, by + 70, 18, 12, H.gold)
  R(x, bx, by + 146, 18, 90, H.ink); R(x, bx + 426, by + 146, 18, 90, H.ink)           // legs
  // the vanity + bulb mirror on the right
  const m = SPOTS.bedroom.mirror
  box(x, m.x - 150, m.y + 190, 300, 30, H.wood, { hi: '#a3683e' })                       // table top
  R(x, m.x - 140, m.y + 226, 18, 160, H.ink); R(x, m.x + 122, m.y + 226, 18, 160, H.ink)
  box(x, m.x - 120, m.y - 150, 240, 330, '#2d2650', { hi: '#3d3466' })                   // the mirror
  x.save(); x.globalAlpha = 0.25; R(x, m.x - 90, m.y - 120, 24, 120, '#fff'); R(x, m.x - 60, m.y - 130, 12, 70, '#fff'); x.restore()
  for (let i = 0; i < 5; i++) for (const s of [-1, 1]) { const by2 = m.y - 130 + i * 72; R(x, m.x + s * 138 - 12, by2 - 12, 24, 24, H.ink); R(x, m.x + s * 138 - 8, by2 - 8, 16, 16, o.dark > 0.5 ? '#5a4a3a' : '#fff1c8') }
  // the crown stand on the vanity (empty while Leo wears it; drawn by the episode when it is off)
  R(x, m.x + 80, m.y + 150, 36, 40, H.ink); R(x, m.x + 86, m.y + 156, 24, 34, H.trim)
}
function kitchen(x, t, o) {
  const win = SPOTS.kitchen.win
  // upper cabinets
  for (const cx of [60, 760]) { box(x, cx, 360, 260, 260, H.wood, { hi: '#a3683e', lo: H.woodDk }); R(x, cx + 126, 380, 8, 220, H.ink); R(x, cx + 100, 480, 6, 30, H.gold); R(x, cx + 150, 480, 6, 30, H.gold) }
  windowFrame(x, t, win, o.sky, { curtains: false })
  // tile backsplash
  for (let j = 900; j < 1120; j += 36) for (let i = 0; i < W; i += 54) R(x, i + ((j / 36) % 2) * 27, j, 48, 30, '#5a2238')
  // counter + lower cabinets
  box(x, 0, 1110, W, 40, '#e9dcc0', { hi: '#fff6e0' })
  R(x, 0, 1156, W, FLOOR - 1156, H.wood)
  for (let i = 30; i < W; i += 210) { box(x, i, 1180, 180, 170, H.wood, { hi: '#a3683e', lo: H.woodDk, e: 4 }); R(x, i + 80, 1200, 20, 6, H.gold) }
  // the fridge, right, with a "#1" magnet
  box(x, 860, 640, 200, 470, '#d8d0e0', { hi: '#f0eaf6' }); R(x, 860, 860, 200, 8, H.ink); R(x, 880, 700, 8, 120, H.ink); R(x, 880, 900, 8, 160, H.ink)
  box(x, 960, 736, 54, 54, H.gold, { e: 4 }); bitsAt(x, ['..y..', '.yYy.', 'yYYYy', '.yYy.', '..y..'], { y: '#c98a1f', Y: '#fff1c8' }, 972, 748, 6)   // a sun magnet
  // the "LEO" mug and the toaster on the counter
  box(x, 120, 1050, 54, 60, H.cream, { e: 4 }); R(x, 174, 1064, 14, 30, H.ink); R(x, 128, 1070, 38, 16, H.lion)
  box(x, 220, 1040, 110, 70, '#c0b6cc', { hi: '#e2dbea', e: 4 }); R(x, 240, 1046, 24, 8, H.ink); R(x, 280, 1046, 24, 8, H.ink)
}
function desk(x, t, o) {
  const win = SPOTS.desk.win
  windowFrame(x, t, win, o.sky)
  // the framed poster: "LEO · LIVE" (the binge detail lives on the polaroids beside it)
  box(x, 90, 380, 300, 400, H.ink, { edge: H.trim, e: 12 })
  R(x, 110, 400, 260, 360, '#2a1240')
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(240, 520, 0, 240, 520, 160); g.addColorStop(0, 'rgba(243,154,58,0.6)'); g.addColorStop(1, 'rgba(243,154,58,0)')
  x.fillStyle = g; x.fillRect(110, 400, 260, 360); x.restore()
  R(x, 216, 470, 48, 96, H.lion); R(x, 192, 494, 96, 48, H.lion); R(x, 222, 456, 36, 12, '#f7c948')
  x.font = "700 34px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillStyle = H.goldLt; x.fillText('LEO', 240, 660); x.fillStyle = H.gold; x.font = "700 24px 'Space Mono', monospace"; x.fillText('★ LIVE ★', 240, 700)
  polaroidWall(x, o.ep, 140, 880)
  // the desk
  box(x, 60, 1150, 960, 40, H.wood, { hi: '#a3683e' })
  R(x, 80, 1196, 24, 180, H.ink); R(x, 976, 1196, 24, 180, H.ink)
  box(x, 700, 1196, 260, 150, H.woodDk, { e: 4 }); R(x, 810, 1260, 40, 8, H.gold)
  // laptop (open, facing Leo, so we see its back with a sun sticker)
  box(x, 380, 1000, 300, 150, '#2b2440', { hi: '#3d3466' }); R(x, 360, 1144, 340, 12, H.ink)
  bitsAt(x, ['..y..', '.yYy.', 'yYYYy', '.yYy.', '..y..'], { y: '#f2b52c', Y: '#f7c948' }, 512, 1050, 7)
}
function windowRoom(x, t, o) {
  const win = SPOTS.window.win
  windowFrame(x, t, win, o.sky)
  // the reading nook: a cushion bench under the window
  box(x, 150, 1240, 780, 110, H.red, { hi: '#e0525a', lo: H.redDk })
  for (let i = 190; i < 900; i += 120) box(x, i, 1196, 90, 50, H.cream, { hi: '#fff6e0', e: 4 })
  void polaroidWall
}

export const SPOTS = {
  bedroom: { floor: FLOOR, win: { x: 400, y: 470, w: 280, h: 330 }, stand: [560, 1320], mirror: { x: 880, y: 1000 }, hide: [{ x: 1000, y: 870, from: 'right', where: 'behind the bulb mirror, right' }, { x: 40, y: 1140, from: 'left', where: 'behind the headboard, left' }] },
  kitchen: { floor: FLOOR, win: { x: 400, y: 380, w: 280, h: 360 }, stand: [520, 1320], table: { y: 1110 }, hide: [{ x: 860, y: 900, from: 'left', where: 'leaning out from behind the fridge' }, { x: 60, y: 620, from: 'below', where: 'peeking over the left cabinet' }] },
  desk: { floor: FLOOR, win: { x: 560, y: 380, w: 380, h: 420 }, stand: [540, 1300], ring: { x: 880, y: 760, r: 110 }, hide: [{ x: 390, y: 600, from: 'right', where: 'leaning out from behind the LEO LIVE poster' }, { x: 380, y: 1000, from: 'below', where: 'rising behind the laptop' }] },
  window: { floor: FLOOR, win: { x: 170, y: 420, w: 740, h: 700 }, stand: [540, 1300], hide: [{ x: 170, y: 760, from: 'left', where: 'behind the left window frame' }] },
}
export const leoSpots = room => SPOTS[room]

export function drawLeoHome(x, t, { room = 'bedroom', ep = 'am', dark = 0, sky = null, light = 1, ring = 1, zoom = null } = {}) {
  x.save()
  if (zoom) { x.translate(zoom.x, zoom.y); x.scale(zoom.s, zoom.s); x.translate(-zoom.x, -zoom.y) }
  wall(x); floor(x)
  const o = { ep, dark, sky }
  if (room === 'bedroom') { rug(x, 560, 1560, 620, 150); bedroom(x, t, o) }
  else if (room === 'kitchen') kitchen(x, t, o)
  else if (room === 'desk') desk(x, t, o)
  else windowRoom(x, t, o)
  // the sunflower lives on the bedroom window sill, the desk, the kitchen counter and the nook (the binge detail)
  const fl = FLOWER[ep] || FLOWER.am
  const win = SPOTS[room].win
  const fpos = room === 'kitchen' ? [600, 1110] : room === 'desk' ? [980, 1150] : room === 'window' ? [800, win.y + win.h + 18] : [win.x + win.w - 40, win.y + win.h + 18]
  drawSunflower(x, fpos[0], fpos[1], room === 'window' ? 9 : 7, t, fl)
  if (room === 'desk') { const rg = SPOTS.desk.ring; drawRingLight(x, rg.x, rg.y, rg.r, t, { on: ring * (1 - dark), stand: 380 }) }
  // light: the morning sunbeam from the window across the floor
  const sun = clamp(light) * (1 - dark)
  if (sun > 0 && room !== 'window') {
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.16 * sun
    x.fillStyle = '#ffd9a0'
    x.beginPath(); x.moveTo(win.x, win.y + win.h); x.lineTo(win.x + win.w, win.y + win.h); x.lineTo(win.x + win.w + 260, HH); x.lineTo(win.x - 160, HH); x.closePath(); x.fill()
    x.restore()
  }
  if (dark > 0) {
    // lights out: an indigo wash everywhere except the window, then a cool moonbeam on the floor
    x.save(); x.globalAlpha = 0.78 * clamp(dark); x.fillStyle = '#070523'
    x.beginPath(); x.rect(0, 0, W, HH); x.rect(win.x + win.w, win.y, -win.w, win.h); x.fill('evenodd'); x.restore()
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.12 * clamp(dark); x.fillStyle = '#8fa8ff'
    x.beginPath(); x.moveTo(win.x, win.y + win.h); x.lineTo(win.x + win.w, win.y + win.h); x.lineTo(win.x + win.w + 180, HH); x.lineTo(win.x - 80, HH); x.closePath(); x.fill(); x.restore()
  }
  x.restore()
}
void ease
