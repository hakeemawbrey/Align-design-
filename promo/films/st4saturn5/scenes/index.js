// st4saturn5 (20 s vertical Align ad, Star Talk season 4 · EP 067, Saturn's class D5) · story 0–15.6, then the end card.
//   0.00–3.40  "Saturn's class: | your *own* standards."  Saturn (glasses, pointer) teaches three students at tiny desks
//              (♌ Leo, ♍ Virgo, ♎ Libra). Their scroll WE WANT SOMEONE WHO… unrolls, one demand per hop: texts back
//              fast · plans every date · is emotionally available · remembers birthdays · good with money · listens.
//              really. · has their life together.  The students beam.
//   3.40–9.20  "Saturn turns | the *scroll.*"  The pointer taps it and the scroll flips round: the tag now reads DO YOU?
//              ♄ SATURN: "now: do *you* do all this?" (three wide-eyed students) → "be the partner you're *asking* for."
//              Virgo nervously ticks one box, Leo ticks another. (Ghost: peeks out from behind the scroll's left edge.)
//   9.20–13.2  ★ LESSON UNLOCKED (lesson.js): "Be who you're | looking *for.*" +1 STANDARDS.
//  13.25 cut → "Be your own | *standard.*"  The students stand tall in a row; Saturn hands each a little gold star (a sticker that smiles); a wink.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// Saturn returns about every 29.5 years: the planet of structure, standards and growing up (stsaturn).
// One canvas (sky + constellation + class + scroll), DOM type + the dialogue box + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import { GOLD, BONE, INK, MONO, pop01, outK, popOut, popText, sparkles, glow, at, wordT, checkLines, wordPops, NOTE } from './kit.js'
import { drawSaturn, drawScroll, SAT } from './props.js'

export const DURATION = 20
const EP = 67
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const KEY = 'Dm'
const ST = '♄ SATURN'

const T = {
  h0: 0.15, h0Land: 0.95, h0Out: [3.25, 3.43],
  satIn: [0.25, 0.9], kids: [0.4, 0.55, 0.7], unroll: [0.9, 2.75],
  tap0: 3.25, turn: [3.45, 3.95],
  h1: 3.55, h1Land: 3.95, open: 3.85, s1: 4.0, s2: 6.55, checks: [8.05, 8.55], h1Out: [9.05, 9.23],
  close: 9.25,
  lesson: 9.2, lessonOut: [13.0, 13.2], scrollOut: [9.2, 9.6],
  cut: 13.25,
  h2: 13.32, h2Land: 13.7, stars: [13.95, 14.15, 14.35], wink: [14.6, 15.0],
  out: [15.05, 15.45], h2Out: [15.2, 15.44],
  ghost: 6.7,
}
const CPS = 28
const LINES = [
  { t: T.s1, speaker: ST, color: SAT, text: 'now: do *you* do all this?' },
  { t: T.s2, speaker: ST, color: SAT, text: "be the partner you're *asking* for." },
]
const LT = lineTimes(LINES, { cps: CPS })
checkLines(LT, LINES, T.close)
const T_YOU = wordT(LT, LINES, 0, 'you'), T_ASK = wordT(LT, LINES, 1, 'asking')
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Be who you’re | looking *for.*', chip: '+1 STANDARDS', accentColor: GOLD, dim: 0.55 }

const ITEMS = ['texts back fast', 'plans every date', 'is emotionally available', 'remembers birthdays', 'is good with money', 'listens. really.', 'has their life together']
  .map((text, i) => ({ text, at: T.unroll[0] + 0.1 + i * 0.24 }))
ITEMS[5].check = T.checks[0]; ITEMS[0].check = T.checks[1]

// layout
const SCR = { cx: 440, top: 655, w: 540, len: 555 }
const SATP = { x: 862, y: 1060, r: 86 }, SATF = { x: 540, y: 760, r: 100 }
const KIDS = [
  { id: 'leo', x: 200, fx: 290, seed: 2 },
  { id: 'virgo', x: 440, fx: 540, seed: 5 },
  { id: 'libra', x: 680, fx: 790, seed: 9 },
].map(k => ({ ...k, ...signStar(k.id) }))
const KY = 1300, KS = 150, FY = 1260, FS = 230
const after = t => t >= T.cut

