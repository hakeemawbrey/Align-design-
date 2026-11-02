// hxeastend · NEIGHBORHOOD STARS: "The East End." (Star Talk: Houston, 30 s vertical) · story 0–25.6, then the shared END
// CARD (default CTA). The East End gets its own star: the mural painter, paint on all five points, a roller in hand, a
// long cinder-block wall, warehouses and a water tower behind. Show bug "★ NEIGHBORHOOD STARS · EAST END" (no numbers).
//   0.00–5.30   HOOK "East End’s star | never *says* it." — frame 0: the EAST END STAR mid-roll across the wall (a swirl
//               of every colour). ♌ LEO STAR: "so… do you *like* me?" The answer: it paints faster. ("ANSWER: SEE WALL")
//   5.40–10.25  "Leo can’t | *read* murals." — a heart mural (that looks like a strawberry). LEO: "aw. you painted a
//               *strawberry*?" A MEANT / LEO READ placard: I LIKE YOU / STRAWBERRY. ♓ Pisces sobs at the wall ("I GET IT!!").
//  10.35        the one card cut (cardfx picks the middle candidate)
//  10.45–16.20 "More walls. | *More* murals." — rule of three: two stars holding hands (LEO READ: TWO TACOS), a sun with a
//               face (LEO READ: WEATHER?). LEO: "I love these. what *are* they?"
//  16.30–21.95 "Use your | *words.*" — THE STARS: "East End. walls can't talk. *you* can." The roller clatters down; a gulp.
//               EAST END: "I like you. *a lot*." Leo: heart eyes.
//  22.15–25.30 "Say it. | *Then* paint it." — the same wall as frame 0, both of them rolling one plain mural: a heart and
//               I LIKE YOU. Pisces happy-cries on top of the wall. Last line = that headline.
// Rewatch bait: Pisces is the only one who reads every mural right, and its own tears drip paint-blue.
// One canvas, DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, SKY_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR as STARC, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, PINK, AMBER, sparkle, chip, starFrame, inSprite, tearsCells, aside, showBug, pool, floatHearts, backdrop, wall, mural, roller, paintTips, bucket, meantRead, PAINT } from './props.js'

export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const inK = (t, a, d = 0.3) => ease.outCubic(prog(t, a, a + d))

const EE = '#ff7ab8'                                   // the East End star: spray-paint pink, no sign glyph (a neighborhood)
const LEO = signStar('leo'), PIS = signStar('pisces')
const TAG_E = 'EAST END STAR', TAG_L = `${LEO.glyph} LEO STAR`, TAG_N = 'THE STARS'
const CPS = 28
const BOX1 = [{ t: 1.4, speaker: TAG_L, color: LEO.color, text: 'so… do you *like* me?' }]
const BOX2 = [{ t: 7.0, speaker: TAG_L, color: LEO.color, text: 'aw. you painted a *strawberry*?' }]
const BOX3 = [{ t: 13.45, speaker: TAG_L, color: LEO.color, text: 'I love these. what *are* they?' }]
const BOX4 = [
  { t: 16.35, speaker: TAG_N, text: "East End. walls can't talk. *you* can." },
  { t: 19.6, speaker: TAG_E, color: EE, text: 'I like you. *a lot*.' },
]
const BOXES = [[BOX1, 1.2, 5.3], [BOX2, 6.8, 10.25], [BOX3, 13.25, 16.25], [BOX4, 16.25, 22.05]]

// ── timeline
const T = {
  paint0: [-6, 4.4], h0Out: 5.1, ansChip: 3.4,
  B: 5.4, h1: 5.42, h1Late: 6.1, h1Out: 10.05, paint1: [5.55, 6.6], row1: 8.4, pisIn: 7.4, pisCry: 8.8,
  C: 10.4, h2: 10.62, h2Late: 12.1, h2Out: 16.05, paint2: [10.5, 11.5], row2: 11.7, paint3: [12.3, 13.1], row3: 13.2,
  h3: 16.3, h3Late: 16.95, h3Out: 21.75, narrIn: 16.3, drop: [18.1, 18.45], gulp: 18.9, heart: 20.6,
  h4: 22.15, h4Late: 22.9, paint4: [22.3, 24.0], pisTop: 23.0, fade: [24.95, 25.3],
}

