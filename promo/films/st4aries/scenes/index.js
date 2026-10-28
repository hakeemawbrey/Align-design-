// st4aries (15 s vertical Align ad, Star Talk season 4, EP 022, thread F: Aries × Libra) · story 0–10.6, then the end card.
//   0.00–6.40  "Dear Aries: | Houston *traffic.*"  The ♈ star sits in a little red pixel car, boxed in by a freeway jam
//              (neighbours in every lane, a generic skyline ahead). Its boxing gloves (staries) dangle from the mirror.
//              It honks. Box (♈ ARIES): "we're going to be *LATE.*" (it shakes, wide-eyed)
//              THE STARS: "text them you're running late."  A text goes out: "running late, sorry!" → Libra: "no rush. drive safe!"
//              Aries melts (heart eyes). Ghost cameo (2.6): it rises over the roof of the lavender car in the right lane.
//   6.45       card cut (flip): the jam starts rolling (lane dashes stream), Aries calm.
//   6.55–10.45 THE STARS: "patience is a love *language.*"  Headline: "Patience is | *hot,* too."  Box shuts 9.3; pops out by 10.45.
// One canvas (sky + constellation + road + cars + star), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 22
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const ARIES = signStar('aries'), LIBRA = signStar('libra')
const RED = '#ff6a4a'

// ── the timeline
const T = {
  h0: 0.1, h0Land: 0.55, h0Out: [6.22, 6.4],
  carIn: [0.05, 0.45], honks: [0.7, 1.05, 2.3, 2.55, 2.8],
  open: 0.72, l1: 0.9, l2: 3.4, sent: 4.7, reply: 5.2, close: 9.3,
  ghost: 2.65,
  cut: 6.45, roll: 6.5, l3: 6.6,
  h1: 6.55, h1Land: 7.0, wink: [8.9, 9.3], out: [10.05, 10.45], h1Out: [10.15, 10.4],
}
const AR = '♈ ARIES', SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: AR, color: RED, text: "we're going to be *LATE.*" },
  { t: T.l2, speaker: SPEAK, text: "text them you're *running late.*" },
  { t: T.l3, speaker: SPEAK, text: 'patience is a love *language.*' },
]
const CPS = 30
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, bigIdx = null }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = bigIdx != null ? n === bigIdx : late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (bigIdx != null ? 0 : (n - (nW - late)) * lateGap) : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

const BMP = s => s.trim().split(/\s+/)
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1, flip = false } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot); if (flip) x.scale(-1, 1)
  x.fillStyle = 'rgba(14,8,32,0.9)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}
// Aries's red boxing glove (staries), knuckles down when it hangs
const GLOVE = BMP(`....hhhhhh... ..hhRRRRRRR.. .hRRRRRRRRRR. WWRRRRRRRRRRR WWRRRRRRRRRRR WWRhRRRRRRRRR WWRRhhRRRRRRd WWRRRRhRRRRRd WW.RRRRRRRRd. ....dddddd...`)
const GLOVE_C = { R: '#e8382c', h: '#ff8a6a', d: '#9c1d1d', W: '#f3ead8' }
const HEART = BMP(`.H.H. HWHHH HHHHH .HHH. ..H..`)

// ── layout
const HORIZON = 800
const CAR = { x: 540, g: 1330, s: 1 }               // Aries's car: centre x, ground y
const STAR_P = { x: 495, y: 1052, s: 222 }
const NEIGH = [{ x: 95, g: 1175, s: 0.62, col: '#3fb8a8' }, { x: 985, g: 1175, s: 0.62, col: '#9a7be0' }]
const FAR = [{ x: 250, g: 905, s: 0.26, col: '#e8b04a' }, { x: 430, g: 890, s: 0.22, col: '#6aa0e8' }, { x: 650, g: 890, s: 0.22, col: '#ef6f9a' }, { x: 830, g: 905, s: 0.26, col: '#d8d0c0' }]
const HOPS = [...talkHops(LINES, AR, { cps: CPS }), T.reply + 0.15, T.roll + 0.3, T.h1Land + 0.1, T.h1Land + 1.5]

