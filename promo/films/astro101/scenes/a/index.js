// astro101 v2 · part a (0–20.2): "Astrology in 60 seconds. Go." → "The Sun drives the same loop every year." →
// "Everybody's on the road." → "Slice it into 12." Bigger, bolder, springy. Ends exactly on H (wheel.js: SKY_H +
// drawWheelH + grain GRAIN_H) from 19.6. One canvas (sky + diagram), DOM type above it, grain on top. Pure function of t.
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../../../../src/lib.js'
import { W, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../../sky.js'
import { SIGNS, WHEEL, SKY_H, GRAIN_H, TYPE, angOf, ptOf, drawWheelH, easeOutBack } from '../../../wheel.js'

const BONE = '#efe6d6', GOLD = '#f2c75c'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"   // the drawWheelH stack (no glyph jump at H)
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const { cx: CX, cy: CY } = WHEEL
const ROAD = WHEEL.rGlyph          // the loop runs where the glyph band will be, then splits into the ring
const S = WHEEL.rOut / 400         // scale vs the v1 wheel
const START = 0, END = 20.2
const SETTLE = 19.6                // exactly H from here
const BEAT = n => 0.6 + n * 0.5556 // 108 bpm grid

// ── beats
const T = {
  fadeIn: [0, 0.5],
  you: BEAT(2), youOut: [18.4, 18.9], youLblOut: [12.9, 13.25],
  sunIn: BEAT(7), lap: [4.75, 7.35], move: 8.4,
  orbsOut: 12.9,
  split: [13.6, 14.35],
  sign0: BEAT(25), signGap: 0.2778,
  namesLife: 1.0,
}
const OMEGA = 20                   // the Sun's speed (°/s) once everyone is on the road
// the walkers (relative speeds are the real ones vs the Sun; Mercury and Venus stay near the Sun)
const ORBS = [
  { id: 'moon', glyph: '☽', color: '#e8e6f6', r: 24, rel: 13.4, lon0: 150, t0: BEAT(15) },
  { id: 'mercury', glyph: '☿', color: '#9fe0f2', r: 17, near: 24, per: 2.6, t0: BEAT(16) },
  { id: 'venus', glyph: '♀', color: '#ffa8cc', r: 23, near: 42, per: 4.4, ph: 2.4, t0: BEAT(17) },
  { id: 'mars', glyph: '♂', color: '#ff5a3a', r: 21, rel: 0.53, lon0: 205, t0: BEAT(18) },
  { id: 'jupiter', glyph: '♃', color: '#f2b27a', r: 32, rel: 0.083, lon0: 262, t0: BEAT(19) },
  { id: 'saturn', glyph: '♄', color: '#e6d39a', r: 28, rel: 0.034, lon0: 312, t0: BEAT(20) },
]

const walked = (t, t0, w, ramp = 0.6) => t <= t0 ? 0 : t < t0 + ramp ? w * (t - t0) ** 2 / (2 * ramp) : w * (ramp / 2 + (t - t0 - ramp))
const lapE = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
const sunLon = t => 360 * lapE(prog(t, ...T.lap)) + walked(t, T.move, OMEGA)
const sunSpeed = t => { const d = 0.02; return (sunLon(t + d) - sunLon(t - d)) / (2 * d) }   // °/s
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))     // 0 → ~1.1 → 1

/** a glowing orb: big soft halo, shaded sphere, a pixel-star glint */
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
  drawPixelStar(x, Math.round(px + r * 0.8), Math.round(py - r * 0.8), r > 24 ? 21 : 14, 0, rgba('#fff3e0', 0.9))
  x.restore()
}

