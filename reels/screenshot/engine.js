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
  card: { x: CX, y: 1040, w: 660, h: 990, r: 34 },
  foot: 1592,
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

const { w: CW, h: CH, r: CR } = L.card

function cardBase(g, seed, tint) {
  const r = rng(seed)
  g.save()
  g.beginPath()
  g.roundRect(0, 0, CW, CH, CR)
  g.clip()
  const gr = g.createRadialGradient(CW / 2, CH * 0.36, 20, CW / 2, CH * 0.5, CH * 0.85)
  gr.addColorStop(0, '#241a5e')
  gr.addColorStop(0.55, '#130c3a')
  gr.addColorStop(1, '#080522')
  g.fillStyle = gr
  g.fillRect(0, 0, CW, CH)
  for (let i = 0; i < 4; i++) {
    const x = r() * CW, y = r() * CH, s = 160 + r() * 220
    const h = g.createRadialGradient(x, y, 0, x, y, s)
    h.addColorStop(0, rgba(tint, 0.13))
    h.addColorStop(1, rgba(tint, 0))
    g.fillStyle = h
    g.fillRect(0, 0, CW, CH)
  }
  for (let i = 0; i < 220; i++) {
    g.fillStyle = rgba(COL.bone, 0.08 + r() * 0.42)
    g.beginPath()
    g.arc(r() * CW, r() * CH, 0.5 + r() * 1.3, 0, TAU)
    g.fill()
  }
  // fine grain, so it reads like a printed card
  const d = g.getImageData(0, 0, CW, CH)
  for (let p = 0; p < d.data.length; p += 4) {
    const n = (r() - 0.5) * 12
    d.data[p] += n
    d.data[p + 1] += n
    d.data[p + 2] += n
  }
  g.putImageData(d, 0, 0)
  g.restore()
  // a double gold rule inside the edge, with a sparkle at each corner
  g.strokeStyle = rgba(COL.gold, 0.75)
  g.lineWidth = 3
  g.beginPath()
  g.roundRect(26, 26, CW - 52, CH - 52, 20)
  g.stroke()
  g.strokeStyle = rgba(COL.gold, 0.32)
  g.lineWidth = 1.5
  g.beginPath()
  g.roundRect(38, 38, CW - 76, CH - 76, 14)
  g.stroke()
  for (const [x, y] of [[26, 26], [CW - 26, 26], [26, CH - 26], [CW - 26, CH - 26]]) sparkle(g, x, y, 16, COL.gold)
}

// An orbit diagram: one ring per digit kind, a lit planet for each digit,
// so 444 shows four planets in line and 1212 shows the pattern.
function orbits(g, cx, cy, card, tint) {
  const digits = String(card.big).replace(/\D/g, '').split('').map(Number)
  const n = Math.max(1, digits.reduce((a, b) => a + b, 0) % 9 || 9)
  const r = rng(hash(card.big))
  const rings = [190, 245, 290]
  for (const [i, rr] of rings.entries()) {
    g.strokeStyle = rgba(tint, 0.18 + 0.1 * (2 - i))
    g.lineWidth = 1.5
    g.setLineDash(i === 1 ? [4, 10] : [])
    g.beginPath()
    g.ellipse(cx, cy, rr, rr * 0.3, -0.12, 0, TAU)
    g.stroke()
  }
  g.setLineDash([])
  const a0 = r() * TAU
  for (let i = 0; i < n; i++) {
    const rr = rings[i % 3]
    const a = a0 + (i / n) * TAU
    const x = cx + Math.cos(a) * rr
    const y = cy + Math.sin(a) * rr * 0.3
    orb(g, x, y, 5 + (i % 3), i % 2 ? COL.glow : tint, { halo: 3, a: 0.9 })
  }
}

function bigNumber(g, text, x, y, tint) {
  let size = 230
  g.font = `italic 600 ${size}px "EB Garamond"`
  while (g.measureText(text).width > CW - 170 && size > 120) g.font = `italic 600 ${(size -= 6)}px "EB Garamond"`
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.save()
  g.shadowColor = rgba(tint, 0.9)
  g.shadowBlur = 60
  g.fillStyle = rgba(COL.glow, 0.95)
  g.fillText(text, x, y)
  g.shadowBlur = 18
  g.shadowColor = rgba(COL.glow, 0.8)
  const gr = g.createLinearGradient(0, y - size / 2, 0, y + size / 2)
  gr.addColorStop(0, '#fffbe8')
  gr.addColorStop(0.55, COL.gold)
  gr.addColorStop(1, COL.goldDeep)
  g.fillStyle = gr
  g.fillText(text, x, y)
  g.restore()
}

