// st10leo kit: Leo's props
// (the toy crown, Aquarius's flashlight and its beam, stage-fright sweat, the applause). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

const INK = '#1b1236'
const r3 = v => +v.toFixed(3)

// the toy crown (starleo's crown, kid-sized). (cx, cy) = its base centre; lift = 0…1 held up high.
export function drawToyCrown(x, cx, cy, s, t, { dropped = false, lift = 0 } = {}) {
  const c = 8 * s
  x.save(); x.translate(Math.round(cx), Math.round(cy - lift * 60 - (lift ? 6 * Math.abs(Math.sin(t * 6)) : 0)))
  if (dropped) x.rotate(0.55)
  else x.rotate(0.06 * Math.sin(t * 2.5))
  x.fillStyle = INK; x.fillRect(-6 * c, -5 * c, 12 * c, 6 * c); x.fillRect(-6 * c, -8 * c, 3 * c, 4 * c); x.fillRect(-1.5 * c, -9 * c, 3 * c, 5 * c); x.fillRect(3 * c, -8 * c, 3 * c, 4 * c)
  x.fillStyle = '#f7c948'; x.fillRect(-5 * c, -4 * c, 10 * c, 4 * c); x.fillRect(-5 * c, -7 * c, 1 * c, 3 * c); x.fillRect(-0.5 * c, -8 * c, 1 * c, 4 * c); x.fillRect(4 * c, -7 * c, 1 * c, 3 * c)
  x.fillStyle = '#ff6a8a'; x.fillRect(-1 * c, -3 * c, 2 * c, 2 * c)
  x.fillStyle = '#7fe0ff'; x.fillRect(-4 * c, -3 * c, 1 * c, 1 * c); x.fillRect(3 * c, -3 * c, 1 * c, 1 * c)
  x.restore()
  if (lift > 0) for (let i = 0; i < 3; i++) drawPixelStar(x, cx + (i - 1) * 70, cy - 120 - 20 * Math.sin(t * 5 + i), 12, i % 2, '#f7c948', '#fff6d0')
}

