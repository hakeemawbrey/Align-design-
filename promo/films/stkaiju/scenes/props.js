// stkaiju props: pixel drawings on canvas ("Overthinkzilla.", Star Talk Wild Lessons #5). Pure draw calls, crisp rects.
//   drawKaiju(ctx, x, footY, px, t, o)   OVERTHINKZILLA: an upright pixel kaiju with glowing "?" spines. (x, footY) = the
//                                        centre of its body at the soles. px = one art pixel. o: { eyes, mouth, look,
//                                        spine (glow 0…1+), rot, squash, silhouette, eyeGlow, alpha }
//                                        eyes 'cute' | 'mean' | 'angry' | 'shock' | 'plead' | 'nervous'   mouth 'grin' | 'open' | 'smile' | 'o'
//   kaijuPoint(x, footY, px, ci, cj)     a cell of the sprite in screen px (e.g. the mouth: ci 10.5, cj 7)
//   drawBuilding(ctx, b, t, k)           a pixel "thought" tower with a rooftop sign; k = 1 standing … 0.12 squashed flat
//   drawThought(ctx, x, y, s, text, t)   a pink pixel thought cloud with a what-if in it
//   drawChat(ctx, x, y, w, h, t, o)      the phone: a little chat panel (outgoing typed text, typing dots, the reply)
//   drawTear / drawSweat / drawPixelHeart / starEyes / makeTalkCard / bitmap
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const OUT = '#14102a'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ─────────────────────────────── OVERTHINKZILLA
// 26 × 25 cells. O outline, B body, L belly, F feet (shaded later: B on a right edge → D, on a left edge → H)
const KW = 26, KH = 25, KAX = 10.5
const KAIJU = [
  '.......OOOOOOOO...........',
  '......OBBBBBBBBO..........',
  '.....OBBBBBBBBBBO.........',
  '....OBBBBBBBBBBBBO........',
  '....OBBBBBBBBBBBBO........',
  '....OBBBBBBBBBBBBO........',
  '....OBBBBBBBBBBBBO........',
  '....OBBBBBBBBBBBBO........',
  '.....OBBBBBBBBBBO.........',
  '....OOBBBBBBBBBBOO........',
  '..OOBBBBLLLLLLBBBBOO......',
  '.OBBBBBLLLLLLLLBBBBBO.....',
  'OBBOBBLLLLLLLLLLBBOBBO....',
  'OBO.OBLLLLLLLLLLBO.OBO....',
  '.O..OBLLLLLLLLLLBO..O.....',
  '....OBBLLLLLLLLBBO........',
  '....OBBLLLLLLLLBBO........',
  '....OBBBLLLLLLBBBO........',
  '....OBBBBBBBBBBBBOO.......',
  '...OBBBBBBBBBBBBBBBOO..OO.',
  '...OBBBOOOOOOOBBBBBBBOOBO.',
  '...OBBO.......OBBOOBBBBBO.',
  '..OBBBO.......OBBBO.OOOO..',
  '..OFFFO......OFFFFO.......',
  '..OOOOO......OOOOOO.......',
].map(r => r.padEnd(KW, '.'))
// shade once: B with a non-body cell to its right → D, to its left → H; belly L next to B on the right → l
const isBody = c => c === 'B' || c === 'L' || c === 'F' || c === 'D' || c === 'H'
const SHADED = KAIJU.map((row, j) => [...row].map((c, i) => {
  if (c !== 'B') return c
  const r = row[i + 1], l = row[i - 1], up = KAIJU[j - 1] ? KAIJU[j - 1][i] : '.'
  if (!isBody(r)) return 'D'
  if (!isBody(l) || !isBody(up)) return 'H'
  return 'B'
}).join(''))
const SPINES = [[2.5, 6.2, -0.35], [5.4, 1.2, -0.18], [10.5, -0.6, 0], [15.6, 1.2, 0.18], [18.5, 6.2, 0.35]]   // [ci, cj (bottom), lean]
const QMARK = ['.XXX.', 'X...X', '....X', '..XX.', '..X..', '.....', '..X..']
const PAL = { O: OUT, B: '#5cc27d', D: '#2e8656', H: '#9fe8a8', L: '#d8f4b4', F: '#2a6e48' }
const PAL_SIL = { O: '#2a1a52', B: '#0c0820', D: '#0c0820', H: '#120c2c', L: '#100a26', F: '#0c0820' }

