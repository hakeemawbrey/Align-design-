// whop-type · the zodiac sky: a line-art sun, a slow zodiac wheel, drifting zodiac glyphs, planets,
// shooting stars, the moon and a pixel-star Houston skyline. One canvas per instance, redrawn per frame
// from a config that is a pure function of t, so every frame is exact.
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { W, H, VERT } from '../../../src/scenes/common.js'
import { drawMoon } from '../../../src/scenes/fx-moon.js'

export const ZODIAC = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((g) => g + '︎')
export const GLYPH_FONT = "'DejaVu Sans'"   // text-style zodiac glyphs (never the colour emoji)

/** the tarot "Sun": soft gold/rose corona, two rings, alternating straight + wavy rays, slowly turning */
export function drawSun(ctx, x, y, R, t, a) {
  if (a <= 0.003) return
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, R * 0.2, x, y, R * 2.6)
  g.addColorStop(0, `rgba(255,214,140,${0.30 * a})`); g.addColorStop(0.3, `rgba(242,154,110,${0.16 * a})`)
  g.addColorStop(0.6, `rgba(232,98,138,${0.07 * a})`); g.addColorStop(1, 'rgba(180,92,255,0)')
  ctx.fillStyle = g; ctx.fillRect(x - R * 2.6, y - R * 2.6, R * 5.2, R * 5.2)
  // inner disc warmth
  const d = ctx.createRadialGradient(x, y, 0, x, y, R * 0.62)
  d.addColorStop(0, `rgba(255,236,190,${0.16 * a})`); d.addColorStop(1, `rgba(255,214,140,${0.05 * a})`)
  ctx.fillStyle = d; ctx.beginPath(); ctx.arc(x, y, R * 0.62, 0, 7); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  ctx.strokeStyle = `rgba(242,199,92,${0.55 * a})`; ctx.lineCap = 'round'
  ctx.lineWidth = Math.max(1, R * 0.008)
  ctx.beginPath(); ctx.arc(x, y, R * 0.62, 0, 7); ctx.stroke()
  ctx.lineWidth = Math.max(0.8, R * 0.005)
  ctx.beginPath(); ctx.arc(x, y, R * 0.54, 0, 7); ctx.stroke()
  const rot = t * 0.06, N = 32
  for (let i = 0; i < N; i++) {
    const ang = rot + (i / N) * Math.PI * 2, ca = Math.cos(ang), sa = Math.sin(ang)
    const r0 = R * 0.7
    if (i % 2 === 0) {
      const r1 = R * (i % 4 === 0 ? 1.05 : 0.92)
      ctx.beginPath(); ctx.moveTo(x + ca * r0, y + sa * r0); ctx.lineTo(x + ca * r1, y + sa * r1); ctx.stroke()
    } else {
      // wavy ray
      const r1 = R * 0.86
      ctx.beginPath()
      for (let k = 0; k <= 14; k++) {
        const u = k / 14, r = lerp(r0, r1, u), off = Math.sin(u * Math.PI * 3 + t * 1.2) * R * 0.018
        const px = x + ca * r - sa * off, py = y + sa * r + ca * off
        k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
      }
      ctx.stroke()
    }
  }
  ctx.restore()
}

