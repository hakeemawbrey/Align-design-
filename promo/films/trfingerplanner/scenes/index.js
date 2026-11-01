// trfingerplanner: PUT A FINGER DOWN, planner edition (30 s vertical, Star Talk Trends §8, music: house · D)
// Story 0–25.6, then the shared end card. The format look lives in ./finger.js (identical in all five trfinger* films).
//   0.0–2.7    "Put a finger down: | *planner* edition."  ♑ Capricorn pops in, the ten fingers fan up. Counter: 10.
//              Pisces plays along on tiny hands, bottom right.
//   2.8        the sticker "put a finger down if…" slaps on (the drop).
//   2.9–5.1    "…you made a backup plan | for your *backup plan.*"  A clipboard: PLAN A ✓ · PLAN B ✓ · PLAN B (2) ✓.
//   5.2–7.4    "…you read the menu | *before* the date."  A menu; one dish gets circled, twice. Finger.
//   7.45–9.6   "…you timed the walk | from the *parking spot.*"  A stopwatch: 4:12, then 4:12 again. Finger.
//   9.7–13.4   "…you brought *talking points* | on index cards."  Three cards fan out: hobbies? · pets? · soup opinions?
//              Finger. THE STARS (off-screen): "and they’re *color-coded.*"
//  13.6        card cut.
//  13.75–15.5 "…you packed an umbrella | for a *sunny* day."  A pixel umbrella under a big sun. Finger.
//  15.6–18.0  "…your favorite part | was the *unplanned* bit."  The music drops out. A memory bubble: "the wrong turn :)".
//              Capricorn melts into a smile and the last five fingers fold softly (17.27). Counter: 0.
//  18.0–22.4  The hands drop away. THE STARS pop in: "plans are how you show *care.*" → "just leave room for the
//              *wrong turn.*" Pisces fountains.
//  22.5–25.5  "Plan: *have fun.*"  The clipboard returns: every line struck out, a new one writes on: HAVE FUN ✓.
// One canvas (sky + props + stars + hands), DOM type + sticker + counter + box + bug, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, PINK, HOT, MINT, MONO, INTER, BEAT, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  fingerState, drawHands, buildBug, buildSticker, buildCounter, buildProgress, drawBubble, fingerCues,
} from './finger.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const CAP = signStar('capricorn'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.12, h0Land: 0.62, h0Out: [2.55, 2.75],
  heroIn: 0.25, handsIn: [0.5, 0.9], fanUp: 0.95, countIn: 1.75, pisIn: 1.2,
  sticker: BEAT(4), stickerOut: [17.85, 18.05],
  p1: 2.9, p1Out: [4.95, 5.1], clip: 3.05,
  p2: 5.2, p2Out: [7.2, 7.35], menu: 5.35, circ: [5.9, 6.3],
  p3: 7.45, p3Out: [9.45, 9.6], watch: [7.6, 8.4], watch2: [8.5, 9.3],
  p4: 9.7, p4Out: [13.2, 13.4], cards: [9.9, 10.15, 10.4],
  cut: 13.6,
  p5: 13.75, p5Out: [15.35, 15.5], umb: 13.9,
  p6: BEAT(27), p6Out: [17.85, 18.05], memory: 16.25, allDown: BEAT(30),
  handsOut: [18.0, 18.4], narIn: 18.1,
  h7: 22.5, h7Land: 22.9, clipBack: [22.4, 22.8], write: [23.0, 23.7],
  countOut: [22.0, 22.3],
  out: [25.1, 25.5], h7Out: [25.15, 25.45], bugOut: [25.3, 25.55],
}
// fingers 0–4 left hand pinky → thumb, 5–9 right hand thumb → pinky. Each starts folded (−1) and fans up in the intro.
const DOWNS = [[BEAT(7)], [BEAT(11)], [BEAT(15)], [BEAT(18)], [BEAT(26)], ...[0, 1, 2, 3, 4].map(k => [T.allDown + k * 0.14])]
const F = fingerState(DOWNS.map((d, i) => [-1, T.fanUp + i * 0.08, ...d]))

const SPEAK = 'THE STARS'
const LINES = [
  { t: 11.3, speaker: SPEAK, text: 'and they’re *color-coded.*' },
  { t: 18.45, speaker: SPEAK, text: 'plans are how you show *care.*' },
  { t: 21.25, speaker: SPEAK, text: 'just leave room for the *wrong turn.*' },
]
const CPS = 30
const BOX1 = { open: 11.1, close: 13.5 }, BOX2 = { open: 18.25, close: 24.2 }

