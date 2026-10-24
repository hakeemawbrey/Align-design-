// htxgameday (15 s vertical Align ad) · story 0–10.6, then the shared end card ("come" + the Align logo).
//   0.00–3.45  HOOK  "Game day: | the whole city | wears the | *same colors.*"  A three-row crowd of pictogram fans pops
//              up in mixed shirts in front of a generic skyline; as "same colors." lands (1.156) a paint wave sweeps the
//              crowd and every shirt flips to the SAME plain teal jersey (no names, numbers or logos), confetti falls and
//              they bounce and pump their arms on every beat; a stadium wave rolls across on 2.82.
//   3.45–5.95  "Matching | shirts ^≠ | *matching people.*"  The jerseys drain to grey, left to right; then a zodiac
//              glyph badge pops above every head, twelve fans, twelve signs.
//   5.95–8.20  "Align matches | your *charts.*"  Everyone dims but two (♌ front left, ♐ back right); little chart rings
//              spin up round their badges and a gold arc links them.
//   8.20–10.45 "Match on | *more than* | *colors.*"  The crowd pops away; the two hop to centre stage, their jerseys
//              fill in their own (different) colours, they high-five, a heart pops on the gold arc. Out by 10.45.
//   10.45→     plain sky only (SKY_H + grain); the end card takes over at 10.6.
// One canvas (sky + illustration), DOM type above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { BONE, GOLD, PINK, TEAL, LAV, VIOLET, DUSK, INTER, MONO, GLYPH_FONT, SHADOW, rgba, mixHex, pop01, outK, popOut, ink, sparkle, popText, fan, heart } from './kit.js'

export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const TAU = Math.PI * 2
const BEATLEN = 60 / 108
const BEAT = n => +(0.6 + n * BEATLEN).toFixed(3)

// ── the timeline
const T = {
  hook: 0.08, eye: 0.05, rows: [0.14, 0.3, 0.46], wave: BEAT(1), stadium: BEAT(4), hookOut: [3.26, 3.44],
  h1: 3.48, h1Land: BEAT(5.5), drain: [3.75, 4.3], badges: 4.38, badgeGap: 0.085, h1Out: [5.78, 5.96],
  h2: 6.0, h2Land: BEAT(10), dim: [6.05, 6.4], rings: BEAT(10), arc: [6.45, 6.95], h2Out: [8.02, 8.2],
  h3: 8.24, h3Land: BEAT(14.5), crowdOut: 8.18, move: [8.3, 8.95], color: BEAT(15), five: BEAT(16), h3Out: [10.18, 10.44], out: [10.02, 10.44],
}

// ── the crowd: three rows, twelve fans, twelve signs (indices into SIGNS). Drawn back → front.
const MIXED = ['#e163d6', '#f39a3a', '#3f7cf0', '#f2cf4a', '#ef5c94', '#7c74f0', '#5fdc54', '#ff6a4d', '#38c4ec', '#c58bff', '#e9b24a', '#ff8fb1']
const ROWS = [
  { y: 1360, s: 0.74, xs: [140, 340, 540, 740, 940], t: T.rows[0] },
  { y: 1610, s: 0.94, xs: [240, 440, 640, 840], t: T.rows[1] },
  { y: 1868, s: 1.18, xs: [270, 540, 810], t: T.rows[2] },
]
const SIGN_ORDER = [10, 3, 6, 0, 8, 1, 11, 5, 9, 4, 2, 7]   // shuffled so neighbours differ; ♌ = front left, ♐ = back right
const FANS = []
ROWS.forEach((R, r) => R.xs.forEach((x0, j) => FANS.push({ x: x0, y: R.y, s: R.s, row: r, t0: R.t + j * 0.035 })))
FANS.forEach((f, i) => { f.sign = SIGN_ORDER[i]; f.mixed = MIXED[i]; f.ph = rng(70 + i)() })
const A_I = FANS.findIndex(f => f.sign === 4)          // Leo, front left
const B_I = FANS.findIndex(f => f.sign === 8)          // Sagittarius, back right
// badge pop order: a scatter, not left-to-right
const BADGE_ORDER = [5, 0, 10, 3, 8, 1, 11, 6, 2, 9, 4, 7]
// end positions for the pair
const END_POS = [{ x: 300, y: 1820, s: 1.45 }, { x: 780, y: 1820, s: 1.45 }]

