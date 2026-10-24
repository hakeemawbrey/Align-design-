// ─────────────────────────────────────────────── dummies · part c v2 (39.8–60.01) · one illustration per question, no wheel
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). H at both cuts = the plain sky (SKY_H) + grain (GRAIN_H).
//   40.60        Q6 "Who do I *get along* with?"
//   41.16–41.99  four big element icons pop into a 2×2 grid: flame, mountain + sprout, wind swirl, water drop
//   42.27        "Same element: *easy.*" — the others pop away; a second flame pops in; the two slide together and merge
//                into one bigger flame (≈43.2)                                               (punchline out 43.75)
//   43.94        "Fire + Air fan the flames." — a wind swirl blows gusts at the flame, which roars bigger
//   45.60        "Earth + Water grow things." — a drop falls on a mountain, splash, a sprout shoots up and blooms
//   47.45        Q6 clears
//   47.82        Q7 "Okay but… is it *real?*" (stars twinkle in, warm and calm)
//   48.93        "People have read the sky for thousands of years." — a timeline slides past: CLAY TABLETS → STONE CIRCLES
//                → ASTROLABES → STAR APPS                                                    (out 50.85)
//   51.16        "Try it on. Keep what *fits.*" — a clothes rack of sign shirts drops in; the ♉ shirt swings forward, gold ✓
//   53.00–53.45  everything pops away
//   53.94        "Congrats. You're *not* a dummy anymore." pops in huge; "not" (gold) lands last with a wobble
//   55.04        a graduation cap tosses up and spins + two confetti cannons of sign glyphs and pixel stars
//   59.30–60.00  fade to black (black from 59.965; the last frame is black)
import { lerp, prog, ease, el, rng, clamp, C } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, ELEMENT_COLOR, easeOutBack } from '../../../wheel.js'
import { flame, mountain, wind, gusts, drop, splash, tablet, stones, astrolabe, phone, rack, shirt, check, cap, BONE } from './illus.js'

const T0 = 39.8, T1 = 60.01, T_END = 60.0, T_OUT = 59.3
const beat = n => 0.6 + n * 0.5556
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const GOLD = '#f2c75c'
const VS = '︎'
const rad = d => d * Math.PI / 180

