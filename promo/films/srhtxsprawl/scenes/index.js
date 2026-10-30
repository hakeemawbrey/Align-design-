// srhtxsprawl (30 s vertical, Star Talk Remix of htxsprawl "Houston is huge.") · story 0–25.6, then the shared end
// card. THE STARS (gold) look down at the city with you, try to search it on foot, give up, and then do it their way.
//   0.00–5.10  "Houston is | *huge.*"  the map grows tile by tile round a little YOU pin; 610, Beltway 8 and the Grand
//              Parkway draw on, neighbourhood chips pop; on the drop the camera zooms way out and the pin is a speck.
//              The star hovers over it all. Box: "see that tiny dot? *that's you.*"
//   5.15–11.0  "So how do you find | *your* person | in all this?"  the star takes a magnifying glass to the sprawl: KATY?
//              PEARLAND? THE WOODLANDS? each lens a crowd of identical little people and a "?". It gets squintier and
//              sweatier, then flops. Box: "searching on foot? babe. *look up.*"
//   11.10 cut → "We read | your *sky.*"  the map sinks and dims; its lights float up and become tiny stars that blink
//              awake. Two of them glow: ♉ (yours) and ♍ (theirs), far apart, and their charts bloom.
//              Box: "every light down there has a *sky* up here."
//   15.45      "…and find who | *lines up* | with it."  a gold arc launches from ♉ across the sky and lands on ♍:
//              TRINE · 120°, both go heart-eyed. Box: "earth meets earth. *that's a trine.*"
//   20.90 cut → "Somewhere out there, | *someone's sky* | lines up with yours."  the pair floats in, linked by gold;
//              the star between them goes heart-eyed then winks; Pisces cries. Box: "same city. same sky. *look up.*"
//              Everything out by 25.45.
// One canvas (sky + map + stars), DOM type + the dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, LAV, BLUE, ROSE, INK, MONO, rgba, ink, sparkle, starFrame, inSprite, tearsCells, sweatCells, mini, lens, chip, pin } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const BEAT = n => 0.6 + n * 0.5556
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3)
const TAUR = signStar('taurus'), VIRG = signStar('virgo'), PIS = signStar('pisces')

