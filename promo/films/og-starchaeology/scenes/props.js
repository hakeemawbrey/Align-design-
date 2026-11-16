// starchaeology props: small pixel drawings on canvas (Star Talk season 3). Pure functions of their arguments; nothing
// touches `document` at module top level (the artifact sprites are baked lazily, on first draw, in the browser).
//   drawBitmap(ctx, rows, x, y, cell, pal, { ax, ay, rot, flip, alpha })   rows of chars, '.' = empty, other chars → pal[ch]
//   drawHelmet(ctx, x, y, size, { rot, alpha })        Capricorn's khaki pith helmet; (x, y) = the band's centre, size = width
//   drawBrush(ctx, x, y, cell, { rot, alpha })          an archaeologist's brush, bristles pointing left; (x, y) = bristle tip
//   drawJar(ctx, x, y, cell, { crumbs, alpha, rot })    Pisces' "MEMORIES" jar; (x, y) = the jar's centre
//   drawCricket(ctx, x, y, cell, { t, chirp, alpha })   a pixel cricket facing left; (x, y) = its feet
//   drawCrumb(ctx, x, y, cell, seed, { alpha, rot })     one breadcrumb (a crusty pixel blob, shape per seed)
//   drawDust(ctx, x, y, r, p, seed, { col, n })          a pixel dust puff at progress p (0…1)
//   drawTears(ctx, eyes, t, t0, { cell, strength })      cartoon fountain tears from [[x, y], …] eyes
//   drawPixelHeart(ctx, x, y, px, col)                   a 7×6 pixel heart centred on (x, y)
//   artifact(kind) → { c, w, h }                          baked sprites: 'shard' | 'fossil' | 'cave' | 'beach' (cell canvases)
//   drawPlacard(ctx, x, y, { title, sub, w, h, alpha })  a museum label on a little brass post; (x, y) = top centre
//   drawCalendar(ctx, x, y, w, h, page, { flip, t })     a wall calendar; page = { label, cricket } (see index.js)
import { clamp, lerp, rng } from '../../../src/lib.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const INK = '#1b1236'

export function drawBitmap(ctx, rows, x, y, cell, pal, { ax = 0.5, ay = 0.5, rot = 0, flip = false, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const w = rows[0].length, h = rows.length, c = Math.max(1, Math.round(cell))
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(y))
  if (rot) ctx.rotate(rot)
  if (flip) ctx.scale(-1, 1)
  const ox = -Math.round(w * c * ax), oy = -Math.round(h * c * ay)
  rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const col = pal[r[i]]; if (!col) continue; ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c, c) } })
  ctx.restore()
}

// ── the pith helmet (front view): a khaki dome with a button on top, a brown band, a wide brim
const HELMET = [
  '........KKKK........',
  '.......KLLHHK.......',
  '.....KKLLHHHHKK.....',
  '....KLLLHHHHHHDK....',
  '...KLLHHHHHHHHHDK...',
  '..KLLHHHHHHHHHHDDK..',
  '..KLHHHHHHHHHHHDDK..',
  '..KBBBBBBBBBBBBBBK..',
  '..KbbbbbbbbbbbbbbK..',
  'KKKHHHHHHHHHHHHHDKKK',
  'KLLHHHHHHHHHHHHHHDDK',
  '.KKDDDDDDDDDDDDDDKK.',
  '...KKKKKKKKKKKKKK...',
]
const HELMET_PAL = { K: '#3a2614', L: '#f8e6b0', H: '#dcbc78', D: '#a9844a', B: '#6e4b2a', b: '#57391f' }
/** (x, y) = the centre of the band; size = the helmet's width in px */
export function drawHelmet(ctx, x, y, size, { rot = 0, alpha = 1 } = {}) {
  const cell = Math.max(2, Math.round(size / 20))
  drawBitmap(ctx, HELMET, x, y, cell, HELMET_PAL, { ax: 0.5, ay: 7.5 / 13, rot, alpha })
}