function drawFace(card, kicker, i) {
  const c = layer(CW, CH)
  const g = c.getContext('2d')
  const tint = colOf(card.color)
  cardBase(g, hash(card.big + card.title) + i, tint)
  spaced(g, kicker, CW / 2, 96, { font: '700 22px "Space Mono"', color: rgba(COL.bone, 0.7), spacing: 6 })
  orbits(g, CW / 2, 300, card, tint)
  bigNumber(g, card.big, CW / 2, 300, tint)
  // title
  g.font = 'italic 500 66px "EB Garamond"'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillStyle = COL.glow
  g.fillText(card.title, CW / 2, 528)
  // a small divider
  g.strokeStyle = rgba(COL.gold, 0.6)
  g.lineWidth = 2
  g.beginPath()
  g.moveTo(CW / 2 - 90, 588)
  g.lineTo(CW / 2 - 18, 588)
  g.moveTo(CW / 2 + 18, 588)
  g.lineTo(CW / 2 + 90, 588)
  g.stroke()
  sparkle(g, CW / 2, 588, 10, COL.gold)
  // the message
  let size = 40
  g.font = `500 ${size}px Poppins`
  let lines = wrap(g, card.line, CW - 150)
  while (lines.length > 4 && size > 30) {
    g.font = `500 ${(size -= 2)}px Poppins`
    lines = wrap(g, card.line, CW - 150)
  }
  const lh = size * 1.42
  const y0 = 632 + lh / 2 + (4 - lines.length) * lh * 0.3
  g.fillStyle = rgba(COL.bone, 0.94)
  lines.forEach((ln, k) => g.fillText(ln, CW / 2, y0 + k * lh))
  // the wordmark
  g.font = 'italic 500 44px "EB Garamond"'
  g.fillStyle = rgba(COL.gold, 0.9)
  g.fillText('Align', CW / 2, CH - 78)
  return c
}

function drawBack() {
  const c = layer(CW, CH)
  const g = c.getContext('2d')
  cardBase(g, 99, COL.lilac)
  const cx = CW / 2, cy = CH / 2 - 30
  // a sunburst of thin rays and a ring of the twelve signs' points
  g.save()
  g.translate(cx, cy)
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * TAU
    g.strokeStyle = rgba(COL.gold, i % 4 ? 0.14 : 0.35)
    g.lineWidth = i % 4 ? 1 : 2
    g.beginPath()
    g.moveTo(Math.cos(a) * 120, Math.sin(a) * 120)
    g.lineTo(Math.cos(a) * (i % 4 ? 220 : 262), Math.sin(a) * (i % 4 ? 220 : 262))
    g.stroke()
  }
  g.strokeStyle = rgba(COL.gold, 0.55)
  g.lineWidth = 2
  for (const rr of [100, 280]) {
    g.beginPath()
    g.arc(0, 0, rr, 0, TAU)
    g.stroke()
  }
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU - Math.PI / 2
    orb(g, Math.cos(a) * 280, Math.sin(a) * 280, 6, COL.gold, { halo: 2.6 })
  }
  g.restore()
  sparkle(g, cx, cy, 70, COL.gold)
  orb(g, cx, cy, 14, COL.glow, { halo: 4 })
  g.font = 'italic 500 92px "EB Garamond"'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillStyle = COL.gold
  g.fillText('Align', cx, CH - 170)
  spaced(g, 'PICK YOUR CARD', cx, CH - 102, { font: '700 20px "Space Mono"', color: rgba(COL.bone, 0.6), spacing: 6 })
  return c
}

function blitCard(img, t, { scale = 1, glow = 1 } = {}) {
  const { x, y } = L.card
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)
  // a warm glow behind the card that breathes slowly
  const br = 0.75 + 0.25 * Math.sin(t * 2.2)
  ctx.shadowColor = rgba(COL.gold, 0.5 * glow * br)
  ctx.shadowBlur = 90
  ctx.fillStyle = '#0b0726'
  ctx.beginPath()
  ctx.roundRect(-CW / 2, -CH / 2, CW, CH, CR)
  ctx.fill()
  ctx.shadowColor = 'transparent'
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
    blitCard(FACES[i], t)
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
  FACES = CARDS.map((c, i) => drawFace(c, s.kicker ?? 'ALIGN', i))
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
  blitCard(FACES[i], 3)
  drawHook(2)
  drawFoot(INTRO + 1)
  return canvas.toDataURL('image/jpeg', q)
}
