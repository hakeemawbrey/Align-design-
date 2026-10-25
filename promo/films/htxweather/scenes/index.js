// htxweather (15 s vertical Align ad) · story 0–10.6, then the shared end card ("come" + the Align logo).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–4.15  HOOK  "Houston weather: | sunny, *pouring,* | sunny again."  A low skyline and a pictogram with an umbrella.
//              A sun and a rain cloud ride a big weather dial; it flips them on the beat (sun / pour / sun …), faster and
//              faster, and the umbrella snaps open and shut every time. Rain when the cloud is up, sweat when the sun is.
//   4.20–6.60  "Mixed signals? | *Not here.*"  The dial whirls out of control; on "Not here." it bursts into sparkles and
//              two zodiac charts spin in and lock (5.6); two people's planets pop.
//   6.60–8.55  "See exactly | how you *fit.*"  The Push / Pull / Align lines draw between the planets, on the beat,
//              with a PUSH · PULL · ALIGN legend.
//   8.55–10.5  "Read the | *signs.*"  The chart pops away; two pictograms below, the three reading colours arc over
//              them as a rainbow, and the twelve sign glyphs pop along it. Everything is out by 10.5.
//   10.5→      plain sky only (SKY_H + grain); the end card takes over at 10.6.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH, READING, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { BONE, GOLD, PINK, BLUE, VIOLET, SILVER, INTER, MONO, rgba, ink, sparkle, sun, cloud, rain, skyline, umbrellaPerson, canopy, person, orb } from './props.js'

export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2, D2R = Math.PI / 180
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)