// ── the brush: bristles on the left (at the origin), a silver ferrule, a long wooden handle to the right
const BRUSH = [
  '.YYYYKKKKK.............',
  'yYYYYKGGGKKKKKKKKKKKKK.',
  'yYyYYKGgGKWWWWWWWWWWWWK',
  'yYYyYKGgGKwwwwwwwwwwwwK',
  'yYYYYKGGGKKKKKKKKKKKKK.',
  '.YYYYKKKKK.............',
]
const BRUSH_PAL = { K: '#2a1a10', Y: '#f2d488', y: '#c79a4a', G: '#d7d9e6', g: '#9aa0b8', W: '#c98a4a', w: '#94582a' }
export function drawBrush(ctx, x, y, cell, { rot = 0, alpha = 1 } = {}) {
  drawBitmap(ctx, BRUSH, x, y, cell, BRUSH_PAL, { ax: 0, ay: 0.5, rot, alpha })
}

// ── Pisces' jar: a lid, glass sides (see-through), a cream label that reads MEMORIES with a little heart
const JAR = [
  '...KKKKKKKKKK...',
  '...KMMMMMMMMK...',
  '...KMmmmmmmmK...',
  '..KKKKKKKKKKKK..',
  '.KGgg......ggGK.',
  'KGg..........gGK',
  'KG............GK',
  'KLLLLLLLLLLLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KG............GK',
  'KG............GK',
  'KGg..........gGK',
  '.KGGGGGGGGGGGGK.',
  '..KKKKKKKKKKKK..',
]
const JAR_PAL = { K: '#16204a', M: '#f2c75c', m: '#b8862a', G: '#bfe8ff', g: '#ffffff', L: '#fff3dc' }
export function drawJar(ctx, x, y, cell, { crumbs = 0, alpha = 1, rot = 0 } = {}) {
  if (alpha <= 0) return
  const c = Math.max(2, Math.round(cell)), w = 16 * c, h = 16 * c
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(y)); if (rot) ctx.rotate(rot)
  // the glass: a faint blue fill behind everything
  ctx.fillStyle = 'rgba(170,220,255,0.18)'; ctx.fillRect(-w / 2 + c, -h / 2 + 4 * c, w - 2 * c, 11 * c)
  // the crumb(s) inside, resting on the bottom
  for (let i = 0; i < crumbs; i++) drawCrumb(ctx, (i - (crumbs - 1) / 2) * 4 * c, h / 2 - 3.2 * c, c * 0.9, 31 + i * 7)
  drawBitmap(ctx, JAR, 0, 0, c, JAR_PAL)
  // label text
  ctx.fillStyle = '#7c2a4a'; ctx.font = `700 ${Math.round(c * 2.1)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('MEMORIES', 0, -h / 2 + 8.6 * c)
  drawPixelHeart(ctx, 0, -h / 2 + 10.4 * c, Math.max(1, Math.round(c / 3)), '#ff5c8e')
  // a glint
  ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(-w / 2 + 2 * c, -h / 2 + 5 * c, c, 2 * c); ctx.fillRect(-w / 2 + 2 * c, -h / 2 + 12 * c, c, c)
  ctx.restore()
}

// ── a cricket (side view, facing left): long antennae, a green body, a big hind leg
const CRICKET = [
  'A.............',
  '.A............',
  '..A...........',
  '...A..........',
  '...HHGGGGGGG..',
  '..HHEGgggggGGG',
  '..HHHGGGGGGGGG',
  '...LL.LLLL.LL.',
  '..L...L..L..L.',
]
const CRICKET_PAL = { A: '#3d6b2a', H: '#4f9a3a', E: '#16100a', G: '#6cc24a', g: '#9fe07a', L: '#2f5a22' }
export function drawCricket(ctx, x, y, cell, { t = 0, chirp = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const c = Math.max(2, Math.round(cell)), hop = chirp > 0 ? Math.round(Math.abs(Math.sin(t * 40)) * c * 0.5) : 0
  drawBitmap(ctx, CRICKET, x, y - hop, c, CRICKET_PAL, { ax: 0.5, ay: 1, alpha })
  if (chirp > 0) {   // little sound-wave arcs above it
    ctx.save(); ctx.globalAlpha *= alpha * clamp(chirp); ctx.fillStyle = '#efe6d6'
    for (let k = 0; k < 2; k++) {
      const ph = (t * 3 + k * 0.5) % 1, r = (2 + ph * 4 + k) * c, a = 1 - ph
      ctx.globalAlpha = alpha * clamp(chirp) * a
      for (let s = -1; s <= 1; s += 2) for (let j = -1; j <= 1; j++) ctx.fillRect(Math.round(x + s * (r + 4 * c)), Math.round(y - 8 * c + j * c * 1.4 - r * 0.2), c, c)
    }
    ctx.restore()
  }
}

// ── a breadcrumb: a crusty blob (deterministic per seed)
const CRUMB_SHAPES = [
  ['.CCC.', 'CIIIC', 'CIIhC', '.CCc.'],
  ['..CC.', '.CIIC', 'CIIhC', 'CCcc.'],
  ['.CC..', 'CIhC.', 'CIICC', '.CcC.'],
  ['CCC', 'CIC', 'Ccc'],
  ['.CCC', 'CIhC', 'CcC.'],
]
const CRUMB_PAL = { C: '#b8742e', c: '#7e4a1c', I: '#f1c27d', h: '#ffe8b4' }
export function drawCrumb(ctx, x, y, cell, seed, { alpha = 1, rot = 0 } = {}) {
  drawBitmap(ctx, CRUMB_SHAPES[Math.abs(seed) % CRUMB_SHAPES.length], x, y, cell, CRUMB_PAL, { rot, alpha })
}

// ── a dust puff: pixel clumps flying out and fading
export function drawDust(ctx, x, y, r, p, seed, { col = '#c9b48a', n = 9, alpha = 1 } = {}) {
  if (p <= 0 || p >= 1) return
  const R = rng(seed * 97 + 5)
  ctx.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + R() * 0.6, d = r * (0.25 + 0.75 * Math.sqrt(p)) * (0.6 + 0.5 * R()), s = Math.max(3, Math.round(r * 0.16 * (1 - 0.6 * p) * (0.7 + 0.6 * R())))
    ctx.globalAlpha = alpha * (1 - p) * 0.9
    ctx.fillStyle = i % 3 ? col : '#efe2c4'
    const px = Math.round(x + Math.cos(a) * d), py = Math.round(y + Math.sin(a) * d * 0.6 - p * r * 0.25)
    ctx.fillRect(px - s, py - s / 2, s * 2, s); ctx.fillRect(px - s / 2, py - s, s, s * 2)
  }
  ctx.restore()
}

// ── tears: arcs of blue pixel drops spurting sideways from each eye (from stwereup)
export function drawTears(ctx, eyes, t, t0, { cell = 6, strength = 1, alpha = 1 } = {}) {
  if (t < t0 || strength <= 0) return
  const c = Math.max(2, Math.round(cell))
  ctx.save(); ctx.globalAlpha *= alpha
  eyes.forEach(([ex, ey], side) => {
    const dir = side === 0 ? -1 : 1
    for (let k = 0; k < 9; k++) {
      const ph = ((t - t0) * 2.1 + k / 9) % 1
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

const HEART = ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
export function drawPixelHeart(ctx, x, y, px, col = '#ff3d6e') {
  drawBitmap(ctx, HEART, x, y, px, { X: col, W: '#ffe0ea' })
}

// ─────────────────────────────── baked artifact sprites (one art pixel per canvas pixel; draw with smoothing off)
const SPR = {}
const mk = (w, h) => { const c = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(w, h) : Object.assign(document.createElement('canvas'), { width: w, height: h }); return { c, x: c.getContext('2d'), w, h } }
function inPoly(px, py, V) {
  let s = false
  for (let i = 0, j = V.length - 1; i < V.length; j = i++) {
    const [xi, yi] = V[i], [xj, yj] = V[j]
    if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) s = !s
  }
  return s
}
/** paint a cell mask: inside(i, j) → colour(i, j, edge) where edge = 1 on the outline ring, 2 on the inner ring */
function paintMask(S, inside, colour) {
  const { x, w, h } = S, m = new Uint8Array(w * h)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) m[j * w + i] = inside(i + 0.5, j + 0.5) ? 1 : 0
  const at = (i, j) => i >= 0 && j >= 0 && i < w && j < h && m[j * w + i] === 1
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    if (!at(i, j)) continue
    const edge = !(at(i + 1, j) && at(i - 1, j) && at(i, j + 1) && at(i, j - 1)) ? 1 : !(at(i + 2, j) && at(i - 2, j) && at(i, j + 2) && at(i, j - 2)) ? 2 : 0
    const c = colour(i, j, edge)
    if (c) { x.fillStyle = c; x.fillRect(i, j, 1, 1) }
  }
  return at
}

// the pottery shard (44 × 30): jagged terracotta, a black meander band near the rim
function bakeShard() {
  const S = mk(44, 30), R = rng(11)
  const V = [[2, 9], [7, 4], [13, 2], [19, 0.5], [27, 1.5], [33, 1], [38, 4], [43, 9], [41, 14], [43.5, 20], [39, 26], [31, 29.5], [24, 27.5], [17, 29.5], [9, 27], [4, 22], [1, 16], [3.5, 13]]
  paintMask(S, (x, y) => inPoly(x, y, V), (i, j, edge) => {
    if (edge === 1) return '#4a2010'
    const band = j >= 6 && j <= 9, key = band && ((j === 6 || j === 9) || ((i + (j === 7 ? 0 : 2)) % 4 === 0))
    if (key) return '#24120a'
    if (band) return '#c56a3c'
    const n = R()
    const light = i + j < 18 ? 0.35 : 0
    return n < 0.08 ? '#8e4424' : n < 0.18 + light ? '#e3905e' : (i + j > 54 ? '#a5532c' : '#cc7343')
  })
  return S
}
// the fossil (36 × 34): a grey stone slab with chipped corners and a flame pressed into it (embossed)
const FLAME = [
  '.....X.....',
  '.....XX....',
  '....XXX....',
  '....XXXX...',
  '...XXXXX.X.',
  '.X.XXXXXXX.',
  '.XXXXXXXXX.',
  'XXXXXXXXXXX',
  'XXXX.X.XXXX',
  'XXX.....XXX',
  'XXX.....XXX',
  '.XX.....XX.',
  '..XX...XX..',
  '...XXXXX...',
]
function bakeFossil() {
  const S = mk(36, 34), R = rng(23)
  const V = [[3, 0], [30, 0.5], [35.5, 5], [36, 27], [32, 33.5], [6, 34], [0.5, 30], [0, 6]]
  paintMask(S, (x, y) => inPoly(x, y, V), (i, j, edge) => {
    if (edge === 1) return '#2e2a30'
    const n = R()
    if (edge === 2 && i + j < 34) return '#c9c3b8'
    if (edge === 2) return '#6e6862'
    return n < 0.1 ? '#7a746c' : n < 0.22 ? '#b2aca2' : '#9a948a'
  })
  // the flame imprint: dark lower-right, light upper-left (pressed in), centred
  const fx = Math.round((36 - 11 * 2) / 2), fy = Math.round((34 - 14 * 2) / 2) + 1
  const put = (dx, dy, col) => FLAME.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') { S.x.fillStyle = col; S.x.fillRect(fx + i * 2 + dx, fy + j * 2 + dy, 2, 2) } }))
  put(-2, -2, '#e6e0d4'); put(2, 2, '#2e2a28'); put(1, 1, '#3e3a36'); put(0, 0, '#6a645c')
  // a few hairline cracks
  S.x.fillStyle = '#5a5550'
  for (const [i, j] of [[4, 22], [5, 23], [6, 23], [7, 24], [29, 6], [30, 7], [30, 8], [31, 9]]) S.x.fillRect(i, j, 1, 1)
  return S
}
// the cave painting (70 × 40): a ragged rock slab, red-ochre stick figures, a hand stencil, a sun
const STICK = ['..XX..', '..XX..', 'X.XX.X', '.XXXX.', '..XX..', '..XX..', '.X..X.', 'X....X']
const HAND = ['.X.X.X..', '.X.X.X..', 'XX.X.X..', 'XXXXXX.X', 'XXXXXXXX', 'XXXXXXX.', '.XXXXX..', '.XXXXX..']
function bakeCave() {
  const S = mk(70, 40), R = rng(37)
  const V = [[2, 6], [9, 2], [18, 3], [26, 0.5], [37, 2], [46, 0.5], [57, 2.5], [66, 1], [69.5, 8], [68, 18], [69.5, 28], [66, 37], [55, 39.5], [44, 38], [33, 39.5], [21, 38], [10, 39.5], [3, 35], [0.5, 25], [2, 15]]
  paintMask(S, (x, y) => inPoly(x, y, V), (i, j, edge) => {
    if (edge === 1) return '#3a2616'
    const n = R(), streak = Math.sin(i * 0.31 + j * 0.9) > 0.85
    if (edge === 2 && j < 6) return '#d8b48a'
    return n < 0.07 ? '#8a6440' : n < 0.17 ? '#d1aa7e' : streak ? '#b08860' : '#c49c70'
  })
  const ochre = (rows, x0, y0, col = '#a8321e') => rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') { S.x.fillStyle = col; S.x.fillRect(x0 + i, y0 + j, 1, 1) } }))
  // the hand stencil (top-left), the sun (top-right), two little figures waving at each other (bottom-right)
  ochre(HAND, 5, 5, '#b8452a')
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; S.x.fillStyle = '#c0552a'; S.x.fillRect(Math.round(60 + Math.cos(a) * 5), Math.round(9 + Math.sin(a) * 5), 1, 1) }
  S.x.fillStyle = '#c0552a'; S.x.fillRect(59, 8, 3, 3)
  ochre(STICK, 50, 28); ochre(STICK, 59, 28)
  return S
}
// the 2019 beach pic (48 × 64): a sunset over the sea, a palm, someone with their arms up
function bakeBeach() {
  const S = mk(48, 64), { x } = S, R = rng(5)
  const sky = ['#2c1a5c', '#3e1f6a', '#5a2470', '#7c2a74', '#a33370', '#c8466a', '#e4605e', '#f37f52', '#fb9f4c', '#ffbf5a', '#ffd77a']
  for (let j = 0; j < 36; j++) {
    const f = j / 36 * (sky.length - 1), k = Math.floor(f), fr = f - k
    for (let i = 0; i < 48; i++) { const d = ((i * 7 + j * 13) % 4) / 4; x.fillStyle = sky[Math.min(sky.length - 1, k + (fr > d ? 1 : 0))]; x.fillRect(i, j, 1, 1) }
  }
  // the sun on the horizon
  for (let j = 26; j < 36; j++) for (let i = 14; i < 34; i++) { const d = Math.hypot(i + 0.5 - 24, j + 0.5 - 36); if (d < 9) { x.fillStyle = d > 7.6 ? '#ffd26a' : '#fff1a8'; x.fillRect(i, j, 1, 1) } }
  // sea
  const sea = ['#3a5aa8', '#2f4f98', '#294585', '#233c74']
  for (let j = 36; j < 50; j++) for (let i = 0; i < 48; i++) { x.fillStyle = sea[Math.min(3, Math.floor((j - 36) / 3.6))]; x.fillRect(i, j, 1, 1) }
  for (let j = 37; j < 50; j += 2) { const wd = Math.max(1, 9 - (j - 37) * 0.6); for (let i = Math.round(24 - wd); i < Math.round(24 + wd); i++) if ((i + j) % 3) { x.fillStyle = j < 42 ? '#ffe08a' : '#f3b25a'; x.fillRect(i, j, 1, 1) } }
  for (let j = 38; j < 50; j += 3) for (let i = 0; i < 48; i++) if (R() < 0.12) { x.fillStyle = '#6f8fd8'; x.fillRect(i, j, 2, 1) }
  // sand
  for (let j = 50; j < 64; j++) for (let i = 0; i < 48; i++) { x.fillStyle = R() < 0.1 ? '#d9b27a' : j === 50 ? '#fff0cc' : '#efcf94'; x.fillRect(i, j, 1, 1) }
  // palm (left): a curved trunk and fronds
  x.fillStyle = '#4a2c1c'
  for (let j = 20; j < 58; j++) { const cx = Math.round(9 - (58 - j) * 0.12 + Math.sin(j * 0.15) * 1.2); x.fillRect(cx, j, 2, 1); if (j % 3 === 0) { x.fillStyle = '#6e4428'; x.fillRect(cx, j, 2, 1); x.fillStyle = '#4a2c1c' } }
  const frond = (pts) => { x.fillStyle = '#1f5a3a'; for (const [i, j] of pts) x.fillRect(i, j, 2, 1) }
  frond([[7, 19], [5, 19], [3, 20], [1, 21], [0, 22], [9, 18], [11, 17], [13, 17], [15, 18], [17, 19], [18, 20], [8, 20], [6, 21], [4, 23], [3, 25], [10, 20], [12, 21], [14, 23], [15, 25]])
  x.fillStyle = '#3f8a52'; for (const [i, j] of [[6, 18], [10, 17], [13, 16], [4, 19]]) x.fillRect(i, j, 2, 1)
  // someone on the sand, arms up (a happy silhouette)
  const P = ['.X...X.', '.X...X.', '..XXX..', '..XXX..', '..XXX..', '..XXX..', '..X.X..', '..X.X..', '.XX.XX.']
  const H = ['.XX.', 'XXXX', 'XXXX', '.XX.']
  x.fillStyle = '#1b1236'
  H.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') x.fillRect(31 + i, 43 + j, 1, 1) }))
  P.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') x.fillRect(30 + i, 46 + j, 1, 1) }))
  x.fillRect(29, 42, 1, 1); x.fillRect(37, 42, 1, 1)
  return S
}
export function artifact(kind) {
  if (!SPR[kind]) SPR[kind] = kind === 'shard' ? bakeShard() : kind === 'fossil' ? bakeFossil() : kind === 'cave' ? bakeCave() : bakeBeach()
  return SPR[kind]
}

// ── a museum label on a little brass post. (x, y) = the label's top centre.
export function drawPlacard(ctx, x, y, { title, sub, w = 400, h = 118, alpha = 1, post = 60 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const X = Math.round(x - w / 2), Y = Math.round(y)
  // post + foot
  if (post > 0) {
    ctx.fillStyle = '#5a3d1a'; ctx.fillRect(Math.round(x - 7), Y + h, 14, post)
    ctx.fillStyle = '#c9a24a'; ctx.fillRect(Math.round(x - 5), Y + h, 6, post)
    ctx.fillStyle = '#5a3d1a'; ctx.fillRect(Math.round(x - 40), Y + h + post - 4, 80, 10)
    ctx.fillStyle = '#c9a24a'; ctx.fillRect(Math.round(x - 38), Y + h + post - 4, 76, 4)
  }
  // shadow, brass frame (stepped corners), cream face
  ctx.fillStyle = 'rgba(6,4,18,0.55)'; ctx.fillRect(X + 8, Y + 10, w, h)
  ctx.fillStyle = '#5a3d1a'; ctx.fillRect(X + 4, Y, w - 8, h); ctx.fillRect(X, Y + 4, w, h - 8)
  ctx.fillStyle = '#d9b45a'; ctx.fillRect(X + 6, Y + 4, w - 12, h - 8); ctx.fillRect(X + 4, Y + 6, w - 8, h - 12)
  ctx.fillStyle = '#f6eedb'; ctx.fillRect(X + 12, Y + 12, w - 24, h - 24)
  ctx.fillStyle = '#fffaf0'; ctx.fillRect(X + 12, Y + 12, w - 24, 4)
  // screws
  ctx.fillStyle = '#8a6a2a'; for (const [sx, sy] of [[X + 9, Y + 8], [X + w - 13, Y + 8], [X + 9, Y + h - 12], [X + w - 13, Y + h - 12]]) ctx.fillRect(sx, sy, 4, 4)
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#2a1a10'; ctx.font = `700 ${Math.round(h * 0.33)}px ${SERIF}`; ctx.fillText(title, x, Y + h * 0.5)
  ctx.fillStyle = '#7a5a30'; ctx.font = `700 ${Math.round(h * 0.2)}px ${MONO}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = '2px'
  ctx.fillText(sub, x, Y + h * 0.8)
  ctx.restore()
}

