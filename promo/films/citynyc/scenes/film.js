// citynyc (30 s vertical Align ad) · scenes 0–25.6, then the shared END CARD ("come" + the logo + JOIN THE WAITLIST).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–5.40   HOOK  "Millions | of people | in *New York…*" — a dense generic skyline rises building by building,
//               windows flick on, water towers pop on the roofs; on the drop (2.82) an elevated subway train whooshes in
//   5.60–12.00  "…and the apps | keep showing you | the *same five.*" — the train slows to a crawl: every car carries the
//               same five silhouettes (numbered 1–5 on the roof); each new car gets an "AGAIN." stamp.
//               "Same faces. Every *stop.*"
//  12.27–18.10  "Tonight's deck: | a *new* hand, | every night." — the train blasts off; card backs deal in over the
//               city and fan out. "Never the *same five.*"
//  18.38–22.10  "Chart *first.* | Face last." — the centre card lifts and flips to a veiled mystery card, a ring of
//               glyphs blooms round it. "Someone you've | *never seen.*"
//  22.27–25.30  "Meet someone | *actually new.*" — the card spins into a star over the skyline, new pink windows light
//               up across the city, then everything fades
//  25.33–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, H, fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { BONE, GOLD, PINK, BLUE, ROSE, VIOLET, LAV, AMBER, INTER, MONO, rgba, ink, sparkle, orb, chip } from './props.js'

export const END = 25.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2, D2R = Math.PI / 180
const MINT = '#7fe0b5'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))

// ── beats
export const T = {
  eye: 0.08, h0: [0.12, 0.3, 0.42, BEAT(1), BEAT(1) + 0.1], ny: BEAT(1) + 0.1, drop: BEAT(4), h0Out: 5.3,
  h1: 5.6, same: BEAT(11), h1Out: 11.85,
  stop: BEAT(16), stamps: [], // filled below (car-centre times)
  h2: BEAT(21), hand: BEAT(22), night: BEAT(23.5), deal: [0, 1, 2, 3, 4].map(i => BEAT(23 + i * 0.5)), never: BEAT(26), h2Out: 17.7,
  lift: [BEAT(30.5), BEAT(31.6)], flip: [BEAT(31.6), BEAT(32.3)], land: BEAT(32.3), h3: BEAT(32), ring: BEAT(33), seen: BEAT(35), h3Out: 22.05,
  h4: BEAT(39), actually: BEAT(40), toStar: [22.2, 23.2], newLights: [22.9, 24.0], h4Out: 24.95, fade: [24.3, 25.28],
}

// ── the skyline
const BASE = 1560
const SKY = (() => {
  const r = rng(21), back = [], front = []
  let xx = -30
  while (xx < W + 30) { const w = 70 + r() * 70; back.push({ x: xx, w, h: 300 + r() * 330, t0: 0.05 + r() * 0.9, tint: r(), seed: r() * 100 }); xx += w * (0.7 + r() * 0.3) }
  // front: hand-placed widths so the two generic landmarks sit nicely
  const F = [[-20, 120, 420, 'flat'], [92, 104, 520, 'tank'], [190, 140, 735, 'crown'], [322, 112, 470, 'tank'], [425, 96, 560, 'antenna'],
    [512, 156, 800, 'spire'], [660, 110, 600, 'flat'], [760, 128, 450, 'tank'], [876, 100, 680, 'antenna'], [968, 130, 500, 'tank']]
  F.forEach(([x, w, h, top], i) => front.push({ x, w, h, top, t0: 0.1 + [3, 6, 1, 8, 4, 0, 5, 9, 2, 7][i] * 0.11, tint: r(), seed: r() * 100 }))
  for (const b of [...back, ...front]) {
    b.win = []
    const cols = Math.max(2, Math.floor((b.w - 20) / 24)), rows = Math.floor((b.h - 50) / 34)
    const ox = b.x + (b.w - (cols - 1) * 24) / 2
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      if (r() < 0.38) continue
      const u = r()
      b.win.push({ x: ox + i * 24, y: BASE - 40 - j * 34, on: b.t0 + 0.35 + r() * 1.9, col: u < 0.72 ? '#ffd98a' : u < 0.86 ? BLUE : PINK, seed: r() * 50, fresh: r() < 0.16 ? T.newLights[0] + r() * (T.newLights[1] - T.newLights[0]) : 99 })
    }
  }
  return { back, front }
})()

// ── the train: an endless-looking elevated train, right → left; speed profile integrated into a table
const CL = 900, GAP = 40, PITCH = CL + GAP, TY = 1218, TH = 318
const VC = PITCH / (3 * 0.5556)            // cruise: one car per 3 beats
let VF = 3600                               // fast speed, solved below so car 0 bursts in right on the drop
const speed = t => {
  if (t < 2.5) return 0
  if (t < 2.82) return lerp(0, VF, ease.outQuad(prog(t, 2.5, 2.82)))
  if (t < 4.5) return VF
  if (t < 5.9) return lerp(VF, VC, ease.inOutCubic(prog(t, 4.5, 5.9)))
  if (t < 11.95) return VC
  return lerp(VC, 4200, ease.inQuad(prog(t, 11.95, 12.6)))
}
const DT = 1 / 240
let PTAB
const mkTab = () => { const a = [0]; let p = 0; for (let i = 1; i <= 14 / DT; i++) { p += speed((i - 0.5) * DT) * DT; a.push(p) } return a }
const Pof = t => { if (t <= 0) return 0; const f = t / DT, i = Math.min(PTAB.length - 2, Math.floor(f)); return lerp(PTAB[i], PTAB[i + 1], f - i) }
const ENTER = 2.6                           // car 0's nose reaches the right edge here
PTAB = mkTab()
const K0 = Math.round((Pof(T.same) - Pof(ENTER) - (W - 540) - CL / 2) / PITCH)   // the car centred on "same five."
{ let lo = 1500, hi = 8000
  for (let it = 0; it < 40; it++) { VF = (lo + hi) / 2; PTAB = mkTab(); const d = Pof(T.same) - Pof(ENTER) - (W - 540) - CL / 2 - K0 * PITCH; if (d > 0) hi = VF; else lo = VF } }
