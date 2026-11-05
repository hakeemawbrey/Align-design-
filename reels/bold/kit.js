// Shared drawing kit for the bold reels (the pre–Star Talk look): palette, easing, neon line-art ink, pictogram
// people (no faces), sign/planet glyphs, labels, pills, cards, sparkle bursts. Everything is a pure function of its
// arguments, so a frame is a pure function of t. Vis modules (vis/*.js) import from here and nothing else.
import { clamp, lerp, prog, ease, rng, noise1, hexToRgb, drawPixelStar, drawMoon, W, H } from './sky.js'
export { clamp, lerp, prog, ease, rng, noise1, hexToRgb, drawPixelStar, drawMoon, W, H }

export const TAU = Math.PI * 2, D2R = Math.PI / 180
export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', ROSE = '#f59cc4', BLUE = '#8fd8f6', VIOLET = '#c9a6ff'
export const RED = '#ff4d3a', GREEN = '#7be08a', ORANGE = '#f29a4a', TEAL = '#2fc79a', MUTED = '#b3a6c4', NIGHT = '#140a2e', INK = '#1a1033'
export const FIRE = '#f0603a', EARTH = '#e9b24a', AIR = '#7fd0f0', WATER = '#3f7cf0'
export const ELEMENT_COLOR = { fire: FIRE, earth: EARTH, air: AIR, water: WATER }
export const READING = { push: '#f59cc4', pull: '#8fd8f6', align: '#f2c75c' }
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', monospace"
export const SIGNS = [
  { id: 'aries', name: 'Aries', glyph: '♈', el: 'fire', color: '#f0603a', dates: 'Mar 21 – Apr 19', ruler: 'mars' },
  { id: 'taurus', name: 'Taurus', glyph: '♉', el: 'earth', color: '#e9b24a', dates: 'Apr 20 – May 20', ruler: 'venus' },
  { id: 'gemini', name: 'Gemini', glyph: '♊', el: 'air', color: '#f2cf4a', dates: 'May 21 – Jun 20', ruler: 'mercury' },
  { id: 'cancer', name: 'Cancer', glyph: '♋', el: 'water', color: '#3fb6f0', dates: 'Jun 21 – Jul 22', ruler: 'moon' },
  { id: 'leo', name: 'Leo', glyph: '♌', el: 'fire', color: '#f39a3a', dates: 'Jul 23 – Aug 22', ruler: 'sun' },
  { id: 'virgo', name: 'Virgo', glyph: '♍', el: 'earth', color: '#ef5c94', dates: 'Aug 23 – Sep 22', ruler: 'mercury' },
  { id: 'libra', name: 'Libra', glyph: '♎', el: 'air', color: '#e163d6', dates: 'Sep 23 – Oct 22', ruler: 'venus' },
  { id: 'scorpio', name: 'Scorpio', glyph: '♏', el: 'water', color: '#e23d66', dates: 'Oct 23 – Nov 21', ruler: 'pluto' },
  { id: 'sagittarius', name: 'Sagittarius', glyph: '♐', el: 'fire', color: '#a35cf0', dates: 'Nov 22 – Dec 21', ruler: 'jupiter' },
  { id: 'capricorn', name: 'Capricorn', glyph: '♑', el: 'earth', color: '#2fc79a', dates: 'Dec 22 – Jan 19', ruler: 'saturn' },
  { id: 'aquarius', name: 'Aquarius', glyph: '♒', el: 'air', color: '#38c4ec', dates: 'Jan 20 – Feb 18', ruler: 'uranus' },
  { id: 'pisces', name: 'Pisces', glyph: '♓', el: 'water', color: '#7c74f0', dates: 'Feb 19 – Mar 20', ruler: 'neptune' },
]
/** a sign by id, name or index (null if none) */
export const sign = s => s == null ? null : typeof s === 'number' ? SIGNS[((s % 12) + 12) % 12] : SIGNS.find(x => x.id === String(s).toLowerCase() || x.name.toLowerCase() === String(s).toLowerCase()) || null
export const PLANETS = {
  sun: { name: 'Sun', glyph: '☉', color: '#f7c948' }, moon: { name: 'Moon', glyph: '☽', color: '#dcd6ff' },
  mercury: { name: 'Mercury', glyph: '☿', color: '#9fe0d0' }, venus: { name: 'Venus', glyph: '♀', color: '#ff9cc2' },
  mars: { name: 'Mars', glyph: '♂', color: '#ff6a4a' }, jupiter: { name: 'Jupiter', glyph: '♃', color: '#f0b46a' },
  saturn: { name: 'Saturn', glyph: '♄', color: '#e9d08a' }, uranus: { name: 'Uranus', glyph: 'uranus', color: '#7fe3f0' },
  neptune: { name: 'Neptune', glyph: 'neptune', color: '#6f8cff' }, pluto: { name: 'Pluto', glyph: 'pluto', color: '#c58cff' },
  earth: { name: 'Earth', glyph: 'earth', color: '#5fb0ff' },
}
/** any colour word a script may use → hex: palette names, sign ids, element names, planet ids, or a hex */
export function color(c, fallback = GOLD) {
  if (!c) return fallback
  if (c[0] === '#') return c
  const k = String(c).toLowerCase()
  const NAMED = { bone: BONE, gold: GOLD, pink: PINK, rose: ROSE, blue: BLUE, violet: VIOLET, purple: VIOLET, red: RED, green: GREEN, orange: ORANGE, teal: TEAL, muted: MUTED, push: READING.push, pull: READING.pull, align: READING.align, white: '#fff6ec' }
  return NAMED[k] || ELEMENT_COLOR[k] || sign(k)?.color || PLANETS[k]?.color || fallback
}
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