/** zodiac wheel: two rings, 12 houses, the glyphs between them */
export function drawWheel(ctx, x, y, R, rot, a) {
  if (a <= 0.003) return
  ctx.save()
  ctx.strokeStyle = `rgba(217,205,240,${0.32 * a})`; ctx.lineWidth = 1
  ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.stroke()
  ctx.beginPath(); ctx.arc(x, y, R * 0.84, 0, 7); ctx.stroke()
  ctx.strokeStyle = `rgba(217,205,240,${0.14 * a})`
  ctx.beginPath(); ctx.arc(x, y, R * 0.6, 0, 7); ctx.stroke()
  // fine degree ticks
  ctx.strokeStyle = `rgba(217,205,240,${0.22 * a})`
  for (let i = 0; i < 72; i++) {
    const ang = rot + i / 72 * Math.PI * 2, l = i % 6 === 0 ? 0.06 : 0.025
    ctx.beginPath(); ctx.moveTo(x + Math.cos(ang) * R, y + Math.sin(ang) * R); ctx.lineTo(x + Math.cos(ang) * R * (1 - l), y + Math.sin(ang) * R * (1 - l)); ctx.stroke()
  }
  ctx.strokeStyle = `rgba(217,205,240,${0.2 * a})`
  ctx.fillStyle = `rgba(239,230,214,${0.5 * a})`
  ctx.font = `${Math.round(R * 0.085)}px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  for (let i = 0; i < 12; i++) {
    const ang = rot + i / 12 * Math.PI * 2, mid = ang + Math.PI / 12
    ctx.beginPath(); ctx.moveTo(x + Math.cos(ang) * R * 0.84, y + Math.sin(ang) * R * 0.84); ctx.lineTo(x + Math.cos(ang) * R * 0.6, y + Math.sin(ang) * R * 0.6); ctx.stroke()
    const gx = x + Math.cos(mid) * R * 0.92, gy = y + Math.sin(mid) * R * 0.92
    ctx.save(); ctx.translate(gx, gy); ctx.rotate(mid + Math.PI / 2); ctx.fillText(ZODIAC[i], 0, 0); ctx.restore()
  }
  ctx.restore()
}

/** pixel-star Houston skyline (generic downtown towers: stepped gables, a slim spire, a flat-topped giant) */
const SKY_CELL = VERT ? 7 : 6
const SKYLINE = (() => {
  // [width, height, top] in cells; tops: f flat, s stepped gable, p pyramid, n needle, a angled
  const B = [
    [10, 9, 'f'], [6, 13, 'a'], [9, 7, 'f'], [7, 18, 's'], [5, 12, 'f'], [8, 27, 'f'], [6, 21, 'p'], [9, 31, 's'], [5, 19, 'n'],
    [8, 36, 'f'], [6, 24, 'a'], [7, 29, 's'], [9, 16, 'f'], [5, 22, 'p'], [10, 11, 'f'], [6, 8, 'f'],
  ]
  const cols = Math.ceil(W / SKY_CELL), total = B.reduce((a, b) => a + b[0] + 2, 0)
  const scale = VERT ? 0.62 : 1
  const start = Math.round((cols - total) / 2)
  const hs = new Array(cols).fill(0), lit = []
  let x = start
  const r = rng(713)
  for (const [w, h0, top] of B) {
    const h = Math.round(h0 * scale * (VERT ? 1.25 : 1))
    for (let i = 0; i < w; i++) {
      let hh = h
      const c = i - (w - 1) / 2, ac = Math.abs(c)
      if (top === 's') hh = h - Math.floor(ac / 1.5) * 2
      if (top === 'p') hh = h - Math.floor(ac)
      if (top === 'a') hh = h - Math.floor(i * 0.6)
      if (top === 'n' && ac < 0.6) hh = h + 6
      if (x + i >= 0 && x + i < cols) hs[x + i] = Math.max(hs[x + i], hh)
      for (let k = 1; k < hh - 1; k++) if ((k % 2 === 0) && (i % 2 === 1) && r() < 0.18) lit.push([x + i, k, r() * 6.28, r()])
    }
    x += w + 2
  }
  // low sprawl both sides
  for (let c = 0; c < cols; c++) if (!hs[c]) hs[c] = 2 + Math.round(1.5 * (1 + Math.sin(c * 0.37)) * (r() < 0.5 ? 1 : 0.5))
  return { hs, lit, cols }
})()
export function drawSkyline(ctx, t, a, { lift = 0 } = {}) {
  if (a <= 0.003) return
  const { hs, lit, cols } = SKYLINE, cs = SKY_CELL, base = H + lift
  ctx.save()
  // silhouette: deep indigo (darker than the sky), a violet rim along the roofline
  ctx.fillStyle = `rgba(10,5,28,${0.72 * a})`
  for (let c = 0; c < cols; c++) ctx.fillRect(c * cs, base - hs[c] * cs, cs, hs[c] * cs)
  const f = Math.floor(t * 15)
  for (let c = 0; c < cols; c++) {
    const top = base - hs[c] * cs
    // roofline as a row of pixel stars (dotted), brighter on the tall towers
    const tall = hs[c] > 14
    if ((c + (tall ? 0 : 1)) % (tall ? 1 : 2) === 0) { ctx.fillStyle = `rgba(201,182,240,${(tall ? 0.55 : 0.3) * a})`; ctx.fillRect(c * cs, top, cs - 1, Math.max(1, cs / 3)) }
    // step edges
    if (c > 0 && hs[c] !== hs[c - 1]) { const y0 = base - Math.max(hs[c], hs[c - 1]) * cs, y1 = base - Math.min(hs[c], hs[c - 1]) * cs; ctx.fillStyle = `rgba(201,182,240,${0.28 * a})`; ctx.fillRect(c * cs, y0, Math.max(1, cs / 3), y1 - y0) }
  }
  // windows twinkle (stepped 15fps)
  for (const [c, k, ph, w] of lit) {
    const on = Math.sin(f * 0.21 + ph * 3) > -0.3
    if (!on) continue
    ctx.fillStyle = w < 0.7 ? `rgba(242,199,92,${0.55 * a})` : `rgba(255,189,246,${0.45 * a})`
    ctx.fillRect(c * cs + 1, base - (k + 1) * cs + 1, cs - 2, cs - 2)
  }
  // aircraft-warning beacons on the two tallest towers
  const top2 = hs.map((h, c) => [h, c]).sort((p, q) => q[0] - p[0])
  const seen = new Set()
  for (const [h, c] of top2) {
    if ([...seen].some(s => Math.abs(s - c) < 6)) continue
    seen.add(c); if (seen.size > 2) break
    const blink = (f + c) % 15 < 6
    if (blink) { ctx.fillStyle = `rgba(255,45,58,${0.9 * a})`; ctx.fillRect(c * cs, base - (h + 1) * cs, cs, cs) }
  }
  ctx.restore()
}

/** a few planets on a gentle ecliptic arc */
const PLANETS = [
  { u: 0.12, c: '255,236,190', r: 4.5 }, { u: 0.33, c: '255,143,177', r: 3.5 }, { u: 0.71, c: '242,199,92', r: 6, ring: true }, { u: 0.9, c: '154,200,255', r: 3.5 },
]
export function drawPlanets(ctx, t, a, { y0 = 0.2, bow = 0.08 } = {}) {
  if (a <= 0.003) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  for (const p of PLANETS) {
    const u = p.u + t * 0.002, x = u * W, y = (y0 + bow * Math.pow((u - 0.5) * 2, 2)) * H
    const R = p.r * (VERT ? 1.2 : 1)
    const g = ctx.createRadialGradient(x, y, 0, x, y, R * 5)
    g.addColorStop(0, `rgba(${p.c},${0.55 * a})`); g.addColorStop(0.25, `rgba(${p.c},${0.18 * a})`); g.addColorStop(1, `rgba(${p.c},0)`)
    ctx.fillStyle = g; ctx.fillRect(x - R * 5, y - R * 5, R * 10, R * 10)
    ctx.fillStyle = `rgba(${p.c},${0.95 * a})`; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill()
    if (p.ring) { ctx.strokeStyle = `rgba(${p.c},${0.6 * a})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, y, R * 2.3, R * 0.7, -0.35, 0, 7); ctx.stroke() }
  }
  ctx.restore()
}

