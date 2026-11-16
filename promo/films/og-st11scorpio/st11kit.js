// st11kit — the little episode kit for Star Talk season 11 "Far Out", S11 E05–E08 (Leo, Virgo, Libra, Scorpio).
// Every episode keeps its OWN COPY in its folder (the season-7 convention: copy, don't share), so change a copy only for
// that episode. The season's look (rockets, suits, Mission Control, HUD, starfield, planets) lives in ../st11space.js.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { GOLD, BONE, PINK, INK, CYAN, MINT, RED, MONO, INTER, r3, R, pop01, outK, popOut, camAt, camApply, sparkles,
//            floatHearts, drawHeart, cheers, lastLine, pixelBubble, dizzy, speedLines,
//            launchPad, cockpit, label } from '../st11kit.js'
// camAt(t, shots) → { x, y, s }   shots = [{ t, x, y, s }] hard cuts with a tiny punch settle, or { …, ease: d } to glide.
//   camApply(ctx, cam) multiplies it in (inside save/restore).
// sparkles(ctx, t, cx, cy, t0, n, R, seed, cols)   a 0.7 s burst of pixel stars.
// floatHearts(ctx, t, cx, cy, t0, t1, seed, cell)  pixel hearts floating up between t0 and t1.
// cheers(t0, t1, gain) → sound cues: a crowd swell + claps.
// lastLine(root, text, { at, top, size, accentSize, accentColor }) → popText (lesson.js); update(t, out).
// pixelBubble(ctx, cx, cy, text, { size, alpha, tail, color })   a small pixel speech bubble.
// dizzy(ctx, t, cx, cy, r, k)   little pixel stars circling a dizzy head (k 0…1).
// speedLines(ctx, t, cx, cy, r0, r1, k, color)   radial motion streaks round a spinning thing.
// launchPad(ctx, t, { glow })   the Houston launch pad at dusk: gantry tower, pad deck, floodlights, the skyline far off.
//   Returns { padY, rocketX } (where the rocket stands).
// cockpit(ctx, t, { tint, window: (ctx, rect) => void, crate })   the inside of the rocket: a round porthole (window paints
//   the view inside it), panels with blinking lights, a strapped cargo crate (crate = its label). Returns { win, crate }.
// feedPanel(ctx, t, cx, cy, w, h, tag, draw(ctx), { alpha })   a small CRT video feed (a red ● LIVE tag on top); draw paints
//   inside its clip, in frame coordinates.
// label(ctx, cx, cy, text, { size, rot, alpha, tape, ink })   a label-maker tape strip.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, prog, ease } from '../../src/lib.js'
import { drawPixelStar } from '../sky.js'
import { easeOutBack } from '../wheel.js'
import { popText } from '../lesson.js'
import { drawBits } from '../st5cast.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fdcff', MINT = '#7fe0b0', RED = '#ff5d73'
export const MONO = "'Space Mono', monospace", INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const r3 = v => +v.toFixed(3)
export const R = (x, a, b, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

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
  const s = Math.max(1, cam.s), hw = 540 / s, hh = 960 / s
  const cx = clamp(cam.x, hw, 1080 - hw), cy = clamp(cam.y, hh, 1920 - hh)
  x.translate(540, 960); x.scale(s, s); x.translate(-cx, -cy)
}

export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK, CYAN]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
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

export function pixelBubble(x, cx, cy, text, { size = 30, alpha = 1, tail = 'down', color = BONE, ink = INK, pad = 18 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= clamp(alpha)
  x.font = `700 ${size}px ${MONO}`
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

/** dizzy: pixel stars circling a head */
export function dizzy(x, t, cx, cy, r, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k)
  for (let i = 0; i < 4; i++) {
    const a = t * 6 + (i / 4) * Math.PI * 2
    drawPixelStar(x, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.32, 22, i % 2, [GOLD, BONE, PINK, CYAN][i])
  }
  x.restore()
}
/** radial motion streaks round a spinning thing (arcs), k 0…1 */
export function speedLines(x, t, cx, cy, r0, r1, k = 1, color = 'rgba(239,230,214,0.8)', n = 9) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); x.strokeStyle = color; x.lineCap = 'butt'
  for (let i = 0; i < n; i++) {
    const r = r0 + ((i * 37) % 100) / 100 * (r1 - r0), a = t * (7 + (i % 3) * 2) + i * 2.2
    x.lineWidth = 6 + (i % 3) * 3
    x.beginPath(); x.arc(cx, cy, r, a, a + 0.6 + (i % 4) * 0.12); x.stroke()
  }
  x.restore()
}

