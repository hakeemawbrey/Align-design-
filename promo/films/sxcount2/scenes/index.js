// sxcount2 — COUNTDOWN, "2." (20 s vertical Align ad, Star Talk Shows, show 12) · story 0–15.6, then the shared end card.
//   0.00–5.75  "Two *sleeps.*"  A giant pixel 2 slams in and fills the frame, then settles back behind the cast.
//              THE STARS (gold) hold tonight's deck, ♋ Cancer and ♍ Virgo watch. Drop (2.82): shuffle 1, a neat riffle.
//              THE STARS: "nervous? us? no. totally fine." Shuffle 2: shakier, a sweat drop, one card pops out.
//   5.75–11.0  "Totally | *calm.*"  Shuffle 3 (twisted): the deck EXPLODES. Cards everywhere: one lands on Virgo's head,
//              one slaps onto crying ♓ Pisces' face. VIRGO (card on head): "I'll alphabetize them. *calmly.*" Then the two
//              stuck cards pop into pixel butterflies, and more butterflies flutter up from the fallen cards.
//   11.0–15.45 card cut, "Butterflies are | *normal.*"  Butterflies circle the cast; the deck pops back together, neat and
//              glowing; everyone goes soft-eyed. Everything pops out by 15.45.
// One canvas (sky + number + stars + cards + butterflies), DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, PINK, MINT, BEAT, r3, pop01, outK, popOut, drawDigit, digitState, buildBug, starTears, onStar,
  drawSweat, drawButterfly, drawCard, sparkles, FX, chipS, womp, wordPops, slamCues } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GEM = signStar('cancer'), VIR = signStar('virgo'), PIS = signStar('pisces')
const LAV = '#c9a6ff'

// ── the timeline
const T = {
  slam: 0.15, settle: 1.45,
  h0: 0.5, h0Late: 0.75, h0Out: [5.5, 5.68],
  starsIn: 1.75, gemIn: 1.95, virIn: 2.1, pisIn: 2.3, deckIn: 2.0,
  open: 2.6, l1: BEAT(4),                     // the drop: 2.82
  sh1: 3.0, sh2: 4.45, pop2: 4.95,            // shuffle 1 (neat), shuffle 2 (shaky, one card pops out)
  h1: 5.78, h1Late: 6.05, h1Out: [10.85, 11.0],
  boom: 6.55,                                 // shuffle 3: it explodes
  l2: 7.65, roll: [9.25, 9.8],
  bfly: 10.0, close: 10.75,
  cut: 11.05,
  h2: 11.15, h2Late: 11.6,
  deckBack: 12.2, soft: 12.5,
  out: [14.95, 15.42],
}
const SPEAK = 'THE STARS', VSPK = '♍ VIRGO'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'nervous? us? no. totally fine.' },
  { t: T.l2, speaker: VSPK, text: "I'll alphabetize them. *calmly.*", color: VIR.color },
]
const CPS = 28

// ── layout
const POS = { gold: { x: 540, y: 1150, s: 280 }, gem: { x: 225, y: 1215, s: 210 }, vir: { x: 855, y: 1215, s: 210 }, pis: { x: 905, y: 850, s: 128 } }
const DECK = { x: 540, y: 1300, w: 92 }
const GOLD_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS }), T.boom + 0.02, T.bfly + 0.4, T.deckBack + 0.3]
const GEM_HOPS = [T.gemIn + 0.3, T.sh1 + 0.6, T.boom + 0.1, T.bfly + 0.3, T.bfly + 0.7, T.soft + 0.2]
const VIR_HOPS = [T.virIn + 0.3, ...talkHops(LINES, VSPK, { cps: CPS }), T.deckBack + 0.4]
const PIS_HOPS = [T.pisIn + 0.3, T.boom + 0.6, T.bfly + 0.1]

