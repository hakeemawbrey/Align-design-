// sr08houston (20 s vertical Align ad, Star Talk Remix of teaser 08 "Houston, the stars are dealing") · story 0–15.6,
// then the end card.
//   0.00–5.15  "Houston, | the stars are *dealing.*"  A pixel Houston skyline at night, windows flickering. The gold
//              narrator star rises over the towers (and sweats: it's Houston); twelve little sign stars light up one by
//              one over the city. Drop (2.82): THE STARS: "evening, houston. the deck is *open.*"
//   5.20–10.40 "First come, | first *dealt.*"  The gold founding card № 0112 stamps down over the skyline and the little
//              stars rush to it. ♐ Sag skids in from the right: "i'm 10 minutes away!!" THE STARS, deadpan:
//              "babe. in houston that's *an hour.*" Sag sweats.
//   11.05 cut → "Founding cards | are *numbered.*"  The card up close, glinting, ringed by heart-eyed stars; Sag finally
//              made it. Then "Houston, the stars | are *dealing.*" Everything pops out by 15.45; the end card at 15.6.
// One canvas (sky + skyline + stars + card), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const BEAT = n => 0.6 + n * 0.5556
const SAG = signStar('sagittarius')

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.95, 5.12], rise: 0.35, sweat: 3.9,
  open: 2.66, l1: BEAT(4) + 0.02,                    // the drop: 2.82
  h1: 5.2, h1Land: 5.6, stamp: 5.55, rush: [5.85, 6.5], sagIn: [5.3, 5.7],
  l2: 5.88, l3: 8.2, deadpan: 8.2, sagSweat: 9.3, close: 11.0, h1Out: [10.85, 11.03],
  cut: 11.05,
  h2: 11.15, h2Land: 11.55, glint: 11.8, h2Out: [12.95, 13.12],
  h3: 13.18, h3Land: 13.65, out: [15.05, 15.45],
}
const SPEAK = 'THE STARS', SAGN = '♐ SAG STAR'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'evening, houston. the deck is *open.*' },
  { t: T.l2, speaker: SAGN, text: "i'm *10 minutes* away!!", color: SAG.color },
  { t: T.l3, speaker: SPEAK, text: "babe. in houston that's *an hour.*" },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const hash = n => { const s = Math.sin(n * 127.1 + 3.7) * 43758.5453; return s - Math.floor(s) }

// ── the skyline: deterministic pixel towers (generic: stepped tops, a spire, a slanted roof), base at y 1520
const BASE = 1520, PXW = 6
const TOWERS = (() => {
  const out = []; let xx = -20, k = 0
  while (xx < 1100) {
    const w = 60 + Math.round(hash(k) * 70), tall = k % 4 === 1 || k % 7 === 3
    const h = Math.round((tall ? 330 : 140) + hash(k + 50) * (tall ? 170 : 150))
    out.push({ x: xx, w, h, roof: k % 5, k }); xx += w + 6 + Math.round(hash(k + 9) * 10); k++
  }
  return out
})()

// ── layout
const NARR = { x: 540, y: 960, size: 250 }, NARR_B = { x: 190, y: 1270, size: 200 }, NARR_C = { x: 175, y: 1400, size: 210 }
const SAG_B = { x: 880, y: 1270, size: 180 }, SAG_C = { x: 900, y: 1405, size: 200 }
const CARD_B = { x: 540, y: 880, h: 540 }, CARD_C = { x: 540, y: 960, h: 620 }
const LITTLE = SIGNS.map((s, i) => ({ c: s.color, x: 110 + (i % 6) * 172 + (i >= 6 ? 86 : 0), y: i < 6 ? 640 + hash(i) * 120 : 860 + hash(i + 20) * 120, t: 1.0 + i * 0.19 }))
const B = t => ease.inOutCubic(prog(t, 5.3, 5.8))               // beat A → B moves
const C = t => ease.inOutCubic(prog(t, 11.0, 11.1))             // under the cut