/** the Houston launch pad at dusk */
export function launchPad(x, t, { glow = 1, rocketX = 640, padY = 1500 } = {}) {
  const g = x.createLinearGradient(0, 0, 0, padY)
  g.addColorStop(0, '#120b2e'); g.addColorStop(0.55, '#3a1f5c'); g.addColorStop(0.85, '#c25a6e'); g.addColorStop(1, '#f2a35c')
  x.fillStyle = g; x.fillRect(0, 0, 1080, padY)
  for (let i = 0; i < 46; i++) {
    const sx = (i * 197) % 1080, sy = (i * 131) % 900, tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + i))
    x.globalAlpha = tw * 0.8; R(x, sx, sy, i % 5 ? 4 : 6, i % 5 ? 4 : 6, '#fff3d8'); x.globalAlpha = 1
  }
  // the skyline, far off (Houston), and the flat coast
  for (let i = 0; i < 18; i++) { const w = 30 + (i * 23) % 40, h = 40 + (i * 53) % 130; R(x, i * 62 - 10, padY - 120 - h, w, h + 120, '#26173f') }
  for (let i = 0; i < 40; i++) if ((i * 7) % 3) R(x, ((i * 89) % 1040) + 10, padY - 160 - ((i * 41) % 90), 6, 6, 'rgba(255,214,140,0.7)')
  R(x, 0, padY - 40, 1080, 40, '#1d1233')
  // the pad deck
  R(x, 0, padY, 1080, 1920 - padY, '#2a2140'); R(x, 0, padY, 1080, 12, '#4a3f66')
  for (let i = 0; i < 1080; i += 90) R(x, i, padY + 12, 6, 1920 - padY, '#231b38')
  R(x, rocketX - 170, padY - 20, 340, 24, '#5c5480'); R(x, rocketX - 170, padY - 20, 340, 6, '#7a72a0')
  // the gantry tower (left of the rocket)
  const gx = rocketX - 330, top = padY - 760
  R(x, gx - 6, top - 6, 132, padY - top + 6, INK)
  R(x, gx, top, 120, padY - top, '#c8363f')
  for (let y = top + 20; y < padY - 20; y += 70) {
    R(x, gx + 10, y, 100, 50, '#2a1530')
    x.strokeStyle = '#c8363f'; x.lineWidth = 8; x.beginPath(); x.moveTo(gx + 10, y); x.lineTo(gx + 110, y + 50); x.moveTo(gx + 110, y); x.lineTo(gx + 10, y + 50); x.stroke()
  }
  R(x, gx + 120, padY - 520, 110, 22, '#c8363f'); R(x, gx + 120, padY - 520, 110, 6, '#ff8a8a')   // the access arm
  R(x, gx + 30, top - 60, 8, 60, INK); if (Math.floor(t * 2) % 2) R(x, gx + 24, top - 74, 20, 20, RED)
  // floodlights
  x.save(); x.globalCompositeOperation = 'lighter'
  for (const [fx, dir] of [[90, 1], [1000, -1]]) {
    const lg = x.createRadialGradient(fx, padY - 320, 0, fx, padY - 320, 520)
    lg.addColorStop(0, `rgba(255,235,190,${0.28 * glow})`); lg.addColorStop(1, 'rgba(255,235,190,0)')
    x.fillStyle = lg; x.fillRect(fx - 520, padY - 840, 1040, 1040)
    void dir
  }
  x.restore()
  for (const fx of [90, 1000]) { R(x, fx - 4, padY - 320, 8, 320, INK); R(x, fx - 26, padY - 340, 52, 26, '#3a3358'); R(x, fx - 20, padY - 334, 40, 14, '#fff1c8') }
  return { padY, rocketX }
}

