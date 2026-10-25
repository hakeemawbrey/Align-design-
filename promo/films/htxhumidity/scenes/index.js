// htxhumidity (15 s, vertical) — Houston series. "Houston humidity: 100% hair damage." (the 100% is the joke, not a
// reading): a pictogram head whose hair frizzes up beat by beat, a dripping thermometer, steam off a generic skyline.
// Turn: "On Align, they don't see your face first." The frizzy head becomes a profile photo, an aura veil rises over it,
// the frizz poofs into sparkles and the real veiled mystery card (card-profile-1.png) glows in.
// Last line "Fall for the chart. Not the hair." → shared END CARD at DURATION − ENDCARD_LEN (plain sky H from 10.45).
// One canvas, DOM type above it, grain on top. Pure f(t); no document access at module top level.
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../../../src/lib.js'
import { W, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'

export const DURATION = 15
const END = DURATION - ENDCARD_LEN          // 10.6: from here only the end card
const CLEAR = 10.45                         // everything of ours is gone by here (plain sky H)

const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', FIRE = '#f0603a', HAIR = '#f39a3a', WATER = '#7fd0f0', ROSE = '#e8628a'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const BEAT = n => 0.6 + n * 0.5556   // 108 bpm grid
const r3 = v => +v.toFixed(3)

// ── beats
const POOF = BEAT(3) + 0.28   // half-beat push
const T = {
  hook: [0.3, 0.38, BEAT(0), BEAT(1), BEAT(1) + 0.07],            // Houston · humidity: · 100% · hair · damage.
  head: 0.32, therm: 0.5, city: 0.15,
  bumps: [[BEAT(0), 0.26], [BEAT(1), 0.18], [BEAT(2), 0.2], [POOF, 0.4]],   // frizz steps (the last = Poof.)
  sub0: [1.95, 2.02, POOF],                                       // Step · outside. · Poof.
  hookOut: [4.15, 4.32],
  move: [4.3, 4.95], card: 4.36,
  eye1: 4.45, head1: 4.5, face: BEAT(8),
  veil: [5.86, 6.2], poof: BEAT(10), asset: [6.18, 6.55],
  sub1: [6.25, 6.32, 6.42, 6.5],                     // Chart · first. · Face · last.
  out1: [7.98, 8.1],
  head2: 8.14, not: 8.44, curl: BEAT(15), curlPoof: BEAT(16),
  cardOut: 10.05, out2: [10.27, 10.42],
}

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }
const kick = (t, t0, f = 13, k = 3.4) => t < t0 ? 0 : Math.sin((t - t0) * f) * Math.exp(-(t - t0) * k)

