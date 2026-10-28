// stexfiles props: small pixel drawings on canvas (Star Talk season 3, #24 "The Ex Files."). Every prop is a pure draw
// call at a pixel size `px` (one art pixel = px screen px), crisp rectangles only, so they sit next to the pixel stars.
//   starFrame(x, y, size, t, o)             where drawStarChar puts its cells this frame (mirrors startalk.js) → at(ci, cj)
//   drawFedora / drawCollar / drawBelt       the detective kit, placed on a star's cells
//   drawMagnifier(ctx, x, y, px, o)          a brass magnifying glass (x, y = lens centre); o.eye = a giant eye in the lens
//   drawOffice(ctx, t, o)                    the back wall with a window hole, the venetian blinds (o.up 0…1 = raised)
//   drawCorkboard / drawIndexCard / drawSubject / drawString / drawPin
//   drawDesk(ctx, o)                         the desk (o.drawer 0…1 = the middle drawer open)
//   drawLamp / lampLight                     the gooseneck desk lamp + its warm cone
//   drawClock(ctx, x, y, px, text)           a red LED desk clock
//   drawMug / drawFile / drawPhone           coffee (with steam), the fat case file, a phone showing the sunset
//   photo(u, v, blob)                        the ex's sunset photo as a colour function (for the ENHANCE monitor)
//   drawPigeon(ctx, x, y, px, t, o)          the culprit, in glorious HD
//   drawPlate / drawCake                     the CASE: YOU polaroids
//   drawCardBack(ctx, x, y, w, h, o)         tonight's deck
//   drawTear / drawSweat / drawTissue
import { clamp } from '../../../src/lib.js'

export const OUT = '#120a22'
export const RED = '#ff3b4f'
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }
/** bitmap helper: rows of chars, pal maps char → colour; (x, y) = top-left */
export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}

