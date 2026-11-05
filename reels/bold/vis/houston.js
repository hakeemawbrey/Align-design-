// Houston visuals: generic city shapes only (no logos, team marks, brands, agency marks or stats). See ../SPEC.md.
// Every draw is a pure function of (x, p, s): t drives idle motion, lt/clt drive the springy staggered pop-ins.
//
//   skyline  time: night | sunset | day · haze 0–1 (orange glow, dims the stars) · rocket (a generic rocket climbs)
//            rain · heat (shimmer) · windows (two lit windows link in gold; windowsAt 0–1) · stars (default on at night)
//            extras: label, labelCol
//   map      rings (labels, default ["610", "Beltway 8", "Grand Parkway"]; false = no labels) · hoods (labels popping)
//            pins (true or [labelA, labelB]: two pins drop and link in gold; pinsAt, linkAt) · spin (rings morph into a
//            zodiac wheel; spinAt 0–1) · extras: label
//   freeway  shield ("610" or a list of up to 3) · clock (spins) · label · extras: hero (our gold car, default true), lanes (3–5)
//   food     items: names from taco kolache crawfish pho boba coffee donut bbq tamale burger fries, or { i, label }
//            · extras: labels (default true; false hides the names), spread (stagger end, 0–1), glow (index lifts + sparkles)
//   weather  mode: swap (sun ↔ rain flip; `every` seconds, default 1.1) | sun | rain | heat (melting thermometer)
//            | cold-front | humid (frizz + steam) · person (default true except heat; false, or { col, sign })
//            · extras: label
//   lovebugs n (pairs, 1–8, default 5) · extras: hearts (default true), label
//   bayou    walkers 1 or 2 (default 2) · extras: heart (default true with two walkers), label
//   truck    people 1 or 2 (default 2) · extras: sign (roof sign text, default "TACOS"; false = a taco icon), heart
//            (default true with two people; heartAt 0–1), label
import {
  clamp, lerp, prog, ease, rng, noise1, TAU, BONE, GOLD, PINK, ROSE, BLUE, VIOLET, RED, GREEN, ORANGE, TEAL, MUTED, color, rgba, sign,
  SIGNS, pop01, wob, stagger, ink, line, rr, label, pill, glyph, person, heart, sparkle, twinkles, drawPixelStar, font,
} from '../kit.js'

const SUN = '#ffc94a'
const DARK = '#120c2c'

// ───────────────────────── shared bits
/** an optional pill label at the bottom of the box */
function boxLabel(x, p, s, y = s.bottom - 40) {
  if (!p.label) return
  const k = pop01(s.lt, (p.labelAt ?? 0.45) * s.dur, 0.34, 2.3)
  if (k <= 0) return
  x.save(); x.translate(s.cx, y); x.scale(k, k)
  pill(x, p.label, 0, 0, { size: 40, col: color(p.labelCol, GOLD), weight: 800 })
  x.restore()
}
/** a gold arc that draws from a to b (k 0..1), with an optional heart at its top */
function goldArc(x, ax, ay, bx, by, k, lift, { heartK = 0, col = GOLD } = {}) {
  if (k <= 0) return
  const mx = (ax + bx) / 2, my = Math.min(ay, by) - lift
  const N = 40, n = Math.max(1, Math.round(N * clamp(k)))
  x.beginPath()
  for (let i = 0; i <= n; i++) { const u = i / N, px = (1 - u) * (1 - u) * ax + 2 * u * (1 - u) * mx + u * u * bx, py = (1 - u) * (1 - u) * ay + 2 * u * (1 - u) * my + u * u * by; i ? x.lineTo(px, py) : x.moveTo(px, py) }
  line(x, col, 8, 26)
  if (heartK > 0) heart(x, mx, (ay + by) / 4 + my / 2 - 10, 40 * heartK, PINK)
}
/** a map pin, tip at (px, py), head radius r */
function pin(x, px, py, r, col, a = 1) {
  if (a <= 0 || r <= 0) return
  const d = 1.75 * r, b = Math.acos(r / d)
  x.save(); x.globalAlpha *= a; x.translate(px, py)
  x.beginPath(); x.moveTo(0, 0); x.arc(0, -d, r, Math.PI / 2 + b, Math.PI / 2 - b + TAU); x.closePath()
  ink(x, col, { w: 7, fa: 0.75, glow: 22 })
  x.beginPath(); x.arc(0, -d, r * 0.4, 0, TAU); x.fillStyle = '#fff6ea'; x.fill()
  x.restore()
}
/** a pill whose centre is nudged so it stays inside the box */
function pillIn(x, text, px, py, s, opts = {}) {
  const size = opts.size || 38
  x.save(); x.font = font(size, { weight: opts.weight || 800 }); const w = x.measureText(text).width + size * 1.4; x.restore()
  const lo = s.cx - s.w / 2 + w / 2, hi = s.cx + s.w / 2 - w / 2
  return pill(x, text, clamp(px, lo, Math.max(lo, hi)), py, opts)
}

// ───────────────────────── skyline (generic towers: no real tower shapes, no logos)
const TOWERS = [
  { x: 40, w: 100, h: 230, top: 'flat' }, { x: 145, w: 92, h: 330, top: 'slant' }, { x: 248, w: 112, h: 420, top: 'step' },
  { x: 360, w: 96, h: 520, top: 'spire' }, { x: 478, w: 128, h: 600, top: 'pyramid' }, { x: 600, w: 106, h: 470, top: 'flat' },
  { x: 705, w: 92, h: 560, top: 'slant2' }, { x: 812, w: 116, h: 390, top: 'step' }, { x: 925, w: 100, h: 300, top: 'spire' },
  { x: 1035, w: 104, h: 230, top: 'flat' },
]
const WIN = TOWERS.map((b, i) => {
  const r = rng(40 + i), out = []
  const cols = Math.max(2, Math.floor((b.w - 30) / 24)), rows = Math.floor((b.h - 70) / 34)
  for (let q = 0; q < rows; q++) for (let c = 0; c < cols; c++) if (r() < 0.42) out.push({ c, q, cols, seed: r() * 100, gold: r() < 0.8 })
  return out
})
function towerPath(x, b, h) {
  const l = b.x - b.w / 2, r = b.x + b.w / 2, y = -h
  x.beginPath(); x.moveTo(l, 0)
  switch (b.top) {
    case 'slant': x.lineTo(l, y + 40); x.lineTo(r, y); break
    case 'slant2': x.lineTo(l, y); x.lineTo(r, y + 50); break
    case 'step': x.lineTo(l, y + 50); x.lineTo(l + b.w * 0.2, y + 50); x.lineTo(l + b.w * 0.2, y); x.lineTo(r - b.w * 0.2, y); x.lineTo(r - b.w * 0.2, y + 50); x.lineTo(r, y + 50); break
    case 'spire': x.lineTo(l, y + 30); x.lineTo(b.x - 10, y + 10); x.lineTo(b.x, y - 60); x.lineTo(b.x + 10, y + 10); x.lineTo(r, y + 30); break
    case 'pyramid': x.lineTo(l, y + 60); x.lineTo(b.x, y - 20); x.lineTo(r, y + 60); break
    default: x.lineTo(l, y); x.lineTo(r, y)
  }
  x.lineTo(r, 0); x.closePath()
}
const ORDER = [4, 3, 6, 5, 2, 7, 1, 8, 0, 9]
/** draws the towers on (left, base) at scale sc; kOf(j) springs tower j up; returns nothing */
function towers(x, left, base, sc, t, kOf, { edge = '#b39ce8', winCol = '#ffd98a', winA = 0.75, heat = 0, fillA = 0.16, fillCol = VIOLET, lw = 5 } = {}) {
  ORDER.forEach((i, j) => {
    const b = TOWERS[i], kk = kOf(j)
    if (kk <= 0) return
    const h = b.h * kk
    x.save(); x.translate(left + (heat ? Math.sin(t * 5 + i * 1.7) * 3 * heat : 0), base); x.scale(sc, sc)
    x.save()
    towerPath(x, b, h); x.fillStyle = DARK; x.fill(); x.fillStyle = rgba(fillCol, fillA); x.fill(); x.clip()
    for (const w of WIN[i]) {
      const wx = b.x - (w.cols * 24) / 2 + w.c * 24 + 4, wy = -h + 70 + w.q * 34
      if (wy > -16) continue
      const tw = 0.6 + 0.4 * noise1(t * 0.8 + w.seed, w.seed)
      x.fillStyle = rgba(w.gold ? winCol : '#bfe6ff', winA * tw); x.fillRect(wx, wy, 12, 16)
    }
    x.restore()
    towerPath(x, b, h); ink(x, edge, { w: lw / sc, fa: 0, glow: 14 })
    x.restore()
  })
}
const DROPS = (() => { const r = rng(17), out = []; for (let i = 0; i < 60; i++) out.push({ u: r(), ph: r(), v: 1500 + r() * 600, len: 34 + r() * 26 }); return out })()
function rainIn(x, x0, x1, y0, floor, t, a = 1, { slant = 0.12, col = BLUE, stop = null } = {}) {
  if (a <= 0) return
  x.save(); x.lineCap = 'round'; x.strokeStyle = col; x.shadowColor = col; x.shadowBlur = 10; x.lineWidth = 6; x.globalAlpha *= a * 0.9
  for (const d of DROPS) {
    const px = lerp(x0, x1, d.u), fy = stop ? stop(px, floor) : floor
    const L = fy - y0
    if (L <= 0) continue
    const y = y0 + ((t * d.v + d.ph * 3000) % (L + 160))
    if (y - d.len > fy) {
      // a little splash
      const k = (y - d.len - fy) / 160
      if (k < 0.5) { x.save(); x.globalAlpha *= 1 - k * 2; x.beginPath(); x.arc(px, fy, 6 + k * 40, Math.PI * 1.15, Math.PI * 1.85); x.lineWidth = 4; x.stroke(); x.restore() }
      continue
    }
    const y1 = Math.min(fy, y)
    x.beginPath(); x.moveTo(px + d.len * slant, Math.max(y0, y - d.len)); x.lineTo(px, y1); x.stroke()
  }
  x.restore()
}
/** a generic rocket (no agency marks), nose up, centred on its body; s ≈ 1 → 170 px tall */
function rocket(x, px, py, s, rot, t) {
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(s, s)
  // flame
  const f = 1 + 0.18 * Math.sin(t * 40) + 0.1 * Math.sin(t * 23)
  x.beginPath(); x.moveTo(-18, 58); x.quadraticCurveTo(-14, 58 + 60 * f, 0, 58 + 96 * f); x.quadraticCurveTo(14, 58 + 60 * f, 18, 58); x.closePath()
  ink(x, ORANGE, { w: 6, fa: 0.7, glow: 30, fill: SUN })
  x.beginPath(); x.moveTo(-8, 60); x.quadraticCurveTo(0, 60 + 50 * f, 8, 60); x.closePath(); x.fillStyle = '#fff3d0'; x.fill()
  // fins
  for (const d of [-1, 1]) { x.beginPath(); x.moveTo(d * 24, 20); x.lineTo(d * 50, 62); x.lineTo(d * 24, 54); x.closePath(); ink(x, RED, { w: 6, fa: 0.6, glow: 14 }) }
  // body + nose
  x.beginPath(); x.moveTo(-26, 58); x.lineTo(-26, -30); x.quadraticCurveTo(-24, -76, 0, -100); x.quadraticCurveTo(24, -76, 26, -30); x.lineTo(26, 58); x.closePath()
  ink(x, BONE, { w: 7, fa: 0.3, glow: 18 })
  x.beginPath(); x.moveTo(-22, -46); x.quadraticCurveTo(0, -54, 22, -46); line(x, RED, 6, 8)
  x.beginPath(); x.arc(0, -8, 12, 0, TAU); ink(x, BLUE, { w: 6, fa: 0.6, glow: 14 })
  x.restore()
}
/** the striped sunset sun (synthwave bands), centred at (px, py), radius R; clipped above `clipY` if given */
function stripedSun(x, px, py, R, clipY = null, a = 1) {
  if (R <= 0 || a <= 0) return
  x.save(); x.globalAlpha *= a
  const g0 = x.createRadialGradient(px, py, R * 0.6, px, py, R * 2.2)
  g0.addColorStop(0, rgba(ORANGE, 0.4)); g0.addColorStop(1, rgba(ORANGE, 0))
  x.fillStyle = g0; x.beginPath(); x.arc(px, py, R * 2.2, 0, TAU); x.fill()
  if (clipY != null) { x.beginPath(); x.rect(px - R * 3, py - R * 3, R * 6, clipY - (py - R * 3)); x.clip() }
  x.save(); x.beginPath(); x.arc(px, py, R, 0, TAU); x.clip()
  const g = x.createLinearGradient(0, py - R, 0, py + R); g.addColorStop(0, '#ffe08a'); g.addColorStop(0.55, '#ff9a5a'); g.addColorStop(1, '#ff5f8f')
  x.fillStyle = g
  // bands: solid on top, gaps growing toward the bottom
  let y = py - R
  x.fillRect(px - R, y, 2 * R, R * 1.0); y += R * 1.0
  for (let i = 0; y < py + R; i++) { const gap = R * (0.05 + i * 0.03), band = R * Math.max(0.05, 0.16 - i * 0.025); y += gap; x.fillRect(px - R, y, 2 * R, band); y += band }
  x.restore()
  x.shadowColor = '#ff9a5a'; x.shadowBlur = 40
  x.beginPath(); x.arc(px, py, R, Math.PI, 0); x.strokeStyle = rgba('#ffd08a', 0.9); x.lineWidth = 6; x.stroke()
  x.restore()
}
/** a flat sun with chunky spinning rays; R = disc radius */
function sunDisc(x, px, py, R, t, a = 1) {
  if (R <= 0 || a <= 0) return
  x.save(); x.translate(px, py); x.globalAlpha *= a
  const g = x.createRadialGradient(0, 0, R * 0.6, 0, 0, R * 2.8)
  g.addColorStop(0, rgba(SUN, 0.35)); g.addColorStop(1, rgba(SUN, 0))
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, R * 2.8, 0, TAU); x.fill()
  x.save(); x.rotate(t * 0.9)
  for (let i = 0; i < 10; i++) {
    const a0 = i * TAU / 10, L = R * (i % 2 ? 0.5 : 0.7), r0 = R * 1.26 + R * 0.06 * Math.sin(t * 6 + i)
    x.beginPath(); x.moveTo(Math.cos(a0) * r0, Math.sin(a0) * r0); x.lineTo(Math.cos(a0) * (r0 + L), Math.sin(a0) * (r0 + L))
    ink(x, SUN, { w: Math.max(8, R * 0.17), fa: 0, glow: 18 })
  }
  x.restore()
  x.beginPath(); x.arc(0, 0, R, 0, TAU); ink(x, SUN, { w: 9, fa: 0.85, glow: 34, fill: '#ffb627' })
  x.beginPath(); x.arc(-R * 0.26, -R * 0.28, R * 0.44, Math.PI * 1.05, Math.PI * 1.6); x.strokeStyle = rgba('#fff6d8', 0.8); x.lineWidth = 9; x.lineCap = 'round'; x.stroke()
  x.restore()
}
/** a fat rain cloud, ≈ 380·s wide, centred on its belly */
function cloud(x, px, py, s, t, a = 1, col = '#b9c6ec', fill = '#3e4a7c') {
  if (a <= 0 || s <= 0) return
  x.save(); x.translate(px, py); x.scale(s, s); x.globalAlpha *= a
  const puff = k => 1 + 0.03 * Math.sin(t * 5 + k)
  x.beginPath(); x.moveTo(-170, 60)
  x.arc(-120, 18, 62 * puff(0), Math.PI * 0.75, Math.PI * 1.55)
  x.arc(-30, -40, 92 * puff(1), Math.PI * 1.1, Math.PI * 1.85)
  x.arc(80, -24, 76 * puff(2), Math.PI * 1.25, Math.PI * 1.98)
  x.arc(140, 24, 52 * puff(3), Math.PI * 1.5, Math.PI * 0.4)
  x.lineTo(-170, 76); x.closePath()
  ink(x, col, { w: 9 / s, fa: 0.7, glow: 24, fill })
  x.beginPath(); x.arc(-30, -40, 66, Math.PI * 1.2, Math.PI * 1.55); x.strokeStyle = rgba('#ffffff', 0.45); x.lineWidth = 9; x.lineCap = 'round'; x.stroke()
  x.restore()
}

