// stgroupchat props — small pixel drawings on canvas, kept inside this film's folder (STARTALK2.md: props are shared
// helpers inside the film's own folder). Pure functions of their arguments (and t); nothing touches `document` at
// module top level (the sound build imports scenes/index.js in node).
//
//   drawBits(ctx, rows, cx, cy, cell, pal, { rot, flip, alpha, outline, sc })   a char bitmap centred on (cx, cy)
//   rig(x, y, size, t, opts)      the exact transform drawStarChar uses, so props sit on the 36-cell star grid and
//                                 squash / hop / bob with the sprite: rig.at(i, j) → world point of cell (i, j)
//   drawGlasses(ctx, R, { down, frame })       auntie reading glasses on a rig (Cancer, Taurus)
//   drawMagnifier(ctx, R, t, k)                Scorpio's magnifying glass over the right eye: one giant eye
//   drawGloves(ctx, R, t, punches, k)          Aries' boxing gloves on the side points, jabbing at the camera
//   drawPhone(ctx, R, k)                       a little phone held low, screen-lit (everyone typing)
//   drawSoup / drawDress / drawClipboard       Cancer's soup (steaming) · Libra's fit on a hanger · Virgo's clipboard
//   drawDog(ctx, cx, cy, cell)                 the pixel dog avatar (Scorpio's find)
//   drawBell(ctx, cx, cy, cell, rot)           a wedding bell
//   drawBang / drawSweat / drawTears / drawHearts / drawConfetti / sparkles / glow
import { clamp, lerp, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', MINT = '#7dffb0'
export const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const TAU = Math.PI * 2

// ─────────────────────────────────────────────── bitmaps
export function drawBits(ctx, bm, cx, cy, cell, pal, { rot = 0, flip = false, alpha = 1, outline = INK, sc = 1, ax = 0.5, ay = 0.5 } = {}) {
  if (alpha <= 0 || sc <= 0) return
  const w = bm[0].length, h = bm.length, c = cell + 0.5
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(cx), Math.round(cy)); if (rot) ctx.rotate(rot); ctx.scale(flip ? -sc : sc, sc)
  const ox = -w * cell * ax, oy = -h * cell * ay
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    ctx.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) ctx.fillRect(ox + i * cell, oy + j * cell, c, c)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    const col = pal[ch]; if (!col) continue
    ctx.fillStyle = col; ctx.fillRect(ox + i * cell, oy + j * cell, c, c)
  }
  ctx.restore()
}
const BM = s => s.trim().split(/\s+/)

// ─────────────────────────────────────────────── the sprite rig (mirrors drawStarChar's transform exactly)
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
export function rig(x, y, size, t, { hops = null, squash = 0, seed = 1, pop = 1, bob } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sx = 1 + sq, sy = 1 - sq * 0.9
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  const ox = Math.round(x), oy = Math.round(cy + base)
  return {
    cell, sx, sy, cy, size: s,
    at: (i, j) => [ox + (i - HALF) * cell * sx, oy + ((j - HALF) * cell - base) * sy],
    enter(ctx) { ctx.translate(ox, oy); ctx.scale(sx, sy); ctx.translate(-HALF * cell, -HALF * cell - base) },
  }
}

