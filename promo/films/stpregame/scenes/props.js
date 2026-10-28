// stpregame props: small pixel drawings on canvas (Star Talk S3 #19 "Pre-Game."). Pure functions of their arguments;
// nothing touches `document` at module top level. Crisp rectangles only, so they sit next to the pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)                    rows of chars → pal colours, (x, y) = top-left, px = one art pixel
//   onStar(ctx, x, y, size, t, opts, fn)                runs fn(P) inside the SAME transform drawStarChar uses for that star
//                                                       (bob, hop, squash, breathe), so props sit ON the star and squash with it.
//                                                       P = { cell, ox, oy }: sprite cell (i, j) is at (ox + i·cell, oy + j·cell).
//   drawSweatband(P, ctx, { band, stripe })             a terry headband across the star's top arm (in onStar)
//   drawWhistle(P, ctx, t, { blow, chatter, glitter })   the coach's whistle at the star's "mouth" (in onStar)
//   drawFishHat(P, ctx, t, { down })                    Pisces' foam fish mascot hat; down 0…1 slides it over the eyes
//   drawGlitterCoat(P, ctx, t, k)                       glitter specks all over the star (k = coverage 0…1)
//   drawDoors(ctx, t, { x, y, w, h, open, px, rattle }) the locker-room double doors + the lit sign; open 0…1 swings them out
//   drawFloor(ctx, t, { horizon, alpha })               the neon court: a synthwave perspective grid that scrolls toward you
//   drawBucket(ctx, x, y, px, rot)                      the bucket of glitter ((x, y) = the rim's centre)
//   drawRareChip(ctx, x, y, k, text)                    a gold rarity chip "✦ RARE ✦" (k = scale)
//   drawBubble(ctx, x, y, text, k)                      a little pixel speech bubble ("shh!")
import { clamp, lerp, rng } from '../../../src/lib.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const OUT = '#1a1030'
const ease3 = p => 1 - (1 - clamp(p)) ** 3
const mixc = (a, b, k) => { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), c = sh => Math.round(lerp((A >> sh) & 255, (B >> sh) & 255, clamp(k))); return `rgb(${c(16)},${c(8)},${c(0)})` }

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── star space (mirrors startalk.js drawStarChar: same grid, hop and squash maths)
const G = 36, HALF = G / 2
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
export function onStar(ctx, x, y, size, t, o, fn) {
  const { bob, squash = 0, hops = null, seed = 1, pop = 1, alpha = 1 } = o
  const s = size * pop
  if (alpha <= 0 || pop <= 0 || s <= 0) return
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(cy + base)); ctx.scale(1 + sq, 1 - sq * 0.9)
  fn({ cell, S, ox: -S / 2, oy: -S / 2 - base })
  ctx.restore()
}
// the body mask (which cells are inside the star), same polygon as startalk.js
let MASK = null
function mask() {
  if (MASK) return MASK
  const V = [], R0 = SC.R - SC.round, r0 = SC.r - SC.round * 0.55
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r0 : R0; V.push([SC.x + Math.cos(a) * rr, SC.y + Math.sin(a) * rr]) }
  const sd = (px, py) => {
    let d = (px - V[0][0]) ** 2 + (py - V[0][1]) ** 2, s = 1
    for (let i = 0, j = V.length - 1; i < V.length; j = i, i++) {
      const ex = V[j][0] - V[i][0], ey = V[j][1] - V[i][1], wx = px - V[i][0], wy = py - V[i][1]
      const h = clamp((wx * ex + wy * ey) / (ex * ex + ey * ey), 0, 1), bx = wx - ex * h, by = wy - ey * h
      d = Math.min(d, bx * bx + by * by)
      const c1 = py >= V[i][1], c2 = py < V[j][1], c3 = ex * wy > ey * wx
      if ((c1 && c2 && c3) || (!c1 && !c2 && !c3)) s = -s
    }
    return s * Math.sqrt(d) - SC.round
  }
  const m = new Uint8Array(G * G)
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) if (sd(i + 0.5, j + 0.5) <= 0) m[j * G + i] = 1
  MASK = m; return m
}
const inside = (i, j) => i >= 0 && j >= 0 && i < G && j < G && mask()[j * G + i] === 1
/** [min, max] inside columns of row j */
function rowSpan(j) { let a = -1, b = -1; for (let i = 0; i < G; i++) if (inside(i, j)) { if (a < 0) a = i; b = i } return [a, b] }
const cellR = (P, ctx, i, j, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(P.ox + i * P.cell, P.oy + j * P.cell, w * P.cell, h * P.cell) }

