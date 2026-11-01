// GRWM kit: the shared look of the GET READY WITH ME trend films (trgrwmlibra, trgrwmaries, trgrwmcancer, trgrwmscorpio,
// trgrwmvirgo; promo/films/STARTALK-TRENDS.md §4). Every episode carries an identical copy of this file in its own
// folder, so the five films look like one format without touching another film's folder. Everything draws as a pure
// function of its arguments; DOM / canvases are only made inside build-time helpers (nothing touches `document` at module
// top level: the sound build imports this through scenes/index.js in node).
//
//   buildBug(root, { at })                      the format bug, top-left 56 px: "GRWM: FIRST DATE" (Inter 800 small caps)
//   buildClock(root, { at, keys, date })        the timestamp overlay, top-right 56 px: "6:30 PM" ticking toward date time,
//                                               with a fake progress bar ("DATE 8:00 PM") that fills as the clock runs
//   drawRoom(x, t, { moody, ring, inWindow })   the bedroom: wall, window (inWindow(x, t) draws Pisces outside it), fairy
//                                               lights, ring light
//   drawTable(x, t, { phone, items })           the vanity table in front (y ≥ 1270) + the face-down phone that buzzes
//   drawNotif(x, t, { at, out, text, cy })      the date's text: a notification card that drops in
//   drawSticker(x, t, { at, out, text, … })     a tilted caption sticker (white, ink outline, Inter 800)
//   drawSpiral(x, t, cx, cy, { from, stop, k }) the inner-monologue spiral: ? ! … orbiting the head, freezing + falling at `stop`
//   drawShades / drawHat / drawBowtie           accessories seated on a drawStarChar sprite (use with starFrame + inSprite)
//   drawShirt(x, cx, cy, cell, col, opts)       a pixel tee on a hanger
//   starFrame / inSprite / tearsCells           props seated on a star sprite (Pisces' tears)
//   drawBits, sparkles, pop01, outK, popOut, BEAT, colours
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawSky, drawPixelStar } from '../../sky.js'
import { SKY_H, easeOutBack } from '../../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff7eb6', INK = '#1b1236', LAV = '#c9a6ff', SKYBLUE = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)            // the 108 bpm grid
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const FONTS = ["800 112px Inter", "800 30px Inter", "700 30px Inter", "600 30px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 20px 'Space Mono'"]

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
/** happy tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
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

// ── accessories, in sprite cells (call inside inSprite). The eyes sit at (13.4, 19.2) and (22.6, 19.2); the top tip at row 2.
/** dark sunglasses over both eyes; glint: 0…1 sweeps a highlight across */
export function drawShades(ctx, { col = '#120c22', rim = INK, glint = -1 } = {}) {
  ctx.fillStyle = rim
  ctx.fillRect(9, 16.5, 8.6, 5.6); ctx.fillRect(19.4, 16.5, 8.6, 5.6); ctx.fillRect(17, 17.4, 3, 1.4)
  ctx.fillStyle = col
  ctx.fillRect(9.8, 17.2, 7, 4.2); ctx.fillRect(20.2, 17.2, 7, 4.2)
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(10.6, 17.8, 1.6, 1); ctx.fillRect(21, 17.8, 1.6, 1)
  if (glint >= 0 && glint <= 1) { ctx.fillStyle = 'rgba(255,255,255,0.85)'; const gx = 9.8 + glint * 17; ctx.fillRect(gx, 17.2, 1.2, 4.2) }
}
/** a hat on the top tip. kind: 'cap' | 'top' | 'beanie'; dy stacks hats (cells, negative = up) */
export function drawHat(ctx, kind = 'top', col = '#2b2350', band = PINK, dy = 0) {
  const R = (x0, y0, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x0, y0 + dy, w, h) }
  if (kind === 'top') { R(10.5, 1.2, 15, 2.6, INK); R(11.3, 1.8, 13.4, 1.4, col); R(13, -6.4, 10, 8, INK); R(13.8, -5.6, 8.4, 6.8, col); R(13.8, -1.4, 8.4, 1.6, band) }
  else if (kind === 'cap') { R(12, -2.6, 12, 6, INK); R(12.8, -1.8, 10.4, 4.8, col); R(22, 1.6, 7, 2.2, INK); R(22.6, 2.1, 6, 1.2, band); R(17.2, -3.4, 1.6, 1.2, band) }
  else { R(11.6, -2.4, 12.8, 6.4, INK); R(12.4, -1.6, 11.2, 5, col); R(12.4, 2, 11.2, 1.4, band); R(16.8, -4.2, 2.4, 2, band) }
}
/** a bow tie under the face */
export function drawBowtie(ctx, col = PINK, dy = 0) {
  const R = (x0, y0, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x0, y0 + dy, w, h) }
  R(13, 24.6, 4.6, 4.4, INK); R(18.4, 24.6, 4.6, 4.4, INK); R(16.6, 25.4, 2.8, 2.8, INK)
  R(13.7, 25.3, 3.4, 3, col); R(18.9, 25.3, 3.4, 3, col); R(17.2, 25.9, 1.6, 1.6, '#fff1c8')
}

