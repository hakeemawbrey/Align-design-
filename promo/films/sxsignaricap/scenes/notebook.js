// notebook — the SIGN × SIGN field-guide look (Star Talk Shows, show 6), shared by sxsignscolib, sxsignaricap and
// sxsignvirsag. Each film keeps an identical copy in its own folder (the brief: never import from another film).
// A spiral-bound graph-paper notebook floats over the nebula; specimens are sketched with pencil circles, arrows and
// handwritten labels; three numbered TIPS rubber-stamp onto the page; a PUSH / PULL / ALIGN meter wobbles along the
// bottom strip of the page all film long and settles at the end. Pure functions of their arguments (and t); nothing
// touches `document` at module top level except showBug (called in build).
//
//   PAGE                                  the page rectangle (screen px) — specimens, props and the meter live on it
//   drawNotebook(ctx, t, { k, entry })    the notebook (k = open 0…1: it slaps up from below); entry = 'No. 1' etc.
//   hand(ctx, text, x, y, { size, color, rot, align, k })   a handwritten label (EB Garamond italic ink), k = write-on
//   sketchCircle(ctx, cx, cy, rx, ry, k, seed)   a wobbly pencil specimen circle, drawn on over k
//   sketchArrow(ctx, ax, ay, bx, by, k)          a pencil arrow, drawn on over k
//   drawMeter(ctx, t, p, { k, smoke, stamp, label })   the PUSH | PULL | ALIGN meter; p = needle 0…1 (0.17 push,
//                                         0.5 pull, 0.83 align); smoke 0…1 (thrashing); stamp 0…1 (the ALIGN ✓ ring)
//   needleWobble(t, base, amp, seed)      a jittery needle position around base
//   tipStamp(ctx, t, n, at, { x, y, out, color, twist })   the "TIP n" rubber stamp slamming onto the page
//   showBug(root, ep)                     the show bug, top-left 56 px: "SIGN × SIGN" (Inter 800 small caps) + " · EP n"
//   bmp / drawHearts / drawTears / eyesOf / drawSweat / sparkBurst / drawSmoke / drawZzz   small shared effects
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { READING, easeOutBack } from '../../wheel.js'

