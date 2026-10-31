// Align Town: a small 3D astrology town at night, drawn in three.js. A
// camera walks the plaza and stops at one card per line of the script.
// Everything is a pure function of time t, so any frame can be rendered
// on its own: window.setup(script, assets) once, then window.frame(t).

import * as THREE from 'three'

const W = 1080
const H = 1920
const FPS = 30
const BEAT = 3.6 // seconds per line
const TRAVEL = 1.4 // of which walking to the next card
const OUTRO = 3.2

const INK = '#2b2522'
const PAPER = '#f3ece0'
const ROSE = '#c0715a'
const GOLD = '#d8b46a'

let S // everything the frame function needs

// ── small helpers ─────────────────────────────────────────────────────────
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const ease = (x) => { x = clamp(x); return x * x * (3 - 2 * x) }
const easeIO = (x) => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 }
const lerp = (a, b, u) => a + (b - a) * u
const angLerp = (a, b, u) => { let d = ((b - a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; return a + d * u }
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')] }
const tex = (c, repeat) => {
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat) }
  return t
}
const loadImg = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src })
const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const GLYPH = { aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓' }
const glyph = (s) => GLYPH[s] + '︎'

function grain(ctx, w, h, amt, seed) {
  const r = rng(seed)
  const d = ctx.getImageData(0, 0, w, h)
  for (let i = 0; i < d.data.length; i += 4) {
    const n = (r() - 0.5) * amt
    d.data[i] += n; d.data[i + 1] += n; d.data[i + 2] += n
  }
  ctx.putImageData(d, 0, 0)
}

// ── textures ──────────────────────────────────────────────────────────────
function cobbleTexture() {
  const N = 1024
  const [c, x] = canvas(N, N)
  const r = rng(7)
  x.fillStyle = '#3d3a2c'
  x.fillRect(0, 0, N, N)
  // moss in the gaps
  for (let i = 0; i < 900; i++) {
    x.fillStyle = `rgba(${70 + r() * 30},${90 + r() * 30},${50 + r() * 20},0.35)`
    x.beginPath(); x.arc(r() * N, r() * N, 2 + r() * 6, 0, 7); x.fill()
  }
  const rows = 16
  const rh = N / rows
  for (let row = 0; row < rows; row++) {
    const cols = 11
    const cw = N / cols
    const off = (row % 2) * cw * 0.5
    for (let col = -1; col <= cols; col++) {
      const w = cw * (0.82 + r() * 0.1)
      const h = rh * (0.78 + r() * 0.1)
      const cx = col * cw + off + (cw - w) / 2 + (r() - 0.5) * 4
      const cy = row * rh + (rh - h) / 2 + (r() - 0.5) * 4
      const tone = r()
      const base = tone < 0.25 ? [156, 112, 104] : tone < 0.55 ? [136, 124, 118] : tone < 0.8 ? [162, 132, 110] : [118, 104, 108]
      const k = 0.85 + r() * 0.3
      const g = x.createLinearGradient(cx, cy, cx, cy + h)
      g.addColorStop(0, `rgb(${base[0] * k * 1.12},${base[1] * k * 1.12},${base[2] * k * 1.12})`)
      g.addColorStop(1, `rgb(${base[0] * k * 0.78},${base[1] * k * 0.78},${base[2] * k * 0.78})`)
      x.fillStyle = g
      x.beginPath()
      x.roundRect(cx, cy, w, h, 10 + r() * 8)
      x.fill()
    }
  }
  grain(x, N, N, 26, 3)
  return tex(c, 44)
}

function wheelTexture(sign) {
  const N = 2048
  const [c, x] = canvas(N, N)
  const C = N / 2
  const R = N / 2 - 4
  // bronze rim, dark house band, cream face
  x.fillStyle = '#6b4a35'; x.beginPath(); x.arc(C, C, R, 0, 7); x.fill()
  x.fillStyle = '#4a3428'; x.beginPath(); x.arc(C, C, R * 0.97, 0, 7); x.fill()
  x.fillStyle = '#ebe3d4'; x.beginPath(); x.arc(C, C, R * 0.8, 0, 7); x.fill()
  x.strokeStyle = 'rgba(60,45,35,0.55)'
  x.lineWidth = 3
  for (const k of [0.78, 0.66, 0.3, 0.27]) { x.beginPath(); x.arc(C, C, R * k, 0, 7); x.stroke() }
  // twelve houses
  x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    x.strokeStyle = 'rgba(230,214,190,0.5)'
    x.beginPath(); x.moveTo(C + Math.cos(a) * R * 0.8, C + Math.sin(a) * R * 0.8); x.lineTo(C + Math.cos(a) * R * 0.97, C + Math.sin(a) * R * 0.97); x.stroke()
    x.strokeStyle = 'rgba(60,45,35,0.35)'
    x.beginPath(); x.moveTo(C + Math.cos(a) * R * 0.3, C + Math.sin(a) * R * 0.3); x.lineTo(C + Math.cos(a) * R * 0.78, C + Math.sin(a) * R * 0.78); x.stroke()
    const m = a + Math.PI / 12
    const s = SIGNS[i]
    x.save(); x.translate(C + Math.cos(m) * R * 0.885, C + Math.sin(m) * R * 0.885); x.rotate(m + Math.PI / 2)
    x.fillStyle = s === sign ? GOLD : '#e6d6be'
    x.font = '110px "DejaVu Sans", sans-serif'
    x.fillText(glyph(s), 0, 0)
    x.restore()
    x.save(); x.translate(C + Math.cos(m) * R * 0.72, C + Math.sin(m) * R * 0.72); x.rotate(m + Math.PI / 2)
    x.fillStyle = 'rgba(60,45,35,0.7)'
    x.font = 'italic 54px "EB Garamond", serif'
    x.fillText(['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii'][i], 0, 0)
    x.restore()
  }
  // aspect lines: an eight-point star in rose
  x.strokeStyle = 'rgba(192,113,90,0.85)'
  x.lineWidth = 6
  for (const o of [0, Math.PI / 4]) {
    x.beginPath()
    for (let k = 0; k <= 4; k++) { const a = o + (k / 4) * Math.PI * 2; x.lineTo(C + Math.cos(a) * R * 0.62, C + Math.sin(a) * R * 0.62) }
    x.stroke()
  }
  x.lineWidth = 3
  x.beginPath()
  for (let k = 0; k <= 5; k++) { const a = -Math.PI / 2 + (k * 2 / 5) * Math.PI * 2; x.lineTo(C + Math.cos(a) * R * 0.62, C + Math.sin(a) * R * 0.62) }
  x.stroke()
  // the words round the centre
  x.fillStyle = 'rgba(60,45,35,0.8)'
  x.font = 'italic 64px "EB Garamond", serif'
  const words = 'read the sky before the face  ✦  it has to be mutual  ✦  '
  const rr = R * 0.2
  let a0 = -Math.PI / 2
  for (const ch of words) {
    const w = x.measureText(ch).width
    a0 += w / 2 / rr
    x.save(); x.translate(C + Math.cos(a0) * rr, C + Math.sin(a0) * rr); x.rotate(a0 + Math.PI / 2); x.fillText(ch, 0, 0); x.restore()
    a0 += w / 2 / rr
  }
  x.fillStyle = GOLD
  star(x, C, C, R * 0.08, R * 0.022, 4)
  grain(x, N, N, 18, 9)
  return tex(c)
}

function star(x, cx, cy, ro, ri, n) {
  x.beginPath()
  for (let k = 0; k < n * 2; k++) {
    const a = -Math.PI / 2 + (k / (n * 2)) * Math.PI * 2
    const r = k % 2 ? ri : ro
    x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
  }
  x.closePath(); x.fill()
}

