// STAR MAIL show kit, Houston letters (Pack F: hxnightshift, hxnewinhtx, hxcrawfishboil, hxraincheck, hxfarapart).
// Copied from sxmail1's kit; every Pack F film carries an identical copy of this file in its own folder. Changes from
// sxmail1: the bug shows the show name only (no episode), plus a numeral-free pixel talk card, speech bubbles, rain,
// a skyline and a few props shared by the pack. Everything draws as a pure function of its arguments; DOM / offscreen canvases
// are only made inside build-time helpers (nothing touches `document` at module top level: the sound build imports it).
//
//   buildBug(root, { at })                        the show bug, top-left 56 px: pixel envelope + "STAR MAIL" (no episode)
//   makeLetter({ lines, sign })                   a letter: cream pixel paper + pixel handwriting (built once, at build)
//   drawLetter(x, t, L, { cx, cy, s, rot, unfold, alpha })   the letter, folded in thirds → unfolded; lines write on at t
//   drawEnvelope(x, cx, cy, s, { flap, seal, rot, alpha, behind })   the envelope (call with behind: true / false around the letter)
//   drawSeal(x, cx, cy, size, t, t0, { alpha })   the wax seal stamp: drops in, THUNKs at t0; returns the camera shake (px)
//   drawQuill(x, cx, cy, cell, rot)               the narrator's gold quill
//   drawPhone(x, t, P)                            a pixel phone with a chat that piles up and scrolls (mail1, mail2)
//   starFrame / inSprite / tearsCells             props seated on a drawStarChar sprite (Pisces' tears)
//   drawBits, sparkles, pop01, outK, popOut, BEAT, colours
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', WAX = '#c8283c'
export const PAPER = '#f4e8cc', PAPER_D = '#e2cfa6', HAND = '#2c2a7a', RED_INK = '#c42a3f'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)            // the 108 bpm grid
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

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

