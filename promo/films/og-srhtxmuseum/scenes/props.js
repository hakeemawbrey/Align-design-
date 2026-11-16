// srhtxmuseum props — drawings for this film only. Pure f(args); nothing touches `document` at load (images load in build).
//   starFrame / inSprite / tearsCells / sweatCells   (the stlive5th / srhtxhumidity helpers, same maths as startalk.js)
//   drawFacade(x, t, k, colT)   a generic columned museum front (no names, no real building)
//   drawFrame(x, f, a)  ·  drawArt(x, i, f, t, k)  (0 abstract · 1 a BLANK canvas · 2 a fruit bowl)  ·  drawQ(x, f, k, col, t, t0)
//   drawPlacard(x, w, h, label, val, col, opts)  ·  drawBubble(x, txt, k, tailR)  ·  drawFlag(x, px, py, h, t)
//   drawDrape(x, f, up)  ·  drawSpot(x, cx, top, bot, a)  ·  loadImage / prescale / drawCardImg
import { clamp, lerp, ease, hexToRgb } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'

export const INK = '#1b1236'
export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff3d3d', FIRE = '#f0603a', LILAC = '#c9a6ff', SKYB = '#8fd8f6', VELVET = '#b0204a', TEAL = '#2fc79a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2, D2R = Math.PI / 180
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
export const thud = (t, t0, amp = 0.16, k = 7, f = 24) => t > t0 ? amp * Math.exp(-(t - t0) * k) * Math.cos((t - t0) * f) : 0
export function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}

const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)

// ── star transform (mirrors startalk.js drawStarChar)
function hopState(t, hops) {
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
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}

// ── tears (cells): k 1 sniffle · 2 streams · 3 fountains
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let x, y
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
// sweat drops flying off the temples (cells); k = how many (1–3)
export function sweatCells(ctx, t, k = 1) {
  const one = (ph, x0, d) => {
    const i = x0 + d * 4 * ph, j = 11 + 8 * ph * ph - 3 * ph
    ctx.fillStyle = INK; ctx.fillRect(i - 0.3, j - 1.2, 1.8, 2.6)
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j - 0.9, 1.2, 2); ctx.fillStyle = '#fff'; ctx.fillRect(i, j - 0.9, 0.5, 0.5)
  }
  for (let q = 0; q < k; q++) {
    one(((t * 1.6 + q * 0.37) % 1), 28.5, 1)
    if (k > 1) one(((t * 1.6 + q * 0.37 + 0.5) % 1), 6.5, -1)
  }
}

// ── the facade: steps, four columns, a pediment with a little 8-point star. k 0…1 builds it (columns rise in turn)
const COLX = [300, 460, 620, 780], COLTOP = 900, COLBOT = 1300
export function drawFacade(x, t, k, a = 1) {
  if (k <= 0 || a <= 0) return
  x.save(); x.globalAlpha *= a
  ;[[760, 1380], [700, 1340]].forEach(([w, y], i) => { const kk = clamp(k * 4 - i); if (kk <= 0) return; x.beginPath(); x.roundRect(540 - w / 2 * kk, y - 40, w * kk, 40, 8); ink(x, BONE, { w: 6, fa: 0.16, glow: 12 }) })
  COLX.forEach((cx, i) => {
    const kk = easeOutBack(clamp(k * 4 - 1 - i * 0.5), 1.6)
    if (kk <= 0) return
    const h = COLBOT - COLTOP
    x.save(); x.translate(cx, COLBOT); x.scale(1, kk)
    x.beginPath(); x.roundRect(-38, -24, 76, 24, 5); ink(x, BONE, { w: 6, fa: 0.3, glow: 12 })
    x.beginPath(); x.moveTo(-28, -24); x.lineTo(-24, -h + 24); x.lineTo(24, -h + 24); x.lineTo(28, -24); x.closePath(); ink(x, BONE, { w: 6, fa: 0.14, glow: 14, fill: LILAC })
    x.beginPath(); x.roundRect(-44, -h, 88, 24, 5); ink(x, BONE, { w: 6, fa: 0.3, glow: 12 })
    x.restore()
  })
  const pk = clamp(k * 4 - 3)
  if (pk > 0) {
    x.save(); x.translate(540, COLTOP - 380 * (1 - ease.inQuad(pk))); x.globalAlpha *= clamp(pk * 3)
    x.beginPath(); x.roundRect(-330, -56, 660, 56, 6); ink(x, BONE, { w: 7, fa: 0.2, glow: 16 })
    x.beginPath(); x.moveTo(-370, -56); x.lineTo(0, -230); x.lineTo(370, -56); x.closePath(); ink(x, GOLD, { w: 9, fa: 0.16, glow: 22 })
    x.save(); x.translate(0, -120); x.rotate(t * 0.6)
    x.beginPath(); for (let i = 0; i < 16; i++) { const r = i % 2 ? 12 : 32, an = (i / 16) * TAU; x.lineTo(Math.cos(an) * r, Math.sin(an) * r) } x.closePath()
    ink(x, GOLD, { w: 4, fa: 0.6, glow: 20 }); x.restore()
    x.restore()
  }
  x.restore()
}

