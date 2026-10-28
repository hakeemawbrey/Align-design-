// st4katy (EP 011, 15 s vertical Align ad, Star Talk season 4 "Houston, we have a match") · story 0–10.6, then the
// shared end card ("come" + the Align logo, JOIN THE HOUSTON BETA).
//   0.00–4.35  "The Katy Freeway | has a *lot* of lanes."  Night, a dozen lanes fan out from a generic Houston skyline.
//              The ♈ Aries star (boxing glove on the dash) drives a little red convertible, on the way to Libra, and
//              swerves lane after lane (LANE CHANGES ticks up). In the next lane the ♉ Taurus star cruises in its cozy
//              green car, blanket on, never switching once, and stays exactly level with it.
//              Box (♈ ARIES): "this lane's faster. no, THIS one."
//   4.35       card cut (flip).
//   4.45–8.55  "Same *traffic.* | Every lane."  The counter adds MILES AHEAD: 0. Aries looks over: Taurus, still level,
//              waves. Box (THE STARS): "switching lanes won't get you there faster." → "neither does *rushing* love."
//              Aries stops swerving, eases into one lane and sits back.
//   8.60–10.5  "Pick a lane. | *Enjoy* the drive."  The road calms, the ♎ Libra star twinkles up at the horizon (the
//              destination) and Aries goes heart-eyed. Everything pops out by 10.45; the end card takes over at 10.6.
// Season lore: the 100-star constellation (EP 11 = the centre ring complete) top-left; the ghost peeks out from behind
// a downtown tower (5.3–6.6). One canvas (sky + skyline + road + cars + stars), DOM type + the box above it. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const EP = 11
export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#ff5a5a', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const ARI = signStar('aries'), TAU = signStar('taurus'), LIB = signStar('libra')

