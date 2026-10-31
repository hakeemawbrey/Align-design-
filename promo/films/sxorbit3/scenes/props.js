// sxorbit3 props — Ep 3 only (the cast lives in ../../sxorbit1/scenes/orbit.js). Pure canvas drawings; no document access.
//   drawSpotlight(ctx, x, y, k, t)     Streak's own spotlight: a pink-gold cone from the top of the frame onto (x, y)
//   drawWind(ctx, t, k, seed)          pixel gusts streaming right → left across the frame (k = strength 0…1)
//   drawFan(ctx, x, y, c, t, k)        Streak's tiny personal wind machine (it came with her)
//   drawReply(ctx, cx, cy, w, t, o)    the talk card sliding back out: back (o.flip 0) → Tide's handwritten reply (o.flip 1)
//   knockText(ctx, x, y, text, t, t0, col)   a "KNOCK" burst
import { clamp, lerp, rng } from '../../../src/lib.js'
import { INK, GOLD, ORBIT_PINK, SERIF, MONO, INTER, rgba, drawCardBack } from '../../sxorbit1/scenes/orbit.js'

export function drawSpotlight(x, X, Y, k, t) {
  if (k <= 0.01) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const top = -40, wTop = 70, wBot = 260
  const g = x.createLinearGradient(0, top, 0, Y + 80)
  g.addColorStop(0, `rgba(255,230,190,${0.32 * k})`); g.addColorStop(1, `rgba(255,140,200,${0.16 * k})`)
  const sx = 540 + Math.sin(t * 0.8) * 20
  x.fillStyle = g; x.beginPath(); x.moveTo(sx - wTop, top); x.lineTo(sx + wTop, top); x.lineTo(X + wBot, Y + 80); x.lineTo(X - wBot, Y + 80); x.closePath(); x.fill()
  x.fillStyle = `rgba(255,220,240,${0.2 * k})`; x.beginPath(); x.ellipse(X, Y + 90, wBot, 50, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
export function drawWind(x, t, k, seed = 3) {
  if (k <= 0.01) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < 46; i++) {
    const y = 300 + r() * 1300, sp = 1600 + r() * 1400, len = 120 + r() * 320, ph = r()
    const xx = 1300 - (((t * sp) / 1500 + ph) % 1) * 1800
    x.globalAlpha = k * (0.25 + 0.4 * r())
    x.fillStyle = i % 4 ? '#e8e0ff' : '#ffd0ec'
    x.fillRect(Math.round(xx), Math.round(y + Math.sin(t * 3 + i) * 10), len, i % 3 ? 4 : 7)
  }
  x.restore()
}
export function drawFan(x, X, Y, c, t, k = 1) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k); x.translate(Math.round(X), Math.round(Y))
  // stand
  x.fillStyle = INK; x.fillRect(-1.5 * c, 0, 3 * c, 9 * c); x.fillRect(-5 * c, 9 * c, 10 * c, 2.5 * c)
  x.fillStyle = '#b8a6e0'; x.fillRect(-0.8 * c, 0, 1.6 * c, 9 * c); x.fillStyle = ORBIT_PINK; x.fillRect(-4.3 * c, 9.5 * c, 8.6 * c, 1.4 * c)
  // cage + spinning blades
  x.beginPath(); x.arc(0, -4 * c, 7 * c, 0, Math.PI * 2); x.fillStyle = INK; x.fill()
  x.beginPath(); x.arc(0, -4 * c, 6 * c, 0, Math.PI * 2); x.fillStyle = '#2a1c50'; x.fill()
  for (let i = 0; i < 3; i++) {
    const a = t * 30 + i * Math.PI * 2 / 3
    x.save(); x.translate(0, -4 * c); x.rotate(a); x.fillStyle = '#ffd0ec'; x.beginPath(); x.ellipse(3 * c, 0, 3 * c, 1.3 * c, 0, 0, Math.PI * 2); x.fill(); x.restore()
  }
  x.fillStyle = GOLD; x.fillRect(-c, -5 * c, 2 * c, 2 * c)
  x.strokeStyle = rgba('#e8e0ff', 0.7); x.lineWidth = Math.max(1, c * 0.4)
  for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(i * 2.5 * c, -10 * c); x.lineTo(i * 2.5 * c, 2 * c); x.stroke() }
  x.restore()
}
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
export function drawReply(x, cx, cy, w, t, { flip = 0, alpha = 1, rot = 0, lines = ['…we need', 'to talk.'] } = {}) {
  if (alpha <= 0) return
  const h = w * 1.4, sx = Math.cos(Math.PI * clamp(flip))
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  if (sx > 0) { x.scale(Math.max(0.02, sx), 1); drawCardBack(x, 0, 0, w, h, t) }
  else {
    x.scale(-sx, 1)
    x.save(); x.shadowColor = rgba(ORBIT_PINK, 0.8); x.shadowBlur = 50
    rr(x, -w / 2, -h / 2, w, h, w * 0.09); x.fillStyle = '#fff6ea'; x.fill(); x.restore()
    x.lineWidth = w * 0.025; x.strokeStyle = '#3fb6f0'; rr(x, -w / 2, -h / 2, w, h, w * 0.09); x.stroke()
    x.fillStyle = rgba(INK, 0.65); x.font = `700 ${Math.round(w * 0.06)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('♋︎ TIDE ANSWERED', 0, -h * 0.36)
    x.fillStyle = INK; x.font = `italic 600 ${Math.round(w * 0.17)}px ${SERIF}`
    lines.forEach((s, i) => x.fillText(s, 0, -h * 0.06 + i * w * 0.2))
    // a tiny doodled heart, smudged
    x.fillStyle = ORBIT_PINK; x.font = `800 ${Math.round(w * 0.1)}px ${INTER}`; x.fillText('♡', w * 0.3, h * 0.36)
  }
  x.restore()
}
export function knockText(x, X, Y, text, t, t0, col = GOLD, size = 64) {
  const k = t - t0
  if (k < 0 || k > 1.0) return
  const s = k < 0.1 ? lerp(1.8, 1, k / 0.1) : 1
  x.save(); x.globalAlpha = 1 - clamp((k - 0.7) / 0.3); x.translate(X, Y - k * 40); x.rotate(-0.1); x.scale(s, s)
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'
  x.lineWidth = size * 0.2; x.strokeStyle = INK; x.strokeText(text, 0, 0); x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
