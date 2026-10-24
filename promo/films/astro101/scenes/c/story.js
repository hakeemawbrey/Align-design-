// ─────────────────────────────────────────────── astro101 v2 · part c (39.8–60.01) · fun, big, bold, no ad
// Beats land on the 108 bpm grid (beat n at 0.6 + n·0.5556).
//   39.80–40.20  H exactly (drawSky SKY_H + drawWheelH + grain GRAIN_H)
//   40.35–41.05  the wheel springs up and shrinks (centre → y 690, scale 0.56) to make room
//   40.60        "Your *Big Three*." pops in word by word (accent in gold)
//   41.16        card 1 SUN · TAURUS "You at brunch. Orders for the table." + gold Sun orb pops onto Taurus
//   44.49        card 2 MOON · SAGITTARIUS "You at 2am. Plans the trip you won't book." + blue orb onto Sagittarius
//   46.71–47.70  the wheel spins (−168°, springy) so the Ascendant, ~12° Libra (May 12 1998 · 5 PM · Tulsa), sits on
//                the 9 o'clock horizon; AC marker
//   47.82        card 3 RISING · LIBRA "You to strangers. Charming. Suspiciously good lighting."
//   50.85        headline pops out · 51.16 all three cards wiggle · "That's *you.* In three signs." pops in
//   53.00–53.45  cards, punchline and wheel pop away
//   53.94        "Now you speak *astrology*." pops in huge, word by word; 54.30 the accent bounces in
//   54.49        12-glyph + pixel-star confetti bursts from the centre, drifts and twinkles
//   59.30–60.00  fade to black (black from 59.965; the last frame is black)
import { lerp, prog, ease, el, rng, mix, C } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, WHEEL, SKY_H, GRAIN_H, TYPE, drawWheelH, easeOutBack } from '../../../wheel.js'

const T0 = 39.8, T1 = 60.01, T_END = 60.0, T_OUT = 59.3
const beat = n => 0.6 + n * 0.5556
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const GOLD = '#f2c75c'

// ── beat 1: the Big Three
const SHRINK = { a: 40.35, b: 41.05 }, SMALL = { s: 0.56, cy: 690 }
const HEAD_T = beat(72), HEAD_OUT = 50.85
const CARD_T = [beat(73), beat(79), beat(85)]
const SPIN = { a: beat(83), b: beat(83) + 1.0, to: -168 }   // −168 ≡ +192: the Ascendant (192°) lands at 9 o'clock
const ASC = 192
const WIGGLE = beat(91), PUNCH_T = beat(91)
const AWAY = 53.0
const CARD = { x: 80, w: 920, h: 236, top0: 984, gap: 22 }
const P = [
  { label: 'SUN', sign: 1, lon: 51.6, col: GOLD, glyph: '☉', line: 'You at brunch.<br>Orders for the table.' },
  { label: 'MOON', sign: 8, lon: 247, col: '#5f95ff', glyph: '☽', line: 'You at 2am. Plans the trip you won’t book.' },
  { label: 'RISING', sign: 6, lon: ASC, col: '#c070ff', glyph: 'AC', line: 'You to strangers. Charming. Suspiciously good lighting.' },
]

// ── beat 2: the end line + confetti
const END_T = beat(96), END_ACC = END_T + 0.36, BURST = beat(97)

const rad = d => d * Math.PI / 180
const VS = '︎'

