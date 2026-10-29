// st9scorpiohome — Scorpio's home in Star Talk season 9, "A Day in the Life" (promo/films/STARTALK10.md). Drawn once here
// and reused by Scorpio's five episodes (st9scorpioam · work · love · crew · 3am) so the set reads as one apartment.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { SCORPIO, HOME_FLOOR, drawScorpioHome, drawCorkboard, drawCandle, drawPinkSock, drawLavaLamp } from '../../st9scorpiohome.js'
//
// drawScorpioHome(ctx, t, { room = 'bedroom', ep = 'am', dark = 0, sky = null, hour = 8, glows = [], board = null, candle = null }) → anchors
//   Paints the whole 1080 × 1920 frame: wall, window (sky through it), furniture, floor. Draw it first.
//     room   'bedroom' | 'kitchen' | 'desk' | 'window'  (the window room is the close-up of the bedroom window + its sill)
//     ep     'am' | 'work' | 'love' | 'crew' | '3am'    picks the episode's tiny change (see below)
//     dark   0…1: lights off. The room sinks to indigo; the window sky, the candle, the lava lamp and `glows` stay bright.
//     sky    (ctx, win) => void paints inside the window clip (win = { x0, y0, x1, y1 }). Default: a plain sky by `hour`.
//     glows  [{ x, y, r, color, a }] extra light pools on top of the dark (a phone screen).
//     board  (ctx, rect) => void: draws the corkboard's contents instead of the episode default (rect = the cork area).
//     candle 0…1 override for the candle's height.
//   Returns anchors: { floor, win, stand: {x, y}, spots: {…}, ghost: [{ x, y, from }] }. Draw drawGhostCameo AFTER this.
//
// The three recurring props:
//   1. the blackout velvet curtains (always mostly shut; Scorpio lets the light in on its own terms)
//   2. the corkboard with red string (drawCorkboard): the season-4 detective, retired… mostly
//   3. the black-cherry candle (drawCandle) and its lava-lamp twin glow
// The tiny change per episode (binge reward): the candle burns down, and the secret pink sock from E36 never leaves.
//   am    a tall new candle; the pink sock is still in the drawer     work  the sock is on the floor now, by the bed
//   love  the candle is lit (date night)                              crew  shorter; the board is all friend photos
//   3am   lights off; a stub of candle, still lit; the sock is on the windowsill, next to the phone
// Pure f(t): nothing touches `document`; safe in node.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp } from '../src/lib.js'

export const SCORPIO = {
  color: '#e23d66', glyph: '♏',
  wallTop: '#120a16', wall: '#1f1222', wallHi: '#2a1730', stripe: '#251528',
  wains: '#2c1630', wainsHi: '#3a1e3e', trim: '#8c1f3c', trimLo: '#5c1228',
  floor: '#2e1c22', floorHi: '#3a2430', floorLo: '#22141a',
  velvet: '#4a0f26', velvetHi: '#6a1a38', velvetLo: '#2e0816',
  red: '#e23d66', redHi: '#ff7d9a', cork: '#a8743e', corkLo: '#7a5028', wax: '#3a0d1c', pink: '#ff9ac8', pinkLo: '#d96aa0',
  steel: '#6a6070', steelHi: '#8e8498', wood: '#3a2228', woodLo: '#26161a',
}
const INK = '#0c0710', BONE = '#efe6d6'
export const HOME_FLOOR = 1240
const P = 6

