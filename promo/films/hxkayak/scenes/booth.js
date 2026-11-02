// DATE NIGHT RECAP — the sportscast booth shared by sxrecapbowl, sxrecapcook and sxrecapgolf (each film keeps its own
// copy of this file, so the three episodes share one look without a shared module). Pure functions of their arguments;
// nothing touches `document` at load (showBug() is called from build()).
//
//   GEO                              the layout: the jumbotron (screen + low-res picture grid), the desk, the booth stars, Pisces.
//   showBug(root)                    the show bug, top-left: a blinking red dot + "DATE NIGHT RECAP" (Inter 800 small caps).
//   drawLights(ctx, t)               two stadium light towers in the far sky with soft beams.
//   drawJumbo(ctx, t, opts)          the jumbotron frame: steel, chase bulbs, cables, the STAR CAM plate (screen drawn by the film).
//   drawDeskFront(ctx, x0, x1, y, h) the booth desk with the DATE NIGHT RECAP band.
//   screenFx(ctx, t, ...)            scanlines + vignette + glare over the screen.
//   liveBug / replayBug / vhs        the on-screen LIVE pill, the ▶ REPLAY · SLO-MO label, rewind lines.
//   statBox(ctx, t, items)           the STAT lower third: a red STAT tab + a joke (never a number). items [[t0, t1, text]].
//   teleCircle / teleArrow / teleTag the yellow telestrator marks, drawn on over time.
//   bigBanner(ctx, t, t0, text, sub) a gold slab that slams across the screen ("PLAY OF THE NIGHT").
//   pennant(ctx, x, y, t)            Pisces' little GO pennant.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawPixelStar } from '../../sky.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', RED = '#e8344e', MINT = '#46cf82', CYAN = '#7fe0ff', TELE = '#ffe14a'
export const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

export const GEO = {
  MON: { x0: 96, y0: 470, w: 888, h: 624 },            // the jumbotron body
  SCR: { sx0: 120, sy0: 494, sw: 840, sh: 560 },       // the screen
  LW: 168, LH: 112, PS: 5,                              // the low-res picture: 168 × 112 at 5 px
  DESK: { x0: 120, x1: 960, y: 1384, h: 96 },
  G: { x: 300, y: 1272, s: 250 }, S: { x: 780, y: 1272, s: 250 },
  PIS: { x: 930, y: 432, s: 128 },
  MIC: { x: 540, y: 1384 },
}
export const SX = lx => GEO.SCR.sx0 + lx * GEO.PS
export const SY = ly => GEO.SCR.sy0 + ly * GEO.PS

const stepRect = (ctx, x, y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }

/** the show bug (DOM): call in build(); returns { update(t) } */
export function showBug(root, { at = 0.3 } = {}) {
  const box = el('div', { position: 'absolute', left: '56px', top: '52px', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: INTER, fontWeight: 800, fontSize: '27px', letterSpacing: '0.16em', fontVariant: 'small-caps', color: '#ffffff', textShadow: '0 2px 12px rgba(6,4,18,0.9)', opacity: 0, lineHeight: 1 }, root)
  const dot = el('span', { display: 'inline-block', width: '16px', height: '16px', background: RED, boxShadow: `0 0 10px ${RED}` }, box)
  el('span', {}, box, 'date night <span style="color:' + GOLD + '">recap</span>')
  return {
    update(t, out = 1) {
      const k = prog(t, at, at + 0.4)
      box.style.opacity = String(k * out)
      box.style.transform = `translateX(${((1 - ease.outCubic(k)) * -30).toFixed(1)}px)`
      dot.style.opacity = Math.floor(t * 1.6) % 2 === 0 ? '1' : '0.25'
    },
  }
}

