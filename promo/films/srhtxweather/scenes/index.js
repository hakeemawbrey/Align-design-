// srhtxweather (20 s vertical, Star Talk Remix of htxweather "Sunny, pouring, sunny again") · story 0–15.6, then the
// shared end card. THE STARS do the Houston weather (a gold star in front of a giant weather dial); ♓ Pisces cries in
// the corner, as always.
//   0.00–4.70  "Houston weather: | sunny, *pouring,* | sunny again."  The dial swings the sun and a rain cloud over the
//              star on the beat: sun → pixel shades + sweat; rain → an umbrella snaps open and it gets rained on. Then
//              faster and faster until it whirls; the star goes dizzy. Box: "today's forecast: *yes.*"
//   4.75–9.25  "Mixed signals? | *Not here.*"  Box: "that's not weather. that's *a situationship.*" The dial bursts into
//              sparkles (5.6); two charts spin in and lock; the Push / Pull / Align lines draw between their planets on
//              the beat, with a legend. Box: "push. pull. align. *no guessing.*"
//   9.30 cut → "Read the | *signs.*"  the three reading colours arc over the star as a rainbow and the twelve sign
//              glyphs pop along it; the umbrella gets tossed, shades back on, a wink. Box: "clear skies, babe. *for two.*"
//              Everything out by 15.42.
// One canvas, DOM type + the dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, drawWheelH, READING, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, BLUE, SILVER, MONO, rgba, ink, sparkle, sun, cloud, rain, orb, starFrame, inSprite, tearsCells, sweatCells, shadesCells, umbrella } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => 0.6 + n * 0.5556
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3)
const PIS = signStar('pisces')

// ── the weather: the dial's state flips (0 = sun up, 1 = cloud up), faster and faster
const FLIPS = [BEAT(0), BEAT(2), BEAT(4), BEAT(5), BEAT(5.5), BEAT(6), BEAT(6.5), 4.25, 4.45, 4.62, 4.78, 4.92, 5.05, 5.17, 5.28, 5.38, 5.47]
const T = {
  h0a: 0.12, h0: BEAT(0), h0Out: [4.55, 4.72], star: 0.2, dial: 0.25, open: 1.8, dizzy: BEAT(6),
  h1: 4.78, h1Not: BEAT(9), h1Out: [9.05, 9.25], burst: BEAT(9), charts: [5.75, 6.45], lines: [BEAT(11.5), BEAT(12.5), BEAT(13.5)], chartsOut: [9.0, 9.25],
  cut: 9.3,
  h2: 9.36, h2Signs: BEAT(16.5), bow: [9.6, 10.4], glyphs: 10.1, toss: BEAT(18), wink: [12.9, 13.35], out: [15.0, 15.42], h2Out: [15.15, 15.42],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: 2.0, speaker: SPEAK, text: "today's forecast: *yes.*" },
  { t: 4.55, speaker: SPEAK, text: "that's not weather. that's *a situationship.*" },
  { t: 7.95, speaker: SPEAK, text: 'push. pull. align. *no guessing.*' },
  { t: 11.15, speaker: SPEAK, text: 'clear skies, babe. *for two.*' },
]
const CPS = 30
const HOPS = [T.star + 0.35, ...talkHops(LINES, SPEAK, { cps: CPS }).filter(h => h < T.dizzy || h > T.burst + 0.6), ...T.lines.map(l => l + 0.05), T.toss, T.wink[0]]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const HUB = { x: 540, y: 1150, R: 450 }            // the dial's hub (behind the star) and arm length
const STAR1 = { x: 540, y: 1140, size: 320 }, STAR2 = { x: 175, y: 1300, size: 210 }, STAR3 = { x: 540, y: 1130, size: 300 }
const PISP = { x: 945, y: 1330, size: 140 }
const CA = { x: 300, y: 880 }, CB = { x: 780, y: 880 }, CS = 0.42
const PLA = [0.6, 2.3, 4.2], PLB = [1.4, 3.6, 5.3]
const READ = [{ k: 'PUSH', c: READING.push }, { k: 'PULL', c: READING.pull }, { k: 'ALIGN', c: READING.align }]
const BOW = { x: 540, y: 1380, r: [500, 462, 424] }

