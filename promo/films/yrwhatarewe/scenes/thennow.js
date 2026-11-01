// thennow — the shared look of STAR TALK THEN vs NOW (promo/films/STARTALK-THENNOW.md, "The shared look"), Block C:
// yraqua, yrpisces, yrfirstdate, yrtexting, yrwhatarewe. Every film carries an identical copy of this file in its own
// folder, so the five look like one format without touching another folder.
//
// The format (20 s: story 0–15.6, then the shared end card):
//   bug       "THEN vs NOW" (Inter 800 small caps, letter-spaced) top-left, 56 px, the whole story.
//   caption   "[Thing]" / "in [year]" big at the top; the year is a sticker that FLIPS from the old year to 2026 (T.flip).
//   0–6.85    THEN: the scene plays as an old phone video: 15 fps, jittery handheld framing, over-saturated, a little
//             blurry, a warm cast, a soft vignette, video noise, a light leak, and a pixel-font date stamp bottom-right
//             (e.g. "08·14·2016"). The last 0.3 s tears like a glitchy clip ending (and the music tape-stops).
//   6.85      the one card cut (cardfx; the only candidate). Under it: NOW.
//   6.85–12.3 NOW: the same scene, clean and crisp (the current pixel-star look).
//   12.3–15.6 payoff: the NOW video shrinks into a big framed panel (tagged "2026"), the THEN clip lands as a small
//             taped polaroid top-left, one THE STARS box line types at the bottom, and the last line pops big between.
//
//   makeThenNow(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, thing: 'Aquarius dating', then: 2016, date: '03·12·2016', accent,
//     A: { draw(x, t, T, assets) },   THEN scene on a 1080×1920 canvas (cleared to the night sky first); t is quantized
//                                     to 15 fps. Keep the action inside y 420–1500 (that square becomes the polaroid).
//     B: { draw(x, t, T, assets) },   NOW scene, same canvas, live to the end (the same square becomes the panel).
//     line: 'text with *accent*',     THE STARS' one box line in the payoff (≤ 30 chars so it holds ≥ 1.5 s)
//     last: 'Weird, *together*.',     the last line (popText: Inter 800 + one italic accent)
//     load?() → assets,  cues?(T) → extra sound cues
//   }
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar, STAR } from '../../startalk.js'
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
export const PIS = signStar('pisces')
export { drawStarChar, signStar, STAR, easeOutBack, drawPixelStar, clamp, lerp, prog, ease }

export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
export const FPS_THEN = 15
const CPS = 30
const W = 1080, H = 1920
export const CROP = { x: 0, y: 420, s: 1080 }             // the square that becomes the polaroid / the NOW panel

// ── the shared timeline
export const T = {
  black: [0, 0.3], cap: 0.12, bug: 0.35, stamp: 0.5,
  tear: [6.55, 6.85], tapeStop: 6.45, cut: 6.85, flip: 7.1,
  capOut: [12.18, 12.38], comp: [12.3, 12.85], pol: [12.5, 12.95],
  line: 12.5, last: 13.25, lastLand: 13.75,
  out: [15.12, 15.5], bugOut: [15.28, 15.55],
}
export const thenT = t => Math.floor(t * FPS_THEN + 1e-6) / FPS_THEN

// the NOW panel and the THEN polaroid in the payoff
const PANEL = { cx: 592, cy: 772, s: 0.6 }
const POL = { cx: 236, cy: 462, photo: 300, rot: -0.1 }

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

