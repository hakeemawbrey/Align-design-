// st4firstdate (20 s vertical Align ad, Star Talk season 4, EP 038, thread B4: Leo × Aquarius, the first date)
//   story 0–15.6, then the shared end card (JOIN THE HOUSTON BETA).
//   0.00–2.80  "Leo and Aquarius: | the *first* date."  A Montrose taco-truck patio at night: string lights, a painted
//              mural wall (EP 006's wall), a generic taco truck. ♌ Leo (crown) and ♒ Aquarius (headphones round its neck)
//              sit at a little table, two tacos, two veiled cards (no faces yet). Libra, scale on its head, waves from
//              the truck window with a taco (it picked tacos in EP 019).
//   2.82–5.40  LEO: "so, back to me. one time i—"  Leo's own little spotlight clunks on; across the table Aquarius's
//              headphones slowly creep up toward its ears. 4.45: Leo catches itself (wide eyes, the spotlight clunks off).
//   5.45–7.90  "Plot twist: | a *question.*"  LEO: "wait. how was *your* day?"  The headphones drop back round the neck.
//   7.95–10.3  AQUARIUS (sparkle, blushing): "you asked about my day."
//  10.35–12.4  LEO (crown tilted, blushing): "i'm *learning.*"
//  12.55       card cut (flip, box shut). The patio drops into the freed space.
//  12.65–15.45 "Learning looks | *good* on you."  The spotlight comes back on, wide enough for both. Hearts; Libra cheers.
//              The ghost rises over the top of the mural wall (13.15). Out by 15.45.
// One canvas (sky + constellation + patio + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, LAV, MONO, BEAT, pop01, outK, popOut, rgba, drawBits, CROWN, CROWN_C, sparkles, floatHearts, tipOf, headphones, drawSkyline } from './kit.js'

export const DURATION = 20
const EP = 38
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const AQU = signStar('aquarius'), LEO = signStar('leo'), LIB = signStar('libra')
const CYAN = AQU.color, ORANGE = LEO.color, ACC = '#8af0ff', MINT = '#7dffb0'
const LEO_TAG = `${LEO.glyph} LEO STAR`, AQ_TAG = `${AQU.glyph} AQUARIUS STAR`
const CPS = 28
const LINES = [
  { t: BEAT(4), speaker: LEO_TAG, text: 'so, back to me. one time i—', color: ORANGE },
  { t: 5.65, speaker: LEO_TAG, text: 'wait. how was *your* day?', color: ORANGE },
  { t: 8.2, speaker: AQ_TAG, text: 'you asked about my day.', color: ACC },
  { t: 10.55, speaker: LEO_TAG, text: "i'm *learning.*", color: GOLD },
]
const LT = lineTimes(LINES, { cps: CPS })

const T = {
  h0: 0.12, h0Out: [5.45, 5.63],
  patio: 0.15, leoIn: 0.45, aqIn: 0.6, libIn: 0.95, wave: [1.0, 2.6], open: 2.66,
  spot: BEAT(4) + 0.2, creep: [3.1, 4.4], catch: LT[0].done + 0.45,
  h1: 5.75, h1Land: 6.15, h1Out: [12.45, 12.63],
  your: LT[1].chars[16], drop: LT[1].chars[16] + 0.05,
  aqSpark: LINES[2].t, leoBlush: LINES[3].t, close: 12.6,
  cut: 12.7, h2: 12.8, h2Land: 13.2, spot2: 13.0, hearts: 13.5, ghost: 13.25,
  out: [15.08, 15.45],
}

// ── layout
const L = { x: 310, y: 1070, size: 250 }, A = { x: 770, y: 1070, size: 250 }
const LIBP = { x: 168, y: 905, size: 108 }
const TABLE_Y = 1222
const TRUCK = { x0: 40, x1: 480, y0: 735, y1: 1090 }
const WALL = { x0: 560, x1: 1040, y0: 730, y1: 1090 }
const LOW = 150, lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

