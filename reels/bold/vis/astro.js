// Astro visuals: the zodiac wheel, sign glyphs, planets, orbits (with honest retrograde loops and planet returns),
// moon phases, elements, the big three, constellations, the rising sign at dawn, aspects, houses and sign cards.
// See ../SPEC.md for the params. Optional extras beyond the spec (all safe to omit):
//   wheel:          spin (true | number rad/s), center ('earth' default | 'none' | a sign: its glyph in the hub)
//   glyph:          el (true: element chip under the name)
//   orbit:          from/to (retro: the window in years around opposition, default −0.3 … 0.3)
//   moon:           label (false hides the phase name, or a string replaces it)
//   elements:       labels true → default keywords, or an array / object { fire: "…" }
//   constellation:  seed (random layout), label (a chip under the sky)
//   horizon:        person: true | a colour | { col, pose }
//   aspect:         at (ecliptic longitude in ° of planet a; default centres the angle at the top)
//   houses:         labels true → default room names, or an array / object { 7: "…" }
//   signcard:       flip (false: no card-back flip in)
// Geometry: ecliptic longitude λ maps to canvas angle π − λ, so Aries 0° sits at 9 o'clock and the signs run
// counter-clockwise, like a chart. Planets orbit counter-clockwise seen from the north; periods are real.
import {
  clamp, lerp, prog, ease, rng, TAU, D2R, BONE, GOLD, PINK, BLUE, VIOLET, RED, GREEN, ORANGE, MUTED, FIRE, EARTH, AIR, WATER,
  ELEMENT_COLOR, SIGNS, PLANETS, color, sign, rgba, easeOutBack, pop01, wob, stagger, ink, line, rr, label, para, pill,
  glyph, sparkle, twinkles, heart, heartPath, starPath, person, cardBack, aura, drawPixelStar, drawMoon, font, wrap,
} from '../kit.js'

// ───────────────────────── helpers
const list = v => v == null || v === false ? [] : Array.isArray(v) ? v : [v]
const ct = s => s.clt ?? s.lt                       // chain time (entrances shouldn't replay inside a keep-chain)
const lonAng = lon => Math.PI - lon                 // ecliptic longitude (rad) → canvas angle
const signMid = i => lonAng((i + 0.5) * 30 * D2R)
const sIdx = id => { const S = sign(id); return S ? SIGNS.indexOf(S) : -1 }
const PENTA = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51, 1479.98]
const PERIOD = { mercury: 0.241, venus: 0.615, earth: 1, mars: 1.881, jupiter: 11.86, saturn: 29.46, uranus: 84.01, neptune: 164.8, pluto: 248.0 }
const AU = { mercury: 0.387, venus: 0.723, earth: 1, mars: 1.524, jupiter: 5.2, saturn: 9.58, uranus: 19.2, neptune: 30.1, pluto: 39.5 }
const pcol = id => PLANETS[id]?.color || GOLD
const pname = id => PLANETS[id]?.name || String(id)

function wedge(x, cx, cy, r0, r1, a0, a1) {
  const ccw = a1 < a0
  x.beginPath(); x.arc(cx, cy, r1, a0, a1, ccw); x.arc(cx, cy, r0, a1, a0, !ccw); x.closePath()
}
function ring(x, cx, cy, r, col, w = 6, glow = 16, fa = 0) { x.beginPath(); x.arc(cx, cy, r, 0, TAU); ink(x, col, { w, fa, glow }) }
function dashed(x, col, w = 4, d = [14, 14], a = 0.7) { x.save(); x.setLineDash(d); x.strokeStyle = rgba(col, a); x.lineWidth = w; x.lineCap = 'round'; x.stroke(); x.restore() }
const pt = (cx, cy, r, a) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r]

// ───────────────────────── line-art icons (props and gags). s ≈ the icon's size in px; unknown names → a star
const ICON_COL = { heart: PINK, 'broken-heart': PINK, star: GOLD, sun: '#f7c948', moon: '#dcd6ff', coffee: ORANGE, phone: BLUE, flower: PINK, rose: '#ff5d8f', plant: GREEN,
  ring: GOLD, crown: GOLD, lightbulb: '#ffe27a', music: VIOLET, headphones: VIOLET, book: BLUE, key: GOLD, lock: GOLD, cloud: '#cfe6ff', rain: AIR, fire: FIRE, wave: WATER,
  mountain: EARTH, wind: AIR, rocket: '#ff8f6a', telescope: BLUE, clock: BONE, hourglass: GOLD, money: GREEN, gift: PINK, plane: BLUE, mirror: VIOLET, compass: GOLD,
  umbrella: BLUE, suitcase: GOLD, taco: GOLD, cake: PINK, ghost: BONE, chat: BLUE, check: GREEN, cross: RED, question: PINK, magnifier: BLUE, candle: GOLD, letter: BONE, bolt: '#ffe27a', snow: AIR }
function icon(x, name, cx, cy, s, col = null, t = 0) {
  const c = col || ICON_COL[name] || GOLD, k = s / 100, w = 6.5 / k, g = 16
  const I = (fa = 0.3, cc = c) => ink(x, cc, { w, fa, glow: g })
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const B = () => x.beginPath()
  switch (name) {
    case 'heart': heartPath(x, 0, 2, 46); I(0.45); break
    case 'broken-heart': heartPath(x, 0, 2, 46); I(0.4); B(); x.moveTo(0, -24); x.lineTo(-8, -4); x.lineTo(8, 10); x.lineTo(0, 36); ink(x, '#1a1033', { w: w * 0.9, fa: 0, glow: 0 }); break
    case 'sun': B(); x.arc(0, 0, 22, 0, TAU); I(0.5); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t * 0.5; B(); x.moveTo(Math.cos(a) * 32, Math.sin(a) * 32); x.lineTo(Math.cos(a) * 46, Math.sin(a) * 46); I(0) } break
    case 'moon': B(); x.arc(0, 0, 40, -Math.PI / 2, Math.PI / 2, false); x.ellipse(0, 0, 14, 40, 0, Math.PI / 2, -Math.PI / 2, true); x.closePath(); I(0.5); break
    case 'coffee': rr(x, -30, -18, 50, 56, 10); I(0.4); B(); x.arc(24, 8, 13, -Math.PI / 2, Math.PI / 2); I(0); for (const dx of [-14, 4]) { B(); x.moveTo(dx, -28); x.bezierCurveTo(dx - 8, -38, dx + 8, -44, dx, -54); I(0, BONE) } break
    case 'phone': rr(x, -24, -42, 48, 84, 10); I(0.35); B(); x.moveTo(-8, 32); x.lineTo(8, 32); I(0); break
    case 'flower': case 'rose': B(); x.moveTo(0, 6); x.lineTo(0, 48); I(0, GREEN); B(); x.ellipse(12, 32, 12, 6, -0.5, 0, TAU); I(0.4, GREEN)
      for (let i = 0; i < 5; i++) { const a = i / 5 * TAU + t * 0.6; B(); x.arc(Math.cos(a) * 17, -12 + Math.sin(a) * 17, 13, 0, TAU); I(0.5) } B(); x.arc(0, -12, 9, 0, TAU); I(0.8, GOLD); break
    case 'plant': B(); x.moveTo(-26, 16); x.lineTo(26, 16); x.lineTo(18, 48); x.lineTo(-18, 48); x.closePath(); I(0.35, ORANGE); B(); x.moveTo(0, 16); x.quadraticCurveTo(-4, -20, -30, -34); x.quadraticCurveTo(-6, -40, 0, 16); I(0.45); B(); x.moveTo(0, 16); x.quadraticCurveTo(6, -14, 30, -24); x.quadraticCurveTo(10, -36, 0, 16); I(0.45); break
    case 'ring': B(); x.arc(0, 14, 30, 0, TAU); I(0); B(); x.moveTo(-14, -18); x.lineTo(14, -18); x.lineTo(20, -30); x.lineTo(0, -46); x.lineTo(-20, -30); x.closePath(); I(0.5, BLUE); break
    case 'crown': B(); x.moveTo(-42, 28); x.lineTo(-46, -26); x.lineTo(-22, 0); x.lineTo(0, -36); x.lineTo(22, 0); x.lineTo(46, -26); x.lineTo(42, 28); x.closePath(); I(0.4); break
    case 'lightbulb': B(); x.arc(0, -10, 30, Math.PI * 0.8, Math.PI * 2.2); x.lineTo(12, 26); x.lineTo(-12, 26); x.closePath(); I(0.4); B(); x.moveTo(-12, 38); x.lineTo(12, 38); I(0, BONE); break
    case 'music': case 'headphones': B(); x.ellipse(-20, 30, 14, 10, -0.4, 0, TAU); I(0.6); B(); x.ellipse(24, 20, 14, 10, -0.4, 0, TAU); I(0.6); B(); x.moveTo(-8, 28); x.lineTo(-8, -36); x.lineTo(36, -46); x.lineTo(36, 18); I(0); break
    case 'book': case 'letter': B(); x.moveTo(0, -24); x.quadraticCurveTo(-24, -36, -46, -28); x.lineTo(-46, 32); x.quadraticCurveTo(-24, 24, 0, 36); x.quadraticCurveTo(24, 24, 46, 32); x.lineTo(46, -28); x.quadraticCurveTo(24, -36, 0, -24); x.closePath(); I(0.3); B(); x.moveTo(0, -24); x.lineTo(0, 36); I(0); break
    case 'key': case 'lock': B(); x.arc(-22, 0, 18, 0, TAU); I(0.3); B(); x.moveTo(-4, 0); x.lineTo(44, 0); x.moveTo(30, 0); x.lineTo(30, 16); x.moveTo(42, 0); x.lineTo(42, 12); I(0); break
    case 'cloud': case 'rain': B(); x.moveTo(-36, 20); x.arc(-24, 4, 18, Math.PI * 0.6, Math.PI * 1.5); x.arc(4, -10, 26, Math.PI * 1.1, Math.PI * 1.95); x.arc(30, 8, 16, Math.PI * 1.5, Math.PI * 0.4); x.closePath(); I(0.35)
      if (name === 'rain') for (const dx of [-20, 0, 20]) { B(); x.moveTo(dx, 34); x.lineTo(dx - 6, 48); I(0, AIR) } break
    case 'fire': B(); x.moveTo(0, 46); x.bezierCurveTo(-40, 44, -42, 8, -20, -12); x.bezierCurveTo(-18, 6, -8, 8, -6, 0); x.bezierCurveTo(-12, -22, 0, -38, 8, -48); x.bezierCurveTo(10, -26, 40, -14, 36, 16); x.bezierCurveTo(34, 38, 18, 46, 0, 46); x.closePath(); I(0.4)
      B(); x.moveTo(0, 40); x.bezierCurveTo(-16, 38, -18, 20, -6, 8); x.bezierCurveTo(-2, 18, 6, 18, 8, 10); x.bezierCurveTo(16, 22, 14, 38, 0, 40); x.closePath(); I(0.6, GOLD); break
    case 'wave': B(); x.moveTo(-46, 6); for (let i = 0; i < 3; i++) { const x0 = -46 + i * 31; x.bezierCurveTo(x0 + 8, -16, x0 + 24, -16, x0 + 31, 6) } I(0); B(); x.moveTo(-46, 30); for (let i = 0; i < 3; i++) { const x0 = -46 + i * 31; x.bezierCurveTo(x0 + 8, 8, x0 + 24, 8, x0 + 31, 30) } I(0); break
    case 'mountain': B(); x.moveTo(-48, 36); x.lineTo(-14, -30); x.lineTo(4, 2); x.lineTo(18, -14); x.lineTo(48, 36); x.closePath(); I(0.35); B(); x.moveTo(-24, -12); x.lineTo(-14, -30); x.lineTo(-4, -12); I(0, BONE); break
    case 'wind': for (const [y, l] of [[-22, 70], [0, 86], [22, 56]]) { B(); x.moveTo(-44, y); x.lineTo(-44 + l - 14, y); x.arc(-44 + l - 14, y - 10, 10, Math.PI / 2, -Math.PI * 0.9, true); I(0) } break
    case 'rocket': x.rotate(0.6); B(); x.moveTo(0, -48); x.bezierCurveTo(22, -30, 20, 10, 14, 26); x.lineTo(-14, 26); x.bezierCurveTo(-20, 10, -22, -30, 0, -48); x.closePath(); I(0.35); B(); x.arc(0, -10, 8, 0, TAU); I(0.6, BLUE)
      B(); x.moveTo(-14, 10); x.lineTo(-28, 32); x.lineTo(-12, 26); I(0.4); B(); x.moveTo(14, 10); x.lineTo(28, 32); x.lineTo(12, 26); I(0.4); B(); x.moveTo(-6, 32); x.lineTo(0, 48 + Math.sin(t * 20) * 4); x.lineTo(6, 32); I(0.7, GOLD); break
    case 'telescope': x.rotate(-0.45); rr(x, -44, -14, 76, 26, 8); I(0.35); rr(x, 32, -18, 14, 34, 4); I(0.5); x.rotate(0.45); B(); x.moveTo(0, 6); x.lineTo(-20, 46); x.moveTo(0, 6); x.lineTo(20, 46); x.moveTo(0, 6); x.lineTo(0, 46); I(0, BONE); break
    case 'clock': B(); x.arc(0, 0, 42, 0, TAU); I(0.25); B(); x.moveTo(0, 0); x.lineTo(Math.cos(t * 2 - Math.PI / 2) * 30, Math.sin(t * 2 - Math.PI / 2) * 30); x.moveTo(0, 0); x.lineTo(18, 8); I(0, BONE); break
    case 'hourglass': B(); x.moveTo(-28, -44); x.lineTo(28, -44); x.lineTo(4, 0); x.lineTo(28, 44); x.lineTo(-28, 44); x.lineTo(-4, 0); x.closePath(); I(0.25); B(); x.moveTo(-14, 34); x.lineTo(14, 34); x.lineTo(0, 20); x.closePath(); I(0.8); break
    case 'money': rr(x, -46, -26, 92, 52, 8); I(0.3); label(x, '$', 0, 2, { size: 40, weight: 900, color: c, shadow: false }); break
    case 'gift': rr(x, -38, -14, 76, 56, 6); I(0.35); rr(x, -44, -28, 88, 16, 4); I(0.5); B(); x.moveTo(0, -28); x.lineTo(0, 42); I(0, GOLD); B(); x.ellipse(-12, -36, 12, 7, 0.4, 0, TAU); x.moveTo(24, -36); x.ellipse(12, -36, 12, 7, -0.4, 0, TAU); I(0, GOLD); break
    case 'plane': x.rotate(-0.4); B(); x.moveTo(-46, 0); x.lineTo(40, -4); x.quadraticCurveTo(50, 0, 40, 4); x.lineTo(-46, 4); x.closePath(); x.moveTo(-4, 0); x.lineTo(-22, -34); x.lineTo(-10, -34); x.lineTo(16, 0); x.moveTo(-4, 4); x.lineTo(-22, 36); x.lineTo(-10, 36); x.lineTo(16, 4); I(0.35); break
    case 'mirror': B(); x.ellipse(0, -12, 28, 36, 0, 0, TAU); I(0.3); B(); x.moveTo(0, 24); x.lineTo(0, 48); I(0); B(); x.moveTo(-10, -30); x.lineTo(4, -42); I(0, BONE); break
    case 'compass': B(); x.arc(0, 0, 42, 0, TAU); I(0.2); B(); x.moveTo(0, -30); x.lineTo(10, 0); x.lineTo(0, 30); x.lineTo(-10, 0); x.closePath(); I(0.6, RED); break
    case 'umbrella': B(); x.arc(0, -4, 44, Math.PI, 0); x.closePath(); I(0.4); B(); x.moveTo(0, -4); x.lineTo(0, 38); x.arc(-8, 38, 8, 0, Math.PI); I(0, BONE); break
    case 'cake': rr(x, -38, -6, 76, 46, 8); I(0.35); B(); x.moveTo(0, -6); x.lineTo(0, -30); I(0, BONE); B(); x.ellipse(0, -38, 5, 9, 0, 0, TAU); I(0.8, GOLD); break
    case 'candle': rr(x, -14, -10, 28, 56, 6); I(0.35); B(); x.ellipse(0, -26 + Math.sin(t * 9) * 2, 8, 14, 0, 0, TAU); I(0.7, GOLD); break
    case 'chat': rr(x, -44, -32, 88, 56, 20); I(0.3); B(); x.moveTo(-18, 24); x.lineTo(-26, 42); x.lineTo(2, 24); I(0.3); break
    case 'ghost': B(); x.moveTo(-34, 40); x.lineTo(-34, -6); x.arc(0, -6, 34, Math.PI, 0); x.lineTo(34, 40); for (let i = 0; i < 4; i++) x.lineTo(34 - (i + 0.5) * 17, i % 2 ? 40 : 28); x.closePath(); I(0.35); break
    case 'bolt': B(); x.moveTo(10, -48); x.lineTo(-24, 6); x.lineTo(0, 6); x.lineTo(-10, 48); x.lineTo(24, -8); x.lineTo(0, -8); x.closePath(); I(0.5); break
    case 'check': B(); x.moveTo(-34, 2); x.lineTo(-10, 28); x.lineTo(36, -28); I(0); break
    case 'cross': B(); x.moveTo(-30, -30); x.lineTo(30, 30); x.moveTo(30, -30); x.lineTo(-30, 30); I(0); break
    case 'question': label(x, '?', 0, 4, { size: 100, weight: 900, color: c, glow: 20 }); break
    default: starPath(x, 0, 0, 46, 20); I(0.4)
  }
  x.restore()
}

