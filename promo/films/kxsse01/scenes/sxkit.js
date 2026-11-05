// sxkit.js — SIGN × SIGN: EXTENDED (Month 2 boost, batch m46: kxsse01–kxsse08, 90 s each). One shared film engine:
// each episode's scenes/index.js passes a config to makeFilm() and gets back { DURATION, SCENES, CUES, MUSIC, T }.
// It is nsse01/kit.js (Sign × Sign, Volume 2: the field-guide notebook, fig. 1 / fig. 2 specimens, the meter, the
// rubber-stamped tips and the sketched PROPS) made long and re-cut for the Month 2 rules:
//   · NO end card, NO card frame, no logo, no CTA, and the word "Align" never on screen: the meter reads
//     PUSH · PULL · IN SYNC. DURATION = cfg.duration. HARD CUT: the last line lands and holds; no fade.
//   · FRAME 0 (hookkit.js, read-only): both stars mid-chaos on the page, the hook headline already slammed, mid whip
//     zoom + shake; at 0.7 s a record scratch + freeze frame with cfg.premise and a "caught" circle on cfg.caught.
//   · Five chapters after the cold open (tips[0…4]: how they meet · where they clash · tip for A · tip for B · how they
//     make it work ↻), each with a stamp, a head line and one sketched prop; then 6 · THE VERDICT: a red verdict stamp
//     (cfg.verdict) and the last line. Chapter stickers + a "wait for the verdict" promise from the kit.
//   · Pisces cries in every film: fig. 3 in the page corner, or as a specimen when it is in the pair.
// Pure f(t): nothing here touches `document` at module top level.
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, easeOutBack } from '../../wheel.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, caught, caughtCues, screenShake, shakeCues, chapter, chapterCues } from '../../hookkit.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const INK = '#2b2550', PENCIL = '#4a4470', RED = '#c8344c', GOLD = '#f2c75c', BONE = '#efe6d6', PAPER = '#f6edd6'
const SERIF = "'EB Garamond', Georgia, serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const CPS = 30
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const lighten = (hex, k) => { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v + (255 - v) * k)); return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('') }
const NAMES = { aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces' }
const ELEM = { aries: 'fire', taurus: 'earth', gemini: 'air', cancer: 'water', leo: 'fire', virgo: 'earth', libra: 'air', scorpio: 'water', sagittarius: 'fire', capricorn: 'earth', aquarius: 'air', pisces: 'water' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, a, b) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const r3 = v => +v.toFixed(3)

// ═════════════════════════════════════════════ the notebook look (from Vol. 1, kept as our own copy)
export const PAGE = { x0: 70, y0: 440, x1: 1010, y1: 1372 }
function drawNotebook(ctx, { header }) {
  const { x0, y0, x1, y1 } = PAGE, w = x1 - x0, h = y1 - y0
  ctx.save(); ctx.translate(540, y1); ctx.rotate(-0.012); ctx.translate(-540, -y1)
  ctx.fillStyle = 'rgba(4,2,12,0.55)'; ctx.fillRect(x0 + 14, y0 + 22, w, h)
  ctx.fillStyle = '#2f4a5e'; ctx.fillRect(x0 - 10, y0 - 6, w + 22, h + 20)          // Vol. 2: a winter-blue cover
  ctx.fillStyle = '#46708c'; ctx.fillRect(x0 - 10, y0 - 6, w + 22, 6)
  ctx.fillStyle = '#e2d6bb'; ctx.fillRect(x0 + 4, y0 + 6, w, h)
  ctx.fillStyle = PAPER; ctx.fillRect(x0, y0, w, h)
  ctx.fillStyle = 'rgba(88,122,178,0.16)'
  for (let gx = x0 + 34; gx < x1; gx += 38) ctx.fillRect(gx, y0 + 64, 2, h - 64)
  for (let gy = y0 + 64; gy < y1; gy += 38) ctx.fillRect(x0, gy, w, 2)
  ctx.fillStyle = 'rgba(214,72,92,0.45)'; ctx.fillRect(x0 + 72, y0 + 64, 3, h - 64)
  ctx.fillStyle = 'rgba(88,122,178,0.45)'; ctx.fillRect(x0, y0 + 62, w, 3)
  for (let rx = x0 + 40; rx < x1 - 20; rx += 56) {
    ctx.fillStyle = '#1b1236'; ctx.fillRect(rx + 4, y0 + 12, 14, 14)
    ctx.fillStyle = '#b9b4c8'; ctx.fillRect(rx, y0 - 14, 6, 30); ctx.fillRect(rx + 6, y0 - 20, 12, 6); ctx.fillRect(rx + 18, y0 - 14, 6, 14)
    ctx.fillStyle = '#ece8f4'; ctx.fillRect(rx, y0 - 14, 3, 22)
  }
  ctx.fillStyle = '#05040c'; ctx.beginPath(); ctx.moveTo(x1, y1 - 46); ctx.lineTo(x1, y1); ctx.lineTo(x1 - 46, y1); ctx.fill()
  ctx.fillStyle = '#d9cba9'; ctx.beginPath(); ctx.moveTo(x1, y1 - 46); ctx.lineTo(x1 - 46, y1 - 46); ctx.lineTo(x1 - 46, y1); ctx.fill()
  ctx.font = `700 24px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = rgba(INK, 0.75)
  ctx.fillText('FIELD GUIDE · WINTER', x0 + 92, y0 + 40)
  ctx.font = `italic 600 34px ${SERIF}`; ctx.textAlign = 'right'; ctx.fillStyle = INK
  ctx.fillText(header, x1 - 30, y0 + 38)
  ctx.restore()
}
export function hand(ctx, text, x, y, { size = 40, color = INK, rot = 0, align = 'center', k = 1, weight = 600, alpha = 1, maxW = 0 } = {}) {
  if (k <= 0 || alpha <= 0) return 0
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha *= alpha
  ctx.font = `italic ${weight} ${size}px ${SERIF}`; ctx.textAlign = align; ctx.textBaseline = 'middle'
  let tw = ctx.measureText(text).width
  if (maxW && tw > maxW) { const s = maxW / tw; ctx.scale(s, s); tw = maxW / s }
  const left = align === 'center' ? -tw / 2 : align === 'right' ? -tw : 0
  if (k < 1) { ctx.beginPath(); ctx.rect(left - 10, -size, (tw + 20) * k, size * 2); ctx.clip() }
  ctx.fillStyle = color; ctx.fillText(text, 0, 0)
  ctx.restore()
  return tw
}
export function sketchCircle(ctx, cx, cy, rx, ry, k, seed = 1, { color = PENCIL, width = 4, alpha = 0.8 } = {}) {
  if (k <= 0) return
  const r = rng(seed * 313), ph = [r() * 6, r() * 6], a0 = -2 + r()
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
function strikeLine(ctx, x0, x1, y, k, color = RED, width = 5) {
  if (k <= 0) return
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(x0, y + 3); ctx.lineTo(lerp(x0, x1, clamp(k)), y - 3 + 4 * Math.sin(clamp(k) * 6)); ctx.stroke(); ctx.restore()
}
function checkMark(ctx, x, y, s, k, color = '#2f9a5a') {
  if (k <= 0) return
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = s * 0.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  const a = [x - s * 0.45, y], b = [x - s * 0.1, y + s * 0.38], c = [x + s * 0.55, y - s * 0.5]
  const k1 = clamp(k * 2.2), k2 = clamp(k * 2.2 - 1)
  ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(lerp(a[0], b[0], k1), lerp(a[1], b[1], k1))
  if (k2 > 0) ctx.lineTo(lerp(b[0], c[0], k2), lerp(b[1], c[1], k2))
  ctx.stroke(); ctx.restore()
}
function crossMark(ctx, x, y, s, k, color = RED) {
  if (k <= 0) return
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = s * 0.2; ctx.lineCap = 'round'
  const k1 = clamp(k * 2), k2 = clamp(k * 2 - 1)
  ctx.beginPath(); ctx.moveTo(x - s / 2, y - s / 2); ctx.lineTo(x - s / 2 + s * k1, y - s / 2 + s * k1)
  if (k2 > 0) { ctx.moveTo(x + s / 2, y - s / 2); ctx.lineTo(x + s / 2 - s * k2, y - s / 2 + s * k2) }
  ctx.stroke(); ctx.restore()
}
const pencilRect = (ctx, x, y, w, h, { fillC = null, color = INK, width = 4 } = {}) => {
  ctx.save()
  if (fillC) { ctx.fillStyle = fillC; ctx.fillRect(x, y, w, h) }
  ctx.strokeStyle = rgba(color, 0.9); ctx.lineWidth = width; ctx.lineJoin = 'round'
  ctx.beginPath(); ctx.moveTo(x + 2, y); ctx.lineTo(x + w, y + 2); ctx.lineTo(x + w - 2, y + h); ctx.lineTo(x, y + h - 2); ctx.closePath(); ctx.stroke()
  ctx.restore()
}

// ── the PUSH | PULL | ALIGN meter
const METER = { x: 540, y: 1300, w: 780, h: 40 }
export const ZONE = { push: 1 / 6, pull: 0.5, align: 5 / 6 }
const needleWobble = (t, base, amp, seed = 1) => clamp(base + amp * (0.6 * Math.sin(t * 9.3 + seed) + 0.3 * Math.sin(t * 23.1 + seed * 2) + 0.25 * Math.sin(t * 4.1 + seed * 3)), 0.02, 0.98)
function drawMeter(ctx, t, p, { k = 1, smoke = 0, stamp = 0 } = {}) {
  if (k <= 0.01) return
  const { x, y, w, h } = METER, l = x - w / 2
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.translate(-x, -y); ctx.globalAlpha *= clamp(k * 1.5)
  const zones = [['PUSH', READING.push], ['PULL', READING.pull], ['IN SYNC', READING.align]]
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
  const nx = Math.round(l + w * clamp(p)), P = 6
  ctx.fillStyle = INK
  for (let j = 0; j < 5; j++) ctx.fillRect(nx - (5 - j) * P / 2 - P / 2, y - h / 2 - 50 + j * P, (5 - j) * P + P, P)
  ctx.fillRect(nx - 3, y - h / 2 - 22, 6, h + 28)
  ctx.fillStyle = '#ff5c6e'; ctx.fillRect(nx - 9, y - h / 2 - 50, 18, 6)
  ctx.restore()
  if (smoke > 0) for (let i = 0; i < 6; i++) {
    const ph = (t * 1.1 + i / 6) % 1, a = Math.sin(Math.PI * ph) * 0.7 * smoke, s = Math.round(10 + ph * 20)
    if (a <= 0.02) continue
    ctx.fillStyle = rgba(i % 3 ? '#8d87a3' : '#b9b4c8', a)
    ctx.fillRect(Math.round(nx + Math.sin(ph * 5 + i * 2) * 24 - s / 2), Math.round(y - h / 2 - 56 - ph * 140 - s / 2), s, s)
  }
  if (stamp > 0) {
    const s = lerp(2.2, 1, ease.inQuad(clamp(stamp))), cx = l + w * ZONE.align
    ctx.save(); ctx.translate(cx, y); ctx.rotate(-0.08); ctx.scale(s, s); ctx.globalAlpha *= clamp(stamp * 1.4) * k
    ctx.strokeStyle = RED; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(0, 0, w / 6 + 26, h / 2 + 24, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, w / 6 + 16, h / 2 + 15, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.restore()
  }
}

// ── the TIP stamp
function tipStamp(ctx, t, n, at, { x = 250, y = 560, out = 1, twist = false, label = null } = {}) {
  if (t < at - 0.12 || out <= 0) return
  const sp = prog(t, at - 0.12, at)
  const s = lerp(2.4, 1, ease.inQuad(sp)) * (1 + 0.08 * Math.exp(-Math.max(0, t - at) * 12) * Math.sin(Math.max(0, t - at) * 40))
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.1); ctx.scale(s * 0.82, s * 0.82); ctx.globalAlpha *= clamp(sp * 1.3) * out
  const txt = label || (twist ? `TIP ${n} ↻` : `TIP ${n}`)
  ctx.font = `800 58px ${INTER}`
  const w = Math.max(230, ctx.measureText(txt).width + 60), h = 96
  ctx.strokeStyle = RED; ctx.lineWidth = 8; ctx.strokeRect(-w / 2, -h / 2, w, h)
  ctx.lineWidth = 3; ctx.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20)
  ctx.font = `800 58px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = RED
  ctx.fillText(txt, 0, 4)
  ctx.fillStyle = PAPER
  const r = rng(n * 71)
  for (let i = 0; i < 16; i++) ctx.fillRect(Math.round(-w / 2 + r() * w), Math.round(-h / 2 + r() * h), 4, 4)
  ctx.restore()
  const d = t - at
  if (d > 0 && d < 0.5) for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2, rr = 100 + d * 240
    ctx.fillStyle = rgba('#8d87a3', 0.6 * (1 - d / 0.5)); ctx.fillRect(Math.round(x + Math.cos(a) * rr * 1.3), Math.round(y + Math.sin(a) * rr * 0.6), 10, 10)
  }
}