// ───────────────────────── easing
/** springy overshoot ease (0→1, overshoots ~10%) */
export const easeOutBack = (x, s = 1.9) => { x = clamp(x); const c = s + 1; return 1 + c * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2) }
/** pop-in scale at time t for something landing at t0 */
export const pop01 = (t, t0, d = 0.32, s = 1.9) => t < t0 ? 0 : easeOutBack(prog(t, t0, t0 + d), s)
/** pop-out: a little swell, then shrink to 0 over [a, b] */
export const popOut = (t, a, b) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
/** a decaying wobble after t0 (for squash, tilt, bounce) */
export const wob = (t, t0, f = 16, d = 4) => t < t0 ? 0 : Math.sin((t - t0) * f) * Math.exp(-(t - t0) * d)
/** when item i of n appears inside a beat of length dur: spread across [from, to] of the beat (fractions) */
export const stagger = (i, n, dur, from = 0.12, to = 0.62) => n <= 1 ? dur * from : dur * lerp(from, to, i / (n - 1))

// ───────────────────────── ink
/** fill the current path at fa, then stroke it thick with a glow (the house line-art look) */
export function ink(x, col, { w = 8, fa = 0.3, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}
/** stroke only (no fill) with glow */
export const line = (x, col, w = 7, glow = 14) => ink(x, col, { w, fa: 0, glow })
export function rr(x, px, py, w, h, r) { x.beginPath(); x.roundRect(px, py, w, h, r) }
/** a dark glass panel with a coloured neon edge (cards, boards, phone screens) */
export function panel(x, px, py, w, h, { r = 28, col = PINK, bg = 'rgba(16,10,40,0.88)', w: lw = 6, glow = 24 } = {}) {
  x.save()
  x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 40; x.shadowOffsetY = 14
  rr(x, px, py, w, h, r); x.fillStyle = bg; x.fill()
  x.shadowOffsetY = 0
  rr(x, px, py, w, h, r); ink(x, col, { w: lw, fa: 0, glow })
  x.restore()
}

// ───────────────────────── type
let FONT_OK = true
export function setFontOk(v) { FONT_OK = v }
export function font(size, { weight = 800, family = 'inter', italic = false } = {}) {
  const fam = family === 'serif' ? SERIF : family === 'mono' ? MONO : INTER
  return `${italic ? 'italic ' : ''}${weight} ${Math.round(size)}px ${fam}`
}
const SHADOW = 'rgba(6,4,18,0.9)'
/** a text label. opts: size, weight, family ('inter'|'serif'|'mono'), italic, color, align, base, spacing (em), maxW, shadow, alpha */
export function label(x, text, px, py, { size = 44, weight = 700, family = 'inter', italic = false, color: col = BONE, align = 'center', base = 'middle', spacing = 0, maxW = 0, shadow = true, alpha = 1, glow = 0 } = {}) {
  if (!text || alpha <= 0) return 0
  x.save(); x.globalAlpha *= alpha
  let sz = size
  x.font = font(sz, { weight, family, italic })
  if (spacing) x.letterSpacing = `${spacing * sz}px`
  let w = x.measureText(text).width
  if (maxW && w > maxW) { sz = sz * maxW / w; x.font = font(sz, { weight, family, italic }); if (spacing) x.letterSpacing = `${spacing * sz}px`; w = maxW }
  x.textAlign = align; x.textBaseline = base
  if (shadow) { x.shadowColor = SHADOW; x.shadowBlur = 18 }
  if (glow) { x.shadowColor = col; x.shadowBlur = glow }
  x.fillStyle = col; x.fillText(text, px, py)
  x.restore()
  return w
}
/** wrap text into lines that fit maxW at the current font */
export function wrap(x, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let cur = ''
    for (const w of para.split(/\s+/).filter(Boolean)) {
      const t = cur ? cur + ' ' + w : w
      if (x.measureText(t).width > maxW && cur) { out.push(cur); cur = w } else cur = t
    }
    if (cur) out.push(cur)
  }
  return out
}
/** multi-line centred text block; returns its height */
export function para(x, text, px, py, { size = 44, weight = 700, color: col = BONE, maxW = 800, lh = 1.18, align = 'center', family = 'inter', italic = false, alpha = 1, shadow = true } = {}) {
  x.save(); x.font = font(size, { weight, family, italic })
  const ls = wrap(x, text, maxW)
  x.restore()
  const h = ls.length * size * lh
  ls.forEach((l, i) => label(x, l, px, py - h / 2 + size * lh * (i + 0.5), { size, weight, color: col, align, family, italic, alpha, shadow }))
  return h
}
/** a rounded pill with text (chips, stamps, options). Returns its width. */
export function pill(x, text, px, py, { size = 38, fg = BONE, col = GOLD, bg = 'rgba(16,10,40,0.9)', weight = 800, family = 'inter', padX = 0.7, h = 1.9, lw = 5, glow = 16, alpha = 1, fillA = 0, align = 'center' } = {}) {
  if (alpha <= 0) return 0
  x.save(); x.globalAlpha *= alpha
  x.font = font(size, { weight, family })
  const tw = x.measureText(text).width, w = tw + size * padX * 2, hh = size * h
  const left = align === 'left' ? px : align === 'right' ? px - w : px - w / 2
  rr(x, left, py - hh / 2, w, hh, hh / 2); x.fillStyle = bg; x.fill()
  rr(x, left, py - hh / 2, w, hh, hh / 2); ink(x, col, { w: lw, fa: fillA, glow })
  x.restore()
  label(x, text, left + w / 2, py + size * 0.04, { size, weight, family, color: fg, alpha, shadow: false })
  return w
}

