// srcitydallas · "Dallas: big expectations" (Star Talk Remix of citydallas, 20 s vertical, music: funk, Eb) · story 0–15.6,
// then the shared end card (cta VOTE FOR YOUR CITY, as the original).
//   0.00–5.75  "Dallas: big hair, | big trucks, big | *expectations.*"  The ♌ Leo star, in a bouffant that poofs bigger on every
//              beat, reads its list while a lifted pickup rolls in: LEO: "my type: tall, rich, owns a *ranch.*" Drop (2.82):
//              THE STARS rise up behind everything, GIANT (everything's bigger here), and Leo's hair poofs once more to keep
//              up. THE STARS, deadpan: "that list is longer than *I-35.*"
//   5.88       the truck peels off; the giant star shrinks into the chart centre (breakdown).
//   5.95–10.6  "Meet someone | who *meets them.*"  Two birth charts slide in and lock round THE STARS (6.71); the ♐ Sag star
//              rolls in; Push / Pull / Align draw between the charts; chip LEO + SAG · FIRE TRINE.
//              THE STARS: "skip the list. check the *fit.*"
//  10.75       card cut (flip)
//  10.85–15.4  "Big love, | *by the stars.*"  THE STARS grow big again, heart-eyed; Leo and Sag scoot together, gold beams run
//              up from both; chip EXPECTATIONS: MET; Leo's hair does one last proud poof. All out by 15.42.
// One canvas (sky + set + cast + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, FIRE, rgba, ink, sparkle, heart, bigHair, truck, starFrame } from './props.js'

export const DURATION = 20
export const CTA = 'VOTE FOR YOUR CITY'
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
const INK = '#1b1236', MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2, D2R = Math.PI / 180
const B = n => +(0.6 + n * 60 / 108).toFixed(3)
const LEO = signStar('leo'), SAG = signStar('sagittarius')
const L_TAG = `${LEO.glyph}︎ LEO`, S_TAG = 'THE STARS'
const CPS = 28

export const T = {
  h0: 0.15, h0Land: B(4), h0Out: [5.55, 5.72],
  leoIn: 0.3, poofs: [B(1), B(2), B(3)], roll: [B(1.6), B(3)], drop: B(4), rise: [B(4), B(4) + 0.6], gagPoof: B(5),
  open: 0.9, l0: 1.1, l1: 4.35,
  wipe: B(9.5), peel: [5.6, 6.25], shrink: [5.7, 6.45],
  h1: 5.95, h1Land: 6.3, h1Out: [10.42, 10.6], slide: [6.0, B(11)], lock: B(11), sagIn: [6.4, 7.1], lines: [B(12), B(12.5), B(13)], trine: 8.15, l2: 7.3, close: 10.45,
  cut: 10.75,
  h2: 10.85, h2Land: 11.2, grow: [10.8, 11.45], snug: [10.9, 11.55], beams: [11.6, 12.1], met: B(21), lastPoof: B(23), out: [15.0, 15.42],
}
const LINES = [
  { t: T.l0, speaker: L_TAG, color: GOLD, text: 'my type: tall, rich, owns a *ranch.*' },
  { t: T.l1, speaker: S_TAG, color: PINK, text: 'that list is longer than *I-35.*' },
  { t: T.l2, speaker: S_TAG, text: 'skip the list. check the *fit.*' },
]
const CUTS = [5.75, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: CTA }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b

// ── layout
const GROUND = 1500
const C = { x: 540, y: 960 }
const WA = { cx: 0, cy: 0, rOut: 400, rIn: 320, rGlyph: 360, alpha: 0.92 }
const WB = { cx: 0, cy: 0, rOut: 290, rIn: 226, rGlyph: 258, alpha: 0.92 }
const CS = 0.6
const PAIRS = [{ a: 40, b: 150, col: READING.push }, { a: 160, b: 280, col: READING.pull }, { a: 265, b: 25, col: READING.align }]
const ptC = (lon, r, cx, cy) => ({ x: cx + Math.cos(Math.PI - lon * D2R) * r, y: cy + Math.sin(Math.PI - lon * D2R) * r })

