// Star Talk carousels: canvas renderer (1080 x 1080 slides). Pure drawing, no DOM at module top level.
import { drawStarChar, signStar, STAR } from '../films/startalk.js'
import { SIGNS } from '../films/wheel.js'
import { CAROUSELS, SIGN_IDS } from './content.js'

const W = 1080
const C = { ink: '#0b0620', deep: '#1a0f3d', gold: '#f7cf68', bone: '#efe6d6', muted: '#a99cd0', panel: 'rgba(16,9,38,0.92)' }
const MONO = "'Space Mono', 'DejaVu Sans Mono', monospace"
const SANS = "'Inter', 'DejaVu Sans', sans-serif"
const GLY = "'DejaVu Sans', 'Noto Sans Symbols', serif"
const T = 1.35                                    // fixed moment for the sprite (twinkles/bob)
const sign = id => SIGNS.find(s => s.id === id)

function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }

function bg(ctx, seed = 1, tint = C.gold) {
  const g = ctx.createLinearGradient(0, 0, 0, W); g.addColorStop(0, '#20134a'); g.addColorStop(1, C.ink)
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, W)
  const r = ctx.createRadialGradient(W / 2, W * 0.55, 40, W / 2, W * 0.55, W * 0.75)
  r.addColorStop(0, hexA(tint, 0.16)); r.addColorStop(1, hexA(tint, 0))
  ctx.fillStyle = r; ctx.fillRect(0, 0, W, W)
  const R = rng(seed * 977)
  for (let i = 0; i < 70; i++) {
    const x = Math.round(R() * W / 4) * 4, y = Math.round(R() * W / 4) * 4, s = R() < 0.8 ? 4 : 6
    ctx.fillStyle = hexA(R() < 0.7 ? C.bone : C.gold, 0.25 + R() * 0.5); ctx.fillRect(x, y, s, s)
    if (R() < 0.12) { ctx.fillRect(x - s, y, s * 3, s / 2 + 1); ctx.fillRect(x + s / 4, y - s, s / 2 + 1, s * 3) }
  }
}
function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }

// stepped-corner pixel panel (the Star Talk dialogue look)
function box(ctx, x, y, w, h, { fill = C.panel, border = C.gold, st = 10, lw = 6, hair = true } = {}) {
  const path = (i) => {
    const X = x + i, Y = y + i, Wd = w - 2 * i, Hd = h - 2 * i, s = st
    ctx.beginPath()
    ctx.moveTo(X + s, Y); ctx.lineTo(X + Wd - s, Y); ctx.lineTo(X + Wd - s, Y + s); ctx.lineTo(X + Wd, Y + s)
    ctx.lineTo(X + Wd, Y + Hd - s); ctx.lineTo(X + Wd - s, Y + Hd - s); ctx.lineTo(X + Wd - s, Y + Hd); ctx.lineTo(X + s, Y + Hd)
    ctx.lineTo(X + s, Y + Hd - s); ctx.lineTo(X, Y + Hd - s); ctx.lineTo(X, Y + s); ctx.lineTo(X + s, Y + s); ctx.closePath()
  }
  path(0); ctx.fillStyle = fill; ctx.fill()
  if (border) { path(lw / 2); ctx.lineWidth = lw; ctx.strokeStyle = border; ctx.stroke() }
  if (hair) { path(lw + 6); ctx.lineWidth = 2; ctx.strokeStyle = hexA(C.bone, 0.28); ctx.stroke() }
}