/** a big outlined comic word (BONK, sniff…) */
export function sfxWord(x, t, cx, cy, t0, text, { size = 60, col = GOLD, rot = -0.1, life = 1.2 } = {}) {
  const k = pop01(t, t0, 0.2, 3) * outK(t, [t0 + life - 0.2, t0 + life])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineWidth = Math.max(8, size / 5); x.lineJoin = 'round'; x.strokeStyle = INK; x.strokeText(text, 0, 0); x.fillStyle = col; x.fillText(text, 0, 0)
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
/** a sign star with optional tears (0–3) and 2016 side-swept bangs */
export function star(x, t, px, py, size, sign, { tears = 0, bangs = null, glyph = true, ...o } = {}) {
  const S = typeof sign === 'string' ? signStar(sign) : sign
  const opts = { color: S.color, glyph: glyph ? S.glyph : null, glow: 1, ...o }
  drawStarChar(x, px, py, size, t, opts)
  if ((o.pop ?? 1) < 0.3 || (o.alpha ?? 1) <= 0) return
  const F = starFrame(px, py, size, t, opts)
  x.save(); x.globalAlpha *= o.alpha ?? 1
  if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
  if (bangs) inSprite(x, F, () => drawBangs(x, bangs))
  x.restore()
}
/** ♓ Pisces, crying (tears 0–3) */
export function pisces(x, t, px, py, size, tears, { mood = 'wide', look = [-1, 0], pop = 1, alpha = 1, hops, seed = 6, glyph = false, glow = 0.8 } = {}) {
  star(x, t, px, py, size, PIS, { tears, glyph, mood, look, pop, alpha, hops, seed, glow })
}
// side-swept bangs (sprite cells): the 2016 hair, swooping over the left eye
const BANGS = [
  '........hHHHH.',
  '.....hHHHHHHHH',
  '...hHHHHHHHHH.',
  '.HHHHHHHHHHH..',
  'HHHHHHHHH.....',
  'HHHHHHH.......',
  'HHHHH.........',
  '.HHH..........',
]
export function drawBangs(ctx, col = '#4a2c1e') {
  const hi = col === '#4a2c1e' ? '#8a5a3a' : '#ffffff'
  BANGS.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.') return
    const X = 10 + i, Y = 10 + j
    ctx.fillStyle = INK; ctx.fillRect(X - 0.35, Y - 0.35, 1.7, 1.7)
  }))
  BANGS.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.') return
    ctx.fillStyle = ch === 'h' ? hi : col; ctx.fillRect(10 + i, 10 + j, 1, 1)
  }))
  ctx.fillStyle = hi; for (const [i, j] of [[16, 12], [17, 12], [14, 13], [15, 13], [12, 14]]) ctx.fillRect(i, j, 1, 0.5)
}

// ── pixel font (3×5) for the camera date stamp
const PF = {
  0: ['XXX', 'X.X', 'X.X', 'X.X', 'XXX'], 1: ['.X.', 'XX.', '.X.', '.X.', 'XXX'], 2: ['XXX', '..X', 'XXX', 'X..', 'XXX'],
  3: ['XXX', '..X', '.XX', '..X', 'XXX'], 4: ['X.X', 'X.X', 'XXX', '..X', '..X'], 5: ['XXX', 'X..', 'XXX', '..X', 'XXX'],
  6: ['XXX', 'X..', 'XXX', 'X.X', 'XXX'], 7: ['XXX', '..X', '.X.', '.X.', '.X.'], 8: ['XXX', 'X.X', 'XXX', 'X.X', 'XXX'],
  9: ['XXX', 'X.X', 'XXX', '..X', 'XXX'], '·': ['.', '.', 'X', '.', '.'], ':': ['.', 'X', '.', 'X', '.'], ' ': ['.', '.', '.', '.', '.'],
  A: ['XXX', 'X.X', 'XXX', 'X.X', 'X.X'], P: ['XXX', 'X.X', 'XXX', 'X..', 'X..'], M: ['X.X', 'XXX', 'XXX', 'X.X', 'X.X'],
}
/** pixel-font text, right-aligned at (rx, by) (bottom), cell size c */
export function pixelText(x, text, rx, by, c, col = STAMP, { glow = true, align = 'right' } = {}) {
  const chars = [...text], wOf = ch => (PF[ch] || PF[' '])[0].length
  const total = chars.reduce((s, ch) => s + (wOf(ch) + 1) * c, -c)
  let px = align === 'right' ? rx - total : align === 'center' ? rx - total / 2 : rx
  const top = by - 5 * c
  x.save()
  if (glow) { x.shadowColor = 'rgba(255,120,40,0.85)'; x.shadowBlur = c * 2.2 }
  x.fillStyle = col
  for (const ch of chars) {
    const bm = PF[ch] || PF[' ']
    bm.forEach((row, j) => [...row].forEach((v, i) => { if (v === 'X') x.fillRect(Math.round(px + i * c), Math.round(top + j * c), c, c) }))
    px += (bm[0].length + 1) * c
  }
  x.restore()
}