const X0 = 540 + Pof(T.same) - K0 * PITCH - CL / 2
const carX = (k, t) => X0 - Pof(t) + k * PITCH
const NCARS = (() => { let n = K0 + 1; while (carX(n, 12.9) + CL < 0) n++; return n })()   // the tail clears the left edge by 12.9
const carCentreT = k => { for (let s = 0; s < 14 / DT; s++) if (carX(k, s * DT) + CL / 2 <= 540) return s * DT; return 99 }
const CRUISE_CARS = []
for (let k = 0; k < NCARS; k++) { const tc = carCentreT(k); if (tc > 6.0 && tc < 12.0) CRUISE_CARS.push({ k, tc }) }
T.stamps = CRUISE_CARS.filter(c => c.k > K0).map(c => r3(c.tc))
const STAMPS = ['AGAIN.', 'AGAIN?', 'AGAIN!?', 'STILL THEM.']

// the five regulars (no faces): body colour, hair colour, hairstyle
const FIVE = [
  { body: PINK, hair: '#3a1f4d', style: 'bun' },
  { body: BLUE, hair: '#1b2a55', style: 'beanie' },
  { body: GOLD, hair: '#4a2a1a', style: 'curls' },
  { body: LAV, hair: '#2a1846', style: 'bob' },
  { body: MINT, hair: '#163a33', style: 'cap' },
]

// ── the deck
const CARD_W = 262, CARD_H = Math.round(262 * 2347 / 1528)
const FAN = [0, 1, 2, 3, 4].map(i => ({ x: 540 + (i - 2) * 158, y: 1090 + Math.abs(i - 2) * 34, rot: (i - 2) * 10 }))
const DEAL_ORDER = [0, 4, 1, 3, 2]
const BIG_H = 760, CARD_C = { x: 540, y: 1075 }
const STAR = { x: 540, y: 820 }

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break, `_` = a space in a word. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.08, at = 0, times = null, big = [], wobble = false, lineHeight = 1.02, boost = null }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  let n = 0
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: acc && big.includes(n) ? '0 0.1em 0 0.3em' : acc ? '0 0.16em' : '0 0.12em', opacity: 0, transformOrigin: '50% 85%', whiteSpace: 'pre' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    ws.push({ t: times ? times[n] : at + n * gap, big: big.includes(n), e: el('span', style, box, w.replace(/\*/g, '').replace(/_/g, ' ')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    times: ws.map(w => w.t),
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        let sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        if (w.big && boost) sc *= boost(t)
        const rot = w.big && wobble && t > w.t ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src })
const bitmap = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }

