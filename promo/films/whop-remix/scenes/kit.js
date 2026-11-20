// whop-remix shared kit: card faces in 3D, captions, pixel twinkles, and the pixel mound (feature S2 → S3), adapted
// from promo/films/whop and promo/src/scenes/s2-intro.js
import { clamp, lerp, prog, ease, rng, el, PIXEL_PALETTE } from '../../../src/lib.js'
import { W, H, VERT, A, SERIF, MONO, img } from '../../../src/scenes/common.js'

export const U = Math.min(W, H) / 1080
export const BONE = '#efe6d6', GOLD = '#f2c75c'
export const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
export const SPARKS = ['#f2c75c', '#fff4cf', '#ffbdf6', '#c9b6f0', '#efe6d6']

// ── card geometry (body box inside the glow padding of each PNG)
export const G = {
  mystery: { src: 'card-profile-3.png', iw: 1496, ih: 2237, b: [120, 114, 1374, 2115], r: 0.067 },
  founder: { src: 'card-founder-juniper.png', iw: 2992, ih: 4466, b: [240, 218, 2748, 4223], r: 0.075 },
  talk1: { src: 'card-talk-1.png', iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 },
  talk2: { src: 'card-talk-2.png', iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 },
  talk3: { src: 'card-talk-3.png', iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 },
  talk4: { src: 'card-talk-4.png', iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 },
  daily: { src: 'card-talk-daily.png', iw: 1178, ih: 1891, b: [96, 96, 1082, 1795], r: 0.06 },
}
export const bodyH = (g, w) => w * (g.b[3] - g.b[1]) / (g.b[2] - g.b[0])

/** one card face clipped to its body, `w` px wide; returns { face, glint } */
export function face(parent, g, w, style = {}) {
  const bw = g.b[2] - g.b[0], k = w / bw, h = bodyH(g, w), rad = g.r * w
  const f = el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', borderRadius: rad + 'px', overflow: 'hidden', ...style }, parent)
  const im = img(f, A + g.src, { left: -g.b[0] * k + 'px', top: -g.b[1] * k + 'px', width: g.iw * k + 'px', height: g.ih * k + 'px' })
  const glint = el('div', { position: 'absolute', top: '-30%', height: '160%', width: (w * 0.32) + 'px', left: 0, mixBlendMode: 'screen', opacity: 0,
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,246,232,0.10) 30%, rgba(255,250,240,0.55) 50%, rgba(255,246,232,0.10) 70%, rgba(255,255,255,0) 100%)' }, f)
  return { face: f, im, glint, w, h }
}
/** gold-foil band (the feature's S6 holo sweep) */
export function foil(parent) {
  return el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none',
    backgroundImage: 'linear-gradient(115deg, rgba(169,128,46,0) 40%, #a9802e 44%, #f2c75c 47%, #fff4cf 50%, #f2c75c 53%, #a9802e 56%, rgba(169,128,46,0) 60%)',
    backgroundSize: '300% 300%', backgroundRepeat: 'no-repeat' }, parent)
}
export function foilAt(f, p) {
  f.style.opacity = String(0.6 * clamp(Math.sin(Math.PI * clamp(p)) * 2.5))
  f.style.backgroundPosition = `${lerp(100, 0, ease.inOutQuad(clamp(p)))}% ${lerp(100, 0, ease.inOutQuad(clamp(p)))}%`
}
export const sweep = (gl, w, p) => { gl.style.opacity = p > 0 && p < 1 ? String(Math.sin(Math.PI * p)) : '0'; gl.style.transform = `translateX(${lerp(-w * 0.5, w * 1.2, p)}px) skewX(-18deg)` }