export const kaijuPoint = (x, footY, px, ci, cj) => [x + (ci - KAX) * px, footY - (KH - cj) * px]

export function drawKaiju(ctx, x, footY, px, t, { eyes = 'mean', mouth = 'grin', look = [0, 0], spine = 0.4, rot = 0, squash = 0, silhouette = false, eyeGlow = 0, alpha = 1, sweat = 0 } = {}) {
  if (px <= 0 || alpha <= 0) return
  const pal = silhouette ? PAL_SIL : PAL
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(footY))
  ctx.rotate(rot)
  ctx.scale(1 + squash, 1 - squash * 0.9)
  const ox = -KAX * px, oy = -KH * px
  // glow behind
  const gr = ctx.createRadialGradient(0, -KH * px * 0.55, 0, 0, -KH * px * 0.55, KH * px * 0.9)
  gr.addColorStop(0, silhouette ? 'rgba(255,60,120,0.10)' : 'rgba(120,255,170,0.16)'); gr.addColorStop(1, 'rgba(120,255,170,0)')
  ctx.fillStyle = gr; ctx.fillRect(-KH * px, -KH * px * 1.5, KH * px * 2, KH * px * 1.6)
  // spines: glowing question marks behind the body
  const sg = clamp(spine, 0, 2)
  SPINES.forEach(([ci, cj, lean], k) => {
    const q = px * 0.72, wob = Math.sin(t * 3 + k * 1.3) * 0.06
    ctx.save(); ctx.translate(ox + ci * px, oy + cj * px); ctx.rotate(lean + wob)
    const col = silhouette ? `rgba(255,90,170,${0.35 + 0.4 * sg})` : sg > 0.9 ? '#ffd1ea' : '#ff6fb3'
    if (sg > 0.05 && !silhouette) {
      const g = ctx.createRadialGradient(0, -3.5 * q, 0, 0, -3.5 * q, 7 * q)
      g.addColorStop(0, rgba('#ff6fb3', 0.55 * Math.min(1, sg))); g.addColorStop(1, rgba('#ff6fb3', 0))
      ctx.fillStyle = g; ctx.fillRect(-7 * q, -10.5 * q, 14 * q, 14 * q)
    }
    // outline then glyph
    bitmap(ctx, QMARK.map(r => r.replace(/X/g, 'o')), { o: silhouette ? '#1a0f38' : OUT }, -2.5 * q - q * 0.5, -7 * q - q * 0.5, q)
    bitmap(ctx, QMARK.map(r => r.replace(/X/g, 'o')), { o: silhouette ? '#1a0f38' : OUT }, -2.5 * q + q * 0.5, -7 * q + q * 0.5, q)
    bitmap(ctx, QMARK, { X: col }, -2.5 * q, -7 * q, q)
    ctx.restore()
  })
  bitmap(ctx, SHADED, pal, ox, oy, px)
  const C = (i, j, c, w = 1, h = 1) => R(ctx, ox + i * px, oy + j * px, w * px, h * px, c)
  if (silhouette) {
    if (eyeGlow > 0) {
      for (const ex of [6, 12]) {
        const g = ctx.createRadialGradient(ox + (ex + 2) * px, oy + 4 * px, 0, ox + (ex + 2) * px, oy + 4 * px, 5 * px)
        g.addColorStop(0, `rgba(255,70,90,${0.6 * eyeGlow})`); g.addColorStop(1, 'rgba(255,70,90,0)')
        ctx.fillStyle = g; ctx.fillRect(ox + (ex - 3) * px, oy - 1 * px, 10 * px, 10 * px)
        ctx.globalAlpha *= clamp(eyeGlow); C(ex, 4, '#ff5468', 4, 1); C(ex + 1, 3, '#ff8a8a', 2, 1); ctx.globalAlpha /= Math.max(0.001, clamp(eyeGlow))
      }
    }
    ctx.restore(); return
  }
  // ── eyes: left cols 6–9, right 12–15, rows 3–5 (cute: rows 2–5)
  const W_ = '#fffaf0', K = OUT
  const lx = clamp(Math.round(look[0]), -1, 1), ly = clamp(Math.round(look[1]), -1, 1)
  for (const e0 of [6, 12]) {
    const inner = e0 === 6 ? 1 : -1                 // which way is the nose
    if (eyes === 'cute' || eyes === 'plead') {
      C(e0, 2, K, 4, 4); C(e0, 2, K, 4, 1)
      C(e0 + 1 + (lx > 0 ? 1 : 0), 3 + (ly > 0 ? 1 : 0), K, 2, 2)
      C(e0, 2, W_, 1, 1); C(e0 + 1, 3, '#ffffff', 1, 1)
      R(ctx, ox + (e0 + 2.5) * px, oy + 4.2 * px, px * 0.6, px * 0.6, '#ffffff')
      if (eyes === 'plead') { C(e0, 6, '#7fd8ff', 1, 1); C(e0 + 3, 6, '#7fd8ff', 1, 1) }
      continue
    }
    C(e0, 3, W_, 4, 3)
    if (eyes === 'shock') { C(e0 + 1 + (lx > 0 ? 1 : 0), 4, K, 1, 1) }
    else {
      C(e0 + 1 + lx, ly < 0 ? 3 : 4, K, 2, 2)
    }
    if (eyes === 'angry' || eyes === 'mean') {
      // brows slant down toward the nose
      const o0 = inner > 0 ? e0 : e0 + 2, i0 = inner > 0 ? e0 + 2 : e0      // outer pair / inner pair columns
      C(o0, 2, K, 2, 1); C(i0, 3, K, 2, 1)
      if (eyes === 'angry') C(inner > 0 ? e0 + 3 : e0, 4, K, 1, 1)
    }
    if (eyes === 'nervous') C(e0, 2, K, 4, 1)
  }
  // ── mouth: cols 7–14, rows 6–8
  if (mouth === 'grin') {
    C(7, 7, K, 8, 1); C(6, 6, K, 1, 1); C(15, 6, K, 1, 1)
    C(8, 8, W_, 1, 1); C(13, 8, W_, 1, 1)
  } else if (mouth === 'smile') {
    C(8, 7, K, 6, 1); C(7, 6, K, 1, 1); C(14, 6, K, 1, 1)
  } else if (mouth === 'o') {
    C(9, 6, K, 4, 3); C(10, 7, '#5a1030', 2, 1)
  } else if (mouth === 'wobble') {
    for (let i = 0; i < 8; i++) C(7 + i, 7 + ((i + Math.floor(t * 12)) % 2), K, 1, 1)
  } else {
    // open: a roar / a gulp
    C(7, 6, K, 8, 4); C(8, 7, '#5a1030', 6, 2); C(9, 8, '#ff6f8f', 4, 1)
    C(8, 6, W_, 1, 1); C(10, 6, W_, 1, 1); C(12, 6, W_, 1, 1); C(13, 6, W_, 1, 1)
    C(9, 9, W_, 1, 1); C(12, 9, W_, 1, 1)
  }
  // blush for cute
  if (eyes === 'cute' || eyes === 'plead') { C(5, 6, '#ff8fb8', 1, 1); C(16, 6, '#ff8fb8', 1, 1) }
  if (sweat > 0) {
    const s = px * 0.9, yy = oy + (2 + (t * 3 % 1) * 3) * px
    ctx.globalAlpha *= clamp(sweat)
    bitmap(ctx, ['.S.', '.S.', 'SWS', 'SSS', '.S.'], { S: '#9fdcff', W: '#ffffff' }, ox + 17.2 * px, yy, s)
    bitmap(ctx, ['.S.', 'SWS', 'SSS', '.S.'], { S: '#9fdcff', W: '#ffffff' }, ox + 3.2 * px, yy + 1.5 * px, s * 0.8)
  }
  ctx.restore()
}