// Aquarius's flashlight (a pixel torch), pointing along `angle`; sticker = the tiny ♌ on its side (rewatch bait)
export function drawFlashlight(x, cx, cy, t, { angle = 0, s = 1, sticker = true } = {}) {
  const c = 6 * s
  x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(angle)
  x.fillStyle = INK; x.fillRect(-10 * c, -3 * c, 16 * c, 6 * c); x.fillRect(5 * c, -4.5 * c, 5 * c, 9 * c)
  x.fillStyle = '#38c4ec'; x.fillRect(-9 * c, -2 * c, 14 * c, 4 * c)
  x.fillStyle = '#d9cdf0'; x.fillRect(6 * c, -3.5 * c, 3 * c, 7 * c)
  x.fillStyle = '#fff6d0'; x.fillRect(9 * c, -3 * c, 1 * c, 6 * c)
  if (sticker) { x.fillStyle = '#f39a3a'; x.fillRect(-5 * c, -1.5 * c, 3 * c, 3 * c); x.fillStyle = INK; x.fillRect(-4.5 * c, -0.5 * c, 2 * c, 1 * c) }
  x.restore()
}
// the beam: a soft additive wedge from `from` to `to`, w = the pool's half-width at `to`
export function flashBeam(x, t, { from, to, k = 1, w = 120 }) {
  if (k <= 0) return
  const [ax, ay] = from, [bx, by] = [lerp(from[0], to[0], ease.outCubic(k)), lerp(from[1], to[1], ease.outCubic(k))]
  const a = Math.atan2(by - ay, bx - ax), L = Math.hypot(bx - ax, by - ay)
  const flick = 0.92 + 0.08 * Math.sin(t * 23) * Math.sin(t * 7)
  x.save(); x.globalCompositeOperation = 'lighter'; x.translate(ax, ay); x.rotate(a)
  const g = x.createLinearGradient(0, 0, L, 0)
  g.addColorStop(0, `rgba(255,244,200,${0.5 * flick})`); g.addColorStop(1, `rgba(255,244,200,${0.18 * flick})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(0, -14); x.lineTo(L, -w); x.lineTo(L, w); x.lineTo(0, 14); x.closePath(); x.fill()
  const p = x.createRadialGradient(L, 0, 0, L, 0, w * 1.3)
  p.addColorStop(0, `rgba(255,244,200,${0.35 * flick})`); p.addColorStop(1, 'rgba(255,244,200,0)')
  x.fillStyle = p; x.fillRect(L - w * 1.3, -w * 1.3, w * 2.6, w * 2.6)
  x.restore()
}

// stage-fright sweat: pixel drops sliding off the star, plus three wobble lines
export function sweat(x, t, cx, cy, size) {
  const c = size / 36
  x.save()
  for (let i = 0; i < 3; i++) {
    const p = ((t * 0.9) + i / 3) % 1
    const sx = cx + (i - 1) * size * 0.32 + (i === 1 ? size * 0.42 : 0), sy = cy - size * 0.36 + p * size * 0.5
    x.globalAlpha = 1 - p
    x.fillStyle = '#9ad0ff'; x.fillRect(Math.round(sx), Math.round(sy), 2 * c, 3 * c); x.fillRect(Math.round(sx + 0.5 * c), Math.round(sy - c), c, c)
  }
  x.globalAlpha = 0.8; x.fillStyle = '#efe6d6'
  for (let i = 0; i < 3; i++) { const a = -2.2 + i * 0.35 + 0.06 * Math.sin(t * 30 + i); x.save(); x.translate(cx + Math.cos(a) * size * 0.62, cy + Math.sin(a) * size * 0.62); x.rotate(a); x.fillRect(0, -c / 2, 3 * c, c); x.restore() }
  for (let i = 0; i < 3; i++) { const a = -0.94 - i * 0.35 + 0.06 * Math.sin(t * 30 + i); x.save(); x.translate(cx + Math.cos(a) * size * 0.62, cy + Math.sin(a) * size * 0.62); x.rotate(a); x.fillRect(0, -c / 2, 3 * c, c); x.restore() }
  x.restore()
}

// the applause: "CLAP CLAP" crayon chips popping over the crowd + confetti pixels
export function applause(x, t, at) {
  const d = t - at
  if (d < 0) return
  x.save()
  const CH = [[220, 1500, 0], [820, 1470, 0.25], [520, 1560, 0.5], [340, 1430, 0.8], [700, 1420, 1.1]]
  x.font = "800 40px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (const [cx, cy, dl] of CH) {
    const k = easeOutBack(clamp(prog(d, dl, dl + 0.3)), 2)
    if (k <= 0) continue
    x.save(); x.translate(cx, cy - 10 * Math.sin((d - dl) * 6)); x.scale(k, k); x.rotate(0.08 * Math.sin(cx))
    x.fillStyle = INK; x.fillText('CLAP!', 3, 3); x.fillStyle = '#f2c75c'; x.fillText('CLAP!', 0, 0)
    x.restore()
  }
  const COL = ['#f2c75c', '#ff8fb1', '#7fe0ff', '#c9a6ff', '#f39a3a']
  for (let i = 0; i < 40; i++) {
    const sx = (i * 197) % 1080, fall = (d * (180 + (i % 5) * 40) + i * 37) % 1500
    x.fillStyle = COL[i % 5]; x.save(); x.translate(sx + 20 * Math.sin(d * 3 + i), 200 + fall); x.rotate(d * 4 + i); x.fillRect(-6, -4, 12, 8); x.restore()
  }
  x.restore()
}

// kid Aquarius's headphones (its season-6 prop: overwhelm, not distance), fitted to a star's returned { x, y, size, top }
export function drawHeadphones(x, r, size) {
  const c = size / 30, cx = r.x, cy = r.y - size * 0.06
  x.save(); x.lineWidth = 2.2 * c; x.strokeStyle = INK
  x.beginPath(); x.arc(cx, cy, size * 0.36, Math.PI * 1.08, Math.PI * 1.92); x.stroke()
  x.lineWidth = 1.2 * c; x.strokeStyle = '#d9cdf0'; x.beginPath(); x.arc(cx, cy, size * 0.36, Math.PI * 1.1, Math.PI * 1.9); x.stroke()
  for (const s of [-1, 1]) {
    const ex = cx + s * size * 0.36 * Math.cos(0.08 * Math.PI), ey = cy - size * 0.36 * Math.sin(0.08 * Math.PI)
    x.fillStyle = INK; x.fillRect(Math.round(ex - 2.6 * c), Math.round(ey - 1 * c), Math.round(5.2 * c), Math.round(6.2 * c))
    x.fillStyle = '#7fe0ff'; x.fillRect(Math.round(ex - 1.8 * c), Math.round(ey - 0.2 * c), Math.round(3.6 * c), Math.round(4.6 * c))
  }
  x.restore()
}

// the roar: pixel shout lines bursting out of the star
export function roarLines(x, t, cx, cy, size) {
  const c = size / 36
  x.save(); x.fillStyle = '#ffd36e'
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i - 3) * 0.32, d = size * (0.62 + 0.08 * Math.sin(t * 18 + i))
    x.save(); x.translate(cx + Math.cos(a) * d, cy + Math.sin(a) * d); x.rotate(a); x.fillRect(0, -c, 5 * c, 2 * c); x.restore()
  }
  x.restore()
}
