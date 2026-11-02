// hxclearlake · NEIGHBORHOOD STARS: "Clear Lake." (Star Talk: Houston, 30 s vertical) · story 0–25.6, then the shared END
// CARD (default CTA). Clear Lake gets its own star: the space nerd with a model rocket, on a dock by the marina, orbit
// diagrams floating over its head. Show bug "★ NEIGHBORHOOD STARS · CLEAR LAKE" (no numbers).
//   0.00–5.30   HOOK "Clear Lake’s star | talks *orbits.*" — frame 0: the CLEAR LAKE STAR mid-lecture, rocket in hand,
//               an orbit drawn in the air: "an orbit is just *falling*… sideways… forever." (real: orbiting is free fall)
//   5.40–10.25  "Aquarius? | *Obsessed.*" — ♒ AQUARIUS STAR, sparkle eyes: "wait. is the Moon *falling* too?" CLEAR LAKE:
//               "YES!! forever!!" (real: the Moon is in free fall around Earth). ♓ Pisces on a sailboat: "the Moon is FALLING?!"
//  10.35        the one card cut (cardfx picks the middle candidate)
//  10.45–16.20 "Taurus? | *Glazed.*" — ♉ TAURUS STAR with a snack basket: "mm. cool. want a *snack*?" Rule of three: more
//               diagrams pile up (ESCAPE VELOCITY · TIDES · LAGRANGE POINTS), CLEAR LAKE: "…and *that's* why the Moon
//               makes tides!" (real). Taurus nods off.
//  16.30–21.95 "Great facts. | Now *ask.*" — THE STARS: "great facts. now ask *them* one." The diagrams fade;
//               CLEAR LAKE: "what's *your* favorite thing?" Taurus wakes up sparkling: "honestly? picnics." Heart.
//  22.15–25.30 "Ask *back.*" — the same framing as frame 0, but the diagram is two bodies circling each other (a
//               conversation, not a lecture); the rocket lies on the picnic blanket. Pisces happy-cries on the boat.
// Rewatch bait: Pisces' boat rocks harder whenever someone says "falling".
// One canvas, DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, SKY_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR as STARC, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, PINK, AMBER, BLUE, sparkle, chip, starFrame, inSprite, tearsCells, aside, showBug, floatHearts, lake, dock, rocket, orbitDiagram, blanket, basket } from './props.js'

export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const inK = (t, a, d = 0.3) => ease.outCubic(prog(t, a, a + d))

const CL = '#c7b8ff'                                   // the Clear Lake star: moonlight lavender, no sign glyph (a neighborhood)
const AQU = signStar('aquarius'), TAU = signStar('taurus'), PIS = signStar('pisces')
const TAG_C = 'CLEAR LAKE STAR', TAG_A = `${AQU.glyph} AQUARIUS STAR`, TAG_T = `${TAU.glyph} TAURUS STAR`, TAG_N = 'THE STARS'
const CPS = 28
const BOX1 = [{ t: 1.4, speaker: TAG_C, color: CL, text: 'an orbit is just *falling*… sideways… forever.' }]
const BOX2 = [{ t: 6.1, speaker: TAG_A, color: AQU.color, text: 'wait. is the Moon *falling* too?' }]
const BOX3 = [
  { t: 10.6, speaker: TAG_T, color: TAU.color, text: 'mm. cool. want a *snack*?' },
  { t: 13.4, speaker: TAG_C, color: CL, text: "…and *that's* why the Moon makes tides!" },
]
const BOX4 = [
  { t: 16.4, speaker: TAG_N, text: 'great facts. now ask *them* one.' },
  { t: 19.3, speaker: TAG_C, color: PINK, text: "what's *your* favorite thing?" },
]
const BOXES = [[BOX1, 1.2, 5.3], [BOX2, 5.9, 10.25], [BOX3, 10.45, 16.25], [BOX4, 16.25, 22.1]]