/** the inside of the rocket: a round porthole, panels, blinking lights, a strapped crate */
export function cockpit(x, t, { tint = '#3a3358', accent = GOLD, window: win = null, crate = 'CARGO', wx = 540, wy = 760, wr = 300 } = {}) {
  R(x, 0, 0, 1080, 1920, '#14102a')
  // hull ribs
  for (let i = 0; i < 1080; i += 180) { R(x, i, 0, 26, 1920, '#1d1838'); R(x, i + 26, 0, 6, 1920, '#2a2450') }
  R(x, 0, 1240, 1080, 680, tint); R(x, 0, 1240, 1080, 14, accent)
  // panels with lights
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) {
    const on = Math.floor(t * 3 + c * 1.7 + r * 2.3) % 4 !== 0
    R(x, 70 + c * 110, 1310 + r * 70, 70, 40, '#0f0c1f')
    if (on) R(x, 80 + c * 110, 1320 + r * 70, 20, 20, [MINT, GOLD, RED, CYAN][(c + r) % 4])
  }
  // porthole
  x.save(); x.beginPath(); x.arc(wx, wy, wr, 0, Math.PI * 2); x.clip()
  if (win) win(x, { x: wx - wr, y: wy - wr, w: wr * 2, h: wr * 2 }); else R(x, wx - wr, wy - wr, wr * 2, wr * 2, '#05040c')
  x.restore()
  x.save(); x.lineWidth = 36; x.strokeStyle = '#5c5480'; x.beginPath(); x.arc(wx, wy, wr + 18, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 8; x.strokeStyle = INK; x.beginPath(); x.arc(wx, wy, wr + 38, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(wx, wy, wr, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, wx + Math.cos(a) * (wr + 18) - 6, wy + Math.sin(a) * (wr + 18) - 6, 12, 12, '#8a82a6') }
  x.restore()
  // the strapped crate (the ghost's hiding spot), bottom left
  const cr = { x: 70, y: 1040, w: 230, h: 200 }
  if (crate) {
    R(x, cr.x - 6, cr.y - 6, cr.w + 12, cr.h + 6, INK); R(x, cr.x, cr.y, cr.w, cr.h, '#8a5330'); R(x, cr.x, cr.y, cr.w, 10, '#b0743f')
    for (let i = 1; i < 4; i++) R(x, cr.x, cr.y + i * 50, cr.w, 4, '#6a3f22')
    R(x, cr.x + 60, cr.y - 6, 14, cr.h + 6, '#2a2450'); R(x, cr.x + cr.w - 74, cr.y - 6, 14, cr.h + 6, '#2a2450')
    x.save(); x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    R(x, cr.x + 20, cr.y + 76, cr.w - 40, 46, '#efe6d6'); x.fillStyle = INK; x.fillText(crate, cr.x + cr.w / 2, cr.y + 100); x.restore()
  }
  return { win: { x: wx, y: wy, r: wr }, crate: cr }
}

export function label(x, cx, cy, text, { size = 22, rot = 0, alpha = 1, tape = '#f4ecd6', ink = INK } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= clamp(alpha); x.translate(cx, cy); x.rotate(rot)
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + size * 1.1, h = size * 1.5
  R(x, -w / 2 - 3, -h / 2 - 3, w + 6, h + 6, INK); R(x, -w / 2, -h / 2, w, h, tape)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 1)
  x.restore()
}

/** a small CRT feed panel (Leo on the Mission Control screen / Aquarius on the radio) */
export function feedPanel(x, t, cx, cy, w, h, label, draw, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  R(x, cx - w / 2 - 12, cy - h / 2 - 12, w + 24, h + 24, INK); R(x, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12, '#5c5480')
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip()
  R(x, cx - w / 2, cy - h / 2, w, h, '#0a1630')
  draw(x)
  for (let y = cy - h / 2; y < cy + h / 2; y += 6) { x.globalAlpha = 0.12 * alpha; R(x, cx - w / 2, y, w, 2, '#000') }
  x.restore()
  x.globalAlpha = alpha
  x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  R(x, cx - w / 2, cy - h / 2 - 50, x.measureText(label).width + 30, 36, RED); x.fillStyle = BONE; x.fillText(label, cx - w / 2 + 15, cy - h / 2 - 31)
  x.restore()
}
