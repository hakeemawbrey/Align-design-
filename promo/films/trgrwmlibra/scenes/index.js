// trgrwmlibra: GET READY WITH ME, Libra: "Balanced. *Finally*." (30 s vertical, Star Talk Trends §4, music: pop · Bb)
// Story 0–25.6, then the shared end card. The format look lives in ./grwm.js (identical in all five GRWM films).
//   0.0–6.9    "Outfit check. | *Easy.*"  6:30 PM. ♎ Libra pops in front of the ring light: "ok chat. one outfit. two
//              minutes." Two IDENTICAL pink tees swing in on hangers (on the drop), tagged A and B; Libra's little pixel
//              scales tip toward whichever one it looks at. "A says fun. B says… fun but serious."
//   7.0–13.7   "35 minutes | *later…*"  7:05. The tees swap sides, faster and faster (the tags give it away), the spiral
//              of ?!… starts orbiting, a sticker: "pros & cons list: page 4". "chat, vote. wait, don't. ok vote."
//  13.9        card cut.
//  14.0–20.2   "Same shirt. | *New crisis.*"  7:40. THE STARS pop up from the table: "sweetie. those are the same
//              shirt." Libra, sparkly: "ok, but what about this one?"… and a THIRD identical tee drops in (tag C).
//              Pisces (outside the window, crying all film) goes full fountain. 7:52.
//  20.2–22.3   the turn: the phone buzzes; the date's text drops in: "can't wait to see you. wear whatever feels like
//              you :)". The spiral freezes and falls. Libra: heart eyes.
//  22.3–25.5   "Balanced. | *Finally.*"  A and B fly off, C lands on Libra; the scales settle dead level (ding).
// One canvas (room + props + stars), DOM type + dialogue box + bug + clock, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, PINK, INK, MONO, FONTS, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  buildBug, buildClock, drawRoom, drawTable, drawNotif, drawSticker, drawSpiral, drawShirt, WIN,
} from './grwm.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const LIB = signStar('libra'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35, clock: 0.5,
  h0: 0.15, h0Land: 0.75, h0Out: [6.7, 6.9],
  libIn: 0.3, shirtsIn: [2.82, 3.3], tagA: 3.45, tagB: 3.65,
  h1: 7.0, h1Out: [13.45, 13.65], spiral: 7.4,
  swaps: [7.75, 8.55, 9.2, 10.95, 11.45, 11.9, 12.3, 12.65], pros: 8.7, prosOut: [13.3, 13.55],
  cut: 13.9,
  h2: 14.0, h2Out: [20.05, 20.25],
  close: [14.0, 14.45], starsIn: 14.3, starsOut: [20.0, 20.3], same: 15.3, third: 18.05, spot: 16.3, spotOut: [17.3, 17.55],
  buzz: [20.25, 20.55], notif: 20.6, notifOut: [22.3, 22.6], stop: 20.7, heart: 21.45,
  pick: [22.35, 22.85], h3: 22.45, h3Land: 23.05, level: 23.05,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const LSP = `${LIB.glyph}︎ LIBRA`, SPEAK = 'THE STARS'
const LINES = [
  { t: 1.0, speaker: LSP, color: '#f6a8ec', text: 'ok chat. one outfit. *two* minutes.' },
  { t: 4.35, speaker: LSP, color: '#f6a8ec', text: 'A says *fun.* B says… *fun but serious.*' },
  { t: 9.45, speaker: LSP, color: '#f6a8ec', text: "chat, vote. wait, don't. ok *vote.*" },
  { t: 14.55, speaker: SPEAK, text: 'sweetie. those are the *same shirt.*' },
  { t: 17.4, speaker: LSP, color: '#f6a8ec', text: 'ok, but what about *this* one?' },
]
const CPS = 30
const BOX1 = { open: 0.85, close: 12.95 }, BOX2 = { open: 14.4, close: 20.15 }
const CLOCK = [[0, '6:30'], [T.h1, '7:05'], [T.h2, '7:40'], [19.3, '7:52'], [T.pick[0], '7:53']]

