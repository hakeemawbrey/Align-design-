// YOUR SIGN'S LOVE GLITCH (Month 2 boost, batch m18, star_advice posts) — the shared look of klge01–klge20.
// Owned by batch m18; other films import it read-only from '../../klge01/scenes/glitchkit.js'.
//
// The format: STAR OS, a fictional retro pixel desktop floating on the night sky. The sign's star lives in a program
// window. Frame 0 is the glitch already happening: an error dialog mid-slam, RGB tearing, the star frozen mid-action,
// the hook line big at the top. Then the glitch plays out, Pisces pops out of the tray in tears, THE STARS diagnose it,
// a patch installs, and the last line lands. A tiny tray process "PISCES.EXE · crying (normal)" runs in every film.
// No end card, no card cut, no logo, no brand name. Ending: hard cut (story ends on the punchline) or a loop (the last
// 0.45 s cross-eases into the exact frame-0 composition).
//
//   makeGlitch(cfg) → { DURATION, SCENES, CUES, MUSIC }
//     cfg.id, cfg.sign ('leo'), cfg.len (s), cfg.ending 'cut' | 'loop'
//     cfg.hook  'LEO.EXE has *stopped responding.*'   (frame 0 → hookOut)
//     cfg.hookOut (default 3.0)   cfg.promise: a small line under the hook (long films: 'wait for the patch notes')
//     cfg.err   { title, msg: [lines], out, buttons: ['WAIT', 'PATCH'] }  the frame-0 error dialog
//     cfg.win   { title }  the main program window title (default '<SIGN>.EXE');  cfg.notResp: [[a, b]] '(Not Responding)'
//     cfg.glitch [[t, g]…] extra glitch keys (0…1) on top of the opening glitch;  cfg.hits [{ at, kind, … }]
//               kinds: 'flash' {col} · 'whip' {x, y, z} · 'shake' {dur, amp} · 'freeze' {dur, circle:{x,y,r}, label}
//                      'glitch' {dur, g} · 'scratch' (a record scratch + 0.5 s freeze, no circle)
//     cfg.caps  [{ at, out, text, col }] beat captions in the top zone (after the hook)
//     cfg.scene(x, t, K)  paints the window's story (absolute 1080×1920 coords; the window body is K.BODY)
//     cfg.pis   [{ at, out, text, tears }] Pisces pops out of the tray, crying (tears 1–3)
//     cfg.stars [{ t, text }] THE STARS' lines (canvas RPG box);  cfg.box { open, close, y }
//     cfg.patch { at, ver, name, dur, out }  the installer dialog;  cfg.notes { at, out, items: [] } long-film patch notes
//     cfg.last  { at, text }   cfg.chapters [{ at, n, text }]   cfg.cues [] extra sound cues
//     cfg.music { style, key, seed, drop, breakdown, lift }
// Everything is a pure function of t. DOM and canvases are only created inside build().
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar, STAR } from '../../startalk.js'
import { recordScratch, recordScratchCues, frozen, whipZoom, whipZoomCues, caught, caughtCues } from '../../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const CYAN = '#7fe3ff', MINT = '#9fe6b0', GREY = '#b9b3cc', WIN = '#e9e4f2', NAVY = '#241a4a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const win01 = (t, a, b, d = 0.3) => pop01(t, a, d, 2) * outK(t, [b - 0.2, b])
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, rng }
export const SIGN_NAME = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }

// ── layout
export const BODY = { x: 70, y: 556, w: 940, h: 880 }        // the program window's body (title bar above it)
const TOP = { y0: 150, y1: 500 }                              // hook / captions / last line
const TASK_Y = 1812

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** an ink-outlined block */
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
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
export const BROKEN = ['.HH.HH.', 'HHH.HHH', 'HH.HHHH', '.HH.HH.', '..H.H..', '...H...']
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, '#7fd0ff', MINT, BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = 520 + 260 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt
    const sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble popping at t0, gone by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, maxW = 760 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = wrapPlain(x, text, maxW)
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 44, h = size * 1.18 * lines.length + 30
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2, 28, 16); x.fillRect(tx - 7, h / 2 + 16, 14, 10)
  x.fillStyle = col; x.fillRect(tx - 8, h / 2 - 2, 16, 14); x.fillRect(tx - 2, h / 2 + 12, 6, 8)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.18 + 2))
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, base = 'middle', stroke = null } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = base
  if (stroke) { x.lineWidth = size * 0.16; x.strokeStyle = stroke; x.lineJoin = 'round'; x.strokeText(text, 0, 0) }
  x.fillStyle = col; x.fillText(text, 0, 0); x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
function wrapPlain(x, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let cur = ''
    for (const w of para.split(' ')) { const c = cur ? cur + ' ' + w : w; if (x.measureText(c).width > maxW && cur) { out.push(cur); cur = w } else cur = c }
    out.push(cur)
  }
  return out
}

