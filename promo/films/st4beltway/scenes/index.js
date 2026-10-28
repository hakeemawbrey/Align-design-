// st4beltway (EP 014, 15 s vertical Align ad, Star Talk season 4, thread F: Aries × Libra) · story 0–10.6, then the
// shared end card ("come" + the Align logo, JOIN THE HOUSTON BETA).
//   0.00–5.25  "Houston is *big.*"  A generic night map, zoomed in on the ♈ Aries star by its pin out west. The map
//              pulls back past the 610 LOOP, past BELTWAY 8, out to the GRAND PARKWAY. A second pin pops on the far east
//              side: the ♎ Libra star, waving. Box (♈ ARIES): "they're 45 minutes away!"  (Aries: wide eyes, flop.)
//   5.30–8.55  "Far isn't | a *no.*"  Box (THE STARS): "distance is a *plan,* not a dealbreaker."  A heart pin drops
//              halfway (HALFWAY ♡) and both stars hop along a dotted route to it.
//   8.6        card cut (flip).
//   8.7–10.5   "Meet in the | *middle.*"  The two stars at the halfway pin, heart-eyed. Out by 10.45.
// Season lore: the 100-star constellation (EP 14) top-left; the ghost rises over the map's compass card (4.0–5.3).
// Generic map: only the three real ring roads are named; no landmarks, logos or numbers beyond Aries' own complaint.
// One canvas (sky + map + pins + stars), DOM type + the box above it. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const EP = 14
export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', CYAN = '#7fdcff'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const ARI = signStar('aries'), LIB = signStar('libra')