function hairR(t) {
  let R = 50
  for (const [t0, r] of [[T.poofs[0], 74], [T.poofs[1], 96], [T.poofs[2], 116], [T.gagPoof, 138], [T.lastPoof, 162]]) R = lerp(R, r, easeOutBack(prog(t, t0, t0 + 0.26), 2.6))
  return R
}
const hairWob = t => [...T.poofs, T.gagPoof, T.lastPoof].reduce((m, p) => Math.max(m, t > p ? Math.exp(-(t - p) * 5) : 0), 0)
function leoPose(t) {
  const m1 = ease.inOutCubic(prog(t, 5.7, 6.4)), m2 = ease.inOutCubic(prog(t, ...T.snug))
  return { x: lerp(lerp(290, 210, m1), 400, m2), y: lerp(lerp(1310, 1440, m1), 1390, m2), s: lerp(lerp(250, 160, m1), 230, m2) }
}
function sagPose(t) {
  const m1 = ease.outCubic(prog(t, ...T.sagIn)), m2 = ease.inOutCubic(prog(t, ...T.snug))
  return { x: lerp(lerp(1300, 870, m1), 690, m2), y: lerp(1440, 1400, m2), s: lerp(160, 230, m2) }
}
function skyPose(t) {
  const r = ease.outCubic(prog(t, ...T.rise)), sh = ease.inOutCubic(prog(t, ...T.shrink)), g = ease.inOutCubic(prog(t, ...T.grow))
  const y0 = lerp(1700, 880, r)
  return { x: lerp(lerp(650, C.x, sh), 540, g), y: lerp(lerp(y0, C.y, sh), 820, g), s: lerp(lerp(560 * (0.3 + 0.7 * r), 150, sh), 400, g) }
}

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 28px 'Space Mono'", "bold 60px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 150, wobble: true, late: 1, ...o })
  const HEADS = [
    [H('Dallas: big hair, | big trucks, big | *expectations.*', { top: 140, size: 96, accentSize: 140, at: T.h0, gap: 0.1, lateAt: T.h0Land, accentColor: GOLD }), T.h0Out],
    [H('Meet someone | who *meets them.*', { top: 150, size: 100, accentSize: 146, late: 2, at: T.h1, lateAt: T.h1Land, lateGap: 0.12, accentColor: PINK }), T.h1Out],
    [H('Big love, | *by the stars.*', { top: 150, size: 112, accentSize: 156, late: 3, at: T.h2, lateAt: T.h2Land, lateGap: 0.1, accentColor: GOLD }), T.out],
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 236, cps: CPS, open: T.open, close: T.close })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const L_HOPS = [...talkHops(LINES, L_TAG, { cps: CPS }), T.drop + 0.05, T.lock + 0.1, T.snug[1], T.met + 0.1, T.lastPoof]
  const G_HOPS = [T.sagIn[1], T.lines[2] + 0.2, T.snug[1] + 0.05, T.met + 0.2]
  const S_HOPS = [...talkHops(LINES, S_TAG, { cps: CPS }), T.lock, T.met]

  function chip(px, py, text, k, { size = 28, col = BONE, bar = GOLD } = {}) {
    if (k <= 0.01) return
    x.save(); x.translate(px, py); x.scale(k, k)
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(text).width + 32, th = size + 22
    x.fillStyle = INK; x.fillRect(-tw / 2 - 4, -th / 2 - 4, tw + 8, th + 8)
    x.fillStyle = 'rgba(20,12,44,0.97)'; x.fillRect(-tw / 2, -th / 2, tw, th); x.fillStyle = bar; x.fillRect(-tw / 2, th / 2 - 5, tw, 5)
    x.fillStyle = col; x.fillText(text, 0, 2)
    x.restore()
  }

  // ── the road + the truck (hook only)
  function drawRoad(t) {
    const k = ease.outCubic(prog(t, 0.05, 0.45)) * outK(t, [5.7, 6.1])
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    const g = x.createLinearGradient(0, GROUND, 0, 1920); g.addColorStop(0, 'rgba(26,20,48,0.92)'); g.addColorStop(1, 'rgba(10,8,24,0.95)')
    x.fillStyle = g; x.fillRect(0, GROUND, 1080, 1920 - GROUND)
    x.beginPath(); x.moveTo(0, GROUND); x.lineTo(1080, GROUND); ink(x, BONE, { w: 6, fa: 0, glow: 14 })
    const roll = ease.outCubic(prog(t, ...T.roll)) * 700 + ease.inQuad(prog(t, ...T.peel)) * 1400
    x.strokeStyle = rgba(GOLD, 0.8); x.lineWidth = 10; x.setLineDash([70, 60]); x.lineDashOffset = -roll
    x.beginPath(); x.moveTo(0, GROUND + 50); x.lineTo(1080, GROUND + 50); x.stroke(); x.setLineDash([])
    x.restore()
  }
  function drawTruck(t) {
    if (t < T.roll[0] - 0.4 || t > T.peel[1]) return
    const inP = ease.outCubic(prog(t, T.roll[0] - 0.4, T.roll[1])), outP = ease.inQuad(prog(t, ...T.peel))
    const tx = lerp(1450, 800, inP) + outP * 900
    const bounce = 10 * Math.abs(Math.sin((t - T.roll[1]) * 9)) * Math.exp(-Math.max(0, t - T.roll[1]) * 3) + 14 * bump(t, T.drop, 0.4)
    x.save(); x.translate(tx, GROUND); x.scale(0.82, 0.82); truck(x, { bounce, spin: -(inP * 12 + outP * 20) }); x.restore()
  }

  // ── the charts lock round THE STARS
  function chartK(t) { return ease.outCubic(prog(t, ...T.slide)) * outK(t, [T.h1Out[0] - 0.1, T.h1Out[1]]) }
  function drawCharts(t) {
    const k = chartK(t)
    if (k <= 0 || t > T.h1Out[1]) return
    const lockB = t > T.lock ? 1 + 0.06 * Math.exp(-(t - T.lock) * 7) : 1
    for (const [W, side, rot] of [[WA, -1, 0.15], [WB, 1, -0.2]]) {
      const cx = C.x + side * 700 * (1 - k), sc = CS * lockB
      x.save(); x.globalAlpha = clamp(k * 1.5); x.translate(cx, C.y); x.rotate(rot * t + side * (1 - k) * 2); x.scale(sc, sc)
      x.beginPath(); x.arc(0, 0, W.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.55)'; x.fill()
      drawWheelH(x, { W }); x.restore()
    }
    if (t > T.lock) {
      const fk = prog(t, T.lock, T.lock + 0.6)
      if (fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(C.x, C.y, 140 + 300 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 14 * (1 - fk) + 2, fa: 0, glow: 34 }); x.restore() }
    }
    sparkle(x, C.x, C.y, t, T.lock, { n: 16, R: 360, seed: 31, size: 28 })
    PAIRS.forEach((P, i) => {
      const p = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.35)) * clamp(k)
      if (p <= 0) return
      const a = ptC(P.a, 205, C.x, C.y), b = ptC(P.b, 128, C.x, C.y)
      const mx = (a.x + b.x) / 2 + (i - 1) * 40, my = (a.y + b.y) / 2 - 60
      x.save(); x.beginPath()
      for (let j = 0; j <= 24 * p; j++) { const u = j / 24, qx = (1 - u) ** 2 * a.x + 2 * (1 - u) * u * mx + u * u * b.x, qy = (1 - u) ** 2 * a.y + 2 * (1 - u) * u * my + u * u * b.y; j ? x.lineTo(qx, qy) : x.moveTo(qx, qy) }
      ink(x, P.col, { w: 9, fa: 0, glow: 24 }); x.restore()
      for (const q of [a, b]) { x.save(); x.beginPath(); x.arc(q.x, q.y, 14 * pop01(t, T.lines[i], 0.3, 2.2), 0, TAU); x.fillStyle = P.col; x.shadowColor = P.col; x.shadowBlur = 20; x.fill(); x.restore() }
      chip(270 + i * 270, 1250, ['PUSH', 'PULL', 'ALIGN'][i], pop01(t, T.lines[i] + 0.15, 0.3, 2.4) * clamp(k), { size: 34, bar: P.col, col: P.col })
    })
  }

  // ── the cast
  function leoState(t) {
    if (t < T.drop) return { mood: 'sparkle', look: [1, -0.3], sq: 0 }
    if (t < T.l1) return { mood: 'wide', look: [1, -1], sq: 0.15 * bump(t, T.drop, 0.35) }
    if (t < T.sagIn[0]) return { mood: 'squint', look: [1, -1], sq: 0 }
    if (t < T.sagIn[1]) return { mood: 'wide', look: [1, 0], sq: 0 }
    return { mood: 'heart', look: [1, 0], sq: 0 }
  }
  function sagState(t) { return t < T.lines[2] ? { mood: 'happy', look: [-1, 0] } : { mood: 'heart', look: [-1, 0] } }
  function skyState(t) {
    if (t < T.drop + 0.6) return { mood: 'wide', look: [-1, 1] }
    if (t < T.wipe) return { mood: t < T.l1 ? 'neutral' : 'squint', look: [-1, 1] }
    if (t < T.lines[2]) return { mood: 'neutral', look: [0, 0] }
    if (t < T.h2) return { mood: 'happy', look: [0, 0] }
    return { mood: 'heart', look: [0, 1] }
  }
  function drawSkyStar(t) {
    if (t < T.drop - 0.02) return
    const Q = skyPose(t), ss = skyState(t)
    drawStarChar(x, Q.x, Q.y, Q.s, t, { color: STAR.sky, glyph: null, mood: ss.mood, look: ss.look, hops: S_HOPS, seed: 2, pop: popOut(t, T.out), glow: 1.4 })
  }
  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (t >= T.sagIn[0]) {
      const P = sagPose(t), st = sagState(t)
      drawStarChar(x, P.x, P.y, P.s, t, { color: SAG.color, glyph: SAG.glyph, mood: st.mood, look: st.look, hops: G_HOPS, seed: 6, pop: ok, glow: 1.2 })
    }
    const P = leoPose(t), st = leoState(t)
    const opts = { color: LEO.color, glyph: LEO.glyph, mood: st.mood, look: st.look, squash: st.sq, hops: L_HOPS, seed: 3, pop: pop01(t, T.leoIn, 0.4, 2.2) * ok, glow: 1.3 }
    if (opts.pop > 0) {
      const F = starFrame(P.x, P.y, P.s, t, opts)
      const S = P.s * opts.pop, top = F.oy - F.base * F.sy - S * 0.44
      // the do sits behind the star's top point
      x.save(); x.translate(F.ox, top); const k = S / 260 * 0.6; x.scale(k, k); x.translate(0, 246 + 0.45 * hairR(t)); bigHair(x, hairR(t), hairWob(t), t); x.restore()
      drawStarChar(x, P.x, P.y, P.s, t, opts)
    }
  }
  function drawBeams(t) {
    const k = ease.outCubic(prog(t, ...T.beams)) * outK(t, T.out)
    if (k <= 0) return
    const Q = skyPose(t)
    for (const P of [leoPose(t), sagPose(t)]) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const ex = lerp(P.x, Q.x, k), ey = lerp(P.y - 120, Q.y + 60, k)
      x.beginPath(); x.moveTo(P.x, P.y - 120); x.lineTo(ex, ey); x.strokeStyle = rgba(GOLD, 0.55); x.lineWidth = 16; x.shadowColor = GOLD; x.shadowBlur = 30; x.lineCap = 'round'; x.stroke()
      x.restore()
    }
    if (t >= T.snug[1]) for (let i = 0; i < 5; i++) { const ph = ((t - T.snug[1]) * 0.6 + i / 5) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * outK(t, T.out); x.translate(545 + Math.sin(ph * 6 + i) * 60, 1290 - ph * 220); heart(x, 0.55, i % 2 ? PINK : '#ff5c8a', 1); x.restore() }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) {
        x.save()
        if (inR(t, T.drop, T.drop + 0.4)) x.translate(0, Math.sin((t - T.drop) * 60) * 10 * (1 - prog(t, T.drop, T.drop + 0.4)))
        drawCharts(t)
        drawSkyStar(t)
        drawRoad(t); drawTruck(t)
        drawBeams(t)
        drawCast(t)
        sparkle(x, 650, 900, t, T.drop + 0.1, { n: 18, R: 460, seed: 5, size: 30 })
        if (inR(t, T.gagPoof, T.gagPoof + 1.3)) chip(300, 1050, 'HAIR: ALSO BIGGER', pop01(t, T.gagPoof, 0.25, 2.6) * outK(t, [T.gagPoof + 1.1, T.gagPoof + 1.3]), { bar: '#ffd36b', col: '#ffe9a8' })
        if (inR(t, T.trine, T.h1Out[1])) chip(540, 1335, 'LEO + SAG · FIRE TRINE', pop01(t, T.trine, 0.3, 2.4) * outK(t, [T.h1Out[0] - 0.1, T.h1Out[1]]), { bar: FIRE, col: '#ffb08f' })
        if (t >= T.met) chip(540, 1600, 'EXPECTATIONS: MET', pop01(t, T.met, 0.3, 2.6) * outK(t, [T.out[0] - 0.2, T.out[0]]), { size: 40, bar: GOLD, col: GOLD })
        if (inR(t, T.drop, T.drop + 0.35)) { x.fillStyle = rgba('#ffe2b0', 0.3 * (1 - prog(t, T.drop, T.drop + 0.35))); x.fillRect(0, 0, 1080, 1920) }
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, ow] of HEADS) h.update(t, outK(t, ow))
      drawGrain(gx, t)
    },
  }
}

