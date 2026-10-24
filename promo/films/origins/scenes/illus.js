// origins · line-art illustrations (bold, friendly, thick glowing strokes, flat 20–40% fills, no faces).
// Every draw fn takes a canvas ctx and draws around (x, y) at scale s; t only drives idle motion (pure fn of t).
import { mix, rng } from '../../../src/lib.js'
import { SIGNS } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', SAND = '#d9a86c', PINK = '#ff8fb1', LEAF = '#5fdc7a', NIGHT = '#3f7cf0'
const VS = '︎'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
export const hexA = (hex, a) => hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0')

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(ctx, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = hexA(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}
function begin(ctx, x, y, s, a = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a }
const glow = (ctx, col, r, a, y = 0) => {
  const g = ctx.createRadialGradient(0, y, 6, 0, y, r); g.addColorStop(0, hexA(col, a)); g.addColorStop(1, hexA(col, 0))
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, y, r, 0, Math.PI * 2); ctx.fill(); ctx.globalCompositeOperation = 'source-over'
}

// ───────────────────────── Babylon
/** a stepped ziggurat; (x, y) = centre of its base. ~520 wide, ~330 tall at s 1 */
export function ziggurat(ctx, x, y, s, t, a = 1) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a)
  glow(ctx, SAND, 380, 0.16, -120)
  const tiers = [[520, 92], [380, 82], [250, 74], [130, 62]]
  let yy = 0
  for (const [w, h] of tiers) {
    ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.lineTo(-w / 2 + 16, yy - h); ctx.lineTo(w / 2 - 16, yy - h); ctx.lineTo(w / 2, yy); ctx.closePath()
    ink(ctx, SAND, { w: 7, fa: 0.3 })
    yy -= h
  }
  // the central stair + side stairs
  ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(-24, yy + 62); ctx.moveTo(34, 0); ctx.lineTo(24, yy + 62)
  for (let k = 1; k < 12; k++) { const v = -k * ((-yy - 62) / 12), hw = 34 - 10 * k / 12; ctx.moveTo(-hw, v); ctx.lineTo(hw, v) }
  ink(ctx, mix(SAND, '#ffffff', 0.3), { w: 4, fa: 0, glow: 6 })
  // a little shrine with a door on top
  ctx.beginPath(); ctx.roundRect(-26, yy - 4, 52, 6, 3); ink(ctx, SAND, { w: 5, fa: 0.4 })
  ctx.beginPath(); ctx.moveTo(-10, yy); ctx.lineTo(-10, yy - 22); ctx.arc(0, yy - 22, 10, Math.PI, 0); ctx.lineTo(10, yy); ink(ctx, GOLD, { w: 5, fa: 0.5, glow: 14 })
  ctx.restore()
}

/** a clay tablet with star marks; marks 0..12 = how many wedge marks are pressed in so far */
export function tablet(ctx, x, y, s, t, { a = 1, marks = 12, rot = -0.08 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a, rot)
  glow(ctx, SAND, 200, 0.14)
  ctx.beginPath(); ctx.roundRect(-95, -125, 190, 250, 34); ink(ctx, SAND, { w: 8, fa: 0.3 })
  const star = (sx, sy, r) => { ctx.beginPath(); for (let k = 0; k < 4; k++) { const an = k * Math.PI / 4; ctx.moveTo(sx - Math.cos(an) * r, sy - Math.sin(an) * r); ctx.lineTo(sx + Math.cos(an) * r, sy + Math.sin(an) * r) } ink(ctx, mix(SAND, '#ffffff', 0.4), { w: 5, fa: 0, glow: 8 }) }
  star(-45, -70, 20); star(20, -85, 14); star(50, -40, 18)
  ctx.beginPath()
  const n = Math.floor(marks)
  for (let i = 0; i < n; i++) { const r = Math.floor(i / 4), c = i % 4; const wx = -55 + c * 36, wy = 0 + r * 34; ctx.moveTo(wx, wy); ctx.lineTo(wx + 18, wy + 10); ctx.moveTo(wx, wy); ctx.lineTo(wx, wy + 20) }
  if (n) ink(ctx, SAND, { w: 5, fa: 0, glow: 6 })
  ctx.restore()
}

