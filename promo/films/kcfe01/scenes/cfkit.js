// ZODIAC CONFESSIONAL show kit (kcfe01–kcfe20, promo/films/month2/m09.md). Imported read-only by every episode.
// A reality-show confessional booth: velvet curtain, ring light, armchair, REC chrome, a lower third, white-on-black
// producer captions, B-roll sets and the dinner table for the long episodes. Running gag: Pisces runs the boom mic
// and cries at every confession (boomOp).
// Pure f(t) everywhere. DOM is only built inside build-time helpers (nothing touches `document` at module top level,
// because the sound build imports scenes/index.js in node).
//
//   pal(sign) / SIGN(id)                     colours: { color, glyph, name }
//   drawBooth(x, t, { sign, ring, dim, plant, neon })   the booth set behind the subject (wall, curtain, ring light, chair back)
//   drawChairFront(x, cx, cy, s, col)        the armrests in front of a seated star
//   seat(x, t, id, P, opts)                  a sign star (drawStarChar) + optional tears / sweat / blush; returns the frame
//   boomOp(x, t, { k, tears, mood, mic, op, sway })   Pisces on the boom: pole, fuzzy mic, crying operator
//   drawRoom(x, t, { wall, floor, window, lamp, tint })  a generic B-roll room (props are drawn by the film)
//   drawTable(x, t, { y, w, plates, candles, cloth })   the dinner table (front), for the long episodes
//   recChrome(x, t, { label, tc0, alpha })   corner brackets, ● REC, a running timecode, optional EARLIER label
//   tearsCells / starFrame / inSprite        props on a drawStarChar sprite
//   pixel helpers: drawBits, sparkles, pop01, outK, popOut, step, wob
//   DOM: buildBug(root, { ep }), buildLower(root), buildCaps(root, lines), buildSticker(root)
//   cues: capCues(lines), wordPops(t0, n, gap), NOTE
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { SIGNS, easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'

export { clamp, lerp, prog, ease, el, easeOutBack, drawStarChar }
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#ff3d5a', TEAR = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const FONTS = ["800 112px Inter", "700 30px Inter", "600 30px Inter", "900 60px Inter", "italic 500 120px 'EB Garamond'", "italic 600 60px 'EB Garamond'", "700 40px 'Space Mono'", "400 30px 'Space Mono'"]
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
/** the latest value in a [[t, v], …] timeline (the first value before its time) */
export const step = (t, tl) => { let v = tl[0][1]; for (const [a, b] of tl) if (t >= a) v = b; return v }
/** is t inside any of the [a, b] windows */
export const within = (t, ws) => ws.some(([a, b]) => t >= a && t < b)
export const wob = (t, f = 1, a = 1, seed = 0) => a * (Math.sin(t * 2.3 * f + seed) * 0.6 + Math.sin(t * 3.7 * f + seed * 2.1) * 0.4)
const NAMES = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
export function SIGN(id) { const s = SIGNS.find(q => q.id === id); return { id, color: s.color, glyph: s.glyph, name: NAMES[id] } }
export const EX_GREY = '#9aa0b8'

// ── colour helpers
const hx = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
export const shade = (h, k) => { const [r, g, b] = hx(h); const f = v => Math.round(clamp(k < 0 ? v * (1 + k) : v + (255 - v) * k, 0, 255)); return `rgb(${f(r)},${f(g)},${f(b)})` }
export const rgba = (h, a) => { const [r, g, b] = hx(h); return `rgba(${r},${g},${b},${a})` }

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

/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

/** a chunky rounded box with an ink outline (pixel-ish furniture) */
export function blk(x, X, Y, w, h, col, { r = 10, ink = 6, hi = 0.18, lo = -0.3 } = {}) {
  x.fillStyle = INK; rr(x, X - ink, Y - ink, w + ink * 2, h + ink * 2, r + ink); x.fill()
  x.fillStyle = col; rr(x, X, Y, w, h, r); x.fill()
  if (hi) { x.fillStyle = shade(col, hi); rr(x, X + 6, Y + 6, w - 12, Math.min(14, h * 0.2), r * 0.6); x.fill() }
  if (lo) { x.fillStyle = shade(col, lo); rr(x, X, Y + h - Math.min(16, h * 0.25), w, Math.min(16, h * 0.25), r * 0.6); x.fill() }
}
export function rr(x, X, Y, w, h, r) { r = Math.max(0, Math.min(r, w / 2, h / 2)); x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath() }

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops and squash
const G = 36, HALF = 18
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
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
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
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains · 4 sideways flood */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = TEAR; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 4 ? 14 : k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 4 ? 2.6 : k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 4) { px = ex + d * 26 * ph; py = 20 - 14 * ph + 30 * ph * ph }
      else if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
    ctx.fillStyle = TEAR; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** a sweat drop on the brow (sprite cells) */