// ─────────────────────────────── star geometry (mirrors startalk.js so props sit on a star's cells)
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
export function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
/** the star's cell mapping this frame (same opts as drawStarChar) → { at(ci, cj) → [x, y], cell, sx, sy, L, R (eye centres) } */
export function starFrame(x, y, size, t, { squash = 0, hops = null, seed = 1, bob, pop = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sx = 1 + sq, sy = 1 - sq * 0.9
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  const at = (ci, cj) => [Math.round(x) + sx * (ci - HALF) * cell, Math.round(cy + base) + sy * ((cj - HALF) * cell - base)]
  return { at, cell, sx, sy, cy, L: at(13.4, 19.2), R: at(22.6, 19.2) }
}

// ─────────────────────────────── the detective kit
const HAT = '#2c2440', HAT_HI = '#4a3d68', HAT_LO = '#1d1730', BAND = '#c8344c'
/** a fedora on the star's top tip. f = starFrame(). lift = px the hat rises (a tip), tilt = radians */
export function drawFedora(ctx, f, { lift = 0, tilt = -0.1 } = {}) {
  const [hx, hy] = f.at(18, 5.2), c = f.cell
  ctx.save(); ctx.translate(hx, hy - lift); ctx.rotate(tilt); ctx.scale(f.sx, f.sy)
  const rows = [
    '........OOOOOOOOOO........',
    '......OOHHHHOOHHHHOO......',
    '.....OHHHHHHHOOHHHHHO.....',
    '.....OHHHHHHHHHHHHHHO.....',
    '.....OHHHHHHHHHHHHHMO.....',
    '.....OBBBBBBBBBBBBBBO.....',
    '.....OBBBBBBBBBBBBBBO.....',
    '.OOOOOMMMMMMMMMMMMMMOOOOO.',
    'OHHHHHHHHHHHHHHHHHHHHHHHMO',
    '.OOMMMMMMMMMMMMMMMMMMMMOO.',
    '...OOOOOOOOOOOOOOOOOOOO...',
  ]
  bitmap(ctx, rows, { O: OUT, H: HAT, M: HAT_LO, B: BAND }, -13 * c, -8 * c, c)
  R(ctx, -6 * c, -6 * c, 3 * c, c, HAT_HI); R(ctx, -11 * c, 0, 6 * c, c, HAT_HI)
  ctx.restore()
}
const COAT = '#c9a26a', COAT_LO = '#97733f', COAT_HI = '#e6c58e'
/** the popped trench collar: two flaps behind the head (draw BEFORE the star) */
export function drawCollar(ctx, f) {
  const c = f.cell
  for (const side of [-1, 1]) {
    const [bx, by] = f.at(18 + side * 6.2, 13.4)
    ctx.save(); ctx.translate(bx, by); ctx.scale(side * f.sx, f.sy)
    bitmap(ctx, [
      '......OO',
      '....OOHO',
      '..OOHHCO',
      'OOHHCCCO',
      'OCCCCCLO',
      '.OCCCLLO',
      '..OCLLO.',
      '...OOO..',
    ], { O: OUT, C: COAT, H: COAT_HI, L: COAT_LO }, 0, -4 * c, c)
    ctx.restore()
  }
}
/** the trench belt + buckle across the star's lower body (draw AFTER the star) */
export function drawBelt(ctx, f) {
  const c = f.cell, [bx, by] = f.at(18, 26.2)
  ctx.save(); ctx.translate(bx, by); ctx.scale(f.sx, f.sy)
  R(ctx, -9 * c, -c, 18 * c, 3 * c, OUT)
  R(ctx, -8 * c, -0.5 * c, 16 * c, 2 * c, COAT)
  R(ctx, -8 * c, 0.9 * c, 16 * c, 0.6 * c, COAT_LO)
  R(ctx, -2 * c, -1.2 * c, 4 * c, 3.4 * c, OUT); R(ctx, -1.2 * c, -0.4 * c, 2.4 * c, 1.8 * c, '#e9c45a'); R(ctx, -0.4 * c, 0.2 * c, 0.8 * c, 0.6 * c, OUT)
  ctx.restore()
}
/** a brass magnifying glass, lens centre (x, y), lens radius r px, handle angle ang. eye: draw a giant eye inside */
export function drawMagnifier(ctx, x, y, r, { ang = 0.8, eye = null, alpha = 1, t = 0 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  const p = Math.max(3, Math.round(r / 9))
  // handle
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang)
  R(ctx, r - p, -1.6 * p, r * 1.25 + 2 * p, 3.2 * p, OUT)
  R(ctx, r, -0.9 * p, r * 0.3, 1.8 * p, '#d8a944')
  R(ctx, r * 1.3, -0.9 * p, r * 0.95, 1.8 * p, '#5a2e22'); R(ctx, r * 1.3, -0.9 * p, r * 0.95, 0.6 * p, '#7a4430')
  ctx.restore()
  // lens: pixel ring
  const n = Math.ceil(r / p) + 2
  for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5) * p
    let c = null
    if (d < r - 1.6 * p) c = eye ? null : (i + j < -n * 0.6 && i + j > -n * 0.9 ? 'rgba(255,255,255,0.45)' : 'rgba(170,220,255,0.16)')
    else if (d < r) c = (i - j) < 0 ? '#f2c75c' : '#b9862e'
    else if (d < r + p) c = OUT
    if (c) R(ctx, x + i * p, y + j * p, p, p, c)
  }
  if (eye) {
    // the giant eye behind the glass: white, a huge pupil, a glint
    const rr = r - 1.6 * p
    for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
      const d = Math.hypot(i + 0.5, j + 0.5) * p
      if (d >= rr) continue
      const pd = Math.hypot(i + 0.5 - eye.lx * 2.2, j + 0.5 - eye.ly * 2.2) * p
      const c = pd < rr * 0.42 ? '#1b1236' : '#fffaf0'
      R(ctx, x + i * p, y + j * p, p, p, c)
    }
    R(ctx, x + (eye.lx * 2.2 - 2) * p, y + (eye.ly * 2.2 - 2.5) * p, 2 * p, 2 * p, '#ffffff')
    // lid: closes from the top by eye.lid
    if (eye.lid > 0) for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
      const d = Math.hypot(i + 0.5, j + 0.5) * p
      if (d < rr && (j + n) / (2 * n) < eye.lid) R(ctx, x + i * p, y + j * p, p, p, eye.lidColor || '#c0566b')
    }
    void t
  }
  ctx.restore()
}