// ───────────────────────── planet orbs
function orb(x, id, cx, cy, r, t = 0, { rings = null, alpha = 1, glyphIn = false } = {}) {
  if (r <= 0 || alpha <= 0) return
  const c = pcol(id), w = clamp(r * 0.07, 4, 9)
  x.save(); x.globalAlpha *= alpha
  const hasRings = rings ?? id === 'saturn'
  const ringPath = (half) => { x.beginPath(); x.ellipse(cx, cy, r * 1.85, r * 0.5, -0.32, half ? Math.PI : 0, half ? TAU : Math.PI) }
  if (hasRings) { ringPath(true); line(x, rgba(c, 0.95), w, 16) }
  if (id === 'sun') {
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU + t * 0.25, l = r * (1.28 + 0.1 * Math.sin(t * 3 + i))
      x.beginPath(); x.moveTo(cx + Math.cos(a - 0.12) * r * 1.08, cy + Math.sin(a - 0.12) * r * 1.08); x.lineTo(cx + Math.cos(a) * l, cy + Math.sin(a) * l); x.lineTo(cx + Math.cos(a + 0.12) * r * 1.08, cy + Math.sin(a + 0.12) * r * 1.08)
      ink(x, c, { w: w * 0.8, fa: 0.5, glow: 20 })
    }
  }
  // body: a flat fill, a soft highlight, surface features clipped inside, a thick neon rim
  x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fillStyle = rgba(c, id === 'sun' ? 0.55 : 0.32); x.fill()
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip()
  const g = x.createRadialGradient(cx - r * 0.4, cy - r * 0.45, 0, cx - r * 0.4, cy - r * 0.45, r * 1.3); g.addColorStop(0, 'rgba(255,248,235,0.35)'); g.addColorStop(1, 'rgba(255,248,235,0)')
  x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2)
  const R = rng(id.length * 97 + 3), lw = Math.max(3, w * 0.6)
  if (id === 'jupiter' || id === 'saturn') {
    for (let i = -3; i <= 3; i++) { const y = cy + i * r * 0.27 + Math.sin(t * 0.7 + i) * r * 0.02; x.beginPath(); x.moveTo(cx - r, y); x.bezierCurveTo(cx - r * 0.3, y - r * 0.06, cx + r * 0.3, y + r * 0.06, cx + r, y); x.strokeStyle = rgba(i % 2 ? '#fff0d0' : '#a0603a', 0.45); x.lineWidth = r * 0.1; x.stroke() }
    if (id === 'jupiter') { const sx = cx + r * 0.3 + ((t * 0.12) % 1 - 0.5) * r * 0.2; x.beginPath(); x.ellipse(sx, cy + r * 0.32, r * 0.2, r * 0.11, 0, 0, TAU); ink(x, '#ff7a4a', { w: lw, fa: 0.5, glow: 6 }) }
  } else if (id === 'earth') {
    const off = (t * 0.08 % 1) * r * 2.4
    for (const [ox, oy, sx, sy] of [[-0.5, -0.3, 0.42, 0.3], [0.35, 0.15, 0.32, 0.42], [-0.2, 0.55, 0.3, 0.16]]) for (const sh of [0, -r * 2.4]) {
      let X = cx + ox * r + ((off + sh + r * 1.2) % (r * 2.4)) - r * 1.2 + 0; x.beginPath(); x.ellipse(X, cy + oy * r, sx * r, sy * r, 0.5, 0, TAU); x.fillStyle = rgba(GREEN, 0.55); x.fill()
    }
    x.beginPath(); x.ellipse(cx, cy - r * 0.92, r * 0.5, r * 0.16, 0, 0, TAU); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fill()
  } else if (id === 'mars') {
    for (let i = 0; i < 4; i++) { x.beginPath(); x.ellipse(cx + (R() - 0.5) * r * 1.2, cy + (R() - 0.5) * r * 1.2, r * (0.14 + R() * 0.2), r * (0.08 + R() * 0.1), R() * 3, 0, TAU); x.fillStyle = 'rgba(120,30,20,0.35)'; x.fill() }
    x.beginPath(); x.ellipse(cx, cy - r * 0.9, r * 0.3, r * 0.12, 0, 0, TAU); x.fillStyle = 'rgba(255,255,255,0.55)'; x.fill()
  } else if (id === 'moon' || id === 'mercury') {
    for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(cx + (R() - 0.5) * r * 1.3, cy + (R() - 0.5) * r * 1.3, r * (0.08 + R() * 0.14), 0, TAU); x.strokeStyle = rgba(id === 'moon' ? '#8a84b8' : '#4a8070', 0.6); x.lineWidth = lw; x.stroke() }
  } else if (id === 'venus' || id === 'neptune' || id === 'uranus') {
    for (let i = -2; i <= 2; i++) { x.beginPath(); x.ellipse(cx + Math.sin(t * 0.5 + i) * r * 0.1, cy + i * r * 0.36, r * 1.1, r * 0.12, 0.08 * i, 0, TAU); x.fillStyle = rgba('#ffffff', 0.1); x.fill() }
  } else if (id === 'pluto') {
    heartPath(x, cx + r * 0.15, cy + r * 0.1, r * 0.45); x.fillStyle = 'rgba(255,240,230,0.45)'; x.fill()   // Tombaugh Regio, the real heart
  }
  x.restore()
  x.beginPath(); x.arc(cx, cy, r, 0, TAU); line(x, c, w, 26)
  if (hasRings) { ringPath(false); line(x, rgba(c, 0.95), w, 16) }
  if (id === 'uranus' && rings) { x.beginPath(); x.ellipse(cx, cy, r * 0.35, r * 1.6, 0.1, 0, TAU); line(x, rgba(c, 0.8), w * 0.6, 10) }
  if (glyphIn) glyph(x, id, cx, cy, r * 1.1, '#fff3e0', { glow: 8 })
  x.restore()
}

// ───────────────────────── the zodiac ring (shared by wheel / aspect)
// opts: rot (rad), hi (Set of sign indices), hiK (0..1), appear (i → scale), gsz (glyph px), r1 (inner ring radius), dim
function zodiac(x, cx, cy, R, t, { rot = 0, hi = new Set(), hiK = 1, appear = () => 1, gsz = null, r1 = R * 0.7, dim = 1, names = false } = {}) {
  gsz = gsz || R * 0.16
  x.save(); x.globalAlpha *= dim
  // base rings
  x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.arc(cx, cy, r1, 0, TAU, true); x.fillStyle = 'rgba(20,12,48,0.55)'; x.fill()
  for (let i = 0; i < 12; i++) {
    const S = SIGNS[i], k = appear(i)
    if (k <= 0) continue
    const a0 = lonAng(i * 30 * D2R) + rot, a1 = lonAng((i + 1) * 30 * D2R) + rot, am = (a0 + a1) / 2
    const on = hi.has(i) ? hiK : 0
    wedge(x, cx, cy, r1 + 3, R - 3, a0 - 0.01, a1 + 0.01)
    x.fillStyle = rgba(S.color, (0.1 + 0.32 * on) * clamp(k)); x.fill()
    const gr = (R + r1) / 2, [gx, gy] = pt(cx, cy, gr, am)
    const sc = k * (1 + 0.22 * on * (1 + 0.08 * Math.sin(t * 5)))
    glyph(x, S.glyph, gx, gy, gsz * sc, S.color, { glow: 14 + 20 * on, alpha: clamp(k * 2) * (hi.size && !hi.has(i) ? lerp(1, 0.55, hiK) : 1) })
  }
  ring(x, cx, cy, R, GOLD, 7, 22)
  ring(x, cx, cy, r1, rgba(GOLD, 0.8), 5, 12)
  for (let i = 0; i < 12; i++) {
    const a = lonAng(i * 30 * D2R) + rot, k = clamp(appear(i) * 1.5)
    const [ax, ay] = pt(cx, cy, r1, a), [bx, by] = pt(cx, cy, R, a)
    x.beginPath(); x.moveTo(lerp(bx, ax, k), lerp(by, ay, k)); x.lineTo(bx, by); line(x, rgba(GOLD, 0.75), 4, 8)
  }
  // highlighted wedge outlines on top
  for (const i of hi) {
    if (hiK <= 0) continue
    const a0 = lonAng(i * 30 * D2R) + rot, a1 = lonAng((i + 1) * 30 * D2R) + rot
    wedge(x, cx, cy, r1, R, a0, a1); x.save(); x.globalAlpha *= hiK; line(x, SIGNS[i].color, 8, 30); x.restore()
  }
  x.restore()
}