// ── the timeline
const SWAPS = [BEAT(1.5), BEAT(2.5), BEAT(3.5), BEAT(4.5), BEAT(5), BEAT(5.5), BEAT(6), BEAT(6.25)]
export const T = {
  hook: 0.1, sunny: BEAT(0.5), pouring: SWAPS[0], sunny2: SWAPS[1], again: BEAT(3), city: 0.08, man: 0.3, hookOut: [4.0, 4.18],
  frenzy: [4.2, BEAT(7.5)],
  h1: 4.22, notHere: BEAT(7.5), wA: [4.82, 5.32], wB: [4.95, BEAT(9)], lock: BEAT(9), dots: BEAT(10), h1Out: [6.42, 6.62],
  h2: 6.62, fit: BEAT(11.5), lines: [BEAT(11), BEAT(11.75), BEAT(12.5)], h2Out: [8.44, 8.6],
  chartOut: [8.44, 8.78], h3: 8.64, signs: BEAT(15), people: [8.62, 8.74], bow: [8.85, 9.45], glyphs: 9.1, h3Out: [10.22, 10.46], out: [10.05, 10.46],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const wob = (t, a, amp = 1, f = 18, k = 6) => t > a ? amp * Math.exp(-(t - a) * k) * Math.sin((t - a) * f) : 0

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  The last `late` words pop at lateAt (big, wobble). `times` overrides per-word times; `colors` per-word colours. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, times = null, colors = {}, lineHeight = 1.02, bigs = null }) {
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
    if (colors[n]) style.color = colors[n]
    const big = bigs ? bigs.includes(n) : late > 0 && n >= nW - late
    const wt = times ? times[n] : (late > 0 && n >= nW - late) ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: wt, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        if (t < w.t) { w.e.style.opacity = '0'; continue }
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── the weather dial: the sun and the cloud sit on opposite ends of a big wheel; every swap turns it half a turn
const DIAL = { x: 540, y: 1540, r: 640 }                 // top of the dial = (540, 900)
const BASE_Y = 1730                                       // street line
const MAN = { x: 540, y: BASE_Y, s: 1.22 }
/** total dial rotation (radians) at t */
function dialRot(t) {
  let r = 0
  SWAPS.forEach((s, i) => {
    const gap = (SWAPS[i + 1] || s + 0.5) - s
    r += Math.PI * easeOutBack(prog(t, s, s + Math.min(0.3, gap * 0.85)), 1.5)
  })
  // the frenzy: it whirls up, faster and faster
  const f = prog(t, T.frenzy[0], T.frenzy[1])
  r += 5 * TAU * f * f
  return r
}
/** 1 = the cloud is up top (raining) */
const cloudUp = t => { const a = -Math.PI / 2 + dialRot(t) + Math.PI; return clamp((-Math.sin(a) - 0.82) / 0.16) }
/** umbrella open amount: springs to the new weather just after each swap */
function umbrellaOpen(t) {
  let o = 0, prev = 0
  SWAPS.forEach((s, i) => {
    const target = i % 2 === 0 ? 1 : 0
    const p = easeOutBack(prog(t, s + 0.05, s + 0.25), 2.4)
    if (t >= s + 0.05) o = lerp(prev, target, p)
    prev = target
  })
  if (t > T.frenzy[0]) o = 0.5 + 0.5 * Math.sin((t - T.frenzy[0]) * 34)   // flapping in the frenzy
  return clamp(o, -0.05, 1.1)
}

// ── the charts
const WC = { x: 540, y: 1060 }
const WA = { cx: 0, cy: 0, rOut: 420, rIn: 336, rGlyph: 378, alpha: 0.92 }
const WB = { cx: 0, cy: 0, rOut: 318, rIn: 248, rGlyph: 284, alpha: 0.92 }
const PAIRS = [
  { a: 20, b: 110, col: READING.push, label: 'PUSH' },
  { a: 145, b: 265, col: READING.pull, label: 'PULL' },
  { a: 228, b: 48, col: READING.align, label: 'ALIGN' },
]
const R_A = 214, R_B = 124
const ptC = (lon, r) => ({ x: WC.x + Math.cos(Math.PI - lon * D2R) * r, y: WC.y + Math.sin(Math.PI - lon * D2R) * r })

// ── the ending
const PL = { x: 420, y: 1740 }, PR = { x: 660, y: 1740 }, BOW = { x: 540, y: 1740, r: [470, 435, 400] }

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 56px Inter", "700 62px Inter", "italic 500 190px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow("TODAY'S FORECAST", BLUE), 0.05, T.hookOut], [eyebrow('YOUR READING'), T.wA[0], T.h2Out]]
  const H0a = popText(root, 'Houston weather:', { top: 200, size: 96, at: T.hook, gap: 0.1 })
  const H0 = popText(root, 'sunny, *pouring,* | sunny again.', { top: 318, size: 108, accentSize: 146, times: [T.sunny, T.pouring, T.sunny2, T.again], bigs: [0, 1, 2, 3], wobble: true, accentColor: BLUE, lineHeight: 1.08 })
  const H1 = popText(root, 'Mixed signals? | *Not* *here.*', { top: 215, size: 124, accentSize: 176, at: T.h1, gap: 0.09, late: 2, lateAt: T.notHere, lateGap: 0.1, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H2 = popText(root, 'See exactly | how you *fit.*', { top: 215, size: 120, accentSize: 168, at: T.h2, gap: 0.07, late: 1, lateAt: T.fit, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H3 = popText(root, 'Read the | *signs.*', { top: 200, size: 150, accentSize: 230, at: T.h3, gap: 0.09, late: 1, lateAt: T.signs, wobble: true, accentColor: GOLD, lineHeight: 0.95 })
  const HEADS = [[H0a, T.hookOut], [H0, T.hookOut], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  // the legend under the chart
  const legend = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: '1560px', textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: '60px', letterSpacing: '0.04em', textShadow: SHADOW }, root)
  const LEG = PAIRS.map((P, i) => {
    if (i) el('span', { display: 'inline-block', margin: '0 0.35em', color: rgba(BONE, 0.5), opacity: 0 }, legend, '·')
    return el('span', { display: 'inline-block', color: P.col, opacity: 0 }, legend, P.label)
  })
  const DOTS = [...legend.querySelectorAll('span')].filter(s => s.textContent === '·')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── 1 · the hook: dial, rain, skyline, umbrella pictogram
  function drawHook(t) {
    if (t > T.notHere + 0.8) return
    const gone = t > T.notHere
    const sinkK = ease.inCubic(prog(t, T.notHere, T.notHere + 0.45))
    const sink = sinkK * 700
    const rot = dialRot(t)
    const aSun = -Math.PI / 2 + rot, aCloud = aSun + Math.PI
    const sunK = pop01(t, T.sunny, 0.42, 2.6), cu = cloudUp(t)
    // the swap kick: everything squashes on each swap
    const kick = SWAPS.reduce((m, s) => m + wob(t, s, 0.12, 22, 7), 0)
    if (!gone) {
      // dial spokes (faint), so the swap reads as one wheel turning
      const dk = clamp(prog(t, T.pouring - 0.1, T.pouring + 0.2)) * 0.5
      if (dk > 0) {
        x.save(); x.globalAlpha = dk
        x.beginPath(); x.arc(DIAL.x, DIAL.y, DIAL.r, 0, TAU); x.setLineDash([4, 26]); ink(x, BONE, { w: 6, fa: 0, glow: 6 }); x.setLineDash([])
        x.restore()
      }
      // whoosh arcs while it turns fast
      const spd = SWAPS.reduce((m, s) => m + Math.sin(Math.PI * prog(t, s, s + 0.26)), 0) + clamp(prog(t, T.frenzy[0], T.frenzy[1]) * 1.4)
      if (spd > 0.05) {
        x.save(); x.globalAlpha = clamp(spd) * 0.75
        for (const a0 of [aSun, aCloud]) { x.beginPath(); x.arc(DIAL.x, DIAL.y, DIAL.r, a0 - 0.55, a0 - 0.12); ink(x, a0 === aSun ? GOLD : BLUE, { w: 10, fa: 0, glow: 24 }) }
        x.restore()
      }
      const sx = DIAL.x + Math.cos(aSun) * DIAL.r, sy = DIAL.y + Math.sin(aSun) * DIAL.r
      const cx = DIAL.x + Math.cos(aCloud) * DIAL.r, cy = DIAL.y + Math.sin(aCloud) * DIAL.r
      // rain from the cloud (onto the umbrella / the street)
      if (cu > 0) {
        const o = umbrellaOpen(t), cn = canopy(clamp(o))
        const ux = MAN.x + 4, ctop = MAN.y + cn.top * MAN.s
        const floor = px => Math.abs(px - ux) < cn.hw * MAN.s ? ctop + (cn.hw * MAN.s > 60 ? 40 * ((px - ux) / (cn.hw * MAN.s)) ** 2 : 0) : BASE_Y
        rain(x, cx, cy + 60, 250, t, cu, floor)
      }
      cloud(x, cx, cy, 1.05 * (1 + kick), t, { sq: 1 + kick })
      sun(x, sx, sy, 1.0 * sunK * (1 + kick), t, { sq: 1 + kick, a: clamp(sunK * 2) })
    }
    // the burst on "Not here."
    sparkle(x, 540, 940, t, T.notHere, { n: 22, R: 520, seed: 12, size: 34, cols: [GOLD, '#ffd98a', BLUE, PINK, '#fff3e0'] })
    // skyline + the umbrella pictogram
    skyline(x, t, BASE_Y + sink, j => pop01(t, T.city + j * 0.04, 0.42, 1.6), { sunny: 1 - cu, a: 0.62 })
    const mk = pop01(t, T.man, 0.42, 2.4)
    if (mk > 0 && sinkK < 1) {
      const hop = SWAPS.reduce((m, s) => m + Math.abs(wob(t, s, 26, 16, 7)), 0)
      const fr = prog(t, T.frenzy[0], T.frenzy[1])
      const tilt = Math.sin(t * 3) * 0.05 + fr * Math.sin(t * 27) * 0.35
      umbrellaPerson(x, MAN.x + fr * Math.sin(t * 19) * 14, MAN.y + sink - hop, MAN.s * mk, t, { o: umbrellaOpen(t), tilt, col: GOLD, sweat: (1 - cu) * clamp(prog(t, T.sunny + 0.2, T.sunny + 0.5)) * (t < T.frenzy[0] ? 1 : 0) })
    }
  }

  // ── 2/3 · the charts and the reading
  function drawCharts(t) {
    if (t < T.wA[0] || t > T.chartOut[1]) return
    const ok = popOut(t, T.chartOut)
    const bump = t > T.lock ? 1 + 0.07 * Math.exp(-(t - T.lock) * 7) : 1
    const idle = t > T.lock ? (t - T.lock) * 0.12 : 0
    // A: drops in from where the sun was, spinning
    const pa = easeOutBack(prog(t, ...T.wA), 1.4)
    const ra = -1.6 * TAU * (1 - ease.outCubic(prog(t, ...T.wA))) + idle
    x.save(); x.translate(WC.x, lerp(780, WC.y, pa)); x.rotate(ra); x.scale(pa * bump * ok, pa * bump * ok)
    x.beginPath(); x.arc(0, 0, WA.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.7)'; x.fill()
    drawWheelH(x, { W: WA })
    x.restore()
    sparkle(x, WC.x, WC.y, t, T.wA[0] + 0.15, { n: 14, R: 480, seed: 21, size: 28 })
    // B: flies in from the lower right, snaps inside A on the lock beat
    if (t >= T.wB[0]) {
      const pb = easeOutBack(prog(t, ...T.wB), 1.2)
      const rb = 2.2 * TAU * (1 - ease.outCubic(prog(t, ...T.wB))) - idle * 1.4
      x.save(); x.translate(lerp(1400, WC.x, pb), lerp(1700, WC.y, pb)); x.rotate(rb); x.scale(lerp(1.5, 1, pb) * bump * ok, lerp(1.5, 1, pb) * bump * ok)
      x.beginPath(); x.arc(0, 0, WB.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.8)'; x.fill()
      drawWheelH(x, { W: WB })
      x.restore()
    }
    const fk = prog(t, T.lock, T.lock + 0.6)
    if (fk > 0 && fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(WC.x, WC.y, 330 + 220 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 14 * (1 - fk) + 2, fa: 0, glow: 34 }); x.restore() }
    sparkle(x, WC.x, WC.y, t, T.lock, { n: 18, R: 470, seed: 31, size: 32 })
    // planets + the three reading lines (they live on the rotating charts, so rotate with them)
    PAIRS.forEach((P, i) => {
      const A_ = ptC(P.a, R_A * bump * ok), B_ = ptC(P.b, R_B * bump * ok)
      const dk = pop01(t, T.dots + i * 0.08, 0.36, 2.2) * ok
      const lk = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.34))
      if (lk > 0) {
        const pulse = 1 + 0.5 * Math.exp(-Math.max(0, t - T.lines[i] - 0.34) * 4)
        x.save(); x.globalAlpha = clamp(ok); x.beginPath(); x.moveTo(A_.x, A_.y); x.lineTo(lerp(A_.x, B_.x, lk), lerp(A_.y, B_.y, lk)); ink(x, P.col, { w: 12 * pulse, fa: 0, glow: 34 }); x.restore()
        sparkle(x, B_.x, B_.y, t, T.lines[i] + 0.32, { n: 9, R: 120, seed: 40 + i, cols: [P.col, '#fff3e0', P.col], size: 24 })
      }
      if (dk > 0) { orb(x, A_.x, A_.y, 22 * dk, GOLD, clamp(dk * 2)); orb(x, B_.x, B_.y, 22 * dk, SILVER, clamp(dk * 2)) }
    })
  }

  // ── 4 · the ending: two people, a rainbow in the reading's colours, the twelve signs along it
  function drawEnd(t) {
    if (t < T.people[0] || t > T.out[1]) return
    const ok = popOut(t, T.out)
    ;[[PL, GOLD, T.people[0], 0.07], [PR, PINK, T.people[1], -0.07]].forEach(([P, col, t0, lean], i) => {
      const k = pop01(t, t0, 0.42, 2.4) * ok
      if (k <= 0) return
      const rise = (1 - ease.outCubic(prog(t, t0, t0 + 0.4))) * 300
      const sq = 1 + wob(t, t0, 0.12, 20, 6) + wob(t, T.signs, 0.08, 18, 5)
      const hop = Math.abs(wob(t, T.bow[1], 46, 9, 3.5))
      person(x, P.x, P.y + rise - hop * (i ? 0.85 : 1), 1.25 * k, col, { lean, sq })
    })
    // the rainbow: pink, blue, gold bands, drawn from the left person's side to the right
    const bk = ease.inOutCubic(prog(t, ...T.bow))
    if (bk > 0) {
      x.save(); x.globalAlpha = clamp(ok)
      ;[READING.push, READING.pull, READING.align].forEach((col, j) => {
        const r = BOW.r[j] * (0.9 + 0.1 * ok)
        x.beginPath(); x.arc(BOW.x, BOW.y, r, Math.PI, Math.PI + Math.PI * clamp(bk * 1.06 - j * 0.03)); ink(x, col, { w: 26, fa: 0, glow: 30 })
      })
      x.restore()
      sparkle(x, BOW.x, BOW.y - 420, t, T.bow[1] - 0.05, { n: 16, R: 420, seed: 61, size: 30 })
    }
    // the twelve signs pop along the outside of the bow
    SIGNS.forEach((S, i) => {
      const t0 = T.glyphs + i * 0.045, k = pop01(t, t0, 0.34, 2.6) * ok
      if (k <= 0) return
      const a = Math.PI * (1.14 + 0.72 * (i + 0.5) / 12), r = 520 + 6 * Math.sin(t * 3 + i)
      const gx_ = BOW.x + Math.cos(a) * r, gy = BOW.y + Math.sin(a) * r * 0.98
      x.save(); x.translate(gx_, gy); x.scale(k, k)
      x.font = "bold 66px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.shadowColor = S.color; x.shadowBlur = 22; x.fillStyle = S.color; x.fillText(S.glyph + '︎', 0, 0)
      x.restore()
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) { drawHook(t); drawCharts(t); drawEnd(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      // legend: each word pops with its line
      const lo = outK(t, T.h2Out)
      LEG.forEach((s, i) => {
        const k = t < T.lines[i] + 0.25 ? 0 : pop01(t, T.lines[i] + 0.25, 0.32, 2.6)
        s.style.opacity = String(clamp(k * 3) * lo); s.style.transform = `scale(${(0.4 + 0.6 * k).toFixed(4)})`
      })
      DOTS.forEach((d, i) => { d.style.opacity = String((t > T.lines[i + 1] + 0.2 ? 1 : 0) * lo) })
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts, just before each beat's headline: hook → "Mixed signals?" → "See exactly how you fit." → "Read the signs."
const CUTS = [{ t: 4.16, kind: 'flip' }, { t: 6.57, kind: 'deal' }, { t: 8.58, kind: 'fan' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
// rain patter: soft ticks while the cloud is up (after swaps 0, 2, 4, 6)
const patter = []
SWAPS.forEach((s, i) => {
  if (i % 2) return
  const end = SWAPS[i + 1] || s + 0.3
  for (let k = 0.12; s + k < end - 0.04; k += 0.09) patter.push(['tick', +(s + k).toFixed(3), 0.018 + 0.01 * ((k * 100) % 2)])
})
export const CUES = [
  // hook
  ['whoosh', 0.05, 0.4, 0.03], ...wordPops(T.hook, 2, 0.1, 0, 0.03),
  ['pop', T.sunny, 1174.66, 0.06, 0], ['bell', T.sunny, 1318.51, 0.035, 0.9, 0.2],
  ...SWAPS.map((s, i) => ['whoosh', s, 0.28, 0.035 + (i < 2 ? 0.01 : 0)]),
  ...SWAPS.map((s, i) => ['pluck', +(s + 0.04).toFixed(3), i % 2 ? 987.77 : 440, 0.045, 0.4, i % 2 ? 0.4 : -0.4]),
  ...SWAPS.map((s, i) => ['pop', +(s + 0.1).toFixed(3), i % 2 ? 1174.66 : 587.33, 0.05, 0]),    // the umbrella snaps
  ['pop', T.again, 1318.51, 0.05, 0],
  ...patter,
  ['riser', 3.9, T.notHere, 0.045],
  // mixed signals? not here.
  ...wordPops(T.h1, 2, 0.09, 2, 0.03),
  ['boom', T.notHere, 0.12], ['pop', T.notHere, 1318.51, 0.055, 0], ['pop', T.notHere + 0.1, 1174.66, 0.05, 0], ['glitter', T.notHere, T.notHere + 0.6],
  ['whoosh', T.wA[0], 0.45, 0.04], ['whoosh', T.wB[0], 0.5, 0.04],
  ['bell', T.lock, 587.33, 0.05, 2.0, 0], ['glitter', T.lock, T.lock + 0.6],
  ['pop', T.dots, 880, 0.045, -0.3], ['pop', T.dots + 0.08, 987.77, 0.045, 0], ['pop', T.dots + 0.16, 1174.66, 0.045, 0.3],
  // see exactly how you fit
  ...wordPops(T.h2, 4, 0.07, 1, 0.025), ['pop', T.fit, 1318.51, 0.055, 0],
  ...T.lines.map((l, i) => ['pluck', +(l + 0.3).toFixed(3), [987.77, 1174.66, 1318.51][i], 0.05, 0.7, (i - 1) * 0.4]),
  ...T.lines.map((l, i) => ['pop', +(l + 0.25).toFixed(3), [739.99, 880, 987.77][i], 0.04, (i - 1) * 0.4]),
  // read the signs
  ['whoosh', T.chartOut[0], 0.4, 0.035],
  ...wordPops(T.h3, 2, 0.09, 2, 0.03), ['pop', T.signs, 1318.51, 0.06, 0], ['pluck', T.signs, 1174.66, 0.05, 0.7, 0],
  ['pop', T.people[0], 587.33, 0.05, -0.5], ['pop', T.people[1], 739.99, 0.05, 0.5],
  ['whoosh', T.bow[0], 0.5, 0.03], ['bell', T.bow[1] - 0.05, 1174.66, 0.05, 1.4, 0], ['glitter', T.glyphs, T.glyphs + 0.7],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