/** eyebrow + serif line (the feature's S7 caption), with an optional soft indigo pool behind it */
export function caption(parent, eyebrowText, line, layout, pool = 0, plate = false) {
  const box = el('div', { position: 'absolute', ...layout, opacity: 0, isolation: 'isolate' }, parent)
  if (plate) el('div', { position: 'absolute', left: -48 * U + 'px', right: -48 * U + 'px', top: -34 * U + 'px', bottom: -38 * U + 'px', zIndex: -1, borderRadius: 30 * U + 'px',
    background: 'rgb(18,10,44)', boxShadow: 'inset 0 0 0 1.5px rgba(196,182,228,0.28), 0 24px 60px rgba(4,2,14,0.55)' }, box)
  if (pool) el('div', { position: 'absolute', left: -150 * U + 'px', right: -150 * U + 'px', top: -110 * U + 'px', bottom: -110 * U + 'px', zIndex: -1,
    background: `radial-gradient(closest-side, ${[[0, 1], [30, 0.92], [55, 0.7], [78, 0.3], [100, 0]].map(([o, k]) => `rgba(11,6,32,${(pool * k).toFixed(3)}) ${o}%`).join(', ')})` }, box)
  el('div', { fontFamily: MONO, fontSize: (VERT ? 30 : 28) * U + 'px', letterSpacing: '0.24em', ...(layout.textAlign === 'center' ? { textIndent: '0.24em' } : {}), color: 'rgba(255,246,234,0.92)', textTransform: 'uppercase', marginBottom: 14 * U + 'px', textShadow: '0 0 16px rgba(8,4,24,0.85), 0 0 5px rgba(8,4,24,0.6)' }, box, eyebrowText)
  el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 86 : 80) * U + 'px', lineHeight: 1.05, color: '#fff6ea', textShadow: '0 0 26px rgba(8,4,24,0.75), 0 0 8px rgba(8,4,24,0.6), 0 2px 3px rgba(4,2,14,0.5)' }, box, line)
  return box
}
/** caption in/out: soft rise + de-blur in, drift + blur out */
export const capIn = (box, t, t0, t1, dx = 0) => {
  const i = ease.outCubic(prog(t, t0, t0 + 0.6)), o = ease.inQuad(prog(t, t1 - 0.35, t1))
  box.style.opacity = String(Math.min(i, 1 - o))
  box.style.transform = `translate(${lerp(dx, 0, i) - dx * 0.5 * o}px, ${lerp(dx ? 0 : 22, 0, i) - (dx ? 0 : 14) * o}px)`
  box.style.filter = i < 1 || o > 0 ? `blur(${lerp(6, 0, i) + 4 * o}px)` : 'none'
}

// ── pixel stars on the fx canvas (crisp squares, `px` screen px per art pixel)
const SPR = [
  ['X'], ['.X.', 'XWX', '.X.'], ['..X..', '..X..', 'XXWXX', '..X..', '..X..'],
  ['...X...', '...X...', '..XWX..', 'XXWWWXX', '..XWX..', '...X...', '...X...'],
].map((rows) => rows.map((r) => [...r]))
export function pstar(ctx, x, y, size, color, px = 6) {
  const s = SPR[Math.max(0, Math.min(SPR.length - 1, size))], o = (s.length - 1) / 2
  const cx = Math.round(x / px) * px, cy = Math.round(y / px) * px
  for (let r = 0; r < s.length; r++) for (let c = 0; c < s[r].length; c++) { const ch = s[r][c]; if (ch === '.') continue; ctx.fillStyle = ch === 'W' ? '#fff6ea' : color; ctx.fillRect(cx + (c - o) * px, cy + (r - o) * px, px, px) }
}
/** pixel twinkles popping around a box [x, y, w, h] during [t0, t1] (15 fps stepping) */
const inside = (x, y, a) => a && x > a[0] && x < a[0] + a[2] && y > a[1] && y < a[1] + a[3]
export function twinkles(ctx, t, t0, t1, box, seed, n = 14, px = VERT ? 6 : 5, avoid = null) {
  if (t < t0 || t > t1) return
  const r = rng(seed), f = Math.floor(t * 15)
  for (let i = 0; i < n; i++) {
    const x = box[0] + r() * box[2], y = box[1] + r() * box[3], c = SPARKS[Math.floor(r() * 5)], ph = Math.floor(r() * 6), at = t0 + r() * Math.max(0.1, t1 - t0 - 0.8)
    if (t < at || t > at + 1.3 || inside(x, y, avoid)) continue
    pstar(ctx, x, y, [0, 1, 2, 3, 2, 1][(f + ph) % 6], c, px)
  }
}
/** a ring burst of pixel stars from (x, y) at time t0 */
export function burst(ctx, t, t0, x, y, seed, n = 26, R = 260 * U, px = VERT ? 6 : 5, avoid = null) {
  const lt = t - t0
  if (lt < 0 || lt > 1.1) return
  const r = rng(seed), f = Math.floor(t * 15)
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, v = 0.45 + r() * 0.55, c = r() < 0.35 ? '#fff4cf' : CHAKRAS[i % 7], life = 0.7 + r() * 0.4
    if (lt > life || (lt > life * 0.7 && (f + i) % 2)) continue
    const d = R * v * ease.outCubic(clamp(lt / life))
    const bx = x + Math.cos(a) * d, by = y + Math.sin(a) * d * 0.9 + 40 * U * lt * lt
    if (inside(bx, by, avoid)) continue
    pstar(ctx, bx, by, lt < life * 0.4 ? 3 : lt < life * 0.75 ? 2 : 1, c, px)
  }
}

