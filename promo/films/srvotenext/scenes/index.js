// srvotenext (20 s, vertical) — Star Talk Remix of votenext, "Houston got the stars first."  CTA: VOTE FOR YOUR CITY
// THE STARS (the gold narrator star) guide you through it:
//   0.00–4.60  HOOK  "Houston got | the stars | *first.*" A night skyline springs up tower by tower; the gold star drops
//              in and lands on the tallest spire like a tree topper (1.71), flares on "first." (2.27). Then the Houston
//              air hits it: it squints and sweats. THE STARS: "hi, houston. whew. *humid.*"
//   4.55–5.05  the skyline sinks; the star glides to the middle of the frame.
//   4.75–10.5  "Where do we | go *next?*" Eleven card backs deal out from behind the star into a 4·3·4 spread. Ten flip on
//              the eighth notes to candidate cities, and the star's eyes dart to every single one (hop, hop, hop…).
//              THE STARS: "ten cities?? we can't *choose.*" → dizzy eye-roll → a wink at you → it dives into the
//              face-down centre card and a gold "?" stamps on it.
//  10.62       card-motif flip cut.
//  10.7–15.4   "Your city | could be | *next.*" The big "?" card stands in front of a hand of the ten cities; the star
//              pops back up on top of it, with a packed pixel suitcase whose tag reads "TO: ?".
//              THE STARS: "you vote. we pack. *deal?*" → wink → heart-eyes. Plain sky from 15.45, end card 15.6.
// No numbers, no leader: the cities appear in a fixed shuffled order and all stay equal. No "Align" in the last beat
// (the big "?" card uses a back without the wordmark/label).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { BONE, GOLD, PINK, CYAN, GREEN, INTER, MONO, SHADOW, D2R, rgba, pop01, outScale, outK, glowStroke, makeBurst, drawBurst, popText, drawBits, DROP, DROP_C, HEART, HEART_C } from './kit.js'

export const DURATION = 20
export const CTA = 'VOTE FOR YOUR CITY'
const END = DURATION - ENDCARD_LEN          // 15.6
const SETTLE = 15.45
const BEAT = 60 / 108, B0 = 0.6
const beat = n => +(B0 + n * BEAT).toFixed(3)
const TAU = Math.PI * 2
const LILAC = '#c9a6ff', AMBER = '#ffb36b'

const T = {
  eyebrow: 0.55, hook: 0.1, hookLast: beat(3), starDrop: [1.12, beat(2)], sweat: [2.55, 4.45], hookOut: [4.42, 4.6],
  sink: [4.5, 5.05], glide: [4.55, 5.05],
  mid: 4.75, midLast: beat(8), deal0: 5.0, dealGap: 0.075, dealFly: 0.34,
  flip0: beat(9.5), flipGap: BEAT / 2, flipDur: 0.26, dizzy: [8.72, 9.0], wink: [9.0, 9.22], dive: [9.22, 9.5], ask: beat(16), midOut: [10.3, 10.5],
  cut: 10.62,
  fin: 10.74, finLast: beat(19), star2: [10.9, beat(19)], bag: beat(20), wink2: [13.3, 13.62], heart: 13.62, finOut: [14.98, 15.36],
}
const SPEAK = 'THE STARS'
const CPS = 28
const L1 = [{ t: 2.45, speaker: SPEAK, text: 'hi, houston. whew. *humid.*' }]
const L2 = [{ t: 7.0, speaker: SPEAK, text: "ten cities?? we can't *choose.*" }]
const L3 = [{ t: 11.6, speaker: SPEAK, text: 'you vote. we pack. *deal?*' }]
const ALL_LINES = [...L1, ...L2, ...L3]
const BOX = { y: 1590, close: [5.2, 9.9, 14.6] }