function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, color)
  }
  x.restore()
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  times[i] (optional) sets each word's pop time; words in `big` pop huge with a wobble. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, times = null, big = [], color = BONE, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const ws = []
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0', margin: '0 0.12em' })
    ws.push({ t: times ? times[n] : t0 + n * gap, big: big.includes(n), e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.25 + 0.75 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── frizz: how puffed-up the hair is (0 = neat, ~1 = full Houston), plus a squash "boing" on each step
const frizzAt = t => T.bumps.reduce((s, [b, d]) => s + d * easeOutBack(prog(t, b, b + 0.3), 3), 0)
const boingAt = t => T.bumps.reduce((s, [b, d]) => s + d * 1.4 * kick(t, b, 16, 4.5), 0)

const HAIR_CIRC = (() => { const r = rng(7); return Array.from({ length: 13 }, () => ({ j: r(), ph: r() * 6, s: 0.85 + r() * 0.3 })) })()
const STRANDS = (() => { const r = rng(17); return Array.from({ length: 18 }, () => ({ j: r(), ph: r() * 6, len: 0.7 + r() * 0.6, dir: r() < 0.5 ? -1 : 1 })) })()
// strand tips (head-local units of R) for the sparkle poof
function strandTip(i, f, R) {
  const u = (i + 0.5) / STRANDS.length, spread = lerp(-0.2, 0.48, clamp(f))
  const a = -Math.PI - spread + u * (Math.PI + 2 * spread)
  const d = R * (0.78 + 0.62 * f) + R * (0.42 + 0.62 * f) * 0.9 + R * (0.2 + 0.75 * f) * STRANDS[i].len
  return { x: Math.cos(a) * d, y: Math.sin(a) * d - R * 0.28 * f }
}

/** the pictogram: bust + faceless head + hair cloud and curly strands. sc scales from R = 112 */
function drawPerson(x, cx, cy, sc, f, t, a = 1, { hair = 1, bust = 1 } = {}) {
  if (a <= 0 || sc <= 0) return
  const R = 112
  x.save(); x.translate(cx, cy); x.scale(sc, sc); x.globalAlpha = a
  // bust (top half of an ellipse)
  if (bust > 0) {
    x.save(); x.beginPath(); x.rect(-400, R * 1.1, 800, R * 1.65); x.clip()
    x.beginPath(); x.ellipse(0, R * 2.75, R * 1.75, R * 1.5, 0, 0, Math.PI * 2)
    x.fillStyle = '#2a2050'; x.fill()
    x.fillStyle = rgba(BONE, 0.16); x.fill()
    glowStroke(x, BONE, 8, 18); x.stroke()
    x.restore()
  }
  // hair
  const fh = f * hair
  if (hair > 0) {
    const b = boingAt(t)
    x.save(); x.translate(0, -R * 0.28 * fh); x.scale(1 + 0.16 * b, 1 - 0.12 * b)
    const spread = lerp(-0.2, 0.48, clamp(fh))
    const N = HAIR_CIRC.length
    const circ = HAIR_CIRC.map((c, i) => {
      const u = i / (N - 1), an = -Math.PI - spread + u * (Math.PI + 2 * spread)
      const wob = 1 + 0.06 * fh * Math.sin(t * 5 + c.ph)
      const d = R * (0.74 + 0.66 * fh) * wob, rr = R * (0.36 + 0.66 * fh) * c.s * wob
      return { x: Math.cos(an) * d, y: Math.sin(an) * d - R * 0.06, r: Math.max(4, rr) }
    })
    // curly strands sticking out
    if (fh > 0.04) {
      STRANDS.forEach((s, i) => {
        const u = (i + 0.5) / STRANDS.length, an = -Math.PI - spread + u * (Math.PI + 2 * spread)
        const base = R * (0.78 + 0.62 * fh) + R * (0.42 + 0.62 * fh) * 0.85
        const L = R * (0.2 + 0.75 * fh) * s.len * (1 + 0.18 * Math.sin(t * 9 + s.ph) * fh)
        const amp = (8 + 22 * fh) * s.dir
        x.beginPath()
        for (let k = 0; k <= 22; k++) {
          const q = k / 22, d = base + L * q
          const w = Math.sin(q * Math.PI * (2.5 + 2 * fh) + t * 4 + s.ph) * amp * q
          const px = Math.cos(an) * d - Math.sin(an) * w, py = Math.sin(an) * d + Math.cos(an) * w
          k ? x.lineTo(px, py) : x.moveTo(px, py)
        }
        glowStroke(x, HAIR, 7, 14); x.stroke()
      })
    }
    // the cloud: glow outline (thick strokes), then an opaque flat fill on top
    x.beginPath(); for (const c of circ) { x.moveTo(c.x + c.r, c.y); x.arc(c.x, c.y, c.r, 0, Math.PI * 2) }
    glowStroke(x, HAIR, 16, 22); x.stroke()
    x.shadowBlur = 0; x.fillStyle = '#5b3434'; x.fill()
    // little curl marks inside the cloud
    x.globalAlpha = a * clamp(fh * 2) * 0.8
    circ.forEach((c, i) => { if (i % 2) return; glowStroke(x, HAIR, 5, 0); x.beginPath(); x.arc(c.x * 1.04, c.y * 1.04, c.r * 0.35, 0.3 + i, 0.3 + i + 3.6); x.stroke() })
    x.globalAlpha = a
    x.restore()
  }
  // head (faceless)
  x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2)
  x.fillStyle = '#2a2050'; x.fill(); x.fillStyle = rgba(BONE, 0.2); x.fill()
  glowStroke(x, BONE, 8, 18); x.stroke()
  x.restore()
}

/** a water drop (teardrop) */
function drop(x, px, py, r, color, a) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a; x.translate(px, py)
  x.beginPath(); x.moveTo(0, -r * 1.9); x.bezierCurveTo(r * 0.5, -r * 0.9, r, -r * 0.3, r, r * 0.15); x.arc(0, r * 0.15, r, 0, Math.PI); x.bezierCurveTo(-r, -r * 0.3, -r * 0.5, -r * 0.9, 0, -r * 1.9)
  x.fillStyle = rgba(color, 0.4); x.fill(); glowStroke(x, color, 5, 14); x.stroke()
  x.shadowBlur = 0; x.fillStyle = 'rgba(255,255,255,0.8)'; x.beginPath(); x.arc(-r * 0.35, -r * 0.1, r * 0.2, 0, Math.PI * 2); x.fill()
  x.restore()
}

