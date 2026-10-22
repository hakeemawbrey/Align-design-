// ─────────────────────────────────────────────── dummies · part c (39.8–60.01) · v2 style, no ad
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556).
//   39.80–40.20  H exactly (drawSky SKY_H + drawWheelH + grain GRAIN_H)
//   40.60        Q6 "Who do I *get along* with?" pops in word by word
//   41.16–41.99  the four element triangles snap in, half a beat apart: fire, earth, air, water
//   42.27        A: "Same element: *easy*."                        (out 43.75)
//   43.94        fire + air glow together (a six-point star), the rest dim · "Fire + Air fan the flames."
//   45.60        earth + water glow together · "Earth + Water grow things." joins underneath (both out 47.45)
//   47.82        Q7 "Okay but… is it *real*?" · the wheel slowly turns under a warm glow and a field of twinkling stars
//   48.93        "People have read the sky for thousands of years."  (out 50.85)
//   51.16        "Try it on. Keep what fits."                       (out 53.0)
//   53.00–53.45  headline, punchline and wheel pop away
//   53.94        "Congrats. You're *not* a dummy anymore." pops in huge; "not" (gold) lands last with a wobble
//   55.04        graduation confetti: two cannons throw sign glyphs + pixel stars up from the bottom corners; they flutter down
//   59.30–60.00  fade to black (black from 59.965; the last frame is black)
import { lerp, prog, ease, el, rng, mix, C } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, WHEEL, SKY_H, GRAIN_H, TYPE, ELEMENT_COLOR, drawWheelH, easeOutBack } from '../../../wheel.js'

const T0 = 39.8, T1 = 60.01, T_END = 60.0, T_OUT = 59.3
const beat = n => 0.6 + n * 0.5556
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const GOLD = '#f2c75c'
const VS = '︎'
const rad = d => d * Math.PI / 180

// ── Q6
const Q6 = beat(72), Q6_OUT = 47.45
const ELS = ['fire', 'earth', 'air', 'water']
const TRI_T = { fire: beat(73), earth: beat(73.5), air: beat(74), water: beat(74.5) }
const A1 = beat(75), A1_OUT = 43.75
const PAIR1 = beat(78), PAIR2 = beat(81)
// ── Q7
const Q7 = beat(85), A2 = beat(87), A2_OUT = 50.85, A3 = beat(91), AWAY = 53.0
const TURN = { a: 47.6, b: 53.3, deg: 24 }
// ── end
const END_T = beat(96), END_NOT = END_T + 0.5, BURST = beat(98)

