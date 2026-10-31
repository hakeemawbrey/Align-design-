// sxmythsun — STAR MYTH-BUSTERS #2: "Your sun sign is the whole story." (30 s vertical Align ad, Star Talk Shows,
// show 10; music: synthwave · D). Story 0–25.6, then the shared end card. Same lab as sxmythgemini.
//   0.0–4.55   "Myth: your sun sign is | the *whole story.*"  Lights clunk on. A little birth chart stands in the bell
//              jar (SUBJECT: YOUR CHART), one bright dot in it. THE STARS: "today's myth: one sign tells you *everything.*"
//   4.6–10.0   "Test 1: | the *extraction.*"  (the drop) The jar lifts, lab tongs come down and pluck the bright dot out:
//              it pops into the ☉ SUN star (Leo orange) on the specimen row. Monitor: SUN: LEO ✓. THE STARS: "sun in
//              leo. done. case *closed.*" …the chart rumbles. Monitor: !! MORE INSIDE. Double-takes; Pisces gasps.
//   10.05–14.3 "Test 2: | the *X-ray.*"  (breakdown) The X-ray sweeps the chart: out pop the MOON (Cancer), the RISING
//              (Virgo)… and VENUS (Libra), heart-eyed, who blows THE STARS a kiss: blush, the clipboard drops.
//              THE STARS: "a moon. a rising. and… a *venus?!*"
//   14.35      card cut.
//   14.4–17.9  "Your sun sign is | the *whole story?*"  (the lift) BUSTED. The specimen row hops.
//              THE STARS: "you're not one star. you're a whole *sky.*"
//   17.95–23.4 "Push / Pull / Align | reads *both* charts."  The four planets fly back into your chart; their chart
//              pops in beside it; the reading draws PUSH (pink), PULL (blue), ALIGN (gold) between planets.
//              THE STARS: "it reads every planet. in *both* charts."
//   23.45–25.45 "Read the *whole* sky."  Everything pops out by 25.45; the end card takes over at 25.6.
// One canvas (sky + lab + cast), DOM type + dialogue boxes + stamp + show bug above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS, READING } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, PINK, INK, RED, MINT, CYAN, PHOS, MONO, STEEL, STEEL_L, STEEL_D, rgba, pop01, outK, popOut, bump, keyed, r3,
  drawBits, starGeom, drawGoggles, drawWall, drawBench, drawShelf, drawFlask, drawJar, drawMonitor, phosText, drawClipboard,
  drawTears, buildBug, buildStamp, shakeAt, dust,
} from './lab.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const PIS = signStar('pisces')
const SUNC = '#ffb347'

// ── the timeline
export const T = {
  lights: 0.28,
  h0: 0.15, h0Land: 0.85, h0Out: [4.38, 4.55],
  open1: 1.1, l1: 1.32,
  h1: 4.62, h1Land: 4.98, jarOff: [4.7, 5.1], tongs: [BEAT(8), 5.55], grab: 5.6, pull: [5.6, 6.1], sunPop: 6.12, l2: 6.55,
  rumble: [8.45, 9.3], more: 8.55,
  h1Out: [9.85, 10.0],
  h2: 10.05, h2Land: 10.38, xray: [BEAT(17), 10.8], l3: 10.86, pops: [10.95, 11.75, 12.55], kiss: [12.95, 13.35], drop: [13.35, 13.75],
  cut: 14.38,
  h3: 14.44, h3Land: 14.74, stamp: BEAT(26), rowHop: 15.4, l4: 15.4,
  h3Out: [17.72, 17.88],
  h4: 17.95, h4Land: 18.35, home: [18.0, 18.6], chartL: [17.95, 18.5], chartR: 18.55, l5: 18.75,
  lines: [19.1, 19.65, 20.2],
  h4Out: [23.28, 23.42],
  h5: 23.5, h5Land: 23.85, wink: 24.35, out: [25.05, 25.45], h5Out: [25.18, 25.45],
}

// ── the lines
const SS = 'THE STARS'
const CPS = 28
const LINES1 = [
  { t: T.l1, speaker: SS, text: 'today’s myth: one sign tells you *everything.*' },
  { t: T.l2, speaker: SS, text: 'sun in leo. done. case *closed.*' },
  { t: T.l3, speaker: SS, text: 'a moon. a rising. and… a *venus?!*' },
]
const LINES2 = [
  { t: T.l4, speaker: SS, text: 'you’re not one star. you’re a whole *sky.*' },
  { t: T.l5, speaker: SS, text: 'it reads every planet. in *both* charts.' },
]
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
T.close1 = r3(LT1[2].done + 1.5)
T.close2 = r3(LT2[1].done + 1.6)
T.h2Out = [r3(T.close1 - 0.05), r3(Math.min(T.cut - 0.05, T.close1 + 0.1))]

