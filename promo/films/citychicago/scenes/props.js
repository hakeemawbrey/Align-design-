// citychicago · line-art props: snow + wind, a generic skyline with an elevated train, a bundled-up pictogram, a heart.
// Bold, friendly, thick glowing strokes over flat fills; generic shapes (no logos), no faces. Pure functions of their args.
import { clamp, lerp, rng, hexToRgb, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', FIRE = '#f0603a', ICE = '#8fd8f6', SILVER = '#e3ecff', VIOLET = '#c9a6ff', SNOW = '#f4f8ff', NIGHT = '#120d2a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
const TAU = Math.PI * 2
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(x, col, { w = 8, fa = 0.3, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}

// ───────────────────────── pixel-star sparkle burst
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  x.restore()
}

// ───────────────────────── snow + wind (pure f(t))
// gusts: [start, push px]; the wind offset is a smooth integral, so flakes never jump
export function windOff(t, gusts) {
  let o = 55 * t
  for (const [g, A] of gusts) o += A * ease.inOutCubic(prog(t, g, g + 0.75))
  return o
}
/** 0..1 envelope of how hard it is gusting right now */
export function gustEnv(t, gusts) {
  let e = 0
  for (const [g] of gusts) e = Math.max(e, Math.sin(Math.PI * prog(t, g - 0.05, g + 0.85)))
  return e
}
const FLAKES = (() => {
  const r = rng(77), out = []
  for (let i = 0; i < 150; i++) {
    const d = 0.35 + 0.65 * r()
    out.push({ x0: r() * 1160, y0: r() * 2000, d, sp: 110 + 190 * d, ph: r() * TAU, w: 0.8 + r() * 1.6, kind: Math.floor(r() * 3), big: r() < 0.16, warm: SPARK[Math.floor(r() * SPARK.length)] })
  }
  return out
})()
/** a little six-arm crystal */
function crystal(x, px, py, s, rot, a) {
  x.save(); x.translate(px, py); x.rotate(rot); x.globalAlpha = a
  x.strokeStyle = SNOW; x.lineWidth = Math.max(2, s * 0.16); x.lineCap = 'round'; x.shadowColor = SNOW; x.shadowBlur = 8
  x.beginPath()
  for (let k = 0; k < 6; k++) {
    const c = Math.cos(k * TAU / 6), sn = Math.sin(k * TAU / 6)
    x.moveTo(0, 0); x.lineTo(c * s, sn * s)
    const bx = c * s * 0.6, by = sn * s * 0.6, c2 = Math.cos(k * TAU / 6 + 0.6) * s * 0.3, s2 = Math.sin(k * TAU / 6 + 0.6) * s * 0.3, c3 = Math.cos(k * TAU / 6 - 0.6) * s * 0.3, s3 = Math.sin(k * TAU / 6 - 0.6) * s * 0.3
    x.moveTo(bx, by); x.lineTo(bx + c2, by + s2); x.moveTo(bx, by); x.lineTo(bx + c3, by + s3)
  }
  x.stroke(); x.restore()
}
/** snow; each flake becomes a warm pixel sparkle at warmAt(px,py) (or never if null). alpha a */
export function drawSnow(x, t, { gusts, a = 1, warmAt = null, near = [0, 1] }) {
  if (a <= 0) return
  const wo = windOff(t, gusts), ge = gustEnv(t, gusts)
  x.save()
  FLAKES.forEach((f, i) => {
    if (f.d < near[0] || f.d >= near[1]) return
    const px = ((f.x0 + wo * f.d * 1.4 + Math.sin(t * f.w + f.ph) * 22) % 1160 + 1160) % 1160 - 40
    const py = ((f.y0 + t * f.sp) % 2000 + 2000) % 2000 - 40
    const wt = warmAt ? warmAt(px, py) : Infinity
    const wk = clamp((t - wt) / 0.3)
    if (wk < 1) {
      const fa = a * (0.45 + 0.55 * f.d) * (1 - wk)
      if (f.big) crystal(x, px, py, 10 + 9 * f.d, t * f.w + f.ph, fa)
      else {
        // streak a little in the gusts
        const L = ge * 34 * f.d
        x.globalAlpha = fa; x.strokeStyle = SNOW; x.lineCap = 'round'; x.lineWidth = 4 + 7 * f.d
        x.beginPath(); x.moveTo(px - L, py - L * 0.18); x.lineTo(px + 0.01, py); x.stroke()
      }
    }
    if (wk > 0) {
      const tw = 0.65 + 0.35 * Math.sin(t * 7 + f.ph * 3)
      x.globalAlpha = a * wk * tw
      const pop = 1 + 0.6 * Math.sin(Math.PI * clamp(wk))
      drawPixelStar(x, px, py, (14 + 18 * f.d) * pop, f.kind, f.warm)
    }
  })
  x.restore()
}
/** curly wind streaks across the frame during a gust (p 0..1 through it) */
export function drawGust(x, p, seed = 1, y0 = 900) {
  if (p <= 0 || p >= 1) return
  const r = rng(seed)
  x.save(); x.lineCap = 'round'
  for (let k = 0; k < 4; k++) {
    const y = y0 + (r() - 0.5) * 900, len = 360 + r() * 260, lag = r() * 0.25
    const q = clamp((p - lag) / (1 - lag))
    if (q <= 0 || q >= 1) continue
    const head = lerp(-len, 1080 + len, ease.inOutQuad(q))
    x.globalAlpha = 0.75 * Math.sin(Math.PI * q)
    x.strokeStyle = SNOW; x.lineWidth = 7; x.shadowColor = SNOW; x.shadowBlur = 14
    x.beginPath()
    for (let j = 0; j <= 24; j++) {
      const u = j / 24, xx = head - len * (1 - u), yy = y + Math.sin(u * 5 + k) * 18
      j ? x.lineTo(xx, yy) : x.moveTo(xx, yy)
    }
    // a curl at the head
    for (let j = 0; j <= 16; j++) { const a = -Math.PI / 2 + j / 16 * TAU * 0.85, rr = 34 * (1 - j / 22); x.lineTo(head + Math.cos(a) * rr, y + Math.sin(a) * rr) }
    x.stroke()
  }
  x.restore()
}

// ───────────────────────── the skyline (generic towers) + an elevated train, standing on BASE
const TOWERS = (() => {
  const r = rng(12), out = []
  const spec = [[-20, 120, 330], [95, 105, 470], [195, 130, 380], [320, 95, 560], [410, 120, 430], [525, 110, 380], [630, 135, 760, 'tall'], [760, 100, 520, 'spire'], [855, 120, 410], [970, 130, 600]]
  for (const [xx, w, h, kind] of spec) {
    const win = []
    for (let yy = 30; yy < h - 20; yy += 34) for (let xx2 = 16; xx2 < w - 18; xx2 += 26) if (r() < 0.36) win.push([xx2, yy, r()])
    out.push({ x: xx, w, h, kind, win })
  }
  return out
})()
export function drawSkyline(x, t, { base = 1700, a = 1, lit = 1 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  for (const T of TOWERS) {
    const top = base - T.h
    x.beginPath(); x.rect(T.x, top, T.w, T.h)
    if (T.kind === 'tall') {
      // stepped tower with two masts
      x.rect(T.x + 14, top - 70, T.w - 28, 70); x.rect(T.x + 34, top - 120, T.w - 68, 50)
      x.moveTo(T.x + 46, top - 120); x.lineTo(T.x + 46, top - 240); x.moveTo(T.x + T.w - 46, top - 120); x.lineTo(T.x + T.w - 46, top - 220)
    }
    if (T.kind === 'spire') { x.moveTo(T.x + 10, top); x.lineTo(T.x + T.w / 2, top - 110); x.lineTo(T.x + T.w - 10, top) }
    x.fillStyle = NIGHT; x.fill()
    ink(x, rgba(VIOLET, 0.85), { w: 4, fa: 0, glow: 12 })
    // lit windows
    for (const [wx, wy, s] of T.win) {
      const on = 0.55 + 0.45 * Math.sin(t * (0.6 + s) + s * 40)
      x.fillStyle = rgba(s > 0.7 ? ICE : GOLD, (0.35 + 0.5 * on) * lit)
      x.fillRect(T.x + wx, top + wy, 12, 16)
    }
    // snow cap
    x.beginPath(); x.roundRect(T.x - 4, top - 9, T.w + 8, 16, 8); x.fillStyle = rgba(SNOW, 0.9); x.fill()
  }
  // mast lights blink
  const tall = TOWERS.find(T => T.kind === 'tall'), top = base - tall.h
  const bl = 0.5 + 0.5 * Math.sin(t * 5)
  for (const [mx, my] of [[tall.x + 46, top - 240], [tall.x + tall.w - 46, top - 220]]) { x.beginPath(); x.arc(mx, my, 7, 0, TAU); x.fillStyle = rgba('#ff5a4a', 0.4 + 0.6 * bl); x.shadowColor = '#ff5a4a'; x.shadowBlur = 16 * bl; x.fill(); x.shadowBlur = 0 }
  x.restore()
}
/** the elevated track (beam on lattice legs) + a 3-car train whose nose is at trainX */
export function drawEl(x, t, { y = 1530, base = 1700, trainX = -9999, a = 1 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  // legs with X braces
  x.strokeStyle = rgba(VIOLET, 0.8); x.lineWidth = 5
  for (let lx = 40; lx < 1080; lx += 170) {
    x.beginPath(); x.moveTo(lx, y + 20); x.lineTo(lx, base); x.moveTo(lx + 40, y + 20); x.lineTo(lx + 40, base)
    for (let yy = y + 20; yy < base - 30; yy += 44) { x.moveTo(lx, yy); x.lineTo(lx + 40, yy + 44); x.moveTo(lx + 40, yy); x.lineTo(lx, yy + 44) }
    x.stroke()
  }
  // train
  for (let c = 0; c < 3; c++) {
    const cx = trainX - c * 250 - 236
    if (cx > 1100 || cx < -260) continue
    x.beginPath(); x.roundRect(cx, y - 84, 236, 82, c === 0 ? [10, 34, 10, 10] : 10)
    ink(x, SILVER, { w: 6, fa: 0.85, glow: 16, fill: '#3a3f6a' })
    x.fillStyle = rgba('#ffe7a8', 0.95)
    for (let wx = 18; wx < 210; wx += 46) x.fillRect(cx + wx, y - 68, 30, 28)
    x.fillStyle = rgba(FIRE, 0.9); x.fillRect(cx + 6, y - 26, 224, 8)
    if (c === 0) { x.beginPath(); x.arc(cx + 224, y - 20, 8, 0, TAU); x.fillStyle = '#fff3c8'; x.shadowColor = '#fff3c8'; x.shadowBlur = 24; x.fill(); x.shadowBlur = 0 }
  }
  // the beam
  x.beginPath(); x.rect(-10, y, 1100, 22); ink(x, rgba(VIOLET, 0.9), { w: 5, fa: 0, glow: 10 }); x.fillStyle = NIGHT; x.fill()
  x.fillStyle = rgba(SNOW, 0.85); x.beginPath(); x.roundRect(-10, y - 4, 1100, 9, 4); x.fill()
  x.restore()
}
/** the snowy ground: a drift from top down to the bottom of the frame */
export function drawGround(x, t, { top = 1700, a = 1 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  x.beginPath(); x.moveTo(-20, top + 20)
  for (let i = 0; i <= 12; i++) { const px = -20 + i * 95; x.quadraticCurveTo(px + 47, top - 26 + (i % 3) * 10, px + 95, top + 6 * Math.sin(i)) }
  x.lineTo(1100, 1940); x.lineTo(-20, 1940); x.closePath()
  const g = x.createLinearGradient(0, top - 30, 0, 1920); g.addColorStop(0, '#d9e6ff'); g.addColorStop(0.25, '#7f8fc4'); g.addColorStop(1, '#2a2650')
  x.fillStyle = g; x.fill()
  x.shadowColor = SNOW; x.shadowBlur = 24; x.strokeStyle = SNOW; x.lineWidth = 6; x.stroke(); x.shadowBlur = 0
  x.restore()
}

// ───────────────────────── a bundled-up pictogram (feet at 0,0; ~300 tall); no face, just a slit between hat and scarf
// coat, scarf, hat colours; wind 0..1 blows the scarf tail out sideways; breath puffs every ~0.9 s while cold
export function bundled(x, t, { coat = ICE, scarf = FIRE, hat = PINK, wind = 0, cold = 1, flip = 1, scarfTail = 1 } = {}) {
  x.save()
  // boots + legs
  for (const s of [-1, 1]) { x.beginPath(); x.roundRect(s * 26 - 20, -44, 40, 44, [8, 8, 14, 14]); ink(x, coat, { w: 7, fa: 0.75, glow: 10, fill: '#2a2650' }) }
  // puffy coat
  x.beginPath(); x.moveTo(-58, -40)
  x.quadraticCurveTo(-74, -120, -58, -178); x.quadraticCurveTo(-40, -205, 0, -205); x.quadraticCurveTo(40, -205, 58, -178); x.quadraticCurveTo(74, -120, 58, -40)
  x.quadraticCurveTo(0, -26, -58, -40); x.closePath()
  ink(x, coat, { w: 9, fa: 0.42, glow: 22 })
  // quilting
  x.strokeStyle = rgba(coat, 0.85); x.lineWidth = 5; x.lineCap = 'round'
  for (const yy of [-80, -122, -162]) { x.beginPath(); x.moveTo(-62, yy); x.quadraticCurveTo(0, yy + 14, 62, yy); x.stroke() }
  x.beginPath(); x.moveTo(0, -200); x.lineTo(0, -40); x.stroke()
  // arms hugging the body
  for (const s of [-1, 1]) {
    x.beginPath(); x.moveTo(s * 56, -178); x.quadraticCurveTo(s * 86, -130, s * 30, -112)
    ink(x, coat, { w: 26, fa: 0, glow: 12 })
    x.beginPath(); x.arc(s * 24, -112, 15, 0, TAU); ink(x, scarf, { w: 6, fa: 0.9, glow: 10 })
  }
  // head: dark face slit between the hat and the scarf
  x.beginPath(); x.arc(0, -244, 42, 0, TAU); x.fillStyle = '#1a1430'; x.fill(); ink(x, coat, { w: 6, fa: 0, glow: 10 })
  // hat (beanie with ribbed brim + pompom)
  x.beginPath(); x.moveTo(-44, -252); x.quadraticCurveTo(-44, -300, 0, -302); x.quadraticCurveTo(44, -300, 44, -252); x.closePath(); ink(x, hat, { w: 7, fa: 0.8, glow: 16 })
  x.beginPath(); x.roundRect(-48, -262, 96, 20, 9); ink(x, hat, { w: 6, fa: 0.95, glow: 10 })
  const pb = Math.sin(t * 9) * 3 * cold + wind * 14 * flip
  x.beginPath(); x.arc(pb, -312, 16, 0, TAU); ink(x, BONE, { w: 5, fa: 0.95, glow: 14 })
  // scarf wrap up to the eyes
  x.beginPath(); x.roundRect(-50, -236, 100, 40, 16); ink(x, scarf, { w: 7, fa: 0.92, glow: 16 })
  x.strokeStyle = rgba('#ffffff', 0.35); x.lineWidth = 4
  for (const xx of [-28, -6, 16, 38]) { x.beginPath(); x.moveTo(xx, -232); x.lineTo(xx - 6, -200); x.stroke() }
  // scarf tail: hangs, and blows out sideways in the wind
  if (scarfTail > 0) {
    const flap = Math.sin(t * 16) * 12 * (0.3 + wind)
    const ex = flip * lerp(26, 150, wind), ey = lerp(-120, -214, wind) + flap
    x.beginPath(); x.moveTo(flip * 24, -204)
    x.quadraticCurveTo(flip * lerp(40, 90, wind), lerp(-170, -230, wind) - flap * 0.5, ex, ey)
    x.globalAlpha *= scarfTail
    ink(x, scarf, { w: 24, fa: 0, glow: 12 })
    // fringe
    x.strokeStyle = scarf; x.lineWidth = 4
    for (let k = -1; k <= 1; k++) { x.beginPath(); x.moveTo(ex + k * 6, ey); x.lineTo(ex + k * 6 + flip * 14 * wind, ey + 18 * (1 - wind) + 4); x.stroke() }
  }
  x.restore()
  // breath puffs
  if (cold > 0) {
    x.save()
    for (let k = 0; k < 3; k++) {
      const ph = ((t + k * 0.3) / 0.9) % 1, n = Math.floor((t + k * 0.3) / 0.9)
      if (k > 0) continue
      const px = flip * (50 + ph * 90), py = -226 - ph * 50
      x.globalAlpha = cold * Math.sin(Math.PI * ph) * 0.8
      x.fillStyle = SNOW; x.shadowColor = SNOW; x.shadowBlur = 16
      for (const [dx, dy, r] of [[0, 0, 14], [16, -8, 11], [10, 10, 10]]) { x.beginPath(); x.arc(px + dx * flip * (0.6 + ph), py + dy, r * (0.6 + ph * 0.9), 0, TAU); x.fill() }
      void n
    }
    x.restore()
  }
}

/** a plump heart centred at 0,0 (~2s wide) */
export function heart(x, s, col, a = 1) {
  if (a <= 0 || s <= 0) return
  x.save(); x.globalAlpha *= a; x.scale(s / 60, s / 60)
  x.beginPath(); x.moveTo(0, 42)
  x.bezierCurveTo(-70, -6, -46, -62, 0, -26)
  x.bezierCurveTo(46, -62, 70, -6, 0, 42)
  x.closePath(); ink(x, col, { w: 8, fa: 0.6, glow: 26 })
  x.restore()
}
