// st9kit — the little episode kit the Leo and Virgo season-9 episodes share (S9 E21–E30). Every episode keeps its OWN COPY
// in its folder (the season-7 convention: copy, don't share), so change a copy only for that episode.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { GOLD, BONE, PINK, INK, CYAN, pop01, outK, popOut, skyIn, camAt, camApply, sparkles, floatHearts,
//            cheers, lastLine, pixelBubble, r3 } from '../st9kit.js'
// skyIn(t, hour, { moon }) → (ctx, rect) => void   the window view: sky.js's drawSky + st9day's daySky at that hour.
// camAt(t, shots) → { x, y, s }   shots = [{ t, x, y, s }] hard cuts (a framing change at t) with a tiny punch settle,
//   or { t, x, y, s, ease: d } to glide there over d s. camApply(ctx, cam) multiplies it in (inside save/restore).
// sparkles(ctx, t, cx, cy, t0, n, R, seed, cols)   a 0.7 s burst of pixel stars.
// floatHearts(ctx, t, cx, cy, t0, t1, seed, cell)   pixel hearts floating up between t0 and t1.
// cheers(t0, t1, gain) → sound cues: a crowd swell + claps (the applause SFX).
// lastLine(root, text, { at, top = 300, size = 104, accentSize = 160, accentColor }) → popText (lesson.js), the episode's
//   last line: Inter 800 + one Garamond accent; update(t, out).
// pixelBubble(ctx, cx, cy, text, { size = 30, alpha = 1, tail = 'down', color }) a small pixel speech/thought bubble.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, prog, ease } from '../../src/lib.js'
import { drawSky, drawPixelStar } from '../sky.js'
import { SKY_H, easeOutBack } from '../wheel.js'
import { daySky } from '../st9day.js'
import { popText } from '../lesson.js'
import { drawBits } from '../st5cast.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fdcff'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

export const skyIn = (t, hour, { moon = null } = {}) => (ctx) => {
  drawSky(ctx, t, { ...SKY_H, moon: moon ?? SKY_H.moon, stars: 1 })
  daySky(ctx, t, { hour })
}

export function camAt(t, shots) {
  let i = -1
  for (let k = 0; k < shots.length; k++) if (shots[k].t <= t) i = k
  if (i < 0) return { x: 540, y: 960, s: 1 }
  const c = shots[i]
  if (c.ease && i > 0) {
    const p = ease.inOutCubic(prog(t, c.t, c.t + c.ease)), a = camAt(c.t - 1e-4, shots.slice(0, i))
    return { x: a.x + (c.x - a.x) * p, y: a.y + (c.y - a.y) * p, s: a.s + (c.s - a.s) * p }
  }
  const dt = t - c.t
  return { x: c.x, y: c.y, s: c.s * (1 + 0.045 * Math.exp(-dt * 9) * Math.cos(dt * 18)) }
}
export function camApply(x, cam) {
  if (!cam || (cam.s === 1 && cam.x === 540 && cam.y === 960)) return
  x.translate(540, 960); x.scale(cam.s, cam.s); x.translate(-cam.x, -cam.y)
}

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
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
export function floatHearts(x, t, cx, cy, t0, t1, seed, cell = 5, spread = 80) {
  for (let i = 0; i < 4; i++) {
    const born = t0 + ((i * 0.37 + seed * 0.13) % 1.4), life = 1.3
    for (let b = born; b < t1; b += 1.5) {
      if (t < b || t > b + life) continue
      const p = (t - b) / life, side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, HEART_C, Math.round(cx + side * spread + Math.sin(p * 7 + i) * 8), Math.round(cy - 20 - p * 130), cell, { alpha: Math.sin(Math.PI * p) })
    }
  }
}
export const drawHeart = (x, cx, cy, cell, o) => drawBits(x, HEART, HEART_C, cx, cy, cell, o)

const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
export const cheers = (t0, t1, gain = 0.07) => {
  const out = [['swell', r3(t0), r3(t1), { bus: 'sfx', gain: gain * 0.65, f0: 900, f1: 2600 }]]
  const n = Math.round((t1 - t0) / 0.12)
  for (let k = 0; k < n; k++) out.push(['clap', r3(t0 + 0.05 + k * 0.12 + (k * 0.037) % 0.05), { ...FX, gain, pan: ((k * 0.61) % 1) - 0.5 }])
  return out
}

export function lastLine(root, text, { at, top = 300, size = 104, accentSize = 160, accentColor = GOLD, late = 1, lateAt = null } = {}) {
  return popText(root, text, { top, size, accentSize, at, gap: 0.09, accentColor, wobble: true, late, lateAt: lateAt ?? at + 0.5, fit: true })
}

export function pixelBubble(x, cx, cy, text, { size = 30, alpha = 1, tail = 'down', color = BONE, ink = INK, font = "700 30px 'Space Mono', monospace", pad = 18 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= clamp(alpha)
  x.font = font.replace(/\d+px/, size + 'px')
  const lines = String(text).split('\n')
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + pad * 2, h = lines.length * size * 1.25 + pad * 1.4
  const bx = Math.round(cx - w / 2), by = Math.round(cy - h / 2)
  x.fillStyle = ink; x.fillRect(bx - 6, by, w + 12, h); x.fillRect(bx, by - 6, w, h + 12)
  x.fillStyle = color; x.fillRect(bx, by, w, h)
  if (tail === 'down') { x.fillStyle = ink; x.fillRect(cx - 12, by + h, 24, 18); x.fillStyle = color; x.fillRect(cx - 6, by + h, 12, 10) }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, cx, by + pad * 0.7 + size * 1.25 * (i + 0.5)))
  x.restore()
}