/** stadium light towers in the far sky (behind everything) */
export function drawLights(ctx, t, k = 1) {
  if (k <= 0) return
  ctx.save(); ctx.globalAlpha = k * 0.75
  for (const [cx, dir] of [[150, 1], [930, -1]]) {
    const top = 400
    // beams
    const fl = 0.85 + 0.15 * Math.sin(t * 1.3 + cx)
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createLinearGradient(cx, top, cx + dir * 360, top + 900)
    g.addColorStop(0, `rgba(255,236,190,${0.11 * fl})`); g.addColorStop(1, 'rgba(255,236,190,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 40, top); ctx.lineTo(cx + 40, top); ctx.lineTo(cx + dir * 520 + 160, top + 1000); ctx.lineTo(cx + dir * 260 - 160, top + 1000); ctx.fill()
    ctx.restore()
    // pole
    ctx.fillStyle = INK; ctx.fillRect(cx - 8, top + 30, 16, 520); ctx.fillStyle = '#3a3358'; ctx.fillRect(cx - 4, top + 30, 8, 520)
    // lamp head: a 4×3 grid of bulbs
    ctx.fillStyle = INK; ctx.fillRect(cx - 62, top - 40, 124, 82)
    ctx.fillStyle = '#2c2f4c'; ctx.fillRect(cx - 56, top - 34, 112, 70)
    for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) {
      const on = 0.8 + 0.2 * Math.sin(t * 3 + i + j * 2)
      ctx.fillStyle = `rgba(255,244,210,${on})`; ctx.fillRect(cx - 50 + i * 26, top - 28 + j * 22, 20, 16)
    }
  }
  ctx.restore()
}

/** the jumbotron (body, cables, chase bulbs, plate); the film draws the screen inside GEO.SCR afterwards */
export function drawJumbo(ctx, t, { plate = 'STAR CAM', chase = 1, flash = 0 } = {}) {
  const M = GEO.MON, P = 8, cx = M.x0 + M.w / 2
  // cables up out of frame
  ctx.fillStyle = INK
  for (const dx of [-300, 300]) { ctx.fillRect(cx + dx - 6, 0, 12, M.y0); ctx.fillStyle = '#5d6288'; ctx.fillRect(cx + dx - 2, 0, 4, M.y0); ctx.fillStyle = INK }
  // body
  stepRect(ctx, M.x0 - P, M.y0 - P, M.w + 2 * P, M.h + 2 * P, P, INK)
  stepRect(ctx, M.x0, M.y0, M.w, M.h, P, '#2a2e48')
  ctx.fillStyle = '#41476c'; ctx.fillRect(M.x0 + 2 * P, M.y0 + P, M.w - 4 * P, P / 2)
  ctx.fillStyle = '#1a1c30'; ctx.fillRect(M.x0 + 2 * P, M.y0 + M.h - P * 1.5, M.w - 4 * P, P / 2)
  // chase bulbs along the top and bottom rims
  const n = 30
  for (const yy of [M.y0 + 6, M.y0 + M.h - 18]) for (let i = 0; i < n; i++) {
    const bx = M.x0 + 24 + i * (M.w - 48) / (n - 1)
    const on = flash > 0 ? (Math.floor(t * 10) % 2 === 0) : ((i + Math.floor(t * 6 * chase)) % 3 === 0)
    ctx.fillStyle = INK; ctx.fillRect(bx - 6, yy - 1, 12, 12)
    ctx.fillStyle = on ? '#fff1b8' : '#7a6230'; ctx.fillRect(bx - 4, yy + 1, 8, 8)
  }
  // screen well
  const S = GEO.SCR
  ctx.fillStyle = '#05040c'; ctx.fillRect(S.sx0 - 6, S.sy0 - 6, S.sw + 12, S.sh + 12)
  // the plate on top
  ctx.font = `700 26px ${MONO}`
  const tw = ctx.measureText(plate).width + 64, ph = 46, py = M.y0 - ph - 6
  stepRect(ctx, cx - tw / 2 - 6, py - 6, tw + 12, ph + 12, 6, INK)
  stepRect(ctx, cx - tw / 2, py, tw, ph, 6, RED)
  ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(cx - tw / 2 + 12, py + 4, tw - 24, 3)
  ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(plate, cx, py + ph / 2 + 2)
}