// ───────────────────────── wheel
const wheel = {
  min: p => 2.4 + (p.sun ? 1 : 0) + list(p.planets).length * 0.25,
  draw(x, p, s) {
    const T = ct(s), R = Math.min(s.w * 0.47, s.h * 0.47), cx = s.cx, cy = s.cy
    const rot = p.spin === true ? -s.t * 0.12 : typeof p.spin === 'number' ? -s.t * p.spin : 0
    const hi = new Set(list(p.highlight).map(sIdx).filter(i => i >= 0))
    const sunI = sIdx(p.sun)
    const sunT0 = 0.22 * s.dur, sunT1 = Math.max(sunT0 + 0.8, 0.7 * s.dur)
    const sunK = sunI >= 0 ? ease.inOutCubic(prog(s.lt, sunT0, sunT1)) : 0
    if (sunI >= 0 && sunK >= 1) hi.add(sunI)
    const hiAt = list(p.highlight).length ? 0.45 * s.dur : 0
    const hiK = sunI >= 0 && !list(p.highlight).length ? ease.outCubic(prog(s.lt, sunT1, sunT1 + 0.3)) : ease.outCubic(prog(s.lt, hiAt, hiAt + 0.4))
    const appear = i => pop01(T, 0.05 + i * 0.06, 0.34, 2.2)
    // the ring breathes a little
    zodiac(x, cx, cy, R, s.t, { rot, hi, hiK, appear })
    const r1 = R * 0.7, track = R * 0.52, hub = R * 0.3
    x.beginPath(); x.arc(cx, cy, hub, 0, TAU); x.fillStyle = 'rgba(14,8,36,0.7)'; x.fill(); ring(x, cx, cy, hub, rgba(VIOLET, 0.8), 4, 10)
    for (let i = 0; i < 36; i++) { const a = i / 36 * TAU + rot; const [ax, ay] = pt(cx, cy, r1, a), [bx, by] = pt(cx, cy, r1 - (i % 3 ? 10 : 20), a); x.beginPath(); x.moveTo(ax, ay); x.lineTo(bx, by); x.strokeStyle = rgba(GOLD, 0.5); x.lineWidth = 3; x.stroke() }
    // centre: the Earth (a chart is drawn from where you stand), or a big sign glyph
    const cS = sign(p.center) || (hi.size === 1 && sunI < 0 ? SIGNS[[...hi][0]] : null)
    if (p.center !== 'none') {
      if (cS && hiK > 0) glyph(x, cS.glyph, cx, cy, hub * 1.05 * easeOutBack(hiK), cS.color, { glow: 30 })
      else orb(x, 'earth', cx, cy, hub * 0.42 * pop01(T, 0.1), s.t)
    }
    // planets on the track
    const pl = list(p.planets).map(e => Array.isArray(e) ? e : [e, null])
    const bySign = {}
    pl.forEach(([pid, sg], j) => {
      const i = sIdx(sg); if (i < 0 || !PLANETS[pid]) return
      const n = bySign[i] = (bySign[i] || 0) + 1
      const at = stagger(j, pl.length, s.dur, 0.3, 0.7), k = pop01(s.lt, at, 0.32, 2.4)
      if (k <= 0) return
      const off = (n - 1) * 0.16 * (n % 2 ? 1 : -1)
      const a = signMid(i) + rot + off, rr0 = track + (n > 1 ? (n % 2 ? -1 : 1) * R * 0.06 : 0)
      const [px, py] = pt(cx, cy, rr0, a), r = R * 0.085 * k
      x.beginPath(); x.arc(px, py, r, 0, TAU); x.fillStyle = 'rgba(16,10,40,0.92)'; x.fill(); ink(x, pcol(pid), { w: 5, fa: 0.25, glow: 20 })
      glyph(x, pid, px, py, r * 1.15, pcol(pid), { glow: 10 })
      sparkle(x, px, py, s.lt, at, { n: 6, R: 70, seed: j + 3, size: 18 })
    })
    // the sun travels the ecliptic (counter-clockwise, the way it moves through the year) to its sign
    if (sunI >= 0 && s.lt > sunT0 - 0.4) {
      const lon0 = 0, lon1 = (sunI + 0.5) * 30 * D2R + (sunI === 0 ? TAU : 0)
      const lon = lerp(lon0, lon1, sunK), a = lonAng(lon) + rot
      const k = pop01(s.lt, sunT0 - 0.4, 0.35, 2.2)
      if (sunK > 0.01) { x.beginPath(); x.arc(cx, cy, track, lonAng(lon0) + rot, a, true); x.save(); x.globalAlpha *= 0.85; line(x, GOLD, 6, 18); x.restore() }
      const [px, py] = pt(cx, cy, track, a)
      orb(x, 'sun', px, py, R * 0.075 * k, s.t)
      sparkle(x, px, py, s.lt, sunT1, { n: 12, R: 150, seed: 77 })
    }
    twinkles(x, cx, cy, s.t, { n: 6, R: R * 1.05, seed: s.seed % 97, size: 20 })
    // a name chip for a single highlight
    if (hi.size === 1 && hiK > 0.2) {
      const S = SIGNS[[...hi][0]]
      pill(x, S.name.toUpperCase(), cx, cy + R + 0, { size: 40, col: S.color, fg: BONE, alpha: clamp(hiK * 2), family: 'mono', weight: 700, fillA: 0.1 })
    }
  },
  cues(p, t0, dur, ctx = {}) {
    const c = []
    if (!ctx.step) for (let i = 0; i < 12; i += 2) c.push(['pluck', t0 + 0.05 + i * 0.06 + 0.1, PENTA[(i / 2) % PENTA.length], 0.03, 0.5, ((i % 4) - 1.5) * 0.25])
    if (sign(p.sun)) { const a = 0.22 * dur, b = Math.max(a + 0.8, 0.7 * dur); c.push(['riser', t0 + a, t0 + b, 0.03], ['bell', t0 + b, 1174.66, 0.05, 2, 0]) }
    else if (list(p.highlight).length) c.push(['bell', t0 + 0.45 * dur, 987.77, 0.045, 1.8, 0])
    list(p.planets).forEach((_, j, a) => c.push(['pop', t0 + stagger(j, a.length, dur, 0.3, 0.7), 880 + j * 110, 0.04, 0]))
    return c
  },
}

// ───────────────────────── glyph (one sign, huge)
const glyph1 = {
  draw(x, p, s) {
    const S = sign(p.sign) || SIGNS[4], T = ct(s)
    const extra = (p.name ? 1 : 0) + (p.dates ? 1 : 0) + (p.el ? 1 : 0)
    const G = Math.min(s.h * (extra ? 0.48 : 0.6), s.w * 0.62)
    const cy = s.cy - extra * 50 + Math.sin(s.t * 1.6) * 8
    const k = pop01(T, 0.02, 0.5, 2.0)
    if (p.wash) {
      const wr = Math.max(s.w, s.h) * 0.75, g = x.createRadialGradient(s.cx, cy, 0, s.cx, cy, wr)
      g.addColorStop(0, rgba(S.color, 0.55 * k)); g.addColorStop(0.5, rgba(S.color, 0.22 * k)); g.addColorStop(1, rgba(S.color, 0))
      x.fillStyle = g; x.fillRect(s.cx - wr, cy - wr, wr * 2, wr * 2)
    }
    // halo disc, a ring of ticks turning slowly
    const R = G * 0.72
    x.beginPath(); x.arc(s.cx, cy, R * k, 0, TAU); ink(x, S.color, { w: 7, fa: p.wash ? 0.32 : 0.16, glow: 30 })
    x.save(); x.translate(s.cx, cy); x.rotate(s.t * 0.15)
    for (let i = 0; i < 48; i++) { const a = i / 48 * TAU, r0 = R * 1.1 * k, r1 = r0 + (i % 4 ? 10 : 24); x.beginPath(); x.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); x.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); x.strokeStyle = rgba(S.color, i % 4 ? 0.45 : 0.9); x.lineWidth = i % 4 ? 3 : 5; x.stroke() }
    x.restore()
    glyph(x, S.glyph, s.cx, cy, G * 0.82 * k * (1 + 0.025 * Math.sin(s.t * 2.2)), p.wash ? '#fff3e0' : S.color, { glow: 40 })
    sparkle(x, s.cx, cy, T, 0.25, { n: 14, R: R * 1.2, seed: 5 })
    twinkles(x, s.cx, cy, s.t, { n: 7, R: R * 1.45, seed: 9 })
    let y = cy + R * 1.1 + 90
    if (p.name) { const kk = pop01(T, 0.35, 0.36, 2.2); x.save(); x.translate(s.cx, y); x.scale(kk, kk); label(x, S.name, 0, 0, { size: 104, weight: 900, color: BONE, glow: 0 }); x.restore(); y += 92 }
    if (p.dates) { label(x, S.dates.toUpperCase(), s.cx, y, { size: 42, weight: 700, family: 'mono', spacing: 0.08, color: S.color, alpha: clamp((T - 0.55) / 0.3) }); y += 80 }
    if (p.el) pill(x, `${S.el.toUpperCase()} SIGN`, s.cx, y, { size: 36, family: 'mono', weight: 700, col: ELEMENT_COLOR[S.el], fg: ELEMENT_COLOR[S.el], alpha: clamp((T - 0.7) / 0.3) })
    if (p.prop) {
      const a = s.t * 0.9 - 0.7, kk = pop01(s.lt, 0.5, 0.4, 2.4)
      const px = s.cx + Math.cos(a) * R * 1.05, py = cy + Math.sin(a) * R * 0.95
      icon(x, p.prop, px, py, 130 * kk, null, s.t)
    }
  },
  cues(p, t0) { const c = [['bell', t0 + 0.25, 880, 0.05, 2.2, 0], ['glitter', t0 + 0.2, t0 + 0.9]]; if (p.name) c.push(['pop', t0 + 0.35, 1174.66, 0.045, 0]); if (p.prop) c.push(['pop', t0 + 0.5, 1318.51, 0.04, 0.3]); return c },
}

