// hxsugarland · NEIGHBORHOOD STARS: "Sugar Land." (Star Talk: Houston, 30 s vertical) · story 0–25.6, then the shared END
// CARD (default CTA). Sugar Land gets its own star: the planner, with a perfect colour-blocked calendar on an easel, in a
// tidy suburb of matching hedges, a lake with a fountain and a gazebo. Show bug "★ NEIGHBORHOOD STARS · SUGAR LAND".
//   0.00–5.30   HOOK "Sugar Land’s star | plans *everything.*" — frame 0: the SUGAR LAND STAR colour-blocking the
//               calendar, pen in hand: "spontaneous date: Saturday, quarter past three. *sharp*." ("SPONTANEITY: SCHEDULED")
//   5.40–10.25  "Sagittarius | *improvises.*" — ♐ SAGITTARIUS STAR bounces in with a kite: "or… we just see where the
//               day *goes*?" The calendar trembles. ♓ Pisces sobs on the gazebo ("I love surprises!!").
//  10.35        the one card cut (cardfx picks the middle candidate)
//  10.45–16.20 "Kite? Kayak? | *Karaoke?*" — rule of three: each idea pops as Sag hops; the planner blocks them in, the
//               calendar overflows, the pen smokes. SUGAR LAND: "I need a *bigger* calendar."
//  16.30–21.95 "Meet in the | *middle.*" — THE STARS: "one plan. lots of *room*." The blocks poof; only Saturday stays, plus
//               a dashed blank square: "???". SUGAR LAND: "fine. one plan. one *blank* square." Sag: heart eyes.
//  22.15–25.30 "Plan a *little*. | Leave room." — the frame-0 framing again: the calendar, now almost empty, a heart
//               doodled into the blank square while they fly the kite over the lake. Pisces happy-cries. Last line.
// Times are written in words on screen ("quarter past three"): no numerals anywhere.
// Rewatch bait: the Saturday block is the only one that never moves, and Pisces is the only one cheering for chaos.
// One canvas, DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, SKY_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR as STARC, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, PINK, AMBER, BLUE, sparkle, chip, starFrame, inSprite, tearsCells, aside, showBug, floatHearts, suburb, calendar, kite, pen } from './props.js'

export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))

const SL = '#9fe08a'                                   // the Sugar Land star: manicured-lawn green, no sign glyph (a neighborhood)
const SAG = signStar('sagittarius'), PIS = signStar('pisces')
const TAG_S = 'SUGAR LAND STAR', TAG_G = `${SAG.glyph} SAGITTARIUS STAR`, TAG_N = 'THE STARS'
const CPS = 28
const BOX1 = [{ t: 1.3, speaker: TAG_S, color: SL, text: 'spontaneous date: Saturday, quarter past three. *sharp*.' }]
const BOX2 = [{ t: 6.0, speaker: TAG_G, color: SAG.color, text: 'or… we just see where the day *goes*?' }]
const BOX3 = [{ t: 12.8, speaker: TAG_S, color: SL, text: 'I need a *bigger* calendar.' }]
const BOX4 = [
  { t: 16.4, speaker: TAG_N, text: 'one plan. lots of *room*.' },
  { t: 19.0, speaker: TAG_S, color: PINK, text: 'fine. one plan. one *blank* square.' },
]
const BOXES = [[BOX1, 1.1, 5.3], [BOX2, 5.8, 10.25], [BOX3, 12.6, 16.2], [BOX4, 16.25, 22.13]]

// ── timeline
const T = {
  h0Out: 5.1, fill0: [-1.5, 3.6], schedChip: 3.9,
  B: 5.4, h1: 5.42, h1Late: 5.95, h1Out: 10.05, sagIn: 5.5, shake: [7.0, 8.0], pisIn: 7.6, pisCry: 8.4,
  C: 10.4, h2: 10.5, h2Gap: 0.8, h2Late: 12.1, h2Out: 16.05, ideas: [10.5, 11.3, 12.1], mess: [10.6, 13.2], smoke: [11.8, 16.3],
  h3: 16.3, h3Late: 16.95, h3Out: 21.75, narrIn: 16.3, poof: 17.6, keep: [17.6, 18.3], looks: 19.0, heart: 20.6,
  h4: 22.15, h4Late: 22.75, doodle: [22.3, 23.3], kite: [22.4, 23.6], pisGaz: 23.0, fade: [24.95, 25.3],
}