function wrap(ctx, text, maxW) {
  const out = []
  for (const para of String(text).split('|')) {
    let line = ''
    for (const w of para.split(' ')) {
      const t = line ? line + ' ' + w : w
      if (ctx.measureText(t).width > maxW && line) { out.push(line); line = w } else line = t
    }
    out.push(line)
  }
  return out
}
function text(ctx, str, x, y, { font = `700 40px ${MONO}`, color = C.bone, align = 'left', maxW = 900, lh = 1.3, base = 'alphabetic', shadow = true } = {}) {
  ctx.font = font; ctx.textAlign = align; ctx.textBaseline = base
  const size = parseInt(font.match(/(\d+)px/)[1]), lines = wrap(ctx, str, maxW)
  lines.forEach((l, i) => {
    if (shadow) { ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillText(l, x + 3, y + i * size * lh + 4) }
    ctx.fillStyle = Array.isArray(color) ? color[Math.min(i, color.length - 1)] : color; ctx.fillText(l, x, y + i * size * lh)
  })
  return y + lines.length * size * lh
}
function star(ctx, x, y, size, o = {}) {
  const g = o.sign ? signStar(o.sign) : {}
  return drawStarChar(ctx, x, y, size, T, { look: [0, 0], blink: false, bob: 0, color: g.color || STAR.sky, glyph: size >= 120 ? g.glyph : null, seed: o.seed || 1, mood: o.mood || 'happy', ...o.opts })
}
function signTag(ctx, id, x, y, { size = 40, align = 'left', suffix = '' } = {}) {
  const s = sign(id)
  ctx.font = `700 ${size}px ${GLY}`; ctx.textAlign = align; ctx.textBaseline = 'alphabetic'
  const label = s.glyph + '︎ ' + s.name.toUpperCase() + suffix
  ctx.font = `700 ${size}px ${MONO}`
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillText(label, x + 3, y + 4)
  ctx.fillStyle = s.color; ctx.fillText(label, x, y)
}

function chrome(ctx, i, n, cover) {
  box(ctx, 36, 34, 250, 58, { fill: 'rgba(16,9,38,0.85)', st: 6, lw: 4, hair: false })
  text(ctx, '★ STAR TALK', 161, 73, { font: `700 26px ${MONO}`, color: C.gold, align: 'center', shadow: false })
  text(ctx, `${i}/${n}`, W - 44, 73, { font: `700 26px ${MONO}`, color: C.muted, align: 'right', shadow: false })
  text(ctx, 'come align · join the beta', W / 2, W - 30, { font: `400 24px ${MONO}`, color: hexA(C.bone, 0.6), align: 'center', shadow: false })
  if (cover) { text(ctx, 'SWIPE ▶', W - 44, W - 30, { font: `700 30px ${MONO}`, color: C.gold, align: 'right' }) }
}

function hook(ctx, c, y = 210) {
  const end = text(ctx, c.cover.hook, W / 2, y, { font: `700 78px ${MONO}`, color: [C.bone, C.gold], align: 'center', maxW: 980, lh: 1.15 })
  return text(ctx, c.cover.sub, W / 2, end + 6, { font: `400 34px ${MONO}`, color: C.muted, align: 'center', maxW: 900 })
}
function twelve(ctx, y1 = 640, y2 = 830, size = 130) {
  SIGN_IDS.forEach((id, k) => star(ctx, 120 + (k % 6) * 168, k < 6 ? y1 : y2, size, { sign: id, seed: k + 3, mood: ['happy', 'wink', 'sparkle', 'neutral'][k % 4] }))
}

