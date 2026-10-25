// votenext (15 s, vertical) — "Houston got the stars first. Where do they go next?"  CTA: VOTE FOR YOUR CITY
//   0.00–3.00  HOOK  "Houston got | the stars | *first.*" A generic night skyline springs up tower by tower, its windows light
//              in a wave, and a big gold star drops in and settles over it (1.71). On "first." (2.27) it flares.
//   2.85–3.35  the skyline sinks away; the star glides down to the middle of the frame.
//   3.12–7.62  "Where do they | go *next?*" Eleven Align card backs deal out from behind the star into a 4·3·4 spread; the
//              star sinks into the centre card. Ten flip on the eighth notes (4.21 → 6.71), each to a candidate city in
//              bold type with a tiny generic skyline. The centre card stays face-down and a gold "?" stamps onto it (7.27).
//   7.68       card-motif flip cut.
//   7.66–10.4  "Your city | could be | *next.*" The face-down "?" card stands big in front of a hand of the ten city cards;
//              the gold star drops back in and lands on top of it on "next." (8.38). → plain sky from 10.45, end card 10.6.
// No numbers, no leader: the cities appear in a fixed shuffled order and all stay equal. No "Align" in the last beat
// (the big "?" card uses a back without the wordmark/label).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { BONE, GOLD, PINK, CYAN, GREEN, INTER, MONO, SHADOW, D2R, rgba, pop01, outScale, outK, glowStroke, makeBurst, drawBurst, popText } from './kit.js'

export const DURATION = 15
export const CTA = 'VOTE FOR YOUR CITY'
const END = DURATION - ENDCARD_LEN          // 10.6
const SETTLE = 10.45
const BEAT = 60 / 108, B0 = 0.6
const beat = n => +(B0 + n * BEAT).toFixed(3)
const TAU = Math.PI * 2
const LILAC = '#c9a6ff', AMBER = '#ffb36b', ROSE = '#f59cc4'

const T = {
  eyebrow: 0.55, hook: 0.1, hookLast: beat(3), starDrop: [1.12, beat(2)], hookOut: [2.85, 3.0],
  sink: [2.85, 3.4], glide: [2.92, 3.4],
  mid: 3.12, midLast: beat(6), deal0: 3.3, dealGap: 0.075, dealFly: 0.34, starIn: [3.98, 4.22],
  flip0: beat(6.5), flipGap: BEAT / 2, flipDur: 0.26, ask: beat(12), midOut: [7.5, 7.62],
  cut: 7.68,
  fin: 7.86, finLast: beat(14), star2: [8.0, beat(14)], finOut: [9.98, 10.36],
}

// ── the cities (fixed, shuffled order — nobody leads). 10 candidates + the face-down "?" in the centre slot.
const CITIES = [
  { name: 'AUSTIN', col: AMBER }, { name: 'NEW YORK', col: GOLD }, { name: 'SEATTLE', col: CYAN }, { name: 'MIAMI', col: PINK },
  { name: 'CHICAGO', col: LILAC }, { name: 'NASHVILLE', col: GREEN }, { name: 'LA', col: AMBER },
  { name: 'ATLANTA', col: GREEN }, { name: 'NEW ORLEANS', col: LILAC }, { name: 'DALLAS', col: CYAN },
]
// the spread: rows of 4 · 3 · 4; slot 5 (centre) is the "?" card
const CW = 214, CH = Math.round(CW / 0.6265)
const SLOTS = (() => {
  const rows = [[800, 4], [1180, 3], [1560, 4]], out = []
  rows.forEach(([y, n], r) => {
    for (let i = 0; i < n; i++) {
      const u = n === 1 ? 0 : i / (n - 1) * 2 - 1
      const gap = 238
      out.push({ x: 540 + (i - (n - 1) / 2) * gap, y: y + Math.abs(u) * 26 - (r === 1 ? 0 : 0), rot: u * (n === 4 ? 7 : 5) })
    }
  })
  return out
})()
const ASK = 5
const CITY_SLOT = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10]
const FLIP_ORDER = [6, 1, 9, 3, 7, 0, 4, 10, 2, 8]      // slot indices in flip order (a lively zig-zag, not reading order)
const slotCity = s => CITIES[CITY_SLOT.indexOf(s)]
const DEAL_ORDER = [ASK, ...FLIP_ORDER]                  // the "?" card first (under the star), then in flip order
const dealT = s => T.deal0 + DEAL_ORDER.indexOf(s) * T.dealGap
const flipT = s => T.flip0 + FLIP_ORDER.indexOf(s) * T.flipGap

