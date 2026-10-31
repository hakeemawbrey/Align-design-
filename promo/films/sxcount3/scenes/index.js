// sxcount3 — COUNTDOWN, "3." (20 s vertical Align ad, Star Talk Shows, show 12) · story 0–15.6, then the shared end card.
//   0.00–5.75  "Three sleeps till | your first *deal.*"  A giant pixel 3 slams in and fills the frame, then settles back
//              behind the cast. THE STARS (gold, sweatband), ♈ Aries and ♉ Taurus (sweatbands) pop in for warm-ups.
//              Drop (2.82): THE STARS: "okay team. warm-ups. let's *go*." Rep 1: synced toe touches.
//   5.75–11.7  "Warm-ups are | *mandatory.*"  Rep 2: synced jumping jacks, sweat flying. Rep 3 (twisted): Taurus stops
//              mid-jack and falls asleep. Tape stop. Everyone turns. TAURUS: "I'm training for the *sleeps*." Synced
//              eye-roll, womp. ♓ Pisces cries in the back the whole time ("three sleeps is SO long").
//   11.7–15.45 card cut, "*Stretch* | your heart."  Taurus wakes; all three stretch up tall; a pixel heart above them
//              stretches like a rubber band and boings back with a sparkle. Everything pops out by 15.45.
// One canvas (sky + number + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, PINK, MINT, BEAT, r3, pop01, outK, popOut, drawBits, drawDigit, digitState, buildBug, starTears, onStar,
  drawSweatband, drawSweat, HEART, HEART_C, sparkles, FX, chipS, womp, wordPops, slamCues } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const ARI = signStar('aries'), TAU = signStar('taurus'), PIS = signStar('pisces')
const BL = 0.5556

// ── the timeline
const T = {
  slam: 0.15, settle: 1.45,
  h0: 0.5, h0Late: 1.05, h0Out: [5.5, 5.68],
  starsIn: 1.75, ariIn: 1.95, tauIn: 2.1, pisIn: 2.3,
  open: 2.6, l1: BEAT(4),                                    // the drop: 2.82
  touch: [BEAT(6), BEAT(9) + 0.3],                           // rep 1: toe touches on the beat (3.93 → 5.9)
  h1: 5.78, h1Late: 6.2, h1Out: [11.45, 11.62],
  jacks: [BEAT(10), BEAT(11), BEAT(12), BEAT(13)],           // rep 2: jumping jacks (6.16, 6.71, 7.27, 7.82)
  doze: BEAT(12) - 0.05,                                     // Taurus skips the 3rd jack: asleep
  stop: 8.3, turn: 8.42, l2: 8.75,
  roll: [10.55, 11.2], close: 11.4,
  cut: 11.72,
  h2: 11.82, h2Late: 12.15, wake: 12.0,
  stretch: [12.35, 13.0], heartIn: 12.45, pull: [12.7, 13.45], boing: 13.75, release: 13.8,
  out: [14.95, 15.42],
}
const SPEAK = 'THE STARS', TSPK = '♉ TAURUS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "okay team. warm-ups. let's *go*." },
  { t: T.l2, speaker: TSPK, text: "I'm training for the *sleeps*.", color: TAU.color },
]
const CPS = 28

// ── layout
const POS = { gold: { x: 540, y: 1160, s: 300 }, ari: { x: 230, y: 1215, s: 216 }, tau: { x: 850, y: 1215, s: 216 }, pis: { x: 908, y: 845, s: 128 } }
const GOLD_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS }), ...T.jacks, T.release]
const ARI_HOPS = [T.ariIn + 0.3, ...T.jacks, T.release + 0.06]
const TAU_HOPS = [T.tauIn + 0.3, T.jacks[0], T.jacks[1], T.release + 0.12]
const PIS_HOPS = [T.pisIn + 0.3, T.jacks[1] + 0.1, T.jacks[3] + 0.1, T.boing + 0.05]

