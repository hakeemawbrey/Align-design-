// hxasiatown · NEIGHBORHOOD STARS: "Asiatown." (Star Talk: Houston, 30 s vertical) · story 0–25.6, then the shared END
// CARD (default CTA). Asiatown (Bellaire Blvd) gets its own star: the late-night foodie, bubble tea always in hand, a
// crawl list as long as the boulevard. Show bug "★ NEIGHBORHOOD STARS · ASIATOWN" top-left the whole story (no numbers).
//   0.00–5.30   HOOK "Asiatown’s star | planned *nine* stops." — the plaza at night (pictogram signs, a pole sign, palms),
//               the ASIATOWN STAR sipping boba (one straw) while its crawl list unrolls to the sidewalk:
//               ASIATOWN: "nine stops. dumplings *first*. boba between."
//   5.40–10.25  "Stop two. | Virgo is *full.*" — a plaza table under lanterns: dumplings + a noodle bowl. ♍ VIRGO STAR
//               (rounder by the bite): "I'm… *full*?" ASIATOWN: "but stop three has *noodles*!"
//               ♓ Pisces cries into its soup at the next table ("the broth is so pretty!!").
//  10.35        the one card cut (cardfx picks the middle candidate)
//  10.45–16.20 "Three. Four. | *Five.*" — rule of three: bao, skewers, another bowl slam onto the table, each word on a
//               landing; Virgo gets rounder and sleepier. VIRGO: "can we just… *sit*?" ASIATOWN: "sit?! stop six has
//               *dessert*!"
//  16.30–21.95 "One table. | *One* bowl." — THE STARS: "Asiatown. pick *one*. stay a while." The pile poofs, the
//               list rolls itself up, the lanterns warm; one big shared bowl, two pairs of chopsticks. VIRGO: "wait… *best*
//               stop yet." Asiatown: heart eyes.
//  22.15–25.30 "Slow down. | *Share* it." — the boba comes back with TWO straws (rhymes with frame 0's one straw); Pisces
//               happy-cries in a lit shop window. Last line = that headline.
// Rewatch bait: the last item on the crawl list is "ROOM FOR DESSERT?", and the pole sign's dumpling panel winks.
// One canvas, DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, SKY_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR as STARC, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, PINK, AMBER, sparkle, chip, starFrame, inSprite, tearsCells, aside, showBug, table, pool, floatHearts, plaza, lanterns, boba, noodleBowl, steamer, skewers, chopsticks, crawlList } from './props.js'

export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const inK = (t, a, d = 0.3) => ease.outCubic(prog(t, a, a + d))

const ASI = '#6fd6c8'                                  // the Asiatown star: boba-mint, no sign glyph (a neighborhood)
const VIR = signStar('virgo'), PIS = signStar('pisces')
const TAG_A = 'ASIATOWN STAR', TAG_V = `${VIR.glyph} VIRGO STAR`, TAG_N = 'THE STARS'
const CPS = 28
const BOX1 = [{ t: 1.5, speaker: TAG_A, color: ASI, text: 'nine stops. dumplings *first*. boba between.' }]
const BOX2 = [
  { t: 5.6, speaker: TAG_V, color: '#bfe6a8', text: "I'm… *full*?" },
  { t: 7.75, speaker: TAG_A, color: ASI, text: 'but stop three has *noodles*!' },
]
const BOX3 = [
  { t: 10.75, speaker: TAG_V, color: '#bfe6a8', text: 'can we just… *sit*?' },
  { t: 13.2, speaker: TAG_A, color: ASI, text: 'sit?! stop six has *dessert*!' },
]
const BOX4 = [
  { t: 16.4, speaker: TAG_N, text: 'Asiatown. pick *one*. stay a while.' },
  { t: 19.55, speaker: TAG_V, color: PINK, text: 'wait… *best* stop yet.' },
]
const BOXES = [[BOX1, 1.3, 5.3], [BOX2, 5.55, 10.25], [BOX3, 10.55, 16.2], [BOX4, 16.25, 22.05]]

