// stgym props: pixel drawings on canvas ("Love Gym.", Star Talk Wild Lessons #22). Pure draw calls, crisp rects.
//   starAt(x, y, size, t, o)            the geometry drawStarChar uses (bob, breathe, hops, squash) → at(ci, cj) in screen px,
//                                       so accessories (sweatbands, the barbell, the whistle) ride the star exactly
//   drawBarbell(ctx, cx, y, o)          a side-view pixel barbell: plates stacked on each sleeve + a hanging weight tag
//   drawSweatband(ctx, s, col, stripe)  a terry headband across a star's forehead (s = starAt(...))
//   drawWhistle(ctx, s, t, blowing)     a coach whistle on a lanyard
//   drawTreadmill(ctx, x, y, t, speed)  Pisces' treadmill (belt, rails, a console that reads CRY CARDIO)
//   drawNeon(ctx, x, y, t, k)           the flickering "LOVE GYM" neon sign
//   drawBoard(ctx, x, y, w, h, o)       the rep counter LED board
//   drawNotif(ctx, cx, y, k, who, text) a phone notification pill
//   drawTear / drawSweat / drawPixelHeart / drawDumbbell / makeTalkCard / bitmap / rgba
import { clamp, lerp } from '../../../src/lib.js'

const OUT = '#14102a'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ─────────────────────────────── star geometry (mirrors startalk.js drawStarChar)
const G = 36, HALF = 18, SCY = 19.6, SCR = 17.6
const FOOT_ROW = SCY + SCR * Math.cos(Math.PI / 5)
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
export function starAt(x, y, size, t, { squash = 0, hops = null, seed = 1, pop = 1, bob } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sx = 1 + sq, sy = 1 - sq * 0.9
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  const at = (ci, cj) => [Math.round(x) + sx * (ci - HALF) * cell, Math.round(cy + base) + sy * ((cj - HALF) * cell - base)]
  return { at, cell, sx, sy, top: at(18, 2.4), L: at(13, 19), R: at(23, 19), mouth: at(18, 23.5), cy }
}

// ─────────────────────────────── the barbell (side view). o: { half, plates, plateH, tag, tagCol, tagSub, k, rot, bend, alpha, plateCol }
export function drawBarbell(ctx, cx, y, { half = 280, plates = 2, plateH = 170, tag = '', tagCol = '#f2c75c', tagSub = '', rot = 0, bend = 0, alpha = 1, plateCol = '#2b2450', rim = '#ff5d8f', scale = 1 } = {}) {
  if (alpha <= 0 || scale <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(cx, y); ctx.rotate(rot); ctx.scale(scale, scale)
  const P = 6
  // the bar (bends a little under a heavy load: drawn as short segments)
  const seg = 24, barH = 14
  const by = u => bend * (u / (half + 70)) ** 2   // the ends sag by `bend`, the centre stays
  for (let u = -half - 70; u < half + 70; u += seg) {
    const yy = by(u + seg / 2)
    R(ctx, u - 1, yy - barH / 2 - P / 2, seg + 2, barH + P, OUT)
  }
  for (let u = -half - 70; u < half + 70; u += seg) {
    const yy = by(u + seg / 2)
    R(ctx, u, yy - barH / 2, seg, barH, '#c9c3dc'); R(ctx, u, yy - barH / 2, seg, 4, '#f4f0ff')
  }
  // knurl marks
  for (let u = -60; u <= 60; u += 20) R(ctx, u - 2, by(u) - barH / 2, 4, barH, '#9b93b8')
  // plates on each sleeve
  for (const side of [-1, 1]) {
    const yy = by(side * half)
    for (let i = 0; i < plates; i++) {
      const h = plateH * (1 - i * 0.12), w = 30
      const px = side * (half - 40 + i * (w + 6)) - w / 2
      R(ctx, px - P, yy - h / 2 - P, w + 2 * P, h + 2 * P, OUT)
      R(ctx, px, yy - h / 2, w, h, plateCol)
      R(ctx, px, yy - h / 2, 8, h, '#4a4180')
      R(ctx, px, yy - h / 2 + 10, w, 6, rim); R(ctx, px, yy + h / 2 - 16, w, 6, rim)
    }
    // collar
    const cxl = side * (half - 40 - 22) - 8
    R(ctx, cxl - 4, yy - 22, 24, 44, OUT); R(ctx, cxl, yy - 18, 16, 36, '#8b84a8')
  }
  // the weight tag hanging off the bar's middle-left (a string + a gold tag)
  if (tag) {
    ctx.font = `700 34px ${MONO}`
    const tw = ctx.measureText(tag).width
    ctx.font = `700 22px ${MONO}`
    const sw = tagSub ? ctx.measureText(tagSub).width : 0
    const w = Math.max(tw, sw) + 44, h = tagSub ? 92 : 64
    const ty = -barH / 2 - 26 - h
    R(ctx, -3, ty + h, 6, 26, OUT)
    R(ctx, -w / 2 - P, ty - P, w + 2 * P, h + 2 * P, OUT)
    R(ctx, -w / 2, ty, w, h, '#1d1240')
    R(ctx, -w / 2, ty, w, 6, tagCol); R(ctx, -w / 2, ty + h - 6, w, 6, tagCol)
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.font = `700 34px ${MONO}`; ctx.fillStyle = tagCol; ctx.fillText(tag, 0, ty + (tagSub ? 34 : h / 2 + 1))
    if (tagSub) { ctx.font = `700 22px ${MONO}`; ctx.fillStyle = 'rgba(239,230,214,0.75)'; ctx.fillText(tagSub, 0, ty + 68) }
  }
  ctx.restore()
}

// a small dumbbell (the "it gets lighter" payoff)
export function drawDumbbell(ctx, cx, cy, s, rot = 0, col = '#ff8fb1') {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot)
  const P = 5 * s
  R(ctx, -40 * s, -6 * s - P, 80 * s, 12 * s + 2 * P, OUT); R(ctx, -40 * s, -6 * s, 80 * s, 12 * s, '#c9c3dc')
  for (const sd of [-1, 1]) { const x0 = sd * 44 * s - 14 * s; R(ctx, x0 - P, -30 * s - P, 28 * s + 2 * P, 60 * s + 2 * P, OUT); R(ctx, x0, -30 * s, 28 * s, 60 * s, col); R(ctx, x0, -30 * s, 7 * s, 60 * s, '#ffd0de') }
  ctx.restore()
}

