// dummies · part a (0–20.2): "Astrology for dummies." → Q1 "What's my sign?" → Q2 "Why do they want my birth time?" →
// "So you're not one sign." Ends exactly on H (wheel.js: SKY_H + drawWheelH + grain GRAIN_H) from 19.6.
// One canvas (sky + diagram), DOM type above it, grain on top. Pure function of t. v2 style (springy, big, bold).
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../../../../src/lib.js'
import { W, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../../sky.js'
import { SIGNS, WHEEL, SKY_H, GRAIN_H, TYPE, angOf, ptOf, drawWheelH, easeOutBack } from '../../../wheel.js'

const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', SILVER = '#e8e6f6'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"   // drawWheelH's stack (no glyph jump at H)
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const { cx: CX, cy: CY } = WHEEL
const TRACK = WHEEL.rIn - 52        // placements ride just inside the ring
const START = 0, END = 20.2, SETTLE = 19.6
const BEAT = n => 0.6 + n * 0.5556  // 108 bpm grid
const sign = id => SIGNS.find(s => s.id === id)
const TAU = sign('taurus'), SAG = sign('sagittarius'), LIB = sign('libra')

// ── beats
const T = {
  you: BEAT(2), q: BEAT(2) + 0.3, qOut: 6.3, youOut1: 9.0, youBack: 17.0, youOut2: 18.95,
  ring: [3.95, 4.5], glyph0: 4.2, glyphGap: 0.07,
  sunIn: BEAT(8), roll: [5.35, 6.45],
  taurus: 6.45, taurusOut: [8.7, 8.9],
  clockIn: BEAT(16) - 0.05, clockOut: 14.45,
  moonIn: 9.55, moonWalk: [9.8, 11.75],
  spin: [12.2, 14.0], rotMax: 75,
  rewind: [14.65, 15.45],
  lblSun: BEAT(27), lblMoon: BEAT(28), rising: BEAT(29),
  placeOut: 18.7,
}
const SUN_LON = 51                  // May 12 ≈ 21° Taurus
const MOON_A = 240.6, MOON_B = 268.2, MOON_BIRTH = 258   // the Moon inches through Sagittarius; rewinds to the birth moment
const RISING_LON = 192              // ~12° Libra

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

/** a glowing orb: big soft halo, shaded sphere, a pixel-star glint (glintAng lets it "roll") */
function orb(x, px, py, r, color, a, halo = 3.6, glintAng = -Math.PI / 4) {
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
  drawPixelStar(x, Math.round(px + Math.cos(glintAng) * r * 1.13), Math.round(py + Math.sin(glintAng) * r * 1.13), r > 24 ? 21 : 14, 0, rgba('#fff3e0', 0.9))
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
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, color)
  }
  x.restore()
}

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last word may pop late with a wobble */
function popText(parent, text, { top, size, font, weight, accentColor = GOLD, accentSize, gap = 0.07, at, lastAt = null, wobble = false, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.02, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' ')
  const ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    ws.push({ t: isLast && lastAt != null ? lastAt : at + n * gap, big: isLast && lastAt != null, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    box,
    update(t, out = 1) {
      box.style.display = out <= 0 || t < at ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) * (t > w.t ? 1 : 0) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}
const head = (root, text, at, opts = {}) => popText(root, text, { top: 215, size: TYPE.headSize, font: INTER, weight: 800, at, ...opts })
const sub = (root, text, at, opts = {}) => popText(root, text, { top: TYPE.subY, size: TYPE.subSize, font: INTER, weight: 700, at, gap: 0.06, accentSize: 68, ...opts })

// ── the wheel's rotation (clockwise on screen, like the sky turning through a day) and the clock
const rotAt = t => {
  if (t < T.spin[0]) return 0
  if (t < T.rewind[0]) return T.rotMax * ease.inOutCubic(prog(t, ...T.spin))
  return T.rotMax * (1 - easeOutBack(prog(t, ...T.rewind), 1.6))
}
const L = (lon, t) => lon - rotAt(t)          // screen longitude of a zodiac longitude while the wheel turns
// clock time (hours after 5:00 PM): 2.5 days whizz by while the Moon crosses Sagittarius, then rot/15 hours
const clockH = t => 60 * ease.inOutQuad(prog(t, ...T.moonWalk)) + rotAt(Math.min(t, T.rewind[0])) / 15
const moonLon = t => t < T.rewind[0] ? lerp(MOON_A, MOON_B, ease.inOutQuad(prog(t, ...T.moonWalk))) : lerp(MOON_B, MOON_BIRTH, ease.inOutCubic(prog(t, ...T.rewind)))

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type
  const eyebrow = txt => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('NO JUDGEMENT'), 0.15, [3.42, 3.58]], [eyebrow('Q1'), 3.62, [8.8, 8.98]], [eyebrow('Q2'), 9.05, [14.4, 14.58]]]
  const H0 = head(root, 'Astrology for | *dummies.*', 0.45, { accentColor: PINK, lastAt: BEAT(1), wobble: true })
  const H1 = head(root, "What's my *sign?*", 3.62)
  const H2 = head(root, 'Why do they want | my *birth* *time?*', 9.05, { size: 90, accentSize: 100 })
  const H3 = head(root, "So you're | not *one* sign.", 14.65)
  const HEADS = [[H0, [3.42, 3.58]], [H1, [8.8, 8.98]], [H2, [14.4, 14.58]], [H3, [19.25, 19.45]]]
  const P1 = sub(root, 'Where the Sun was | on your *birthday.*', 6.75)
  const P2 = sub(root, 'The Moon changes sign | every ~2.5 days.', 9.85)
  const P3 = sub(root, 'Your *Rising* changes | every ~2 hours.', 12.0, { accentColor: LIB.color })
  const P4 = sub(root, "You're a whole *sky.*", 17.1)
  const SUBS = [[P1, [8.75, 8.93]], [P2, [11.8, 11.96]], [P3, [14.4, 14.58]], [P4, [19.2, 19.45]]]
  const youLbl = el('div', { position: 'absolute', left: 0, width: W + 'px', top: CY + 40 + 'px', textAlign: 'center', fontFamily: INTER, fontWeight: 800,
    fontSize: '50px', color: BONE, textShadow: SHADOW, opacity: 0, transformOrigin: '50% 20%' }, root, 'you')
  const qMark = el('div', { position: 'absolute', left: (CX - 100) + 'px', width: '200px', top: (CY - 175) + 'px', textAlign: 'center', fontFamily: INTER, fontWeight: 800,
    fontSize: '110px', lineHeight: 1, color: PINK, textShadow: SHADOW + ', 0 0 30px rgba(255,143,177,0.5)', opacity: 0, transformOrigin: '50% 90%' }, root, '?')
  const taurusLbl = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (CY - 210) + 'px', textAlign: 'center', fontFamily: INTER, fontWeight: 800,
    fontSize: '104px', lineHeight: 1, color: TAU.color, textShadow: SHADOW + `, 0 0 40px ${rgba(TAU.color, 0.45)}`, opacity: 0, letterSpacing: '0.02em' }, root,
    `TAURUS <span style="font-family:${GLYPH_FONT.replace(/'/g, '&#39;')};font-weight:700">${TAU.glyph}&#xFE0E;</span>`)
  const counter = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (CY + 196) + 'px', textAlign: 'center', fontFamily: MONO, fontWeight: 700,
    fontSize: '40px', letterSpacing: '0.12em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, '')

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // twinkling pixel stars around the edges in the opening
  const r = rng(777)
  const STARS = Array.from({ length: 12 }, (_, i) => {
    let px, py
    do { px = 50 + r() * 980; py = 120 + r() * 1760 } while (Math.hypot(px - CX, py - CY) < 520 || (py > 130 && py < 580) || Math.hypot(px - 930, py - 150) < 120 || (py > 1530 && py < 1720))
    return { x: px, y: py, kind: i % 4, size: 14 + Math.round(r() * 2) * 7, seed: i * 17 + 3, sp: 0.8 + r() * 0.8, t0: 0.3 + r() * 1.4, color: [GOLD, '#c9a6ff', PINK, '#8fd8f6'][i % 4] }
  })
  const B = k => makeBurst(100 + k, 8, 90)
  const B_YOU = B(1), B_YOU2 = B(2), B_SUN = B(3), B_LAND = makeBurst(4, 12, 130), B_MOON = B(5), B_CROSS = [B(6), B(7)], B_SUNL = B(8), B_MOONL = B(9), B_RISE = makeBurst(10, 10, 110)
  const B_GLYPH = SIGNS.map((_, i) => makeBurst(30 + i, 5, 60))

  /** the wheel: equals drawWheelH exactly when rot = 0, scale = 1 and every pop has settled */
  function drawWheel(t) {
    if (t < T.ring[0]) return
    const rot = rotAt(t)
    const rk = prog(t, ...T.ring), sc = rk >= 1 ? 1 : lerp(0.55, 1, easeOutBack(rk, 2.2)), ak = clamp(rk * 3)
    const glow = 1 - ease.inOutQuad(prog(t, 17.6, 18.6))
    x.save()
    x.translate(CX, CY); x.scale(sc, sc); x.translate(-CX, -CY)
    // bands: the H wash, plus flashes (Taurus landing, a new Rising sign, the final three)
    SIGNS.forEach((s, i) => {
      const a1 = angOf(L(i * 30, t)), a0 = angOf(L(i * 30 + 30, t))
      let fl = 0
      if (s.id === 'taurus') fl = Math.max(fl, Math.sin(Math.PI * prog(t, T.taurus, T.taurus + 0.9)), 0.6 * Math.sin(Math.PI * prog(t, T.lblSun, T.lblSun + 0.8)))
      if (s.id === 'sagittarius') fl = Math.max(fl, 0.55 * Math.sin(Math.PI * prog(t, T.moonIn, T.moonWalk[1] + 0.3)), 0.6 * Math.sin(Math.PI * prog(t, T.lblMoon, T.lblMoon + 0.8)))
      if (s.id === 'libra') fl = Math.max(fl, 0.6 * Math.sin(Math.PI * prog(t, T.rising, T.rising + 0.8)))
      // the sign on the horizon (9 o'clock) during the spin
      if (t >= T.spin[0] - 0.2 && t < T.rewind[0] + 0.3) {
        const onH = Math.floor(((rot % 360) + 360) % 360 / 30)
        if (onH === i) fl = Math.max(fl, 0.5 * ease.inOutQuad(prog(t, T.spin[0] - 0.2, T.spin[0] + 0.2)) * (1 - ease.inOutQuad(prog(t, T.rewind[0], T.rewind[0] + 0.3))))
      }
      x.globalAlpha = ak * (0.16 + 0.34 * fl); x.fillStyle = s.color
      x.beginPath(); x.arc(CX, CY, WHEEL.rOut, a1, a0, true); x.arc(CX, CY, WHEEL.rIn, a0, a1, false); x.closePath(); x.fill()
    })
    x.globalAlpha = WHEEL.alpha * ak
    x.strokeStyle = BONE
    if (glow > 0) { x.shadowColor = rgba(GOLD, 0.6); x.shadowBlur = 16 * glow }
    x.lineWidth = 4; x.beginPath(); x.arc(CX, CY, WHEEL.rOut, 0, Math.PI * 2); x.stroke()
    x.lineWidth = 3; x.beginPath(); x.arc(CX, CY, WHEEL.rIn, 0, Math.PI * 2); x.stroke()
    for (let i = 0; i < 12; i++) {
      const a = ptOf(L(i * 30, t), WHEEL.rIn), b = ptOf(L(i * 30, t), WHEEL.rOut)
      x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke()
    }
    x.shadowBlur = 0
    // glyphs pop in one by one with a bounce, upright as the wheel turns
    x.font = `bold 58px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    SIGNS.forEach((s, i) => {
      const g0 = T.glyph0 + i * T.glyphGap, gk = prog(t, g0, g0 + 0.42)
      if (gk <= 0) return
      const p = ptOf(L(i * 30 + 15, t), WHEEL.rGlyph)
      const gsc = gk >= 1 ? 1 : lerp(0.2, 1, easeOutBack(gk, 3.4))
      x.save(); x.translate(p.x, p.y); x.scale(gsc, gsc)
      x.globalAlpha = clamp(gk * 4); x.fillStyle = s.color
      x.fillText(s.glyph + '︎', 0, 0)
      x.restore()
      drawBurst(x, B_GLYPH[i], p.x, p.y, t, g0, s.color, 0.5)
    })
    x.restore()
    // the horizon marker during the spin
    const hz = ease.outCubic(prog(t, T.spin[0] - 0.35, T.spin[0])) * outScale(t, T.rewind[0])
    if (hz > 0) {
      x.save(); x.globalAlpha = clamp(hz); x.strokeStyle = GOLD; x.lineWidth = 6; x.lineCap = 'round'
      x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 14
      const x0 = CX - WHEEL.rOut - 46, x1 = CX - WHEEL.rIn + 30
      x.beginPath(); x.moveTo(x0, CY); x.lineTo(lerp(x0, x1, clamp(hz)), CY); x.stroke()
      x.restore()
    }
  }

  function drawClock(t) {
    const k = pop01(t, T.clockIn, 0.4) * outScale(t, T.clockOut)
    if (k <= 0 || t < T.clockIn) return
    const R = 150, h = clockH(t), hDot = (clockH(t + 0.02) - clockH(t - 0.02)) / 0.04   // hours per second
    x.save(); x.translate(CX, CY - 10); x.scale(k, k)
    x.globalAlpha = clamp(k * 2)
    x.fillStyle = 'rgba(12,9,28,0.72)'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
    x.strokeStyle = BONE; x.lineWidth = 9; x.shadowColor = rgba(GOLD, 0.6); x.shadowBlur = 18
    x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.stroke(); x.shadowBlur = 0
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2, big = i % 3 === 0
      x.lineWidth = big ? 8 : 4; x.lineCap = 'round'
      x.beginPath(); x.moveTo(Math.cos(a) * (R - (big ? 34 : 24)), Math.sin(a) * (R - (big ? 34 : 24))); x.lineTo(Math.cos(a) * (R - 14), Math.sin(a) * (R - 14)); x.stroke()
    }
    const hand = (ang, len, w, col) => { x.strokeStyle = col; x.lineWidth = w; x.beginPath(); x.moveTo(-Math.sin(ang) * len * 0.15, Math.cos(ang) * len * 0.15); x.lineTo(Math.sin(ang) * len, -Math.cos(ang) * len); x.stroke() }
    // minute hand: when it whizzes faster than the eye (> 3 turns/s) it becomes a soft blur disc
    const mAng = (5 + h) * Math.PI * 2, blur = clamp((hDot - 3) / 4)
    if (blur > 0) { x.globalAlpha = clamp(k * 2) * 0.2 * blur; x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, R - 36, 0, Math.PI * 2); x.fill() }
    x.globalAlpha = clamp(k * 2) * (1 - 0.75 * blur)
    hand(mAng, R - 36, 9, BONE)
    x.globalAlpha = clamp(k * 2)
    hand(((5 + h) / 12) * Math.PI * 2, R - 72, 14, GOLD)
    x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 13, 0, Math.PI * 2); x.fill()
    x.restore()
  }

  function drawPlacements(t) {
    // the Sun: pops in at Aries, rolls to Taurus and lands with a bounce; rides the wheel after
    if (t >= T.sunIn) {
      const rl = prog(t, ...T.roll), lon = SUN_LON * easeOutBack(rl, 1.4)
      const k = pop01(t, T.sunIn, 0.4) * outScale(t, T.placeOut + 0.2)
      const p = ptOf(L(lon, t), TRACK)
      const roll = -(lon * Math.PI / 180) * (TRACK / 34)            // the glint turns as it rolls
      const squash = 1 + 0.12 * Math.sin(Math.PI * prog(t, T.roll[1] - 0.15, T.roll[1] + 0.25))
      orb(x, p.x, p.y, 34 * k * squash, GOLD, clamp(k * 2), 4, roll - Math.PI / 4)
      drawBurst(x, B_SUN, ptOf(0, TRACK).x, ptOf(0, TRACK).y, t, T.sunIn, GOLD, 0.6)
      drawBurst(x, B_LAND, p.x, p.y, t, T.taurus - 0.05, TAU.color, 0.8)
      label(t, p, lon, T.lblSun, 'Sun', TAU, B_SUNL)
    }
    // the Moon: pops in at the start of Sagittarius and inches through it
    if (t >= T.moonIn) {
      const k = pop01(t, T.moonIn, 0.4) * outScale(t, T.placeOut + 0.1)
      const lon = moonLon(t), p = ptOf(L(lon, t), TRACK)
      orb(x, p.x, p.y, 26 * k, SILVER, clamp(k * 2), 3.8)
      drawBurst(x, B_MOON, p.x, p.y, t, T.moonIn, SILVER, 0.6)
      label(t, p, lon, T.lblMoon, 'Moon', SAG, B_MOONL)
    }
    // Rising: a marker at ~12° Libra (spike through the ring + orb)
    if (t >= T.rising) {
      const k = pop01(t, T.rising, 0.4) * outScale(t, T.placeOut)
      const p = ptOf(RISING_LON, TRACK), a = ptOf(RISING_LON, TRACK + 30), b = ptOf(RISING_LON, WHEEL.rOut + 34)
      x.save(); x.globalAlpha = clamp(k); x.strokeStyle = LIB.color; x.lineWidth = 6; x.lineCap = 'round'; x.shadowColor = LIB.color; x.shadowBlur = 14
      x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(lerp(a.x, b.x, clamp(k)), lerp(a.y, b.y, clamp(k))); x.stroke(); x.restore()
      orb(x, p.x, p.y, 26 * k, LIB.color, clamp(k * 2), 3.8)
      drawBurst(x, B_RISE, p.x, p.y, t, T.rising, LIB.color, 0.7)
      label(t, p, RISING_LON, T.rising + 0.05, 'Rising', LIB, null)
    }
  }
  /** a two-line label inward of a placement: "Sun" (bone, bold) over "♉ Taurus" (sign colour) */
  function label(t, p, lon, t0, word, s, burst) {
    if (t < t0) return
    const k = pop01(t, t0, 0.36) * outScale(t, T.placeOut + (word === 'Sun' ? 0.2 : word === 'Moon' ? 0.1 : 0))
    if (k <= 0) return
    const q = ptOf(L(lon, t), TRACK - (word === 'Sun' ? 116 : 140))
    x.save(); x.translate(q.x, q.y); x.scale(k, k); x.globalAlpha = clamp(k * 2)
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 14
    x.fillStyle = BONE; x.font = `800 52px ${INTER}`; x.fillText(word, 0, -28)
    x.fillStyle = s.color; x.font = `bold 44px ${GLYPH_FONT}`
    const nm = s.name; x.font = `800 44px ${INTER}`; const wn = x.measureText(nm).width
    x.fillText(nm, 24, 26)
    x.font = `bold 48px ${GLYPH_FONT}`; x.fillText(s.glyph + '︎', 24 - wn / 2 - 28, 26)
    x.restore()
    if (burst) drawBurst(x, burst, p.x, p.y, t, t0, s.color, 0.6)
  }

  function drawYou(t) {
    const k1 = t >= T.you ? Math.max(0, ease.spring(prog(t, T.you, T.you + 0.7), 0.3)) * outScale(t, T.youOut1) : 0
    const k2 = t >= T.youBack ? Math.max(0, ease.spring(prog(t, T.youBack, T.youBack + 0.7), 0.3)) * outScale(t, T.youOut2) : 0
    const k = Math.max(k1, k2)
    if (k <= 0) return
    const bob = 1 + 0.06 * Math.sin((t - T.you) * Math.PI * 2 / 1.111)
    orb(x, CX, CY, 15 * k * bob, '#8fd8f6', 1, 4.2)
    drawBurst(x, B_YOU, CX, CY, t, T.you, '#8fd8f6', 0.6)
    drawBurst(x, B_YOU2, CX, CY, t, T.youBack, '#8fd8f6', 0.6)
  }

  function drawPixelStars(t) {
    const out = 1 - ease.inOutQuad(prog(t, 3.6, 4.6))
    if (out <= 0) return
    x.save()
    for (const s of STARS) {
      const a = ease.outCubic(prog(t, s.t0, s.t0 + 0.8)) * out * (0.55 + 0.45 * noise1(t * s.sp, s.seed))
      if (a <= 0.01) continue
      x.globalAlpha = a; drawPixelStar(x, s.x, s.y, s.size, s.kind, s.color)
    }
    x.restore()
  }

  return {
    start: START, end: END, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3.4))
      drawSky(x, t, t < 3.4 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t >= SETTLE) drawWheelH(x)
      else {
        drawPixelStars(t)
        drawWheel(t)
        drawClock(t)
        drawPlacements(t)
        drawYou(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.5)))

      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      for (const [p, o] of SUBS) p.update(t, outK(t, o))
      // "you" + its bouncing "?"
      const yl = prog(t, T.you + 0.15, T.you + 0.5), yl2 = prog(t, T.youBack + 0.15, T.youBack + 0.5)
      const ylk = t < 12 ? clamp(yl * 3) * outK(t, [T.youOut1 - 0.1, T.youOut1 + 0.1]) : clamp(yl2 * 3) * outK(t, [T.youOut2 - 0.1, T.youOut2 + 0.1])
      youLbl.style.opacity = String(ylk)
      youLbl.style.transform = `scale(${(0.6 + 0.4 * easeOutBack(t < 12 ? yl : yl2, 2.6)).toFixed(4)})`
      const qk = pop01(t, T.q, 0.4) * outScale(t, T.qOut)
      qMark.style.display = qk > 0 && t >= T.q ? 'block' : 'none'
      const hop = Math.abs(Math.sin((t - T.q) * Math.PI / 0.5556))      // a hop per beat
      qMark.style.opacity = String(clamp(qk * 2))
      qMark.style.transform = `translateY(${(-26 * hop).toFixed(2)}px) scale(${(qk * (1 + 0.06 * (1 - hop))).toFixed(4)}, ${(qk * (1 - 0.06 * (1 - hop))).toFixed(4)}) rotate(${(8 * Math.sin((t - T.q) * 3)).toFixed(2)}deg)`
      // TAURUS ♉ pops big when the Sun lands
      const tk = pop01(t, T.taurus, 0.45)
      taurusLbl.style.display = t >= T.taurus && t < T.taurusOut[1] ? 'block' : 'none'
      taurusLbl.style.opacity = String(clamp(tk * 3) * outK(t, T.taurusOut))
      taurusLbl.style.transform = `scale(${(0.3 + 0.7 * easeOutBack(prog(t, T.taurus, T.taurus + 0.45), 3)).toFixed(4)}) rotate(${(6 * Math.sin((t - T.taurus) * 13) * Math.exp(-(t - T.taurus) * 3.5)).toFixed(2)}deg)`
      // the clock's counter
      const ck = clamp(pop01(t, T.moonWalk[0], 0.3)) * outScale(t, T.clockOut)
      counter.style.display = ck > 0 && t >= T.moonWalk[0] ? 'block' : 'none'
      counter.style.opacity = String(clamp(ck * 2))
      counter.textContent = t < T.spin[0] - 0.2 ? `+${(2.5 * ease.inOutQuad(prog(t, ...T.moonWalk))).toFixed(1)} DAYS` : `+${Math.floor(rotAt(Math.min(t, T.rewind[0])) / 15 + 1e-6)} HRS`
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(0.45, 2, 0.07, 0),
  ['pluck', BEAT(1), 1174.66, 0.05, 0.6, 0], ['pop', BEAT(1), 1318.51, 0.05, 0],                 // dummies.
  ['pop', T.you, 880, 0.06, 0], ['pop', T.q, 1174.66, 0.045, 0.1],                               // you + ?
  ...wordPops(3.62, 3, 0.07, 1),
  ['whoosh', T.ring[0], 0.5, 0.03],
  ...SIGNS.map((_, i) => ['pop', +(T.glyph0 + i * T.glyphGap).toFixed(3), [587.33, 659.25, 739.99, 880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98, 1174.66, 1318.51, 1396.91][i], 0.03, (i % 2 ? 0.2 : -0.2)]),
  ['pop', T.sunIn, 740, 0.06, -0.2],
  ['whoosh', T.roll[0], T.roll[1] - T.roll[0], 0.035],
  ['pluck', T.taurus, 880, 0.055, 0.7, 0], ['pop', T.taurus, 1174.66, 0.06, 0], ['glitter', T.taurus, T.taurus + 0.8],
  ...wordPops(6.75, 3, 0.06, 2, 0.022),
  ...wordPops(9.05, 4, 0.07, 3),
  ['pop', T.clockIn, 987.77, 0.055, 0.1], ['pop', T.moonIn, 659.25, 0.05, -0.15],
  ['riser', T.moonWalk[0], T.moonWalk[1], 0.03],
  ...[0, 1, 2, 3, 4].map(i => ['tick', +(T.moonWalk[0] + 0.15 + i * 0.36).toFixed(3), 0.03]),
  ['whoosh', T.spin[0], T.spin[1] - T.spin[0], 0.04],
  ...[30, 60].map(d => ['pop', +(T.spin[0] + (T.spin[1] - T.spin[0]) * (d < 45 ? 0.464 : 0.63)).toFixed(3), d < 45 ? 880 : 987.77, 0.045, -0.3]),
  ...wordPops(14.65, 4, 0.07, 0),
  ['whoosh', T.rewind[0], 0.6, 0.035],
  ['pop', T.lblSun, 740, 0.06, -0.2], ['pop', T.lblMoon, 880, 0.06, 0.2], ['pop', T.rising, 1108.73, 0.06, 0.3],
  ['pop', T.youBack, 1318.51, 0.05, 0], ['glitter', T.youBack, T.youBack + 0.8], ['pluck', 17.15, 587.33, 0.045, 0.7, 0],
  ...[0, 1, 2, 3].map(i => ['pop', +(T.placeOut + i * 0.08 + 0.12).toFixed(3), NOTE[5 - i], 0.025, (i - 1.5) * 0.2]),
]