// ── layout
const WALL = { x0: 30, x1: 1050, y0: 700, y1: 1380 }
const MUR = { x: 540, y: 1000, w: 900, h: 330 }
const E_Y = 1255, E_S = 240, L_P = { x: 230, y: 1260, s: 230 }
const NARR = { x: 870, y: 640, s: 140 }
const edgeX = k => MUR.x - MUR.w / 2 + MUR.w * clamp(k)

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 36px Inter", "800 32px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const bug = showBug(el, root, 'EAST END')
  // frame 0 is the thumbnail: the hook is already fully on screen at t = 0
  const H0 = popText(root, 'East End’s star | never *says* it.', { top: 190, size: 104, accentSize: 156, at: -1.2, gap: 0.1, late: 2, lateAt: -0.7, wobble: true, accentColor: EE, fit: true })
  const H1 = popText(root, 'Leo can’t | *read* murals.', { top: 190, size: 112, accentSize: 170, at: T.h1, gap: 0.1, late: 2, lateAt: T.h1Late, lateGap: 0.14, wobble: true, accentColor: LEO.color })
  const H2 = popText(root, 'More walls. | *More* murals.', { top: 190, size: 112, accentSize: 170, at: T.h2, gap: 0.1, late: 2, lateAt: T.h2Late, lateGap: 0.14, wobble: true, accentColor: AMBER })
  const H3 = popText(root, 'Use your | *words.*', { top: 190, size: 116, accentSize: 190, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3Late, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Say it. | *Then* paint it.', { top: 190, size: 116, accentSize: 176, at: T.h4, gap: 0.1, late: 3, lateAt: T.h4Late, lateGap: 0.14, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.fade[0]]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const E_HOPS = [0.5, 1.4, 2.6, 3.8, T.B + 0.2, T.paint1[1], 9.2, T.paint2[1], T.paint3[1], ...talkHops(BOX4, TAG_E, { cps: CPS }), T.heart + 0.2, T.paint4[0], T.paint4[1]]
  const L_HOPS = [...talkHops([...BOX1, ...BOX2, ...BOX3], TAG_L, { cps: CPS }), T.heart, T.paint4[0] + 0.1, T.paint4[1]]
  const N_HOPS = [T.narrIn + 0.3, ...talkHops(BOX4.slice(0, 1), TAG_N, { cps: CPS })]

  // which mural is on the wall, and how far painted
  function wallState(t) {
    if (t < T.B) return { kind: 'swirl', k: prog(t, ...T.paint0), under: null }
    if (t < T.paint2[0]) return { kind: 'heart', k: prog(t, ...T.paint1), under: 'swirl' }
    if (t < T.paint3[0]) return { kind: 'hands', k: prog(t, ...T.paint2), under: 'heart' }
    if (t < T.paint4[0]) return { kind: 'sun', k: prog(t, ...T.paint3), under: 'hands' }
    return { kind: 'clear', k: prog(t, ...T.paint4), under: 'sun' }
  }
  const painting = t => [T.paint0, T.paint1, T.paint2, T.paint3, T.paint4].find(([a, b]) => t >= a && t < b + 0.15)

  function eeState(t) {
    if (t < 1.4) return { mood: 'happy', look: [-1, -1] }
    if (t < 2.4) return { mood: 'wide', look: [-1, 0], blink: false }          // "do you like me?"
    if (t < T.B) return { mood: 'squint', look: [-1, -1] }                      // …paints faster
    if (t < 7.0) return { mood: 'sparkle', look: [-1, 0] }                      // there. obviously.
    if (t < T.C) return { mood: 'wide', look: [-1, 0], blink: false }          // a strawberry?!
    if (t < 13.6) return { mood: 'squint', look: [-1, -1] }
    if (t < 16.4) return { mood: 'wide', look: [-1, 0] }
    if (t < T.drop[0]) return { mood: 'wide', look: [-1, -1], blink: false }   // the STARS
    if (t < 19.6) return { mood: 'squint', look: [-1, 0.6] }                   // gulp
    if (t < T.heart) return { mood: 'sparkle', look: [-1, 0], blush: 1 }
    if (t < T.h4) return { mood: 'happy', look: [-1, 0], blush: 1 }
    return { mood: 'happy', look: [-1, -1], blush: 1 }
  }
  function leoState(t) {
    if (t < 2.6) return { mood: 'sparkle', look: [1, 0] }
    if (t < T.B) return { mood: 'squint', look: [1, -1] }                       // …that's a no?
    if (t < 7.0) return { mood: 'squint', look: [1, -1] }
    if (t < T.C) return { mood: 'happy', look: [1, -1] }                        // aw, fruit
    if (t < 13.6) return { mood: 'neutral', look: [1, -1] }
    if (t < 16.3) return { mood: 'happy', look: [1, -1] }
    if (t < 19.6) return { mood: 'neutral', look: [1, 0] }
    if (t < 20.4) return { mood: 'wide', look: [1, 0], blink: false }          // out loud!
    if (t < T.h4) return { mood: 'heart' }
    return { mood: 'happy', look: [1, -1], blush: 1 }
  }

  function draw(t) {
    const a = 1 - ease.inQuad(prog(t, ...T.fade))
    backdrop(x, t, { y: WALL.y0 + 4, alpha: a })
    wall(x, WALL.x0, WALL.x1, WALL.y0, WALL.y1, { alpha: a })
    const ws = wallState(t)
    if (ws.under) mural(x, ws.under, MUR.x, MUR.y, MUR.w, MUR.h, 1, t, { alpha: a })
    mural(x, ws.kind, MUR.x, MUR.y, MUR.w, MUR.h, ws.k, t, { alpha: a })
    if (t > T.paint4[1]) pool(x, 540, 1000, 520, 240, a * inK(t, T.paint4[1], 0.6), '255,170,190')
    // Pisces: weeping at the wall's right end (B, C), happy-crying on top of the wall (E)
    if (t > T.pisIn && t < T.h3) {
      const k = pop01(t, T.pisIn, 0.36, 2.2) * a * outK(t, T.h3 - 0.3, 0.25)
      const P = { x: 985, y: 1300, s: 100 }
      const opts = { color: PIS.color, mood: t < T.pisCry ? 'sparkle' : 'squint', look: [-1, -1], seed: 11, pop: k, glow: 0.8, hops: [T.pisIn + 0.3, T.pisCry] }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      if (t > T.pisCry) { const F = starFrame(P.x, P.y, P.s, t, opts); x.save(); x.globalAlpha = k; inSprite(x, F, () => tearsCells(x, t, 3)); x.restore() }
      aside(x, 880, 1070, 'I GET IT!!', pop01(t, T.pisCry, 0.3, 2.4) * outK(t, T.C - 0.4) * a, { size: 30, edge: PIS.color, tx: P.x, ty: P.y - 40 })
      aside(x, 880, 1070, 'every word!!', pop01(t, T.row3 + 0.2, 0.3, 2.4) * outK(t, 16.0) * a, { size: 30, edge: PIS.color, tx: P.x, ty: P.y - 40 })
    }
    if (t > T.pisTop) {
      const k = pop01(t, T.pisTop, 0.4, 2.2) * a
      const opts = { color: PIS.color, mood: 'happy', look: [-1, 1], seed: 11, pop: k, glow: 0.9, bob: 2 }
      const P = { x: 960, y: WALL.y0 - 44, s: 90 }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      const F = starFrame(P.x, P.y, P.s, t, opts); x.save(); x.globalAlpha = k; inSprite(x, F, () => tearsCells(x, t, 2)); x.restore()
    }
    // buckets on the sidewalk
    bucket(x, 120, WALL.y1 + 10, 0.9, PAINT[0], a); bucket(x, 960, WALL.y1 + 10, 0.8, PAINT[3], a * (t < T.pisIn ? 1 : 0))
    // the East End star slides with the wet edge while it paints, then rests at the right
    const P = painting(t), ws2 = wallState(t)
    const restX = 790
    const eX = P ? lerp(restX, clamp(edgeX(ws2.k) + 150, 430, 900), Math.min(1, (t - P[0]) / 0.25, (P[1] + 0.15 - t) / 0.25)) : restX
    const es = eeState(t)
    const eOpts = { color: EE, mood: es.mood, look: es.look, blink: es.blink, blush: es.blush, hops: E_HOPS, seed: 5, glow: 1.15, alpha: a }
    drawStarChar(x, eX, E_Y, E_S, t, eOpts)
    paintTips(x, starFrame(eX, E_Y, E_S, t, eOpts), t, a)
    // the roller: up against the wall while painting; on the ground after the drop (D); back up for the ending (E)
    const dropK = ease.inCubic(prog(t, ...T.drop)) * (t < T.h4 ? 1 : 0)
    const up = P ? 1 : 0
    const rx = P ? edgeX(ws2.k) - 20 : eX - 150, ry = P ? MUR.y + 170 + 40 * Math.sin(t * 9) : E_Y + 80
    const col = PAINT[[T.paint0, T.paint1, T.paint2, T.paint3, T.paint4].indexOf(P) % PAINT.length] || PAINT[1]
    if (dropK > 0 && t < T.h4) roller(x, eX - 170, lerp(E_Y + 80, WALL.y1 + 20, dropK), 1, lerp(-0.2, -1.5, dropK), PAINT[1], a)
    else roller(x, rx, ry, 1, up ? -0.35 : -0.2, col, a)
    if (P) sparkle(x, edgeX(ws2.k), MUR.y, t, P[1] - 0.05, { n: 8, R: 140, seed: 13 + P[0] * 3, size: 22 })
    if (t > T.drop[1] && t < T.h4) sparkle(x, eX - 200, WALL.y1, t, T.drop[1], { n: 6, R: 90, seed: 7, size: 18 })
    // Leo
    const ls = leoState(t)
    drawStarChar(x, L_P.x, L_P.y, L_P.s, t, { color: LEO.color, glyph: LEO.glyph, mood: ls.mood, look: ls.look, blink: ls.blink, blush: ls.blush, hops: L_HOPS, seed: 9, alpha: a })
    if (t > T.paint4[0]) roller(x, L_P.x + 120, L_P.y + 80, 0.9 * pop01(t, T.paint4[0] - 0.1, 0.3, 2), -0.5, PAINT[6], a)
    // chips + placards
    chip(x, 540, 650, 'ANSWER: SEE WALL', pop01(t, T.ansChip, 0.34, 2.6) * outK(t, T.B - 0.3) * a, { size: 32, col: EE, edge: EE })
    const rowsOut = outK(t, T.h3 - 0.3, 0.25) * a
    meantRead(x, 540, 640, 'I LIKE YOU', 'STRAWBERRY', pop01(t, T.row1, 0.34, 2.4) * rowsOut)
    meantRead(x, 540, 730, 'HOLD HANDS?', 'TWO TACOS', pop01(t, T.row2, 0.34, 2.4) * rowsOut)
    meantRead(x, 540, 820, 'YOU LIGHT ME UP', 'WEATHER?', pop01(t, T.row3, 0.34, 2.4) * rowsOut)
    // THE STARS (D)
    if (t > T.narrIn && t < T.h4 + 0.4) {
      const k = pop01(t, T.narrIn, 0.45, 2.2) * outK(t, T.h4 - 0.1, 0.4)
      drawStarChar(x, NARR.x, NARR.y, NARR.s, t, { color: STARC.sky, mood: t < T.drop[0] ? 'squint' : t < T.heart ? 'happy' : 'sparkle', look: [0, 1], hops: N_HOPS, seed: 3, pop: k, alpha: a, glow: 1.2 })
    }
    if (t > T.gulp && t < T.gulp + 0.6) aside(x, eX + 40, E_Y - 200, 'gulp.', pop01(t, T.gulp, 0.25, 2.4) * outK(t, T.gulp + 0.4, 0.2), { size: 30, edge: EE, tx: eX, ty: E_Y - 110 })
    if (t > T.heart) floatHearts(x, t, 520, 1120, T.heart, 25, 1, 7, 420)
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

// ── sound (A-minor-ish palette; the engine moves pitched cues into the key)
const NOTE = [440, 493.88, 523.25, 587.33, 659.25, 783.99, 880]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const rollCues = ([a, b], n = 6) => Array.from({ length: n }, (_, i) => ['whoosh', r3(Math.max(0.05, a) + i * (b - Math.max(0.05, a)) / n), 0.18, 0.012])
const FILM_CUES = [
  // A
  ['pop', 0.05, 880, 0.04, 0], ['pluck', 0.12, 1318.51, 0.035, 0.6, 0.1], ...rollCues([0.05, T.paint0[1]], 8),
  ['pop', T.ansChip, 1046.5, 0.04, 0],
  // B
  ...wordPops(T.h1, 2, 0.1, 2, 0.026), ['pop', r3(T.h1Late), 1046.5, 0.05, 0], ['pluck', r3(T.h1Late + 0.14), 880, 0.045, 0.6, 0],
  ...rollCues(T.paint1, 4), ['pop', T.row1, 659.25, 0.04, 0], ['tick', r3(T.row1 + 0.2), 0.04],
  ['pop', T.pisIn, 659.25, 0.035, 0.5], ['pop', T.pisCry, 523.25, 0.04, 0.5], ['pop', r3(T.pisCry + 0.12), 440, 0.035, 0.5],
  // C
  ...wordPops(T.h2, 2, 0.1, 1, 0.026), ['pop', r3(T.h2Late), 987.77, 0.05, 0],
  ...rollCues(T.paint2, 4), ...rollCues(T.paint3, 4), ['pop', T.row2, 783.99, 0.04, 0], ['pop', T.row3, 880, 0.04, 0], ['tick', r3(T.row3 + 0.2), 0.04],
  // D
  ...wordPops(T.h3, 2, 0.1, 3, 0.026), ['pop', r3(T.h3Late), 1046.5, 0.05, 0], ['pluck', r3(T.h3Late), 783.99, 0.05, 0.7, 0],
  ['pop', T.narrIn, 1174.66, 0.04, 0.4], ['bell', r3(T.narrIn + 0.05), 1760, 0.02, 1.2, 0.4],
  ['boom', T.drop[1], 0.07], ['tick', T.drop[1], 0.06], ['tick', r3(T.drop[1] + 0.14), 0.04], ['pop', T.gulp, 330, 0.04, 0.2],
  ['bell', T.heart, 1318.51, 0.035, 1.6, 0], ['pluck', r3(T.heart + 0.08), 1567.98, 0.035, 0.5, 0], ['glitter', T.heart, r3(T.heart + 0.6)],
  // E
  ...wordPops(T.h4, 3, 0.1, 0, 0.028), ['pop', r3(T.h4Late), 1046.5, 0.05, 0],
  ...rollCues(T.paint4, 6), ['bell', T.paint4[1], 1046.5, 0.04, 2.0, 0], ['glitter', T.paint4[1], r3(T.paint4[1] + 0.7)],
  ['pop', T.pisTop, 783.99, 0.03, 0.4],
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [TAG_E]: 1046.5, [TAG_L]: 659.25, [TAG_N]: 880 } })),
]

// card-cut candidates; cardfx plays exactly ONE (the middle one, 10.35):
//   5.35  box 1 shut (5.3), H0 out → "Leo can't read murals." (5.42)
//  10.35  H1 out (10.05–10.27), box 2 shut (10.25) → the next mural (10.5)
//  16.25  box 3 shut (16.2) → "Use your words." (16.3)
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
