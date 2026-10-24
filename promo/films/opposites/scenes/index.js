// opposites (15 s, vertical): "Meet your opposite sign." A seesaw tips back and forth as the six opposite pairs drop onto it
// (old pair flung off, new pair lands, the plank slams) → "Six sides of the same coin." A gold coin, ♉ on one face, tossed and
// landing on ♏ → end line "Opposites attract. Sometimes." with ♉ and ♏ snapping together like magnets, then bonking apart.
// Sky SKY_H + grain GRAIN_H, DOM type above one canvas. Pure f(t); no document access at module top level.
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { W, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, ELEMENT_COLOR, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'

export const DURATION = 15
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', INK = '#1a1430'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const VS = '︎'
const D2R = Math.PI / 180
const BEAT = n => 0.6 + n * 0.5556  // 108 bpm grid
const sign = id => SIGNS.find(s => s.id === id)
const TAU = sign('taurus'), SCO = sign('scorpio')

// ── beats
const PAIRS = [['aries', 'libra'], ['taurus', 'scorpio'], ['gemini', 'sagittarius'], ['cancer', 'capricorn'], ['leo', 'aquarius'], ['virgo', 'pisces']]
  .map(([a, b]) => [sign(a), sign(b)])
const STEP = 0.5556 * 1.5                       // a pair every dotted beat (≈0.83 s)
const PT = PAIRS.map((_, i) => BEAT(1) + i * STEP)   // landing times (the plank slams)
const T = {
  saw: 0.42, sawOut: 6.3, headOut: [6.28, 6.46],
  coin: BEAT(11), toss: BEAT(13), land: BEAT(15), coinOut: 10.18, subOut: [10.15, 10.33],
  split: 10.3, endW: BEAT(18), snap: BEAT(20), bonk: BEAT(21),
  fade: [14.3, 15],
}
const TILT = 13 * D2R
const SIDE_DOWN = i => (i % 2 ? 1 : -1)        // even pairs: left end slams down; odd: right end

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }
const wob = (t, t0, amp = 8, f = 13, d = 3.4) => t < t0 ? 0 : amp * Math.sin((t - t0) * f) * Math.exp(-(t - t0) * d)

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
    drawPixelStar(x, Math.round(px + Math.cos(q.a) * q.d * e), Math.round(py + Math.sin(q.a) * q.d * e), q.size, q.kind, color)
  }
  x.restore()
}

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break. times[i] overrides a word's time; big[i] pops it big with a wobble */
function popText(parent, text, { top, size, font = INTER, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, times = {}, big = {}, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.04, color, textShadow: SHADOW, letterSpacing: '-0.015em' }, parent)
  let n = 0
  const ws = []
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.1) + 'px', color: accentColor, letterSpacing: '0', textShadow: `0 0 30px ${rgba(accentColor, 0.45)}, ${SHADOW}` })
    ws.push({ t: times[n] ?? t0 + n * gap, big: !!big[n], e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 - 0.01 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big ? wob(t, w.t, 9, 14, 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

/** a sign token: glowing disc in the sign colour with a big glyph */
function token(x, px, py, r, s, k = 1, rot = 0, sq = 1, a = 1) {
  if (k <= 0 || a <= 0) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(k / sq, k * sq); x.globalAlpha = clamp(a)
  const g = x.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r)
  g.addColorStop(0, rgba(s.color, 0.55)); g.addColorStop(1, rgba(s.color, 0.22))
  x.fillStyle = 'rgba(14,10,32,0.75)'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = g; x.fill()
  glowStroke(x, s.color, 8, 26); x.stroke()
  x.shadowBlur = 0; x.lineWidth = 2.5; x.globalAlpha = clamp(a) * 0.45; x.beginPath(); x.arc(0, 0, r - 16, 0, Math.PI * 2); x.stroke()
  x.globalAlpha = clamp(a)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = s.color; x.shadowBlur = 24; x.fillStyle = '#fff6ea'; x.font = `bold ${Math.round(r * 1.25)}px ${GLYPH_FONT}`
  x.fillText(s.glyph + VS, 0, r * 0.06)
  x.restore()
}

/** a line-art heart (pink, flat fill). split 0..1 cracks it into two halves that tilt apart */
function heart(x, px, py, s, k, split = 0) {
  if (k <= 0) return
  const path = () => {
    x.beginPath(); x.moveTo(0, 0.95)
    x.bezierCurveTo(-0.15, 0.75, -1, 0.35, -1, -0.2); x.bezierCurveTo(-1, -0.75, -0.3, -0.95, 0, -0.45)
    x.bezierCurveTo(0.3, -0.95, 1, -0.75, 1, -0.2); x.bezierCurveTo(1, 0.35, 0.15, 0.75, 0, 0.95); x.closePath()
  }
  for (const side of [-1, 1]) {
    x.save(); x.translate(px + side * 40 * split, py + 10 * split); x.rotate(side * 0.35 * split); x.scale(s * k, s * k)
    x.beginPath()
    if (split > 0) { // clip along a zig-zag crack
      const zz = [[0, -0.5], [0.12, -0.25], [-0.1, 0], [0.12, 0.25], [-0.05, 0.5], [0, 1]]
      x.moveTo(0, -1.2); zz.forEach(([a, b]) => x.lineTo(a, b)); x.lineTo(0, 1.2); x.lineTo(side * 1.3, 1.2); x.lineTo(side * 1.3, -1.2); x.closePath(); x.clip()
    }
    path(); x.fillStyle = rgba(PINK, 0.35); x.fill()
    glowStroke(x, PINK, 7 / (s * k), 24); x.stroke()
    x.restore()
  }
}

/** the gold coin. phi = flip angle (0 → ♉ face, π → ♏ face) */
function coin(x, cx, cy, R, phi, k = 1) {
  if (k <= 0) return
  const c = Math.cos(phi), sx = Math.max(0.035, Math.abs(c)), front = c >= 0
  const face = front ? TAU : SCO
  const edge = 26 * Math.sin(phi)      // thickness shows as the coin turns
  x.save(); x.translate(cx, cy); x.scale(k, k)
  // halo
  x.save(); x.globalCompositeOperation = 'lighter'
  const h = x.createRadialGradient(0, 0, R * 0.6, 0, 0, R * 2.1); h.addColorStop(0, rgba(GOLD, 0.32)); h.addColorStop(1, rgba(GOLD, 0))
  x.fillStyle = h; x.beginPath(); x.arc(0, 0, R * 2.1, 0, Math.PI * 2); x.fill(); x.restore()
  // edge (a stack of darker discs)
  const steps = 10
  for (let i = steps; i >= 1; i--) {
    x.save(); x.translate(edge * i / steps, 0); x.scale(sx, 1)
    x.fillStyle = i % 3 ? '#a8771e' : '#c8922c'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill(); x.restore()
  }
  // face
  x.save(); x.scale(sx, 1)
  const g = x.createRadialGradient(-R * 0.35, -R * 0.4, R * 0.1, 0, 0, R)
  g.addColorStop(0, '#fff2c4'); g.addColorStop(0.45, GOLD); g.addColorStop(1, '#c9932e')
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
  glowStroke(x, '#fff0c0', 7, 18); x.stroke()
  x.shadowBlur = 0; x.strokeStyle = rgba('#8a5c12', 0.7); x.lineWidth = 6; x.beginPath(); x.arc(0, 0, R - 26, 0, Math.PI * 2); x.stroke()
  // dotted rim
  x.fillStyle = rgba('#8a5c12', 0.65)
  for (let i = 0; i < 36; i++) { const a = i / 36 * Math.PI * 2; x.beginPath(); x.arc(Math.cos(a) * (R - 13), Math.sin(a) * (R - 13), 3.5, 0, Math.PI * 2); x.fill() }
  // glyph
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `bold ${Math.round(R * 1.15)}px ${GLYPH_FONT}`
  x.fillStyle = rgba('#fff8e0', 0.6); x.fillText(face.glyph + VS, 3, R * 0.07 + 4)
  x.fillStyle = front ? '#7a4a10' : '#8c1f3c'; x.fillText(face.glyph + VS, 0, R * 0.07)
  // shine sweep
  x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.18 + 0.2 * Math.abs(Math.sin(phi * 2))
  const sh = x.createLinearGradient(-R, -R, R, R); sh.addColorStop(0.3, 'rgba(255,255,255,0)'); sh.addColorStop(0.5, 'rgba(255,255,255,0.9)'); sh.addColorStop(0.7, 'rgba(255,255,255,0)')
  x.fillStyle = sh; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
  x.restore()
  x.restore()
}

/** a bold canvas label with a dark halo, clamped inside the side margins */
function label(x, txt, px, py, size, color, a = 1, k = 1, font = INTER, weight = 800) {
  if (a <= 0 || k <= 0) return
  x.save(); x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(txt).width * k
  px = clamp(px, 80 + w / 2, W - 80 - w / 2)
  x.translate(px, py); x.scale(k, k); x.globalAlpha = clamp(a)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 14; x.fillStyle = color; x.fillText(txt, 0, 0)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Meet your | *opposite* sign.', { top: 190, size: 128, accentSize: 150, at: 0.12, times: { 2: BEAT(0), 3: BEAT(0) + 0.14 }, big: { 2: true } })
  const P1 = popText(root, 'Six sides of | the same *coin.*', { top: TYPE.subY - 10, size: 74, font: INTER, weight: 800, accentSize: 84, at: T.coin + 0.05, gap: 0.07 })
  const E1 = popText(root, 'Opposites | *attract.*', { top: 180, size: 150, accentSize: 176, accentColor: PINK, at: T.endW, times: { 1: T.snap }, big: { 1: true } })
  const E2 = popText(root, 'Sometimes.', { top: 1470, size: 128, at: T.bonk, big: { 0: true } })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B = (k, n = 8, d = 90) => makeBurst(300 + k, n, d)

  // ── the seesaw
  const PIV = { x: 540, y: 1180 }, HALF = 450, AT = 330, TR = 124, PLANK = 30
  const tiltAt = t => {
    let th = 0
    PT.forEach((t0, i) => { const p = prog(t, t0 - 0.04, t0 + 0.62); if (p > 0) th += (SIDE_DOWN(i) * TILT - (i ? SIDE_DOWN(i - 1) * TILT : 0)) * ease.spring(p, 0.22) })
    return th
  }
  // where a token sits on the plank (side −1 left, +1 right)
  const seat = (side, th) => {
    const c = Math.cos(th), s = Math.sin(th)
    const lx = side * AT, ly = -(PLANK / 2 + TR - 4)
    return { x: PIV.x + lx * c - ly * s, y: PIV.y + lx * s + ly * c }
  }
  const B_LAND = PAIRS.map((_, i) => [B(10 + i * 2, 9, 120), B(11 + i * 2, 7, 100)])
  const B_SAW = B(40, 10, 140)
  // landing times per side: the slamming side first, then its partner
  const landT = (i, side) => side === SIDE_DOWN(i) ? PT[i] : PT[i] + 0.11
  const DROP = 0.24
  function drawSeesaw(t) {
    if (t < T.saw || t > T.sawOut + 0.6) return
    const sk = pop01(t, T.saw, 0.45) * outScale(t, T.sawOut + 0.08)
    if (sk <= 0) return
    const th = tiltAt(t)
    // fulcrum
    x.save(); x.translate(PIV.x, PIV.y); x.scale(sk, sk)
    x.beginPath(); x.moveTo(0, 6); x.lineTo(-108, 178); x.lineTo(108, 178); x.closePath()
    x.fillStyle = rgba(GOLD, 0.28); x.fill(); glowStroke(x, GOLD, 8, 20); x.stroke()
    x.beginPath(); x.moveTo(-170, 182); x.lineTo(170, 182); glowStroke(x, BONE, 7, 12); x.stroke()
    x.shadowBlur = 0; x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 16, 0, Math.PI * 2); x.fill()
    x.restore()
    // plank
    x.save(); x.translate(PIV.x, PIV.y); x.rotate(th); x.scale(sk, sk)
    x.beginPath(); x.roundRect(-HALF, -PLANK / 2, HALF * 2, PLANK, PLANK / 2)
    x.fillStyle = rgba(BONE, 0.22); x.fill(); glowStroke(x, BONE, 7, 18); x.stroke()
    // little end stops
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * (HALF - 18), -PLANK / 2); x.lineTo(sd * (HALF - 18), -PLANK / 2 - 22); x.stroke() }
    x.shadowBlur = 0; x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 9, 0, Math.PI * 2); x.fill()
    x.restore()
    drawBurst(x, B_SAW, PIV.x, PIV.y, t, T.saw, GOLD, 0.6)

    // tokens: each pair drops in, the previous pair is flung off
    PAIRS.forEach((pair, i) => {
      pair.forEach((s, j) => {
        const side = j ? 1 : -1
        const tl = landT(i, side), t0 = tl - DROP
        if (t < t0) return
        // leaving: flung when the next pair starts dropping (or at the end)
        const leaveAt = i < PAIRS.length - 1 ? PT[i + 1] - DROP - 0.02 : T.sawOut
        const lp = prog(t, leaveAt, leaveAt + 0.42)
        if (lp >= 1) return
        const st = seat(side, th)
        const fp = prog(t, t0, tl)
        let px = st.x, py = st.y - 820 * (1 - fp * fp), sq = 1, rot = 0
        if (fp >= 1) { const d = t - tl; sq = 1 + 0.2 * Math.sin(Math.min(1, d / 0.28) * Math.PI) * Math.exp(-d * 4) * (d < 0.28 ? 1 : 0) }
        else sq = 0.9
        if (lp > 0) {
          const e = ease.outCubic(lp)
          px += side * 760 * e; py += -240 * e + 1300 * lp * lp; rot = side * 3.4 * e
        }
        token(x, px, py, TR, s, 1, rot + (lp > 0 ? 0 : th * 0.6), sq, 1 - ease.inQuad(lp))
        if (fp >= 1) drawBurst(x, B_LAND[i][j], st.x, st.y + 30, t, tl, s.color, 0.6)
        // name above the token
        const nk = pop01(t, tl, 0.3) * (1 - clamp(lp * 3))
        if (nk > 0 && t >= tl) {
          const size = s.name.length > 8 ? 52 : 66
          label(x, s.name.toUpperCase(), st.x, st.y - TR - 62 - 8 * Math.sin(Math.PI * clamp((t - tl) / 0.3)), size, s.color, clamp(nk * 2), nk)
        }
      })
      // the element pairing under the fulcrum + the opposite double arrow between the names
      const a = pair[0], b = pair[1]
      const lk = (t >= PT[i] + 0.05 ? pop01(t, PT[i] + 0.05, 0.3) : 0) * (1 - clamp(prog(t, i < 5 ? PT[i + 1] - 0.2 : T.sawOut, (i < 5 ? PT[i + 1] - 0.2 : T.sawOut) + 0.1)))
      if (lk > 0) {
        x.save(); x.font = `700 46px ${MONO}`
        const ea = a.el.toUpperCase(), eb = b.el.toUpperCase()
        const wa = x.measureText(ea).width, wb = x.measureText(eb).width, gapW = 110, tot = wa + wb + gapW
        x.translate(540, 1460); x.scale(lk, lk); x.globalAlpha = clamp(lk * 2)
        x.textBaseline = 'middle'; x.textAlign = 'left'; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12
        x.fillStyle = ELEMENT_COLOR[a.el]; x.fillText(ea, -tot / 2, 0)
        x.fillStyle = ELEMENT_COLOR[b.el]; x.fillText(eb, -tot / 2 + wa + gapW, 0)
        const ax0 = -tot / 2 + wa + 22, ax1 = ax0 + gapW - 44
        glowStroke(x, BONE, 5, 8)
        x.beginPath(); x.moveTo(ax0, 0); x.lineTo(ax1, 0); x.moveTo(ax0 + 14, -12); x.lineTo(ax0, 0); x.lineTo(ax0 + 14, 12); x.moveTo(ax1 - 14, -12); x.lineTo(ax1, 0); x.lineTo(ax1 - 14, 12); x.stroke()
        x.restore()
      }
    })
    // six progress dots
    for (let i = 0; i < 6; i++) {
      const on = t >= PT[i] ? pop01(t, PT[i], 0.3) : 0
      const px = 540 + (i - 2.5) * 64, py = 1555
      x.save(); x.translate(px, py); x.scale(sk * (1 + 0.5 * on * Math.exp(-(t - PT[i]) * 5) * (t >= PT[i] ? 1 : 0)), sk)
      x.beginPath(); x.arc(0, 0, 16, 0, Math.PI * 2)
      x.fillStyle = on > 0 ? rgba(PAIRS[i][0].color, 0.9) : 'rgba(239,230,214,0.12)'; x.fill()
      glowStroke(x, on > 0 ? PAIRS[i][0].color : BONE, 3, on > 0 ? 14 : 0); x.globalAlpha = on > 0 ? 1 : 0.5; x.stroke()
      x.restore()
    }
  }

  // ── the coin: pops in on ♉, tossed (spins), lands on ♏
  const CO = { x: 540, y: 960, R: 230 }
  const SPINS = 5 * Math.PI     // ends on the back face
  const B_COIN = B(50, 12, 200), B_LANDC = B(51, 14, 260)
  const coinPhi = t => {
    const idle = 0.18 * Math.sin((t - T.coin) * 3.2) * Math.exp(-Math.max(0, t - T.coin) * 0.6)
    if (t < T.toss) return idle
    return SPINS * ease.outQuad(prog(t, T.toss, T.land)) + 0.12 * Math.sin((t - T.land) * 9) * Math.exp(-Math.max(0, t - T.land) * 5) * (t > T.land ? 1 : 0)
  }
  function drawCoin(t) {
    if (t < T.coin - 0.02 || t > T.coinOut + 0.4) return
    const k = pop01(t, T.coin, 0.45) * outScale(t, T.coinOut)
    // toss arc: crouch, up, down, bounce
    let y = CO.y
    if (t >= T.toss - 0.12) {
      const pre = prog(t, T.toss - 0.12, T.toss)
      const air = prog(t, T.toss, T.land)
      y += 30 * Math.sin(Math.PI * pre) * (air <= 0 ? 1 : 0)
      y -= 430 * 4 * air * (1 - air)
      if (t > T.land) y -= 40 * Math.abs(Math.sin((t - T.land) * 9)) * Math.exp(-(t - T.land) * 6)
    }
    const sq = t > T.land ? 1 - 0.1 * Math.sin(Math.min(1, (t - T.land) / 0.22) * Math.PI) : 1
    // shadow on the "table"
    x.save(); x.globalAlpha = 0.35 * k * (1 - 0.6 * clamp((CO.y - y) / 430)); x.fillStyle = '#000'
    x.beginPath(); x.ellipse(CO.x, CO.y + CO.R + 40, CO.R * 0.8 * (1 - 0.4 * clamp((CO.y - y) / 430)), 22, 0, 0, Math.PI * 2); x.fill(); x.restore()
    x.save(); x.translate(CO.x, y + CO.R); x.scale(1 / sq, sq); x.translate(-CO.x, -(y + CO.R))
    coin(x, CO.x, y, CO.R, coinPhi(t), k)
    x.restore()
    drawBurst(x, B_COIN, CO.x, CO.y, t, T.coin + 0.1, GOLD, 0.7)
    drawBurst(x, B_LANDC, CO.x, CO.y, t, T.land, SCO.color, 0.8)
    // the face's name under the coin
    const front = Math.cos(coinPhi(t)) >= 0
    const inAir = t > T.toss + 0.05 && t < T.land
    const nk1 = pop01(t, T.coin + 0.2, 0.3) * (1 - clamp(prog(t, T.toss, T.toss + 0.12)))
    const nk2 = (t >= T.land ? pop01(t, T.land, 0.32) : 0) * outScale(t, T.coinOut)
    if (!inAir) {
      if (front && nk1 > 0) label(x, 'TAURUS', CO.x, CO.y + CO.R + 120, 66, TAU.color, clamp(nk1 * 2), nk1, INTER)
      if (!front && nk2 > 0) label(x, 'SCORPIO', CO.x, CO.y + CO.R + 120, 66, SCO.color, clamp(nk2 * 2), nk2)
    }
    // "flip!" tag while airborne
    if (t > T.toss && t < T.land + 0.1) {
      const fk = pop01(t, T.toss, 0.25) * (1 - prog(t, T.land - 0.1, T.land + 0.1))
      label(x, 'FLIP!', 540, 1330, 64, GOLD, fk, fk, MONO, 700)
    }
  }

  // ── end: the coin splits into ♉ and ♏, they attract, snap (heart), then bonk apart (heart cracks)
  const TOK_Y = 1090, B_SNAP = B(60, 14, 220), B_BONK = B(61, 10, 160), B_SPLIT = B(62, 12, 200)
  const endX = (t, side) => {
    const split = ease.outCubic(prog(t, T.split, T.split + 0.45))
    let d = lerp(0, 330, split)                                  // fly apart from the coin
    const pull = ease.inCubic(prog(t, T.endW + 0.25, T.snap))     // magnetic pull, accelerating
    d = lerp(d, 136, pull)
    if (t > T.snap) d += -10 * Math.sin((t - T.snap) * 30) * Math.exp(-(t - T.snap) * 12)   // the clack
    const bonk = ease.spring(prog(t, T.bonk, T.bonk + 0.9), 0.2)   // boing! apart again
    d = lerp(d, 255, bonk)
    return 540 + side * d
  }
  function drawEnd(t) {
    if (t < T.split - 0.02) return
    const k = pop01(t, T.split, 0.4)
    const quiver = t > T.endW + 0.25 && t < T.snap ? 4 * Math.sin(t * 70) * prog(t, T.endW + 0.25, T.snap) : 0
    const bonkWob = t > T.bonk ? 0.35 * Math.sin((t - T.bonk) * 11) * Math.exp(-(t - T.bonk) * 2.4) : 0
    // magnetic field lines while they pull
    const fk = prog(t, T.endW + 0.1, T.endW + 0.35) * (1 - prog(t, T.snap - 0.05, T.snap + 0.05))
    if (fk > 0) {
      const xl = endX(t, -1) + 120, xr = endX(t, 1) - 120
      x.save(); glowStroke(x, PINK, 5, 14); x.globalAlpha = 0.8 * fk; x.setLineDash([14, 14]); x.lineDashOffset = -t * 90
      for (const dy of [-60, 0, 60]) { x.beginPath(); x.moveTo(xl, TOK_Y + dy); x.quadraticCurveTo(540, TOK_Y + dy * 1.8, xr, TOK_Y + dy); x.stroke() }
      x.restore()
    }
    token(x, endX(t, -1) + quiver, TOK_Y, 134, TAU, k, -bonkWob, 1, clamp(k * 2))
    token(x, endX(t, 1) - quiver, TOK_Y, 134, SCO, k, (bonkWob), 1, clamp(k * 2))
    drawBurst(x, B_SPLIT, 540, TOK_Y, t, T.split, GOLD, 0.6)
    drawBurst(x, B_SNAP, 540, TOK_Y, t, T.snap, PINK, 0.8)
    // heart pops above them on the snap; cracks on the bonk
    const hk = t >= T.snap ? pop01(t, T.snap, 0.4) : 0
    if (hk > 0) {
      const split = ease.outBack(prog(t, T.bonk, T.bonk + 0.35))
      const beat = 1 + 0.06 * Math.sin((t - T.snap) * 9) * (t < T.bonk ? 1 : 0)
      heart(x, 540, TOK_Y - 290 + 6 * Math.sin(t * 3), 112 * beat, hk, split)
      drawBurst(x, B_BONK, 540, TOK_Y - 290, t, T.bonk, PINK, 0.6)
    }
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, { ...SKY_H, zoom: lerp(1.62, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) })
      drawSeesaw(t); drawCoin(t); drawEnd(t)
      H0.update(t, outK(t, T.headOut))
      P1.update(t, outK(t, T.subOut))
      E1.update(t); E2.update(t)
      const fi = 1 - ease.inOutQuad(prog(t, 0, 0.4))
      const fo = t >= DURATION - 0.035 ? 1 : ease.inOutQuad(prog(t, ...T.fade))
      black.style.opacity = String(Math.max(fi, fo))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const PAIR_NOTES = [[880, 1174.66], [987.77, 1318.51], [739.99, 1108.73], [880, 1174.66], [987.77, 1479.98], [1174.66, 1760]]