// ── the old-phone-video grade
function hash(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
function makeNoise() {
  const out = []
  for (let k = 0; k < 6; k++) {
    const c = document.createElement('canvas'); c.width = 270; c.height = 480
    const g = c.getContext('2d'), img = g.createImageData(270, 480), r = rng(77 + k * 13)
    for (let i = 0; i < img.data.length; i += 4) { const v = r() * 255; img.data[i] = v; img.data[i + 1] = v * 0.94; img.data[i + 2] = v * 0.86; img.data[i + 3] = 255 }
    g.putImageData(img, 0, 0); out.push(c)
  }
  return out
}
/** draw `src` (the 1080×1920 THEN scene) onto `x` as an old phone video. still: no jitter (the polaroid) */
function gradeThen(x, src, t, noise, { still = false, tear = 0 } = {}) {
  const f = Math.floor(t * FPS_THEN + 1e-6)
  const dx = still ? 0 : (hash(f) - 0.5) * 12 + Math.sin(t * 1.3) * 7, dy = still ? 0 : (hash(f + 7.3) - 0.5) * 9 + Math.sin(t * 0.9 + 1) * 6
  const rot = still ? 0 : (hash(f + 13.1) - 0.5) * 0.007 + Math.sin(t * 0.7) * 0.004
  x.save()
  x.translate(W / 2 + dx, H / 2 + dy); x.rotate(rot); x.scale(1.035, 1.035); x.translate(-W / 2, -H / 2)
  x.filter = 'saturate(1.85) contrast(1.12) brightness(1.06) blur(1.6px)'
  if (tear > 0) {
    // the clip ends: horizontal tears slide sideways
    const bands = 9
    for (let b = 0; b < bands; b++) {
      const y0 = (b / bands) * H, hgt = H / bands + 1, sh = (hash(f * 3.1 + b) - 0.5) * 220 * tear * (b % 3 === 1 ? 1.8 : 1)
      x.drawImage(src, 0, y0, W, hgt, sh, y0, W, hgt)
    }
  } else x.drawImage(src, 0, 0)
  x.filter = 'none'
  x.restore()
  // warm cast + a lifted, creamy top end
  x.save()
  x.globalCompositeOperation = 'overlay'; x.fillStyle = 'rgba(255,146,58,0.42)'; x.fillRect(0, 0, W, H)
  x.globalCompositeOperation = 'screen'; x.fillStyle = 'rgba(70,34,10,0.22)'; x.fillRect(0, 0, W, H)
  x.globalCompositeOperation = 'source-over'
  // light leak (top-right), breathing
  const lk = x.createRadialGradient(W - 40, 180, 20, W - 40, 180, 640)
  const la = 0.22 + 0.08 * Math.sin(t * 1.7)
  lk.addColorStop(0, `rgba(255,150,70,${la})`); lk.addColorStop(1, 'rgba(255,150,70,0)')
  x.fillStyle = lk; x.fillRect(0, 0, W, H)
  // soft vignette
  const v = x.createRadialGradient(W / 2, H / 2, H * 0.28, W / 2, H / 2, H * 0.68)
  v.addColorStop(0, 'rgba(30,12,4,0)'); v.addColorStop(1, 'rgba(30,12,4,0.62)')
  x.fillStyle = v; x.fillRect(0, 0, W, H)
  // video noise (switches every frame)
  x.globalAlpha = 0.11; x.globalCompositeOperation = 'overlay'
  x.imageSmoothingEnabled = true
  x.drawImage(noise[f % noise.length], 0, 0, W, H)
  x.globalAlpha = 0.05; x.globalCompositeOperation = 'source-over'
  x.drawImage(noise[(f + 3) % noise.length], 0, 0, W, H)
  x.restore()
  // a faint rolling scan band
  if (!still) {
    const by = ((t * 260) % (H + 300)) - 150
    x.save(); x.globalAlpha = 0.06; x.fillStyle = '#fff4e0'; x.fillRect(0, by, W, 90); x.restore()
  }
}

// ── the bug: "THEN vs NOW", Inter 800 small caps, letter-spaced, top-left 56 px
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

// ── the big top caption: "[Thing]" / "in [year]", the year a sticker that flips to 2026
function buildCaption(root, { thing, then, at, flip }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '138px', width: W + 'px', display: 'none', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }, root)
  // fit line one into 960 px
  const meas = document.createElement('canvas').getContext('2d')
  let size = 92
  for (; size > 56; size -= 2) { meas.font = `800 ${size}px Inter`; if (meas.measureText(thing).width <= 950) break }
  const l1 = el('div', { font: `800 ${size}px ${INTER}`, letterSpacing: '-0.02em', color: BONE, lineHeight: '1.04', whiteSpace: 'nowrap', textShadow: '0 4px 0 rgba(6,4,18,0.75), 0 0 24px rgba(6,4,18,0.8)', transformOrigin: '50% 80%' }, wrap, thing)
  const row = el('div', { display: 'flex', alignItems: 'center', gap: '22px', marginTop: '6px', transformOrigin: '50% 50%' }, wrap)
  el('div', { font: `800 ${Math.round(size * 0.92)}px ${INTER}`, letterSpacing: '-0.02em', color: BONE, textShadow: '0 4px 0 rgba(6,4,18,0.75), 0 0 24px rgba(6,4,18,0.8)' }, row, 'in')
  const stk = el('div', { position: 'relative', padding: '0 26px 6px', borderRadius: '16px', font: `italic 600 ${Math.round(size * 1.3)}px ${SERIF}`, lineHeight: '1.06', color: INK, background: '#ffcf6a', boxShadow: `0 8px 0 rgba(6,4,18,0.55), 0 0 0 6px ${INK}`, transformOrigin: '50% 50%', whiteSpace: 'nowrap' }, row, String(then))
  return {
    update(t, out = 1) {
      const on = t >= at && out > 0.01
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k1 = easeOutBack(prog(t, at, at + 0.36), 2.4), k2 = easeOutBack(prog(t, at + 0.14, at + 0.5), 2.6)
      l1.style.opacity = String(clamp(k1 * 3) * out); l1.style.transform = `scale(${(lerp(0.5, 1, k1) * lerp(0.9, 1, out)).toFixed(4)})`
      row.style.opacity = String(clamp(k2 * 3) * out)
      // the flip: squash shut on the old year, open on 2026 with a pop
      const p = prog(t, flip, flip + 0.34)
      const now = p >= 0.4
      stk.textContent = now ? '2026' : String(then)
      stk.style.background = now ? '#ff8fb1' : '#ffcf6a'
      let sy = 1, sc = lerp(0.5, 1, k2), rot = now ? 3 : -3
      if (p > 0 && p < 0.4) sy = 1 - ease.inQuad(p / 0.4)
      else if (p >= 0.4) { const q = (p - 0.4) / 0.6; sy = easeOutBack(q, 3); sc *= 1 + 0.18 * Math.sin(Math.PI * Math.min(1, q * 1.4)) }
      row.style.transform = `scale(${(sc * lerp(0.9, 1, out)).toFixed(4)})`
      stk.style.transform = `rotate(${rot}deg) scaleY(${Math.max(0.02, sy).toFixed(4)})`
    },
  }
}