// ── the show bug: a pixel envelope + "STAR MAIL" (Inter 800, letter-spaced small caps, gold). Never an episode number.
const ENV_ICON = ['GGGGGGGGGGG', 'GPGGGGGGGPG', 'GGPGGGGGPGG', 'GGGPGRGPGGG', 'GGGGPPPGGGG', 'GGGGGGGGGGG', 'GGGGGGGGGGG', 'GGGGGGGGGGG']
export function buildBug(root, { at = 0.3 } = {}) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '16px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '60px', height: '48px', imageRendering: 'pixelated' }, box)
  ic.width = 60; ic.height = 48
  drawBits(ic.getContext('2d'), ENV_ICON, { G: '#f4e8cc', P: '#c9b48a', R: WAX }, 30, 24, 4.4)
  const tx = el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box,
    'STAR&nbsp;MAIL')
  void tx
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── the letter
export const LW = 780, LH = 780            // paper size at s = 1
const PX = 3                                // handwriting pixel size
/** lines: [{ text, t, d?, size?, align?, y?, x? }]; `*word*` = red ink + underline.  Built once, at build. */
export function makeLetter({ lines, top = 128, gap = 84, size = 56, left = 92 }) {
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
  // paper (front) + paper (back)
  const paper = mk(LW, LH), back = mk(LW, LH)
  for (const [cv, front] of [[paper, true], [back, false]]) {
    const x = cv.getContext('2d'), C = 10
    const R = rng(front ? 7 : 9)
    for (let j = 0; j < LH / C; j++) for (let i = 0; i < LW / C; i++) {
      const corner = (i === 0 || i === LW / C - 1) && (j === 0 || j === LH / C - 1)
      if (corner) continue
      const edge = i === 0 || j === 0 || i === LW / C - 1 || j === LH / C - 1
      x.fillStyle = edge ? INK : front ? (R() < 0.06 ? '#efe1c2' : PAPER) : (R() < 0.06 ? '#d8c398' : PAPER_D)
      x.fillRect(i * C, j * C, C, C)
    }
    if (front) {
      // a soft shade under the right + bottom edge, ruled lines, the pink margin
      x.fillStyle = '#e7d6b0'; x.fillRect(LW - 20, 10, 10, LH - 20); x.fillRect(10, LH - 20, LW - 20, 10)
      x.fillStyle = 'rgba(120,150,210,0.35)'
      for (let y = top + 14; y < LH - 40; y += gap) x.fillRect(30, y, LW - 60, 3)
      x.fillStyle = 'rgba(232,98,138,0.45)'; x.fillRect(66, 20, 3, LH - 40)
    }
  }
  // the handwriting: drawn small, hard-thresholded, scaled up × PX (crisp pixel ink)
  const sw = Math.ceil(LW / PX), sh = Math.ceil(LH / PX)
  const small = mk(sw, sh), sx = small.getContext('2d')
  sx.textBaseline = 'alphabetic'
  const rows = lines.map((L, n) => {
    const fs = (L.size || size) / PX
    sx.font = `italic 500 ${fs}px 'EB Garamond'`
    const plain = L.text.replace(/\*/g, '')
    const tw = sx.measureText(plain).width
    const base = (L.y ?? (top + n * gap)) / PX
    let x0 = (L.x ?? left) / PX
    if (L.align === 'right') x0 = (LW - 70) / PX - tw
    // char by char with a little handwritten jitter; *…* in red ink, underlined
    const R = rng(31 + n * 7)
    let cx = x0, red = false, redFrom = 0
    for (const ch of L.text) {
      if (ch === '*') {
        if (red) { sx.fillStyle = RED_INK; sx.fillRect(Math.round(redFrom), Math.round(base + 2), Math.round(cx - redFrom), 1) }
        red = !red; redFrom = cx; continue
      }
      sx.fillStyle = red ? RED_INK : HAND
      sx.fillText(ch, cx, base + (R() - 0.5) * 0.9)
      cx += sx.measureText(ch).width + 0.15 + (ch === ' ' ? 1.1 : 0)
    }
    return { x: x0 * PX, y: (base - fs * 0.95) * PX, w: (cx - x0) * PX + PX * 2, h: fs * 1.35 * PX, t: L.t, d: L.d ?? Math.max(0.5, plain.length / 24) }
  })
  const id = sx.getImageData(0, 0, sw, sh), d = id.data
  for (let i = 0; i < d.length; i += 4) d[i + 3] = d[i + 3] > 105 ? 255 : 0
  sx.putImageData(id, 0, 0)
  const ink = mk(LW, LH), ix = ink.getContext('2d')
  ix.imageSmoothingEnabled = false; ix.drawImage(small, 0, 0, sw * PX, sh * PX)
  const work = mk(LW, LH)
  return { paper, back, ink, work, rows }
}
/** the pen position while line n writes (for a quill / glance), in letter px; null when no line is writing */
export function penAt(L, t) {
  for (const r of L.rows) if (t >= r.t && t < r.t + r.d) return { x: r.x + r.w * prog(t, r.t, r.t + r.d), y: r.y + r.h * 0.7 }
  return null
}
/** draw the letter. unfold: 0 = folded in thirds (only the middle panel shows) … 1 = open. Lines write on from r.t. */
export function drawLetter(x, t, L, { cx = 540, cy = 900, s = 1, rot = 0, unfold = 1, alpha = 1, shadow = true } = {}) {
  if (alpha <= 0.01 || s <= 0.01) return
  const w = L.work.getContext('2d')
  w.clearRect(0, 0, LW, LH); w.drawImage(L.paper, 0, 0)
  for (const r of L.rows) {
    const p = prog(t, r.t, r.t + r.d)
    if (p <= 0) continue
    const rw = Math.round(r.w * p / PX) * PX
    if (rw > 0) w.drawImage(L.ink, r.x, r.y, rw, r.h, r.x, r.y, rw, r.h)
  }
  const H3 = LH / 3
  const ut = ease.inOutCubic(prog(unfold, 0, 0.5)), ub = ease.inOutCubic(prog(unfold, 0.5, 1))
  const kt = Math.cos(Math.PI * (1 - ut)), kb = Math.cos(Math.PI * (1 - ub))       // −1 folded … 1 open
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  // drop shadow of the visible paper
  const yTop = kt > 0 ? -H3 / 2 - H3 * kt : -H3 / 2, yBot = kb > 0 ? H3 / 2 + H3 * kb : H3 / 2
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-LW / 2 + 16, yTop + 18, LW, yBot - yTop) }
  const slice = (sy, k, pivot, dirDown) => {
    // the panel [sy, sy+H3] of the paper, scaled by k about the fold line `pivot` (k<0: flipped onto the middle → its back)
    x.save(); x.translate(0, pivot); x.scale(1, k)
    const src = k >= 0 ? L.work : L.back
    if (dirDown) x.drawImage(src, 0, sy, LW, H3, -LW / 2, 0, LW, H3)
    else x.drawImage(src, 0, sy, LW, H3, -LW / 2, -H3, LW, H3)
    if (Math.abs(k) < 0.999) { x.fillStyle = `rgba(40,24,60,${(0.3 * (1 - Math.abs(k))).toFixed(3)})`; x.fillRect(-LW / 2, dirDown ? 0 : -H3, LW, H3) }
    x.restore()
  }
  x.drawImage(L.work, 0, H3, LW, H3, -LW / 2, -H3 / 2, LW, H3)                    // the middle panel
  slice(2 * H3, kb, H3 / 2, true)                                                  // bottom flap (hinge at the middle's bottom)
  slice(0, kt, -H3 / 2, false)                                                     // top flap (hinge at the middle's top)
  // fold creases
  if (unfold > 0.98) { x.fillStyle = 'rgba(160,130,90,0.35)'; x.fillRect(-LW / 2 + 10, -H3 / 2 - 1, LW - 20, 3); x.fillRect(-LW / 2 + 10, H3 / 2 - 1, LW - 20, 3) }
  x.restore()
}

