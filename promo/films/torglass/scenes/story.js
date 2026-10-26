// torglass (30 s vertical) · "A city of glass towers…" condo towers rise over the lake → we push into one glass facade:
// "…everyone in their own box." (every lit window: one silhouette alone with a phone) → "Tonight's deck floats window to
// window." (card backs drift between windows like notes) → two far-apart windows turn gold, two little charts pop out and
// a gold line joins them: "Two windows. One line." / "Align reads both charts before you ever meet." → "Card first. Face
// last." (mystery card; "No peeking through the windows.") → the skyline returns, two people walk out of their towers
// and meet on the lakeshore: "Come out of your box." → plain sky H from 25.45; the shared end card takes over at 25.6.
// One canvas, DOM type above it, grain on top. Pure f(t).
//
// Beat map (108 bpm, B(n) = 0.6 + n·0.5556):
//   0.2 "A city of | glass towers…" (accent on B1) · towers rise B1–B4, the needle-tower silhouette on B2, lake glints
//   3.0–3.6 push into the facade · 3.4 "…everyone in | their own box." (box on B6) · windows light one by one 3.6–5.4
//   B8 5.04 "Swipe. Sigh. Repeat." (repeat on B9)                                                       (all out 7.2)
//   7.3 "Tonight's deck | floats window | to window." · card backs drift window → window 7.6–10.0      (out 10.2)
//   10.3 "Two windows. | One line." · gold windows B17/B18 · charts pop · the gold line draws 10.75–11.5
//   B20 11.71 "Align reads both charts | before you ever meet."                                          (out 14.65)
//   14.35 the facade sinks · 14.8 "Card first. | Face last." · the mystery card drops · 16.3 "No peeking | through the windows."
//   19.85 the skyline rises again · "Come out of | your box." (box on B37) · two people walk out and meet on B40
//   24.7–25.4 everything sinks out → plain H from 25.45
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { W, fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, TYPE, READING, easeOutBack, drawWheelH } from '../../wheel.js'

const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', INK = '#120a2a', GLASS = '#8fd8f6', WARM = '#ffcf7a', COOL = '#a9c8ff', LAV = '#c9a6ff'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const BEAT = n => 0.6 + n * 0.5556
const D2R = Math.PI / 180

export const END = 25.61, CLEAR = 25.45
// ── beats
export const T = {
  h0: 0.2, h0Words: [0.2, 0.28, 0.36, 0.72, 0.88], h0Out: [3.05, 3.25],
  rise: [0.3, BEAT(4)], needle: BEAT(1),
  push: [3.0, 3.65],
  h1: 3.4, h1Last: BEAT(6), litStart: 3.62, litGap: 0.105,
  s0: BEAT(8), s0Last: BEAT(9) + 0.05,
  out1: [7.0, 7.2],
  h2: 7.3, h2Last: BEAT(13), notes: 7.65, out2: [10.0, 10.2],
  h3: 10.3, h3Last: BEAT(19), goldL: BEAT(17) + 0.3, goldR: BEAT(18), dim: [10.15, 10.6], charts: [10.45, BEAT(18) + 0.1], line: [10.75, 11.5],
  s3: BEAT(20), out3: [14.45, 14.65],
  sink: [14.35, 15.0],
  m0: 14.8, card: [15.05, 15.6], s4: 16.3, s4Last: BEAT(29), out4: [19.55, 19.75],
  fin: 19.88, finRise: [19.7, 20.45], finLast: BEAT(37), doors: 20.55, walk: [20.85, BEAT(40)], meet: BEAT(40),
  finOut: [24.95, 25.15], cityOut: [24.7, 25.4],
}

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }

function orb(x, px, py, r, color, a, halo = 3.6) {
  if (a <= 0 || r <= 0.5) return
  x.save()
  x.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = x.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, hr, 0, Math.PI * 2); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.globalAlpha = a
  const s = x.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.4, color); s.addColorStop(1, rgba(color, 0.85))
  x.fillStyle = s; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill()
  x.restore()
}
function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save(); x.imageSmoothingEnabled = false
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, color)
  }
  x.restore()
}

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break */
function popText(parent, text, { top, size, font, weight, accentColor = GOLD, accentSize, gap = 0.07, at: t0, times = null, lastAt = null, wobble = false, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.04, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' ')
  const ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { margin: '0 0.2em', fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    const tw = times ? times[n] : isLast && lastAt != null ? lastAt : t0 + n * gap
    const big = (times && acc) || (isLast && lastAt != null)
    ws.push({ t: tw, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
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
const head = (root, text, t0, opts = {}) => popText(root, text, { top: 200, size: TYPE.headSize, font: INTER, weight: 800, at: t0, ...opts })
const sub = (root, text, t0, opts = {}) => popText(root, text, { top: TYPE.subY, size: TYPE.subSize, font: INTER, weight: 700, at: t0, gap: 0.06, accentSize: 72, ...opts })

function loadImage(src) {
  return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src })
}

// ═══════════════════════════════════════ the wide skyline: slim glass condo towers + a generic needle tower, a lake
const GROUND = 1600
const SKY = (() => {
  const r = rng(731), out = []
  // [x0, w, h, kind, riseOrder]
  const spec = [[-30, 130, 520, 'flat', 2], [90, 105, 760, 'fin', 0], [205, 125, 610, 'slant', 4], [340, 95, 880, 'crown', 1], [445, 120, 540, 'flat', 5],
    [575, 110, 700, 'fin', 3], [690, 130, 820, 'slant', 6], [830, 100, 600, 'crown', 7], [935, 160, 720, 'flat', 8]]
  spec.forEach(([x0, w, h, kind, ord], i) => {
    const wins = []
    for (let yy = 34; yy < h - 24; yy += 30) for (let xx = 12; xx < w - 18; xx += 22) wins.push({ x: xx, y: yy, s: r() * 10, on: r(), tone: r() < 0.7 ? WARM : COOL })
    out.push({ i, x0, w, h, kind, t0: lerp(T.rise[0], T.rise[1] - 0.45, ord / 8), wins, tint: r() < 0.5 ? '#16224a' : '#1a1640' })
  })
  return out
})()
// the two "gold" windows used in the finale (tower index, window index) — a left tower and a right tower
const GOLD_WIN = [{ tw: 1, row: 7, col: 2 }, { tw: 6, row: 9, col: 1 }]
const NEEDLE = { x: 520, h: 1060 }
function towerPath(x, b, top) {
  const L = b.x0, R = b.x0 + b.w
  x.beginPath()
  if (b.kind === 'slant') { x.moveTo(L, GROUND); x.lineTo(L, top + 70); x.lineTo(R, top); x.lineTo(R, GROUND) }
  else if (b.kind === 'crown') { x.moveTo(L, GROUND); x.lineTo(L, top + 40); x.lineTo(L + b.w * 0.18, top + 40); x.lineTo(L + b.w * 0.18, top); x.lineTo(R - b.w * 0.18, top); x.lineTo(R - b.w * 0.18, top + 40); x.lineTo(R, top + 40); x.lineTo(R, GROUND) }
  else { x.moveTo(L, GROUND); x.lineTo(L, top); x.lineTo(R, top); x.lineTo(R, GROUND) }
  x.closePath()
}
function drawNeedle(x, t, k) {
  if (k <= 0) return
  const cx = NEEDLE.x, h = NEEDLE.h * k, top = GROUND - h, pod = top + h * 0.33
  x.save()
  x.fillStyle = '#0e0a24'
  // the tapering shaft
  x.beginPath(); x.moveTo(cx - 46, GROUND); x.lineTo(cx - 14, pod + 40); x.lineTo(cx - 9, top + 60); x.lineTo(cx + 9, top + 60); x.lineTo(cx + 14, pod + 40); x.lineTo(cx + 46, GROUND); x.closePath(); x.fill()
  glowStroke(x, LAV, 4, 12); x.globalAlpha = 0.8; x.stroke(); x.globalAlpha = 1
  // the pod (two stacked rings) + the upper deck
  x.beginPath(); x.ellipse(cx, pod, 62, 22, 0, 0, Math.PI * 2); x.fill(); x.stroke()
  x.beginPath(); x.ellipse(cx, pod - 26, 46, 16, 0, 0, Math.PI * 2); x.fill(); x.stroke()
  x.beginPath(); x.ellipse(cx, top + h * 0.12, 18, 9, 0, 0, Math.PI * 2); x.fill(); x.stroke()
  // the antenna + blinker
  x.beginPath(); x.moveTo(cx, top + 60); x.lineTo(cx, top); x.stroke()
  x.shadowBlur = 0
  const blink = Math.sin(t * 4) > 0.3 ? 1 : 0.25
  x.fillStyle = rgba('#ff5a5a', blink); x.beginPath(); x.arc(cx, top - 4, 7, 0, Math.PI * 2); x.fill()
  for (let i = -2; i <= 2; i++) { x.fillStyle = rgba(WARM, 0.55 + 0.3 * Math.sin(t * 0.8 + i)); x.fillRect(cx + i * 20 - 5, pod - 4, 10, 9) }
  x.restore()
}
/** the wide skyline. rise: per-tower growth from t (hook) or 1 (finale); gold: 0..1 for the two gold windows */
function drawSkyline(x, t, { dy = 0, a = 1, grow = true, gold = 0, lights = 1 }) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a; x.translate(0, dy)
  // the lake (behind nothing; drawn first so towers sit on its shore)
  const lg = x.createLinearGradient(0, GROUND, 0, 1920)
  lg.addColorStop(0, '#0d1638'); lg.addColorStop(1, '#070a1c')
  x.fillStyle = lg; x.fillRect(0, GROUND, W, 420)
  const nk = grow ? ease.outCubic(prog(t, T.needle, T.needle + 0.6)) : 1
  drawNeedle(x, t, nk > 0 ? lerp(0.0, 1, easeOutBack(prog(t, T.needle, T.needle + 0.55), 1.4)) * (grow ? 1 : 1) : 0)
  for (const b of SKY) {
    const g = grow ? easeOutBack(prog(t, b.t0, b.t0 + 0.5), 1.5) : 1
    if (g <= 0) continue
    const h = b.h * g, top = GROUND - h
    towerPath(x, b, top)
    const fg = x.createLinearGradient(b.x0, top, b.x0 + b.w, GROUND)
    fg.addColorStop(0, b.tint); fg.addColorStop(1, '#0b0820')
    x.fillStyle = fg; x.fill()
    x.save(); x.clip()
    // glass sheen: a diagonal band that slowly slides across each tower
    const sh = ((t * 60 + b.i * 140) % 1400) - 300
    x.globalCompositeOperation = 'lighter'
    const sg = x.createLinearGradient(b.x0 + sh - 200, top, b.x0 + sh + 200, top + 400)
    sg.addColorStop(0, 'rgba(143,216,246,0)'); sg.addColorStop(0.5, 'rgba(143,216,246,0.10)'); sg.addColorStop(1, 'rgba(143,216,246,0)')
    x.fillStyle = sg; x.fillRect(b.x0, top, b.w, h)
    x.globalCompositeOperation = 'source-over'
    // windows (a grid; some lit) + floor lines like balconies
    for (const w of b.wins) {
      if (w.y > h - 20) continue
      const fl = 0.6 + 0.4 * Math.sin(t * 0.7 + w.s)
      x.fillStyle = rgba(w.tone, (w.on > 0.55 ? 0.62 : 0.12) * fl * lights)
      x.fillRect(b.x0 + w.x, top + w.y, 12, 16)
    }
    x.strokeStyle = 'rgba(169,200,255,0.14)'; x.lineWidth = 2
    for (let yy = 54; yy < h; yy += 30) { x.beginPath(); x.moveTo(b.x0, top + yy); x.lineTo(b.x0 + b.w, top + yy); x.stroke() }
    x.restore()
    glowStroke(x, GLASS, 4, 12); x.globalAlpha = a * 0.75; towerPath(x, b, top); x.stroke(); x.globalAlpha = a; x.shadowBlur = 0
  }
  // the gold windows (finale)
  if (gold > 0) GOLD_WIN.forEach((gw, i) => {
    const b = SKY[gw.tw], px = b.x0 + 12 + gw.col * 22 - 6, py = GROUND - b.h + 34 + gw.row * 30 - 6
    x.save(); x.globalCompositeOperation = 'lighter'
    const r = 70 * gold, gg = x.createRadialGradient(px + 12, py + 14, 0, px + 12, py + 14, r)
    gg.addColorStop(0, rgba(GOLD, 0.7 * gold)); gg.addColorStop(1, rgba(GOLD, 0))
    x.fillStyle = gg; x.beginPath(); x.arc(px + 12, py + 14, r, 0, Math.PI * 2); x.fill(); x.restore()
    x.fillStyle = rgba('#fff0c0', gold); x.fillRect(px, py, 24, 28)
  })
  // the shoreline promenade + reflections
  glowStroke(x, GLASS, 5, 14); x.beginPath(); x.moveTo(0, GROUND); x.lineTo(W, GROUND); x.stroke(); x.shadowBlur = 0
  x.save(); x.beginPath(); x.rect(0, GROUND + 4, W, 420); x.clip()
  for (const b of SKY) {
    const g = grow ? clamp(prog(t, b.t0, b.t0 + 0.5)) : 1
    if (g <= 0) continue
    for (let k = 0; k < 7; k++) {
      const yy = GROUND + 22 + k * 40, wob = 8 * Math.sin(t * 2.2 + k * 1.3 + b.i)
      x.fillStyle = rgba(k % 2 ? WARM : GLASS, (0.22 - k * 0.025) * g * lights)
      x.fillRect(b.x0 + 14 + wob, yy, b.w - 28 - Math.abs(wob), 7)
    }
  }
  // glints
  for (let i = 0; i < 16; i++) {
    const per = 1.6 + (i % 5) * 0.3, ph = ((t + i * 0.37) % per) / per
    const gx = (i * 151 + 40) % 1040 + 20, gy = GROUND + 40 + ((i * 89) % 260)
    x.fillStyle = rgba(BONE, Math.sin(Math.PI * ph) * 0.55)
    x.fillRect(gx - 16 * Math.sin(Math.PI * ph), gy, 32 * Math.sin(Math.PI * ph), 4)
  }
  x.restore()
  x.restore()
}

// ═══════════════════════════════════════ the facade: two glass condo towers, big windows with a person alone in each
const FAC = { tops: [590, 630], xs: [70, 580], w: 430, winW: 160, winH: 180, rowY: [650, 865, 1080, 1295], colX: [40, 230] }
const PROPS = ['plant', 'lamp', 'none', 'couch', 'plant', 'cat', 'lamp', 'couch']
const WINS = (() => {
  const r = rng(2026), out = []
  for (let tw = 0; tw < 2; tw++) for (let row = 0; row < 4; row++) for (let col = 0; col < 2; col++) {
    const x = FAC.xs[tw] + FAC.colX[col], y = FAC.rowY[row] + (tw ? 30 : 0)
    out.push({ tw, row, col, x, y, cx: x + FAC.winW / 2, cy: y + FAC.winH / 2, tone: r() < 0.62 ? WARM : COOL, prop: PROPS[Math.floor(r() * PROPS.length)],
      sit: r() < 0.45, face: r() < 0.5 ? 1 : -1, ph: r() * 6, px: 0.32 + r() * 0.36 })
  }
  // light-up order: a shuffled sequence
  const order = out.map((_, i) => i).sort((a, b) => (Math.sin(a * 12.9898 + 4.1) * 43758.5) % 1 - (Math.sin(b * 12.9898 + 4.1) * 43758.5) % 1)
  order.forEach((wi, k) => { out[wi].lit = T.litStart + k * T.litGap })
  return out
})()
const WL = WINS.findIndex(w => w.tw === 0 && w.row === 0 && w.col === 0)      // top-left
const WR = WINS.findIndex(w => w.tw === 1 && w.row === 3 && w.col === 1)      // bottom-right
// the notes: card backs drifting window → window
const NOTES = [[2, 13], [9, 4], [15, 1], [6, 11], [12, 7], [3, 14]].map(([a, b], i) => ({ a, b, t0: T.notes + i * 0.36, dur: 1.0, rot: (i % 2 ? 1 : -1) }))

/** a silhouette (INK, thin bone rim) alone with a phone. feet at (0,0) in local coords; s = scale. look 0..1 = looks up from the phone */
function silhouette(x, s, { sit = false, face = 1, look = 0, t = 0, ph = 0, phone = 1, rim = BONE, wave = 0 }) {
  x.save(); x.scale(s * face, s)
  x.fillStyle = INK; x.strokeStyle = INK; x.lineCap = 'round'; x.lineJoin = 'round'
  const hipY = sit ? -44 : -50, shY = hipY - 46, headY = shY - 24
  x.lineWidth = 15
  x.beginPath()
  if (sit) { x.moveTo(-6, hipY); x.lineTo(22, hipY); x.lineTo(24, 0) } else { x.moveTo(-12, 0); x.lineTo(0, hipY); x.lineTo(12, 0) }
  x.moveTo(0, hipY); x.lineTo(0, shY)
  // the phone arm: forearm up to the face (or waving)
  const hx = lerp(18, 34, wave), hy = lerp(shY - 2, shY - 44, wave)
  x.moveTo(0, shY + 4); x.lineTo(lerp(14, 22, wave), shY + 22 - 20 * wave); x.lineTo(hx, hy)
  x.stroke()
  x.beginPath(); x.arc(lerp(4, 0, look), headY + lerp(0, -3, look), 15, 0, Math.PI * 2); x.fill()
  // rim light
  x.globalAlpha *= 0.55; x.strokeStyle = rim; x.lineWidth = 2.5
  x.beginPath(); x.arc(lerp(4, 0, look), headY + lerp(0, -3, look), 16.5, -2.4, 0.2); x.stroke()
  x.globalAlpha /= 0.55
  // the phone: a bright little screen with a cool glow on the face
  if (phone > 0) {
    const jig = 1.2 * Math.sin(t * 9 + ph)
    x.save(); x.translate(hx + 2, hy - 4 + jig); x.rotate(lerp(-0.5, -0.1, look))
    x.globalAlpha *= phone
    x.shadowColor = rgba('#bfe6ff', 0.95); x.shadowBlur = 18
    x.fillStyle = '#d8f0ff'; x.fillRect(-5, -9, 10, 17)
    x.restore()
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha *= 0.35 * phone
    const g = x.createRadialGradient(hx - 6, hy - 6, 0, hx - 6, hy - 6, 38); g.addColorStop(0, '#bfe6ff'); g.addColorStop(1, 'rgba(191,230,255,0)')
    x.fillStyle = g; x.beginPath(); x.arc(hx - 6, hy - 6, 38, 0, Math.PI * 2); x.fill(); x.restore()
  }
  x.restore()
}
function prop(x, kind, s) {
  x.save(); x.scale(s, s); x.fillStyle = INK; x.strokeStyle = INK; x.lineWidth = 6; x.lineCap = 'round'
  if (kind === 'plant') { x.fillRect(-12, -24, 24, 24); for (const a of [-0.7, -0.2, 0.3, 0.8]) { x.beginPath(); x.ellipse(Math.sin(a) * 20, -40 - Math.cos(a) * 10, 7, 18, a, 0, Math.PI * 2); x.fill() } }
  else if (kind === 'lamp') { x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -86); x.stroke(); x.beginPath(); x.moveTo(-18, -84); x.lineTo(18, -84); x.lineTo(10, -106); x.lineTo(-10, -106); x.closePath(); x.fill() }
  else if (kind === 'cat') { x.beginPath(); x.ellipse(0, -14, 20, 14, 0, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(16, -30, 10, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(10, -38); x.lineTo(12, -48); x.lineTo(18, -39); x.moveTo(20, -39); x.lineTo(25, -47); x.lineTo(25, -35); x.fill(); x.beginPath(); x.moveTo(-18, -10); x.quadraticCurveTo(-36, -20, -30, -38); x.stroke() }
  x.restore()
}
/** one facade window. lit 0..1, gold 0..1, dim 0..1 (fade others), look 0..1 */
function drawWindow(x, w, t, { lit, gold, dim, look, flash }) {
  const { x: wx, y: wy } = w, ww = FAC.winW, wh = FAC.winH
  x.save()
  // the glass
  x.fillStyle = '#0c1030'; x.fillRect(wx, wy, ww, wh)
  const L = lit * (1 - 0.72 * dim)
  if (L > 0) {
    const tone = gold > 0 ? GOLD : w.tone
    const g = x.createLinearGradient(wx, wy, wx, wy + wh)
    g.addColorStop(0, rgba(tone, 0.42 * L + 0.3 * gold)); g.addColorStop(1, rgba(tone, 0.78 * L + 0.2 * gold))
    x.fillStyle = g; x.fillRect(wx, wy, ww, wh)
    if (gold > 0 || flash > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const r = 150 + 60 * gold, gg = x.createRadialGradient(w.cx, w.cy, 0, w.cx, w.cy, r)
      const c = gold > 0 ? GOLD : '#ffe7b0', k = Math.max(gold * (0.8 + 0.2 * Math.sin(t * 5)), flash)
      gg.addColorStop(0, rgba(c, 0.55 * k)); gg.addColorStop(1, rgba(c, 0))
      x.fillStyle = gg; x.fillRect(w.cx - r, w.cy - r, r * 2, r * 2); x.restore()
    }
    // inside: floor, prop, the person
    x.save(); x.beginPath(); x.rect(wx, wy, ww, wh); x.clip()
    x.globalAlpha = clamp(L * 1.6 + gold)
    x.fillStyle = rgba(INK, 0.55); x.fillRect(wx, wy + wh - 18, ww, 18)
    const fx = wx + ww * w.px, fy = wy + wh - 16
    if (w.sit) { x.fillStyle = INK; x.beginPath(); x.roundRect(fx - 40, fy - 44, 92, 30, 8); x.fill(); x.fillRect(fx - 40, fy - 70, 18, 56) }
    if (w.prop !== 'none' && w.prop !== 'couch') { x.save(); x.translate(w.px < 0.5 ? wx + ww - 30 : wx + 28, fy); prop(x, w.prop, 0.8); x.restore() }
    x.save(); x.translate(fx, w.sit ? fy - 4 : fy)
    silhouette(x, 0.95, { sit: w.sit, face: w.face, look, t, ph: w.ph, phone: 1 - gold * 0.0, rim: gold > 0 ? '#fff0c0' : BONE })
    x.restore()
    x.restore()
  }
  // mullions + frame
  x.strokeStyle = 'rgba(10,8,28,0.9)'; x.lineWidth = 6
  x.beginPath(); x.moveTo(wx + ww * 0.62, wy); x.lineTo(wx + ww * 0.62, wy + wh); x.stroke()
  glowStroke(x, gold > 0 ? GOLD : GLASS, 4, gold > 0 ? 20 : 10); x.globalAlpha = 0.55 + 0.45 * gold
  x.strokeRect(wx, wy, ww, wh)
  x.shadowBlur = 0; x.globalAlpha = 1
  // glass reflection streak
  x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(143,216,246,0.07)'
  x.beginPath(); x.moveTo(wx + 20, wy); x.lineTo(wx + 60, wy); x.lineTo(wx + 10, wy + wh); x.lineTo(wx - 30 < wx ? wx : wx - 30, wy + wh); x.closePath(); x.fill()
  x.globalCompositeOperation = 'source-over'
  // the balcony: a slab + glass rail
  const by = wy + wh + 6
  x.fillStyle = '#0a0820'; x.fillRect(wx - 14, by, ww + 28, 10)
  x.strokeStyle = 'rgba(169,200,255,0.35)'; x.lineWidth = 2
  x.strokeRect(wx - 12, by - 26, ww + 24, 26)
  x.restore()
}
function drawFacade(x, t, { s = 1, a = 1, dy = 0, gold = [0, 0], dim = 0, looks, flashes }) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  x.translate(540, 1100 + dy); x.scale(s, s); x.translate(-540, -1100)
  for (let tw = 0; tw < 2; tw++) {
    const L = FAC.xs[tw], top = FAC.tops[tw]
    x.beginPath(); x.moveTo(L, 2200); x.lineTo(L, top); x.lineTo(L + FAC.w * (tw ? 0.75 : 1), top); if (tw) x.lineTo(L + FAC.w, top + 50); else x.lineTo(L + FAC.w, top); x.lineTo(L + FAC.w, 2200); x.closePath()
    const g = x.createLinearGradient(L, top, L + FAC.w, 2000); g.addColorStop(0, tw ? '#18183f' : '#14214a'); g.addColorStop(1, '#09071a')
    x.fillStyle = g; x.fill()
    glowStroke(x, GLASS, 5, 14); x.globalAlpha = a * 0.8; x.stroke(); x.globalAlpha = a; x.shadowBlur = 0
    // the lower floors: dim windows, below the sub line
    for (let row = 0; row < 3; row++) for (let col = 0; col < 2; col++) {
      const wx = L + FAC.colX[col], wy = 1510 + (tw ? 30 : 0) + row * 215
      x.fillStyle = '#0c1030'; x.fillRect(wx, wy, FAC.winW, FAC.winH)
      x.fillStyle = rgba(((row + col + tw) % 2) ? WARM : COOL, 0.1 + 0.06 * Math.sin(t + row + col)); x.fillRect(wx, wy, FAC.winW, FAC.winH)
    }
  }
  WINS.forEach((w, i) => {
    const lit = ease.outCubic(prog(t, w.lit, w.lit + 0.18))
    const gk = i === WL ? gold[0] : i === WR ? gold[1] : 0
    drawWindow(x, w, t, { lit, gold: gk, dim: gk > 0 ? 0 : dim, look: looks ? looks[i] : 0, flash: flashes ? flashes[i] : 0 })
  })
  // a soft dark fade at the bottom so the punchline stays readable
  const bg = x.createLinearGradient(0, 1440, 0, 1920); bg.addColorStop(0, 'rgba(5,4,14,0)'); bg.addColorStop(0.35, 'rgba(5,4,14,0.7)'); bg.addColorStop(1, 'rgba(5,4,14,0.9)')
  x.fillStyle = bg; x.fillRect(0, 1440, W, 600)
  x.restore()
}

// ═══════════════════════════════════════ a little chart (the wheel + three planets), drawn at (cx, cy), radius ≈ 380·s
const WC = { cx: 540, cy: 1000, rOut: 380, rIn: 300, rGlyph: 340, alpha: 0.92 }
const sgn = id => SIGNS.find(q => q.id === id)
const CH_L = [{ s: sgn('virgo'), lon: 165, col: GOLD, r: 30 }, { s: sgn('cancer'), lon: 105, col: '#e3ecff', r: 26 }, { s: sgn('scorpio'), lon: 225, col: PINK, r: 24 }]
const CH_R = [{ s: sgn('taurus'), lon: 45, col: GOLD, r: 30 }, { s: sgn('pisces'), lon: 345, col: '#e3ecff', r: 26 }, { s: sgn('capricorn'), lon: 285, col: GLASS, r: 24 }]
function miniChart(x, t, cx, cy, s, rot, a, places) {
  if (s <= 0.01 || a <= 0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.translate(-WC.cx, -WC.cy); x.globalAlpha = a
  x.fillStyle = 'rgba(10,7,26,0.85)'; x.beginPath(); x.arc(WC.cx, WC.cy, WC.rOut + 10, 0, Math.PI * 2); x.fill()
  places.forEach(p => {
    const i = SIGNS.indexOf(p.s), a0 = Math.PI - i * 30 * D2R, a1 = Math.PI - (i * 30 + 30) * D2R
    x.save(); x.globalAlpha = a * 0.6; x.fillStyle = p.s.color
    x.beginPath(); x.arc(WC.cx, WC.cy, WC.rOut, a1, a0); x.arc(WC.cx, WC.cy, WC.rIn, a0, a1, true); x.closePath(); x.fill(); x.restore()
  })
  drawWheelH(x, { k: a, W: WC })
  x.restore()
  places.forEach(p => {
    const ang = Math.PI - p.lon * D2R + rot, rr = 200 * s
    orb(x, cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, p.r * s * 1.6, p.col, a, 3)
  })
}

function card(x, im, cx, cy, w, rot, a, glowCol) {
  if (!im || a <= 0) return
  const h = w * im.height / im.width
  x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.globalAlpha = clamp(a)
  if (glowCol) { x.shadowColor = rgba(glowCol, 0.75); x.shadowBlur = 50 }
  x.drawImage(im, -w / 2, -h / 2, w, h)
  x.shadowBlur = 0; x.drawImage(im, -w / 2, -h / 2, w, h)
  x.restore()
}

/** a walking pictogram (no face) for the finale. feet at (px, py); phase drives the stride; wave raises the far arm */
function walker(x, px, py, s, a, { phase = 0, stride = 1, face = 1, wave = 0, col = BONE }) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a; x.translate(px, py); x.scale(s * face, s)
  glowStroke(x, col, 8, 16)
  const sw = Math.sin(phase) * 0.45 * stride, bob = Math.abs(Math.cos(phase)) * 3 * stride
  x.translate(0, -bob)
  const hip = { x: 0, y: -42 }
  const leg = (ang) => { x.moveTo(hip.x, hip.y); x.lineTo(hip.x + Math.sin(ang) * 22, hip.y + Math.cos(ang) * 22); x.lineTo(hip.x + Math.sin(ang) * 30 + (ang > 0 ? 4 : -2), 0) }
  x.beginPath(); leg(sw); leg(-sw)
  x.moveTo(0, -42); x.lineTo(2, -86)
  // arms: one swings, one waves
  x.moveTo(1, -76); x.lineTo(1 + Math.sin(-sw) * 26, -76 + Math.cos(-sw) * 32)
  const wa = lerp(sw * 0.8, -2.4, wave) + wave * 0.25 * Math.sin(phase * 2)
  x.moveTo(1, -76); x.lineTo(1 + Math.sin(wa) * 30 * (wave ? 1 : 1), -76 + Math.cos(wa) * 34)
  x.stroke()
  x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 16; x.fillStyle = col
  x.beginPath(); x.ellipse(4, -106, 16, 18, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [imBack, imProfile] = await Promise.all(['card-back.png', 'card-profile-3.png'].map(f => loadImage(A + f)))
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type
  const eyebrow = (txt, col = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 40) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: col, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [
    [eyebrow('TORONTO · AFTER DARK', GLASS), 0.1, T.h0Out],
    [eyebrow('A NEW DECK · EVERY NIGHT', GOLD), T.h2, T.out2],
  ]
  const H0 = head(root, 'A city of | *glass towers…*', T.h0, { size: 128, accentSize: 158, accentColor: GLASS, times: T.h0Words, wobble: true })
  const H1 = head(root, '…everyone in | their own *box.*', T.h1, { accentColor: WARM, lastAt: T.h1Last, wobble: true, accentSize: 150 })
  const H2 = head(root, "Tonight's deck | floats *window* | *to window.*", T.h2, { size: 100, accentSize: 122, accentColor: GOLD, times: [T.h2, T.h2 + 0.07, T.h2 + 0.14, T.h2Last, T.h2Last + 0.12, T.h2Last + 0.24], wobble: true })
  const H3 = head(root, 'Two windows. | *One line.*', T.h3, { accentColor: GOLD, times: [T.h3, T.h3 + 0.08, T.h3Last, T.h3Last + 0.12], wobble: true, accentSize: 150 })
  const H4 = head(root, 'Card *first.* | Face last.', T.m0, { accentColor: PINK, accentSize: 128 })
  const H5 = head(root, 'Come out of | your *box.*', T.fin, { times: [T.fin, T.fin + 0.07, T.fin + 0.14, T.fin + 0.21, T.finLast], accentColor: GOLD, accentSize: 170, wobble: true })
  const HEADS = [[H0, T.h0Out], [H1, T.out1], [H2, T.out2], [H3, T.out3], [H4, T.out4], [H5, T.finOut]]
  const S0 = sub(root, 'Swipe. Sigh. *Repeat.*', T.s0, { accentColor: COOL, lastAt: T.s0Last, wobble: true, size: 70, accentSize: 84 })
  const S3 = sub(root, 'Align reads both charts | before you ever *meet.*', T.s3, { accentColor: GOLD })
  const S4 = sub(root, 'No peeking | through the *windows.*', T.s4, { accentColor: PINK, lastAt: T.s4Last, wobble: true, top: 1540, size: 66, accentSize: 82 })
  const SUBS = [[S0, T.out1], [S3, T.out3], [S4, T.out4]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: '0.4', pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(500 + k, n, d)
  const B_WIN = WINS.map((_, i) => B(40 + i, 6, 70))
  const B_NOTE = NOTES.map((_, i) => B(80 + i, 7, 80))
  const B_GOLD = [B(120, 12, 150), B(121, 12, 150)], B_LINE = B(122, 14, 170), B_CARD = B(123, 14, 170), B_MEET = B(124, 16, 220)
  const B_TOWER = SKY.map((_, i) => B(140 + i, 6, 60))

  // ── the notes (card backs drifting between windows)
  const noteAt = (n, t) => {
    const p = prog(t, n.t0, n.t0 + n.dur); if (p <= 0 || p >= 1) return null
    const a = WINS[n.a], b = WINS[n.b], e = ease.inOutQuad(p)
    const cx = lerp(a.cx, b.cx, 0.5) + n.rot * 80, cy = Math.min(a.cy, b.cy) - 220
    const u = e, px = (1 - u) * (1 - u) * a.cx + 2 * (1 - u) * u * cx + u * u * b.cx, py = (1 - u) * (1 - u) * a.cy + 2 * (1 - u) * u * cy + u * u * b.cy
    return { x: px + 14 * Math.sin(t * 6 + n.t0), y: py, rot: n.rot * (12 * Math.sin(t * 5 + n.t0 * 3) + 20 * (1 - p)), p }
  }
  const looksAt = t => WINS.map((_, i) => {
    let k = 0
    for (const n of NOTES) { if (n.b === i) k = Math.max(k, Math.sin(Math.PI * prog(t, n.t0 + n.dur - 0.15, n.t0 + n.dur + 0.9))); if (n.a === i) k = Math.max(k, Math.sin(Math.PI * prog(t, n.t0 - 0.3, n.t0 + 0.5))) }
    if (i === WL) k = Math.max(k, ease.outCubic(prog(t, T.goldL, T.goldL + 0.3)))
    if (i === WR) k = Math.max(k, ease.outCubic(prog(t, T.goldR, T.goldR + 0.3)))
    return k
  })
  const flashesAt = t => WINS.map((_, i) => {
    let k = Math.max(0, 1 - prog(t, WINS[i].lit, WINS[i].lit + 0.5)) * (t >= WINS[i].lit ? 0.9 : 0)
    for (const n of NOTES) if (n.b === i) k = Math.max(k, (t >= n.t0 + n.dur ? 1 : 0) * (1 - prog(t, n.t0 + n.dur, n.t0 + n.dur + 0.6)))
    return k
  })

  return {
    start: 0, end: END, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3.2))
      const cam = t < 3.2 ? { ...SKY_H, zoom: lerp(1.62, SKY_H.zoom, ss), dy: lerp(-40, 0, ss) } : SKY_H
      drawSky(x, t, cam)
      if (t < CLEAR) {
        // ── act 1: the wide skyline (hook) → push into the facade
        const push = ease.inOutCubic(prog(t, ...T.push))
        if (t < T.push[1] + 0.05) {
          x.save(); x.translate(540, 1150); x.scale(lerp(1, 2.8, ease.inCubic(push)), lerp(1, 2.8, ease.inCubic(push))); x.translate(-540, -1150)
          drawSkyline(x, t, { a: 1 - ease.inQuad(push), grow: true })
          x.restore()
          SKY.forEach((b, i) => drawBurst(x, B_TOWER[i], b.x0 + b.w / 2, GROUND - b.h, t, b.t0 + 0.25, i % 2 ? GLASS : GOLD, 0.6))
        }
        // ── act 2/3: the facade
        const facA = clamp(prog(t, T.push[0] + 0.2, T.push[1]))
        if (t > T.push[0] && t < T.sink[1]) {
          const sink = ease.inCubic(prog(t, ...T.sink))
          const gold = [ease.outCubic(prog(t, T.goldL, T.goldL + 0.3)), ease.outCubic(prog(t, T.goldR, T.goldR + 0.3))]
          const dim = ease.inOutCubic(prog(t, ...T.dim))
          drawFacade(x, t, { s: lerp(0.7, 1, ease.outCubic(facA)), a: facA, dy: sink * 1500, gold, dim, looks: looksAt(t), flashes: flashesAt(t) })
          if (sink <= 0) WINS.forEach((w, i) => drawBurst(x, B_WIN[i], w.cx, w.cy, t, w.lit, w.tone, 0.5))
          // the notes
          NOTES.forEach((n, i) => {
            const q = noteAt(n, t); if (!q) { drawBurst(x, B_NOTE[i], WINS[n.b].cx, WINS[n.b].cy, t, n.t0 + n.dur, GOLD, 0.55); return }
            const k = Math.min(1, q.p * 6, (1 - q.p) * 5 + 0.4)
            card(x, imBack, q.x, q.y, 96 * (0.75 + 0.25 * k), q.rot, clamp(k * 1.5), LAV)
          })
          // the two charts + the gold line
          if (t > T.charts[0] - 0.05) {
            const out = 1 - ease.inCubic(prog(t, T.out3[0] - 0.15, T.out3[1]))
            const wl = WINS[WL], wr = WINS[WR]
            const cl = { x: wl.cx + 20, y: wl.cy + 10 + sink * 1500 }, cr = { x: wr.cx - 20, y: wr.cy - 10 + sink * 1500 }
            const kl = pop01(t, T.charts[0], 0.45) * out, kr = pop01(t, T.charts[1], 0.45) * out
            // the line (behind the charts' discs, in front of the facade)
            const lp = ease.inOutCubic(prog(t, ...T.line))
            if (lp > 0 && out > 0) {
              const ctl = { x: 1000, y: 620 }
              x.save(); glowStroke(x, GOLD, 9, 26); x.globalAlpha = out
              x.beginPath()
              const N = 40
              let hx = cl.x, hy = cl.y
              for (let j = 0; j <= N * lp; j++) { const u = j / N; hx = (1 - u) * (1 - u) * cl.x + 2 * (1 - u) * u * ctl.x + u * u * cr.x; hy = (1 - u) * (1 - u) * cl.y + 2 * (1 - u) * u * ctl.y + u * u * cr.y; j ? x.lineTo(hx, hy) : x.moveTo(hx, hy) }
              x.stroke()
              x.globalAlpha = out * 0.5; glowStroke(x, '#fff3d0', 3, 8); x.stroke()
              x.restore()
              if (lp < 1) { x.save(); x.imageSmoothingEnabled = false; drawPixelStar(x, Math.round(hx), Math.round(hy), 30, 0, GOLD); x.restore() }
              // a pulse travelling along the joined line
              if (lp >= 1) {
                const u = ((t - T.line[1]) * 0.55) % 1
                const px = (1 - u) * (1 - u) * cl.x + 2 * (1 - u) * u * ctl.x + u * u * cr.x, py = (1 - u) * (1 - u) * cl.y + 2 * (1 - u) * u * ctl.y + u * u * cr.y
                orb(x, px, py, 9, GOLD, out * 0.9, 4)
              }
            }
            miniChart(x, t, cl.x, cl.y, 0.3 * kl, (t - T.charts[0]) * 0.15 + (1 - clamp(kl)) * -1, clamp(kl * 2), CH_L)
            miniChart(x, t, cr.x, cr.y, 0.3 * kr, -(t - T.charts[1]) * 0.15 + (1 - clamp(kr)) * 1, clamp(kr * 2), CH_R)
            drawBurst(x, B_GOLD[0], cl.x, cl.y, t, T.charts[0], GOLD, 0.7)
            drawBurst(x, B_GOLD[1], cr.x, cr.y, t, T.charts[1], GOLD, 0.7)
            drawBurst(x, B_LINE, cr.x, cr.y, t, T.line[1], GOLD, 0.8)
          }
        }
        // ── act 4: the mystery card
        if (t > T.m0 && t < T.out4[1] + 0.2) {
          const k = outScale(t, T.out4[0] - 0.05, 0.35)
          if (k > 0) {
            const d = prog(t, ...T.card), e = easeOutBack(d, 1.6), s0 = T.card[0]
            const cy = lerp(-560, 1010, e) + 8 * Math.sin((t - s0) * 2.2), rot = lerp(-16, -3, e) + 3 * Math.sin((t - s0) * 1.7)
            x.save(); x.translate(540, cy); x.scale(k, k); x.translate(-540, -cy)
            // a window frame around it: the card sits in a lit window, its blinds half-drawn up
            const fw = 620, fh = 860
            x.save(); x.globalAlpha = clamp(d * 3)
            x.fillStyle = rgba(GOLD, 0.12); x.fillRect(540 - fw / 2, cy - fh / 2 + 10, fw, fh)
            glowStroke(x, GOLD, 6, 22); x.strokeRect(540 - fw / 2, cy - fh / 2 + 10, fw, fh)
            x.shadowBlur = 0; x.fillStyle = '#0a0820'; x.fillRect(540 - fw / 2 - 30, cy + fh / 2 + 10, fw + 60, 18)
            x.restore()
            card(x, imProfile, 540, cy, 500, rot, clamp(d * 4), LAV)
            x.restore()
            drawBurst(x, B_CARD, 540, 1010, t, T.card[1] - 0.15, LAV, 0.8)
          }
        }
        // ── act 5: the skyline again; two people walk out and meet
        if (t > T.finRise[0]) {
          const rise = 1 - ease.outCubic(prog(t, ...T.finRise)), sinkOut = ease.inCubic(prog(t, ...T.cityOut))
          const dy = 1000 * rise + 900 * sinkOut
          const gold = ease.outCubic(prog(t, T.finRise[1] - 0.1, T.finRise[1] + 0.3))
          drawSkyline(x, t, { dy, grow: false, gold, a: 1 })
          // doors light up at the base of the two gold towers, then the two walk toward each other
          const meet = T.meet, wk = ease.inOutQuad(prog(t, ...T.walk))
          GOLD_WIN.forEach((gw, i) => {
            const b = SKY[gw.tw], dx = b.x0 + b.w / 2
            const dk = ease.outCubic(prog(t, T.doors - 0.2, T.doors + 0.2)) * (1 - prog(t, T.walk[0] + 0.6, T.walk[0] + 1.2))
            if (dk > 0) {
              x.save(); x.translate(0, dy); x.fillStyle = rgba('#fff0c0', dk * 0.9); x.shadowColor = rgba(GOLD, 0.9); x.shadowBlur = 30
              x.fillRect(dx - 22, GROUND - 74, 44, 74); x.restore()
            }
            const appear = pop01(t, T.doors + 0.1, 0.4)
            if (appear <= 0) return
            const side = i ? 1 : -1, targetX = 540 + side * 56
            const px = lerp(dx, targetX, wk)
            const walking = t > T.walk[0] && t < T.walk[1]
            const phase = (t - T.walk[0]) * 9
            const wave = ease.outCubic(prog(t, meet - 0.05, meet + 0.35))
            walker(x, px, GROUND + dy, 1.9 * appear, clamp(appear * 2), { phase: walking ? phase : 0, stride: walking ? Math.min(1, wk * 6, (1 - wk) * 6) : 0, face: -side, wave, col: i ? '#ffe7b0' : BONE })
          })
          // they meet: a gold star blooms above them, the lake flares
          const mk = pop01(t, meet, 0.5) * (1 - sinkOut)
          if (mk > 0) {
            const sy = GROUND + dy - 330 + 10 * Math.sin((t - meet) * 2.4)
            x.save(); x.globalCompositeOperation = 'lighter'
            const g = x.createRadialGradient(540, sy, 0, 540, sy, 220 * mk); g.addColorStop(0, rgba(GOLD, 0.5)); g.addColorStop(1, rgba(GOLD, 0))
            x.fillStyle = g; x.beginPath(); x.arc(540, sy, 220 * mk, 0, Math.PI * 2); x.fill(); x.restore()
            x.save(); x.imageSmoothingEnabled = false; drawPixelStar(x, 540, Math.round(sy), Math.round(84 * mk * (0.92 + 0.08 * Math.sin(t * 7))), 0, GOLD); x.restore()
            drawBurst(x, B_MEET, 540, sy, t, meet, GOLD, 0.9)
          }
        }
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.25)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      for (const [p, o] of SUBS) p.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]

// ── sound
const NOTE = [554.37, 659.25, 739.99, 830.61, 880, 1108.73, 1318.51]   // F# minor-ish (the engine re-keys pitched SFX anyway)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: the towers rise
  ...wordPops(T.h0, 3, 0.08, 0),
  ['pluck', T.h0Words[3], 1108.73, 0.05, 0.6, 0], ['pop', T.h0Words[3], 880, 0.05, 0],
  ...SKY.map((b, i) => ['pop', +(b.t0 + 0.25).toFixed(3), NOTE[i % NOTE.length], 0.035, (b.x0 + b.w / 2 - 540) / 600]),
  ['whoosh', T.needle - 0.1, 0.5, 0.035], ['bell', T.needle + 0.2, 739.99, 0.03, 1.6, 0], ['glitter', T.needle + 0.2, T.needle + 0.9],
  // push in + the windows light up
  ['whoosh', T.push[0], 0.7, 0.045], ['riser', T.push[0] - 0.6, T.push[1], 0.03],
  ...wordPops(T.h1, 4, 0.07, 1),
  ['pluck', T.h1Last, 880, 0.055, 0.8, 0], ['pop', T.h1Last, 1108.73, 0.06, 0.2],
  ...WINS.map(w => ['tick', +w.lit.toFixed(3), 0.03]),
  ...WINS.filter((_, i) => i % 3 === 0).map((w, i) => ['pop', +w.lit.toFixed(3), NOTE[(i * 2) % NOTE.length], 0.025, w.tw ? 0.35 : -0.35]),
  ...wordPops(T.s0, 2, 0.12, 2, 0.022), ['pop', T.s0Last, 554.37, 0.05, 0.2], ['pluck', T.s0Last, 659.25, 0.035, 0.4, 0],
  // the notes
  ...wordPops(T.h2, 3, 0.07, 0), ['pluck', T.h2Last, 1108.73, 0.05, 0.6, 0], ['pop', T.h2Last + 0.12, 1318.51, 0.045, 0.2],
  ...NOTES.flatMap((n, i) => [['whoosh', +n.t0.toFixed(3), 0.6, 0.022], ['pop', +(n.t0 + n.dur).toFixed(3), NOTE[(i + 3) % NOTE.length], 0.035, WINS[n.b].tw ? 0.4 : -0.4]]),
  // gold windows + the line
  ...wordPops(T.h3, 2, 0.08, 1),
  ['pop', T.goldL, 880, 0.06, -0.4], ['bell', T.goldL + 0.02, 739.99, 0.03, 1.6, -0.3],
  ['pop', T.goldR, 1108.73, 0.06, 0.4], ['bell', T.goldR + 0.02, 880, 0.03, 1.6, 0.3],
  ['glitter', T.charts[0], T.charts[1] + 0.5],
  ['riser', T.line[0] - 0.2, T.line[1], 0.03], ['boom', T.line[1], 0.07], ['pluck', T.h3Last, 1318.51, 0.05, 0.8, 0], ['pop', T.h3Last + 0.12, 1479.98, 0.05, 0],
  ['glitter', T.line[1], T.line[1] + 1.0],
  ...wordPops(T.s3, 8, 0.06, 1, 0.02),
  ['whoosh', T.sink[0], 0.6, 0.04],
  // the mystery card
  ...wordPops(T.m0, 4, 0.07, 0), ['whoosh', T.card[0], 0.5, 0.035], ['pop', T.card[1] - 0.1, 739.99, 0.06, 0], ['glitter', T.card[1] - 0.1, T.card[1] + 0.6],
  ...wordPops(T.s4, 3, 0.06, 2, 0.022), ['pop', T.s4Last, 1108.73, 0.05, 0.3], ['pluck', T.s4Last, 880, 0.04, 0.5, 0],
  ['whoosh', T.out4[0], 0.5, 0.03],
  // finale
  ['whoosh', T.finRise[0], 0.7, 0.04],
  ...wordPops(T.fin, 4, 0.07, 0),
  ['riser', T.finLast - 0.8, T.finLast, 0.03], ['pluck', T.finLast, 554.37, 0.06, 1.0, 0], ['pop', T.finLast, 1108.73, 0.06, 0],
  ['pop', T.doors, 659.25, 0.04, -0.3], ['pop', T.doors + 0.08, 830.61, 0.04, 0.3],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.walk[0] + 0.1 + i * 0.32).toFixed(3), 0.018]),
  ['bell', T.meet, 880, 0.04, 2.2, 0], ['pop', T.meet, 1318.51, 0.06, 0], ['glitter', T.meet, T.meet + 1.2],
  ['whoosh', T.cityOut[0], 0.7, 0.035],
]
