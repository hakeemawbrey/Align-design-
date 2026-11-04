// thennow (holidays) — the shared look of THEN vs NOW: HOLIDAYS 2016 vs 2026 (series `hol`, nhve01–nhve24,
// rows in promo/films/next30/b18.md). Forked from promo/films/yraries/scenes/thennow.js (STARTALK-THENNOW.md,
// "The shared look"); every b18 episode imports this file from nhve01. Changes from the original:
//   · the bug reads "THEN vs NOW: HOLIDAYS";
//   · frame 0 is the thumbnail: no fade from black, the caption, the bug and the THEN panel are already in at t = 0;
//   · light pixel snow drifts over the night sky behind the panels.
// The format (18 s, story 0–15.6, then the 2.4 s short end card):
//   0–6.71    THEN: the "old phone video" grade (soft, saturated, warm, vignetted, grainy, jittery, date stamp).
//   6.71      the switch to NOW (the panel's own pop, no card cut); the year sticker flips to 2026 at 6.98.
//   6.71–12.8 NOW: clean and crisp. 12.8–15.6 payoff: THEN polaroid, one THE STARS line, the last line.
//   makeThenNow(cfg) → { DURATION, SCENES, CUES, T }; cfg = { id, thing, then, stamp, accent, A: {draw}, B: {draw},
//   lines: [{ t, speaker, text }], last, cues?(T) }. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', HEART = '#ff4f86'
export const PAPER = '#f3ecdf', OLD = '#ffb04a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
export const PIS = signStar('pisces')
export { drawStarChar, signStar, STAR, talkHops, easeOutBack, drawPixelStar, clamp, lerp, prog, ease }

export const DURATION = 18                               // 15.6 story + the 2.4 s short end card (CHANGE 4 Nov)
export const STORY_END = DURATION - ENDCARD_SHORT_LEN    // 15.6
export const SW = 900, SH = 1060                           // the scene canvas (the video panel)
const CPS = 30

// ── the shared timeline (108 bpm grid: the cut on beat 11, the payoff on beat 22, the last line lands on beat 24)
export const T = {
  black: [-1, -0.5], cap: -0.6, bug: -0.6, frameIn: [-0.7, -0.2],
  cut: 6.71, flip: 6.98, frameB: [6.71, 7.05],
  comp: [12.78, 13.3],
  last: 13.38, lastLand: 13.93,
  out: [15.12, 15.5], bugOut: [15.28, 15.55],
}

// ── panel placement: centre, scale, rotation
const PANEL = { cx: 540, cy: 852 }
const NOW_PAY = { cx: 604, cy: 716, s: 0.68, rot: 0.012 }
const POL_PAY = { cx: 226, cy: 520, s: 0.36, rot: -0.1 }

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
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK], size = 26) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

export const HEART_BM = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** little hearts floating up from (cx, cy) from t0 on, for `life` s */
export function hearts(x, t, cx, cy, t0, { n = 5, life = 1.6, cell = 6, spread = 120, seed = 1, col = HEART } = {}) {
  for (let i = 0; i < n; i++) {
    const born = t0 + i * 0.16, tt = t - born
    if (tt < 0 || tt > life) continue
    const p = tt / life
    const hx = cx + Math.sin(i * 2.3 + seed) * spread * 0.5 + Math.sin(tt * 4 + i) * 10, hy = cy - p * 170
    drawBits(x, HEART_BM, { H: col }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, tt * 5)), { alpha: 1 - ease.inQuad(p) })
  }
}