const skyline = {
  min: p => 2.2 + (p.windows ? 0.8 : 0) + (p.rocket ? 0.6 : 0),
  draw(x, p, s) {
    const time = p.time || 'night', haze = clamp(p.haze ?? 0), heat = p.heat ? 1 : 0
    const sc = Math.min(s.w / 1080, (s.h * 0.66) / 640)
    const W0 = 1080 * sc, left = s.cx - W0 / 2
    const base = s.cy + s.h * 0.3
    const pal = time === 'day' ? { edge: BLUE, win: '#bfe6ff', winA: 0.32, fillCol: BLUE, fillA: 0.14 }
      : time === 'sunset' ? { edge: PINK, win: '#ffd98a', winA: 0.6, fillCol: '#ff7a8a', fillA: 0.14 }
      : { edge: '#b39ce8', win: '#ffd98a', winA: 0.75, fillCol: VIOLET, fillA: 0.16 }
    const intro = ease.outCubic(prog(s.clt, 0, 0.6))
    // the sky behind
    if (p.stars ?? time === 'night') {
      const r = rng(77)
      x.save()
      for (let i = 0; i < 26; i++) {
        const px = s.cx + (r() - 0.5) * s.w, py = s.top + r() * (base - 600 * sc - s.top + 40), ph = r() * 9, kind = Math.floor(r() * 3)
        x.globalAlpha = intro * (1 - 0.75 * haze) * (0.3 + 0.7 * Math.max(0, Math.sin(s.t * (1.2 + r() * 1.8) + ph)))
        drawPixelStar(x, px, py, 14 + Math.floor(r() * 3) * 6, kind, ['#fff3e0', '#ffd98a', '#c9a6ff', '#8fd8f6'][i % 4])
      }
      x.restore()
    }
    if (time === 'sunset') stripedSun(x, s.cx + 30 * sc, base - 400 * sc, 270 * sc * pop01(s.clt, 0.05, 0.6, 1.6), base, intro)
    if (time === 'day') sunDisc(x, s.cx - s.w * 0.32, s.top + s.h * 0.17, Math.min(80, s.h * 0.08) * pop01(s.clt, 0.15, 0.45, 2), s.t)
    if (haze > 0) {
      x.save(); x.translate(s.cx, base - 260 * sc); x.scale(1, 0.7)
      const R0 = s.w * 0.75, g = x.createRadialGradient(0, 0, 0, 0, 0, R0)
      g.addColorStop(0, rgba('#ff9a5a', 0.8 * haze)); g.addColorStop(0.5, rgba(ORANGE, 0.35 * haze)); g.addColorStop(1, rgba(ORANGE, 0))
      x.fillStyle = g; x.beginPath(); x.arc(0, 0, R0, Math.PI, TAU); x.fill(); x.restore()
    }
    // the rocket climbs from behind the towers, trailing a soft plume
    if (p.rocket) {
      const t0 = (p.rocketAt ?? 0.15) * s.dur, q = ease.inQuad(prog(s.lt, t0, t0 + Math.max(1.6, s.dur * 0.8)))
      if (s.lt > t0) {
        const P = u => [left + W0 * lerp(0.84, 0.66, u * u), lerp(base - 40 * sc, s.top + 90, u)]
        x.save(); x.lineCap = 'round'
        for (let i = 0; i < 18; i++) {
          const u = q * i / 17, [tx, ty] = P(u), r = (14 + (1 - i / 17) * 30) * (0.8 + 0.2 * Math.sin(s.t * 3 + i))
          x.globalAlpha = 0.1 + 0.16 * (i / 17); x.fillStyle = '#ffe9d0'; x.beginPath(); x.arc(tx + Math.sin(i * 1.7 + s.t) * 6, ty + 30, r, 0, TAU); x.fill()
        }
        x.restore()
        const [rx, ry] = P(q), [nx, ny] = P(Math.min(1, q + 0.02))
        rocket(x, rx, ry, 1.15, Math.atan2(nx - rx, -(ny - ry)) || -0.1, s.t)
      }
    }
    towers(x, left, base, sc, s.t, j => easeBack(prog(s.clt, 0.04 + j * 0.055, 0.5 + j * 0.055)), { edge: pal.edge, winCol: pal.win, winA: pal.winA, heat, fillCol: pal.fillCol, fillA: pal.fillA })
    // ground line + water with shimmering reflections
    x.save(); x.globalAlpha *= intro
    x.beginPath(); x.moveTo(s.cx - s.w / 2, base); x.lineTo(s.cx + s.w / 2, base); line(x, pal.edge, 6, 14)
    const r = rng(9)
    for (let i = 0; i < 16; i++) {
      const px = left + W0 * (0.05 + r() * 0.9), py = base + 22 + r() * (s.bottom - base - 40), w = 30 + r() * 70
      x.globalAlpha = intro * (0.25 + 0.3 * Math.max(0, Math.sin(s.t * 2 + i))) * (1 - (py - base) / (s.bottom - base + 1) * 0.6)
      x.beginPath(); x.moveTo(px - w / 2 + Math.sin(s.t * 1.5 + i) * 10, py); x.lineTo(px + w / 2 + Math.sin(s.t * 1.5 + i) * 10, py)
      x.strokeStyle = i % 3 ? pal.win : pal.edge; x.lineWidth = 5; x.lineCap = 'round'; x.stroke()
    }
    x.restore()
    if (p.rain) rainIn(x, s.cx - s.w / 2, s.cx + s.w / 2, s.top, base, s.t, intro)
    if (heat) {
      x.save(); x.lineCap = 'round'
      for (let i = 0; i < 4; i++) {
        const ph = (s.t * 0.45 + i / 4) % 1, y = base - 640 * sc - ph * s.h * 0.22
        x.globalAlpha = Math.sin(Math.PI * ph) * 0.7
        x.beginPath()
        for (let k = 0; k <= 30; k++) { const px = s.cx - s.w * 0.12 + k * s.w * 0.55 / 30, py = y + Math.sin(k * 0.9 + s.t * 5 + i) * 10; k ? x.lineTo(px, py) : x.moveTo(px, py) }
        line(x, ORANGE, 6, 14)
      }
      x.restore()
    }
    // two lit windows that find each other
    if (p.windows) {
      const at = (p.windowsAt ?? 0.4) * s.dur
      const W1 = TOWERS[2], W2 = TOWERS[7]
      const pA = [left + W1.x * sc, base - W1.h * 0.55 * sc], pB = [left + W2.x * sc, base - W2.h * 0.5 * sc]
      ;[[pA, BLUE, at], [pB, PINK, at + 0.3]].forEach(([[px, py], col, t0]) => {
        const k = pop01(s.lt, t0, 0.3, 2.6)
        if (k <= 0) return
        x.save(); x.translate(px, py); x.scale(k, k)
        const g = x.createRadialGradient(0, 0, 4, 0, 0, 70); g.addColorStop(0, rgba(col, 0.6)); g.addColorStop(1, rgba(col, 0))
        x.fillStyle = g; x.beginPath(); x.arc(0, 0, 70, 0, TAU); x.fill()
        rr(x, -17, -22, 34, 44, 5); ink(x, col, { w: 6, fa: 0.85, glow: 30, fill: '#fff3e0' })
        x.restore()
      })
      const lk = ease.outCubic(prog(s.lt, at + 0.7, at + 1.3))
      goldArc(x, pA[0], pA[1] - 30, pB[0], pB[1] - 30, lk, 300 * sc, { heartK: pop01(s.lt, at + 1.3, 0.4, 2.6) })
      sparkle(x, (pA[0] + pB[0]) / 2, Math.min(pA[1], pB[1]) - 180 * sc, s.lt, at + 1.3, { n: 12, R: 170, seed: 31 })
    }
    boxLabel(x, p, s, Math.min(s.bottom - 40, base + 70))
  },
  cues(p, t0, dur) {
    const c = [['whoosh', t0 + 0.05, 0.6, 0.05]]
    for (let j = 0; j < 10; j += 2) c.push(['pop', t0 + 0.3 + j * 0.055, 520 + j * 60, 0.03, (j / 9 - 0.5) * 0.8])
    if (p.rocket) c.push(['riser', t0 + (p.rocketAt ?? 0.15) * dur, t0 + dur, 0.05])
    if (p.windows) { const at = t0 + (p.windowsAt ?? 0.4) * dur; c.push(['pop', at, 988, 0.05, -0.4], ['pop', at + 0.3, 1175, 0.05, 0.4], ['bell', at + 1.3, 1318, 0.05, 2, 0]) }
    if (p.label) c.push(['pop', t0 + (p.labelAt ?? 0.45) * dur, 880, 0.04, 0])
    return c
  },
}
const outBounce = x => { const n = 7.5625, d = 2.75; if (x < 1 / d) return n * x * x; if (x < 2 / d) return n * (x -= 1.5 / d) * x + 0.75; if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + 0.9375; return n * (x -= 2.625 / d) * x + 0.984375 }
const easeBack = x => x <= 0 ? 0 : 1 + 2.4 * Math.pow(x - 1, 3) + 1.4 * Math.pow(x - 1, 2)

