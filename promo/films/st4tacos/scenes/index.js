// st4tacos (15 s vertical Align ad, Star Talk season 4, EP 019 · thread F: Aries × Libra; callback to starlibra) · story 0–10.6.
//   0.00–3.80  "Dear Libra: Thai or | sushi, *part two.*"  A crossroads: a signpost points THAI one way and SUSHI the other.
//              The ♎ Libra star wobbles its scale (noodles vs nigiri), eyes darting; the ♈ Aries star, gloves on, taps its
//              foot (impatient hops, squint).
//   3.80–8.60  "Then: a | *taco truck.*"  A pixel taco truck rolls in and parks. The scale snaps level (a taco in each pan).
//              (The ghost peeks over the truck's TACOS sign.) LIBRA: "…tacos?" → ARIES: "FINALLY." (gloves up) →
//              THE STARS: "see? you *can* pick."
//   8.75–10.4  "Picked. *Finally.*"  Both stars happy, a taco each. Everything pops out by 10.45.
// One canvas (sky + road + signpost + truck + stars + scale), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 19
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const LIB = signStar('libra'), ARI = signStar('aries')

// ── the timeline
const T = {
  h0: 0.12, h0Out: [3.62, 3.8],
  road: 0.2, sign: 0.35, libIn: 0.5, ariIn: 0.65, scale: 0.85, taps: [1.4, 1.75, 2.1, 2.45, 2.8, 3.15],
  truck: [3.0, 3.75], snap: 3.85, ghost: 5.0,
  h1: 3.9, h1Land: 4.25, open: 3.95, l1: 4.15, l2: 6.0, l3: 7.75, h1Out: [8.48, 8.64],
  h2: 8.75, h2Land: 9.05, close: 10.2, h2Out: [10.15, 10.4], out: [10.05, 10.45],
}
const LINES = [
  { t: T.l1, speaker: '♎ LIBRA STAR', text: '…tacos?', color: LIB.color },
  { t: T.l2, speaker: '♈ ARIES STAR', text: 'FINALLY.', color: ARI.color },
  { t: T.l3, speaker: 'THE STARS', text: 'see? you *can* pick.' },
]
const CPS = 26

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy); flip mirrors it */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
const GLOVE = ['....hhhhhh...', '..hhRRRRRRR..', '.hRRRRRRRRRR.', 'WWRRRRRRRRRRR', 'WWRRRRRRRRRRR', 'WWRhRRRRRRRRR', 'WWRRhhRRRRRRd', 'WWRRRRhRRRRRd', 'WW.RRRRRRRRd.', '....dddddd...']
const GLOVE_C = { R: '#e8382c', h: '#ff8a6a', d: '#9c1d1d', W: '#f3ead8' }
const NOODLES = ['.....c...c...', '......c.c....', '..yYyYyYyYy..', '.yYyYyYyYyYy.', 'RRRRRRRRRRRRR', '.RRWRRWRRWRR.', '..RRRRRRRRR..', '....RRRRR....']
const NOODLE_C = { c: '#d9a35c', y: '#ffe08a', Y: '#f2b84b', R: '#e8445a', W: '#ffd1d8' }
const SUSHI = ['.OOOOO.OOOOO.', 'OoOoOOOoOoOOO', 'OOOOOOOOOOOOO', 'WWkWW.WWWkWW.', 'WWkWW.WWWkWW.', 'WWWWW.WWWWWW.']
const SUSHI_C = { O: '#ff8a5c', o: '#ffd0b8', W: '#fbf6ec', k: '#24323a' }
const TACO = ['..gGrgGrg...', '.gGrgGgrgG..', 'YYYYYYYYYYY.', 'YyYYYYYYYyYY', 'YYYYYYYYYYYY', '.YYYYYYYYYY.']
const TACO_C = { g: '#7fd36b', G: '#4fa84a', r: '#e8445a', Y: '#f7c948', y: '#d99a2b' }
const PAN = ['BBBBBBBBBBBBBBB', '.BbbbbbbbbbbbB.', '..BBBBBBBBBBB..']
const PAN_C = { B: '#f7c948', b: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// the star's own squash (mirrors startalk's hop maths) so the scale stays seated on the tip
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
function tipOf(t, r, size, pop, { squash = 0, hops, seed = 1 }) {
  const s = size * pop, cell = s >= 56 ? Math.max(1, Math.round(s / 28)) : s / 28, S = cell * 28
  const sq = squash + hopState(t, hops).sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sy = 1 - sq * 0.9, base = S * 0.32
  return { x: r.x, y: r.y + base - (S / 2 + base - cell * 1.2) * sy, cell }
}

// ── layout
const LIB_P = { x: 250, y: 1180, size: 270 }, ARI_P = { x: 855, y: 1185, size: 250 }
const POST = { x: 540, top: 560, bot: 1350 }
const ROAD_Y = 1352
const TRUCK = { x: 572, w: 62, h: 36, c: 5 }               // cells
const ARM = 150, HANG = 96

// the beam angle: see-saws faster and faster, then snaps level when the truck parks
function beam(t) {
  if (t < T.scale) return 0
  if (t < T.snap) {
    const k = prog(t, T.scale, T.snap)
    return Math.sin((t - T.scale) * (3 + 6 * k)) * lerp(0.18, 0.36, k)
  }
  const d = t - T.snap
  return 0.32 * Math.exp(-d * 6) * Math.cos(d * 22)
}

const LIB_HOPS = [T.libIn + 0.3, T.snap + 0.05, T.l1 + 0.05, T.l1 + 0.3, T.h2Land, 9.6]
const ARI_HOPS = [T.ariIn + 0.3, ...T.taps, T.truck[1], T.l2 + 0.02, T.l2 + 0.32, T.h2Land + 0.1, 9.9]

function libState(t) {
  if (t < T.scale) return { mood: 'happy' }
  if (t < T.truck[0] + 0.3) { const s = Math.sin((t - T.scale) * (3 + 6 * prog(t, T.scale, T.snap))); return { mood: 'wide', look: [s > 0 ? 1 : -1, 0], blink: false } }
  if (t < T.l1) return { mood: 'wide', look: [1, 1], blink: false }
  if (t < T.l2) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.l3) return { mood: 'happy' }
  if (t < T.h2) return { mood: 'sparkle', look: [0, 0] }
  return { mood: 'heart' }
}
function ariState(t) {
  if (t < T.taps[0]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.truck[0] + 0.3) return { mood: t > 2.4 ? 'eyeroll' : 'squint', look: [-1, 0], blink: false }
  if (t < T.snap) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.l2) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.l3) return { mood: 'happy' }
  return { mood: t < T.h2 ? 'wink' : 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(['800 112px Inter', "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear Libra: Thai or | sushi, *part two.*', { top: 175, size: 90, accentSize: 140, at: T.h0, gap: 0.08, accentColor: LIB.color, wobble: true, late: 2, lateAt: T.h0 + 0.62, lineHeight: 1.05 })
  const H1 = popText(root, 'Then: a | *taco truck.*', { top: 175, size: 100, accentSize: 156, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H2 = popText(root, 'Picked. | *Finally.*', { top: 175, size: 128, accentSize: 196, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, rgb, a) {
    if (a <= 0) return
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`)
    x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  function label(text, cx, cy, col, a, sc = 1) {
    if (a <= 0) return
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(sc, sc)
    x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineWidth = 7; x.strokeStyle = INK; x.strokeText(text, 0, 0); x.fillStyle = col; x.fillText(text, 0, 0)
    x.restore()
  }

  // the crossroads: a road and a signpost (THAI one way, SUSHI the other)
  function drawRoad(t) {
    const k = clamp(prog(t, T.road, T.road + 0.4)) * popOut(t, T.out)
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    x.fillStyle = 'rgba(20,12,44,0.85)'; x.fillRect(0, ROAD_Y - 10, 1080, 120)
    x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(0, ROAD_Y - 10, 1080, 4); x.fillRect(0, ROAD_Y + 106, 1080, 4)
    x.fillStyle = 'rgba(242,199,92,0.6)'
    for (let i = 0; i < 9; i++) x.fillRect(i * 140 + 20, ROAD_Y + 48, 70, 8)
    x.restore()
  }
  function drawSign(t) {
    const k = pop01(t, T.sign, 0.4, 1.8) * popOut(t, T.out)
    if (k <= 0.01) return
    const c = 6
    x.save(); x.globalAlpha = clamp(k * 1.5)
    x.fillStyle = INK; x.fillRect(POST.x - 3 * c, lerp(POST.bot, POST.top, k), 6 * c, POST.bot - lerp(POST.bot, POST.top, k))
    x.fillStyle = '#8a6a4a'; x.fillRect(POST.x - 2 * c, lerp(POST.bot, POST.top, k), 4 * c, POST.bot - lerp(POST.bot, POST.top, k))
    x.restore()
    const sign = (text, y, dir, col, wob) => {
      x.save(); x.translate(POST.x, y); x.rotate(wob); x.scale(k, k)
      const w = 236, h = 64, tip = 34, L = dir < 0 ? -w + 30 : -30, R = dir < 0 ? 30 : w - 30
      x.beginPath()
      if (dir < 0) { x.moveTo(L - tip, 0); x.lineTo(L, -h / 2); x.lineTo(R, -h / 2); x.lineTo(R, h / 2); x.lineTo(L, h / 2) }
      else { x.moveTo(R + tip, 0); x.lineTo(R, -h / 2); x.lineTo(L, -h / 2); x.lineTo(L, h / 2); x.lineTo(R, h / 2) }
      x.closePath(); x.fillStyle = col; x.fill(); x.lineWidth = 6; x.strokeStyle = INK; x.stroke()
      x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
      x.fillText(text, (L + R) / 2 + (dir < 0 ? -10 : 10), 2)
      x.restore()
    }
    const sw = t < T.snap ? 0.04 * Math.sin(t * 5) : 0
    sign('THAI', 620, -1, '#ffd98a', sw)
    sign('SUSHI', 700, 1, '#ffb59a', -sw)
  }

  // the taco truck rolls in from the right and parks on the road
  function truckX(t) { return lerp(1500, TRUCK.x, ease.outCubic(prog(t, ...T.truck))) + (t > T.truck[1] && t < T.truck[1] + 0.3 ? Math.sin((t - T.truck[1]) * 30) * 6 * (1 - prog(t, T.truck[1], T.truck[1] + 0.3)) : 0) }
  function drawTruck(t) {
    if (t < T.truck[0]) return
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const c = TRUCK.c, W2 = TRUCK.w * c, H2 = TRUCK.h * c, cx = truckX(t), bot = ROAD_Y + 40
    const L = cx - W2 / 2, top = bot - H2
    const bob = t < T.truck[1] ? Math.abs(Math.sin(t * 24)) * 3 : 0
    x.save(); x.translate(cx, bot); x.scale(ok, ok); x.translate(-cx, -bot - bob)
    glow(cx, top + H2 * 0.4, 380, '255,190,90', 0.25)
    // body
    x.fillStyle = INK; x.fillRect(L - c, top - c, W2 + 2 * c, H2 - 4 * c)
    x.fillStyle = '#f2efe6'; x.fillRect(L, top, W2, H2 - 6 * c)
    x.fillStyle = '#e8445a'; x.fillRect(L, top + H2 - 12 * c, W2, 3 * c)
    // cab (left side: it drove in facing left)
    x.fillStyle = INK; x.fillRect(L - 12 * c, top + 10 * c, 12 * c, H2 - 14 * c)
    x.fillStyle = '#f2efe6'; x.fillRect(L - 11 * c, top + 11 * c, 11 * c, H2 - 17 * c)
    x.fillStyle = '#7fdcff'; x.fillRect(L - 10 * c, top + 12 * c, 7 * c, 7 * c)
    x.fillStyle = '#ffe08a'; x.fillRect(L - 12 * c, top + H2 - 12 * c, 2 * c, 2 * c)
    // serving window + striped awning
    const wx = L + 10 * c, ww = 40 * c, wy = top + 9 * c
    x.fillStyle = '#2a1f55'; x.fillRect(wx, wy, ww, 12 * c)
    x.fillStyle = '#ffd98a'; x.fillRect(wx, wy + 10 * c, ww, 2 * c)
    for (let i = 0; i < 10; i++) { x.fillStyle = i % 2 ? '#e8445a' : '#f2efe6'; x.fillRect(wx - 2 * c + i * 4.4 * c, wy - 4 * c, 4.4 * c, 4 * c) }
    x.fillStyle = INK; x.fillRect(wx - 2 * c, wy - 5 * c, 44 * c, c)
    // a taco on the counter
    drawBits(x, TACO, TACO_C, wx + ww * 0.7, wy + 7 * c, 4)
    // roof sign
    const sk = pop01(t, T.truck[1] - 0.05, 0.3, 2.4)
    x.save(); x.translate(cx + 4 * c, top - 6 * c); x.scale(sk, sk)
    x.fillStyle = INK; x.fillRect(-19 * c, -5 * c, 38 * c, 10 * c)
    x.fillStyle = '#f7c948'; x.fillRect(-18 * c, -4 * c, 36 * c, 8 * c)
    x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('TACOS', 0, 3)
    x.restore()
    // wheels
    for (const wxp of [L - 6 * c, L + W2 - 12 * c]) {
      x.fillStyle = INK; x.fillRect(wxp - 5 * c, bot - 8 * c, 10 * c, 10 * c)
      x.fillStyle = '#4a3f6e'; x.fillRect(wxp - 3 * c, bot - 6 * c, 6 * c, 6 * c)
      x.fillStyle = '#c9c0dc'; x.fillRect(wxp - c, bot - 4 * c, 2 * c, 2 * c)
    }
    x.restore()
    // steam from the window once parked
    if (t > T.truck[1]) for (let i = 0; i < 3; i++) {
      const ph = (t * 0.7 + i * 0.33) % 1
      x.fillStyle = `rgba(239,230,214,${0.45 * Math.sin(Math.PI * ph) * ok})`
      x.fillRect(Math.round(cx - 60 + i * 40 + Math.sin(ph * 6 + i) * 8), Math.round(top - 80 - ph * 80), 8, 8)
    }
  }

  // Libra's scale on its head
  function drawScale(t, r, opts, pop) {
    const tp = tipOf(t, r, LIB_P.size, pop, opts)
    const c = 7, a = beam(t), px = tp.x, py = tp.y - 110
    x.save(); x.globalAlpha = clamp(prog(t, T.scale, T.scale + 0.2)) * clamp(pop)
    if (x.globalAlpha <= 0) { x.restore(); return }
    x.fillStyle = INK; x.fillRect(px - 2.5 * c, py - c, 5 * c, tp.y - py + c)
    x.fillStyle = '#f7c948'; x.fillRect(px - 1.5 * c, py, 3 * c, tp.y - py)
    x.fillStyle = INK; x.fillRect(px - 5 * c, tp.y - 2 * c, 10 * c, 3 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(px - 4 * c, tp.y - c, 8 * c, c)
    drawBits(x, ['.y.', 'yYy', '.y.'], { y: '#f7c948', Y: '#fff1c8' }, px, py - 2 * c, c)
    x.save(); x.translate(px, py); x.rotate(a)
    x.fillStyle = INK; x.fillRect(-ARM - c, -1.5 * c, 2 * ARM + 2 * c, 3 * c)
    x.fillStyle = '#f7c948'; x.fillRect(-ARM, -c / 2 - 2, 2 * ARM, c + 4)
    x.restore()
    const snapped = t >= T.snap
    ;[-1, 1].forEach(s => {
      const ex = px + Math.cos(a) * ARM * s, ey = py + Math.sin(a) * ARM * s
      const bx = ex, by = ey + HANG
      x.fillStyle = 'rgba(255,241,200,0.85)'
      for (let k = 0; k <= 8; k++) { const f = k / 8; x.fillRect(Math.round(lerp(ex, bx - 46, f)) - 2, Math.round(lerp(ey, by - 8, f)), 4, 5); x.fillRect(Math.round(lerp(ex, bx + 46, f)) - 2, Math.round(lerp(ey, by - 8, f)), 4, 5) }
      if (!snapped) drawBits(x, s < 0 ? NOODLES : SUSHI, s < 0 ? NOODLE_C : SUSHI_C, bx, by - 28, 6)
      else drawBits(x, TACO, TACO_C, bx, by - 26, 6 * (0.6 + 0.4 * easeOutBack(prog(t, T.snap, T.snap + 0.3), 2.6)))
      drawBits(x, PAN, PAN_C, bx, by + 2, 6)
      const la = clamp(prog(t, T.scale + 0.3, T.scale + 0.5))
      if (!snapped) label(s < 0 ? 'THAI?' : 'SUSHI?', bx, by + 44, BONE, la)
    })
    if (snapped) {
      const b = 1 + 0.25 * Math.exp(-(t - T.snap) * 5) * Math.sin((t - T.snap) * 18)
      label('TACOS!', px, py - 58, GOLD, clamp(prog(t, T.snap, T.snap + 0.15)), b)
    }
    x.restore()
    sparkles(t, px, py + 40, T.snap, 10, 170, 1)
  }

  function drawGloves(t, r, pop) {
    const up = t >= T.l2 && t < T.l3 + 0.3 ? easeOutBack(prog(t, T.l2, T.l2 + 0.25), 2) : 0
    const tap = T.taps.some(h => t > h && t < h + 0.2) ? 8 : 0
    const gc = 6 * pop
    const ly = r.y + 30 - up * 150 + tap, gxL = r.x - 120 - up * 10, gxR = r.x + 120 + up * 10
    drawBits(x, GLOVE, GLOVE_C, gxL, ly, gc, { flip: true, rot: lerp(-0.2, -0.7, up) })
    drawBits(x, GLOVE, GLOVE_C, gxR, ly + 10, gc, { rot: lerp(0.2, 0.7, up) })
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const lp = pop01(t, T.libIn, 0.38, 2.2) * ok, ap = pop01(t, T.ariIn, 0.38, 2.2) * ok
    const lOpts = { color: LIB.color, glyph: LIB.glyph, ...libState(t), hops: LIB_HOPS, pop: lp, seed: 2, glow: 1.1 }
    const rL = drawStarChar(x, LIB_P.x, LIB_P.y, LIB_P.size, t, lOpts)
    if (lp > 0.02) drawScale(t, rL, lOpts, lp)
    const rA = drawStarChar(x, ARI_P.x, ARI_P.y, ARI_P.size, t, { color: ARI.color, glyph: ARI.glyph, ...ariState(t), hops: ARI_HOPS, pop: ap, seed: 7, glow: 1.1 })
    if (ap > 0.02) drawGloves(t, rA, ap)
    sparkles(t, rA.x, rA.y - 60, T.l2 + 0.05, 10, 200, 3, [GOLD, '#ff6a4a', BONE])
    if (t > T.h2) for (let i = 0; i < 6; i++) {
      const born = T.h2 + 0.1 + i * 0.22, p = (t - born) / 1.1
      if (p <= 0 || p >= 1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, (rL.x + rA.x) / 2 + (i % 2 ? 1 : -1) * (60 + i * 20), rL.y - 150 - p * 200, 7, { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.45, SKY_H.zoom, ss), dy: lerp(-22, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        drawRoad(t)
        drawSign(t)
        drawTruck(t)
        if (t >= T.truck[1]) drawGhostCameo(x, t, { x: truckX(t) + 70, y: ROAD_Y + 40 - TRUCK.h * TRUCK.c - 11 * TRUCK.c, at: T.ghost, dur: 1.3, from: 'below', cell: 4 })
        drawStars(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 8.68 ("Then: a taco truck." → "Picked. Finally.").
const CUTS = [{ t: 8.68, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.08, 0), ['pop', T.h0 + 0.62, 1046.5, 0.04, 0], ['pop', T.h0 + 0.72, 1174.66, 0.04, 0],
  ['pop', T.sign + 0.05, 523.25, 0.03, 0], ['pop', T.libIn + 0.05, 659.25, 0.04, -0.3], ['pop', T.ariIn + 0.05, 783.99, 0.04, 0.3],
  ['pop', T.scale + 0.05, 1046.5, 0.03, -0.3],
  ...T.taps.map(h => ['tick', h + 0.05, 0.045]),
  ...[1.2, 1.9, 2.5, 3.0, 3.4].map((tt, i) => ['tick', tt, 0.025 + i * 0.004]),
  // the truck
  ['whoosh', T.truck[0], 0.8, 0.045], ['pop', T.truck[1], 440, 0.04, 0.2], ['tick', T.truck[1] + 0.02, 0.05],
  ['bell', T.snap, 1567.98, 0.04, 1.4, -0.3], ['glitter', T.snap, T.snap + 0.5], ['pop', T.snap + 0.05, 1046.5, 0.04, -0.3],
  ...wordPops(T.h1, 2, 0.08, 2), ['pop', T.h1Land, 1046.5, 0.045, 0], ['pop', T.h1Land + 0.1, 1174.66, 0.04, 0],
  ['pop', T.open, 659.25, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { '♎ LIBRA STAR': 880, '♈ ARIES STAR': 523.25 } }),
  ['boom', T.l2 + 0.02, 0.12], ['glitter', T.l2 + 0.05, T.l2 + 0.4],
  // last line
  ...wordPops(T.h2, 1, 0.1, 1, 0.028), ['pop', T.h2Land, 1174.66, 0.055, 0], ['pluck', T.h2Land, 1046.5, 0.05, 0.7, 0], ['bell', T.h2Land + 0.1, 1318.51, 0.025, 1.0, 0],
  ['pop', T.close, 783.99, 0.03, 0], ['pop', T.close + 0.07, 523.25, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
