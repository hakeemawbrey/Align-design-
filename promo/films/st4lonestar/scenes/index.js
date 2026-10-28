// st4lonestar (EP 060, 25 s vertical Align ad, Star Talk season 4, thread A: the Texas road trip) · story 0–20.6, then the
// shared end card ("come" + the Align logo, JOIN THE TEXAS BETA).
//   0.00–7.10  "The Lone Star | *State.*"  A generic pixel outline of Texas draws itself in. One gold star sits alone in the
//              middle of it, sighing. On the drop (2.27) it looks around: nobody. Box (THE STARS): "they call it the Lone
//              Star State."  → "let's fix the *lone* part."
//   7.10–14.0  "Every stop, | a *new* star."  The road trip draws on, stop by stop (EP 041–055): Houston, Austin, San Antonio,
//              Fort Worth, Dallas, El Paso, Galveston, Corpus Christi, Lubbock, Marfa. At each one a little sign star pops awake.
//              The lone star goes wide, then sparkly. The ghost peeks out past the east border (10.4).
//  14.2        card cut (flip).
//  14.3–20.5   "No more | *lone* stars."  The route glows into a constellation, every star hops in a wave, the middle star
//              goes heart-eyed, a gold burst. Everything pops out by 20.5.
// Real places only, a plain outline (no flag, no logos). One canvas, DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 25
const EP = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', MINT = '#7dffb0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.9, h0Out: [6.9, 7.1],
  map: [0.35, 2.0], lone: 1.6, look: BEAT(3),                     // 2.27: the drop
  open: 2.9, l1: 3.05, l2: 6.0, close: 13.9,
  h1: 7.15, h1Land: 7.5, h1Out: [13.85, 14.05],
  stops: 7.7, gap: 0.58,                                           // 10 stops → 7.7 … 12.92
  ghost: 10.4,
  cut: 14.2,
  h2: 14.3, h2Land: 14.7, glowUp: 15.0, wave: 16.0, burst: 17.6, h2Out: [20.28, 20.5], out: [20.08, 20.45],
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'they call it the Lone Star State.' },
  { t: T.l2, speaker: NARR, text: 'let’s fix the *lone* part.' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
function bits(x, bm, cx, cy, cell, col, { rot = 0, a = 1 } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  x.fillStyle = col
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── the map: a simplified Texas outline (lon, lat), equirectangular at 31°N, fitted to 900 px wide
const OUTLINE = [[-106.62, 32.0], [-103.06, 32.0], [-103.04, 36.5], [-100.0, 36.5], [-100.0, 34.56], [-99.2, 34.4], [-98.1, 34.1], [-96.9, 33.9], [-95.6, 33.9], [-94.9, 33.75],
  [-94.04, 33.55], [-94.04, 31.0], [-93.6, 30.05], [-93.84, 29.7], [-94.7, 29.45], [-95.6, 28.8], [-96.6, 28.3], [-97.3, 27.6], [-97.4, 26.9], [-97.15, 26.0],
  [-97.5, 25.88], [-98.3, 26.1], [-99.1, 26.5], [-99.5, 27.5], [-100.3, 28.3], [-100.9, 29.4], [-101.7, 29.77], [-102.4, 29.85], [-102.7, 29.6], [-103.15, 28.98],
  [-104.0, 29.4], [-104.6, 29.9], [-104.9, 30.6], [-105.6, 31.1], [-106.2, 31.5], [-106.62, 32.0]]
const LON0 = -106.65, LAT1 = 36.5, KX = 79.9 * Math.cos(31 * Math.PI / 180), KY = 79.9, X0 = 90, Y0 = 540
const P = (lon, lat) => [X0 + (lon - LON0) * KX, Y0 + (LAT1 - lat) * KY]
const POLY = OUTLINE.map(([a, b]) => P(a, b))
const EAST_X = P(-94.04, 32)[0]
// the stops, in road-trip order (EP 041 Houston … EP 054 Marfa), each with the sign star that went there
const STOPS = [
  ['HOUSTON', -95.37, 29.76, null, [0, -1]], ['AUSTIN', -97.74, 30.27, 'aquarius', [0, -1]], ['SAN ANTONIO', -98.49, 29.42, 'pisces', [0, 1]],
  ['FORT WORTH', -97.33, 32.76, 'taurus', [-1, -1]], ['DALLAS', -96.8, 32.78, 'leo', [1, -1]], ['EL PASO', -106.49, 31.76, null, [1, -1]],
  ['GALVESTON', -94.8, 29.3, 'cancer', [1, 1]], ['CORPUS CHRISTI', -97.4, 27.8, 'gemini', [0, 1]], ['LUBBOCK', -101.86, 33.58, 'capricorn', [0, -1]],
  ['MARFA', -104.02, 30.31, 'aries', [0, 1]],
].map(([name, lon, lat, id, lab], i) => {
  const [x, y] = P(lon, lat)
  return { name, x, y, col: id ? signStar(id).color : i === 5 ? BONE : STAR.sky, lab, t: T.stops + i * T.gap, seed: 20 + i * 3 }
})
const LONE = (() => { const [x, y] = P(-100.6, 31.55); return { x, y, s: 196 } })()
const CELL = 12

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 104px Inter", "italic 500 168px 'EB Garamond'", "700 52px 'Space Mono'", "700 22px 'Space Mono'", "700 20px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The Lone Star | *State.*', { top: 196, size: 112, accentSize: 168, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: GOLD })
  const H1 = popText(root, 'Every stop, | a *new* star.', { top: 196, size: 104, accentSize: 160, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, gap: 0.09, accentColor: MINT })
  const H2 = popText(root, 'No more | *lone* stars.', { top: 196, size: 112, accentSize: 168, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, gap: 0.1, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1520, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // rasterize the outline once into cells: inside / edge
  const inside = (px, py) => {
    let c = false
    for (let i = 0, j = POLY.length - 1; i < POLY.length; j = i++) {
      const [xi, yi] = POLY[i], [xj, yj] = POLY[j]
      if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) c = !c
    }
    return c
  }
  const CELLS = []
  {
    const xs = POLY.map(p => p[0]), ys = POLY.map(p => p[1])
    const i0 = Math.floor(Math.min(...xs) / CELL), i1 = Math.ceil(Math.max(...xs) / CELL), j0 = Math.floor(Math.min(...ys) / CELL), j1 = Math.ceil(Math.max(...ys) / CELL)
    const IN = (i, j) => inside(i * CELL + CELL / 2, j * CELL + CELL / 2)
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      if (!IN(i, j)) continue
      const edge = !IN(i + 1, j) || !IN(i - 1, j) || !IN(i, j + 1) || !IN(i, j - 1)
      CELLS.push({ x: i * CELL, y: j * CELL, edge, d: Math.hypot(i * CELL - LONE.x, j * CELL - LONE.y), n: (i * 7 + j * 13) % 5 })
    }
  }
  const DMAX = Math.max(...CELLS.map(c => c.d))

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  function drawMap(t, fade) {
    const R = lerp(0, DMAX + 40, ease.inOutCubic(prog(t, ...T.map)))
    const warm = ease.inOutQuad(prog(t, T.glowUp, T.glowUp + 1.2))
    x.save(); x.globalAlpha = fade
    for (const c of CELLS) {
      if (c.d > R) continue
      const k = clamp((R - c.d) / 60)
      if (c.edge) { x.fillStyle = rgba(warm > 0.5 ? '#ffe3a0' : BONE, (0.55 + 0.35 * k) * (0.85 + 0.15 * Math.sin(t * 2 + c.n))); x.fillRect(c.x + 1, c.y + 1, CELL - 2, CELL - 2) }
      else { x.fillStyle = `rgba(${lerp(60, 90, warm) | 0},${lerp(40, 60, warm) | 0},${lerp(110, 90, warm) | 0},${0.32 * k + (c.n === 0 ? 0.08 : 0)})`; x.fillRect(c.x, c.y, CELL, CELL) }
    }
    x.restore()
  }

  // the route: a dotted line from stop to stop that draws on as the trip goes
  function drawRoute(t, fade) {
    const warm = ease.inOutQuad(prog(t, T.glowUp, T.glowUp + 1.0))
    x.save(); x.globalAlpha = fade
    for (let i = 1; i < STOPS.length; i++) {
      const A = STOPS[i - 1], B = STOPS[i]
      const p = ease.inOutQuad(prog(t, B.t - T.gap + 0.12, B.t))
      if (p <= 0) continue
      const len = Math.hypot(B.x - A.x, B.y - A.y), n = Math.max(2, Math.floor(len / 18))
      for (let k = 0; k <= n * p; k++) {
        const u = k / n, bow = Math.sin(Math.PI * u) * Math.min(60, len * 0.12)
        const nx = -(B.y - A.y) / len, ny = (B.x - A.x) / len
        const px = lerp(A.x, B.x, u) + nx * bow, py = lerp(A.y, B.y, u) + ny * bow
        const s = warm > 0 ? 6 + 2 * warm : 5
        x.fillStyle = warm > 0 ? rgba(GOLD, 0.5 + 0.5 * warm * (0.7 + 0.3 * Math.sin(t * 5 - k * 0.4 - i))) : rgba(BONE, 0.55)
        x.fillRect(px - s / 2, py - s / 2, s, s)
      }
    }
    x.restore()
  }

  function drawStops(t, fade) {
    STOPS.forEach((s, i) => {
      const k = pop01(t, s.t, 0.34, 2.4) * popOut(t, T.out)
      if (k <= 0.02) return
      const beat3 = t >= T.cut
      const sz = lerp(70, 92, ease.inOutCubic(prog(t, T.glowUp, T.glowUp + 0.6)))
      const hops = [s.t + 0.2, T.wave + i * 0.12, T.wave + 1.4 + i * 0.12, T.burst + 0.1, 19.0 + (i % 3) * 0.1]
      const mood = beat3 ? (t > T.burst ? 'heart' : i % 2 ? 'happy' : 'sparkle') : t < s.t + 0.5 ? 'wide' : 'happy'
      glow(s.x, s.y, 90, s.col, 0.7 * k)
      drawStarChar(x, s.x, s.y - 6, sz, t, { color: s.col, mood, look: [Math.sign(LONE.x - s.x), Math.sign(LONE.y - s.y) * (Math.abs(LONE.y - s.y) > 120 ? 1 : 0)], hops, seed: s.seed, pop: k, glow: 0.8, tips: false, zzz: false })
      // the label
      const lk = clamp(prog(t, s.t + 0.1, s.t + 0.35)) * popOut(t, T.out) * (beat3 ? 1 - 0.35 * ease.inOutQuad(prog(t, T.glowUp, T.glowUp + 0.6)) : 1)
      if (lk > 0.01) {
        x.save(); x.globalAlpha = lk
        x.font = `700 21px ${MONO}`; x.textBaseline = 'middle'; x.letterSpacing = '0.08em'
        const [lx, ly] = s.lab
        x.textAlign = lx < 0 ? 'right' : lx > 0 ? 'left' : 'center'
        const tx = s.x + lx * 46, ty = s.y + ly * 54
        x.lineWidth = 6; x.strokeStyle = 'rgba(8,5,20,0.9)'; x.strokeText(s.name, tx, ty)
        x.fillStyle = BONE; x.fillText(s.name, tx, ty)
        x.restore()
      }
    })
  }

  function loneState(t) {
    if (t < T.look) return { mood: 'sleepy', look: [0, 1] }
    if (t < T.look + 0.6) return { mood: 'wide', look: [-1, 0], blink: false }
    if (t < T.l1) return { mood: 'neutral', look: [1, 0] }
    if (t < T.l2) return { mood: 'neutral', look: [0, 1] }                         // alone, looking down
    if (t < T.stops) return { mood: 'squint', look: [0, 0] }
    if (t < T.stops + 1.8) return { mood: 'wide', look: [1, 1], blink: false }
    if (t < T.cut) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.burst) return { mood: 'happy', look: [0, 0] }
    return { mood: 'heart', look: [0, 0] }
  }
  function drawLone(t) {
    const k = pop01(t, T.lone, 0.4, 2) * popOut(t, T.out)
    if (k <= 0.02) return
    // a lonely sigh: sinks a little after the look-around
    const sink = t > T.look + 0.6 && t < T.stops ? 0.06 * ease.outCubic(prog(t, T.look + 0.6, T.look + 1.2)) : 0
    const hops = [T.stops + 0.05, T.stops + 1.2, T.cut + 0.2, T.wave - 0.15, T.wave + 1.25, T.burst, 18.6, 19.4]
    const s = lerp(LONE.s, LONE.s * 1.12, ease.inOutCubic(prog(t, T.cut, T.cut + 0.5)))
    glow(LONE.x, LONE.y, 220, GOLD, (t >= T.cut ? 1.1 : 0.55) * k)
    drawStarChar(x, LONE.x, LONE.y, s, t, { color: STAR.sky, ...loneState(t), hops, seed: 2, pop: k, glow: 1.2, squash: sink })
    // in the last beat, a faint line from every stop to the middle star: nobody's alone
    if (t > T.glowUp) {
      const a = ease.inOutQuad(prog(t, T.glowUp, T.glowUp + 1.0)) * popOut(t, T.out) * 0.35
      x.save(); x.globalAlpha = a; x.strokeStyle = GOLD; x.lineWidth = 3; x.setLineDash([6, 10]); x.lineDashOffset = -t * 30
      for (const st of STOPS) { x.beginPath(); x.moveTo(st.x, st.y); x.lineTo(LONE.x, LONE.y); x.stroke() }
      x.restore()
    }
  }

  function floatHearts(t, cx, cy, t0, t1, spread = 300) {
    for (let i = 0; i < 10; i++) {
      const born = t0 + i * 0.22, life = 1.3
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 9) / 8 - 0.5
      bits(x, HEART, cx + side * spread + Math.sin(p * 7 + i) * 14, cy - p * 260, 5 + (i % 3), [PINK, '#ff4f86', GOLD][i % 3], { a: Math.sin(Math.PI * p) })
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV], dur = 0.7, sz = 26) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.4 + 0.8 * p), cy + Math.sin(a) * R * (0.4 + 0.8 * p), sz * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const fade = 1 - ease.inOutQuad(prog(t, T.out[0] + 0.1, T.out[1] + 0.1))
      drawMap(t, fade)
      drawGhostCameo(x, t, { x: EAST_X + CELL, y: P(-94.04, 32.3)[1], at: T.ghost, dur: 1.4, from: 'left', cell: 3 })
      drawRoute(t, fade)
      drawLone(t)
      drawStops(t, fade)
      for (const s of STOPS) sparkles(t, s.x, s.y, s.t, 8, 70, s.seed, [s.col, BONE, GOLD])
      sparkles(t, LONE.x, LONE.y, T.burst, 18, 420, 1, [GOLD, BONE, PINK, MINT, LAV], 1.0, 34)
      if (t > T.burst) floatHearts(t, LONE.x, LONE.y - 120, T.burst, 19.6, 320)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 7.1 (inert: the headline swaps), 14.2 (box shut → the last line, the one that plays).
