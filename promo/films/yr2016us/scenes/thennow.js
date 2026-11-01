// thennow — the shared look of Star Talk THEN vs NOW (promo/films/STARTALK-THENNOW.md, "The shared look").
// Block F (yr2010first, yr2020video, yr2020baking, yr2020plans, yr2016us) carries an identical copy of this file in
// each folder, so the five look like one format without touching another folder.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.0–7.0   THEN. Bug "THEN vs NOW" (Inter 800 small caps, top-left 56 px). Big top caption "[Thing]" over
//             "in [*then year*]" (the year is a paper sticker, EB Garamond italic). ONE big square "old phone video"
//             plays the era gags live: over-saturated, warm cast, soft blur (half-res upscale), soft vignette, per-frame
//             grain, jittery hand-held framing, a red dot + running timer top-left and a pixel-font date stamp
//             bottom-right ("08·14·2010"). It freezes at T.freezeA.
//   7.0       the one card cut (cardfx; the only candidate). Under it the frame turns clean and the year sticker
//             FLIPS to "2026" with a pop.
//   7.0–12.5  NOW: crisp, the current pixel-star look, a clean rounded frame with a soft glow.
//   12.5–15.6 payoff: the NOW frame shrinks right, the frozen THEN frame drops in as a small taped polaroid
//             top-left, ONE THE STARS box line, and the last line as a big headline.
//
//   makeThenNow(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, accent,                       accent: the last line's accent colour
//     thing: 'First kiss nerves',       the caption's first line;  year: '2010' (the THEN year)
//     A: { draw(px, t, T, assets), date: '02·14·2010', sub },   px: the 880×880 scene canvas (cleared each frame)
//     B: { draw(px, t, T, assets), sub },                       t frozen for A after T.freezeA; B live to the end
//     lines: [{ t, speaker, text, color }]   box lines (≤ 46 chars). Lines before T.cut share a box that closes before
//                                         the cut; lines in NOW share one that closes before the payoff; exactly one
//                                         line at/after T.payLine is the payoff's THE STARS line.
//     last: '*Asking* is romantic.', late: 1   the last line (popText) and how many of its last words land late
//     load?() → assets, comp?(x, t, T, k), cues?(T) → extra sound cues
//   }
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', HEART = '#ff4f86'
export const PAPER = '#f3ecdf', STAMP = '#ff9d3a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
export const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
export const PIS = signStar('pisces')
export { drawStarChar, signStar, STAR, talkHops, easeOutBack, drawPixelStar, clamp, lerp, prog, ease }

export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
export const P = 880                                       // scene canvas size (square)
const CPS = 30

// ── the shared timeline
export const T = {
  black: [0, 0.3], cap: 0.12, bug: 0.35, frameIn: [0.15, 0.6], subA: 0.7,
  freezeA: 6.75, cut: 7.0, flip: [7.04, 7.16, 7.48], frameB: [7.0, 7.3], subB: 7.45,
  subOut: [12.25, 12.45], comp: [12.5, 13.05], payLine: 12.5,
  last: 13.2, lastLand: 13.65,
  out: [15.12, 15.5], bugOut: [15.28, 15.55],
}

// ── frames: centre, scale, rotation
const FC = { cx: 540, cy: 830 }
const NOW_COMP = { cx: 612, cy: 690, s: 0.62 }
const POL = { cx: 252, cy: 548, s: 0.36, rot: -0.1 }

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
export function speech(x, t, cx, cy, t0, text, { col = BONE, ink = INK, size = 40, life = 2, tail = 0, font = INTER, weight = 800, rot = 0 } = {}) {
  const k = pop01(t, t0, 0.24, 2.4) * outK(t, [t0 + life - 0.15, t0 + life])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + size * 1.1, h = size * 1.7
  const b = Math.max(4, Math.round(size / 9))
  x.fillStyle = ink; x.fillRect(-w / 2 - b, -h / 2, w + 2 * b, h); x.fillRect(-w / 2, -h / 2 - b, w, h + 2 * b)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - size * 0.7)
  x.fillStyle = ink; x.fillRect(tx - 3 * b, h / 2 + b - 1, 3 * b, 2.5 * b); x.fillStyle = col; x.fillRect(tx - 2 * b, h / 2 - 1, 2 * b, 2 * b)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, size * 0.06)
  x.restore()
}

