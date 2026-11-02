// hxcarneeded — STAR MYTH-BUSTERS, Houston: "You *can't* date without a car." (30 s vertical, lofi · F). Story 0–25.6,
// then the shared end card. Template: sxmythsun (the lab, the stamp, the bug) + a street kit (props.js).
//   0.0–4.55   frame 0: the lab. A toy car sits in the bell jar (SUBJECT: DATING, NO CAR). THE STARS in goggles with
//              the clipboard; Pisces on the shelf already crying.
//   4.6–10.0   "Test 1: | *no* car."  (the drop) A golden-hour street: a bike in the bike lane, a bus with Taurus waving
//              from the window, Virgo on foot, a friend's car (Leo, beep beep). The checklist ticks: BIKE · BUS · WALK ·
//              A FRIEND.
//   10.05–14.3 "Test 2: | *across town.*"  The map: the route from YOU to the DATE winds on and on; TRANSFER, TRANSFER.
//              THE STARS: "across town? okay. that one's a *trek.*"
//   14.38      the one card cut.
//   14.44–17.9 "No car, | no *dates?*"  PARTLY TRUE (orange).
//   17.95–23.4 "Plan it | *with* them."  A bus stop at dusk: two stars text the plan; the bus comes; they ride together.
//   23.5–25.45 "Plan the *ride*."  The lab again: the toy car is gone; a tandem bike with two tiny stars rides in the jar.
// Rewatch bait: in the map, a tiny pixel bus inches along the route the whole time… and arrives exactly at DATE ♥ when the
// stamp lands. One canvas, DOM type + boxes + stamp + bug above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, PINK, INK, MINT, CYAN, MONO, pop01, outK, popOut, keyed, r3,
  starGeom, drawGoggles, drawWall, drawBench, drawShelf, drawFlask, drawJar, drawMonitor, phosText, drawClipboard,
  drawTears, buildBug, buildStamp, shakeAt, dust, drawBits,
} from './lab.js'
import { drawStreet, drawGoldSky, drawBus, drawBike, drawCar, drawToyCar, drawTandem, walker, drawChecklist, drawMap, drawChat, drawShelter, ROAD } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const PIS = signStar('pisces')
const ORANGE = '#ff8a3a'

// ── the timeline
export const T = {
  h0Out: [4.38, 4.55], l1: 1.1,
  street: 4.6, h1: 4.62, h1Land: 4.98, h1Out: [9.85, 10.0],
  bike: [4.9, 7.0], bikeOk: 5.9, bus: [6.1, 6.7, 7.6, 8.4], busOk: 7.0, walk: [7.2, 10.2], walkOk: 8.1, car: [8.4, 8.9], beep: 9.0, carOk: 9.2, l2: 6.4,
  map: 10.05, h2: 10.05, h2Land: 10.38, route: [10.3, 15.04], tr: [11.3, 12.3], l3: 11.0,
  cut: 14.38,
  stampAt: BEAT(26), h3: 14.44, h3Land: 14.74, l4: 15.4, h3Out: [17.72, 17.88],
  stop: 17.95, h4: 17.95, h4Land: 18.35, c1: 18.5, c2: 19.4, l5: 18.85, bus2: [21.4, 22.1, 22.6], board: 22.5, h4Out: [23.28, 23.42],
  end: 23.45, h5: 23.5, h5Land: 23.85, wink: 24.35, out: [25.05, 25.45], h5Out: [25.18, 25.45],
}
const SEG = [[0, 'lab'], [T.street, 'street'], [T.map, 'map'], [T.stop, 'stop'], [T.end, 'lab']]
const segAt = t => { let s = SEG[0]; for (const q of SEG) if (t >= q[0]) s = q; return s }
const FLASHES = [T.street, T.map, T.stop, T.end]
const CHECKS = [{ text: 'BIKE', at: T.bikeOk }, { text: 'BUS', at: T.busOk }, { text: 'WALK', at: T.walkOk }, { text: 'A FRIEND', at: T.carOk }]

