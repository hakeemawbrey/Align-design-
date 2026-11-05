// newskit — the shared look of BREAKING NEWS: THE STARS (Month 2 boost, batch m05: kbne01–kbne20).
// Owned by kbne01; kbne02–20 import it read-only. Pure f(t): nothing touches `document` at module top level.
//
// The show: a late-night news desk. THE STARS (gold) anchor at the desk, ♓ Pisces co-anchors and cries at every
// story. Red BREAKING slam, scrolling ticker, chyron, LIVE footage boxes, field reporters with mics, a feelings
// weather wall and an expert panel. No end card, no card cut, no logo: the film ends on its last story frame.
//
// ── API ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//   makeNews(spec) → { DURATION, SCENES, CUES }              the whole film frame (one canvas + DOM type + grain)
//     spec = { id, duration, ep, end: 'cut' | 'loop',
//       heads: [{ text, at, out: [a, b], size, accentSize, accent, top, late, lateAt }]   popText headlines
//       lines: [{ t, speaker, text, color }], box: { y, open, close, height }          dialogue box (startalk)
//       warp(t) → scene time (freeze frames, replays, rewinds; default identity)
//       cam(t) → { z, dx, dy, rot }  (default: the frame-0 whip-out, z 1.32 → 1 over 0.4 s)
//       draw(x, st, K)   scene draw, st = warped time, K = { t (real), shake, loopK, ... }
//       over(x, t, K)    overlay draw in real time on top (stamps, caught circles, chapter stickers)
//       dom(root, K)     optional extra DOM (returns { update(t) })
//       fonts: extra font strings
//       cues: [...] }
//   studio(x, t, { monitor, tint, label })   the back wall + the big monitor (monitor(x, t, rect) draws inside it)
//   desk(x, t, { plaque, mugs })            the desk front (draw after the anchors)
//   anchor(x, t, o) / coanchor(x, t, o)     THE STARS / ♓ Pisces (o.tears 0–3, o.tissue)
//   sign(x, t, id, o) → frame               any sign star (o: x, y, s, mood, look, hops, pop, seed, tears)
//   live(x, t, R, { place, clock, label, draw })  a LIVE footage frame; draw(x, t, R) inside the clip
//   ticker(x, t, { y, items, speed, label })
//   chyron(x, t, { t0, t1, label, text, y })
//   slam(x, t, { t0, land, dock: [a, b] }) → shake   the big BREAKING NEWS slab; docks into the chyron slot
//   papers(x, t, t0, cx, cy)                papers flying off the desk
//   mic(x, t, F, { flag })                  a reporter's mic held on a star (F = starFrame)
//   weather(x, t, R, { icons, title })      the feelings weather wall
//   panel(x, t, { who, talking, y })        THE PANEL: three boxed experts
//   chip(x, X, Y, s, o) · txt(x, s, X, Y, o) · px · bubble(x, t, cx, cy, t0, t1, s, o)
//   tears(x, t, F, k) · caught(x, t, cx, cy, r, t0) · telestrator arrows: arrow(x, ...)
//   stingCues(t) · slamCues(t) · whipCues(t) · scratchCues(t) · freezeCues(t)
//   warpFreeze(t, [a, b]) helpers: freeze(t, at, until) · replay(t, a, b, from, to)
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, STAR, signStar } from '../startalk.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, loopBack, loopCues, chapter, chapterCues, caught as kCaught, caughtCues } from '../hookkit.js'
export { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, loopBack, loopCues, chapter, chapterCues, kCaught, caughtCues }
import { drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK, popOut } from '../sxmail1/scenes/mail.js'

export { drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK, popOut, drawStarChar, signStar, STAR, talkCues, clamp, lerp, prog, ease, easeOutBack, el, drawPixelStar }

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', CYAN = '#7fe0ff', LAV = '#c9a6ff'
export const RED = '#d8203a', RED_D = '#8c0f22', GREEN = '#7be0a0', TEAR = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const W = 1080, H = 1920
export const SCENE = { x0: 0, y0: 470, x1: 1080, y1: 1400 }       // the picture area between the headline and the ticker
export const FULL = { x0: 40, y0: 480, x1: 1040, y1: 1300 }       // a full-frame LIVE shot (chyron + ticker below it)

// ─────────────────────────────────────────────── tiny drawing helpers
export const px = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function txt(x, s, X, Y, { size = 30, weight = 700, font = MONO, color = BONE, align = 'center', alpha = 1, shadow = true, base = 'middle', spacing = 0, maxW } = {}) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = base
  if (spacing && 'letterSpacing' in x) x.letterSpacing = spacing + 'px'
  if (maxW) { const w = x.measureText(s).width; if (w > maxW) { x.translate(X, Y); x.scale(maxW / w, 1); X = 0; Y = 0 } }
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(s, X, Y + Math.max(2, size * 0.08)) }
  x.fillStyle = color; x.fillText(s, X, Y); x.restore()
}
/** a stepped pixel box with an ink outline */
export function box(x, X, Y, w, h, col, { b = 6, ink = INK, hi = null } = {}) {
  px(x, X - b, Y, w + 2 * b, h, ink); px(x, X, Y - b, w, h + 2 * b, ink)
  px(x, X, Y, w, h, col)
  if (hi) px(x, X, Y, w, Math.max(4, b), hi)
}
/** a mono chip: dark pill with coloured text */
export function chip(x, X, Y, s, { size = 26, color = BONE, bg = 'rgba(16,9,38,0.92)', border = null, align = 'center', alpha = 1, k = 1 } = {}) {
  if (alpha <= 0.01 || k <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(s).width + size * 1.1, h = size * 1.6
  const cx = align === 'left' ? X + w / 2 : align === 'right' ? X - w / 2 : X
  x.translate(cx, Y); x.scale(k, k)
  px(x, -w / 2 - 4, -h / 2, w + 8, h, INK); px(x, -w / 2, -h / 2 - 4, w, h + 8, INK)
  px(x, -w / 2, -h / 2, w, h, bg)
  if (border) { px(x, -w / 2, -h / 2, w, 4, border); px(x, -w / 2, h / 2 - 4, w, 4, border) }
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2)
  x.restore()
}
/** a pixel speech bubble that pops at t0 and closes at t1 */
export function bubble(x, t, cx, cy, t0, t1, s, { size = 32, col = BONE, ink = INK, tail = 0, weight = 700, font = INTER, color = INK, maxW = 700 } = {}) {
  const k = pop01(t, t0, 0.24, 2.4) * (t1 == null ? 1 : outK(t, [t1, t1 + 0.18]))
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  // wrap
  const words = s.split(' '), lines = []; let cur = ''
  for (const w of words) { const tr = cur ? cur + ' ' + w : w; if (x.measureText(tr).width > maxW && cur) { lines.push(cur); cur = w } else cur = tr }
  lines.push(cur)
  const lw = Math.max(...lines.map(l => x.measureText(l).width)), lh = size * 1.2
  const w = lw + 44, h = lines.length * lh + 26
  px(x, -w / 2 - 5, -h / 2, w + 10, h, ink); px(x, -w / 2, -h / 2 - 5, w, h + 10, ink)
  px(x, -w / 2, -h / 2, w, h, col)
  const tx = clamp(tail, -1, 1) * (w / 2 - 40)
  px(x, tx - 14, h / 2 + 4, 18, 12, ink); px(x, tx - 10, h / 2, 12, 10, col); px(x, tx - 6, h / 2 + 10, 8, 10, ink); px(x, tx - 4, h / 2 + 8, 4, 6, col)
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 13 + lh * (i + 0.5) + 2))
  x.restore()
}

