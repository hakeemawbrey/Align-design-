// st4neworleans (15 s vertical, Star Talk season 4 · EP 083 · thread A, the vote) · story 0–10.6, then the shared end card.
//   0.00–5.55  "Dear | *New Orleans.*"  Under a generic wrought-iron balcony with gas lanterns, a pixel brass band of three
//              little stars blasts horns while the ♎ Libra star (Venus-ruled, its scale on its head) dances, scale swinging.
//              Drop (2.82): the box opens. THE STARS: "you know how to celebrate." → Libra goes sparkle-eyed; confetti.
//   5.62–8.55  "Even a | *Tuesday.*"  THE STARS: "celebrate the *small* dates, too." → the big band bows out; ♈ Aries
//              (Libra's opposite) hops in with one tiny cupcake, one candle, tagged "TUESDAY". One very small band star
//              toots one very small horn. Libra's scale tips toward Aries.
//   8.62       card cut (flip), the box has shut.
//   8.66–10.45 "Celebrate the | *small* stuff."  Libra blows out the candle, a pinch of confetti, both heart-eyed.
//              Everything pops out by 10.45; the end card takes over at 10.6.
// Easter eggs: the seed constellation (EP 083) top-left, the frame's EP cartouche, the ghost hangs upside down under the
// balcony. One canvas, DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 83
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const LIB = signStar('libra'), ARI = signStar('aries')
const LIB_LIGHT = '#f39ae9'

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [5.35, 5.55],
  bandIn: 0.3, libIn: 0.6, bandOut: [5.25, 5.6],
  open: 2.66, l1: BEAT(4) + 0.02,                                         // the drop: 2.82
  sparkle: 3.7, confetti1: 3.75,
  l2: 5.62, h1: 5.68, h1Land: 6.0, ariIn: 6.45, tag: 6.85, miniIn: 7.05, toots: [7.4, 7.95], tip: 7.2,
  close: 8.55, h1Out: [8.36, 8.54],
  cut: 8.62,
  h2: 8.66, h2Land: 9.06, blow: 9.25, confetti2: 9.32, heartAt: 9.5, h2Out: [10.2, 10.42], out: [10.08, 10.45],
  ghost: 6.9,
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'you know how to celebrate.' },
  { t: T.l2, speaker: NARR, text: 'celebrate the *small* dates, too.' },
]
const CPS = 30
const LT = lineTimes(LINES, { cps: CPS })
const BEATS = Array.from({ length: 20 }, (_, i) => +BEAT(i).toFixed(3))

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const hash = (i, k = 1) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s) }

// ── pixel bits
const NOTE_BM = ['...XX.', '...XXX', '...X.X', '...X..', '.XXX..', 'XXXX..', '.XX...']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HORN = [
  '.............yY',
  '...ppp......yYY',
  'YYYYYYYYYYYYYYY',
  '...Y.Y.Y....yYY',
  '..YYYYYYYY...yY',
]
const HORN_C = { Y: '#f7c948', y: '#c98a1f', p: '#fff1c8' }
const CUPCAKE = [
  '.....C.....',
  '.....C.....',
  '..PPPPPPP..',
  '.PWPPSPPWP.',
  'PPPSPPPPSPP',
  '.TTTTTTTTT.',
  '.TtTtTtTtT.',
  '..TtTtTtT..',
  '..TTTTTTT..',
]
const CUP_C = { C: '#8fd8ff', P: '#ffb3d1', W: '#ffffff', S: '#7dffb0', T: '#e8a050', t: '#b86f2c' }
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch] || cols.X; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// ── layout
const BAL = { y: 560, floor: 770, rail: 650 }      // the balcony: facade top, floor line, rail top
const STREET = 1300
const BAND = [{ x: 105, y: 1160, s: 128, col: STAR.bone, seed: 2 }, { x: 255, y: 1195, s: 118, col: STAR.sky, seed: 5 }, { x: 400, y: 1160, s: 128, col: LAV, seed: 8 }]
const LIBRA = { x: 720, y: 1040, size: 290 }, LIB_DUO = { x: 380, y: 1050, size: 280 }
const ARIES = { x: 770, y: 1060, size: 260 }
const MINI = { x: 175, y: 1230, size: 82 }
const CAKE = { x: 575, y: 1170 }

const LIB_HOPS = [T.libIn + 0.3, ...BEATS.filter(b => b > 1.2 && b < 5.2), T.sparkle, T.tip, T.h2Land, T.heartAt]
const ARI_HOPS = [T.ariIn + 0.3, T.tag + 0.1, T.h2Land + 0.1, T.confetti2 + 0.2]

