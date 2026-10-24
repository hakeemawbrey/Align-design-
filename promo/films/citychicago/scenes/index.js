// citychicago (15 s vertical Align ad) · story 0–10.6, then the shared end card ("come" + the Align logo + JOIN THE WAITLIST).
//   0.00–3.35  HOOK  "Chicago winter: | *cuffing season* | is survival."  Snow blows over a generic skyline, an elevated
//              train rattles past, and a pictogram bundled up to the eyes shivers on the drift. On "survival." a big
//              gust shoves everything sideways (scarf straight out, pompom flying).
//   3.35–7.55  "Find someone | whose chart | *lines up*" / "before the first *snow.*"  The pictogram slides left, a second
//              one shuffles in, a chart spins in over each; their planets pop and a warm gold line links them (5.60):
//              a warm flash, the shivering stops and the snow turns to sparkles.
//   7.55–10.5  "Get cuffed by | someone | *who fits.*"  The two huddle together, one long scarf wraps round both, a heart
//              pops; sparkles keep falling. Everything sinks/pops out by 10.45.
//   10.5→      plain sky only (SKY_H + grain); the end card takes over at 10.6.
// One canvas (sky + illustration), DOM type above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { BONE, GOLD, PINK, FIRE, ICE, SILVER, VIOLET, INTER, rgba, ink, sparkle, drawSnow, drawGust, gustEnv, drawSkyline, drawEl, drawGround, bundled, heart } from './props.js'

export const DURATION = 15
export const CTA = 'JOIN THE WAITLIST'
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)

// ── the timeline
const T = {
  hook: 0.08, cuff: BEAT(0), surv: BEAT(2), survLand: BEAT(2.5), person: 0.2, train: [0.25, 3.3], hookOut: [3.12, 3.32],
  h1: 3.38, h1Land: BEAT(6.5), slideA: [3.3, 3.9], inB: [3.5, 4.15], chartA: BEAT(6), chartB: BEAT(6.6), sub: BEAT(8), dots: BEAT(8.5),
  line: [5.3, BEAT(9)], link: BEAT(9), h2Out: [7.35, 7.55],
  h3: 7.6, h3Land: BEAT(13.5), move: [7.5, 8.15], scarf: [8.2, 8.75], heart: BEAT(15), h3Out: [10.25, 10.48], out: [10.02, 10.45],
}
// wind gusts: [start, push in px]
const GUSTS = [[0.1, 260], [BEAT(3), 620], [BEAT(5.4), 220]]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
/** pop-out: a little swell, then shrink to 0 */
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at
 *  lateAt; `times` (optional) gives every word its own pop time and `bigs` the indices that pop big */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, times = null, bigs = null }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = bigs ? bigs.includes(n) : late > 0 && n >= nW - late
    const tw = times ? times[n] : big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: tw, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
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