// ───────────────────────── glyphs (sign + planet symbols from glyphs.json path data; a few drawn by hand)
let GLYPHS = {}
export function setGlyphs(g) { GLYPHS = g || {} }
const pathCache = new Map()
/** draw a sign or planet glyph ('♈'…'♓', '♀', '♂', '☉', '☽', '☿', '♃', '♄', '✦', or 'uranus' | 'neptune' | 'pluto' | 'earth'),
 *  or a sign/planet id ('leo', 'venus'). size ≈ the glyph's height in px. */
export function glyph(x, g, px, py, size, col = GOLD, { glow = 22, fill = true, lw = 0, alpha = 1 } = {}) {
  if (alpha <= 0 || size <= 0) return
  if (sign(g)) g = sign(g).glyph
  else if (PLANETS[g]) g = PLANETS[g].glyph
  x.save(); x.globalAlpha *= alpha; x.translate(px, py)
  const hand = HAND[g]
  if (hand) { hand(x, size, col, glow); x.restore(); return }
  const d = GLYPHS[g]
  if (!d) { label(x, g, 0, 0, { size, color: col, family: 'serif' }); x.restore(); return }
  let p = pathCache.get(g)
  if (!p) { p = new Path2D(d.d); pathCache.set(g, p) }
  const s = size / (d.h || 760)
  x.scale(s, s)
  x.shadowColor = col; x.shadowBlur = glow / s
  x.fillStyle = col
  if (fill) x.fill(p)
  if (lw) { x.strokeStyle = col; x.lineWidth = lw / s; x.stroke(p) }
  x.restore()
}
const HAND = {
  // ♅ Uranus (H with a circle), ♆ Neptune (trident), ♇ Pluto (circle over cup over cross), Earth (circled cross)
  uranus(x, s, c, g) { const k = s / 100; x.lineWidth = 9 * k; x.strokeStyle = c; x.shadowColor = c; x.shadowBlur = g; x.lineCap = 'round'
    x.beginPath(); x.moveTo(-28 * k, -40 * k); x.lineTo(-28 * k, 10 * k); x.moveTo(28 * k, -40 * k); x.lineTo(28 * k, 10 * k); x.moveTo(-28 * k, -15 * k); x.lineTo(28 * k, -15 * k); x.moveTo(0, -48 * k); x.lineTo(0, 22 * k); x.stroke()
    x.beginPath(); x.arc(0, 36 * k, 13 * k, 0, TAU); x.stroke() },
  neptune(x, s, c, g) { const k = s / 100; x.lineWidth = 9 * k; x.strokeStyle = c; x.shadowColor = c; x.shadowBlur = g; x.lineCap = 'round'
    x.beginPath(); x.moveTo(-32 * k, -42 * k); x.quadraticCurveTo(-32 * k, 8 * k, 0, 8 * k); x.quadraticCurveTo(32 * k, 8 * k, 32 * k, -42 * k); x.moveTo(0, -48 * k); x.lineTo(0, 48 * k); x.moveTo(-20 * k, 30 * k); x.lineTo(20 * k, 30 * k); x.stroke() },
  pluto(x, s, c, g) { const k = s / 100; x.lineWidth = 9 * k; x.strokeStyle = c; x.shadowColor = c; x.shadowBlur = g; x.lineCap = 'round'
    x.beginPath(); x.arc(0, -30 * k, 14 * k, 0, TAU); x.stroke()
    x.beginPath(); x.arc(0, -26 * k, 30 * k, 0.1, Math.PI - 0.1); x.moveTo(0, 4 * k); x.lineTo(0, 48 * k); x.moveTo(-18 * k, 28 * k); x.lineTo(18 * k, 28 * k); x.stroke() },
  earth(x, s, c, g) { const k = s / 100; x.lineWidth = 9 * k; x.strokeStyle = c; x.shadowColor = c; x.shadowBlur = g
    x.beginPath(); x.arc(0, 0, 40 * k, 0, TAU); x.moveTo(-40 * k, 0); x.lineTo(40 * k, 0); x.moveTo(0, -40 * k); x.lineTo(0, 40 * k); x.stroke() },
}