// ── Q6
const Q6 = beat(72), Q6_OUT = 47.45
const ICON_T = [beat(73), beat(73.5), beat(74), beat(74.5)]          // fire, earth, air, water
const A1 = beat(75), A1_OUT = 43.75
const MERGE = A1 + 0.95
const PAIR1 = beat(78), ROAR = PAIR1 + 0.7
const PAIR2 = beat(81), FALL = { a: PAIR2 + 0.55, b: PAIR2 + 0.95 }, GROW = PAIR2 + 1.0, BLOOM = PAIR2 + 1.5
// ── Q7
const Q7 = beat(85), A2 = beat(87), A2_OUT = 50.85, A3 = beat(91), AWAY = 53.0
const SWING = A3 + 0.6, CHECK = A3 + 0.9
// ── end
const END_T = beat(96), END_NOT = END_T + 0.5, BURST = beat(98)
const sp = (t, a, d = 0.4, s = 2.0) => easeOutBack(prog(t, a, a + d), s)
const out = (t, a, d = 0.25) => 1 - ease.inQuad(prog(t, a, a + d))

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
  endW[0].parentElement.style.top = '720px'

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

      // ════════ Q7 calm star field (behind everything)
      const warm = ease.inOutQuad(prog(t, Q7 - 0.2, Q7 + 1.2)) * out(t, AWAY, 0.5)
      if (warm > 0.003) {
        const g = bx.createRadialGradient(540, 1060, 0, 540, 1060, 640)
        g.addColorStop(0, `rgba(242,170,92,${0.16 * warm})`); g.addColorStop(1, 'rgba(232,98,138,0)')
        bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(0, 420, W, 1280); bx.globalCompositeOperation = 'source-over'
        bx.save(); bx.imageSmoothingEnabled = false
        for (const s of FIELD) {
          const a = warm * ease.outQuad(prog(t, Q7 + s.d, Q7 + s.d + 0.5)) * (0.35 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph)))
          if (a > 0.02) { bx.globalAlpha = a; drawPixelStar(bx, s.x, s.y, s.size, s.kind, s.col) }
        }
        bx.restore()
      }

      // ════════ Q6: element icons
      if (t >= ICON_T[0] && t < Q6_OUT + 0.4) {
        const q6out = out(t, Q6_OUT, 0.3)
        const GRID = [[300, 730], [780, 730], [300, 1220], [780, 1220]]
        const gone = i => out(t, A1 + 0.04 * i, 0.25)           // earth/air/water pop away at A1
        const pin = i => sp(t, ICON_T[i], 0.42, 2.2)
        // earth, air, water in the grid
        mountain(bx, GRID[1][0], GRID[1][1], 0.95 * pin(1) * gone(1), t, { sprout: 0.35 })
        wind(bx, GRID[2][0], GRID[2][1], 0.95 * pin(2) * gone(2), t)
        drop(bx, GRID[3][0], GRID[3][1], 0.95 * pin(3) * gone(3), t)
        // fire: grid → left of centre → merge → fanned
        const fm = ease.inOutCubic(prog(t, A1, A1 + 0.45))
        if (t < MERGE) {
          const slide = ease.inCubic(prog(t, A1 + 0.55, MERGE))
          const fx1 = lerp(lerp(GRID[0][0], 360, fm), 540, slide), fy1 = lerp(GRID[0][1], 1010, fm)
          flame(bx, fx1, fy1, lerp(0.95, 1.05, fm) * pin(0), t, { seed: 0 })
          const p2 = sp(t, A1 + 0.12, 0.42, 2.2)
          flame(bx, lerp(720, 540, slide), 1010, 1.05 * p2, t, { seed: 2.3 })
        } else {
          const big = lerp(1.05, 1.5, sp(t, MERGE, 0.45, 2.4))
          const c1 = ease.inOutCubic(prog(t, PAIR1, PAIR1 + 0.4))
          const roar = ease.inOutQuad(prog(t, ROAR, ROAR + 0.6))
          const s = lerp(big, 1.0, c1) * lerp(1, 1.6, sp(t, ROAR, 0.5, 1.8))
          const fo = out(t, PAIR2, 0.25)
          flame(bx, lerp(540, 690, c1), lerp(1010, 1060, c1), s * fo * q6out, t, { roar, seed: 1.1 })
          const wp = sp(t, PAIR1 + 0.1, 0.42, 2.2) * fo * q6out
          wind(bx, 250, 1000, 0.75 * wp, t, { puff: roar })
          gusts(bx, 380, 590, 1010, t, ease.outQuad(prog(t, PAIR1 + 0.45, PAIR1 + 0.8)) * fo * q6out)
        }
        // earth + water: drop falls on the mountain; a sprout shoots up and blooms
        if (t >= PAIR2) {
          const ms = 1.1 * sp(t, PAIR2 + 0.1, 0.42, 2.2) * q6out
          const MX = 540, MY = 1250, PX = MX + 60 * 1.1, PY = MY - 95 * 1.1
          mountain(bx, MX, MY, ms, t, { sprout: easeOutBack(prog(t, GROW, GROW + 0.55), 1.6), bloom: easeOutBack(prog(t, BLOOM, BLOOM + 0.4), 2.6) })
          const f = ease.inQuad(prog(t, FALL.a, FALL.b))
          if (t < FALL.b) drop(bx, lerp(540, PX, f), lerp(660, PY - 40, f), 0.55 * sp(t, PAIR2 + 0.15, 0.4, 2.2) * q6out, t, { stretch: 1 + 0.35 * Math.sin(Math.PI * f) })
          splash(bx, PX, PY - 10, prog(t, FALL.b, FALL.b + 0.5))
          sparkle(fxx, PX, PY - 190, t, BLOOM + 0.1, { n: 10, rad: 120, seed: 61, size: 24, cols: ['#ff7fb0', '#f2c75c', '#5fdc7a', '#fff3e0'] })
        }
        ICON_T.forEach((t0, i) => sparkle(fxx, GRID[i][0], GRID[i][1], t, t0 + 0.12, { n: 9, rad: 150, seed: 20 + i, size: 24, cols: [ELEMENT_COLOR[['fire', 'earth', 'air', 'water'][i]], '#fff3e0', '#ffd98a'] }))
        sparkle(fxx, 540, 960, t, MERGE, { n: 12, rad: 220, seed: 41, size: 30, cols: [ELEMENT_COLOR.fire, '#ffd98a', '#fff3e0'] })
        sparkle(fxx, 690, 900, t, ROAR + 0.1, { n: 12, rad: 240, seed: 42, size: 30, cols: [ELEMENT_COLOR.fire, ELEMENT_COLOR.air, '#fff3e0'] })
      }

      // ════════ Q7 (1): the timeline of sky-watching
      const tlA = ease.outQuad(prog(t, A2 - 0.3, A2)) * out(t, A2_OUT, 0.3)
      if (tlA > 0.003) {
        const p = ease.inOutQuad(prog(t, A2 - 0.15, A2_OUT - 0.15))
        const LBL = ['CLAY TABLETS', 'STONE CIRCLES', 'ASTROLABES', 'STAR APPS'], DRAW = [tablet, stones, astrolabe, phone]
        bx.save(); bx.globalAlpha = 0.55 * tlA; bx.strokeStyle = BONE; bx.lineWidth = 5; bx.shadowColor = BONE; bx.shadowBlur = 10
        bx.beginPath(); bx.moveTo(40, 1250); bx.lineTo(1040, 1250); bx.stroke(); bx.restore()
        for (let i = 0; i < 4; i++) {
          const x = 540 + (i - 3 * p) * 440
          const vis = tlA * clamp(1 - (Math.abs(x - 540) - 300) / 260)
          if (vis <= 0.003) continue
          const bob = 6 * Math.sin(t * 2 + i)
          const pop = 0.75 + 0.25 * clamp(1 - Math.abs(x - 540) / 440)
          DRAW[i](bx, x, 1010 + bob, 1.15 * pop, t, vis)
          bx.save(); bx.globalAlpha = vis
          bx.beginPath(); bx.arc(x, 1250, 13, 0, Math.PI * 2); bx.fillStyle = GOLD; bx.shadowColor = GOLD; bx.shadowBlur = 16; bx.fill()
          bx.font = `700 32px 'Space Mono', monospace`; bx.textAlign = 'center'; bx.fillStyle = BONE; bx.shadowColor = 'rgba(11,6,32,0.9)'; bx.shadowBlur = 12
          bx.letterSpacing = '4px'; bx.fillText(LBL[i], x, 1320)
          bx.restore()
        }
      }

      // ════════ Q7 (2): the clothes rack
      if (t >= A3 - 0.1 && t < AWAY + 0.6) {
        const away = out(t, AWAY, 0.35)
        const ra = ease.outQuad(prog(t, A3 - 0.1, A3 + 0.15)) * away
        const RAIL = 700, XS = [200, 370, 540, 710, 880]
        rack(bx, 120, 960, RAIL, 1440, ra)
        const SH = [SIGNS[0], SIGNS[3], SIGNS[1], SIGNS[6], SIGNS[11]]
        const sw = ease.inOutCubic(prog(t, SWING, SWING + 0.35))
        const order = [0, 1, 3, 4, 2]                                    // draw ♉ last (in front)
        for (const i of order) {
          const t0 = A3 + i * 0.06, tt = t - t0
          const din = easeOutBack(prog(t, t0, t0 + 0.4), 2.0)
          const swing = tt > 0 ? 0.35 * Math.exp(-tt * 3.5) * Math.sin(tt * 11) : 0
          const isT = i === 2
          const s = 0.68 * (isT ? lerp(1, 1.5, easeOutBack(prog(t, SWING, SWING + 0.45), 2.2)) : 1 - 0.06 * sw)
          const ts = t - SWING
          const wob = isT && ts > 0 ? 0.22 * Math.exp(-ts * 3) * Math.sin(ts * 10) : 0
          const a = Math.min(1, din * 2) * away * (isT ? 1 : 1 - 0.55 * sw)
          shirt(bx, XS[i], RAIL - 240 * (1 - din) + (isT ? 50 * sw : 0), s * Math.max(0.01, din), { a, sw: swing + wob + 0.03 * Math.sin(t * 1.6 + i), col: SH[i].color, glyph: SH[i].glyph })
        }
        check(fxx, 735, 980, 1.0 * away, ease.outCubic(prog(t, CHECK, CHECK + 0.4)))
        sparkle(fxx, 735, 980, t, CHECK + 0.25, { n: 12, rad: 160, seed: 71, size: 28 })
      }

      // ════════ copy
      eyePop(q6e, t, Q6, Q6_OUT); words(q6, t, Q6 + 0.05, Q6_OUT)
      eyePop(aE, t, A1, Q6_OUT)
      words(a1, t, A1, A1_OUT); words(a2, t, PAIR1 + 0.05, Q6_OUT); words(a3, t, PAIR2 + 0.05, Q6_OUT)
      eyePop(q7e, t, Q7, AWAY); words(q7, t, Q7 + 0.05, AWAY)
      words(a4, t, A2, A2_OUT, { dur: 0.26 }); words(a5, t, A3, AWAY)
      if (t >= Q6_OUT) eyePop(aE, t, A2, AWAY)

      // ════════ end: the cap toss + confetti, behind the huge line
      if (t >= BURST) {
        const tau = t - BURST, K = 1.8, VT = 45, f = (1 - Math.exp(-K * tau)) / K
        const x = 300 + 560 * f, y = 2040 + (-2950 - VT) * f + VT * tau
        cap(bx, x, y, 1.4 * easeOutBack(prog(tau, 0, 0.3), 1.6), { rot: -0.5 + 2.6 * f * K * 0.6 + 0.08 * Math.sin(tau * 2), spin: 7 * f })
        sparkle(fxx, x, y, t, BURST + 1.0, { n: 12, rad: 180, seed: 88, size: 28 })
      }
      confetti(bx, t)
      endW.forEach((w, i) => i === 2
        ? popWord(w, t, END_NOT, { back: 2.8, dur: 0.36, wobble: true })
        : popWord(w, t, END_T + (i > 2 ? i - 1 : i) * 0.08))
      sparkle(fxx, 540, 920, t, END_NOT + 0.15, { n: 14, rad: 260, seed: 77, size: 35 })

      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

