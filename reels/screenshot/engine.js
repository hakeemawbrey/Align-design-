// Align "screenshot" reels: the frame engine. Runs in a browser page.
// setup(data) draws every card once; frame(t) paints one frame:
// a night sky, the hook at the top ("STOP SCROLLING" / close your eyes, take a
// breath & screenshot), and one Align card in the middle. After a short intro
// on the face-down card, the deck flicks through its cards with hard cuts, so
// any screenshot lands on one whole, readable card. Everything is drawn in
// code and seeded.

const W = 1080
const H = 1920
const CX = 540
const canvas = document.getElementById('c')
canvas.width = W
canvas.height = H
const ctx = canvas.getContext('2d')

const COL = {
  ink: '#0b0726', night: '#120c38', gold: '#f2c75c', goldDeep: '#d9a32b', glow: '#fff6dc',
  bone: '#efe6d6', rose: '#ff8fb1', lilac: '#c9b6f8', mint: '#7fd8b0', blue: '#8cc4ff', peach: '#ffb38a',
}
// Instagram covers about the top 220 px and the bottom 420 px with its UI,
// and the right edge with the buttons, so the card sits inside that.
const L = {
  hook: 300, sub: 384, sub2: 438,
  card: { x: CX, y: 1052 },
  foot: 1634,
}

// ---------- helpers ----------

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function hash(s) {
  let h = 2166136261
  for (const c of String(s)) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return h >>> 0
}
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const easeOut = (k) => 1 - Math.pow(1 - clamp(k), 3)
const backOut = (k, s = 2) => { k = clamp(k); const c = s + 1; return 1 + c * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2) }
const TAU = Math.PI * 2
function rgb(h) {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const rgba = (h, a) => { const [r, g, b] = rgb(h); return `rgba(${r},${g},${b},${clamp(a)})` }
const colOf = (c) => (c && c.startsWith('#') ? c : COL[c] ?? COL.gold)
function layer(w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

function orb(g, x, y, r, color, { a = 1, core = '#ffffff', halo = 2 } = {}) {
  const gr = g.createRadialGradient(x, y, 0, x, y, r * halo)
  gr.addColorStop(0, rgba(color, 0.55 * a))
  gr.addColorStop(1, rgba(color, 0))
  g.fillStyle = gr
  g.beginPath()
  g.arc(x, y, r * halo, 0, TAU)
  g.fill()
  const c = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r)
  c.addColorStop(0, rgba(core, a))
  c.addColorStop(1, rgba(color, a))
  g.fillStyle = c
  g.beginPath()
  g.arc(x, y, r, 0, TAU)
  g.fill()
}

function spaced(g, str, x, y, { font, color, spacing = 6, align = 'center' }) {
  g.save()
  g.font = font
  g.letterSpacing = `${spacing}px`
  g.textAlign = align
  g.textBaseline = 'middle'
  g.fillStyle = color
  // letterSpacing adds a trailing gap, so nudge centred text back
  g.fillText(str, x + (align === 'center' ? spacing / 2 : 0), y)
  g.restore()
}

function wrap(g, text, maxW) {
  const words = text.split(/\s+/)
  const lines = []
  let cur = ''
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w
    if (g.measureText(next).width > maxW && cur) { lines.push(cur); cur = w } else cur = next
  }
  if (cur) lines.push(cur)
  return lines
}

function sparkle(g, x, y, s, color, a = 1) {
  g.save()
  g.translate(x, y)
  g.fillStyle = rgba(color, a)
  g.beginPath()
  for (let i = 0; i < 8; i++) {
    const r = i % 2 ? s * 0.22 : s
    const ang = (i / 8) * TAU - Math.PI / 2
    g.lineTo(Math.cos(ang) * r, Math.sin(ang) * r)
  }
  g.closePath()
  g.fill()
  g.restore()
}

// ---------- the sky behind everything ----------