// ───────────────────────── sparkles
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
/** a pixel-star sparkle burst fired at t0 (t = the same clock) */
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
/** a few pixel stars twinkling in place around a point (ambient) */
export function twinkles(x, px, py, t, { n = 6, R = 220, seed = 3, size = 22 } = {}) {
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = r() * TAU, d = R * (0.5 + 0.5 * r()), ph = r() * 10, col = SPARK[Math.floor(r() * SPARK.length)]
    x.globalAlpha = 0.35 + 0.65 * Math.max(0, Math.sin(t * (1.5 + r() * 2) + ph))
    drawPixelStar(x, px + Math.cos(a) * d, py + Math.sin(a) * d, size, Math.floor(r() * 3), col)
  }
  x.restore()
}

// ───────────────────────── shapes
export function heartPath(x, cx, cy, s) {
  const k = s / 60
  x.beginPath(); x.moveTo(cx, cy + 42 * k)
  x.bezierCurveTo(cx - 70 * k, cy - 6 * k, cx - 46 * k, cy - 62 * k, cx, cy - 26 * k)
  x.bezierCurveTo(cx + 46 * k, cy - 62 * k, cx + 70 * k, cy - 6 * k, cx, cy + 42 * k)
  x.closePath()
}
/** a plump glowing heart, s ≈ half-width */
export function heart(x, cx, cy, s, col = PINK, { fa = 0.6, w = 8, alpha = 1 } = {}) {
  if (s <= 0 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; heartPath(x, cx, cy, s); ink(x, col, { w, fa, glow: 26 }); x.restore()
}
export function starPath(x, cx, cy, R, r = R * 0.45, n = 5, rot = -Math.PI / 2) {
  x.beginPath()
  for (let i = 0; i < n * 2; i++) { const a = rot + (i * Math.PI) / n, d = i % 2 ? r : R; i ? x.lineTo(cx + Math.cos(a) * d, cy + Math.sin(a) * d) : x.moveTo(cx + Math.cos(a) * d, cy + Math.sin(a) * d) }
  x.closePath()
}
export function arrow(x, x0, y0, x1, y1, col = BONE, w = 7) {
  const a = Math.atan2(y1 - y0, x1 - x0), h = w * 3.2
  x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1)
  x.moveTo(x1 - Math.cos(a - 0.5) * h, y1 - Math.sin(a - 0.5) * h); x.lineTo(x1, y1); x.lineTo(x1 - Math.cos(a + 0.5) * h, y1 - Math.sin(a + 0.5) * h)
  line(x, col, w, 12)
}