// ── the envelope (pixel cells). Draw it twice around the letter: behind: true (back + open flap), then behind: false (the pocket)
export function drawEnvelope(x, cx, cy, s, { flap = 0, seal = 1, rot = 0, alpha = 1, behind = false } = {}) {
  if (alpha <= 0.01 || s <= 0.01) return
  const C = 18, EW = 30, EH = 19, w = EW * C, h = EH * C
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.translate(-w / 2, -h / 2)
  const cell = (i, j, c) => { x.fillStyle = c; x.fillRect(i * C, j * C, C + 0.5, C + 0.5) }
  const flapK = Math.cos(Math.PI * ease.inOutCubic(clamp(flap)))              // 1 closed … −1 open (points up)
  const apex = EH * 0.56
  if (behind) {
    for (let j = 0; j < EH; j++) for (let i = 0; i < EW; i++) cell(i, j, (i === 0 || j === 0 || i === EW - 1 || j === EH - 1) ? INK : '#cdb88e')
    if (flapK < 0) drawFlap(-flapK, true)
  } else {
    // the pocket: everything below the two diagonals from the bottom corners to the middle
    const j0 = Math.floor(EH * 0.3)
    for (let j = j0; j < EH; j++) for (let i = 0; i < EW; i++) {
      const u = Math.abs(i + 0.5 - EW / 2) / (EW / 2)
      const edge = i === 0 || i === EW - 1 || j === EH - 1 || j === j0
      const diag = Math.abs((j + 0.5) - (EH * 0.5 + EH * 0.5 * u)) < 0.7
      cell(i, j, edge ? INK : diag ? '#c9b48a' : (i + j) % 7 === 0 ? '#efe1c2' : PAPER)
    }
    if (flapK >= 0) drawFlap(flapK, false)
  }
  function drawFlap(k, inside) {
    // the triangle hangs from the top edge (k = 1 down … flips up when inside)
    for (let j = 0; j < Math.ceil(apex); j++) for (let i = 0; i < EW; i++) {
      const u = Math.abs(i + 0.5 - EW / 2) / (EW / 2)
      const lim = apex * (1 - u)
      if (j + 0.5 > lim) continue
      const edge = j + 1.5 > lim || i === 0 || i === EW - 1 || j === 0
      const yy = inside ? -(j + 1) * C * k : j * C * k
      x.fillStyle = edge ? INK : inside ? '#b9a479' : (j % 5 === 2 && i % 9 === 4) ? '#efe1c2' : '#f0e2c3'
      x.fillRect(i * C, inside ? yy : yy, C + 0.5, C * k + 0.5)
    }
    if (!inside && seal > 0.01 && k > 0.6) drawSealBlob(x, w / 2, (apex - 1.2) * C * k, 64 * seal, 0)
  }
  x.restore()
}

