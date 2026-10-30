// srvoteballot (20 s, vertical) — Star Talk Remix of voteballot, "Launch city #2 is up to you."  CTA: VOTE FOR YOUR CITY
// Your guide is the ♎ LIBRA star, famously bad at deciding, which is exactly why it hands the vote to you.
//   0.00–5.20  HOOK  "Launch city #2 | is up to *you.*" A ballot card slams down; ten city chips pop on. The Libra star
//              pops up on its top-left corner with its little gold scales. Its eyes dart chip to chip, the scales see-saw.
//              LIBRA: "don't look at me. I'm a *Libra.*" A pictogram finger (you) taps one chip; Libra goes wide-eyed,
//              then melts with relief. (One voter's pick; no counts, no leader.)
//   5.20–10.5  "Every vote | is a *star.*" The tapped chip lifts and becomes a baby star WITH EYES that blinks at you; the
//              ballot sinks, Libra hops down, and the other chips launch as baby stars too, with more stars rising from
//              below. LIBRA: "every vote? a brand-new *star.*" ♓ Pisces pops up in the corner, crying happy tears.
//  10.62       card-motif flip cut.
//  10.7–15.4   "Pick the | next *sky.*" Ten equal candidate stars on a ring, each labelled; Libra sits on a ballot box in the
//              middle. A pulse runs round the ring and Libra's eyes (and scales) chase it: indecisive again.
//              LIBRA: "you pick. I'll just… *agree.*" Constellation lines join all ten, the ballot box gets a gold check,
//              the scales level out and Libra goes heart-eyed. Plain sky from 15.45, end card 15.6.
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { BONE, GOLD, PINK, CYAN, INTER, MONO, D2R, rgba, mixHex, pop01, outScale, glowStroke, makeBurst, drawBurst, popText, drawBits, DROP, DROP_C, HEART, HEART_C } from './kit.js'

export const DURATION = 20
export const CTA = 'VOTE FOR YOUR CITY'
const END = DURATION - ENDCARD_LEN          // 15.6
const SETTLE = 15.45
const BEAT = 60 / 108, B0 = 0.6
const beat = n => +(B0 + n * BEAT).toFixed(3)
const INK = '#1a1033', LAV = '#d9cdf0'
const TAU = Math.PI * 2
const LIBRA = signStar('libra'), PISCES = signStar('pisces')

const T = {
  drop: 0.1, land: beat(0), hookA: 0.22, hook: 0.5, hookLast: beat(1), hookOut: [5.0, 5.2],
  chips: 0.98, chipGap: BEAT / 4, libraIn: 1.62, dither: [2.35, 4.7],
  fingerIn: 3.95, tap: beat(7.5), fingerOut: 5.05, shock: [4.77, 5.15],
  lift: 5.2, morph: [5.2, 5.78], ballotOut: [5.35, 5.85], hop: [5.38, 5.98], launch: 5.45,
  every: 5.62, everyLast: beat(10), rise: [5.9, 7.3], pisces: 8.3, starsOut: [10.15, 10.5], everyOut: [10.3, 10.48],
  cut: 10.62,
  pick: 10.74, pickLast: beat(19), ring: 10.8, libra2: 10.85, chase: [11.35, 12.85], flare: 12.9, lines: [12.95, 13.35], check: beat(23), heart: 13.55,
  pickOut: [15.0, 15.36], out: [15.02, 15.42],
}
const SPEAK = '♎ LIBRA STAR'
const CPS = 28
const L1 = [{ t: 2.55, speaker: SPEAK, text: "don't look at me. I'm a *Libra.*", color: LIBRA.color }]
const L2 = [{ t: 7.3, speaker: SPEAK, text: 'every vote? a brand-new *star.*', color: LIBRA.color }]
const L3 = [{ t: 11.6, speaker: SPEAK, text: "you pick. I'll just… *agree.*", color: LIBRA.color }]
const ALL_LINES = [...L1, ...L2, ...L3]
const BOX = { y: 1590, close: [5.4, 10.2, 14.7] }
const HOPS = talkHops(ALL_LINES, SPEAK, { cps: CPS })

// ── the ballot card
const BAL = { cx: 540, cy: 1060, w: 720, h: 760, r: 52 }
const CITIES = ['New York', 'LA', 'Chicago', 'Austin', 'Miami', 'Atlanta', 'Nashville', 'Seattle', 'Dallas', 'New Orleans']
const CHIP = { w: 300, h: 92, colDx: 165, y0: 870, dy: 116 }
const chipPos = i => ({ x: BAL.cx + (i % 2 ? 1 : -1) * CHIP.colDx, y: CHIP.y0 + Math.floor(i / 2) * CHIP.dy })
const PICK = 5                                // the chip the finger taps — just one voter's pick
const chipAt = i => T.chips + i * T.chipGap
const HERO = { x: 540, y: 800, size: 130 }   // the tapped chip settles here as a baby star
const MIDL = { x: 820, y: 1330, size: 210 }  // Libra in the middle beat
const PISC = { x: 210, y: 1380, size: 140 }
const FINL = { x: 540, y: 1000, size: 190 }  // Libra on the ballot box
const BBOX = { x: 540, y: 1170 }