/** the full-size H wheel turned rot° (rot 0 → exactly drawWheelH); s/k scale and fade it */
function wheel(ctx, rot, k = 1, s = 1) {
  if (k <= 0.003 || s <= 0.01) return
  if (rot === 0 && s === 1) return drawWheelH(ctx, { k })
  const Wl = { ...WHEEL, rOut: WHEEL.rOut * s, rIn: WHEEL.rIn * s, rGlyph: WHEEL.rGlyph * s }
  const ang = lon => Math.PI - rad(lon - rot)
  const pt = (lon, r) => ({ x: Wl.cx + Math.cos(ang(lon)) * r, y: Wl.cy + Math.sin(ang(lon)) * r })
  ctx.save()
  SIGNS.forEach((sg, i) => {
    ctx.globalAlpha = 0.16 * k; ctx.fillStyle = sg.color
    ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rOut, ang(i * 30 + 30), ang(i * 30)); ctx.arc(Wl.cx, Wl.cy, Wl.rIn, ang(i * 30), ang(i * 30 + 30), true); ctx.closePath(); ctx.fill()
  })
  ctx.globalAlpha = Wl.alpha * k; ctx.strokeStyle = '#efe6d6'
  ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rOut, 0, Math.PI * 2); ctx.stroke()
  ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rIn, 0, Math.PI * 2); ctx.stroke()
  for (let i = 0; i < 12; i++) { const a = pt(i * 30, Wl.rIn), b = pt(i * 30, Wl.rOut); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
  ctx.font = `bold ${Math.round(58 * Math.max(s, 0.5))}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  SIGNS.forEach((sg, i) => { const p = pt(i * 30 + 15, Wl.rGlyph); ctx.globalAlpha = k; ctx.fillStyle = sg.color; ctx.fillText(sg.glyph + VS, p.x, p.y) })
  ctx.restore()
}

/** one element triangle (its three signs' midpoints on the inner ring); s = snap scale about the wheel centre */
function triangle(ctx, el_, rot, { k = 1, s = 1, glow = 0, width = 7 }) {
  if (k <= 0.003) return
  const col = ELEMENT_COLOR[el_]
  const idx = SIGNS.map((x, i) => [x, i]).filter(([x]) => x.el === el_).map(([, i]) => i)
  const r = (WHEEL.rIn - 8) * s
  const pts = idx.map(i => { const a = Math.PI - rad(i * 30 + 15 - rot); return { x: WHEEL.cx + Math.cos(a) * r, y: WHEEL.cy + Math.sin(a) * r } })
  ctx.save()
  ctx.lineJoin = 'round'; ctx.strokeStyle = col
  // soft wide glow, then the fat line
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = k * (0.22 + 0.35 * glow); ctx.lineWidth = width * 3.2 + 10 * glow
  ctx.shadowColor = col; ctx.shadowBlur = 30 + 30 * glow
  ctx.beginPath(); pts.forEach((p, j) => j ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath(); ctx.stroke()
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = k; ctx.lineWidth = width + 2 * glow; ctx.shadowBlur = 16
  ctx.stroke()
  if (glow > 0.01) { ctx.globalAlpha = 0.08 * glow * k; ctx.fillStyle = col; ctx.fill() }
  // vertex dots
  ctx.shadowBlur = 20; ctx.fillStyle = mix(col, '#ffffff', 0.35)
  for (const p of pts) { ctx.globalAlpha = k; ctx.beginPath(); ctx.arc(p.x, p.y, 11 + 3 * glow, 0, Math.PI * 2); ctx.fill() }
  ctx.restore()
  return pts
}

function bandFlash(ctx, el_, k, rot) {
  if (k <= 0.003) return
  ctx.save()
  SIGNS.forEach((sg, i) => {
    if (sg.el !== el_) return
    const a0 = Math.PI - rad(i * 30 - rot), a1 = Math.PI - rad(i * 30 + 30 - rot)
    ctx.globalAlpha = 0.45 * k; ctx.fillStyle = sg.color; ctx.shadowColor = sg.color; ctx.shadowBlur = 24
    ctx.beginPath(); ctx.arc(WHEEL.cx, WHEEL.cy, WHEEL.rOut, a1, a0); ctx.arc(WHEEL.cx, WHEEL.cy, WHEEL.rIn, a0, a1, true); ctx.closePath(); ctx.fill()
  })
  ctx.restore()
}

const SPARK_COLS = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
function sparkle(ctx, x, y, t, t0, { n = 10, rad: R = 150, seed = 1, cols = SPARK_COLS, size = 28 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > 0.8) return
  const r = rng(seed)
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = ease.outCubic(Math.min(1, tt / 0.6))
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tt - 0.25) / 0.55)
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  ctx.restore()
}

function popWord(span, t, t0, { out = 1e9, dur = 0.28, back = 1.9, wobble = false } = {}) {
  const p = prog(t, t0, t0 + dur), q = ease.inQuad(prog(t, out, out + 0.2))
  const sc = lerp(0.6, 1, easeOutBack(p, back)) * (1 - 0.4 * q)
  const tt = t - t0
  const rot = wobble && tt > 0 ? 9 * Math.exp(-tt * 4) * Math.sin(tt * 18) : 0
  span.style.opacity = String(Math.min(1, p * 3) * (1 - q))
  span.style.transform = `translateY(${lerp(30, 0, ease.outCubic(p)) - 20 * q}px) scale(${sc}) rotate(${rot}deg)`
}

// ── a calm field of extra twinkling pixel stars for Q7 (kept off the headline block)
const FIELD = (() => { const r = rng(909), o = []; while (o.length < 34) { const x = 70 + r() * 940, y = 470 + r() * 1350; o.push({ x, y, ph: r() * 6.28, sp: 1.2 + r() * 1.8, kind: Math.floor(r() * 3), col: SPARK_COLS[Math.floor(r() * SPARK_COLS.length)], size: 14 + 7 * Math.floor(r() * 2), d: r() * 0.9 }) } return o })()

// ── graduation confetti: two cannons at the bottom corners, linear drag + gravity (terminal fall VT)
const CONF = (() => {
  const r = rng(5151), o = []
  for (let side = 0; side < 2; side++) {
    for (let i = 0; i < 12; i++) {
      const s = SIGNS[(i * 5 + side * 7) % 12]
      const a = rad(side ? -100 - r() * 32 : -80 + r() * 32)
      o.push({ side, glyph: s.glyph, col: s.color, a, v: 2100 + r() * 800, size: 64 + r() * 30, spin: (r() - 0.5) * 5, ph: r() * 6.28, d: r() * 0.12 })
    }
    for (let i = 0; i < 30; i++) {
      const a = rad(side ? -95 - r() * 40 : -85 + r() * 40)
      o.push({ side, star: true, col: SPARK_COLS[Math.floor(r() * SPARK_COLS.length)], a, v: 1500 + r() * 1500, size: 21 + 7 * Math.floor(r() * 3), kind: Math.floor(r() * 3), ph: r() * 6.28, d: r() * 0.15 })
    }
  }
  return o
})()
function confetti(ctx, t) {
  const K = 1.6, VT = 150
  for (const c of CONF) {
    const tau = t - BURST - c.d
    if (tau <= 0) continue
    const x0 = c.side ? W - 120 : 120, y0 = H + 40
    const f = (1 - Math.exp(-K * tau)) / K
    const x = x0 + Math.cos(c.a) * c.v * f + 26 * Math.sin(tau * 2.2 + c.ph) * prog(tau, 0.6, 1.6)
    const y = y0 + (Math.sin(c.a) * c.v - VT) * f + VT * tau
    const pin = easeOutBack(prog(tau, 0, 0.3), 2.2)
    const tw = 0.7 + 0.3 * Math.sin(tau * 3 + c.ph)
    ctx.save(); ctx.globalAlpha = tw
    if (c.star) {
      ctx.imageSmoothingEnabled = false
      drawPixelStar(ctx, x, y, c.size * pin, (Math.round(t * 30) >> 3) % 7 === 0 ? 2 : c.kind, c.col)
    } else {
      ctx.translate(x, y); ctx.rotate(c.spin * f + 0.25 * Math.sin(tau * 2.4 + c.ph)); ctx.scale(pin, pin * (0.75 + 0.25 * Math.cos(tau * 4 + c.ph)))
      ctx.font = `bold ${Math.round(c.size)}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.shadowColor = c.col; ctx.shadowBlur = 22; ctx.fillStyle = c.col
      ctx.fillText(c.glyph + VS, 0, 0)
    }
    ctx.restore()
  }
}

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  await Promise.all([`800 108px Inter`, `700 62px Inter`, `italic 500 118px 'EB Garamond'`, `bold 58px 'EB Garamond'`, `700 34px 'Space Mono'`].map(f => document.fonts.load(f).catch(() => {})))

  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' })
  const gx = gC.getContext('2d')
  const shadow = '0 4px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)'

  // words → spans. A word is a string, '\n', or { w, col, accent?, size? } (accent = EB Garamond italic; else a coloured bold word)
  const line = (words, { top, size = TYPE.headSize, accSize = 118, lh = TYPE.headLine, weight = '800' }) => {
    const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center', fontFamily: INTER, fontWeight: weight,
      fontSize: size + 'px', lineHeight: String(lh), color: C.bone, textShadow: shadow, letterSpacing: '-0.02em' }, root)
    const spans = []
    words.forEach(w => {
      if (w === '\n') { el('br', {}, box); return }
      const o = typeof w === 'object'
      const acc = o && w.accent !== false
      const s = el('span', { display: 'inline-block', opacity: 0, margin: '0 0.11em', transformOrigin: '50% 70%',
        ...(o ? { color: w.col, textShadow: `0 0 28px ${w.col}66, ${shadow}` } : {}),
        ...(acc ? { fontFamily: SERIF, fontStyle: 'italic', fontWeight: '500', fontSize: (w.size || accSize) + 'px', letterSpacing: '0' } : {}) }, box, o ? w.w : w)
      spans.push(s)
    })
    return spans
  }
  const eyebrow = (txt, top) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: top + 'px', textAlign: 'center', fontFamily: MONO, fontWeight: '700', fontSize: '34px',
    letterSpacing: '0.25em', textIndent: '0.25em', color: GOLD, textShadow: shadow, opacity: 0, transformOrigin: '50% 50%' }, root, txt)
  const SUBY = TYPE.subY - 10, SUBS = TYPE.subSize
  const sub = (words, top = SUBY) => line(words, { top, size: SUBS, lh: 1.14, weight: '700', accSize: 70 })

  const q6e = eyebrow('Q6', 134), q7e = eyebrow('Q7', 134)
  const q6 = line(['Who', 'do', 'I', { w: 'get along', col: '#8fd8f6' }, 'with?'], { top: 196 })
  const q7 = line(['Okay', 'but…', 'is', 'it', { w: 'real?', col: '#f59cc4' }], { top: 196 })
  const aE = eyebrow('A', SUBY - 58)
  const a1 = sub(['Same', 'element:', { w: 'easy.', col: GOLD }])
  const a2 = sub([{ w: 'Fire', col: ELEMENT_COLOR.fire, accent: false }, '+', { w: 'Air', col: ELEMENT_COLOR.air, accent: false }, 'fan', 'the', 'flames.'])
  const a3 = sub([{ w: 'Earth', col: ELEMENT_COLOR.earth, accent: false }, '+', { w: 'Water', col: ELEMENT_COLOR.water, accent: false }, 'grow', 'things.'], SUBY + Math.round(SUBS * 1.14))
  const a4 = sub(['People', 'have', 'read', 'the', 'sky', 'for', 'thousands', 'of', 'years.'])
  const a5 = sub(['Try', 'it', 'on.', 'Keep', 'what', { w: 'fits.', col: GOLD }])

  const endW = line(['Congrats.', '\n', 'You’re', { w: 'not', col: GOLD, size: 150 }, '\n', 'a', 'dummy', '\n', 'anymore.'], { top: 0, size: 128, lh: 1.04 })
  endW[0].parentElement.style.top = '650px'

  const fx = layerCanvas(root, { pointerEvents: 'none' }), fxx = fx.getContext('2d')
  const black = fill(root, { background: '#000', opacity: 0 })

  const eyePop = (e, t, t0, out) => {
    const p = prog(t, t0, t0 + 0.3), q = ease.inQuad(prog(t, out, out + 0.2))
    e.style.opacity = String(Math.min(1, p * 3) * (1 - q))
    e.style.transform = `scale(${lerp(0.5, 1, easeOutBack(p, 2.4)) * (1 - 0.3 * q)})`
  }
  const words = (arr, t, t0, out, opt = {}) => arr.forEach((w, i) => popWord(w, t, t0 + i * 0.07, { out: out + i * 0.03, ...opt }))

  return {
    start: T0, end: T1, root,
    update(t) {
      drawSky(bx, t, SKY_H)
      fxx.clearRect(0, 0, W, H)

      // ════════ Q7 warmth + star field (under the wheel)
      const warm = ease.inOutQuad(prog(t, Q7 - 0.2, Q7 + 1.2)) * (1 - ease.inQuad(prog(t, AWAY, AWAY + 0.5)))
      if (warm > 0.003) {
        const g = bx.createRadialGradient(WHEEL.cx, WHEEL.cy, 0, WHEEL.cx, WHEEL.cy, 620)
        g.addColorStop(0, `rgba(242,170,92,${0.3 * warm})`); g.addColorStop(0.55, `rgba(232,98,138,${0.12 * warm})`); g.addColorStop(1, 'rgba(232,98,138,0)')
        bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(0, WHEEL.cy - 640, W, 1280); bx.globalCompositeOperation = 'source-over'
        bx.save(); bx.imageSmoothingEnabled = false
        for (const s of FIELD) {
          const a = warm * ease.outQuad(prog(t, Q7 + s.d, Q7 + s.d + 0.5)) * (0.35 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph)))
          if (a <= 0.02) continue
          bx.globalAlpha = a; drawPixelStar(bx, s.x, s.y, s.size, s.kind, s.col)
        }
        bx.restore()
      }

      // ════════ the wheel (turns slowly during Q7, pops away at 53.0)
      const turn = TURN.deg * (0.5 - 0.5 * Math.cos(Math.PI * prog(t, TURN.a, TURN.b)))
      const away = prog(t, AWAY + 0.15, AWAY + 0.45)
      const ws = 1 + 0.05 * Math.sin(Math.PI * Math.min(1, away * 2.4)) * (away < 0.42 ? 1 : 0) - 0.9 * ease.inQuad(away)
      wheel(bx, turn, 1 - ease.inQuad(away), ws)

      // ════════ Q6 triangles
      const triOut = ease.inOutQuad(prog(t, Q6_OUT, Q6_OUT + 0.4))
      if (triOut < 1) {
        const p1 = ease.inOutQuad(prog(t, PAIR1, PAIR1 + 0.35)), p2 = ease.inOutQuad(prog(t, PAIR2, PAIR2 + 0.35))
        const pulse = 0.5 + 0.5 * Math.sin((t - PAIR1) * 5.2)
        ELS.forEach((e, i) => {
          const t0 = TRI_T[e]
          const snap = easeOutBack(prog(t, t0, t0 + 0.32), 2.4)
          if (snap <= 0) return
          const isFA = e === 'fire' || e === 'air'
          // pair 1: fire+air lit, earth+water dim · pair 2: earth+water lit, fire+air dim
          const lit = isFA ? p1 * (1 - p2) : p2
          const dim = isFA ? p2 : p1 * (1 - p2)
          const k = Math.min(1, prog(t, t0, t0 + 0.08)) * (1 - 0.72 * dim) * (1 - triOut)
          const breathe = 1 + 0.025 * lit * pulse
          bandFlash(bx, e, Math.exp(-Math.max(0, t - t0) * 3) * (t >= t0 ? 1 : 0) * (1 - triOut), 0)
          bandFlash(bx, e, 0.5 * lit * (0.7 + 0.3 * pulse) * (1 - triOut), 0)
          const pts = triangle(bx, e, turn, { k, s: lerp(0.55, 1, snap) * breathe, glow: lit * (0.6 + 0.4 * pulse) })
          if (pts) sparkle(fxx, pts[0].x, pts[0].y, t, t0 + 0.1, { n: 8, rad: 90, seed: 20 + i, size: 21, cols: [ELEMENT_COLOR[e], '#fff3e0', '#ffd98a'] })
        })
        // a spin-sparkle at the centre when each pair lights
        sparkle(fxx, WHEEL.cx, WHEEL.cy, t, PAIR1 + 0.05, { n: 12, rad: 200, seed: 41, size: 28, cols: [ELEMENT_COLOR.fire, ELEMENT_COLOR.air, '#fff3e0'] })
        sparkle(fxx, WHEEL.cx, WHEEL.cy, t, PAIR2 + 0.05, { n: 12, rad: 200, seed: 42, size: 28, cols: [ELEMENT_COLOR.earth, ELEMENT_COLOR.water, '#fff3e0'] })
      }

      // ════════ copy
      eyePop(q6e, t, Q6, Q6_OUT); words(q6, t, Q6 + 0.05, Q6_OUT)
      eyePop(aE, t, A1, Q6_OUT)
      words(a1, t, A1, A1_OUT); words(a2, t, PAIR1 + 0.05, Q6_OUT); words(a3, t, PAIR2 + 0.05, Q6_OUT)
      eyePop(q7e, t, Q7, AWAY); words(q7, t, Q7 + 0.05, AWAY)
      words(a4, t, A2, A2_OUT, { dur: 0.26 }); words(a5, t, A3, AWAY)
      // the A eyebrow carries on through Q7's answers
      if (t >= Q6_OUT) eyePop(aE, t, A2, AWAY)

      // ════════ end
      confetti(bx, t)
      endW.forEach((w, i) => i === 2
        ? popWord(w, t, END_NOT, { back: 2.8, dur: 0.36, wobble: true })
        : popWord(w, t, END_T + (i > 2 ? i - 1 : i) * 0.08))
      sparkle(fxx, 540, 860, t, END_NOT + 0.15, { n: 14, rad: 260, seed: 77, size: 35 })

      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