function skyTexture(mood) {
  const [c, x] = canvas(2048, 1024)
  const m = {
    dusk: ['#2e2744', '#5e4f7e', '#b39cc4', '#e8cdd2'],
    night: ['#141026', '#2a2148', '#5e4a78', '#8a6a86'],
    sepia: ['#3a2630', '#7a4f58', '#d0988a', '#f0c9a8'],
  }[mood] || ['#1d1a26', '#3c3542', '#8a7a80', '#b59d8f']
  const g = x.createLinearGradient(0, 0, 0, 1024)
  g.addColorStop(0, m[0]); g.addColorStop(0.3, m[1]); g.addColorStop(0.47, m[2]); g.addColorStop(0.52, m[3]); g.addColorStop(1, m[3])
  x.fillStyle = g; x.fillRect(0, 0, 2048, 1024)
  const r = rng(21)
  // soft cloud banks
  for (let i = 0; i < 70; i++) {
    const cx = r() * 2048
    const cy = 260 + r() * 250
    const rad = 60 + r() * 180
    const cg = x.createRadialGradient(cx, cy, 0, cx, cy, rad)
    cg.addColorStop(0, 'rgba(200,180,170,0.10)'); cg.addColorStop(1, 'rgba(200,180,170,0)')
    x.fillStyle = cg; x.fillRect(cx - rad, cy - rad, rad * 2, rad * 2)
  }
  for (let i = 0; i < 900; i++) {
    const y = Math.pow(r(), 1.6) * 470
    const s = r() < 0.06 ? 2.4 : 1.1
    x.fillStyle = `rgba(255,248,235,${0.25 + r() * 0.7 * (1 - y / 520)})`
    x.beginPath(); x.arc(r() * 2048, y, s, 0, 7); x.fill()
  }
  grain(x, 2048, 1024, 10, 5)
  return tex(c)
}

function glowTexture(inner = 'rgba(255,240,210,1)') {
  const [c, x] = canvas(256, 256)
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, inner); g.addColorStop(0.2, 'rgba(255,225,180,0.45)'); g.addColorStop(1, 'rgba(255,210,160,0)')
  x.fillStyle = g; x.fillRect(0, 0, 256, 256)
  return tex(c)
}

function raysTexture() {
  const [c, x] = canvas(512, 512)
  const r = rng(4)
  x.translate(256, 256)
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2 + r() * 0.1
    const len = 120 + r() * 130
    const g = x.createLinearGradient(0, 0, Math.cos(a) * len, Math.sin(a) * len)
    g.addColorStop(0, 'rgba(255,236,200,0.9)'); g.addColorStop(1, 'rgba(255,220,180,0)')
    x.strokeStyle = g; x.lineWidth = i % 3 ? 2 : 4
    x.beginPath(); x.moveTo(Math.cos(a) * 30, Math.sin(a) * 30); x.lineTo(Math.cos(a) * len, Math.sin(a) * len); x.stroke()
  }
  return tex(c)
}

function moonTexture(phase) {
  const [c, x] = canvas(512, 512)
  const r = rng(12)
  x.fillStyle = '#f4ecd8'; x.beginPath(); x.arc(256, 256, 250, 0, 7); x.fill()
  x.save(); x.beginPath(); x.arc(256, 256, 250, 0, 7); x.clip()
  for (let i = 0; i < 40; i++) {
    const cx = 60 + r() * 400, cy = 60 + r() * 400, rad = 10 + r() * 60
    x.fillStyle = `rgba(170,155,140,${0.12 + r() * 0.2})`
    x.beginPath(); x.arc(cx, cy, rad, 0, 7); x.fill()
  }
  if (phase === 'crescent') {
    x.globalCompositeOperation = 'destination-out'
    x.beginPath(); x.arc(330, 220, 250, 0, 7); x.fill()
  }
  x.restore()
  return tex(c)
}

function wrapWords(x, text, maxW) {
  const words = text.split(/\s+/)
  const lines = []
  let line = []
  for (const w of words) {
    const test = [...line, w].join(' ')
    if (x.measureText(test).width > maxW && line.length) { lines.push(line); line = [w] } else line.push(w)
  }
  if (line.length) lines.push(line)
  return lines
}

