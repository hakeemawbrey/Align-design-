// venus · line-art illustrations (bold, friendly, thick glowing strokes, flat 20–40% fills, no faces).
// Every fn draws around (x, y) at scale s; t drives idle motion only, so every frame is a pure fn of t.
import { clamp, prog, ease, rng, mix } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { ELEMENT_COLOR, easeOutBack } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', ROSE = '#e8628a'
export const hexA = (hex, a) => hex + Math.round(clamp(a) * 255).toString(16).padStart(2, '0')
const TAU = Math.PI * 2

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(ctx, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = hexA(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}
export function begin(ctx, x, y, s, a = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a }
function halo(ctx, col, r, a = 0.3, cy = 0) {
  const g = ctx.createRadialGradient(0, cy, 10, 0, cy, r)
  g.addColorStop(0, hexA(col, a)); g.addColorStop(1, hexA(col, 0))
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, cy, r, 0, TAU); ctx.fill(); ctx.globalCompositeOperation = 'source-over'
}

/** a classic heart, ≈ s wide, cusp at y −0.2s, tip at y +0.5s */
export function heartPath(ctx, s, ox = 0, oy = 0) {
  ctx.beginPath()
  ctx.moveTo(ox, oy - 0.2 * s)
  ctx.bezierCurveTo(ox, oy - 0.46 * s, ox - 0.5 * s, oy - 0.46 * s, ox - 0.5 * s, oy - 0.14 * s)
  ctx.bezierCurveTo(ox - 0.5 * s, oy + 0.12 * s, ox - 0.16 * s, oy + 0.3 * s, ox, oy + 0.5 * s)
  ctx.bezierCurveTo(ox + 0.16 * s, oy + 0.3 * s, ox + 0.5 * s, oy + 0.12 * s, ox + 0.5 * s, oy - 0.14 * s)
  ctx.bezierCurveTo(ox + 0.5 * s, oy - 0.46 * s, ox, oy - 0.46 * s, ox, oy - 0.2 * s)
  ctx.closePath()
}

/** a chunky pixel heart (7×6 grid), centred on (x, y); px = cell size */
const PH = ['0110110', '1111111', '1111111', '0111110', '0011100', '0001000']
export function pixelHeart(ctx, x, y, px, col, a = 1) {
  if (a <= 0.003 || px <= 0.3) return
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = px * 1.6
  const x0 = Math.round(x - 3.5 * px), y0 = Math.round(y - 3 * px), p = Math.max(1, Math.round(px))
  for (let r = 0; r < 6; r++) for (let c = 0; c < 7; c++) if (PH[r][c] === '1') ctx.fillRect(x0 + c * p, y0 + r * p, p, p)
  ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(x0 + 1 * p, y0 + 1 * p, p, p)
  ctx.restore()
}

