// st9librahome — Libra's home in Star Talk season 9, "A Day in the Life" (promo/films/STARTALK10.md). Drawn once here and
// reused by Libra's five episodes (st9libraam · work · love · crew · 3am) so the set reads as one apartment.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { LIBRA, HOME_FLOOR, drawLibraHome, drawLibraScale, drawLibraVases, drawLibraMirror } from '../../st9librahome.js'
//
// drawLibraHome(ctx, t, { room = 'bedroom', ep = 'am', dark = 0, sky = null, hour = 8, glows = [], tilt = null }) → anchors
//   Paints the whole 1080 × 1920 frame: wall, window (with the sky through it), furniture, floor. Draw it first (after
//   any full-frame sky you want behind nothing: the room is opaque except the window).
//     room   'bedroom' | 'kitchen' | 'desk' | 'window'  (the window room is the close-up of the bedroom window + its sill)
//     ep     'am' | 'work' | 'love' | 'crew' | '3am'    picks the episode's tiny change (see below)
//     dark   0…1: lights off. The room sinks to indigo; the window sky, the lamp and `glows` stay bright.
//     sky    (ctx, win) => void  paints inside the window clip (win = { x0, y0, x1, y1 }). Default: a plain sky by `hour`
//            (pass `sky: c => { drawSky(c, t, SKY_H); daySky(c, t, { hour }) }` for the season's sky).
//     hour   0…24, only for the default sky.
//     glows  [{ x, y, r, color, a }] extra light pools added on top of the dark (a phone screen, a candle).
//     tilt   override the brass scale's tilt (−1 left pan down … 1 right pan down); default per episode.
//   Returns anchors: { floor, win: {x0,y0,x1,y1}, stand: {x, y} (where a hero star stands), spots: {…named props…},
//     ghost: [{ x, y, from }] (edges the ghost can hide behind; draw drawGhostCameo AFTER this call) }.
//
// The three recurring props (all sit in Libra's colours, rose-plum + mint, everything in pairs):
//   1. the brass balance scale (drawLibraScale): on the bedroom shelf, the desk and the window sill.
//   2. the twin vases (drawLibraVases): one rose, one mint, always the same number of flowers… almost.
//   3. the tall gold mirror (drawLibraMirror): bedroom, where every outfit gets judged.
// The tiny change per episode (binge reward): the flowers.
//   am    one bud in each vase, closed          work  two each, opening
//   love  three each, full bloom (Aries' bouquet split fairly)
//   crew  a friend adds one to the rose vase: 4 vs 3, and the brass scale on the shelf tips toward it
//   3am   lights off; three each again (Libra moved one over), one petal on the floor
// Pure f(t): nothing touches `document`; safe in node.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp } from '../src/lib.js'

export const LIBRA = {
  color: '#e163d6', glyph: '♎',
  wallTop: '#2c1a3a', wall: '#45294f', wallHi: '#56345f', stripe: '#4d2f58',
  wains: '#5a3866', wainsHi: '#6d4679', trim: '#e8c27a', trimLo: '#a9823f',
  floor: '#5b3a52', floorHi: '#6a4660', floorLo: '#472c40',
  rose: '#ff8fc8', roseLo: '#c95a9a', mint: '#8fe3c8', mintLo: '#4fa98e',
  brass: '#f0c66a', brassHi: '#fff0b8', brassLo: '#a97f33', wood: '#8a5a6a', woodLo: '#5e3a4a',
}
const INK = '#1b1236', BONE = '#efe6d6'
export const HOME_FLOOR = 1240
const P = 6                        // the pixel grid for furniture