// ─────────────────────────────── a terry headband across a star's forehead
export function drawSweatband(ctx, s, col = '#ff5d6c', stripe = '#efe6d6', { tails = true, t = 0 } = {}) {
  const c = s.cell
  const [lx, ly] = s.at(9.6, 14.6), [rx] = s.at(26.4, 14.6)
  const h = c * 2.3 * s.sy
  R(ctx, lx - c * 0.6, ly - c * 0.6, rx - lx + c * 1.2, h + c * 1.2, OUT)
  R(ctx, lx, ly, rx - lx, h, col)
  R(ctx, lx, ly + h * 0.38, rx - lx, Math.max(2, h * 0.24), stripe)
  if (tails) {
    // two little knot tails flicking out on the left
    const fl = Math.sin(t * 9) * c * 0.5
    R(ctx, lx - c * 2.4, ly + c * 0.2 + fl, c * 2.2, c * 1.1, OUT); R(ctx, lx - c * 2.1, ly + c * 0.45 + fl, c * 1.7, c * 0.6, col)
    R(ctx, lx - c * 2.0, ly + c * 1.5 - fl, c * 2.0, c * 1.1, OUT); R(ctx, lx - c * 1.7, ly + c * 1.75 - fl, c * 1.5, c * 0.6, col)
  }
}

// a whistle on a lanyard (blowing: in the mouth, cheeks puffed by the caller)
export function drawWhistle(ctx, s, t, blowing) {
  const c = s.cell
  const [mx, my] = s.mouth
  const [nx, ny] = s.at(18, 26.5)
  const wx = blowing ? mx + c * 0.5 : nx + c * 2.5, wy = blowing ? my - c * 0.6 : ny + c * 1
  // lanyard
  ctx.save(); ctx.strokeStyle = '#ff5d6c'; ctx.lineWidth = Math.max(3, c * 0.5)
  ctx.beginPath(); const [a0x, a0y] = s.at(11.5, 22); const [a1x, a1y] = s.at(24.5, 22)
  ctx.moveTo(a0x, a0y); ctx.quadraticCurveTo(lerp(a0x, wx, 0.5), wy + c * 2.5, wx, wy + c * 0.6); ctx.quadraticCurveTo(lerp(a1x, wx, 0.5), wy + c * 2.5, a1x, a1y); ctx.stroke(); ctx.restore()
  const q = Math.max(3, c * 0.75)
  bitmap(ctx, ['.OOOOOO..', 'OYYYYYYOO', 'OYWYYYYYO', 'OYYYYYYOO', '.OYYYYO..', '..OOOO...'], { O: OUT, Y: '#cfd6e8', W: '#ffffff' }, wx - 4.5 * q, wy - 3 * q, q)
  if (blowing) {
    // air lines
    ctx.save(); ctx.globalAlpha *= 0.8
    for (let i = 0; i < 3; i++) { const ph = (t * 6 + i / 3) % 1; R(ctx, wx + 5 * q + ph * 40, wy - 3 * q + i * 2.4 * q, 18 * (1 - ph) + 6, q * 0.8, '#efe6d6') }
    ctx.restore()
  }
}

