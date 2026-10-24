// htxenergy (30 s vertical Align ad) · scenes 0–25.6, then the shared END CARD ("come" + the logo).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–5.45   HOOK  "They call Houston | the *energy capital.*" — a generic night skyline springs up tower by tower,
//               glowing energy lines draw up its facades to nodes in the sky, pulses run along them; on the drop
//               (2.82) a surge shoots up every line, the windows blaze, the nodes zap each other. "The whole city's *wired.*"
//   5.60–11.00  "But the energy | that matters is | *between two people.*" — the city sinks away, two of its pulses
//               fly out and become two pictogram people; a spark sputters, then arcs between them.
//               "You feel it… | *or you don't.*" — the arc holds… then fizzles into a puff of smoke.
//  11.20–17.45  "When your planets | *line up…*" — the two people beam up into two zodiac charts on opposite sides;
//               a gold planet on each sweeps round until they face each other, charge… and a lightning spark
//               arcs across (15.04). "*Sparks fly.*"
//  17.70–22.20  "Align reads | the spark | *before* you meet." — Push (pink) / Pull (blue) / Align (gold) arcs crackle
//               between the two charts. "Push. Pull. *Align.*"
//  22.20–25.30  "Find your | *spark.*" — the charts rush together and collide in a flash (23.38), leaving one
//               crackling gold spark that fades out
//  25.35–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH, READING } from '../../wheel.js'
import { BONE, GOLD, PINK, BLUE, ROSE, LAV, ELEC, CYAN, WHITE, INTER, MONO, rgba, ink, sparkle, orb, person, chip, bolt, skyline, TOWERS } from './props.js'

export const END = 25.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const hop = (t, a, h = 1, d = 0.45) => t > a && t < a + d ? h * Math.sin(Math.PI * (t - a) / d) : 0
const frac = v => v - Math.floor(v)

// ── beats
export const T = {
  // hook
  eye: 0.05, h0: [0.12, 0.22, 0.32, 0.45, BEAT(0), 0.86], towers: 0.12, towerGap: 0.085, traces: 1.2, traceGap: 0.11,
  drop: BEAT(4), sub0: BEAT(5), wired: BEAT(6), zaps: [BEAT(6), BEAT(7), BEAT(8)], h0Out: 5.4,
  // two people
  sink: [5.25, 6.2], h1: 5.62, between: BEAT(11), people: BEAT(12), pA: BEAT(10), pB: BEAT(10) + 0.16,
  sputter: [6.45, 7.2], connect: [BEAT(12), 7.95], feel: BEAT(14), hold: [BEAT(14) + 0.3, BEAT(16)], dont: BEAT(16), h1Out: 10.95,
  // charts
  beam: [11.0, 11.65], h2: 11.2, lineUp: BEAT(20), wA: BEAT(20) + 0.05, wB: BEAT(21), sweep: [12.4, BEAT(26)], axis: 13.2, charge: 13.95,
  spark: BEAT(26), sparks: BEAT(26) + 0.12, h2Out: 17.4,
  // reading
  h3: 17.7, before: BEAT(32), lines: [BEAT(34), BEAT(35), BEAT(36)], h3Out: 22.15,
  // spark
  merge: [22.2, BEAT(41)], h4: 22.6, h4Spark: BEAT(41), h4Out: 24.95, starOut: [24.75, 25.3],
}

// ── the city
const SC = 0.85, BASE = 1500, BUS_Y = BASE + 34
const TRACES = [1, 2, 3, 4, 5, 6, 7, 8].map((ti, k) => {
  const b = TOWERS[ti], dir = b.x < 540 ? -1 : 1
  const roof = BASE - b.h * SC
  const ex = b.x + dir * b.w * 0.22
  const pts = [{ x: ex, y: BUS_Y }, { x: ex, y: roof + 55 }, { x: ex + dir * 46, y: roof + 9 }, { x: ex + dir * 46, y: Math.max(745, roof - 70 - 46 * (k % 2)) }]
  const seg = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y)), len = seg.reduce((a, v) => a + v, 0)
  const at = u => {
    let d = clamp(u) * len
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i] || i === seg.length - 1) { const q = clamp(d / seg[i]); return { x: lerp(pts[i].x, pts[i + 1].x, q), y: lerp(pts[i].y, pts[i + 1].y, q) } }
      d -= seg[i]
    }
  }
  return { pts, at, node: pts[3], t0: T.traces + k * T.traceGap, phase: (k * 0.37) % 1, col: k % 3 === 1 ? PINK : CYAN }
})
// reflection streaks on the water under the street
const REFL = (() => {
  const r = rng(77), out = []
  for (let row = 0; row < 12; row++) {
    const y = BUS_Y + 30 + row * 20, n = 9 - Math.floor(row / 3)
    for (let k = 0; k < n; k++) out.push({ x: r() * 1040, y, w: 20 + r() * 70 * (1 - row / 16), col: r() < 0.65 ? '#ffd98a' : r() < 0.6 ? CYAN : PINK, seed: r() * 50, d: row / 12 })
  }
  return out
})()
// node pairs that zap each other on the beats after the drop (neighbours in screen order)
const BYX = [...TRACES].sort((a, b) => a.node.x - b.node.x)
const ZAPS = [[1, 2], [4, 5], [2, 3], [5, 6], [0, 1], [6, 7], [3, 4]]

