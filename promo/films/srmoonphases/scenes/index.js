// srmoonphases (20 s vertical, Star Talk Remix of "New Moon vs Full Moon.") · story 0–15.6, then the shared end card.
//   0.00–2.82  "New Moon | vs *Full Moon.*"  A sleepy dark New Moon and a wide-awake Full Moon face off (VS); THE STARS
//              (gold) between them does a double-take. Box: "same moon. two *very* different moods."
//   2.82  NEW   "New Moon: | plant the *seed.*"  The New Moon dozes; the gold star pats a glowing seed into a dirt
//              mound, then stares at it: "...grow?" → "now??"
//   5.60  WAIT  "Then wait | about *two weeks.*"  DAY 1 → DAY 15 ticks by while the moon waxes and opens its eyes;
//              the star waters the mound, then falls asleep. The sprout comes up.
//   7.27  FULL  "Full Moon: | see what *grew.*"  The Full Moon is wide awake; the flower blooms; the star wakes to
//              heart-eyes; ♓ Pisces arrives already crying. Box (♓): "it GREW. i'm not crying, *you are.*"
//  10.60  "Look up | *tonight.*"  Star + Pisces look up at the moon, which winks at you.
//              Box (THE STARS): "go look up tonight. *we'll wave.*" → heart-eyes. Out by 15.5.
// One canvas (sky + stars + props), DOM type + dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, PINK, drawTears, sparkles, bubble, pop01, popOut, outK, label, moon, mound, plant, wateringCan } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const beat = n => +(0.6 + n * 0.5556).toFixed(3)
const CPS = 30
const MINT = '#8fe39a', MOONC = '#ffe7a8'

const N0 = beat(4), G0 = beat(9), F0 = beat(12), L0 = beat(18)       // 2.822 5.600 7.267 10.600
const ACC = 0.83
const T = {
  h0: 0.1, h0Acc: 0.6, h0Out: [2.55, 2.76], dt: [1.25, 1.65, 2.05],
  l1: 0.72,
  walk: [N0 + 0.05, N0 + 0.6], plantT: N0 + ACC, stare: N0 + 1.3, q1: N0 + 1.6, q2: N0 + 2.15,
  water: [G0 + 0.1, G0 + 0.85], sleep: G0 + 0.95,
  bloom: F0 + 0.62, wake: F0 + 0.83, pisces: F0 + 0.45, l2: F0 + 0.95,
  l3: L0 + 0.9, wink: L0 + 2.7, hearts: L0 + 3.0,
  out: [15.1, 15.5],
}
const MOON = { x: 810, y: 640 }
const MOUND = { x: 560, y: 1330 }

const C = { pisces: signStar('pisces') }
const LINES_A = [{ t: T.l1, speaker: 'THE STARS', text: 'same moon. two *very* different moods.' }]
const LINES_B = [{ t: T.l2, speaker: '♓ PISCES STAR', text: "it GREW. i'm not crying, *you are.*", color: '#a9a3ff' }]
const LINES_C = [{ t: T.l3, speaker: 'THE STARS', text: "go look up tonight. *we'll wave.*" }]
const TA = lineTimes(LINES_A, { cps: CPS }), TB = lineTimes(LINES_B, { cps: CPS }), TC = lineTimes(LINES_C, { cps: CPS })
const CLOSE_A = +(TA[0].done + 1.6).toFixed(3), CLOSE_B = +(TB[0].done + 1.6).toFixed(3), CLOSE_C = 15.3
const NARR_HOPS = [...talkHops(LINES_A, 'THE STARS', { cps: CPS }), ...talkHops(LINES_C, 'THE STARS', { cps: CPS })]
const PISCES_HOPS = talkHops(LINES_B, '♓ PISCES STAR', { cps: CPS })
const DAY_T = Array.from({ length: 14 }, (_, i) => +(G0 + 0.15 + (i + 1) * (F0 - G0 - 0.25) / 14).toFixed(3))
const dayAt = t => 1 + DAY_T.filter(d => t >= d).length