const rr = Math.round
function R(x, c, X, Y, W, H) { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
/** an ink-outlined block with a top highlight and a bottom shade */
function block(x, X, Y, W, H, c, { hi = null, lo = null, o = P } = {}) {
  R(x, INK, X - o, Y - o, W + 2 * o, H + 2 * o)
  R(x, c, X, Y, W, H)
  if (hi) R(x, hi, X, Y, W, P)
  if (lo) R(x, lo, X, Y + H - P, W, P)
}

// ─────────────────────────────────────────────── the props
const FLOWERS = { am: [1, 1, 0.1], work: [2, 2, 0.55], love: [3, 3, 1], crew: [4, 3, 1], '3am': [3, 3, 0.9] }
const TILT = { am: 0, work: 0, love: 0, crew: -0.35, '3am': 0 }

/** the brass balance scale, centred on its base at (cx, base). c = cell. tilt −1…1 (−1: left pan down). */
export function drawLibraScale(x, t, cx, base, c = 6, tilt = 0, { left = null, right = null } = {}) {
  const H = 26 * c, beamY = base - H, arm = 13 * c
  const a = clamp(tilt, -1, 1) * 0.32 + 0.025 * Math.sin(t * 2.1)
  // base + post
  block(x, cx - 6 * c, base - 2 * c, 12 * c, 2 * c, LIBRA.brass, { lo: LIBRA.brassLo, o: c })
  block(x, cx - c, beamY, 2 * c, H - 2 * c, LIBRA.brass, { o: c })
  R(x, LIBRA.brassHi, cx - c, beamY + c, c * 0.8, H - 4 * c)
  // pivot jewel
  block(x, cx - 1.5 * c, beamY - 3 * c, 3 * c, 3 * c, LIBRA.rose, { o: c })
  const ends = [-1, 1].map(s => ({ x: cx + Math.cos(a) * arm * s, y: beamY + Math.sin(a) * arm * s }))
  // the beam (rotated)
  x.save(); x.translate(cx, beamY); x.rotate(a)
  R(x, INK, -arm - c, -c * 1.5, 2 * arm + 2 * c, c * 3)
  R(x, LIBRA.brass, -arm, -c * 0.5, 2 * arm, c); x.restore()
  // the chains + pans (pans hang straight down)
  ends.forEach((e, i) => {
    const py = e.y + 9 * c
    x.fillStyle = LIBRA.brassLo
    for (let k = 1; k < 9; k += 2) { x.fillRect(rr(e.x - 3 * c + k * 0.35 * c), rr(e.y + k * c), c * 0.8, c * 0.8); x.fillRect(rr(e.x + 3 * c - k * 0.35 * c), rr(e.y + k * c), c * 0.8, c * 0.8) }
    block(x, e.x - 4.5 * c, py, 9 * c, c * 1.4, LIBRA.brass, { o: c })
    R(x, INK, e.x - 3 * c, py + 1.4 * c, 6 * c, c)
    const item = i === 0 ? left : right
    if (item) item(x, e.x, py - c * 0.5)
  })
  return { ends, pans: ends.map(e => ({ x: e.x, y: e.y + 9 * c })) }
}

/** the twin vases on a surface at y = base, centred at cx. n = [rose, mint] flower counts, bloom 0…1 */
export function drawLibraVases(x, t, cx, base, c = 5, n = [1, 1], bloom = 1, { gap = 30 } = {}) {
  const vase = (vx, col, lo, k, seed) => {
    // stems first (behind the vase mouth)
    for (let i = 0; i < k; i++) {
      const sp = k === 1 ? 0 : (i / (k - 1) - 0.5) * 2, sway = Math.sin(t * 1.3 + i * 1.7 + seed) * c * 0.4
      const fx = vx + sp * 4 * c + sway, fy = base - 15 * c - (i % 2) * 2 * c
      x.fillStyle = '#4f8f5a'
      for (let j = 0; j < 8; j++) x.fillRect(rr(lerp(vx + sp * c, fx, j / 8)), rr(lerp(base - 9 * c, fy, j / 8)), c, c)
      const s = rr(lerp(1, 3, bloom))
      const fc = i % 2 ? col : BONE
      R(x, INK, fx - s * c / 2 - c, fy - s * c / 2 - c, s * c + 2 * c, s * c + 2 * c)
      R(x, bloom < 0.3 ? '#6fbf6a' : fc, fx - s * c / 2, fy - s * c / 2, s * c, s * c)
      if (bloom > 0.5) R(x, LIBRA.brass, fx - c / 2, fy - c / 2, c, c)
    }
    block(x, vx - 3 * c, base - 9 * c, 6 * c, 9 * c, col, { lo, o: c })
    R(x, col, vx - 2 * c, base - 10 * c, 4 * c, c)
    R(x, 'rgba(255,255,255,0.45)', vx - 2 * c, base - 7 * c, c, 3 * c)
  }
  vase(cx - gap, LIBRA.rose, LIBRA.roseLo, n[0], 0.3)
  vase(cx + gap, LIBRA.mint, LIBRA.mintLo, n[1], 1.9)
}

/** the tall gold mirror standing on the floor. (x0, y0) top-left, w × h. Returns the glass rect. */
export function drawLibraMirror(x, t, x0, y0, w, h, { glass = null } = {}) {
  block(x, x0, y0, w, h, LIBRA.brass, { hi: LIBRA.brassHi, lo: LIBRA.brassLo })
  // arched top
  R(x, INK, x0 + 2 * P, y0 - 3 * P, w - 4 * P, 3 * P); R(x, LIBRA.brass, x0 + 3 * P, y0 - 2 * P, w - 6 * P, 2 * P)
  const g = { x0: x0 + 2 * P, y0: y0 + 2 * P, x1: x0 + w - 2 * P, y1: y0 + h - 2 * P }
  const gr = x.createLinearGradient(g.x0, g.y0, g.x1, g.y1)
  gr.addColorStop(0, '#b9c6ee'); gr.addColorStop(0.5, '#8a8fc9'); gr.addColorStop(1, '#6a5f9e')
  x.fillStyle = gr; x.fillRect(g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0)
  if (glass) { x.save(); x.beginPath(); x.rect(g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0); x.clip(); glass(x, g); x.restore() }
  // the shine: two diagonal stripes that slide slowly
  x.save(); x.beginPath(); x.rect(g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0); x.clip()
  const off = ((t * 40) % (h * 1.4)) - h * 0.2
  x.globalAlpha = 0.35; x.fillStyle = '#ffffff'
  x.beginPath(); x.moveTo(g.x0, g.y0 + off); x.lineTo(g.x1, g.y0 + off - w * 0.8); x.lineTo(g.x1, g.y0 + off - w * 0.8 + 18); x.lineTo(g.x0, g.y0 + off + 18); x.fill()
  x.beginPath(); x.moveTo(g.x0, g.y0 + off + 40); x.lineTo(g.x1, g.y0 + off + 40 - w * 0.8); x.lineTo(g.x1, g.y0 + off + 48 - w * 0.8); x.lineTo(g.x0, g.y0 + off + 48); x.fill()
  x.restore()
  // feet
  R(x, INK, x0 + P, y0 + h + P, 3 * P, 3 * P); R(x, INK, x0 + w - 4 * P, y0 + h + P, 3 * P, 3 * P)
  return g
}

// ─────────────────────────────────────────────── the shell: wall, floor, window
function wall(x) {
  const g = x.createLinearGradient(0, 0, 0, HOME_FLOOR)
  g.addColorStop(0, LIBRA.wallTop); g.addColorStop(0.42, LIBRA.wall); g.addColorStop(1, LIBRA.wallHi)
  x.fillStyle = g; x.fillRect(0, 0, 1080, HOME_FLOOR)
  // paired pinstripes (everything in twos)
  x.fillStyle = LIBRA.stripe
  for (let sx = 36; sx < 1080; sx += 120) { x.fillRect(sx, 0, P, 1000); x.fillRect(sx + 2 * P, 0, P, 1000) }
  // wainscot + gold trim
  R(x, LIBRA.trimLo, 0, 996, 1080, P); R(x, LIBRA.trim, 0, 990, 1080, P)
  R(x, LIBRA.wains, 0, 1002, 1080, HOME_FLOOR - 1002)
  for (let px = 30; px < 1080; px += 210) { R(x, LIBRA.wainsHi, px, 1032, 168, P); R(x, LIBRA.wainsHi, px, 1032, P, 168); R(x, INK, px, 1200, 168, P * 0.5) }
  R(x, INK, 0, HOME_FLOOR - P, 1080, P)
}
function floor(x) {
  const g = x.createLinearGradient(0, HOME_FLOOR, 0, 1920)
  g.addColorStop(0, LIBRA.floorLo); g.addColorStop(1, LIBRA.floor)
  x.fillStyle = g; x.fillRect(0, HOME_FLOOR, 1080, 1920 - HOME_FLOOR)
  // herringbone, flattened: staggered plank seams that widen toward you
  let row = 0
  for (let y = HOME_FLOOR + 14; y < 1920; y += 16 + row * 6, row++) {
    x.fillStyle = row % 2 ? LIBRA.floorHi : LIBRA.floorLo; x.fillRect(0, y, 1080, 3)
    const step = 90 + row * 22
    for (let sx = (row % 2) * step / 2; sx < 1080; sx += step) x.fillRect(rr(sx), y - 12 - row * 3, 3, 12 + row * 3)
  }
  // a round rug, in front, two-tone
  x.save(); x.translate(540, 1420); x.scale(1, 0.22)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 400, 0, Math.PI * 2); x.fill()
  x.fillStyle = LIBRA.roseLo; x.beginPath(); x.arc(0, 0, 388, Math.PI / 2, Math.PI * 1.5); x.fill()
  x.fillStyle = LIBRA.mintLo; x.beginPath(); x.arc(0, 0, 388, -Math.PI / 2, Math.PI / 2); x.fill()
  x.fillStyle = LIBRA.trim; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.restore()
}
function defaultSky(x, w, hour) {
  const h = ((hour % 24) + 24) % 24
  const pal = h < 5 || h >= 21 ? ['#0b0a2e', '#1d1650'] : h < 8 ? ['#f7b58f', '#a98fd8'] : h < 17 ? ['#9fd0f5', '#d8ecfa'] : ['#7b4fa8', '#f39ab6']
  const g = x.createLinearGradient(0, w.y0, 0, w.y1); g.addColorStop(0, pal[0]); g.addColorStop(1, pal[1])
  x.fillStyle = g; x.fillRect(w.x0, w.y0, w.x1 - w.x0, w.y1 - w.y0)
  const night = h < 5 || h >= 20 ? 1 : h < 7 || h >= 18 ? 0.4 : 0.08
  x.fillStyle = '#fff6dc'
  for (let i = 0; i < 40; i++) {
    const sx = w.x0 + ((i * 97.3) % 1) * 0 + ((i * 157) % (w.x1 - w.x0)), sy = w.y0 + ((i * 83) % (w.y1 - w.y0))
    x.globalAlpha = night * (0.4 + 0.6 * ((i * 7) % 5) / 4); x.fillRect(sx, sy, i % 3 ? 3 : 6, i % 3 ? 3 : 6)
  }
  x.globalAlpha = 1
}
/** the window: sky inside a clip, then mullions, curtains, sill */
function windowAt(x, t, w, { sky, hour, curtains = true, sill = true }) {
  R(x, INK, w.x0 - 3 * P, w.y0 - 3 * P, w.x1 - w.x0 + 6 * P, w.y1 - w.y0 + 6 * P)
  x.save(); x.beginPath(); x.rect(w.x0, w.y0, w.x1 - w.x0, w.y1 - w.y0); x.clip()
  if (sky) sky(x, w); else defaultSky(x, w, hour)
  x.restore()
  // frame + cross mullions
  const fc = BONE, mx = (w.x0 + w.x1) / 2, my = (w.y0 + w.y1) / 2
  R(x, fc, w.x0 - 2 * P, w.y0 - 2 * P, w.x1 - w.x0 + 4 * P, 2 * P); R(x, fc, w.x0 - 2 * P, w.y1, w.x1 - w.x0 + 4 * P, 2 * P)
  R(x, fc, w.x0 - 2 * P, w.y0, 2 * P, w.y1 - w.y0); R(x, fc, w.x1, w.y0, 2 * P, w.y1 - w.y0)
  R(x, fc, mx - P, w.y0, 2 * P, w.y1 - w.y0); R(x, fc, w.x0, my - P, w.x1 - w.x0, 2 * P)
  if (sill) block(x, w.x0 - 5 * P, w.y1 + 2 * P, w.x1 - w.x0 + 10 * P, 3 * P, LIBRA.trim, { hi: '#ffe3a8', lo: LIBRA.trimLo })
  if (curtains) {
    // a rose curtain left, a mint one right: tied back, symmetric
    const cw = 13 * P
    for (const [cx0, col, lo, dir] of [[w.x0 - 6 * P - cw + 4 * P, LIBRA.rose, LIBRA.roseLo, 1], [w.x1 + 6 * P - 4 * P, LIBRA.mint, LIBRA.mintLo, -1]]) {
      R(x, INK, cx0 - P, w.y0 - 6 * P, cw + 2 * P, w.y1 - w.y0 + 14 * P)
      R(x, col, cx0, w.y0 - 5 * P, cw, w.y1 - w.y0 + 12 * P)
      for (let k = 1; k < 4; k++) R(x, lo, cx0 + k * 3 * P, w.y0 - 5 * P, P, w.y1 - w.y0 + 12 * P)
      R(x, LIBRA.trim, cx0 - P, my + 4 * P, cw + 2 * P, 2 * P)     // the tie-back
      void dir
    }
    R(x, INK, w.x0 - 22 * P, w.y0 - 8 * P, w.x1 - w.x0 + 44 * P, 2 * P)   // the rod
    R(x, LIBRA.brass, w.x0 - 23 * P, w.y0 - 9 * P, 3 * P, 4 * P); R(x, LIBRA.brass, w.x1 + 20 * P, w.y0 - 9 * P, 3 * P, 4 * P)
  }
}