function drawIcon(x, kind, cx, cy, s, color) {
  x.save()
  x.strokeStyle = color; x.fillStyle = color; x.lineWidth = s * 0.07; x.lineCap = 'round'
  if (kind === 'moon') {
    x.beginPath(); x.arc(cx, cy, s * 0.45, Math.PI * 0.35, Math.PI * 1.65); x.arc(cx + s * 0.22, cy, s * 0.36, Math.PI * 1.45, Math.PI * 0.55, true); x.closePath(); x.stroke()
  } else if (kind === 'full') {
    x.beginPath(); x.arc(cx, cy, s * 0.42, 0, 7); x.stroke()
    x.globalAlpha = 0.25; x.beginPath(); x.arc(cx, cy, s * 0.42, 0, 7); x.fill()
  } else if (kind === 'heart') {
    x.beginPath(); x.moveTo(cx, cy + s * 0.38)
    x.bezierCurveTo(cx - s * 0.6, cy - s * 0.05, cx - s * 0.3, cy - s * 0.55, cx, cy - s * 0.2)
    x.bezierCurveTo(cx + s * 0.3, cy - s * 0.55, cx + s * 0.6, cy - s * 0.05, cx, cy + s * 0.38); x.stroke()
  } else if (kind === 'door') {
    x.beginPath(); x.moveTo(cx - s * 0.28, cy + s * 0.45); x.lineTo(cx - s * 0.28, cy - s * 0.15); x.arc(cx, cy - s * 0.15, s * 0.28, Math.PI, 0); x.lineTo(cx + s * 0.28, cy + s * 0.45); x.closePath(); x.stroke()
    x.beginPath(); x.arc(cx + s * 0.13, cy + s * 0.12, s * 0.04, 0, 7); x.fill()
  } else if (kind === 'key') {
    x.beginPath(); x.arc(cx - s * 0.22, cy, s * 0.17, 0, 7); x.stroke()
    x.beginPath(); x.moveTo(cx - s * 0.05, cy); x.lineTo(cx + s * 0.42, cy); x.moveTo(cx + s * 0.3, cy); x.lineTo(cx + s * 0.3, cy + s * 0.14); x.moveTo(cx + s * 0.4, cy); x.lineTo(cx + s * 0.4, cy + s * 0.12); x.stroke()
  } else if (kind === 'eye') {
    x.beginPath(); x.moveTo(cx - s * 0.45, cy); x.quadraticCurveTo(cx, cy - s * 0.42, cx + s * 0.45, cy); x.quadraticCurveTo(cx, cy + s * 0.42, cx - s * 0.45, cy); x.stroke()
    x.beginPath(); x.arc(cx, cy, s * 0.12, 0, 7); x.fill()
  } else if (kind === 'card') {
    x.beginPath(); x.roundRect(cx - s * 0.24, cy - s * 0.36, s * 0.48, s * 0.72, s * 0.06); x.stroke()
    star(x, cx, cy, s * 0.16, s * 0.05, 4)
  } else if (kind.startsWith('glyph:')) {
    x.font = `${s * 0.8}px "DejaVu Sans", sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(glyph(kind.slice(6)), cx, cy + s * 0.04)
  } else {
    star(x, cx, cy, s * 0.42, s * 0.11, 4)
  }
  x.restore()
}

// A paper card: icon, the line in italic serif with one word in rose, a small
// caps footer.
function cardTexture(beat, sign) {
  const Wc = 900, Hc = 1200
  const [c, x] = canvas(Wc, Hc)
  x.fillStyle = PAPER; x.fillRect(0, 0, Wc, Hc)
  const pg = x.createRadialGradient(Wc / 2, Hc / 2, 200, Wc / 2, Hc / 2, 800)
  pg.addColorStop(0, 'rgba(255,255,255,0)'); pg.addColorStop(1, 'rgba(120,95,70,0.22)')
  x.fillStyle = pg; x.fillRect(0, 0, Wc, Hc)
  x.strokeStyle = 'rgba(70,60,52,0.55)'; x.lineWidth = 3
  x.strokeRect(40, 40, Wc - 80, Hc - 80)
  x.strokeStyle = 'rgba(70,60,52,0.25)'; x.lineWidth = 2
  x.strokeRect(56, 56, Wc - 112, Hc - 112)
  drawIcon(x, beat.icon || 'star', Wc / 2, 250, 170, ROSE)
  // the line
  const size = beat.text.length > 36 ? 104 : beat.text.length > 26 ? 116 : 128
  x.font = `italic 500 ${size}px "EB Garamond", serif`
  x.textAlign = 'left'; x.textBaseline = 'middle'
  // balance the lines: the narrowest width that still needs no more lines
  const maxW = Wc - 170
  const count = wrapWords(x, beat.text, maxW).length
  let lo = 200, hi = maxW
  while (hi - lo > 4) { const mid = (lo + hi) / 2; if (wrapWords(x, beat.text, mid).length > count) lo = mid; else hi = mid }
  const lines = wrapWords(x, beat.text, hi)
  const lh = size * 1.12
  const top = 640 - ((lines.length - 1) * lh) / 2
  const accent = (beat.accent || '').toLowerCase().split(/\s+/).filter(Boolean)
  lines.forEach((ws, li) => {
    const full = ws.join(' ')
    let px = (Wc - x.measureText(full).width) / 2
    for (const w of ws) {
      const bare = w.toLowerCase().replace(/[^a-z0-9']/g, '')
      x.fillStyle = accent.includes(bare) ? ROSE : INK
      x.fillText(w, px, top + li * lh)
      px += x.measureText(w + ' ').width
    }
  })
  x.font = '700 40px "Space Mono", monospace'
  x.textAlign = 'center'
  x.fillStyle = 'rgba(70,60,52,0.85)'
  const foot = (beat.sub || sign).toUpperCase().split('').join('\u200A')
  x.fillText(foot, Wc / 2, Hc - 120)
  grain(x, Wc, Hc, 14, beat.text.length)
  return tex(c)
}

function arrowTexture(text, flip) {
  const [c, x] = canvas(1024, 200)
  x.save()
  if (flip) { x.translate(1024, 0); x.scale(-1, 1) }
  x.fillStyle = PAPER
  x.beginPath(); x.moveTo(8, 20); x.lineTo(890, 20); x.lineTo(1010, 100); x.lineTo(890, 180); x.lineTo(8, 180); x.closePath(); x.fill()
  x.strokeStyle = 'rgba(60,50,45,0.6)'; x.lineWidth = 4; x.stroke()
  x.restore()
  x.fillStyle = INK
  x.font = 'italic 500 84px "EB Garamond", serif'
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, flip ? 560 : 460, 102)
  grain(x, 1024, 200, 12, text.length)
  return tex(c)
}

function windowsTexture(wall, seed) {
  const [c, x] = canvas(256, 256)
  const r = rng(seed)
  x.fillStyle = wall; x.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 400; i++) { x.fillStyle = `rgba(0,0,0,${r() * 0.08})`; x.fillRect(r() * 256, r() * 256, 6, 3) }
  for (let row = 0; row < 2; row++) for (let col = 0; col < 2; col++) {
    const lit = r() < 0.6
    x.fillStyle = lit ? '#f2c77a' : '#2a2630'
    x.fillRect(40 + col * 120, 50 + row * 110, 56, 66)
    x.strokeStyle = '#3b2e28'; x.lineWidth = 6; x.strokeRect(40 + col * 120, 50 + row * 110, 56, 66)
    x.beginPath(); x.moveTo(68 + col * 120, 50 + row * 110); x.lineTo(68 + col * 120, 116 + row * 110); x.stroke()
  }
  return tex(c)
}

function clockTexture() {
  const [c, x] = canvas(512, 512)
  x.fillStyle = '#efe6d2'; x.beginPath(); x.arc(256, 256, 240, 0, 7); x.fill()
  x.strokeStyle = '#3a2c25'; x.lineWidth = 14; x.stroke()
  x.fillStyle = '#3a2c25'
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    x.save(); x.translate(256 + Math.sin(a) * 195, 256 - Math.cos(a) * 195); x.rotate(a); x.fillRect(-6, -22, 12, 44); x.restore()
  }
  return tex(c)
}

function veilTexture(img, seed) {
  const [c, x] = canvas(360, 520)
  x.fillStyle = '#1c1830'; x.beginPath(); x.roundRect(0, 0, 360, 520, 26); x.fill()
  if (img) {
    x.save(); x.beginPath(); x.roundRect(22, 22, 316, 476, 16); x.clip()
    x.filter = 'blur(14px) saturate(0.7)'
    x.drawImage(img, -20, -20, 400, 560)
    x.filter = 'none'
    x.fillStyle = 'rgba(40,30,70,0.45)'; x.fillRect(0, 0, 360, 520)
    x.restore()
  }
  x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.roundRect(14, 14, 332, 492, 20); x.stroke()
  x.fillStyle = GOLD; star(x, 180, 260, 46, 12, 4)
  x.font = '22px "Space Mono", monospace'; x.textAlign = 'center'
  x.fillText('V E I L E D', 180, 460)
  grain(x, 360, 520, 14, seed)
  return tex(c)
}

function exhibitTexture(img, title, sub) {
  const [c, x] = canvas(600, 860)
  x.fillStyle = '#6e5038'; x.fillRect(0, 0, 600, 700)
  x.fillStyle = '#d9c8a6'; x.fillRect(22, 22, 556, 656)
  if (img) x.drawImage(img, 44, 44, 512, 612)
  x.fillStyle = PAPER; x.fillRect(30, 712, 540, 130)
  x.strokeStyle = 'rgba(60,50,45,0.5)'; x.lineWidth = 3; x.strokeRect(30, 712, 540, 130)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = 'italic 500 50px "EB Garamond", serif'; x.fillText(title, 300, 760)
  x.font = '22px "Space Mono", monospace'; x.fillStyle = 'rgba(70,60,52,0.7)'; x.fillText(sub.toUpperCase().split('').join('\u200A'), 300, 812)
  grain(x, 600, 860, 12, title.length)
  return tex(c)
}

// The sign's figure from the app, cut out like paper: the glow becomes the
// shape, with a white die-cut edge and a soft shadow.
function cutoutTexture(img, shape, sign) {
  const w = 600, h = 760, pad = 36
  const [c, x] = canvas(w + pad * 2, h + pad * 2)
  const path = (inset) => {
    const X = pad + inset, Y = pad + inset, Wd = w - inset * 2, Hd = h - inset * 2
    x.beginPath()
    if (shape === 'circle') x.arc(pad + w / 2, pad + w / 2 + (h - w) / 2, w / 2 - inset, 0, 7)
    else if (shape === 'arch') { x.moveTo(X, Y + Hd); x.lineTo(X, Y + Wd / 2); x.arc(X + Wd / 2, Y + Wd / 2, Wd / 2, Math.PI, 0); x.lineTo(X + Wd, Y + Hd); x.closePath() }
    else x.roundRect(X, Y, Wd, Hd, 30)
  }
  // paper edge with a soft shadow
  x.save(); x.shadowColor = 'rgba(40,20,50,0.45)'; x.shadowBlur = 26; x.shadowOffsetY = 12
  x.fillStyle = '#f6efe2'; path(0); x.fill(); x.restore()
  x.save(); path(18); x.clip()
  const ih = shape === 'circle' ? w : h - 36 - (shape === 'card' ? 90 : 0)
  const scale = Math.max((w - 36) / img.width, ih / img.height)
  x.drawImage(img, pad + w / 2 - (img.width * scale) / 2, pad + 18 + (shape === 'circle' ? (h - w) / 2 : 0) + (ih - img.height * scale) / 2, img.width * scale, img.height * scale)
  x.restore()
  if (shape === 'card') {
    x.fillStyle = '#f6efe2'; x.fillRect(pad + 18, pad + h - 108, w - 36, 90)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = 'italic 500 58px "EB Garamond", serif'; x.fillText(sign, pad + w / 2, pad + h - 62)
  }
  if (shape === 'circle') { const [cc, cx] = canvas(w + pad * 2, w + pad * 2); cx.drawImage(c, 0, -(h - w) / 2); grain(cx, w + pad * 2, w + pad * 2, 12, 5); return [tex(cc), 1] }
  grain(x, w + pad * 2, h + pad * 2, 12, 5)
  return [tex(c), (h + pad * 2) / (w + pad * 2)]
}

// The sign's glowing figure from the app, turned into a pale ghost for the sky.
function ghostTexture(img) {
  const [c, x] = canvas(640, 560)
  x.drawImage(img, 0, 0, 640, 560)
  const d = x.getImageData(0, 0, 640, 560)
  for (let i = 0; i < d.data.length; i += 4) {
    const l = (0.3 * d.data[i] + 0.59 * d.data[i + 1] + 0.11 * d.data[i + 2]) / 255
    const v = Math.pow(l, 1.3)
    d.data[i] = 250 * v; d.data[i + 1] = 236 * v; d.data[i + 2] = 214 * v; d.data[i + 3] = 255
  }
  x.putImageData(d, 0, 0)
  // feather the edges so no rectangle shows
  x.globalCompositeOperation = 'destination-in'
  const g = x.createRadialGradient(320, 280, 120, 320, 280, 320)
  g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)')
  x.fillStyle = g; x.fillRect(0, 0, 640, 560)
  return tex(c)
}

// ── scene pieces ──────────────────────────────────────────────────────────
const lambert = (o) => new THREE.MeshLambertMaterial(o)

function shadowBlob(group, r, y = 0.015) {
  const m = new THREE.Mesh(new THREE.CircleGeometry(r, 24), new THREE.MeshBasicMaterial({ map: S.shadowTex, transparent: true, depthWrite: false }))
  m.rotation.x = -Math.PI / 2; m.position.y = y
  group.add(m)
}

function lamppost(x, z, h = 4.6) {
  const g = new THREE.Group()
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, h, 10), lambert({ color: '#2e231d' }))
  pole.position.y = h / 2; g.add(pole)
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.35, 10), lambert({ color: '#2e231d' }))
  base.position.y = 0.17; g.add(base)
  const globe = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 14), new THREE.MeshBasicMaterial({ color: '#fff3dc' }))
  globe.scale.y = 1.25; globe.position.y = h + 0.3; g.add(globe)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.8 }))
  glow.scale.set(3.4, 3.4, 1); glow.position.y = h + 0.3; g.add(glow)
  shadowBlob(g, 0.7)
  g.position.set(x, 0, z)
  S.scene.add(g)
  return g
}

function easel(tx, w, h, pos, yaw, cy) {
  const g = new THREE.Group()
  const card = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tx, toneMapped: false }))
  card.position.y = cy
  g.add(card)
  const back = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, h + 0.06, 0.04), lambert({ color: '#cdbfa8' }))
  back.position.set(0, cy, -0.035); g.add(back)
  const legM = lambert({ color: '#3a2c24' })
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, cy + 0.2, 0.05), legM)
    leg.position.set(s * w * 0.32, (cy + 0.2) / 2 - 0.05, -0.12); leg.rotation.x = 0.06; g.add(leg)
  }
  shadowBlob(g, w * 0.55)
  g.position.copy(pos); g.rotation.y = yaw
  S.scene.add(g)
  return g
}

function signpost(x, z, boards, yaw) {
  const g = new THREE.Group()
  const pole = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 0.12), lambert({ color: '#3a2c24' }))
  pole.position.y = 1.6; g.add(pole)
  boards.forEach((t, i) => {
    const flip = i % 2 === 1
    const b = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.37), new THREE.MeshLambertMaterial({ map: arrowTexture(t, flip), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }))
    b.position.set(flip ? -0.85 : 0.85, 2.85 - i * 0.48, 0.08)
    b.rotation.z = (flip ? 1 : -1) * 0.04 * (i + 1)
    b.rotation.y = (flip ? -1 : 1) * 0.12
    g.add(b)
  })
  shadowBlob(g, 0.5)
  g.position.set(x, 0, z); g.rotation.y = yaw
  S.scene.add(g)
}

function house(ang, rad, seed) {
  const r = rng(seed)
  const g = new THREE.Group()
  const w = 3 + r() * 2.2, d = 3 + r() * 1.5, h = 3 + r() * 2.6
  const walls = ['#c9a48c', '#d8cbb3', '#9e7a6a', '#b9a07a', '#a88f8a']
  const wall = walls[Math.floor(r() * walls.length)]
  const wt = windowsTexture(wall, seed)
  wt.wrapS = wt.wrapT = THREE.RepeatWrapping; wt.repeat.set(Math.round(w / 1.6), Math.round(h / 1.6))
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lambert({ map: wt }))
  body.position.y = h / 2; g.add(body)
  const roofs = ['#5a3f3a', '#6b4b40', '#46404a', '#7a5145']
  const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * 0.78, 1.6 + r() * 1.2, 4), lambert({ color: roofs[Math.floor(r() * roofs.length)] }))
  roof.rotation.y = Math.PI / 4; roof.position.y = h + 0.8; g.add(roof)
  if (r() < 0.5) {
    const ch = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.4), lambert({ color: '#5b443b' }))
    ch.position.set(w * 0.25, h + 1.1, 0); g.add(ch)
  }
  g.position.set(Math.cos(ang) * rad, 0, Math.sin(ang) * rad)
  g.lookAt(0, 0, 0)
  S.scene.add(g)
}

function tree(ang, rad, seed) {
  const r = rng(seed)
  const g = new THREE.Group()
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 1.6, 6), lambert({ color: '#3d2c22' }))
  trunk.position.y = 0.8; g.add(trunk)
  const cols = ['#c98a4b', '#b8743f', '#a9894f', '#7d8455']
  const crown = new THREE.Mesh(new THREE.SphereGeometry(0.75 + r() * 0.3, 16, 12), lambert({ color: cols[Math.floor(r() * cols.length)] }))
  crown.position.y = 2.1; g.add(crown)
  shadowBlob(g, 0.9)
  g.position.set(Math.cos(ang) * rad, 0, Math.sin(ang) * rad)
  S.scene.add(g)
}

function clockTower(ang, rad) {
  const g = new THREE.Group()
  const body = new THREE.Mesh(new THREE.BoxGeometry(3, 10, 3), lambert({ color: '#b98f7c' }))
  body.position.y = 5; g.add(body)
  const top = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.4, 3.4), lambert({ color: '#6b4b40' }))
  top.position.y = 10.2; g.add(top)
  const roof = new THREE.Mesh(new THREE.ConeGeometry(2.6, 2.8, 4), lambert({ color: '#4c3a3a' }))
  roof.rotation.y = Math.PI / 4; roof.position.y = 11.8; g.add(roof)
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.5), lambert({ color: '#c0715a', side: THREE.DoubleSide }))
  flag.position.set(0.42, 13.6, 0); g.add(flag)
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 6), lambert({ color: '#2e231d' }))
  mast.position.y = 13.4; g.add(mast)
  const face = new THREE.Mesh(new THREE.CircleGeometry(1.15, 40), new THREE.MeshBasicMaterial({ map: clockTexture() }))
  face.position.set(0, 8.2, 1.52); g.add(face)
  const handM = new THREE.MeshBasicMaterial({ color: '#2a201b' })
  const hour = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.6, 0.02), handM)
  hour.geometry.translate(0, 0.27, 0); hour.position.set(0, 8.2, 1.55); g.add(hour)
  const min = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.9, 0.02), handM)
  min.geometry.translate(0, 0.42, 0); min.position.set(0, 8.2, 1.56); g.add(min)
  shadowBlob(g, 2.6)
  g.position.set(Math.cos(ang) * rad, 0, Math.sin(ang) * rad)
  g.lookAt(0, 0, 0)
  S.scene.add(g)
  S.hands = { hour, min, flag }
}

function observatory(ang, rad) {
  const g = new THREE.Group()
  const body = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 4, 24), lambert({ map: windowsTexture('#a0786a', 77) }))
  body.material.map.wrapS = THREE.RepeatWrapping; body.material.map.repeat.set(5, 1.4)
  body.position.y = 2; g.add(body)
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2.6, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), lambert({ color: '#8f5a4a' }))
  dome.position.y = 4; g.add(dome)
  const slit = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.6, 0.5), lambert({ color: '#1d1820' }))
  slit.position.set(0, 5.1, 2.0); slit.rotation.x = -0.6; g.add(slit)
  const scope = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 2.4, 10), lambert({ color: '#c9a66b' }))
  scope.position.set(0, 6.2, 1.5); scope.rotation.x = 0.7; g.add(scope)
  g.position.set(Math.cos(ang) * rad, 0, Math.sin(ang) * rad)
  g.lookAt(0, 0, 0)
  S.scene.add(g)
}

function stall(pos, yaw, seed) {
  const r = rng(seed)
  const g = new THREE.Group()
  const wood = lambert({ color: '#5a4033' })
  const counter = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 0.9), lambert({ color: '#8a6a52' }))
  counter.position.y = 0.45; g.add(counter)
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.07, 2.2, 0.07), wood)
    p.position.set(sx * 1.05, 1.1, sz * 0.42); g.add(p)
  }
  const [c, x] = canvas(256, 64)
  const cols = [['#c0715a', '#efe4d2'], ['#6f6aa8', '#efe4d2'], ['#3f7a6a', '#efe4d2']][Math.floor(r() * 3)]
  for (let i = 0; i < 8; i++) { x.fillStyle = cols[i % 2]; x.fillRect(i * 32, 0, 32, 64) }
  const awn = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.2), lambert({ map: tex(c), side: THREE.DoubleSide }))
  awn.position.set(0, 2.3, 0.15); awn.rotation.x = -1.05; g.add(awn)
  // jars of light on the counter
  for (let i = 0; i < 4; i++) {
    const j = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.22, 10), new THREE.MeshBasicMaterial({ color: ['#ffd98a', '#f6b8dc', '#b8d4ff', '#ffe9c4'][i] }))
    j.position.set(-0.75 + i * 0.5, 1.02, 0.1); g.add(j)
    const gl = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.5 }))
    gl.scale.set(0.7, 0.7, 1); gl.position.copy(j.position); g.add(gl)
  }
  shadowBlob(g, 1.4)
  g.position.copy(pos); g.rotation.y = yaw
  S.scene.add(g)
}

// Bulbs strung on a sagging wire between two points.
function stringLights(a, b, h, n) {
  const pts = []
  for (let k = 0; k <= 24; k++) {
    const u = k / 24
    pts.push(new THREE.Vector3(lerp(a.x, b.x, u), h - Math.sin(u * Math.PI) * 0.7, lerp(a.z, b.z, u)))
  }
  S.scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: '#2a2020' })))
  for (let k = 1; k < n; k++) {
    const u = k / n
    const p = new THREE.Vector3(lerp(a.x, b.x, u), h - Math.sin(u * Math.PI) * 0.7 - 0.08, lerp(a.z, b.z, u))
    const bulb = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, blending: THREE.AdditiveBlending, depthWrite: false, color: k % 3 ? '#ffd9a0' : '#ffb0c8' }))
    bulb.scale.set(0.42, 0.42, 1); bulb.position.copy(p); S.scene.add(bulb)
  }
}

// A sign's constellation, drawn for the sky: stars, lines and its name.
const CONST = {
  aries: [[0, 0.5], [0.4, 0.38], [0.7, 0.42], [0.88, 0.58]],
  taurus: [[0, 0.1], [0.32, 0.42], [0.5, 0.55], [0.62, 0.48], [1, 0.2], [0.5, 0.55], [0.46, 0.8]],
  gemini: [[0.2, 0.05], [0.25, 0.5], [0.3, 0.95], [0.25, 0.5], [0.7, 0.5], [0.65, 0.05], [0.7, 0.5], [0.78, 0.95]],
  cancer: [[0.5, 0.1], [0.5, 0.5], [0.15, 0.85], [0.5, 0.5], [0.85, 0.8]],
  leo: [[0.15, 0.7], [0.45, 0.65], [0.85, 0.75], [0.7, 0.4], [0.75, 0.15], [0.55, 0.1], [0.45, 0.3], [0.45, 0.65]],
  virgo: [[0.05, 0.2], [0.3, 0.35], [0.5, 0.3], [0.7, 0.45], [0.95, 0.4], [0.7, 0.45], [0.6, 0.8], [0.3, 0.35], [0.3, 0.75]],
  libra: [[0.5, 0.1], [0.15, 0.45], [0.85, 0.45], [0.5, 0.1], [0.15, 0.45], [0.25, 0.85], [0.85, 0.45], [0.75, 0.85]],
  scorpio: [[0.05, 0.15], [0.2, 0.3], [0.35, 0.4], [0.45, 0.6], [0.55, 0.8], [0.75, 0.88], [0.92, 0.75], [0.95, 0.6]],
  sagittarius: [[0.1, 0.8], [0.4, 0.55], [0.6, 0.35], [0.85, 0.12], [0.6, 0.35], [0.45, 0.2], [0.6, 0.35], [0.75, 0.5]],
  capricorn: [[0.1, 0.2], [0.3, 0.75], [0.7, 0.85], [0.95, 0.4], [0.6, 0.35], [0.1, 0.2]],
  aquarius: [[0.05, 0.5], [0.2, 0.35], [0.35, 0.5], [0.5, 0.35], [0.65, 0.5], [0.8, 0.35], [0.95, 0.5]],
  pisces: [[0.05, 0.15], [0.15, 0.4], [0.35, 0.8], [0.55, 0.6], [0.8, 0.5], [0.95, 0.35], [0.85, 0.25], [0.8, 0.5]],
}
function constellationTexture(sign) {
  const [c, x] = canvas(1024, 1024)
  const pts = CONST[sign].map(([a, b]) => [112 + a * 800, 112 + b * 700])
  x.strokeStyle = 'rgba(255,240,215,0.55)'; x.lineWidth = 3
  x.beginPath(); pts.forEach(([a, b], k) => (k ? x.lineTo(a, b) : x.moveTo(a, b))); x.stroke()
  for (const [a, b] of pts) {
    const g = x.createRadialGradient(a, b, 0, a, b, 40)
    g.addColorStop(0, 'rgba(255,248,230,1)'); g.addColorStop(0.15, 'rgba(255,236,200,0.8)'); g.addColorStop(1, 'rgba(255,220,180,0)')
    x.fillStyle = g; x.fillRect(a - 40, b - 40, 80, 80)
  }
  x.fillStyle = 'rgba(255,240,215,0.8)'
  x.font = '44px "Space Mono", monospace'; x.textAlign = 'center'
  return tex(c)
}

// Stardust: Align's little star-headed walker.
function stardust() {
  const g = new THREE.Group()
  const [c, x] = canvas(64, 256)
  const gr = x.createLinearGradient(0, 0, 0, 256)
  gr.addColorStop(0, '#f6b8dc'); gr.addColorStop(0.55, '#d58ce8'); gr.addColorStop(1, '#8fb4f2')
  x.fillStyle = gr; x.fillRect(0, 0, 64, 256)
  const bodyM = new THREE.MeshLambertMaterial({ map: tex(c), emissive: '#6a3a70' })
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.42, 28, 20), bodyM)
  body.scale.set(1, 0.92, 0.95); body.position.y = 0.62; g.add(body)
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.26, 12), bodyM)
    ear.position.set(s * 0.24, 1.0, 0); ear.rotation.z = -s * 0.45; g.add(ear)
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.32, 10), lambert({ color: '#c9d8ff', emissive: '#30406a' }))
    leg.position.set(s * 0.15, 0.17, 0); g.add(leg)
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), new THREE.MeshBasicMaterial({ color: '#241a2a' }))
    eye.position.set(s * 0.14, 0.7, 0.37); g.add(eye)
    const hi = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffffff' }))
    hi.position.set(s * 0.14 + 0.015, 0.72, 0.415); g.add(hi)
    const cheek = new THREE.Mesh(new THREE.CircleGeometry(0.05, 14), new THREE.MeshBasicMaterial({ color: '#f07aa8', transparent: true, opacity: 0.7 }))
    cheek.position.set(s * 0.25, 0.6, 0.355); cheek.rotation.y = s * 0.55; g.add(cheek)
  }
  const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3, 6), lambert({ color: '#c9a66b' }))
  stalk.position.y = 1.15; g.add(stalk)
  const shape = new THREE.Shape()
  for (let k = 0; k < 10; k++) { const a = Math.PI / 2 + (k / 10) * Math.PI * 2; const r = k % 2 ? 0.05 : 0.13; k ? shape.lineTo(Math.cos(a) * r, Math.sin(a) * r) : shape.moveTo(Math.cos(a) * r, Math.sin(a) * r) }
  const starM = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: false }), new THREE.MeshBasicMaterial({ color: '#ffd987' }))
  starM.position.y = 1.32; g.add(starM)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.6 }))
  glow.scale.set(0.9, 0.9, 1); glow.position.y = 1.32; g.add(glow)
  shadowBlob(g, 0.45)
  S.scene.add(g)
  return g
}

// ── setup ─────────────────────────────────────────────────────────────────
window.setup = async (script, assets) => {
  for (const [family, src, style, weight] of assets.fonts) {
    const f = new FontFace(family, `url(${src})`, { style, weight })
    await f.load(); document.fonts.add(f)
  }
  const sign = script.sign
  const out = document.getElementById('c')
  out.width = W; out.height = H
  const gl = document.createElement('canvas')
  const renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true, preserveDrawingBuffer: true })
  renderer.setPixelRatio(1)
  renderer.setSize(W, H, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(56, W / H, 0.05, 400)
  S = { script, renderer, scene, camera, out, octx: out.getContext('2d') }

  const imgs = {}
  for (const [k, src] of Object.entries(assets.images)) imgs[k] = await loadImg(src)

  const mood = script.sky || 'dusk'
  const haze = { dusk: '#b9a4c8', night: '#5a4874', sepia: '#d2a493' }[mood] || '#b9a4c8'
  scene.fog = new THREE.Fog(haze, 16, 70)
  scene.add(new THREE.HemisphereLight('#ecd8f4', '#7a5a4a', mood === 'night' ? 1.25 : 1.9))
  const key = new THREE.DirectionalLight('#ffe2c0', 1.3)
  key.position.set(-20, 30, 10); scene.add(key)

  S.glowTex = glowTexture()
  const [sc, sx] = canvas(128, 128)
  const sg = sx.createRadialGradient(64, 64, 0, 64, 64, 64)
  sg.addColorStop(0, 'rgba(20,12,10,0.55)'); sg.addColorStop(1, 'rgba(20,12,10,0)')
  sx.fillStyle = sg; sx.fillRect(0, 0, 128, 128)
  S.shadowTex = tex(sc)

  const sky = new THREE.Mesh(new THREE.SphereGeometry(180, 48, 24), new THREE.MeshBasicMaterial({ map: skyTexture(mood), side: THREE.BackSide, fog: false }))
  scene.add(sky)

  const ground = new THREE.Mesh(new THREE.CircleGeometry(120, 64), lambert({ map: cobbleTexture() }))
  ground.rotation.x = -Math.PI / 2; scene.add(ground)
  const wheel = new THREE.Mesh(new THREE.CircleGeometry(6.2, 96), lambert({ map: wheelTexture(sign) }))
  wheel.rotation.x = -Math.PI / 2; wheel.position.y = 0.01; scene.add(wheel)

  // the beats: cards round the wheel, alternating outer and inner rings
  const beats = script.beats
  const n = beats.length
  const step = (Math.PI * 1.7) / Math.max(1, n - 1)
  let hash = 0
  for (const ch of script.id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  const R = rng(hash)
  const a0 = -Math.PI / 2 + R() * Math.PI * 2
  camera.fov = 50 + R() * 10; camera.updateProjectionMatrix()
  const baseDist = 4.4 + R() * 1.0
  const eye = 1.5 + R() * 0.5
  let outerNext = R() < 0.5
  S.holds = beats.map((b, i) => {
    const ang = a0 + i * step
    const outer = outerNext
    outerNext = R() < 0.25 ? !outerNext : outerNext
    const dir = new THREE.Vector3(Math.cos(ang), 0, Math.sin(ang))
    const rP = outer ? 10 : 4.4
    const P = dir.clone().multiplyScalar(rP)
    const face = outer ? dir.clone().negate() : dir.clone()
    const yaw = Math.atan2(face.x, face.z)
    const cardTex = cardTexture(b, sign)
    easel(cardTex, 1.5, 2.0, P, yaw, 1.6).userData.card = true
    const dist = i === 0 ? 5.0 : baseDist
    const cam = P.clone().addScaledVector(face, dist)
    cam.y = eye
    const side = R() < 0.5 ? -1 : 1 // card sits left or right of centre
    const tangent = new THREE.Vector3(face.z, 0, -face.x)
    const look = P.clone().addScaledVector(tangent, i === 0 ? side * 0.12 : side * 0.3)
    look.y = 2.0 + (eye - 1.75) * 0.5
    const dx = look.x - cam.x, dz = look.z - cam.z
    return { P, face, tangent, side, cam, yaw: Math.atan2(dx, dz), pitch: Math.atan2(look.y - cam.y, Math.hypot(dx, dz)) }
  })

  // lampposts between the beats, plus one in the foreground of the opening shot
  for (let i = 0; i < 14; i++) {
    const ang = a0 + (i + 0.5) * ((Math.PI * 2) / 14)
    lamppost(Math.cos(ang) * 11.6, Math.sin(ang) * 11.6)
  }
  const h0 = S.holds[0]
  const fore = h0.cam.clone().lerp(h0.P, 0.3).addScaledVector(h0.tangent, h0.side * 0.42)

  // signposts to the houses
  const posts = script.signposts || [['the 5th · romance', 'the 7th · partners'], ['the 8th · secrets', 'the 11th · friends'], ['the 2nd · money', 'the 12th · endings'], ['the 4th · home', 'the 1st · you']]
  posts.forEach((bs, i) => {
    const ang = a0 + (i + 0.5) * (Math.PI * 2 / posts.length) + 0.3
    const r = 13.4
    signpost(Math.cos(ang) * r, Math.sin(ang) * r, bs, Math.atan2(-Math.cos(ang), -Math.sin(ang)))
  })

  // exhibits: framed auras with Align's ideas on the plaques
  const exhibits = script.exhibits || [['Read the Sky First', sign + ' · a habit'], ['It Has to Be Mutual', 'libra · a rule'], ['Released, Not Haunted', 'scorpio · a lesson'], ['Dealbreakers Up Front', 'virgo · a kindness']]
  exhibits.forEach(([title, sub], i) => {
    const s = sub.split(' ')[0]
    const ang = a0 + (i + 0.25) * (Math.PI * 2 / exhibits.length) + 0.9
    const P = new THREE.Vector3(Math.cos(ang) * 14.5, 0, Math.sin(ang) * 14.5)
    easel(exhibitTexture(imgs['aura:' + s], title, sub), 1.6, 2.3, P, Math.atan2(-P.x, -P.z), 1.7)
  })

  // Is p (with radius r) inside the wedge from a camera spot to its card?
  const segDist = (p, a, b) => {
    const u = clamp(((p.x - a.x) * (b.x - a.x) + (p.z - a.z) * (b.z - a.z)) / ((b.x - a.x) ** 2 + (b.z - a.z) ** 2))
    return Math.hypot(p.x - (a.x + (b.x - a.x) * u), p.z - (a.z + (b.z - a.z) * u))
  }
  const blocksView = (p, r) => S.holds.some((h) => {
    const l = h.P.clone().addScaledVector(h.tangent, -1.1), rr = h.P.clone().addScaledVector(h.tangent, 1.1)
    if (segDist(p, h.cam, l) < r || segDist(p, h.cam, rr) < r || segDist(p, h.cam, h.P) < r) return true
    // inside the triangle?
    const cross = (a, b, c) => (b.x - a.x) * (c.z - a.z) - (b.z - a.z) * (c.x - a.x)
    const d1 = cross(h.cam, l, p), d2 = cross(l, rr, p), d3 = cross(rr, h.cam, p)
    return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0))
  })
  // something to look at beside every card, on the empty side of the frame
  const dressing = ['post', 'exhibit', 'stall', 'post', 'exhibit', 'stall', 'post', 'exhibit', 'stall'].sort(() => R() - 0.5)
  const exQ = [...exhibits]
  const postQ = [...posts]
  S.holds.forEach((h, i) => {
    const kind = dressing[i % dressing.length]
    // slide it sideways until it's clear of every card's sightline
    let p
    for (const [k, back] of [[3.0, 2.2], [3.6, 2.6], [4.3, 3.0], [5.0, 3.4], [2.4, 4.5], [3.4, 5.5], [0, 7]]) {
      p = h.P.clone().addScaledVector(h.tangent, h.side * k).addScaledVector(h.face, -back)
      if (!blocksView(p, kind === 'stall' ? 1.5 : 0.9)) break
      p = null
    }
    if (!p) return
    const yaw = Math.atan2(h.face.x, h.face.z)
    if (kind === 'post') { const b = postQ.shift() || ['the 1st · you', 'the 7th · partners']; signpost(p.x, p.z, b, yaw) }
    else if (kind === 'exhibit') {
      const [title, sub] = exQ.shift() || ['Say the Honest Thing', 'aries · a habit']
      easel(exhibitTexture(imgs['aura:' + sub.split(' ')[0]], title, sub), 1.3, 1.86, p, yaw, 1.5)
    } else stall(p.addScaledVector(h.face, -0.8), yaw, i)
  })
  for (let i = 0; i < 14; i++) {
    const a = a0 + (i + 0.5) * ((Math.PI * 2) / 14), b = a0 + (i + 1.5) * ((Math.PI * 2) / 14)
    stringLights(new THREE.Vector3(Math.cos(a) * 11.6, 0, Math.sin(a) * 11.6), new THREE.Vector3(Math.cos(b) * 11.6, 0, Math.sin(b) * 11.6), 4.4, 11)
  }
  for (let i = 0; i < 10; i++) house(a0 + (i / 10) * Math.PI * 2 + 0.5, 17.5 + (i % 2) * 1.5, 200 + i)
  for (let i = 0; i < 9; i++) house(a0 + (i / 9) * Math.PI * 2 + 0.2, 25 + (i % 3) * 3, 100 + i)
  clockTower(a0 + Math.PI * 0.95, 20)
  observatory(a0 + Math.PI * 1.55, 21)
  for (let i = 0; i < 16; i++) tree(a0 + (i / 16) * Math.PI * 2 + 0.11, 17 + (i % 2) * 1.6, 300 + i)

  // the sky: a moon, the sign's figure as a pale ghost, and floating veiled cards
  const moonDir = new THREE.Vector3(Math.cos(a0 + Math.PI * 1.05), 0.34, Math.sin(a0 + Math.PI * 1.05)).normalize()
  const moon = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), new THREE.MeshBasicMaterial({ map: moonTexture(script.moon), transparent: true, fog: false }))
  moon.position.copy(moonDir.clone().multiplyScalar(90)); moon.lookAt(0, 2, 0); scene.add(moon)
  S.moonPos = moon.position.clone()
  const mg = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, opacity: 0.55 }))
  mg.scale.set(34, 34, 1); mg.position.copy(moon.position).multiplyScalar(0.99); scene.add(mg)
  if (script.moon === 'none') { moon.visible = false; mg.visible = false }

  const cons = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.MeshBasicMaterial({ map: constellationTexture(sign), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }))
  {
    const ang = a0 + Math.PI * 0.55
    cons.position.set(Math.cos(ang) * 50, 26, Math.sin(ang) * 50); cons.lookAt(0, 4, 0); scene.add(cons)
  }
  // paper cutouts of the sign figures, hung round the sky; the reel's own
  // sign goes behind the first card, big
  S.ghosts = []
  const others = script.ghosts || [6, 4, 8, 3, 9, 2, 10].map((k) => SIGNS[(SIGNS.indexOf(sign) + k) % 12])
  const shapes = ['arch', 'circle', 'card']
  const heroShape = Math.floor(R() * 3)
  const h0dir = Math.atan2(-S.holds[0].face.z, -S.holds[0].face.x)
  ;[sign, ...others].forEach((s, i) => {
    const img = imgs['figure:' + s]
    if (!img) return
    const size = i ? 10 + R() * 5 : 11
    const [map, aspect] = cutoutTexture(img, shapes[(heroShape + i) % 3], s)
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size * aspect), new THREE.MeshBasicMaterial({ map, transparent: true, alphaTest: 0.05, depthWrite: false, fog: false }))
    const ang = i ? h0dir + 0.9 + (i - 1) * ((Math.PI * 2 - 1.8) / Math.max(1, others.length - 1)) : h0dir + 0.12 * S.holds[0].side
    const r = i ? 30 : 42
    m.position.set(Math.cos(ang) * r, i ? 11 + R() * 9 : 15.5, Math.sin(ang) * r)
    m.lookAt(0, m.position.y * 0.6, 0)
    m.renderOrder = -1
    scene.add(m)
    S.ghosts.push({ m, base: m.position.clone(), q0: m.quaternion.clone(), i, spin: (R() - 0.5) * 0.12 })
  })

  {
    const [bc, bx] = canvas(360, 520)
    bx.fillStyle = '#2a2244'; bx.beginPath(); bx.roundRect(0, 0, 360, 520, 26); bx.fill()
    bx.strokeStyle = GOLD; bx.lineWidth = 6; bx.beginPath(); bx.roundRect(14, 14, 332, 492, 20); bx.stroke()
    bx.fillStyle = GOLD
    for (let yy = 0; yy < 5; yy++) for (let xx = 0; xx < 3; xx++) star(bx, 80 + xx * 100, 80 + yy * 90, 16, 4, 4)
    S.veilBack = tex(bc)
  }
  S.cards = []
  for (let i = 0; i < 7; i++) {
    const img = imgs['person:' + (i % 6)]
    const m = new THREE.Group()
    m.add(new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.3), new THREE.MeshBasicMaterial({ map: veilTexture(img, i), transparent: true })))
    const back = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.3), new THREE.MeshBasicMaterial({ map: S.veilBack, transparent: true }))
    back.rotation.y = Math.PI; m.add(back)
    const ang = a0 + (i / 7) * Math.PI * 2 + 0.4
    const r = 4 + (i % 3) * 1.5
    S.cards.push({ m, ang, r, y: 6.5 + (i % 3) * 1.2, ph: i * 1.7 })
    scene.add(m)
  }

  const rays = new THREE.Sprite(new THREE.SpriteMaterial({ map: raysTexture(), blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.9 }))
  rays.scale.set(4, 4, 1); rays.position.set(0, 4.6, 0); scene.add(rays)
  const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, blending: THREE.AdditiveBlending, depthWrite: false }))
  core.scale.set(2.2, 2.2, 1); core.position.copy(rays.position); scene.add(core)
  S.rays = rays

  // drifting motes
  const N = 260
  const r = rng(55)
  S.motes = Array.from({ length: N }, () => [(r() - 0.5) * 30, r() * 7, (r() - 0.5) * 30, r() * 6.28])
  S.moteGeo = new THREE.BufferGeometry()
  S.moteGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3))
  const [mc, mx] = canvas(32, 32)
  const mgr = mx.createRadialGradient(16, 16, 0, 16, 16, 16)
  mgr.addColorStop(0, 'rgba(255,230,170,1)'); mgr.addColorStop(1, 'rgba(255,230,170,0)')
  mx.fillStyle = mgr; mx.fillRect(0, 0, 32, 32)
  scene.add(new THREE.Points(S.moteGeo, new THREE.PointsMaterial({ size: 0.09, map: tex(mc), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })))

  S.walker = stardust()
  S.walker.scale.setScalar(0.78)
  S.fore = fore

  // finishing: vignette and grain frames
  const [vc, vx] = canvas(W, H)
  const vg = vx.createRadialGradient(W / 2, H * 0.48, H * 0.25, W / 2, H * 0.5, H * 0.75)
  vg.addColorStop(0, 'rgba(10,6,12,0)'); vg.addColorStop(1, 'rgba(20,10,30,0.38)')
  vx.fillStyle = vg; vx.fillRect(0, 0, W, H)
  S.vignette = vc
  S.grains = [0, 1, 2, 3].map((k) => {
    const [gc, gx] = canvas(W / 2, H / 2)
    const id = gx.createImageData(W / 2, H / 2)
    const rr = rng(900 + k)
    for (let i = 0; i < id.data.length; i += 4) { const v = rr() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 22 }
    gx.putImageData(id, 0, 0)
    return gc
  })

  // last check: hide anything that still stands between a camera spot and its card
  scene.updateMatrixWorld(true)
  const ray = new THREE.Raycaster()
  ray.camera = camera
  const top = (o) => { while (o.parent && o.parent !== scene) o = o.parent; return o }
  S.holds.forEach((h) => {
    for (const u of [-0.7, 0, 0.7]) for (const v of [0.8, 1.6, 2.4]) {
      for (const push of [0, 0.5, 1.1]) {
        const from = h.cam.clone().addScaledVector(h.face, -push)
        const to = h.P.clone().addScaledVector(h.tangent, u).setY(v)
        const dir = to.clone().sub(from)
        const len = dir.length() - 0.15
        ray.set(from, dir.normalize()); ray.far = len
        for (const hit of ray.intersectObjects(scene.children, true)) {
          if (hit.object.isSprite || hit.object.isPoints || hit.object.isLine) continue
          const g = top(hit.object)
          if (g === sky || g === ground || g === wheel || g === S.walker || g.userData.card || S.cards.some((k) => k.m === g)) continue
          g.visible = false
        }
      }
    }
  })

  // and nothing the camera would walk through
  const box = new THREE.Box3()
  const solid = scene.children.filter((g) => g !== sky && g !== ground && g !== wheel && g !== S.walker && !g.userData.card && !g.isSprite && !g.isPoints && !g.isLine && !S.cards.some((k) => k.m === g) && g.position.length() < 20)
  for (let k = 1; k < n; k++) for (let f = 0; f <= TRAVEL; f += 0.1) {
    const p = cameraAt(k * BEAT + f).pos
    for (const g of solid) if (g.visible && box.setFromObject(g).distanceToPoint(p) < 1.0) g.visible = false
  }

  S.duration = n * BEAT + OUTRO
  return { duration: S.duration, frames: Math.round(S.duration * FPS), beat: BEAT }
}

// ── per frame ─────────────────────────────────────────────────────────────
function cameraAt(t) {
  const H_ = S.holds
  const n = H_.length
  const i = Math.min(n - 1, Math.floor(t / BEAT))
  const local = t - i * BEAT
  let pos, yaw, pitch
  const holdPose = (h, u) => {
    // slow push toward the card while holding (a bigger one on the hook)
    if (h === H_[0]) return h.cam.clone().addScaledVector(h.face, -0.75 * (1 - Math.pow(1 - clamp(u * 2.2), 3)))
    return h.cam.clone().addScaledVector(h.face, -0.45 * ease(u))
  }
  if (t >= n * BEAT) {
    // outro: turn from the last card up to the clock and the moon
    const h = H_[n - 1]
    const u = easeIO((t - n * BEAT) / (OUTRO * 0.6))
    const target = S.moonPos
    const away = new THREE.Vector3(-target.x, 0, -target.z).normalize()
    pos = holdPose(h, 1).lerp(away.multiplyScalar(6).setY(8), u)
    const ty = Math.atan2(target.x - pos.x, target.z - pos.z) + 0.35
    const tp = Math.atan2(target.y - pos.y, Math.hypot(target.x - pos.x, target.z - pos.z)) * 0.72
    yaw = angLerp(h.yaw, ty, u)
    pitch = lerp(h.pitch, tp, u)
  } else if (i > 0 && local < TRAVEL) {
    const a = H_[i - 1], b = H_[i]
    const v = local / TRAVEL
    const u = easeIO(v)
    const pa = holdPose(a, 1)
    const angA = Math.atan2(pa.z, pa.x), angB = Math.atan2(b.cam.z, b.cam.x)
    const rA = Math.hypot(pa.x, pa.z), rB = Math.hypot(b.cam.x, b.cam.z)
    const ang = angLerp(angA, angB, u)
    const rad = lerp(rA, rB, u) + Math.sin(u * Math.PI) * 0.8
    pos = new THREE.Vector3(Math.cos(ang) * rad, b.cam.y + Math.sin(u * Math.PI) * 0.25, Math.sin(ang) * rad)
    // glance along the walk, then settle on the next card
    // one turn in one direction, with a small glance along the way if it agrees
    const wrap = (d) => ((d + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI
    const d = wrap(b.yaw - a.yaw)
    const g = wrap(Math.atan2(-pos.x, -pos.z) - a.yaw)
    const glance = Math.sign(g) === Math.sign(d) ? Math.sign(d) * Math.min(0.15, Math.abs(g)) : 0
    yaw = a.yaw + d * ease(v) + glance * Math.sin(v * Math.PI)
    pitch = lerp(a.pitch, b.pitch, u) + Math.sin(u * Math.PI) * 0.12
  } else {
    const h = H_[i]
    const u = (local - (i > 0 ? TRAVEL : 0)) / (BEAT - (i > 0 ? TRAVEL : 0))
    pos = holdPose(h, u)
    yaw = h.yaw; pitch = h.pitch
  }
  // handheld sway
  yaw += Math.sin(t * 0.9) * 0.012 + Math.sin(t * 2.3) * 0.004
  pitch += Math.sin(t * 1.3 + 1) * 0.008
  pos.y += Math.sin(t * 3.4) * 0.015
  return { pos, yaw, pitch, i, local }
}

window.townState = () => S

window.frame = (t) => {
  const { camera, scene, renderer } = S
  const c = cameraAt(t)
  camera.position.copy(c.pos)
  const dir = new THREE.Vector3(Math.sin(c.yaw) * Math.cos(c.pitch), Math.sin(c.pitch), Math.cos(c.yaw) * Math.cos(c.pitch))
  camera.lookAt(c.pos.clone().add(dir))

  // the walker trails the camera, popping up beside each card
  const n = S.holds.length
  const at = (k) => {
    const h = S.holds[Math.min(n - 1, k)]
    // in front of the card on the open side, or peeking out from behind its edge
    if ((k % 2 === 1 || k === 0) && k !== n - 1) return h.P.clone().addScaledVector(h.tangent, h.side * 0.95).addScaledVector(h.face, -0.4)
    return h.P.clone().addScaledVector(h.tangent, h.side * 0.95).addScaledVector(h.face, 0.6)
  }
  let wp
  const i = c.i
  if (t >= n * BEAT) wp = at(n - 1).lerp(new THREE.Vector3(S.moonPos.x, 0, S.moonPos.z).normalize().multiplyScalar(-3.5), ease((t - n * BEAT) / 1.5))
  else if (i > 0 && c.local < TRAVEL) wp = at(i - 1).lerp(at(i), ease(c.local / TRAVEL))
  else wp = at(i)
  if (t < BEAT) {
    // opening: already in frame, hopping across to its spot
    const h = S.holds[0]
    const from = at(0).addScaledVector(h.tangent, -h.side * 0.35)
    wp = from.lerp(at(0), ease((t - 0.15) / 0.8))
  }
  const hop = Math.abs(Math.sin(t * 6)) * 0.08
  S.walker.position.set(wp.x, hop, wp.z)
  const face = t >= n * BEAT + 0.8 ? S.moonPos : camera.position
  S.walker.rotation.set(0, Math.atan2(face.x - wp.x, face.z - wp.z), Math.sin(t * 6) * 0.08, 'YXZ')

  // the clock creeps up to 11:11
  const minutes = 11 * 60 + 4 + 7 * clamp(t / (S.duration - 1))
  S.hands.min.rotation.z = -((minutes % 60) / 60) * Math.PI * 2
  S.hands.hour.rotation.z = -((minutes / 60) % 12 / 12) * Math.PI * 2
  S.hands.flag.rotation.y = Math.sin(t * 2) * 0.25

    const Z = new THREE.Vector3(0, 0, 1)
  const outro = clamp((t - S.holds.length * BEAT) / 1.2)
  for (const g of S.ghosts) {
    g.m.position.y = g.base.y + Math.sin(t * 0.4 + g.i) * 0.8
    g.m.quaternion.copy(g.q0).multiply(new THREE.Quaternion().setFromAxisAngle(Z, Math.sin(t * 0.25 + g.i) * 0.05 + g.spin))
    g.m.material.opacity = 1 - outro
  }
  for (const k of S.cards) {
    const a = k.ang + t * 0.05
    k.m.position.set(Math.cos(a) * k.r, k.y + Math.sin(t * 0.8 + k.ph) * 0.25, Math.sin(a) * k.r)
    k.m.lookAt(camera.position)
    k.m.rotateY(Math.sin(t * 0.5 + k.ph) * 1.1)
    k.m.rotateZ(Math.sin(t * 0.6 + k.ph) * 0.15)
    k.m.visible = outro < 0.98
    k.m.children.forEach((c) => { c.material.opacity = 1 - outro })
  }
  S.rays.material.rotation = t * 0.12
  S.rays.material.opacity = (0.5 + Math.sin(t * 1.7) * 0.15) * (1 - outro)
  const p = S.moteGeo.attributes.position
  S.motes.forEach(([x, y, z, ph], k) => {
    p.setXYZ(k, x + Math.sin(t * 0.3 + ph) * 0.6, (y + t * 0.12) % 7, z + Math.cos(t * 0.25 + ph) * 0.6)
  })
  p.needsUpdate = true

  renderer.render(scene, camera)
  const o = S.octx
  o.globalAlpha = 1
  o.drawImage(renderer.domElement, 0, 0, W, H)
  o.drawImage(S.vignette, 0, 0)
  o.globalCompositeOperation = 'overlay'
  o.drawImage(S.grains[Math.floor(t * FPS) % 4], 0, 0, W, H)
  o.globalCompositeOperation = 'source-over'
  // outro wordmark
  const end = clamp((t - (n * BEAT + 1.2)) / 1.0)
  if (end > 0) {
    o.globalAlpha = end
    const plate = o.createRadialGradient(W / 2, H * 0.3, 0, W / 2, H * 0.3, 480)
    plate.addColorStop(0, 'rgba(20,12,30,0.85)'); plate.addColorStop(1, 'rgba(20,12,30,0)')
    o.fillStyle = plate; o.fillRect(0, H * 0.3 - 480, W, 960)
    o.fillStyle = PAPER
    o.textAlign = 'center'; o.textBaseline = 'middle'
    o.font = 'italic 500 150px "EB Garamond", serif'
    o.fillText(S.script.end || 'align', W / 2, H * 0.28)
    o.font = '700 40px "Space Mono", monospace'
    o.fillStyle = 'rgba(243,236,224,0.85)'
    o.fillText((S.script.endSub || 'a new deal at 11:11').toUpperCase().split('').join('\u200A'), W / 2, H * 0.28 + 120)
    o.globalAlpha = 1
  }
  // a quick fade in from black on the very first frames
  return S.out.toDataURL('image/jpeg', 0.9)
}
