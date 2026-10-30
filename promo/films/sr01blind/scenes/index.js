// sr01blind (20 s vertical Align ad, Star Talk Remix of teaser 01 "Blind by design") · story 0–15.6, then the end card.
// The teaser's veiled mystery cards still fly out of the dark, but now THE STARS try to catch one, wearing a sleep mask.
//   0.00–3.50  "Blind by | *design.*"  THE STARS (gold) pops in wearing a pixel sleep mask (with eyes embroidered on it).
//              THE STARS: "no faces. just faith."
//   3.60–7.75  "Watch *this.*"  Veiled mystery cards fly out of the dark. Catch 1: a card whooshes past, the star lunges
//              the wrong way. Catch 2: a card bonks it square in the mask (dizzy stars). Catch 3: it holds dead still and
//              the last card lands perfectly, balanced on its tip.
//   7.85–10.2  "Card first. | Face *last.*"  THE STARS: "see? didn't even look."
//   10.3–13.4  "Dealt *blind.*"  The mask flips up: sparkle eyes at the card. THE STARS: "the stars are giving you a chance."
//              (♓ Pisces peeks in from the side, crying.)
//   13.55 card flip → "Take the | *chance.*"  Heart eyes, the card bounces on its tip. Everything pops out by 15.45.
// One canvas (sky + cards + star), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, PINK, INK, LAV, pop01, outK, popOut, drawBits, starGeom, tears, sparkles, floatHearts } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const PIS = signStar('pisces')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [3.35, 3.5], gIn: 0.3, open: 1.0, l1: 1.2,
  h1: 3.6, h1Land: 3.85, h1Out: [7.6, 7.75],
  a: [3.95, 4.75], lunge: [4.4, 5.15],                      // catch 1: miss
  b: [5.2, 5.9], dizzy: [5.9, 7.0],                        // catch 2: bonk
  c: [6.7, 7.45], hold: 6.55,                              // catch 3: perfect
  h2: 7.85, h2Land: 8.2, h2Out: [10.05, 10.2], l2: 7.95,
  h3: 10.3, h3Land: 10.55, h3Out: [13.25, 13.42], lift: [10.3, 10.55], l3: 10.6, pis: 11.4, close: 13.4,
  h4: 13.7, h4Land: 14.05, heart: 13.8, bounce: [14.1, 14.6], h4Out: [15.15, 15.4], out: [15.05, 15.45],
}
const LINES = [
  { t: T.l1, speaker: 'THE STARS', text: 'no faces. just *faith.*' },
  { t: T.l2, speaker: 'THE STARS', text: "see? didn't even *look.*" },
  { t: T.l3, speaker: 'THE STARS', text: 'the stars are giving you a *chance.*' },
]
const CPS = 27

// ── layout
const ST = { x: 540, y: 1200, size: 320 }
const VP = { x: 540, y: 640 }                       // where the cards come out of the dark
const CARD_AR = 2238 / 1496
const CW = 300                                     // the hero card's width when it lands

// star moves: the lunge (miss), bonk recoil, the wobble while holding still
function starOffset(t) {
  const l = prog(t, ...T.lunge), lk = Math.sin(Math.PI * l)
  return { dx: 290 * lk, rot: 0, sq: t > T.lunge[0] && t < T.lunge[1] ? -0.08 * lk : 0 }
}
const HOPS = [T.gIn + 0.3, T.h0Land, ...talkHops(LINES, 'THE STARS', { cps: CPS }).filter(h => h < T.a[0] || h > T.c[1] + 0.3), T.heart + 0.1, T.bounce[0], T.bounce[0] + 0.5]
function sState(t) {
  if (t < T.lift[0]) return { mood: 'neutral', look: [0, 0] }       // (under the mask)
  if (t < T.pis) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}

// the three catches: start time, end time, where they end, what happens after
const FLY = [
  { n: 1, ...{ t0: T.a[0], t1: T.a[1] }, to: { x: -360, y: 1250 }, s1: 2.4, rot: -0.5, kind: 'past' },
  { n: 4, ...{ t0: T.b[0], t1: T.b[1] }, to: { x: 540, y: 1150 }, s1: 1.0, rot: 0.15, kind: 'bonk' },
  { n: 3, ...{ t0: T.c[0], t1: T.c[1] }, to: null, s1: 1.0, rot: 0, kind: 'hero' },
]
// background cards drifting past (atmosphere) while the catches happen
const DRIFT = Array.from({ length: 7 }, (_, i) => ({ n: [2, 5, 6, 1, 4, 2, 5][i], t0: 3.7 + i * 0.5, dur: 1.5, ang: (i * 2.39) % (Math.PI * 2), rot: ((i * 37) % 9 - 4) * 0.08 }))

