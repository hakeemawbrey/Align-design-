// winter — MOONLIGHT LANE, Season 2 ("Winter on the Lane") add-ons. Built with nml2e01 (Ep 1); every S2 episode
// imports it read-only ('../../nml2e01/scenes/winter.js'), next to the show kit ('../../mlpilot/scenes/mlkit.js').
// Everything is a pure function of t; nothing touches `document` at module load.
//
//   snowfall(ctx, t, { n, alpha, wind, speed, seed, size, clip: [x, y, w, h], from })  falling pixel snow (screen space).
//        from: the time the snow starts (flakes appear from the top, so the first snow really "starts").
//   laneSnow(ctx, t, { depth })   snow on the lane's roofs, sills, awning, lamps, stall canopy, bench, railing and
//        pavement + curb drifts. Call it FIRST inside drawLane's fg callback (world coordinates). depth 0…1.
//   windowSnow(ctx, t, rect, { depth, n })   snow falling past a window + a drift on its sill (interiors: APT.window,
//        CAFE.window). Call after drawApartment / drawCafe.
//   worn(ctx, sign, x, y, size, t, opts, wear)   drawSign + winter wear: wear = { hat: colour, scarf: colour,
//        scarfK: 0…1 (wrap progress), lumpy: true (the hand-knit one), mittens? no }. Same opts as drawSign.
//   actor(ctx, t, spec)   a keyframed star: { sign, size, x: [[t, v]…] | v, y: feet-y keys | v, moods: [[t, mood,
//        look?, blush?]…], hops: [t…], walk: true (auto step hops while x moves), wear, ...drawSign opts }
//   key(t, keys, easeFn)   keyframe interpolation ([[t, v]…], eased between keys).
//   drawMarket(ctx, x, y, t, opts)   a holiday-market stall (canopy, garland lights, counter). opts: { w, col: [a, b],
//        lights 0…1, sag 0…1 (snow weighs the canopy), goods: 'lanterns' | 'cookies' | 'ornaments' | 'cocoa', tangle 0…1 }
//   drawSnowStar(ctx, x, y, s, t, { points 0…5, lit 0…1, lean })   the lane's snow-star (a five-point snowman).
//   drawLantern(ctx, x, y, c, t, { lit, col, rot })   a little star lantern (c = pixel cell).
//   drawMug(ctx, x, y, c, t, { col, steam })   a cocoa mug.
//   drawTalkCard(ctx, cx, cy, w, t, { q, back, rot, alpha, scaleX, glow })   a talk card from tonight's deck.
//   drawScarfProp(ctx, x, y, c, t, { col, kind: 'hook' | 'folded' | 'pillow' | 'box', lumpy })
//   drawBlanket(ctx, x, y, w, h, t, { col })   a knit blanket (draw over seated stars' lower half).
//   drawSnowbank(ctx, x, y, w, h)   a heap of snow (screen or world).
//   W_BLUE, W_SNOW … palette.

import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawSign, starFrame, inSprite, standY, LANE, INK, ML_GOLD, BONE, PINK, CAFE } from '../../mlpilot/scenes/mlkit.js'

export const W_SNOW = '#f4f7ff', W_SHADE = '#c3cdf0', W_DEEP = '#9aa8dc', W_BLUE = '#5aa8ff', W_ICE = '#dff0ff'
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }

// ── keyframes
export function key(t, keys, fn = ease.inOutCubic) {
  if (!Array.isArray(keys)) return keys
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i]
    if (t < t1) { const [t0, v0] = keys[i - 1]; return lerp(v0, v1, fn(prog(t, t0, t1))) }
  }
  return keys[keys.length - 1][1]
}
const moving = (t, keys) => {
  if (!Array.isArray(keys)) return null
  for (let i = 1; i < keys.length; i++) if (t >= keys[i - 1][0] && t < keys[i][0] && keys[i][1] !== keys[i - 1][1]) return [keys[i - 1][0], keys[i][0]]
  return null
}
export function walkHops(keys, step = 0.36) {
  const out = []
  if (!Array.isArray(keys)) return out
  for (let i = 1; i < keys.length; i++) if (keys[i][1] !== keys[i - 1][1]) for (let s = keys[i - 1][0]; s < keys[i][0] - 0.1; s += step) out.push(+s.toFixed(3))
  return out
}

