// astro101 · part a (0–20.2): "Start with the sky." → "The zodiac is the road the Sun walks." → "The Moon and every
// planet walk it too." → "Cut the road into twelve." Ends exactly on H (wheel.js: SKY_H + drawWheelH + grain GRAIN_H) from 19.6.
// One canvas (sky + diagram), DOM captions above it, grain on top. Pure function of t.
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../../sky.js'
import { SIGNS, WHEEL, SKY_H, GRAIN_H, angOf, ptOf, drawWheelH } from '../../../wheel.js'

const BONE = '#efe6d6'
const SHADOW = '0 2px 26px rgba(6,4,18,0.95), 0 0 3px rgba(6,4,18,0.7)'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"   // the same stack as drawWheelH (no glyph jump at H)
const { cx: CX, cy: CY } = WHEEL
const ROAD = WHEEL.rGlyph          // the Sun's road runs where the glyph band will be; it splits into the ring
const START = 0, END = 20.2
const SETTLE = 19.6                // exactly H from here

// ── beats
const T = {
  fadeIn: [0, 0.7],
  you: [0.9, 1.7], youLbl: [1.3, 2.1], youLblOut: [12.7, 13.2], youOut: [18.5, 19.4],
  sunIn: [3.9, 4.5], lap: [4.4, 8.0], move: 8.6,
  orbsOut: [12.85, 13.9],
  split: [13.5, 14.5],
  div0: 14.45, divGap: 0.27, divDur: 0.55,
  namesOut: [18.7, 19.4],
  aries: [14.9, 15.6], ariesOut: [18.6, 19.3],
}
const OMEGA = 22            // the Sun's speed (°/s) once everyone is walking
// the walkers: speed relative to the Sun, start longitude, entry time; Mercury and Venus stay near the Sun (elongation)
const ORBS = [
  { id: 'moon', glyph: '☽', color: '#e4e2f2', r: 11, rel: 4.5, lon0: 130, t0: 8.85 },
  { id: 'mercury', glyph: '☿', color: '#a9dcec', r: 8, near: 24, per: 3.2, t0: 9.2 },
  { id: 'venus', glyph: '♀', color: '#f6b4cc', r: 11, near: 42, per: 5.4, ph: 2.2, t0: 9.45 },
  { id: 'mars', glyph: '♂', color: '#f0603a', r: 10, rel: 0.53, lon0: 205, t0: 9.7 },
  { id: 'jupiter', glyph: '♃', color: '#e9b88a', r: 15, rel: 0.16, lon0: 262, t0: 9.95 },
  { id: 'saturn', glyph: '♄', color: '#d8c79a', r: 13, rel: 0.07, lon0: 310, t0: 10.2 },
]

// distance travelled at speed w after a 1 s linear ramp starting at t0
const walked = (t, t0, w, ramp = 1) => t <= t0 ? 0 : t < t0 + ramp ? w * (t - t0) ** 2 / (2 * ramp) : w * (ramp / 2 + (t - t0 - ramp))
const sunLon = t => 360 * ease.inOutCubic(prog(t, ...T.lap)) + walked(t, T.move, OMEGA)

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }

