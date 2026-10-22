// dummies part c · line-art illustrations (bold, friendly, thick glowing strokes, flat 20–40% fills, no faces).
// Every draw fn takes a canvas ctx and draws around (x, y) at scale s; time t drives idle wobble only (pure fn of t).
import { mix } from '../../../../src/lib.js'
import { ELEMENT_COLOR } from '../../../wheel.js'

export const BONE = '#efe6d6'
const VS = '︎'
const hexA = (hex, a) => hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0')

/** fill the current path at fa, then stroke it thick with a glow */
function ink(ctx, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = hexA(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}
function begin(ctx, x, y, s, a = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a }

// ───────────────────────── element icons (≈ 260 px tall at s 1)
function flamePath(ctx, w, h, wob) {
  ctx.beginPath()
  ctx.moveTo(0, h * 0.42)
  ctx.bezierCurveTo(-w * 0.62, h * 0.42, -w * 0.64, -h * 0.02, -w * 0.3, -h * 0.24)
  ctx.bezierCurveTo(-w * 0.16, -h * 0.33, -w * 0.06 + wob * 0.3, -h * 0.42, wob, -h * 0.6)
  ctx.bezierCurveTo(w * 0.22 + wob * 0.3, -h * 0.38, w * 0.64, -h * 0.2, w * 0.56, h * 0.12)
  ctx.bezierCurveTo(w * 0.5, h * 0.36, w * 0.26, h * 0.42, 0, h * 0.42)
  ctx.closePath()
}
/** a flame; roar 0–1 makes it flicker harder and lean (as if blown from the left) */
export function flame(ctx, x, y, s, t, { a = 1, roar = 0, seed = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.fire
  const f = 9 + 8 * roar
  const wob = 14 * Math.sin(t * f + seed) + 6 * Math.sin(t * f * 1.7 + seed * 2) + 40 * roar
  const sq = 1 + (0.04 + 0.05 * roar) * Math.sin(t * f * 1.3 + seed)
  begin(ctx, x, y, s, a)
  ctx.scale(1 / sq, sq)
  // outer glow blob
  const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 220)
  g.addColorStop(0, hexA(col, 0.35 + 0.2 * roar)); g.addColorStop(1, hexA(col, 0))
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -10, 220, 0, Math.PI * 2); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  flamePath(ctx, 200, 270, wob); ink(ctx, col, { w: 8, fa: 0.3 })
  ctx.translate(0, 52); flamePath(ctx, 96, 140, wob * 0.6); ink(ctx, '#ffc861', { w: 6, fa: 0.45, glow: 12 })
  ctx.restore()
}

/** a mountain; sprout 0–1 grows a stem with leaves from the main peak, bloom 0–1 opens a flower on top */
export function mountain(ctx, x, y, s, t, { a = 1, sprout = 0.35, bloom = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.earth
  begin(ctx, x, y, s, a)
  ctx.beginPath(); ctx.moveTo(-170, 100); ctx.lineTo(-55, -40); ctx.lineTo(-10, 10); ctx.lineTo(60, -95); ctx.lineTo(175, 100); ctx.closePath()
  ink(ctx, col, { w: 8, fa: 0.3 })
  // snowy ridge line
  ctx.beginPath(); ctx.moveTo(30, -50); ctx.lineTo(60, -95); ctx.lineTo(90, -50); ink(ctx, mix(col, '#ffffff', 0.5), { w: 6, fa: 0, glow: 8 })
  ctx.beginPath(); ctx.moveTo(-200, 100); ctx.lineTo(205, 100); ink(ctx, col, { w: 8, fa: 0 })
  if (sprout > 0.01) {
    const green = '#5fdc7a', top = -95, hgt = 170 * sprout, sw = 6 * Math.sin(t * 2.4) * sprout
    ctx.beginPath(); ctx.moveTo(60, top); ctx.quadraticCurveTo(60 + 22, top - hgt * 0.5, 60 + sw, top - hgt)
    ink(ctx, green, { w: 7, fa: 0 })
    const leaf = (lx, ly, ang, L) => { ctx.save(); ctx.translate(lx, ly); ctx.rotate(ang); ctx.beginPath(); ctx.ellipse(L * 0.5, 0, L * 0.5, L * 0.22, 0, 0, Math.PI * 2); ink(ctx, green, { w: 5, fa: 0.4, glow: 10 }); ctx.restore() }
    const L = 70 * Math.min(1, sprout * 1.4)
    leaf(66, top - hgt * 0.45, -0.6, L); leaf(70, top - hgt * 0.62, Math.PI + 0.5, L * 0.85)
    if (bloom > 0.01) {
      const fx = 60 + sw, fy = top - hgt
      ctx.save(); ctx.translate(fx, fy); ctx.scale(bloom, bloom); ctx.rotate(t * 0.6)
      for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; ctx.beginPath(); ctx.ellipse(Math.cos(an) * 26, Math.sin(an) * 26, 22, 14, an, 0, Math.PI * 2); ink(ctx, '#ff7fb0', { w: 5, fa: 0.45, glow: 12 }) }
      ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ink(ctx, '#f2c75c', { w: 5, fa: 0.8, glow: 12 })
      ctx.restore()
    }
  }
  ctx.restore()
}

