// htxweather · line-art props: sun, rain cloud, rain, an umbrella pictogram that opens/closes, a generic skyline,
// a plain pictogram person, an orb. Bold, friendly, thick glowing strokes over flat fills; no faces, no logos.
// Every draw fn is a pure function of its arguments (t only drives idle wobble).
import { clamp, lerp, rng, noise1 } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', BLUE = '#8fd8f6', ROSE = '#f59cc4', VIOLET = '#c9a6ff', SUN = '#ffc93c', SILVER = '#e3ecff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
const TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
export const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(ctx, col, { w = 8, fa = 0.3, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = rgba(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}

// ───────────────────────── pixel-star sparkle burst
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(ctx, x, y, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  ctx.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  ctx.restore()
}

// ───────────────────────── the sun (≈ 300 px across at s 1): flat disc, chunky rays that spin
export function sun(ctx, x, y, s, t, { a = 1, sq = 1 } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s / sq, s * sq); ctx.globalAlpha *= a
  // warm halo
  const g = ctx.createRadialGradient(0, 0, 60, 0, 0, 260)
  g.addColorStop(0, rgba(SUN, 0.35)); g.addColorStop(1, rgba(SUN, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 260, 0, TAU); ctx.fill()
  ctx.save(); ctx.rotate(t * 0.9)
  for (let i = 0; i < 10; i++) {
    const a0 = i * TAU / 10, L = i % 2 ? 46 : 64, r0 = 116 + 6 * Math.sin(t * 6 + i)
    ctx.beginPath(); ctx.moveTo(Math.cos(a0) * r0, Math.sin(a0) * r0); ctx.lineTo(Math.cos(a0) * (r0 + L), Math.sin(a0) * (r0 + L))
    ink(ctx, SUN, { w: 16, fa: 0, glow: 18 })
  }
  ctx.restore()
  ctx.beginPath(); ctx.arc(0, 0, 92, 0, TAU); ink(ctx, SUN, { w: 10, fa: 0.85, glow: 34, fill: '#ffb627' })
  ctx.beginPath(); ctx.arc(-24, -26, 40, Math.PI * 1.05, Math.PI * 1.6); ctx.strokeStyle = rgba('#fff6d8', 0.8); ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.stroke()
  ctx.restore()
}

// ───────────────────────── a fat rain cloud (≈ 380 wide at s 1, centred on its belly)
export function cloud(ctx, x, y, s, t, { a = 1, sq = 1 } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s / sq, s * sq); ctx.globalAlpha *= a
  const puff = k => 1 + 0.03 * Math.sin(t * 5 + k)
  ctx.beginPath()
  ctx.moveTo(-170, 60)
  ctx.arc(-120, 18, 62 * puff(0), Math.PI * 0.75, Math.PI * 1.55)
  ctx.arc(-30, -40, 92 * puff(1), Math.PI * 1.1, Math.PI * 1.85)
  ctx.arc(80, -24, 76 * puff(2), Math.PI * 1.25, Math.PI * 1.98)
  ctx.arc(140, 24, 52 * puff(3), Math.PI * 1.5, Math.PI * 0.4)
  ctx.lineTo(-170, 76)
  ctx.closePath()
  ink(ctx, '#b9c6ec', { w: 10, fa: 0.7, glow: 24, fill: '#3e4a7c' })
  ctx.beginPath(); ctx.arc(-30, -40, 66, Math.PI * 1.2, Math.PI * 1.55); ctx.strokeStyle = rgba('#ffffff', 0.45); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.stroke()
  ctx.restore()
}

// ───────────────────────── rain: N streaks falling from a cloud belly (x0..x1 at yTop) to a floor fn(x) → y
const DROPS = (() => { const r = rng(17), out = []; for (let i = 0; i < 46; i++) out.push({ u: r(), ph: r(), v: 1700 + r() * 500, len: 34 + r() * 26 }); return out })()
export function rain(ctx, cx, yTop, half, t, k, floor, { onHit = null } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = BLUE; ctx.shadowColor = BLUE; ctx.shadowBlur = 10; ctx.lineWidth = 7
  for (const d of DROPS) {
    const x = cx - half + d.u * half * 2 - 0.12 * 0, fy = floor(x)
    const L = fy - yTop
    if (L <= 0) continue
    const y = yTop + ((t * d.v + d.ph * 3000) % (L + 200))
    if (y - d.len > fy) { if (onHit && y - fy < 120) onHit(x, fy, (y - fy) / 120); continue }
    const y1 = Math.min(fy, y)
    ctx.globalAlpha = k * 0.95
    ctx.beginPath(); ctx.moveTo(x + 6, Math.max(yTop, y - d.len)); ctx.lineTo(x, y1); ctx.stroke()
  }
  ctx.restore()
}

// ───────────────────────── a generic night skyline (no real tower shapes, no logos), low and wide
const TOWERS = [
  { x: 40, w: 100, h: 230, top: 'flat' }, { x: 145, w: 92, h: 330, top: 'slant' }, { x: 248, w: 112, h: 420, top: 'step' },
  { x: 360, w: 96, h: 520, top: 'spire' }, { x: 478, w: 128, h: 600, top: 'pyramid' }, { x: 600, w: 106, h: 470, top: 'flat' },
  { x: 705, w: 92, h: 560, top: 'slant2' }, { x: 812, w: 116, h: 390, top: 'step' }, { x: 925, w: 100, h: 300, top: 'spire' },
  { x: 1035, w: 104, h: 230, top: 'flat' },
]
const WIN = TOWERS.map((b, i) => {
  const r = rng(40 + i), out = []
  const cols = Math.max(2, Math.floor((b.w - 30) / 24)), rows = Math.floor((b.h - 70) / 34)
  for (let rr = 0; rr < rows; rr++) for (let c = 0; c < cols; c++) if (r() < 0.42) out.push({ c, rr, cols, seed: r() * 100, gold: r() < 0.8 })
  return out
})
function towerPath(ctx, b, h) {
  const l = b.x - b.w / 2, r = b.x + b.w / 2, y = -h
  ctx.beginPath(); ctx.moveTo(l, 0)
  switch (b.top) {
    case 'slant': ctx.lineTo(l, y + 40); ctx.lineTo(r, y); break
    case 'slant2': ctx.lineTo(l, y); ctx.lineTo(r, y + 50); break
    case 'step': ctx.lineTo(l, y + 50); ctx.lineTo(l + b.w * 0.2, y + 50); ctx.lineTo(l + b.w * 0.2, y); ctx.lineTo(r - b.w * 0.2, y); ctx.lineTo(r - b.w * 0.2, y + 50); ctx.lineTo(r, y + 50); break
    case 'spire': ctx.lineTo(l, y + 30); ctx.lineTo(b.x - 10, y + 10); ctx.lineTo(b.x, y - 60); ctx.lineTo(b.x + 10, y + 10); ctx.lineTo(r, y + 30); break
    case 'pyramid': ctx.lineTo(l, y + 60); ctx.lineTo(b.x, y - 20); ctx.lineTo(r, y + 60); break
    default: ctx.lineTo(l, y); ctx.lineTo(r, y)
  }
  ctx.lineTo(r, 0); ctx.closePath()
}
/** skyline on baseY; k(j) 0..1 springs each tower up; wet 0..1 tints it rainy-blue, sunny 0..1 warms the glow */
export function skyline(ctx, t, baseY, k = () => 1, { a = 1, sunny = 0 } = {}) {
  if (a <= 0) return
  ctx.save(); ctx.translate(0, baseY); ctx.globalAlpha = a
  const g = ctx.createLinearGradient(0, -460, 0, 0)
  g.addColorStop(0, 'rgba(242,140,90,0)'); g.addColorStop(1, rgba(sunny > 0.5 ? '#f2a64a' : '#6a8ad8', 0.24))
  ctx.fillStyle = g; ctx.fillRect(0, -460, 1080, 460)
  ;[4, 3, 6, 5, 2, 7, 1, 8, 0, 9].forEach((i, j) => {
    const b = TOWERS[i], kk = k(j)
    if (kk <= 0) return
    const h = b.h * kk
    ctx.save()
    towerPath(ctx, b, h); ctx.fillStyle = '#120c2c'; ctx.fill(); ctx.fillStyle = rgba('#9a7be0', 0.16); ctx.fill(); ctx.clip()
    for (const wdw of WIN[i]) {
      const wx = b.x - (wdw.cols * 24) / 2 + wdw.c * 24 + 4, wy = -h + 70 + wdw.rr * 34
      if (wy > -16) continue
      const tw = 0.6 + 0.4 * noise1(t * 0.8 + wdw.seed, wdw.seed)
      ctx.fillStyle = rgba(wdw.gold ? '#ffd98a' : '#bfe6ff', 0.75 * tw); ctx.fillRect(wx, wy, 12, 16)
    }
    ctx.restore()
    towerPath(ctx, b, h); ink(ctx, '#b39ce8', { w: 5, fa: 0, glow: 12 })
  })
  ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(1090, 0); ink(ctx, '#c9a6ff', { w: 6, fa: 0, glow: 12 })
  ctx.fillStyle = '#0b0620'; ctx.fillRect(0, 3, 1080, 400)
  ctx.restore()
}

// ───────────────────────── pictogram person with an umbrella that opens (o = 1) and closes (o = 0). (x, y) = feet, ≈ 470 tall open
/** canopy top y (in local, unscaled px above the feet) and half-width when open amount o */
export const canopy = o => ({ hw: lerp(26, 200, o), top: -364 - lerp(150, 172, o) })
export function umbrellaPerson(ctx, x, y, s, t, { a = 1, o = 1, tilt = 0, col = VIOLET, ucol = PINK, sweat = 0 } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.beginPath(); ctx.moveTo(-48, 0); ctx.lineTo(-42, -150); ctx.quadraticCurveTo(-42, -188, 0, -190); ctx.quadraticCurveTo(42, -188, 42, -150); ctx.lineTo(48, 0); ctx.closePath()
  ink(ctx, col, { w: 9, fa: 0.38, glow: 20 })
  ctx.beginPath(); ctx.arc(0, -236, 37, 0, TAU); ink(ctx, col, { w: 9, fa: 0.85, glow: 20 })
  // sweat drops (sunny spells)
  if (sweat > 0) {
    for (let i = 0; i < 3; i++) {
      const ph = (t * 1.6 + i * 0.37) % 1, sx = [-62, 58, -70][i], sy = -262 + ph * 70
      ctx.save(); ctx.globalAlpha *= sweat * Math.sin(Math.PI * ph); ctx.translate(sx, sy)
      ctx.beginPath(); ctx.moveTo(0, -16); ctx.quadraticCurveTo(12, 2, 0, 9); ctx.quadraticCurveTo(-12, 2, 0, -16); ink(ctx, BLUE, { w: 5, fa: 0.7, glow: 10 })
      ctx.restore()
    }
  }
  // arm up to the handle
  ctx.beginPath(); ctx.moveTo(30, -150); ctx.lineTo(8, -214); ink(ctx, col, { w: 13, fa: 0, glow: 8 })
  // umbrella: shaft from the hand, canopy whose width follows o
  ctx.translate(4, -220); ctx.rotate(tilt)
  ctx.beginPath(); ctx.moveTo(0, 34); ctx.lineTo(0, -150); ink(ctx, BONE, { w: 7, fa: 0, glow: 8 })
  ctx.beginPath(); ctx.arc(-14, 34, 14, 0, Math.PI); ink(ctx, BONE, { w: 7, fa: 0, glow: 8 })
  const hw = lerp(26, 200, o), hh = lerp(150, 172, o), lip = lerp(120, 40, o)
  ctx.translate(0, -144)
  ctx.beginPath(); ctx.moveTo(-hw, lip); ctx.quadraticCurveTo(-hw * 0.95, -hh * 0.92, 0, -hh); ctx.quadraticCurveTo(hw * 0.95, -hh * 0.92, hw, lip)
  const n = 5
  for (let k = n - 1; k >= 0; k--) { const x0 = -hw + k * (2 * hw / n), x1 = x0 + 2 * hw / n; ctx.lineTo(x1, lip); ctx.quadraticCurveTo((x0 + x1) / 2, lip - 34 * o, x0, lip) }
  ctx.closePath(); ink(ctx, ucol, { w: 9, fa: 0.45, glow: 22 })
  ctx.beginPath(); ctx.moveTo(-hw * 0.6, lip - 8); ctx.quadraticCurveTo(-hw * 0.47, -hh * 0.7, 0, -hh); ctx.moveTo(hw * 0.6, lip - 8); ctx.quadraticCurveTo(hw * 0.47, -hh * 0.7, 0, -hh); ink(ctx, ucol, { w: 5, fa: 0, glow: 6 })
  ctx.beginPath(); ctx.moveTo(0, -hh); ctx.lineTo(0, -hh - 24); ink(ctx, BONE, { w: 7, fa: 0, glow: 6 })
  ctx.restore()
}

// ───────────────────────── plain pictogram person (feet at 0,0; ≈ 275 tall); no face
export function person(ctx, x, y, s, col, { a = 1, lean = 0, sq = 1 } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s / sq, s * sq); ctx.globalAlpha *= a; ctx.rotate(lean)
  ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(-44, -150); ctx.quadraticCurveTo(-44, -190, 0, -192); ctx.quadraticCurveTo(44, -190, 44, -150); ctx.lineTo(50, 0); ctx.closePath()
  ink(ctx, col, { w: 9, fa: 0.38, glow: 20 })
  ctx.beginPath(); ctx.arc(0, -238, 38, 0, TAU); ink(ctx, col, { w: 9, fa: 0.85, glow: 20 })
  ctx.restore()
}

// ───────────────────────── a glowing orb with a pixel glint
export function orb(ctx, px, py, r, color, a = 1, halo = 3.2) {
  if (a <= 0 || r <= 0.5) return
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = ctx.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, hr, 0, TAU); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = a
  const s = ctx.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.45, color); s.addColorStop(1, rgba(color, 0.85))
  ctx.fillStyle = s; ctx.beginPath(); ctx.arc(px, py, r, 0, TAU); ctx.fill()
  ctx.restore()
}
