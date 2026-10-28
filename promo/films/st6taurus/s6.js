// s6 — the look + episode engine of Star Talk season 6, "BEHIND THE SIGN" (promo/films/STARTALK7.md).
// Written by the st6aries agent (EP 01). Per the season brief there is no shared season-6 module: every episode folder
// keeps its OWN COPY of this file (copy it, don't import across folders). Keep the copies' look identical.
//
// A documentary profile, one sign per episode, a gentle music-biopic parody. Every episode runs the same seven beats:
//   1. COLD OPEN   the sign's star in a soft interview spotlight says a one-line hook (dialogue box).
//   2. TITLE CARD  "★ STAR TALK · SEASON 6 ★" (Space Mono bone), "BEHIND THE SIGN" (Space Mono 700 gold, letter-spaced,
//                  typed on, gold pixel rules either side), the glyph huge in the sign colour with a halo, the NAME in
//                  Inter 800 bone, a Garamond-italic accent subtitle in the sign colour ("the first one."), then the FACT
//                  STRIP: a gold stepped pixel panel with two Space Mono rows (element · modality · ruler / symbol · dates),
//                  each fact popping in left to right with a tick.
//   3. THE MYTH    "I · THE MYTH" chapter tag + an Inter/Garamond headline, then ARCHIVE FOOTAGE: the whole frame (sky
//                  included) graded sepia duotone (colour-composite #a87b4f, blacks lifted, warm multiply, flicker), the
//                  pixel tableau inside a film-strip plate (x 70–1010, y 540–1290) with scrolling sprocket strips, gate
//                  weave, scratches and dust, a few hand-tinted gold highlights drawn AFTER the grade, and the caption
//                  "▶ ARCHIVE FOOTAGE · AS TOLD IN GREEK MYTH". The narrator box is "THE STARS".
//   4. THE SKY     "II · THE SKY": a navy star-chart plate (same rect) with a faint grid, the constellation's real stars
//                  (RA/Dec projected, simplified stick figure) as pixel stars sized by magnitude, lines drawing on as
//                  dotted pixel squares, the brightest star labelled (gold Space Mono name + bone sub-line, leader line,
//                  sign-colour pulse), and the caption "THE CONSTELLATION, NOT THE SIGN · SIMPLIFIED". The sign's star
//                  peeks in small at the plate's lower right.
//   5. UP CLOSE    "III · UP CLOSE": the interview. Dimmed sky, a warm cone of light from above, a floor pool, drifting
//                  dust; the star big at centre with its season prop; a lower-third chyron (gold bar, name in Inter 800,
//                  sub in Space Mono gold); each question is a headline ("Q. What do people | get *wrong?*"). A partner
//                  CUTAWAY hard-cuts (white flash) to the partner in its own tinted spotlight with a "CUTAWAY" chyron.
//   6. TAKEAWAY    the star, sparkly, under the spotlight; one line in its own voice (Inter 800 + Garamond accent) and
//                  "— ARIES, IN ITS OWN WORDS" in Space Mono under it.
//   7. END CARD    the shared one, cta 'SIGN UP TO VOTE YOUR CITY'.
//
// API
//   makeEpisode(spec) → { DURATION, STORY_END, T, SCENES, CUES, GHOST }   (see an episode's index.js for a full spec)
//   The timeline is computed from the copy: every box line starts READ (≥ 1.6 s) after the previous line finished
//   typing, and leftover time is spread evenly as extra hold, so every line is readable however the copy changes.
//   Spec hooks (all optional, all pure f(t)):
//     myth.tableau(ctx, t, { tab, tabAt, k, P })   draw the myth inside the plate (P = the plate rect); tab = the index of
//                                                 the current tableau (each myth line may carry tab: n), tabAt = its start.
//     myth.tint(ctx, t, info)                      hand-tinted bits, drawn after the sepia grade.
//     sky.extras(ctx, t, { at, k, pos, P })         extra marks on the chart (pos(id) → {x, y} of a projected star).
//     hero.prop(ctx, t, r, { seg, k, size })       the star's season prop (r = drawStarChar's return).
//     hero.under(ctx, t, { x, y, size, seg, k })   drawn just BEFORE the star (a cape behind it).
//     sky.map.stars[i].hide                        project the point (for the box + extras) but don't draw it.
//     personal.draw(ctx, t, { k, item, r })        anything extra in the interview (e.g. a clipboard).
//     ghost: { seg, at (s after the seg starts) | t, x, y, from, cell, where, layer: 'over' }
// Helpers exported for episodes: drawBits, pixLine, PLATE, archive colours, the bitmaps HEROFIG (Heracles), KID.
// Nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../stlore.js'
import { popText } from '../lesson.js'
import { drawBits } from '../st5cast.js'
export { drawBits }

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1'
export const SEPIA = '#a87b4f', CREAM = '#f3e3c3'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3)
export const PLATE = { x0: 70, x1: 1010, y0: 540, y1: 1290 }
const PIC = { x0: 116, x1: 964, y0: 548, y1: 1282 }          // the picture inside the film strip
export { PIC }
const READ = 1.55, CPS = 28
const TITLE_LEN = 3.5

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

