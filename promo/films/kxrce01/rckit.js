// rckit — the shared look of "Remix Cities: Extended" (kxrce01–kxrce08, promo/films/month2/m40.md). 60 s vertical, one
// city's whole night out, stop by stop, sign by sign. THE STARS (the gold narrator star) are the tour guide; Pisces
// cries at every stop. No end card, no card transition, no logo: the film ends on its last story frame (hard cut) or
// eases back into frame 0 (loop, via hookkit's loopBack). Films import this module and describe only their own night:
//
//   export const { DURATION, SCENES, CUES, MUSIC } = cityFilm(spec)
//
// spec (times in s):
//   id, city, duration (60), ending: 'cut' | 'loop'
//   stops: [{ at, n, name, time, draw(x, t, K) }]   the night's stops. stops[0].at = 0 is the hook scene (n: 0 = no
//                        sticker). Each later stop gets a hookkit chapter sticker "n · NAME" + the route pin lights up.
//                        draw paints the whole 1080×1920 background for that stop (sky, street, interior, props).
//   route: { at, labels? }   when the ROUTE strip (pins + travelling dot + clock) appears (after the hook)
//   cast(t, K) → [{ sign | color, x, y, s, mood, look, hops, tears, hat, pop, alpha, seed, glyph }]
//   stars(t, K) → { x, y, s, mood, look, pop } | null       THE STARS (gold, no glyph)
//   back(x, t, K) / front(x, t, K)   extra drawing behind / in front of the cast (every stop)
//   over(x, t, K)        on top of everything on the canvas (bubbles, chips)
//   boxes: [{ open, close, lines: [{ t, who, text }] }]   who = a sign id or 'stars'; ≤ 46 chars a line
//   heads: [{ text, at, out: [a, b], top, size, accentSize, accentColor, late, lateAt }]   popText headlines
//   tissues: [t…]        each t bumps the TISSUES counter (top-right) once it has appeared (tissuesAt)
//   whips: [t…]          a whip zoom on these times (stop changes get one automatically)
//   fx: [[factory, opts, cuesFn], …]   any other hookkit effects (notification, loadingBar, caught, recordScratch…)
//   hook: slamTitle opts (at: -1), freeze: [recordScratch opts…] (the film's clock holds during each)
//   music: { style, key, seed, drop, breakdown, lift, hits }, cues: the film's own sound cues
// K (passed to every drawer): the helpers below + { stop(t) → index, local(t) → s since that stop began }.
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../startalk.js'
import { popText } from '../lesson.js'
import { drawChar, drawBits, heart, sparkles, chip, bubble, hatCells, GOLD, BONE, PINK, INK, ICE } from '../nsge15/globekit.js'
import { speech, hearts, tearsCells, starFrame, inSprite } from '../nhve01/scenes/thennow.js'
import {
  whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, frozen, chapter, chapterCues,
  loopBack, loopCues,
} from '../hookkit.js'

export { clamp, lerp, prog, ease, rng, drawStarChar, signStar, STAR, drawChar, drawBits, heart, sparkles, chip, bubble, speech, hearts, tearsCells, starFrame, inSprite, hatCells, drawPixelStar, easeOutBack }
export { GOLD, BONE, PINK, INK, ICE }
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const TAU = Math.PI * 2
export const W = 1080, H = 1920
export const GROUND = 1330                                  // where the cast stands by default
export const BOX_Y = 1574
const CPS = 30

// ── small helpers
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inR = (t, a, b) => t >= a && t < b
export const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
export const mixHex = (a, b, k) => { const A1 = hexToRgb(a), B1 = hexToRgb(b); return '#' + A1.map((v, i) => Math.round(lerp(v, B1[i], clamp(k))).toString(16).padStart(2, '0')).join('') }
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
/** piecewise eased path [[t, x, y], …] → [x, y] */
export const walk = (t, keys) => {
  if (t <= keys[0][0]) return [keys[0][1], keys[0][2]]
  for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const a = keys[i - 1], b = keys[i], k = ease.inOutCubic(prog(t, a[0], b[0])); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k)] }
  const l = keys[keys.length - 1]; return [l[1], l[2]]
}
/** a value that steps through [[t, v], …] (the last one at or before t) */
export const step = (t, keys, d) => { let v = d; for (const [k, val] of keys) if (t >= k) v = val; return v }