/** the booth desk with the show band */
export function drawDeskFront(ctx, x0, x1, y, h, t = 0) {
  const P = 8
  stepRect(ctx, x0 - P, y - P, x1 - x0 + 2 * P, h + 2 * P, P, INK)
  stepRect(ctx, x0, y, x1 - x0, h, P, '#2c1f4e')
  ctx.fillStyle = GOLD; ctx.fillRect(x0 + P, y, x1 - x0 - 2 * P, P)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x0 + 3 * P, y, 8 * P, P / 2)
  // the band
  const by = y + 2 * P + 4, bh = h - 4 * P - 4
  ctx.fillStyle = RED; ctx.fillRect(x0 + 3 * P, by, x1 - x0 - 6 * P, bh)
  ctx.fillStyle = '#b8203a'; ctx.fillRect(x0 + 3 * P, by + bh - 6, x1 - x0 - 6 * P, 6)
  ctx.font = `700 34px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = INK; ctx.fillText('DATE NIGHT RECAP', (x0 + x1) / 2 + 3, by + bh / 2 + 3)
  ctx.fillStyle = '#ffffff'; ctx.fillText('DATE NIGHT RECAP', (x0 + x1) / 2, by + bh / 2)
  for (const sx of [x0 + 7 * P, x1 - 7 * P]) drawPixelStar(ctx, sx, by + bh / 2, 30, 2, GOLD)
}

/** scanlines + vignette + glare (call with the screen clip active) */
export function screenFx(ctx) {
  const { sx0, sy0, sw, sh } = GEO.SCR
  ctx.fillStyle = 'rgba(0,0,0,0.12)'
  for (let yy = sy0; yy < sy0 + sh; yy += 5) ctx.fillRect(sx0, yy, sw, 2)
  const vg = ctx.createRadialGradient(sx0 + sw / 2, sy0 + sh / 2, sh * 0.38, sx0 + sw / 2, sy0 + sh / 2, sw * 0.7)
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.45)'); ctx.fillStyle = vg; ctx.fillRect(sx0, sy0, sw, sh)
  const gg = ctx.createLinearGradient(sx0, sy0, sx0 + sw * 0.6, sy0 + sh * 0.6)
  gg.addColorStop(0, 'rgba(255,255,255,0.1)'); gg.addColorStop(0.45, 'rgba(255,255,255,0.02)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = gg; ctx.fillRect(sx0, sy0, sw, sh)
}

export function pill(ctx, X, Y, w, h, bg, txt, col, fs = 26) {
  const P = 4
  ctx.fillStyle = INK; ctx.fillRect(X + P, Y - P, w - 2 * P, h + 2 * P); ctx.fillRect(X - P, Y + P, w + 2 * P, h - 2 * P); ctx.fillRect(X, Y, w, h)
  ctx.fillStyle = bg; ctx.fillRect(X + P, Y, w - 2 * P, h); ctx.fillRect(X, Y + P, w, h - 2 * P)
  ctx.font = `700 ${fs}px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(txt, X + 16, Y + h / 2 + 1)
}

/** ● LIVE, top-right of the screen */
export function liveBug(ctx, t, k = 1) {
  if (k <= 0) return
  const { sx0, sy0, sw } = GEO.SCR
  ctx.save(); ctx.translate(sx0 + sw - 166, sy0 + 20); ctx.scale(k, k)
  pill(ctx, 0, 0, 142, 42, RED, '  LIVE', '#ffffff', 26)
  if (Math.floor(t * 1.6) % 2 === 0) { ctx.fillStyle = '#ffffff'; ctx.fillRect(16, 14, 14, 14) }
  ctx.restore()
}
/** ◀◀ REWIND / ▶ REPLAY / ❚❚ labels, top-right, + blinking SLO-MO under it */
export function replayBug(ctx, t, label, slomo = false) {
  const { sx0, sy0, sw } = GEO.SCR
  ctx.font = `700 32px ${MONO}`; ctx.textAlign = 'right'; ctx.textBaseline = 'top'
  ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillText(label, sx0 + sw - 27, sy0 + 25); ctx.fillStyle = '#ffffff'; ctx.fillText(label, sx0 + sw - 30, sy0 + 22)
  if (slomo && Math.floor(t * 2.5) % 2 === 0) { ctx.font = `700 26px ${MONO}`; ctx.fillStyle = TELE; ctx.fillText('SLO-MO', sx0 + sw - 30, sy0 + 64) }
}
export function vhs(ctx, t, rew) {
  const { sx0, sy0, sw, sh } = GEO.SCR
  ctx.fillStyle = 'rgba(70,110,220,0.14)'; ctx.fillRect(sx0, sy0, sw, sh)
  const r = rng(Math.floor(t * 24) + 7), nb = rew ? 7 : 2
  for (let i = 0; i < nb; i++) {
    const yy = sy0 + ((t * (rew ? 900 : 140) + i * 173 + r() * 30) % sh)
    ctx.fillStyle = `rgba(255,255,255,${rew ? 0.28 : 0.12})`; ctx.fillRect(sx0, yy, sw, rew ? 6 : 3)
    for (let k = 0; k < 10; k++) { ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(sx0 + r() * sw, yy - 4 + r() * 8, 12 + r() * 40, 2) }
  }
}