// ─────────────────────────────── the sweatband: three rows round the top arm's "forehead" (rows 7–9), over the outline too
export function drawSweatband(P, ctx, { band = '#f4ecdc', stripe = '#e8484f', shade = '#c9bfae' } = {}) {
  for (let r = 0; r < 3; r++) {
    const j = 7 + r, [a, b] = rowSpan(j)
    if (a < 0) continue
    const x0 = a - 1, w = b - a + 3
    cellR(P, ctx, x0, j, w, 1, r === 1 ? stripe : band)
    cellR(P, ctx, x0 + w - 2, j, 2, 1, r === 1 ? stripe : shade)            // the far side in shadow
    if (r === 0) cellR(P, ctx, x0 + 1, j, 2, 1, '#ffffff')
  }
  // outline above and below the band
  const [a0, b0] = rowSpan(6), [a1, b1] = rowSpan(10)
  cellR(P, ctx, a0 - 1, 6.75, b0 - a0 + 3, 0.25, 'rgba(26,16,48,0.55)')
  cellR(P, ctx, a1 - 1, 10, b1 - a1 + 3, 0.25, 'rgba(26,16,48,0.55)')
}

// ─────────────────────────────── the whistle (mouthpiece at the star's "mouth", the chamber to the right)
const WHISTLE = [
  '.......XXXXXX..',
  'XXXXXXXLLLLLLX.',
  'XLLLLLLLHHLLLLX',
  'XLLLLLLLLLLLLLX',
  'XXXXXXXLLDDLLLX',
  '......XLLDDDLLX',
  '.......XLLLLLX.',
  '........XXXXX..',
]
export function drawWhistle(P, ctx, t, { blow = 0, chatter = 0, glitter = 0 } = {}) {
  const c = P.cell * 0.8
  const jx = chatter > 0 ? Math.round(Math.sin(t * 95) * chatter * 1.4) * c * 0.5 : 0
  const jy = chatter > 0 ? Math.round(Math.cos(t * 77) * chatter) * c * 0.5 : (blow > 0 ? Math.round(Math.sin(t * 80) * 0.5) * c * 0.5 : 0)
  const x0 = P.ox + 16.6 * P.cell + jx, y0 = P.oy + 22.4 * P.cell + jy
  bitmap(ctx, WHISTLE, { X: '#2a2440', L: '#d9dde8', H: '#ffffff', D: '#7d8396' }, x0, y0, c)
  // the red lanyard running down off the chamber
  ctx.fillStyle = '#e8484f'
  for (let k = 0; k < 4; k++) ctx.fillRect(x0 + (12 + k * 0.6) * c, y0 + (8 + k) * c, c, c)
  if (blow > 0) {                                   // air puffs out of the far end
    ctx.save(); ctx.globalAlpha *= clamp(blow); ctx.fillStyle = '#ffffff'
    for (let k = 0; k < 3; k++) {
      const ph = (t * 6 + k / 3) % 1, len = 3 + Math.round(ph * 3), dy = (k - 1) * 3 * c - (k - 1) * ph * 2 * c
      for (let i = 0; i < len; i++) ctx.fillRect(x0 + (15 + ph * 7 + i) * c, y0 + 3 * c + dy, c, c)
    }
    ctx.restore()
  }
  if (glitter > 0) {                                // pfft: glitter puffs out instead of air
    const r = rng(9), cols = ['#ffe08a', '#ff8fb1', '#9fe8ff', '#ffffff', '#c9a6ff']
    ctx.save()
    for (let k = 0; k < 34; k++) {
      const a = -1.1 + r() * 1.8, sp = 10 + r() * 26, d = ease3(glitter) * sp, ph = clamp(glitter * 1.15 - r() * 0.15)
      if (ph <= 0) continue
      ctx.globalAlpha = (1 - ph * ph) * 0.95
      ctx.fillStyle = cols[k % cols.length]
      const z = k % 4 ? 1.4 : 2
      ctx.fillRect(x0 + (15 + Math.cos(a) * d) * c, y0 + (3 + Math.sin(a) * d + ph * ph * 10) * c, c * z, c * z)
    }
    ctx.restore()
  }
}