export async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "900 96px Inter", "700 62px Inter", "italic 500 170px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [backIm, profIm] = await Promise.all([loadImg(A + 'card-back.png'), loadImg(A + 'card-profile-3.png')])
  const backBmp = bitmap(backIm, 560), profBmp = bitmap(profIm, 1000)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'NEW YORK, NY')
  const nyBoost = t => 1 + 0.14 * Math.exp(-Math.max(0, t - T.drop) * 5) * Math.sin(Math.max(0, t - T.drop) * 16) * (t > T.drop ? 1 : 0)
  const H0 = popText(root, 'Millions | of people | in *New_York…*', { top: 196, size: 116, accentSize: 172, times: T.h0, big: [4], wobble: true, accentColor: PINK, lineHeight: 0.98, boost: nyBoost })
  const h1t = [T.h1, T.h1 + 0.08, T.h1 + 0.16, BEAT(10), BEAT(10) + 0.08, BEAT(10) + 0.16, T.same - 0.1, T.same]
  const H1 = popText(root, '…and the apps | keep showing you | the *same_five.*', { top: 196, size: 100, accentSize: 168, times: h1t, big: [7], wobble: true, accentColor: GOLD, lineHeight: 1.02 })
  const S1 = popText(root, 'Same faces. Every *stop.*', { top: 1640, size: 66, weight: 700, accentSize: 84, times: [T.stop, T.stop + 0.1, T.stop + 0.3, T.stop + 0.4], big: [3], accentColor: PINK })
  const h2t = [T.h2, T.h2 + 0.1, T.hand, T.hand + 0.1, T.hand + 0.24, T.night, T.night + 0.1]
  const H2 = popText(root, 'Tonight’s deck: | a *new* hand, | every night.', { top: 196, size: 106, accentSize: 168, times: h2t, big: [3], wobble: true, accentColor: PINK, lineHeight: 1.02 })
  const S2 = popText(root, 'Never the *same_five.*', { top: 1640, size: 66, weight: 700, accentSize: 84, times: [T.never, T.never + 0.1, T.never + 0.24], big: [2], accentColor: GOLD })
  const H3 = popText(root, 'Chart *first.* | Face last.', { top: 196, size: 122, accentSize: 176, times: [T.h3, T.h3 + 0.12, BEAT(33), BEAT(33) + 0.1], big: [1], wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const S3 = popText(root, 'Someone you’ve | *never_seen.*', { top: 1650, size: 64, weight: 700, accentSize: 88, times: [T.seen, T.seen + 0.1, T.seen + 0.32], big: [2], accentColor: PINK, lineHeight: 1.0 })
  const H4 = popText(root, 'Meet someone | *actually_new.*', { top: 236, size: 118, accentSize: 172, times: [T.h4, T.h4 + 0.12, T.actually], big: [2], wobble: true, accentColor: PINK, lineHeight: 1.0 })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── skyline
  function building(b, t, front, dim) {
    const k = easeOutBack(prog(t, b.t0, b.t0 + 0.5), 1.6)
    if (k <= 0) return
    const yOff = (1 - k) * b.h
    const top = BASE - b.h + yOff
    x.save()
    x.beginPath(); x.rect(-50, 0, W + 100, BASE + 2); x.clip()
    x.translate(0, yOff)
    const y0 = BASE - b.h
    const body = () => {
      x.beginPath()
      if (b.top === 'spire') {
        const s1 = b.w * 0.74, s2 = b.w * 0.5, s3 = b.w * 0.28, cx = b.x + b.w / 2
        x.moveTo(b.x, BASE); x.lineTo(b.x, y0 + 120); x.lineTo(cx - s1 / 2, y0 + 120); x.lineTo(cx - s1 / 2, y0 + 60); x.lineTo(cx - s2 / 2, y0 + 60)
        x.lineTo(cx - s2 / 2, y0 + 10); x.lineTo(cx - s3 / 2, y0 + 10); x.lineTo(cx - s3 / 2, y0 - 40); x.lineTo(cx + s3 / 2, y0 - 40); x.lineTo(cx + s3 / 2, y0 + 10)
        x.lineTo(cx + s2 / 2, y0 + 10); x.lineTo(cx + s2 / 2, y0 + 60); x.lineTo(cx + s1 / 2, y0 + 60); x.lineTo(cx + s1 / 2, y0 + 120); x.lineTo(b.x + b.w, y0 + 120); x.lineTo(b.x + b.w, BASE)
      } else if (b.top === 'crown') {
        const cx = b.x + b.w / 2
        x.moveTo(b.x, BASE); x.lineTo(b.x, y0 + 90)
        x.quadraticCurveTo(b.x, y0 + 20, cx, y0 + 4); x.quadraticCurveTo(b.x + b.w, y0 + 20, b.x + b.w, y0 + 90)
        x.lineTo(b.x + b.w, BASE)
      } else {
        x.rect(b.x, y0, b.w, b.h)
      }
      x.closePath()
    }
    body()
    const fillC = front ? (b.tint < 0.5 ? 'rgba(32,22,72,0.97)' : 'rgba(26,24,74,0.97)') : 'rgba(30,20,64,0.9)'
    x.fillStyle = fillC; x.fill()
    if (front) { x.globalAlpha = dim; ink(x, b.tint < 0.5 ? VIOLET : '#7f8fe0', { w: 4, fa: 0, glow: 12 }); x.globalAlpha = 1 }
    // roof furniture
    if (front) {
      const cx = b.x + b.w / 2
      x.globalAlpha = dim
      if (b.top === 'spire') { x.beginPath(); x.moveTo(cx, y0 - 40); x.lineTo(cx, y0 - 110); ink(x, BONE, { w: 5, fa: 0, glow: 14 }) }
      if (b.top === 'antenna') { x.beginPath(); x.moveTo(cx + 10, y0); x.lineTo(cx + 10, y0 - 80); ink(x, LAV, { w: 4, fa: 0, glow: 10 }) }
      if (b.top === 'crown') {
        for (let i = 1; i <= 3; i++) { x.beginPath(); x.moveTo(b.x + 10 * i, y0 + 90 + i * 18); x.quadraticCurveTo(cx, y0 + 4 + i * 40, b.x + b.w - 10 * i, y0 + 90 + i * 18); ink(x, GOLD, { w: 3, fa: 0, glow: 10 }) }
        x.beginPath(); x.moveTo(cx, y0 + 4); x.lineTo(cx, y0 - 70); ink(x, BONE, { w: 4, fa: 0, glow: 12 })
      }
      if (b.top === 'tank') {
        // a rooftop water tower (pops in after the building lands)
        const tk = pop01(t, b.t0 + 0.42, 0.4, 2.6)
        if (tk > 0) {
          x.save(); x.translate(b.x + b.w * 0.62, y0); x.scale(tk, tk)
          x.beginPath(); x.moveTo(-18, 0); x.lineTo(-14, -26); x.moveTo(18, 0); x.lineTo(14, -26); ink(x, LAV, { w: 3, fa: 0, glow: 6 })
          x.beginPath(); x.moveTo(-22, -26); x.lineTo(22, -26); x.lineTo(22, -64); x.lineTo(0, -82); x.lineTo(-22, -64); x.closePath()
          ink(x, AMBER, { w: 4, fa: 0.35, glow: 10 })
          x.restore()
        }
      }
      x.globalAlpha = 1
    }
    // windows
    const fl = t > T.drop && t < T.drop + 0.25 ? 1 - (t - T.drop) / 0.25 : 0
    for (const w of b.win) {
      if (w.y < y0 + (b.top === 'spire' ? 130 : b.top === 'crown' ? 100 : 26)) continue
      const isNew = t >= w.fresh
      if (t < w.on && !isNew) continue
      const tw = 0.6 + 0.4 * noise1(t * 0.9 + w.seed, w.seed)
      const kk = clamp((t - w.on) * 8)
      const col = isNew ? PINK : w.col
      const a = (front ? 0.95 : 0.55) * tw * Math.max(kk, isNew ? 1 : 0) * dim + fl * 0.4
      if (isNew) { const nk = pop01(t, w.fresh, 0.3, 3); x.fillStyle = rgba(PINK, 0.35 * nk); x.fillRect(w.x - 10, w.y - 13, 20, 26) }
      x.fillStyle = rgba(col, a)
      x.fillRect(w.x - 6, w.y - 9, 12, 18)
    }
    x.restore()
  }
  function drawSkyline(t, dim) {
    if (dim <= 0.005) return
    x.save(); x.globalAlpha = dim
    // horizon glow
    const g = x.createRadialGradient(540, BASE, 40, 540, BASE, 900)
    g.addColorStop(0, 'rgba(255,110,170,0.38)'); g.addColorStop(0.45, 'rgba(154,123,224,0.16)'); g.addColorStop(1, 'rgba(154,123,224,0)')
    x.fillStyle = g; x.fillRect(0, BASE - 900, W, 900)
    x.restore()
    x.save(); x.globalAlpha = dim * 0.8
    for (const b of SKY.back) building(b, t, false, 1)
    x.restore()
    x.save(); x.globalAlpha = dim
    for (const b of SKY.front) building(b, t, true, 1)
    // the street below fades to dark
    const sg = x.createLinearGradient(0, BASE, 0, H)
    sg.addColorStop(0, 'rgba(14,9,34,0.95)'); sg.addColorStop(1, 'rgba(5,4,12,1)')
    x.fillStyle = sg; x.fillRect(0, BASE, W, H - BASE)
    x.restore()
  }

  // ── the elevated track + the train
  function drawTrack(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const ty = TY + TH + 30
    x.beginPath(); x.moveTo(-20, ty); x.lineTo(W + 20, ty); ink(x, LAV, { w: 6, fa: 0, glow: 12 })
    x.beginPath(); x.moveTo(-20, ty + 46); x.lineTo(W + 20, ty + 46); ink(x, LAV, { w: 4, fa: 0, glow: 8 })
    x.globalAlpha = a * 0.55
    for (let i = -1; i < 14; i++) { const xx = i * 90; x.beginPath(); x.moveTo(xx, ty); x.lineTo(xx + 90, ty + 46); x.moveTo(xx + 90, ty); x.lineTo(xx, ty + 46); ink(x, VIOLET, { w: 3, fa: 0, glow: 0 }) }
    for (const px of [150, 540, 930]) { x.beginPath(); x.moveTo(px - 16, ty + 46); x.lineTo(px - 16, H); x.moveTo(px + 16, ty + 46); x.lineTo(px + 16, H); ink(x, VIOLET, { w: 4, fa: 0, glow: 0 }) }
    x.restore()
  }
  function bust(ctx, cx, by, s, P, sway) {
    ctx.save(); ctx.translate(cx, by); ctx.scale(s, s); ctx.rotate(sway)
    ctx.beginPath(); ctx.moveTo(-52, 0); ctx.quadraticCurveTo(-50, -62, 0, -66); ctx.quadraticCurveTo(50, -62, 52, 0); ctx.closePath()
    ink(ctx, BONE, { w: 5, fa: 0.85, fill: P.body, glow: 6 })
    const hy = -104
    ctx.beginPath(); ctx.arc(0, hy, 30, 0, TAU); ink(ctx, BONE, { w: 5, fa: 1, fill: BONE, glow: 6 })
    ctx.fillStyle = P.body; ctx.strokeStyle = BONE; ctx.lineWidth = 4
    ctx.beginPath()
    if (P.style === 'bun') { ctx.arc(0, hy - 6, 31, Math.PI * 1.05, Math.PI * 1.95); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(0, hy - 44, 15, 0, TAU) }
    else if (P.style === 'beanie') { ctx.moveTo(-33, hy - 4); ctx.quadraticCurveTo(-33, hy - 48, 0, hy - 48); ctx.quadraticCurveTo(33, hy - 48, 33, hy - 4); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(0, hy - 52, 9, 0, TAU) }
    else if (P.style === 'curls') { for (const [dx, dy, rr] of [[-26, -14, 15], [-14, -32, 16], [6, -38, 16], [24, -26, 15], [32, -6, 12], [-32, 2, 11]]) { ctx.moveTo(dx + rr, hy + dy); ctx.arc(dx, hy + dy, rr, 0, TAU) } }
    else if (P.style === 'bob') { ctx.moveTo(-36, hy + 22); ctx.lineTo(-36, hy - 6); ctx.quadraticCurveTo(-34, hy - 40, 0, hy - 40); ctx.quadraticCurveTo(34, hy - 40, 36, hy - 6); ctx.lineTo(36, hy + 22); ctx.lineTo(22, hy + 22); ctx.lineTo(22, hy - 12); ctx.lineTo(-22, hy - 12); ctx.lineTo(-22, hy + 22); ctx.closePath() }
    else { ctx.moveTo(-32, hy - 6); ctx.quadraticCurveTo(-32, hy - 42, 0, hy - 42); ctx.quadraticCurveTo(32, hy - 42, 32, hy - 6); ctx.lineTo(62, hy - 4); ctx.lineTo(62, hy + 4); ctx.lineTo(-32, hy + 2); ctx.closePath() }
    ctx.fill(); ctx.stroke()
    ctx.restore()
  }
  function drawTrain(t) {
    if (t < 2.4 || t > 13.0) return
    const v = speed(t), blur = clamp((v - 900) / 2400) * outK(t, 12.7, 0.2)
    for (let k = 0; k < NCARS; k++) {
      const cx = carX(k, t)
      if (cx > W + 20 || cx + CL < -20) continue
      const rock = 3 * Math.sin(t * 9 + k * 1.7) * (v > 0 ? 1 : 0)
      x.save(); x.translate(cx, TY + rock)
      // body
      x.beginPath(); x.roundRect(0, 0, CL, TH, [46, 46, 18, 18])
      ink(x, '#d8ddff', { w: 6, fa: 0.94, fill: '#262552', glow: 16 })
      // roof line + stripe
      x.beginPath(); x.moveTo(26, 22); x.lineTo(CL - 26, 22); ink(x, rgba(BONE, 0.5), { w: 3, fa: 0, glow: 0 })
      x.fillStyle = PINK; x.shadowColor = PINK; x.shadowBlur = 16; x.fillRect(8, TH - 76, CL - 16, 16); x.shadowBlur = 0
      x.fillStyle = BLUE; x.fillRect(8, TH - 54, CL - 16, 7)
      // windows with the five
      for (let i = 0; i < 5; i++) {
        const wx = 42 + i * 168, wy = 50, ww = 140, wh = 168
        x.save()
        x.beginPath(); x.roundRect(wx, wy, ww, wh, 20)
        const g = x.createLinearGradient(0, wy, 0, wy + wh); g.addColorStop(0, '#ffe7b0'); g.addColorStop(1, '#ff9fc4')
        x.fillStyle = g; x.globalAlpha = 0.9; x.fill(); x.globalAlpha = 1
        x.clip()
        const P = FIVE[i]
        const sway = 0.05 * Math.sin(t * 3.3 + i * 1.3 + k)
        if (blur < 0.98) { x.globalAlpha = 1 - blur * 0.75; bust(x, wx + ww / 2, wy + wh + 6, 1.0, P, sway) }
        if (blur > 0) {   // speed streaks through the window
          x.globalAlpha = blur * 0.7
          for (let s = 0; s < 6; s++) { x.fillStyle = s % 2 ? rgba(P.body, 0.8) : 'rgba(255,240,220,0.7)'; x.fillRect(wx - 10, wy + 20 + s * 24, ww + 20, 6) }
        }
        x.restore()
        x.beginPath(); x.roundRect(wx, wy, ww, wh, 20); ink(x, BONE, { w: 5, fa: 0, glow: 8 })
        // roof numbers 1–5 (once the train is crawling)
        const nk = pop01(t, Math.max(5.7, T.same - 0.6 + (k - K0) * 0.05) + i * 0.07, 0.34, 2.6) * (t < 11.95 ? 1 : outK(t, 11.95, 0.2))
        if (nk > 0 && k >= K0 - 1) chip(x, wx + ww / 2, -40, String(i + 1), nk, { size: 34, col: P.body, edge: P.body })
      }
      // wheels
      for (const wx of [110, 210, CL - 210, CL - 110]) {
        x.save(); x.translate(wx, TH + 6); x.rotate(-Pof(t) / 26)
        x.beginPath(); x.arc(0, 0, 26, 0, TAU); ink(x, LAV, { w: 5, fa: 0.6, fill: '#140e30', glow: 8 })
        x.beginPath(); x.moveTo(-18, 0); x.lineTo(18, 0); ink(x, LAV, { w: 4, fa: 0, glow: 0 })
        x.restore()
      }
      // coupler to the next car
      x.fillStyle = '#9aa2d8'; x.fillRect(CL, TH * 0.55, GAP, 18)
      x.restore()
    }
    // speed lines in front of the train
    if (blur > 0) {
      const r = rng(Math.floor(t * 30))
      x.save(); x.globalAlpha = blur * 0.8
      for (let i = 0; i < 9; i++) { const yy = TY - 40 + r() * (TH + 80), xx = r() * W, ll = 160 + r() * 340; x.fillStyle = i % 3 ? 'rgba(255,240,220,0.7)' : rgba(PINK, 0.8); x.fillRect(xx, yy, ll, 4) }
      x.restore()
    }
  }
  // "AGAIN." stamps over the skyline as each new car of the same five rolls in
  function drawStamps(t) {
    T.stamps.forEach((ts, i) => {
      const nxt = T.stamps[i + 1] ?? 11.9
      if (t < ts || t > nxt + 0.1) return
      const k = easeOutBack(prog(t, ts, ts + 0.22), 3.2), out = outK(t, nxt - 0.12, 0.15)
      const sc = lerp(2.2, 1, ease.outCubic(prog(t, ts, ts + 0.16))) * (0.92 + 0.08 * k)
      x.save(); x.translate(540 + (i % 2 ? 60 : -60), 940 + (i % 2) * 40); x.rotate((i % 2 ? 9 : -8) * D2R); x.scale(sc, sc)
      x.globalAlpha = clamp(prog(t, ts, ts + 0.08)) * out
      x.font = `900 ${i === 3 ? 92 : 112}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const txt = STAMPS[i] || 'AGAIN.'
      const w = x.measureText(txt).width + 70
      x.beginPath(); x.roundRect(-w / 2, -74, w, 148, 22); x.fillStyle = 'rgba(14,9,34,0.82)'; x.fill(); ink(x, PINK, { w: 9, fa: 0, glow: 24 })
      x.shadowColor = PINK; x.shadowBlur = 20; x.fillStyle = PINK; x.fillText(txt, 0, 6); x.shadowBlur = 0
      x.restore()
      sparkle(x, 540, 940, t, ts, { n: 9, R: 300, seed: 40 + i, size: 26, dur: 0.6 })
    })
  }

  // ── the deck → the mystery card → the star
  function drawCardImg(bmp, cx, cy, h, rot, sx = 1, a = 1, glow = 0, glowCol = LAV) {
    if (!bmp || a <= 0 || h <= 0) return
    const w = h * bmp.width / bmp.height
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(sx, 1); x.globalAlpha = a
    if (glow > 0) { x.shadowColor = glowCol; x.shadowBlur = glow } else { x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 30; x.shadowOffsetY = 12 }
    x.drawImage(bmp, -w / 2, -h / 2, w, h)
    x.restore()
  }
  const CARD_GLOW = [BLUE, PINK, GOLD, MINT, LAV]
  function drawDeck(t) {
    if (t < T.deal[0] - 0.5 || t > T.fade[1]) return
    // side cards (deal in, hop on the beat, fly off when the centre card lifts)
    DEAL_ORDER.forEach((ci, k) => {
      if (ci === 2) return
      const F = FAN[ci], td = T.deal[k], t0 = td - 0.42
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, td))
      const off = ease.inCubic(prog(t, T.lift[0] - 0.15, T.lift[0] + 0.45))
      if (off >= 1) return
      const side = ci < 2 ? -1 : 1
      const hopT = (t - BEAT(0)) / 0.5556, ph = hopT - Math.floor(hopT)
      const hop = t > T.never && t < T.lift[0] ? -16 * Math.max(0, Math.sin(Math.PI * Math.min(1, ph / 0.5))) * ((Math.floor(hopT) + ci) % 2) : 0
      const cx = lerp(F.x + 620, F.x, p) + side * 900 * off, cy = lerp(-380, F.y, p) + hop - 200 * off
      const rot = lerp(F.rot + 70, F.rot, p) + side * 40 * off
      const gk = t > T.never ? pop01(t, T.never + k * 0.06, 0.3) : 0
      drawCardImg(backBmp, cx, cy, CARD_H * lerp(0.4, 1, p), rot, 1, 1, gk > 0 ? 34 * clamp(gk) : 0, CARD_GLOW[ci])
      if (Math.abs(t - td) < 0.7) sparkle(x, F.x, F.y, t, td, { n: 7, R: 160, seed: 60 + ci, size: 22, dur: 0.55 })
    })
    // the centre card: dealt last, lifts, flips to the mystery card, then spins into a star
    const td = T.deal[4], t0 = td - 0.42
    if (t < t0) return
    const F = FAN[2]
    const p = ease.outCubic(prog(t, t0, td))
    const lp = ease.inOutCubic(prog(t, ...T.lift))
    const fp = prog(t, ...T.flip)
    const sp = ease.inCubic(prog(t, ...T.toStar))
    let cx = lerp(lerp(F.x + 620, F.x, p), CARD_C.x, lp), cy = lerp(lerp(-380, F.y, p), CARD_C.y, lp)
    let h = lerp(CARD_H * lerp(0.4, 1, p), BIG_H, lp)
    let rot = lerp(F.rot + 70, F.rot, p) * (1 - lp)
    const landK = t > T.land ? Math.exp(-(t - T.land) * 5) * Math.sin((t - T.land) * 18) : 0
    h *= 1 + 0.05 * landK
    // breathe while showing
    if (t > T.land + 0.4) cy += 8 * Math.sin((t - T.land) * 2.2)
    // to the star
    cx = lerp(cx, STAR.x, sp); cy = lerp(cy, STAR.y, sp); h *= 1 - sp; rot += 540 * sp
    if (h < 2) return
    const sx = Math.abs(Math.cos(Math.PI * fp)) * (fp > 0 && fp < 1 ? 1 : 1)
    const showProf = fp >= 0.5
    // aura glow behind the mystery card
    if (showProf && sp < 1) {
      const ak = clamp((t - T.land + 0.2) * 3) * (1 - sp) * outK(t, T.h3Out, 0.4)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, cy, 60, cx, cy, 620)
      g.addColorStop(0, rgba('#c9a6ff', 0.5 * ak)); g.addColorStop(0.5, rgba(PINK, 0.16 * ak)); g.addColorStop(1, rgba(LAV, 0))
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 620, 0, TAU); x.fill()
      x.translate(cx, cy); x.rotate(t * 0.25)
      for (let i = 0; i < 12; i++) {
        x.rotate(TAU / 12)
        const rg = x.createLinearGradient(0, 0, 0, -760); rg.addColorStop(0, rgba(GOLD, 0.14 * ak)); rg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = rg; x.beginPath(); x.moveTo(-16, 0); x.lineTo(-64, -760); x.lineTo(64, -760); x.lineTo(16, 0); x.fill()
      }
      x.restore()
    }
    // glyph ring
    const ringK = ease.outCubic(prog(t, T.ring, T.ring + 0.5)) * outK(t, T.h3Out, 0.35)
    if (ringK > 0) {
      const RR = 488
      x.save(); x.globalAlpha = 0.4 * ringK; x.beginPath(); x.arc(CARD_C.x, CARD_C.y, RR, 0, TAU); ink(x, BONE, { w: 3, fa: 0, glow: 10 }); x.restore()
      x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `bold 64px ${GLYPH_FONT}`
      SIGNS.forEach((s, i) => {
        const k = pop01(t, T.ring + i * 0.045, 0.36) * outK(t, T.h3Out, 0.35)
        if (k <= 0) return
        const a = (i * 30 + 15) * D2R + t * 0.16
        x.save(); x.translate(CARD_C.x + Math.cos(a) * RR, CARD_C.y + Math.sin(a) * RR); x.scale(k, k); x.globalAlpha = clamp(k * 2)
        x.shadowColor = s.color; x.shadowBlur = 22; x.fillStyle = s.color; x.fillText(s.glyph + '︎', 0, 0); x.restore()
      })
      x.restore()
    }
    const gk = t > T.never && !showProf ? 34 * clamp(pop01(t, T.never + 0.24, 0.3)) : showProf ? 40 : 0
    drawCardImg(showProf ? profBmp : backBmp, cx, cy, h, rot, Math.max(0.02, sx), 1, gk, showProf ? LAV : CARD_GLOW[2])
    if (fp > 0.3 && fp < 0.7) { x.save(); x.globalAlpha = 1 - Math.abs(fp - 0.5) * 5; x.globalCompositeOperation = 'lighter'; orb(x, cx, cy, 60, '#fff3e0', 1, 6); x.restore() }
    sparkle(x, cx, cy, t, T.land, { n: 16, R: 420, seed: 77, size: 34, dur: 0.85 })
  }
  function drawStar(t) {
    if (t < T.toStar[1] - 0.15 || t > T.fade[1]) return
    const k = pop01(t, T.toStar[1] - 0.1, 0.45, 2.6) * (1 - ease.inQuad(prog(t, T.fade[0] + 0.3, T.fade[1] - 0.05)))
    if (k <= 0) return
    const pulse = 1 + 0.12 * Math.sin((t - T.toStar[1]) * 6)
    orb(x, STAR.x, STAR.y, 26 * k * pulse, GOLD, 1, 6)
    x.save(); x.globalAlpha = clamp(k)
    drawPixelStar(x, STAR.x, STAR.y, 90 * k * pulse, 0, '#fff3e0')
    x.restore()
    sparkle(x, STAR.x, STAR.y, t, T.toStar[1], { n: 18, R: 380, seed: 91, size: 34, dur: 0.95 })
    // little new stars streak out from it, landing on the new pink windows
    for (let i = 0; i < 8; i++) {
      const t0 = T.newLights[0] + i * 0.12, p = prog(t, t0, t0 + 0.5)
      if (p <= 0 || p >= 1) continue
      const r = rng(200 + i), tx = 80 + r() * 920, ty = 1080 + r() * 380
      const px = lerp(STAR.x, tx, ease.inOutQuad(p)), py = lerp(STAR.y, ty, ease.inOutQuad(p)) - Math.sin(Math.PI * p) * 120
      x.save(); x.globalAlpha = 1 - p * 0.3; drawPixelStar(x, px, py, 24, i % 3, i % 2 ? PINK : GOLD); x.restore()
    }
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const fade = 1 - ease.inOutQuad(prog(t, ...T.fade))
        const dim = (1 - 0.5 * ease.inOutQuad(prog(t, 12.4, 13.6)) - 0.25 * ease.inOutQuad(prog(t, 17.6, 18.6)) + 0.55 * ease.inOutQuad(prog(t, 22.2, 23.2))) * fade
        drawSkyline(t, Math.min(1, dim))
        const trackA = clamp((t - 2.3) * 4) * (1 - ease.inOutQuad(prog(t, 12.4, 13.4)))
        drawTrack(t, trackA)
        drawTrain(t)
        drawStamps(t)
        drawDeck(t)
        drawStar(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      eyebrow.style.opacity = String(ease.outCubic(prog(t, T.eye, T.eye + 0.3)) * (t < T.h0Out ? outK(t, T.h0Out) : t < T.h2 ? clamp((t - T.h1) * 4) * outK(t, T.h1Out) : 0))
      eyebrow.textContent = t < T.h0Out ? 'NEW YORK, NY' : 'NEXT STOP: SAME FIVE'
      eyebrow.style.color = t < T.h0Out ? GOLD : PINK
      H0.update(t, outK(t, T.h0Out))
      H1.update(t, outK(t, T.h1Out)); S1.update(t, outK(t, T.h1Out))
      H2.update(t, outK(t, T.h2Out)); S2.update(t, outK(t, T.h2Out))
      H3.update(t, outK(t, T.h3Out)); S3.update(t, outK(t, T.h3Out))
      H4.update(t, outK(t, T.h4Out, 0.3))
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette; the engine shifts pitched cues into Cm's parent major)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (ts, base = 0, gain = 0.028) => ts.map((s, i) => ['pop', r3(s), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const risePops = (() => {   // the front buildings landing
  const out = []
  ;[...SKY.front].sort((a, b) => a.t0 - b.t0).forEach((b, i) => out.push(['pop', r3(b.t0 + 0.3), NOTE[(i * 2) % 7] / 2, 0.022, ((b.x + b.w / 2) / W - 0.5) * 1.2]))
  return out
})()
const h1t = [T.h1, T.h1 + 0.08, T.h1 + 0.16, BEAT(10), BEAT(10) + 0.08, BEAT(10) + 0.16, T.same - 0.1]
export const CUES = [
  // hook
  ...wordPops(T.h0.slice(0, 4), 0, 0.03),
  ['pluck', r3(T.ny), 1174.66, 0.055, 0.6, 0], ['pop', r3(T.ny), 1318.51, 0.045, 0],
  ...risePops,
  ['glitter', 1.0, 2.6],
  ['riser', r3(T.drop - 0.7), T.drop, 0.05], ['whoosh', r3(T.drop - 0.25), 1.6, 0.07], ['boom', T.drop, 0.11],
  ['whoosh', 4.2, 1.4, 0.04],
  // same five
  ...wordPops(h1t, 1, 0.026),
  ['pluck', r3(T.same), 880, 0.055, 0.6, 0], ['pop', r3(T.same), 1174.66, 0.045, 0],
  ...[0, 1, 2, 3, 4].map(i => ['pop', r3(T.same - 0.6 + i * 0.07 + 0.2), NOTE[i + 1], 0.024, (i - 2) * 0.3]),
  ...T.stamps.map((s, i) => ['tick', s, 0.05]),
  ...T.stamps.map((s, i) => ['pop', s, [987.77, 1174.66, 1318.51, 1479.98][i % 4], 0.05, (i % 2 ? 0.3 : -0.3)]),
  ...wordPops([T.stop, T.stop + 0.1, T.stop + 0.3], 3, 0.024),
  ['pluck', r3(T.stop + 0.4), 1174.66, 0.05, 0.5, 0],
  // deck
  ['riser', 11.6, 12.27, 0.045], ['whoosh', 12.0, 1.0, 0.06],
  ...wordPops([T.h2, T.h2 + 0.1, T.hand], 2, 0.026),
  ['pluck', r3(T.hand + 0.1), 1174.66, 0.055, 0.6, 0], ['pop', r3(T.hand + 0.1), 1318.51, 0.045, 0],
  ...wordPops([T.hand + 0.24, T.night, T.night + 0.1], 4, 0.024),
  ...T.deal.map((s, i) => ['whoosh', r3(s - 0.38), 0.4, 0.03]),
  ...T.deal.map((s, i) => ['pop', r3(s), NOTE[(i * 2 + 1) % 7], 0.04, [-0.5, 0.5, -0.25, 0.25, 0][i]]),
  ...wordPops([T.never, T.never + 0.1], 0, 0.024), ['bell', r3(T.never + 0.24), 1174.66, 0.045, 1.8, 0], ['glitter', r3(T.never + 0.24), r3(T.never + 0.9)],
  // chart first
  ['whoosh', T.lift[0], 0.7, 0.045], ['riser', T.lift[0], T.land, 0.04],
  ...wordPops([T.h3], 1, 0.026), ['pluck', r3(T.h3 + 0.12), 880, 0.055, 0.6, 0],
  ['boom', T.land, 0.1], ['bell', T.land, 880, 0.05, 2.2, -0.2], ['bell', r3(T.land + 0.06), 1174.66, 0.045, 2.2, 0.2], ['glitter', T.land, r3(T.land + 0.8)],
  ...wordPops([BEAT(33), BEAT(33) + 0.1], 3, 0.026),
  ...SIGNS.map((s, i) => ['pop', r3(T.ring + i * 0.045), NOTE[i % 7] * 2, 0.014, Math.cos((i * 30 + 15) * D2R) * 0.5]),
  ...wordPops([T.seen, T.seen + 0.1], 2, 0.024), ['pluck', r3(T.seen + 0.32), 1174.66, 0.05, 0.6, 0],
  // actually new
  ...wordPops([T.h4, T.h4 + 0.12], 0, 0.026),
  ['pluck', T.actually, 1174.66, 0.055, 0.6, 0], ['pop', T.actually, 1318.51, 0.045, 0],
  ['whoosh', T.toStar[0], 1.0, 0.045],
  ['bell', T.toStar[1], 1318.51, 0.05, 2.2, 0], ['bell', r3(T.toStar[1] + 0.08), 1760, 0.035, 2.0, 0.2], ['glitter', T.newLights[0], T.newLights[1]],
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.newLights[0] + 0.5 + i * 0.24), NOTE[(i * 2) % 7] * 2, 0.02, (i % 2 ? 0.4 : -0.4)]),
]