let SKY = null
const STARS = []
function makeSky() {
  SKY = layer(W, H)
  const g = SKY.getContext('2d')
  const gr = g.createLinearGradient(0, 0, 0, H)
  gr.addColorStop(0, '#07041c')
  gr.addColorStop(0.5, '#140d40')
  gr.addColorStop(1, '#07041c')
  g.fillStyle = gr
  g.fillRect(0, 0, W, H)
  const r = rng(7)
  for (const [x, y, s, c] of [[180, 520, 520, COL.lilac], [920, 1500, 600, COL.rose], [540, 1050, 760, COL.gold]]) {
    const h = g.createRadialGradient(x, y, 0, x, y, s)
    h.addColorStop(0, rgba(c, 0.12))
    h.addColorStop(1, rgba(c, 0))
    g.fillStyle = h
    g.fillRect(0, 0, W, H)
  }
  for (let i = 0; i < 380; i++) {
    g.fillStyle = rgba(COL.bone, 0.05 + r() * 0.3)
    g.beginPath()
    g.arc(r() * W, r() * H, 0.5 + r() * 1.4, 0, TAU)
    g.fill()
  }
  for (let i = 0; i < 46; i++) STARS.push({ x: r() * W, y: r() * H, s: 2 + r() * 3.5, p: r() * TAU, f: 0.6 + r() * 1.6 })
}

function drawSky(t) {
  ctx.drawImage(SKY, 0, 0)
  for (const s of STARS) {
    const tw = 0.5 + 0.5 * Math.sin(t * s.f * 2 + s.p)
    orb(ctx, s.x, s.y, s.s * (0.6 + 0.4 * tw), '#dfe8ff', { a: 0.25 + 0.55 * tw, halo: 2.6 })
  }
}

// ---------- the cards ----------
// Drawn the way the app draws its deck cards (app/src/components/deck/
// ProfileCard.tsx and CardBack.tsx, the beta look): a thick foil border in the
// sign's colour, a dark face, the element orb, the aura panel, the sign row
// and chip, spark / clash / align rows with strength dots, a pink-labelled
// section under a rule, and the № footer. Coordinates are the app's (a
// 330 × 527 card) and everything is drawn at S×.

const S = 2
const APP_W = 330, APP_H = 527, EDGE = 7, RAD = 22
const CW = APP_W * S, CH = APP_H * S, CR = RAD * S
const LABEL = { 1: '#efe6d6', 2: '#b3a6c4', 3: '#7d6f94' }
const KIND = { spark: '#7fd8b0', clash: '#e8628a', align: '#f2c75c' }
const SERIF = '"EB Garamond", Georgia, serif'
const MONO = '"Space Mono", monospace'

const SIGNS = {
  aries: ['Aries', 'fire', 'Ember', '#f0603a', '#ffb39a', '#5a1c10'],
  taurus: ['Taurus', 'earth', 'Honey', '#e9b24a', '#ffe1a0', '#4e3510'],
  gemini: ['Gemini', 'air', 'Signal', '#f2cf4a', '#fff0a8', '#4f4210'],
  cancer: ['Cancer', 'water', 'Tide', '#3fb6f0', '#a8e4ff', '#0f3550'],
  leo: ['Leo', 'fire', 'Goldleaf', '#f39a3a', '#ffd09a', '#55300f'],
  virgo: ['Virgo', 'earth', 'Rose Quartz', '#ef5c94', '#ffb6d2', '#561a33'],
  libra: ['Libra', 'air', 'Orchid', '#e163d6', '#ffbdf6', '#4d1a49'],
  scorpio: ['Scorpio', 'water', 'Garnet', '#e23d66', '#ff9fb7', '#55102a'],
  sagittarius: ['Sagittarius', 'fire', 'Amethyst', '#a35cf0', '#dcbcff', '#36165a'],
  capricorn: ['Capricorn', 'earth', 'Jade', '#2fc79a', '#a6f0d6', '#0e4636'],
  aquarius: ['Aquarius', 'air', 'Ion', '#38c4ec', '#b2ecff', '#0e3d4e'],
  pisces: ['Pisces', 'water', 'Dusk', '#7c74f0', '#c6c1ff', '#25205a'],
}
const signOf = (id) => {
  const [name, element, aura, color, light, dark] = SIGNS[id] ?? SIGNS.libra
  return { id, name, element, aura, color, light, dark }
}
const TONES = {
  fire: { light: '#ffe2c8', mid: '#f0603a', deep: '#a8241a', ink: '#3a0c06' },
  earth: { light: '#fff1c8', mid: '#e9b24a', deep: '#8a5a1a', ink: '#3a2408' },
  air: { light: '#e8faff', mid: '#7fd0f0', deep: '#3a7ab8', ink: '#0c2a40' },
  water: { light: '#d2e4ff', mid: '#3f7cf0', deep: '#1a2a8a', ink: '#081440' },
}
const AURAS = {}