// ── the wax seal (procedural pixel blob with a gold star stamped in it)
const STAR_BM = ['...X...', '...X...', 'XXXXXXX', '.XXXXX.', '..XXX..', '.XX.XX.', 'XX...XX']
export function drawSealBlob(x, cx, cy, size, rot = 0, alpha = 1) {
  const c = size / 22, N = 11
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const rad = (i, j) => { const a = Math.atan2(j, i); return 9.3 + 0.9 * Math.sin(5 * a + 1) + 0.5 * Math.sin(9 * a + 2) }
  const inside = (i, j) => Math.hypot(i, j) < rad(i, j)
  for (let j = -N; j <= N; j++) for (let i = -N; i <= N; i++) {
    const ii = i + 0.5, jj = j + 0.5, d = Math.hypot(ii, jj), r = rad(ii, jj)
    let col = null
    if (d < r) {
      col = d > r - 1.4 ? (ii + jj < 0 ? '#e0485c' : '#8e1a2e') : Math.abs(d - 6.3) < 0.6 ? '#9c1f34' : (ii + jj < -6 ? '#dc3c50' : WAX)
    } else if (inside(ii + 1, jj) || inside(ii - 1, jj) || inside(ii, jj + 1) || inside(ii, jj - 1)) col = INK
    if (col) { x.fillStyle = col; x.fillRect(i * c, j * c, c + 0.4, c + 0.4) }
  }
  // the stamped star: shadow cells, then gold
  for (const [ox, oy, col] of [[0.6, 0.6, '#7a1426'], [0, 0, GOLD]]) STAR_BM.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch !== 'X') return
    x.fillStyle = col; x.fillRect((i - 3.5 + ox) * c * 1.15, (j - 3.7 + oy) * c * 1.15, c * 1.15 + 0.4, c * 1.15 + 0.4)
  }))
  x.fillStyle = '#ffe9a8'; x.fillRect(-0.5 * c * 1.15, -3.7 * c * 1.15, c * 1.15, c * 1.15)
  x.restore()
}
/** the seal stamp: falls in over 0.24 s, THUNK at t0 (squash, dust), then stays. Returns the camera shake in px. */
export function drawSeal(x, cx, cy, size, t, t0, { alpha = 1, rot = -0.12 } = {}) {
  if (t < t0 - 0.24 || alpha <= 0.01) return 0
  const fall = prog(t, t0 - 0.24, t0)
  const dt = t - t0
  let sc = lerp(2.6, 1, ease.inQuad(fall)), sx = 1, sy = 1, a = clamp(fall * 2.5)
  if (dt > 0) { const w = Math.exp(-dt * 9) * Math.cos(dt * 30); sx = 1 + 0.16 * w; sy = 1 - 0.14 * w }
  x.save(); x.globalAlpha *= alpha * a
  if (dt < 0) { x.fillStyle = `rgba(6,4,18,${0.35 * fall})`; x.beginPath(); x.ellipse(cx + 10, cy + 14, size * 0.5 * (2 - fall), size * 0.46 * (2 - fall), 0, 0, Math.PI * 2); x.fill() }
  x.translate(cx, cy); x.scale(sc * sx, sc * sy)
  drawSealBlob(x, 0, 0, size, rot)
  x.restore()
  // dust puffs
  if (dt > 0 && dt < 0.55) {
    const p = dt / 0.55
    x.save(); x.globalAlpha = alpha * (1 - p)
    for (let i = 0; i < 10; i++) {
      const an = i / 10 * Math.PI * 2 + 0.3, R = size * (0.6 + 0.7 * ease.outCubic(p))
      const q = Math.round(size * 0.07 * (1 - p * 0.5))
      x.fillStyle = i % 2 ? BONE : '#e8a0a8'
      x.fillRect(Math.round(cx + Math.cos(an) * R), Math.round(cy + Math.sin(an) * R * 0.8), q, q)
    }
    x.restore()
  }
  return dt > 0 && dt < 0.4 ? 14 * Math.exp(-dt * 10) * Math.sin(dt * 55) : 0
}