// ───────────────────────── glyphs (all twelve)
function glyphGrid(s, mode, labels) {
  if (mode === 'ring') {
    const R = Math.min(s.w, s.h) * 0.39
    return { sz: Math.min(108, R * 0.34), pos: SIGNS.map((_, i) => pt(s.cx, s.cy, R, signMid(i))) }
  }
  const cols = s.h > s.w * 1.15 ? 3 : 4, rows = 12 / cols
  const cw = s.w / cols, ch = Math.min(s.h / rows, cw * 1.25)
  const sz = Math.min(cw * 0.6, ch * (labels ? 0.5 : 0.62))
  return { sz, cols, pos: SIGNS.map((_, i) => [s.cx + ((i % cols) - (cols - 1) / 2) * cw, s.cy + (Math.floor(i / cols) - (rows - 1) / 2) * ch - (labels ? sz * 0.18 : 0)]) }
}
function glyphTimes(p, s) {
  const mode = p.mode || 'grid', r = rng(17)
  const order = SIGNS.map((_, i) => i)
  if (mode === 'rain') for (let i = 11; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [order[i], order[j]] = [order[j], order[i]] }
  const at = []
  order.forEach((i, n) => { at[i] = mode === 'explode' ? 0.25 : stagger(n, 12, s.dur, 0.06, mode === 'rain' ? 0.5 : 0.45) })
  return at
}
const glyphs = {
  min: p => p.highlight ? 3 : 2.4,
  draw(x, p, s) {
    const mode = p.mode || 'grid', T = ct(s), G = glyphGrid(s, mode, p.labels)
    const at = glyphTimes(p, { dur: s.cdur ?? s.dur })
    const hi = new Set(list(p.highlight).map(sIdx).filter(i => i >= 0))
    const hiT = 0.58 * s.dur, hiK = hi.size ? ease.outCubic(prog(s.lt, hiT, hiT + 0.4)) : 0
    if (mode === 'ring') { ring(x, s.cx, s.cy, Math.min(s.w, s.h) * 0.39, rgba(GOLD, 0.35), 3, 8) }
    SIGNS.forEach((S, i) => {
      let [px, py] = G.pos[i], sc = 1, a = 1
      if (mode === 'explode') {
        const k = easeOutBack(prog(T, at[i], at[i] + 0.6), 1.5)
        px = lerp(s.cx, px, k); py = lerp(s.cy, py, k); sc = lerp(0.35, 1, clamp(k)); a = clamp(T / 0.15)
      } else if (mode === 'rain') {
        const tt = T - at[i]
        if (tt < 0) return
        const fall = 0.4, y0 = s.top - 200
        if (tt < fall) py = lerp(y0, py, (tt / fall) ** 2)
        else py -= Math.abs(Math.sin((tt - fall) * 9)) * 60 * Math.exp(-(tt - fall) * 6)
        sc = tt < fall ? 1 : 1 + 0.12 * wob(tt, fall, 22, 7)
      } else {
        sc = pop01(T, at[i], 0.34, 2.3); if (sc <= 0) return
      }
      if (mode === 'ring') { /* idle drift */ }
      const on = hi.has(i) ? hiK : 0, off = hi.size && !hi.has(i) ? hiK : 0
      a *= lerp(1, 0.3, off); sc *= 1 + 0.25 * on
      py += Math.sin(s.t * 2 + i * 0.8) * 5
      const r = G.sz * 0.62 * sc
      x.save(); x.globalAlpha *= a
      x.beginPath(); x.arc(px, py, r, 0, TAU); ink(x, S.color, { w: 5 + 3 * on, fa: 0.14 + 0.25 * on, glow: 14 + 24 * on })
      glyph(x, S.glyph, px, py, G.sz * 0.7 * sc, S.color, { glow: 16 + 20 * on })
      if (p.labels) label(x, S.name, px, py + r + 32, { size: 36, weight: 800, color: on ? S.color : BONE, maxW: (mode === 'ring' ? 180 : s.w / (G.cols || 4) - 12) })
      x.restore()
      if (on) sparkle(x, px, py, s.lt, hiT + 0.1, { n: 8, R: 120, seed: i + 40, size: 20 })
    })
    if (mode === 'explode') sparkle(x, s.cx, s.cy, T, 0.25, { n: 16, R: 260, seed: 3 })
  },
  cues(p, t0, dur, ctx = {}) {
    if (ctx.step && !p.highlight) return []
    const c = []
    if (!ctx.step) {
      const at = glyphTimes(p, { dur })
      if ((p.mode || 'grid') === 'explode') c.push(['boom', t0 + 0.25, 0.12], ['glitter', t0 + 0.25, t0 + 1])
      else at.forEach((a, i) => { const pan = ((i % 4) - 1.5) * 0.25; if (p.mode === 'rain') c.push(['pop', t0 + a + 0.4, PENTA[i % PENTA.length], 0.03, pan]); else if (i % 2 === 0) c.push(['pluck', t0 + a + 0.08, PENTA[(i / 2) % PENTA.length], 0.03, 0.5, pan]) })
    }
    if (list(p.highlight).length) c.push(['bell', t0 + 0.58 * dur + 0.1, 1174.66, 0.05, 2, 0])
    return c
  },
}

// ───────────────────────── planet (one orb)
const planet1 = {
  draw(x, p, s) {
    const id = PLANETS[p.p] ? p.p : 'venus', T = ct(s)
    const hasL = p.label !== false
    const rings = p.rings ?? (id === 'saturn' ? true : null)
    const r = Math.min(s.h * (hasL ? 0.27 : 0.33), s.w * (rings ? 0.24 : 0.34))
    const cy = s.cy - (hasL ? 50 : 0) + Math.sin(s.t * 1.4) * 10
    const k = pop01(T, 0.02, 0.5, 1.9)
    // a faint glow behind
    const g = x.createRadialGradient(s.cx, cy, r * 0.5, s.cx, cy, r * 2.4); g.addColorStop(0, rgba(pcol(id), 0.3 * k)); g.addColorStop(1, rgba(pcol(id), 0))
    x.fillStyle = g; x.fillRect(s.cx - r * 2.4, cy - r * 2.4, r * 4.8, r * 4.8)
    // the gag orbits on a tilted ellipse: behind the planet on the far half, in front on the near half
    const gagA = s.t * 1.3, gx = s.cx + Math.cos(gagA) * r * 1.65, gy = cy + Math.sin(gagA) * r * 0.55 - r * 0.15, front = Math.sin(gagA) > 0
    const gk = pop01(s.lt, 0.45, 0.4, 2.4)
    if (p.gag) { x.beginPath(); x.ellipse(s.cx, cy - r * 0.15, r * 1.65, r * 0.55, 0, 0, TAU); dashed(x, BONE, 3, [6, 14], 0.35) }
    if (p.gag && !front) icon(x, p.gag, gx, gy, r * 0.42 * gk * lerp(0.8, 1, (Math.sin(gagA) + 1) / 2), null, s.t)
    orb(x, id, s.cx, cy, r * k, s.t, { rings })
    if (p.gag && front) icon(x, p.gag, gx, gy, r * 0.42 * gk, null, s.t)
    sparkle(x, s.cx, cy, T, 0.2, { n: 12, R: r * 1.5, seed: 8 })
    twinkles(x, s.cx, cy, s.t, { n: 6, R: r * 2.1, seed: 4 })
    if (hasL) {
      const txt = typeof p.label === 'string' ? p.label : pname(id)
      const kk = pop01(T, 0.3, 0.36, 2.3)
      const ly = cy + r * (rings ? 1.05 : 1.2) + 80
      x.save(); x.translate(s.cx, ly); x.scale(kk, kk)
      const gw = 0
      label(x, txt, gw, 0, { size: txt.length > 14 ? 64 : 88, weight: 900, color: BONE, maxW: s.w * 0.9 })
      x.restore()
      glyph(x, id, s.cx, ly + 86, 60 * kk, pcol(id), { glow: 18 })
    }
  },
  cues(p, t0) { const c = [['bell', t0 + 0.2, 659.25, 0.05, 2.4, 0], ['glitter', t0 + 0.15, t0 + 0.8]]; if (p.label !== false) c.push(['pop', t0 + 0.3, 987.77, 0.04, 0]); if (p.gag) c.push(['pop', t0 + 0.45, 1318.51, 0.04, 0.3]); return c },
}

