// hxnowalk — STAR MYTH-BUSTERS, Houston: "Nobody *walks* in Houston." (30 s vertical, funk · E). Story 0–25.6, then the
// shared end card. Template: sxmythsun (the lab set, the stamp, the bug), plus a field kit (props.js).
//   0.0–4.55   frame 0: the lab. "Myth: Nobody | *walks* in Houston."  A lone sneaker sits in the bell jar (SUBJECT:
//              WALKING), THE STARS in goggles with the clipboard, Pisces on the shelf already crying.
//   4.6–10.0   "Test 1: | the *bayou trail.*"  (the drop) Sunset on a bayou trail: the stars walk; walkers keep
//              passing the other way (a jogger, a dog walking its person, a couple, a stroller, a running club) and
//              the tally fills up.
//   10.05–14.3 "Test 2: | the *trailhead.*"  Aries pops up in the parking lot: "wait. you all *drove* here!" The stars
//              look at the car keys. Sheepish.
//   14.38      the one card cut.
//   14.44–17.9 "Nobody | *walks?*"  BUSTED slams… then a small PARTLY stamp slams on top of it.
//   17.95–23.4 "A walk is | a *date.*"  Dusk on the trail: two stars walk side by side with a talk card.
//   23.5–25.45 "Walk and *talk*."  The lab again: the jar now holds two sneakers, walking in step (frame 0, changed).
// Rewatch bait: the heron in the bayou walks the whole trail with them, step for step, and gets a tally mark too.
// One canvas, DOM type + dialogue boxes + stamps + show bug above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, PINK, INK, MINT, CYAN, MONO, pop01, outK, popOut, keyed, r3,
  starGeom, drawGoggles, drawWall, drawBench, drawShelf, drawFlask, drawJar, drawMonitor, phosText, drawClipboard,
  drawTears, buildBug, buildStamp, shakeAt, dust,
} from './lab.js'
import { drawSunsetSky, drawBayou, drawLot, drawSneaker, drawDog, drawHeron, drawStroller, walker, drawTalkCard, drawTally, WATER } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const PIS = signStar('pisces'), ARI = signStar('aries')
const SUNC = '#ffb14a'

// ── the timeline
export const T = {
  lights: 0.3,
  h0Out: [4.38, 4.55], l1: 1.1,
  trail: 4.6, h1: 4.62, h1Land: 4.98, l2: 6.9, h1Out: [9.85, 10.0],
  pass: [5.2, 6.0, 6.9, 7.8, 8.5],
  lot: 10.05, h2: 10.05, h2Land: 10.38, ari: 10.4, l3: 10.75, keys: 12.4,
  cut: 14.38,
  busted: 14.38, h3: 14.44, h3Land: 14.74, stamp: BEAT(26), partly: 16.05, l4: 15.4, h3Out: [17.72, 17.88],
  dusk: 17.95, h4: 17.95, h4Land: 18.35, card: 18.6, l5: 18.85, h4Out: [23.28, 23.42],
  end: 23.45, h5: 23.5, h5Land: 23.85, wink: 24.35, out: [25.05, 25.45], h5Out: [25.18, 25.45],
}
const SEG = [[0, 'lab'], [T.trail, 'trail'], [T.lot, 'lot'], [T.busted, 'stop'], [T.dusk, 'dusk'], [T.end, 'lab']]
const segAt = t => { let s = SEG[0]; for (const q of SEG) if (t >= q[0]) s = q; return s }
const FLASHES = [T.trail, T.lot, T.dusk, T.end]

// ── the lines
const SS = 'THE STARS', AR = '♈ ARIES'
const CPS = 28
const LINES1 = [
  { t: T.l1, speaker: SS, text: 'today’s myth: in houston, nobody *walks.*' },
  { t: T.l2, speaker: SS, text: 'a jogger. a dog walking its *person.*' },
  { t: T.l3, speaker: AR, text: 'hold on. you all *drove* here!', color: ARI.color },
]
const LINES2 = [
  { t: T.l4, speaker: SS, text: 'fine. we drive to the walk. *then* we walk.' },
  { t: T.l5, speaker: SS, text: 'pull a talk card. walk till it’s *answered.*' },
]
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
T.close1 = r3(Math.min(T.cut - 0.4, LT1[2].done + 1.55))
T.close2 = r3(LT2[1].done + 1.6)
T.h2Out = [r3(T.cut - 0.25), r3(T.cut - 0.05)]

