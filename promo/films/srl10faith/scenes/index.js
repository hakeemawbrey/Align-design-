// srl10faith (20 s vertical Align ad, Star Talk Remix of the L10 "Faith" loop) · story 0–15.6, then the shared end card.
// The loop's image (the words breathing under a waxing crescent) becomes a tiny star moment about trust.
//   0.00–5.80  "Trust *issues?*"  YOUR HEART drops in with a CLUNK, wrapped in chains and three padlocks, sweating.
//              The gold narrator star rises beside it, looks at it, then squints at you. Drop (2.82): the box opens.
//              THE STARS: "put your faith in us. we're *professionals*." → puffs up, sparkle; the heart side-eyes it.
//   5.80–9.20  "Card first. | Face *last.*"  A veiled mystery card floats down between them.
//              THE STARS: "we hide the face. *you* bring the courage." → the padlocks pop off one per beat (pop, pop,
//              POP), the chains slide off, the heart blinks, then beams.
//   9.20–12.3  "Trust *fall.*"  THE STARS: "trust fall? fine. *we'll* go first." → five little sign stars zip in
//              underneath; the gold star shuts its eyes, tips over… and is caught. Pisces sobs. Heart-eyes.
//   12.3–15.5  card flip · "Put your faith | in the *stars.*"  The heart, free, floats up toward the waxing moon; the
//              gold star and the crew bounce on the beat. Everything pops out by 15.45.
//   15.6→      the end card.
// One canvas (sky, moon, props, stars), DOM type + dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawMoon } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, PINK, INK, SKYB, MONO, BEAT, pop01, outK, popOut, drawBits, sparkles, floatHearts, tears, pixelTag, loadImg, drawCard, CROP_PROFILE } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6

const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [5.62, 5.8],
  heartIn: 0.42, clunk: 0.62, sweat: 1.0, starUp: 1.05, look: 1.6, squint: 1.95,
  open: 2.62, l1: BEAT(4) + 0.02, proud: 4.25, sideEye: 4.5,
  h1: 5.86, h1Land: 6.3, cardIn: 5.95, l2: 6.0,
  locks: [BEAT(12), BEAT(13), BEAT(14)], chains: [8.5, 9.0], beam: 8.95, h1Out: [9.02, 9.2], cardOut: [8.95, 9.3],
  h2: 9.3, h2Land: 9.55, l3: 9.28, crew: 10.5, turn: 10.85, fall: [11.0, 11.45], catch: 11.45, hearts: 11.8,
  close: 12.4, h2Out: [12.26, 12.44],
  cut: 12.48, h3: 12.54, h3Land: 13.05, rise: [12.6, 15.2], out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "put your faith in us. we're *professionals*." },
  { t: T.l2, speaker: SPEAK, text: 'we hide the face. *you* bring the courage.' },
  { t: T.l3, speaker: SPEAK, text: "trust fall? fine. *we'll* go first." },
]
const CPS = 30

// ── layout
const HEART = { x: 295, y: 1120, cell: 17 }
const HERO = { x: 765, y: 1105, size: 330 }
const CARD = { x: 540, y: 780, w: 270 }
const MOON = { x: 868, y: 600, R: 60 }
const CREW = [['aries', 650], ['taurus', 745], ['leo', 840], ['virgo', 935], ['pisces', 1022]].map(([id, cx], i) => ({ ...signStar(id), id, x: cx, y: 1300, size: 96, seed: 11 + i }))

// ── the heart (13 × 12 cells) with eyes painted on top
const HEART_BM = [
  '..HHH...HHH..', '.HHHHH.HHHHH.', 'HHWWHHHHHHHHH', 'HHWHHHHHHHHHH', 'HHHHHHHHHHHHH', 'HHHHHHHHHHHHH',
  '.HHHHHHHHHHH.', '..HHHHHHHHH..', '...HHHHHHH...', '....HHHHH....', '.....HHH.....', '......H......']
const LOCK = ['..sss..', '.s...s.', '.s...s.', 'GGGGGGG', 'GgGdGGG', 'GGGdGGG', 'GGGGGGG']
const LOCK_C = { s: '#b9b4c9', G: '#f7c948', g: '#fff1c8', d: '#5a3a10' }
const LOCK_AT = [[-62, -40], [58, 6], [-6, 58]]           // padlock offsets from the heart centre (px)
const SWEAT = ['.B.', 'BBB', 'BWB', '.B.']

