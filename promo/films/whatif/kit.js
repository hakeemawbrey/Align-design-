// "What if you could see…" kit: zodiac love explainers in the faceless short format (vertical 1080×1920).
// A dark room with warm bokeh and string lights, round black-headed characters with white eyes and a glowing rim,
// number bubbles that count up, a gold headline that stays on screen the whole film (it is the thumbnail too),
// and word-by-word captions low on the screen. Everything is drawn on one canvas and is a pure function of t.
import { clamp, lerp, prog, ease, rng, hexToRgb } from '../../src/lib.js'
import { drawPixelStar } from '../sky.js'
import { SIGNS, easeOutBack } from '../wheel.js'

export const GOLD = '#f6c453', CREAM = '#f3ead8', PINK = '#f48fc0', INK = '#0a0a10'
export const TAU = Math.PI * 2
export const BEAT = n => 0.6 + n * 0.5556
export const sign = id => SIGNS.find(s => s.id === id)
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
export const pop01 = (t, t0, d = 0.32, s = 2.2) => easeOutBack(prog(t, t0, t0 + d), s)
export const wob = (t, t0, amp = 1, f = 14, d = 3.4) => t > t0 ? amp * Math.sin((t - t0) * f) * Math.exp(-(t - t0) * d) : 0
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const GLYPH_FONT = "'Noto Sans Symbols', 'Segoe UI Symbol', 'DejaVu Sans', serif"
const VS = '︎'

// ───────────────────────── room
/** a dark lounge: warm vertical gradient, drifting bokeh, a sagging string of bulbs, a floor glow, a vignette */
export function makeRoom(seed = 7, { warm = '#f2a65a', cool = '#7a6af0', lights = true } = {}) {
  const r = rng(seed)
  const bokeh = Array.from({ length: 34 }, () => ({
    x: r() * 1080, y: 520 + r() * 900, rad: 14 + r() * 46, a: 0.05 + r() * 0.12,
    c: r() < 0.7 ? warm : r() < 0.6 ? cool : '#f07a8a', sp: 0.2 + r() * 0.6, ph: r() * TAU,
  }))
  const bulbs = Array.from({ length: 11 }, (_, i) => ({ u: (i + 0.5) / 11, ph: r() * TAU }))
  return function drawRoom(x, t, { dim = 1, shift = 0 } = {}) {
    const g = x.createLinearGradient(0, 0, 0, 1920)
    g.addColorStop(0, '#0b0a14'); g.addColorStop(0.42, '#1a1426'); g.addColorStop(0.75, '#141020'); g.addColorStop(1, '#08070d')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    x.save(); x.globalCompositeOperation = 'lighter'
    for (const b of bokeh) {
      const bx = b.x + Math.sin(t * b.sp + b.ph) * 14 - shift * 0.4, by = b.y + Math.cos(t * b.sp * 0.7 + b.ph) * 8
      const a = b.a * dim * (0.75 + 0.25 * Math.sin(t * 1.3 + b.ph))
      const rg = x.createRadialGradient(bx, by, 0, bx, by, b.rad)
      rg.addColorStop(0, rgba(b.c, a)); rg.addColorStop(0.7, rgba(b.c, a * 0.6)); rg.addColorStop(1, rgba(b.c, 0))
      x.fillStyle = rg; x.beginPath(); x.arc(bx, by, b.rad, 0, TAU); x.fill()
    }
    if (lights) {
      const y0 = 585, sag = 70, x0 = -40 - shift * 0.25, x1 = 1120 - shift * 0.25
      x.globalCompositeOperation = 'source-over'
      x.strokeStyle = `rgba(60,48,70,${0.9 * dim})`; x.lineWidth = 3
      x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo((x0 + x1) / 2, y0 + sag * 2, x1, y0); x.stroke()
      x.globalCompositeOperation = 'lighter'
      for (const b of bulbs) {
        const u = b.u, bx = lerp(x0, x1, u), by = y0 + 4 * sag * u * (1 - u) + 10
        const a = dim * (0.75 + 0.25 * Math.sin(t * 2.1 + b.ph))
        const rg = x.createRadialGradient(bx, by, 0, bx, by, 46)
        rg.addColorStop(0, `rgba(255,214,140,${0.55 * a})`); rg.addColorStop(0.25, `rgba(255,170,90,${0.2 * a})`); rg.addColorStop(1, 'rgba(255,150,80,0)')
        x.fillStyle = rg; x.beginPath(); x.arc(bx, by, 46, 0, TAU); x.fill()
        x.fillStyle = `rgba(255,236,200,${0.95 * a})`; x.beginPath(); x.arc(bx, by, 6, 0, TAU); x.fill()
      }
    }
    x.restore()
    // floor glow + vignette
    const f = x.createRadialGradient(540, 1700, 50, 540, 1700, 700)
    f.addColorStop(0, `rgba(120,80,140,${0.16 * dim})`); f.addColorStop(1, 'rgba(0,0,0,0)')
    x.fillStyle = f; x.fillRect(0, 1000, 1080, 920)
    const v = x.createRadialGradient(540, 1000, 500, 540, 1000, 1250)
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.7)')
    x.fillStyle = v; x.fillRect(0, 0, 1080, 1920)
  }
}