// ─────────────────────────────────────────────── the four rooms
function bedroom(x, t, o) {
  const win = { x0: 360, y0: 560, x1: 720, y1: 900 }
  windowAt(x, t, win, o)
  // the shelf (left) with the scale and the vases
  block(x, 60, 800, 260, 3 * P, LIBRA.wood, { hi: '#a87888', lo: LIBRA.woodLo })
  R(x, INK, 90, 818, P, 24); R(x, INK, 284, 818, P, 24)
  const fl = FLOWERS[o.ep] || FLOWERS.am
  drawLibraScale(x, t, 128, 800, 4, o.tilt ?? TILT[o.ep] ?? 0)
  drawLibraVases(x, t, 250, 800, 4, fl, fl[2], { gap: 24 })
  // the bed (left, low): scalloped rose headboard, two pillows (one of each), a duvet
  const bx = 40, bw = 430
  block(x, bx, 1010, bw, 130, LIBRA.rose, { hi: '#ffc2e2', lo: LIBRA.roseLo })
  for (let k = 0; k < 4; k++) { R(x, INK, bx + 20 + k * 104, 1000, 72, P); R(x, LIBRA.rose, bx + 26 + k * 104, 1004, 60, P) }
  block(x, bx + 30, 1110, 170, 54, BONE, { lo: '#cfc4b4' }); block(x, bx + 230, 1110, 170, 54, LIBRA.mint, { lo: LIBRA.mintLo })
  block(x, bx - 10, 1164, bw + 20, 120, '#b3a0e0', { hi: '#d4c8f5', lo: '#8a78c0' })
  for (let k = 0; k < 6; k++) R(x, '#9d8ad0', bx + 10 + k * 72, 1190, 36, P)
  R(x, INK, bx, 1290, 3 * P, 36); R(x, INK, bx + bw - 3 * P, 1290, 3 * P, 36)
  // the lamp on the shelf's end: a pink shade
  const lamp = { x: 296, y: 760 }
  block(x, lamp.x - 18, lamp.y - 6, 36, 30, '#ffd1e8', { lo: '#e9a3c8', o: 4 })
  R(x, INK, lamp.x - 3, lamp.y + 24, 6, 16)
  // the mirror (right)
  const m = drawLibraMirror(x, t, 820, 700, 190, 560)
  return {
    win, stand: { x: 640, y: 1150 }, lamp: { x: lamp.x, y: lamp.y + 8, r: 260 },
    spots: { shelf: { x: 190, y: 800 }, scale: { x: 128, y: 800 }, vases: { x: 250, y: 800 }, bed: { x: 255, y: 1160 }, mirror: m, mirrorBox: { x0: 820, y0: 700, x1: 1010, y1: 1260 } },
    ghost: [{ x: 820, y: 1040, from: 'right' }, { x: 255, y: 1010, from: 'below' }],
  }
}
function kitchen(x, t, o) {
  const win = { x0: 380, y0: 600, x1: 700, y1: 860 }
  // upper cabinets either side of the window
  for (const cx0 of [40, 760]) {
    block(x, cx0, 560, 280, 220, LIBRA.mint, { hi: '#c4f3e3', lo: LIBRA.mintLo })
    R(x, INK, cx0 + 137, 560, P, 220)
    R(x, LIBRA.brass, cx0 + 120, 740, 12, P); R(x, LIBRA.brass, cx0 + 148, 740, 12, P)
  }
  windowAt(x, t, win, { ...o, curtains: false })
  const fl = FLOWERS[o.ep] || FLOWERS.am
  drawLibraVases(x, t, 540, win.y1 + 12, 4, fl, fl[2], { gap: 40 })
  // backsplash tiles
  for (let ty = 920; ty < 1060; ty += 36) for (let tx = (ty / 36) % 2 ? 0 : 36; tx < 1080; tx += 72) R(x, LIBRA.wainsHi, tx, ty, 66, 30)
  // the counter, wall to wall, with base cabinets
  block(x, -10, 1060, 1100, 24, BONE, { hi: '#fffaf0', lo: '#cfc4b4' })
  R(x, LIBRA.roseLo, 0, 1090, 1080, HOME_FLOOR - 1090)
  for (let k = 0; k < 6; k++) { R(x, INK, k * 180, 1090, P, HOME_FLOOR - 1090); R(x, LIBRA.brass, k * 180 + 80, 1120, 24, P) }
  // the coffee machine (left) and a kettle (right): one of each
  block(x, 110, 950, 110, 110, '#3e3a5a', { hi: '#5a5680', o: P }); R(x, '#ff8fb1', 130, 970, 16, 10); block(x, 150, 1020, 34, 34, BONE, { o: 4 })
  block(x, 860, 990, 90, 70, LIBRA.rose, { hi: '#ffc2e2', lo: LIBRA.roseLo }); R(x, INK, 840, 1000, 24, P); R(x, INK, 880, 976, 50, P)
  return {
    win, stand: { x: 540, y: 1150 }, counter: 1060, lamp: null,
    spots: { coffee: { x: 165, y: 1000 }, kettle: { x: 905, y: 1020 }, vases: { x: 540, y: win.y1 + 12 } },
    ghost: [{ x: 860, y: 1000, from: 'left' }, { x: 320, y: 700, from: 'left' }],
  }
}
function desk(x, t, o) {
  const win = { x0: 90, y0: 560, x1: 400, y1: 860 }
  windowAt(x, t, win, { ...o, curtains: false })
  // the wall calendar (right of the window): a month grid with a rose ring round today
  const cal = { x0: 520, y0: 560, x1: 760, y1: 820 }
  block(x, cal.x0, cal.y0, cal.x1 - cal.x0, cal.y1 - cal.y0, BONE, { o: P })
  R(x, LIBRA.rose, cal.x0, cal.y0, cal.x1 - cal.x0, 40)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) R(x, '#cfc4b4', cal.x0 + 14 + c * 37, cal.y0 + 60 + r * 46, 28, 34)
  R(x, INK, cal.x0 + 106, cal.y0 - 14, P, 20)
  // the shelf above the desk with the scale
  block(x, 820, 700, 220, 3 * P, LIBRA.wood, { hi: '#a87888', lo: LIBRA.woodLo })
  drawLibraScale(x, t, 930, 700, 4, o.tilt ?? TILT[o.ep] ?? 0)
  // the desk (right half): top, legs, a laptop, the vases
  block(x, 470, 1080, 590, 26, LIBRA.wood, { hi: '#a87888', lo: LIBRA.woodLo })
  R(x, INK, 500, 1112, 3 * P, HOME_FLOOR - 1112); R(x, INK, 1010, 1112, 3 * P, HOME_FLOOR - 1112)
  block(x, 640, 960, 240, 120, '#3e3a5a', { hi: '#5a5680' }); R(x, '#9fd0f5', 652, 972, 216, 90); block(x, 600, 1068, 320, 12, '#8d89b0', { o: 4 })
  const fl = FLOWERS[o.ep] || FLOWERS.am
  drawLibraVases(x, t, 980, 1080, 4, fl, fl[2], { gap: 22 })
  // the chair (left, empty): mint, its back to the window
  block(x, 260, 1040, 120, 120, LIBRA.mint, { hi: '#c4f3e3', lo: LIBRA.mintLo }); block(x, 250, 1160, 140, 24, LIBRA.mintLo, { o: P })
  R(x, INK, 300, 1190, P * 2, HOME_FLOOR - 1190 + 40)
  return {
    win, stand: { x: 420, y: 1150 }, lamp: null, cal,
    spots: { laptop: { x: 760, y: 1020 }, scale: { x: 930, y: 700 }, vases: { x: 980, y: 1080 }, chair: { x: 320, y: 1100 } },
    ghost: [{ x: 760, y: 700, from: 'right' }, { x: 640, y: 1000, from: 'right' }],
  }
}
function windowRoom(x, t, o) {
  const win = { x0: 130, y0: 520, x1: 950, y1: 1110 }
  windowAt(x, t, win, o)
  const fl = FLOWERS[o.ep] || FLOWERS.am
  const sill = win.y1 + 2 * P
  drawLibraScale(x, t, 240, sill, 5, o.tilt ?? TILT[o.ep] ?? 0)
  drawLibraVases(x, t, 850, sill, 5, fl, fl[2], { gap: 34 })
  return {
    win, stand: { x: 540, y: 1180 }, sill, lamp: null,
    spots: { scale: { x: 240, y: sill }, vases: { x: 850, y: sill } },
    ghost: [{ x: 130 - 6 * P, y: 760, from: 'left' }],
  }
}
const ROOMS = { bedroom, kitchen, desk, window: windowRoom }

