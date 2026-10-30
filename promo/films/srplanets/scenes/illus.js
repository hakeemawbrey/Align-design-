// srplanets · line-art helpers copied from planets (the original): the planet orbs and their ten icon gags.
// Bold, friendly, thick glowing strokes, flat 20–45% fills, no faces. Every fn is a pure function of the times passed in.
import { clamp, lerp, prog, ease, mix, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', INK = '#1a1430', PINK = '#ff8fb1', LILAC = '#c9a6ff', GREEN = '#5fdc7a'
// DejaVu Sans carries every planet glyph (☉☽☿♀♂♃♄♅♆♇); VS15 keeps ♀/♂ out of emoji presentation
export const GLYPH_FONT = "'DejaVu Sans', 'Noto Sans Symbols', 'Segoe UI Symbol', sans-serif"
export const VS = '︎'
const TAU = Math.PI * 2
export const hexA = (hex, a) => hex + Math.round(clamp(a) * 255).toString(16).padStart(2, '0')

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(ctx, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = hexA(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}
function begin(ctx, x, y, s, a = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a }
function halo(ctx, x, y, r, col, a) {
  const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r)
  g.addColorStop(0, hexA(col, a)); g.addColorStop(1, hexA(col, 0))
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore()
}

// ───────────────────────── sparkle burst (pixel stars flying out), as in dummies v2
export const SPARK_COLS = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(ctx, x, y, t, t0, { n = 10, rad: R = 150, seed = 1, cols = SPARK_COLS, size = 28 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > 0.8) return
  const r = rng(seed)
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = ease.outCubic(Math.min(1, tt / 0.6))
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tt - 0.25) / 0.55)
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  ctx.restore()
}