/** a pixel speech bubble; pops at t0, lives `life` s. tail: -1 left · 0 centre · 1 right */
export function speech(x, t, cx, cy, t0, text, { col = BONE, ink = INK, size = 40, life = 2, tail = 0, font = INTER, weight = 800, rot = 0, shake = 0 } = {}) {
  const k = pop01(t, t0, 0.24, 2.4) * outK(t, [t0 + life - 0.15, t0 + life])
  if (k <= 0.01 || t < t0) return
  const sx = shake ? shake * Math.sin(t * 61) : 0, sy = shake ? shake * Math.cos(t * 47) : 0
  x.save(); x.translate(cx + sx, cy + sy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const rows = String(text).split('\n')
  const w = Math.max(...rows.map(r => x.measureText(r).width)) + size * 1.1, h = size * (0.7 + 1.08 * rows.length)
  const b = Math.max(4, Math.round(size / 9))
  x.fillStyle = ink; x.fillRect(-w / 2 - b, -h / 2, w + 2 * b, h); x.fillRect(-w / 2, -h / 2 - b, w, h + 2 * b)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - size * 0.7)
  x.fillStyle = ink; x.fillRect(tx - 3 * b, h / 2 + b - 1, 3 * b, 2.5 * b); x.fillStyle = col; x.fillRect(tx - 2 * b, h / 2 - 1, 2 * b, 2 * b)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  rows.forEach((r, i) => x.fillText(r, 0, size * 0.06 + (i - (rows.length - 1) / 2) * size * 1.08))
  x.restore()
}

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
/** ♓ Pisces, crying (tears 0–3) */
export function pisces(x, t, px, py, size, tears, { mood = 'wide', look = [-1, 0], pop = 1, alpha = 1, hops, seed = 6, glyph = false } = {}) {
  const opts = { color: PIS.color, glyph: glyph ? PIS.glyph : null, mood, look, seed, glow: 0.8, pop, alpha, hops }
  drawStarChar(x, px, py, size, t, opts)
  const F = starFrame(px, py, size, t, opts)
  if (tears && pop > 0.3) { x.save(); x.globalAlpha *= alpha; inSprite(x, F, () => tearsCells(x, t, tears)); x.restore() }
}
/** side-swept bangs (the 2016 hair), drawn on a star's sprite frame: a fringe swooping over the left eye */
const BANG_ROWS = [[10, 15, 22], [11, 13, 23], [12, 11, 23], [13, 9, 22], [14, 8, 19], [15, 8, 15], [16, 8, 12], [17, 9, 10]]
export function bangs(x, F, col = '#4a2c1a') {
  inSprite(x, F, () => {
    x.fillStyle = INK
    for (const [r, a, b] of BANG_ROWS) x.fillRect(a - 1, r - 1, b - a + 3, 3)
    x.fillStyle = col
    for (const [r, a, b] of BANG_ROWS) x.fillRect(a, r, b - a + 1, 1)
    x.fillStyle = 'rgba(255,220,180,0.35)'; x.fillRect(14, 11, 7, 1); x.fillRect(11, 13, 5, 1)
  })
}

// ── the pixel date stamp (3×5 digits), burned into the THEN footage
const DIG = {
  0: ['111', '101', '101', '101', '111'], 1: ['010', '110', '010', '010', '111'], 2: ['111', '001', '111', '100', '111'],
  3: ['111', '001', '111', '001', '111'], 4: ['101', '101', '111', '001', '001'], 5: ['111', '100', '111', '001', '111'],
  6: ['111', '100', '111', '101', '111'], 7: ['111', '001', '010', '010', '010'], 8: ['111', '101', '111', '101', '111'],
  9: ['111', '101', '111', '001', '111'], '·': ['0', '0', '1', '0', '0'], ':': ['0', '1', '0', '1', '0'], ' ': ['0', '0', '0', '0', '0'],
}
export function pixelText(x, text, right, bottom, cell, col = '#ff9d3a') {
  const gl = [...text].map(c => DIG[c] || DIG[' '])
  const w = gl.reduce((s, g) => s + (g[0].length + 1) * cell, -cell)
  let px = right - w
  const top = bottom - 5 * cell
  x.save(); x.shadowColor = 'rgba(255,110,30,0.95)'; x.shadowBlur = cell * 1.6; x.fillStyle = col
  for (const g of gl) {
    for (let j = 0; j < 5; j++) for (let i = 0; i < g[0].length; i++) if (g[j][i] === '1') x.fillRect(px + i * cell, top + j * cell, cell - 0.5, cell - 0.5)
    px += (g[0].length + 1) * cell
  }
  x.restore()
}