// ── backgrounds
/** a night sky gradient with twinkling pixel stars and an optional moon */
export function nightSky(x, t, { top = '#0b0a2a', bot = '#2a1d5a', glow = null, stars = 40, moon = null, seed = 3, h = 1920 } = {}) {
  const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bot)
  x.fillStyle = g; x.fillRect(0, 0, W, h)
  if (glow) { const hg = x.createRadialGradient(540, h * 0.75, 0, 540, h * 0.75, 900); hg.addColorStop(0, rgba(glow, 0.35)); hg.addColorStop(1, rgba(glow, 0)); x.fillStyle = hg; x.fillRect(0, 0, W, h) }
  const r = rng(seed)
  for (let i = 0; i < stars; i++) {
    const sx = r() * W, sy = r() * h * 0.55, tw = 0.5 + 0.5 * Math.sin(t * (0.8 + r() * 2) + i)
    x.fillStyle = `rgba(255,246,220,${0.2 + 0.55 * tw})`; x.fillRect(Math.round(sx), Math.round(sy), 4, 4)
  }
  if (moon) {
    const { x: mx, y: my, r: mr = 50 } = moon
    x.save(); x.shadowColor = 'rgba(255,240,200,0.7)'; x.shadowBlur = 50; x.fillStyle = '#fff3cf'
    x.beginPath(); x.arc(mx, my, mr, 0, TAU); x.fill(); x.restore()
    x.fillStyle = 'rgba(220,200,160,0.45)'; x.beginPath(); x.arc(mx - mr * 0.3, my - mr * 0.2, mr * 0.18, 0, TAU); x.fill(); x.beginPath(); x.arc(mx + mr * 0.25, my + mr * 0.3, mr * 0.12, 0, TAU); x.fill()
  }
}
/** a procedural skyline of blocks with lit windows (base = the street line) */
export function skyline(x, t, { seed = 1, base = 1180, minH = 160, maxH = 520, col = '#1a1440', edge = '#2a2160', win = '#ffd98a', dens = 0.45, x0 = -40, x1 = W + 40, wMin = 70, wMax = 150 } = {}) {
  const r = rng(seed)
  let bx = x0
  while (bx < x1) {
    const w = wMin + r() * (wMax - wMin), h = minH + r() * (maxH - minH)
    R(x, col, bx, base - h, w, h); R(x, edge, bx, base - h, w, 6)
    if (r() < 0.3) R(x, col, bx + w * 0.4, base - h - 40, 10, 40)
    const cols = Math.max(1, Math.floor((w - 20) / 26)), rows = Math.max(1, Math.floor((h - 30) / 34))
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const v = r()
      if (v < dens) { const fl = Math.sin(t * 0.7 + v * 40) > -0.85 ? 1 : 0.35; x.globalAlpha = fl; R(x, win, bx + 12 + i * 26, base - h + 22 + j * 34, 12, 16); x.globalAlpha = 1 }
    }
    bx += w + 4 + r() * 10
  }
}
/** the street: sidewalk + road + kerb, from y down */
export function street(x, y, { walkCol = '#3b3466', roadCol = '#221c40', line = '#e9d8a6', kerb = '#5a5090', wet = false, t = 0 } = {}) {
  R(x, walkCol, 0, y, W, 120); R(x, kerb, 0, y + 120, W, 10)
  R(x, roadCol, 0, y + 130, W, H - y - 130)
  for (let i = 0; i < 8; i++) R(x, line, i * 160 + 30, y + 230, 90, 10)
  for (let i = 0; i < 12; i++) R(x, 'rgba(0,0,0,0.12)', i * 96, y, 4, 120)
  if (wet) { x.save(); x.globalAlpha = 0.18; for (let i = 0; i < 14; i++) R(x, '#9fd8ff', (i * 83 + t * 30) % W, y + 150 + (i % 4) * 60, 60, 4); x.restore() }
}
/** a street lamp with a warm glow */
export function lamp(x, px, py, h = 340, col = '#ffe08a') {
  R(x, INK, px - 8, py - h, 16, h); R(x, '#3b3560', px - 4, py - h + 4, 8, h - 4)
  R(x, INK, px - 30, py - h - 30, 60, 34); R(x, col, px - 24, py - h - 24, 48, 22)
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(px, py - h - 10, 0, px, py - h - 10, 190); g.addColorStop(0, rgba(col, 0.38)); g.addColorStop(1, rgba(col, 0))
  x.fillStyle = g; x.fillRect(px - 190, py - h - 200, 380, 380); x.restore()
}
/** rain streaks over the whole frame */
export function rain(x, t, { n = 120, alpha = 0.45, slant = 0.25, seed = 7, col = '#bfe6ff', speed = 1700, y0 = 0, y1 = H } = {}) {
  const r = rng(seed)
  x.save(); x.globalAlpha = alpha; x.strokeStyle = col; x.lineWidth = 3
  x.beginPath()
  for (let i = 0; i < n; i++) {
    const sx = r() * (W + 300) - 150, ph = r(), len = 30 + r() * 30
    const yy = y0 + (((ph * (y1 - y0)) + t * speed * (0.8 + r() * 0.4)) % (y1 - y0))
    const xx = sx - (yy - y0) * slant
    x.moveTo(xx, yy); x.lineTo(xx - len * slant, yy + len)
  }
  x.stroke(); x.restore()
}
/** soft fog: horizontal drifting bands, k = density 0…1 */
export function fog(x, t, k, { y0 = 0, y1 = H, col = '#dfe6f2', seed = 4 } = {}) {
  if (k <= 0.01) return
  const r = rng(seed)
  x.save()
  x.globalAlpha = clamp(k) * 0.55; x.fillStyle = col; x.fillRect(0, y0, W, y1 - y0)
  for (let i = 0; i < 9; i++) {
    const by = y0 + r() * (y1 - y0), bh = 120 + r() * 220, sp = 20 + r() * 40, ox = ((t * sp + r() * 900) % 1600) - 300
    const g = x.createRadialGradient(ox + 300, by, 0, ox + 300, by, 520)
    g.addColorStop(0, rgba(col, 0.9 * clamp(k))); g.addColorStop(1, rgba(col, 0))
    x.globalAlpha = 1; x.fillStyle = g; x.fillRect(ox - 260, by - bh, 1120, bh * 2)
  }
  x.restore()
}
/** a table top (front view) */
export function table(x, cx, cy, w, { top = '#e8d2ad', side = '#a4734a', legs = true, cloth = null } = {}) {
  R(x, INK, cx - w / 2 - 6, cy - 6, w + 12, 44)
  R(x, cloth || top, cx - w / 2, cy, w, 32); R(x, 'rgba(0,0,0,0.15)', cx - w / 2, cy + 26, w, 6)
  if (cloth) for (let i = 0; i < w / 40; i++) R(x, 'rgba(255,255,255,0.18)', cx - w / 2 + i * 40, cy, 20, 32)
  if (legs) { R(x, INK, cx - w / 2 + 20, cy + 38, 16, 180); R(x, INK, cx + w / 2 - 36, cy + 38, 16, 180); R(x, side, cx - w / 2 + 24, cy + 38, 8, 180); R(x, side, cx + w / 2 - 32, cy + 38, 8, 180) }
}
/** a warm interior: back wall, a window strip showing the night, a floor */
export function interior(x, t, { wall = '#5a3550', floor = '#3a2238', trim = '#2a1430', window: win = true, winSky = '#14103a', y = 1150, seed = 9, lights = true } = {}) {
  R(x, wall, 0, 0, W, y); for (let i = 0; i < 12; i++) R(x, 'rgba(0,0,0,0.08)', i * 96, 0, 6, y)
  if (win) {
    R(x, INK, 90, 330, 900, 420); R(x, winSky, 104, 344, 872, 392)
    skyline(x, t, { seed, base: 736, minH: 80, maxH: 300, col: '#221a50', edge: '#30266a', x0: 104, x1: 976, wMin: 50, wMax: 110 })
    R(x, INK, 104, 344, 872, 8); R(x, INK, 536, 344, 8, 392); R(x, '#7a5a7a', 90, 750, 900, 18)
  }
  if (lights) stringLights(x, t, 40, 1040, 230)
  R(x, trim, 0, y - 14, W, 14); R(x, floor, 0, y, W, H - y)
  for (let i = 0; i < 9; i++) R(x, 'rgba(0,0,0,0.12)', 0, y + 40 + i * 90, W, 4)
}
/** a sagging line of coloured bulbs */
export function stringLights(x, t, x0, x1, y, sag = 40, cols = [GOLD, PINK, '#9fe6ff', '#9fe6b0']) {
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i <= 30; i++) { const px = lerp(x0, x1, i / 30), py = y + sag * Math.sin(Math.PI * i / 30); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke()
  const n = Math.floor((x1 - x0) / 70)
  for (let i = 0; i <= n; i++) {
    const px = lerp(x0, x1, i / n), py = y + sag * Math.sin(Math.PI * i / n)
    x.save(); x.globalAlpha = 0.7 + 0.3 * Math.sin(t * 3 + i * 1.7); R(x, cols[i % cols.length], px - 8, py + 2, 16, 18)
    x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(px, py + 10, 0, px, py + 10, 40); g.addColorStop(0, rgba(cols[i % cols.length], 0.35)); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(px - 40, py - 30, 80, 80); x.restore()
  }
}
/** a lit sign board with pixel-font-ish text (Inter 800), e.g. a stall name: generic words only */
export function signBoard(x, cx, cy, text, { size = 40, col = '#ffe08a', bg = '#2a1438', glow = true, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const w = x.measureText(text).width + size * 1.1, h = size * 1.6
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, bg, -w / 2, -h / 2, w, h)
  if (glow) { x.shadowColor = col; x.shadowBlur = 18 }
  x.fillStyle = col; x.fillText(text, 0, 2)
  x.restore()
}
/** a talk card (drawn, no logo): a tarot-ish card with a question */
export function talkCard(x, cx, cy, w, text, { rot = 0, alpha = 1, flip = 1 } = {}) {
  if (w <= 2 || alpha <= 0.01) return
  const h = w * 1.5
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(flip, 1)
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 12, -h / 2 + 16, w, h)
  R(x, INK, -w / 2 - 5, -h / 2 - 5, w + 10, h + 10); R(x, '#f6eedc', -w / 2, -h / 2, w, h)
  x.strokeStyle = GOLD; x.lineWidth = Math.max(2, w * 0.02); x.strokeRect(-w / 2 + w * 0.06, -h / 2 + w * 0.06, w * 0.88, h - w * 0.12)
  if (Math.abs(flip) > 0.25) {
    drawPixelStar(x, 0, -h * 0.3, w * 0.16, 2, GOLD)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    const fs = Math.max(8, w * 0.085); x.font = `700 ${fs}px ${INTER}`
    const words = text.split(' '), rows = []; let cur = ''
    for (const wd of words) { const tt = cur ? cur + ' ' + wd : wd; if (x.measureText(tt).width > w * 0.78 && cur) { rows.push(cur); cur = wd } else cur = tt }
    if (cur) rows.push(cur)
    rows.forEach((rw, i) => x.fillText(rw, 0, -h * 0.02 + (i - (rows.length - 1) / 2) * fs * 1.25))
    x.font = `700 ${Math.max(7, w * 0.055)}px ${MONO}`; x.fillStyle = '#8a6a2a'; x.fillText('TALK CARD', 0, h * 0.36)
  }
  x.restore()
}
/** a phone (front), screen colour + optional text lines */
export function phone(x, cx, cy, s = 1, { screen = '#9fd8ff', lines = [], rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -44, -80, 88, 160); R(x, '#3a3550', -38, -74, 76, 148); R(x, screen, -32, -64, 64, 120)
  x.fillStyle = INK; x.font = `800 14px ${INTER}`; x.textAlign = 'center'
  lines.forEach((l, i) => x.fillText(l, 0, -40 + i * 22))
  x.restore()
}