// ── a pixel tee on a hanger
const SHIRT = [
  '.....kk.....', '......k.....', '....kkkk....', '..kk....kk..',
  '..SSSddSSS..', '.SSSSddSSSS.', 'SSSSSSSSSSSS', 'SSSSSSSSSSSS', 'SS.SSSSSS.SS', '...SSSSSS...',
  '...SSSlSSS..', '...SSSSSS...', '...SSSSSS...', '...hhhhhh...',
]
export function drawShirt(x, cx, cy, cell, col, { rot = 0, alpha = 1, shade = '#b84aa8', hanger = '#c9c2e6' } = {}) {
  drawBits(x, SHIRT, { S: col, d: shade, h: shade, l: shade, k: hanger }, cx, cy, cell, { rot, alpha })
}

// ── the format bug: "GRWM:" (pink) + " FIRST DATE" (bone), Inter 800 small caps, letter-spaced, top-left 56 px
export function buildBug(root, { at = 0.3, text = 'FIRST&nbsp;DATE' } = {}) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', transformOrigin: '0% 50%', pointerEvents: 'none', font: `800 30px ${INTER}`, letterSpacing: '0.2em', whiteSpace: 'nowrap', textShadow: '0 2px 12px rgba(6,4,18,0.9)', color: PINK }, root,
    `GRWM:<span style="color:${BONE};letter-spacing:0.16em">&nbsp;${text}</span>`)
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── the timestamp overlay: keys = [[t, '6:30'], …] (all PM). The pill flips at each key; the bar fills toward `date`.
const mins = s => { const [h, m] = s.split(':').map(Number); return (h % 12 + 12) * 60 + m }
export function clockAt(keys, t) { let k = keys[0]; for (const q of keys) if (q[0] <= t) k = q; return k }
export function buildClock(root, { at = 0.4, keys, date = '8:00', start = null }) {
  const box = el('div', { position: 'absolute', right: '56px', top: '48px', display: 'none', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', transformOrigin: '100% 0%', pointerEvents: 'none' }, root)
  const pill = el('div', { display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 18px 6px 14px', background: 'rgba(16,9,38,0.88)', border: `3px solid ${BONE}`, borderRadius: '10px', boxShadow: `0 0 0 3px ${INK}`, font: `700 34px ${MONO}`, color: BONE, whiteSpace: 'nowrap' }, box)
  const dot = el('div', { width: '14px', height: '14px', background: '#ff4f6a' }, pill)
  const tx = el('span', {}, pill, '')
  const row = el('div', { display: 'flex', alignItems: 'center', gap: '10px', font: `700 20px ${MONO}`, letterSpacing: '0.08em', color: PINK, textShadow: '0 2px 8px rgba(6,4,18,0.95)', whiteSpace: 'nowrap' }, box, '')
  el('span', {}, row, `DATE ${date} PM`)
  const bar = el('div', { width: '150px', height: '12px', background: '#2a1f55', border: `2px solid ${INK}`, position: 'relative' }, row)
  const fillE = el('div', { position: 'absolute', left: 0, top: 0, bottom: 0, width: '0%', background: PINK }, bar)
  const m0 = mins(start ?? keys[0][1]), m1 = mins(date)
  let last = ''
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      if (k <= 0.01) return
      box.style.opacity = String(clamp(k * 2) * out)
      const [kt, s] = clockAt(keys, t)
      if (s !== last) { tx.textContent = `${s} PM`; last = s }
      const flip = kt > at ? easeOutBack(prog(t, kt, kt + 0.25), 2.6) : 1
      box.style.transform = `scale(${((0.6 + 0.4 * k) * lerp(1.18, 1, flip)).toFixed(4)})`
      // the bar eases from the previous key's fill to this key's
      let pk = keys[0]; for (const q of keys) if (q[0] < kt) pk = q
      const f0 = clamp((mins(pk[1]) - m0) / (m1 - m0)), f1 = clamp((mins(s) - m0) / (m1 - m0))
      fillE.style.width = (100 * lerp(f0, f1, ease.outCubic(prog(t, kt, kt + 0.4)))).toFixed(2) + '%'
      dot.style.opacity = Math.floor(t * 1.6) % 2 ? '0.35' : '1'
    },
  }
}

// ── the bedroom
export const RING = { cx: 540, cy: 900, r: 330 }
export const TABLE_Y = 1268
const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }
/** moody 0…1 tints the room purple + dims the ring light; ring 0…1 is the ring light's brightness; ringCol its colour */
export function drawRoom(x, t, { moody = 0, ring = 1, ringCol = '#fff1d6', windowGlow = 1, inWindow = null } = {}) {
  // wall: deep plum with a faint pixel diamond wallpaper
  const g = x.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, lerpHex('#2b1d55', '#1a1036', moody)); g.addColorStop(1, lerpHex('#3a2560', '#1e1240', moody))
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = `rgba(255,220,240,${0.05 * (1 - moody * 0.6)})`
  for (let j = 0; j < 22; j++) for (let i = 0; i < 12; i++) { const px = i * 96 + (j % 2) * 48 + 20, py = j * 64 + 40; x.fillRect(px, py, 8, 8) }
  // the window (Pisces looks in from the sky)
  const W0 = WIN
  x.save(); x.beginPath(); x.rect(W0.x, W0.y, W0.w, W0.h); x.clip()
  drawSky(x, t, { ...SKY_H, zoom: 1.2, dim: 0.75 * windowGlow, moon: { x: W0.x + W0.w - 80, y: W0.y + 80, r: 34, phase: 0.12, alpha: 1 } })
  if (inWindow) inWindow(x, t)
  x.restore()
  // window frame (bone wood, ink outline) + cross bars + a little curtain
  x.fillStyle = INK; x.fillRect(W0.x - 22, W0.y - 22, W0.w + 44, 22); x.fillRect(W0.x - 22, W0.y + W0.h, W0.w + 44, 30); x.fillRect(W0.x - 22, W0.y - 22, 22, W0.h + 52); x.fillRect(W0.x + W0.w, W0.y - 22, 22, W0.h + 52)
  x.fillStyle = '#d9c9e8'; x.fillRect(W0.x - 14, W0.y - 14, W0.w + 28, 10); x.fillRect(W0.x - 14, W0.y + W0.h + 4, W0.w + 28, 16); x.fillRect(W0.x - 14, W0.y - 14, 10, W0.h + 34); x.fillRect(W0.x + W0.w + 4, W0.y - 14, 10, W0.h + 34)
  x.fillStyle = INK; x.fillRect(W0.x + W0.w / 2 - 6, W0.y, 12, W0.h); x.fillRect(W0.x, W0.y + W0.h * 0.48 - 6, W0.w, 12)
  x.fillStyle = '#d9c9e8'; x.fillRect(W0.x + W0.w / 2 - 3, W0.y, 6, W0.h); x.fillRect(W0.x, W0.y + W0.h * 0.48 - 3, W0.w, 6)
  // curtains (pink, pixel folds)
  for (const side of [0, 1]) {
    const cx0 = side ? W0.x + W0.w - 30 : W0.x - 50, sway = 4 * Math.sin(t * 1.3 + side)
    for (let k = 0; k < 4; k++) { x.fillStyle = k % 2 ? '#c05a98' : '#e07ab4'; x.fillRect(cx0 + k * 20 + (side ? sway : -sway) * (k / 3), W0.y - 30, 20, W0.h + 90) }
    x.fillStyle = INK; x.fillRect(cx0 - 4, W0.y - 34, 88, 8)
  }
  // fairy lights across the top
  for (let i = 0; i <= 16; i++) {
    const u = i / 16, px = 30 + u * 1020, py = 360 + 46 * Math.sin(Math.PI * u) + (i % 2) * 6
    if (i < 16) { x.fillStyle = 'rgba(20,12,40,0.7)'; const nx = 30 + (i + 1) / 16 * 1020, ny = 360 + 46 * Math.sin(Math.PI * (i + 1) / 16) + ((i + 1) % 2) * 6; for (let q = 0; q < 8; q++) x.fillRect(lerp(px, nx, q / 8), lerp(py, ny, q / 8) - 2, 8, 4) }
    const on = 0.55 + 0.45 * Math.sin(t * 2.4 + i * 1.7)
    const col = ['#ffd36b', '#ff8fb1', '#9fe6ff', '#c9a6ff'][i % 4]
    x.fillStyle = hexA(col, 0.18 * on * (1 - moody * 0.5)); x.fillRect(px - 14, py - 4, 28, 28)
    x.fillStyle = INK; x.fillRect(px - 6, py, 12, 16); x.fillStyle = col; x.globalAlpha = 0.5 + 0.5 * on; x.fillRect(px - 4, py + 2, 8, 12); x.globalAlpha = 1
  }
  // the ring light: stand + glowing ring
  const R = RING, rc = ringCol
  x.fillStyle = INK; x.fillRect(R.cx - 10, R.cy + R.r - 6, 20, TABLE_Y - (R.cy + R.r) + 10)
  x.fillStyle = '#3d3366'; x.fillRect(R.cx - 5, R.cy + R.r - 6, 10, TABLE_Y - (R.cy + R.r) + 10)
  if (ring > 0.01) {
    const gl = x.createRadialGradient(R.cx, R.cy, R.r * 0.6, R.cx, R.cy, R.r * 1.35)
    gl.addColorStop(0, hexA(rc, 0)); gl.addColorStop(0.45, hexA(rc, 0.22 * ring)); gl.addColorStop(1, hexA(rc, 0))
    x.fillStyle = gl; x.fillRect(R.cx - R.r * 1.4, R.cy - R.r * 1.4, R.r * 2.8, R.r * 2.8)
  }
  // pixel ring: cells on the annulus
  const C = 12
  for (let j = -R.r - 24; j <= R.r + 24; j += C) for (let i = -R.r - 24; i <= R.r + 24; i += C) {
    const d = Math.hypot(i + C / 2, j + C / 2)
    if (d > R.r - 16 && d < R.r + 16) { x.fillStyle = d > R.r - 10 && d < R.r + 10 ? lerpHex('#4a3f78', rc, ring) : INK; x.fillRect(R.cx + i, R.cy + j, C, C) }
  }
}
export const WIN = { x: 70, y: 470, w: 250, h: 300 }