// rep 1: a toe-touch dip on every beat (all three in sync)
const touchSq = t => (t >= T.touch[0] && t < T.touch[1]) ? 0.3 * Math.abs(Math.sin(Math.PI * (t - T.touch[0]) / BL)) : 0
const stretchSq = t => -0.17 * ease.inOutCubic(prog(t, ...T.stretch)) * (1 - ease.outCubic(prog(t, T.release - 0.05, T.release + 0.05)))

function goldState(t) {
  if (t < T.l1) return { mood: 'happy' }
  if (t < T.touch[0]) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.touch[1]) return { mood: 'squint', look: [0, 1] }
  if (t < T.doze + 0.6) return { mood: 'happy' }
  if (t < T.turn) return { mood: 'happy' }
  if (t < T.roll[0]) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.wake) return { mood: 'neutral', look: [1, 0] }
  if (t < T.boing) return { mood: 'squint', look: [0, -1] }
  return { mood: 'heart' }
}
function ariState(t) {
  if (t < T.touch[0]) return { mood: 'happy', look: [1, 0] }
  if (t < T.touch[1]) return { mood: 'squint', look: [0, 1] }
  if (t < T.turn) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.roll[0]) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.wake) return { mood: 'neutral', look: [1, 0] }
  if (t < T.boing) return { mood: 'squint', look: [0, -1] }
  return { mood: 'happy' }
}
function tauState(t) {
  if (t < T.touch[0]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.touch[1]) return { mood: 'squint', look: [0, 1] }
  if (t < T.doze) return { mood: 'happy' }
  if (t < T.wake) return { mood: 'sleepy' }
  if (t < T.wake + 0.35) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.boing) return { mood: 'squint', look: [0, -1] }
  return { mood: 'happy' }
}
function pisK(t) {                                  // Pisces' tear intensity
  if (t < T.touch[0]) return 0.5
  if (t < T.jacks[3] + 0.4) return 1.2              // so much exercise
  if (t < T.wake) return 0.6
  if (t < T.boing) return 0.8
  return 1.7                                        // the heart. sobbing.
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Three sleeps till | your first *deal.*', { top: 170, size: 96, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Late, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'Warm-ups are | *mandatory.*', { top: 170, size: 104, accentSize: 156, at: T.h1, late: 1, lateAt: T.h1Late, wobble: true, accentColor: '#ff7a6b' })
  const H2 = popText(root, '*Stretch* | your heart.', { top: 180, size: 124, accentSize: 190, at: T.h2, gap: 0.1, wobble: true, accentColor: PINK, lineHeight: 1.12 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 230, open: T.open, close: T.close, cps: CPS })
  const bug = buildBug(root, { n: 3, start: 0.25, end: STORY_END })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawNumber(t) {
    const d = digitState(t, { slam: T.slam, settle: T.settle, big: 118, small: 66, bigY: 960, smallY: 730, fade: [T.cut, T.cut + 0.2, 0.14] })
    const ok = 1 - prog(t, T.out[0], T.out[1])
    const beatPulse = t > T.l1 ? 0.04 * Math.exp(-((t - T.l1) % BL) * 6) : 0
    const shine = prog(t, T.slam + 0.35, T.slam + 1.15) || null
    drawDigit(x, 3, d.cx, d.cy, d.cell * (1 + beatPulse), { alpha: d.alpha * ok, glow: 0.9, shine: shine > 0 && shine < 1 ? shine : (t > 9 && t < 9.8 ? prog(t, 9, 9.8) : null) })
  }

  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const tsq = touchSq(t), ssq = stretchSq(t)
    // ♓ Pisces in the back, crying (three sleeps is SO long)
    const pp = pop01(t, T.pisIn, 0.36, 2.2) * ok
    if (pp > 0.02) {
      const P = POS.pis, o = { color: PIS.color, mood: t > T.boing ? 'happy' : 'neutral', look: t > T.turn && t < T.wake ? [-1, 0] : [0, 0], hops: PIS_HOPS, seed: 11, pop: pp, glow: 0.7, squash: Math.sin(t * 40) * 0.025 * (pisK(t) > 1 ? 1 : 0) }
      const r = drawStarChar(x, P.x, P.y, P.s, t, o)
      starTears(x, r, t, pisK(t) * pp)
    }
    // Aries + Taurus + THE STARS
    const cast = [
      ['ari', ARI.color, ARI.glyph, ariState, ARI_HOPS, T.ariIn, 4, '#ffd23f'],
      ['tau', TAU.color, TAU.glyph, tauState, TAU_HOPS, T.tauIn, 6, '#7fdcff'],
      ['gold', STAR.sky, null, goldState, GOLD_HOPS, T.starsIn, 1, '#ff4f6d'],
    ]
    for (const [k, col, glyph, stf, hops, t0, seed, band] of cast) {
      const p = pop01(t, t0, 0.38, 2.2) * ok
      if (p <= 0.02) continue
      const P = POS[k], st = stf(t)
      const drop = (1 - ease.outCubic(prog(t, t0 - 0.12, t0 + 0.2))) * 380
      let sq = tsq + ssq
      if (k === 'tau' && t >= T.doze && t < T.wake) sq = 0.14 * ease.outCubic(prog(t, T.doze, T.doze + 0.5)) + Math.sin(t * 2.4) * 0.02   // slumped, snoozing
      const o = { color: col, glyph, ...st, hops, seed, pop: p, squash: sq, glow: 1.05, zzz: true }
      const r = drawStarChar(x, P.x, P.y - drop, P.s, t, o)
      drawSweatband(x, t, r, o, band, seed)
      // sweat: during the jacks (not Taurus once asleep)
      if (t > T.jacks[0] && t < T.stop && !(k === 'tau' && t > T.doze)) drawSweat(x, t, r, 1 - prog(t, T.stop - 0.3, T.stop), seed)
      // jumping-jack motion ticks
      if (t > T.jacks[0] - 0.05 && t < T.jacks[3] + 0.4 && !(k === 'tau' && t > T.doze)) {
        const ph = ((t - T.jacks[0]) % BL) / BL, a = Math.sin(Math.PI * Math.min(1, ph * 1.6))
        const c = r.size / 36
        x.save(); x.globalAlpha = 0.8 * a * p; x.fillStyle = BONE
        for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) x.fillRect(Math.round(r.x + sd * (20 + i * 0.4) * c), Math.round(r.y - 6 * c + i * 4 * c), Math.round(3 * c), Math.round(c))
        x.restore()
      }
    }
    // the heart: pops in above the cast, gets pulled wide like a rubber band, boings back
    const hp = pop01(t, T.heartIn, 0.35, 2.4) * ok
    if (hp > 0.02) {
      const pull = ease.inOutCubic(prog(t, ...T.pull))
      const bt = t - T.boing
      const snap = bt > 0 ? Math.exp(-bt * 5) * Math.cos(bt * 24) : 1
      const sx = bt > 0 ? 1 + 0.7 * snap : 1 + 0.7 * pull
      const sy = bt > 0 ? 1 - 0.25 * snap : 1 - 0.25 * pull
      const hy = 905 + Math.sin(t * 2.2) * 8
      drawBits(x, HEART, HEART_C, 540, hy, 16 * hp, { sx, sy })
      // the strain lines while it's pulled
      if (pull > 0.4 && bt < 0) {
        x.save(); x.globalAlpha = pull * (0.6 + 0.4 * Math.sin(t * 40)); x.fillStyle = BONE
        for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) x.fillRect(Math.round(540 + sd * (75 * sx + 18 + i * 14)), Math.round(hy - 30 + i * 26), 10, 6)
        x.restore()
      }
      sparkles(x, t, 540, hy, T.boing, 12, 170, 0.4, [PINK, GOLD, BONE, MINT])
    }
    sparkles(x, t, 540, 960, T.slam + 0.3, 14, 380, 0.2, [GOLD, BONE, '#ffd98a', PINK])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      const slamFlash = Math.exp(-Math.max(0, t - T.slam - 0.3) * 6) * (t > T.slam + 0.3 ? 1 : 0)
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * (1 + 0.5 * slamFlash) })
      if (t < T.out[1] + 0.02) { drawNumber(t); drawCast(t) }
      box.update(t)
      bug.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.7 (H0 out → "Warm-ups are mandatory.") and 11.72 (box shut → "Stretch your heart.").
