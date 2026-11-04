// globekit: the shared look of "Remix: Snow Globe Cities" episodes 15–28 (nsge15–nsge28, promo/films/next30/b17.md).
// Each city is a snow globe on a dark shelf; one sign looks for love inside it. THE STARS float outside the glass and talk
// to them; Pisces presses their face to the glass and cries. Films import this module and describe only their own story:
//
//   export const { DURATION, SCENES, CUES } = globeFilm(spec)
//
// spec (all times in seconds; the story runs 0 → DURATION − 4.4, then the shared end card):
//   id, plate            folder id and the city name engraved on the base
//   sky: { top, bot, glow }   the night inside the glass (glow = a soft horizon light colour)
//   snowTint             flake colour (default near-white)
//   shakes: [t…]         globe shakes (each one wobbles the globe and swirls the snow; put one just before 0 so frame 0 is mid-shake)
//   settle               false = the snow never settles (the finale)
//   snowAlpha(t)         optional 0–1 multiplier on the falling snow (e.g. an indoor scene)
//   skyline(x, t, K)     the city, drawn inside the glass behind the snow ground
//   back / front (x, t, K)    props inside the glass, behind / in front of the cast
//   over(x, t, K)        anything outside the glass (cards, chips), drawn on top of the globe
//   cast(t, K) → [{ sign | color, x, y, s, mood, look, hops, pop, alpha, tears, seed, glyph }]   drawn inside the glass
//   stars(t, K) → { x, y, s, mood, look, pop } | null        THE STARS (gold narrator), outside the glass
//   pisces(t, K) → { x, y, s, mood, look, pop, tears } | null   the crier at the glass
//   cam(t) → { s, x, y }  optional camera on the whole canvas (scale about (x, y))
//   shelf(x, t, K)       optional extra drawing in camera space (other globes on the shelf)
//   heads: [{ text, at, out: [a, b], late, lateAt, top, size, accentSize, accentColor }]
//   boxes: [{ lines: [{ t, who: 'lead' | 'partner' | 'stars', text }], open, close }]
//   lead, partner        sign ids (for the dialogue name tags)
//   cuts                 cardfx candidates (the middle one plays)
//   music: { style, key, seed, drop, breakdown, lift, hits }
//   cues                 the film's own sound cues
// K (passed to every drawer): the globe geometry G, images, and the helpers below.
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../src/lib.js'
import { fill, A } from '../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../startalk.js'
import { popText } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', ICE = '#bfe6ff', SNOW = '#f4f8ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
export const TAU = Math.PI * 2
export const G = { cx: 540, cy: 975, R: 392, ground: 1190 }       // the globe (canvas px)
export const BASE = { top: 1318, bot: 1478, wTop: 540, wBot: 660 }
export const BOX_Y = 1562
// the whole picture is drawn in design space and shown 1.1× about the shelf (a bigger globe), nudged down 50 px
export const VIEW = { s: 1.1, x: 540, y: 1478, dy: 50 }

// ── small helpers
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
export const inR = (t, a, b) => t >= a && t < b
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
export const mixHex = (a, b, k) => { const A1 = hexToRgb(a), B1 = hexToRgb(b); return '#' + A1.map((v, i) => Math.round(lerp(v, B1[i], clamp(k))).toString(16).padStart(2, '0')).join('') }
export const walk = (t, keys) => {        // piecewise eased path: [[t, x, y], …] → [x, y]
  if (t <= keys[0][0]) return [keys[0][1], keys[0][2]]
  for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const a = keys[i - 1], b = keys[i], k = ease.inOutCubic(prog(t, a[0], b[0])); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k)] }
  const l = keys[keys.length - 1]; return [l[1], l[2]]
}

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export const heart = (x, cx, cy, cell, col = '#ff4f86', o = {}) => drawBits(x, HEART, { H: col }, cx, cy, cell, o)

/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