// ── the planets: [label, sign, longitude in YOUR chart, slot x]
const PLANETS = [
  { id: 'sun', label: 'SUN', sign: 'leo', lon: 135, slot: 150 },
  { id: 'moon', label: 'MOON', sign: 'cancer', lon: 105, slot: 345 },
  { id: 'rising', label: 'RISING', sign: 'virgo', lon: 165, slot: 540 },
  { id: 'venus', label: 'VENUS', sign: 'libra', lon: 195, slot: 735 },
].map((p, i) => ({ ...p, ...signStar(p.sign), born: i === 0 ? T.sunPop : T.pops[i - 1] }))
const THEIRS = [{ sign: 'aquarius', lon: 315 }, { sign: 'taurus', lon: 45 }, { sign: 'sagittarius', lon: 255 }, { sign: 'gemini', lon: 75 }]
  .map(p => ({ ...p, color: signStar(p.sign).color }))
// the reading: [your planet index, their planet index, kind]
const READ = [[0, 0, 'push'], [3, 3, 'pull'], [1, 1, 'align']]
const SLOT_Y = 630, PSIZE = 130

const HOPS = {
  stars: [...talkHops(LINES1, SS, { cps: CPS }), ...talkHops(LINES2, SS, { cps: CPS }), T.stamp + 0.3, T.wink],
  pis: [T.more + 0.05, T.kiss[1], T.stamp + 0.1, T.h5 + 0.3],
}

// ── where things are
const JAR = { cx: 540, base: 1336, w: 384, h: 440 }
const CH0 = { cx: 540, cy: 1110, R: 140 }
const CHL = { cx: 285, cy: 925, R: 170 }, CHR = { cx: 795, cy: 925, R: 170 }
const HOST = { x: 872, y: 1046, size: 210 }, HOST2 = { x: 930, y: 1220, size: 170 }
const PIS_P = { x: 940, y: 694, size: 112 }
const SHELF = { cx: 935, y: 756, w: 300 }
const MON = { cx: 192, cy: 878, w: 300, h: 230 }
const SEED = { stars: 9, pis: 23 }

const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const STARS_K = [
  [0, S_('neutral', [-1, 0])], [T.l1, S_('squint', [-1, 0])], [LT1[0].done + 0.3, S_('neutral', [-1, 0])],
  [T.tongs[0], S_('neutral', [-1, 0])], [T.sunPop, S_('happy')], [T.l2, S_('squint', [-1, -1])], [LT1[1].done, S_('happy')],
  [T.more, S_('wide', [-1, 0], { blink: false, sq: -0.08 })], [T.more + 0.4, S_('wide', [-1, 1], { blink: false })],
  [T.xray[0], S_('neutral', [-1, 0])], [T.pops[0], S_('wide', [-1, -1], { blink: false })], [T.pops[2], S_('wide', [-1, -1], { blink: false, sq: -0.05 })],
  [T.kiss[1], S_('sparkle', [-1, -1], { blush: 1 })], [T.drop[1] + 0.2, S_('happy', [0, 0], { blush: 1 })],
  [T.h3, S_('squint', [-1, -1])], [T.stamp, S_('happy', [0, 0], { sq: 0.06 })], [T.l4, S_('happy')],
  [T.h4, S_('neutral', [-1, -1])], [T.lines[2] + 0.3, S_('sparkle', [-1, -1])], [T.h5, S_('happy')], [T.wink, S_('wink')], [T.wink + 0.5, S_('happy')],
]
const PIS_K = [
  [0, S_('sparkle', [-1, 1])], [T.more, S_('wide', [-1, 1], { blink: false, sq: -0.08 })], [T.more + 0.6, S_('sparkle', [-1, 1])],
  [T.kiss[0], S_('heart', [-1, 1])], [T.drop[1] + 0.4, S_('sparkle', [-1, 1])], [T.stamp, S_('wide', [-1, 1], { blink: false })], [T.stamp + 0.4, S_('sparkle', [-1, 1])],
]
const TEARS = [[0, 0.5], [T.more, 0], [T.rumble[1], 0.6], [T.kiss[1], 1.5], [T.h3, 0.9], [T.rowHop, 1.4], [T.h5, 1.8]]
// each planet star's mood
function planetState(i, t) {
  const p = PLANETS[i]
  if (t < p.born + 0.5) return S_('wide', [0, 0], { blink: false })
  if (p.id === 'venus') return t < T.kiss[1] + 0.3 ? S_('heart') : t < T.h3 ? S_('wink', [1, 0]) : S_('happy')
  if (t >= T.pops[0] && t < T.h3 && i < 3) {      // everyone turns to look at the newcomer
    const last = T.pops.reduce((n, at, k) => (t >= at ? k + 1 : n), 0)
    if (last > i) return S_('neutral', [1, 0])
  }
  if (p.id === 'sun' && t > T.more && t < T.xray[0]) return S_('wide', [0, 1], { blink: false })
  if (p.id === 'moon') return S_('sparkle', [0, 0])
  if (p.id === 'rising') return S_('squint', [0, 0])
  return S_('happy')
}

