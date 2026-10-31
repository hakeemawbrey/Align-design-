// sxmythscorpio — STAR MYTH-BUSTERS #3: "Scorpios are scary." (30 s vertical Align ad, Star Talk Shows, show 10;
// music: funk · Gm). It's Halloween. Story 0–25.6, then the shared end card. Same lab as sxmythgemini / sxmythsun.
//   0.0–4.55   "Myth: Scorpios are | *scary.*"  The lights flicker on into a spooky purple lab: two pixel bats flap
//              across, a jack-o'-lantern grins on the bench, and the specimen jar is draped in a sheet… with eye holes.
//              THE STARS (shaking): "today's myth: scorpios are *scary.*"
//   4.6–10.0   "Test 1: | the *shadow.*"  (the drop) A lamp clunks on behind the jar: a HUGE spiky shadow looms on the
//              wall, two long spikes going click… click… click. Pisces ducks behind a flask; the SPOOK-O-METER maxes out.
//              THE STARS: "what is that… *clicking?*"
//   10.05–14.9 "Test 2: | the *reveal.*"  (breakdown: near silence) THE STARS yank the sheet: it's the ♏ Scorpio star,
//              knitting. It looks up. Slowly. SCORPIO: "oh. hi. I'm knitting you a *sweater.*"
//   14.95      card cut.
//   15.0–17.85 "Test 3: | the *stare.*"  Scorpio holds up the finished sweater (a heart on it) and stares.
//              Monitor: INTENSITY: MAX… TYPE: LOYAL. SCORPIO: "you said you get cold. *in june.*" Pisces sobs.
//   17.95–21.0 "Scorpios are | *scary?*"  (the lift) BUSTED. The lights come back on; the jar lifts off.
//              THE STARS: "intense? yes. scary? no. *loyal.*"
//   21.05–23.4 "Intense means | *loyal.*"  The sweater flies over and lands on THE STARS. Cosy. Blush.
//   23.45–25.45 "Scary *loyal.*"  Everything pops out by 25.45; the end card takes over at 25.6.
// One canvas (sky + lab + cast), DOM type + dialogue boxes + stamp + show bug above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, PINK, INK, MINT, CYAN, PHOS, MONO, rgba, pop01, outK, popOut, bump, keyed, r3,
  drawBits, starGeom, drawGoggles, drawWall, drawBench, drawShelf, drawFlask, drawJar, drawMonitor, phosText, drawClipboard,
  drawTears, buildBug, buildStamp, shakeAt, dust,
} from './lab.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const SCO = signStar('scorpio'), PIS = signStar('pisces')
const SCO_T = '#ff7a95', PUMP = '#ff9a3c'

// ── the timeline
export const T = {
  lights: 0.28, bats: [0.5, 3.2],
  h0: 0.15, h0Land: 0.8, h0Out: [4.38, 4.55],
  open1: 1.2, l1: 1.42,
  h1: 4.62, h1Land: 4.98, lamp: BEAT(8), grow: [5.05, 5.9], l2: 6.6, duck: 5.35, flick: 8.7,
  h1Out: [9.85, 10.0],
  h2: 10.05, h2Land: 10.38, yank: [10.62, 11.12], lookUp: 11.35, l3: 11.75,
  cut: 14.95,
  h3: 15.02, h3Land: 15.34, holdUp: [15.1, 15.5], intense: 15.45, l4: 15.7, loyal: 16.85, sob: 16.95,
  h3Out: [17.72, 17.88],
  h4: 17.95, h4Land: 18.18, stamp: BEAT(32), lights2: 18.45, lift: [18.62, 19.3], l5: 18.8,
  h4Out: [20.85, 21.0],
  h5: 21.05, h5Land: 21.4, toss: [21.35, 21.85], cosy: 21.9, smile: 22.45, h5Out: [23.25, 23.4],
  h6: 23.45, h6Land: 23.8, wink: 24.4, out: [25.05, 25.45], h6Out: [25.18, 25.45],
}