// the foil: the tint, its lighter self, a white glint, and back (160deg)
function foilGrad(g, w, h, stops) {
  const a = (160 - 90) * Math.PI / 180
  const len = Math.abs(w * Math.sin(a)) + Math.abs(h * Math.cos(a))
  const dx = Math.sin(a) * len / 2, dy = -Math.cos(a) * len / 2
  const gr = g.createLinearGradient(w / 2 - dx, h / 2 - dy, w / 2 + dx, h / 2 + dy)
  for (const [o, c] of stops) gr.addColorStop(o, c)
  return gr
}

// the element orb, with the app's flame / mountains / wind / drop
function elementBadge(g, x, y, size, element) {
  const t = TONES[element]
  const r = size / 2, cx = x + r, cy = y + r
  g.save()
  g.shadowColor = rgba(t.mid, 0.6)
  g.shadowBlur = size * 0.42
  const gr = g.createRadialGradient(x + size * 0.32, y + size * 0.28, 0, x + size * 0.32, y + size * 0.28, size * 0.9)
  gr.addColorStop(0, t.light)
  gr.addColorStop(0.48 / 0.9 * 0.9, t.mid)
  gr.addColorStop(1, t.deep)
  g.fillStyle = gr
  g.beginPath()
  g.arc(cx, cy, r, 0, TAU)
  g.fill()
  g.restore()
  const gs = size * 0.56
  g.save()
  g.translate(cx - gs / 2, cy - gs / 2)
  g.scale(gs / 24, gs / 24)
  if (element === 'fire') {
    g.fillStyle = t.ink
    g.fill(new Path2D('M12 2.2c.9 3.4 6.2 5.9 6.2 11.6a6.2 6.2 0 0 1-12.4 0c0-2.9 1.5-4.8 2.9-6 .2 2 1.1 3.3 2.4 3.7-.6-3.4.2-6.6.9-9.3Z'))
    g.fillStyle = '#ffb06a'
    g.fill(new Path2D('M12 21.2a2.9 2.9 0 0 1-2.9-2.9c0-1.8 1.6-2.8 2.4-4.5.5 1.4 3.4 2.6 3.4 4.5a2.9 2.9 0 0 1-2.9 2.9Z'))
  } else if (element === 'earth') {
    g.fillStyle = t.ink
    g.fill(new Path2D('M1.8 20 8.6 7.6l4.1 7.1 2.6-4.2L22.2 20Z'))
    g.fillStyle = 'rgba(255,255,255,0.6)'
    g.fill(new Path2D('m8.6 7.6 1.9 3.4-1.3-.6-1.5 1.2-.6-.9Z'))
  } else if (element === 'air') {
    g.strokeStyle = t.ink
    g.lineWidth = 2.3
    g.lineCap = 'round'
    for (const d of ['M2.5 8.5h11a3 3 0 1 0-3-3', 'M2.5 13h16a3 3 0 1 1-3 3', 'M2.5 17.5h7']) g.stroke(new Path2D(d))
  } else {
    g.fillStyle = t.ink
    g.fill(new Path2D('M12 2.4s6.8 7.5 6.8 12.4a6.8 6.8 0 0 1-13.6 0C5.2 9.9 12 2.4 12 2.4Z'))
    g.strokeStyle = 'rgba(255,255,255,0.6)'
    g.lineWidth = 1.6
    g.lineCap = 'round'
    g.stroke(new Path2D('M8.6 14.6a3.4 3.4 0 0 0 2.6 3.4'))
  }
  g.restore()
}

function sphere(g, x, y, size, color, light) {
  const r = size / 2
  g.save()
  g.shadowColor = rgba(color, 0.67)
  g.shadowBlur = 6
  const gr = g.createRadialGradient(x - r + size * 0.35, y - r + size * 0.3, 0, x - r + size * 0.35, y - r + size * 0.3, size * 0.75)
  gr.addColorStop(0, '#ffffff')
  gr.addColorStop(0.22, light)
  gr.addColorStop(0.6, color)
  gr.addColorStop(1, rgba(color, 0.53))
  g.fillStyle = gr
  g.beginPath()
  g.arc(x, y, r, 0, TAU)
  g.fill()
  g.restore()
}