/** the vanity table: top edge at TABLE_Y, front panel to the bottom of the frame, a drawer knob, a few props.
 *  phone: { cx, buzz: [t0…] } face-down phone that jitters + lights on each buzz */
export function drawTable(x, t, { phone = null, items = true, extra = null } = {}) {
  x.fillStyle = INK; x.fillRect(0, TABLE_Y - 8, 1080, 1920 - TABLE_Y + 8)
  x.fillStyle = '#c99a6a'; x.fillRect(0, TABLE_Y, 1080, 26)
  x.fillStyle = '#e4b986'; x.fillRect(0, TABLE_Y, 1080, 8)
  x.fillStyle = '#8a5d3d'; x.fillRect(0, TABLE_Y + 34, 1080, 1920 - TABLE_Y - 34)
  x.fillStyle = '#7a5034'; for (let i = 0; i < 6; i++) x.fillRect(0, TABLE_Y + 70 + i * 100, 1080, 6)
  x.fillStyle = INK; x.fillRect(520, 1770, 40, 26); x.fillStyle = GOLD; x.fillRect(526, 1776, 28, 14)
  if (items) {
    // perfume (left), lipstick + a little cactus (right)
    drawBits(x, ['..kk..', '..kk..', '.gggg.', 'gpppPg', 'gppppg', 'gppppg', '.gggg.'], { k: GOLD, g: '#ffd9ef', p: '#ff9ccc', P: '#ffffff' }, 150, TABLE_Y - 40, 11)
    drawBits(x, ['.r.', 'rrr', 'ggg', 'ggg', 'ggg'], { r: '#e8335a', g: GOLD }, 880, TABLE_Y - 30, 11)
    drawBits(x, ['..g..', '.gg.g', 'ggggg', '.ggg.', 'ttttt', '.ttt.'], { g: '#5fd38a', t: '#d86a4a' }, 970, TABLE_Y - 36, 11)
  }
  if (extra) extra(x, t)
  if (phone) drawTablePhone(x, t, phone)
}
export function drawTablePhone(x, t, { cx = 300, buzz = [], light = null }) {
  let jit = 0, lit = 0
  for (const b of buzz) { const d = t - b; if (d > 0 && d < 0.9) { jit = Math.sin(d * 90) * 5 * (d < 0.7 ? 1 : 0); lit = Math.max(lit, 1 - prog(d, 0.6, 1.4)) } else if (d >= 0.9) lit = Math.max(lit, light ?? 0) }
  const y = TABLE_Y - 18
  x.fillStyle = INK; x.fillRect(cx - 86 + jit, y - 10, 172, 28)
  x.fillStyle = '#3a2d74'; x.fillRect(cx - 80 + jit, y - 6, 160, 18)
  if (lit > 0) {
    x.fillStyle = `rgba(160,220,255,${0.5 * lit})`; x.fillRect(cx - 120 + jit, y - 24, 240, 10)
    for (const b of buzz) { const d = t - b; if (d > 0 && d < 0.8) { x.save(); x.globalAlpha = 1 - d / 0.8; x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('bzz', cx - 120 + jit, y - 40 - d * 30); x.fillText('bzz', cx + 120 - jit, y - 50 - d * 30); x.restore() } }
  }
}