const LEO_HOPS = [T.leoIn + 0.3, ...talkHops([LINES[0], LINES[1], LINES[3]], LEO_TAG, { cps: CPS }), T.catch, T.h2Land, T.hearts]
const AQ_HOPS = [T.aqIn + 0.3, ...talkHops(LINES, AQ_TAG, { cps: CPS }), T.drop + 0.1, T.h2Land + 0.08, T.hearts + 0.1]

function leoState(t) {
  if (t < T.spot) return { mood: 'happy', look: [1, 0] }
  if (t < T.catch) return { mood: 'sparkle', look: [0, -1] }                     // talking about itself, gazing up
  if (t < T.catch + 0.6) return { mood: 'wide', look: [1, 0], blink: false }      // …oh no
  if (t < LINES[1].t) return { mood: 'neutral', look: [1, 0] }
  if (t < T.aqSpark) return { mood: 'happy', look: [1, 0] }
  if (t < T.leoBlush) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.h2Land) return { mood: 'happy', look: [1, 0], blush: 1 }
  return { mood: 'heart' }
}
function aqState(t) {
  if (t < T.spot) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.creep[1]) return { mood: 'eyeroll' }
  if (t < T.catch + 0.1) return { mood: 'squint', look: [-1, 0] }
  if (t < T.drop) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.drop + 0.6) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.leoBlush) return { mood: 'sparkle', look: [-1, 0], blush: 0.9 }
  if (t < T.h2Land) return { mood: 'happy', look: [-1, 0] }
  return { mood: t > 14.2 && t < 14.6 ? 'wink' : 'heart' }
}
// headphones: 1 = round the neck, 0 = on the ears. They creep up while Leo monologues, then drop when it asks.
const phonesK = t => t < T.creep[0] ? 1 : t < T.drop ? lerp(1, 0.3, ease.inOutQuad(prog(t, ...T.creep))) : lerp(0.3, 1, ease.outBack(prog(t, T.drop, T.drop + 0.3)))