// ── small effects
const BM = s => s.trim().split(/\s+/)
function bmp(ctx, rows, x, y, px, pal, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  rows.forEach((row, j) => [...row].forEach((ch, i) => { const c = pal[ch]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } }))
  ctx.restore()
}
const HEART = BM(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 140, life = 1.6, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const k = (t - t0 - i * 0.18) / life
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx - 3.5 * px, y - k * 260, px, { X: cols[i % cols.length] }, alpha * Math.sin(Math.PI * k))
  }
}
function drawTears(ctx, t, ex, ey, dx, px, { amount = 1, seed = 1, fountain = true } = {}) {
  if (amount <= 0) return
  const r = rng(seed * 991), N = fountain ? 7 : 4
  for (const side of [-1, 1]) for (let k = 0; k < N; k++) {
    const ph = ((t * (fountain ? 1.5 : 0.8)) + k / N + r() * 0.05) % 1
    const vx = fountain ? (60 + 30 * ((k * 7) % 3)) : 10, vy = fountain ? -120 : 0
    const gx = ex + side * dx + side * vx * ph * px / 8, gy = ey + px * 2 + vy * ph * px / 8 + 380 * ph * ph * px / 8
    ctx.save(); ctx.globalAlpha *= clamp(amount) * (1 - ph * 0.7)
    ctx.fillStyle = '#5fc4f0'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), px, px * 2)
    ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), Math.ceil(px / 2), Math.ceil(px / 2))
    ctx.restore()
  }
}
const eyesOf = r => { const cell = r.size / 36; return { ex: r.x, ey: r.y + 1.2 * cell, dx: 4.6 * cell, px: Math.max(4, Math.round(cell)) } }
const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
function drawSweat(ctx, t, x, y, px) { const ph = (t * 1.2) % 1; bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#5fc4f0', W: '#ffffff' }, 1 - ph * 0.6) }
function sparkBurst(ctx, t, cx, cy, t0, { n = 12, R = 200, size = 28, seed = 1, cols = [GOLD, BONE, '#ff8fb1', '#c9a6ff'], life = 0.8 } = {}) {
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
// falling snow over the page (winter): a few pixel flakes
function drawSnow(ctx, t, alpha = 0.6) {
  const r = rng(77)
  for (let i = 0; i < 26; i++) {
    const x0 = r() * 1080, sp = 40 + r() * 50, ph = r() * 2000, s = r() < 0.3 ? 6 : 4
    const y = ((t * sp + ph) % 2000) - 40, x = x0 + Math.sin(t * 0.8 + i) * 20
    ctx.fillStyle = rgba('#ffffff', alpha * (0.5 + 0.5 * r())); ctx.fillRect(Math.round(x), Math.round(y), s, s)
  }
}

// ═════════════════════════════════════════════ PROPS (sketched on the page, centred at PC)
// Each takes (ctx, t, p, k, at) where p = the prop config, k = pop-in/out scale and at(spec) resolves a time spec.
const PC = { x: 540, y: 805 }
export const PROPS = {
  // a handwritten checklist: items [{ text, at, mark: 'check'|'cross'|'strike'|null, markAt }]
  list(ctx, t, p, k, at) {
    const n = p.items.length, rowH = p.rowH || 74, w = p.w || 600, h = 92 + n * rowH
    const x0 = PC.x - w / 2, y0 = PC.y - h / 2 + (p.dy || 0)
    pencilRect(ctx, x0, y0, w, h, { fillC: '#fbf6e8' })
    ctx.fillStyle = rgba('#5c8fd6', 0.35); for (let i = 0; i < n; i++) ctx.fillRect(x0 + 16, y0 + 84 + (i + 1) * rowH - 8, w - 32, 2)
    hand(ctx, p.title, PC.x, y0 + 44, { size: 40, weight: 700, maxW: w - 40 })
    p.items.forEach((it, i) => {
      const ta = at(it.at), ik = clamp((t - ta) / 0.45)
      if (ik <= 0) return
      const y = y0 + 84 + i * rowH + rowH / 2 - 4
      ctx.save(); ctx.strokeStyle = rgba(INK, 0.85); ctx.lineWidth = 3; ctx.strokeRect(x0 + 26, y - 17, 34, 34); ctx.restore()
      const tw = hand(ctx, it.text, x0 + 80, y, { size: it.size || 38, align: 'left', k: ik, maxW: w - 110, color: it.color || INK })
      if (it.mark) {
        const mk = clamp((t - at(it.markAt ?? it.at)) / 0.3)
        if (it.mark === 'check') checkMark(ctx, x0 + 45, y, 40, mk)
        if (it.mark === 'cross') crossMark(ctx, x0 + 43, y, 30, mk)
        if (it.mark === 'strike') { crossMark(ctx, x0 + 43, y, 30, mk); strikeLine(ctx, x0 + 74, x0 + 86 + Math.min(tw, w - 110), y, mk) }
      }
    })
  },
  // a sketched phone with bubbles: msgs [{ side: 'L'|'R', text, at, del }]  (del: the draft is struck + deleted)
  phone(ctx, t, p, k, at) {
    const w = 420, h = 420, x0 = PC.x - w / 2 + 20, y0 = PC.y - h / 2 + 30
    ctx.save(); ctx.fillStyle = INK; ctx.fillRect(x0 - 14, y0 - 14, w + 28, h + 28); ctx.fillStyle = '#fbf6e8'; ctx.fillRect(x0, y0, w, h)
    ctx.fillStyle = INK; ctx.fillRect(x0 + w / 2 - 50, y0 - 6, 100, 10); ctx.restore()
    ctx.fillStyle = rgba(INK, 0.1); ctx.fillRect(x0, y0, w, 58)
    hand(ctx, p.title, x0 + w / 2, y0 + 30, { size: 32, weight: 700, maxW: w - 30 })
    let y = y0 + 84
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y0 + 58, w, h - 58); ctx.clip()
    for (const m of p.msgs) {
      const ta = at(m.at); if (t < ta) continue
      const mk = pop01(t, ta, 0.28, 2.2)
      const dk = m.del ? prog(t, at(m.del), at(m.del) + 0.35) : 0
      if (dk >= 1) continue
      ctx.font = `700 26px ${MONO}`
      const words = m.text.split(' '), rows = []; let cur = ''
      for (const wd of words) { const nx = cur ? cur + ' ' + wd : wd; if (ctx.measureText(nx).width > w - 120 && cur) { rows.push(cur); cur = wd } else cur = nx }
      rows.push(cur)
      const bw = Math.max(...rows.map(r => ctx.measureText(r).width)) + 32, bh = rows.length * 34 + 22
      const bx = m.side === 'R' ? x0 + w - 18 - bw : x0 + 18
      ctx.save(); ctx.translate(bx + bw / 2, y + bh / 2); ctx.scale(mk * (1 - dk * 0.3), mk * (1 - dk * 0.3)); ctx.globalAlpha *= 1 - dk
      ctx.fillStyle = m.side === 'R' ? '#cfe6ff' : '#ffe3ec'; ctx.fillRect(-bw / 2, -bh / 2, bw, bh)
      ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(-bw / 2, -bh / 2, bw, bh)
      ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
      rows.forEach((r, j) => ctx.fillText(r, -bw / 2 + 16, -bh / 2 + 28 + j * 34))
      if (m.del && t > at(m.del) - 0.5) strikeLine(ctx, -bw / 2 + 10, bw / 2 - 10, 0, prog(t, at(m.del) - 0.5, at(m.del) - 0.1))
      ctx.restore()
      y += (bh + 16) * (m.del ? 1 - ease.inOutCubic(dk) : 1)
    }
    ctx.restore()
  },
  // a calendar page: cells [{ d, text }] (2 rows × 3), hl: { i, at, text } (circled in red, text written in)
  calendar(ctx, t, p, k, at) {
    const cols = 3, rows = 2, cw = 190, ch = 150, w = cols * cw, h = rows * ch + 70
    const x0 = PC.x - w / 2, y0 = PC.y - h / 2
    pencilRect(ctx, x0, y0, w, h, { fillC: '#fbf6e8' })
    ctx.fillStyle = rgba(RED, 0.75); ctx.fillRect(x0, y0, w, 64)
    ctx.font = `800 32px ${INTER}`; ctx.fillStyle = '#fff6e6'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.title, PC.x, y0 + 34)
    p.cells.forEach((c, i) => {
      const cx = x0 + (i % cols) * cw, cy = y0 + 70 + Math.floor(i / cols) * ch
      ctx.strokeStyle = rgba(INK, 0.6); ctx.lineWidth = 2; ctx.strokeRect(cx, cy, cw, ch)
      ctx.font = `700 22px ${MONO}`; ctx.fillStyle = rgba(INK, 0.7); ctx.textAlign = 'left'; ctx.fillText(c.d, cx + 12, cy + 22)
      if (c.text) hand(ctx, c.text, cx + cw / 2, cy + ch / 2 + 16, { size: 30, maxW: cw - 20, color: rgba(INK, 0.75) })
    })
    if (p.hl) {
      const i = p.hl.i, cx = x0 + (i % cols) * cw + cw / 2, cy = y0 + 70 + Math.floor(i / cols) * ch + ch / 2
      const ta = at(p.hl.at)
      ctx.fillStyle = rgba(GOLD, 0.35 * clamp((t - ta) / 0.3)); ctx.fillRect(cx - cw / 2 + 3, cy - ch / 2 + 3, cw - 6, ch - 6)
      hand(ctx, p.hl.text, cx, cy + 16, { size: p.hl.size || 34, weight: 700, k: clamp((t - ta) / 0.5), maxW: cw - 16, color: RED })
      sketchCircle(ctx, cx, cy + 8, cw * 0.56, ch * 0.5, clamp((t - ta - 0.4) / 0.45), 5 + i, { color: RED, width: 6, alpha: 0.9 })
    }
  },
  // a clock: face (hands sweep from → to minutes during run) or digital (frames [{ at, text }]); label under it
  clock(ctx, t, p, k, at) {
    const cx = PC.x, cy = PC.y - 30, R = 150
    if (p.digital) {
      const w = 470, h = 200
      ctx.fillStyle = INK; ctx.fillRect(cx - w / 2 - 10, cy - h / 2 - 10, w + 20, h + 20); ctx.fillStyle = '#16233a'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h)
      let cur = p.frames[0].text; for (const f of p.frames) if (t >= at(f.at)) cur = f.text
      const last = p.frames[p.frames.length - 1], hit = t >= at(last.at)
      ctx.font = `700 120px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle = hit ? '#7dffb0' : '#ff8a8a'; ctx.fillText(cur, cx, cy + 6)
    } else {
      ctx.save(); ctx.fillStyle = '#fbf6e8'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.stroke()
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ctx.fillStyle = INK; ctx.fillRect(cx + Math.sin(a) * (R - 22) - 4, cy - Math.cos(a) * (R - 22) - 4, 8, 8) }
      const [ra, rb] = p.run.map(at), m = lerp(p.from, p.to, ease.inOutCubic(prog(t, ra, rb)))
      if (p.wedge) {           // a highlighted slice (e.g. 8:45–8:55)
        const a0 = (p.wedge[0] / 60) * Math.PI * 2 - Math.PI / 2, a1 = (p.wedge[1] / 60) * Math.PI * 2 - Math.PI / 2, wk = clamp((t - at(p.wedgeAt)) / 0.4)
        if (wk > 0) { ctx.fillStyle = rgba(GOLD, 0.75); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R - 10, a0, lerp(a0, a1, wk)); ctx.closePath(); ctx.fill() }
      }
      const ah = ((m / 60) % 12) / 12 * Math.PI * 2, am = (m % 60) / 60 * Math.PI * 2
      ctx.strokeStyle = INK; ctx.lineCap = 'round'
      ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(ah) * R * 0.5, cy - Math.cos(ah) * R * 0.5); ctx.stroke()
      ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(am) * R * 0.8, cy - Math.cos(am) * R * 0.8); ctx.stroke()
      ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2); ctx.fill(); ctx.restore()
    }
    hand(ctx, p.label, cx, cy + (p.digital ? 150 : R + 50), { size: 40, weight: 700, k: clamp((t - at(p.labelAt ?? 0.2)) / 0.5), color: p.labelColor || RED, maxW: 620 })
  },
  // a balance scale: left / right pan labels, seq [[at, tilt -1…1]] (springy)
  scale(ctx, t, p, k, at) {
    let tilt = 0, prev = 0, t0 = -1
    for (const [s, v] of p.seq) { const ta = at(s); if (t >= ta) { prev = tilt; tilt = v; t0 = ta } }
    const e = t0 < 0 ? 1 : ease.spring ? ease.spring(prog(t, t0, t0 + 0.7), 0.25) : ease.outCubic(prog(t, t0, t0 + 0.5))
    const a = lerp(prev, tilt, e) * 0.32 + (p.wobble ? 0.06 * Math.sin(t * 6) * (1 - clamp(e)) : 0)
    const cx = PC.x, cy = PC.y - 120, L = 230
    ctx.save(); ctx.fillStyle = INK
    ctx.fillRect(cx - 8, cy, 16, 300); ctx.fillRect(cx - 90, cy + 290, 180, 18)
    ctx.translate(cx, cy); ctx.rotate(a)
    ctx.fillRect(-L, -7, L * 2, 14)
    ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fillStyle = GOLD; ctx.fill()
    for (const s of [-1, 1]) {
      const px = s * L
      ctx.save(); ctx.translate(px, 0); ctx.rotate(-a)
      ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-80, 110); ctx.moveTo(0, 0); ctx.lineTo(80, 110); ctx.stroke()
      ctx.fillStyle = s < 0 ? '#ffe3ec' : '#cfe6ff'; ctx.fillRect(-100, 110, 200, 22); ctx.strokeRect(-100, 110, 200, 22)
      hand(ctx, s < 0 ? p.left : p.right, 0, 168, { size: 36, weight: 700, maxW: 230 })
      ctx.restore()
    }
    ctx.restore()
    if (p.verdict) hand(ctx, p.verdict.text, cx, cy + 360, { size: 40, weight: 700, color: RED, k: clamp((t - at(p.verdict.at)) / 0.5), maxW: 600 })
  },
  // a route map: from → to pins, a dotted route drawn on during run; mode 'wander' loops; alt: a second, straight dash
  map(ctx, t, p, k, at) {
    const x0 = PC.x - 300, y0 = PC.y - 200, w = 600, h = 400
    pencilRect(ctx, x0, y0, w, h, { fillC: '#eef3e4' })
    ctx.fillStyle = rgba('#7fb2d6', 0.35); ctx.beginPath(); ctx.ellipse(x0 + 470, y0 + 300, 90, 50, 0.3, 0, Math.PI * 2); ctx.fill()
    for (let i = 0; i < 5; i++) { ctx.fillStyle = rgba('#5a9a6a', 0.5); ctx.beginPath(); ctx.moveTo(x0 + 330 + i * 40, y0 + 110); ctx.lineTo(x0 + 350 + i * 40, y0 + 70); ctx.lineTo(x0 + 370 + i * 40, y0 + 110); ctx.fill() }
    const A = { x: x0 + 90, y: y0 + h - 90 }, B = { x: x0 + w - 100, y: y0 + 110 }
    const path = u => {
      const bx = lerp(A.x, B.x, u), by = lerp(A.y, B.y, u)
      if (p.mode === 'wander') return [bx + Math.sin(u * Math.PI * 4) * 90 * Math.sin(Math.PI * u), by + Math.cos(u * Math.PI * 3) * 50 * Math.sin(Math.PI * u)]
      return [bx + Math.sin(u * Math.PI) * -60, by + Math.sin(u * Math.PI) * -40]
    }
    const draw = (fn, kk, col, dash) => {
      if (kk <= 0) return
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.setLineDash(dash); ctx.lineCap = 'round'; ctx.beginPath()
      const N = 60; for (let i = 0; i <= Math.round(N * clamp(kk)); i++) { const [px, py] = fn(i / N); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py) }
      ctx.stroke(); ctx.restore()
    }
    if (p.alt) draw(u => [lerp(A.x, B.x, u), lerp(A.y, B.y, u)], prog(t, ...p.alt.run.map(at)), rgba(INK, 0.45), [4, 10])
    draw(path, prog(t, ...p.run.map(at)), RED, [14, 12])
    for (const [P, lab, col] of [[A, p.from, '#3f7cf0'], [B, p.to, RED]]) {
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(P.x, P.y - 34, 22, Math.PI, 0); ctx.lineTo(P.x, P.y); ctx.closePath(); ctx.fill()
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(P.x, P.y - 34, 14, 0, Math.PI * 2); ctx.fill()
      hand(ctx, lab, P.x, P.y + 32, { size: 36, weight: 700, maxW: 260 })
    }
    if (p.alt) hand(ctx, p.alt.label, lerp(A.x, B.x, 0.5) + 70, lerp(A.y, B.y, 0.5) + 40, { size: 30, color: rgba(INK, 0.6), k: prog(t, ...p.alt.run.map(at)), rot: -0.35 })
    if (p.note) hand(ctx, p.note.text, PC.x, y0 + h + 44, { size: 38, weight: 700, color: RED, k: clamp((t - at(p.note.at)) / 0.5), maxW: 620 })
  },
  // a horizontal gauge (a thermometer): seq [[at, value 0…1.2]]; >1 overflows with drips
  gauge(ctx, t, p, k, at) {
    let v = 0, prev = 0, t0 = -1
    for (const [s, val] of p.seq) { const ta = at(s); if (t >= ta) { prev = v; v = val; t0 = ta } }
    const f = t0 < 0 ? v : lerp(prev, v, ease.outCubic(prog(t, t0, t0 + 0.9)))
    const w = 520, h = 70, x0 = PC.x - w / 2, cy = PC.y
    hand(ctx, p.title, PC.x, cy - 130, { size: 44, weight: 700, maxW: 600 })
    ctx.fillStyle = INK; ctx.fillRect(x0 - 10, cy - h / 2 - 10, w + 20, h + 20); ctx.beginPath(); ctx.arc(x0 - 10, cy, 64, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#fbf6e8'; ctx.fillRect(x0, cy - h / 2, w, h)
    const col = p.color || '#5fc4f0'
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x0 - 10, cy, 50, 0, Math.PI * 2); ctx.fill()
    ctx.fillRect(x0, cy - h / 2 + 8, w * clamp(f), h - 16)
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fillRect(x0, cy - h / 2 + 10, w * clamp(f), 8)
    for (let i = 1; i < 5; i++) { ctx.fillStyle = INK; ctx.fillRect(x0 + w * i / 5 - 2, cy + h / 2 - 22, 4, 22) }
    hand(ctx, p.labels[0], x0 + 20, cy + 82, { size: 32, align: 'left', color: rgba(INK, 0.75) })
    hand(ctx, p.labels[1], x0 + w, cy + 82, { size: 32, align: 'right', color: rgba(INK, 0.75) })
    if (f > 1) {                                  // overflowing: drips spill off the end
      for (let i = 0; i < 6; i++) { const ph = (t * 1.3 + i / 6) % 1; ctx.fillStyle = rgba(col, 1 - ph); ctx.fillRect(x0 + w + 6 + (i % 3) * 14, cy - 10 + ph * 170, 10, 16) }
      ctx.fillStyle = col; ctx.fillRect(x0 + w - 4, cy - h / 2 - 16, 26, 22)
    }
    if (p.verdict) hand(ctx, p.verdict.text, PC.x, cy + 160, { size: 42, weight: 700, color: RED, k: clamp((t - at(p.verdict.at)) / 0.5), maxW: 620 })
  },
  // a sticky note: lines [{ text, at, strike }] (strike: crossed out at that time)
  note(ctx, t, p, k, at) {
    const w = 470, h = 420, cx = PC.x, cy = PC.y
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(p.rot ?? -0.04)
    ctx.fillStyle = 'rgba(4,2,12,0.25)'; ctx.fillRect(-w / 2 + 10, -h / 2 + 14, w, h)
    ctx.fillStyle = p.color || '#ffe98a'; ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = 'rgba(0,0,0,0.06)'; ctx.fillRect(-w / 2, -h / 2, w, 46)
    ctx.fillStyle = rgba('#b9b4c8', 0.8); ctx.fillRect(-60, -h / 2 - 16, 120, 34)
    let y = -h / 2 + 90
    for (const ln of p.lines) {
      const lk = clamp((t - at(ln.at)) / 0.5)
      if (lk > 0) {
        const tw = hand(ctx, ln.text, 0, y, { size: ln.size || 44, weight: 700, k: lk, maxW: w - 50, color: ln.color || INK })
        if (ln.strike) strikeLine(ctx, -Math.min(tw, w - 50) / 2 - 8, Math.min(tw, w - 50) / 2 + 8, y, prog(t, at(ln.strike), at(ln.strike) + 0.3))
        if (ln.check) checkMark(ctx, Math.min(tw, w - 50) / 2 + 34, y, 40, prog(t, at(ln.check), at(ln.check) + 0.3))
      }
      y += ln.gap || 86
    }
    ctx.restore()
  },
  // a talk card (index card with the TALK CARD header): q, by; tear: at → two halves labelled halves[0] / halves[1]
  card(ctx, t, p, k, at) {
    const w = 440, h = 300, cx = PC.x, cy = PC.y - 20
    const tk = p.tear ? ease.outBack(prog(t, at(p.tear), at(p.tear) + 0.5)) : 0
    for (const s of p.tear ? [-1, 1] : [0]) {
      ctx.save(); ctx.translate(cx + s * tk * 60, cy + Math.abs(s) * tk * 10); ctx.rotate(-0.05 + s * tk * 0.12)
      if (s) { ctx.beginPath(); ctx.rect(s < 0 ? -w / 2 - 20 : 0, -h / 2 - 20, w / 2 + 20, h + 40); ctx.clip() }
      ctx.fillStyle = 'rgba(4,2,12,0.3)'; ctx.fillRect(-w / 2 + 10, -h / 2 + 14, w, h)
      ctx.fillStyle = '#1d1440'; ctx.fillRect(-w / 2, -h / 2, w, h)
      ctx.strokeStyle = GOLD; ctx.lineWidth = 5; ctx.strokeRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
      ctx.font = `700 22px ${MONO}`; ctx.fillStyle = GOLD; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(p.header || 'TALK CARD', 0, -h / 2 + 46)
      ctx.font = `italic 600 44px ${SERIF}`; ctx.fillStyle = BONE
      const words = p.q.split(' '), rows = []; let cur = ''
      for (const wd of words) { const nx = cur ? cur + ' ' + wd : wd; if (ctx.measureText(nx).width > w - 70 && cur) { rows.push(cur); cur = wd } else cur = nx }
      rows.push(cur)
      rows.forEach((r, j) => ctx.fillText(r, 0, 10 + (j - (rows.length - 1) / 2) * 52))
      ctx.restore()
    }
    if (p.halves && tk > 0.3) {
      hand(ctx, p.halves[0], cx - 170, cy + 210, { size: 38, weight: 700, color: RED, k: clamp((t - at(p.tear) - 0.3) / 0.5), maxW: 280 })
      hand(ctx, p.halves[1], cx + 170, cy + 210, { size: 38, weight: 700, color: RED, k: clamp((t - at(p.tear) - 0.6) / 0.5), maxW: 280 })
    }
    if (p.caption) hand(ctx, p.caption.text, cx, cy + 215, { size: 40, weight: 700, color: RED, k: clamp((t - at(p.caption.at)) / 0.5), maxW: 620 })
  },
}

// ═════════════════════════════════════════════ the schedule (pure; shared by picture and sound)
const LEAD0 = 2.45, HOLD = 1.5, STAMP_LEAD = 0.75, SWEEP = 1.35, FINAL = 3.5
function lineDur(text) { return lineTimes([{ t: 0, text, speaker: 'x' }], { cps: CPS })[0].done }
export function schedule(cfg) {
  const STORY_END = cfg.duration
  const beats = [cfg.open, ...cfg.tips.map(x => x.lines)]
  // fixed costs + line durations, then share the slack evenly across every gap
  let gaps = 0, fixed = LEAD0
  beats.forEach((ls, k) => { ls.forEach((L, i) => { fixed += lineDur(L.text); if (i || k) { fixed += HOLD; gaps++ } }) })
  fixed += SWEEP + 0.35 + FINAL
  const slack = STORY_END - 0.08 - fixed
  if (slack < 0) throw new Error(`${cfg.id}: lines too long by ${(-slack).toFixed(2)} s`)
  const g = Math.min(1.7, slack / (gaps + 1))
  if (slack - g * gaps > 3) throw new Error(`${cfg.id}: ${(slack - g * gaps).toFixed(2)} s of dead air: add lines`)
  const LINES = [], B = []
  let tt = LEAD0
  beats.forEach((ls, k) => {
    const b = { k, lines: [] }
    ls.forEach((L, i) => {
      if (i || k) tt += HOLD + g
      if (i === 0 && k) { b.S = tt - STAMP_LEAD; b.stamp = b.S + 0.12 }
      if (k === 0 && i === 0) b.S = 0
      const line = { ...L, t: r3(tt) }
      b.lines.push(line); LINES.push(line)
      tt += lineDur(L.text)
    })
    b.lastDone = tt
    B.push(b)
  })
  B.forEach((b, k) => { b.E = k < B.length - 1 ? B[k + 1].S : b.lastDone + 0.25 + SWEEP + 0.35 })
  const tip3 = B[B.length - 1]
  const sweep = { p: tip3.lastDone + 0.3, u: tip3.lastDone + 0.65, a: tip3.lastDone + 1.0, ring: tip3.lastDone + 1.15 }
  const fin = { S: tip3.E, verdict: tip3.E + 0.15, line: tip3.E + 1.55, land: tip3.E + 2.0, out: [STORY_END + 5, STORY_END + 6] }
  return { LINES, B, sweep, fin, g }
}

// ═════════════════════════════════════════════ makeFilm
// cfg: { id, a, b (sign ids), wants: [a, b], hook, figNote?, open: [{who, text, mood?, react?}],
//        tips: [{ head, prop: { type, … }, lines: [...] } × 3 (the 3rd is the twist)], last, music: { style, key, seed },
//        moods?: { a0, b0 } (frame-0 moods), cornerPisces? (auto) }
export function makeFilm(cfg) {
  const STORY_END = cfg.duration, DURATION = cfg.duration, N = cfg.tips.length
  const SA = { ...signStar(cfg.a), ...(cfg.colors?.a ? { color: cfg.colors.a } : {}) }, SB = { ...signStar(cfg.b), ...(cfg.colors?.b ? { color: cfg.colors.b } : {}) }, PIS = signStar('pisces')
  const NA = NAMES[cfg.a], NB = NAMES[cfg.b]
  const who = w => (w === 'a' ? { s: SA, n: NA } : { s: SB, n: NB })
  const tag = w => `${who(w).s.glyph}︎ ${who(w).n.toUpperCase()}`
  const tcol = w => lighten(who(w).s.color, 0.35)
  const withSpk = ls => ls.map(L => ({ ...L, speaker: tag(L.who), color: tcol(L.who) }))
  const C = { ...cfg, open: withSpk(cfg.open), tips: cfg.tips.map(x => ({ ...x, lines: withSpk(x.lines) })) }
  const S = schedule(C)
  const { LINES, B, sweep, fin } = S
  const pisInPair = cfg.a === 'pisces' ? 'a' : cfg.b === 'pisces' ? 'b' : null
  const header = `${ELEM[cfg.a]} × ${ELEM[cfg.b]}`

  // a time spec → seconds, inside beat k: number (offset from the beat start) or 'L0' / 'D1+0.3' (line start / done)
  const LT = lineTimes(LINES, { cps: CPS })
  const beatAt = k => spec => {
    if (typeof spec === 'number') return B[k].S + spec
    const m = /^([LD])(\d)([+-][\d.]+)?$/.exec(spec)
    if (!m) throw new Error('bad time spec ' + spec)
    const L = B[k].lines[+m[2]], i = LINES.indexOf(L)
    return (m[1] === 'L' ? LT[i].start : LT[i].done) + (m[3] ? parseFloat(m[3]) : 0)
  }
  const T = {
    push: LT[1].done - 0.15,
    sweep, fin, meterOut: [fin.S - 0.05, fin.S + 0.3],
  }
  // moods / looks: event lists per star
  const ev = { a: [[-9, cfg.moods?.a0 || 'sparkle', null]], b: [[-9, cfg.moods?.b0 || 'wide', null]] }
  LINES.forEach((L, i) => {
    const me = L.who, other = me === 'a' ? 'b' : 'a'
    ev[me].push([L.t, L.mood || 'happy', null])
    ev[other].push([L.t, L.listen || 'neutral', me === 'a' ? [-1, 0] : [1, 0]])
    ev[other].push([LT[i].done + 0.1, L.react || 'happy', null])
  })
  for (const [k, w, m] of cfg.extraMoods || []) ev[w].push([typeof k === 'number' ? k : beatAt(+k[0])(k.slice(2)), m, null])
  ev.a.push([sweep.a, 'heart', null]); ev.b.push([sweep.a + 0.08, 'heart', null])
  ev.a.push([fin.land, 'sparkle', null]); ev.b.push([fin.land, 'happy', null])
  for (const w of ['a', 'b']) ev[w].sort((p, q) => p[0] - q[0])
  const moodAt = (w, t) => { let cur = ev[w][0]; for (const e of ev[w]) if (t >= e[0]) cur = e; return cur }
  const hopsA = [-0.14, ...talkHops(LINES, tag('a'), { cps: CPS }), T.push + 0.05, ...B.slice(1).map(b => b.stamp + 0.1), sweep.a, fin.land]
  const hopsB = [-0.05, ...talkHops(LINES, tag('b'), { cps: CPS }), T.push + 0.08, ...B.slice(1).map(b => b.stamp + 0.18), sweep.a + 0.08, fin.land + 0.1]

  // the needle
  const NEEDLE = [[0, 0.5, 0.14], [T.push, ZONE.push, 0.05], ...B.slice(1).map((b, k) => [b.S + 0.4, [0.35, 0.16, 0.34, 0.44, 0.52][k] ?? 0.45, 0.1]),
    [sweep.p, ZONE.push, 0.01], [sweep.u, ZONE.pull, 0.01], [sweep.a, ZONE.align, 0.004]]
  function needle(t) {
    let i = 0
    for (let j = 0; j < NEEDLE.length; j++) if (t >= NEEDLE[j][0]) i = j
    const cur = NEEDLE[i], prev = NEEDLE[Math.max(0, i - 1)]
    const e = i === 0 ? 1 : ease.spring ? ease.spring(prog(t, cur[0], cur[0] + 0.55), 0.22) : ease.outCubic(prog(t, cur[0], cur[0] + 0.4))
    return needleWobble(t, lerp(prev[1], cur[1], e), lerp(prev[2], cur[2], prog(t, cur[0], cur[0] + 0.3)), 11)
  }

  // layout
  const HOME = { a: { x: 262, y: 950, s: 270 }, b: { x: 818, y: 950, s: 270 } }
  const TIPP = { a: { x: 190, y: 1120, s: 175 }, b: { x: 890, y: 1120, s: 175 } }
  const FINP = { a: { x: 420, y: 960, s: 260 }, b: { x: 660, y: 960, s: 260 } }
  const CORNER = { x: 915, y: 580, s: 118 }
  function posOf(w, t) {
    const m1 = ease.inOutCubic(prog(t, B[1].S - 0.1, B[1].S + 0.35)), m2 = ease.inOutCubic(prog(t, fin.S, fin.S + 0.5))
    const H = HOME[w], P = TIPP[w], F = FINP[w]
    let x = lerp(H.x, P.x, m1), y = lerp(H.y, P.y, m1), s = lerp(H.s, P.s, m1)
    x = lerp(x, F.x, m2); y = lerp(y, F.y, m2) - Math.sin(Math.PI * m2) * 80; s = lerp(s, F.s, m2)
    return { x, y, s }
  }

  async function build(stage) {
    try { await Promise.all(['800 100px Inter', "italic 500 130px 'EB Garamond'", "italic 600 40px 'EB Garamond'", "italic 700 40px 'EB Garamond'", "700 26px 'Space Mono'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const heads = [
      [popText(root, cfg.hook, { top: 160, size: 104, accentSize: 136, at: -0.9, gap: 0.05, accentColor: GOLD, fit: true }), [B[1].S - 0.15, B[1].S + 0.05]],
      ...C.tips.map((tp, k) => [popText(root, tp.head, { top: 166, size: 88, accentSize: 120, at: B[k + 1].S + 0.05, gap: 0.08, accentColor: k === N - 1 ? '#ff8fa0' : GOLD, wobble: k === N - 1, fit: true }),
        k < N - 1 ? [B[k + 2].S - 0.15, B[k + 2].S + 0.05] : [fin.S - 0.15, fin.S + 0.05]]),
      [popText(root, cfg.last, { top: 150, size: 104, accentSize: 150, at: fin.line, gap: 0.12, late: 1, lateAt: fin.land, wobble: true, accentColor: GOLD, fit: true }), fin.out],
    ]
    const box = dialogueBox(root, { lines: LINES, y: 1430, open: LINES[0].t - 0.25, close: fin.S - 0.1, cps: CPS, size: 46, height: 280 })
    const bug = el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.16em',
      color: GOLD, textShadow: '0 2px 10px rgba(6,4,18,0.85)', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 5 }, root, 'sign × sign')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function star(w, t) {
      const P = posOf(w, t), S0 = who(w).s, [, mood, look] = moodAt(w, t)
      const ok = popOut(t, ...fin.out)
      if (ok <= 0) return
      const isP = pisInPair === w
      const r = drawStarChar(x, P.x, P.y, P.s * ok, t, { color: S0.color, glyph: S0.glyph, mood, look: look || undefined, hops: w === 'a' ? hopsA : hopsB, seed: w === 'a' ? 3 : 8, glow: 1.05,
        squash: t > T.push && t < T.push + 0.5 ? 0.14 * Math.exp(-(t - T.push) * 6) : 0 })
      if (isP) { const E = eyesOf(r); drawTears(x, t, E.ex, E.ey, E.dx, E.px, { amount: 1, fountain: true || mood === 'happy' || mood === 'heart' || mood === 'sparkle' || t > fin.S, seed: 4 }) }
      if (mood === 'wide' && (t < B[1].S)) drawSweat(x, t, P.x + P.s * 0.32, P.y - P.s * 0.42, Math.max(4, Math.round(P.s / 40)))
      return r
    }
    function corner(t) {
      if (pisInPair) return
      const k = pop01(t, -0.4, 0.3) * popOut(t, ...fin.out)
      if (k <= 0.01) return
      const happy = t > sweep.a
      const r = drawStarChar(x, CORNER.x, CORNER.y, CORNER.s * k, t, { color: PIS.color, glyph: PIS.glyph, mood: happy ? 'happy' : 'wide', look: [-1, 1], seed: 6, glow: 0.8 })
      const E = eyesOf(r)
      drawTears(x, t, E.ex, E.ey, E.dx, E.px + 1, { amount: 1, fountain: true, seed: 6 })
    }
    function specimens(t) {
      const lk = 1 - ease.inCubic(prog(t, B[1].S - 0.2, B[1].S + 0.1))
      if (lk <= 0) return
      x.save(); x.globalAlpha *= lk
      sketchCircle(x, HOME.a.x, HOME.a.y - 6, 175, 170, 1, 2)
      sketchCircle(x, HOME.b.x, HOME.b.y - 6, 175, 170, 1, 9)
      hand(x, `fig. 1 · ${NA.toLowerCase()}`, HOME.a.x, 1172, { size: 42 })
      hand(x, `wants: ${cfg.wants[0]}`, HOME.a.x, 1214, { size: 32, color: RED, maxW: 400 })
      hand(x, `fig. 2 · ${NB.toLowerCase()}`, HOME.b.x, 1172, { size: 42 })
      hand(x, `wants: ${cfg.wants[1]}`, HOME.b.x, 1214, { size: 32, color: RED, maxW: 400 })
      if (cfg.figNote) hand(x, cfg.figNote, 540, 640, { size: 32, color: rgba(INK, 0.8), maxW: 640, k: clamp((t - 1.0) / 0.8) })
      x.restore()
    }
    function props(t) {
      C.tips.forEach((tp, k) => {
        const b = B[k + 1]
        if (t < b.S || t > b.E + 0.3) return
        const kin = easeOutBack(prog(t, b.S + 0.1, b.S + 0.45), 1.5), kout = 1 - ease.inCubic(prog(t, b.E - 0.1, b.E + 0.2))
        const kk = kin * kout
        if (kk <= 0.01) return
        x.save(); x.translate(PC.x, PC.y); x.scale(kk, kk); x.rotate((1 - kin) * 0.15); x.translate(-PC.x, -PC.y); x.globalAlpha *= clamp(kk * 2)
        PROPS[tp.prop.type](x, t, tp.prop, kk, beatAt(k + 1))
        x.restore()
        tipStamp(x, t, k + 1, b.stamp, { out: kout, twist: k === N - 1, label: tp.stamp })
      })
    }
    function finale(t) {
      if (t < fin.S) return
      const ok = popOut(t, ...fin.out)
      sketchCircle(x, 540, 945, 330, 200, clamp((t - fin.S - 0.3) / 0.6) * ok, 13, { color: RED, width: 6 })
      { // the verdict stamp, slammed on the page above the pair
        const at = fin.verdict, sp = prog(t, at - 0.12, at)
        const d = Math.max(0, t - at), s = lerp(2.6, 1, ease.inQuad(sp)) * (1 + 0.08 * Math.exp(-d * 12) * Math.sin(d * 40))
        x.save(); x.translate(500, 690); x.rotate(-0.07); x.scale(s, s); x.globalAlpha *= clamp(sp * 1.3)
        x.font = `800 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED
        x.fillText('THE VERDICT', 0, -70)
        x.font = `800 56px ${INTER}`
        const w = Math.max(420, x.measureText(cfg.verdict).width + 70), h = 110
        x.strokeStyle = RED; x.lineWidth = 9; x.strokeRect(-w / 2, -h / 2 + 18, w, h); x.lineWidth = 3; x.strokeRect(-w / 2 + 11, -h / 2 + 29, w - 22, h - 22)
        x.fillText(cfg.verdict, 0, 22)
        x.restore()
      }
      hand(x, 'fig. 3 · both', 540, 1205, { size: 44, k: clamp((t - fin.land) / 0.5), alpha: ok })
      drawHearts(x, t, fin.land, 540, 820, { n: 8, spread: 300 })
      sparkBurst(x, t, 540, 900, fin.land, { R: 260 })
    }
    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const zoom = lerp(SKY_H.zoom * 1.08, SKY_H.zoom, ease.outCubic(prog(t, 0, 4)))
        drawSky(x, t, { ...SKY_H, zoom })
        drawSnow(x, t, 0.45)
        const dS = t - B[1].stamp, shake = dS > 0 && dS < 0.35 ? 9 * Math.exp(-dS * 10) * Math.sin(dS * 55) : 0
        x.save(); x.translate(0, shake)
        if (t < STORY_END) {
          drawNotebook(x, { header })
          specimens(t)
          props(t)
          const mk = 1 - ease.inCubic(prog(t, ...T.meterOut))
          drawMeter(x, t, needle(t), { k: mk, smoke: t > T.push && t < B[1].S ? 0.8 : 0, stamp: prog(t, sweep.ring - 0.12, sweep.ring) })
          finale(t)
          corner(t)
          star('a', t); star('b', t)
          if (t > T.push && t < T.push + 0.6) sparkBurst(x, t, 540, 940, T.push, { n: 8, R: 120, size: 22, cols: [RED, '#ff8fb1', BONE] })
          if (t > sweep.a) sparkBurst(x, t, 540 + 780 * (ZONE.align - 0.5), 1280, sweep.ring, { n: 10, R: 120, size: 22 })
        }
        x.restore()
        box.update(t)
        for (const [h, o] of heads) h.update(t, outK(t, ...o))
        drawGrain(gx, t)
      },
    }
  }

  // ── the hook kit: frame 0 mid whip zoom + shake; the record scratch / freeze frame on the premise; stickers
  const WHIP = { at: -0.24, len: 0.5, from: 1.7 }
  const SHAKE = { at: 0.02, len: 0.55, amp: 26 }
  const REC = { at: 0.72, len: 1.5, caption: cfg.premise, top: 1480 }
  const CAUGHT = { at: 0.86, ...cfg.caught, out: [REC.at + REC.len - 0.05, REC.at + REC.len + 0.08] }
  const CH = ['how they meet', 'where they clash', `tip for ${NA}`, `tip for ${NB}`, 'how they make it work']
  const SY = 1748
  const STICK = [...B.slice(1).map((b, k) => ({ at: r3(b.S + 0.05), out: [r3(b.S + 3.6), r3(b.S + 3.8)], n: k + 1, title: (C.tips[k].ch || CH[k]), y: SY })),
    { at: r3(fin.S + 0.05), out: [DURATION + 5, DURATION + 6], n: N + 1, title: 'the verdict', y: SY }]
  const PROMISE = { at: 3.3, out: [r3(B[1].S - 0.2), r3(B[1].S)], n: '★', title: cfg.promise || 'wait for the verdict', y: SY, color: '#ff8fb1' }
  const SCENES = [frozen(build, [REC]), whipZoom(WHIP), screenShake(SHAKE), recordScratch(REC), caught(CAUGHT), ...STICK.map(o => chapter(o)), chapter(PROMISE)]

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % 7], gain, i % 2 ? 0.15 : -0.15])
  const nWords = s => s.replace(/[|*]/g, ' ').split(/\s+/).filter(Boolean).length
  const propCues = []
  C.tips.forEach((tp, k) => {
    const b = B[k + 1], at = beatAt(k + 1), p = tp.prop
    propCues.push(['whoosh', r3(b.S + 0.1), 0.4, 0.035], ['boom', r3(b.stamp), 0.18], ['tom', r3(b.stamp), 110, { gain: 0.2, decay: 0.25 }], ['tick', r3(b.stamp), 0.06])
    propCues.push(...wordPops(b.S + 0.05, Math.min(6, nWords(tp.head)), 0.08, k * 2))
    const pings = []
    if (p.type === 'list') p.items.forEach(it => { pings.push(at(it.at)); if (it.mark) pings.push(['mark', at(it.markAt ?? it.at), it.mark]) })
    if (p.type === 'phone') p.msgs.forEach(m => { pings.push(at(m.at)); if (m.del) pings.push(['del', at(m.del)]) })
    if (p.type === 'calendar' && p.hl) pings.push(['mark', at(p.hl.at), 'check'])
    if (p.type === 'clock') { if (p.run) pings.push(['run', at(p.run[0]), at(p.run[1])]); if (p.frames) p.frames.slice(1).forEach(f => pings.push(at(f.at))); if (p.wedgeAt !== undefined) pings.push(['mark', at(p.wedgeAt), 'check']) }
    if (p.type === 'scale') p.seq.forEach(([s]) => pings.push(['tilt', at(s)]))
    if (p.type === 'map') pings.push(['run', ...p.run.map(at)])
    if (p.type === 'gauge') p.seq.forEach(([s]) => pings.push(['run', at(s), at(s) + 0.9]))
    if (p.type === 'note') p.lines.forEach(l => { pings.push(at(l.at)); if (l.strike) pings.push(['del', at(l.strike)]); if (l.check) pings.push(['mark', at(l.check), 'check']) })
    if (p.type === 'card' && p.tear) pings.push(['del', at(p.tear)])
    pings.forEach((q, i) => {
      if (typeof q === 'number') { if (q > b.S + 0.2) propCues.push(['pop', r3(q), NOTE[(i * 2 + k) % 7] * 1.5, 0.03, 0.2]); return }
      const [kind, t0, t1] = q
      if (kind === 'mark') propCues.push(t1 === 'check' ? ['pluck', r3(t0 + 0.1), 1174.66, 0.04, 0.5, 0.1] : ['pop', r3(t0 + 0.05), 392, 0.05, -0.1])
      if (kind === 'del') propCues.push(['whoosh', r3(t0), 0.3, 0.03], ['pop', r3(t0 + 0.2), 440, 0.035, 0])
      if (kind === 'run') propCues.push(['riser', r3(t0), r3(t1), 0.02])
      if (kind === 'tilt') propCues.push(['tick', r3(t0), 0.05], ['pop', r3(t0 + 0.08), 659.25, 0.03, 0])
    })
  })
  const CUES = [
    ['pop', 0.05, 880, 0.03, -0.4], ['glitter', 0.0, 0.4],
    ['boom', r3(T.push), 0.22], ['pop', r3(T.push), 330, 0.05, 0], ['tick', r3(T.push + 0.03), 0.06],
    ...propCues,
    ['riser', r3(sweep.p - 0.1), r3(sweep.a), 0.03], ['pop', r3(sweep.p), 659.25, 0.035, -0.3], ['pop', r3(sweep.u), 880, 0.035, 0], ['pop', r3(sweep.a), 1318.51, 0.045, 0.3],
    ['bell', r3(sweep.ring), 1760, 0.03, 1.0, 0.3], ['glitter', r3(sweep.ring), r3(sweep.ring + 0.4)],
    ['whoosh', r3(fin.S), 0.4, 0.04], ['boom', r3(fin.verdict), 0.22], ['tom', r3(fin.verdict), 110, { gain: 0.22, decay: 0.25 }], ['tick', r3(fin.verdict), 0.06],
    ...wordPops(fin.line, nWords(cfg.last) - 1, 0.12, 2, 0.026), ['pop', r3(fin.land), 1174.66, 0.05, 0], ['pop', r3(fin.land + 0.1), 1567.98, 0.04, 0],
    ['glitter', r3(fin.land), r3(fin.land + 0.6)], ['bell', r3(fin.land + 0.05), 2349.32, 0.025, 1.0, 0],
    ...talkCues(LINES, { cps: CPS }),
    ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...recordScratchCues(REC), ...caughtCues(CAUGHT), ...STICK.flatMap(chapterCues), ...chapterCues(PROMISE),
  ]
  const MUSIC = { ...cfg.music, sections: { drop: r3(LT[1].start), breakdown: [r3(B[N - 1].S)], lift: [r3(fin.S)], outroAt: r3(fin.land) }, hits: [r3(B[1].stamp), r3(sweep.ring), r3(fin.verdict)] }
  return { DURATION, SCENES, CUES, MUSIC, T, B, LINES, S }
}