// ─────────────────────────────── Pisces' foam fish mascot hat (a goofy goldfish, facing left, sitting on the top tip)
const FISH = [
  '.......XXXXXXX..........',
  '.....XXooooooXX.....XXX.',
  '....XoooYYYooooX...XoooX',
  '...XooYwwwYooooOX.XooooX',
  '..XoooYwkkwooooOOXoooOX.',
  '.XpooYwkkwoooooOOOooOX..',
  'XppoooYwwYooooooOOoOX...',
  '.XpooooYYooooooOOooooX..',
  '..XooooooooooooOXXooooX.',
  '...XXoooooooooOX..XoooX.',
  '.....XXXXXXXXXX....XXX..',
]
export function drawFishHat(P, ctx, t, { down = 0 } = {}) {
  const c = P.cell * 0.95
  const wig = Math.round(Math.sin(t * 5.2) * 0.5) * c
  const x0 = P.ox + (HALF - 12.2) * P.cell, y0 = P.oy + lerp(-6.2, 11.2, clamp(down)) * P.cell + wig
  bitmap(ctx, FISH, { X: OUT, o: '#ffa64a', O: '#e0702a', Y: '#ffd27a', w: '#ffffff', k: '#1b1236', p: '#ff6f9a' }, x0, y0, c)
}

// ─────────────────────────────── glitter specks all over a star (k = coverage)
export function drawGlitterCoat(P, ctx, t, k) {
  if (k <= 0) return
  const r = rng(31), cols = ['#ffe08a', '#ff8fb1', '#9fe8ff', '#ffffff', '#c9a6ff', '#7dffb0']
  ctx.save()
  for (let n = 0; n < 150; n++) {
    const i = Math.floor(r() * G), j = Math.floor(r() * G), when = r(), ph = r() * 6.28, col = cols[n % cols.length]
    if (!inside(i, j) || when > k) continue
    if (j >= 14 && j <= 23 && ((i >= 8 && i <= 15) || (i >= 21 && i <= 28))) continue      // keep the eyes clear
    const tw = 0.55 + 0.45 * Math.sin(t * 7 + ph)
    ctx.globalAlpha = tw
    ctx.fillStyle = col
    ctx.fillRect(P.ox + i * P.cell, P.oy + j * P.cell, P.cell, P.cell)
    if (tw > 0.93 && n % 3 === 0) { ctx.fillStyle = '#ffffff'; ctx.fillRect(P.ox + (i - 1) * P.cell, P.oy + j * P.cell, P.cell * 3, P.cell); ctx.fillRect(P.ox + i * P.cell, P.oy + (j - 1) * P.cell, P.cell, P.cell * 3) }
  }
  ctx.restore()
}

