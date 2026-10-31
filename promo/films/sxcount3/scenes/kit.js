// COUNTDOWN kit — the shared look of the COUNTDOWN show (sxcount3, sxcount2, sxcount1 each carry an identical copy, so no
// film imports another film's folder). The big pixel number, the "COUNTDOWN" show bug, pixel props (sweatband, cards,
// butterflies, hearts), Pisces' tears, sparkle bursts and the shared cue helpers. Pure f(t); no document at top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#8ff0c8'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  if (alpha <= 0 || cell <= 0) return
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

// ── the big pixel number (5 × 7 chunky digits), gold face, ink outline, a deep extrusion, a glow and a passing shine
const DIGITS = {
  3: ['XXXX.', '....X', '....X', '.XXX.', '....X', '....X', 'XXXX.'],
  2: ['.XXX.', 'X...X', '....X', '...X.', '..X..', '.X...', 'XXXXX'],
  1: ['..X..', '.XX..', 'X.X..', '..X..', '..X..', '..X..', 'XXXXX'],
}
const FACE = ['#fff1c8', '#ffe08a', '#f7d06a', '#f2c75c', '#ebb84a', '#e0a83e', '#d39535']
/** draw digit d centred on (cx, cy) with cell size `cell`. glow 0…1, shine = 0…1 sweep position (null = none) */
export function drawDigit(x, d, cx, cy, cell, { alpha = 1, glow = 1, shine = null, rot = 0, tint = null } = {}) {
  const bm = DIGITS[d]; if (!bm || alpha <= 0 || cell <= 0) return
  const w = 5, h = 7, ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] === 'X'
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  if (glow > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const R = cell * 5.2, g = x.createRadialGradient(0, 0, 0, 0, 0, R)
    g.addColorStop(0, `rgba(247,207,104,${0.34 * glow})`); g.addColorStop(0.45, `rgba(242,160,90,${0.13 * glow})`); g.addColorStop(1, 'rgba(242,160,90,0)')
    x.fillStyle = g; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill(); x.restore()
  }
  const px = (i, j, col, dx = 0, dy = 0) => { x.fillStyle = col; x.fillRect(Math.round(ox + i * cell + dx), Math.round(oy + j * cell + dy), Math.ceil(cell + 0.5), Math.ceil(cell + 0.5)) }
  // extrusion (down-right), darkest at the back
  const depth = cell * 0.42, steps = 4
  for (let s = steps; s >= 1; s--) {
    const k = s / steps
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (on(i, j)) px(i, j, s === steps ? INK : k > 0.5 ? '#6b3d1a' : '#9a5a24', depth * k, depth * k)
  }
  // ink outline (a ring of cells around the face, a third of a cell thick)
  const o = cell * 0.16
  x.fillStyle = INK
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (on(i, j)) x.fillRect(Math.round(ox + i * cell - o), Math.round(oy + j * cell - o), Math.ceil(cell + 2 * o), Math.ceil(cell + 2 * o))
  // face: banded top→bottom, a lit top-left edge, inner bevel pixels
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    if (!on(i, j)) continue
    px(i, j, tint || FACE[j])
    const q = cell / 4
    x.fillStyle = 'rgba(255,251,232,0.75)'
    if (!on(i, j - 1)) x.fillRect(Math.round(ox + i * cell), Math.round(oy + j * cell), Math.ceil(cell), Math.ceil(q))
    if (!on(i - 1, j)) x.fillRect(Math.round(ox + i * cell), Math.round(oy + j * cell), Math.ceil(q), Math.ceil(cell))
    x.fillStyle = 'rgba(120,60,20,0.35)'
    if (!on(i, j + 1)) x.fillRect(Math.round(ox + i * cell), Math.round(oy + (j + 1) * cell - q), Math.ceil(cell), Math.ceil(q))
    if (!on(i + 1, j)) x.fillRect(Math.round(ox + (i + 1) * cell - q), Math.round(oy + j * cell), Math.ceil(q), Math.ceil(cell))
  }
  // shine: a diagonal band of light crossing the face
  if (shine != null && shine > 0 && shine < 1) {
    const bx = lerp(-w * cell, w * cell * 1.2, shine)
    x.save()
    x.beginPath()
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (on(i, j)) x.rect(ox + i * cell, oy + j * cell, cell, cell)
    x.clip()
    x.globalCompositeOperation = 'lighter'
    x.fillStyle = 'rgba(255,248,220,0.55)'
    x.beginPath(); x.moveTo(bx, oy - cell); x.lineTo(bx + cell * 0.9, oy - cell); x.lineTo(bx + cell * 0.9 - h * cell * 0.6, oy + h * cell + cell); x.lineTo(bx - h * cell * 0.6, oy + h * cell + cell); x.closePath(); x.fill()
    x.restore()
  }
  x.restore()
}

