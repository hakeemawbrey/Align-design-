// srflipit props — small pixel drawings on canvas, kept inside this film's folder (Star Talk prop kit).
//   drawPixels(ctx, bm, x, y, cell, pal, { rot, ax, ay, outline, alpha })   bitmap painter (rows of chars, '.' = empty)
//   glowAt(ctx, x, y, r, col, a)                       soft additive glow
//   burst(ctx, t, x, y, t0, opts)                      pixel-star sparkle burst (t0 … t0 + dur)
//   drawPhone(ctx, x, y, w, h, { rot, sc, screen })    a chunky pixel phone; screen(ctx, w, h) paints the screen (origin = screen centre)
//   drawFace(ctx, x, y, w, seed, { gray })             a pixel portrait "profile photo" (generic people, never real ones)
//   drawCardImg(ctx, im, x, y, w, { rot, flip, alpha, body })   a card image, flip = 0…1 turn about the vertical axis (1 = edge-on)
//   drawTears(ctx, x, y, cell, t, k, dir, seed)        happy-tear fountain (Pisces)
// Pure functions of their arguments; no document access at module top level.
import { clamp } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BM = s => s.trim().split(/\s+/)
const TAU = Math.PI * 2

export function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

export function drawPixels(ctx, bm, x, y, cell, pal, { rot = 0, ax = 0.5, ay = 0.5, outline = null, alpha = 1, sc = 1 } = {}) {
  if (alpha <= 0 || sc <= 0) return
  const w = bm[0].length, h = bm.length
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(x, y); if (rot) ctx.rotate(rot); if (sc !== 1) ctx.scale(sc, sc)
  const ox = -w * cell * ax, oy = -h * cell * ay
  const c = Math.ceil(cell) + 0.5
  if (outline) {
    ctx.fillStyle = outline
    bm.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch === '.') return
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const r2 = bm[j + b], ch2 = r2 ? r2[i + a] : undefined
        if (!ch2 || ch2 === '.') ctx.fillRect(ox + (i + a) * cell, oy + (j + b) * cell, c, c)
      }
    }))
  }
  bm.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.' || !pal[ch]) return
    ctx.fillStyle = pal[ch]; ctx.fillRect(ox + i * cell, oy + j * cell, c, c)
  }))
  ctx.restore()
}