// a .chip: a 22px pill with a sphere and mono caps
function chip(g, x, cy, text, { border, color, sphereColor, sphereLight }) {
  g.font = `400 9.5px ${MONO}`
  g.letterSpacing = '1.33px'
  const tw = g.measureText(text.toUpperCase()).width
  const w = 3 + 14 + 6 + tw + 9, h = 22
  g.strokeStyle = border
  g.lineWidth = 1
  g.beginPath()
  g.roundRect(x + 0.5, cy - h / 2 + 0.5, w - 1, h - 1, h / 2)
  g.stroke()
  sphere(g, x + 3 + 7, cy, 14, sphereColor, sphereLight)
  g.fillStyle = color
  g.textAlign = 'left'
  g.textBaseline = 'middle'
  g.fillText(text.toUpperCase(), x + 3 + 14 + 6, cy + 0.5)
  g.letterSpacing = '0px'
  return w
}

function wrapLines(g, text, maxW) {
  return wrap(g, text, maxW)
}

function grain(g, x, y, w, h, seed, amt = 22) {
  const r = rng(seed)
  const d = g.getImageData(x, y, w, h)
  for (let p = 0; p < d.data.length; p += 4) {
    const n = (r() - 0.5) * amt
    d.data[p] += n
    d.data[p + 1] += n
    d.data[p + 2] += n
  }
  g.putImageData(d, x, y)
}