// ───────────────────────── map: the ring roads (morph into a zodiac wheel with spin)
const SPOKES = [4, 33, 66, 104, 136, 164]   // six freeways through the middle (12 rays) → 0, 30, … 150 on spin
const map = {
  min: p => 2.4 + (p.hoods ? p.hoods.length * 0.35 : 0) + (p.pins ? 1 : 0) + (p.spin ? 1.2 : 0),
  draw(x, p, s) {
    const R3 = Math.min(s.w * 0.47, s.h * 0.45), cx = s.cx, cy = s.cy
    const ringsL = p.rings === false ? [null, null, null] : (Array.isArray(p.rings) ? p.rings : ['610', 'Beltway 8', 'Grand Parkway'])
    const nR = clamp(ringsL.length, 1, 4)
    const radii = Array.from({ length: nR }, (_, i) => R3 * (nR === 1 ? 0.8 : lerp(0.34, 1, i / (nR - 1))))
    const RC = [PINK, BLUE, VIOLET, GOLD]
    const sAt = (p.spinAt ?? 0.5) * s.dur
    const sk = p.spin ? ease.inOutCubic(prog(s.lt, sAt, sAt + 1)) : 0
    const rot = p.spin ? Math.max(0, s.lt - sAt) * 0.28 * sk : 0
    const irr = 0.7 * (1 - sk)
    x.save(); x.translate(cx, cy); x.rotate(rot)
    // freeways (spokes)
    SPOKES.forEach((deg, i) => {
      const k = ease.outCubic(prog(s.clt, 0.05 + i * 0.05, 0.55 + i * 0.05))
      if (k <= 0) return
      const a = lerp(deg, i * 30, sk) * Math.PI / 180, L = R3 * lerp(1.08, 1, sk) * k
      x.beginPath(); x.moveTo(-Math.cos(a) * L, -Math.sin(a) * L); x.lineTo(Math.cos(a) * L, Math.sin(a) * L)
      x.strokeStyle = rgba(sk > 0.5 ? GOLD : BONE, lerp(0.35, 0.6, sk)); x.lineWidth = 5; x.lineCap = 'round'; x.shadowColor = BONE; x.shadowBlur = 6; x.stroke(); x.shadowBlur = 0
    })
    // the loops, drawn on
    radii.forEach((R, i) => {
      const t0 = 0.12 + i * 0.22, k = ease.inOutCubic(prog(s.clt, t0, t0 + 0.7))
      if (k <= 0) return
      const N = 90, n = Math.round(N * k)
      x.beginPath()
      for (let j = 0; j <= n; j++) {
        const a = -Math.PI / 2 + (j / N) * TAU
        const rr0 = R * (1 + irr * (0.05 * Math.sin(3 * a + i * 2.1) + 0.035 * Math.sin(5 * a + i)))
        j ? x.lineTo(Math.cos(a) * rr0, Math.sin(a) * rr0) : x.moveTo(Math.cos(a) * rr0, Math.sin(a) * rr0)
      }
      const col = sk > 0 ? (sk > 0.5 ? GOLD : RC[i % 4]) : RC[i % 4]
      ink(x, col, { w: i === 0 ? 9 : 8, fa: 0, glow: 22 })
    })
    // zodiac glyphs between the outer two rings once it spins
    if (sk > 0) {
      const Ra = nR > 1 ? (radii[nR - 1] + radii[nR - 2]) / 2 : radii[0] * 0.75
      SIGNS.forEach((S, i) => {
        const a = (i + 0.5) * TAU / 12 - Math.PI / 2, k = pop01(s.lt, sAt + 0.5 + i * 0.04, 0.3, 2.4)
        if (k <= 0) return
        x.save(); x.translate(Math.cos(a) * Ra, Math.sin(a) * Ra); x.rotate(-rot)
        glyph(x, S.glyph, 0, 0, Math.min(64, (radii[nR - 1] - (radii[nR - 2] || 0)) * 0.55) * k, S.color, { glow: 14 })
        x.restore()
      })
    }
    x.restore()
    // downtown: a gold star in the middle
    const ck = pop01(s.clt, 0.15, 0.4, 2.4)
    if (ck > 0) {
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, 70); g.addColorStop(0, rgba(GOLD, 0.5)); g.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 70, 0, TAU); x.fill()
      drawPixelStar(x, cx, cy, Math.round(40 * ck * (1 + 0.1 * Math.sin(s.t * 4)) / 4) * 4 || 4, 0, '#fff3d0')
    }
    // ring labels (fade away as it spins)
    const LA = [0.5, 0.5, 0.5, 0.5]
    radii.forEach((R, i) => {
      const txt = ringsL[i]
      if (!txt) return
      const k = pop01(s.clt, 0.5 + i * 0.22, 0.32, 2.3) * (1 - sk)
      if (k <= 0) return
      const a = LA[i % 4] * Math.PI
      x.save(); x.translate(cx + Math.cos(a) * R, cy + Math.sin(a) * R); x.scale(k, k)
      pill(x, String(txt), 0, 0, { size: 36, col: RC[i % 4], fg: BONE, weight: 800, family: 'inter' })
      x.restore()
    })
    // neighbourhoods
    const hoods = p.hoods || []
    hoods.forEach((h, i) => {
      const at = stagger(i, hoods.length, s.dur, 0.25, p.spin ? Math.min(0.45, p.spinAt ?? 0.5) : 0.65)
      const k = pop01(s.lt, at, 0.32, 2.4) * (1 - sk)
      if (k <= 0) return
      // around the top (the bottom holds the ring labels; left and right the pins)
      const a = Math.PI * (1.12 + 0.76 * (hoods.length > 1 ? i / (hoods.length - 1) : 0.5))
      const band = nR > 1 ? [nR > 2 ? (radii[1] + radii[2]) / 2 : radii[1] * 1.05, (radii[0] + radii[1]) / 2][i % 2] : radii[0] * 0.6
      const px = cx + Math.cos(a) * band, py = cy + Math.sin(a) * band * 0.94 + Math.sin(s.t * 1.3 + i) * 4
      x.save(); x.translate(px, py); x.scale(k, k); x.translate(-px, -py)
      pillIn(x, h, px, py, s, { size: 38, col: [GOLD, PINK, BLUE, GREEN, VIOLET, ORANGE][i % 6], weight: 800 })
      x.restore()
    })
    // two pins drop and link
    if (p.pins) {
      const names = Array.isArray(p.pins) ? p.pins : [null, null]
      const at = (p.pinsAt ?? 0.3) * s.dur, lat = (p.linkAt ?? 0.62) * s.dur
      const rA = nR > 1 ? (radii[0] + radii[1]) / 2 : radii[0] * 0.5, rB = nR > 2 ? (radii[nR - 2] + radii[nR - 1]) / 2 : R3 * 0.9
      const spots = [[cx - rA, cy + 40], [cx + rB, cy + 40]]
      spots.forEach(([px, py], i) => {
        const t0 = at + i * 0.3, q = prog(s.lt, t0, t0 + 0.35)
        if (q <= 0) return
        const drop = (1 - outBounce(q)) * 220
        pin(x, px, py - drop, 34, i ? PINK : BLUE, clamp(q * 4))
        if (names[i]) { const k = pop01(s.lt, t0 + 0.3, 0.3, 2.2); if (k > 0) { x.save(); x.translate(px, py + 40); x.scale(k, k); x.translate(-px, -(py + 40)); pillIn(x, names[i], px, py + 40, s, { size: 36, col: i ? PINK : BLUE }); x.restore() } }
      })
      const lk = ease.outCubic(prog(s.lt, lat, lat + 0.55))
      goldArc(x, spots[0][0], spots[0][1] - 100, spots[1][0], spots[1][1] - 100, lk, 140, { heartK: pop01(s.lt, lat + 0.55, 0.4, 2.6) })
      sparkle(x, (spots[0][0] + spots[1][0]) / 2, Math.min(spots[0][1], spots[1][1]) - 190, s.lt, lat + 0.55, { n: 12, R: 160, seed: 41 })
    }
    if (sk > 0) sparkle(x, cx, cy, s.lt, sAt + 0.9, { n: 14, R: R3 * 0.9, seed: 51 })
    boxLabel(x, p, s, s.bottom - 10)
  },
  cues(p, t0, dur) {
    const nR = Array.isArray(p.rings) ? clamp(p.rings.length, 1, 4) : 3
    const c = []
    for (let i = 0; i < nR; i++) c.push(['pluck', t0 + 0.12 + i * 0.22, [440, 554.37, 659.25, 880][i], 0.045, 0.7, 0])
    ;(p.hoods || []).forEach((_, i) => c.push(['pop', t0 + stagger(i, p.hoods.length, dur, 0.25, p.spin ? Math.min(0.45, p.spinAt ?? 0.5) : 0.65), 760 + i * 80, 0.045, ((i % 3) - 1) * 0.4]))
    if (p.pins) { const at = t0 + (p.pinsAt ?? 0.3) * dur; c.push(['pop', at + 0.3, 700, 0.05, -0.3], ['pop', at + 0.6, 880, 0.05, 0.3], ['bell', t0 + (p.linkAt ?? 0.62) * dur + 0.55, 1175, 0.05, 2, 0]) }
    if (p.spin) { const at = t0 + (p.spinAt ?? 0.5) * dur; c.push(['whoosh', at, 0.9, 0.06], ['glitter', at + 0.5, at + 1.1]) }
    return c
  },
}

// ───────────────────────── freeway: a wide freeway in perspective, brake lights crawling
function car(x, cx, by, w, { body = '#2a2148', edge = BONE, lw = 4, brake = 1, a = 1, hero = false } = {}) {
  if (w <= 2 || a <= 0) return
  const h = w * 0.62, r = w * 0.12
  x.save(); x.globalAlpha *= a
  x.fillStyle = '#0a0716'
  x.fillRect(cx - w * 0.42, by - h * 0.12, w * 0.16, h * 0.14); x.fillRect(cx + w * 0.26, by - h * 0.12, w * 0.16, h * 0.14)
  x.beginPath()
  x.moveTo(cx - w * 0.5, by - h * 0.1); x.lineTo(cx - w * 0.5, by - h * 0.5); x.lineTo(cx - w * 0.36, by - h * 0.56); x.lineTo(cx - w * 0.28, by - h * 0.95)
  x.quadraticCurveTo(cx, by - h * 1.02, cx + w * 0.28, by - h * 0.95); x.lineTo(cx + w * 0.36, by - h * 0.56); x.lineTo(cx + w * 0.5, by - h * 0.5); x.lineTo(cx + w * 0.5, by - h * 0.1)
  x.quadraticCurveTo(cx + w * 0.5, by, cx + w * 0.5 - r, by); x.lineTo(cx - w * 0.5 + r, by); x.quadraticCurveTo(cx - w * 0.5, by, cx - w * 0.5, by - h * 0.1); x.closePath()
  x.fillStyle = body; x.fill()
  if (lw > 0) ink(x, edge, { w: lw, fa: hero ? 0.25 : 0, glow: hero ? 22 : 8 })
  x.fillStyle = hero ? rgba(GOLD, 0.25) : 'rgba(10,7,22,0.85)'
  x.beginPath(); x.moveTo(cx - w * 0.25, by - h * 0.62); x.lineTo(cx - w * 0.2, by - h * 0.88); x.lineTo(cx + w * 0.2, by - h * 0.88); x.lineTo(cx + w * 0.25, by - h * 0.62); x.closePath(); x.fill()
  const bw = w * 0.2, bh = h * 0.13, ly = by - h * 0.42
  x.globalCompositeOperation = 'lighter'
  for (const sx of [-1, 1]) {
    const lx = cx + sx * (w * 0.5 - bw * 0.5 - w * 0.04)
    const gr = x.createRadialGradient(lx, ly, 0, lx, ly, w * 0.55)
    gr.addColorStop(0, rgba(RED, 0.55 * brake)); gr.addColorStop(1, rgba(RED, 0))
    x.fillStyle = gr; x.beginPath(); x.arc(lx, ly, w * 0.55, 0, TAU); x.fill()
  }
  x.globalCompositeOperation = 'source-over'
  for (const sx of [-1, 1]) {
    const lx = cx + sx * (w * 0.5 - bw * 0.5 - w * 0.04)
    x.fillStyle = brake > 0.75 ? '#ffd2d2' : RED; x.globalAlpha = a * (0.45 + 0.55 * brake)
    x.beginPath(); x.roundRect(lx - bw / 2, ly - bh / 2, bw, bh, bh * 0.4); x.fill()
  }
  x.restore()
}
/** a plain freeway shield (no official marks), centred at (px, py), height h */
function shield(x, px, py, h, text, col) {
  const w = h * (String(text).length > 2 ? 1.2 : 1.0)
  x.save(); x.translate(px, py)
  x.beginPath(); x.moveTo(-w / 2, -h / 2); x.quadraticCurveTo(0, -h / 2 - h * 0.1, w / 2, -h / 2); x.lineTo(w / 2, h * 0.06)
  x.quadraticCurveTo(w / 2, h * 0.38, 0, h / 2); x.quadraticCurveTo(-w / 2, h * 0.38, -w / 2, h * 0.06); x.closePath()
  x.fillStyle = DARK; x.fill(); ink(x, col, { w: 8, fa: 0.3, glow: 22 })
  x.restore()
  label(x, String(text), px, py - h * 0.04, { size: h * 0.42, weight: 900, color: BONE, maxW: w * 0.8, shadow: false })
}
function clockFace(x, px, py, R, t, k, spin = 11.5) {
  if (k <= 0) return
  x.save(); x.translate(px, py); x.scale(k, k)
  x.beginPath(); x.arc(0, 0, R, 0, TAU); x.fillStyle = 'rgba(20,14,44,0.92)'; x.fill(); ink(x, GOLD, { w: 9, fa: 0, glow: 28 })
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU, r0 = R * (i % 3 ? 0.78 : 0.68)
    x.strokeStyle = BONE; x.lineWidth = i % 3 ? 4 : 7; x.lineCap = 'round'
    x.beginPath(); x.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); x.lineTo(Math.cos(a) * R * 0.86, Math.sin(a) * R * 0.86); x.stroke()
  }
  const mA = t * spin - Math.PI / 2, hA = t * spin / 12 - Math.PI / 2 + 0.6
  x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(hA) * R * 0.45, Math.sin(hA) * R * 0.45); line(x, BONE, 10, 10)
  x.globalAlpha *= 0.25; x.fillStyle = GOLD; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, R * 0.72, mA - 1.1, mA); x.closePath(); x.fill(); x.globalAlpha /= 0.25
  x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(mA) * R * 0.72, Math.sin(mA) * R * 0.72); line(x, GOLD, 7, 14)
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 10, 0, TAU); x.fill()
  x.restore()
}
const MINI = (() => { const r = rng(12), out = []; let px = 0; while (px < 1) { const w = 0.035 + r() * 0.045, h = 0.25 + r() * (Math.abs(px - 0.5) < 0.22 ? 0.75 : 0.3); out.push({ x: px, w, h, spire: r() < 0.25, seed: r() * 50 }); px += w + 0.006 + r() * 0.012 } return out })()
function miniSkyline(x, x0, x1, base, H, t, a = 1, edge = PINK) {
  x.save(); x.globalAlpha *= a
  for (const b of MINI) {
    const bx = lerp(x0, x1, b.x), bw = (x1 - x0) * b.w, bh = H * b.h
    x.beginPath(); x.rect(bx, base - bh, bw, bh)
    if (b.spire) { x.moveTo(bx + bw / 2 - 5, base - bh); x.lineTo(bx + bw / 2, base - bh - 26); x.lineTo(bx + bw / 2 + 5, base - bh) }
    x.fillStyle = DARK; x.fill(); x.strokeStyle = rgba(edge, 0.6); x.lineWidth = 3; x.stroke()
    x.fillStyle = rgba(GOLD, 0.6)
    for (let wy = base - bh + 12; wy < base - 8; wy += 18) for (let wx = bx + 6; wx < bx + bw - 8; wx += 13) if (noise1(wx * 0.31 + wy * 0.17 + t * 0.2, 3) > 0.62) x.fillRect(wx, wy, 5, 8)
  }
  x.restore()
}
const freeway = {
  min: () => 2.4,
  draw(x, p, s) {
    const lanes = clamp(p.lanes ?? 4, 3, 5)
    const VPy = s.top + s.h * 0.36, bot = s.bottom, D = bot - VPy, halfW = s.w * 0.62
    const yOf = z => VPy + D / z, xOf = (u, z) => s.cx + u * halfW / z
    const laneU = l => -1 + (2 * l + 1) / lanes
    const intro = ease.outCubic(prog(s.clt, 0, 0.5))
    // clock + skyline behind the horizon
    if (p.clock) clockFace(x, s.cx - s.w * 0.3, VPy - Math.min(140, s.h * 0.14), Math.min(105, s.h * 0.1), Math.max(0, s.lt - 0.3), pop01(s.clt, 0.3, 0.4, 2.2))
    miniSkyline(x, s.cx - s.w * 0.42, s.cx + s.w * 0.42, VPy, Math.min(150, s.h * 0.15), s.t, intro)
    // road
    x.save(); x.globalAlpha *= intro
    const g = x.createLinearGradient(0, VPy, 0, bot); g.addColorStop(0, 'rgba(26,18,52,0.6)'); g.addColorStop(1, 'rgba(14,10,30,0.96)')
    x.fillStyle = g; x.beginPath(); x.moveTo(xOf(-1.12, 60), VPy); x.lineTo(xOf(-1.12, 1), bot); x.lineTo(xOf(1.12, 1), bot); x.lineTo(xOf(1.12, 60), VPy); x.closePath(); x.fill()
    for (const u of [-1.08, 1.08]) { x.beginPath(); x.moveTo(xOf(u, 60), yOf(60)); x.lineTo(xOf(u, 1), bot); line(x, BONE, 6, 16) }
    x.beginPath(); x.moveTo(s.cx - s.w / 2, VPy); x.lineTo(s.cx + s.w / 2, VPy); line(x, VIOLET, 5, 14)
    const dist = 0.3 * s.t + 0.08 * Math.sin(s.t * 3.1)
    x.strokeStyle = BONE; x.lineCap = 'round'; x.shadowColor = BONE; x.shadowBlur = 6
    for (let l = 1; l < lanes; l++) {
      const u = -1 + (2 * l) / lanes
      for (let z = 1 - (dist % 1.6); z < 40; z += 1.6) {
        const z0 = Math.max(1, z), z1 = z + 0.7
        if (z1 < 1) continue
        x.globalAlpha = intro * clamp(1.4 - z / 30) * 0.85
        x.lineWidth = Math.max(1.5, 14 / z0)
        x.beginPath(); x.moveTo(xOf(u, z0), yOf(z0)); x.lineTo(xOf(u, z1), yOf(z1)); x.stroke()
      }
    }
    x.restore()
    // shield(s) on a roadside post
    const shields = p.shield ? [].concat(p.shield).slice(0, 3) : []
    if (shields.length) {
      const sz = 2.4, postX = xOf(1.2, sz), postB = yOf(sz), sh = Math.min(140, s.h * 0.15), sy = VPy - sh * 0.55
      const k = pop01(s.clt, 0.45, 0.36, 2.4)
      if (k > 0) {
        x.save(); x.globalAlpha *= clamp(k * 2)
        x.beginPath(); x.moveTo(postX, postB); x.lineTo(postX, sy + sh * 0.4); line(x, MUTED, 7, 6)
        shields.forEach((txt, i) => {
          const px = postX - i * sh * 1.25 - (shields.length > 1 ? 0 : 0)
          x.save(); x.translate(px, sy); x.rotate(0.05 * wob(s.clt, 0.45 + i * 0.1, 14, 3)); x.scale(k, k)
          shield(x, 0, 0, sh, txt, [BLUE, RED, GREEN][i % 3])
          x.restore()
        })
        x.restore()
      }
    }
    // traffic, far → near
    const heroL = Math.floor((lanes - 1) / 2), heroZ = 1.32
    const cars = []
    for (let l = 0; l < lanes; l++) for (let r = 0; r < 9; r++) {
      const z = 1.38 + r * 0.8 * (1 + r * 0.32) + ((l * 7) % 5) * 0.16
      if (z > 18) break
      if (p.hero !== false && l === heroL && z < 2.1) continue
      cars.push({ l, z, r, ph: l * 1.7 + r * 0.9, body: (l + r) % 2 ? '#2a2148' : '#33264f' })
    }
    if (p.hero !== false) cars.push({ l: heroL, z: heroZ, r: 0, hero: true, ph: 0 })
    cars.sort((a, b) => b.z - a.z)
    for (const c of cars) {
      const z = c.z * (1 + 0.025 * Math.sin(s.t * 1.6 + c.ph))
      const w = (halfW * 2 / lanes / z) * (c.hero ? 0.86 : 0.8)
      const wave = 0.5 + 0.5 * Math.sin(s.t * 4.2 - z * 0.9 + c.ph * 0.3)
      const brake = clamp((0.6 + 0.4 * Math.max(0, Math.sin(s.t * 3.1 + 1.2))) * (0.55 + 0.45 * wave))
      const k = c.hero ? pop01(s.clt, 0.2, 0.4, 2.2) : pop01(s.clt, 0.12 + Math.min(0.6, (18 - z) * 0.03) + c.l * 0.03, 0.32, 2)
      const by = yOf(z) + 6 / z
      if (c.hero) {
        x.save(); x.translate(xOf(laneU(c.l), z), by); x.rotate(0.012 * Math.sin(s.t * 3.1)); x.scale(k, k * (1 + 0.02 * Math.sin(s.t * 6.2)))
        car(x, 0, 0, w, { body: rgba(GOLD, 0.3), edge: GOLD, lw: 8, brake, hero: true })
        x.restore()
      } else car(x, xOf(laneU(c.l), z), by, w * k, { body: c.body, lw: Math.max(2, 6 / z), brake, a: clamp(k * 2) * clamp(1.6 - z / 18) })
    }
    if (p.hero !== false) sparkle(x, xOf(laneU(heroL), heroZ), yOf(heroZ) - 120, s.clt, 0.45, { n: 9, R: 130, seed: 61 })
    if (p.label) {
      const k = pop01(s.lt, (p.labelAt ?? 0.35) * s.dur, 0.34, 2.3)
      if (k > 0) { const ly = s.top + 46; x.save(); x.translate(s.cx, ly); x.scale(k, k); pill(x, p.label, 0, 0, { size: 42, col: color(p.labelCol, GOLD), weight: 800 }); x.restore() }
    }
  },
  cues(p, t0, dur) {
    const c = [['whoosh', t0 + 0.05, 0.5, 0.05], ['pop', t0 + 0.25, 660, 0.04, 0]]
    if (p.shield) c.push(['pop', t0 + 0.45, 880, 0.05, 0.4])
    if (p.clock) for (let i = 0; i < Math.floor((dur - 0.3) / 0.25); i++) c.push(['tick', t0 + 0.3 + i * 0.25, 0.04])
    if (p.label) c.push(['pop', t0 + (p.labelAt ?? 0.35) * dur, 990, 0.045, 0])
    return c
  },
}

