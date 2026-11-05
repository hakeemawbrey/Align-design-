// ldnkit — LONG DISTANCE NOTES (batch m23, kln*): the shared split-screen set and engine. Every episode is one config:
//   import { makeLDN } from '../../klne01/ldnkit.js'  →  const EP = makeLDN(cfg); export DURATION, SCENES, CUES, MUSIC
//
// The set (vertical 1080×1920): two halves side by side, LEFT (x 0–540) and RIGHT (540–1080), split by a glowing
// seam. Each half is its own city: a sky for its real local hour (night / dawn / day / dusk, with stars, sun or moon),
// a pixel skyline, and either a ROOM (wall, a big window onto that sky, a floor, an optional bed) or the STREET
// (sidewalk). A city badge with a live clock sits at the top of each half; the clocks keep the real offset between
// the cities and can jump forward (a spin + tick). THE STARS give the one small habit in the dialogue box. ♓ Pisces
// cries in every film (cfg.pis: a roommate on one side, or one of the couple). Long episodes merge the halves at the
// end: the seam slides away and the two skies blend into one.
// No end card, no card cut, no logo. Endings: 'cut' or 'loop' (hookkit loopBack). Pure f(t).
//
// cfg = {
//   id, len, ending, music: { style, key, seed },
//   hook: 'Your goodnight is *their* good morning.',
//   L: { sign, city, min0 (local minutes after midnight at t = 0), weather?: 'snow' | 'rain' | 'clear', summer? },
//   R: { sign, city, offset (R minus L, minutes), weather? },
//   jumps: [[t, +minutes]]       the clocks jump forward together at t
//   sets: [[t, 'room' | 'street', 'room' | 'street', { bedL, bedR }]]   from t on
//   pose(t, side) → { x, y, s, mood, look, hops, tears, alpha, pop }   (x, y global; side 'L' | 'R')
//   lines: [{ t, text }]          THE STARS (box)       bubbles: [{ t, t1, x, y, text, col?, tail? }]
//   draw(x, t, S)                film props, drawn over both halves (S.clipL / S.clipR helpers, S.minL, S.minR)
//   pis: { side, x, y, s, tears(t) }   a Pisces roommate (omit when Pisces is one of the couple: use pose tears)
//   last: { t, text },  long?: { promise, promiseOut, chapters: [{ t, text, dur }], merge: [t0, t1] }
//   gap: the "N hours apart" chip text, cues: []
// }
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { fill } from '../../src/scenes/common.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, chapter, chapterCues, loopBack, loopCues } from '../hookkit.js'
import {
  GOLD, BONE, PINK, INK, RED, MINT, TEAR, INTER, MONO, FONTS, r3, pop01, outK, hash, R, box, drawBits, sparkles, hearts, bubble, label,
  shadow, starFrame, inSprite, tearsCells, buildBug, clamp, lerp, prog, ease, el, drawPixelStar,
} from '../klde01/m23kit.js'

export const LOOP_LEN = 0.45
const SPEAK = 'THE STARS'
export const fmtClock = m => { m = ((Math.round(m) % 1440) + 1440) % 1440; const h = Math.floor(m / 60), mm = m % 60; return `${(h % 12) || 12}:${String(mm).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}` }