export function sweatCells(ctx, t, k = 1) {
  if (k <= 0) return
  const ph = (t * 0.9) % 1
  const y = 9 + ph * 7
  ctx.fillStyle = INK; ctx.fillRect(28.6, y - 0.4, 2.8, 3.6)
  ctx.fillStyle = TEAR; ctx.fillRect(29, y, 2, 2.8); ctx.fillStyle = '#fff'; ctx.fillRect(29, y, 0.8, 0.8)
}

/** a sign star. P = { x, y, s, pop, alpha, hops }; opts = { mood, look, tears, sweat, seed, squash, glyph } */
export function seat(x, t, id, P, { mood = 'neutral', look, tears = 0, sweat = 0, seed = 3, squash = 0, glyph = true, color, blush, glow = 1 } = {}) {
  const S = id === 'ex' ? { color: EX_GREY, glyph: null } : id === 'stage' ? { color: '#b8c4d6', glyph: null } : SIGN(id)
  const o = { color: color || S.color, glyph: glyph && P.s >= 120 ? S.glyph : null, mood, look, seed, glow, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, squash, blush, blink: mood === 'wide' ? false : undefined }
  drawStarChar(x, P.x, P.y, P.s, t, o)
  const F = starFrame(P.x, P.y, P.s, t, o)
  if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
  if (sweat) inSprite(x, F, () => sweatCells(x, t, sweat))
  return F
}