// ── the series bug: a pixel map pin + "REMIX CITIES" (Inter 800 small caps, letter-spaced)
const PIN = ['.PPPP.', 'PPWWPP', 'PPWWPP', 'PPPPPP', '.PPPP.', '..PP..', '..PP..']
function buildBug(root) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '34px', height: '40px', imageRendering: 'pixelated' }, box)
  ic.width = 34; ic.height = 40
  drawBits(ic.getContext('2d'), PIN, { P: PINK, W: BONE }, 17, 20, 4.4)
  el('div', { font: `800 28px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'REMIX&nbsp;CITIES')
  return box
}

// ── the ROUTE strip: the night's stops as pins on a line, a dot travelling between them, the clock at the right
function drawRoute(x, t, stops, k, city) {
  if (k <= 0.01) return
  const L = 70, Rr = 760, y = 160, S = stops.filter(s => s.n > 0)
  x.save(); x.globalAlpha = clamp(k)
  x.translate(0, (1 - k) * -40)
  R(x, 'rgba(10,6,30,0.78)', 40, 118, 1000, 92); R(x, GOLD, 40, 206, 1000, 4)
  x.font = `700 22px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.75)'; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(city.toUpperCase(), 58, 140)
  // dotted route
  x.fillStyle = 'rgba(239,230,214,0.4)'; for (let px = L; px < Rr; px += 18) x.fillRect(px, y + 8, 9, 4)
  const pos = i => lerp(L + 20, Rr - 10, S.length > 1 ? i / (S.length - 1) : 0)
  let cur = -1; S.forEach((s, i) => { if (t >= s.at) cur = i })
  // the dot travels toward the next pin over the stop
  let dx = pos(Math.max(0, cur))
  if (cur >= 0 && cur < S.length - 1) { const a = S[cur].at, b = S[cur + 1].at; dx = lerp(pos(cur), pos(cur + 1), ease.inOutCubic(prog(t, b - 1.2, b))) ; void a }
  S.forEach((s, i) => {
    const lit = i <= cur, px = pos(i), kk = lit ? pop01(t, s.at, 0.3, 2.5) : 1
    drawBits(x, PIN, { P: lit ? PINK : '#5a5080', W: lit ? BONE : '#8a80b0' }, px, y - 2, 4 * (lit ? 0.85 + 0.25 * kk : 0.8))
    x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.fillStyle = lit ? BONE : 'rgba(239,230,214,0.4)'; x.fillText(String(s.n), px, y + 34)
  })
  if (cur >= 0) { x.save(); x.shadowColor = GOLD; x.shadowBlur = 16; drawPixelStar(x, dx, y + 10, 26, 2, GOLD); x.restore() }
  // the clock chip
  const tm = cur >= 0 ? S[cur].time : S[0].time
  R(x, INK, 806, 128, 222, 72); R(x, '#1d1446', 810, 132, 214, 64)
  x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText(tm, 917, 166)
  x.restore()
}