export const PAGE = { x0: 70, y0: 440, x1: 1010, y1: 1372 }
export const INK = '#2b2550', PENCIL = '#4a4470', RED = '#c8344c', GOLD = '#f2c75c', BONE = '#efe6d6'
const SERIF = "'EB Garamond', Georgia, serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const G = 36, HALF = 18
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ─────────────────────────────────────────────── the notebook
export function drawNotebook(ctx, t, { k = 1, entry = 'No. 1', title = 'FIELD GUIDE' } = {}) {
  if (k <= 0) return
  const { x0, y0, x1, y1 } = PAGE, w = x1 - x0, h = y1 - y0
  const e = easeOutBack(clamp(k), 1.5)
  ctx.save()
  ctx.translate(540, y1 + (1 - clamp(k)) * 700); ctx.rotate(-0.012 + (1 - clamp(k)) * 0.12); ctx.scale(lerp(0.8, 1, e), e); ctx.translate(-540, -y1)
  ctx.globalAlpha *= clamp(k * 2)
  // drop shadow + the cover peeking out
  ctx.fillStyle = 'rgba(4,2,12,0.55)'; ctx.fillRect(x0 + 14, y0 + 22, w, h)
  ctx.fillStyle = '#3b2758'; ctx.fillRect(x0 - 10, y0 - 6, w + 22, h + 20)
  ctx.fillStyle = '#563a80'; ctx.fillRect(x0 - 10, y0 - 6, w + 22, 6)
  // a second page edge underneath
  ctx.fillStyle = '#e2d6bb'; ctx.fillRect(x0 + 4, y0 + 6, w, h)
  // the page
  ctx.fillStyle = '#f6edd6'; ctx.fillRect(x0, y0, w, h)
  // graph paper
  ctx.fillStyle = 'rgba(88,122,178,0.16)'
  for (let gx = x0 + 34; gx < x1; gx += 38) ctx.fillRect(gx, y0 + 64, 2, h - 64)
  for (let gy = y0 + 64; gy < y1; gy += 38) ctx.fillRect(x0, gy, w, 2)
  // the red margin + the header rule
  ctx.fillStyle = 'rgba(214,72,92,0.45)'; ctx.fillRect(x0 + 72, y0 + 64, 3, h - 64)
  ctx.fillStyle = 'rgba(88,122,178,0.45)'; ctx.fillRect(x0, y0 + 62, w, 3)
  // spiral rings along the top edge
  for (let rx = x0 + 40; rx < x1 - 20; rx += 56) {
    ctx.fillStyle = '#1b1236'; ctx.fillRect(rx + 4, y0 + 12, 14, 14)
    ctx.fillStyle = '#b9b4c8'; ctx.fillRect(rx, y0 - 14, 6, 30); ctx.fillRect(rx + 6, y0 - 20, 12, 6); ctx.fillRect(rx + 18, y0 - 14, 6, 14)
    ctx.fillStyle = '#ece8f4'; ctx.fillRect(rx, y0 - 14, 3, 22)
  }
  // a dog-eared corner
  ctx.fillStyle = '#05040c'; ctx.beginPath(); ctx.moveTo(x1, y1 - 46); ctx.lineTo(x1, y1); ctx.lineTo(x1 - 46, y1); ctx.fill()
  ctx.fillStyle = '#d9cba9'; ctx.beginPath(); ctx.moveTo(x1, y1 - 46); ctx.lineTo(x1 - 46, y1 - 46); ctx.lineTo(x1 - 46, y1); ctx.fill()
  // header: the guide's title + entry
  ctx.font = `700 24px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = rgba(INK, 0.75)
  ctx.fillText(`${title} · SIGN × SIGN`, x0 + 92, y0 + 40)
  ctx.font = `italic 600 34px ${SERIF}`; ctx.textAlign = 'right'; ctx.fillStyle = INK
  ctx.fillText(`entry ${entry}`, x1 - 30, y0 + 38)
  ctx.restore()
}

/** a handwritten label; k = write-on (a clip sweeping left → right) */
export function hand(ctx, text, x, y, { size = 40, color = INK, rot = 0, align = 'center', k = 1, weight = 600, alpha = 1 } = {}) {
  if (k <= 0 || alpha <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha *= alpha
  ctx.font = `italic ${weight} ${size}px ${SERIF}`; ctx.textAlign = align; ctx.textBaseline = 'middle'
  const tw = ctx.measureText(text).width, left = align === 'center' ? -tw / 2 : align === 'right' ? -tw : 0
  if (k < 1) { ctx.beginPath(); ctx.rect(left - 10, -size, (tw + 20) * k, size * 2); ctx.clip() }
  ctx.fillStyle = color; ctx.fillText(text, 0, 0)
  ctx.restore()
}

/** a wobbly pencil circle (1.1 turns), drawn on over k */
export function sketchCircle(ctx, cx, cy, rx, ry, k, seed = 1, { color = PENCIL, width = 4, alpha = 0.8 } = {}) {
  if (k <= 0) return
  const r = rng(seed * 313), ph = [r() * 6, r() * 6, r() * 6], a0 = -2 + r()
  ctx.save(); ctx.strokeStyle = rgba(color, alpha); ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath()
  const N = 60, end = Math.round(N * clamp(k))
  for (let i = 0; i <= end; i++) {
    const u = i / N, a = a0 + u * Math.PI * 2 * 1.1
    const wob = 1 + 0.035 * Math.sin(a * 3 + ph[0]) + 0.02 * Math.sin(a * 7 + ph[1]) + u * 0.05
    const px = cx + Math.cos(a) * rx * wob, py = cy + Math.sin(a) * ry * wob
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
  }
  ctx.stroke(); ctx.restore()
}

/** a pencil arrow from a → b, drawn on over k (a slight hand-drawn bow) */
export function sketchArrow(ctx, ax, ay, bx, by, k, { color = PENCIL, width = 4, bow = 0.12, alpha = 0.85 } = {}) {
  if (k <= 0) return
  const mx = (ax + bx) / 2 - (by - ay) * bow, my = (ay + by) / 2 + (bx - ax) * bow
  const q = u => { const v = 1 - u; return [v * v * ax + 2 * v * u * mx + u * u * bx, v * v * ay + 2 * v * u * my + u * u * by] }
  ctx.save(); ctx.strokeStyle = rgba(color, alpha); ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath(); ctx.moveTo(ax, ay)
  const kk = clamp(k), N = 24
  for (let i = 1; i <= Math.round(N * kk); i++) ctx.lineTo(...q(i / N))
  ctx.stroke()
  if (kk >= 0.98) {
    const [px, py] = q(0.9), ang = Math.atan2(by - py, bx - px), L = 22
    ctx.beginPath(); ctx.moveTo(bx - Math.cos(ang - 0.5) * L, by - Math.sin(ang - 0.5) * L); ctx.lineTo(bx, by); ctx.lineTo(bx - Math.cos(ang + 0.5) * L, by - Math.sin(ang + 0.5) * L); ctx.stroke()
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the PUSH | PULL | ALIGN meter (bottom strip of the page)
export const METER = { x: 540, y: 1300, w: 780, h: 40 }
export const ZONE = { push: 1 / 6, pull: 0.5, align: 5 / 6 }
/** jittery needle around base: amp 0…0.5 */
export function needleWobble(t, base, amp, seed = 1) {
  return clamp(base + amp * (0.6 * Math.sin(t * 9.3 + seed) + 0.3 * Math.sin(t * 23.1 + seed * 2) + 0.25 * Math.sin(t * 4.1 + seed * 3)), 0.02, 0.98)
}
export function drawMeter(ctx, t, p, { k = 1, smoke = 0, stamp = 0, label = null } = {}) {
  if (k <= 0.01) return
  const { x, y, w, h } = METER, l = x - w / 2
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.translate(-x, -y); ctx.globalAlpha *= clamp(k * 1.5)
  // caption (hand) + the zone labels
  if (label) hand(ctx, label.toLowerCase(), l, y - 64, { size: 30, align: 'left', color: rgba(INK, 0.8) })
  const zones = [['PUSH', READING.push], ['PULL', READING.pull], ['ALIGN', READING.align]]
  // ink frame
  ctx.fillStyle = INK; ctx.fillRect(l - 6, y - h / 2 - 6, w + 12, h + 12)
  zones.forEach(([name, col], i) => {
    const zx = l + (w / 3) * i
    ctx.fillStyle = col; ctx.fillRect(zx, y - h / 2, w / 3, h)
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(zx, y - h / 2, w / 3, 6)
    if (i) { ctx.fillStyle = INK; ctx.fillRect(zx - 3, y - h / 2, 6, h) }
    const lit = Math.abs(p - (i + 0.5) / 3) < 1 / 6
    ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = INK; ctx.globalAlpha = (lit ? 1 : 0.55) * clamp(k * 1.5)
    ctx.fillText(name, zx + w / 6, y + 1)
    ctx.globalAlpha = clamp(k * 1.5)
  })
  // the needle: a pixel arrow riding the top of the bar
  const nx = Math.round(l + w * clamp(p)), P = 6
  ctx.fillStyle = INK
  for (let j = 0; j < 5; j++) ctx.fillRect(nx - (5 - j) * P / 2 - P / 2, y - h / 2 - 50 + j * P, (5 - j) * P + P, P)
  ctx.fillRect(nx - 3, y - h / 2 - 22, 6, h + 28)
  ctx.fillStyle = '#ff5c6e'; ctx.fillRect(nx - 9, y - h / 2 - 50, 18, 6)
  ctx.restore()
  // smoke puffs off the needle when it thrashes
  if (smoke > 0) drawSmoke(ctx, t, nx, y - h / 2 - 56, smoke)
  // the ALIGN ✓ ring stamped around the align zone
  if (stamp > 0) {
    const s = lerp(2.2, 1, ease.inQuad(clamp(stamp))), cx = l + w * ZONE.align, cy = y
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.08); ctx.scale(s, s); ctx.globalAlpha *= clamp(stamp * 1.4) * k
    ctx.strokeStyle = RED; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(0, 0, w / 6 + 26, h / 2 + 24, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, w / 6 + 16, h / 2 + 15, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.restore()
  }
}

/** grey pixel smoke puffs rising from (x, y) */
export function drawSmoke(ctx, t, x, y, amount = 1) {
  for (let i = 0; i < 7; i++) {
    const ph = (t * 1.1 + i / 7) % 1, a = Math.sin(Math.PI * ph) * 0.75 * amount
    if (a <= 0.02) continue
    const s = Math.round(10 + ph * 22), sx = x + Math.sin(ph * 5 + i * 2) * 26 + (i % 2 ? 10 : -10), sy = y - ph * 150
    ctx.fillStyle = rgba(i % 3 ? '#8d87a3' : '#b9b4c8', a)
    ctx.fillRect(Math.round(sx - s / 2), Math.round(sy - s / 2), s, s)
    ctx.fillRect(Math.round(sx - s / 2 + s * 0.6), Math.round(sy - s * 0.9), Math.round(s * 0.7), Math.round(s * 0.7))
  }
}

// ─────────────────────────────────────────────── the TIP stamp
/** "TIP n" rubber stamp slamming onto the page at `at` (scale 2.4 → 1, a dust ring); out = 1 → 0 */
export function tipStamp(ctx, t, n, at, { x = 250, y = 540, out = 1, color = RED, twist = false } = {}) {
  if (t < at - 0.12 || out <= 0) return
  const sp = prog(t, at - 0.12, at)
  const s = lerp(2.4, 1, ease.inQuad(sp)) * (1 + 0.08 * Math.exp(-Math.max(0, t - at) * 12) * Math.sin(Math.max(0, t - at) * 40))
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.1); ctx.scale(s, s); ctx.globalAlpha *= clamp(sp * 1.3) * out
  const w = twist ? 300 : 230, h = 96
  ctx.strokeStyle = color; ctx.lineWidth = 8; ctx.strokeRect(-w / 2, -h / 2, w, h)
  ctx.lineWidth = 3; ctx.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20)
  ctx.font = `800 58px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = color
  ctx.fillText(twist ? `TIP ${n} ↻` : `TIP ${n}`, 0, 4)
  // ink speckle gaps (a worn stamp)
  ctx.fillStyle = '#f6edd6'
  const r = rng(n * 71)
  for (let i = 0; i < 16; i++) ctx.fillRect(Math.round(-w / 2 + r() * w), Math.round(-h / 2 + r() * h), 4, 4)
  ctx.restore()
  // dust ring on the slam
  const d = t - at
  if (d > 0 && d < 0.5) for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2, rr = 120 + d * 260
    ctx.fillStyle = rgba('#8d87a3', 0.6 * (1 - d / 0.5)); ctx.fillRect(Math.round(x + Math.cos(a) * rr * 1.3), Math.round(y + Math.sin(a) * rr * 0.6), 10, 10)
  }
}