// ── skies by local hour
const SKY = [
  [0, '#070a1e', '#141a3e'], [5, '#0d1030', '#3a2a5a'], [6.5, '#3a3a7a', '#f2a07a'], [8, '#5a9ad8', '#bfe2f2'], [16, '#4a8ad0', '#bfe2f2'],
  [17.5, '#5a4a9a', '#ff9a6a'], [19, '#1c1a4a', '#7a3a6a'], [20.5, '#0a0c24', '#1a1c44'], [24, '#070a1e', '#141a3e'],
]
const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
const mix = (a, b, k) => { const A = hexRgb(a), B = hexRgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], k))).join(',')})` }
export function skyAt(min) {
  const h = ((min / 60) % 24 + 24) % 24
  for (let i = 0; i < SKY.length - 1; i++) if (h >= SKY[i][0] && h < SKY[i + 1][0]) { const k = (h - SKY[i][0]) / (SKY[i + 1][0] - SKY[i][0]); return { top: mix(SKY[i][1], SKY[i + 1][1], k), bot: mix(SKY[i][2], SKY[i + 1][2], k), h } }
  return { top: SKY[0][1], bot: SKY[0][2], h }
}
const isNight = h => h < 6 || h >= 19.5
// approximate local sunrise / sunset (hours) in December, so each half's sky is true for its city and hour
export const SUN = {
  'Toronto': [7.7, 16.7], 'London': [8.0, 15.9], 'Cape Town': [5.5, 19.9], 'Sydney': [5.7, 20.0], 'Houston': [7.1, 17.4], 'Lagos': [6.8, 18.4],
  'Berlin': [8.2, 15.9], 'Seoul': [7.4, 17.2], 'Mexico City': [7.0, 18.0], 'Madrid': [8.5, 17.9], 'Chicago': [7.2, 16.3], 'Mumbai': [7.0, 18.0],
  'Dubai': [7.0, 17.6], 'Manila': [6.1, 17.5], 'Atlanta': [7.6, 17.5], 'Nairobi': [6.2, 18.6], 'Vancouver': [8.0, 16.3], 'Tokyo': [6.7, 16.5],
  'Los Angeles': [6.9, 16.8], 'Paris': [8.6, 17.0], 'Montreal': [7.6, 16.2], 'Auckland': [6.0, 20.7], 'Edinburgh': [8.7, 15.7],
}
/** clock minutes → a "solar" minute on the sky table (sunrise ≈ 6:30, sunset ≈ 18:30) */
export function solarMin(min, city) {
  const sun = SUN[city]; if (!sun) return min
  const [r, st] = sun, h = ((min / 60) % 24 + 24) % 24
  const hs = h < r ? 6.5 * h / r : h < st ? 6.5 + (h - r) / (st - r) * 12 : 18.5 + (h - st) / (24 - st) * 5.5
  return hs * 60
}
const isDay = h => h >= 7.5 && h < 17.5

// a deterministic pixel skyline per city name
function skyline(x, X0, W, base, seed, night, t, col = '#1a1630') {
  let px = X0 - 20, i = 0
  while (px < X0 + W + 20) {
    const w = 60 + Math.floor(hash(seed + i) * 70), h = 90 + Math.floor(hash(seed + i * 3.1) * 230)
    R(x, col, px, base - h, w, h + 4)
    if (hash(seed + i * 7.7) > 0.7) R(x, col, px + w / 2 - 4, base - h - 40, 8, 40)
    for (let wy = base - h + 18; wy < base - 16; wy += 30) for (let wx = px + 10; wx < px + w - 14; wx += 22) {
      const lit = night ? hash(seed + wx * 0.37 + wy * 1.3) > 0.45 : hash(seed + wx * 0.37 + wy * 1.3) > 0.85
      if (lit) R(x, night ? '#ffd98a' : 'rgba(255,255,255,0.35)', wx, wy, 10, 14)
    }
    px += w + 4; i++
  }
}

function weather(x, X0, W, t, kind, seed) {
  if (kind === 'snow') for (let i = 0; i < 26; i++) { const p = ((t * 0.18 + hash(seed + i)) % 1); R(x, '#ffffff', X0 + hash(seed + i * 2.3) * W + 18 * Math.sin(t * 1.5 + i), 300 + p * 1600, 7, 7) }
  if (kind === 'rain') { x.save(); x.strokeStyle = 'rgba(190,220,255,0.55)'; x.lineWidth = 3; for (let i = 0; i < 30; i++) { const p = ((t * 1.4 + hash(seed + i)) % 1), rx = X0 + hash(seed + i * 2.3) * W, ry = 300 + p * 1600; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 8, ry + 30); x.stroke() } x.restore() }
}

/** paint one half's world: sky (with sun / moon / stars), skyline, then a room or the street */
function half(x, t, side, min, set, city, wx, opts = {}) {
  const X0 = opts.X0 ?? (side === 'L' ? 0 : 540), W = opts.W ?? 540, sk = skyAt(solarMin(min, city)), n = isNight(sk.h)
  const seed = [...city].reduce((a, c) => a + c.charCodeAt(0), 0)
  const g = x.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, sk.top); g.addColorStop(1, sk.bot)
  x.fillStyle = g; x.fillRect(X0, 0, W, 1920)
  if (n) for (let i = 0; i < 26; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7); x.globalAlpha = tw; R(x, '#fff6d8', X0 + hash(seed + i) * W, 120 + hash(seed + i * 5) * 800, 5, 5); x.globalAlpha = 1 }
  // sun or moon
  const hh = sk.h, cx = X0 + W * 0.72
  if (hh > 6.5 && hh < 18.5) { const arc = Math.sin(Math.PI * clamp((hh - 6.5) / 12)); const cy = 900 - arc * 560; x.fillStyle = 'rgba(255,230,150,0.3)'; x.beginPath(); x.arc(cx, cy, 90, 0, 7); x.fill(); x.fillStyle = '#ffe58a'; x.beginPath(); x.arc(cx, cy, 52, 0, 7); x.fill() }
  else { const cy = 420; x.fillStyle = 'rgba(247,231,176,0.18)'; x.beginPath(); x.arc(cx, cy, 80, 0, 7); x.fill(); x.fillStyle = '#f7e7b0'; x.beginPath(); x.arc(cx, cy, 44, 0, 7); x.fill(); x.fillStyle = sk.top; x.beginPath(); x.arc(cx + 18, cy - 10, 38, 0, 7); x.fill() }
  skyline(x, X0, W, 1260, seed, n, t)
  weather(x, X0, W, t, wx, seed)
  if (set === 'room') {
    // a wall with a big window onto the city
    const wallC = n ? '#231a3e' : '#4a3a6a'
    x.fillStyle = wallC
    x.fillRect(X0, 0, W, 440); x.fillRect(X0, 1180, W, 740); x.fillRect(X0, 440, 50, 740); x.fillRect(X0 + W - 50, 440, 50, 740)
    R(x, INK, X0 + 44, 434, W - 88, 12); R(x, INK, X0 + 44, 1174, W - 88, 12); R(x, INK, X0 + 44, 434, 12, 752); R(x, INK, X0 + W - 56, 434, 12, 752)
    R(x, INK, X0 + W / 2 - 5, 440, 10, 740)
    if (n) { x.save(); x.globalAlpha = 0.12; R(x, '#ffd98a', X0, 1180, W, 740); x.restore() }
    R(x, n ? '#1a1430' : '#3a2c58', X0, 1300, W, 620); R(x, INK, X0, 1296, W, 6)
    // floor decor: a rug, a plant, a little stack of books
    x.fillStyle = n ? '#3a2a5a' : '#5a4a8a'; x.beginPath(); x.ellipse(X0 + W / 2, 1640, W * 0.42, 70, 0, 0, 7); x.fill()
    x.fillStyle = n ? '#4a3670' : '#7a62a8'; x.beginPath(); x.ellipse(X0 + W / 2, 1640, W * 0.32, 48, 0, 0, 7); x.fill()
    box(x, X0 + W - 140, 1560, 70, 80, '#b0603a', { b: 6 }); drawBits(x, ['.L.L.', 'LLLLL', '.LLL.', '..L..'], { L: '#5fb87a' }, X0 + W - 105, 1520, 14)
    box(x, X0 + 60, 1600, 110, 26, '#e8344e', { b: 4 }); box(x, X0 + 70, 1570, 96, 24, '#7fd0ff', { b: 4 }); box(x, X0 + 64, 1542, 104, 22, '#f2c75c', { b: 4 })
    if (opts.bed) { box(x, X0 + 40, 1220, W - 80, 110, '#e9e2f5', { b: 8 }); box(x, X0 + 50, 1150, 150, 80, '#ffffff', { b: 6 }); box(x, X0 + 40, 1290, W - 80, 120, opts.bedCol || '#5a6fc8', { b: 8, hi: '#7a8fe0' }) }
    // a lamp glow at night
    if (n) { x.save(); x.globalCompositeOperation = 'lighter'; const gl = x.createRadialGradient(X0 + 100, 1100, 10, X0 + 100, 1100, 380); gl.addColorStop(0, 'rgba(255,200,120,0.22)'); gl.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gl; x.fillRect(X0, 700, W, 800); x.restore() }
  } else {
    R(x, '#2a2440', X0, 1260, W, 660); R(x, '#5a5478', X0, 1260, W, 14)
    const off = ((opts.walk || 0) % 150 + 150) % 150
    for (let i = -1; i < 5; i++) R(x, 'rgba(239,230,214,0.18)', X0 + i * 150 + 20 - off, 1420, 90, 8)
    // a street lamp
    R(x, INK, X0 + 60, 860, 14, 400); R(x, INK, X0 + 40, 850, 60, 18); if (n) { x.save(); x.globalCompositeOperation = 'lighter'; const gl = x.createRadialGradient(X0 + 70, 880, 5, X0 + 70, 880, 260); gl.addColorStop(0, 'rgba(255,220,140,0.35)'); gl.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gl; x.fillRect(X0, 600, W, 700); x.restore() }
  }
  if (wx === 'snow' && set === 'street') R(x, '#e8f0ff', X0, 1256, W, 12)
}

// ── props (global coords)
export function phone(x, cx, cy, { s = 1, rot = 0, glow = 0, lines = [], title = null, col = '#e8f0ff' } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (glow) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 10, 0, 0, 200); g.addColorStop(0, `rgba(200,230,255,${0.4 * glow})`); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(-200, -200, 400, 400); x.restore() }
  box(x, -70, -125, 140, 250, '#2a2148', { b: 7 }); R(x, col, -58, -108, 116, 210)
  if (title) label(x, title, 0, -88, { size: 16, col: INK })
  lines.forEach((l, i) => { const w = Math.min(100, 12 + l.length * 8); R(x, i % 2 ? '#9fd0ff' : '#ffffff', i % 2 ? 50 - w : -50, -64 + i * 34, w, 26); label(x, l, i % 2 ? 50 - w / 2 : -50 + w / 2, -51 + i * 34, { size: 12, col: INK, maxW: w - 4 }) })
  x.restore()
}
export function card(x, cx, cy, w, h, col, { rot = 0, text = null, size = 26, ink = INK, alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 6 })
  if (text) (Array.isArray(text) ? text : [text]).forEach((l, i, a) => label(x, l, 0, (i - (a.length - 1) / 2) * size * 1.25, { size, col: ink, font: INTER, weight: 800, maxW: w - 24 }))
  x.restore()
}
/** something flying across the seam from (ax, ay) to (bx, by) during [t0, t1], with an arc */
export function fly(x, t, t0, t1, ax, ay, bx, by, drawFn, arc = 220) {
  if (t < t0 || t > t1) return null
  const p = ease.inOutCubic(prog(t, t0, t1)), px = lerp(ax, bx, p), py = lerp(ay, by, p) - Math.sin(Math.PI * p) * arc
  for (let i = 1; i < 5; i++) { const q = Math.max(0, p - i * 0.04); x.save(); x.globalAlpha = 0.18 * (5 - i) / 5; R(x, '#fff1c8', lerp(ax, bx, q) - 6, lerp(ay, by, q) - Math.sin(Math.PI * q) * arc - 6, 12, 12); x.restore() }
  drawFn(x, px, py, p); return [px, py]
}

export function makeLDN(cfg) {
  const D = cfg.len, ending = cfg.ending || 'cut'
  const SL = signStar(cfg.L.sign), SR = signStar(cfg.R.sign), PIS = signStar('pisces')
  const CPS = cfg.cps || 30
  const LINES = (cfg.lines || []).map(l => ({ t: l.t, speaker: SPEAK, text: l.text }))
  const jumps = cfg.jumps || []
  const minL = t => { let m = cfg.L.min0; for (const [jt, add] of jumps) m += add * ease.inOutCubic(prog(t, jt, jt + 0.45)); if (cfg.realtime !== false) m += Math.max(0, t) / 60 * (cfg.tick ?? 1); return m }
  const minR = t => minL(t) + cfg.R.offset
  const setAt = t => { let s = cfg.sets?.[0] || [0, 'room', 'room', {}]; for (const e of cfg.sets || []) if (t >= e[0]) s = e; return s }
  const merge = t => cfg.long?.merge ? ease.inOutCubic(prog(t, ...cfg.long.merge)) : 0

  async function build(stage) {
    try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const root = fill(stage, { background: '#07040f' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const badgeL = mkBadge(root, 'L', cfg.L.city, SL), badgeR = mkBadge(root, 'R', cfg.R.city, SR)
    const gapChip = cfg.gap ? el('div', { position: 'absolute', left: '0', top: '574px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root) : null
    const gapIn = gapChip ? el('div', { padding: '10px 26px', background: GOLD, color: INK, font: `800 36px ${INTER}`, border: `5px solid ${INK}`, borderRadius: '40px', boxShadow: '6px 6px 0 rgba(6,4,18,0.6)', whiteSpace: 'nowrap' }, gapChip, cfg.gap) : null
    const promise = cfg.long ? popText(root, cfg.long.promise, { top: 196, size: 72, accentSize: 100, at: cfg.long.promiseAt ?? 2.3, gap: 0.07, accentColor: GOLD, fit: true }) : null
    const LAST = cfg.last ? popText(root, cfg.last.text, { top: cfg.last.top ?? 196, size: cfg.last.size ?? 90, accentSize: (cfg.last.size ?? 90) * 1.4, at: cfg.last.t, gap: 0.08, late: 1, lateAt: cfg.last.t + 0.08 * (cfg.last.text.split(/\s+/).length - 1) + 0.12, wobble: true, accentColor: cfg.last.accent || GOLD, fit: true }) : null
    const boxes = (cfg.boxes || [{ from: 0, to: LINES.length }]).map(b => dialogueBox(root, { lines: LINES.slice(b.from, b.to), y: 1500, height: 270, size: 48, cps: CPS, ...(b.open != null ? { open: b.open } : {}), ...(b.close != null ? { close: b.close } : {}) }))
    const bug = buildBug(root, { name: 'LONG DISTANCE', sub: 'NOTES', col: '#9fd0ff', dot: '#9fd0ff' })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function mkBadge(root, side, city, SG) {
      const w = el('div', { position: 'absolute', left: side === 'L' ? '40px' : '580px', top: '446px', width: '460px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px', pointerEvents: 'none', transformOrigin: '0% 0%' }, root)
      el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.16em', color: BONE, textShadow: '0 2px 10px rgba(6,4,18,0.95)', whiteSpace: 'nowrap' }, w, `${SG.glyph}︎ ${city.toUpperCase()}`)
      const clk = el('div', { font: `700 52px ${MONO}`, color: GOLD, textShadow: '0 3px 0 rgba(6,4,18,0.95), 0 0 18px rgba(242,199,92,0.35)', whiteSpace: 'nowrap' }, w, '')
      return { w, clk }
    }

    function drawAll(x, t) {
      const mg = merge(t)
      const [, setL, setR, so = {}] = setAt(t)
      const mL = minL(t), mR = minR(t)
      const S = { t, minL: mL, minR: mR, mg }
      // the two halves (clipped); while merging, the seam slides right and the left world grows
      const toR = cfg.long?.mergeTo === 'R'
      const seam = lerp(540, toR ? -30 : 1110, mg)
      S.seam = seam
      if (seam > 0) { x.save(); x.beginPath(); x.rect(0, 0, seam, 1920); x.clip(); half(x, t, 'L', mL, setL, cfg.L.city, cfg.L.weather, { bed: so.bedL, bedCol: so.bedColL, walk: cfg.walkL ? cfg.walkL(t) : 0, X0: 0, W: Math.max(540, seam) }); x.restore() }
      if (seam < 1080) { x.save(); x.beginPath(); x.rect(seam, 0, 1080 - seam, 1920); x.clip(); const W2 = Math.max(540, 1080 - seam); half(x, t, 'R', mR, setR, cfg.R.city, cfg.R.weather, { bed: so.bedR, bedCol: so.bedColR, walk: cfg.walkR ? cfg.walkR(t) : 0, X0: 1080 - W2, W: W2 }); x.restore() }
      S.clip = (side, fn) => { x.save(); x.beginPath(); if (side === 'L') x.rect(0, 0, seam, 1920); else x.rect(seam, 0, 1080, 1920); x.clip(); fn(); x.restore() }
      if (cfg.under) cfg.under(x, t, S)
      // the couple
      for (const side of ['L', 'R']) {
        const P = cfg.pose ? cfg.pose(t, side, S) : null
        if (!P || P.hide) continue
        const SG = side === 'L' ? SL : SR, seed = side === 'L' ? 3 : 8
        const o = { color: SG.color, glyph: SG.glyph, mood: P.mood || 'neutral', look: P.look, hops: P.hops, seed, glow: 1, pop: P.pop ?? 1, alpha: P.alpha ?? 1, squash: P.squash || 0, blink: P.blink }
        const draw = () => {
          shadow(x, P.x, P.y + P.s * 0.42, P.s * 0.9, 0.3)
          drawStarChar(x, P.x, P.y, P.s, t, o)
          if (P.tears) { const F = starFrame(P.x, P.y, P.s, t, o); inSprite(x, F, () => tearsCells(x, t, P.tears)) }
          if (P.prop) P.prop(x, starFrame(P.x, P.y, P.s, t, o))
        }
        if (P.free || mg > 0) draw(); else S.clip(side, draw)
      }
      // the Pisces roommate / friend
      if (cfg.pis) {
        const p = cfg.pis, tears = p.tears ? p.tears(t) : 2
        if (!(p.hideAt && t > p.hideAt)) {
          const o = { color: PIS.color, glyph: PIS.glyph, mood: p.mood ? p.mood(t) : 'wide', look: p.look || [p.side === 'L' ? 1 : -1, 0], seed: 6, glow: 0.9, hops: p.hops }
          const pd = () => { drawStarChar(x, p.x, p.y, p.s, t, o); const F = starFrame(p.x, p.y, p.s, t, o); if (tears) inSprite(x, F, () => tearsCells(x, t, tears)); if (p.prop) p.prop(x, F) }
          if (mg > 0) pd(); else S.clip(p.side, pd)
        }
      }
      if (cfg.draw) cfg.draw(x, t, S)
      for (const b of cfg.bubbles || []) bubble(x, t, b.x, b.y, b.t, b.t1, b.text, { size: b.size || 34, tail: b.tail ?? 0, col: b.col || BONE, maxW: b.maxW || 470 })
      // the seam
      if (mg < 1 && seam > 0 && seam < 1080) {
        R(x, INK, seam - 7, 0, 14, 1920); R(x, '#fff1c8', seam - 2, 0, 4, 1920)
        for (let i = 0; i < 8; i++) { const yy = ((t * 120 + i * 240) % 1920); x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,241,200,0.5)'; x.fillRect(seam - 5, yy, 10, 26); x.restore() }
      }
      return S
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        const S = drawAll(x, t)
        // badges: clocks
        const bk = cfg.badgeAt != null ? pop01(t, cfg.badgeAt, 0.3, 2.2) : 1
        const bOut = cfg.long?.merge ? outK(t, [cfg.long.merge[0], cfg.long.merge[0] + 0.3]) : 1
        for (const [b, m, side] of [[badgeL, S.minL, 'L'], [badgeR, S.minR, 'R']]) {
          const k = bk * bOut
          b.w.style.display = k > 0.01 ? 'flex' : 'none'
          b.w.style.opacity = String(clamp(k * 1.5))
          const spin = jumps.some(([jt]) => t > jt && t < jt + 0.45)
          b.w.style.transform = `scale(${(0.6 + 0.4 * Math.min(1.2, k)).toFixed(3)})`
          b.clk.textContent = fmtClock(m) + (side === 'R' && cfg.R.dayLabel ? cfg.R.dayLabel(S.minL, S.minR) : '')
          b.clk.style.color = spin ? '#ffffff' : GOLD
        }
        if (gapChip) { const k = cfg.gapAt != null ? pop01(t, cfg.gapAt, 0.3, 2.4) * outK(t, cfg.gapOut) : 0; gapChip.style.display = k > 0.01 ? 'flex' : 'none'; gapIn.style.transform = `scale(${k.toFixed(3)}) rotate(-3deg)` }
        if (promise) promise.update(t, outK(t, [cfg.long.promiseOut - 0.2, cfg.long.promiseOut]))
        if (LAST) LAST.update(t, 1)
        boxes.forEach(b => b.update(t))
        bug.update(t, 1)
        drawGrain(gx, t)
      },
    }
  }

  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop ?? 200, size: cfg.hookSize ?? 96, accentColor: cfg.accent || '#9fd0ff', out: cfg.hookOut || [3.0, 3.2] }
  const WHIP = { at: cfg.whipAt ?? 0.55, len: 0.45, from: 1.45, blur: 14 }
  const CHAPS = (cfg.long?.chapters || []).map((c, i) => ({ at: c.t, out: [c.t + (c.dur ?? 1.6) - 0.15, c.t + (c.dur ?? 1.6)], n: i + 1, title: c.text }))
  const CUES = [
    ...talkCues(LINES, { cps: CPS }),
    ...(cfg.badgeAt != null ? [['pop', cfg.badgeAt, 880, 0.05, -0.4], ['pop', cfg.badgeAt + 0.08, 1174.66, 0.05, 0.4], ['tick', cfg.badgeAt + 0.1, 0.06]] : []),
    ...(cfg.gapAt != null ? [['pop', cfg.gapAt, 1318.51, 0.05, 0], ['pluck', cfg.gapAt + 0.05, 987.77, 0.04, 0.5, 0]] : []),
    ...jumps.flatMap(([jt]) => [['whoosh', jt, 0.4, 0.04], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(jt + i * 0.06), 0.04]), ['bell', jt + 0.45, 1760, 0.025, 0.8, 0]]),
    ...(cfg.last ? [['pop', cfg.last.t, 987.77, 0.04, 0], ['pluck', cfg.last.t + 0.5, 1318.51, 0.045, 0.6, 0], ['bell', cfg.last.t + 0.55, 1760, 0.03, 1.2, 0]] : []),
    ...(cfg.long?.merge ? [['riser', cfg.long.merge[0] - 1.2, cfg.long.merge[0], 0.05], ['glitter', cfg.long.merge[1] - 0.2, cfg.long.merge[1] + 0.6], ['bell', cfg.long.merge[1], 1760, 0.04, 1.4, 0], ['crash', cfg.long.merge[1], { gain: 0.05, len: 1.8 }]] : []),
    ...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...CHAPS.flatMap(c => chapterCues(c)),
    ...(ending === 'loop' ? loopCues({ duration: D, len: LOOP_LEN }) : []),
    ...(cfg.cues || []),
  ]
  const SCENES = [build, whipZoom(WHIP), slamTitle(HOOK), ...CHAPS.map(c => chapter(c)), ...(cfg.scenes || [])]
  if (ending === 'loop') SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: D, len: LOOP_LEN }))
  const sections = cfg.sections || { drop: cfg.badgeAt ?? 0.6 }
  const music = { style: cfg.music.style, key: cfg.music.key, seed: cfg.music.seed, sections: { ...sections, outroAt: Math.min(sections.outroAt ?? (cfg.last ? cfg.last.t + 0.5 : D - 1), D - 0.6) }, hits: cfg.hits || [] }
  return { DURATION: D, SCENES, CUES, music, minL, minR }
}

/** a wall clock (global coords) showing local minutes m, with a name plate */
export function wallClock(x, cx, cy, m, name, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 70, 0, 7); x.fill(); x.fillStyle = '#fff8e0'; x.beginPath(); x.arc(0, 0, 60, 0, 7); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, Math.cos(a) * 50 - 3, Math.sin(a) * 50 - 3, 6, 6) }
  const hh = (m / 60) % 12, mm = m % 60
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(hh / 12 * 6.283) * 30, -Math.cos(hh / 12 * 6.283) * 30); x.stroke()
  x.lineWidth = 5; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(mm / 60 * 6.283) * 46, -Math.cos(mm / 60 * 6.283) * 46); x.stroke()
  if (name) { box(x, -80, 78, 160, 40, GOLD, { b: 5 }); label(x, name, 0, 98, { size: 22, col: INK, font: INTER, weight: 800, maxW: 150 }) }
  x.restore()
}
export { GOLD, BONE, PINK, INK, RED, MINT, TEAR, INTER, MONO, r3, pop01, outK, hash, R, box, drawBits, sparkles, hearts, bubble, label, shadow, starFrame, inSprite, tearsCells, clamp, lerp, prog, ease, drawPixelStar, STAR, talkHops }