const rr = Math.round
function R(x, c, X, Y, W, H) { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
function block(x, X, Y, W, H, c, { hi = null, lo = null, o = P } = {}) {
  R(x, INK, X - o, Y - o, W + 2 * o, H + 2 * o)
  R(x, c, X, Y, W, H)
  if (hi) R(x, hi, X, Y, W, P)
  if (lo) R(x, lo, X, Y + H - P, W, P)
}

// ─────────────────────────────────────────────── the props
const CANDLE = { am: 1, work: 0.8, love: 0.6, crew: 0.42, '3am': 0.16 }
const LIT = { am: false, work: false, love: true, crew: false, '3am': true }

/** the black-cherry pillar candle standing on y = base. h 0…1 how much is left; lit = flame */
export function drawCandle(x, t, cx, base, c = 5, h = 1, lit = false) {
  const H = rr(lerp(4, 22, clamp(h))) * c
  block(x, cx - 4 * c, base - H, 8 * c, H, SCORPIO.wax, { hi: '#5a1a30', o: c })
  R(x, SCORPIO.red, cx - 3 * c, base - H, 2 * c, c)                          // a drip
  R(x, SCORPIO.red, cx - 3 * c, base - H + c, c, 3 * c)
  R(x, INK, cx - c / 2, base - H - 2 * c, c, 2 * c)                           // the wick
  if (lit) {
    const f = Math.sin(t * 17) * 0.5 + Math.sin(t * 29) * 0.3
    R(x, '#ffb347', cx - 1.5 * c + f, base - H - 6 * c, 3 * c, 4 * c)
    R(x, '#fff1b8', cx - 0.5 * c + f, base - H - 5 * c, c, 2 * c)
  }
  return { x: cx, y: base - H - 4 * c }
}
/** the secret pink sock, lying on its side, toe right */
export function drawPinkSock(x, cx, cy, c = 5, { rot = 0 } = {}) {
  x.save(); x.translate(rr(cx), rr(cy)); x.rotate(rot)
  const S = ['..pp....', '..pp....', '..pp....', '..ppppp.', '..pppppp', '..wwwww.']
  R(x, INK, -4 * c - c, -3 * c - c, 6 * c, 7 * c); R(x, INK, -2 * c - c, 0, 8 * c, 4 * c)
  S.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') R(x, ch === 'w' ? '#ffd6ea' : SCORPIO.pink, (i - 6) * c, (j - 3) * c, c + 0.5, c + 0.5) }))
  R(x, '#ffd6ea', -4 * c, -3 * c, 2 * c, c)
  x.restore()
}
/** a red lava lamp, standing on y = base */
export function drawLavaLamp(x, t, cx, base, c = 5) {
  block(x, cx - 4 * c, base - 4 * c, 8 * c, 4 * c, SCORPIO.steel, { hi: SCORPIO.steelHi, o: c })
  R(x, INK, cx - 3 * c - c, base - 20 * c - c, 6 * c + 2 * c, 16 * c + 2 * c)
  R(x, '#3a1a3e', cx - 3 * c, base - 20 * c, 6 * c, 16 * c)
  for (let i = 0; i < 3; i++) {
    const ph = (t * 0.25 + i / 3) % 1, by = base - 6 * c - ph * 12 * c, s = 2 + (i % 2)
    R(x, SCORPIO.red, cx - s * c / 2 + Math.sin(t + i) * c, by, s * c, (s + 1) * c)
  }
  block(x, cx - 2 * c, base - 23 * c, 4 * c, 3 * c, SCORPIO.steel, { o: c })
  return { x: cx, y: base - 12 * c }
}
/** the corkboard. contents(ctx, rect) draws what's pinned; default: a few photos joined by red string */
export function drawCorkboard(x, t, x0, y0, w, h, contents = null) {
  block(x, x0, y0, w, h, SCORPIO.wood, { o: P })
  const r = { x0: x0 + 2 * P, y0: y0 + 2 * P, x1: x0 + w - 2 * P, y1: y0 + h - 2 * P }
  R(x, SCORPIO.cork, r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0)
  x.fillStyle = SCORPIO.corkLo
  for (let i = 0; i < 60; i++) x.fillRect(r.x0 + ((i * 137) % (r.x1 - r.x0 - 6)), r.y0 + ((i * 71) % (r.y1 - r.y0 - 6)), 4, 4)
  x.save(); x.beginPath(); x.rect(r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0); x.clip()
  ;(contents || defaultBoard)(x, r, t)
  x.restore()
  return r
}
/** pin a little card: a polaroid (photo colour) or a note */
export function pinCard(x, cx, cy, w, h, { color = BONE, photo = null, rot = 0, pin = SCORPIO.red } = {}) {
  x.save(); x.translate(rr(cx), rr(cy)); x.rotate(rot)
  R(x, INK, -w / 2 - 3, -h / 2 - 3, w + 6, h + 6); R(x, color, -w / 2, -h / 2, w, h)
  if (photo) R(x, photo, -w / 2 + 5, -h / 2 + 5, w - 10, h * 0.66)
  R(x, INK, -5, -h / 2 - 5, 10, 10); R(x, pin, -3, -h / 2 - 3, 6, 6)
  x.restore()
}
/** red string between points */
export function redString(x, pts, { k = 1 } = {}) {
  if (pts.length < 2 || k <= 0) return
  // k 0…1 draws the string on, segment by segment
  const n = pts.length - 1, upto = clamp(k) * n
  x.save(); x.strokeStyle = SCORPIO.red; x.lineWidth = 4; x.beginPath(); x.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i <= n; i++) {
    const f = clamp(upto - (i - 1)); if (f <= 0) break
    x.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f))
  }
  x.stroke(); x.restore()
}
function defaultBoard(x, r) {
  const w = r.x1 - r.x0, h = r.y1 - r.y0
  const pts = [[r.x0 + w * 0.25, r.y0 + h * 0.3], [r.x0 + w * 0.72, r.y0 + h * 0.28], [r.x0 + w * 0.5, r.y0 + h * 0.72]]
  redString(x, [...pts, pts[0]])
  pinCard(x, pts[0][0], pts[0][1], 60, 70, { photo: '#5a6fa8', rot: -0.08 })
  pinCard(x, pts[1][0], pts[1][1], 60, 70, { photo: '#7a5a8a', rot: 0.07 })
  pinCard(x, pts[2][0], pts[2][1], 70, 44, { color: '#fff3a8', rot: 0.04 })
}
function friendsBoard(x, r) {
  const w = r.x1 - r.x0, h = r.y1 - r.y0
  const cols = ['#3fb6f0', '#7c74f0', '#e9b24a', '#e163d6']
  cols.forEach((c, i) => pinCard(x, r.x0 + w * (0.22 + 0.56 * (i % 2)), r.y0 + h * (0.3 + 0.42 * (i >> 1)), 64, 74, { photo: c, rot: (i % 2 ? 0.08 : -0.06) }))
  // the string makes a heart
  x.save(); x.strokeStyle = SCORPIO.red; x.lineWidth = 4; const cx = r.x0 + w / 2, cy = r.y0 + h / 2
  x.beginPath(); x.moveTo(cx, cy + 22); x.lineTo(cx - 22, cy); x.lineTo(cx - 12, cy - 12); x.lineTo(cx, cy - 2); x.lineTo(cx + 12, cy - 12); x.lineTo(cx + 22, cy); x.closePath(); x.stroke(); x.restore()
}