// ─────────────────────────────── the office
const WALL = '#1a1430', WALL_LO = '#130e25', WALL_HI = '#241c40', TRIM = '#0d0919'
export const WIN = { x: 620, y: 440, w: 390, h: 440 }
/** the back wall (with the window cut out), wainscot, picture rail */
export function drawWall(ctx) {
  ctx.save()
  ctx.beginPath(); ctx.rect(-1400, -1200, 3900, 4400); ctx.rect(WIN.x, WIN.y, WIN.w, WIN.h)
  ctx.fillStyle = WALL; ctx.fill('evenodd')
  ctx.restore()
  // panelling stripes
  for (let i = -30; i < 60; i++) R(ctx, i * 60, -1200, 4, 4400, WALL_HI)
  R(ctx, WIN.x, WIN.y, WIN.w, WIN.h, 'rgba(0,0,0,0)')
  // re-cut the window over the stripes: we paint the window area separately in drawWindow, so mask stripes there
  R(ctx, -1400, 960, 3900, 2400, WALL_LO)
  R(ctx, -1400, 952, 3900, 10, TRIM)
  R(ctx, -1400, 400, 3900, 8, TRIM)
}
/** the window: frame, sky behind is whatever was drawn first (we tint it); blinds with slats; up = 0 down … 1 raised */
export function drawWindow(ctx, t, { up = 0, morning = 0 } = {}) {
  const { x, y, w, h } = WIN
  // morning sky inside the window
  if (morning > 0) {
    ctx.save(); ctx.globalAlpha = morning
    const g = ctx.createLinearGradient(0, y, 0, y + h)
    g.addColorStop(0, '#5b4aa8'); g.addColorStop(0.45, '#ff8f8a'); g.addColorStop(0.8, '#ffc77a'); g.addColorStop(1, '#ffe2a0')
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h)
    // the sun coming up
    const sx = x + w * 0.62, sy = y + h * 0.86
    for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (Math.hypot(i, j) < 6.2) R(ctx, sx + i * 10, sy + j * 10, 10, 10, Math.hypot(i, j) < 4 ? '#fff6d8' : '#ffe08a')
    // little skyline
    for (let k = 0; k < 9; k++) { const bw = 30 + (k * 17) % 26, bh = 40 + (k * 37) % 70; R(ctx, x + k * 46 - 6, y + h - bh, bw, bh, '#3b2a5c') }
    ctx.restore()
  }
  // the slats: N slats stacked from the top; raised = compressed into the top
  const N = 16, pitch = h / N
  const stack = 10
  for (let i = 0; i < N; i++) {
    const yy0 = y + i * pitch
    const yy = yy0 + (y + i * stack * 0.55 - yy0) * up
    const th = (pitch * 0.62) * (1 - up) + stack * 0.5 * up
    R(ctx, x, yy, w, th, OUT)
    R(ctx, x + 4, yy + 2, w - 8, Math.max(2, th - 5), up > 0.5 ? '#c9b6a0' : '#5a4e7a')
    R(ctx, x + 4, yy + 2, w - 8, 2, up > 0.5 ? '#efe2cc' : '#7c6ea0')
  }
  // cord
  const cordY = y + h * (1 - up * 0.55) + 60
  R(ctx, x + w - 26, y, 4, cordY - y, '#d8cbb5'); R(ctx, x + w - 32, cordY, 16, 22, '#d8cbb5'); R(ctx, x + w - 30, cordY + 4, 12, 14, '#a8977d')
  // frame
  R(ctx, x - 18, y - 18, w + 36, 18, TRIM); R(ctx, x - 18, y + h, w + 36, 22, TRIM); R(ctx, x - 18, y, 18, h, TRIM); R(ctx, x + w, y, 18, h, TRIM)
  R(ctx, x + w / 2 - 6, y, 12, h * (1 - up) + (up > 0 ? h * up : 0), 'rgba(13,9,25,0.0)')
  R(ctx, x - 30, y + h + 16, w + 60, 14, '#2b2246')
  void t
}
/** light stripes from the window falling across the wall and desk (screen space after camera) */
export function drawStripes(ctx, { alpha = 0.18, color = [150, 180, 255], up = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const N = 9
  for (let i = 0; i < N; i++) {
    const y0 = 820 + i * 44
    ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha * (1 - up * 0.6) * (0.7 + 0.3 * (i % 2))})`
    ctx.beginPath(); ctx.moveTo(620, WIN.y + i * 27); ctx.lineTo(620, WIN.y + i * 27 + 16); ctx.lineTo(80, y0 + 380 + 24); ctx.lineTo(80, y0 + 380); ctx.closePath(); ctx.fill()
  }
  ctx.restore()
}

// ─────────────────────────────── the corkboard
export const BOARD = { x: 50, y: 452, w: 520, h: 460 }
export function drawCorkboard(ctx) {
  const { x, y, w, h } = BOARD
  R(ctx, x - 6, y - 6, w + 12, h + 12, OUT)
  R(ctx, x, y, w, h, '#6a4228'); R(ctx, x + 14, y + 14, w - 28, h - 28, '#b5804e')
  // cork speckle (deterministic)
  for (let k = 0; k < 260; k++) {
    const sx = x + 16 + ((k * 97) % (w - 36)), sy = y + 16 + ((k * 61 + (k * k) % 37) % (h - 36))
    R(ctx, sx, sy, 4, 4, k % 3 ? '#9a6a3e' : '#c99862')
  }
  R(ctx, x, y, w, 4, '#8a5a36'); R(ctx, x, y + h - 6, w, 6, '#4a2c1a')
}
export function drawPin(ctx, x, y, col = RED) {
  R(ctx, x - 7, y - 7, 14, 14, OUT); R(ctx, x - 5, y - 5, 10, 10, col); R(ctx, x - 4, y - 4, 4, 4, '#ffb0b8')
}
/** red string from a to b, drawn k of the way; sag in px */
export function drawString(ctx, a, b, k = 1, sag = 18) {
  if (k <= 0) return
  const n = 24
  ctx.save(); ctx.fillStyle = '#e02a3e'
  for (let i = 0; i <= n * k; i++) {
    const u = i / n
    const px = a[0] + (b[0] - a[0]) * u, py = a[1] + (b[1] - a[1]) * u + Math.sin(u * Math.PI) * sag
    ctx.fillRect(Math.round(px - 2.5), Math.round(py - 2.5), 5, 5)
  }
  ctx.restore()
}
/** an index card centred at (cx, cy), lines [label, value…] */
export function drawIndexCard(ctx, cx, cy, w, h, lines, { rot = 0, k = 1 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k)
  R(ctx, -w / 2 + 6, -h / 2 + 8, w, h, 'rgba(20,10,30,0.45)')
  R(ctx, -w / 2 - 3, -h / 2 - 3, w + 6, h + 6, OUT)
  R(ctx, -w / 2, -h / 2, w, h, '#f6eed8')
  R(ctx, -w / 2, -h / 2 + 30, w, 3, '#ef8a96')
  for (let yy = -h / 2 + 56; yy < h / 2 - 6; yy += 26) R(ctx, -w / 2 + 6, yy, w - 12, 2, '#b9cbe6')
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#c42a40'; ctx.font = "700 19px 'Space Mono', ui-monospace, monospace"
  ctx.fillText(lines[0], 0, -h / 2 + 24)
  ctx.fillStyle = '#1d1640'; ctx.font = "700 24px 'Space Mono', ui-monospace, monospace"
  lines.slice(1).forEach((l, i) => ctx.fillText(l, 0, -h / 2 + 54 + i * 26))
  ctx.restore()
  drawPin(ctx, cx + Math.sin(rot) * h / 2, cy - Math.cos(rot) * h / 2 + 4)
}
/** the subject: a polaroid with a dark silhouette and a "?" */
export function drawSubject(ctx, cx, cy, { k = 1 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.04); ctx.scale(k, k)
  R(ctx, -84, -96, 168, 196, OUT); R(ctx, -80, -92, 160, 188, '#f4efe4')
  R(ctx, -68, -80, 136, 132, '#5c6a8e')
  for (let j = 0; j < 132; j += 6) R(ctx, -68, -80 + j, 136, 3, 'rgba(255,255,255,0.05)')
  // silhouette: head + shoulders
  const P = 6
  bitmap(ctx, [
    '.......XXXXXX.......',
    '......XXXXXXXX......',
    '.....XXXXXXXXXX.....',
    '.....XXXXXXXXXX.....',
    '.....XXXXXXXXXX.....',
    '......XXXXXXXX......',
    '.......XXXXXX.......',
    '........XXXX........',
    '...XXXXXXXXXXXXXX...',
    '.XXXXXXXXXXXXXXXXXX.',
    'XXXXXXXXXXXXXXXXXXXX',
    'XXXXXXXXXXXXXXXXXXXX',
  ], { X: '#1a1430' }, -60, -16 - 6 * P + 30, P)
  // a big ? on the face
  ctx.fillStyle = '#f2c75c'; ctx.font = "700 46px 'Space Mono', ui-monospace, monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('?', 0, -34)
  ctx.restore()
}
/** the label strip under the subject */
export function drawSubjectTag(ctx, cx, cy) {
  R(ctx, cx - 112, cy - 26, 224, 56, OUT); R(ctx, cx - 109, cy - 23, 218, 50, '#f6eed8')
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = '#c42a40'; ctx.font = "700 17px 'Space Mono', ui-monospace, monospace"; ctx.fillText('SUBJECT:', cx, cy - 9)
  ctx.fillStyle = '#1d1640'; ctx.font = "700 21px 'Space Mono', ui-monospace, monospace"; ctx.fillText('THE NEW ONE', cx, cy + 13)
}

// ─────────────────────────────── the desk + things on it
export const DESK = { x: 40, y: 1196, w: 1000, top: 30, h: 290 }
export function drawDesk(ctx, { drawer = 0, stamp = 0 } = {}) {
  const { x, y, w, top, h } = DESK
  R(ctx, x - 4, y - 4, w + 8, top + 8, OUT)
  R(ctx, x, y, w, top, '#7a4652'); R(ctx, x, y, w, 6, '#9a6070')
  R(ctx, x + 20, y + top, w - 40, h, OUT)
  R(ctx, x + 24, y + top, w - 48, h, '#43243a')
  // drawers: left, right, the middle one (opens toward you = drops down a bit and grows)
  for (const dx of [70, w - 70 - 240]) {
    R(ctx, x + dx, y + top + 34, 240, 96, '#2e1828'); R(ctx, x + dx + 6, y + top + 40, 228, 84, '#55304a')
    R(ctx, x + dx + 96, y + top + 76, 48, 12, '#d8a944')
    R(ctx, x + dx, y + top + 150, 240, 96, '#2e1828'); R(ctx, x + dx + 6, y + top + 156, 228, 84, '#55304a')
    R(ctx, x + dx + 96, y + top + 192, 48, 12, '#d8a944')
  }
  const mx = x + w / 2 - 150, mw = 300
  const open = drawer * 70
  R(ctx, mx - 6, y + top + 26, mw + 12, 140, OUT)
  R(ctx, mx, y + top + 30, mw, 130, '#1a0e18')
  // the drawer front, pulled toward the camera: grows + drops
  ctx.save(); ctx.translate(mx + mw / 2, y + top + 96 + open * 0.5); ctx.scale(1 + drawer * 0.08, 1 + drawer * 0.08)
  if (drawer > 0) { R(ctx, -mw / 2 + 8, -66 - open * 0.6, mw - 16, open * 0.6 + 6, '#6a3c52'); R(ctx, -mw / 2 + 8, -66 - open * 0.6, mw - 16, 6, '#8a5268') }
  R(ctx, -mw / 2 - 4, -70, mw + 8, 140, OUT)
  R(ctx, -mw / 2, -66, mw, 132, '#5c344c'); R(ctx, -mw / 2, -66, mw, 6, '#764462')
  R(ctx, -40, -8, 80, 16, '#d8a944'); R(ctx, -40, -8, 80, 5, '#f2cf72')
  if (stamp > 0) {
    ctx.save(); ctx.translate(0, 34); ctx.rotate(-0.1); ctx.scale(1 + (1 - stamp) * 1.4, 1 + (1 - stamp) * 1.4); ctx.globalAlpha *= clamp(stamp * 3)
    ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.strokeRect(-118, -30, 236, 60)
    ctx.fillStyle = RED; ctx.font = "700 40px 'Space Mono', ui-monospace, monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('CLOSED', 0, 2)
    ctx.restore()
  }
  ctx.restore()
}
/** the gooseneck lamp: base at (bx, by) on the desk, shade aims down-right. on 0…1 */
export const LAMP = { bx: 100, by: 1196, sx: 236, sy: 958 }
export function drawLamp(ctx, { on = 1 } = {}) {
  const { bx, by, sx, sy } = LAMP
  R(ctx, bx - 64, by - 22, 128, 24, OUT); R(ctx, bx - 60, by - 18, 120, 18, '#2f6b4f'); R(ctx, bx - 60, by - 18, 120, 5, '#4a9a72')
  // neck: a pixel chain up and over
  for (let i = 0; i <= 20; i++) {
    const u = i / 20, px = bx + (sx - 50 - bx) * u * u, py = by - 20 + (sy - 30 - (by - 20)) * Math.sin(u * Math.PI / 2)
    R(ctx, px - 6, py - 6, 12, 12, OUT); R(ctx, px - 4, py - 4, 8, 8, '#c9a44a')
  }
  // shade (a tilted dome)
  ctx.save(); ctx.translate(sx, sy); ctx.rotate(0.5)
  bitmap(ctx, [
    '.....OOOOOO.....',
    '...OOGGGGGGOO...',
    '..OGGGHHGGGGGO..',
    '.OGGGHHGGGGGGGO.',
    'OGGGGGGGGGGGGGGO',
    'OOOOOOOOOOOOOOOO',
    '.OYYYYYYYYYYYYO.',
  ], { O: OUT, G: '#2f6b4f', H: '#5fb08a', Y: on > 0.5 ? '#fff2c0' : '#5a5040' }, -64, -28, 8)
  ctx.restore()
}
/** the lamp's warm cone (additive) */
export function lampLight(ctx, on = 1, flick = 1) {
  if (on <= 0) return
  const { sx, sy } = LAMP
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(sx + 40, sy + 60, 10, sx + 160, sy + 220, 420)
  g.addColorStop(0, `rgba(255,214,140,${0.42 * on * flick})`); g.addColorStop(0.5, `rgba(255,190,110,${0.16 * on * flick})`); g.addColorStop(1, 'rgba(255,170,90,0)')
  ctx.fillStyle = g
  ctx.beginPath(); ctx.moveTo(sx + 10, sy + 10); ctx.lineTo(sx + 70, sy - 10); ctx.lineTo(sx + 620, sy + 300); ctx.lineTo(sx - 120, sy + 300); ctx.closePath(); ctx.fill()
  ctx.restore()
}
/** red LED desk clock centred at (x, y) */
export function drawClock(ctx, x, y, text, { glow = 1 } = {}) {
  R(ctx, x - 96, y - 44, 192, 88, OUT); R(ctx, x - 90, y - 38, 180, 76, '#211a30'); R(ctx, x - 82, y - 30, 164, 60, '#0b0710')
  ctx.save()
  ctx.font = "700 40px 'Space Mono', ui-monospace, monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.shadowColor = `rgba(255,60,80,${0.9 * glow})`; ctx.shadowBlur = 16
  ctx.fillStyle = '#ff4a5e'; ctx.fillText(text, x, y + 2)
  ctx.restore()
  R(ctx, x - 70, y + 44, 30, 8, OUT); R(ctx, x + 40, y + 44, 30, 8, OUT)
}
/** a coffee mug sitting at (x, y) = bottom centre, with steam */
export function drawMug(ctx, x, y, px, t, { steam = 1 } = {}) {
  bitmap(ctx, [
    'OOOOOOOOO...',
    'OWWWWWWWOOO.',
    'OWBBBBBWO.O.',
    'OWWWWWWWO..O',
    'OWWWWWWWO..O',
    'OWWWWWWWO.O.',
    'OWWWWWWWOOO.',
    '.OWWWWWO....',
    '..OOOOO.....',
  ], { O: OUT, W: '#efe6d6', B: '#4a2a1a' }, x - 4.5 * px, y - 9 * px, px)
  if (steam > 0) for (let k = 0; k < 3; k++) {
    const ph = (t * 0.6 + k / 3) % 1
    ctx.save(); ctx.globalAlpha *= steam * Math.sin(ph * Math.PI) * 0.7
    R(ctx, x + Math.sin(ph * 7 + k) * px * 1.2 - px / 2, y - 10 * px - ph * 9 * px, px, px * 2, '#e8e0f0')
    ctx.restore()
  }
}
/** the fat case file (a manila folder bursting with screenshots), centred at (x, y) = bottom centre */
export function drawFile(ctx, x, y, px, { label = 'THE EX' } = {}) {
  const w = 28 * px, h = 9 * px
  for (let i = 0; i < 6; i++) R(ctx, x - w / 2 + (i % 2) * px * 2 - px, y - h + i * px * 1.2, w + px * 2, px, i % 2 ? '#dde6ff' : '#ffffff')
  R(ctx, x - w / 2 - px, y - h - px * 2, w + 2 * px, h + 3 * px, OUT)
  R(ctx, x - w / 2, y - h - px, w, h + px, '#e2b765'); R(ctx, x - w / 2, y - h - px, w, px, '#f2d08a')
  // paper sticking out
  for (let i = 0; i < 5; i++) R(ctx, x - w / 2 + px * (2 + i * 5), y - h - px * (3 + (i % 3)), px * 4, px * 2, i % 2 ? '#ffffff' : '#cfe0ff')
  R(ctx, x - w / 2 + px * 2, y - h - px * 4, px * 9, px * 2.4, '#e2b765')
  ctx.fillStyle = '#5a2e1a'; ctx.font = `700 ${Math.round(px * 3.2)}px 'Space Mono', ui-monospace, monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(label, x, y - h / 2 - px * 0.2)
}
/** a phone at (x, y) (centre) showing the sunset, tilted rot */
export function drawPhone(ctx, x, y, px, { rot = 0, glow = 1 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  if (glow > 0) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, px * 26)
    g.addColorStop(0, `rgba(255,170,110,${0.3 * glow})`); g.addColorStop(1, 'rgba(255,150,100,0)')
    ctx.fillStyle = g; ctx.fillRect(-px * 26, -px * 26, px * 52, px * 52); ctx.restore()
  }
  R(ctx, -6 * px, -10 * px, 12 * px, 20 * px, OUT)
  const cols = ['#5b3f8f', '#8a4f9a', '#d8607a', '#ff8a5a', '#ffb45a', '#ffd27a', '#2a2a5a', '#3a3a70']
  for (let j = 0; j < 8; j++) R(ctx, -5 * px, (-9 + j * 2.25) * px, 10 * px, 2.25 * px + 1, cols[j])
  R(ctx, -1.5 * px, -0.4 * px, 3 * px, 1.6 * px, '#fff2c0')
  R(ctx, -5 * px, -9 * px, 10 * px, 1 * px, 'rgba(255,255,255,0.18)')
  ctx.restore()
}

