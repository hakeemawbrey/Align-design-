// st5reveal props: the Houston rooftop the season's last three episodes play on (a generic skyline: no landmarks, no
// logos), Leo's crown, a pixel heart, sparkle bursts and floating hearts. Pure functions of their arguments and t;
// nothing touches `document` at module top level (the sound build imports scenes/index.js in node).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { drawBits } from '../../st5cast.js'

const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', CYAN = '#7fdcff'

export const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
export const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
export const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
export const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
export const TEAR = ['.T.', 'TWT', 'TTT', '.T.']
export const TEAR_C = { T: '#7fd6ff', W: '#e6f8ff' }

/** a generic downtown skyline: deterministic boxes (built once) */
export function makeSkyline(seed = 7, { x0 = -20, x1 = 1100, base = 1240, lo = 90, hi = 330 } = {}) {
  const r = rng(seed), out = []
  let x = x0
  while (x < x1) {
    const w = Math.round(60 + r() * 80), h = Math.round(lo + r() * (hi - lo)) * (r() < 0.2 ? 1.25 : 1)
    const wins = []
    for (let wy = base - h + 20; wy < base - 16; wy += 22) for (let wx = x + 10; wx < x + w - 14; wx += 18) if (r() < 0.32) wins.push([wx, wy, r()])
    out.push({ x, w, h, wins, spire: r() < 0.18, step: r() < 0.3 })
    x += w + Math.round(r() * 8)
  }
  return { base, blds: out }
}
/** the skyline (alpha k), the rooftop floor and its ledge from `base` down */
export function drawRooftop(x, t, sky, k = 1, { floor = '#0c0820', ledge = '#2a2148', lights = true } = {}) {
  if (k <= 0) return
  const { base, blds } = sky
  x.save(); x.globalAlpha = clamp(k)
  for (const b of blds) {
    const top = base - b.h
    x.fillStyle = '#150e30'; x.fillRect(b.x, top, b.w, b.h)
    if (b.step) { x.fillRect(b.x + b.w * 0.2, top - 30, b.w * 0.6, 30) }
    if (b.spire) { x.fillRect(b.x + b.w / 2 - 3, top - 70, 6, 70); x.fillStyle = (Math.floor(t * 1.5 + b.x) % 2) ? '#ff5d73' : '#5a1f33'; x.fillRect(b.x + b.w / 2 - 4, top - 76, 8, 8) }
    x.fillStyle = '#21184a'; x.fillRect(b.x, top, 4, b.h)
    for (const [wx, wy, ph] of b.wins) {
      const on = 0.55 + 0.45 * Math.sin(t * 0.7 + ph * 40)
      x.globalAlpha = clamp(k) * (0.35 + 0.45 * on)
      x.fillStyle = ph < 0.7 ? '#f7cf68' : '#9fd8ff'; x.fillRect(wx, wy, 8, 10)
    }
    x.globalAlpha = clamp(k)
  }
  // the roof
  x.fillStyle = ledge; x.fillRect(0, base, 1080, 22)
  x.fillStyle = '#3d3366'; x.fillRect(0, base, 1080, 5)
  x.fillStyle = floor; x.fillRect(0, base + 22, 1080, 1920 - base - 22)
  x.fillStyle = 'rgba(80,66,130,0.25)'; for (let i = 0; i < 1080; i += 120) x.fillRect(i, base + 22, 4, 1920 - base)
  x.restore()
  if (lights) stringLights(x, t, k, base - 420)
}
/** a sagging string of warm bulbs across the roof */
export function stringLights(x, t, k, y0) {
  x.save(); x.globalAlpha = clamp(k)
  for (let i = 0; i <= 54; i++) {
    const u = i / 54, px = lerp(-10, 1090, u), py = y0 + Math.sin(Math.PI * u) * 70 + Math.sin(u * TAU2) * 8
    x.fillStyle = '#2a2148'; x.fillRect(Math.round(px), Math.round(py), 20, 3)
    if (i % 3 === 0) {
      const tw = 0.6 + 0.4 * Math.sin(t * 2.3 + i)
      x.globalAlpha = clamp(k) * tw
      x.fillStyle = i % 2 ? '#ffd98a' : '#ffb3cc'; x.fillRect(Math.round(px) - 4, Math.round(py) + 4, 9, 11)
      x.globalAlpha = clamp(k)
    }
  }
  x.restore()
}
const TAU2 = Math.PI * 4

export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, CYAN]) {
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
export function floatHearts(x, t, cx, cy, t0, t1, seed, cell = 4, spread = 70) {
  for (let i = 0; i < 4; i++) {
    const born = t0 + ((i * 0.37 + seed * 0.13) % 1.4), life = 1.3
    for (let b = born; b < t1; b += 1.5) {
      if (t < b || t > b + life) continue
      const p = (t - b) / life, side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, HEART_C, Math.round(cx + side * spread + Math.sin(p * 7 + i) * 8), Math.round(cy - 20 - p * 120), cell, { alpha: Math.sin(Math.PI * p) })
    }
  }
}
/** two pixel tears rolling from under a star's eyes (size = the sprite size) */
export function tears(x, t, r, size, t0, t1, seed = 1) {
  if (t < t0 || t > t1) return
  const c = Math.max(3, Math.round(size / 40)), ex = size * 0.14
  for (const s of [-1, 1]) for (let k = 0; k < 2; k++) {
    const ph = ((t - t0) * 0.9 + k * 0.5 + (s > 0 ? 0.25 : 0) + seed * 0.1) % 1
    drawBits(x, TEAR, TEAR_C, Math.round(r.x + s * ex), Math.round(r.y + size * 0.08 + ph * size * 0.32), c, { alpha: Math.sin(Math.PI * ph) * clamp(prog(t, t0, t0 + 0.3)) * (1 - prog(t, t1 - 0.3, t1)), outline: null })
  }
}
