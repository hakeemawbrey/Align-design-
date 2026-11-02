// hxnothingtodo — STAR MYTH-BUSTERS, Houston: "There's *nothing* to do on a date here." (30 s vertical, pop · A).
// Story 0–25.6, then the shared end card. Template: sxmythsun (the lab, the stamp, the bug) + an idea board (props.js).
//   0.0–4.55   frame 0: the lab. A tumbleweed rolls around the bell jar (SUBJECT: DATE IDEAS). THE STARS squint at it;
//              Pisces on the shelf, already crying.
//   4.6–10.0   "Test 1: | the *idea board.*"  (the drop) A cork board: THE STARS slap up free ideas, one per beat:
//              PARKS · MARKETS · MURALS · SUNSETS.  "free. free. free. *also* free."
//   10.05–14.3 "Test 2: | *more* ideas."  The notes come faster (bayou walk, picnic, stargazing, dog park, porch talk,
//              library, bike trail), then a flurry buries Pisces. Libra: "too many! how do i *choose?!*"
//   14.38      the one card cut.
//   14.44–17.9 "Nothing | to *do?*"  BUSTED.
//   17.95–23.4 "Too many? | *Pick* one."  Blindfold, a spin, a dart: SUNSETS. Three face-down cards on the bench.
//   23.5–25.45 "Pick *one*. Go."  The lab again: the jar is empty, a note on the glass: the tumbleweed went to the sunset.
// Rewatch bait: the tumbleweed is on the board the whole time, pinned under PARKS as its own sticky note… and its note
// is the one missing at the end. One canvas, DOM type + boxes + stamp + bug above it, grain on top. Pure f(t).
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
import { drawBoard, drawNote, drawTumbleweed, drawDart, drawCardProp, drawBlindfold } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const PIS = signStar('pisces'), LIB = signStar('libra')
const NOPE = '#ff8fb1'

// ── the timeline
export const T = {
  h0Out: [4.38, 4.55], l1: 1.1,
  board: 4.6, h1: 4.62, h1Land: 4.98, l2: 7.5, h1Out: [9.85, 10.0],
  more: 10.05, h2: 10.05, h2Land: 10.38, lib: 10.7, l3: 11.0, flurry: [12.2, 13.7],
  cut: 14.38,
  busted: 14.38, h3: 14.44, h3Land: 14.74, stamp: BEAT(26), l4: 15.4, h3Out: [17.72, 17.88],
  pick: 17.95, h4: 17.95, h4Land: 18.35, blind: 18.25, spin: [18.45, 18.95], throw: 19.0, hit: 19.4, l5: 19.75, deck: 20.3, h4Out: [23.28, 23.42],
  end: 23.45, h5: 23.5, h5Land: 23.85, wink: 24.35, out: [25.05, 25.45], h5Out: [25.18, 25.45],
}
const SEG = [[0, 'lab'], [T.board, 'board'], [T.end, 'lab']]
const segAt = t => { let s = SEG[0]; for (const q of SEG) if (t >= q[0]) s = q; return s }
const FLASHES = [T.board, T.end]

// ── the notes: [word, icon, colour, slot or free position, landing time]
const SLOT = (i) => ({ x: [250, 540, 830][i % 3], y: [690, 880, 1070][Math.floor(i / 3)] })
const NOTES = [
  { word: 'PARKS', icon: 'tree', col: 'm', at: BEAT(8) },
  { word: 'MARKETS', icon: 'basket', col: 'y', at: BEAT(9) },
  { word: 'MURALS', icon: 'mural', col: 'p', at: BEAT(10) },
  { word: 'SUNSETS', icon: 'sun', col: 'o', at: BEAT(11) },
  { word: 'BAYOU WALK', icon: 'walk', col: 'b', at: 10.35 },
  { word: 'PICNIC', icon: 'picnic', col: 'y', at: 10.65 },
  { word: 'STARGAZING', icon: 'stars', col: 'b', at: 10.95 },
  { word: 'DOG PARK', icon: 'dog', col: 'm', at: 11.25 },
  { word: 'PORCH TALK', icon: 'porch', col: 'p', at: 11.55 },
  { word: 'LIBRARY', icon: 'book', col: 'o', at: 11.85, x: 370, y: 790, rot: 0.2 },
  { word: 'BIKE TRAIL', icon: 'bike', col: 'y', at: 12.05, x: 700, y: 980, rot: -0.18 },
].map((n, i) => ({ ...SLOT(i), rot: ((i * 37) % 7 - 3) * 0.02, ...n }))
const SUNSET = 3
// the flurry: blank-ish notes raining onto the bench (and Pisces)
const FLURRY = Array.from({ length: 16 }, (_, i) => ({ at: r3(T.flurry[0] + i * ((T.flurry[1] - T.flurry[0]) / 16)), x: 120 + ((i * 263) % 840), y: 1290 - (i % 4) * 26, rot: ((i * 53) % 11 - 5) * 0.06, col: 'ypmbo'[i % 5], icon: ['heart', 'tree', 'sun', 'stars', 'basket'][i % 5] }))

