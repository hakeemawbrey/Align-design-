// st4loop (15 s vertical Align ad, Star Talk season 4 · EP 002, thread F: Gemini × Sagittarius) · story 0–10.6.
//   0.00–2.85  "Dear Houston: | the *Loop.*"  A pixel freeway ring (the 610 Loop, drawn generic) around a generic skyline.
//              A little red convertible laps it: Sagittarius (backpack in the back) drives, Gemini rides shotgun. A green
//              lap board ticks LAP 7 → 8 → 9. An exit ramp's sign says "EXIT · WHAT ARE WE?".
//              The ghost leans out from behind the tallest tower (3.4–4.75).
//   2.85–8.70  ♊ GEMINI: "we've been 'talking' for 9 laps." → THE STARS: "pick an exit. ask what you *are*." (the board
//              flips to LAP 10 mid-advice; both go wide-eyed). They take the exit (7.45) and go happy.
//   8.80 cut → "Take the *exit.*"  The car on the ramp under the exit sign, both heart-eyed. Out by 10.45.
// Screwed score: Houston's own slowed-down sound. Pure f(t).
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
const EP = 2
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', SIGN = '#1f7a4c', SIGN_D = '#145a37'
const MONO = "'Space Mono', ui-monospace, monospace"
const GEM = signStar('gemini'), SAG = signStar('sagittarius')

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.6, ghost: 3.4, open: 2.72, l1: 2.95, h0Out: [5.7, 5.88],
  l2: 5.95, h1: 5.95, h1Land: 6.35, exit: 7.45, close: 8.7, h1Out: [8.56, 8.74],
  cut: 8.8, h2: 8.86, h2Land: 9.26, heart: 9.4, h2Out: [10.15, 10.4], out: [10.05, 10.45],
}
const GEM_TAG = `${GEM.glyph} GEMINI STAR`, SKY_TAG = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: GEM_TAG, color: GEM.color, text: "we've been 'talking' for *9 laps.*" },
  { t: T.l2, speaker: SKY_TAG, text: 'pick an exit. ask what you *are*.' },
]
const CPS = 28

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const PACK = ['...SSSS...', '..S....S..', '.PPPPPPPP.', 'PPPPPPPPPP', 'PppppppppP', 'PPPFFFFPPP', 'PPPFffFPPP', 'PPPFFFFPPP', 'PPPPPPPPPP', '.PPPPPPPP.']
const PACK_C = { S: '#5a3a1e', P: '#c47a3a', p: '#8a4f22', F: '#e89a52', f: '#fff1c8' }

// ── the loop: a flattened ring road around the skyline
const RING = { cx: 540, cy: 1070, rx: 430, ry: 230, w: 72 }
// lap position (laps, fractional): brisk to the drop, then cruising
const LAP0 = 6.85
const laps = t => t < 2.87 ? LAP0 + 0.75 * t : LAP0 + 0.75 * 2.87 + 0.3 * (t - 2.87)
const LAP_EXIT = laps(T.exit)
// angle: lap boundary at the top of the ring (−π/2), clockwise on screen
const angle = L => -Math.PI / 2 + (L % 1) * Math.PI * 2
const RAMP = [[0, 0], [110, 60], [220, 130], [300, 190]]       // offsets from the exit point, down-right
const exitPt = () => { const a = angle(LAP_EXIT); return [RING.cx + Math.cos(a) * RING.rx, RING.cy + Math.sin(a) * RING.ry] }

// skyline in the middle (explicit, generic)
const TOWERS = [[300, 64, 170, 0], [370, 58, 240, 1], [434, 76, 340, 2], [516, 70, 400, 3], [592, 60, 300, 1], [658, 76, 250, 0], [740, 54, 180, 2]]
const TALL = TOWERS[3]
const SKY_BASE = RING.cy + 10