// ── pixel mound (feature S2 → S3): a hill of mosaic cells rising from the bottom; its colours are a mosaic of the next
//    scene's first frame (painted by `paint(ctx)` into a W×H canvas), it floods the frame and resolves 40 → 20 → 10px.
const grids = {}
let firstFrame = null
function grid(paint, size) {
  if (grids[size]) return grids[size]
  if (!firstFrame) { firstFrame = document.createElement('canvas'); firstFrame.width = W; firstFrame.height = H; paint(firstFrame.getContext('2d')) }
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size)
  const small = document.createElement('canvas'); small.width = cols; small.height = rows
  const sc = small.getContext('2d'); sc.imageSmoothingQuality = 'high'
  sc.drawImage(firstFrame, 0, 0, cols * size, rows * size, 0, 0, cols, rows)
  const data = sc.getImageData(0, 0, cols, rows).data
  const css = []
  for (let i = 0; i < cols * rows; i++) css.push(`rgb(${data[i * 4]},${data[i * 4 + 1]},${data[i * 4 + 2]})`)
  return (grids[size] = { cols, rows, css, small })
}
const STAR7 = ['...1...', '...1...', '..111..', '1112111', '..111..', '...1...', '...1...']
const STAR5 = ['..1..', '..1..', '11211', '..1..', '..1..']
const STAR3 = ['.1.', '121', '.1.']
function spr(ctx, sprite, x, y, px, color) {
  const n = sprite.length, o = Math.floor(n / 2) * px
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) { const v = sprite[r][c]; if (v === '.') continue; ctx.fillStyle = v === '2' ? '#fff6ea' : color; ctx.fillRect(Math.round(x) - o + c * px, Math.round(y) - o + r * px, px, px) }
}
export function fxMound(ctx, t, { start, dur, paint, seed = 5, size = 40 }) {
  const p = prog(t, start, start + dur)
  if (p <= 0 || p >= 1) return
  const g = grid(paint, size)
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size)
  const r = rng(seed)
  const jit = Array.from({ length: cols }, () => r())
  const lt = t - start
  const fi = Math.round(t * 30), endF = Math.round((start + dur) * 30)
  const hill = ease.inOutQuad(prog(lt, 0, 0.5))
  const flood = fi >= endF - 6 ? 1 : Math.pow(prog(lt, dur - 0.58, (endF - 6) / 30 - start), 2)
  if (flood >= 1) {
    const fine = fi >= endF - 2 ? 10 : fi >= endF - 4 ? 20 : size
    const gf = grid(paint, fine)
    ctx.save(); ctx.imageSmoothingEnabled = false
    ctx.drawImage(gf.small, 0, 0, gf.cols * fine, gf.rows * fine)
    ctx.restore()
    return
  }
  const width = lerp(1.5, 6.5, hill) + 24 * flood
  const height = lerp(1, 7.5, hill) + rows * 1.4 * flood
  const edge = []
  for (let cx = 0; cx < cols; cx++) {
    const dx = (cx + 0.5 - cols / 2) / width
    const env = Math.exp(-dx * dx)
    const h = Math.floor(height * env + (env > 0.08 ? jit[cx] * 1.2 * (1 - flood) : 0))
    for (let k = 0; k < Math.min(h, rows); k++) {
      const cy = rows - 1 - k
      ctx.fillStyle = g.css[cy * g.cols + cx]
      ctx.fillRect(cx * size, cy * size, size + 0.5, size + 0.5)
    }
    if (h > 0) edge.push([cx, rows - Math.min(h, rows)])
  }
  const tw2 = fi >> 1
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (const [cx, cy] of edge) {
    for (let j = 0; j < 2; j++) {
      const rs = rng(cx * 977 + j * 131 + seed * 7)
      if (rs() > 0.62) continue
      const phase = Math.floor(rs() * 6), st = (tw2 + phase) % 6
      if (st >= 5) continue
      const rise = ((tw2 + phase) % 12) * 3 + rs() * 30
      const x = cx * size + Math.floor(rs() * size), y = cy * size - 6 - rise - Math.floor(rs() * size * 0.8)
      const big = rs()
      const sprite = st === 2 ? (big > 0.55 ? STAR7 : STAR5) : st === 1 || st === 3 ? (big > 0.55 ? STAR5 : STAR3) : STAR3
      spr(ctx, sprite, x, y, big > 0.75 ? 8 : big > 0.4 ? 6 : 5, PIXEL_PALETTE[Math.floor(rng(cx * 37 + j * 53 + tw2 * 7 + seed)() * PIXEL_PALETTE.length)])
    }
  }
  ctx.restore()
}

// ── the Align mark: seed-of-life rings + chakra column (shared drawing with the feature's end card)
const R0 = 20
const PET = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R0, Math.sin(a) * R0] })]
export const MARK_CIRCLES = [...PET.map(([x, y]) => ({ x, y, r: R0 })), { x: 0, y: 0, r: 40 }]