// ─────────────────────────────────────────────── the show bug (DOM, top-left, 56 px from the edges)
export function showBug(root, ep) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.16em',
    color: GOLD, textShadow: '0 2px 10px rgba(6,4,18,0.85)', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 5 }, root)
  b.innerHTML = `sign × sign<span style="color:rgba(255,255,255,0.6);letter-spacing:0.1em"> · ep ${ep}</span>`
  return b
}

// ─────────────────────────────────────────────── small shared effects (from the Star Talk props)
export const BM = s => s.trim().split(/\s+/)
export function bmp(ctx, rows, x, y, px, pal, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  rows.forEach((row, j) => [...row].forEach((ch, i) => { const c = pal[ch]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } }))
  ctx.restore()
}
const HEART = BM(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
export function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 140, life = 1.6, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const k = (t - t0 - i * 0.18) / life
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx - 3.5 * px, y - k * 260, px, { X: cols[i % cols.length] }, alpha * Math.sin(Math.PI * k))
  }
}
/** happy/sad tears springing from the eyes */
export function drawTears(ctx, t, ex, ey, dx, px, { amount = 1, seed = 1, fountain = true } = {}) {
  if (amount <= 0) return
  const r = rng(seed * 991), N = fountain ? 7 : 4
  for (const side of [-1, 1]) for (let k = 0; k < N; k++) {
    const ph = ((t * (fountain ? 1.5 : 0.8)) + k / N + r() * 0.05) % 1
    const vx = fountain ? (60 + 30 * ((k * 7) % 3)) : 10, vy = fountain ? -120 : 0
    const gx = ex + side * dx + side * vx * ph * px / 8, gy = ey + px * 2 + vy * ph * px / 8 + 380 * ph * ph * px / 8
    ctx.save(); ctx.globalAlpha *= amount * (1 - ph * 0.7)
    ctx.fillStyle = '#5fc4f0'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), px, px * 2)
    ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), Math.ceil(px / 2), Math.ceil(px / 2))
    ctx.restore()
  }
}
/** eye geometry of a drawStarChar result */
export function eyesOf(r) { const cell = r.size / G; return { ex: r.x, ey: r.y + (19.2 - HALF) * cell, dx: 4.6 * cell, px: Math.max(4, Math.round(cell)) } }
const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
export function drawSweat(ctx, t, x, y, px, alpha = 1) {
  const ph = (t * 1.2) % 1
  bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#5fc4f0', W: '#ffffff' }, alpha * (1 - ph * 0.6))
}
export function sparkBurst(ctx, t, cx, cy, t0, { n = 12, R = 200, size = 28, seed = 1, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'], life = 0.8 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed, rr = R * (0.45 + 0.75 * p) * (i % 2 ? 0.8 : 1)
    drawPixelStar(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, size * (1 - 0.45 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  ctx.restore()
}
/** ink z's (for a star asleep on paper; startalk's z's are bone, which vanish on the page) */
export function drawZzz(ctx, t, x, y, px = 7, color = INK, alpha = 1) {
  const Z = ['XXX', '..X', '.X.', 'X..', 'XXX']
  for (let k = 0; k < 3; k++) {
    const ph = ((t * 0.5 + k / 3) % 1), zc = Math.round(px * (0.8 + 0.7 * ph))
    bmp(ctx, Z, x + ph * 60 + Math.sin(ph * 6 + k) * 8, y - ph * 140, zc, { X: color }, alpha * Math.sin(Math.PI * ph))
  }
}