// ── the payoff frames
function drawNowTag(x, t, at, alpha) {
  const k = pop01(t, at, 0.34, 2.6) * alpha
  if (k <= 0.01) return
  const w = CROP.s * PANEL.s
  x.save(); x.translate(PANEL.cx + w / 2 - 70, PANEL.cy + w / 2 - 6); x.rotate(0.06); x.scale(k, k)
  x.font = `italic 600 66px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const tw = x.measureText('2026').width + 44
  x.fillStyle = INK; x.fillRect(-tw / 2 - 6, -44, tw + 12, 88)
  x.fillStyle = '#ff8fb1'; x.fillRect(-tw / 2, -38, tw, 76)
  x.fillStyle = INK; x.fillText('2026', 0, 2)
  x.restore()
}
function drawPolaroid(x, photo, k, { year, date, alpha = 1, t }) {
  if (k <= 0.01) return
  const P = POL.photo, B = 16, BOT = 66, FW = P + 2 * B, FH = P + B + BOT
  const cx = lerp(-260, POL.cx, k), cy = lerp(240, POL.cy, k), rot = POL.rot + (1 - k) * -0.5
  const dt = t - POL_SETTLE, wob = dt > 0 ? 0.05 * Math.exp(-dt * 6) * Math.sin(dt * 20) : 0
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot + wob)
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-FW / 2 + 12, -FH / 2 + 16, FW, FH)
  x.fillStyle = INK; x.fillRect(-FW / 2 - 4, -FH / 2 - 4, FW + 8, FH + 8)
  x.fillStyle = PAPER; x.fillRect(-FW / 2, -FH / 2, FW, FH)
  x.drawImage(photo, -P / 2, -FH / 2 + B, P, P)
  pixelText(x, date, P / 2 - 10, -FH / 2 + B + P - 10, 2.4)
  x.font = `italic 600 50px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2a2350'
  x.fillText(String(year), 0, FH / 2 - BOT / 2 + 2)
  // tape
  x.save(); x.translate(0, -FH / 2 - 2); x.rotate(0.06)
  x.fillStyle = 'rgba(255,236,190,0.8)'; x.fillRect(-70, -22, 140, 44); x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(-70, -22, 140, 9)
  x.restore()
  x.restore()
}
const POL_SETTLE = T.pol[1]