/** the wheel at scale s, centre cy, turned rot° — identical to drawWheelH at s 1 / cy WHEEL.cy / rot 0 */
function wheel(ctx, s, cy, rot, k) {
  if (k <= 0.003) return
  if (s === 1 && cy === WHEEL.cy && rot === 0) return drawWheelH(ctx, { k })
  const Wl = { ...WHEEL, cy, rOut: WHEEL.rOut * s, rIn: WHEEL.rIn * s, rGlyph: WHEEL.rGlyph * s }
  const ang = lon => Math.PI - rad(lon - rot)
  const pt = (lon, r) => ({ x: Wl.cx + Math.cos(ang(lon)) * r, y: Wl.cy + Math.sin(ang(lon)) * r })
  ctx.save()
  SIGNS.forEach((sg, i) => {
    ctx.globalAlpha = 0.16 * k; ctx.fillStyle = sg.color
    ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rOut, ang(i * 30 + 30), ang(i * 30)); ctx.arc(Wl.cx, Wl.cy, Wl.rIn, ang(i * 30), ang(i * 30 + 30), true); ctx.closePath(); ctx.fill()
  })
  ctx.globalAlpha = Wl.alpha * k; ctx.strokeStyle = '#efe6d6'
  ctx.lineWidth = lerp(3, 4, s); ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rOut, 0, Math.PI * 2); ctx.stroke()
  ctx.lineWidth = lerp(2.5, 3, s); ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rIn, 0, Math.PI * 2); ctx.stroke()
  for (let i = 0; i < 12; i++) { const a = pt(i * 30, Wl.rIn), b = pt(i * 30, Wl.rOut); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
  ctx.font = `bold ${Math.round(58 * Math.max(s, 0.66))}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  SIGNS.forEach((sg, i) => { const p = pt(i * 30 + 15, Wl.rGlyph); ctx.globalAlpha = k; ctx.fillStyle = sg.color; ctx.fillText(sg.glyph + VS, p.x, p.y) })
  ctx.restore()
  return { Wl, ang, pt }
}

function band(ctx, g, i, k, col) {
  if (k <= 0.003) return
  const { Wl, ang } = g
  ctx.save()
  ctx.globalAlpha = 0.42 * k; ctx.fillStyle = col
  ctx.shadowColor = col; ctx.shadowBlur = 30
  ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rOut, ang(i * 30 + 30), ang(i * 30)); ctx.arc(Wl.cx, Wl.cy, Wl.rIn, ang(i * 30), ang(i * 30 + 30), true); ctx.closePath(); ctx.fill()
  ctx.restore()
}

function orb(ctx, x, y, r, col, k, t, seed) {
  if (k <= 0.003) return
  ctx.save()
  const br = 1 + 0.07 * Math.sin(t * 4.2 + seed)
  const R = r * 3.2 * br
  const g = ctx.createRadialGradient(x, y, 0, x, y, R)
  g.addColorStop(0, col); g.addColorStop(0.3, col + '66'); g.addColorStop(1, col + '00')
  ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.7 * Math.min(1, k); ctx.fillStyle = g
  ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  const c = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r)
  c.addColorStop(0, '#ffffff'); c.addColorStop(0.35, mix(col, '#ffffff', 0.35)); c.addColorStop(1, col)
  ctx.globalAlpha = Math.min(1, k); ctx.fillStyle = c
  ctx.beginPath(); ctx.arc(x, y, r * Math.max(0, k), 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

const SPARK_COLS = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
/** a little pixel-star sparkle burst that flies out from (x, y) at t0 */
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

/** word pop: scale 0.6 → ~1.06 → 1, rise 30 px, over 0.28 s */
function popWord(span, t, t0, { out = 1e9, dur = 0.28, back = 1.9 } = {}) {
  const p = prog(t, t0, t0 + dur), q = ease.inQuad(prog(t, out, out + 0.2))
  const sc = lerp(0.6, 1, easeOutBack(p, back)) * (1 - 0.4 * q)
  span.style.opacity = String(Math.min(1, p * 3) * (1 - q))
  span.style.transform = `translateY(${lerp(30, 0, ease.outCubic(p)) - 20 * q}px) scale(${sc})`
}

// ── confetti: 12 sign glyphs + pixel stars, deterministic in t
const CONF = (() => {
  const r = rng(4242), out = []
  SIGNS.forEach((s, i) => {
    const a = (i / 12) * Math.PI * 2 + (r() - 0.5) * 0.4
    out.push({ glyph: s.glyph, col: s.color, a, v: 900 + r() * 700, size: 70 + r() * 34, spin: (r() - 0.5) * 3, ph: r() * 6.28, d: 0.03 * (i % 4) })
  })
  for (let i = 0; i < 44; i++) {
    const a = r() * Math.PI * 2
    out.push({ star: true, col: SPARK_COLS[Math.floor(r() * SPARK_COLS.length)], a, v: 500 + r() * 1300, size: 21 + 7 * Math.floor(r() * 3), kind: Math.floor(r() * 3), ph: r() * 6.28, d: r() * 0.08 })
  }
  return out
})()
const CONF_C = { x: 540, y: 960 }
function confetti(ctx, t) {
  const KD = 2.3
  for (const c of CONF) {
    const tau = t - BURST - c.d
    if (tau <= 0) continue
    const reach = (1 - Math.exp(-KD * tau)) / KD
    const x = CONF_C.x + Math.cos(c.a) * c.v * reach + 14 * Math.sin(tau * 1.3 + c.ph) * prog(tau, 0.5, 1.5)
    const y = CONF_C.y + Math.sin(c.a) * c.v * reach + 34 * tau
    const pin = easeOutBack(prog(tau, 0, 0.32), 2.2)
    const alpha = Math.min(1, tau / 0.08) * (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(tau * 2.6 + c.ph)) * prog(tau, 1.2, 2) + 0.45 * (1 - prog(tau, 1.2, 2)))
    ctx.save(); ctx.globalAlpha = alpha
    if (c.star) {
      ctx.imageSmoothingEnabled = false
      drawPixelStar(ctx, x, y, c.size * pin, (Math.round(t * 30) >> 3) % 7 === 0 ? 2 : c.kind, c.col)
    } else {
      ctx.translate(x, y); ctx.rotate(c.spin * reach + 0.18 * Math.sin(tau * 2 + c.ph)); ctx.scale(pin, pin)
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
  await Promise.all([`800 108px Inter`, `700 48px Inter`, `italic 500 118px 'EB Garamond'`, `bold 58px 'EB Garamond'`, `700 34px 'Space Mono'`].map(f => document.fonts.load(f).catch(() => {})))

  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' })
  const gx = gC.getContext('2d')
  const shadow = '0 4px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)'

  // ── headline builder: words → spans
  const headline = (words, { top, size = TYPE.headSize, accSize = 118, lh = TYPE.headLine }) => {
    const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center', fontFamily: INTER, fontWeight: '800',
      fontSize: size + 'px', lineHeight: String(lh), color: C.bone, textShadow: shadow, letterSpacing: '-0.02em' }, root)
    const spans = []
    words.forEach(w => {
      if (w === '\n') { el('br', {}, box); return }
      const acc = typeof w === 'object'
      const s = el('span', { display: 'inline-block', opacity: 0, margin: '0 0.12em', transformOrigin: '50% 70%',
        ...(acc ? { fontFamily: SERIF, fontStyle: 'italic', fontWeight: '500', fontSize: (w.size || accSize) + 'px', color: w.col, letterSpacing: '0', textShadow: `0 0 28px ${w.col}66, ${shadow}` } : {}) }, box, acc ? w.w : w)
      spans.push(s)
    })
    return spans
  }
  const head = headline(['Your', { w: 'Big Three.', col: GOLD }], { top: 196 })
  const punch = headline(['That’s', { w: 'you.', col: GOLD, size: 96 }, '\n', 'In', 'three', 'signs.'], { top: 200, size: 84, lh: 1.12 })

  // ── the three cards
  const cards = P.map((p, i) => {
    const c = el('div', { position: 'absolute', left: CARD.x + 'px', top: (CARD.top0 + i * (CARD.h + CARD.gap)) + 'px', width: CARD.w + 'px', height: CARD.h + 'px', borderRadius: '44px',
      boxSizing: 'border-box', border: `4px solid ${p.col}`, opacity: 0, transformOrigin: '50% 50%', willChange: 'transform, opacity',
      background: 'linear-gradient(160deg, rgba(40,22,82,0.92), rgba(16,8,38,0.92))',
      boxShadow: `0 0 46px ${p.col}66, inset 0 0 30px ${p.col}22, 0 24px 60px rgba(4,2,14,0.6)` }, root)
    const o = el('div', { position: 'absolute', left: '34px', top: (CARD.h / 2 - 66) + 'px', width: '132px', height: '132px', borderRadius: '50%',
      background: `radial-gradient(circle at 36% 32%, #fff 0%, ${mix(p.col, '#ffffff', 0.35)} 28%, ${p.col} 70%)`, boxShadow: `0 0 50px ${p.col}, 0 0 100px ${p.col}88`,
      display: 'grid', placeItems: 'center', color: 'rgba(20,10,46,0.82)', fontFamily: p.glyph === 'AC' ? INTER : "'EB Garamond', 'Segoe UI Symbol', serif", fontWeight: '800',
      fontSize: p.glyph === 'AC' ? '44px' : '76px', lineHeight: '1' }, c, p.glyph === 'AC' ? 'AC' : p.glyph + VS)
    const tx = el('div', { position: 'absolute', left: '200px', right: '36px', top: '0', bottom: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }, c)
    el('div', { fontFamily: MONO, fontWeight: '700', fontSize: '34px', letterSpacing: '0.2em', color: mix(p.col, '#ffffff', 0.15), whiteSpace: 'nowrap' }, tx,
      `${p.label} · ${SIGNS[p.sign].name.toUpperCase()} <span style="font-family:'EB Garamond','Segoe UI Symbol',serif;font-weight:700;letter-spacing:0;color:${SIGNS[p.sign].color}">${SIGNS[p.sign].glyph + VS}</span>`)
    el('div', { fontFamily: INTER, fontWeight: '700', fontSize: '48px', lineHeight: '1.12', color: C.bone, letterSpacing: '-0.01em' }, tx, p.line)
    return { c, o }
  })

  // ── end line
  const endW = headline(['Now', 'you', '\n', 'speak', '\n', { w: 'astrology.', col: GOLD, size: 176 }], { top: 0, size: 148, lh: 1.0 })
  const endBox = endW[0].parentElement
  endBox.style.top = '690px'

  const fx = layerCanvas(root, { pointerEvents: 'none' }), fxx = fx.getContext('2d')
  const black = fill(root, { background: '#000', opacity: 0 })

  return {
    start: T0, end: T1, root,
    update(t) {
      drawSky(bx, t, SKY_H)
      fxx.clearRect(0, 0, W, H)

      // ════════ the wheel: H → springs small → spins to the Ascendant → pops away
      const sp = easeOutBack(prog(t, SHRINK.a, SHRINK.b), 1.3)
      const away = prog(t, AWAY + 0.2, AWAY + 0.5)
      let s = lerp(1, SMALL.s, sp), cy = lerp(WHEEL.cy, SMALL.cy, sp)
      s = lerp(1, SMALL.s, sp) * (1 - ease.inQuad(away) * 0.9) * (1 + 0.06 * Math.sin(Math.PI * Math.min(1, away * 2.2)) * (away < 0.45 ? 1 : 0))
      const rot = SPIN.to * easeOutBack(prog(t, SPIN.a, SPIN.b), 1.2)
      const wk = 1 - ease.inQuad(away)
      if (t < SHRINK.a) s = 1, cy = WHEEL.cy
      const g = wheel(bx, s, cy, t < SHRINK.a ? 0 : rot, wk)
      if (g && t >= SHRINK.a) {
        // horizon line + AC marker (with the spin)
        const hk = ease.outCubic(prog(t, SPIN.b - 0.3, SPIN.b + 0.2)) * wk
        if (hk > 0) {
          bx.save(); bx.globalAlpha = 0.7 * hk; bx.strokeStyle = '#efe6d6'; bx.lineWidth = 3; bx.setLineDash([12, 10])
          const half = (g.Wl.rOut + 60) * hk
          bx.beginPath(); bx.moveTo(g.Wl.cx - half, g.Wl.cy); bx.lineTo(g.Wl.cx + half, g.Wl.cy); bx.stroke(); bx.restore()
        }
        P.forEach((p, i) => {
          const k = easeOutBack(prog(t, CARD_T[i], CARD_T[i] + 0.4), 2.2) * wk
          const flash = Math.exp(-Math.max(0, t - CARD_T[i]) * 2.2) * (t >= CARD_T[i] ? 1 : 0)
          band(bx, g, p.sign, Math.min(1, prog(t, CARD_T[i], CARD_T[i] + 0.15)) * (0.55 + 0.45 * flash) * wk, SIGNS[p.sign].color)
          if (i < 2) {
            const q = g.pt(p.lon, g.Wl.rIn - 40)
            orb(bx, q.x, q.y, 22, p.col, k, t, i * 2.1)
            sparkle(fxx, q.x, q.y, t, CARD_T[i] + 0.05, { n: 9, rad: 90, seed: 11 + i, size: 21 })
          } else {
            const q = g.pt(ASC, g.Wl.rOut)
            orb(bx, q.x, q.y, 20, p.col, k, t, 5)
            sparkle(fxx, q.x, q.y, t, CARD_T[i] + 0.05, { n: 9, rad: 90, seed: 13, size: 21 })
            if (k > 0.01) {
              bx.save(); bx.globalAlpha = Math.min(1, k); bx.font = `800 40px ${INTER}`; bx.textAlign = 'right'; bx.textBaseline = 'middle'
              bx.fillStyle = mix(p.col, '#ffffff', 0.3); bx.shadowColor = 'rgba(11,6,32,0.9)'; bx.shadowBlur = 12
              bx.fillText('AC', q.x - 34, q.y - 34); bx.restore()
            }
          }
        })
      }

      // ════════ headline / punchline
      head.forEach((w, i) => popWord(w, t, HEAD_T + i * 0.07, { out: HEAD_OUT + i * 0.05, back: i === 1 ? 2.6 : 1.9 }))
      punch.forEach((w, i) => popWord(w, t, PUNCH_T + 0.12 + i * 0.07, { out: AWAY + i * 0.04, back: i === 1 ? 2.6 : 1.9 }))

      // ════════ cards
      cards.forEach(({ c, o }, i) => {
        const t0 = CARD_T[i], tt = t - t0
        const pin = easeOutBack(prog(t, t0, t0 + 0.45), 2.0)
        const gone = ease.inQuad(prog(t, AWAY + i * 0.07, AWAY + 0.3 + i * 0.07))
        const op = Math.min(1, prog(t, t0, t0 + 0.1)) * (1 - gone)
        c.style.display = op > 0.003 ? 'block' : 'none'
        if (op <= 0.003) return
        const wob = tt > 0 ? -6 * Math.exp(-tt * 4.5) * Math.cos(tt * 15) : 0
        const tw2 = t - WIGGLE - i * 0.09
        const wig = tw2 > 0 ? 3.2 * Math.exp(-tw2 * 3.2) * Math.sin(tw2 * 17) : 0
        const bump = tw2 > 0 ? 0.045 * Math.exp(-tw2 * 5) * Math.sin(Math.min(Math.PI, tw2 * 12)) : 0
        c.style.opacity = String(op)
        c.style.transform = `translateY(${lerp(90, 0, ease.outCubic(prog(t, t0, t0 + 0.4)))}px) scale(${lerp(0.35, 1, pin) * (1 + bump) * (1 - 0.5 * gone)}) rotate(${wob + wig}deg)`
        // the orb inside does a little squash on landing
        const sq = tt > 0 ? 0.12 * Math.exp(-tt * 6) * Math.sin(tt * 22) : 0
        o.style.transform = `scale(${1 + sq}, ${1 - sq})`
        const rect = { x: CARD.x + 34 + 66, y: CARD.top0 + i * (CARD.h + CARD.gap) + CARD.h / 2 }
        sparkle(fxx, rect.x, rect.y, t, t0 + 0.18, { n: 12, rad: 170, seed: 31 + i, size: 28 })
      })

      // ════════ end: huge line + glyph confetti
      confetti(bx, t)
      endW.forEach((w, i) => popWord(w, t, i === 3 ? END_ACC : END_T + i * 0.07, { back: i === 3 ? 2.8 : 1.9, dur: i === 3 ? 0.36 : 0.28 }))
      sparkle(fxx, 540, 1150, t, END_ACC + 0.2, { n: 14, rad: 300, seed: 77, size: 35 })

      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

const HEAD_HZ = [784, 1175], PUNCH_HZ = [659, 988, 784, 880, 1046], END_HZ = [659, 784, 988, 1318]
export const cues = [
  ['whoosh', SHRINK.a, 0.5, 0.04],
  ...HEAD_HZ.map((f, i) => ['pop', HEAD_T + i * 0.07, f, 0.06, (i - 0.5) * 0.3]),
  ...CARD_T.map((t, i) => ['pop', t, [880, 988, 1175][i], 0.065, [-0.2, 0.2, 0][i]]),
  ...CARD_T.map((t, i) => ['pluck', t + 0.03, [440, 493.88, 587.33][i], 0.045, 0.5, 0]),
  ...CARD_T.map((t, i) => ['glitter', t + 0.12, t + 0.6]),
  ['whoosh', SPIN.a, 0.9, 0.05],
  ['pop', SPIN.b - 0.1, 1318, 0.04, -0.4],
  ...[0, 1, 2].map(i => ['pop', WIGGLE + i * 0.09, [1046, 1175, 1318][i], 0.045, (i - 1) * 0.3]),
  ...PUNCH_HZ.map((f, i) => ['pop', PUNCH_T + 0.12 + i * 0.07, f, 0.05, 0]),
  ...[0, 1, 2].map(i => ['pop', AWAY + i * 0.07, [784, 659, 523][i], 0.04, (i - 1) * 0.3]),
  ['whoosh', AWAY + 0.15, 0.4, 0.035],
  ...END_HZ.map((f, i) => ['pop', i === 3 ? END_ACC : END_T + i * 0.07, f, i === 3 ? 0.07 : 0.06, 0]),
  ['bell', END_ACC + 0.02, 1318.5, 0.03, 1.6, 0],
  ['glitter', BURST - 0.05, BURST + 1.4],
  ...[1046, 1318, 1568, 1175, 1397].map((f, i) => ['pop', BURST + i * 0.06, f, 0.035, (i - 2) * 0.35]),
  ['pluck', BURST, 523.25, 0.05, 0.8, 0],
  ['bell', T_OUT + 0.05, 293.66, 0.03, 2.4, 0],
]