// ─────────────────────────────── the city of thoughts
// b = { x, w, h, label: ['THEY', 'LAUGHED'], col, roof }  x = left edge, ground = b.g
export function drawBuilding(ctx, b, t, k = 1, { lit = 1 } = {}) {
  if (k <= 0.02) return
  const { x, w, g } = b, h = b.h * k, P = 6
  const top = g - h
  // body
  R(ctx, x - P, top - P, w + 2 * P, h + P, OUT)
  R(ctx, x, top, w, h, b.col)
  R(ctx, x, top, P * 2, h, b.lite)
  R(ctx, x + w - P * 2, top, P * 2, h, b.dark)
  // windows (only when standing tall enough)
  if (k > 0.45) {
    const cols = Math.max(2, Math.floor((w - 24) / 30)), rows = Math.floor((h - 70) / 38)
    const gx = (w - cols * 18) / (cols + 1)
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const on = ((r * 7 + c * 13 + Math.floor(b.x)) % 5) !== 0
      const fl = on ? 0.7 + 0.3 * Math.sin(t * 2 + r + c * 2 + b.x) : 0
      R(ctx, x + gx + c * (18 + gx), top + 60 + r * 38, 18, 22, on ? rgba('#ffe38a', lit * (0.6 + 0.4 * fl)) : '#2a1f52')
    }
  } else {
    // squashed: a pancake with cartoon cracks
    R(ctx, x + w * 0.2, top + h * 0.4, w * 0.25, P, b.dark); R(ctx, x + w * 0.55, top + h * 0.6, w * 0.3, P, b.dark)
  }
  // the rooftop sign (a billboard on two legs)
  if (b.label) {
    const sw = Math.max(w - 8, 132), sh = b.label.length * 30 + 18
    const sx = x + w / 2 - sw / 2, sy = top - sh - 22
    if (k > 0.45) {
      R(ctx, x + w * 0.3, sy + sh, P, 22, OUT); R(ctx, x + w * 0.7 - P, sy + sh, P, 22, OUT)
      R(ctx, sx - 4, sy - 4, sw + 8, sh + 8, OUT)
      R(ctx, sx, sy, sw, sh, '#1d1240')
      R(ctx, sx, sy, sw, 4, b.sign)
      ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle = b.sign
      b.label.forEach((s, i) => ctx.fillText(s, x + w / 2, sy + 22 + i * 30))
    } else {
      // the sign lies crumpled on the pancake
      ctx.save(); ctx.translate(x + w / 2, top - 8); ctx.rotate(b.x % 2 ? 0.12 : -0.12)
      R(ctx, -sw / 2 - 4, -14, sw + 8, 22, OUT); R(ctx, -sw / 2, -10, sw, 14, '#1d1240'); R(ctx, -sw / 2, -10, sw, 3, b.sign)
      ctx.restore()
    }
  }
}