/** the date's text: a notification card dropping in from above */
export function drawNotif(x, t, { at, out, text, from = 'tonight’s date', cy = 560, w = 900, size = 40 }) {
  const k = easeOutBack(prog(t, at, at + 0.42), 1.5), o = out ? outK(t, out) : 1
  if (t < at || o <= 0.01) return
  x.save(); x.font = `700 ${size}px ${INTER}`
  const words = text.split(' '), lines = []; let cur = ''
  for (const wd of words) { const s = cur ? cur + ' ' + wd : wd; if (x.measureText(s).width > w - 80 && cur) { lines.push(cur); cur = wd } else cur = s }
  lines.push(cur)
  const h = 96 + lines.length * size * 1.25 + 20
  const y = lerp(-h, cy - h / 2, k) + (1 - o) * -60
  x.globalAlpha = clamp(o * 1.4)
  const x0 = 540 - w / 2
  x.fillStyle = INK; x.fillRect(x0 - 6, y + 6, w + 12, h - 12); x.fillRect(x0, y, w, h)
  x.fillStyle = 'rgba(28,20,64,0.97)'; x.fillRect(x0 + 6, y + 6, w - 12, h - 12)
  x.fillStyle = PINK; x.fillRect(x0 + 6, y + 6, w - 12, 6)
  // avatar: a little pixel heart
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, x0 + 64, y + 54, 6)
  x.font = `700 28px ${INTER}`; x.fillStyle = LAV; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(from, x0 + 112, y + 54)
  x.textAlign = 'right'; x.fillStyle = 'rgba(239,230,214,0.55)'; x.fillText('now', x0 + w - 36, y + 54)
  x.font = `700 ${size}px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
  lines.forEach((l, i) => x.fillText(l, x0 + 40, y + 96 + (i + 0.8) * size * 1.25))
  x.restore()
  // arrival ring
  const d = t - at
  if (d > 0 && d < 0.5) { x.save(); x.globalAlpha = (1 - d / 0.5) * 0.8; x.strokeStyle = PINK; x.lineWidth = 6; x.strokeRect(x0 - 20 * d / 0.5 * 2, cy - h / 2 - 20 * d / 0.5 * 2, w + 80 * d / 0.5, h + 80 * d / 0.5); x.restore() }
}

/** a tilted caption sticker (pop + wobble in, popOut on out). bg/fg colours; `*word*` = accent colour */
export function drawSticker(x, t, { at, out = null, text, cx, cy, rot = -0.05, bg = BONE, fg = INK, acc = '#d6336c', size = 40, pad = 22 }) {
  if (t < at) return
  const k = easeOutBack(prog(t, at, at + 0.3), 2.4) * (out ? popOut(t, out) : 1)
  if (k <= 0.01) return
  const wob = 0.06 * Math.sin((t - at) * 16) * Math.exp(-(t - at) * 4)
  x.save(); x.translate(cx, cy); x.rotate(rot + wob); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`; x.textBaseline = 'middle'
  const parts = []; let acc2 = false
  for (const seg of text.split('*')) { if (seg) parts.push({ s: seg, a: acc2 }); acc2 = !acc2 }
  const tw = parts.reduce((s, p) => s + x.measureText(p.s).width, 0)
  const w = tw + pad * 2, h = size + pad * 1.4
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-w / 2 + 8, h / 2 + 5, w, 8)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let px = -tw / 2
  for (const p of parts) { x.fillStyle = p.a ? acc : fg; x.textAlign = 'left'; x.fillText(p.s, px, 3); px += x.measureText(p.s).width }
  x.restore()
}

