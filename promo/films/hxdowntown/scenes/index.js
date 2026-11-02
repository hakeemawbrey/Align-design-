// hxdowntown · NEIGHBORHOOD STARS: "Downtown." (Star Talk: Houston, 30 s vertical) · story 0–25.6, then the shared END
// CARD (default CTA). Downtown gets its own star: the busy commuter, briefcase and coffee, who knows every tunnel under the
// towers. A cutaway: towers and sky above the street, the tunnel below. Show bug "★ NEIGHBORHOOD STARS · DOWNTOWN".
//   0.00–5.30   HOOK "Downtown’s star | lives *underground.*" — frame 0: the DOWNTOWN STAR sprinting through the tunnel
//               (speed lines, coffee sloshing) under a street it never sees. DOWNTOWN: "tunnel to work. tunnel to
//               *lunch*. tunnel home."
//   5.40–10.25  "Monday. Tuesday. | *Wednesday.*" — rule of three: it zips across the tunnel once per word. ♎ LIBRA STAR
//               up on the street, waving down the stairwell: "hey! ever come *up* here?" DOWNTOWN (zipping): "can't! tunnel!"
//  10.35        the one card cut (cardfx picks the middle candidate)
//  10.45–16.20 "Then the sky | turns *pink.*" — sunset floods the top half; signs at the junction: THIS WAY: TUNNEL /
//               THIS WAY: SKY. LIBRA: "the sky's going *pink*. come see?" DOWNTOWN: "is there a *tunnel* to it?"
//               ♓ Pisces sobs by a tunnel window ("I miss the moon!!").
//  16.30–21.95 "Up the | *stairs.*" — Libra hops down, they hop up together, the camera tilts up to the street at sunset.
//               LIBRA: "one sunset. *with* me." DOWNTOWN: "whoa. was this up here all *week*?" Heart eyes.
//  22.15–25.30 "Come up | for *air.*" — the same stroll as frame 0's sprint, now slow, on the street, under the evening's
//               first stars; Pisces pops up the stairs, happy-crying. Last line = that headline.
// Rewatch bait: the briefcase is left on the sidewalk in the last shot, and the coffee has finally stopped steaming.
// One canvas, DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, SKY_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, PINK, AMBER, BLUE, sparkle, chip, starFrame, inSprite, tearsCells, aside, showBug, floatHearts, skyTint, towers, stairs, tunnel, briefcase, coffee, speedLines } from './props.js'

export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const inK = (t, a, d = 0.3) => ease.outCubic(prog(t, a, a + d))

const DT = '#8fb8ff'                                   // the Downtown star: glass-tower blue, no sign glyph (a neighborhood)
const LIB = signStar('libra'), PIS = signStar('pisces')
const TAG_D = 'DOWNTOWN STAR', TAG_L = `${LIB.glyph} LIBRA STAR`
const CPS = 28
const BOX1 = [{ t: 1.4, speaker: TAG_D, color: DT, text: 'tunnel to work. tunnel to *lunch*. tunnel home.' }]
const BOX2 = [{ t: 7.7, speaker: TAG_L, color: LIB.color, text: 'hey! ever come *up* here?' }]
const BOX3 = [
  { t: 10.6, speaker: TAG_L, color: LIB.color, text: "the sky's going *pink*. come see?" },
  { t: 13.6, speaker: TAG_D, color: DT, text: 'is there a *tunnel* to it?' },
]
const BOX4 = [
  { t: 16.4, speaker: TAG_L, color: LIB.color, text: 'one sunset. *with* me.' },
  { t: 19.2, speaker: TAG_D, color: PINK, text: 'whoa. was this up here all *week*?' },
]
const BOXES = [[BOX1, 1.2, 5.3], [BOX2, 7.5, 10.25], [BOX3, 10.55, 16.2], [BOX4, 16.25, 22.1]]