// ── the lines
const SS = 'THE STARS'
const CPS = 28
const LINES1 = [
  { t: T.l1, speaker: SS, text: 'today’s myth: no car? no *dates.*' },
  { t: T.l2, speaker: SS, text: 'bike. bus. feet. a *friend* who drives.' },
  { t: T.l3, speaker: SS, text: 'across town, though? that one’s a *trek.*' },
]
const LINES2 = [
  { t: T.l4, speaker: SS, text: 'some trips are long. so *plan* them together.' },
  { t: T.l5, speaker: SS, text: 'say how you’re getting there. meet where you *both* can.' },
]
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
T.close1 = r3(Math.min(T.cut - 0.4, LT1[2].done + 1.55))
T.close2 = r3(Math.min(T.h4Out[0] - 0.2, LT2[1].done + 1.6))
T.h2Out = [r3(T.cut - 0.25), r3(T.cut - 0.05)]

const HOPS = {
  stars: [...talkHops(LINES1, SS, { cps: CPS }), ...talkHops(LINES2, SS, { cps: CPS }), T.stampAt + 0.3, T.wink],
  pis: [T.stampAt + 0.1, T.h5 + 0.3],
}

// ── where things are
const JAR = { cx: 540, base: 1336, w: 384, h: 440 }
const HOST = { x: 872, y: 1046, size: 210 }
const PIS_P = { x: 940, y: 694, size: 112 }
const SHELF = { cx: 935, y: 756, w: 300 }
const MON = { cx: 192, cy: 878, w: 300, h: 230 }
const SEED = { stars: 9, pis: 23 }

const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const STARS_K = [
  [0, S_('squint', [-1, 1])], [T.l1, S_('squint', [-1, 1])], [LT1[0].done + 0.3, S_('neutral', [-1, 1])],
  [T.street, S_('happy', [1, 0])], [T.bikeOk, S_('sparkle', [1, 0])], [T.beep, S_('wide', [1, 0], { blink: false })], [T.carOk, S_('happy', [1, 0])],
  [T.map, S_('neutral', [1, -1])], [T.tr[0], S_('squint', [1, -1])], [T.tr[1], S_('wide', [1, -1], { blink: false })], [LT1[2].done, S_('squint', [1, -1])],
  [T.h3, S_('squint', [-1, -1])], [T.stampAt, S_('happy', [0, 0], { sq: 0.06 })],
  [T.end, S_('happy')], [T.wink, S_('wink')], [T.wink + 0.5, S_('happy')],
]
const TEARS = [[0, 0.7], [T.street, 1.0], [T.map, 0.8], [T.tr[1], 1.6], [T.stop, 1.5], [T.end, 1.8]]