const SS = 'THE STARS', SC = `${SCO.glyph}︎ SCORPIO`
const CPS = 28
const LINES1 = [
  { t: T.l1, speaker: SS, text: 'today’s myth: scorpios are *scary.*' },
  { t: T.l2, speaker: SS, text: 'what is that… *clicking?*' },
  { t: T.l3, speaker: SC, color: SCO_T, text: 'oh. hi. I’m knitting you a *sweater.*' },
]
const LINES2 = [
  { t: T.l4, speaker: SC, color: SCO_T, text: 'you said you get cold. *in june.*' },
  { t: T.l5, speaker: SS, text: 'intense? yes. scary? no. *loyal.*' },
]
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
T.close1 = r3(LT1[2].done + 1.5)
T.close2 = r3(LT2[1].done + 1.55)
T.h2Out = [r3(T.close1 - 0.05), r3(Math.min(T.cut - 0.04, T.close1 + 0.1))]

const HOPS = {
  stars: [...talkHops(LINES1, SS, { cps: CPS }), ...talkHops(LINES2, SS, { cps: CPS }), T.yank[0] - 0.1, T.stamp + 0.3, T.cosy, T.wink],
  sco: [...talkHops(LINES1, SC, { cps: CPS }), ...talkHops(LINES2, SC, { cps: CPS }), T.smile, T.h6Land],
  pis: [T.lamp + 0.05, T.sob, T.stamp + 0.1, T.h6 + 0.3],
}

const JAR = { cx: 540, base: 1336, w: 384, h: 440 }
const SCO_P = { x: 540, y: 1160, size: 270 }
const HOST = { x: 872, y: 1046, size: 210 }
const PIS_P = { x: 940, y: 694, size: 112 }
const SHELF = { cx: 935, y: 756, w: 300 }
const MON = { cx: 192, cy: 878, w: 300, h: 230 }
const SEED = { sco: 6, stars: 9, pis: 23 }

const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const SCO_K = [
  [0, S_('squint', [0, 1])], [T.lookUp, S_('squint', [0, 0], { blink: false })], [T.l3, S_('neutral', [0, 0], { blink: 0.35 })], [LT1[2].done - 0.4, S_('happy')], [LT1[2].done + 0.5, S_('neutral', [0, 1], { blink: 0.3 })],
  [T.h3, S_('squint', [0, 0], { blink: false })], [T.l4, S_('neutral', [0, 0], { blink: 0.3 })], [T.loyal, S_('sparkle', [0, 0])],
  [T.h4, S_('squint', [0, -1])], [T.stamp, S_('wide', [0, -1], { blink: false })], [T.stamp + 0.4, S_('neutral', [1, 0], { blink: 0.3 })],
  [T.toss[0], S_('neutral', [1, 0], { blink: 0.3 })], [T.smile, S_('happy')], [T.h6, S_('squint', [0, 0])], [T.wink, S_('wink')], [T.wink + 0.6, S_('happy')],
]
const STARS_K = [
  [0, S_('wide', [-1, 0], { blink: false })], [T.l1, S_('wide', [0, 0], { blink: false })], [LT1[0].done + 0.3, S_('wide', [-1, 0], { blink: false })],
  [T.lamp, S_('wide', [-1, -1], { blink: false, sq: -0.08 })], [T.l2, S_('wide', [-1, -1], { blink: false })], [T.flick, S_('wide', [-1, 0], { blink: false, sq: -0.06 })],
  [T.h2, S_('squint', [-1, 0])], [T.yank[0], S_('squint', [-1, -1])], [T.yank[1], S_('wide', [-1, 0], { blink: false })], [T.l3 + 0.6, S_('neutral', [-1, 0])], [LT1[2].done, S_('sparkle', [-1, 0])],
  [T.h3, S_('neutral', [-1, 0])], [T.loyal - 0.2, S_('sparkle', [-1, 0])],
  [T.h4, S_('squint', [-1, -1])], [T.stamp, S_('happy', [0, 0], { sq: 0.06 })], [T.l5, S_('happy')],
  [T.toss[0], S_('wide', [-1, 0], { blink: false })], [T.cosy, S_('sparkle', [0, 0], { blush: 1 })], [T.h6, S_('happy', [0, 0], { blush: 1 })], [T.wink, S_('wink', [0, 0], { blush: 1 })], [T.wink + 0.5, S_('happy', [0, 0], { blush: 1 })],
]
const PIS_K = [
  [0, S_('wide', [-1, 1], { blink: false })], [T.lamp, S_('wide', [-1, 1], { blink: false, sq: -0.08 })], [T.yank[1], S_('neutral', [-1, 1])],
  [T.l3 + 1, S_('sparkle', [-1, 1])], [T.sob, S_('sparkle', [-1, 1])], [T.stamp, S_('wide', [-1, 1], { blink: false })], [T.stamp + 0.4, S_('sparkle', [-1, 1])],
]
const TEARS = [[0, 0.6], [T.lamp, 1.0], [T.yank[1], 0], [T.l3 + 1, 0.8], [T.sob, 1.8], [T.h4, 1.0], [T.cosy, 1.6], [T.h6, 1.8]]
// spooky tint: on from the lights until BUSTED switches the lab lights back on
const spookK = t => clamp((t - T.lights) * 5) * (1 - prog(t, T.lights2, T.lights2 + 0.15))