/** a wind swirl (three curled gust lines) */
export function wind(ctx, x, y, s, t, { a = 1, puff = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.air
  begin(ctx, x + 8 * Math.sin(t * 2.2), y, s * (1 + 0.08 * puff), a)
  const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 200)
  g.addColorStop(0, hexA(col, 0.22)); g.addColorStop(1, hexA(col, 0))
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 200, 0, Math.PI * 2); ctx.fill(); ctx.globalCompositeOperation = 'source-over'
  const w = 6 * Math.sin(t * 3)
  ctx.beginPath(); ctx.moveTo(-160, -55 + w * 0.3); ctx.lineTo(60, -55); ctx.arc(60, -95, 40, Math.PI / 2, Math.PI / 2 - 1.6 * Math.PI, true); ink(ctx, col, { w: 9, fa: 0 })
  ctx.beginPath(); ctx.moveTo(-190, 10 - w * 0.3); ctx.lineTo(115, 10); ctx.arc(115, -22, 32, Math.PI / 2, Math.PI / 2 - 1.5 * Math.PI, true); ink(ctx, col, { w: 9, fa: 0 })
  ctx.beginPath(); ctx.moveTo(-140, 75 + w * 0.3); ctx.lineTo(30, 75); ctx.arc(30, 108, 33, -Math.PI / 2, -Math.PI / 2 + 1.5 * Math.PI); ink(ctx, col, { w: 9, fa: 0 })
  ctx.restore()
}

/** gust streaks flowing from (x0,y) to (x1,y) */
export function gusts(ctx, x0, x1, y, t, a) {
  if (a <= 0.003) return
  const col = ELEMENT_COLOR.air
  ctx.save(); ctx.globalAlpha *= a
  for (let i = 0; i < 4; i++) {
    const yy = y - 90 + i * 60, ph = i * 1.3
    ctx.beginPath()
    for (let k = 0; k <= 24; k++) { const u = k / 24, xx = x0 + (x1 - x0) * u; const v = yy + 16 * Math.sin(u * 7 + t * 9 + ph); k ? ctx.lineTo(xx, v) : ctx.moveTo(xx, v) }
    ctx.setLineDash([70, 50]); ctx.lineDashOffset = -t * 520 - i * 40
    ink(ctx, col, { w: 6, fa: 0, glow: 14 })
  }
  ctx.restore()
}