export const cues = [
  ['pop', Q6, 1046, 0.05, 0],
  ...[784, 880, 988, 1175, 1046].map((f, i) => ['pop', Q6 + 0.05 + i * 0.07, f, 0.05, (i - 2) * 0.15]),
  ...ELS.map((e, i) => ['pop', TRI_T[e], [659, 784, 880, 1046][i], 0.065, [-0.3, 0.3, -0.15, 0.15][i]]),
  ...ELS.map((e, i) => ['pluck', TRI_T[e] + 0.02, [293.66, 369.99, 440, 587.33][i], 0.04, 0.45, 0]),
  ...[880, 988, 1318].map((f, i) => ['pop', A1 + i * 0.07, f, 0.045, 0]),
  ['glitter', PAIR1, PAIR1 + 0.7], ['pluck', PAIR1, 587.33, 0.05, 0.7, -0.2], ['pop', PAIR1 + 0.05, 1175, 0.05, -0.2],
  ['glitter', PAIR2, PAIR2 + 0.7], ['pluck', PAIR2, 493.88, 0.05, 0.7, 0.2], ['pop', PAIR2 + 0.05, 988, 0.05, 0.2],
  ['pop', Q7, 1046, 0.05, 0],
  ...[659, 784, 880, 988, 1318].map((f, i) => ['pop', Q7 + 0.05 + i * 0.07, f, 0.05, (i - 2) * 0.15]),
  ['riser', Q7, Q7 + 1.6, 0.025],
  ['bell', A2, 587.33, 0.03, 2.4, 0],
  ['bell', A3, 739.99, 0.03, 2.4, 0], ['pop', A3 + 0.35, 1318, 0.045, 0],
  ...[0, 1, 2].map(i => ['pop', AWAY + i * 0.07, [784, 659, 523][i], 0.04, (i - 1) * 0.3]),
  ['whoosh', AWAY + 0.15, 0.4, 0.035],
  ...[659, 784, 880, 988, 1046, 1175].map((f, i) => ['pop', END_T + i * 0.08, f, 0.05, (i - 2.5) * 0.12]),
  ['pop', END_NOT, 1318, 0.07, 0], ['bell', END_NOT + 0.02, 1318.5, 0.03, 1.6, 0],
  ['boom', BURST, 0.12], ['glitter', BURST, BURST + 1.6],
  ...[1046, 1318, 1568, 1175, 1397, 1760].map((f, i) => ['pop', BURST + i * 0.05, f, 0.035, i % 2 ? 0.5 : -0.5]),
  ['pluck', BURST + 0.02, 587.33, 0.05, 0.8, 0],
  ['bell', T_OUT + 0.05, 293.66, 0.03, 2.4, 0],
]