export function glowAt(ctx, x, y, r, col, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, hexA(col, 0.55 * a)); g.addColorStop(0.45, hexA(col, 0.18 * a)); g.addColorStop(1, hexA(col, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore()
}

export function burst(ctx, t, x, y, t0, { n = 10, R = 120, size = 24, seed = 1, dur = 0.6, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const p = 1 - (1 - tt / dur) ** 3
  ctx.save(); ctx.globalAlpha = 1 - (tt / dur) ** 2
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + seed
    drawPixelStar(ctx, x + Math.cos(a) * R * (0.5 + 0.7 * p), y + Math.sin(a) * R * (0.5 + 0.7 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  ctx.restore()
}

/** a chunky pixel phone, centred on (x, y): dark body, bone bezel, a notch; screen(ctx, sw, sh) paints the screen with the
 *  origin at the screen centre (clipped). */
export function drawPhone(ctx, x, y, w, h, { rot = 0, sc = 1, screen = null, body = '#1a1430', rim = '#efe6d6', alpha = 1 } = {}) {
  if (sc <= 0 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc)
  const P = 8, r = 6 * P
  const rr = (o, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(-w / 2 - o, -h / 2 - o, w + 2 * o, h + 2 * o, r + o); ctx.fill() }
  ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 40; rr(P, '#0b0818'); ctx.shadowBlur = 0
  rr(0, rim); rr(-P, body)
  const sw = w - 4 * P, sh = h - 10 * P
  ctx.save(); ctx.beginPath(); ctx.roundRect(-sw / 2, -sh / 2 + P, sw, sh, 2 * P); ctx.clip()
  ctx.fillStyle = '#0d0a1c'; ctx.fillRect(-sw / 2, -sh / 2 + P, sw, sh)
  if (screen) { ctx.translate(0, P); screen(ctx, sw, sh) }
  ctx.restore()
  ctx.fillStyle = '#0b0818'; ctx.fillRect(-5 * P, -h / 2 + P * 1.6, 10 * P, P * 1.6)
  ctx.fillStyle = rim; ctx.globalAlpha *= 0.5; ctx.fillRect(-6 * P, h / 2 - P * 2.6, 12 * P, P)
  ctx.restore()
}

// ── generic pixel portraits (16 × 20 cells): background, hair style, skin tone, tiny smile. Never real people.
const SKINS = ['#f3c9a6', '#d9a07a', '#b57a52', '#8a5636', '#5e3a24', '#f0d2b8']
const HAIRS = ['#2a1a12', '#5a3418', '#e2b25a', '#1a1a1f', '#a2462a', '#7a5a8a']
const BGS = ['#ff8fb1', '#8fd8f6', '#ffd98a', '#c9a6ff', '#7fe0b8', '#f29a4a']
const STYLES = ['short', 'long', 'bun', 'curly', 'side', 'buzz']
export function faceLook(seed) {
  const s = Math.abs(seed | 0)
  return { skin: SKINS[s % 6], hair: HAIRS[(s * 5 + 1) % 6], bg: BGS[(s * 7 + 2) % 6], style: STYLES[(s * 11 + 3) % 6] }
}
function inHair(style, i, j) {
  const cx = 7.5, dx = Math.abs(i - cx)
  switch (style) {
    case 'short': return (j >= 3 && j <= 5 && dx <= 4.6) || (j === 6 && dx >= 3.2 && dx <= 4.6)
    case 'buzz': return j >= 4 && j <= 5 && dx <= 4.1
    case 'long': return (j >= 3 && j <= 5 && dx <= 4.8) || (j >= 6 && j <= 14 && dx >= 3.5 && dx <= 5.6)
    case 'bun': return (j >= 1 && j <= 2 && dx <= 1.6) || (j >= 3 && j <= 5 && dx <= 4.6) || (j === 6 && dx >= 3.6 && dx <= 4.6)
    case 'curly': return (j >= 2 && j <= 6 && dx <= 5.4 && !(j === 6 && dx < 3)) || (j >= 7 && j <= 9 && dx >= 4 && dx <= 5.6 && (i + j) % 2 === 0)
    case 'side': return (j >= 3 && j <= 5 && dx <= 4.8) || (j >= 6 && j <= 8 && i <= 4 && i >= 2)
    default: return false
  }
}
/** a pixel portrait w px wide (aspect 16:20), centred on (x, y). gray = 0…1 drains the colour (the "old way"). */
export function drawFace(ctx, x, y, w, seed, { gray = 0, alpha = 1, blur = 0 } = {}) {
  if (alpha <= 0) return
  const L = faceLook(seed), G = 16, H = 20, c = w / G
  const mix = col => {
    if (gray <= 0) return col
    const n = parseInt(col.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255, l = 0.3 * r + 0.59 * g + 0.11 * b
    const f = v => Math.round(v + (l * 0.9 - v) * gray)
    return `rgb(${f(r)},${f(g)},${f(b)})`
  }
  ctx.save(); ctx.globalAlpha *= alpha
  if (blur) ctx.filter = `blur(${blur}px)`
  ctx.translate(x - w / 2, y - (H * c) / 2)
  ctx.fillStyle = mix(L.bg); ctx.fillRect(0, 0, w, H * c)
  const px = (i, j, col) => { ctx.fillStyle = col; ctx.fillRect(i * c, j * c, Math.ceil(c) + 0.5, Math.ceil(c) + 0.5) }
  const skin = mix(L.skin), hair = mix(L.hair), shirt = mix(BGS[(seed * 3 + 4) % 6])
  for (let j = 0; j < H; j++) for (let i = 0; i < G; i++) {
    const dx = Math.abs(i + 0.5 - 8), head = j >= 4 && j <= 12 && dx <= (j <= 5 ? 3.6 : j >= 11 ? 2.8 : 4.0)
    const neck = j >= 13 && j <= 14 && dx <= 1.6
    const body = j >= 15 && dx <= (j === 15 ? 5 : 6.5)
    if (body) px(i, j, shirt)
    if (head || neck) px(i, j, skin)
    if (inHair(L.style, i, j)) px(i, j, hair)
  }
  const ink = mix('#1b1236')
  px(6, 8, ink); px(9, 8, ink)
  px(6, 11, ink); px(7, 11, ink); px(8, 11, ink); px(9, 11, ink); px(5, 10, ink); px(10, 10, ink)
  ctx.restore()
}

/** a card image (pre-baked canvas) centred on (x, y), w px wide (the png's full width incl. its soft glow). flip 0…1:
 *  0 = flat, 1 = edge-on (scaleX = cos(flip·90°)). */
export function drawCardImg(ctx, im, x, y, w, { rot = 0, flip = 0, alpha = 1, sc = 1 } = {}) {
  if (!im || alpha <= 0 || sc <= 0) return
  const h = w * im.height / im.width
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  ctx.scale(sc * Math.max(0.001, Math.cos(clamp(flip) * Math.PI / 2)), sc)
  ctx.drawImage(im, -w / 2, -h / 2, w, h)
  ctx.restore()
}

// happy tears: little pixel drops arcing outward from an eye corner and falling
export function drawTears(ctx, x, y, cell0, t, k = 1, dir = 1, seed = 0) {
  if (k <= 0) return
  const cell = cell0 * 1.8
  const n = Math.round(3 + 4 * Math.min(2, k))
  const period = 0.9 / Math.max(0.6, k)
  ctx.save()
  for (let i = 0; i < n; i++) {
    const ph = ((t / period) + i / n + seed * 0.13) % 1
    const vx = dir * cell * (3 + 6 * k) * (0.7 + 0.3 * ((i * 7) % 3) / 2)
    const vy = -cell * (2 + 5 * k)
    const g = cell * 34
    const px = x + vx * ph * 1.6, py = y + vy * ph * 1.6 + g * (ph * 1.6) ** 2 * 0.5
    const a = ph < 0.1 ? ph / 0.1 : 1 - Math.max(0, (ph - 0.7) / 0.3)
    ctx.globalAlpha = clamp(a)
    const c = Math.max(4, Math.round(cell * 0.8))
    ctx.fillStyle = '#8fd8ff'; ctx.fillRect(px, py, c, c * 1.6); ctx.fillRect(px - c * 0.5, py + c * 0.6, c * 2, c)
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px, py + c * 0.5, c * 0.5, c * 0.5)
  }
  ctx.restore()
}