// layout
const HERO = { x: 540, y: 960, s: 300 }, HERO_B = { x: 410, y: 960, s: 280 }, NAR = { x: 700, y: 960, s: 260 }
const HANDS = { lx: 190, rx: 890, y: 900, cell: 13 }
const PIS_AT = { x: 890, y: 1780, s: 140 }

const NAR_HOPS = [T.narIn + 0.3, ...talkHops(LINES.slice(1), SPEAK, { cps: CPS })]
const HERO_HOPS = [T.heroIn + 0.35, T.countIn + 0.05, ...F.downs.filter(v => v < T.allDown), T.memory + 0.1, T.write[1] + 0.05, T.write[1] + 0.5]

const UMB = ['....RRRR....', '..RRWWRRWW..', '.RRWWRRWWRR.', 'RRWWRRWWRRWW', '.....HH.....', '.....HH.....', '.....HH.....', '.....HH..HH.', '......HHHH..']
const SUN = ['...Y..Y...', 'Y..YYYY..Y', '..YOOOOY..', '.YOOOOOOY.', 'YYOOOOOOYY', 'YYOOOOOOYY', '.YOOOOOOY.', '..YOOOOY..', 'Y..YYYY..Y', '...Y..Y...']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 46px Inter", "800 28px Inter", "700 34px Inter", "italic 500 150px 'EB Garamond'", "700 120px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const PT = { top: 262, size: 84, accentSize: 112, gap: 0.08, fit: true }
  const H0 = popText(root, 'Put a finger down: | *planner* edition.', { top: 190, size: 92, accentSize: 128, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: CAP.color })
  const P1 = popText(root, '…you made a backup plan | for your *backup plan.*', { ...PT, at: T.p1, accentColor: GOLD })
  const P2 = popText(root, '…you read the menu | *before* the date.', { ...PT, at: T.p2, accentColor: '#7fd0ff' })
  const P3 = popText(root, '…you timed the walk | from the *parking spot.*', { ...PT, at: T.p3, accentColor: HOT })
  const P4 = popText(root, '…you brought *talking points* | on index cards.', { ...PT, at: T.p4, accentColor: '#c9a6ff' })
  const P5 = popText(root, '…you packed an umbrella | for a *sunny* day.', { ...PT, at: T.p5, accentColor: '#ffe27a' })
  const P6 = popText(root, '…your favorite part | was the *unplanned* bit.', { ...PT, at: T.p6, late: 2, lateAt: T.p6 + 0.5, wobble: true, accentColor: MINT })
  const H7 = popText(root, 'Plan: | *have fun.*', { top: 170, size: 110, accentSize: 170, at: T.h7, late: 2, lateAt: T.h7Land, wobble: true, accentColor: CAP.color })
  const HEADS = [[H0, T.h0Out], [P1, T.p1Out], [P2, T.p2Out], [P3, T.p3Out], [P4, T.p4Out], [P5, T.p5Out], [P6, T.p6Out], [H7, T.h7Out]]
  const sticker = buildSticker(root, { at: T.sticker })
  const counter = buildCounter(root, { top: 1170 })
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const bar = buildProgress(root, { end: STORY_END })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── pieces
  function pisces(t) {
    const k = pop01(t, T.pisIn, 0.35, 2) * popOut(t, T.out)
    if (k <= 0.01) return
    const tears = t > T.memory ? 3 : t > BEAT(15) ? 2 : 1
    const opts = { color: PIS.color, mood: t > T.memory ? 'happy' : 'sparkle', look: [-1, -1], seed: 6, glow: 0.8, pop: k, hops: [T.allDown + 0.05, T.write[1]] }
    drawStarChar(x, PIS_AT.x, PIS_AT.y, PIS_AT.s, t, opts)
    inSprite(x, starFrame(PIS_AT.x, PIS_AT.y, PIS_AT.s, t, opts), () => tearsCells(x, t, tears))
    drawHands(x, t, F, { lx: PIS_AT.x - 118, rx: PIS_AT.x + 118, y: PIS_AT.y - 22, cell: 6, color: PIS.color, pop: k * outK(t, T.handsOut), sway: 0.4 })
  }

  function heroPose(t) {
    const mv = ease.inOutCubic(prog(t, T.handsOut[0], T.narIn + 0.3))
    return { x: lerp(HERO.x, HERO_B.x, mv), y: HERO.y, s: lerp(HERO.s, HERO_B.s, mv) }
  }
  function hero(t) {
    const k = pop01(t, T.heroIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.01) return
    const P = heroPose(t)
    let mood = 'neutral', look = [0, 0], blink, squash = 0
    if (t < T.p1) mood = 'squint'
    else if (t < T.p2) { mood = t > BEAT(7) ? 'happy' : 'neutral'; look = [0, -1] }
    else if (t < T.p3) { mood = 'squint'; look = [0, -1] }
    else if (t < T.p4) { mood = t < T.watch2[0] ? 'neutral' : 'wide'; look = [-1, -1] }
    else if (t < T.p5) { mood = t > LINES[0].t ? 'wink' : 'happy'; look = [0, -1] }
    else if (t < T.p6) { mood = 'neutral'; look = [1, -1] }
    else if (t < T.memory) { mood = 'wide'; look = [0, 0]; blink = false }
    else if (t < T.handsOut[0]) { mood = 'sparkle'; look = [0.5, -1]; squash = 0.1 * ease.outCubic(prog(t, T.memory, T.memory + 0.6)) }
    else if (t < T.write[1]) { mood = 'happy'; look = undefined }
    else { mood = 'heart'; look = undefined }
    drawStarChar(x, P.x, P.y, P.s, t, { color: CAP.color, glyph: CAP.glyph, mood, look, blink, hops: HERO_HOPS, pop: k, seed: 3, glow: 1.1, squash })
  }
  function narrator(t) {
    if (t < T.narIn) return
    const k = pop01(t, T.narIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.01) return
    const sl = ease.outCubic(prog(t, T.narIn, T.narIn + 0.45))
    drawStarChar(x, lerp(1200, NAR.x, sl), NAR.y, NAR.s, t, { color: STAR.sky, mood: t > T.write[1] ? 'sparkle' : 'happy', look: [-1, t > T.clipBack[0] ? -1 : 0], hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05 })
  }

  // a clipboard with checklist lines: [{ text, at, check, strike }]
  function clipboard(cx, cy, k, rot, lines, t, { title = 'THE PLAN' } = {}) {
    const w = 400, h = 330
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#a8703c'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#fff8e6'; x.fillRect(-w / 2 + 20, -h / 2 + 34, w - 40, h - 54)
    x.fillStyle = INK; x.fillRect(-70, -h / 2 - 16, 140, 40); x.fillStyle = '#c9c9d6'; x.fillRect(-62, -h / 2 - 10, 124, 28)
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText(title, -w / 2 + 38, -h / 2 + 62)
    lines.forEach((L, i) => {
      if (t < L.at) return
      const yy = -h / 2 + 116 + i * 58
      const kk = pop01(t, L.at, 0.22, 2.2)
      x.save(); x.translate(-w / 2 + 38, yy); x.scale(kk, kk)
      x.font = `800 ${L.size || 36}px ${INTER}`; x.fillStyle = L.color || INK; x.fillText(L.text, 0, 0)
      const tw = x.measureText(L.text).width
      if (L.check && t > L.check) { x.fillStyle = '#2f9e5a'; x.fillText('✓', tw + 14, 0) }
      if (L.strike && t > L.strike) { x.fillStyle = HOT; x.fillRect(-6, -3, (tw + 12) * prog(t, L.strike, L.strike + 0.15), 6) }
      x.restore()
    })
    x.restore()
  }

  function prop1(t) {
    const o = [T.p1Out[0] - 0.1, T.p1Out[1]]
    const k = pop01(t, T.clip, 0.32, 2) * popOut(t, o)
    if (k <= 0.01) return
    clipboard(540, 650, k, -0.03, [
      { text: 'PLAN A', at: T.clip + 0.25, check: T.clip + 0.45 },
      { text: 'PLAN B', at: T.clip + 0.6, check: T.clip + 0.8 },
      { text: 'PLAN B (2)', at: T.clip + 0.95, check: T.clip + 1.15, color: HOT },
    ], t)
  }
  function prop2(t) {
    const o = [T.p2Out[0] - 0.1, T.p2Out[1]]
    const k = pop01(t, T.menu, 0.32, 2) * popOut(t, o)
    if (k <= 0.01) return
    const w = 380, h = 330
    x.save(); x.translate(540, 650); x.rotate(0.03); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#1f3b2e'; x.fillRect(-w / 2, -h / 2, w, h)
    x.strokeStyle = GOLD; x.lineWidth = 3; x.strokeRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
    x.fillStyle = GOLD; x.font = `italic 500 44px 'EB Garamond', Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('Menu', 0, -h / 2 + 52)
    x.font = `700 30px ${INTER}`; x.fillStyle = BONE
    ;['soup of the day', 'pasta, big', 'pie, shared'].forEach((s, i) => x.fillText(s, 0, -h / 2 + 128 + i * 64))
    for (let r = 0; r < 2; r++) {
      const p = ease.outCubic(prog(t, T.circ[r], T.circ[r] + 0.3))
      if (p <= 0) continue
      x.strokeStyle = HOT; x.lineWidth = 6; x.beginPath(); x.ellipse(0, -h / 2 + 192, 140 + r * 10, 34 + r * 6, r * 0.06, 0, Math.PI * 2 * p); x.stroke()
    }
    x.restore()
  }
  function prop3(t) {
    const o = [T.p3Out[0] - 0.1, T.p3Out[1]]
    const k = pop01(t, T.watch[0] - 0.1, 0.3, 2.2) * popOut(t, o)
    if (k <= 0.01) return
    const run = (a, b) => Math.round(252 * ease.outCubic(prog(t, a, b)))
    const s = t < T.watch2[0] ? run(...T.watch) : run(...T.watch2)
    x.save(); x.translate(540, 660); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-26, -150, 52, 36); x.fillStyle = '#c9c9d6'; x.fillRect(-18, -144, 36, 24)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 128, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#c9c9d6'; x.beginPath(); x.arc(0, 0, 116, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#120c2a'; x.fillRect(-92, -40, 184, 80)
    x.fillStyle = MINT; x.font = `700 56px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, 0, 3)
    x.restore()
    if (t > T.watch2[1]) drawBubble(x, t, { cx: 790, cy: 560, text: 'consistent.', at: T.watch2[1], out: o, side: 'L', size: 36, weight: 800 })
  }
  function prop4(t) {
    const o = [T.p4Out[0] - 0.1, T.p4Out[1]]
    const cards = [['1. hobbies?', '#ffe27a'], ['2. pets?', '#9fe6b0'], ['3. soup opinions?', '#ffb3c9']]
    cards.forEach(([s, c], i) => {
      const k = pop01(t, T.cards[i], 0.3, 2.3) * popOut(t, o)
      if (k <= 0.01) return
      const rot = (i - 1) * 0.08, cx = 540 + (i - 1) * 290, cy = 650 + Math.abs(i - 1) * 24
      x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-140, -96, 280, 192)
      x.fillStyle = c; x.fillRect(-134, -90, 268, 180)
      x.fillStyle = 'rgba(27,18,54,0.25)'; for (let j = 0; j < 3; j++) x.fillRect(-120, -20 + j * 36, 240, 3)
      x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, -50)
      x.restore()
    })
  }
  function prop5(t) {
    const o = [T.p5Out[0] - 0.1, T.p5Out[1]]
    const k = pop01(t, T.umb, 0.32, 2.2) * popOut(t, o)
    if (k <= 0.01) return
    drawBits(x, SUN, { Y: '#ffd23a', O: '#ffb02e' }, 760 + Math.sin(t * 2) * 6, 560, 14 * k, { rot: t * 0.4 })
    drawBits(x, UMB, { R: '#e2475e', W: BONE, H: '#8a5a2e' }, 420, 650, 18 * pop01(t, T.umb + 0.2, 0.32, 2.4) * popOut(t, o))
  }
  function memory(t) {
    drawBubble(x, t, { cx: 540, cy: 620, text: 'the wrong turn :)', at: T.memory, out: [T.p6Out[0] - 0.1, T.p6Out[1]], side: 'T', size: 52, weight: 800, col: '#e7dcff' })
    if (t > T.memory && t < T.memory + 0.8) sparkles(x, t, 540, 620, T.memory, 10, 240, 1, [MINT, BONE, GOLD])
  }
  function finalClip(t) {
    if (t < T.clipBack[0]) return
    const k = easeOutBack(prog(t, ...T.clipBack), 1.4) * popOut(t, T.out)
    if (k <= 0.01) return
    const wr = T.write
    clipboard(555, 690, k * 0.85, 0.04, [
      { text: 'PLAN A', at: 0, strike: wr[0] - 0.4, size: 30 },
      { text: 'PLAN B (2)', at: 0, strike: wr[0] - 0.25, size: 30 },
      { text: 'HAVE FUN', at: wr[0], check: wr[1], color: '#2f9e5a' },
    ], t)
    sparkles(x, t, 555, 690, wr[1], 12, 230, 1, [MINT, GOLD, BONE])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 2.5))
      const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        pisces(t)
        prop1(t); prop2(t); prop3(t); prop4(t); prop5(t); memory(t)
        hero(t)
        narrator(t)
        finalClip(t)
        const hk = pop01(t, T.handsIn[0], T.handsIn[1] - T.handsIn[0], 1.8)
        const ho = ease.inCubic(prog(t, ...T.handsOut))
        drawHands(x, t, F, { ...HANDS, y: HANDS.y + (1 - clamp(hk)) * 500 + ho * 700, color: CAP.color, pop: clamp(hk, 0, 1.2), alpha: 1 - ho })
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      sticker.update(t, outK(t, T.stickerOut))
      counter.update(t, F, pop01(t, T.countIn, 0.3, 2.2) * outK(t, T.countOut), { at: T.countIn })
      box1.update(t); box2.update(t)
      bug.update(t, outK(t, T.bugOut))
      bar.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.6, between the index cards and the umbrella)