function heartMood(t) {
  if (t < T.squint) return { eyes: 'wide', look: [Math.sin(t * 7) > 0 ? 1 : -1, 0] }
  if (t < T.sideEye) return { eyes: 'wide', look: [1, 0] }
  if (t < T.l2) return { eyes: 'flat', look: [1, 0] }                            // unconvinced side-eye
  if (t < T.locks[0]) return { eyes: 'wide', look: [1, -1] }                      // looks up at the card
  if (t < T.beam) return { eyes: 'wide', look: [0, 0] }
  if (t < T.fall[0]) return { eyes: 'happy' }
  if (t < T.catch + 0.25) return { eyes: 'wide', look: [1, 0] }                   // gasp at the fall
  return { eyes: 'happy' }
}

function drawHeart(x, t, cx, cy, cell, { pulse = 0, alpha = 1, glow = 0 } = {}) {
  const m = heartMood(t)
  const s = 1 + pulse
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(s, s)
  if (glow > 0) {
    const g = x.createRadialGradient(0, 0, 10, 0, 0, 220)
    g.addColorStop(0, `rgba(255,120,170,${0.5 * glow})`); g.addColorStop(1, 'rgba(255,120,170,0)')
    x.fillStyle = g; x.fillRect(-240, -240, 480, 480)
  }
  drawBits(x, HEART_BM, { H: '#ff4f86', W: '#ffd1de' }, 0, 0, cell)
  // eyes on rows 4–5, columns 3–4 and 8–9
  const ox = -6.5 * cell, oy = -6 * cell
  const eye = (c0) => {
    const ex = ox + c0 * cell, ey = oy + 4 * cell
    if (m.eyes === 'happy') {               // ^ ^
      x.fillStyle = INK; x.fillRect(ex, ey + cell, cell, cell); x.fillRect(ex + cell, ey, cell, cell); x.fillRect(ex + 2 * cell, ey + cell, cell, cell)
      return
    }
    if (m.eyes === 'flat') { x.fillStyle = '#fff'; x.fillRect(ex, ey + cell * 0.5, cell * 2, cell); x.fillStyle = INK; x.fillRect(ex + (m.look[0] > 0 ? cell : 0), ey + cell * 0.5, cell, cell); x.fillRect(ex - cell * 0.2, ey + cell * 0.25, cell * 2.4, cell * 0.35); return }
    x.fillStyle = '#fff'; x.fillRect(ex, ey, cell * 2, cell * 2)
    const px = m.look[0] > 0 ? 1 : 0, py = m.look[1] < 0 ? 0 : 1
    x.fillStyle = INK; x.fillRect(ex + px * cell, ey + py * cell, cell, cell)
  }
  eye(3); eye(8)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const cardIm = await loadImg(A + 'card-profile-3.png')

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Trust *issues?*', { top: 230, size: 128, accentSize: 176, at: T.h0, gap: 0.1, accentColor: PINK, wobble: true, late: 1, lateAt: T.h0Land })
  const H1 = popText(root, 'Card first. | Face *last.*', { top: 196, size: 118, accentSize: 168, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Trust *fall.*', { top: 240, size: 136, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: SKYB })
  const H3 = popText(root, 'Put your faith | in the *stars.*', { top: 236, size: 118, accentSize: 172, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const HERO_HOPS = [T.starUp + 0.35, ...talkHops(LINES, SPEAK, { cps: CPS }), T.beam + 0.1]
  const POST = t => t >= T.cut                                    // after the card flip the stage is re-laid out

  function moon(t) {
    const post = ease.inOutCubic(prog(t, T.cut, T.cut + 0.1))
    const ph = lerp(0.1, 0.2, prog(t, 0, STORY_END))              // the crescent waxes through the film, as in the loop
    const k = 0.5 + 0.5 * Math.sin(t * Math.PI * 108 / 60)        // breathes on the beat
    const mx = lerp(MOON.x, 540, post), my = lerp(MOON.y, 700, post) - 40 * ease.inOutQuad(prog(t, ...T.rise)), R = lerp(MOON.R, 92, post)
    drawMoon(x, mx, my + 4 * Math.sin(t * 1.3), R, ph, { glow: 1.3 + 0.35 * k, earthshine: 0.7, darkAlpha: 0.55 })
    return { x: mx, y: my }
  }

  function drawStage(t) {
    // ── the heart
    const hIn = pop01(t, T.heartIn, 0.2, 1.4)
    const drop = 1 - ease.inQuad(prog(t, T.heartIn - 0.2, T.clunk))
    const clunkSq = t > T.clunk ? 0.16 * Math.exp(-(t - T.clunk) * 9) * Math.cos((t - T.clunk) * 30) : 0
    const flinch = T.locks.reduce((a, l) => a + (t > l && t < l + 0.3 ? 0.08 * Math.sin(Math.PI * (t - l) / 0.3) : 0), 0)
    const beat = t > T.beam ? 0.05 * Math.max(0, Math.sin(t * Math.PI * 108 / 60)) ** 6 : 0
    const locked = 1 - ease.inQuad(prog(t, ...T.chains))
    const chainY = 60 * ease.inQuad(prog(t, ...T.chains))
    if (!POST(t) && hIn > 0.01) {
      const hx = HEART.x, hy = HEART.y - drop * 900
      x.save(); x.translate(hx, hy + 90); x.scale(1 + clunkSq, 1 - clunkSq); x.translate(-hx, -(hy + 90))
      drawHeart(x, t, hx, hy, HEART.cell, { pulse: beat - flinch, glow: prog(t, T.beam, T.beam + 0.4) })
      // chains drawn separately so they can slide off
      x.restore()
      if (locked > 0) {
        x.save(); x.translate(0, chainY); x.globalAlpha *= locked
        drawChains(x, hx, hy, HEART.cell)
        x.restore()
      }
      // padlocks: each pops off up and away on its beat
      LOCK_AT.forEach(([ox, oy], i) => {
        const lt = T.locks[i], p = prog(t, lt, lt + 0.55)
        if (p >= 1) return
        const lx = hx + ox + p * (i === 1 ? 160 : -140), ly = hy + oy - 260 * p + 380 * p * p
        drawBits(x, LOCK, LOCK_C, lx, ly + (t < lt ? Math.sin(t * 9 + i) * 2 : 0), 8, { rot: p * (i % 2 ? 4 : -4), alpha: 1 - ease.inQuad(p) })
        sparkles(x, t, hx + ox, hy + oy, lt, 6, 50, i, [GOLD, BONE])
      })
      // nervous sweat
      if (t > T.sweat && t < T.locks[2]) {
        const sp = ((t - T.sweat) / 0.7) % 1
        drawBits(x, SWEAT, { B: '#6fc3ff', W: '#e6f6ff' }, hx + 105 + sp * 10, hy - 70 + sp * 50, 6, { alpha: 1 - sp })
      }
      pixelTag(x, hx, hy + 170, 'YOUR HEART', { size: 24, alpha: clamp(prog(t, T.clunk, T.clunk + 0.2)) * outK(t, [12.2, 12.4]), border: PINK })
      if (t > T.hearts) floatHearts(x, t, hx, hy, T.hearts, 12.2, 2, 6, 200)
    }

    // ── the veiled mystery card (floats down, glows on each lock, drifts off up)
    const cIn = ease.outCubic(prog(t, T.cardIn, T.cardIn + 0.6)), cOut = prog(t, ...T.cardOut)
    if (cIn > 0 && cOut < 1) {
      const glowK = T.locks.reduce((a, l) => a + Math.exp(-Math.max(0, t - l) * 5) * (t > l ? 1 : 0), 0)
      drawCard(x, cardIm, CARD.x, CARD.y - (1 - cIn) * 700 - ease.inQuad(cOut) * 500 + Math.sin(t * 2) * 6, CARD.w, { rot: 0.05 * Math.sin(t * 1.4), alpha: (1 - cOut) * clamp(cIn * 2), glow: 0.7 + 0.6 * glowK, crop: CROP_PROFILE })
      if (cIn > 0.9) pixelTag(x, CARD.x, CARD.y + 236 + Math.sin(t * 2) * 6, 'FACE · HIDDEN', { size: 22, alpha: (1 - cOut) * prog(t, T.cardIn + 0.5, T.cardIn + 0.7), border: GOLD })
    }

    // ── the crew (zips in under the fall, catches)
    const crewOut = popOut(t, [12.15, 12.4])
    if (!POST(t) && t > T.crew && crewOut > 0) {
      CREW.forEach((c, i) => {
        const tIn = T.crew + i * 0.07, p = ease.outCubic(prog(t, tIn, tIn + 0.3))
        const cx = lerp(1200 + i * 60, c.x, p)
        const sq = t > T.catch && t < T.catch + 0.5 ? 0.2 * Math.exp(-(t - T.catch) * 8) * Math.cos((t - T.catch) * 24) : 0
        const mood = t < T.catch ? { mood: 'wide', look: [-1, -1], blink: false } : c.id === 'pisces' ? { mood: 'sparkle', look: [0, 0] } : { mood: 'happy' }
        drawStarChar(x, cx, c.y, c.size, t, { color: c.color, ...mood, seed: c.seed, pop: crewOut, squash: sq, glow: 0.8, hops: [tIn + 0.32] })
        if (c.id === 'pisces') tears(x, t, cx, c.y - 6, T.catch + 0.1, 12.2, 4, 26)
      })
    }

    // ── the gold star
    const up = pop01(t, T.starUp, 0.4, 1.8)
    if (!POST(t) && up > 0.01) {
      const rise = 1 - ease.outCubic(prog(t, T.starUp, T.starUp + 0.45))
      const fp = ease.inQuad(prog(t, ...T.fall))
      const rot = fp * 1.38 + (t > T.catch ? 0.05 * Math.sin((t - T.catch) * 20) * Math.exp(-(t - T.catch) * 6) : 0)
      const pivot = { x: HERO.x - 10, y: HERO.y + HERO.size * 0.32 }
      const st = heroState(t)
      const proud = t > T.proud && t < T.proud + 0.6 ? -0.07 : 0
      const turn = t > T.turn && t < T.fall[0] ? 0.08 * Math.sin((t - T.turn) * 30) : 0
      const caught = t > T.catch ? -24 * Math.exp(-(t - T.catch) * 6) : 0
      x.save(); x.translate(pivot.x, pivot.y + rise * 400 + fp * 70 + caught); x.rotate(rot); x.translate(-pivot.x, -pivot.y)
      drawStarChar(x, HERO.x, HERO.y, HERO.size, t, { color: STAR.sky, ...st, hops: t < T.fall[0] ? HERO_HOPS : null, pop: up * popOut(t, [12.15, 12.4]), squash: proud + turn, seed: 3, glow: 1.15, bob: t > T.turn ? 0 : undefined })
      x.restore()
      if (t > T.proud && t < T.proud + 0.8) sparkles(x, t, HERO.x, HERO.y, T.proud, 10, 220, 1)
      if (t > T.catch) sparkles(x, t, 860, 1230, T.catch, 10, 200, 2, [GOLD, BONE, PINK, SKYB])
      if (t > T.hearts) floatHearts(x, t, 880, 1150, T.hearts, 12.2, 4, 6, 220)
    }

    // ── post-cut: the free heart floats up toward the moon; the gold star and the crew bounce on the beat
    if (POST(t)) {
      const ok = popOut(t, T.out)
      const r = ease.inOutQuad(prog(t, ...T.rise))
      const hx = 540, hy = lerp(1130, 1010, r)
      drawHeart(x, t, hx, hy, 16, { pulse: beat, glow: 0.9 * ok, alpha: clamp(ok) })
      const pin = pop01(t, T.cut + 0.05, 0.35, 2)
      const bh = []
      for (let n = 21; n < 27; n++) bh.push(BEAT(n))
      drawStarChar(x, 830, 1290, 220, t, { color: STAR.sky, mood: t < 13.6 ? 'happy' : 'wink', look: [0, 0], hops: bh, pop: pin * ok, seed: 3, glow: 1.1 })
      CREW.forEach((c, i) => {
        if (i === 4) return
        drawStarChar(x, [150, 270, 390, 1000][i], 1320 + (i % 2) * 20, 92, t, { color: c.color, mood: 'happy', hops: bh.map(b => b + 0.04 * i), pop: pop01(t, T.cut + 0.08 + i * 0.05) * ok, seed: c.seed, glow: 0.8 })
      })
      const P = CREW[4]
      drawStarChar(x, 620, 1350, 92, t, { color: P.color, mood: 'sparkle', look: [0, 0], hops: bh, pop: pop01(t, T.cut + 0.3) * ok, seed: P.seed, glow: 0.8 })
      tears(x, t, 620, 1344, T.cut + 0.4, 15.0, 4, 26)
      if (t > 13.0) floatHearts(x, t, hx, hy - 40, 13.0, 14.7, 7, 6, 180)
    }
  }

  function drawChains(x, hx, hy, cell) {
    const lc = cell * 0.62
    x.save(); x.translate(hx, hy)
    for (const dir of [1, -1]) {
      for (let k = -9; k <= 9; k++) {
        const px = k * lc * 1.25, py = dir * k * lc * 1.12 + 6
        x.fillStyle = INK; x.fillRect(px - lc * 0.75, py - lc * 0.75, lc * 1.5, lc * 1.5)
        x.fillStyle = k % 2 ? '#d8d3e6' : '#8f88a8'; x.fillRect(px - lc * 0.5, py - lc * 0.5, lc, lc)
      }
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, moon: null, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : { ...SKY_H, moon: null }
      drawSky(x, t, base)
      moon(t)
      if (t < T.out[1] + 0.02) drawStage(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

function heroState(t) {
  if (t < T.look) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.squint) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.l1) return { mood: 'squint', look: [0, 0] }                     // "…hm."
  if (t < T.proud) return { mood: 'happy' }
  if (t < T.proud + 0.6) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.l2) return { mood: 'wink', look: [0, 0] }
  if (t < T.locks[0]) return { mood: 'happy' }
  if (t < T.beam) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.l3) return { mood: 'happy', look: [-1, 0] }
  if (t < T.turn) return { mood: 'squint', look: [0, 0] }                   // determined
  if (t < T.catch) return { mood: 'neutral', blink: 1 }                     // eyes squeezed shut for the fall
  if (t < T.hearts) return { mood: 'wide', look: [0, 0], blink: false }
  return { mood: 'heart' }
}

// card-motif cut: the box shuts, the card flips into "Put your faith in the stars." End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [622.25, 698.46, 783.99, 932.33, 1046.5, 1244.51, 1396.91]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: the heart clunks down in chains, sweats; the gold star rises and squints
  ...wordPops(T.h0, 1, 0.1, 0, 0.026), ['pop', T.h0Land, 1244.51, 0.045, 0],
  ['whoosh', T.heartIn - 0.1, 0.3, 0.035], ['boom', T.clunk, 0.2], ['tick', T.clunk + 0.04, 0.07], ['tick', T.clunk + 0.13, 0.05], ['tick', T.clunk + 0.22, 0.035],
  ['pop', T.starUp + 0.1, 783.99, 0.04, 0.3], ['pop', T.starUp + 0.35, 1046.5, 0.03, 0.3],
  ['tick', T.squint, 0.03], ['pluck', T.squint + 0.05, 466.16, 0.03, 0.4, 0.3],
  ['pop', T.open, 783.99, 0.04, 0], ['pop', T.open + 0.06, 1046.5, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['glitter', T.proud, T.proud + 0.45], ['bell', T.proud + 0.05, 1567.98, 0.025, 1.0, 0.3],
  ['pluck', T.sideEye, 392, 0.03, 0.4, -0.3],
  // card first. face last: the card floats in; the padlocks pop on the beat; the chains slide off; the heart beams
  ...wordPops(T.h1, 3, 0.07, 2, 0.025), ['pop', T.h1Land, 1244.51, 0.045, 0],
  ['whoosh', T.cardIn, 0.5, 0.04], ['bell', T.cardIn + 0.5, 1046.5, 0.025, 1.4, 0],
  ...T.locks.map((l, i) => ['pluck', l, [783.99, 932.33, 1244.51][i], 0.05, 0.5, (i - 1) * 0.3]), ...T.locks.map(l => ['tick', l, 0.06]),
  ['glitter', T.locks[2], T.locks[2] + 0.4], ['whoosh', T.chains[0], 0.5, 0.04], ['tick', T.chains[1] - 0.05, 0.05],
  ['bell', T.beam, 1567.98, 0.03, 1.2, -0.3], ['glitter', T.beam, T.beam + 0.5],
  ['whoosh', T.cardOut[0], 0.35, 0.03],
  // trust fall: crew zips in, the gold star tips over… caught
  ...wordPops(T.h2, 1, 0.08, 1, 0.028), ['pop', T.h2Land, 1396.91, 0.05, 0],
  ...CREW.map((c, i) => ['pop', T.crew + i * 0.07 + 0.2, NOTE[i], 0.025, 0.2 + i * 0.12]),
  ['tick', T.turn, 0.03], ['tick', T.turn + 0.1, 0.03], ['whoosh', T.fall[0], 0.5, 0.05],
  ['boom', T.catch, 0.12], ['pop', T.catch, 622.25, 0.05, 0.3], ['glitter', T.catch, T.catch + 0.5],
  ['pluck', T.hearts, 1244.51, 0.045, 0.5, 0.2], ['pluck', T.hearts + 0.12, 1567.98, 0.04, 0.5, 0.2],
  ['pop', T.close, 932.33, 0.03, 0], ['pop', T.close + 0.07, 622.25, 0.03, 0],
  // put your faith in the stars
  ...wordPops(T.h3, 4, 0.07, 0, 0.025), ['pop', T.h3Land, 1244.51, 0.055, 0], ['pluck', T.h3Land, 1046.5, 0.05, 0.7, 0],
  ['bell', 13.5, 1567.98, 0.022, 1.6, -0.2], ['bell', 14.3, 2093, 0.016, 1.6, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
