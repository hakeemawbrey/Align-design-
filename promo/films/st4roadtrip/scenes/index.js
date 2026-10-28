// st4roadtrip (20 s vertical Align ad, Star Talk season 4, EP 041, thread A) · story 0–15.6, then the shared end card
// with "JOIN THE TEXAS BETA".
//   0.00–5.50  "The stars are | going on a | *road trip.*"  A retro pixel van is parked under a generic Houston skyline.
//              The stars hop in one by one through the windows: ♉ Taurus with a bag of snacks, ♊ Gemini with its phone
//              on aux, ♍ Virgo with a paper map of Texas, and on the drop (2.82) ♐ Sagittarius lands at the wheel: honk,
//              headlights. THE STARS: "Houston was first."
//   5.55–9.85  "Everyone | has a *job.*"  Role chips stamp on the doors: SNACKS · AUX · MAP · DRIVER. THE STARS: "now the
//              rest of *Texas.*" The van pulls out; the skyline slides away, notes float out of Gemini's window. The
//              ghost peeks over the suitcase on the roof rack (8.45–9.8): nobody notices.
//   9.92 cut → "Hit the road, | *Texas*."  Open highway at night, a green I-10 WEST sign rolls past, everyone heart-eyed.
//              Everything pops out by 15.4; the end card takes over at 15.6.
// HELLO TEXAS (drop 5): this last line is the H. One canvas (sky, constellation, skyline, road, van, riders, props),
// DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { drawVan } from '../van.js'

export const EP = 41
export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SAG = signStar('sagittarius'), VIR = signStar('virgo'), GEM = signStar('gemini'), TAU_ = signStar('taurus')

// ── the timeline (drop on 2.82)
const T = {
  h0: 0.15, h0Land: 0.95, h0Out: [5.32, 5.5],
  hop: [0.7, 1.25, 1.8, 2.32], fly: 0.5, honk: 2.82,
  open: 3.2, l1: 3.4,
  h1: 5.55, h1Land: 5.95, l2: 5.95, chips: [6.25, 6.5, 6.75, 7.0],
  drive: [7.3, 8.3], ghost: 8.45, close: 9.0, h1Out: [9.65, 9.85],
  cut: 9.92, h2: 10.02, h2Land: 10.42, sign: [10.6, 14.6], hearts: 11.2, h2Out: [15.08, 15.35], out: [15.0, 15.4],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'Houston was first.' },
  { t: T.l2, speaker: SPEAK, text: 'now the rest of *Texas.*' },
]
const CPS = 26

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
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
const CHIPS = ['..KKKKKKK..', '.KOOOOOOOK.', 'KOOOOOOOOOK', 'KOYYYYYYYOK', 'KOYOOOOOYOK', 'KOYOOOOOYOK', 'KOYYYYYYYOK', 'KOOOOOOOOOK', 'KOOOOOOOOOK', '.KOOOOOOOK.', '..KKKKKKK..']
const CHIP_C = { K: '#c4562a', O: '#f29a4a', Y: '#ffd166' }
const PHONE = ['KKKKK', 'KsssK', 'KsNsK', 'KsNsK', 'KNNsK', 'KsssK', 'KKKKK']
const PHONE_C = { K: '#2a2156', s: '#7fdcff', N: '#1b1236' }
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
// Texas, roughly (panhandle top-left, El Paso tip far left, the Gulf curve lower right)
const TEXAS = [
  '....XXX.........',
  '....XXX.........',
  '....XXXXXXXXX...',
  '....XXXXXXXXXX..',
  'XXXXXXXXXXXXXXX.',
  '.XXXXXXXXXXXXXXX',
  '..XXXXXXXXXXXXXX',
  '....XXXXXXXXXXXX',
  '.....XXXXXXXXXX.',
  '......XXXXXXXX..',
  '.......XXXXXX...',
  '........XXXX....',
  '.........XXX....',
  '..........XX....',
]
const SUITCASE = ['...HHHH...', '..H....H..', 'BBBBBBBBBB', 'BbbbbbbbbB', 'BbSbbbbSbB', 'BbSbbbbSbB', 'BbbbbbbbbB', 'BBBBBBBBBB']
const SUIT_C = { H: '#3a2a1e', B: '#a0643a', b: '#c47a3a', S: '#5a3a1e' }
const COOLER = ['WWWWWWWW', 'WCCCCCCW', 'CCCCCCCC', 'CccccccC', 'CccccccC', 'CCCCCCCC']
const COOL_C = { W: '#f5f1ff', C: '#4a7bd6', c: '#7fa8f0' }

