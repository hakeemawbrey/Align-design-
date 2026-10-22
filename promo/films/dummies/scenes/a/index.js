// dummies v2 · part a (0–20.2): "Astrology for dummies." (floating glyphs) → Q1 "What's my sign?" (top-down Sun + Earth,
// line of sight to the Taurus panel, MAY 12 page) → Q2 "Why do they want my birth time?" (flipping calendar + Moon hopping
// signs; spinning Earth whose horizon sweeps the band, ~2 HRS stopwatch) → "So you're not one sign." (three trading cards).
// Hand-off H (v2): ONLY drawSky(SKY_H) + grain GRAIN_H, from 19.6. One canvas, DOM type above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../../../../src/lib.js'
import { W, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../../wheel.js'

const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', ROSE = '#e8628a', SILVER = '#e3ecff', INK = '#1a1430', EARTH = '#4f9cf0'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const START = 0, END = 20.2, SETTLE = 19.6
const BEAT = n => 0.6 + n * 0.5556  // 108 bpm grid
const sign = id => SIGNS.find(s => s.id === id)
const TAU = sign('taurus'), SAG = sign('sagittarius'), LIB = sign('libra')
const D2R = Math.PI / 180
const angOf = lon => Math.PI - lon * D2R            // same orientation as the wheel: Aries at 9 o'clock, signs counter-clockwise
const at = (cx, cy, lon, r) => ({ x: cx + Math.cos(angOf(lon)) * r, y: cy + Math.sin(angOf(lon)) * r })

// ── beats
const T = {
  q0: BEAT(2), q0Out: 3.3,
  // Q1
  sun: BEAT(6), band0: 4.1, bandGap: 0.05, orbit: [4.55, 5.0], earth: BEAT(8), earthMove: [5.15, 5.75],
  cal: BEAT(9), sight: [5.95, 6.45], taurus: 6.45, q1Out: 8.72,
  // Q2a: calendar + Moon hops
  cal2: 9.3, days: [9.55, 11.65], q2aOut: 11.72,
  // Q2b: spinning Earth
  globe: 11.95, spin: [12.35, 14.2], q2bOut: 14.38,
  // cards
  cards: [BEAT(27), BEAT(28), BEAT(29)], cardsOut: 18.7,
}
const SUN_LON = 51                   // May 12 ≈ 21° Taurus
const EARTH_LON = SUN_LON + 180      // seen from Earth, the Sun sits against the opposite side of the band
const DAYS = 7, HOPS = [1, 3.5, 6]   // the Moon changes sign every ~2.5 days
const dayAt = t => DAYS * prog(t, ...T.days)
const ASC0 = 5, ASC1 = 95
const ascAt = t => ASC0 + (ASC1 - ASC0) * ease.inOutQuad(prog(t, ...T.spin))
const crossT = deg => { let lo = T.spin[0], hi = T.spin[1]; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (ascAt(m) < deg) lo = m; else hi = m } return lo }
const ASC_CROSS = [30, 60, 90].map(crossT)

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }

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
function popText(parent, text, { top, size, font, weight, accentColor = GOLD, accentSize, gap = 0.07, at: t0, lastAt = null, wobble = false, color = BONE }) {
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
    ws.push({ t: isLast && lastAt != null ? lastAt : t0 + n * gap, big: isLast && lastAt != null, e: el('span', style, box, w.replace(/\*/g, '')) })
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
const head = (root, text, t0, opts = {}) => popText(root, text, { top: 215, size: TYPE.headSize, font: INTER, weight: 800, at: t0, ...opts })
const sub = (root, text, t0, opts = {}) => popText(root, text, { top: TYPE.subY, size: TYPE.subSize, font: INTER, weight: 700, at: t0, gap: 0.06, accentSize: 68, ...opts })

/** a ring-shaped zodiac band (12 coloured panels + glyphs). panelK(i) 0..1 pops each panel; lit(i) 0..1 brightens it */
function drawBand(x, cx, cy, rIn, rOut, glyphPx, panelK, lit) {
  for (let i = 0; i < 12; i++) {
    const k = panelK(i)
    if (k <= 0) continue
    const s = SIGNS[i], L = lit(i)
    const mid = (rIn + rOut) / 2, half = (rOut - rIn) / 2 * Math.min(1.15, k)
    const a0 = angOf(i * 30 + 1.2), a1 = angOf(i * 30 + 28.8)
    x.save()
    x.globalAlpha = clamp(k * 2)
    x.beginPath(); x.arc(cx, cy, mid + half, a0, a1, true); x.arc(cx, cy, mid - half, a1, a0, false); x.closePath()
    x.fillStyle = rgba(s.color, 0.26 + 0.5 * L); x.fill()
    glowStroke(x, L > 0.05 ? s.color : BONE, 5, 12 + 22 * L); x.globalAlpha = clamp(k * 2) * (0.75 + 0.25 * L); x.stroke()
    const g = at(cx, cy, i * 30 + 15, mid)
    x.translate(g.x, g.y); const sc = Math.min(1.2, k) * (1 + 0.25 * L); x.scale(sc, sc)
    x.shadowBlur = 0; x.globalAlpha = clamp(k * 2)
    x.fillStyle = L > 0.3 ? '#fffaf0' : s.color; x.font = `bold ${glyphPx}px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(s.glyph + '︎', 0, 0)
    x.restore()
  }
}

/** a tear-off calendar page (bone page, rose header). flip 0..1 = hinged in from the top */
function drawPage(x, cx, cy, w, h, top, big, flip = 1, a = 1) {
  if (flip <= 0 || a <= 0) return
  x.save(); x.translate(cx, cy - h / 2); x.scale(1, Math.max(0.02, flip)); x.globalAlpha = a
  x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 24
  x.fillStyle = BONE; x.beginPath(); x.roundRect(-w / 2, 0, w, h, 22); x.fill(); x.shadowBlur = 0
  x.fillStyle = ROSE; x.beginPath(); x.roundRect(-w / 2, 0, w, h * 0.3, [22, 22, 0, 0]); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 6; x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 16
  x.beginPath(); x.roundRect(-w / 2, 0, w, h, 22); x.stroke(); x.shadowBlur = 0
  for (const dx of [-w * 0.25, w * 0.25]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, h * 0.07, 7, 0, Math.PI * 2); x.fill() }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = BONE; x.font = `700 ${Math.round(h * 0.14)}px ${MONO}`; x.fillText(top, 0, h * 0.17)
  x.fillStyle = INK; x.font = `800 ${Math.round(h * 0.42)}px ${INTER}`; x.fillText(big, 0, h * 0.64)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type (copy + timings unchanged from v1)
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
  const SUBS = [[P1, [8.75, 8.93]], [P2, [11.7, 11.88]], [P3, [14.4, 14.58]], [P4, [19.2, 19.45]]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(200 + k, n, d)

  // ── title: big glyphs + a gold "?" floating in zero-g
  const FLOAT = [
    { g: '♈', c: SIGNS[0].color, x: 200, y: 760, s: 120, sp: 22, t0: BEAT(2) },
    { g: '♋', c: SIGNS[3].color, x: 875, y: 800, s: 104, sp: -18, t0: BEAT(2) + 0.14 },
    { g: '♎', c: SIGNS[6].color, x: 225, y: 1330, s: 112, sp: -26, t0: BEAT(3) },
    { g: '♑', c: SIGNS[9].color, x: 860, y: 1300, s: 120, sp: 16, t0: BEAT(3) + 0.14 },
    { g: '♌', c: SIGNS[4].color, x: 540, y: 1560, s: 96, sp: 30, t0: BEAT(4) },
  ].map((f, i) => ({ ...f, b: B(i, 6, 70) }))
  function drawTitle(t) {
    if (t > 3.7) return
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
    FLOAT.forEach((f, i) => {
      if (t < f.t0) return
      const k = pop01(t, f.t0, 0.42) * outScale(t, T.q0Out + i * 0.04)
      if (k <= 0) return
      const bx = f.x + 14 * Math.sin(t * 1.3 + i), by = f.y + 22 * Math.sin(t * 1.7 + i * 2)
      x.save(); x.translate(bx, by); x.rotate((f.sp * (t - f.t0) + 10 * i) * D2R); x.scale(k, k)
      x.shadowColor = f.c; x.shadowBlur = 26; x.fillStyle = f.c; x.font = `bold ${f.s}px ${GLYPH_FONT}`
      x.fillText(f.g + '︎', 0, 0); x.restore()
      drawBurst(x, f.b, bx, by, t, f.t0, f.c, 0.6)
    })
    // the gold "?" tumbling slowly in the middle
    const qk = t >= T.q0 ? pop01(t, T.q0, 0.5) * outScale(t, T.q0Out + 0.1) : 0
    if (qk > 0) {
      const by = 1040 + 26 * Math.sin((t - T.q0) * 2.2)
      x.save(); x.translate(540, by); x.rotate((18 * Math.sin((t - T.q0) * 1.6) + 40 * (t - T.q0)) * D2R); x.scale(qk, qk)
      x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 40; x.fillStyle = GOLD; x.font = `800 300px ${INTER}`
      x.fillText('?', 0, 0); x.restore()
    }
    x.restore()
  }

  // ── Q1: top-down Sun, Earth, the zodiac band and a line of sight
  const S1 = { cx: 540, cy: 1040, rIn: 345, rOut: 430, orbit: 205 }
  const B_SUN = B(10, 10, 120), B_EARTH = B(11), B_TAU = B(12, 12, 140), B_CAL = B(13)
  function drawQ1(t) {
    if (t < T.sun - 0.05 || t > T.q1Out + 0.6) return
    const { cx, cy } = S1
    const outAll = i => outScale(t, T.q1Out + i * 0.05)
    // band
    const lit = i => i === 1 ? ease.outCubic(prog(t, T.taurus, T.taurus + 0.25)) * (0.85 + 0.15 * Math.sin((t - T.taurus) * 6)) : 0
    drawBand(x, cx, cy, S1.rIn, S1.rOut, 52, i => pop01(t, T.band0 + i * T.bandGap, 0.36) * outAll(0), lit)
    // Earth's orbit (dashed, draws in)
    const ok = ease.inOutCubic(prog(t, ...T.orbit)) * outAll(1)
    if (ok > 0) {
      x.save(); glowStroke(x, BONE, 4, 10); x.globalAlpha = 0.55 * clamp(ok * 1.5); x.setLineDash([16, 18])
      x.beginPath(); x.arc(cx, cy, S1.orbit, angOf(EARTH_LON - 200), angOf(EARTH_LON - 200 + 360 * clamp(ok)), true); x.stroke(); x.restore()
    }
    // line of sight: Earth → Sun → the band (lands in Taurus)
    const ePos = at(cx, cy, lerp(EARTH_LON - 70, EARTH_LON, easeOutBack(prog(t, ...T.earthMove), 1.5)), S1.orbit)
    const sk = ease.inOutCubic(prog(t, ...T.sight)) * outAll(1)
    if (sk > 0) {
      const end = at(cx, cy, SUN_LON, (S1.rIn + S1.rOut) / 2)
      x.save(); glowStroke(x, GOLD, 6, 18); x.globalAlpha = 0.95; x.setLineDash([22, 16]); x.lineDashOffset = -t * 60
      x.beginPath(); x.moveTo(ePos.x, ePos.y); x.lineTo(lerp(ePos.x, end.x, sk), lerp(ePos.y, end.y, sk)); x.stroke()
      x.setLineDash([])
      // a little eye-ish chevron at Earth's end (an arrowhead pointing along the sight line, no face)
      if (sk >= 1) {
        const a = Math.atan2(end.y - ePos.y, end.x - ePos.x), tip = { x: end.x - Math.cos(a) * 30, y: end.y - Math.sin(a) * 30 }
        x.beginPath(); x.moveTo(tip.x - Math.cos(a - 0.5) * 34, tip.y - Math.sin(a - 0.5) * 34); x.lineTo(tip.x, tip.y); x.lineTo(tip.x - Math.cos(a + 0.5) * 34, tip.y - Math.sin(a + 0.5) * 34); x.stroke()
      }
      x.restore()
      drawBurst(x, B_TAU, end.x, end.y, t, T.taurus - 0.02, TAU.color, 0.8)
    }
    // the Sun (big, centre) and Earth (small, blue)
    const sunK = t >= T.sun ? pop01(t, T.sun, 0.45) * outAll(2) : 0
    orb(x, cx, cy, 70 * sunK * (1 + 0.03 * Math.sin(t * 4)), GOLD, clamp(sunK * 2), 3.2)
    drawBurst(x, B_SUN, cx, cy, t, T.sun, GOLD, 0.7)
    if (t >= T.earth) {
      const ek = pop01(t, T.earth, 0.4) * outAll(3)
      orb(x, ePos.x, ePos.y, 28 * ek, EARTH, clamp(ek * 2), 3.4)
      if (ek > 0.2) {   // a tiny green continent so it reads as Earth
        x.save(); x.globalAlpha = clamp(ek); x.beginPath(); x.arc(ePos.x, ePos.y, 28 * ek, 0, Math.PI * 2); x.clip()
        x.fillStyle = 'rgba(70,200,140,0.75)'; x.beginPath(); x.ellipse(ePos.x - 6 * ek, ePos.y + 4 * ek, 12 * ek, 8 * ek, 0.6, 0, Math.PI * 2); x.fill(); x.restore()
      }
      drawBurst(x, B_EARTH, ePos.x, ePos.y, t, T.earth, EARTH, 0.6)
      // label
      x.save(); x.globalAlpha = clamp(ek * 2) * outK(t, [T.sight[0], T.sight[0] + 0.2]); x.font = `800 42px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'
      x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12; x.fillText('Earth', ePos.x + 6, ePos.y + 76); x.restore()
    }
    // MAY 12 page flips in beside Earth, with a little tail
    if (t >= T.cal) {
      const fk = easeOutBack(prog(t, T.cal, T.cal + 0.45), 2.2), ck = outAll(4)
      const px = 845, py = 700
      x.save(); glowStroke(x, BONE, 4, 8); x.globalAlpha = 0.7 * clamp(fk) * clamp(ck); x.setLineDash([8, 10])
      x.beginPath(); x.moveTo(px - 70, py + 80); x.lineTo(ePos.x + 30, ePos.y - 24); x.stroke(); x.restore()
      drawPage(x, px, py, 190 * ck, 210 * ck, 'MAY', '12', fk, clamp(ck * 2))
      drawBurst(x, B_CAL, px, py, t, T.cal + 0.15, ROSE, 0.6)
    }
    // "TAURUS ♉" pops big in the empty quadrant
    if (t >= T.taurus) {
      const k = pop01(t, T.taurus, 0.45) * outAll(5)
      const wob = 6 * Math.sin((t - T.taurus) * 13) * Math.exp(-(t - T.taurus) * 3.5)
      x.save(); x.translate(540, 488); x.rotate(wob * D2R); x.scale(k, k); x.globalAlpha = clamp(k * 2)
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = rgba(TAU.color, 0.7); x.shadowBlur = 30; x.fillStyle = TAU.color
      x.font = `800 100px ${INTER}`; const w = x.measureText('TAURUS').width
      x.fillText('TAURUS', -40, 0); x.font = `bold 100px ${GLYPH_FONT}`; x.fillText(TAU.glyph + '︎', w / 2 + 16, 4)
      x.restore()
    }
  }

  // ── Q2a: a flipping calendar while the Moon hops from sign to sign
  const STRIP = ['scorpio', 'sagittarius', 'capricorn', 'aquarius'].map(sign)
  const SX = i => 540 + (i - 1.5) * 232, SY = 1235
  const B_MOON = HOPS.map((_, i) => B(20 + i)), B_DAY = B(25, 6, 80)
  function drawQ2a(t) {
    if (t < T.cal2 - 0.05 || t > T.q2aOut + 0.5) return
    const d = dayAt(t)
    // the sign strip
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
    STRIP.forEach((s, i) => {
      const k = pop01(t, T.cal2 + 0.1 + i * 0.07, 0.36) * outScale(t, T.q2aOut + i * 0.04)
      if (k <= 0) return
      const moonHere = (d < HOPS[0] ? 0 : d < HOPS[1] ? 1 : d < HOPS[2] ? 2 : 3) === i
      const L = moonHere ? 1 : 0
      x.save(); x.translate(SX(i), SY); x.scale(k, k); x.globalAlpha = clamp(k * 2)
      x.beginPath(); x.roundRect(-102, -96, 204, 192, 26)
      x.fillStyle = rgba(s.color, 0.24 + 0.32 * L); x.fill()
      glowStroke(x, L ? s.color : BONE, 6, 10 + 18 * L); x.globalAlpha = clamp(k * 2) * (0.8 + 0.2 * L); x.stroke()
      x.shadowBlur = 0; x.globalAlpha = clamp(k * 2)
      x.fillStyle = s.color; x.font = `bold 92px ${GLYPH_FONT}`; x.fillText(s.glyph + '︎', 0, 6)
      x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.fillText(s.name.toUpperCase(), 0, 128)
      x.restore()
    })
    x.restore()
    // the calendar page (flips each day)
    const ck = pop01(t, T.cal2, 0.42) * outScale(t, T.q2aOut + 0.1)
    if (ck > 0) {
      const day = Math.min(DAYS, Math.floor(d)) + 1, ft = d - Math.floor(d)
      const flip = t < T.days[0] || d >= DAYS ? 1 : ease.outCubic(clamp(ft / 0.35))
      // the page underneath, then the new page hinging down over it
      if (flip < 1) drawPage(x, 540, 830, 300 * ck, 300 * ck, 'DAY', String(day - 1), 1, clamp(ck * 2))
      drawPage(x, 540, 830, 300 * ck, 300 * ck, 'DAY', String(day), flip, clamp(ck * 2))
      if (flip < 1 && day > 1) drawBurst(x, B_DAY, 540, 700, t, T.days[0] + (day - 1) / DAYS * (T.days[1] - T.days[0]), BONE, 0.4)
    }
    // the Moon hops panel to panel (squash on landing)
    const mk = pop01(t, T.cal2 + 0.35, 0.4) * outScale(t, T.q2aOut + 0.16)
    if (mk > 0 && t >= T.cal2 + 0.35) {
      const hopDur = 0.34 * DAYS / (T.days[1] - T.days[0])         // in days
      let px = SX(0), py = SY - 2, sq = 1
      for (let h = 0; h < HOPS.length; h++) {
        const p = clamp((d - HOPS[h] + hopDur / 2) / hopDur)
        if (p > 0) { px = lerp(SX(h), SX(h + 1), ease.inOutQuad(p)); py = SY - 2 - 190 * Math.sin(Math.PI * p) }
        const land = (d - HOPS[h] - hopDur / 2) / hopDur
        if (land > 0 && land < 0.6) sq = 1 - 0.2 * Math.sin(Math.PI * land / 0.6)
      }
      x.save(); x.translate(px, py); x.scale(1 / sq, sq); orb(x, 0, 0, 36 * mk, SILVER, clamp(mk * 2), 3.4); x.restore()
      HOPS.forEach((hd, h) => drawBurst(x, B_MOON[h], SX(h + 1), SY, t, T.days[0] + (hd + hopDur / 2) / DAYS * (T.days[1] - T.days[0]), SILVER, 0.55))
    }
  }

  // ── Q2b: a spinning Earth; the pin-person's horizon sweeps the band; ~2 HRS stopwatch
  const S2 = { cx: 540, cy: 1085, rE: 140, rIn: 300, rOut: 380 }
  const CONT = (() => { const r = rng(91); return Array.from({ length: 6 }, (_, i) => ({ a: i * 1.05 + r() * 0.4, d: 40 + r() * 70, rx: 30 + r() * 30, ry: 18 + r() * 22, rot: r() * 3 })) })()
  const B_RISE = ASC_CROSS.map((_, i) => B(30 + i, 8, 90)), B_GLOBE = B(35, 10, 120)
  function drawQ2b(t) {
    if (t < T.globe - 0.05 || t > T.q2bOut + 0.5) return
    const { cx, cy, rE } = S2
    const out = i => outScale(t, T.q2bOut + i * 0.05)
    const asc = ascAt(t), ascSign = Math.floor(asc / 30)
    const tangentReach = Math.atan(Math.sqrt(((S2.rIn + S2.rOut) / 2) ** 2 - rE ** 2) / rE)
    const aP = angOf(asc) + tangentReach                          // the pin-person's screen angle on the globe
    // band around Earth; the rising panel lights
    const litK = ease.outCubic(prog(t, T.spin[0] - 0.3, T.spin[0]))
    drawBand(x, cx, cy, S2.rIn, S2.rOut, 46, i => pop01(t, T.globe + 0.1 + i * 0.035, 0.34) * out(0), i => i === ascSign ? litK : 0)
    // the globe (continents turn with it)
    const gk = pop01(t, T.globe, 0.45) * out(1)
    if (gk > 0) {
      x.save(); x.translate(cx, cy); x.scale(gk, gk)
      const gg = x.createRadialGradient(-40, -50, 10, 0, 0, rE)
      gg.addColorStop(0, '#9fd0ff'); gg.addColorStop(0.5, EARTH); gg.addColorStop(1, '#2350a8')
      x.globalAlpha = clamp(gk * 2); x.fillStyle = gg; x.beginPath(); x.arc(0, 0, rE, 0, Math.PI * 2); x.fill()
      x.save(); x.clip(); x.rotate(aP + Math.PI / 2)
      x.fillStyle = 'rgba(80,210,150,0.8)'
      for (const c of CONT) { x.beginPath(); x.ellipse(Math.cos(c.a) * c.d, Math.sin(c.a) * c.d, c.rx, c.ry, c.rot, 0, Math.PI * 2); x.fill() }
      x.restore()
      glowStroke(x, BONE, 7, 18); x.beginPath(); x.arc(0, 0, rE, 0, Math.PI * 2); x.stroke()
      x.restore()
      drawBurst(x, B_GLOBE, cx, cy, t, T.globe, EARTH, 0.6)
    }
    // the pin-person and their horizon (tangent at their feet, east end marked)
    const pk = pop01(t, T.globe + 0.3, 0.4) * out(2)
    if (pk > 0 && t >= T.globe + 0.3) {
      const nx = Math.cos(aP), ny = Math.sin(aP), feet = { x: cx + nx * rE, y: cy + ny * rE }
      const ex = Math.cos(aP - Math.PI / 2), ey = Math.sin(aP - Math.PI / 2)    // east along the horizon
      const L = Math.sqrt(((S2.rIn + S2.rOut) / 2) ** 2 - rE ** 2) * clamp(pk)
      x.save(); glowStroke(x, GOLD, 6, 18); x.globalAlpha = 0.95 * clamp(pk)
      x.beginPath(); x.moveTo(feet.x - ex * L, feet.y - ey * L); x.lineTo(feet.x + ex * L, feet.y + ey * L); x.stroke()
      // the eastern end: an arrowhead + glow dot where the horizon meets the band
      const E = { x: feet.x + ex * L, y: feet.y + ey * L }
      x.beginPath(); x.moveTo(E.x - ex * 26 + nx * 18, E.y - ey * 26 + ny * 18); x.lineTo(E.x, E.y); x.lineTo(E.x - ex * 26 - nx * 18, E.y - ey * 26 - ny * 18); x.stroke()
      x.restore()
      // pictogram figure standing along the normal (no face)
      x.save(); x.translate(feet.x, feet.y); x.rotate(aP + Math.PI / 2); x.scale(pk * 1.45, pk * 1.45)
      glowStroke(x, BONE, 5, 12)
      x.beginPath(); x.moveTo(-12, -2); x.lineTo(0, -26); x.lineTo(12, -2); x.moveTo(0, -26); x.lineTo(0, -56); x.moveTo(-16, -44); x.lineTo(16, -44); x.stroke()
      x.fillStyle = BONE; x.beginPath(); x.arc(0, -72, 13, 0, Math.PI * 2); x.fill()
      x.restore()
      ASC_CROSS.forEach((tc, i) => { const p = at(cx, cy, 30 * (i + 1) + 15, (S2.rIn + S2.rOut) / 2); drawBurst(x, B_RISE[i], p.x, p.y, t, tc, SIGNS[i + 1].color, 0.55) })
    }
    // the stopwatch: one sweep per sign, "~2 HRS"
    const wk = pop01(t, T.globe + 0.2, 0.42) * out(3)
    if (wk > 0 && t >= T.globe + 0.2) {
      const sx = 885, sy = 650, R = 62
      const bump = ASC_CROSS.reduce((m, tc) => Math.max(m, Math.sin(Math.PI * prog(t, tc, tc + 0.3))), 0)
      x.save(); x.translate(sx, sy); x.scale(wk * (1 + 0.1 * bump), wk * (1 + 0.1 * bump)); x.globalAlpha = clamp(wk * 2)
      x.fillStyle = 'rgba(14,10,32,0.8)'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
      glowStroke(x, BONE, 7, 14); x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.stroke()
      x.beginPath(); x.moveTo(0, -R - 4); x.lineTo(0, -R - 18); x.moveTo(-14, -R - 20); x.lineTo(14, -R - 20); x.stroke()
      const ha = ((asc - ASC0) / 30) * Math.PI * 2
      glowStroke(x, GOLD, 7, 12); x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(ha) * (R - 16), -Math.cos(ha) * (R - 16)); x.stroke()
      x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 8, 0, Math.PI * 2); x.fill()
      x.shadowBlur = 10; x.shadowColor = 'rgba(6,4,18,0.95)'
      x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('~2 HRS', 0, R + 44)
      x.restore()
    }
  }

  // ── cards: SUN ♉ TAURUS · MOON ♐ SAGITTARIUS · RISING ♎ LIBRA deal in and fan out
  const CARDS = [
    { role: 'SUN', s: TAU, rim: GOLD, x: 225, y: 1090, rot: -9 },
    { role: 'MOON', s: SAG, rim: SILVER, x: 540, y: 1030, rot: 0 },
    { role: 'RISING', s: LIB, rim: LIB.color, x: 855, y: 1090, rot: 9 },
  ].map((c, i) => ({ ...c, t0: T.cards[i], b: B(40 + i, 10, 130) }))
  function drawCards(t) {
    if (t < T.cards[0] - 0.05 || t > T.cardsOut + 0.9) return
    // draw back to front: left, right, then centre on top
    for (const i of [0, 2, 1]) {
      const c = CARDS[i]
      if (t < c.t0) continue
      const p = prog(t, c.t0, c.t0 + 0.5), e = easeOutBack(p, 1.8)
      const o = prog(t, T.cardsOut + i * 0.1, T.cardsOut + i * 0.1 + 0.5), oe = ease.inCubic(o)
      if (o >= 1) continue
      const bob = 8 * Math.sin((t - c.t0) * 2.4 + i)
      const cx = lerp(540, c.x, e) + (i - 1) * 500 * oe, cy = lerp(2200, c.y, e) + bob - 1300 * oe
      const rot = lerp(c.rot * 3 - 30, c.rot, e) + (i - 1 || 0.6) * 40 * oe
      const w = 280, h = 410
      x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.globalAlpha = clamp(p * 4) * (1 - ease.inQuad(o))
      x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
      x.fillStyle = 'rgba(16,12,36,0.86)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 30); x.fill()
      x.shadowOffsetY = 0
      const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(c.rim, 0.22)); gr.addColorStop(1, rgba(c.rim, 0.04))
      x.fillStyle = gr; x.fill()
      glowStroke(x, c.rim, 9, 26); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 30); x.stroke()
      x.shadowBlur = 0; x.lineWidth = 2; x.globalAlpha *= 0.4; x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 20); x.stroke()
      x.globalAlpha = clamp(p * 4) * (1 - ease.inQuad(o))
      x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = c.rim; x.font = `700 36px ${MONO}`; x.fillText(c.role, 0, -h / 2 + 58)
      x.shadowColor = c.s.color; x.shadowBlur = 30; x.fillStyle = c.s.color; x.font = `bold 170px ${GLYPH_FONT}`; x.fillText(c.s.glyph + '︎', 0, 4)
      x.shadowBlur = 0; x.fillStyle = BONE; x.font = `800 ${c.s.name.length > 8 ? 33 : 48}px ${INTER}`; x.fillText(c.s.name.toUpperCase(), 0, h / 2 - 66)
      x.restore()
      drawBurst(x, c.b, c.x, c.y, t, c.t0 + 0.3, c.rim, 0.7)
    }
  }

  return {
    start: START, end: END, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3.4))
      drawSky(x, t, t < 3.4 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < SETTLE) { drawTitle(t); drawQ1(t); drawQ2a(t); drawQ2b(t); drawCards(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.5)))
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
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const dayT = d => +(T.days[0] + d / DAYS * (T.days[1] - T.days[0])).toFixed(3)
export const CUES = [
  ...wordPops(0.45, 2, 0.07, 0),
  ['pluck', BEAT(1), 1174.66, 0.05, 0.6, 0], ['pop', BEAT(1), 1318.51, 0.05, 0],                 // dummies.
  ['pop', BEAT(2), 740, 0.045, -0.3], ['pop', BEAT(2) + 0.14, 880, 0.045, 0.3], ['pop', BEAT(3), 987.77, 0.045, -0.3], ['pop', BEAT(3) + 0.14, 1174.66, 0.045, 0.3], ['pop', BEAT(4), 1318.51, 0.04, 0],
  ['pluck', T.q0, 587.33, 0.04, 0.5, 0],
  ...wordPops(3.62, 3, 0.07, 1),
  ['pop', T.sun, 587.33, 0.06, 0], ['glitter', T.sun, T.sun + 0.5],
  ...SIGNS.map((_, i) => ['pop', +(T.band0 + i * T.bandGap).toFixed(3), [587.33, 659.25, 739.99, 880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98, 1174.66, 1318.51, 1396.91][i], 0.025, (i % 2 ? 0.2 : -0.2)]),
  ['whoosh', T.orbit[0], 0.45, 0.03],
  ['pop', T.earth, 880, 0.06, 0.2], ['pop', T.cal, 1174.66, 0.05, 0.3], ['tick', T.cal + 0.2, 0.04],
  ['whoosh', T.sight[0], 0.5, 0.035],
  ['pluck', T.taurus, 880, 0.055, 0.7, 0], ['pop', T.taurus, 1174.66, 0.06, -0.2], ['glitter', T.taurus, T.taurus + 0.8],
  ...wordPops(6.75, 3, 0.06, 2, 0.022),
  ...wordPops(9.05, 4, 0.07, 3),
  ['pop', T.cal2, 987.77, 0.05, 0],
  ...Array.from({ length: DAYS }, (_, d) => ['tick', dayT(d + 0.02), 0.035]),
  ...HOPS.map((h, i) => ['pop', dayT(h), [659.25, 880, 1174.66][i], 0.06, (i - 1) * 0.3]),
  ['pop', T.globe, 587.33, 0.06, 0], ['pop', T.globe + 0.2, 1318.51, 0.045, 0.3],
  ['whoosh', T.spin[0], T.spin[1] - T.spin[0], 0.035],
  ...ASC_CROSS.map((tc, i) => ['pop', +tc.toFixed(3), [740, 880, 987.77][i], 0.06, -0.25]),
  ...ASC_CROSS.map(tc => ['tick', +(tc + 0.02).toFixed(3), 0.03]),
  ...wordPops(14.65, 4, 0.07, 0),
  ...T.cards.map((tc, i) => ['whoosh', +(tc - 0.05).toFixed(3), 0.35, 0.03]),
  ...T.cards.map((tc, i) => ['pop', +(tc + 0.3).toFixed(3), [740, 880, 1108.73][i], 0.06, (i - 1) * 0.3]),
  ['glitter', 17.1, 17.9], ['pluck', 17.15, 587.33, 0.045, 0.7, 0],
  ['whoosh', T.cardsOut, 0.7, 0.04],
]
