// trgrwmaries: GET READY WITH ME, Aries: "Ready. *Still*." (30 s vertical, Star Talk Trends §4, music: pop · C)
// Story 0–25.6, then the shared end card. The format look lives in ./grwm.js (identical in all five GRWM films).
//   0.0–6.9    "Ready in | *four seconds.*"  6:00 PM. ♈ Aries: "GRWM. watch this. three, two—" On the drop: a WHOOSH spin
//              and Aries is done (shades, cap, bow tie). Stickers: "0:04" and "READY." The clock creeps to 6:01.
//              "ready! …wait, the date's at eight?"
//   7.0–13.7   "Re-ready. | *Every ten minutes.*"  6:10, 6:20, 6:30, 6:40, 6:50: a spin and a new outfit each time,
//              a "re-ready #n" counter, Aries pacing, the spiral of "8?" "now?" "!!" starting up.
//              "is it eight yet? it feels like eight."
//  13.9        card cut.
//  14.0–20.2   "7:15. | *Fully layered.*"  Aries is now wearing every outfit at once: three hats, two bow ties.
//              THE STARS: "sweetie. you're wearing every outfit." Aries: "layers are readiness." 7:58: Aries dozes off.
//  20.2–22.3   the turn: the phone buzzes; the date's text: "got ready way too early lol. come now?" Aries wakes.
//  22.3–25.5   "Ready. | *Still.*"  One last spin (0.4 s) back to the very first outfit; heart eyes; Pisces fountains.
// One canvas (room + props + stars), DOM type + dialogue box + bug + clock, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, PINK, INK, FONTS, pop01, outK, popOut, sparkles, starFrame, inSprite, tearsCells,
  buildBug, buildClock, drawRoom, drawTable, drawNotif, drawSticker, drawSpiral, drawShades, drawHat, drawBowtie, WIN,
} from './grwm.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const ARI = signStar('aries'), PIS = signStar('pisces')
const ACC = '#ff9a6e'

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35, clock: 0.5,
  h0: 0.15, h0Land: 0.8, h0Out: [6.7, 6.9],
  ariIn: 0.3, watch: 3.45, ready: 3.7, readyOut: [6.6, 6.85],
  h1: 7.0, h1Out: [13.45, 13.65], spiral: 9.2,
  cut: 13.9,
  h2: 14.0, h2Out: [20.05, 20.25], starsIn: 14.3, starsOut: [20.0, 20.3], doze: 18.7, napping: 19.0,
  buzz: [20.25, 20.55], notif: 20.6, notifOut: [22.3, 22.6], stop: 20.7, wake: 20.75, heart: 21.85,
  h3: 22.45, h3Land: 23.05, last: 23.5,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
// every re-ready: a spin, and the outfit swaps at r + 0.25
const SPINS = [2.82, 7.0, 8.4, 9.8, 11.2, 12.4, 21.3]
const SPIN_LEN = 0.5
const L3 = [['beanie', '#3fb6a0', GOLD, 0], ['cap', '#e8335a', BONE, -6], ['top', '#2b2350', PINK, -12.5]]
const OUTFITS = [
  [-1, null],
  [SPINS[0] + 0.25, { hats: [['cap', '#e8335a', BONE]], bows: [GOLD], shades: true }],
  [SPINS[1] + 0.25, { hats: [['top', '#2b2350', PINK]], bows: [PINK], shades: true }],
  [SPINS[2] + 0.25, { hats: [['beanie', '#3fb6a0', GOLD]], bows: [GOLD], shades: false }],
  [SPINS[3] + 0.25, { hats: [['cap', GOLD, '#2b2350']], bows: ['#7fd0ff'], shades: true }],
  [SPINS[4] + 0.25, { hats: [['top', '#7a2a3a', GOLD]], bows: [PINK], shades: false }],
  [SPINS[5] + 0.25, { hats: [['beanie', PINK, BONE]], bows: [GOLD], shades: true }],
  [T.h2 - 0.05, { hats: L3, bows: [PINK, GOLD], shades: true }],
  [SPINS[6] + 0.25, { hats: [['cap', '#e8335a', BONE]], bows: [GOLD], shades: true }],
]
const outfitAt = t => { let o = null; for (const [a, v] of OUTFITS) if (t >= a) o = v; return o }