const HOPS = {
  stars: [...talkHops(LINES1, SS, { cps: CPS }), ...talkHops(LINES2, SS, { cps: CPS }), T.stamp + 0.3, T.wink],
  ari: [T.ari + 0.1, ...talkHops(LINES1, AR, { cps: CPS }), T.partly + 0.1],
  pis: [T.stamp + 0.1, T.h5 + 0.3],
}

// ── where things are
const JAR = { cx: 540, base: 1336, w: 384, h: 440 }
const HOST = { x: 872, y: 1046, size: 210 }
const PIS_P = { x: 940, y: 694, size: 112 }
const SHELF = { cx: 935, y: 756, w: 300 }
const MON = { cx: 192, cy: 878, w: 300, h: 230 }
const SEED = { stars: 9, pis: 23, ari: 5 }
const BASE = 1322, BACK = 1290            // trail feet: near lane, far lane
const SPEED = 260                         // the trail scroll (px/s) while the stars walk
const PASS_V = 330                        // walkers coming the other way (px/s on screen)

const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const STARS_K = [
  [0, S_('squint', [-1, 0])], [T.l1, S_('squint', [-1, 0])], [LT1[0].done + 0.3, S_('neutral', [-1, 0])],
  [T.trail, S_('happy', [1, 0])], [T.pass[0] + 1.0, S_('wide', [1, 0], { blink: false })], [T.pass[1] + 1.2, S_('sparkle', [1, 0])],
  [T.pass[3] + 1.0, S_('wide', [1, -1], { blink: false })],
  [T.lot, S_('happy', [0, 0])], [T.ari + 0.2, S_('wide', [-1, 0], { blink: false })], [LT1[2].done + 0.1, S_('squint', [0, 1], { blush: 1 })],
  [T.h3, S_('squint', [-1, -1], { blush: 1 })], [T.stamp, S_('wide', [0, -1], { blink: false })], [T.partly, S_('happy', [0, 0], { blush: 1 })],
  [T.end, S_('happy')], [T.wink, S_('wink')], [T.wink + 0.5, S_('happy')],
]
const ARI_K = [[0, S_('wide', [1, 0], { blink: false })], [LT1[2].done, S_('squint', [1, 0])], [T.h3, S_('happy', [1, 0])], [T.partly, S_('wink', [1, 0])]]
const TEARS = [[0, 0.7], [T.trail, 1.0], [T.pass[2] + 0.6, 1.6], [T.lot, 0.6], [T.busted, 1.0], [T.dusk, 1.6], [T.end, 1.8]]

// ── sound helpers
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51, 1479.98]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