function dropPath(ctx) {
  ctx.beginPath(); ctx.moveTo(0, -130)
  ctx.bezierCurveTo(40, -70, 92, -12, 92, 38); ctx.arc(0, 38, 92, 0, Math.PI); ctx.bezierCurveTo(-92, -12, -40, -70, 0, -130); ctx.closePath()
}
/** a water drop (stretch > 1 elongates it while falling) */
export function drop(ctx, x, y, s, t, { a = 1, stretch = 1 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.water
  begin(ctx, x, y + 4 * Math.sin(t * 2.6), s, a)
  ctx.scale(1 / Math.sqrt(stretch), stretch)
  dropPath(ctx); ink(ctx, '#5f95ff', { w: 8, fa: 0.32, fill: col })
  ctx.beginPath(); ctx.arc(-6, 40, 56, Math.PI * 1.05, Math.PI * 1.45); ink(ctx, '#cfe0ff', { w: 7, fa: 0, glow: 10 })
  ctx.restore()
}
/** a splash ring of little droplets at (x, y), p 0–1 */
export function splash(ctx, x, y, p) {
  if (p <= 0 || p >= 1) return
  ctx.save(); ctx.globalAlpha *= 1 - p
  for (let i = 0; i < 7; i++) {
    const an = Math.PI + (i / 6) * Math.PI, d = 30 + 110 * p
    ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d * 0.7 + 60 * p * p, 9 * (1 - p * 0.5), 0, Math.PI * 2)
    ink(ctx, '#5f95ff', { w: 4, fa: 0.6, fill: '#5f95ff', glow: 10 })
  }
  ctx.restore()
}

