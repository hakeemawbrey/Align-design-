// little — the shared look of LITTLE THINGS (Star Talk Trends §18, promo/films/STARTALK-TRENDS.md):
// trlittlehome, trlittlebite, trlittleplate, trlittlehoodie, trlittlecharge. Every film carries an identical copy of this
// file in its own folder, so the five look like one format without touching another folder.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.0–1.1   the bold top caption sticker "Little things that | mean *I love you.*" and the "LITTLE THINGS" bug pop;
//             a stitched fabric patch (cream border, pink running stitch, tiny pixel hearts) pops up mid-frame: the
//             mini-scene plays live inside it. A kraft paper tag hangs under it with the gesture, handwritten.
//   1.1–12.2  the mini-scene: set-up, one small gesture, the reaction. A timestamp chip can tick in its top-right corner.
//   7.2       the one card cut (cardfx), always on the mini-scene's time skip.
//   12.2–15.6 the patch shrinks up, the last line pops big under it, THE STARS and ♓ Pisces (crying, always) at the bottom.
//
//   makeLittle(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, accent,                       accent: the last line's accent colour
//     tag: '“text me when | you get *home.*”'   the gesture on the paper tag (' | ' = line break, *…* = accent), tagAccent?
//     draw(px, t, T, assets)            the mini-scene on the S×S canvas px (cleared each frame), pure f(t)
//     clock?: [{ at, text }]            the timestamp chip (top-right of the patch)
//     lines: [{ t, speaker, text, color }]   box lines (≤ 46 chars); the box closes before the patch shrinks
//     last: '*Home* safe.', lastSize?, lastAccentSize?, lastLate?
//     comp?(x, t, T, k)                 extra drawing in the final composite (after the two stars at the bottom)
//     cues?(T) → extra sound cues, load?() → assets
//   }
// Helpers for the scenes: R, drawBits, sparkles, speech (pixel speech bubble), hearts, starFrame/inSprite/tearsCells,
// pisces (♓ with tears), drawPhoneMini, room helpers, pop01, outK, popOut, colours. Pure f(t); nothing touches
// `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', HEART = '#ff4f86'
export const CREAM = '#fff3e4', KRAFT = '#e2c391', SKYB = '#9fd8ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
export const PIS = signStar('pisces')
export { drawStarChar, signStar, STAR, talkHops, easeOutBack, drawPixelStar, clamp, lerp, prog, ease }

export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
export const S = 800                                       // the mini-scene canvas (S × S)
const CPS = 30

// ── the shared timeline
export const T = {
  black: [0, 0.3], cap: 0.12, bug: 0.35, patchIn: [0.18, 0.66], tag: 1.0,
  cut: 7.2,
  tagOut: [12.0, 12.2], shrink: [12.2, 12.75],
  last: 12.85, lastLand: 13.35,
  out: [15.12, 15.5], bugOut: [15.28, 15.55],
}