function narrState(t) {
  if (t < T.sweat) return { mood: 'happy' }
  if (t < T.stamp) return { mood: 'neutral', look: [0, 0] }
  if (t < T.l2) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.deadpan) return { mood: 'neutral', look: [1, 0] }
  if (t < T.cut) return { mood: 'squint', look: [0, 0], blink: false }
  if (t < T.h3) return { mood: 'heart', look: [1, -1] }
  if (t >= T.h3Land && t < T.h3Land + 0.5) return { mood: 'wink' }
  return { mood: 'happy' }
}
function sagState(t) {
  if (t < T.l3 + 0.4) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.cut) return { mood: 'wide', look: [-1, 0], blink: false, blush: 1 }
  if (t < T.h3) return { mood: 'heart', look: [-1, -1] }
  return { mood: 'happy' }
}
const NARR_HOPS = [T.rise + 0.6, ...talkHops(LINES, SPEAK, { cps: CPS }).filter(h => h < T.h1 || h > T.l3), T.stamp + 0.05, T.h3Land, T.h3Land + 0.6]
const SAG_RUN = Array.from({ length: 6 }, (_, i) => +(T.sagIn[1] + 0.05 + i * 0.27).toFixed(3))       // running on the spot: "I'm coming!"
const SAG_HOPS = [...SAG_RUN, T.h2Land, T.h3Land + 0.2, T.h3Land + 0.8]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const imCard = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-founding.png' })

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston, | the stars are *dealing.*', { top: 230, size: 100, accentSize: 150, at: T.h0, gap: 0.08, wobble: true, late: 1, lateAt: T.h0 + 0.62 })
  const H1 = popText(root, 'First come, | first *dealt.*', { top: 200, size: 104, accentSize: 160, at: T.h1, gap: 0.08, wobble: true, late: 1, lateAt: T.h1Land, accentColor: PINK })
  const H2 = popText(root, 'Founding cards | are *numbered.*', { top: 150, size: 100, accentSize: 150, at: T.h2, gap: 0.08, wobble: true, late: 1, lateAt: T.h2Land })
  const H3 = popText(root, 'Houston, the stars | are *dealing.*', { top: 150, size: 100, accentSize: 150, at: T.h3, gap: 0.08, wobble: true, late: 1, lateAt: T.h3Land })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK, '#fff1c8']) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 30 * (1 - 0.4 * p), 1, cols[i % cols.length]) }
    x.restore()
  }

  function skyline(t) {
    const ok = 1 - 0.5 * C(t)
    // a warm city glow on the horizon
    const g = x.createLinearGradient(0, BASE - 520, 0, BASE)
    g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(1, `rgba(255,140,110,${0.28 * ok})`)
    x.fillStyle = g; x.fillRect(0, BASE - 520, 1080, 520)
    for (const tw of TOWERS) {
      const top = BASE - tw.h
      x.fillStyle = '#140c2c'; x.fillRect(tw.x, top, tw.w, tw.h + 420)
      // roofs
      x.fillStyle = '#140c2c'
      if (tw.roof === 0) { x.fillRect(tw.x + tw.w * 0.2, top - 24, tw.w * 0.6, 24); x.fillRect(tw.x + tw.w * 0.35, top - 48, tw.w * 0.3, 24) }
      if (tw.roof === 2) { x.fillRect(tw.x + tw.w / 2 - 3, top - 90, 6, 90); x.fillStyle = `rgba(255,70,80,${0.5 + 0.5 * Math.sin(t * 3 + tw.k)})`; x.fillRect(tw.x + tw.w / 2 - 5, top - 96, 10, 10) }
      if (tw.roof === 4) { for (let s = 0; s < 6; s++) x.fillRect(tw.x, top - s * 10, tw.w - s * (tw.w / 6), 10) }
      x.fillStyle = 'rgba(160,120,255,0.18)'; x.fillRect(tw.x, top, 4, tw.h)
      // windows
      for (let wy = top + 16; wy < BASE - 10; wy += 22) for (let wx = tw.x + 10; wx < tw.x + tw.w - 12; wx += 16) {
        const h0 = hash(wx * 0.37 + wy * 1.13)
        if (h0 < 0.55) continue
        const on = hash(h0 * 99 + Math.floor(t * 0.7 + h0 * 9)) > 0.15
        if (!on) continue
        x.fillStyle = h0 > 0.92 ? 'rgba(255,214,140,0.9)' : 'rgba(255,214,140,0.42)'
        x.fillRect(wx, wy, PXW, PXW + 2)
      }
    }
  }

  function drawCard(t) {
    const p = prog(t, T.stamp - 0.25, T.stamp), ok = popOut(t, T.out)
    if (!imCard || p <= 0 || ok <= 0) return
    const c = C(t), h = lerp(CARD_B.h, CARD_C.h, c), cx = CARD_B.x, cy = lerp(CARD_B.y, CARD_C.y, c)
    const drop = 1 - ease.inCubic(p)                                     // falls from big + high, then stamps
    const land = t > T.stamp ? 1 + 0.06 * Math.exp(-(t - T.stamp) * 9) * Math.cos((t - T.stamp) * 30) : 1
    const s = (1 + drop * 1.2) * land * ok
    const w = h * 1264 / 1584
    x.save(); x.globalAlpha = clamp(p * 2); x.translate(cx, cy + Math.sin(t * 1.3) * 6 * prog(t, T.stamp, T.stamp + 0.5)); x.rotate(drop * -0.25 + 0.02 * Math.sin(t * 1.1)); x.scale(s, s)
    x.drawImage(imCard, -w / 2, -h / 2, w, h)
    const sk = Math.max(prog(t, T.stamp + 0.1, T.stamp + 0.9), prog(t, T.glint, T.glint + 0.9))
    if (sk > 0 && sk < 1) { x.globalCompositeOperation = 'lighter'; const gx0 = lerp(-w, w, sk); const g = x.createLinearGradient(gx0 - 70, -h / 2, gx0 + 70, h / 2); g.addColorStop(0, 'rgba(255,220,150,0)'); g.addColorStop(0.5, `rgba(255,240,200,${0.55 * Math.sin(Math.PI * sk)})`); g.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = g; x.beginPath(); x.roundRect(-w / 2 + 30, -h / 2 + 30, w - 60, h - 60, 30); x.fill() }
    x.restore()
    // the stamp shockwave
    const sw = prog(t, T.stamp, T.stamp + 0.5)
    if (sw > 0 && sw < 1) { x.save(); x.globalAlpha = 1 - sw; x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.ellipse(cx, cy + h * 0.45, 260 + 300 * sw, 50 + 60 * sw, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
    if (t > T.stamp) sparkles(t, cx, cy, T.stamp, 12, 360, 0.4)
  }

  function littleStars(t) {
    const ok = popOut(t, T.out)
    LITTLE.forEach((L, i) => {
      const p = pop01(t, L.t, 0.35, 2.2) * ok
      if (p <= 0.02) return
      // rush to ring the card, then settle into the ring
      const r = ease.inOutCubic(prog(t, T.rush[0] + i * 0.03, T.rush[1] + i * 0.03))
      const a = -Math.PI / 2 + (i / 12) * Math.PI * 2 + t * 0.15 * r
      const c = C(t), rx = lerp(370, 410, c), ry = lerp(320, 370, c), cy = lerp(CARD_B.y, CARD_C.y, c)
      const px = lerp(L.x + Math.sin(t * 1.2 + i) * 14, CARD_B.x + Math.cos(a) * rx, r)
      const py = lerp(L.y + Math.cos(t * 1.4 + i * 2) * 10, cy + Math.sin(a) * ry, r) - Math.sin(Math.PI * r) * 60
      const mood = t < T.stamp ? (i % 3 ? 'happy' : 'neutral') : t < T.rush[1] ? 'wide' : t < T.cut ? 'sparkle' : 'heart'
      drawStarChar(x, px, py, 88, t, { color: L.c, mood, look: [0, 0], pop: p, seed: i * 5 + 2, glow: 0.9, tips: false, hops: [L.t + 0.3, T.rush[1] + i * 0.03, T.h3Land + i * 0.05] })
    })
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    // the narrator: rises over the towers, then steps aside for the card
    const rise = ease.outCubic(prog(t, T.rise, T.rise + 0.8)), b = B(t), c = C(t)
    const N = { x: lerp(NARR.x, NARR_B.x, b), y: lerp(NARR.y + (1 - rise) * 500, NARR_B.y, b), size: lerp(NARR.size, NARR_B.size, b) }
    const nx = lerp(N.x, NARR_C.x, c), ny = lerp(N.y, NARR_C.y, c), ns = lerp(N.size, NARR_C.size, c)
    const flinch = t >= T.stamp && t < T.stamp + 0.5 ? -0.16 * Math.exp(-(t - T.stamp) * 7) * Math.cos((t - T.stamp) * 24) : 0
    const rN = drawStarChar(x, nx, ny, ns, t, { color: STAR.sky, ...narrState(t), hops: NARR_HOPS, pop: clamp(rise * 1.4) * ok, squash: flinch, seed: 2, glow: 1.2 })
    // Houston humidity: a sweat drop or two
    for (const t0 of [T.sweat, T.sweat + 0.55]) {
      const k = prog(t, t0, t0 + 0.8)
      if (k > 0 && k < 1) drawDrop(rN.x + ns * 0.38, rN.top + ns * 0.18 + k * 60, Math.sin(Math.PI * k))
    }
    // Sag skids in from the right and runs on the spot
    const sp = prog(t, ...T.sagIn)
    if (sp > 0) {
      const sx = lerp(1250, SAG_B.x, ease.outCubic(sp)), skid = sp >= 1 && t < T.sagIn[1] + 0.3 ? 0.14 * Math.exp(-(t - T.sagIn[1]) * 9) : 0
      const S = { x: lerp(sx, SAG_C.x, c), y: lerp(SAG_B.y, SAG_C.y, c), size: lerp(SAG_B.size, SAG_C.size, c) }
      const rS = drawStarChar(x, S.x, S.y, S.size, t, { color: SAG.color, glyph: SAG.glyph, ...sagState(t), hops: SAG_HOPS, pop: ok, squash: skid, seed: 6 })
      for (const t0 of [T.sagSweat, T.sagSweat + 0.45, T.sagSweat + 0.9]) {
        const k = prog(t, t0, t0 + 0.8)
        if (k > 0 && k < 1) drawDrop(rS.x - S.size * 0.36, rS.top + S.size * 0.2 + k * 60, Math.sin(Math.PI * k))
      }
      // speed lines while it runs in
      if (sp < 1) { x.save(); x.globalAlpha = 0.7 * (1 - sp); x.fillStyle = BONE; for (let k = 0; k < 4; k++) x.fillRect(S.x + 110 + k * 26, S.y - 50 + k * 30, 70, 6); x.restore() }
    }
  }
  function drawDrop(cx, cy, a) {
    const D = ['..X..', '.XWX.', 'XWXXX', 'XXXXX', '.XXX.'], P = 7
    x.save(); x.globalAlpha = a
    D.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'W' ? '#e9fbff' : '#7fdcff'; x.fillRect(cx + (i - 2.5) * P, cy + (j - 2.5) * P, P, P) }))
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        // the narrator rises from behind the skyline, so it's drawn first in beat 1
        if (t < T.rise + 0.8) { drawStars(t); skyline(t) } else { skyline(t) }
        drawCard(t)
        littleStars(t)
        if (t >= T.rise + 0.8) drawStars(t)
      } else skyline(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// one card cut: 11.05 (box shut → "Founding cards are numbered."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, b = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(b + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.08, 0, 0.024), ['pop', T.h0 + 0.62, 1046.5, 0.045, 0],
  ['whoosh', T.rise, 0.7, 0.04], ['pluck', T.rise + 0.6, 783.99, 0.04, 0.5, 0],
  ...LITTLE.map((L, i) => ['pop', +(L.t + 0.05).toFixed(3), NOTE[i % NOTE.length] * 1.5, 0.022, (L.x - 540) / 700]),
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SAGN]: 1046.5 } }),
  ['pop', T.sweat + 0.1, 440, 0.025, 0.2],
  // first come, first dealt
  ...wordPops(T.h1, 3, 0.08, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['whoosh', T.stamp - 0.3, 0.3, 0.05], ['boom', T.stamp, 0.3], ['tick', T.stamp + 0.02, 0.1], ['bell', T.stamp + 0.05, 523.25, 0.06, 2.2, 0], ['glitter', T.stamp + 0.05, T.stamp + 0.8],
  ['whoosh', T.rush[0], 0.5, 0.04],
  ['whoosh', T.sagIn[0], 0.35, 0.05], ['tick', T.sagIn[1], 0.05],
  ...SAG_RUN.map(h => ['tick', h, 0.025]),
  ['pop', T.sagSweat, 440, 0.03, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 523.25, 0.03, 0],
  // founding cards are numbered
  ...wordPops(T.h2, 3, 0.08, 1, 0.026), ['pop', T.h2Land, 1046.5, 0.05, 0],
  ['bell', T.glint, 1567.98, 0.03, 1.4, 0], ['glitter', T.glint, T.glint + 0.8],
  // last line
  ...wordPops(T.h3, 4, 0.08, 2, 0.026), ['pop', T.h3Land, 1046.5, 0.055, 0], ['pluck', T.h3Land + 0.1, 1318.51, 0.045, 0.7, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