// ───────────────────────── Q7 timeline of sky-watching (≈ 260 px tall)
export function tablet(ctx, x, y, s, t, a = 1) {
  const col = '#d9a86c'
  begin(ctx, x, y, s, a, -0.08)
  ctx.beginPath(); ctx.roundRect(-95, -125, 190, 250, 34); ink(ctx, col, { w: 8, fa: 0.3 })
  // star marks + wedge rows
  const star = (sx, sy, r) => { ctx.beginPath(); for (let k = 0; k < 4; k++) { const an = k * Math.PI / 4; ctx.moveTo(sx - Math.cos(an) * r, sy - Math.sin(an) * r); ctx.lineTo(sx + Math.cos(an) * r, sy + Math.sin(an) * r) } ink(ctx, mix(col, '#ffffff', 0.35), { w: 5, fa: 0, glow: 8 }) }
  star(-45, -70, 20); star(20, -85, 14); star(50, -40, 18)
  ctx.beginPath(); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const wx = -55 + c * 36, wy = 10 + r * 34; ctx.moveTo(wx, wy); ctx.lineTo(wx + 18, wy + 10); ctx.moveTo(wx, wy); ctx.lineTo(wx, wy + 20) }
  ink(ctx, col, { w: 5, fa: 0, glow: 6 })
  ctx.restore()
}
export function stones(ctx, x, y, s, t, a = 1) {
  const col = '#c9c2d8'
  begin(ctx, x, y, s, a)
  // the rising Sun behind the middle arch (solstice sunrise)
  const sg = ctx.createRadialGradient(0, 30, 10, 0, 30, 170); sg.addColorStop(0, 'rgba(242,199,92,0.55)'); sg.addColorStop(1, 'rgba(242,199,92,0)')
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = sg; ctx.fillRect(-180, -140, 360, 260); ctx.globalCompositeOperation = 'source-over'
  ctx.beginPath(); ctx.arc(0, 50, 46, Math.PI, 0); ink(ctx, '#f2c75c', { w: 6, fa: 0.5 })
  const arch = (ax, sc) => {
    ctx.save(); ctx.translate(ax, 0); ctx.scale(sc, sc)
    ctx.beginPath(); ctx.roundRect(-62, -70, 34, 150, 8); ink(ctx, col, { w: 7, fa: 0.35 })
    ctx.beginPath(); ctx.roundRect(28, -70, 34, 150, 8); ink(ctx, col, { w: 7, fa: 0.35 })
    ctx.beginPath(); ctx.roundRect(-74, -104, 148, 32, 8); ink(ctx, col, { w: 7, fa: 0.35 })
    ctx.restore()
  }
  arch(-125, 0.78); arch(125, 0.78); arch(0, 1)
  ctx.beginPath(); ctx.moveTo(-200, 82); ctx.lineTo(200, 82); ink(ctx, col, { w: 7, fa: 0 })
  ctx.restore()
}
export function astrolabe(ctx, x, y, s, t, a = 1) {
  const col = '#f2c75c'
  begin(ctx, x, y, s, a)
  ctx.beginPath(); ctx.arc(0, -128, 18, 0, Math.PI * 2); ink(ctx, col, { w: 6, fa: 0 })
  ctx.beginPath(); ctx.arc(0, 0, 112, 0, Math.PI * 2); ink(ctx, col, { w: 8, fa: 0.22 })
  ctx.beginPath(); ctx.arc(0, 0, 84, 0, Math.PI * 2); ink(ctx, col, { w: 5, fa: 0 })
  ctx.beginPath(); for (let k = 0; k < 24; k++) { const an = k * Math.PI / 12; ctx.moveTo(Math.cos(an) * 92, Math.sin(an) * 92); ctx.lineTo(Math.cos(an) * 106, Math.sin(an) * 106) } ink(ctx, col, { w: 4, fa: 0, glow: 6 })
  ctx.save(); ctx.rotate(t * 0.5)
  ctx.beginPath(); ctx.arc(0, -22, 52, 0, Math.PI * 2); ink(ctx, mix(col, '#ffffff', 0.3), { w: 5, fa: 0, glow: 10 })
  ctx.restore()
  ctx.save(); ctx.rotate(-0.7 + t * 0.25)
  ctx.beginPath(); ctx.moveTo(-104, 0); ctx.lineTo(104, 0); ink(ctx, col, { w: 7, fa: 0 })
  ctx.restore()
  ctx.beginPath(); ctx.arc(0, 0, 9, 0, Math.PI * 2); ink(ctx, col, { w: 5, fa: 1 })
  ctx.restore()
}
export function phone(ctx, x, y, s, t, a = 1) {
  const col = BONE
  begin(ctx, x, y, s, a)
  ctx.beginPath(); ctx.roundRect(-80, -140, 160, 280, 30); ink(ctx, col, { w: 8, fa: 0.12, fill: '#6a4fc2' })
  ctx.beginPath(); ctx.moveTo(-20, -122); ctx.lineTo(20, -122); ink(ctx, col, { w: 6, fa: 0 })
  // a little constellation on the screen, with a twinkle
  const P = [[-45, -70], [-10, -40], [30, -60], [45, -10], [5, 25], [-35, 55], [30, 80]]
  ctx.beginPath(); P.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ink(ctx, '#8fd8f6', { w: 4, fa: 0, glow: 10 })
  P.forEach(([px, py], i) => { ctx.beginPath(); ctx.arc(px, py, 7 + 2 * Math.sin(t * 4 + i), 0, Math.PI * 2); ink(ctx, '#fff3e0', { w: 3, fa: 1, fill: '#fff3e0', glow: 14 }) })
  ctx.restore()
}