// ───────────────────────── orbit (top-down solar system)
const RETRO_W = 0.3
function retroState(tau, outer, Re, Rm, cx, cy) {
  const te = -Math.PI / 2 - TAU * tau, tm = -Math.PI / 2 - TAU * tau / PERIOD[outer]   // CCW on screen
  const E = [cx + Re * Math.cos(te), cy + Re * Math.sin(te)], M = [cx + Rm * Math.cos(tm), cy + Rm * Math.sin(tm)]
  const dx = M[0] - E[0], dy = M[1] - E[1]
  return { E, M, phi: Math.atan2(dx, -dy), d: Math.hypot(dx, dy) }     // phi: the direction we look (0 = straight up), i.e. where it sits on the sky
}
function retroWindow(p) { return [p.from ?? -RETRO_W, p.to ?? RETRO_W] }
function retroTimes(p, dur) { return [0.1 * dur, 0.92 * dur] }
/** when (fraction 0..1 of the sweep) the apparent motion turns backward and forward again */
function retroTurns(p, outer) {
  const [w0, w1] = retroWindow(p), N = 400
  let prev = null, dir0 = null, a = null, b = null
  for (let i = 0; i <= N; i++) {
    const f = i / N, st = retroState(lerp(w0, w1, f), outer, 1 / AU[outer], 1, 0, 0)
    if (prev != null) { const d = Math.sign(st.phi - prev); if (dir0 == null) dir0 = d; else if (a == null && d !== dir0) a = f; else if (a != null && b == null && d === dir0) b = f }
    prev = st.phi
  }
  return [a ?? 0.4, b ?? 0.6]
}
const orbit = {
  min: p => p.mode === 'retro' ? 5.2 : p.mode === 'return' ? 4.2 : 2.6,
  draw(x, p, s) {
    const mode = p.mode || 'plain', T = ct(s)
    if (mode === 'retro') return retroDraw(x, p, s, T)
    const ret = mode === 'return'
    const focus = PERIOD[p.focus] ? p.focus : ret ? (PERIOD[p.p] ? p.p : 'saturn') : null
    let pl = list(p.planets).filter(id => PERIOD[id])
    if (!pl.length) pl = ret ? ['earth', focus] : ['mercury', 'venus', 'earth', 'mars']
    if (focus && !pl.includes(focus)) pl.push(focus)
    pl = [...new Set(pl)].sort((a, b) => AU[a] - AU[b])
    const hasLbl = !!p.years || ret
    const cy = s.cy - (hasLbl ? 40 : 0)
    const Rmax = Math.min(s.w * 0.46, (s.h - (hasLbl ? 140 : 0)) * 0.46)
    const rad = pl.map((_, i) => Rmax * (0.3 + 0.7 * (i + 1) / pl.length))
    // the sun
    orb(x, 'sun', s.cx, cy, Math.min(70, Rmax * 0.15) * pop01(T, 0.02, 0.4), s.t)
    // timing: plain → the innermost shown planet laps in 6 s; return → the focus planet laps once across the beat
    const r0 = 0.12 * s.dur, r1 = Math.max(r0 + 2.2, 0.78 * s.dur)
    const lapK = ret ? prog(s.lt, r0, r1) : 0
    const yrs = ret ? lapK * PERIOD[focus] : (s.t * PERIOD[pl[0]] / 6)
    pl.forEach((id, i) => {
      const k = pop01(T, 0.08 + i * 0.12, 0.4, 2.0)
      if (k <= 0) return
      const R = rad[i] * lerp(0.6, 1, clamp(k)), isF = id === focus
      x.beginPath(); x.arc(s.cx, cy, R, 0, TAU); x.save(); x.globalAlpha *= clamp(k); line(x, rgba(pcol(id), isF ? 0.9 : 0.45), isF ? 6 : 4, isF ? 18 : 6); x.restore()
      const a0 = -Math.PI / 2 - (ret ? (isF ? 0 : i * 1.7) : rng(i + 5)() * TAU)
      const a = a0 - TAU * yrs / PERIOD[id]
      const pr = (isF ? 34 : 24) * clamp(k) * (id === 'jupiter' || id === 'saturn' ? 1.2 : 1)
      // fast movers smear into a trail
      const sweep = Math.min(TAU * 0.92, ret ? (TAU * PERIOD[focus] / PERIOD[id]) / Math.max(1, (r1 - r0) * 30) * 6 : 0.9)
      if (ret && !isF && sweep > 0.4) { x.beginPath(); x.arc(s.cx, cy, R, a, a + sweep); line(x, rgba(pcol(id), 0.55), 7, 14) }
      if (ret && isF && lapK > 0) { x.beginPath(); x.arc(s.cx, cy, R, -Math.PI / 2, a, true); line(x, GOLD, 8, 24) }
      const [px, py] = pt(s.cx, cy, R, a)
      if (ret && isF) {   // the start marker
        const [mx, my] = pt(s.cx, cy, R, -Math.PI / 2)
        x.beginPath(); x.moveTo(mx, my - 50); x.lineTo(mx, my + 50); line(x, BONE, 5, 10)
        label(x, 'START', mx, my - 80, { size: 36, weight: 700, family: 'mono', color: MUTED, alpha: clamp(k) })
      }
      orb(x, id, px, py, pr, s.t, { rings: id === 'saturn' })
      if (isF && !ret) label(x, pname(id), px, py + pr + 42, { size: 40, weight: 800, color: pcol(id) })
      if (id === 'earth' && !isF && pl.length <= 3) label(x, 'Earth', px, py + pr + 36, { size: 36, weight: 800, color: pcol(id), alpha: 0.9 })
    })
    if (ret) {
      const dK = pop01(s.lt, r1, 0.4, 2.6)
      const R = rad[pl.indexOf(focus)], [mx, my] = pt(s.cx, cy, R, -Math.PI / 2)
      if (dK > 0) { ring(x, mx, my, 60 * dK + 30 * prog(s.lt, r1, r1 + 0.6), rgba(GOLD, 1 - prog(s.lt, r1, r1 + 0.8)), 6, 26) }
      sparkle(x, mx, my, s.lt, r1, { n: 14, R: 180, seed: 33 })
      // the year counter, then the label
      const yl = cy + Rmax + 80
      if (s.lt < r1) label(x, `YEAR ${Math.floor(yrs)}`, s.cx, yl, { size: 52, weight: 700, family: 'mono', color: BONE, alpha: clamp((s.lt - r0 + 0.3) / 0.3) })
      else { const kk = pop01(s.lt, r1, 0.4, 2.6); x.save(); x.translate(s.cx, yl); x.scale(kk, kk); pill(x, p.years || `${pname(focus).toUpperCase()} RETURN · ${PERIOD[focus].toFixed(1)} YEARS`, 0, 0, { size: 46, col: GOLD, fg: GOLD, fillA: 0.12 }); x.restore() }
    } else if (p.years) {
      const kk = pop01(s.lt, 0.5 * s.dur, 0.4, 2.4); x.save(); x.translate(s.cx, cy + Rmax + 80); x.scale(kk, kk); pill(x, p.years, 0, 0, { size: 46, col: focus ? pcol(focus) : GOLD, fg: BONE, fillA: 0.1 }); x.restore()
    }
  },
  cues(p, t0, dur) {
    const mode = p.mode || 'plain'
    if (mode === 'retro') {
      const outer = PERIOD[p.focus] && p.focus !== 'earth' ? p.focus : (list(p.planets).find(id => PERIOD[id] && AU[id] > 1) || 'mars')
      const [a, b] = retroTimes(p, dur), [fa, fb] = retroTurns(p, outer)
      return [['whoosh', t0 + a, 0.6, 0.04], ['bell', t0 + lerp(a, b, fa), 739.99, 0.05, 1.6, 0], ['riser', t0 + lerp(a, b, fa), t0 + lerp(a, b, fb), 0.025], ['bell', t0 + lerp(a, b, fb), 1174.66, 0.045, 1.8, 0]]
    }
    if (mode === 'return') { const r0 = 0.12 * dur, r1 = Math.max(r0 + 2.2, 0.78 * dur); return [['riser', t0 + r0, t0 + r1, 0.025], ['bell', t0 + r1, 1318.51, 0.06, 2.6, 0], ['bell', t0 + r1 + 0.02, 659.25, 0.04, 2.6, 0], ['glitter', t0 + r1, t0 + r1 + 0.8]] }
    return list(p.planets).map((_, i) => ['pluck', t0 + 0.08 + i * 0.12 + 0.1, PENTA[i % PENTA.length], 0.035, 0.6, 0])
  },
}
function retroDraw(x, p, s, T) {
  const outer = PERIOD[p.focus] && p.focus !== 'earth' ? p.focus : (list(p.planets).find(id => PERIOD[id] && AU[id] > 1) || 'mars')
  const [w0, w1] = retroWindow(p), [ta, tb] = retroTimes(p, s.dur)
  const f = prog(s.lt, ta, tb), tau = lerp(w0, w1, f)
  // layout: the distant stars as a strip on top, the orbits below
  const stripY = s.top + Math.min(150, s.h * 0.15)
  const Rm = Math.min(s.w * 0.4, (s.bottom - stripY - 180) * 0.5), Re = Rm / AU[outer]
  const cx = s.cx, cy = s.bottom - Rm - 40
  // the sky strip
  const sw = s.w * 0.96
  rr(x, cx - sw / 2, stripY - 90, sw, 180, 40); x.fillStyle = 'rgba(14,8,36,0.6)'; x.fill(); rr(x, cx - sw / 2, stripY - 90, sw, 180, 40); line(x, rgba(VIOLET, 0.6), 4, 10)
  const R = rng(51)
  for (let i = 0; i < 26; i++) { const sx = cx + (R() - 0.5) * sw * 0.94, sy = stripY + (R() - 0.5) * 150; x.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(s.t * (1 + R()) + i)); drawPixelStar(x, sx, sy, 10 + R() * 10, Math.floor(R() * 3), '#fff3e0'); x.globalAlpha = 1 }
  label(x, 'THE DISTANT STARS', cx, stripY - 128, { size: 36, weight: 700, family: 'mono', spacing: 0.12, color: MUTED })
  // apparent position: direction → x on the strip; the loop's height from 1/distance (an inclined orbit looks
  // highest above the ecliptic when it is closest), which is what turns the back-and-forth into a loop
  const phiMax = Math.max(...[w0, w1].map(t => Math.abs(retroState(t, outer, Re, Rm, cx, cy).phi)))
  const K = (sw * 0.42) / phiMax, dMin = Rm - Re
  const app = st => [cx + st.phi * K, stripY + 50 - 100 * (dMin / st.d) ** 1.5]
  // orbits + sun
  const k = pop01(T, 0.02, 0.4, 2)
  orb(x, 'sun', cx, cy, 44 * k, s.t)
  for (const [r, id] of [[Re, 'earth'], [Rm, outer]]) { x.beginPath(); x.arc(cx, cy, r * lerp(0.6, 1, k), 0, TAU); line(x, rgba(pcol(id), 0.55), 4, 8) }
  // faint past lines of sight (the textbook's numbered positions)
  const N = 7
  for (let i = 0; i < N; i++) {
    const fi = i / (N - 1); if (fi > f + 1e-6) break
    const st = retroState(lerp(w0, w1, fi), outer, Re, Rm, cx, cy), [ax, ay] = app(st)
    x.beginPath(); x.moveTo(st.E[0], st.E[1]); x.lineTo(st.M[0], st.M[1]); x.lineTo(ax, ay + 60); x.strokeStyle = rgba(BONE, 0.16); x.lineWidth = 3; x.stroke()
    for (const [P, id] of [[st.E, 'earth'], [st.M, outer]]) { x.beginPath(); x.arc(P[0], P[1], 8, 0, TAU); x.fillStyle = rgba(pcol(id), 0.5); x.fill() }
    label(x, String(i + 1), ax, ay + 90, { size: 36, weight: 800, family: 'mono', color: MUTED, alpha: 0.9 })
  }
  // the traced apparent path
  if (f > 0) {
    x.beginPath()
    const M = 120
    for (let i = 0; i <= M; i++) { const fi = f * i / M, [ax, ay] = app(retroState(lerp(w0, w1, fi), outer, Re, Rm, cx, cy)); i ? x.lineTo(ax, ay) : x.moveTo(ax, ay) }
    line(x, GOLD, 7, 22)
  }
  const st = retroState(tau, outer, Re, Rm, cx, cy), [ax, ay] = app(st)
  // the current line of sight: Earth → planet → the stars
  x.beginPath(); x.moveTo(st.E[0], st.E[1]); x.lineTo(ax, ay); dashed(x, GOLD, 4, [12, 12], 0.85)
  orb(x, 'earth', st.E[0], st.E[1], 26 * k, s.t)
  orb(x, outer, st.M[0], st.M[1], 30 * k, s.t, { rings: outer === 'saturn' })
  label(x, 'Earth', st.E[0], st.E[1] + 60, { size: 36, weight: 800, color: pcol('earth') })
  label(x, pname(outer), st.M[0], st.M[1] - 62, { size: 40, weight: 800, color: pcol(outer) })
  x.beginPath(); x.arc(ax, ay, 16, 0, TAU); ink(x, pcol(outer), { w: 5, fa: 0.9, glow: 30 })
  // the retrograde chip while it runs backwards
  const [fa, fb] = retroTurns(p, outer)
  const on = f > fa && f < fb + 0.08
  const ck = on ? pop01(f, fa, 0.04, 2.4) : 0
  if (ck > 0) { x.save(); x.translate(cx, stripY + 150); x.scale(ck, ck); pill(x, `${pname(outer).toUpperCase()} RETROGRADE`, 0, 0, { size: 40, col: PINK, fg: BONE, fillA: 0.15 }); x.restore() }
  if (p.years) label(x, p.years, cx, s.bottom - 10, { size: 40, weight: 700, family: 'mono', color: MUTED })
}

// ───────────────────────── moon
const PHASES = { new: 0, 'new moon': 0, crescent: 0.125, 'waxing crescent': 0.125, quarter: 0.25, 'first quarter': 0.25, half: 0.25, gibbous: 0.375, 'waxing gibbous': 0.375,
  full: 0.5, 'full moon': 0.5, 'waning gibbous': 0.625, 'last quarter': 0.75, 'third quarter': 0.75, 'waning crescent': 0.875 }