const ASP = `${ARI.glyph}︎ ARIES`, SPEAK = 'THE STARS'
const LINES = [
  { t: 0.9, speaker: ASP, color: ACC, text: 'GRWM. watch this. *three, two—*' },
  { t: 4.45, speaker: ASP, color: ACC, text: "ready! …wait, the date's at *eight?*" },
  { t: 9.3, speaker: ASP, color: ACC, text: 'is it eight yet? it feels like *eight.*' },
  { t: 14.55, speaker: SPEAK, text: "sweetie. you're wearing *every* outfit." },
  { t: 17.0, speaker: ASP, color: ACC, text: 'layers are *readiness.*' },
]
const CPS = 30
const BOX1 = { open: 0.75, close: 12.95 }, BOX2 = { open: 14.4, close: 20.15 }
const CLOCK = [[0, '6:00'], [4.6, '6:01'], [7.0, '6:10'], [8.4, '6:20'], [9.8, '6:30'], [11.2, '6:40'], [12.4, '6:50'], [T.h2, '7:15'], [18.5, '7:58'], [T.notif, '7:59']]

// layout
const ARI_P = { x: 540, y: 960, s: 300 }
const STARS_P = { x: 940, y: 1170, s: 140 }
const PIS_P = { x: WIN.x + 120, y: WIN.y + 170, s: 120 }

const ARI_HOPS = [T.ariIn + 0.3, ...talkHops(LINES, ASP, { cps: CPS }), ...SPINS.map(s => s + SPIN_LEN), T.wake, T.heart, T.last]
const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]