// ───────────────────────── Q7 clothes rack
export function rack(ctx, x0, x1, y, yb, a = 1) {
  if (a <= 0.003) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.beginPath(); ctx.moveTo(x0, yb); ctx.lineTo(x0, y); ctx.lineTo(x1, y); ctx.lineTo(x1, yb)
  ctx.moveTo(x0 - 60, yb); ctx.lineTo(x0 + 60, yb); ctx.moveTo(x1 - 60, yb); ctx.lineTo(x1 + 60, yb)
  ink(ctx, BONE, { w: 9, fa: 0, glow: 14 })
  ctx.restore()
}
/** a hanger + T-shirt with a sign glyph, hung from (x, y) on the rail; sw = swing angle (rad) */
export function shirt(ctx, x, y, s, { a = 1, sw = 0, col, glyph, lift = 0 }) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a, sw)
  // hanger
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 14, 14, -Math.PI / 2, Math.PI * 0.6, false); ink(ctx, BONE, { w: 5, fa: 0, glow: 8 })
  ctx.beginPath(); ctx.moveTo(0, 28); ctx.lineTo(-80, 66); ctx.lineTo(80, 66); ctx.closePath(); ink(ctx, BONE, { w: 5, fa: 0, glow: 8 })
  ctx.translate(0, 58 - lift)
  ctx.beginPath()
  ctx.moveTo(-34, 0); ctx.lineTo(-78, 12); ctx.lineTo(-118, 54); ctx.lineTo(-90, 86); ctx.lineTo(-66, 66); ctx.lineTo(-66, 196)
  ctx.lineTo(66, 196); ctx.lineTo(66, 66); ctx.lineTo(90, 86); ctx.lineTo(118, 54); ctx.lineTo(78, 12); ctx.lineTo(34, 0)
  ctx.quadraticCurveTo(0, 30, -34, 0); ctx.closePath()
  ink(ctx, col, { w: 7, fa: 0.34 })
  ctx.font = "bold 92px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.shadowColor = col; ctx.shadowBlur = 16; ctx.fillStyle = mix(col, '#ffffff', 0.25); ctx.fillText(glyph + VS, 0, 112)
  ctx.restore()
}
/** a gold check mark drawn in progressively (p 0–1) */
export function check(ctx, x, y, s, p) {
  if (p <= 0) return
  begin(ctx, x, y, s, 1)
  ctx.beginPath(); ctx.arc(0, 0, 62, 0, Math.PI * 2); ink(ctx, '#f2c75c', { w: 7, fa: 0.25 * Math.min(1, p * 2) })
  const L1 = 46, L2 = 80, tot = L1 + L2, d = tot * Math.min(1, p)
  ctx.beginPath(); ctx.moveTo(-30, 2)
  const e1 = Math.min(d, L1) / L1; ctx.lineTo(-30 + 22 * e1, 2 + 26 * e1)
  if (d > L1) { const e2 = (d - L1) / L2; ctx.lineTo(-8 + 44 * e2, 28 - 56 * e2) }
  ink(ctx, '#fff3e0', { w: 10, fa: 0, glow: 18 })
  ctx.restore()
}

// ───────────────────────── end: graduation cap (spin = flip angle; rot = roll)
export function cap(ctx, x, y, s, { rot = 0, spin = 0, a = 1 } = {}) {
  if (a <= 0.003) return
  begin(ctx, x, y, s, a, rot)
  ctx.scale(Math.max(0.12, Math.abs(Math.cos(spin))), 1)
  // skull cap
  ctx.beginPath(); ctx.moveTo(-74, 8); ctx.lineTo(-74, 58); ctx.quadraticCurveTo(0, 86, 74, 58); ctx.lineTo(74, 8); ctx.closePath()
  ink(ctx, BONE, { w: 7, fa: 0.5, fill: '#2a1a56' })
  // board
  ctx.beginPath(); ctx.moveTo(0, -62); ctx.lineTo(142, -10); ctx.lineTo(0, 40); ctx.lineTo(-142, -10); ctx.closePath()
  ink(ctx, BONE, { w: 8, fa: 0.6, fill: '#2a1a56' })
  // button + tassel
  ctx.beginPath(); ctx.arc(0, -11, 9, 0, Math.PI * 2); ink(ctx, '#f2c75c', { w: 4, fa: 1 })
  const sw = 10 * Math.sin(rot * 3 + spin)
  ctx.beginPath(); ctx.moveTo(0, -11); ctx.quadraticCurveTo(70, -20, 112, -4); ctx.lineTo(112 + sw * 0.3, 70); ink(ctx, '#f2c75c', { w: 6, fa: 0 })
  ctx.beginPath(); ctx.moveTo(112 + sw * 0.3, 66); ctx.lineTo(100 + sw, 108); ctx.lineTo(124 + sw, 108); ctx.closePath(); ink(ctx, '#f2c75c', { w: 5, fa: 0.8 })
  ctx.restore()
}