const CUTS = [7.1, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['whoosh', T.map[0], 1.4, 0.03], ['glitter', T.map[0] + 0.3, T.map[1]],
  ['bell', T.lone + 0.05, 1567.98, 0.03, 1.6, 0], ['pop', T.look, 523.25, 0.03, -0.3], ['pop', T.look + 0.25, 523.25, 0.03, 0.3],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  // the road trip: a chime per stop, climbing
  ...wordPops(T.h1, 2, 0.09, 2, 0.026), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ...STOPS.flatMap((s, i) => [['pop', +(s.t + 0.05).toFixed(3), NOTE[i % 7] * (i >= 7 ? 2 : 1), 0.035, +((s.x / W - 0.5) * 1.2).toFixed(2)], ['bell', +(s.t + 0.08).toFixed(3), NOTE[(i + 2) % 7] * 2, 0.016, 0.9, +((s.x / W - 0.5) * 1.2).toFixed(2)]]),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // no more lone stars
  ...wordPops(T.h2, 2, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pop', T.h2Land + 0.14, 1318.51, 0.045, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0],
  ['glitter', T.glowUp, T.glowUp + 1.0], ['whoosh', T.glowUp, 0.8, 0.025],
  ...STOPS.map((s, i) => ['pop', +(T.wave + i * 0.12).toFixed(3), NOTE[i % 7], 0.022, +((s.x / W - 0.5) * 1.2).toFixed(2)]),
  ['boom', T.burst, 0.14], ['bell', T.burst + 0.02, 1760, 0.035, 1.6, 0], ['glitter', T.burst, T.burst + 0.9],
  ['pluck', 19.0, 1318.51, 0.035, 0.5, -0.2], ['bell', 19.05, 1567.98, 0.022, 1.0, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