const spinAt = t => { for (const s of SPINS) if (t >= s && t < s + SPIN_LEN) return (t - s) / SPIN_LEN; return -1 }

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }

  const root = el('div', { position: 'absolute', inset: 0, overflow: 'hidden', background: '#140c2c' }, stage)
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'Ready in | *four seconds.*', { top: 172, size: 104, accentSize: 146, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: ACC })
  const H1 = popText(root, 'Re-ready. | *Every ten minutes.*', { top: 178, size: 104, accentSize: 126, at: T.h1, gap: 0.1, accentColor: GOLD })
  const H2 = popText(root, '7:15. | *Fully layered.*', { top: 178, size: 104, accentSize: 142, at: T.h2, gap: 0.1, accentColor: '#9fe6b0' })
  const H3 = popText(root, 'Ready. | *Still.*', { top: 172, size: 116, accentSize: 170, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: ACC })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 3), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(3), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const clock = buildClock(root, { at: T.clock, keys: CLOCK, date: '8:00' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function pisces(t) {
    let tears = 1, mood = 'sparkle'
    if (t > T.h1) tears = 2
    if (t > T.doze) { tears = 2; mood = 'wide' }
    if (t > T.notif) { tears = 3; mood = 'happy' }
    const P = { ...PIS_P, x: PIS_P.x + 6 * Math.sin(t * 0.9) }
    const opts = { color: PIS.color, mood, look: mood === 'happy' ? undefined : [1, 1], seed: 6, glow: 0.8, pop: pop01(t, 1.2, 0.4, 2), hops: [T.ready, T.heart + 0.1] }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    inSprite(x, starFrame(P.x, P.y, P.s, t, opts), () => tearsCells(x, t, tears))
  }

  /** speed lines + dust around a spin */
  function spinFx(t, cx, cy) {
    const p = spinAt(t)
    if (p < 0) return
    x.save(); x.globalAlpha = Math.sin(Math.PI * p)
    for (let i = 0; i < 14; i++) {
      const yy = cy - 190 + i * 28, len = 120 + 90 * Math.sin(i * 2.1 + t * 30), side = i % 2 ? 1 : -1
      x.fillStyle = i % 3 ? BONE : ACC
      x.fillRect(cx + side * (170 + 40 * p) - (side < 0 ? len : 0), yy, len, 8)
    }
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + p * 4, R = 120 + 160 * p; x.fillStyle = i % 2 ? GOLD : BONE; x.fillRect(cx + Math.cos(a) * R, cy + 60 + Math.sin(a) * R * 0.5, 14, 14) }
    x.restore()
  }

  function aries(t) {
    const k = pop01(t, T.ariIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.02) return
    let mood = 'happy', look
    if (t > LINES[0].t) { mood = 'wink'; look = [0, 0] }
    if (t > T.ready) { mood = 'sparkle' }
    if (t > LINES[1].t + 1.0) { mood = 'wide'; look = [1, -1] }
    if (t > T.h1) { mood = 'neutral'; look = [Math.sin((t - T.h1) * 1.3) > 0 ? 1 : -1, -0.5] }
    if (t > LINES[2].t) { mood = 'squint'; look = [1, -1] }
    if (t > T.h2) { mood = 'happy'; look = undefined }
    if (t > LINES[3].t + 0.8) { mood = 'neutral'; look = [1, 0.5] }
    if (t > LINES[4].t) { mood = 'sparkle'; look = [0, 0] }
    if (t > T.doze) { mood = 'sleepy' }
    if (t > T.wake) { mood = 'wide'; look = [0, -1] }
    if (t > T.heart) { mood = 'heart'; look = undefined }
    if (t > T.last) mood = 'sparkle'
    const sp = spinAt(t)
    // pacing in beat 1
    const pace = t > T.h1 && t < T.cut ? 130 * Math.sin((t - T.h1) * 1.3) * clamp((t - T.h1) / 0.5) * clamp((T.cut - 0.1 - t) / 0.4) : 0
    const doz = t > T.doze && t < T.wake ? 0.06 * ease.outCubic(prog(t, T.doze, T.doze + 0.5)) : 0
    const P = { x: ARI_P.x + pace, y: ARI_P.y + doz * 400, s: ARI_P.s }
    const squash = sp >= 0 ? 0.28 * Math.sin(sp * Math.PI * 4) : -doz * 1.2
    spinFx(t, P.x, P.y)
    const opts = { color: ARI.color, glyph: ARI.glyph, mood: sp >= 0 && sp < 0.6 ? 'squint' : mood, look, hops: ARI_HOPS, pop: k, seed: 5, glow: 1.15, squash }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const o = outfitAt(t)
    if (o) inSprite(x, starFrame(P.x, P.y, P.s, t, opts), () => {
      if (o.shades) drawShades(x, { glint: prog(t, T.ready - 0.1, T.ready + 0.3) < 1 ? prog(t, T.ready - 0.1, T.ready + 0.3) : prog(t, T.last, T.last + 0.4) < 1 && t > T.last ? prog(t, T.last, T.last + 0.4) : -1 })
      o.bows.forEach((c, i) => drawBowtie(x, c, i * 4.6))
      o.hats.forEach(([kind, col, band, dy]) => drawHat(x, kind, col, band, dy || 0))
    })
  }

  function theStars(t) {
    const k = pop01(t, T.starsIn, 0.36, 2.1) * outK(t, T.starsOut)
    if (k <= 0.02) return
    let mood = 'neutral', look = [-1, -0.4]
    if (t > LINES[4].t + 0.6) { mood = 'eyeroll'; look = undefined }
    if (t > T.doze + 0.3) { mood = 'happy'; look = undefined }
    drawStarChar(x, STARS_P.x, STARS_P.y + (1 - k) * 80, STARS_P.s, t, { color: STAR.sky, mood, look, hops: STARS_HOPS, pop: k, seed: 2, glow: 1 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      x.clearRect(0, 0, 1080, 1920)
      drawRoom(x, t, { ring: 1, inWindow: (_, tt) => pisces(tt) })
      aries(t)
      drawTable(x, t, { phone: { cx: 330, buzz: T.buzz } })
      theStars(t)
      drawSpiral(x, t, ARI_P.x, ARI_P.y - 60, { from: T.spiral, stop: T.cut - 0.15, R: 250, tokens: ['8?', 'now?', '!', '8?', '…', '?!', 'now?', '!!'] })
      drawSpiral(x, t, ARI_P.x, ARI_P.y - 60, { from: T.h2 + 0.3, stop: T.doze, R: 260, tokens: ['8?', 'now?', '!', '8?', '…', '?!', 'now?', '!!'], ramp: 3 })
      // stickers
      drawSticker(x, t, { at: T.watch, out: T.readyOut, text: 'time: *0:04*', cx: 250, cy: 860, rot: -0.08, size: 44 })
      drawSticker(x, t, { at: T.ready, out: T.readyOut, text: '*READY.*', cx: 830, cy: 860, rot: 0.07, size: 52, acc: '#d6402a' })
      for (let i = 1; i < 6; i++) drawSticker(x, t, { at: SPINS[i] + 0.3, out: [i < 5 ? SPINS[i + 1] : T.h1Out[0], (i < 5 ? SPINS[i + 1] : T.h1Out[0]) + 0.15], text: `re-ready *#${i + 1}*`, cx: 540 + (i % 2 ? -1 : 1) * 40, cy: 1205, rot: (i % 2 ? -1 : 1) * 0.04, size: 40 })
      drawSticker(x, t, { at: T.h2 + 0.2, out: [T.napping - 0.25, T.napping], text: 're-ready *#12*', cx: 540, cy: 1205, rot: -0.04, size: 40 })
      drawSticker(x, t, { at: T.napping, out: T.h2Out, text: 'status: *napping*', cx: 540, cy: 1205, rot: 0.04, size: 40 })
      drawNotif(x, t, { at: T.notif, out: T.notifOut, text: 'got ready way too early lol. come now?', cy: 560 })
      drawSticker(x, t, { at: T.last, out: T.out, text: 're-ready #13: *0.4 s*', cx: 540, cy: 1540, rot: -0.04, size: 46 })
      if (t > T.heart && t < T.heart + 0.8) sparkles(x, t, ARI_P.x, ARI_P.y - 40, T.heart, 10, 200, 3, ['#ff4f86', BONE, GOLD])
      sparkles(x, t, ARI_P.x, ARI_P.y - 40, T.ready, 10, 220, 1, [ACC, BONE, GOLD])
      sparkles(x, t, ARI_P.x, ARI_P.y - 40, T.last, 12, 220, 2, [ACC, BONE, GOLD])
      box1.update(t); box2.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut)); clock.update(t, outK(t, T.bugOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.9, the time skip from 6:50 to 7:15)
const CUTS = [6.95, { t: T.cut, kind: 'flip' }, 20.22]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const buzz = t0 => [...Array.from({ length: 7 }, (_, i) => ['tick', +(t0 + i * 0.045).toFixed(3), 0.05]), ['tom', t0, 70, { gain: 0.12, decay: 0.2 }]]
const spin = (t0, i) => [['whoosh', t0 + 0.2, 0.4, 0.045], ...Array.from({ length: 5 }, (_, q) => ['tick', +(t0 + q * 0.06).toFixed(3), 0.035]), ['pop', t0 + SPIN_LEN - 0.05, NOTE[(i * 3) % 7] * 1.5, 0.045, 0]]
export const CUES = [
  ...wordPops(T.h0, 2, 0.08, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0], ['pop', T.ariIn + 0.05, 880, 0.04, 0],
  ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.clock + 0.05, 0.04],
  ...SPINS.flatMap((s, i) => spin(s, i)),
  ['pop', T.watch, 1318.51, 0.035, -0.3], ['tom', T.ready, 110, { gain: 0.2, decay: 0.25 }], ['pop', T.ready, 1567.98, 0.05, 0.3], ['glitter', T.ready, T.ready + 0.4],
  ['tick', 4.6, 0.05], ['pluck', LINES[1].t + 1.0, 659.25, 0.035, 0.5, 0],
  ...CLOCK.slice(2).map(([c]) => ['tick', c + 0.04, 0.05]),
  ...wordPops(T.h1, 4, 0.1, 2, 0.024), ['riser', T.spiral, T.cut - 0.3, 0.02],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h2, 3, 0.1, 1, 0.024), ['pop', T.h2 + 0.2, 1174.66, 0.035, 0], ['pop', T.starsIn + 0.05, 739.99, 0.04, 0.4],
  ['pluck', T.doze, 987.77, 0.03, 0.8, 0], ['pluck', T.doze + 0.3, 739.99, 0.03, 0.8, 0], ['pop', T.napping, 659.25, 0.03, 0],
  ...buzz(T.buzz[0]), ...buzz(T.buzz[1]), ['pop', T.notif + 0.05, 1174.66, 0.05, 0], ['bell', T.notif + 0.15, 1760, 0.03, 1.0, 0],
  ['pop', T.wake, 1567.98, 0.05, 0], ['pluck', T.heart, 1174.66, 0.045, 0.5, -0.2], ['pluck', T.heart + 0.12, 1567.98, 0.04, 0.5, 0.2],
  ...wordPops(T.h3, 1, 0.08, 0, 0.024), ['pop', T.h3Land, 1174.66, 0.045, 0], ['bell', T.h3Land + 0.05, 1760, 0.035, 1.2, 0],
  ['pop', T.last, 1318.51, 0.04, 0], ['glitter', T.last, T.last + 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
