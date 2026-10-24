// alignment · the two charts on the H wheel — shared by parts A, B and C so the placements match across the cuts. (v2: bigger, bolder)
// Every placement sits at the MIDDLE of its sign (sign start + 15°), so the angles between them are exact whole aspects:
//   your Libra Rising ↔ her Gemini Moon = 120° (trine) · her Libra Sun ↔ your Sagittarius Moon = 60° (sextile)
//   your Taurus Sun ↔ her Aquarius Rising = 90° (square).
// Geometry follows promo/films/wheel.js (Aries at 9 o'clock, signs counter-clockwise): you on the OUTER track (outside rOut),
// Juniper on the INNER track (inside rIn). All helpers take an optional wheel geometry W (cx, cy, rOut, rIn) so part A can
// draw the same thing on its smaller wheels; sizes scale with W.rOut / WHEEL.rOut.
import { noise1 } from '../../../../src/lib.js'
import { SIGNS, WHEEL, ptOf, signMid, angOf } from '../../../wheel.js'
import { drawPixelStar } from '../../../sky.js'

const P = (sign, body) => ({ sign, body, lon: signMid(sign), name: SIGNS.find(s => s.id === sign).name })
export const PLACEMENTS = {
  you: { sun: P('taurus', 'sun'), moon: P('sagittarius', 'moon'), rising: P('libra', 'rising') },
  juniper: { sun: P('libra', 'sun'), moon: P('gemini', 'moon'), rising: P('aquarius', 'rising') },
}
/** track radius on the full-size H wheel (rOut 460 / rIn 368): you just outside the ring, Juniper just inside */
export const TRACK = { you: WHEEL.rOut + 40, juniper: WHEEL.rIn - 48 }   // 500 / 320
/** the two tints: warm apricot for you, periwinkle for Juniper (saturated for v2) */
export const TINT = { you: '#ffb072', juniper: '#a08cff' }
export const TINT_RGB = { you: '255,176,114', juniper: '160,140,255' }
/** the label beside each orb (planet glyphs; AC = Ascendant / Rising) */
export const BODY_LABEL = { sun: '☉︎', moon: '☽︎', rising: 'AC' }
/** label offset along the track (degrees of longitude, + = counter-clockwise on screen) */
export const LABEL_DLON = { you: 9, juniper: 14 }
/** orb core radius on the full-size wheel */
export const ORB_R = 30
const BODIES = ['sun', 'moon', 'rising']
const sc = W => W.rOut / WHEEL.rOut

/** canvas position of a placement on the H wheel (or on geometry W): PLACE('you','sun') → {x, y} */
export const PLACE = (who, body, W = WHEEL) => ptOf(PLACEMENTS[who][body].lon, TRACK[who] * sc(W), W)

/** one glowing orb: big soft halo, lit core, rim, pixel-star glint. s scales size, k opacity, t drives a faint shimmer */
export function drawOrb(ctx, x, y, who, { k = 1, s = 1, t = 0, seed = 1 } = {}) {
  if (k <= 0 || s <= 0) return
  const rgb = TINT_RGB[who], sh = 0.9 + 0.1 * noise1(t * 1.3, seed)
  ctx.save()
  const hr = ORB_R * 3.2 * s
  const g = ctx.createRadialGradient(x, y, 0, x, y, hr)
  g.addColorStop(0, `rgba(${rgb},${0.6 * k * sh})`); g.addColorStop(0.3, `rgba(${rgb},${0.24 * k * sh})`); g.addColorStop(1, `rgba(${rgb},0)`)
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, hr, 0, Math.PI * 2); ctx.fill()
  const cr = ORB_R * s
  const c = ctx.createRadialGradient(x - cr * 0.38, y - cr * 0.42, 0, x, y, cr)
  c.addColorStop(0, `rgba(255,252,244,${k})`); c.addColorStop(0.4, `rgba(${rgb},${k})`); c.addColorStop(1, `rgba(${rgb},${0.85 * k})`)
  ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, cr, 0, Math.PI * 2); ctx.fill()
  ctx.globalAlpha = 0.55 * k; ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = Math.max(1.5, 3 * s)
  ctx.beginPath(); ctx.arc(x, y, cr, 0, Math.PI * 2); ctx.stroke()
  ctx.globalAlpha = k * (0.8 + 0.2 * sh)
  drawPixelStar(ctx, x + cr * 0.8, y - cr * 0.8, Math.max(14, Math.round(28 * s)), 2, '#ffffff', '#fffaf0')
  ctx.restore()
}