// cardfx keeps one for a film this short (the 11.72 flip). End card flips at 15.6.
const CUTS = [5.7, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const whistle = t => [chipS(t, 1760, 0.12, { slide: 300, gain: 0.04, duty: 0.5 }), chipS(t + 0.14, 2093, 0.36, { slide: -80, gain: 0.04, duty: 0.5, vib: 0.02 })]
const snore = t => [['chip', r3(t), 98, 0.6, { ...FX, wave: 'noise', gain: 0.018, decay: 0.4, sustain: 0.5 }], chipS(t + 0.7, 1318.51, 0.3, { slide: 600, gain: 0.02, duty: 0.5 })]
export const CUES = [
  // hook: the 3 slams, headline, the cast pops in
  ...slamCues(T.slam),
  ...wordPops(T.h0, 4, 0.07, 0, 0.024), ['pop', T.h0Late, 1174.66, 0.045, 0], ['pluck', T.h0Late, 1174.66, 0.04, 0.6, 0],
  ['whoosh', T.settle, 0.5, 0.03],
  ['pop', T.starsIn + 0.05, 739.99, 0.045, 0], ['pop', T.ariIn + 0.05, 880, 0.04, -0.4], ['pop', T.tauIn + 0.05, 659.25, 0.04, 0.4], ['pop', T.pisIn + 0.05, 987.77, 0.025, 0.5],
  ['pop', T.open, 739.99, 0.035, 0], ['pop', T.open + 0.06, 987.77, 0.028, 0],
  ...whistle(T.l1 - 0.02),
  ...talkCues(LINES, { cps: CPS }),
  // rep 1: toe touches (a little grunt-tick at each dip)
  ...[0, 1, 2, 3].map(i => ['tick', r3(T.touch[0] + BL / 2 + i * BL), 0.035]),
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.touch[0] + BL / 2 + i * BL), [587.33, 659.25, 587.33, 739.99][i], 0.022, 0]),
  // rep 2: jumping jacks
  ...wordPops(T.h1, 3, 0.07, 2, 0.024), ['pop', T.h1Late, 1318.51, 0.045, 0],
  ...T.jacks.flatMap((j, i) => [['pop', r3(j + 0.05), [880, 987.77, 880, 1174.66][i], 0.035, i % 2 ? 0.3 : -0.3], ['tick', r3(j + 0.33), 0.03]]),
  // rep 3: Taurus dozes; tape stop; everyone turns
  ...snore(T.doze + 0.4), ['tapeStop', T.stop - 0.25, 0.4], ['pop', T.turn, 440, 0.035, 0], ['tick', T.turn + 0.02, 0.04],
  ...snore(T.l2 + 1.5),
  ...womp(T.roll[0]),
  ['pop', T.close, 880, 0.028, 0], ['pop', T.close + 0.07, 587.33, 0.028, 0],
  // stretch your heart
  ['pop', T.h2, 1174.66, 0.05, 0], ['pluck', T.h2, 1174.66, 0.045, 0.6, 0], ...wordPops(T.h2 + 0.1, 2, 0.1, 3, 0.024),
  ['pop', T.wake, 1318.51, 0.035, 0.4], ['riser', T.stretch[0], T.pull[1], 0.03],
  ['pop', T.heartIn + 0.05, 987.77, 0.04, 0],
  chipS(T.pull[0], 392, T.pull[1] - T.pull[0], { slide: 4, gain: 0.03, duty: 0.5, vib: 0.03 }),
  chipS(T.boing, 784, 0.45, { slide: -6, vib: 0.08, gain: 0.04, duty: 0.5 }), ['glitter', T.boing, T.boing + 0.5], ['bell', T.boing + 0.05, 1760, 0.028, 1.2, 0],
  ['pop', T.release, 880, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