// ─────────────────────────────────────────────── small drawing helpers
function stepRect(ctx, x, y, w, h, P, col) { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }
export function goldPanel(ctx, cx, cy, w, h, P = 8, { fillCol = 'rgba(16,9,38,0.94)', border = GOLD, glow = 0.6 } = {}) {
  const x = cx - w / 2, y = cy - h / 2
  if (glow > 0) { ctx.save(); ctx.shadowColor = rgba(border, glow); ctx.shadowBlur = 26; stepRect(ctx, x, y, w, h, P, border); ctx.restore() }
  stepRect(ctx, x, y, w, h, P, border); stepRect(ctx, x + P, y + P, w - 2 * P, h - 2 * P, P, INK); stepRect(ctx, x + 2 * P, y + 2 * P, w - 4 * P, h - 4 * P, P, fillCol)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x + 2 * P, y, P * 4, P / 2); ctx.fillRect(x, y + 2 * P, P / 2, P * 3)
}
export function monoText(ctx, s, x, y, { size, color, spacing = 0.06, alpha = 1, shadow = true, n = Infinity, align = 'center' }) {
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.font = `700 ${size}px ${MONO}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  const chars = [...s], adv = chars.map(ch => ctx.measureText(ch).width + size * spacing)
  const total = adv.reduce((a, b) => a + b, 0) - size * spacing
  let px = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x
  chars.forEach((ch, i) => {
    if (i < n) {
      if (shadow) { ctx.fillStyle = 'rgba(6,4,18,0.9)'; ctx.fillText(ch, px, y + size * 0.08) }
      ctx.fillStyle = color; ctx.fillText(ch, px, y)
    }
    px += adv[i]
  })
  ctx.restore()
  return total
}
/** a dotted pixel line from a to b, drawn on to fraction p */
export function pixLine(ctx, x0, y0, x1, y1, p, col, { s = 5, step = 12, alpha = 0.75 } = {}) {
  if (p <= 0) return
  const L = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.floor(L / step))
  ctx.save(); ctx.fillStyle = col; ctx.globalAlpha *= alpha
  for (let i = 0; i <= n * clamp(p); i++) { const k = i / n; ctx.fillRect(Math.round(lerp(x0, x1, k) - s / 2), Math.round(lerp(y0, y1, k) - s / 2), s, s) }
  ctx.restore()
}
function glowAt(ctx, x, y, r, color, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.4, rgba(color, 0.2 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
  ctx.restore()
}
function burst(ctx, cx, cy, t, t0, { n = 16, R = 320, seed = 5, cols = [GOLD, BONE, PINK], dur = 0.8, flat = 0.7 } = {}) {
  const tt = (t - t0) / dur
  if (tt < 0 || tt > 1) return
  const p = ease.outCubic(tt), r = rng(seed)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt)
  for (let i = 0; i < n; i++) { const a = r() * TAU, d = (0.4 + r() * 0.7) * R; drawPixelStar(ctx, cx + Math.cos(a) * d * p, cy + Math.sin(a) * d * p * flat, (16 + r() * 20) * (1 - 0.35 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  ctx.restore()
}

// ─────────────────────────────────────────────── shared bitmaps (Heracles, a child)
export const HEROFIG = [          // Heracles in his lion-skin hood, club raised (facing right)
  '......hhh.....',
  '.....hhhhh..CC',
  '.....hSSSh..CC',
  '.....hSESh.CC.',
  '......SSS..CC.',
  '....TTTTTTSC..',
  '...TTTTTTTS...',
  '..S.TTTTTT....',
  '..S.TTTTTT....',
  '....bbbbbb....',
  '....TTTTTT....',
  '....SS..SS....',
  '....SS..SS....',
  '...ddd..ddd...',
]
export const HEROFIG_C = { h: '#c8963e', S: '#e8b48a', E: '#2a1a12', T: '#d9d2c2', b: '#8a5a2c', C: '#7a4a22', d: '#5a3a1e' }
export const KID = [
  '..hhh..',
  '.hSSSh.',
  '..SES..',
  '..SSS..',
  '.TTTTT.',
  'S.TTT.S',
  '..TTT..',
  '..S.S..',
]
export const KID_C = { h: '#5a3a22', S: '#e8b48a', E: '#2a1a12', T: '#e7dcc6' }

// ─────────────────────────────────────────────── the star map
/** project real stars (ra in hours, dec in degrees) into a box, keeping the sky's shape (east to the left) */
export function projectStars(stars, { cx, cy, w, h, rot = 0 }) {
  const dec0 = stars.reduce((a, s) => a + s.dec, 0) / stars.length
  const ra0 = stars.reduce((a, s) => a + s.ra, 0) / stars.length
  const c = Math.cos(dec0 * Math.PI / 180), cr = Math.cos(rot), sr = Math.sin(rot)
  const raw = stars.map(s => { const X = -(s.ra - ra0) * 15 * c, Y = -(s.dec - dec0); return [X * cr - Y * sr, X * sr + Y * cr] })
  const xs = raw.map(p => p[0]), ys = raw.map(p => p[1])
  const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys)
  const sc = Math.min(w / Math.max(1e-6, maxx - minx), h / Math.max(1e-6, maxy - miny))
  const mx = (minx + maxx) / 2, my = (miny + maxy) / 2
  const out = {}
  stars.forEach((s, i) => { out[s.id] = { ...s, x: cx + (raw[i][0] - mx) * sc, y: cy + (raw[i][1] - my) * sc } })
  return out
}
function drawChart(ctx, t, { at, k, map, color, cap = true, capLeft = false }) {
  if (k <= 0) return
  const P = PLATE, w = P.x1 - P.x0, h = P.y1 - P.y0
  ctx.save(); ctx.globalAlpha *= k
  goldPanel(ctx, (P.x0 + P.x1) / 2, (P.y0 + P.y1) / 2, w, h, 8, { fillCol: 'rgba(7,10,32,0.93)', border: '#c9a24e', glow: 0.35 })
  // faint chart grid, slightly curved like a real chart
  ctx.save(); ctx.beginPath(); ctx.rect(P.x0 + 26, P.y0 + 26, w - 52, h - 52); ctx.clip()
  ctx.strokeStyle = 'rgba(127,200,255,0.10)'; ctx.lineWidth = 2
  for (let i = 1; i < 6; i++) { const xx = P.x0 + i * w / 6; ctx.beginPath(); ctx.moveTo(xx, P.y0); ctx.quadraticCurveTo(xx + (i - 3) * 14, (P.y0 + P.y1) / 2, xx, P.y1); ctx.stroke() }
  for (let j = 1; j < 6; j++) { const yy = P.y0 + j * h / 6; ctx.beginPath(); ctx.moveTo(P.x0, yy); ctx.quadraticCurveTo((P.x0 + P.x1) / 2, yy - 22, P.x1, yy); ctx.stroke() }
  ctx.restore()
  const pos = map.pos
  // faint field stars (deterministic), so the chart reads as real sky
  { const r = rng(77); ctx.save(); for (let i = 0; i < 70; i++) { const fx = P.x0 + 40 + r() * (w - 80), fy = P.y0 + 80 + r() * (h - 130), a = 0.15 + r() * 0.35; ctx.globalAlpha = a * clamp((t - at) * 2); ctx.fillStyle = '#cfe0ff'; const q = r() < 0.2 ? 4 : 3; ctx.fillRect(Math.round(fx), Math.round(fy), q, q) } ctx.restore() }
  // lines draw on, one after another
  const L = map.lines, dl = 0.16
  L.forEach(([a, b], i) => { const A = pos[a], B = pos[b]; pixLine(ctx, A.x, A.y, B.x, B.y, ease.outCubic(prog(t, at + 0.35 + i * dl, at + 0.35 + (i + 1) * dl)), BONE, { s: 5, step: 13, alpha: 0.6 }) })
  // the stars pop in, sized by magnitude
  Object.values(pos).forEach((s, i) => {
    const p = easeOutBack(prog(t, at + 0.05 + i * 0.05, at + 0.35 + i * 0.05), 2.4)
    if (p <= 0 || s.hide) return
    const big = s.id === map.bright
    const sz = (big ? 72 : Math.max(26, 58 - s.mag * 8)) * p
    const tw = 0.8 + 0.2 * Math.sin(t * 3 + i * 1.7)
    if (big) { const pu = 0.75 + 0.25 * Math.sin(t * 4); glowAt(ctx, s.x, s.y, 90 * pu * p, color, 1); glowAt(ctx, s.x, s.y, 40 * p, '#ffffff', 0.6) }
    ctx.save(); ctx.globalAlpha *= tw
    drawPixelStar(ctx, s.x, s.y, sz, big ? 0 : (s.mag < 3 ? 1 : 2), big ? (map.brightCol || '#ffd27a') : (s.col || '#e9f0ff'), '#ffffff')
    ctx.restore()
  })
  // labels
  for (const lb of map.labels || []) {
    const s = pos[lb.star]; if (!s) continue
    const la = at + (lb.at ?? 1.2), p = prog(t, la, la + 0.3)
    if (p <= 0) continue
    const lx = s.x + (lb.dx ?? 60), ly = s.y + (lb.dy ?? -60), al = lb.align || (lb.dx < 0 ? 'right' : 'left')
    ctx.save(); ctx.globalAlpha *= ease.outCubic(p)
    const up = (lb.dy ?? -60) < 0
    pixLine(ctx, s.x + Math.sign(lb.dx ?? 1) * 30, s.y + (up ? -30 : 30), lx + (al === 'right' ? 10 : -10), up ? ly + 22 : ly - 30, 1, GOLD, { s: 4, step: 9, alpha: 0.85 })
    const n = Math.floor((t - la) / 0.035) + 1
    monoText(ctx, lb.text, lx, ly, { size: lb.size || 40, color: GOLD, spacing: 0.08, n, align: al })
    if (lb.sub) monoText(ctx, lb.sub, lx, ly + (lb.size || 40) * 0.95, { size: lb.subSize || 24, color: BONE, spacing: 0.06, n: n - [...lb.text].length, align: al, alpha: 0.9 })
    ctx.restore()
  }
  if (cap) {
    ctx.globalAlpha = k * 0.8
    monoText(ctx, `CONSTELLATION ${map.name.toUpperCase()}`, P.x0 + 44, P.y0 + 52, { size: 26, color: '#9fc8ff', spacing: 0.14, align: 'left', shadow: false })
    monoText(ctx, 'NOT THE SIGN · SIMPLIFIED', capLeft ? P.x0 + 44 : P.x1 - 44, P.y1 - 46, { size: 20, color: '#9fc8ff', spacing: 0.12, align: capLeft ? 'left' : 'right', shadow: false, alpha: 0.75 })
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── archive footage
function drawFilmStrip(ctx, t) {
  const P = PLATE
  ctx.save()
  ctx.fillStyle = '#1a120a'
  ctx.fillRect(P.x0, P.y0 - 10, PIC.x0 - P.x0, P.y1 - P.y0 + 20); ctx.fillRect(PIC.x1, P.y0 - 10, P.x1 - PIC.x1, P.y1 - P.y0 + 20)
  ctx.fillRect(P.x0, P.y0 - 10, P.x1 - P.x0, PIC.y0 - P.y0 + 10); ctx.fillRect(P.x0, PIC.y1, P.x1 - P.x0, P.y1 - PIC.y1 + 10)
  const off = (t * 150) % 60
  ctx.fillStyle = '#d9c6a0'
  for (let y = P.y0 - 60 + off; y < P.y1; y += 60) {
    if (y < P.y0 - 4) continue
    const hh = Math.min(26, P.y1 - y)
    if (hh <= 0) continue
    ctx.fillRect(P.x0 + 13, Math.round(y), 20, hh); ctx.fillRect(PIC.x1 + 13, Math.round(y), 20, hh)
  }
  ctx.restore()
}
function archiveGrade(ctx, t) {
  ctx.save()
  ctx.globalCompositeOperation = 'color'; ctx.fillStyle = SEPIA; ctx.fillRect(0, 0, 1080, 1920)
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgb(34,22,10)'; ctx.fillRect(0, 0, 1080, 1920)
  ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#f6dfb8'; ctx.fillRect(0, 0, 1080, 1920)
  ctx.globalCompositeOperation = 'source-over'
  const fl = noise1(t * 9, 4)
  ctx.fillStyle = `rgba(10,6,2,${0.04 + 0.1 * fl})`; ctx.fillRect(0, 0, 1080, 1920)
  // vignette
  const g = ctx.createRadialGradient(540, 920, 300, 540, 920, 1100)
  g.addColorStop(0, 'rgba(20,12,4,0)'); g.addColorStop(1, 'rgba(20,12,4,0.65)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1920)
  ctx.restore()
}
function scratches(ctx, t) {
  const f = Math.floor(t * 12), r = rng(1000 + f)
  ctx.save(); ctx.beginPath(); ctx.rect(PIC.x0, PIC.y0, PIC.x1 - PIC.x0, PIC.y1 - PIC.y0); ctx.clip()
  const ns = r() < 0.7 ? 1 + Math.floor(r() * 2) : 0
  for (let i = 0; i < ns; i++) {
    const sx = PIC.x0 + r() * (PIC.x1 - PIC.x0), a = 0.15 + r() * 0.3
    ctx.fillStyle = r() < 0.5 ? `rgba(255,244,220,${a})` : `rgba(30,18,8,${a})`
    ctx.fillRect(Math.round(sx), PIC.y0, 2 + Math.floor(r() * 2), PIC.y1 - PIC.y0)
  }
  for (let i = 0; i < 7; i++) {
    const dx = PIC.x0 + r() * (PIC.x1 - PIC.x0), dy = PIC.y0 + r() * (PIC.y1 - PIC.y0), s = 3 + Math.floor(r() * 6)
    ctx.fillStyle = r() < 0.6 ? 'rgba(25,15,6,0.55)' : 'rgba(255,246,226,0.5)'
    ctx.fillRect(Math.round(dx), Math.round(dy), s, Math.max(2, s - 2))
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the interview spotlight
function drawSpotlight(ctx, t, { k, x = 540, floorY = 1150, color = GOLD, tint = null }) {
  if (k <= 0) return
  ctx.save()
  ctx.fillStyle = `rgba(4,3,10,${0.5 * k})`; ctx.fillRect(0, 0, 1080, 1920)
  if (tint) { ctx.fillStyle = rgba(tint, 0.14 * k); ctx.fillRect(0, 0, 1080, 1920) }
  ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createLinearGradient(0, 0, 0, floorY + 40)
  g.addColorStop(0, `rgba(255,236,196,${0.2 * k})`); g.addColorStop(1, `rgba(255,236,196,${0.04 * k})`)
  ctx.fillStyle = g
  ctx.beginPath(); ctx.moveTo(x - 70, -20); ctx.lineTo(x + 70, -20); ctx.lineTo(x + 340, floorY); ctx.lineTo(x - 340, floorY); ctx.closePath(); ctx.fill()
  // dust in the beam
  for (let i = 0; i < 22; i++) {
    const ph = (t * 0.05 + i * 0.137) % 1, yy = lerp(60, floorY - 40, ph)
    const half = lerp(70, 330, yy / floorY) * 0.9
    const xx = x + Math.sin(i * 12.9 + t * 0.4) * half
    ctx.fillStyle = `rgba(255,240,210,${0.35 * k * Math.sin(Math.PI * ph)})`; ctx.fillRect(Math.round(xx), Math.round(yy), 4, 4)
  }
  // the floor pool
  const pg = ctx.createRadialGradient(x, floorY, 0, x, floorY, 360)
  pg.addColorStop(0, rgba(color, 0.28 * k)); pg.addColorStop(0.5, `rgba(255,236,196,${0.12 * k})`); pg.addColorStop(1, 'rgba(255,236,196,0)')
  ctx.fillStyle = pg; ctx.save(); ctx.translate(x, floorY); ctx.scale(1, 0.17); ctx.beginPath(); ctx.arc(0, 0, 360, 0, TAU); ctx.fill(); ctx.restore()
  ctx.restore()
}
function drawChyron(ctx, t, { at, out, name, sub, color = GOLD, y = 1300 }) {
  const pin = prog(t, at, at + 0.35), po = prog(t, out - 0.3, out)
  if (pin <= 0 || po >= 1) return
  const k = ease.outCubic(pin) * (1 - ease.inCubic(po)), dx = (1 - k) * -80
  ctx.save(); ctx.globalAlpha *= k
  ctx.fillStyle = 'rgba(8,5,20,0.82)'; ctx.fillRect(84 + dx, y - 50, 600, 104)
  ctx.fillStyle = color; ctx.fillRect(84 + dx, y - 50, 12, 104)
  ctx.font = `800 50px ${INTER}`; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = BONE
  ctx.fillText(name, 116 + dx, y + 4)
  monoText(ctx, sub, 118 + dx, y + 30, { size: 22, color: GOLD, spacing: 0.12, align: 'left', shadow: false })
  ctx.restore()
}
function drawChapter(ctx, t, { at, out, text }) {
  const p = prog(t, at, at + 0.3), po = prog(t, out - 0.25, out)
  if (p <= 0 || po >= 1) return
  const o = 1 - ease.inQuad(po)
  const n = Math.floor((t - at) / 0.03) + 1
  ctx.save(); ctx.globalAlpha *= o
  const w = monoText(ctx, text, 540, 196, { size: 30, color: GOLD, spacing: 0.28, n })
  const rk = ease.outCubic(p)
  ctx.fillStyle = GOLD; ctx.globalAlpha *= 0.7
  ctx.fillRect(540 - w / 2 - 30 - 90 * rk, 194, 90 * rk, 4); ctx.fillRect(540 + w / 2 + 30, 194, 90 * rk, 4)
  ctx.restore()
}

// ─────────────────────────────────────────────── the title card
export function titleTimes(at, facts) {
  const tag = r3(at + 0.05), bts = r3(at + 0.3), glyph = r3(at + 0.95), name = r3(at + 1.2), accent = r3(at + 1.5)
  const flat = facts.flat(), f0 = at + 1.85
  return { tag, bts, glyph, name, accent, facts: flat.map((_, i) => r3(f0 + i * 0.13)), panel: r3(f0 - 0.12), out: [r3(at + TITLE_LEN - 0.32), r3(at + TITLE_LEN)], end: r3(at + TITLE_LEN) }
}
const BTS = 'BEHIND THE SIGN'
function drawTitleCard(ctx, t, { at, sign, accent, facts }) {
  const T = titleTimes(at, facts)
  if (t < at || t >= T.end) return
  const o = 1 - ease.inCubic(prog(t, ...T.out)), kin = ease.outQuad(prog(t, at, at + 0.3))
  ctx.save()
  ctx.fillStyle = `rgba(5,3,12,${0.72 * kin * o})`; ctx.fillRect(0, 0, 1080, 1920)
  ctx.globalAlpha = o
  // tag + BEHIND THE SIGN, typed on
  monoText(ctx, '★ STAR TALK · SEASON 6 ★', 540, 470, { size: 26, color: BONE, spacing: 0.22, n: Math.floor((t - T.tag) / 0.025) + 1, alpha: 0.7 })
  const n = Math.floor((t - T.bts) / 0.04) + 1
  if (t >= T.bts) {
    const w = monoText(ctx, BTS, 540, 546, { size: 58, color: GOLD, spacing: 0.22, n })
    const rk = ease.outCubic(prog(t, T.bts + 0.5, T.bts + 0.9))
    ctx.fillStyle = GOLD
    ctx.fillRect(540 - w / 2 - 34 - 110 * rk, 544, 110 * rk, 5); ctx.fillRect(540 + w / 2 + 34, 544, 110 * rk, 5)
    if (rk > 0.95) { drawPixelStar(ctx, 540 - w / 2 - 34 - 122, 546, 22, 0, GOLD, '#fff6e6'); drawPixelStar(ctx, 540 + w / 2 + 34 + 122, 546, 22, 0, GOLD, '#fff6e6') }
  }
  // the glyph, huge, in a halo
  const pg = prog(t, T.glyph, T.glyph + 0.45)
  if (pg > 0) {
    const sc = 0.3 + 0.7 * easeOutBack(pg, 2.6)
    glowAt(ctx, 540, 770, 300 * sc, sign.color, 0.9)
    ctx.save(); ctx.translate(540, 770); ctx.scale(sc, sc); ctx.rotate((1 - ease.outCubic(pg)) * -0.3)
    ctx.font = `300px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = 'rgba(6,4,18,0.8)'; ctx.fillText(sign.glyph + '︎', 0, 12)
    ctx.fillStyle = sign.color; ctx.fillText(sign.glyph + '︎', 0, 0)
    ctx.restore()
    burst(ctx, 540, 770, t, T.glyph + 0.1, { n: 14, R: 360, seed: 61, cols: [sign.color, GOLD, BONE] })
  }
  // the name, Inter 800, letters dropping in
  if (t >= T.name) {
    ctx.save(); ctx.font = `800 188px ${INTER}`; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'
    const name = sign.name.toUpperCase(), sp = 6
    const ws = [...name].map(c => ctx.measureText(c).width), tw = ws.reduce((a, b) => a + b, 0) + sp * (name.length - 1)
    const fitK = Math.min(1, 900 / tw)
    ctx.translate(540, 1060); ctx.scale(fitK, fitK)
    let px = -tw / 2
    ;[...name].forEach((c, i) => {
      const p = prog(t, T.name + i * 0.05, T.name + i * 0.05 + 0.3)
      if (p > 0) {
        ctx.save(); ctx.globalAlpha *= clamp(p * 3); ctx.translate(px + ws[i] / 2, (1 - easeOutBack(p, 2)) * -50)
        ctx.fillStyle = 'rgba(6,4,18,0.85)'; ctx.fillText(c, -ws[i] / 2, 8)
        ctx.fillStyle = BONE; ctx.fillText(c, -ws[i] / 2, 0); ctx.restore()
      }
      px += ws[i] + sp
    })
    ctx.restore()
  }
  // the Garamond accent
  const pa = prog(t, T.accent, T.accent + 0.4)
  if (pa > 0) {
    ctx.save(); ctx.translate(540, 1170); const sc = 0.4 + 0.6 * easeOutBack(pa, 3); ctx.scale(sc, sc)
    ctx.rotate(Math.sin((t - T.accent) * 12) * 0.08 * Math.exp(-(t - T.accent) * 3))
    ctx.globalAlpha *= clamp(pa * 3)
    ctx.font = `italic 500 104px ${SERIF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
    ctx.shadowColor = 'rgba(6,4,18,0.9)'; ctx.shadowBlur = 20; ctx.fillStyle = sign.color; ctx.fillText(accent, 0, 0)
    ctx.restore()
  }
  // the fact strip
  const pp = prog(t, T.panel, T.panel + 0.3)
  if (pp > 0) {
    ctx.save(); ctx.translate(540, 1345); ctx.scale(1, easeOutBack(pp, 1.8)); goldPanel(ctx, 0, 0, 960, 196, 8); ctx.restore()
    let fi = 0
    facts.forEach((row, ri) => {
      ctx.save(); ctx.font = `700 34px ${MONO}`
      const sep = '  ·  ', sepW = ctx.measureText(sep).width, ws = row.map(f => ctx.measureText(f).width)
      const total = ws.reduce((a, b) => a + b, 0) + sepW * (row.length - 1)
      ctx.restore()
      let px = 540 - total / 2
      row.forEach((f, i) => {
        const p = prog(t, T.facts[fi], T.facts[fi] + 0.25); fi++
        if (p > 0) {
          ctx.save(); ctx.globalAlpha *= clamp(p * 3)
          const yy = 1300 + ri * 90 + (1 - ease.outCubic(p)) * 14
          monoText(ctx, f, px, yy, { size: 34, color: i === 0 && ri === 0 ? sign.color : BONE, spacing: 0, align: 'left' })
          if (i < row.length - 1) monoText(ctx, '·', px + ws[i] + sepW / 2, yy, { size: 34, color: GOLD, spacing: 0 })
          ctx.restore()
        }
        px += ws[i] + sepW
      })
    })
  }
  ctx.restore()
}
function titleCues(at, facts) {
  const T = titleTimes(at, facts)
  return [
    ['whoosh', T.tag, 0.4, 0.04],
    ...[...BTS].map((c, i) => c === ' ' ? null : ['tick', r3(T.bts + i * 0.04), 0.03]).filter(Boolean),
    ['boom', T.glyph, 0.28], ['crash', T.glyph, { gain: 0.045, len: 2.2 }], ['glitter', T.glyph, r3(T.glyph + 0.7)],
    ['bell', r3(T.glyph + 0.05), 1760, 0.03, 1.6, 0],
    ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(T.name + i * 0.05), [587.33, 659.25, 739.99, 880, 987.77, 1174.66][i], 0.026, 0]),
    ['pluck', T.accent, 1174.66, 0.045, 0.6, 0],
    ...T.facts.map((f, i) => ['pop', f, [880, 987.77, 1174.66, 1318.51, 1174.66, 987.77][i % 6], 0.028, (i % 2 ? 0.2 : -0.2)]),
    ['whoosh', T.out[0], 0.3, 0.03],
  ]
}

// ─────────────────────────────────────────────── the episode engine
const doneOf = (line) => lineTimes([line], { cps: CPS })[0].done

export function makeEpisode(spec) {
  const DURATION = spec.duration, STORY_END = DURATION - ENDCARD_LEN
  const S = SIGNS.find(s => s.id === spec.sign)
  const sign = { ...S, ...signStar(spec.sign) }
  const NAME = S.name.toUpperCase()
  const TAG = `${S.glyph} ${NAME}`, NARR = 'THE STARS'
  const partnerOf = id => { const P = SIGNS.find(s => s.id === id); return { ...P, tag: `${P.glyph} ${P.name.toUpperCase()}` } }
  const speakerOf = who => (!who || who === 'sign') ? TAG : who === 'stars' ? NARR : partnerOf(who).tag
  const colorOf = who => (!who || who === 'sign') ? sign.color : who === 'stars' ? GOLD : partnerOf(who).color

  // ── the schedule, with `hold` extra seconds after every line (solved so the takeaway lands on time)
  function schedule(hold) {
    const T = {}, lines = { cold: [], myth: [], sky: [], personal: [] }
    let t = 0.55
    const place = (seg, L) => { const line = { ...L, t: r3(t), speaker: speakerOf(L.who), text: L.text, color: colorOf(L.who) }; line.done = doneOf(line); lines[seg].push(line); t = line.done + READ + hold; return line }
    T.cold = [0, null]
    for (const L of spec.cold) place('cold', L)
    T.cold[1] = r3(t - hold * 0.5)
    T.title = r3(T.cold[1] + 0.05); t = T.title + TITLE_LEN
    T.myth = [r3(t), null]; t += 0.8
    let tab = -1; T.tabs = []
    for (const L of spec.myth.lines) { if (L.tab !== undefined && L.tab !== tab) { tab = L.tab; T.tabs.push(r3(t - 0.45)) } place('myth', L) }
    T.myth[1] = r3(t - hold * 0.5)
    T.sky = [r3(T.myth[1] + 0.1), null]; t = T.sky[0] + 1.5
    for (const L of spec.sky.lines) place('sky', L)
    T.sky[1] = r3(t - hold * 0.5)
    T.personal = [r3(T.sky[1] + 0.1), null]; t = T.personal[0] + 0.2
    T.items = []
    for (const it of spec.personal.items) {
      const qAt = r3(t + 0.1); t = qAt + (it.q ? 0.9 : 0.25)
      const ls = it.lines.map(L => place('personal', L))
      T.items.push({ q: qAt, end: r3(t - hold * 0.5), lines: ls })
    }
    T.personal[1] = r3(t - hold * 0.5)
    T.take = [r3(T.personal[1] + 0.1), STORY_END]
    return { T, lines }
  }
  const nLines = spec.cold.length + spec.myth.lines.length + spec.sky.lines.length + spec.personal.items.reduce((a, i) => a + i.lines.length, 0)
  const TAKE_MIN = spec.takeaway.min ?? 4.6
  const s0 = schedule(0)
  const slack = STORY_END - TAKE_MIN - s0.T.take[0]
  if (slack < -0.3) console.warn(`[${spec.id}] over by ${(-slack).toFixed(2)} s — trim copy`)
  const hold = clamp(slack / nLines, 0, 1.4)
  const { T, lines: LN } = schedule(hold)
  T.slack = r3(slack); T.hold = r3(hold)

  const segK = (t, [a, b], fi = 0.3, fo = 0.3) => clamp(Math.min(prog(t, a, a + fi), 1 - prog(t, b - fo, b)))
  const cutaways = []
  for (const it of T.items) it.lines.forEach((L, i) => { if (L.who && L.who !== 'sign' && L.who !== 'stars') cutaways.push({ who: L.who, a: r3(L.t - 0.3), b: r3((it.lines[i + 1]?.t ?? it.end) - 0.15) }) })
  const allLines = [...LN.cold, ...LN.myth, ...LN.sky, ...LN.personal]
  const HOPS = talkHops(allLines, TAG, { cps: CPS })
  const ghost = spec.ghost
  const ghostAt = r3(ghost.t ?? (T[ghost.seg] ? (Array.isArray(T[ghost.seg]) ? T[ghost.seg][0] : T[ghost.seg]) + ghost.at : ghost.at))
  const GHOST = { at: ghostAt, x: ghost.x, y: ghost.y, where: ghost.where }

  // the sky map, projected once
  const MAP = { ...spec.sky.map, pos: projectStars(spec.sky.map.stars, spec.sky.map.box || { cx: 540, cy: 925, w: 700, h: 560 }) }

  async function build(stage) {
    try { await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const ac = document.createElement('canvas'); ac.width = 1080; ac.height = 1920; const a = ac.getContext('2d')
    const HEADS = []
    const head = (text, at, out, o = {}) => HEADS.push([popText(root, text, { top: 236, size: 92, accentSize: 140, at, gap: 0.08, accentColor: o.color || GOLD, wobble: true, late: o.late ?? 1, lateAt: at + 0.45, fit: true, ...o }), [out - 0.25, out]])
    head(spec.myth.head, T.myth[0] + 0.3, T.myth[1])
    head(spec.sky.head, T.sky[0] + 0.3, T.sky[1])
    T.items.forEach((it, i) => { const q = spec.personal.items[i].q; if (q) head(q, it.q + 0.15, it.end, { size: 84, accentSize: 128, color: sign.color }) })
    const boxes = ['cold', 'myth', 'sky', 'personal'].map(seg => {
      const ls = LN[seg]; if (!ls.length) return null
      const last = ls[ls.length - 1]
      return dialogueBox(root, { lines: ls.map(({ t, speaker, text, color }) => ({ t, speaker, text, color })), y: 1450, width: 960, height: 290, open: r3(ls[0].t - 0.25), close: r3(Math.min(T[seg][1] - 0.05, last.done + READ + hold)), cps: CPS })
    }).filter(Boolean)
    const take = popText(root, spec.takeaway.text, { top: spec.takeaway.top ?? 300, size: spec.takeaway.size ?? 104, accentSize: spec.takeaway.accentSize ?? 160, at: T.take[0] + 0.35, gap: 0.09, accentColor: sign.color, wobble: true, late: 1, lateAt: T.take[0] + 0.35 + 0.09 * (spec.takeaway.words ?? 6) + 0.25, fit: true })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    const heroState = (t, seg) => {
      const cur = [...allLines].reverse().find(L => L.t <= t + 0.05 && (!L.who || L.who === 'sign'))
      const own = cur && t < cur.done + READ + hold
      const base = (spec.hero.state && spec.hero.state(t, seg, own ? cur : null)) || {}
      if (own && cur.mood) return { mood: cur.mood, look: cur.look, ...base.force }
      return { mood: 'neutral', look: [0, 0], ...base }
    }
    function drawHero(t, k, seg, X = 540, Y = 960, size = 320) {
      if (k <= 0) return null
      const st = heroState(t, seg)
      if (spec.hero.under) { x.save(); x.globalAlpha *= k; spec.hero.under(x, t, { x: X, y: Y, size, seg, k }); x.restore() }
      const r = drawStarChar(x, X, Y, size, t, { color: sign.color, glyph: size >= 120 ? sign.glyph : null, ...st, alpha: k, pop: 1, hops: HOPS, seed: 3, glow: 1 })
      if (spec.hero.prop) { x.save(); x.globalAlpha *= k; spec.hero.prop(x, t, r, { seg, k, size }); x.restore() }
      return r
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const kc = segK(t, T.cold, 0.01, 0.25), km = segK(t, T.myth), ks = segK(t, T.sky), kp = segK(t, T.personal), kt = segK(t, T.take, 0.3, 0.01)
        const spot = Math.max(kc, kp, kt)
        const cut = cutaways.find(c => t >= c.a && t < c.b)
        // UP CLOSE: the interview spotlight
        if (spot > 0) {
          drawSpotlight(x, t, { k: spot, color: sign.color, tint: cut ? partnerOf(cut.who).color : null })
          if (cut) {
            const P = partnerOf(cut.who)
            drawStarChar(x, 540, 960, 300, t, { color: P.color, glyph: P.glyph, mood: spec.personal.cutMood || 'happy', look: [-0.4, 0], hops: talkHops(LN.personal, P.tag, { cps: CPS }), seed: 9 })
            if (spec.personal.cutProp) spec.personal.cutProp(x, t, cut)
          } else {
            const r = drawHero(t, spot, kt > 0 ? 'take' : kc > 0 ? 'cold' : 'personal', 540, kt > 0 ? 1180 : 960, 320)
            if (spec.personal.draw && kp > 0) { x.save(); x.globalAlpha *= kp; spec.personal.draw(x, t, { k: kp, r, T }); x.restore() }
          }
        }
        // THE MYTH: archive footage
        if (km > 0) {
          drawSky(a, t, SKY_H)
          const tab = T.tabs.reduce((n, s, i) => (t >= s ? i : n), 0)
          const wx = Math.round((noise1(t * 7, 1) - 0.5) * 6), wy = Math.round((noise1(t * 7, 2) - 0.5) * 6)
          a.save(); a.beginPath(); a.rect(PIC.x0, PIC.y0, PIC.x1 - PIC.x0, PIC.y1 - PIC.y0); a.clip(); a.translate(wx, wy)
          spec.myth.tableau(a, t, { tab, tabAt: T.tabs[tab] ?? T.myth[0], k: km, P: PIC, T })
          a.restore()
          if (ghost.seg === 'myth' && ghost.layer !== 'over') drawGhostCameo(a, t, { x: ghost.x, y: ghost.y, at: ghostAt, dur: 1.5, from: ghost.from, cell: ghost.cell || 3 })
          archiveGrade(a, t)
          scratches(a, t)
          if (spec.myth.tint) { a.save(); a.beginPath(); a.rect(PIC.x0, PIC.y0, PIC.x1 - PIC.x0, PIC.y1 - PIC.y0); a.clip(); a.translate(wx, wy); spec.myth.tint(a, t, { tab, tabAt: T.tabs[tab] ?? T.myth[0], k: km, P: PIC, T }); a.restore() }
          drawFilmStrip(a, t)
          monoText(a, '▶ ARCHIVE FOOTAGE · AS TOLD IN GREEK MYTH', 540, PLATE.y1 + 40, { size: 22, color: CREAM, spacing: 0.1, alpha: 0.85 })
          x.save(); x.globalAlpha = km; x.drawImage(ac, 0, 0); x.restore()
        }
        // THE SKY: the chart
        if (ks > 0) {
          x.save(); x.fillStyle = `rgba(2,4,16,${0.35 * ks})`; x.fillRect(0, 0, 1080, 1920); x.restore()
          drawChart(x, t, { at: T.sky[0] + 0.25, k: ks, map: MAP, color: sign.color, capLeft: (spec.sky.heroAt?.[0] ?? 912) > 540 })
          if (spec.sky.extras) { x.save(); x.globalAlpha *= ks; spec.sky.extras(x, t, { at: T.sky[0] + 0.25, k: ks, pos: id => MAP.pos[id], P: PLATE, T }); x.restore() }
          const hk = ks * easeOutBack(prog(t, T.sky[0] + 1.2, T.sky[0] + 1.6), 2)
          drawHero(t, hk, 'sky', spec.sky.heroAt?.[0] ?? 912, spec.sky.heroAt?.[1] ?? 1250, 170)
        }
        drawSeedConstellation(x, t, 100, { alpha: 0.5 })
        if (ghost.seg !== 'myth' || ghost.layer === 'over') drawGhostCameo(x, t, { x: ghost.x, y: ghost.y, at: ghostAt, dur: 1.5, from: ghost.from, cell: ghost.cell || 3 })
        // chapter tags + chyrons
        drawChapter(x, t, { at: 0.35, out: T.cold[1], text: 'REC · TAKE 1' })
        if (t > 0.35 && t < T.cold[1] - 0.25 && Math.sin(t * 6) > -0.2) { x.fillStyle = '#ff3d4e'; x.fillRect(361, 187, 18, 18) }
        drawChapter(x, t, { at: T.myth[0] + 0.05, out: T.myth[1], text: 'I · THE MYTH' })
        drawChapter(x, t, { at: T.sky[0] + 0.05, out: T.sky[1], text: 'II · THE SKY' })
        drawChapter(x, t, { at: T.personal[0] + 0.05, out: T.personal[1], text: 'III · UP CLOSE' })
        if (!cut) drawChyron(x, t, { at: T.personal[0] + 0.3, out: T.personal[0] + 4.2, name: S.name, sub: spec.personal.chyron, color: sign.color })
        for (const c of cutaways) {
          const P = partnerOf(c.who)
          drawChyron(x, t, { at: c.a + 0.05, out: c.b, name: P.name, sub: spec.personal.cutChyron || 'CUTAWAY', color: P.color })
          const fl = prog(t, c.a, c.a + 0.12)
          if (fl > 0 && fl < 1) { x.save(); x.globalAlpha = 0.5 * (1 - fl); x.fillStyle = '#fffbf0'; x.fillRect(0, 0, 1080, 1920); x.restore() }
        }
        // the takeaway attribution
        const ta = prog(t, T.take[0] + 1.6, T.take[0] + 1.9)
        if (ta > 0) monoText(x, `— ${NAME}, IN ITS OWN WORDS`, 540, spec.takeaway.byY ?? 860, { size: 26, color: GOLD, spacing: 0.16, alpha: ease.outCubic(ta) * kt, n: Math.floor((t - T.take[0] - 1.6) / 0.03) + 1 })
        drawTitleCard(x, t, { at: T.title, sign, accent: spec.title.accent, facts: spec.title.facts })
        for (const b of boxes) b.update(t)
        for (const [h, o] of HEADS) h.update(t, 1 - ease.inQuad(prog(t, ...o)))
        take.update(t, 1 - ease.inQuad(prog(t, STORY_END - 0.3, STORY_END)))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
        drawGrain(gx, t)
      },
    }
  }

  // ── the card cuts: myth → sky, sky → up close (+ title → myth): cardfx keeps the middle one
  const CUTS = [{ t: r3(T.myth[0] + 0.02), kind: 'flip' }, { t: r3(T.sky[0] - 0.02), kind: 'deal' }, { t: r3(T.personal[0] - 0.02), kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: `S6 E${String(spec.ep).padStart(2, '0')}` }), cardCuts(CUTS)]

  // ── the sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const pitch = { [TAG]: spec.pitch || 880, [NARR]: 784 }
  for (const c of cutaways) pitch[partnerOf(c.who).tag] = 660
  const proj = []
  for (let tt = T.myth[0] + 0.1; tt < T.myth[1] - 0.2; tt += 1 / 6) proj.push(['tick', r3(tt), 0.006])
  const mapStars = Object.keys(MAP.pos).length
  const CUES = [
    ['whoosh', 0.2, 0.5, 0.03], ['pop', 0.32, 739.99, 0.03, 0],
    ...talkCues(allLines, { cps: CPS, pitch }),
    ...titleCues(T.title, spec.title.facts),
    ['tick', r3(T.myth[0] + 0.05), 0.04], ...proj, ...wordPops(T.myth[0] + 0.3, 3, 0.08, 0),
    ...T.tabs.slice(1).map(s => ['whoosh', s, 0.3, 0.03]),
    ...wordPops(T.sky[0] + 0.3, 3, 0.08, 2),
    ...Array.from({ length: mapStars }, (_, i) => ['pluck', r3(T.sky[0] + 0.3 + i * 0.05), NOTE[(i * 2) % NOTE.length] * 2, 0.02, 0.5, (i % 2 ? 0.3 : -0.3)]),
    ['glitter', r3(T.sky[0] + 0.6), r3(T.sky[0] + 0.6 + MAP.lines.length * 0.16)],
    ['bell', r3(T.sky[0] + 1.45), 1760, 0.028, 1.4, 0],
    ['whoosh', r3(T.personal[0] + 0.1), 0.6, 0.035], ['pluck', r3(T.personal[0] + 0.35), 880, 0.03, 0.6, -0.3],
    ...T.items.flatMap((it, i) => spec.personal.items[i].q ? wordPops(it.q + 0.15, 4, 0.08, i) : []),
    ...cutaways.flatMap(c => [['tick', c.a, 0.07], ['whoosh', c.a, 0.2, 0.03]]),
    ['riser', r3(T.take[0] - 0.8), r3(T.take[0] + 0.2), 0.05],
    ...wordPops(T.take[0] + 0.35, spec.takeaway.words ?? 6, 0.09, 1), ['pluck', r3(T.take[0] + 0.35 + 0.09 * (spec.takeaway.words ?? 6) + 0.25), 1174.66, 0.05, 0.7, 0], ['bell', r3(T.take[0] + 0.35 + 0.09 * (spec.takeaway.words ?? 6) + 0.3), 2093, 0.025, 1.6, 0],
    ['tick', r3(ghostAt + 0.05), 0.015],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, STORY_END, T, LINES: LN, SCENES, CUES, GHOST, CUTS }
}
