// srhtxenergy (30 s vertical, Star Talk Remix of htxenergy "The energy capital") · story 0–25.6, then the shared end
// card. THE STARS guide you; ♈ Aries tries to force a spark with ♌ Leo; ♓ Pisces cries in the back.
//   0.00–5.45  "They call Houston | the *energy capital.*"  A generic night skyline springs up tower by tower, wired with
//              pulsing lines; on the drop (2.82) every window blazes. THE STARS: "city's buzzing. your love life? *static.*"
//   5.45–11.1  "But the energy | that matters is | *between two people.*"  ARIES: "watch. I can *make* a spark." It
//              scoots on a rug for static (a tiny "bzt"), then clips jumper cables onto Leo: sputter… a puff of smoke.
//              Leo rolls its eyes; Pisces sobs. THE STARS: "babe. you can't *force* a spark."
//   11.12      card cut (deal)
//   11.1–17.6  "When your planets | *line up…*"  Two charts; a gold planet sweeps round each until they face each other,
//              charge, and a lightning spark jumps across (15.04): "*Sparks fly.*" THE STARS: "it was never wires. it's
//              your *charts.*"
//   17.6–22.2  "Align reads | the spark | *before* you meet."  PUSH (pink) / PULL (blue) / ALIGN (gold) arcs crackle between
//              the charts on the beat. THE STARS: "push, pull, align: read it before you *meet.*"
//   22.2       card cut (flip)
//   22.2–25.4  "Find your | *spark.*"  Aries and Leo hop together with one crackling gold spark between them; Pisces
//              cries happy fountains. Everything out by 25.42.
// One canvas, DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCells, drawSkyline, drawZap, drawSmoke, drawCable, drawRug, drawChart, drawReadArc,
  BONE, GOLD, PINK, ELEC, VIOLET } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)
const ARI = signStar('aries'), LEO = signStar('leo'), PIS = signStar('pisces')

