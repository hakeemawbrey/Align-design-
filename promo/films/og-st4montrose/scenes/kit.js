// Star Talk S4 film kit (this film's own copy): easing helpers + small pixel props. Pure f(t), no `document` at top level.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
export const MONO = "'Space Mono', ui-monospace, monospace"
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const BEAT = n => 0.6 + n * 0.5556            // the engine's 108 bpm grid

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
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

export const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
export const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
export const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }

export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
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

export function floatHearts(x, t, cx, cy, t0, t1, seed = 0, cell = 7, spread = 200) {
  for (let i = 0; i < 7; i++) {
    const born = t0 + i * 0.2, life = 1.15
    if (t < born || born > t1) continue
    const p = (t - born) / life
    if (p >= 1) continue
    const side = ((i * 37 + seed) % 7) / 6 - 0.5
    drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * spread + Math.sin(p * 7 + i) * 16), Math.round(cy - 40 - p * 220), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
  }
}

// the star's own hop squash (mirrors startalk's maths) so hats stay seated on the tip
function hopState(t, hops) {
  if (!hops || !hops.length) return { sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
/** where the upper tip of a drawStarChar really is this frame */
export function tipOf(t, r, size, pop, { squash = 0, hops, seed = 1 } = {}) {
  const s = size * pop, cell = s >= 56 ? Math.max(1, Math.round(s / 28)) : s / 28, S = cell * 28
  const sq = squash + hopState(t, hops).sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sy = 1 - sq * 0.9, base = S * 0.32
  return { x: r.x, y: r.y + base - (S / 2 + base - cell * 1.2) * sy, cell }
}

/** Aquarius's pink headphones on a star rect r: k = 0 on the head, 1 = down round the neck */
export function headphones(x, r, size, k = 0, { alpha = 1 } = {}) {
  const s = size, c = Math.max(4, Math.round(s / 30)), HOT = '#ff4fd8'
  const neck = ease.inOutCubic(clamp(k))
  const cupY = r.y - s * 0.06 + neck * s * 0.28, cupX = s * 0.4 * (1 - 0.12 * neck)
  const ry = lerp(-s * 0.44, s * 0.16, neck)
  x.save(); x.globalAlpha *= alpha
  for (const [col, w] of [[INK, 1.5], ['#3a2a6e', 1]]) for (let i = 0; i <= 26; i++) {
    const a = Math.PI * i / 26, bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry
    x.fillStyle = col; x.fillRect(Math.round(bx - c * w), Math.round(by - c * w), c * 2 * w, c * 2 * w)
  }
  for (const sd of [-1, 1]) {
    const cx = r.x + sd * cupX, w = c * 5, h = c * 8
    x.fillStyle = INK; x.fillRect(Math.round(cx - w / 2 - c), Math.round(cupY - h / 2 - c), w + 2 * c, h + 2 * c)
    x.fillStyle = HOT; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), w, h)
    x.fillStyle = '#ffb3f0'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), c, h)
    x.fillStyle = '#b02a98'; x.fillRect(Math.round(cx + w / 2 - c), Math.round(cupY - h / 2), c, h)
  }
  x.restore()
}

/** a generic night skyline (no real building outlines, no logos): towers with lit pixel windows, bottom at y */
const TOWERS = [
  { x: -10, w: 120, h: 230, top: 'flat' }, { x: 100, w: 90, h: 340, top: 'step' }, { x: 180, w: 130, h: 470, top: 'step' },
  { x: 300, w: 100, h: 380, top: 'slope' }, { x: 392, w: 150, h: 610, top: 'spire' }, { x: 530, w: 110, h: 520, top: 'step' },
  { x: 630, w: 140, h: 420, top: 'gable' }, { x: 760, w: 95, h: 560, top: 'slope' }, { x: 845, w: 125, h: 330, top: 'flat' },
  { x: 960, w: 130, h: 250, top: 'step' },
]
export function drawSkyline(x, t, { y = 1300, scale = 1, alpha = 1, body = '#140c30', edge = '#2c1f5e', win = '#ffd98a', lit = 0.45, ox = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const cell = Math.max(3, Math.round(8 * scale))
  TOWERS.forEach((b, bi) => {
    const L = ox + 540 + (b.x - 540) * scale, w = b.w * scale, h = b.h * scale, T0 = y - h
    x.fillStyle = body; x.fillRect(L, T0, w, h)
    if (b.top === 'step') { x.fillRect(L + w * 0.15, T0 - 24 * scale, w * 0.7, 24 * scale); x.fillRect(L + w * 0.32, T0 - 44 * scale, w * 0.36, 20 * scale) }
    else if (b.top === 'spire') { x.beginPath(); x.moveTo(L, T0); x.lineTo(L + w / 2, T0 - 110 * scale); x.lineTo(L + w, T0); x.fill(); x.fillRect(L + w / 2 - 3, T0 - 160 * scale, 6, 60 * scale) }
    else if (b.top === 'slope') { x.beginPath(); x.moveTo(L, T0); x.lineTo(L + w, T0 - 60 * scale); x.lineTo(L + w, T0); x.fill() }
    else if (b.top === 'gable') { x.beginPath(); x.moveTo(L, T0); x.lineTo(L + w / 2, T0 - 50 * scale); x.lineTo(L + w, T0); x.fill() }
    x.fillStyle = edge; x.fillRect(L, T0, Math.max(2, 3 * scale), h)
    // windows
    for (let j = 0; T0 + 18 * scale + j * cell * 2.4 < y - 10 * scale; j++) for (let i = 0; L + 12 * scale + i * cell * 2 < L + w - 12 * scale; i++) {
      const hsh = Math.sin(bi * 91.7 + i * 12.9898 + j * 78.233) * 43758.5453, r = hsh - Math.floor(hsh)
      const flick = Math.sin(t * 0.7 + r * 40) > 0.96 ? 0 : 1
      if (r > lit || !flick) continue
      x.globalAlpha = alpha * (0.55 + 0.45 * r / lit)
      x.fillStyle = r < 0.08 ? '#fff3d6' : win
      x.fillRect(Math.round(L + 12 * scale + i * cell * 2), Math.round(T0 + 18 * scale + j * cell * 2.4), cell, Math.round(cell * 1.2))
    }
    x.globalAlpha = alpha
  })
  x.restore()
}