// ─────────────────────────────── a what-if thought cloud
export function drawThought(ctx, x, y, s, text, t, { alpha = 1, rot = 0 } = {}) {
  if (s <= 0.02 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s)
  ctx.font = `700 34px ${MONO}`
  const tw = ctx.measureText(text).width, w = Math.max(160, tw + 56), h = 78, P = 6
  const W2 = w / 2, H2 = h / 2
  // puffy pixel cloud: a rounded slab + bumps
  const blob = (c, o) => {
    R(ctx, -W2 - o, -H2 + 12 - o, w + 2 * o, h - 24 + 2 * o, c)
    R(ctx, -W2 + 12 - o, -H2 - o, w - 24 + 2 * o, h + 2 * o, c)
    for (const [bx, by, bs] of [[-W2 + 30, -H2 - 8, 40], [-6, -H2 - 14, 48], [W2 - 64, -H2 - 8, 40]]) R(ctx, bx - o, by - o, bs + 2 * o, 30 + 2 * o, c)
  }
  blob(OUT, P); blob('#ffd6ec', 0)
  R(ctx, -W2 + 12, H2 - 8, w - 24, 8, '#f3a9cf')
  ctx.fillStyle = '#3a1240'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(text, 0, 4)
  ctx.restore()
}

// ─────────────────────────────── the phone (a chat panel)
export function drawChat(ctx, x, y, w, h, t, { typed = '', sent = false, dots = 0, reply = '', replyK = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  ctx.save()
  ctx.translate(x + w / 2, y + h / 2); ctx.scale(lerp(0.6, 1, k), lerp(0.6, 1, k)); ctx.rotate(-0.03); ctx.translate(-w / 2, -h / 2)
  ctx.globalAlpha *= clamp(k * 2)
  // body
  ctx.fillStyle = OUT; ctx.beginPath(); ctx.roundRect(-10, -10, w + 20, h + 20, 46); ctx.fill()
  ctx.fillStyle = '#efe6d6'; ctx.beginPath(); ctx.roundRect(-4, -4, w + 8, h + 8, 42); ctx.fill()
  const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#22134a'); g.addColorStop(1, '#130a30')
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(6, 6, w - 12, h - 12, 36); ctx.fill()
  // header
  ctx.fillStyle = 'rgba(239,230,214,0.12)'; ctx.fillRect(6, 84, w - 12, 2)
  ctx.fillStyle = '#ff8fb1'; ctx.beginPath(); ctx.arc(54, 48, 20, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#efe6d6'; ctx.font = `800 32px ${INTER}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  ctx.fillText('last night’s date', 88, 48)
  // outgoing bubble
  ctx.font = `700 34px ${INTER}`
  const bub = (txt, right, yy, fillC, txtC) => {
    const tw = ctx.measureText(txt).width, bw = tw + 44, bh = 64
    const bx = right ? w - 24 - bw : 24
    ctx.fillStyle = fillC; ctx.beginPath(); ctx.roundRect(bx, yy, bw, bh, 26); ctx.fill()
    ctx.fillStyle = txtC; ctx.textAlign = 'left'; ctx.fillText(txt, bx + 22, yy + bh / 2 + 2)
    return bw
  }
  if (typed) {
    if (sent) bub(typed, true, 116, '#f2c75c', '#1b1236')
    else {
      // typing in the input field at the bottom
      ctx.fillStyle = 'rgba(239,230,214,0.1)'; ctx.beginPath(); ctx.roundRect(22, h - 96, w - 44, 70, 34); ctx.fill()
      ctx.fillStyle = '#efe6d6'; ctx.textAlign = 'left'; ctx.fillText(typed + ((t * 2.5) % 1 < 0.6 ? '|' : ''), 44, h - 60)
    }
  }
  if (sent) { ctx.font = `700 20px ${MONO}`; ctx.fillStyle = 'rgba(239,230,214,0.55)'; ctx.textAlign = 'right'; ctx.fillText('DELIVERED', w - 30, 204); ctx.font = `700 34px ${INTER}` }
  if (dots > 0 && !reply) {
    ctx.fillStyle = 'rgba(239,230,214,0.16)'; ctx.beginPath(); ctx.roundRect(24, 236, 120, 60, 26); ctx.fill()
    for (let i = 0; i < 3; i++) { const b = Math.sin(t * 9 - i * 0.9) > 0.3 ? -5 : 0; ctx.fillStyle = '#efe6d6'; ctx.beginPath(); ctx.arc(56 + i * 28, 266 + b, 7, 0, Math.PI * 2); ctx.fill() }
  }
  if (reply && replyK > 0) {
    ctx.save(); ctx.translate(24, 266); ctx.scale(lerp(0.5, 1, replyK), lerp(0.5, 1, replyK)); ctx.translate(-24, -266)
    ctx.font = `800 36px ${INTER}`
    bub(reply, false, 236, '#ff8fb1', '#1b1236')
    ctx.restore()
  }
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
/** dust puffs for a squash (pure f(age)) */
export function drawDust(ctx, cx, gy, w, age) {
  if (age < 0 || age > 0.7) return
  const p = ease.outCubic(age / 0.7)
  ctx.save(); ctx.globalAlpha *= 1 - p
  for (let i = 0; i < 8; i++) {
    const side = i % 2 ? 1 : -1, s = Math.round(18 + (i % 3) * 8)
    const dx = side * (w * 0.4 + p * (60 + i * 14)), dy = -p * (20 + (i % 4) * 16)
    R(ctx, cx + dx - s / 2, gy + dy - s, s, s, i % 3 ? '#c9bfe8' : '#9a8cc8')
  }
  ctx.restore()
}

// star geometry (mirrors startalk.js) so things can sit on a star's eyes/top
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
export function starEyes(x, y, size, t, { squash = 0, seed = 1, bob, pop = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const bobA = bob === undefined ? size * 0.035 : bob
  const sq = squash + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sx = 1 + sq, sy = 1 - sq * 0.9
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA
  const base = (FOOT_ROW - HALF) * cell
  const at = (ci, cj) => [Math.round(x) + sx * (ci - HALF) * cell, Math.round(cy + base) + sy * ((cj - HALF) * cell - base)]
  return { L: at(13, 19), R: at(23, 19), top: at(18, 2), cell, cy }
}

/** card-talk-6.png with its question repainted (as in stcomet) */
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
export { prog }