// generic skyline (seeded, no real buildings)
const SKY_BASE = 1440
const TOWERS = (() => {
  const r = rng(11), out = []
  let x0 = -20
  while (x0 < W + 20) {
    const w = 60 + r() * 70, h = 110 + r() * 200 + (Math.abs(x0 - 560) < 220 ? 130 * r() : 0)
    out.push({ x: x0, w, h, top: Math.floor(r() * 4), seed: Math.floor(r() * 1000) })
    x0 += w + 6 + r() * 14
  }
  return out
})()

// confetti (falls from the wave)
const CONF = (() => {
  const r = rng(23)
  return Array.from({ length: 90 }, () => ({ x: r() * W, y0: -60 - r() * 900, v: 480 + r() * 380, sw: 20 + r() * 40, f: 2 + r() * 3, rot: r() * TAU, rs: (r() - 0.5) * 12,
    col: [TEAL, BONE, GOLD, '#7ff5d8', TEAL][Math.floor(r() * 5)], w: 14 + r() * 10, h: 8 + r() * 6 }))
})()

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 190px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('HOUSTON, TX'), T.eye, T.hookOut], [eyebrow('ON ALIGN'), T.h2, T.h2Out]]
  const H0a = popText(root, 'Game day:', { top: 190, size: 160, at: T.hook, lineHeight: 1 })
  const H0b = popText(root, 'the whole city | wears the | *same* *colors.*', { top: 370, size: 100, accentSize: 150, at: T.hook + 0.3, gap: 0.08, late: 2, lateAt: T.wave - 0.08, lateGap: 0.1, wobble: true, accentColor: TEAL, lineHeight: 1.0 })
  const H1 = popText(root, 'Matching | shirts ^≠ | *matching* *people.*', { top: 200, size: 128, accentSize: 132, at: T.h1, gap: 0.08, late: 2, lateAt: T.h1Land - 0.1, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H2 = popText(root, 'Align matches | your *charts.*', { top: 230, size: 116, accentSize: 168, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true })
  const H3 = popText(root, 'Match on | *more* *than* | *colors.*', { top: 190, size: 150, accentSize: 176, at: T.h3, late: 3, lateAt: T.h3Land - 0.2, lateGap: 0.1, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0a, T.hookOut], [H0b, T.hookOut], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── motion helpers
  const ph = t => (t - 0.6) / BEATLEN                   // beat phase (integer on the beat)
  // how hard the crowd bounces: still while popping in, big after the wave, a light sway later
  const hopAmp = t => t < T.wave ? 6 : t < T.drain[0] ? 34 : t < T.dim[0] ? lerp(34, 9, prog(t, T.drain[0], T.drain[0] + 0.4)) : 7
  function fanPose(f, i, t) {
    const p = ph(t) + (t > T.drain[0] ? f.ph * 0.6 : 0)
    const fr = p - Math.floor(p)
    let hop = hopAmp(t) * Math.abs(Math.sin(Math.PI * p))
    // stadium wave: a big jump rolling left → right
    const wv = Math.exp(-Math.pow((t - (T.stadium + (f.x / W) * 0.55)) / 0.13, 2))
    hop += 70 * wv
    const land = t > T.wave && t < T.drain[0] + 0.4 ? Math.exp(-fr * 9) : 0
    const sq = 1 + 0.07 * land
    // arms: down → pumping on the beat after the wave → overhead in the stadium wave → down for the turn
    const pumpK = clamp((t - T.wave) * 4) * (1 - clamp((t - T.drain[0]) * 3))
    const up = clamp(pumpK * (0.55 + 0.45 * Math.cos(TAU * p)) + wv)
    return { hop, sq, up }
  }
  const handsFor = up => [[lerp(-64, -92, up), lerp(-84, -318, up)], [lerp(64, 92, up), lerp(-84, -318, up)]]

  // jersey colour of fan i at t, plus its wave flash
  function jerseyOf(f, i, t) {
    const tw = T.wave + (f.x / W) * 0.32 - 0.06
    const k = clamp((t - tw) / 0.08)
    let col = mixHex(f.mixed, TEAL, k), jfa = 0.9
    const flash = t > tw ? Math.exp(-(t - tw) * 7) : 0
    // drain to grey, left → right
    const td = T.drain[0] + (f.x / W) * (T.drain[1] - T.drain[0] - 0.2)
    const d = ease.inOutQuad(prog(t, td, td + 0.25))
    col = mixHex(col, '#5d567e', d); jfa = lerp(jfa, 0.42, d)
    return { col, jfa, flash, drained: d }
  }

  function drawSkyline(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    for (const B of TOWERS) {
      const top = SKY_BASE - B.h
      x.beginPath()
      if (B.top === 1) { x.moveTo(B.x, SKY_BASE); x.lineTo(B.x, top + 30); x.lineTo(B.x + B.w / 2, top - 10); x.lineTo(B.x + B.w, top + 30); x.lineTo(B.x + B.w, SKY_BASE) }
      else if (B.top === 2) { x.moveTo(B.x, SKY_BASE); x.lineTo(B.x, top + 24); x.lineTo(B.x + B.w * 0.2, top + 24); x.lineTo(B.x + B.w * 0.2, top); x.lineTo(B.x + B.w * 0.8, top); x.lineTo(B.x + B.w * 0.8, top + 24); x.lineTo(B.x + B.w, top + 24); x.lineTo(B.x + B.w, SKY_BASE) }
      else x.rect(B.x, top, B.w, B.h + 2)
      x.fillStyle = '#100b26'; x.fill()
      x.strokeStyle = rgba(VIOLET, 0.35); x.lineWidth = 3; x.stroke()
      // windows
      const r = rng(B.seed)
      for (let wy = top + 36; wy < SKY_BASE - 20; wy += 26) for (let wx = B.x + 12; wx < B.x + B.w - 14; wx += 20) {
        if (r() < 0.62) continue
        const on = 0.5 + 0.5 * Math.sin(t * 1.3 + wx * 0.07 + wy * 0.03)
        x.fillStyle = rgba('#ffd98a', 0.25 + 0.35 * on); x.fillRect(wx, wy, 8, 10)
      }
    }
    x.restore()
  }

  function drawConfetti(t) {
    const tt = t - T.wave
    if (tt < 0 || tt > 3.2) return
    const fade = 1 - prog(t, T.hookOut[0] - 0.2, T.hookOut[1] + 0.1)
    if (fade <= 0) return
    x.save()
    for (const c of CONF) {
      const y = c.y0 + c.v * tt
      if (y < -40 || y > 1960) continue
      const px = c.x + Math.sin(tt * c.f + c.rot) * c.sw
      x.save(); x.translate(px, y); x.rotate(c.rot + c.rs * tt); x.scale(1, Math.cos(tt * c.f * 2 + c.rot))
      x.globalAlpha = fade * 0.95; x.fillStyle = c.col; x.fillRect(-c.w / 2, -c.h / 2, c.w, c.h)
      x.restore()
    }
    x.restore()
  }

  // where each fan stands (and how big) at t; the pair moves to centre stage at the end
  function placeOf(f, i, t) {
    const pi = i === A_I ? 0 : i === B_I ? 1 : -1
    if (pi < 0) return { px: f.x, py: f.y, s: f.s }
    const E = END_POS[pi], m = ease.inOutCubic(prog(t, ...T.move))
    const arcUp = Math.sin(Math.PI * m) * 160
    return { px: lerp(f.x, E.x, m), py: lerp(f.y, E.y, m) - arcUp, s: lerp(f.s, E.s, m) }
  }

  function badgePos(f, i, t, P, hop) {
    const r = 34 + 22 * P.s
    return { bx: P.px, by: P.py - hop - 300 * P.s - r - 6, r }
  }

  function drawCrowd(t) {
    const endK = popOut(t, T.out)
    const dimK = ease.inOutQuad(prog(t, ...T.dim)) * (1 - ease.inOutQuad(prog(t, T.crowdOut - 0.1, T.crowdOut + 0.2)))
    // pair end-state
    const colK = ease.outCubic(prog(t, T.color, T.color + 0.3))
    const five = t - T.five
    const order = FANS.map((_, i) => i).filter(i => i !== A_I && i !== B_I)
    const pairLate = t > T.move[0]
    const seq = pairLate ? [...order, A_I, B_I] : FANS.map((_, i) => i)
    const badges = []
    for (const i of seq) {
      const f = FANS[i], pair = i === A_I || i === B_I
      let k = pop01(t, f.t0, 0.42, 2.2)
      if (!pair) k *= popOut(t, [T.crowdOut + (i % 5) * 0.04, T.crowdOut + 0.3 + (i % 5) * 0.04])
      else k *= endK
      if (k <= 0) continue
      const P = placeOf(f, i, t)
      const pose = fanPose(f, i, t)
      let hop = pose.hop
      let hands = handsFor(pose.up)
      const J = jerseyOf(f, i, t)
      let jcol = J.col, jfa = J.jfa, flash = J.flash
      const a = pair ? 1 : 1 - 0.68 * dimK
      if (pair) {
        // end: own colours, a hop on each beat, then a high-five across the middle
        const own = SIGNS[f.sign].color
        jcol = mixHex(jcol, own, colK); jfa = lerp(jfa, 0.92, colK)
        flash = Math.max(flash, t > T.color ? Math.exp(-(t - T.color) * 6) * colK : 0)
        if (t > T.move[1]) hop = 22 * Math.abs(Math.sin(Math.PI * ph(t)))
        const hf = ease.outBack(prog(t, T.five - 0.32, T.five))
        const rel = ease.inOutQuad(prog(t, T.five + 0.5, T.five + 0.85))
        const hk = hf * (1 - rel)
        if (hk > 0) {
          const side = i === A_I ? 1 : -1
          const E = END_POS[i === A_I ? 0 : 1]
          const tgt = [(540 - side * 8 - E.x) / E.s, (1350 - E.y + hop) / E.s]
          const inner = side > 0 ? 1 : 0
          hands = hands.map((h, j) => j === inner ? [lerp(h[0], tgt[0], hk), lerp(h[1], tgt[1], hk)] : [lerp(h[0], h[0] - side * 30, hk), lerp(h[1], -120, hk)])
        }
      }
      const rise = (1 - ease.outCubic(prog(t, f.t0, f.t0 + 0.42))) * 220
      x.save(); x.translate(P.px, P.py - hop + rise); x.scale(P.s * k / pose.sq, P.s * k * pose.sq)
      fan(x, { jersey: jcol, jfa, hands, flash, body: mixHex(LAV, '#ffffff', 0.1), a })
      x.restore()
      badges.push({ i, f, P, hop, k, a, pair })
      if (!pair || t < T.move[0]) sparkle(x, P.px, P.py - 150 * P.s, t, T.wave + (f.x / W) * 0.32, { n: 6, R: 110 * P.s, seed: 5 + i, size: 20, cols: [TEAL, '#7ff5d8', BONE, GOLD] })
    }
    // stadium wave + big sparkle
    sparkle(x, 540, 1300, t, T.stadium + 0.25, { n: 18, R: 520, seed: 9, size: 30, cols: [TEAL, '#7ff5d8', GOLD, BONE, PINK] })

    // badges (on top of everyone)
    const B = {}
    for (const b of badges) {
      const oi = BADGE_ORDER.indexOf(b.i)
      const bt = T.badges + oi * T.badgeGap
      const bk = pop01(t, bt, 0.36, 2.6) * b.k
      if (bk <= 0) continue
      const S = SIGNS[b.f.sign]
      const { bx, by, r } = badgePos(b.f, b.i, t, b.P, b.hop)
      B[b.i] = { bx, by, r, bk }
      // mini chart ring round the two
      if (b.pair) {
        const rk = pop01(t, T.rings, 0.5, 1.8) * b.k
        if (rk > 0) {
          const R0 = r * 1.95
          x.save(); x.translate(bx, by); x.rotate(t * 0.9 * (b.i === A_I ? 1 : -1)); x.scale(rk, rk)
          x.beginPath(); x.arc(0, 0, R0, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.55)'; x.fill()
          drawWheelH(x, { W: { cx: 0, cy: 0, rOut: R0, rIn: R0 * 0.76, rGlyph: R0 * 0.88, alpha: 0.9 }, k: 1, glyphK: 0 })
          x.restore()
          sparkle(x, bx, by, t, T.rings, { n: 10, R: R0 * 1.6, seed: 31 + b.i, size: 24 })
        }
      }
      const glowK = b.pair ? ease.inOutQuad(prog(t, ...T.dim)) : 0
      x.save(); x.translate(bx, by); x.scale(bk, bk); x.globalAlpha = b.a
      if (glowK > 0) {
        const g = x.createRadialGradient(0, 0, 0, 0, 0, r * 2.6); g.addColorStop(0, rgba(GOLD, 0.55 * glowK)); g.addColorStop(1, rgba(GOLD, 0))
        x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.beginPath(); x.arc(0, 0, r * 2.6, 0, TAU); x.fill(); x.globalCompositeOperation = 'source-over'
      }
      x.beginPath(); x.arc(0, 0, r, 0, TAU); ink(x, b.pair && glowK > 0 ? mixHex(S.color, GOLD, glowK * 0.6) : S.color, { w: 6, fa: 0.9, fill: '#140f2e', glow: 18 + 14 * glowK })
      x.font = `bold ${Math.round(r * 1.3)}px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = S.color; x.shadowColor = S.color; x.shadowBlur = 10
      x.fillText(S.glyph + '︎', 0, r * 0.06)
      x.restore()
      sparkle(x, bx, by, t, bt + 0.05, { n: 7, R: r * 2.2, seed: 50 + b.i, size: 18, cols: [S.color, BONE, GOLD] })
    }

    // the gold arc between the pair
    const ak = ease.inOutCubic(prog(t, ...T.arc))
    if (ak > 0 && B[A_I] && B[B_I]) {
      const a0 = B[A_I], b0 = B[B_I]
      const midY = Math.min(a0.by, b0.by) - lerp(220, 170, ease.inOutCubic(prog(t, ...T.move)))
      const ctrl = { x: (a0.bx + b0.bx) / 2, y: midY }
      const pt = u => ({ x: (1 - u) * (1 - u) * a0.bx + 2 * u * (1 - u) * ctrl.x + u * u * b0.bx, y: (1 - u) * (1 - u) * a0.by + 2 * u * (1 - u) * ctrl.y + u * u * b0.by })
      const pulse = 1 + 0.35 * Math.exp(-Math.max(0, t - T.arc[1]) * 4) + (five > 0 ? 0.5 * Math.exp(-five * 4) : 0)
      x.save(); x.globalAlpha = endK
      x.beginPath()
      const N = 48
      for (let j = 0; j <= N * ak; j++) { const p = pt(j / N); j ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y) }
      ink(x, GOLD, { w: 10 * pulse, fa: 0, glow: 30 })
      // a spark travelling the line while it draws, then a slow shimmer bead
      const head = pt(ak < 1 ? ak : (0.5 + 0.5 * Math.sin((t - T.arc[1]) * 2.4)))
      x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(head.x, head.y, 0, head.x, head.y, 40); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = g; x.beginPath(); x.arc(head.x, head.y, 40, 0, TAU); x.fill()
      x.restore()
      sparkle(x, b0.bx, b0.by, t, T.arc[1] - 0.04, { n: 12, R: 150, seed: 61, size: 26, cols: [GOLD, '#fff3e0', '#ffd98a'] })
      // high-five: heart on the arc's peak + a burst at the hands
      const hk = pop01(t, T.five, 0.45, 3) * endK
      if (hk > 0) {
        const top = pt(0.5), beatS = 1 + 0.1 * Math.max(0, Math.sin((t - T.five) * 8))
        x.save(); x.translate(top.x, top.y - 6); heart(x, 66 * hk * beatS, PINK, clamp(hk * 2)); x.restore()
      }
      sparkle(x, 540, 1350, t, T.five, { n: 18, R: 260, seed: 71, size: 30, cols: [PINK, GOLD, '#fff3e0', VIOLET, TEAL] })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) {
        const skyK = ease.outCubic(prog(t, 0.05, 0.6)) * (1 - ease.inOutQuad(prog(t, T.crowdOut, T.crowdOut + 0.4))) * 0.9
        drawSkyline(t, skyK)
        drawCrowd(t)
        drawConfetti(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END })]

// ── sound (pitched SFX are shifted into the film's key by the engine; this is D major)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const r3 = v => +v.toFixed(3)
export const CUES = [
  // hook: game day, the crowd pops up row by row, the colour wave, the stadium wave
  ['whoosh', 0.05, 0.4, 0.03], ['pop', T.hook, 880, 0.05, 0], ['pop', T.hook + 0.07, 1174.66, 0.05, 0],
  ...T.rows.map((r, i) => ['pop', r, [440, 587.33, 739.99][i], 0.055, (i - 1) * 0.4]),
  ...wordPops(T.hook + 0.3, 5, 0.08, 0, 0.025),
  ['pop', r3(T.wave - 0.08), 1174.66, 0.055, 0], ['pop', r3(T.wave + 0.02), 1318.51, 0.055, 0], ['pluck', T.wave, 1174.66, 0.05, 0.6, 0],
  ['whoosh', r3(T.wave - 0.05), 0.5, 0.05], ['glitter', T.wave, r3(T.wave + 0.8)], ['bell', T.wave, 1760, 0.035, 1.2, 0.2],
  ['riser', r3(T.stadium - 1.0), T.stadium, 0.035],
  ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.stadium + i * 0.09), 0.045]),
  ['whoosh', T.stadium, 0.6, 0.05], ['glitter', r3(T.stadium + 0.25), r3(T.stadium + 0.85)],
  // matching shirts ≠ matching people: drain, then twelve glyph badges climbing the scale
  ...wordPops(T.h1, 3, 0.08, 1, 0.025), ['pop', r3(T.h1Land - 0.1), 1318.51, 0.05, 0], ['pop', T.h1Land, 1174.66, 0.05, 0],
  ['whoosh', T.drain[0], 0.55, 0.035],
  ...BADGE_ORDER.map((_, k) => ['pluck', r3(T.badges + k * T.badgeGap), NOTE[k % 7] * (k >= 7 ? 2 : 1) / 2, 0.035, 0.4, ((k % 3) - 1) * 0.45]),
  ['glitter', r3(T.badges + 0.5), r3(T.badges + 1.1)],
  // align matches your charts
  ...wordPops(T.h2, 3, 0.07, 2, 0.025), ['pop', T.h2Land, 1318.51, 0.055, 0],
  ['bell', T.rings, 587.33, 0.045, 1.8, -0.3], ['bell', r3(T.rings + 0.06), 880, 0.035, 1.8, 0.3],
  ['whoosh', T.arc[0], 0.5, 0.035], ['pluck', T.arc[1], 1174.66, 0.05, 0.8, 0.3], ['glitter', T.arc[1], r3(T.arc[1] + 0.6)],
  // match on more than colors: the crowd pops away, the pair hops in, colours, high-five
  ...Array.from({ length: 5 }, (_, i) => ['pop', r3(T.crowdOut + 0.1 + i * 0.04), NOTE[6 - i], 0.03, (i - 2) * 0.3]),
  ['whoosh', T.move[0], 0.55, 0.04],
  ...wordPops(T.h3, 2, 0.07, 1, 0.03), ['pop', r3(T.h3Land - 0.2), 987.77, 0.05, 0], ['pop', r3(T.h3Land - 0.1), 1174.66, 0.05, 0], ['pop', T.h3Land, 1318.51, 0.055, 0],
  ['pop', T.color, 739.99, 0.05, -0.4], ['pop', r3(T.color + 0.04), 880, 0.05, 0.4],
  ['boom', T.five, 0.11], ['bell', T.five, 1174.66, 0.05, 1.4, 0], ['bell', r3(T.five + 0.08), 1760, 0.035, 1.4, 0.2], ['glitter', T.five, r3(T.five + 0.6)],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...endcardCues(STORY_END),
]