// ── layout
const VC = 15                                   // van cell
const VX = 60, VY = 916                          // van rack row (wheels sit on y ≈ 1346)
const ROAD_TOP = 1250
const RIDERS = [
  { id: 'taurus', s: TAU_, role: 'SNACKS', seed: 3 },
  { id: 'gemini', s: GEM, role: 'AUX', seed: 5 },
  { id: 'virgo', s: VIR, role: 'MAP', seed: 8 },
  { id: 'sag', s: SAG, role: 'DRIVER', seed: 11 },
]
const RSIZE = 168

// road distance travelled (px), pure
const V = 760
function dist(t) {
  const [a, b] = T.drive
  if (t <= a) return 0
  if (t <= b) { const u = t - a, d = b - a; return V * u * u / (2 * d) }
  return V * (b - a) / 2 + V * (t - b)
}

function riderState(k, t) {
  const R = RIDERS[k]
  if (t < T.hop[k] + T.fly) return { mood: 'happy' }
  if (t >= T.cut) return t > T.hearts + k * 0.15 ? { mood: 'heart' } : { mood: 'sparkle', look: [1, 0] }
  if (t < T.l1) return { mood: 'happy', look: [0, 0] }
  if (t < T.l2) return R.id === 'sag' ? { mood: 'neutral', look: [0, 0] } : { mood: 'happy', look: [0, 0] }
  if (t < T.drive[0]) return { mood: 'wide', look: [0, 0], blink: false }             // "the rest of Texas"
  if (R.id === 'sag') return { mood: 'squint', look: [1, 0] }                          // eyes on the road
  if (R.id === 'virgo') return { mood: 'squint', look: [0, 1] }                        // eyes on the map
  if (R.id === 'gemini') return { mood: 'happy' }
  return { mood: 'happy', look: [1, 0] }
}
// beat bops while driving (house, ~0.4688 s per beat at 128 bpm feel)
const BOPS = []
for (let b = T.drive[0]; b < T.cut - 0.1; b += 0.4688) BOPS.push(+b.toFixed(3))

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "800 40px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The stars are | going on a | *road trip.*', { top: 168, size: 108, accentSize: 168, at: T.h0, gap: 0.09, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Everyone | has a *job.*', { top: 190, size: 124, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: LAV })
  const H2 = popText(root, 'Hit the road, | *Texas*.', { top: 196, size: 132, accentSize: 214, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 230, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the generic skyline (deterministic): plain towers with lit windows, a stepped top, a spire, a slanted roof
  const r = rng(4141)
  const TOWERS = []
  for (let k = 0, px = -30; px < 1500; k++) {
    const w = 70 + Math.floor(r() * 5) * 12, h = 200 + Math.floor(r() * 9) * 38
    TOWERS.push({ x: px, w, h: k === 4 ? 520 : k === 7 ? 470 : h, kind: k === 4 ? 'spire' : k === 7 ? 'step' : k === 10 ? 'slant' : 'flat', seed: k })
    px += w + 8 + Math.floor(r() * 3) * 10
  }
  function skyline(t, off, alpha) {
    if (alpha <= 0) return
    x.save(); x.globalAlpha = alpha
    for (const tw of TOWERS) {
      const bx = Math.round(tw.x - off), top = ROAD_TOP - tw.h
      if (bx > W || bx + tw.w < 0) continue
      x.fillStyle = '#17123a'; x.fillRect(bx, top, tw.w, tw.h)
      if (tw.kind === 'spire') { x.beginPath(); x.moveTo(bx, top); x.lineTo(bx + tw.w / 2, top - 120); x.lineTo(bx + tw.w, top); x.fill() }
      if (tw.kind === 'step') { x.fillRect(bx + 12, top - 40, tw.w - 24, 40); x.fillRect(bx + 26, top - 72, tw.w - 52, 32) }
      if (tw.kind === 'slant') { x.beginPath(); x.moveTo(bx, top); x.lineTo(bx + tw.w, top - 60); x.lineTo(bx + tw.w, top); x.fill() }
      x.fillStyle = '#211a4e'; x.fillRect(bx + tw.w - 8, top, 8, tw.h)
      // lit windows
      const rr = rng(77 + tw.seed)
      for (let wy = top + 16; wy < ROAD_TOP - 40; wy += 22) for (let wx = bx + 10; wx < bx + tw.w - 14; wx += 16) {
        const v = rr()
        if (v < 0.62) continue
        x.fillStyle = v > 0.93 ? '#ffe7a8' : 'rgba(255,214,140,0.5)'
        x.fillRect(wx, wy, 6, 8)
      }
    }
    x.restore()
  }
  // open Texas land after the cut: far mesas, scrub, fence posts
  function openLand(t, d, alpha) {
    if (alpha <= 0) return
    x.save(); x.globalAlpha = alpha
    // far low hills
    x.fillStyle = '#1a1440'
    for (let k = -1; k < 6; k++) {
      const hx = ((k * 320 - d * 0.08) % 1920 + 1920) % 1920 - 300
      x.beginPath(); x.moveTo(hx, ROAD_TOP); x.lineTo(hx + 60, ROAD_TOP - 70); x.lineTo(hx + 200, ROAD_TOP - 78); x.lineTo(hx + 260, ROAD_TOP); x.fill()
    }
    // scrub bushes + fence posts on the road edge
    for (let k = 0; k < 14; k++) {
      const px = ((k * 140 - d * 0.6) % 1960 + 1960) % 1960 - 200
      x.fillStyle = '#2a2156'; x.fillRect(Math.round(px), ROAD_TOP - 46, 10, 46)
      x.fillStyle = 'rgba(239,230,214,0.25)'; x.fillRect(Math.round(px) - 70, ROAD_TOP - 34, 140, 3)
    }
    x.restore()
  }
  function road(t, d) {
    x.fillStyle = '#120c2a'; x.fillRect(0, ROAD_TOP, W, 1920 - ROAD_TOP)
    x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(0, ROAD_TOP, W, 5)
    x.fillStyle = '#1b1438'; x.fillRect(0, ROAD_TOP + 5, W, 60)
    // lane dashes (two rows: under the van and below the box)
    for (const [yy, h, k] of [[1372, 12, 1], [1836, 16, 1.25]]) {
      x.fillStyle = k > 1 ? 'rgba(255,209,102,0.85)' : 'rgba(239,230,214,0.75)'
      for (let i = -1; i < 7; i++) {
        const dx = ((i * 220 - d * k) % 1540 + 1540) % 1540 - 220
        x.fillRect(Math.round(dx), yy, 120, h)
      }
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.6) return
    const p = ease.outCubic(tt / 0.6)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.6)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.6 * p), cy + Math.sin(a) * R * (0.6 + 0.6 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function chip(t, cx, cy, label, t0, out) {
    const p = pop01(t, t0, 0.3, 2.6) * out
    if (p <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(p, p); x.rotate((1 - p) * -0.2 + (label.length % 2 ? 0.03 : -0.03))
    x.font = `700 30px ${MONO}`; x.letterSpacing = '3px'
    const w = Math.ceil(x.measureText(label).width) + 34, h = 50
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
    x.fillStyle = GOLD; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#140c2c'; x.fillRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8)
    x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 2, 2)
    x.restore()
  }
  function highwaySign(t, d) {
    const k = prog(t, ...T.sign)
    if (k <= 0 || k >= 1) return
    const sx = Math.round(lerp(1260, -480, k)), sy = 600
    x.save()
    x.fillStyle = '#5a5470'; x.fillRect(sx + 40, sy + 200, 14, ROAD_TOP - sy - 200); x.fillRect(sx + 366, sy + 200, 14, ROAD_TOP - sy - 200)
    x.fillStyle = INK; x.fillRect(sx - 6, sy - 6, 432, 212)
    x.fillStyle = '#1f7a4a'; x.fillRect(sx, sy, 420, 200)
    x.strokeStyle = '#f5f1ff'; x.lineWidth = 5; x.strokeRect(sx + 10, sy + 10, 400, 180)
    x.fillStyle = '#f5f1ff'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `800 58px Inter, sans-serif`; x.fillText('I-10 WEST', sx + 210, sy + 66)
    x.font = `800 40px Inter, sans-serif`; x.fillText('SAN ANTONIO  →', sx + 210, sy + 138)
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, seed) {
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.32 + seed * 0.07, life = 1.3
      if (t < born || t > born + life || t > T.out[0]) continue
      const p = (t - born) / life
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + Math.sin(p * 6 + i) * 22 + (i % 3 - 1) * 40), Math.round(cy - p * 200), 7, { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const sky = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, sky)
      drawSeedConstellation(x, t, EP)
      const d = dist(t), after = t >= T.cut
      const ok = popOut(t, T.out)
      if (!after) skyline(t, d * 0.32, 1)
      else openLand(t, d, 1)
      if (after) highwaySign(t, d)
      road(t, d)

      // the van: a little bounce when riders land, a road rumble while driving
      let land = 0
      for (const h of T.hop) { const u = t - (h + T.fly); if (u > 0 && u < 0.45) land = Math.max(land, Math.exp(-u * 9) * Math.cos(u * 30) * 6) }
      const rumble = t > T.drive[0] ? Math.round(Math.sin(t * 31) * 1.5 + Math.sin(t * 7.3) * 2) : 0
      const vx = VX + (t > T.drive[0] && t < T.drive[1] ? -14 * Math.sin(Math.PI * prog(t, ...T.drive)) : 0)
      const vy = VY + land + rumble + (1 - ok) * 0
      const vk = clamp(ok)
      if (vk <= 0.01) { finish(t); return }
      x.save()
      if (ok < 1) { x.globalAlpha = clamp(ok); x.translate(W / 2, 1100); x.scale(ok, ok); x.translate(-W / 2, -1100) }
      // rack items: suitcase + cooler
      const suitX = vx + 18 * VC, suitY = vy - 4.2 * VC, coolX = vx + 34 * VC
      drawBits(x, SUITCASE, SUIT_C, suitX, suitY, VC)
      drawBits(x, COOLER, COOL_C, coolX, vy - 3.2 * VC, VC)
      // the ghost peeks over the suitcase (drawn after it, so the suitcase hides its lower half)
      drawGhostCameo(x, t, { x: suitX + 6, y: suitY - 4 * VC + 2, at: T.ghost, dur: 1.35, from: 'below', cell: 4 })
      const lights = t > T.honk ? clamp((t - T.honk) * 6) * (t < T.honk + 0.5 ? 1 : 0.65) : 0
      const geo = drawVan(x, vx, vy, VC, t, {
        wheelA: d / (4.7 * VC), lights,
        riders: (k, rc) => {
          const R = RIDERS[k], tl = T.hop[k] + T.fly
          if (t < tl) return
          const pk = pop01(t, tl, 0.3, 2.2)
          const hops = [tl, ...(t > T.drive[0] && (R.id === 'gemini' || R.id === 'taurus') ? BOPS.filter((b, i) => (i + k) % 2 === 0) : [])]
          drawStarChar(x, rc.cx + (R.id === 'sag' ? -10 : 0), rc.cy + (R.id === 'virgo' ? 4 : 26), RSIZE, t, { color: R.s.color, glyph: R.s.glyph, ...riderState(k, t), hops, seed: R.seed, pop: pk, glow: 0.7, tips: false })
          if (R.id === 'sag') {   // steering wheel
            x.save(); x.lineWidth = 10; x.strokeStyle = '#140c2c'; x.beginPath(); x.ellipse(rc.x + rc.w - 18, rc.y + rc.h - 30, 14, 40, 0, 0, Math.PI * 2); x.stroke()
            x.lineWidth = 5; x.strokeStyle = '#5a5470'; x.stroke(); x.restore()
          }
        },
      })
      // props over the windows (not clipped): snacks, phone on aux, the map
      const [w1, w2, w3] = geo.windows
      if (t > T.hop[0] + T.fly) {
        const pk = pop01(t, T.hop[0] + T.fly + 0.1, 0.3, 2.4)
        const munch = t > T.drive[0] ? Math.sin(t * 9) * 0.08 : 0
        drawBits(x, CHIPS, CHIP_C, Math.round(w1.x + w1.w - 34), Math.round(w1.y + w1.h - 34 + Math.sin(t * 5) * 3), 6 * pk, { rot: 0.18 + munch })
      }
      if (t > T.hop[1] + T.fly) {
        const pk = pop01(t, T.hop[1] + T.fly + 0.1, 0.3, 2.4)
        const px = w2.x + w2.w - 30, py = w2.y + w2.h - 40
        drawBits(x, PHONE, PHONE_C, Math.round(px), Math.round(py + Math.sin(t * 6) * 3), 7 * pk, { rot: -0.15 })
        // the aux cable trails down into the door
        x.save(); x.globalAlpha = pk; x.strokeStyle = '#140c2c'; x.lineWidth = 5; x.beginPath(); x.moveTo(px, py + 26); x.quadraticCurveTo(px + 10, py + 80, px - 30, w2.y + w2.h + 30); x.stroke(); x.restore()
      }
      if (t > T.hop[2] + T.fly) {
        const pk = pop01(t, T.hop[2] + T.fly + 0.1, 0.36, 2.2)
        const mx = w3.cx + 4, my = w3.y + w3.h - 14
        const mw = 164 * pk, mh = 112 * pk
        x.save(); x.translate(Math.round(mx), Math.round(my)); x.rotate(-0.06 + (t > T.drive[0] ? Math.sin(t * 4) * 0.03 : 0))
        x.fillStyle = INK; x.fillRect(-mw / 2 - 5, -mh / 2 - 5, mw + 10, mh + 10)
        x.fillStyle = '#f1e6c6'; x.fillRect(-mw / 2, -mh / 2, mw, mh)
        x.fillStyle = 'rgba(160,130,90,0.4)'; x.fillRect(-mw / 6 - 2, -mh / 2, 4, mh); x.fillRect(mw / 6 - 2, -mh / 2, 4, mh)     // folds
        if (pk > 0.6) {
          drawBits(x, TEXAS, { X: '#9fd38a' }, 0, 0, 6.0 * pk, { outline: '#5c8a4a' })
          // the route: Houston (east) → west, dotted
          const hx = 5.2 * 6.0, hy = 1.6 * 6.0
          x.fillStyle = '#e8483c'
          for (let k = 0; k < 7; k++) x.fillRect(Math.round(hx - k * 11 * pk), Math.round(hy - 2 - Math.sin(k * 0.6) * 6), 5, 5)
          x.fillStyle = '#e8483c'; x.fillRect(Math.round(hx) - 4, Math.round(hy) - 6, 9, 9)
        }
        x.restore()
      }
      // role chips on the doors
      if (t > T.chips[0] - 0.05 && t < T.cut) RIDERS.forEach((R, k) => chip(t, geo.windows[k].cx, vy + 18.7 * VC, R.role, T.chips[k], outK(t, [T.cut - 0.25, T.cut])))
      // honk: two pixel "beep" bursts from the front
      if (t > T.honk && t < T.honk + 0.7) {
        const p = prog(t, T.honk, T.honk + 0.7)
        x.save(); x.globalAlpha = 1 - p; x.fillStyle = GOLD
        for (let k = 0; k < 3; k++) { const a = -0.5 + k * 0.5, rr = 50 + p * 90; x.fillRect(Math.round(vx + 64 * VC + Math.cos(a) * rr), Math.round(vy + 12 * VC + Math.sin(a) * rr), 18, 8) }
        x.restore()
      }
      // landing sparkles
      T.hop.forEach((h, k) => { const wr = geo.windows[k]; sparkles(t, wr.cx, wr.cy, h + T.fly, 8, 90, k) })
      // music notes out of Gemini's window while driving
      if (t > T.drive[0] && t < T.out[1]) {
        for (let i = 0; i < 6; i++) {
          const born = T.drive[0] + i * 0.47, life = 1.6
          const age = ((t - born) % (6 * 0.47)), p = age / life
          if (t < born || p > 1) continue
          drawBits(x, NOTE, { X: i % 2 ? LAV : BONE }, Math.round(w2.cx - 40 + i * 14 + Math.sin(p * 7 + i) * 16 - p * 120), Math.round(vy - 30 - p * 230), 6, { alpha: Math.sin(Math.PI * p) * 0.9 })
        }
      }
      if (after) for (let k = 0; k < 4; k++) floatHearts(t, geo.windows[k].cx, vy - 20, T.hearts + k * 0.15, k)
      x.restore()
      // the stars hopping in (unclipped while they fly)
      T.hop.forEach((h, k) => {
        const p = prog(t, h, h + T.fly)
        if (p <= 0 || p >= 1) return
        const wr = geo.windows[k], R = RIDERS[k]
        const fx = lerp(-140, wr.cx, ease.outQuad(p)), fy = lerp(1180, wr.cy + 26, p) - Math.sin(Math.PI * p) * 360
        drawStarChar(x, fx, fy, 150, t, { color: R.s.color, glyph: R.s.glyph, mood: 'happy', seed: R.seed, squash: -0.12 * Math.sin(Math.PI * p), tips: false })
      })
      finish(t)
    },
  }
  function finish(t) {
    box.update(t)
    black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
    for (const [h, o] of HEADS) h.update(t, outK(t, o))
    drawGrain(gx, t)
  }
}