/** the STAT lower third: items = [[t0, t1, text], …] (jokes only, never numbers) */
export function statBox(ctx, t, items) {
  const cur = items.find(([a, b]) => t >= a && t < b)
  if (!cur) return
  const [a, b, txt] = cur
  const k = easeOutBack(prog(t, a, a + 0.3), 1.8) * (1 - ease.inQuad(prog(t, b - 0.2, b)))
  if (k <= 0.01) return
  const { sx0, sy0, sw, sh } = GEO.SCR
  const y = sy0 + sh - 74, h = 52, x0 = sx0 + 24, w = sw - 48
  ctx.save(); ctx.translate(x0, y + h / 2); ctx.scale(1, k); ctx.translate(-x0, -(y + h / 2))
  ctx.fillStyle = INK; ctx.fillRect(x0 - 4, y - 4, w + 8, h + 8)
  ctx.fillStyle = 'rgba(14,10,34,0.96)'; ctx.fillRect(x0, y, w, h)
  ctx.fillStyle = RED; ctx.fillRect(x0, y, 118, h)
  ctx.fillStyle = GOLD; ctx.fillRect(x0 + 118, y, 6, h)
  ctx.font = `700 28px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#ffffff'; ctx.fillText('STAT', x0 + 59, y + h / 2 + 2)
  const shown = txt.slice(0, Math.floor(clamp(prog(t, a + 0.15, a + 0.15 + txt.length / 40)) * txt.length + 0.5))
  ctx.font = `700 25px ${MONO}`; ctx.textAlign = 'left'; ctx.fillStyle = BONE; ctx.fillText(shown, x0 + 144, y + h / 2 + 2)
  ctx.restore()
}

/** telestrator: a hand-drawn yellow loop, drawn on over 0.35 s from t0 (stays until out) */
export function teleCircle(ctx, t, t0, cx, cy, rx, ry, { seed = 0, out = null } = {}) {
  const p = prog(t, t0, t0 + 0.35)
  if (p <= 0) return
  const o = out ? 1 - prog(t, out[0], out[1]) : 1
  if (o <= 0) return
  ctx.save(); ctx.globalAlpha = o; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  const a0 = -2.2, a1 = a0 + p * Math.PI * 2.15
  for (const [lw, col] of [[14, INK], [8, TELE]]) {
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath()
    for (let a = a0; a <= a1; a += 0.08) { const w = 1 + 0.07 * Math.sin(a * 2.3 + seed); const px = cx + Math.cos(a) * rx * w, py = cy + Math.sin(a) * ry * w; a === a0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py) }
    ctx.stroke()
  }
  ctx.restore()
}
/** telestrator arrow from (x0, y0) to (x1, y1), drawn on over 0.3 s */
export function teleArrow(ctx, t, t0, x0, y0, x1, y1, { out = null } = {}) {
  const p = ease.outCubic(prog(t, t0, t0 + 0.3))
  if (p <= 0) return
  const o = out ? 1 - prog(t, out[0], out[1]) : 1
  if (o <= 0) return
  const ex = lerp(x0, x1, p), ey = lerp(y0, y1, p), ang = Math.atan2(y1 - y0, x1 - x0)
  ctx.save(); ctx.globalAlpha = o; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  for (const [lw, col] of [[14, INK], [8, TELE]]) {
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + ex) / 2 + 20, (y0 + ey) / 2 - 30, ex, ey); ctx.stroke()
    if (p > 0.9) { ctx.beginPath(); ctx.moveTo(ex - 28 * Math.cos(ang - 0.5), ey - 28 * Math.sin(ang - 0.5)); ctx.lineTo(ex, ey); ctx.lineTo(ex - 28 * Math.cos(ang + 0.5), ey - 28 * Math.sin(ang + 0.5)); ctx.stroke() }
  }
  ctx.restore()
}
/** a scribbled telestrator word (yellow, ink outline), pops at t0 */
export function teleTag(ctx, t, t0, txt, cx, cy, { size = 36, rot = -0.08, out = null } = {}) {
  const k = easeOutBack(prog(t, t0, t0 + 0.28), 2.6)
  if (k <= 0) return
  const o = out ? 1 - prog(t, out[0], out[1]) : 1
  if (o <= 0) return
  ctx.save(); ctx.globalAlpha = o; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.lineWidth = size * 0.24; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.strokeText(txt, 0, 0); ctx.fillStyle = TELE; ctx.fillText(txt, 0, 0)
  ctx.restore()
}

/** a gold slab that slams across the middle of the screen */
export function bigBanner(ctx, t, t0, text, sub = null, { y = null, out = null, col = GOLD } = {}) {
  const p = prog(t, t0, t0 + 0.22)
  if (p <= 0) return
  const o = out ? 1 - ease.inQuad(prog(t, out[0], out[1])) : 1
  if (o <= 0) return
  const { sx0, sy0, sw, sh } = GEO.SCR
  const cy = y ?? sy0 + sh * 0.42, land = t - t0 - 0.22
  const sc = p < 1 ? lerp(2.2, 1, ease.inCubic(p)) : 1 + 0.08 * Math.exp(-land * 8) * Math.cos(land * 28)
  ctx.save(); ctx.globalAlpha = clamp(p * 3) * o; ctx.translate(sx0 + sw / 2, cy); ctx.rotate(-0.06); ctx.scale(sc, sc)
  const w = 700, h = sub ? 150 : 110
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(-w / 2 + 10, -h / 2 + 8, w - 20, 5)
  const sh2 = (t * 1.3) % 2.2 - 0.6
  if (sh2 > 0 && sh2 < 1) { ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); const sx = -w / 2 + sh2 * w; ctx.moveTo(sx, -h / 2); ctx.lineTo(sx + 40, -h / 2); ctx.lineTo(sx, h / 2); ctx.lineTo(sx - 40, h / 2); ctx.fill() }
  ctx.font = `700 52px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = INK
  ctx.fillText(text, 0, sub ? -22 : 3)
  if (sub) { ctx.font = `700 26px ${MONO}`; ctx.fillText(sub, 0, 40) }
  ctx.restore()
}