// ─────────────────────────────── the ENHANCE monitor's photo: the ex's sunset, as a colour function
const mixc = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k)
const SKYS = [[0, [70, 44, 120]], [0.3, [150, 70, 140]], [0.5, [236, 110, 110]], [0.62, [255, 170, 90]], [0.66, [255, 214, 140]]]
/** u, v in 0…1 → [r, g, b]; the blob (the culprit) sits on the wire at BLOB */
export const BLOB = { u: 0.78, v: 0.337, ru: 0.014, rv: 0.012 }
export function photo(u, v, soft = 0.35) {
  let c
  if (v < 0.66) {
    let i = 0; while (i < SKYS.length - 2 && v > SKYS[i + 1][0]) i++
    const [a, ca] = SKYS[i], [b, cb] = SKYS[i + 1]
    c = mixc(ca, cb, clamp((v - a) / (b - a)))
    const ds = Math.hypot((u - 0.42) * 1.1, v - 0.6)
    if (ds < 0.07) c = mixc(c, [255, 244, 210], clamp((0.07 - ds) / 0.02))
    else if (ds < 0.16) c = mixc(c, [255, 220, 150], 0.35 * (0.16 - ds) / 0.09)
  } else {
    c = mixc([60, 50, 110], [24, 20, 60], (v - 0.66) / 0.34)
    if (Math.abs(u - 0.42) < 0.06 * (1 - (v - 0.66)) && ((v * 60) | 0) % 2 === 0) c = mixc(c, [255, 190, 110], 0.7)
  }
  // the power line
  const wy = 0.3 + (u * 0.06) + Math.sin(u * Math.PI) * 0.02
  if (Math.abs(v - wy) < 0.0025) c = [30, 20, 40]
  // the blob, soft-edged
  const d = Math.hypot((u - BLOB.u) / BLOB.ru, (v - BLOB.v) / BLOB.rv)
  if (d < 1 + soft) c = mixc(c, [52, 46, 66], clamp((1 + soft - d) / (soft * 1.6 + 0.001)))
  return c
}