export const CUES = [
  ...wordPops(0.12, 2, 0.07, 0),
  ['pop', BEAT(0), 1174.66, 0.06, 0], ['pluck', BEAT(0), 587.33, 0.05, 0.6, 0], ['pop', r3(BEAT(0) + 0.14), 1318.51, 0.04, 0.1],
  ['pop', T.saw, 659.25, 0.05, 0], ['glitter', T.saw, T.saw + 0.4],
  ...PT.flatMap((t0, i) => {
    const sd = SIDE_DOWN(i) * 0.4
    return [
      ['whoosh', r3(t0 - 0.24), 0.28, 0.025],
      ['pop', r3(t0), PAIR_NOTES[i][0], 0.065, sd], ['tick', r3(t0 + 0.005), 0.05],
      ['pop', r3(t0 + 0.11), PAIR_NOTES[i][1], 0.05, -sd],
      ['pluck', r3(t0), [293.66, 329.63, 246.94, 293.66, 329.63, 392][i], 0.04, 0.4, 0],
    ]
  }),
  ['whoosh', T.sawOut, 0.45, 0.035],
  ['pop', T.coin, 587.33, 0.06, 0], ['bell', T.coin + 0.05, 1174.66, 0.04, 1.2, 0], ['glitter', T.coin + 0.1, T.coin + 0.6],
  ...wordPops(T.coin + 0.05, 5, 0.07, 1, 0.025),
  ['pop', T.toss, 880, 0.05, 0], ['whoosh', T.toss, T.land - T.toss, 0.04],
  ...Array.from({ length: 5 }, (_, i) => ['tick', r3(T.toss + 0.12 + i * 0.17), 0.03]),
  ['bell', T.land, 880, 0.06, 1.6, 0], ['bell', r3(T.land + 0.06), 1318.51, 0.045, 1.6, 0.2], ['glitter', T.land, T.land + 0.7], ['tick', T.land, 0.06],
  ['pop', T.split, 987.77, 0.05, 0], ['whoosh', T.split, 0.4, 0.03],
  ['pop', T.endW, 739.99, 0.04, 0],
  ['riser', r3(T.endW + 0.2), T.snap, 0.04],
  ['pop', T.snap, 1174.66, 0.07, 0], ['pluck', T.snap, 587.33, 0.06, 0.7, 0], ['bell', T.snap, 1479.98, 0.05, 1.4, 0], ['glitter', T.snap, T.snap + 0.6],
  ['pop', T.bonk, 659.25, 0.07, 0], ['pluck', T.bonk, 440, 0.05, 0.4, 0], ['pop', r3(T.bonk + 0.12), 554.37, 0.05, 0.2], ['tick', T.bonk, 0.06],
  ['bell', 13.4, 587.33, 0.035, 2.0, -0.2], ['bell', 13.46, 880, 0.03, 2.0, 0.2],
]