// ───────────────────────── pictogram person (feet at px,py; about 270·s tall). No face, ever.
// pose: stand | wave | shrug | phone | sad | cheer | walk | sit | think | point
// opts: sign (glyph floating over the head), t (for idle motion), a (alpha), lean, flip, prop ('umbrella'|'coffee'|'taco'|'flower'|'suitcase'|'phone'|'heart'|'hat')
export function person(x, px, py, s, col = BONE, { pose = 'stand', t = 0, a = 1, lean = 0, flip = false, sign: sg = null, signCol = null, prop = null, seed = 0, bob = true } = {}) {
  if (a <= 0 || s <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(px, py); x.scale(flip ? -s : s, s)
  const ph = t * 2.2 + seed * 1.7
  const by = bob ? Math.sin(ph) * 3 : 0
  x.rotate(lean + (pose === 'walk' ? Math.sin(ph * 2) * 0.03 : 0))
  if (pose === 'sit') x.translate(0, 70)
  const headY = (pose === 'sad' ? -226 : -238) + by
  const arm = (sx, sy, ex, ey, hx, hy) => { x.beginPath(); x.moveTo(sx, sy); x.quadraticCurveTo(ex, ey, hx, hy); line(x, col, 16, 14) }
  // arms behind the body for some poses
  const sh = -160 + by
  if (pose === 'wave') { const w = Math.sin(t * 9) * 12; arm(40, sh, 92, sh - 40, 86 + w, sh - 112) }
  if (pose === 'cheer') { arm(-40, sh, -96, sh - 50, -84, sh - 120 - Math.abs(Math.sin(t * 6)) * 10); arm(40, sh, 96, sh - 50, 84, sh - 120 - Math.abs(Math.sin(t * 6 + 1)) * 10) }
  if (pose === 'shrug') { arm(-40, sh, -100, sh + 10, -96, sh - 50); arm(40, sh, 100, sh + 10, 96, sh - 50) }
  if (pose === 'point') arm(40, sh, 110, sh - 20, 150, sh - 40)
  if (pose === 'phone' || pose === 'think') arm(36, sh, 70, sh + 60, 30, sh - (pose === 'think' ? 40 : 20))
  // body
  x.beginPath()
  if (pose === 'sit') { x.moveTo(-50, -70); x.lineTo(-44, -150); x.quadraticCurveTo(-44, -190, 0, -192); x.quadraticCurveTo(44, -190, 44, -150); x.lineTo(50, -70); x.quadraticCurveTo(0, -60, -50, -70) }
  else { x.moveTo(-50, 0); x.lineTo(-44, -150 + by * 0.5); x.quadraticCurveTo(-44, -190 + by, 0, -192 + by); x.quadraticCurveTo(44, -190 + by, 44, -150 + by * 0.5); x.lineTo(50, 0) }
  x.closePath()
  ink(x, col, { w: 9, fa: 0.38, glow: 20 })
  if (pose === 'walk') { const sw = Math.sin(ph * 2) * 18; x.beginPath(); x.moveTo(-20, 0); x.lineTo(-20 - sw, 14); x.moveTo(20, 0); x.lineTo(20 + sw, 14); line(x, col, 10, 8) }
  // head
  x.beginPath(); x.arc(pose === 'sad' ? 6 : 0, headY, 38, 0, TAU); ink(x, col, { w: 9, fa: 0.85, glow: 20 })
  if (pose === 'phone') { x.save(); x.translate(34, sh - 26); x.rotate(-0.3); rr(x, -16, -28, 32, 54, 7); ink(x, BLUE, { w: 5, fa: 0.6, glow: 22 }); x.restore() }
  if (prop) drawProp(x, prop, col, t, by)
  x.restore()
  if (sg) {
    const S = sign(sg)
    const gc = signCol || S?.color || GOLD
    const gy = py + (headY - 74 + Math.sin(ph * 1.3) * 6) * s
    x.save(); x.globalAlpha *= a
    x.beginPath(); x.arc(px, gy, 40 * s, 0, TAU); x.fillStyle = rgba(gc, 0.16); x.fill()
    x.restore()
    glyph(x, sg, px, gy, 52 * s, gc, { alpha: a })
  }
}
function drawProp(x, p, col, t, by) {
  const sh = -160 + by
  x.save()
  if (p === 'umbrella') { x.beginPath(); x.moveTo(-70, sh - 10); x.lineTo(-70, sh - 150); line(x, BONE, 7, 6); x.beginPath(); x.arc(-70, sh - 150, 95, Math.PI, 0); x.quadraticCurveTo(-70, sh - 170, -165, sh - 150); ink(x, BLUE, { w: 7, fa: 0.45, glow: 18 }) }
  else if (p === 'coffee') { rr(x, 70, sh - 30, 44, 52, 8); ink(x, ORANGE, { w: 6, fa: 0.5, glow: 14 }) }
  else if (p === 'phone') { x.translate(78, sh - 10); x.rotate(-0.2); rr(x, -18, -30, 36, 60, 8); ink(x, BLUE, { w: 5, fa: 0.6, glow: 22 }) }
  else if (p === 'flower') { x.beginPath(); x.moveTo(84, sh + 10); x.lineTo(90, sh - 70); line(x, GREEN, 6, 8); for (let i = 0; i < 5; i++) { const a = (i / 5) * TAU + t; x.beginPath(); x.arc(90 + Math.cos(a) * 16, sh - 80 + Math.sin(a) * 16, 12, 0, TAU); ink(x, PINK, { w: 4, fa: 0.7, glow: 12 }) } }
  else if (p === 'suitcase') { rr(x, 62, -110, 70, 100, 12); ink(x, GOLD, { w: 6, fa: 0.4, glow: 14 }); x.beginPath(); x.moveTo(82, -110); x.lineTo(82, -130); x.lineTo(112, -130); x.lineTo(112, -110); line(x, GOLD, 6, 8) }
  else if (p === 'heart') heart(x, 92, sh - 30, 30, PINK)
  else if (p === 'taco') { x.beginPath(); x.ellipse(96, sh - 16, 42, 30, 0, Math.PI, 0); x.closePath(); ink(x, GOLD, { w: 6, fa: 0.5, glow: 16 }) }
  else if (p === 'hat') { x.beginPath(); x.ellipse(0, -262, 78, 16, 0, 0, TAU); ink(x, EARTH, { w: 6, fa: 0.6, glow: 12 }); x.beginPath(); x.moveTo(-40, -266); x.quadraticCurveTo(-34, -318, 0, -310); x.quadraticCurveTo(34, -318, 40, -266); ink(x, EARTH, { w: 6, fa: 0.6, glow: 12 }) }
  x.restore()
}

// ───────────────────────── chat bubble (speech or thought), centred at px,py. side: 'l' | 'r' | 'c' (tail)
export function bubble(x, text, px, py, { size = 40, col = BONE, bg = 'rgba(16,10,40,0.92)', side = 'c', maxW = 640, alpha = 1, scale = 1, think = false, fg = BONE, weight = 700, family = 'inter', italic = false } = {}) {
  if (alpha <= 0 || scale <= 0) return { w: 0, h: 0 }
  x.save(); x.globalAlpha *= alpha; x.translate(px, py); x.scale(scale, scale)
  x.font = font(size, { weight, family, italic })
  const ls = wrap(x, text, maxW)
  const tw = Math.max(...ls.map(l => x.measureText(l).width)), lh = size * 1.22
  const w = tw + size * 1.3, h = ls.length * lh + size * 0.8
  if (think) {
    rr(x, -w / 2, -h / 2, w, h, h / 2.2); x.fillStyle = bg; x.fill(); rr(x, -w / 2, -h / 2, w, h, h / 2.2); ink(x, col, { w: 5, fa: 0, glow: 14 })
    for (const [dx, dy, r] of [[-w * 0.25, h / 2 + 18, 12], [-w * 0.32, h / 2 + 44, 7]]) { x.beginPath(); x.arc(dx, dy, r, 0, TAU); x.fillStyle = bg; x.fill(); ink(x, col, { w: 4, fa: 0, glow: 10 }) }
  } else {
    rr(x, -w / 2, -h / 2, w, h, Math.min(38, h / 2)); x.fillStyle = bg; x.fill()
    if (side !== 'c') { const sx = side === 'l' ? -w / 2 + 34 : w / 2 - 34; x.beginPath(); x.moveTo(sx - 16, h / 2 - 4); x.lineTo(sx + (side === 'l' ? -22 : 22), h / 2 + 26); x.lineTo(sx + 16, h / 2 - 4); x.fillStyle = bg; x.fill() }
    rr(x, -w / 2, -h / 2, w, h, Math.min(38, h / 2)); ink(x, col, { w: 5, fa: 0.08, glow: 14 })
  }
  ls.forEach((l, i) => label(x, l, 0, -h / 2 + size * 0.4 + lh * (i + 0.5), { size, weight, color: fg, shadow: false, family, italic }))
  x.restore()
  return { w: w * scale, h: h * scale }
}

/** a little bouncing "…" typing indicator */
export function typingDots(x, px, py, t, { col = BONE, s = 1, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  rr(x, px - 62 * s, py - 32 * s, 124 * s, 64 * s, 32 * s); x.fillStyle = 'rgba(16,10,40,0.92)'; x.fill(); ink(x, col, { w: 4, fa: 0, glow: 10 })
  for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(px + (i - 1) * 30 * s, py - Math.max(0, Math.sin(t * 8 - i * 0.9)) * 9 * s, 9 * s, 0, TAU); x.fillStyle = col; x.fill() }
  x.restore()
}

/** Align's card back (the gold-edged indigo back with the seed-of-life-style rosette), centred, w wide (h = 1.4w) */
export function cardBack(x, cx, cy, w, { rot = 0, alpha = 1, glow = 0, col = GOLD, t = 0 } = {}) {
  if (alpha <= 0 || w <= 0) return
  const h = w * 1.4
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.shadowColor = glow ? col : 'rgba(0,0,0,0.5)'; x.shadowBlur = glow ? 40 * glow : 30
  rr(x, -w / 2, -h / 2, w, h, w * 0.08); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1a5e'); g.addColorStop(1, '#160d36'); x.fillStyle = g; x.fill()
  x.shadowBlur = 0
  rr(x, -w / 2, -h / 2, w, h, w * 0.08); line(x, col, Math.max(3, w * 0.025), 10)
  rr(x, -w / 2 + w * 0.07, -h / 2 + w * 0.07, w * 0.86, h - w * 0.14, w * 0.05); x.strokeStyle = rgba(col, 0.45); x.lineWidth = Math.max(1.5, w * 0.008); x.stroke()
  const R = w * 0.14
  x.strokeStyle = rgba(col, 0.85); x.lineWidth = Math.max(2, w * 0.012)
  x.beginPath(); x.arc(0, 0, R, 0, TAU); x.stroke()
  for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU + t * 0.2; x.beginPath(); x.arc(Math.cos(a) * R, Math.sin(a) * R, R, 0, TAU); x.stroke() }
  x.beginPath(); x.arc(0, 0, R * 2, 0, TAU); x.stroke()
  x.restore()
}

