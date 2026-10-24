// Disposable part b · shared kit (adapted from ghosted half b): the sky (H1 = H2 exactly: zoom 1, no camera move), ambient pixel twinkles,
// card art (mip chains) and a card renderer that centres the card BODY and can turn it in 3D (back ↔ face).
import { clamp, lerp, prog, ease, rng, noise1, C } from '../../../../src/lib.js'
import { W, H, A } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, grainOpacity, getSky, layerCanvas } from '../../../sky.js'
export { drawGrain, grainOpacity, getSky, layerCanvas }

// ── H1/H2: the one moon. The sky never moves in part b, so both handoffs match exactly.
export const MOON = { x: 1716, y: 122, r: 52, phase: 0.12, alpha: 1 }

/** the sky: exactly the H1/H2 plate (zoom 1, dx 0, dy 0); only dim changes, and it is 1 at both ends */
export function sky(bx, t, dim = 1) {
  drawSky(bx, t, { zoom: 1, dx: 0, dy: 0, dim, moon: MOON })
}

// ── ambient pixel twinkles, kept to the frame edges (clear of cards, copy and the moon). In from 20.8, gone by 39.4.
const PIXC = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ff8fb1', '#c9a6ff', '#ffd98a']
const STAR_SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x, y, ch === 'C'])).filter(Boolean))
export function pixStar(ctx, cx, cy, px, kind, color, centre, a) {
  ctx.globalAlpha = a
  const x0 = Math.round(cx - px * 3.5), y0 = Math.round(cy - px * 3.5)
  for (const [x, y, c] of STAR_SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
  ctx.globalAlpha = 1
}
const pr = rng(7071)
const PIX = []
while (PIX.length < 16) {
  const x = 60 + pr() * (W - 120), y = 50 + pr() * (H - 100)
  if (x > 200 && x < 1760 && y > 100 && y < 1000) continue
  if (x > 1560 && y < 300) continue
  PIX.push({ x, y, px: pr() < 0.3 ? 4 : 3, col: PIXC[Math.floor(pr() * PIXC.length)], ph: pr() * 6.28, sp: 1.6 + pr() * 2.4, kind: Math.floor(pr() * 4), t0: 20.8 + pr() * 1.6 })
}
export function twinkles(bx, t) {
  bx.imageSmoothingEnabled = false
    PIX.forEach((s, i) => {
    const a = ease.inOutQuad(prog(t, s.t0, s.t0 + 1.2)) * (1 - ease.inOutQuad(prog(t, 38.6, 39.4))) * (0.4 + 0.35 * Math.sin(t * s.sp * 0.6 + s.ph))
    if (a <= 0.02) return
    pixStar(bx, s.x, s.y, s.px, s.kind, s.col, '#fff3e0', a)
  })
  bx.imageSmoothingEnabled = true
}

// ── card art: PNG size + opaque body box [l, t, r, b] + body corner radius (PNG px)
const PROF = { iw: 1496, ih: 2238, b: [120, 114, 1374, 2116], r: 84 }
export const ART = {
  back: { src: 'card-back.png', iw: 1528, ih: 2347, b: [120, 119, 1440, 2227], r: 90, big: 1100 },
  p1: { src: 'card-profile-1.png', ...PROF }, p2: { src: 'card-profile-2.png', ...PROF },
  p3: { src: 'card-profile-3.png', ...PROF, big: 1200 }, p4: { src: 'card-profile-4.png', ...PROF },
  p6: { src: 'card-profile-6.png', ...PROF },
  sign: { src: 'card-sign.png', iw: 848, ih: 1152, b: [121, 121, 727, 1031], r: 45, big: 848 },
}
export const bodyH = k => ART[k].b[3] - ART[k].b[1]
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }

const BMP = {}
let loading = null
export function loadArt() {
  if (loading) return loading
  loading = Promise.all(Object.entries(ART).map(([k, a]) => new Promise(res => {
    const im = new Image(); im.decoding = 'sync'
    im.onload = () => {
      const mips = []
      let w = a.big || 640, src = null
      while (w >= 60) {
        const h = Math.round(w * a.ih / a.iw), c = canvas(w, h), x = c.getContext('2d')
        x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'
        x.drawImage(src || im, 0, 0, w, h)
        mips.push(c); src = c; w = Math.round(w / 2)
      }
      BMP[k] = { mips, a }; res()
    }
    im.onerror = res
    im.src = A + a.src
  })))
  return loading
}
const pick = (B, screenW) => { let c = B.mips[0]; for (const m of B.mips) if (m.width >= screenW * 1.4) c = m; return c }

/** the card's PNG→screen transform for a FLAT pose (body centre x,y; body height h; roll rz deg).
 *  Call inside save()/restore(); afterwards 1 unit = 1 PNG px with the origin at the BODY centre. */
export function cardSpace(ctx, key, x, y, h, rz = 0) {
  const a = ART[key], s = h / bodyH(key)
  ctx.translate(x, y); ctx.rotate(rz * Math.PI / 180); ctx.scale(s, s)
  return s
}

/**
 * Draw a card with its BODY centred at (x, y), body height h. ry (deg) turns it about its vertical axis with true
 * perspective taper; past 90° the other side shows (`back` art, if given). rz rolls it. glow = additive rim light.
 */
