// srelements (20 s vertical, Star Talk Remix of "The 4 elements in 15 seconds.") · story 0–15.6, then the shared end card.
//   0.00–2.82  "The 4 elements | in *15 seconds.*"  THE STARS (gold) holds a big stopwatch; box: "four elements.
//              fifteen seconds. go!"  The stopwatch flies to the top-left corner and ticks down (a bit fast: the stars
//              are in a hurry) for the whole film.
//   2.82  FIRE  "Fire: *Go.*"  ♈ ♌ ♐ with flames on their heads launch off screen before the headline is done, then
//              lap the frame once more.
//   5.05  EARTH "Earth: *Build.*"  ♉ ♍ ♑ stand on a brick wall that drops in row by row; a flower blooms on Taurus,
//              and Taurus immediately takes a nap on it.
//   7.27  AIR   "Air: *Talk.*"  ♊ ♎ ♒ talk over each other: speech bubbles pile up in the wind ("aliens??").
//   9.49  WATER "Water: *Feel.*"  ♓ Pisces cries a whole sea; Cancer joins; Scorpio is "fine" (one tear).
//              Box (♓): "sorry. i feel *everything.*"
//  11.71  DING: the stopwatch hits 0. "Which one | are *you?*" The four lead stars in a 2×2 grid jump, then look at
//              you. Box (THE STARS): "psst. your chart has *all four.*" → heart-eyes. Out by 15.5.
// One canvas (sky + stars + props), DOM type + dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, ELEMENT_COLOR, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, MONO, drawBits, drawTears, sparkles, bubble, stopwatch, FLAME, FLAME_C, FLOWER, FLOWER_C, bricks, sea, gusts, pop01, popOut, outK } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const beat = n => +(0.6 + n * 0.5556).toFixed(3)
const CPS = 30

// ── the timeline
const F0 = beat(4), E0 = beat(8), A0 = beat(12), W0 = beat(16), END_T = beat(20)       // 2.822 5.045 7.267 9.49 11.712
const PANELS = [F0, E0, A0, W0]
const T = {
  title: 0.1, titleAcc: 0.55, titleOut: [2.55, 2.76],
  watchIn: 0.3, watchFly: [2.5, 2.95], tickFrom: 0.5,
  l1: 0.72,
  go: F0 + 0.95, lap: F0 + 1.5,
  nap: E0 + 1.45,
  l2: W0 + 0.1,
  l3: END_T + 0.5, hearts: END_T + 2.05,
  out: [15.1, 15.5],
}
const ACC = 0.83                       // the element word lands on the half-bar
const RATE = 15 / (END_T - T.tickFrom) // the stopwatch runs a little fast: 15 → 0 by the DING
const C = { aries: signStar('aries'), leo: signStar('leo'), sag: signStar('sagittarius'), taurus: signStar('taurus'), virgo: signStar('virgo'), cap: signStar('capricorn'), gemini: signStar('gemini'), libra: signStar('libra'), aqua: signStar('aquarius'), cancer: signStar('cancer'), scorpio: signStar('scorpio'), pisces: signStar('pisces') }
const WATER_TXT = '#8fb0ff'

const LINES_A = [{ t: T.l1, speaker: 'THE STARS', text: 'four elements. fifteen seconds. *go!*' }]
const LINES_B = [
  { t: T.l2, speaker: '♓ PISCES STAR', text: 'sorry. i feel *everything.*', color: WATER_TXT },
  { t: T.l3, speaker: 'THE STARS', text: 'psst. your chart has *all four.*' },
]
const TA = lineTimes(LINES_A, { cps: CPS }), TB = lineTimes(LINES_B, { cps: CPS })
const CLOSE_A = +(TA[0].done + 1.55).toFixed(3)
const OPEN_B = W0 + 0.02, CLOSE_B = 15.3
const NARR_HOPS = talkHops(LINES_A, 'THE STARS', { cps: CPS })
const PISCES_HOPS = talkHops(LINES_B, '♓ PISCES STAR', { cps: CPS })

const watchN = t => clamp(Math.ceil(15 - (t - T.tickFrom) * RATE - 1e-6), 0, 15)
const TICKS = Array.from({ length: 15 }, (_, i) => +(T.tickFrom + (i + 1e-3) / RATE).toFixed(3)).filter((v, i) => i > 0)