// ── the gold quill (THE STARS' pen)
const QUILL = ['..L..', '.LGL.', '.LGG.', 'LGGGL', 'LGLGL', 'LGGGL', 'LGLGL', '.GGGL', '.LGG.', '.LGL.', '..G..', '..d..', '..d..', '..d..', '..k..']
export function drawQuill(x, cx, cy, cell, rot = 0.5, alpha = 1) {
  drawBits(x, QUILL, { L: '#fff1c8', G: GOLD, d: '#c98a1f', k: HAND }, cx, cy, cell, { rot, alpha })
}

// ── a pixel phone with a chat that piles up (bubbles pop in, the thread scrolls up)
//   P = { cx, top, w, h, title, msgs: [{ at, side: 'L'|'R', text }], alpha, s }
export function drawPhone(x, t, P) {
  const { cx, top, w, h, title = '', msgs = [], alpha = 1, s = 1, font = 30, typing = null } = P
  if (alpha <= 0.01 || s <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  x.translate(cx, top + h / 2); x.scale(s, s); x.translate(-w / 2, -h / 2)
  const C = 8
  // body (stepped corners), screen, notch
  x.fillStyle = INK; x.fillRect(C, 0, w - 2 * C, h); x.fillRect(0, C, w, h - 2 * C)
  x.fillStyle = '#3a2d74'; x.fillRect(2 * C, C, w - 4 * C, h - 2 * C); x.fillRect(C, 2 * C, w - 2 * C, h - 4 * C)
  x.fillStyle = '#5b48a8'; x.fillRect(2 * C, C, w - 4 * C, C / 2)
  const sx0 = 3 * C, sy0 = 3 * C, sw = w - 6 * C, sh = h - 6 * C
  x.fillStyle = '#120c2a'; x.fillRect(sx0, sy0, sw, sh)
  // header
  const HH = 92
  x.fillStyle = '#1f1747'; x.fillRect(sx0, sy0, sw, HH)
  x.fillStyle = BONE; x.font = `700 ${font}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(title, sx0 + sw / 2, sy0 + HH / 2 + 4)
  x.fillStyle = INK; x.fillRect(sx0 + sw / 2 - 40, sy0, 80, 12)
  // messages
  x.save(); x.beginPath(); x.rect(sx0, sy0 + HH, sw, sh - HH); x.clip()
  x.font = `600 ${font}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
  const maxW = sw * 0.74, pad = 18, lh = font * 1.25, gapB = 14
  const lay = msgs.map(m => {
    const words = m.text.split(' '), lines = []
    let cur = ''
    for (const wd of words) { const tryS = cur ? cur + ' ' + wd : wd; if (x.measureText(tryS).width > maxW - 2 * pad && cur) { lines.push(cur); cur = wd } else cur = tryS }
    lines.push(cur)
    const bw = Math.min(maxW, Math.max(...lines.map(l => x.measureText(l).width)) + 2 * pad)
    return { ...m, lines, bw, bh: lines.length * lh + pad * 1.3 }
  })
  const vis = lay.filter(m => t >= m.at)
  const typingOn = typing && t >= typing[0] && t < typing[1]
  const tot = k => { let s2 = 0; for (let i = 0; i < k; i++) s2 += vis[i].bh + gapB; return s2 }
  // smooth scroll: the stack height eases from the previous total to the new one as each bubble arrives
  let H = tot(vis.length)
  if (vis.length) { const lm = vis[vis.length - 1], e = ease.outCubic(prog(t, lm.at, lm.at + 0.2)); H = lerp(tot(vis.length - 1), tot(vis.length), e) }
  if (typingOn) H += 70 * ease.outCubic(prog(t, typing[0], typing[0] + 0.15))
  let y = sy0 + sh - 22 - H
  for (const m of vis) {
    const k = pop01(t, m.at, 0.22, 2.2)
    const bx = m.side === 'L' ? sx0 + 20 : sx0 + sw - 20 - m.bw
    x.save(); x.translate(m.side === 'L' ? bx : bx + m.bw, y + m.bh); x.scale(k, k); x.translate(m.side === 'L' ? 0 : -m.bw, -m.bh)
    x.fillStyle = m.side === 'L' ? '#3b3466' : '#4f8df0'
    x.fillRect(4, 0, m.bw - 8, m.bh); x.fillRect(0, 4, m.bw, m.bh - 8)
    x.fillStyle = BONE
    m.lines.forEach((l, i) => x.fillText(l, pad, pad * 0.65 + (i + 0.82) * lh))
    x.restore()
    y += m.bh + gapB
  }
  if (typingOn) {
    x.fillStyle = '#3b3466'; x.fillRect(sx0 + 20, sy0 + sh - 22 - 56, 110, 56)
    for (let i = 0; i < 3; i++) { const on = Math.floor((t - typing[0]) * 8) % 3 === i; x.fillStyle = on ? BONE : '#8a83b8'; x.fillRect(sx0 + 20 + 22 + i * 26, sy0 + sh - 22 - 34, 14, 14) }
  }
  x.restore()
  x.restore()
}

// ════════════════════════════════════ Pack F additions (Houston letters) ════════════════════════════════════

/** a pixel speech bubble that pops at t0 and stays for `life` s (a tail under it, pointing down) */
export function speech(x, t, cx, cy, t0, text, { col = BONE, size = 30, life = 9, ink = INK, tail = 0 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * (1 - ease.inQuad(prog(t, t0 + life - 0.15, t0 + life)))
  if (k <= 0.01 || t < t0 || t > t0 + life) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${INTER}`
  const w = x.measureText(text).width + 40, h = size + 30
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 30)
  x.fillStyle = INK; x.fillRect(tx - 12, h / 2 + 4, 12, 10); x.fillStyle = col; x.fillRect(tx - 8, h / 2, 8, 8)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

// stepped pixel rectangle (2-cell corners)
function stepFill(x, X, Y, w, h, P, col) { x.fillStyle = col; x.fillRect(X + 2 * P, Y, w - 4 * P, h); x.fillRect(X, Y + 2 * P, w, h - 4 * P); x.fillRect(X + P, Y + P, w - 2 * P, h - 2 * P) }

const ICONS = {
  heart: ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'],
  sun: ['...H...', '.H.H.H.', '..HHH..', 'HHHHHHH', '..HHH..', '.H.H.H.', '...H...'],
  moon: ['..HHH.', '.HH...', 'HH....', 'HH....', 'HH....', '.HH...', '..HHH.'],
  star: ['...H...', '...H...', 'HHHHHHH', '.HHHHH.', '..HHH..', '.HH.HH.', 'HH...HH'],
}
/** a talk card prop (Align's talk cards: a question, face up). Numeral-free on purpose. w ≈ 280–380 */
export function drawTalkCard(x, cx, cy, w, { q = '', rot = 0, alpha = 1, icon = 'heart', label = 'TALK CARD', glow = 0 } = {}) {
  if (alpha <= 0.01 || w <= 4) return
  const h = Math.round(w * 1.42), P = Math.max(2, Math.round(w / 60))
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const X = -w / 2, Y = -h / 2
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(X + 16, Y + 20, w, h)
  if (glow > 0) { x.save(); x.shadowColor = `rgba(242,199,92,${0.8 * glow})`; x.shadowBlur = 40; stepFill(x, X, Y, w, h, P, GOLD); x.restore() }
  stepFill(x, X, Y, w, h, P, INK)
  stepFill(x, X + P, Y + P, w - 2 * P, h - 2 * P, P, GOLD)
  stepFill(x, X + 2 * P, Y + 2 * P, w - 4 * P, h - 4 * P, P, '#24164f')
  // inner hairline + corner pips
  x.strokeStyle = 'rgba(242,199,92,0.7)'; x.lineWidth = Math.max(1, P / 2)
  x.strokeRect(X + 5 * P, Y + 5 * P, w - 10 * P, h - 10 * P)
  x.fillStyle = GOLD
  for (const [a, b] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) x.fillRect(a * (w / 2 - 5 * P) - P, b * (h / 2 - 5 * P) - P, 2 * P, 2 * P)
  // the arch window + icon
  const aw = w * 0.5, ah = h * 0.3, ay = Y + h * 0.12
  x.fillStyle = '#33206b'; x.fillRect(-aw / 2, ay + aw * 0.25, aw, ah - aw * 0.25)
  x.beginPath(); x.arc(0, ay + aw / 2, aw / 2, Math.PI, 0); x.fill()
  x.strokeStyle = 'rgba(242,199,92,0.85)'; x.lineWidth = Math.max(1, P * 0.6)
  x.beginPath(); x.moveTo(-aw / 2, ay + ah); x.lineTo(-aw / 2, ay + aw / 2); x.arc(0, ay + aw / 2, aw / 2, Math.PI, 0); x.lineTo(aw / 2, ay + ah); x.stroke()
  drawBits(x, ICONS[icon] || ICONS.heart, { H: icon === 'heart' ? '#ff6f93' : icon === 'moon' ? '#dfe6ff' : GOLD }, 0, ay + ah * 0.58, w / 34, { outline: null })
  // label
  x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 ${Math.round(w * 0.05)}px ${MONO}`
  x.fillText(label.split('').join(String.fromCharCode(8202)), 0, ay + ah + h * 0.06)
  x.fillRect(-w * 0.28, ay + ah + h * 0.095, w * 0.56, Math.max(1, P / 2))
  // the question (Garamond italic, wrapped)
  const fs = Math.round(w * 0.098)
  x.font = `italic 500 ${fs}px ${SERIF}`; x.fillStyle = BONE
  const words = q.split(' '), lines = []; let cur = ''
  for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr).width > w * 0.8 && cur) { lines.push(cur); cur = wd } else cur = tr }
  if (cur) lines.push(cur)
  const qy = Y + h * 0.72 - (lines.length - 1) * fs * 0.6
  lines.forEach((l, i) => x.fillText(l, 0, qy + i * fs * 1.2))
  x.restore()
}