// ─────────────────────────────────────────────── auntie glasses (two 9×9 lens rings around the eyes)
const LENS = [[8, 14], [19, 14]]
function ringCells(x0, y0, n = 9) {
  const out = []
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const edge = i === 0 || j === 0 || i === n - 1 || j === n - 1, corner = (i === 0 || i === n - 1) && (j === 0 || j === n - 1)
    if (edge && !corner) out.push([x0 + i, y0 + j])
  }
  for (const [i, j] of [[1, 1], [n - 2, 1], [1, n - 2], [n - 2, n - 2]]) out.push([x0 + i, y0 + j])
  return out
}
export function drawGlasses(ctx, R, { down = 0, frame = '#7a1f3d', hi = '#ffd98a', alpha = 1, fog = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; R.enter(ctx)
  const c = R.cell, px = (i, j, col, w = 1, h = 1) => { ctx.fillStyle = col; ctx.fillRect(i * c, j * c, w * c, h * c) }
  const dy = Math.round(down * 4)
  for (const [lx, ly0] of LENS) {
    const ly = ly0 + dy
    ctx.fillStyle = hexA('#bfefff', 0.16 + 0.55 * fog); ctx.fillRect((lx + 1) * c, (ly + 1) * c, 7 * c, 7 * c)
    for (const [i, j] of ringCells(lx, ly)) px(i, j, frame)
    px(lx + 2, ly + 1, hi); px(lx + 1, ly + 2, hi); px(lx + 6, ly + 6, 'rgba(255,255,255,0.85)')
  }
  px(17, 16 + dy, frame, 2, 1); px(6, 16 + dy, frame, 2, 1); px(28, 16 + dy, frame, 2, 1)
  ctx.restore()
}

// ─────────────────────────────────────────────── Scorpio's magnifier: a lens over the right eye, one giant eye in it
export function drawMagnifier(ctx, R, t, { k = 1, look = [0, 0] } = {}) {
  if (k <= 0.01) return
  const c = R.cell * R.sx, [ex, ey] = R.at(23, 19.4)
  ctx.save()
  ctx.translate(ex, ey); ctx.scale(k, k)
  const r = 6.6 * c
  // handle (down-right), chunky pixel steps
  for (let s = 0; s < 8; s++) {
    const hx = r * 0.66 + s * c * 0.92, hy = r * 0.66 + s * c * 0.92
    ctx.fillStyle = INK; ctx.fillRect(hx - c * 1.4, hy - c * 1.4, c * 2.8, c * 2.8)
  }
  for (let s = 0; s < 8; s++) {
    const hx = r * 0.66 + s * c * 0.92, hy = r * 0.66 + s * c * 0.92
    ctx.fillStyle = s < 2 ? '#c9a14a' : s % 3 === 0 ? '#6b3f1f' : '#8a5a2b'; ctx.fillRect(hx - c * 0.9, hy - c * 0.9, c * 1.8, c * 1.8)
  }
  // the giant eye behind the glass
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r - c * 0.4, 0, TAU); ctx.clip()
  ctx.fillStyle = '#2a1840'; ctx.fillRect(-r, -r, 2 * r, 2 * r)
  const er = r * 0.78
  ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.arc(0, c * 0.4, er, 0, TAU); ctx.fill()
  const px0 = look[0] * er * 0.32, py0 = look[1] * er * 0.32 + c * 0.6
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(px0, py0, c * 2.7, 0, TAU); ctx.fill()
  ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(px0 - c * 1.7), Math.round(py0 - c * 1.7), Math.round(c * 1.3), Math.round(c * 1.3))
  ctx.fillRect(Math.round(px0 + c * 0.9), Math.round(py0 + c * 0.9), Math.round(c * 0.6), Math.round(c * 0.6))
  // a squinty lid that slowly blinks shut and back once in a while
  const lid = Math.max(0, Math.sin(t * 1.3)) ** 24
  ctx.fillStyle = '#e23d66'; ctx.fillRect(-r, -r, 2 * r, (r - er * 0.55) + lid * er * 1.4)
  ctx.fillStyle = 'rgba(191,239,255,0.18)'; ctx.fillRect(-r, -r, 2 * r, 2 * r)
  ctx.restore()
  // frame + glint
  ctx.lineWidth = c * 1.5; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke()
  ctx.lineWidth = c * 0.8; ctx.strokeStyle = '#f2c75c'; ctx.beginPath(); ctx.arc(0, 0, r - c * 0.15, 0, TAU); ctx.stroke()
  ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fillRect(-r * 0.55, -r * 0.62, c * 1.6, c * 0.8); ctx.fillRect(-r * 0.66, -r * 0.45, c * 0.8, c * 0.8)
  ctx.restore()
}