// ── the cities (fixed, shuffled order — nobody leads). 10 candidates + the face-down "?" in the centre slot.
const CITIES = [
  { name: 'AUSTIN', col: AMBER }, { name: 'NEW YORK', col: GOLD }, { name: 'SEATTLE', col: CYAN }, { name: 'MIAMI', col: PINK },
  { name: 'CHICAGO', col: LILAC }, { name: 'NASHVILLE', col: GREEN }, { name: 'LA', col: AMBER },
  { name: 'ATLANTA', col: GREEN }, { name: 'NEW ORLEANS', col: LILAC }, { name: 'DALLAS', col: CYAN },
]
// the spread: rows of 4 · 3 · 4 (lifted so the dialogue box fits underneath); slot 5 (centre) is the "?" card
const CW = 200
const SLOTS = (() => {
  const rows = [[740, 4], [1080, 3], [1410, 4]], out = []
  rows.forEach(([y, n]) => {
    for (let i = 0; i < n; i++) {
      const u = n === 1 ? 0 : i / (n - 1) * 2 - 1
      out.push({ x: 540 + (i - (n - 1) / 2) * 226, y: y + Math.abs(u) * 22, rot: u * (n === 4 ? 7 : 5) })
    }
  })
  return out
})()
const ASK = 5
const CITY_SLOT = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10]
const FLIP_ORDER = [6, 1, 9, 3, 7, 0, 4, 10, 2, 8]      // a lively zig-zag (the star's eyes have to chase it)
const slotCity = s => CITIES[CITY_SLOT.indexOf(s)]
const DEAL_ORDER = [ASK, ...FLIP_ORDER]
const dealT = s => T.deal0 + DEAL_ORDER.indexOf(s) * T.dealGap
const flipT = s => T.flip0 + FLIP_ORDER.indexOf(s) * T.flipGap
const FLIP_TIMES = FLIP_ORDER.map(flipT)

// the end hand: ten city cards fanned behind the big "?" card
const BIG = { x: 540, y: 1150, w: 380 }
const FAN_P = { x: 540, y: 2130 }
const FAN_A = [-34, -27, -20, -13, -6, 6, 13, 20, 27, 34]

// ── the Houston skyline (generic towers, no real shapes, no logos)
const TOWERS = [
  { x: 60, w: 110, h: 330, top: 'flat' }, { x: 170, w: 96, h: 470, top: 'slant' }, { x: 280, w: 118, h: 600, top: 'step' },
  { x: 392, w: 98, h: 720, top: 'spire' }, { x: 505, w: 130, h: 830, top: 'pyramid' }, { x: 628, w: 108, h: 660, top: 'flat' },
  { x: 735, w: 96, h: 760, top: 'slant2' }, { x: 845, w: 118, h: 540, top: 'step' }, { x: 958, w: 104, h: 420, top: 'spire' },
  { x: 1060, w: 100, h: 300, top: 'flat' },
]
const SKY_SC = 0.62, BASE_Y = 1540
const TOPPER = { x: 505, y: BASE_Y - 830 * SKY_SC - 18 }   // the pyramid apex the star sits on
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

// ── the suitcase (pixel art) for the last beat
const CASE = [
  '....hhhh....',
  '....h..h....',
  'BBBBBBBBBBBB',
  'BLLLLLLLLLLB',
  'BLLLLLLLLLLB',
  'GGGGGGGGGGGG',
  'BLLLLLLLLLLB',
  'BLLLLLLLLLLB',
  'BBBBBBBBBBBB',
  '.d........d.',
]
const CASE_C = { h: '#3a2a66', B: '#b46bd8', L: '#d796f0', G: GOLD, d: '#3a2a66' }

// ── card-back sprite (card-back.png + the Align wordmark, baked like cardfx's; plus a no-text variant for the last beat)
const BODY = { x: 119, y: 119, w: 1320, h: 2107, r: 86 }, PAD = 80, WORD = { y: 1838, size: 216 }
const SPR = 0.42
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

// ── a city card face, baked once
const FW = 300, FH = Math.round(FW / 0.6265), PADF = 24
function bakeFace(city, seed) {
  const c = document.createElement('canvas'); c.width = FW + PADF * 2; c.height = FH + PADF * 2
  const x = c.getContext('2d'); x.translate(PADF + FW / 2, PADF + FH / 2)
  const w = FW, h = FH, col = city.col
  x.save(); x.shadowColor = 'rgba(3,1,12,0.7)'; x.shadowBlur = 18; x.shadowOffsetY = 6
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 22)
  const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1760'); g.addColorStop(0.6, '#1a0e40'); g.addColorStop(1, '#120a2c')
  x.fillStyle = g; x.fill(); x.restore()
  x.save(); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 22); x.clip()
  const gg = x.createRadialGradient(0, h * 0.42, 10, 0, h * 0.42, h * 0.62); gg.addColorStop(0, rgba(col, 0.42)); gg.addColorStop(1, rgba(col, 0))
  x.fillStyle = gg; x.fillRect(-w / 2, -h / 2, w, h); x.restore()
  x.beginPath(); x.roundRect(-w / 2 + 3, -h / 2 + 3, w - 6, h - 6, 20); x.lineWidth = 6; x.strokeStyle = col; x.shadowColor = col; x.shadowBlur = 12; x.stroke(); x.shadowBlur = 0
  x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 12); x.lineWidth = 2; x.strokeStyle = rgba(BONE, 0.32); x.stroke()
  x.imageSmoothingEnabled = false; drawPixelStar(x, 0, -h / 2 + 50, 26, 1, GOLD, '#fff6e6'); x.imageSmoothingEnabled = true
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