// ── falling snow (screen space)
export function snowfall(ctx, t, { n = 160, alpha = 1, wind = 0.35, speed = 1, seed = 3, size = 1.3, clip = null, from = -99, H = 1920, W = 1080 } = {}) {
  if (alpha <= 0.01) return
  const r = rng(seed)
  ctx.save()
  if (clip) { ctx.beginPath(); ctx.rect(clip[0], clip[1], clip[2], clip[3]); ctx.clip() }
  const ox = clip ? clip[0] : 0, oy = clip ? clip[1] : 0, w = clip ? clip[2] : W, h = clip ? clip[3] : H
  for (let i = 0; i < n; i++) {
    const depth = r(), x0 = r() * (w + 200) - 100, y0 = r() * (h + 40), ph = r() * 6.28
    const v = (60 + 120 * depth) * speed, sz = Math.max(2, Math.round((3 + 6 * depth) * size))
    const age = t - from
    if (age < 0) continue
    // before the snow has had time to reach a flake's spot, it isn't there yet (the first snow starts at the top)
    const travel = age * v
    let y = (y0 + t * v) % (h + 40) - 20
    if (travel < h + 40 && y > travel - 20) continue
    const x = x0 + Math.sin(t * (0.8 + depth) + ph) * 26 * (0.5 + depth) + wind * (y + 20) * 0.35
    const xx = ((x % (w + 200)) + w + 200) % (w + 200) - 100
    ctx.globalAlpha = alpha * (0.45 + 0.55 * depth)
    R(ctx, ox + xx, oy + y, sz, sz, depth > 0.7 ? '#ffffff' : W_ICE)
  }
  ctx.restore()
}

// a lumpy snow ledge along [x0, x1] whose top sits on y (world/screen units), depth d (px)
function ledge(ctx, x0, x1, y, d, seed = 1) {
  if (d < 1) return
  const r = rng(seed)
  R(ctx, x0, y - d, x1 - x0, d + 2, W_SNOW)
  for (let x = x0; x < x1; x += 22) { const hb = d * (0.3 + 0.5 * r()); R(ctx, x, y - d - hb, 22 + r() * 10, hb + 2, W_SNOW) }
  R(ctx, x0, y - 3, x1 - x0, 4, W_SHADE)
  // drips/icicles at the lip
  for (let x = x0 + 8; x < x1 - 8; x += 34 + r() * 30) { const l = 4 + r() * d * 0.8; R(ctx, x, y, 5, l, W_ICE); R(ctx, x + 1, y + l, 3, 4, '#ffffff') }
}
export function drawSnowbank(ctx, x, y, w, h, seed = 4) {
  const r = rng(seed)
  const bumps = Array.from({ length: 7 }, () => { const bw = w * (0.22 + r() * 0.2); return [x + r() * (w - bw), bw, h * (0.35 + r() * 0.65)] })
  R(ctx, x - 5, y - h * 0.6 - 5, w + 10, h * 0.6 + 5, W_DEEP)
  for (const [bx, bw, bh] of bumps) R(ctx, bx - 5, y - bh - 5, bw + 10, bh + 5, W_DEEP)
  R(ctx, x, y - h * 0.6, w, h * 0.6, W_SNOW)
  for (const [bx, bw, bh] of bumps) { R(ctx, bx, y - bh, bw, bh, W_SNOW); R(ctx, bx + bw * 0.6, y - bh + 6, bw * 0.4 - 4, bh - 12, '#e4eafc') }
  R(ctx, x, y - 6, w, 6, W_SHADE)
  for (let i = 0; i < 5; i++) R(ctx, x + r() * w * 0.9, y - h * 0.4 * r() - 10, 14, 6, '#ffffff')
}