// ── sound helpers
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

/** a small birth chart: ring, 12 sign bands, small glyphs, planet dots [{ lon, color, a }] */
function drawChart(x, cx, cy, R, planets, { k = 1, glow = 0, t = 0 } = {}) {
  if (k <= 0) return
  const rIn = R * 0.78, ang = lon => Math.PI - lon * Math.PI / 180
  x.save(); x.globalAlpha *= k
  x.fillStyle = 'rgba(12,8,30,0.88)'; x.beginPath(); x.arc(cx, cy, R + 6, 0, Math.PI * 2); x.fill()
  SIGNS.forEach((s, i) => {
    const a0 = ang(i * 30), a1 = ang(i * 30 + 30)
    x.fillStyle = rgba(s.color, 0.22 + 0.25 * glow); x.beginPath(); x.arc(cx, cy, R, a1, a0); x.arc(cx, cy, rIn, a0, a1, true); x.closePath(); x.fill()
  })
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 3; x.beginPath(); x.arc(cx, cy, rIn, 0, Math.PI * 2); x.stroke()
  x.beginPath(); x.arc(cx, cy, R * 0.22, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = ang(i * 30); x.beginPath(); x.moveTo(cx + Math.cos(a) * rIn, cy + Math.sin(a) * rIn); x.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); x.stroke() }
  x.font = `bold ${Math.round(R * 0.15)}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
  SIGNS.forEach((s, i) => { const a = ang(i * 30 + 15), rr = (R + rIn) / 2; x.fillStyle = s.color; x.fillText(s.glyph + '︎', cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) })
  for (const p of planets) {
    if (p.a <= 0.01) continue
    const a = ang(p.lon), rr = rIn * 0.62, px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr
    x.save(); x.globalAlpha *= p.a
    x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(px, py, 0, px, py, R * 0.32); g.addColorStop(0, rgba(p.color, 0.8)); g.addColorStop(1, rgba(p.color, 0))
    x.fillStyle = g; x.beginPath(); x.arc(px, py, R * 0.32, 0, Math.PI * 2); x.fill()
    x.restore()
    x.save(); x.globalAlpha *= p.a
    drawPixelStar(x, px, py, R * 0.27 * (1 + 0.15 * Math.sin(t * 5 + p.lon)), 2, p.color)
    x.restore()
  }
  x.restore()
}
const chartPt = (C, lon) => { const a = Math.PI - lon * Math.PI / 180, rr = C.R * 0.78 * 0.62; return { x: C.cx + Math.cos(a) * rr, y: C.cy + Math.sin(a) * rr } }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 140px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H = [
    [popText(root, 'Myth: your sun sign is | the *whole story.*', { top: 196, size: 100, accentSize: 150, at: T.h0, gap: 0.09, accentColor: SUNC, wobble: true, late: 2, lateAt: T.h0Land }), T.h0Out],
    [popText(root, 'Test 1: | the *extraction.*', { top: 196, size: 104, accentSize: 140, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Test 2: | the *X-ray.*', { top: 196, size: 104, accentSize: 140, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'Your sun sign is | the *whole story?*', { top: 196, size: 100, accentSize: 150, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: SUNC }), T.h3Out],
    [popText(root, 'Push / Pull / Align | reads *both* charts.', { top: 196, size: 92, accentSize: 140, at: T.h4, late: 3, lateAt: T.h4Land, wobble: true, accentColor: GOLD, fit: true }), T.h4Out],
    [popText(root, 'Read the | *whole* sky.', { top: 300, size: 120, accentSize: 180, at: T.h5, late: 2, lateAt: T.h5Land, wobble: true, accentColor: GOLD }), T.h5Out],
  ]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1430, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1430, width: 960, height: 290, open: T.l4 - 0.22, close: T.close2, cps: CPS })
  const stamp = buildStamp(root, { at: T.stamp, out: T.h3Out, cx: 540, cy: 330, w: 720, h: 230, rot: -10 })
  const bug = buildBug(root, { at: 0.35, out: [STORY_END - 0.35, STORY_END - 0.05] })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none' }, root)

  function screen(x, sx, sy, sw, sh, t) {
    if (t < T.h1) {
      phosText(x, 'SUBJECT:', sx + 16, sy + 34, 24); phosText(x, 'YOUR CHART', sx + 16, sy + 70, 30)
      phosText(x, 'STANDBY' + (Math.floor(t * 2.5) % 2 ? '_' : ''), sx + 16, sy + sh - 30, 22, { alpha: 0.75 })
      return
    }
    if (t < T.h2) {
      const alarm = t >= T.more && t < T.h2
      if (alarm && Math.floor((t - T.more) * 6) % 2 === 0) { x.fillStyle = 'rgba(255,40,70,0.5)'; x.fillRect(sx, sy, sw, sh) }
      phosText(x, 'EXTRACTION', sx + 16, sy + 30, 22, { color: alarm ? '#ffd0d6' : PHOS })
      if (t >= T.sunPop) phosText(x, 'SUN: LEO ✓', sx + 16, sy + 78, 28, { alpha: clamp((t - T.sunPop) * 4), color: alarm ? '#ffd0d6' : PHOS })
      if (alarm) phosText(x, '!! MORE INSIDE', sx + sw / 2, sy + 132, 26, { align: 'center', color: '#ffffff' })
      else if (t >= T.l2) phosText(x, 'CASE CLOSED?', sx + 16, sy + 124, 22, { alpha: clamp((t - T.l2) * 3) * 0.8 })
      return
    }
    if (t < T.h4) {
      phosText(x, 'X-RAY', sx + 16, sy + 28, 22)
      PLANETS.forEach((p, i) => { if (t >= p.born) phosText(x, `${p.label}: ${p.sign.toUpperCase()} ✓`, sx + 16, sy + 60 + i * 28, 20, { alpha: clamp((t - p.born) * 4), color: i === 3 ? PINK : PHOS }) })
      if (t >= T.stamp) phosText(x, 'WHOLE SKY', sx + sw - 16, sy + 28, 20, { align: 'right', color: GOLD })
      return
    }
  }

  // the tongs: a steel rod with a two-prong claw at (cx, tipY); open 0…1
  function drawTongs(t) {
    if (t < T.tongs[0] || t > T.pull[1] + 0.3) return
    const down = ease.outCubic(prog(t, ...T.tongs)), up = ease.inOutCubic(prog(t, ...T.pull)), gone = prog(t, T.pull[1], T.pull[1] + 0.3)
    const tip0 = chartPt(CH0, 135)
    const tipY = lerp(440, tip0.y, down) - up * 520 - gone * 400, cx = lerp(540, tip0.x, down)
    const open = t < T.grab ? 1 : 0
    x.save()
    x.fillStyle = INK; x.fillRect(cx - 9, 0, 18, tipY - 20); x.fillStyle = STEEL_L; x.fillRect(cx - 5, 0, 6, tipY - 24); x.fillStyle = STEEL; x.fillRect(cx + 1, 0, 4, tipY - 24)
    for (const s of [-1, 1]) {
      x.save(); x.translate(cx, tipY - 26); x.rotate(s * (0.25 + 0.3 * open))
      x.fillStyle = INK; x.fillRect(-7 + s * 4, 0, 14, 46); x.fillStyle = STEEL_L; x.fillRect(-3 + s * 4, 2, 6, 40)
      x.fillStyle = INK; x.fillRect(s > 0 ? -10 : 0, 38, 14, 12)
      x.restore()
    }
    x.fillStyle = INK; x.fillRect(cx - 18, tipY - 34, 36, 16); x.fillStyle = STEEL; x.fillRect(cx - 14, tipY - 30, 28, 8)
    if (t >= T.grab) drawPixelStar(x, cx, tipY + 12, 34, 2, SUNC)
    x.restore()
  }

  function scene(t) {
    const sh = shakeAt(t, T.stamp, 12)
    const rum = t > T.rumble[0] && t < T.rumble[1] ? 6 * Math.sin(t * 70) * (1 - prog(t, ...T.rumble)) : 0
    drawSky(x, t, { ...SKY_H, dim: 0.42, dy: sh })
    x.save(); x.globalAlpha = 1 - ease.inOutQuad(prog(t, T.out[0], T.out[1]))
    x.save(); x.translate(0, sh)
    drawWall(x, t)
    drawShelf(x, SHELF.cx, SHELF.y, SHELF.w)
    drawFlask(x, 832, SHELF.y - 2, 7, PINK, t, { kind: 'cone', seed: 2 })
    drawFlask(x, 1040, SHELF.y - 2, 6, '#9a7be0', t, { kind: 'tube', seed: 5 })
    const monA = 1 - prog(t, T.h4 - 0.1, T.h4 + 0.25)
    drawMonitor(x, MON.cx, MON.cy, MON.w, MON.h, t, (c, sx, sy, sw, sh2) => screen(c, sx, sy, sw, sh2, t), { alpha: monA, on: clamp((t - T.lights - 0.2) * 4) })
    drawBench(x, t)
    drawFlask(x, 296, 1334, 8, MINT, t, { kind: 'cone', seed: 7, boil: t > T.xray[0] && t < T.h3 ? 2 : 1 })
    drawFlask(x, 1012, 1334, 7, CYAN, t, { kind: 'tube', seed: 11 })
    drawFlask(x, 800, 1334, 6, GOLD, t, { kind: 'cone', seed: 13 })
    x.restore()

    // the chart: in the jar → moves to the left as YOUR chart; THEIR chart pops in on the right
    const mv = ease.inOutCubic(prog(t, ...T.chartL))
    const C = { cx: lerp(CH0.cx, CHL.cx, mv) + rum, cy: lerp(CH0.cy, CHL.cy, mv) + sh, R: lerp(CH0.R, CHL.R, mv) }
    const plateA = 1 - prog(t, T.h4 - 0.1, T.h4 + 0.2)
    drawJar(x, JAR.cx, JAR.base + sh, JAR.w, JAR.h, t, { alpha: plateA, part: 'back', label: 'SUBJECT: YOUR CHART' })
    if (mv < 0.3) { x.save(); x.globalAlpha = 1 - mv / 0.3; x.fillStyle = INK; x.fillRect(CH0.cx - 12, CH0.cy + CH0.R - 4 + sh, 24, JAR.base - CH0.cy - CH0.R + 4); x.fillStyle = STEEL; x.fillRect(CH0.cx - 7, CH0.cy + CH0.R + sh, 14, JAR.base - CH0.cy - CH0.R); x.restore() }
    const xr = prog(t, ...T.xray)
    const dots = PLANETS.map((p, i) => {
      let a
      if (t < T.home[0]) a = i === 0 ? (t < T.grab ? 1 : 0) : (t < p.born ? 0.15 + 0.85 * bump(t, T.xray[0] + 0.1 * i, 0.5) * 0.6 : 0)
      else a = clamp((t - (T.home[0] + 0.1 * i + 0.4)) * 5)
      return { lon: p.lon, color: p.color, a }
    })
    drawChart(x, C.cx, C.cy, C.R, dots, { t, glow: t > T.xray[0] && t < T.xray[1] + 0.4 ? 1 : 0 })
    const rk = pop01(t, T.chartR, 0.4, 2)
    if (rk > 0.01) {
      x.save(); x.translate(CHR.cx, CHR.cy + sh); x.scale(rk, rk); x.translate(-CHR.cx, -CHR.cy)
      drawChart(x, CHR.cx, CHR.cy, CHR.R, THEIRS.map(p => ({ lon: p.lon, color: p.color, a: 1 })), { t })
      x.restore()
      // chart captions
      x.save(); x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE; x.globalAlpha *= clamp((t - T.chartR) * 3)
      x.fillText('YOU', CHL.cx, CHL.cy + CHL.R + 44); x.fillText('THEM', CHR.cx, CHR.cy + CHR.R + 44); x.restore()
    }
    // the reading lines
    READ.forEach(([a, b, kind], i) => {
      const t0 = T.lines[i]
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, t0 + 0.35)), A0 = chartPt(CHL, PLANETS[a].lon), B0 = chartPt(CHR, THEIRS[b].lon)
      const col = READING[kind]
      x.save(); x.strokeStyle = col; x.lineWidth = 7; x.shadowColor = col; x.shadowBlur = 16; x.lineCap = 'round'
      const LBL = { x: 540, y: CHL.cy + (i - 1) * 120 }
      const mx = 2 * LBL.x - 0.5 * (A0.x + B0.x), my = 2 * LBL.y - 0.5 * (A0.y + B0.y)
      x.beginPath(); x.moveTo(A0.x, A0.y)
      const N = 30; for (let k = 1; k <= N * p; k++) { const u = k / N; x.lineTo((1 - u) ** 2 * A0.x + 2 * (1 - u) * u * mx + u * u * B0.x, (1 - u) ** 2 * A0.y + 2 * (1 - u) * u * my + u * u * B0.y) }
      x.stroke(); x.restore()
      if (p >= 1) {
        const lp = pop01(t, t0 + 0.35, 0.28, 2.6), lx = 0.25 * A0.x + 0.5 * mx + 0.25 * B0.x, ly = 0.25 * A0.y + 0.5 * my + 0.25 * B0.y
        x.save(); x.translate(lx, ly); x.scale(lp, lp)
        x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const w = x.measureText(kind.toUpperCase()).width + 30
        x.fillStyle = INK; x.fillRect(-w / 2 - 4, -26, w + 8, 52); x.fillStyle = 'rgba(16,9,38,0.96)'; x.fillRect(-w / 2, -22, w, 44)
        x.fillStyle = col; x.fillText(kind.toUpperCase(), 0, 2)
        x.restore()
      }
    })

    drawJar(x, JAR.cx, JAR.base + sh, JAR.w, JAR.h, t, { alpha: plateA, lift: prog(t, ...T.jarOff), part: 'front' })
    drawTongs(t)
    // the X-ray sweep
    if (t >= T.xray[0] && t < T.xray[1]) {
      const yy = lerp(JAR.base - JAR.h, JAR.base, Math.sin(Math.PI * xr))
      x.save(); x.globalCompositeOperation = 'lighter'
      x.fillStyle = 'rgba(160,120,255,0.18)'; x.fillRect(CH0.cx - 220, JAR.base - JAR.h, 440, JAR.h)
      x.fillStyle = 'rgba(200,180,255,0.95)'; x.fillRect(CH0.cx - 230, yy, 460, 6)
      x.restore()
    }
    const cast = drawCast(t, C)
    void cast
    dust(x, t, T.stamp, 540, 420, { n: 12, R: 420, col: '#ffb3bd' })
    x.restore()
  }

  function drawCast(t, C) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const sh = shakeAt(t, T.stamp, 10)
    // Pisces
    const ps = keyed(t, PIS_K)
    const pisO = { color: PIS.color, ...ps, hops: HOPS.pis, seed: SEED.pis, squash: ps.sq || 0, pop: ok, glow: 0.8 }
    const rp = drawStarChar(x, PIS_P.x + sh * 0.5, PIS_P.y, PIS_P.size, t, pisO)
    const gp = starGeom(t, rp, PIS_P.size, pisO)
    drawGoggles(x, gp, t, { alpha: ok })
    drawTears(x, gp, t, { rate: keyed(t, TEARS) || 0.01, alpha: keyed(t, TEARS) > 0 ? ok : 0, seed: 3 })
    // the specimen row: SUN, MOON, RISING, VENUS
    const home = prog(t, ...T.home)
    PLANETS.forEach((p, i) => {
      if (t < p.born) return
      const hk = ease.inCubic(clamp(home * 1.6 - i * 0.18))
      if (hk >= 1) return
      const from = i === 0 ? { x: lerp(540, chartPt(CH0, 135).x, 1), y: chartPt(CH0, 135).y - 520 } : chartPt(CH0, p.lon)
      const fl = ease.outCubic(prog(t, p.born, p.born + 0.45))
      const target = chartPt(C, p.lon)
      let px = lerp(from.x, p.slot, fl), py = lerp(from.y, SLOT_Y, fl) - Math.sin(Math.PI * fl) * 120
      px = lerp(px, target.x, hk); py = lerp(py, target.y, hk)
      const st = planetState(i, t)
      const o = { color: p.color, glyph: p.glyph, ...st, seed: 30 + i, pop: ok * pop01(t, p.born, 0.4, 2.4) * (1 - hk), hops: [p.born + 0.45, T.rowHop + i * 0.12, T.rowHop + 0.6 + i * 0.12], glow: 1.1 }
      drawStarChar(x, px + sh * 0.4, py, PSIZE, t, o)
      // name tag
      const ta = clamp((t - p.born - 0.35) * 4) * (1 - hk) * ok
      if (ta > 0.01) {
        x.save(); x.globalAlpha = ta; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const w = x.measureText(p.label).width + 22
        x.fillStyle = INK; x.fillRect(px - w / 2 - 3, py + 82, w + 6, 40); x.fillStyle = BONE; x.fillRect(px - w / 2, py + 85, w, 34)
        x.fillStyle = INK; x.fillText(p.label, px, py + 103); x.restore()
      }
      if (t > p.born && t < p.born + 0.7) ring(t, px, py, p.born + 0.3, [GOLD, BONE, p.color])
    })
    // Venus blows THE STARS a kiss
    if (t >= T.kiss[0] && t < T.kiss[1] + 0.25) {
      const k = prog(t, ...T.kiss), sx = PLANETS[3].slot, hx = lerp(sx + 40, HOST.x - 20, ease.inOutCubic(k)), hy = lerp(SLOT_Y, HOST.y - 60, ease.inOutCubic(k)) - Math.sin(Math.PI * k) * 80
      drawBits(x, ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86', W: '#ffd1de' }, hx, hy, 9 * (1 - prog(t, T.kiss[1], T.kiss[1] + 0.25)))
    }
    // THE STARS (host): slides down-right for the reading
    const hm = ease.inOutCubic(prog(t, T.h4 - 0.05, T.h4 + 0.5))
    const hs = keyed(t, STARS_K)
    const hostO = { color: STAR.sky, ...hs, hops: HOPS.stars, seed: SEED.stars, squash: hs.sq || 0, pop: ok, glow: 1.1 }
    const hsz = lerp(HOST.size, HOST2.size, hm)
    const rh = drawStarChar(x, lerp(HOST.x, HOST2.x, hm) + sh * 0.5, lerp(HOST.y, HOST2.y, hm), hsz, t, hostO)
    const gh = starGeom(t, rh, hsz, hostO)
    drawGoggles(x, gh, t, { alpha: ok })
    // the clipboard: held → dropped (on the kiss) → lies on the bench
    const dp = prog(t, ...T.drop)
    const held = { x: rh.x + 96 * hsz / HOST.size, y: rh.y + 74 * hsz / HOST.size }
    const cbx = lerp(held.x, 1000, ease.inQuad(dp)), cby = lerp(held.y, 1300, ease.inQuad(dp)) - Math.sin(Math.PI * dp) * 40
    drawClipboard(x, cbx, cby, 7 * ok, t, { scribble: t > T.l2 && t < LT1[1].done ? 1 : 0, rot: dp > 0 ? lerp(-0.14, 1.45, ease.outCubic(dp)) : -0.14 + 0.04 * Math.sin(t * 2) })
  }

  function ring(t, cx, cy, t0, cols) {
    const tt = t - t0
    if (tt < 0 || tt > 0.6) return
    const p = ease.outCubic(tt / 0.6)
    x.save(); x.globalAlpha = 1 - p
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; drawPixelStar(x, cx + Math.cos(a) * (70 + 60 * p), cy + Math.sin(a) * (70 + 60 * p), 22, i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      scene(t)
      for (const [h, o] of H) h.update(t, outK(t, o))
      box1.update(t); box2.update(t)
      stamp.update(t)
      bug.update(t)
      drawGrain(gx, t)
      const L = T.lights
      black.style.opacity = String(t < L ? 1 : t < L + 0.06 ? 0.04 : t < L + 0.12 ? 0.6 : 0)
    },
  }
}

// one card cut kept (cardfx picks the middle of three): between the X-ray and BUSTED
const CUTS = [4.56, T.cut, 17.92]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

const chipC = (t, f, len, o = {}) => ['chip', r3(t), f, len, { gain: 0.02, ...o }]
export const CUES = [
  ['boom', T.lights, 0.14], ['tick', T.lights, 0.06], ['tick', T.lights + 0.12, 0.04],
  ...wordPops(T.h0, 4, 0.09, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land + 0.1, 1318.51, 0.035, 0.5, 0],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0],
  // test 1: the extraction
  ...wordPops(T.h1, 2, 0.08, 2), ['pop', T.h1Land, 1174.66, 0.04, 0], ['pop', T.h1Land + 0.1, 1318.51, 0.035, 0],
  ['whoosh', T.jarOff[0], 0.5, 0.035], ['whoosh', T.tongs[0], 0.45, 0.03], ['tick', T.tongs[1], 0.04],
  ['tick', T.grab, 0.06], ['pop', T.grab, 330, 0.035, 0], ['whoosh', T.pull[0], 0.4, 0.03],
  ['pop', T.sunPop, 987.77, 0.045, -0.4], ['pluck', T.sunPop + 0.05, 1318.51, 0.04, 0.6, -0.4], ['glitter', T.sunPop, T.sunPop + 0.4], chipC(T.sunPop + 0.2, 1760, 0.15, { gain: 0.025 }),
  ['boom', T.rumble[0], 0.12], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.rumble[0] + i * 0.09), 0.03]),
  chipC(T.more, 1760, 0.12, { gain: 0.035 }), chipC(T.more + 0.15, 1318.51, 0.12, { gain: 0.035 }), chipC(T.more + 0.3, 1760, 0.12, { gain: 0.035 }), ['pop', T.more + 0.05, 330, 0.04, 0.4],
  // test 2: the X-ray
  ...wordPops(T.h2, 2, 0.08, 1), ['pop', T.h2Land, 1174.66, 0.04, 0], ['pop', T.h2Land + 0.1, 1318.51, 0.035, 0],
  ['swell', T.xray[0], T.xray[1], { gain: 0.03 }],
  ...T.pops.flatMap((p, i) => [['pop', p, NOTE[(i * 2 + 1) % 7], 0.045, -0.2 + i * 0.2], ['pluck', r3(p + 0.06), NOTE[(i * 2 + 3) % 7] * 2, 0.035, 0.5, 0], ['glitter', p, r3(p + 0.3)]]),
  ['whoosh', T.kiss[0], 0.35, 0.03], ['pluck', T.kiss[1], 1567.98, 0.045, 0.5, 0.3], ['pop', T.kiss[1] + 0.08, 1318.51, 0.03, 0.3],
  ['tick', T.drop[1], 0.08], ['pop', T.drop[1], 196, 0.04, 0.4],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  // busted
  ...wordPops(T.h3, 4, 0.08, 0), ['pop', T.h3Land, 1174.66, 0.045, 0],
  ['whoosh', T.stamp - 0.18, 0.2, 0.05], ['boom', T.stamp, 0.5], ['crash', T.stamp, { gain: 0.07 }], ['tick', T.stamp, 0.08],
  ...PLANETS.map((p, i) => ['pop', r3(T.rowHop + i * 0.12), NOTE[(i * 2) % 7] * 2, 0.025, -0.3 + i * 0.2]),
  ['pop', T.l4 - 0.22, 739.99, 0.04, 0],
  // tie-in: push / pull / align
  ...wordPops(T.h4, 3, 0.08, 2), ['pop', T.h4Land, 1174.66, 0.04, 0], ['pop', T.h4Land + 0.1, 1318.51, 0.035, 0],
  ['whoosh', T.home[0], 0.5, 0.035], ['pop', T.chartR, 659.25, 0.04, 0.3], ['bell', T.chartR + 0.1, 1318.51, 0.03, 1.2, 0.3],
  ...T.lines.flatMap((l, i) => [['whoosh', l, 0.3, 0.03], ['pluck', r3(l + 0.35), [880, 1174.66, 1318.51][i], 0.045, 0.6, 0], ['bell', r3(l + 0.38), [1318.51, 1567.98, 1760][i], 0.025, 1.0, 0]]),
  ['glitter', T.lines[2] + 0.35, T.lines[2] + 0.9],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 587.33, 0.03, 0],
  // the last line
  ...wordPops(T.h5, 2, 0.1, 1, 0.03), ['pop', T.h5Land, 1174.66, 0.045, 0], ['pluck', T.h5Land, 1318.51, 0.04, 0.6, 0],
  ['pluck', T.wink, 1318.51, 0.035, 0.5, 0.2], ['pop', T.h5 + 0.3, 392, 0.025, 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [SS]: 880 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [SS]: 880 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void RED; void STEEL_D