// ── the timeline
const T = {
  h0: 0.12, huge: BEAT(1), h0Out: [4.85, 5.05], drop: BEAT(4), guideIn: 1.0, open: 2.3, sub: BEAT(4) + 0.15,
  rings: [0.9, 3.05, 3.6], inner: [1.3, 1.5, 1.7, 1.9], outer: [3.5, 3.7, 3.9, 4.1, 4.3, 4.5, 4.7],
  h1: 5.15, h1Your: BEAT(9), h1End: BEAT(10), h1Out: [10.75, 10.95],
  lensIn: [5.5, BEAT(10)], stops: [BEAT(10), BEAT(12), BEAT(14)], flop: BEAT(15.5), lensOut: [10.2, 10.85], chipsOut: [5.2, 5.6],
  cut1: 11.1,
  h2: 11.16, h2Sky: BEAT(19.5), h2Out: [15.15, 15.35], sink: [11.0, 12.4], rise: [11.25, 13.1], wake: BEAT(22), hero: [BEAT(22.5), BEAT(23.5)],
  h3: 15.45, h3Up: BEAT(27), h3Out: [20.55, 20.8], arc: [BEAT(28.5), BEAT(30.5)], heart: BEAT(30.5),
  cut2: 20.9,
  h4: 20.95, h4Sky: BEAT(37.5), h4End: BEAT(38.5), wink: [24.0, 24.45], pisIn: 21.6, out: [25.05, 25.45], h4Out: [25.15, 25.42],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: 2.5, speaker: SPEAK, text: "see that tiny dot? *that's you.*" },
  { t: 8.45, speaker: SPEAK, text: 'searching on foot? babe. *look up.*' },
  { t: 12.45, speaker: SPEAK, text: 'every light down there has a *sky* up here.' },
  { t: 17.55, speaker: SPEAK, text: "earth meets earth. *that's a trine.*" },
  { t: 21.9, speaker: SPEAK, text: 'same city. same sky. *look up.*' },
]
const CPS = 30
const HOPS = [T.guideIn + 0.35, ...talkHops(LINES, SPEAK, { cps: CPS }), ...T.stops.map(s => s + 0.05), T.heart + 0.1]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── the map: tile units around YOU (0, 0), drawn at screen (540, CY + sink) with z px per tile
const CY = 1060
const camZ = t => {
  if (t < 2.75) return lerp(150, 112, ease.inOutQuad(prog(t, 0.2, 2.75)))
  return Math.exp(lerp(Math.log(112), Math.log(33), ease.inOutCubic(prog(t, 2.75, 4.9))))
}
const RAD = t => 0.6 + 2.9 * ease.outCubic(prog(t, 0.15, 2.6)) + 13.5 * ease.inOutCubic(prog(t, 2.75, 4.9))
const TILES = (() => {
  const r = rng(29), out = []
  for (let j = -18; j <= 18; j++) for (let i = -16; i <= 16; i++) {
    const d = Math.hypot(i, j) + (i || j ? r() * 0.9 : 0)
    let tA = 99
    for (let s = 0; s <= 1250; s++) { const tt = s / 250; if (RAD(tt) >= d) { tA = tt; break } }
    if (tA > 50) continue
    const kind = r() < 0.18 ? 'tower' : r() < 0.12 ? 'park' : 'houses'
    out.push({ i, j, tA, kind, tint: r(), lc: r() < 0.7 ? '#ffd98a' : r() < 0.6 ? BLUE : PINK, ldx: (r() - 0.5) * 0.6, ldy: (r() - 0.5) * 0.6,
      up: r(), drift: r() - 0.5, kind2: Math.floor(r() * 3), sz: r(), d })
  }
  return out
})()
// sky positions for the risen lights (screen), and which of them wake up with eyes
const RISEN = TILES.filter(tl => tl.d < 13 && (tl.i * 7 + tl.j * 3) % 4 === 0)
const EYED = [[120, 560, 70, 1], [960, 640, 64, 2], [420, 1040, 58, 3], [700, 520, 60, 4], [150, 1180, 66, 5], [950, 980, 62, 6], [560, 760, 54, 7], [60, 880, 56, 8], [1010, 1250, 52, 9], [640, 1320, 56, 10]]
const RINGS = [{ r: 2.6, col: GOLD, label: '610' }, { r: 6.3, col: BLUE, label: 'BELTWAY 8' }, { r: 11.3, col: ROSE, label: 'GRAND PKWY' }]
const INNER = [['THE HEIGHTS', -1.2, -2.0], ['EADO', 1.9, 0.4], ['MONTROSE', -1.8, 1.2], ['MIDTOWN', 0.4, 1.5]]
const OUTER = [['KATY', -9.6, -0.6], ['THE WOODLANDS', -0.6, -8.2], ['SUGAR LAND', -6.6, 4.6], ['KINGWOOD', 6.2, -6.4], ['PEARLAND', 1.6, 6.6], ['CYPRESS', -7.4, -5.0], ['CLEAR LAKE', 7.4, 5.4]]
// the lens stops (screen, at z = 33): Katy, Pearland, the Woodlands
const STOPS = [{ x: 540 - 9.6 * 33, y: CY - 0.6 * 33, label: 'KATY?' }, { x: 540 + 1.6 * 33, y: CY + 6.6 * 33, label: 'PEARLAND?' }, { x: 540 - 0.6 * 33, y: CY - 8.2 * 33, label: 'THE WOODLANDS?' }]
const LENS_R = 138, LENS_IN = { x: 1300, y: 1300 }, LENS_OUT = { x: 1350, y: 500 }
// the sky pair
const A3 = { x: 285, y: 790 }, B3 = { x: 800, y: 1170 }, A5 = { x: 290, y: 930 }, B5 = { x: 790, y: 930 }
const ARC_C = { x: 860, y: 620 }