function goldState(t) {
  if (t < T.l1) return { mood: 'happy' }
  if (t < T.sh2) return { mood: 'happy', look: [0, 1] }
  if (t < T.boom) return { mood: 'wide', look: [0, 1], blink: false }
  if (t < T.l2) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.bfly) return { mood: 'neutral', look: [1, 0] }
  if (t < T.deckBack) return { mood: 'sparkle', look: [0, -1] }
  return { mood: 'happy' }
}
function gemState(t) {
  if (t < T.sh2) return { mood: 'happy', look: [1, 1] }
  if (t < T.boom) return { mood: 'neutral', look: [1, 1] }
  if (t < T.l2) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.roll[0]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.bfly) return { mood: 'neutral', look: [1, 0] }
  if (t < T.soft) return { mood: 'sparkle', look: [0, -1] }
  return { mood: 'heart' }
}
function virState(t) {
  if (t < T.sh2) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.boom) return { mood: 'squint', look: [-1, 1] }
  if (t < T.l2) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.bfly) return { mood: 'squint', look: [0, 0] }
  if (t < T.deckBack) return { mood: 'wide', look: [0, -1], blink: false }
  return { mood: 'happy' }
}
function pisK(t) {
  if (t < T.boom + 0.45) return 0.55
  if (t < T.bfly) return 1.6                  // a card. on the FACE.
  if (t < T.soft) return 0.8
  return 1.4                                  // butterflies. so beautiful.
}

// ── the cards: shuffles, the explosion, the two that stick
const N_RIFF = 12
/** a riffle starting at t0: split into two halves, then interleave back. shake 0…1 */
function riffle(t, t0, shake) {
  const out = [], p1 = ease.outCubic(prog(t, t0, t0 + 0.25))
  for (let i = 0; i < N_RIFF; i++) {
    const side = i % 2 ? 1 : -1, tr = t0 + 0.32 + i * 0.045
    const back = ease.inOutQuad(prog(t, tr, tr + 0.12))
    const jit = shake * Math.sin(t * 47 + i * 2.1) * 9
    const xx = DECK.x + side * 88 * p1 * (1 - back) + jit
    const yy = DECK.y - (i >> 1) * 4 * (1 - back) - back * i * 1.6 - Math.sin(Math.PI * back) * 26 + shake * Math.cos(t * 39 + i) * 5
    out.push({ x: xx, y: yy, rot: side * 0.18 * p1 * (1 - back) + shake * 0.06 * Math.sin(t * 31 + i), z: back > 0 ? 100 + i : i })
  }
  return out.sort((a, b) => a.z - b.z)
}
const BOOM_CARDS = (() => {
  const r = rng(77), out = []
  for (let i = 0; i < 26; i++) {
    const a = -Math.PI / 2 + (r() - 0.5) * 2.6
    const v = 1100 + r() * 900
    out.push({ vx: Math.cos(a) * v, vy: Math.sin(a) * v - 200, spin: (r() - 0.5) * 16, w: 70 + r() * 40, d: r() * 0.06 })
  }
  return out
})()
// the two that stick: one onto Virgo's head, one onto Pisces' face
const STUCK = [
  { to: () => ({ x: POS.vir.x + 6, y: POS.vir.y - 108 }), land: T.boom + 0.6, rot: 0.25, w: 84 },
  { to: () => ({ x: POS.pis.x, y: POS.pis.y + 4 }), land: T.boom + 0.75, rot: -0.12, w: 70 },
]