// ── the two people
const PA = { x: 290, y: 1520 }, PB = { x: 790, y: 1520 }, PS = 1.05, CHEST = 1520 - 128 * PS
const boltPath = u => ({ x: lerp(PA.x + 50, PB.x - 50, u), y: CHEST - 46 * Math.sin(Math.PI * u) })

// ── the charts
const CA = { x: 290, y: 880 }, CB = { x: 790, y: 1340 }, M = { x: 540, y: 1090 }
const TH = Math.atan2(CB.y - CA.y, CB.x - CA.x)
const WS = 0.445, PR = 128
const WHEEL0 = { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.95 }
const PL_A = [{ o: 0, c: GOLD, r: 15 }, { o: 2.1, c: '#e3ecff', r: 11 }, { o: -2.0, c: ROSE, r: 11 }]
const PL_B = [{ o: 0, c: GOLD, r: 15 }, { o: 2.0, c: BLUE, r: 11 }, { o: -2.2, c: '#e3ecff', r: 11 }]
const leadA = t => TH - 2.5 * (1 - ease.inOutCubic(prog(t, ...T.sweep)))
const leadB = t => TH + Math.PI + 2.7 * (1 - ease.inOutCubic(prog(t, ...T.sweep)))
const FORM = (() => {   // stars that fly in to build each wheel
  const r = rng(5), out = []
  for (const [w, tW] of [[0, T.wA], [1, T.wB]]) for (let k = 0; k < 24; k++) {
    const ang = (k / 24) * TAU, rad = k % 2 ? 368 : 460
    const sa = r() * TAU, sd = 140 + r() * 260
    out.push({ w, tW, tx: Math.cos(ang) * rad, ty: Math.sin(ang) * rad, sx: Math.cos(sa) * sd, sy: Math.sin(sa) * sd - 120, t0: tW - 0.6 + r() * 0.12, kind: Math.floor(r() * 3), col: [GOLD, PINK, BLUE, '#fff3e0'][k % 4] })
  }
  return out
})()

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break, `_` = a space inside a word.
 *  `times` gives each word's time (else at + n·gap); `big` lists word indices that pop large; `colors` {index: colour}. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.08, at = 0, times = null, big = [], wobble = false, lineHeight = 1.02, colors = {}, boost = null }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  let n = 0
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%', whiteSpace: 'pre' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    if (colors[n]) style.color = colors[n]
    ws.push({ t: times ? times[n] : at + n * gap, big: big.includes(n), e: el('span', style, box, w.replace(/\*/g, '').replace(/_/g, ' ')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        let sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        if (w.big && boost) sc *= boost(t)
        const rot = w.big && wobble && t > w.t ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

const shake = t => {
  let a = 0
  for (const [t0, amp] of [[T.drop, 16], [T.spark, 20], [T.merge[1], 16]]) if (t > t0) a += amp * Math.exp(-(t - t0) * 7)
  return { x: (noise1(t * 38, 3) - 0.5) * 2 * a, y: (noise1(t * 38, 7) - 0.5) * 2 * a }
}

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 170px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'HOUSTON, TX')
  const capBoost = t => 1 + 0.12 * Math.exp(-Math.max(0, t - T.drop) * 5) * Math.sin(Math.max(0, t - T.drop) * 18) * (t > T.drop ? 1 : 0)
  const H0 = popText(root, 'They call Houston | the *energy* | *capital.*', { top: 205, size: 96, accentSize: 178, times: T.h0, big: [4, 5], wobble: true, accentColor: ELEC, lineHeight: 0.92, boost: capBoost })
  const S0 = popText(root, 'The whole city’s *wired.*', { top: 1615, size: 66, weight: 700, accentSize: 92, times: [T.sub0, T.sub0 + 0.1, T.sub0 + 0.2, T.wired], big: [3], wobble: true, accentColor: CYAN })
  const H1 = popText(root, 'But the energy | that matters is | *between* | *two_people.*', { top: 200, size: 96, accentSize: 150, accentColor: PINK, lineHeight: 0.98,
    times: [T.h1, T.h1 + 0.08, T.h1 + 0.16, T.h1 + 0.24, T.h1 + 0.32, T.h1 + 0.4, T.between, T.people], big: [6, 7], wobble: true })
  const S1 = popText(root, 'You feel it… | *or_you_don’t.*', { top: 1610, size: 72, weight: 700, accentSize: 96, accentColor: ROSE, lineHeight: 1.0,
    times: [T.feel, T.feel + 0.1, T.feel + 0.2, T.dont], big: [3], wobble: true })
  const H2 = popText(root, 'When your planets | *line_up…*', { top: 210, size: 100, accentSize: 176, accentColor: BLUE, times: [T.h2, T.h2 + 0.08, T.h2 + 0.16, T.lineUp], big: [3], wobble: true, lineHeight: 1.0 })
  const S2 = popText(root, '*Sparks_fly.*', { top: 1600, size: 90, accentSize: 150, accentColor: ELEC, times: [T.sparks], big: [0], wobble: true })
  const H3 = popText(root, 'Align reads | the spark | *before* you meet.', { top: 200, size: 100, accentSize: 142, accentColor: PINK, lineHeight: 1.0,
    times: [T.h3, T.h3 + 0.08, T.h3 + 0.16, T.h3 + 0.24, T.before, T.before + 0.2, T.before + 0.28], big: [4], wobble: true })
  const S3 = popText(root, 'Push. Pull. *Align.*', { top: 1630, size: 84, accentSize: 108, accentColor: READING.align, times: T.lines, big: [0, 1, 2], colors: { 0: READING.push, 1: READING.pull } })
  const H4 = popText(root, 'Find your | *spark.*', { top: 225, size: 132, accentSize: 260, accentColor: ELEC, times: [T.h4, T.h4 + 0.12, T.h4Spark], big: [2], wobble: true, lineHeight: 0.95 })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── 1 · the city and its energy lines
  function drawCity(t) {
    if (t > T.sink[1] + 0.1) return
    const sy = 820 * ease.inCubic(prog(t, ...T.sink)), a = 1 - prog(t, T.sink[0] + 0.35, T.sink[1])
    const surge = prog(t, T.drop, T.drop + 0.45), lit = t > T.drop ? Math.exp(-(t - T.drop) * 3.5) : 0
    const bi = t > T.drop ? Math.floor((t - 0.6) / 0.5556) : -1
    x.save(); x.translate(0, sy); x.globalAlpha = a
    skyline(x, t, BASE, j => easeOutBack(prog(t, T.towers + j * T.towerGap, T.towers + j * T.towerGap + 0.42), 1.6), { sc: SC, a, lit, edge: lit > 0.05 ? CYAN : '#b39ce8', beat: bi })
    // the water below the street: shimmering reflections of the lit city
    REFL.forEach(rf => {
      const sh = 0.5 + 0.5 * noise1(t * 1.6 + rf.seed, rf.seed)
      const k = clamp(prog(t, T.traces - 0.4 + rf.d * 0.6, T.traces + rf.d * 0.6))
      if (k <= 0) return
      x.fillStyle = rgba(rf.col, k * (0.18 + 0.5 * sh + 0.5 * lit) * (1 - rf.d * 0.75))
      x.fillRect(rf.x + 10 * Math.sin(t * 1.3 + rf.seed), rf.y, rf.w, 5)
    })
    // the street bus line
    const busK = ease.outCubic(prog(t, T.traces - 0.3, T.traces + 0.2))
    if (busK > 0) {
      x.beginPath(); x.moveTo(540 - 560 * busK, BUS_Y); x.lineTo(540 + 560 * busK, BUS_Y); ink(x, CYAN, { w: 6, fa: 0, glow: 18 })
      const n = t > T.drop ? 10 : 5
      for (let k = 0; k < n; k++) {
        const u = frac(t * (t > T.drop ? 0.55 : 0.25) + k / n), dir = k % 2 ? 1 : -1, px = 540 + dir * u * 560 * busK
        orb(x, px, BUS_Y, 5, k % 2 ? ELEC : PINK, a * Math.sin(Math.PI * u), 3)
      }
    }
    // traces
    TRACES.forEach((tr, k) => {
      const d = ease.inOutCubic(prog(t, tr.t0, tr.t0 + 0.55))
      if (d <= 0) return
      x.beginPath(); x.moveTo(tr.pts[0].x, tr.pts[0].y)
      const N = 40
      for (let i = 1; i <= N; i++) { const p = tr.at((i / N) * d); x.lineTo(p.x, p.y) }
      ink(x, tr.col, { w: 6 + 4 * lit, fa: 0, glow: 16 + 14 * lit })
      // the surge: a white-hot stroke racing up every line on the drop
      if (surge > 0 && t < T.drop + 0.9) {
        const su = ease.outCubic(surge), fa = 1 - prog(t, T.drop + 0.45, T.drop + 0.9)
        x.save(); x.globalAlpha = a * fa
        x.beginPath(); x.moveTo(tr.pts[0].x, tr.pts[0].y)
        for (let i = 1; i <= N; i++) { const p = tr.at((i / N) * su); x.lineTo(p.x, p.y) }
        ink(x, WHITE, { w: 12, fa: 0, glow: 34 })
        x.restore()
      }
      // the node
      const nk = pop01(t, tr.t0 + 0.5, 0.36, 2.4)
      if (nk > 0) {
        x.beginPath(); x.arc(tr.node.x, tr.node.y, 12 * nk, 0, TAU); ink(x, tr.col, { w: 5, fa: 0.5, glow: 18 })
      }
      // pulses
      if (d >= 1) {
        const fast = t > T.drop, n = fast ? 2 : 1, sp = fast ? 1.25 : 0.55
        for (let q = 0; q < n; q++) {
          const u = frac((t - tr.t0) * sp + tr.phase + q / n)
          const p = tr.at(u)
          orb(x, p.x, p.y, 7, ELEC, a * Math.min(1, u * 8), 3.2)
          if (u > 0.92) orb(x, tr.node.x, tr.node.y, 10, ELEC, a * (1 - (1 - u) / 0.08) * 0.9, 4)
        }
      }
      sparkle(x, tr.node.x, tr.node.y, t, T.drop + 0.4, { n: 7, R: 90, seed: 30 + k, size: 22, dur: 0.6, cols: [ELEC, CYAN, WHITE, PINK] })
    })
    // node-to-node zaps on the beats after the drop
    if (t > T.drop + 0.4) {
      const bz = Math.floor((t - T.drop) / 0.5556)
      const ph = (t - T.drop) - bz * 0.5556
      if (ph < 0.22) {
        const [i, j] = ZAPS[bz % ZAPS.length], A = BYX[i].node, B = BYX[j].node
        bolt(x, u => ({ x: lerp(A.x, B.x, u), y: lerp(A.y, B.y, u) - 30 * Math.sin(Math.PI * u) }), t, { col: ELEC, w: 6, amp: 14, seed: 50 + bz, n: 12, branches: 1, a: a * (1 - ph / 0.22) })
      }
    }
    x.restore()
    // a little energy bolt jumps off the word "wired."
  }

  // ── 2 · the two people and the spark between them
  function drawPeople(t) {
    if (t < T.sink[0] + 0.3 || t > T.beam[1] + 0.6) return
    // two pulses fly out of the sinking city and become people
    ;[[{ x: 450, y: 1010 }, PA, T.pA, PINK], [{ x: 705, y: 900 }, PB, T.pB, BLUE]].forEach(([S, P, tp, col], w) => {
      const f = prog(t, tp - 0.55, tp)
      if (f > 0 && f < 1) {
        const e = ease.inOutCubic(f), px = lerp(S.x, P.x, e), py = lerp(S.y, CHEST, e) - 220 * Math.sin(Math.PI * e)
        orb(x, px, py, 14, col, 1, 4)
        for (let k = 1; k < 6; k++) { const ee = ease.inOutCubic(Math.max(0, f - k * 0.04)); x.globalAlpha = 1 - k / 6; drawPixelStar(x, lerp(S.x, P.x, ee), lerp(S.y, CHEST, ee) - 220 * Math.sin(Math.PI * ee), 16 - 2 * k, k % 3, col) }
        x.globalAlpha = 1
      }
      sparkle(x, P.x, CHEST - 40, t, tp, { n: 10, R: 170, seed: 60 + w, size: 26 })
    })
    const fizz = prog(t, T.dont, T.dont + 0.5)
    const slump = ease.outCubic(fizz) * (1 - prog(t, 10.4, 10.9))
    const lean = 0.06 * ease.inOutCubic(prog(t, T.connect[0] - 0.2, T.connect[0] + 0.1)) * (1 - ease.inOutCubic(prog(t, 7.95, 8.3))) + 0.05 * ease.inOutCubic(prog(t, T.feel, T.feel + 0.3)) * (1 - fizz) - 0.07 * slump
    const beamK = 1 - ease.inCubic(prog(t, T.beam[0], T.beam[0] + 0.4))
    ;[[PA, T.pA, PINK, 1], [PB, T.pB, BLUE, -1]].forEach(([P, tp, col, d]) => {
      const k = pop01(t, tp, 0.45, 2.2) * beamK
      const hy = hop(t, T.connect[0], 38) + hop(t, T.feel + 0.3, 22)
      const sq = 1 + 0.1 * Math.sin(Math.max(0, t - tp) * 18) * Math.exp(-Math.max(0, t - tp) * 6) - 0.07 * slump
      const bob = 4 * Math.sin(t * 3.2 + d)
      person(x, P.x, P.y - hy - bob * (1 - slump), PS * k, { body: col, a: clamp(k * 2), sq, lean: d * lean, glow: 14 })
    })
    // the bolt
    const segs = []
    if (t > T.sputter[0] && t < T.sputter[1]) {
      const fr = Math.floor(t * 14)
      if (fr % 3 !== 0) {
        const r = rng(fr * 13)
        segs.push([0, 0.1 + 0.18 * r(), 0.7, 8, 12], [0.9 - 0.18 * r(), 1, 0.7, 8, 12])
      }
    }
    if (t > T.connect[0] && t < T.connect[1] + 0.2) {
      const g = ease.outCubic(prog(t, T.connect[0], T.connect[0] + 0.12)), fo = 1 - prog(t, T.connect[1], T.connect[1] + 0.2)
      segs.push([0.5 - 0.5 * g, 0.5 + 0.5 * g, fo, 13, 34])
    }
    if (t > T.hold[0] - 0.15 && t < T.dont) {
      const g = ease.outCubic(prog(t, T.hold[0] - 0.15, T.hold[0] + 0.1))
      segs.push([0, 0.5 * g, 1, 10, 26], [1 - 0.5 * g, 1, 1, 10, 26])
    }
    if (t >= T.dont && t < T.dont + 0.3) {
      const p = ease.outCubic(prog(t, T.dont, T.dont + 0.3)), fl = Math.floor(t * 20) % 2 ? 1 : 0.35
      segs.push([0, 0.48 * (1 - p), fl * (1 - p), 8, 20], [1 - 0.48 * (1 - p), 1, fl * (1 - p), 8, 20])
    }
    segs.forEach(([u0, u1, a, w, amp], i) => bolt(x, boltPath, t, { u0, u1, a: a * beamK, w, amp, seed: 7 + i, col: ELEC, branches: u1 - u0 > 0.5 ? 2 : 0 }))
    if (t > T.connect[0] && t < T.connect[0] + 0.35) {   // flash at the first connection
      const f = prog(t, T.connect[0], T.connect[0] + 0.35), mp = boltPath(0.5)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(mp.x, mp.y, 0, mp.x, mp.y, 420); g.addColorStop(0, rgba(ELEC, 0.55 * (1 - f))); g.addColorStop(1, rgba(ELEC, 0))
      x.fillStyle = g; x.fillRect(0, mp.y - 420, W, 840); x.restore()
    }
    sparkle(x, boltPath(0.5).x, boltPath(0.5).y, t, T.connect[0], { n: 14, R: 260, seed: 71, size: 30, cols: [ELEC, WHITE, PINK, BLUE] })
    // the fizzle: grey smoke puffs rise from the gap
    const sk = prog(t, T.dont + 0.05, T.dont + 1.1)
    if (sk > 0 && sk < 1) {
      const mp = boltPath(0.5)
      for (let k = 0; k < 5; k++) {
        const kk = clamp(sk * 1.3 - k * 0.07), dx = (k - 2) * 26 + 16 * Math.sin(k * 2.1 + sk * 3), dy = -kk * (110 + 25 * k)
        x.save(); x.globalAlpha = Math.sin(Math.PI * kk) * 0.85
        x.beginPath(); x.arc(mp.x + dx, mp.y + dy, 18 + 22 * kk + (k % 2) * 8, 0, TAU); ink(x, '#9a93ad', { w: 5, fa: 0.35, glow: 6, fill: '#6e6784' })
        x.restore()
      }
    }
  }

  // ── 3–5 · the charts, the spark, the reading, the collision
  const mergeK = t => ease.inCubic(prog(t, ...T.merge))
  const centre = (C, t) => { const m = mergeK(t); return { x: lerp(C.x, M.x, m), y: lerp(C.y, M.y, m) } }
  const wScale = t => WS * (1 - 0.88 * mergeK(t))
  const planetPos = (w, i, t) => {
    const C = centre(w ? CB : CA, t), s = wScale(t) / WS
    const ang = (w ? leadB(t) : leadA(t)) + (w ? PL_B : PL_A)[i].o
    return { x: C.x + Math.cos(ang) * PR * s, y: C.y + Math.sin(ang) * PR * s }
  }
  function curveOf(t, a, b, side) {   // a curved path from planet a to planet b, bowing to one side of the axis
    const P0 = planetPos(...a, t), P2 = planetPos(...b, t), s = wScale(t) / WS
    const mx = (P0.x + P2.x) / 2, my = (P0.y + P2.y) / 2
    const C = { x: mx + side * Math.sin(TH) * 330 * s, y: my - side * Math.cos(TH) * 330 * s }
    return u => ({ x: (1 - u) ** 2 * P0.x + 2 * u * (1 - u) * C.x + u * u * P2.x, y: (1 - u) ** 2 * P0.y + 2 * u * (1 - u) * C.y + u * u * P2.y })
  }
  function drawCharts(t) {
    if (t < T.beam[0] || t > T.starOut[1]) return
    const preMerge = t < T.merge[1]
    // beam-up orbs: each person streaks into their chart's centre
    ;[[PA, CA, T.beam[0] + 0.05, T.wA - 0.55, PINK], [PB, CB, T.beam[0] + 0.25, T.wB - 0.55, BLUE]].forEach(([P, C, t0, t1, col]) => {
      const f = prog(t, t0, t1)
      if (f <= 0 || f >= 1) return
      const e = ease.inOutCubic(f), px = lerp(P.x, C.x, e), py = lerp(CHEST, C.y, e)
      orb(x, px, py, 15, col, 1, 4)
      for (let k = 1; k < 6; k++) { const ee = ease.inOutCubic(Math.max(0, f - k * 0.05)); x.globalAlpha = 1 - k / 6; drawPixelStar(x, lerp(P.x, C.x, ee), lerp(CHEST, C.y, ee), 16 - 2 * k, k % 3, col) }
      x.globalAlpha = 1
    })
    if (preMerge) {
      // the axis guide (where the two gold planets need to meet)
      const ax = 0.4 * prog(t, T.axis, T.axis + 0.5) * (1 - prog(t, T.spark - 0.05, T.spark + 0.05))
      if (ax > 0) {
        const A = planetPos(0, 0, T.spark), B = planetPos(1, 0, T.spark)
        x.save(); x.globalAlpha = ax; x.setLineDash([18, 22]); x.lineDashOffset = -t * 80
        x.beginPath(); x.moveTo(A.x, A.y); x.lineTo(B.x, B.y); ink(x, GOLD, { w: 5, fa: 0, glow: 12 })
        x.setLineDash([]); x.restore()
      }
      // the wheels
      ;[[CA, T.wA, PINK, 0], [CB, T.wB, BLUE, 1]].forEach(([C0, tW, col, w]) => {
        const k = clamp(prog(t, tW, tW + 0.25)) * (1 - prog(t, T.merge[1] - 0.25, T.merge[1]))
        if (k <= 0) return
        const C = centre(C0, t)
        const land = t > T.spark ? 0.07 * Math.exp(-(t - T.spark) * 5) * Math.sin((t - T.spark) * 18) : 0
        const s = wScale(t) * lerp(0.75, 1, easeOutBack(prog(t, tW, tW + 0.5), 2.2)) * (1 + land)
        const rot = (w ? leadB(t) - TH - Math.PI : leadA(t) - TH)
        x.save(); x.translate(C.x, C.y); x.rotate(rot); x.scale(s, s)
        x.beginPath(); x.arc(0, 0, 460, 0, TAU); x.fillStyle = `rgba(10,6,28,${0.72 * k})`; x.fill()
        drawWheelH(x, { W: WHEEL0, k })
        x.restore()
        x.save(); x.globalAlpha = k; x.beginPath(); x.arc(C.x, C.y, 460 * s + 4, 0, TAU); ink(x, col, { w: 6, fa: 0, glow: 26 }); x.restore()
        const fk = prog(t, tW, tW + 0.6)
        if (fk > 0 && fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(C.x, C.y, 460 * s * (1 + 0.35 * ease.outCubic(fk)), 0, TAU); ink(x, col, { w: 12 * (1 - fk) + 2, fa: 0, glow: 30 }); x.restore() }
        sparkle(x, C.x, C.y, t, tW, { n: 14, R: 300, seed: 12 + w, size: 30 })
        // planets
        ;(w ? PL_B : PL_A).forEach((pl, i) => {
          const pk = pop01(t, tW + 0.25 + i * 0.09, 0.34, 2.2)
          if (pk <= 0) return
          const P = planetPos(w, i, t), sc = wScale(t) / WS
          const ch = i === 0 ? ease.inQuad(prog(t, T.charge, T.spark)) * (1 - prog(t, T.spark, T.spark + 0.4)) : 0
          orb(x, P.x, P.y, pl.r * pk * sc * (1 + 0.5 * ch + 0.08 * ch * Math.sin(t * 40)), pl.c, clamp(pk * 2) * k, 3.2 + 2 * ch)
        })
      })
      // chips under/over the charts
      const ck = t => outK(t, T.h2Out, 0.3) * outK(t, 99)
      chip(x, CA.x, CA.y + 236, 'YOUR CHART', pop01(t, T.wA + 0.4, 0.36, 2.4) * ck(t), { size: 26, col: PINK, edge: PINK })
      chip(x, CB.x, CB.y - 236, 'THEIRS', pop01(t, T.wB + 0.4, 0.36, 2.4) * ck(t), { size: 26, col: BLUE, edge: BLUE })
      // forming stars
      const A0 = CA, B0 = CB
      for (const f of FORM) {
        if (t < f.t0 || t > f.tW + 0.15) continue
        const P = f.w ? B0 : A0, p = ease.inOutCubic(prog(t, f.t0, f.tW))
        x.globalAlpha = clamp((t - f.t0) * 6) * (1 - prog(t, f.tW, f.tW + 0.15))
        drawPixelStar(x, P.x + lerp(f.sx, f.tx * WS, p), P.y + lerp(f.sy, f.ty * WS, p), lerp(16, 22, p), f.kind, f.col)
      }
      x.globalAlpha = 1
      // charging crackles off the two gold planets
      if (t > T.charge + 0.2 && t < T.spark) {
        ;[0, 1].forEach(w => {
          const P = planetPos(w, 0, t), fr = Math.floor(t * 12)
          if ((fr + w) % 2) return
          const r = rng(fr * 31 + w), ang = (w ? leadB(t) : leadA(t)) + (r() - 0.5) * 1.6, L = 50 + 70 * r() * (0.5 + prog(t, T.charge, T.spark))
          bolt(x, u => ({ x: P.x + Math.cos(ang) * L * u, y: P.y + Math.sin(ang) * L * u }), t, { col: ELEC, w: 5, amp: 10, seed: 90 + w, n: 8, branches: 0 })
        })
      }
      // the spark: a lightning arc between the two gold planets — it becomes the Align line
      if (t >= T.spark) {
        const A = () => planetPos(0, 0, t), B = () => planetPos(1, 0, t)
        const a0 = A(), b0 = B()
        const path = u => ({ x: lerp(a0.x, b0.x, u), y: lerp(a0.y, b0.y, u) })
        const surge = Math.exp(-(t - T.spark) * 2.5) + (t > T.lines[2] ? 0.8 * Math.exp(-(t - T.lines[2]) * 3) : 0)
        const g = ease.outCubic(prog(t, T.spark, T.spark + 0.08))
        const sc = wScale(t) / WS
        bolt(x, path, t, { u0: 0.5 - 0.5 * g, u1: 0.5 + 0.5 * g, col: READING.align, w: (9 + 7 * surge) * Math.max(0.5, sc), amp: (16 + 22 * surge) * sc, seed: 3, branches: 2 })
      }
      // Push / Pull lines
      ;[[[0, 2], [1, 1], 1, READING.push, 0], [[0, 1], [1, 2], -1, READING.pull, 1]].forEach(([a, b, side, col, i]) => {
        const lk = ease.outCubic(prog(t, T.lines[i], T.lines[i] + 0.35))
        if (lk <= 0) return
        const fa = 1 - prog(t, T.merge[0], T.merge[0] + 0.5)
        const path = curveOf(t, a, b, side)
        const pulse = 1 + 0.6 * Math.exp(-Math.max(0, t - T.lines[i] - 0.35) * 4)
        bolt(x, path, t, { u1: lk, col, w: 8 * pulse, amp: 14, seed: 20 + i, n: 26, branches: 1, a: fa })
        sparkle(x, path(1).x, path(1).y, t, T.lines[i] + 0.33, { n: 8, R: 100, seed: 40 + i, cols: [col, '#fff3e0'], size: 22 })
      })
      // labels
      const lo = outK(t, T.h3Out - 0.1, 0.25)
      const pp = curveOf(t, [0, 2], [1, 1], 1)(0.5), pl = curveOf(t, [0, 1], [1, 2], -1)(0.5)
      chip(x, pp.x + 30, pp.y - 10, 'PUSH', pop01(t, T.lines[0] + 0.3, 0.36, 2.4) * lo, { size: 30, col: READING.push, edge: READING.push })
      chip(x, pl.x - 30, pl.y + 10, 'PULL', pop01(t, T.lines[1] + 0.3, 0.36, 2.4) * lo, { size: 30, col: READING.pull, edge: READING.pull })
      chip(x, M.x + 6, M.y + 4, 'ALIGN', pop01(t, T.lines[2] + 0.2, 0.36, 2.4) * lo, { size: 30, col: READING.align, edge: READING.align })
      // spark flash + bursts
      if (t > T.spark && t < T.spark + 0.55) {
        const f = prog(t, T.spark, T.spark + 0.55)
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(M.x, M.y, 0, M.x, M.y, 900); g.addColorStop(0, rgba(ELEC, 0.75 * (1 - f) ** 2)); g.addColorStop(0.5, rgba(GOLD, 0.25 * (1 - f) ** 2)); g.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = g; x.fillRect(0, 0, W, H); x.restore()
      }
      sparkle(x, M.x, M.y, t, T.spark, { n: 20, R: 420, seed: 77, size: 34, dur: 0.9, cols: [ELEC, WHITE, GOLD, PINK, BLUE] })
      ;[0, 1].forEach(w => { const P = planetPos(w, 0, T.spark); sparkle(x, P.x, P.y, t, T.spark + 0.02, { n: 10, R: 160, seed: 80 + w, size: 26 }) })
    }
    // the collision: a flash, then one crackling spark
    const tm = T.merge[1]
    if (t > tm && t < tm + 0.6) {
      const f = prog(t, tm, tm + 0.6)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(M.x, M.y, 0, M.x, M.y, 1000); g.addColorStop(0, rgba(WHITE, 0.85 * (1 - f) ** 2)); g.addColorStop(0.4, rgba(ELEC, 0.3 * (1 - f) ** 2)); g.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = g; x.fillRect(0, 0, W, H); x.restore()
    }
    sparkle(x, M.x, M.y, t, tm, { n: 22, R: 460, seed: 99, size: 36, dur: 1.0, cols: [ELEC, WHITE, GOLD, PINK, BLUE] })
    if (t > tm) {
      const fo = 1 - ease.inQuad(prog(t, ...T.starOut)), k = pop01(t, tm, 0.45, 2.6)
      const br = 1 + 0.12 * Math.sin((t - tm) * 9)
      for (let i = 0; i < 5; i++) {
        const fr = Math.floor(t * 10)
        if ((fr + i) % 3 === 0) continue
        const ang = i * TAU / 5 + (t - tm) * 0.8 + 0.3 * Math.sin(fr + i), L = (110 + 80 * rng(fr * 5 + i)()) * k
        bolt(x, u => ({ x: M.x + Math.cos(ang) * (36 + L * u), y: M.y + Math.sin(ang) * (36 + L * u) }), t, { col: ELEC, w: 8, amp: 10, seed: 110 + i, n: 8, branches: 0, a: fo })
      }
      orb(x, M.x, M.y, 34 * k * br, ELEC, fo, 5)
      x.globalAlpha = fo
      drawPixelStar(x, M.x, M.y, 110 * k * br, 1, WHITE)
      x.globalAlpha = 1
      ;[0, 1, 2].forEach(i => sparkle(x, M.x, M.y, t, tm + 0.55 + i * 0.5556, { n: 8, R: 200, seed: 120 + i, size: 22, dur: 0.6, cols: [ELEC, WHITE, GOLD] }))
    }
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const sh = shake(t)
        x.save(); x.translate(sh.x, sh.y)
        drawCity(t)
        drawPeople(t)
        drawCharts(t)
        x.restore()
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      eyebrow.style.opacity = String(ease.outCubic(prog(t, T.eye, T.eye + 0.3)) * outK(t, T.h0Out))
      H0.update(t, outK(t, T.h0Out)); S0.update(t, outK(t, T.h0Out))
      H1.update(t, outK(t, T.h1Out)); S1.update(t, outK(t, T.h1Out))
      H2.update(t, outK(t, T.h2Out)); S2.update(t, outK(t, T.h2Out))
      H3.update(t, outK(t, T.h3Out)); S3.update(t, outK(t, T.h3Out))
      H4.update(t, outK(t, T.h4Out, 0.3))
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette; the engine shifts pitched cues into Em)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (ts, base = 0, gain = 0.028) => ts.map((s, i) => ['pop', r3(s), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ...wordPops(T.h0.slice(0, 4), 0, 0.03),
  ['boom', T.h0[4], 0.08], ['pluck', T.h0[4], 1174.66, 0.055, 0.6, 0], ['pop', T.h0[5], 1318.51, 0.05, 0],
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(j => ['pop', r3(T.towers + j * T.towerGap + 0.1), NOTE[(j * 2) % 7] / 2, 0.022, ((j % 3) - 1) * 0.4]),
  ...TRACES.map((tr, k) => ['tick', r3(tr.t0 + 0.5), 0.035]),
  ['riser', r3(T.drop - 0.75), T.drop, 0.055], ['whoosh', T.drop, 1.2, 0.06], ['boom', T.drop, 0.13], ['glitter', r3(T.drop + 0.3), r3(T.drop + 1.0)],
  ...wordPops([T.sub0, T.sub0 + 0.1, T.sub0 + 0.2], 2, 0.025),
  ['pluck', T.wired, 1318.51, 0.05, 0.5, 0], ['tick', T.wired, 0.05], ['tick', r3(T.wired + 0.05), 0.04],
  ...[0, 1, 2, 3].map(i => ['tick', r3(T.drop + 0.4 + 0.5556 * (i + 1)), 0.03]),
  // two people
  ['whoosh', T.sink[0], 0.9, 0.045],
  ...wordPops([T.h1, T.h1 + 0.08, T.h1 + 0.16, T.h1 + 0.24, T.h1 + 0.32, T.h1 + 0.4], 1, 0.025),
  ['pluck', T.pA, 880, 0.05, 0.5, -0.4], ['pluck', T.pB, 1174.66, 0.05, 0.5, 0.4],
  ['pluck', T.between, 987.77, 0.05, 0.5, 0], ['pop', T.between, 1318.51, 0.04, 0],
  ...[6.5, 6.7, 6.95, 7.1].map((s, i) => ['tick', s, 0.03 + 0.005 * i]),
  ['boom', T.people, 0.09], ['bell', T.people, 1174.66, 0.05, 1.6, 0], ['glitter', T.people, r3(T.people + 0.5)],
  ...wordPops([T.feel, T.feel + 0.1, T.feel + 0.2], 3, 0.025),
  ['glitter', T.hold[0], r3(T.hold[0] + 0.6)],
  ['pluck', T.dont, 440, 0.055, 0.6, 0], ['whoosh', r3(T.dont + 0.05), 0.5, 0.04], ['tick', T.dont, 0.05],
  // charts
  ['whoosh', T.beam[0], 0.7, 0.045],
  ...wordPops([T.h2, T.h2 + 0.08, T.h2 + 0.16], 0, 0.026),
  ['pluck', T.lineUp, 1174.66, 0.055, 0.6, 0],
  ['bell', T.wA, 880, 0.05, 2.0, -0.4], ['glitter', T.wA, r3(T.wA + 0.6)],
  ['bell', T.wB, 1174.66, 0.05, 2.0, 0.4],
  ...[0, 1, 2].map(i => ['pop', r3(T.wA + 0.25 + i * 0.09), NOTE[i + 1], 0.026, -0.4]),
  ...[0, 1, 2].map(i => ['pop', r3(T.wB + 0.25 + i * 0.09), NOTE[i + 3], 0.026, 0.4]),
  ['riser', T.charge, T.spark, 0.06],
  ...[14.2, 14.45, 14.62, 14.78, 14.9].map(s => ['tick', s, 0.03]),
  ['boom', T.spark, 0.14], ['whoosh', T.spark, 0.8, 0.05], ['bell', T.spark, 880, 0.05, 2.4, -0.3], ['bell', r3(T.spark + 0.06), 1174.66, 0.045, 2.4, 0.3], ['glitter', T.spark, r3(T.spark + 0.9)],
  ['pluck', T.sparks, 1318.51, 0.05, 0.6, 0],
  // reading
  ['whoosh', r3(T.h2Out - 0.05), 0.4, 0.035],
  ...wordPops([T.h3, T.h3 + 0.08, T.h3 + 0.16, T.h3 + 0.24], 2, 0.025),
  ['pluck', T.before, 987.77, 0.055, 0.6, 0], ...wordPops([T.before + 0.2, T.before + 0.28], 4, 0.024),
  ['pluck', T.lines[0], 880, 0.05, 0.6, -0.3], ['tick', T.lines[0], 0.04],
  ['pluck', T.lines[1], 987.77, 0.05, 0.6, 0.3], ['tick', T.lines[1], 0.04],
  ['bell', T.lines[2], 1174.66, 0.05, 2.0, 0], ['glitter', T.lines[2], r3(T.lines[2] + 0.6)],
  // spark
  ['whoosh', T.merge[0], 1.2, 0.045], ['riser', r3(T.merge[1] - 0.8), T.merge[1], 0.05],
  ...wordPops([T.h4, T.h4 + 0.12], 1, 0.028),
  ['boom', T.h4Spark, 0.12], ['bell', T.h4Spark, 1174.66, 0.05, 2.4, 0], ['bell', r3(T.h4Spark + 0.08), 1760, 0.035, 2.2, 0.2], ['glitter', T.h4Spark, r3(T.h4Spark + 0.9)],
]