/** the TISSUES counter (top-right), for the Pisces gag */
function drawTissues(x, t, ts, at) {
  if (t < at) return
  let n = 0, last = -1e9
  for (const v of ts) if (t >= v) { n++; last = v }
  const k = pop01(t, at, 0.3, 2.2), b = bump(t, last, 0.3)
  x.save(); x.translate(908, 268); x.scale(k * (1 + 0.18 * b), k * (1 + 0.18 * b)); x.rotate(0.05)
  R(x, INK, -126, -36, 252, 72); R(x, '#2a5a8a', -120, -30, 240, 60); R(x, '#8fe3ff', -120, 22, 240, 8)
  x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
  x.fillText(`♓︎ TISSUES: ${n}`, 0, -2)
  x.restore()
}

// ── the film
const FONTS = ["800 112px Inter", "800 28px Inter", "800 40px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 600 104px 'EB Garamond'", "700 40px 'Space Mono'", "700 22px 'Space Mono'", "700 28px 'Space Mono'"]
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

export function cityFilm(spec) {
  const DURATION = spec.duration || 60
  const stops = spec.stops
  const stopIdx = t => { let k = 0; stops.forEach((s, i) => { if (t >= s.at) k = i }); return k }
  const tag = who => who === 'stars' ? 'THE STARS' : `${signStar(who).glyph}︎ ${who.toUpperCase()}`
  const tagCol = who => who === 'stars' ? GOLD : mixHex(signStar(who).color, '#ffffff', 0.35)
  const boxes = (spec.boxes || []).map(b => ({ ...b, lines: b.lines.map(L => ({ t: L.t, speaker: tag(L.who), color: tagCol(L.who), text: L.text })) }))
  const allLines = boxes.flatMap(b => b.lines)
  const HOPS = {}
  const hopsOf = who => (HOPS[who] ||= talkHops(allLines, tag(who), { cps: CPS }))
  const routeAt = spec.route?.at ?? 3.4
  const tissuesAt = spec.tissuesAt ?? routeAt

  async function build(stage) {
    try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#07051a' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const K = { stop: stopIdx, local: t => t - stops[stopIdx(t)].at, hops: hopsOf, W, H, GROUND }
    const HEADS = (spec.heads || []).map(h => [popText(root, h.text, { top: h.top ?? 330, size: h.size ?? 92, accentSize: h.accentSize ?? 132, at: h.at, late: h.late ?? 1, lateAt: h.lateAt ?? h.at + 0.35, wobble: true, gap: h.gap ?? 0.08, accentColor: h.accentColor || GOLD }), h.out])
    const BOXES = boxes.map(b => dialogueBox(root, { lines: b.lines, y: BOX_Y, width: 980, height: b.height || 262, cps: CPS, size: b.size || 48, open: b.open, close: b.close }))
    buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        x.save()
        const s = stops[stopIdx(t)]
        s.draw(x, t, K)
        if (spec.back) spec.back(x, t, K)
        for (const c of (spec.cast ? spec.cast(t, K) : [])) if (c) drawChar(x, t, { seed: 3, ...c, hops: [...(c.hops || []), ...(c.sign ? hopsOf(c.sign) : [])] })
        const S = spec.stars ? spec.stars(t, K) : null
        if (S) drawChar(x, t, { color: STAR.sky, glyph: false, seed: 2, glow: 1.15, ...S, hops: [...(S.hops || []), ...hopsOf('stars')] })
        if (spec.front) spec.front(x, t, K)
        drawRoute(x, t, stops, pop01(t, routeAt, 0.4, 1.8), spec.city)
        if (spec.tissues) drawTissues(x, t, spec.tissues, tissuesAt)
        if (spec.over) spec.over(x, t, K)
        x.restore()
        for (const b of BOXES) b.update(t)
        for (const [h, o] of HEADS) h.update(t, o ? outK(t, o) : 1)
        drawGrain(gx, t)
      },
    }
  }

  // hookkit layers: frame-0 whip + slam title, freezes, chapter stickers per stop, whips on stop changes, extras
  const HOOK = { at: -1, top: 300, size: 104, ...spec.hook }
  const WHIP0 = { at: -0.26, len: 0.55, from: 1.7, ...(spec.whip0 || {}) }
  const FREEZE = spec.freeze || []
  const CHAPS = stops.filter(s => s.n > 0).map((s, i, arr) => ({ at: s.at + 0.12, out: [Math.min((arr[i + 1]?.at ?? DURATION) - 0.35, s.at + 5.2), Math.min((arr[i + 1]?.at ?? DURATION) - 0.2, s.at + 5.4)], n: s.n, title: `${s.name}`, x: 64, y: 236, color: s.color || GOLD }))
  const WHIPS = [...stops.slice(1).map(s => s.at), ...(spec.whips || [])].map(at => ({ at, len: 0.42, from: 1.45, flash: 0.28 }))
  const FX = spec.fx || []
  const base = FREEZE.length ? frozen(build, FREEZE) : build
  const fxScenes = [whipZoom(WHIP0), ...WHIPS.map(o => whipZoom(o)), slamTitle(HOOK), ...FREEZE.map(o => recordScratch(o)), ...CHAPS.map(o => chapter(o)), ...FX.map(([f, o]) => f(o))]
  const SCENES = [base, ...fxScenes]
  if (spec.ending === 'loop') SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: DURATION, len: spec.loopLen || 0.45 }))

  const CUES = [
    ...whipZoomCues(WHIP0), ...slamTitleCues(HOOK), ...WHIPS.flatMap(o => whipZoomCues(o)),
    ...FREEZE.flatMap(o => recordScratchCues(o)), ...CHAPS.flatMap(o => chapterCues(o)),
    ...FX.flatMap(([, o, c]) => (c ? c(o) : [])),
    ['pop', routeAt, 880, 0.03, -0.3], ['glitter', routeAt, r3(routeAt + 0.5)],
    ...(spec.heads || []).filter(h => h.at > 0).flatMap((h, i) => [...wordPops(h.at, 3, 0.08, i, 0.022), ['pop', h.lateAt ?? r3(h.at + 0.35), 1174.66, 0.04, 0]]),
    ...(spec.tissues || []).filter(v => v >= tissuesAt).map(v => ['pluck', v, 1318.51, 0.025, 0.25, 0.5]),
    ...talkCues(allLines, { cps: CPS }),
    ...(spec.cues || []),
    ...(spec.ending === 'loop' ? loopCues({ duration: DURATION, len: spec.loopLen || 0.45 }) : []),
  ]
  const m = spec.music
  const MUSIC = { style: m.style, key: m.key, seed: m.seed, sections: { drop: m.drop, breakdown: m.breakdown || [], lift: m.lift || [], outroAt: DURATION - (spec.ending === 'loop' ? 0.3 : 0.9) }, hits: m.hits || [] }
  return { DURATION, SCENES, CUES, MUSIC }
}