// ───────────────────────────────── FIRE: fireworks (rockets → ring / heart bursts)
/** fireworks: list of rockets { x, y (burst point), t (launch), r (burst radius), col, heart } */
export function fireworks(ctx, t, rockets, a = 1) {
  if (a <= 0.003) return
  ctx.save(); ctx.globalAlpha *= a
  for (const k of rockets) {
    const fly = 0.42, tt = t - k.t
    if (tt < 0) continue
    const x0 = k.x + (k.drift || 0), y0 = 1560
    if (tt < fly) {
      // the rocket: a bright head with a trail
      const p = ease.outQuad(tt / fly)
      const hx = x0 + (k.x - x0) * p, hy = y0 + (k.y - y0) * p
      const tp = Math.max(0, p - 0.22), tx = x0 + (k.x - x0) * tp, ty = y0 + (k.y - y0) * tp
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ink(ctx, k.col, { w: 6, fa: 0, glow: 16 })
      drawPixelStar(ctx, Math.round(hx), Math.round(hy), 14, 0, '#fff3e0')
      continue
    }
    const bt = tt - fly, life = k.heart ? 2.6 : 1.5
    if (bt > life) continue
    const e = ease.outCubic(clamp(bt / 0.55)), fade = 1 - ease.inQuad(clamp((bt - life * 0.45) / (life * 0.55)))
    const sag = 60 * bt * bt
    // flash
    if (bt < 0.25) { ctx.save(); ctx.translate(k.x, k.y); halo(ctx, k.col, k.r * 1.2, 0.5 * (1 - bt / 0.25)); ctx.restore() }
    const n = k.heart ? 28 : 16, R = rng(k.seed || 7)
    ctx.save(); ctx.globalAlpha *= fade
    for (let i = 0; i < n; i++) {
      let dx, dy
      if (k.heart) {
        const u = (i / n) * TAU
        dx = 16 * Math.sin(u) ** 3 / 16; dy = -(13 * Math.cos(u) - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(4 * u)) / 16
      } else { const an = (i / n) * TAU + R() * 0.2; dx = Math.cos(an); dy = Math.sin(an) }
      const px = k.x + dx * k.r * e, py = k.y + dy * k.r * e + sag
      const qx = k.x + dx * k.r * e * 0.72, qy = k.y + dy * k.r * e * 0.72 + sag * 0.8
      ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(px, py)
      ink(ctx, i % 3 === 0 ? GOLD : k.col, { w: k.heart ? 8 : 6, fa: 0, glow: 14 })
      if (i % 2 === 0) drawPixelStar(ctx, Math.round(px), Math.round(py), 10 + 4 * (i % 4 === 0), (i >> 1) % 3, i % 4 ? '#fff3e0' : k.col)
    }
    ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────────────── EARTH: a gift box + a fresh loaf
/** gift box; lid 0–1 lifts the lid (hovering above), sq squash on landing */
export function giftBox(ctx, x, y, s, t, { a = 1, lid = 0, sq = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.earth
  begin(ctx, x, y, s, a)
  ctx.scale(1 + sq * 0.12, 1 - sq * 0.12)
  halo(ctx, col, 260, 0.22, 20)
  // body
  ctx.beginPath(); ctx.roundRect(-130, -30, 260, 190, 16); ink(ctx, col, { w: 8, fa: 0.3 })
  ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, 160); ink(ctx, ROSE, { w: 22, fa: 0, glow: 8 })
  // lid (lifts, tilts a little, bobs)
  const ly = -lid * 270 + (lid > 0.5 ? 8 * Math.sin(t * 5) : 0), lr = lid * 0.16 * Math.sin(t * 3.2)
  ctx.save(); ctx.translate(0, ly - 30); ctx.rotate(lr)
  ctx.beginPath(); ctx.roundRect(-150, -56, 300, 56, 14); ink(ctx, col, { w: 8, fa: 0.4 })
  ctx.beginPath(); ctx.moveTo(0, -56); ctx.lineTo(0, 0); ink(ctx, ROSE, { w: 22, fa: 0, glow: 8 })
  // bow: two loops + tails
  ctx.beginPath(); ctx.ellipse(-46, -84, 46, 26, -0.35, 0, TAU); ink(ctx, ROSE, { w: 8, fa: 0.35 })
  ctx.beginPath(); ctx.ellipse(46, -84, 46, 26, 0.35, 0, TAU); ink(ctx, ROSE, { w: 8, fa: 0.35 })
  ctx.beginPath(); ctx.arc(0, -70, 14, 0, TAU); ink(ctx, ROSE, { w: 6, fa: 0.8 })
  ctx.restore()
  ctx.restore()
}
/** a fresh loaf with steam curls */
export function bread(ctx, x, y, s, t, { a = 1, steam = 1 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const crust = '#f29a4a'
  begin(ctx, x, y, s, a)
  halo(ctx, crust, 200, 0.18)
  ctx.beginPath(); ctx.moveTo(-130, 50)
  ctx.bezierCurveTo(-150, -50, -80, -80, 0, -80); ctx.bezierCurveTo(80, -80, 150, -50, 130, 50); ctx.closePath()
  ink(ctx, crust, { w: 8, fa: 0.32 })
  ctx.beginPath(); for (const sx of [-60, 0, 60]) { ctx.moveTo(sx - 22, -30); ctx.lineTo(sx + 22, -58) } ink(ctx, mix(crust, '#ffffff', 0.45), { w: 6, fa: 0, glow: 8 })
  ctx.beginPath(); ctx.moveTo(-160, 50); ctx.lineTo(160, 50); ink(ctx, crust, { w: 8, fa: 0 })
  // steam: three wavy rising lines
  if (steam > 0) {
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.9 + i / 3) % 1, sx = -50 + i * 50
      ctx.save(); ctx.globalAlpha *= steam * Math.sin(Math.PI * ph) * 0.9
      ctx.beginPath()
      for (let k = 0; k <= 16; k++) { const u = k / 16, yy = -100 - u * 120 - ph * 50; const xx = sx + 14 * Math.sin(u * 7 + t * 4 + i); k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy) }
      ink(ctx, BONE, { w: 6, fa: 0, glow: 10 }); ctx.restore()
    }
  }
  ctx.restore()
}

// ───────────────────────────────── AIR: chat bubbles
/** a speech bubble (w×h, tail left or right); content: 'dots' | 'heart' | 'bang' */
export function bubble(ctx, x, y, s, t, { a = 1, col, w = 360, h = 210, tail = 'left', content = 'dots', rot = 0, beat = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a, rot)
  halo(ctx, col, w * 0.75, 0.2)
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 60)
  ink(ctx, col, { w: 9, fa: 0.26 })
  const sx = tail === 'left' ? -w * 0.22 : w * 0.22, dir = tail === 'left' ? -1 : 1
  ctx.beginPath(); ctx.moveTo(sx - 30 * dir, h / 2 - 4); ctx.lineTo(sx + 40 * dir, h / 2 + 70); ctx.lineTo(sx + 34 * dir, h / 2 - 4)
  ctx.fillStyle = hexA(col, 0.26); ctx.fill(); ink(ctx, col, { w: 9, fa: 0 })
  if (content === 'dots') {
    for (let i = 0; i < 3; i++) {
      const b = Math.max(0, Math.sin(t * 9 - i * 0.9))
      ctx.beginPath(); ctx.arc(-80 + i * 80, -18 * b, 22, 0, TAU); ink(ctx, BONE, { w: 5, fa: 0.9, fill: BONE, glow: 10 })
    }
  } else if (content === 'heart') {
    const k = 1 + 0.14 * beat
    ctx.save(); ctx.scale(k, k); heartPath(ctx, 150, 0, 6); ink(ctx, ROSE, { w: 8, fa: 0.55 }); ctx.restore()
  } else if (content === 'bang') {
    ctx.font = "800 120px Inter, 'Helvetica Neue', Arial, sans-serif"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = BONE; ctx.shadowColor = col; ctx.shadowBlur = 16; ctx.fillText('!!', 0, 6); ctx.shadowBlur = 0
  }
  ctx.restore()
}