// ─────────────────────────────── the culprit
/** the pigeon, (x, y) = feet centre. o.blink 0/1, o.tilt head bob 0…1 */
export function drawPigeon(ctx, x, y, px, t, { blink = 0, bob = 0 } = {}) {
  const pal = { O: OUT, G: '#9aa0b8', D: '#6a6f88', L: '#c4c8da', N: '#4fb894', P: '#9a64c0', E: '#ff9a3c', K: '#120a22', B: '#e8b482', F: '#ff7a7a', W: '#ffffff' }
  const body = [
    '.......OOOOOOOOOO.......',
    '.....OOGGGGGGGGGDOOO....',
    '....OLLGGGGGGGGGDDDDOO..',
    '...OLLLLGGGGGGGDDDDDDDO.',
    '...OLLLLLGGGGGGGDDKDDDDO',
    '....OLLLLLGGGGGGDDKDDDO.',
    '.....OOGGGGGGGGGGDDDOO..',
    '.......OOOOOOOOOOOO.....',
  ]
  const head = [
    '..OOOOO..',
    '.OGGGGGO.',
    'OGGWEGGGO',
    'OGGKEGGGO',
    'OGGGGGGGO',
    '.ONPNPNO.',
    '.OPNPNPO.',
    '..ONPNO..',
  ]
  // feet + wire
  R(ctx, x - 6 * px, y, px, 2 * px, pal.F); R(ctx, x - 7 * px, y + px, 3 * px, px, pal.F)
  R(ctx, x + 3 * px, y, px, 2 * px, pal.F); R(ctx, x + 2 * px, y + px, 3 * px, px, pal.F)
  bitmap(ctx, body, pal, x - 11 * px, y - 8 * px, px)
  const hb = Math.round(Math.sin(bob * Math.PI) * 2)
  const hx = x - 10 * px - hb * px, hy = y - 14 * px + Math.abs(hb) * px * 0.5
  const hrow = blink ? head.map((r, j) => (j === 2 || j === 3) ? r.replace(/[WEK]/g, 'G').replace('GGGG', 'GKKG') : r) : head
  bitmap(ctx, hrow, pal, hx, hy, px)
  // beak
  R(ctx, hx - 2 * px, hy + 3 * px, 2 * px, px, pal.B); R(ctx, hx - px, hy + 4 * px, px, px, pal.B)
  void t
}