// ── the booth (behind the subject)
export const SUBJ = { x: 540, y: 1000, s: 400 }
export function drawBooth(x, t, { sign = 'taurus', ring = 1, dim = 0, plant = true, neon = true, wall } = {}) {
  const col = wall || (sign === 'ex' ? EX_GREY : SIGN(sign).color)
  // back wall: velvet curtain folds, tinted by the sign
  const base = shade(col, -0.72)
  x.fillStyle = base; x.fillRect(0, 0, 1080, 1920)
  for (let i = -1; i < 20; i++) {
    const X = i * 60 + Math.sin(t * 0.6 + i) * 2
    const g = x.createLinearGradient(X, 0, X + 60, 0)
    g.addColorStop(0, shade(col, -0.82)); g.addColorStop(0.45, shade(col, -0.55)); g.addColorStop(1, shade(col, -0.85))
    x.fillStyle = g; x.fillRect(X, 380, 61, 1060)
  }
  // pelmet + gold trim
  x.fillStyle = shade(col, -0.8); x.fillRect(0, 380, 1080, 44)
  x.fillStyle = GOLD; for (let i = 0; i < 1080; i += 36) x.fillRect(i + 6, 424, 22, 8)
  // floor
  const fg = x.createLinearGradient(0, 1240, 0, 1920); fg.addColorStop(0, '#1d1430'); fg.addColorStop(1, '#0a0614')
  x.fillStyle = fg; x.fillRect(0, 1240, 1080, 680)
  x.fillStyle = 'rgba(255,255,255,0.05)'; for (let i = 0; i < 8; i++) x.fillRect(0, 1260 + i * i * 9, 1080, 2)
  // warm key light pooling on the chair
  const k = 0.55 * ring * (1 - dim)
  if (k > 0) { const g = x.createRadialGradient(540, 980, 0, 540, 980, 640); g.addColorStop(0, `rgba(255,226,180,${0.28 * k})`); g.addColorStop(1, 'rgba(255,226,180,0)'); x.fillStyle = g; x.fillRect(0, 380, 1080, 1100) }
  // a neon heart on the wall (flickers)
  if (neon) {
    const fl = 0.75 + 0.25 * Math.sin(t * 13) * Math.sin(t * 3.3)
    x.save(); x.globalAlpha = (1 - dim * 0.7) * fl; x.shadowColor = PINK; x.shadowBlur = 30
    drawBits(x, ['.HH...HH.', 'HHHH.HHHH', 'HHHHHHHHH', '.HHHHHHH.', '..HHHHH..', '...HHH...', '....H....'], { H: '#ff7fb0' }, 170, 610, 10, { outline: null })
    x.restore()
  }
  // the ring light behind the chair
  if (ring > 0) {
    x.save(); x.globalAlpha = ring
    x.shadowColor = 'rgba(255,248,230,0.9)'; x.shadowBlur = 60 * (1 - dim)
    x.strokeStyle = `rgba(255,250,236,${0.85 - dim * 0.6})`; x.lineWidth = 30
    x.beginPath(); x.arc(540, 860, 300, 0, Math.PI * 2); x.stroke()
    x.restore()
    x.fillStyle = '#2a2240'; x.fillRect(532, 1160, 16, 120)
  }
  // potted plant, stage right
  if (plant) {
    const sw = Math.sin(t * 1.4) * 0.04
    x.save(); x.translate(930, 1250); x.rotate(sw)
    x.fillStyle = INK; for (const [a, l] of [[-0.5, 170], [-0.15, 210], [0.25, 190], [0.6, 150]]) { x.save(); x.rotate(a); x.fillRect(-20, -l - 6, 40, l + 6); x.restore() }
    x.fillStyle = '#4fb86a'; for (const [a, l] of [[-0.5, 170], [-0.15, 210], [0.25, 190], [0.6, 150]]) { x.save(); x.rotate(a); rr(x, -14, -l, 28, l, 14); x.fill(); x.restore() }
    x.restore()
    blk(x, 880, 1230, 100, 90, '#c86a3c', { r: 8 })
  }
  // chair back
  drawChairBack(x, 540, 1010, col)
  if (dim > 0) { x.fillStyle = `rgba(4,2,12,${dim * 0.6})`; x.fillRect(0, 0, 1080, 1920) }
}
export function drawChairBack(x, cx, cy, col, s = 1) {
  const c = '#7a2a44'
  x.save(); x.translate(cx, cy); x.scale(s, s)
  blk(x, -230, -150, 460, 330, c, { r: 70 })
  blk(x, -200, 150, 400, 90, shade(c, -0.15), { r: 22 })
  x.restore()
}
export function drawChairFront(x, cx = 540, cy = 1010, s = 1) {
  const c = '#7a2a44'
  x.save(); x.translate(cx, cy); x.scale(s, s)
  blk(x, -260, 60, 90, 190, shade(c, 0.05), { r: 34 })
  blk(x, 170, 60, 90, 190, shade(c, 0.05), { r: 34 })
  x.fillStyle = INK; x.fillRect(-190, 246, 22, 50); x.fillRect(168, 246, 22, 50)
  x.restore()
}

// ── Pisces on the boom mic (top right), crying
export function boomOp(x, t, { k = 1, tears = 2, mood = 'sparkle', mic = [560, 720], op = [890, 610], sway = 1, look = [-1, 1], size = 170, who = 'pisces', glyph = true } = {}) {
  if (k <= 0.01) return
  const sx = Math.sin(t * 1.3) * 10 * sway, sy = Math.sin(t * 1.9 + 1) * 6 * sway
  const ox = lerp(1300, op[0], k), oy = op[1]
  const mx = lerp(1300, mic[0], k) + sx, my = mic[1] + sy
  // pole
  x.save()
  x.strokeStyle = INK; x.lineWidth = 18; x.lineCap = 'round'; x.beginPath(); x.moveTo(ox + 40, oy - 40); x.lineTo(mx + 40, my - 30); x.stroke()
  x.strokeStyle = '#8a8fa6'; x.lineWidth = 9; x.beginPath(); x.moveTo(ox + 40, oy - 40); x.lineTo(mx + 40, my - 30); x.stroke()
  x.restore()
  // fuzzy windscreen
  x.save(); x.translate(mx, my); x.rotate(0.25)
  x.fillStyle = INK; rr(x, -78, -36, 156, 72, 36); x.fill()
  x.fillStyle = '#6f7388'; rr(x, -72, -30, 144, 60, 30); x.fill()
  x.fillStyle = '#8b90a8'; for (let i = 0; i < 18; i++) { const a = i * 0.9 + t * 0.4; x.fillRect(-66 + (i * 37) % 132, -26 + (i * 13) % 44, 8 + 4 * Math.sin(a), 6) }
  x.restore()
  seat(x, t, who, { x: ox, y: oy, s: size }, { mood, look, tears, seed: who === 'pisces' ? 6 : 21, glow: 0.9, glyph })
}