// ───────────────────────── characters
/**
 * A person: coloured shoulders, a round black head with a glowing rim, white eyes, a simple mouth.
 * p = { cx, cy (head centre), s (scale), body, rim, hair, expr, look:[dx,dy], blink, a, wave (0..1 arm up), blush }
 * expr: 'flat' | 'smile' | 'grin' | 'o' | 'shock' | 'meh' | 'soft'
 * hair: null | 'tuft' | 'bun' | 'curls' | 'cap' | 'swoop' | 'spikes' | 'long'
 */
export function person(x, p) {
  const { cx, cy, s = 1, body = '#e9824a', rim = GOLD, hair = null, hairCol = '#3a2a22', expr = 'flat', look = [0, 0], blink = 0, a = 1, wave = 0, blush = 0, glow = 1 } = p
  if (a <= 0 || s <= 0) return
  const R = 110 * s
  x.save(); x.globalAlpha = a
  // body (shoulders): a rounded dome under the head, cut off by the frame or a soft fade
  const by = cy + R * 0.92, bw = R * 1.55, bh = R * 1.6
  const bg = x.createLinearGradient(0, by, 0, by + bh)
  bg.addColorStop(0, body); bg.addColorStop(1, rgba(body, 0))
  x.fillStyle = bg
  x.beginPath(); x.moveTo(cx - bw, by + bh); x.bezierCurveTo(cx - bw, by + R * 0.05, cx - R * 0.6, by, cx, by); x.bezierCurveTo(cx + R * 0.6, by, cx + bw, by + R * 0.05, cx + bw, by + bh); x.closePath(); x.fill()
  // waving arm (right side of the screen)
  if (wave > 0) {
    const sx = cx + bw * 0.72, sy = by + R * 0.45
    const ang = -Math.PI / 2 + 0.55 + Math.sin(wave * 0) * 0, sw = Math.sin(p.waveT || 0) * 0.42
    const L = R * 1.15 * clamp(wave * 1.5)
    const hx = sx + Math.cos(ang + sw) * L, hy = sy + Math.sin(ang + sw) * L
    x.strokeStyle = body; x.lineCap = 'round'; x.lineWidth = R * 0.36
    x.beginPath(); x.moveTo(sx, sy); x.lineTo(hx, hy); x.stroke()
    x.fillStyle = body; x.beginPath(); x.arc(hx, hy, R * 0.24, 0, TAU); x.fill()
  }
  // hair behind the head
  if (hair === 'long') {
    x.fillStyle = hairCol
    x.beginPath(); x.moveTo(cx - R * 1.02, cy - R * 0.1); x.quadraticCurveTo(cx - R * 1.28, cy + R * 0.9, cx - R * 0.78, cy + R * 1.25); x.lineTo(cx - R * 0.4, cy + R * 0.9); x.closePath(); x.fill()
    x.beginPath(); x.moveTo(cx + R * 1.02, cy - R * 0.1); x.quadraticCurveTo(cx + R * 1.28, cy + R * 0.9, cx + R * 0.78, cy + R * 1.25); x.lineTo(cx + R * 0.4, cy + R * 0.9); x.closePath(); x.fill()
  }
  if (hair === 'bun') { x.fillStyle = hairCol; x.beginPath(); x.arc(cx + R * 0.1, cy - R * 1.08, R * 0.38, 0, TAU); x.fill() }
  // head with rim glow
  x.save()
  x.shadowColor = rgba(rim, 0.85 * glow); x.shadowBlur = 30 * s * glow
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill()
  x.restore()
  x.strokeStyle = rgba(rim, 0.95); x.lineWidth = Math.max(2, 5 * s)
  x.beginPath(); x.arc(cx, cy, R - 2 * s, 0, TAU); x.stroke()
  // hair on top
  x.fillStyle = hairCol; x.strokeStyle = hairCol; x.lineCap = 'round'
  if (hair === 'tuft') { x.lineWidth = 16 * s; x.beginPath(); x.moveTo(cx - R * 0.15, cy - R * 0.98); x.quadraticCurveTo(cx - R * 0.05, cy - R * 1.45, cx + R * 0.3, cy - R * 1.3); x.stroke() }
  // swoop / long: a cap of hair that follows the head (clipped to a slightly larger circle), with a side part
  if (hair === 'swoop' || hair === 'long') {
    x.save(); x.beginPath(); x.arc(cx, cy, R * 1.04, 0, TAU); x.clip()
    x.beginPath()
    if (hair === 'swoop') { x.moveTo(cx - R * 1.1, cy - R * 0.2); x.quadraticCurveTo(cx - R * 0.2, cy - R * 0.95, cx + R * 1.1, cy - R * 0.45); x.lineTo(cx + R * 1.1, cy - R * 1.2); x.lineTo(cx - R * 1.1, cy - R * 1.2) }
    else { x.moveTo(cx - R * 1.1, cy + R * 0.1); x.quadraticCurveTo(cx - R * 0.75, cy - R * 0.55, cx - R * 0.1, cy - R * 0.62); x.quadraticCurveTo(cx + R * 0.75, cy - R * 0.55, cx + R * 1.1, cy + R * 0.1); x.lineTo(cx + R * 1.1, cy - R * 1.2); x.lineTo(cx - R * 1.1, cy - R * 1.2) }
    x.closePath(); x.fill(); x.restore()
    x.strokeStyle = rgba(rim, 0.95); x.lineWidth = Math.max(2, 5 * s); x.beginPath(); x.arc(cx, cy, R - 2 * s, 0, TAU); x.stroke(); x.strokeStyle = hairCol
  }
  if (hair === 'curls') for (let i = 0; i < 7; i++) { const aa = Math.PI * (1.08 + i * 0.14); x.beginPath(); x.arc(cx + Math.cos(aa) * R * 0.95, cy + Math.sin(aa) * R * 0.95, R * 0.24, 0, TAU); x.fill() }
  if (hair === 'spikes') { x.beginPath(); for (let i = 0; i < 5; i++) { const ux = cx - R * 0.7 + i * R * 0.35; x.moveTo(ux - R * 0.18, cy - R * 0.8); x.lineTo(ux, cy - R * 1.3 - (i % 2) * R * 0.12); x.lineTo(ux + R * 0.18, cy - R * 0.8) } x.fill() }
  if (hair === 'cap') { x.beginPath(); x.arc(cx, cy - R * 0.2, R * 1.0, Math.PI * 1.05, Math.PI * 1.95); x.closePath(); x.fill(); x.beginPath(); x.ellipse(cx + R * 0.7, cy - R * 0.5, R * 0.6, R * 0.13, 0.08, 0, TAU); x.fill() }
  // face
  const [lx, ly] = look, ex = R * 0.34, ey = -R * 0.08
  const open = 1 - clamp(blink)
  x.fillStyle = '#fff'
  if (expr === 'shock') {
    for (const sx of [-1, 1]) {
      x.beginPath(); x.arc(cx + sx * ex + lx * s, cy + ey + ly * s, R * 0.19, 0, TAU); x.fill()
      x.fillStyle = INK; x.beginPath(); x.arc(cx + sx * ex + lx * s * 1.6, cy + ey + ly * s * 1.6, R * 0.08, 0, TAU); x.fill(); x.fillStyle = '#fff'
    }
  } else if (expr === 'soft') {
    x.strokeStyle = '#fff'; x.lineWidth = 8 * s; x.lineCap = 'round'
    for (const sx of [-1, 1]) { x.beginPath(); x.arc(cx + sx * ex + lx * s, cy + ey + ly * s + R * 0.05, R * 0.11, Math.PI * 1.1, Math.PI * 1.9); x.stroke() }
  } else {
    const rh = expr === 'meh' ? R * 0.07 : R * 0.15 * open + 1
    for (const sx of [-1, 1]) { x.beginPath(); x.ellipse(cx + sx * ex + lx * s, cy + ey + ly * s, R * 0.115, Math.max(1.5, rh), 0, 0, TAU); x.fill() }
  }
  x.strokeStyle = '#fff'; x.fillStyle = '#fff'; x.lineWidth = 7 * s; x.lineCap = 'round'
  const mx = cx + lx * s * 0.6, my = cy + R * 0.42 + ly * s * 0.4
  if (expr === 'flat' || expr === 'meh') { x.beginPath(); x.moveTo(mx - R * 0.18, my); x.lineTo(mx + R * 0.18, my); x.stroke() }
  if (expr === 'smile' || expr === 'soft') { x.beginPath(); x.arc(mx, my - R * 0.18, R * 0.24, Math.PI * 0.2, Math.PI * 0.8); x.stroke() }
  if (expr === 'grin') { x.beginPath(); x.moveTo(mx - R * 0.3, my - R * 0.06); x.quadraticCurveTo(mx, my + R * 0.34, mx + R * 0.3, my - R * 0.06); x.closePath(); x.fill() }
  if (expr === 'o' || expr === 'shock') { x.beginPath(); x.ellipse(mx, my + R * 0.02, R * 0.09, R * 0.12, 0, 0, TAU); x.stroke() }
  if (blush > 0) {
    x.fillStyle = rgba('#ff6f9a', 0.55 * blush)
    for (const sx of [-1, 1]) { x.beginPath(); x.ellipse(cx + sx * R * 0.56 + lx * s, cy + R * 0.2, R * 0.15, R * 0.08, 0, 0, TAU); x.fill() }
  }
  x.restore()
}