// ─────────────────────────────────────────────── the shell
function wall(x) {
  const g = x.createLinearGradient(0, 0, 0, HOME_FLOOR)
  g.addColorStop(0, SCORPIO.wallTop); g.addColorStop(0.42, SCORPIO.wall); g.addColorStop(1, SCORPIO.wallHi)
  x.fillStyle = g; x.fillRect(0, 0, 1080, HOME_FLOOR)
  // damask-ish diamonds, very faint
  x.fillStyle = SCORPIO.stripe
  for (let yy = 40; yy < 980; yy += 84) for (let xx = (yy / 84) % 2 ? 42 : 0; xx < 1080; xx += 84) { x.fillRect(xx + 9, yy, 6, 6); x.fillRect(xx + 3, yy + 6, 18, 6); x.fillRect(xx + 9, yy + 12, 6, 6) }
  R(x, SCORPIO.trimLo, 0, 996, 1080, P); R(x, SCORPIO.trim, 0, 990, 1080, P)
  R(x, SCORPIO.wains, 0, 1002, 1080, HOME_FLOOR - 1002)
  for (let px = 30; px < 1080; px += 210) { R(x, SCORPIO.wainsHi, px, 1032, 168, P); R(x, SCORPIO.wainsHi, px, 1032, P, 168) }
  R(x, INK, 0, HOME_FLOOR - P, 1080, P)
}
function floor(x) {
  const g = x.createLinearGradient(0, HOME_FLOOR, 0, 1920)
  g.addColorStop(0, SCORPIO.floorLo); g.addColorStop(1, SCORPIO.floor)
  x.fillStyle = g; x.fillRect(0, HOME_FLOOR, 1080, 1920 - HOME_FLOOR)
  let row = 0
  for (let y = HOME_FLOOR + 14; y < 1920; y += 16 + row * 6, row++) {
    x.fillStyle = row % 2 ? SCORPIO.floorHi : SCORPIO.floorLo; x.fillRect(0, y, 1080, 3)
    const step = 120 + row * 26
    for (let sx = (row % 2) * step / 2; sx < 1080; sx += step) x.fillRect(rr(sx), y - 12 - row * 3, 3, 12 + row * 3)
  }
  // a black shag rug with a red border
  x.save(); x.translate(540, 1420); x.scale(1, 0.22)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 400, 0, Math.PI * 2); x.fill()
  x.fillStyle = SCORPIO.trimLo; x.beginPath(); x.arc(0, 0, 388, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#160c14'; x.beginPath(); x.arc(0, 0, 350, 0, Math.PI * 2); x.fill()
  x.restore()
}
function defaultSky(x, w, hour) {
  const h = ((hour % 24) + 24) % 24
  const pal = h < 5 || h >= 21 ? ['#0b0a2e', '#1d1650'] : h < 8 ? ['#f7b58f', '#a98fd8'] : h < 17 ? ['#9fd0f5', '#d8ecfa'] : ['#7b4fa8', '#f39ab6']
  const g = x.createLinearGradient(0, w.y0, 0, w.y1); g.addColorStop(0, pal[0]); g.addColorStop(1, pal[1])
  x.fillStyle = g; x.fillRect(w.x0, w.y0, w.x1 - w.x0, w.y1 - w.y0)
}
/** the window: sky inside a clip, the frame, and the velvet blackout curtains (open = 0…1 how far they're parted) */
function windowAt(x, t, w, { sky, hour, open = 0.55, sill = true }) {
  R(x, INK, w.x0 - 3 * P, w.y0 - 3 * P, w.x1 - w.x0 + 6 * P, w.y1 - w.y0 + 6 * P)
  x.save(); x.beginPath(); x.rect(w.x0, w.y0, w.x1 - w.x0, w.y1 - w.y0); x.clip()
  if (sky) sky(x, w); else defaultSky(x, w, hour)
  x.restore()
  const fc = '#2a2030', mx = (w.x0 + w.x1) / 2, my = (w.y0 + w.y1) / 2
  R(x, fc, w.x0 - 2 * P, w.y0 - 2 * P, w.x1 - w.x0 + 4 * P, 2 * P); R(x, fc, w.x0 - 2 * P, w.y1, w.x1 - w.x0 + 4 * P, 2 * P)
  R(x, fc, w.x0 - 2 * P, w.y0, 2 * P, w.y1 - w.y0); R(x, fc, w.x1, w.y0, 2 * P, w.y1 - w.y0)
  R(x, fc, mx - P, w.y0, 2 * P, w.y1 - w.y0); R(x, fc, w.x0, my - P, w.x1 - w.x0, 2 * P)
  if (sill) block(x, w.x0 - 5 * P, w.y1 + 2 * P, w.x1 - w.x0 + 10 * P, 3 * P, SCORPIO.wood, { hi: '#5a3440', lo: SCORPIO.woodLo })
  // the velvet: each panel covers (1 − open) of its half, plus a fixed overlap past the frame
  const half = (w.x1 - w.x0) / 2, cover = half * (1 - clamp(open)) + 8 * P
  const top = w.y0 - 8 * P, H = w.y1 - w.y0 + 16 * P
  for (const s of [-1, 1]) {
    const x0 = s < 0 ? w.x0 - 8 * P : w.x1 + 8 * P - cover, wd = cover
    R(x, INK, x0 - P, top, wd + 2 * P, H + P)
    R(x, SCORPIO.velvet, x0, top, wd, H)
    for (let k = 0; k * 4 * P < wd; k++) { R(x, SCORPIO.velvetHi, x0 + k * 4 * P + P, top, P, H); R(x, SCORPIO.velvetLo, x0 + k * 4 * P + 3 * P, top, P, H) }
  }
  R(x, INK, w.x0 - 12 * P, top - 2 * P, w.x1 - w.x0 + 24 * P, 2 * P)
  R(x, SCORPIO.steelHi, w.x0 - 13 * P, top - 3 * P, 3 * P, 4 * P); R(x, SCORPIO.steelHi, w.x1 + 10 * P, top - 3 * P, 3 * P, 4 * P)
}