// ── timeline
const T = {
  h0Out: 5.1, diag0: [-1.4, 1.0], rocketZoom: [3.6, 4.6],
  B: 5.4, h1: 5.42, h1Late: 5.95, h1Out: 10.05, aqIn: 5.5, yes: 7.75, moonDiag: [7.85, 8.6], pisIn: 8.2, pisCry: 8.8,
  C: 10.4, h2: 10.45, h2Late: 11.0, h2Out: 16.05, chips: [11.7, 12.35, 13.0], nod: 14.4,
  h3: 16.3, h3Late: 17.0, h3Out: 21.75, narrIn: 16.3, clear: [17.0, 17.6], wake: 20.9, heart: 21.2,
  h4: 22.15, h4Late: 22.15, binary: [22.3, 23.2], pisBoat: 23.0, fade: [24.95, 25.3],
}
const FALLS = [1.95, 6.9, T.yes]            // every "falling": Pisces' boat rocks

// ── layout
const WATER = 1060, DOCK = 1380
const C_P = { x: 300, y: 1250, s: 260 }, D_P = { x: 790, y: 1250, s: 260 }
const DIAG = { x: 520, y: 740, rx: 320, ry: 130 }
const NARR = { x: 545, y: 820, s: 160 }

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 36px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const bug = showBug(el, root, 'CLEAR LAKE')
  // frame 0 is the thumbnail: the hook is already fully on screen at t = 0
  const H0 = popText(root, 'Clear Lake’s star | talks *orbits.*', { top: 190, size: 104, accentSize: 156, at: -1.2, gap: 0.1, late: 1, lateAt: -0.7, wobble: true, accentColor: CL, fit: true })
  const H1 = popText(root, 'Aquarius? | *Obsessed.*', { top: 190, size: 116, accentSize: 180, at: T.h1, gap: 0.1, late: 1, lateAt: T.h1Late, wobble: true, accentColor: AQU.color })
  const H2 = popText(root, 'Taurus? | *Glazed.*', { top: 190, size: 116, accentSize: 190, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Late, wobble: true, accentColor: TAU.color })
  const H3 = popText(root, 'Great facts. | Now *ask.*', { top: 190, size: 116, accentSize: 180, at: T.h3, gap: 0.1, late: 2, lateAt: T.h3Late, lateGap: 0.14, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Ask *back.*', { top: 230, size: 140, accentSize: 220, at: T.h4, gap: 0.12, late: 0, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.fade[0]]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const C_HOPS = [0.6, ...talkHops([...BOX1, ...BOX3, ...BOX4], TAG_C, { cps: CPS }), T.yes, T.yes + 0.4, ...T.chips, T.heart, T.binary[1]]
  const A_HOPS = [T.aqIn + 0.3, ...talkHops(BOX2, TAG_A, { cps: CPS }), T.yes + 0.2]
  const T_HOPS = [T.C + 0.25, ...talkHops(BOX3, TAG_T, { cps: CPS }), T.wake, T.wake + 0.4, T.binary[1] + 0.1]
  const N_HOPS = [T.narrIn + 0.3, ...talkHops(BOX4.slice(0, 1), TAG_N, { cps: CPS })]

  function clState(t) {
    if (t < T.B) return { mood: 'sparkle', look: [1, -1] }                      // lost in the diagram
    if (t < T.yes) return { mood: 'wide', look: [1, 0] }                        // a fan?!
    if (t < T.C) return { mood: 'sparkle', look: [1, 0] }
    if (t < 13.4) return { mood: 'happy', look: [1, -1] }                      // not hearing the snack offer
    if (t < 16.4) return { mood: 'sparkle', look: [0, -1] }
    if (t < T.clear[1]) return { mood: 'wide', look: [1, -1], blink: false }   // the STARS
    if (t < 19.3) return { mood: 'neutral', look: [1, 0] }
    if (t < T.heart) return { mood: 'wide', look: [1, 0] }                     // …listening
    if (t < T.h4) return { mood: 'heart' }
    return { mood: 'happy', look: [1, 0], blush: 1 }
  }
  function tState(t) {
    if (t < 13.4) return { mood: 'happy', look: [-1, 0] }
    if (t < T.nod) return { mood: 'neutral', look: [-1, -1], blink: 0.5 }       // glazing
    if (t < 19.3) return { mood: 'sleepy' }
    if (t < T.wake) return { mood: 'wide', look: [-1, 0], blink: false }        // …me?
    if (t < T.h4) return { mood: 'sparkle', look: [-1, 0] }
    return { mood: 'happy', look: [-1, -0.6], blush: 1 }
  }

  function draw(t) {
    const a = 1 - ease.inQuad(prog(t, ...T.fade))
    // a pixel moon over the marina (its path on the water)
    lake(x, t, { y: WATER, alpha: a, moonX: 930 })   // the moon path lines up under the sky's own crescent
    // Pisces on a little sailboat (rocks on every "falling")
    if (t > T.pisIn) {
      const k = pop01(t, T.pisIn, 0.36, 2.2) * a
      const rockBoost = FALLS.reduce((s, f) => s + (t > f && t < f + 1.2 ? Math.exp(-(t - f) * 3) : 0), 0)
      const rock = 0.06 * Math.sin(t * 2) + 0.18 * rockBoost * Math.sin((t) * 14)
      const BX = 900, BY = WATER + 90
      x.save(); x.globalAlpha = k; x.translate(BX, BY); x.rotate(rock)
      x.fillStyle = '#1b1236'; x.fillRect(-90, -10, 180, 34); x.fillStyle = '#efe6d6'; x.fillRect(-84, -6, 168, 22); x.fillStyle = '#ff8fb1'; x.fillRect(-84, 8, 168, 6)
      x.fillStyle = '#c9c2b4'; x.fillRect(40, -170, 6, 160); x.fillStyle = '#efe6d6'; x.beginPath(); x.moveTo(46, -166); x.lineTo(46, -30); x.lineTo(110, -30); x.fill()
      x.restore()
      const opts = { color: PIS.color, mood: t < T.pisCry ? 'wide' : t < T.h4 ? 'squint' : 'happy', look: [-1, -1], seed: 11, pop: k, glow: 0.8, hops: [T.pisIn + 0.3, T.pisCry, T.pisBoat] }
      const P = { x: BX - 20, y: BY - 52, s: 92 }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      if (t > T.pisCry) { const F = starFrame(P.x, P.y, P.s, t, opts); x.save(); x.globalAlpha = k; inSprite(x, F, () => tearsCells(x, t, t < T.h4 ? 3 : 2)); x.restore() }
      aside(x, 800, WATER - 130, 'the Moon is FALLING?!', pop01(t, T.pisCry, 0.3, 2.4) * outK(t, T.C - 0.4) * a, { size: 30, edge: PIS.color, tx: P.x, ty: P.y - 40 })
    }
    dock(x, DOCK, { alpha: a })
    // the diagrams: A's orbit → B's Moon → C's pile → cleared in D → E's two-body "conversation"
    const lecture = a * outK(t, T.clear[0], 0.5)
    orbitDiagram(x, DIAG.x, DIAG.y, DIAG.rx, DIAG.ry, t, prog(t, ...T.diag0) * lecture * (t < T.moonDiag[0] ? 1 : outK(t, T.moonDiag[0], 0.2)), { label: 'ORBIT = FALLING SIDEWAYS' })
    if (t > T.moonDiag[0]) orbitDiagram(x, DIAG.x, DIAG.y, DIAG.rx, DIAG.ry, t, prog(t, ...T.moonDiag) * lecture, { col: '#fff3d6', planet: '#8fd8f6', speed: 0.9, label: 'THE MOON: ALSO FALLING' })
    const CH = [['ESCAPE VELOCITY', 290, 950, AMBER], ['TIDES', 830, 980, BLUE], ['LAGRANGE POINTS', 560, 1050, PINK]]
    CH.forEach(([s, cx, cy, c], i) => chip(x, cx, cy, s, pop01(t, T.chips[i], 0.3, 2.6) * lecture, { size: 32, col: c, edge: c }))
    orbitDiagram(x, 540, DIAG.y, 280, 120, t, prog(t, ...T.binary) * a, { col: PINK, speed: 1.1, binary: true, label: 'BOTH WAYS' })
    if (t > T.binary[1]) sparkle(x, 540, DIAG.y, t, T.binary[1] - 0.1, { n: 10, R: 200, seed: 77 })
    // the date: Aquarius (B) → Taurus (C–E) on the right
    if (t > T.aqIn && t < T.C) drawStarChar(x, D_P.x, D_P.y, D_P.s, t, { color: AQU.color, glyph: AQU.glyph, mood: t < T.yes ? 'sparkle' : 'heart', look: [-1, -1], hops: A_HOPS, seed: 9, pop: pop01(t, T.aqIn, 0.4, 2.2), alpha: a })
    if (t > T.C) {
      const ts = tState(t)
      if (t > T.h4) blanket(x, 560, DOCK - 20, 560, a)
      drawStarChar(x, D_P.x, D_P.y, D_P.s, t, { color: TAU.color, glyph: TAU.glyph, mood: ts.mood, look: ts.look, blink: ts.blink, blush: ts.blush, hops: T_HOPS, seed: 13, pop: pop01(t, T.C, 0.4, 2.2), alpha: a })
      basket(x, D_P.x + 70, DOCK + 4, 0.9, a)
      if (t > T.wake) aside(x, 780, 1050, 'honestly? picnics.', pop01(t, T.wake, 0.3, 2.4) * outK(t, T.h4 - 0.25) * a, { size: 32, edge: TAU.color, tx: D_P.x, ty: D_P.y - 100 })
    }
    // the Clear Lake star + rocket (held up → lying on the blanket in E)
    const cs = clState(t)
    drawStarChar(x, C_P.x, C_P.y, C_P.s, t, { color: CL, mood: cs.mood, look: cs.look, blink: cs.blink, blush: cs.blush, hops: C_HOPS, seed: 5, glow: 1.15, alpha: a })
    if (t < T.h4) {
      const zoom = Math.sin(Math.PI * prog(t, ...T.rocketZoom)), wave = t > T.yes && t < T.yes + 1 ? 0.3 * Math.sin((t - T.yes) * 16) : 0
      rocket(x, C_P.x + 165 + 60 * zoom, C_P.y + 110 - 160 * zoom, 0.95, 0.15 + 0.5 * zoom + wave, a, zoom, t)
    } else rocket(x, C_P.x + 210, DOCK - 14, 0.8, Math.PI / 2, a)
    if (t > T.yes && t < T.C) aside(x, 330, 1020, 'YES!! forever!!', pop01(t, T.yes, 0.25, 2.4) * outK(t, T.C - 0.4) * a, { size: 32, edge: CL, tx: C_P.x, ty: C_P.y - 100 })
    // THE STARS (D)
    if (t > T.narrIn && t < T.h4 + 0.4) {
      const k = pop01(t, T.narrIn, 0.45, 2.2) * outK(t, T.h4 - 0.1, 0.4)
      drawStarChar(x, NARR.x, NARR.y, NARR.s, t, { color: STARC.sky, mood: t < T.clear[1] ? 'squint' : t < T.heart ? 'happy' : 'sparkle', look: [0, 1], hops: N_HOPS, seed: 3, pop: k, alpha: a, glow: 1.2 })
    }
    if (t > T.clear[0]) sparkle(x, DIAG.x, DIAG.y + 100, t, T.clear[0], { n: 14, R: 260, seed: 61 })
    if (t > T.heart) floatHearts(x, t, 545, 1100, T.heart, 25, 1, 7, 420)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) draw(t)
      bug.style.opacity = String(outK(t, END - 0.35, 0.3))
      for (const [H, o] of HEADS) H.update(t, outK(t, o, 0.22))
      for (const b of boxes) b.update(t)
      drawGrain(gx, t)
    },
  }
}