// ───────────────────────── number bubble
/** a speech-bubble pill over a head: sign glyph + a number (or text). tip at (cx, tipY). k = pop scale. */
export function bubble(x, { cx, tipY, glyph = null, text, color = GOLD, k = 1, a = 1, size = 64, pulse = 0, dark = 0.86 }) {
  if (k <= 0 || a <= 0) return
  x.save()
  x.translate(cx, tipY); x.scale(k, k); x.translate(-cx, -tipY)
  x.globalAlpha = a
  x.font = `900 ${size}px ${INTER}`
  const tw = x.measureText(text).width, gw = glyph ? size * 0.95 : 0
  const w = tw + gw + size * 0.9, h = size * 1.42, r = h / 2
  const bx = cx - w / 2, by = tipY - 22 - h
  // glow
  x.shadowColor = rgba(color, 0.9); x.shadowBlur = 26 + 30 * pulse
  x.fillStyle = `rgba(10,9,16,${dark})`
  x.beginPath(); x.roundRect(bx, by, w, h, r); x.fill()
  x.beginPath(); x.moveTo(cx - 16, by + h - 1); x.lineTo(cx, tipY); x.lineTo(cx + 16, by + h - 1); x.closePath(); x.fill()
  x.shadowBlur = 0
  x.strokeStyle = color; x.lineWidth = 5
  x.beginPath(); x.roundRect(bx, by, w, h, r); x.stroke()
  // cover the stroke where the tail joins, then stroke the tail
  x.fillStyle = `rgba(10,9,16,1)`; x.fillRect(cx - 13, by + h - 4, 26, 7)
  x.beginPath(); x.moveTo(cx - 16, by + h); x.lineTo(cx, tipY); x.lineTo(cx + 16, by + h); x.stroke()
  x.fillStyle = color; x.textBaseline = 'middle'; x.textAlign = 'left'
  let tx = bx + size * 0.45
  if (glyph) { x.font = `${Math.round(size * 0.82)}px ${GLYPH_FONT}`; x.fillText(glyph + VS, tx, by + h / 2 + 2); tx += gw }
  x.font = `900 ${size}px ${INTER}`
  if (pulse > 0) { x.shadowColor = color; x.shadowBlur = 20 * pulse }
  x.fillText(text, tx, by + h / 2 + 3)
  x.restore()
}
/** a counter that runs from 0 to n with ease-out (integers), or scrambles if n is null */
export const countUp = (t, t0, n, d = 0.7) => n == null ? String(Math.floor(10 + 89 * Math.abs(Math.sin(t * 37.1)))) : String(Math.round(n * ease.outCubic(prog(t, t0, t0 + d))))