// ── butterflies: the two stuck cards turn into butterflies, and more flutter up from below (the fallen cards)
const BFLIES = (() => {
  const r = rng(11), out = []
  const cols = [PINK, MINT, GOLD, LAV, '#7fdcff', PINK, GOLD, MINT, LAV, '#ff9a6b']
  STUCK.forEach((s, i) => { const p = s.to(); out.push({ born: T.bfly + i * 0.08, x0: p.x, y0: p.y, col: cols[i], seed: i }) })
  for (let i = 0; i < 8; i++) out.push({ born: T.bfly + 0.25 + i * 0.13, x0: 120 + r() * 840, y0: 1980, col: cols[2 + i], seed: 3 + i })
  out.forEach((b, i) => { const a = (i / out.length) * Math.PI * 2; b.ox = 540 + Math.cos(a) * 380; b.oy = 860 + Math.sin(a) * 260; b.ph = a })
  return out
})()
function bflyPos(b, t) {
  const k = ease.inOutCubic(prog(t, b.born, b.born + 1.8))
  const orbit = Math.max(0, t - b.born - 1.2) * 0.55
  const ox = 540 + Math.cos(b.ph + orbit) * 380, oy = 870 + Math.sin(b.ph + orbit) * 250
  return {
    x: lerp(b.x0, ox, k) + Math.sin(t * 3.1 + b.seed) * 22,
    y: lerp(b.y0, oy, k) + Math.sin(t * 4.3 + b.seed * 1.7) * 18,
  }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Two *sleeps.*', { top: 190, size: 130, accentSize: 196, at: T.h0, late: 1, lateAt: T.h0Late, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'Totally | *calm.*', { top: 170, size: 110, accentSize: 170, at: T.h1, late: 1, lateAt: T.h1Late, wobble: true, accentColor: '#7fdcff' })
  const H2 = popText(root, 'Butterflies are | *normal.*', { top: 170, size: 104, accentSize: 164, at: T.h2, late: 1, lateAt: T.h2Late, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 230, open: T.open, close: T.close, cps: CPS })
  const bug = buildBug(root, { n: 2, start: 0.25, end: STORY_END })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawNumber(t) {
    const d = digitState(t, { slam: T.slam, settle: T.settle, big: 118, small: 66, bigY: 960, smallY: 730, fade: [T.cut, T.cut + 0.2, 0.14] })
    const ok = 1 - prog(t, T.out[0], T.out[1])
    const pulse = t > T.l1 ? 0.04 * Math.exp(-((t - T.l1) % 0.5556) * 6) : 0
    const sh = prog(t, T.slam + 0.35, T.slam + 1.15)
    const boomShake = t > T.boom && t < T.boom + 0.6 ? Math.sin((t - T.boom) * 60) * 12 * Math.exp(-(t - T.boom) * 6) : 0
    drawDigit(x, 2, d.cx + boomShake, d.cy, d.cell * (1 + pulse), { alpha: d.alpha * ok, glow: 0.9, shine: sh > 0 && sh < 1 ? sh : null })
  }

  function drawDeck(t, ok) {
    // before the boom: the deck with its shuffles; after: gone (exploded) until it pops back together, glowing
    if (t < T.boom) {
      const dp = pop01(t, T.deckIn, 0.35, 2.2) * ok
      if (dp <= 0.02) return
      let cards
      if (t >= T.sh1 && t < T.sh1 + 1.0) cards = riffle(t, T.sh1, 0)
      else if (t >= T.sh2 && t < T.sh2 + 1.0) cards = riffle(t, T.sh2, 1)
      else {
        const nerv = t > T.sh2 ? 0.6 + 0.6 * prog(t, T.sh2 + 1.0, T.boom) : 0
        cards = Array.from({ length: 6 }, (_, i) => ({ x: DECK.x + nerv * Math.sin(t * 50 + i) * 6, y: DECK.y - i * 3, rot: nerv * 0.04 * Math.sin(t * 37 + i) }))
      }
      for (const c of cards) drawCard(x, c.x, c.y, DECK.w * dp, { rot: c.rot })
      // shuffle 2: one card pops up out of the deck and drops back in
      const pp = prog(t, T.pop2, T.pop2 + 0.6)
      if (pp > 0 && pp < 1) drawCard(x, DECK.x + 30 * Math.sin(Math.PI * pp), DECK.y - 260 * Math.sin(Math.PI * pp), DECK.w, { rot: pp * 6.2 })
      return
    }
    const bp = pop01(t, T.deckBack, 0.4, 2.4) * ok
    if (bp > 0.02) {
      for (let i = 0; i < 6; i++) drawCard(x, DECK.x, DECK.y - i * 3, DECK.w * bp, { glow: i === 5 ? 0.55 + 0.2 * Math.sin(t * 4) : 0 })
    }
  }

  function drawFlying(t) {
    const dt = t - T.boom
    if (dt < 0 || dt > 2.4) return
    for (const c of BOOM_CARDS) {
      const tt = dt - c.d
      if (tt < 0) continue
      const xx = DECK.x + c.vx * tt, yy = DECK.y + c.vy * tt + 1500 * tt * tt
      if (yy > 2100 || xx < -150 || xx > 1230) continue
      drawCard(x, xx, yy, c.w, { rot: c.spin * tt, flip: Math.abs(Math.cos(tt * 7 + c.spin)) })
    }
  }
  function drawStuck(t, ok) {
    STUCK.forEach((s, i) => {
      if (t < T.boom) return
      const p = s.to(), k = prog(t, T.boom, s.land)
      if (t > T.bfly + i * 0.08) return
      const xx = lerp(DECK.x, p.x, k), yy = lerp(DECK.y, p.y, k) - Math.sin(Math.PI * k) * 420
      const wob = t > s.land ? 0.06 * Math.exp(-(t - s.land) * 5) * Math.sin((t - s.land) * 30) : 0
      drawCard(x, xx, yy, s.w, { rot: k < 1 ? k * 9 + s.rot : s.rot + wob, alpha: ok })
    })
  }

  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    // ♓ Pisces in the back, crying
    const pp = pop01(t, T.pisIn, 0.36, 2.2) * ok
    if (pp > 0.02) {
      const P = POS.pis, sob = pisK(t) > 1.2 ? Math.sin(t * 40) * 0.03 : 0
      const r = drawStarChar(x, P.x, P.y, P.s, t, { color: PIS.color, mood: t > T.bfly ? 'happy' : 'neutral', look: [-1, 0], hops: PIS_HOPS, seed: 11, pop: pp, glow: 0.7, squash: sob })
      starTears(x, r, t, pisK(t) * pp)
    }
    const cast = [
      ['gem', GEM.color, GEM.glyph, gemState, GEM_HOPS, T.gemIn, 4],
      ['vir', VIR.color, VIR.glyph, virState, VIR_HOPS, T.virIn, 6],
      ['gold', STAR.sky, null, goldState, GOLD_HOPS, T.starsIn, 1],
    ]
    for (const [k, col, glyph, stf, hops, t0, seed] of cast) {
      const p = pop01(t, t0, 0.38, 2.2) * ok
      if (p <= 0.02) continue
      const P = POS[k], st = stf(t)
      const drop = (1 - ease.outCubic(prog(t, t0 - 0.12, t0 + 0.2))) * 380
      const flinch = t > T.boom && t < T.boom + 0.5 ? 0.18 * Math.exp(-(t - T.boom) * 6) : 0
      const nerv = k === 'gold' && t > T.sh2 && t < T.boom ? 0.02 * Math.sin(t * 45) : 0
      const o = { color: col, glyph, ...st, hops, seed, pop: p, squash: flinch + nerv, glow: 1.05 }
      const r = drawStarChar(x, P.x, P.y - drop, P.s, t, o)
      if (k === 'gold' && t > T.sh2 && t < T.boom + 0.3) drawSweat(x, t, r, 1, seed)
    }
  }

  function drawBflies(t, ok) {
    for (const b of BFLIES) {
      if (t < b.born) continue
      const p = bflyPos(b, t), s = pop01(t, b.born, 0.3, 2.4)
      drawButterfly(x, p.x, p.y, 11 * s, t, b.col, { alpha: ok, seed: b.seed, rot: 0.2 * Math.sin(t * 2 + b.seed) })
    }
    STUCK.forEach((s, i) => { const p = s.to(); sparkles(x, t, p.x, p.y, T.bfly + i * 0.08, 8, 70, i, [PINK, GOLD, BONE, MINT], 0.6) })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        const ok = popOut(t, T.out)
        drawNumber(t)
        drawCast(t)
        drawDeck(t, ok)
        drawStuck(t, ok)
        drawFlying(t)
        drawBflies(t, ok)
        sparkles(x, t, 540, 960, T.slam + 0.3, 14, 380, 0.2, [GOLD, BONE, '#ffd98a', PINK])
        sparkles(x, t, DECK.x, DECK.y, T.boom, 14, 160, 0.5, [GOLD, BONE, LAV, PINK])
        sparkles(x, t, DECK.x, DECK.y - 10, T.deckBack + 0.1, 10, 120, 0.3, [GOLD, BONE, MINT])
      }
      box.update(t)
      bug.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.7 (H0 out → "Totally calm.") and 11.05 (box shut → "Butterflies are normal.").