/** a little label tag (mono caps on a dark chip), e.g. a counter: pops at t0 */
export function tag(x, t, cx, cy, t0, text, { col = GOLD, bg = 'rgba(27,18,54,0.92)', size = 30, life = 99, rot = 0 } = {}) {
  const k = pop01(t, t0, 0.22, 2.4) * outK(t, [t0 + life - 0.15, t0 + life])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + size * 0.9, h = size * 1.5
  R(x, INK, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8); R(x, bg, -w / 2, -h / 2, w, h)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

// ── the pixel font (3×5) for the date stamp and the timer
const GLYPHS = {
  0: ['XXX', 'X.X', 'X.X', 'X.X', 'XXX'], 1: ['.X.', 'XX.', '.X.', '.X.', 'XXX'], 2: ['XXX', '..X', 'XXX', 'X..', 'XXX'],
  3: ['XXX', '..X', '.XX', '..X', 'XXX'], 4: ['X.X', 'X.X', 'XXX', '..X', '..X'], 5: ['XXX', 'X..', 'XXX', '..X', 'XXX'],
  6: ['XXX', 'X..', 'XXX', 'X.X', 'XXX'], 7: ['XXX', '..X', '.X.', '.X.', '.X.'], 8: ['XXX', 'X.X', 'XXX', 'X.X', 'XXX'],
  9: ['XXX', 'X.X', 'XXX', '..X', 'XXX'], ':': ['.', 'X', '.', 'X', '.'], '·': ['.', '.', 'X', '.', '.'], ' ': ['.', '.', '.', '.', '.'],
  A: ['XXX', 'X.X', 'XXX', 'X.X', 'X.X'], M: ['X.X', 'XXX', 'XXX', 'X.X', 'X.X'], P: ['XXX', 'X.X', 'XXX', 'X..', 'X..'],
}
/** pixel text, anchored at (x0, y0) top-left, or right-aligned when align = 'right' */
export function pixelText(x, str, x0, y0, cell, col, { align = 'left', glow = null } = {}) {
  const chars = [...String(str)]
  const W = chars.reduce((s, c) => s + ((GLYPHS[c] || GLYPHS[' '])[0].length + 1) * cell, -cell)
  let cx = align === 'right' ? x0 - W : align === 'center' ? x0 - W / 2 : x0
  x.save()
  if (glow) { x.shadowColor = glow; x.shadowBlur = cell * 2.2 }
  x.fillStyle = col
  for (const c of chars) {
    const g = GLYPHS[c] || GLYPHS[' ']
    g.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') x.fillRect(Math.round(cx + i * cell), Math.round(y0 + j * cell), cell, cell) }))
    cx += (g[0].length + 1) * cell
  }
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
export function pisces(x, t, px, py, size, tears, { mood = 'wide', look = [-1, 0], pop = 1, alpha = 1, hops, seed = 6, glyph = false, squash = 0 } = {}) {
  const opts = { color: PIS.color, glyph: glyph ? PIS.glyph : null, mood, look, seed, glow: 0.8, pop, alpha, hops, squash }
  drawStarChar(x, px, py, size, t, opts)
  const F = starFrame(px, py, size, t, opts)
  if (tears && pop > 0.3) { x.save(); x.globalAlpha *= alpha; inSprite(x, F, () => tearsCells(x, t, tears)); x.restore() }
}
/** the 2010s side-swept bangs (era prop): a swoop of hair over the star's upper face, in sprite cells */
export function bangs(x, t, F, col = '#5a3524') {
  inSprite(x, F, () => {
    const rows = [[8, 11, 17], [8, 12, 20], [9, 13, 23], [10, 14, 26], [13, 15, 27], [17, 16, 27], [21, 17, 27]]
    x.fillStyle = INK
    for (const [a, j, b] of rows) x.fillRect(a - 0.6, j - 0.6, b - a + 1.2, 1.6)
    for (const [a, j, b] of rows) { x.fillStyle = col; x.fillRect(a, j, b - a, 1) }
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(10, 12, 5, 0.6); x.fillRect(12, 13, 4, 0.6)
  })
}

// ── the bug: "THEN vs NOW" in Inter 800 letter-spaced small caps, top-left, 56 px
function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '16px', height: '16px', background: STAMP, boxShadow: `0 0 0 4px ${INK}`, transform: 'rotate(45deg)' }, box)
  el('div', { font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'THEN&nbsp;vs&nbsp;NOW')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── the big top caption: "[Thing]" over "in [year sticker]"; the sticker flips to 2026
function buildCaption(root, { thing, year, at }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '118px', width: '1080px', display: 'none', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }, root)
  const l1 = el('div', { font: `800 74px ${INTER}`, letterSpacing: '-0.025em', color: BONE, lineHeight: '1.05', whiteSpace: 'nowrap', textShadow: '0 4px 0 rgba(6,4,18,0.75), 0 0 24px rgba(6,4,18,0.8)' }, wrap, thing)
  const row = el('div', { display: 'flex', alignItems: 'center', gap: '22px', marginTop: '4px', perspective: '700px' }, wrap)
  const l2 = el('div', { font: `800 74px ${INTER}`, letterSpacing: '-0.025em', color: BONE, textShadow: '0 4px 0 rgba(6,4,18,0.75), 0 0 24px rgba(6,4,18,0.8)' }, row, 'in')
  const chip = el('div', { padding: '0 30px 6px', borderRadius: '18px', background: '#fffaf0', boxShadow: '0 8px 0 rgba(6,4,18,0.55), 0 0 0 5px rgba(27,18,54,0.9)', transformOrigin: '50% 50%', backfaceVisibility: 'hidden' }, row)
  const yr = el('div', { font: `italic 600 112px ${SERIF}`, lineHeight: '1.0', color: '#d9661f', whiteSpace: 'nowrap' }, chip, year)
  return {
    update(t, out = 1) {
      const on = t >= at && out > 0.01
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const ws = [l1, l2, chip]
      ws.forEach((w, i) => {
        const p = prog(t, at + i * 0.1, at + i * 0.1 + 0.38)
        w.style.opacity = String(clamp(p * 4) * out)
        if (w !== chip) w.style.transform = `translateY(${(1 - easeOutBack(p, 2.6)) * 30}px) scale(${lerp(0.9, 1, out)})`
      })
      // the year sticker: pops in, then FLIPS (rotateX) to 2026
      const [f0, f1, f2] = T.flip
      const pin = prog(t, at + 0.2, at + 0.58)
      let rx = 0, sc = 0.4 + 0.6 * easeOutBack(pin, 3), rot = -3 + 8 * (1 - ease.outCubic(pin))
      const now = t >= f1
      if (t >= f0 && t < f1) rx = 90 * ease.inQuad(prog(t, f0, f1))
      else if (now) { const q = prog(t, f1, f2); rx = -90 * (1 - ease.outCubic(Math.min(1, q * 1.8))); sc = 1 + 0.32 * Math.sin(Math.PI * Math.min(1, q)) * (1 - q * 0.4); rot = lerp(-3, 2.5, ease.outCubic(q)) }
      yr.textContent = now ? '2026' : year
      yr.style.color = now ? '#d6336c' : '#d9661f'
      chip.style.background = now ? '#fffaf0' : '#ffe9c6'
      chip.style.transform = `rotateX(${rx.toFixed(2)}deg) rotate(${rot.toFixed(2)}deg) scale(${(sc * lerp(0.85, 1, out)).toFixed(4)})`
    },
  }
}

