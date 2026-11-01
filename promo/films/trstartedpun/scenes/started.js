// started — the shared look of HOW IT STARTED vs HOW IT'S GOING (Star Talk Trends §6, promo/films/STARTALK-TRENDS.md):
// trstartedhi, trstartedcard, trstartedpancake, trstartedpun, trstartedplaylist. Every film carries an identical copy
// of this file in its own folder, so the five look like one format without touching another folder.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.0–6.6   a white caption sticker "How it *started.*" + a small ink sub-sticker; ONE big polaroid fills the frame
//             (cool, faded, grainy film grade, a date stamp in the corner) and plays the awkward first moment live.
//             At T.snapA a shutter flash freezes it into a photo.
//   6.6       the one card cut (cardfx). Under it the layout swaps: the old polaroid is now pinned small top-left with
//             tape, and a NEW polaroid (warm, glowing, today) fills the frame: "How it's *going.*" (sticker, right).
//   6.6–12.3  the warm present plays the callback live. One THE STARS line in the retro box under it.
//   12.3–15.6 both polaroids slide side by side (the meme image itself), the last line pops big under them, THE STARS
//             and ♓ Pisces (crying, always) stand at the bottom.
//
//   makeStarted(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, accent,                         accent: the last line's accent colour
//     A: { draw(px, t, T), stamp, sub },  px: the 820×820 photo canvas (cleared each frame); t is frozen after T.snapA
//     B: { draw(px, t, T), stamp, sub },  live through to the end
//     lines: [{ t, speaker, text, color }]   box lines (≤ 46 chars); lines before T.cut get their own box that closes
//                                         before the shutter, the rest one that closes before the composite
//     last: 'Hi. *Hi.*',                  the last line (popText, Inter 800 + one italic accent)
//     comp?(x, t, T, k)                   extra drawing in the final composite (after the two stars at the bottom)
//     cues?(T) → extra sound cues
//   }
// Helpers for the scenes: R, drawBits, sparkles, speech (pixel speech bubble), hearts, starFrame/inSprite/tearsCells,
// pisces (♓ with tears), pop01, outK, popOut, BEAT, colours. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', HEART = '#ff4f86'
export const PAPER = '#f3ecdf'
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
export { drawStarChar, signStar, STAR, talkHops, easeOutBack, drawPixelStar }

export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
export const P = 820                                       // photo canvas size
const CPS = 30

// ── the shared timeline
export const T = {
  black: [0, 0.3], cap: 0.12, bug: 0.35, frameIn: [0.16, 0.62], subA: 0.55,
  snapA: 6.12, cut: 6.6,
  capB: 6.68, subB: 7.05, frameB: [6.6, 6.95],
  snapB: 12.1, comp: [12.28, 12.88], capBOut: [12.2, 12.4],
  last: 12.95, lastLand: 13.45,
  out: [15.12, 15.5], bugOut: [15.28, 15.55],
}

// ── frames: centre, scale, rotation
const FW = 880, FH = 970, BORDER = 30
const FA_FULL = { cx: 540, cy: 900, s: 1, rot: -0.012 }
const FA_PIN = { cx: 222, cy: 418, s: 0.34, rot: -0.12 }
const FB_FULL = { cx: 548, cy: 918, s: 1, rot: 0.01 }
const FA_COMP = { cx: 290, cy: 610, s: 0.5, rot: -0.065 }
const FB_COMP = { cx: 790, cy: 640, s: 0.5, rot: 0.055 }
const lerpF = (a, b, k) => ({ cx: lerp(a.cx, b.cx, k), cy: lerp(a.cy, b.cy, k), s: lerp(a.s, b.s, k), rot: lerp(a.rot, b.rot, k) })

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