/** the whole frame: see the API above */
export function drawLibraHome(x, t, { room = 'bedroom', ep = 'am', dark = 0, sky = null, hour = 8, glows = [], tilt = null } = {}) {
  x.save()
  wall(x); floor(x)
  const o = { ep, sky, hour, tilt }
  const a = (ROOMS[room] || bedroom)(x, t, o)
  // the dropped petal (3 AM only)
  if (ep === '3am') { R(x, INK, 706, 1316, 30, 18); R(x, LIBRA.rose, 712, 1320, 18, 10) }
  x.restore()
  // lights off: indigo over everything except the window
  const d = clamp(dark)
  if (d > 0) {
    x.save()
    x.beginPath(); x.rect(0, 0, 1080, 1920); x.rect(a.win.x0, a.win.y1, a.win.x1 - a.win.x0, a.win.y0 - a.win.y1); x.clip('evenodd')
    x.fillStyle = `rgba(10,8,34,${0.78 * d})`; x.fillRect(0, 0, 1080, 1920)
    x.restore()
    // moonlight spills through the window onto the floor
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.16 * d
    x.fillStyle = '#9fb4ff'
    x.beginPath(); x.moveTo(a.win.x0, a.win.y1); x.lineTo(a.win.x1, a.win.y1); x.lineTo(a.win.x1 + 160, 1700); x.lineTo(a.win.x0 + 40, 1700); x.fill()
    x.restore()
  }
  const lights = [...glows]
  if (a.lamp && d > 0) lights.push({ ...a.lamp, color: '#ffb8dc', a: 0.55 * d })
  for (const g of lights) {
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