/** a glowing orb: soft halo, shaded sphere, a tiny pixel-star glint */
function orb(x, cx_, y, r, color, a, { halo = 4, glint = true } = {}) {
  if (a <= 0) return
  x.save()
  x.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = x.createRadialGradient(cx_, y, r * 0.4, cx_, y, hr)
  g.addColorStop(0, rgba(color, 0.42 * a)); g.addColorStop(0.35, rgba(color, 0.12 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(cx_, y, hr, 0, Math.PI * 2); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.globalAlpha = a
  const s = x.createRadialGradient(cx_ - r * 0.35, y - r * 0.4, r * 0.1, cx_, y, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.35, color); s.addColorStop(1, rgba(color, 0.75))
  x.fillStyle = s; x.beginPath(); x.arc(cx_, y, r, 0, Math.PI * 2); x.fill()
  if (glint) drawPixelStar(x, Math.round(cx_ + r * 0.85), Math.round(y - r * 0.85), r > 12 ? 14 : 10, 2, rgba('#fff3e0', 0.85))
  x.restore()
}

/** a caption whose words land one by one, wrapping inside a centred box */
function caption(parent, text, style, at, gap = 0.1, dur = 0.55) {
  const box = el('div', { position: 'absolute', left: '90px', width: (W - 180) + 'px', textAlign: 'center', ...style }, parent)
  let n = 0
  const ws = text.split(' ').flatMap(w => { if (w === '|') { el('br', {}, box); return [] } return [{ t: at + n++ * gap, e: el('span', { display: 'inline-block', margin: '0 0.12em', opacity: 0 }, box, w) }] })
  return {
    box,
    update(t, out = 1) {
      box.style.display = out <= 0 || t < at ? 'none' : 'block'
      for (const w of ws) {
        const p = prog(t, w.t, w.t + dur), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${((1 - e) * 14).toFixed(2)}px)`
        w.e.style.filter = p < 1 ? `blur(${((1 - e) * 5).toFixed(2)}px)` : 'none'
      }
    },
  }
}
const capStyle = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '76px', lineHeight: 1.1, color: BONE, textShadow: SHADOW }
const subStyle = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '48px', lineHeight: 1.2, color: BONE, textShadow: SHADOW, opacity: 0.86 }

async function build(stage) {
  try { await Promise.all([document.fonts.load("italic 40px 'EB Garamond'"), document.fonts.load("30px 'Space Mono'")]) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // copy
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '262px', textAlign: 'center', fontFamily: MONO, fontSize: '31px',
    letterSpacing: '0.3em', color: BONE, textShadow: SHADOW, opacity: 0 }, root, 'ASTROLOGY, IN ONE MINUTE')
  const caps = [
    { c: caption(root, 'Start with the sky.', { ...capStyle, top: '322px' }, 0.2, 0.1), out: [3.15, 3.5] },
    { c: caption(root, 'The zodiac is the road | the Sun walks.', { ...capStyle, top: '268px' }, 3.6), out: [8.2, 8.55] },
    { c: caption(root, 'The Moon and every planet walk it too.', { ...capStyle, top: '268px' }, 8.65), out: [12.75, 13.1] },
    { c: caption(root, 'Cut the road into twelve.', { ...capStyle, top: '310px' }, 13.2, 0.11), out: [19.25, 19.65] },
  ]
  const fadeEl = (txt, style) => el('div', { position: 'absolute', left: '90px', width: (W - 180) + 'px', textAlign: 'center', opacity: 0, ...style }, root, txt)
  const subs = [
    { e: fadeEl('One full lap, once a year.', { ...subStyle, top: '1520px' }), at: [5.3, 5.9], out: [8.1, 8.45] },
    { e: fadeEl('The Moon laps it every month.<br>Saturn takes twenty-nine years.', { ...subStyle, top: '1500px' }), at: [9.75, 10.35], out: [12.7, 13.05] },
    { e: fadeEl('30° each, starting at Aries', { ...subStyle, top: '1530px' }), at: [14.9, 15.5], out: [19.2, 19.6] },
  ]
  const youLbl = el('div', { position: 'absolute', left: 0, width: W + 'px', top: CY + 26 + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic',
    fontSize: '38px', color: BONE, textShadow: SHADOW, opacity: 0 }, root, 'you, on Earth')

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // a few extra pixel stars that twinkle in the opening (kept clear of captions, the wheel and the moon)
  const r = rng(4242)
  const STARS = Array.from({ length: 14 }, (_, i) => {
    let px, py
    do { px = 60 + r() * 960; py = 120 + r() * 1700 } while (Math.hypot(px - CX, py - CY) < 470 || (py > 230 && py < 470) || Math.hypot(px - 930, py - 150) < 120 || (py > 1480 && py < 1640))
    return { x: px, y: py, kind: i % 4, size: 10 + Math.round(r() * 2) * 4, seed: i * 13 + 5, sp: 0.6 + r() * 0.8, t0: 0.4 + r() * 1.6,
      color: ['#f2c75c', '#c9a6ff', '#ff8fb1', '#8fd8f6'][i % 4] }
  })

  function drawRoadAndRing(t) {
    const split = ease.inOutCubic(prog(t, ...T.split))
    // the Sun's trail → the road (a full circle after the lap)
    const lap = prog(t, ...T.lap)
    if (split <= 0) {
      if (lap <= 0) return
      const lon = Math.min(360, sunLon(t))
      x.save()
      x.strokeStyle = BONE; x.lineWidth = 2; x.globalAlpha = 0.6
      x.beginPath(); x.arc(CX, CY, ROAD, angOf(0), angOf(lon), true); x.stroke()
      // a brighter wake just behind the Sun while it laps
      if (lap < 1) {
        x.globalCompositeOperation = 'lighter'
        for (let k = 0; k < 10; k++) {
          const a0 = Math.max(0, lon - (k + 1) * 6), a1 = Math.max(0, lon - k * 6)
          x.globalAlpha = 0.5 * (1 - k / 10) * Math.min(1, lap * 8); x.strokeStyle = '#f2c75c'; x.lineWidth = 3
          x.beginPath(); x.arc(CX, CY, ROAD, angOf(a0), angOf(a1), true); x.stroke()
        }
      }
      x.restore()
      return
    }
    // the road splits into the H ring's two circles
    const rOut = lerp(ROAD, WHEEL.rOut, split), rIn = lerp(ROAD, WHEEL.rIn, split)
    x.save()
    x.strokeStyle = BONE
    x.globalAlpha = lerp(0.6, WHEEL.alpha, split)
    x.lineWidth = 2; x.beginPath(); x.arc(CX, CY, rOut, 0, Math.PI * 2); x.stroke()
    x.lineWidth = lerp(2, 1.5, split); x.beginPath(); x.arc(CX, CY, rIn, 0, Math.PI * 2); x.stroke()
    x.restore()
  }

  function drawDivisions(t) {
    x.save()
    x.textAlign = 'center'; x.textBaseline = 'middle'
    const namesOut = 1 - ease.inOutQuad(prog(t, ...T.namesOut))
    SIGNS.forEach((s, i) => {
      const t0 = T.div0 + i * T.divGap
      const p = ease.inOutCubic(prog(t, t0, t0 + T.divDur))
      if (p <= 0) return
      // the division line grows outward from the inner ring
      const a = ptOf(i * 30, WHEEL.rIn), b = ptOf(i * 30, lerp(WHEEL.rIn, WHEEL.rOut, p))
      x.globalAlpha = WHEEL.alpha; x.strokeStyle = BONE; x.lineWidth = 1.5
      x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke()
      // a soft flash of the sign's colour across its segment as it is cut
      const fl = Math.sin(Math.PI * prog(t, t0 + 0.1, t0 + 0.95))
      if (fl > 0) {
        x.globalAlpha = 0.16 * fl; x.fillStyle = s.color
        x.beginPath(); x.arc(CX, CY, WHEEL.rOut, angOf(i * 30), angOf(i * 30 + 30), true); x.arc(CX, CY, WHEEL.rIn, angOf(i * 30 + 30), angOf(i * 30), false); x.closePath(); x.fill()
      }
      // glyph (the exact H glyph once settled) and name outside the ring
      const g = ease.outCubic(prog(t, t0 + 0.15, t0 + 0.75))
      if (g > 0) {
        const gp = ptOf(i * 30 + 15, WHEEL.rGlyph)
        x.globalAlpha = 0.85 * g; x.fillStyle = s.color
        x.font = `${(40 * lerp(0.8, 1, g)).toFixed(2)}px ${GLYPH_FONT}`
        x.fillText(s.glyph + '︎', gp.x, gp.y)
        const np = ptOf(i * 30 + 15, 448)
        x.globalAlpha = 0.9 * g * namesOut
        x.font = `italic 31px ${SERIF}`
        x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 12
        if (namesOut > 0) x.fillText(s.name, np.x, np.y + (1 - g) * 6)
        x.shadowBlur = 0
      }
    })
    x.restore()
  }

  function drawAriesSpan(t) {
    const k = ease.inOutQuad(prog(t, ...T.aries)) * (1 - ease.inOutQuad(prog(t, ...T.ariesOut)))
    if (k <= 0) return
    const R = 296, col = SIGNS[0].color
    x.save()
    x.globalAlpha = 0.11 * k; x.fillStyle = col
    x.beginPath(); x.arc(CX, CY, WHEEL.rOut, angOf(0), angOf(30), true); x.arc(CX, CY, WHEEL.rIn, angOf(30), angOf(0), false); x.closePath(); x.fill()
    // a 30° measuring arc inside the ring, drawn from 0° to 30°
    const sweep = 30 * ease.inOutCubic(prog(t, T.aries[0] + 0.2, T.aries[1] + 0.5))
    x.globalAlpha = 0.85 * k; x.strokeStyle = col; x.lineWidth = 2
    x.beginPath(); x.arc(CX, CY, R, angOf(0), angOf(sweep), true); x.stroke()
    for (const L of [0, sweep]) { const a = ptOf(L, R - 9), b = ptOf(L, R + 9); x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke() }
    const lp = ptOf(15, R - 50)
    x.globalAlpha = k * prog(t, T.aries[0] + 0.5, T.aries[1] + 0.6)
    x.fillStyle = BONE; x.font = `27px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 10
    x.fillText('30°', lp.x, lp.y)
    x.restore()
  }

  function drawWalkers(t) {
    const out = 1 - ease.inOutCubic(prog(t, ...T.orbsOut))
    if (out <= 0 || t < T.sunIn[0]) return
    const sl = sunLon(t)
    const list = []
    for (const o of ORBS) {
      const e = ease.outCubic(prog(t, o.t0, o.t0 + 0.7))
      if (e <= 0) continue
      let lon
      if (o.near) lon = sl + o.near * e * Math.sin((2 * Math.PI * (t - o.t0)) / o.per + (o.ph || 0))   // peels off the Sun
      else lon = o.lon0 + walked(t, o.t0, OMEGA * o.rel)
      list.push({ o, lon, a: e * out })
    }
    // trails: a short comet tail behind each walker, in its colour
    for (const { o, lon, a } of list) {
      if (o.near) continue
      const span = Math.min(28, 0.35 * OMEGA * o.rel + 2)
      x.save(); x.globalCompositeOperation = 'lighter'; x.lineWidth = 2.5; x.strokeStyle = o.color
      for (let k = 0; k < 6; k++) { x.globalAlpha = 0.28 * a * (1 - k / 6); x.beginPath(); x.arc(CX, CY, ROAD, angOf(lon - (k + 1) * span / 6), angOf(lon - k * span / 6), true); x.stroke() }
      x.restore()
    }
    // the Sun
    const sa = ease.outCubic(prog(t, ...T.sunIn)) * out
    const sp = ptOf(sl, ROAD), sr = 21 * lerp(0.6, 1, ease.outBack(prog(t, ...T.sunIn))) * lerp(0.6, 1, out)
    orb(x, sp.x, sp.y, sr, '#f2c75c', sa, { halo: 5 })
    for (const { o, lon, a } of list) {
      const p = ptOf(lon, ROAD)
      orb(x, p.x, p.y, o.r * lerp(0.5, 1, a), o.color, a)
    }
    // glyph tags just inside the road
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `30px ${GLYPH_FONT}`
    x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 8
    const tag = (lon, g, c, a) => { const q = ptOf(lon, ROAD - 46); x.globalAlpha = 0.9 * a; x.fillStyle = c; x.fillText(g + '︎', q.x, q.y) }
    tag(sl, '☉', '#f2c75c', sa * prog(t, T.sunIn[0] + 0.3, T.sunIn[1] + 0.4))
    for (const { o, lon, a } of list) tag(lon, o.glyph, o.color, a)
    x.restore()
  }

  function drawYou(t) {
    const k = ease.outCubic(prog(t, ...T.you)) * (1 - ease.inOutQuad(prog(t, ...T.youOut)))
    if (k <= 0) return
    const pulse = 1 + 0.08 * Math.sin(t * 2.4)
    orb(x, CX, CY, 8 * lerp(0.4, 1, k) * pulse, '#8fd8f6', k, { halo: 5, glint: false })
  }

  function drawPixelStars(t) {
    const out = 1 - ease.inOutQuad(prog(t, 12.8, 14.2))
    if (out <= 0) return
    x.save()
    for (const s of STARS) {
      const tw = 0.55 + 0.45 * noise1(t * s.sp, s.seed)
      const a = ease.outCubic(prog(t, s.t0, s.t0 + 1.2)) * out * tw
      if (a <= 0.01) continue
      x.globalAlpha = a
      drawPixelStar(x, s.x, s.y, s.size, s.kind, s.color)
    }
    x.restore()
  }

  return {
    start: START, end: END, root,
    update(t) {
      // sky: a slow settle into the H camera
      const settleSky = ease.inOutCubic(prog(t, 0, 3.6))
      drawSky(x, t, t < 3.6 ? { ...SKY_H, zoom: lerp(1.56, SKY_H.zoom, settleSky), dy: lerp(-24, 0, settleSky) } : SKY_H)
      if (t >= SETTLE) {
        drawWheelH(x)
      } else {
        drawPixelStars(t)
        drawRoadAndRing(t)
        drawAriesSpan(t)
        drawDivisions(t)
        drawWalkers(t)
        drawYou(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.fadeIn)))

      // copy
      eyebrow.style.opacity = String(0.8 * ease.inOutQuad(prog(t, 0.2, 0.9)) * (1 - ease.inOutQuad(prog(t, 3.15, 3.5))))
      for (const { c, out } of caps) c.update(t, 1 - ease.inOutQuad(prog(t, ...out)))
      for (const s of subs) s.e.style.opacity = String(0.86 * ease.inOutQuad(prog(t, ...s.at)) * (1 - ease.inOutQuad(prog(t, ...s.out))))
      youLbl.style.opacity = String(0.85 * ease.inOutQuad(prog(t, ...T.youLbl)) * (1 - ease.inOutQuad(prog(t, ...T.youLblOut))))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]
export const CUES = [
  ['bell', 0.4, 293.66, 0.022, 3.2, 0],                                                   // Start with the sky.
  ['bell', 1.0, 440, 0.016, 2.6, 0],                                                      // you
  ['bell', 3.65, 369.99, 0.02, 3, -0.1],                                                  // the road
  ['whoosh', 4.4, 3.6, 0.03],                                                             // the Sun's lap
  ['bell', 8.0, 587.33, 0.014, 2.4, 0.15],                                                // lap closes
  ...ORBS.map((o, i) => ['bell', o.t0 + 0.05, [440, 493.88, 554.37, 587.33, 659.25, 739.99][i], 0.012, 1.8, (i - 2.5) * 0.15]),
  ['glitter', 8.9, 10.6],
  ['bell', 13.25, 293.66, 0.02, 3.2, 0],                                                  // Cut the road into twelve.
  ['whoosh', 13.5, 1.0, 0.025],                                                           // the road splits
  ...SIGNS.map((_, i) => ['tick', T.div0 + i * T.divGap + 0.05, 0.035]),
]