// ─────────────────────────────────────────────── characters
export function sign(x, t, id, o = {}) {
  const S = id === 'stars' ? { color: STAR.sky, glyph: null } : signStar(id)
  const P = { x: o.x ?? 540, y: o.y ?? 1000, s: o.s ?? 240 }
  const opts = { color: S.color, glyph: o.glyph === false || P.s < 120 ? null : S.glyph, mood: o.mood ?? 'neutral', look: o.look, hops: o.hops, pop: o.pop ?? 1, seed: o.seed ?? 3, glow: o.glow ?? 1, alpha: o.alpha ?? 1, blink: o.blink, squash: o.squash, bob: o.bob, blush: o.blush }
  if (opts.pop <= 0.01 || opts.alpha <= 0.01) return null
  drawStarChar(x, P.x, P.y, P.s, t, opts)
  const F = starFrame(P.x, P.y, P.s, t, { pop: opts.pop, hops: opts.hops, seed: opts.seed, squash: opts.squash || 0, bob: opts.bob })
  if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
  return F
}
export const tears = (x, t, F, k) => { if (F && k) inSprite(x, F, () => tearsCells(x, t, k)) }
export function anchor(x, t, o = {}) { return sign(x, t, 'stars', { x: 300, y: 1050, s: 260, seed: 2, glow: 1.1, ...o }) }
/** ♓ Pisces, co-anchor: always a little bit crying; o.tissue holds a tissue up */
export function coanchor(x, t, o = {}) {
  const F = sign(x, t, 'pisces', { x: 790, y: 1075, s: 220, seed: 6, mood: 'sparkle', look: [-1, 0], tears: 1, ...o })
  if (F && o.tissue) {
    const k = typeof o.tissue === 'number' ? o.tissue : 1
    const wv = Math.sin(t * 9) * 0.15
    x.save(); x.translate(F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.05); x.rotate(-0.3 + wv); x.scale(k, k)
    px(x, -22, -34, 44, 40, INK); px(x, -18, -30, 36, 32, '#ffffff'); px(x, -18, -30, 36, 6, '#e8eefc'); px(x, -4, -46, 12, 18, '#ffffff')
    x.restore()
  }
  return F
}
/** a reporter's mic held up on the star's right point; flag = the mic-flag text */
export function mic(x, t, F, { flag = 'STARS', col = RED, side = 1 } = {}) {
  if (!F) return
  const c = F.cell
  x.save(); x.translate(F.ox + side * F.S * 0.42, F.oy - F.base - F.S * 0.18); x.rotate(side * -0.35 + 0.04 * Math.sin(t * 5))
  px(x, -c * 1.2, -c * 0.2, c * 2.4, c * 9, INK); px(x, -c * 0.7, 0, c * 1.4, c * 8.6, '#3d3658')
  px(x, -c * 2.4, -c * 5.2, c * 4.8, c * 4.6, INK); px(x, -c * 2, -c * 4.8, c * 4, c * 3.8, '#9a94b4'); px(x, -c * 1.2, -c * 4.4, c * 1, c * 1, '#e0dcf0')
  px(x, -c * 2.1, -c * 1.1, c * 4.2, c * 2.4, INK); px(x, -c * 1.8, -c * 0.8, c * 3.6, c * 1.8, col)
  x.font = `800 ${Math.round(c * 1.25)}px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(flag.slice(0, 5), 0, c * 0.15)
  x.restore()
}
/** wind streaks for a field reporter "on the scene" */
export function wind(x, t, R, k = 1) {
  x.save(); x.globalAlpha = 0.35 * k
  for (let i = 0; i < 9; i++) { const p = ((t * 1.3 + i * 0.37) % 1), y = R.y0 + 60 + ((i * 97) % (R.y1 - R.y0 - 120)); px(x, R.x1 - p * (R.x1 - R.x0 + 300), y, 120, 5, BONE) }
  x.restore()
}

// ─────────────────────────────────────────────── the studio
export function studio(x, t, { monitor = null, tint = '#1a1048', label = '★ THE STARS · LIVE AT ELEVEN', mon = { x0: 300, y0: 520, x1: 780, y1: 830 } } = {}) {
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a0620'); g.addColorStop(0.3, tint); g.addColorStop(1, '#07041a')
  x.fillStyle = g; x.fillRect(0, 0, W, H)
  // pixel city skyline backdrop + window lights
  for (let i = 0; i < 14; i++) {
    const bw = 70 + (i * 37) % 50, bh = 160 + (i * 71) % 220, bx = i * 80 - 20, by = 1130 - bh
    px(x, bx, by, bw, bh, '#140c38')
    for (let j = 0; j < 8; j++) { const wx = bx + 12 + (j % 3) * 20, wy = by + 16 + Math.floor(j / 3) * 34; if (((i * 7 + j * 3) % 5) < 2) px(x, wx, wy, 8, 12, 'rgba(255,214,150,0.35)') }
  }
  // studio grid + light beams
  x.fillStyle = 'rgba(127,224,255,0.05)'
  for (let i = 0; i < W; i += 60) x.fillRect(i, 470, 2, 700)
  x.save(); x.globalCompositeOperation = 'lighter'
  for (const [bx, d] of [[160, 1], [920, -1]]) {
    const a = 0.06 + 0.02 * Math.sin(t * 1.3 + bx)
    const gg = x.createLinearGradient(bx, 470, bx + d * 200, 1200); gg.addColorStop(0, `rgba(255,240,210,${a})`); gg.addColorStop(1, 'rgba(255,240,210,0)')
    x.fillStyle = gg; x.beginPath(); x.moveTo(bx - 30, 470); x.lineTo(bx + 30, 470); x.lineTo(bx + d * 260 + 140, 1200); x.lineTo(bx + d * 260 - 140, 1200); x.fill()
  }
  x.restore()
  px(x, 0, 470, W, 8, RED); px(x, 0, 478, W, 3, RED_D)
  // the big monitor
  if (mon) {
    const { x0, y0, x1, y1 } = mon
    px(x, x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20, INK); px(x, x0 - 5, y0 - 5, x1 - x0 + 10, y1 - y0 + 10, '#3a3358')
    x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip()
    px(x, x0, y0, x1 - x0, y1 - y0, '#120a30')
    if (monitor) monitor(x, t, mon)
    for (let j = y0; j < y1; j += 6) px(x, x0, j, x1 - x0, 2, 'rgba(0,0,0,0.22)')
    x.restore()
    // LIVE dot
    const blink = Math.sin(t * 6) > -0.3
    px(x, x0 + 14, y0 + 14, 92, 34, RED); if (blink) px(x, x0 + 22, y0 + 25, 12, 12, '#ffffff')
    txt(x, 'LIVE', x0 + 70, y0 + 32, { size: 22, weight: 800, font: INTER, shadow: false })
  }
  if (label) txt(x, label, 540, 900, { size: 24, color: 'rgba(239,230,214,0.55)', shadow: false, spacing: 4 })
}
export function desk(x, t, { plaque = 'THE STARS · TONIGHT', y0 = 1150, y1 = 1400, mugs = true } = {}) {
  x.save()
  x.beginPath(); x.moveTo(40, y0); x.lineTo(1040, y0); x.lineTo(1080, y1); x.lineTo(0, y1); x.closePath(); x.fillStyle = INK; x.fill()
  x.beginPath(); x.moveTo(48, y0 + 8); x.lineTo(1032, y0 + 8); x.lineTo(1070, y1); x.lineTo(10, y1); x.closePath()
  const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#3b2370'); g.addColorStop(1, '#170d3c'); x.fillStyle = g; x.fill()
  x.restore()
  px(x, 40, y0, 1000, 14, '#6a4fb0'); px(x, 40, y0, 1000, 4, '#9a84dc')
  px(x, 60, y0 + 60, 960, 10, RED)
  txt(x, plaque, 540, y0 + 125, { size: 34, color: GOLD, weight: 700, spacing: 6 })
  if (mugs) {
    // a mug (left) and the co-anchor's tissue box (right)
    px(x, 140, y0 - 52, 54, 56, INK); px(x, 144, y0 - 48, 46, 48, BONE); px(x, 190, y0 - 36, 14, 24, INK); px(x, 150, y0 - 40, 34, 6, RED)
    for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * p) * 0.6; px(x, 160 + Math.sin(p * 9 + i) * 8, y0 - 60 - p * 60, 6, 6, BONE); x.globalAlpha = 1 }
    px(x, 890, y0 - 50, 110, 54, INK); px(x, 894, y0 - 46, 102, 46, '#8fd0ff'); px(x, 894, y0 - 46, 102, 8, '#c9ecff')
    px(x, 930, y0 - 72, 30, 30, '#ffffff'); px(x, 926, y0 - 64, 8, 18, '#ffffff')
  }
}
/** papers flung off the desk at t0, flying out and fluttering down */
export function papers(x, t, t0, cx = 540, cy = 1150, n = 7) {
  const dt = t - t0
  if (dt < -0.3 || dt > 2.4) return
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i - (n - 1) / 2) * 0.42, v = 900 + (i * 137) % 400
    const tt = Math.max(0, dt + 0.3)
    const X = cx + Math.cos(a) * v * tt * 0.7, Y = cy + Math.sin(a) * v * tt + 900 * tt * tt
    const r = tt * (3 + i) * (i % 2 ? 1 : -1)
    x.save(); x.translate(X, Y); x.rotate(r); x.scale(1, 0.6 + 0.4 * Math.cos(tt * 7 + i))
    px(x, -34, -44, 68, 88, INK); px(x, -30, -40, 60, 80, '#f4ecd8')
    for (let j = 0; j < 5; j++) px(x, -22, -28 + j * 13, 44 - (j % 2) * 12, 4, '#b8ae98')
    x.restore()
  }
}

// ─────────────────────────────────────────────── LIVE footage, chyron, ticker, slam
export function live(x, t, R, { place = '', clock = '', label = 'LIVE', draw = null, bg = '#1a1442', border = BONE } = {}) {
  const { x0, y0, x1, y1 } = R
  px(x, x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20, INK); px(x, x0 - 5, y0 - 5, x1 - x0 + 10, y1 - y0 + 10, border)
  x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip()
  px(x, x0, y0, x1 - x0, y1 - y0, bg)
  if (draw) draw(x, t, R)
  // camera-feed chrome: scanlines + corner brackets
  for (let j = y0; j < y1; j += 6) px(x, x0, j, x1 - x0, 1, 'rgba(0,0,0,0.16)')
  x.restore()
  for (const [cx, cy, dx, dy] of [[x0 + 24, y0 + 24, 1, 1], [x1 - 24, y0 + 24, -1, 1], [x0 + 24, y1 - 24, 1, -1], [x1 - 24, y1 - 24, -1, -1]]) {
    px(x, cx - (dx < 0 ? 40 : 0), cy - (dy < 0 ? 5 : 0), 40, 5, 'rgba(255,255,255,0.7)'); px(x, cx - (dx < 0 ? 5 : 0), cy - (dy < 0 ? 40 : 0), 5, 40, 'rgba(255,255,255,0.7)')
  }
  if (label) {
    const blink = Math.sin(t * 6) > -0.3
    px(x, x0 + 40, y0 + 40, 110, 40, RED); if (blink) px(x, x0 + 50, y0 + 54, 12, 12, '#fff')
    txt(x, label, x0 + 104, y0 + 61, { size: 24, weight: 800, font: INTER, shadow: false })
  }
  if (place) chip(x, x1 - 40, y0 + 60, place, { size: 22, align: 'right', color: BONE })
  if (clock) chip(x, x0 + 40, y1 - 56, clock, { size: 24, align: 'left', color: GOLD })
}
export function chyron(x, t, { t0 = 0, t1 = 1e9, label = 'BREAKING', text = '', y = 1310, h = 84, col = RED, size = 34 } = {}) {
  const k = ease.outCubic(prog(t, t0, t0 + 0.3)), o = 1 - ease.inCubic(prog(t, t1, t1 + 0.25))
  if (k <= 0 || o <= 0) return
  x.save(); x.globalAlpha = o
  const lw = 250
  const lx = lerp(-lw - 40, 30, easeOutBack(prog(t, t0, t0 + 0.3), 1.6))
  px(x, 0, y - 6, W, h + 12, INK)
  const ww = (W - 30 - lw) * k
  px(x, 30 + lw, y, ww, h, BONE)
  x.save(); x.beginPath(); x.rect(30 + lw, y, ww, h); x.clip()
  txt(x, text, 30 + lw + 24, y + h / 2 + 2, { size, weight: 800, font: INTER, color: INK, align: 'left', shadow: false, maxW: W - lw - 110 })
  x.restore()
  px(x, lx, y, lw, h, col); px(x, lx, y, lw, 6, '#ff5a6e')
  txt(x, label, lx + lw / 2, y + h / 2 + 2, { size: label.length > 9 ? 26 : 32, weight: 800, font: INTER, shadow: false, spacing: 2 })
  x.restore()
}
export function ticker(x, t, { y = 1410, items = [], speed = 150, label = 'LATEST', h = 62, alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha = alpha
  px(x, 0, y, W, h, '#120a2e'); px(x, 0, y, W, 4, GOLD); px(x, 0, y + h - 4, W, 4, '#2a1f55')
  const s = items.join('   ✦   ') + '   ✦   '
  x.font = `700 28px ${MONO}`
  const sw = x.measureText(s).width
  const off = (t * speed) % sw
  x.save(); x.beginPath(); x.rect(190, y, W - 190, h); x.clip()
  for (let k = 0; k < 3; k++) txt(x, s, 200 + k * sw - off, y + h / 2 + 2, { size: 28, color: BONE, align: 'left', shadow: false })
  x.restore()
  px(x, 0, y, 186, h, GOLD); txt(x, label, 93, y + h / 2 + 2, { size: 24, weight: 800, font: INTER, color: INK, shadow: false, spacing: 2 })
  x.restore()
}
/** the big BREAKING NEWS slab: slams in (t0 → land), shakes, then docks into the chyron slot (dock) */
export function slam(x, t, { t0 = -0.15, land = 0.15, dock = [1.0, 1.3], y = 1000, text = 'BREAKING NEWS', sub = null, dockY = 1310 } = {}) {
  if (t > dock[1]) return
  const p = prog(t, t0, land)
  const sIn = lerp(1.6, 0.86, ease.inCubic(p))
  const d = ease.inOutCubic(prog(t, dock[0], dock[1]))
  const sc = lerp(sIn, 0.38, d), cy = lerp(y, dockY + 42, d), cx = lerp(540, 155, d)
  const rot = lerp(-0.14, -0.03, ease.inCubic(p)) * (1 - d) + 0.02 * Math.sin(t * 20) * Math.exp(-Math.max(0, t - land) * 6) * (1 - d)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc); x.globalAlpha = clamp(p * 4) * (1 - prog(t, dock[1] - 0.05, dock[1]))
  const w = 980, h = 220
  px(x, -w / 2 - 10, -h / 2 - 10, w + 20, h + 20, INK)
  px(x, -w / 2, -h / 2, w, h, RED)
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
  for (let i = -10; i < 12; i++) { x.save(); x.translate(i * 110 + ((t * 400) % 110), 0); x.rotate(0.5); px(x, -18, -300, 36, 600, 'rgba(255,255,255,0.07)'); x.restore() }
  x.restore()
  px(x, -w / 2, -h / 2, w, 12, '#ff5a6e'); px(x, -w / 2, h / 2 - 12, w, 12, RED_D)
  txt(x, text, 0, sub ? -18 : 6, { size: 120, weight: 900, font: INTER, color: '#ffffff', spacing: 2, maxW: w - 60 })
  if (sub) txt(x, sub, 0, 72, { size: 36, weight: 700, color: '#ffe3e6', shadow: false, spacing: 4 })
  x.restore()
  return t > land && t < land + 0.35 ? 22 * Math.exp(-(t - land) * 11) * Math.sin((t - land) * 70) : 0
}

// ─────────────────────────────────────────────── segments: weather wall, panel
/** the feelings forecast: a pixel map + icons. icons: [{ x, y, kind: 'cloud'|'sun'|'heart'|'rain'|'fog'|'bolt'|'star', label, at }] */
export function weather(x, t, R, { icons = [], title = 'FEELINGS FORECAST', front = null } = {}) {
  const { x0, y0, x1, y1 } = R
  const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#1d3f8a'); g.addColorStop(1, '#0f2456'); x.fillStyle = g; x.fillRect(x0, y0, x1 - x0, y1 - y0)
  // a blobby pixel landmass
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 + 30
  for (let j = -9; j <= 9; j++) for (let i = -15; i <= 15; i++) {
    const r = Math.hypot(i / 15, j / 9) + 0.18 * Math.sin(i * 0.9 + j * 1.3) + 0.12 * Math.cos(j * 2.1 - i * 0.4)
    if (r < 0.95) px(x, cx + i * 28 - 14, cy + j * 28 - 14, 27, 27, r < 0.82 ? '#3f9a6a' : '#2f7a54')
  }
  if (front) {   // a front line with pixel triangles
    const k = prog(t, front.at, front.at + 1.2)
    x.save(); x.beginPath(); x.rect(x0, y0, (x1 - x0) * k + x0 - x0 + 1, y1 - y0); x.clip()
    for (let i = 0; i < 14; i++) { const fx = x0 + 60 + i * ((x1 - x0 - 120) / 13), fy = cy + Math.sin(i * 0.7 + t) * 40 - 80; px(x, fx - 20, fy, 40, 8, front.col || LAV); px(x, fx - 10, fy - 16, 20, 16, front.col || LAV) }
    x.restore()
    if (front.label) chip(x, cx, cy - 150, front.label, { size: 24, color: front.col || LAV, k: pop01(t, front.at + 0.3, 0.3, 2) })
  }
  for (const ic of icons) {
    const k = pop01(t, ic.at ?? 0, 0.3, 2.4)
    if (k <= 0.01) continue
    weatherIcon(x, t, ic.x, ic.y + 6 * Math.sin(t * 2 + ic.x), ic.kind, 7 * k)
    if (ic.label) chip(x, ic.x, ic.y + 86, ic.label, { size: 22, k, color: ic.col || BONE })
  }
  px(x, x0, y0, x1 - x0, 64, 'rgba(10,6,30,0.85)')
  txt(x, title, (x0 + x1) / 2, y0 + 34, { size: 30, weight: 800, font: INTER, color: GOLD, spacing: 4 })
}
const ICONS = {
  cloud: ['...CCCC.....', '..CCCCCC.CC.', '.CCCCCCCCCCC', 'CCCCCCCCCCCC', 'CCCCCCCCCCCC', '.CCCCCCCCCC.'],
  sun: ['.....S.....', '..S..S..S..', '...SSSSS...', '..SSSSSSS..', 'SSSSSSSSSSS', '..SSSSSSS..', '...SSSSS...', '..S..S..S..', '.....S.....'],
  heart: ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'],
  rain: ['...CCCC.....', '..CCCCCC.CC.', 'CCCCCCCCCCCC', '.CCCCCCCCCC.', '............', '.T..T..T..T.', 'T..T..T..T..'],
  fog: ['FFFFFFFF....', '...FFFFFFFFF', 'FFFFFFFFF...', '..FFFFFFFFFF'],
  bolt: ['....YYY', '...YYY.', '..YYYY.', '.YYYYYY', '...YYY.', '..YY...', '.Y.....'],
  star: ['...G...', '...G...', 'GGGGGGG', '.GGGGG.', '.GG.GG.', 'G.....G'],
  q: ['.QQQQ.', 'QQ..QQ', '....QQ', '...QQ.', '..QQ..', '......', '..QQ..'],
}
export function weatherIcon(x, t, cx, cy, kind, cell = 7) {
  const bm = ICONS[kind] || ICONS.cloud
  drawBits(x, bm, { C: '#e8eefc', S: '#ffd23a', H: '#ff4f86', T: TEAR, F: '#b8c0e0', Y: '#ffe27a', G: GOLD, Q: BONE }, cx, cy, cell)
  if (kind === 'rain') for (let i = 0; i < 4; i++) { const p = (t * 1.4 + i / 4) % 1; px(x, cx - 30 + i * 20, cy + 30 + p * 40, 5, 10, TEAR) }
}
/** THE PANEL: three experts in boxes. who: [{ id, name, mood }], talking = index or -1 */
export function panel(x, t, { who = [], talking = -1, y = 620, h = 420, at = 0, title = 'THE PANEL' } = {}) {
  const n = who.length, bw = (W - 80 - (n - 1) * 24) / n
  txt(x, title, 540, y - 50, { size: 34, weight: 800, font: INTER, color: GOLD, spacing: 6, alpha: clamp(prog(t, at, at + 0.3)) })
  who.forEach((w, i) => {
    const k = pop01(t, at + i * 0.12, 0.3, 2)
    if (k <= 0.01) return
    const bx = 40 + i * (bw + 24)
    x.save(); x.translate(bx + bw / 2, y + h / 2); x.scale(k, k); x.translate(-(bx + bw / 2), -(y + h / 2))
    const on = i === talking
    px(x, bx - 8, y - 8, bw + 16, h + 16, on ? GOLD : INK); px(x, bx - 3, y - 3, bw + 6, h + 6, INK)
    const g = x.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, ['#2a1c5e', '#16335e', '#3a1c4a'][i % 3]); g.addColorStop(1, '#0d0828'); x.fillStyle = g; x.fillRect(bx, y, bw, h)
    for (let j = 0; j < 6; j++) px(x, bx + 14 + j * (bw - 28) / 6, y + 30, (bw - 28) / 6 - 8, 60, 'rgba(255,255,255,0.04)')   // bookshelf
    sign(x, t, w.id, { x: bx + bw / 2, y: y + h * 0.62, s: Math.min(190, bw * 0.75), mood: w.mood || (on ? 'happy' : 'neutral'), look: w.look, hops: w.hops, seed: 11 + i, tears: w.tears })
    px(x, bx, y + h - 64, bw, 64, 'rgba(10,6,30,0.9)')
    txt(x, w.name, bx + bw / 2, y + h - 31, { size: 24, weight: 800, font: INTER, color: on ? GOLD : BONE, maxW: bw - 16 })
    x.restore()
  })
}

// ─────────────────────────────────────────────── annotation (telestrator)
export function caught(x, t, cx, cy, r, t0, { col = '#ff2a3a', w = 12, t1 = 1e9 } = {}) {
  const k = prog(t, t0, t0 + 0.35), o = outK(t, [t1, t1 + 0.2])
  if (k <= 0 || o <= 0) return
  x.save(); x.globalAlpha = o; x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'
  x.beginPath()
  const a0 = -2.2, a1 = a0 + Math.PI * 2.15 * ease.outCubic(k)
  for (let a = a0; a <= a1; a += 0.05) { const rr = r * (1 + 0.05 * Math.sin(a * 3)); const X = cx + Math.cos(a) * rr, Y = cy + Math.sin(a) * rr * 0.8; a === a0 ? x.moveTo(X, Y) : x.lineTo(X, Y) }
  x.stroke(); x.restore()
}
export function arrow(x, t, ax, ay, bx, by, t0, { col = '#ffe27a', w = 12, t1 = 1e9 } = {}) {
  const k = ease.outCubic(prog(t, t0, t0 + 0.3)), o = outK(t, [t1, t1 + 0.2])
  if (k <= 0 || o <= 0) return
  const ex = lerp(ax, bx, k), ey = lerp(ay, by, k)
  x.save(); x.globalAlpha = o; x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'
  x.beginPath(); x.moveTo(ax, ay); x.quadraticCurveTo((ax + ex) / 2 + 40, (ay + ey) / 2 - 40, ex, ey); x.stroke()
  if (k > 0.9) { const a = Math.atan2(ey - ay, ex - ax); x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex - 40 * Math.cos(a - 0.5), ey - 40 * Math.sin(a - 0.5)); x.moveTo(ex, ey); x.lineTo(ex - 40 * Math.cos(a + 0.5), ey - 40 * Math.sin(a + 0.5)); x.stroke() }
  x.restore()
}
/** a stamp that slams on at t0 (big → 1 with a rotation) */
export function stamp(x, t, cx, cy, s, t0, { col = RED, size = 64, rot = -0.12, t1 = 1e9, bg = null } = {}) {
  const p = prog(t, t0, t0 + 0.14), o = outK(t, [t1, t1 + 0.2])
  if (p <= 0 || o <= 0) return
  const sc = lerp(2.4, 1, ease.inCubic(p))
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc); x.globalAlpha = clamp(p * 3) * o
  x.font = `900 ${size}px ${INTER}`
  const w = x.measureText(s).width + size * 0.8, h = size * 1.45
  if (bg) px(x, -w / 2, -h / 2, w, h, bg)
  x.strokeStyle = col; x.lineWidth = size * 0.11; x.strokeRect(-w / 2, -h / 2, w, h)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, size * 0.05)
  x.restore()
}

// ─────────────────────────────────────────────── time warps (freeze frames, replays)
/** scene time that freezes at `at` from `at` until `until`, then continues (shifted so nothing jumps) */
export const freeze = (t, at, until) => t < at ? t : t < until ? at : t - (until - at)
/** compose several freezes: list of [at, until] in real time */
export function warpFreezes(t, list) { let shift = 0; for (const [a, b] of list) { if (t < a) break; if (t < b) return a - shift; shift += b - a } return t - shift }

// ─────────────────────────────────────────────── chapter sticker (long films) + freeze-frame overlay
export function chapterSticker(x, t, { n, title, at, out }) {
  const k = pop01(t, at, 0.35, 2.6) * outK(t, [out, out + 0.25])
  if (k <= 0.01) return
  x.save(); x.translate(880, 560); x.rotate(0.08 + 0.03 * Math.sin((t - at) * 6) * Math.exp(-(t - at) * 2)); x.scale(k, k)
  const w = 330, h = 120
  px(x, -w / 2 - 6, -h / 2 + 8, w + 12, h, 'rgba(6,4,18,0.5)')
  px(x, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, INK); px(x, -w / 2, -h / 2, w, h, GOLD)
  px(x, -w / 2, -h / 2, 90, h, RED)
  txt(x, String(n), -w / 2 + 45, 4, { size: 64, weight: 900, font: INTER, shadow: false })
  txt(x, 'CHAPTER', 45, -26, { size: 20, weight: 800, font: INTER, color: INK, shadow: false, spacing: 4 })
  txt(x, title, 45, 16, { size: 30, weight: 900, font: INTER, color: INK, shadow: false, maxW: w - 110 })
  x.restore()
}
/** freeze-frame chrome: desaturating wash, a pause glyph and a label, between a and b */
export function freezeFx(x, t, a, b, label = '') {
  if (t < a || t > b) return
  const k = 1 - ease.inQuad(prog(t, b - 0.12, b))
  x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#b8c0e0'; x.globalCompositeOperation = 'saturation'; x.fillRect(0, 0, W, H); x.restore()
  x.save(); x.globalAlpha = 0.12 * k; x.fillStyle = '#ffffff'; x.fillRect(0, 0, W, H); x.restore()
  px(x, 60, 500, 22, 64, BONE); px(x, 96, 500, 22, 64, BONE)
  if (label) chip(x, 140, 532, label, { size: 26, align: 'left', color: GOLD, alpha: k })
}
export function flash(x, t, at, { col = '#ffffff', d = 0.18 } = {}) {
  const dt = t - at; if (dt < 0 || dt > d) return
  x.save(); x.globalAlpha = 0.85 * (1 - dt / d); x.fillStyle = col; x.fillRect(0, 0, W, H); x.restore()
}
/** whip blur streaks (k 0–1) */
export function whipStreaks(x, t, k, { dir = 1, col = 'rgba(255,255,255,0.28)' } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 26; i++) { const y = 470 + ((i * 131) % 930), len = 200 + (i * 53) % 400, xx = ((i * 211 + t * 3000 * dir) % 1400) - 200; px(x, xx, y, len, 4 + (i % 3) * 2, col) }
  x.restore()
}

// ─────────────────────────────────────────────── sound cue builders (pitched ones are moved into the score's key)
export const stingCues = (t, g = 1) => [['boom', t, 0.22 * g], ['tom', t, 98, { gain: 0.25 * g, decay: 0.3 }], ['bell', t + 0.02, 1760, 0.03 * g, 1.2, 0], ['bell', t + 0.16, 1318.51, 0.025 * g, 1.0, 0.2], ['bell', t + 0.3, 1567.98, 0.025 * g, 1.2, -0.2]]
export const slamCues = (t, g = 1) => [['boom', t, 0.3 * g], ['tom', t, 82, { gain: 0.3 * g, decay: 0.35 }], ['tick', t, 0.08 * g], ['crash', t, { gain: 0.05 * g }]]
export const whipCues = (t, g = 1) => [['whoosh', t, 0.3, 0.06 * g]]
export const scratchCues = (t) => [['tapeStop', t, 0.35], ['tick', t, 0.07], ['pop', t + 0.02, 220, 0.04, 0], ['pop', t + 0.08, 180, 0.035, 0.1]]
export const freezeCues = (t) => [['tick', t, 0.09], ['bell', t, 2349.32, 0.02, 0.6, 0]]
export const popCue = (t, f = 880, g = 0.035, pan = 0) => ['pop', +t.toFixed(3), f, g, pan]
export const sobCues = (t, n = 3) => Array.from({ length: n }, (_, i) => ['pluck', +(t + i * 0.22).toFixed(3), [987.77, 880, 739.99][i % 3], 0.03, 0.4, 0.4])
export const tickerCues = () => []

// ─────────────────────────────────────────────── the film frame
const BUG_DOT = ['.RR.', 'RRRR', 'RRRR', '.RR.']
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '58px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  b.dataset.hookcam = 'off'
  const ic = el('canvas', { width: '24px', height: '24px', imageRendering: 'pixelated' }, b); ic.width = 24; ic.height = 24
  drawBits(ic.getContext('2d'), BUG_DOT, { R: '#ff3a4e' }, 12, 12, 4.4)
  el('div', { font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    'BREAKING&nbsp;NEWS<span style="color:rgba(255,255,255,0.62);letter-spacing:0.14em">&nbsp;:&nbsp;THE&nbsp;STARS</span>')
  return { update(t) { ic.style.opacity = Math.sin(t * 5) > -0.2 ? '1' : '0.35' } }
}

/** default camera: frame 0 is mid whip-out (z 1.32 → 1 by 0.42 s) */
export const whipOut = (t, t0 = 0, d = 0.42, z0 = 1.32) => ({ z: lerp(z0, 1, ease.outCubic(prog(t, t0, t0 + d))), dx: 0, dy: lerp(-40, 0, ease.outCubic(prog(t, t0, t0 + d))), rot: lerp(-0.025, 0, ease.outCubic(prog(t, t0, t0 + d))) })

/** heads → kit slam titles; cuts → kit whip zooms (frame 0 is mid-whip); recs → kit record scratches (the scene clock
 *  freezes during each, via spec.warp or the default); end: 'loop' → kit loopBack of the frame-0 picture.
 *  spec.fx / spec.fxCues: any extra hookkit builders + their cues. */
export function makeNews(spec) {
  const D = spec.duration
  const CPS = spec.cps || 28
  const loopLen = spec.loopLen || 0.4
  const HEADS = (spec.heads || []).map(h => ({ at: h.at ?? -1, text: h.text, top: h.top ?? 215, size: h.size ?? 92, accentSize: h.accentSize, accentColor: h.accent || GOLD, out: h.out || null, gap: h.gap ?? 0.07, shake: 8 }))
  const WHIPS = [{ at: -0.06, len: 0.42, from: 1.22, blur: 2.5, flash: 0.15, cy: 900 }, ...(spec.cuts || []).map(c => ({ at: c, len: 0.34, from: 1.3, blur: 10, flash: 0.25 }))]
  const RECS = (spec.recs || []).map(r => ({ len: 1.2, top: 1180, ...r }))
  const warp = spec.warp || (t => warpFreezes(t, RECS.map(r => [r.at, r.at + r.len])))
  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "900 120px Inter", "700 30px Inter", "600 30px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 28px 'Space Mono'", ...(spec.fonts || [])].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const boxes = (spec.boxes || (spec.lines ? [{ lines: spec.lines, ...(spec.box || {}) }] : [])).map(b => dialogueBox(root, { lines: b.lines, y: b.y ?? 1490, height: b.height ?? 250, width: 960, open: b.open, close: b.close, cps: CPS, size: b.size ?? 46 }))
    const K = { D, x, root }
    const extra = spec.dom ? spec.dom(root, K) : null
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: -1e9, end: 1e9, root,
      update(t) {
        const st = warp(t)
        const cam = spec.cam ? spec.cam(t) : { z: 1, dx: 0, dy: 0, rot: 0 }
        Object.assign(K, { t, st, cam })
        x.setTransform(1, 0, 0, 1, 0, 0)
        x.fillStyle = '#05040c'; x.fillRect(0, 0, W, H)
        drawSky(x, t, SKY_H)
        const sh = (spec.shake ? spec.shake(t) : 0)
        x.save()
        x.translate(540 + (cam.dx || 0), 935 + (cam.dy || 0) + sh); x.rotate(cam.rot || 0); x.scale(cam.z || 1, cam.z || 1); x.translate(-540, -935)
        spec.draw(x, st, K)
        x.restore()
        if (spec.over) spec.over(x, t, K)
        for (const b of boxes) b.update(t)
        if (extra) extra.update(t)
        drawGrain(gx, t)
      },
    }
  }
  async function bugScene(stage) {
    const w = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none' }, stage); w.dataset.hookcam = 'off'
    const bug = buildBug(w)
    return { start: -1e9, end: 1e9, root: w, update(t) { bug.update(t) } }
  }
  const frame0 = [build, whipZoom(WHIPS[0]), bugScene, ...HEADS.filter(h => h.at <= 0).map(h => slamTitle(h))]
  const SCENES = [build, ...WHIPS.map(w => whipZoom(w)), ...RECS.map(r => recordScratch(r)), ...(spec.fx || []), ...HEADS.map(h => slamTitle(h)), bugScene]
  if (spec.end === 'loop') SCENES.push(loopBack(frame0, { duration: D, len: loopLen }))
  const cues = [
    ...(spec.lines ? talkCues(spec.lines, { cps: CPS }) : []), ...(spec.boxes ? spec.boxes.flatMap(b => talkCues(b.lines, { cps: CPS })) : []),
    ...WHIPS.flatMap(w => whipZoomCues(w)), ...RECS.flatMap(r => recordScratchCues(r)), ...HEADS.flatMap(h => slamTitleCues(h)),
    ...(spec.end === 'loop' ? loopCues({ duration: D, len: loopLen }) : []),
    ...(spec.fxCues || []), ...(spec.cues || []),
  ].filter(c => typeof c[1] !== 'number' || (c[1] >= 0 && c[1] < D))
  return { DURATION: D, SCENES, CUES: cues }
}

/** camera with a whip-out at 0 plus a punch-in settle after each cut (cuts: times) */
export function cutCam(t, cuts = [], { amp = 0.16, z0 = 1.32 } = {}) {
  const c = whipOut(t, 0, 0.42, z0)
  for (const k of cuts) { const dt = t - k; if (dt >= 0 && dt < 0.5) { const e = Math.exp(-dt * 9); c.z += amp * e; c.rot += 0.02 * e * Math.sin(k * 7) } }
  return c
}
/** whip streaks around each cut (draw in over) */
export function cutStreaks(x, t, cuts = []) { for (const k of cuts) { const dt = t - k; if (dt > -0.12 && dt < 0.16) whipStreaks(x, t, 1 - Math.abs(dt) / 0.16, { dir: Math.sin(k * 3) > 0 ? 1 : -1 }) } }

/** a big pixel phone with a short thread (no scroll). msgs: [{ at, side: 'L'|'R', text, time }]; typing: [a, b] (left side);
 *  returns the centre of each visible bubble (for caught circles) */
export function phone(x, t, { cx = 540, cy = 900, w = 600, h = 760, title = '', msgs = [], typing = null, s = 1, rot = 0, font = 34, status = '', glow = 0 } = {}) {
  const out = []
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.translate(-w / 2, -h / 2)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w); g.addColorStop(0, `rgba(120,170,255,${0.25 * glow})`); g.addColorStop(1, 'rgba(120,170,255,0)'); x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w * 2, h * 2); x.restore() }
  const C = 10
  px(x, C, 0, w - 2 * C, h, INK); px(x, 0, C, w, h - 2 * C, INK)
  px(x, 2 * C, C, w - 4 * C, h - 2 * C, '#3a2d74'); px(x, C, 2 * C, w - 2 * C, h - 4 * C, '#3a2d74')
  const sx0 = 3 * C, sy0 = 3 * C, sw = w - 6 * C, sh = h - 6 * C
  px(x, sx0, sy0, sw, sh, '#120c2a')
  const HH = 96
  px(x, sx0, sy0, sw, HH, '#1f1747'); px(x, sx0 + sw / 2 - 44, sy0, 88, 12, INK)
  txt(x, title, sx0 + sw / 2, sy0 + HH / 2 + 6, { size: font * 0.9, weight: 800, font: INTER, shadow: false })
  if (status) txt(x, status, sx0 + sw / 2, sy0 + HH - 14, { size: 18, color: GREEN, shadow: false })
  x.font = `600 ${font}px ${INTER}`
  const maxW = sw * 0.76, pad = 20, lh = font * 1.24
  let y = sy0 + HH + 30
  for (const m of msgs) {
    const words = m.text.split(' '), lines = []; let cur = ''
    x.font = `600 ${font}px ${INTER}`
    for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr).width > maxW - 2 * pad && cur) { lines.push(cur); cur = wd } else cur = tr }
    lines.push(cur)
    const bw = Math.min(maxW, Math.max(...lines.map(l => x.measureText(l).width)) + 2 * pad), bh = lines.length * lh + pad * 1.1
    if (t >= m.at) {
      const k = pop01(t, m.at, 0.22, 2.2)
      const bx = m.side === 'L' ? sx0 + 22 : sx0 + sw - 22 - bw
      x.save(); x.translate(m.side === 'L' ? bx : bx + bw, y + bh); x.scale(k, k); x.translate(m.side === 'L' ? 0 : -bw, -bh)
      x.fillStyle = m.col || (m.side === 'L' ? '#3b3466' : '#4f8df0'); x.fillRect(4, 0, bw - 8, bh); x.fillRect(0, 4, bw, bh - 8)
      x.fillStyle = BONE; x.font = `600 ${font}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
      lines.forEach((l, i) => x.fillText(l, pad, pad * 0.55 + (i + 0.82) * lh))
      x.restore()
      if (m.time) txt(x, m.time, m.side === 'L' ? bx + 6 : bx + bw - 6, y + bh + 22, { size: 20, color: 'rgba(239,230,214,0.6)', align: m.side === 'L' ? 'left' : 'right', shadow: false })
      out.push({ x: cx + (bx + bw / 2 - w / 2) * s, y: cy + (y + bh / 2 - h / 2) * s, w: bw * s, h: bh * s, tx: cx + ((m.side === 'L' ? bx + 50 : bx + bw - 50) - w / 2) * s, ty: cy + (y + bh + 22 - h / 2) * s })
    }
    y += bh + (m.time ? 52 : 20)
  }
  if (typing && t >= typing[0] && t < typing[1]) {
    px(x, sx0 + 22, y, 120, 58, '#3b3466')
    for (let i = 0; i < 3; i++) { const on = Math.floor((t - typing[0]) * 8) % 3 === i; px(x, sx0 + 22 + 24 + i * 28, y + 22, 14, 14, on ? BONE : '#8a83b8') }
  }
  x.restore()
  return out
}
/** a night street with a lit building; win = window where someone stands (returns its centre) */
export function street(x, t, R, { lit = 0.5, sky = '#140d3a' } = {}) {
  const { x0, y0, x1, y1 } = R
  const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, sky); g.addColorStop(1, '#2a1c55'); x.fillStyle = g; x.fillRect(x0, y0, x1 - x0, y1 - y0)
  for (let i = 0; i < 30; i++) { const sx = x0 + (i * 173) % (x1 - x0), sy = y0 + (i * 97) % 220; if (Math.sin(t * 2 + i) > -0.4) px(x, sx, sy, 4, 4, 'rgba(255,255,255,0.6)') }
  // buildings
  const B = [[x0 - 20, 330, '#21184a'], [x0 + 230, 520, '#2b1f5c'], [x0 + 560, 430, '#231a50'], [x0 + 800, 300, '#1d1544']]
  for (const [bx, bh, c] of B) {
    px(x, bx, y1 - 140 - bh, 300, bh, c)
    for (let j = 0; j < 12; j++) { const wx = bx + 30 + (j % 4) * 66, wy = y1 - 140 - bh + 40 + Math.floor(j / 4) * 90; if (wy < y1 - 170) px(x, wx, wy, 34, 44, ((j * 5 + bx) % 3) < 1 + lit ? 'rgba(255,214,150,0.55)' : 'rgba(0,0,0,0.25)') }
  }
  px(x, x0, y1 - 140, x1 - x0, 140, '#3a3060'); px(x, x0, y1 - 140, x1 - x0, 8, '#5a4f88')
  for (let i = 0; i < 6; i++) px(x, x0 + i * 190 + ((t * 0) % 190), y1 - 70, 90, 8, 'rgba(239,230,214,0.3)')
  // a lamp post
  px(x, x0 + 70, y1 - 560, 14, 420, INK); px(x, x0 + 50, y1 - 580, 60, 26, INK); px(x, x0 + 56, y1 - 574, 48, 14, '#ffe6a0')
  x.save(); x.globalCompositeOperation = 'lighter'; const lg = x.createRadialGradient(x0 + 80, y1 - 560, 10, x0 + 80, y1 - 560, 260); lg.addColorStop(0, 'rgba(255,230,160,0.25)'); lg.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = lg; x.fillRect(x0 - 200, y1 - 820, 560, 560); x.restore()
}
/** a big lit window frame at (cx, cy), w × h; draw(x) paints what's inside (clipped) */
export function windowFrame(x, cx, cy, w, h, draw, { col = 'rgba(255,214,150,0.9)' } = {}) {
  px(x, cx - w / 2 - 12, cy - h / 2 - 12, w + 24, h + 24, INK); px(x, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12, '#5a4f88')
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip()
  const g = x.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, '#ffd99a'); g.addColorStop(1, '#e8a868'); x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  void col
  if (draw) draw(x)
  x.restore()
  px(x, cx - 4, cy - h / 2, 8, h, '#5a4f88'); px(x, cx - w / 2, cy - 4, w, 8, '#5a4f88')
}