// ── the lines
const SS = 'THE STARS', LB = '♎ LIBRA'
const CPS = 28
const LINES1 = [
  { t: T.l1, speaker: SS, text: 'today’s myth: there’s *nothing* to do here.' },
  { t: T.l2, speaker: SS, text: 'free. free. free. *also* free.' },
  { t: T.l3, speaker: LB, text: 'too many! how do i *choose?!*', color: LIB.color },
]
const LINES2 = [
  { t: T.l4, speaker: SS, text: 'not nothing. too *much.* so: pick one.' },
  { t: T.l5, speaker: SS, text: 'or let tonight’s deck *deal* you one.' },
]
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
T.close1 = r3(Math.min(T.cut - 0.4, LT1[2].done + 1.55))
T.close2 = r3(LT2[1].done + 1.6)
T.h2Out = [r3(T.cut - 0.25), r3(T.cut - 0.05)]

const HOPS = {
  stars: [...talkHops(LINES1, SS, { cps: CPS }), ...talkHops(LINES2, SS, { cps: CPS }), ...NOTES.slice(0, 9).map(n => n.at - 0.35), T.stamp + 0.3, T.hit + 0.15, T.wink],
  lib: [T.lib + 0.1, ...talkHops(LINES1, LB, { cps: CPS }), T.hit + 0.2],
  pis: [T.stamp + 0.1, T.hit + 0.25, T.h5 + 0.3],
}

// ── where things are
const JAR = { cx: 540, base: 1336, w: 384, h: 440 }
const HOST_L = { x: 872, y: 1046, size: 210 }, HOST_B = { x: 900, y: 1250, size: 190 }
const PIS_P = { x: 940, y: 694, size: 112 }, PIS_B = { x: 180, y: 1275, size: 120 }
const LIB_P = { x: 190, y: 1100, size: 170 }
const SHELF = { cx: 935, y: 756, w: 300 }
const MON = { cx: 192, cy: 878, w: 300, h: 230 }
const SEED = { stars: 9, pis: 23, lib: 15 }

const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const STARS_K = [
  [0, S_('squint', [-1, 1])], [T.l1, S_('squint', [-1, 1])], [LT1[0].done + 0.3, S_('neutral', [-1, 1])],
  [T.board, S_('happy', [-1, -1])], [NOTES[3].at, S_('sparkle', [-1, -1])],
  [T.more, S_('happy', [-1, -1])], [NOTES[6].at, S_('wide', [-1, -1], { blink: false })], [T.flurry[0], S_('wide', [-1, 1], { blink: false, sq: -0.06 })],
  [T.h3, S_('squint', [-1, -1])], [T.stamp, S_('happy', [0, 0], { sq: 0.06 })], [T.l4, S_('happy')],
  [T.hit, S_('wide', [-1, -1], { blink: false })], [T.hit + 0.5, S_('sparkle', [-1, -1])],
  [T.end, S_('happy')], [T.wink, S_('wink')], [T.wink + 0.5, S_('happy')],
]
const LIB_K = [[0, S_('wide', [1, -1], { blink: false })], [T.l3, S_('wide', [1, -1], { blink: false, sq: -0.06 })], [LT1[2].done + 0.2, S_('eyeroll')], [T.h3, S_('squint', [1, -1])], [T.stamp, S_('happy', [1, 0])], [T.hit, S_('heart', [1, -1])]]
const TEARS = [[0, 0.7], [T.board, 1.0], [T.flurry[0], 1.8], [T.busted, 1.2], [T.hit, 1.8], [T.end, 1.8]]