// the end hand: ten city cards fanned behind the big "?" card
const BIG = { x: 540, y: 1270, w: 450 }
const FAN = (() => {
  const angs = [-34, -27, -20, -13, -6, 6, 13, 20, 27, 34], P = { x: 540, y: 2250 }, R = 1000
  return angs.map((a, i) => ({ a, x: P.x + Math.sin(a * D2R) * R, y: P.y - Math.cos(a * D2R) * R, i }))
})()

// ── the Houston skyline (generic towers, no real shapes, no logos)
const TOWERS = [
  { x: 60, w: 110, h: 330, top: 'flat' }, { x: 170, w: 96, h: 470, top: 'slant' }, { x: 280, w: 118, h: 600, top: 'step' },
  { x: 392, w: 98, h: 720, top: 'spire' }, { x: 505, w: 130, h: 830, top: 'pyramid' }, { x: 628, w: 108, h: 660, top: 'flat' },
  { x: 735, w: 96, h: 760, top: 'slant2' }, { x: 845, w: 118, h: 540, top: 'step' }, { x: 958, w: 104, h: 420, top: 'spire' },
  { x: 1060, w: 100, h: 300, top: 'flat' },
]
const SKY_SC = 0.72, BASE_Y = 1730
const WINS = TOWERS.map((b, i) => {
  const r = rng(40 + i), out = []
  const cols = Math.max(2, Math.floor((b.w - 30) / 24)), rows = Math.floor((b.h * SKY_SC - 60) / 30)
  for (let rr = 0; rr < rows; rr++) for (let c = 0; c < cols; c++) if (r() < 0.5) out.push({ c, rr, cols, seed: r() * 100, gold: r() < 0.75 })
  return out
})
function towerPath(x, b, h) {
  const l = b.x - b.w / 2, r = b.x + b.w / 2, y = -h
  x.beginPath(); x.moveTo(l, 0)
  switch (b.top) {
    case 'slant': x.lineTo(l, y + 36); x.lineTo(r, y); break
    case 'slant2': x.lineTo(l, y); x.lineTo(r, y + 44); break
    case 'step': x.lineTo(l, y + 44); x.lineTo(l + b.w * 0.2, y + 44); x.lineTo(l + b.w * 0.2, y); x.lineTo(r - b.w * 0.2, y); x.lineTo(r - b.w * 0.2, y + 44); x.lineTo(r, y + 44); break
    case 'spire': x.lineTo(l, y + 26); x.lineTo(b.x - 9, y + 8); x.lineTo(b.x, y - 52); x.lineTo(b.x + 9, y + 8); x.lineTo(r, y + 26); break
    case 'pyramid': x.lineTo(l, y + 52); x.lineTo(b.x, y - 18); x.lineTo(r, y + 52); break
    default: x.lineTo(l, y); x.lineTo(r, y)
  }
  x.lineTo(r, 0); x.closePath()
}

// a chunky five-point star path (R outer), centred at 0,0
function starPath(x, R, inner = 0.46) {
  x.beginPath()
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? R * inner : R
    i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r) : x.moveTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  x.closePath()
}