// ── the show bug: "HOW IT STARTED" in Inter 800 letter-spaced small caps, top-left, 56 px
function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '16px', height: '16px', background: PINK, boxShadow: `0 0 0 4px ${INK}`, transform: 'rotate(45deg)' }, box)
  el('div', { font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'How&nbsp;it&nbsp;started')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── caption stickers (DOM): `*word*` = EB Garamond italic accent
const fmt = (s, acc) => s.replace(/\*([^*]+)\*/g, `<span style="font:italic 600 1.22em ${SERIF};color:${acc};letter-spacing:0">$1</span>`)
function sticker(root, text, { top, side = 'center', at, size = 70, accent = '#d6336c', dark = false, rot = -1.5 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: side === 'right' ? 'flex-end' : side === 'left' ? 'flex-start' : 'center', pointerEvents: 'none' }, root)
  const s = el('div', {
    margin: side === 'right' ? '0 64px 0 0' : side === 'left' ? '0 0 0 64px' : '0', padding: dark ? '10px 26px 12px' : '8px 34px 14px',
    background: dark ? 'rgba(27,18,54,0.92)' : '#fffaf0', color: dark ? BONE : INK, borderRadius: dark ? '12px' : '20px',
    font: dark ? `700 ${size}px ${MONO}` : `800 ${size}px ${INTER}`, letterSpacing: dark ? '0.02em' : '-0.02em', lineHeight: '1.1', whiteSpace: 'nowrap',
    boxShadow: dark ? '0 6px 0 rgba(6,4,18,0.6)' : '0 8px 0 rgba(6,4,18,0.55), 0 0 0 5px rgba(27,18,54,0.9)', transformOrigin: side === 'right' ? '90% 50%' : '50% 50%',
  }, wrap, fmt(text, accent))
  return {
    update(t, out = 1) {
      const p = prog(t, at, at + 0.38)
      const on = t >= at && out > 0.01
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const sc = (0.4 + 0.6 * easeOutBack(p, 3)) * lerp(0.85, 1, out)
      s.style.opacity = String(clamp(p * 4) * out)
      s.style.transform = `rotate(${(rot + 6 * (1 - ease.outCubic(p))).toFixed(2)}deg) scale(${sc.toFixed(4)})`
    },
  }
}

