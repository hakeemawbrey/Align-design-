// htxproblem · drawing kit: springy type (copied from dummies v2), sparkle bursts, the Mission-Control console,
// the swipe phone with generic (faceless) profile cards. Pure functions of t; no top-level document access.
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../../../src/lib.js'
import { W } from '../../../src/scenes/common.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff4d4a', GREEN = '#5df29a', INK = '#1a1430', CYAN = '#8fd8f6'
export const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
export const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
export const D2R = Math.PI / 180

export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
export const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(k)))).join(',')})` }
export const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
export const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }

export function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
export function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, color)
  }
  x.restore()
}

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last word may pop late with a wobble */
export function popText(parent, text, { top, size, font = INTER, weight, accentColor = GOLD, accentSize, gap = 0.07, at: t0, lastAt = null, wobble = false, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.02, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' ')
  const ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    ws.push({ t: isLast && lastAt != null ? lastAt : t0 + n * gap, big: isLast && lastAt != null, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── Mission-Control console: alarm beacon, CRT monitor ("LOVE LIFE" readout), desk of blinking buttons + two dials.
// k = pop/out scale (0..1+), g = 0 alarm (red, jagged) … 1 all clear (green, smooth sine). (cx, top) = beacon base.
const BTN = (() => { const r = rng(77); return Array.from({ length: 24 }, (_, i) => ({ c: i % 8, r: Math.floor(i / 8), col: [RED, GOLD, CYAN, GREEN, PINK][Math.floor(r() * 5)], seed: r() * 50, sp: 2 + r() * 5 })) })()
export function drawConsole(x, t, { k = 1, g = 0, cx = 540, top = 880, t0 = 0 } = {}) {
  if (k <= 0) return
  const alarm = mixHex(RED, GREEN, g)
  const blink = g < 0.5 ? (Math.sin(t * Math.PI * 2 * 2.2) > -0.1 ? 1 : 0.18) : 1     // red beacon flashes, green holds
  x.save()
  x.translate(cx, top + 420); x.scale(k, k); x.translate(-cx, -(top + 420))
  x.globalAlpha = clamp(k * 2)
  // beacon beams (rotating light, seen side-on: two beams whose length breathes)
  const by = top - 6
  const rot = t * 5.2
  x.save(); x.globalCompositeOperation = 'lighter'
  for (const side of [-1, 1]) {
    const len = 420 * Math.max(0, Math.cos(rot + (side > 0 ? 0 : Math.PI)))
    if (len < 10) continue
    const gr = x.createLinearGradient(cx, by, cx + side * len, by)
    gr.addColorStop(0, rgba(g < 0.5 ? RED : GREEN, 0.55 * blink)); gr.addColorStop(1, rgba(g < 0.5 ? RED : GREEN, 0))
    x.fillStyle = gr; x.beginPath(); x.moveTo(cx, by - 14); x.lineTo(cx + side * len, by - 90); x.lineTo(cx + side * len, by + 70); x.lineTo(cx, by + 14); x.closePath(); x.fill()
  }
  const hg = x.createRadialGradient(cx, by - 30, 10, cx, by - 30, 190)
  hg.addColorStop(0, rgba(g < 0.5 ? RED : GREEN, 0.6 * blink)); hg.addColorStop(1, rgba(g < 0.5 ? RED : GREEN, 0))
  x.fillStyle = hg; x.beginPath(); x.arc(cx, by - 30, 190, 0, Math.PI * 2); x.fill()
  x.restore()
  // dome + base
  x.save()
  x.fillStyle = alarm; x.shadowColor = alarm; x.shadowBlur = 40 * blink
  x.globalAlpha = clamp(k * 2) * (0.55 + 0.45 * blink)
  x.beginPath(); x.arc(cx, by, 66, Math.PI, 0); x.closePath(); x.fill()
  x.shadowBlur = 0; x.globalAlpha = clamp(k * 2) * 0.7 * blink; x.fillStyle = '#fff3e0'
  x.beginPath(); x.ellipse(cx - 24, by - 34, 12, 20, -0.5, 0, Math.PI * 2); x.fill()
  x.globalAlpha = clamp(k * 2)
  glowStroke(x, BONE, 7, 10); x.beginPath(); x.arc(cx, by, 66, Math.PI, 0); x.stroke()
  x.fillStyle = '#2a2350'; x.beginPath(); x.roundRect(cx - 96, by, 192, 34, 8); x.fill(); x.stroke()
  x.restore()
  // monitor
  const mx = cx - 330, my = top + 28, mw = 660, mh = 420
  x.save()
  x.fillStyle = '#1d1838'; x.beginPath(); x.roundRect(mx, my, mw, mh, 40); x.fill()
  glowStroke(x, BONE, 8, 16); x.stroke(); x.shadowBlur = 0
  const sx = mx + 34, sy = my + 32, sw = mw - 68, sh = mh - 64
  x.beginPath(); x.roundRect(sx, sy, sw, sh, 22); x.fillStyle = mixHex('#1c0a12', '#07160f', g); x.fill()
  x.save(); x.clip()
  // phosphor grid
  x.strokeStyle = rgba(alarm, 0.16); x.lineWidth = 2
  for (let i = 1; i < 8; i++) { x.beginPath(); x.moveTo(sx + i * sw / 8, sy); x.lineTo(sx + i * sw / 8, sy + sh); x.stroke() }
  for (let i = 1; i < 5; i++) { x.beginPath(); x.moveTo(sx, sy + i * sh / 5); x.lineTo(sx + sw, sy + i * sh / 5); x.stroke() }
  // the trace: jagged + spiky (alarm) → smooth sine (all clear)
  const wy = sy + sh * 0.6
  x.lineWidth = 7; x.lineJoin = 'round'; x.lineCap = 'round'; x.shadowBlur = 18
  for (const [mode, a] of [[0, 1 - g], [1, g]]) {
    if (a <= 0.01) continue
    const col = mode ? GREEN : RED
    x.strokeStyle = col; x.shadowColor = col; x.globalAlpha = clamp(k * 2) * a
    x.beginPath()
    for (let i = 0; i <= 60; i++) {
      const u = i / 60, px = sx + 20 + u * (sw - 40)
      let v
      if (mode) v = Math.sin(u * Math.PI * 4 - t * 6) * 46
      else { const n = noise1(u * 9 - t * 3.5, 4) - 0.5; const spike = (i + Math.floor(t * 9)) % 9 === 0 ? (i % 2 ? 1 : -1) * 120 : 0; v = n * 120 + spike }
      i ? x.lineTo(px, wy + v) : x.moveTo(px, wy + v)
    }
    x.stroke()
  }
  x.shadowBlur = 0; x.globalAlpha = clamp(k * 2)
  // readout text
  x.font = `700 34px ${MONO}`; x.textBaseline = 'middle'
  x.fillStyle = rgba(BONE, 0.85); x.textAlign = 'left'; x.fillText('LOVE LIFE', sx + 26, sy + 44)
  x.textAlign = 'right'
  const stat = g < 0.5 ? 'CRITICAL' : 'ALIGNED'
  const sb = g < 0.5 ? (Math.sin(t * Math.PI * 2 * 2.2) > -0.1 ? 1 : 0.25) : 1
  x.globalAlpha = clamp(k * 2) * sb; x.fillStyle = alarm; x.shadowColor = alarm; x.shadowBlur = 14
  x.fillText((g < 0.5 ? '▲ ' : '● ') + stat, sx + sw - 24, sy + 44)
  x.restore()
  // scanlines
  x.save(); x.beginPath(); x.roundRect(sx, sy, sw, sh, 22); x.clip(); x.globalAlpha = 0.12; x.fillStyle = '#000'
  for (let yy = sy; yy < sy + sh; yy += 6) x.fillRect(sx, yy, sw, 2)
  x.restore()
  x.restore()
  // desk (trapezoid) with buttons and two dials
  const dt = my + mh + 22, db = dt + 230
  x.save()
  x.beginPath(); x.moveTo(cx - 400, dt); x.lineTo(cx + 400, dt); x.lineTo(cx + 470, db); x.lineTo(cx - 470, db); x.closePath()
  x.fillStyle = '#231d44'; x.fill(); glowStroke(x, BONE, 7, 12); x.stroke(); x.shadowBlur = 0
  for (const b of BTN) {
    const bx = cx - 196 + b.c * 56, byy = dt + 50 + b.r * 64
    const on = noise1(t * b.sp, b.seed) > 0.45
    const col = g > 0.5 && b.col === RED ? GREEN : b.col
    x.fillStyle = on ? col : rgba(col, 0.28); x.shadowColor = col; x.shadowBlur = on ? 16 : 0
    x.beginPath(); x.roundRect(bx - 20, byy - 18, 40, 36, 8); x.fill()
  }
  x.shadowBlur = 0
  for (const [dx, sp] of [[-330, 1], [330, -1.3]]) {
    const ddx = cx + dx, ddy = dt + 112
    x.fillStyle = '#120e26'; x.beginPath(); x.arc(ddx, ddy, 54, 0, Math.PI * 2); x.fill()
    glowStroke(x, BONE, 6, 8); x.stroke()
    const wob = g < 0.5 ? Math.sin(t * 9 * sp) * 1.1 + noise1(t * 4, dx) * 0.8 : -0.6 + 0.08 * Math.sin(t * 2)
    glowStroke(x, alarm, 7, 10); x.beginPath(); x.moveTo(ddx, ddy); x.lineTo(ddx + Math.sin(wob) * 40, ddy - Math.cos(wob) * 40); x.stroke()
    x.fillStyle = alarm; x.beginPath(); x.arc(ddx, ddy, 8, 0, Math.PI * 2); x.fill()
  }
  x.restore()
  x.restore()
}

// ── a generic dating-app profile card (no faces: a pictogram head-and-shoulders silhouette on a colour wash)
export const CARD_HUES = ['#f29a4a', '#3fb6f0', '#e163d6', '#2fc79a', '#f2cf4a', '#a35cf0', '#f0603a', '#38c4ec', '#ef5c94', '#7c74f0', '#e9b24a', '#3f7cf0']
export function drawGenericCard(x, w, h, hue) {
  x.save()
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 34); x.fillStyle = '#17122e'; x.fill()
  x.save(); x.clip()
  const ph = h * 0.74
  const gr = x.createLinearGradient(0, -h / 2, 0, -h / 2 + ph)
  gr.addColorStop(0, mixHex(hue, '#ffffff', 0.25)); gr.addColorStop(1, mixHex(hue, '#17122e', 0.35))
  x.fillStyle = gr; x.fillRect(-w / 2, -h / 2, w, ph)
  // silhouette
  x.fillStyle = mixHex(hue, '#120d24', 0.62)
  const hy = -h / 2 + ph * 0.42
  x.beginPath(); x.arc(0, hy, w * 0.17, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.ellipse(0, -h / 2 + ph + w * 0.06, w * 0.36, w * 0.36, 0, Math.PI, 0); x.fill()
  x.restore()
  // text bars
  x.fillStyle = BONE; x.beginPath(); x.roundRect(-w / 2 + 34, -h / 2 + ph + 30, w * 0.46, 30, 15); x.fill()
  x.fillStyle = rgba(BONE, 0.32); x.beginPath(); x.roundRect(-w / 2 + 34, -h / 2 + ph + 82, w * 0.66, 18, 9); x.fill()
  x.beginPath(); x.roundRect(-w / 2 + 34, -h / 2 + ph + 114, w * 0.38, 18, 9); x.fill()
  glowStroke(x, rgba(BONE, 0.9), 5, 0); x.shadowBlur = 0
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 34); x.stroke()
  x.restore()
}

/** a plain dark phone: bezel + pill notch. Returns the screen rect for clipping */
export function drawPhone(x, cx, cy, w, h, a = 1) {
  x.save(); x.globalAlpha = a
  x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 50; x.shadowOffsetY = 20
  x.fillStyle = '#0d0a1c'; x.beginPath(); x.roundRect(cx - w / 2, cy - h / 2, w, h, 70); x.fill()
  x.shadowOffsetY = 0
  glowStroke(x, BONE, 8, 18); x.stroke(); x.shadowBlur = 0
  x.fillStyle = '#000'; x.beginPath(); x.roundRect(cx - 70, cy - h / 2 + 26, 140, 34, 17); x.fill()
  x.restore()
  return { x: cx - w / 2 + 22, y: cy - h / 2 + 22, w: w - 44, h: h - 44, r: 50 }
}

// ── a flight controller seen from behind (pictogram, no face): headset on, hands on head (g=0, panic) → arms up in a V (g=1, cheer)
export function drawController(x, t, { k = 1, g = 0, cx = 540, cy = 1700 } = {}) {
  if (k <= 0) return
  const bob = g < 0.5 ? 6 * Math.sin(t * 22) * (1 - g * 2) : -Math.abs(Math.sin(t * 6.5)) * 34 * (g - 0.5) * 2
  const sway = g < 0.5 ? 4 * Math.sin(t * 9) : 3 * Math.sin(t * 6.5)
  x.save(); x.translate(cx, cy + 260); x.scale(k, k); x.translate(-cx, -(cy + 260)); x.translate(0, bob); x.globalAlpha = clamp(k * 2)
  x.translate(cx, cy); x.rotate(sway * D2R); x.translate(-cx, -cy)
  const DARK = '#140f2a', accent = mixHex(RED, GREEN, g)
  const P = (a, b) => ({ x: lerp(a.x, b.x, g), y: lerp(a.y, b.y, g) })
  const arms = [-1, 1].map(s => ({
    sh: { x: cx + s * 120, y: cy + 128 },
    el: P({ x: cx + s * 168, y: cy - 6 }, { x: cx + s * 176, y: cy - 14 }),
    ha: P({ x: cx + s * 62, y: cy - 46 }, { x: cx + s * 226, y: cy - 168 }),
  }))
  const limb = (a) => { x.beginPath(); x.moveTo(a.sh.x, a.sh.y); x.lineTo(a.el.x, a.el.y); x.lineTo(a.ha.x, a.ha.y); x.stroke() }
  // outline pass, then fill pass
  for (const pass of [0, 1]) {
    x.save()
    if (!pass) { x.strokeStyle = BONE; x.fillStyle = BONE; x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 18 } else { x.strokeStyle = DARK; x.fillStyle = DARK }
    const grow = pass ? 0 : 7
    x.lineCap = 'round'; x.lineJoin = 'round'
    // torso / shoulders
    x.beginPath(); x.roundRect(cx - 150 - grow, cy + 92 - grow, 300 + grow * 2, 400, 90 + grow); x.fill()
    // neck + head
    x.beginPath(); x.arc(cx, cy, 64 + grow, 0, Math.PI * 2); x.fill()
    // arms
    x.lineWidth = 46 + grow * 2; for (const a of arms) limb(a)
    for (const a of arms) { x.beginPath(); x.arc(a.ha.x, a.ha.y, 28 + grow, 0, Math.PI * 2); x.fill() }
    x.restore()
  }
  // headset: band over the head + ear cups, in the alarm colour
  x.save(); glowStroke(x, accent, 12, 16)
  x.beginPath(); x.arc(cx, cy + 4, 74, Math.PI * 1.08, Math.PI * 1.92); x.stroke()
  x.fillStyle = accent
  for (const s of [-1, 1]) { x.beginPath(); x.roundRect(cx + s * 76 - 15, cy - 12, 30, 52, 12); x.fill() }
  x.restore()
  x.restore()
}