// ── layout
const LAWN = 1180, GROUND = 1390
const CAL = { x: 380, y: 830, w: 560, h: 420 }
const S_P = { x: 830, y: 1330, s: 240 }, G_P = { x: 560, y: 1370, s: 210 }
const NARR = { x: 860, y: 760, s: 150 }
const IDEAS = [['KITE?', 690, 640, PINK], ['KAYAK?', 880, 720, BLUE], ['KARAOKE?', 720, 800, AMBER]]

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 36px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const bug = showBug(el, root, 'SUGAR LAND')
  // frame 0 is the thumbnail: the hook is already fully on screen at t = 0
  const H0 = popText(root, 'Sugar Land’s star | plans *everything.*', { top: 190, size: 104, accentSize: 146, at: -1.2, gap: 0.1, late: 1, lateAt: -0.7, wobble: true, accentColor: SL, fit: true })
  const H1 = popText(root, 'Sagittarius | *improvises.*', { top: 190, size: 112, accentSize: 160, at: T.h1, gap: 0.1, late: 1, lateAt: T.h1Late, wobble: true, accentColor: SAG.color, fit: true })
  const H2 = popText(root, 'Kite? Kayak? | *Karaoke?*', { top: 190, size: 112, accentSize: 170, at: T.h2, gap: T.h2Gap, late: 1, lateAt: T.h2Late, wobble: true, accentColor: AMBER })
  const H3 = popText(root, 'Meet in the | *middle.*', { top: 190, size: 112, accentSize: 180, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3Late, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Plan a *little*. | Leave room.', { top: 190, size: 108, accentSize: 160, at: T.h4, gap: 0.1, late: 2, lateAt: T.h4Late, lateGap: 0.14, wobble: true, accentColor: PINK, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.fade[0]]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const S_HOPS = [0.7, 2.1, ...talkHops([...BOX1, ...BOX3, ...BOX4], TAG_S, { cps: CPS }), ...T.ideas.map(v => v + 0.35), T.keep[1], T.heart + 0.2, T.kite[0]]
  const G_HOPS = [T.sagIn + 0.3, ...talkHops([...BOX2], TAG_G, { cps: CPS }), ...T.ideas, T.heart, T.kite[0] + 0.1, T.kite[1]]
  const N_HOPS = [T.narrIn + 0.3, ...talkHops(BOX4.slice(0, 1), TAG_N, { cps: CPS }), T.poof]

  function sState(t) {
    if (t < T.schedChip) return { mood: 'happy', look: [-1, -0.4] }             // colour-blocking, blissful
    if (t < T.B) return { mood: 'sparkle', look: [0, 0] }
    if (t < 6.0) return { mood: 'happy', look: [-1, 0.4] }
    if (t < T.C) return { mood: 'wide', look: [-1, 0.4], blink: false }        // see where the day… goes?!
    if (t < 12.8) return { mood: 'squint', look: [-1, -0.4] }                  // blocking furiously
    if (t < 16.4) return { mood: 'wide', look: [0, 0], blink: false }
    if (t < T.keep[1]) return { mood: 'wide', look: [-1, -0.4] }
    if (t < T.heart) return { mood: 'neutral', look: [-1, 0.4] }
    if (t < T.h4) return { mood: 'happy', look: [-1, 0.4], blush: 1 }
    return { mood: 'happy', look: [-1, -1], blush: 1 }
  }
  function gState(t) {
    if (t < T.C) return { mood: 'sparkle', look: [1, -0.4] }
    if (t < T.h3) return { mood: 'happy', look: [1, -1] }
    if (t < T.looks) return { mood: 'neutral', look: [1, -0.4] }
    if (t < T.heart) return { mood: 'wide', look: [1, -0.4] }
    if (t < T.h4) return { mood: 'heart' }
    return { mood: 'happy', look: [0, -1], blush: 1 }
  }

  function draw(t) {
    const a = 1 - ease.inQuad(prog(t, ...T.fade))
    suburb(x, t, { y: LAWN, alpha: a })
    // Pisces on the gazebo: sobbing (B, C) → happy-crying (E)
    if (t > T.pisIn) {
      const k = pop01(t, T.pisIn, 0.36, 2.2) * a
      const opts = { color: PIS.color, mood: t < T.pisCry ? 'neutral' : t < T.h4 ? 'squint' : 'happy', look: [1, 0], seed: 11, pop: k, glow: 0.8, hops: [T.pisIn + 0.3, T.pisCry, T.pisGaz] }
      const P = { x: 150, y: LAWN - 80, s: 96 }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      if (t > T.pisCry) { const F = starFrame(P.x, P.y, P.s, t, opts); x.save(); x.globalAlpha = k; inSprite(x, F, () => tearsCells(x, t, t < T.h4 ? 3 : 2)); x.restore() }
      aside(x, 250, LAWN + 70, 'I love surprises!!', pop01(t, T.pisCry, 0.3, 2.4) * outK(t, T.C - 0.4) * a, { size: 30, edge: PIS.color, tx: P.x, ty: P.y - 40 })
    }
    // the calendar
    const shake = (t > T.shake[0] && t < T.shake[1] ? 1 : 0) + (t > T.ideas[0] && t < T.mess[1] ? 0.5 : 0)
    calendar(x, CAL.x, CAL.y, CAL.w, CAL.h, t, { a, fillK: prog(t, ...T.fill0), mess: t < T.poof ? prog(t, ...T.mess) : 0, keep: ease.inOutCubic(prog(t, ...T.keep)), doodle: prog(t, ...T.doodle), shake })
    if (t > T.poof && t < T.poof + 1) sparkle(x, CAL.x, CAL.y, t, T.poof, { n: 16, R: 320, seed: 61 })
    chip(x, CAL.x, CAL.y + CAL.h / 2 + 40, 'SPONTANEITY: SCHEDULED', pop01(t, T.schedChip, 0.34, 2.6) * outK(t, T.C - 0.25) * a, { size: 28, col: SL, edge: SL })
    chip(x, CAL.x, CAL.y + CAL.h / 2 + 40, 'SATURDAY · THE PARK · ???', pop01(t, T.keep[1], 0.34, 2.4) * outK(t, T.fade[0]) * a, { size: 28, col: PINK, edge: PINK })
    // Sag's ideas (C)
    IDEAS.forEach(([s, ix, iy, c], i) => chip(x, ix, iy, s, pop01(t, T.ideas[i], 0.3, 2.6) * outK(t, T.poof - 0.2, 0.25) * a, { size: 34, col: c, edge: c }))
    // the kite: tucked under Sag's arm (B–D) → flying over the lake (E)
    if (t > T.sagIn) {
      const fly = ease.inOutCubic(prog(t, ...T.kite))
      const kx = lerp(G_P.x + 120, 870, fly), ky = lerp(G_P.y - 30, 620, fly)
      kite(x, G_P.x + 60, G_P.y + 20, kx, ky, t, a * pop01(t, T.sagIn, 0.4, 2), lerp(0.8, 1.1, fly))
    }
    // Sagittarius
    if (t > T.sagIn) {
      const gs = gState(t)
      const bounce = t < T.C ? 0 : -0.06 * Math.max(0, Math.sin((t - T.C) * 8)) * (t < T.h3 ? 1 : 0)
      drawStarChar(x, G_P.x, G_P.y, G_P.s, t, { color: SAG.color, glyph: SAG.glyph, mood: gs.mood, look: gs.look, blush: gs.blush, hops: G_HOPS, seed: 9, pop: pop01(t, T.sagIn, 0.4, 2.2), alpha: a, squash: bounce })
    }
    // the Sugar Land star + pen
    const ss = sState(t)
    drawStarChar(x, S_P.x, S_P.y, S_P.s, t, { color: SL, mood: ss.mood, look: ss.look, blink: ss.blink, blush: ss.blush, hops: S_HOPS, seed: 5, glow: 1.1, alpha: a })
    const scrib = t < 3.6 || (t > T.ideas[0] && t < T.mess[1]) ? Math.sin(t * 22) * 0.15 : 0
    pen(x, S_P.x - 150, S_P.y - 10, 1, -0.5 + scrib, a, ease.inOutQuad(prog(t, ...T.smoke)) * (t < T.poof ? 1 : 0), t)
    // THE STARS (D)
    if (t > T.narrIn && t < T.h4 + 0.4) {
      const k = pop01(t, T.narrIn, 0.45, 2.2) * outK(t, T.h4 - 0.1, 0.4)
      drawStarChar(x, NARR.x, NARR.y, NARR.s, t, { color: STARC.sky, mood: t < T.poof ? 'squint' : t < T.heart ? 'happy' : 'sparkle', look: [-1, 1], hops: N_HOPS, seed: 3, pop: k, alpha: a, glow: 1.2 })
    }
    if (t > T.heart) floatHearts(x, t, 690, 1150, T.heart, 25, 1, 7, 360)
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

// ── sound (F-major palette; the engine moves pitched cues into the key)
const NOTE = [698.46, 783.99, 880, 932.33, 1046.5, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FILM_CUES = [
  // A: tidy little ticks as the blocks fill
  ['pop', 0.05, 1046.5, 0.04, 0], ['bell', 0.1, 1396.91, 0.02, 1.2, 0],
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(0.3 + i * 0.33), 0.022 + (i % 2) * 0.006]), ['pop', T.schedChip, 1318.51, 0.04, -0.3], ['tick', r3(T.schedChip + 0.12), 0.05],
  // B
  ...wordPops(T.h1, 1, 0.1, 2, 0.026), ['pop', r3(T.h1Late), 1174.66, 0.05, 0], ['pluck', r3(T.h1Late), 880, 0.045, 0.6, 0],
  ['pop', T.sagIn, 932.33, 0.035, 0], ['whoosh', T.shake[0], 0.6, 0.03], ...[0, 0.12, 0.24, 0.36].map(d => ['tick', r3(T.shake[0] + d), 0.03]),
  ['pop', T.pisIn, 659.25, 0.035, -0.5], ['pop', T.pisCry, 587.33, 0.04, -0.5], ['pop', r3(T.pisCry + 0.12), 440, 0.035, -0.5],
  // C: three ideas, each a hop
  ...T.ideas.flatMap((v, i) => [['pop', v, NOTE[(i * 2) % 7], 0.045, (i - 1) * 0.4], ['pluck', r3(v + 0.06), NOTE[(i * 2 + 2) % 7] * 2, 0.03, 0.4, (i - 1) * 0.4]]),
  ['whoosh', T.mess[0] + 1.2, 1.2, 0.03], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.mess[0] + 0.9 + i * 0.22), 0.025]),
  // D
  ...wordPops(T.h3, 3, 0.1, 3, 0.026), ['pop', r3(T.h3Late), 1174.66, 0.05, 0],
  ['pop', T.narrIn, 1318.51, 0.04, 0.4], ['bell', r3(T.narrIn + 0.05), 1760, 0.02, 1.2, 0.4],
  ['whoosh', T.poof - 0.1, 0.4, 0.04], ['glitter', T.poof, r3(T.poof + 0.6)], ['tick', T.keep[1], 0.05],
  ['bell', T.heart, 1318.51, 0.035, 1.6, 0], ['pluck', r3(T.heart + 0.08), 1567.98, 0.035, 0.5, 0],
  // E
  ...wordPops(T.h4, 3, 0.1, 0, 0.028), ['pop', r3(T.h4Late), 1046.5, 0.05, 0],
  ['whoosh', T.kite[0], 1.2, 0.035], ['bell', T.doodle[1], 1174.66, 0.04, 2.0, 0], ['glitter', T.doodle[1], r3(T.doodle[1] + 0.7)],
  ['pop', T.pisGaz, 880, 0.03, -0.4],
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [TAG_S]: 1046.5, [TAG_G]: 783.99, [TAG_N]: 880 } })),
]

// card-cut candidates; cardfx plays exactly ONE (the middle one, 10.35):
//   5.35  box 1 shut (5.3), H0 out → "Sagittarius improvises." (5.42)
//  10.35  H1 out (10.05–10.27), box 2 shut (10.25) → the first idea (10.5)
//  16.25  box 3 shut (16.2) → "Meet in the middle." (16.3)
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