export function drawCard(ctx, key, x, y, h, { ry = 0, rz = 0, alpha = 1, glow = 0, shadow = 1, back = null, rim = '255,236,205' } = {}) {
  let r = ((ry % 360) + 360) % 360; if (r > 180) r -= 360
  let k = key
  if (Math.abs(r) > 90) { if (!back) return; k = back; r = r > 0 ? r - 180 : r + 180 }
  const B = BMP[k]; if (!B || alpha <= 0.003 || h < 2) return
  const a = B.a, s = h / bodyH(k)
  const bcx = (a.b[0] + a.b[2]) / 2, bcy = (a.b[1] + a.b[3]) / 2
  const c = pick(B, a.iw * s), q = c.width / a.iw
  const ryr = r * Math.PI / 180, rzr = rz * Math.PI / 180, P = 1800
  const flat = Math.abs(r) < 0.05
  ctx.save()
  ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'
  if (flat) {
    ctx.translate(x, y); ctx.rotate(rzr); ctx.scale(s, s)
    ctx.globalAlpha = alpha
    if (shadow > 0) { ctx.shadowColor = `rgba(4,2,14,${0.7 * shadow * alpha})`; ctx.shadowBlur = 26; ctx.shadowOffsetY = 12 }
    ctx.drawImage(c, -bcx, -bcy, a.iw, a.ih)
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0
    if (glow > 0.01) {
      ctx.globalCompositeOperation = 'lighter'
      ctx.globalAlpha = alpha * glow * 0.22; ctx.drawImage(c, -bcx, -bcy, a.iw, a.ih)
      const [l, t0, rr, b] = a.b
      ctx.globalAlpha = alpha * glow
      ctx.shadowColor = `rgba(${rim},0.95)`; ctx.shadowBlur = 20
      ctx.strokeStyle = `rgba(${rim},0.95)`; ctx.lineWidth = 3 / s
      ctx.beginPath(); ctx.roundRect(l - bcx + 8, t0 - bcy + 8, rr - l - 16, b - t0 - 16, a.r); ctx.stroke()
      ctx.shadowBlur = 0; ctx.shadowColor = 'transparent'
    }
  } else {
    // perspective: thin vertical strips, each an affine map of its projected corners
    const proj = (u, v) => {
      const X = (u * Math.cos(rzr) - v * Math.sin(rzr)) * s, Y = (u * Math.sin(rzr) + v * Math.cos(rzr)) * s
      const xr = X * Math.cos(ryr), zr = -X * Math.sin(ryr), f = P / (P - zr)
      return [x + xr * f, y + Y * f]
    }
    const NS = 32, sw = a.iw / NS
    const pass = al => {
      ctx.globalAlpha = al
      for (let i = 0; i < NS; i++) {
        const u0 = -bcx + i * sw, v0 = -bcy
        const p00 = proj(u0, v0), p10 = proj(u0 + sw, v0), p01 = proj(u0, v0 + a.ih)
        ctx.setTransform((p10[0] - p00[0]) / (sw * q), (p10[1] - p00[1]) / (sw * q), (p01[0] - p00[0]) / (a.ih * q), (p01[1] - p00[1]) / (a.ih * q), p00[0], p00[1])
        ctx.drawImage(c, i * sw * q, 0, sw * q + 0.6, a.ih * q, 0, 0, sw * q + 0.6, a.ih * q)
      }
    }
    pass(alpha)
    if (glow > 0.01) { ctx.globalCompositeOperation = 'lighter'; pass(alpha * glow * 0.3) }
  }
  ctx.restore()
}

/** a gold glint band sweeping across a flat card's body (k: 0→1 travel), optionally limited to a PNG-y band */
export function glint(ctx, key, x, y, h, rz, k, { alpha = 1, y0 = null, y1 = null, width = 0.12 } = {}) {
  if (k <= 0 || k >= 1 || alpha <= 0.01) return
  const a = ART[key], bcx = (a.b[0] + a.b[2]) / 2, bcy = (a.b[1] + a.b[3]) / 2
  const [l, t0, r, b] = a.b
  ctx.save()
  cardSpace(ctx, key, x, y, h, rz)
  const top = (y0 ?? t0) - bcy, bot = (y1 ?? b) - bcy
  ctx.beginPath(); ctx.roundRect(l - bcx + 6, top, r - l - 12, bot - top, y0 == null ? a.r : 20); ctx.clip()
  const bw = r - l, sx = l - bcx - bw * 0.4 + k * bw * 1.8
  const g = ctx.createLinearGradient(sx - bw * width, top, sx + bw * width, bot)
  g.addColorStop(0, 'rgba(255,226,160,0)'); g.addColorStop(0.5, `rgba(255,226,160,${0.5 * alpha})`); g.addColorStop(1, 'rgba(255,226,160,0)')
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = g; ctx.fillRect(l - bcx, top, r - l, bot - top)
  ctx.restore()
}

/** a soft dark pocket behind copy so bone type holds on any sky */
export function pocketCanvas(cx, cy, rx, ry, a = 0.62) {
  const c = canvas(W, H), x = c.getContext('2d')
  x.save(); x.translate(cx, cy); x.scale(1, ry / rx)
  const g = x.createRadialGradient(0, 0, 0, 0, 0, rx)
  g.addColorStop(0, `rgba(11,6,32,${a})`); g.addColorStop(0.6, `rgba(11,6,32,${a * 0.6})`); g.addColorStop(1, 'rgba(11,6,32,0)')
  x.fillStyle = g; x.fillRect(-rx, -rx, 2 * rx, 2 * rx); x.restore()
  return c
}
export { clamp, lerp, prog, ease, rng, noise1, C }