/** a mono chip (label) */
export function chip(x, px, py, text, k, { size = 28, col = BONE, bar = GOLD, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const tw = x.measureText(text).width + 32, th = size + 22
  x.fillStyle = INK; x.fillRect(-tw / 2 - 4, -th / 2 - 4, tw + 8, th + 8)
  x.fillStyle = 'rgba(20,12,44,0.97)'; x.fillRect(-tw / 2, -th / 2, tw, th); x.fillStyle = bar; x.fillRect(-tw / 2, th / 2 - 5, tw, 5)
  x.fillStyle = col; x.fillText(text, 0, 2)
  x.restore()
}
/** a pixel speech bubble with a tail (tail: -1 left, 0 centre, 1 right) */
export function bubble(x, cx, cy, text, k, { size = 30, col = BONE, ink = INK, tail = 0, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `700 ${size}px ${INTER}`
  const w = x.measureText(text).width + 40, h = size + 30
  x.fillStyle = ink; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 30)
  x.fillStyle = ink; x.fillRect(tx - 12, h / 2 + 4, 12, 12); x.fillStyle = col; x.fillRect(tx - 8, h / 2, 8, 10)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** a card image (talk card / card back) at (cx, cy), width w, with a soft drop shadow */
export function drawCard(x, img, cx, cy, w, rot = 0, alpha = 1) {
  if (!img || w <= 1 || alpha <= 0) return
  const h = w * img.height / img.width
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 14, -h / 2 + 18, w, h)
  x.drawImage(img, -w / 2, -h / 2, w, h)
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops and squash
const SG = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / SG)) : s / SG
  const S = cell * SG
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** a star character, plus tears and an optional knit hat (winter!) */
export function drawChar(x, t, c) {
  const sg = c.sign ? signStar(c.sign) : null
  const opts = { color: c.color || (sg ? sg.color : STAR.sky), glyph: c.glyph === false ? null : (c.glyph || (sg ? sg.glyph : null)), mood: c.mood || 'neutral', look: c.look, hops: c.hops, pop: c.pop ?? 1, alpha: c.alpha ?? 1, seed: c.seed ?? 3, glow: c.glow ?? 1, blink: c.blink, squash: c.squash || 0, bob: c.bob }
  if ((opts.pop <= 0.01) || opts.alpha <= 0.01) return null
  drawStarChar(x, c.x, c.y, c.s, t, opts)
  const F = starFrame(c.x, c.y, c.s, t, opts)
  if (c.hat) inSprite(x, F, () => hatCells(x, c.hat))
  if (c.tears) inSprite(x, F, () => tearsCells(x, t, c.tears))
  return F
}
/** a knit bobble hat seated on the top point of the sprite (cells) */
export function hatCells(x, col) {
  const dark = mixHex(col, '#1b1236', 0.35)
  x.fillStyle = INK; x.fillRect(12.4, 3.6, 11.2, 5.2); x.fillRect(15.4, -0.4, 5.2, 4.6)
  x.fillStyle = col; x.fillRect(13, 4.2, 10, 3.8); x.fillStyle = dark; for (let i = 0; i < 5; i++) x.fillRect(13.4 + i * 2, 4.2, 0.8, 3.8)
  x.fillStyle = BONE; x.fillRect(16, 0.2, 4, 3.6); x.fillStyle = '#ffffff'; x.fillRect(16.4, 0.6, 1.4, 1.2)
}