// ── the patch: full (story) → small (composite)
const BORDER = 40, PW = S + 2 * BORDER
const PATCH_FULL = { cx: 540, cy: 790, s: 1, rot: -0.008 }
const PATCH_SMALL = { cx: 540, cy: 660, s: 0.68, rot: 0.02 }
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
export function hearts(x, t, cx, cy, t0, { n = 5, life = 1.6, cell = 6, spread = 120, seed = 1, col = HEART, rise = 170 } = {}) {
  for (let i = 0; i < n; i++) {
    const born = t0 + i * 0.16, tt = t - born
    if (tt < 0 || tt > life) continue
    const p = tt / life
    const hx = cx + Math.sin(i * 2.3 + seed) * spread * 0.5 + Math.sin(tt * 4 + i) * 10, hy = cy - p * rise
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

/** a bold comic sound word (ink outline), pops at t0 for `life` s */
export function sfx(x, t, cx, cy, t0, text, { col = GOLD, size = 56, life = 1, rot = -0.1 } = {}) {
  const k = pop01(t, t0, 0.2, 3) * outK(t, [t0 + life - 0.2, t0 + life])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineJoin = 'round'; x.lineWidth = Math.round(size / 5); x.strokeStyle = INK; x.strokeText(text, 0, 0); x.fillStyle = col; x.fillText(text, 0, 0)
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
  const Sz = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S: Sz, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
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
export function pisces(x, t, px, py, size, tears, { mood = 'wide', look = [-1, 0], pop = 1, alpha = 1, hops, seed = 6, glyph = false, glow = 0.8 } = {}) {
  const opts = { color: PIS.color, glyph: glyph ? PIS.glyph : null, mood, look, seed, glow, pop, alpha, hops }
  drawStarChar(x, px, py, size, t, opts)
  const F = starFrame(px, py, size, t, opts)
  if (tears && pop > 0.3) { x.save(); x.globalAlpha *= alpha; inSprite(x, F, () => tearsCells(x, t, tears)); x.restore() }
}

/** a small pixel phone (portrait), screen(x, sx, sy, sw, sh) draws the screen contents; rot in radians */
export function drawPhoneMini(x, cx, cy, w, h, { screen, rot = 0, glow = 0, body = '#3a2d74', off = false } = {}) {
  x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  const C = Math.max(4, Math.round(w / 14))
  if (glow > 0) { const g = x.createRadialGradient(0, 0, 10, 0, 0, w * 1.6); g.addColorStop(0, `rgba(170,220,255,${0.45 * glow})`); g.addColorStop(1, 'rgba(170,220,255,0)'); x.fillStyle = g; x.fillRect(-w * 2, -w * 2, w * 4, w * 4) }
  R(x, INK, -w / 2 + C, -h / 2 - C, w - 2 * C, h + 2 * C); R(x, INK, -w / 2 - C, -h / 2 + C, w + 2 * C, h - 2 * C); R(x, INK, -w / 2, -h / 2, w, h)
  R(x, body, -w / 2 + C, -h / 2, w - 2 * C, h); R(x, body, -w / 2, -h / 2 + C, w, h - 2 * C)
  const sx = -w / 2 + C, sy = -h / 2 + C * 2, sw = w - 2 * C, sh = h - 4 * C
  R(x, off ? '#120c2a' : '#1d1640', sx, sy, sw, sh)
  if (screen && !off) { x.save(); x.beginPath(); x.rect(sx, sy, sw, sh); x.clip(); screen(x, sx, sy, sw, sh); x.restore() }
  R(x, INK, -C, -h / 2 + C * 0.5, 2 * C, C * 0.7)
  x.restore()
}

/** a cosy room backdrop: wall with stripes, floor, a window with the night sky. opts: { wall, wall2, floor, window: [x,y,w,h] | null, moon } */
export function room(x, t, { wall = '#4a3a78', wall2 = '#53428a', floor = '#2e2350', floorLine = '#3a2d62', horizon = 600, window = [470, 90, 250, 230], moon = true, lamp = null } = {}) {
  R(x, wall, 0, 0, S, horizon)
  for (let i = 0; i < 10; i++) R(x, wall2, i * 88 + 30, 0, 26, horizon)
  R(x, floor, 0, horizon, S, S - horizon)
  for (let i = 0; i < 6; i++) R(x, floorLine, 0, horizon + 28 + i * 36, S, 4)
  R(x, INK, 0, horizon - 6, S, 8)
  if (window) {
    const [wx, wy, ww, wh] = window
    R(x, INK, wx - 10, wy - 10, ww + 20, wh + 20); R(x, '#16123a', wx, wy, ww, wh)
    for (let i = 0; i < 9; i++) { const sx = wx + ((i * 73) % ww), sy = wy + ((i * 41) % wh); x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 2 + i); R(x, BONE, sx, sy, 4, 4); x.globalAlpha = 1 }
    if (moon) { R(x, '#fff1c8', wx + ww - 80, wy + 30, 44, 44); R(x, '#16123a', wx + ww - 64, wy + 22, 40, 40) }
    R(x, INK, wx + ww / 2 - 4, wy, 8, wh); R(x, INK, wx, wy + wh / 2 - 4, ww, 8)
    R(x, '#f6d2e2', wx - 26, wy - 18, 30, wh + 40); R(x, '#f6d2e2', wx + ww - 4, wy - 18, 30, wh + 40)   // curtains
  }
  if (lamp) {
    const [lx, ly] = lamp
    const g = x.createRadialGradient(lx, ly, 10, lx, ly, 300); g.addColorStop(0, 'rgba(255,214,150,0.35)'); g.addColorStop(1, 'rgba(255,214,150,0)')
    x.fillStyle = g; x.fillRect(lx - 300, ly - 300, 600, 600)
  }
}

/** the timestamp chip (canvas, top-right of the scene): list [{ at, text }] */
function drawClock(x, t, list) {
  let cur = null
  for (const c of list) if (t >= c.at) cur = c
  if (!cur) return
  const k = pop01(t, cur.at, 0.25, 3)
  x.save(); x.translate(S - 40, 40); x.scale(lerp(1.25, 1, k), lerp(1.25, 1, k))
  x.font = `700 34px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
  const w = x.measureText(cur.text).width + 36
  R(x, 'rgba(18,10,40,0.82)', -w, 0, w, 56); R(x, PINK, -w, 0, 8, 56)
  x.fillStyle = BONE; x.fillText(cur.text, -16, 30)
  x.restore()
}

// ── the show bug: a tiny pixel heart + "LITTLE THINGS" in Inter 800 letter-spaced small caps, top-left, 56 px
const BUG_HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '40px', height: '36px', imageRendering: 'pixelated' }, box)
  ic.width = 40; ic.height = 36
  drawBits(ic.getContext('2d'), BUG_HEART, { H: PINK }, 20, 18, 4.4)
  el('div', { font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'Little&nbsp;things')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── DOM stickers: `*word*` = EB Garamond italic accent, ' | ' = line break
const fmt = (s, acc, accW = 600) => s.replace(/\s*\|\s*/g, '<br>').replace(/\*([^*]+)\*/g, `<span style="font:italic ${accW} 1.2em ${SERIF};color:${acc};letter-spacing:0">$1</span>`)
function capSticker(root, text, { top, at, size = 66, accent = '#e0457b', rot = -1.5 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const s = el('div', {
    padding: '10px 36px 16px', background: '#fffaf0', color: INK, borderRadius: '22px', textAlign: 'center',
    font: `800 ${size}px ${INTER}`, letterSpacing: '-0.02em', lineHeight: '1.08', whiteSpace: 'nowrap',
    boxShadow: '0 8px 0 rgba(6,4,18,0.55), 0 0 0 5px rgba(27,18,54,0.9)',
  }, wrap, fmt(text, accent))
  return {
    update(t, out = 1) {
      const p = prog(t, at, at + 0.4)
      const on = t >= at && out > 0.01
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const sc = (0.4 + 0.6 * easeOutBack(p, 3)) * lerp(0.85, 1, out)
      s.style.opacity = String(clamp(p * 4) * out)
      s.style.transform = `rotate(${(rot + 6 * (1 - ease.outCubic(p))).toFixed(2)}deg) scale(${sc.toFixed(4)})`
    },
  }
}
/** the kraft paper tag with the gesture, handwritten, tied on with a string */
function paperTag(root, text, { top, at, accent }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const s = el('div', {
    position: 'relative', padding: '14px 44px 18px 74px', background: KRAFT, color: '#3a2440', textAlign: 'center',
    font: `italic 600 54px ${SERIF}`, lineHeight: '1.0', whiteSpace: 'nowrap', transformOrigin: '50% 0%',
    clipPath: 'polygon(28px 0, 100% 0, 100% 100%, 28px 100%, 0 50%)',
    boxShadow: 'inset 0 -6px 0 rgba(120,80,40,0.25)', filter: 'drop-shadow(0 6px 0 rgba(6,4,18,0.55))',
  }, wrap, fmt(text, accent, 700))
  el('div', { position: 'absolute', left: '30px', top: 'calc(50% - 11px)', width: '22px', height: '22px', borderRadius: '50%', background: '#1b1236', boxShadow: '0 0 0 5px #c9a26b' }, s)
  return {
    update(t, out = 1) {
      const p = prog(t, at, at + 0.5)
      const on = t >= at && out > 0.01
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      // the tag swings in on its string and settles
      const sw = 9 * Math.exp(-(t - at) * 3.2) * Math.cos((t - at) * 9) + 0.8 * Math.sin(t * 1.4)
      s.style.opacity = String(clamp(p * 4) * out)
      s.style.transform = `translateY(${((1 - ease.outCubic(p)) * -60).toFixed(1)}px) rotate(${(-2 + sw).toFixed(2)}deg) scale(${lerp(0.9, 1, out).toFixed(3)})`
    },
  }
}

// ── the stitched fabric patch around the scene canvas
const STITCH = 18
function drawPatch(x, scene, F, { alpha = 1, glow = 1 }) {
  if (F.s <= 0.01 || alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  x.translate(F.cx, F.cy); x.rotate(F.rot); x.scale(F.s, F.s)
  const L = -PW / 2, C = 10
  if (glow > 0) {
    const g = x.createRadialGradient(0, 0, 200, 0, 0, 760)
    g.addColorStop(0, `rgba(255,170,205,${0.22 * glow})`); g.addColorStop(1, 'rgba(255,170,205,0)')
    x.fillStyle = g; x.fillRect(-900, -900, 1800, 1800)
  }
  // stepped-corner shape helper
  const step = (o, col, dx = 0, dy = 0) => {
    x.fillStyle = col
    x.fillRect(L + o + 3 * C + dx, L + o + dy, PW - 2 * o - 6 * C, PW - 2 * o)
    x.fillRect(L + o + dx, L + o + 3 * C + dy, PW - 2 * o, PW - 2 * o - 6 * C)
    x.fillRect(L + o + C + dx, L + o + C + dy, PW - 2 * o - 2 * C, PW - 2 * o - 2 * C)
  }
  step(-6, 'rgba(6,4,18,0.5)', 18, 24)
  step(-6, INK)
  step(0, CREAM)
  // fabric weave
  x.fillStyle = 'rgba(200,170,150,0.18)'
  for (let i = 0; i < PW; i += 10) { x.fillRect(L + i, L, 2, BORDER); x.fillRect(L + i, -L - BORDER, 2, BORDER) }
  // the scene
  const ix = L + BORDER, iy = L + BORDER
  x.fillStyle = INK; x.fillRect(ix - 5, iy - 5, S + 10, S + 10)
  x.drawImage(scene, ix, iy, S, S)
  // the running stitch, pink, around the scene
  x.fillStyle = '#ff7eb0'
  const o = 18, a = L + o, b = -L - o, n = Math.floor((b - a) / (STITCH * 2))
  for (let i = 0; i < n; i++) {
    const p = a + i * STITCH * 2 + 14
    x.fillRect(p, a - 3, STITCH, 6); x.fillRect(p, b - 3, STITCH, 6)
    x.fillRect(a - 3, p, 6, STITCH); x.fillRect(b - 3, p, 6, STITCH)
  }
  // tiny hearts in the corners of the border
  for (const [hx, hy] of [[L + 20, L + 20], [-L - 20, L + 20], [L + 20, -L - 20], [-L - 20, -L - 20]]) drawBits(x, HEART_BM, { H: HEART }, hx, hy, 3.2, { outline: null })
  x.restore()
}

/** the film */
export function makeLittle(cfg) {
  const LINES = (cfg.lines || []).map(l => ({ speaker: 'THE STARS', ...l }))
  const accent = cfg.accent || PINK
  const tm = LINES.length ? lineTimes(LINES, { cps: CPS }) : []
  const boxClose = LINES.length ? r3(Math.min(T.shrink[1] - 0.25, tm[tm.length - 1].done + 1.7)) : 0
  const boxOpen = cfg.boxOpen ?? (LINES.length ? r3(LINES[0].t - 0.22) : 0)

  async function build(stage) {
    try {
      await Promise.all(["800 66px Inter", "800 120px Inter", "800 56px Inter", "italic 600 54px 'EB Garamond'", "italic 700 54px 'EB Garamond'", "italic 500 150px 'EB Garamond'", "700 34px 'Space Mono'", "700 52px 'Space Mono'", "700 40px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const assets = cfg.load ? await cfg.load() : {}
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const scene = document.createElement('canvas'); scene.width = S; scene.height = S
    const sx = scene.getContext('2d')
    const cap = capSticker(root, 'Little things that | mean *I love you.*', { top: 128, at: T.cap })
    const tag = paperTag(root, cfg.tag, { top: 1222, at: T.tag, accent: cfg.tagAccent || '#c2185b' })
    const last = popText(root, cfg.last, { top: cfg.lastTop ?? 1092, size: cfg.lastSize ?? 120, accentSize: cfg.lastAccentSize ?? 164, at: T.last, late: cfg.lastLate ?? 1, lateAt: T.lastLand, wobble: true, accentColor: accent })
    const box = LINES.length ? dialogueBox(root, { lines: LINES, y: 1440, open: boxOpen, close: boxClose, cps: CPS }) : null
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3))
        drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.65, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
        const out = popOut(t, T.out)
        // the mini-scene
        sx.clearRect(0, 0, S, S)
        cfg.draw(sx, t, T, assets)
        // dreamy grade: warm bloom from the top, soft pastel vignette, drifting bokeh
        sx.save()
        sx.globalCompositeOperation = 'screen'
        const bl = sx.createRadialGradient(S * 0.5, S * 0.2, 30, S * 0.5, S * 0.4, S * 0.85)
        bl.addColorStop(0, 'rgba(255,190,150,0.16)'); bl.addColorStop(1, 'rgba(120,90,200,0.03)')
        sx.fillStyle = bl; sx.fillRect(0, 0, S, S)
        for (let i = 0; i < 7; i++) {
          const bx = (i * 151 + t * (8 + i * 2)) % (S + 80) - 40, by = (S * 0.15 + ((i * 97) % (S * 0.7))) + 14 * Math.sin(t * 0.8 + i)
          const g = sx.createRadialGradient(bx, by, 0, bx, by, 26 + (i % 3) * 10)
          g.addColorStop(0, 'rgba(255,214,235,0.22)'); g.addColorStop(1, 'rgba(255,214,235,0)')
          sx.fillStyle = g; sx.fillRect(bx - 50, by - 50, 100, 100)
        }
        sx.restore()
        const vg = sx.createRadialGradient(S / 2, S / 2, S * 0.36, S / 2, S / 2, S * 0.74)
        vg.addColorStop(0, 'rgba(40,20,70,0)'); vg.addColorStop(1, 'rgba(40,20,70,0.42)')
        sx.fillStyle = vg; sx.fillRect(0, 0, S, S)
        if (cfg.clock) drawClock(sx, t, cfg.clock)
        // the patch
        const k = easeOutBack(prog(t, ...T.patchIn), 1.5)
        const sh = ease.inOutCubic(prog(t, ...T.shrink))
        const F = lerpF(PATCH_FULL, PATCH_SMALL, sh)
        F.s *= k * out; F.rot += (1 - k) * 0.2 + (sh > 0 ? 0.012 * Math.sin(t * 1.6) * sh : 0)
        drawPatch(x, scene, F, { glow: 1 })
        if (sh > 0) {
          // THE STARS and ♓ Pisces under the composite
          const k1 = pop01(t, T.shrink[1] - 0.1, 0.36, 2) * out, k2 = pop01(t, T.shrink[1] + 0.05, 0.36, 2) * out
          const hops = [T.shrink[1] + 0.3, T.lastLand + 0.02, T.lastLand + 0.5]
          drawStarChar(x, 200, 1600, 220, t, { color: STAR.sky, mood: t > T.lastLand ? 'sparkle' : 'happy', look: [0.6, -1], hops, pop: k1, seed: 2, glow: 1.05 })
          pisces(x, t, 880, 1610, 210, t > T.lastLand ? 3 : 2, { mood: t > T.lastLand ? 'happy' : 'sparkle', look: [-1, -1], pop: k2, hops: [T.lastLand + 0.08] })
          if (cfg.comp) cfg.comp(x, t, T, k1)
          sparkles(x, t, 540, 1180, T.lastLand + 0.02, 12, 300, 1, [GOLD, accent, BONE])
          hearts(x, t, 540, 1560, T.lastLand + 0.1, { n: 7, life: 1.8, cell: 7, spread: 380, seed: 2, rise: 220 })
        }
        cap.update(t, outK(t, [T.out[0], T.out[1]]))
        tag.update(t, outK(t, T.tagOut))
        if (box) box.update(t)
        last.update(t, outK(t, [T.out[0] + 0.05, T.out[1]]))
        bug.update(t, outK(t, T.bugOut))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // one candidate cut: the mini-scene's time skip
  const CUTS = [T.cut]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ['whoosh', T.patchIn[0], 0.4, 0.04], ...wordPops(T.cap, 4, 0.08, 0), ['pop', T.bug + 0.06, 783.99, 0.03, -0.4],
    ['pluck', T.patchIn[1], 659.25, 0.03, 0.4, 0], ['whoosh', T.tag, 0.25, 0.025], ['tick', T.tag + 0.35, 0.03],
    ...(cfg.clock || []).map(c => ['tick', r3(c.at), 0.035]),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.shrink[0], 0.5, 0.04], ['pop', T.shrink[1] - 0.05, 880, 0.03, -0.4], ['pop', T.shrink[1] + 0.1, 1046.5, 0.03, 0.4],
    ...wordPops(T.last, 2, 0.1, 1, 0.03), ['pop', T.lastLand, 1046.5, 0.05, 0], ['pop', T.lastLand + 0.08, 1318.51, 0.04, 0],
    ['bell', T.lastLand + 0.05, 2093, 0.03, 1.2, 0], ['glitter', T.lastLand, T.lastLand + 0.5],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T }
}