// ── the show bug: "THEN vs NOW", Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { font: `800 32px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'THEN&nbsp;vs&nbsp;NOW:&nbsp;HOLIDAYS')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── the big top caption: "[Thing] in" + a year sticker that flips from the old year to 2026
function buildCaption(root, { thing, then, accent }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '138px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const row = el('div', { display: 'flex', alignItems: 'center', gap: '22px', transformOrigin: '50% 50%', whiteSpace: 'nowrap' }, wrap)
  el('div', { font: `800 76px ${INTER}`, letterSpacing: '-0.02em', color: BONE, textShadow: '0 4px 0 rgba(6,4,18,0.75), 0 0 22px rgba(6,4,18,0.8)' }, row, thing)
  const chip = el('div', { position: 'relative', padding: '0 26px 6px', borderRadius: '18px', font: `italic 600 104px ${SERIF}`, lineHeight: '1.08', transformOrigin: '50% 50%' }, row)
  const yearThen = el('span', { color: INK }, chip, then), yearNow = el('span', { color: '#e0457b', display: 'none' }, chip, '2026')
  // fit to the frame
  wrap.style.display = 'flex'
  const wPx = row.scrollWidth || 900
  const fit = Math.min(1, 960 / wPx)
  wrap.style.display = 'none'
  return {
    // chip centre in frame px (for sparkles)
    chipAt: () => ({ x: 540 + fit * (wPx / 2 - chip.offsetWidth / 2), y: 138 + fit * 58 }),
    update(t, out = 1) {
      const on = t >= T.cap && out > 0.01
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, T.cap, T.cap + 0.38)
      row.style.opacity = String(clamp(p * 4) * out)
      row.style.transform = `scale(${(fit * (0.4 + 0.6 * easeOutBack(p, 3)) * lerp(0.85, 1, out)).toFixed(4)}) rotate(${(-1.2 + 5 * (1 - ease.outCubic(p))).toFixed(2)}deg)`
      // the flip: squash shut, swap, spring open bigger, settle
      const now = t >= T.flip
      yearThen.style.display = now ? 'none' : 'inline'; yearNow.style.display = now ? 'inline' : 'none'
      chip.style.background = now ? '#fffaf0' : OLD
      chip.style.boxShadow = now ? `0 8px 0 rgba(6,4,18,0.55), 0 0 0 5px ${INK}, 0 0 36px rgba(255,143,177,0.55)` : `0 8px 0 rgba(6,4,18,0.55), 0 0 0 5px ${INK}`
      let sy = 1, sc = 1, rot = now ? 2 : -3
      if (t > T.flip - 0.14 && t < T.flip) sy = Math.cos((Math.PI / 2) * prog(t, T.flip - 0.14, T.flip))
      if (now) { const q = prog(t, T.flip, T.flip + 0.42); sy = easeOutBack(q, 2.6); sc = 1 + 0.28 * Math.sin(Math.PI * Math.min(1, q * 1.3)) * (1 - q * 0.5); rot += 8 * (1 - ease.outCubic(q)) }
      chip.style.transform = `rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)}, ${(sc * Math.max(0.02, sy)).toFixed(4)})`
    },
  }
}

// ── the panels
function roundRect(x, l, t, w, h, r) { x.beginPath(); x.roundRect ? x.roundRect(l, t, w, h, r) : x.rect(l, t, w, h) }