/** Pisces' pennant on a stick, held at (x, y) (the stick's foot), waving */
export function pennant(ctx, x, y, t, k = 1, txt = 'GO') {
  if (k <= 0) return
  const w = Math.sin(t * 5) * 0.12
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.35 + w); ctx.scale(k, k)
  ctx.fillStyle = INK; ctx.fillRect(-4, -130, 8, 130); ctx.fillStyle = '#d8c7a0'; ctx.fillRect(-2, -128, 4, 126)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(2, -136); ctx.lineTo(96, -108); ctx.lineTo(2, -80); ctx.fill()
  ctx.fillStyle = PINK; ctx.beginPath(); ctx.moveTo(4, -130); ctx.lineTo(84, -108); ctx.lineTo(4, -86); ctx.fill()
  ctx.font = `700 20px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#ffffff'; ctx.fillText(txt, 12, -107)
  ctx.restore()
}

/** one pixel playing card (face down: the Align star back is NOT used, just a plain lavender back with a star) */
export function miniCard(ctx, cx, cy, w, { rot = 0, sx = 1, face = null, k = 1 } = {}) {
  if (k <= 0) return
  const h = w * 1.5
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(sx * k, k)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, 14); ctx.fill()
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#4a2c96'); g.addColorStop(1, '#22134e')
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 10); ctx.fill()
  ctx.strokeStyle = GOLD; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16, 8); ctx.stroke()
  if (face) {
    ctx.fillStyle = BONE; ctx.font = `700 ${Math.round(w * 0.13)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    face.forEach((s, i) => ctx.fillText(s, 0, (i - (face.length - 1) / 2) * w * 0.2))
  } else drawPixelStar(ctx, 0, 0, w * 0.42, 2, GOLD)
  ctx.restore()
}