function drawFace(card, i, total) {
  const sg = signOf(card.sign)
  const c = layer(CW, CH)
  const g = c.getContext('2d')
  g.scale(S, S)
  // foil border
  g.fillStyle = foilGrad(g, APP_W, APP_H, [[0, sg.color], [0.22, sg.light], [0.42, '#ffffff'], [0.58, sg.light], [0.78, sg.color], [1, sg.light]])
  g.beginPath()
  g.roundRect(0, 0, APP_W, APP_H, RAD)
  g.fill()
  // dark face
  const fw = APP_W - EDGE * 2, fh = APP_H - EDGE * 2
  g.save()
  g.translate(EDGE, EDGE)
  g.beginPath()
  g.roundRect(0, 0, fw, fh, RAD - EDGE)
  g.clip()
  let gr = g.createLinearGradient(0, 0, 0, fh)
  gr.addColorStop(0, '#160e28')
  gr.addColorStop(0.55, '#100a1d')
  gr.addColorStop(1, '#0e0919')
  g.fillStyle = gr
  g.fillRect(0, 0, fw, fh)
  g.save()
  g.scale(1.2, 1)
  gr = g.createRadialGradient(fw / 2 / 1.2, 0, 0, fw / 2 / 1.2, 0, fh * 0.6)
  gr.addColorStop(0, rgba(sg.dark, 0.33))
  gr.addColorStop(0.6, rgba(sg.dark, 0))
  g.fillStyle = gr
  g.fillRect(0, 0, fw, fh)
  g.restore()
  // the app draws the face at its full size and scales it to fit the border
  const FIT = (APP_W - EDGE * 2) / (APP_W - 5)
  g.scale(FIT, FIT)

  // top-left: the title, like a person's name and age
  g.font = `italic 500 23px ${SERIF}`
  g.fillStyle = LABEL[1]
  g.textAlign = 'left'
  g.textBaseline = 'alphabetic'
  g.fillText(card.title, 36, 16 + 23)
  elementBadge(g, APP_W - 26 - 38, 7, 38, sg.element)

  // the aura panel, with the number glowing in it where the sign glyph sits
  const px = 22, py = 56, pw = 284, ph = 152
  g.save()
  g.beginPath()
  g.roundRect(px, py, pw, ph, 10)
  g.clip()
  g.fillStyle = '#07040f'
  g.fillRect(px, py, pw, ph)
  const img = AURAS[sg.id]
  if (img) {
    const sc = Math.max(pw / img.width, ph / img.height) * 1.14
    const iw = img.width * sc, ih = img.height * sc
    g.filter = 'blur(0.7px) saturate(1.08)'
    g.drawImage(img, px + (pw - iw) / 2, py + (ph - ih) * 0.3, iw, ih)
    g.filter = 'none'
  }
  g.save()
  g.scale(1, ph / pw)
  gr = g.createRadialGradient(px + pw / 2, (py + ph * 0.45) * pw / ph, 0, px + pw / 2, (py + ph * 0.45) * pw / ph, pw * 0.64)
  gr.addColorStop(0.55, 'rgba(7,4,15,0)')
  gr.addColorStop(1, 'rgba(7,4,15,0.55)')
  g.fillStyle = gr
  g.fillRect(px, py * pw / ph, pw, pw)
  g.restore()
  // the number
  let size = 92
  g.font = `italic 500 ${size}px ${SERIF}`
  while (g.measureText(card.big).width > pw - 40) g.font = `italic 500 ${(size -= 2)}px ${SERIF}`
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  const ny = py + ph * 0.56
  g.shadowColor = rgba(sg.light, 0.95)
  g.shadowBlur = 22
  g.fillStyle = rgba('#ffffff', 0.92)
  g.fillText(card.big, px + pw / 2, ny)
  g.shadowBlur = 6
  g.shadowColor = rgba(sg.color, 0.9)
  g.fillStyle = 'rgba(255,255,255,0.97)'
  g.fillText(card.big, px + pw / 2, ny)
  g.shadowColor = 'transparent'
  g.font = `400 8px ${MONO}`
  g.letterSpacing = '1.28px'
  g.textAlign = 'left'
  g.textBaseline = 'alphabetic'
  g.fillStyle = LABEL[2]
  g.shadowColor = 'rgba(0,0,0,0.9)'
  g.shadowBlur = 4
  g.fillText(card.caption ?? 'YOUR LOVE NUMBER · SCREENSHOT TO KEEP', px + 8, py + ph - 8)
  g.letterSpacing = '0px'
  g.restore()
  // the panel's ring in the sign colour
  g.save()
  g.shadowColor = rgba(sg.color, 0.33)
  g.shadowBlur = 16
  g.strokeStyle = rgba(sg.color, 0.8)
  g.lineWidth = 1.5
  g.beginPath()
  g.roundRect(px - 0.75, py - 0.75, pw + 1.5, ph + 1.5, 10.5)
  g.stroke()
  g.restore()

  // sign row: the sign in its colour, then the aura chip
  g.save()
  g.font = `400 18px ${SERIF}`
  g.letterSpacing = '1.44px'
  g.textAlign = 'left'
  g.textBaseline = 'middle'
  g.fillStyle = sg.color
  g.shadowColor = rgba(sg.color, 0.4)
  g.shadowBlur = 10
  const label = (card.label ?? sg.name).toUpperCase()
  g.fillText(label, 32, 227)
  const lw = g.measureText(label).width
  g.restore()
  g.letterSpacing = '0px'
  chip(g, 32 + lw + 10, 227, `${sg.aura} aura`, { border: 'rgba(179,166,196,0.55)', color: LABEL[2], sphereColor: sg.color, sphereLight: sg.light })

  // the readings
  let y = 252
  for (const kind of ['spark', 'clash', 'align']) {
    const r = card[kind]
    if (!r) continue
    const [text, strength = 2] = Array.isArray(r) ? r : [r]
    g.font = `400 14.5px ${SERIF}`
    const lines = wrapLines(g, text, APP_W - 18 - 32 - 52)
    const lh = 14.5 * 1.16
    const rowH = Math.max(36, lines.length * lh)
    const cy = y + rowH / 2
    g.textAlign = 'left'
    g.textBaseline = 'alphabetic'
    g.fillStyle = LABEL[1]
    lines.forEach((ln, k) => g.fillText(ln, 32 + 52, cy - (lines.length * lh) / 2 + k * lh + 11.5))
    // the label and its dots
    g.font = `700 9px ${MONO}`
    g.letterSpacing = '1.26px'
    g.fillStyle = KIND[kind]
    g.fillText(kind.toUpperCase(), 32, cy - 2)
    g.letterSpacing = '0px'
    for (let d = 1; d <= 3; d++) {
      const dx = 32 + 3 + (d - 1) * 10, dy = cy + 8
      g.save()
      g.beginPath()
      g.arc(dx, dy, 3, 0, TAU)
      if (d <= strength) {
        g.shadowColor = KIND[kind]
        g.shadowBlur = 6
        g.fillStyle = KIND[kind]
        g.fill()
      } else {
        g.globalAlpha = 0.55
        g.strokeStyle = KIND[kind]
        g.lineWidth = 1.2
        g.stroke()
      }
      g.restore()
    }
    y += rowH + 5
  }
  // the rule, then the message under a pink label
  gr = g.createLinearGradient(16, 0, APP_W - 18, 0)
  gr.addColorStop(0, 'rgba(179,166,196,0.55)')
  gr.addColorStop(1, 'rgba(179,166,196,0.25)')
  g.fillStyle = gr
  g.fillRect(16, y + 2, APP_W - 18 - 16, 1)
  y += 8
  g.font = `400 8.5px ${MONO}`
  g.letterSpacing = '1.36px'
  g.fillStyle = '#e87aa0'
  g.fillText((card.messageLabel ?? 'Your message').toUpperCase(), 16, y + 9)
  g.letterSpacing = '0px'
  g.font = `italic 400 17.5px ${SERIF}`
  g.fillStyle = LABEL[1]
  const ml = wrapLines(g, card.line, APP_W - 18 - 16)
  ml.forEach((ln, k) => g.fillText(ln, 16, y + 14 + 6 + 14 + k * 17.5 * 1.22))

  // footer
  g.font = `400 8.5px ${MONO}`
  g.letterSpacing = '1.19px'
  g.textBaseline = 'alphabetic'
  g.textAlign = 'left'
  g.fillStyle = LABEL[2]
  // Space Mono has no №, so it's set in the serif, like the phone's fallback
  const fy = APP_H - 5 - 12
  g.fillText('ALIGN · ', 14, fy)
  let fx = 14 + g.measureText('ALIGN · ').width
  g.font = `400 11px ${SERIF}`
  g.letterSpacing = '0px'
  g.fillText('№', fx, fy)
  fx += g.measureText('№ ').width
  g.font = `400 8.5px ${MONO}`
  g.letterSpacing = '1.19px'
  g.fillText(`${String(card.serial ?? card.big).padStart(3, '0')}/∞`, fx, fy)
  g.textAlign = 'right'
  g.fillStyle = card.pullColor ?? '#f2c75c'
  g.fillText(`✦ ${(card.pull ?? 'Love number').toUpperCase()}`, APP_W - 5 - 18, APP_H - 5 - 12)
  g.letterSpacing = '0px'
  g.restore()
  // grain over the whole face, like the app's .grain
  grain(g, EDGE * S, EDGE * S, CW - EDGE * S * 2, CH - EDGE * S * 2, hash(card.big) + i, 10)
  return c
}