const ELS = [
  { id: 'fire', head: 'Fire: *Go.*', names: 'Aries, Leo, Sagittarius.', col: ELEMENT_COLOR.fire },
  { id: 'earth', head: 'Earth: *Build.*', names: 'Taurus, Virgo, Capricorn.', col: ELEMENT_COLOR.earth },
  { id: 'air', head: 'Air: *Talk.*', names: 'Gemini, Libra, Aquarius.', col: ELEMENT_COLOR.air },
  { id: 'water', head: 'Water: *Feel.*', names: 'Cancer, Scorpio, Pisces.', col: WATER_TXT },
]
const BUBBLES = [
  { t: A0 + 0.18, x: 300, y: 700, s: 'omg', tail: 1 },
  { t: A0 + 0.42, x: 790, y: 650, s: 'ok so', tail: -1 },
  { t: A0 + 0.66, x: 200, y: 860, s: 'wait', tail: 1 },
  { t: A0 + 0.95, x: 880, y: 830, s: 'lol', tail: -1 },
  { t: A0 + 1.2, x: 470, y: 590, s: 'fun fact', tail: 1 },
  { t: A0 + 1.45, x: 660, y: 770, s: 'anyway', tail: -1 },
  { t: A0 + 1.68, x: 860, y: 960, s: 'aliens??', tail: -1, size: 38 },
]
const BRICK_T = [E0 + 0.12, E0 + 0.32, E0 + 0.52]
const GRID = [
  { k: 'aries', x: 300, y: 790, el: 'FIRE', col: ELEMENT_COLOR.fire },
  { k: 'taurus', x: 780, y: 790, el: 'EARTH', col: ELEMENT_COLOR.earth },
  { k: 'gemini', x: 300, y: 1130, el: 'AIR', col: ELEMENT_COLOR.air },
  { k: 'pisces', x: 780, y: 1130, el: 'WATER', col: WATER_TXT },
]