/** the 12 zodiac glyphs, faint, drifting in the starfield (kept off the centre band) */
const DRIFT = (() => {
  const r = rng(1212), out = []
  for (let i = 0; i < 12; i++) {
    let x, y
    do { x = 0.05 + r() * 0.9; y = 0.06 + r() * 0.88 } while (VERT ? (y > 0.3 && y < 0.72) : (y > 0.3 && y < 0.7 && x > 0.18 && x < 0.82))
    out.push({ g: ZODIAC[i], x, y, s: (VERT ? 36 : 30) + r() * 18, ph: r() * 6.28, sp: 0.5 + r() * 0.8, rot: (r() - 0.5) * 0.5 })
  }
  return out
})()
export function drawGlyphs(ctx, t, a) {
  if (a <= 0.003) return
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  for (const d of DRIFT) {
    const tw = 0.55 + 0.45 * Math.sin(t * d.sp + d.ph)
    const x = d.x * W + Math.sin(t * 0.15 + d.ph) * 14, y = d.y * H + Math.cos(t * 0.12 + d.ph) * 10 - t * 2
    ctx.font = `${Math.round(d.s)}px ${GLYPH_FONT}`
    ctx.shadowColor = 'rgba(214,190,255,0.8)'; ctx.shadowBlur = 12
    ctx.fillStyle = `rgba(239,230,214,${0.26 * a * tw})`
    ctx.save(); ctx.translate(x, y); ctx.rotate(d.rot); ctx.fillText(d.g, 0, 0); ctx.restore()
  }
  ctx.restore()
}