// ── generic skyline (no real buildings, no brands)
const CITY = (() => {
  const r = rng(23), out = []
  let px = -20
  while (px < 1100) { const w = 60 + r() * 70; out.push({ x: px, w, h: 70 + r() * 150, top: Math.floor(r() * 3), win: r() }); px += w + 6 + r() * 10 }
  return out
})()
function drawCity(x, t, k) {
  if (k <= 0) return
  const base = 1920, rise = (1 - k) * 260
  x.save(); x.translate(0, rise)
  x.beginPath()
  for (const b of CITY) {
    const top = base - b.h
    if (b.top === 0) x.rect(b.x, top, b.w, b.h)
    else if (b.top === 1) { x.moveTo(b.x, base); x.lineTo(b.x, top + 26); x.lineTo(b.x + b.w / 2, top - 22); x.lineTo(b.x + b.w, top + 26); x.lineTo(b.x + b.w, base) }
    else { x.rect(b.x, top + 30, b.w, b.h - 30); x.rect(b.x + b.w * 0.2, top, b.w * 0.6, 32) }
  }
  x.fillStyle = '#120c2a'; x.fill()
  glowStroke(x, BONE, 4, 12); x.globalAlpha = 0.5; x.stroke(); x.globalAlpha = 1; x.shadowBlur = 0
  // a few lit windows
  const r = rng(4)
  for (const b of CITY) for (let wy = base - b.h + 50; wy < base - 20; wy += 34) for (let wx = b.x + 14; wx < b.x + b.w - 14; wx += 22) {
    if (r() < 0.72) continue
    x.fillStyle = rgba(GOLD, 0.45 + 0.25 * noise1(t * 0.7 + wx * 0.01, wy)); x.fillRect(wx, wy, 8, 12)
  }
  x.restore()
}