/** a little burst of pixel stars flying out from (px,py) at t0 */
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

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break */
function popText(parent, text, { top, size, font, weight, accentColor = GOLD, accentSize, gap = 0.07, at, lastAt = null, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.02, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' ')
  const ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = /^\*.*\*[.,!?:]*$/.test(w) || w.startsWith('*') || w.endsWith('*')
    const word = w.replace(/\*/g, '')
    const style = { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%', willChange: 'transform' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    ws.push({ t: isLast && lastAt != null ? lastAt : at + n * gap, big: isLast && lastAt != null, e: el('span', style, box, word) })
    n++
  })
  return {
    box,
    doneAt: Math.max(...ws.map(w => w.t)) + 0.3,
    update(t, out = 1) {
      box.style.display = out <= 0 || t < at ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const outS = lerp(0.9, 1, out)
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * outS).toFixed(4)})`
      }
    },
  }
}
const head = (root, text, at, opts = {}) => popText(root, text, { top: 215, size: TYPE.headSize, font: INTER, weight: 800, at, ...opts })
const sub = (root, text, at, opts = {}) => popText(root, text, { top: TYPE.subY, size: TYPE.subSize, font: INTER, weight: 700, at, gap: 0.06, accentSize: 68, ...opts })
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'ASTROLOGY 101')
  const H1 = head(root, 'Astrology in | 60 seconds. | *Go.*', 0.45, { lastAt: BEAT(1) })
  const H2 = head(root, 'The Sun drives | the *same* *loop* | every year.', 3.62)
  const H3 = head(root, "Everybody's | on the *road.*", 8.62, { accentColor: '#ff8fb1' })
  const H4 = head(root, 'Slice it into *12.*', 13.1)
  const HEADS = [[H1, [3.42, 3.58]], [H2, [8.38, 8.56]], [H3, [12.86, 13.04]], [H4, [19.25, 19.5]]]
  const P1 = sub(root, 'That loop has a name: | the *zodiac.*', 5.95)
  const P2 = sub(root, 'Moon: one lap a month.', 9.0, { color: BONE })
  const P3 = sub(root, 'Saturn: 29 years. | *Take* *your* *time,* *Saturn.*', 11.3, { accentColor: '#e6d39a' })
  const P4 = sub(root, '30° a slice. | *Aries* goes first.', 15.0, { accentColor: SIGNS[0].color })
  const SUBS = [[P1, [8.3, 8.48]], [P2, [11.1, 11.26]], [P3, [13.5, 13.7]], [P4, [19.2, 19.45]]]
  const youLbl = el('div', { position: 'absolute', left: 0, width: W + 'px', top: CY + 40 + 'px', textAlign: 'center', fontFamily: INTER, fontWeight: 800,
    fontSize: '50px', color: BONE, textShadow: SHADOW, opacity: 0, transformOrigin: '50% 20%' }, root, 'you')

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // extra twinkling pixel stars in the opening (clear of type, wheel and moon)
  const r = rng(4242)
  const STARS = Array.from({ length: 12 }, (_, i) => {
    let px, py
    do { px = 50 + r() * 980; py = 120 + r() * 1760 } while (Math.hypot(px - CX, py - CY) < 520 || (py > 130 && py < 580) || Math.hypot(px - 930, py - 150) < 120 || (py > 1530 && py < 1720))
    return { x: px, y: py, kind: i % 4, size: 14 + Math.round(r() * 2) * 7, seed: i * 13 + 5, sp: 0.8 + r() * 0.8, t0: 0.3 + r() * 1.4, color: ['#f2c75c', '#c9a6ff', '#ff8fb1', '#8fd8f6'][i % 4] }
  })
  const B_YOU = makeBurst(11, 8, 70), B_SUN = makeBurst(12, 10, 110), B_LAP = makeBurst(13, 10, 120)
  const B_ORB = ORBS.map((_, i) => makeBurst(20 + i, 7, 80)), B_OUT = ORBS.map((_, i) => makeBurst(40 + i, 5, 60))
  const B_SIGN = SIGNS.map((_, i) => makeBurst(60 + i, 7, 85))

  function drawLoop(t) {
    const split = prog(t, ...T.split)
    const lap = prog(t, ...T.lap)
    if (lap <= 0) return
    x.save()
    x.lineCap = 'round'
    if (split <= 0) {
      const lon = Math.min(360, sunLon(t))
      x.strokeStyle = BONE; x.lineWidth = 6; x.globalAlpha = 0.85
      x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 18
      x.beginPath(); x.arc(CX, CY, ROAD, angOf(0), angOf(lon), true); x.stroke()
      // a "lap closed" glow ring pulse
      const pulse = Math.sin(Math.PI * prog(t, T.lap[1] - 0.05, T.lap[1] + 0.7))
      if (pulse > 0) {
        x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.5 * pulse; x.strokeStyle = GOLD; x.lineWidth = 14; x.shadowBlur = 40
        x.beginPath(); x.arc(CX, CY, ROAD, 0, Math.PI * 2); x.stroke()
      }
    } else {
      // the loop splits into the ring with a springy bounce, its glow cooling to H
      const e = easeOutBack(split, 2.2), c = ease.inOutQuad(split)
      const rOut = lerp(ROAD, WHEEL.rOut, e), rIn = lerp(ROAD, WHEEL.rIn, e)
      x.strokeStyle = BONE; x.globalAlpha = lerp(0.85, WHEEL.alpha, c)
      x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 18 * (1 - ease.inOutQuad(prog(t, T.split[1], 18.4)))
      x.lineWidth = lerp(6, 4, c); x.beginPath(); x.arc(CX, CY, rOut, 0, Math.PI * 2); x.stroke()
      x.lineWidth = lerp(6, 3, c); x.beginPath(); x.arc(CX, CY, rIn, 0, Math.PI * 2); x.stroke()
    }
    x.restore()
  }

  function drawSigns(t) {
    x.save()
    x.textAlign = 'center'; x.textBaseline = 'middle'
    SIGNS.forEach((s, i) => {
      const t0 = T.sign0 + i * T.signGap
      if (t < t0) return
      const a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
      // band: a soft colour flash that settles to H's wash (0.16)
      const fl = Math.max(Math.sin(Math.PI * prog(t, t0, t0 + 0.7)), i === 0 ? Math.sin(Math.PI * prog(t, 15.2, 16.0)) : 0)   // Aries pulses again on "Aries goes first"
      x.globalAlpha = 0.16 * ease.outCubic(prog(t, t0, t0 + 0.25)) + 0.3 * Math.max(0, fl)
      x.fillStyle = s.color
      x.beginPath(); x.arc(CX, CY, WHEEL.rOut, a1, a0); x.arc(CX, CY, WHEEL.rIn, a0, a1, true); x.closePath(); x.fill()
      // division (the line at the sign's start) snaps out from the inner ring
      const d = ease.outCubic(prog(t, t0, t0 + 0.22))
      const p0 = ptOf(i * 30, WHEEL.rIn), p1 = ptOf(i * 30, lerp(WHEEL.rIn, WHEEL.rOut, d))
      x.globalAlpha = WHEEL.alpha; x.strokeStyle = BONE; x.lineWidth = 3
      x.beginPath(); x.moveTo(p0.x, p0.y); x.lineTo(p1.x, p1.y); x.stroke()
      // glyph bounces in big and settles to H (bold 58px, full opacity)
      const gp = ptOf(i * 30 + 15, WHEEL.rGlyph), gk = prog(t, t0, t0 + 0.5)
      const sc = gk >= 1 ? 1 : lerp(0.2, 1, easeOutBack(gk, 3.4)) + 0.25 * Math.sin(Math.PI * Math.min(1, gk * 1.6)) * (1 - gk)
      x.save(); x.translate(gp.x, gp.y); x.scale(sc, sc)
      x.globalAlpha = clamp(gk * 4); x.fillStyle = s.color
      x.font = `bold 58px ${GLYPH_FONT}`
      if (gk < 1) { x.shadowColor = s.color; x.shadowBlur = 24 * (1 - gk) }
      x.fillText(s.glyph + '︎', 0, 0)
      x.restore()
      // name pops just outside the ring, briefly
      const nk = prog(t, t0 + 0.05, t0 + 0.05 + T.namesLife)
      if (nk > 0 && nk < 1) {
        const np = ptOf(i * 30 + 15, WHEEL.rIn - 62)   // inside the ring: clear of the punchline below
        const ns = nk < 0.3 ? 0.5 + 0.5 * easeOutBack(nk / 0.3, 2.6) : 1
        const na = nk < 0.75 ? 1 : 1 - (nk - 0.75) / 0.25
        const cxp = np.x
        x.save(); x.translate(cxp, np.y); x.scale(ns, ns)
        x.globalAlpha = na; x.fillStyle = s.color; x.font = `800 42px ${INTER}`
        x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 14
        x.fillText(s.name, 0, 0)
        x.restore()
      }
      drawBurst(x, B_SIGN[i], gp.x, gp.y, t, t0 + 0.05, s.color, 0.6)
    })
    x.restore()
  }

  function walkers(t) {
    const sl = sunLon(t)
    return ORBS.map((o, i) => {
      let lon
      if (o.near) lon = sl + o.near * ease.outCubic(prog(t, o.t0, o.t0 + 0.8)) * Math.sin((2 * Math.PI * (t - o.t0)) / o.per + (o.ph || 0))
      else lon = o.lon0 + walked(t, o.t0, OMEGA * o.rel)
      const outT = T.orbsOut + i * 0.05
      return { o, i, lon, inK: pop01(t, o.t0, 0.36), outT }
    })
  }
  const outScale = (t, t0) => { const p = prog(t, t0, t0 + 0.3); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }

  function drawWalkers(t) {
    if (t < T.sunIn || t > T.orbsOut + 0.9) return
    const sl = sunLon(t), sp = ptOf(sl, ROAD)
    const list = walkers(t)
    // speed streaks (tapered arcs behind fast movers)
    x.save(); x.globalCompositeOperation = 'lighter'; x.lineCap = 'round'
    const streak = (lon, speed, color, w, k) => {
      const span = clamp(speed * 0.22, 0, 120)
      if (span < 3 || k <= 0) return
      for (let j = 0; j < 8; j++) {
        x.globalAlpha = 0.45 * k * (1 - j / 8); x.strokeStyle = color; x.lineWidth = w * (1 - j / 10)
        x.beginPath(); x.arc(CX, CY, ROAD, angOf(lon - (j + 1) * span / 8), angOf(lon - j * span / 8), true); x.stroke()
      }
    }
    const sunK = outScale(t, T.orbsOut + 0.5)
    streak(sl, sunSpeed(t), GOLD, 22, sunK)
    for (const w of list) if (!w.o.near && t >= w.o.t0) streak(w.lon, OMEGA * w.o.rel * clamp((t - w.o.t0) / 0.6), w.o.color, w.o.r * 0.9, outScale(t, w.outT))
    x.restore()
    // the Sun: pops in at Aries
    const sIn = pop01(t, T.sunIn, 0.4)
    const sr = 38 * sIn * sunK
    orb(x, sp.x, sp.y, sr, GOLD, clamp(sIn * 2) * (sunK > 0 ? 1 : 0), 4)
    drawBurst(x, B_SUN, ptOf(0, ROAD).x, ptOf(0, ROAD).y, t, T.sunIn, GOLD)
    drawBurst(x, B_LAP, ptOf(0, ROAD).x, ptOf(0, ROAD).y, t, T.lap[1] - 0.1, GOLD, 0.8)
    // planets
    for (const w of list) {
      if (t < w.o.t0) continue
      const p = ptOf(w.lon, ROAD), k = outScale(t, w.outT)
      const satPulse = w.o.id === 'saturn' ? 1 + 0.18 * Math.sin(Math.PI * prog(t, 11.75, 12.35)) : 1
      orb(x, p.x, p.y, w.o.r * w.inK * k * satPulse, w.o.color, clamp(w.inK * 2))
      drawBurst(x, B_ORB[w.i], p.x, p.y, t, w.o.t0, w.o.color, 0.6)
      drawBurst(x, B_OUT[w.i], p.x, p.y, t, w.outT + 0.15, w.o.color, 0.5)
    }
    // glyph tags just inside the road
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `bold 54px ${GLYPH_FONT}`
    x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 10
    const tag = (lon, g, c, k) => { if (k <= 0.01) return; const q = ptOf(lon, ROAD - 86); x.save(); x.translate(q.x, q.y); x.scale(k, k); x.globalAlpha = clamp(k); x.fillStyle = c; x.fillText(g + '︎', 0, 0); x.restore() }
    tag(sl, '☉', GOLD, pop01(t, T.sunIn + 0.15, 0.4) * sunK)
    for (const w of list) if (t >= w.o.t0) tag(w.lon, w.o.glyph, w.o.color, pop01(t, w.o.t0 + 0.1, 0.36) * outScale(t, w.outT))
    x.restore()
  }

  function drawYou(t) {
    if (t < T.you || t > T.youOut[1]) return
    const k = (lerp(0, 1, ease.spring(prog(t, T.you, T.you + 0.7), 0.3))) * (1 - ease.inCubic(prog(t, ...T.youOut)))
    const bob = 1 + 0.06 * Math.sin((t - T.you) * Math.PI * 2 / 1.111)
    orb(x, CX, CY, 15 * Math.max(0, k) * bob, '#8fd8f6', 1, 4.2)
    drawBurst(x, B_YOU, CX, CY, t, T.you, '#8fd8f6', 0.6)
  }

  function drawPixelStars(t) {
    const out = 1 - ease.inOutQuad(prog(t, 12.9, 14.0))
    if (out <= 0) return
    x.save()
    for (const s of STARS) {
      const tw = 0.55 + 0.45 * noise1(t * s.sp, s.seed)
      const a = ease.outCubic(prog(t, s.t0, s.t0 + 0.8)) * out * tw
      if (a <= 0.01) continue
      x.globalAlpha = a
      drawPixelStar(x, s.x, s.y, s.size, s.kind, s.color)
    }
    x.restore()
  }

  return {
    start: START, end: END, root,
    update(t) {
      const settleSky = ease.inOutCubic(prog(t, 0, 3.4))
      drawSky(x, t, t < 3.4 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, settleSky), dy: lerp(-30, 0, settleSky) } : SKY_H)
      if (t >= SETTLE) drawWheelH(x)
      else {
        drawPixelStars(t)
        drawLoop(t)
        drawSigns(t)
        drawWalkers(t)
        drawYou(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.fadeIn)))

      eyebrow.style.opacity = String(ease.outCubic(prog(t, 0.15, 0.5)) * outK(t, [3.42, 3.58]))
      eyebrow.style.transform = `translateY(${((1 - ease.outCubic(prog(t, 0.15, 0.5))) * 16).toFixed(2)}px)`
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      for (const [p, o] of SUBS) p.update(t, outK(t, o))
      const yl = prog(t, T.you + 0.15, T.you + 0.5)
      youLbl.style.opacity = String(clamp(yl * 3) * outK(t, T.youLblOut))
      youLbl.style.transform = `scale(${(0.6 + 0.4 * easeOutBack(yl, 2.6)).toFixed(4)})`
      drawGrain(gx, t)
    },
    _doneAt: [H1, H2, H3, H4, P1, P2, P3, P4].map(p => p.doneAt),
  }
}

export const SCENES = [build]
// melody for pops: D major-ish pentatonic, kept modest under the bouncy score
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(0.45, 4, 0.07, 0),
  ['pluck', BEAT(1), 1174.66, 0.05, 0.6, 0], ['glitter', BEAT(1), BEAT(1) + 0.6],               // Go.
  ['pop', T.you, 880, 0.06, 0], ['pluck', T.you + 0.05, 587.33, 0.035, 0.4, 0],                 // you
  ...wordPops(3.62, 4, 0.07, 1),
  ['pop', T.sunIn, 740, 0.06, -0.2],                                                            // the Sun
  ['whoosh', T.lap[0] + 0.3, T.lap[1] - T.lap[0] - 0.3, 0.05],                                  // the lap
  ['pluck', T.lap[1], 1174.66, 0.05, 0.7, 0], ['glitter', T.lap[1] - 0.1, T.lap[1] + 0.7],
  ...wordPops(5.95, 3, 0.06, 2, 0.022),
  ...wordPops(8.62, 3, 0.07, 3),
  ...ORBS.map((o, i) => ['pop', o.t0, NOTE[i], 0.06, (i - 2.5) * 0.18]),
  ['whoosh', ORBS[0].t0 + 0.2, 1.3, 0.03],                                                      // the Moon zips
  ['pluck', 11.75, 196, 0.045, 0.9, 0.2],                                                        // take your time, Saturn
  ...ORBS.map((o, i) => ['pop', +(T.orbsOut + i * 0.05 + 0.12).toFixed(3), NOTE[6 - i], 0.025, (i - 2.5) * 0.18]),
  ...wordPops(13.1, 4, 0.07, 0),
  ['whoosh', T.split[0], 0.7, 0.035],
  ...SIGNS.map((_, i) => ['pop', +(T.sign0 + i * T.signGap).toFixed(3), [587.33, 659.25, 739.99, 880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98, 1174.66, 1318.51, 1396.91][i] * 0.8, 0.05, (i % 2 ? 0.2 : -0.2)]),
  ['glitter', T.sign0 + 11 * T.signGap, T.sign0 + 11 * T.signGap + 0.8],
  ['pluck', 15.0, 880, 0.035, 0.5, 0],
]