const panelOut = P => [P + 2.0, P + 2.18]
const inPanel = (t, P) => t >= P - 0.02 && t < P + 2.2

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The 4 elements | in *15 seconds.*', { top: 210, size: 104, accentSize: 140, at: T.title, gap: 0.08, late: 1, lateAt: T.titleAcc, wobble: true })
  const HEADS = [[H0, T.titleOut]]
  ELS.forEach((e, i) => {
    const P = PANELS[i]
    HEADS.push([popText(root, e.head, { top: 200, size: 128, accentSize: 172, at: P + 0.04, late: 1, lateAt: P + ACC, wobble: true, accentColor: e.col }), panelOut(P)])
    HEADS.push([popText(root, e.names, { top: 400, size: 54, at: P + 0.24, gap: 0.1, color: BONE }), panelOut(P)])
  })
  const HF = popText(root, 'Which one | are *you?*', { top: 200, size: 124, accentSize: 172, at: END_T + 0.08, gap: 0.08, late: 1, lateAt: END_T + 0.5, wobble: true })
  HEADS.push([HF, T.out])
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1400, width: 960, height: 300, open: T.l1 - 0.2, close: CLOSE_A, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1400, width: 960, height: 300, open: OPEN_B, close: CLOSE_B, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const star = (cx, cy, size, t, c, o) => drawStarChar(x, cx, cy, size, t, { color: c.color, glyph: size >= 120 ? c.glyph : null, ...o })

  // speed lines behind a moving star
  function streak(cx, cy, k, col) {
    if (k <= 0) return
    x.save(); x.globalAlpha *= k
    for (let i = 0; i < 6; i++) {
      const len = 140 + (i * 53) % 120
      x.fillStyle = i % 2 ? col : BONE
      x.fillRect(Math.round(cx - 150 - len - (i % 3) * 30), Math.round(cy - 90 + i * 34), len, 8)
    }
    x.restore()
  }
  function smoke(cx, cy, t0, t) {
    const d = t - t0
    if (d < 0 || d > 1.2) return
    x.save(); x.globalAlpha *= 1 - d / 1.2
    for (let i = 0; i < 7; i++) {
      const r = 14 + d * 50 + (i % 3) * 10
      x.fillStyle = i % 2 ? 'rgba(239,230,214,0.6)' : 'rgba(170,160,185,0.55)'
      const px = cx - 120 + i * 40 - d * 60, py = cy + 40 - d * 120 - Math.sin(i * 1.7) * 30
      x.fillRect(Math.round(px - r), Math.round(py - r), Math.round(r * 2), Math.round(r * 2))
    }
    x.restore()
  }

  // ── title: THE STARS + the stopwatch
  function drawTitle(t) {
    if (t > T.watchFly[1]) return
    const ok = popOut(t, [T.watchFly[0], T.watchFly[0] + 0.3])
    const pk = pop01(t, 0.2, 0.4) * ok
    const mood = t < 1.3 ? 'wide' : 'happy'
    star(540, 1030, 330, t, { color: STAR.sky }, { mood, look: [0, 0], pop: pk, hops: NARR_HOPS, seed: 2, glow: 1.2 })
  }
  function drawWatch(t) {
    if (t < T.watchIn || t > T.out[1]) return
    const f = ease.inOutCubic(prog(t, ...T.watchFly))
    const cx = lerp(800, 122, f), cy = lerp(840, 150, f) - Math.sin(Math.PI * f) * 80, r = lerp(96, 50, f)
    const n = watchN(t), sweep = (15 - Math.max(0, (t - T.tickFrom) * RATE)) / 15
    const ring = t >= END_T && t < END_T + 1.1 ? 1 - prog(t, END_T + 0.7, END_T + 1.1) : 0
    const pk = pop01(t, T.watchIn, 0.35) * popOut(t, T.out)
    // in the finale it grows a little for the DING
    const big = t >= END_T ? 1 + 0.5 * Math.exp(-(t - END_T) * 5) : 1
    stopwatch(x, cx, cy, r * pk * big, n, Math.max(0, sweep), { ring, t })
  }

  // ── FIRE
  function drawFire(t) {
    const P = F0
    if (!inPanel(t, P)) return
    const ok = outK(t, panelOut(P))
    const trio = [[C.aries, 540, 1020, 320, 0], [C.leo, 250, 1140, 180, 1], [C.sag, 830, 1140, 180, 2]]
    trio.forEach(([c, sx, sy, size, i]) => {
      const L = T.go + i * 0.07
      const away = ease.inCubic(prog(t, L, L + 0.42))
      const lp = prog(t, T.lap + i * 0.07, T.lap + 0.42 + i * 0.07)
      let cx = sx + away * 1300, mood = 'squint', sq = 0
      if (t >= T.lap + i * 0.07 && lp < 1) { cx = lerp(-260, 1340, ease.inOutQuad(lp)); mood = 'happy'; sq = -0.12 }
      else if (lp >= 1) return
      if (away >= 1 && lp <= 0) { smoke(sx, sy, L, t); return }
      smoke(sx, sy, L, t)
      const pk = pop01(t, P + i * 0.08, 0.3)
      const shake = t < L ? Math.sin(t * 60 + i) * 3 * prog(t, P + 0.4, L) : 0
      const r = star(cx + shake, sy, size, t, c, { mood, look: [1, 0], pop: pk * ok, squash: sq + (t > L - 0.25 && t < L ? 0.12 : 0) - (away > 0 ? 0.1 : 0), blink: false, seed: 3 + i, glow: 1.2 })
      // a flame on top (flips to flicker, roars on GO)
      const roar = 1 + 0.5 * Math.exp(-Math.max(0, t - (P + ACC)) * 4) * (t > P + ACC ? 1 : 0)
      const cell = Math.round(size / 30) * roar
      drawBits(x, FLAME, FLAME_C, Math.round(cx + shake), Math.round(r.top - cell * 4), cell, { flip: Math.floor(t * 9 + i) % 2 === 1, alpha: pk * ok })
      streak(cx, sy, (away > 0.05 && away < 1) || (lp > 0 && lp < 1) ? 1 : 0, ELEMENT_COLOR.fire)
    })
  }

  // ── EARTH
  function drawEarth(t) {
    const P = E0
    if (!inPanel(t, P)) return
    const ok = outK(t, panelOut(P))
    x.save(); x.globalAlpha *= ok
    bricks(x, 540, 1340, 13, BRICK_T.map(b => prog(t, b, b + 0.34)), { bw: 66, bh: 34 })
    x.restore()
    const top = 1340 - 3 * 34
    const sleepy = t > T.nap
    const trio = [[C.taurus, 540, top - 132, 300, 0], [C.virgo, 230, top - 76, 170, 1], [C.cap, 850, top - 76, 170, 2]]
    trio.forEach(([c, sx, sy, size, i]) => {
      const pk = pop01(t, P + 0.02 + i * 0.08, 0.3) * ok
      let mood = 'neutral', look = [0, 0]
      if (i === 0) mood = t < P + ACC ? 'happy' : t < P + 1.3 ? 'heart' : sleepy ? 'sleepy' : 'happy'
      if (i === 1) { mood = t < P + ACC ? 'squint' : 'happy'; look = t < P + ACC ? [0, 1] : [1, 0] }   // Virgo inspects the wall
      if (i === 2) { mood = t < P + 1.1 ? 'neutral' : 'wink'; look = [-1, 0] }
      const land = BRICK_T.map(b => b + 0.34)
      let sq = 0
      for (const L of land) if (t > L && t < L + 0.4) sq += 0.07 * Math.exp(-(t - L) * 9) * Math.cos((t - L) * 24)
      if (i === 0 && sleepy) sq += 0.1 * prog(t, T.nap, T.nap + 0.3)
      const r = star(sx, sy, size, t, c, { mood, look, pop: pk, squash: sq, seed: 6 + i, bob: i === 0 && sleepy ? 2 : undefined })
      if (i === 0) {
        // the flower: sprout on "Build.", blooms
        const g = prog(t, P + ACC, P + ACC + 0.4)
        if (g > 0) {
          const cell = 13 * (0.4 + 0.6 * easeOutBack(g, 2.4))
          drawBits(x, FLOWER, FLOWER_C, Math.round(sx), Math.round(r.top - cell * 3), cell, { alpha: ok })
          sparkles(x, t, sx, r.top - 40, P + ACC + 0.1, { n: 8, R: 120, seed: 2, size: 20 })
        }
      }
    })
  }

  // ── AIR
  function drawAir(t) {
    const P = A0
    if (!inPanel(t, P)) return
    const ok = outK(t, panelOut(P))
    x.save(); x.globalAlpha *= ok
    gusts(x, t, 980, 1300, prog(t, P, P + 0.4) * (1 + 0.5 * (t > P + ACC ? 1 : 0)))
    x.restore()
    const trio = [[C.gemini, 540, 1060, 300, 0], [C.libra, 230, 1160, 170, 1], [C.aqua, 850, 1160, 170, 2]]
    trio.forEach(([c, sx, sy, size, i]) => {
      const pk = pop01(t, P + i * 0.08, 0.3) * ok
      const hops = Array.from({ length: 8 }, (_, k) => P + 0.15 + i * 0.11 + k * 0.24)
      const mood = i === 2 && t > P + 1.6 ? 'wide' : t > P + ACC ? 'happy' : 'wide'
      const look = i === 0 ? [0, -1] : i === 1 ? [1, -1] : (t > P + 1.6 ? [1, 0] : [-1, -1])
      star(sx, sy, size, t, c, { mood, look, pop: pk, hops, seed: 9 + i })
    })
    BUBBLES.forEach((b, i) => {
      const k = easeOutBack(prog(t, b.t, b.t + 0.26), 2.6) * ok
      bubble(x, b.x + Math.sin(t * 3 + i) * 6, b.y + Math.cos(t * 2.5 + i) * 5, b.s, k, { tail: b.tail, size: b.size || 44 })
    })
  }

  // ── WATER
  function drawWater(t) {
    const P = W0
    if (!inPanel(t, P)) return
    const ok = outK(t, panelOut(P))
    const level = lerp(1440, 1250, ease.outCubic(prog(t, P + 0.2, P + 1.2)))
    const surge = 90 * Math.exp(-Math.max(0, t - (P + ACC)) * 3) * (t > P + ACC ? Math.sin(Math.min(Math.PI, (t - P - ACC) * 6)) : 0)
    const trio = [[C.pisces, 540, 1000, 300, 0], [C.cancer, 230, 1100, 170, 1], [C.scorpio, 850, 1100, 170, 2]]
    trio.forEach(([c, sx, sy, size, i]) => {
      const pk = pop01(t, P + i * 0.08, 0.3) * ok
      const mood = i === 2 ? (t < P + 1.35 ? 'squint' : 'wide') : 'sparkle'
      const r = star(sx, sy, size, t, c, { mood, look: i === 2 ? [-1, 0] : [0, 0], pop: pk, hops: i === 0 ? PISCES_HOPS : null, seed: 12 + i })
      if (i === 0) drawTears(x, t, r, { amount: pk * clamp((t - P) * 3), seed: 1, fountain: true })
      if (i === 1) drawTears(x, t, r, { amount: pk * clamp((t - P - 0.3) * 3), seed: 4, fountain: false })
      if (i === 2 && t > P + 1.35) drawTears(x, t, r, { amount: pk * 0.8, seed: 7, fountain: false })
    })
    sea(x, t, 0, 1080, level, 1920, { amp: 14, alpha: ok, surge })
  }

  // ── FINALE: 2×2, the DING, "your chart has all four"
  function drawFinale(t) {
    if (t < END_T - 0.02 || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const heart = t > T.hearts
    const l3done = TB[1].done
    GRID.forEach((g, i) => {
      const pk = pop01(t, END_T + 0.05 + i * 0.08, 0.32) * ok
      const c = C[g.k]
      let mood = 'wide', look = [0, 0]
      if (t > END_T + 0.7) mood = ['squint', 'happy', 'happy', 'sparkle'][i]
      if (t > T.l3 && t < l3done + 0.2) { mood = 'wide'; look = [i % 2 ? -1 : 1, i < 2 ? 1 : -1] }    // "all four?" they look at each other
      if (heart) { mood = 'heart'; look = [0, 0] }
      const hops = [END_T + 0.06 + i * 0.04, ...(heart ? [T.hearts + i * 0.06] : [])]
      const r = star(g.x, g.y, 220, t, c, { mood, look, pop: pk, hops, seed: 20 + i, glow: 1.15 })
      if (g.k === 'pisces') drawTears(x, t, r, { amount: pk * (heart ? 1 : 0.6), seed: 3, fountain: heart })
      // element label
      x.save(); x.globalAlpha *= pk
      x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 8; x.strokeStyle = 'rgba(8,5,20,0.9)'; x.strokeText(g.el, g.x, g.y + 142)
      x.fillStyle = g.col; x.fillText(g.el, g.x, g.y + 142)
      x.restore()
    })
    if (heart) sparkles(x, t, 540, 960, T.hearts, { n: 14, R: 360, seed: 4 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const ding = t >= END_T && t < END_T + 0.3 ? Math.sin(t * 80) * 4 * (1 - prog(t, END_T, END_T + 0.3)) : 0
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : { ...SKY_H, dx: ding })
      drawTitle(t)
      drawFire(t); drawEarth(t); drawAir(t); drawWater(t)
      drawFinale(t)
      drawWatch(t)
      boxA.update(t); boxB.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: the DING → "Which one are you?" (the one cut a 20 s film keeps). End card flips at 15.6.
const CUTS = [{ t: +(END_T - 0.07).toFixed(3), kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // title + the stopwatch
  ...wordPops(T.title, 4, 0.08, 0), ['pop', T.titleAcc, 1174.66, 0.045, 0], ['pluck', T.titleAcc, 880, 0.035, 0.5, 0],
  ['pop', T.watchIn, 987.77, 0.035, 0.3], ['bell', T.watchIn + 0.03, 1318.51, 0.02, 0.8, 0.3],
  ...TICKS.map(t => ['tick', t, 0.03]),
  ...talkCues(LINES_A, { cps: CPS }), ...talkCues(LINES_B, { cps: CPS }),
  ['whoosh', T.watchFly[0], 0.4, 0.03],
  // the four panels: headline pops + the accent word
  ...PANELS.flatMap((P, i) => [['pop', P + 0.04, NOTE[i], 0.035, 0], ...wordPops(P + 0.24, 3, 0.1, i + 1, 0.018), ['pop', P + ACC, 1174.66, 0.05, 0], ['pluck', P + ACC, [880, 659.25, 987.77, 739.99][i], 0.04, 0.6, 0]]),
  // fire: launch + lap
  ['boom', T.go, 0.11], ['whoosh', T.go, 0.45, 0.06], ['whoosh', T.lap, 0.5, 0.05],
  // earth: bricks + bloom + nap
  ...BRICK_T.map(b => ['tom', +(b + 0.3).toFixed(3), 98, { gain: 0.2 }]),
  ['glitter', E0 + ACC + 0.1, E0 + ACC + 0.55], ['bell', E0 + ACC + 0.12, 1318.51, 0.025, 1.2, 0],
  ['pluck', T.nap, 440, 0.03, 0.8, 0], ['pluck', T.nap + 0.25, 329.63, 0.025, 0.9, 0],
  // air: the bubbles
  ...BUBBLES.map((b, i) => ['pop', +b.t.toFixed(3), NOTE[(i * 3) % 7], 0.04, b.x > 540 ? 0.3 : -0.3]),
  // water: the sea rises + the surge
  ['swell', W0 + 0.2, W0 + 1.2, { gain: 0.035 }], ['whoosh', W0 + ACC, 0.6, 0.05],
  ['pop', W0 + 1.35, 1318.51, 0.03, 0.4],
  // DING
  ['bell', END_T, 1760, 0.05, 1.8, 0], ['bell', END_T + 0.1, 1760, 0.04, 1.4, 0], ['bell', END_T + 0.2, 1760, 0.03, 1.2, 0], ['crash', END_T, { gain: 0.05 }],
  ...wordPops(END_T + 0.08, 3, 0.08, 2), ['pop', END_T + 0.5, 1318.51, 0.05, 0], ['pluck', END_T + 0.5, 1174.66, 0.04, 0.7, 0],
  ['glitter', T.hearts, T.hearts + 0.5], ['bell', T.hearts + 0.05, 1318.51, 0.025, 1.3, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