// ───────────────────────────── slide kinds
const K = {}
K.stats = {
  cover(ctx, c) { hook(ctx, c); twelve(ctx) },
  sign(ctx, c, id) {
    const s = sign(id), d = c.signs[id]
    signTag(ctx, id, 60, 180, { size: 52, suffix: ' · STATS' })
    star(ctx, 250, 500, 330, { sign: id, mood: 'sparkle' })
    box(ctx, 470, 230, 570, 660)
    c.stats.forEach((st, k) => {
      const y = 300 + k * 92
      text(ctx, st, 510, y, { font: `700 26px ${MONO}`, color: C.bone, shadow: false })
      for (let b = 0; b < 10; b++) { ctx.fillStyle = b < d.v[k] ? s.color : hexA(C.bone, 0.12); ctx.fillRect(510 + b * 50, y + 16, 42, 30) }
    })
    text(ctx, 'SPECIAL MOVE', 510, 778, { font: `700 24px ${MONO}`, color: C.gold, shadow: false })
    text(ctx, d.move, 510, 812, { font: `600 30px ${SANS}`, color: C.bone, maxW: 500, shadow: false })
    text(ctx, 'WEAKNESS: ' + d.weak, 60, 800, { font: `600 32px ${SANS}`, color: C.muted, maxW: 380 })
  },
}
K.callout = {
  cover(ctx, c) { hook(ctx, c); twelve(ctx) },
  sign(ctx, c, id) {
    star(ctx, W / 2, 410, 380, { sign: id, mood: id === 'pisces' ? 'sparkle' : 'happy' })
    if (id === 'pisces') tears(ctx, W / 2, 410, 380)
    box(ctx, 60, 640, 960, 330)
    box(ctx, 90, 610, 380, 60, { fill: C.ink, st: 6, lw: 4, hair: false })
    signTag(ctx, id, 280, 653, { size: 30, align: 'center', suffix: ' STAR' })
    text(ctx, c.signs[id], 110, 735, { font: `700 44px ${MONO}`, color: C.bone, maxW: 860, lh: 1.32, shadow: false })
  },
}
K.pick = {
  cover(ctx, c) {
    hook(ctx, c, 230)
    c.picks.forEach((p, k) => {
      const x = 200 + k * 340
      drawStarChar(ctx, x, 640, 250, T, { color: p.color, look: [0, 0], blink: false, bob: 0, seed: k + 2, mood: 'neutral' })
      box(ctx, x - 50, 800, 100, 100, { fill: C.panel, border: p.color, st: 8, lw: 5, hair: false })
      text(ctx, p.label, x, 872, { font: `700 60px ${MONO}`, color: p.color, align: 'center' })
    })
  },
  pages(c) { return c.picks.map(p => ctx => {
    drawStarChar(ctx, W / 2, 330, 300, T, { color: p.color, look: [0, 0], blink: false, bob: 0, seed: 4, mood: 'sparkle' })
    box(ctx, 70, 520, 940, 430, { border: p.color })
    text(ctx, `IF YOU PICKED ${p.label}`, W / 2, 600, { font: `700 30px ${MONO}`, color: p.color, align: 'center', shadow: false })
    text(ctx, p.head, W / 2, 662, { font: `700 44px ${MONO}`, color: C.bone, align: 'center', maxW: 860, shadow: false })
    text(ctx, p.text, W / 2, 750, { font: `500 38px ${SANS}`, color: C.bone, align: 'center', maxW: 840, lh: 1.35, shadow: false })
  }) },
}
function crowd(r) {
  const R = rng(r.seed), pts = [], cols = 7, rows = 5
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) pts.push([90 + i * 150 + (j % 2) * 40 + (R() - 0.5) * 30, 330 + j * 140 + (R() - 0.5) * 24, Math.floor(R() * 1000)])
  const tgt = [Math.floor(R() * pts.length)]
  if (r.twin) { const a = tgt[0]; tgt.push(a % cols === cols - 1 ? a - 1 : a + 1) }
  return { pts, tgt }
}
function tears(ctx, x, y, size) {
  const c = Math.max(3, Math.round(size / 36))
  ctx.fillStyle = '#7fd0ff'
  for (const sx of [-1, 1]) for (let k = 0; k < 3; k++) ctx.fillRect(Math.round(x + sx * size * 0.12 - c / 2), Math.round(y + size * 0.06 + k * c * 1.6), c, c * 1.3)
}
function drawCrowd(ctx, r, reveal) {
  const { pts, tgt } = crowd(r)
  pts.forEach(([x, y, sd], k) => {
    const hit = tgt.includes(k)
    drawStarChar(ctx, x, y, 118, T, { color: STAR.sky, look: [0, 0], blink: false, bob: 0, seed: sd, mood: hit ? r.mood : 'happy', glyph: null, alpha: reveal && !hit ? 0.28 : 1 })
    if (hit && r.tears) tears(ctx, x, y, 118)
  })
  if (reveal) tgt.forEach(k => {
    const [x, y] = pts[k]
    ctx.strokeStyle = '#ff5c8a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(x, y + 4, 84, 0, Math.PI * 2); ctx.stroke()
  })
}
K.find = {
  cover(ctx, c) { hook(ctx, c, 240); drawCrowd(ctx, { ...c.rounds[0], seed: 99 }, false) ; },
  pages(c) {
    const out = []
    c.rounds.forEach((r, k) => {
      out.push(ctx => { text(ctx, `${k + 1}. ${r.q}`, W / 2, 180, { font: `700 60px ${MONO}`, color: C.bone, align: 'center' }); text(ctx, r.hint, W / 2, 238, { font: `400 32px ${MONO}`, color: C.muted, align: 'center' }); drawCrowd(ctx, r, false) })
      out.push(ctx => { text(ctx, 'FOUND IT?', W / 2, 180, { font: `700 60px ${MONO}`, color: C.gold, align: 'center' }); text(ctx, `answer ${k + 1} of 3`, W / 2, 238, { font: `400 32px ${MONO}`, color: C.muted, align: 'center' }); drawCrowd(ctx, r, true) })
    })
    return out
  },
}
K.items = {
  cover(ctx, c) { hook(ctx, c); twelve(ctx) },
  sign(ctx, c, id) {
    const d = c.signs[id], s = sign(id)
    signTag(ctx, id, W / 2, 175, { size: 46, align: 'center' })
    star(ctx, W / 2, 380, 280, { sign: id, mood: 'sparkle' })
    box(ctx, 90, 580, 900, 360, { border: s.color })
    text(ctx, 'ITEM GET!', W / 2, 650, { font: `700 30px ${MONO}`, color: C.gold, align: 'center', shadow: false })
    text(ctx, d.item, W / 2, 735, { font: `700 64px ${MONO}`, color: s.color, align: 'center', maxW: 840, shadow: false })
    text(ctx, d.text, W / 2, 820, { font: `500 38px ${SANS}`, color: C.bone, align: 'center', maxW: 800, shadow: false })
  },
}
function bar(ctx, frac, y = 860, color = C.gold) {
  box(ctx, 140, y, 800, 70, { fill: C.panel, st: 6, lw: 4, hair: false })
  const n = 20, f = Math.round(frac * n)
  for (let b = 0; b < n; b++) { ctx.fillStyle = b < f ? color : hexA(C.bone, 0.1); ctx.fillRect(158 + b * 38.5, y + 16, 32, 38) }
}
K.loading = {
  cover(ctx, c) { hook(ctx, c, 300); star(ctx, W / 2, 640, 230, { mood: 'sleepy' }); bar(ctx, 0.04) },
  sign(ctx, c, id, k) {
    text(ctx, 'LOADING…', W / 2, 190, { font: `700 60px ${MONO}`, color: C.bone, align: 'center' })
    star(ctx, W / 2, 390, 250, { sign: id, mood: 'wink' })
    box(ctx, 90, 560, 900, 250)
    text(ctx, c.signs[id], W / 2, 650, { font: `700 40px ${MONO}`, color: C.bone, align: 'center', maxW: 820, lh: 1.32, shadow: false })
    bar(ctx, (k + 1) / 13, 860, sign(id).color)
  },
}
K.thisthat = {
  cover(ctx, c) { hook(ctx, c, 300); twelve(ctx, 640, 830, 130) },
  pages(c) { return c.rounds.map((r, k) => ctx => {
    ctx.fillStyle = hexA('#ef5c94', 0.12); ctx.fillRect(0, 120, W / 2, 880)
    ctx.fillStyle = hexA('#38c4ec', 0.12); ctx.fillRect(W / 2, 120, W / 2, 880)
    text(ctx, r.a, W / 4, 220, { font: `700 50px ${MONO}`, color: '#ff8fb8', align: 'center', maxW: 480 })
    text(ctx, r.b, W * 3 / 4, 220, { font: `700 50px ${MONO}`, color: '#7fdcff', align: 'center', maxW: 480 })
    ;[[r.A, 0], [r.B, W / 2]].forEach(([ids, ox]) => ids.forEach((id, j) => {
      const x = ox + 135 + (j % 2) * 270, y = 400 + Math.floor(j / 2) * 205
      star(ctx, x, y, 130, { sign: id, seed: j + k * 7, mood: ['happy', 'wink', 'sparkle'][j % 3] })
      text(ctx, sign(id).name.toUpperCase(), x, y + 92, { font: `700 22px ${MONO}`, color: sign(id).color, align: 'center', shadow: false })
    }))
    box(ctx, W / 2 - 55, 520, 110, 90, { st: 8, lw: 5, hair: false })
    text(ctx, 'OR', W / 2, 580, { font: `700 40px ${MONO}`, color: C.gold, align: 'center', shadow: false })
  }) },
}
function phone(ctx, time) {
  box(ctx, 240, 110, 600, 880, { fill: '#120a2c', border: '#3a2d63', st: 14, lw: 8, hair: false })
  text(ctx, time, W / 2, 285, { font: `700 120px ${SANS}`, color: C.bone, align: 'center', shadow: false })
  text(ctx, 'tuesday', W / 2, 335, { font: `500 30px ${SANS}`, color: C.muted, align: 'center', shadow: false })
}
K.phone = {
  cover(ctx, c) { hook(ctx, c, 300); phone2(ctx) },
  pages(c) { return c.screens.map(s => ctx => {
    phone(ctx, s.time)
    s.notes.forEach(([id, msg], k) => {
      const y = 390 + k * 195, sg = sign(id)
      box(ctx, 270, y, 540, 170, { fill: 'rgba(239,230,214,0.1)', border: null, st: 10, hair: false })
      star(ctx, 330, y + 68, 84, { sign: id, mood: 'neutral', seed: k + 2 })
      text(ctx, sg.name.toUpperCase() + ' STAR', 385, y + 52, { font: `700 26px ${MONO}`, color: sg.color, shadow: false })
      text(ctx, 'now', 790, y + 52, { font: `400 22px ${SANS}`, color: C.muted, align: 'right', shadow: false })
      text(ctx, msg, 385, y + 98, { font: `500 30px ${SANS}`, color: C.bone, maxW: 410, lh: 1.25, shadow: false })
    })
  }) },
}
function phone2(ctx) {
  box(ctx, 360, 560, 360, 420, { fill: '#120a2c', border: '#3a2d63', st: 12, lw: 6, hair: false })
  text(ctx, '2:00', W / 2, 660, { font: `700 70px ${SANS}`, color: C.bone, align: 'center', shadow: false })
  ;['aries', 'cancer', 'gemini'].forEach((id, k) => { box(ctx, 385, 700 + k * 86, 310, 74, { fill: 'rgba(239,230,214,0.1)', border: null, st: 6, hair: false }); star(ctx, 425, 737 + k * 86, 52, { sign: id, mood: 'neutral', opts: { tips: false } }); ctx.fillStyle = hexA(C.bone, 0.5); ctx.fillRect(465, 725 + k * 86, 190, 12); ctx.fillRect(465, 745 + k * 86, 130, 12) })
}
function heart(ctx, x, y, s, color) {
  const H = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
  ctx.fillStyle = color; H.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') ctx.fillRect(x + i * s, y + j * s, s, s) }))
}
K.little = {
  cover(ctx, c) { hook(ctx, c); twelve(ctx) },
  sign(ctx, c, id) {
    const s = sign(id)
    text(ctx, 'LITTLE THINGS THAT', 60, 180, { font: `700 34px ${MONO}`, color: C.muted })
    text(ctx, 'MEAN A LOT TO', 60, 222, { font: `700 34px ${MONO}`, color: C.muted })
    signTag(ctx, id, 60, 300, { size: 64 })
    star(ctx, 830, 270, 250, { sign: id, mood: id === 'pisces' ? 'sparkle' : 'heart' })
    if (id === 'pisces') tears(ctx, 830, 270, 250)
    box(ctx, 60, 440, 960, 510, { border: s.color })
    c.signs[id].forEach((item, k) => {
      heart(ctx, 110, 515 + k * 140, 7, s.color)
      text(ctx, item, 190, 552 + k * 140, { font: `700 44px ${MONO}`, color: C.bone, maxW: 790, shadow: false })
    })
  },
}
function trophy(ctx, x, y, s, color) {
  const P = ['XXXXXXXXXX', 'XXXXXXXXXX', '.XXXXXXXX.', '..XXXXXX..', '...XXXX...', '....XX....', '....XX....', '...XXXX...', '..XXXXXX..']
  P.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') { ctx.fillStyle = (i + j) % 5 === 0 ? '#fff4c2' : color; ctx.fillRect(x + i * s, y + j * s, s, s) } }))
  ctx.fillStyle = color; ctx.fillRect(x - 2 * s, y + s, 2 * s, s); ctx.fillRect(x - 2 * s, y + s, s, 3 * s); ctx.fillRect(x + 10 * s, y + s, 2 * s, s); ctx.fillRect(x + 11 * s, y + s, s, 3 * s)
}
K.achieve = {
  cover(ctx, c) { hook(ctx, c); twelve(ctx) },
  sign(ctx, c, id) {
    const [name, desc] = c.signs[id], s = sign(id)
    signTag(ctx, id, W / 2, 180, { size: 46, align: 'center' })
    star(ctx, W / 2, 360, 250, { sign: id, mood: id === 'pisces' ? 'sparkle' : 'wide' })
    if (id === 'pisces') tears(ctx, W / 2, 360, 250)
    box(ctx, 60, 540, 960, 380)
    trophy(ctx, 110, 640, 14, C.gold)
    text(ctx, 'ACHIEVEMENT UNLOCKED', 330, 625, { font: `700 28px ${MONO}`, color: C.gold, shadow: false })
    text(ctx, name, 330, 700, { font: `700 56px ${MONO}`, color: s.color, maxW: 660, shadow: false })
    text(ctx, desc, 330, 775, { font: `500 36px ${SANS}`, color: C.bone, maxW: 650, lh: 1.3, shadow: false })
    box(ctx, 840, 560, 150, 50, { fill: s.color, border: null, st: 6, hair: false })
    text(ctx, 'RARE', 915, 596, { font: `700 26px ${MONO}`, color: C.ink, align: 'center', shadow: false })
  },
}