// the star's mood/look through the film (pure f(t))
function starState(t) {
  if (t < T.starDrop[1]) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.hookLast) return { mood: 'happy' }
  if (t < T.sweat[0]) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.sweat[1]) return { mood: 'squint', look: [0, 0] }
  if (t < T.deal0) return { mood: 'happy' }
  if (t < T.flip0) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.dizzy[0]) {
    let s = -1
    for (const k of FLIP_ORDER) if (t >= flipT(k) - 0.05) s = k
    if (s < 0) return { mood: 'wide', look: [0, 0], blink: false }
    const S = SLOTS[s]
    return { mood: 'wide', look: [clamp((S.x - 540) / 220, -1, 1), clamp((S.y - 1080) / 260, -1, 1)], blink: false }
  }
  if (t < T.dizzy[1]) return { mood: 'eyeroll' }
  if (t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  if (t < T.dive[1]) return { mood: 'wide', look: [0, 1], blink: false }
  if (t < T.star2[1]) return { mood: 'wide', look: [0, 1], blink: false }
  if (t < L3[0].t) return { mood: 'happy' }
  if (t >= T.wink2[0] && t < T.wink2[1]) return { mood: 'wink', look: [0, 0] }
  if (t >= T.heart) return { mood: 'heart', look: [0, 0] }
  return { mood: 'neutral', look: [0, 0] }
}
const HOPS = [...talkHops(ALL_LINES, SPEAK, { cps: CPS }), ...FLIP_TIMES.map(v => +(v - 0.02).toFixed(3))].sort((a, b) => a - b)