// ───────────────────────────────── WATER: a heart-shaped ocean wave
/** a heart of sea water: fill 0–1 raises the water level, slosh tilts the surface */
export function waveHeart(ctx, x, y, s, t, { a = 1, fill = 1, slosh = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.water, deep = '#2a55c8', foam = '#cfe6ff'
  const S = 560
  begin(ctx, x, y, s, a, 0.05 * Math.sin(t * 1.6) * (1 + slosh))
  halo(ctx, col, 420, 0.3, 40)
  heartPath(ctx, S)
  ctx.save(); ctx.clip()
  ctx.fillStyle = hexA(col, 0.12); ctx.fillRect(-S, -S, 2 * S, 2 * S)
  // water level from the tip (0.5S) up to above the lobes (−0.3S)
  const lvl = 0.5 * S - fill * 0.86 * S
  const tilt = 40 * Math.sin(t * 2.1) * (0.5 + slosh)
  const surf = (u, amp, ph, f) => lvl + tilt * u + amp * Math.sin(u * f + t * 3.2 + ph)
  const layer = (amp, ph, f, colr, fa, off) => {
    ctx.beginPath(); ctx.moveTo(-S, S)
    for (let k = 0; k <= 40; k++) { const u = -1 + 2 * k / 40; ctx.lineTo(u * S * 0.6, surf(u, amp, ph, f) + off) }
    ctx.lineTo(S, S); ctx.closePath()
    ctx.fillStyle = hexA(colr, fa); ctx.fill()
  }
  layer(22, 0, 5, col, 0.38, 0)
  layer(18, 2.1, 6.5, deep, 0.4, 70)
  layer(14, 4.2, 8, deep, 0.45, 150)
  // foam crest along the top surface
  ctx.beginPath()
  for (let k = 0; k <= 40; k++) { const u = -1 + 2 * k / 40; const yy = surf(u, 22, 0, 5); k ? ctx.lineTo(u * S * 0.6, yy) : ctx.moveTo(u * S * 0.6, yy) }
  ink(ctx, foam, { w: 7, fa: 0, glow: 12 })
  // rising bubbles
  const R = rng(33)
  for (let i = 0; i < 9; i++) {
    const bx = (R() - 0.5) * S * 0.6, sp = 0.35 + R() * 0.4, ph = (t * sp + R()) % 1
    const by = 0.45 * S - ph * (0.45 * S - lvl), br = 6 + R() * 10
    if (by < lvl + 10) continue
    ctx.beginPath(); ctx.arc(bx + 8 * Math.sin(t * 3 + i), by, br, 0, TAU); ink(ctx, foam, { w: 3, fa: 0.2, glow: 6 })
  }
  ctx.restore()
  heartPath(ctx, S); ink(ctx, '#5f95ff', { w: 9, fa: 0, glow: 26 })
  // a curling crest on the left lobe (the "wave")
  if (fill > 0.6) {
    const k = clamp((fill - 0.6) / 0.4)
    ctx.save(); ctx.globalAlpha *= k
    ctx.beginPath(); ctx.moveTo(-0.42 * S, -0.02 * S); ctx.quadraticCurveTo(-0.5 * S, -0.3 * S, -0.27 * S, -0.34 * S); ctx.quadraticCurveTo(-0.12 * S, -0.34 * S, -0.16 * S, -0.22 * S)
    ctx.quadraticCurveTo(-0.22 * S, -0.16 * S, -0.28 * S, -0.22 * S)
    ink(ctx, foam, { w: 8, fa: 0, glow: 14 })
    ctx.restore()
  }
  ctx.restore()
}
/** splash droplets thrown up from (x, y); p 0–1 */
export function splash(ctx, x, y, p, spread = 1) {
  if (p <= 0 || p >= 1) return
  ctx.save(); ctx.globalAlpha *= 1 - p
  for (let i = 0; i < 8; i++) {
    const an = Math.PI + 0.15 + (i / 7) * (Math.PI - 0.3), d = (40 + 170 * p) * spread
    ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d * 0.9 + 260 * p * p, 11 * (1 - p * 0.5), 0, TAU)
    ink(ctx, '#5f95ff', { w: 4, fa: 0.7, fill: '#8fb8ff', glow: 10 })
  }
  ctx.restore()
}

export { easeOutBack, prog }
