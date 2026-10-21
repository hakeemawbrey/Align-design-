// alignment · the two charts on the H wheel — shared by parts A, B and C so the placements match across the cuts.
// Every placement sits at the MIDDLE of its sign (sign start + 15°), so the angles between them are exact whole aspects:
//   your Libra Rising ↔ her Gemini Moon = 120° (trine) · her Libra Sun ↔ your Sagittarius Moon = 60° (sextile)
//   your Taurus Sun ↔ her Aquarius Rising = 90° (square).
// Geometry follows promo/films/wheel.js (Aries at 9 o'clock, signs counter-clockwise): you on the OUTER track (outside the
// ring), Juniper on the INNER track (inside the ring).
import { noise1 } from '../../../../src/lib.js'
import { SIGNS, WHEEL, ptOf, signMid, angOf } from '../../../wheel.js'
import { drawPixelStar } from '../../../sky.js'

const P = (sign, body) => ({ sign, body, lon: signMid(sign), name: SIGNS.find(s => s.id === sign).name })
export const PLACEMENTS = {
  you: { sun: P('taurus', 'sun'), moon: P('sagittarius', 'moon'), rising: P('libra', 'rising') },
  juniper: { sun: P('libra', 'sun'), moon: P('gemini', 'moon'), rising: P('aquarius', 'rising') },
}
/** track radius on the full-size H wheel (r 400 / 330) */
export const TRACK = { you: 440, juniper: 280 }
/** the two tints: warm apricot for you, periwinkle for Juniper */
export const TINT = { you: '#f7b98b', juniper: '#b9a9ff' }
export const TINT_RGB = { you: '247,185,139', juniper: '185,169,255' }
/** the little label beside each orb (planet glyphs; AC = Ascendant / Rising) */
export const BODY_LABEL = { sun: '☉︎', moon: '☽︎', rising: 'AC' }
/** label offset along the track (degrees of longitude, + = counter-clockwise on screen) */
export const LABEL_DLON = { you: 8, juniper: 12 }
/** canvas position of a placement on the H wheel: PLACE('you','sun') → {x, y} */
export const PLACE = (who, body, W = WHEEL) => ptOf(PLACEMENTS[who][body].lon, TRACK[who], W)

/** one glowing orb: soft halo, lit core, pixel-star glint. s scales size, k opacity, t only drives a faint shimmer */
export function drawOrb(ctx, x, y, who, { k = 1, s = 1, t = 0, seed = 1 } = {}) {
  if (k <= 0) return
  const rgb = TINT_RGB[who], sh = 0.9 + 0.1 * noise1(t * 1.3, seed)
  ctx.save()
  const hr = 46 * s
  const g = ctx.createRadialGradient(x, y, 0, x, y, hr)
  g.addColorStop(0, `rgba(${rgb},${0.55 * k * sh})`); g.addColorStop(0.3, `rgba(${rgb},${0.22 * k * sh})`); g.addColorStop(1, `rgba(${rgb},0)`)
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, hr, 0, Math.PI * 2); ctx.fill()
  const cr = 12 * s
  const c = ctx.createRadialGradient(x - cr * 0.35, y - cr * 0.35, 0, x, y, cr)
  c.addColorStop(0, `rgba(255,250,240,${k})`); c.addColorStop(0.45, `rgba(${rgb},${k})`); c.addColorStop(1, `rgba(${rgb},${0.75 * k})`)
  ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, cr, 0, Math.PI * 2); ctx.fill()
  ctx.globalAlpha = k * (0.75 + 0.25 * sh)
  drawPixelStar(ctx, x + cr * 0.9, y - cr * 0.9, Math.max(7, Math.round(14 * s)), 2, `rgba(${rgb},1)`, '#fffaf0')
  ctx.restore()
}

/** a faint wash over a sign's slot in the ring (between rIn and rOut) in the sign's own colour */
export function drawSignWash(ctx, sign, k, W = WHEEL) {
  if (k <= 0) return
  const i = SIGNS.findIndex(x => x.id === sign)
  const a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
  ctx.save()
  ctx.globalAlpha = 0.2 * k
  ctx.fillStyle = SIGNS[i].color
  ctx.beginPath(); ctx.arc(W.cx, W.cy, W.rOut, a0, a1, true); ctx.arc(W.cx, W.cy, W.rIn, a1, a0, false); ctx.closePath(); ctx.fill()
  ctx.restore()
}

/** the faint dashed track a person's placements ride on */
export function drawTrack(ctx, who, k, W = WHEEL, r = TRACK[who] * W.rOut / WHEEL.rOut) {
  if (k <= 0) return
  ctx.save()
  ctx.globalAlpha = 0.5 * k; ctx.strokeStyle = TINT[who]; ctx.lineWidth = 2
  ctx.setLineDash([2, 10]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(W.cx, W.cy, r, 0, Math.PI * 2); ctx.stroke()
  ctx.restore()
}

/**
 * Both charts on the H wheel, exactly as part A leaves them at 18.6 (before they clear to H).
 * k fades everything; who limits to 'you' / 'juniper'; labels toggles the ☉ ☽ AC tags; washes the sign slots.
 * Draw it on top of drawSky(SKY_H) + drawWheelH().
 */
export function drawPlacements(ctx, { k = 1, t = 0, who = ['you', 'juniper'], labels = true, washes = true, tracks = true } = {}) {
  if (k <= 0) return
  for (const w of who) {
    if (washes) for (const b of ['sun', 'moon', 'rising']) drawSignWash(ctx, PLACEMENTS[w][b].sign, k * 0.5)
    if (tracks) drawTrack(ctx, w, k)
  }
  for (const w of who) ['sun', 'moon', 'rising'].forEach((b, i) => {
    const p = PLACE(w, b)
    drawTick(ctx, w, b, k)
    drawOrb(ctx, p.x, p.y, w, { k, t, seed: (w === 'you' ? 10 : 20) + i })
    if (labels) drawOrbLabel(ctx, w, b, k)
  })
}

/** a short tinted tick from an orb to the edge of its sign slot in the ring (shows which sign it sits in) */
export function drawTick(ctx, who, body, k, W = WHEEL) {
  if (k <= 0) return
  const sc = W.rOut / WHEEL.rOut, r = TRACK[who] * sc, lon = PLACEMENTS[who][body].lon
  const [r0, r1] = who === 'you' ? [r - 17 * sc, W.rOut + 2] : [r + 17 * sc, W.rIn - 2]
  const a = ptOf(lon, r0, W), b = ptOf(lon, r1, W)
  ctx.save()
  ctx.globalAlpha = 0.7 * k; ctx.strokeStyle = TINT[who]; ctx.lineWidth = 2; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
  ctx.restore()
}

/** the ☉ / ☽ / AC tag beside an orb, along its track; W/r let part A draw it on the smaller wheels too */
export function drawOrbLabel(ctx, who, body, k, W = WHEEL, s = 1) {
  if (k <= 0) return
  const r = TRACK[who] * W.rOut / WHEEL.rOut
  const p = ptOf(PLACEMENTS[who][body].lon + LABEL_DLON[who], r, W)
  ctx.save()
  ctx.globalAlpha = 0.95 * k
  ctx.fillStyle = TINT[who]
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const sz = Math.round((body === 'rising' ? 25 : 32) * s)
  ctx.font = body === 'rising' ? `${sz}px 'Space Mono', monospace` : `${sz}px 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`
  ctx.shadowColor = 'rgba(6,5,16,0.9)'; ctx.shadowBlur = 8
  ctx.fillText(BODY_LABEL[body], p.x, p.y)
  ctx.restore()
}