// The face-down card, CardBack.tsx (beta): violet glass, seed-of-life lines,
// the chakra column, "Align" under the mark, in a violet-and-gold foil.
function drawBack() {
  const c = layer(CW, CH)
  const g = c.getContext('2d')
  g.scale(S, S)
  g.fillStyle = foilGrad(g, APP_W, APP_H, [[0, '#c8b4ff'], [0.3, '#6b4bd0'], [0.52, '#f2d784'], [0.72, '#6b4bd0'], [1, '#c8b4ff']])
  g.beginPath()
  g.roundRect(0, 0, APP_W, APP_H, RAD)
  g.fill()
  g.save()
  g.translate(EDGE, EDGE)
  const fw = APP_W - EDGE * 2, fh = APP_H - EDGE * 2
  g.beginPath()
  g.roundRect(0, 0, fw, fh, RAD - EDGE)
  g.clip()
  // the svg is drawn at full size and sliced into the face
  const k = Math.max(fw / APP_W, fh / APP_H)
  g.translate((fw - APP_W * k) / 2, (fh - APP_H * k) / 2)
  g.scale(k, k)
  let gr = g.createLinearGradient(0, 0, APP_W, APP_H)
  gr.addColorStop(0, '#2a1260')
  gr.addColorStop(0.45, '#3c1a8a')
  gr.addColorStop(1, '#170a3e')
  g.fillStyle = gr
  g.fillRect(0, 0, APP_W, APP_H)
  const cx = APP_W / 2, cy = APP_H / 2 - 10, r = 46
  gr = g.createRadialGradient(cx, APP_H * 0.47, 0, cx, APP_H * 0.47, Math.hypot(APP_W, APP_H) / Math.SQRT2 * 0.55)
  gr.addColorStop(0, 'rgba(138,92,240,0.55)')
  gr.addColorStop(1, 'rgba(138,92,240,0)')
  g.fillStyle = gr
  g.fillRect(0, 0, APP_W, APP_H)
  g.lineWidth = 1
  const ring = (rr, a) => { g.strokeStyle = `rgba(217,201,255,${a})`; g.beginPath(); g.arc(cx, cy, rr, 0, TAU); g.stroke() }
  ring(r * 2, 0.5 * 0.35)
  ring(r * 2 + 6, 0.5 * 0.18)
  ring(r, 0.5)
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2
    g.strokeStyle = 'rgba(217,201,255,0.5)'
    g.beginPath()
    g.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), r, 0, TAU)
    g.stroke()
  }
  g.strokeStyle = 'rgba(217,201,255,0.25)'
  g.beginPath()
  g.moveTo(cx, cy - r * 2)
  g.lineTo(cx, cy + r * 2)
  g.stroke()
  const CHAKRAS = ['#b06cff', '#5b6cff', '#3fb6f0', '#4fd27a', '#f2cf4a', '#f39a3a', '#f0383a']
  CHAKRAS.forEach((col, i) => {
    const y = cy - r * 1.5 + i * (r / 2)
    g.save()
    g.shadowColor = col
    g.shadowBlur = 9
    g.fillStyle = col
    for (let n = 0; n < 3; n++) { g.beginPath(); g.arc(cx, y, 4.2, 0, TAU); g.fill() }
    g.restore()
    g.fillStyle = 'rgba(255,255,255,0.8)'
    g.beginPath()
    g.arc(cx - 1.2, y - 1.2, 1.3, 0, TAU)
    g.fill()
  })
  g.font = `italic 400 38px ${SERIF}`
  g.textAlign = 'center'
  g.textBaseline = 'alphabetic'
  g.fillStyle = 'rgba(241,233,255,0.92)'
  g.fillText('Align', cx, cy + r * 2 + 54)
  g.restore()
  return c
}