function ariesState(t) {
  if (t < T.l1) return { mood: 'squint', look: [0, -1], blink: false }
  if (t < LT[0].done + 0.8) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.l2) return { mood: 'squint', look: [-1, 0] }
  if (t < T.sent) return { mood: 'neutral', look: [1, -1] }
  if (t < T.reply) return { mood: 'wide', look: [1, -1] }
  if (t < T.cut) return { mood: 'heart' }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  if (t < T.l3 + 1.2) return { mood: 'sparkle', look: [0, 0] }
  return { mood: 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 38px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "800 40px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear Aries: | Houston *traffic.*', { top: 200, size: 104, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.08, accentColor: RED, lineHeight: 1.02 })
  const H1 = popText(root, 'Patience is | *hot,* too.', { top: 200, size: 124, accentSize: 200, at: T.h1, bigIdx: 2, lateAt: T.h1Land, wobble: true, gap: 0.1, accentColor: RED, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // a generic skyline at the horizon (no landmarks), lit windows twinkling
  const TOWERS = [[150, 70, 120], [230, 55, 190], [300, 80, 150], [400, 60, 240], [470, 70, 300], [560, 52, 260], [630, 76, 210], [720, 58, 280], [800, 70, 170], [880, 60, 210], [950, 80, 120]]
  function skyline(t, a) {
    x.save(); x.globalAlpha = a
    for (const [cx, w, h] of TOWERS) {
      x.fillStyle = '#1a1140'; x.fillRect(cx - w / 2, HORIZON - h, w, h)
      x.fillStyle = 'rgba(201,166,255,0.18)'; x.fillRect(cx - w / 2, HORIZON - h, 4, h)
      for (let j = 14; j < h - 10; j += 22) for (let i = 10; i < w - 10; i += 16) {
        const on = ((cx * 7 + i * 13 + j * 3) % 11) < 4
        if (!on) continue
        x.fillStyle = ((i + j + Math.floor(t * 0.7)) % 5) ? 'rgba(242,199,92,0.55)' : 'rgba(255,240,200,0.85)'
        x.fillRect(cx - w / 2 + i, HORIZON - h + j, 6, 8)
      }
    }
    x.restore()
  }
  // the freeway: a perspective trapezoid with lane dashes (they stream toward us once the jam rolls)
  function road(t) {
    const rolling = t >= T.roll ? (t - T.roll) * ease.inOutQuad(prog(t, T.roll, T.roll + 1.2)) : 0
    x.save()
    x.beginPath(); x.moveTo(380, HORIZON); x.lineTo(700, HORIZON); x.lineTo(1300, 1920); x.lineTo(-220, 1920); x.closePath()
    const g = x.createLinearGradient(0, HORIZON, 0, 1920); g.addColorStop(0, '#231a46'); g.addColorStop(1, '#120c2a'); x.fillStyle = g; x.fill()
    x.strokeStyle = 'rgba(242,199,92,0.55)'; x.lineWidth = 6
    x.beginPath(); x.moveTo(380, HORIZON); x.lineTo(-220, 1920); x.moveTo(700, HORIZON); x.lineTo(1300, 1920); x.stroke()
    for (const lane of [-1, 1]) {
      for (let k = 0; k < 14; k++) {
        const z0 = ((k + rolling * 2.2) % 14) / 14, z1 = z0 + 0.035
        const yy = v => HORIZON + (1920 - HORIZON) * v * v
        const xx = v => 540 + lane * (55 + 330 * v * v)
        x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 2 + 12 * z0 * z0
        x.beginPath(); x.moveTo(xx(z0), yy(z0)); x.lineTo(xx(z1), yy(z1)); x.stroke()
      }
    }
    x.restore()
  }

  // a front-view pixel car: body, windshield, headlights, plate. inside(cx, top) draws the driver before the body covers it.
  function car(cx, g, s, col, { inside = null, honk = 0, plate = '', bounce = 0, lightsOn = 1 } = {}) {
    const w = 600 * s, bh = 190 * s, top = g - bh - 270 * s + bounce
    const wt = 400 * s, wb = 520 * s, wy0 = top + 30 * s, wy1 = g - bh + bounce
    x.save()
    // shadow
    x.fillStyle = 'rgba(6,4,18,0.55)'; x.beginPath(); x.ellipse(cx, g + 6 * s, w * 0.55, 22 * s, 0, 0, Math.PI * 2); x.fill()
    // cabin (roof + pillars)
    x.fillStyle = INK; x.beginPath(); x.moveTo(cx - wt / 2 - 16 * s, top - 8 * s); x.lineTo(cx + wt / 2 + 16 * s, top - 8 * s); x.lineTo(cx + wb / 2 + 26 * s, wy1 + 8 * s); x.lineTo(cx - wb / 2 - 26 * s, wy1 + 8 * s); x.closePath(); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(cx - wt / 2 - 8 * s, top); x.lineTo(cx + wt / 2 + 8 * s, top); x.lineTo(cx + wb / 2 + 18 * s, wy1); x.lineTo(cx - wb / 2 - 18 * s, wy1); x.closePath(); x.fill()
    // windshield glass
    const glass = () => { x.beginPath(); x.moveTo(cx - wt / 2 + 10 * s, wy0); x.lineTo(cx + wt / 2 - 10 * s, wy0); x.lineTo(cx + wb / 2, wy1); x.lineTo(cx - wb / 2, wy1); x.closePath() }
    glass(); const gg = x.createLinearGradient(0, wy0, 0, wy1); gg.addColorStop(0, '#2c2a6a'); gg.addColorStop(1, '#151238'); x.fillStyle = gg; x.fill()
    if (inside) { x.save(); glass(); x.clip(); inside(); x.restore() }
    // glass streaks
    x.save(); glass(); x.clip(); x.fillStyle = 'rgba(255,255,255,0.10)'
    x.beginPath(); x.moveTo(cx - wt / 2 + 40 * s, wy0); x.lineTo(cx - wt / 2 + 90 * s, wy0); x.lineTo(cx - wt / 2 - 10 * s, wy1); x.lineTo(cx - wt / 2 - 60 * s, wy1); x.closePath(); x.fill(); x.restore()
    // body
    const by = g - bh + bounce
    x.fillStyle = INK; x.beginPath(); x.roundRect(cx - w / 2 - 8 * s, by - 8 * s, w + 16 * s, bh + 8 * s, 34 * s); x.fill()
    x.fillStyle = col; x.beginPath(); x.roundRect(cx - w / 2, by, w, bh - 8 * s, 28 * s); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(cx - w / 2 + 30 * s, by + 12 * s, w - 60 * s, 10 * s)
    x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(cx - w / 2 + 10 * s, by + bh - 50 * s, w - 20 * s, 30 * s)
    // grille + plate
    x.fillStyle = '#140c2c'; x.beginPath(); x.roundRect(cx - 120 * s, by + 50 * s, 240 * s, 50 * s, 12 * s); x.fill()
    x.fillStyle = 'rgba(239,230,214,0.35)'; for (let i = -3; i <= 3; i++) x.fillRect(cx + i * 30 * s - 3 * s, by + 58 * s, 6 * s, 34 * s)
    if (plate) {
      x.fillStyle = BONE; x.beginPath(); x.roundRect(cx - 100 * s, by + 112 * s, 200 * s, 52 * s, 8 * s); x.fill()
      x.fillStyle = INK; x.font = `800 ${Math.round(34 * s)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(plate, cx, by + 140 * s)
    }
    // headlights
    for (const sd of [-1, 1]) {
      const hx = cx + sd * (w / 2 - 70 * s), hy = by + 72 * s
      glow(hx, hy, 110 * s, '#ffe9a8', 0.5 * lightsOn)
      x.fillStyle = INK; x.beginPath(); x.arc(hx, hy, 40 * s, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#fff3c4'; x.beginPath(); x.arc(hx, hy, 32 * s, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffffff'; x.fillRect(hx - 16 * s, hy - 16 * s, 10 * s, 10 * s)
    }
    // tyres
    x.fillStyle = INK; x.fillRect(cx - w / 2 + 30 * s, g - 14 * s, 80 * s, 30 * s); x.fillRect(cx + w / 2 - 110 * s, g - 14 * s, 80 * s, 30 * s)
    x.restore()
    // honk lines
    if (honk > 0) {
      x.save(); x.strokeStyle = rgba(BONE, honk); x.lineWidth = 8 * Math.max(0.6, s); x.lineCap = 'round'
      for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) {
        const a = (i - 1) * 0.35, r0 = w / 2 + 30 * s, r1 = r0 + 60 * s * (0.5 + honk * 0.5)
        x.beginPath(); x.moveTo(cx + sd * r0 * Math.cos(a), by + 60 * s + r0 * Math.sin(a) * 0.4); x.lineTo(cx + sd * r1 * Math.cos(a), by + 60 * s + r1 * Math.sin(a) * 0.4); x.stroke()
      }
      x.restore()
    }
    return { top, by, wy0, wy1 }
  }

  const honkAt = t => { let h = 0; for (const t0 of T.honks) { const d = t - t0; if (d > 0 && d < 0.3) h = Math.max(h, 1 - d / 0.3) } return h }

  // the gloves on strings from the rear-view mirror, swinging
  function mirrorGloves(t, cx, wy0, s) {
    const mx = cx + 95 * s, my = wy0 + 18 * s
    x.fillStyle = INK; x.fillRect(mx - 58 * s, my - 22 * s, 116 * s, 44 * s); x.fillRect(mx - 6 * s, wy0 - 8 * s, 12 * s, 20 * s)
    x.fillStyle = '#4a4380'; x.fillRect(mx - 50 * s, my - 15 * s, 100 * s, 30 * s)
    x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(mx - 44 * s, my - 11 * s, 30 * s, 8 * s)
    const jolt = honkAt(t) * 0.25 + (t > T.roll ? 0.12 * Math.sin((t - T.roll) * 2) : 0)
    for (const [k, off] of [[0, -22], [1, 22]]) {
      const ang = 0.22 * Math.sin(t * 2.6 + k * 1.3) + jolt * (k ? -1 : 1)
      const L = 95 * s + k * 20 * s, ax = mx + off * s, ay = my + 18 * s
      const gx2 = ax + Math.sin(ang) * L, gy2 = ay + Math.cos(ang) * L
      x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(ax, ay); x.lineTo(gx2, gy2); x.stroke()
      bits(x, GLOVE, gx2, gy2 + 26 * s, 5.2 * s, GLOVE_C, { rot: Math.PI / 2 + ang * -1, flip: k === 1 })
    }
  }

  // the texts: Aries sends, Libra answers
  function bubble(t, t0, text, right, y, col, fg, tag) {
    const k = pop01(t, t0, 0.34, 2.3) * outK(t, [T.cut - 0.2, T.cut])
    if (k <= 0.01) return
    x.save(); x.font = `700 40px ${INTER}`
    const tw = x.measureText(text).width, bw = tw + 64, bh = 86
    const bx = right ? 1010 - bw : 70
    x.translate(right ? bx + bw : bx, y); x.scale(k, k); x.translate(right ? -bw : 0, 0)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-6, -6, bw + 12, bh + 12, 40); x.fill()
    x.fillStyle = col; x.beginPath(); x.roundRect(0, 0, bw, bh, 34); x.fill()
    x.beginPath(); x.moveTo(right ? bw - 40 : 40, bh - 2); x.lineTo(right ? bw - 6 : 6, bh + 24); x.lineTo(right ? bw - 70 : 70, bh - 2); x.closePath(); x.fill()
    x.fillStyle = fg; x.textBaseline = 'middle'; x.fillText(text, 32, bh / 2 + 2)
    if (tag) { x.font = `700 24px ${MONO}`; x.fillStyle = rgba(BONE, 0.75); x.textAlign = right ? 'right' : 'left'; x.fillText(tag, right ? bw - 10 : 10, -22) }
    x.restore()
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, RED]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7, spread = 300) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.24, life = 1.5
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      bits(x, HEART, cx + side * spread + Math.sin(p * 4 + i) * 16, cy - 60 - p * 200, cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { H: '#ff4f6e', W: '#ffd1de' }, { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        x.save(); x.globalAlpha = clamp(ok)
        skyline(t, 1)
        road(t)
        x.restore()
        const rollK = t >= T.roll ? ease.inOutQuad(prog(t, T.roll, T.roll + 1.2)) : 0
        // far row: tiny cars, creeping on when it rolls
        FAR.forEach((c, i) => car(c.x, c.g + rollK * Math.sin(t * 3 + i) * 2, c.s * ok, c.col, { lightsOn: 0.6, honk: i === 1 ? honkAt(t - 0.4) * 0.6 : 0 }))
        // neighbours (the right one hides the ghost cameo behind its roof)
        let right = null
        NEIGH.forEach((c, i) => {
          const r = car(c.x, c.g, c.s * ok, c.col, { honk: i === 0 ? honkAt(t - 0.15) : 0, bounce: rollK * Math.sin(t * 9 + i) * 2 })
          if (i === 1) right = r
        })
        if (right) drawGhostCameo(x, t, { x: NEIGH[1].x - 30, y: right.top - 4, at: T.ghost, dur: 1.4, from: 'below', cell: 3 })
        // Aries's car pops up from below
        const ck = easeOutBack(prog(t, ...T.carIn), 1.6)
        const g = lerp(2200, CAR.g, ck)
        const h = honkAt(t)
        const shake = (t > T.l1 && t < LT[0].done + 0.5 ? 5 * Math.sin(t * 60) : 0) + h * 4 * Math.sin(t * 90)
        const bounce = rollK * 3 * Math.sin(t * 10) - h * 8
        const st = ariesState(t)
        car(CAR.x + shake, g, CAR.s * ok, '#e0453a', { honk: h, plate: 'GO GO GO', bounce, inside: () => {
          drawStarChar(x, STAR_P.x + shake, g - CAR.g + STAR_P.y + bounce, STAR_P.s * clamp(ok), t, { color: ARIES.color, glyph: ARIES.glyph, ...st, hops: HOPS, seed: 4, glow: 1.1, bob: 4 })
        } })
        const wy0 = g - 190 - 270 + 30 + bounce
        mirrorGloves(t, CAR.x + shake, wy0, CAR.s)
        // the texts
        bubble(t, T.sent, 'running late, sorry!', true, 560, '#3a7bff', '#ffffff', 'SENT')
        bubble(t, T.reply, 'no rush. drive safe!', false, 700, BONE, INK, '♎ LIBRA')
        if (t > T.reply + 0.2 && t < T.cut) floatHearts(t, STAR_P.x, STAR_P.y - 60, T.reply + 0.2, T.cut - 0.4, 2, 6, 220)
        sparkles(t, STAR_P.x, STAR_P.y, T.reply + 0.05, 10, 200, 1)
        if (t > T.h1Land) floatHearts(t, 540, 760, T.h1Land + 0.1, T.out[0] - 0.4, 5, 8, 600)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.25)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 6.45 (the texts clear and the jam starts rolling; "Patience is hot, too." pops just after). Plays.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.08, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['whoosh', T.carIn[0], 0.35, 0.04], ['boom', T.carIn[1], 0.06],
  // honks: two-tone car horn blips
  ...T.honks.flatMap((h, i) => [['pop', h, 349.23, 0.05, i % 2 ? 0.3 : -0.3], ['pop', +(h + 0.02).toFixed(3), 440, 0.04, i % 2 ? 0.3 : -0.3]]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [AR]: 880 } }),
  ['whoosh', T.sent - 0.1, 0.2, 0.03], ['pop', T.sent, 1174.66, 0.045, 0.3],
  ['pop', T.reply, 987.77, 0.045, -0.3], ['pop', T.reply + 0.08, 1318.51, 0.04, -0.3], ['glitter', T.reply + 0.05, T.reply + 0.5],
  ['tick', T.ghost + 0.1, 0.02],
  ['whoosh', T.roll + 0.1, 0.8, 0.025],
  ...wordPops(T.h1, 2, 0.1, 1, 0.026), ['pop', T.h1Land, 1318.51, 0.055, 0], ['pluck', T.h1Land, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