/** a shooting star crossing at t0 over `dur` s, from (x0,y0) fraction of the frame, heading along `ang` */
export function drawShoot(ctx, t, t0, x0, y0, ang = 0.42, dur = 0.7, len = 0.22) {
  const p = (t - t0) / dur
  if (p <= 0 || p >= 1) return
  const L = len * W, e = ease.outQuad(p), dx = Math.cos(ang), dy = Math.sin(ang)
  const hx = x0 * W + dx * W * 0.35 * e, hy = y0 * H + dy * W * 0.35 * e
  const k = Math.sin(Math.PI * p), tl = L * (0.3 + 0.7 * k)
  const g = ctx.createLinearGradient(hx, hy, hx - dx * tl, hy - dy * tl)
  g.addColorStop(0, `rgba(255,250,240,${0.95 * k})`); g.addColorStop(0.3, `rgba(255,214,240,${0.4 * k})`); g.addColorStop(1, 'rgba(255,214,240,0)')
  ctx.save(); ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx - dx * tl, hy - dy * tl); ctx.stroke()
  ctx.fillStyle = `rgba(255,250,240,${k})`; ctx.beginPath(); ctx.arc(hx, hy, 2.2, 0, 7); ctx.fill()
  ctx.restore()
}

/** one sky canvas: cfg(t) → { sun:{x,y,R,a}, wheel:{x,y,R,a}, glyphs, planets:{a,y0}, skyline, moon:{x,y,R,p,a}, shoots:[[t0,x,y,ang]] } */
export function skyCanvas(parent, cfg, style = {}) {
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none', ...style }, parent)
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')
  return {
    cv,
    update(t) {
      const c = cfg(t)
      ctx.clearRect(0, 0, W, H)
      if (c.sun) drawSun(ctx, c.sun.x, c.sun.y, c.sun.R, t, c.sun.a)
      if (c.wheel) drawWheel(ctx, c.wheel.x, c.wheel.y, c.wheel.R, c.wheel.rot ?? t * 0.03, c.wheel.a)
      if (c.planets) drawPlanets(ctx, t, c.planets.a, c.planets)
      if (c.glyphs) drawGlyphs(ctx, t, c.glyphs)
      if (c.moon) drawMoon(ctx, c.moon.x, c.moon.y, c.moon.R, c.moon.p, { alpha: c.moon.a, glow: 2.4, earthshine: 1, darkAlpha: 0.55 })
      for (const s of c.shoots || []) drawShoot(ctx, t, ...s)
      if (c.skyline) drawSkyline(ctx, t, c.skyline)
    },
  }
}
export const fade = (t, a, b, c, d) => Math.min(ease.inOutQuad(prog(t, a, b)), 1 - ease.inOutQuad(prog(t, c, d)))
export { clamp }