// ── bitmaps
const SWEATER = ['.RR.......RR.', 'RRRRR...RRRRR', 'RRRRRRRRRRRRR', 'RRRRRRRRRRRRR', 'RR.RRHRHRR.RR', 'RR.RHHHHHR.RR', 'RR.RRHHHRR.RR', 'RR.RRRHRRR.RR', 'SS.RRRRRRR.SS', '...SSSSSSS...']
const SWEATER_C = { R: '#d9364f', H: '#ffd1de', S: '#8e1f3a' }
const PUMPKIN = ['....GG.....', '..OOGOOOO..', '.OOOOOOOOO.', 'OOYOOOOOYOO', 'OYYYOOOYYYO', 'OOOOOYOOOOO', 'OYOYOYOYOYO', '.OYYYYYYYO.', '..OOOOOOO..']
const BAT = [['B.......B', 'BB.BBB.BB', '.BBRBRBB.', '...B.B...'], ['...BBB...', '.BBRBRBB.', 'BB.B.B.BB', 'B.......B']]

const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
// the needles click on this grid while the shadow looms, and again while she knits
const CLICKS = [...Array.from({ length: 14 }, (_, i) => r3(T.grow[0] + 0.1 + i * 0.3)), ...Array.from({ length: 5 }, (_, i) => r3(T.yank[1] + 0.05 + i * 0.25))]
const clickPh = t => { let h = -1e9; for (const c of CLICKS) if (c <= t && c > h) h = c; return t - h < 0.12 ? 1 - (t - h) / 0.12 : 0 }
const knitting = t => (t >= T.grow[0] && t < T.lookUp) || (t >= T.yank[1] && t < T.lookUp + 0.1)

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 140px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H = [
    [popText(root, 'Myth: Scorpios | are *scary.*', { top: 196, size: 112, accentSize: 170, at: T.h0, gap: 0.1, accentColor: SCO_T, wobble: true, late: 1, lateAt: T.h0Land }), T.h0Out],
    [popText(root, 'Test 1: | the *shadow.*', { top: 196, size: 104, accentSize: 140, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Test 2: | the *reveal.*', { top: 196, size: 104, accentSize: 140, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'Test 3: | the *stare.*', { top: 196, size: 104, accentSize: 140, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: CYAN }), T.h3Out],
    [popText(root, 'Scorpios are | *scary?*', { top: 196, size: 112, accentSize: 170, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: SCO_T }), T.h4Out],
    [popText(root, 'Intense means | *loyal.*', { top: 196, size: 108, accentSize: 170, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: GOLD }), T.h5Out],
    [popText(root, 'Scary | *loyal.*', { top: 300, size: 130, accentSize: 200, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: SCO_T }), T.h6Out],
  ]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1430, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1430, width: 960, height: 290, open: T.l4 - 0.22, close: T.close2, cps: CPS })
  const stamp = buildStamp(root, { at: T.stamp, out: T.h4Out, cx: 540, cy: 330, w: 720, h: 230, rot: -10 })
  const bug = buildBug(root, { at: 0.35, out: [STORY_END - 0.35, STORY_END - 0.05] })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none' }, root)

  function screen(x, sx, sy, sw, sh, t) {
    if (t < T.h1) {
      phosText(x, 'SUBJECT:', sx + 16, sy + 34, 24); phosText(x, '??????', sx + 16, sy + 70, 32)
      phosText(x, 'DO NOT TAP GLASS', sx + 16, sy + sh - 30, 18, { alpha: 0.75 })
      return
    }
    if (t < T.h3) {
      const alarm = t >= T.grow[1] && t < T.yank[1]
      if (alarm && Math.floor((t - T.grow[1]) * 5) % 2 === 0) { x.fillStyle = 'rgba(255,40,70,0.45)'; x.fillRect(sx, sy, sw, sh) }
      phosText(x, 'SPOOK-O-METER', sx + 16, sy + 30, 21, { color: alarm ? '#ffd0d6' : PHOS })
      const lvl = t < T.yank[1] ? ease.outCubic(prog(t, T.lamp, T.grow[1] + 0.4)) : 1 - ease.inOutCubic(prog(t, T.yank[1], T.yank[1] + 0.6))
      for (let i = 0; i < 10; i++) {
        const on = lvl * 10 > i + 0.2
        x.fillStyle = on ? (i > 6 ? '#ff5a6e' : i > 3 ? GOLD : PHOS) : 'rgba(109,255,180,0.12)'
        x.fillRect(sx + 16 + i * ((sw - 32) / 10), sy + 62, (sw - 32) / 10 - 6, 36)
      }
      if (alarm) phosText(x, 'MAX!!', sx + sw / 2, sy + 132, 30, { align: 'center', color: '#ffffff' })
      if (t >= T.yank[1] + 0.6) phosText(x, 'IT’S KNITTING.', sx + sw / 2, sy + 132, 22, { align: 'center', alpha: clamp((t - T.yank[1] - 0.6) * 3) })
      return
    }
    phosText(x, 'STARE ANALYSIS', sx + 16, sy + 30, 21)
    if (t >= T.intense) phosText(x, 'INTENSITY: MAX', sx + 16, sy + 76, 22, { alpha: clamp((t - T.intense) * 4), color: '#ffb3bd' })
    if (t >= T.loyal) {
      const a = pop01(t, T.loyal, 0.3, 2.6)
      x.save(); x.translate(sx + 16, sy + 124); x.scale(a, a); phosText(x, 'TYPE: LOYAL ♥', 0, 0, 24, { color: MINT }); x.restore()
    }
  }

  /** the huge shadow on the wall (lamp behind the jar): a dark star with two long needles, clicking */
  function drawShadow(t) {
    const on = t >= T.lamp && t < T.yank[0] + 0.05
    if (!on) return
    const flick = t > T.flick && t < T.flick + 0.25 ? (Math.floor((t - T.flick) * 30) % 2 ? 0.25 : 1) : 1
    const g = ease.outCubic(prog(t, ...T.grow)), ck = clickPh(t)
    const cx = 540 + Math.sin(t * 1.3) * 10, cy = 760, R = lerp(150, 330, g)
    x.save(); x.globalAlpha = flick
    // the lit wall
    x.globalCompositeOperation = 'lighter'
    const lg = x.createRadialGradient(540, 840, 0, 540, 840, 480); lg.addColorStop(0, 'rgba(255,170,110,0.42)'); lg.addColorStop(0.7, 'rgba(160,80,140,0.16)'); lg.addColorStop(1, 'rgba(160,80,140,0)')
    x.fillStyle = lg; x.beginPath(); x.ellipse(540, 840, 500, 420, 0, 0, Math.PI * 2); x.fill()
    x.globalCompositeOperation = 'source-over'
    // the silhouette
    x.fillStyle = 'rgba(8,2,18,0.9)'
    x.beginPath()
    for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? R * 0.5 : R; k ? x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : x.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) }
    x.closePath(); x.fill()
    // two long spikes (the needles), clicking together
    x.lineWidth = R * 0.07; x.lineCap = 'round'; x.strokeStyle = 'rgba(8,2,18,0.9)'
    for (const s of [-1, 1]) {
      const a = -Math.PI / 2 + s * (0.55 - 0.18 * ck)
      const bx = cx + s * R * 0.25, by = cy + R * 0.25
      x.beginPath(); x.moveTo(bx, by); x.lineTo(bx + Math.cos(a) * R * 1.25, by + Math.sin(a) * R * 1.25); x.stroke()
    }
    // two glinting eyes
    if (g > 0.6) { x.fillStyle = '#ff3d6e'; const e = R * 0.08; x.fillRect(cx - R * 0.2 - e / 2, cy - e, e, e); x.fillRect(cx + R * 0.2 - e / 2, cy - e, e, e) }
    x.restore()
  }

  /** the sheet over the jar (it has eye holes — a ghost, obviously). yank 0…1 whips it up and away */
  function drawSheet(t) {
    const yk = prog(t, ...T.yank)
    if (yk >= 1) return
    const C = 8, w = JAR.w + 40, h = JAR.h + 30, n = Math.round(w / C), m = Math.round(h / C), dome = n / 2
    const up = ease.inCubic(yk), dy = -up * 1100, rot = up * 0.5, sway = Math.sin(t * 2.1) * 3 + (knitting(t) ? clickPh(t) * 3 : 0)
    const x0 = JAR.cx - n * C / 2, y0 = JAR.base - m * C + 8
    const half = (j, i) => j < dome ? Math.sqrt(Math.max(0, 1 - ((dome - j - 0.5) / dome) ** 2)) * n / 2 : n / 2 + (j > m - 6 ? 1 : 0)
    const hem = i => m - 1 - ((Math.floor(i / 4) % 2) ? 1 : 0)
    const inside = (i, j) => j >= 0 && j <= hem(i) && Math.abs(i + 0.5 - n / 2) <= half(j, i)
    x.save(); x.translate(JAR.cx, JAR.base + dy); x.rotate(rot); x.translate(-JAR.cx + sway, -JAR.base)
    for (let j = -1; j <= m; j++) for (let i = -1; i <= n; i++) {
      if (inside(i, j)) continue
      if (inside(i + 1, j) || inside(i - 1, j) || inside(i, j + 1) || inside(i, j - 1)) { x.fillStyle = INK; x.fillRect(x0 + i * C, y0 + j * C, C, C) }
    }
    for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) {
      if (!inside(i, j)) continue
      const fold = (i % 9 === 4 && j > dome * 0.8) ? 1 : 0
      x.fillStyle = i > n * 0.72 || fold ? '#b9b0d8' : i < n * 0.2 && j < dome ? '#ffffff' : '#e9e2f5'
      x.fillRect(x0 + i * C, y0 + j * C, C, C)
    }
    // eye holes
    x.fillStyle = INK
    for (const s of [-1, 1]) x.fillRect(JAR.cx + s * 48 - 14, y0 + dome * C + 10, 28, 40)
    x.restore()
  }

  function scene(t) {
    const sh = shakeAt(t, T.stamp, 12)
    drawSky(x, t, { ...SKY_H, dim: 0.42, dy: sh })
    x.save(); x.globalAlpha = 1 - ease.inOutQuad(prog(t, T.out[0], T.out[1]))
    x.save(); x.translate(0, sh)
    drawWall(x, t)
    drawShadow(t)
    drawShelf(x, SHELF.cx, SHELF.y, SHELF.w)
    drawFlask(x, 832, SHELF.y - 2, 7, PINK, t, { kind: 'cone', seed: 2 })
    drawFlask(x, 1040, SHELF.y - 2, 6, '#9a7be0', t, { kind: 'tube', seed: 5 })
    drawMonitor(x, MON.cx, MON.cy, MON.w, MON.h, t, (c, sx, sy, sw, sh2) => screen(c, sx, sy, sw, sh2, t), { on: clamp((t - T.lights - 0.2) * 4) })
    drawBench(x, t)
    drawFlask(x, 296, 1334, 8, MINT, t, { kind: 'cone', seed: 7 })
    drawFlask(x, 800, 1334, 6, GOLD, t, { kind: 'cone', seed: 13 })
    // the jack-o'-lantern (flickering face)
    const fl = 0.75 + 0.25 * Math.sin(t * 17) * Math.sin(t * 5.3)
    drawBits(x, PUMPKIN, { O: PUMP, G: '#5ee08a', Y: rgba('#fff0a0', fl) }, 1000, 1296, 8)
    x.save(); x.globalCompositeOperation = 'lighter'; const pg = x.createRadialGradient(1000, 1296, 0, 1000, 1296, 140); pg.addColorStop(0, `rgba(255,160,60,${0.25 * fl})`); pg.addColorStop(1, 'rgba(255,160,60,0)'); x.fillStyle = pg; x.fillRect(860, 1156, 280, 280); x.restore()
    x.restore()

    const lift = prog(t, ...T.lift)
    drawJar(x, JAR.cx, JAR.base + sh, JAR.w, JAR.h, t, { alpha: 1, part: 'back', label: `SUBJECT ${SCO.glyph}︎` })
    const ok = popOut(t, T.out)
    // Scorpio (inside the jar, under the sheet until the reveal)
    let rs = null, gs = null
    if (t >= T.yank[0] - 0.1 && ok > 0) {
      const st = keyed(t, SCO_K)
      const o = { color: SCO.color, glyph: SCO.glyph, ...st, hops: HOPS.sco, seed: SEED.sco, squash: st.sq || 0, pop: ok, glow: 1.0 }
      rs = drawStarChar(x, SCO_P.x + sh * 0.6, SCO_P.y, SCO_P.size, t, o); gs = starGeom(t, rs, SCO_P.size, o)
      drawKnitting(t, rs)
    }
    drawJar(x, JAR.cx, JAR.base + sh, JAR.w, JAR.h, t, { alpha: 1, lift, part: 'front' })
    drawSheet(t)
    drawCast(t)
    drawBats(t)
    // spooky purple tint over the whole lab (lifted when BUSTED turns the lights on)
    const sk = spookK(t)
    if (sk > 0) {
      x.save(); x.globalAlpha = 0.34 * sk; x.fillStyle = '#1a0630'; x.fillRect(0, 0, 1080, 1920)
      x.globalAlpha = 0.5 * sk; const vg = x.createRadialGradient(540, 1000, 300, 540, 1000, 1100); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(4,0,12,1)'); x.fillStyle = vg; x.fillRect(0, 0, 1080, 1920)
      x.restore()
    }
    if (t >= T.lights2 && t < T.lights2 + 0.3) { x.save(); x.globalAlpha = 0.25 * (1 - prog(t, T.lights2, T.lights2 + 0.3)); x.fillStyle = '#fff6e0'; x.fillRect(0, 0, 1080, 1920); x.restore() }
    dust(x, t, T.stamp, 540, 420, { n: 12, R: 420, col: '#ffb3bd' })
    if (rs && t >= T.cosy && t < T.cosy + 0.6) ring(t, HOST.x, HOST.y, T.cosy)
    void gs
    x.restore()
  }

  // needles + a growing knit swatch while knitting; the finished sweater held up in test 3; tossed to THE STARS
  function drawKnitting(t, r) {
    const ck = clickPh(t), knit = t < T.holdUp[0]
    const nx = r.x, ny = r.y + 46
    if (knit) {
      const rows = Math.min(SWEATER.length, 3 + Math.floor(Math.max(0, t - T.yank[1]) * 2.4))
      drawBits(x, SWEATER.slice(SWEATER.length - rows), SWEATER_C, nx, ny + 18 + rows * 4.5, 9)
      for (const s of [-1, 1]) {
        const a = -Math.PI / 2 + s * (1.1 - 0.25 * ck)
        x.save(); x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(nx - s * 46, ny + 44); x.lineTo(nx - s * 46 + Math.cos(a) * 110, ny + 44 + Math.sin(a) * 110); x.stroke()
        x.strokeStyle = '#e8c48a'; x.lineWidth = 6; x.stroke(); x.restore()
      }
      // the yarn ball + strand
      x.save(); x.strokeStyle = '#d9364f'; x.lineWidth = 4; x.beginPath(); x.moveTo(nx + 10, ny + 40); x.quadraticCurveTo(nx + 90, ny + 160, 668, 1300); x.stroke(); x.restore()
      drawBits(x, ['.RRR.', 'RrRRR', 'RRrRR', 'RRRrR', '.RRR.'], { R: '#d9364f', r: '#8e1f3a' }, 668, 1300, 8)
      return
    }
    // held up / tossed
    const up = ease.outCubic(prog(t, ...T.holdUp)), tp = prog(t, ...T.toss)
    if (tp >= 1) return
    const hx = lerp(nx, HOST.x, ease.inOutCubic(tp)), hy = lerp(lerp(ny + 110, ny + 76, up), HOST.y + 20, ease.inOutCubic(tp)) - Math.sin(Math.PI * tp) * 220
    drawBits(x, SWEATER, SWEATER_C, hx, hy, lerp(12, 11, tp), { rot: tp * Math.PI * 2 * 0.9 })
  }

  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const sh = shakeAt(t, T.stamp, 10)
    const ps = keyed(t, PIS_K)
    const duck = t >= T.duck && t < T.yank[1] + 0.3 ? 46 * ease.outCubic(prog(t, T.duck, T.duck + 0.25)) * (1 - prog(t, T.yank[1], T.yank[1] + 0.3)) : 0
    const shiver = spookK(t) > 0.5 && t < T.yank[1] ? 0.03 * Math.sin(t * 50) : 0
    const pisO = { color: PIS.color, ...ps, hops: HOPS.pis, seed: SEED.pis, squash: (ps.sq || 0) + shiver, pop: ok, glow: 0.8 }
    const rp = drawStarChar(x, PIS_P.x + sh * 0.5 + 30 * (duck / 46), PIS_P.y + duck, PIS_P.size, t, pisO)
    const gp = starGeom(t, rp, PIS_P.size, pisO)
    drawGoggles(x, gp, t, { alpha: ok })
    drawTears(x, gp, t, { rate: keyed(t, TEARS) || 0.01, alpha: keyed(t, TEARS) > 0 ? ok : 0, seed: 3 })
    if (duck > 0) drawFlask(x, 1040, SHELF.y - 2, 6, '#9a7be0', t, { kind: 'tube', seed: 5 })   // hiding behind it
    const hs = keyed(t, STARS_K)
    const shiverH = spookK(t) > 0.5 && t < T.yank[0] ? 0.035 * Math.sin(t * 46) : 0
    const hostO = { color: STAR.sky, ...hs, hops: HOPS.stars, seed: SEED.stars, squash: (hs.sq || 0) + shiverH, pop: ok, glow: 1.1 }
    // THE STARS lean in to yank the sheet
    const lean = bump(t, T.yank[0] - 0.15, 0.6)
    const rh = drawStarChar(x, HOST.x - 150 * lean + sh * 0.5, HOST.y - 40 * lean, HOST.size, t, hostO)
    const gh = starGeom(t, rh, HOST.size, hostO)
    drawGoggles(x, gh, t, { alpha: ok, down: t < T.yank[0] ? 0 : 0 })
    if (t >= T.toss[1]) {
      const p = gh.pt(18, 25.5), land = 1 + 0.12 * Math.exp(-(t - T.toss[1]) * 9) * Math.cos((t - T.toss[1]) * 30)
      drawBits(x, SWEATER, SWEATER_C, p.x, p.y, gh.cell * 1.85 * land, { sx: gh.sx, sy: gh.sy, alpha: ok })
    } else drawClipboard(x, rh.x + 96, rh.y + 74, 7 * ok, t, { rot: -0.14 + 0.04 * Math.sin(t * 2) })
  }

  function drawBats(t) {
    for (let k = 0; k < 2; k++) {
      const p = prog(t, T.bats[0] + k * 0.5, T.bats[1] + k * 0.4)
      if (p <= 0 || p >= 1) continue
      const bx = lerp(-80, 1160, p), by = 610 + k * 90 + Math.sin(p * 12 + k) * 40
      drawBits(x, BAT[Math.floor(t * 10 + k) % 2], { B: '#2a1a40', R: '#ff3d6e' }, bx, by, 8, { outline: '#9a7be0' })
    }
  }

  function ring(t, cx, cy, t0) {
    const tt = t - t0
    if (tt < 0 || tt > 0.6) return
    const p = ease.outCubic(tt / 0.6)
    x.save(); x.globalAlpha = 1 - p
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; drawPixelStar(x, cx + Math.cos(a) * (110 + 70 * p), cy + Math.sin(a) * (110 + 70 * p), 24, i % 2 ? 1 : 2, [GOLD, BONE, SCO_T][i % 3]) }
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
      black.style.opacity = String(t < L ? 1 : t < L + 0.06 ? 0.04 : t < L + 0.12 ? 0.6 : t < L + 0.2 ? 0.1 : t < L + 0.26 ? 0.5 : 0)
    },
  }
}