// ── the timeline
const T = {
  h0: 0.1, h0Land: 0.55, h0Out: [5.1, 5.28],
  zoom: [0.4, 2.5], ariIn: 0.25, labels: [1.0, 1.55, 2.1], libIn: 2.45, wave: [2.6, 3.4],
  open: 2.66, l1: BEAT(4),                                            // 2.82: the drop
  flop: 3.9,
  h1: 5.3, h1Land: 5.7, l2: 5.45, pin: 7.05, travel: [7.45, 8.3], meet: 8.3, close: 8.5, h1Out: [8.36, 8.54],
  cut: 8.6,
  h2: 8.7, h2Land: 9.05, heart: 9.2, h2Out: [10.24, 10.44], out: [10.06, 10.45],
  ghost: 4.0,
}
const ARIES = '♈ ARIES', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: ARIES, color: ARI.color, text: "they're 45 minutes *away!*" },
  { t: T.l2, speaker: NARR, text: 'distance is a *plan,* not a dealbreaker.' },
]
const CPS = 28

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1 } = {}) {
  if (a <= 0 || cell <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── the map (world px at zoom 1, centred on C)
const C = { x: 540, y: 905 }
const RINGS = [
  { name: '610 LOOP', rx: 118, ry: 104, w: 5, col: BONE, lab: [0, -1] },
  { name: 'BELTWAY 8', rx: 268, ry: 238, w: 6, col: GOLD, lab: [0, -1] },
  { name: 'GRAND PARKWAY', rx: 445, ry: 392, w: 7, col: PINK, lab: [0, -1] },
]
const ARI_PIN = { x: C.x - 368, y: C.y + 60 }, LIB_PIN = { x: C.x + 372, y: C.y + 40 }
const MID = { x: C.x + 2, y: C.y + 50 }
const COMPASS = { x: 935, y: 1325, w: 120, h: 92 }
// wobble a ring a little so it reads hand-drawn, not geometric
const ringPt = (R, a) => { const k = 1 + 0.04 * Math.sin(a * 3 + R.rx * 0.01) + 0.025 * Math.sin(a * 5 + 1); return { x: Math.cos(a) * R.rx * k, y: Math.sin(a) * R.ry * k } }

function view(t) {
  const p = ease.inOutCubic(prog(t, ...T.zoom))
  const s = lerp(3.0, 1, p)
  const fx = lerp(ARI_PIN.x, C.x, p), fy = lerp(ARI_PIN.y, C.y, p)
  if (t >= T.cut) return { s: 1.3, fx: MID.x, fy: MID.y - 40, p: 1, oy: 150, big: 1 }
  return { s, fx, fy, p, oy: 0, big: 0 }
}
const toS = (v, pt) => ({ x: C.x + (pt.x - v.fx) * v.s, y: C.y + v.oy + (pt.y - v.fy) * v.s })

function ariState(t) {
  if (t < T.libIn) return { mood: 'happy', look: [1, 0] }
  if (t < T.l1) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.l2) return { mood: t < T.flop ? 'wide' : 'squint', look: [0, 0], blink: false }      // 45 MINUTES?! (flop)
  if (t < T.pin) return { mood: 'neutral', look: [0, 0] }
  if (t < T.meet) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
function libState(t) {
  if (t < T.wave[1]) return { mood: 'happy', look: [-1, 0] }
  if (t < T.pin) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.meet) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
const ARI_HOPS = [T.ariIn + 0.3, ...talkHops(LINES.slice(0, 1), ARIES, { cps: CPS }), T.travel[0], T.travel[0] + 0.42, T.meet, T.h2Land + 0.05]
const LIB_HOPS = [T.libIn + 0.25, T.wave[0], T.wave[0] + 0.4, T.travel[0] + 0.1, T.travel[0] + 0.52, T.meet + 0.05, T.h2Land + 0.1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 170px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston is *big.*', { top: 250, size: 108, accentSize: 162, fit: true, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'Far isn’t | a *no.*', { top: 190, size: 112, accentSize: 168, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Land, wobble: true, accentColor: CYAN, lineHeight: 0.98 })
  const H2 = popText(root, 'Meet in the | *middle.*', { top: 190, size: 112, accentSize: 170, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── the map: land disc, spokes, three rings, labels; drawn in world space under the view transform
  function drawMap(t, v, ok) {
    if (ok <= 0) return
    x.save(); x.globalAlpha = ok
    // the map's soft land glow (the frame stays sky above the headline)
    const g = x.createRadialGradient(C.x, C.y, 0, C.x, C.y, 620)
    g.addColorStop(0, 'rgba(36,26,74,0.8)'); g.addColorStop(0.75, 'rgba(26,18,56,0.6)'); g.addColorStop(1, 'rgba(26,18,56,0)')
    x.fillStyle = g; x.fillRect(0, C.y - 640, W, 1280)
    x.translate(C.x, C.y + v.oy); x.scale(v.s, v.s); x.translate(-v.fx, -v.fy)
    const lw = 1 / Math.sqrt(v.s)
    // the street grid, faint
    x.strokeStyle = 'rgba(201,166,255,0.08)'; x.lineWidth = 2 * lw
    for (let i = -10; i <= 10; i++) { x.beginPath(); x.moveTo(C.x + i * 48, C.y - 500); x.lineTo(C.x + i * 48, C.y + 500); x.stroke(); x.beginPath(); x.moveTo(C.x - 520, C.y + i * 48); x.lineTo(C.x + 520, C.y + i * 48); x.stroke() }
    // spokes (generic freeways, unlabeled)
    x.strokeStyle = 'rgba(239,230,214,0.28)'; x.lineWidth = 4 * lw
    for (const a of [0.15, 0.95, 1.75, 2.5, 3.3, 4.1, 4.9, 5.65]) { x.beginPath(); x.moveTo(C.x + Math.cos(a) * 30, C.y + Math.sin(a) * 30); x.lineTo(C.x + Math.cos(a) * 520, C.y + Math.sin(a) * 470); x.stroke() }
    // downtown: a tiny cluster
    x.fillStyle = 'rgba(255,214,150,0.5)'; for (let i = 0; i < 7; i++) x.fillRect(C.x - 18 + (i % 4) * 10, C.y - 12 + Math.floor(i / 4) * 12, 7, 9)
    // rings
    RINGS.forEach((R, i) => {
      x.save(); x.shadowColor = R.col; x.shadowBlur = 14
      x.strokeStyle = rgba(R.col, 0.85); x.lineWidth = R.w * lw * 1.6
      x.beginPath()
      for (let k = 0; k <= 96; k++) { const p = ringPt(R, k / 96 * Math.PI * 2); k ? x.lineTo(C.x + p.x, C.y + p.y) : x.moveTo(C.x + p.x, C.y + p.y) }
      x.closePath(); x.stroke(); x.restore()
    })
    x.restore()
    // ring labels in screen space (pop in as the map pulls back past each ring)
    RINGS.forEach((R, i) => {
      const k = pop01(t, T.labels[i], 0.3, 2.2) * ok * (v.big && i < 2 ? 0 : 1)
      if (k <= 0.01) return
      const p = ringPt(R, [-Math.PI / 2 - 0.45, -Math.PI / 2, Math.PI / 2 + 0.25][i]), s = toS(v, { x: C.x + p.x, y: C.y + p.y })
      x.save(); x.translate(s.x, s.y); x.scale(k, k)
      x.font = `700 24px ${MONO}`; x.letterSpacing = '0.12em'
      const tw = x.measureText(R.name).width + 36
      x.fillStyle = 'rgba(16,9,38,0.92)'; x.beginPath(); x.roundRect(-tw / 2, -21, tw, 42, 21); x.fill()
      x.lineWidth = 3; x.strokeStyle = rgba(R.col, 0.9); x.stroke()
      x.fillStyle = R.col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(R.name, 3, 2)
      x.restore()
    })
  }

  function drawPin(px, py, col, k, glyph = null) {
    if (k <= 0.01) return
    x.save(); x.translate(px, py); x.scale(k, k)
    x.fillStyle = 'rgba(6,4,18,0.5)'; x.beginPath(); x.ellipse(0, 4, 18, 6, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.beginPath(); x.moveTo(0, 0); x.lineTo(-22, -40); x.arc(0, -52, 26, Math.PI * 0.85, Math.PI * 2.15); x.closePath(); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(0, -5); x.lineTo(-17, -40); x.arc(0, -52, 21, Math.PI * 0.85, Math.PI * 2.15); x.closePath(); x.fill()
    if (glyph) bits(x, HEART, 0, -53, 3.4, { X: '#fff1f5' })
    else { x.fillStyle = '#ffffff'; x.beginPath(); x.arc(0, -52, 8, 0, Math.PI * 2); x.fill() }
    x.restore()
  }

  // the compass card (bottom right): the ghost rises over its top edge
  function drawCompass(t, ok) {
    const k = pop01(t, T.labels[2] + 0.2, 0.3, 2) * ok
    if (k <= 0.01) return
    const { x: cx, y: cy, w, h } = COMPASS
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
    x.fillStyle = '#211646'; x.fillRect(-w / 2, -h / 2, w, h)
    x.strokeStyle = rgba(GOLD, 0.7); x.lineWidth = 2; x.strokeRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12)
    x.fillStyle = GOLD; x.beginPath(); x.moveTo(0, -30); x.lineTo(10, 6); x.lineTo(0, 0); x.lineTo(-10, 6); x.closePath(); x.fill()
    x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('N', 0, 26)
    x.restore()
  }

  // the dotted route from each pin to the middle
  function drawRoute(t, a, b, p, col) {
    if (p <= 0) return
    const n = 18
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1)
      if (u > p) break
      const px = lerp(a.x, b.x, u), py = lerp(a.y, b.y, u) - Math.sin(Math.PI * u) * 40
      x.fillStyle = rgba(col, 0.85); x.fillRect(px - 4, py - 4, 8, 8)
    }
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.15, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      bits(x, HEART, cx + (((i * 37) % 7) / 6 - 0.5) * 320 + Math.sin(p * 7 + i) * 14, cy - p * 260, 6 + (i % 2), { X: i % 3 ? PINK : '#ff4f86' }, { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        const v = view(t)
        drawMap(t, v, clamp(prog(t, 0.05, 0.35)) * (t > T.out[0] ? 1 - prog(t, T.out[0], T.out[1]) : 1))
        drawCompass(t, ok)
        drawGhostCameo(x, t, { x: COMPASS.x, y: COMPASS.y - COMPASS.h / 2 - 4, at: T.ghost, dur: 1.3, from: 'below', cell: 3 })
        // pins + the travelling stars
        const A = toS(v, ARI_PIN), L = toS(v, LIB_PIN), M = toS(v, MID)
        const tp = ease.inOutCubic(prog(t, ...T.travel))
        drawRoute(t, A, M, clamp(prog(t, T.pin + 0.2, T.travel[0] + 0.2)), ARI.color)
        drawRoute(t, L, M, clamp(prog(t, T.pin + 0.2, T.travel[0] + 0.2)), LIB.color)
        drawPin(A.x, A.y, ARI.color, pop01(t, T.ariIn, 0.3, 2) * ok)
        drawPin(L.x, L.y, LIB.color, pop01(t, T.libIn, 0.3, 2) * ok)
        // the halfway heart pin drops from above
        if (t > T.pin) {
          const d = prog(t, T.pin, T.pin + 0.35), y = lerp(M.y - 500, M.y, ease.inQuad(d)), sq = d >= 1 ? 1 + 0.2 * Math.exp(-(t - T.pin - 0.35) * 9) * Math.cos((t - T.pin - 0.35) * 30) : 1
          glow(M.x, M.y - 50, 140, PINK, d * ok)
          drawPin(M.x, y, '#ff4f86', ok * sq, true)
          const lk = pop01(t, T.pin + 0.4, 0.3, 2.2) * ok
          if (lk > 0.01) {
            x.save(); x.translate(M.x, M.y + 40); x.scale(lk, lk)
            x.font = `700 26px ${MONO}`; x.letterSpacing = '0.12em'; const tw = x.measureText('HALFWAY ♡').width + 34
            x.fillStyle = 'rgba(16,9,38,0.92)'; x.beginPath(); x.roundRect(-tw / 2, -22, tw, 44, 22); x.fill(); x.lineWidth = 3; x.strokeStyle = PINK; x.stroke()
            x.fillStyle = PINK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HALFWAY ♡', 3, 2)
            x.restore()
          }
        }
        const sz = lerp(1.25, 1, v.p) * 170 * (v.big ? 1.3 : 1)
        const ap = pop01(t, T.ariIn + 0.08, 0.36, 2.1) * ok, lp = pop01(t, T.libIn + 0.08, 0.36, 2.1) * ok
        const arc = Math.sin(Math.PI * tp) * 70
        const aX = lerp(A.x, M.x - 105 * (v.big ? 1.3 : 1), tp), aY = lerp(A.y, M.y, tp) - 120 - arc
        const lX = lerp(L.x, M.x + 105 * (v.big ? 1.3 : 1), tp), lY = lerp(L.y, M.y, tp) - 120 - arc
        const flop = t > T.flop && t < T.l2 ? 0.14 * clamp((t - T.flop) * 5) : 0
        drawStarChar(x, aX, aY, sz * ap, t, { color: ARI.color, glyph: ARI.glyph, ...ariState(t), hops: ARI_HOPS, seed: 2, squash: flop, glow: 0.9 })
        drawStarChar(x, lX, lY, sz * lp, t, { color: LIB.color, glyph: LIB.glyph, ...libState(t), hops: LIB_HOPS, seed: 6, glow: 0.9 })
        sparkles(t, M.x, M.y - 120, T.meet, 14, 230, 1)
        if (t > T.heart) floatHearts(t, M.x, M.y - 200, T.heart, T.out[0])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 8.6 (box shut, both stars at the halfway pin → "Meet in the middle."), the one cut a 15 s film keeps.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // houston is big: the map pulls back (a long whoosh), the ring labels tick in, Libra's pin pops far away
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 1174.66, 0.04, 0.6, 0],
  ['pop', T.ariIn + 0.05, 739.99, 0.04, -0.5], ['whoosh', T.zoom[0], 2.0, 0.035],
  ...T.labels.map((l, i) => ['pop', +(l + 0.05).toFixed(3), NOTE[3 + i], 0.028, 0]),
  ['pop', T.libIn + 0.05, 987.77, 0.04, 0.6], ['pluck', T.wave[0], 1318.51, 0.03, 0.4, 0.6],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ARIES]: 700, [NARR]: 880 } }),
  ['pop', T.flop, 392, 0.035, -0.4], ['pop', T.flop + 0.12, 329.63, 0.03, -0.4],
  // far isn't a no: the heart pin drops + bounces, the two hop along the route
  ...wordPops(T.h1, 3, 0.08, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['whoosh', T.pin - 0.05, 0.4, 0.035], ['boom', T.pin + 0.35, 0.1], ['pluck', T.pin + 0.4, 1174.66, 0.04, 0.6, 0],
  ['pop', T.travel[0], 880, 0.025, -0.3], ['pop', T.travel[0] + 0.1, 880, 0.025, 0.3], ['pop', T.travel[0] + 0.42, 987.77, 0.025, -0.2], ['pop', T.travel[0] + 0.52, 987.77, 0.025, 0.2],
  ['bell', T.meet, 1318.51, 0.035, 1.2, 0], ['glitter', T.meet, T.meet + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // meet in the middle
  ...wordPops(T.h2, 3, 0.08, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.045, 0.7, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