const KID_ST = [
  [[0, { mood: 'happy' }], [T.unroll[0], { mood: 'sparkle', look: [1, -1] }], [T.unroll[1], { mood: 'heart' }], [T.turn[0], { mood: 'wide', look: [1, -1], blink: false }],
    [T_YOU, { mood: 'wide', look: [0, 0], blink: false }], [T.s2, { mood: 'neutral', look: [0, 1] }], [T.checks[1], { mood: 'happy' }], [T.lesson, { mood: 'sparkle' }], [T.cut, { mood: 'happy' }], [T.stars[0], { mood: 'heart' }]],
  [[0, { mood: 'happy' }], [T.unroll[0], { mood: 'happy', look: [0, -1] }], [T.unroll[1], { mood: 'sparkle', look: [0, -1] }], [T.turn[0], { mood: 'wide', look: [0, -1], blink: false }],
    [T_YOU, { mood: 'wide', look: [0, 0], blink: false }], [T.s2, { mood: 'squint', look: [0, -1] }], [T.checks[0], { mood: 'happy' }], [T.lesson, { mood: 'sparkle' }], [T.cut, { mood: 'happy' }], [T.stars[1], { mood: 'sparkle' }]],
  [[0, { mood: 'happy' }], [T.unroll[0], { mood: 'sparkle', look: [-1, -1] }], [T.unroll[1], { mood: 'happy' }], [T.turn[0], { mood: 'wide', look: [-1, -1], blink: false }],
    [T_YOU, { mood: 'wide', look: [0, 0], blink: false }], [T_YOU + 0.8, { mood: 'eyeroll' }], [T.s2, { mood: 'squint', look: [-1, 0] }], [T_ASK + 0.4, { mood: 'wide', look: [0, 0], blink: false }], [T.lesson, { mood: 'sparkle' }], [T.cut, { mood: 'happy' }], [T.stars[2], { mood: 'heart' }]],
]
const KID_HOPS = KIDS.map((_, i) => [T.kids[i] + 0.3, ...ITEMS.filter((_, j) => j % 3 === i).map(it => it.at + 0.02), T_YOU + 0.05 * i, T.lesson + 0.5 + 0.1 * i, T.cut + 0.2 + 0.1 * i, T.stars[i] + 0.05])
KID_HOPS[1].push(T.checks[0] - 0.05); KID_HOPS[0].push(T.checks[1] - 0.05)
KID_HOPS.forEach(h => h.sort((a, b) => a - b))