// ── gallery frames + art (generic shapes; no real artworks)
export function drawFrame(x, f, { a = 1, col = GOLD, wall = 'rgba(14,9,32,0.92)' } = {}) {
  if (a <= 0) return
  const { cx, cy, w, h } = f, b = Math.max(18, w * 0.07)
  x.save(); x.globalAlpha *= a
  x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 30; x.shadowOffsetY = 12
  x.fillStyle = wall; x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  x.beginPath(); x.rect(cx - w / 2 - b, cy - h / 2 - b, w + 2 * b, h + 2 * b); x.rect(cx - w / 2, cy - h / 2, w, h)
  x.fillStyle = rgba(col, 0.22); x.fill('evenodd')
  x.beginPath(); x.rect(cx - w / 2 - b, cy - h / 2 - b, w + 2 * b, h + 2 * b); ink(x, col, { w: 8, fa: 0, glow: 22 })
  x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); ink(x, col, { w: 4, fa: 0, glow: 8 })
  x.fillStyle = col
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.beginPath(); x.arc(cx + sx * (w / 2 + b / 2), cy + sy * (h / 2 + b / 2), b * 0.32, 0, TAU); x.fill() }
  x.restore()
}
const clipIn = (x, f) => { x.beginPath(); x.rect(f.cx - f.w / 2, f.cy - f.h / 2, f.w, f.h); x.clip() }
export function drawArt(x, i, f, t, k) {
  if (k <= 0) return
  x.save(); clipIn(x, f); x.translate(f.cx, f.cy); x.rotate((1 - k) * 2.4); x.scale(k, k)
  const s = f.w / 270
  x.scale(s, s)
  if (i === 0) {
    x.beginPath(); x.arc(-30, -50, 70, 0, TAU); ink(x, FIRE, { w: 7, fa: 0.75, glow: 16 })
    x.beginPath(); x.moveTo(-90, 120); x.lineTo(40, -10); x.lineTo(100, 130); x.closePath(); ink(x, SKYB, { w: 7, fa: 0.55, glow: 14 })
    x.beginPath(); x.moveTo(-110, 40); x.lineTo(110, -120); ink(x, BONE, { w: 8, fa: 0, glow: 10 })
    x.beginPath(); x.arc(70, -110, 18, 0, TAU); ink(x, GOLD, { w: 5, fa: 0.9, glow: 12 })
  } else if (i === 1) {
    // a blank, very serious white canvas
    x.fillStyle = '#f3eee4'; x.fillRect(-135, -200, 270, 400)
    x.fillStyle = 'rgba(0,0,0,0.05)'; x.fillRect(-135, 160, 270, 40)
  } else {
    // a bowl of fruit
    x.beginPath(); x.arc(-45, -10, 42, 0, TAU); ink(x, RED, { w: 6, fa: 0.8, glow: 12 })
    x.beginPath(); x.arc(40, -20, 40, 0, TAU); ink(x, '#ffb347', { w: 6, fa: 0.8, glow: 12 })
    x.beginPath(); x.ellipse(0, -60, 26, 44, 0.5, 0, TAU); ink(x, TEAL, { w: 6, fa: 0.75, glow: 12 })
    x.beginPath(); x.moveTo(-110, 20); x.quadraticCurveTo(0, 150, 110, 20); x.closePath(); ink(x, LILAC, { w: 7, fa: 0.55, glow: 14 })
  }
  x.restore()
}
export function drawQ(x, f, k, col, t, t0) {
  if (k <= 0) return
  x.save(); clipIn(x, f); x.translate(f.cx, f.cy + 8 * Math.sin((t - t0) * 3))
  const sq = thud(t, t0 + 0.32, 0.12)
  x.scale(k * (1 + sq), k * (1 - sq)); x.rotate(-6 * D2R * Math.sin((t - t0) * 2.2))
  x.font = `italic 500 ${Math.round(Math.min(f.h, f.w * 1.3) * 0.85)}px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = col; x.shadowBlur = 30; x.fillStyle = col; x.fillText('?', 0, f.h * 0.04)
  x.restore()
}

/** a museum wall label, centred at (0,0) */
export function drawPlacard(x, w, h, label, val, col, { mark = false } = {}) {
  x.save()
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 26; x.shadowOffsetY = 10
  x.fillStyle = '#f6f1e6'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 12); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  x.strokeStyle = rgba(col, 0.9); x.lineWidth = 5; x.stroke()
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = col; x.font = `700 26px ${MONO}`; x.fillText(label, 0, -h / 2 + 30)
  x.fillStyle = mark ? RED : INK; x.font = mark ? `800 30px ${INTER}` : `italic 600 50px ${SERIF}`
  x.fillText(val, 0, 16)
  x.restore()
}

/** small-talk speech bubble, centred at (0,0) */
export function drawBubble(x, txt, tailR) {
  x.font = `800 52px ${INTER}`
  const w = x.measureText(txt).width + 70, h = 100
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 50)
  const tx = tailR ? w / 2 - 50 : -w / 2 + 50
  x.moveTo(tx - 20, h / 2 - 4); x.lineTo(tx + (tailR ? 20 : -20), h / 2 + 40); x.lineTo(tx + 20, h / 2 - 4)
  x.fillStyle = '#d8d4ea'; x.fill(); ink(x, BONE, { w: 5, fa: 0, glow: 14 })
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 3)
}

/** the tour guide's little flag on a stick: pole foot at (px, py), height h */
export function drawFlag(x, px, py, h, t, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.strokeStyle = BONE; x.lineWidth = 7; x.lineCap = 'round'; x.shadowColor = GOLD; x.shadowBlur = 10
  x.beginPath(); x.moveTo(px, py); x.lineTo(px, py - h); x.stroke(); x.shadowBlur = 0
  const top = py - h, fw = h * 0.42, fh = h * 0.26
  x.beginPath(); x.moveTo(px, top)
  for (let i = 0; i <= 10; i++) { const u = i / 10; x.lineTo(px + fw * u, top + fh * 0.5 * u + 8 * Math.sin(u * 5 - t * 7) * u) }
  for (let i = 10; i >= 0; i--) { const u = i / 10; x.lineTo(px + fw * u, top + fh - fh * 0.5 * u + 8 * Math.sin(u * 5 - t * 7) * u) }
  x.closePath(); x.fillStyle = PINK; x.fill(); x.strokeStyle = BONE; x.lineWidth = 3; x.stroke()
  x.fillStyle = GOLD; x.beginPath(); x.arc(px, top - 6, 9, 0, TAU); x.fill()
  x.restore()
}

/** a velvet drape over frame f; up 0 = closed … 1 = fully lifted */
export function drawDrape(x, f, up) {
  if (up >= 1) return
  const { cx, cy, w, h } = f, b = Math.max(18, w * 0.07)
  const H = (h + 2 * b) * (1 - ease.inOutCubic(clamp(up))), top = cy - h / 2 - b
  if (H <= 1) return
  x.save()
  const g = x.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0)
  for (let i = 0; i <= 8; i++) g.addColorStop(i / 8, i % 2 ? '#7a1032' : VELVET)
  x.fillStyle = g
  x.beginPath(); x.moveTo(cx - w / 2 - b - 6, top)
  x.lineTo(cx + w / 2 + b + 6, top); x.lineTo(cx + w / 2 + b + 6, top + H)
  for (let i = 8; i >= 0; i--) x.lineTo(cx - w / 2 - b - 6 + (w + 2 * b + 12) * i / 8, top + H + (i % 2 ? 18 : 0))
  x.closePath(); x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 20; x.fill(); x.shadowBlur = 0
  x.fillStyle = GOLD; x.fillRect(cx - w / 2 - b - 10, top - 8, w + 2 * b + 20, 14)
  x.restore()
}

/** a soft spotlight cone from above */
export function drawSpot(x, cx, top, bot, w, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, bot); g.addColorStop(0, 'rgba(255,236,190,0.32)'); g.addColorStop(1, 'rgba(255,236,190,0)')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, top); x.lineTo(cx + 40, top); x.lineTo(cx + w / 2, bot); x.lineTo(cx - w / 2, bot); x.closePath(); x.fill()
  x.restore()
}

// ── images (loaded in build only)
export function loadImage(src) {
  return new Promise(res => { const i = new Image(); i.decoding = 'sync'; i.onload = () => res(i); i.onerror = () => res(null); i.src = src })
}
export function prescale(im, w) {
  if (!im) return null
  const h = Math.round(w * im.naturalHeight / im.naturalWidth)
  const mk = (cw, ch) => { const c = document.createElement('canvas'); c.width = cw; c.height = ch; const x = c.getContext('2d'); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'; return [c, x] }
  const [c1, x1] = mk(w * 2, h * 2); x1.drawImage(im, 0, 0, w * 2, h * 2)
  const [c2, x2] = mk(w, h); x2.drawImage(c1, 0, 0, w, h)
  return c2
}
// card-profile-*.png: 1496×2238, body ≈ [120,114,1374,2116]; card-talk-*.png: 732×1170, body ≈ [62,62,670,1108]
export const PROF = { iw: 1496, ih: 2238, body: [120, 114, 1374, 2116] }
export const TALK = { iw: 732, ih: 1170, body: [62, 62, 670, 1108] }
/** draw a card image so its body's height fills `h`, centred at (0,0) */
export function drawCardImg(x, img, spec, h) {
  if (!img) return
  const [bx0, by0, bx1, by1] = spec.body, s = h / (by1 - by0)
  const ox = -((bx0 + bx1) / 2) * s, oy = -((by0 + by1) / 2) * s
  x.drawImage(img, ox, oy, spec.iw * s, spec.ih * s)
}