const phaseOf = v => typeof v === 'number' ? ((v % 1) + 1) % 1 : PHASES[String(v ?? 'crescent').toLowerCase().replace(/[-_]/g, ' ')] ?? 0.125
const litOf = p => (1 - Math.cos(TAU * p)) / 2
function phaseName(p) {
  const k = litOf(p), wax = p < 0.5
  if (k < 0.02) return 'NEW MOON'; if (k > 0.98) return 'FULL MOON'
  if (Math.abs(k - 0.5) < 0.04) return wax ? 'FIRST QUARTER' : 'LAST QUARTER'
  return (wax ? 'WAXING ' : 'WANING ') + (k < 0.5 ? 'CRESCENT' : 'GIBBOUS')
}
function neonMoon(x, cx, cy, R, ph, t, { alpha = 1, glow = 1 } = {}) {
  if (R <= 2 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  x.beginPath(); x.arc(cx, cy, R + 6, 0, TAU); x.fillStyle = 'rgba(18,10,44,0.9)'; x.fill()
  drawMoon(x, cx, cy, R, ph, { glow, earthshine: 0.7, darkAlpha: 0.9 })
  x.beginPath(); x.arc(cx, cy, R + 6, 0, TAU); line(x, rgba(VIOLET, 0.9), Math.max(4, R * 0.03), 20)
  x.restore()
}
const moon = {
  min: p => p.strip ? 3.4 : p.wax ? 3.2 : 2,
  draw(x, p, s) {
    const T = ct(s), showLbl = p.label !== false
    if (p.strip) {
      const n = 8, gap = s.w / n, r = Math.min(gap * 0.4, 52)
      const sy = s.bottom - r - 70
      const fixed = p.phase != null ? Math.round(phaseOf(p.phase) * 8) % 8 : null
      const runT0 = 0.3 * s.dur, runT1 = 0.9 * s.dur
      const cur = fixed ?? Math.min(7, Math.floor(prog(s.lt, runT0, runT1) * 8))
      const curK = fixed != null || s.lt >= runT0
      for (let i = 0; i < n; i++) {
        const k = pop01(T, 0.05 + i * 0.08, 0.34, 2.3); if (k <= 0) continue
        const px = s.cx + (i - (n - 1) / 2) * gap, isC = curK && i === cur
        neonMoon(x, px, sy - (isC ? 16 : 0), r * k * (isC ? 1.12 : 1), i / 8, s.t, { glow: 0.6, alpha: isC ? 1 : 0.75 })
        if (isC) { x.beginPath(); x.moveTo(px - 26, sy + r + 34); x.lineTo(px, sy + r + 14); x.lineTo(px + 26, sy + r + 34); line(x, GOLD, 6, 14) }
      }
      label(x, 'NEW', s.cx - (n - 1) / 2 * gap, sy + r + 70, { size: 36, weight: 700, family: 'mono', color: MUTED, alpha: clamp(T / 0.4) })
      label(x, 'FULL', s.cx + 0.5 * gap, sy + r + 70, { size: 36, weight: 700, family: 'mono', color: MUTED, alpha: clamp(T / 0.4) })
      // the big moon above shows the current phase
      const ph = curK ? cur / 8 : 0.125
      const BR = Math.min((sy - r - s.top) * 0.36, s.w * 0.3)
      const by = s.top + (sy - r - s.top) * 0.44
      neonMoon(x, s.cx, by, BR * pop01(T, 0.1, 0.5, 1.8), ph, s.t)
      if (showLbl) label(x, typeof p.label === 'string' ? p.label : phaseName(ph), s.cx, by + BR + 64, { size: 46, weight: 700, family: 'mono', spacing: 0.1, color: GOLD })
      return
    }
    const w0 = 0.12 * s.dur, w1 = 0.85 * s.dur
    let ph = p.wax ? lerp(0.0, 0.5, ease.inOutCubic(prog(s.lt, w0, w1))) : phaseOf(p.phase)
    if (p.wax) ph = Math.round(ph * 160) / 160      // the moon disc is cached per phase: quantise
    const R = Math.min(s.h * (showLbl ? 0.36 : 0.42), s.w * 0.4)
    const cy = s.cy - (showLbl ? 50 : 0) + Math.sin(s.t * 1.2) * 6
    const k = pop01(T, 0.02, 0.5, 1.8)
    neonMoon(x, s.cx, cy, R * k, ph, s.t, { glow: 1.2 })
    twinkles(x, s.cx, cy, s.t, { n: 7, R: R * 1.4, seed: 13 })
    if (p.wax) sparkle(x, s.cx, cy, s.lt, w1, { n: 14, R: R * 1.3, seed: 22 })
    if (showLbl) {
      const txt = typeof p.label === 'string' ? p.label : phaseName(ph)
      label(x, txt, s.cx, cy + R + 80, { size: 52, weight: 700, family: 'mono', spacing: 0.1, color: GOLD, alpha: clamp((T - 0.3) / 0.3) })
    }
  },
  cues(p, t0, dur) {
    if (p.strip) { const c = []; for (let i = 0; i < 8; i++) c.push(['pluck', t0 + 0.05 + i * 0.08 + 0.1, PENTA[i % PENTA.length] * 0.5, 0.035, 0.6, (i - 3.5) * 0.1]); if (p.phase == null) for (let i = 1; i < 8; i++) c.push(['tick', t0 + lerp(0.3, 0.9, i / 8) * dur, 0.04]); return c }
    if (p.wax) return [['riser', t0 + 0.12 * dur, t0 + 0.85 * dur, 0.03], ['bell', t0 + 0.85 * dur, 1318.51, 0.05, 2.4, 0], ['glitter', t0 + 0.85 * dur, t0 + 1.5 * dur]]
    return [['bell', t0 + 0.25, 880, 0.04, 2.4, 0]]
  },
}

// ───────────────────────── elements
const ELS = ['fire', 'earth', 'air', 'water']
const EL_ICON = { fire: 'fire', earth: 'mountain', air: 'wind', water: 'wave' }
const EL_WORD = { fire: 'passion', earth: 'steady', air: 'ideas', water: 'feelings' }
const elements = {
  min: p => 1.6 + list(p.show).length * 0.4,
  draw(x, p, s) {
    const show = (list(p.show).length ? list(p.show) : ELS).map(e => String(e).toLowerCase()).filter(e => ELS.includes(e))
    const n = show.length, T = ct(s)
    const cols = n === 4 ? 2 : n, rows = n === 4 ? 2 : 1
    const one = n === 1
    const cw = Math.min(s.w / cols, one ? 640 : 460) - 24, ch = Math.min((s.h / rows) - 24, one ? s.h * 0.9 : cw * 1.25)
    const words = p.labels === true ? EL_WORD : Array.isArray(p.labels) ? Object.fromEntries(show.map((e, i) => [e, p.labels[i]])) : (p.labels || {})
    show.forEach((el, i) => {
      const at = p.instant ? 0 : stagger(i, n, s.cdur ?? s.dur, 0.06, 0.45), k = pop01(T, at, 0.36, 2.2)
      if (k <= 0) return
      const c = ELEMENT_COLOR[el], col = i % cols, row = Math.floor(i / cols)
      const px = s.cx + (col - (cols - 1) / 2) * (cw + 24), py = s.cy + (row - (rows - 1) / 2) * (ch + 24)
      x.save(); x.translate(px, py + Math.sin(s.t * 1.8 + i) * 5); x.scale(k, k); x.rotate(0.012 * Math.sin(s.t + i))
      rr(x, -cw / 2, -ch / 2, cw, ch, 36); x.fillStyle = 'rgba(16,10,40,0.88)'; x.fill(); ink(x, c, { w: 7, fa: 0.1, glow: 24 })
      const hasS = !!p.signs, hasW = !!words[el]
      const isz = Math.min(cw * 0.55, ch * (hasS || hasW ? 0.36 : 0.5))
      const iy = -ch / 2 + ch * (hasS || hasW ? 0.3 : 0.38)
      icon(x, EL_ICON[el], 0, iy, isz, c, s.t)
      let y = iy + isz * 0.62 + 50
      label(x, el.toUpperCase(), 0, y, { size: one ? 96 : Math.min(72, cw * 0.17), weight: 900, color: BONE, spacing: 0.04 }); y += one ? 90 : 72
      if (hasW) { label(x, words[el], 0, y - 6, { size: one ? 56 : 44, weight: 500, family: 'serif', italic: true, color: c, maxW: cw - 40 }); y += one ? 80 : 66 }
      if (hasS) {
        const sg = SIGNS.filter(S => S.el === el), gs = Math.min(cw / 4.2, one ? 120 : 76), gy = Math.min(y + gs * 0.4, ch / 2 - gs * 0.8)
        sg.forEach((S, j) => { const kk = pop01(T, at + 0.25 + j * 0.1, 0.3, 2.4); glyph(x, S.glyph, (j - 1) * gs * 1.25, gy, gs * kk, S.color, { glow: 14 }) })
      }
      x.restore()
    })
  },
  cues(p, t0, dur) { const n = (list(p.show).length || 4); return Array.from({ length: n }, (_, i) => ['pluck', t0 + stagger(i, n, dur, 0.06, 0.45), PENTA[(i * 2) % PENTA.length], 0.045, 0.7, (i - (n - 1) / 2) * 0.3]) },
}

// ───────────────────────── the big three
const BIG = [['sun', 'Sun', 'who you are'], ['moon', 'Moon', 'what you need'], ['rising', 'Rising', 'how you come across']]
function risingIcon(x, cx, cy, r, col) {
  x.beginPath(); x.arc(cx, cy + r * 0.25, r * 0.55, Math.PI, 0); ink(x, col, { w: 6, fa: 0.4, glow: 18 })
  x.beginPath(); x.moveTo(cx - r * 0.85, cy + r * 0.25); x.lineTo(cx + r * 0.85, cy + r * 0.25); line(x, col, 6, 12)
  x.beginPath(); x.moveTo(cx, cy - r * 0.45); x.lineTo(cx, cy - r * 0.85); x.moveTo(cx - r * 0.18, cy - r * 0.65); x.lineTo(cx, cy - r * 0.85); x.lineTo(cx + r * 0.18, cy - r * 0.65); line(x, col, 5, 10)
}
const bigthree = {
  min: () => 3,
  draw(x, p, s) {
    const T = ct(s), dur = s.cdur ?? s.dur
    const signs = { sun: sign(p.sun) || SIGNS[4], moon: sign(p.moon) || SIGNS[3], rising: sign(p.rising) || SIGNS[6] }
    const rh = Math.min(260, (s.h - 40) / 3), rw = Math.min(s.w, 920)
    BIG.forEach(([key, nm, what], i) => {
      const at = stagger(i, 3, dur, 0.08, 0.55), k = pop01(T, at, 0.38, 2.1)
      if (k <= 0) return
      const S = signs[key], y = s.cy + (i - 1) * (rh + 14)
      x.save(); x.translate(s.cx + (1 - clamp(k)) * (i % 2 ? 160 : -160), y); x.scale(lerp(0.85, 1, clamp(k)), lerp(0.85, 1, clamp(k))); x.globalAlpha *= clamp(k * 2)
      rr(x, -rw / 2, -rh / 2, rw, rh, rh * 0.22); x.fillStyle = 'rgba(16,10,40,0.88)'; x.fill(); ink(x, S.color, { w: 6, fa: 0.08, glow: 22 })
      // left: the body's symbol in a disc
      const dr = rh * 0.34, dx = -rw / 2 + dr + 34
      x.beginPath(); x.arc(dx, 0, dr, 0, TAU); x.fillStyle = 'rgba(10,6,28,0.9)'; x.fill(); ink(x, key === 'sun' ? PLANETS.sun.color : key === 'moon' ? PLANETS.moon.color : GOLD, { w: 5, fa: 0.15, glow: 16 })
      if (key === 'rising') risingIcon(x, dx, 0, dr * 0.8, GOLD)
      else glyph(x, key, dx, 0, dr * 1.15, PLANETS[key].color, { glow: 16 })
      // the sign glyph, big, in its colour
      const gx = dx + dr + 30 + rh * 0.3
      glyph(x, S.glyph, gx, 0, rh * 0.52 * (1 + 0.04 * Math.sin(s.t * 2.4 + i)), S.color, { glow: 24 })
      const tx = gx + rh * 0.36 + 10, maxW = rw / 2 - tx - 30
      const lbl = p.labels !== false
      label(x, `${nm} in ${S.name}`, tx, lbl ? -rh * 0.14 : 0, { size: Math.min(64, rh * 0.27), weight: 900, align: 'left', maxW })
      if (lbl) label(x, typeof p.labels === 'object' && p.labels ? (p.labels[key] ?? p.labels[i] ?? what) : what, tx, rh * 0.2, { size: Math.min(46, rh * 0.2), weight: 500, family: 'serif', italic: true, align: 'left', color: S.color, maxW })
      x.restore()
      sparkle(x, s.cx - rw / 2 + dr + 34, y, T, at + 0.1, { n: 7, R: 110, seed: i + 60, size: 20 })
    })
  },
  cues(p, t0, dur) { return [0, 1, 2].map(i => ['pluck', t0 + stagger(i, 3, dur, 0.08, 0.55) + 0.05, [587.33, 739.99, 987.77][i], 0.05, 0.8, (i - 1) * 0.3]) },
}

// ───────────────────────── constellation
function mst(P) {
  const n = P.length, inT = new Array(n).fill(false), best = new Array(n).fill(Infinity), par = new Array(n).fill(-1), E = []
  best[0] = 0
  for (let it = 0; it < n; it++) {
    let u = -1; for (let i = 0; i < n; i++) if (!inT[i] && (u < 0 || best[i] < best[u])) u = i
    inT[u] = true; if (par[u] >= 0) E.push([par[u], u])
    for (let v = 0; v < n; v++) if (!inT[v]) { const d = Math.hypot(P[u][0] - P[v][0], P[u][1] - P[v][1]); if (d < best[v]) { best[v] = d; par[v] = u } }
  }
  return E
}
function scatter(n, r, x0, x1, y0, y1, minD) {
  const P = []
  for (let tries = 0; P.length < n && tries < 4000; tries++) {
    const q = [lerp(x0, x1, r()), lerp(y0, y1, r())]
    if (P.every(o => Math.hypot(o[0] - q[0], o[1] - q[1]) > minD)) P.push(q)
  }
  return P
}
function constellationShape(p) {
  const shape = p.shape || 'random', r = rng(p.seed ?? 29)
  if (shape === 'dipper') {
    const P = [[-1, -0.12], [-0.6, -0.3], [-0.3, -0.2], [0, -0.06], [0.08, 0.36], [0.68, 0.42], [0.74, -0.04]]   // Alkaid … Megrez, Phecda, Merak, Dubhe
    return { P, E: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]], link: p.link ? [0, 5] : null, names: null }
  }
  if (shape === 'heart') {
    const n = clamp(p.n ?? 10, 6, 16), P = []
    for (let i = 0; i < n; i++) { const t = (i / n) * TAU; P.push([Math.pow(Math.sin(t), 3) * 0.95, -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17 + 0.05]) }
    const E = P.map((_, i) => [i, (i + 1) % n])
    return { P, E, link: p.link ? [0, Math.round(n / 2)] : null }
  }
  if (shape === 'two') {
    const n = clamp(p.n ?? 10, 6, 16), h = Math.ceil(n / 2)
    const A = scatter(h, r, -1, -0.25, -0.75, 0.75, 0.3), B = scatter(n - h, r, 0.25, 1, -0.75, 0.75, 0.3)
    const EA = mst(A), EB = mst(B).map(([a, b]) => [a + A.length, b + A.length])
    // the link: A's star nearest the middle to B's
    const ia = A.reduce((m, q, i) => q[0] > A[m][0] ? i : m, 0), ib = B.reduce((m, q, i) => q[0] < B[m][0] ? i : m, 0)
    return { P: [...A, ...B], E: [...EA, ...EB], link: p.link ? [ia, ib + A.length] : null, groups: [A.length] }
  }
  const n = clamp(p.n ?? 9, 4, 18), P = scatter(n, r, -1, 1, -0.8, 0.8, 0.32), E = mst(P)
  let link = null
  if (p.link) { let bd = 0; for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]); if (d > bd && !E.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) { bd = d; link = [i, j] } } }
  return { P, E, link }
}
const constellation = {
  min: p => p.link ? 3.4 : 2.8,
  draw(x, p, s) {
    const T = ct(s), dur = s.cdur ?? s.dur, C = constellationShape(p)
    const hasL = !!p.label
    const sx = s.w * 0.44, sy = Math.min(s.h * 0.4, sx * 1.1) * (p.shape === 'dipper' ? 0.95 : 1), cy = s.cy - (hasL ? 50 : 0)
    const P = C.P.map(([a, b], i) => [s.cx + a * sx + Math.sin(s.t * 0.9 + i) * 3, cy + b * sy + Math.cos(s.t * 0.8 + i * 1.3) * 3])
    const starAt = P.map((_, i) => stagger(i, P.length, dur, 0.04, 0.4))
    // background dust
    const R = rng(71)
    for (let i = 0; i < 40; i++) { x.beginPath(); x.arc(s.cx + (R() - 0.5) * s.w, s.cy + (R() - 0.5) * s.h, 1.5 + R() * 2, 0, TAU); x.fillStyle = rgba('#fff3e0', 0.15 + 0.35 * Math.abs(Math.sin(s.t * (0.5 + R()) + i))); x.fill() }
    // the lines draw themselves after both stars are up
    C.E.forEach(([a, b], j) => {
      const t0 = Math.max(starAt[a], starAt[b]) + 0.15, k = ease.outCubic(prog(T, t0, t0 + 0.45))
      if (k <= 0) return
      const g = C.groups && a >= C.groups[0] ? PINK : BLUE
      x.beginPath(); x.moveTo(P[a][0], P[a][1]); x.lineTo(lerp(P[a][0], P[b][0], k), lerp(P[a][1], P[b][1], k)); line(x, rgba(p.shape === 'heart' ? PINK : g, 0.85), 5, 16)
    })
    // the stars
    P.forEach(([px, py], i) => {
      const k = pop01(T, starAt[i], 0.3, 2.6); if (k <= 0) return
      const tw = 0.85 + 0.15 * Math.sin(s.t * 3 + i * 2.1)
      x.beginPath(); x.arc(px, py, 16 * k * tw, 0, TAU); ink(x, '#fff3e0', { w: 4, fa: 0.85, glow: 26 })
      drawPixelStar(x, px, py, 40 * k * tw, i % 3, GOLD)
    })
    // the link: two far-apart stars join in gold
    if (C.link) {
      const at = Math.max(0.55 * s.dur, (stagger(P.length - 1, P.length, dur, 0.04, 0.4) + 0.7) - (T - s.lt)), k = ease.inOutCubic(prog(s.lt, at, at + 0.6))
      if (k > 0) {
        const [a, b] = C.link.map(i => P[i]), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.25
        x.beginPath(); x.moveTo(a[0], a[1])
        const N = 30; for (let i = 1; i <= N * k; i++) { const u = i / N; x.lineTo((1 - u) ** 2 * a[0] + 2 * u * (1 - u) * mx + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * u * (1 - u) * my + u * u * b[1]) }
        line(x, GOLD, 8, 30)
        for (const q of [a, b]) { x.beginPath(); x.arc(q[0], q[1], 26 + 6 * Math.sin(s.t * 5), 0, TAU); x.save(); x.globalAlpha *= k; line(x, GOLD, 5, 24); x.restore() }
        heart(x, mx, my + Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.12, 40 * pop01(s.lt, at + 0.6, 0.4, 2.6), PINK)
        sparkle(x, mx, my, s.lt, at + 0.6, { n: 14, R: 200, seed: 19 })
      }
    }
    if (hasL) pill(x, p.label, s.cx, s.bottom - 50, { size: 40, col: GOLD, fg: BONE, alpha: clamp((T - 0.8) / 0.3) })
  },
  cues(p, t0, dur, ctx = {}) {
    const C = constellationShape(p), c = []
    if (!ctx.step) C.P.forEach((_, i) => c.push(['pop', t0 + stagger(i, C.P.length, dur, 0.04, 0.4), PENTA[i % PENTA.length] * 1.5, 0.025, (i % 5 - 2) * 0.2]))
    if (C.link) { const at = Math.max(0.55 * dur, stagger(C.P.length - 1, C.P.length, dur, 0.04, 0.4) + 0.7); c.push(['riser', t0 + at, t0 + at + 0.6, 0.025], ['bell', t0 + at + 0.6, 1318.51, 0.055, 2.4, 0], ['glitter', t0 + at + 0.6, t0 + at + 1.3]) }
    return c
  },
}