function endSlide(ctx, c) {
  if (c.lesson) {
    box(ctx, 140, 150, 800, 150, { border: C.gold })
    text(ctx, '★ LESSON UNLOCKED', W / 2, 212, { font: `700 34px ${MONO}`, color: C.gold, align: 'center', shadow: false })
    text(ctx, c.lesson, W / 2, 265, { font: `700 36px ${MONO}`, color: C.bone, align: 'center', shadow: false })
  }
  star(ctx, W / 2, c.lesson ? 470 : 400, 300, { mood: 'happy' })
  text(ctx, c.end, W / 2, c.lesson ? 700 : 660, { font: `700 46px ${MONO}`, color: C.bone, align: 'center', maxW: 900, lh: 1.25 })
  box(ctx, 200, 850, 680, 100, { fill: C.gold, border: null, st: 10, hair: false })
  text(ctx, 'come align ★ join the beta', W / 2, 912, { font: `700 30px ${MONO}`, color: C.ink, align: 'center', shadow: false })
}

export function slideFns(c) {
  const k = K[c.kind], pages = []
  pages.push({ cover: true, draw: ctx => k.cover(ctx, c) })
  if (k.pages) k.pages(c).forEach(f => pages.push({ draw: f }))
  else SIGN_IDS.forEach((id, i) => pages.push({ draw: ctx => k.sign(ctx, c, id, i) }))
  pages.push({ draw: ctx => endSlide(ctx, c) })
  return pages
}
const TINT = { c01: '#f7cf68', c02: '#ef5c94', c03: '#38c4ec', c04: '#f7cf68', c05: '#2fc79a', c06: '#a35cf0', c07: '#e163d6', c08: '#3f7cf0', c09: '#ef5c94', c10: '#f39a3a' }
export function render(canvas, c, i) {
  const ctx = canvas.getContext('2d'), pages = slideFns(c), p = pages[i]
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, W)
  bg(ctx, i + c.id.charCodeAt(2) * 31, TINT[c.id] || C.gold)
  p.draw(ctx)
  chrome(ctx, i + 1, pages.length, p.cover)
  return pages.length
}
export { CAROUSELS }