// the passers: [kind, t0, tally marks]
const PASSERS = [
  { kind: 'jog', at: T.pass[0], marks: 1 },
  { kind: 'dog', at: T.pass[1], marks: 2 },
  { kind: 'couple', at: T.pass[2], marks: 2 },
  { kind: 'stroller', at: T.pass[3], marks: 2 },
  { kind: 'club', at: T.pass[4], marks: 3 },
]
const passX = (p, t) => 1200 - (t - p.at) * PASS_V
const TALLY_X = 560            // a walker gets its mark when it passes this x
const tallyAt = t => {
  let n = 0
  for (const p of PASSERS) { const tt = p.at + (1200 - TALLY_X) / PASS_V; if (t >= tt) n += Math.min(p.marks, (t - tt) * 8) }
  if (t >= T.heronMark) n += clamp((t - T.heronMark) * 8)
  return n
}
T.heronMark = 9.35
const markTimes = PASSERS.flatMap(p => Array.from({ length: p.marks }, (_, i) => r3(p.at + (1200 - TALLY_X) / PASS_V + i * 0.125)))

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 140px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H = [
    [popText(root, 'Myth: Nobody | *walks* in Houston.', { top: 196, size: 100, accentSize: 150, at: -1.2, gap: 0.09, accentColor: SUNC, wobble: true, fit: true }), T.h0Out],
    [popText(root, 'Test 1: | the *bayou trail.*', { top: 196, size: 104, accentSize: 140, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: CYAN, fit: true }), T.h1Out],
    [popText(root, 'Test 2: | the *trailhead.*', { top: 196, size: 104, accentSize: 140, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'Nobody | *walks?*', { top: 196, size: 110, accentSize: 160, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: SUNC }), T.h3Out],
    [popText(root, 'A walk is | a *date.*', { top: 196, size: 104, accentSize: 160, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: GOLD }), T.h4Out],
    [popText(root, 'Walk and | *talk.*', { top: 300, size: 120, accentSize: 190, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: GOLD }), T.h5Out],
  ]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1430, width: 960, height: 290, open: T.l1 - 0.22, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1430, width: 960, height: 290, open: T.l4 - 0.22, close: T.close2, cps: CPS })
  const stamp = buildStamp(root, { at: T.stamp, out: T.h3Out, cx: 540, cy: 720, w: 700, h: 220, rot: -9 })
  const stamp2 = buildStamp(root, { at: T.partly, out: T.h3Out, cx: 760, cy: 570, w: 440, h: 130, rot: 7, text: 'PARTLY', color: '#ff8a3a' })
  const bug = buildBug(root, { at: -1, out: [STORY_END - 0.35, STORY_END - 0.05] })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const flash = el('div', { position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none' }, root)

  function screen(x, sx, sy, sw, sh, t) {
    if (t < T.trail) {
      phosText(x, 'SUBJECT:', sx + 16, sy + 34, 24); phosText(x, 'WALKING', sx + 16, sy + 70, 30)
      phosText(x, 'IN HOUSTON?', sx + 16, sy + 106, 24, { alpha: 0.85 })
      phosText(x, 'STANDBY' + (Math.floor(t * 2.5) % 2 ? '_' : ''), sx + 16, sy + sh - 30, 22, { alpha: 0.75 })
      return
    }
    phosText(x, 'RESULT:', sx + 16, sy + 34, 24)
    phosText(x, 'WALK ✓', sx + 16, sy + 76, 30, { alpha: clamp((t - T.h5Land) * 4) })
    phosText(x, 'TALK ✓', sx + 16, sy + 116, 30, { alpha: clamp((t - T.h5Land - 0.3) * 4), color: GOLD })
  }

  // ── the lab (frame 0, and the rhyme at the end)
  function lab(t) {
    const sh = 0
    drawSky(x, t, { ...SKY_H, dim: 0.42 })
    const ending = t >= T.end
    x.save(); x.globalAlpha = 1 - ease.inOutQuad(prog(t, T.out[0], T.out[1]))
    drawWall(x, t)
    drawShelf(x, SHELF.cx, SHELF.y, SHELF.w)
    drawFlask(x, 832, SHELF.y - 2, 7, PINK, t, { kind: 'cone', seed: 2 })
    drawFlask(x, 1040, SHELF.y - 2, 6, '#9a7be0', t, { kind: 'tube', seed: 5 })
    drawMonitor(x, MON.cx, MON.cy, MON.w, MON.h, t, (c, sx, sy, sw, sh2) => screen(c, sx, sy, sw, sh2, t), { on: clamp((t - T.lights) * 4 + 0.6) })
    drawBench(x, t)
    drawFlask(x, 296, 1334, 8, MINT, t, { kind: 'cone', seed: 7 })
    drawFlask(x, 1012, 1334, 7, CYAN, t, { kind: 'tube', seed: 11 })
    drawJar(x, JAR.cx, JAR.base + sh, JAR.w, JAR.h, t, { part: 'back', label: ending ? 'SUBJECT: WALK + TALK' : 'SUBJECT: WALKING' })
    // the specimen: one lone sneaker that hops (start); two sneakers walking in step (end)
    if (!ending) {
      const hop = Math.abs(Math.sin(t * 3.2)) * 26
      drawSneaker(x, JAR.cx, JAR.base - 40 - hop, 12, { rot: Math.sin(t * 3.2) * 0.08 })
    } else {
      for (const [dx, ph] of [[-70, 0], [70, Math.PI / 2]]) {
        const s = Math.sin(t * 7 + ph), lift = Math.max(0, s) * 30
        drawSneaker(x, JAR.cx + dx + Math.cos(t * 7 + ph) * 10, JAR.base - 40 - lift, 11, { rot: -0.1 * Math.max(0, s), lace: dx < 0 ? '#ff8fb1' : GOLD })
      }
      // a heart pops between them
      const hk = pop01(t, T.h5Land + 0.1, 0.35, 2.5)
      if (hk > 0.01) { x.save(); x.font = `800 ${Math.round(70 * hk)}px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ff4f86'; x.fillText('♥', JAR.cx, JAR.base - 180 - 10 * Math.sin(t * 4)); x.restore() }
    }
    drawJar(x, JAR.cx, JAR.base + sh, JAR.w, JAR.h, t, { part: 'front' })
    labCast(t)
    x.restore()
  }
  function labCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const ps = { mood: t < T.end ? 'sparkle' : 'heart', look: [-1, 1] }
    const pisO = { color: PIS.color, ...ps, hops: HOPS.pis, seed: SEED.pis, pop: ok, glow: 0.8 }
    const rp = drawStarChar(x, PIS_P.x, PIS_P.y, PIS_P.size, t, pisO)
    const gp = starGeom(t, rp, PIS_P.size, pisO)
    drawGoggles(x, gp, t, { alpha: ok })
    drawTears(x, gp, t, { rate: keyed(t, TEARS), alpha: ok, seed: 3 })
    const hs = keyed(t, STARS_K)
    const hostO = { color: STAR.sky, ...hs, hops: HOPS.stars, seed: SEED.stars, squash: hs.sq || 0, pop: ok, glow: 1.1 }
    const rh = drawStarChar(x, HOST.x, HOST.y, HOST.size, t, hostO)
    drawGoggles(x, starGeom(t, rh, HOST.size, hostO), t, { alpha: ok })
    drawClipboard(x, rh.x + 96, rh.y + 74, 7 * ok, t, { scribble: t > T.l1 && t < LT1[0].done ? 1 : 0, rot: -0.14 + 0.04 * Math.sin(t * 2) })
  }

  // ── the trail at sunset: the stars walk, walkers pass the other way, the tally fills
  function passer(p, t) {
    const px = passX(p, t)
    if (px < -260 || px > 1300) return
    const w = (sz, o, extra) => walker(x, px, BACK, sz, t, { look: [-1, 0], glow: 0.7, ...o }, extra)
    if (p.kind === 'jog') w(120, { color: signStar('gemini').color, mood: 'happy', seed: 41 }, { pace: 4.2, band: '#ff4f86' })
    if (p.kind === 'dog') {
      // the dog is in front, the person is being walked (leash taut, little feet scrambling)
      drawDog(x, px - 110, BACK - 34, 7, t * 1.6, { color: '#c98a4a' })
      x.save(); x.strokeStyle = '#ff4f86'; x.lineWidth = 4; x.beginPath(); x.moveTo(px - 66, BACK - 52); x.lineTo(px - 20, BACK - 74); x.stroke(); x.restore()
      w(116, { color: signStar('taurus').color, mood: 'wide', blink: false, seed: 42, squash: -0.06 }, { pace: 5 })
    }
    if (p.kind === 'couple') {
      w(104, { color: signStar('libra').color, mood: 'heart', seed: 43 }, { pace: 2.2 })
      x.save(); x.translate(84, 0)
      walker(x, px, BACK, 104, t, { color: signStar('cancer').color, mood: 'sparkle', look: [-1, 0], glow: 0.7, seed: 44 }, { pace: 2.2 })
      x.restore()
      x.fillStyle = GOLD; x.fillRect(Math.round(px + 26), BACK - 56, 32, 6)
    }
    if (p.kind === 'stroller') {
      drawStroller(x, px - 70, BACK - 30, 8)
      w(118, { color: signStar('virgo').color, mood: 'happy', seed: 45 }, { pace: 2.4 })
    }
    if (p.kind === 'club') {
      for (let i = 0; i < 3; i++) {
        x.save(); x.translate(i * 92, (i % 2) * 6)
        walker(x, px, BACK, 96, t, { color: [signStar('capricorn').color, signStar('leo').color, signStar('aquarius').color][i], mood: 'happy', look: [-1, 0], glow: 0.6, seed: 46 + i }, { pace: 4.4 + i * 0.2, band: ['#7dffb0', '#ff4f86', GOLD][i] })
        x.restore()
      }
    }
  }
  function trail(t, { walking = true, k = 1 } = {}) {
    const s0 = walking ? (t - T.trail) * SPEED : 1500
    drawSunsetSky(x, t, { k })
    drawBayou(x, t, { scroll: s0, k })
    // the heron: walks the bayou edge at exactly their pace (stays put on screen while the world scrolls)
    drawHeron(x, 150, WATER[1] - 52, 7, t, { walk: walking ? 1 : 0 })
    if (t >= T.heronMark - 0.2 && t < T.lot) { x.save(); x.globalAlpha = 1 - prog(t, T.heronMark + 0.4, T.heronMark + 0.6); x.font = `700 26px ${MONO}`; x.fillStyle = MINT; x.textAlign = 'center'; x.fillText('+ heron', 150, WATER[1] - 140 - 30 * prog(t, T.heronMark - 0.2, T.heronMark + 0.6)); x.restore() }
    if (walking && t < T.lot) for (const p of PASSERS) passer(p, t)
  }
  function trailCast(t, { walking = true, stop = false } = {}) {
    const hs = keyed(t, STARS_K)
    const pace = walking ? 2.6 : 0
    // Pisces walking behind, crying at how pretty it all is
    const pisO = { color: PIS.color, mood: 'sparkle', look: [1, 0], seed: SEED.pis, glow: 0.8 }
    const rp = walker(x, stop ? 210 : 230, BASE - 8, 128, t, pisO, { pace })
    drawTears(x, starGeom(t, rp, 128, pisO), t, { rate: keyed(t, TEARS), seed: 3 })
    if (stop) {
      const ak = keyed(t, ARI_K)
      drawStarChar(x, 830, BASE - 95, 180, t, { color: ARI.color, glyph: ARI.glyph, ...ak, hops: HOPS.ari, seed: SEED.ari, glow: 1 })
    }
    const hostO = { color: STAR.sky, ...hs, seed: SEED.stars, glow: 1.1 }
    const rh = walking ? walker(x, 470, BASE, 200, t, hostO, { pace }) : drawStarChar(x, 480, BASE - 100, 200, t, { ...hostO, hops: HOPS.stars, squash: hs.sq || 0 })
    drawGoggles(x, starGeom(t, rh, 200, { ...hostO, hops: walking ? null : HOPS.stars }), t)
    drawClipboard(x, rh.x + 92, rh.y + 70, 7, t, { scribble: walking && t > T.pass[0] + 1.6 ? 1 : 0, rot: -0.14 + 0.05 * Math.sin(t * 5) })
  }

  // ── the trailhead lot: Aries pops up; the stars hold the car keys
  function lot(t) {
    drawSunsetSky(x, t, { k: 0.95 })
    drawLot(x, t)
    // the empty stall's car door open, the stars beside it
    const hs = keyed(t, STARS_K)
    const pisO = { color: PIS.color, mood: t < T.ari + 0.2 ? 'sparkle' : 'wide', look: [-1, 0], seed: SEED.pis, glow: 0.8, blink: t < T.ari + 0.2 ? undefined : false }
    const rp = drawStarChar(x, 760, 1300, 128, t, pisO)
    drawTears(x, starGeom(t, rp, 128, pisO), t, { rate: keyed(t, TEARS), seed: 3 })
    const hostO = { color: STAR.sky, ...hs, hops: HOPS.stars, seed: SEED.stars, squash: hs.sq || 0, glow: 1.1 }
    const rh = drawStarChar(x, 560, 1240, 200, t, hostO)
    drawGoggles(x, starGeom(t, rh, 200, hostO), t)
    // the keys: held up, jingling (guilty)
    const kk = pop01(t, T.keys, 0.3, 2.5)
    if (kk > 0.01) {
      const kx = rh.x - 120, ky = rh.y + 10 + Math.sin(t * 14) * 6
      x.save(); x.translate(kx, ky); x.scale(kk, kk); x.rotate(Math.sin(t * 12) * 0.25)
      x.fillStyle = INK; x.fillRect(-16, -40, 32, 32); x.fillStyle = '#c9cde8'; x.fillRect(-10, -34, 20, 20); x.fillStyle = INK; x.fillRect(-4, -28, 8, 8)
      x.fillStyle = '#c9cde8'; x.fillRect(-4, -8, 8, 46); x.fillRect(4, 22, 10, 6); x.fillRect(4, 32, 8, 6)
      x.fillStyle = GOLD; x.fillRect(10, -30, 22, 22)
      x.restore()
    }
    // Aries pops up from behind a car, pointing
    const ak = keyed(t, ARI_K), ap = pop01(t, T.ari, 0.35, 2.4)
    const ar = drawStarChar(x, 230, 1080 - 60 * ap, 200, t, { color: ARI.color, glyph: ARI.glyph, ...ak, hops: HOPS.ari, seed: SEED.ari, pop: ap, glow: 1.1 })
    if (ap > 0.5) { x.save(); x.globalAlpha = clamp((ap - 0.5) * 2); x.font = `800 80px Inter`; x.fillStyle = '#ff5a6e'; x.textAlign = 'center'; x.fillText('!', ar.x + 4, ar.top - 30 - 10 * Math.abs(Math.sin(t * 6))); x.restore() }
  }

  // ── dusk: two stars walk side by side, a talk card between them
  function dusk(t) {
    const s0 = (t - T.trail) * SPEED
    drawSunsetSky(x, t, { k: 0.15 })
    drawBayou(x, t, { scroll: s0, k: 0.2 })
    drawHeron(x, 150, WATER[1] - 52, 7, t, { walk: 1 })
    const pace = 2.0
    const pisO = { color: PIS.color, mood: 'sparkle', look: [1, 0], seed: SEED.pis, glow: 0.8 }
    const rp = walker(x, 150, BASE - 10, 110, t, pisO, { pace })
    drawTears(x, starGeom(t, rp, 110, pisO), t, { rate: 1.7, seed: 3 })
    const A = signStar('scorpio'), B = signStar('sagittarius')
    const ra = walker(x, 420, BASE, 190, t, { color: A.color, glyph: A.glyph, mood: t < T.card + 1.4 ? 'happy' : 'sparkle', look: [1, 0], seed: 61 }, { pace })
    const rb = walker(x, 690, BASE, 190, t, { color: B.color, glyph: B.glyph, mood: t < T.card + 2.4 ? 'squint' : 'happy', look: [-1, 0], seed: 62 }, { pace })
    // held hands (a little gold link) once the card has been answered
    if (t > T.card + 2.6) { x.fillStyle = GOLD; x.fillRect(Math.round(ra.x + 80), Math.round(BASE - 96), Math.round(rb.x - ra.x - 160), 8) }
    const ck = pop01(t, T.card, 0.4, 2.2)
    drawTalkCard(x, 555, 900 + Math.sin(t * 2.2) * 10, 250, { pop: ck, rot: Math.sin(t * 1.6) * 0.05, q: ['What’s your', 'favorite view?'] })
    if (t > T.card + 2.2) { const k = pop01(t, T.card + 2.2, 0.35, 2.5); x.save(); x.translate(rb.x + 40, rb.top - 40); x.scale(k, k); x.font = `800 60px Inter`; x.textAlign = 'center'; x.fillStyle = '#ff4f86'; x.fillText('♥', 0, 0); x.restore() }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const [, seg] = segAt(t)
      x.save()
      const sh = shakeAt(t, T.stamp, 12) + shakeAt(t, T.partly, 8)
      x.translate(0, sh)
      if (seg === 'lab') lab(t)
      else if (seg === 'trail') { trail(t); trailCast(t) }
      else if (seg === 'lot') lot(t)
      else if (seg === 'stop') { trail(t, { walking: false, k: 0.9 }); x.fillStyle = `rgba(8,4,20,${0.5 * clamp((t - T.stamp + 0.15) * 6) * (1 - prog(t, ...T.h3Out))})`; x.fillRect(0, 0, 1080, 1100); trailCast(t, { walking: false, stop: true }); dust(x, t, T.stamp, 540, 720, { n: 12, R: 420, col: '#ffb3bd' }) }
      else if (seg === 'dusk') dusk(t)
      x.restore()
      if (seg === 'trail' || seg === 'stop') drawTally(x, 820, 580, tallyAt(t), t, { alpha: seg === 'trail' ? clamp((t - T.trail - 0.4) * 3) : 1 - prog(t, T.stamp - 0.2, T.stamp) })
      for (const [h, o] of H) h.update(t, outK(t, o))
      box1.update(t); box2.update(t)
      stamp.update(t); stamp2.update(t)
      bug.update(t)
      drawGrain(gx, t)
      let f = 0; for (const c of FLASHES) if (t >= c && t < c + 0.18) f = Math.max(f, 0.5 * (1 - (t - c) / 0.18))
      flash.style.opacity = String(f)
    },
  }
}

// one card cut kept (cardfx picks the middle of three): between the trailhead and BUSTED
const CUTS = [4.56, T.cut, 17.92]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

const chipC = (t, f, len, o = {}) => ['chip', r3(t), f, len, { gain: 0.02, ...o }]
const steps = (a, b, every, gain = 0.018) => Array.from({ length: Math.floor((b - a) / every) }, (_, i) => ['tick', r3(a + i * every), gain])
export const CUES = [
  ['pop', 0.02, 659.25, 0.05, 0], ['boom', 0.1, 0.1], ['tick', T.lights, 0.06],
  ['pop', T.l1 - 0.22, 987.77, 0.04, 0], ['pop', T.l1 - 0.16, 1318.51, 0.03, 0],
  // test 1: the trail
  ['whoosh', T.trail - 0.08, 0.35, 0.045], ['tick', T.trail, 0.07],
  ...wordPops(T.h1, 2, 0.08, 2), ['pop', T.h1Land, 1318.51, 0.04, 0], ['pop', T.h1Land + 0.1, 1479.98, 0.035, 0],
  ...steps(T.trail + 0.2, T.lot - 0.1, 0.385, 0.014),
  ...markTimes.map((m, i) => ['pluck', m, NOTE[i % 7] * 2, 0.03, 0.4, 0.4]),
  ['pop', T.pass[1] + 1.0, 523.25, 0.03, -0.3], ['pop', T.pass[1] + 1.1, 587.33, 0.03, -0.3],      // the dog: yip yip
  chipC(T.heronMark, 1760, 0.12, { gain: 0.03 }), chipC(T.heronMark + 0.12, 2093, 0.12, { gain: 0.03 }),
  // test 2: the lot
  ['whoosh', T.lot - 0.08, 0.35, 0.045], ['tick', T.lot, 0.07],
  ...wordPops(T.h2, 2, 0.08, 1), ['pop', T.h2Land, 1318.51, 0.04, 0],
  ['whoosh', T.ari - 0.05, 0.25, 0.04], ['pop', T.ari + 0.15, 1479.98, 0.05, -0.4], ['pluck', T.ari + 0.2, 1975.53, 0.04, 0.4, -0.4],
  ...Array.from({ length: 6 }, (_, i) => ['chip', r3(T.keys + i * 0.11), i % 2 ? 2637 : 3136, 0.05, { gain: 0.016 }]),
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 659.25, 0.03, 0],
  // busted… partly
  ...wordPops(T.h3, 1, 0.08, 0), ['pop', T.h3Land, 1318.51, 0.045, 0],
  ['whoosh', T.stamp - 0.18, 0.2, 0.05], ['boom', T.stamp, 0.5], ['crash', T.stamp, { gain: 0.07 }], ['tick', T.stamp, 0.08],
  ['whoosh', T.partly - 0.15, 0.18, 0.04], ['boom', T.partly, 0.3], ['tick', T.partly, 0.07], ['pop', T.partly + 0.05, 392, 0.04, 0.3],
  ['pop', T.l4 - 0.22, 739.99, 0.04, 0],
  // dusk: a walk is a date
  ['whoosh', T.dusk - 0.08, 0.4, 0.04], ...wordPops(T.h4, 3, 0.08, 2), ['pop', T.h4Land, 1318.51, 0.04, 0],
  ...steps(T.dusk + 0.2, T.end - 0.1, 0.5, 0.012),
  ['whoosh', T.card - 0.05, 0.3, 0.03], ['bell', T.card + 0.2, 1318.51, 0.035, 1.4, 0], ['glitter', T.card, T.card + 0.5],
  ['pluck', T.card + 2.2, 1567.98, 0.04, 0.6, 0.3], ['bell', T.card + 2.62, 1975.53, 0.025, 1.2, 0],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 659.25, 0.03, 0],
  // the last line
  ['whoosh', T.end - 0.08, 0.35, 0.04], ...wordPops(T.h5, 2, 0.1, 1, 0.03), ['pop', T.h5Land, 1318.51, 0.045, 0], ['pluck', T.h5Land, 1479.98, 0.04, 0.6, 0],
  ['pluck', T.h5Land + 0.1, 1975.53, 0.03, 0.8, 0], ['pluck', T.wink, 1318.51, 0.035, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [SS]: 880, [AR]: 1174.66 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [SS]: 880 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
