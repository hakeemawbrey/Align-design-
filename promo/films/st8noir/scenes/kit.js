// kit — small drawing + timing helpers for Star Talk S8 E16–E20 (promo/films/STARTALK9.md). Every one of those episodes
// keeps its OWN COPY of this file in its scenes/ folder (copy, don't share), like season 7's s7talk.js.
//
//   pop01(t, t0, d, s) · outK(t, [a, b]) · popOut(t, [a, b])   springy pop-in / fade-out / pop-out factors (0…1)
//   rgba(hex, a) · BMP(str) → rows · bits(ctx, rows, cx, cy, cell, cols, { rot, a, outline })   centred pixel bitmaps
//   pixFont(ctx, text, x, y, size, color, { align, weight, font, shadow, alpha })   one line of canvas text
//   drawMoonChar(ctx, x, y, r, t, { mood, look, blink, pop, hops, seed, alpha, glow })   the Moon (☽ THE MOON): a pale
//     lavender pixel disc with craters and two pixel eyes (moods 'neutral' 'happy' 'wide' 'sleepy' 'heart').
//     Returns { x, y, r, top }.
//   punch(t, at, dur, amount) → zoom k (a fast punch-in that eases back out over the last 40 %)
//   burst(ctx, t, cx, cy, t0, n, R, cols, { life, size })   a ring of pixel sparkles flying out from t0
//   wordPops(t0, n, gap, base, gain) → sound cues: one pop per headline word
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fdcff', RED = '#ff3d5a'
export const MONO = "'Space Mono', ui-monospace, monospace"
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MOON = { tag: '☽ THE MOON', color: '#e9e4ff' }

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
export const r3 = v => +v.toFixed(3)

export const BMP = s => s.trim().split(/\s+/)
export function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1, outline = 'rgba(14,8,32,0.88)', flip = false } = {}) {
  if (a <= 0 || cell <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot); if (flip) x.scale(-1, 1)
  if (outline) {
    x.fillStyle = outline
    bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  }
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

export function pixFont(x, text, px, py, size, color, { align = 'center', weight = 700, font = MONO, shadow = 'rgba(6,4,18,0.85)', alpha = 1, base = 'middle', italic = false } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = base
  if (shadow) { x.fillStyle = shadow; x.fillText(text, px, py + Math.max(2, size * 0.07)) }
  x.fillStyle = color; x.fillText(text, px, py)
  x.restore()
}

/** the hop curve startalk uses (lift 0…1, squash) */
export function hopState(t, hops) {
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

const CRATERS = [[-0.35, -0.3, 0.16], [0.3, 0.38, 0.2], [0.42, -0.42, 0.1], [-0.2, 0.5, 0.09]]
export function drawMoonChar(x, cx, cy, r, t, { mood = 'neutral', look = [0, 0], blink, pop = 1, hops = null, seed = 3, alpha = 1, glow = 1, blush = null } = {}) {
  if (pop <= 0 || alpha <= 0) return { x: cx, y: cy, r, top: cy - r }
  const hs = hopState(t, hops)
  const R = r * pop, N = 22, c = Math.max(2, Math.round(2 * R / N))
  const y = cy + Math.sin(t * 1.9 + seed) * r * 0.04 - hs.lift * r * 0.18
  x.save(); x.globalAlpha *= alpha
  // glow
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, y, R * 0.6, cx, y, R * 1.9)
  g.addColorStop(0, rgba('#d9d0ff', 0.32 * glow)); g.addColorStop(1, 'rgba(217,208,255,0)')
  x.fillStyle = g; x.fillRect(cx - R * 2, y - R * 2, R * 4, R * 4); x.restore()
  x.translate(Math.round(cx), Math.round(y)); x.scale(1 + hs.sq, 1 - hs.sq * 0.9)
  const h = N / 2
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
    if (d > 1) continue
    const crat = CRATERS.some(([a, b, rr]) => Math.hypot(u - a, v - b) < rr)
    x.fillStyle = d > 0.9 ? '#2a2148' : crat ? '#c8bfe3' : d > 0.78 ? '#b9b0d8' : u + v < -0.8 ? '#fffbea' : MOON.color
    x.fillRect((i - h) * c, (j - h) * c, c + 0.5, c + 0.5)
  }
  // eyes
  const shut = typeof blink === 'number' ? blink > 0.5 : blink === false ? false : ((t + seed * 0.7) % 3.4) < 0.12
  const [lx, ly] = look
  for (const s of [-1, 1]) {
    const ex = s * 4 * c, ey = -1 * c
    if (mood === 'happy' || shut || mood === 'sleepy') {
      x.fillStyle = '#1b1236'
      if (mood === 'happy') { x.fillRect(ex - 1.5 * c, ey, c, c); x.fillRect(ex - 0.5 * c, ey - c, c, c); x.fillRect(ex + 0.5 * c, ey, c, c) }
      else x.fillRect(ex - 1.5 * c, ey, 3 * c, c)
      continue
    }
    if (mood === 'heart') {
      x.fillStyle = '#ff4f86'
      x.fillRect(ex - 1.5 * c, ey - c, c, c); x.fillRect(ex + 0.5 * c, ey - c, c, c); x.fillRect(ex - 1.5 * c, ey, 3 * c, c); x.fillRect(ex - 0.5 * c, ey + c, c, c)
      continue
    }
    const wide = mood === 'wide'
    x.fillStyle = '#ffffff'; x.fillRect(ex - (wide ? 1.5 : 1) * c, ey - (wide ? 2 : 1.5) * c, (wide ? 3 : 2) * c, (wide ? 4 : 3) * c)
    x.fillStyle = '#1b1236'; x.fillRect(ex - 0.5 * c + Math.round(lx) * c * 0.6, ey - 0.5 * c + Math.round(ly) * c * 0.6, c, c * (wide ? 1 : 1.5))
  }
  const bl = blush ?? (['happy', 'heart'].includes(mood) ? 0.8 : 0)
  if (bl > 0) { x.fillStyle = rgba('#ffb3cc', 0.7 * bl); for (const s of [-1, 1]) x.fillRect(s * 6 * c - c, 2 * c, 2 * c, c) }
  x.restore()
  return { x: cx, y, r: R, top: y - R }
}

export function punch(t, at, dur = 0.9, amount = 0.2) {
  const p = prog(t, at, at + dur)
  if (p <= 0 || p >= 1) return 0
  return amount * (p < 0.2 ? easeOutBack(p / 0.2, 2) : p < 0.6 ? 1 : 1 - ease.inOutQuad((p - 0.6) / 0.4))
}

export function burst(x, t, cx, cy, t0, n, R, cols = [GOLD, BONE, PINK, CYAN], { life = 0.7, size = 24 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + t0
    drawPixelStar(x, cx + Math.cos(a) * R * (0.5 + 0.7 * p), cy + Math.sin(a) * R * (0.5 + 0.7 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export { clamp, lerp, prog, ease, easeOutBack }