// one card cut kept (cardfx picks the middle of three): between the reveal and the stare
const CUTS = [4.56, T.cut, 17.92]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

const chipC = (t, f, len, o = {}) => ['chip', r3(t), f, len, { gain: 0.02, ...o }]
export const CUES = [
  ['boom', T.lights, 0.14], ['tick', T.lights, 0.06], ['tick', T.lights + 0.12, 0.04], ['tick', T.lights + 0.2, 0.04],
  ['whoosh', T.bats[0] + 0.3, 0.6, 0.025], ['whoosh', T.bats[0] + 1.2, 0.6, 0.02],
  ...wordPops(T.h0, 2, 0.1, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land, 783.99, 0.04, 0.8, 0],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0],
  // test 1: the shadow
  ...wordPops(T.h1, 2, 0.08, 2), ['pop', T.h1Land, 1174.66, 0.04, 0], ['pop', T.h1Land + 0.1, 1318.51, 0.035, 0],
  ['boom', T.lamp, 0.3], ['tick', T.lamp, 0.07], ['swell', T.lamp, T.grow[1] + 0.3, { gain: 0.03, f0: 200, f1: 1500 }],
  ...CLICKS.flatMap(c => [['tick', c, 0.06], ['pop', r3(c + 0.005), 2093, 0.012, 0]]),
  ['pop', T.duck, 392, 0.035, 0.4],
  chipC(T.grow[1], 1760, 0.12, { gain: 0.03 }), chipC(T.grow[1] + 0.15, 1318.51, 0.12, { gain: 0.03 }),
  ['tick', T.flick, 0.05], ['tick', T.flick + 0.1, 0.04],
  // test 2: the reveal
  ...wordPops(T.h2, 2, 0.08, 1), ['pop', T.h2Land, 1174.66, 0.04, 0], ['pop', T.h2Land + 0.1, 1318.51, 0.035, 0],
  ['whoosh', T.yank[0], 0.5, 0.06], ['pop', T.yank[1], 659.25, 0.04, 0], ['bell', T.yank[1] + 0.05, 1318.51, 0.025, 1.6, 0],
  ['tick', T.lookUp, 0.03], ['tick', T.lookUp + 0.25, 0.03],
  ['pluck', LT1[2].done + 0.05, 1174.66, 0.035, 0.5, 0],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  // test 3: the stare
  ...wordPops(T.h3, 2, 0.08, 3), ['pop', T.h3Land, 1174.66, 0.04, 0], ['pop', T.h3Land + 0.1, 1318.51, 0.035, 0],
  ['whoosh', T.holdUp[0], 0.35, 0.03], ['glitter', T.holdUp[1], T.holdUp[1] + 0.4],
  chipC(T.intense, 880, 0.1, { gain: 0.03 }), chipC(T.loyal, 1318.51, 0.1, { gain: 0.03 }), chipC(T.loyal + 0.1, 1760, 0.2, { gain: 0.03 }),
  ['pop', T.sob, 392, 0.03, 0.4],
  ['pop', T.l4 - 0.22, 739.99, 0.04, 0],
  // busted
  ...wordPops(T.h4, 2, 0.09, 0), ['pop', T.h4Land, 1174.66, 0.045, 0],
  ['whoosh', T.stamp - 0.18, 0.2, 0.05], ['boom', T.stamp, 0.5], ['crash', T.stamp, { gain: 0.07 }], ['tick', T.stamp, 0.08],
  ['tick', T.lights2, 0.06], ['bell', T.lights2, 1760, 0.025, 1.2, 0], ['whoosh', T.lift[0], 0.6, 0.04],
  // payoff: the sweater
  ...wordPops(T.h5, 2, 0.08, 2), ['pop', T.h5Land, 1174.66, 0.045, 0], ['pluck', T.h5Land, 1318.51, 0.04, 0.6, 0],
  ['whoosh', T.toss[0], 0.45, 0.04], ['pop', T.toss[1], 523.25, 0.045, 0.3], ['glitter', T.cosy, T.cosy + 0.5], ['pluck', T.cosy, 1567.98, 0.04, 0.6, 0.3],
  ['pop', T.smile, 1174.66, 0.03, 0],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 587.33, 0.03, 0],
  // the last line
  ['pop', T.h6, 880, 0.03, 0], ['pop', T.h6Land, 1174.66, 0.05, 0], ['pluck', T.h6Land, 1318.51, 0.045, 0.6, 0],
  ['pluck', T.wink, 1318.51, 0.035, 0.5, 0.2], ['pop', T.h6 + 0.3, 392, 0.025, 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [SS]: 880, [SC]: 659.25 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [SS]: 880, [SC]: 659.25 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void drawShelf; void PHOS; void MONO