// ── the timeline
const SW = [0.95, 1.6, 2.3, 3.0, 3.65, 5.0, 6.15]                 // Aries' lane switches (the last two: after the cut)
const T = {
  h0: 0.1, h0Land: 0.62, h0Out: [4.15, 4.33],
  carIn: 0.25, tauIn: 0.45, open: 1.02, l1: BEAT(1),               // 1.16: the drop
  cut: 4.35,
  h1: 4.45, h1Land: 4.85, l2: 4.5, miles: 4.7, lookOver: 5.35, wave: [5.6, 6.6], l3: 7.5, settle: [7.65, 8.25], h1Out: [8.38, 8.55],
  h2: 8.62, h2Land: 9.0, libra: 8.7, heart: 9.2, close: 9.95, h2Out: [10.24, 10.44], out: [10.06, 10.45],
  ghost: 5.3,
}
const ARIES = '♈ ARIES', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: ARIES, color: ARI.color, text: "this lane's faster. no, *THIS* one." },
  { t: T.l2, speaker: NARR, text: "switching lanes won't get you there faster." },
  { t: T.l3, speaker: NARR, text: 'neither does *rushing* love.' },
]
const CPS = 30
const LT = lineTimes(LINES, { cps: CPS })
// Aries' lane after each switch (lanes 0…11, 5.5 = the road's middle); Taurus never leaves lane 7
const LANES = [5, 4, 3, 4, 5, 4, 6], LANE0 = 6, TAU_LANE = 7

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── pixel bits
const BMP = s => s.trim().split(/\s+/)
// a little convertible from behind: body, tail lights (L), plate (P), bumper (d), tyres (T)
const CAR = BMP(`
..bbbbbbbbbbbbbbbbbb..
.bBBBBBBBBBBBBBBBBBBb.
bBBBBBBBBBBBBBBBBBBBBb
BLLLBBBBBBBBBBBBBBLLLB
BLLLBBBBBPPPPBBBBBLLLB
BBBBBBBBBPPPPBBBBBBBBB
dddddddddddddddddddddd
TTTT..............TTTT
TTTT..............TTTT`)
const GLOVE = BMP(`..RRRR.. .RRRRRR. WRRhRRRR WRRRRRRd WRRRRRRd ..dddd..`)
const BLANKET = BMP(`
..CCCCCCCCCCCC..
.CcCCcCCcCCcCCC.
CCCCCCCCCCCCCCCC
CcCCcCCcCCcCCcCC`)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
/** a bitmap of cells (cols per char) with a 1-cell dark outline, centred on (cx, cy) */
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1, outline = 'rgba(14,8,32,0.9)' } = {}) {
  if (a <= 0 || cell <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  if (outline) {
    x.fillStyle = outline
    bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  }
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── the road: a 12-lane perspective fan from the horizon
const HY = 742, RW0 = 130, RW1 = 4300, NL = 12            // horizon y, road width at the horizon / at the frame's bottom
const roadW = y => RW0 + (RW1 - RW0) * (y - HY) / (1920 - HY)
const laneX = (lane, y) => 540 + (lane - (NL - 1) / 2) * roadW(y) / NL
const zToY = z => HY + (1920 - HY) / (1 + z * 0.22)        // world distance z (0 = the frame's bottom) → screen y
const CAR_Y = 1262                                          // the heroes' depth on screen

// Aries' lane at t (each switch eases over 0.3 s with a swerve tilt)
function ariesLane(t) {
  let lane = LANE0, tilt = 0
  SW.forEach((s, i) => {
    const p = prog(t, s, s + 0.3), from = i ? LANES[i - 1] : LANE0
    if (t >= s) lane = lerp(from, LANES[i], ease.inOutCubic(p))
    if (p > 0 && p < 1) tilt = Math.sign(LANES[i] - from) * Math.sin(Math.PI * p) * 0.16
  })
  return { lane, tilt }
}
const switches = t => SW.filter(s => t >= s + 0.15).length

// the skyline (generic towers; deterministic)
const TOWERS = [[250, 70, 100], [318, 52, 150], [372, 64, 120], [440, 48, 200], [492, 70, 165], [565, 56, 235], [625, 74, 185], [700, 50, 140], [752, 68, 205], [822, 54, 120], [878, 66, 95]]
const GHOST_TOWER = TOWERS[10]                               // the ghost peeks over this one's roof

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 28px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The Katy Freeway | has a *lot* of lanes.', { top: 205, size: 100, accentSize: 150, at: T.h0, gap: 0.07, late: 3, lateAt: T.h0Land, lateGap: 0.1, wobble: true, accentColor: GOLD, lineHeight: 1.04 })
  const H1 = popText(root, 'Same *traffic.* | Every lane.', { top: 215, size: 112, accentSize: 160, at: T.h1, gap: 0.08, late: 2, lateAt: T.h1Land, wobble: true, accentColor: RED })
  const H2 = popText(root, 'Pick a lane. | *Enjoy* the drive.', { top: 225, size: 100, accentSize: 146, at: T.h2, gap: 0.08, late: 3, lateAt: T.h2Land, wobble: true, accentColor: PINK })
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

  // speed of the road (dashes rushing at you): fast and jittery while Aries swerves, calm once it settles
  const calm = t => ease.inOutCubic(prog(t, T.settle[0], T.settle[1] + 0.8))
  const travel = t => t * 4.2 - 1.6 * calm(t) * (t - T.settle[0])

  function drawSkyline(t) {
    // city glow on the horizon
    const g = x.createLinearGradient(0, HY - 260, 0, HY + 10)
    g.addColorStop(0, 'rgba(255,143,177,0)'); g.addColorStop(1, 'rgba(255,143,177,0.22)')
    x.fillStyle = g; x.fillRect(0, HY - 260, W, 270)
    TOWERS.forEach(([cx, w, h], i) => {
      const L = cx - w / 2, top = HY - h
      x.fillStyle = i % 2 ? '#1a1236' : '#150f2e'; x.fillRect(L, top, w, h)
      x.fillStyle = 'rgba(239,230,214,0.1)'; x.fillRect(L, top, 3, h)
      // windows: a few warm pixels, slowly blinking
      for (let r = 0; r * 18 + 14 < h - 8; r++) for (let c = 0; c * 14 + 10 < w - 6; c++) {
        const on = Math.sin(i * 7.1 + r * 3.7 + c * 5.3) > 0.35 || (Math.sin(i * 3 + r + c * 2 + Math.floor(t * 0.7)) > 0.97)
        if (!on) continue
        x.fillStyle = (r + c + i) % 5 ? 'rgba(255,214,150,0.55)' : 'rgba(201,166,255,0.6)'
        x.fillRect(L + 8 + c * 14, top + 12 + r * 18, 5, 6)
      }
      if (i === 5) { x.fillStyle = '#150f2e'; x.fillRect(cx - 2, top - 34, 4, 34); x.fillStyle = Math.floor(t * 1.4) % 2 ? RED : '#6a2030'; x.fillRect(cx - 4, top - 40, 8, 8) }
    })
  }

  function drawRoad(t) {
    // ground + asphalt
    x.fillStyle = '#0c0920'; x.fillRect(0, HY, W, 1920 - HY)
    const ag = x.createLinearGradient(0, HY, 0, 1920); ag.addColorStop(0, '#231a40'); ag.addColorStop(1, '#2d2448')
    x.fillStyle = ag
    x.beginPath(); x.moveTo(540 - RW0 / 2, HY); x.lineTo(540 + RW0 / 2, HY); x.lineTo(540 + RW1 / 2, 1920); x.lineTo(540 - RW1 / 2, 1920); x.closePath(); x.fill()
    // the horizon haze
    const hz = x.createLinearGradient(0, HY, 0, HY + 140); hz.addColorStop(0, 'rgba(255,143,177,0.18)'); hz.addColorStop(1, 'rgba(255,143,177,0)')
    x.fillStyle = hz; x.fillRect(0, HY, W, 140)
    // shoulders (solid gold) + lane dashes (bone), rushing toward you
    const edge = (b, y) => 540 + (b - NL / 2) * roadW(y) / NL
    for (const b of [0, NL]) {
      x.strokeStyle = rgba(GOLD, 0.6); x.lineWidth = 5
      x.beginPath(); x.moveTo(edge(b, HY), HY); x.lineTo(edge(b, 1920), 1920); x.stroke()
    }
    const P = 1.6, ph = travel(t) % P
    for (let k = -1; k < 30; k++) {
      const z0 = k * P - ph, z1 = z0 + P * 0.45
      if (z1 < 0) continue
      const y0 = zToY(Math.max(0, z0)), y1 = zToY(z1)
      const a = clamp((y0 - HY) / 120) * 0.75
      x.fillStyle = rgba(BONE, a)
      for (let b = 1; b < NL; b++) {
        const w0 = Math.max(1.2, roadW(y0) / NL * 0.035), w1 = Math.max(0.8, roadW(y1) / NL * 0.035)
        x.beginPath(); x.moveTo(edge(b, y0) - w0, y0); x.lineTo(edge(b, y0) + w0, y0); x.lineTo(edge(b, y1) + w1, y1); x.lineTo(edge(b, y1) - w1, y1); x.closePath(); x.fill()
      }
    }
  }

  // the other traffic: bone cars at fixed screen depths, inching about (nobody really moves either)
  const TRAFFIC = [[2, 0.62, 3.1], [9, 0.72, 1.4], [4, 0.36, 0.2], [10, 0.32, 2.2], [1, 0.9, 4.0], [6, 0.24, 5.2], [8, 0.47, 0.9]]
  function car(cx, cy, cell, body, { tilt = 0, a = 1, brake = 0 } = {}) {
    bits(x, CAR, cx, cy, cell, { b: '#fff6e6', B: body, L: brake > 0.5 ? '#ff2a4a' : '#c01e3a', P: '#efe6d6', d: '#3a2f55', T: '#0e0a1e' }, { rot: tilt, a })
    if (brake > 0) for (const s of [-1, 1]) glow(cx + s * cell * 8.5, cy - cell * 0.5, cell * 7, '#ff2a4a', brake * a * 0.8)
  }
  function drawTraffic(t, front) {
    TRAFFIC.forEach(([lane, s, seed]) => {
      const y = HY + (CAR_Y - HY) * (s + 0.03 * Math.sin(t * 0.8 + seed))
      if ((y > CAR_Y) !== front) return
      const cell = roadW(y) / NL / 26
      car(laneX(lane, y), y, cell, ['#9a8fb8', '#b8a98a', '#7f8fb0', '#a58aa8'][Math.floor(seed) % 4], { brake: 0.5 + 0.5 * Math.sin(t * 2 + seed) })
    })
  }

  // ── the heroes
  function ariesState(t) {
    const sw = SW.find(s => t >= s - 0.1 && t < s + 0.45)
    if (t < T.l1) return { mood: 'squint', look: [0, -1], blink: false }
    if (t < T.cut) return sw != null ? { mood: 'wide', look: [Math.sign(LANES[SW.indexOf(sw)] - (SW.indexOf(sw) ? LANES[SW.indexOf(sw) - 1] : LANE0)), 0], blink: false } : { mood: 'squint', look: [0, -1], blink: false }
    if (t < T.lookOver) return sw != null ? { mood: 'wide', look: [-1, 0], blink: false } : { mood: 'squint', look: [0, -1] }
    if (t < T.wave[1]) return { mood: 'wide', look: [1, 0], blink: false }                     // …Taurus is RIGHT there
    if (t < T.l3) return sw != null ? { mood: 'wide', look: [1, 0] } : { mood: 'eyeroll' }     // one more try. nope.
    if (t < T.settle[1]) return { mood: 'neutral', look: [0, 0] }
    if (t < T.heart) return { mood: 'sparkle', look: [0, -1] }
    return { mood: 'heart' }
  }
  function tauState(t) {
    if (t < T.l2) return { mood: 'sleepy', zzz: true }
    if (t < T.lookOver) return { mood: 'happy' }
    if (t < T.wave[1]) return { mood: 'wink', look: [-1, 0] }
    if (t < T.h2) return { mood: 'happy' }
    return { mood: 'sleepy', zzz: true }
  }
  const ARI_HOPS = [T.carIn + 0.3, T.l1 + 0.1, T.l1 + 0.75, T.h2Land + 0.05]
  const TAU_HOPS = [T.wave[0], T.wave[0] + 0.4, T.wave[0] + 0.8]

  function drawHeroes(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const y = CAR_Y, cell = roadW(y) / NL / 23
    // Taurus, lane 7, never switching
    const tp = pop01(t, T.tauIn, 0.36, 2) * ok
    if (tp > 0.02) {
      const tx = laneX(TAU_LANE, y), ty = y - 4 * Math.abs(Math.sin(t * 2.2 + 1))
      drawStarChar(x, tx, ty - cell * 12, 210 * tp, t, { color: TAU.color, glyph: TAU.glyph, ...tauState(t), hops: TAU_HOPS, seed: 4, glow: 0.8, bob: 2 })
      car(tx, ty, cell * tp, '#3fae6a', { brake: 0 })
      bits(x, BLANKET, tx, ty - cell * 4.2, cell * 1.05 * tp, { C: '#8fd8a8', c: '#e9f7ec' })
    }
    // Aries, swerving
    const ap = pop01(t, T.carIn, 0.36, 2) * ok
    if (ap > 0.02) {
      const { lane, tilt } = ariesLane(t)
      const lurch = SW.reduce((m, s) => { const u = t - s; return u > 0 && u < 0.7 ? m + Math.sin(Math.PI * u / 0.7) * 26 : m }, 0)   // a lunge forward… and right back
      const ax = laneX(lane, y), ay = y - lurch - 3 * Math.abs(Math.sin(t * 2.6))
      drawStarChar(x, ax, ay - cell * 12, 214 * ap, t, { color: ARI.color, glyph: ARI.glyph, ...ariesState(t), hops: ARI_HOPS, seed: 2, glow: 0.9, bob: 2, squash: -tilt * 0.4 })
      car(ax, ay, cell * ap, '#e8382c', { tilt, brake: t > T.settle[0] ? 0 : SW.some(s => t > s + 0.2 && t < s + 0.55) ? 1 : 0 })
      // the glove on the dash, punching the air on every switch
      const jab = SW.reduce((m, s) => { const u = t - s; return u > 0 && u < 0.3 ? Math.max(m, Math.sin(Math.PI * u / 0.3)) : m }, 0)
      if (t < T.settle[0]) bits(x, GLOVE, ax - cell * 13.5, ay - cell * 4 - jab * 30, cell * 0.95 * ap, { R: '#e8382c', h: '#ff8a6a', d: '#9c1d1d', W: '#f3ead8' }, { rot: -0.3 - jab * 0.3 })
      return { ax, ay: ay - cell * 6, cell }
    }
    return null
  }

  // ── the counter: LANE CHANGES n, then MILES AHEAD 0
  function drawCounter(t) {
    const k = pop01(t, SW[0] + 0.1, 0.3, 2.2) * (1 - ease.inCubic(prog(t, T.settle[0], T.settle[0] + 0.3)))
    if (k <= 0.01) return
    const n = switches(t), cx = 540, cy = 640
    const bump = SW.reduce((m, s) => { const u = t - s - 0.15; return u > 0 && u < 0.2 ? Math.max(m, Math.sin(Math.PI * u / 0.2)) : m }, 0)
    const mk = pop01(t, T.miles, 0.3, 2.4)
    x.save(); x.translate(cx, cy); x.scale(k, k)
    const rows = [['LANE CHANGES', String(n), GOLD]]
    if (mk > 0.01) rows.push(['MILES AHEAD', '0', RED])
    const ph = 60, gap = 14, pw = 520
    const h = rows.length * ph + (rows.length - 1) * gap
    rows.forEach(([lbl, val, col], i) => {
      const yy = -h / 2 + i * (ph + gap), sc = i === 1 ? mk : 1
      x.save(); x.translate(0, yy + ph / 2); x.scale(sc, sc)
      x.fillStyle = 'rgba(16,9,38,0.9)'; x.beginPath(); x.roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2); x.fill()
      x.lineWidth = 3; x.strokeStyle = rgba(col, 0.85); x.stroke()
      x.font = `700 28px ${MONO}`; x.textBaseline = 'middle'; x.letterSpacing = '0.12em'
      x.textAlign = 'left'; x.fillStyle = BONE; x.fillText(lbl, -pw / 2 + 34, 2)
      x.letterSpacing = '0px'
      x.textAlign = 'right'; x.fillStyle = col; x.font = `700 ${Math.round(36 * (1 + (i ? 0 : 0.35 * bump)))}px ${MONO}`; x.fillText(val, pw / 2 - 34, 2)
      x.restore()
    })
    x.restore()
  }

  // ── Libra on the horizon (the destination)
  function drawLibra(t) {
    const k = pop01(t, T.libra, 0.5, 1.8) * popOut(t, T.out)
    if (k <= 0.01) return
    const cx = 540, cy = HY - 12 + Math.sin(t * 2) * 4
    glow(cx, cy, 200, LIB.color, 0.9 * k)
    drawStarChar(x, cx, cy, 96 * k, t, { color: LIB.color, mood: t > T.heart ? 'heart' : 'happy', look: [0, 1], seed: 6, glow: 1.1, bob: 3 })
  }

  function floatHearts(t, cx, cy, t0, t1) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.16, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 7) / 6 - 0.5
      bits(x, HEART, cx + side * 220 + Math.sin(p * 7 + i) * 14, cy - 40 - p * 240, 6 + (i % 2), { X: i % 3 ? PINK : '#ff4f86' }, { a: Math.sin(Math.PI * p) })
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
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

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      drawSkyline(t)
      // the ghost peeks over a tower's roof (drawn after the tower; only the ghost is clipped)
      drawGhostCameo(x, t, { x: GHOST_TOWER[0], y: HY - GHOST_TOWER[2], at: T.ghost, dur: 1.3, from: 'below', cell: 3 })
      drawRoad(t)
      if (t < T.out[1] + 0.02) {
        drawLibra(t)
        drawTraffic(t, false)
        const A = drawHeroes(t)
        drawTraffic(t, true)
        drawCounter(t)
        if (A) {
          sparkles(t, A.ax, A.ay - 90, T.settle[1], 10, 150, 1)
          if (t > T.heart) floatHearts(t, A.ax, A.ay - 100, T.heart, T.out[0])
        }
        sparkles(t, 540, HY - 12, T.libra + 0.3, 8, 90, 2, [GOLD, BONE, LIB.color])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 4.35 (H0 out → "Same traffic. Every lane.", the box swaps speakers): the one cut a 15 s film keeps.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: headline, the cars pop in, every lane switch is a whoosh + a blinker tick-tick
  ...wordPops(T.h0, 4, 0.07, 0, 0.024), ...[0, 1, 2].map(i => ['pop', +(T.h0Land + i * 0.1).toFixed(3), NOTE[4 + i], 0.04, 0]),
  ['pop', T.carIn + 0.05, 739.99, 0.04, -0.1], ['pop', T.tauIn + 0.05, 587.33, 0.035, 0.3],
  ...SW.flatMap((s, i) => [['whoosh', +(s - 0.02).toFixed(3), 0.3, 0.032], ['tick', +(s - 0.2).toFixed(3), 0.03], ['tick', +(s - 0.1).toFixed(3), 0.022], ['pop', +(s + 0.17).toFixed(3), NOTE[(i * 2) % 7], 0.022, 0]]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ARIES]: 700, [NARR]: 880 } }),
  // same traffic: MILES AHEAD 0 (a deflating boop), Taurus waves
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.1, 1318.51, 0.035, 0],
  ['pop', T.miles + 0.05, 440, 0.04, 0], ['pop', T.miles + 0.17, 329.63, 0.035, 0],
  ['pluck', T.wave[0], 987.77, 0.03, 0.4, 0.3], ['pluck', T.wave[0] + 0.4, 1174.66, 0.028, 0.4, 0.3],
  // settle: the road calms
  ['bell', T.settle[1], 1318.51, 0.03, 1.2, 0], ['glitter', T.settle[1], T.settle[1] + 0.4],
  // pick a lane: Libra twinkles up on the horizon, heart-eyes
  ...wordPops(T.h2, 3, 0.08, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land + 0.1, 1318.51, 0.045, 0.6, 0], ['pop', T.h2Land + 0.2, 1567.98, 0.035, 0],
  ['bell', T.libra + 0.2, 1760, 0.03, 1.2, 0], ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['glitter', T.heart, T.heart + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