// ───────────────────────── food: line-art plates (generic food, no brands). Each draws ≈ 300 wide around (0, 0).
const CRUST = '#e9a94a', BERRY = '#ff4f7b'
function steam(x, t, n = 3, y0 = -120, spread = 46, a = 1) {
  x.save(); x.lineCap = 'round'
  for (let i = 0; i < n; i++) {
    const ph = (t * 0.9 + i / n) % 1, sx = (i - (n - 1) / 2) * spread
    x.globalAlpha = a * Math.sin(Math.PI * ph) * 0.85
    x.strokeStyle = BONE; x.lineWidth = 7; x.shadowColor = BONE; x.shadowBlur = 12
    x.beginPath()
    for (let k = 0; k <= 10; k++) { const yy = y0 - ph * 60 - k * 8, xx = sx + 12 * Math.sin(k * 0.6 + t * 4 + i); k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
    x.stroke()
  }
  x.restore()
}
const FOOD = {
  taco(x, t) {
    x.translate(0, -10)
    x.beginPath(); x.moveTo(-122, 0)
    for (let i = 0; i <= 8; i++) { const px = -122 + i * 30.5; x.quadraticCurveTo(px - 15, -58 - (i % 2) * 18, px, -8) }
    x.lineTo(122, 0); x.closePath(); ink(x, GREEN, { w: 8, fa: 0.55, glow: 14 })
    x.beginPath(); x.moveTo(-110, 4); x.quadraticCurveTo(-60, -34, 0, -16); x.quadraticCurveTo(60, -36, 110, 4); x.closePath()
    ink(x, '#b8613a', { w: 6, fa: 0.75, glow: 6, fill: '#7a3b22' })
    for (const [cx, cy, r] of [[-58, -40, 15], [12, -50, 17], [72, -38, 14]]) { x.beginPath(); x.arc(cx, cy + Math.sin(t * 3 + cx) * 2, r, 0, TAU); ink(x, RED, { w: 6, fa: 0.8, glow: 12 }) }
    x.strokeStyle = '#ffe07a'; x.lineWidth = 7; x.lineCap = 'round'
    for (const [cx, cy, a] of [[-90, -22, -0.6], [-22, -30, 0.5], [40, -24, -0.4], [95, -20, 0.7]]) { x.beginPath(); x.moveTo(cx - 12 * Math.cos(a), cy - 12 * Math.sin(a)); x.lineTo(cx + 12 * Math.cos(a), cy + 12 * Math.sin(a)); x.stroke() }
    x.beginPath(); x.ellipse(0, -6, 130, 86, 0, 0, Math.PI); x.closePath(); x.fillStyle = rgba('#7a3b22', 0.8); x.fill()
    x.beginPath(); x.ellipse(0, -6, 158, 112, 0, Math.PI, 0, true); x.ellipse(0, -6, 128, 84, 0, 0, Math.PI, false); x.closePath()
    ink(x, GOLD, { w: 9, fa: 0.5, glow: 22, fill: '#f2b84a' })
    x.fillStyle = rgba('#a5652a', 0.7)
    for (const ax of [0.75, 0.6, 0.45, 0.3, 0.85, 0.18]) { const a = Math.PI * ax; x.beginPath(); x.arc(Math.cos(a) * 143, -6 + Math.sin(a) * 98, 5, 0, TAU); x.fill() }
  },
  kolache(x, t) {
    x.translate(0, 20)
    x.save(); x.scale(1, 0.8)
    x.beginPath(); x.ellipse(0, 26, 124, 118, 0, 0, TAU); x.fillStyle = '#8a5523'; x.fill()
    x.beginPath(); x.ellipse(0, 26, 124, 118, 0, 0, Math.PI); ink(x, CRUST, { w: 8, fa: 0, glow: 10 })
    x.beginPath(); x.ellipse(0, 0, 124, 118, 0, 0, TAU); ink(x, CRUST, { w: 9, fa: 0.85, glow: 22, fill: '#d99542' })
    x.beginPath(); x.ellipse(-8, -10, 96, 88, 0, Math.PI * 1.05, Math.PI * 1.55); x.strokeStyle = rgba('#ffe2a8', 0.65); x.lineWidth = 9; x.stroke()
    x.beginPath(); x.ellipse(0, 4, 60, 56, 0, 0, TAU); ink(x, BERRY, { w: 8, fa: 0.85, glow: 20 })
    x.beginPath(); x.ellipse(-14, -10, 26, 14, -0.5, 0, TAU); x.fillStyle = rgba('#ffd0dc', 0.75); x.fill()
    const r = rng(5); x.fillStyle = '#fff1cf'
    for (let i = 0; i < 14; i++) { const a = r() * TAU, d = 74 + r() * 30; x.fillRect(Math.cos(a) * d - 4, Math.sin(a) * d - 4, 8, 8) }
    x.restore()
    steam(x, t, 3, -110)
  },
  crawfish(x, t) {
    x.rotate(-0.5); x.scale(0.64, 0.64); x.translate(0, -10)
    const snap = Math.max(0, Math.sin(t * 2.4)) ** 4
    for (const sd of [-1, 1]) {
      x.beginPath(); x.moveTo(sd * 10, -100); x.bezierCurveTo(sd * 30, -200, sd * (120 + 10 * Math.sin(t * 3 + sd)), -210, sd * (150 + 14 * Math.sin(t * 2.6 + sd)), -280)
      ink(x, '#ff8a6a', { w: 7, fa: 0, glow: 8 })
    }
    for (const sd of [-1, 1]) for (let i = 0; i < 4; i++) {
      const y0 = -40 + i * 20, w = Math.sin(t * 9 + i * 1.3) * 5
      x.beginPath(); x.moveTo(sd * 34, y0); x.lineTo(sd * 66, y0 + 10 + w); x.lineTo(sd * 76, y0 + 30 + w); ink(x, RED, { w: 8, fa: 0, glow: 6 })
    }
    for (const sd of [-1, 1]) {
      x.save(); x.scale(sd, 1)
      x.beginPath(); x.moveTo(26, -64); x.quadraticCurveTo(70, -80, 72, -118); ink(x, RED, { w: 16, fa: 0, glow: 10 })
      x.translate(76, -126); x.rotate(-0.25)
      x.beginPath(); x.ellipse(0, -44, 30, 56, 0.15, 0, TAU); ink(x, RED, { w: 11, fa: 0.55, glow: 18 })
      x.save(); x.translate(-12, -4); x.rotate(-0.15 - 0.5 * snap)
      x.beginPath(); x.ellipse(-8, -46, 13, 46, -0.12, 0, TAU); ink(x, RED, { w: 10, fa: 0.55, glow: 12 })
      x.restore()
      x.restore()
    }
    for (let i = 4; i >= 0; i--) { const w = 72 - i * 8, y = 50 + i * 30; x.beginPath(); x.roundRect(-w / 2, y - 18, w, 36, 14); ink(x, RED, { w: 10, fa: 0.55, glow: 12 }) }
    for (const [a, l] of [[-0.55, 56], [0, 62], [0.55, 56]]) { x.save(); x.translate(0, 192); x.rotate(a); x.beginPath(); x.ellipse(0, 30, 18, l / 2, 0, 0, TAU); ink(x, RED, { w: 10, fa: 0.55, glow: 12 }); x.restore() }
    x.beginPath(); x.ellipse(0, -16, 44, 74, 0, 0, TAU); ink(x, RED, { w: 12, fa: 0.62, glow: 22 })
    x.beginPath(); x.moveTo(0, -84); x.lineTo(0, 46); x.strokeStyle = rgba('#ffd4c8', 0.45); x.lineWidth = 6; x.stroke()
    x.beginPath(); x.moveTo(-18, -96); x.lineTo(0, -122); x.lineTo(18, -96); ink(x, RED, { w: 10, fa: 0.6, glow: 10 })
  },
  pho(x, t) {
    x.translate(0, 30)
    // chopsticks lifting noodles (behind the rim)
    const lift = 8 * Math.sin(t * 2.2)
    x.save(); x.translate(40, -60 + lift); x.rotate(-0.55)
    for (const d of [-9, 9]) { x.beginPath(); x.moveTo(d, 0); x.lineTo(d * 0.6, -190); line(x, CRUST, 8, 10) }
    x.restore()
    for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(26 + i * 9, -60 + lift); x.bezierCurveTo(10 + i * 12, -30, 40 + i * 6, -20, 20 + i * 10, 0); line(x, '#fff1cf', 5, 8) }
    // bowl
    x.beginPath(); x.moveTo(-150, -30); x.quadraticCurveTo(-140, 110, 0, 112); x.quadraticCurveTo(140, 110, 150, -30); x.closePath()
    ink(x, BLUE, { w: 9, fa: 0.3, glow: 22 })
    x.beginPath(); x.moveTo(-100, 90); x.quadraticCurveTo(0, 104, 100, 90); line(x, rgba(BLUE, 0.6), 5, 6)
    rr(x, -50, 108, 100, 18, 8); ink(x, BLUE, { w: 6, fa: 0.4, glow: 10 })
    // broth + toppings
    x.beginPath(); x.ellipse(0, -30, 150, 34, 0, 0, TAU); ink(x, ORANGE, { w: 8, fa: 0.55, glow: 14, fill: '#c9783a' })
    x.save(); x.beginPath(); x.ellipse(0, -30, 140, 28, 0, 0, TAU); x.clip()
    for (let i = 0; i < 5; i++) { x.beginPath(); for (let k = 0; k <= 12; k++) { const px = -120 + k * 20, py = -40 + i * 6 + Math.sin(k * 1.3 + i + t * 2) * 4; k ? x.lineTo(px, py) : x.moveTo(px, py) } line(x, '#fff1cf', 4, 4) }
    x.restore()
    for (const [px, py, a] of [[-70, -36, -0.4], [-40, -26, 0.6], [70, -38, 0.3]]) { x.save(); x.translate(px, py); x.rotate(a); x.beginPath(); x.ellipse(0, 0, 16, 7, 0, 0, TAU); ink(x, GREEN, { w: 5, fa: 0.8, glow: 10 }); x.restore() }
    x.beginPath(); x.arc(100, -34, 20, Math.PI * 0.9, Math.PI * 2.1); x.closePath(); ink(x, GREEN, { w: 6, fa: 0.5, glow: 12, fill: '#c6f08a' })
    x.beginPath(); x.ellipse(0, -30, 150, 34, 0, 0, TAU); line(x, BLUE, 8, 18)
    steam(x, t, 3, -80, 60)
  },
  boba(x, t) {
    x.translate(0, 10)
    // straw
    x.save(); x.rotate(0.18); rr(x, -12, -210, 24, 200, 10); ink(x, PINK, { w: 7, fa: 0.5, glow: 16 }); x.restore()
    // dome lid
    x.beginPath(); x.moveTo(-86, -92); x.quadraticCurveTo(-80, -150, 0, -152); x.quadraticCurveTo(80, -150, 86, -92); x.closePath(); ink(x, BONE, { w: 7, fa: 0.15, glow: 14 })
    // cup
    x.beginPath(); x.moveTo(-92, -90); x.lineTo(-66, 140); x.quadraticCurveTo(0, 152, 66, 140); x.lineTo(92, -90); x.closePath()
    x.save(); x.clip()
    const g = x.createLinearGradient(0, -90, 0, 150); g.addColorStop(0, rgba('#e8c39a', 0.5)); g.addColorStop(1, rgba('#c98b5a', 0.75)); x.fillStyle = g; x.fillRect(-100, -60, 200, 220)
    const r = rng(8)
    for (let i = 0; i < 16; i++) { const px = -56 + r() * 112, py = 96 + r() * 40 + Math.sin(t * 2 + i) * 3; x.beginPath(); x.arc(px, py, 13, 0, TAU); x.fillStyle = '#2a1430'; x.fill(); x.strokeStyle = rgba(BONE, 0.6); x.lineWidth = 3; x.stroke(); x.fillStyle = rgba('#fff', 0.5); x.fillRect(px - 5, py - 6, 4, 4) }
    x.restore()
    x.beginPath(); x.moveTo(-92, -90); x.lineTo(-66, 140); x.quadraticCurveTo(0, 152, 66, 140); x.lineTo(92, -90); x.closePath(); ink(x, BONE, { w: 8, fa: 0, glow: 18 })
    rr(x, -98, -98, 196, 16, 8); ink(x, BONE, { w: 6, fa: 0.4, glow: 10 })
    x.beginPath(); x.moveTo(-50, -40); x.lineTo(-40, 80); x.strokeStyle = rgba('#fff', 0.35); x.lineWidth = 8; x.lineCap = 'round'; x.stroke()
  },
  coffee(x, t) {
    x.translate(0, 20)
    x.beginPath(); x.moveTo(-84, -96); x.lineTo(-62, 130); x.quadraticCurveTo(0, 140, 62, 130); x.lineTo(84, -96); x.closePath(); ink(x, BONE, { w: 8, fa: 0.22, glow: 18 })
    x.beginPath(); x.moveTo(-80, -30); x.lineTo(-72, 60); x.lineTo(72, 60); x.lineTo(80, -30); x.closePath(); ink(x, ORANGE, { w: 7, fa: 0.55, glow: 14, fill: '#b8613a' })
    heart(x, 0, 14, 22, PINK, { fa: 0.7, w: 5 })
    rr(x, -96, -122, 192, 30, 12); ink(x, BONE, { w: 7, fa: 0.45, glow: 12 })
    rr(x, -60, -136, 120, 16, 8); ink(x, BONE, { w: 5, fa: 0.4, glow: 8 })
    steam(x, t, 3, -150, 40)
  },
  donut(x, t) {
    x.rotate(Math.sin(t * 0.8) * 0.05)
    x.beginPath(); x.ellipse(0, 12, 140, 104, 0, 0, TAU); x.ellipse(0, 6, 40, 28, 0, 0, TAU, true); ink(x, CRUST, { w: 9, fa: 0.7, glow: 18, fill: '#d99542' })
    // icing with drips
    x.beginPath()
    for (let i = 0; i <= 48; i++) { const a = (i / 48) * TAU, rr0 = 1 - 0.12 * Math.max(0, Math.sin(a * 7 + 1)) ** 2; const px = Math.cos(a) * 124 * rr0, py = Math.sin(a) * 88 * rr0 + (Math.sin(a) > 0 ? 10 * Math.max(0, Math.sin(a * 9)) : 0); i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.closePath(); x.ellipse(0, 4, 50, 34, 0, 0, TAU, true)
    ink(x, PINK, { w: 8, fa: 0.75, glow: 20 })
    const r = rng(4), cols = [GOLD, BLUE, GREEN, '#fff3e0', VIOLET]
    for (let i = 0; i < 22; i++) {
      const a = r() * TAU, d = 0.55 + r() * 0.35, px = Math.cos(a) * 112 * d, py = Math.sin(a) * 78 * d
      if (Math.hypot(px / 50, py / 34) < 1.3) continue
      x.save(); x.translate(px, py); x.rotate(r() * 3); x.fillStyle = cols[i % 5]; x.fillRect(-9, -3, 18, 6); x.restore()
    }
  },
  bbq(x, t) {
    x.scale(0.86, 0.86); x.translate(0, 40)
    rr(x, -160, 20, 320, 60, 22); ink(x, CRUST, { w: 8, fa: 0.45, glow: 14, fill: '#8a5523' })
    x.beginPath(); x.arc(150, 50, 10, 0, TAU); line(x, CRUST, 5, 6)
    for (let i = 0; i < 3; i++) {
      x.save(); x.translate(-80 + i * 70, 14); x.rotate(-0.35 + i * 0.05)
      rr(x, -32, -120, 64, 130, 16); ink(x, '#ff7a5a', { w: 8, fa: 0.6, glow: 14, fill: '#9a4a3a' })
      rr(x, -24, -112, 48, 114, 12); x.strokeStyle = rgba(PINK, 0.8); x.lineWidth = 5; x.stroke()
      x.beginPath(); x.moveTo(-20, -60); x.quadraticCurveTo(0, -50, 20, -64); x.strokeStyle = rgba('#fff1cf', 0.6); x.lineWidth = 5; x.stroke()
      x.restore()
    }
    x.save(); x.translate(130, -20); x.rotate(0.3); x.beginPath(); x.ellipse(0, 0, 18, 40, 0, 0, TAU); ink(x, GREEN, { w: 6, fa: 0.55, glow: 12 }); x.restore()
    // smoke
    x.save(); x.lineCap = 'round'
    for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.6; x.beginPath(); for (let k = 0; k <= 10; k++) { const yy = -130 - ph * 60 - k * 9, xx = -70 + i * 70 + 16 * Math.sin(k * 0.5 + t * 2 + i); k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } line(x, MUTED, 8, 10) }
    x.restore()
  },
  tamale(x, t) {
    x.scale(0.84, 0.84); x.rotate(-0.12)
    for (const [dy, sc0] of [[40, 1], [-30, 0.94]]) {
      x.save(); x.translate(0, dy); x.scale(sc0, sc0)
      x.beginPath(); x.moveTo(-170, 0); x.quadraticCurveTo(-90, -62, 0, -58); x.quadraticCurveTo(90, -62, 170, 0); x.quadraticCurveTo(90, 62, 0, 58); x.quadraticCurveTo(-90, 62, -170, 0); x.closePath()
      ink(x, '#d9d07a', { w: 8, fa: 0.4, glow: 14, fill: '#b7b05a' })
      for (const sx of [-1, 1]) { x.beginPath(); x.moveTo(sx * 150, 0); x.lineTo(sx * 60, -10); x.moveTo(sx * 150, 6); x.lineTo(sx * 60, 16); x.strokeStyle = rgba('#fff7c0', 0.45); x.lineWidth = 4; x.stroke() }
      for (const sx of [-1, 1]) { rr(x, sx * 110 - 7, -34, 14, 68, 6); ink(x, '#e9d08a', { w: 5, fa: 0.6, glow: 8 }) }
      x.beginPath(); x.ellipse(0, -2, 80, 36, 0, 0, TAU); ink(x, GOLD, { w: 7, fa: 0.7, glow: 16, fill: '#f2cf6a' })
      x.beginPath(); x.ellipse(0, -2, 40, 14, 0, 0, TAU); x.fillStyle = rgba(RED, 0.8); x.fill()
      x.restore()
    }
    steam(x, t, 2, -90, 70, 0.8)
  },
  burger(x, t) {
    x.translate(0, 10)
    x.beginPath(); x.moveTo(-140, -10); x.quadraticCurveTo(-140, -130, 0, -132); x.quadraticCurveTo(140, -130, 140, -10); x.closePath(); ink(x, CRUST, { w: 9, fa: 0.7, glow: 20, fill: '#d99542' })
    const r = rng(3); x.fillStyle = '#fff1cf'
    for (let i = 0; i < 9; i++) { const px = -90 + r() * 180, py = -100 + r() * 60; x.save(); x.translate(px, py); x.rotate(r()); x.beginPath(); x.ellipse(0, 0, 7, 4, 0, 0, TAU); x.fill(); x.restore() }
    x.beginPath(); x.moveTo(-150, 0); for (let i = 0; i <= 10; i++) x.quadraticCurveTo(-150 + i * 30 - 15, 22, -150 + i * 30, 4); x.lineTo(150, -8); x.lineTo(-150, -8); x.closePath(); ink(x, GREEN, { w: 7, fa: 0.6, glow: 12 })
    x.beginPath(); x.moveTo(-140, 10); x.lineTo(140, 10); x.lineTo(110, 40); x.lineTo(80, 14); x.lineTo(-60, 14); x.lineTo(-90, 44); x.closePath(); ink(x, GOLD, { w: 6, fa: 0.75, glow: 14 })
    rr(x, -146, 20, 292, 44, 22); ink(x, '#b8613a', { w: 8, fa: 0.8, glow: 10, fill: '#6a3320' })
    x.beginPath(); x.moveTo(-136, 70); x.lineTo(136, 70); x.quadraticCurveTo(136, 118, 100, 118); x.lineTo(-100, 118); x.quadraticCurveTo(-136, 118, -136, 70); x.closePath(); ink(x, CRUST, { w: 9, fa: 0.7, glow: 16, fill: '#d99542' })
  },
  fries(x, t) {
    x.translate(0, 10)
    const r = rng(6)
    for (let i = 0; i < 9; i++) { const px = -78 + i * 19.5, a = (r() - 0.5) * 0.4, L = 120 + r() * 60 + Math.sin(t * 3 + i) * 3; x.save(); x.translate(px, -10); x.rotate(a); rr(x, -9, -L, 18, L, 5); ink(x, GOLD, { w: 5, fa: 0.75, glow: 12, fill: '#ffd36a' }); x.restore() }
    x.beginPath(); x.moveTo(-110, -40); x.quadraticCurveTo(0, 0, 110, -40); x.lineTo(80, 130); x.lineTo(-80, 130); x.closePath(); ink(x, RED, { w: 9, fa: 0.6, glow: 20 })
    x.beginPath(); x.moveTo(-40, 40); x.lineTo(0, 70); x.lineTo(40, 40); line(x, rgba('#fff3e0', 0.7), 6, 6)
  },
}
const FOOD_NAMES = { taco: 'Tacos', kolache: 'Kolaches', crawfish: 'Crawfish', pho: 'Pho', boba: 'Boba', coffee: 'Coffee', donut: 'Donuts', bbq: 'BBQ', tamale: 'Tamales', burger: 'Burgers', fries: 'Fries' }
const FOOD_COL = { taco: GOLD, kolache: ORANGE, crawfish: RED, pho: BLUE, boba: PINK, coffee: ORANGE, donut: PINK, bbq: ORANGE, tamale: GOLD, burger: GOLD, fries: RED }
const food = {
  min: p => 1.2 + (p.items || ['taco']).length * 0.45,
  draw(x, p, s) {
    const items = (p.items || ['taco']).map(it => typeof it === 'string' ? { i: it } : it).filter(it => FOOD[it.i])
    const n = items.length
    if (!n) return
    const cols = n <= 3 ? n : n === 4 ? 2 : 3, rows = Math.ceil(n / cols)
    const showL = p.labels !== false
    const cellW = s.w / cols, cellH = s.h / rows
    const sc = Math.min(n === 1 ? 1.7 : 1.3, cellW / 340, (cellH - (showL ? 80 : 0)) / 340)
    items.forEach((it, i) => {
      const row = Math.floor(i / cols), inRow = row === rows - 1 ? n - cols * (rows - 1) : cols, c = i - row * cols
      const px = s.cx + (c - (inRow - 1) / 2) * cellW
      const py = s.cy + (row - (rows - 1) / 2) * cellH - (showL ? 30 : 0)
      const at = stagger(i, n, s.dur, 0.08, p.spread ?? 0.5)
      const k = pop01(s.clt, at, 0.38, 2.3)
      if (k <= 0) return
      const glow = p.glow === i && s.lt > (p.glowAt ?? 0.65) * s.dur
      const gk = glow ? ease.outCubic(prog(s.lt, (p.glowAt ?? 0.65) * s.dur, (p.glowAt ?? 0.65) * s.dur + 0.4)) : 0
      x.save(); x.translate(px, py + Math.sin(s.t * 1.8 + i * 1.3) * 6 - gk * 20)
      x.rotate(0.12 * wob(s.clt, at, 12, 3.5) + Math.sin(s.t * 1.1 + i) * 0.02)
      x.scale(k * sc * (1 + gk * 0.12), k * sc * (1 + gk * 0.12))
      if (gk > 0) { const g = x.createRadialGradient(0, 0, 20, 0, 0, 230); g.addColorStop(0, rgba(GOLD, 0.35 * gk)); g.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = g; x.beginPath(); x.arc(0, 0, 230, 0, TAU); x.fill() }
      FOOD[it.i](x, s.t + i * 0.7)
      x.restore()
      if (showL) {
        const lk = pop01(s.clt, at + 0.15, 0.3, 2.2)
        label(x, it.label || FOOD_NAMES[it.i], px, py + 170 * sc + 26, { size: Math.max(38, Math.min(52, 46 * sc)), weight: 800, color: color(it.col, FOOD_COL[it.i]), alpha: clamp(lk * 2), maxW: cellW - 20 })
      }
      if (glow) sparkle(x, px, py, s.lt, (p.glowAt ?? 0.65) * s.dur, { n: 12, R: 200 * sc, seed: 70 + i })
    })
  },
  cues(p, t0, dur) {
    const n = (p.items || ['taco']).length, c = []
    for (let i = 0; i < n; i++) c.push(['pop', t0 + stagger(i, n, dur, 0.08, p.spread ?? 0.5), 660 + i * 110, 0.05, n > 1 ? (i / (n - 1) - 0.5) * 0.7 : 0])
    if (p.glow != null) c.push(['bell', t0 + (p.glowAt ?? 0.65) * dur, 1318, 0.05, 1.8, 0])
    return c
  },
}