// ── card-back sprite (card-back.png + the Align wordmark, baked like cardfx's; plus a no-text variant for the last beat)
const BODY = { x: 119, y: 119, w: 1320, h: 2107, r: 86 }, PAD = 80, WORD = { y: 1838, size: 216 }
const SPR = 0.42      // bake at 42% (the cards are drawn ≤ 450 px wide)
async function bakeBacks() {
  try { await document.fonts.load(`italic 400 ${WORD.size}px 'EB Garamond'`) } catch (_) { /* fallback */ }
  const im = await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + 'card-back.png' })
  if (!im) return [null, null]
  const make = (word) => {
    const c = document.createElement('canvas')
    c.width = Math.round((BODY.w + PAD * 2) * SPR); c.height = Math.round((BODY.h + PAD * 2) * SPR)
    const x = c.getContext('2d'); x.scale(SPR, SPR)
    const rr = (inset = 0) => { x.beginPath(); x.roundRect(PAD + inset, PAD + inset, BODY.w - inset * 2, BODY.h - inset * 2, BODY.r - inset) }
    x.save(); x.shadowColor = 'rgba(3,1,12,0.6)'; x.shadowBlur = 48; x.shadowOffsetY = 18; rr(); x.fillStyle = '#21114a'; x.fill(); x.restore()
    x.save(); rr(); x.clip(); x.drawImage(im, BODY.x, BODY.y, BODY.w, BODY.h, PAD, PAD, BODY.w, BODY.h)
    if (!word) x.drawImage(im, BODY.x, 1968, BODY.w, 72, PAD, PAD + 2042 - BODY.y, BODY.w, 72)   // patch out the "ALIGN · TONIGHT" label
    x.restore()
    if (word) {
      const wx = PAD + BODY.w / 2 - 2, wy = PAD + WORD.y - BODY.y
      x.save(); x.font = `italic 400 ${WORD.size}px 'EB Garamond', Georgia, serif`; x.textAlign = 'center'
      x.shadowColor = 'rgba(242,199,92,0.45)'; x.shadowBlur = 28; x.fillStyle = 'rgba(239,230,214,0.94)'; x.fillText('Align', wx, wy)
      x.shadowBlur = 0; x.strokeStyle = 'rgba(236,214,166,0.45)'; x.lineWidth = 2.5
      for (const s of [-1, 1]) { x.beginPath(); x.moveTo(wx + s * 34, wy + 62); x.lineTo(wx + s * 170, wy + 62); x.stroke() }
      x.restore()
    }
    x.save(); x.globalCompositeOperation = 'lighter'; x.shadowColor = 'rgba(176,140,255,0.55)'; x.shadowBlur = 12
    rr(2); x.strokeStyle = 'rgba(217,205,240,0.4)'; x.lineWidth = 4; x.stroke(); x.restore()
    return c
  }
  return [make(true), make(false)]
}