// snow on the lane set (world coordinates; call first in drawLane's fg)
export function laneSnow(ctx, t, { depth = 1 } = {}) {
  if (depth <= 0.01) return
  const d = k => k * depth
  // roofs / cornices (the trims sit at top − 6)
  ledge(ctx, -8, 513, 614, d(26), 1); ledge(ctx, 497, 1173, 734, d(24), 2); ledge(ctx, 1157, 1653, 894, d(22), 3); ledge(ctx, 1637, 2168, 634, d(26), 4)
  // window sills
  for (const w of LANE.windows) if (w.kind === 'pane') ledge(ctx, w.x - 12, w.x + w.w + 12, w.y + w.h + 6, d(10), w.x)
  // café awning + hanging sign, flower-stall canopy, roof railing, lamp tops, bench
  ledge(ctx, 526, 1134, 1072, d(14), 5); ledge(ctx, 1110, 1190, 1012, d(8), 6)
  ledge(ctx, 1706, 2056, 1130, d(16), 7); ledge(ctx, 1176, 1628, 856, d(10), 8)
  for (const lx of LANE.lamps) ledge(ctx, lx - 26, lx + 26, 1000, d(10), lx)
  ledge(ctx, LANE.bench.x - 116, LANE.bench.x + 116, 1384, d(9), 9); ledge(ctx, LANE.bench.x - 110, LANE.bench.x + 110, 1338, d(6), 10)
  ledge(ctx, 370, 480, 1320, d(8), 11)
  // pavement: a white blanket with footprints, then the curb drift
  // (light at the back so the cart, the bench and the stoop stay readable; deep along the front edge)
  ctx.save(); ctx.globalAlpha = 0.3 * depth
  R(ctx, 0, 1330, LANE.W, 112, '#dfe5fb')
  ctx.globalAlpha = 0.88 * depth
  R(ctx, 0, 1442, LANE.W, 44, '#e6ebfc')
  ctx.globalAlpha = 0.6 * depth
  const r = rng(12)
  for (let i = 0; i < 60; i++) { const fx = r() * LANE.W, fy = 1450 + r() * 26; R(ctx, fx, fy, 10, 6, W_DEEP); R(ctx, fx + 16, fy + 6, 10, 6, W_DEEP) }
  ctx.restore()
  ctx.save(); ctx.globalAlpha = depth
  const rr = rng(13)
  for (let x = -20; x < LANE.W; x += 40) { const h = 10 + rr() * 16; R(ctx, x, 1486 - h, 46, h + 6, W_SNOW) }
  R(ctx, 0, 1486, LANE.W, 6, W_SHADE)
  // the road: a light dusting + tyre-less lines (no traffic on the lane)
  ctx.globalAlpha = 0.35 * depth
  for (let y = 1530; y < 1920; y += 34) for (let x = (y / 34 % 2) * 30; x < LANE.W; x += 60) R(ctx, x + 6, y, 30, 6, '#e8eeff')
  ctx.restore()
}

export function windowSnow(ctx, t, [x, y, w, h], { depth = 1, n = 40, seed = 6, from } = {}) {
  snowfall(ctx, t, { n, clip: [x, y, w, h], size: 0.8, seed, from, alpha: 0.95 })
  ledge(ctx, x, x + w, y + h, 14 * depth, seed + 1)
}