// steam wisps rising off the city
const WISPS = [90, 260, 420, 600, 760, 930, 1010].map((wx, i) => ({ x: wx, ph: i * 0.37, per: 2.1 + (i % 3) * 0.3 }))
function drawSteam(x, t, k) {
  if (k <= 0) return
  x.save(); x.lineCap = 'round'; x.shadowColor = 'rgba(255,240,220,0.6)'; x.shadowBlur = 18
  for (const w of WISPS) for (let c = 0; c < 2; c++) {
    const p = ((t + w.ph * w.per + c * w.per / 2) / w.per) % 1
    const y0 = 1830 - p * 560, a = Math.sin(Math.PI * p) * 0.5 * k
    if (a <= 0.01) continue
    x.globalAlpha = a; x.strokeStyle = BONE; x.lineWidth = 12 - 6 * p
    x.beginPath()
    for (let q = 0; q <= 14; q++) { const yy = y0 - q * 12, xx = w.x + Math.sin(q * 0.55 + t * 3 + w.ph * 5) * (14 + 16 * p); q ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
    x.stroke()
  }
  x.restore()
}

// ── the thermometer, overflowing
const TH = { x: 118, y0: 800, y1: 1250, w: 50, bulb: 50 }
function drawThermo(x, t, k) {
  if (k <= 0) return
  const { x: cx, y0, y1, w, bulb } = TH
  const lvl = lerp(0.12, 1, ease.inOutCubic(prog(t, T.therm + 0.1, POOF))) + 0.04 * Math.sin(t * 7) * prog(t, BEAT(2), POOF)
  const shake = 4 * kick(t, POOF, 30, 4)
  x.save(); x.translate(cx + shake, (y0 + y1) / 2); x.scale(k, k); x.translate(-cx, -(y0 + y1) / 2)
  // glass
  const glass = () => { x.beginPath(); x.roundRect(cx - w / 2, y0, w, y1 - y0 + 10, w / 2); x.moveTo(cx + bulb, y1 + bulb * 0.9); x.arc(cx, y1 + bulb * 0.9, bulb, 0, Math.PI * 2) }
  glass(); x.fillStyle = 'rgba(16,12,36,0.85)'; x.fill()
  // mercury
  const top = lerp(y1, y0 + 14, clamp(lvl))
  x.save(); x.shadowColor = rgba(FIRE, 0.9); x.shadowBlur = 24; x.fillStyle = FIRE
  x.beginPath(); x.arc(cx, y1 + bulb * 0.9, bulb - 12, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.roundRect(cx - w / 2 + 11, top, w - 22, y1 + bulb - top, 14); x.fill()
  x.restore()
  glass(); glowStroke(x, BONE, 7, 16); x.stroke()
  // ticks
  x.shadowBlur = 0; x.lineWidth = 4; x.strokeStyle = rgba(BONE, 0.7)
  for (let i = 0; i < 7; i++) { const yy = lerp(y0 + 40, y1 - 30, i / 6); x.beginPath(); x.moveTo(cx + w / 2 + 10, yy); x.lineTo(cx + w / 2 + (i % 2 ? 24 : 36), yy); x.stroke() }
  x.restore()
  // overflow: drops bubble out of the top and drip down
  const t0 = POOF - 0.25
  if (t > t0) for (let i = 0; i < 10; i++) {
    const st = t0 + i * 0.32, dt = t - st
    if (dt < 0 || dt > 1.1) continue
    const side = i % 2 ? 1 : -1
    const px = cx + side * (18 + 34 * Math.min(1, dt * 3)), py = y0 - 18 + 900 * dt * dt * (dt > 0.18 ? 1 : 0) - 26 * Math.sin(Math.min(1, dt * 5) * Math.PI)
    drop(x, px, py, 13 * k, FIRE, k * (1 - prog(dt, 0.75, 1.1)))
  }
}

// sweat drops flying off the head on each frizz step
const SWEAT = T.bumps.slice(1).flatMap(([b], i) => [{ t0: b, vx: -330 - i * 40, vy: -520 }, { t0: b + 0.05, vx: 340 + i * 30, vy: -480 }])

async function loadCard() {
  const im = await new Promise(r => { const i = new Image(); i.decoding = 'sync'; i.onload = () => r(i); i.onerror = () => r(null); i.src = '/promo/assets/card-profile-1.png' })
  if (!im) return null
  // pre-scale (two steps for quality) to ~1.1× display size
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'; return [c, x] }
  const [c1, x1] = mk(748, 1119); x1.drawImage(im, 0, 0, 748, 1119)
  const [c2, x2] = mk(690, 1032); x2.drawImage(c1, 0, 0, 690, 1032)
  return c2
}
// card geometry (card-profile-*.png: 1496×2238, body [120,114,1374,2116] r84, photo window ≈ [208,332,1288,932])
const CARD = { cx: 540, cy: 1085, h: 860 }
const CS = CARD.h / 2238, CW = 1496 * CS
const cardPt = (px, py) => ({ x: CARD.cx + (px - 748) * CS, y: CARD.cy + (py - 1119) * CS })
const WIN = (() => { const a = cardPt(208, 332), b = cardPt(1288, 932); return { x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y, r: 40 * CS } })()
const HEAD_IN = { x: 540, y: WIN.y + WIN.h * 0.42, sc: 0.42 }
const HEAD_HOOK = { x: 560, y: 1150, sc: 1 }

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "italic 500 200px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const cardImg = await loadCard()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const eyebrow = txt => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('FORECAST: STICKY'), 0.2, T.hookOut], [eyebrow('GOOD NEWS'), T.eye1, T.out1]]
  const H0 = popText(root, 'Houston | humidity: | *100%* | hair damage.', { top: 205, size: 104, accentColor: FIRE, accentSize: 210, times: T.hook, big: [2], lineHeight: 0.98 })
  const S0 = popText(root, 'Step outside. *Poof.*', { top: 1590, size: TYPE.subSize, weight: 700, accentSize: 84, accentColor: HAIR, times: T.sub0, big: [2] })
  const H1 = popText(root, "On Align, they | don't see your | *face* first.", { top: 215, size: 104, accentColor: PINK, accentSize: 124, times: [0, 1, 2, 3, 4, 5].map(i => T.head1 + i * 0.07).concat([T.face, T.face + 0.1]), big: [6] })
  const S1 = popText(root, 'Chart first. *Face* *last.*', { top: 1580, size: TYPE.subSize, weight: 700, accentSize: 72, accentColor: GOLD, times: T.sub1 })
  const H2 = popText(root, 'Fall for | the chart. | *Not* *the* *hair.*', { top: 205, size: 112, accentColor: HAIR, accentSize: 134, times: [0, 1, 2, 3].map(i => T.head2 + i * 0.07).concat([T.not, T.not + 0.09, T.not + 0.2]), big: [6] })
  const TEXTS = [[H0, T.hookOut], [S0, T.hookOut], [H1, T.out1], [S1, T.out1], [H2, T.out2]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(300 + k, n, d)
  const B_HEAD = B(1, 10, 150), B_POOF = B(2, 12, 220), B_STEP = T.bumps.map((_, i) => B(10 + i, 8, 120))
  const B_STRAND = STRANDS.map((_, i) => B(30 + i, 5, 70)), B_CARD = B(5, 12, 260), B_CURL = B(6, 8, 90)

  // ── hook: steam, city, thermometer, the frizzing head
  function drawHook(t) {
    if (t > T.hookOut[1] + 0.7) return
    const out = outK(t, T.hookOut)
    // humid haze: a warm wash rising from the bottom
    const hz = clamp(prog(t, 0.2, 1.4)) * out
    if (hz > 0) {
      const g = x.createLinearGradient(0, 1920, 0, 700)
      g.addColorStop(0, `rgba(240,110,60,${0.24 * hz})`); g.addColorStop(0.5, `rgba(240,140,80,${0.08 * hz})`); g.addColorStop(1, 'rgba(240,140,80,0)')
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    }
    drawSteam(x, t, clamp(prog(t, 0.6, 1.4)) * out)
    drawCity(x, t, ease.outCubic(prog(t, T.city, T.city + 0.7)) * outK(t, [T.hookOut[0], T.hookOut[1] + 0.2]))
    drawThermo(x, t, pop01(t, T.therm, 0.42) * outScale(t, T.hookOut[0]))
    // sweat drops
    for (const s of SWEAT) {
      const dt = t - s.t0
      if (dt < 0 || dt > 0.9) continue
      drop(x, HEAD_HOOK.x + s.vx * dt * 0.9 + Math.sign(s.vx) * 120, HEAD_HOOK.y - 40 + s.vy * dt + 1400 * dt * dt, 15, WATER, 1 - prog(dt, 0.6, 0.9))
    }
    T.bumps.forEach(([b], i) => i > 0 && drawBurst(x, B_STEP[i], HEAD_HOOK.x, HEAD_HOOK.y - 210 - 30 * i, t, b, i === T.bumps.length - 1 ? HAIR : GOLD, 0.6))
  }

  // ── the person: big in the hook, then shrinks into the profile photo; frizz poofs at the veil
  function drawHead(t) {
    if (t < T.head || t > T.asset[1]) return
    const pk = pop01(t, T.head, 0.45)
    const m = ease.inOutCubic(prog(t, ...T.move))
    const px = lerp(HEAD_HOOK.x, HEAD_IN.x, m), py = lerp(HEAD_HOOK.y, HEAD_IN.y, m), sc = lerp(HEAD_HOOK.sc, HEAD_IN.sc, m) * pk
    const f = frizzAt(t) * (1 - ease.inCubic(prog(t, T.poof - 0.08, T.poof + 0.12)))
    drawPerson(x, px, py, sc, f, t, clamp(pk * 2))
    if (t < 1.2) drawBurst(x, B_HEAD, px, py, t, T.head, BONE, 0.6)
  }

  // ── the card: a plain profile card with the frizz photo → aura veil rises → the real mystery card
  function cardFrame(t) {
    const k = pop01(t, T.card, 0.5)
    const o = outScale(t, T.cardOut, 0.34)
    return { k: k * o, bob: t > T.asset[1] ? 10 * Math.sin((t - T.asset[1]) * 2.2) : 0 }
  }
  function drawCardBack(t) {   // under the head
    if (t < T.card || t > T.asset[1] + 0.05) return
    const { k } = cardFrame(t)
    if (k <= 0) return
    x.save(); x.translate(CARD.cx, CARD.cy); x.rotate(lerp(-14, 0, clamp(k)) * Math.PI / 180); x.scale(k, k); x.translate(-CARD.cx, -CARD.cy)
    x.globalAlpha = clamp(k * 2)
    const bl = cardPt(120, 114), br = cardPt(1374, 2116)
    x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
    x.fillStyle = '#17102e'; x.beginPath(); x.roundRect(bl.x, bl.y, br.x - bl.x, br.y - bl.y, 84 * CS); x.fill(); x.shadowOffsetY = 0
    glowStroke(x, BONE, 6, 18); x.stroke()
    // "photo": a sunny, sticky outdoor selfie
    const g = x.createLinearGradient(0, WIN.y, 0, WIN.y + WIN.h)
    g.addColorStop(0, '#f6b860'); g.addColorStop(1, '#e8705a')
    x.shadowBlur = 0; x.fillStyle = g; x.beginPath(); x.roundRect(WIN.x, WIN.y, WIN.w, WIN.h, WIN.r); x.fill()
    // a hot sun in the photo corner
    x.fillStyle = 'rgba(255,240,200,0.85)'; x.beginPath(); x.arc(WIN.x + WIN.w - 60, WIN.y + 55, 30, 0, Math.PI * 2); x.fill()
    // placeholder profile lines
    x.fillStyle = rgba(BONE, 0.5)
    const rows = [[0.62, 0.42], [0.69, 0.7], [0.74, 0.6], [0.81, 0.66], [0.86, 0.5]]
    rows.forEach(([v, wv], i) => { const p = cardPt(208, 2238 * v); x.globalAlpha = clamp(k * 2) * (i ? 0.5 : 0.9); x.beginPath(); x.roundRect(p.x, p.y, (WIN.w) * wv, i ? 16 : 30, 8); x.fill() })
    x.restore()
  }
  function drawCardFront(t) { // over the head: the veil, then the real asset
    if (t < T.veil[0]) return
    const { k, bob } = cardFrame(t)
    if (k <= 0) return
    // veil rising over the photo window (clipped)
    if (t < T.asset[1] + 0.05) {
      const v = ease.inOutCubic(prog(t, ...T.veil))
      x.save(); x.beginPath(); x.roundRect(WIN.x, WIN.y, WIN.w, WIN.h, WIN.r); x.clip()
      const top = WIN.y + WIN.h * (1 - v) - 40
      const g = x.createRadialGradient(540, WIN.y + WIN.h * 0.6, 10, 540, WIN.y + WIN.h * 0.6, WIN.w * 0.6)
      g.addColorStop(0, '#ffc0a8'); g.addColorStop(0.45, '#f0609a'); g.addColorStop(1, '#a8307a')
      x.fillStyle = g; x.beginPath(); x.moveTo(WIN.x, WIN.y + WIN.h)
      for (let i = 0; i <= 20; i++) x.lineTo(WIN.x + WIN.w * i / 20, top + 18 * Math.sin(i * 1.3 + t * 8))
      x.lineTo(WIN.x + WIN.w, WIN.y + WIN.h); x.fill()
      x.restore()
    }
    // the real card glows in
    const ak = ease.outCubic(prog(t, ...T.asset))
    if (ak > 0) {
      const glow = 0.5 + 0.12 * Math.sin(t * 3)
      x.save(); x.translate(CARD.cx, CARD.cy + bob); x.scale(k * (1 + 0.04 * kick(t, T.asset[0], 14, 4)), k * (1 + 0.04 * kick(t, T.asset[0], 14, 4)))
      x.globalCompositeOperation = 'lighter'
      const hg = x.createRadialGradient(0, 0, 100, 0, 0, 560)
      hg.addColorStop(0, rgba(PINK, 0.32 * glow * ak)); hg.addColorStop(1, rgba(PINK, 0))
      x.fillStyle = hg; x.fillRect(-600, -640, 1200, 1280)
      x.globalCompositeOperation = 'source-over'; x.globalAlpha = ak
      if (cardImg) x.drawImage(cardImg, -CW / 2, -CARD.h / 2, CW, CARD.h)
      x.restore()
    }
    // pixel stars orbiting the card once it's real
    const ok = ak * clamp(k)
    if (ok > 0.02) for (let i = 0; i < 7; i++) {
      const an = (t - T.asset[0]) * 0.9 + i * Math.PI * 2 / 7, tw = 0.55 + 0.45 * Math.sin(t * 5 + i * 2)
      x.save(); x.globalAlpha = ok * tw
      drawPixelStar(x, Math.round(CARD.cx + Math.cos(an) * 360 * k), Math.round(CARD.cy + bob + Math.sin(an) * 500 * k), i % 2 ? 14 : 21, i % 4, [GOLD, PINK, BONE][i % 3])
      x.restore()
    }
    // the poof: strands burst into sparkles
    const fPre = frizzAt(T.poof - 0.1)
    STRANDS.forEach((_, i) => { if (i % 2) return; const tip = strandTip(i, fPre, 112 * HEAD_IN.sc); drawBurst(x, B_STRAND[i], HEAD_IN.x + tip.x, HEAD_IN.y + tip.y, t, T.poof - 0.05 + (i % 3) * 0.03, [HAIR, GOLD, PINK][i % 3], 0.75) })
    drawBurst(x, B_POOF, HEAD_IN.x, HEAD_IN.y, t, T.poof, PINK, 0.8)
    drawBurst(x, B_CARD, CARD.cx, CARD.cy, t, T.asset[0] + 0.15, GOLD, 0.9)
  }

  // ── end beat: one stray curl springs out of the card on "hair." and poofs
  function drawCurl(t) {
    if (t < T.curl || t > T.curlPoof + 0.8) return
    const { k, bob } = cardFrame(t)
    const p = easeOutBack(prog(t, T.curl, T.curl + 0.35), 3) * (1 - ease.inCubic(prog(t, T.curlPoof - 0.05, T.curlPoof + 0.08)))
    const bx = CARD.cx + 150, by = CARD.cy - CARD.h / 2 + 30 + bob
    if (p > 0 && k > 0) {
      const L = 95 * p, sway = 0.25 * kick(t, T.curl, 12, 3)
      x.save(); x.translate(bx, by); x.rotate(0.35 + sway)
      x.beginPath()
      for (let q = 0; q <= 40; q++) { const u = q / 40, ang = u * Math.PI * 5, rr = 10 + 18 * u; const px = Math.sin(ang) * rr, py = -u * L - (1 - Math.cos(ang)) * rr * 0.3; q ? x.lineTo(px, py) : x.moveTo(px, py) }
      glowStroke(x, HAIR, 9, 18); x.stroke(); x.restore()
    }
    drawBurst(x, B_CURL, bx + 40, by - 130, t, T.curlPoof, HAIR, 0.7)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3.4))
      drawSky(x, t, t < 3.4 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < CLEAR) { drawHook(t); drawCardBack(t); drawHead(t); drawCardFront(t); drawCurl(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.4)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of TEXTS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts:
//   4.38 frizz hook out (4.32) → the head shrinks into a profile card, "On Align, they don't see your face first." (4.45)
//   6.10 the veil has risen over the photo → it flips over to the real veiled mystery card (6.18)
//   8.08 turn type out (8.1) → "Fall for the chart. Not the hair." (8.14) · end card flips at 10.6
const CUTS = [{ t: 4.38, kind: 'fan' }, { t: 6.1, kind: 'flip' }, { t: 8.08, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]

// ── cues (108 bpm; key hits on beats)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const pops = (ts, base = 0, gain = 0.03) => ts.map((t, i) => ['pop', r3(t), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...pops(T.hook.slice(0, 2), 0),
  ['pluck', T.hook[2], 1174.66, 0.05, 0.6, 0], ['pop', T.hook[2], 1318.51, 0.055, 0],                    // 100%
  ...pops(T.hook.slice(3), 3),
  ['pop', T.head, 587.33, 0.05, 0], ['pop', T.therm, 880, 0.04, -0.4], ['whoosh', T.city, 0.6, 0.03],
  ...T.bumps.slice(0, 3).map(([b], i) => ['pop', r3(b + 0.02), [659.25, 739.99, 880][i], 0.05, 0.1]),
  ['riser', 1.6, POOF, 0.035],
  ...pops(T.sub0.slice(0, 2), 1, 0.025),
  ['boom', POOF, 0.22], ['pop', POOF, 1174.66, 0.065, 0], ['glitter', POOF, POOF + 0.5],   // Poof.
  ...Array.from({ length: 4 }, (_, i) => ['tick', r3(POOF + 0.2 + i * 0.32), 0.03]),                // drips
  ['whoosh', T.move[0], 0.55, 0.04], ['pop', T.card + 0.2, 739.99, 0.05, 0],
  ...pops([0, 1, 2, 3, 4, 5].map(i => T.head1 + i * 0.07), 2, 0.022),
  ['pluck', T.face, 880, 0.05, 0.6, 0], ['pop', T.face, 1174.66, 0.05, 0.2],
  ['whoosh', T.veil[0], 0.4, 0.04], ['bell', T.poof, 1318.51, 0.05, 1.6, 0], ['bell', T.poof + 0.06, 1975.53, 0.03, 1.6, 0.2],
  ['glitter', T.poof - 0.05, T.poof + 0.7], ['bell', T.asset[0] + 0.1, 739.99, 0.045, 1.4, -0.2], ['bell', T.asset[0] + 0.19, 1108.73, 0.04, 1.4, 0.2],
  ...pops(T.sub1, 0, 0.025),
  ['whoosh', T.out1[0], 0.35, 0.025],
  ...pops([0, 1, 2, 3].map(i => T.head2 + i * 0.07), 1, 0.025),
  ['pluck', T.not, 739.99, 0.045, 0.6, 0], ['pop', T.not, 880, 0.045, -0.15], ['pop', T.not + 0.09, 987.77, 0.045, 0.15], ['pop', T.not + 0.2, 1174.66, 0.055, 0],
  ['pop', T.curl, 1318.51, 0.05, 0.3], ['glitter', T.curlPoof, T.curlPoof + 0.4], ['pop', T.curlPoof, 1479.98, 0.04, 0.3],
  ['whoosh', T.cardOut, 0.5, 0.035],
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