// ───────────────────────── weather
/** an umbrella in a person's local frame (feet at 0,0, person ≈ 270 tall): o = open 0..1 */
function umbrella(x, o, col = PINK) {
  x.save()
  x.beginPath(); x.moveTo(36, -150); x.lineTo(70, -176); line(x, BONE, 13, 8)
  x.translate(74, -180); x.rotate(-0.24)
  x.beginPath(); x.moveTo(0, 34); x.lineTo(0, -150); line(x, BONE, 7, 8)
  x.beginPath(); x.arc(-14, 34, 14, 0, Math.PI); line(x, BONE, 7, 8)
  const hw = lerp(26, 200, o), hh = lerp(150, 172, o), lip = lerp(120, 40, o)
  x.translate(0, -144)
  x.beginPath(); x.moveTo(-hw, lip); x.quadraticCurveTo(-hw * 0.95, -hh * 0.92, 0, -hh); x.quadraticCurveTo(hw * 0.95, -hh * 0.92, hw, lip)
  for (let k = 4; k >= 0; k--) { const x0 = -hw + k * (2 * hw / 5), x1 = x0 + 2 * hw / 5; x.lineTo(x1, lip); x.quadraticCurveTo((x0 + x1) / 2, lip - 34 * o, x0, lip) }
  x.closePath(); ink(x, col, { w: 9, fa: 0.45, glow: 22 })
  x.beginPath(); x.moveTo(-hw * 0.6, lip - 8); x.quadraticCurveTo(-hw * 0.47, -hh * 0.7, 0, -hh); x.moveTo(hw * 0.6, lip - 8); x.quadraticCurveTo(hw * 0.47, -hh * 0.7, 0, -hh); line(x, col, 5, 6)
  x.beginPath(); x.moveTo(0, -hh); x.lineTo(0, -hh - 24); line(x, BONE, 7, 6)
  x.restore()
  return { hw, top: -180 - 144 - hh, lip: -180 - 144 + lip, dx: 74 - Math.sin(0.24) * (144 + hh * 0.6) }
}
function sweat(x, px, hy, sc, t, a) {
  if (a <= 0) return
  for (let i = 0; i < 3; i++) {
    const ph = (t * 1.6 + i * 0.37) % 1, sx = px + [-66, 62, -80][i] * sc, sy = hy + (-30 + ph * 70) * sc
    x.save(); x.globalAlpha *= a * Math.sin(Math.PI * ph); x.translate(sx, sy); x.scale(sc, sc)
    x.beginPath(); x.moveTo(0, -18); x.quadraticCurveTo(13, 2, 0, 10); x.quadraticCurveTo(-13, 2, 0, -18); ink(x, BLUE, { w: 5, fa: 0.7, glow: 10 })
    x.restore()
  }
}
/** a thermometer: bulb at (px, py), tube height h; level 0..1; melt 0..1 droops the tube and drips */
function thermometer(x, px, py, h, level, t, { melt = 0, col = RED, tick = BONE } = {}) {
  const tw = h * 0.16, br = h * 0.15
  x.save(); x.translate(px, py)
  const bend = melt * 0.5 * Math.sin(t * 1.4) * 0.3 + melt * 0.35
  const top = -h
  const tubeP = (inset, lvl = 1) => {
    const w = tw / 2 - inset, yT = lerp(-br * 0.6, top + w, lvl)
    x.beginPath(); x.moveTo(-w, -br * 0.6)
    x.bezierCurveTo(-w, yT * 0.6, -w + bend * h * 0.3, yT, -w + bend * h * 0.5 * lvl, yT)
    x.arc(bend * h * 0.5 * lvl, yT, w, Math.PI, 0)
    x.bezierCurveTo(w + bend * h * 0.3, yT, w, yT * 0.6, w, -br * 0.6)
    x.closePath()
  }
  tubeP(0); x.fillStyle = 'rgba(16,10,40,0.9)'; x.fill(); ink(x, tick, { w: 8, fa: 0.08, glow: 18 })
  // ticks
  for (let i = 1; i <= 5; i++) { const y = lerp(-br, top + tw, i / 6); x.beginPath(); x.moveTo(tw / 2 + 10 + bend * h * 0.5 * (i / 6), y); x.lineTo(tw / 2 + 32 + bend * h * 0.5 * (i / 6), y); line(x, rgba(tick, 0.7), 5, 4) }
  tubeP(tw * 0.22, clamp(level)); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 20; x.fill(); x.shadowBlur = 0
  x.beginPath(); x.arc(0, 0, br, 0, TAU); ink(x, tick, { w: 8, fa: 0, glow: 18 }); x.beginPath(); x.arc(0, 0, br * 0.72, 0, TAU); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 24; x.fill(); x.shadowBlur = 0
  // drips
  if (melt > 0) {
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.7 + i * 0.33) % 1, dx = (i - 1) * br * 0.6, L = br * 0.5 + ph * br * 1.6 * melt
      x.save(); x.globalAlpha *= melt * (1 - ph * 0.6)
      x.beginPath(); x.moveTo(dx - 8, br * 0.8); x.lineTo(dx - 5, br + L); x.arc(dx, br + L, 7 + 3 * ph, Math.PI, 0, true); x.lineTo(dx + 8, br * 0.8); x.closePath(); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 14; x.fill()
      x.restore()
    }
  }
  x.restore()
}
function weatherPerson(p) { return p.person === false ? null : { col: color(p.person?.col, VIOLET), sign: p.person?.sign || null } }
const weather = {
  min: p => (p.mode || 'swap') === 'swap' ? 3 : 2.4,
  draw(x, p, s) {
    const mode = p.mode || 'swap'
    const P = mode === 'heat' && p.person == null ? null : weatherPerson(p)
    const sc = Math.min(1.25, (s.h * 0.42) / 300)
    const py = s.bottom - 20, px = P ? s.cx + (mode === 'heat' || mode === 'cold-front' ? -s.w * 0.18 : 0) : s.cx
    const ey = s.top + s.h * 0.2
    const intro = ease.outCubic(prog(s.clt, 0, 0.5))
    const pk = pop01(s.clt, 0.2, 0.4, 2.2)
    const hy = py - 238 * sc
    // ground
    x.save(); x.globalAlpha *= intro; x.beginPath(); x.moveTo(s.cx - s.w * 0.42, py + 4); x.lineTo(s.cx + s.w * 0.42, py + 4); line(x, rgba(BONE, 0.55), 5, 8); x.restore()
    if (mode === 'swap' || mode === 'rain' || mode === 'sun') {
      let rainK
      if (mode === 'rain') rainK = 1
      else if (mode === 'sun') rainK = 0
      else {
        const every = p.every ?? 1.1, ph = s.lt / every, i = Math.floor(ph), f = ph - i
        const st = (i + (s.step || 0)) % 2 === 1 ? 1 : 0, prev = 1 - st
        rainK = i === 0 && (s.step || 0) === 0 ? st : lerp(prev, st, ease.inOutCubic(clamp(f / 0.3)))
      }
      const sunK = 1 - rainK
      sunDisc(x, s.cx + s.w * 0.22, ey, Math.min(95, s.h * 0.09) * pop01(s.clt, 0.1, 0.4, 2) * lerp(0.2, 1, sunK), s.t, clamp(sunK * 1.5) * intro)
      const ck = rainK * pop01(s.clt, 0.1, 0.4, 2)
      const csc = Math.min(1.15, s.w / 900)
      cloud(x, s.cx, ey + 10, csc * lerp(0.4, 1, ck), s.t, clamp(ck * 1.5))
      // the umbrella opens when it rains
      let U = null
      if (P) {
        person(x, px, py, sc * pk, P.col, { t: s.t, sign: P.sign, pose: 'stand' })
        if (pk > 0) {
          x.save(); x.translate(px, py + Math.sin(s.t * 2.2) * 3 * sc * 0); x.scale(sc * pk, sc * pk)
          const o = ease.inOutCubic(clamp(rainK * 1.2))
          U = umbrella(x, o, PINK)
          x.restore()
        }
        sweat(x, px, hy, sc, s.t, sunK * pk)
      }
      if (rainK > 0.05) {
        const y0 = ey + 80 * csc, half = 150 * csc
        const stop = U ? (rx, fl) => { const dx = rx - (px + U.dx * sc); return Math.abs(dx) < U.hw * sc ? py + (U.top * sc) + (Math.abs(dx) / (U.hw * sc)) ** 2 * (U.lip - U.top) * sc * 0.9 : fl } : null
        rainIn(x, s.cx - half, s.cx + half, y0, py, s.t, clamp((rainK - 0.05) * 2), { slant: 0.05, stop })
      }
      if (sunK > 0.3 && mode !== 'rain') {
        // heat wiggles off the ground
        x.save(); x.globalAlpha *= (sunK - 0.3) * 0.9
        for (let i = 0; i < 3; i++) { const ph = (s.t * 0.6 + i / 3) % 1, y = py - 20 - ph * 140, x0 = s.cx + (i - 1) * s.w * 0.3; x.globalAlpha = (sunK - 0.3) * Math.sin(Math.PI * ph); x.beginPath(); for (let k = 0; k <= 8; k++) { const xx = x0 - 60 + k * 15, yy = y + Math.sin(k * 1.2 + s.t * 6) * 8; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } line(x, ORANGE, 5, 10) }
        x.restore()
      }
    } else if (mode === 'heat') {
      sunDisc(x, s.cx + s.w * 0.26, ey - 10, Math.min(75, s.h * 0.075) * pop01(s.clt, 0.1, 0.4, 2), s.t)
      const th = Math.min(s.h * 0.62, 560), tk = pop01(s.clt, 0.15, 0.42, 2.2)
      const lvl = lerp(0.35, 1.04, ease.inOutCubic(prog(s.lt, 0.2, s.dur * 0.6)))
      const melt = ease.inOutCubic(prog(s.lt, s.dur * 0.45, s.dur * 0.85))
      x.save(); x.translate(P ? s.cx + s.w * 0.14 : s.cx, py - th * 0.16 - 20); x.scale(tk, tk)
      thermometer(x, 0, 0, th, lvl, s.t, { melt })
      x.restore()
      if (P) { person(x, px, py, sc * pk, P.col, { t: s.t, sign: P.sign, pose: 'sad' }); sweat(x, px, hy, sc, s.t, pk) }
      x.save(); x.globalAlpha *= 0.7 * intro
      for (let i = 0; i < 3; i++) { const ph = (s.t * 0.6 + i / 3) % 1, y = py - 20 - ph * 160, x0 = s.cx + (i - 1) * s.w * 0.32; x.globalAlpha = 0.7 * Math.sin(Math.PI * ph); x.beginPath(); for (let k = 0; k <= 8; k++) { const xx = x0 - 60 + k * 15, yy = y + Math.sin(k * 1.2 + s.t * 6) * 8; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } line(x, ORANGE, 5, 10) }
      x.restore()
    } else if (mode === 'cold-front') {
      const q = ease.inOutCubic(prog(s.lt, s.dur * 0.12, s.dur * 0.7))
      const fx = lerp(s.cx - s.w * 0.62, s.cx + s.w * 0.62, q)
      const fy0 = s.top + 10, fy1 = py
      const FX = y => fx + Math.sin((y - fy0) / (fy1 - fy0) * Math.PI * 1.2 + 0.4) * 50
      // warm air ahead, cold air behind
      x.save()
      x.beginPath(); x.moveTo(s.cx - s.w / 2, fy0); for (let i = 0; i <= 20; i++) { const y = lerp(fy0, fy1, i / 20); x.lineTo(Math.max(s.cx - s.w / 2, FX(y)), y) } x.lineTo(s.cx - s.w / 2, fy1); x.closePath()
      x.clip()
      // wind streaks in the cold air
      x.lineCap = 'round'
      for (let i = 0; i < 9; i++) { const ph = (s.t * 1.2 + i * 0.37) % 1, y = lerp(fy0 + 40, fy1 - 60, (i * 0.61) % 1), x0 = s.cx - s.w / 2 + ph * s.w * 1.2 - 200; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.beginPath(); x.moveTo(x0, y); x.quadraticCurveTo(x0 + 80, y - 14, x0 + 160, y); x.quadraticCurveTo(x0 + 190, y + 8, x0 + 176, y + 20); line(x, '#cfeeff', 6, 12) }
      x.restore()
      // the front: a line with triangles
      x.beginPath(); for (let i = 0; i <= 30; i++) { const y = lerp(fy0, fy1, i / 30); i ? x.lineTo(FX(y), y) : x.moveTo(FX(y), y) } line(x, BLUE, 8, 22)
      for (let i = 0; i < 6; i++) {
        const y = lerp(fy0 + 40, fy1 - 40, i / 5), X = FX(y)
        x.beginPath(); x.moveTo(X, y - 26); x.lineTo(X + 36, y); x.lineTo(X, y + 26); x.closePath(); ink(x, BLUE, { w: 6, fa: 0.7, glow: 16 })
      }
      // thermometer drops once the front passes
      const tx = s.cx + s.w * 0.3, passT = clamp((fx - (tx - 60)) / 200)
      x.save(); x.translate(tx, py - 120); const tk = pop01(s.clt, 0.15, 0.4, 2.2); x.scale(tk, tk)
      thermometer(x, 0, 0, Math.min(s.h * 0.5, 440), lerp(0.85, 0.2, ease.inOutCubic(passT)), s.t, { col: passT > 0.5 ? BLUE : RED })
      x.restore()
      if (P) {
        const cold = ease.inOutCubic(clamp((fx - (px - 80)) / 160))
        const shiver = cold * Math.sin(s.t * 60) * 4
        person(x, px + shiver, py, sc * pk, cold > 0.5 ? BLUE : P.col, { t: s.t, sign: P.sign, pose: cold > 0.5 ? 'shrug' : 'stand' })
        if (cold > 0) {
          // a scarf
          x.save(); x.translate(px + shiver, py); x.scale(sc * pk, sc * pk)
          const k = pop01(cold, 0.4, 0.3, 2.4)
          x.scale(1, k)
          x.beginPath(); x.ellipse(0, -192, 50, 16, 0, 0, TAU); ink(x, PINK, { w: 7, fa: 0.7, glow: 14 })
          rr(x, 18, -192, 22, 70, 8); ink(x, PINK, { w: 6, fa: 0.7, glow: 10 })
          x.restore()
          if (cold > 0.6) label(x, 'brr', px + 110 * sc, hy - 70 * sc, { size: 48, weight: 900, family: 'serif', italic: true, color: BLUE, alpha: clamp((cold - 0.6) * 4), glow: 14 })
        }
      }
    } else if (mode === 'humid') {
      // sticky air: a teal haze, drifting droplets, steam off the ground, frizz that keeps growing
      const g = x.createRadialGradient(s.cx, s.cy, 50, s.cx, s.cy, s.w * 0.6); g.addColorStop(0, rgba(TEAL, 0.18 * intro)); g.addColorStop(1, rgba(TEAL, 0))
      x.fillStyle = g; x.fillRect(s.cx - s.w / 2, s.top, s.w, s.h)
      sunDisc(x, s.cx + s.w * 0.28, ey - 20, Math.min(60, s.h * 0.06) * pop01(s.clt, 0.1, 0.4, 2), s.t, 0.7)
      const r = rng(23)
      for (let i = 0; i < 22; i++) {
        const bx = s.cx + (r() - 0.5) * s.w * 0.95, by0 = s.top + r() * s.h * 0.85, sp = 20 + r() * 30
        const bxx = bx + Math.sin(s.t * 0.8 + i) * 24, byy = by0 - ((s.t * sp + i * 40) % 120) + 60
        x.save(); x.globalAlpha *= intro * (0.45 + 0.4 * Math.sin(s.t * 2 + i))
        x.beginPath(); x.arc(bxx, byy, 6 + (i % 3) * 4, 0, TAU); ink(x, '#9ff0e0', { w: 4, fa: 0.3, glow: 10 })
        x.restore()
      }
      x.save(); x.lineCap = 'round'
      for (let i = 0; i < 5; i++) { const ph = (s.t * 0.5 + i / 5) % 1, x0 = s.cx + (i - 2) * s.w * 0.2; x.globalAlpha = Math.sin(Math.PI * ph) * 0.75 * intro; x.beginPath(); for (let k = 0; k <= 12; k++) { const yy = py - 10 - ph * 120 - k * 14, xx = x0 + 16 * Math.sin(k * 0.6 + s.t * 3 + i); k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } line(x, BONE, 7, 12) }
      x.restore()
      if (P) {
        const grow = ease.outCubic(prog(s.lt, 0.3, s.dur * 0.85))
        // frizz behind the head
        x.save(); x.translate(px, hy + Math.sin(s.t * 2.2) * 3 * sc); x.scale(sc * pk, sc * pk)
        for (let i = 0; i < 16; i++) {
          const a = Math.PI * (1.02 + i * 0.96 / 15) + (i % 2 ? 0.05 : -0.05), r0 = 34, r1 = 34 + (16 + 52 * grow) * (0.7 + 0.3 * Math.sin(i * 2.3))
          x.beginPath()
          for (let k = 0; k <= 14; k++) { const u = k / 14, rr0 = lerp(r0, r1, u), wig = Math.sin(u * 14 + i + s.t * 4) * 7 * u; const aa = a + wig / rr0; k ? x.lineTo(Math.cos(aa) * rr0, Math.sin(aa) * rr0) : x.moveTo(Math.cos(aa) * rr0, Math.sin(aa) * rr0) }
          line(x, GOLD, 6, 10)
        }
        x.restore()
        person(x, px, py, sc * pk, P.col, { t: s.t, sign: P.sign, pose: 'shrug' })
        sweat(x, px, hy, sc, s.t, pk * 0.8)
      }
    }
    boxLabel(x, p, s, s.top + 40)
  },
  cues(p, t0, dur, ctx = {}) {
    const mode = p.mode || 'swap', c = [['pop', t0 + 0.2, 700, 0.04, 0]]
    if (mode === 'swap') { const every = p.every ?? 1.1; for (let t = every; t < dur; t += every) c.push(['whoosh', t0 + t, 0.35, 0.05]) }
    if (mode === 'heat') c.push(['riser', t0 + 0.2, t0 + dur * 0.6, 0.04])
    if (mode === 'cold-front') c.push(['whoosh', t0 + dur * 0.12, dur * 0.58, 0.06])
    if (mode === 'humid') c.push(['glitter', t0 + 0.3, t0 + Math.min(dur, 1.6)])
    if (p.label) c.push(['pop', t0 + (p.labelAt ?? 0.45) * dur, 880, 0.04, 0])
    return c
  },
}