const RISERS = (() => {
  const r = rng(4242), out = []
  let guard = 0
  const avoid = [[HERO.x, HERO.y, 170], [MIDL.x, MIDL.y, 190], [PISC.x, PISC.y, 150]]
  while (out.length < 34 && guard++ < 4000) {
    const x = 100 + r() * 880, y = 640 + r() * 860
    if (avoid.some(([ax, ay, ar]) => Math.hypot(x - ax, y - ay) < ar)) continue
    if (out.some(o => Math.hypot(o.x - x, o.y - y) < 120)) continue
    out.push({ x, y, x0: x + (r() - 0.5) * 260, at: lerp(T.rise[0], T.rise[1], out.length / 34) + r() * 0.12, size: 20 + Math.round(r() * 3) * 4, kind: Math.floor(r() * 4), col: [GOLD, BONE, LAV, '#ffd98a', PINK, CYAN][Math.floor(r() * 6)], ph: r() * 6.28 })
  }
  return out
})()
const BABY_COL = [GOLD, PINK, CYAN, '#c9a6ff', '#7fe0b5']
const launchAt = i => T.launch + (i % 2) * 0.05 + Math.floor(i / 2) * 0.06
const babyDest = i => RISERS[(i * 3) % RISERS.length]
const BABY_SLOTS = new Set(CITIES.map((_, i) => (i * 3) % RISERS.length))

// the ring of ten candidate stars (equal size, equal light)
const RING = { cx: 540, cy: 1080, rx: 385, ry: 360 }
const ringPt = i => { const a = -Math.PI / 2 + i * (TAU / 10); return { x: RING.cx + Math.cos(a) * RING.rx, y: RING.cy + Math.sin(a) * RING.ry, a } }

function seedOfLife(x, cx, cy, r) {
  x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.stroke()
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; x.beginPath(); x.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r, 0, TAU); x.stroke() }
  x.beginPath(); x.arc(cx, cy, r * 2, 0, TAU); x.stroke()
}
function checkPath(x, pts, k) {
  const L1 = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]), L2 = Math.hypot(pts[2][0] - pts[1][0], pts[2][1] - pts[1][1]), L = (L1 + L2) * k
  x.beginPath(); x.moveTo(...pts[0])
  if (L <= L1) x.lineTo(lerp(pts[0][0], pts[1][0], L / L1), lerp(pts[0][1], pts[1][1], L / L1))
  else { x.lineTo(...pts[1]); const q = (L - L1) / L2; x.lineTo(lerp(pts[1][0], pts[2][0], q), lerp(pts[1][1], pts[2][1], q)) }
  x.stroke()
}