/** the spiral: tokens orbit the head faster and faster from `from`; at `stop` they freeze, then fall + fade */
const TOK = ['?', '!', '…', '?!', '?', '!!', '?', '…']
export function drawSpiral(x, t, cx, cy, { from, stop = 1e9, n = 8, R = 210, cols = [PINK, GOLD, SKYBLUE, BONE], tokens = TOK, ramp = 6 }) {
  if (t < from) return
  const T0 = Math.min(t, stop) - from
  const k = clamp(T0 / 0.6)
  const spin = 1.4 * T0 + 0.5 * T0 * T0 / ramp * 3
  const fall = t > stop ? t - stop : 0
  if (fall > 0.8) return
  x.save(); x.globalAlpha = (1 - clamp(fall / 0.8)) * k
  x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < n; i++) {
    const a = spin + i / n * Math.PI * 2, r = R * (0.85 + 0.15 * Math.sin(i * 2.3 + T0 * 3))
    let px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r * 0.55
    if (fall > 0) { py += 900 * fall * fall + 80 * fall; px += (i % 2 ? 1 : -1) * 60 * fall }
    const sz = 44 + 10 * Math.sin(i + T0 * 5)
    x.font = `800 ${sz.toFixed(0)}px ${INTER}`
    x.lineWidth = 8; x.strokeStyle = INK; x.strokeText(tokens[i % tokens.length], px, py)
    x.fillStyle = cols[i % cols.length]; x.fillText(tokens[i % tokens.length], px, py)
  }
  x.restore()
}

function lerpHex(a, b, k) {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16)
  const c = [16, 8, 0].map(s => Math.round(lerp((A >> s) & 255, (B >> s) & 255, clamp(k))))
  return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('')
}
export { lerpHex }