export const cues = [
  ['pop', Q6, 1046, 0.05, 0],
  ...[784, 880, 988, 1175, 1046].map((f, i) => ['pop', Q6 + 0.05 + i * 0.07, f, 0.05, (i - 2) * 0.15]),
  ...ICON_T.map((t, i) => ['pop', t, [659, 784, 880, 1046][i], 0.065, [-0.3, 0.3, -0.3, 0.3][i]]),
  ...[880, 988, 1318].map((f, i) => ['pop', A1 + i * 0.07, f, 0.045, 0]),
  ['pop', A1 + 0.12, 784, 0.05, 0.3],
  ['whoosh', A1 + 0.55, 0.45, 0.03], ['pluck', MERGE, 392, 0.05, 0.7, 0], ['pop', MERGE + 0.02, 1175, 0.06, 0], ['glitter', MERGE, MERGE + 0.6],
  ...[880, 988, 1175].map((f, i) => ['pop', PAIR1 + 0.05 + i * 0.07, f, 0.045, 0]),
  ['pop', PAIR1 + 0.1, 988, 0.05, -0.4], ['whoosh', PAIR1 + 0.4, 1.2, 0.045], ['pluck', ROAR, 293.66, 0.05, 0.8, 0.2], ['boom', ROAR, 0.08], ['glitter', ROAR + 0.1, ROAR + 0.7],
  ...[784, 880, 988].map((f, i) => ['pop', PAIR2 + 0.05 + i * 0.07, f, 0.045, 0]),
  ['pop', PAIR2 + 0.15, 1318, 0.05, 0], ['pluck', FALL.b, 1174.66, 0.05, 0.4, 0], ['pop', GROW + 0.1, 659, 0.05, 0], ['pop', BLOOM + 0.1, 1568, 0.055, 0], ['glitter', BLOOM, BLOOM + 0.5],
  ['pop', Q7, 1046, 0.05, 0],
  ...[659, 784, 880, 988, 1318].map((f, i) => ['pop', Q7 + 0.05 + i * 0.07, f, 0.05, (i - 2) * 0.15]),
  ['riser', Q7, Q7 + 1.2, 0.02],
  ['whoosh', A2 - 0.1, 1.9, 0.035],
  ...[0, 1, 2, 3].map(i => ['pluck', A2 - 0.15 + i * 0.6, [440, 493.88, 587.33, 659.25][i], 0.04, 0.5, 0]),
  ...[0, 1, 2, 3, 4].map(i => ['pop', A3 + i * 0.06, [784, 880, 988, 1046, 1175][i], 0.04, (i - 2) * 0.2]),
  ['whoosh', SWING - 0.05, 0.4, 0.03], ['pop', SWING + 0.05, 1318, 0.06, 0.1], ['bell', CHECK + 0.1, 1568, 0.03, 1.4, 0.2], ['glitter', CHECK, CHECK + 0.5],
  ...[0, 1, 2].map(i => ['pop', AWAY + i * 0.07, [784, 659, 523][i], 0.04, (i - 1) * 0.3]),
  ['whoosh', AWAY + 0.15, 0.4, 0.035],
  ...[659, 784, 880, 988, 1046, 1175].map((f, i) => ['pop', END_T + i * 0.08, f, 0.05, (i - 2.5) * 0.12]),
  ['pop', END_NOT, 1318, 0.07, 0], ['bell', END_NOT + 0.02, 1318.5, 0.03, 1.6, 0],
  ['whoosh', BURST - 0.05, 0.6, 0.05], ['boom', BURST, 0.12], ['glitter', BURST, BURST + 1.6],
  ...[1046, 1318, 1568, 1175, 1397, 1760].map((f, i) => ['pop', BURST + i * 0.05, f, 0.035, i % 2 ? 0.5 : -0.5]),
  ['pluck', BURST + 0.02, 587.33, 0.05, 0.8, 0],
  ['bell', T_OUT + 0.05, 293.66, 0.03, 2.4, 0],
]