function satState(t) {
  if (t < T.unroll[1]) return { eyes: 'stern', look: [-1, 0] }
  if (t < T.turn[1]) return { eyes: 'open', look: [-1, 0] }
  if (t < T.checks[0]) return { eyes: 'stern', look: [-1, 1] }
  if (t < T.lesson) return { eyes: 'open', look: [-1, 1] }
  if (t < T.cut) return { eyes: 'happy', look: [0, 0] }
  if (t < T.stars[0]) return { eyes: 'open', look: [0, 1] }
  if (t >= T.wink[0] && t < T.wink[1]) return { eyes: 'wink', look: [0, 0] }
  return { eyes: 'happy', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "italic 500 150px 'EB Garamond'", "italic 600 44px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Saturn’s class: | your *own* standards.', { top: 180, size: 90, accentSize: 128, at: T.h0, times: [T.h0, T.h0 + 0.1, T.h0 + 0.5, T.h0Land, T.h0Land + 0.2], wobble: true, accentColor: SAT })
  const H1 = popText(root, 'Saturn turns | the *scroll.*', { top: 210, size: 96, accentSize: 140, at: T.h1, times: [T.h1, T.h1 + 0.1, T.h1 + 0.25, T.h1Land], wobble: true, accentColor: SAT })
  const H2 = popText(root, 'Be your own | *standard.*', { top: 200, size: 118, accentSize: 180, at: T.h2, times: [T.h2, T.h2 + 0.1, T.h2 + 0.2, T.h2Land], wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawDesk(cx, y, o) {
    if (o <= 0.01) return
    x.save(); x.globalAlpha *= clamp(o)
    x.fillStyle = INK; x.fillRect(cx - 92, y - 6, 184, 28); x.fillRect(cx - 74, y + 18, 18, 64); x.fillRect(cx + 56, y + 18, 18, 64)
    x.fillStyle = '#b06a3b'; x.fillRect(cx - 86, y, 172, 16); x.fillStyle = '#d98b52'; x.fillRect(cx - 86, y, 172, 5)
    x.fillStyle = '#7a4526'; x.fillRect(cx - 70, y + 22, 10, 56); x.fillRect(cx + 60, y + 22, 10, 56)
    x.restore()
  }

  function drawTheScroll(t) {
    if (t < T.unroll[0] || t > T.scrollOut[1]) return
    const len = SCR.len * ease.outCubic(prog(t, ...T.unroll))
    const o = 1 - ease.inCubic(prog(t, ...T.scrollOut))
    // the turn: squeeze to an edge and back (never mirrored); the tag swaps at the middle
    const tp = prog(t, ...T.turn), sx = Math.max(0.04, Math.abs(Math.cos(Math.PI * tp)))
    const turned = tp >= 0.5
    const bump = t > T.turn[1] && t < T.turn[1] + 0.4 ? 0.04 * Math.sin((t - T.turn[1]) / 0.4 * Math.PI) : 0
    x.save(); x.translate(SCR.cx, 0); x.scale(sx * (1 + bump), 1); x.translate(-SCR.cx, 0)
    drawScroll(x, t, SCR.cx, SCR.top, SCR.w, len, ITEMS, { alpha: o, rowH: 69, font: "italic 600 42px 'EB Garamond', serif" })
    // the tag on top: WE WANT SOMEONE WHO… → DO YOU?
    const label = turned ? 'DO YOU?' : 'WE WANT SOMEONE WHO…'
    const col = turned ? SAT : BONE
    x.globalAlpha = o * clamp(prog(t, T.unroll[0], T.unroll[0] + 0.2))
    x.font = `700 34px ${MONO}`; x.letterSpacing = '0.1em'; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(label).width + 40, ty = SCR.top - 64
    x.fillStyle = 'rgba(14,8,32,0.94)'; x.fillRect(SCR.cx - tw / 2 - 6, ty - 32, tw + 12, 64)
    x.fillStyle = turned ? '#3a2410' : '#2a1858'; x.fillRect(SCR.cx - tw / 2, ty - 26, tw, 52)
    x.fillStyle = col; x.fillText(label, SCR.cx + 4, ty + 2); x.letterSpacing = '0px'
    x.restore()
    if (turned) sparkles(x, t, SCR.cx, SCR.top - 64, T.turn[0] + 0.25, { n: 10, R: 220, size: 22, seed: 2, cols: [SAT, GOLD, BONE] })
  }

  function drawClass(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    const fin = after(t)
    // Saturn
    const st = satState(t)
    let P
    if (!fin) { const e = ease.outCubic(prog(t, ...T.satIn)); P = { cx: lerp(1300, SATP.x, e), cy: SATP.y - Math.abs(Math.sin(e * Math.PI * 2)) * 40 * (1 - e) + Math.sin(t * 1.9) * 6, r: SATP.r, k: t >= T.satIn[0] ? o : 0 } }
    else P = { cx: SATF.x, cy: SATF.y + Math.sin(t * 1.9) * 6, r: SATF.r, k: pop01(t, T.cut + 0.1, 0.4, 1.8) * o }
    let tap = 0
    for (const t0 of [T.tap0, T.s1 + 0.2, T.s2 + 0.25]) { const u = t - t0; if (u > 0 && u < 0.6) tap = Math.max(tap, Math.abs(Math.sin(u / 0.6 * Math.PI * 3)) * (1 - u / 0.6)) }
    const pointer = fin ? null : { ang: 196 + tap * 14, alpha: clamp(prog(t, T.satIn[1] - 0.2, T.satIn[1] + 0.1)) * o * (1 - prog(t, T.lesson, T.lesson + 0.3)) }
    drawSaturn(x, t, { ...P, ...st, pointer, glint: prog(t, T.h0Land, T.h0Land + 0.5) * (t < T.h0Land + 0.5 ? 1 : 0) })
    // students (+ desks before the cut)
    KIDS.forEach((k, i) => {
      const pk = (fin ? pop01(t, T.cut + 0.12 + i * 0.08, 0.36, 2.1) : pop01(t, T.kids[i], 0.36, 2.2)) * o
      if (pk <= 0.01) return
      const kx = fin ? k.fx : k.x, ky = fin ? FY : KY, ks = fin ? FS : KS
      if (!fin) drawDesk(kx, KY + 70, pk)
      const sweat = !fin && t > T_YOU && t < T.checks[0]
      const r = drawStarChar(x, kx, ky, ks, t, { color: k.color, glyph: k.glyph, ...at(t, KID_ST[i]), hops: KID_HOPS[i], seed: k.seed, pop: pk, squash: sweat ? 0.03 * Math.sin(t * 20 + i) : 0 })
      if (sweat && i !== 1) { const d = ((t - T_YOU) * 0.9 + i * 0.3) % 1; x.save(); x.globalAlpha = (1 - d) * o; x.fillStyle = '#8fd8f6'; x.fillRect(kx + ks * 0.32, r.top + ks * 0.28 + d * 50, 10, 14); x.restore() }
      // final: Saturn's gold star sticker lands on each student
      if (fin && t >= T.stars[i]) {
        const sk = pop01(t, T.stars[i], 0.3, 2.6)
        const sx = kx + ks * 0.02, sy = r.top - 60
        glow(x, sx, sy, 110, GOLD, 0.8 * sk * o)
        drawStarChar(x, sx, sy, 84, t, { color: GOLD, mood: 'happy', pop: sk, seed: 20 + i, zzz: false, glow: 1.3 })
        sparkles(x, t, sx, sy, T.stars[i], { n: 8, R: 90, size: 18, seed: i, cols: [GOLD, BONE, SAT] })
      }
    })
    drawTheScroll(t)
    // the ghost leans out from behind the scroll's left edge (drawn after the scroll)
    drawGhostCameo(x, t, { x: SCR.cx - SCR.w / 2, y: 960, at: T.ghost, dur: 1.25, from: 'right', cell: 3 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) drawClass(t)
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 3.45 (inert: hook → the turn), 13.25 (the lesson clears → "Be your own standard.", plays).
const CUTS = [3.45, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pop', T.h0Land + 0.2, 987.77, 0.035, 0],
  ['riser', T.satIn[0] - 0.1, T.satIn[1], 0.03], ['boom', T.satIn[1], 0.18], ['bell', T.h0Land + 0.1, 2093, 0.025, 1.0, 0.3],
  ...T.kids.map((t0, i) => ['pop', +(t0 + 0.05).toFixed(3), NOTE[2 + i], 0.035, -0.4 + i * 0.3]),
  ['whoosh', T.unroll[0], 0.6, 0.03],
  ...ITEMS.map((it, i) => ['pop', +it.at.toFixed(3), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.2 : -0.2]),
  ['tick', T.tap0 + 0.1, 0.05], ['tick', T.tap0 + 0.3, 0.04],
  ['whoosh', T.turn[0], 0.45, 0.035], ['pop', T.turn[0] + 0.25, 1318.51, 0.045, 0], ['glitter', T.turn[0] + 0.25, T.turn[0] + 0.7],
  ['pop', T.h1, 880, 0.03, 0], ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.open, 587.33, 0.04, 0], ['pop', T.open + 0.06, 739.99, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ST]: 440 } }),
  ...[T.s1 + 0.2, T.s2 + 0.25].flatMap(t0 => [['tick', +(t0 + 0.1).toFixed(3), 0.05], ['tick', +(t0 + 0.3).toFixed(3), 0.04]]),
  ['pop', T_YOU + 0.1, 330, 0.04, 0], ['pop', T_YOU + 0.22, 262, 0.035, 0],
  ...T.checks.map((c, i) => ['pluck', c, [1046.5, 1174.66][i], 0.04, 0.4, -0.2]),
  ['tick', T.ghost + 0.05, 0.02],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['pop', T.h2, 880, 0.03, 0], ['pop', T.h2 + 0.1, 987.77, 0.03, 0], ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ...T.stars.map((s, i) => ['bell', s, [1318.51, 1567.98, 1760][i], 0.03, 0.9, -0.3 + i * 0.3]),
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