// ── small dark sub-stickers under the frame (mono)
const fmt = (s, acc) => s.replace(/\*([^*]+)\*/g, `<span style="color:${acc}">$1</span>`)
function subSticker(root, text, { top = 1300, at, accent = GOLD, rot = 1 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const s = el('div', { padding: '10px 26px 12px', background: 'rgba(27,18,54,0.94)', color: BONE, borderRadius: '12px', font: `700 36px ${MONO}`, letterSpacing: '0.01em', whiteSpace: 'nowrap', boxShadow: '0 6px 0 rgba(6,4,18,0.6)' }, wrap, fmt(text, accent))
  return {
    update(t, out = 1) {
      const p = prog(t, at, at + 0.34)
      const on = t >= at && out > 0.01
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      s.style.opacity = String(clamp(p * 4) * out)
      s.style.transform = `rotate(${(rot + 5 * (1 - ease.outCubic(p))).toFixed(2)}deg) scale(${((0.5 + 0.5 * easeOutBack(p, 2.6)) * lerp(0.8, 1, out)).toFixed(4)})`
    },
  }
}

const rr = (x, x0, y0, w, h, r) => { x.beginPath(); x.moveTo(x0 + r, y0); x.arcTo(x0 + w, y0, x0 + w, y0 + h, r); x.arcTo(x0 + w, y0 + h, x0, y0 + h, r); x.arcTo(x0, y0 + h, x0, y0, r); x.arcTo(x0, y0, x0 + w, y0, r); x.closePath() }

/** the film */
export function makeThenNow(cfg) {
  const LINES = (cfg.lines || []).map(l => ({ speaker: 'THE STARS', ...l }))
  const LA = LINES.filter(l => l.t < T.cut), LB = LINES.filter(l => l.t >= T.cut && l.t < T.payLine - 0.3), LC = LINES.filter(l => l.t >= T.payLine - 0.3)
  const closeAt = (L, lim) => { const tm = lineTimes(L, { cps: CPS }); return r3(Math.min(lim, tm[tm.length - 1].done + 1.7)) }
  const accent = cfg.accent || PINK

  async function build(stage) {
    try {
      await Promise.all(["800 74px Inter", "800 124px Inter", "italic 600 112px 'EB Garamond'", "italic 600 64px 'EB Garamond'", "italic 500 168px 'EB Garamond'", "700 36px 'Space Mono'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const assets = cfg.load ? await cfg.load() : {}
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const mk = (w, h = w) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
    const phA = mk(P), phB = mk(P), lo = mk(P / 2), gA = mk(P), nz = mk(176)
    const ax = phA.getContext('2d'), bx = phB.getContext('2d'), lx = lo.getContext('2d'), gx2 = gA.getContext('2d'), nx = nz.getContext('2d')
    const nzData = nx.createImageData(176, 176)
    const cap = buildCaption(root, { thing: cfg.thing, year: cfg.year, at: T.cap })
    const subA = cfg.A.sub ? subSticker(root, cfg.A.sub, { at: T.subA, accent: STAMP, rot: -1 }) : null
    const subB = cfg.B.sub ? subSticker(root, cfg.B.sub, { at: T.subB, accent: PINK, rot: 1 }) : null
    const last = popText(root, cfg.last, { top: 1060, size: 120, accentSize: 164, at: T.last, late: cfg.late ?? 1, lateAt: T.lastLand, wobble: true, accentColor: accent })
    const boxes = [[LA, T.cut - 0.3], [LB, T.subOut[0]], [LC, T.out[1] - 0.05]].filter(([L]) => L.length).map(([L, lim]) => dialogueBox(root, { lines: L, y: 1446, open: L[0].t - 0.22, close: closeAt(L, lim), cps: CPS }))
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    // the THEN grade: half-res (soft blur), over-saturated, warm cast, vignette, grain, timer + date stamp
    function gradeThen(t) {
      lx.imageSmoothingEnabled = true; lx.clearRect(0, 0, P / 2, P / 2); lx.drawImage(phA, 0, 0, P / 2, P / 2)
      gx2.save()
      gx2.fillStyle = '#120c26'; gx2.fillRect(0, 0, P, P)
      gx2.filter = 'saturate(1.75) contrast(1.08) brightness(1.06) blur(0.6px)'
      gx2.imageSmoothingEnabled = true; gx2.drawImage(lo, 0, 0, P, P)
      gx2.filter = 'none'
      gx2.globalCompositeOperation = 'multiply'; gx2.fillStyle = '#ffd7a6'; gx2.fillRect(0, 0, P, P)
      gx2.globalCompositeOperation = 'screen'; gx2.fillStyle = 'rgba(255,120,40,0.13)'; gx2.fillRect(0, 0, P, P)
      gx2.globalCompositeOperation = 'source-over'
      const v = gx2.createRadialGradient(P / 2, P / 2, P * 0.28, P / 2, P / 2, P * 0.74)
      v.addColorStop(0, 'rgba(40,14,10,0)'); v.addColorStop(1, 'rgba(40,14,10,0.55)')
      gx2.fillStyle = v; gx2.fillRect(0, 0, P, P)
      // grain (blocky, per frame)
      const fr = Math.floor(t * 24), d = nzData.data
      for (let i = 0; i < d.length; i += 4) { const n = hash(i * 0.37 + fr * 13.1) * 255; d[i] = d[i + 1] = d[i + 2] = n; d[i + 3] = 46 }
      nx.putImageData(nzData, 0, 0)
      gx2.globalCompositeOperation = 'overlay'; gx2.imageSmoothingEnabled = false; gx2.drawImage(nz, 0, 0, P, P)
      gx2.globalCompositeOperation = 'source-over'; gx2.imageSmoothingEnabled = true
      // a thin rolling band (old sensor)
      const by = ((t * 0.23) % 1) * (P + 120) - 60
      gx2.fillStyle = 'rgba(255,240,220,0.05)'; gx2.fillRect(0, by, P, 40)
      // timer (red dot + 0:0X) and the date stamp, pixel font
      const sec = Math.floor(Math.max(0, t - T.frameIn[0]))
      if (Math.floor(t * 1.6) % 2 === 0 || t >= T.freezeA) { gx2.fillStyle = '#ff3b30'; gx2.beginPath(); gx2.arc(46, 48, 11, 0, Math.PI * 2); gx2.fill() }
      pixelText(gx2, `0:${String(sec).padStart(2, '0')}`, 68, 36, 5, '#fff4e4', { glow: 'rgba(0,0,0,0.6)' })
      pixelText(gx2, cfg.A.date, P - 34, P - 62, 6, STAMP, { align: 'right', glow: 'rgba(255,120,40,0.95)' })
      gx2.restore()
    }

    function drawThenFrame(cx, cy, s, rot, alpha) {
      x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
      const h = P / 2
      x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillRect(-h + 16, -h + 22, P, P)
      x.fillStyle = '#0b0815'; rr(x, -h - 14, -h - 14, P + 28, P + 28, 20); x.fill()
      x.drawImage(gA, -h, -h, P, P)
      x.restore()
    }
    function drawNowFrame(cx, cy, s, alpha, flash) {
      x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(s, s)
      const h = P / 2
      const g = x.createRadialGradient(0, 0, h * 0.6, 0, 0, h * 1.5)
      g.addColorStop(0, 'rgba(255,190,220,0.22)'); g.addColorStop(1, 'rgba(255,190,220,0)')
      x.fillStyle = g; x.fillRect(-h * 1.6, -h * 1.6, h * 3.2, h * 3.2)
      x.fillStyle = 'rgba(6,4,18,0.5)'; rr(x, -h + 14, -h + 20, P, P, 30); x.fill()
      x.fillStyle = BONE; rr(x, -h - 10, -h - 10, P + 20, P + 20, 36); x.fill()
      x.save(); rr(x, -h, -h, P, P, 28); x.clip()
      x.drawImage(phB, -h, -h, P, P)
      if (flash > 0) { x.fillStyle = `rgba(255,255,255,${flash})`; x.fillRect(-h, -h, P, P) }
      x.restore()
      x.restore()
    }
    function drawPolaroid(F, k) {
      if (k <= 0.01) return
      const FW = P + 60, FH = P + 190
      x.save(); x.translate(F.cx, F.cy); x.rotate(F.rot); x.scale(F.s * k, F.s * k)
      x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-FW / 2 + 18, -FH / 2 + 24, FW, FH)
      x.fillStyle = INK; x.fillRect(-FW / 2 - 8, -FH / 2 - 8, FW + 16, FH + 16)
      x.fillStyle = PAPER; x.fillRect(-FW / 2, -FH / 2, FW, FH)
      x.drawImage(gA, -P / 2, -FH / 2 + 30, P, P)
      x.font = `italic 600 110px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2a2350'
      x.fillText(cfg.year, 0, FH / 2 - 78)
      x.save(); x.translate(0, -FH / 2 - 6); x.rotate(0.05)
      x.fillStyle = 'rgba(255,236,190,0.8)'; x.fillRect(-170, -46, 340, 92); x.fillStyle = 'rgba(255,255,255,0.28)'; x.fillRect(-170, -46, 340, 16)
      x.restore()
      x.restore()
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3))
        drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.65, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
        const out = popOut(t, T.out)
        const comp = ease.inOutCubic(prog(t, ...T.comp))
        const tA = Math.min(t, T.freezeA)
        // THEN: drawn live until the freeze, graded into gA (kept for the polaroid)
        if (t < T.cut + 0.1 || t >= T.comp[0] - 0.05) { ax.clearRect(0, 0, P, P); cfg.A.draw(ax, tA, T, assets); gradeThen(tA) }
        if (t >= T.cut - 0.1) { bx.clearRect(0, 0, P, P); cfg.B.draw(bx, t, T, assets) }
        if (t < T.cut) {
          const k = easeOutBack(prog(t, ...T.frameIn), 1.5)
          // hand-held jitter (steps at 12 fps) + a slow sway; still after the freeze
          const live = t < T.freezeA ? 1 : 0, fr = Math.floor(t * 12)
          const jx = live * ((hash(fr) - 0.5) * 9 + 5 * Math.sin(t * 1.7)), jy = live * ((hash(fr + 71) - 0.5) * 7 + 4 * Math.sin(t * 1.3 + 1))
          const jr = live * ((hash(fr + 13) - 0.5) * 0.008 + 0.006 * Math.sin(t * 0.9))
          drawThenFrame(FC.cx + jx, FC.cy + jy, k * 1.0, jr + (1 - k) * 0.15, 1)
          if (t >= T.freezeA) {   // pause marker on the freeze
            const pk = pop01(t, T.freezeA, 0.2, 2.5)
            x.save(); x.globalAlpha = 0.85; R(x, BONE, FC.cx - 38 * pk, FC.cy - 46 * pk, 26 * pk, 92 * pk); R(x, BONE, FC.cx + 12 * pk, FC.cy - 46 * pk, 26 * pk, 92 * pk); x.restore()
          }
        } else {
          const kb = easeOutBack(prog(t, ...T.frameB), 1.3)
          const cx = lerp(FC.cx, NOW_COMP.cx, comp), cy = lerp(FC.cy, NOW_COMP.cy, comp), s = lerp(lerp(0.92, 1, kb), NOW_COMP.s, comp) * out
          const flash = t < T.cut + 0.35 ? 0.6 * (1 - prog(t, T.cut, T.cut + 0.35)) : 0
          drawNowFrame(cx, cy, s, 1, flash)
          if (comp > 0) {
            const pk = easeOutBack(prog(t, T.comp[0] + 0.12, T.comp[1] + 0.05), 1.6) * out
            const wob = 0.06 * Math.exp(-Math.max(0, t - T.comp[1]) * 5) * Math.sin((t - T.comp[1]) * 16)
            drawPolaroid({ ...POL, rot: POL.rot + wob + (1 - pk) * -0.4, cx: lerp(-120, POL.cx, Math.min(1, pk)) }, Math.min(1.05, pk))
            if (cfg.comp) cfg.comp(x, t, T, out)
            sparkles(x, t, 540, 1180, T.lastLand + 0.02, 12, 320, 1, [GOLD, accent, BONE])
          }
        }
        cap.update(t, outK(t, [T.out[0], T.out[1]]))
        if (subA) subA.update(t, t < T.cut ? 1 : 0)
        if (subB) subB.update(t, outK(t, T.subOut))
        for (const b of boxes) b.update(t)
        last.update(t, outK(t, [T.out[0] + 0.05, T.out[1]]))
        bug.update(t, outK(t, T.bugOut))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // ONE candidate cut: the switch from THEN to NOW
  const CUTS = [T.cut]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = cfg.notes || [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73, 1244.51]
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ['whoosh', T.frameIn[0], 0.4, 0.04], ...wordPops(T.cap, 3, 0.1, 0), ['pop', T.bug + 0.06, 830.61, 0.03, -0.4],
    ['tick', T.frameIn[1], 0.04], ['pluck', T.frameIn[1] + 0.05, 1760, 0.02, 0.15, -0.3],       // the old phone's record beep
    ...(cfg.A.sub ? [['tick', T.subA + 0.05, 0.03]] : []),
    ['tick', T.freezeA, 0.05], ['pop', T.freezeA + 0.02, 440, 0.03, 0],                         // pause
    ['whoosh', T.flip[0], 0.2, 0.03], ['pop', T.flip[1], 1108.73, 0.05, 0.1], ['pop', T.flip[1] + 0.07, 1661.22, 0.04, 0.1],
    ['bell', T.flip[1] + 0.05, 2217.46, 0.03, 1.0, 0.2], ['glitter', T.flip[1], T.flip[1] + 0.45],
    ...(cfg.B.sub ? [['tick', T.subB + 0.05, 0.03]] : []),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.comp[0], 0.5, 0.04], ['tick', T.comp[1] - 0.05, 0.04], ['pop', T.comp[1], 932.33, 0.03, -0.4],
    ...wordPops(T.last, 2, 0.1, 1, 0.03), ['pop', T.lastLand, 1108.73, 0.05, 0], ['pop', T.lastLand + 0.08, 1396.91, 0.04, 0],
    ['bell', T.lastLand + 0.05, 2217.46, 0.03, 1.2, 0], ['glitter', T.lastLand, T.lastLand + 0.5],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T }
}