// ── sound (pop / pluck / bell are written in D: the engine keeps pitched SFX in the film's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base) => [...wordPops(t0, n, gap, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
export const CUES = [
  ...head(T.h0, 6, 0.1, T.h0Land, 0), ['whoosh', 0.05, 0.4, 0.03],
  ['pop', T.leoIn + 0.1, 739.99, 0.045, -0.3],
  ...T.poofs.map((p, i) => ['pop', p, [587.33, 739.99, 880][i], 0.05, -0.3]), ['pop', T.gagPoof, 1174.66, 0.055, -0.3], ['glitter', T.gagPoof, T.gagPoof + 0.4],
  ['whoosh', T.roll[0] - 0.4, 0.8, 0.04], ['tick', T.roll[1], 0.06], ['boom', T.roll[1] + 0.02, 0.05],
  ['riser', T.drop - 1.0, T.drop, 0.035], ['boom', T.drop, 0.12], ['bell', T.drop, 587.33, 0.05, 2.0, 0], ['glitter', T.drop, T.drop + 1.0], ['crash', T.drop, { gain: 0.03, len: 1.4 }],
  ['whoosh', T.peel[0], 0.6, 0.045], ['whoosh', T.shrink[0], 0.5, 0.03],
  ...head(T.h1, 2, 0.08, T.h1Land, 2), ['pop', T.h1Land + 0.12, 1318.51, 0.045, 0],
  ['whoosh', T.slide[0], 0.6, 0.035], ['boom', T.lock, 0.1], ['bell', T.lock, 1174.66, 0.05, 1.6, 0], ['glitter', T.lock, T.lock + 0.6],
  ['whoosh', T.sagIn[0], 0.5, 0.03], ['pop', T.sagIn[1], 880, 0.04, 0.5],
  ...T.lines.map((tl, i) => ['pluck', tl, [739.99, 880, 1174.66][i], 0.05, 0.6, (i - 1) * 0.4]),
  ...T.lines.map((tl, i) => ['pop', +(tl + 0.15).toFixed(3), [739.99, 880, 1174.66][i], 0.04, (i - 1) * 0.4]),
  ['pop', T.trine, 1318.51, 0.035, 0],
  ...head(T.h2, 2, 0.1, T.h2Land, 1),
  ['whoosh', T.grow[0], 0.5, 0.035], ['pop', T.snug[1], 1318.51, 0.04, 0], ['riser', T.beams[0] - 0.3, T.beams[1], 0.03], ['glitter', T.beams[0], T.beams[1] + 0.4],
  ['tick', T.met, 0.08], ['pop', T.met, 587.33, 0.055, 0], ['bell', T.met + 0.1, 1479.98, 0.04, 1.4, 0.2],
  ['pop', T.lastPoof, 1174.66, 0.05, -0.3], ['glitter', T.lastPoof, T.lastPoof + 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [L_TAG]: 987.77, [S_TAG]: 739.99 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