/** the big number's motion: slams in huge (fills the frame), shakes, then settles into the backdrop.
 *  returns { cx, cy, cell, alpha, shake } for time t */
export function digitState(t, { slam, settle, big = 118, small = 66, bigY = 960, smallY = 700, fade = null }) {
  const s = easeOutBack(prog(t, slam, slam + 0.34), 2.6)
  const st = ease.inOutCubic(prog(t, settle, settle + 0.6))
  const cell = lerp(big * 1.5, big, s) * lerp(1, small / big, st)
  let alpha = clamp(prog(t, slam, slam + 0.08))
  if (fade) alpha *= lerp(1, fade[2] ?? 0, ease.inOutQuad(prog(t, fade[0], fade[1])))
  const dt = t - slam - 0.3
  const shake = dt > 0 && dt < 0.5 ? Math.sin(dt * 70) * 14 * Math.exp(-dt * 8) : 0
  return { cx: 540 + shake, cy: lerp(bigY, smallY, st) + Math.sin(t * 1.3) * 6 * st, cell, alpha, shake }
}

// ── the show bug: a blinking red pixel dot, "COUNTDOWN" (Inter 800 small caps, letter-spaced, gold) + " · n" (white 60%)
export function buildBug(parent, { n, start = 0.2, end }) {
  const bug = el('div', { position: 'absolute', left: '56px', top: '56px', height: '40px', display: 'flex', alignItems: 'center', gap: '14px',
    fontFamily: INTER, fontWeight: 800, fontSize: '30px', lineHeight: '40px', whiteSpace: 'nowrap', opacity: 0, textShadow: '0 2px 12px rgba(6,4,18,0.85)' }, parent)
  const dot = el('div', { width: '14px', height: '14px', background: '#ff4f6d', boxShadow: '0 0 12px rgba(255,79,109,0.8)', marginTop: '2px' }, bug)
  el('span', { color: GOLD, letterSpacing: '0.2em', fontVariant: 'small-caps' }, bug, 'COUNTDOWN')
  el('span', { color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', marginLeft: '-6px' }, bug, '· ' + n)
  return {
    update(t) {
      const a = ease.inOutQuad(prog(t, start, start + 0.4)) * (1 - ease.inOutQuad(prog(t, end - 0.35, end)))
      bug.style.opacity = String(a.toFixed(3))
      dot.style.opacity = (Math.floor(t * 1.8) % 2) ? '0.25' : '1'
    },
  }
}

// ── Pisces' tears (the running gag): pixel drops arcing out of each eye. k = intensity, dir = ±1
export function drawTears(x, px0, py0, cell0, t, k = 1, dir = 1, seed = 0) {
  if (k <= 0) return
  const cell = cell0 * 1.8
  const n = Math.round(3 + 4 * Math.min(2, k))
  const period = 0.9 / Math.max(0.6, k)
  x.save()
  for (let i = 0; i < n; i++) {
    const ph = ((t / period) + i / n + seed * 0.13) % 1
    const vx = dir * cell * (3 + 6 * k) * (0.7 + 0.3 * ((i * 7) % 3) / 2)
    const vy = -cell * (2 + 5 * k)
    const g = cell * 34
    const qx = px0 + vx * ph * 1.6, qy = py0 + vy * ph * 1.6 + g * (ph * 1.6) ** 2 * 0.5
    const a = ph < 0.1 ? ph / 0.1 : 1 - Math.max(0, (ph - 0.7) / 0.3)
    x.globalAlpha = clamp(a)
    const c = Math.max(3, Math.round(cell * 0.8))
    x.fillStyle = '#8fd8ff'; x.fillRect(qx, qy, c, c * 1.6); x.fillRect(qx - c * 0.5, qy + c * 0.6, c * 2, c)
    x.fillStyle = '#ffffff'; x.fillRect(qx, qy + c * 0.5, c * 0.5, c * 0.5)
  }
  x.restore()
}
/** tears for a star drawn with drawStarChar (r = its return value) */
export function starTears(x, r, t, k = 1) {
  const c = r.size / 36
  drawTears(x, r.x - 7 * c, r.y + 1.6 * c, c, t, k, -1, 1)
  drawTears(x, r.x + 7 * c, r.y + 1.6 * c, c, t + 0.31, k, 1, 2)
}

// ── the star's own squash maths (mirrors startalk.js) so props stay seated on a hopping, squashing star
function hopSq(t, hops) {
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
/** map a point given in sprite cells (relative to the sprite centre, unsquashed) onto the drawn star, with its squash */
export function onStar(t, r, opts, u, v) {
  const cell = r.size / 36, base = 15.84 * cell
  const sq = (opts.squash || 0) + hopSq(t, opts.hops).sq + 0.018 * Math.sin(t * 3.1 + (opts.seed || 1) * 1.7)
  const sx = 1 + sq, sy = 1 - sq * 0.9
  return { x: r.x + u * cell * sx, y: r.y + base + (v * cell - base) * sy, cell, sx, sy }
}

// ── props
const BAND = ['wwwwwwwwwwwwww', 'RRRRRRRRRRRRRR', 'wwwwwwwwwwwwww']
const BAND_C = { w: '#fff6ea', R: '#ff4f6d' }
/** a terry sweatband across the star's forehead, two ties fluttering on its right */
export function drawSweatband(x, t, r, opts, col = '#ff4f6d', seed = 0) {
  const p = onStar(t, r, opts, 0, -6.2)
  const c = p.cell * 0.9
  drawBits(x, BAND, { ...BAND_C, R: col }, p.x, p.y, c, { sx: p.sx, sy: p.sy })
  // ties
  const tx = p.x + 7.2 * c * p.sx, ty = p.y
  for (let k = 0; k < 2; k++) {
    const wv = Math.sin(t * 9 + k * 1.3 + seed) * 0.35
    x.save(); x.translate(tx, ty); x.rotate(0.35 + k * 0.45 + wv)
    x.fillStyle = INK; x.fillRect(-c * 0.3, -c * 0.8, c * 4.6, c * 1.6)
    x.fillStyle = col; x.fillRect(0, -c * 0.5, c * 4, c)
    x.restore()
  }
}
/** sweat drops flicking off a star (k = 0…1) */
export function drawSweat(x, t, r, k = 1, seed = 0) {
  if (k <= 0) return
  const c = r.size / 36
  for (let i = 0; i < 4; i++) {
    const ph = (t * 1.6 + i / 4 + seed * 0.21) % 1, side = i % 2 ? 1 : -1
    const qx = r.x + side * (8 + ph * 10) * c, qy = r.y - 10 * c - Math.sin(Math.PI * ph) * 6 * c + ph * 8 * c
    x.save(); x.globalAlpha = k * Math.sin(Math.PI * ph)
    const s = Math.max(3, Math.round(c * 1.2))
    x.fillStyle = '#bfe9ff'; x.fillRect(qx, qy, s, s * 1.5); x.fillStyle = '#fff'; x.fillRect(qx, qy, s * 0.5, s * 0.5)
    x.restore()
  }
}

export const HEART = ['.HH.HH.', 'HWHHHHH', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

const BFLY = [['W.....W', 'WW...WW', 'WWWbWWW', '.WWbWW.', 'WW.b.WW', 'W..b..W'], ['.......', '.W...W.', '.WWbWW.', '.WWbWW.', '.W.b.W.', '.......']]
/** a pixel butterfly (flap phase from t); col = wing colour */
export function drawButterfly(x, cx, cy, cell, t, col = PINK, { alpha = 1, seed = 0, rot = 0 } = {}) {
  const f = Math.floor(t * 9 + seed * 0.7) % 2
  drawBits(x, BFLY[f], { W: col, b: INK }, cx, cy, cell, { alpha, rot, outline: 'rgba(27,18,54,0.85)' })
}

/** a small pixel tarot card back (deep violet, gold rim, a star in the middle). w = width px; flip 0…1 squashes it sideways */
export function drawCard(x, cx, cy, w, { rot = 0, alpha = 1, flip = 1, glow = 0, t = 0 } = {}) {
  if (alpha <= 0) return
  const h = w * 1.56, c = Math.max(2, Math.round(w / 16))
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(Math.max(0.02, flip), 1)
  if (glow > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(0, 0, 0, 0, 0, h * 0.9)
    g.addColorStop(0, `rgba(255,230,160,${0.5 * glow})`); g.addColorStop(1, 'rgba(255,230,160,0)')
    x.fillStyle = g; x.fillRect(-h, -h, 2 * h, 2 * h); x.restore()
  }
  const rr = (inset, col) => { x.fillStyle = col; x.fillRect(-w / 2 + inset + c, -h / 2 + inset, w - 2 * inset - 2 * c, h - 2 * inset); x.fillRect(-w / 2 + inset, -h / 2 + inset + c, w - 2 * inset, h - 2 * inset - 2 * c) }
  rr(-c * 0.6, INK); rr(0, GOLD); rr(c, '#2a1760'); rr(c * 2, '#3a2280')
  x.fillStyle = 'rgba(242,199,92,0.5)'; x.fillRect(-w / 2 + c * 2, -h / 2 + c * 2, w - c * 4, Math.max(1, c * 0.35)); x.fillRect(-w / 2 + c * 2, h / 2 - c * 2.35, w - c * 4, Math.max(1, c * 0.35))
  x.imageSmoothingEnabled = false
  drawPixelStar(x, 0, 0, w * 0.5, 1, GOLD, '#fff6e6')
  x.restore()
}

/** a ring of little pixel stars flying out from (cx, cy), born at t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed = 0, cols = [GOLD, BONE, PINK, MINT], life = 0.7) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.6 * p), cy + Math.sin(a) * R * (0.6 + 0.6 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

// ── sound helpers
export const FX = { bus: 'sfx', rev: 0.2, dly: 0 }
export const chipS = (t, f, len, o = {}) => ['chip', r3(t), f, len, { gain: 0.05, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.7, rev: 0.12, dly: 0.1, bus: 'lead', ...o }]
export const womp = t => [['chip', r3(t), 293.66, 0.32, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.04, decay: 0.2, sustain: 0.8 }], ['chip', r3(t + 0.36), 247.5, 0.75, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.04, decay: 0.3, sustain: 0.8 }]]
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
/** the number slam: a boom, a crash, a low chip thud and a sparkle */
export const slamCues = t => [['boom', r3(t + 0.02), 0.32], ['crash', r3(t + 0.04), { gain: 0.05, len: 2.2 }], ['chip', r3(t + 0.02), 110, 0.3, { ...FX, wave: 'square', duty: 0.5, slide: -3, gain: 0.05, decay: 0.2, sustain: 0.3 }], ['glitter', r3(t + 0.05), r3(t + 0.5)]]