/** the "old phone video" grade: src (SW×SH scene) → dst (SW×SH), soft, saturated, warm, vignetted, grainy, stamped */
function makeGrader(stamp) {
  const lo = document.createElement('canvas'); lo.width = SW / 2.5; lo.height = SH / 2.5
  const lx = lo.getContext('2d')
  // four frames of chunky grain
  const rnd = rng(2016)
  const grains = Array.from({ length: 4 }, () => {
    const c = document.createElement('canvas'); c.width = 150; c.height = 177
    const g = c.getContext('2d'), im = g.createImageData(150, 177)
    for (let i = 0; i < im.data.length; i += 4) { const v = 128 + (rnd() - 0.5) * 230; im.data[i] = v; im.data[i + 1] = v * 0.96; im.data[i + 2] = v * 0.88; im.data[i + 3] = 255 }
    g.putImageData(im, 0, 0); return c
  })
  return function grade(dst, src, t) {
    lx.imageSmoothingEnabled = true
    lx.clearRect(0, 0, lo.width, lo.height); lx.drawImage(src, 0, 0, lo.width, lo.height)
    dst.save()
    dst.clearRect(0, 0, SW, SH)
    dst.imageSmoothingEnabled = true
    dst.filter = 'saturate(1.75) contrast(1.12) brightness(1.04)'
    dst.drawImage(lo, 0, 0, SW, SH)
    dst.filter = 'none'
    // warm cast + lifted warm blacks
    dst.globalCompositeOperation = 'multiply'; dst.fillStyle = '#ffd6a0'; dst.fillRect(0, 0, SW, SH)
    dst.globalCompositeOperation = 'screen'; dst.fillStyle = 'rgba(120,52,20,0.22)'; dst.fillRect(0, 0, SW, SH)
    // grain
    dst.globalCompositeOperation = 'overlay'; dst.globalAlpha = 0.42; dst.imageSmoothingEnabled = false
    const gi = Math.floor(t * 15) % 4, ox = (Math.floor(t * 15) * 37) % 40
    dst.drawImage(grains[gi], -ox, -ox * 0.7, SW + 40, SH + 40)
    dst.globalAlpha = 1; dst.globalCompositeOperation = 'source-over'; dst.imageSmoothingEnabled = true
    // soft vignette
    const v = dst.createRadialGradient(SW / 2, SH / 2, SH * 0.28, SW / 2, SH / 2, SH * 0.72)
    v.addColorStop(0, 'rgba(40,14,4,0)'); v.addColorStop(1, 'rgba(40,14,4,0.62)')
    dst.fillStyle = v; dst.fillRect(0, 0, SW, SH)
    // a rolling soft band (old sensor)
    const by = ((t * 0.35) % 1.3 - 0.15) * SH
    const bg = dst.createLinearGradient(0, by - 60, 0, by + 60)
    bg.addColorStop(0, 'rgba(255,230,190,0)'); bg.addColorStop(0.5, 'rgba(255,230,190,0.06)'); bg.addColorStop(1, 'rgba(255,230,190,0)')
    dst.fillStyle = bg; dst.fillRect(0, by - 60, SW, 120)
    // the date stamp
    pixelText(dst, stamp, SW - 34, SH - 34, 7)
    dst.restore()
  }
}

// a handheld jitter for the THEN footage: quick steps + a slow sway (pure f(t))
function jitter(t) {
  const n = Math.floor(t * 12)
  const h = k => { const s = Math.sin(n * 12.9898 + k * 78.233) * 43758.5453; return (s - Math.floor(s)) * 2 - 1 }
  return { dx: 5 * h(1) + 7 * Math.sin(t * 1.7), dy: 4 * h(2) + 5 * Math.sin(t * 2.3 + 1), rot: 0.004 * h(3) + 0.004 * Math.sin(t * 1.3) }
}