// ─────────────────────────────── the locker-room doors (front view), the lit sign above
// (x, y) = the doorway's bottom centre (on the floor line), w × h = the doorway. open 0…1 swings both panels out at you.
export function drawDoors(ctx, t, { x = 540, y = 905, w = 300, h = 400, open = 0, px = 6, rattle = 0, light = 1, alpha = 1, sign = 1, lit = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const x0 = x - w / 2, y0 = y - h, fr = px * 3
  // the frame: a slab of wall around the doorway
  R(ctx, x0 - fr - px * 5, y0 - fr - px * 3, w + 2 * fr + px * 10, h + fr + px * 3, '#2a2152')
  for (let k = 0; k < 9; k++) R(ctx, x0 - fr - px * 5, y0 - fr - px * 3 + k * 9 * px, w + 2 * fr + px * 10, px * 0.5, 'rgba(10,6,28,0.35)')      // block courses
  R(ctx, x0 - fr, y0 - fr, w + 2 * fr, h + fr, OUT)
  R(ctx, x0 - fr + px, y0 - fr + px, w + 2 * fr - 2 * px, h + fr - px, '#6b5fa6')
  R(ctx, x0 - fr + px, y0 - fr + px, w + 2 * fr - 2 * px, px, '#a99be0')
  // the doorway: warm light inside (always lit; you only see it when the doors open)
  const g = ctx.createLinearGradient(0, y0, 0, y), L = clamp(lit)
  g.addColorStop(0, mixc('#2c1a56', '#fff6d8', L)); g.addColorStop(0.6, mixc('#3a2064', '#ffd27a', L)); g.addColorStop(1, mixc('#5a2a6e', '#ffb24a', L))
  ctx.fillStyle = g; ctx.fillRect(x0, y0, w, h)
  if (open > 0 && light > 0) {                    // light pouring out onto the court
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= light * lit * clamp(open * 2)
    const lg = ctx.createLinearGradient(0, y, 0, y + 520)
    lg.addColorStop(0, 'rgba(255,214,130,0.42)'); lg.addColorStop(1, 'rgba(255,214,130,0)')
    ctx.fillStyle = lg
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w, y); ctx.lineTo(x + w * 1.6, y + 520); ctx.lineTo(x - w * 1.6, y + 520); ctx.closePath(); ctx.fill()
    const hg = ctx.createRadialGradient(x, y - h * 0.45, 10, x, y - h * 0.45, h * 1.1)
    hg.addColorStop(0, 'rgba(255,230,170,0.35)'); hg.addColorStop(1, 'rgba(255,230,170,0)')
    ctx.fillStyle = hg; ctx.fillRect(x - h * 1.1, y - h * 1.55, h * 2.2, h * 2.2)
    ctx.restore()
  }
  // the two panels: hinged at the outer edges; opening shrinks them edge-on and swings them toward you (taller, outward)
  const sw = Math.sin(clamp(open) * Math.PI / 2)
  for (const side of [-1, 1]) {
    const pw = (w / 2) * (1 - 0.86 * sw), grow = 1 + 0.5 * sw
    const hx = side < 0 ? x0 : x0 + w                         // the hinge
    const jig = rattle > 0 ? Math.round(Math.sin(t * 70 + side) * rattle * 2) * px * 0.5 : 0
    const bulge = rattle > 0 ? rattle * px * 1.2 : 0
    const ph = h * grow + bulge, py = y - h - (ph - h) * 0.5 - sw * h * 0.06
    const px0 = side < 0 ? hx - sw * w * 0.16 : hx - pw + sw * w * 0.16
    ctx.save(); ctx.translate(jig, 0)
    R(ctx, px0, py, pw, ph, OUT)
    R(ctx, px0 + px * 0.7, py + px * 0.7, pw - px * 1.4, ph - px * 1.4, sw > 0.02 ? '#3d3474' : '#4a3f8c')
    // inner bevel + the face details (fade as the panel turns edge-on)
    const fk = 1 - sw
    if (fk > 0.05) {
      ctx.globalAlpha *= clamp(fk * 1.4)
      R(ctx, px0 + px * 1.5, py + px * 1.5, pw - px * 3, px, '#6a5fb0')
      // window: glowing, with a cross bar; star silhouettes hop behind it
      const ww = pw * 0.46, wh = ph * 0.2, wx = px0 + (pw - ww) / 2, wy = py + ph * 0.13
      R(ctx, wx - px, wy - px, ww + 2 * px, wh + 2 * px, OUT)
      R(ctx, wx, wy, ww, wh, '#ffd98a')
      for (let k = 0; k < 2; k++) {
        const hop = Math.abs(Math.sin(t * 9 + k * 1.9 + side)) * wh * 0.35
        const sx = wx + ww * (0.3 + 0.42 * k), sy = wy + wh * 0.92 - hop
        ctx.fillStyle = 'rgba(58,36,96,0.85)'
        ctx.beginPath()
        for (let q = 0; q < 10; q++) { const a = -Math.PI / 2 + q * Math.PI / 5, rr = (q % 2 ? 0.45 : 1) * wh * 0.42; ctx.lineTo(sx + Math.cos(a) * rr, sy - wh * 0.38 + Math.sin(a) * rr) }
        ctx.closePath(); ctx.fill()
      }
      R(ctx, wx, wy + wh * 0.5 - px * 0.5, ww, px, OUT)
      R(ctx, wx + px, wy + px, px * 1.2, wh * 0.4, '#fff6d8')
      // push bar
      const by = py + ph * 0.52
      R(ctx, px0 + px * 2, by - px, pw - px * 4, px * 3, OUT)
      R(ctx, px0 + px * 2.5, by - px * 0.5, pw - px * 5, px * 2, '#c9cbe0')
      R(ctx, px0 + px * 2.5, by - px * 0.5, pw - px * 5, px * 0.7, '#ffffff')
      // kick plate
      R(ctx, px0 + px * 1.5, py + ph - px * 7, pw - px * 3, px * 5, '#8d84ab')
      R(ctx, px0 + px * 1.5, py + ph - px * 7, pw - px * 3, px, '#c4bce0')
    }
    ctx.restore()
  }
  // the sign: a lit plate over the frame
  if (sign > 0.01) {
    ctx.save(); ctx.globalAlpha *= sign
    const sw2 = w + 2 * fr + px * 4, sh = px * 9, sx = x - sw2 / 2, sy = y0 - fr - px * 3 - sh - px * 2
    R(ctx, sx, sy, sw2, sh, OUT)
    R(ctx, sx + px, sy + px, sw2 - 2 * px, sh - 2 * px, '#1b1236')
    const on = 0.75 + 0.25 * Math.sin(t * 9) * Math.sin(t * 3.7)
    ctx.save(); ctx.globalAlpha *= sign
    ctx.font = `700 ${Math.round(px * 4.6)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(255,90,140,0.9)'; ctx.shadowBlur = 14
    ctx.fillStyle = `rgba(255,${Math.round(140 + 60 * on)},${Math.round(170 + 40 * on)},1)`
    ctx.fillText('★ LOCKER ROOM ★', x, sy + sh / 2 + px * 0.3)
    ctx.restore()
    ctx.restore()
  }
  ctx.restore()
}

// ─────────────────────────────── the neon court: a perspective grid scrolling toward you, a hot horizon line
export function drawFloor(ctx, t, { horizon = 905, alpha = 1, W = 1080, H = 1920, scroll = 0.45 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const span = H - horizon + 260
  // a dark floor so the grid reads, fading into the sky at the horizon
  const fg = ctx.createLinearGradient(0, horizon - 40, 0, H)
  fg.addColorStop(0, 'rgba(20,8,44,0)'); fg.addColorStop(0.08, 'rgba(20,8,44,0.55)'); fg.addColorStop(1, 'rgba(12,4,28,0.82)')
  ctx.fillStyle = fg; ctx.fillRect(0, horizon - 40, W, H - horizon + 40)
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  // horizontal lines (perspective spacing, scrolling)
  const N = 11, ph = (t * scroll) % 1
  for (let k = 0; k < N; k++) {
    const u = (k + ph) / N, y = horizon + span * u * u * u
    if (y > H + 4) continue
    const a = 0.12 + 0.5 * u
    ctx.fillStyle = `rgba(255,92,200,${a.toFixed(3)})`; ctx.fillRect(0, Math.round(y) - 1, W, Math.max(2, Math.round(1 + u * 3)))
    ctx.fillStyle = `rgba(255,92,200,${(a * 0.25).toFixed(3)})`; ctx.fillRect(0, Math.round(y) - 5, W, Math.max(2, Math.round(1 + u * 3)) + 8)
  }
  // radial lines from the vanishing point
  ctx.lineCap = 'butt'
  for (let i = -9; i <= 9; i++) {
    const bx = W / 2 + i * 170
    ctx.strokeStyle = 'rgba(255,92,200,0.10)'; ctx.lineWidth = 9
    ctx.beginPath(); ctx.moveTo(W / 2 + i * 14, horizon); ctx.lineTo(bx, H + 40); ctx.stroke()
    ctx.strokeStyle = 'rgba(255,120,210,0.42)'; ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(W / 2 + i * 14, horizon); ctx.lineTo(bx, H + 40); ctx.stroke()
  }
  // the horizon: a hot line + glow
  const hg = ctx.createLinearGradient(0, horizon - 60, 0, horizon + 60)
  hg.addColorStop(0, 'rgba(255,90,170,0)'); hg.addColorStop(0.5, 'rgba(255,110,190,0.38)'); hg.addColorStop(1, 'rgba(255,90,170,0)')
  ctx.fillStyle = hg; ctx.fillRect(0, horizon - 60, W, 120)
  ctx.fillStyle = 'rgba(255,190,230,0.85)'; ctx.fillRect(0, horizon - 1, W, 3)
  ctx.restore()
  ctx.restore()
}

// ─────────────────────────────── the bucket of glitter ((x, y) = the rim's centre; rot tips it over)
const BUCKET = [
  'XXXXXXXXXXXXXXXXXX',
  'XHHHHHHHHHHHHHHHHX',
  'XSSSSSSSSSSSSSSSSX',
  '.XBBBBBBBBBBBBBBX.',
  '.XBLLBBBBBBBBBDBX.',
  '.XBLBBBBBBBBBBDBX.',
  '.XRRRRRRRRRRRRRRX.',
  '.XRRRRRRRRRRRRRRX.',
  '..XBLBBBBBBBBDBX..',
  '..XBLBBBBBBBBDBX..',
  '..XBBBBBBBBBBDBX..',
  '..XRRRRRRRRRRRRX..',
  '...XBBBBBBBBBDX...',
  '...XXXXXXXXXXXX...',
]
export function drawBucket(ctx, x, y, px, rot = 0, t = 0, { label = true } = {}) {
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  const w = BUCKET[0].length * px
  // the handle: an arc of pixels over the top
  ctx.fillStyle = OUT
  for (let k = 0; k <= 12; k++) { const a = Math.PI + (k / 12) * Math.PI, hx = Math.cos(a) * w * 0.48, hy = Math.sin(a) * w * 0.42; ctx.fillRect(Math.round(hx - px * 0.75), Math.round(hy - px * 0.75), Math.ceil(px * 1.5), Math.ceil(px * 1.5)) }
  ctx.fillStyle = '#c9cbe0'
  for (let k = 0; k <= 12; k++) { const a = Math.PI + (k / 12) * Math.PI, hx = Math.cos(a) * w * 0.48, hy = Math.sin(a) * w * 0.42; ctx.fillRect(Math.round(hx - px * 0.4), Math.round(hy - px * 0.4), Math.ceil(px * 0.8), Math.ceil(px * 0.8)) }
  // glitter heaped in the top
  const r = rng(5), cols = ['#ffe08a', '#ff8fb1', '#9fe8ff', '#ffffff', '#c9a6ff']
  for (let k = 0; k < 26; k++) { const gx = (r() - 0.5) * w * 0.86, gy = -px * (0.6 + r() * 2.4) * (1 - Math.abs(gx) / w); ctx.fillStyle = cols[k % 5]; ctx.fillRect(Math.round(gx), Math.round(gy), Math.ceil(px), Math.ceil(px)) }
  bitmap(ctx, BUCKET, { X: OUT, H: '#fff1c8', S: '#e8c35a', B: '#f2c75c', L: '#fff1c8', D: '#b88a2e', R: '#e8484f' }, -w / 2, 0, px)
  if (label) {
    ctx.font = `700 ${Math.round(px * 2.1)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = '#1b1236'; ctx.fillText('GLITTER', 0, px * 9.6)
  }
  // twinkles on the heap
  const tw = (Math.sin(t * 11) + 1) / 2
  ctx.fillStyle = `rgba(255,255,255,${(0.4 + 0.6 * tw).toFixed(2)})`
  ctx.fillRect(-w * 0.22, -px * 2.2, px, px); ctx.fillRect(w * 0.18, -px * 1.6, px, px)
  ctx.restore()
}

// ─────────────────────────────── a gold rarity chip (pill, gold rim, Space Mono)
export function drawRareChip(ctx, x, y, k, text = '✦ RARE ✦', { size = 40 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k)
  ctx.font = `700 ${size}px ${MONO}`
  const tw = ctx.measureText(text).width + text.length * size * 0.1, w = tw + size * 1.4, h = size * 1.75
  ctx.shadowColor = 'rgba(242,199,92,0.8)'; ctx.shadowBlur = 26
  ctx.fillStyle = '#f2c75c'; ctx.beginPath(); ctx.roundRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, h / 2 + 5); ctx.fill()
  ctx.shadowBlur = 0
  ctx.fillStyle = '#140c2c'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2); ctx.fill()
  ctx.strokeStyle = 'rgba(255,241,200,0.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, h / 2 - 6); ctx.stroke()
  ctx.fillStyle = '#ffd86a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.letterSpacing = (size * 0.1) + 'px'
  ctx.fillText(text, size * 0.05, size * 0.06)
  ctx.restore()
}

// ─────────────────────────────── a tiny pixel speech bubble
export function drawBubble(ctx, x, y, text, k = 1, { size = 34, tail = 'left' } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(k, k)
  ctx.font = `700 ${size}px ${MONO}`
  const w = Math.ceil(ctx.measureText(text).width) + size * 1.1, h = size * 1.6, p = 5
  R(ctx, -w / 2 - p, -h / 2 + p, w + 2 * p, h - 2 * p, OUT); R(ctx, -w / 2 + p, -h / 2 - p, w - 2 * p, h + 2 * p, OUT)
  R(ctx, -w / 2, -h / 2 + p, w, h - 2 * p, '#fff6e6'); R(ctx, -w / 2 + p, -h / 2, w - 2 * p, h, '#fff6e6')
  const tx = tail === 'left' ? -w / 2 + p * 3 : w / 2 - p * 6
  R(ctx, tx, h / 2, p * 3, p * 2, OUT); R(ctx, tx + p, h / 2, p * 2, p, '#fff6e6'); R(ctx, tx + (tail === 'left' ? -p : p * 2), h / 2 + p * 2, p * 2, p * 2, OUT)
  ctx.fillStyle = '#1b1236'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, size * 0.04)
  ctx.restore()
}