// moon phase over the film: new until the wait, waxing to full by F0, then a crescent-ish "tonight" moon in the finale
const phaseAt = t => t < G0 ? 0 : t < F0 ? ease.inOutQuad(prog(t, G0 + 0.1, F0 - 0.1)) : 1
// plant growth: seed at the plant beat, sprout through the wait, bloom on the full moon
const growAt = t => t < T.plantT ? -1 : t < G0 + 0.2 ? 0 : t < T.bloom ? 0.66 * ease.outCubic(prog(t, G0 + 0.2, F0 - 0.05)) : lerp(0.66, 1, easeOutBack(prog(t, T.bloom, T.bloom + 0.45), 1.6))

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const HEADS = [
    [popText(root, 'New Moon | vs *Full Moon.*', { top: 190, size: 116, accentSize: 156, at: T.h0, gap: 0.1, late: 2, lateAt: T.h0Acc, lateGap: 0.14, wobble: true, accentColor: MOONC, fit: true }), T.h0Out],
    [popText(root, 'New Moon: | plant the *seed.*', { top: 170, size: 112, accentSize: 150, at: N0 + 0.04, gap: 0.09, late: 1, lateAt: N0 + ACC, wobble: true, accentColor: MINT, fit: true }), [G0 - 0.2, G0 - 0.02]],
    [popText(root, 'Then wait | about *two weeks.*', { top: 170, size: 112, accentSize: 150, at: G0 + 0.04, gap: 0.08, late: 2, lateAt: G0 + 0.5, lateGap: 0.14, wobble: true, accentColor: '#c9a6ff', fit: true }), [F0 - 0.2, F0 - 0.02]],
    [popText(root, 'Full Moon: | see what *grew.*', { top: 170, size: 112, accentSize: 150, at: F0 + 0.04, gap: 0.09, late: 1, lateAt: F0 + ACC, wobble: true, accentColor: PINK, fit: true }), [L0 - 0.25, L0 - 0.05]],
    [popText(root, 'Look up | *tonight.*', { top: 190, size: 130, accentSize: 176, at: L0 + 0.08, gap: 0.1, late: 1, lateAt: L0 + 0.45, wobble: true, fit: true }), T.out],
  ]
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1420, open: T.l1 - 0.2, close: CLOSE_A, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1420, open: T.l2 - 0.2, close: CLOSE_B, cps: CPS })
  const boxC = dialogueBox(root, { lines: LINES_C, y: 1420, open: T.l3 - 0.2, close: CLOSE_C, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── hook: New vs Full
  function drawHook(t) {
    if (t > T.h0Out[1] + 0.05) return
    const ok = popOut(t, [T.h0Out[0] - 0.05, T.h0Out[1]])
    const a = pop01(t, 0.15, 0.4) * ok, b = pop01(t, T.h0Acc, 0.4) * ok
    moon(x, t, 300, 820, 140 * a, 0, { eyes: 0 })
    moon(x, t, 780, 820, 140 * b, 1, { eyes: 1, look: [-1, 0] })
    label(x, 'NEW', 300, 1010, 36, '#c9c2ff', { alpha: a })
    label(x, 'FULL', 780, 1010, 36, MOONC, { alpha: b })
    label(x, 'VS', 540, 820, 64 * easeOutBack(prog(t, T.h0Acc + 0.15, T.h0Acc + 0.45), 2.6), GOLD, { alpha: ok })
    const look = t < T.dt[0] ? [0, 0] : t < T.dt[1] ? [-1, 0] : t < T.dt[2] ? [1, 0] : [0, 0]
    const d = t - T.dt[2]
    drawStarChar(x, 540, 1210, 220, t, { color: STAR.sky, mood: t < T.dt[2] ? 'neutral' : 'wide', look, pop: pop01(t, 0.3, 0.4) * ok, hops: NARR_HOPS.filter(h => h < 3), squash: d > 0 && d < 0.4 ? -0.15 * Math.exp(-d * 8) : 0, blink: false, seed: 2 })
  }

  // ── the garden (NEW → WAIT → FULL → finale): moon, mound, plant, the gold star, Pisces
  function drawGarden(t) {
    if (t < N0 - 0.02 || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const fin = t >= L0
    // the moon (in the finale it shrinks up into the corner of the sky)
    const fk = ease.inOutCubic(prog(t, L0 - 0.1, L0 + 0.5))
    const mr = lerp(lerp(105, 125, phaseAt(t)), 95, fk) * pop01(t, N0, 0.4) * ok
    const eyes = t < G0 ? 0 : t < F0 ? prog(t, F0 - 0.9, F0 - 0.3) : 1
    moon(x, t, lerp(MOON.x, 790, fk), lerp(MOON.y, 610, fk), mr, phaseAt(t), { eyes, look: fin ? [-1, 1] : [-1, 1], wink: t > T.wink && t < T.wink + 0.5 ? 1 : 0 })
    // mound + plant
    mound(x, MOUND.x, MOUND.y, 520, 80, { alpha: pop01(t, N0 + 0.05, 0.35) * ok })
    const g = growAt(t)
    if (g >= 0) {
      const dropK = ease.inQuad(prog(t, T.plantT, T.plantT + 0.2))
      const py = lerp(MOUND.y - 220, MOUND.y - 70, dropK)
      plant(x, t, MOUND.x, g > 0.02 ? MOUND.y - 72 : py, g, { alpha: ok, cell: 11, glow: t < G0 ? 0.6 + 0.3 * Math.sin(t * 5) : t > T.bloom ? 0.7 * Math.exp(-(t - T.bloom) * 1.5) : 0 })
      sparkles(x, t, MOUND.x, MOUND.y - 80, T.plantT + 0.2, { n: 8, R: 120, seed: 1, cols: [MINT, GOLD, BONE], size: 20 })
      sparkles(x, t, MOUND.x, MOUND.y - 360, T.bloom + 0.1, { n: 12, R: 220, seed: 5, cols: [PINK, GOLD, BONE, MINT] })
    }
    // the gold star
    const sx = t < T.walk[1] ? lerp(-150, 330, ease.outCubic(prog(t, ...T.walk))) : t < T.plantT ? lerp(330, 400, prog(t, T.walk[1], T.plantT)) : 280
    let mood = 'happy', look = [1, 0], sq = 0
    if (t >= T.plantT - 0.1 && t < T.stare) { mood = 'happy'; look = [1, 1] }
    else if (t >= T.stare && t < G0) { mood = 'squint'; look = [1, 1] }
    else if (t >= G0 && t < T.sleep) { mood = 'happy'; look = [1, 1] }
    else if (t >= T.sleep && t < T.wake) { mood = 'sleepy' }
    else if (t >= T.wake && t < T.wake + 0.5) { mood = 'wide'; look = [1, -1] }
    else if (t >= T.wake + 0.5 && !fin) { mood = 'heart'; look = [0, 0] }
    if (fin) { mood = t > T.hearts ? 'heart' : 'sparkle'; look = t > T.hearts ? [0, 0] : [1, -1] }
    const pl = t - T.plantT
    if (pl > 0 && pl < 0.5) sq += 0.18 * Math.exp(-pl * 8) * Math.cos(pl * 22)
    if (t > T.sleep && t < T.wake) sq += 0.08
    const wk = t - T.wake
    if (wk > 0 && wk < 0.4) sq -= 0.18 * Math.exp(-wk * 8)
    const hops = [T.plantT - 0.05, ...NARR_HOPS.filter(h => h > L0), T.hearts]
    const sr = drawStarChar(x, sx, 1180, 240, t, { color: STAR.sky, mood, look, pop: pop01(t, N0, 0.35) * ok, squash: sq, hops, seed: 3, glow: 1.15 })
    // seed in hand while walking
    if (t < T.plantT) plant(x, t, sx + 110, 1150, 0, { cell: 9, glow: 0.6 })
    // watering can during the wait
    if (t > T.water[0] - 0.1 && t < T.water[1] + 0.15) {
      const k = pop01(t, T.water[0] - 0.1, 0.25) * (1 - prog(t, T.water[1], T.water[1] + 0.15))
      wateringCan(x, sx + 150, 1080, 10 * k, 0.45 * Math.min(1, prog(t, T.water[0], T.water[0] + 0.2)))
      for (let i = 0; i < 6; i++) {
        const ph = (t * 2.2 + i / 6) % 1
        if (t < T.water[0] + 0.15) break
        x.fillStyle = '#9fe4ff'; x.globalAlpha = k * (1 - ph)
        x.fillRect(Math.round(sx + 200 + (i % 3) * 14 + ph * 20), Math.round(1100 + ph * 140), 8, 14)
        x.globalAlpha = 1
      }
    }
    // impatience bubbles
    bubble(x, 330, 960, '...grow?', easeOutBack(prog(t, T.q1, T.q1 + 0.25), 2.6) * (1 - prog(t, T.q2 - 0.05, T.q2)), { tail: -1, size: 40 })
    bubble(x, 330, 960, 'now??', easeOutBack(prog(t, T.q2, T.q2 + 0.25), 2.6) * outK(t, [G0 - 0.2, G0]), { tail: -1, size: 48 })
    // DAY counter during the wait
    if (t > G0 && t < F0 + 0.1) {
      const dk = pop01(t, G0 + 0.15, 0.3) * outK(t, [F0 - 0.12, F0 + 0.05])
      const n = dayAt(t), bump = DAY_T.some(d => t >= d && t < d + 0.1) ? 1.08 : 1
      label(x, `DAY ${n}`, 300, 640, 64 * dk * bump, n >= 15 ? GOLD : BONE)
    }
    // Pisces: arrives already crying, stays
    if (t > T.pisces) {
      const pk = pop01(t, T.pisces, 0.35) * ok
      const px = lerp(1200, 860, ease.outCubic(prog(t, T.pisces, T.pisces + 0.35)))
      const r = drawStarChar(x, px, 1200, 180, t, { color: C.pisces.color, glyph: C.pisces.glyph, mood: fin && t > T.hearts ? 'heart' : 'sparkle', look: fin ? (t > T.hearts ? [0, 0] : [-1, -1]) : [-1, 0], pop: pk, hops: [...PISCES_HOPS, ...(fin ? [T.hearts + 0.06] : [])], seed: 7 })
      drawTears(x, t, r, { amount: pk * (fin ? 0.7 : 1), seed: 2, fountain: !fin, scale: 1.4 })
    }
    if (fin && t > T.hearts) sparkles(x, t, 540, 1000, T.hearts, { n: 12, R: 330, seed: 6 })
    void sr
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      // our moon is the character; the sky's own little moon only fades back in for the end-card hand-off
      const mk = prog(t, T.out[0], T.out[1])
      const skyMoon = mk > 0 ? { ...SKY_H.moon, alpha: mk } : null
      drawSky(x, t, t < 3 ? { ...SKY_H, moon: null, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : { ...SKY_H, moon: skyMoon })
      drawHook(t); drawGarden(t)
      boxA.update(t); boxB.update(t); boxC.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: into "Look up tonight." (the one cut a 20 s film keeps). End card flips at 15.6.
const CUTS = [{ t: +(L0 - 0.07).toFixed(3), kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.022) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0), ['pop', T.h0Acc, 1174.66, 0.045, 0], ['pop', T.h0Acc + 0.14, 1318.51, 0.045, 0], ['pluck', T.h0Acc + 0.14, 880, 0.035, 0.6, 0],
  ['boom', T.h0Acc + 0.2, 0.08], ['tick', T.dt[0], 0.04], ['tick', T.dt[1], 0.04], ['pop', T.dt[2], 1318.51, 0.04, 0],
  ...talkCues(LINES_A, { cps: CPS }), ...talkCues(LINES_B, { cps: CPS }), ...talkCues(LINES_C, { cps: CPS }),
  // new moon: plant the seed
  ...wordPops(N0 + 0.04, 4, 0.09, 1, 0.018), ['pop', N0 + ACC, 1174.66, 0.05, 0], ['pluck', N0 + ACC, 880, 0.04, 0.6, 0],
  ['whoosh', T.walk[0], 0.35, 0.03], ['tom', T.plantT + 0.2, 98, { gain: 0.2 }], ['bell', T.plantT + 0.22, 1318.51, 0.025, 1.0, 0], ['glitter', T.plantT + 0.2, T.plantT + 0.5],
  ['pop', T.q1, 659.25, 0.035, -0.3], ['pop', T.q2, 987.77, 0.04, -0.3],
  // the wait: day ticks, watering, sleep
  ...wordPops(G0 + 0.04, 2, 0.08, 2, 0.018), ['pop', G0 + 0.5, 1174.66, 0.045, 0], ['pop', G0 + 0.64, 1318.51, 0.045, 0],
  ...DAY_T.map(d => ['tick', d, 0.03]), ['swell', T.water[0], T.water[1], { gain: 0.025 }], ['pluck', T.sleep, 440, 0.03, 0.9, 0], ['pluck', T.sleep + 0.3, 329.63, 0.025, 0.9, 0],
  // full moon: bloom, wake, Pisces
  ...wordPops(F0 + 0.04, 4, 0.09, 3, 0.018), ['pop', F0 + ACC, 1174.66, 0.05, 0], ['pluck', F0 + ACC, 987.77, 0.04, 0.6, 0],
  ['glitter', T.bloom + 0.1, T.bloom + 0.6], ['bell', T.bloom + 0.1, 1318.51, 0.035, 1.6, 0], ['bell', T.bloom + 0.2, 1760, 0.025, 1.3, 0],
  ['pop', T.wake, 1318.51, 0.04, -0.2], ['whoosh', T.pisces, 0.3, 0.03], ['pop', T.pisces + 0.3, 1174.66, 0.03, 0.4],
  // look up tonight
  ...wordPops(L0 + 0.08, 2, 0.1, 2), ['pop', L0 + 0.45, 1318.51, 0.05, 0], ['pluck', L0 + 0.45, 1174.66, 0.04, 0.7, 0],
  ['pluck', T.wink, 1318.51, 0.035, 0.5, 0], ['bell', T.wink + 0.05, 1760, 0.022, 1.0, 0],
  ['glitter', T.hearts, T.hearts + 0.45],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