// ── sound (G-major palette; the engine moves pitched cues into the key)
const NOTE = [783.99, 880, 987.77, 1174.66, 1318.51, 1567.98, 1760]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FILM_CUES = [
  // A
  ['pop', 0.05, 1174.66, 0.04, 0], ['bell', 0.1, 1567.98, 0.02, 1.4, 0], ['whoosh', T.rocketZoom[0], 1.0, 0.035], ['pluck', r3(T.rocketZoom[0] + 0.5), 1760, 0.03, 0.4, -0.3],
  // B
  ...wordPops(T.h1, 1, 0.1, 2, 0.026), ['pop', r3(T.h1Late), 1174.66, 0.05, 0], ['pluck', r3(T.h1Late), 880, 0.045, 0.6, 0],
  ['pop', T.aqIn, 987.77, 0.035, 0.4], ['bell', T.yes, 1318.51, 0.035, 1.2, -0.3], ['pop', r3(T.yes + 0.1), 1567.98, 0.035, -0.3],
  ['whoosh', T.moonDiag[0], 0.6, 0.025], ['pop', T.pisIn, 659.25, 0.035, 0.5], ['pop', T.pisCry, 587.33, 0.04, 0.5], ['pop', r3(T.pisCry + 0.12), 440, 0.035, 0.5],
  // C
  ...wordPops(T.h2, 1, 0.1, 1, 0.026), ['pop', r3(T.h2Late), 987.77, 0.05, 0], ['pop', T.C + 0.2, 659.25, 0.035, 0.4],
  ...T.chips.map((c, i) => ['pop', c, NOTE[(i * 2 + 1) % 7], 0.04, (i - 1) * 0.4]), ['pluck', T.nod, 392, 0.03, 0.9, 0.4],
  // D
  ...wordPops(T.h3, 2, 0.1, 3, 0.026), ['pop', r3(T.h3Late), 1174.66, 0.05, 0], ['pluck', r3(T.h3Late), 880, 0.05, 0.7, 0],
  ['pop', T.narrIn, 1318.51, 0.04, 0.4], ['bell', r3(T.narrIn + 0.05), 1760, 0.02, 1.2, 0.4],
  ['whoosh', T.clear[0], 0.5, 0.035], ['glitter', T.clear[0], r3(T.clear[0] + 0.6)],
  ['pop', T.wake, 1174.66, 0.04, 0.4], ['bell', T.heart, 1318.51, 0.035, 1.6, 0], ['pluck', r3(T.heart + 0.08), 1567.98, 0.035, 0.5, 0],
  // E
  ['pop', T.h4, 1174.66, 0.045, 0], ['pop', r3(T.h4 + 0.12), 1567.98, 0.05, 0],
  ['whoosh', T.binary[0], 0.6, 0.03], ['bell', T.binary[1], 1174.66, 0.04, 2.0, 0], ['glitter', T.binary[1], r3(T.binary[1] + 0.7)],
  ['pop', T.pisBoat, 880, 0.03, 0.4],
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [TAG_C]: 1174.66, [TAG_A]: 987.77, [TAG_T]: 659.25, [TAG_N]: 880 } })),
]

// card-cut candidates; cardfx plays exactly ONE (the middle one, 10.35):
//   5.35  box 1 shut (5.3), H0 out → "Aquarius?" (5.42)
//  10.35  H1 out (10.05–10.27), box 2 shut (10.25) → Taurus (10.4)
//  16.25  box 3 shut (16.2) → "Great facts." (16.3)
const CUTS = [{ t: 5.35 }, { t: 10.35 }, { t: 16.25 }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END }),
  cardFrame({ start: 0, end: END, corners: 'tr bl br' }),
  cardCuts(CUTS),
]
export { T }
export const BOXES_DEBUG = BOXES