async function build(stage) {
  try {
    await Promise.all(["800 128px Inter", "900 66px Inter", "italic 500 200px 'EB Garamond'", "italic 700 200px 'EB Garamond'", "700 34px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [BACK, BACK_PLAIN] = await bakeBacks()
  const FACES = CITIES.map((c, i) => bakeFace(c, 300 + i * 7))

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  x.imageSmoothingQuality = 'high'

  // ── type
  const eye = el('div', { position: 'absolute', left: 0, width: '1080px', top: '112px', textAlign: 'center', font: "700 34px 'Space Mono', monospace",
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'HOUSTON · LAUNCH CITY #1')
  const H0 = popText(root, 'Houston got | the stars | *first.*', { top: 172, size: 124, weight: 800, accentSize: 196, at: T.hook, gap: 0.09, accentColor: GOLD, lastAt: T.hookLast, wobble: true })
  const H1 = popText(root, 'Where do we | go *next?*', { top: 200, size: 112, weight: 800, accentSize: 180, at: T.mid, gap: 0.08, accentColor: GOLD, lastAt: T.midLast, wobble: true })
  const H2 = popText(root, 'Your city | could be | *next.*', { top: 150, size: 114, weight: 800, accentSize: 190, at: T.fin, gap: 0.08, accentColor: GOLD, lastAt: T.finLast, wobble: true })
  const TEXTS = [[H0, T.hookOut], [H1, T.midOut], [H2, T.finOut]]
  const boxes = [L1, L2, L3].map((L, i) => dialogueBox(root, { lines: L, y: BOX.y, width: 960, height: 280, close: BOX.close[i], cps: CPS }))

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const B = (k, n = 8, d = 90) => makeBurst(700 + k, n, d)
  const B_LAND = B(1, 14, 300), B_FIRST = B(2, 12, 240), B_HOOK = B(3, 10, 200), B_IN = B(4, 12, 200)
  const B_FLIP = FLIP_ORDER.map((_, i) => B(10 + i, 7, 120)), B_ASK = B(30, 12, 220), B_MID = B(31, 10, 200)
  const B_LAND2 = B(32, 16, 340), B_FIN = B(33, 10, 200), B_BAG = B(34, 8, 120)

  // ── the hook skyline
  function skyline(t) {
    const sk = ease.inCubic(prog(t, ...T.sink))
    if (sk >= 1) return 900
    const lit = t2 => clamp((t2 - 0.7) / 0.8)
    const flare = t >= T.hookLast ? Math.exp(-(t - T.hookLast) * 4) : 0
    const dy = sk * 900
    x.save(); x.translate(0, BASE_Y + dy); x.globalAlpha = 1 - sk * 0.6
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
      if (b.top === 'spire' && Math.sin(t * 4 + i) > 0.2 && kk > 0.9) {
        x.fillStyle = '#ff5a5a'; x.shadowColor = '#ff5a5a'; x.shadowBlur = 14; x.beginPath(); x.arc(b.x, -h - 56, 6, 0, TAU); x.fill(); x.shadowBlur = 0
      }
    })
    x.beginPath(); x.moveTo(-10, 0); x.lineTo(1090, 0); glowStroke(x, LILAC, 6, 12); x.stroke(); x.shadowBlur = 0
    x.fillStyle = '#0b0620'; x.fillRect(0, 3, 1080, 500)
    // humidity: a soft warm haze wobbling over the rooftops while the star sweats
    const hz = prog(t, T.sweat[0] - 0.2, T.sweat[0] + 0.5) * (1 - prog(t, T.sweat[1] - 0.3, T.sweat[1]))
    if (hz > 0) {
      for (let k = 0; k < 4; k++) {
        const yy = -560 + k * 120 + 10 * Math.sin(t * 2 + k)
        x.globalAlpha = 0.1 * hz * (1 - sk)
        x.fillStyle = '#ffd6a8'
        for (let i = 0; i < 9; i++) { const xx = ((i * 140 + t * (30 + k * 12)) % 1240) - 80; x.fillRect(Math.round(xx), Math.round(yy + 8 * Math.sin(i + t * 3)), 90, 10) }
      }
      x.globalAlpha = 1
    }
    x.restore()
    return dy
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
    if (lift > 0.05) { x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * lift * a; x.fillStyle = '#ffe9c8'; x.beginPath(); x.roundRect(-w / 2, -w / 0.6265 / 2, w, w / 0.6265, w * 0.07); x.fill() }
    x.restore()
  }
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

  // ── THE STARS: drops on the skyline, glides to centre, dives into the "?" card; pops back up at the end
  const HOOK_SZ = 250, MID_SZ = 196, FIN_SZ = 210, FIN_X = 462
  const sitY = (top, sz) => top - 0.31 * sz       // centre so a spire tip pokes into the bottom notch
  function starHook(t, skyDy) {
    if (t < T.starDrop[0] || t >= T.dive[1]) return null
    const st = starState(t)
    const restY = sitY(TOPPER.y, HOOK_SZ)
    let cx = TOPPER.x, cy, sz = HOOK_SZ, sq = 0, pop = 1
    const dp = prog(t, ...T.starDrop)
    if (t < T.starDrop[1]) { cy = lerp(-260, restY, ease.inQuad(dp)); sq = -0.12 }
    else {
      const s = t - T.starDrop[1]
      cy = restY
      sq = 0.3 * Math.exp(-s * 8) * Math.cos(s * 22)
    }
    const fl = t >= T.hookLast ? Math.exp(-(t - T.hookLast) * 3.5) : 0
    // glide to the centre slot as the skyline sinks
    const gp = ease.inOutCubic(prog(t, ...T.glide))
    if (gp > 0) { cx = lerp(cx, SLOTS[ASK].x, gp); cy = lerp(cy + skyDy * (1 - gp) * 0.3, SLOTS[ASK].y + 6, gp); sz = lerp(HOOK_SZ, MID_SZ, gp) }
    // dive into the face-down centre card
    const ip = prog(t, ...T.dive)
    if (ip > 0) { pop = 1 - ip * ip * (2.7 * ip - 1.7); sq += -0.3 * ip; cy += 30 * ip }
    if (t > T.dizzy[0] && t < T.dizzy[1]) sq += 0.04 * Math.sin((t - T.dizzy[0]) * 30)
    const r = drawStarChar(x, cx, cy, sz, t, { color: STAR.sky, ...st, squash: sq, pop: Math.max(0, pop), hops: t > T.starDrop[1] + 0.4 ? HOPS : null, seed: 3, glow: 1.1 + 0.8 * fl })
    drawBurst(x, B_LAND, TOPPER.x, TOPPER.y, t, T.starDrop[1], GOLD, 0.8)
    drawBurst(x, B_FIRST, TOPPER.x, restY, t, T.hookLast, BONE, 0.8)
    drawBurst(x, B_IN, SLOTS[ASK].x, SLOTS[ASK].y, t, T.dive[1] - 0.02, GOLD, 0.6)
    // sweat drops flying off in the Houston air
    if (t > T.sweat[0] && t < T.sweat[1]) {
      for (let k = 0; k < 6; k++) {
        const s0 = T.sweat[0] + 0.05 + k * 0.3, d = t - s0
        if (d < 0 || d > 0.6) continue
        const side = k % 2 ? 1 : -1
        drawBits(x, DROP, DROP_C, Math.round(cx + side * (95 + d * 170)), Math.round(r.top + 30 - d * 140 + d * d * 420), 10, { alpha: 1 - d / 0.6 })
      }
    }
    return r
  }

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
      const w = (s === ASK ? 220 : CW) * lerp(0.35, 1, ease.outCubic(p))
      const rot = S.rot + (1 - ease.outCubic(p)) * (s % 2 ? 160 : -160) * (s === ASK ? 0 : 1)
      const fp = s === ASK ? 0 : prog(t, flipT(s), flipT(s) + T.flipDur)
      const face = s === ASK ? null : FACES[CITIES.indexOf(slotCity(s))]
      card(cx, cy, w * out, rot, fp, face, BACK, 1)
      if (s !== ASK) drawBurst(x, B_FLIP[FLIP_ORDER.indexOf(s)], S.x, S.y, t, flipT(s) + T.flipDur * 0.5, slotCity(s).col, 0.55)
    }
    const ak = easeOutBack(prog(t, T.ask - 0.04, T.ask + 0.3), 2.6) * out
    const slam = t > T.ask ? 1 + 0.5 * (1 - prog(t, T.ask - 0.04, T.ask + 0.14)) : 1
    askBadge(C.x, C.y, 220, ak * (t < T.ask + 0.1 ? slam : 1), t, C.rot)
    drawBurst(x, B_ASK, C.x, C.y, t, T.ask, GOLD, 0.7)
    drawBurst(x, B_MID, 540, 450, t, T.midLast + 0.1, GOLD, 0.7)
  }

  function finale(t) {
    if (t < T.cut - 0.04 || t >= SETTLE) return
    const ok = outScale(t, T.finOut[0], 0.36)
    if (ok <= 0) return
    const bob = 8 * Math.sin((t - T.cut) * 2.4)
    const breathe = 1 + 0.6 * (0.5 + 0.5 * Math.sin((t - T.cut) * 2.2))
    const settle = ease.outCubic(prog(t, T.cut, T.cut + 0.6))
    FAN_A.forEach((a0, i) => {
      const a = a0 * lerp(0.6, 1, settle) * (0.97 + 0.03 * breathe)
      const cx = FAN_P.x + Math.sin(a * D2R) * 1000, cy = FAN_P.y - Math.cos(a * D2R) * 1000 + bob * 0.4
      const lx = 540 + (cx - 540) * ok, ly = BIG.y + (cy - BIG.y) * ok
      card(lx, ly, 250 * ok, a, 1, FACES[i], BACK, 1)
    })
    const bw = BIG.w * ok, by = BIG.y + bob
    const hit = t > T.finLast ? Math.exp(-(t - T.finLast) * 7) * Math.cos((t - T.finLast) * 26) : 0
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(540, by, 60, 540, by, 600 * ok); g.addColorStop(0, rgba(GOLD, 0.16 + 0.22 * Math.max(0, hit))); g.addColorStop(1, rgba(GOLD, 0))
    x.fillStyle = g; x.beginPath(); x.arc(540, by, 600 * ok, 0, TAU); x.fill(); x.restore()
    card(540, by + 14 * hit, bw * (1 - 0.03 * hit), 0, 0, null, BACK_PLAIN, 1)
    askBadge(540, by + 14 * hit, bw * 0.92, ok, t)
    const top = by + 14 * hit - (bw / 0.6265) / 2
    // the suitcase, packed, on the card's top-right corner, with a "TO: ?" tag
    const bk = pop01(t, T.bag, 0.4) * ok
    if (bk > 0) {
      const bx = 540 + bw * 0.33, cell = 11
      const wob = t > T.bag ? 0.08 * Math.sin((t - T.bag) * 16) * Math.exp(-(t - T.bag) * 4) : 0
      x.save(); x.translate(bx, top); x.scale(bk, bk); x.rotate(wob)
      drawBits(x, CASE, CASE_C, 0, -5 * cell, cell)
      // the luggage tag on a string off the right side, swinging a little
      const sw = 0.1 * Math.sin(t * 2.6)
      x.translate(6 * cell, -6 * cell); x.rotate(sw)
      x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(24, 6, 34, 36); x.stroke()
      x.translate(34, 36); x.rotate(0.12)
      x.fillStyle = '#f3ead8'; x.strokeStyle = '#3a2a66'; x.lineWidth = 5
      x.beginPath(); x.moveTo(-18, -32); x.lineTo(130, -32); x.lineTo(130, 32); x.lineTo(-18, 32); x.lineTo(-38, 0); x.closePath(); x.fill(); x.stroke()
      x.fillStyle = '#3a2a66'; x.beginPath(); x.arc(-16, 0, 6, 0, TAU); x.fill()
      x.font = "700 36px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('TO: ?', 52, 2)
      x.restore()
      drawBurst(x, B_BAG, bx, top - 60, t, T.bag, PINK, 0.6)
    }
    // the star pops back up out of the card and lands on top
    if (t >= T.star2[0]) {
      const sp = prog(t, ...T.star2)
      const rest = top - 0.44 * FIN_SZ + 4
      let cy, sq = 0
      if (sp < 1) { cy = lerp(by, rest - 160, ease.outCubic(Math.min(1, sp * 1.7))); if (sp > 0.6) cy = lerp(rest - 160, rest, ease.inQuad((sp - 0.6) / 0.4)); sq = -0.15 }
      else { const s = t - T.star2[1]; cy = rest; sq = 0.3 * Math.exp(-s * 8) * Math.cos(s * 22) }
      const st = starState(t)
      drawStarChar(x, FIN_X, cy, FIN_SZ, t, { color: STAR.sky, ...st, squash: sq, pop: ok * easeOutBack(prog(t, T.star2[0], T.star2[0] + 0.3), 2), hops: HOPS, seed: 3, glow: 1.1 + 0.6 * Math.max(0, hit) })
      drawBurst(x, B_LAND2, FIN_X, top, t, T.star2[1], GOLD, 0.9)
      // heart-eyes: little hearts float up
      if (t > T.heart) {
        for (let i = 0; i < 6; i++) {
          const born = T.heart + i * 0.24, p = (t - born) / 1.4
          if (p < 0 || p >= 1) continue
          const side = ((i * 37) % 7) / 6 - 0.5
          drawBits(x, HEART, HEART_C, Math.round(FIN_X + side * 360 + Math.sin(p * 4 + i) * 14), Math.round(rest - 40 - p * 150), 8 * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) * ok })
        }
      }
    }
    drawBurst(x, B_FIN, 540, 480, t, T.finLast + 0.08, GOLD, 0.7)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < SETTLE) {
        const dy = skyline(t)
        spread(t)
        starHook(t, dy ?? 0)
        finale(t)
        drawBurst(x, B_HOOK, 540, 540, t, T.hookLast + 0.1, GOLD, 0.7)
      }
      for (const b of boxes) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.2)))
      const ek = pop01(t, T.eyebrow, 0.3) * outK(t, T.hookOut)
      eye.style.opacity = String(clamp(ek)); eye.style.transform = `scale(${(0.8 + 0.2 * ek).toFixed(3)})`
      for (const [h, o] of TEXTS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts: 4.62 (hook → "Where do we go next?") and 10.62 (spread out → the last line).
// The selection plays one (the 10.62 flip); the hook → middle change works on its own (the star glides, the cards deal).
const CUTS = [{ t: 4.62, kind: 'deal' }, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END, cta: CTA }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]