function blitCard(img, t, { scale = 1, glow = 1, tint = '#9a7be0' } = {}) {
  const { x, y } = L.card
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)
  // the app's glow: the sign colour around the card, and a drop shadow
  const br = 0.8 + 0.2 * Math.sin(t * 2.2)
  ctx.shadowColor = rgba(tint, 0.5 * glow * br)
  ctx.shadowBlur = 26 * S * 1.6
  ctx.fillStyle = '#100a1d'
  ctx.beginPath()
  ctx.roundRect(-CW / 2, -CH / 2, CW, CH, CR)
  ctx.fill()
  ctx.shadowColor = 'rgba(5,2,15,0.6)'
  ctx.shadowBlur = 40 * S
  ctx.shadowOffsetY = 18 * S
  ctx.fill()
  ctx.shadowColor = 'transparent'
  ctx.shadowOffsetY = 0
  ctx.drawImage(img, -CW / 2, -CH / 2)
  ctx.restore()
}

// ---------- the text around the card ----------

function drawHook(t) {
  const k = easeOut(t / 0.35)
  const s = backOut(t / 0.45, 2.4)
  ctx.save()
  ctx.translate(CX, L.hook)
  ctx.scale(s, s)
  ctx.globalAlpha = k
  ctx.font = '800 92px Poppins'
  ctx.letterSpacing = '2px'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.lineWidth = 14
  ctx.lineJoin = 'round'
  ctx.strokeStyle = 'rgba(7,4,28,0.9)'
  ctx.strokeText(HOOK, 0, 0)
  ctx.fillStyle = COL.gold
  ctx.fillText(HOOK, 0, 0)
  ctx.restore()
  const k2 = easeOut((t - 0.35) / 0.4)
  ctx.save()
  ctx.globalAlpha = k2
  ctx.font = '600 46px Poppins'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = COL.bone
  ctx.fillText(SUB[0], CX, L.sub + 12 * (1 - k2))
  if (SUB[1]) ctx.fillText(SUB[1], CX, L.sub2 + 12 * (1 - k2))
  ctx.restore()
}