async function build(stage) {
  try {
    await Promise.all(['800 112px Inter', "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const CARDS = {}
  await Promise.all([1, 2, 3, 4, 5, 6].map(async n => { CARDS[n] = await load(`card-profile-${n}.png`) }))

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Blind by | *design.*', { top: 200, size: 124, accentSize: 196, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: LAV, lineHeight: 0.96 })
  const H1 = popText(root, 'Watch *this.*', { top: 250, size: 128, accentSize: 192, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Card first. | Face *last.*', { top: 200, size: 116, accentSize: 180, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H3 = popText(root, 'Dealt *blind.*', { top: 250, size: 128, accentSize: 192, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: LAV })
  const H4 = popText(root, 'Take the | *chance.*', { top: 200, size: 124, accentSize: 196, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: GOLD, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function card(n, cx, cy, w, rot = 0, alpha = 1, glow = 0) {
    const im = CARDS[n]
    if (!im || w < 2 || alpha <= 0) return
    const h = w * CARD_AR
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
    if (glow > 0) {
      const g = x.createRadialGradient(0, 0, 0, 0, 0, h * 0.75)
      g.addColorStop(0, `rgba(176,108,255,${0.5 * glow})`); g.addColorStop(1, 'rgba(176,108,255,0)')
      x.fillStyle = g; x.fillRect(-h, -h, 2 * h, 2 * h)
    }
    x.drawImage(im, -w / 2, -h / 2, w, h)
    x.restore()
  }

  // where the star's tip is this frame (the hero card balances on it)
  function starNow(t) {
    const o = starOffset(t), ok = popOut(t, T.out)
    const bonk = t > T.b[1] && t < T.b[1] + 0.5 ? 0.16 * Math.exp(-(t - T.b[1]) * 6) * Math.cos((t - T.b[1]) * 24) : 0
    const opts = { pop: pop01(t, T.gIn, 0.4, 2.2) * ok, squash: o.sq + bonk, hops: HOPS, seed: 2 }
    return { x: ST.x + o.dx, y: ST.y, opts }
  }

  function drawFlyers(t, tipY, tipX) {
    // atmosphere
    for (const d of DRIFT) {
      const p = (t - d.t0) / d.dur
      if (p <= 0 || p >= 1) continue
      const e = p * p, R = 900 * e
      card(d.n, VP.x + Math.cos(d.ang) * R, VP.y + Math.sin(d.ang) * R * 0.9, lerp(10, 520, e), d.rot * e * 3, clamp(p * 4) * 0.55)
    }
    for (const f of FLY) {
      const p = prog(t, f.t0, f.t1)
      if (t < f.t0) continue
      const e = ease.inQuad(p)
      if (f.kind === 'past') {
        if (p >= 1) continue
        card(f.n, lerp(VP.x, f.to.x, e), lerp(VP.y, f.to.y, e), lerp(12, CW * f.s1, e), f.rot * e, clamp(p * 5))
      } else if (f.kind === 'bonk') {
        if (p < 1) { card(f.n, lerp(VP.x, f.to.x, e), lerp(VP.y, f.to.y, e), lerp(12, CW * 0.8, e), f.rot * e, clamp(p * 5)); continue }
        const d = t - f.t1                                           // falls off after the bonk
        if (d > 1.0) continue
        card(f.n, f.to.x + 160 * d, f.to.y - 260 * d + 1500 * d * d, CW * 0.8, f.rot + d * 4, 1)
      } else {
        // the hero: flies in and lands on the star's tip, then rides it
        const ok = popOut(t, T.out)
        const h = CW * CARD_AR
        const restY = tipY - h / 2 + 22
        const bo = t > T.bounce[0] ? Math.abs(Math.sin(Math.PI * prog(t, ...T.bounce) * 2)) * 70 * (1 - prog(t, ...T.bounce)) : 0
        const land = t > f.t1 && t < f.t1 + 0.4 ? -16 * Math.exp(-(t - f.t1) * 9) * Math.cos((t - f.t1) * 30) : 0
        const cx = p < 1 ? lerp(VP.x, tipX, e) : tipX, cy = p < 1 ? lerp(VP.y - 200, restY, e) : restY - bo + land
        const glow = clamp((t - f.t1) / 0.6) * (0.6 + 0.4 * Math.sin(t * 2.4)) + (t > T.heart ? 0.4 : 0)
        card(f.n, cx, cy, lerp(12, CW, p < 1 ? e : 1) * (0.5 + 0.5 * ok), p < 1 ? 0.6 * (1 - e) : 0.03 * Math.sin(t * 2), clamp(p * 5) * clamp(ok * 2), glow)
      }
    }
  }

  // the sleep mask: lavender, ink outline, embroidered shut eyes (pink lashes); flips up onto the forehead at T.lift
  function mask(t, cx, g) {
    const lp = ease.inOutCubic(prog(t, ...T.lift))
    const c = g.cell, w = 24 * c, h = 10 * c, y = g.eyeY - lp * 10 * c
    const sk = 1 - 0.55 * Math.sin(Math.PI * lp)                 // squashes as it flips
    x.save(); x.translate(cx, y); x.scale(1, lerp(1, 0.55, lp) * sk + (1 - sk) * 0.4)
    // strap
    x.fillStyle = INK; x.fillRect(-w / 2 - 4 * c, -2 * c, w + 8 * c, 4 * c)
    x.fillStyle = '#8a6ad8'; x.fillRect(-w / 2 - 4 * c, -1 * c, w + 8 * c, 2 * c)
    // body (stepped corners)
    const step = (o, col) => { x.fillStyle = col; x.fillRect(-w / 2 + 2 * c - o, -h / 2 - o, w - 4 * c + 2 * o, h + 2 * o); x.fillRect(-w / 2 - o, -h / 2 + 2 * c - o, w + 2 * o, h - 4 * c + 2 * o); x.fillRect(-w / 2 + c - o, -h / 2 + c - o, w - 2 * c + 2 * o, h - 2 * c + 2 * o) }
    step(c, INK); step(0, '#b9a3ff')
    x.fillStyle = '#d8ccff'; x.fillRect(-w / 2 + 2 * c, -h / 2 + c, w - 6 * c, c)
    // embroidered eyes: closed arcs with lashes
    x.fillStyle = '#ff6fa3'
    for (const sd of [-1, 1]) {
      const ex = sd * 5.5 * c
      for (let i = -3; i <= 3; i++) { const yy = Math.round((i * i) / 3); x.fillRect(ex + i * c - c / 2, yy * c - c, c, c) }
      for (const i of [-3, 0, 3]) x.fillRect(ex + i * c * 0.9 - c / 2, 2.2 * c, c, c * 1.4)
    }
    x.restore()
  }

  function dizzy(t, cx, cy) {
    if (t < T.dizzy[0] || t > T.dizzy[1]) return
    const k = 1 - prog(t, T.dizzy[1] - 0.3, T.dizzy[1])
    x.save(); x.globalAlpha = k
    for (let i = 0; i < 4; i++) {
      const a = t * 7 + i * Math.PI / 2
      drawPixelStar(x, cx + Math.cos(a) * 130, cy + Math.sin(a) * 36, 30, 2, i % 2 ? GOLD : BONE)
    }
    x.restore()
  }

  function drawStar(t) {
    const s = starNow(t)
    if (s.opts.pop <= 0.02) return null
    const opts = { color: STAR.sky, ...sState(t), ...s.opts, glow: 1.2, blink: t < T.lift[1] ? false : undefined }
    const r = drawStarChar(x, s.x, s.y, ST.size, t, opts)
    const g = starGeom(t, r, ST.size, opts)
    x.save(); x.globalAlpha = clamp(s.opts.pop); mask(t, r.x, g); x.restore()
    dizzy(t, r.x, g.tipY + 10)
    return { r, g }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.45, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      const rush = Math.sin(Math.PI * prog(t, 3.6, 7.6))
      drawSky(x, t, { ...base, zoom: base.zoom * (1 + 0.04 * rush), dim: (base.dim ?? 1) * lerp(1, 0.8, rush) })
      // a soft violet bloom where the cards come from
      if (rush > 0) {
        const gr = x.createRadialGradient(VP.x, VP.y, 0, VP.x, VP.y, 420)
        gr.addColorStop(0, `rgba(176,108,255,${0.28 * rush})`); gr.addColorStop(1, 'rgba(176,108,255,0)')
        x.fillStyle = gr; x.fillRect(0, VP.y - 420, 1080, 840)
      }
      if (t < T.out[1] + 0.02) {
        // Pisces peeking in from the right edge, crying
        const pp = pop01(t, T.pis, 0.4, 2) * popOut(t, T.out)
        if (pp > 0.02) {
          const ph = [T.pis + 0.3, T.pis + 1.0]
          const r = drawStarChar(x, 1040 - 90 * pp, 1020, 180, t, { color: PIS.color, mood: 'happy', seed: 9, glow: 0.7, hops: ph })
          tears(x, t, starGeom(t, r, 180, { seed: 9, hops: ph }), r.x, T.pis + 0.2)
        }
        const s = starNow(t)
        const res = drawStar(t)
        const tipY = res ? res.g.tipY : ST.y - 150, tipX = res ? res.r.x : s.x
        drawFlyers(t, tipY, tipX)
        if (res) {
          if (t > T.c[1] && t < T.c[1] + 0.8) sparkles(x, t, tipX, tipY - 200, T.c[1], 12, 260, 1, [GOLD, BONE, LAV, PINK])
          if (t > T.lift[1] && t < T.lift[1] + 0.8) sparkles(x, t, res.r.x, res.g.eyeY, T.lift[1] - 0.05, 8, 200, 2)
          if (t > T.heart) floatHearts(x, t, res.r.x, res.r.y - 40, T.heart, T.out[0], 3, 7, 420)
        }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 13.55 (the box shuts → "Take the chance."). One cut for a 20 s film.
const CUTS = [{ t: 13.55, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (authored in D; the engine moves pitched cues into the score's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land + 0.05, 1318.51, 0.035, 0.5, 0],
  ['pop', T.gIn + 0.05, 739.99, 0.045, 0], ['pop', T.open, 739.99, 0.035, 0], ['pop', T.open + 0.06, 987.77, 0.028, 0],
  ...talkCues(LINES, { cps: CPS }),
  // watch this: three catches
  ...wordPops(T.h1, 1, 0.1, 2), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ...DRIFT.map(d => ['whoosh', d.t0 + 0.6, 0.5, 0.018]),
  ['whoosh', T.a[0] + 0.3, 0.5, 0.045], ['whoosh', T.lunge[0], 0.3, 0.03], ['pop', T.lunge[0] + 0.3, 440, 0.03, -0.4],
  ['whoosh', T.b[0] + 0.25, 0.45, 0.04], ['boom', T.b[1], 0.2], ['tick', T.b[1], 0.07], ['pop', T.b[1] + 0.02, 880, 0.05, 0],
  ...[0, 1, 2, 3].map(i => ['pluck', +(T.dizzy[0] + 0.15 + i * 0.2).toFixed(3), [1318.51, 1174.66, 1318.51, 1174.66][i], 0.02, 0.3, (i % 2 ? 0.4 : -0.4)]),
  ['tick', T.hold, 0.03], ['whoosh', T.c[0] + 0.25, 0.5, 0.04], ['pop', T.c[1], 1174.66, 0.05, 0], ['bell', T.c[1] + 0.05, 1567.98, 0.035, 1.3, 0], ['glitter', T.c[1], T.c[1] + 0.6],
  // card first, face last
  ...wordPops(T.h2, 3, 0.08, 1), ['pop', T.h2Land, 1318.51, 0.045, 0],
  // dealt blind: the mask flips up
  ...wordPops(T.h3, 1, 0.1, 3), ['pop', T.h3Land, 1174.66, 0.045, 0], ['whoosh', T.lift[0], 0.25, 0.03], ['pluck', T.lift[1], 1567.98, 0.04, 0.6, 0], ['glitter', T.lift[1], T.lift[1] + 0.4],
  ['pop', T.pis, 659.25, 0.035, 0.6], ['pluck', T.pis + 0.3, 987.77, 0.022, 0.4, 0.6],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // take the chance
  ...wordPops(T.h4, 2, 0.1, 2, 0.028), ['pop', T.h4Land, 1318.51, 0.055, 0], ['pluck', T.h4Land, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0], ['pop', T.bounce[0] + 0.25, 1318.51, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
