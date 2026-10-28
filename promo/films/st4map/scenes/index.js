// st4map (EP 087, 20 s vertical Align ad, Star Talk season 4, thread A: the vote) · story 0–15.6, then the shared end
// card ("come" + the Align logo, CTA "SIGN UP TO VOTE YOUR CITY").
//   0.00–2.80  "The map is | *lighting up.*"  A stylised US outline draws itself on (line art, not exact geography). Texas
//              fills gold and glows (TEXAS ✓: the first region is locked in). The eight candidate cities pop in as dim stars.
//   2.82–9.60  Box (THE STARS): "every sign-up is a *star.*"  Little sign-up stars rise from below and land on every city
//              in turn, round-robin, each one pulsing the same. "Every city | is *in it.*"  → "which city lights up *next?*"
//              (all eight pulse together in a slow wave; no numbers, no leader). The box pops shut.
//   9.85       card cut (flip).
//  10.0–15.5   "Light it *up.*"  Constellation lines reach from Texas to all eight cities at once; every city flares
//              together. THE STARS hops in below, beaming. The ghost peeks over the top of the Texas panhandle.
// One canvas (sky + map + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
export const EP = 87
const CTA = 'SIGN UP TO VOTE YOUR CITY'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', CYAN = '#8fd8f6'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.75, h0Out: [5.5, 5.7],
  draw: [0.2, 1.7], tex: 1.6, texTag: 2.05, cities: 2.0,
  open: 2.62, l1: BEAT(4),                                     // 2.82
  rise: [3.1, 9.0], riseGap: 0.19, fly: 0.85,
  h1: 5.9, h1Land: 6.3, l2: 6.45, wave: [7.4, 9.6], h1Out: [9.55, 9.75],
  close: 9.6,
  cut: 9.85,
  h2: 10.0, h2Land: 10.35, lines: [10.5, 11.3], flare: 11.3, starIn: 10.9,
  ghost: 12.5,
  h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'every sign-up is a *star.*' },
  { t: T.l2, speaker: NARR, text: 'which city lights up *next?*' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── the map: a stylised lower-48 outline (lon/lat → px; not exact geography), as in votemap
const MAP = { cx: 540, cy: 975, k: 15.6, ky: 25.5, lon0: -96, lat0: 38 }
const P = (lon, lat) => ({ x: MAP.cx + (lon - MAP.lon0) * MAP.k, y: MAP.cy + (MAP.lat0 - lat) * MAP.ky })
const OUTLINE = [
  [-124.7, 48.4], [-123, 49], [-95.2, 49], [-95, 49.4], [-89.6, 48], [-84.8, 46.6], [-84.2, 45.8], [-82.4, 43.2], [-82.7, 41.7], [-79, 42.9],
  [-79, 43.4], [-76.4, 44.2], [-74.7, 45], [-71.5, 45], [-70.2, 46.9], [-69.2, 47.4], [-67.8, 47], [-67, 44.8], [-70.2, 43.6], [-70.8, 42.6],
  [-70, 41.8], [-71.8, 41.3], [-74, 40.6], [-74, 39.4], [-75.4, 38.6], [-76, 37], [-75.5, 35.3], [-77.9, 34], [-79.2, 33.2], [-81, 32],
  [-81.4, 30.5], [-80.5, 28.5], [-80.1, 26.5], [-80.4, 25.2], [-81.2, 25.3], [-81.8, 26.7], [-82.7, 28], [-82.8, 29.2], [-84, 30.1], [-85.4, 29.7],
  [-86.5, 30.4], [-88, 30.5], [-89.5, 30.2], [-89.3, 29.1], [-90.5, 29.2], [-92, 29.6], [-93.8, 29.7], [-94.8, 29.3], [-96.5, 28.3], [-97.4, 27.3],
  [-97.2, 25.9], [-99.1, 26.5], [-99.6, 27.6], [-101.4, 29.8], [-103, 29], [-104.5, 29.7], [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111, 31.3],
  [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.7, 39], [-124.2, 40.4], [-124.2, 42], [-124, 46.3], [-124.7, 48.4],
].map(([lo, la]) => P(lo, la))
const SEG = (() => { const a = [0]; for (let i = 1; i < OUTLINE.length; i++) a.push(a[i - 1] + Math.hypot(OUTLINE[i].x - OUTLINE[i - 1].x, OUTLINE[i].y - OUTLINE[i - 1].y)); return a })()
const TEXAS = [
  [-106.6, 32.0], [-103.05, 32.0], [-103.05, 36.5], [-100, 36.5], [-100, 34.56], [-98.5, 34.1], [-97.1, 33.8], [-95.6, 33.9], [-94.05, 33.55],
  [-94.05, 31.0], [-93.8, 29.7], [-94.8, 29.3], [-96.5, 28.3], [-97.4, 27.3], [-97.2, 25.9], [-99.1, 26.5], [-99.6, 27.6], [-101.4, 29.8],
  [-103, 29], [-104.5, 29.7], [-106.6, 32.0],
].map(([lo, la]) => P(lo, la))
const HUB = P(-98.6, 31.2)                                    // where the lines leave Texas from (its middle)
const PANHANDLE = P(-101.6, 36.5)
// the eight candidates (label offsets lx/ly). Order of the sign-up stream alternates coasts so nothing reads as "first".
const CITIES = [
  { n: 'SEATTLE', p: P(-122.3, 47.6), lx: 40, ly: 44 },
  { n: 'NEW YORK', p: P(-74, 40.7), lx: -30, ly: -44 },
  { n: 'LA', p: P(-118.2, 34.05), lx: 0, ly: 44 },
  { n: 'MIAMI', p: P(-80.2, 25.8), lx: -86, ly: 6 },
  { n: 'CHICAGO', p: P(-87.6, 41.9), lx: 0, ly: -42 },
  { n: 'NEW ORLEANS', p: P(-90.1, 30.0), lx: 0, ly: 44 },
  { n: 'NASHVILLE', p: P(-86.9, 36.3), lx: -10, ly: -40 },
  { n: 'ATLANTA', p: P(-84.4, 33.75), lx: 92, ly: 18 },
]
const NC = CITIES.length
// the sign-up stream: star n launches at rise[0] + n·gap from below and lands on city n % 8 after T.fly
const RISE_N = Math.floor((T.rise[1] - T.rise[0]) / T.riseGap)
const RISERS = (() => { const r = rng(870); return Array.from({ length: RISE_N }, (_, n) => ({ t0: T.rise[0] + n * T.riseGap, c: n % NC, x0: 120 + r() * 840, bend: (r() - 0.5) * 300, col: [GOLD, BONE, PINK, CYAN, LAV][n % 5] })) })()
// city brightness pulse: every arrival, the wave, the final flare (identical for every city)
function cityPulse(t, i) {
  let p = 0
  for (const R of RISERS) if (R.c === i) { const d = t - (R.t0 + T.fly); if (d >= 0 && d < 0.6) p = Math.max(p, 1 - d / 0.6) }
  const w = prog(t, ...T.wave)
  if (w > 0 && w < 1) p = Math.max(p, 0.6 * Math.max(0, Math.sin((t - T.wave[0]) * 5 - i * 0.785)))
  return p
}

async function build(stage) {
  try {
    await Promise.all(["800 128px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The map is | *lighting up.*', { top: 190, size: 104, accentSize: 156, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, wobble: true, gap: 0.09, accentColor: GOLD, lineHeight: 0.98 })
  const H1 = popText(root, 'Every city | is *in it.*', { top: 190, size: 112, accentSize: 164, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: CYAN, lineHeight: 0.98 })
  const H2 = popText(root, 'Light it *up.*', { top: 230, size: 136, accentSize: 200, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function poly(pts) { x.beginPath(); x.moveTo(pts[0].x, pts[0].y); for (let i = 1; i < pts.length; i++) x.lineTo(pts[i].x, pts[i].y); x.closePath() }
  function outlinePath(frac = 1) {
    const L = SEG[SEG.length - 1] * frac
    x.beginPath(); x.moveTo(OUTLINE[0].x, OUTLINE[0].y)
    for (let i = 1; i < OUTLINE.length; i++) {
      if (SEG[i] <= L) { x.lineTo(OUTLINE[i].x, OUTLINE[i].y); continue }
      const f = (L - SEG[i - 1]) / (SEG[i] - SEG[i - 1])
      const px = lerp(OUTLINE[i - 1].x, OUTLINE[i].x, f), py = lerp(OUTLINE[i - 1].y, OUTLINE[i].y, f)
      x.lineTo(px, py); return { x: px, y: py }
    }
    x.closePath(); return null
  }

  function drawMap(t, a) {
    const dp = ease.inOutCubic(prog(t, ...T.draw))
    if (dp <= 0 || a <= 0) return
    x.save(); x.globalAlpha = a
    const fk = ease.outCubic(prog(t, T.draw[1] - 0.3, T.draw[1] + 0.4))
    if (fk > 0) {
      x.save(); outlinePath(1); x.fillStyle = rgba('#3a2a7a', 0.45 * fk); x.fill(); x.clip()
      x.fillStyle = rgba(LAV, 0.16 * fk)
      for (let yy = 640; yy < 1340; yy += 24) for (let xx = 60 + ((yy / 24) % 2) * 12; xx < 1020; xx += 24) x.fillRect(xx - 2, yy - 2, 4, 4)
      x.restore()
    }
    const tip = outlinePath(dp)
    x.lineJoin = 'round'; x.lineCap = 'round'
    x.shadowColor = rgba(LAV, 0.8); x.shadowBlur = 16; x.lineWidth = 6; x.strokeStyle = LAV; x.stroke(); x.shadowBlur = 0
    if (tip) drawPixelStar(x, tip.x, tip.y, 30, 0, '#fff3e0')
    x.restore()
  }
  function drawTexas(t, a) {
    const k = ease.outCubic(prog(t, T.tex, T.tex + 0.5))
    if (k <= 0 || a <= 0) return
    const br = 0.85 + 0.15 * Math.sin(t * 2.4)
    x.save(); x.globalAlpha = a
    glow(HUB.x, HUB.y, 260, GOLD, 0.8 * k * br)
    poly(TEXAS); x.fillStyle = rgba(GOLD, 0.55 * k * br); x.fill()
    x.lineJoin = 'round'; x.lineWidth = 5; x.strokeStyle = rgba('#ffe7a8', k); x.stroke()
    x.restore()
    const tk = pop01(t, T.texTag, 0.32, 2.4) * a
    if (tk > 0.01) {
      x.save(); x.translate(HUB.x - 6, HUB.y + 18); x.scale(tk, tk)
      x.font = `700 26px ${MONO}`
      const txt = 'TEXAS ✓', w = x.measureText(txt).width + 30, h = 44
      x.fillStyle = 'rgba(30,18,6,0.85)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 8); x.fill()
      x.lineWidth = 2.5; x.strokeStyle = GOLD; x.stroke()
      x.fillStyle = '#ffe7a8'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
      x.restore()
    }
  }
  function drawLines(t, a) {
    const p = ease.inOutCubic(prog(t, ...T.lines))
    if (p <= 0 || a <= 0) return
    x.save(); x.globalAlpha = a; x.lineCap = 'round'
    for (const C of CITIES) {
      const ex = lerp(HUB.x, C.p.x, p), ey = lerp(HUB.y, C.p.y, p)
      x.setLineDash([2, 14]); x.lineWidth = 6; x.strokeStyle = rgba(GOLD, 0.85)
      x.beginPath(); x.moveTo(HUB.x, HUB.y); x.lineTo(ex, ey); x.stroke()
      if (p < 1) drawPixelStar(x, ex, ey, 22, 0, '#fff3e0')
    }
    x.restore()
  }
  function drawCities(t, a) {
    if (a <= 0) return
    const flare = pop01(t, T.flare, 0.45, 2.2)
    CITIES.forEach((C, i) => {
      const k = pop01(t, T.cities + i * 0.07, 0.3, 2.4)
      if (k <= 0.01) return
      const pu = cityPulse(t, i), tw = 0.5 + 0.5 * Math.sin(t * 3 + i * 1.7)
      const br = 0.45 + 0.1 * tw + 0.55 * pu + 0.6 * flare
      x.save(); x.globalAlpha = a
      glow(C.p.x, C.p.y, 50 + 50 * pu + 90 * flare, GOLD, br)
      if (pu > 0.02) { x.lineWidth = 3; x.strokeStyle = rgba('#fff3e0', pu); x.beginPath(); x.arc(C.p.x, C.p.y, 20 + (1 - pu) * 50, 0, Math.PI * 2); x.stroke() }
      if (flare > 0.02) {                                          // rays
        x.strokeStyle = rgba('#fff3e0', 0.6 * clamp(flare)); x.lineWidth = 4
        for (let r = 0; r < 8; r++) { const th = r * Math.PI / 4 + t * 0.6, r0 = 26, r1 = 26 + 34 * clamp(flare) * (0.8 + 0.2 * Math.sin(t * 6 + r)); x.beginPath(); x.moveTo(C.p.x + Math.cos(th) * r0, C.p.y + Math.sin(th) * r0); x.lineTo(C.p.x + Math.cos(th) * r1, C.p.y + Math.sin(th) * r1); x.stroke() }
      }
      drawPixelStar(x, C.p.x, C.p.y, (26 + 10 * pu + 12 * clamp(flare)) * k, br > 0.9 ? 0 : 1, br > 0.8 ? '#fff3e0' : GOLD)
      x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const lx = clamp(C.p.x + C.lx, 110, 970), ly = C.p.y + C.ly
      x.globalAlpha = a * clamp(k) * (0.75 + 0.25 * Math.max(pu, clamp(flare)))
      x.lineWidth = 6; x.strokeStyle = 'rgba(8,5,20,0.9)'; x.strokeText(C.n, lx, ly)
      x.fillStyle = BONE; x.fillText(C.n, lx, ly)
      x.restore()
    })
  }
  function drawRisers(t) {
    for (const R of RISERS) {
      const p = prog(t, R.t0, R.t0 + T.fly)
      if (p <= 0 || p >= 1) continue
      const C = CITIES[R.c].p, e = ease.inOutQuad(p)
      const px = lerp(R.x0, C.x, e) + Math.sin(Math.PI * e) * R.bend, py = lerp(1960, C.y, e)
      x.save(); x.globalAlpha = 0.5
      for (let s = 1; s <= 5; s++) { const q = Math.max(0, e - s * 0.035); drawPixelStar(x, lerp(R.x0, C.x, q) + Math.sin(Math.PI * q) * R.bend, lerp(1960, C.y, q), 22 - s * 3, 2, R.col) }
      x.restore()
      glow(px, py, 40, R.col, 0.7); drawPixelStar(x, px, py, 32, 0, R.col)
    }
  }
  function drawNarrator(t) {
    const pk = pop01(t, T.starIn, 0.45, 2.2) * popOut(t, T.out)
    if (pk <= 0.02 || t < T.cut) return
    const mood = t < T.flare + 0.2 ? 'wide' : t < T.flare + 1.6 ? 'sparkle' : t % 1.4 < 0.7 ? 'happy' : 'heart'
    glow(540, 1600, 300, GOLD, 0.6 * pk)
    drawStarChar(x, 540, 1600, 260, t, { color: STAR.sky, mood, look: mood === 'wide' ? [0, -1] : [0, 0], hops: [T.starIn + 0.45, T.flare + 0.05, T.flare + 0.6, 12.6, 13.4, 14.2], pop: pk, seed: 4, glow: 1.1 })
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
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

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const a = clamp(popOut(t, T.out))
        drawMap(t, a)
        drawTexas(t, a)
        drawGhostCameo(x, t, { x: PANHANDLE.x, y: PANHANDLE.y, at: T.ghost, dur: 1.4, from: 'below', cell: 3 })
        drawLines(t, a)
        drawCities(t, a)
        drawRisers(t)
        drawNarrator(t)
        sparkles(t, 540, 1600, T.flare, 14, 260, 1)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: CTA }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 1174.66, 0.04, 0.6, 0],
  ['whoosh', T.draw[0], 1.4, 0.03], ['bell', T.tex + 0.1, 1318.51, 0.035, 1.6, 0], ['glitter', T.tex, T.tex + 0.6], ['pop', T.texTag, 880, 0.035, 0],
  ...CITIES.map((_, i) => ['pop', +(T.cities + i * 0.07).toFixed(3), NOTE[i % NOTE.length] * 2, 0.018, (CITIES[i].p.x - 540) / 600]),
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  ...RISERS.filter((_, n) => n % 2 === 0).map((R, n) => ['pop', +(R.t0 + T.fly).toFixed(3), NOTE[(n * 3) % NOTE.length] * 2, 0.012, (CITIES[R.c].p.x - 540) / 700]),
  ...wordPops(T.h1, 2, 0.1, 2, 0.026), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ['glitter', T.wave[0], T.wave[0] + 1.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.1, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.045, 0.7, 0],
  ['whoosh', T.lines[0], 0.8, 0.04], ['pop', T.starIn + 0.1, 739.99, 0.04, 0],
  ['bell', T.flare, 1567.98, 0.04, 1.8, 0], ['bell', T.flare + 0.05, 1174.66, 0.03, 1.8, 0], ['glitter', T.flare, T.flare + 1.0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