// ─────────────────────────────── Pisces' treadmill
export function drawTreadmill(ctx, x, y, t, speed = 1) {
  const P = 6, w = 250, h = 34
  const lx = x - w / 2
  // console post + screen (front end on the left: the runner faces left)
  R(ctx, lx + 6 - P, y - 196 - P, 16 + 2 * P, 206 + P, OUT); R(ctx, lx + 6, y - 196, 16, 206, '#5a5280')
  R(ctx, lx - 40 - P, y - 250 - P, 150 + 2 * P, 70 + 2 * P, OUT)
  R(ctx, lx - 40, y - 250, 150, 70, '#1d1240')
  ctx.font = `700 17px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = '#7fe0ff'; ctx.fillText('CRY', lx + 35, y - 230); ctx.fillText('CARDIO', lx + 35, y - 204)
  // handrail
  R(ctx, lx + 10, y - 150, 120, 10, OUT); R(ctx, lx + 12, y - 148, 116, 6, '#8b84a8')
  // deck
  R(ctx, lx - P, y - P, w + 2 * P, h + 2 * P, OUT)
  R(ctx, lx, y, w, h, '#2b2450')
  R(ctx, lx + 8, y + 4, w - 16, 12, '#141030')
  const off = ((t * 260 * speed) % 40 + 40) % 40
  for (let u = off - 40; u < w - 30; u += 40) if (u > 0) R(ctx, lx + 8 + u, y + 4, 14, 12, '#3a3366')
  R(ctx, lx - 12, y + h - 6, 24, 18, OUT); R(ctx, lx + w - 12, y + h - 6, 24, 18, OUT)
}

// ─────────────────────────────── the neon sign
export function drawNeon(ctx, x, y, t, k = 1, flick = 0) {
  if (k <= 0) return
  const on = flick ? (Math.sin(t * 61) > -0.3 ? 1 : 0.25) : 1
  const w = 470, h = 108, P = 6
  ctx.save(); ctx.globalAlpha *= k
  R(ctx, x - w / 2 - P, y - P, w + 2 * P, h + 2 * P, OUT)
  R(ctx, x - w / 2, y, w, h, '#120a2a')
  const g = ctx.createRadialGradient(x, y + h / 2, 10, x, y + h / 2, 330)
  g.addColorStop(0, rgba('#ff5d8f', 0.32 * on)); g.addColorStop(1, rgba('#ff5d8f', 0))
  ctx.fillStyle = g; ctx.fillRect(x - 340, y - 120, 680, 360)
  ctx.font = `800 64px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '6px'
  ctx.shadowColor = '#ff5d8f'; ctx.shadowBlur = 26 * on
  ctx.fillStyle = on > 0.5 ? '#ffd0e0' : '#6a3a5a'
  ctx.fillText('LOVE GYM', x + 3, y + h / 2 + 4)
  ctx.shadowBlur = 0
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  drawPixelHeart(ctx, x - w / 2 + 34, y + h / 2, 4, on > 0.5 ? '#ff5d8f' : '#5a2a44')
  drawPixelHeart(ctx, x + w / 2 - 34, y + h / 2, 4, on > 0.5 ? '#ff5d8f' : '#5a2a44')
  ctx.restore()
}

