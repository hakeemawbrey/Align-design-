// st4exit (20 s vertical Align ad, Star Talk season 4, EP 096) · story 0–15.6, then the shared end card.
//   A callback to EP 002 (st4loop): Gemini and Sagittarius circle the 610 Loop again in their little open car, round a
//   generic pixel skyline (downtown is inside the Loop). The lap sign: "LAP 1 · LAST TIME: 9".
//   0.00–5.70  "Back on | the *Loop.*"  Drop (2.82): THE STARS: "remember going in circles?" (both roll their eyes, then
//              laugh). A green overhead sign pops up on the right: "EXIT 96 · OUR PLACE ↗". Wide eyes → heart eyes.
//   5.80–9.80  "This time, | *the exit.*"  The car peels off the Loop up the ramp and away; the lap sign flips to
//              "EXIT TAKEN ✓". THE STARS: "look at you two. *going* somewhere." (The ghost peeks over a downtown tower.)
//   9.90 cut → "Going | *somewhere.*"  A little pixel house with an "OUR PLACE" plaque. The car pulls up, the two
//              stars hop out, the door opens on warm light, they hop inside together, and the window lights up with a
//              heart. Everything pops out by 15.45; the end card takes over at 15.6.
// One canvas (sky + road + car + house + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const EP = 96
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const GEM = signStar('gemini'), SAG = signStar('sagittarius')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [5.5, 5.7],
  road: [0.25, 0.85], city: 0.55, carIn: 0.8, lap2: 0, // lap2 filled below
  open: 2.66, l1: 2.82, roll: [3.75, 4.35], sign: 4.45, lookSign: 4.6, lookEach: 5.1,
  h1: 5.8, h1Land: 6.2, l2: 6.0, exit: 6.3, ramp: [6.3, 7.5], taken: 6.9,
  ghost: 7.75, close: 9.7, h1Out: [9.55, 9.75],
  cut: 9.9,
  h2: 9.98, h2Land: 10.36, park: [10.05, 10.7], hopOut: 10.85, door: 11.9, inside: [12.55, 13.15], shut: 13.35, window: 13.5,
  h2Out: [15.1, 15.35], out: [15.0, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'remember going in *circles?*' },
  { t: T.l2, speaker: SPEAK, text: 'look at you two. *going* somewhere.', color: MINT },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
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
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// ── pixel props
const CAR = [
  '..............w...',
  '.RRRRRRRRRRRRRwRR.',
  'RRRRRRRRRRRRRRRRRY',
  'RRhhhhhhhhhhhhhRRR',
  'dddddddddddddddddd',
  '..KKK........KKK..',
  '..KgK........KgK..',
]
const CAR_C = { R: '#ff5d73', h: '#ff9aa8', d: '#b8304a', Y: '#fff1a8', K: '#20183c', g: '#9a94b8', w: '#bfe9ff' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
const HOUSE = [
  '........RR........',
  '.......RRRR...cc..',
  '......RRRRRR..cc..',
  '.....RRRRRRRR.cc..',
  '....RRRRRRRRRRcc..',
  '...RRRRRRRRRRRRR..',
  '..RRRRRRRRRRRRRRR.',
  '.RRRRRRRRRRRRRRRRR',
  '..WWWWWWWWWWWWWW..',
  '..WbbbbWWWWWWWWW..',
  '..WbbbbWWWWWWWWW..',
  '..WbbbbWWWWWWWWW..',
  '..WWWWWWWWWWWWWW..',
  '..WWWWWWWWWWWWWW..',
  '..WWWWWWWWWWWWWW..',
  '..WWWWWWWWWWWWWW..',
  'gggggggggggggggggg',
]
const HOUSE_C = { R: '#e8445a', c: '#9a8a8a', W: '#fbf1dc', b: '#2b2350', g: '#4fbf6a' }

// ── layout
const RING = { x: 540, y: 1010, rx: 380, ry: 285, w: 70 }     // the Loop (centre line), road width
const OMEGA = (Math.PI * 2) / 3.6                              // one lap ≈ 3.6 s, clockwise on screen
const TH_EXIT = -0.42                                          // where the ramp leaves the ring (upper right)
const RAMP = [{ x: 0, y: 0 }, { x: 1040, y: 820 }, { x: 1200, y: 650 }]   // [0] filled from TH_EXIT
const ringPt = th => ({ x: RING.x + RING.rx * Math.cos(th), y: RING.y + RING.ry * Math.sin(th) })
RAMP[0] = ringPt(TH_EXIT)
const qb = (p, s) => ({ x: (1 - s) ** 2 * p[0].x + 2 * (1 - s) * s * p[1].x + s * s * p[2].x, y: (1 - s) ** 2 * p[0].y + 2 * (1 - s) * s * p[1].y + s * s * p[2].y })
const theta = t => TH_EXIT - OMEGA * (T.exit - t)
// the car crosses the top of the ring (θ = −π/2 mod 2π) once on its way: that's lap 2
T.lap2 = (() => { let th = -Math.PI / 2; while (th > theta(T.carIn)) th -= Math.PI * 2; while (th < theta(T.carIn)) th += Math.PI * 2; return T.exit - (TH_EXIT - th) / OMEGA })()
const SIGN = { x: 870, y: 676, w: 320, h: 118 }
const TOWERS = [[384, 66, 120], [454, 74, 170], [540, 104, 236], [628, 78, 188], [702, 66, 130]]   // [cx, w, h] on base y
const CITY_BASE = 1046
const GHOST_TOWER = TOWERS[2]
export const GHOST = { at: T.ghost, x: GHOST_TOWER[0], y: CITY_BASE - GHOST_TOWER[2], where: 'peeking over a downtown tower inside the Loop' }
const HOUSE_AT = { x: 540, y: 1165, cell: 30 }               // the house's ground row ends at y 1420
const DOOR = { x: 540 + 3 * 30, y: 1390, w: 4 * 30, h: 5 * 30 }   // on the house's right wall, on the ground row
const GROUND = 1420, STREET = 1500

/** where the car is (and its heading) at t */
function carState(t) {
  if (t < T.exit) {
    const th = theta(t)
    const p = ringPt(th)
    const vx = -Math.sin(th) * RING.rx                         // d/dθ (increasing θ = clockwise on screen)
    return { ...p, dir: vx >= 0 ? 1 : -1, on: 'ring' }
  }
  const s = ease.inQuad(prog(t, ...T.ramp))
  const p = qb(RAMP, s)
  return { ...p, dir: 1, on: 'ramp', s }
}
function gemState(t) {
  if (t < T.l1) return { mood: 'happy', look: [1, 0] }
  if (t < T.roll[0]) return { mood: 'neutral', look: [0, -1] }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.sign) return { mood: 'happy' }
  if (t < T.lookEach) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.exit + 0.2) return { mood: 'heart' }
  if (t < T.cut) return { mood: 'happy' }
  if (t < T.door) return { mood: 'sparkle', look: [0.5, -1] }
  return { mood: 'heart' }
}
function sagState(t) {
  if (t < T.l1) return { mood: 'happy', look: [-1, 0] }
  if (t < T.roll[0] + 0.1) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.roll[1]) return { mood: 'happy' }                  // laughing at it
  if (t < T.sign) return { mood: 'happy' }
  if (t < T.lookEach) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.exit + 0.2) return { mood: 'heart' }
  if (t < T.cut) return { mood: 'happy' }
  if (t < T.door) return { mood: 'sparkle', look: [-0.5, -1] }
  return { mood: 'heart' }
}
const GEM_HOPS = [T.carIn + 0.3, 1.6, 2.2, T.roll[1] + 0.05, T.sign + 0.1, T.lookEach, T.exit + 0.05, T.hopOut, 11.3, T.door + 0.15, T.inside[0]]
const SAG_HOPS = [T.carIn + 0.45, 1.9, 3.9, 4.15, T.sign + 0.18, T.lookEach + 0.1, T.exit + 0.12, T.hopOut + 0.12, 11.45, T.door + 0.25, T.inside[0] + 0.08]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Back on | the *Loop.*', { top: 200, size: 128, accentSize: 196, at: T.h0, gap: 0.09, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land })
  const H1 = popText(root, 'This time, | *the exit.*', { top: 200, size: 116, accentSize: 176, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: MINT })
  const H2 = popText(root, 'Going | *somewhere.*', { top: 200, size: 132, accentSize: 200, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, MINT]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 6, spread = 160) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.17, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      const hx = cx + side * spread + Math.sin(p * 7 + i) * 14, hy = cy - 30 - p * 180
      drawBits(x, HEART, HEART_C, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  // ── the Loop: a pixel ring road (cells), a dashed centre line that streams with the traffic
  function drawRoad(t, k) {
    if (k <= 0) return
    const c = 10, { x: cx, y: cy, rx, ry, w } = RING
    const grow = ease.outCubic(k)
    x.save(); x.globalAlpha = clamp(k * 2)
    for (let j = -Math.ceil((ry + w) / c); j <= Math.ceil((ry + w) / c); j++) for (let i = -Math.ceil((rx + w) / c); i <= Math.ceil((rx + w) / c); i++) {
      const px = i * c + c / 2, py = j * c + c / 2
      const ang = Math.atan2(py / ry, px / rx)
      // drawn on clockwise from the left as it grows in
      const a01 = ((ang + Math.PI) / (Math.PI * 2))
      if (a01 > grow) continue
      const d = Math.hypot(px / rx, py / ry)                    // 1 on the centre line
      const half = (w / 2) / ((rx + ry) / 2)
      const off = d - 1
      if (Math.abs(off) > half + 0.03) continue
      let col = '#3b3560'
      if (Math.abs(off) > half) col = INK
      else if (Math.abs(off) > half - 0.03) col = '#6b6290'
      else if (Math.abs(off) < 0.018) {
        const along = (ang * (rx + ry) / 2) / 28 + t * 2.2
        if (Math.floor(along) % 2 === 0) col = '#f2e6b8'
      }
      x.fillStyle = col; x.fillRect(cx + i * c, cy + j * c, c + 0.5, c + 0.5)
    }
    x.restore()
  }
  function drawRamp(t, k) {
    if (k <= 0) return
    const c = 10
    x.save(); x.globalAlpha = clamp(k)
    for (let pass = 0; pass < 3; pass++) for (let s = 0; s <= 1; s += 0.006) {
      if (s > k) break
      const p = qb(RAMP, s)
      const r = pass === 0 ? 34 : pass === 1 ? 28 : 3
      if (pass === 2 && Math.floor(s * 40 - t * 2) % 2) continue
      x.fillStyle = pass === 0 ? INK : pass === 1 ? '#3b3560' : '#f2e6b8'
      const gx0 = Math.round((p.x - r) / c) * c, gy0 = Math.round((p.y - r) / c) * c
      x.fillRect(gx0, gy0, Math.round(2 * r / c) * c, Math.round(2 * r / c) * c)
    }
    x.restore()
  }
  // ── downtown inside the Loop: generic pixel towers with lit windows (no landmarks, no logos)
  function drawCity(t, k) {
    TOWERS.forEach(([tx, tw, th], n) => {
      const p = pop01(t, T.city + n * 0.07, 0.35, 1.8) * k
      if (p <= 0.01) return
      const h = th * p, x0 = Math.round(tx - tw / 2), y0 = Math.round(CITY_BASE - h)
      x.fillStyle = INK; x.fillRect(x0 - 6, y0 - 6, tw + 12, h + 6)
      x.fillStyle = n % 2 ? '#2e2a5c' : '#3a3470'; x.fillRect(x0, y0, tw, h)
      x.fillStyle = '#4a4386'; x.fillRect(x0, y0, 8, h)
      for (let wy = y0 + 16; wy < CITY_BASE - 14; wy += 22) for (let wx = x0 + 14; wx < x0 + tw - 10; wx += 18) {
        const lit = ((wx * 7 + wy * 13 + n * 5) % 5) < 2 + (Math.sin(t * 0.7 + wx) > 0.6 ? 1 : 0)
        x.fillStyle = lit ? '#ffd98a' : '#231d47'; x.fillRect(wx, wy, 8, 10)
      }
      if (n === 2) { x.fillStyle = INK; x.fillRect(tx - 3, y0 - 34, 6, 30); x.fillStyle = Math.sin(t * 5) > 0 ? '#ff5d73' : '#7a2a3a'; x.fillRect(tx - 5, y0 - 40, 10, 10) }
    })
  }
  function drawLapSign(t, k) {
    if (k <= 0) return
    const y = 1104, taken = prog(t, T.taken, T.taken + 0.25)
    x.save(); x.globalAlpha = clamp(k); x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillRect(390, y - 36, 300, 104); x.fillStyle = '#1f6b4a'; x.fillRect(396, y - 30, 288, 92)
    x.fillStyle = 'rgba(255,255,255,0.75)'; x.fillRect(402, y - 24, 276, 3); x.fillRect(402, y + 55, 276, 3)
    if (taken < 0.5) {
      const lap = t < T.lap2 ? 1 : 2
      const bump = t > T.lap2 && t < T.lap2 + 0.3 ? 1 + 0.25 * Math.sin(Math.PI * (t - T.lap2) / 0.3) : 1
      x.save(); x.translate(540, y + 2); x.scale(bump, bump)
      x.font = `700 40px ${MONO}`; x.fillStyle = BONE; x.fillText(`LAP ${lap}`, 0, 0); x.restore()
      x.font = `700 22px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.72)'; x.fillText('LAST TIME: 9', 540, y + 38)
    } else {
      const s = easeOutBack(prog(t, T.taken + 0.12, T.taken + 0.45), 2.4)
      x.save(); x.translate(540, y + 18); x.scale(s, s)
      x.font = `700 34px ${MONO}`; x.fillStyle = MINT; x.fillText('EXIT TAKEN ✓', 0, 0); x.restore()
    }
    x.restore()
  }
  function drawExitSign(t, k) {
    const p = pop01(t, T.sign, 0.4, 2.2) * k
    if (p <= 0.01) return
    const { x: sx, y: sy, w, h } = SIGN
    x.save(); x.translate(sx, sy + (1 - p) * -40); x.scale(p, p)
    // posts
    x.fillStyle = INK; x.fillRect(-w / 2 + 30, h / 2 - 4, 16, 120); x.fillRect(w / 2 - 46, h / 2 - 4, 16, 120)
    x.fillStyle = '#8a86a8'; x.fillRect(-w / 2 + 34, h / 2, 8, 112); x.fillRect(w / 2 - 42, h / 2, 8, 112)
    // board
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    const glow = 0.5 + 0.5 * Math.sin(t * 6)
    x.fillStyle = '#1f7a50'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = 'rgba(255,255,255,0.85)'; x.fillRect(-w / 2 + 6, -h / 2 + 6, w - 12, 3); x.fillRect(-w / 2 + 6, h / 2 - 9, w - 12, 3)
    x.fillRect(-w / 2 + 6, -h / 2 + 6, 3, h - 12); x.fillRect(w / 2 - 9, -h / 2 + 6, 3, h - 12)
    // EXIT 96 tab
    x.fillStyle = INK; x.fillRect(-w / 2 + 14, -h / 2 - 40, 150, 40); x.fillStyle = '#ffd23f'; x.fillRect(-w / 2 + 18, -h / 2 - 36, 142, 34)
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 24px ${MONO}`; x.fillStyle = INK; x.fillText('EXIT 96', -w / 2 + 89, -h / 2 - 18)
    x.font = `700 38px ${MONO}`; x.fillStyle = '#ffffff'; x.fillText('OUR PLACE', -20, 4)
    // a pixel up-right arrow, pulsing
    x.save(); x.translate(w / 2 - 40, 0); x.globalAlpha = 0.7 + 0.3 * glow
    const A = ['..XXXX', '....XX', '...X.X', '..X..X', '.X....', 'X.....']
    drawBits(x, A, { X: '#ffffff' }, 0, 0, 6, { outline: null })
    x.restore()
    x.restore()
  }
  function drawCar(t, c, flip, pop = 1) {
    drawBits(x, CAR, CAR_C, Math.round(c.x), Math.round(c.y), 12 * pop, { flip })
  }
  /** the two stars riding in the car (sitting a little into it) */
  function riders(t, c, pop, size = 140) {
    const order = c.dir >= 0 ? [-1, 1] : [1, -1]
    const gx = c.x + order[0] * 48, sx2 = c.x + order[1] * 48, y = c.y - 48
    drawStarChar(x, gx, y, size * pop, t, { color: GEM.color, glyph: null, ...gemState(t), hops: GEM_HOPS, seed: 4, glow: 0.9, tips: false })
    drawStarChar(x, sx2, y - 4, size * pop, t, { color: SAG.color, glyph: null, ...sagState(t), hops: SAG_HOPS, seed: 9, glow: 0.9, tips: false })
    return { gx, sx: sx2, y }
  }
  function drawStreet(t, k) {
    const p = ease.outCubic(prog(t, T.cut - 0.02, T.cut + 0.3)) * k
    if (p <= 0.01) return
    x.save(); x.globalAlpha = clamp(p)
    x.fillStyle = INK; x.fillRect(0, GROUND - 6, 1080, 6)
    x.fillStyle = '#3f9a58'; x.fillRect(0, GROUND, 1080, 30); x.fillStyle = '#4fbf6a'; for (let i = 0; i < 1080; i += 20) x.fillRect(i, GROUND, 10, 10)
    x.fillStyle = '#8a86a8'; x.fillRect(0, GROUND + 30, 1080, 20); x.fillStyle = INK; x.fillRect(0, GROUND + 50, 1080, 6)
    x.fillStyle = '#3b3560'; x.fillRect(0, GROUND + 56, 1080, 120); x.fillStyle = '#f2e6b8'
    for (let i = 0; i < 1080; i += 80) x.fillRect(i + 10, GROUND + 112, 44, 8)
    x.fillStyle = INK; x.fillRect(0, GROUND + 176, 1080, 6)
    // the front path from the door to the kerb
    x.fillStyle = '#c9b48a'; x.fillRect(DOOR.x - 40, GROUND, 80, 30)
    x.restore()
  }
  function drawHouse(t, k) {
    const p = pop01(t, T.cut + 0.02, 0.45, 1.6) * k
    if (p <= 0.01) return
    const { x: hx, y: hy, cell } = HOUSE_AT
    drawBits(x, HOUSE, HOUSE_C, hx, hy + (1 - p) * 60, cell * p)
    if (p < 0.9) return
    // the window (left): dark, then lit with two little silhouettes and a heart
    const wl = prog(t, T.window, T.window + 0.25)
    const wx = hx - 4 * cell, wy = hy + 2 * cell, ww = 4 * cell, wh = 3 * cell
    if (wl > 0) {
      x.fillStyle = `rgba(255,217,138,${wl})`; x.fillRect(wx - ww / 2, wy - wh / 2, ww, wh)
      x.save(); x.globalAlpha = wl
      drawPixelStar(x, wx - 26, wy + 14, 44, 0, '#c9862a'); drawPixelStar(x, wx + 26, wy + 14, 44, 0, '#c9862a')
      x.restore()
      x.fillStyle = INK; x.fillRect(wx - 2, wy - wh / 2, 4, wh); x.fillRect(wx - ww / 2, wy - 2, ww, 4)
      const g = x.createRadialGradient(wx, wy, 0, wx, wy, 220)
      g.addColorStop(0, `rgba(255,214,150,${0.28 * wl})`); g.addColorStop(1, 'rgba(255,214,150,0)')
      x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(wx - 220, wy - 220, 440, 440); x.restore()
      if (t > T.window + 0.2) floatHearts(t, wx, wy - 30, T.window + 0.2, T.out[0] - 0.4, 3, 6, 120)
    }
    // the plaque "OUR PLACE" over the door
    const py = hy + 1 * cell
    x.fillStyle = INK; x.fillRect(DOOR.x - 112, py - 26, 224, 52); x.fillStyle = '#8a5a34'; x.fillRect(DOOR.x - 106, py - 20, 212, 40)
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fbf1dc'; x.fillText('OUR PLACE', DOOR.x, py + 1)
    // the door: opens on warm light (a swing = the door narrows to its hinge), shuts after they're in
    const open = ease.outCubic(prog(t, T.door, T.door + 0.3)) * (1 - ease.inCubic(prog(t, T.shut, T.shut + 0.2)))
    const dx0 = DOOR.x - DOOR.w / 2, dy0 = DOOR.y - DOOR.h
    x.fillStyle = INK; x.fillRect(dx0 - 6, dy0 - 6, DOOR.w + 12, DOOR.h + 6)
    x.fillStyle = '#ffe7b0'; x.fillRect(dx0, dy0, DOOR.w, DOOR.h)
    if (open > 0) {
      const g = x.createRadialGradient(DOOR.x, DOOR.y - 40, 0, DOOR.x, DOOR.y - 40, 260)
      g.addColorStop(0, `rgba(255,214,150,${0.35 * open})`); g.addColorStop(1, 'rgba(255,214,150,0)')
      x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(DOOR.x - 260, DOOR.y - 300, 520, 520); x.restore()
    }
    const dw = DOOR.w * (1 - 0.82 * open)
    x.fillStyle = '#8a5a34'; x.fillRect(dx0, dy0, dw, DOOR.h)
    x.fillStyle = '#6b4226'; x.fillRect(dx0 + dw - 6, dy0, 6, DOOR.h)
    if (open < 0.2) { x.fillStyle = GOLD; x.fillRect(dx0 + DOOR.w - 22, dy0 + DOOR.h / 2, 8, 8) }
    // porch light
    const pl = 0.6 + 0.4 * Math.sin(t * 3)
    x.fillStyle = INK; x.fillRect(DOOR.x + DOOR.w / 2 + 14, dy0 + 6, 20, 26); x.fillStyle = `rgba(255,224,150,${pl})`; x.fillRect(DOOR.x + DOOR.w / 2 + 18, dy0 + 10, 12, 18)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      if (t < T.cut) {
        // beat 1–2: the Loop
        const k = ease.outCubic(prog(t, ...T.road)) * (t < T.cut - 0.05 ? 1 : 0)
        drawRoad(t, k)
        drawRamp(t, t < T.sign ? 0 : ease.outCubic(prog(t, T.sign, T.sign + 0.6)))
        drawCity(t, k)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'below', cell: 3 })
        drawLapSign(t, prog(t, T.city + 0.4, T.city + 0.7))
        drawExitSign(t, 1)
        const cp = pop01(t, T.carIn, 0.35, 2.0)
        if (cp > 0.01 && t < T.ramp[1]) {
          const c = carState(t)
          drawCar(t, c, c.dir < 0, cp)
          const r = riders(t, c, cp)
          if (t > T.lookEach && t < T.exit + 0.8) floatHearts(t, c.x, c.y - 80, T.lookEach, T.exit, 2, 5, 120)
          if (c.on === 'ring' && Math.abs(t - T.lap2) < 0.7) sparkles(t, c.x, c.y - 60, T.lap2, 6, 90, 1, [BONE, GOLD])
        }
        sparkles(t, SIGN.x, SIGN.y, T.sign, 10, 180, 2, [MINT, GOLD, BONE])
        sparkles(t, 540, 1150, T.taken, 10, 200, 3, [MINT, GOLD, BONE, PINK])
      } else if (ok > 0) {
        // beat 3: our place
        drawStreet(t, ok)
        drawHouse(t, ok)
        // the car rolls up from the right and parks at the kerb
        const pk = ease.outCubic(prog(t, ...T.park))
        const car = { x: lerp(1280, 860, pk), y: STREET + 40 }
        drawBits(x, CAR, CAR_C, Math.round(car.x), car.y, 12 * ok, { flip: true })
        // the stars: in the car, then they hop out to the path, then into the door together
        const out = ease.inOutCubic(prog(t, T.hopOut, T.hopOut + 0.45))
        const inn = ease.inCubic(prog(t, ...T.inside))
        const gx = lerp(lerp(car.x - 48, 190, out), DOOR.x - 16, inn), sx2 = lerp(lerp(car.x + 48, 360, out), DOOR.x + 16, inn)
        const baseY = lerp(car.y - 48, GROUND - 40, out)
        const y = lerp(baseY, DOOR.y - 60, inn) - Math.sin(Math.PI * out) * 140
        const size = lerp(140, 230, out) * lerp(1, 0.4, inn)
        const alpha = 1 - prog(t, T.inside[1] - 0.12, T.inside[1])
        if (alpha > 0) {
          const gO = gemState(t), sO = sagState(t)
          const look = t > T.hopOut + 0.5 && t < T.door ? { g: [1, 0], s: [-1, 0] } : null
          drawStarChar(x, gx, y, size * ok, t, { color: GEM.color, glyph: size > 150 ? GEM.glyph : null, ...gO, ...(look ? { look: look.g, mood: 'happy' } : {}), hops: GEM_HOPS, seed: 4, glow: 1, alpha })
          drawStarChar(x, sx2, y - 4, size * ok, t, { color: SAG.color, glyph: size > 150 ? SAG.glyph : null, ...sO, ...(look ? { look: look.s, mood: 'happy' } : {}), hops: SAG_HOPS, seed: 9, glow: 1, alpha })
          if (t > T.door - 0.1 && t < T.inside[0] + 0.2) floatHearts(t, (gx + sx2) / 2, y - 60, T.door - 0.1, T.inside[0], 6, 6, 180)
        }
        sparkles(t, DOOR.x, DOOR.y - 60, T.shut, 10, 140, 4, [GOLD, BONE, PINK, MINT])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.75 (H0 out → "This time, the exit.") and 9.9 (box shut → "Going somewhere."). cardfx keeps 9.9.
const CUTS = [5.75, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['whoosh', T.road[0], 0.6, 0.03], ...[0, 1, 2, 3, 4].map(n => ['tick', +(T.city + n * 0.07).toFixed(3), 0.025]),
  ['pop', T.carIn + 0.05, 739.99, 0.04, 0.3], ['whoosh', T.carIn + 0.1, 0.4, 0.025],
  ['pluck', T.lap2, 1318.51, 0.035, 0.5, 0], ['tick', T.lap2, 0.04],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['tick', T.roll[0], 0.03], ['pop', T.roll[1], 880, 0.03, 0.2],
  ['boom', T.sign, 0.12], ['pop', T.sign + 0.05, 1174.66, 0.05, 0.4], ['glitter', T.sign, T.sign + 0.45],
  ['pop', T.lookSign, 440, 0.03, 0], ['pluck', T.lookEach, 1174.66, 0.04, 0.5, 0], ['bell', T.lookEach + 0.05, 1567.98, 0.022, 0.9, 0],
  ...wordPops(T.h1, 2, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.045, 0],
  ['whoosh', T.exit, 0.9, 0.045], ['pluck', T.taken + 0.12, 1567.98, 0.045, 0.6, 0], ['glitter', T.taken, T.taken + 0.4],
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 1, 0.07, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.park[0], 0.5, 0.03], ['tick', T.park[1], 0.04],
  ['pop', T.hopOut + 0.05, 739.99, 0.035, -0.2], ['pop', T.hopOut + 0.17, 880, 0.035, 0.2],
  ['tick', T.door, 0.04], ['bell', T.door + 0.08, 1318.51, 0.03, 1.0, 0],
  ['whoosh', T.inside[0], 0.4, 0.025], ['tick', T.shut + 0.1, 0.05], ['glitter', T.shut, T.shut + 0.4],
  ['pluck', T.window, 1174.66, 0.04, 0.6, -0.2], ['bell', T.window + 0.05, 1760, 0.025, 1.0, -0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