/** gentle pixel rain over a rect (pure f(t)); k = 0…1 strength */
export function drawRain(x, t, { x0 = 0, y0 = 0, w = 1080, h = 1920, k = 1, n = 90, seed = 3, col = '#9fc4ff', speed = 1400 } = {}) {
  if (k <= 0.01) return
  const R = rng(seed)
  x.save(); x.globalAlpha *= 0.55 * k; x.fillStyle = col
  for (let i = 0; i < n; i++) {
    const px = x0 + R() * w, ph = R(), len = 22 + R() * 18
    const py = y0 + (((t * speed / h) + ph) % 1) * (h + len) - len
    if (i / n > k) continue
    x.fillRect(Math.round(px / 4) * 4 - Math.round((py - y0) * 0.08), Math.round(py), 4, len)
  }
  x.restore()
}

/** a generic pixel city skyline (no real buildings): dark blocks along baseY with lit windows; lit 0…1 */
export function drawSkyline(x, baseY, { alpha = 1, col = '#140d33', win = '#ffd98a', lit = 1, t = 0, seed = 5, x0 = 0, x1 = 1080 } = {}) {
  if (alpha <= 0.01) return
  const R = rng(seed), C = 8
  x.save(); x.globalAlpha *= alpha
  let X = x0 - 20
  while (X < x1 + 20) {
    const bw = (6 + Math.floor(R() * 10)) * C, bh = (12 + Math.floor(R() * (R() < 0.25 ? 48 : 26))) * C
    x.fillStyle = col; x.fillRect(X, baseY - bh, bw, bh)
    if (R() < 0.3) x.fillRect(X + bw / 2 - C, baseY - bh - 4 * C, 2 * C, 4 * C)          // a spire
    x.fillStyle = INK; x.fillRect(X, baseY - bh, C / 2, bh)
    for (let wy = baseY - bh + 2 * C; wy < baseY - 2 * C; wy += 3 * C) for (let wx = X + 2 * C; wx < X + bw - 2 * C; wx += 3 * C) {
      const r = R()
      if (r < 0.42 * lit) { x.fillStyle = win; x.globalAlpha = alpha * (0.55 + 0.35 * Math.sin(t * 0.7 + r * 40)); x.fillRect(wx, wy, C, C); x.globalAlpha = alpha }
    }
    X += bw + C
  }
  x.restore()
}
