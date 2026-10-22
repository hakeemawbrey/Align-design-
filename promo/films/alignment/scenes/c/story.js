// ─────────────────────────────────────────────── ALIGNMENT v2 · part c (39.8–60.01), vertical 1080×1920
// Bigger, bolder, more fun, no ad. Starts exactly on H (wheel.js v2) and ends on black. Beats on the 108 bpm grid
// (t = 0.6 + n·0.5556).
//   39.80–40.20  exactly H
//   40.35        eyebrow "BONUS ROUND" pops · 40.60 "One planet rules you *both*." pops in word by word (readable ≈41.2–46.6)
//   41.30–41.90  the other ten glyphs dim; Taurus and Libra bands warm up
//   41.71        ♀ Venus boings into the centre (overshoot) with a pink pixel-star burst
//   42.82 · 43.38  fat links shoot Venus → Taurus, Venus → Libra; each glyph bounces, sparkles
//   43.93        punchline "Venus runs / Taurus *and* Libra." (readable ≈44.5–46.65)
//   46.60–47.00  headline + punchline pop out; Venus stays, its links soften
//   46.90–47.25  both charts' six orbs pop onto their tracks (you outside, Juniper inside)
//   47.27 · 47.82 · 48.38  "Push." "Pull." "*Align.*" pop on the beat; at 48.38 all three lines shoot together
//                (gold 120° Libra Rising–Gemini Moon · blue 60° Libra Sun–Sag Moon · pink 90° Taurus Sun–Aquarius Rising)
//   49.00–50.60  celebratory spin: the whole wheel turns once with a little scale bump, Venus pulses
//   50.60        punchline "Every angle is / part of the story." (readable ≈51.2–53.25)
//   53.20–53.80  everything but the bare wheel pops out
//   53.93        the ring pops and its 12 glyphs burst out as confetti with pixel stars
//   54.30–55.10  "So… what's / *your* sign?" pops in, huge (readable ≈55.4–59.3); confetti drifts and fades
//   59.30–60.00  fade to black (last frame black)
import { lerp, prog, ease, tw, el, rng, C } from '../../../../src/lib.js'
import { W, H, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, READING, WHEEL, SKY_H, GRAIN_H, TYPE, easeOutBack, ptOf, angOf, signMid, drawWheelH } from '../../../wheel.js'
import { PLACEMENTS, TRACK, TINT } from '../a/placements.js'

const T0 = 39.8, T1 = 60.01, T_END = 60.0
const BEAT = n => 0.6 + n * 0.5556
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const VS = '︎'
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#f59cc4', VENUS_COL = '#ffc4de'
const TAU = SIGNS[1], LIB = SIGNS[6]
// tracks: you outside the ring, Juniper inside (part A's TRACK once it carries the v2 geometry)
const R = TRACK.you > WHEEL.rOut ? TRACK : { you: 500, juniper: 320 }
const POS = (who, body) => ptOf(PLACEMENTS[who][body].lon, R[who])

// ── beat 1
const EYE1 = 40.35, HEAD1 = BEAT(72), OUT1 = 46.6          // 40.60
const DIM = { a: 41.3, b: 41.9 }
const VEN = BEAT(74)                                         // 41.71
const LINK = [BEAT(76), BEAT(77)]                            // 42.82 Taurus, 43.38 Libra
const PUN1 = BEAT(78), PUN1_OUT = 46.65                      // 43.93
// ── beat 2
const ORBS = 46.9
const HEAD2 = [BEAT(84), BEAT(85), BEAT(86)]                 // 47.27 47.82 48.38
const LINES_AT = HEAD2[2]
const SPIN = { a: 49.0, b: 50.6 }
const PUN2 = BEAT(90), OUT2 = 53.2                           // 50.60
const ASPECTS = [
  { col: READING.push, a: ['you', 'sun'], b: ['juniper', 'rising'] },    // 90°
  { col: READING.pull, a: ['juniper', 'sun'], b: ['you', 'moon'] },      // 60°
  { col: READING.align, a: ['you', 'rising'], b: ['juniper', 'moon'] },  // 120°
]
// ── beat 3
const BURST = BEAT(96)                                       // 53.93
const END_WORDS = [54.3, 54.58, 54.86, 55.12]
const T_OUT = 59.3