// ─────────────────────────────── the rep board. o: { set, reps, of, flash: 'NO REP' | 'SET DONE' | '', flashK, label }
export function drawBoard(ctx, x, y, w, h, t, { set = '', reps = 0, of = 3, flash = '', flashK = 0, alpha = 1, bump = 0 } = {}) {
  if (alpha <= 0) return
  const P = 6
  ctx.save(); ctx.globalAlpha *= alpha
  R(ctx, x - P, y - P, w + 2 * P, h + 2 * P, OUT)
  R(ctx, x, y, w, h, '#0e0a22')
  R(ctx, x, y, w, 4, '#f2c75c')
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.font = `700 22px ${MONO}`; ctx.fillStyle = 'rgba(242,199,92,0.85)'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
  ctx.fillText(set, x + w / 2, y + 30)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  const red = flash === 'NO REP' && flashK > 0
  const txt = red ? 'NO REP' : flash && flashK > 0 ? flash : `${reps}/${of}`
  const s = 1 + 0.25 * bump
  ctx.save(); ctx.translate(x + w / 2, y + h / 2 + 18); ctx.scale(s, s)
  ctx.font = `700 ${txt.length > 5 ? 50 : 62}px ${MONO}`
  ctx.shadowColor = red ? '#ff4d5e' : '#7dffb0'; ctx.shadowBlur = 16
  ctx.fillStyle = red ? ((t * 8) % 1 < 0.6 ? '#ff4d5e' : '#7a1c2a') : '#7dffb0'
  ctx.fillText(txt, 0, 0)
  ctx.restore()
  ctx.restore()
}

// ─────────────────────────────── a notification pill
export function drawNotif(ctx, cx, y, k, who, text) {
  if (k <= 0.01) return
  ctx.save()
  ctx.translate(cx, y); ctx.scale(lerp(0.7, 1, k), lerp(0.7, 1, k)); ctx.globalAlpha *= clamp(k * 2)
  ctx.font = `800 40px ${INTER}`
  const tw = ctx.measureText(text).width, w = Math.max(560, tw + 200), h = 112
  ctx.fillStyle = OUT; ctx.beginPath(); ctx.roundRect(-w / 2 - 6, -6, w + 12, h + 12, 40); ctx.fill()
  ctx.fillStyle = '#efe6d6'; ctx.beginPath(); ctx.roundRect(-w / 2, 0, w, h, 34); ctx.fill()
  ctx.fillStyle = '#ff8fb1'; ctx.beginPath(); ctx.arc(-w / 2 + 58, h / 2, 32, 0, Math.PI * 2); ctx.fill()
  drawPixelHeart(ctx, -w / 2 + 58, h / 2 + 2, 5, '#ffffff')
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  ctx.font = `700 22px ${MONO}`; ctx.fillStyle = '#6a5a8a'; ctx.fillText(who, -w / 2 + 108, 32)
  ctx.font = `800 40px ${INTER}`; ctx.fillStyle = '#1b1236'; ctx.fillText(text, -w / 2 + 108, 74)
  ctx.restore()
}

// ─────────────────────────────── little bits
export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}
export function drawTear(ctx, x, y, px) {
  bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px)
}
export function drawSweat(ctx, x, y, px) {
  bitmap(ctx, ['.S.', '.S.', 'SWS', 'SSS', '.S.'], { S: '#9fdcff', W: '#ffffff' }, x - 1.5 * px, y - 2.5 * px, px)
}

/** card-talk-6.png with its question repainted (as in stcomet / stkaiju) */
export function makeTalkCard(doc, img, lines, { label = 'QUESTION' } = {}) {
  if (!img) return null
  const c = doc.createElement('canvas'); c.width = img.width; c.height = img.height
  const x = c.getContext('2d'); x.drawImage(img, 0, 0)
  const g = x.createLinearGradient(0, 822, 0, 990); g.addColorStop(0, 'rgb(17,9,45)'); g.addColorStop(1, 'rgb(15,8,40)')
  x.fillStyle = g; x.fillRect(114, 822, 504, 162)
  x.fillStyle = '#efe6d6'; x.font = "italic 500 58px 'EB Garamond', Georgia, serif"; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
  lines.forEach((s, i) => x.fillText(s, 366, 874 + i * 62))
  x.fillStyle = 'rgb(14,7,38)'; x.fillRect(340, 1036, 250, 23)
  x.font = "400 21px 'Space Mono', monospace"; x.letterSpacing = '4px'; x.textAlign = 'right'; x.fillStyle = 'rgb(166,144,105)'
  x.fillText(label, 574, 1055)
  x.letterSpacing = '0px'
  return c
}