/** rich text: '*word*' = accent. Wraps to maxW, centred on cx (or left), words pop in from `at` with `gap`. */
export function richText(x, t, text, cx, y, { size = 88, accentSize = null, maxW = 960, col = BONE, accent = GOLD, at = -9, gap = 0.06, weight = 900, font = INTER, lh = 1.06, align = 'center', alpha = 1, stroke = INK, shadowCol = 'rgba(5,3,12,0.55)', wobble = 0 } = {}) {
  if (alpha <= 0) return 0
  const aS = accentSize ?? size
  const toks = []; let acc = false
  for (const raw of String(text).split(/(\*[^*]+\*)/)) {
    if (!raw) continue
    const isA = raw.startsWith('*') && raw.endsWith('*')
    const body = isA ? raw.slice(1, -1) : raw
    body.split(/[ \t\n]+/).forEach((w, j) => { if (w) toks.push({ w, a: isA, glue: j === 0 && !isA && toks.length > 0 && !/^[ \t\n]/.test(body) }) })
    void acc
  }
  x.save(); x.globalAlpha *= alpha; x.textBaseline = 'alphabetic'
  const fontOf = a => `${weight} ${a ? aS : size}px ${font}`
  const sp = size * 0.36
  for (const tk of toks) { x.font = fontOf(tk.a); tk.width = x.measureText(tk.w).width }
  const lines = []; let cur = [], cw = 0
  for (const tk of toks) { const add = (cur.length && !tk.glue ? sp : 0) + tk.width; if (cw + add > maxW && cur.length) { lines.push({ toks: cur, w: cw }); cur = [tk]; cw = tk.width } else { cur.push(tk); cw += add } }
  if (cur.length) lines.push({ toks: cur, w: cw })
  let yy = y, i = 0
  for (const ln of lines) {
    const big = ln.toks.some(k => k.a) ? aS : size
    yy += big * lh * 0.82
    let xx = align === 'center' ? cx - ln.w / 2 : cx
    for (const tk of ln.toks) {
      const k = pop01(t, at + i * gap, 0.26, 2.2)
      if (k > 0.01) {
        x.save(); x.translate(xx + tk.width / 2, yy - big * 0.3)
        const wb = wobble ? Math.sin(t * 5 + i) * 0.02 * wobble : 0
        x.rotate(wb); x.scale(k, k); x.font = fontOf(tk.a); x.textAlign = 'center'
        if (shadowCol) { x.fillStyle = shadowCol; x.fillText(tk.w, 5, big * 0.3 + 6) }
        if (stroke) { x.lineWidth = Math.max(6, big * 0.12); x.lineJoin = 'round'; x.strokeStyle = stroke; x.strokeText(tk.w, 0, big * 0.3) }
        x.fillStyle = tk.a ? accent : col; x.fillText(tk.w, 0, big * 0.3)
        x.restore()
      }
      xx += tk.width + (ln.toks[ln.toks.indexOf(tk) + 1]?.glue ? 0 : sp); i++
    }
    yy += big * lh * 0.24
  }
  x.restore()
  return yy - y
}
export const wordCount = text => String(text).replace(/\*/g, '').split(/\s+/).filter(Boolean).length

// ── star sprite frame (mirrors startalk.js drawStarChar) so props/tears sit on the sprite through hops and squash
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
/** any sign star (with optional tears 0–3); returns drawStarChar's { x, y, size, top } */
export function star(x, t, sign, px, py, size, o = {}) {
  const S = signStar(sign)
  const opts = { color: S.color, glyph: size >= 120 ? S.glyph : null, glow: 0.9, ...o }
  const r = drawStarChar(x, px, py, size, t, opts)
  if (o.tears && (o.pop ?? 1) > 0.3) { const F = starFrame(px, py, size, t, opts); inSprite(x, F, () => tearsCells(x, t, o.tears)) }
  return r
}
export const pisces = (x, t, px, py, size, tears = 2, o = {}) => star(x, t, 'pisces', px, py, size, { mood: 'wide', look: [0, 0], seed: 6, tears, ...o })
/** THE STARS' narrator (the warm gold star) */
export const narrator = (x, t, px, py, size, o = {}) => drawStarChar(x, px, py, size, t, { color: STAR.sky, glyph: null, mood: 'happy', glow: 1.1, seed: 9, ...o })