// ── a city card face, baked once (body w × h at FS scale, with PADF margin for the glow)
const FW = 300, FH = Math.round(FW / 0.6265), PADF = 24
function bakeFace(city, seed) {
  const c = document.createElement('canvas'); c.width = FW + PADF * 2; c.height = FH + PADF * 2
  const x = c.getContext('2d'); x.translate(PADF + FW / 2, PADF + FH / 2)
  const w = FW, h = FH, col = city.col
  // body
  x.save(); x.shadowColor = 'rgba(3,1,12,0.7)'; x.shadowBlur = 18; x.shadowOffsetY = 6
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 22)
  const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1760'); g.addColorStop(0.6, '#1a0e40'); g.addColorStop(1, '#120a2c')
  x.fillStyle = g; x.fill(); x.restore()
  // a soft colour glow from the bottom
  x.save(); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 22); x.clip()
  const gg = x.createRadialGradient(0, h * 0.42, 10, 0, h * 0.42, h * 0.62); gg.addColorStop(0, rgba(col, 0.42)); gg.addColorStop(1, rgba(col, 0))
  x.fillStyle = gg; x.fillRect(-w / 2, -h / 2, w, h); x.restore()
  // rims
  x.beginPath(); x.roundRect(-w / 2 + 3, -h / 2 + 3, w - 6, h - 6, 20); x.lineWidth = 6; x.strokeStyle = col; x.shadowColor = col; x.shadowBlur = 12; x.stroke(); x.shadowBlur = 0
  x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 12); x.lineWidth = 2; x.strokeStyle = rgba(BONE, 0.32); x.stroke()
  // pixel star up top
  x.imageSmoothingEnabled = false; drawPixelStar(x, 0, -h / 2 + 50, 26, 1, GOLD, '#fff6e6'); x.imageSmoothingEnabled = true
  // the name: Inter 900, fitted, one or two lines
  const words = city.name.split(' '), lines = words.length > 1 ? words : [city.name]
  const avail = w - 44
  let size = 66
  x.font = `900 ${size}px ${INTER}`
  const widest = Math.max(...lines.map(l => x.measureText(l).width))
  size = Math.min(size, Math.floor(size * avail / widest))
  x.font = `900 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
  x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 8
  const lh = size * 0.98, y0 = -h * 0.17 - (lines.length - 1) * lh / 2
  lines.forEach((l, i) => x.fillText(l, 0, y0 + i * lh))
  x.shadowBlur = 0
  // tiny generic skyline icon (seeded heights, thick glowing line art)
  const r = rng(seed), n = 5, bw = 34, base = h * 0.36, x0 = -(n * bw + (n - 1) * 6) / 2
  x.save(); x.lineJoin = 'round'; x.lineCap = 'round'
  for (let i = 0; i < n; i++) {
    const bh = 40 + r() * 90 * (i === 2 ? 1.3 : 1), bx = x0 + i * (bw + 6), roof = Math.floor(r() * 3)
    x.beginPath(); x.moveTo(bx, base); x.lineTo(bx, base - bh)
    if (roof === 1) { x.lineTo(bx + bw / 2, base - bh - 20) } else if (roof === 2) { x.lineTo(bx + bw / 2 - 3, base - bh); x.lineTo(bx + bw / 2, base - bh - 26); x.lineTo(bx + bw / 2 + 3, base - bh) }
    x.lineTo(bx + bw, base - bh); x.lineTo(bx + bw, base); x.closePath()
    x.fillStyle = rgba(col, 0.22); x.fill(); x.strokeStyle = col; x.lineWidth = 4.5; x.shadowColor = col; x.shadowBlur = 8; x.stroke(); x.shadowBlur = 0
    x.fillStyle = rgba('#ffe6a8', 0.9)
    for (let k = 0; k < 3; k++) if (r() < 0.7) x.fillRect(bx + 9 + (k % 2) * 10, base - bh + 14 + k * 16, 6, 8)
  }
  x.beginPath(); x.moveTo(x0 - 14, base); x.lineTo(-x0 + 14, base); x.strokeStyle = col; x.lineWidth = 4.5; x.stroke()
  x.restore()
  return c
}

async function build(stage) {
  try {
    await Promise.all(["800 128px Inter", "900 66px Inter", "italic 500 200px 'EB Garamond'", "italic 700 200px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [BACK, BACK_PLAIN] = await bakeBacks()
  const FACES = CITIES.map((c, i) => bakeFace(c, 300 + i * 7))

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  x.imageSmoothingQuality = 'high'
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type
  const eye = el('div', { position: 'absolute', left: 0, width: '1080px', top: '112px', textAlign: 'center', font: "700 34px 'Space Mono', monospace",
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'HOUSTON · LAUNCH CITY #1')
  const H0 = popText(root, 'Houston got | the stars | *first.*', { top: 172, size: 128, weight: 800, accentSize: 200, at: T.hook, gap: 0.09, accentColor: GOLD, lastAt: T.hookLast, wobble: true })
  const H1 = popText(root, 'Where do they | go *next?*', { top: 200, size: 114, weight: 800, accentSize: 184, at: T.mid, gap: 0.08, accentColor: GOLD, lastAt: T.midLast, wobble: true })
  const H2 = popText(root, 'Your city | could be | *next.*', { top: 160, size: 128, weight: 800, accentSize: 220, at: T.fin, gap: 0.08, accentColor: GOLD, lastAt: T.finLast, wobble: true })
  const TEXTS = [[H0, T.hookOut], [H1, T.midOut], [H2, T.finOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(700 + k, n, d)
  const B_LAND = B(1, 14, 320), B_FIRST = B(2, 12, 260), B_HOOK = B(3, 10, 200), B_IN = B(4, 12, 200)
  const B_FLIP = FLIP_ORDER.map((_, i) => B(10 + i, 7, 120)), B_ASK = B(30, 12, 220), B_MID = B(31, 10, 200)
  const B_LAND2 = B(32, 16, 380), B_FIN = B(33, 10, 200)

  // ── the hook skyline
  function skyline(t) {
    const sk = ease.inCubic(prog(t, ...T.sink))
    if (sk >= 1) return
    const lit = t2 => clamp((t2 - 0.7) / 0.8)          // window wave, left → right
    const flare = t >= T.hookLast ? Math.exp(-(t - T.hookLast) * 4) : 0
    x.save(); x.translate(0, BASE_Y + sk * 900); x.globalAlpha = 1 - sk * 0.6
    // warm glow behind the city
    const g = x.createLinearGradient(0, -700, 0, 0)
    g.addColorStop(0, rgba(AMBER, 0)); g.addColorStop(1, rgba(AMBER, 0.22 + 0.2 * flare))
    x.fillStyle = g; x.fillRect(0, -700, 1080, 700)
    const ORDER = [4, 3, 6, 5, 2, 7, 1, 8, 0, 9]
    ORDER.forEach((i, j) => {
      const b = TOWERS[i], kk = easeOutBack(prog(t, 0.05 + j * 0.055, 0.5 + j * 0.055), 1.6)
      if (kk <= 0) return
      const h = b.h * SKY_SC * kk
      x.save(); towerPath(x, b, h); x.fillStyle = '#140c30'; x.fill(); x.fillStyle = rgba(LILAC, 0.14); x.fill(); x.clip()
      const wave = lit(t - (b.x / 1080) * 0.35)
      for (const w of WINS[i]) {
        const wx = b.x - (w.cols * 24) / 2 + w.c * 24 + 4, wy = -h + 62 + w.rr * 30
        if (wy > -14) continue
        const on = clamp(wave * 3 - (w.seed % 1) * 2)
        if (on <= 0) continue
        const tw = 0.7 + 0.3 * Math.sin(t * 1.3 + w.seed)
        x.fillStyle = rgba(w.gold || flare > 0.3 ? '#ffd98a' : '#bfe6ff', (0.85 * tw + 0.15 * flare) * on)
        x.fillRect(wx, wy, 12, 15)
      }
      x.restore()
      towerPath(x, b, h); glowStroke(x, j < 3 ? LILAC : '#b39ce8', 5, 14); x.stroke(); x.shadowBlur = 0
      if ((b.top === 'spire' || b.top === 'pyramid') && Math.sin(t * 4 + i) > 0.2 && kk > 0.9) {
        x.fillStyle = '#ff5a5a'; x.shadowColor = '#ff5a5a'; x.shadowBlur = 14; x.beginPath(); x.arc(b.x, -h - (b.top === 'spire' ? 56 : 22), 6, 0, TAU); x.fill(); x.shadowBlur = 0
      }
    })
    x.beginPath(); x.moveTo(-10, 0); x.lineTo(1090, 0); glowStroke(x, LILAC, 6, 12); x.stroke(); x.shadowBlur = 0
    x.fillStyle = '#0b0620'; x.fillRect(0, 3, 1080, 400)
    // street label
    const lk = pop01(t, 0.9, 0.35)
    if (lk > 0) {
      x.save(); x.translate(540, 92); x.scale(lk, lk); x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.letterSpacing = '12px'; x.fillStyle = BONE; x.shadowColor = AMBER; x.shadowBlur = 16; x.fillText('HOUSTON', 6, 0); x.restore()
    }
    x.restore()
  }

  // ── the gold star: drops on the skyline, glides to centre, sinks into the "?" card; drops again at the end
  function drawStar(cx, cy, R, rot, glow = 1, sq = 1) {
    x.save(); x.translate(cx, cy)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(0, 0, R * 0.2, 0, 0, R * 3.2); g.addColorStop(0, rgba('#ffe29a', 0.55 * glow)); g.addColorStop(0.4, rgba(GOLD, 0.2 * glow)); g.addColorStop(1, rgba(GOLD, 0))
    x.fillStyle = g; x.beginPath(); x.arc(0, 0, R * 3.2, 0, TAU); x.fill()
    // slow rays
    x.globalAlpha = 0.35 * glow
    for (let i = 0; i < 12; i++) {
      const a = rot * 0.4 + i * TAU / 12, L = R * (1.9 + 0.35 * Math.sin(i * 2.3))
      x.beginPath(); x.moveTo(Math.cos(a - 0.05) * R * 0.8, Math.sin(a - 0.05) * R * 0.8); x.lineTo(Math.cos(a) * L, Math.sin(a) * L); x.lineTo(Math.cos(a + 0.05) * R * 0.8, Math.sin(a + 0.05) * R * 0.8)
      x.fillStyle = '#ffe9b0'; x.fill()
    }
    x.restore()
    x.rotate(rot); x.scale(1 / sq, sq)
    starPath(x, R); const sg = x.createLinearGradient(-R, -R, R, R); sg.addColorStop(0, '#fff2c4'); sg.addColorStop(0.5, GOLD); sg.addColorStop(1, '#e89a2c')
    x.fillStyle = sg; x.shadowColor = GOLD; x.shadowBlur = 40; x.fill(); x.shadowBlur = 0
    x.lineWidth = R * 0.07; x.strokeStyle = '#fff6e0'; x.lineJoin = 'round'; x.stroke()
    starPath(x, R * 0.5); x.fillStyle = rgba('#fffaf0', 0.5); x.fill()
    x.restore()
  }
  function star(t) {
    if (t < T.starDrop[0]) return
    // phase 1: the drop + bounce
    const STAR_Y = 960, R0 = 150
    let cy, R = R0, sq = 1, rot = 0.12 * Math.sin(t * 1.5), glow = 1
    const dp = prog(t, ...T.starDrop)
    if (t < T.starDrop[1]) { cy = lerp(-260, STAR_Y, ease.inQuad(dp)); rot += (1 - dp) * 1.2 }
    else {
      const s = t - T.starDrop[1]
      cy = STAR_Y - 60 * Math.abs(Math.sin(s * 9)) * Math.exp(-s * 6)
      sq = 1 + 0.28 * Math.exp(-s * 9) * Math.cos(s * 22)
    }
    const fl = t >= T.hookLast ? Math.exp(-(t - T.hookLast) * 3.5) : 0
    R *= 1 + 0.18 * fl; glow += 0.8 * fl
    // phase 2: glide to centre
    const gp = ease.inOutCubic(prog(t, ...T.glide))
    cy = lerp(cy, SLOTS[ASK].y, gp); R = lerp(R, 118, gp)
    // phase 3: sink into the "?" card
    const ip = ease.inBack ? ease.inBack(prog(t, ...T.starIn)) : ease.inCubic(prog(t, ...T.starIn))
    R *= 1 - clamp(ip)
    if (R > 0.5) drawStar(540, cy, R, rot, glow, sq)
    drawBurst(x, B_LAND, 540, STAR_Y, t, T.starDrop[1], GOLD, 0.8)
    drawBurst(x, B_FIRST, 540, STAR_Y, t, T.hookLast, BONE, 0.8)
    drawBurst(x, B_IN, 540, SLOTS[ASK].y, t, T.starIn[1] - 0.02, GOLD, 0.6)
  }

  // ── a card at (cx, cy), width w, rotation rot (deg), horizontal flip progress fp (0 = back, 1 = face)
  function card(cx, cy, w, rot, fp, face, back = BACK, a = 1) {
    if (a <= 0 || w <= 1) return
    const ph = Math.PI * clamp(fp), sx = Math.abs(Math.cos(ph)), showFace = fp >= 0.5
    const lift = Math.sin(ph)
    x.save(); x.globalAlpha = a; x.translate(cx, cy - 26 * lift); x.rotate(rot * D2R); x.scale(Math.max(0.02, sx) * (1 + 0.12 * lift), 1 + 0.12 * lift)
    if (showFace && face) {
      const s = w / FW
      x.drawImage(face, -face.width * s / 2, -face.height * s / 2, face.width * s, face.height * s)
    } else if (back) {
      const s = w / (BODY.w * SPR)
      x.drawImage(back, -back.width * s / 2, -back.height * s / 2, back.width * s, back.height * s)
    }
    // sheen while turning
    if (lift > 0.05) { x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * lift * a; x.fillStyle = '#ffe9c8'; x.beginPath(); x.roundRect(-w / 2, -w / 0.6265 / 2, w, w / 0.6265, w * 0.07); x.fill() }
    x.restore()
  }
  // the gold "?" badge on a face-down card (local size w)
  function askBadge(cx, cy, w, k, t, rot = 0) {
    if (k <= 0) return
    const pulse = 1 + 0.06 * Math.sin((t - T.ask) * BEAT * TAU * 0.9)
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(k * pulse, k * pulse)
    const r = w * 0.3
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(0, 0, r * 0.3, 0, 0, r * 2.2); g.addColorStop(0, rgba(GOLD, 0.5)); g.addColorStop(1, rgba(GOLD, 0))
    x.fillStyle = g; x.beginPath(); x.arc(0, 0, r * 2.2, 0, TAU); x.fill(); x.restore()
    x.beginPath(); x.arc(0, 0, r, 0, TAU); x.fillStyle = 'rgba(20,10,48,0.9)'; x.fill()
    x.lineWidth = r * 0.09; x.strokeStyle = GOLD; x.shadowColor = GOLD; x.shadowBlur = 18; x.stroke(); x.shadowBlur = 0
    x.font = `italic 700 ${Math.round(r * 1.7)}px 'EB Garamond', Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = GOLD; x.shadowColor = rgba(GOLD, 0.9); x.shadowBlur = 22; x.fillText('?', -r * 0.04, r * 0.08)
    x.restore()
  }

  // ── the middle: deal + flips
  function spread(t) {
    if (t < T.deal0 || t >= T.cut) return
    const out = outK(t, [T.midOut[1], T.cut])
    const order = [...SLOTS.keys()].sort((a, b) => dealT(a) - dealT(b))
    const C = SLOTS[ASK]
    for (const s of order) {
      const S = SLOTS[s], t0 = dealT(s)
      if (t < t0) continue
      const p = prog(t, t0, t0 + T.dealFly), e = easeOutBack(p, 1.4)
      const cx = lerp(C.x, S.x, e), cy = lerp(C.y, S.y, e) - 120 * Math.sin(Math.PI * clamp(p)) * (s === ASK ? 0 : 1)
      const w = (s === ASK ? 236 : CW) * lerp(0.35, 1, ease.outCubic(p))
      const rot = S.rot + (1 - ease.outCubic(p)) * (s % 2 ? 160 : -160) * (s === ASK ? 0 : 1)
      const fp = s === ASK ? 0 : prog(t, flipT(s), flipT(s) + T.flipDur)
      const face = s === ASK ? null : FACES[CITIES.indexOf(slotCity(s))]
      card(cx, cy, w * out, rot, fp, face, BACK, 1)
      if (s !== ASK) drawBurst(x, B_FLIP[FLIP_ORDER.indexOf(s)], S.x, S.y, t, flipT(s) + T.flipDur * 0.5, slotCity(s).col, 0.55)
    }
    // "?" stamps onto the face-down centre card
    const ak = easeOutBack(prog(t, T.ask - 0.04, T.ask + 0.3), 2.6) * out
    const slam = t > T.ask ? 1 + 0.5 * (1 - prog(t, T.ask - 0.04, T.ask + 0.14)) : 1
    askBadge(C.x, C.y, 236, ak * (t < T.ask + 0.1 ? slam : 1), t, C.rot)
    drawBurst(x, B_ASK, C.x, C.y, t, T.ask, GOLD, 0.7)
    drawBurst(x, B_MID, 540, 470, t, T.midLast + 0.1, GOLD, 0.7)
  }

  // ── the end: the big "?" card in front of a hand of ten cities; the star drops onto it
  function finale(t) {
    if (t < T.cut - 0.04 || t >= SETTLE) return
    const ok = outScale(t, T.finOut[0], 0.36)
    if (ok <= 0) return
    const bob = 8 * Math.sin((t - T.cut) * 2.4)
    const breathe = 1 + 0.6 * (0.5 + 0.5 * Math.sin((t - T.cut) * 2.2))
    const settle = ease.outCubic(prog(t, T.cut, T.cut + 0.6))
    FAN.forEach((F, i) => {
      const P = { x: 540, y: 2250 }
      const a = F.a * lerp(0.6, 1, settle) * (0.97 + 0.03 * breathe)
      const cx = P.x + Math.sin(a * D2R) * 1000, cy = P.y - Math.cos(a * D2R) * 1000 + bob * 0.4
      const lx = 540 + (cx - 540) * ok, ly = BIG.y + (cy - BIG.y) * ok
      card(lx, ly, 262 * ok, a, 1, FACES[i], BACK, 1)
    })
    // the big "?" card (no wordmark)
    const bw = BIG.w * ok, by = BIG.y + bob
    const hit = t > T.finLast ? Math.exp(-(t - T.finLast) * 7) * Math.cos((t - T.finLast) * 26) : 0
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(540, by, 60, 540, by, 620 * ok); g.addColorStop(0, rgba(GOLD, 0.16 + 0.22 * Math.max(0, hit))); g.addColorStop(1, rgba(GOLD, 0))
    x.fillStyle = g; x.beginPath(); x.arc(540, by, 620 * ok, 0, TAU); x.fill(); x.restore()
    card(540, by + 14 * hit, bw * (1 - 0.03 * hit), 0, 0, null, BACK_PLAIN, 1)
    askBadge(540, by + 14 * hit, bw * 0.92, ok, t)
    // the star returns
    const sp = prog(t, ...T.star2)
    if (t >= T.star2[0]) {
      const top = by - bw / 0.6265 / 2
      let cy, sq = 1
      if (sp < 1) cy = lerp(-240, top, ease.inQuad(sp))
      else { const s = t - T.star2[1]; cy = top - 50 * Math.abs(Math.sin(s * 9)) * Math.exp(-s * 6); sq = 1 + 0.28 * Math.exp(-s * 9) * Math.cos(s * 22) }
      drawStar(540, cy, 108 * ok, 0.1 * Math.sin(t * 1.6) + (1 - sp) * 1.4, 1 + 0.6 * Math.max(0, hit), sq)
      drawBurst(x, B_LAND2, 540, top, t, T.star2[1], GOLD, 0.9)
    }
    drawBurst(x, B_FIN, 540, 520, t, T.finLast + 0.08, GOLD, 0.7)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < SETTLE) {
        skyline(t); spread(t); star(t); finale(t)
        drawBurst(x, B_HOOK, 540, 560, t, T.hookLast + 0.1, GOLD, 0.7)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.2)))
      const ek = pop01(t, T.eyebrow, 0.3) * outK(t, T.hookOut)
      eye.style.opacity = String(clamp(ek)); eye.style.transform = `scale(${(0.8 + 0.2 * ek).toFixed(3)})`
      for (const [h, o] of TEXTS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts: 3.05 (hook skyline sinking → "Where do they go next?") and 7.68 (spread out → the last line).
// The selection plays one (the 7.68 flip); the hook → middle change works on its own (the star glides, the cards deal).
const CUTS = [{ t: 3.05, kind: 'deal' }, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END, cta: CTA }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]