// ── timeline
const T = {
  h0Out: 5.1,
  B: 5.4, h1: 5.5, h1Gap: 1.0, h1Late: 7.5, h1Out: 10.05, zips: [5.45, 6.45, 7.45], libIn: 7.6, cant: 9.0,
  C: 10.4, h2: 10.5, h2Late: 11.3, h2Out: 16.05, sunset: [10.4, 12.6], signs: [11.8, 12.3], pisIn: 13.9, pisCry: 14.7,
  h3: 16.3, h3Late: 16.9, h3Out: 21.75, libDown: [16.7, 17.2], dWalk: [17.2, 17.7], up: [17.75, 18.45], cam: [17.9, 19.0], looks: 19.2, heart: 20.6,
  h4: 22.15, h4Late: 22.75, pisUp: 23.1, fade: [24.95, 25.3],
}

// ── layout (world coords; the camera tilts the world down by CAM px in D)
const G = 1000, CAM = 420, SX = 860
const D_Y = 1340, D_S = 220, LIB_STREET = { x: 700, y: G - 112, s: 190 }

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 36px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const bug = showBug(el, root, 'DOWNTOWN')
  // frame 0 is the thumbnail: the hook is already fully on screen at t = 0
  const H0 = popText(root, 'Downtown’s star | lives *underground.*', { top: 190, size: 104, accentSize: 140, at: -1.2, gap: 0.1, late: 1, lateAt: -0.7, wobble: true, accentColor: DT, fit: true })
  const H1 = popText(root, 'Monday. Tuesday. | *Wednesday.*', { top: 190, size: 100, accentSize: 150, at: T.h1, gap: T.h1Gap, late: 1, lateAt: T.h1Late, wobble: true, accentColor: AMBER, fit: true })
  const H2 = popText(root, 'Then the sky | turns *pink.*', { top: 190, size: 112, accentSize: 176, at: T.h2, gap: 0.1, late: 2, lateAt: T.h2Late, lateGap: 0.14, wobble: true, accentColor: PINK })
  const H3 = popText(root, 'Up the | *stairs.*', { top: 190, size: 116, accentSize: 190, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3Late, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Come up | for *air.*', { top: 190, size: 120, accentSize: 200, at: T.h4, gap: 0.1, late: 2, lateAt: T.h4Late, lateGap: 0.14, wobble: true, accentColor: LIB.color })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.fade[0]]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const D_HOPS = [...talkHops([...BOX1, ...BOX3, ...BOX4], TAG_D, { cps: CPS }), T.cant, T.dWalk[0], T.up[0], T.heart, T.h4 + 0.2]
  const L_HOPS = [T.libIn + 0.3, ...talkHops([...BOX2, ...BOX3, ...BOX4], TAG_L, { cps: CPS }), T.libDown[0], T.up[0], T.heart + 0.1]

  // where the Downtown star is (world coords) and how fast it's going (for the speed lines / scroll)
  function dPos(t) {
    if (t < T.B) return { x: 540 + 12 * Math.sin(t * 9), y: D_Y, run: 1 }
    if (t < T.zips[2] + 0.75) {
      const z = T.zips.findLast(v => t >= v) ?? T.zips[0], last = z === T.zips[2]
      const p = ease.inOutQuad(prog(t, z, z + (last ? 0.75 : 0.9)))
      return { x: last ? lerp(-160, 540, p) : lerp(-160, 1240, p), y: D_Y, run: p < 1 ? 1 : 0 }
    }
    if (t < T.dWalk[0]) return { x: 540, y: D_Y, run: 0 }
    if (t < T.up[0]) return { x: lerp(540, SX, ease.inOutQuad(prog(t, ...T.dWalk))), y: D_Y, run: 0.5 }
    if (t < T.h4) { const p = ease.inOutCubic(prog(t, ...T.up)); return { x: lerp(SX, 420, p), y: lerp(D_Y, LIB_STREET.y + 4, p) - Math.sin(Math.PI * p) * 90, run: 0 } }
    return { x: 420 + 14 * Math.sin((t - T.h4) * 1.4), y: LIB_STREET.y + 4, run: 0 }
  }
  function lPos(t) {
    if (t < T.libDown[0]) return { x: LIB_STREET.x, y: LIB_STREET.y }
    if (t < T.up[0]) { const p = ease.inOutQuad(prog(t, ...T.libDown)); return { x: lerp(LIB_STREET.x, SX + 40, p), y: lerp(LIB_STREET.y, D_Y + 10, p) - Math.sin(Math.PI * p) * 60 } }
    if (t < T.h4) { const p = ease.inOutCubic(prog(t, ...T.up)); return { x: lerp(SX + 40, LIB_STREET.x, p), y: lerp(D_Y + 10, LIB_STREET.y, p) - Math.sin(Math.PI * p) * 90 } }
    return { x: LIB_STREET.x - 30 + 10 * Math.sin((t - T.h4) * 1.4 + 1), y: LIB_STREET.y }
  }
  // tunnel scroll: fast while running in A, per zip in B, still after
  const scrollAt = t => t < T.B ? t * 900 : 5.4 * 900 + (t < T.zips[2] + 0.75 ? (t - T.B) * 300 : (T.zips[2] + 0.75 - T.B) * 300)

  function dState(t) {
    if (t < T.B) return { mood: 'squint', look: [1, 0] }                         // late, always
    if (t < T.cant) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.C) return { mood: 'squint', look: [1, -1] }
    if (t < 13.6) return { mood: 'neutral', look: [1, -1] }                    // …pink?
    if (t < T.h3) return { mood: 'wide', look: [1, -1] }
    if (t < T.up[1]) return { mood: 'wide', look: [1, -1], blink: false }
    if (t < T.looks) return { mood: 'wide', look: [0, -1], blink: false }      // the SKY
    if (t < T.heart) return { mood: 'sparkle', look: [1, -0.6] }
    if (t < T.h4) return { mood: 'heart' }
    return { mood: 'happy', look: [1, -0.4], blush: 1 }
  }
  function lState(t) {
    if (t < 9.4) return { mood: 'happy', look: [0, 1] }                         // peering down the stairs
    if (t < T.C) return { mood: 'eyeroll' }                                     // "can't! tunnel!"
    if (t < T.h3) return { mood: 'sparkle', look: [0, 1] }
    if (t < T.looks) return { mood: 'happy', look: [-1, 0.5] }
    return { mood: 'happy', look: [-1, 0], blush: 1 }
  }

  function draw(t) {
    const a = 1 - ease.inQuad(prog(t, ...T.fade))
    const cam = CAM * ease.inOutCubic(prog(t, ...T.cam))
    const sunset = ease.inOutCubic(prog(t, ...T.sunset)), day = 1 - sunset
    skyTint(x, G + cam, { day: 0.75 * day, sunset: sunset * (t < T.h4 ? 1 : lerp(1, 0.6, prog(t, T.h4, 25))), alpha: a })
    x.save(); x.translate(0, cam)
    towers(x, t, G, { alpha: a, lit: lerp(0.1, 0.4, sunset), glint: sunset * 0.7 })
    stairs(x, SX, G, { alpha: a, glow: sunset })
    tunnel(x, t, G, scrollAt(t), { alpha: a, sx: SX })
    // tunnel signs (C)
    const sk = outK(t, T.up[0], 0.25) * a
    chip(x, 300, G + 120, 'THIS WAY: TUNNEL', pop01(t, T.signs[0], 0.3, 2.4) * sk, { size: 26, col: BLUE, edge: BLUE })
    chip(x, SX - 70, G + 120 + 64, 'THIS WAY: SKY', pop01(t, T.signs[1], 0.3, 2.4) * sk, { size: 26, col: AMBER, edge: AMBER })
    // the days (B)
    if (t >= T.B && t < T.C) T.zips.forEach((z, i) => chip(x, 540, G + 140 + 0 * i, ['MONDAY', 'TUESDAY', 'WEDNESDAY'][i] + ' · SKY: NONE', pop01(t, z + 0.1, 0.3, 2.4) * (t < (T.zips[i + 1] ?? 9.9) ? 1 : 0) * a, { size: 26, col: GOLD, edge: GOLD }))
    // Pisces at a tunnel window (C, D) → pops up the stairs (E)
    if (t > T.pisIn && t < T.cam[1]) {
      const k = pop01(t, T.pisIn, 0.36, 2.2) * a
      const P = { x: 150, y: D_Y + 30, s: 100 }
      const opts = { color: PIS.color, mood: t < T.pisCry ? 'neutral' : 'squint', look: [0, -1], seed: 11, pop: k, glow: 0.8, hops: [T.pisIn + 0.3, T.pisCry] }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      if (t > T.pisCry) { const F = starFrame(P.x, P.y, P.s, t, opts); x.save(); x.globalAlpha = k; inSprite(x, F, () => tearsCells(x, t, 3)); x.restore() }
      aside(x, 300, D_Y - 130, 'I miss the moon!!', pop01(t, T.pisCry, 0.3, 2.4) * outK(t, T.h3 - 0.2) * a, { size: 30, edge: PIS.color, tx: P.x, ty: P.y - 40 })
    }
    if (t > T.pisUp) {
      const k = pop01(t, T.pisUp, 0.4, 2.2) * a, rise = ease.outCubic(prog(t, T.pisUp, T.pisUp + 0.4))
      const opts = { color: PIS.color, mood: 'happy', look: [-1, -1], seed: 11, pop: k, glow: 0.9, bob: 2 }
      const P = { x: SX + 10, y: lerp(G + 30, G - 60, rise), s: 90 }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      const F = starFrame(P.x, P.y, P.s, t, opts); x.save(); x.globalAlpha = k; inSprite(x, F, () => tearsCells(x, t, 2)); x.restore()
    }
    // Libra (on the street from B; down + up in D)
    if (t > T.libIn) {
      const L = lPos(t), ls = lState(t)
      drawStarChar(x, L.x, L.y, LIB_STREET.s, t, { color: LIB.color, glyph: LIB.glyph, mood: ls.mood, look: ls.look, blush: ls.blush, hops: L_HOPS, seed: 9, pop: pop01(t, T.libIn, 0.4, 2.2), alpha: a })
    }
    // the Downtown star + its briefcase and coffee
    const D = dPos(t), ds = dState(t)
    const tilt = D.run ? 0.1 : 0
    if (D.run) speedLines(x, D.x, D.y, t, D.run * a, -1)
    const dOpts = { color: DT, mood: ds.mood, look: ds.look, blink: ds.blink, blush: ds.blush, hops: D_HOPS, seed: 5, glow: 1.1, alpha: a, squash: D.run ? -0.06 + 0.05 * Math.sin(t * 24) : 0, bob: D.run ? 12 : undefined }
    drawStarChar(x, D.x, D.y, D_S, t, dOpts)
    if (t < T.h4) briefcase(x, D.x - 125, D.y + 60 + (D.run ? 8 * Math.sin(t * 24) : 0), 0.9, tilt - (D.run ? 0.2 : 0), a)
    else briefcase(x, 180, G - 34, 0.9, 0, a)                                // set down on the sidewalk at last
    coffee(x, D.x + 128, D.y + 40 + (D.run ? 6 * Math.sin(t * 24 + 1) : 0), 0.9, D.run ? 0.25 * Math.sin(t * 12) : 0, a, t < T.h4 ? t : T.h4)
    if (D.run && t < T.B) for (let i = 0; i < 3; i++) { const ph = (t * 2 + i / 3) % 1; x.save(); x.globalAlpha = a * (1 - ph); x.fillStyle = '#8fd8f6'; x.fillRect(D.x + 150 + ph * 30, D.y - 10 - ph * 40 + i * 10, 8, 8); x.restore() }
    if (t > T.cant && t < T.C) aside(x, 540, D_Y - 215, "can't! tunnel!", pop01(t, T.cant, 0.25, 2.4) * outK(t, T.C - 0.4) * a, { size: 30, edge: DT, tx: D.x, ty: D.y - 90 })
    if (t > T.up[1]) sparkle(x, 540, G - 120, t, T.up[1] - 0.05, { n: 12, R: 220, seed: 41 })
    if (t > T.heart) floatHearts(x, t, 560, G - 140, T.heart, 25, 1, 7, 380)
    x.restore()
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

// ── sound (E-minor-ish palette; the engine moves pitched cues into the key)
const NOTE = [659.25, 739.99, 783.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FILM_CUES = [
  // A: footsteps
  ['pop', 0.05, 1318.51, 0.04, 0], ['whoosh', 0.1, 1.2, 0.02],
  ...Array.from({ length: 14 }, (_, i) => ['tick', r3(0.2 + i * 0.36), 0.026 + (i % 2) * 0.006]),
  // B: three zips
  ...T.zips.flatMap((z, i) => [['whoosh', z, 0.6, 0.04], ['pop', r3(z + 0.05), NOTE[(i * 2) % 7], 0.045, (i - 1) * 0.5]]),
  ['pop', T.libIn, 987.77, 0.035, 0.4], ['pop', T.cant, 1174.66, 0.035, -0.2], ['tick', r3(T.cant + 0.1), 0.04],
  // C
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ['pop', r3(T.h2Late), 1174.66, 0.05, 0], ['pluck', r3(T.h2Late), 880, 0.045, 0.6, 0],
  ['glitter', T.sunset[0] + 0.4, r3(T.sunset[0] + 1.6)], ...T.signs.map((s, i) => ['pop', s, [880, 1318.51][i], 0.035, i ? 0.4 : -0.4]),
  ['pop', T.pisIn, 659.25, 0.035, -0.5], ['pop', T.pisCry, 587.33, 0.04, -0.5], ['pop', r3(T.pisCry + 0.12), 440, 0.035, -0.5],
  // D
  ...wordPops(T.h3, 2, 0.1, 3, 0.026), ['pop', r3(T.h3Late), 1174.66, 0.05, 0],
  ['pop', T.libDown[0], 783.99, 0.035, 0.3], ['tick', T.libDown[1], 0.04], ...[0, 0.14, 0.28, 0.42, 0.56].map(d => ['tick', r3(T.up[0] + d), 0.035]),
  ['whoosh', T.cam[0], 1.1, 0.04], ['boom', T.cam[1], 0.06], ['bell', T.cam[1], 1318.51, 0.035, 1.6, 0],
  ['bell', T.heart, 1318.51, 0.035, 1.6, 0], ['pluck', r3(T.heart + 0.08), 1567.98, 0.035, 0.5, 0], ['glitter', T.heart, r3(T.heart + 0.6)],
  // E
  ...wordPops(T.h4, 2, 0.1, 0, 0.028), ['pop', r3(T.h4Late), 1174.66, 0.05, 0], ['tick', T.h4, 0.04],
  ['pop', T.pisUp, 880, 0.03, 0.4],
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [TAG_D]: 987.77, [TAG_L]: 783.99 } })),
]

// card-cut candidates; cardfx plays exactly ONE (the middle one, 10.35):
//   5.35  box 1 shut (5.3), H0 out → the first zip (5.45)
//  10.35  H1 out (10.05–10.27), box 2 shut (10.25) → the sunset (10.4)
//  16.25  box 3 shut (16.2) → "Up the stairs." (16.3)
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