function libState(t) {
  if (t < T.l1) return { mood: 'happy' }
  if (t < LT[0].done + 0.15) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.l2) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.ariIn) return { mood: 'neutral', look: [0, 0] }
  if (t < T.tag + 0.3) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.heartAt) return { mood: 'happy' }
  return { mood: 'heart' }
}
function ariState(t) {
  if (t < T.tag + 0.4) return { mood: 'happy' }
  if (t < T.h2) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.heartAt + 0.1) return { mood: 'happy' }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear | *New Orleans.*', { top: 170, size: 120, accentSize: 180, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, wobble: true, gap: 0.1, accentColor: LIB_LIGHT, lineHeight: 0.98, fit: true })
  const H1 = popText(root, 'Even a | *Tuesday.*', { top: 170, size: 120, accentSize: 190, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD, lineHeight: 0.98, fit: true })
  const H2 = popText(root, 'Celebrate the | *small* stuff.', { top: 170, size: 112, accentSize: 164, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: PINK, lineHeight: 0.98, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#05040c' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── the French Quarter-style facade: a pastel wall, tall shuttered doors, a wrought-iron balcony, gas lanterns
  function drawFacade(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const g = x.createLinearGradient(0, BAL.y, 0, STREET)
    g.addColorStop(0, '#2c3f63'); g.addColorStop(1, '#3d3a68')
    x.fillStyle = g; x.fillRect(0, BAL.y, 1080, STREET - BAL.y)
    // brick-ish courses
    x.fillStyle = 'rgba(10,8,30,0.18)'
    for (let y = BAL.y + 30; y < STREET; y += 44) x.fillRect(0, y, 1080, 3)
    // tall doors with shutters: upstairs (behind the rail) and street level
    for (const [dy, dh] of [[BAL.y + 10, BAL.floor - BAL.y - 10], [BAL.floor + 70, STREET - BAL.floor - 70]]) {
      for (const dx of [140, 470, 800]) {
        x.fillStyle = INK; x.fillRect(dx - 6, dy - 6, 152, dh + 6)
        x.fillStyle = '#8a6448'; x.fillRect(dx + 30, dy + 10, 80, dh - 10); x.fillStyle = 'rgba(255,207,122,0.35)'; x.fillRect(dx + 44, dy + 24, 52, dh - 40)                   // warm light in the doorway
        x.fillStyle = '#23685c'; x.fillRect(dx, dy, 34, dh); x.fillRect(dx + 106, dy, 34, dh)   // green shutters
        x.fillStyle = '#174a42'; for (let k = dy + 10; k < dy + dh; k += 16) { x.fillRect(dx + 4, k, 26, 5); x.fillRect(dx + 110, k, 26, 5) }
        glow(dx + 70, dy + dh * 0.5, 160, '#ffb35c', 0.18)
      }
    }
    // the balcony floor slab + brackets
    x.fillStyle = INK; x.fillRect(0, BAL.floor - 4, 1080, 30)
    x.fillStyle = '#4a4470'; x.fillRect(0, BAL.floor, 1080, 18)
    // wrought-iron rail: top bar, balusters, little curls
    x.fillStyle = '#0d0a1c'
    x.fillRect(0, BAL.rail, 1080, 10); x.fillRect(0, BAL.floor - 30, 1080, 6)
    for (let bx = 10; bx < 1080; bx += 36) x.fillRect(bx, BAL.rail, 5, BAL.floor - BAL.rail)
    for (let bx = 28; bx < 1080; bx += 72) {
      for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2; x.fillRect(bx + Math.cos(an) * 13 - 2, BAL.rail + 46 + Math.sin(an) * 13 - 2, 5, 5) }
    }
    // brackets under the floor
    for (const bx of [60, 540, 1020]) for (let k = 0; k < 6; k++) x.fillRect(bx - 3 - k * 4, BAL.floor + 18 + k * 8, 6, 8)
    // gas lanterns, flickering
    for (const [n, lx] of [120, 960].entries()) {
      const ly = BAL.floor + 70, fl = 0.85 + 0.15 * Math.sin(t * 13 + n * 2) * Math.sin(t * 5.1 + n)
      x.fillStyle = '#0d0a1c'; x.fillRect(lx - 3, BAL.floor + 18, 6, 30); x.fillRect(lx - 22, ly - 26, 44, 8); x.fillRect(lx - 18, ly + 30, 36, 8)
      x.fillStyle = rgba('#ffd27a', fl); x.fillRect(lx - 16, ly - 18, 32, 48)
      x.fillStyle = '#0d0a1c'; x.fillRect(lx - 2, ly - 18, 4, 48)
      glow(lx, ly + 6, 190, '#ffb35c', 0.7 * fl)
    }
    // the street
    x.fillStyle = INK; x.fillRect(0, STREET - 4, 1080, 4)
    x.fillStyle = '#2a2342'; x.fillRect(0, STREET, 1080, 40)
    x.fillStyle = 'rgba(255,210,140,0.12)'; for (let k = 0; k < 14; k++) x.fillRect((k * 83) % 1080, STREET + 12 + (k % 3) * 8, 40, 4)
    x.restore()
  }

  function drawNote(t, sx, sy, t0, k, col, cell = 7, life = 1.1) {
    const p = (t - t0) / life
    if (p < 0 || p >= 1) return
    const side = k % 2 ? 1 : -1
    drawBits(x, NOTE_BM, { X: col }, Math.round(sx + side * 30 * p + 140 * p), Math.round(sy - 200 * ease.outCubic(p)), cell, { rot: Math.sin(p * 9 + k) * 0.3, alpha: Math.sin(Math.PI * Math.min(1, p * 1.3)) })
  }

  function drawBand(t) {
    const ok = popOut(t, T.bandOut)
    if (ok <= 0) return
    BAND.forEach((b, i) => {
      const pk = pop01(t, T.bandIn + i * 0.14, 0.34, 2.2) * ok
      if (pk <= 0.02) return
      const blow = t - BEATS.filter(v => v <= t && v > 0.9).slice(-1)[0]
      const puff = blow >= 0 && blow < 0.4 ? Math.exp(-blow * 7) : 0
      const r = drawStarChar(x, b.x, b.y, b.s, t, { color: b.col, mood: puff > 0.4 ? 'squint' : 'happy', pop: pk, seed: b.seed, glow: 0.9, squash: -0.07 * puff, hops: BEATS.filter((v, k) => k % 2 === i % 2 && v > 1 && v < 5.2) })
      const hc = Math.max(4, b.s / 26) * pk
      drawBits(x, HORN, HORN_C, Math.round(r.x + b.s * 0.42), Math.round(r.y + b.s * 0.06), hc, { rot: -0.35 - 0.12 * puff })
      for (let k = 0; k < 6; k++) drawNote(t, r.x + b.s * 0.8, r.y - b.s * 0.15, 1.0 + i * 0.28 + k * 0.72, k + i, k % 2 ? GOLD : BONE, 7 * pk)
    })
  }

  // a mini scale balanced on the star's upper tip, tilting with the dance
  function drawScale(tipX, tipY, c, ang) {
    const H = 9 * c, ARM = 7 * c
    x.save(); x.translate(Math.round(tipX), Math.round(tipY))
    x.fillStyle = INK; x.fillRect(-1.5 * c, -H - c, 3 * c, H + c); x.fillRect(-4 * c, -c, 8 * c, 2 * c)
    x.fillStyle = '#f7c948'; x.fillRect(-0.5 * c, -H, c, H); x.fillRect(-3 * c, -0.5 * c, 6 * c, c)
    x.translate(0, -H); x.rotate(ang)
    x.fillStyle = INK; x.fillRect(-ARM - c, -c, 2 * ARM + 2 * c, 2 * c)
    x.fillStyle = '#f7c948'; x.fillRect(-ARM, -0.5 * c, 2 * ARM, c)
    for (const s of [-1, 1]) {
      x.save(); x.translate(s * ARM, 0); x.rotate(-ang)
      x.fillStyle = 'rgba(255,241,200,0.85)'; x.fillRect(-2.2 * c, 0, c * 0.5, 3.5 * c); x.fillRect(1.7 * c, 0, c * 0.5, 3.5 * c)
      x.fillStyle = INK; x.fillRect(-3.2 * c, 3.2 * c, 6.4 * c, 2 * c)
      x.fillStyle = '#c98a1f'; x.fillRect(-2.6 * c, 3.5 * c, 5.2 * c, 1.2 * c)
      x.restore()
    }
    drawBits(x, ['.y.', 'yYy', '.y.'], { y: '#f7c948', Y: '#fff1c8' }, 0, -1.6 * c, c * 0.8)
    x.restore()
  }

  function confetti(t, cx, cy, t0, n, spread, seed) {
    const tt = t - t0
    if (tt < 0 || tt > 1.6) return
    const cols = [GOLD, PINK, MINT, '#7fdcff', LAV, '#ff7a5c']
    x.save()
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (hash(i, seed) - 0.5) * 2.2, v = spread * (0.6 + 0.6 * hash(i, seed + 1))
      const px = cx + Math.cos(a) * v * tt + Math.sin(tt * 6 + i) * 10, py = cy + Math.sin(a) * v * tt + 380 * tt * tt
      x.globalAlpha = 1 - ease.inQuad(tt / 1.6)
      x.fillStyle = cols[i % cols.length]
      const s = 8 + (i % 3) * 3, flip = Math.abs(Math.sin(tt * 9 + i))
      x.fillRect(Math.round(px), Math.round(py), s, Math.max(3, s * flip))
    }
    x.restore()
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LIB_LIGHT]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 6) {
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.17, life = 1.0
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 220), Math.round(cy - 80 - p * 220), cell, { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    // Libra: dances centre-right, then steps left for the duo
    const duo = ease.inOutCubic(prog(t, T.l2 - 0.1, T.ariIn + 0.1))
    const sway = t < T.l2 ? Math.sin((t - 0.6) * Math.PI / 0.5556) * 40 * clamp(prog(t, 1, 1.4)) : t > T.h2 ? Math.sin((t - T.h2) * Math.PI / 0.5556) * 14 : 0
    const L = { x: lerp(LIBRA.x, LIB_DUO.x, duo) + sway, y: lerp(LIBRA.y, LIB_DUO.y, duo), size: lerp(LIBRA.size, LIB_DUO.size, duo) }
    const lp = pop01(t, T.libIn, 0.38, 2.1) * ok
    if (lp > 0.02) {
      const rL = drawStarChar(x, L.x, L.y, L.size, t, { color: LIB.color, glyph: LIB.glyph, ...libState(t), hops: LIB_HOPS, pop: lp, seed: 3, glow: 1.1 })
      const tilt = t < T.l2 ? Math.sin((t - 0.6) * Math.PI / 0.5556) * 0.35 : t < T.tip ? 0 : lerp(0, 0.28, ease.outCubic(prog(t, T.tip, T.tip + 0.4))) * (t > T.h2 ? 0.4 + 0.6 * Math.cos((t - T.h2) * 3) : 1)
      drawScale(rL.x, rL.top + 6, Math.max(4, L.size / 36) * lp, tilt)
      sparkles(t, rL.x, rL.y, T.sparkle, 10, 220, 1)
      if (t > T.heartAt) floatHearts(t, rL.x, rL.y, T.heartAt, T.out[0], 2)
    }
    // Aries with the tiny cupcake
    const ap = pop01(t, T.ariIn, 0.38, 2.1) * ok
    if (ap > 0.02) {
      const drop = 1 - ease.outCubic(prog(t, T.ariIn - 0.1, T.ariIn + 0.22))
      const rA = drawStarChar(x, ARIES.x + drop * 320, ARIES.y, ARIES.size, t, { color: ARI.color, glyph: ARI.glyph, ...ariState(t), hops: ARI_HOPS, pop: ap, seed: 6, glow: 1 })
      // the cupcake floats between them
      const ck = pop01(t, T.ariIn + 0.15, 0.36, 2.4) * ok
      const cx = lerp(rA.x - 80, CAKE.x, ease.inOutCubic(prog(t, T.ariIn + 0.1, T.tag))), cy = CAKE.y + Math.sin(t * 2.6) * 6
      drawBits(x, CUPCAKE, CUP_C, Math.round(cx), Math.round(cy), 11 * ck)
      // the candle flame (out after the blow)
      const lit = t < T.blow
      if (lit && ck > 0.3) {
        const fl = Math.sin(t * 17) * 2
        x.fillStyle = '#ffd27a'; x.fillRect(cx - 9 + fl, cy - 11 * 4.5 - 30, 18, 22); x.fillStyle = '#fff6e6'; x.fillRect(cx - 4 + fl, cy - 11 * 4.5 - 22, 8, 10)
        glow(cx, cy - 74, 70, '#ffb35c', 0.8)
      } else if (!lit) {
        // a little smoke curl
        const p = prog(t, T.blow, T.blow + 0.9)
        x.fillStyle = `rgba(239,230,214,${0.6 * (1 - p)})`
        for (let s = 0; s < 4; s++) x.fillRect(cx - 4 + Math.sin(p * 6 + s) * 8, cy - 70 - p * 80 - s * 14, 8, 8)
      }
      // the tag
      const tk = pop01(t, T.tag, 0.3, 2.6) * ok
      if (tk > 0.02) {
        x.save(); x.translate(cx, cy + 92); x.scale(tk, tk); x.rotate(-0.05)
        x.font = `700 30px ${MONO}`; x.letterSpacing = '4px'
        const w = x.measureText('TUESDAY').width + 40
        x.fillStyle = INK; x.fillRect(-w / 2 - 5, -27, w + 10, 54)
        x.fillStyle = BONE; x.fillRect(-w / 2, -22, w, 44)
        x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TUESDAY', 2, 2)
        x.letterSpacing = '0px'
        x.restore()
      }
      if (t > T.heartAt) floatHearts(t, rA.x, rA.y, T.heartAt + 0.1, T.out[0], 5)
    }
    // the one tiny band star with its tiny horn
    const mp = pop01(t, T.miniIn, 0.3, 2.4) * ok
    if (mp > 0.02) {
      const tootT = [T.toots[0], T.toots[1], 9.06, 9.62]
      const lt = t - tootT.filter(v => v <= t).slice(-1)[0]
      const puff = lt >= 0 && lt < 0.4 ? Math.exp(-lt * 7) : 0
      const r = drawStarChar(x, MINI.x, MINI.y, MINI.size, t, { color: STAR.sky, mood: puff > 0.4 ? 'squint' : 'happy', pop: mp, seed: 11, glow: 0.8, squash: -0.08 * puff, hops: tootT })
      drawBits(x, HORN, HORN_C, Math.round(r.x + 40), Math.round(r.y + 4), 3 * mp, { rot: -0.35 - 0.15 * puff })
      tootT.forEach((v, k) => drawNote(t, r.x + 70, r.y - 10, v, k, k % 2 ? PINK : GOLD, 4, 0.9))
    }
    confetti(t, LIBRA.x, LIBRA.y - 120, T.confetti1, 46, 520, 3)
    confetti(t, CAKE.x, CAKE.y - 60, T.confetti2, 16, 300, 9)          // a *small* pinch
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.55, SKY_H.zoom, ss), dy: lerp(-20, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.05) {
        const sa = popOut(t, [T.out[0] - 0.05, T.out[1]]) * clamp(prog(t, 0.15, 0.45))
        drawFacade(t, sa)
        drawGhostCameo(x, t, { x: 975, y: BAL.floor + 26, at: T.ghost, dur: 1.4, from: 'above', cell: 3.4 })
        drawBand(t)
        drawStars(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.58 (H0 out → "Even a Tuesday.") and 8.62 (box shut → the last line). cardfx keeps 8.62.
const CUTS = [5.58, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
// horn stabs: square-wave chip blasts (big band), then one tiny toot
const stab = (t0, f, gain = 0.022, len = 0.22) => ['chip', +t0.toFixed(3), f, len, { wave: 'square', duty: 0.3, gain, vib: 0.01, decay: 0.15, sustain: 0.5, pan: -0.3 }]
export const CUES = [
  ...wordPops(T.h0, 1, 0.1, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pop', T.h0Land + 0.14, 1174.66, 0.045, 0],
  ['pop', T.bandIn + 0.05, 659.25, 0.035, -0.3], ['pop', T.bandIn + 0.19, 783.99, 0.035, -0.2], ['pop', T.libIn + 0.05, 880, 0.04, 0.3],
  ...BEATS.filter(b => b > 1.0 && b < 5.2).flatMap((b, i) => i % 2 ? [stab(b, 392), stab(b + 0.01, 493.88, 0.016)] : [stab(b, 440, 0.018, 0.14)]),
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  ['glitter', T.sparkle, T.sparkle + 0.4], ['whoosh', T.confetti1 - 0.05, 0.4, 0.035], ['pop', T.confetti1, 1318.51, 0.035, 0.3],
  ['whoosh', T.bandOut[0], 0.35, 0.03],
  ...wordPops(T.h1, 2, 0.08, 2, 0.025), ['pop', T.h1Land, 1046.5, 0.05, 0],
  ['whoosh', T.ariIn - 0.12, 0.35, 0.03], ['pop', T.ariIn + 0.1, 739.99, 0.045, 0.4], ['bell', T.tag, 1567.98, 0.025, 1.0, 0.2], ['tick', T.tag, 0.03],
  ['pop', T.miniIn + 0.05, 1318.51, 0.035, -0.4],
  ...[T.toots[0], T.toots[1], 9.06, 9.62].map(v => ['chip', v, 1046.5, 0.12, { wave: 'square', duty: 0.25, gain: 0.014, decay: 0.08, sustain: 0.3, pan: -0.4 }]),
  ['pluck', T.tip, 1174.66, 0.035, 0.5, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pop', T.h2Land + 0.14, 1318.51, 0.05, 0],
  ['whoosh', T.blow - 0.05, 0.25, 0.03], ['pop', T.confetti2, 1567.98, 0.03, 0], ['glitter', T.confetti2, T.confetti2 + 0.35],
  ['pluck', T.heartAt, 1174.66, 0.04, 0.5, 0], ['bell', T.heartAt + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