// cardfx keeps one for a film this short (the 11.05 flip). End card flips at 15.6.
const CUTS = [5.7, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const riffleCues = (t0, gain = 0.022) => [['whoosh', r3(t0), 0.25, 0.02], ...Array.from({ length: N_RIFF }, (_, i) => ['tick', r3(t0 + 0.32 + i * 0.045), gain])]
const flutter = (t0, n, gain = 0.01) => Array.from({ length: n }, (_, i) => ['chip', r3(t0 + i * 0.05), 2600 + (i % 3) * 500, 0.03, { ...FX, wave: 'noise', gain, decay: 0.03, sustain: 0.4, pan: (i % 2 ? 0.4 : -0.4) }])
export const CUES = [
  ...slamCues(T.slam),
  ['pop', T.h0, 880, 0.03, 0], ['pop', T.h0Late, 1174.66, 0.05, 0], ['pluck', T.h0Late, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.settle, 0.5, 0.03],
  ['pop', T.starsIn + 0.05, 739.99, 0.045, 0], ['pop', T.deckIn + 0.05, 1318.51, 0.03, 0], ['pop', T.gemIn + 0.05, 880, 0.04, -0.4], ['pop', T.virIn + 0.05, 659.25, 0.04, 0.4], ['pop', T.pisIn + 0.05, 987.77, 0.025, 0.5],
  ['pop', T.open, 739.99, 0.035, 0], ['pop', T.open + 0.06, 987.77, 0.028, 0],
  ...talkCues(LINES, { cps: CPS }),
  // shuffles 1 and 2
  ...riffleCues(T.sh1), ...riffleCues(T.sh2, 0.026), ['pop', T.pop2 + 0.05, 1318.51, 0.04, 0.2], ['pop', T.pop2 + 0.55, 659.25, 0.03, 0],
  ...wordPops(T.h1, 1, 0.07, 2, 0.026), ['pop', T.h1Late, 1318.51, 0.045, 0],
  // shuffle 3: boom
  ['riser', T.boom - 0.5, T.boom, 0.03], ['boom', T.boom, 0.3], ['whoosh', T.boom, 0.7, 0.05], ['glitter', T.boom, T.boom + 0.6],
  ...Array.from({ length: 14 }, (_, i) => ['tick', r3(T.boom + 0.03 + i * 0.035), 0.03]),
  ['pop', T.boom + 0.6, 523.25, 0.04, 0.4], ['tick', T.boom + 0.6, 0.05], ['pop', T.boom + 0.75, 440, 0.04, 0.5], ['tick', T.boom + 0.75, 0.05],
  ...womp(T.roll[0]),
  // butterflies
  ['pop', T.bfly, 1567.98, 0.04, 0.4], ['pop', T.bfly + 0.08, 1760, 0.04, 0.5], ['glitter', T.bfly, T.bfly + 0.8], ...flutter(T.bfly + 0.1, 24), ['bell', T.bfly + 0.3, 1318.51, 0.03, 1.4, 0],
  ['pop', T.close, 880, 0.028, 0], ['pop', T.close + 0.07, 587.33, 0.028, 0],
  // butterflies are normal
  ...wordPops(T.h2, 2, 0.07, 1, 0.024), ['pop', T.h2Late, 1318.51, 0.05, 0], ['pluck', T.h2Late, 1318.51, 0.045, 0.6, 0],
  ['pop', T.deckBack, 987.77, 0.04, 0], ['bell', T.deckBack + 0.1, 1760, 0.028, 1.2, 0], ['glitter', T.deckBack + 0.1, T.deckBack + 0.5],
  ...flutter(T.soft, 12, 0.008),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