// ── sound helpers
const NOTE = [880, 987.77, 1108.73, 1318.51, 1479.98, 1760, 1975.53]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 140px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H = [
    [popText(root, 'Myth: There’s | *nothing* to do | on a date here.', { top: 180, size: 96, accentSize: 150, at: -1.2, gap: 0.09, accentColor: NOPE, wobble: true, fit: true }), T.h0Out],
    [popText(root, 'Test 1: | the *idea board.*', { top: 196, size: 104, accentSize: 140, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: CYAN, fit: true }), T.h1Out],
    [popText(root, 'Test 2: | *more* ideas.', { top: 196, size: 104, accentSize: 140, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'Nothing | to *do?*', { top: 196, size: 110, accentSize: 160, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: NOPE }), T.h3Out],
    [popText(root, 'Too many? | *Pick* one.', { top: 196, size: 104, accentSize: 150, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: GOLD }), T.h4Out],
    [popText(root, 'Pick *one*. | Go.', { top: 300, size: 130, accentSize: 190, at: T.h5, late: 2, lateAt: T.h5Land, wobble: true, accentColor: GOLD }), T.h5Out],
  ]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1430, width: 960, height: 290, open: T.l1 - 0.22, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1430, width: 960, height: 290, open: T.l4 - 0.22, close: T.close2, cps: CPS })
  const stamp = buildStamp(root, { at: T.stamp, out: T.h3Out, cx: 540, cy: 760, w: 720, h: 230, rot: -10 })
  const bug = buildBug(root, { at: -1, out: [STORY_END - 0.35, STORY_END - 0.05] })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const flash = el('div', { position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none' }, root)

  function screen(x, sx, sy, sw, sh, t) {
    if (t < T.board) {
      phosText(x, 'SUBJECT:', sx + 16, sy + 34, 24); phosText(x, 'DATE IDEAS', sx + 16, sy + 70, 30)
      phosText(x, 'FOUND: ' + (Math.floor(t * 2.5) % 2 ? '…' : ''), sx + 16, sy + 110, 24, { alpha: 0.85 })
      phosText(x, 'SEARCHING' + (Math.floor(t * 2.5) % 2 ? '_' : ''), sx + 16, sy + sh - 30, 22, { alpha: 0.75 })
      return
    }
    phosText(x, 'RESULT:', sx + 16, sy + 34, 24)
    phosText(x, 'PICKED ✓', sx + 16, sy + 76, 30, { alpha: clamp((t - T.h5Land) * 4), color: GOLD })
    phosText(x, 'GONE ON A', sx + 16, sy + 116, 24, { alpha: clamp((t - T.h5Land - 0.3) * 4) })
    phosText(x, 'DATE', sx + 16, sy + 146, 24, { alpha: clamp((t - T.h5Land - 0.3) * 4) })
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
    drawJar(x, JAR.cx, JAR.base, JAR.w, JAR.h, t, { part: 'back', label: 'SUBJECT: DATE IDEAS' })
    if (!ending) {
      // the tumbleweed rolls back and forth inside the jar: nothing to see here
      const u = Math.sin(t * 1.4), tx = JAR.cx + u * 110
      drawTumbleweed(x, tx, JAR.base - 62 - Math.abs(Math.sin(t * 4.2)) * 14, 54, t, { rot: u * 3.2 })
    } else {
      // empty jar; a note on the glass
      const k = pop01(t, T.end + 0.05, 0.35, 2.2)
      drawNote(x, JAR.cx, JAR.base - 200, { word: 'AT THE SUNSET', icon: 'sun', col: 'o', k, rot: -0.08, w: 250 })
      if (t > T.h5Land) { const k2 = pop01(t, T.h5Land + 0.2, 0.3, 2.6); x.save(); x.translate(JAR.cx + 120, JAR.base - 300); x.scale(k2, k2); x.font = `800 60px Inter`; x.textAlign = 'center'; x.fillStyle = '#ff4f86'; x.fillText('♥', 0, 0); x.restore() }
      // two little tracks of tumble-dust leading out of the jar
      for (let i = 0; i < 7; i++) { x.fillStyle = 'rgba(201,164,106,0.6)'; x.fillRect(JAR.cx + 120 + i * 50, JAR.base - 18 - (i % 2) * 6, 14, 8) }
    }
    drawJar(x, JAR.cx, JAR.base, JAR.w, JAR.h, t, { part: 'front' })
    // the cast
    const ok = popOut(t, T.out)
    if (ok > 0) {
      const pisO = { color: PIS.color, mood: ending ? 'heart' : 'sparkle', look: [-1, 1], hops: HOPS.pis, seed: SEED.pis, pop: ok, glow: 0.8 }
      const rp = drawStarChar(x, PIS_P.x, PIS_P.y, PIS_P.size, t, pisO)
      const gp = starGeom(t, rp, PIS_P.size, pisO)
      drawGoggles(x, gp, t, { alpha: ok })
      drawTears(x, gp, t, { rate: keyed(t, TEARS), alpha: ok, seed: 3 })
      const hs = keyed(t, STARS_K)
      const hostO = { color: STAR.sky, ...hs, hops: HOPS.stars, seed: SEED.stars, squash: hs.sq || 0, pop: ok, glow: 1.1 }
      const rh = drawStarChar(x, HOST_L.x, HOST_L.y, HOST_L.size, t, hostO)
      drawGoggles(x, starGeom(t, rh, HOST_L.size, hostO), t, { alpha: ok })
      drawClipboard(x, rh.x + 96, rh.y + 74, 7 * ok, t, { scribble: t > T.l1 && t < LT1[0].done ? 1 : 0, rot: -0.14 + 0.04 * Math.sin(t * 2) })
    }
    x.restore()
  }

  // ── the board: notes fly from THE STARS' hand to their spot
  function noteAt(n, t, i) {
    if (t < n.at - 0.32) return
    const p = ease.outCubic(prog(t, n.at - 0.32, n.at))
    const fx = HOST_B.x - 80, fy = HOST_B.y - 120
    const cx = lerp(fx, n.x, p), cy = lerp(fy, n.y, p) - Math.sin(Math.PI * p) * 120
    const slap = t >= n.at ? 1 + 0.12 * Math.exp(-(t - n.at) * 12) * Math.cos((t - n.at) * 40) : lerp(0.4, 1, p)
    const win = i === SUNSET && t >= T.hit
    const wk = win ? pop01(t, T.hit, 0.4, 2.2) : 0
    drawNote(x, lerp(cx, 540, wk * 0), cy, { word: n.word, icon: n.icon, col: n.col, k: slap * (1 + 0.25 * wk), rot: lerp(n.rot + (1 - p) * 0.8, 0, wk), glow: win ? 0.8 + 0.2 * Math.sin(t * 6) : 0 })
  }
  function boardScene(t) {
    drawSky(x, t, { ...SKY_H, dim: 0.42 })
    drawWall(x, t)
    const dy = (1 - ease.outBack ? 0 : 0) + (1 - ease.outCubic(prog(t, T.board, T.board + 0.35))) * -700
    x.save(); x.translate(0, dy)
    drawBoard(x, t)
    // the tumbleweed's own sticky note, peeking out from under PARKS (the rewatch bait)
    if (t >= NOTES[0].at - 0.32) drawNote(x, SLOT(0).x - 70, SLOT(0).y + 70, { word: 'TUMBLE', icon: null, col: 'y', k: 0.55, rot: -0.3 })
    NOTES.forEach((n, i) => noteAt(n, t, i))
    x.restore()
    drawBench(x, t)
    // the flurry onto the bench, burying Pisces
    for (const f of FLURRY) {
      if (t < f.at - 0.4) continue
      const p = ease.inQuad(prog(t, f.at - 0.4, f.at))
      drawNote(x, f.x, lerp(-200, f.y, p), { word: '…', icon: f.icon, col: f.col, k: 0.6, rot: f.rot + (1 - p) * 2 })
    }
    // the dart
    const target = NOTES[SUNSET]
    drawDart(x, HOST_B.x - 60, HOST_B.y - 60, target.x + 30, target.y - 20, prog(t, T.throw, T.hit))
    if (t >= T.hit) { x.save(); x.translate(target.x + 30, target.y - 20); x.rotate(-2.6); x.fillStyle = INK; x.fillRect(-4, -6, 64, 12); x.fillStyle = '#c9cde8'; x.fillRect(0, -3, 56, 6); x.fillStyle = '#ff4f86'; x.fillRect(50, -16, 18, 12); x.fillRect(50, 4, 18, 12); x.restore() }
    dust(x, t, T.hit, target.x, target.y, { n: 10, R: 150, col: GOLD })
    // tonight's deck: three face-down cards fanned on the bench (a prop)
    if (t >= T.deck) for (let i = 0; i < 3; i++) drawCardProp(x, 470 + i * 80, 1290 - Math.abs(i - 1) * -10, 96, { rot: (i - 1) * 0.22, k: pop01(t, T.deck + i * 0.12, 0.3, 2.4), glow: i === 1 ? 0.5 + 0.3 * Math.sin(t * 4) : 0 })
    boardCast(t)
    dust(x, t, T.stamp, 540, 760, { n: 12, R: 420, col: '#ffb3bd' })
  }
  function boardCast(t) {
    // Pisces: bottom-left; under the flurry only its eyes peek out
    const buried = t > T.flurry[1] - 0.3 && t < T.pick
    const pisO = { color: PIS.color, mood: buried ? 'wide' : 'sparkle', look: [1, -1], hops: HOPS.pis, seed: SEED.pis, glow: 0.8, blink: buried ? false : undefined }
    const rp = drawStarChar(x, PIS_B.x, PIS_B.y, PIS_B.size, t, pisO)
    const gp = starGeom(t, rp, PIS_B.size, pisO)
    drawTears(x, gp, t, { rate: keyed(t, TEARS), seed: 3 })
    if (buried) for (let i = 0; i < 4; i++) drawNote(x, PIS_B.x - 60 + i * 40, PIS_B.y + 30 - (i % 2) * 20, { word: '…', icon: ['heart', 'sun', 'tree', 'stars'][i], col: 'ypmb'[i], k: 0.55, rot: (i - 1.5) * 0.3 })
    // Libra: pops up on the left in test 2, overwhelmed
    if (t >= T.lib && t < T.end) {
      const lk = keyed(t, LIB_K), lp = pop01(t, T.lib, 0.35, 2.4)
      drawStarChar(x, LIB_P.x, LIB_P.y, LIB_P.size, t, { color: LIB.color, glyph: LIB.glyph, ...lk, hops: HOPS.lib, seed: SEED.lib, squash: lk.sq || 0, pop: lp, glow: 1 })
    }
    // THE STARS: bottom-right, goggles, slapping notes up; blindfold + spin for the dart
    const hs = keyed(t, STARS_K)
    const spin = prog(t, ...T.spin)
    const sx = spin > 0 && spin < 1 ? Math.cos(spin * Math.PI * 4) : 1
    const hostO = { color: STAR.sky, ...hs, hops: HOPS.stars, seed: SEED.stars, squash: hs.sq || 0, glow: 1.1 }
    x.save(); x.translate(HOST_B.x, 0); x.scale(sx === 0 ? 0.05 : sx, 1); x.translate(-HOST_B.x, 0)
    const rh = drawStarChar(x, HOST_B.x, HOST_B.y, HOST_B.size, t, hostO)
    const g = starGeom(t, rh, HOST_B.size, hostO)
    const blind = t >= T.blind && t < T.hit + 0.6
    if (blind) drawBlindfold(x, g, { alpha: clamp((t - T.blind) * 6) * (1 - prog(t, T.hit + 0.4, T.hit + 0.6)) })
    else drawGoggles(x, g, t)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const [, seg] = segAt(t)
      x.save()
      x.translate(0, shakeAt(t, T.stamp, 12) + shakeAt(t, T.hit, 6))
      if (seg === 'lab') lab(t)
      else { boardScene(t); x.fillStyle = `rgba(8,4,20,${0.45 * clamp((t - T.stamp + 0.15) * 6) * (1 - prog(t, ...T.h3Out))})`; x.fillRect(0, 480, 1080, 900) }
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

// one card cut kept (cardfx picks the middle of three): between the overflow and BUSTED
const CUTS = [4.56, T.cut, 17.92]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

export const CUES = [
  ['pop', 0.02, 880, 0.05, 0], ['boom', 0.1, 0.1],
  ['pop', T.l1 - 0.22, 987.77, 0.04, 0], ['pop', T.l1 - 0.16, 1318.51, 0.03, 0],
  ...Array.from({ length: 6 }, (_, i) => ['tick', r3(0.4 + i * 0.7), 0.02]),            // the tumbleweed bumping the glass
  // test 1: the board
  ['whoosh', T.board - 0.08, 0.4, 0.05], ['tick', T.board + 0.35, 0.07], ['boom', T.board + 0.35, 0.12],
  ...wordPops(T.h1, 2, 0.08, 2), ['pop', T.h1Land, 1318.51, 0.04, 0], ['pop', T.h1Land + 0.1, 1479.98, 0.035, 0],
  ...NOTES.flatMap((n, i) => [['whoosh', r3(n.at - 0.3), 0.22, 0.022], ['tick', r3(n.at), 0.06], ['pop', r3(n.at), NOTE[i % 7], 0.04, (i % 3 - 1) * 0.4]]),
  // test 2: more
  ...wordPops(T.h2, 2, 0.08, 1), ['pop', T.h2Land, 1318.51, 0.04, 0],
  ['pop', T.lib + 0.15, 1479.98, 0.045, -0.4], ['pluck', T.lib + 0.2, 1975.53, 0.04, 0.4, -0.4],
  ...FLURRY.map((f, i) => ['tick', f.at, 0.03 + (i % 3) * 0.006]), ['swell', T.flurry[0], T.flurry[1], { gain: 0.025 }],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 659.25, 0.03, 0],
  // busted
  ...wordPops(T.h3, 2, 0.08, 0), ['pop', T.h3Land, 1318.51, 0.045, 0],
  ['whoosh', T.stamp - 0.18, 0.2, 0.05], ['boom', T.stamp, 0.5], ['crash', T.stamp, { gain: 0.07 }], ['tick', T.stamp, 0.08],
  ['pop', T.l4 - 0.22, 739.99, 0.04, 0],
  // pick one: blindfold, spin, dart
  ...wordPops(T.h4, 2, 0.08, 2), ['pop', T.h4Land, 1318.51, 0.04, 0], ['pop', T.h4Land + 0.1, 1479.98, 0.035, 0],
  ['pop', T.blind, 392, 0.04, 0.3], ['riser', T.spin[0], T.spin[1], 0.03], ...[0, 1, 2, 3].map(i => ['whoosh', r3(T.spin[0] + i * 0.125), 0.12, 0.02]),
  ['whoosh', T.throw, 0.35, 0.04], ['tick', T.hit, 0.09], ['boom', T.hit, 0.18], ['bell', T.hit + 0.05, 1760, 0.04, 1.4, 0], ['glitter', T.hit, T.hit + 0.6],
  ['crash', T.hit + 0.1, { gain: 0.03 }],
  ...[0, 1, 2].map(i => ['tick', r3(T.deck + i * 0.12), 0.04]), ['bell', T.deck + 0.4, 1318.51, 0.03, 1.2, 0],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 659.25, 0.03, 0],
  // the last line
  ['whoosh', T.end - 0.08, 0.35, 0.04], ...wordPops(T.h5, 2, 0.1, 1, 0.03), ['pop', T.h5Land, 1318.51, 0.045, 0], ['pluck', T.h5Land, 1479.98, 0.04, 0.6, 0],
  ['pluck', T.h5Land + 0.2, 1975.53, 0.03, 0.8, 0.3], ['pluck', T.wink, 1318.51, 0.035, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [SS]: 880, [LB]: 1174.66 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [SS]: 880 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void BONE; void MONO