// ── a wall calendar page: two binder rings, a red header with the label, weekday row, an empty grid, "PLANS: 0"
export function drawCalendarPage(ctx, X, Y, w, h, label, { back = false, cricket = null, t = 0, stamp = 1 } = {}) {
  const hh = Math.round(h * 0.2)
  if (back) {   // the back of a page while it flips up
    ctx.fillStyle = '#d9cfbd'; ctx.fillRect(X, Y, w, h)
    ctx.fillStyle = '#c2b8a6'; for (let j = Y + 20; j < Y + h; j += 26) ctx.fillRect(X + 10, j, w - 20, 3)
    return
  }
  ctx.fillStyle = '#f6efe0'; ctx.fillRect(X, Y, w, h)
  ctx.fillStyle = '#d9434f'; ctx.fillRect(X, Y, w, hh)
  ctx.fillStyle = '#ef6a72'; ctx.fillRect(X, Y, w, 5)
  ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.font = `700 ${Math.round(hh * 0.5)}px ${MONO}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
  ctx.fillText(label, X + w / 2, Y + hh * 0.56)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  // weekdays
  const gx = X + 22, gw = w - 44, cw = gw / 7, gy = Y + hh + 14
  ctx.fillStyle = '#8a7f70'; ctx.font = `700 ${Math.round(cw * 0.36)}px ${MONO}`
  'SMTWTFS'.split('').forEach((d, i) => ctx.fillText(d, gx + cw * (i + 0.5), gy + 12))
  // grid: all empty
  const rows = 5, gh = h - hh - 14 - 34 - 22, ch = gh / rows, gy2 = gy + 30
  ctx.fillStyle = '#e4dccb'
  for (let r = 0; r <= rows; r++) ctx.fillRect(gx, Math.round(gy2 + r * ch), gw, 3)
  for (let c = 0; c <= 7; c++) ctx.fillRect(Math.round(gx + c * cw), gy2, 3, gh)
  // little day numbers in the corners
  ctx.fillStyle = '#b9ae9c'; ctx.font = `700 ${Math.round(ch * 0.22)}px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'top'
  for (let r = 0; r < rows; r++) for (let c = 0; c < 7; c++) { const n = r * 7 + c + 1; if (n <= 31) ctx.fillText(String(n), Math.round(gx + c * cw + 6), Math.round(gy2 + r * ch + 6)) }
  if (cricket) cricket(gx + cw * 3.5, gy2 + ch * 3.82)
  // PLANS: 0 stamp
  if (stamp > 0) {
    ctx.save(); ctx.globalAlpha *= clamp(stamp)
    const sx = X + w - 150, sy = Y + h - 58
    ctx.translate(sx, sy); ctx.rotate(-0.12); ctx.scale(lerp(1.6, 1, clamp(stamp)), lerp(1.6, 1, clamp(stamp)))
    ctx.strokeStyle = '#d9434f'; ctx.lineWidth = 5; ctx.strokeRect(-118, -30, 236, 60)
    ctx.fillStyle = '#d9434f'; ctx.font = `700 34px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('PLANS: 0', 0, 2)
    ctx.restore()
  }
}
export function drawRings(ctx, X, Y, w) {
  for (const rx of [X + w * 0.25, X + w * 0.75]) {
    ctx.fillStyle = '#2a2440'; ctx.fillRect(Math.round(rx - 9), Y - 26, 18, 44)
    ctx.fillStyle = '#c9c6d8'; ctx.fillRect(Math.round(rx - 5), Y - 24, 10, 40)
    ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(rx - 5), Y - 24, 3, 16)
  }
}
export { MONO, SERIF, INTER, INK }