// ─────────────────────────────────────────────── boxing gloves (knuckles right; flipped for the left arm)
const GLOVE = [
  '....hhhhhh...',
  '..hhRRRRRRR..',
  '.hRRRRRRRRRR.',
  'WWRRRRRRRRRRR',
  'WWRRRRRRRRRRR',
  'WWRhRRRRRRRRR',
  'WWRRhhRRRRRRd',
  'WWRRRRhRRRRRd',
  'WW.RRRRRRRRd.',
  '....dddddd...',
]
const GLOVE_C = { R: '#e8382c', h: '#ff8a6a', d: '#9c1d1d', W: '#f3ead8' }
/** punches: [{ t, side: -1 | 1 }] → the glove thrusts in toward the centre and at the camera, then snaps back */
export function drawGloves(ctx, R, t, punches = [], { k = 1, guard = 0 } = {}) {
  if (k <= 0.01) return
  const gc = R.cell * 0.78 * k
  for (const side of [-1, 1]) {
    let thrust = 0
    for (const p of punches) if (p.side === side) { const d = t - p.t; if (d >= 0 && d < 0.32) thrust = Math.max(thrust, d < 0.08 ? d / 0.08 : 1 - ease.inQuad((d - 0.08) / 0.24)) }
    const [ax, ay] = R.at(side < 0 ? 2.2 : 33.8, 15.2 - guard * 4)
    const bob = Math.sin(t * 9 + side) * R.cell * 0.4 * (1 - thrust)
    const cx = lerp(ax, ax - side * R.cell * 11, ease.outCubic(thrust)), cy = ay + bob + thrust * R.cell * 1.5
    drawBits(ctx, GLOVE, cx, cy, gc, GLOVE_C, { flip: side < 0, sc: 1 + 0.75 * ease.outCubic(thrust), rot: side * (0.15 - 0.15 * thrust) })
  }
}

// ─────────────────────────────────────────────── a little phone held low, screen-lit
const PHONE = BM(`
KKKKKKKK
KSSSSSSK
KSLSSSSK
KSSSSSSK
KSLLSSSK
KSSSSSSK
KSSSLSSK
KSSSSSSK
KKKWWKKK`)
export function drawPhone(ctx, R, { k = 1, t = 0 } = {}) {
  if (k <= 0.01) return
  const [px, py] = R.at(18, 28.5)
  glow(ctx, px, py - R.cell * 3, R.cell * 9 * k, '#8fd8f6', 0.55 * k)
  const flick = 0.85 + 0.15 * Math.sin(t * 17)
  drawBits(ctx, PHONE, px, py, R.cell * 0.82 * k, { K: '#241a40', S: hexA('#9fe6ff', flick), L: '#ffffff', W: '#5a4a8a' })
}