/** an aura veil: soft colour blobs breathing inside a rounded rect (the mystery card's hidden photo) */
export function aura(x, px, py, w, h, t, cols = ['#b45cff', '#ff8fb1', '#f2c75c', '#8fd8f6'], { r = 24, seed = 1 } = {}) {
  x.save()
  rr(x, px, py, w, h, r); x.clip()
  x.fillStyle = '#1b0f3e'; x.fillRect(px, py, w, h)
  const R = rng(seed)
  x.globalCompositeOperation = 'lighter'
  cols.forEach((c, i) => {
    const ox = px + w * (0.3 + 0.4 * R()) + Math.sin(t * (0.6 + R()) + i) * w * 0.18
    const oy = py + h * (0.3 + 0.4 * R()) + Math.cos(t * (0.5 + R()) + i * 2) * h * 0.16
    const rad = Math.max(w, h) * (0.45 + 0.15 * Math.sin(t * 0.8 + i))
    const g = x.createRadialGradient(ox, oy, 0, ox, oy, rad)
    g.addColorStop(0, rgba(c, 0.75)); g.addColorStop(1, rgba(c, 0))
    x.fillStyle = g; x.fillRect(px, py, w, h)
  })
  x.globalCompositeOperation = 'source-over'
  // the silhouette behind the veil (no face)
  x.globalAlpha = 0.28
  x.beginPath(); x.arc(px + w / 2, py + h * 0.42, w * 0.16, 0, TAU); x.moveTo(px + w * 0.22, py + h); x.quadraticCurveTo(px + w * 0.25, py + h * 0.62, px + w / 2, py + h * 0.6); x.quadraticCurveTo(px + w * 0.75, py + h * 0.62, px + w * 0.78, py + h)
  x.fillStyle = '#fff3e0'; x.fill()
  x.restore()
}