// ───────────────────────── lovebugs: Gulf Coast lovebugs fly joined tail to tail, in pairs
/** one bug facing +x, its tail tip at (0, 0); L ≈ 80 px at s 1 */
function bug(x, t, ph, edge = '#c9a6ff') {
  // wings (flutter)
  const fl = 0.55 + 0.45 * Math.abs(Math.sin(t * 38 + ph))
  for (const d of [-1, 1]) {
    x.save(); x.translate(50, -4); x.scale(1, fl)
    x.beginPath(); x.ellipse(-18, d * 14, 30, 11, d * 0.35, 0, TAU)
    x.fillStyle = 'rgba(200,190,230,0.28)'; x.fill(); x.strokeStyle = rgba(BONE, 0.55); x.lineWidth = 3; x.stroke()
    x.restore()
  }
  // legs
  x.strokeStyle = rgba(edge, 0.8); x.lineWidth = 3; x.lineCap = 'round'
  for (let i = 0; i < 3; i++) for (const d of [-1, 1]) { const lx = 40 + i * 9, w = Math.sin(t * 9 + i + ph) * 3; x.beginPath(); x.moveTo(lx, d * 6); x.lineTo(lx - 4 + w, d * 18); x.lineTo(lx - 10 + w, d * 22); x.stroke() }
  // abdomen (black, neon edge)
  x.beginPath(); x.ellipse(24, 0, 25, 10, 0, 0, TAU); x.fillStyle = '#0d0716'; x.fill(); ink(x, edge, { w: 4, fa: 0, glow: 10 })
  x.strokeStyle = rgba(edge, 0.45); x.lineWidth = 2
  for (const sx of [14, 22, 30]) { x.beginPath(); x.moveTo(sx, -8); x.lineTo(sx, 8); x.stroke() }
  // the orange-red thorax
  x.beginPath(); x.ellipse(55, 0, 11, 10, 0, 0, TAU); x.fillStyle = '#ff5a2a'; x.shadowColor = '#ff5a2a'; x.shadowBlur = 18; x.fill(); x.shadowBlur = 0
  x.strokeStyle = '#ffb08a'; x.lineWidth = 3; x.stroke()
  // head + antennae
  x.beginPath(); x.arc(70, 0, 7, 0, TAU); x.fillStyle = '#0d0716'; x.fill(); x.strokeStyle = edge; x.lineWidth = 3; x.stroke()
  for (const d of [-1, 1]) { x.beginPath(); x.moveTo(75, d * 3); x.quadraticCurveTo(86, d * 10, 92 + Math.sin(t * 5 + ph) * 2, d * 16); x.strokeStyle = rgba(edge, 0.9); x.lineWidth = 3; x.stroke() }
}
/** a joined pair centred at (px, py) heading `a`; s = scale */
function bugPair(x, px, py, a, s, t, ph) {
  x.save(); x.translate(px, py); x.rotate(a); x.scale(s, s)
  const bend = 0.18 * Math.sin(t * 2 + ph)
  x.save(); x.rotate(bend * 0.5); x.translate(2, 0); bug(x, t, ph); x.restore()
  x.save(); x.rotate(Math.PI - bend * 0.5); x.translate(2, 0); bug(x, t, ph + 1.3); x.restore()
  x.restore()
}
const lovebugs = {
  min: () => 2.2,
  draw(x, p, s) {
    const n = clamp(p.n ?? 5, 1, 8)
    const r = rng(p.seed ?? 13)
    const pairs = []
    for (let i = 0; i < n; i++) {
      const hero = i === 0
      const fx = 0.35 + r() * 0.3, fy = 0.5 + r() * 0.4, ph = r() * TAU, ph2 = r() * TAU
      const Ax = s.w * (hero ? 0.1 : 0.1), Ay = s.h * (hero ? 0.06 : 0.07)
      const ha = n > 1 ? (i - 1) / (n - 1) * TAU + 0.6 : 0
      const ox = hero ? 0 : Math.cos(ha) * s.w * 0.33, oy = hero ? 0 : Math.sin(ha) * s.h * 0.34
      const pos = t => [s.cx + ox + Math.sin(t * fx + ph) * Ax + Math.sin(t * fx * 2.3 + ph2) * Ax * 0.15, s.cy + oy + Math.sin(t * fy + ph2) * Ay + Math.sin(t * 3.1 + ph) * 6]
      pairs.push({ hero, pos, sc: hero ? Math.min(2.6, s.h / 420) : 1.0 + r() * 0.4, ph, at: hero ? 0.1 : stagger(i - 1, n - 1, s.dur, 0.2, 0.55) })
    }
    // back to front: small ones first
    pairs.slice().reverse().forEach((P, j) => {
      const k = pop01(s.clt, P.at, 0.36, 2.3)
      if (k <= 0) return
      const [px, py] = P.pos(s.t), [qx, qy] = P.pos(s.t + 0.05)
      const a = Math.atan2(qy - py, qx - px)
      // a little loop-the-loop trail
      x.save(); x.globalAlpha *= 0.35 * k; x.setLineDash([4, 16]); x.beginPath()
      for (let i = 0; i <= 16; i++) { const [tx, ty] = P.pos(s.t - i * 0.08); i ? x.lineTo(tx, ty) : x.moveTo(tx, ty) }
      x.strokeStyle = P.hero ? GOLD : BONE; x.lineWidth = 5; x.lineCap = 'round'; x.stroke(); x.setLineDash([]); x.restore()
      bugPair(x, px, py, a, P.sc * k, s.t, P.ph)
      // hearts float off the hero pair
      if (P.hero && p.hearts !== false) {
        for (let i = 0; i < 3; i++) {
          const ph = (s.t * 0.55 + i / 3) % 1, hx = px + Math.sin(ph * 5 + i * 2) * 30 + (i - 1) * 40, hy = py - 50 * P.sc - ph * 150
          heart(x, hx, hy, (16 + 10 * (1 - ph)) * k, [PINK, ROSE, GOLD][i], { alpha: Math.sin(Math.PI * ph) * clamp(s.clt - 0.4), w: 5 })
        }
      }
    })
    boxLabel(x, p, s)
  },
  cues(p, t0, dur) {
    const n = clamp(p.n ?? 5, 1, 8), c = [['pop', t0 + 0.1, 880, 0.05, 0]]
    for (let i = 1; i < n; i++) c.push(['pop', t0 + stagger(i - 1, n - 1, dur, 0.2, 0.55), 990 + i * 70, 0.035, (i % 2 ? -1 : 1) * 0.4])
    if (p.label) c.push(['pop', t0 + (p.labelAt ?? 0.45) * dur, 880, 0.04, 0])
    return c
  },
}