// ───────────────────────── horizon (a sign rising in the east at dawn)
const horizon = {
  min: () => 3.2,
  draw(x, p, s) {
    const S = sign(p.sign) || SIGNS[0], T = ct(s), dur = s.cdur ?? s.dur
    const hy = s.cy + s.h * 0.2, L = s.cx - s.w / 2 - 40, Rr = s.cx + s.w / 2 + 40
    const riseK = ease.outCubic(prog(T, 0.15 * dur, 0.75 * dur)), dawn = ease.inOutCubic(prog(T, 0, 0.8 * dur))
    // dawn glow above the horizon
    const gx = s.cx + 40, gr = s.w * 0.75
    x.save(); x.beginPath(); x.rect(L, s.top - 40, Rr - L, hy - s.top + 40); x.clip()
    const g = x.createRadialGradient(gx, hy, 0, gx, hy, gr)
    g.addColorStop(0, rgba('#ffb36a', 0.5 * dawn + 0.1)); g.addColorStop(0.35, rgba('#ff7fa8', 0.28 * dawn + 0.05)); g.addColorStop(1, rgba('#7a4ad8', 0))
    x.fillStyle = g; x.fillRect(L, s.top - 40, Rr - L, hy - s.top + 40)
    // the rise path (it climbs at an angle, tilting toward the south as it goes)
    const G = Math.min(s.h * 0.3, 300), dr = G * 0.62
    const p0 = [gx - 70, hy + dr * 1.3], p1 = [gx + 110, s.top + dr * 1.25]
    const px = lerp(p0[0], p1[0], riseK), py = lerp(p0[1], p1[1], riseK)
    x.beginPath(); x.moveTo(p0[0], p0[1]); x.lineTo(lerp(p0[0], p1[0], 1.15), lerp(p0[1], p1[1], 1.15)); dashed(x, GOLD, 4, [6, 18], 0.45)
    // the sign: a glowing disc carrying the glyph
    const halo = x.createRadialGradient(px, py, dr * 0.4, px, py, dr * 2.2); halo.addColorStop(0, rgba(S.color, 0.45)); halo.addColorStop(1, rgba(S.color, 0))
    x.fillStyle = halo; x.fillRect(px - dr * 2.2, py - dr * 2.2, dr * 4.4, dr * 4.4)
    x.beginPath(); x.arc(px, py, dr, 0, TAU); ink(x, S.color, { w: 8, fa: 0.3, glow: 34 })
    for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + s.t * 0.3, r0 = dr * 1.15, r1 = dr * (1.35 + 0.06 * Math.sin(s.t * 4 + i)); x.beginPath(); x.moveTo(px + Math.cos(a) * r0, py + Math.sin(a) * r0); x.lineTo(px + Math.cos(a) * r1, py + Math.sin(a) * r1); line(x, rgba(S.color, 0.85), 6, 14) }
    glyph(x, S.glyph, px, py, dr * 1.15, '#fff3e0', { glow: 30 })
    x.restore()
    // stars fade as the sky brightens
    x.save(); x.globalAlpha *= 1 - dawn * 0.7; twinkles(x, s.cx, s.top + s.h * 0.25, s.t, { n: 8, R: s.w * 0.45, seed: 31 }); x.restore()
    // the ground
    x.beginPath(); x.moveTo(L, hy + 30); x.quadraticCurveTo(s.cx, hy - 30, Rr, hy + 30); x.lineTo(Rr, s.bottom + 40); x.lineTo(L, s.bottom + 40); x.closePath()
    x.fillStyle = 'rgba(12,6,30,0.95)'; x.fill()
    x.beginPath(); x.moveTo(L, hy + 30); x.quadraticCurveTo(s.cx, hy - 30, Rr, hy + 30); line(x, ORANGE, 7, 26)
    // a few hills
    x.beginPath(); x.moveTo(L, hy + 70); x.quadraticCurveTo(s.cx - 260, hy + 10, s.cx - 80, hy + 60); x.quadraticCurveTo(s.cx + 160, hy + 100, Rr, hy + 60); line(x, rgba(VIOLET, 0.5), 4, 8)
    label(x, 'EAST', gx, hy + 70, { size: 40, weight: 700, family: 'mono', spacing: 0.3, color: ORANGE })
    x.beginPath(); x.moveTo(gx, hy + 104); x.lineTo(gx, hy + 128); line(x, ORANGE, 5, 8)
    // the chip when it's up
    const ck = pop01(T, 0.7 * dur, 0.4, 2.4)
    if (ck > 0) { x.save(); x.translate(s.cx, hy + 190); x.scale(ck, ck); pill(x, `${S.name.toUpperCase()} RISING`, 0, 0, { size: 46, col: S.color, fg: BONE, fillA: 0.15 }); x.restore() }
    // someone watching
    if (p.person) {
      const P = typeof p.person === 'object' ? p.person : { col: typeof p.person === 'string' ? p.person : null }
      const sc = Math.min(0.85, s.h / 1300)
      person(x, s.cx - s.w * 0.36, hy + 18, sc, color(P.col, BLUE), { pose: P.pose || (riseK > 0.85 ? 'point' : 'stand'), t: s.t, a: clamp(T / 0.4), sign: P.sign || null })
    }
  },
  cues(p, t0, dur) { return [['riser', t0 + 0.15 * dur, t0 + 0.7 * dur, 0.03], ['bell', t0 + 0.7 * dur, 987.77, 0.05, 2.2, 0], ['glitter', t0 + 0.7 * dur, t0 + 0.7 * dur + 0.8]] },
}