/** the film */
export function makeThenNow(cfg) {
  const accent = cfg.accent || PINK
  const LINES = [{ t: T.line, speaker: 'THE STARS', text: cfg.line, color: cfg.lineColor }]
  const tm = lineTimes(LINES, { cps: CPS })
  const boxClose = r3(Math.min(15.2, tm[0].done + 1.6))

  async function build(stage) {
    try {
      await Promise.all(["800 92px Inter", "800 120px Inter", "800 40px Inter", "italic 600 120px 'EB Garamond'", "italic 600 64px 'EB Garamond'", "italic 500 150px 'EB Garamond'", "700 34px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const assets = cfg.load ? await cfg.load() : {}
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
    const sc = mk(), sx = sc.getContext('2d')          // the scene, raw
    const noise = makeNoise()
    let snap = null                                      // the THEN polaroid photo (deterministic: built once)
    const snapPhoto = () => {
      if (snap) return snap
      const raw = mk(), rx = raw.getContext('2d'), g = mk(), gx2 = g.getContext('2d')
      const ts = thenT(T.tear[0] - 0.25)
      drawSky(rx, ts, SKY_H); cfg.A.draw(rx, ts, T, assets)
      gradeThen(gx2, raw, ts, noise, { still: true })
      snap = mk(CROP.s, CROP.s); snap.getContext('2d').drawImage(g, CROP.x, CROP.y, CROP.s, CROP.s, 0, 0, CROP.s, CROP.s)
      return snap
    }
    const cap = buildCaption(root, { thing: cfg.thing, then: cfg.then, at: T.cap, flip: T.flip })
    const box = dialogueBox(root, { lines: LINES, y: 1446, open: r3(T.line - 0.22), close: boxClose, cps: CPS })
    const last = popText(root, cfg.last, { top: 1128, size: 112, accentSize: 156, at: T.last, late: 1, lateAt: T.lastLand, wobble: true, accentColor: accent, fit: true })
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const out = popOut(t, T.out)
        if (t < T.cut) {
          // THEN: the old phone video
          const tq = thenT(t)
          sx.clearRect(0, 0, W, H); drawSky(sx, tq, SKY_H); cfg.A.draw(sx, tq, T, assets)
          x.fillStyle = '#0a0612'; x.fillRect(0, 0, W, H)
          gradeThen(x, sc, tq, noise, { tear: ease.inQuad(prog(t, ...T.tear)) })
          const sk = pop01(t, T.stamp, 0.2, 1.5)
          if (sk > 0.01) { x.save(); x.globalAlpha = clamp(sk); pixelText(x, cfg.date, W - 78, H - 128, 7); x.restore() }
          if (cfg.A.over) cfg.A.over(x, t, T, assets)
        } else {
          // NOW: clean; then the payoff composite
          const comp = ease.inOutCubic(prog(t, ...T.comp))
          drawSky(x, t, SKY_H)
          sx.clearRect(0, 0, W, H); drawSky(sx, t, SKY_H); cfg.B.draw(sx, t, T, assets)
          if (comp <= 0) x.drawImage(sc, 0, 0)
          else {
            const s = lerp(1, PANEL.s, comp), cx = lerp(CROP.x + CROP.s / 2, PANEL.cx, comp), cy = lerp(CROP.y + CROP.s / 2, PANEL.cy, comp)
            // the visible window shrinks from the full frame to the crop square
            const wx0 = lerp(0, CROP.x, comp), wy0 = lerp(0, CROP.y, comp), ww = lerp(W, CROP.s, comp), wh = lerp(H, CROP.s, comp)
            const so = s * out
            if (so > 0.005) {
              x.save()
              x.translate(cx, cy); x.scale(so, so); x.translate(-(CROP.x + CROP.s / 2), -(CROP.y + CROP.s / 2))
              // drop shadow, the clipped video, then the bone + ink border (line widths in screen px)
              x.fillStyle = `rgba(6,4,18,${0.5 * comp})`; x.fillRect(wx0 + 18 / so, wy0 + 22 / so, ww, wh)
              x.save(); x.beginPath(); x.rect(wx0, wy0, ww, wh); x.clip(); x.drawImage(sc, 0, 0); x.restore()
              x.globalAlpha = comp
              x.lineWidth = 12 / so; x.strokeStyle = BONE; x.strokeRect(wx0 - 6 / so, wy0 - 6 / so, ww + 12 / so, wh + 12 / so)
              x.lineWidth = 5 / so; x.strokeStyle = INK; x.strokeRect(wx0 - 14 / so, wy0 - 14 / so, ww + 28 / so, wh + 28 / so)
              x.restore()
              x.save(); x.translate(PANEL.cx, PANEL.cy); x.scale(out, out); x.translate(-PANEL.cx, -PANEL.cy)
              drawNowTag(x, t, T.comp[1] - 0.05, 1)
              x.restore()
            }
            const pk = easeOutBack(prog(t, ...T.pol), 1.4)
            if (pk > 0.01) drawPolaroid(x, snapPhoto(), pk, { year: cfg.then, date: cfg.date, alpha: clamp(out), t })
            if (cfg.comp) cfg.comp(x, t, T, out)
            sparkles(x, t, 540, 1240, T.lastLand + 0.02, 12, 320, 1, [GOLD, accent, BONE])
          }
        }
        cap.update(t, outK(t, T.capOut))
        box.update(t)
        last.update(t, outK(t, [T.out[0] + 0.05, T.out[1]]))
        bug.update(t, outK(t, T.bugOut))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // one candidate cut: the switch from THEN to NOW
  const CUTS = [T.cut]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    // the old clip: a camcorder-ish click on, hiss, the date stamp
    ['tick', 0.32, 0.06], ['vinyl', 0.3, T.cut, { gain: 0.035 }],
    ...wordPops(T.cap, 3, 0.12, 0), ['pop', T.bug + 0.06, 783.99, 0.03, -0.4], ['tick', T.stamp + 0.02, 0.035],
    // the clip tears and stops
    ['tapeStop', T.tapeStop, 0.42], ['whoosh', T.tear[0], 0.3, 0.03], ['tick', T.tear[0] + 0.1, 0.05], ['tick', T.tear[0] + 0.18, 0.04],
    // the year flips to 2026
    ['tick', T.flip, 0.05], ['pop', r3(T.flip + 0.14), 1046.5, 0.05, 0], ['pop', r3(T.flip + 0.2), 1567.98, 0.035, 0.2], ['bell', r3(T.flip + 0.16), 2093, 0.025, 1.0, 0.2], ['glitter', T.flip + 0.1, T.flip + 0.45],
    // the payoff
    ['whoosh', T.comp[0], 0.5, 0.04], ['pop', r3(T.comp[1] - 0.02), 880, 0.03, 0.3],
    ['whoosh', T.pol[0], 0.35, 0.03], ['tick', r3(T.pol[1] - 0.05), 0.05], ['tick', r3(T.pol[1] + 0.03), 0.04],
    ...talkCues(LINES, { cps: CPS }),
    ...wordPops(T.last, 2, 0.1, 1, 0.03), ['pop', T.lastLand, 1046.5, 0.05, 0], ['pop', r3(T.lastLand + 0.08), 1318.51, 0.04, 0],
    ['bell', r3(T.lastLand + 0.05), 2093, 0.03, 1.2, 0], ['glitter', T.lastLand, T.lastLand + 0.5],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T }
}