const CUTS = [9.62, { t: T.cut, kind: 'flip' }, 17.98]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // cold open
  ...wordPops(T.h0, 4, 0.07, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
  ['pop', T.heroIn + 0.05, 739.99, 0.04, 0], ['whoosh', T.handsIn[0], 0.4, 0.04], ['pop', T.countIn, 1318.51, 0.04, 0],
  ['pop', T.pisIn + 0.05, 987.77, 0.025, 0.5],
  ['tick', T.sticker, 0.08], ['pop', T.sticker + 0.02, 659.25, 0.05, 0], ['whoosh', T.sticker - 0.12, 0.25, 0.03],
  // prompts
  ...wordPops(T.p1, 6, 0.08, 1), ['pop', T.clip, 739.99, 0.04, 0], ...[0.45, 0.8, 1.15].map((d, i) => ['pluck', +(T.clip + d).toFixed(3), [1174.66, 1318.51, 1567.98][i], 0.035, 0.4, 0.2]),
  ...wordPops(T.p2, 5, 0.08, 2), ['pop', T.menu, 659.25, 0.04, 0], ['whoosh', T.circ[0], 0.25, 0.025], ['whoosh', T.circ[1], 0.25, 0.025],
  ...wordPops(T.p3, 6, 0.08, 3), ['tick', T.watch[0], 0.06], ['bell', T.watch[1], 1760, 0.025, 0.6, 0], ['tick', T.watch2[0], 0.06], ['bell', T.watch2[1], 1760, 0.025, 0.6, 0], ['pop', T.watch2[1] + 0.05, 880, 0.035, 0.3],
  ...wordPops(T.p4, 6, 0.08, 4), ...T.cards.map((v, i) => ['pop', v, NOTE[i * 2 + 1], 0.04, (i - 1) * 0.3]),
  ...wordPops(T.p5, 6, 0.08, 0), ['pop', T.umb, 1174.66, 0.04, 0.3], ['pop', T.umb + 0.2, 739.99, 0.04, -0.3],
  // the unplanned bit: silence, a memory, a soft fold
  ...wordPops(T.p6, 4, 0.08, 1), ['pop', T.p6 + 0.5, 1174.66, 0.045, 0], ['pop', T.p6 + 0.6, 1567.98, 0.04, 0],
  ['pluck', T.memory, 1174.66, 0.04, 0.6, 0], ['pluck', T.memory + 0.15, 1567.98, 0.035, 0.7, 0], ['glitter', T.memory, T.memory + 0.5],
  ['bell', T.allDown, 1174.66, 0.03, 1.4, 0],
  // THE STARS
  ['whoosh', T.handsOut[0], 0.4, 0.035], ['whoosh', T.narIn, 0.35, 0.035], ['pop', T.narIn + 0.3, 880, 0.04, 0.3],
  ...talkCues(LINES, { cps: CPS }),
  // "Plan: have fun."
  ['whoosh', T.clipBack[0], 0.35, 0.035], ['whoosh', T.write[0] - 0.4, 0.15, 0.025], ['whoosh', T.write[0] - 0.25, 0.15, 0.025],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.write[0] + i * 0.1).toFixed(3), 0.02]),
  ['pop', T.h7Land, 1174.66, 0.045, 0], ['pop', T.h7Land + 0.1, 1567.98, 0.04, 0],
  ['pluck', T.write[1], 1567.98, 0.04, 0.6, 0], ['bell', T.write[1] + 0.05, 2349.32, 0.025, 1.0, 0], ['glitter', T.write[1], T.write[1] + 0.45],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...fingerCues(F),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