function drawThenPanel(x, img, t, k) {
  if (k <= 0.01) return
  const j = jitter(t)
  x.save(); x.translate(PANEL.cx, PANEL.cy); x.scale(k, k); x.rotate(-0.008 + (1 - k) * 0.12)
  // a chunky dark bezel (older phone)
  x.fillStyle = 'rgba(6,4,18,0.5)'; roundRect(x, -SW / 2 - 4, -SH / 2 + 18, SW + 28, SH + 22, 26); x.fill()
  x.fillStyle = '#2a2633'; roundRect(x, -SW / 2 - 16, -SH / 2 - 16, SW + 32, SH + 32, 30); x.fill()
  x.fillStyle = '#3a3546'; roundRect(x, -SW / 2 - 16, -SH / 2 - 16, SW + 32, 10, 6); x.fill()
  x.save(); roundRect(x, -SW / 2, -SH / 2, SW, SH, 14); x.clip()
  x.translate(j.dx, j.dy); x.rotate(j.rot); x.scale(1.035, 1.035)
  x.drawImage(img, -SW / 2, -SH / 2, SW, SH)
  x.restore()
  x.restore()
}
function drawNowPanel(x, img, F, k, glow = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(F.cx, F.cy); x.rotate(F.rot); x.scale(F.s * k, F.s * k)
  x.save(); x.shadowColor = `rgba(255,200,140,${0.55 * glow})`; x.shadowBlur = 60
  x.fillStyle = BONE; roundRect(x, -SW / 2 - 7, -SH / 2 - 7, SW + 14, SH + 14, 36); x.fill(); x.restore()
  x.save(); roundRect(x, -SW / 2, -SH / 2, SW, SH, 30); x.clip(); x.drawImage(img, -SW / 2, -SH / 2, SW, SH); x.restore()
  x.restore()
}
function drawPolaroid(x, img, F, label, tape) {
  if (F.s <= 0.01) return
  const B = 36, LB = 150, w = SW + 2 * B, h = SH + B + LB
  x.save(); x.translate(F.cx, F.cy); x.rotate(F.rot); x.scale(F.s, F.s)
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-w / 2 + 30, -h / 2 + 40, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = PAPER; x.fillRect(-w / 2, -h / 2, w, h)
  x.drawImage(img, -SW / 2, -h / 2 + B, SW, SH)
  x.font = `italic 600 124px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2a2350'
  x.fillText(label, 0, h / 2 - LB / 2 + 4)
  if (tape > 0) {
    x.save(); x.translate(0, -h / 2 - 4); x.rotate(0.06)
    x.fillStyle = `rgba(255,236,190,${0.8 * tape})`; x.fillRect(-190, -60, 380, 120)
    x.fillStyle = `rgba(255,255,255,${0.25 * tape})`; x.fillRect(-190, -60, 380, 22)
    x.restore()
  }
  x.restore()
}

/** slow pixel snow over the night sky (behind the panels) */
function skySnow(x, t) {
  x.save()
  for (let i = 0; i < 46; i++) {
    const h = Math.sin(i * 91.7) * 43758.5453, r = h - Math.floor(h)
    const sp = 38 + 40 * r, sz = 4 + Math.floor(r * 3) * 2
    const y = ((t * sp + i * 173) % 2040) - 60
    const xx = (i * 211 + 30 * Math.sin(t * 0.9 + i)) % 1080
    x.globalAlpha = 0.35 + 0.4 * r
    x.fillStyle = '#f4f1ff'; x.fillRect(Math.round(xx), Math.round(y), sz, sz)
  }
  x.restore()
}

/** the film */
export function makeThenNow(cfg) {
  const LINES = (cfg.lines || []).map(l => ({ speaker: 'THE STARS', ...l }))
  const LA = LINES.filter(l => l.t < T.cut), LB = LINES.filter(l => l.t >= T.cut && l.t < T.comp[0]), LC = LINES.filter(l => l.t >= T.comp[0])
  const closeAt = (L, lim) => { const tm = lineTimes(L, { cps: CPS }); return r3(Math.min(lim, tm[tm.length - 1].done + 1.7)) }
  const accent = cfg.accent || PINK

  async function build(stage) {
    try {
      await Promise.all(["800 76px Inter", "800 32px Inter", "800 120px Inter", "italic 600 104px 'EB Garamond'", "italic 500 150px 'EB Garamond'", "700 34px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const mk = () => { const c = document.createElement('canvas'); c.width = SW; c.height = SH; return c }
    const phA = mk(), phB = mk(), oldA = mk(), ax = phA.getContext('2d'), bx = phB.getContext('2d'), ox = oldA.getContext('2d')
    const grade = makeGrader(cfg.stamp)
    const cap = buildCaption(root, { thing: cfg.thing, then: cfg.then, accent })
    const last = popText(root, cfg.last, { top: 1112, size: 108, accentSize: 146, at: T.last, late: 1, lateAt: T.lastLand, wobble: true, accentColor: accent })
    const boxes = [[LA, T.cut - 0.3], [LB, T.comp[0] - 0.05], [LC, T.out[0] + 0.3]].filter(([L]) => L.length)
      .map(([L, lim], i) => dialogueBox(root, { lines: L, y: 1446, open: L[0].t - 0.22, close: i === 2 ? lim : closeAt(L, lim), cps: CPS }))
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3))
        drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.65, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
        skySnow(x, t)
        const out = popOut(t, T.out)
        const comp = ease.inOutCubic(prog(t, ...T.comp))
        // THEN: drawn live until the cut, then frozen (it comes back as the payoff polaroid)
        const tA = Math.min(t, T.cut)
        if (t < T.cut || t > T.comp[0] - 0.05) { ax.clearRect(0, 0, SW, SH); cfg.A.draw(ax, tA, T); grade(ox, phA, tA) }
        if (t >= T.cut - 0.05) { bx.clearRect(0, 0, SW, SH); cfg.B.draw(bx, t, T) }
        if (t < T.cut) {
          drawThenPanel(x, oldA, t, easeOutBack(prog(t, ...T.frameIn), 1.5))
        } else {
          const kb = easeOutBack(prog(t, ...T.frameB), 1.3)
          const F = { cx: lerp(PANEL.cx, NOW_PAY.cx, comp), cy: lerp(PANEL.cy, NOW_PAY.cy, comp), s: lerp(lerp(0.92, 1, kb), NOW_PAY.s, comp), rot: lerp(0, NOW_PAY.rot, comp) }
          drawNowPanel(x, phB, F, out)
          if (comp > 0) {
            // the THEN polaroid drops in from the top-left, taped
            const kp = easeOutBack(prog(t, T.comp[0] + 0.1, T.comp[1] + 0.1), 1.4)
            const P = { cx: lerp(-260, POL_PAY.cx, kp), cy: lerp(260, POL_PAY.cy, kp), s: POL_PAY.s * out, rot: lerp(-0.5, POL_PAY.rot, kp) }
            drawPolaroid(x, oldA, P, cfg.then, prog(t, T.comp[1], T.comp[1] + 0.2))
            sparkles(x, t, 540, 1240, T.lastLand + 0.02, 12, 330, 1, [GOLD, accent, BONE])
          }
        }
        cap.update(t, outK(t, [T.out[0] + 0.05, T.out[1]]))
        if (t > T.flip && t < T.flip + 0.8) { const c = cap.chipAt(); sparkles(x, t, c.x, c.y, T.flip, 10, 150, 0.5, [GOLD, '#ff8fb1', BONE], 24) }
        for (const b of boxes) b.update(t)
        last.update(t, outK(t, [T.out[0] + 0.05, T.out[1]]))
        bug.update(t, outK(t, T.bugOut))
        drawGrain(gx, t)
      },
    }
  }

  // no card-back cut (CHANGE 4 Nov): the switch from THEN to NOW is the panel's own pop + a whoosh
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ['pluck', 0.04, 659.25, 0.03, 0.4, 0], ['bell', 0.06, 1567.98, 0.018, 1.0, 0.2],
    // the year flip
    ['tick', r3(T.flip - 0.12), 0.05], ['pop', T.flip, 1046.5, 0.05, 0.2], ['pop', r3(T.flip + 0.07), 1567.98, 0.04, 0.2],
    ['bell', r3(T.flip + 0.1), 2093, 0.028, 1.0, 0.2], ['glitter', T.flip, r3(T.flip + 0.45)],
    ...talkCues(LINES, { cps: CPS }),
    // the payoff: panel shrinks, polaroid drops in, the last line
    ['whoosh', T.comp[0], 0.5, 0.04], ['tick', r3(T.comp[1] + 0.02), 0.05], ['pop', r3(T.comp[1] + 0.05), 880, 0.03, -0.4],
    ...wordPops(T.last, 2, 0.1, 1, 0.03), ['pop', T.lastLand, 1046.5, 0.05, 0], ['pop', r3(T.lastLand + 0.08), 1318.51, 0.04, 0],
    ['bell', r3(T.lastLand + 0.05), 2093, 0.03, 1.2, 0], ['glitter', T.lastLand, r3(T.lastLand + 0.5)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ['whoosh', r3(T.cut - 0.12), 0.35, 0.045], ['tick', T.cut, 0.06],
    ...endcardCues(STORY_END, { short: true }),
  ]
  return { DURATION, SCENES, CUES, T }
}