// layout
const LIB_P = { x: 540, y: 960, s: 300 }
const STARS_P = { x: 940, y: 1170, s: 140 }
const PIS_P = { x: WIN.x + 120, y: WIN.y + 170, s: 120 }
const SIDE = { L: { x: 235, y: 1000 }, R: { x: 845, y: 1000 } }
const CLOSE = { L: { x: 360, y: 1050 }, R: { x: 720, y: 1050 }, C: { x: 540, y: 1085 } }
const WEAR = { x: 540, y: 1128 }

const LIB_HOPS = [T.libIn + 0.3, ...talkHops(LINES, LSP, { cps: CPS }), T.third, T.heart, T.level, T.level + 0.5]
const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]

/** how many swaps are done at t, and the progress of the running one */
function swapState(t) {
  let n = 0, p = 0
  for (const s of T.swaps) { if (t >= s + 0.32) n++; else if (t >= s) p = ease.inOutCubic(prog(t, s, s + 0.32)) }
  return { n, p }
}
/** the scales' tilt (radians): + = right pan down */
function tilt(t) {
  if (t < T.shirtsIn[0]) return 0
  if (t < T.h1) return 0.24 * Math.sin((t - T.shirtsIn[0]) * 3.4)
  if (t < T.cut) { const u = t - T.h1; return 0.32 * Math.sin(u * (4.5 + u * 0.7)) }
  if (t < T.stop) return 0.4 * Math.sin((t - T.h2) * (t > T.third ? 13 : 8))
  if (t < T.pick[1]) return 0.4 * Math.sin((T.stop - T.h2) * 13) * (1 - ease.inOutCubic(prog(t, T.stop, T.pick[1])))
  const d = t - T.pick[1]
  return t > T.level ? 0.18 * Math.exp(-(t - T.level) * 6) * Math.sin((t - T.level) * 22) * (t < T.level + 0.9 ? 1 : 0) : 0.2 * Math.sin(d * 9)
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }

  const root = fill(stage)
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'Outfit check. | *Easy.*', { top: 172, size: 104, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: '#f6a8ec' })
  const H1 = popText(root, '35 minutes | *later…*', { top: 178, size: 104, accentSize: 146, at: T.h1, gap: 0.1, accentColor: GOLD })
  const H2 = popText(root, 'Same shirt. | *New crisis.*', { top: 178, size: 104, accentSize: 142, at: T.h2, gap: 0.1, accentColor: '#ff8fa0' })
  const H3 = popText(root, 'Balanced. | *Finally.*', { top: 172, size: 112, accentSize: 160, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: '#f6a8ec' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 3), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(3), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const clock = buildClock(root, { at: T.clock, keys: CLOCK, date: '8:00' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── pieces
  function pisces(t) {
    let tears = 1, mood = 'sparkle'
    if (t > T.h1) tears = 2
    if (t > T.third) { tears = 3; mood = 'wide' }
    if (t > T.notif) { tears = 2; mood = 'happy' }
    if (t > T.level) tears = 3
    const P = { ...PIS_P, x: PIS_P.x + 6 * Math.sin(t * 0.9) }
    const opts = { color: PIS.color, mood, look: mood === 'happy' ? undefined : [1, 1], seed: 6, glow: 0.8, pop: pop01(t, 1.2, 0.4, 2), hops: [T.third + 0.1, T.level + 0.1] }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    inSprite(x, F, () => tearsCells(x, t, tears))
  }

  /** the little pixel scales over Libra's head */
  function scales(t, cx, cy, k) {
    if (k <= 0.01) return
    const a = tilt(t)
    x.save(); x.translate(cx, cy); x.scale(k, k)
    const C = 7
    x.fillStyle = INK; x.fillRect(-C * 1.5, -C * 1, C * 3, C * 12); x.fillStyle = GOLD; x.fillRect(-C * 0.5, 0, C, C * 10)
    drawBits(x, ['.GGG.', 'GGGGG', '.GGG.'], { G: GOLD }, 0, -C * 1.5, C)
    drawBits(x, ['GGGGGGG'], { G: GOLD }, 0, C * 11, C)
    const bw = 15 * C
    for (const s of [-1, 1]) {
      const ex = Math.cos(a) * bw * s, ey = Math.sin(a) * bw * s
      // chains + pan (pans hang straight down)
      x.fillStyle = BONE; for (let q = 1; q < 5; q++) x.fillRect(ex - 2 + s * 0, ey + q * C * 1.2, 4, C * 0.7)
      drawBits(x, ['PPPPPPP', '.PPPPP.'], { P: s < 0 ? '#f6a8ec' : '#9fe6ff' }, ex, ey + C * 6.5, C)
    }
    x.save(); x.rotate(a); x.fillStyle = INK; x.fillRect(-bw - C, -C, bw * 2 + C * 2, C * 2); x.fillStyle = GOLD; x.fillRect(-bw, -C * 0.5, bw * 2, C); x.restore()
    x.restore()
  }

  /** a tee with its tag letter */
  function shirt(t, cx, cy, cell, tag, { rot = 0, alpha = 1 } = {}) {
    drawShirt(x, cx, cy, cell, '#8fd6ff', { rot, alpha, shade: '#4f94d8' })
    if (!tag) return
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
    const tx0 = cell * 3.6, ty0 = -cell * 2.6
    x.fillStyle = INK; x.fillRect(tx0 - 4, ty0 - 4, 48, 52); x.fillStyle = BONE; x.fillRect(tx0, ty0, 40, 44)
    x.font = `700 32px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tag, tx0 + 20, ty0 + 24)
    x.restore()
  }

  function shirts(t) {
    if (t < T.shirtsIn[0] || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const inK = easeOutBack(prog(t, ...T.shirtsIn), 1.5)
    const { n, p } = swapState(t)
    const cl = ease.inOutCubic(prog(t, ...T.close))
    const sw = 0.06 * Math.sin(t * 2.4)
    // A starts left, B right; each completed swap flips them
    for (const [tag, home] of [['A', -1], ['B', 1]]) {
      let side = n % 2 ? -home : home, x0 = side < 0 ? SIDE.L.x : SIDE.R.x, x1 = side < 0 ? SIDE.R.x : SIDE.L.x
      let px = p > 0 ? lerp(x0, x1, p) : x0, py = SIDE.L.y - (p > 0 ? Math.sin(Math.PI * p) * 160 * (home < 0 ? 1 : -0.35) : 0)
      // fly in from the sides
      px = lerp(side < 0 ? -200 : 1280, px, inK)
      // close-up line-up for beat 2: A left, B right
      if (cl > 0) { const tgt = tag === 'A' ? CLOSE.L : CLOSE.R; px = lerp(px, tgt.x, cl); py = lerp(py, tgt.y, cl) }
      // the pick: A and B fly off
      const off = ease.inCubic(prog(t, ...T.pick))
      if (off > 0) { px += (tag === 'A' ? -1 : 1) * 900 * off; py -= 300 * off }
      const cell = lerp(14, 13, cl)
      if (off < 1) shirt(t, px, py, cell, tag, { rot: (side < 0 ? -1 : 1) * sw + (off > 0 ? (tag === 'A' ? -1 : 1) * off * 1.2 : 0), alpha: ok })
    }
    // C: the third identical tee, dropped in from the top; at the pick it lands on Libra
    if (t > T.third - 0.3) {
      const d = easeOutBack(prog(t, T.third - 0.3, T.third + 0.15), 1.8)
      let px = CLOSE.C.x, py = lerp(-200, CLOSE.C.y, d), cell = 13, rot = 0.05 * Math.sin(t * 3)
      const pk = ease.inOutCubic(prog(t, ...T.pick))
      if (pk > 0) { px = lerp(px, WEAR.x, pk); py = lerp(py, WEAR.y, pk) - Math.sin(Math.PI * pk) * 120; cell = lerp(13, 14, pk); rot *= 1 - pk }
      shirt(t, px, py, cell, pk > 0.6 ? null : 'C', { rot, alpha: ok })
    }
  }

  function libra(t) {
    const k = pop01(t, T.libIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.02) return
    let mood = 'happy', look
    if (t > T.shirtsIn[0]) { mood = 'neutral'; look = [tilt(t) > 0 ? 1 : -1, 0.3] }
    if (t > T.h1 && t < T.cut) { mood = t > LINES[2].t ? 'wide' : 'squint'; look = [tilt(t) > 0 ? 1 : -1, 0.3] }
    if (t > T.h2) { mood = 'neutral'; look = [0.6, 0.4] }
    if (t > T.same) { mood = 'wide'; look = [1, 1] }
    if (t > LINES[4].t - 0.2) { mood = 'sparkle'; look = [0, 0] }
    if (t > T.notif) { mood = 'wide'; look = [0, -1] }
    if (t > T.heart) { mood = 'heart'; look = undefined }
    if (t > T.level) mood = 'sparkle'
    const sq = t > T.third && t < T.third + 0.3 ? 0.1 : 0
    drawStarChar(x, LIB_P.x, LIB_P.y, LIB_P.s, t, { color: LIB.color, glyph: LIB.glyph, mood, look, hops: LIB_HOPS, pop: k, seed: 3, glow: 1.15, squash: sq })
  }

  function theStars(t) {
    const k = pop01(t, T.starsIn, 0.36, 2.1) * outK(t, T.starsOut)
    if (k <= 0.02) return
    let mood = 'neutral', look = [-1, -0.4]
    if (t > T.third) { mood = 'eyeroll'; look = undefined }
    drawStarChar(x, STARS_P.x, STARS_P.y + (1 - k) * 80, STARS_P.s, t, { color: STAR.sky, mood, look, hops: STARS_HOPS, pop: k, seed: 2, glow: 1 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      x.clearRect(0, 0, 1080, 1920)
      const glow = 1 + 0.3 * clamp(prog(t, T.level, T.level + 0.3)) * (1 - prog(t, T.level + 0.3, T.level + 1.2))
      drawRoom(x, t, { ring: glow, inWindow: (_, tt) => pisces(tt) })
      // the scales over Libra's head (hidden while the text is up)
      const sk = pop01(t, T.shirtsIn[0] + 0.2, 0.35, 2) * outK(t, [T.notif - 0.2, T.notif]) + (t > T.pick[1] ? pop01(t, T.pick[1], 0.35, 2) * popOut(t, T.out) : 0)
      scales(t, LIB_P.x, 640, clamp(sk, 0, 1.2))
      libra(t)
      shirts(t)
      drawTable(x, t, { phone: { cx: 330, buzz: T.buzz } })
      theStars(t)
      // the spiral (beats 1–2), frozen + dropped by the text
      drawSpiral(x, t, LIB_P.x, LIB_P.y - 60, { from: T.spiral, stop: T.stop, R: 250, tokens: ['?', 'A?', '!', 'B?', '…', '?!', 'A?', '!!'] })
      // stickers
      drawSticker(x, t, { at: T.tagA, out: T.h0Out, text: 'option *A*', cx: SIDE.L.x, cy: 855, rot: -0.07 })
      drawSticker(x, t, { at: T.tagB, out: T.h0Out, text: 'option *B*', cx: SIDE.R.x, cy: 855, rot: 0.06 })
      drawSticker(x, t, { at: T.pros, out: T.prosOut, text: 'pros & cons list: *page 4*', cx: 540, cy: 1205, rot: -0.03, size: 38 })
      drawSticker(x, t, { at: T.spot, out: T.spotOut, text: 'differences found: *none*', cx: 540, cy: 1205, rot: 0.03, size: 38 })
      drawSticker(x, t, { at: T.third + 0.3, out: T.h2Out, text: 'option *C* (same)', cx: 540, cy: 1205, rot: -0.04, size: 38 })
      drawSticker(x, t, { at: T.level + 0.35, out: T.out, text: 'outfit: *chosen.* (C)', cx: 540, cy: 1540, rot: -0.04, size: 46 })
      // the date's text
      drawNotif(x, t, { at: T.notif, out: T.notifOut, text: 'can’t wait to see you. wear whatever feels like you :)', cy: 560 })
      if (t > T.heart && t < T.heart + 0.8) sparkles(x, t, LIB_P.x, LIB_P.y - 40, T.heart, 10, 200, 3, ['#ff4f86', BONE, GOLD])
      sparkles(x, t, LIB_P.x, 640, T.level, 12, 170, 1, [GOLD, '#f6a8ec', BONE])
      sparkles(x, t, CLOSE.C.x, 960, T.third + 0.05, 8, 160, 2, ['#8fd6ff', BONE])
      box1.update(t); box2.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut)); clock.update(t, outK(t, T.bugOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}
function fill(stage) { return el('div', { position: 'absolute', inset: 0, overflow: 'hidden', background: '#140c2c' }, stage) }

// card-cut candidates (cardfx keeps the middle one: 13.9, the time skip from 7:05 to 7:40)
const CUTS = [6.95, { t: T.cut, kind: 'flip' }, 20.22]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const buzz = t0 => [...Array.from({ length: 7 }, (_, i) => ['tick', +(t0 + i * 0.045).toFixed(3), 0.05]), ['tom', t0, 70, { gain: 0.12, decay: 0.2 }]]
export const CUES = [
  // cold open
  ...wordPops(T.h0, 2, 0.08, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.libIn + 0.05, 880, 0.04, 0],
  ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.clock + 0.05, 0.04], ['pop', 1.25, 987.77, 0.02, -0.5],
  ['whoosh', T.shirtsIn[0], 0.4, 0.04], ['whoosh', T.shirtsIn[0] + 0.05, 0.4, 0.035], ['pluck', T.shirtsIn[1], 1174.66, 0.035, 0.4, 0],
  ['pop', T.tagA, 659.25, 0.035, -0.4], ['pop', T.tagB, 880, 0.035, 0.4],
  // 35 minutes later: the clock flips, the swaps
  ['whoosh', T.h1 - 0.1, 0.5, 0.04], ['tick', T.h1, 0.06], ['tick', T.h1 + 0.06, 0.05], ...wordPops(T.h1, 3, 0.1, 2, 0.024),
  ...T.swaps.map((s, i) => ['whoosh', s + 0.05, 0.3, 0.025 + i * 0.002]), ...T.swaps.map((s, i) => ['pop', s + 0.3, NOTE[(i * 2) % 7], 0.03, i % 2 ? 0.3 : -0.3]),
  ['riser', T.spiral, T.cut - 0.3, 0.02], ['pop', T.pros, 1318.51, 0.035, 0.2],
  ...talkCues(LINES, { cps: CPS }),
  // same shirt: the clock, THE STARS, the stickers, shirt C
  ['tick', T.h2, 0.06], ['tick', T.h2 + 0.06, 0.05], ...wordPops(T.h2, 4, 0.1, 1, 0.024),
  ['pop', T.starsIn + 0.05, 739.99, 0.04, 0.4], ['pluck', T.same + 0.2, 659.25, 0.035, 0.5, 0], ['pop', T.spot, 987.77, 0.035, 0],
  ['whoosh', T.third - 0.3, 0.4, 0.045], ['pop', T.third + 0.1, 1567.98, 0.05, 0], ['glitter', T.third, T.third + 0.4], ['pop', T.third + 0.3, 1174.66, 0.035, 0],
  ['tick', 19.3, 0.06], ['riser', 18.4, T.buzz[0], 0.03],
  // the turn: buzz, the text, the spiral drops
  ...buzz(T.buzz[0]), ...buzz(T.buzz[1]), ['pop', T.notif + 0.05, 1174.66, 0.05, 0], ['bell', T.notif + 0.15, 1760, 0.03, 1.0, 0],
  ['whoosh', T.stop + 0.1, 0.5, 0.03], ['pluck', T.heart, 1174.66, 0.045, 0.5, -0.2], ['pluck', T.heart + 0.12, 1567.98, 0.04, 0.5, 0.2],
  // balanced
  ['whoosh', T.pick[0], 0.4, 0.04], ['whoosh', T.pick[0] + 0.08, 0.4, 0.035],
  ...wordPops(T.h3, 1, 0.08, 0, 0.024), ['pop', T.h3Land, 1174.66, 0.045, 0],
  ['bell', T.level, 1760, 0.05, 1.4, 0], ['bell', T.level + 0.02, 2349.32, 0.03, 1.4, 0], ['glitter', T.level, T.level + 0.5],
  ['pop', T.level + 0.4, 1318.51, 0.035, 0], ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