// ── the polaroid
function drawPolaroid(x, photo, F, { label, stamp, grade, flash = 0, tape = 0, alpha = 1, glow = 0 }) {
  if (F.s <= 0.01 || alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  x.translate(F.cx, F.cy); x.rotate(F.rot); x.scale(F.s, F.s)
  const L = -FW / 2, Tt = -FH / 2
  if (glow > 0) {
    const g = x.createRadialGradient(0, 0, 100, 0, 0, 760)
    g.addColorStop(0, `rgba(255,196,120,${0.32 * glow})`); g.addColorStop(1, 'rgba(255,196,120,0)')
    x.fillStyle = g; x.fillRect(-900, -900, 1800, 1800)
  }
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(L + 18, Tt + 24, FW, FH)
  x.fillStyle = INK; x.fillRect(L - 6, Tt - 6, FW + 12, FH + 12)
  x.fillStyle = PAPER; x.fillRect(L, Tt, FW, FH)
  x.fillStyle = '#e4d9c4'; x.fillRect(L, Tt + FH - 10, FW, 10)
  const ix = L + BORDER, iy = Tt + BORDER
  x.fillStyle = '#120c26'; x.fillRect(ix - 3, iy - 3, P + 6, P + 6)
  x.save()
  if (grade === 'past') x.filter = 'saturate(0.5) sepia(0.32) brightness(1.08) contrast(0.88)'
  x.drawImage(photo, ix, iy, P, P)
  x.restore()
  if (grade === 'past') {
    // faded film: lifted blacks, a cool vignette, light leak
    x.fillStyle = 'rgba(210,200,230,0.1)'; x.fillRect(ix, iy, P, P)
    const v = x.createRadialGradient(ix + P / 2, iy + P / 2, P * 0.3, ix + P / 2, iy + P / 2, P * 0.75)
    v.addColorStop(0, 'rgba(20,12,40,0)'); v.addColorStop(1, 'rgba(20,12,40,0.5)')
    x.fillStyle = v; x.fillRect(ix, iy, P, P)
    const lk = x.createLinearGradient(ix + P, iy, ix + P - 260, iy + 200)
    lk.addColorStop(0, 'rgba(255,140,80,0.28)'); lk.addColorStop(1, 'rgba(255,140,80,0)')
    x.fillStyle = lk; x.fillRect(ix, iy, P, P)
  } else {
    const wm = x.createRadialGradient(ix + P / 2, iy + P * 0.35, 40, ix + P / 2, iy + P / 2, P * 0.8)
    wm.addColorStop(0, 'rgba(255,200,130,0.16)'); wm.addColorStop(1, 'rgba(255,170,110,0.04)')
    x.globalCompositeOperation = 'screen'; x.fillStyle = wm; x.fillRect(ix, iy, P, P); x.globalCompositeOperation = 'source-over'
  }
  if (stamp) {
    x.font = `700 34px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'alphabetic'
    x.shadowColor = 'rgba(255,120,40,0.9)'; x.shadowBlur = 12
    x.fillStyle = '#ff9d3a'; x.fillText(stamp, ix + P - 26, iy + P - 24)
    x.shadowBlur = 0
  }
  if (flash > 0) { x.fillStyle = `rgba(255,255,255,${flash})`; x.fillRect(ix, iy, P, P) }
  // the handwritten label on the strip
  x.font = `italic 600 64px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = '#2a2350'; x.fillText(label, 0, Tt + BORDER + P + (FH - BORDER - P) / 2 + 2)
  if (tape > 0) {
    x.save(); x.translate(0, Tt - 4); x.rotate(0.05)
    x.fillStyle = `rgba(255,236,190,${0.75 * tape})`; x.fillRect(-120, -34, 240, 68)
    x.fillStyle = `rgba(255,255,255,${0.25 * tape})`; x.fillRect(-120, -34, 240, 12)
    x.restore()
  }
  x.restore()
}

/** the film */
export function makeStarted(cfg) {
  const LINES = (cfg.lines || []).map(l => ({ speaker: 'THE STARS', ...l }))
  // one box per photo: lines before the cut close before the shutter; the rest close before the composite
  const LA = LINES.filter(l => l.t < T.cut), LB = LINES.filter(l => l.t >= T.cut)
  const closeAt = (L, lim) => { const tm = lineTimes(L, { cps: CPS }); return r3(Math.min(lim, tm[tm.length - 1].done + 1.7)) }
  const accent = cfg.accent || PINK

  async function build(stage) {
    try {
      await Promise.all(["800 70px Inter", "800 120px Inter", "italic 600 64px 'EB Garamond'", "italic 500 150px 'EB Garamond'", "700 34px 'Space Mono'", "700 52px 'Space Mono'", "700 40px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const assets = cfg.load ? await cfg.load() : {}
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const mk = () => { const c = document.createElement('canvas'); c.width = P; c.height = P; return c }
    const phA = mk(), phB = mk(), ax = phA.getContext('2d'), bx = phB.getContext('2d')
    const capA = sticker(root, cfg.capA || 'How it *started.*', { top: 150, at: T.cap, accent: '#7a5cc4' })
    const subA = cfg.A.sub ? sticker(root, cfg.A.sub, { top: 286, at: T.subA, size: 34, dark: true, rot: 1 }) : null
    const capB = sticker(root, cfg.capB || 'How it’s *going.*', { top: 150, side: 'right', at: T.capB, accent: '#e0457b', rot: 1.5 })
    const subB = cfg.B.sub ? sticker(root, cfg.B.sub, { top: 286, side: 'right', at: T.subB, size: 34, dark: true, rot: -1 }) : null
    const last = popText(root, cfg.last, { top: 1030, size: 124, accentSize: 168, at: T.last, late: 1, lateAt: T.lastLand, wobble: true, accentColor: accent })
    const boxes = [[LA, T.snapA - 0.2], [LB, T.comp[0] - 0.1]].filter(([L]) => L.length).map(([L, lim]) => dialogueBox(root, { lines: L, y: 1446, open: L[0].t - 0.22, close: closeAt(L, lim), cps: CPS }))
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3))
        drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.65, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
        const out = popOut(t, T.out)
        const comp = ease.inOutCubic(prog(t, ...T.comp))
        // the photos
        const tA = Math.min(t, T.snapA)
        if (t < T.cut || out > 0) { ax.clearRect(0, 0, P, P); cfg.A.draw(ax, tA, T, assets) }
        if (t >= T.cut - 0.05) { bx.clearRect(0, 0, P, P); cfg.B.draw(bx, t, T, assets) }
        const flashA = t > T.snapA ? 0.95 * Math.exp(-(t - T.snapA) * 9) : 0
        const flashB = t > T.snapB ? 0.85 * Math.exp(-(t - T.snapB) * 9) : 0
        if (t < T.cut) {
          const k = easeOutBack(prog(t, ...T.frameIn), 1.5)
          const drift = 1 + 0.02 * prog(t, T.frameIn[1], T.cut)
          const F = { ...FA_FULL, s: k * drift, rot: FA_FULL.rot + (1 - k) * 0.2 }
          drawPolaroid(x, phA, F, { label: 'how it started', stamp: cfg.A.stamp, grade: 'past', flash: flashA })
        } else {
          // pinned A settles with a wobble; B pops in; then both slide into the composite
          const dt = t - T.cut, wob = 0.09 * Math.exp(-dt * 5) * Math.sin(dt * 18)
          const FA = lerpF({ ...FA_PIN, rot: FA_PIN.rot + wob }, FA_COMP, comp)
          const kb = easeOutBack(prog(t, ...T.frameB), 1.3)
          const FB = lerpF({ ...FB_FULL, s: FB_FULL.s * lerp(0.9, 1, kb) }, FB_COMP, comp)
          FA.s *= out; FB.s *= out
          drawPolaroid(x, phB, FB, { label: 'how it’s going', stamp: cfg.B.stamp, grade: 'now', flash: flashB, glow: 1, tape: comp })
          drawPolaroid(x, phA, FA, { label: 'how it started', stamp: cfg.A.stamp, grade: 'past', tape: 1 })
          if (comp > 0) {
            // THE STARS and ♓ Pisces under the composite
            const k1 = pop01(t, T.comp[1] - 0.1, 0.36, 2) * out, k2 = pop01(t, T.comp[1] + 0.05, 0.36, 2) * out
            const hops = [T.comp[1] + 0.3, T.lastLand + 0.02, T.lastLand + 0.5]
            drawStarChar(x, 230, 1560, 230, t, { color: STAR.sky, mood: t > T.lastLand ? 'sparkle' : 'happy', look: [0.6, -1], hops, pop: k1, seed: 2, glow: 1.05 })
            pisces(x, t, 860, 1570, 220, t > T.lastLand ? 3 : 2, { mood: t > T.lastLand ? 'happy' : 'sparkle', look: [-1, -1], pop: k2, hops: [T.lastLand + 0.08] })
            if (cfg.comp) cfg.comp(x, t, T, k1)
            sparkles(x, t, 540, 1120, T.lastLand + 0.02, 12, 300, 1, [GOLD, accent, BONE])
          }
        }
        capA.update(t, t < T.cut ? 1 : 0)
        if (subA) subA.update(t, t < T.cut ? 1 : 0)
        capB.update(t, outK(t, T.capBOut))
        if (subB) subB.update(t, outK(t, T.capBOut))
        for (const b of boxes) b.update(t)
        last.update(t, outK(t, [T.out[0] + 0.05, T.out[1]]))
        bug.update(t, outK(t, T.bugOut))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // one candidate cut: the swap from the old photo to the new one
  const CUTS = [T.cut]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73, 1244.51]
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const shutter = t0 => [['tick', r3(t0 - 0.03), 0.07], ['tick', r3(t0 + 0.05), 0.05], ['pop', r3(t0), 1864.66, 0.03, 0], ['whoosh', r3(t0 - 0.02), 0.18, 0.025]]
  const CUES = [
    ['whoosh', T.frameIn[0], 0.4, 0.04], ...wordPops(T.cap, 3, 0.08, 0), ['pop', T.bug + 0.06, 830.61, 0.03, -0.4],
    ['pluck', T.frameIn[1], 698.46, 0.03, 0.4, 0], ...(cfg.A.sub ? [['tick', T.subA + 0.05, 0.03]] : []),
    ...shutter(T.snapA),
    ...wordPops(T.capB, 3, 0.08, 2), ['bell', T.capB + 0.1, 1396.91, 0.025, 1.0, 0.3], ...(cfg.B.sub ? [['tick', T.subB + 0.05, 0.03]] : []),
    ['glitter', T.frameB[0] + 0.1, T.frameB[0] + 0.5],
    ...talkCues(LINES, { cps: CPS }),
    ...shutter(T.snapB), ['whoosh', T.comp[0], 0.5, 0.04], ['tick', T.comp[1] - 0.05, 0.04], ['tick', T.comp[1] + 0.02, 0.04],
    ['pop', T.comp[1] - 0.05, 932.33, 0.03, -0.4], ['pop', T.comp[1] + 0.1, 1108.73, 0.03, 0.4],
    ...wordPops(T.last, 2, 0.1, 1, 0.03), ['pop', T.lastLand, 1108.73, 0.05, 0], ['pop', T.lastLand + 0.08, 1396.91, 0.04, 0],
    ['bell', T.lastLand + 0.05, 2217.46, 0.03, 1.2, 0], ['glitter', T.lastLand, T.lastLand + 0.5],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T }
}
