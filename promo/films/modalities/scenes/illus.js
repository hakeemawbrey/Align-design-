// modalities · line-art illustrations (bold, friendly, thick glowing strokes, flat 20–40% fills, no faces).
// Every draw fn takes a canvas ctx and draws around (x, y) at scale s. Pure functions of their arguments.
import { mix } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', INK = '#1a1430'
export const VS = '︎'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
export const hexA = (hex, a) => hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0')

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(ctx, col, { w = 8, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = hexA(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}
function begin(ctx, x, y, s, a = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a }
function halo(ctx, x, y, r, col, a) {
  const g = ctx.createRadialGradient(x, y, 10, x, y, r)
  g.addColorStop(0, hexA(col, a)); g.addColorStop(1, hexA(col, 0))
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore()
}
/** a 3/4-view cylinder silhouette: top ellipse centre (0, yTop), bottom ellipse centre (0, yBot) */
function cylPath(ctx, rx, ry, yTop, yBot) {
  ctx.beginPath(); ctx.moveTo(-rx, yTop); ctx.lineTo(-rx, yBot)
  ctx.ellipse(0, yBot, rx, ry, 0, Math.PI, 0, true)
  ctx.lineTo(rx, yTop)
  ctx.ellipse(0, yTop, rx, ry, 0, 0, Math.PI, true)
  ctx.closePath()
}

// ───────────────────────── CARDINAL: a big START button (≈ 500 px wide at s 1; origin = centre of the base's top face)
export function startButton(ctx, x, y, s, { a = 1, press = 0, col = '#ff6b5a', glow = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a)
  halo(ctx, 0, -10, 340, col, 0.18 + 0.3 * glow)
  // base
  cylPath(ctx, 250, 74, 60, 160); ink(ctx, mix(col, BONE, 0.35), { w: 8, fa: 0.24, fill: mix(col, INK, 0.5) })
  ctx.beginPath(); ctx.ellipse(0, 60, 250, 74, 0, 0, Math.PI * 2); ink(ctx, mix(col, BONE, 0.35), { w: 6, fa: 0.2, fill: INK, glow: 8 })
  ctx.save(); ctx.font = `800 54px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.letterSpacing = '8px'
  ctx.fillStyle = BONE; ctx.shadowColor = col; ctx.shadowBlur = 14; ctx.fillText('START', 4, 190); ctx.restore()
  // the cap (squashes down when pressed)
  const h = 92 * (1 - 0.72 * press)
  cylPath(ctx, 168, 50, 60 - h, 60); ink(ctx, col, { w: 9, fa: 0.85, fill: mix(col, INK, 0.25), glow: 20 + 20 * glow })
  ctx.beginPath(); ctx.ellipse(0, 60 - h, 168, 50, 0, 0, Math.PI * 2); ink(ctx, col, { w: 8, fa: 1, fill: mix(col, '#ffffff', 0.25 + 0.25 * glow), glow: 14 })
  ctx.beginPath(); ctx.ellipse(-30, 60 - h - 8, 110, 26, 0, Math.PI * 1.08, Math.PI * 1.5); ink(ctx, '#ffffff', { w: 7, fa: 0, glow: 6 })
  ctx.restore()
}
/** a mouse-arrow cursor, tip at (x, y) */
export function cursor(ctx, x, y, s, a = 1) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a, -0.18)
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 150); ctx.lineTo(38, 114); ctx.lineTo(64, 172); ctx.lineTo(92, 160); ctx.lineTo(66, 104); ctx.lineTo(114, 102); ctx.closePath()
  ctx.lineJoin = 'round'; ctx.fillStyle = BONE; ctx.shadowColor = 'rgba(255,240,220,0.8)'; ctx.shadowBlur = 24; ctx.fill(); ctx.shadowBlur = 0
  ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.stroke()
  ctx.restore()
}
/** a rounded ▶ play triangle */
export function playTri(ctx, x, y, s, col, a = 1, rot = 0) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a, rot)
  halo(ctx, 10, 0, 200, col, 0.35)
  ctx.beginPath(); ctx.moveTo(-62, -92); ctx.lineTo(98, 0); ctx.lineTo(-62, 92); ctx.closePath()
  ctx.lineWidth = 9; ink(ctx, col, { w: 12, fa: 0.55, glow: 26, fill: mix(col, '#ffffff', 0.2) })
  ctx.restore()
}

// ───────────────────────── FIXED: a padlock (body ≈ 330 × 270; origin = body top centre-ish). lift 1 = open
export function padlock(ctx, x, y, s, { a = 1, lift = 0, col = GOLD, squash = 0, glow = 0, small = false } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a)
  if (!small) halo(ctx, 0, 60, 330, col, 0.16 + 0.32 * glow)
  ctx.translate(0, 240); ctx.scale(1 + 0.07 * squash, 1 - 0.07 * squash); ctx.translate(0, -240)
  // shackle (behind the body): an outlined thick band
  ctx.save(); ctx.translate(0, -100 * lift)
  ctx.beginPath(); ctx.moveTo(-100, 20); ctx.lineTo(-100, -120); ctx.arc(0, -120, 100, Math.PI, 0); ctx.lineTo(100, 20)
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.strokeStyle = col; ctx.lineWidth = 50; ctx.shadowColor = col; ctx.shadowBlur = small ? 6 : 18; ctx.stroke(); ctx.shadowBlur = 0
  ctx.strokeStyle = mix(col, INK, 0.62); ctx.lineWidth = 32; ctx.stroke()
  ctx.restore()
  // body
  ctx.beginPath(); ctx.roundRect(-165, -30, 330, 270, 48); ink(ctx, col, { w: small ? 14 : 9, fa: 1, fill: mix(col, INK, 0.55), glow: small ? 6 : 22 + 18 * glow })
  ctx.beginPath(); ctx.roundRect(-165, -30, 330, 270, 48); ctx.fillStyle = hexA(col, 0.28 + 0.25 * glow); ctx.fill()
  if (!small) { ctx.beginPath(); ctx.moveTo(-120, 10); ctx.lineTo(-40, 10); ink(ctx, mix(col, '#ffffff', 0.5), { w: 7, fa: 0, glow: 6 }) }
  // keyhole
  ctx.beginPath(); ctx.arc(0, 85, 32, 0, Math.PI * 2); ctx.moveTo(-14, 100); ctx.lineTo(-22, 170); ctx.lineTo(22, 170); ctx.lineTo(14, 100); ctx.closePath()
  ctx.fillStyle = mix(col, '#ffffff', 0.15); ctx.shadowColor = col; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0
  ctx.restore()
}
/** a circular "keep going" arrow (≈ 300° arc + head) around (x, y) */
export function loopArrow(ctx, x, y, R, rot, col, a = 1, draw = 1) {
  if (a <= 0.003 || draw <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha *= a
  const span = Math.PI * 1.62 * draw
  ctx.beginPath(); ctx.arc(0, 0, R, 0, span); ink(ctx, col, { w: 9, fa: 0, glow: 18 })
  const hx = Math.cos(span) * R, hy = Math.sin(span) * R, tx = -Math.sin(span), ty = Math.cos(span)
  ctx.beginPath(); ctx.moveTo(hx + tx * 44, hy + ty * 44); ctx.lineTo(hx - Math.cos(span) * 30, hy - Math.sin(span) * 30); ctx.lineTo(hx + Math.cos(span) * 30, hy + Math.sin(span) * 30); ctx.closePath()
  ink(ctx, col, { w: 8, fa: 0.9, glow: 14 })
  ctx.restore()
}

// ───────────────────────── MUTABLE: shuffle arrows (≈ 480 × 320 at s 1). draw 0–1 draws it in; flip -1..1 mirrors it
const SHUF_L = 560
function shufPath(ctx, dir) {
  ctx.beginPath(); ctx.moveTo(-230, -110 * dir); ctx.lineTo(-95, -110 * dir)
  ctx.bezierCurveTo(-5, -110 * dir, 5, 110 * dir, 95, 110 * dir); ctx.lineTo(160, 110 * dir)
}
function shufHead(ctx, dir, k) {
  ctx.save(); ctx.translate(160, 110 * dir); ctx.scale(k, k)
  ctx.beginPath(); ctx.moveTo(-10, -58); ctx.lineTo(74, 0); ctx.lineTo(-10, 58); ctx.closePath(); ctx.restore()
}
export function shuffle(ctx, x, y, s, { a = 1, draw = 1, flip = 1, col = '#7fd0f0', col2 = '#c9a6ff', glow = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a)
  halo(ctx, 0, 0, 360, col, 0.16 + 0.3 * glow)
  ctx.scale(flip, 1)
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  const band = (dir, c) => {
    if (draw < 0.03) return
    ctx.save(); ctx.setLineDash([SHUF_L * draw, 2000])
    shufPath(ctx, dir)
    ctx.strokeStyle = c; ctx.lineWidth = 52; ctx.shadowColor = c; ctx.shadowBlur = 20 + 14 * glow; ctx.stroke(); ctx.shadowBlur = 0
    ctx.strokeStyle = mix(c, INK, 0.55); ctx.lineWidth = 34; ctx.stroke()
    ctx.restore()
    const hk = Math.max(0, Math.min(1.15, (draw - 0.85) / 0.15))
    if (hk > 0) {
      shufHead(ctx, dir, hk); ctx.lineWidth = 9
      ctx.fillStyle = mix(c, INK, 0.45); ctx.shadowColor = c; ctx.shadowBlur = 18; ctx.fill(); ctx.shadowBlur = 0
      ctx.strokeStyle = c; ctx.stroke()
    }
  }
  band(1, col2)
  band(-1, col)
  ctx.restore()
}

// ───────────────────────── sign chip (≈ 200 × 186). lit 0–1 brightens it; lockK pins a tiny padlock badge on it
export function chip(ctx, x, y, s, sign, { a = 1, lit = 0, lockK = 0, ring = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a)
  ctx.beginPath(); ctx.roundRect(-100, -93, 200, 186, 30)
  ink(ctx, lit > 0.05 ? sign.color : mix(sign.color, BONE, 0.45), { w: 6, fa: 0.2 + 0.4 * lit, fill: sign.color, glow: 10 + 22 * lit })
  if (ring > 0) { ctx.beginPath(); ctx.roundRect(-100, -93, 200, 186, 30); ctx.globalAlpha *= ring; ink(ctx, GOLD, { w: 8, fa: 0, glow: 22 }); ctx.globalAlpha /= ring }
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = lit > 0.5 ? '#fffaf0' : sign.color; ctx.shadowColor = sign.color; ctx.shadowBlur = 18
  ctx.font = `bold 104px ${GLYPH_FONT}`; ctx.fillText(sign.glyph + VS, 0, -14)
  ctx.shadowBlur = 0; ctx.fillStyle = BONE
  const name = sign.name.toUpperCase()
  ctx.font = `800 30px ${INTER}`; const w = ctx.measureText(name).width
  const fs = Math.min(30, 30 * 172 / w)
  ctx.font = `800 ${fs.toFixed(1)}px ${INTER}`; ctx.fillText(name, 0, 62)
  ctx.restore()
  if (lockK > 0.01) padlock(ctx, x + 88 * s, y - 84 * s, 0.17 * s * lockK, { col: GOLD, small: true })
}

// ───────────────────────── sparkles (pixel-star bursts)
export const SPARK_COLS = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(ctx, x, y, t, t0, { n = 10, rad: R = 150, seed = 1, cols = SPARK_COLS, size = 28, rng } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > 0.8) return
  const r = rng(seed)
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (let i = 0; i < n; i++) {
    const an = (i / n) * Math.PI * 2 + r() * 0.5, d = R * (0.6 + 0.5 * r()), c = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / 0.6), 3)
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tt - 0.25) / 0.55)
    drawPixelStar(ctx, x + Math.cos(an) * d * p, y + Math.sin(an) * d * p, size * (1 - 0.35 * p), kind, c)
  }
  ctx.restore()
}