// ───────────────────────── Greece
/** a Greek key (meander) strip from x0 to x1 at y, cell size c */
function meander(ctx, x0, x1, y, c) {
  ctx.beginPath()
  for (let x = x0; x + c <= x1 + 0.1; x += c) {
    ctx.moveTo(x, y + c / 2); ctx.lineTo(x, y - c / 2); ctx.lineTo(x + c * 0.75, y - c / 2); ctx.lineTo(x + c * 0.75, y + c * 0.2); ctx.lineTo(x + c * 0.3, y + c * 0.2); ctx.lineTo(x + c * 0.3, y - c * 0.15)
    ctx.moveTo(x, y + c / 2); ctx.lineTo(x + c, y + c / 2)
  }
}
/** a scroll unrolled to `open` (0..1) of its full width w; content(ctx) draws on the paper (clipped) */
export function scroll(ctx, cx, cy, w, h, open, a = 1, content = null) {
  if (a <= 0.003) return
  const half = Math.max(0, (w / 2) * open)
  ctx.save(); ctx.globalAlpha *= a
  // paper
  ctx.beginPath(); ctx.rect(cx - half, cy - h / 2, half * 2, h)
  ctx.fillStyle = hexA(BONE, 0.14); ctx.fill()
  ctx.save(); ctx.clip()
  const g = ctx.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, hexA(GOLD, 0.16)); g.addColorStop(1, hexA(GOLD, 0.03))
  ctx.fillStyle = g; ctx.fillRect(cx - half, cy - h / 2, half * 2, h)
  meander(ctx, cx - w / 2 + 40, cx + w / 2 - 40, cy - h / 2 + 34, 26); ink(ctx, GOLD, { w: 4, fa: 0, glow: 8 })
  meander(ctx, cx - w / 2 + 40, cx + w / 2 - 40, cy + h / 2 - 34, 26); ink(ctx, GOLD, { w: 4, fa: 0, glow: 8 })
  if (content) content(ctx)
  ctx.restore()
  ctx.beginPath(); ctx.moveTo(cx - half, cy - h / 2); ctx.lineTo(cx + half, cy - h / 2); ctx.moveTo(cx - half, cy + h / 2); ctx.lineTo(cx + half, cy + h / 2)
  ink(ctx, BONE, { w: 6, fa: 0, glow: 14 })
  // rollers (rods with knobs)
  for (const sx of [-1, 1]) {
    const rx = cx + sx * half
    ctx.beginPath(); ctx.roundRect(rx - 22, cy - h / 2 - 22, 44, h + 44, 22); ink(ctx, GOLD, { w: 7, fa: 0.35 })
    for (const sy of [-1, 1]) { ctx.beginPath(); ctx.arc(rx, cy + sy * (h / 2 + 40), 16, 0, Math.PI * 2); ink(ctx, GOLD, { w: 6, fa: 0.5 }) }
  }
  ctx.restore()
}