/** an extra wash over a sign's band (between rIn and rOut) in the sign's own colour — marks an occupied sign */
export function drawSignWash(ctx, sign, k, W = WHEEL) {
  if (k <= 0) return
  const i = SIGNS.findIndex(x => x.id === sign)
  const a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
  ctx.save()
  ctx.globalAlpha = 0.42 * k
  ctx.fillStyle = SIGNS[i].color
  ctx.beginPath(); ctx.arc(W.cx, W.cy, W.rOut, a0, a1, true); ctx.arc(W.cx, W.cy, W.rIn, a1, a0, false); ctx.closePath(); ctx.fill()
  ctx.restore()
}

/** the dotted track a person's placements ride on */
export function drawTrack(ctx, who, k, W = WHEEL, r = TRACK[who] * sc(W)) {
  if (k <= 0) return
  ctx.save()
  ctx.globalAlpha = 0.6 * k; ctx.strokeStyle = TINT[who]; ctx.lineWidth = 4; ctx.lineCap = 'round'
  ctx.setLineDash([0.1, 16]); ctx.beginPath(); ctx.arc(W.cx, W.cy, r, 0, Math.PI * 2); ctx.stroke()
  ctx.restore()
}

/** a fat glowing tick from an orb to the edge of its sign's band (shows which sign it sits in) */
export function drawTick(ctx, who, body, k, W = WHEEL) {
  if (k <= 0) return
  const s = sc(W), r = TRACK[who] * s, lon = PLACEMENTS[who][body].lon
  const [r0, r1] = who === 'you' ? [r - (ORB_R + 2) * s, W.rOut + 2] : [r + (ORB_R + 2) * s, W.rIn - 2]
  if ((who === 'you' && r0 <= r1) || (who !== 'you' && r0 >= r1)) return
  const a = ptOf(lon, r0, W), b = ptOf(lon, r1, W)
  ctx.save()
  ctx.globalAlpha = 0.9 * k; ctx.strokeStyle = TINT[who]; ctx.lineWidth = Math.max(3, 6 * s); ctx.lineCap = 'round'
  ctx.shadowColor = TINT[who]; ctx.shadowBlur = 12
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
  ctx.restore()
}

/** the ☉ / ☽ / AC tag beside an orb, along its track (≥ 44 px on the full wheel); s scales the type */
export function drawOrbLabel(ctx, who, body, k, W = WHEEL, s = 1) {
  if (k <= 0) return
  const p = ptOf(PLACEMENTS[who][body].lon + LABEL_DLON[who], TRACK[who] * sc(W), W)
  ctx.save()
  ctx.globalAlpha = k
  ctx.fillStyle = TINT[who]
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const sz = Math.round((body === 'rising' ? 46 : 66) * s)
  ctx.font = body === 'rising' ? `700 ${sz}px 'Space Mono', monospace` : `bold ${sz}px 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`
  ctx.shadowColor = 'rgba(6,5,16,0.95)'; ctx.shadowBlur = 10
  ctx.fillText(BODY_LABEL[body], p.x, p.y + (body === 'rising' ? 2 : 0))
  ctx.restore()
}

/**
 * Both charts on the H wheel, exactly as part A holds them (13–18.6) before they clear to H.
 * k fades everything; who limits to 'you' / 'juniper'; labels toggles the ☉ ☽ AC tags; washes the sign bands.
 * Draw it on top of drawSky(SKY_H) + drawWheelH().
 */
export function drawPlacements(ctx, { k = 1, t = 0, who = ['you', 'juniper'], labels = true, washes = true, tracks = true, ticks = true } = {}) {
  if (k <= 0) return
  for (const w of who) {
    if (washes) for (const b of BODIES) drawSignWash(ctx, PLACEMENTS[w][b].sign, k * 0.5)
    if (tracks) drawTrack(ctx, w, k)
  }
  for (const w of who) BODIES.forEach((b, i) => {
    const p = PLACE(w, b)
    if (ticks) drawTick(ctx, w, b, k)
    drawOrb(ctx, p.x, p.y, w, { k, t, seed: (w === 'you' ? 10 : 20) + i })
    if (labels) drawOrbLabel(ctx, w, b, k)
  })
}

/** a little burst of pixel stars flying out of (x, y); p 0→1 over its life */
export function drawSparkle(ctx, x, y, p, { n = 8, dist = 80, colors = ['#fff3d6', '#f2c75c'], size = 21, seed = 1 } = {}) {
  if (p <= 0 || p >= 1) return
  ctx.save()
  const e = 1 - Math.pow(1 - p, 3)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed * 1.7 + (i % 2) * 0.3
    const d = dist * (0.55 + 0.45 * ((i * 37 + seed * 11) % 7) / 6) * e
    ctx.globalAlpha = (1 - p) * (1 - p) * 0.95
    drawPixelStar(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d, i % 3 === 0 ? size : Math.round(size * 0.67), i % 2 ? 2 : 1, colors[i % colors.length], '#ffffff')
  }
  ctx.restore()
}