function carState(t) {
  if (t < T.exit) {
    const L = laps(t), a = angle(L)
    return { x: RING.cx + Math.cos(a) * RING.rx, y: RING.cy + Math.sin(a) * RING.ry, face: Math.sin(a) < 0 ? 1 : -1, back: Math.sin(a) < -0.05, s: lerp(0.8, 1.04, (Math.sin(a) + 1) / 2) }
  }
  const [ex, ey] = exitPt(), p = ease.inOutQuad(prog(t, T.exit, T.exit + 1.2))
  const seg = p * (RAMP.length - 1), i = Math.min(RAMP.length - 2, Math.floor(seg)), f = seg - i
  return { x: ex + lerp(RAMP[i][0], RAMP[i + 1][0], f), y: ey + lerp(RAMP[i][1], RAMP[i + 1][1], f), face: 1, back: false, s: 1.04 + 0.1 * p }
}

function gemState(t) {
  if (t < T.l1 - 0.1) return { mood: 'eyeroll' }                         // lap 9 of going in circles
  if (t < T.l2) return { mood: 'wide', look: [1, 0] }
  if (t < T.exit) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
function sagState(t) {
  if (t < T.l1 + 0.6) return { mood: 'sleepy' }
  if (t < T.l2) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.exit) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
const GEM_HOPS = [...talkHops(LINES, GEM_TAG, { cps: CPS }), T.exit + 0.1, T.h2Land]
const SAG_HOPS = [T.l2 + 0.3, T.exit + 0.2, T.h2Land + 0.08]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 44px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear Houston: | the *Loop.*', { top: 190, size: 112, accentSize: 176, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'Circles are | *not* a plan.', { top: 190, size: 112, accentSize: 150, at: T.h1, late: 0, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Take the *exit.*', { top: 230, size: 150, accentSize: 210, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Land, wobble: true, accentColor: '#7dffb0' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, GEM.color]) {
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

  // ── the ring road (cells), the infield, the ramp
  function drawRoad(t) {
    const c = 8, { cx, cy, rx, ry, w } = RING
    // infield ground
    x.fillStyle = '#141a33'
    for (let j = -ry + w / 2; j <= ry - w / 2; j += c) { const hw = (rx - w / 2) * Math.sqrt(Math.max(0, 1 - (j / (ry - w / 2)) ** 2)); x.fillRect(Math.round(cx - hw), cy + j, Math.round(2 * hw), c) }
    // the ramp (behind the ring's lip)
    const [ex, ey] = exitPt()
    for (let k = 0; k < 40; k++) {
      const f = k / 39, seg = f * (RAMP.length - 1), i = Math.min(RAMP.length - 2, Math.floor(seg)), g = seg - i
      const px = ex + lerp(RAMP[i][0], RAMP[i + 1][0], g), py = ey + lerp(RAMP[i][1], RAMP[i + 1][1], g)
      x.fillStyle = INK; x.fillRect(Math.round(px - 44), Math.round(py - 24), 88, 48)
    }
    for (let k = 0; k < 40; k++) {
      const f = k / 39, seg = f * (RAMP.length - 1), i = Math.min(RAMP.length - 2, Math.floor(seg)), g = seg - i
      const px = ex + lerp(RAMP[i][0], RAMP[i + 1][0], g), py = ey + lerp(RAMP[i][1], RAMP[i + 1][1], g)
      x.fillStyle = '#3a3658'; x.fillRect(Math.round(px - 38), Math.round(py - 18), 76, 36)
      if (k % 6 < 3) { x.fillStyle = '#f2c75c'; x.fillRect(Math.round(px - 3), Math.round(py - 3), 6, 6) }
    }
    // the ring band, pixel by pixel
    for (let a = 0; a < 720; a++) {
      const th = a / 720 * Math.PI * 2
      const ox = Math.cos(th), oy = Math.sin(th)
      for (let r = -w / 2; r <= w / 2; r += c) {
        const px = Math.round((cx + ox * (rx + r)) / c) * c, py = Math.round((cy + oy * (ry + r * ry / rx * 1.4)) / c) * c
        const edge = Math.abs(r) > w / 2 - c
        x.fillStyle = edge ? INK : '#3a3658'
        x.fillRect(px, py, c, c)
      }
    }
    // lane dashes drifting with the traffic
    const off = (t * 0.06) % 1
    for (let k = 0; k < 48; k++) {
      if (k % 2) continue
      const th = ((k + off * 2) / 48) * Math.PI * 2
      x.fillStyle = 'rgba(242,199,92,0.85)'
      x.fillRect(Math.round(cx + Math.cos(th) * rx) - 4, Math.round(cy + Math.sin(th) * ry) - 3, 10, 6)
    }
  }
  function drawSkyline(t) {
    for (const [tx, tw, th, roof] of TOWERS) {
      const top = SKY_BASE - th
      x.fillStyle = '#2a2156'; x.fillRect(tx - 3, top - 3, tw + 6, th + 3)
      x.fillStyle = '#151034'; x.fillRect(tx, top, tw, th)
      x.fillStyle = '#1d1645'; x.fillRect(tx, top, Math.round(tw * 0.3), th)
      if (roof === 2) { x.fillStyle = '#2a2156'; x.fillRect(tx + tw / 2 - 3, top - 60, 6, 60); if (Math.sin(t * 3 + tx) > 0.2) { x.fillStyle = '#ff5c6e'; x.fillRect(tx + tw / 2 - 5, top - 68, 10, 10) } }
      if (roof === 3) { x.fillStyle = '#151034'; for (let k = 0; k < 4; k++) x.fillRect(tx + k * 6, top - (4 - k) * 8, tw - k * 12, 8) }
      for (let wy = top + 14; wy < SKY_BASE - 16; wy += 22) for (let wx = tx + 9; wx < tx + tw - 12; wx += 16) {
        const v = Math.abs(Math.sin(wx * 12.9898 + wy * 78.233) * 43758.5453) % 1
        if (v > 0.4) continue
        x.fillStyle = v < 0.08 ? '#ffe9b0' : v < 0.2 ? '#f7cf68' : '#c99a4a'; x.fillRect(wx, wy, 8, 10)
      }
    }
  }
  // the green lap board, top of the ring
  function drawLapBoard(t) {
    const L = Math.min(laps(t), LAP_EXIT), n = Math.floor(L)
    const bx = 292, by = 610, bw = 450, bh = 132
    x.fillStyle = INK; x.fillRect(bx - 8, by + bh / 2, 16, 130)
    x.fillStyle = '#4a4d6e'; x.fillRect(bx - 4, by + bh / 2, 8, 130)
    x.fillStyle = INK; x.fillRect(bx - bw / 2 - 8, by - bh / 2 - 8, bw + 16, bh + 16)
    x.fillStyle = BONE; x.fillRect(bx - bw / 2 - 3, by - bh / 2 - 3, bw + 6, bh + 6)
    x.fillStyle = SIGN; x.fillRect(bx - bw / 2, by - bh / 2, bw, bh)
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 44px ${MONO}`; x.fillStyle = BONE
    x.font = `700 34px ${MONO}`; x.fillText('610 LOOP', bx, by - 34)
    // the lap number flips (a little roll) when it changes
    const since = (L - n) / (t < 2.87 ? 0.75 : 0.3)
    const flip = t >= T.exit ? 1 : clamp(since / 0.22)
    x.save(); x.beginPath(); x.rect(bx - bw / 2 + 10, by - 10, bw - 20, bh / 2); x.clip()
    x.fillStyle = n === 9 ? GOLD : '#ffe9b0'
    x.font = `700 52px ${MONO}`
    x.fillText(`LAP ${n}`, bx, by + 26 + (1 - ease.outBack(flip)) * 60)
    if (flip < 1) x.fillText(`LAP ${n - 1}`, bx, by + 26 - ease.outBack(flip) * 60)
    x.restore()
  }
  // the exit sign by the ramp
  function drawExitSign(t, glow) {
    const bx = 790, by = 610, bw = 450, bh = 132
    const lit = glow > 0 ? 0.5 + 0.5 * Math.sin(t * 9) : 0
    x.fillStyle = INK; x.fillRect(bx + 150, by + bh / 2, 14, 120)
    x.fillStyle = INK; x.fillRect(bx - bw / 2 - 8, by - bh / 2 - 8, bw + 16, bh + 16)
    x.fillStyle = glow > 0 ? `rgb(${Math.round(lerp(239, 255, lit))},${Math.round(lerp(230, 236, lit))},${Math.round(lerp(214, 150, lit))})` : BONE
    x.fillRect(bx - bw / 2 - 3, by - bh / 2 - 3, bw + 6, bh + 6)
    x.fillStyle = SIGN; x.fillRect(bx - bw / 2, by - bh / 2, bw, bh)
    x.fillStyle = SIGN_D; x.fillRect(bx - bw / 2, by + bh / 2 - 10, bw, 10)
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
    x.font = `700 34px ${MONO}`; x.fillText('EXIT ↘', bx, by - 34)
    x.font = `700 44px ${MONO}`; x.fillStyle = glow > 0 ? '#ffe9b0' : BONE; x.fillText('WHAT ARE WE?', bx, by + 26)
  }

  // the car + its two stars
  function drawCar(t, P, ok, big = 1) {
    const s = P.s * big, c = 10 * s
    const gp = { ...gemState(t) }, sp = { ...sagState(t) }
    x.save(); x.translate(Math.round(P.x), Math.round(P.y))
    const bounce = Math.sin(t * 9) > 0.7 ? -c * 0.4 : 0
    // seats: Sagittarius drives (front), Gemini rides along (back seat side)
    const front = 4.5 * c * P.face, rear = -6 * c * P.face
    const starSize = 132 * s
    // backpack in the boot
    drawBits(x, PACK, PACK_C, Math.round(-11.5 * c * P.face), Math.round(-11 * c + bounce), c * 0.85, { alpha: ok })
    drawStarChar(x, rear, -8 * c - starSize * 0.3 + bounce, starSize, t, { color: GEM.color, glyph: GEM.glyph, ...gp, hops: GEM_HOPS, pop: ok, seed: 4, glow: 0.9 })
    drawStarChar(x, front, -8 * c - starSize * 0.3 + bounce, starSize, t, { color: SAG.color, glyph: SAG.glyph, ...sp, hops: SAG_HOPS, pop: ok, seed: 9, glow: 0.9 })
    x.save(); x.scale(P.face, 1); x.globalAlpha = clamp(ok * 2)
    // body
    x.fillStyle = INK; x.fillRect(-14 * c, -9 * c + bounce, 28 * c, 7.5 * c)
    x.fillStyle = '#e8445a'; x.fillRect(-13 * c, -8 * c + bounce, 26 * c, 5.5 * c)
    x.fillStyle = '#ff7a8a'; x.fillRect(-13 * c, -8 * c + bounce, 26 * c, 1.2 * c)
    x.fillStyle = '#b02a44'; x.fillRect(-13 * c, -3.8 * c + bounce, 26 * c, 1.3 * c)
    x.fillStyle = BONE; x.fillRect(-1 * c, -6.2 * c + bounce, 1 * c, 1.2 * c)
    // windshield
    x.fillStyle = INK; x.fillRect(8 * c, -13.5 * c + bounce, 2.4 * c, 5.6 * c)
    x.fillStyle = '#8fd3ff'; x.fillRect(8.6 * c, -12.9 * c + bounce, 1.2 * c, 4.6 * c)
    // lights
    x.fillStyle = '#fff1c8'; x.fillRect(12 * c, -7.2 * c + bounce, 1.2 * c, 1.6 * c)
    x.fillStyle = '#ff5c6e'; x.fillRect(-13.2 * c, -7.2 * c + bounce, 1.2 * c, 1.6 * c)
    // wheels
    for (const wx of [-8, 8]) {
      x.fillStyle = INK; x.fillRect((wx - 2.6) * c, -3.4 * c, 5.2 * c, 4.6 * c)
      x.fillStyle = '#4a4d6e'; x.fillRect((wx - 1.6) * c, -2.4 * c, 3.2 * c, 2.6 * c)
      const spin = Math.floor(t * 12) % 2
      x.fillStyle = BONE; x.fillRect((wx - 0.4 + (spin ? 0.6 : -0.6)) * c, -1.6 * c, 0.8 * c, 0.8 * c)
    }
    x.restore()
    // exhaust puffs
    for (let k = 0; k < 3; k++) {
      const ph = (t * 1.6 + k / 3) % 1
      x.globalAlpha = (1 - ph) * 0.5 * ok; x.fillStyle = '#b9b0d8'
      x.fillRect(Math.round((-15 - ph * 8) * c * P.face), Math.round(-4 * c - ph * 3 * c), Math.round(c * (1 + ph)), Math.round(c * (1 + ph)))
    }
    x.restore()
  }

  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.17, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 260 + Math.sin(p * 7 + i) * 18), Math.round(cy - 40 - p * 240), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      if (t < T.cut) {
        drawRoad(t)
        const P = carState(t)
        if (P.back) drawCar(t, P, 1)
        drawSkyline(t)
        drawGhostCameo(x, t, { x: TALL[0] + TALL[1], y: SKY_BASE - 250, at: T.ghost, dur: 1.35, from: 'left', cell: 3 })
        drawLapBoard(t)
        drawExitSign(t, t > T.l2 + 0.6 ? 1 : 0)
        if (!P.back) drawCar(t, P, 1)
        sparkles(t, P.x, P.y - 120, T.exit + 0.15, 12, 200, 2, ['#7dffb0', GOLD, BONE, GEM.color])
      } else {
        // after the cut: on the ramp, close up, under the exit sign
        x.save(); x.globalAlpha = outK(t, T.out)
        x.fillStyle = INK; x.fillRect(0, 1226, 1080, 12)
        x.fillStyle = '#3a3658'; x.fillRect(0, 1238, 1080, 150)
        for (let k = 0; k < 9; k++) { const xx = ((k * 150 - t * 260) % 1350 + 1350) % 1350 - 135; x.fillStyle = GOLD; x.fillRect(Math.round(xx), 1340, 70, 10) }
        x.fillStyle = '#141a33'; x.fillRect(0, 1388, 1080, 532)
        // the sign gantry
        x.save(); x.translate(0, -2)
        const bw = 640, bh = 150, by = 770
        x.fillStyle = INK; x.fillRect(150, by, 16, 440); x.fillRect(914, by, 16, 440)
        x.fillStyle = INK; x.fillRect(540 - bw / 2 - 8, by - bh / 2 - 8, bw + 16, bh + 16)
        x.fillStyle = BONE; x.fillRect(540 - bw / 2 - 3, by - bh / 2 - 3, bw + 6, bh + 6)
        x.fillStyle = SIGN; x.fillRect(540 - bw / 2, by - bh / 2, bw, bh)
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
        x.font = `700 40px ${MONO}`; x.fillText('EXIT ↘', 540, by - 34)
        x.fillStyle = '#ffe9b0'; x.font = `700 48px ${MONO}`; x.fillText('WHAT ARE WE?', 540, by + 28)
        x.restore()
        const P = { x: 540, y: 1300, face: 1, s: 1.75 }
        drawCar(t, P, ok, 1)
        if (t > T.heart) floatHearts(t, 540, 1010, T.heart, T.out[0], 3, 7)
        sparkles(t, 540, 1050, T.h2Land, 14, 330, 1, ['#7dffb0', PINK, GOLD, BONE])
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 8.8 (box shut → "Take the exit."). End card flips at 10.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
// a soft tick every time the lap board flips
const lapFlips = []
for (let n = Math.ceil(LAP0); n <= Math.floor(LAP_EXIT); n++) { const tt = n <= LAP0 + 0.75 * 2.87 ? (n - LAP0) / 0.75 : 2.87 + (n - LAP0 - 0.75 * 2.87) / 0.3; lapFlips.push(['tick', +tt.toFixed(3), 0.045], ['bell', +tt.toFixed(3), n === 9 ? 1174.66 : 880, 0.025, 0.6, 0]) }
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['whoosh', 0.4, 0.8, 0.025], ['whoosh', 1.7, 0.8, 0.025],
  ...lapFlips,
  ['pop', T.ghost + 0.1, 1318.51, 0.018, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 4, 0.07, 2, 0.025),
  ['whoosh', T.exit, 1.0, 0.04], ['pluck', T.exit + 0.1, 1174.66, 0.04, 0.6, 0], ['glitter', T.exit + 0.15, T.exit + 0.6],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, 0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