/** the whole desk shot in one call.
 *  o: { monitor, a: anchor opts, p: co-anchor opts, chyron: chyron opts | null, slam: slam opts | null, papers: t0 | null, plaque, label } */
export function deskShot(x, t, o = {}) {
  studio(x, t, { monitor: o.monitor, label: o.label })
  anchor(x, t, o.a || {})
  coanchor(x, t, o.p || {})
  desk(x, t, { plaque: o.plaque })
  if (o.papers != null) papers(x, t, o.papers)
  if (o.chyron) chyron(x, t, o.chyron)
  if (o.slam) slam(x, t, o.slam)
}
/** fill a monitor / LIVE rect with a soft room gradient */
export function room(x, R, { top = '#2a1d5c', bot = '#3d2a6e', floor = null } = {}) {
  const g = x.createLinearGradient(0, R.y0, 0, R.y1); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(R.x0, R.y0, R.x1 - R.x0, R.y1 - R.y0)
  if (floor) { const fy = R.y0 + (R.y1 - R.y0) * 0.78; px(x, R.x0, fy, R.x1 - R.x0, R.y1 - fy, floor); px(x, R.x0, fy, R.x1 - R.x0, 6, 'rgba(255,255,255,0.12)') }
}
/** a cosy living room inside R (sofa, lamp, plant, framed picture) */
export function livingRoom(x, t, R, { wall = '#3b2a6a', lamp = true } = {}) {
  room(x, R, { top: wall, bot: '#2a1d55', floor: '#4a3470' })
  const fy = R.y0 + (R.y1 - R.y0) * 0.78
  // picture frame + window
  px(x, R.x0 + 90, R.y0 + 120, 170, 130, INK); px(x, R.x0 + 98, R.y0 + 128, 154, 114, '#7a5fb8'); px(x, R.x0 + 120, R.y0 + 190, 110, 40, '#3f9a6a')
  // sofa
  px(x, R.x0 + 60, fy - 170, 560, 60, INK); px(x, R.x0 + 66, fy - 164, 548, 50, '#c45a7a'); px(x, R.x0 + 40, fy - 120, 600, 130, INK); px(x, R.x0 + 46, fy - 114, 588, 118, '#d86a8a')
  // lamp
  if (lamp) {
    const lx = R.x1 - 150
    px(x, lx - 6, fy - 320, 12, 320, INK); px(x, lx - 60, fy - 400, 120, 90, INK); px(x, lx - 54, fy - 394, 108, 78, '#ffe6a0')
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(lx, fy - 360, 10, lx, fy - 360, 300); g.addColorStop(0, 'rgba(255,230,160,0.22)'); g.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = g; x.fillRect(lx - 300, fy - 660, 600, 600); x.restore()
  }
  // plant
  px(x, R.x0 + 700, fy - 70, 70, 70, INK); px(x, R.x0 + 706, fy - 64, 58, 58, '#c4703a')
  for (let i = 0; i < 5; i++) { const a = -1.2 + i * 0.6 + 0.05 * Math.sin(t * 2 + i); x.save(); x.translate(R.x0 + 735, fy - 70); x.rotate(a); px(x, -8, -110, 16, 110, '#3f9a6a'); x.restore() }
}

/** the long films' promise strip ("stay for the 11:59 update") under the headline, between a and b (real time) */
export function promise(x, t, s, [a, b], { y = 456 } = {}) {
  const k = pop01(t, a, 0.35, 2.4) * outK(t, [b, b + 0.25])
  if (k <= 0.01) return
  const blink = Math.sin(t * 6) > -0.2
  chip(x, 540, y, (blink ? '▶ ' : '  ') + s, { size: 36, color: INK, bg: GOLD, k })
}
/** kit chapter sticker opts for the long films (top-left of the picture, up for 2.8 s) */
export const chap = (at, n, title) => ({ at, out: [at + 2.6, at + 2.9], n, title, x: 40, y: 488 })