// ─────────────────────────────────────────────── Cancer's soup (steaming), held at the right arm
const BOWL = BM(`
...........hh...
..........hh....
..YYYYYYYYhYYY..
.YNYYCYYYYNYYCY.
RRRRRRRRRRRRRRRR
BWBBBBBBBBBBBBBD
.BWBBBBBBBBBBBD.
..BBBBBBBBBBBD..
...DDDDDDDDDD...
.....FFFFFF.....`)
const BOWL_C = { Y: '#f7c95a', N: '#fff3c8', C: '#ff8a3a', R: '#fffaf0', B: '#f4ecdc', W: '#ffffff', D: '#c9b79a', F: '#b3a083', h: '#c9cfdc' }
export function drawSoup(ctx, cx, cy, cell, t, { k = 1, steam = 1 } = {}) {
  if (k <= 0.01) return
  drawBits(ctx, BOWL, cx, cy, cell * k, BOWL_C)
  if (steam <= 0) return
  // three wavy wisps rising off the broth
  ctx.save()
  for (let s = 0; s < 3; s++) for (let n = 0; n < 7; n++) {
    const ph = ((t * 0.9 + s * 0.31 + n / 7) % 1)
    const wx = cx + (s - 1) * cell * 4.2 * k + Math.sin(ph * 9 + s * 2) * cell * 1.1 * k, wy = cy - cell * 5 * k - ph * cell * 13 * k
    ctx.globalAlpha = steam * Math.sin(Math.PI * ph) * 0.8
    ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(wx), Math.round(wy), Math.ceil(cell * k), Math.ceil(cell * k))
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── Libra's fit pic: a dress on a hanger
const DRESS = BM(`
......HH......
.....H..H.....
........H.....
.......H......
......HH......
....HH..HH....
..HH......HH..
HHHHHHHHHHHHHH
....PP..PP....
....PPPPPP....
...PPPPPPPP...
...PPPWPPPP...
...GGGGGGGG...
..PPPPPPPPPP..
..PPPPPPPPPP..
.PPPPPPPPPPPP.
.PPPWPPPPPPPP.
PPPPPPPPPPPPPP
PdPPdPPdPPdPPd`)
const DRESS_C = { H: '#d9dde8', P: '#ff7eb6', d: '#d94f8f', G: '#f2c75c', W: '#ffd1e6' }
export function drawDress(ctx, cx, cy, cell, t, { k = 1, swing = 0 } = {}) {
  if (k <= 0.01) return
  drawBits(ctx, DRESS, cx, cy, cell * k, DRESS_C, { ay: 0.05, rot: swing * Math.sin(t * 3.2) * 0.12 })
}

// ─────────────────────────────────────────────── Virgo's clipboard
const CLIP = BM(`
....GGGG....
.BBBGWWGBBB.
BBPPPPPPPPBB
BBPLLLLLLPBB
BBPPPPPPPPBB
BBPLLLLLPPBB
BBPPPPPPPPBB
BBPLLLLLLPBB
BBPPPPPPPPBB
BBPLLLLPPPBB
BBPPPPPPPPBB
.BBBBBBBBBB.`)
const CLIP_C = { B: '#a8763e', P: '#fffaf0', L: '#9aa3b5', G: '#f2c75c', W: '#fff6c8' }
export function drawClipboard(ctx, cx, cy, cell, { k = 1, rot = -0.14 } = {}) {
  if (k <= 0.01) return
  drawBits(ctx, CLIP, cx, cy, cell * k, CLIP_C, { rot })
}

// ─────────────────────────────────────────────── the dog (Scorpio's find)
const DOG = BM(`
E........E
EE......EE
EOOOOOOOOE
OOWOOOOWOO
OOKOOOOKOO
OOOWWWWOOO
.OWWNNWWO.
..WWWWWW..
...WTTW...`)
export function drawDog(ctx, cx, cy, cell, { alpha = 1 } = {}) {
  drawBits(ctx, DOG, cx, cy, cell, { E: '#b85f22', O: '#f29a4a', W: '#fff3dc', K: INK, N: INK, T: '#ff6f91' }, { alpha })
}

// ─────────────────────────────────────────────── a wedding bell (clapper swings)
const BELL = BM(`
....GG....
...GGGG...
..GGHGGG..
..GHGGGG..
.GGHGGGGG.
.GGGGGGGG.
GGGGGGGGGG
DDDDDDDDDD
....KK....`)
export function drawBell(ctx, cx, cy, cell, rot = 0, alpha = 1) {
  drawBits(ctx, BELL, cx, cy, cell, { G: '#f7c948', H: '#fff4b8', D: '#c98a1c', K: '#7a4a10' }, { rot, alpha, ay: 0.1 })
}

// ─────────────────────────────────────────────── little reaction marks
const BANG = BM(`XX XX XX XX .. XX`)
export function drawBang(ctx, cx, cy, cell, { alpha = 1, rot = 0, col = '#ffe08a' } = {}) { drawBits(ctx, BANG, cx, cy, cell, { X: col }, { alpha, rot }) }
const DROP = BM(`.X. XWX XXX .X.`)
export function drawSweat(ctx, cx, cy, cell, alpha = 1) { drawBits(ctx, DROP, cx, cy, cell, { X: '#7fd0ff', W: '#ffffff' }, { alpha }) }
const HEART = BM(`.H.H. HWHHH HHHHH .HHH. ..H..`)
export function drawHeart(ctx, cx, cy, cell, col = '#ff4f7e', alpha = 1) { drawBits(ctx, HEART, cx, cy, cell, { H: col, W: '#ffd1e0' }, { alpha }) }

/** fountain tears: arcs of blue drops spurting sideways from each eye ([[x, y], [x, y]]) */
export function drawTears(ctx, eyes, t, { cell = 6, strength = 1, alpha = 1 } = {}) {
  if (strength <= 0) return
  const c = Math.max(2, Math.round(cell))
  ctx.save()
  eyes.forEach(([ex, ey], side) => {
    const dir = side === 0 ? -1 : 1
    for (let k = 0; k < 12; k++) {
      const ph = (t * 2.1 + k / 12) % 1
      const vx = dir * (60 + 40 * strength) * c / 6, vy = -40 * c / 6
      const px = ex + vx * ph * 1.6, py = ey + vy * ph * 1.6 + 260 * c / 6 * ph * ph
      const a = (1 - ph) * clamp(strength)
      if (a <= 0.03) continue
      ctx.globalAlpha = alpha * a
      const X = Math.round(px), Y = Math.round(py)
      ctx.fillStyle = '#16204a'; ctx.fillRect(X - 1, Y - 1, c + 2, 2 * c + 2)
      ctx.fillStyle = '#5cc6ff'; ctx.fillRect(X, Y, c, 2 * c)
      ctx.fillStyle = '#e6f8ff'; ctx.fillRect(X, Y, Math.ceil(c / 2), Math.ceil(c / 2))
    }
  })
  ctx.restore()
}

/** pixel hearts floating up from (x, y), started at t0 */
export function drawHearts(ctx, t, t0, x, y, { n = 5, cell = 6, spread = 120, life = 1.4, seed = 1, alpha = 1 } = {}) {
  const r = rng(seed * 31 + 7)
  for (let i = 0; i < n; i++) {
    const d = r() * 0.5, dx = (r() - 0.5) * spread, sway = r() * TAU
    const p = (t - t0 - d) / life
    if (p < 0 || p > 1) continue
    drawHeart(ctx, x + dx + Math.sin(p * 6 + sway) * 14, y - p * spread * 1.4, cell, ['#ff4f7e', '#ff8fb1', '#f2c75c'][i % 3], alpha * Math.sin(Math.PI * p) * 1.3)
  }
}

/** confetti: pixel squares and strips tumbling down from y0, launched at t0 */
export function drawConfetti(ctx, t, t0, { n = 70, x0 = 0, x1 = 1080, y0 = 360, fall = 1500, life = 2.8, seed = 4, alpha = 1 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life + 0.6) return
  const r = rng(seed)
  const cols = [GOLD, PINK, LAV, '#7fe0ff', MINT, '#ffffff', '#ff7eb6']
  ctx.save()
  for (let i = 0; i < n; i++) {
    const x = lerp(x0, x1, r()), d = r() * 0.5, vy = 0.6 + r() * 0.6, sw = r() * TAU, sz = 8 + Math.round(r() * 6), col = cols[i % cols.length], strip = r() < 0.4
    const p = tt - d
    if (p < 0) continue
    const a = clamp(1 - (p - life + 0.6) / 0.6)
    if (a <= 0) continue
    const yy = y0 - 140 * Math.exp(-p * 3) + fall * vy * p * p * 0.32 + p * 60, xx = x + Math.sin(p * 4 + sw) * 30
    const flip = Math.abs(Math.cos(p * 7 + sw))
    ctx.globalAlpha = alpha * a
    ctx.fillStyle = col
    if (strip) ctx.fillRect(Math.round(xx), Math.round(yy), Math.max(2, Math.round(sz * 0.5 * flip)), sz * 1.6)
    else ctx.fillRect(Math.round(xx), Math.round(yy), Math.max(2, Math.round(sz * flip)), sz)
  }
  ctx.restore()
}

/** a burst of pixel-star sparkles from (cx, cy) starting at t0 */
export function sparkles(ctx, t, cx, cy, t0, { n = 10, R = 120, size = 24, seed = 1, dur = 0.6, cols = [GOLD, BONE, PINK, LAV] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const p = ease.outCubic(tt / dur)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / dur)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + seed
    drawPixelStar(ctx, cx + Math.cos(a) * R * (0.5 + 0.7 * p), cy + Math.sin(a) * R * (0.5 + 0.7 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  ctx.restore()
}

/** soft additive glow */
export function glow(ctx, cx, cy, r, col, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, hexA(col, 0.55 * a)); g.addColorStop(0.45, hexA(col, 0.18 * a)); g.addColorStop(1, hexA(col, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fill(); ctx.restore()
}

/** a small typing bubble (three bouncing dots) whose tail points down at (cx, cy) */
export function typingBubble(ctx, t, cx, cy, k, { col = INK, P = 5, frozen = false } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(Math.round(cx), Math.round(cy)); ctx.scale(k, k)
  const w = 20 * P, h = 11 * P
  ctx.fillStyle = 'rgba(14,8,32,0.92)'; ctx.fillRect(-w / 2 - P, -h - 3 * P - P, w + 2 * P, h + 2 * P)
  ctx.fillStyle = BONE; ctx.fillRect(-w / 2, -h - 3 * P, w, h)
  ctx.fillRect(-P * 2, -3 * P, P * 3, P); ctx.fillRect(-P, -2 * P, P * 2, P); ctx.fillRect(-P, -P, P, P)
  for (let i = 0; i < 3; i++) {
    const up = frozen ? 0 : Math.max(0, Math.sin(t * 11 - i * 0.9)) * P * 1.4
    ctx.fillStyle = col; ctx.fillRect(-w / 2 + (3.5 + i * 5) * P, -h - 3 * P + 4 * P - up, P * 3, P * 3)
  }
  ctx.restore()
}