const T = {
  h0: 0.12, h0Late: 1.2, h0Out: [4.95, 5.15], build: [0.3, 2.6], surge: BEAT(4), guideIn: 0.8, open: 2.9, l1: 3.1, sink: [5.0, 5.6],
  h1: 5.5, h1Late: 6.1, h1Out: [10.85, 11.05], ariIn: 5.6, leoIn: 5.75, pisIn: 6.0, l2: 6.45, rug: 6.4, rub: [7.0, 8.0], bzt: BEAT(13),
  cables: [8.35, 8.6], sputter: BEAT(15), smoke: 9.2, roll: [9.3, 9.95], l3: 9.55, act2Out: [10.85, 11.1],
  cut1: 11.12,
  h2: 11.2, h2Late: 11.6, h2Out: [14.9, 15.05], charts: 11.2, sweep: [11.9, 14.4], charge: [14.4, 15.04], zap: 15.04, l4: 12.4,
  h2b: 15.1, h2bOut: [17.4, 17.58],
  h3: 17.65, h3Out: [21.95, 22.15], arcs: [BEAT(32), BEAT(33), BEAT(34)], l5: 18.4, close: 22.0, act4Out: [21.95, 22.2],
  cut2: 22.2,
  h4: 22.3, h4Late: 22.7, pair: 22.25, spark: 22.6,
  out: [25.0, 25.42],
}
const SKYN = 'THE STARS', ARIN = '♈ ARIES STAR'
const LINES = [
  { t: T.l1, speaker: SKYN, text: "city's buzzing. your love life? *static.*" },
  { t: T.l2, speaker: ARIN, color: ARI.color, text: 'watch. I can *make* a spark.' },
  { t: T.l3, speaker: SKYN, text: "babe. you can't *force* a spark." },
  { t: T.l4, speaker: SKYN, text: "it was never wires. it's your *charts.*" },
  { t: T.l5, speaker: SKYN, text: 'push, pull, align: read it before you *meet.*' },
]
const CPS = 30
const CH = { L: { x: 270, y: 880 }, R: { x: 810, y: 880 }, r: 170 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const ARI_HOPS = [T.ariIn + 0.3, ...talkHops(LINES, ARIN, { cps: CPS }), T.bzt, T.cables[1], T.zap + 0.05, T.zap + 0.6, T.pair + 0.3, T.spark + 0.3]
const LEO_HOPS = [T.leoIn + 0.3, T.charts + 0.4, T.zap + 0.12, T.zap + 0.7, T.pair + 0.35, T.spark + 0.4]
const SKY_HOPS = [T.guideIn + 0.3, ...talkHops(LINES, SKYN, { cps: CPS }), ...T.arcs]

function ariPos(t) {
  if (t < T.cut1) {
    const rub = t >= T.rub[0] && t < T.rub[1] ? 34 * Math.sin((t - T.rub[0]) * 22) * Math.sin(Math.PI * prog(t, ...T.rub)) : 0
    return [330 + rub, 1260, 230]
  }
  if (t < T.cut2) return [CH.L.x, 1290, 180]
  return [415, 1250, 260]
}
function leoPos(t) {
  if (t < T.cut1) return [760, 1260, 230]
  if (t < T.cut2) return [CH.R.x, 1290, 180]
  return [675, 1250, 260]
}
function guidePos(t) {
  if (t < T.sink[0]) return [880, 640, 170]
  if (t < T.cut1) return [930, 650, 140]
  if (t < T.cut2) return [540, 640, 110]
  return [940, 640, 140]
}
function ariMood(t) {
  if (t < T.l2) return { mood: 'wide', look: [1, 0] }
  if (t < T.rub[0]) return { mood: 'happy', look: [0, 0] }
  if (t < T.bzt) return { mood: 'squint', look: [1, 0] }
  if (t < T.bzt + 0.4) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.sputter) return { mood: 'happy', look: [1, 0] }
  if (t < T.smoke) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.cut1) return { mood: 'sleepy', zzz: false }
  if (t < T.zap) return { mood: 'neutral', look: [0, -1] }
  if (t < T.cut2) return t < T.l5 ? { mood: 'heart', look: [1, 0] } : { mood: 'happy', look: [0, -1] }
  return { mood: 'heart', look: [1, 0] }
}
function leoMood(t) {
  if (t < T.bzt) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.roll[0]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.cut1) return { mood: 'neutral', look: [0, 0] }
  if (t < T.zap) return { mood: 'neutral', look: [0, -1] }
  if (t < T.cut2) return t < T.l5 ? { mood: 'heart', look: [-1, 0] } : { mood: 'happy', look: [0, -1] }
  return { mood: 'heart', look: [-1, 0] }
}
function guideMood(t) {
  if (t < T.sink[0]) return { mood: 'happy', look: [-1, 1] }
  if (t < T.l3) return t >= T.sputter && t < T.smoke + 0.3 ? { mood: 'wide', look: [-1, 1], blink: false } : { mood: 'neutral', look: [-1, 1] }
  if (t < T.cut1) return { mood: 'squint', look: [-1, 1] }
  if (t < T.zap) return { mood: 'happy', look: [0, 1] }
  if (t < T.cut2) return { mood: 'sparkle', look: [0, 1] }
  return { mood: 'heart', look: [-1, 1] }
}
// the planets: they sweep round until they face each other (left one at 0 rad, right one at π)
const angL = t => lerp(Math.PI * 1.15, Math.PI * 2, ease.inOutCubic(prog(t, ...T.sweep)))
const angR = t => lerp(-Math.PI * 0.85, Math.PI, ease.inOutCubic(prog(t, ...T.sweep)))

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 28px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'They call Houston | the *energy* *capital.*', { top: 150, size: 100, accentSize: 150, at: T.h0, gap: 0.09, accentColor: ELEC, wobble: true, late: 2, lateAt: T.h0Late, lineHeight: 1.0, fit: true })
  const H1 = popText(root, 'But the energy | that matters is | *between* *two* *people.*', { top: 140, size: 92, accentSize: 130, at: T.h1, gap: 0.07, accentColor: PINK, wobble: true, late: 3, lateAt: T.h1Late, lineHeight: 1.0, fit: true })
  const H2 = popText(root, 'When your planets | *line* *up…*', { top: 170, size: 100, accentSize: 150, at: T.h2, gap: 0.08, accentColor: READING.pull, wobble: true, late: 2, lateAt: T.h2Late, fit: true })
  const H2b = popText(root, 'Sparks *fly.*', { top: 200, size: 130, accentSize: 200, at: T.h2b, gap: 0.12, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h2b + 0.2 })
  const H3 = popText(root, 'Align reads | the spark | *before* you meet.', { top: 120, size: 96, accentSize: 130, at: T.h3, gap: 0.08, accentColor: PINK, lineHeight: 1.0, fit: true })
  const H4 = popText(root, 'Find your | *spark.*', { top: 190, size: 132, accentSize: 220, at: T.h4, gap: 0.12, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h4Late })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H2b, T.h2bOut], [H3, T.h3Out], [H4, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const flash = el('div', { position: 'absolute', inset: 0, background: '#fff8e0', opacity: 0, pointerEvents: 'none' }, root)
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  const surge = t => (t >= T.surge ? Math.exp(-(t - T.surge) * 1.6) : 0) + (t >= T.surge - 0.12 && t < T.surge ? prog(t, T.surge - 0.12, T.surge) : 0)

  function starK(t, tin) {
    if (t < T.cut1) return pop01(t, tin, 0.36, 2.1) * popOut(t, T.act2Out)
    if (t < T.cut2) return pop01(t, T.cut1 + 0.05, 0.36, 2.1)
    return pop01(t, T.pair, 0.36, 2.1) * popOut(t, T.out)
  }
  function drawAries(t) {
    const k = starK(t, T.ariIn)
    if (k <= 0.02) return
    const [px, py, ps] = ariPos(t), st = ariMood(t)
    let squash = 0
    if (t >= T.sputter && t < T.smoke + 0.4) squash = 0.05 * Math.sin(t * 60)                            // buzzing
    if (t >= T.zap && t < T.zap + 0.5) squash -= 0.15 * Math.exp(-(t - T.zap) * 7) * Math.cos((t - T.zap) * 26)
    const opts = { hops: ARI_HOPS, seed: 3, pop: k, squash }
    drawStarChar(x, px, py, ps, t, { color: t >= T.smoke && t < T.cut1 ? '#b0503a' : ARI.color, glyph: ARI.glyph, mood: st.mood, look: st.look, blink: st.blink, zzz: false, glow: t >= T.smoke && t < T.cut1 ? 0.3 : 1.05, ...opts })
    if (t >= T.rub[0] && t < T.bzt + 0.1) inSprite(x, starFrame(px, py, ps, t, opts), () => sweatCells(x, t, 1))
  }
  function drawLeo(t) {
    const k = starK(t, T.leoIn)
    if (k <= 0.02) return
    const [px, py, ps] = leoPos(t), st = leoMood(t)
    let squash = 0
    if (t >= T.zap && t < T.zap + 0.5) squash -= 0.15 * Math.exp(-(t - T.zap) * 7) * Math.cos((t - T.zap) * 26)
    drawStarChar(x, px, py, ps, t, { color: LEO.color, glyph: LEO.glyph, mood: st.mood, look: st.look, blink: st.blink, hops: LEO_HOPS, seed: 5, pop: k, squash })
  }
  function drawGuide(t) {
    const k = t < T.sink[0] ? pop01(t, T.guideIn, 0.36, 2.1) * popOut(t, [T.sink[0] - 0.1, T.sink[0] + 0.2])
      : t < T.cut1 ? pop01(t, T.sink[0] + 0.3, 0.36, 2.1) * popOut(t, T.act2Out)
      : t < T.cut2 ? pop01(t, T.cut1 + 0.15, 0.36, 2.1) * popOut(t, T.act4Out) : pop01(t, T.pair + 0.2, 0.36, 2.1) * popOut(t, T.out)
    if (k <= 0.02) return
    const [px, py, ps] = guidePos(t), st = guideMood(t)
    drawStarChar(x, px, py, ps, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, hops: SKY_HOPS, seed: 2, pop: k, glow: 1.2 })
  }
  function drawPisces(t) {
    let P, k
    if (t < T.cut1) { P = [120, 820, 110]; k = pop01(t, T.pisIn, 0.36, 2.1) * popOut(t, T.act2Out) }
    else if (t >= T.cut2) { P = [130, 900, 120]; k = pop01(t, T.pair + 0.3, 0.36, 2.1) * popOut(t, T.out) }
    else return
    if (k <= 0.02) return
    const tears = t < T.smoke ? 0 : t < T.cut1 ? 2 : t < T.spark ? 1 : 3
    const opts = { hops: [T.pisIn + 0.3, T.spark + 0.2], seed: 6, pop: k, squash: tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0 }
    drawStarChar(x, P[0], P[1], P[2], t, { color: PIS.color, glyph: null, mood: t < T.smoke ? 'happy' : t < T.cut1 ? 'squint' : 'happy', look: [1, 1], ...opts })
    inSprite(x, starFrame(P[0], P[1], P[2], t, opts), () => tearsCells(x, t, tears))
  }

  function act1(t) {
    if (t >= T.sink[1]) return
    const sk = ease.inCubic(prog(t, ...T.sink))
    x.save(); x.translate(0, sk * 700)
    drawSkyline(x, t, prog(t, ...T.build), clamp(surge(t)), 1 - sk)
    x.restore()
  }
  function act2(t) {
    if (t < T.rug || t >= T.cut1) return
    const a = clamp(prog(t, T.rug, T.rug + 0.3)) * outK(t, T.act2Out)
    drawRug(x, 330, 1352, 260, a)
    // tiny static zap
    if (t >= T.bzt && t < T.bzt + 0.35) drawZap(x, 400, 1150, 470, 1080, t, { w: 4, jag: 12, n: 5, seed: 3, col: ELEC })
    // jumper cables: clip on, sputter, smoke
    if (t >= T.cables[0]) {
      const ck = easeOutBack(prog(t, ...T.cables), 1.6) * a
      const ex = lerp(430, 650, ck)
      drawCable(x, 425, 1200, ex, 1200, '#ff4d4a', 70, clamp(ck * 2) * a)
      drawCable(x, 430, 1260, lerp(430, 655, ck), 1265, '#2a2440', 60, clamp(ck * 2) * a)
      if (t >= T.sputter && t < T.smoke) {
        const on = Math.floor(t * 14) % 2
        if (on) drawZap(x, 425, 1200, 470, 1150, t, { w: 3, jag: 10, n: 4, seed: 5, col: GOLD })
        if (!on) drawZap(x, 650, 1200, 610, 1150, t, { w: 3, jag: 10, n: 4, seed: 7, col: GOLD })
      }
    }
    drawSmoke(x, 330, 1130, prog(t, T.smoke, T.smoke + 1.1))
  }
  function charts(t) {
    if (t < T.charts || t >= T.cut2) return
    const kL = pop01(t, T.charts, 0.4, 1.7) * outK(t, T.act4Out), kR = pop01(t, T.charts + 0.15, 0.4, 1.7) * outK(t, T.act4Out)
    const ch = clamp(prog(t, ...T.charge)) * (t < T.zap + 0.6 ? 1 : 0.3)
    drawChart(x, CH.L.x, CH.L.y, CH.r, t, kL, angL(t), ARI.color, ch)
    drawChart(x, CH.R.x, CH.R.y, CH.r, t, kR, angR(t), LEO.color, ch)
    // the spark across (15.04 →): a big bolt, then a calm crackle until act 4
    const pL = [CH.L.x + Math.cos(angL(t)) * CH.r * 0.7, CH.L.y + Math.sin(angL(t)) * CH.r * 0.7]
    const pR = [CH.R.x + Math.cos(angR(t)) * CH.r * 0.7, CH.R.y + Math.sin(angR(t)) * CH.r * 0.7]
    if (t >= T.zap && t < T.arcs[0]) {
      const big = t < T.zap + 0.7
      drawZap(x, pL[0], pL[1], pR[0], pR[1], t, { w: big ? 9 : 4, jag: big ? 40 : 16, n: 8, seed: 9, col: GOLD, a: big ? 1 : 0.7 * outK(t, [T.arcs[0] - 0.3, T.arcs[0]]) })
    }
    // push / pull / align arcs
    const ARCS = [[830, PINK, 'PUSH'], [910, READING.pull, 'PULL'], [990, READING.align, 'ALIGN']]
    ARCS.forEach(([y, col, label], i) => {
      const p = ease.outCubic(prog(t, T.arcs[i], T.arcs[i] + 0.4))
      if (p <= 0) return
      x.save(); x.globalAlpha = outK(t, T.act4Out)
      drawReadArc(x, CH.L.x + CH.r - 6, CH.R.x - CH.r + 6, y, 50, col, p, t, label, i + 1)
      x.restore()
    })
  }
  function pairSpark(t) {
    if (t < T.spark) return
    const k = easeOutBack(prog(t, T.spark, T.spark + 0.4), 2.6) * outK(t, T.out)
    if (k <= 0.02) return
    const cx = 545, cy = 1070 + 8 * Math.sin(t * 3)
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = k
    const g = x.createRadialGradient(cx, cy, 4, cx, cy, 150); g.addColorStop(0, 'rgba(255,240,180,0.9)'); g.addColorStop(0.3, 'rgba(242,199,92,0.4)'); g.addColorStop(1, 'rgba(242,199,92,0)')
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 150, 0, Math.PI * 2); x.fill(); x.restore()
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.floor(t * 6) * 0.7
      drawZap(x, cx, cy, cx + Math.cos(a) * 80 * k, cy + Math.sin(a) * 80 * k, t, { w: 3, jag: 10, n: 4, seed: 11 + i, col: GOLD, a: k })
    }
    x.save(); x.globalAlpha = k; drawPixelStar(x, cx, cy, 60 * k * (0.85 + 0.15 * Math.sin(t * 9)), 2, '#fffbe8'); x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      act1(t)
      act2(t)
      charts(t)
      pairSpark(t)
      drawPisces(t)
      drawAries(t)
      drawLeo(t)
      drawGuide(t)
      sparkles(t, 540, 880, T.zap, 16, 320, 1, [GOLD, ELEC, BONE])
      sparkles(t, 545, 1070, T.spark, 14, 260, 2, [GOLD, PINK, BONE])
      sparkles(t, 450, 1120, T.bzt, 8, 70, 3, [ELEC, BONE])
      box.update(t)
      flash.style.opacity = String(0.55 * clamp(surge(t) > 0.9 ? (surge(t) - 0.9) * 10 : 0) + (t >= T.zap ? 0.6 * Math.exp(-(t - T.zap) * 9) : 0))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.45 (the skyline sinks), 11.12 (the smoke → the charts; hides the re-block), 17.6 (sparks fly
// → the reading), 22.2 (the reading → the pair). cardfx keeps 11.12 and 22.2 for a 30 s film.
const CUTS = [5.45, { t: T.cut1, kind: 'deal' }, 17.6, { t: T.cut2, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const buzz = (t, d, f = 120, g = 0.02) => ['chip', t, f, d, { ...FX, wave: 'square', duty: 0.5, slide: 0, gain: g, decay: d, sustain: 0.8 }]

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  ...head(T.h0, 5, 0.09, T.h0Late, 0),
  // towers spring up, then the surge
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ['pop', +(T.build[0] + (i * 0.85 / 8) * (T.build[1] - T.build[0]) + 0.1).toFixed(3), NOTE[i % 7], 0.03, (i - 3.5) * 0.1]),
  ['whoosh', T.surge - 0.25, 0.3, 0.06], ['boom', T.surge, 0.14], ['glitter', T.surge, T.surge + 0.8], buzz(T.surge, 0.5, 110, 0.025),
  ['pop', T.guideIn + 0.05, 880, 0.04, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SKYN]: 660, [ARIN]: 987.77 } }),
  // the forced spark
  ['whoosh', T.sink[0], 0.5, 0.05], ...head(T.h1, 5, 0.07, T.h1Late, 2),
  ['pop', T.ariIn + 0.05, 739.99, 0.04, -0.3], ['pop', T.leoIn + 0.05, 659.25, 0.04, 0.3], ['pop', T.pisIn + 0.05, 1046.5, 0.03, -0.5],
  ...[0, 1, 2, 3, 4, 5].map(i => ['chip', +(T.rub[0] + i * 0.15).toFixed(3), 300 + (i % 2) * 60, 0.08, { ...FX, wave: 'noise', gain: 0.012, decay: 0.07, sustain: 0.3 }]),
  ['chip', T.bzt, 2400, 0.1, { ...FX, wave: 'square', duty: 0.25, slide: -12, gain: 0.025, decay: 0.08, sustain: 0.3 }],
  ['tom', T.cables[1], 160, { ...FX, gain: 0.12, decay: 0.12 }], ['pop', T.cables[1] + 0.05, 1318.51, 0.04, 0.3],
  buzz(T.sputter, 0.3, 90, 0.022), buzz(T.sputter + 0.35, 0.15, 80, 0.018),
  ['chip', T.smoke, 500, 0.6, { ...FX, wave: 'tri', slide: -24, gain: 0.03, decay: 0.5, sustain: 0.5 }], ['chip', T.smoke, 900, 0.5, { ...FX, wave: 'noise', gain: 0.025, decay: 0.4, sustain: 0.3 }],
  ...[0, 1, 2].map(i => ['pluck', +(T.roll[0] + 0.08 + i * 0.12).toFixed(3), 1174.66 * Math.pow(2, i / 12), 0.025, 0.3, 0]),
  ...sob(T.smoke + 0.3, 1400), ...sob(T.smoke + 0.9, 1480, 2),
  // planets line up
  ...head(T.h2, 3, 0.08, T.h2Late, 4),
  ['pop', T.charts + 0.05, 659.25, 0.04, -0.4], ['pop', T.charts + 0.2, 987.77, 0.04, 0.4],
  ['whoosh', T.sweep[0], 1.2, 0.03], ['chip', T.charge[0], 220, 0.64, { ...FX, wave: 'square', duty: 0.25, slide: 24, gain: 0.02, decay: 0.6, sustain: 0.8 }],
  ['boom', T.zap, 0.16], ['bell', T.zap, 1318.51, 0.05, 2.0, 0], ['glitter', T.zap, T.zap + 1.0], buzz(T.zap, 0.4, 140, 0.02),
  ['pop', T.h2b, 880, 0.035, 0], ['pop', T.h2b + 0.2, 1318.51, 0.05, 0],
  // the reading
  ...head(T.h3, 6, 0.08, T.h3 + 0.5, 1),
  ...T.arcs.flatMap((s, i) => [['whoosh', s - 0.05, 0.2, 0.04], ['pluck', s + 0.35, [987.77, 739.99, 1174.66][i], 0.045, 0.8, (i - 1) * 0.4], buzz(s, 0.25, 160 + i * 40, 0.012)]),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // find your spark
  ...head(T.h4, 2, 0.12, T.h4Late, 2),
  ['pop', T.pair + 0.05, 739.99, 0.04, -0.3], ['pop', T.pair + 0.1, 659.25, 0.04, 0.3],
  ['bell', T.spark, 1567.98, 0.045, 1.8, 0], ['glitter', T.spark, T.spark + 0.9], buzz(T.spark, 0.3, 180, 0.015),
  ...sob(T.spark + 0.4, 1568), ...sob(T.spark + 1.0, 1660, 2),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