// ───────────────────────── planet orbs
/** a big glowing planet orb with its glyph. P = planet def; sx/sy = squash; t drives idle detail */
export function orb(ctx, P, x, y, r, t, { a = 1, sx = 1, sy = 1, glyph = true } = {}) {
  if (a <= 0.003 || r <= 1) return
  const col = P.col
  ctx.save(); ctx.globalAlpha *= a
  halo(ctx, x, y, r * 2.6, col, 0.42)
  ctx.translate(x, y); ctx.scale(sx, sy)
  // rings behind (Saturn, Uranus)
  if (P.ring) ring(ctx, r, P, t, 'back')
  if (P.id === 'sun') {               // little rays, slowly turning
    ctx.save(); ctx.rotate(t * 0.5)
    for (let i = 0; i < 12; i++) {
      const an = i * TAU / 12, r0 = r * 1.13, r1 = r * (1.36 + 0.06 * Math.sin(t * 4 + i * 1.7))
      ctx.beginPath(); ctx.moveTo(Math.cos(an) * r0, Math.sin(an) * r0); ctx.lineTo(Math.cos(an) * r1, Math.sin(an) * r1)
      ink(ctx, '#ffd98a', { w: 9, fa: 0, glow: 16 })
    }
    ctx.restore()
  }
  // the disc
  const g = ctx.createRadialGradient(-r * 0.38, -r * 0.42, r * 0.06, 0, 0, r)
  g.addColorStop(0, mix(col, '#ffffff', 0.62)); g.addColorStop(0.45, col); g.addColorStop(1, mix(col, '#1a1430', 0.32))
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = g; ctx.fill()
  // surface detail, clipped to the disc
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r - 2, 0, TAU); ctx.clip()
  detail(ctx, P, r, t)
  ctx.restore()
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ink(ctx, mix(col, '#ffffff', 0.45), { w: 7, fa: 0, glow: 22 })
  if (P.ring) ring(ctx, r, P, t, 'front')
  if (glyph) {
    ctx.font = `${Math.round(r * (P.gs || 1.08))}px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    const gc = P.glyphCol || INK
    ctx.fillStyle = gc; ctx.strokeStyle = gc; ctx.lineWidth = r * 0.035; ctx.lineJoin = 'round'
    if (gc !== INK) { ctx.shadowColor = 'rgba(11,6,32,0.7)'; ctx.shadowBlur = 14 }
    ctx.globalAlpha *= 0.92
    ctx.fillText(P.glyph + VS, 0, r * (P.gy || 0.04)); ctx.strokeText(P.glyph + VS, 0, r * (P.gy || 0.04))
    ctx.shadowBlur = 0
  }
  ctx.restore()
  // the pixel glint
  ctx.save(); ctx.globalAlpha *= a; ctx.imageSmoothingEnabled = false
  drawPixelStar(ctx, Math.round(x + r * 0.62 * sx), Math.round(y - r * 0.66 * sy), r > 120 ? 28 : 21, 0, 'rgba(255,243,224,0.95)')
  ctx.restore()
}
function detail(ctx, P, r, t) {
  ctx.globalAlpha *= 0.3
  const dark = mix(P.col, '#1a1430', 0.45)
  if (P.id === 'moon' || P.id === 'mercury') {
    for (const [cx, cy, cr] of [[-0.45, 0.35, 0.18], [0.5, 0.45, 0.13], [0.4, -0.45, 0.11], [-0.2, -0.6, 0.09], [0.1, 0.72, 0.1]]) {
      ctx.beginPath(); ctx.arc(cx * r, cy * r, cr * r, 0, TAU); ctx.fillStyle = dark; ctx.fill()
    }
  } else if (P.id === 'jupiter' || P.id === 'saturn') {
    const bands = P.id === 'jupiter' ? [-0.62, -0.32, 0.3, 0.58] : [-0.45, 0.4]
    for (const b of bands) { ctx.beginPath(); ctx.ellipse(0, b * r, r * 1.1, r * 0.07, 0, 0, TAU); ctx.fillStyle = dark; ctx.fill() }
    if (P.id === 'jupiter') { ctx.globalAlpha *= 2; ctx.beginPath(); ctx.ellipse(r * 0.42, r * 0.5, r * 0.17, r * 0.1, 0, 0, TAU); ctx.fillStyle = '#c4452e'; ctx.fill() }
  } else if (P.id === 'mars') {
    ctx.beginPath(); ctx.ellipse(0, -r * 0.95, r * 0.45, r * 0.16, 0, 0, TAU); ctx.fillStyle = '#ffffff'; ctx.globalAlpha *= 2.2; ctx.fill()
  } else if (P.id === 'neptune') {
    ctx.lineWidth = r * 0.05; ctx.strokeStyle = '#bcd2ff'
    for (const b of [-0.5, 0.55]) { ctx.beginPath(); ctx.moveTo(-r, b * r); ctx.bezierCurveTo(-r * 0.3, (b - 0.12) * r, r * 0.3, (b + 0.12) * r, r, b * r); ctx.stroke() }
  } else if (P.id === 'pluto') {      // the famous pale heart (Tombaugh Regio)
    ctx.globalAlpha *= 2.4; ctx.fillStyle = '#fff3f8'
    ctx.save(); ctx.translate(r * 0.42, r * 0.55); ctx.scale(r * 0.0032, r * 0.0032); heartPath(ctx); ctx.fill(); ctx.restore()
  } else if (P.id === 'venus') {
    ctx.lineWidth = r * 0.06; ctx.strokeStyle = '#fff0f5'
    for (const b of [-0.55, 0.5]) { ctx.beginPath(); ctx.moveTo(-r, b * r); ctx.bezierCurveTo(-r * 0.3, (b + 0.15) * r, r * 0.3, (b - 0.15) * r, r, b * r); ctx.stroke() }
  }
}
function ring(ctx, r, P, t, side) {
  const tilt = P.id === 'uranus' ? Math.PI / 2 - 0.12 : -0.22
  const rx = r * (P.id === 'uranus' ? 1.45 : 1.78), ry = r * (P.id === 'uranus' ? 0.26 : 0.4)
  ctx.save(); ctx.rotate(tilt)
  ctx.beginPath()
  if (side === 'back') ctx.ellipse(0, 0, rx, ry, 0, Math.PI, TAU)
  else ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI)
  const c = mix(P.col, '#ffffff', 0.3)
  ink(ctx, c, { w: P.id === 'uranus' ? 6 : 12, fa: 0, glow: 18 })
  if (P.id === 'saturn') { ctx.beginPath(); if (side === 'back') ctx.ellipse(0, 0, rx * 0.84, ry * 0.8, 0, Math.PI, TAU); else ctx.ellipse(0, 0, rx * 0.84, ry * 0.8, 0, 0, Math.PI); ink(ctx, c, { w: 5, fa: 0, glow: 10 }) }
  ctx.restore()
}

export function heartPath(ctx) {
  ctx.beginPath()
  ctx.moveTo(0, 70)
  ctx.bezierCurveTo(-30, 45, -100, 5, -100, -40)
  ctx.bezierCurveTo(-100, -80, -55, -100, -28, -88)
  ctx.bezierCurveTo(-12, -80, -4, -68, 0, -56)
  ctx.bezierCurveTo(4, -68, 12, -80, 28, -88)
  ctx.bezierCurveTo(55, -100, 100, -80, 100, -40)
  ctx.bezierCurveTo(100, 5, 30, 45, 0, 70)
  ctx.closePath()
}

// ───────────────────────── 1 Sun: a stage + two spotlights that click on
export function spotlights(ctx, t, tt, a, ox, oy) {
  const pin = easeOutBack(prog(tt, -0.05, 0.3), 2.0)
  if (a <= 0.003 || pin <= 0.001) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.translate(ox, oy + 330); ctx.scale(pin, pin); ctx.translate(-ox, -oy - 330)
  const on = [ease.outCubic(prog(tt, 0.5, 0.62)), ease.outCubic(prog(tt, 0.78, 0.9))]
  // light pool + stage
  const pool = (on[0] + on[1]) / 2
  halo(ctx, ox, oy + 285, 300, GOLD, 0.35 * pool)
  ctx.beginPath(); ctx.ellipse(ox, oy + 290, 300, 52, 0, 0, TAU); ink(ctx, GOLD, { w: 7, fa: 0.2 + 0.2 * pool })
  ctx.beginPath(); ctx.moveTo(ox - 300, oy + 290); ctx.lineTo(ox - 300, oy + 330); ctx.ellipse(ox, oy + 330, 300, 52, 0, Math.PI, 0, true); ctx.lineTo(ox + 300, oy + 290); ink(ctx, GOLD, { w: 7, fa: 0 })
  for (let s = 0; s < 2; s++) {
    const side = s ? 1 : -1, lx = ox + side * 395, ly = oy + 450
    const ang = Math.atan2(oy - ly, ox - lx)
    // the cone
    if (on[s] > 0.01) {
      const L = Math.hypot(ox - lx, oy - ly) + 80, wd = 250
      const nx = -Math.sin(ang), ny = Math.cos(ang)
      const ex = lx + Math.cos(ang) * L, ey = ly + Math.sin(ang) * L
      const g = ctx.createLinearGradient(lx, ly, ex, ey)
      g.addColorStop(0, `rgba(255,224,150,${0.5 * on[s]})`); g.addColorStop(1, `rgba(255,224,150,${0.08 * on[s]})`)
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g
      ctx.beginPath(); ctx.moveTo(lx + nx * 26, ly + ny * 26); ctx.lineTo(ex + nx * wd, ey + ny * wd); ctx.lineTo(ex - nx * wd, ey - ny * wd); ctx.lineTo(lx - nx * 26, ly - ny * 26); ctx.closePath(); ctx.fill()
      ctx.restore()
    }
    // stand
    ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx, ly + 95); ctx.moveTo(lx - 48, ly + 95); ctx.lineTo(lx + 48, ly + 95); ink(ctx, BONE, { w: 8, fa: 0, glow: 10 })
    // lamp body, aimed at the Sun
    ctx.save(); ctx.translate(lx, ly); ctx.rotate(ang)
    ctx.beginPath(); ctx.moveTo(-50, -30); ctx.lineTo(28, -42); ctx.lineTo(28, 42); ctx.lineTo(-50, 30); ctx.closePath(); ink(ctx, BONE, { w: 8, fa: 0.25, fill: '#6a4fc2', glow: 10 })
    ctx.beginPath(); ctx.ellipse(30, 0, 12, 42, 0, 0, TAU); ink(ctx, on[s] > 0.5 ? '#fff3c4' : BONE, { w: 7, fa: 0.25 + 0.75 * on[s], fill: '#ffe39a', glow: 10 + 30 * on[s] })
    ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── 2 Moon: a cozy plaid blanket tucks it in, z's drift up
export function blanket(ctx, t, tt, a, ox, oy, r) {
  if (a <= 0.003) return
  const up = easeOutBack(prog(tt, 0.42, 0.85), 1.6)
  if (up <= 0.001) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.translate(ox, oy + lerp(520, 0, up))
  const wv = 6 * Math.sin(t * 2.2)
  const path = () => {
    ctx.beginPath(); ctx.moveTo(-r - 95, 80 + wv)
    ctx.bezierCurveTo(-r * 0.5, 50 - wv, r * 0.5, 50 + wv, r + 95, 80 - wv)
    ctx.bezierCurveTo(r + 120, 170, r + 90, 260, r + 60, 320)
    ctx.bezierCurveTo(r * 0.3, 345, -r * 0.3, 300, -r - 60, 330)
    ctx.bezierCurveTo(-r - 100, 260, -r - 120, 170, -r - 95, 80 + wv)
    ctx.closePath()
  }
  path(); ctx.fillStyle = hexA('#7a5fd0', 0.85); ctx.fill()
  // plaid
  ctx.save(); path(); ctx.clip()
  ctx.globalAlpha *= 0.55
  for (let i = -6; i <= 6; i++) { ctx.fillStyle = hexA(PINK, 0.55); ctx.fillRect(i * 62 - 9, 0, 18, 400) }
  for (let j = 0; j < 6; j++) { ctx.fillStyle = hexA(GOLD, 0.45); ctx.fillRect(-400, 110 + j * 56, 800, 12) }
  ctx.restore()
  path(); ink(ctx, LILAC, { w: 8, fa: 0 })
  // folded hem
  ctx.beginPath(); ctx.moveTo(-r - 90, 116 + wv); ctx.bezierCurveTo(-r * 0.5, 88 - wv, r * 0.5, 88 + wv, r + 92, 116 - wv); ink(ctx, BONE, { w: 6, fa: 0, glow: 10 })
  ctx.restore()
  // z z z
  ctx.save(); ctx.globalAlpha *= a * clamp((tt - 0.8) * 3)
  ctx.font = "800 58px Inter, sans-serif"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  for (let i = 0; i < 3; i++) {
    const ph = ((tt - 0.8) * 0.75 + i / 3) % 1
    if (tt < 0.8) continue
    ctx.globalAlpha = a * clamp((tt - 0.8) * 3) * Math.sin(Math.PI * ph)
    ctx.fillStyle = LILAC; ctx.shadowColor = LILAC; ctx.shadowBlur = 16
    ctx.font = `800 ${Math.round(40 + 34 * ph)}px Inter, sans-serif`
    ctx.fillText('z', ox + r * 0.75 + 140 * ph, oy - r * 0.6 - 190 * ph + 14 * Math.sin(ph * 9))
  }
  ctx.restore()
}

// ───────────────────────── 3 Mercury: a buzzing phone + chat bubbles
export function phoneChat(ctx, t, tt, a, ox, oy) {
  if (a <= 0.003) return
  const pin = easeOutBack(prog(tt, 0.35, 0.7), 2.2)
  if (pin <= 0.001) return
  const buzzOn = (tt > 0.62 && tt < 1.0) || (tt > 1.3 && tt < 1.6)
  const bz = buzzOn ? 7 * Math.sin(tt * 85) : 0
  const px = ox + 300 + bz, py = oy + 280
  ctx.save(); ctx.globalAlpha *= a
  begin(ctx, px, py, pin, 1, 0.16 + (buzzOn ? 0.04 * Math.sin(tt * 60) : 0))
  ctx.beginPath(); ctx.roundRect(-80, -140, 160, 280, 30); ink(ctx, BONE, { w: 8, fa: 0.3, fill: '#4b8fb8' })
  ctx.beginPath(); ctx.moveTo(-20, -120); ctx.lineTo(20, -120); ink(ctx, BONE, { w: 6, fa: 0 })
  // tiny message lines on the screen
  ctx.beginPath(); ctx.roundRect(-55, -80, 80, 30, 12); ink(ctx, '#8fd8f6', { w: 4, fa: 0.6, glow: 6 })
  ctx.beginPath(); ctx.roundRect(-20, -35, 75, 30, 12); ink(ctx, GOLD, { w: 4, fa: 0.6, glow: 6 })
  ctx.beginPath(); ctx.roundRect(-55, 10, 90, 30, 12); ink(ctx, '#8fd8f6', { w: 4, fa: 0.6, glow: 6 })
  ctx.restore()
  // buzz arcs
  if (buzzOn) {
    ctx.save(); ctx.translate(px, py); ctx.rotate(0.16)
    for (const s of [-1, 1]) for (let k = 0; k < 2; k++) {
      ctx.beginPath(); ctx.arc(0, 0, 130 + k * 32, s > 0 ? -0.35 : Math.PI - 0.35, s > 0 ? 0.35 : Math.PI + 0.35); ink(ctx, '#8fd8f6', { w: 6, fa: 0, glow: 12 })
    }
    ctx.restore()
  }
  // chat bubbles flying out to the left
  const B = [{ t0: 0.68, x: ox - 260, y: oy + 225, txt: 'hey!', col: '#8fd8f6' }, { t0: 1.0, x: ox - 120, y: oy + 345, txt: 'lol', col: GOLD }, { t0: 1.32, x: ox - 300, y: oy + 440, txt: '•••', col: PINK }]
  for (const b of B) {
    const p = easeOutBack(prog(tt, b.t0, b.t0 + 0.35), 2.4)
    if (p <= 0.001) continue
    const fx = lerp(px - 40, b.x, ease.outCubic(prog(tt, b.t0, b.t0 + 0.35))), fy = lerp(py, b.y, ease.outCubic(prog(tt, b.t0, b.t0 + 0.35))) + 6 * Math.sin(t * 3 + b.t0 * 5)
    begin(ctx, fx, fy, p, 1, -0.05)
    ctx.beginPath(); ctx.roundRect(-95, -46, 190, 92, 40); ctx.moveTo(60, 40); ctx.lineTo(96, 66); ctx.lineTo(30, 44)
    ink(ctx, b.col, { w: 7, fa: 0.3 })
    if (b.txt === '•••') {
      for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(-40 + k * 40, -6 * Math.max(0, Math.sin(t * 9 - k * 0.9)), 11, 0, TAU); ctx.fillStyle = BONE; ctx.fill() }
    } else {
      ctx.font = "800 50px Inter, sans-serif"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = BONE
      ctx.fillText(b.txt, 0, 2)
    }
    ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── 4 Venus: a big heart that beats on the beat + little hearts floating up
export function beatingHeart(ctx, t, tt, a, ox, oy, beatAt) {
  if (a <= 0.003) return
  const pin = easeOutBack(prog(tt, 0.35, 0.72), 2.4)
  if (pin <= 0.001) return
  ctx.save(); ctx.globalAlpha *= a
  // little hearts floating up behind
  for (let i = 0; i < 6; i++) {
    const ph = ((tt - 0.5) * 0.55 + i / 6) % 1
    if (tt < 0.5) break
    const hx = ox + [-260, 250, -330, 330, -170, 190][i] + 22 * Math.sin(ph * 8 + i), hy = oy + 240 - 520 * ph
    ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * ph) * clamp((tt - 0.5) * 3)
    ctx.translate(hx, hy); ctx.scale(0.28, 0.28); ctx.rotate(0.2 * Math.sin(ph * 6 + i)); heartPath(ctx); ink(ctx, i % 2 ? PINK : '#ff5f8f', { w: 18, fa: 0.4, glow: 22 })
    ctx.restore()
  }
  const thump = beatAt(t)
  const s = pin * (1 + 0.16 * thump)
  begin(ctx, ox + 290, oy + 300, s * 1.25, 1, 0.12)
  halo(ctx, 0, 0, 200, PINK, 0.3 + 0.3 * thump)
  heartPath(ctx); ink(ctx, PINK, { w: 9, fa: 0.42, fill: '#ff5f8f', glow: 24 })
  ctx.beginPath(); ctx.arc(-55, -45, 26, Math.PI * 1.05, Math.PI * 1.6); ink(ctx, '#ffe3ec', { w: 7, fa: 0, glow: 8 })
  ctx.restore()
  ctx.restore()
}

// ───────────────────────── 5 Mars: a sprinting pictogram + speed lines + dust puffs
export function sprinter(ctx, t, tt, a, ox, oy) {
  if (a <= 0.003) return
  const pin = easeOutBack(prog(tt, 0.3, 0.62), 2.0)
  if (pin <= 0.001) return
  const col = '#ffb39a'
  ctx.save(); ctx.globalAlpha *= a
  const rx = ox + 40, ry = oy + 400 - 10 * Math.abs(Math.sin(tt * 13))
  // speed lines streaming left
  const sl = clamp((tt - 0.4) * 4)
  for (let i = 0; i < 7; i++) {
    const yy = oy - 200 + i * 95 + (i > 4 ? 120 : 0), len = 160 + 90 * ((i * 37) % 3)
    const off = ((tt * 1300 + i * 211) % 900)
    const x0 = rx - 160 - off
    ctx.save(); ctx.globalAlpha *= sl * clamp(1 - off / 900) * 0.9
    ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x0 - len, yy); ink(ctx, i % 2 ? '#f0603a' : BONE, { w: 7, fa: 0, glow: 12 })
    ctx.restore()
  }
  // dust puffs at the feet
  for (let i = 0; i < 4; i++) {
    const ph = ((tt - 0.4) * 2.2 + i / 4) % 1
    if (tt < 0.4) break
    ctx.save(); ctx.globalAlpha *= (1 - ph) * 0.8
    ctx.beginPath(); ctx.arc(rx - 70 - 220 * ph, ry + 105 - 30 * ph, 16 + 34 * ph, 0, TAU); ink(ctx, '#d9a86c', { w: 5, fa: 0.25, glow: 8 })
    ctx.restore()
  }
  // the runner (simple pictogram, leaning forward)
  begin(ctx, rx, ry, pin * 1.15, 1, 0.12)
  const ph = tt * 13
  const limb = (x0, y0, a1, l1, a2, l2) => { const kx = x0 + Math.sin(a1) * l1, ky = y0 + Math.cos(a1) * l1; ctx.moveTo(x0, y0); ctx.lineTo(kx, ky); ctx.lineTo(kx + Math.sin(a2) * l2, ky + Math.cos(a2) * l2) }
  ctx.beginPath()
  for (const o of [0, Math.PI]) {
    const s = Math.sin(ph + o)
    const th = 0.95 * s, kn = th - (0.35 + 0.9 * (0.5 - 0.5 * Math.cos(ph + o)))
    limb(0, 0, th, 58, kn, 58)                           // leg from the hip
    const ar = -0.9 * s
    limb(6, -72, ar + Math.PI, 0, ar, 40); limb(6, -72, ar, 40, ar + Math.PI * 0.6, 36)
  }
  ctx.moveTo(0, 0); ctx.lineTo(8, -80)
  ink(ctx, col, { w: 16, fa: 0, glow: 18 })
  ctx.beginPath(); ctx.arc(14, -112, 24, 0, TAU); ink(ctx, col, { w: 8, fa: 0.9, fill: col, glow: 18 })
  ctx.restore()
  ctx.restore()
}

// ───────────────────────── 6 Jupiter: a four-leaf clover spins in
export function clover(ctx, t, tt, a, ox, oy) {
  if (a <= 0.003) return
  const pin = easeOutBack(prog(tt, 0.4, 0.8), 2.6)
  if (pin <= 0.001) return
  ctx.save(); ctx.globalAlpha *= a
  const x = ox + 300, y = oy + 310
  halo(ctx, x, y, 210, GREEN, 0.28 * pin)
  begin(ctx, x, y, pin * 1.2, 1, lerp(-2.2, 0, ease.outCubic(prog(tt, 0.4, 0.95))) + 0.08 * Math.sin(t * 2))
  // stem
  ctx.beginPath(); ctx.moveTo(0, 10); ctx.quadraticCurveTo(30, 90, 10, 150); ink(ctx, GREEN, { w: 10, fa: 0 })
  for (let i = 0; i < 4; i++) {
    ctx.save(); ctx.rotate(i * Math.PI / 2 + Math.PI / 4); ctx.translate(0, -66); ctx.scale(0.66, 0.66)
    heartPath(ctx); ink(ctx, GREEN, { w: 12, fa: 0.4, glow: 18 })
    ctx.restore()
  }
  ctx.beginPath(); ctx.arc(0, 0, 10, 0, TAU); ink(ctx, '#bdf5c8', { w: 5, fa: 1, glow: 10 })
  ctx.restore()
  // twinkly gold stars hanging around it
  ctx.imageSmoothingEnabled = false
  for (let i = 0; i < 5; i++) {
    const an = i * 1.3 + 0.4, d = 150 + 30 * (i % 2)
    const tw = clamp((tt - 0.75 - i * 0.08) * 4) * (0.5 + 0.5 * Math.sin(t * 5 + i * 2))
    if (tw <= 0.02) continue
    ctx.globalAlpha = a * tw
    drawPixelStar(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d * 0.9, 21 + 7 * (i % 2), i % 3, GOLD)
  }
  ctx.restore()
}

// ───────────────────────── 7 Saturn: a stern alarm clock that ticks on the beat
export function sternClock(ctx, t, tt, a, ox, oy, steps) {
  if (a <= 0.003) return
  const pin = easeOutBack(prog(tt, 0.35, 0.7), 2.2)
  if (pin <= 0.001) return
  const { n, jolt } = steps(t)
  ctx.save(); ctx.globalAlpha *= a
  const x = ox + 300, y = oy + 320
  begin(ctx, x, y, pin * 1.05, 1, 0.08 + 0.07 * jolt)
  // legs + bells
  ctx.beginPath(); ctx.moveTo(-60, 92); ctx.lineTo(-84, 128); ctx.moveTo(60, 92); ctx.lineTo(84, 128); ink(ctx, BONE, { w: 9, fa: 0 })
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(s * 72, -100, 34, Math.PI + s * 0.5 - 0.9, Math.PI + s * 0.5 + 1.25 - 0.35); ctx.closePath(); ink(ctx, GOLD, { w: 7, fa: 0.4 }) }
  ctx.beginPath(); ctx.arc(0, 0, 112, 0, TAU); ink(ctx, BONE, { w: 9, fa: 0.3, fill: '#5a3fa8' })
  ctx.beginPath(); for (let k = 0; k < 12; k++) { const an = k * TAU / 12, r0 = k % 3 ? 86 : 74; ctx.moveTo(Math.cos(an) * r0, Math.sin(an) * r0); ctx.lineTo(Math.cos(an) * 96, Math.sin(an) * 96) } ink(ctx, BONE, { w: 6, fa: 0, glow: 8 })
  // hands: hour fixed, minute steps one notch per beat with a springy settle
  const hourA = -Math.PI / 2 - Math.PI / 3
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(hourA) * 48, Math.sin(hourA) * 48); ink(ctx, GOLD, { w: 11, fa: 0 })
  const minA = -Math.PI / 2 + n * TAU / 12
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(minA) * 80, Math.sin(minA) * 80); ink(ctx, '#f0603a', { w: 8, fa: 0 })
  ctx.beginPath(); ctx.arc(0, 0, 11, 0, TAU); ink(ctx, GOLD, { w: 5, fa: 1 })
  ctx.restore()
  // tick marks flying off on each jolt
  if (jolt > 0.05) {
    ctx.globalAlpha = a * jolt
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * 140, y - 120); ctx.lineTo(x + s * 170, y - 150); ctx.moveTo(x + s * 150, y - 80); ctx.lineTo(x + s * 190, y - 90); ink(ctx, GOLD, { w: 6, fa: 0, glow: 10 }) }
  }
  ctx.restore()
}

// ───────────────────────── 8 Uranus: a lightning bolt slams in with one soft flash
export function bolt(ctx, t, tt, a, ox, oy) {
  if (a <= 0.003) return
  const pin = easeOutBack(prog(tt, 0.45, 0.72), 2.8)
  if (pin <= 0.001) return
  ctx.save(); ctx.globalAlpha *= a
  const x = ox + 300, y = oy + 300
  const flash = Math.exp(-Math.max(0, tt - 0.5) * 5) * clamp((tt - 0.45) * 10)
  halo(ctx, x, y - 40, 420, '#ffe27a', 0.45 * flash + 0.14)
  begin(ctx, x, lerp(y - 380, y, ease.outCubic(prog(tt, 0.45, 0.6))), pin * 1.15, 1, 0.12)
  ctx.beginPath()
  ;[[30, -190], [-75, 15], [-8, 15], [-45, 190], [90, -40], [20, -40], [70, -190]].forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))
  ctx.closePath()
  ink(ctx, '#ffe27a', { w: 10, fa: 0.5 + 0.3 * flash, fill: GOLD, glow: 26 + 20 * flash })
  ctx.restore()
  // little sparks at the tip
  ctx.imageSmoothingEnabled = false
  for (let i = 0; i < 4; i++) {
    const tw = clamp((tt - 0.6) * 4) * (0.5 + 0.5 * Math.sin(t * 7 + i * 1.7))
    if (tw < 0.03) continue
    ctx.globalAlpha = a * tw
    drawPixelStar(ctx, x - 40 + [-70, 60, -30, 90][i], y + 215 + [-20, 10, 40, -40][i], 21, i % 3, i % 2 ? '#7fe0d8' : '#ffe27a')
  }
  ctx.restore()
}

// ───────────────────────── 9 Neptune: a dreamy cloud drifting by, with little stars
function cloudPath(ctx) {
  ctx.beginPath()
  ctx.moveTo(-150, 50)
  ctx.bezierCurveTo(-210, 50, -210, -30, -150, -32)
  ctx.bezierCurveTo(-150, -95, -70, -110, -40, -62)
  ctx.bezierCurveTo(-20, -130, 90, -130, 95, -55)
  ctx.bezierCurveTo(160, -75, 200, -10, 160, 30)
  ctx.bezierCurveTo(175, 60, 140, 70, 120, 50)
  ctx.closePath()
}
export function dreamCloud(ctx, t, tt, a, ox, oy, layer) {
  if (a <= 0.003) return
  const pin = easeOutBack(prog(tt, layer === 'back' ? 0.25 : 0.4, layer === 'back' ? 0.6 : 0.78), 2.0)
  if (pin <= 0.001) return
  ctx.save(); ctx.globalAlpha *= a
  if (layer === 'back') {
    begin(ctx, ox + 320 - 26 * tt, oy - 250 + 8 * Math.sin(t * 1.6), pin * 0.62, 0.8)
    cloudPath(ctx); ink(ctx, LILAC, { w: 12, fa: 0.22 })
    ctx.restore()
  } else {
    const x = ox - 230 + 30 * tt, y = oy + 320 + 12 * Math.sin(t * 1.8)
    halo(ctx, x, y, 260, '#9fb6ff', 0.22 * pin)
    begin(ctx, x, y, pin * 1.1, 1)
    cloudPath(ctx); ink(ctx, '#dfe6ff', { w: 9, fa: 0.3, fill: '#9fb6ff' })
    ctx.beginPath(); ctx.arc(-60, 0, 46, Math.PI * 0.9, Math.PI * 1.35); ink(ctx, '#ffffff', { w: 6, fa: 0, glow: 8 })
    ctx.restore()
    // a little crescent + stars floating above the cloud
    ctx.imageSmoothingEnabled = false
    for (let i = 0; i < 5; i++) {
      const tw = clamp((tt - 0.7 - i * 0.07) * 4) * (0.55 + 0.45 * Math.sin(t * 3.4 + i * 1.9))
      if (tw < 0.03) continue
      ctx.globalAlpha = a * tw
      drawPixelStar(ctx, x + [-150, -40, 70, 170, 20][i], y - [150, 210, 170, 120, 290][i] + 8 * Math.sin(t * 2 + i), 21 + 7 * (i % 2), i % 3, i % 2 ? '#fff3e0' : '#c9a6ff')
    }
    ctx.globalAlpha = a * clamp((tt - 0.65) * 3)
    ctx.save(); ctx.translate(x - 190, y - 130 + 10 * Math.sin(t * 1.5)); ctx.rotate(-0.4)
    ctx.beginPath(); ctx.arc(0, 0, 34, -Math.PI / 2, Math.PI / 2); ctx.arc(-14, 0, 30, Math.PI / 2, -Math.PI / 2, true); ctx.closePath(); ink(ctx, GOLD, { w: 5, fa: 0.6 })
    ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── 10 Pluto: a cocoon wobbles, splits, and a butterfly flutters out
function wings(ctx, col1, col2, flap) {
  ctx.save(); ctx.scale(flap, 1)
  for (const s of [-1, 1]) {
    ctx.beginPath(); ctx.ellipse(s * 46, -30, 48, 40, s * -0.5, 0, TAU); ink(ctx, col1, { w: 7, fa: 0.4, glow: 16 })
    ctx.beginPath(); ctx.ellipse(s * 34, 30, 32, 28, s * 0.5, 0, TAU); ink(ctx, col2, { w: 7, fa: 0.4, glow: 16 })
  }
  ctx.restore()
  ctx.beginPath(); ctx.moveTo(0, -46); ctx.lineTo(0, 50); ink(ctx, BONE, { w: 10, fa: 0, glow: 10 })
  ctx.beginPath(); ctx.moveTo(0, -46); ctx.quadraticCurveTo(-10, -80, -26, -88); ctx.moveTo(0, -46); ctx.quadraticCurveTo(10, -80, 26, -88); ink(ctx, BONE, { w: 5, fa: 0, glow: 8 })
}
export function butterfly(ctx, t, tt, a, ox, oy) {
  if (a <= 0.003) return
  const cx = ox + 285, cy = oy + 40
  const pin = easeOutBack(prog(tt, 0.3, 0.62), 2.2)
  if (pin <= 0.001) return
  ctx.save(); ctx.globalAlpha *= a
  const SPLIT = 0.95
  // twig + cocoon
  const co = 1 - ease.inQuad(prog(tt, SPLIT, SPLIT + 0.3))
  if (co > 0.003) {
    ctx.save(); ctx.globalAlpha *= co
    ctx.beginPath(); ctx.moveTo(cx - 90, cy - 150); ctx.lineTo(cx + 90, cy - 170); ink(ctx, '#d9a86c', { w: 9, fa: 0 })
    const wob = tt > 0.55 && tt < SPLIT ? 0.22 * Math.sin((tt - 0.55) * 26) : 0
    ctx.translate(cx, cy - 160); ctx.rotate(wob); ctx.scale(pin * (1 + 0.3 * (1 - co)), pin * (1 + 0.3 * (1 - co)))
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 22); ink(ctx, '#d9a86c', { w: 6, fa: 0 })
    ctx.beginPath(); ctx.ellipse(0, 90, 42, 70, 0, 0, TAU); ink(ctx, '#d9a86c', { w: 8, fa: 0.35 })
    ctx.beginPath(); for (let k = 0; k < 3; k++) { ctx.moveTo(-34, 60 + k * 30); ctx.quadraticCurveTo(0, 72 + k * 30, 34, 60 + k * 30) } ink(ctx, '#d9a86c', { w: 4, fa: 0, glow: 6 })
    ctx.restore()
  }
  const bt = tt - SPLIT
  if (bt > 0) {
    const e = easeOutBack(prog(bt, 0, 0.4), 2.2)
    const bx = cx + 70 * Math.sin(bt * 2.1) - 20, by = cy - 70 - 40 * Math.sin(bt * 4.2) - 60 * ease.outCubic(prog(bt, 0, 0.5))
    const flap = 0.25 + 0.75 * Math.abs(Math.cos(bt * 11))
    begin(ctx, bx, by, e * 1.2, 1, 0.25 * Math.sin(bt * 2.1))
    halo(ctx, 0, 0, 140, LILAC, 0.3)
    wings(ctx, LILAC, PINK, flap)
    ctx.restore()
  }
  ctx.restore()
}

/** Pluto's sticker: "dwarf planet. Still counts." slapped on at an angle */
export function sticker(ctx, t, tt, a, x, y) {
  const p = prog(tt, 0, 0.32)
  if (p <= 0 || a <= 0.003) return
  const s = lerp(1.9, 1, easeOutBack(p, 1.8)), rot = -0.08 + 0.12 * Math.exp(-tt * 6) * Math.sin(tt * 20)
  ctx.save(); ctx.globalAlpha *= a * clamp(p * 4)
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s)
  ctx.shadowColor = 'rgba(6,4,18,0.6)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10
  ctx.beginPath(); ctx.roundRect(-270, -92, 540, 184, 36); ctx.fillStyle = PINK; ctx.fill()
  ctx.shadowColor = 'transparent'
  ctx.lineWidth = 9; ctx.strokeStyle = BONE; ctx.stroke()
  // peeled corner
  ctx.beginPath(); ctx.moveTo(270, 40); ctx.lineTo(222, 92); ctx.lineTo(270, 92); ctx.closePath(); ctx.fillStyle = 'rgba(11,6,32,0.35)'; ctx.fill()
  ctx.beginPath(); ctx.moveTo(270, 40); ctx.quadraticCurveTo(238, 52, 222, 92); ctx.lineTo(270, 40); ctx.fillStyle = '#ffe3ec'; ctx.fill()
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = INK
  ctx.font = "800 58px Inter, sans-serif"; ctx.fillText('dwarf planet.', 0, -34)
  ctx.font = "italic 600 74px 'EB Garamond', serif"; ctx.fillText('Still counts.', 0, 38)
  ctx.restore()
}

// ───────────────────────── hook: a stopwatch whose hand whips round
export function stopwatch(ctx, t, x, y, s, a, spin) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a)
  halo(ctx, 0, 0, 200, GOLD, 0.25)
  ctx.beginPath(); ctx.roundRect(-24, -152, 48, 28, 8); ink(ctx, GOLD, { w: 7, fa: 0.4 })
  ctx.beginPath(); ctx.moveTo(0, -124); ctx.lineTo(0, -112); ink(ctx, GOLD, { w: 9, fa: 0 })
  ctx.save(); ctx.rotate(0.8); ctx.beginPath(); ctx.roundRect(-14, -140, 28, 22, 6); ink(ctx, GOLD, { w: 6, fa: 0.4 }); ctx.restore()
  ctx.beginPath(); ctx.arc(0, 0, 110, 0, TAU); ink(ctx, GOLD, { w: 9, fa: 0.22 })
  ctx.beginPath(); for (let k = 0; k < 12; k++) { const an = k * TAU / 12; ctx.moveTo(Math.cos(an) * 80, Math.sin(an) * 80); ctx.lineTo(Math.cos(an) * 94, Math.sin(an) * 94) } ink(ctx, GOLD, { w: 5, fa: 0, glow: 8 })
  const an = -Math.PI / 2 + spin
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * 84, Math.sin(an) * 84); ink(ctx, '#fff3e0', { w: 8, fa: 0, glow: 16 })
  ctx.beginPath(); ctx.arc(0, 0, 10, 0, TAU); ink(ctx, GOLD, { w: 5, fa: 1 })
  ctx.restore()
}

// ───────────────────────── end: "one you" — a simple pictogram person
export function person(ctx, x, y, s, a) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a)
  halo(ctx, 0, -20, 260, GOLD, 0.32)
  ctx.beginPath(); ctx.arc(0, -120, 58, 0, TAU); ink(ctx, GOLD, { w: 9, fa: 0.4, glow: 24 })
  ctx.beginPath(); ctx.moveTo(-105, 150); ctx.lineTo(-105, 30); ctx.bezierCurveTo(-105, -20, -70, -40, -40, -44); ctx.lineTo(40, -44); ctx.bezierCurveTo(70, -40, 105, -20, 105, 30); ctx.lineTo(105, 150); ctx.closePath()
  ink(ctx, GOLD, { w: 9, fa: 0.4, glow: 24 })
  ctx.restore()
}