const SCALE = ['....Y....', 'YYYYYYYYY', 'Y...Y...Y', 'Y...Y...Y', 'WW..Y..WW', '....Y....', '..YYYYY..']
const SCALE_C = { Y: '#f7c948', W: '#fff1c8' }
const TACO = ['...yyyyy...', '.yyGgRgGyy.', 'yyGRMMMRGyy', 'yYYYYYYYYYy', '.yyyyyyyyy.']
const TACO_C = { y: '#c98a1f', Y: '#f7c948', G: '#5fd06a', g: '#9cf06a', R: '#ff5a4a', M: '#a8642a' }
const VEIL = ['CCCCCCC', 'CLLLLLC', 'CLL?LLC', 'CLLLLLC', 'CLLLLLC', 'CCCCCCC']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 28px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Leo and Aquarius: | the *first* date.', { top: 190, size: 100, accentSize: 150, at: T.h0, gap: 0.08, accentColor: PINK, wobble: true, fit: true })
  const H1 = popText(root, 'Plot twist: | a *question.*', { top: 190, size: 108, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: ACC, fit: true })
  const H2 = popText(root, 'Learning looks | *good* on you.', { top: 180, size: 110, accentSize: 168, at: T.h2, gap: 0.1, wobble: true, accentColor: GOLD, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawBackdrop(t, dy, k) {
    // a generic skyline far behind
    drawSkyline(x, t, { y: 760 + dy, scale: 0.7, alpha: 0.55 * k, lit: 0.3 })
    // the mural wall (EP 006): sunset stripes + a little orange star in a crown
    const wk = pop01(t, T.patio, 0.45, 1.4) * k
    if (wk > 0) {
      x.save(); x.translate(0, (1 - wk) * 500 + dy)
      const { x0, x1, y0, y1 } = WALL
      x.fillStyle = INK; x.fillRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12)
      const stripes = ['#ff7a59', '#ff9f5a', '#ffc46b', '#ff8fb1', '#c97ae0', '#7a5ad0']
      stripes.forEach((c, i) => { x.fillStyle = c; x.fillRect(x0, y0 + i * (y1 - y0) / 6, x1 - x0, (y1 - y0) / 6 + 1) })
      x.fillStyle = 'rgba(16,9,38,0.35)'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
      drawPixelStar(x, 930, 830, 120, 0, '#f39a3a')
      drawBits(x, CROWN, CROWN_C, 930, 770, 5)
      for (let i = 0; i < 5; i++) { x.fillStyle = rgba(BONE, 0.5); x.fillRect(x0 + 30 + i * 22, y1 - 40 - (i % 2) * 8, 12, 12) }
      x.restore()
    }
    // the taco truck (generic: no names, a taco on the sign)
    const tk = pop01(t, T.patio + 0.1, 0.45, 1.4) * k
    if (tk > 0) {
      x.save(); x.translate(0, (1 - tk) * 500 + dy)
      const { x0, x1, y0, y1 } = TRUCK
      x.fillStyle = INK; x.fillRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12)
      x.fillStyle = '#f2ecdc'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
      x.fillStyle = '#e8524a'; x.fillRect(x0, y0 + 60, x1 - x0, 16)
      x.fillStyle = '#3fb6a0'; x.fillRect(x0, y1 - 40, x1 - x0, 14)
      // the serving window, lit
      x.fillStyle = INK; x.fillRect(x0 + 40, y0 + 100, 340, 150)
      x.fillStyle = '#ffd98a'; x.fillRect(x0 + 48, y0 + 108, 324, 134)
      x.fillStyle = '#e8524a'; for (let i = 0; i < 9; i++) x.fillRect(x0 + 48 + i * 36, y0 + 96, 18, 22)   // awning
      // the sign: just a taco
      drawBits(x, TACO, TACO_C, (x0 + x1) / 2, y0 + 30, 7)
      // wheels
      for (const wx of [x0 + 80, x1 - 80]) { x.fillStyle = INK; x.fillRect(wx - 36, y1 - 12, 72, 40); x.fillStyle = '#4a4070'; x.fillRect(wx - 24, y1, 48, 20) }
      x.restore()
    }
  }

  function drawLights(t, dy, k) {
    const cols = [GOLD, PINK, ACC, '#ffd98a', LAV]
    for (let s = 0; s < 2; s++) for (let i = 0; i <= 18; i++) {
      const u = i / 18, xx = lerp(-10, 1090, u), yy = 640 + s * 50 + Math.sin(u * Math.PI * 2 + s) * 24 + Math.sin(u * Math.PI) * 30 + dy
      const on = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.7 + s)
      const a = clamp(k * 1.5 - u * 0.5 - 0.1 * s)
      if (a <= 0) continue
      x.globalAlpha = a
      x.fillStyle = rgba(cols[(i + s) % 5], 0.25 * on); x.fillRect(xx - 12, yy - 12, 24, 24)
      x.fillStyle = cols[(i + s) % 5]; x.fillRect(xx - 5, yy - 5, 10, 10)
    }
    x.globalAlpha = 1
  }

  function drawSpot(t, dy, k) {
    const on1 = t > T.spot && t < T.catch ? (t - T.spot < 0.06 || (t - T.spot > 0.1 && t - T.spot < 0.14) ? 0.4 : 1) : 0
    const on2 = t > T.spot2 ? ease.outCubic(prog(t, T.spot2, T.spot2 + 0.4)) : 0
    const on = Math.max(on1, on2) * k
    if (on <= 0) return
    const cx = lerp(L.x, 540, on2), R = lerp(180, 470, on2), PY = TABLE_Y - 10 + dy
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, 480, 0, PY)
    g.addColorStop(0, `rgba(255,236,190,${0.04 * on})`); g.addColorStop(1, `rgba(255,214,150,${0.2 * on})`)
    x.fillStyle = g
    x.beginPath(); x.moveTo(cx - 40, 480 + dy); x.lineTo(cx + 40, 480 + dy); x.lineTo(cx + R, PY); x.lineTo(cx - R, PY); x.closePath(); x.fill()
    x.restore()
  }

  function drawTable(t, dy, k) {
    const tk = pop01(t, T.patio + 0.25, 0.4, 1.6) * k
    if (tk <= 0) return
    const y = TABLE_Y + dy + (1 - tk) * 300
    x.fillStyle = INK; x.fillRect(150, y - 6, 780, 46)
    x.fillStyle = '#c47a3a'; x.fillRect(156, y, 768, 34)
    x.fillStyle = '#e89a52'; x.fillRect(156, y, 768, 8)
    x.fillStyle = '#8a4f22'; x.fillRect(200, y + 40, 26, 200); x.fillRect(854, y + 40, 26, 200)
    // plates + tacos
    for (const px of [450, 630]) {
      x.fillStyle = INK; x.fillRect(px - 66, y - 18, 132, 20); x.fillStyle = BONE; x.fillRect(px - 60, y - 14, 120, 12)
      drawBits(x, TACO, TACO_C, px, y - 36, 8)
    }
    // two veiled cards, face down: card first, face last
    for (const [cx, rot] of [[205, -0.12], [875, 0.12]]) {
      const shimmer = 0.5 + 0.5 * Math.sin(t * 3 + cx)
      drawBits(x, VEIL, { C: GOLD, L: shimmer > 0.7 ? '#9a7ae8' : '#7a5ad0', '?': BONE }, cx, y - 34, 9, { rot })
    }
  }

  function drawLibra(t, dy, k) {
    const lp = pop01(t, T.libIn, 0.35, 2.2) * k
    if (lp <= 0.02) return
    const wave = t > T.wave[0] && t < T.wave[1] ? Math.sin((t - T.wave[0]) * 12) * 0.08 : 0
    const cheer = t > T.h2Land
    const r = drawStarChar(x, LIBP.x, LIBP.y + dy, LIBP.size, t, { color: LIB.color, mood: cheer ? 'heart' : t < T.wave[1] ? 'happy' : 'neutral', look: t < T.wave[1] ? [0, 0] : [1, 1], hops: [T.libIn + 0.3, 1.3, 1.85, 2.4, T.h2Land + 0.2, T.hearts + 0.3, 14.5], seed: 14, pop: lp, glow: 0.7, squash: wave })
    drawBits(x, SCALE, SCALE_C, Math.round(r.x), Math.round(r.top - 14), 4, { rot: Math.sin(t * 2) * 0.08 })
    drawBits(x, TACO, TACO_C, Math.round(r.x + 64), Math.round(r.y + 6 + Math.sin(t * 9) * (t < T.wave[1] ? 6 : 1)), 4, { rot: -0.3 })
  }

  function drawSweat(t, sx, sy) {
    if (t < T.catch || t > T.catch + 1.2) return
    const ph = ((t - T.catch) * 1.5) % 1
    x.globalAlpha = 1 - ph; x.fillStyle = ACC
    x.fillRect(sx, sy + ph * 40, 10, 14); x.fillRect(sx + 2, sy - 6 + ph * 40, 6, 6)
    x.globalAlpha = 1
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      if (ok > 0) {
        const k = clamp(ok * 1.4)
        drawBackdrop(t, dy, k)
        drawGhostCameo(x, t, { x: 980, y: WALL.y0 - 6 + dy, at: T.ghost, dur: 1.4, from: 'below', cell: 4 })
        drawLights(t, dy, prog(t, T.patio, T.patio + 0.8) * k)
        drawLibra(t, dy, ok)
        drawSpot(t, dy, k)
        // Leo, crown on
        const lp = pop01(t, T.leoIn, 0.34, 2.1) * ok
        if (lp > 0.02) {
          const lo = { color: ORANGE, glyph: LEO.glyph, ...leoState(t), hops: LEO_HOPS, pop: lp, seed: 3, glow: 1.1 }
          const r = drawStarChar(x, L.x, L.y + dy, L.size, t, lo)
          const tip = tipOf(t, r, L.size, lp, lo)
          const tilt = t > T.leoBlush ? -0.25 : -0.08
          drawBits(x, CROWN, CROWN_C, tip.x - 4, tip.y - 8 * lp, 6 * lp, { rot: tilt })
          drawSweat(t, L.x + 90, r.y - 110)
          if (t > T.spot && t < T.catch) sparkles(x, t, L.x, L.y + dy, T.spot + 0.1, 8, 150, 2, [GOLD, ORANGE, BONE])
          if (t > T.catch && t < T.catch + 0.5) sparkles(x, t, L.x + 120, L.y + dy - 140, T.catch, 6, 50, 3, [BONE, ACC])
        }
        // Aquarius, headphones creeping
        const ap = pop01(t, T.aqIn, 0.36, 2.0) * ok
        if (ap > 0.02) {
          const ao = { color: CYAN, glyph: AQU.glyph, ...aqState(t), hops: AQ_HOPS, pop: ap, seed: 8, glow: 1.0 }
          const r = drawStarChar(x, A.x, A.y + dy, A.size, t, ao)
          headphones(x, r, A.size * ap, phonesK(t))
          if (t > T.aqSpark && t < T.aqSpark + 0.8) sparkles(x, t, A.x, A.y + dy - 40, T.aqSpark, 10, 160, 1, [ACC, BONE, '#ff4fd8'])
        }
        drawTable(t, dy, k)
        if (t > T.hearts) floatHearts(x, t, 540, 1080 + dy, T.hearts, T.out[0] - 0.4, 1, 7, 260)
        if (t > T.leoBlush && t < T.cut) floatHearts(x, t, A.x - 40, 1000 + dy, T.leoBlush + 0.4, T.close - 0.4, 4, 6, 120)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.47 (H0 → H1 while the box talks: inert) and 12.55 (box shut → "Learning looks good on you.").
const CUTS = [5.67, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 6, 0.08, 0, 0.024),
  ['whoosh', T.patio, 0.5, 0.03], ['pop', T.leoIn + 0.05, 739.99, 0.04, -0.3], ['pop', T.aqIn + 0.05, 659.25, 0.04, 0.3],
  ['pop', T.libIn + 0.05, 987.77, 0.03, -0.4], ['pluck', 1.3, 1174.66, 0.025, 0.4, -0.4],
  ['pop', T.open, 659.25, 0.035, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LEO_TAG]: 520, [AQ_TAG]: 700 } }),
  ['boom', T.spot, 0.12], ['tick', T.spot, 0.05], ['tick', T.spot + 0.11, 0.03],
  ['whoosh', T.creep[0], 1.2, 0.015],
  ['tick', T.catch, 0.06], ['pop', T.catch, 330, 0.045, -0.3], ['boom', T.catch + 0.02, 0.08],
  ...wordPops(T.h1, 3, 0.08, 2, 0.024), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.drop, 880, 0.03, 0.3], ['pluck', T.drop + 0.05, 1318.51, 0.035, 0.5, 0.3],
  ['glitter', T.aqSpark, T.aqSpark + 0.6], ['pluck', T.leoBlush + 0.3, 1046.5, 0.035, 0.5, -0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land + 0.12, 1046.5, 0.045, 0.7, 0], ['pop', T.h2Land + 0.24, 1567.98, 0.04, 0],
  ['bell', T.spot2, 1318.51, 0.03, 1.4, 0], ['glitter', T.hearts, T.hearts + 0.7],
  ['pop', T.ghost + 0.1, 1567.98, 0.012, 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