// ── a generic B-roll room (the film draws its own props on top)
export function drawRoom(x, t, { wall = '#3a2a5e', floor = '#22183a', window = true, lamp = true, floorY = 1320, night = true } = {}) {
  const g = x.createLinearGradient(0, 300, 0, floorY); g.addColorStop(0, shade(wall, -0.35)); g.addColorStop(1, wall)
  x.fillStyle = g; x.fillRect(0, 0, 1080, floorY)
  // wallpaper dots
  x.fillStyle = rgba('#ffffff', 0.05); for (let j = 0; j < 14; j++) for (let i = 0; i < 10; i++) x.fillRect(40 + i * 110 + (j % 2) * 55, 330 + j * 72, 8, 8)
  x.fillStyle = floor; x.fillRect(0, floorY, 1080, 1920 - floorY)
  x.fillStyle = 'rgba(255,255,255,0.06)'; for (let i = 0; i < 9; i++) x.fillRect(0, floorY + 10 + i * i * 8, 1080, 2)
  x.fillStyle = INK; x.fillRect(0, floorY - 8, 1080, 14)
  if (window) {
    blk(x, 640, 470, 330, 380, night ? '#0e1640' : '#9fd6ff', { r: 6, hi: 0, lo: 0 })
    if (night) { x.fillStyle = '#fff7d8'; [[690, 520], [900, 560], [760, 700], [930, 780], [700, 800]].forEach(([a, b], i) => { if (Math.sin(t * 2 + i * 1.7) > -0.3) x.fillRect(a, b, 6, 6) }); x.fillStyle = '#f6e7b8'; x.beginPath(); x.arc(860, 600, 34, 0, Math.PI * 2); x.fill() }
    x.fillStyle = INK; x.fillRect(799, 466, 12, 388); x.fillRect(636, 655, 338, 12)
  }
  if (lamp) {
    const g2 = x.createRadialGradient(170, 760, 0, 170, 760, 380); g2.addColorStop(0, 'rgba(255,214,150,0.28)'); g2.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g2; x.fillRect(0, 380, 700, 900)
    x.fillStyle = INK; x.fillRect(160, 780, 20, floorY - 780)
    blk(x, 100, 690, 140, 100, '#f2c06a', { r: 10 })
  }
}