// the chase index on the ring (one lap) — Libra's eyes follow it
const chaseIdx = t => t >= T.chase[0] && t < T.chase[1] ? Math.min(9, Math.floor(prog(t, ...T.chase) * 10)) : -1
// the scales: see-saw while Libra can't decide, level when someone else does
function tilt(t) {
  if (t >= T.dither[0] && t < T.tap) return 0.32 * Math.sin((t - T.dither[0]) * 7.5)
  if (t >= T.tap && t < T.tap + 1.2) { const s = t - T.tap; return 0.32 * Math.sin((T.tap - T.dither[0]) * 7.5) * Math.exp(-s * 4) * Math.cos(s * 12) }
  if (t >= T.chase[0] && t < T.check) { const k = chaseIdx(t); const p = k >= 0 ? ringPt(k) : null; return p ? clamp((p.x - 540) / 385, -1, 1) * 0.34 : 0.3 * Math.sin((t - T.chase[1]) * 9) * Math.exp(-(t - T.chase[1]) * 2) }
  if (t >= T.check && t < T.check + 1.2) { const s = t - T.check; return 0.25 * Math.exp(-s * 5) * Math.cos(s * 14) }
  return 0.05 * Math.sin(t * 1.7)
}
function libraState(t) {
  if (t < T.dither[0]) return { mood: 'happy' }
  if (t < T.tap) { const side = Math.sin((t - T.dither[0]) * 7.5) > 0 ? 1 : -1; return { mood: 'wide', look: [side, 1], blink: false } }
  if (t < T.shock[1]) return { mood: 'wide', look: [1, 1], blink: false }
  if (t < T.hop[1]) return { mood: 'sparkle', look: [0, -1] }
  if (t < L2[0].t) return { mood: 'sparkle', look: [-1, -1] }
  if (t < T.starsOut[1]) return { mood: 'happy', look: [0, 0] }
  if (t < T.chase[0]) return { mood: 'happy', look: [0, 0] }
  const k = chaseIdx(t)
  if (k >= 0) { const p = ringPt(k); return { mood: 'wide', look: [clamp((p.x - FINL.x) / 200, -1, 1), clamp((p.y - FINL.y) / 200, -1, 1)], blink: false } }
  if (t < T.check) return { mood: 'squint', look: [0, 0] }
  if (t < T.heart) return { mood: 'wide', look: [0, 1], blink: false }
  return { mood: 'heart', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 150px Inter", "800 104px Inter", "700 40px Inter", "italic 500 190px 'EB Garamond'", "700 30px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0a = popText(root, 'Launch city #2', { top: 178, size: 100, weight: 800, at: T.hookA, gap: 0.09 })
  const H0 = popText(root, 'is up to *you.*', { top: 290, size: 130, weight: 800, accentSize: 190, at: T.hook, gap: 0.1, accentColor: GOLD, lastAt: T.hookLast, wobble: true })
  const H1 = popText(root, 'Every vote | is a *star.*', { top: 200, size: 130, weight: 800, accentSize: 190, at: T.every, gap: 0.1, accentColor: GOLD, lastAt: T.everyLast, wobble: true })
  const H3 = popText(root, 'Pick the | next *sky.*', { top: 196, size: 140, weight: 800, accentSize: 200, at: T.pick, gap: 0.1, accentColor: GOLD, lastAt: T.pickLast, wobble: true })
  const TEXTS = [[H0a, T.hookOut], [H0, T.hookOut], [H1, T.everyOut], [H3, T.pickOut]]
  const boxes = [L1, L2, L3].map((L, i) => dialogueBox(root, { lines: L, y: BOX.y, width: 960, height: 280, close: BOX.close[i], cps: CPS }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B = (k, n = 8, d = 90) => makeBurst(900 + k, n, d)
  const B_LAND = B(1, 14, 300), B_CHIP = CITIES.map((_, i) => B(10 + i, 6, 90)), B_TAP = B(3, 12, 170)
  const B_HERO = B(4, 12, 200), B_LIB = B(5, 10, 170), B_SKY = B(7, 10, 200), B_CHECK = B(8, 14, 240), B_PIS = B(9, 8, 120), B_FLARE = B(20, 12, 260)

  const ballotGeom = t => {
    const dp = prog(t, T.drop, T.land)
    const since = t - T.land
    const squash = since > 0 && since < 0.32 ? 1 - 0.07 * Math.sin(Math.PI * since / 0.32) : 1
    const tapJolt = t > T.tap && t < T.tap + 0.25 ? 6 * Math.sin(Math.PI * (t - T.tap) / 0.25) : 0
    const op = prog(t, T.ballotOut[0], T.ballotOut[1])
    const cy = lerp(-700, BAL.cy, easeOutBack(dp, 1.3)) + tapJolt + 1300 * ease.inCubic(op) + (dp >= 1 ? 6 * Math.sin((t - T.land) * 2.1) : 0)
    const rot = lerp(-10, 0, ease.outCubic(dp)) + 7 * ease.inCubic(op)
    return { cy, rot, squash, alpha: clamp(dp * 4) * (1 - prog(op, 0.75, 1)) }
  }
  function drawChip(i, cx, cy, s, filled = 0, checkK = 0, alpha = 1) {
    x.save(); x.translate(cx, cy); x.scale(s, s); x.globalAlpha *= alpha
    const w = CHIP.w, h = CHIP.h
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
    x.fillStyle = mixHex('#2c1a5e', GOLD, filled); x.fill()
    glowStroke(x, filled > 0.5 ? '#fff1c8' : rgba(BONE, 0.85), 4, filled > 0.5 ? 22 : 8); x.stroke(); x.shadowBlur = 0
    const bx = -w / 2 + 46
    x.beginPath(); x.arc(bx, 0, 23, 0, TAU)
    x.fillStyle = filled > 0.5 ? INK : 'rgba(10,6,24,0.5)'; x.fill()
    x.strokeStyle = filled > 0.5 ? INK : rgba(GOLD, 0.9); x.lineWidth = 4; x.stroke()
    if (checkK > 0) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 8; x.lineCap = 'round'; x.lineJoin = 'round'; checkPath(x, [[bx - 11, 1], [bx - 3, 10], [bx + 13, -10]], checkK); x.restore() }
    x.font = `700 ${CITIES[i].length > 9 ? 33 : 38}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = filled > 0.5 ? INK : BONE
    x.fillText(CITIES[i], 26, 2)
    x.restore()
  }
  function drawBallot(t) {
    if (t < T.drop || t > T.ballotOut[1] + 0.05) return
    const g = ballotGeom(t)
    if (g.alpha <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const gk = ease.outCubic(prog(t, T.land - 0.1, T.land + 0.4)) * g.alpha
    const gr = x.createRadialGradient(BAL.cx, g.cy, 60, BAL.cx, g.cy, 720); gr.addColorStop(0, rgba('#b98cff', 0.3 * gk)); gr.addColorStop(0.5, rgba(GOLD, 0.08 * gk)); gr.addColorStop(1, rgba('#7c74f0', 0))
    x.fillStyle = gr; x.fillRect(0, g.cy - 800, 1080, 1600); x.restore()
    x.save(); x.globalAlpha = g.alpha
    x.translate(BAL.cx, g.cy + BAL.h / 2); x.rotate(g.rot * D2R); x.scale(1 / g.squash, g.squash); x.translate(0, -BAL.h / 2)
    const L = -BAL.w / 2, Tp = -BAL.h / 2
    x.save(); x.shadowColor = 'rgba(3,1,12,0.7)'; x.shadowBlur = 50; x.shadowOffsetY = 24
    x.beginPath(); x.roundRect(L, Tp, BAL.w, BAL.h, BAL.r)
    const bg = x.createLinearGradient(0, Tp, 0, -Tp); bg.addColorStop(0, '#2d1964'); bg.addColorStop(1, '#150b33')
    x.fillStyle = bg; x.fill(); x.restore()
    x.save(); x.beginPath(); x.roundRect(L, Tp, BAL.w, BAL.h, BAL.r); x.clip()
    x.strokeStyle = rgba(GOLD, 0.11); x.lineWidth = 4; seedOfLife(x, 0, 100, 160)
    x.restore()
    glowStroke(x, GOLD, 7, 22); x.beginPath(); x.roundRect(L, Tp, BAL.w, BAL.h, BAL.r); x.stroke(); x.shadowBlur = 0
    x.strokeStyle = rgba(GOLD, 0.45); x.lineWidth = 2.5; x.beginPath(); x.roundRect(L + 20, Tp + 20, BAL.w - 40, BAL.h - 40, BAL.r - 18); x.stroke()
    x.imageSmoothingEnabled = false
    for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1]]) drawPixelStar(x, sx * (BAL.w / 2 - 50), sy * (BAL.h / 2 - 50), 16, 1, GOLD)
    x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD
    x.fillText('BALLOT · LAUNCH CITY #2', 0, Tp + 74)
    x.strokeStyle = rgba(GOLD, 0.5); x.lineWidth = 2
    x.beginPath(); x.moveTo(-240, Tp + 114); x.lineTo(-20, Tp + 114); x.moveTo(20, Tp + 114); x.lineTo(240, Tp + 114); x.stroke()
    drawPixelStar(x, 0, Tp + 114, 12, 0, GOLD)
    x.restore()
    const dy = g.cy - BAL.cy
    CITIES.forEach((_, i) => {
      if (i === PICK && t > T.lift) return
      if (t > launchAt(i) && i !== PICK) return
      const p = chipPos(i)
      const k = pop01(t, chipAt(i), 0.3)
      if (k <= 0) return
      const cy = p.y + dy
      // Libra's eyes dart between the columns: the chip it's "considering" glows a little
      const considering = t > T.dither[0] && t < T.tap && i !== PICK && ((Math.sin((t - T.dither[0]) * 7.5) > 0) === (i % 2 === 1)) && Math.floor((t - T.dither[0]) * 2.4) % 5 === Math.floor(i / 2)
      const tapP = i === PICK ? prog(t, T.tap, T.tap + 0.22) : 0
      const press = i === PICK && t > T.tap - 0.04 && t < T.tap + 0.2 ? 1 - 0.08 * Math.sin(Math.PI * (t - T.tap + 0.04) / 0.24) : 1
      drawChip(i, p.x, cy, k * press * (considering ? 1.05 : 1), i === PICK ? ease.outCubic(tapP) : considering ? 0.18 : 0, i === PICK ? prog(t, T.tap + 0.05, T.tap + 0.3) : 0, g.alpha)
      drawBurst(x, B_CHIP[i], p.x, cy, t, chipAt(i), [GOLD, PINK, CYAN, LAV][i % 4], 0.5)
    })
    const pp = chipPos(PICK)
    const rp = prog(t, T.tap, T.tap + 0.5)
    if (rp > 0 && rp < 1) {
      x.save(); x.globalAlpha = (1 - rp) * 0.9; glowStroke(x, GOLD, 6, 16)
      const e = ease.outCubic(rp)
      x.beginPath(); x.roundRect(pp.x - CHIP.w / 2 - 40 * e, pp.y + dy - CHIP.h / 2 - 40 * e, CHIP.w + 80 * e, CHIP.h + 80 * e, CHIP.h); x.stroke(); x.restore()
    }
    drawBurst(x, B_TAP, pp.x, pp.y + dy, t, T.tap + 0.02, GOLD, 0.7)
  }
  // the pictogram finger (you): enters from the right, taps the chip, leaves
  function drawFinger(t) {
    if (t < T.fingerIn || t > T.fingerOut + 0.45) return
    const p = chipPos(PICK)
    const tip = { x: p.x + 118, y: p.y + 28 }
    const inP = ease.outCubic(prog(t, T.fingerIn, T.tap - 0.08)), outP = ease.inCubic(prog(t, T.fingerOut, T.fingerOut + 0.4))
    const pressD = t > T.tap - 0.1 && t < T.tap + 0.22 ? Math.sin(Math.PI * (t - T.tap + 0.1) / 0.32) : 0
    const off = 1 - inP + outP
    const ang = -32 * D2R
    const ux = Math.sin(-ang), uy = Math.cos(ang)
    const back = 640 * off - 26 * pressD
    x.save(); x.translate(tip.x + ux * back + 30 * off, tip.y + uy * back); x.rotate(ang)
    const shape = (grow) => {
      x.beginPath(); x.roundRect(-30 - grow, -grow, 60 + grow * 2, 230 + grow, 30 + grow)
      x.roundRect(-40 - grow, 150 - grow, 200 + grow * 2, 210 + grow * 2, 70 + grow)
      x.roundRect(10 - grow, 330 - grow, 130 + grow * 2, 700, 40 + grow)
    }
    x.save(); x.fillStyle = BONE; x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 20; shape(7); x.fill(); x.restore()
    x.fillStyle = '#2a1d4f'; shape(0); x.fill()
    x.strokeStyle = rgba(BONE, 0.55); x.lineWidth = 5; x.lineCap = 'round'
    for (const yy of [215, 262, 309]) { x.beginPath(); x.moveTo(52, yy); x.lineTo(148, yy); x.stroke() }
    x.fillStyle = PINK; x.beginPath(); x.roundRect(4, 410, 142, 46, 14); x.fill()
    x.restore()
  }

  // the little gold balance scales (pivot at cx, cy; s = half-beam)
  function scales(cx, cy, s, a, alpha = 1) {
    if (alpha <= 0) return
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy)
    x.strokeStyle = GOLD; x.fillStyle = GOLD; x.lineWidth = Math.max(4, s * 0.09); x.lineCap = 'round'; x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 10
    x.beginPath(); x.moveTo(0, 0); x.lineTo(0, s * 1.25); x.stroke()
    x.beginPath(); x.moveTo(-s * 0.4, s * 1.25); x.lineTo(s * 0.4, s * 1.25); x.stroke()
    x.beginPath(); x.arc(0, -s * 0.08, s * 0.1, 0, TAU); x.fill()
    const ex = Math.cos(a) * s, ey = Math.sin(a) * s
    x.beginPath(); x.moveTo(-ex, -ey); x.lineTo(ex, ey); x.stroke()
    for (const sg of [-1, 1]) {
      const px = sg * ex, py = sg * ey, d = s * 0.6
      x.lineWidth = Math.max(2, s * 0.04)
      x.beginPath(); x.moveTo(px, py); x.lineTo(px - s * 0.3, py + d); x.moveTo(px, py); x.lineTo(px + s * 0.3, py + d); x.stroke()
      x.beginPath(); x.moveTo(px - s * 0.38, py + d); x.quadraticCurveTo(px, py + d + s * 0.36, px + s * 0.38, py + d); x.closePath(); x.fill()
      x.lineWidth = Math.max(4, s * 0.09)
    }
    x.restore()
  }

  // ── Libra: perched on the ballot, hops down to the side, then sits on the ballot box at the end
  function libra(t) {
    if (t < T.libraIn) return
    const st = libraState(t)
    let cx, cy, sz, pop = 1, sq = 0, alpha = 1
    if (t < T.cut) {
      const g = ballotGeom(Math.min(t, T.ballotOut[0]))
      const perch = { x: 225, y: g.cy - BAL.h / 2 - 0.44 * 170 + 10 }
      pop = easeOutBack(prog(t, T.libraIn, T.libraIn + 0.36), 2.4)
      const hp = prog(t, ...T.hop)
      cx = lerp(perch.x, MIDL.x, ease.inOutCubic(hp)); cy = lerp(perch.y, MIDL.y, ease.inOutCubic(hp)) - 260 * Math.sin(Math.PI * hp)
      sz = lerp(170, MIDL.size, hp)
      if (hp > 0 && hp < 1) sq = -0.12
      const land = t - T.hop[1]
      if (land > 0 && land < 0.6) sq += 0.28 * Math.exp(-land * 8) * Math.cos(land * 22)
      const sh = t - T.shock[0]
      if (sh > 0 && sh < 0.5) sq += -0.16 * Math.exp(-sh * 7) * Math.cos(sh * 20)
      alpha = 1 - ease.inQuad(prog(t, ...T.starsOut))
    } else {
      if (t < T.libra2) return
      cx = FINL.x; sz = FINL.size; cy = FINL.y
      pop = easeOutBack(prog(t, T.libra2, T.libra2 + 0.4), 2.2) * outScale(t, T.out[0], 0.36)
      const ck = t - T.check
      if (ck > 0 && ck < 0.6) sq += 0.24 * Math.exp(-ck * 8) * Math.cos(ck * 22)
    }
    if (pop <= 0 || alpha <= 0) return
    const r = drawStarChar(x, cx, cy, sz, t, { color: LIBRA.color, glyph: LIBRA.glyph, ...st, squash: sq, pop, alpha, hops: HOPS, seed: 7 })
    // the scales float beside it (on the right; on the left once Libra stands on the right side)
    const side = t < T.cut && t > T.hop[0] + 0.3 ? -1 : 1
    scales(cx + side * sz * 0.78, cy - sz * 0.18, sz * 0.3 * pop, tilt(t), alpha * clamp(pop))
    if (t < T.cut) drawBurst(x, B_LIB, cx, cy, t, T.libraIn, LIBRA.color, 0.6)
    // heart-eyes at the end: little hearts float up
    if (t > T.heart && t > T.cut) {
      for (let i = 0; i < 6; i++) {
        const born = T.heart + i * 0.24, p = (t - born) / 1.4
        if (p < 0 || p >= 1) continue
        const sd = ((i * 37) % 7) / 6 - 0.5
        drawBits(x, HEART, HEART_C, Math.round(cx + sd * 240 + Math.sin(p * 4 + i) * 14), Math.round(r.top - p * 120), 8 * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) * clamp(pop) })
      }
    }
  }

  // the tapped chip lifts off and becomes YOUR baby star (with eyes)
  function hero(t) {
    if (t < T.lift || t > T.starsOut[1] + 0.05) return
    const p = chipPos(PICK)
    const m = ease.inOutCubic(prog(t, ...T.morph))
    const cx = lerp(p.x, HERO.x, m), cy = lerp(p.y, HERO.y, m) - 120 * Math.sin(Math.PI * m)
    const out = 1 - ease.inCubic(prog(t, ...T.starsOut))
    if (m < 0.55) drawChip(PICK, cx, cy, lerp(1, 0.25, m / 0.55), 1, 1, 1 - prog(m, 0.35, 0.55))
    if (m > 0 && m < 1) {
      x.save(); x.globalCompositeOperation = 'lighter'
      for (let j = 1; j <= 6; j++) {
        const mj = Math.max(0, m - j * 0.05), tx = lerp(p.x, HERO.x, mj), ty = lerp(p.y, HERO.y, mj) - 120 * Math.sin(Math.PI * mj)
        x.globalAlpha = 0.5 * (1 - j / 7); x.fillStyle = GOLD; x.beginPath(); x.arc(tx, ty, 22 * (1 - j / 8), 0, TAU); x.fill()
      }
      x.restore()
    }
    const sk = easeOutBack(prog(m, 0.4, 1), 2.4) * out
    if (sk > 0) {
      x.save(); x.translate(cx, cy); x.globalCompositeOperation = 'lighter'; x.rotate(t * 0.35)
      for (let i = 0; i < 8; i++) {
        x.rotate(Math.PI / 4)
        const rg = x.createLinearGradient(0, 0, 0, -320); rg.addColorStop(0, rgba(GOLD, 0.18 * sk)); rg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = rg; x.beginPath(); x.moveTo(-10, 0); x.lineTo(-36, -320); x.lineTo(36, -320); x.lineTo(10, 0); x.fill()
      }
      x.restore()
      const mood = t < T.morph[1] + 0.5 ? 'wide' : t < L2[0].t ? 'happy' : 'sparkle'
      drawStarChar(x, cx, cy, HERO.size, t, { color: '#ffd76a', mood, look: [0, 0], pop: sk, seed: 11, glow: 1.3, blink: t < T.morph[1] + 0.5 ? false : undefined })
    }
    drawBurst(x, B_HERO, HERO.x, HERO.y, t, T.morph[1] - 0.05, GOLD, 0.8)
  }

  // the other chips launch as baby stars; more stars rise from below and twinkle
  function risers(t) {
    if (t < T.launch || t > T.starsOut[1] + 0.05) return
    const outAll = 1 - ease.inCubic(prog(t, ...T.starsOut))
    RISERS.forEach((s, i) => {
      if (BABY_SLOTS.has(i)) return
      const f = ease.outCubic(prog(t, s.at, s.at + 0.85))
      if (f <= 0) return
      const px = lerp(s.x0, s.x, f), py = lerp(2000, s.y, f)
      const tw = f >= 1 ? 0.7 + 0.3 * Math.sin(t * 5 + s.ph) : 1
      x.save(); x.imageSmoothingEnabled = false; x.globalAlpha = outAll * tw * clamp(f * 4)
      drawPixelStar(x, px, py, s.size, s.kind, s.col)
      x.restore()
    })
    CITIES.forEach((_, i) => {
      if (i === PICK) return
      const la = launchAt(i)
      const g = ballotGeom(la), p0 = chipPos(i), from = { x: p0.x, y: p0.y + g.cy - BAL.cy }
      const dest = babyDest(i)
      const f = ease.outCubic(prog(t, la, la + 0.7))
      if (f <= 0) return
      const px = lerp(from.x, dest.x, f), py = lerp(from.y, dest.y, f) - 160 * Math.sin(Math.PI * f)
      const moods = ['happy', 'sparkle', 'wide', 'happy', 'wink']
      const mood = f < 1 ? 'wide' : moods[i % moods.length]
      drawStarChar(x, px, py, lerp(40, 84, f), t, { color: BABY_COL[i % BABY_COL.length], mood: mood === 'wink' && Math.sin(t * 1.3 + i) < 0.6 ? 'happy' : mood, look: [clamp((540 - dest.x) / 400, -1, 1) * 0.6, 0], seed: 20 + i, alpha: outAll, tips: false, glow: 0.8 })
      drawBurst(x, B_CHIP[i], from.x, from.y, t, la, GOLD, 0.45)
    })
  }

  // ♓ Pisces, crying happy tears in the corner
  function pisces(t) {
    if (t < T.pisces || t > T.starsOut[1] + 0.05) return
    const k = easeOutBack(prog(t, T.pisces, T.pisces + 0.4), 2.4) * (1 - ease.inCubic(prog(t, ...T.starsOut)))
    if (k <= 0) return
    const r = drawStarChar(x, PISC.x, PISC.y, PISC.size, t, { color: PISCES.color, glyph: PISCES.glyph, mood: 'sparkle', look: [1, -1], pop: k, seed: 9, squash: 0.04 * Math.sin(t * 14) })
    for (let i = 0; i < 8; i++) {
      const s0 = T.pisces + 0.35 + i * 0.22, d = t - s0
      if (d < 0 || d > 0.7) continue
      const sg = i % 2 ? 1 : -1
      drawBits(x, DROP, DROP_C, Math.round(PISC.x + sg * (32 + d * 90)), Math.round(r.top + PISC.size * 0.42 + d * 60 + d * d * 260), 7, { alpha: (1 - d / 0.7) * k })
    }
    drawBurst(x, B_PIS, PISC.x, PISC.y, t, T.pisces, PISCES.color, 0.5)
  }

  // ── the final: ten equal candidate stars on a ring, Libra on the ballot box in the middle
  function skyRing(t) {
    if (t < T.ring || t > T.out[1] + 0.02) return
    const out = 1 - ease.inCubic(prog(t, ...T.out))
    const lp = prog(t, ...T.lines)
    if (lp > 0) {
      x.save(); glowStroke(x, GOLD, 3.5, 12); x.globalAlpha = 0.7 * out
      const segs = 10 * lp
      x.beginPath()
      for (let j = 0; j <= Math.floor(segs) && j <= 10; j++) {
        const a = ringPt(j % 10), b = ringPt((j + 1) % 10), f = Math.min(1, segs - j)
        if (j === 0) x.moveTo(a.x, a.y)
        if (f > 0) x.lineTo(lerp(a.x, b.x, f), lerp(a.y, b.y, f))
      }
      x.stroke(); x.restore()
    }
    const ck = chaseIdx(t)
    const fl = t > T.flare ? Math.exp(-(t - T.flare) * 4) : 0
    for (let i = 0; i < 10; i++) {
      const p = ringPt(i)
      const k = pop01(t, T.ring + i * 0.05, 0.34) * out
      if (k <= 0) continue
      const on = i === ck ? 1 : 0
      x.save(); x.globalCompositeOperation = 'lighter'
      const gr = x.createRadialGradient(p.x, p.y, 2, p.x, p.y, 100); gr.addColorStop(0, rgba(GOLD, (0.28 + 0.4 * on + 0.4 * fl) * k)); gr.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = gr; x.beginPath(); x.arc(p.x, p.y, 100, 0, TAU); x.fill(); x.restore()
      const mood = t > T.check ? 'happy' : on ? 'wide' : 'neutral'
      drawStarChar(x, p.x, p.y - 4, 84 * (1 + 0.18 * on + 0.12 * fl), t, { color: BABY_COL[i % BABY_COL.length], mood, look: [clamp((540 - p.x) / 300, -1, 1), clamp((1000 - p.y) / 300, -1, 1)], pop: k, seed: 30 + i, tips: false, glow: 0.8 + 0.6 * on })
      x.save(); x.globalAlpha = clamp(k * 2) * 0.95
      x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const lab = CITIES[i].toUpperCase(), tw2 = x.measureText(lab).width
      const ly = p.y + (Math.sin(p.a) < -0.95 ? -62 : 60)
      const lx = clamp(p.x, 70 + tw2 / 2, 1010 - tw2 / 2)
      x.fillStyle = 'rgba(8,5,20,0.6)'; x.beginPath(); x.roundRect(lx - tw2 / 2 - 12, ly - 21, tw2 + 24, 42, 21); x.fill()
      x.fillStyle = on ? GOLD : BONE; x.fillText(lab, lx, ly + 1)
      x.restore()
    }
    drawBurst(x, B_FLARE, RING.cx, RING.cy, t, T.flare, GOLD, 0.8)
    // the ballot box under Libra, gets a gold check
    const bk = pop01(t, T.ring + 0.1, 0.36) * out
    if (bk > 0) {
      x.save(); x.translate(BBOX.x, BBOX.y); x.scale(bk, bk)
      x.globalCompositeOperation = 'lighter'
      const gr = x.createRadialGradient(0, 0, 10, 0, 0, 280); gr.addColorStop(0, rgba(GOLD, 0.35 * prog(t, T.check, T.check + 0.2))); gr.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = gr; x.beginPath(); x.arc(0, 0, 280, 0, TAU); x.fill()
      x.globalCompositeOperation = 'source-over'
      x.beginPath(); x.roundRect(-115, -80, 230, 160, 28); x.fillStyle = '#21124a'; x.fill()
      glowStroke(x, GOLD, 7, 18); x.stroke(); x.shadowBlur = 0
      x.fillStyle = '#0b0620'; x.beginPath(); x.roundRect(-60, -80, 120, 12, 6); x.fill()
      x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = rgba(GOLD, 0.85)
      x.fillText('VOTE', 0, 34)
      const ckK = ease.outCubic(prog(t, T.check, T.check + 0.28))
      if (ckK > 0) { glowStroke(x, GOLD, 18, 22); checkPath(x, [[-50, -18], [-14, 16], [56, -56]], ckK) }
      x.restore()
    }
    drawBurst(x, B_CHECK, BBOX.x, BBOX.y, t, T.check + 0.15, GOLD, 0.8)
    drawBurst(x, B_SKY, 540, 470, t, T.pickLast + 0.1, GOLD, 0.7)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < SETTLE) {
        risers(t); drawBallot(t); hero(t); pisces(t); skyRing(t); libra(t); drawFinger(t)
        drawBurst(x, B_LAND, BAL.cx, BAL.cy - BAL.h / 2, t, T.land, GOLD, 0.7)
      }
      for (const b of boxes) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.2)))
      for (const [h, o] of TEXTS) h.update(t, 1 - ease.inQuad(prog(t, ...o)))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts: 5.42 (the ballot sinks → "Every vote is a star.") and 10.62 (stars out → "Pick the next sky.").
// The selection plays one (the 10.62 flip).
const CUTS = [{ t: 5.42, kind: 'deal' }, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END, cta: CTA }),
  cardFrame({ start: 0, end: END, label: 'LAUNCH CITY #2 · VOTE' }), cardCuts(CUTS)]

// ── cues (pitched in D, re-keyed by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51, 1479.98, 1760, 1975.53]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: the ballot slams down, chips pop on, Libra pops up and can't decide
  ['whoosh', T.drop, 0.45, 0.045],
  ['boom', T.land, 0.07], ['pop', T.land, 587.33, 0.06, 0], ['pluck', T.land, 1174.66, 0.045, 0.7, 0], ['glitter', T.land, T.land + 0.6],
  ...wordPops(T.hookA, 3, 0.09, 0),
  ...wordPops(T.hook, 3, 0.1, 2),
  ['pop', T.hookLast, 1318.51, 0.06, 0], ['bell', r3(T.hookLast + 0.03), 1760, 0.035, 1.2, 0],
  ...CITIES.map((_, i) => ['pop', r3(chipAt(i)), NOTE[i], 0.035, (i % 2 ? 0.3 : -0.3)]),
  ['pop', T.libraIn, 880, 0.05, -0.3], ['pop', r3(T.libraIn + 0.08), 1174.66, 0.04, -0.3],
  ...Array.from({ length: 8 }, (_, k) => ['tick', r3(T.dither[0] + 0.21 + k * (Math.PI / 7.5)), 0.03]),
  ...talkCues(ALL_LINES, { cps: CPS }),
  // the tap (you decide), Libra's shock + relief
  ['whoosh', T.fingerIn, 0.35, 0.03],
  ['tick', T.tap, 0.06], ['pop', T.tap, 880, 0.065, 0.2], ['pluck', r3(T.tap + 0.05), 1318.51, 0.05, 0.6, 0.2], ['bell', r3(T.tap + 0.1), 1760, 0.035, 1.2, 0.2],
  ['pop', r3(T.shock[0] + 0.05), 1479.98, 0.04, -0.3],
  ['whoosh', T.fingerOut, 0.3, 0.025],
  ['riser', T.lift - 0.1, T.morph[1], 0.035], ['bell', T.morph[1], 1975.53, 0.04, 1.6, 0], ['glitter', T.morph[1] - 0.05, T.morph[1] + 0.6],
  // every vote is a star
  ['whoosh', T.ballotOut[0], 0.45, 0.035], ['whoosh', T.hop[0], 0.3, 0.025], ['boom', T.hop[1], 0.06], ['tick', T.hop[1], 0.05],
  ...CITIES.filter((_, i) => i !== PICK).map((_, j) => ['pop', r3(T.launch + j * 0.055), NOTE[(j + 4) % NOTE.length], 0.022, (j % 2 ? 0.35 : -0.35)]),
  ...wordPops(T.every, 4, 0.1, 1),
  ['pop', T.everyLast, 1318.51, 0.055, 0], ['bell', r3(T.everyLast + 0.04), 1975.53, 0.035, 1.4, 0],
  ['glitter', T.rise[0], T.rise[1] + 0.6],
  ...RISERS.filter((_, i) => i % 4 === 1).map((s, j) => ['bell', r3(s.at + 0.85), NOTE[(j * 3) % NOTE.length], 0.014, 0.8, +((s.x - 540) / 600).toFixed(2)]),
  ['pop', T.pisces, 659.25, 0.045, -0.4], ['pop', r3(T.pisces + 0.1), 587.33, 0.035, -0.4],
  ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.pisces + 0.4 + i * 0.44), 1760 - i * 80, 0.015, -0.4]),
  ['whoosh', T.starsOut[0], 0.35, 0.03],
  // pick the next sky
  ...wordPops(T.pick, 3, 0.1, 3),
  ['pop', T.pickLast, 1174.66, 0.06, 0],
  ...Array.from({ length: 10 }, (_, i) => ['pop', r3(T.ring + i * 0.05), NOTE[i], 0.016, +((ringPt(i).x - 540) / 600).toFixed(2)]),
  ['pop', T.libra2, 880, 0.045, 0],
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.chase[0] + i * 0.15), 0.025]),
  ['boom', T.flare, 0.05], ['glitter', T.flare, T.flare + 0.5],
  ['riser', T.lines[0] - 0.2, T.check, 0.035],
  ['pop', T.check, 880, 0.065, 0], ['pluck', T.check, 587.33, 0.055, 0.9, 0], ['bell', r3(T.check + 0.04), 1318.51, 0.045, 2.0, -0.2], ['bell', r3(T.check + 0.1), 1760, 0.045, 2.0, 0.2],
  ['glitter', T.check, T.check + 0.7], ['pop', T.heart, 1174.66, 0.035, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