// ── winter wear on a star sprite (36-cell grid; eyes ≈ row 20, mouth ≈ row 24, top point ≈ row 1)
const HAT = ['....KKK....', '...KWWWK...', '....KKK....', '...KHHHK...', '..KHhHhHK..', '.KHHhHhHHK.', '.KHhHhHhHK.', 'KCCCCCCCCCK', 'KCcCcCcCcCK', 'KKKKKKKKKKK']
export function worn(ctx, sign, x, y, size, t, opts = {}, wear = {}) {
  const r = drawSign(ctx, sign, x, y, size, t, opts)
  const { hat, scarf, scarfK = 1, lumpy = false } = wear
  if (!hat && !scarf) return r
  if ((opts.alpha ?? 1) <= 0 || (opts.pop ?? 1) <= 0) return r
  const F = starFrame(x, y, size, t, opts)
  ctx.save(); ctx.globalAlpha *= opts.alpha ?? 1
  inSprite(ctx, F, () => {
    if (scarf && scarfK > 0.01) {
      const dk = shade(scarf, -0.28), lt = shade(scarf, 0.22)
      const wk = clamp(scarfK)
      const x0 = 18 - 9.5 * wk, w = 19 * wk
      ctx.fillStyle = INK; ctx.fillRect(x0 - 0.6, 25.6, w + 1.2, 4.2)
      ctx.fillStyle = scarf; ctx.fillRect(x0, 26.2, w, 3)
      ctx.fillStyle = dk; for (let i = 0; i < w; i += 2) ctx.fillRect(x0 + i, 28.2, 1, 1)
      if (lumpy) { ctx.fillStyle = lt; for (let i = 0; i < w; i += 3) ctx.fillRect(x0 + i, 26.2 + (i % 2), 1, 1); ctx.fillStyle = ML_GOLD; ctx.fillRect(17, 26.6, 1.4, 1.4) }
      if (wk > 0.95) {   // the tail, swinging a little
        const sw = Math.sin(t * 2.4) * 0.6
        ctx.fillStyle = INK; ctx.fillRect(21.4 + sw, 28.4, 3.4, 6.6)
        ctx.fillStyle = scarf; ctx.fillRect(22 + sw, 29, 2.2, 5.4)
        ctx.fillStyle = dk; ctx.fillRect(22 + sw, 33.4, 2.2, 1)
        ctx.fillStyle = lt; ctx.fillRect(22 + sw, 34.2, 0.8, 1.2); ctx.fillRect(23.4 + sw, 34.2, 0.8, 1.2)
      }
    }
    if (hat) {
      const pal = { K: INK, W: '#ffffff', H: hat, h: shade(hat, -0.22), C: shade(hat, 0.25), c: shade(hat, 0.05) }
      HAT.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(12.5 + i, -2.5 + j, 1.02, 1.02) } } })
    }
  })
  ctx.restore()
  return r
}
function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255]
  const m = c.map(v => Math.round(clamp(k > 0 ? v + (255 - v) * k : v * (1 + k), 0, 255)))
  return '#' + m.map(v => v.toString(16).padStart(2, '0')).join('')
}

// ── a keyframed actor
export function actor(ctx, t, spec) {
  const { sign, size = 220, x, y, moods = [], hops = [], walk = true, wear = null, step = 0.36, draw = null, ...o } = spec
  if (spec.on && !(t >= spec.on[0] && t < spec.on[1])) return null
  const X = key(t, x, spec.xEase), feetY = key(t, y ?? LANE.feet, spec.yEase)
  let mood = o.mood, look = o.look, blush = o.blush
  for (const m of moods) if (t >= m[0]) { mood = m[1]; look = m[2]; blush = m[3] }
  const H = [...hops, ...(walk ? walkHops(x, step) : [])]
  const opts = { ...o, mood, look, blush, hops: H }
  delete opts.on; delete opts.xEase; delete opts.yEase
  const Y = standY(size, feetY)
  if (draw) return draw(ctx, X, Y, opts)
  return worn(ctx, sign, X, Y, size, t, opts, wear || {})
}