// ─────────────────────────────── the CASE: YOU polaroid pictures (drawn inside an image box: x, y = top-left, w × h)
export function drawPlate(ctx, x, y, w, h) {
  R(ctx, x, y, w, h, '#3a3456')
  R(ctx, x, y + h * 0.55, w, h * 0.45, '#5a3a3c')                       // the table
  const cx = x + w / 2, cy = y + h * 0.62, P = 7
  for (let j = -5; j <= 5; j++) for (let i = -9; i <= 9; i++) {
    const d = Math.hypot(i / 9, j / 5)
    if (d < 1) R(ctx, cx + i * P, cy + j * P * 0.8, P, P, d > 0.82 ? '#b8b0c8' : d > 0.55 ? '#efe6d6' : '#ffffff')
  }
  R(ctx, cx - 13 * P, cy - 4 * P, P, 9 * P, '#c8c8d8'); R(ctx, cx - 14 * P, cy - 6 * P, 3 * P, 2 * P, '#c8c8d8')
  R(ctx, cx + 12 * P, cy - 5 * P, P, 10 * P, '#c8c8d8')
  // a cobweb in the corner
  ctx.save(); ctx.strokeStyle = 'rgba(239,230,214,0.7)'; ctx.lineWidth = 2
  for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(x + w - k * 16, y); ctx.lineTo(x + w, y + k * 16); ctx.stroke() }
  ctx.beginPath(); ctx.moveTo(x + w, y); ctx.lineTo(x + w - 52, y + 52); ctx.stroke()
  ctx.restore()
}
export function drawCake(ctx, x, y, w, h, t) {
  R(ctx, x, y, w, h, '#4a2f6a')
  // bunting
  for (let k = 0; k < 7; k++) { const bx = x + 8 + k * (w - 16) / 6; R(ctx, bx - 6, y + 14 + Math.sin(k) * 3, 12, 10, ['#ff8fb1', '#f2c75c', '#7fe0ff'][k % 3]) }
  const cx = x + w / 2, by = y + h - 18, P = 7
  bitmap(ctx, [
    '...F...F...F...',
    '...W...W...W...',
    '...W...W...W...',
    '.OOOOOOOOOOOOO.',
    'OPPPPPPPPPPPPPO',
    'OWPWWPWWPWWPWWO',
    'OCCCCCCCCCCCCCO',
    'OCCCCCCCCCCCCCO',
    'OOOOOOOOOOOOOOO',
  ], { O: OUT, P: '#ff8fb1', W: '#ffffff', C: '#c88a5a', F: (t * 8 | 0) % 2 ? '#ffd27a' : '#ff9a3c' }, cx - 7.5 * P, by - 9 * P, P)
  // the empty chair next to it: a big "?" in your spot
  ctx.fillStyle = '#f2c75c'; ctx.font = "700 40px 'Space Mono', ui-monospace, monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('?', x + w - 26, y + h * 0.45)
}