// little animal doodles (facing right; no faces). step = walk phase (radians)
const legs = (ctx, xs, y0, len, step, col) => {
  ctx.beginPath()
  xs.forEach((lx, i) => { const sw = Math.sin(step + (i % 2 ? Math.PI : 0)) * 12; ctx.moveTo(lx, y0); ctx.lineTo(lx + sw, y0 + len) })
  ink(ctx, col, { w: 8, fa: 0, glow: 12 })
}
export function ram(ctx, x, y, s, t, { a = 1, step = 0, flip = 1 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = SIGNS[0].color
  begin(ctx, x, y, s, a); ctx.scale(flip, 1)
  glow(ctx, col, 150, 0.18)
  legs(ctx, [-50, -22, 18, 44], 30, 44, step, col)
  // woolly body: a scalloped ellipse
  ctx.beginPath()
  const N = 12
  for (let i = 0; i <= N; i++) {
    const an = (i / N) * Math.PI * 2, px = Math.cos(an) * 72, py = Math.sin(an) * 44
    if (!i) { ctx.moveTo(px - 8, py); continue }
    const am = ((i - 0.5) / N) * Math.PI * 2
    ctx.quadraticCurveTo(Math.cos(am) * 92, Math.sin(am) * 60, px, py)
  }
  ctx.closePath(); ink(ctx, col, { w: 7, fa: 0.3 })
  // head + curled horn
  ctx.beginPath(); ctx.ellipse(82, -30, 28, 20, 0.45, 0, Math.PI * 2); ink(ctx, col, { w: 7, fa: 0.45 })
  ctx.beginPath()
  for (let k = 0; k <= 40; k++) { const u = k / 40, an = -Math.PI * 0.6 + u * Math.PI * 2.4, r = 26 * (1 - 0.65 * u); const px = 70 + Math.cos(an) * r, py = -44 + Math.sin(an) * r; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py) }
  ink(ctx, '#ffc861', { w: 7, fa: 0, glow: 12 })
  ctx.restore()
}
export function bull(ctx, x, y, s, t, { a = 1, step = 0, flip = 1 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = SIGNS[1].color
  begin(ctx, x, y, s, a); ctx.scale(flip, 1)
  glow(ctx, col, 150, 0.18)
  legs(ctx, [-58, -30, 20, 46], 32, 42, step, col)
  // tail with a tuft
  ctx.beginPath(); ctx.moveTo(-82, -18); ctx.quadraticCurveTo(-112, -6 + 6 * Math.sin(t * 5), -104, 26); ink(ctx, col, { w: 6, fa: 0 })
  ctx.beginPath(); ctx.arc(-104, 32, 8, 0, Math.PI * 2); ink(ctx, col, { w: 5, fa: 0.6 })
  ctx.beginPath(); ctx.roundRect(-84, -44, 150, 82, 34); ink(ctx, col, { w: 7, fa: 0.3 })
  // head (a chunky muzzle block) + crescent horns
  ctx.beginPath(); ctx.roundRect(58, -50, 54, 62, 22); ink(ctx, col, { w: 7, fa: 0.45 })
  ctx.beginPath(); ctx.moveTo(62, -46); ctx.quadraticCurveTo(48, -88, 74, -94); ctx.moveTo(106, -46); ctx.quadraticCurveTo(122, -88, 98, -96)
  ink(ctx, BONE, { w: 7, fa: 0, glow: 12 })
  ctx.restore()
}
export function lion(ctx, x, y, s, t, { a = 1, step = 0, flip = 1 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = SIGNS[4].color
  begin(ctx, x, y, s, a); ctx.scale(flip, 1)
  glow(ctx, col, 150, 0.18)
  legs(ctx, [-54, -28, 22, 46], 26, 46, step, col)
  // tail curling up, with a tuft
  ctx.beginPath(); ctx.moveTo(-80, 0); ctx.bezierCurveTo(-120, -10, -110, -60, -96 + 6 * Math.sin(t * 4), -70); ink(ctx, col, { w: 6, fa: 0 })
  ctx.beginPath(); ctx.arc(-96 + 6 * Math.sin(t * 4), -78, 11, 0, Math.PI * 2); ink(ctx, '#ffc861', { w: 5, fa: 0.6 })
  ctx.beginPath(); ctx.ellipse(-12, 2, 74, 38, 0, 0, Math.PI * 2); ink(ctx, col, { w: 7, fa: 0.3 })
  // the mane: a zig-zag sun around the head
  ctx.beginPath()
  const N = 14
  for (let i = 0; i <= 2 * N; i++) { const an = (i / (2 * N)) * Math.PI * 2 + t * 0.6, r = i % 2 ? 34 : 50; const px = 74 + Math.cos(an) * r, py = -34 + Math.sin(an) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py) }
  ctx.closePath(); ink(ctx, '#ffc861', { w: 6, fa: 0.3, fill: col })
  ctx.beginPath(); ctx.arc(74, -34, 26, 0, Math.PI * 2); ink(ctx, col, { w: 6, fa: 0.55 })
  ctx.restore()
}
export function fish(ctx, x, y, s, t, { a = 1, step = 0, flip = 1 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = SIGNS[11].color
  begin(ctx, x, y + 6 * Math.sin(step * 0.5), s, a); ctx.scale(flip, 1); ctx.rotate(0.08 * Math.sin(step))
  glow(ctx, col, 150, 0.2)
  const wag = 14 * Math.sin(step * 1.5)
  // tail
  ctx.beginPath(); ctx.moveTo(-58, 0); ctx.lineTo(-104, -40 + wag); ctx.quadraticCurveTo(-92, wag * 0.5, -104, 40 + wag); ctx.closePath(); ink(ctx, col, { w: 7, fa: 0.35 })
  // body (an almond)
  ctx.beginPath(); ctx.moveTo(84, 0); ctx.bezierCurveTo(50, -64, -40, -62, -66, 0); ctx.bezierCurveTo(-40, 62, 50, 64, 84, 0); ctx.closePath(); ink(ctx, '#8f88ff', { w: 7, fa: 0.3, fill: col })
  // fin + gill arc + scales
  ctx.beginPath(); ctx.moveTo(-6, -46); ctx.quadraticCurveTo(10, -80, 34, -44); ink(ctx, col, { w: 6, fa: 0.3 })
  ctx.beginPath(); for (const [sx, sy] of [[-34, -12], [-14, 0], [-34, 14], [6, -12], [6, 14]]) { ctx.moveTo(sx - 10, sy - 10); ctx.quadraticCurveTo(sx + 4, sy, sx - 10, sy + 10) } ink(ctx, '#cfd0ff', { w: 4, fa: 0, glow: 6 })
  ctx.restore()
  // bubbles
  ctx.save(); ctx.globalAlpha *= a
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.8 + i / 3) % 1); ctx.beginPath(); ctx.arc(x + flip * s * (96 + 10 * i), y - s * (30 + ph * 90), s * (6 + 3 * i) * (1 - ph * 0.5), 0, Math.PI * 2); ctx.globalAlpha = a * (1 - ph); ink(ctx, '#cfd0ff', { w: 3, fa: 0, glow: 6 }) }
  ctx.restore()
}
export const ANIMALS = [ram, bull, lion, fish]
export const ANIMAL_COLORS = [SIGNS[0].color, SIGNS[1].color, SIGNS[4].color, SIGNS[11].color]