// ── cues (pitched in D, re-keyed by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51, 1479.98, 1760, 1975.53]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: towers spring, windows, the star lands on the spire
  ...[0, 1, 2, 3, 4].map(j => ['pluck', r3(0.08 + j * 0.11), NOTE[j] / 2, 0.03, 0.4, ((j % 2) - 0.5) * 0.4]),
  ...wordPops(T.hook, 4, 0.09, 0),
  ['glitter', 0.75, 1.45],
  ['tick', T.eyebrow, 0.04],
  ['whoosh', T.starDrop[0] + 0.1, 0.5, 0.04], ['riser', T.starDrop[0], T.starDrop[1], 0.03],
  ['boom', T.starDrop[1], 0.08], ['pop', T.starDrop[1], 440, 0.05, 0], ['bell', r3(T.starDrop[1] + 0.02), 880, 0.045, 1.6, 0], ['glitter', T.starDrop[1], T.starDrop[1] + 0.6],
  ['pop', T.hookLast, 1174.66, 0.06, 0], ['bell', r3(T.hookLast + 0.03), 1318.51, 0.04, 1.4, 0], ['glitter', T.hookLast, T.hookLast + 0.5],
  ...[0, 1, 2, 3, 4, 5].map(k => ['pop', r3(T.sweat[0] + 0.05 + k * 0.3), 1760 - k * 60, 0.018, k % 2 ? 0.3 : -0.3]),
  // middle: the deal, ten flips (the eyes chase each one), dizzy, wink, the dive, the "?"
  ['whoosh', T.sink[0], 0.5, 0.035],
  ...wordPops(T.mid, 4, 0.08, 2, 0.026),
  ...DEAL_ORDER.map((s, k) => ['tick', r3(dealT(s) + 0.05), 0.035 + 0.003 * (k % 3)]),
  ['whoosh', T.deal0, 0.6, 0.025],
  ['pop', T.midLast, 987.77, 0.06, 0], ['pluck', T.midLast, 493.88, 0.04, 0.6, 0],
  ...FLIP_ORDER.map((s, k) => ['pop', r3(flipT(s) + T.flipDur * 0.5), NOTE[[0, 2, 4, 3, 5, 4, 6, 5, 7, 8][k]], 0.04, (SLOTS[s].x - 540) / 600]),
  ...FLIP_ORDER.map(s => ['tick', r3(flipT(s) + 0.02), 0.03]),
  ['pluck', T.dizzy[0], 739.99, 0.03, 0.3, -0.2], ['pluck', r3(T.dizzy[0] + 0.1), 659.25, 0.03, 0.3, 0.2], ['pluck', r3(T.dizzy[0] + 0.2), 587.33, 0.03, 0.4, 0],
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', r3(T.wink[0] + 0.04), 1760, 0.02, 0.9, 0],
  ['whoosh', T.dive[0], 0.3, 0.03], ['pop', T.dive[1], 659.25, 0.045, 0], ['glitter', r3(T.dive[1] - 0.05), r3(T.dive[1] + 0.4)],
  ['tick', r3(T.ask - 0.02), 0.08], ['pop', T.ask, 440, 0.06, 0], ['bell', r3(T.ask + 0.03), 880, 0.04, 1.4, 0], ['glitter', T.ask, T.ask + 0.5],
  // the last line: the star pops back up, the suitcase, wink, hearts
  ...wordPops(T.fin, 3, 0.08, 1, 0.026),
  ['whoosh', T.star2[0], 0.4, 0.035], ['pop', r3(T.star2[0] + 0.05), 880, 0.04, 0],
  ['boom', T.finLast, 0.07], ['pop', T.finLast, 1174.66, 0.06, 0], ['bell', r3(T.finLast + 0.03), 1318.51, 0.045, 1.8, 0], ['glitter', T.finLast, T.finLast + 0.8],
  ['tick', T.bag, 0.06], ['pop', r3(T.bag + 0.02), 739.99, 0.045, 0.3], ['pop', r3(T.bag + 0.12), 987.77, 0.035, 0.3],
  ['pluck', T.wink2[0], 1318.51, 0.04, 0.5, 0], ['bell', r3(T.wink2[0] + 0.04), 1760, 0.022, 1.0, 0],
  ['glitter', T.heart, r3(T.heart + 0.8)], ['pop', T.heart, 1174.66, 0.035, 0],
  ['whoosh', T.finOut[0], 0.4, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS }),
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