// ───────────────────────── aspect (two planets and the angle between them)
const ASPECTS = { 0: ['CONJUNCTION', GOLD], 60: ['SEXTILE', BLUE], 90: ['SQUARE', RED], 120: ['TRINE', GREEN], 180: ['OPPOSITION', PINK] }
const aspect = {
  min: () => 3,
  draw(x, p, s) {
    const T = ct(s), deg = Number(p.deg ?? 120), [nm, col] = ASPECTS[deg] || [`${deg}°`, GOLD]
    const A = PLANETS[p.a] ? p.a : 'venus', B = PLANETS[p.b] ? p.b : 'mars'
    const R = Math.min(s.w * 0.45, (s.h - 140) * 0.47), cy = s.cy - 50, cx = s.cx
    const appear = i => pop01(T, 0.03 + i * 0.03, 0.3, 2)
    zodiac(x, cx, cy, R, s.t, { appear, dim: 0.65, gsz: R * 0.13, r1: R * 0.8 })
    const tr = R * 0.66
    ring(x, cx, cy, tr, rgba(VIOLET, 0.4), 3, 6)
    // where they sit: centred on the top (λ = 270°) unless `at` gives planet a's longitude
    const la = (p.at != null ? Number(p.at) : 270 - deg / 2) * D2R
    const sw0 = 0.15 * s.dur, sw1 = Math.max(sw0 + 0.9, 0.5 * s.dur)
    const sk = ease.inOutCubic(prog(s.lt, sw0, sw1))
    const lb = la + deg * D2R * sk
    const aa = lonAng(la), ab = lonAng(lb)
    const [ax, ay] = pt(cx, cy, tr, aa), [bx, by] = pt(cx, cy, tr, ab)
    // the angle at the centre
    if (deg > 0 && sk > 0) {
      x.beginPath(); x.moveTo(cx, cy); x.lineTo(ax, ay); x.moveTo(cx, cy); x.lineTo(bx, by); dashed(x, BONE, 4, [10, 12], 0.6)
      x.beginPath(); x.arc(cx, cy, R * 0.22, aa, ab, true); line(x, col, 7, 18)
      const am = (aa + ab) / 2, [lx, ly] = pt(cx, cy, R * 0.38, am)
      label(x, `${Math.round(deg * sk)}°`, lx, ly, { size: 56, weight: 900, color: col })
    }
    // the chord between them once the angle is set
    const ck = ease.outCubic(prog(s.lt, sw1, sw1 + 0.4))
    if (ck > 0 && deg > 0) { x.beginPath(); x.moveTo(ax, ay); x.lineTo(lerp(ax, bx, ck), lerp(ay, by, ck)); line(x, col, 8, 28) }
    if (ck > 0 && deg === 0) { ring(x, ax, ay, R * 0.14 + 20 * ck, rgba(col, 0.8 * ck), 6, 22) }
    // the planets
    const pr = R * 0.1
    const ka = pop01(T, 0.1, 0.35, 2.4), kb = pop01(T, 0.18, 0.35, 2.4)
    const off = deg === 0 ? pr * 1.1 : 0
    for (const [id, px, py, k, o] of [[A, ax, ay, ka, -off], [B, bx, by, kb, off]]) {
      const qx = px + o * Math.cos(aa + Math.PI / 2), qy = py + o * Math.sin(aa + Math.PI / 2)
      x.beginPath(); x.arc(qx, qy, pr * k, 0, TAU); x.fillStyle = 'rgba(16,10,40,0.94)'; x.fill(); ink(x, pcol(id), { w: 6, fa: 0.3, glow: 22 })
      glyph(x, id, qx, qy, pr * 1.15 * k, pcol(id), { glow: 12 })
    }
    sparkle(x, (ax + bx) / 2, (ay + by) / 2, s.lt, sw1 + 0.3, { n: 12, R: 160, seed: 44 })
    // the name chip
    const nk = pop01(s.lt, sw1 + 0.15, 0.4, 2.4)
    if (nk > 0) {
      x.save(); x.translate(cx, cy + R + 70); x.scale(nk, nk)
      pill(x, p.label || `${pname(A)} ${nm.toLowerCase()} ${pname(B)} · ${deg}°`.replace(/^(.)/, c => c.toUpperCase()), 0, 0, { size: 42, col, fg: BONE, fillA: 0.12, weight: 800 })
      x.restore()
    }
  },
  cues(p, t0, dur) { const a = 0.15 * dur, b = Math.max(a + 0.9, 0.5 * dur), deg = Number(p.deg ?? 120); return [['pop', t0 + 0.1, 880, 0.04, -0.3], ['pop', t0 + 0.18, 1046.5, 0.04, 0.3], ['riser', t0 + a, t0 + b, 0.025], deg === 90 || deg === 180 ? ['tick', t0 + b, 0.08] : ['bell', t0 + b + 0.3, 1174.66, 0.05, 2, 0], ['pop', t0 + b + 0.15, 1318.51, 0.04, 0]] },
}

// ───────────────────────── houses
const HOUSE_NAMES = ['Self', 'Money', 'Talk', 'Home', 'Fun', 'Routine', 'Partners', 'Shared', 'Travel', 'Career', 'Friends', 'Rest']
const HOUSE_COLS = [FIRE, EARTH, AIR, WATER]
const houses = {
  min: p => 2.8 + (p.highlight ? 0.6 : 0),
  draw(x, p, s) {
    const T = ct(s), dur = s.cdur ?? s.dur
    const names = p.labels === true ? HOUSE_NAMES : Array.isArray(p.labels) ? p.labels : p.labels && typeof p.labels === 'object' ? HOUSE_NAMES.map((n, i) => p.labels[i + 1] ?? null) : null
    const R = Math.min(s.w * (names ? 0.29 : 0.45), s.h * 0.44), cx = s.cx, cy = s.cy, hub = R * 0.32
    const hi = new Set(list(p.highlight).map(Number).filter(h => h >= 1 && h <= 12))
    const hT = 0.5 * s.dur, hK = hi.size ? ease.outCubic(prog(s.lt, hT, hT + 0.4)) : 0
    for (let h = 1; h <= 12; h++) {
      const at = stagger(h - 1, 12, dur, 0.04, 0.42), k = pop01(T, at, 0.32, 2.2)
      if (k <= 0) continue
      const a0 = Math.PI - (h - 1) * 30 * D2R, a1 = Math.PI - h * 30 * D2R, am = (a0 + a1) / 2
      const on = hi.has(h) ? hK : 0, off = hi.size && !hi.has(h) ? hK : 0
      const c = HOUSE_COLS[(h - 1) % 4]
      const rOut = R * lerp(0.7, 1, clamp(k)) * (1 + 0.06 * on)
      wedge(x, cx, cy, hub, rOut, a0 - 0.004, a1 + 0.004)
      x.save(); x.globalAlpha *= lerp(1, 0.4, off)
      ink(x, on ? GOLD : rgba(c, 0.9), { w: on ? 8 : 5, fa: 0.12 + 0.3 * on, fill: on ? GOLD : c, glow: on ? 30 : 10 })
      const [nx, ny] = pt(cx, cy, (hub + rOut) / 2 + R * 0.03, am)
      label(x, String(h), nx, ny, { size: R * 0.19 * (1 + 0.15 * on), weight: 900, color: on ? GOLD : BONE })
      if (names && names[h - 1]) {
        const [lx, ly] = pt(cx, cy, R * 1.1 + 6, am), cosA = Math.cos(am)
        label(x, names[h - 1], lx, ly, { size: 38, weight: 800, align: Math.abs(cosA) < 0.3 ? 'center' : cosA > 0 ? 'left' : 'right', color: on ? GOLD : hi.size ? MUTED : BONE, maxW: s.w / 2 - R * 1.1 - 10 })
      }
      x.restore()
      if (on) sparkle(x, nx, ny, s.lt, hT + 0.1, { n: 8, R: 120, seed: h + 80, size: 20 })
    }
    ring(x, cx, cy, hub, rgba(VIOLET, 0.8), 4, 10)
    // the horizon axis: Ascendant (left / east on a chart) to Descendant
    const ak = ease.outCubic(prog(T, 0.3, 0.8))
    x.beginPath(); x.moveTo(cx - R * 1.04 * ak, cy); x.lineTo(cx + R * 1.04 * ak, cy); line(x, GOLD, 6, 18)
    if (!names) { label(x, 'ASC', cx - R - 10, cy - 34, { size: 36, weight: 700, family: 'mono', color: GOLD, align: 'left', alpha: ak }); label(x, 'DSC', cx + R + 10, cy - 34, { size: 36, weight: 700, family: 'mono', color: GOLD, align: 'right', alpha: ak }) }
    orb(x, 'earth', cx, cy, hub * 0.5 * pop01(T, 0.1), s.t)
  },
  cues(p, t0, dur, ctx = {}) {
    const c = []
    if (!ctx.step) for (let h = 0; h < 12; h += 2) c.push(['pluck', t0 + stagger(h, 12, dur, 0.04, 0.42) + 0.06, PENTA[(h / 2) % PENTA.length], 0.03, 0.5, 0])
    if (list(p.highlight).length) c.push(['bell', t0 + 0.5 * dur + 0.1, 1174.66, 0.05, 2, 0])
    return c
  },
}

// ───────────────────────── signcard (a collectible card)
const signcard = {
  min: () => 2.6,
  draw(x, p, s) {
    const S = sign(p.sign) || SIGNS[7], T = ct(s)
    const w = Math.min(600, s.h * 0.66, s.w * 0.68), h = w * 1.42
    const flipK = p.flip === false ? 1 : ease.inOutCubic(prog(T, 0.1, 0.65))
    const sx = Math.abs(Math.cos(Math.PI * (1 - flipK)))
    const bob = Math.sin(s.t * 1.3) * 8
    if (flipK < 0.5) { cardBack(x, s.cx, s.cy + bob, w * Math.max(0.02, sx) / 1.0, { t: s.t }); return }
    x.save(); x.translate(s.cx, s.cy + bob); x.scale(Math.max(0.02, sx), 1); x.rotate(Math.sin(s.t * 0.8) * 0.025)
    // body
    x.shadowColor = rgba(S.color, 0.6); x.shadowBlur = 60
    rr(x, -w / 2, -h / 2, w, h, w * 0.06); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1a5e'); g.addColorStop(1, '#130b30'); x.fillStyle = g; x.fill(); x.shadowBlur = 0
    rr(x, -w / 2, -h / 2, w, h, w * 0.06); line(x, GOLD, 7, 18)
    rr(x, -w / 2 + 16, -h / 2 + 16, w - 32, h - 32, w * 0.045); line(x, rgba(S.color, 0.9), 4, 10)
    // title bar
    const title = (p.title || S.name).toUpperCase()
    label(x, title, 0, -h / 2 + w * 0.13, { size: w * 0.1, weight: 900, color: BONE, maxW: w * 0.78, spacing: 0.04 })
    // art window: a coloured sky with the glyph
    const ax = -w / 2 + w * 0.09, ay = -h / 2 + w * 0.24, aw = w * 0.82, ah = w * 0.82
    x.save(); rr(x, ax, ay, aw, ah, w * 0.04); x.clip()
    const ag = x.createRadialGradient(0, ay + ah / 2, 0, 0, ay + ah / 2, aw * 0.75); ag.addColorStop(0, rgba(S.color, 0.65)); ag.addColorStop(1, '#170c3a')
    x.fillStyle = ag; x.fillRect(ax, ay, aw, ah)
    const R = rng(sIdx(S.id) + 5)
    for (let i = 0; i < 18; i++) { x.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(s.t * (1 + R()) + i)); drawPixelStar(x, ax + R() * aw, ay + R() * ah, 10 + R() * 12, Math.floor(R() * 3), '#fff3e0') }
    x.globalAlpha = 1
    x.beginPath(); x.arc(0, ay + ah / 2, aw * 0.36, 0, TAU); ink(x, '#fff3e0', { w: 4, fa: 0.08, glow: 14 })
    glyph(x, S.glyph, 0, ay + ah / 2, aw * 0.5 * (1 + 0.03 * Math.sin(s.t * 2)), '#fff3e0', { glow: 36 })
    // holo shine sweeping across
    const sh = ((s.t * 0.45) % 1.6) - 0.3
    const hg = x.createLinearGradient(ax + aw * (sh - 0.25), ay, ax + aw * (sh + 0.25), ay + ah)
    hg.addColorStop(0, 'rgba(255,255,255,0)'); hg.addColorStop(0.5, 'rgba(255,255,255,0.22)'); hg.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = hg; x.fillRect(ax, ay, aw, ah)
    x.restore()
    rr(x, ax, ay, aw, ah, w * 0.04); line(x, S.color, 5, 16)
    // stats row
    const ry = ay + ah + w * 0.08
    pill(x, S.el.toUpperCase(), -w * 0.2, ry, { size: w * 0.05, family: 'mono', weight: 700, col: ELEMENT_COLOR[S.el], fg: ELEMENT_COLOR[S.el], h: 1.7 })
    glyph(x, S.ruler, w * 0.06, ry, w * 0.07, pcol(S.ruler), { glow: 12 })
    label(x, S.dates.toUpperCase().replace(' – ', '–'), w * 0.25, ry, { size: Math.max(28, w * 0.042), weight: 700, family: 'mono', color: MUTED, maxW: w * 0.32 })
    // the line
    const ly = ry + (h / 2 - ry) * 0.55
    if (p.line) para(x, p.line, 0, ly, { size: Math.max(36, w * 0.068), weight: 500, family: 'serif', italic: true, color: BONE, maxW: w * 0.82, lh: 1.08 })
    x.restore()
    sparkle(x, s.cx, s.cy, T, 0.65, { n: 14, R: w * 0.75, seed: 66 })
  },
  cues(p, t0) { return p.flip === false ? [['bell', t0 + 0.2, 987.77, 0.045, 2, 0]] : [['whoosh', t0 + 0.12, 0.45, 0.05], ['bell', t0 + 0.65, 1174.66, 0.05, 2.2, 0], ['glitter', t0 + 0.6, t0 + 1.2]] },
}

export default { wheel, glyph: glyph1, glyphs, planet: planet1, orbit, moon, elements, bigthree, constellation, horizon, aspect, houses, signcard }
export { icon, orb, zodiac, neonMoon }