/** a closed, rolled-up scroll with a ribbon */
export function rolled(ctx, x, y, s, a = 1, rot = 0) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a, rot)
  ctx.beginPath(); ctx.roundRect(-34, -110, 68, 220, 30); ink(ctx, BONE, { w: 7, fa: 0.25 })
  for (const sy of [-1, 1]) { ctx.beginPath(); ctx.arc(0, sy * 128, 16, 0, Math.PI * 2); ink(ctx, GOLD, { w: 6, fa: 0.5 }) }
  ctx.beginPath(); ctx.moveTo(-36, 0); ctx.lineTo(36, 0); ctx.moveTo(30, 0); ctx.lineTo(56, 34); ctx.moveTo(30, 0); ctx.lineTo(62, 12); ink(ctx, PINK, { w: 6, fa: 0, glow: 12 })
  ctx.restore()
}

// ───────────────────────── spring
/** the equal day / night disc: gold day half with a sun, blue night half with a crescent. tilt in radians */
export function dayNight(ctx, x, y, s, t, { a = 1, tilt = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a, tilt)
  const R = 150
  glow(ctx, GOLD, 300, 0.16)
  ctx.beginPath(); ctx.moveTo(0, -R); ctx.arc(0, 0, R, -Math.PI / 2, Math.PI / 2, true); ctx.closePath(); ink(ctx, GOLD, { w: 0.01, fa: 0.32, glow: 0 })
  ctx.beginPath(); ctx.moveTo(0, -R); ctx.arc(0, 0, R, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ink(ctx, NIGHT, { w: 0.01, fa: 0.4, glow: 0 })
  // sun (rays turn slowly)
  ctx.save(); ctx.translate(-72, 0)
  ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2); ink(ctx, '#ffd98a', { w: 6, fa: 0.7, glow: 20 })
  ctx.rotate(t * 0.6); ctx.beginPath()
  for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4; ctx.moveTo(Math.cos(an) * 42, Math.sin(an) * 42); ctx.lineTo(Math.cos(an) * 56, Math.sin(an) * 56) }
  ink(ctx, '#ffd98a', { w: 6, fa: 0, glow: 14 }); ctx.restore()
  // crescent + two stars
  ctx.save(); ctx.translate(70, 0)
  ctx.beginPath(); ctx.arc(0, 0, 40, Math.PI * 0.25, Math.PI * 1.75); ctx.arc(18, -2, 32, Math.PI * 1.55, Math.PI * 0.45, true); ctx.closePath(); ink(ctx, '#e3ecff', { w: 6, fa: 0.6, glow: 18 })
  ctx.restore()
  for (const [sx, sy, r] of [[96, -70, 9], [104, 62, 7], [40, 92, 6]]) { ctx.beginPath(); ctx.moveTo(sx - r, sy); ctx.lineTo(sx + r, sy); ctx.moveTo(sx, sy - r); ctx.lineTo(sx, sy + r); ink(ctx, '#e3ecff', { w: 4, fa: 0, glow: 8 }) }
  ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.moveTo(0, -R); ctx.lineTo(0, R); ink(ctx, BONE, { w: 8, fa: 0, glow: 18 })
  ctx.restore()
}
/** one five-petal blossom */
export function blossom(ctx, x, y, s, t, a = 1, col = PINK) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a, t * 0.3)
  for (let i = 0; i < 5; i++) { const an = i * Math.PI * 2 / 5 - Math.PI / 2; ctx.beginPath(); ctx.ellipse(Math.cos(an) * 26, Math.sin(an) * 26, 22, 15, an, 0, Math.PI * 2); ink(ctx, col, { w: 5, fa: 0.45, glow: 12 }) }
  ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2); ink(ctx, GOLD, { w: 5, fa: 0.85, glow: 12 })
  ctx.restore()
}
/** a blossom branch growing from the left edge; grow 0..1 draws the twig, blooms[i] 0..1 opens each flower */
export const BRANCH_FLOWERS = [[230, 1188, 0.9], [380, 1128, 1.15], [470, 1218, 0.85], [560, 1100, 1.0], [655, 1160, 1.25]]
export function branch(ctx, t, grow, blooms, a = 1) {
  if (a <= 0.003 || grow <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  const sway = 6 * Math.sin(t * 1.4)
  const twig = () => { ctx.beginPath(); ctx.moveTo(-20, 1240); ctx.bezierCurveTo(200, 1230, 420, 1180 + sway, 700, 1140 + sway) }
  const sub = () => { ctx.beginPath(); ctx.moveTo(300, 1220); ctx.quadraticCurveTo(360, 1170, 390, 1132); ctx.moveTo(430, 1196); ctx.quadraticCurveTo(470, 1210, 476, 1222); ctx.moveTo(520, 1170); ctx.quadraticCurveTo(540, 1130, 560 + sway * 0.4, 1104) }
  ctx.setLineDash([900 * grow, 3000]); twig(); ink(ctx, '#c98a5a', { w: 11, fa: 0, glow: 10 })
  ctx.setLineDash([300 * Math.max(0, grow * 2 - 1), 3000]); sub(); ink(ctx, '#c98a5a', { w: 7, fa: 0, glow: 8 }); ctx.setLineDash([])
  // leaves
  const leaf = (lx, ly, an, L, k) => { if (k <= 0) return; ctx.save(); ctx.translate(lx, ly); ctx.rotate(an); ctx.scale(k, k); ctx.beginPath(); ctx.ellipse(L * 0.5, 0, L * 0.5, L * 0.2, 0, 0, Math.PI * 2); ink(ctx, LEAF, { w: 5, fa: 0.4, glow: 10 }); ctx.restore() }
  const lk = Math.max(0, Math.min(1, grow * 1.4 - 0.4))
  leaf(150, 1232, -2.2, 60, lk); leaf(330, 1206, 0.7, 56, lk); leaf(600, 1150 + sway, -2.4, 58, lk); leaf(690, 1140 + sway, -0.4, 50, lk)
  ctx.restore()
  BRANCH_FLOWERS.forEach(([fx, fy, sc], i) => blossom(ctx, fx, fy + (i > 2 ? sway : sway * 0.5), sc * blooms[i], t + i, a))
}
/** the "0°" stamp: a gold double ring, ♈ and 0° */
export function badge0(ctx, x, y, s, t, { a = 1, rot = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a, rot)
  const red = SIGNS[0].color
  glow(ctx, red, 260, 0.22)
  ctx.beginPath(); ctx.arc(0, 0, 138, 0, Math.PI * 2); ink(ctx, GOLD, { w: 9, fa: 0.0, glow: 22 })
  ctx.beginPath(); ctx.arc(0, 0, 118, 0, Math.PI * 2); ink(ctx, GOLD, { w: 4, fa: 0.16, glow: 8, fill: red })
  // tick marks round the rim
  ctx.beginPath(); for (let i = 0; i < 24; i++) { const an = i * Math.PI / 12; ctx.moveTo(Math.cos(an) * 124, Math.sin(an) * 124); ctx.lineTo(Math.cos(an) * 132, Math.sin(an) * 132) } ink(ctx, GOLD, { w: 3, fa: 0, glow: 4 })
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.shadowColor = red; ctx.shadowBlur = 24; ctx.fillStyle = red; ctx.font = `bold 108px ${GLYPH_FONT}`; ctx.fillText('♈' + VS, 0, -30)
  ctx.shadowColor = 'rgba(6,4,18,0.9)'; ctx.shadowBlur = 12; ctx.fillStyle = BONE; ctx.font = `800 76px ${INTER}`; ctx.fillText('0°', 6, 62)
  ctx.restore()
}

// ───────────────────────── the wobble
/** a spinning top painted like Earth. tip (x, y) on the floor; tilt (rad) and prec (rad) set the axis; spin turns the continents */
export function earthTop(ctx, x, y, s, t, { a = 1, tilt = 0.41, prec = 0, spin = 0, trace = 1 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a)
  // floor shadow
  ctx.save(); ctx.scale(1, 0.28); ctx.beginPath(); ctx.arc(0, 0, 90, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fill(); ctx.restore()
  const ax = Math.sin(tilt) * Math.cos(prec), ay = -Math.cos(tilt) + 0.32 * Math.sin(tilt) * Math.sin(prec)
  const L = Math.hypot(ax, ay), ux = ax / L, uy = ay / L
  const C = 150, R = 92, STEM = 270
  const cx = ux * C, cy = uy * C
  // the precession circle traced by the stem top (dashed ellipse)
  if (trace > 0) {
    const ty = -Math.cos(tilt) * STEM, rx = Math.sin(tilt) * STEM
    ctx.save(); ctx.globalAlpha *= trace; ctx.setLineDash([14, 14]); ctx.lineDashOffset = -t * 30
    ctx.beginPath(); ctx.ellipse(0, ty, rx, rx * 0.32, 0, 0, Math.PI * 2); ink(ctx, GOLD, { w: 4, fa: 0, glow: 10 }); ctx.restore()
  }
  // the cone from the tip to the globe
  const nx = -uy, ny = ux
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(cx + nx * R * 0.7 - ux * R * 0.55, cy + ny * R * 0.7 - uy * R * 0.55); ctx.lineTo(cx - nx * R * 0.7 - ux * R * 0.55, cy - ny * R * 0.7 - uy * R * 0.55); ctx.closePath()
  ink(ctx, GOLD, { w: 6, fa: 0.3 })
  // the stem
  ctx.beginPath(); ctx.moveTo(cx + ux * R * 0.8, cy + uy * R * 0.8); ctx.lineTo(ux * STEM, uy * STEM); ink(ctx, BONE, { w: 9, fa: 0, glow: 14 })
  ctx.beginPath(); ctx.arc(ux * STEM, uy * STEM, 12, 0, Math.PI * 2); ink(ctx, GOLD, { w: 5, fa: 0.8 })
  // the globe
  ctx.save(); ctx.translate(cx, cy)
  const gg = ctx.createRadialGradient(-30, -36, 8, 0, 0, R); gg.addColorStop(0, '#9fd0ff'); gg.addColorStop(0.55, '#4f9cf0'); gg.addColorStop(1, '#2350a8')
  ctx.globalAlpha *= 0.92; ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill()
  ctx.save(); ctx.clip(); ctx.rotate(Math.atan2(uy, ux) + Math.PI / 2)
  ctx.fillStyle = 'rgba(80,210,150,0.8)'
  for (const [lx, ly, rx, ry] of [[-40, -30, 34, 22], [30, 10, 28, 36], [-10, 50, 30, 16], [60, -40, 18, 14], [-70, 30, 16, 26]]) {
    const ox = ((lx + spin * 60) % 280 + 280) % 280 - 140
    ctx.beginPath(); ctx.ellipse(ox, ly, rx, ry, 0.3, 0, Math.PI * 2); ctx.fill()
  }
  // equator band (spins with it)
  ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 0, R, R * 0.22, 0, 0, Math.PI * 2); ctx.stroke()
  ctx.restore()
  ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ink(ctx, BONE, { w: 7, fa: 0, glow: 18 })
  ctx.restore()
  ctx.restore()
}

/** 12 constellation-ish dot patterns (seeded), one per slot, in local polar coords (dAng°, dr) */
export const CONSTELLATIONS = (() => {
  const r = rng(4321)
  return SIGNS.map(() => {
    const n = 4 + Math.floor(r() * 2)
    return Array.from({ length: n }, (_, k) => ({ da: -11 + 22 * (k / (n - 1)) + (r() - 0.5) * 4, dr: (r() - 0.5) * 50, big: r() > 0.6 }))
  })
})()

// ───────────────────────── season icons (≈ 90 px at s 1)
export function seasonIcon(ctx, kind, x, y, s, t, a = 1) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a)
  ctx.beginPath(); ctx.arc(0, 0, 56, 0, Math.PI * 2); ctx.fillStyle = 'rgba(14,10,32,0.88)'; ctx.fill()
  if (kind === 0) { ctx.restore(); blossom(ctx, x, y, 0.95 * s, t, a); begin(ctx, x, y, s, a) }
  else if (kind === 1) {
    ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2); ink(ctx, '#ffd98a', { w: 5, fa: 0.7, glow: 16 })
    ctx.save(); ctx.rotate(t * 0.8); ctx.beginPath(); for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4; ctx.moveTo(Math.cos(an) * 30, Math.sin(an) * 30); ctx.lineTo(Math.cos(an) * 42, Math.sin(an) * 42) } ink(ctx, '#ffd98a', { w: 5, fa: 0, glow: 12 }); ctx.restore()
  } else if (kind === 2) {
    ctx.rotate(-0.6 + 0.12 * Math.sin(t * 2.4))
    ctx.beginPath(); ctx.moveTo(0, -40); ctx.bezierCurveTo(34, -20, 30, 24, 0, 40); ctx.bezierCurveTo(-30, 24, -34, -20, 0, -40); ink(ctx, '#f29a4a', { w: 5, fa: 0.45, glow: 14 })
    ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, 50); ctx.moveTo(0, -6); ctx.lineTo(14, -18); ctx.moveTo(0, 10); ctx.lineTo(-14, -2); ink(ctx, '#ffc861', { w: 4, fa: 0, glow: 6 })
  } else {
    ctx.rotate(t * 0.4); ctx.beginPath()
    for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3, c = Math.cos(an), sn = Math.sin(an); ctx.moveTo(0, 0); ctx.lineTo(c * 40, sn * 40); const bx = c * 24, by = sn * 24; ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(an + 0.8) * 12, by + Math.sin(an + 0.8) * 12); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(an - 0.8) * 12, by + Math.sin(an - 0.8) * 12) }
    ink(ctx, '#bfe8ff', { w: 5, fa: 0, glow: 14 })
  }
  ctx.restore()
}
export { MONO, INTER, GLYPH_FONT, VS }