// ───────────────────────── bayou: a winding bayou path at sunset, the skyline far off, walkers on the trail
function tree(x, px, base, s, t, seed) {
  if (s <= 0) return
  x.save(); x.translate(px, base); x.scale(s, s)
  const sway = 3 * Math.sin(t * 1.4 + seed)
  x.beginPath(); x.moveTo(0, 0); x.lineTo(sway * 0.3, -110); line(x, '#b39ce8', 12, 6)
  x.beginPath(); x.ellipse(sway, -170, 66, 78, 0, 0, TAU); ink(x, '#7fe0a8', { w: 9, fa: 0.3, glow: 14, fill: TEAL })
  x.restore()
}
/** a walker from behind (no face), feet at (px, py) */
function walker(x, px, py, s, col, step) {
  x.save(); x.translate(px, py); x.scale(s, s)
  const sw = Math.sin(step), bob = Math.abs(Math.cos(step)) * 6
  x.translate(0, -bob)
  for (const d of [-1, 1]) { x.beginPath(); x.moveTo(d * 18, -110); x.lineTo(d * 18 + sw * d * 20, -4); line(x, col, 24, 8) }
  x.beginPath(); x.moveTo(-44, -100); x.lineTo(-38, -212); x.quadraticCurveTo(-38, -246, 0, -248); x.quadraticCurveTo(38, -246, 38, -212); x.lineTo(44, -100); x.closePath()
  x.fillStyle = '#1c1238'; x.fill(); ink(x, col, { w: 9, fa: 0.35, glow: 18 })
  for (const d of [-1, 1]) { x.beginPath(); x.moveTo(d * 40, -216); x.lineTo(d * 54 - sw * d * 14, -132); line(x, col, 15, 6) }
  x.beginPath(); x.arc(0, -284, 32, 0, TAU); ink(x, col, { w: 9, fa: 0.85, glow: 18 })
  x.restore()
}
const bayou = {
  min: () => 2.6,
  draw(x, p, s) {
    const pw = s.w, ph = Math.min(s.h, 1050), x0 = s.cx - pw / 2, y0 = s.cy - ph / 2
    const hz = y0 + ph * 0.42
    const intro = ease.outCubic(prog(s.clt, 0, 0.6))
    x.save()
    rr(x, x0, y0, pw, ph, 56); x.clip()
    // sunset sky
    const g = x.createLinearGradient(0, y0, 0, hz)
    g.addColorStop(0, '#24124e'); g.addColorStop(0.55, '#7a2a6e'); g.addColorStop(1, '#ff8a5a')
    x.fillStyle = g; x.fillRect(x0, y0, pw, hz - y0 + 2)
    twinkles(x, s.cx, y0 + ph * 0.12, s.t, { n: 8, R: pw * 0.45, seed: 5, size: 16 })
    stripedSun(x, s.cx - pw * 0.08, hz - 10, Math.min(170, ph * 0.17) * pop01(s.clt, 0.1, 0.6, 1.6), hz)
    miniSkyline(x, s.cx - pw * 0.34, s.cx + pw * 0.22, hz, ph * 0.17, s.t, 1, PINK)
    // ground
    const gg = x.createLinearGradient(0, hz, 0, y0 + ph)
    gg.addColorStop(0, '#2a1640'); gg.addColorStop(1, '#120a26')
    x.fillStyle = gg; x.fillRect(x0, hz, pw, ph)
    x.beginPath(); x.moveTo(x0, hz); x.lineTo(x0 + pw, hz); line(x, ORANGE, 5, 14)
    // the bayou winding from the horizon to us
    const N = 40
    const cxOf = v => s.cx + pw * 0.06 + Math.sin(v * 3.2 + 0.4) * pw * 0.26 * Math.pow(v, 0.8) - pw * 0.12 * v
    const wOf = v => lerp(16, pw * 0.5, Math.pow(v, 1.4))
    const yOf = v => lerp(hz, y0 + ph + 20, v)
    const reveal = ease.inOutCubic(prog(s.clt, 0.05, 0.75))
    x.beginPath()
    for (let i = 0; i <= N; i++) { const v = i / N; i ? x.lineTo(cxOf(v) - wOf(v) / 2, yOf(v)) : x.moveTo(cxOf(v) - wOf(v) / 2, yOf(v)) }
    for (let i = N; i >= 0; i--) { const v = i / N; x.lineTo(cxOf(v) + wOf(v) / 2, yOf(v)) }
    x.closePath()
    x.save(); x.globalAlpha *= reveal
    const wg = x.createLinearGradient(0, hz, 0, y0 + ph); wg.addColorStop(0, '#ff9a6a'); wg.addColorStop(0.3, '#7a4aa0'); wg.addColorStop(1, '#2a3a8a')
    x.fillStyle = wg; x.fill()
    x.clip()
    // sun shimmer on the water
    x.lineCap = 'round'
    for (let i = 0; i < 14; i++) { const v = 0.08 + (i / 14) * 0.85, y = yOf(v), w = wOf(v) * (0.2 + 0.25 * ((i * 7) % 3) / 2), off = Math.sin(s.t * 1.5 + i) * wOf(v) * 0.15; x.globalAlpha = reveal * (0.4 + 0.4 * Math.sin(s.t * 2.4 + i * 1.7)); x.beginPath(); x.moveTo(cxOf(v) - w / 2 + off, y); x.lineTo(cxOf(v) + w / 2 + off, y); x.strokeStyle = i % 2 ? '#ffd08a' : '#ffb0c8'; x.lineWidth = 3 + v * 6; x.stroke() }
    x.restore()
    x.save(); x.globalAlpha *= reveal
    for (const d of [-1, 1]) { x.beginPath(); for (let i = 0; i <= N; i++) { const v = i / N; i ? x.lineTo(cxOf(v) + d * wOf(v) / 2, yOf(v)) : x.moveTo(cxOf(v) + d * wOf(v) / 2, yOf(v)) } line(x, BLUE, 6, 16) }
    // the trail along the right bank
    const trailX = v => cxOf(v) + wOf(v) / 2 + lerp(14, pw * 0.13, v)
    x.setLineDash([18, 16]); x.beginPath(); for (let i = 0; i <= N; i++) { const v = i / N; i ? x.lineTo(trailX(v), yOf(v)) : x.moveTo(trailX(v), yOf(v)) } line(x, rgba(BONE, 0.75), 6, 8); x.setLineDash([])
    x.restore()
    // trees on both banks
    const TR = [[0.12, -1], [0.22, 1.9], [0.35, -1.1], [0.5, 2.0], [0.7, -1.15], [0.86, 2.1]]
    TR.forEach(([v, side], i) => {
      const k = pop01(s.clt, 0.3 + i * 0.07, 0.36, 2.2)
      const bx = side < 0 ? cxOf(v) - wOf(v) / 2 - lerp(20, pw * 0.16, v) : trailX(v) + lerp(16, pw * 0.1, v) * (side - 1)
      tree(x, bx, yOf(v), lerp(0.18, 0.95, v) * k, s.t, i)
    })
    // fireflies
    const r = rng(19)
    for (let i = 0; i < 12; i++) { const fx = x0 + r() * pw, fy = hz + r() * ph * 0.5, ph0 = r() * 9; x.globalAlpha = 0.5 + 0.5 * Math.sin(s.t * 3 + ph0); drawPixelStar(x, fx + Math.sin(s.t * 0.7 + ph0) * 20, fy + Math.cos(s.t * 0.9 + ph0) * 12, 12, 1, '#fff3a0'); x.globalAlpha = 1 }
    // walkers on the trail, heading toward the city
    const nW = clamp(p.walkers ?? 2, 1, 2)
    const v = lerp(0.8, 0.7, prog(s.clt, 0, Math.max(3, s.cdur || s.dur)))
    const ws = lerp(0.15, 0.95, v) * Math.min(1, ph / 900)
    const wk = pop01(s.clt, 0.4, 0.4, 2.2)
    const cols = [BLUE, PINK]
    for (let i = 0; i < nW; i++) {
      const wx = trailX(v) + (nW > 1 ? (i ? 1 : -1) * 48 * ws : 0), wy = yOf(v) + (i ? 6 : 0)
      walker(x, wx, wy, ws * wk, cols[i], s.t * 5.5 + i * Math.PI)
    }
    if (nW === 2 && p.heart !== false) {
      const hk = pop01(s.lt, (p.heartAt ?? 0.55) * s.dur, 0.4, 2.6)
      heart(x, trailX(v), yOf(v) - 360 * ws + Math.sin(s.t * 2.4) * 6, 36 * hk, PINK)
      sparkle(x, trailX(v), yOf(v) - 360 * ws, s.lt, (p.heartAt ?? 0.55) * s.dur + 0.1, { n: 10, R: 120, seed: 81 })
    }
    x.restore()
    rr(x, x0, y0, pw, ph, 56); ink(x, ORANGE, { w: 6, fa: 0, glow: 26 })
    if (p.label) { const k = pop01(s.lt, (p.labelAt ?? 0.45) * s.dur, 0.34, 2.3); if (k > 0) { x.save(); x.translate(s.cx, y0 + 60); x.scale(k, k); pill(x, p.label, 0, 0, { size: 40, col: color(p.labelCol, GOLD), weight: 800 }); x.restore() } }
    x.globalAlpha = 1
  },
  cues(p, t0, dur) {
    const c = [['whoosh', t0 + 0.05, 0.7, 0.05], ['pluck', t0 + 0.4, 587.33, 0.04, 0.8, 0]]
    for (let i = 0; i < 6; i += 2) c.push(['pop', t0 + 0.3 + i * 0.07 + 0.2, 700 + i * 80, 0.03, (i / 5 - 0.5)])
    if ((p.walkers ?? 2) === 2 && p.heart !== false) c.push(['bell', t0 + (p.heartAt ?? 0.55) * dur, 1175, 0.05, 2, 0])
    if (p.label) c.push(['pop', t0 + (p.labelAt ?? 0.45) * dur, 880, 0.04, 0])
    return c
  },
}