// ─────────────────────────────────────────────── the four rooms
function bedroom(x, t, o) {
  const win = { x0: 380, y0: 560, x1: 700, y1: 880 }
  windowAt(x, t, win, { ...o, open: o.ep === '3am' ? 0.7 : 0.5 })
  // the corkboard (left, over the bed)
  const cork = drawCorkboard(x, t, 60, 560, 250, 220, o.board || (o.ep === 'crew' ? friendsBoard : null))
  // the bed: black frame, red sheets, two black pillows
  const bx = 40, bw = 430
  block(x, bx, 1000, bw, 140, '#241622', { hi: '#3a2434' })
  block(x, bx + 30, 1100, 170, 54, '#2e2232', { lo: '#1e141e' }); block(x, bx + 230, 1100, 170, 54, '#2e2232', { lo: '#1e141e' })
  block(x, bx - 10, 1154, bw + 20, 130, SCORPIO.velvet, { hi: SCORPIO.velvetHi, lo: SCORPIO.velvetLo })
  for (let k = 0; k < 6; k++) R(x, SCORPIO.velvetLo, bx + 10 + k * 72, 1186, 36, P)
  R(x, INK, bx, 1290, 3 * P, 36); R(x, INK, bx + bw - 3 * P, 1290, 3 * P, 36)
  // the nightstand (right): candle + lava lamp
  block(x, 800, 1060, 220, 180, SCORPIO.wood, { hi: '#5a3440', lo: SCORPIO.woodLo })
  R(x, INK, 800, 1140, 220, P); R(x, SCORPIO.steelHi, 900, 1100, 20, P)
  const cand = drawCandle(x, t, 850, 1060, 5, o.candle ?? CANDLE[o.ep] ?? 1, LIT[o.ep])
  const lava = drawLavaLamp(x, t, 960, 1060, 5)
  if (o.ep === 'work' || o.ep === 'love' || o.ep === 'crew') drawPinkSock(x, 520, 1318, 5, { rot: 0.1 })
  return {
    win, stand: { x: 640, y: 1150 }, cork,
    lights: [{ x: lava.x, y: lava.y, r: 220, color: '#ff4f6e', a: 0.4 }, ...(LIT[o.ep] ? [{ x: cand.x, y: cand.y, r: 200, color: '#ffb347', a: 0.45 }] : [])],
    spots: { candle: cand, lava, bed: { x: 255, y: 1160 }, nightstand: { x: 910, y: 1060 }, drawer: { x: 910, y: 1180 } },
    ghost: [{ x: 800, y: 1120, from: 'right' }, { x: 310, y: 670, from: 'right' }],
  }
}
function kitchen(x, t, o) {
  const win = { x0: 400, y0: 600, x1: 680, y1: 840 }
  for (const cx0 of [40, 760]) {
    block(x, cx0, 560, 280, 220, '#2a1a2e', { hi: '#3e2844', lo: '#1a0e1c' })
    R(x, INK, cx0 + 137, 560, P, 220)
    R(x, SCORPIO.steelHi, cx0 + 120, 740, 12, P); R(x, SCORPIO.steelHi, cx0 + 148, 740, 12, P)
  }
  windowAt(x, t, win, { ...o, open: 0.6 })
  for (let ty = 920; ty < 1060; ty += 36) for (let tx = (ty / 36) % 2 ? 0 : 36; tx < 1080; tx += 72) R(x, SCORPIO.wainsHi, tx, ty, 66, 30)
  block(x, -10, 1060, 1100, 24, '#3a3040', { hi: '#5a4a60', lo: '#241c28' })
  R(x, '#1a0e1c', 0, 1090, 1080, HOME_FLOOR - 1090)
  for (let k = 0; k < 6; k++) { R(x, INK, k * 180, 1090, P, HOME_FLOOR - 1090); R(x, SCORPIO.steelHi, k * 180 + 80, 1120, 24, P) }
  // the espresso machine (black, of course) and the candle on the counter
  block(x, 110, 940, 120, 120, '#1a141e', { hi: '#3a3040', o: P }); R(x, SCORPIO.red, 128, 958, 14, 10); block(x, 150, 1020, 34, 34, '#2a2030', { o: 4 })
  const cand = drawCandle(x, t, 900, 1060, 5, o.candle ?? CANDLE[o.ep] ?? 1, LIT[o.ep])
  // the fridge magnet: a tiny corkboard
  return {
    win, stand: { x: 540, y: 1150 }, counter: 1060,
    lights: LIT[o.ep] ? [{ x: cand.x, y: cand.y, r: 200, color: '#ffb347', a: 0.45 }] : [],
    spots: { coffee: { x: 170, y: 1000 }, candle: cand },
    ghost: [{ x: 230, y: 990, from: 'left' }, { x: 760, y: 680, from: 'right' }],
  }
}
function desk(x, t, o) {
  const win = { x0: 90, y0: 560, x1: 380, y1: 840 }
  windowAt(x, t, win, { ...o, open: 0.45 })
  const cork = drawCorkboard(x, t, 470, 520, 400, 330, o.board || (o.ep === 'crew' ? friendsBoard : null))
  block(x, 470, 1080, 590, 26, SCORPIO.wood, { hi: '#5a3440', lo: SCORPIO.woodLo })
  R(x, INK, 500, 1112, 3 * P, HOME_FLOOR - 1112); R(x, INK, 1010, 1112, 3 * P, HOME_FLOOR - 1112)
  block(x, 620, 960, 240, 120, '#1a141e', { hi: '#3a3040' }); R(x, '#3a2a4e', 632, 972, 216, 90); block(x, 580, 1068, 320, 12, '#4a4058', { o: 4 })
  const lava = drawLavaLamp(x, t, 960, 1080, 5)
  block(x, 260, 1040, 120, 120, '#241622', { hi: '#3a2434', lo: '#160c14' }); block(x, 250, 1160, 140, 24, '#160c14', { o: P })
  R(x, INK, 300, 1190, P * 2, HOME_FLOOR - 1190 + 40)
  return {
    win, stand: { x: 420, y: 1150 }, cork,
    lights: [{ x: lava.x, y: lava.y, r: 200, color: '#ff4f6e', a: 0.35 }],
    spots: { laptop: { x: 740, y: 1020 }, lava, chair: { x: 320, y: 1100 } },
    ghost: [{ x: 870, y: 700, from: 'left' }, { x: 620, y: 1010, from: 'right' }],
  }
}
function windowRoom(x, t, o) {
  const win = { x0: 150, y0: 520, x1: 930, y1: 1100 }
  windowAt(x, t, win, { ...o, open: o.ep === '3am' ? 0.85 : 0.6 })
  const sill = win.y1 + 2 * P
  const cand = drawCandle(x, t, 250, sill, 6, o.candle ?? CANDLE[o.ep] ?? 1, LIT[o.ep])
  if (o.ep === '3am') drawPinkSock(x, 860, sill - 14, 5)
  return {
    win, stand: { x: 540, y: 1180 }, sill,
    lights: LIT[o.ep] ? [{ x: cand.x, y: cand.y, r: 240, color: '#ffb347', a: 0.5 }] : [],
    spots: { candle: cand, sock: { x: 860, y: sill - 14 } },
    ghost: [{ x: 150 - 9 * P, y: 760, from: 'left' }],
  }
}
const ROOMS = { bedroom, kitchen, desk, window: windowRoom }