// ── cues (A major on the 108 bpm grid; the pop score is arranged by the style engine)
const NOTE = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77, 1108.73, 1318.51, 1479.98]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: towers spring, windows, the star
  ...[0, 1, 2, 3, 4].map(j => ['pluck', r3(0.08 + j * 0.11), NOTE[j] / 2, 0.03, 0.4, ((j % 2) - 0.5) * 0.4]),
  ...wordPops(T.hook, 4, 0.09, 0),
  ['glitter', 0.75, 1.45],
  ['tick', T.eyebrow, 0.04],
  ['whoosh', T.starDrop[0] + 0.1, 0.5, 0.04], ['riser', T.starDrop[0], T.starDrop[1], 0.03],
  ['boom', T.starDrop[1], 0.08], ['bell', r3(T.starDrop[1] + 0.02), 880, 0.045, 1.6, 0], ['glitter', T.starDrop[1], T.starDrop[1] + 0.6],
  ['pop', T.hookLast, 1108.73, 0.06, 0], ['bell', r3(T.hookLast + 0.03), 1318.51, 0.04, 1.4, 0], ['glitter', T.hookLast, T.hookLast + 0.5],
  // middle
  ['whoosh', T.sink[0], 0.5, 0.035],
  ...wordPops(T.mid, 4, 0.08, 2, 0.026),
  ...DEAL_ORDER.map((s, k) => ['tick', r3(dealT(s) + 0.05), 0.035 + 0.003 * (k % 3)]),
  ['whoosh', T.deal0, 0.6, 0.025],
  ['pop', T.midLast, 987.77, 0.06, 0], ['pluck', T.midLast, 493.88, 0.04, 0.6, 0],
  ['pop', T.starIn[1], 659.25, 0.04, 0], ['glitter', T.starIn[1] - 0.05, T.starIn[1] + 0.4],
  ...FLIP_ORDER.map((s, k) => ['pop', r3(flipT(s) + T.flipDur * 0.5), NOTE[[0, 2, 4, 3, 5, 4, 6, 5, 7, 8][k]] * 1, 0.04, (SLOTS[s].x - 540) / 600]),
  ...FLIP_ORDER.map(s => ['tick', r3(flipT(s) + 0.02), 0.03]),
  ['tick', r3(T.ask - 0.02), 0.08], ['pop', T.ask, 440, 0.06, 0], ['bell', r3(T.ask + 0.03), 880, 0.04, 1.4, 0], ['glitter', T.ask, T.ask + 0.5],
  // the last line
  ...wordPops(T.fin, 3, 0.08, 1, 0.026),
  ['whoosh', T.star2[0] + 0.05, 0.4, 0.035],
  ['boom', T.finLast, 0.07], ['pop', T.finLast, 1108.73, 0.06, 0], ['bell', r3(T.finLast + 0.03), 1318.51, 0.045, 1.8, 0], ['glitter', T.finLast, T.finLast + 0.8],
  ['whoosh', T.finOut[0], 0.4, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