// ── the globe pieces
/** the glass: rim, highlights (drawn after the inside) */
function drawGlass(x, t) {
  const { cx, cy, R } = G
  x.save()
  x.lineWidth = 10; x.strokeStyle = INK; x.beginPath(); x.arc(cx, cy, R + 4, 0, TAU); x.stroke()
  x.lineWidth = 5; x.strokeStyle = 'rgba(220,240,255,0.55)'; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.stroke()
  // a broad soft sheen on the upper left + a crisp highlight arc
  const g = x.createRadialGradient(cx - R * 0.45, cy - R * 0.5, 0, cx - R * 0.45, cy - R * 0.5, R * 0.9)
  g.addColorStop(0, 'rgba(255,255,255,0.13)'); g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill()
  x.lineCap = 'round'
  x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = 12; x.beginPath(); x.arc(cx, cy, R - 34, Math.PI * 1.08, Math.PI * 1.32); x.stroke()
  x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy, R - 34, Math.PI * 1.38, Math.PI * 1.44); x.stroke()
  x.strokeStyle = 'rgba(255,255,255,0.18)'; x.lineWidth = 6; x.beginPath(); x.arc(cx, cy, R - 26, Math.PI * 0.05, Math.PI * 0.32); x.stroke()
  // a glint that slides across once in a while
  const ph = (t * 0.16) % 1
  if (ph < 0.25) { const a = Math.sin(Math.PI * ph / 0.25); x.strokeStyle = `rgba(255,255,255,${0.35 * a})`; x.lineWidth = 7; x.beginPath(); x.arc(cx, cy, R - 14, Math.PI * (1.0 + ph * 2), Math.PI * (1.12 + ph * 2)); x.stroke() }
  x.restore()
}
/** the base: a wooden plinth with a brass plate */
function drawBase(x, t, plate) {
  const { top, bot, wTop, wBot } = BASE, cx = G.cx
  x.save()
  // collar under the glass
  x.fillStyle = INK; x.fillRect(cx - 230, top - 26, 460, 40)
  x.fillStyle = '#6b3d2a'; x.fillRect(cx - 224, top - 20, 448, 30); x.fillStyle = '#8c5638'; x.fillRect(cx - 224, top - 20, 448, 8)
  // plinth (trapezoid)
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - wTop / 2 - 6, top); x.lineTo(cx + wTop / 2 + 6, top); x.lineTo(cx + wBot / 2 + 6, bot + 6); x.lineTo(cx - wBot / 2 - 6, bot + 6); x.closePath(); x.fill()
  const g = x.createLinearGradient(0, top, 0, bot); g.addColorStop(0, '#7a4630'); g.addColorStop(1, '#4a2819')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - wTop / 2, top + 4); x.lineTo(cx + wTop / 2, top + 4); x.lineTo(cx + wBot / 2, bot); x.lineTo(cx - wBot / 2, bot); x.closePath(); x.fill()
  x.fillStyle = 'rgba(255,220,180,0.12)'; for (let i = 0; i < 4; i++) x.fillRect(cx - wTop / 2 + 30, top + 26 + i * 34, wTop - 60 + i * 30, 3)
  // brass plate
  const pw = 380, ph = 70, py = (top + bot) / 2 + 6
  x.fillStyle = INK; x.fillRect(cx - pw / 2 - 5, py - ph / 2 - 5, pw + 10, ph + 10)
  const pg = x.createLinearGradient(0, py - ph / 2, 0, py + ph / 2); pg.addColorStop(0, '#f6d77e'); pg.addColorStop(1, '#b8892f')
  x.fillStyle = pg; x.fillRect(cx - pw / 2, py - ph / 2, pw, ph)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(cx - pw / 2, py - ph / 2, pw, 6)
  x.font = `700 ${plate.length > 12 ? 30 : 36}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#3a2410'
  x.fillText(plate.toUpperCase(), cx, py + 2)
  x.restore()
}
/** the shelf the globe sits on */
function drawShelf(x) {
  x.fillStyle = '#120c26'; x.fillRect(0, BASE.bot, 1080, 40)
  x.fillStyle = '#2a1d4a'; x.fillRect(0, BASE.bot, 1080, 8)
  x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, BASE.bot + 40, 1080, 20)
}

// the snow: a pure f(t) of the shakes. Between shakes it falls and settles; a shake lifts it into a swirl.
const FLAKES = (() => { const r = rng(4242); return Array.from({ length: 150 }, () => ({ u: r(), v: r(), sp: 0.35 + r() * 0.5, sz: r() < 0.18 ? 3 : r() < 0.6 ? 2 : 1, ph: r() * TAU, rad: 0.18 + r() * 0.74, om: (0.8 + r() * 1.4) * (r() < 0.5 ? -1 : 1) })) })()
export function swirlAt(t, shakes, settle = true) {
  let e = settle ? 0 : 0.35
  for (const s of shakes) { const d = t - s; if (d < 0) continue; e += (d < 0.15 ? d / 0.15 : 1) * Math.exp(-(d - 0.15) * 0.55) }
  return clamp(e)
}
function drawSnow(x, t, shakes, settle, tint) {
  const { cx, cy, R } = G
  const E = swirlAt(t, shakes, settle), sm = ease.inOutQuad(E)
  const top = cy - R, span = G.ground - top + 30, A0 = x.globalAlpha
  for (let i = 0; i < FLAKES.length; i++) {
    const f = FLAKES[i]
    const fy = top + ((f.v * span + t * 48 * f.sp) % span), fx = cx - R + f.u * 2 * R + 10 * Math.sin(t * 0.9 + f.ph)
    const a = f.ph + t * f.om * (0.6 + E), rr = f.rad * R
    const ox = cx + Math.cos(a) * rr, oy = cy - 40 + Math.sin(a) * rr * 0.92
    const px = lerp(fx, ox, sm), py = lerp(fy, oy, sm)
    const dx = px - cx, dy = py - cy
    if (dx * dx + dy * dy > (R - 8) * (R - 8) || py > G.ground + 40) continue
    const c = f.sz === 3 ? 7 : f.sz === 2 ? 5 : 3.5
    x.fillStyle = tint; x.globalAlpha = A0 * (f.sz === 1 ? 0.7 : 0.95)
    x.fillRect(Math.round(px - c / 2), Math.round(py - c / 2), c, c)
  }
  x.globalAlpha = A0
}
/** a wobble angle (radians) from the shakes */
export function wobbleAt(t, shakes) {
  let a = 0
  for (const s of shakes) { const d = t - s; if (d < 0 || d > 1.6) continue; a += 0.07 * Math.exp(-d * 3.2) * Math.sin(d * 19) }
  return a
}
function drawInsideSky(x, t, sky) {
  const { cx, cy, R } = G
  const g = x.createLinearGradient(0, cy - R, 0, G.ground)
  g.addColorStop(0, sky.top); g.addColorStop(1, sky.bot)
  x.fillStyle = g; x.fillRect(cx - R, cy - R, 2 * R, 2 * R)
  if (sky.glow) { const hg = x.createRadialGradient(cx, G.ground, 0, cx, G.ground, R * 1.1); hg.addColorStop(0, rgba(sky.glow, 0.32)); hg.addColorStop(1, rgba(sky.glow, 0)); x.fillStyle = hg; x.fillRect(cx - R, cy - R, 2 * R, 2 * R) }
  // a few twinkling pixel stars
  const r = rng(77)
  for (let i = 0; i < 26; i++) {
    const sx = cx - R + r() * 2 * R, sy = cy - R + r() * R * 0.9, tw = 0.5 + 0.5 * Math.sin(t * (1 + r() * 2) + i)
    x.fillStyle = `rgba(255,248,220,${0.25 + 0.5 * tw})`; x.fillRect(Math.round(sx), Math.round(sy), 3, 3)
  }
}
/** the snowy ground inside the glass: a soft mound */
export function drawGround(x, col = '#e9f2ff', shade = '#b9cdea') {
  const { cx, R } = G, gy = G.ground
  x.fillStyle = shade; x.beginPath(); x.ellipse(cx, gy + 140, R * 1.15, 160, 0, Math.PI, TAU); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(cx, gy + 152, R * 1.12, 150, 0, Math.PI, TAU); x.fill()
  x.fillStyle = shade; x.fillRect(cx - R, gy + 150, 2 * R, R)
}

// ── the series bug: a pixel snowflake + "REMIX: SNOW GLOBE CITIES" (Inter 800 small caps, letter-spaced)
const FLAKE_ICON = ['...W...', '.W.W.W.', '..WWW..', 'WWWWWWW', '..WWW..', '.W.W.W.', '...W...']
function buildBug(root, at = -1) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '40px', height: '40px', imageRendering: 'pixelated' }, box)
  ic.width = 40; ic.height = 40
  drawBits(ic.getContext('2d'), FLAKE_ICON, { W: ICE }, 20, 20, 4.4)
  el('div', { font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: ICE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box,
    `REMIX:<span style="color:rgba(255,255,255,0.7);letter-spacing:0.16em"> SNOW GLOBE CITIES</span>`)
  return {
    update(t, out = 1) {
      const k = (t < at ? 0 : 1) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k))
    },
  }
}

// ── the film
const FONTS = ["800 112px Inter", "800 26px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "bold 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 36px 'Space Mono'", "700 28px 'Space Mono'"]
const IMGS = { back: 'card-back.png', talk1: 'card-talk-1.png', talk2: 'card-talk-2.png', talk3: 'card-talk-3.png', talk4: 'card-talk-4.png', talk5: 'card-talk-5.png', talk6: 'card-talk-6.png' }
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

export function globeFilm(spec) {
  const DURATION = spec.duration || 28              // story 25.6 + the 2.4 s short end card (CHANGE 4 Nov)
  const STORY_END = DURATION - ENDCARD_SHORT_LEN
  const LEAD = signStar(spec.lead), PART = spec.partner ? signStar(spec.partner) : null
  const tag = { lead: `${LEAD.glyph}︎ ${spec.lead.toUpperCase()}`, partner: PART ? `${PART.glyph}︎ ${spec.partner.toUpperCase()}` : '', stars: 'THE STARS' }
  const tagCol = { lead: mixHex(LEAD.color, '#ffffff', 0.35), partner: PART ? mixHex(PART.color, '#ffffff', 0.35) : BONE, stars: GOLD }
  const CPS = spec.cps || 28
  const boxes = spec.boxes.map(b => ({ ...b, lines: b.lines.map(L => ({ t: L.t, speaker: tag[L.who], color: tagCol[L.who], text: L.text })) }))
  const allLines = boxes.flatMap(b => b.lines)
  const hopsOf = who => talkHops(allLines, tag[who], { cps: CPS })
  const HOPS = { lead: hopsOf('lead'), partner: PART ? hopsOf('partner') : [], stars: hopsOf('stars') }
  const shakes = spec.shakes || [-0.25]
  const settle = spec.settle !== false

  async function build(stage) {
    try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const img = {}
    await Promise.all(Object.entries(IMGS).map(([k, f]) => new Promise(res => { const i = new Image(); i.onload = () => { img[k] = i; res() }; i.onerror = () => res(); i.src = A + f })))
    const root = fill(stage, { background: '#07051a' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const HEADS = spec.heads.map(h => [popText(root, h.text, { top: h.top ?? 150, size: h.size ?? 96, accentSize: h.accentSize ?? 140, at: h.at, late: h.late ?? 1, lateAt: h.lateAt ?? h.at + 0.35, wobble: true, gap: h.gap ?? 0.08, accentColor: h.accentColor || ICE }), h.out])
    const BOXES = boxes.map(b => dialogueBox(root, { lines: b.lines, y: BOX_Y, width: 960, height: b.height || 270, cps: CPS, open: b.open, close: b.close }))
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const K = { G, BASE, img, HOPS, swirl: t => swirlAt(t, shakes, settle), ...KIT }

    function room(t) {
      // the dark room behind the shelf: a deep gradient, a soft window glow, drifting dust stars
      const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0d0928'); g.addColorStop(0.6, '#140d33'); g.addColorStop(1, '#07051a')
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
      const lg = x.createRadialGradient(540, 980, 0, 540, 980, 760); lg.addColorStop(0, rgba(spec.sky.glow || '#7fb8ff', 0.16)); lg.addColorStop(1, 'rgba(0,0,0,0)')
      x.fillStyle = lg; x.fillRect(0, 0, 1080, 1920)
      const r = rng(9)
      for (let i = 0; i < 40; i++) { const sx = r() * 1080, sy = r() * 1500, tw = 0.5 + 0.5 * Math.sin(t * (0.7 + r()) + i * 1.3); x.fillStyle = `rgba(255,240,210,${0.12 + 0.3 * tw})`; x.fillRect(Math.round(sx), Math.round(sy), 3, 3) }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const out = spec.out || [STORY_END - 0.5, STORY_END - 0.08]
        room(t)
        const cam = spec.cam ? spec.cam(t) : null
        x.save()
        const fo = popOut(t, out)                      // the globe pops away just before the end card
        x.translate(VIEW.x, VIEW.y + VIEW.dy); x.scale(VIEW.s, VIEW.s); x.translate(-VIEW.x, -VIEW.y)
        if (fo < 1) { x.globalAlpha = clamp(fo); x.translate(540, 1000); x.scale(Math.max(0.01, fo), Math.max(0.01, fo)); x.translate(-540, -1000) }
        if (cam) { x.translate(cam.x, cam.y); x.scale(cam.s, cam.s); x.translate(-cam.x, -cam.y) }
        if (spec.shelf) spec.shelf(x, t, K)
        drawShelf(x)
        // the globe wobbles about the base
        const wob = wobbleAt(t, shakes)
        x.save(); x.translate(G.cx, BASE.bot); x.rotate(wob); x.translate(-G.cx, -BASE.bot)
        drawBase(x, t, spec.plate)
        x.save(); x.beginPath(); x.arc(G.cx, G.cy, G.R, 0, TAU); x.clip()
        drawInsideSky(x, t, spec.sky)
        if (spec.skyline) spec.skyline(x, t, K)
        drawGround(x, spec.groundCol, spec.groundShade)
        if (spec.back) spec.back(x, t, K)
        for (const c of (spec.cast ? spec.cast(t, K) : [])) if (c) drawChar(x, t, c)
        if (spec.front) spec.front(x, t, K)
        { const sa = spec.snowAlpha ? spec.snowAlpha(t) : 1; if (sa > 0) { x.save(); x.globalAlpha = sa; drawSnow(x, t, shakes, settle, spec.snowTint || SNOW); x.restore() } }
        x.restore()
        drawGlass(x, t)
        x.restore()
        // outside the glass: Pisces at the glass, THE STARS, overlays
        const P = spec.pisces ? spec.pisces(t, K) : { x: 128, y: 1205, s: 150, mood: 'wide', look: [1, -0.3], tears: 2 }
        if (P) drawChar(x, t, { color: signStar('pisces').color, glyph: signStar('pisces').glyph, seed: 6, pop: P.pop ?? 1, ...P })
        const S = spec.stars ? spec.stars(t, K) : null
        if (S) drawChar(x, t, { color: STAR.sky, glyph: false, seed: 2, glow: 1.1, hops: HOPS.stars, ...S })
        if (spec.over) spec.over(x, t, K)
        x.restore()
        for (const b of BOXES) b.update(t)
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END - 0.05]))
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = spec.cuts
  // no Align card transition (CHANGE 4 Nov): spec.cuts is kept only as a record of the beat changes
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END })]
  const CUES = [
    ...shakes.filter(s => s > 0).flatMap(s => [['whoosh', s, 0.5, 0.045], ['glitter', s + 0.05, s + 0.6], ['tick', s, 0.04], ['tick', s + 0.12, 0.03]]),
    ['glitter', 0.02, 0.7],
    ...spec.heads.filter(h => h.at > 0).flatMap((h, i) => [...wordPops(h.at, 3, 0.08, i, 0.022), ['pop', h.lateAt ?? h.at + 0.35, 1174.66, 0.04, 0]]),
    ...talkCues(allLines, { cps: CPS }),
    ...(spec.cues || []),
    ...endcardCues(STORY_END, { short: true }),
  ]
  const m = spec.music
  const MUSIC = { style: m.style, key: m.key, seed: m.seed, sections: { drop: m.drop, breakdown: m.breakdown || [], lift: m.lift || [], outroAt: STORY_END }, hits: m.hits || [] }
  return { DURATION, STORY_END, SCENES, CUES, MUSIC, tag }
}

export const KIT = { pop01, outK, popOut, bump, inR, rgba, mixHex, walk, drawBits, heart, sparkles, chip, bubble, drawCard, drawChar, starFrame, inSprite, tearsCells, drawGround, clamp, lerp, prog, ease, easeOutBack, rng, GOLD, BONE, PINK, INK, ICE, SNOW, MONO, INTER, GLYPH_FONT, TAU, signStar, STAR }
