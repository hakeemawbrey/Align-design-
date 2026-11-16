// kit — small drawing + timing helpers for Star Talk season 8 episodes E11–E15 (st8descent, st8heist, st8sitcom,
// st8morning, st8comeback). Each of those folders keeps its OWN COPY of this file (copy, don't import across folders);
// the season's cast and hook devices live in the shared ../st8cast.js, never here.
//
//   import { pop01, outK, popOut, r3, R, glow, burst, monoText, panel, seq, wordPops, flash, chip, lowerThird,
//            drawPhone, hiddenComet, HEART, HEART_C, NOTE } from '../kit.js'
//
// pop01(t, t0, d, s) springy 0→1 · outK(t, [a, b]) 1→0 · popOut(t, [a, b]) a little swell, then 1→0 · r3(v) 3 decimals
// R(ctx, col, x, y, w, h)  a whole-pixel rect · glow(ctx, x, y, r, col, a) additive radial glow
// burst(ctx, t, t0, cx, cy, { n, R, cols, dur, seed })  pixel-star sparkle burst
// monoText(ctx, s, x, y, { size, color, spacing, alpha, n, align, shadow }) → width   Space Mono, typed on to n chars
// panel(ctx, x, y, w, h, { P, border, fill, glow })  the stepped pixel panel (top-left corner at x, y)
// seq(start, items, { cps, hold }) → { lines, marks, end }   dialogueBox lines from a script, every line readable ≥ hold s:
//   items: { who: tag, x: 'text *accent*', color?, hold?, pre? } · { wait: s } · { mark: 'name' }
// wordPops(t0, n, gap, base, gain) → pop cues · flash(ctx, t, at, { dur, col }) a white camera/cut flash
// chip(ctx, t, { at, out, text, x, y, size, color, border, fill, align })   a Space Mono label in a pixel panel (pops in)
// lowerThird(ctx, t, { at, out, name, sub, x, y, w, color })   a broadcast/doc lower third (Inter 800 + Space Mono sub)
// drawPhone(ctx, x, y, s, { screen, glowCol, rot, alpha })   a pixel phone (s = cell px), screen(ctx, x0, y0, w, h) draws in it
// hiddenComet(ctx, t, { at, from: [x, y], to: [x, y], dur = 2.4, size = 30 })   the season's hidden Comet crossing once
//   (st8cast.drawComet with its default sunDir, no aura, no EX pin; only draws between at and at + dur)
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, rng, hexToRgb } from '../../src/lib.js'
import { easeOutBack } from '../wheel.js'
import { drawPixelStar } from '../sky.js'
import { lineTimes } from '../startalk.js'
import { drawComet } from '../st8cast.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', CYAN = '#7fdcff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const TAU = Math.PI * 2
export const r3 = v => +v.toFixed(3)
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const R = (ctx, c, x, y, w, h) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
export const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