function guideState(t) {
  if (t < T.drop) return { mood: 'squint', look: [-1, 1] }
  if (t < T.h1) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.stops[0]) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.stops[1]) return { mood: 'squint', look: [-1, 1] }
  if (t < T.stops[2]) return { mood: 'squint', look: [-1, 1], blink: false }
  if (t < T.flop) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.cut1) return { mood: 'sleepy', zzz: false }
  if (t < T.hero[0]) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.heart) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.cut2) return { mood: 'heart' }
  if (t < T.wink[0]) return { mood: 'heart' }
  if (t < T.wink[1]) return { mood: 'wink' }
  return { mood: 'happy' }
}
function lensPos(t) {
  const legs = [[LENS_IN, STOPS[0], ...T.lensIn], [STOPS[0], STOPS[1], T.stops[0] + 0.45, T.stops[1]], [STOPS[1], STOPS[2], T.stops[1] + 0.45, T.stops[2]], [STOPS[2], LENS_OUT, ...T.lensOut]]
  for (const [a, b, t0, t1] of legs) if (t <= t1) { const p = ease.inOutCubic(prog(t, t0, t1)); return { x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p) - Math.sin(Math.PI * p) * 80 } }
  return LENS_OUT
}
const G1 = { x: 870, y: 640, size: 210 }, G3 = { x: 170, y: 1320, size: 200 }, G5 = { x: 540, y: 1180, size: 230 }
function guidePos(t) {
  if (t < T.lensIn[0]) return G1
  if (t < T.cut1) {
    const L = lensPos(t), on = { x: L.x + 150, y: L.y - 170, size: 190 }
    const k = ease.inOutCubic(prog(t, T.lensIn[0], T.lensIn[1]))
    const fl = prog(t, T.flop, T.flop + 0.5)
    const p = { x: lerp(G1.x, on.x, k), y: lerp(G1.y, on.y, k), size: lerp(G1.size, 190, k) }
    if (t >= T.flop) { const s = STOPS[2]; return { x: lerp(s.x + 150, 820, ease.inOutCubic(fl)), y: lerp(s.y - 170, 1250, ease.inQuad(fl)) - Math.sin(Math.PI * fl) * 140, size: 190 } }
    return p
  }
  if (t < T.cut2) return G3
  return G5
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston is | *huge.*', { top: 170, size: 124, accentSize: 250, at: T.h0, gap: 0.1, late: 1, lateAt: T.huge, wobble: true, accentColor: PINK, lineHeight: 0.95 })
  const S0 = popText(root, 'It just keeps *going.*', { top: 1300, size: 66, accentSize: 84, at: T.sub, gap: 0.1, accentColor: GOLD })
  const H1 = popText(root, 'So how do you find | *your* person | in all this?', { top: 170, size: 88, accentSize: 128, at: T.h1, gap: 0.07, accentColor: GOLD, lineHeight: 1.02 })
  const H2 = popText(root, 'We read | your *sky.*', { top: 170, size: 124, accentSize: 190, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Sky, wobble: true, accentColor: BLUE, lineHeight: 0.98 })
  const H3 = popText(root, '…and find who | *lines up* | with it.', { top: 170, size: 100, accentSize: 150, at: T.h3, gap: 0.08, late: 4, lateAt: T.h3Up, lateGap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H4 = popText(root, 'Somewhere out there, | *someone’s sky* | lines up with yours.', { top: 170, size: 78, accentSize: 132, at: T.h4, gap: 0.07, late: 6, lateAt: T.h4Sky, lateGap: 0.1, wobble: true, accentColor: PINK, lineHeight: 1.05 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: 24.95, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const sinkY = t => 620 * ease.inOutCubic(prog(t, ...T.sink))
  const scr = (t, i, j) => { const z = camZ(t); return { x: 540 + i * z, y: CY + sinkY(t) + j * z, z } }

  function drawMap(t, a) {
    if (a <= 0.01) return
    const z = camZ(t)
    x.save(); x.globalAlpha *= a
    // tiles
    for (const tl of TILES) {
      if (t < tl.tA) continue
      const P = scr(t, tl.i, tl.j)
      if (P.x < -z || P.x > 1080 + z || P.y < -z || P.y > 1920 + z) continue
      const k = easeOutBack(prog(t, tl.tA, tl.tA + 0.3), 2) * 0.82 * z
      if (k <= 0.5) continue
      if (tl.kind === 'park') { x.fillStyle = rgba('#5fbf8a', 0.22); x.beginPath(); x.roundRect(P.x - k / 2, P.y - k / 2, k, k, k * 0.3); x.fill(); continue }
      x.fillStyle = rgba(LAV, 0.1 + 0.08 * tl.tint); x.strokeStyle = rgba(LAV, 0.32); x.lineWidth = Math.max(1, z * 0.025)
      x.beginPath(); x.roundRect(P.x - k / 2, P.y - k / 2, k, k, k * 0.12); x.fill(); x.stroke()
      if (z > 60) {
        // little roofs / windows when close
        x.fillStyle = rgba(BONE, 0.28)
        if (tl.kind === 'tower') for (let a2 = 0; a2 < 3; a2++) for (let b = 0; b < 2; b++) x.fillRect(P.x - k * 0.2 + b * k * 0.28, P.y - k * 0.3 + a2 * k * 0.22, k * 0.12, k * 0.1)
        else for (let b = 0; b < 2; b++) { x.beginPath(); const hx = P.x - k * 0.2 + b * k * 0.4, hy = P.y + k * 0.05; x.moveTo(hx - k * 0.13, hy); x.lineTo(hx, hy - k * 0.16); x.lineTo(hx + k * 0.13, hy); x.closePath(); x.fill() }
      }
      // the light (these float up later)
      if (t < T.rise[0] || !RISEN.includes(tl)) {
        const tw = 0.6 + 0.4 * Math.sin(t * 3 + tl.up * 9)
        x.fillStyle = rgba(tl.lc, 0.85 * tw); const ls = Math.max(3, z * 0.09)
        x.fillRect(P.x + tl.ldx * z - ls / 2, P.y + tl.ldy * z - ls / 2, ls, ls)
      }
    }
    // ring roads
    RINGS.forEach((R, n) => {
      const p = ease.inOutCubic(prog(t, T.rings[n], T.rings[n] + 0.8))
      if (p <= 0) return
      const c = scr(t, 0, 0)
      x.beginPath(); x.arc(c.x, c.y, R.r * z, -Math.PI / 2, -Math.PI / 2 + TAU * p)
      ink(x, R.col, { w: Math.max(4, z * 0.1), fa: 0, glow: 16 })
      if (p > 0.6) { const ang = -0.75 + n * 1.6, lx = c.x + Math.cos(ang) * R.r * z, ly = c.y + Math.sin(ang) * R.r * z; chip(x, lx, ly, R.label, pop01(t, T.rings[n] + 0.5, 0.3), { size: 22, edge: R.col, col: R.col }) }
    })
    // highways (radials)
    x.save(); x.globalAlpha *= 0.4 * clamp(t - 0.5)
    for (let n = 0; n < 6; n++) {
      const ang = n * TAU / 6 + 0.3, c = scr(t, 0, 0), L = RAD(t) * z
      x.beginPath(); x.moveTo(c.x + Math.cos(ang) * z * 0.6, c.y + Math.sin(ang) * z * 0.6); x.lineTo(c.x + Math.cos(ang) * L, c.y + Math.sin(ang) * L); x.strokeStyle = BONE; x.lineWidth = Math.max(2, z * 0.04); x.stroke()
    }
    x.restore()
    x.restore()
  }
  function drawChips(t, a) {
    if (a <= 0.01) return
    INNER.forEach(([lb, i, j], n) => { const P = scr(t, i, j); chip(x, P.x, P.y, lb, pop01(t, T.inner[n], 0.3) * outK(t, [3.0, 3.3]), { size: 24, a }) })
    OUTER.forEach(([lb, i, j], n) => { const P = scr(t, i, j); chip(x, P.x, P.y, lb, pop01(t, T.outer[n], 0.3), { size: 24, a, edge: ROSE }) })
  }

  function drawGuide(t, ok) {
    const pp = pop01(t, T.guideIn, 0.38, 2.2) * ok
    if (pp <= 0.02) return null
    const P = guidePos(t), st = guideState(t)
    let squash = 0
    if (t >= T.flop + 0.5 && t < T.flop + 1.0) squash = 0.3 * Math.exp(-(t - T.flop - 0.5) * 7) * Math.cos((t - T.flop - 0.5) * 20)
    const opts = { hops: t >= T.lensIn[0] && t < T.cut1 ? T.stops.map(s => s + 0.05) : HOPS, seed: 3, pop: pp, squash }
    const r = drawStarChar(x, P.x, P.y, P.size, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, zzz: st.zzz, glow: 1.1, ...opts })
    if (t >= T.stops[1] && t < T.cut1) inSprite(x, starFrame(P.x, P.y, P.size, t, opts), () => sweatCells(x, t))
    // dizzy stars after the flop
    if (t >= T.flop + 0.5 && t < T.cut1) for (let i = 0; i < 3; i++) { const ang = t * 7 + i * 2.09; drawPixelStar(x, r.x + Math.cos(ang) * 100, r.y - 120 + Math.sin(ang) * 22, 22, 2, i % 2 ? GOLD : BONE) }
    return r
  }

  function drawLens(t) {
    if (t < T.lensIn[0] || t > T.lensOut[1]) return
    const L = lensPos(t)
    let si = -1
    T.stops.forEach((s, i) => { if (t >= s - 0.05) si = i })
    const settle = si >= 0 ? prog(t, T.stops[si], T.stops[si] + 0.3) * (si < 2 ? 1 - prog(t, T.stops[si] + 0.35, T.stops[si] + 0.55) : 1 - prog(t, T.lensOut[0], T.lensOut[0] + 0.2)) : 0
    lens(x, L.x, L.y, LENS_R, -0.75, 1, (cx, cy, R) => {
      if (settle <= 0.01) return
      const cols = [[LAV, BLUE, ROSE], [GOLD, LAV, BLUE], [ROSE, GOLD, LAV]][si]
      for (let row = 0; row < 2; row++) for (let c = 0; c < 4 - row; c++) {
        const px = cx - 90 + c * 60 + row * 30, py = cy + 20 + row * 70
        mini(x, px, py, 0.62, cols[(c + row) % 3], settle)
      }
      // the "?"
      x.save(); x.globalAlpha *= settle; x.font = "800 86px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = GOLD; x.shadowColor = GOLD; x.shadowBlur = 16; x.fillText('?', cx, cy - 72 - 10 * Math.sin(t * 6)); x.restore()
    })
    if (si >= 0) chip(x, L.x, L.y + LENS_R + 44, STOPS[si].label, settle, { size: 28, col: GOLD, edge: GOLD })
  }

  // the arc ♉ → ♍ (quadratic), drawn up to p
  const qp = (a, c, b, u) => ({ x: (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * c.x + u * u * b.x, y: (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * c.y + u * u * b.y })
  function drawArc(t, A, B, C, p, a) {
    if (p <= 0 || a <= 0) return
    x.save(); x.globalAlpha *= a
    x.beginPath()
    for (let i = 0; i <= 60; i++) { const u = (i / 60) * p, P = qp(A, C, B, u); i ? x.lineTo(P.x, P.y) : x.moveTo(P.x, P.y) }
    ink(x, GOLD, { w: 9, fa: 0, glow: 26 })
    // a comet head while it flies; light pulses once it lands
    if (p < 1) { const H = qp(A, C, B, p); drawPixelStar(x, H.x, H.y, 40, 1, '#fff3e0') }
    else for (let k = 0; k < 3; k++) { const u = ((t * 0.45 + k / 3) % 1), P = qp(A, C, B, u); drawPixelStar(x, P.x, P.y, 24, 2, '#fff3e0') }
    x.restore()
  }
  function miniChart(cx, cy, k, a) {
    if (k <= 0.01 || a <= 0) return
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(0.42 * k, 0.42 * k); x.rotate((1 - k) * -0.6)
    drawWheelH(x, { k: 1, glyphK: 1, W: { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.85 } })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      // ── the city (beats 1–2), sinking and dimming under the sky (beats 3–4)
      if (t < T.cut2) {
        const dim = lerp(1, 0.32, ease.inOutCubic(prog(t, ...T.sink)))
        drawMap(t, dim)
        drawChips(t, outK(t, T.chipsOut))
        if (t < T.sink[1]) { const c = scr(t, 0, 0); pin(x, c.x, c.y, 24, GOLD, pop01(t, 0.3, 0.4) * outK(t, [T.cut1 - 0.2, T.cut1])); chip(x, c.x, c.y + 36, 'YOU', pop01(t, 0.5, 0.3) * outK(t, [T.drop + 0.3, T.drop + 0.6]), { size: 24, col: GOLD, edge: GOLD }) }
      }
      // ── the lights rise and become stars (from beat 3 on)
      if (t >= T.rise[0]) {
        const fade = t < T.cut2 ? 1 : ok
        RISEN.forEach((tl, n) => {
          const t0 = T.rise[0] + tl.up * 0.9, p = ease.inOutCubic(prog(t, t0, t0 + 1.0))
          const from = { x: 540 + tl.i * 33, y: CY + tl.j * 33 + sinkY(t) }
          const to = { x: clamp(540 + tl.i * 40 + tl.drift * 60, 40, 1040), y: 540 + ((tl.up * 997 + n * 131) % 860) }
          const px = lerp(from.x, to.x, p), py = lerp(from.y, to.y, p) + Math.sin(t * 1.3 + n) * 6
          x.save(); x.globalAlpha *= fade * (0.55 + 0.45 * Math.sin(t * 2.4 + n * 1.7) ** 2)
          drawPixelStar(x, px, py, 14 + 14 * tl.sz, tl.kind2, tl.lc); x.restore()
        })
        // ten of them blink awake and look at you
        EYED.forEach(([ex, ey, es, sd], n) => {
          const t0 = T.rise[0] + 0.4 + n * 0.12, p = ease.outCubic(prog(t, t0, t0 + 1.1))
          if (p <= 0) return
          const wake = prog(t, T.wake + n * 0.07, T.wake + n * 0.07 + 0.3)
          const mood = t < T.heart ? (wake > 0.9 ? 'wide' : 'sleepy') : 'heart'
          drawStarChar(x, ex, lerp(1500, ey, p), es, t, { color: n % 3 === 0 ? '#ffd98a' : n % 3 === 1 ? '#bfe6ff' : '#ffc4dc', mood, zzz: false, look: [ex < 540 ? 1 : -1, 1], blink: wake < 1 ? 1 - wake : undefined, seed: sd, glow: 0.8, alpha: fade * clamp(p * 2), tips: false })
        })
      }
      // ── the pair: ♉ (yours) and ♍ (theirs), their charts, the arc
      if (t >= T.hero[0] - 0.05) {
        const m = ease.inOutCubic(prog(t, T.cut2, T.cut2 + 1.2))
        const A = { x: lerp(A3.x, A5.x, m), y: lerp(A3.y, A5.y, m) }, B = { x: lerp(B3.x, B5.x, m), y: lerp(B3.y, B5.y, m) }
        const C = { x: lerp(ARC_C.x, 540, m), y: lerp(ARC_C.y, 760, m) }
        const fade = t < T.cut2 ? 1 : ok
        const chartA = t < T.cut2 ? 1 : 1 - prog(t, T.cut2, T.cut2 + 0.6)
        miniChart(A.x, A.y, pop01(t, T.hero[0], 0.6, 1.6), chartA * fade)
        miniChart(B.x, B.y, pop01(t, T.hero[1], 0.6, 1.6), chartA * fade)
        drawArc(t, A, B, C, t >= T.cut2 ? 1 : ease.inOutCubic(prog(t, ...T.arc)), fade)
        const heart = t >= T.heart
        const hk = [T.heart + 0.05, T.heart + 0.62, T.wink[0]]
        drawStarChar(x, A.x, A.y, 150, t, { ...TAUR, mood: heart ? 'heart' : 'sparkle', look: [1, 1], pop: pop01(t, T.hero[0], 0.4, 2.2) * fade, hops: hk, seed: 11, glow: 1.2 })
        drawStarChar(x, B.x, B.y, 150, t, { ...VIRG, mood: heart ? 'heart' : t >= T.arc[0] ? 'wide' : 'neutral', look: [-1, -1], blink: t >= T.arc[0] && !heart ? false : undefined, pop: pop01(t, T.hero[1], 0.4, 2.2) * fade, hops: hk, seed: 12, glow: 1.2 })
        if (t < T.cut2) {
          sparkle(x, B.x, B.y, t, T.heart, { n: 16, R: 260, seed: 9, size: 30, cols: [GOLD, '#ffd98a', PINK, '#fff3e0'] })
          const mid = qp(A, C, B, 0.5)
          chip(x, mid.x - 20, mid.y + 70, 'TRINE · 120°', pop01(t, T.heart + 0.2, 0.35) * outK(t, [20.5, 20.75]), { size: 28, col: GOLD, edge: GOLD })
        }
      }
      // ── Pisces (beat 5): happy fountains
      if (t >= T.cut2) {
        const pp = pop01(t, T.pisIn, 0.36, 2.1) * ok
        if (pp > 0.02) {
          const opts = { hops: [T.pisIn + 0.3, T.wink[0] + 0.1], seed: 6, pop: pp, squash: 0.04 * Math.max(0, Math.sin(t * 15)) }
          drawStarChar(x, 960, 1270, 130, t, { ...PIS, glyph: null, mood: 'happy', glow: 0.9, ...opts })
          inSprite(x, starFrame(960, 1270, 130, t, opts), () => tearsCells(x, t, 3))
        }
      }
      drawLens(t)
      drawGuide(t, t < T.cut2 ? 1 : ok)

      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      S0.update(t, outK(t, [4.8, 5.0]))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.12 (zoom-out → search), 11.1 (flop → the sky), 15.42 (charts → the arc), 20.9 (the arc →
// "Somewhere out there"). cardfx keeps two for a 30 s film: the 11.1 flip and the 20.9 shuffle.
const CUTS = [5.12, { t: T.cut1, kind: 'flip' }, 15.42, { t: T.cut2, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.2, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const tileTicks = (() => { const out = []; let last = -1; for (const tl of [...TILES].sort((a, b) => a.tA - b.tA)) { if (tl.tA > 4.9) break; if (tl.tA - last > 0.09) { out.push(['tick', r3(tl.tA), 0.012]); last = tl.tA } } return out })()

export const CUES = [
  ['busFx', 'sfx', { gain: 22 }],
  // huge: tiles tick in, rings draw, the zoom-out
  ...wordPops(T.h0, 2, 0.1, 0), ['pop', T.huge, 1174.66, 0.055, 0], ['boom', T.huge, 0.12], ['pluck', T.huge, 1174.66, 0.045, 0.8, 0],
  ...tileTicks, ['pop', 0.3, 739.99, 0.04, 0],
  ...T.rings.map((r, i) => ['pluck', r3(r + 0.1), [880, 739.99, 587.33][i], 0.035, 0.6, (i - 1) * 0.3]),
  ...[...T.inner, ...T.outer].map((c, i) => ['pop', c, NOTE[i % 7], 0.02, ((i % 3) - 1) * 0.4]),
  ['riser', 2.2, T.drop, 0.03], ['whoosh', T.drop, 1.6, 0.05], ['boom', T.drop, 0.16], ...wordPops(T.sub, 4, 0.1, 2, 0.022),
  ['pop', T.guideIn + 0.05, 739.99, 0.045, 0.3], ['bell', T.guideIn + 0.1, 1318.51, 0.02, 0.8, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SPEAK]: 740 } }),
  // search: the lens, three stops, the flop
  ['whoosh', T.h0Out[0], 0.3, 0.03], ...wordPops(T.h1, 9, 0.07, 1), ['pop', T.h1Your, 1174.66, 0.04, 0],
  ['whoosh', T.lensIn[0], 0.6, 0.04],
  ...T.stops.flatMap((s, i) => [['whoosh', r3(s - 0.4), 0.35, 0.03], ['tick', s, 0.05], ['pop', r3(s + 0.15), [659.25, 587.33, 523.25][i], 0.04, 0], ['chip', r3(s + 0.2), [784, 740, 660][i], 0.18, { ...FX, wave: 'square', duty: 0.25, slide: 6, gain: 0.018, decay: 0.12, sustain: 0.6 }]]),
  ['whoosh', T.flop, 0.5, 0.04], ['tom', r3(T.flop + 0.5), 90, { ...FX, gain: 0.26, decay: 0.3 }], ['boom', r3(T.flop + 0.5), 0.1],
  ...[0, 1, 2].map(i => ['pluck', r3(T.flop + 0.6 + i * 0.11), 1567.98 - i * 140, 0.02, 0.3, (i - 1) * 0.3]),
  // the sky: lights rise, the stars wake, the pair
  ...wordPops(T.h2, 3, 0.09, 2), ['pop', T.h2Sky, 1318.51, 0.05, 0], ['pluck', T.h2Sky, 1174.66, 0.04, 0.7, 0],
  ['riser', T.rise[0], T.rise[1], 0.025], ['glitter', T.rise[0] + 0.2, T.rise[1]],
  ...EYED.map((e, n) => ['pop', r3(T.wake + n * 0.07 + 0.25), NOTE[(n * 2) % 7] * 2, 0.018, ((n % 5) - 2) * 0.2]),
  ['bell', T.hero[0], 1174.66, 0.035, 1.4, -0.4], ['bell', T.hero[1], 1318.51, 0.035, 1.4, 0.4], ['glitter', T.hero[0], T.hero[1] + 0.5],
  // the arc
  ...wordPops(T.h3, 3, 0.08, 1), ['pop', T.h3Up, 1174.66, 0.05, 0], ['pluck', T.h3Up, 1174.66, 0.04, 0.6, 0],
  ['whoosh', T.arc[0], T.arc[1] - T.arc[0], 0.04], ['riser', T.arc[0], T.arc[1], 0.02],
  ['boom', T.heart, 0.14], ['glitter', T.heart, T.heart + 0.8], ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', r3(T.heart + i * 0.07), f, 0.035, 1.6, (i - 1.5) * 0.2]),
  ['pluck', T.heart + 0.1, 1174.66, 0.04, 0.5, -0.2], ['pluck', T.heart + 0.2, 1567.98, 0.035, 0.5, 0.3],
  // somewhere out there
  ...wordPops(T.h4, 4, 0.07, 0), ...[0, 1, 2, 3, 4].map(i => ['pop', r3(T.h4Sky + i * 0.12), NOTE[(3 + i) % 7], 0.035, 0]), ['glitter', T.h4Sky, T.h4Sky + 0.7],
  ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ...sob(T.pisIn + 0.4, 1568), ...sob(23.2, 1660, 2),
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