// ───────────── word-by-word pop-in type
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 3px rgba(6,4,18,0.8)'
function popText(parent, lines, { top, size, font, lineH = 1.02, accentSize, gap = 0.07 }, times) {
  const box = el('div', { position: 'absolute', left: '70px', right: '70px', top: top + 'px', textAlign: 'center', color: BONE, textShadow: SHADOW }, parent)
  const words = []
  let k = 0
  lines.forEach(line => {
    const row = el('div', { font, fontSize: size + 'px', lineHeight: lineH, whiteSpace: 'nowrap' }, box)
    line.forEach(w => {
      const acc = typeof w === 'object'
      const s = el('span', { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%', willChange: 'transform, opacity',
        ...(acc ? { font: w.font || TYPE.accent, fontSize: (accentSize || size * 1.09) + 'px', color: w.color, lineHeight: '0.9' } : {}) }, row, acc ? w.w : w)
      words.push({ s, t: Array.isArray(times) ? times[k] : times + k * gap, bounce: acc ? 1.6 : 1 })
      k++
    })
  })
  return {
    words,
    update(t, out = Infinity) {
      words.forEach((w, i) => {
        const p = prog(t, w.t, w.t + 0.28 * (w.bounce > 1 ? 1.3 : 1))
        const sc = tw(p, [[0, 0.6], [0.6, 1 + 0.06 * w.bounce], [1, 1]], ease.outQuad)
        const o = out === Infinity ? 0 : prog(t, out + i * 0.03, out + i * 0.03 + 0.2)
        w.s.style.opacity = String(Math.min(1, p * 2.5) * (1 - o))
        w.s.style.transform = `translateY(${lerp(30, 0, ease.outCubic(p)) + 12 * o}px) scale(${sc * lerp(1, 0.85, o)})`
      })
    },
  }
}