// ── timeline
const T = {
  h0Out: 5.1, unroll: [0, 2.2], sip: [3.2, 3.9], plansHop: 2.6,
  B: 5.4, h1: 5.42, h1Late: 6.2, h1Out: 10.05, dish: [5.6, 5.85], full: 6.4, pisIn: 7.0, pisCry: 8.6,
  C: 10.4, h2: 10.74, h2Gap: 0.8, h2Late: 12.34, h2Out: 16.05, d: [10.55, 11.35, 12.15], yawn: 14.6,
  h3: 16.3, h3Late: 17.05, h3Out: 21.75, narrIn: 16.3, poof: 18.1, roll: [18.1, 18.7], bowl: [18.35, 18.85], warm: [18.2, 19.2], looks: 19.6, heart: 20.6,
  h4: 22.15, h4Late: 22.75, tea: 22.35, teaLand: 22.85, pisWin: 23.2, fade: [24.95, 25.3],
}
const late = t => t >= T.B

// ── layout
const GROUND = 1410
const A_A = { x: 760, y: 1290, s: 300 }
const A_T = { x: 300, y: 1215, s: 230 }, V_T = { x: 790, y: 1215, s: 230 }
const TABLE_Y = 1348
const NARR = { x: 745, y: 800, s: 160 }
const ITEMS = ['DUMPLINGS', 'NOODLE SOUP', 'BOBA', 'BAO', 'SKEWERS', 'DESSERT', 'MORE BOBA', 'SHAVED ICE', 'ROOM FOR DESSERT?']

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 36px Inter", "800 30px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const bug = showBug(el, root, 'ASIATOWN')
  // frame 0 is the thumbnail: the hook is already fully on screen at t = 0
  const H0 = popText(root, 'Asiatown’s star | planned *nine* stops.', { top: 190, size: 104, accentSize: 150, at: -1.2, gap: 0.1, late: 2, lateAt: -0.7, wobble: true, accentColor: ASI, fit: true })
  const H1 = popText(root, 'Stop two. | Virgo is *full.*', { top: 190, size: 108, accentSize: 160, at: T.h1, gap: 0.1, late: 1, lateAt: T.h1Late, wobble: true, accentColor: '#bfe6a8', fit: true })
  const H2 = popText(root, 'Three. Four. | *Five.*', { top: 190, size: 112, accentSize: 180, at: T.h2, gap: T.h2Gap, late: 1, lateAt: T.h2Late, wobble: true, accentColor: AMBER })
  const H3 = popText(root, 'One table. | *One* bowl.', { top: 190, size: 112, accentSize: 170, at: T.h3, gap: 0.1, late: 2, lateAt: T.h3Late, lateGap: 0.14, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Slow down. | *Share* it.', { top: 190, size: 112, accentSize: 176, at: T.h4, gap: 0.1, late: 2, lateAt: T.h4Late, lateGap: 0.14, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.fade[0]]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const A_HOPS = [T.plansHop, ...talkHops(BOX1, TAG_A, { cps: CPS }), T.B + 0.2, ...talkHops([...BOX2, ...BOX3], TAG_A, { cps: CPS }), ...T.d.map(v => v + 0.1), T.heart, T.teaLand + 0.1]
  const V_HOPS = [T.B + 0.25, T.full, ...talkHops([...BOX2, ...BOX3, ...BOX4], TAG_V, { cps: CPS }), T.teaLand]
  const N_HOPS = [T.narrIn + 0.3, ...talkHops(BOX4, TAG_N, { cps: CPS }), T.poof]

  function asiState(t) {
    if (t < T.sip[0]) return { mood: 'sparkle', look: [-1, 0.2] }               // admiring the list
    if (t < T.sip[1]) return { mood: 'happy', look: [0, 0] }                     // sip
    if (t < T.B) return { mood: 'wink', look: [0, 0] }
    if (t < 7.75) return { mood: 'sparkle', look: [1, 0.6] }                     // eyes on the food
    if (t < T.C) return { mood: 'happy', look: [1, 0] }
    if (t < 13.2) return { mood: 'sparkle', look: [0, 1] }                       // still eating
    if (t < 16.45) return { mood: 'happy', look: [1, 0] }
    if (t < T.poof) return { mood: 'wide', look: [1, -1], blink: false }        // the STARS?
    if (t < T.heart) return { mood: 'neutral', look: [1, 0] }
    if (t < T.h4) return { mood: 'heart' }
    return { mood: 'happy', look: [1, 0], blush: 1 }
  }
  function virState(t) {
    if (t < T.full) return { mood: 'happy', look: [-1, 0.6], sq: 0 }
    if (t < T.C) return { mood: 'wide', look: [0, 0], blink: false, sq: 0.07 }
    const k = T.d.filter(d => t > d + 0.12).length
    if (t < T.yawn) return { mood: k >= 2 ? 'squint' : 'wide', look: [-1, 0.5], sq: 0.07 + 0.05 * k }
    if (t < T.poof) return { mood: 'sleepy', look: [0, 0], sq: 0.22, zzz: false }
    const rel = ease.outCubic(prog(t, T.poof, T.poof + 0.8))
    if (t < T.looks) return { mood: 'neutral', look: [-1, 0.6], sq: lerp(0.22, 0.04, rel) }
    if (t < T.h4) return { mood: 'sparkle', look: [-1, 0], sq: 0.04 }
    return { mood: 'happy', look: [-1, 0], blush: 1, sq: 0.03 }
  }
  function narrState(t) {
    if (t < 16.45) return { mood: 'wide', look: [-1, 1] }
    if (t < T.poof) return { mood: 'squint', look: [-1, 1] }
    if (t < T.heart) return { mood: 'happy', look: [0, 0] }
    return { mood: 'sparkle', look: [0, 1] }
  }

  // ── A: the hook — the star on the boulevard, list unrolling, one straw
  function drawA(t) {
    const out = outK(t, T.B - 0.25)
    const len = lerp(260, 500, ease.outCubic(prog(t, ...T.unroll)))
    crawlList(x, 290, 640, 420, len, ITEMS, { a: out })
    const st = asiState(t)
    const sipK = Math.sin(Math.PI * prog(t, ...T.sip))
    drawStarChar(x, A_A.x, A_A.y, A_A.s, t, { color: ASI, mood: st.mood, look: st.look, blink: st.blink, hops: A_HOPS, seed: 5, pop: out, glow: 1.15 })
    boba(x, A_A.x + 190, A_A.y + 120 - 40 * sipK, 1.05 * out, t, { straws: 1, rot: -0.12 - 0.25 * sipK, level: lerp(1, 0.82, prog(t, ...T.sip)) })
    if (t > T.sip[1]) sparkle(x, A_A.x + 150, A_A.y - 40, t, T.sip[1] - 0.1, { n: 8, R: 110, seed: 4, size: 22 })
    chip(x, 290, 1210, 'NINE STOPS · ONE NIGHT', pop01(t, 2.6, 0.34, 2.6) * out, { size: 28, col: ASI, edge: ASI })
  }

  // ── B–E: the plaza table under the lanterns
  function drawLate(t) {
    const a = inK(t, T.B, 0.25) * (1 - ease.inQuad(prog(t, ...T.fade)))
    const warm = ease.inOutCubic(prog(t, ...T.warm))
    lanterns(x, t, -20, 1100, 640, { a, lit: 0.6 + 0.4 * warm, n: 8, sag: 70 })
    pool(x, 545, TABLE_Y, 460, 150, warm * a)
    // Pisces: crying into its soup at the next table (B, C) → happy-crying in a lit window (E)
    if (t > T.pisIn && t < T.h3) {
      const k = pop01(t, T.pisIn, 0.36, 2.2) * a * outK(t, T.h3 - 0.3, 0.25)
      const P = { x: 1000, y: 1250, s: 96 }
      const opts = { color: PIS.color, mood: t < T.pisCry ? 'neutral' : 'squint', look: [-1, 0.6], seed: 11, pop: k, glow: 0.8, hops: [T.pisIn + 0.3, T.pisCry] }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      if (t > T.pisCry) { const F = starFrame(P.x, P.y, P.s, t, opts); x.save(); x.globalAlpha = k; inSprite(x, F, () => tearsCells(x, t, 3)); x.restore() }
      noodleBowl(x, P.x - 10, P.y + 72, 0.55 * k, t, { a: k })
      if (t < T.C) aside(x, 800, 1010, 'the broth is so pretty!!', pop01(t, T.pisCry, 0.3, 2.4) * a * outK(t, T.C - 0.4), { size: 30, edge: PIS.color, tx: P.x, ty: P.y - 40 })
    }
    if (t > T.pisWin) {
      const k = pop01(t, T.pisWin, 0.4, 2.2) * a
      const opts = { color: PIS.color, mood: 'happy', look: [-1, 1], seed: 11, pop: k, glow: 0.9, bob: 2 }
      const P = { x: 930, y: 905, s: 84 }
      x.save(); x.globalAlpha = a * k; x.fillStyle = '#1b1236'; x.fillRect(P.x - 62, P.y - 56, 124, 112); x.fillStyle = '#ffd98a'; x.fillRect(P.x - 54, P.y - 48, 108, 96); x.restore()
      drawStarChar(x, P.x, P.y + 6, P.s, t, opts)
      const F = starFrame(P.x, P.y + 6, P.s, t, opts); x.save(); x.globalAlpha = a * k; inSprite(x, F, () => tearsCells(x, t, 2)); x.restore()
    }
    // the two stars
    const as = asiState(t), vs = virState(t)
    drawStarChar(x, V_T.x, V_T.y, V_T.s, t, { color: VIR.color, glyph: VIR.glyph, mood: vs.mood, look: vs.look, blink: vs.blink, blush: vs.blush, zzz: vs.zzz, squash: vs.sq, hops: V_HOPS, seed: 9, pop: pop01(t, T.B + 0.05, 0.4, 2.2), alpha: a })
    drawStarChar(x, A_T.x, A_T.y, A_T.s, t, { color: ASI, mood: as.mood, look: as.look, blink: as.blink, blush: as.blush, hops: A_HOPS, seed: 5, pop: pop01(t, T.B, 0.4, 2.2), alpha: a, glow: 1.1 })
    table(x, 150, 930, TABLE_Y, { a, cloth: '#3a2d78', edge: ASI })
    // the pile: B's two dishes, C's three slams; all poof at T.poof
    const pileA = a * (t < T.poof ? 1 : 0)
    const drop = (t0, X, Y, fn) => { const k = ease.outCubic(prog(t, t0, t0 + 0.22)); if (k > 0) fn(X, lerp(Y - 260, Y, k), pop01(t, t0, 0.3, 2.6)) }
    drop(T.dish[0], 450, TABLE_Y, (X, Y, k) => steamer(x, X, Y, 0.95 * k, t, { a: pileA }))
    drop(T.dish[1], 640, TABLE_Y, (X, Y, k) => noodleBowl(x, X, Y, 0.85 * k, t, { a: pileA }))
    drop(T.d[0], 440, TABLE_Y - 64, (X, Y, k) => steamer(x, X, Y, 0.85 * k, t, { a: pileA, bao: true }))
    drop(T.d[1], 650, TABLE_Y - 58, (X, Y, k) => skewers(x, X, Y, 0.9 * k, pileA))
    drop(T.d[2], 545, TABLE_Y - 120, (X, Y, k) => noodleBowl(x, X, Y, 0.8 * k, t, { a: pileA, col: AMBER }))
    for (const d of T.d) sparkle(x, 545, TABLE_Y - 80, t, d + 0.2, { n: 6, R: 120, seed: 30 + d * 10, size: 20, dur: 0.5 })
    if (t > T.poof) sparkle(x, 545, TABLE_Y - 90, t, T.poof, { n: 14, R: 240, seed: 61 })
    // the crawl list in C: hanging off the table edge, struck through as they go; rolls up at the poof
    const listK = a * pop01(t, T.C + 0.2, 0.4, 2) * (1 - ease.inCubic(prog(t, ...T.roll)))
    if (listK > 0.01) crawlList(x, 108, 860, 196, lerp(470, 40, ease.inCubic(prog(t, ...T.roll))), ITEMS.map(s => s.length > 10 ? s.slice(0, 9) + '…' : s), { a: listK, struck: 2 + T.d.filter(d => t > d + 0.2).length, title: 'CRAWL' })
    // D: one big shared bowl, two pairs of chopsticks
    if (t > T.bowl[0]) {
      const land = ease.outCubic(prog(t, ...T.bowl)), k = pop01(t, T.bowl[0], 0.5, 1.8)
      noodleBowl(x, 545, lerp(1180, TABLE_Y, land), 1.35 * k, t, { a, col: PINK })
      chopsticks(x, 470, TABLE_Y - 70, 0.85 * k, -0.6, a * land)
      chopsticks(x, 620, TABLE_Y - 70, 0.85 * k, 0.6, a * land, '#c9a6ff')
      if (t > T.bowl[1]) sparkle(x, 545, TABLE_Y - 80, t, T.bowl[1] - 0.05, { n: 10, R: 170, seed: 77 })
    }
    // E: the boba, now with two straws
    if (t > T.tea) {
      const land = ease.outCubic(prog(t, T.tea, T.teaLand)), k = pop01(t, T.tea, 0.5, 1.6)
      boba(x, 545, lerp(1500, TABLE_Y - 120, land), 0.9 * k, t, { a, straws: 2 })
      sparkle(x, 545, TABLE_Y - 230, t, T.teaLand - 0.05, { n: 10, R: 150, seed: 79 })
      chip(x, 545, TABLE_Y - 450, 'ONE STOP · TWO STRAWS', pop01(t, T.teaLand + 0.1, 0.3, 2.4) * a, { size: 28, col: GOLD, edge: GOLD })
    }
    // chips: the stop counter (words, not numbers)
    if (t < T.C) chip(x, 545, 640, 'STOP TWO OF NINE', pop01(t, T.dish[1] + 0.1, 0.3, 2.4) * a * outK(t, T.C - 0.25), { size: 34, col: AMBER, edge: AMBER })
    // THE STARS (D)
    if (t > T.narrIn && t < T.h4 + 0.4) {
      const st = narrState(t)
      drawStarChar(x, NARR.x, NARR.y, NARR.s, t, { color: STARC.sky, mood: st.mood, look: st.look, hops: N_HOPS, seed: 3, pop: pop01(t, T.narrIn, 0.45, 2.2) * outK(t, T.h4 - 0.1, 0.4), alpha: a, glow: 1.2 })
    }
    if (t > T.heart) floatHearts(x, t, 545, 1090, T.heart, 25, 1, 7, 360)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const fadeAll = 1 - ease.inQuad(prog(t, ...T.fade))
        const warm = ease.inOutCubic(prog(t, ...T.warm))
        plaza(x, t, { y: GROUND, alpha: fadeAll * (late(t) ? lerp(0.85, 0.6, warm) : 1), dim: late(t) ? 0.25 + 0.4 * warm : 0 })
        if (!late(t)) drawA(t)
        else drawLate(t)
      }
      bug.style.opacity = String(outK(t, END - 0.35, 0.3))
      for (const [H, o] of HEADS) H.update(t, outK(t, o, 0.22))
      for (const b of boxes) b.update(t)
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette; the engine moves pitched cues into the key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FILM_CUES = [
  // A
  ['pop', 0.05, 1174.66, 0.04, 0], ['pluck', 0.12, 1479.98, 0.035, 0.6, 0.1], ['whoosh', 0.1, 1.6, 0.02],
  ...[0.5, 0.9, 1.3, 1.7].map((v, i) => ['tick', v, 0.03 + 0.004 * i]),
  ['pop', 2.6, 1318.51, 0.04, -0.4], ['pluck', T.sip[0], 659.25, 0.03, 0.5, 0.3], ['pop', r3(T.sip[0] + 0.3), 739.99, 0.03, 0.3], ['pop', r3(T.sip[0] + 0.45), 880, 0.03, 0.3],
  // B
  ...wordPops(T.h1, 2, 0.1, 2, 0.026), ['pop', r3(T.h1Late), 1174.66, 0.05, 0], ['pluck', r3(T.h1Late), 880, 0.045, 0.6, 0],
  ['tick', T.dish[0] + 0.22, 0.05], ['tick', T.dish[1] + 0.22, 0.05], ['pop', T.full, 440, 0.04, 0.4],
  ['pop', T.pisIn, 659.25, 0.035, 0.5], ['pop', T.pisCry, 587.33, 0.04, 0.5], ['pop', r3(T.pisCry + 0.12), 440, 0.035, 0.5],
  // C: three slams
  ...T.d.flatMap((d, i) => [['boom', r3(d + 0.2), 0.06 + 0.015 * i], ['tick', r3(d + 0.2), 0.05], ['pop', r3(d + 0.05), NOTE[(i * 2) % 7], 0.04, (i - 1) * 0.4]]),
  ['pluck', T.yawn, 440, 0.03, 0.8, 0.4],
  // D
  ...wordPops(T.h3, 2, 0.1, 3, 0.026), ['pop', r3(T.h3Late), 1174.66, 0.05, 0], ['pluck', r3(T.h3Late), 880, 0.05, 0.7, 0],
  ['pop', T.narrIn, 1318.51, 0.04, 0.4], ['bell', r3(T.narrIn + 0.05), 1760, 0.02, 1.2, 0.4],
  ['whoosh', T.poof - 0.1, 0.4, 0.04], ['glitter', T.poof, r3(T.poof + 0.6)], ['whoosh', T.roll[0], 0.5, 0.025],
  ['tick', T.bowl[1], 0.06], ['bell', T.bowl[1], 880, 0.04, 2.0, 0],
  ['pluck', T.looks, 1174.66, 0.04, 0.6, 0], ['bell', T.heart, 1318.51, 0.035, 1.6, 0], ['pluck', r3(T.heart + 0.08), 1760, 0.035, 0.5, 0],
  // E
  ...wordPops(T.h4, 2, 0.1, 0, 0.028), ['pop', r3(T.h4Late), 1174.66, 0.05, 0],
  ['whoosh', T.tea, 0.4, 0.04], ['tick', T.teaLand, 0.06], ['bell', T.teaLand, 1174.66, 0.04, 2.0, 0], ['glitter', T.teaLand, r3(T.teaLand + 0.7)],
  ['pop', T.pisWin, 880, 0.03, 0.4],
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [TAG_A]: 1174.66, [TAG_V]: 739.99, [TAG_N]: 880 } })),
]

// card-cut candidates; cardfx plays exactly ONE (the middle one, 10.35):
//   5.35  box 1 shut (5.3), H0 out → "Stop two." (5.42)
//  10.35  H1 out (10.05–10.27), box 2 shut (10.25) → the three slams (10.4)
//  16.25  box 3 shut (16.2) → "One table." (16.3)
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