// ───────────────────────── headline (stays on screen)
/**
 * Gold "What if" headline in the format's stacked style: small cream lines + big gold lines, centred.
 * lines = [{ text, big }]; pops in line by line from t0.
 */
export function makeHeadline(lines, { top = 150, small = 46, big = 92, gap = 14, color = GOLD } = {}) {
  return function drawHeadline(x, t, t0 = 0.08, a = 1) {
    if (a <= 0 || t < t0) return
    let y = top
    lines.forEach((ln, i) => {
      const sz = ln.big ? big : small
      y += sz * 0.92
      const k = pop01(t, t0 + i * 0.12, 0.34, 2.0)
      if (k <= 0) { y += gap; return }
      x.save()
      x.translate(540, y - sz * 0.35); x.scale(k, k); x.translate(-540, -(y - sz * 0.35))
      x.globalAlpha = a * clamp(k * 2)
      x.font = `900 ${sz}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
      const txt = ln.text.toUpperCase()
      let fs = sz
      while (x.measureText(txt).width > 960 && fs > 30) { fs -= 2; x.font = `900 ${fs}px ${INTER}` }
      x.lineJoin = 'round'
      x.strokeStyle = 'rgba(8,6,14,0.95)'; x.lineWidth = ln.big ? 14 : 10; x.strokeText(txt, 540, y)
      if (ln.big) {
        const g = x.createLinearGradient(0, y - fs, 0, y)
        g.addColorStop(0, '#ffe7a3'); g.addColorStop(0.55, ln.color || color); g.addColorStop(1, '#d9962c')
        x.shadowColor = rgba(ln.color || color, 0.75); x.shadowBlur = 28
        x.fillStyle = g
      } else { x.fillStyle = CREAM; x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 8 }
      x.fillText(txt, 540, y)
      x.restore()
      y += gap
    })
  }
}

// ───────────────────────── captions (word by word, low on the screen)
/**
 * caps = [{ t0, t1, text }]; `*word*` = gold highlight, `|` = line break. Words pop in at `rate` words/s.
 */
export function makeCaptions(caps, { y = 1600, size = 62, rate = 7, hl = GOLD } = {}) {
  return function drawCaptions(x, t) {
    for (const c of caps) {
      if (t < c.t0 || t > c.t1 + 0.2) continue
      const out = 1 - prog(t, c.t1, c.t1 + 0.18)
      const lines = c.text.split('|').map(s => s.trim().split(' ').filter(Boolean))
      x.save()
      x.font = `800 ${size}px ${INTER}`; x.textBaseline = 'alphabetic'; x.textAlign = 'left'; x.lineJoin = 'round'
      let n = 0
      lines.forEach((ws, li) => {
        const words = ws.map(w => ({ w: w.replace(/\*/g, ''), acc: w.includes('*') }))
        const sp = x.measureText(' ').width
        const total = words.reduce((s, w) => s + x.measureText(w.w).width, 0) + sp * (words.length - 1)
        let wx = 540 - total / 2
        const ly = y + li * size * 1.18
        for (const w of words) {
          const wt = c.t0 + n++ / rate
          const p = prog(t, wt, wt + 0.22)
          const ww = x.measureText(w.w).width
          if (p > 0) {
            const k = 0.7 + 0.3 * easeOutBack(p, 2.6)
            x.save()
            x.globalAlpha = clamp(p * 3) * out
            x.translate(wx + ww / 2, ly - size * 0.3); x.scale(k, k); x.translate(-(wx + ww / 2), -(ly - size * 0.3))
            x.strokeStyle = 'rgba(6,5,10,0.95)'; x.lineWidth = 12; x.strokeText(w.w, wx, ly)
            x.fillStyle = w.acc ? (c.hl || hl) : '#ffffff'
            if (w.acc) { x.shadowColor = rgba(c.hl || hl, 0.8); x.shadowBlur = 18 }
            x.fillText(w.w, wx, ly)
            x.restore()
          }
          wx += ww + sp
        }
      })
      x.restore()
    }
  }
}
/** caption word times (for pop cues) */
export const captionWordTimes = (caps, rate = 7) => caps.flatMap(c => c.text.replace(/\|/g, ' ').split(' ').filter(Boolean).map((_, i) => c.t0 + i / rate))

// ───────────────────────── fx
export function makeBurst(seed, n = 10, dist = 120) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * TAU + r() * 0.5, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
export function drawBurst(x, parts, px, py, t, t0, color, dur = 0.8) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, q.kind === 3 ? '#fff3e0' : color)
  }
  x.restore()
}
/** a glowing planet orb with a glyph */
export function orb(x, px, py, r, color, a = 1, glyph = null) {
  if (a <= 0 || r <= 0.5) return
  x.save()
  x.globalCompositeOperation = 'lighter'
  const hr = r * 3.2, g = x.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.15 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, hr, 0, TAU); x.fill()
  x.globalCompositeOperation = 'source-over'; x.globalAlpha = a
  const s = x.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.45, color); s.addColorStop(1, rgba(color, 0.85))
  x.fillStyle = s; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill()
  if (glyph) { x.fillStyle = 'rgba(60,10,40,0.85)'; x.font = `${Math.round(r * 1.05)}px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(glyph + VS, px, py + r * 0.05) }
  x.restore()
}
/** a glowing dashed link between two points, drawn on from a→b by p */
export function link(x, ax, ay, bx, by, p, color, t = 0, w = 6) {
  if (p <= 0) return
  x.save()
  x.strokeStyle = color; x.lineWidth = w; x.lineCap = 'round'; x.setLineDash([2, 18]); x.lineDashOffset = -t * 60
  x.shadowColor = color; x.shadowBlur = 18
  x.beginPath(); x.moveTo(ax, ay); x.lineTo(lerp(ax, bx, p), lerp(ay, by, p)); x.stroke()
  x.restore()
}
/** "PART 2" style end tag */
export function partTag(x, t, t0, label = 'PART 2', sub = 'coming up') {
  const k = pop01(t, t0, 0.45, 2.4)
  if (k <= 0) return
  x.save()
  x.translate(540, 1000); x.scale(k, k); x.translate(-540, -1000)
  x.textAlign = 'center'; x.lineJoin = 'round'
  x.font = `900 150px ${INTER}`
  x.strokeStyle = 'rgba(8,6,14,0.95)'; x.lineWidth = 18; x.strokeText(label, 540, 1040)
  const g = x.createLinearGradient(0, 900, 0, 1040); g.addColorStop(0, '#ffe7a3'); g.addColorStop(0.6, GOLD); g.addColorStop(1, '#d9962c')
  x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 40; x.fillStyle = g; x.fillText(label, 540, 1040)
  if (sub) { x.shadowBlur = 0; x.font = `800 44px ${INTER}`; x.fillStyle = CREAM; x.fillText(sub.toUpperCase(), 540, 1110) }
  x.restore()
}