export function glow(ctx, x, y, r, col, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.4, rgba(col, 0.2 * a)); g.addColorStop(1, rgba(col, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore()
}
export function burst(ctx, t, t0, cx, cy, { n = 14, R: rad = 220, cols = [GOLD, BONE, PINK], dur = 0.75, seed = 3, flat = 1 } = {}) {
  const tt = (t - t0) / dur
  if (tt < 0 || tt > 1) return
  const p = ease.outCubic(tt), r = rng(seed)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt)
  for (let i = 0; i < n; i++) { const a = r() * TAU, d = (0.45 + r() * 0.65) * rad; drawPixelStar(ctx, cx + Math.cos(a) * d * p, cy + Math.sin(a) * d * p * flat, (16 + r() * 18) * (1 - 0.35 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  ctx.restore()
}
export function monoText(ctx, s, x, y, { size = 30, color = GOLD, spacing = 0.06, alpha = 1, shadow = true, n = Infinity, align = 'center', weight = 700 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.font = `${weight} ${size}px ${MONO}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  const chars = [...s], adv = chars.map(ch => ctx.measureText(ch).width + size * spacing)
  const total = adv.reduce((a, b) => a + b, 0) - size * spacing
  let px = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x
  chars.forEach((ch, i) => {
    if (i < n) {
      if (shadow) { ctx.fillStyle = 'rgba(6,4,18,0.9)'; ctx.fillText(ch, px, y + size * 0.08) }
      ctx.fillStyle = color; ctx.fillText(ch, px, y)
    }
    px += adv[i]
  })
  ctx.restore()
  return total
}
const stepRect = (ctx, x, y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }
export function panel(ctx, x, y, w, h, { P = 6, border = GOLD, fill = 'rgba(16,9,38,0.94)', glow: gl = 0.5 } = {}) {
  x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h)
  if (gl > 0) { ctx.save(); ctx.shadowColor = rgba(border, gl); ctx.shadowBlur = 22; stepRect(ctx, x, y, w, h, P, border); ctx.restore() }
  stepRect(ctx, x, y, w, h, P, border); stepRect(ctx, x + P, y + P, w - 2 * P, h - 2 * P, P, INK); stepRect(ctx, x + 2 * P, y + 2 * P, w - 4 * P, h - 4 * P, P, fill)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x + 2 * P, y, P * 4, P / 2); ctx.fillRect(x, y + 2 * P, P / 2, P * 3)
}

/** a script → dialogueBox lines; each line's typing starts at the cursor (+ pre) and the next waits until done + hold */
export function seq(start, items, { cps = 28, hold = 1.7 } = {}) {
  let cur = start
  const lines = [], marks = {}
  for (const it of items) {
    if (it.mark) { marks[it.mark] = r3(cur); continue }
    if (it.wait) { cur += it.wait; continue }
    const L = { t: r3(cur + (it.pre || 0)), speaker: it.who, text: it.x, ...(it.color ? { color: it.color } : {}) }
    const [tm] = lineTimes([L], { cps })
    lines.push(L)
    cur = tm.done + (it.hold ?? hold)
  }
  return { lines, marks, end: r3(cur) }
}
export const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

export function flash(ctx, t, at, { dur = 0.35, col = '#fffbf0', peak = 1 } = {}) {
  const p = prog(t, at - 0.03, at + dur)
  if (p <= 0 || p >= 1) return
  ctx.save(); ctx.globalAlpha = peak * (p < 0.12 ? p / 0.12 : 1 - ease.outQuad((p - 0.12) / 0.88)); ctx.fillStyle = col; ctx.fillRect(0, 0, 1080, 1920); ctx.restore()
}
export function chip(ctx, t, { at, out = 1e9, text, x = 540, y, size = 30, color = GOLD, border = GOLD, fill = 'rgba(16,9,38,0.94)', align = 'center', type = true, P = 6, padX = 30, h = null, rot = 0 }) {
  const k = pop01(t, at, 0.3, 2.2) * outK(t, [out - 0.2, out])
  if (k <= 0.01 || t < at) return
  ctx.save()
  ctx.font = `700 ${size}px ${MONO}`
  const w = [...text].reduce((a, ch) => a + ctx.measureText(ch).width + size * 0.06, 0) + 2 * padX, hh = h || size * 2.1
  const cx = align === 'center' ? x : align === 'left' ? x + w / 2 : x - w / 2
  ctx.translate(cx, y); ctx.rotate(rot); ctx.scale(k, k)
  panel(ctx, -w / 2, -hh / 2, w, hh, { P, border, fill, glow: 0.35 })
  monoText(ctx, text, 0, 2, { size, color, n: type ? Math.floor((t - at) / 0.025) + 1 : Infinity })
  ctx.restore()
}
export function lowerThird(ctx, t, { at, out, name, sub, x = 70, y = 1290, w = 640, color = GOLD, nameSize = 48 }) {
  const pin = prog(t, at, at + 0.35), po = prog(t, out - 0.3, out)
  if (pin <= 0 || po >= 1) return
  const k = ease.outCubic(pin) * (1 - ease.inCubic(po)), dx = (1 - k) * -80
  ctx.save(); ctx.globalAlpha *= k
  ctx.fillStyle = 'rgba(8,5,20,0.86)'; ctx.fillRect(x + dx, y - 52, w, 108)
  ctx.fillStyle = color; ctx.fillRect(x + dx, y - 52, 12, 108)
  ctx.font = `800 ${nameSize}px ${INTER}`; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = BONE
  ctx.fillText(name, x + 32 + dx, y + 4)
  monoText(ctx, sub, x + 34 + dx, y + 32, { size: 22, color, spacing: 0.1, align: 'left', shadow: false })
  ctx.restore()
}
export function drawPhone(ctx, x, y, s, { screen = null, glowCol = CYAN, rot = 0, alpha = 1, w = 13, h = 22 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  const W = w * s, H = h * s
  ctx.save(); ctx.shadowColor = rgba(glowCol, 0.6); ctx.shadowBlur = 30; R(ctx, INK, -W / 2 - s, -H / 2 - s, W + 2 * s, H + 2 * s); ctx.restore()
  R(ctx, '#2c2550', -W / 2, -H / 2, W, H)
  R(ctx, '#0d0a1e', -W / 2 + s, -H / 2 + 2 * s, W - 2 * s, H - 4 * s)
  R(ctx, '#4a4270', -s * 1.5, -H / 2 + s * 0.5, 3 * s, s * 0.6)
  if (screen) { ctx.save(); ctx.beginPath(); ctx.rect(-W / 2 + s, -H / 2 + 2 * s, W - 2 * s, H - 4 * s); ctx.clip(); screen(ctx, -W / 2 + s, -H / 2 + 2 * s, W - 2 * s, H - 4 * s); ctx.restore() }
  ctx.restore()
}
export function hiddenComet(ctx, t, { at, from, to, dur = 2.4, size = 30, alpha = 0.8 }) {
  const p = prog(t, at, at + dur)
  if (p <= 0 || p >= 1) return
  const x = lerp(from[0], to[0], p), y = lerp(from[1], to[1], p)
  ctx.save(); ctx.globalAlpha *= alpha * Math.min(1, Math.sin(Math.PI * p) * 3)
  drawComet(ctx, x, y, size, t, { aura: false, exPin: false, tail: size * 3, mood: 'happy' })
  ctx.restore()
}