// ─────────────────────────────── tonight's deck
export function drawCardBack(ctx, cx, cy, w, h, { rot = 0, glow = 0, k = 1, t = 0 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k)
  if (glow > 0) { ctx.shadowColor = `rgba(242,199,92,${0.8 * glow})`; ctx.shadowBlur = 50 }
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 18)
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#3a1f78'); g.addColorStop(1, '#1a0c40')
  ctx.fillStyle = g; ctx.fill(); ctx.shadowBlur = 0
  ctx.lineWidth = 5; ctx.strokeStyle = '#f2d27a'; ctx.stroke()
  ctx.beginPath(); ctx.roundRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 10); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(242,210,122,0.45)'; ctx.stroke()
  // centre: a pixel star + a little moon
  const P = Math.max(4, Math.round(w / 34))
  bitmap(ctx, [
    '....Y....',
    '....Y....',
    '...YYY...',
    'YYYYYYYYY',
    '.YYYYYYY.',
    '..YYYYY..',
    '..YY.YY..',
    '.Y.....Y.',
  ], { Y: '#f2c75c' }, -4.5 * P, -4 * P, P)
  for (const [u, v] of [[-0.3, -0.33], [0.3, -0.33], [-0.3, 0.33], [0.3, 0.33]]) R(ctx, u * w - P / 2, v * h - P / 2, P, P, (t * 2 + u * 3 + v * 5) % 1 < 0.5 ? '#efe6d6' : '#c9a6ff')
  ctx.restore()
}

// ─────────────────────────────── small stuff
export function drawTear(ctx, x, y, px) {
  bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px)
}
export function drawSweat(ctx, x, y, px) {
  bitmap(ctx, ['.S.', '.S.', 'SWS', 'SSS', '.S.'], { S: '#9fdcff', W: '#ffffff' }, x - 1.5 * px, y - 2.5 * px, px)
}
/** a tissue held up (x, y) = centre */
export function drawTissue(ctx, x, y, px, t) {
  const w = Math.sin(t * 9) > 0 ? 0 : 1
  bitmap(ctx, w ? ['.WW..', 'WWWW.', 'WWWWW', '.WWW.', '..W..'] : ['..WW.', '.WWWW', 'WWWWW', '.WWW.', '..W..'], { W: '#ffffff' }, x - 2.5 * px, y - 2.5 * px, px)
}