// ───────────── pixel-star sparkle bursts (precomputed particles, pure functions of t)
function makeBurst(seed, n, { speed = [160, 320], size = [14, 28], colors = [VENUS_COL, '#fff4e0', PINK] } = {}) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: lerp(speed[0], speed[1], r()), sz: Math.round(lerp(size[0], size[1], r()) / 7) * 7, kind: Math.floor(r() * 3), col: colors[Math.floor(r() * colors.length)], life: lerp(0.55, 0.9, r()) }))
}
function drawBurst(ctx, parts, x, y, t, t0) {
  const lt = t - t0
  if (lt < 0 || lt > 1) return
  ctx.save()
  for (const p of parts) {
    const q = lt / p.life
    if (q >= 1) continue
    const d = p.d * ease.outCubic(q)
    ctx.globalAlpha = 1 - ease.inQuad(q)
    drawPixelStar(ctx, x + Math.cos(p.a) * d, y + Math.sin(p.a) * d, Math.max(7, Math.round(p.sz * (1 - 0.5 * q) / 7) * 7), p.kind, p.col)
  }
  ctx.restore()
}

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 24) + 'px', textAlign: 'center', font: TYPE.eyebrow, letterSpacing: '0.25em', textIndent: '0.25em', color: PINK, textShadow: SHADOW, opacity: 0 }, root, 'BONUS ROUND')
  const head1 = popText(root, [['One', 'planet'], ['rules', 'you', { w: 'both.', color: PINK }]], { top: 206, size: TYPE.headSize, font: TYPE.head }, HEAD1)
  const sub = { size: TYPE.subSize, font: TYPE.sub, lineH: 1.12, accentSize: 72 }
  const pun1 = popText(root, [['Venus', 'runs'], [{ w: 'Taurus', color: TAU.color, font: TYPE.sub }, { w: 'and', color: BONE }, { w: 'Libra.', color: LIB.color, font: TYPE.sub }]], { ...sub, top: 1528 }, PUN1)
  pun1.words[2].bounce = pun1.words[4].bounce = 1.3
  const head2 = popText(root, [['Push.', 'Pull.'], [{ w: 'Align.', color: GOLD }]], { top: 206, size: TYPE.headSize, font: TYPE.head, accentSize: 132 }, HEAD2)
  head2.words[0].s.style.color = READING.push; head2.words[1].s.style.color = READING.pull
  const pun2 = popText(root, [['Every', 'angle', 'is'], ['part', 'of', 'the', 'story.']], { ...sub, top: 1528 }, PUN2, 0.07)
  const endL = popText(root, [['So…', 'what’s'], [{ w: 'your', color: GOLD }, 'sign?']], { top: 780, size: 140, font: "800 140px Inter, 'Helvetica Neue', Arial, sans-serif", lineH: 1.04, accentSize: 168 }, END_WORDS)

  const black = fill(root, { background: '#000', opacity: 0 })

  // ── particles
  const venBurst = makeBurst(11, 18, { speed: [150, 300] })
  const sigBurst = [makeBurst(21, 12, { colors: [TAU.color, '#fff4e0', VENUS_COL] }), makeBurst(22, 12, { colors: [LIB.color, '#fff4e0', VENUS_COL] })]
  const endBursts = ASPECTS.map((A, i) => makeBurst(31 + i, 9, { speed: [80, 170], size: [14, 21], colors: [A.col, '#fff4e0'] }))
  const rC = rng(77)
  const confetti = SIGNS.map((s, i) => {
    const p0 = ptOf(i * 30 + 15, WHEEL.rGlyph)
    const out = Math.atan2(p0.y - WHEEL.cy, p0.x - WHEEL.cx) + (rC() - 0.5) * 0.7
    const v = lerp(330, 560, rC())
    return { s, x0: p0.x, y0: p0.y, vx: Math.cos(out) * v, vy: Math.sin(out) * v - 120, spin: (rC() - 0.5) * 5, sz: lerp(1.3, 1.8, rC()), wob: rC() * 6, delay: 0 }
  })
  // a second handful of glyphs pops out of the centre a beat later, so the sky around the end line fills up
  SIGNS.forEach((s, i) => {
    const a = (i / 12) * Math.PI * 2 + 0.26 + (rC() - 0.5) * 0.3, v = lerp(700, 1150, rC())
    confetti.push({ s, x0: WHEEL.cx, y0: WHEEL.cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v * 1.25 - 120, spin: (rC() - 0.5) * 5, sz: lerp(0.95, 1.35, rC()), wob: rC() * 6, delay: 0.12 + rC() * 0.12 })
  })
  const stars = Array.from({ length: 46 }, (_, i) => {
    const a = rC() * Math.PI * 2, v = lerp(600, 1250, rC())
    const col = SIGNS[Math.floor(rC() * 12)].color
    return { a, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 200, sz: [14, 21, 28][Math.floor(rC() * 3)], kind: Math.floor(rC() * 3), col, tw: rC() * 6, delay: rC() * 0.12 }
  })
  const fly = (x0, v, lt, k = 2.1) => x0 + v / k * (1 - Math.exp(-k * lt))

  // ── canvas pieces
  function band(ctx, s, alpha) {
    const i = SIGNS.indexOf(s), a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
    ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = s.color; ctx.globalCompositeOperation = 'lighter'
    ctx.beginPath(); ctx.arc(WHEEL.cx, WHEEL.cy, WHEEL.rOut, a1, a0); ctx.arc(WHEEL.cx, WHEEL.cy, WHEEL.rIn, a0, a1, true); ctx.closePath(); ctx.fill()
    ctx.restore()
  }
  function glyphAt(ctx, s, x, y, alpha, scale = 1, rot = 0, glow = 0) {
    ctx.save()
    ctx.translate(x, y); ctx.rotate(rot)
    ctx.font = `bold ${Math.round(58 * scale)}px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    if (glow > 0) { ctx.shadowColor = s.color; ctx.shadowBlur = 30 * glow }
    ctx.globalAlpha = alpha; ctx.fillStyle = s.color
    ctx.fillText(s.glyph + VS, 0, 0)
    ctx.restore()
  }
  function orb(ctx, x, y, col, k, rad = 22) {
    if (k <= 0.002) return
    ctx.save()
    const s = Math.max(0, k)
    const halo = ctx.createRadialGradient(x, y, 0, x, y, rad * 3.2 * s)
    halo.addColorStop(0, col + 'aa'); halo.addColorStop(0.35, col + '44'); halo.addColorStop(1, col + '00')
    ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = halo
    ctx.beginPath(); ctx.arc(x, y, rad * 3.2 * s, 0, Math.PI * 2); ctx.fill()
    ctx.globalCompositeOperation = 'source-over'
    const c = ctx.createRadialGradient(x - rad * 0.35 * s, y - rad * 0.35 * s, 0, x, y, rad * s)
    c.addColorStop(0, '#fffaf2'); c.addColorStop(0.5, col); c.addColorStop(1, col)
    ctx.globalAlpha = Math.min(1, k * 1.5); ctx.fillStyle = c
    ctx.beginPath(); ctx.arc(x, y, rad * s, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  }
  function fatLine(ctx, a, b, p, col, k, width = 7) {
    if (p <= 0 || k <= 0.002) return
    const x = lerp(a.x, b.x, p), y = lerp(a.y, b.y, p)
    ctx.save()
    ctx.lineCap = 'round'; ctx.strokeStyle = col; ctx.globalAlpha = k
    ctx.shadowColor = col; ctx.shadowBlur = 22
    ctx.lineWidth = width; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(x, y); ctx.stroke()
    ctx.shadowBlur = 0; ctx.strokeStyle = '#fff8ee'; ctx.globalAlpha = 0.55 * k; ctx.lineWidth = width * 0.3
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(x, y); ctx.stroke()
    if (p < 1) {
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = k
      const s = ctx.createRadialGradient(x, y, 0, x, y, 34)
      s.addColorStop(0, 'rgba(255,248,236,0.95)'); s.addColorStop(1, 'rgba(255,248,236,0)')
      ctx.fillStyle = s; ctx.fillRect(x - 34, y - 34, 68, 68)
    }
    ctx.restore()
  }
  function venus(ctx, t, k, pulse) {
    if (k <= 0.002) return
    const { cx, cy } = WHEEL
    const r = 44 * k * (1 + 0.03 * Math.sin(t * 4.4) + 0.12 * pulse)
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    const halo = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r * 4.2)
    halo.addColorStop(0, `rgba(255,196,222,${0.55 * Math.min(1, k)})`); halo.addColorStop(0.4, `rgba(245,140,196,${0.2 * Math.min(1, k)})`); halo.addColorStop(1, 'rgba(245,140,196,0)')
    ctx.fillStyle = halo; ctx.fillRect(cx - r * 4.3, cy - r * 4.3, r * 8.6, r * 8.6)
    ctx.globalCompositeOperation = 'source-over'
    const o = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r)
    o.addColorStop(0, '#fff7f2'); o.addColorStop(0.5, VENUS_COL); o.addColorStop(1, '#e48cbc')
    ctx.globalAlpha = Math.min(1, k * 1.4)
    ctx.fillStyle = o; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill()
    ctx.font = `bold ${Math.round(r * 1.3)}px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = '#4a1648'; ctx.fillText('♀' + VS, cx, cy + r * 0.04)
    ctx.globalAlpha = Math.min(1, k) * (0.6 + 0.4 * Math.sin(t * 5.3))
    drawPixelStar(ctx, cx + r * 0.7, cy - r * 0.7, 21, 0, VENUS_COL)
    ctx.restore()
  }

  return {
    start: T0, end: T1, root,
    update(t) {
      drawSky(bx, t, SKY_H)

      // ── spin + exit envelopes
      const spinP = ease.inOutCubic(prog(t, SPIN.a, SPIN.b))
      const rot = spinP * Math.PI * 2
      const bump = Math.sin(Math.PI * spinP) * 0.05
      const ringOut = prog(t, BURST, BURST + 0.35)                  // the ring pops away
      const extrasOut = ease.inOutQuad(prog(t, OUT2 + 0.05, OUT2 + 0.55))
      const xk = 1 - extrasOut

      bx.save()
      bx.translate(WHEEL.cx, WHEEL.cy); bx.rotate(rot); bx.scale(1 + bump + 0.12 * ease.outCubic(ringOut), 1 + bump + 0.12 * ease.outCubic(ringOut)); bx.translate(-WHEEL.cx, -WHEEL.cy)
      // the wheel (its own glyphs dim during beat 1, and hand over to the confetti at the burst)
      const dimK = ease.inOutQuad(prog(t, DIM.a, DIM.b)) * (1 - ease.inOutQuad(prog(t, OUT1, OUT1 + 0.6)))
      drawWheelH(bx, { k: 1 - ease.inQuad(ringOut), glyphK: t >= BURST ? 0 : 1 - 0.6 * dimK })

      // Taurus + Libra bands and their glyphs, lit by Venus
      const hitK = (i) => { const h = LINK[i]; return tw(t, [[h + 0.28, 0], [h + 0.42, 1, ease.outQuad], [h + 0.9, 0.35, ease.inOutQuad]]) }
      const pairK = ease.inOutQuad(prog(t, DIM.a, DIM.b)) * xk
      if (t < BURST && pairK > 0.002) {
        ;[TAU, LIB].forEach((s, i) => {
          band(bx, s, (0.16 + 0.22 * hitK(i)) * pairK)
          const p = ptOf(signMid(s.id), WHEEL.rGlyph)
          const sc = 1 + 0.55 * easeOutBack(prog(t, LINK[i] + 0.3, LINK[i] + 0.55)) * (1 - ease.inOutQuad(prog(t, LINK[i] + 0.55, LINK[i] + 1.0))) + 0.18 * prog(t, LINK[i] + 0.55, LINK[i] + 1.0)
          glyphAt(bx, s, p.x, p.y, pairK, t >= LINK[i] + 0.3 ? sc : 1, -rot, pairK * (0.4 + 0.6 * hitK(i)))
        })
      }

      // Venus's links
      const linkSoft = 1 - 0.6 * ease.inOutQuad(prog(t, OUT1 + 0.2, OUT1 + 0.8))
      ;[TAU, LIB].forEach((s, i) => {
        const a = ptOf(signMid(s.id), 62), b = ptOf(signMid(s.id), WHEEL.rIn - 8)
        fatLine(bx, a, b, ease.outCubic(prog(t, LINK[i], LINK[i] + 0.32)), s.color, 0.95 * linkSoft * xk, 8)
      })

      // both charts' orbs + the three aspect lines
      const orbK = (j) => easeOutBack(prog(t, ORBS + j * 0.06, ORBS + j * 0.06 + 0.32)) * xk
      const order = [['you', 'sun'], ['juniper', 'sun'], ['you', 'moon'], ['juniper', 'moon'], ['you', 'rising'], ['juniper', 'rising']]
      ASPECTS.forEach((A, i) => {
        const pa = POS(...A.a), pb = POS(...A.b)
        const lp = ease.outCubic(prog(t, LINES_AT, LINES_AT + 0.34))
        const glowPulse = 0.8 + 0.2 * Math.sin((t - LINES_AT) * 4 + i * 2)
        fatLine(bx, pa, pb, lp, A.col, glowPulse * xk, 8)
      })
      order.forEach(([who, body], j) => { const p = POS(who, body); orb(bx, p.x, p.y, TINT[who], orbK(j), 20) })
      // little landing sparkles where the lines meet the orbs (they ride the spin)
      ASPECTS.forEach((A, i) => { const pb = POS(...A.b); drawBurst(bx, endBursts[i], pb.x, pb.y, t, LINES_AT + 0.32) })
      bx.restore()

      // Venus (centre, so the spin doesn't move it; it pulses instead)
      const vk = easeOutBack(prog(t, VEN, VEN + 0.45), 2.4) * xk
      const vPulse = tw(t, [[LINES_AT, 0], [LINES_AT + 0.15, 1, ease.outQuad], [LINES_AT + 0.6, 0]]) + Math.sin(Math.PI * spinP) * 0.6
      venus(bx, t, vk, vPulse)
      drawBurst(bx, venBurst, WHEEL.cx, WHEEL.cy, t, VEN + 0.1)
      ;[TAU, LIB].forEach((s, i) => { const p = ptOf(signMid(s.id), WHEEL.rGlyph); drawBurst(bx, sigBurst[i], p.x, p.y, t, LINK[i] + 0.3) })

      // ── confetti: the 12 glyphs + pixel stars burst out and drift
      if (t >= BURST) {
        const lt = t - BURST
        const fade = 1 - ease.inOutQuad(prog(t, 57.4, 59.0))
        for (const s of stars) {
          const l = Math.max(0, lt - s.delay)
          if (l <= 0) continue
          const x = fly(WHEEL.cx, s.vx, l, 2.4), y = fly(WHEEL.cy, s.vy, l, 2.4) + 34 * l * l
          bx.save(); bx.globalAlpha = fade * Math.min(1, l * 8) * (0.65 + 0.35 * Math.sin(t * 7 + s.tw))
          drawPixelStar(bx, x, y, s.sz, s.kind, s.col); bx.restore()
        }
        for (const c of confetti) {
          const lt = t - BURST - c.delay
          if (lt <= 0) continue
          const x = fly(c.x0, c.vx, lt) + Math.sin(lt * 2.2 + c.wob) * 14 * prog(lt, 0.4, 1.4)
          const y = fly(c.y0, c.vy, lt) + 30 * lt * lt
          const sc = lerp(1, c.sz, easeOutBack(prog(lt, 0, 0.45)))
          glyphAt(bx, c.s, x, y, fade * Math.min(1, lt * 10), sc * (c.delay ? lerp(0.3, 1, easeOutBack(prog(lt, 0, 0.35))) : 1), c.spin * (1 - Math.exp(-1.6 * lt)) + 0.15 * Math.sin(lt * 1.7 + c.wob), 0.5)
        }
      }

      // ── type
      const eb = easeOutBack(prog(t, EYE1, EYE1 + 0.3)), ebo = prog(t, OUT1, OUT1 + 0.25)
      eyebrow.style.opacity = String(Math.min(1, prog(t, EYE1, EYE1 + 0.12)) * (1 - ebo))
      eyebrow.style.transform = `scale(${lerp(0.6, 1, eb) * lerp(1, 0.85, ebo)})`
      head1.update(t, OUT1)
      pun1.update(t, PUN1_OUT)
      head2.update(t, OUT2)
      pun2.update(t, OUT2 + 0.05)
      endL.update(t)

      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

// ───────────── sound
const wordPops = (t0, n, gap, freqs, gain = 0.05) => Array.from({ length: n }, (_, i) => ['pop', t0 + i * gap, freqs[i % freqs.length], gain, (i - (n - 1) / 2) * 0.12])
export const cues = [
  ['pop', EYE1, 1174.66, 0.045, 0],
  ...wordPops(HEAD1, 5, 0.07, [587.33, 659.25, 739.99, 880, 987.77]),
  ['pop', VEN, 783.99, 0.07, 0], ['glitter', VEN, VEN + 0.6], ['bell', VEN + 0.02, 587.33, 0.03, 2.0, 0],
  ['pluck', LINK[0], 659.25, 0.05, 0.45, -0.35], ['pop', LINK[0] + 0.32, 987.77, 0.055, -0.4],
  ['pluck', LINK[1], 783.99, 0.05, 0.45, 0.35], ['pop', LINK[1] + 0.32, 1174.66, 0.055, 0.4],
  ...wordPops(PUN1, 5, 0.07, [739.99, 880, 987.77, 880, 1174.66], 0.045),
  ['whoosh', OUT1, 0.4, 0.035],
  ...Array.from({ length: 6 }, (_, j) => ['pop', ORBS + j * 0.06, [587.33, 739.99, 880, 987.77, 1174.66, 1318.51][j], 0.04, j % 2 ? 0.3 : -0.3]),
  ['pop', HEAD2[0], 659.25, 0.065, -0.2], ['pop', HEAD2[1], 783.99, 0.065, 0.2], ['pop', HEAD2[2], 987.77, 0.07, 0],
  ['pluck', LINES_AT, 587.33, 0.05, 0.6, -0.3], ['pluck', LINES_AT + 0.01, 739.99, 0.05, 0.6, 0.3], ['pluck', LINES_AT + 0.02, 880, 0.05, 0.6, 0],
  ['glitter', LINES_AT + 0.25, LINES_AT + 0.9],
  ['riser', SPIN.a - 0.1, SPIN.a + 0.8, 0.04], ['whoosh', SPIN.a + 0.2, 1.3, 0.06],
  ['bell', SPIN.b - 0.05, 1174.66, 0.03, 1.6, 0],
  ...wordPops(PUN2, 7, 0.07, [739.99, 880, 987.77, 880, 739.99, 880, 1174.66], 0.04),
  ['whoosh', OUT2, 0.45, 0.035],
  ['boom', BURST, 0.12], ['glitter', BURST, BURST + 1.6],
  ...[587.33, 739.99, 880, 1174.66, 1479.98].map((f, i) => ['pop', BURST + i * 0.045, f, 0.05, (i - 2) * 0.25]),
  ['pop', END_WORDS[0], 659.25, 0.06, -0.15], ['pop', END_WORDS[1], 739.99, 0.06, 0.15], ['pop', END_WORDS[2], 987.77, 0.07, 0], ['pop', END_WORDS[3], 880, 0.065, 0],
  ['bell', END_WORDS[3] + 0.05, 587.33, 0.035, 2.4, 0],
  ['bell', T_OUT + 0.06, 293.66, 0.035, 2.6, 0],
]