/** the whole frame: see the API above */
export function drawScorpioHome(x, t, { room = 'bedroom', ep = 'am', dark = 0, sky = null, hour = 8, glows = [], board = null, candle = null } = {}) {
  x.save()
  wall(x); floor(x)
  const a = (ROOMS[room] || bedroom)(x, t, { ep, sky, hour, board, candle })
  x.restore()
  const d = clamp(dark)
  if (d > 0) {
    x.save()
    x.beginPath(); x.rect(0, 0, 1080, 1920); x.rect(a.win.x0, a.win.y1, a.win.x1 - a.win.x0, a.win.y0 - a.win.y1); x.clip('evenodd')
    x.fillStyle = `rgba(8,6,28,${0.8 * d})`; x.fillRect(0, 0, 1080, 1920)
    x.restore()
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.14 * d
    x.fillStyle = '#9fb4ff'
    x.beginPath(); x.moveTo(a.win.x0 + 60, a.win.y1); x.lineTo(a.win.x1 - 60, a.win.y1); x.lineTo(a.win.x1 + 100, 1700); x.lineTo(a.win.x0 + 80, 1700); x.fill()
    x.restore()
  }
  // the room's own lights (lava lamp, candle) glow always; brighter in the dark
  for (const g of [...(a.lights || []).map(l => ({ ...l, a: l.a * (0.45 + 0.55 * d) })), ...glows]) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const gr = x.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r)
    gr.addColorStop(0, hexA(g.color, g.a ?? 0.5)); gr.addColorStop(1, hexA(g.color, 0))
    x.fillStyle = gr; x.fillRect(g.x - g.r, g.y - g.r, 2 * g.r, 2 * g.r); x.restore()
  }
  return { floor: HOME_FLOOR, ...a }
}
function hexA(h, a) {
  const n = parseInt(h.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}