// ── props
export function drawLantern(ctx, x, y, c, t, { lit = 1, col = ML_GOLD, rot = 0, alpha = 1 } = {}) {
  const S = ['....K....', '...KYK...', 'KKKYYYKKK', 'KYYYYYYYK', '.KYYYYYK.', '..KYYYK..', '.KYYKYYK.', '.KYK.KYK.', '.KK...KK.']
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  ctx.fillStyle = INK; ctx.fillRect(-0.5 * c, -9 * c, c, 4.6 * c)
  const fillc = lit > 0.5 ? col : shade(col, -0.55)
  S.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const ch = row[i]; if (ch === '.') continue; ctx.fillStyle = ch === 'K' ? INK : fillc; ctx.fillRect((i - 4.5) * c, (j - 4.5) * c, c * 1.02, c * 1.02) } })
  if (lit > 0.01) {
    ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, c * 9); g.addColorStop(0, `rgba(255,210,120,${0.45 * lit})`); g.addColorStop(1, 'rgba(255,210,120,0)')
    ctx.fillStyle = g; ctx.fillRect(-c * 9, -c * 9, c * 18, c * 18)
    ctx.globalCompositeOperation = 'source-over'
  }
  ctx.restore()
}
export function drawMug(ctx, x, y, c, t, { col = '#e8566e', steam = 1, alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(x), Math.round(y))
  R(ctx, -4 * c, -6 * c, 8 * c, 7 * c, INK); R(ctx, -3 * c, -5 * c, 6 * c, 5 * c, col); R(ctx, -3 * c, -5 * c, 6 * c, c, '#7a4a3a')
  R(ctx, 4 * c, -4 * c, 2 * c, 3 * c, INK); R(ctx, 4 * c, -3.4 * c, 1.2 * c, 1.8 * c, col)
  R(ctx, -1.5 * c, -3.5 * c, 3 * c, 2 * c, '#ffffff')
  if (steam > 0) { ctx.globalAlpha = 0.45 * steam * alpha; for (let k = 0; k < 3; k++) R(ctx, (-2 + k * 2) * c + Math.sin(t * 3 + k) * c * 0.6, -8 * c - k * 2 * c - ((t * 14) % (2 * c)), c, 2 * c, '#ffffff') }
  ctx.restore()
}
export function drawSnowStar(ctx, x, y, s, t, { points = 5, lit = 0, lean = 0, alpha = 1 } = {}) {
  // a five-point star of packed snow standing on two points; built one point at a time (0 = a round lump)
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(lean)
  const cy = -s * 0.42, Ro = s * 0.5, Ri = s * 0.24
  const order = [3, 2, 4, 1, 0]                  // feet first, then the arms, then the top point
  const g = [0, 0, 0, 0, 0]; order.forEach((n, k) => { g[n] = clamp(points - k) })
  const path = (grow) => {
    ctx.beginPath()
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, n = i / 2
      const r = i % 2 ? Ri + grow : lerp(Ri * 1.05, Ro, ease.outBack(g[n] || 0)) + grow
      ctx.lineTo(Math.cos(a) * r, cy + Math.sin(a) * r)
    }
    ctx.closePath()
  }
  ctx.lineJoin = 'round'
  ctx.fillStyle = INK; path(8); ctx.fill()
  ctx.fillStyle = W_SNOW; path(0); ctx.fill()
  ctx.save(); path(0); ctx.clip(); ctx.fillStyle = W_SHADE; ctx.fillRect(-Ro, cy + Ri * 0.5, Ro * 2, Ro); ctx.restore()
  // pebble eyes + a smile
  R(ctx, -s * 0.1, cy - s * 0.05, s * 0.05, s * 0.07, INK); R(ctx, s * 0.05, cy - s * 0.05, s * 0.05, s * 0.07, INK)
  R(ctx, -s * 0.05, cy + s * 0.06, s * 0.1, s * 0.025, INK); R(ctx, -s * 0.15, cy + s * 0.02, s * 0.04, s * 0.025, '#ffb3c8'); R(ctx, s * 0.11, cy + s * 0.02, s * 0.04, s * 0.025, '#ffb3c8')
  if (lit > 0.01) {
    const BC = ['#ffd36e', '#ff8fb1', '#7fe0ff', '#7dffb0']
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = (i % 2 ? Ri : Ro) * 0.82; ctx.globalAlpha = alpha * lit; R(ctx, Math.cos(a) * r - 5, cy + Math.sin(a) * r - 5, 10, 12, BC[i % 4]) }
    ctx.globalCompositeOperation = 'lighter'
    const gr = ctx.createRadialGradient(0, cy, 0, 0, cy, s * 1.1); gr.addColorStop(0, `rgba(255,220,140,${0.35 * lit})`); gr.addColorStop(1, 'rgba(255,220,140,0)')
    ctx.fillStyle = gr; ctx.fillRect(-s * 1.1, cy - s * 1.1, s * 2.2, s * 2.2)
    ctx.globalCompositeOperation = 'source-over'
  }
  ctx.restore()
}
const GOODS_COL = ['#ffd36e', '#ff8fb1', '#7fe0ff', '#7dffb0', '#c9a6ff']
export function drawMarket(ctx, x, y, t, { w = 420, col = ['#d8455f', '#f3e6d0'], lights = 1, sag = 0, goods = 'lanterns', tangle = 0, sign = null, snow = 1, alpha = 1 } = {}) {
  // (x, y) = the counter's bottom-centre on the ground
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(x - w / 2), Math.round(y))
  const top = -330, sg = sag * 46
  // posts
  R(ctx, 6, top, 12, -top, INK); R(ctx, w - 18, top, 12, -top, INK)
  // counter
  R(ctx, -6, -150, w + 12, 150, INK); R(ctx, 0, -144, w, 144, '#8a5a3a'); R(ctx, 0, -144, w, 14, '#a8744a')
  for (let i = 24; i < w; i += 46) R(ctx, i, -124, 6, 118, '#6a4028')
  // canopy (scalloped; sags in the middle with snow)
  const n = Math.round(w / 52)
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n, dip = Math.sin(Math.PI * u) * sg
    const cx = i * w / n
    R(ctx, cx - 2, top - 42 + dip, w / n + 4, 70, INK)
    R(ctx, cx, top - 40 + dip, w / n, 62, col[i % 2])
    R(ctx, cx + 6, top + 22 + dip, w / n - 12, 10, col[i % 2]); R(ctx, cx + 14, top + 32 + dip, w / n - 28, 6, col[i % 2])
  }
  if (snow > 0) for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, dip = Math.sin(Math.PI * u) * sg; R(ctx, i * w / n - 2, top - 52 + dip - sag * 18 * Math.sin(Math.PI * u), w / n + 4, 14 + sag * 18 * Math.sin(Math.PI * u), W_SNOW) }
  // garland lights along the canopy lip (tangled = a heap on the counter instead)
  const BC = ['#ffd36e', '#ff8fb1', '#7fe0ff', '#7dffb0', '#fff1c8']
  if (tangle < 0.5) {
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath()
    for (let i = 0; i <= 30; i++) { const u = i / 30; ctx.lineTo(u * w, top + 44 + Math.sin(Math.PI * u) * sg + Math.sin(u * Math.PI * n) * 10) }
    ctx.stroke()
    for (let i = 1; i < 14; i++) {
      const u = i / 14, bx = u * w, by = top + 50 + Math.sin(Math.PI * u) * sg + Math.sin(u * Math.PI * n) * 10
      R(ctx, bx - 5, by - 4, 10, 12, lights > 0.5 ? BC[i % 5] : '#4a4466')
      if (lights > 0.01) { ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(bx, by, 0, bx, by, 30); g.addColorStop(0, `rgba(255,220,150,${0.4 * lights * (0.8 + 0.2 * Math.sin(t * 3 + i))})`); g.addColorStop(1, 'rgba(255,220,150,0)'); ctx.fillStyle = g; ctx.fillRect(bx - 30, by - 30, 60, 60); ctx.globalCompositeOperation = 'source-over' }
    }
  } else {
    const r = rng(21)
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath()
    for (let i = 0; i < 26; i++) ctx.lineTo(w * 0.55 + Math.sin(i * 1.7) * 70 * r(), -150 - 20 - Math.cos(i * 2.3) * 30 * r())
    ctx.stroke()
    for (let i = 0; i < 12; i++) R(ctx, w * 0.55 + Math.sin(i * 2.1) * 60 - 5, -150 - 24 - Math.cos(i * 1.3) * 26, 10, 12, '#4a4466')
  }
  // goods on the counter
  if (goods === 'lanterns') for (let i = 0; i < 4; i++) drawLantern(ctx, 50 + i * (w - 100) / 3, -186 + Math.sin(t * 2 + i) * 3, 5, t, { lit: lights, col: GOODS_COL[i % 5] })
  if (goods === 'cookies') for (let i = 0; i < 6; i++) { const cx = 40 + i * (w - 80) / 5; R(ctx, cx - 18, -160, 36, 14, INK); R(ctx, cx - 15, -158, 30, 10, '#e0963a'); R(ctx, cx - 6, -156, 4, 4, '#5a2e1c'); R(ctx, cx + 4, -154, 4, 4, '#5a2e1c') }
  if (goods === 'ornaments') for (let i = 0; i < 6; i++) { const cx = 40 + i * (w - 80) / 5; R(ctx, cx - 12, -176, 24, 24, INK); R(ctx, cx - 10, -174, 20, 20, GOODS_COL[i % 5]); R(ctx, cx - 6, -170, 5, 5, '#ffffff'); R(ctx, cx - 3, -184, 6, 8, INK) }
  if (goods === 'cocoa') { R(ctx, w / 2 - 40, -250, 80, 100, INK); R(ctx, w / 2 - 34, -244, 68, 90, '#c0c8e0'); R(ctx, w / 2 - 6, -170, 12, 14, INK); for (let i = 0; i < 4; i++) drawMug(ctx, 40 + i * 50 + (i > 1 ? w - 260 : 0), -152, 4, t, { col: GOODS_COL[i % 5], steam: 0.8 }) }
  if (sign) { R(ctx, w / 2 - 110, top + 60 + sg * 0.6, 220, 54, INK); R(ctx, w / 2 - 104, top + 66 + sg * 0.6, 208, 42, '#fbf3e2'); ctx.fillStyle = INK; ctx.font = "700 24px 'Space Mono', monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(sign, w / 2, top + 88 + sg * 0.6) }
  ctx.restore()
}
export function drawTalkCard(ctx, cx, cy, w, t, { q = '', back = false, rot = 0, alpha = 1, scaleX = 1, glow = 0 } = {}) {
  if (alpha <= 0.01 || w <= 1) return
  const h = w * 1.4
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(scaleX, 1)
  if (glow > 0) { ctx.shadowColor = `rgba(255,207,110,${0.8 * glow})`; ctx.shadowBlur = 40 }
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  ctx.shadowBlur = 0
  if (back) {
    ctx.fillStyle = '#2a2f7a'; ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.strokeStyle = ML_GOLD; ctx.lineWidth = Math.max(2, w / 60); ctx.strokeRect(-w / 2 + w * 0.07, -h / 2 + w * 0.07, w * 0.86, h - w * 0.14)
    ctx.fillStyle = ML_GOLD; ctx.font = `800 ${Math.round(w * 0.11)}px Inter, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('TALK', 0, -w * 0.08); ctx.fillText('CARD', 0, w * 0.08)
  } else {
    ctx.fillStyle = '#fbf3e2'; ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.strokeStyle = ML_GOLD; ctx.lineWidth = Math.max(2, w / 70); ctx.strokeRect(-w / 2 + w * 0.05, -h / 2 + w * 0.05, w * 0.9, h - w * 0.1)
    ctx.fillStyle = '#b07a20'; ctx.font = `700 ${Math.round(w * 0.065)}px 'Space Mono', monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('TALK CARD', 0, -h / 2 + w * 0.15)
    ctx.fillStyle = INK; ctx.font = `italic 600 ${Math.round(w * 0.105)}px 'EB Garamond', Georgia, serif`
    const words = q.split(' '), lines = []; let cur = ''
    for (const wd of words) { const tryL = cur ? cur + ' ' + wd : wd; if (ctx.measureText(tryL).width > w * 0.78 && cur) { lines.push(cur); cur = wd } else cur = tryL }
    if (cur) lines.push(cur)
    const lh = w * 0.13
    lines.forEach((l, i) => ctx.fillText(l, 0, (i - (lines.length - 1) / 2) * lh + w * 0.04))
    ctx.fillStyle = PINK; ctx.fillRect(-w * 0.06, h / 2 - w * 0.17, w * 0.12, w * 0.04)
  }
  ctx.restore()
}
export function drawScarfProp(ctx, x, y, c, t, { col = W_BLUE, kind = 'folded', lumpy = false, alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(x), Math.round(y))
  const dk = shade(col, -0.28), lt = shade(col, 0.22)
  const band = (bx, by, bw, bh) => { R(ctx, bx - c * 0.6, by - c * 0.6, bw + c * 1.2, bh + c * 1.2, INK); R(ctx, bx, by, bw, bh, col); for (let i = 0; i < bw; i += 2 * c) R(ctx, bx + i, by + bh - c, c, c, dk); if (lumpy) for (let i = 0; i < bw; i += 3 * c) R(ctx, bx + i, by + c, c, c, lt) }
  if (kind === 'hook') { R(ctx, -c, -16 * c, 2 * c, 4 * c, INK); band(-3 * c, -13 * c, 6 * c, 26 * c); band(-6 * c, -13 * c, 4 * c, 22 * c) }
  if (kind === 'folded') { band(-12 * c, -9 * c, 24 * c, 4 * c); band(-12 * c, -5 * c, 24 * c, 4 * c); band(-12 * c, -1 * c, 24 * c, 4 * c) }
  if (kind === 'pillow') {
    R(ctx, -18 * c, -2 * c, 36 * c, 10 * c, INK); R(ctx, -17 * c, -1 * c, 34 * c, 8 * c, '#f3e6f0'); R(ctx, -17 * c, -1 * c, 34 * c, 2 * c, '#ffffff')
    band(-12 * c, -8 * c, 24 * c, 4 * c); band(-12 * c, -4 * c, 24 * c, 3 * c)
    ctx.globalAlpha = 0.8 * alpha; for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; R(ctx, (-8 + i * 8) * c, (-12 - ph * 10) * c, c * 1.4, c * 1.4, ML_GOLD) }
  }
  if (kind === 'box') {
    R(ctx, -16 * c, -12 * c, 32 * c, 20 * c, INK); R(ctx, -15 * c, -11 * c, 30 * c, 18 * c, '#ff8fb1'); R(ctx, -2 * c, -11 * c, 4 * c, 18 * c, ML_GOLD); R(ctx, -15 * c, -3 * c, 30 * c, 3 * c, ML_GOLD)
    R(ctx, -7 * c, -16 * c, 6 * c, 5 * c, ML_GOLD); R(ctx, 1 * c, -16 * c, 6 * c, 5 * c, ML_GOLD)
  }
  ctx.restore()
}
export function drawBlanket(ctx, x, y, w, h, t, { col = '#c05a6a', alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  const dk = shade(col, -0.22), lt = shade(col, 0.3)
  R(ctx, x - 6, y - 6, w + 12, h + 12, INK); R(ctx, x, y, w, h, col)
  for (let yy = y + 14; yy < y + h; yy += 28) for (let xx = x + ((yy - y) / 28 % 2) * 20; xx < x + w - 10; xx += 40) { R(ctx, xx, yy, 14, 8, dk); R(ctx, xx + 4, yy - 4, 6, 4, lt) }
  R(ctx, x, y, w, 10, lt)
  ctx.restore()
}
export { CAFE }
