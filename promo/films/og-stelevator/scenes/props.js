// stelevator props — the pixel prop kit for "Stuck." (two stars in an elevator), kept inside this film's folder.
// Pure functions of their arguments (and t); nothing touches `document` at module top level.
//   starFrame / inSprite / cellToWorld (mirror startalk.js) · tearsCells · bmp · confetti / sparkBurst / drawHearts / sweatDrop ·
//   pixelPanel · drawShaft / drawCables / drawRoof / drawCar / drawFrame / drawFloorDisplay / drawButtons / drawDoors ·
//   drawNotes (muzak) · drawChip · drawPlan (thought bubble + laminated plan) · drawViolin · drawBanner · drawMysteryCard · speedLines
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const G = 36, HALF = 18
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', MINT = '#7dffb0'
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ───────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar)
const SC = { x: HALF, y: 19.6, R: 17.6, r: 9.4, round: 2.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)
function hopState(t, hops) {
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
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** sprite cell → world point (follows squash at the anchor row) */
export const cellToWorld = (F, i, j) => [F.ox + (i - HALF) * F.cell * F.sx, F.oy + (j - HALF) * F.cell * F.sy - F.base * F.sy]

/** tears from both eyes (cells). k: 0 none · 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let x, y
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}

// ───────────────────────────────────────── bitmaps
export const BM = s => s.trim().split(/\s+/)
export function bmp(ctx, rows, x, y, px, pal, { rot = 0, ax = 0.5, ay = 0.5, outline = null, alpha = 1, flip = false } = {}) {
  if (alpha <= 0) return
  const w = rows[0].length, h = rows.length
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(x, y); if (rot) ctx.rotate(rot); if (flip) ctx.scale(-1, 1)
  const ox = -w * px * ax, oy = -h * px * ay, c = px + 0.5
  if (outline) {
    ctx.fillStyle = outline
    rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) {
      if (row[i] === '.' || !pal[row[i]]) continue
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const r2 = rows[j + b], ch2 = r2 ? r2[i + a] : undefined; if (!ch2 || ch2 === '.' || !pal[ch2]) ctx.fillRect(ox + (i + a) * px, oy + (j + b) * px, c, c) }
    } })
  }
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const col = pal[row[i]]; if (!col) continue; ctx.fillStyle = col; ctx.fillRect(ox + i * px, oy + j * px, c, c) } })
  ctx.restore()
}
const HEART = BM(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#ff6b5b', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 5.5 } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > life) return
  const r = rng(seed * 977 + 3), k = 1.5, vty = 330
  for (let i = 0; i < n; i++) {
    const delay = r() * 0.18, vx0 = (r() - 0.5) * 2100 * spread, vy0 = -(1500 + r() * 1300) * up, spin = 4 + r() * 9, sz = 12 + r() * 12, col = CONF_COLS[Math.floor(r() * CONF_COLS.length)], ph = r() * TAU, sway = 30 + r() * 50
    const dt = dt0 - delay
    if (dt < 0) continue
    const e = (1 - Math.exp(-k * dt)) / k, xx = x0 + vx0 * e + Math.sin(dt * 3 + ph) * sway * clamp(dt), yy = y0 + vty * dt + (vy0 - vty) * e
    if (yy > 2000) continue
    ctx.save(); ctx.globalAlpha = clamp((life - dt0) / 0.6); ctx.translate(xx, yy); ctx.rotate(ph + dt * spin * 0.4); ctx.scale(Math.cos(dt * spin + ph), 1)
    ctx.fillStyle = col; ctx.fillRect(-sz / 2, -sz * 0.35, sz, sz * 0.7); ctx.restore()
  }
}
export function sparkBurst(ctx, t, cx, cy, t0, { n = 12, R = 200, size = 28, seed = 1, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'], life = 0.7 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed, rr = R * (0.45 + 0.75 * p) * (i % 2 ? 0.8 : 1); drawPixelStar(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, size * (1 - 0.45 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  ctx.restore()
}
export function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 140, life = 1.6, rise = 260, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1, loop = false } = {}) {
  for (let i = 0; i < n; i++) {
    let k = (t - t0 - i * 0.18) / life
    if (loop && k > 0) k = k % 1
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx, y - k * rise, px, { X: cols[i % cols.length] }, { alpha: alpha * Math.sin(Math.PI * k), outline: INK })
  }
}
/** grey smoke puffs (a scorched hat) */
export function smoke(ctx, t, x, y, px, k = 1) {
  if (k <= 0) return
  for (let s = 0; s < 4; s++) {
    const ph = (t * 0.9 + s * 0.25) % 1, sx = x + Math.sin(ph * 5 + s) * 3 * px, sy = y - ph * 14 * px, sz = px * (2 + ph * 3)
    ctx.save(); ctx.globalAlpha = k * Math.sin(Math.PI * ph) * 0.8
    ctx.fillStyle = INK; ctx.fillRect(sx - sz / 2 - px * 0.4, sy - sz / 2 - px * 0.4, sz + px * 0.8, sz + px * 0.8)
    ctx.fillStyle = '#8a8296'; ctx.fillRect(sx - sz / 2, sy - sz / 2, sz, sz)
    ctx.restore()
  }
}
const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
export function sweatDrop(ctx, t, x, y, px, alpha = 1) { const ph = (t * 1.4) % 1; bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#7fd0f0', W: '#ffffff' }, { alpha: alpha * (1 - ph * 0.6), outline: INK }) }

// ───────────────────────────────────────── panels + cards
const step = (ctx, X, Y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(X + 2 * P, Y, w - 4 * P, h); ctx.fillRect(X, Y + 2 * P, w, h - 4 * P); ctx.fillRect(X + P, Y + P, w - 2 * P, h - 2 * P) }
export function pixelPanel(ctx, X, Y, w, h, { P = 8, fill = 'rgba(13,8,32,0.94)', border = GOLD, glow = 0.5 } = {}) {
  ctx.save(); ctx.shadowColor = rgba(border, glow); ctx.shadowBlur = 30; step(ctx, X, Y, w, h, P, border); ctx.restore()
  step(ctx, X, Y, w, h, P, border)
  step(ctx, X + P, Y + P, w - 2 * P, h - 2 * P, P, INK)
  step(ctx, X + P * 1.5, Y + P * 1.5, w - 3 * P, h - 3 * P, P, fill)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(X + 2 * P, Y, P * 4, P / 2); ctx.fillRect(X, Y + 2 * P, P / 2, P * 3)
}
const CHECK = BM(`......X .....XX X...XX. XX.XX.. .XXX... ..X....`)

// ───────────────────────────────────────── the elevator
export const CAR = { x: 110, y: 470, w: 860, h: 930 }          // outer frame (bottom 1400)
const IN = { l: 150, r: 930, t: 560, b: 1360 }                   // the front opening
const BACK = { l: 250, r: 830, t: 600, b: 1250 }                 // the back wall
export const WIN = { l: 290, r: 790, t: 640, b: 1000 }           // the back window (a hole: the sky shows through)
const poly = (ctx, pts, col) => { ctx.beginPath(); pts.forEach(([a, b], i) => i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.closePath(); ctx.fillStyle = col; ctx.fill() }

/** the shaft outside the car: guide rails, the cables, floor beams scrolling past (scroll in px), labelled floors */
export function drawShaft(ctx, t, { scroll = 0, alpha = 1, blur = 0 } = {}) {
  ctx.save(); ctx.globalAlpha = alpha
  // floor beams (pass behind the car, seen through the window and at the sides)
  const GAP = 420
  for (let i = -1; i < 7; i++) {
    const base = ((scroll % GAP) + GAP) % GAP, y = -60 + i * GAP + base
    const n = Math.floor(scroll / GAP) - i + 13
    ctx.fillStyle = INK; ctx.fillRect(0, y - 4, 1080, 30)
    ctx.fillStyle = '#3a3160'; ctx.fillRect(0, y, 1080, 22)
    ctx.fillStyle = '#56497f'; ctx.fillRect(0, y, 1080, 5)
    for (let bx = 20; bx < 1080; bx += 90) { ctx.fillStyle = '#7a6cae'; ctx.fillRect(bx, y + 9, 6, 6) }
    if (blur > 0) { ctx.fillStyle = `rgba(122,108,174,${0.35 * blur})`; ctx.fillRect(0, y - 120 * blur, 1080, 120 * blur) }
    ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(239,230,214,0.55)'
    if (n > 0 && blur < 0.5) ctx.fillText(String(n), 24, y + 50)
  }
  // guide rails
  for (const rx of [74, 990]) { ctx.fillStyle = INK; ctx.fillRect(rx - 4, 0, 24, 1920); ctx.fillStyle = '#4b4170'; ctx.fillRect(rx, 0, 16, 1920); ctx.fillStyle = '#6d5fa0'; ctx.fillRect(rx, 0, 4, 1920) }
  ctx.restore()
}
/** the cables above the car (in front of the beams) */
export function drawCables(ctx, y0 = CAR.y) {
  for (const cx of [470, 610]) { ctx.fillStyle = INK; ctx.fillRect(cx - 5, 0, 10, y0); ctx.fillStyle = '#9a90bf'; ctx.fillRect(cx - 2, 0, 4, y0) }
  ctx.fillStyle = INK; ctx.fillRect(430, y0 - 30, 220, 34); ctx.fillStyle = '#6d5fa0'; ctx.fillRect(436, y0 - 26, 208, 24)
}
/** the sunset rooftop that the car arrives at (drawn behind the car; k 0…1) */
export function drawRoof(ctx, t, k) {
  if (k <= 0) return
  ctx.save(); ctx.globalAlpha = k
  const g = ctx.createLinearGradient(0, 200, 0, 1400)
  g.addColorStop(0, 'rgba(60,30,110,0.0)'); g.addColorStop(0.35, '#7a3f9a'); g.addColorStop(0.65, '#f0708a'); g.addColorStop(0.85, '#ffb26b'); g.addColorStop(1, '#ffd27a')
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1920)
  // the sun, pixel-banded, half set behind the rail
  const sx = 540, sy = 1010, R = 190
  for (let j = -R; j < 0; j += 12) { const hw = Math.sqrt(R * R - j * j); if (Math.floor(j / 12) % 3 === 0 && j > -R * 0.5) continue; ctx.fillStyle = j < -R * 0.6 ? '#fff0b0' : '#ffd166'; ctx.fillRect(Math.round(sx - hw), sy + j, Math.round(hw * 2), 12) }
  // string lights
  for (let i = 0; i <= 18; i++) {
    const u = i / 18, x = u * 1080, y = 700 + Math.sin(Math.PI * u) * 90
    if (i) { ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); const pu = (i - 1) / 18; ctx.moveTo(pu * 1080, 700 + Math.sin(Math.PI * pu) * 90); ctx.lineTo(x, y); ctx.stroke() }
    const on = 0.7 + 0.3 * Math.sin(t * 5 + i * 1.7)
    ctx.fillStyle = `rgba(255,214,120,${0.35 * on})`; ctx.beginPath(); ctx.arc(x, y + 14, 22, 0, TAU); ctx.fill()
    ctx.fillStyle = INK; ctx.fillRect(x - 8, y + 4, 16, 20); ctx.fillStyle = ['#ffd166', '#ff8fb1', '#9fd8ff'][i % 3]; ctx.fillRect(x - 5, y + 7, 10, 14)
  }
  // the railing + the roof deck
  ctx.fillStyle = '#2a1840'; ctx.fillRect(0, 1060, 1080, 900)
  ctx.fillStyle = INK; ctx.fillRect(0, 996, 1080, 16); ctx.fillRect(0, 1050, 1080, 14)
  for (let x = 10; x < 1080; x += 54) ctx.fillRect(x, 1000, 8, 60)
  ctx.restore()
}
/** the whole car: frame, ceiling, walls, rail, carpet. st: { dark 0…1, red 0…1, flick 0…1 } */
export function drawCar(ctx, t, { dark = 0, red = 0, warm = 0 } = {}) {
  const { x, y, w, h } = CAR
  // ceiling
  poly(ctx, [[IN.l, IN.t], [IN.r, IN.t], [BACK.r, BACK.t], [BACK.l, BACK.t]], '#2f2652')
  ctx.fillStyle = '#fff3c8'; ctx.globalAlpha = 1 - dark; ctx.fillRect(330, 576, 420, 10); ctx.globalAlpha = 1
  // back wall: the window frame (the window itself is a hole) + wood panels below
  ctx.fillStyle = '#5b3a2e'
  ctx.fillRect(BACK.l, BACK.t, BACK.r - BACK.l, WIN.t - BACK.t); ctx.fillRect(BACK.l, WIN.b, BACK.r - BACK.l, BACK.b - WIN.b)
  ctx.fillRect(BACK.l, WIN.t, WIN.l - BACK.l, WIN.b - WIN.t); ctx.fillRect(WIN.r, WIN.t, BACK.r - WIN.r, WIN.b - WIN.t)
  ctx.fillStyle = 'rgba(160,210,255,0.08)'; ctx.fillRect(WIN.l, WIN.t, WIN.r - WIN.l, WIN.b - WIN.t)
  ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.beginPath(); ctx.moveTo(WIN.l + 60, WIN.t); ctx.lineTo(WIN.l + 140, WIN.t); ctx.lineTo(WIN.l + 20, WIN.b); ctx.lineTo(WIN.l - 0, WIN.b); ctx.closePath(); ctx.fill()
  ctx.fillStyle = INK; ctx.fillRect(WIN.l - 8, WIN.t - 8, WIN.r - WIN.l + 16, 8); ctx.fillRect(WIN.l - 8, WIN.b, WIN.r - WIN.l + 16, 8); ctx.fillRect(WIN.l - 8, WIN.t, 8, WIN.b - WIN.t); ctx.fillRect(WIN.r, WIN.t, 8, WIN.b - WIN.t); ctx.fillRect(538, WIN.t, 6, WIN.b - WIN.t)
  for (let px = BACK.l + 20; px < BACK.r - 40; px += 146) { ctx.fillStyle = '#4a2e25'; ctx.fillRect(px, WIN.b + 26, 126, BACK.b - WIN.b - 52); ctx.fillStyle = '#6e4a3a'; ctx.fillRect(px, WIN.b + 26, 126, 5) }
  // side walls
  poly(ctx, [[IN.l, IN.t], [BACK.l, BACK.t], [BACK.l, BACK.b], [IN.l, IN.b]], '#43302a')
  poly(ctx, [[IN.r, IN.t], [BACK.r, BACK.t], [BACK.r, BACK.b], [IN.r, IN.b]], '#43302a')
  // carpet
  poly(ctx, [[BACK.l, BACK.b], [BACK.r, BACK.b], [IN.r, IN.b], [IN.l, IN.b]], '#7a2440')
  ctx.fillStyle = '#922c4d'; for (let i = 0; i < 6; i++) { const yy = BACK.b + 12 + i * 18, k = (yy - BACK.b) / (IN.b - BACK.b), l = lerp(BACK.l, IN.l, k), r = lerp(BACK.r, IN.r, k); for (let xx = l + 10; xx < r - 10; xx += 44) ctx.fillRect(xx + (i % 2) * 22, yy, 10, 6) }
  // brass handrail
  ctx.fillStyle = INK; ctx.fillRect(BACK.l, 1086, BACK.r - BACK.l, 18); ctx.fillStyle = '#d7a64a'; ctx.fillRect(BACK.l, 1089, BACK.r - BACK.l, 11); ctx.fillStyle = '#ffe08a'; ctx.fillRect(BACK.l, 1089, BACK.r - BACK.l, 3)
  // the speaker grille in the ceiling
  ctx.fillStyle = INK; ctx.fillRect(504, 562, 72, 30); ctx.fillStyle = '#5a4f80'; ctx.fillRect(508, 566, 64, 22)
  ctx.fillStyle = INK; for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) ctx.fillRect(513 + i * 10, 570 + j * 9, 5, 5)
  // lights out + the emergency red
  if (dark > 0) { ctx.fillStyle = `rgba(8,4,20,${0.74 * dark})`; ctx.fillRect(IN.l, IN.t, IN.r - IN.l, IN.b - IN.t) }
  if (red > 0) { ctx.fillStyle = `rgba(255,40,70,${0.16 * red})`; ctx.fillRect(IN.l, IN.t, IN.r - IN.l, IN.b - IN.t) }
  if (warm > 0) { ctx.fillStyle = `rgba(255,120,170,${0.13 * warm})`; ctx.fillRect(IN.l, IN.t, IN.r - IN.l, IN.b - IN.t) }
}
/** the front frame of the car (pillars, header band, sill) — drawn over the cast */
export function drawFrame(ctx, t) {
  const { x, y, w, h } = CAR
  ctx.fillStyle = INK; ctx.fillRect(x - 8, y - 8, w + 16, IN.t - y + 8); ctx.fillRect(x - 8, y, IN.l - x + 8, h + 8); ctx.fillRect(IN.r, y, x + w - IN.r + 8, h + 8); ctx.fillRect(x - 8, IN.b, w + 16, y + h - IN.b + 8)
  const steel = '#8e86b4', lite = '#c7c0e6', dk = '#5d5585'
  ctx.fillStyle = steel; ctx.fillRect(x, y, w, IN.t - y - 6); ctx.fillRect(x, IN.t - 6, IN.l - x - 6, h - (IN.t - y) + 6); ctx.fillRect(IN.r + 6, IN.t - 6, x + w - IN.r - 6, h - (IN.t - y) + 6)
  ctx.fillStyle = lite; ctx.fillRect(x, y, w, 6); ctx.fillRect(x, y, 6, h)
  ctx.fillStyle = dk; ctx.fillRect(x + w - 6, y, 6, h); ctx.fillRect(x, IN.t - 12, w, 6)
  // brass sill
  ctx.fillStyle = '#d7a64a'; ctx.fillRect(x, IN.b + 6, w, y + h - IN.b - 6); ctx.fillStyle = '#ffe08a'; ctx.fillRect(x, IN.b + 6, w, 5)
  ctx.fillStyle = '#9c7428'; for (let i = x + 14; i < x + w - 10; i += 22) ctx.fillRect(i, IN.b + 18, 10, 12)
  for (const rx of [x + 14, x + w - 26]) for (const ry of [y + 14, y + h - 30]) { ctx.fillStyle = dk; ctx.fillRect(rx, ry, 12, 12) }
}
/** the LED floor display in the header band */
export function drawFloorDisplay(ctx, t, { text = '12', arrow = 1, on = 1, col = '#ff4b3e' } = {}) {
  const cx = 540, cy = 515, w = 250, h = 74
  ctx.fillStyle = INK; ctx.fillRect(cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12)
  ctx.fillStyle = '#120a14'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h)
  if (on <= 0) return
  ctx.save(); ctx.globalAlpha = on; ctx.shadowColor = col; ctx.shadowBlur = 16
  ctx.font = `700 50px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = col
  ctx.fillText((arrow ? '▲ ' : '') + text, cx, cy + 3)
  ctx.restore()
}
/** the button panel on the left wall. press: { alarm, close } 0…1 glow */
export function drawButtons(ctx, t, { alarm = 0, close = 0, dark = 0 } = {}) {
  const x = 166, y = 830, w = 72, h = 270
  ctx.fillStyle = INK; ctx.fillRect(x - 5, y - 5, w + 10, h + 10)
  ctx.fillStyle = '#c9a24f'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#f0d58a'; ctx.fillRect(x, y, w, 4)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) { const bx = x + 20 + c * 32, by = y + 26 + r * 34; ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(bx, by, 12, 0, TAU); ctx.fill(); ctx.fillStyle = r === 1 && c === 1 ? '#ffd27a' : '#efe6d6'; ctx.beginPath(); ctx.arc(bx, by, 8, 0, TAU); ctx.fill() }
  // ▶◀ close
  const cy = y + 170, ay = y + 226
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x + w / 2, cy, 17, 0, TAU); ctx.fill()
  ctx.fillStyle = close > 0 ? '#7dffb0' : '#efe6d6'; ctx.beginPath(); ctx.arc(x + w / 2, cy, 13, 0, TAU); ctx.fill()
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(x + w / 2 - 9, cy - 6); ctx.lineTo(x + w / 2 - 2, cy); ctx.lineTo(x + w / 2 - 9, cy + 6); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + w / 2 + 9, cy - 6); ctx.lineTo(x + w / 2 + 2, cy); ctx.lineTo(x + w / 2 + 9, cy + 6); ctx.fill()
  if (close > 0) { ctx.fillStyle = `rgba(125,255,176,${0.45 * close})`; ctx.beginPath(); ctx.arc(x + w / 2, cy, 34, 0, TAU); ctx.fill() }
  // the red alarm bell
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x + w / 2, ay, 22, 0, TAU); ctx.fill()
  ctx.fillStyle = alarm > 0 ? '#ff6b5b' : '#c8323a'; ctx.beginPath(); ctx.arc(x + w / 2, ay, 18, 0, TAU); ctx.fill()
  ctx.fillStyle = '#ffd27a'; ctx.fillRect(x + w / 2 - 7, ay - 8, 14, 12); ctx.fillRect(x + w / 2 - 10, ay + 3, 20, 4)
  if (alarm > 0) { ctx.fillStyle = `rgba(255,90,80,${0.5 * alarm})`; ctx.beginPath(); ctx.arc(x + w / 2, ay, 44, 0, TAU); ctx.fill() }
  if (dark > 0) { ctx.fillStyle = `rgba(8,4,20,${0.6 * dark})`; ctx.fillRect(x - 5, y - 5, w + 10, h + 10) }
}
export const BTN = { alarm: [202, 1056], close: [202, 1000] }
/** glass doors: open 0 = shut, 1 = fully open */
export function drawDoors(ctx, t, open) {
  const half = (IN.r - IN.l) / 2
  ctx.save(); ctx.beginPath(); ctx.rect(IN.l, IN.t, IN.r - IN.l, IN.b - IN.t); ctx.clip()
  for (const s of [-1, 1]) {
    const x0 = s < 0 ? IN.l - open * half : 540 + open * half
    ctx.fillStyle = 'rgba(170,205,255,0.07)'; ctx.fillRect(x0, IN.t, half, IN.b - IN.t)
    ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.beginPath(); ctx.moveTo(x0 + 70, IN.t); ctx.lineTo(x0 + 150, IN.t); ctx.lineTo(x0 + 30, IN.b); ctx.lineTo(x0 - 50, IN.b); ctx.closePath(); ctx.fill()
    const ex = s < 0 ? x0 + half - 10 : x0
    ctx.fillStyle = INK; ctx.fillRect(ex - 3, IN.t, 16, IN.b - IN.t); ctx.fillStyle = '#c7c0e6'; ctx.fillRect(ex, IN.t, 10, IN.b - IN.t)
    ctx.fillStyle = INK; ctx.fillRect(x0, IN.b - 14, half, 14); ctx.fillRect(x0, IN.t, half, 10)
  }
  ctx.restore()
}
// ♪ a pixel music note
const NOTE_BM = BM(`...XX. ...XXX ...X.X ...X.. .XXX.. XXXX.. .XX...`)
/** muzak notes drifting out of the ceiling speaker. k 0…1 amount, big = size boost, heart = hearts instead */
export function drawNotes(ctx, t, { x = 540, y = 600, k = 1, big = 0, heart = 0, seed = 1 } = {}) {
  if (k <= 0) return
  const n = 6
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.45 + i / n + seed * 0.13) % 1)
    const side = i % 2 ? 1 : -1
    const nx = x + side * (40 + ph * (180 + big * 260)) + Math.sin(t * 2 + i) * 14, ny = y + 40 + ph * (120 + big * 140) - Math.sin(Math.PI * ph) * 60
    const px = 5 + big * 6
    const cols = heart ? ['#ff5c8a', '#ff8fb1'] : ['#f2c75c', '#c9a6ff', '#9fd8ff']
    bmp(ctx, heart ? HEART : NOTE_BM, nx, ny, px, { X: cols[i % cols.length] }, { outline: INK, alpha: k * Math.sin(Math.PI * ph) })
  }
}
/** a little mono callout chip (labels, the STUCK timer). k = pop scale */
export function drawChip(ctx, x, y, text, { k = 1, col = BONE, bar = GOLD, size = 30 } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const tw = ctx.measureText(text).width + 32, th = size + 22
  ctx.fillStyle = INK; ctx.fillRect(-tw / 2 - 4, -th / 2 - 4, tw + 8, th + 8)
  ctx.fillStyle = 'rgba(20,12,44,0.97)'; ctx.fillRect(-tw / 2, -th / 2, tw, th); ctx.fillStyle = bar; ctx.fillRect(-tw / 2, th / 2 - 5, tw, 5)
  ctx.fillStyle = col; ctx.fillText(text, 0, 2)
  ctx.restore()
}
/** a thought bubble holding a laminated plan card. k = pop, (hx, hy) = the thinker's head (tail dots) */
export function drawPlan(ctx, t, { cx, cy, w = 460, h = 290, k = 1, hx, hy, title, rows, tag = null, col = '#d23f73', burst = 0 }) {
  if (k <= 0.01) return
  // tail dots
  for (let i = 0; i < 3; i++) { const u = (i + 1) / 4, dx = lerp(cx, hx, u), dy = lerp(cy + h / 2, hy, u), r = (12 - i * 3) * k; ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(dx, dy, r + 4, 0, TAU); ctx.fill(); ctx.fillStyle = '#f4efff'; ctx.beginPath(); ctx.arc(dx, dy, r, 0, TAU); ctx.fill() }
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.rotate(Math.sin(t * 1.5 + cx) * 0.012)
  // cloud: a stepped pixel panel, with bumps
  const P = 8
  for (const [bx, by, br] of [[-w * 0.3, -h / 2, 46], [0, -h / 2 - 6, 54], [w * 0.3, -h / 2, 46], [-w / 2, 0, 40], [w / 2, 0, 40]]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(bx, by, br + 6, 0, TAU); ctx.fill() }
  step(ctx, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, P, INK)
  for (const [bx, by, br] of [[-w * 0.3, -h / 2, 46], [0, -h / 2 - 6, 54], [w * 0.3, -h / 2, 46], [-w / 2, 0, 40], [w / 2, 0, 40]]) { ctx.fillStyle = '#f4efff'; ctx.beginPath(); ctx.arc(bx, by, br, 0, TAU); ctx.fill() }
  step(ctx, -w / 2, -h / 2, w, h, P, '#f4efff')
  // the laminated card inside
  const cw = w - 50, ch = h - 50
  ctx.fillStyle = 'rgba(80,60,140,0.25)'; ctx.fillRect(-cw / 2 + 8, -ch / 2 + 10, cw, ch)
  ctx.fillStyle = INK; ctx.fillRect(-cw / 2 - 4, -ch / 2 - 4, cw + 8, ch + 8)
  ctx.fillStyle = '#fff6e6'; ctx.fillRect(-cw / 2, -ch / 2, cw, ch)
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.beginPath(); ctx.moveTo(-cw / 2 + 30, -ch / 2); ctx.lineTo(-cw / 2 + 80, -ch / 2); ctx.lineTo(-cw / 2 + 10, ch / 2); ctx.lineTo(-cw / 2, ch / 2); ctx.lineTo(-cw / 2, ch / 2 - 20); ctx.closePath(); ctx.fill()
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  ctx.font = `800 34px ${INTER}`; ctx.fillStyle = col; ctx.fillText(title, -cw / 2 + 20, -ch / 2 + 32)
  if (tag) { ctx.textAlign = 'right'; ctx.font = `700 20px ${MONO}`; ctx.fillStyle = '#6b5a7a'; ctx.fillText(tag, cw / 2 - 16, -ch / 2 + 34); ctx.textAlign = 'left' }
  ctx.fillStyle = col; ctx.fillRect(-cw / 2 + 20, -ch / 2 + 56, cw - 40, 4)
  ctx.font = `700 29px ${MONO}`; ctx.fillStyle = INK
  rows.forEach((r, i) => ctx.fillText(r, -cw / 2 + 20, -ch / 2 + 96 + i * 44))
  ctx.restore()
}
// the violin (for Taurus, on the roof)
const VIOLIN = BM(`
......SS
.....SS.
....SS..
..BBB...
.BbBBB..
.BBbBB..
..BbB...
.BBBBB..
BBbBBBB.
.BBBBB..`)
export function drawViolin(ctx, t, x, y, px, { bow = 0, rot = -0.5, alpha = 1 } = {}) {
  bmp(ctx, VIOLIN, x, y, px, { B: '#b8582a', b: '#ffcf7a', S: '#3a2416' }, { outline: INK, rot, alpha })
  // the bow, sawing
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(0.6); const off = Math.sin(bow) * px * 5
  ctx.fillStyle = INK; ctx.fillRect(-px * 9 + off, -px * 1.2, px * 18, px * 1.4); ctx.fillStyle = '#efe6d6'; ctx.fillRect(-px * 9 + off, -px * 0.9, px * 18, px * 0.6)
  ctx.restore()
}
/** the banner over the roof doorway */
export function drawBanner(ctx, t, k) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(540, 420); ctx.scale(k, k); ctx.rotate(Math.sin(t * 2) * 0.01)
  const w = 760, h = 76
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  ctx.fillStyle = '#ff8fb1'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#ffb8cd'; ctx.fillRect(-w / 2, -h / 2, w, 6)
  for (let i = 0; i < 12; i++) { ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-w / 2 + i * w / 12, h / 2); ctx.lineTo(-w / 2 + (i + 0.5) * w / 12, h / 2 + 20); ctx.lineTo(-w / 2 + (i + 1) * w / 12, h / 2); ctx.fill(); ctx.fillStyle = ['#f2c75c', '#c9a6ff', '#9fd8ff'][i % 3]; ctx.beginPath(); ctx.moveTo(-w / 2 + i * w / 12 + 6, h / 2); ctx.lineTo(-w / 2 + (i + 0.5) * w / 12, h / 2 + 12); ctx.lineTo(-w / 2 + (i + 1) * w / 12 - 6, h / 2); ctx.fill() }
  ctx.font = `800 40px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = INK
  ctx.fillText('THE PERFECT MOMENT · 7:42 PM', 0, 3)
  ctx.restore()
}
/** the veiled mystery card (Card first. Face last.) — words, no face */
export function drawMysteryCard(ctx, x, y, w, h, t, { glyph = '♑', lines = [], badge = '#2fc79a', k = 1, rot = 0 } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  const rr = (X, Y, W2, H2, r) => { ctx.beginPath(); ctx.roundRect(X, Y, W2, H2, r) }
  rr(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 30); ctx.fillStyle = INK; ctx.fill()
  rr(-w / 2, -h / 2, w, h, 24); const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2c1f5e'); g.addColorStop(1, '#170f36'); ctx.fillStyle = g; ctx.fill()
  ctx.strokeStyle = GOLD; ctx.lineWidth = 4; rr(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 16); ctx.stroke()
  const fy = -h / 2 + h * 0.27, fr = w * 0.2
  ctx.save(); ctx.beginPath(); ctx.arc(0, fy, fr, 0, TAU); ctx.clip()
  ctx.fillStyle = '#3c2f74'; ctx.fillRect(-fr, fy - fr, 2 * fr, 2 * fr)
  for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) { const n = Math.sin(i * 7.1 + j * 3.3 + Math.floor(t * 4) * 1.7); if (n > 0.2) { ctx.fillStyle = `rgba(201,166,255,${0.18 + 0.2 * n})`; ctx.fillRect(-fr + i * fr * 2 / 9, fy - fr + j * fr * 2 / 9, fr * 2 / 9 + 1, fr * 2 / 9 + 1) } }
  ctx.restore()
  ctx.strokeStyle = 'rgba(242,199,92,0.7)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, fy, fr, 0, TAU); ctx.stroke()
  ctx.font = `800 64px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(239,230,214,0.85)'; ctx.fillText('?', 0, fy + 4)
  const bx = fr * 0.95, by = fy + fr * 0.75
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(bx, by, 29, 0, TAU); ctx.fill()
  ctx.fillStyle = badge; ctx.beginPath(); ctx.arc(bx, by, 25, 0, TAU); ctx.fill()
  ctx.font = `600 34px 'EB Garamond', 'Noto Sans Symbols', serif`; ctx.fillStyle = INK; ctx.fillText(glyph + '︎', bx, by + 2)
  ctx.font = `700 30px ${MONO}`
  lines.forEach((s, i) => { ctx.fillStyle = i === 0 ? GOLD : BONE; ctx.fillText(s, 0, -h / 2 + h * 0.6 + i * 52) })
  ctx.restore()
}
/** speed streaks (going up, fast) */
export function speedLines(ctx, t, k, seed = 3) {
  if (k <= 0) return
  const r = rng(seed)
  ctx.save()
  for (let i = 0; i < 26; i++) {
    const x = r() * 1080, len = 120 + r() * 260, sp = 1800 + r() * 1400, y = ((r() * 2400 + t * sp) % 2400) - 300
    if (x > CAR.x - 10 && x < CAR.x + CAR.w + 10 && y > CAR.y - 200) continue
    ctx.globalAlpha = k * (0.3 + r() * 0.5); ctx.fillStyle = i % 3 ? '#efe6d6' : '#f2c75c'; ctx.fillRect(Math.round(x), y, 6, len)
  }
  ctx.restore()
}