// ── sound helpers
const NOTE = [698.46, 783.99, 880, 1046.5, 1174.66, 1396.91, 1567.98]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 140px Inter", "600 34px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H = [
    [popText(root, 'Myth: | You *can’t* date | without a car.', { top: 180, size: 104, accentSize: 156, at: -1.2, gap: 0.09, accentColor: ORANGE, wobble: true, fit: true }), T.h0Out],
    [popText(root, 'Test 1: | *no* car.', { top: 196, size: 104, accentSize: 150, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Test 2: | *across town.*', { top: 196, size: 104, accentSize: 140, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: CYAN, fit: true }), T.h2Out],
    [popText(root, 'No car, | no *dates?*', { top: 196, size: 110, accentSize: 160, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: ORANGE }), T.h3Out],
    [popText(root, 'Plan it | *with* them.', { top: 196, size: 110, accentSize: 160, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: GOLD }), T.h4Out],
    [popText(root, 'Plan the | *ride.*', { top: 300, size: 124, accentSize: 190, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: GOLD }), T.h5Out],
  ]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1430, width: 960, height: 290, open: T.l1 - 0.22, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1430, width: 960, height: 290, open: T.l4 - 0.22, close: T.close2, cps: CPS })
  const stamp = buildStamp(root, { at: T.stampAt, out: T.h3Out, cx: 540, cy: 680, w: 860, h: 210, rot: -9, text: 'PARTLY TRUE', color: ORANGE })
  const bug = buildBug(root, { at: -1, out: [STORY_END - 0.35, STORY_END - 0.05] })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const flash = el('div', { position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none' }, root)

  function screen(x, sx, sy, sw, sh, t) {
    if (t < T.street) {
      phosText(x, 'SUBJECT:', sx + 16, sy + 34, 24); phosText(x, 'DATING,', sx + 16, sy + 70, 30); phosText(x, 'NO CAR', sx + 16, sy + 106, 30)
      phosText(x, 'STANDBY' + (Math.floor(t * 2.5) % 2 ? '_' : ''), sx + 16, sy + sh - 30, 22, { alpha: 0.75 })
      return
    }
    phosText(x, 'RESULT:', sx + 16, sy + 34, 24)
    phosText(x, 'PLANNED ✓', sx + 16, sy + 76, 30, { alpha: clamp((t - T.h5Land) * 4), color: GOLD })
    phosText(x, 'TOGETHER ✓', sx + 16, sy + 116, 26, { alpha: clamp((t - T.h5Land - 0.3) * 4) })
  }

  // ── the lab (frame 0, and the rhyme at the end)
  function lab(t) {
    drawSky(x, t, { ...SKY_H, dim: 0.42 })
    const ending = t >= T.end
    x.save(); x.globalAlpha = 1 - ease.inOutQuad(prog(t, T.out[0], T.out[1]))
    drawWall(x, t)
    drawShelf(x, SHELF.cx, SHELF.y, SHELF.w)
    drawFlask(x, 832, SHELF.y - 2, 7, PINK, t, { kind: 'cone', seed: 2 })
    drawFlask(x, 1040, SHELF.y - 2, 6, '#9a7be0', t, { kind: 'tube', seed: 5 })
    drawMonitor(x, MON.cx, MON.cy, MON.w, MON.h, t, (c, sx, sy, sw, sh2) => screen(c, sx, sy, sw, sh2, t), { on: 1 })
    drawBench(x, t)
    drawFlask(x, 296, 1334, 8, MINT, t, { kind: 'cone', seed: 7 })
    drawFlask(x, 1012, 1334, 7, CYAN, t, { kind: 'tube', seed: 11 })
    drawJar(x, JAR.cx, JAR.base, JAR.w, JAR.h, t, { part: 'back', label: ending ? 'SUBJECT: DATING, PLANNED' : 'SUBJECT: DATING, NO CAR' })
    if (!ending) {
      // the toy car revs in place, going nowhere (exhaust puffs)
      const shake = Math.sin(t * 40) * 3
      drawToyCar(x, JAR.cx + shake, JAR.base - 44, 16)
      for (let i = 0; i < 3; i++) { const ph = (t * 1.3 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * (1 - ph); x.fillStyle = '#c9cde8'; const s = 10 + ph * 22; x.fillRect(JAR.cx - 90 - ph * 70, JAR.base - 50 - ph * 40, s, s); x.restore() }
    } else {
      // a tandem bike with two tiny stars, riding a little loop in the jar
      const u = Math.sin(t * 2.2) * 70
      drawTandem(x, JAR.cx + u, JAR.base - 52, 12, { color: GOLD })
      drawPixelStar(x, JAR.cx + u - 40, JAR.base - 150 - Math.abs(Math.sin(t * 8)) * 6, 64, 3, '#ff8fb1')
      drawPixelStar(x, JAR.cx + u + 40, JAR.base - 150 - Math.abs(Math.sin(t * 8 + 1)) * 6, 64, 3, '#7fe0ff')
      const hk = pop01(t, T.h5Land + 0.1, 0.35, 2.5)
      if (hk > 0.01) { x.save(); x.font = `800 ${Math.round(64 * hk)}px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ff4f86'; x.fillText('♥', JAR.cx + u, JAR.base - 250 - 10 * Math.sin(t * 4)); x.restore() }
    }
    drawJar(x, JAR.cx, JAR.base, JAR.w, JAR.h, t, { part: 'front' })
    const ok = popOut(t, T.out)
    if (ok > 0) {
      const pisO = { color: PIS.color, mood: ending ? 'heart' : 'sparkle', look: [-1, 1], hops: HOPS.pis, seed: SEED.pis, pop: ok, glow: 0.8 }
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
    x.restore()
  }

  // ── test 1: the street
  function street(t) {
    drawStreet(x, t)
    // Virgo on foot along the back sidewalk
    if (t >= T.walk[0] && t < T.walk[1]) walker(x, lerp(-80, 1160, prog(t, ...T.walk)), 1046, 110, t, { color: signStar('virgo').color, mood: 'happy', look: [1, 0], seed: 52, glow: 0.6 }, { pace: 2.4 })
    // the bus: rolls in, stops, Taurus waves from a window, rolls out
    if (t >= T.bus[0] && t < T.bus[3]) {
      const bx = t < T.bus[1] ? lerp(-420, 520, ease.outCubic(prog(t, T.bus[0], T.bus[1]))) : t < T.bus[2] ? 520 : lerp(520, 1500, ease.inCubic(prog(t, T.bus[2], T.bus[3])))
      drawBus(x, bx, 1110, 22, t, { riders: [signStar('cancer').color, signStar('taurus').color, signStar('aquarius').color, signStar('gemini').color] })
    }
    // the bike, in its lane
    if (t >= T.bike[0] && t < T.bike[1]) {
      const bx = lerp(-120, 1200, prog(t, ...T.bike)), by = ROAD[0] + 30
      drawBike(x, bx, by + 10, 11, { color: '#7fe0ff' })
      drawStarChar(x, bx - 6, by - 64 - Math.abs(Math.sin(t * 9)) * 4, 100, t, { color: signStar('sagittarius').color, mood: 'happy', look: [1, 0], seed: 51, glow: 0.6, bob: 0 })
    }
    // a friend's car: pulls up, beep beep, Leo waves from the window
    if (t >= T.car[0]) {
      const cx = lerp(1300, 620, ease.outCubic(prog(t, ...T.car)))
      drawCar(x, cx, 1210, 13, { color: '#ff6a7a', sx: -1 })
      drawStarChar(x, cx - 20, 1150, 90, t, { color: signStar('leo').color, mood: t > T.beep ? 'wink' : 'happy', look: [-1, 0], seed: 53, glow: 0.5, tips: false, hops: [T.beep, T.beep + 0.3] })
      if (t > T.beep && t < T.map) { const k = pop01(t, T.beep, 0.25, 2.6); x.save(); x.translate(cx + 40, 1040); x.scale(k, k); x.rotate(-0.1); x.font = `800 40px Inter`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('beep beep!', 3, 3); x.fillStyle = GOLD; x.fillText('beep beep!', 0, 0); x.restore() }
    }
    // the cast on the front sidewalk
    const hs = keyed(t, STARS_K)
    const pisO = { color: PIS.color, mood: 'sparkle', look: [1, -1], seed: SEED.pis, glow: 0.8 }
    const rp = drawStarChar(x, 100, 1356, 120, t, pisO)
    drawTears(x, starGeom(t, rp, 120, pisO), t, { rate: keyed(t, TEARS), seed: 3 })
    const hostO = { color: STAR.sky, ...hs, hops: HOPS.stars, seed: SEED.stars, squash: hs.sq || 0, glow: 1.1 }
    const rh = drawStarChar(x, 300, 1320, 190, t, hostO)
    drawGoggles(x, starGeom(t, rh, 190, hostO), t)
    drawClipboard(x, rh.x + 88, rh.y + 66, 6.5, t, { scribble: CHECKS.some(c => t > c.at - 0.3 && t < c.at + 0.2) ? 1 : 0, rot: -0.14 })
    drawChecklist(x, 820, 470, CHECKS, t, { alpha: clamp((t - T.street - 0.3) * 4) })
  }

  // ── test 2 (and the stamp): the map
  function mapScene(t) {
    const route = ease.inOutQuad(prog(t, ...T.route))
    drawMap(x, t, { route, transfers: [{ at: T.tr[0], x: 400, y: 1020 }, { at: T.tr[1], x: 690, y: 810 }] })
    // the tiny bus inching along the route (rewatch bait: it reaches DATE ♥ as the stamp lands)
    const P = [[190, 1180], [190, 1080], [330, 1080], [330, 960], [470, 960], [470, 860], [610, 860], [610, 760], [760, 760], [760, 690], [880, 690]]
    let L = 0; const seg = []; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(d); L += d }
    let left = L * route, bp = P[0]
    for (let i = 1; i < P.length && left > 0; i++) { const u = Math.min(1, left / seg[i - 1]); bp = [lerp(P[i - 1][0], P[i][0], u), lerp(P[i - 1][1], P[i][1], u)]; left -= seg[i - 1] }
    drawBits(x, ['BBBBBB', 'BWBWBB', 'BBBBBB', '.K..K.'], { B: '#8a6ae0', W: '#cfe8ff', K: INK }, bp[0], bp[1] - 22, 6)
    if (t >= T.stampAt) { const k = pop01(t, T.stampAt, 0.3, 2.6); x.save(); x.translate(880, 560); x.scale(k, k); x.font = `800 60px Inter`; x.textAlign = 'center'; x.fillStyle = '#ff4f86'; x.fillText('♥', 0, 0); x.restore() }
    // THE STARS + Pisces poring over the map (bottom)
    const hs = keyed(t, STARS_K)
    const pisO = { color: PIS.color, mood: t > T.tr[1] && t < T.stampAt ? 'wide' : 'sparkle', look: [1, -1], seed: SEED.pis, glow: 0.8, hops: HOPS.pis }
    const rp = drawStarChar(x, 760, 1340, 120, t, pisO)
    drawTears(x, starGeom(t, rp, 120, pisO), t, { rate: keyed(t, TEARS), seed: 3 })
    const hostO = { color: STAR.sky, ...hs, hops: HOPS.stars, seed: SEED.stars, squash: hs.sq || 0, glow: 1.1 }
    const rh = drawStarChar(x, 930, 1290, 190, t, hostO)
    drawGoggles(x, starGeom(t, rh, 190, hostO), t)
    dust(x, t, T.stampAt, 540, 680, { n: 12, R: 420, col: '#ffcf9a' })
  }

  // ── tie-in: the bus stop at dusk, the plan in two texts, the bus comes
  function stop(t) {
    drawStreet(x, t, { k: 0.2 })
    drawShelter(x, t)
    const A = signStar('capricorn'), B = signStar('leo')
    const board = t >= T.board
    // the bus behind them
    if (t >= T.bus2[0]) { const bx = t < T.bus2[1] ? lerp(-460, 540, ease.outCubic(prog(t, T.bus2[0], T.bus2[1]))) : 540; drawBus(x, bx, 1110, 22, t, { riders: board ? [A.color, B.color] : [] }) }
    if (!board) {
      const ra = drawStarChar(x, 380, 1160, 180, t, { color: A.color, glyph: A.glyph, mood: t < T.c2 + 0.6 ? 'happy' : 'sparkle', look: [1, -1], seed: 61, glow: 1, hops: [T.c1 + 0.1, T.bus2[1]] })
      const rb = drawStarChar(x, 700, 1160, 180, t, { color: B.color, glyph: B.glyph, mood: t < T.c2 ? 'neutral' : 'heart', look: [-1, -1], seed: 62, glow: 1, hops: [T.c2 + 0.1, T.bus2[1]] })
      // phones
      for (const r of [ra, rb]) { x.fillStyle = INK; x.fillRect(r.x - (r === ra ? -70 : 110), r.y + 10, 40, 64); x.fillStyle = '#9fd0ff'; x.fillRect(r.x - (r === ra ? -74 : 106), r.y + 16, 32, 50) }
    }
    drawChat(x, 400, 640, 'coming by bus! ♥', { k: pop01(t, T.c1, 0.3, 2.4), side: 'left', col: '#f4ecdc', w: 440 })
    drawChat(x, 680, 780, 'meet you at the stop ✦', { k: pop01(t, T.c2, 0.3, 2.4), side: 'right', col: '#bfe8ff', w: 500 })
    // Pisces in the shelter corner, crying at the romance of public transit
    const pisO = { color: PIS.color, mood: 'sparkle', look: [1, 0], seed: SEED.pis, glow: 0.8 }
    const rp = drawStarChar(x, 990, 1310, 110, t, pisO)
    drawTears(x, starGeom(t, rp, 110, pisO), t, { rate: keyed(t, TEARS), seed: 3 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const [, seg] = segAt(t)
      x.save()
      x.translate(0, shakeAt(t, T.stampAt, 12))
      if (seg === 'lab') lab(t)
      else if (seg === 'street') street(t)
      else if (seg === 'map') { mapScene(t); x.fillStyle = `rgba(8,4,20,${0.4 * clamp((t - T.stampAt + 0.15) * 6) * (1 - prog(t, ...T.h3Out))})`; x.fillRect(0, 480, 1080, 940) }
      else if (seg === 'stop') stop(t)
      x.restore()
      for (const [h, o] of H) h.update(t, outK(t, o))
      box1.update(t); box2.update(t)
      stamp.update(t)
      bug.update(t)
      drawGrain(gx, t)
      let f = 0; for (const c of FLASHES) if (t >= c && t < c + 0.18) f = Math.max(f, 0.5 * (1 - (t - c) / 0.18))
      flash.style.opacity = String(f)
    },
  }
}

// one card cut kept (cardfx picks the middle of three): the map's long route → PARTLY TRUE
const CUTS = [4.56, T.cut, 17.92]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

export const CUES = [
  ['pop', 0.02, 698.46, 0.05, 0], ['boom', 0.1, 0.1],
  ...Array.from({ length: 10 }, (_, i) => ['tom', r3(0.3 + i * 0.4), 90 + (i % 2) * 20, { gain: 0.05, decay: 0.12, pan: -0.2 }]),      // the toy car revving
  ['pop', T.l1 - 0.22, 1046.5, 0.04, 0], ['pop', T.l1 - 0.16, 1396.91, 0.03, 0],
  // test 1: the street
  ['whoosh', T.street - 0.08, 0.35, 0.045], ['tick', T.street, 0.07],
  ...wordPops(T.h1, 2, 0.08, 2), ['pop', T.h1Land, 1396.91, 0.04, 0], ['pop', T.h1Land + 0.1, 1567.98, 0.035, 0],
  ['bell', T.bike[0] + 0.5, 2093, 0.025, 0.4, -0.3], ['bell', T.bike[0] + 0.62, 2093, 0.025, 0.4, -0.2],           // ring ring
  ['whoosh', T.bus[0], 0.6, 0.03], ['tom', T.bus[1], 70, { gain: 0.1, decay: 0.3 }], ['whoosh', T.bus[1] + 0.05, 0.3, 0.025], ['whoosh', T.bus[2], 0.7, 0.03],
  ['whoosh', T.car[0], 0.45, 0.03], ['chip', T.beep, 880, 0.12, { gain: 0.03 }], ['chip', T.beep + 0.2, 880, 0.12, { gain: 0.03 }],
  ...CHECKS.flatMap((c, i) => [['pop', r3(c.at), NOTE[(i * 2) % 7] * 2, 0.04, 0.4], ['pluck', r3(c.at + 0.04), NOTE[(i * 2 + 2) % 7] * 2, 0.03, 0.4, 0.4]]),
  // test 2: the map
  ['whoosh', T.map - 0.08, 0.35, 0.045], ['tick', T.map, 0.07],
  ...wordPops(T.h2, 2, 0.08, 1), ['pop', T.h2Land, 1396.91, 0.04, 0],
  ['riser', T.route[0], T.cut - 0.2, 0.02],
  ...T.tr.flatMap(a => [['pop', a, 392, 0.04, 0], ['tick', a, 0.06], ['pop', r3(a + 0.1), 349.23, 0.035, 0]]),
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 698.46, 0.03, 0],
  // partly true
  ...wordPops(T.h3, 2, 0.08, 0), ['pop', T.h3Land, 1396.91, 0.045, 0],
  ['whoosh', T.stampAt - 0.18, 0.2, 0.05], ['boom', T.stampAt, 0.45], ['crash', T.stampAt, { gain: 0.06 }], ['tick', T.stampAt, 0.08],
  ['bell', T.stampAt + 0.3, 1567.98, 0.03, 1.0, 0.3],
  ['pop', T.l4 - 0.22, 783.99, 0.04, 0],
  // the bus stop
  ['whoosh', T.stop - 0.08, 0.4, 0.04], ...wordPops(T.h4, 2, 0.08, 2), ['pop', T.h4Land, 1396.91, 0.04, 0],
  ['pop', T.c1, 1567.98, 0.04, -0.3], ['pluck', T.c1 + 0.05, 2093, 0.025, 0.4, -0.3], ['pop', T.c2, 1396.91, 0.04, 0.3], ['pluck', T.c2 + 0.05, 1760, 0.025, 0.4, 0.3],
  ['whoosh', T.bus2[0], 0.6, 0.03], ['tom', T.bus2[1], 70, { gain: 0.1, decay: 0.3 }], ['pop', T.board, 1046.5, 0.035, 0], ['pop', T.board + 0.08, 1396.91, 0.03, 0],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 698.46, 0.03, 0],
  // the last line
  ['whoosh', T.end - 0.08, 0.35, 0.04], ...wordPops(T.h5, 2, 0.1, 1, 0.03), ['pop', T.h5Land, 1396.91, 0.045, 0], ['pluck', T.h5Land, 1567.98, 0.04, 0.6, 0],
  ['bell', T.h5Land + 0.15, 2093, 0.025, 0.4, 0.2], ['pluck', T.wink, 1396.91, 0.035, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [SS]: 880 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [SS]: 880 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void BONE; void MONO; void drawGoldSky