function flipState(t) { let k = -1; for (let i = 0; i < FLIPS.length; i++) if (t >= FLIPS[i]) k = i; return k }
// dial angle (0 = sun on top); eases a half turn per flip, then whirls
function dialAng(t) {
  const k = flipState(t)
  if (k < 0) return -Math.PI
  const d = Math.min(0.32, (FLIPS[k + 1] ?? FLIPS[k] + 0.3) - FLIPS[k])
  return (k + easeOutBack(prog(t, FLIPS[k], FLIPS[k] + d), 1.6)) * Math.PI - Math.PI
}
const raining = t => { const k = flipState(t); return k >= 0 && k % 2 === 1 }

function starState(t) {
  if (t < T.cut) {
    if (t >= T.burst && t < T.burst + 0.5) return { mood: 'wide', look: [0, -1], blink: false }
    if (t >= T.burst + 0.5) return t < T.lines[0] ? { mood: 'wide', look: [1, -1], blink: false } : { mood: 'sparkle', look: [1, -1] }
    if (t >= T.dizzy) return { mood: 'eyeroll', blink: false }
    if (t < FLIPS[0]) return { mood: 'neutral', look: [0, -1] }
    return raining(t) ? { mood: 'squint', look: [0, -1] } : { mood: 'happy' }
  }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
  return { mood: 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 28px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0a = popText(root, 'Houston weather:', { top: 150, size: 92, at: T.h0a, gap: 0.1 })
  const H0 = popText(root, 'sunny, *pouring,* | sunny again.', { top: 262, size: 104, accentSize: 142, at: T.h0, gap: 1.111, wobble: true, accentColor: BLUE, lineHeight: 1.06 })
  const H1 = popText(root, 'Mixed signals? | *Not here.*', { top: 170, size: 120, accentSize: 176, at: T.h1, gap: 0.09, late: 2, lateAt: T.h1Not, lateGap: 0.1, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H2 = popText(root, 'Read the | *signs.*', { top: 170, size: 150, accentSize: 230, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Signs, wobble: true, accentColor: GOLD, lineHeight: 0.95 })
  const HEADS = [[H0a, T.h0Out], [H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: 14.05, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function legend(cx, cy, R, k) {
    if (k <= 0.01) return
    x.save(); x.globalAlpha *= clamp(k * 2); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 30px ${MONO}`; const w = x.measureText(R.k).width + 40
    x.beginPath(); x.roundRect(-w / 2, -26, w, 52, 26); x.fillStyle = 'rgba(16,10,36,0.9)'; x.fill(); ink(x, R.c, { w: 4, fa: 0, glow: 12 })
    x.fillStyle = R.c; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(R.k, 0, 2)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      const P = t < T.burst + 0.3 ? STAR1 : t < T.cut ? (() => { const e = ease.inOutCubic(prog(t, T.burst + 0.3, T.burst + 1.0)); return { x: lerp(STAR1.x, STAR2.x, e), y: lerp(STAR1.y, STAR2.y, e) - Math.sin(Math.PI * e) * 160, size: lerp(STAR1.size, STAR2.size, e) } })() : STAR3
      const st = starState(t)

      // ── beat 1: the weather dial
      if (t < T.burst + 0.05) {
        const dk = pop01(t, T.dial, 0.5, 1.6)
        const ang = dialAng(t)
        // arm + hub ring (faint)
        x.save(); x.globalAlpha *= 0.35 * dk
        x.beginPath(); x.arc(HUB.x, HUB.y, HUB.R, 0, TAU); x.strokeStyle = BONE; x.lineWidth = 3; x.setLineDash([10, 16]); x.stroke(); x.setLineDash([])
        x.restore()
        const sunP = { x: HUB.x + Math.sin(ang) * HUB.R, y: HUB.y - Math.cos(ang) * HUB.R }, cloudP = { x: HUB.x - Math.sin(ang) * HUB.R, y: HUB.y + Math.cos(ang) * HUB.R }
        const whirl = t >= T.dizzy ? prog(t, T.dizzy, T.burst) : 0
        sun(x, sunP.x, sunP.y, 0.62 * dk * (1 - 0.3 * whirl), t, {})
        cloud(x, cloudP.x, cloudP.y, 0.7 * dk * (1 - 0.3 * whirl), t, {})
        // rain from the cloud when it's up top
        const rk = raining(t) ? clamp((t - FLIPS[flipState(t)]) * 6) * clamp(-Math.cos(ang)) : 0
        const top = cloudP.y + 50, uOpen = rk > 0.5
        const floor = px => uOpen && Math.abs(px - P.x) < 150 ? P.y - P.size * 0.55 - 70 : P.y - P.size * 0.2
        if (cloudP.y < HUB.y) rain(x, cloudP.x, top, 150, t, rk, floor)
      }
      // ── beat 2: the charts lock, the reading draws
      if (t >= T.charts[0] && t < T.cut) {
        const ck = pop01(t, T.charts[0], 0.7, 1.4) * outK(t, T.chartsOut)
        const lock = ease.inOutCubic(prog(t, ...T.charts))
        for (const [C, dir, pls, col] of [[CA, -1, PLA, GOLD], [CB, 1, PLB, SILVER]]) {
          const cx = C.x + dir * 300 * (1 - lock), rot = dir * (1 - lock) * 2.4
          x.save(); x.globalAlpha *= clamp(ck * 2); x.translate(cx, C.y); x.rotate(rot); x.scale(CS * ck, CS * ck)
          drawWheelH(x, { k: 1, glyphK: 1, W: { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.85 } })
          x.restore()
        }
        // planets + lines (once locked)
        const pk = pop01(t, T.charts[1], 0.35, 2) * outK(t, T.chartsOut)
        const pA = PLA.map(a => ({ x: CA.x + Math.cos(a) * 110, y: CA.y + Math.sin(a) * 110 })), pB = PLB.map(a => ({ x: CB.x + Math.cos(a) * 110, y: CB.y + Math.sin(a) * 110 }))
        READ.forEach((R, i) => {
          const lp = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.4)) * outK(t, T.chartsOut)
          if (lp > 0) { x.save(); x.beginPath(); x.moveTo(pA[i].x, pA[i].y); x.lineTo(lerp(pA[i].x, pB[i].x, lp), lerp(pA[i].y, pB[i].y, lp)); ink(x, R.c, { w: 8, fa: 0, glow: 22 }); x.restore() }
          legend(300 + i * 240, 1185, R, pop01(t, T.lines[i] + 0.2, 0.3) * outK(t, T.chartsOut))
        })
        pA.forEach(p => orb(x, p.x, p.y, 16 * pk, GOLD, clamp(pk * 2)))
        pB.forEach(p => orb(x, p.x, p.y, 16 * pk, SILVER, clamp(pk * 2)))
      }
      if (t >= T.burst - 0.05 && t < T.burst + 0.8) {
        sparkle(x, 540, 700, t, T.burst, { n: 18, R: 420, seed: 3, size: 32, cols: ['#ffc93c', BLUE, BONE, GOLD] })
        sparkle(x, 540, 1600, t, T.burst + 0.05, { n: 12, R: 300, seed: 4, size: 26, cols: ['#ffc93c', BLUE, BONE] })
      }
      // ── beat 3: the reading rainbow + glyphs
      if (t >= T.cut) {
        READ.forEach((R, i) => {
          const p = ease.inOutCubic(prog(t, T.bow[0] + i * 0.12, T.bow[1] + i * 0.12))
          if (p <= 0) return
          x.save(); x.globalAlpha *= ok; x.beginPath(); x.arc(BOW.x, BOW.y, BOW.r[i], Math.PI, Math.PI + Math.PI * p); ink(x, R.c, { w: 26, fa: 0, glow: 26 }); x.restore()
        })
        SIGNS.forEach((s, i) => {
          const k = pop01(t, T.glyphs + i * 0.08, 0.3, 2.4) * ok
          if (k <= 0.01) return
          const a = Math.PI * (1.1 + 0.8 * (i + 0.5) / 12), gx2 = BOW.x + Math.cos(a) * 560, gy2 = BOW.y + Math.sin(a) * 560
          x.save(); x.globalAlpha *= clamp(k * 2); x.translate(gx2, gy2); x.scale(k, k)
          x.font = "bold 54px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
          x.fillStyle = s.color; x.shadowColor = s.color; x.shadowBlur = 14; x.fillText(s.glyph + '︎', 0, 0); x.restore()
        })
        sparkle(x, 540, 900, t, T.h2Signs, { n: 14, R: 360, seed: 8, size: 30 })
      }

      // ── Pisces (always crying; in the rain you can't even tell)
      {
        const pp = pop01(t, 1.1, 0.36, 2.1) * (t < T.cut ? 1 : ok)
        if (pp > 0.02) {
          const opts = { hops: [1.4, T.burst + 0.1, T.h2Signs + 0.1, T.wink[0] + 0.1], seed: 6, pop: pp, squash: 0.04 * Math.max(0, Math.sin(t * 15)) }
          drawStarChar(x, PISP.x, PISP.y, PISP.size, t, { ...PIS, glyph: null, mood: t < T.cut ? 'squint' : 'happy', glow: 0.9, ...opts })
          inSprite(x, starFrame(PISP.x, PISP.y, PISP.size, t, opts), () => tearsCells(x, t, t < T.cut ? 2 : 3))
        }
      }

      // ── the weather star
      {
        const pp = pop01(t, T.star, 0.4, 2.2) * (t < T.cut ? 1 : ok)
        let squash = 0
        if (t >= T.dizzy && t < T.burst) squash = 0.06 * Math.sin((t - T.dizzy) * 32)
        if (t >= T.burst && t < T.burst + 0.5) squash = 0.3 * Math.exp(-(t - T.burst) * 7) * Math.cos((t - T.burst) * 22)
        const k = flipState(t)
        if (k >= 0 && t < T.dizzy && t - FLIPS[k] < 0.25) squash += 0.1 * Math.sin(Math.PI * (t - FLIPS[k]) / 0.25)
        const opts = { hops: HOPS, seed: 3, pop: pp, squash }
        const r = drawStarChar(x, P.x, P.y, P.size, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, glow: 1.1, ...opts })
        const F = starFrame(P.x, P.y, P.size, t, opts)
        const sunny = t < T.burst && k >= 0 && !raining(t) && t < T.dizzy
        const shades = sunny || (t >= T.toss && !(t >= T.wink[0] && t < T.wink[1]))
        inSprite(x, F, () => { if (shades && pp > 0.3) shadesCells(x); if (sunny) sweatCells(x, t) })
        // umbrella: snaps open in the rain, shut in the sun; in beat 3 it's tossed away
        if (t < T.burst) {
          const open = raining(t) ? easeOutBack(prog(t, FLIPS[k], FLIPS[k] + 0.18), 2.5) : 1 - prog(t, FLIPS[k] ?? 0, (FLIPS[k] ?? 0) + 0.12)
          if (k >= 1) umbrella(x, r.x + P.size * 0.36, r.top - 40, 300, clamp(open), { a: pp, tilt: -0.18 + (t >= T.dizzy ? 0.4 * Math.sin(t * 20) : 0) })
        } else if (t >= T.cut && t < T.toss + 1.2) {
          const dt = Math.max(0, t - T.toss)
          umbrella(x, r.x + P.size * 0.36 + dt * 700, r.top - 40 - dt * 1100 + 0.5 * 2600 * dt * dt, 300, dt > 0 ? 0.2 : 1, { a: ok, tilt: -0.18 + dt * 9 })
        }
        if (t >= T.dizzy && t < T.burst) for (let i = 0; i < 3; i++) { const a2 = t * 8 + i * 2.09; drawPixelStar(x, r.x + Math.cos(a2) * 150, r.top - 30 + Math.sin(a2) * 26, 26, 2, i % 2 ? GOLD : BONE) }
      }

      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.72 (hook → mixed signals), 9.3 (the reading → "Read the signs."), 12.9. cardfx keeps one for a
// 20 s film: the 9.3 flip.
const CUTS = [4.72, { t: T.cut, kind: 'flip' }, 12.9]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.18, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.014, decay: 0.08, sustain: 0.5 }])

export const CUES = [
  ['busFx', 'sfx', { gain: 22 }],
  // hook: the dial flips
  ...wordPops(T.h0a, 2, 0.1, 0), ['pop', T.star + 0.05, 739.99, 0.045, 0], ['boom', T.dial, 0.08],
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.h0 + i * 1.111), NOTE[(2 + i * 2) % 7], 0.045, 0]),
  ...FLIPS.map((f, i) => ['whoosh', r3(f - 0.04), i < 7 ? 0.22 : 0.12, i < 7 ? 0.04 : 0.025]),
  ...FLIPS.map((f, i) => i % 2 ? ['pluck', f, 587.33, 0.03, 0.3, 0.3] : ['bell', f, 1174.66, 0.025, 0.6, -0.3]),
  ...FLIPS.filter((_, i) => i % 2 && i < 7).map(f => ['tick', r3(f + 0.05), 0.06]),
  ['riser', T.dizzy, T.burst, 0.03],
  ['pop', 1.15, 987.77, 0.035, 0.4], ...sob(1.5, 1320), ...sob(3.0, 1250),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SPEAK]: 740 } }),
  // mixed signals? not here.
  ...wordPops(T.h1, 2, 0.09, 1), ['pop', T.h1Not, 1174.66, 0.05, 0], ['pop', T.h1Not + 0.1, 1318.51, 0.045, 0], ['pluck', T.h1Not, 1174.66, 0.04, 0.7, 0],
  ['boom', T.burst, 0.16], ['glitter', T.burst, T.burst + 0.8], ['tom', T.burst, 80, { ...FX, gain: 0.24, decay: 0.3 }],
  ['whoosh', T.charts[0], 0.6, 0.04], ['tick', T.charts[1], 0.07], ['pop', T.charts[1], 880, 0.04, 0],
  ...T.lines.map((l, i) => ['pluck', l, [739.99, 880, 1174.66][i], 0.045, 0.5, (i - 1) * 0.4]), ['bell', T.lines[2] + 0.4, 1174.66, 0.035, 1.2, 0],
  // read the signs
  ...wordPops(T.h2, 2, 0.09, 2), ['pop', T.h2Signs, 1318.51, 0.055, 0], ['pluck', T.h2Signs, 1174.66, 0.045, 0.7, 0],
  ...[0, 1, 2].map(i => ['bell', r3(T.bow[0] + 0.2 + i * 0.12), [587.33, 739.99, 880][i], 0.03, 1.4, (i - 1) * 0.3]),
  ...SIGNS.map((_, i) => ['pop', r3(T.glyphs + i * 0.08), NOTE[i % 7] * 2, 0.016, (i / 11 - 0.5) * 0.8]),
  ['whoosh', T.toss, 0.5, 0.04], ...sob(T.h2Signs + 0.2, 1568), ...sob(12.2, 1660, 2),
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