// ── layout
const FEET = 1755
const WH = { cx: 0, cy: 0, rOut: 440, rIn: 352, rGlyph: 396, alpha: 0.92 }
const CH_Y = 1000, CH_S = 0.56                       // charts during the turn
const A0 = { x: 540, s: 1.95 }, A1 = { x: 290, s: 1.5 }, B1 = { x: 790, s: 1.5 }, A2 = { x: 402, s: 1.85 }, B2 = { x: 678, s: 1.85 }
const HALO_Y = 905, HALO_S = 0.3, HALO_X = [292, 788]
// each chart's planets (angle deg, radius in wheel units); index 0 is the one the gold line joins
const PL_A = [[10, 250, GOLD], [140, 230, ICE], [235, 200, PINK]]
const PL_B = [[170, 250, GOLD], [40, 220, VIOLET], [300, 210, ICE]]
const LINK_C = { x: 540, y: CH_Y }

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 190px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = ICE) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('CHICAGO, IL'), 0.05, T.hookOut]]
  const H0 = popText(root, 'Chicago winter: | *cuffing* *season* | is survival.', { top: 205, size: 116, accentSize: 176, accentColor: ICE, lineHeight: 1.0, wobble: true,
    times: [T.hook, T.hook + 0.09, T.cuff, T.cuff + 0.12, T.surv, T.survLand], bigs: [2, 3, 5] })
  const H1 = popText(root, 'Find someone | whose chart | *lines* *up*', { top: 200, size: 112, accentSize: 168, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, gap: 0.07, lineHeight: 1.0 })
  const S1 = popText(root, 'before the first *snow.*', { top: 610, size: 66, weight: 700, accentSize: 84, at: T.sub, gap: 0.08, accentColor: ICE })
  const H2 = popText(root, 'Get cuffed by | someone | *who* *fits.*', { top: 195, size: 124, accentSize: 184, at: T.h3, late: 2, lateAt: T.h3Land, lateGap: 0.12, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const HEADS = [[H0, T.hookOut], [H1, T.h2Out], [S1, T.h2Out], [H2, T.h3Out]]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the warmth: snow turns to sparkles outward from the link
  const warmAt = (px, py) => T.link + Math.hypot(px - LINK_C.x, py - LINK_C.y) / 2200
  const coldK = t => 1 - ease.inOutQuad(prog(t, T.link, T.link + 0.6))
  const sceneSink = t => ease.inCubic(prog(t, ...T.out))

  function drawScenery(t) {
    const sink = sceneSink(t)
    if (sink >= 1) return
    const dy = sink * 520, a = 1 - sink
    const dim = lerp(1, 0.55, ease.inOutQuad(prog(t, T.slideA[0], T.slideA[1]))) * lerp(1, 1.25, ease.inOutQuad(prog(t, T.link, T.link + 0.6)))
    x.save(); x.translate(0, dy)
    drawSkyline(x, t, { base: 1700, a: a * Math.min(1, dim), lit: dim })
    // the elevated train, hook only (rumbles past behind the pictogram)
    const tp = prog(t, ...T.train)
    drawEl(x, t, { y: 1540, base: 1700, trainX: lerp(-60, 1080 + 800, tp) + Math.sin(t * 40) * 1.5, a: a * Math.min(1, dim + 0.15) })
    drawGround(x, t, { top: 1700, a })
    x.restore()
  }

  /** a bundled pictogram at P {x, s}, shivering with the cold, leaning into the gusts */
  function drawPerson(t, P, opts, { k = 1, rise = 0, hop = 0, lean = 0 } = {}) {
    if (k <= 0) return
    const ge = gustEnv(t, GUSTS), cold = coldK(t)
    const shiver = cold * (3 + 9 * ge) * Math.sin(t * 75 + P.x)
    x.save(); x.translate(P.x + shiver, FEET + rise - hop + sceneSink(t) * 520)
    x.rotate(-0.12 * ge * cold + lean)
    const sq = 1 + 0.02 * Math.sin(t * 40) * cold
    x.scale(P.s * k / sq, P.s * k * sq)
    bundled(x, t, { ...opts, wind: Math.max(ge * cold, 0.12 * cold), cold })
    x.restore()
  }

  function orb(px, py, r, col, a) {
    x.save(); x.globalAlpha = a; x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(px, py, 0, px, py, r * 3.2); g.addColorStop(0, rgba(col, 0.75)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(px, py, r * 3.2, 0, TAU); x.fill()
    x.globalCompositeOperation = 'source-over'
    x.beginPath(); x.arc(px, py, r, 0, TAU); x.fillStyle = col; x.fill()
    x.fillStyle = '#fff'; x.fillRect(px - r * 0.45, py - r * 0.45, r * 0.35, r * 0.35)
    x.restore()
  }

  // where the two charts are (centre, scale) at t
  function chartPose(i, t) {
    const t0 = i ? T.chartB : T.chartA
    const k = pop01(t, t0, 0.5, 1.7)
    const mv = ease.inOutCubic(prog(t, ...T.move))
    const ok = popOut(t, T.out)
    const from = i ? B1 : A1
    const cx = lerp(from.x, HALO_X[i], mv) + (1 - ease.outCubic(prog(t, t0, t0 + 0.5))) * (i ? 500 : -500)
    const cy = lerp(CH_Y, HALO_Y, mv) + Math.sin(t * 2.4 + i * 1.7) * 6 * mv
    const bump = t > T.link ? 1 + 0.08 * Math.exp(-(t - T.link) * 7) : 1
    const s = lerp(CH_S, HALO_S, mv) * k * bump * ok
    const rot = (i ? -1 : 1) * 2.2 * TAU * (1 - ease.outCubic(prog(t, t0, T.link))) + (t > T.link ? (t - T.link) * 0.25 * (i ? -1 : 1) : 0)
    return { cx, cy, s, rot, k }
  }
  const planet = (C, [a, r]) => ({ x: C.cx + Math.cos(-a * Math.PI / 180) * r * C.s, y: C.cy + Math.sin(-a * Math.PI / 180) * r * C.s })

  function drawCharts(t) {
    if (t < T.chartA || t > T.out[1]) return
    const CA = chartPose(0, t), CB = chartPose(1, t)
    ;[CA, CB].forEach((C, i) => {
      if (C.s <= 0) return
      x.save(); x.translate(C.cx, C.cy); x.rotate(C.rot); x.scale(C.s, C.s)
      x.beginPath(); x.arc(0, 0, WH.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.82)'; x.fill()
      drawWheelH(x, { W: WH, k: clamp(C.k * 1.4), glyphK: clamp(C.k * 1.4) })
      x.restore()
      sparkle(x, C.cx, C.cy, t, (i ? T.chartB : T.chartA) + 0.25, { n: 12, R: 260, seed: 5 + i, size: 26 })
    })
    // planets
    const mvK = 1 - ease.inOutCubic(prog(t, T.move[0], T.move[0] + 0.4))
    ;[[CA, PL_A], [CB, PL_B]].forEach(([C, PL], i) => PL.forEach((p, j) => {
      const dk = pop01(t, T.dots + j * 0.08 + i * 0.04, 0.36, 2.2) * (j === 0 ? 1 : mvK) * popOut(t, T.out)
      if (dk <= 0) return
      const P = planet(C, p)
      orb(P.x, P.y, (j === 0 ? 22 : 16) * dk * lerp(0.6, 1, mvK), p[2], clamp(dk * 2))
    }))
    // the warm gold line between the two gold planets
    const lk = ease.inOutCubic(prog(t, ...T.line))
    if (lk > 0) {
      const a = planet(CA, PL_A[0]), b = planet(CB, PL_B[0])
      const pulse = 1 + 0.5 * Math.exp(-Math.max(0, t - T.link) * 4)
      const sag = 40 * (1 - ease.inOutCubic(prog(t, ...T.move)))
      const pt = u => ({ x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u) - Math.sin(Math.PI * u) * sag })
      x.save(); x.globalAlpha = popOut(t, T.out)
      x.beginPath()
      for (let j = 0; j <= 30 * lk; j++) { const p = pt(j / 30); j ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y) }
      ink(x, GOLD, { w: 11 * pulse * lerp(1, 0.6, ease.inOutCubic(prog(t, ...T.move))), fa: 0, glow: 34 })
      x.restore()
      // a spark running along it
      if (lk < 1) { const p = pt(lk); orb(p.x, p.y, 14, '#fff3e0', 1) }
      // glints travelling along the line afterwards
      if (t > T.link) for (let k = 0; k < 2; k++) {
        const u = ((t - T.link) * 0.7 + k * 0.5) % 1, p = pt(u)
        orb(p.x, p.y, 7, '#ffe7a8', Math.sin(Math.PI * u) * popOut(t, T.out))
      }
    }
    // the link: warm flash ring + burst
    const fk = prog(t, T.link, T.link + 0.7)
    if (fk > 0 && fk < 1) {
      x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(LINK_C.x, LINK_C.y, 80 + 520 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 16 * (1 - fk) + 2, fa: 0, glow: 40 }); x.restore()
    }
    sparkle(x, LINK_C.x, LINK_C.y, t, T.link, { n: 20, R: 420, seed: 31, size: 34, cols: [GOLD, '#ffd98a', '#fff3e0', PINK, FIRE] })
  }

  /** one long scarf wrapped round both necks (the "cuff") */
  function drawSharedScarf(t) {
    const sk = ease.inOutCubic(prog(t, ...T.scarf))
    if (sk <= 0) return
    const ok = popOut(t, T.out), sink = sceneSink(t) * 520
    const hop = heartHop(t)
    const ny = FEET - 214 * A2.s + sink - hop
    const ax = A2.x - 52 * A2.s, bx = B2.x + 52 * B2.s
    x.save(); x.globalAlpha = clamp(ok * 1.5)
    x.beginPath()
    const N = 36
    for (let j = 0; j <= N * sk; j++) { const u = j / N, px = lerp(ax, bx, u), py = ny + Math.sin(Math.PI * u) * 34 + Math.sin(u * TAU * 2) * 4; j ? x.lineTo(px, py) : x.moveTo(px, py) }
    ink(x, GOLD, { w: 50 * ok, fa: 0, glow: 22 })
    x.globalAlpha = clamp(ok * 1.5) * 0.9
    x.setLineDash([10, 22]); x.strokeStyle = PINK; x.lineWidth = 42 * ok; x.lineCap = 'butt'; x.stroke(); x.setLineDash([])
    x.restore()
    // the shared tail swinging from the middle
    const tk = pop01(t, T.scarf[1] - 0.1, 0.4, 2.2) * ok
    if (tk > 0) {
      const sw = Math.sin((t - T.scarf[1]) * 5) * 18 * tk
      x.save(); x.translate(540, ny + 30)
      x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(-14 + sw * 0.5, 80 * tk, sw, 170 * tk)
      ink(x, GOLD, { w: 42, fa: 0, glow: 18 })
      x.restore()
    }
    sparkle(x, 540, ny, t, T.scarf[1], { n: 12, R: 220, seed: 71, size: 26, cols: [GOLD, PINK, '#fff3e0'] })
  }
  const heartHop = t => t > T.heart ? Math.abs(Math.sin((t - T.heart) * 9)) * Math.exp(-(t - T.heart) * 3.5) * 40 : 0

  function drawPeople(t) {
    if (t > T.out[1]) return
    const ok = popOut(t, T.out)
    const hop = heartHop(t)
    const sl = ease.inOutCubic(prog(t, ...T.slideA)), mv = ease.inOutCubic(prog(t, ...T.move))
    // A: centre stage in the hook, slides left for the turn, then huddles in
    const kA = pop01(t, T.person, 0.45, 2.2) * ok
    const PA = { x: lerp(lerp(A0.x, A1.x, sl), A2.x, mv), s: lerp(lerp(A0.s, A1.s, sl), A2.s, mv) }
    // B: shuffles in from the right
    const inB = easeOutBack(prog(t, ...T.inB), 1.3)
    const PB = { x: lerp(lerp(1300, B1.x, inB), B2.x, mv), s: lerp(B1.s, B2.s, mv) }
    const lean = 0.07 * Math.min(1, Math.max(0, t - T.heart) * 3)
    const rise = (1 - ease.outCubic(prog(t, T.person, T.person + 0.5))) * 300
    const scarfTail = 1 - ease.inOutQuad(prog(t, T.scarf[0] - 0.1, T.scarf[0] + 0.2))
    if (t >= T.inB[0]) drawPerson(t, PB, { coat: PINK, scarf: GOLD, hat: ICE, flip: 1, scarfTail }, { k: ok, hop: hop * 0.85, lean: -lean })
    drawPerson(t, PA, { coat: ICE, scarf: FIRE, hat: PINK, flip: 1, scarfTail }, { k: kA, rise, hop, lean })
    sparkle(x, A0.x, FEET - 300, t, T.person + 0.2, { n: 10, R: 260, seed: 3, size: 26, cols: [ICE, '#fff3e0', SILVER] })
    drawSharedScarf(t)
    // the heart above them
    const hk = pop01(t, T.heart, 0.45, 3) * ok
    if (hk > 0) {
      const beat = 1 + 0.1 * Math.max(0, Math.sin((t - T.heart) * 8))
      x.save(); x.translate(540, HALO_Y - 10 * Math.sin(t * 2.6)); heart(x, 105 * hk * beat, PINK, clamp(hk * 2)); x.restore()
      sparkle(x, 540, HALO_Y, t, T.heart, { n: 16, R: 300, seed: 61, size: 30, cols: [PINK, GOLD, '#fff3e0', VIOLET] })
    }
  }

  function drawWarmth(t) {
    const wk = prog(t, T.link, T.link + 0.5)
    if (wk <= 0) return
    const a = (0.32 * Math.exp(-(t - T.link) * 2.2) + 0.12 * ease.outCubic(wk)) * popOut(t, T.out)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(540, 1200, 0, 540, 1200, 1100); g.addColorStop(0, rgba('#ffb35c', a)); g.addColorStop(1, rgba('#ff6a3a', 0))
    x.fillStyle = g; x.fillRect(0, 0, W, 1920)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) {
        const snowA = 1 - ease.inQuad(prog(t, ...T.out))
        drawWarmth(t)
        drawScenery(t)
        drawSnow(x, t, { gusts: GUSTS, a: snowA * 0.7, warmAt, near: [0, 0.62] })   // far flakes, behind the people
        drawCharts(t)
        drawPeople(t)
        drawSnow(x, t, { gusts: GUSTS, a: snowA, warmAt, near: [0.62, 2] })
        for (const [g] of GUSTS.slice(1)) drawGust(x, prog(t, g - 0.1, g + 0.9), Math.round(g * 10), 1150)
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

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: CTA })]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: wind, words, the train, the big gust
  ['whoosh', 0.05, 0.6, 0.04],
  ...wordPops(T.hook, 2, 0.09, 0), ['pop', T.cuff, 1174.66, 0.055, -0.1], ['pop', T.cuff + 0.12, 1318.51, 0.055, 0.1], ['pluck', T.cuff + 0.12, 1174.66, 0.05, 0.6, 0],
  ['pop', T.person, 587.33, 0.05, 0],
  ['whoosh', T.train[0] + 0.5, 1.6, 0.03], ...[0.9, 1.15, 1.4, 1.65, 1.9, 2.15].map((d, i) => ['tick', +(T.train[0] + d).toFixed(3), 0.035 - i * 0.003]),
  ['pop', T.surv, 880, 0.045, 0], ['pop', T.survLand, 1318.51, 0.06, 0], ['pluck', T.survLand, 880, 0.045, 0.5, 0],
  ['whoosh', GUSTS[1][0] - 0.05, 0.9, 0.06], ['tick', GUSTS[1][0] + 0.1, 0.04], ['tick', GUSTS[1][0] + 0.2, 0.035],
  // the turn: two charts, the gold line, the warmth
  ...wordPops(T.h1, 4, 0.07, 1, 0.025), ['pop', T.h1Land, 1174.66, 0.055, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.055, 0], ['pluck', T.h1Land + 0.12, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.slideA[0], 0.45, 0.035], ['pop', T.inB[0] + 0.35, 739.99, 0.045, 0.5],
  ['whoosh', T.chartA - 0.1, 0.45, 0.04], ['pop', T.chartA + 0.2, 587.33, 0.05, -0.5], ['whoosh', T.chartB - 0.1, 0.45, 0.04], ['pop', T.chartB + 0.2, 739.99, 0.05, 0.5],
  ['glitter', T.chartA + 0.25, T.chartB + 0.6],
  ...wordPops(T.sub, 4, 0.08, 3, 0.02),
  ['pop', T.dots, 880, 0.045, -0.4], ['pop', T.dots + 0.04, 987.77, 0.045, 0.4], ['pop', T.dots + 0.12, 1174.66, 0.04, 0],
  ['riser', T.chartB, T.link, 0.04],
  ['boom', T.link, 0.12], ['bell', T.link, 587.33, 0.05, 2.0, 0], ['bell', T.link + 0.06, 880, 0.035, 1.8, 0.2], ['glitter', T.link, T.link + 1.2],
  // get cuffed by someone who fits
  ['whoosh', T.move[0], 0.5, 0.035],
  ...wordPops(T.h3, 4, 0.07, 2, 0.03), ['pop', T.h3Land, 1174.66, 0.055, 0], ['pop', T.h3Land + 0.12, 1318.51, 0.055, 0], ['pluck', T.h3Land + 0.12, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.scarf[0], 0.5, 0.03], ['pluck', T.scarf[1], 880, 0.045, 0.6, 0],
  ['bell', T.heart, 1174.66, 0.05, 1.4, 0], ['bell', T.heart + 0.08, 1760, 0.035, 1.4, 0.2], ['glitter', T.heart, T.heart + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...endcardCues(STORY_END),
]