// card-motif candidates: 5.52 (H0 out → "Everyone has a job") and 9.92 (on the road → "Hit the road, Texas."). cardfx keeps 9.92.
const CUTS = [5.52, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE_HZ = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 6, 0.09, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0],
  ...T.hop.flatMap((h, k) => [['whoosh', h, 0.4, 0.022], ['pop', +(h + T.fly).toFixed(3), NOTE_HZ[k + 1], 0.04, -0.3 + k * 0.2]]),
  ['pop', T.honk, 293.66, 0.06, 0.4], ['pop', T.honk + 0.16, 293.66, 0.06, 0.4], ['tick', T.honk, 0.05],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 3, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ...T.chips.map((c, i) => ['pop', c, NOTE_HZ[(i * 2) % 7], 0.035, -0.3 + i * 0.2]),
  ['whoosh', T.drive[0], 1.2, 0.03], ['whoosh', T.drive[1], 0.8, 0.02],
  ['tick', T.ghost + 0.3, 0.02], ['pop', T.ghost + 0.35, 1567.98, 0.018, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.07, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.1, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.sign[0] + 0.6, 1.6, 0.025],
  ['pluck', T.hearts, 1174.66, 0.04, 0.5, -0.2], ['bell', T.hearts + 0.05, 1760, 0.025, 1.0, 0], ['glitter', T.hearts, T.hearts + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