// ── the dinner table (front edge and top), for the long episodes. Everything sitting behind it is drawn first.
export function drawTable(x, t, { y = 1180, plates = [250, 540, 830], candles = [395, 685], cloth = '#f4ead8', food = true, rattle = 0 } = {}) {
  const ry = rattle ? Math.sin(t * 60) * rattle : 0
  x.save(); x.translate(0, ry)
  // top (a trapezoid in perspective)
  x.fillStyle = INK; x.beginPath(); x.moveTo(60, y - 6); x.lineTo(1020, y - 6); x.lineTo(1086, y + 186); x.lineTo(-6, y + 186); x.closePath(); x.fill()
  x.fillStyle = cloth; x.beginPath(); x.moveTo(70, y); x.lineTo(1010, y); x.lineTo(1074, y + 180); x.lineTo(6, y + 180); x.closePath(); x.fill()
  x.fillStyle = shade(cloth, -0.12); for (let i = 0; i < 12; i++) x.fillRect(20 + i * 90, y + 10, 4, 170)
  // the hanging cloth
  x.fillStyle = shade(cloth, -0.18); x.fillRect(0, y + 180, 1080, 120)
  x.fillStyle = INK; x.fillRect(0, y + 296, 1080, 10)
  for (let i = 0; i < 1080; i += 54) { x.fillStyle = shade(cloth, -0.26); x.fillRect(i + 24, y + 186, 6, 110) }
  // plates
  plates.forEach((px, i) => {
    x.fillStyle = INK; x.beginPath(); x.ellipse(px, y + 95, 108, 40, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(px, y + 92, 100, 34, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#e4e0ea'; x.beginPath(); x.ellipse(px, y + 92, 66, 20, 0, 0, Math.PI * 2); x.fill()
    if (food) { x.fillStyle = ['#e6a24a', '#7ac46a', '#d8604a'][i % 3]; x.beginPath(); x.ellipse(px - 10, y + 88, 34, 12, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f6e7b8'; x.beginPath(); x.ellipse(px + 24, y + 92, 18, 8, 0, 0, Math.PI * 2); x.fill() }
    x.fillStyle = '#c9ccd8'; x.fillRect(px - 136, y + 70, 10, 56); x.fillRect(px + 126, y + 70, 10, 56)
  })
  // candles with flicker
  candles.forEach((cx, i) => {
    blk(x, cx - 14, y - 40, 28, 96, '#fff3d6', { r: 4, ink: 5 })
    const f = 1 + 0.15 * Math.sin(t * 17 + i * 3) + 0.1 * Math.sin(t * 29 + i)
    const g = x.createRadialGradient(cx, y - 66, 0, cx, y - 66, 120 * f); g.addColorStop(0, 'rgba(255,214,120,0.45)'); g.addColorStop(1, 'rgba(255,214,120,0)'); x.fillStyle = g; x.fillRect(cx - 130, y - 190, 260, 260)
    x.fillStyle = '#ffb347'; x.beginPath(); x.ellipse(cx, y - 60, 9 * f, 18 * f, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff6c8'; x.beginPath(); x.ellipse(cx, y - 56, 4, 9, 0, 0, Math.PI * 2); x.fill()
  })
  x.restore()
}
/** a dining-room backdrop: wallpaper, a framed picture, a hanging lamp */
export function drawDiningRoom(x, t, { wall = '#4a2a4e', lamp = 1 } = {}) {
  drawRoom(x, t, { wall, floor: '#1e1428', window: true, lamp: false, floorY: 1240 })
  // hanging pendant lamp
  const sw = Math.sin(t * 1.1) * 0.03
  x.save(); x.translate(540, 300); x.rotate(sw)
  x.fillStyle = INK; x.fillRect(-4, 0, 8, 300)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-110, 310); x.lineTo(110, 310); x.lineTo(60, 250); x.lineTo(-60, 250); x.closePath(); x.fill()
  x.fillStyle = '#f2c06a'; x.beginPath(); x.moveTo(-100, 304); x.lineTo(100, 304); x.lineTo(56, 256); x.lineTo(-56, 256); x.closePath(); x.fill()
  x.restore()
  if (lamp > 0) { const g = x.createRadialGradient(540, 700, 0, 540, 700, 760); g.addColorStop(0, `rgba(255,214,150,${0.3 * lamp})`); g.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1300) }
  // a framed picture
  blk(x, 120, 520, 200, 160, '#c9a24a', { r: 4, hi: 0, lo: 0 }); x.fillStyle = '#2a3a6e'; x.fillRect(140, 540, 160, 120); x.fillStyle = '#f6e7b8'; x.beginPath(); x.arc(250, 580, 16, 0, Math.PI * 2); x.fill()
}

// ── REC chrome: corner brackets, ● REC + timecode, optional label (EARLIER / B-ROLL / LIVE)
export function recChrome(x, t, { label = null, tc0 = 0, alpha = 1, color = '#ffffff', y0 = 140, y1 = 1310 } = {}) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha = alpha
  const L = 64, w = 6, X0 = 46, X1 = 1034
  x.fillStyle = color
  for (const [X, Y, dx, dy] of [[X0, y0, 1, 1], [X1, y0, -1, 1], [X0, y1, 1, -1], [X1, y1, -1, -1]]) { x.fillRect(dx > 0 ? X : X - L, Y - (dy > 0 ? 0 : w), L, w); x.fillRect(dx > 0 ? X : X - w, dy > 0 ? Y : Y - L, w, L) }
  const on = Math.floor(t * 1.6) % 2 === 0
  x.font = `700 30px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'right'
  if (on) { x.fillStyle = RED; x.beginPath(); x.arc(X1 - 136, y0 + 44, 11, 0, Math.PI * 2); x.fill() }
  x.fillStyle = color; x.fillText('REC', X1 - 30, y0 + 46)
  const T = tc0 + t, hh = Math.floor(T / 3600), mm = Math.floor(T / 60) % 60, ss = Math.floor(T) % 60, ff = Math.floor((T % 1) * 30)
  const p2 = n => String(n).padStart(2, '0')
  x.textAlign = 'left'; x.font = `400 26px ${MONO}`; x.fillStyle = rgba('#ffffff', 0.8)
  x.fillText(`${p2(hh)}:${p2(mm)}:${p2(ss)}:${p2(ff)}`, X0 + 20, y1 - 34)
  if (label) {
    x.font = `800 34px ${INTER}`; x.textAlign = 'right'
    const w2 = x.measureText(label).width + 36
    x.fillStyle = '#ffe14d'; x.fillRect(X1 - 20 - w2, y1 - 58, w2, 48)
    x.fillStyle = INK; x.fillText(label, X1 - 38, y1 - 33)
  }
  x.restore()
}

// ── DOM: the show bug (top-left): red REC dot + "ZODIAC CONFESSIONAL" (Inter 800 small caps, letter-spaced)
export function buildBug(root, { at = -1 } = {}) {
  const box = el('div', { position: 'absolute', left: '56px', top: '58px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none', transformOrigin: '0% 50%', zIndex: 5 }, root)
  const dot = el('div', { width: '20px', height: '20px', borderRadius: '50%', background: RED, boxShadow: `0 0 12px ${RED}` }, box)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.22em', color: BONE, fontVariant: 'small-caps', textShadow: '0 2px 10px rgba(6,4,18,0.95)', whiteSpace: 'nowrap' }, box, 'ZODIAC&nbsp;CONFESSIONAL')
  return {
    update(t, out = 1) {
      box.style.display = out > 0.01 && t >= at ? 'flex' : 'none'
      box.style.opacity = String(out)
      dot.style.opacity = Math.floor(t * 1.6) % 2 === 0 ? '1' : '0.25'
    },
  }
}

// ── DOM: the lower third. update(t, { k, name, color, tag }) — k 0…1 slides it in; name / tag can change per shot
export function buildLower(root, { y = 1350 } = {}) {
  const box = el('div', { position: 'absolute', left: '56px', top: y + 'px', display: 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '0px', pointerEvents: 'none', zIndex: 4 }, root)
  const nm = el('div', { font: `900 54px ${INTER}`, letterSpacing: '0.08em', padding: '6px 22px 4px', color: INK, background: GOLD, boxShadow: `6px 6px 0 ${INK}` }, box, '')
  const tg = el('div', { font: `italic 600 44px ${SERIF}`, padding: '6px 22px 10px', color: INK, background: BONE, boxShadow: `6px 6px 0 ${INK}`, maxWidth: '900px', marginLeft: '26px' }, box, '')
  let last = ''
  return {
    update(t, { k = 0, name = '', color = GOLD, tag = '', tagK = 1 } = {}) {
      box.style.display = k > 0.01 ? 'flex' : 'none'
      if (k <= 0.01) return
      const key = name + '|' + tag + '|' + color
      if (key !== last) { nm.innerHTML = name; nm.style.background = color; tg.innerHTML = tag; tg.style.display = tag ? 'block' : 'none'; last = key }
      const e = ease.outCubic(k)
      nm.style.transform = `translateX(${((1 - e) * -900).toFixed(1)}px)`
      tg.style.transform = `translateX(${((1 - ease.outCubic(clamp(k * 1.25 - 0.25)) * tagK) * -1000).toFixed(1)}px)`
    },
  }
}

// ── DOM: captions. lines [{ t, end, who, text, kind }]
//   kind 'sub' (default): the subject's words, big white subtitle on a dark box, "who" tag in sign colour
//   kind 'prod': the off-camera producer: small "PRODUCER (OFF CAMERA)" label + yellow italic on black
//   *word* = accent. Each line pops in at t and out at end.
export function buildCaps(root, lines, { y = 1530 } = {}) {
  const items = lines.map(L => {
    const prod = L.kind === 'prod'
    const wrap = el('div', { position: 'absolute', left: '60px', width: '960px', top: (L.y ?? y) + 'px', display: 'none', flexDirection: 'column', alignItems: 'center', gap: '8px', pointerEvents: 'none', zIndex: 6, transformOrigin: '50% 0%' }, root)
    if (L.who || prod) el('div', { font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: prod ? '#ffe14d' : (L.color || BONE), textShadow: '0 2px 8px rgba(0,0,0,0.95)' }, wrap, prod ? 'PRODUCER&nbsp;(OFF&nbsp;CAMERA)' : L.who)
    const html = L.text.replace(/\*([^*]+)\*/g, (m, w) => `<span style="color:${prod ? '#ffffff' : (L.accent || GOLD)}">${w}</span>`)
    el('div', { font: prod ? `italic 600 58px ${SERIF}` : `800 54px ${INTER}`, lineHeight: '1.12', textAlign: 'center', color: prod ? '#ffe14d' : '#ffffff', background: prod ? '#000' : 'rgba(8,5,18,0.82)', padding: prod ? '10px 26px 14px' : '12px 26px 14px', maxWidth: '960px', boxShadow: prod ? 'none' : `0 0 0 4px ${INK}` }, wrap, html)
    return { L, wrap }
  })
  return {
    update(t) {
      for (const { L, wrap } of items) {
        const on = t >= L.t && t < L.end
        wrap.style.display = on ? 'flex' : 'none'
        if (!on) continue
        const p = easeOutBack(prog(t, L.t, L.t + 0.22), 2.2), o = 1 - ease.inQuad(prog(t, L.end - 0.12, L.end))
        wrap.style.opacity = String(clamp(p * 2) * o)
        wrap.style.transform = `scale(${(0.8 + 0.2 * p).toFixed(3)})`
      }
    },
  }
}

// ── DOM: a big centred slam word (for "FINE." / "BINGO" style moments). update(t, k)
export function buildSlam(root, text, { top = 760, size = 150, color = '#ffffff', rot = -4, font = INTER, bg = null } = {}) {
  const e = el('div', { position: 'absolute', left: '0', width: '1080px', top: top + 'px', textAlign: 'center', font: `900 ${size}px ${font}`, color, letterSpacing: '0.02em', textShadow: `0 8px 0 ${INK}, 0 0 30px rgba(0,0,0,0.6)`, display: 'none', pointerEvents: 'none', zIndex: 7 }, root, bg ? `<span style="background:${bg};padding:0 24px">${text}</span>` : text)
  return {
    update(t, [a, b]) {
      const on = t >= a && t < b
      e.style.display = on ? 'block' : 'none'
      if (!on) return
      const p = prog(t, a, a + 0.18), o = 1 - ease.inQuad(prog(t, b - 0.15, b))
      e.style.opacity = String(o)
      e.style.transform = `rotate(${rot}deg) scale(${(2.2 - 1.2 * ease.outCubic(p)).toFixed(3)})`
    },
  }
}

// ── canvas: a drawn talk card (no branding): a gold-bordered card with a question
export function drawTalkCard(x, cx, cy, w, text, { rot = 0, alpha = 1, k = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  const h = w * 1.4
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; rr(x, -w / 2 + 14, -h / 2 + 18, w, h, 22); x.fill()
  x.fillStyle = INK; rr(x, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 26); x.fill()
  x.fillStyle = '#2a1c55'; rr(x, -w / 2, -h / 2, w, h, 22); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 6; rr(x, -w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 14); x.stroke()
  drawPixelStar(x, 0, -h / 2 + 70, 34, 2, GOLD)
  x.font = `800 ${Math.round(w * 0.065)}px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('TALK CARD', 0, -h / 2 + 124)
  x.font = `italic 600 ${Math.round(w * 0.13)}px ${SERIF}`; x.fillStyle = BONE
  const words = text.split(' '), rows = []; let cur = ''
  for (const wd of words) { const tryS = cur ? cur + ' ' + wd : wd; if (x.measureText(tryS).width > w - 70 && cur) { rows.push(cur); cur = wd } else cur = tryS }
  rows.push(cur)
  rows.forEach((r, i) => x.fillText(r, 0, (i - (rows.length - 1) / 2) * w * 0.15 + 20))
  x.restore()
}

// ── canvas: a simple phone (screen with bubbles). msgs [{ at, side: 'L'|'R', text }]
export function drawPhone(x, t, { cx = 540, cy = 960, w = 420, h = 760, rot = 0, title = '', msgs = [], k = 1, glow = 0, typing = null, screen = '#10162e' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (glow > 0) { const g = x.createRadialGradient(0, 0, 0, 0, 0, w * 1.2); g.addColorStop(0, `rgba(150,200,255,${0.3 * glow})`); g.addColorStop(1, 'rgba(150,200,255,0)'); x.fillStyle = g; x.fillRect(-w * 1.3, -h, w * 2.6, h * 2) }
  x.fillStyle = INK; rr(x, -w / 2 - 10, -h / 2 - 10, w + 20, h + 20, 56); x.fill()
  x.fillStyle = '#2b2440'; rr(x, -w / 2, -h / 2, w, h, 48); x.fill()
  x.fillStyle = screen; rr(x, -w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 36); x.fill()
  x.fillStyle = INK; rr(x, -60, -h / 2 + 26, 120, 26, 13); x.fill()
  if (title) { x.font = `800 ${Math.round(w * 0.07)}px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 96); x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(-w / 2 + 16, -h / 2 + 130, w - 32, 3) }
  // bubbles from the bottom up
  const vis = msgs.filter(m => t >= m.at)
  let yy = h / 2 - 60 - (typing && t >= typing[0] && t < typing[1] ? 70 : 0)
  x.font = `700 ${Math.round(w * 0.06)}px ${INTER}`; x.textBaseline = 'middle'
  for (let i = vis.length - 1; i >= 0 && yy > -h / 2 + 170; i--) {
    const m = vis[i], p = easeOutBack(prog(t, m.at, m.at + 0.25), 2)
    const rows = wrapText(x, m.text, w * 0.62), bh = rows.length * w * 0.075 + 30, bw = Math.max(...rows.map(r => x.measureText(r).width)) + 40
    const bx = m.side === 'R' ? w / 2 - 34 - bw : -w / 2 + 34
    x.save(); x.translate(bx + bw / 2, yy - bh / 2); x.scale(p, p)
    x.fillStyle = m.side === 'R' ? '#4f8dff' : '#3a3550'; rr(x, -bw / 2, -bh / 2, bw, bh, 22); x.fill()
    x.fillStyle = '#fff'; x.textAlign = 'left'
    rows.forEach((r, j) => x.fillText(r, -bw / 2 + 20, -bh / 2 + 15 + w * 0.0375 + j * w * 0.075))
    if (m.read && t >= m.read) { x.font = `700 ${Math.round(w * 0.04)}px ${INTER}`; x.fillStyle = 'rgba(255,255,255,0.6)'; x.textAlign = 'right'; x.fillText(m.readText || 'Read', bw / 2, bh / 2 + 22); x.font = `700 ${Math.round(w * 0.06)}px ${INTER}` }
    x.restore()
    yy -= bh + (m.read ? 46 : 18)
  }
  if (typing && t >= typing[0] && t < typing[1]) {
    x.fillStyle = '#3a3550'; rr(x, -w / 2 + 34, h / 2 - 120, 120, 56, 26); x.fill()
    for (let i = 0; i < 3; i++) { x.fillStyle = `rgba(255,255,255,${0.4 + 0.6 * Math.max(0, Math.sin(t * 8 - i))})`; x.beginPath(); x.arc(-w / 2 + 64 + i * 30, h / 2 - 92, 8, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
}
export function wrapText(x, text, maxW) {
  const words = text.split(' '), rows = []; let cur = ''
  for (const wd of words) { const s = cur ? cur + ' ' + wd : wd; if (x.measureText(s).width > maxW && cur) { rows.push(cur); cur = wd } else cur = s }
  rows.push(cur); return rows
}

// ── sound helpers
export const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
export const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
/** captions: a soft pop as each caption lands, a producer "tick-tick" for producer lines */
export function capCues(lines) {
  return lines.flatMap((L, i) => L.kind === 'prod'
    ? [['tick', +L.t.toFixed(3), 0.05], ['tick', +(L.t + 0.08).toFixed(3), 0.035]]
    : [['pop', +L.t.toFixed(3), NOTE[(i * 3) % 7], 0.032, 0]])
}
/** Pisces sob (a falling pluck pair) */
export const sobCues = (t0, n = 2, gap = 0.32) => Array.from({ length: n }, (_, i) => ['pluck', +(t0 + i * gap).toFixed(3), [987.77, 880, 783.99][i % 3], 0.03, 0.35, 0.5])