function drawFoot(t) {
  if (!FOOT) return
  const k = easeOut((t - INTRO + 0.2) / 0.4)
  if (k <= 0) return
  ctx.save()
  ctx.globalAlpha = k
  ctx.font = '700 32px Poppins'
  ctx.letterSpacing = '1px'
  const tw = ctx.measureText(FOOT).width
  const w = tw + 110, h = 78
  ctx.translate(CX, L.foot)
  ctx.fillStyle = 'rgba(255,246,220,0.95)'
  ctx.beginPath()
  ctx.roundRect(-w / 2, -h / 2, w, h, h / 2)
  ctx.fill()
  sparkle(ctx, -w / 2 + 40, 0, 15, COL.goldDeep)
  ctx.fillStyle = COL.ink
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(FOOT, -w / 2 + 68, 2)
  ctx.restore()
}

// ---------- the deal ----------

let CARDS = [], FACES = [], BACK = null, ORDER = [], HOOK = '', SUB = [], FOOT = '', INTRO = 1, STEP = 4 / 30, DURATION = 12

// Bags of the whole deck, each shuffled, never the same card twice in a row,
// so every card shows up about as often as the others.
function makeOrder(n, count, seed) {
  const r = rng(seed)
  const out = []
  while (out.length < count) {
    const bag = Array.from({ length: n }, (_, i) => i)
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]]
    }
    if (out.length && bag[0] === out[out.length - 1]) bag.push(bag.shift())
    out.push(...bag)
  }
  return out.slice(0, count)
}

function cardAt(t) {
  if (t < INTRO) return -1
  return ORDER[Math.floor((t - INTRO) / STEP) % ORDER.length]
}

function paint(t) {
  drawSky(t)
  const i = cardAt(t)
  if (i < 0) {
    // the face-down card settles in and breathes
    const k = easeOut(t / 0.5)
    blitCard(BACK, t, { scale: 0.92 + 0.08 * k + 0.012 * Math.sin(t * 4), glow: k })
  } else {
    blitCard(FACES[i], t, { tint: signOf(CARDS[i].sign).color })
  }
  drawHook(t)
  drawFoot(t)
}

// ---------- API ----------

window.setup = async (data) => {
  for (const [family, src, style, weight] of data.fonts) {
    const f = new FontFace(family, `url(${src})`, { style, weight })
    await f.load()
    document.fonts.add(f)
  }
  await document.fonts.ready
  const s = data.script
  CARDS = s.cards
  HOOK = s.hook ?? 'STOP SCROLLING'
  SUB = s.sub ?? ['close your eyes, take a breath', '& screenshot']
  FOOT = s.foot ?? ''
  INTRO = s.intro ?? 1.1
  STEP = (s.hold ?? 4) / (data.fps ?? 30)
  DURATION = s.duration ?? 12
  makeSky()
  BACK = drawBack()
  await Promise.all(Object.entries(data.auras ?? {}).map(async ([id, src]) => {
    const im = new Image()
    im.src = src
    await im.decode()
    AURAS[id] = im
  }))
  FACES = CARDS.map((c, i) => drawFace(c, i, CARDS.length))
  ORDER = makeOrder(CARDS.length, Math.ceil((DURATION - INTRO) / STEP) + 1, hash(s.id))
  return { duration: DURATION }
}

window.frame = (t, q = 0.9) => {
  paint(t)
  return canvas.toDataURL('image/jpeg', q)
}

// The grid cover: the face-down card under the hook.
window.cover = (q = 0.92) => {
  drawSky(0.6)
  blitCard(BACK, 0.6)
  drawHook(2)
  drawFoot(INTRO + 1)
  return canvas.toDataURL('image/jpeg', q)
}

// One card on its own, the way a screenshot would land.
window.card = (i, q = 0.92) => {
  drawSky(3)
  blitCard(FACES[i], 3, { tint: signOf(CARDS[i].sign).color })
  drawHook(2)
  drawFoot(INTRO + 1)
  return canvas.toDataURL('image/jpeg', q)
}