// ── STAR OS chrome
/** a program window: title bar + body; `k` pops it (0…1+), `nr` washes it "not responding" */
export function osWindow(x, X, Y, w, h, title, { k = 1, nr = 0, accent = '#5b4bd6', body = '#140f2c', t = 0, icon = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(X + w / 2, Y + h / 2); x.scale(k, k); x.translate(-(X + w / 2), -(Y + h / 2))
  R(x, 'rgba(5,3,12,0.5)', X + 12, Y + 14, w, h)
  box(x, X, Y, w, h, body, { b: 6 })
  R(x, accent, X, Y, w, 56); R(x, 'rgba(255,255,255,0.18)', X, Y, w, 8)
  if (icon) icon(x, X + 34, Y + 28)
  label(x, title + (nr > 0.5 ? ' (Not Responding)' : ''), X + (icon ? 62 : 24), Y + 30, { size: 26, align: 'left', col: BONE })
  // the three title buttons
  for (let i = 0; i < 3; i++) { const bx = X + w - 52 - i * 46; box(x, bx, Y + 12, 32, 32, i === 0 ? '#e8344e' : '#c9c2de', { b: 3 }) }
  label(x, '×', X + w - 36, Y + 28, { size: 28, col: BONE, font: INTER, weight: 800 })
  void t
  x.restore()
}
/** the error dialog: red ✕ icon, title, message lines, buttons */
export function errorDialog(x, t, { cx = 540, cy = 980, w = 860, title = 'ERROR', msg = [], buttons = ['WAIT', 'PATCH'], k = 1, hot = 1, shake = 0, icon = 'x' } = {}) {
  if (k <= 0.01) return
  x.save(); x.font = `800 44px ${INTER}`
  const h = 200 + msg.length * 56
  const sx = shake ? Math.sin(t * 90) * shake * 10 : 0
  x.translate(cx + sx, cy); x.scale(k, k); x.translate(-cx, -cy)
  const X = cx - w / 2, Y = cy - h / 2
  R(x, 'rgba(5,3,12,0.55)', X + 16, Y + 18, w, h)
  box(x, X, Y, w, h, WIN, { b: 7 })
  R(x, '#c4223f', X, Y, w, 60); R(x, 'rgba(255,255,255,0.22)', X, Y, w, 8)
  label(x, title, X + 24, Y + 32, { size: 28, align: 'left', col: '#fff4f4' })
  box(x, X + w - 52, Y + 14, 32, 32, '#efe6d6', { b: 3 }); label(x, '×', X + w - 36, Y + 30, { size: 28, col: INK, font: INTER, weight: 800 })
  // icon
  const ix = X + 74, iy = Y + 60 + (h - 60 - 90) / 2 - 6
  if (icon === 'x') { box(x, ix - 36, iy - 36, 72, 72, '#e8344e', { b: 5 }); label(x, '✕', ix, iy + 2, { size: 54, col: '#fff', font: INTER, weight: 900 }) }
  else { box(x, ix - 36, iy - 36, 72, 72, GOLD, { b: 5 }); label(x, '!', ix, iy + 2, { size: 58, col: INK, font: INTER, weight: 900 }) }
  msg.forEach((m, i) => label(x, m, X + 136, Y + 108 + i * 56, { size: 40, align: 'left', col: INK, font: INTER, weight: 800 }))
  // buttons
  const bw = 200, gap = 26, n = buttons.length, bx0 = X + w - 30 - n * bw - (n - 1) * gap
  buttons.forEach((b, i) => {
    const bx = bx0 + i * (bw + gap), by = Y + h - 84
    const isHot = i === n - 1 && hot
    box(x, bx, by, bw, 56, isHot ? '#5b4bd6' : '#d8d2ea', { b: 4 })
    label(x, b, bx + bw / 2, by + 30, { size: 26, col: isHot ? BONE : INK })
  })
  x.restore()
}
/** a phone chat card: lines [{ from: 'me'|name, text, at }]; typing dots when `typing` = [a, b] */
export function phone(x, t, { cx = 540, cy = 960, w = 520, h = 760, title = 'chat', lines = [], k = 1, rot = 0, typing = null, clock = '9:41', accent = '#5b4bd6', size = 34, meCol = '#5b4bd6', themCol = '#efe6d6' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const X = -w / 2, Y = -h / 2
  box(x, X - 10, Y - 10, w + 20, h + 20, '#2a2148', { b: 7 })
  R(x, '#120d26', X, Y, w, h)
  R(x, accent, X, Y, w, 84)
  label(x, clock, X + 24, Y + 22, { size: 18, align: 'left', col: BONE })
  label(x, title, 0, Y + 56, { size: 28, col: BONE, font: INTER, weight: 800 })
  // messages bottom-up
  x.font = `700 ${size}px ${INTER}`
  const shown = lines.filter(l => t >= l.at)
  let yy = Y + h - 24
  if (typing && t >= typing[0] && t < typing[1]) {
    const bw = 120, bh = 56
    R(x, themCol, X + 22, yy - bh, bw, bh)
    for (let i = 0; i < 3; i++) { const up = Math.sin(t * 10 - i) > 0.3 ? 6 : 0; R(x, INK, X + 44 + i * 30, yy - bh / 2 - 6 - up, 14, 14) }
    yy -= bh + 16
  }
  for (let i = shown.length - 1; i >= 0; i--) {
    const l = shown[i], me = l.from === 'me'
    const ls = wrapPlain(x, l.text, w - 150)
    const bw = Math.max(...ls.map(s => x.measureText(s).width)) + 40, bh = ls.length * size * 1.2 + 28 + (me ? 0 : 30)
    if (yy - bh < Y + 96) break
    const k2 = pop01(t, l.at, 0.22, 2.2)
    const bx = me ? X + w - 22 - bw : X + 22
    x.save(); x.translate(bx + bw / 2, yy - bh / 2); x.scale(k2, k2); x.translate(-(bx + bw / 2), -(yy - bh / 2))
    R(x, me ? meCol : themCol, bx, yy - bh, bw, bh)
    if (!me) label(x, l.from, bx + 20, yy - bh + 22, { size: 18, align: 'left', col: '#6a5a9a' })
    x.fillStyle = me ? BONE : INK; x.font = `700 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    ls.forEach((s, j) => x.fillText(s, bx + 20, yy - bh + (me ? 14 : 44) + size * 0.6 + j * size * 1.2))
    x.restore()
    yy -= bh + 16
  }
  x.restore()
}
/** a horizontal progress bar with a label */
export function progressBar(x, X, Y, w, v, { h = 44, col = MINT, text = null, size = 26, back = '#2a2148', seg = 18 } = {}) {
  box(x, X, Y, w, h, back, { b: 5 })
  const n = Math.floor((w - 8) / seg), on = Math.round(clamp(v) * n)
  for (let i = 0; i < on; i++) R(x, col, X + 4 + i * seg, Y + 4, seg - 4, h - 8)
  if (text) label(x, text, X + w / 2, Y + h / 2 + 1, { size, col: BONE, stroke: INK })
}
/** a vertical-ish gauge (0…1+), red over 1 */
export function meter(x, t, X, Y, w, h, v, { title = '', col = MINT, hot = RED } = {}) {
  box(x, X, Y, w, h, '#1a1338', { b: 5 })
  const n = 10, cell = (h - 16) / n
  const vv = Math.max(0, v)
  for (let i = 0; i < n; i++) {
    const on = (i + 1) / n <= Math.min(1, vv) + 1e-6
    const c = vv > 1 ? (Math.sin(t * 18) > 0 ? hot : '#ff9aa8') : i >= 7 ? GOLD : col
    R(x, on ? c : '#2e2650', X + 8, Y + h - 8 - (i + 1) * cell + 3, w - 16, cell - 6)
  }
  if (title) label(x, title, X + w / 2, Y - 22, { size: 22, col: BONE, stroke: INK })
}
/** a sticker caption (tilted label slab) */
export function sticker(x, t, text, cx, cy, at, out, { col = GOLD, ink = INK, size = 40, rot = -0.03 } = {}) {
  const k = pop01(t, at, 0.28, 2.6) * outK(t, [out - 0.18, out])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `900 ${size}px ${INTER}`
  const w = x.measureText(text).width + 56, h = size + 34
  R(x, 'rgba(5,3,12,0.5)', -w / 2 + 8, -h / 2 + 10, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  label(x, text, 0, 3, { size, col: ink, font: INTER, weight: 900 })
  x.restore()
}

// ── the canvas RPG dialogue box (THE STARS)
const CPS = 30
export function typeTimes(lines, cps = CPS) {
  return lines.map(l => {
    let tt = l.t; const chars = []
    for (const ch of l.text.replace(/\*/g, '')) { chars.push(tt); tt += 1 / cps + (/[.,!?…:]/.test(ch) ? 0.09 : 0) }
    return { start: l.t, done: tt, chars }
  })
}
function starsBox(x, t, lines, { open, close, y = 1484, h = 270, speaker = 'THE STARS', tag = GOLD } = {}) {
  if (!lines.length) return
  const k = pop01(t, open, 0.26, 2.2) * outK(t, [close - 0.2, close])
  if (k <= 0.01) return
  const times = typeTimes(lines)
  let i = -1; for (let j = 0; j < lines.length; j++) if (t >= lines[j].t) i = j
  x.save(); x.translate(540, y + h / 2); x.scale(k, k); x.translate(-540, -(y + h / 2))
  const X = 60, w = 960
  R(x, 'rgba(5,3,12,0.55)', X + 10, y + 12, w, h)
  R(x, GOLD, X - 6, y, w + 12, h); R(x, GOLD, X, y - 6, w, h + 12)
  R(x, 'rgba(16,9,38,0.97)', X, y, w, h)
  R(x, 'rgba(239,230,214,0.5)', X + 10, y + 10, w - 20, 2)
  // name tag + the narrator's face
  const sp = i >= 0 ? (lines[i].speaker || speaker) : speaker
  x.font = `700 28px ${MONO}`
  const tw = x.measureText(sp).width + 40
  box(x, X + 24, y - 26, tw, 46, tag, { b: 4 }); label(x, sp, X + 44, y - 2, { size: 28, align: 'left', col: INK })
  if (i >= 0) {
    const L = lines[i], T = times[i]
    const n = T.chars.filter(c => c <= t).length
    // rich typewriter: walk the text, accent between *…*
    x.font = `700 46px ${MONO}`; x.textBaseline = 'alphabetic'; x.textAlign = 'left'
    const words = []; let acc = false
    for (const part of L.text.split(/(\*)/)) { if (part === '*') { acc = !acc; continue } for (const w2 of part.split(/(\s+)/)) if (w2) words.push({ w: w2, a: acc }) }
    let cx = X + 44, cy = y + 92, c = 0
    const maxX = X + w - 40
    for (const wd of words) {
      if (/^\s+$/.test(wd.w)) { cx += x.measureText(' ').width; c += wd.w.length; continue }
      const ww = x.measureText(wd.w).width
      if (cx + ww > maxX) { cx = X + 44; cy += 62 }
      for (const ch of wd.w) { if (c < n) { x.fillStyle = wd.a ? (L.color || GOLD) : BONE; x.fillText(ch, cx, cy) } cx += x.measureText(ch).width; c++ }
    }
    if (t > T.done && Math.floor((t - T.done) * 3) % 2 === 0) { x.fillStyle = GOLD; x.fillRect(X + w - 56, y + h - 46, 22, 12); x.fillRect(X + w - 51, y + h - 34, 12, 8) }
  }
  x.restore()
}
export function starsCues(lines, { gain = 0.016 } = {}) {
  const out = []
  typeTimes(lines).forEach((T, i) => {
    T.chars.forEach((c, j) => { if (j % 2 === 0) out.push(['pop', r3(c), 880 + ((j * 37) % 5) * 60, gain, 0]) })
    out.push(['tick', r3(T.done), 0.02]); void i
  })
  return out
}

// ── the tray: the taskbar with the always-running Pisces process
function taskbar(x, t, { title, nr = 0, cry = 1.5 }) {
  R(x, '#1f1840', 0, TASK_Y, 1080, 1920 - TASK_Y); R(x, '#4a3d8f', 0, TASK_Y, 1080, 6)
  // start button: a pixel star
  box(x, 22, TASK_Y + 22, 84, 64, '#3a2f74', { b: 4 }); drawPixelStar(x, 64, TASK_Y + 54, 40, 2, GOLD)
  // the sign's process
  box(x, 132, TASK_Y + 22, 400, 64, nr > 0.5 ? '#5a2440' : '#2e2560', { b: 4 })
  label(x, title + (nr > 0.5 ? ' · not responding' : ''), 150, TASK_Y + 55, { size: 20, align: 'left', col: BONE })
  // Pisces' process chip
  box(x, 556, TASK_Y + 22, 500, 64, '#26345e', { b: 4 })
  pisces(x, t, 600, TASK_Y + 58, 54, Math.round(clamp(cry, 1, 3)), { bob: 1.5, glow: 0.5, look: [0, 0] })
  label(x, 'PISCES.EXE · crying (normal)', 640, TASK_Y + 55, { size: 20, align: 'left', col: '#bfe0ff' })
}
function pisPopup(x, t, p) {
  const k = win01(t, p.at, p.out, 0.34)
  if (k <= 0.01) return
  const rise = (1 - ease.outCubic(prog(t, p.at, p.at + 0.34))) * 260
  const X = p.x ?? 520, Y = (p.y ?? 1230) + rise, w = 520, h = 520
  x.save(); x.globalAlpha = clamp(k)
  osWindow(x, X, Y, w, h, 'PISCES.EXE', { accent: '#3a63c9', body: '#101b3a', k: Math.min(1, k) })
  pisces(x, t, X + w / 2, Y + 330, 250, p.tears ?? 3, { mood: p.mood ?? 'wide', look: p.look ?? [0, 0], hops: [p.at + 0.4, p.at + 0.9] })
  if (p.text) bubble(x, t, X + w / 2, Y + 118, p.at + 0.25, p.out, p.text, { size: 30, col: '#dff1ff', maxW: 440 })
  x.restore()
}
function installer(x, t, P, sign) {
  const out = P.out ?? (P.at + P.dur + 1.4)
  const k = win01(t, P.at, out, 0.3)
  if (k <= 0.01) return
  const X = 120, w = 840, h = 330, Y = P.y ?? 820
  osWindow(x, X, Y, w, h, `PATCH ${P.ver} · ${SIGN_NAME[sign]}.EXE`, { accent: '#2f9a6e', body: '#0f2420', k })
  if (k < 0.6) return
  const v = ease.inOutQuad(prog(t, P.at + 0.3, P.at + 0.3 + P.dur))
  label(x, v < 1 ? 'installing…' : 'patch installed ✓', X + 40, Y + 108, { size: 30, align: 'left', col: v < 1 ? MINT : GOLD })
  label(x, P.name, X + 40, Y + 168, { size: 34, align: 'left', col: BONE, font: INTER, weight: 900 })
  progressBar(x, X + 40, Y + 222, w - 80, v, { text: `${Math.round(v * 100)}%`, col: v < 1 ? MINT : GOLD })
}
function patchNotes(x, t, N) {
  const k = win01(t, N.at, N.out, 0.3)
  if (k <= 0.01) return
  const X = 90, w = 900, Y = N.y ?? 600, h = 150 + N.items.length * 118
  osWindow(x, X, Y, w, h, `PATCH NOTES ${N.ver ?? '2.0'}`, { accent: '#2f9a6e', body: '#0f2420', k })
  if (k < 0.6) return
  N.items.forEach((it, i) => {
    const at = N.at + 0.6 + i * (N.gap ?? 1.6)
    const kk = pop01(t, at, 0.28, 2.4)
    if (kk <= 0.01) return
    x.save(); x.translate(X + 60, Y + 130 + i * 118); x.scale(kk, kk)
    box(x, -22, -22, 44, 44, MINT, { b: 4 }); label(x, '✓', 0, 2, { size: 34, col: INK, font: INTER, weight: 900 })
    x.restore()
    richText(x, t, it, X + 110, Y + 100 + i * 118, { size: 40, maxW: w - 150, align: 'left', at, gap: 0.04, weight: 800, accent: GOLD, stroke: null, shadowCol: null })
  })
}
function chapterSticker(x, t, C, next) {
  const k = pop01(t, C.at, 0.3, 2.6) * outK(t, [C.at + 2.3, C.at + 2.6])
  if (k > 0.01) {
    x.save(); x.translate(540, 560); x.rotate(-0.04); x.scale(k, k)
    x.font = `900 52px ${INTER}`
    const w = Math.max(560, x.measureText(C.text).width + 80)
    R(x, 'rgba(5,3,12,0.55)', -w / 2 + 10, -80, w, 170)
    box(x, -w / 2, -90, w, 170, GOLD, { b: 7 })
    label(x, `CHAPTER ${C.n}`, 0, -46, { size: 30, col: '#5a3a00' })
    label(x, C.text, 0, 18, { size: 52, col: INK, font: INTER, weight: 900 })
    x.restore()
  }
  // the persistent chip top-right
  const on = t >= C.at && t < (next ? next.at : 1e9)
  if (on) {
    const kk = pop01(t, C.at + 0.2, 0.3, 2)
    x.save(); x.translate(948, 92); x.scale(kk, kk)
    box(x, -66, -24, 132, 48, '#2a2148', { b: 4 }); label(x, `CH ${C.n}/4`, 0, 2, { size: 24, col: GOLD })
    x.restore()
  }
}

// ── glitch post-process (RGB channel split + band tearing + scanlines), pure f(t, g)
function glitchPost(main, tmp, red, cyan, t, g) {
  if (g <= 0.01) return
  const W = 1080, H = 1920
  const m = main.getContext('2d'), tx = tmp.getContext('2d'), rx = red.getContext('2d'), cx = cyan.getContext('2d')
  tx.globalCompositeOperation = 'copy'; tx.drawImage(main, 0, 0); tx.globalCompositeOperation = 'source-over'
  const seed = Math.floor(t * 24)
  const r = rng(seed * 7 + 3)
  // channel split
  const d = Math.round(6 + 26 * g)
  for (const [c, col] of [[rx, '#ff0000'], [cx, '#00ffff']]) {
    c.globalCompositeOperation = 'copy'; c.drawImage(tmp, 0, 0)
    c.globalCompositeOperation = 'multiply'; c.fillStyle = col; c.fillRect(0, 0, W, H)
    c.globalCompositeOperation = 'destination-in'; c.drawImage(tmp, 0, 0); c.globalCompositeOperation = 'source-over'
  }
  m.save(); m.globalCompositeOperation = 'copy'; m.drawImage(cyan, d, 0); m.globalCompositeOperation = 'lighter'; m.drawImage(red, -d, 0); m.restore()
  // band tearing
  const bands = Math.round(3 + 9 * g)
  for (let i = 0; i < bands; i++) {
    const y = Math.floor(r() * H), h = Math.floor(10 + r() * 90 * g), off = Math.round((r() - 0.5) * 220 * g)
    m.drawImage(tmp, 0, y, W, h, off, y, W, h)
    if (r() < 0.35 * g) { m.save(); m.globalAlpha = 0.35 * g; m.fillStyle = r() < 0.5 ? '#ff2bd6' : '#2bfff0'; m.fillRect(0, y, W, Math.max(4, h * 0.3)); m.restore() }
  }
  // scanlines
  m.save(); m.globalAlpha = 0.12 * g; m.fillStyle = '#000'; for (let y = 0; y < H; y += 6) m.fillRect(0, y, W, 2); m.restore()
}

// ═══════════════════════════════════════ the engine
export function makeGlitch(cfg) {
  const D = cfg.len, SIGN = cfg.sign, NAME = SIGN_NAME[SIGN]
  const LOOP = cfg.ending === 'loop'
  const LOOP_IN = LOOP ? D - 0.45 : D
  const hookOut = cfg.hookOut ?? 3.0
  const err = { title: `${NAME}.EXE`, buttons: ['WAIT', 'PATCH'], out: hookOut - 0.2, ...cfg.err }
  const title = cfg.win?.title ?? `${NAME}.EXE`
  const hits = cfg.hits ?? []
  const caps = cfg.caps ?? [], pis = cfg.pis ?? [], lines = (cfg.stars ?? []).map(l => ({ speaker: 'THE STARS', ...l }))
  const boxCfg = { open: lines.length ? lines[0].t - 0.25 : 0, close: lines.length ? typeTimes(lines).at(-1).done + 1.8 : 0, ...(Array.isArray(cfg.box) ? {} : cfg.box) }
  const chapters = cfg.chapters ?? []
  const nrK = t => (cfg.notResp ?? [[-1, 2.6]]).reduce((a, [p, q]) => Math.max(a, prog(t, p, p + 0.05) * (1 - prog(t, q, q + 0.12))), 0)

  // time remap: freezes hold the scene at their start
  const freezes = hits.filter(h => h.kind === 'freeze' || h.kind === 'scratch').map(h => ({ ...h, dur: h.dur ?? 0.55 }))
  const sceneT = t => { for (const f of freezes) if (t >= f.at && t < f.at + f.dur) return f.at; return t }
  // glitch intensity: the opening glitch + spikes + the film's own keys
  const glitchK = t => {
    let g = t < 0.9 ? 0.85 : t < 1.4 ? 0.85 * (1 - ease.outCubic(prog(t, 0.9, 1.4))) : 0
    if (t < 0.9) g = 0.3 + 0.3 * Math.abs(Math.sin(t * 13))
    for (const h of hits) if (h.kind === 'glitch') g = Math.max(g, (h.g ?? 0.8) * (1 - prog(t, h.at, h.at + (h.dur ?? 0.4))) * (t >= h.at ? 1 : 0))
    for (const [a, v, b] of cfg.glitch ?? []) if (t >= a && t < (b ?? a + 0.3)) g = Math.max(g, v)
    return g
  }
  // camera: whip zooms + shakes
  const cam = t => {
    let z = 1, cx = 540, cy = 960, sx = 0, sy = 0
    for (const h of hits) {
      if (h.kind === 'whip') {
        const p = prog(t, h.at, h.at + 0.16), q = prog(t, h.at + (h.hold ?? 0.6), h.at + (h.hold ?? 0.6) + 0.25)
        const k = ease.outCubic(p) * (1 - ease.inOutQuad(q))
        if (k > 0) { z *= 1 + (h.z ?? 0.3) * k; cx = lerp(cx, h.x ?? 540, k); cy = lerp(cy, h.y ?? 960, k) }
      }
      if (h.kind === 'shake' || h.kind === 'freeze' || h.kind === 'scratch') {
        const dur = h.kind === 'shake' ? (h.dur ?? 0.5) : 0.18
        const p = prog(t, h.at, h.at + dur)
        if (p > 0 && p < 1) { const a = (h.amp ?? 16) * (1 - p); sx += Math.sin(t * 83) * a; sy += Math.cos(t * 71) * a * 0.7 }
      }
    }
    if (t < 0.6) { sx += Math.sin(t * 97) * 9; sy += Math.cos(t * 89) * 6 }
    return { z, cx, cy, sx, sy }
  }

  function drawFrame(x, t, aux) {
    const st = sceneT(t)
    drawSky(x, t, SKY_H)
    // the desktop grid
    x.save(); x.globalAlpha = 0.07; x.fillStyle = '#c9a6ff'; for (let gx = 0; gx < 1080; gx += 60) x.fillRect(gx, 0, 2, 1920); for (let gy = 0; gy < 1920; gy += 60) x.fillRect(0, gy, 1080, 2); x.restore()
    const c = cam(t)
    x.save(); x.translate(540 + c.sx, 960 + c.sy); x.scale(c.z, c.z); x.translate(-c.cx, -c.cy)
    // main window + the story
    const nr = nrK(st)
    osWindow(x, BODY.x, BODY.y - 56, BODY.w, BODY.h + 56, title, { nr, accent: cfg.accent ?? '#5b4bd6', t: st })
    x.save(); x.beginPath(); x.rect(BODY.x, BODY.y, BODY.w, BODY.h); x.clip()
    cfg.scene(x, st, K)
    x.restore()
    if (nr > 0) { x.save(); x.globalAlpha = 0.3 * nr; R(x, '#f4f1fa', BODY.x, BODY.y, BODY.w, BODY.h); x.restore() }
    // the frame-0 error dialog: mid-slam at t = 0, dismissed at err.out
    const ek = (t < 0.22 ? 1.1 - 0.1 * ease.outCubic(t / 0.22) : 1) * outK(t, [err.out, err.out + 0.22])
    errorDialog(x, t, { cy: err.cy ?? 1500, title: err.title, msg: err.msg ?? [], buttons: err.buttons, k: ek, shake: t < 0.5 ? 1 - t * 2 : 0, icon: err.icon ?? 'x' })
    for (const e of cfg.errs ?? []) errorDialog(x, t, { cy: e.cy ?? 1000, title: e.title ?? err.title, msg: e.msg, buttons: e.buttons ?? ['OK'], k: pop01(t, e.at, 0.22, 2.4) * outK(t, [e.out - 0.15, e.out]), shake: prog(t, e.at, e.at + 0.4) < 1 && t >= e.at ? 1 - prog(t, e.at, e.at + 0.4) : 0, icon: e.icon ?? 'x' })
    if (cfg.overlay) cfg.overlay(x, st, K)
    if (cfg.patch) installer(x, t, cfg.patch, SIGN)
    if (cfg.notes) patchNotes(x, t, cfg.notes)
    for (const p of pis) pisPopup(x, t, p)
    if (Array.isArray(cfg.box)) for (const B of cfg.box) starsBox(x, t, lines.filter(l => l.t >= B.open && l.t < B.close), B)
    else starsBox(x, t, lines, boxCfg)
    x.restore()
    // freeze-frame chrome (record scratch): tint, red circle, label
    for (const f of freezes) {
      if (t < f.at || t >= f.at + f.dur + 0.1) continue
      const k = 1 - prog(t, f.at + f.dur, f.at + f.dur + 0.1)
      x.save(); x.globalAlpha = 0.22 * k; R(x, '#9ab0d8', 0, 0, 1080, 1920); x.restore()
      if (f.circle) {
        const p = ease.outCubic(prog(t, f.at + 0.05, f.at + 0.35))
        x.save(); x.globalAlpha = k; x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'
        x.beginPath(); x.ellipse(f.circle.x, f.circle.y, f.circle.r, f.circle.r * 0.86, -0.2, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2.1 * p); x.stroke(); x.restore()
      }
      if (f.label) sticker(x, t, f.label, f.lx ?? 540, f.ly ?? 1300, f.at + 0.12, f.at + f.dur + 0.1, { col: RED, ink: '#fff', size: 44 })
      label(x, '❚❚ PAUSED', 1020, 1760, { size: 24, align: 'right', col: BONE, alpha: k * (Math.floor(t * 4) % 2 ? 1 : 0.4) })
    }
    glitchPost(aux.main, aux.tmp, aux.red, aux.cyan, t, glitchK(t))
    // the top zone (drawn after the glitch so the hook stays legible): hook → captions → last line
    if (t < hookOut + 0.3) {
      const a = outK(t, [hookOut, hookOut + 0.25])
      const gk = glitchK(t), jx = gk > 0.05 ? Math.round(Math.sin(Math.floor(t * 24) * 2.7) * 10 * gk) : 0
      if (gk > 0.05) { x.save(); x.globalCompositeOperation = 'lighter'; richText(x, t, cfg.hook, 540 - 8 * gk - jx, TOP.y0 + 36, { size: cfg.hookSize ?? 84, maxW: 980, at: -1, alpha: a * 0.5, col: '#ff2b6e', accent: '#ff2b6e', stroke: null, shadowCol: null }); richText(x, t, cfg.hook, 540 + 8 * gk + jx, TOP.y0 + 36, { size: cfg.hookSize ?? 84, maxW: 980, at: -1, alpha: a * 0.5, col: '#2bfff0', accent: '#2bfff0', stroke: null, shadowCol: null }); x.restore() }
      richText(x, t, cfg.hook, 540 + jx * 0.3, TOP.y0 + 36, { size: cfg.hookSize ?? 84, maxW: 980, at: -1, alpha: a, accent: cfg.hookAccent ?? '#ff5c7a' })
      if (cfg.promise) richText(x, t, cfg.promise, 540, 452, { size: 40, weight: 800, at: 1.0, gap: 0.05, alpha: a, accent: GOLD })
    }
    for (const cp of caps) {
      if (t < cp.at - 0.05 || t > cp.out + 0.05) continue
      richText(x, t, cp.text, 540, cp.y ?? TOP.y0 + 60, { size: cp.size ?? 66, maxW: 960, at: cp.at, gap: 0.05, alpha: outK(t, [cp.out - 0.2, cp.out]), accent: cp.col ?? GOLD })
    }
    if (cfg.last && t >= cfg.last.at - 0.05) richText(x, t, cfg.last.text, 540, cfg.last.y ?? TOP.y0 + 40, { size: cfg.last.size ?? 96, accentSize: (cfg.last.size ?? 96) * 1.12, maxW: 980, at: cfg.last.at, gap: 0.09, accent: cfg.last.col ?? GOLD, wobble: 1 })
    chapters.forEach((C, i) => chapterSticker(x, t, C, chapters[i + 1]))
    taskbar(x, t, { title: `${NAME}.EXE`, nr, cry: cfg.trayCry ? cfg.trayCry(t) : 1.5 })
    // the bug
    label(x, 'LOVE GLITCH', 56, 88, { size: 30, align: 'left', col: BONE, font: INTER, weight: 800, alpha: 0.92, stroke: 'rgba(5,3,12,0.6)' })
    // flashes
    for (const h of hits) if (h.kind === 'flash' || h.kind === 'whip' || h.kind === 'scratch') {
      const p = prog(t, h.at, h.at + (h.kind === 'flash' ? 0.22 : 0.12))
      if (p > 0 && p < 1) { x.save(); x.globalAlpha = (h.kind === 'flash' ? 0.7 : 0.3) * (1 - p); x.fillStyle = h.col ?? (h.kind === 'flash' ? '#ff2b6e' : '#fff8ee'); x.fillRect(0, 0, 1080, 1920); x.restore() }
    }
  }

  const K = { BODY, R, box, drawBits, sparkles, hearts, confetti, bubble, label, shadow, richText, star, pisces, narrator, phone, progressBar, meter, sticker, errorDialog, osWindow, HEART, BROKEN, pop01, outK, win01, prog, ease, lerp, clamp, easeOutBack, sign: SIGN, hero: (x, t, px, py, size, o = {}) => star(x, t, SIGN, px, py, size, o) }

  async function build(stage) {
    try { await Promise.all(["900 100px Inter", "800 100px Inter", "700 100px Inter", "700 46px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const mk = () => { const c = document.createElement('canvas'); c.width = 1080; c.height = 1920; return c }
    const aux = { main: cv, tmp: mk(), red: mk(), cyan: mk() }
    const zero = mk(), zx = zero.getContext('2d')
    const auxZ = { main: zero, tmp: aux.tmp, red: aux.red, cyan: aux.cyan }
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        drawFrame(x, t, aux)
        if (LOOP && t > LOOP_IN) {
          // the loop-back: ease into the exact frame-0 composition
          drawFrame(zx, 0, auxZ)
          const k = ease.inOutCubic(prog(t, LOOP_IN, D - 1 / 30))
          x.save(); x.globalAlpha = k; x.drawImage(zero, 0, 0); x.restore()
        }
        drawGrain(gx, LOOP && t > LOOP_IN ? 0 : t)
      },
    }
  }

  // ── sound
  const glitchCues = (t0, dur = 0.8, seed = 1) => {
    const r = rng(seed), out = []
    for (let s = 0; s < dur; s += 0.05) { if (r() < 0.7) out.push(['chip', r3(t0 + s), 200 + Math.floor(r() * 12) * 140, 0.04, { wave: 'square', duty: 0.125, gain: 0.018, decay: 0.05, sustain: 0.2 }]) }
    return out
  }
  const errDing = t0 => [['pop', r3(t0), 523.25, 0.06, 0], ['pop', r3(t0 + 0.09), 392, 0.06, 0], ['tick', r3(t0), 0.05]]
  const scratch = t0 => [['whoosh', r3(t0), 0.16, 0.08], ['pop', r3(t0 + 0.02), 330, 0.05, 0], ['pop', r3(t0 + 0.07), 196, 0.05, 0], ['tick', r3(t0 + 0.12), 0.06]]
  const CUES = [
    ...errDing(0), ...glitchCues(0, 0.9, 3), ['crash', 0, { gain: 0.04, len: 1.2 }],
    ['whoosh', r3(err.out), 0.25, 0.04], ['pop', r3(err.out + 0.05), 784, 0.03, 0],
    ...hits.flatMap(h => h.kind === 'flash' ? [['crash', r3(h.at), { gain: 0.03, len: 0.8 }], ['tick', r3(h.at), 0.05]]
      : h.kind === 'whip' ? [['whoosh', r3(h.at - 0.06), 0.22, 0.06], ['pop', r3(h.at + 0.1), 1318.51, 0.03, 0]]
      : h.kind === 'shake' ? [['tom', r3(h.at), 90, { gain: 0.2 }], ['tick', r3(h.at), 0.05]]
      : h.kind === 'glitch' ? glitchCues(h.at, h.dur ?? 0.4, Math.round(h.at * 10))
      : (h.kind === 'freeze' || h.kind === 'scratch') ? scratch(h.at) : []),
    ...(cfg.errs ?? []).flatMap(e => errDing(e.at)),
    ...caps.map(c => ['pop', r3(c.at), 659.25, 0.03, 0]),
    ...pis.flatMap(p => [['whoosh', r3(p.at), 0.3, 0.04], ['pluck', r3(p.at + 0.3), 587.33, 0.05, 0.6], ['pluck', r3(p.at + 0.5), 554.37, 0.05, 0.6], ['pluck', r3(p.at + 0.7), 523.25, 0.05, 0.8]]),
    ...(lines.length ? [...(Array.isArray(cfg.box) ? cfg.box.map(B => ['pop', r3(B.open), 739.99, 0.035, 0]) : [['pop', r3(boxCfg.open), 739.99, 0.035, 0]]), ...starsCues(lines)] : []),
    ...(cfg.patch ? [['pop', r3(cfg.patch.at), 880, 0.04, 0], ['riser', r3(cfg.patch.at + 0.3), r3(cfg.patch.at + 0.3 + cfg.patch.dur), 0.05], ['bell', r3(cfg.patch.at + 0.3 + cfg.patch.dur), 1567.98, 0.05, 1.2, 0], ['glitter', r3(cfg.patch.at + 0.3 + cfg.patch.dur), r3(cfg.patch.at + 1.2 + cfg.patch.dur)]] : []),
    ...(cfg.notes ? cfg.notes.items.flatMap((_, i) => [['pop', r3(cfg.notes.at + 0.6 + i * (cfg.notes.gap ?? 1.6)), [659.25, 783.99, 880, 1046.5][i % 4], 0.045, 0]]) : []),
    ...chapters.flatMap(C => [['whoosh', r3(C.at - 0.05), 0.25, 0.05], ['pop', r3(C.at + 0.05), 523.25, 0.05, 0], ['pop', r3(C.at + 0.15), 783.99, 0.05, 0]]),
    ...(cfg.last ? [...Array.from({ length: wordCount(cfg.last.text) }, (_, i) => ['pop', r3(cfg.last.at + i * 0.09), [523.25, 659.25, 783.99, 880, 1046.5][i % 5], 0.03, 0]), ['bell', r3(cfg.last.at + 0.4), 1567.98, 0.03, 1.2, 0]] : []),
    ...(LOOP ? [['whoosh', r3(LOOP_IN - 0.05), 0.4, 0.04]] : []),
    ...(cfg.cues ?? []),
  ].filter(c => c[1] >= 0 && c[1] < D)

  const mu = cfg.music
  const MUSIC = { style: mu.style, key: mu.key, seed: mu.seed, sections: { drop: mu.drop ?? hookOut, ...(mu.breakdown ? { breakdown: mu.breakdown } : {}), ...(mu.lift ? { lift: mu.lift } : {}), outroAt: LOOP ? D - 0.5 : (cfg.last ? cfg.last.at : D - 1.5) } }
  // shared hook-kit layers (read-only import): cfg.rec = record scratch + freeze, cfg.kwhip = whip zoom, cfg.caught
  const recs = cfg.rec ? [].concat(cfg.rec) : []
  const SC = [recs.length ? frozen(build, recs) : build, ...(cfg.kwhip ? [whipZoom(cfg.kwhip)] : []), ...recs.map(r => recordScratch(r)), ...(cfg.caught ? [].concat(cfg.caught).map(c => caught(c)) : [])]
  CUES.push(...(cfg.kwhip ? whipZoomCues(cfg.kwhip) : []), ...recs.flatMap(r => recordScratchCues(r)), ...(cfg.caught ? [].concat(cfg.caught).flatMap(c => caughtCues(c)) : []))
  return { DURATION: D, SCENES: SC, CUES, MUSIC, glitchCues, errDing, scratch }
}