// ───────────────────────── truck: a glowing generic food truck window at night
const truck = {
  min: () => 2.4,
  draw(x, p, s) {
    const sc = Math.min(1.05, s.w / 960, s.h / 820)
    const gy = s.cy + 300 * sc, cx = s.cx
    const intro = pop01(s.clt, 0.05, 0.45, 1.8)
    const U = (u, v) => [cx + u * sc, gy + v * sc]
    const winK = ease.outCubic(prog(s.clt, 0.35, 0.75))
    // string lights from the roof to a pole
    const lk = ease.outCubic(prog(s.clt, 0.5, 0.95))
    if (lk > 0) {
      const [ax, ay] = U(-330, -560), [bx, by] = U(-470, -470)
      const [px0, py0] = U(-470, 0)
      x.beginPath(); x.moveTo(px0, py0); x.lineTo(bx, by - 10); line(x, MUTED, 7, 6)
      const [cx2, cy2] = U(330, -560)
      const pts = []
      for (let i = 0; i <= 12; i++) { const u = i / 12, X = lerp(bx, cx2, u), Y = lerp(by, cy2, u) + Math.sin(Math.PI * u) * 70 * sc; pts.push([X, Y]) }
      x.beginPath(); pts.forEach(([X, Y], i) => i ? x.lineTo(X, Y) : x.moveTo(X, Y)); x.strokeStyle = rgba(BONE, 0.5); x.lineWidth = 3; x.stroke()
      pts.forEach(([X, Y], i) => { if (i / 12 > lk) return; const c = [GOLD, PINK, BLUE][i % 3], on = 0.55 + 0.45 * Math.sin(s.t * 3 + i * 1.3); x.beginPath(); x.arc(X, Y + 8, 9, 0, TAU); x.fillStyle = c; x.shadowColor = c; x.shadowBlur = 20 * on; x.globalAlpha = 0.5 + 0.5 * on; x.fill(); x.globalAlpha = 1; x.shadowBlur = 0 })
      void ax; void ay
    }
    x.save()
    x.translate(cx, gy); x.scale(intro, intro); x.translate(-cx, -gy)
    // light spilling on the ground
    const spill = x.createRadialGradient(cx - 40 * sc, gy, 10, cx - 40 * sc, gy, 420 * sc)
    spill.addColorStop(0, rgba(GOLD, 0.3 * winK)); spill.addColorStop(1, rgba(GOLD, 0))
    x.fillStyle = spill; x.beginPath(); x.ellipse(cx - 40 * sc, gy, 440 * sc, 70 * sc, 0, 0, TAU); x.fill()
    x.save(); x.translate(cx, gy); x.scale(sc, sc)
    // body (box) + cab (right)
    x.beginPath(); x.moveTo(-360, -70); x.lineTo(-360, -500); x.quadraticCurveTo(-360, -540, -320, -540); x.lineTo(200, -540); x.quadraticCurveTo(240, -540, 240, -500); x.lineTo(240, -70); x.closePath()
    x.fillStyle = DARK; x.fill(); ink(x, VIOLET, { w: 8, fa: 0.2, glow: 22 })
    x.beginPath(); x.moveTo(240, -70); x.lineTo(240, -380); x.lineTo(340, -380); x.quadraticCurveTo(372, -380, 384, -340); x.lineTo(410, -240); x.lineTo(410, -70); x.closePath()
    x.fillStyle = DARK; x.fill(); ink(x, VIOLET, { w: 8, fa: 0.2, glow: 22 })
    x.beginPath(); x.moveTo(262, -250); x.lineTo(262, -356); x.lineTo(334, -356); x.quadraticCurveTo(356, -356, 364, -330); x.lineTo(384, -250); x.closePath(); ink(x, BLUE, { w: 6, fa: 0.25, glow: 12 })
    // stripe
    x.beginPath(); x.moveTo(-360, -130); x.lineTo(410, -130); line(x, PINK, 6, 14)
    // wheels
    for (const wx of [-230, 300]) { x.beginPath(); x.arc(wx, -62, 62, 0, TAU); x.fillStyle = '#0a0716'; x.fill(); ink(x, BONE, { w: 8, fa: 0, glow: 12 }); x.beginPath(); x.arc(wx, -62, 22, 0, TAU); ink(x, MUTED, { w: 6, fa: 0.4, glow: 6 }) }
    // the serving window, glowing
    const wx0 = -300, wy0 = -440, ww = 380, wh = 220
    const wg = x.createLinearGradient(0, wy0, 0, wy0 + wh); wg.addColorStop(0, rgba('#ffe7a8', 0.95 * winK)); wg.addColorStop(1, rgba('#ffb84a', 0.85 * winK))
    rr(x, wx0, wy0, ww, wh, 14); x.fillStyle = 'rgba(30,20,10,0.9)'; x.fill(); x.fillStyle = wg; x.fill()
    x.save(); x.shadowColor = GOLD; x.shadowBlur = 50 * winK; rr(x, wx0, wy0, ww, wh, 14); x.strokeStyle = GOLD; x.lineWidth = 8; x.stroke(); x.restore()
    // the cook inside (a pictogram silhouette, no face)
    if (winK > 0) {
      x.save(); rr(x, wx0, wy0, ww, wh, 14); x.clip()
      person(x, wx0 + ww * 0.62, wy0 + wh + 90, 0.95, '#6a3a20', { t: s.t, pose: 'stand', bob: true, a: winK })
      // a hanging lamp
      x.beginPath(); x.moveTo(wx0 + ww * 0.25, wy0); x.lineTo(wx0 + ww * 0.25, wy0 + 40); line(x, '#6a3a20', 4, 0)
      x.beginPath(); x.arc(wx0 + ww * 0.25, wy0 + 52, 16, Math.PI, 0); x.fillStyle = '#6a3a20'; x.fill()
      x.restore()
    }
    // counter
    rr(x, wx0 - 20, wy0 + wh - 4, ww + 40, 22, 8); ink(x, BONE, { w: 6, fa: 0.4, glow: 10 })
    // awning (scalloped stripes)
    const aw0 = wx0 - 30, aw1 = wx0 + ww + 30, ay = wy0 - 14, n = 6, flap = Math.sin(s.t * 2) * 3
    for (let i = 0; i < n; i++) {
      const a0 = lerp(aw0, aw1, i / n), a1 = lerp(aw0, aw1, (i + 1) / n)
      x.beginPath(); x.moveTo(a0 + 10, ay - 70); x.lineTo(a1 + 10, ay - 70); x.lineTo(a1, ay + flap); x.quadraticCurveTo((a0 + a1) / 2, ay + 30 + flap, a0, ay + flap); x.closePath()
      ink(x, i % 2 ? PINK : BONE, { w: 5, fa: i % 2 ? 0.6 : 0.35, glow: 12 })
    }
    // menu board (squiggle lines: no words, no brand)
    rr(x, 120, -440, 100, 190, 10); ink(x, BONE, { w: 6, fa: 0.12, glow: 10 })
    for (let i = 0; i < 5; i++) { const y = -410 + i * 34; x.beginPath(); for (let k = 0; k <= 6; k++) { const xx = 136 + k * 11, yy = y + Math.sin(k * 2 + i) * 3; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.strokeStyle = rgba([GOLD, PINK, BLUE][i % 3], 0.8); x.lineWidth = 4; x.stroke() }
    // roof sign
    const sk = pop01(s.clt, 0.6, 0.36, 2.6)
    if (sk > 0) {
      x.save(); x.translate(-60, -600); x.scale(sk, sk); x.rotate(0.03 * Math.sin(s.t * 1.5))
      x.beginPath(); x.moveTo(-80, 50); x.lineTo(-80, 66); x.moveTo(80, 50); x.lineTo(80, 66); line(x, MUTED, 6, 4)
      if (p.sign === false) { rr(x, -120, -54, 240, 108, 28); x.fillStyle = 'rgba(16,10,40,0.92)'; x.fill(); ink(x, PINK, { w: 7, fa: 0, glow: 22 }); x.save(); x.scale(0.4, 0.4); x.translate(0, 20); FOOD.taco(x, s.t); x.restore() }
      else {
        const txt = String(p.sign || 'TACOS').toUpperCase()
        x.font = font(66, { weight: 900 }); const tw = Math.min(520, x.measureText(txt).width) + 80
        rr(x, -tw / 2, -54, tw, 108, 28); x.fillStyle = 'rgba(16,10,40,0.92)'; x.fill(); ink(x, PINK, { w: 7, fa: 0, glow: 26 })
        const flick = s.t % 3.7 < 0.08 ? 0.4 : 1
        label(x, txt, 0, 4, { size: 66, weight: 900, color: '#ffd0e0', glow: 26 * flick, alpha: flick, maxW: 520 })
      }
      x.restore()
    }
    // steam out of the window
    x.save(); x.translate(wx0 + ww * 0.45, wy0 - 80); steam(x, s.t, 3, 0, 50, winK); x.restore()
    x.restore()
    x.restore()
    // ground
    x.beginPath(); x.moveTo(s.cx - s.w / 2, gy); x.lineTo(s.cx + s.w / 2, gy); line(x, rgba(BONE, 0.5), 5, 8)
    // people at the window
    const nP = clamp(p.people ?? 2, 1, 2)
    const cols = [BLUE, PINK]
    const psc = 0.88 * sc
    const wc = cx + (wx0 + ww / 2) * sc
    const spots = nP === 1 ? [wc - 40 * sc] : [wc - 120 * sc, wc + 70 * sc]
    spots.forEach((px, i) => {
      const k = pop01(s.clt, 0.55 + i * 0.25, 0.36, 2.3)
      person(x, px, gy + 60 * sc, psc * k, cols[i], { t: s.t, pose: i ? 'phone' : 'stand', seed: i, flip: i === 1 })
    })
    if (nP === 2 && p.heart !== false) {
      const at = (p.heartAt ?? 0.6) * s.dur, hk = pop01(s.lt, at, 0.4, 2.6)
      const hy = gy + 60 * sc - 330 * psc, wc2 = wc - 25 * sc
      heart(x, wc2, hy + Math.sin(s.t * 2.4) * 6, 40 * hk, PINK)
      sparkle(x, wc2, hy, s.lt, at + 0.1, { n: 10, R: 130, seed: 91 })
    }
    twinkles(x, s.cx + s.w * 0.3, s.top + 90, s.t, { n: 5, R: 140, seed: 7, size: 18 })
    boxLabel(x, p, s, Math.min(s.bottom - 30, gy + 90))
  },
  cues(p, t0, dur) {
    const c = [['pop', t0 + 0.1, 520, 0.04, 0], ['pluck', t0 + 0.4, 659.25, 0.045, 0.9, 0], ['pop', t0 + 0.6, 1175, 0.05, 0]]
    const nP = clamp(p.people ?? 2, 1, 2)
    for (let i = 0; i < nP; i++) c.push(['pop', t0 + 0.55 + i * 0.25, 800 + i * 120, 0.04, i ? 0.3 : -0.3])
    if (nP === 2 && p.heart !== false) c.push(['bell', t0 + (p.heartAt ?? 0.6) * dur, 1318, 0.05, 2, 0])
    return c
  },
}

export default { skyline, map, freeway, food, weather, lovebugs, bayou, truck }
