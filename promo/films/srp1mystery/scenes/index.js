// srp1mystery (20 s vertical Align ad, Star Talk Remix of the P1 "Mystery" loop) · story 0–15.6, then the shared end card.
// The loop's image (Juniper's mystery card in the nebula, a pearl moon behind it, the seven chakra stars orbiting and
// gliding into the column) becomes the seven stars themselves, with eyes, failing to peek.
//   0.00–2.80  "Who's *behind* | the card?"  The veiled card floats in front of a pearl moon; seven chakra-coloured stars
//              orbit it, all staring. Peek #1: the red star sneaks round the right edge… the card swings away, BONK,
//              red spins off dizzy.
//   2.82–6.30  THE STARS (the box opens on the drop): "no peeking. that's the whole *point*."
//              Peek #2: a pixel periscope rises over the card's top edge… the card hops, BONK, it bends.
//              Peek #3 (the twist): the violet star floats in front with its eyes shut, holding up a NOT LOOKING sign.
//   6.30–12.1  "Card first. | Face *last.*"  THE STARS: "we read both skies. we picked *this* one." →
//              THE STARS: "give them a *chance*." → the seven stars glide into the column across the card (red low,
//              violet on top) and lock with a flare, all heart-eyed.
//   12.1–15.5  card flip · "The stars are giving | you a *chance.*"  The column glows; a blink wave climbs it on the beat.
//   15.6→      the end card.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawMoon, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, PINK, INK, BEAT, pop01, outK, popOut, drawBits, sparkles, floatHearts, pixelTag, loadImg, drawCard, CROP_PROFILE } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6

const T = {
  h0: 0.12, h0Land: 0.6, h0Out: [6.12, 6.3],
  cardIn: 0.2, starsIn: 0.45,
  peek1: [1.35, 2.05], bonk1: 2.12, open: 2.62, l1: BEAT(4) + 0.02,
  peek2: [4.45, 5.0], bonk2: 5.05, peek3: [5.35, 5.8], sign: 5.75, aww: 6.3,
  h1: 6.36, h1Land: 6.8, l2: 6.5, l3: 9.62,
  glide: [10.45, 11.6], lock: BEAT(20), close: 12.0, h1Out: [11.86, 12.04],
  cut: 12.08, h2: 12.14, h2Land: 12.7, out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "no peeking. that's the whole *point*." },
  { t: T.l2, speaker: SPEAK, text: 'we read both skies. we picked *this* one.' },
  { t: T.l3, speaker: SPEAK, text: 'give them a *chance*.' },
]
const CPS = 30
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']

// ── layout
const CARD = { x: 540, y: 900, w: 370 }
const CARD_H = CARD.w * CROP_PROFILE.h / CROP_PROFILE.w        // ≈ 527
const MOON = { x: 540, y: 740, R: 280 }
const ORX = 430, ORY = 420, SIZE = 118
const COL_Y = i => 1180 - i * 100
const PERI = ['.KK.', '.KK.', 'KCCK', 'KCCK', 'KKKK', 'KKKK', '.KK.', '.KK.', '.KK.', '.KK.', '.KK.', '.KK.']
const PERI_C = { K: '#ff7a2e', C: '#bfefff' }

const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

/** the card's own motion: float, swing away from peek #1, hop at peek #2 */
function cardPose(t) {
  const sw = t > T.peek1[1] - 0.15 && t < T.bonk1 + 0.7 ? Math.sin(Math.PI * prog(t, T.peek1[1] - 0.15, T.bonk1 + 0.15)) * (t < T.bonk1 + 0.15 ? 1 : Math.exp(-(t - T.bonk1 - 0.15) * 6)) : 0
  const hop = t > T.bonk2 - 0.15 && t < T.bonk2 + 0.25 ? Math.sin(Math.PI * prog(t, T.bonk2 - 0.15, T.bonk2 + 0.25)) : 0
  const fl = Math.sin(t * 1.6) * 8
  return { x: CARD.x + sw * 46, y: CARD.y + fl - hop * 40, rot: 0.03 * Math.sin(t * 0.9) + sw * 0.2, sx: 1 - 0.12 * sw }
}

/** star i in its orbit, overridden by its gag and finally by the column glide */
function starAt(i, t) {
  const th = (i / 7) * Math.PI * 2 - Math.PI / 2 + 0.22 * t
  let x = CARD.x + ORX * (1 - 0.06 * (i % 3)) * Math.cos(th), y = CARD.y + ORY * (1 - 0.06 * (i % 2)) * Math.sin(th)
  let front = Math.sin(th) > -0.1, mood = { mood: 'neutral', look: [clamp((CARD.x - x) / 200, -1, 1), clamp((CARD.y - y) / 200, -1, 1)] }, rot = 0, sq = 0
  const cp = cardPose(t)
  if (i === 0) {                                          // peek #1: sneaks round the right edge, bonk, dizzy
    const k = ease.inOutCubic(prog(t, T.peek1[0], T.peek1[1])), back = ease.outCubic(prog(t, T.bonk1, T.bonk1 + 0.5))
    const px = CARD.x + CARD.w / 2 + 40, py = CARD.y - 40
    if (k > 0 && back < 1) {
      const fx = lerp(px, x, back) + back * 60, fy = lerp(py, y, back) - Math.sin(Math.PI * back) * 120
      x = lerp(x, fx, k); y = lerp(y, fy, k); front = false
      mood = t < T.bonk1 ? { mood: 'squint', look: [-1, 0] } : { mood: 'wide', look: [Math.sin(t * 20) > 0 ? 1 : -1, -1], blink: false }
      rot = t > T.bonk1 ? (t - T.bonk1) * 14 * (1 - back) : 0
    }
    if (t > T.bonk1 && t < T.bonk1 + 2.4) mood = { mood: 'wide', look: [Math.round(Math.sin(t * 12)), Math.round(Math.cos(t * 12))], blink: false }
  }
  if (i === 1) {                                          // peek #2: hides behind the card's top (the periscope peeks)
    const k = ease.inOutCubic(prog(t, T.peek2[0] - 0.4, T.peek2[0])), back = ease.inOutCubic(prog(t, T.bonk2 + 0.25, T.bonk2 + 0.7))
    const m = k * (1 - back)
    x = lerp(x, cp.x + 40, m); y = lerp(y, CARD.y - CARD_H / 2 + 90, m); if (m > 0.3) front = false
    if (m > 0.3) mood = t < T.bonk2 ? { mood: 'squint', look: [0, -1] } : { mood: 'wide', look: [0, 0], blink: false }
  }
  if (i === 6) {                                          // peek #3: front and centre, eyes shut, NOT LOOKING
    const k = ease.inOutCubic(prog(t, T.peek3[0], T.peek3[1])), back = ease.inOutCubic(prog(t, T.glide[0] - 0.6, T.glide[0]))
    const m = k * (1 - back)
    x = lerp(x, 330, m); y = lerp(y, 1220, m); if (m > 0.3) front = true
    if (m > 0.5) mood = { mood: t < T.l2 + 1.2 ? 'neutral' : 'happy', blink: 1 }
  }
  // everyone turns to look at the polite one
  if (i !== 6 && t > T.aww && t < T.glide[0]) mood = t < T.l2 + 0.4 ? { mood: 'wide', look: [x > 330 ? -1 : 1, 1], blink: false } : { mood: 'happy' }
  // the glide into the column (red lands first, violet last), then the lock
  const g = ease.inOutCubic(prog(t, T.glide[0] + i * 0.08, T.glide[1] - (6 - i) * 0.0 + i * 0.0))
  if (g > 0) { x = lerp(x, CARD.x, g); y = lerp(y, COL_Y(i), g); if (g > 0.5) front = true; rot *= 1 - g }
  if (t > T.lock - 0.1) mood = t < T.lock + 0.35 ? { mood: 'wide', look: [0, 0], blink: false } : { mood: 'heart' }
  if (t >= T.cut) {
    const wave = (Math.floor((t - T.cut) / 0.5556)) % 9
    mood = wave === i ? { mood: 'sparkle', look: [0, 0] } : { mood: 'happy' }
  }
  const lock = t > T.lock ? 0.18 * Math.exp(-(t - T.lock) * 7) * Math.cos((t - T.lock) * 26) : 0
  return { x, y, front, mood, rot, sq: sq + lock, g }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const cardIm = await loadImg(A + 'card-profile-3.png')

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, "Who's *behind* | the card?", { top: 150, size: 112, accentSize: 160, at: T.h0, gap: 0.1, accentColor: PINK, wobble: true, late: 0 })
  const H1 = popText(root, 'Card first. | Face *last.*', { top: 150, size: 112, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'The stars are giving | you a *chance.*', { top: 160, size: 92, accentSize: 140, fit: true, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 1.04 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawStar(t, i, S, ok) {
    const pin = pop01(t, T.starsIn + i * 0.07, 0.35, 2) * ok
    if (pin <= 0.01) return
    const size = lerp(i === 6 ? lerp(SIZE, 160, ease.inOutCubic(prog(t, T.peek3[0], T.peek3[1])) * (1 - prog(t, T.glide[0] - 0.6, T.glide[0]))) : SIZE, 100, S.g)
    x.save(); x.translate(S.x, S.y); x.rotate(S.rot); x.translate(-S.x, -S.y)
    drawStarChar(x, S.x, S.y, size, t, { color: CHAKRAS[i], ...S.mood, seed: 5 + i * 3, pop: pin, glow: 0.9 + (t > T.lock ? 0.4 : 0), squash: S.sq, hops: S.g > 0.9 ? null : HOPS.map(h => h + i * 0.05), bob: S.g > 0.5 ? 2 : undefined })
    x.restore()
  }

  function drawStage(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const stars = CHAKRAS.map((_, i) => starAt(i, t))
    const lockK = t > T.lock ? Math.exp(-(t - T.lock) * 2.5) : 0
    const colK = clamp(Math.min(...stars.map(s => s.g)))
    // back stars
    stars.forEach((S, i) => { if (!S.front) drawStar(t, i, S, ok) })
    // the periscope (behind the card, rising over its top edge)
    const pr = ease.outCubic(prog(t, T.peek2[0], T.peek2[1])) * (1 - ease.inQuad(prog(t, T.bonk2 + 0.1, T.bonk2 + 0.45)))
    const cp = cardPose(t)
    if (pr > 0) {
      const bend = t > T.bonk2 ? 0.5 : 0
      drawBits(x, PERI, PERI_C, cp.x + 40, cp.y - CARD_H / 2 - 60 * pr + 40, 9, { rot: bend + (t < T.bonk2 ? 0.08 * Math.sin(t * 9) : 0) })
    }
    // the card
    const cin = ease.outCubic(prog(t, T.cardIn, T.cardIn + 0.6))
    drawCard(x, cardIm, cp.x, cp.y + (1 - cin) * 120, CARD.w, { rot: cp.rot, sx: cp.sx, alpha: clamp(cin * 1.5) * clamp(ok), glow: 0.7 + 0.9 * lockK + 0.3 * colK, crop: CROP_PROFILE })
    pixelTag(x, cp.x, cp.y + CARD_H / 2 + 34, '✦ BLIND BY DESIGN ✦', { size: 22, alpha: clamp(prog(t, 0.8, 1.0)) * clamp(ok) * (1 - colK * 0.0), border: GOLD })
    // bonk FX
    if (t > T.bonk1 && t < T.bonk1 + 0.35) stampWord(x, t, T.bonk1, CARD.x + CARD.w / 2 + 70, CARD.y - 150, 'BONK!')
    if (t > T.bonk2 && t < T.bonk2 + 0.35) stampWord(x, t, T.bonk2, CARD.x + 120, CARD.y - CARD_H / 2 - 110, 'BONK!')
    // dizzy stars over red
    if (t > T.bonk1 + 0.3 && t < T.bonk1 + 2.2) {
      const r = stars[0]
      for (let k = 0; k < 3; k++) { const a = t * 6 + k * 2.1; drawPixelStar(x, r.x + Math.cos(a) * 52, r.y - 70 + Math.sin(a) * 14, 16, 1, GOLD) }
    }
    // the column beam behind the front stars
    if (colK > 0.6) {
      const a = (colK - 0.6) / 0.4 * (0.35 + 0.65 * lockK + (t > T.cut ? 0.25 : 0))
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createLinearGradient(0, COL_Y(6) - 120, 0, COL_Y(0) + 60)
      CHAKRAS.slice().reverse().forEach((c, k) => g.addColorStop(k / 6, c + Math.round(a * 120).toString(16).padStart(2, '0')))
      x.fillStyle = g; x.fillRect(CARD.x - 46, COL_Y(6) - 120, 92, COL_Y(0) - COL_Y(6) + 180)
      x.fillStyle = `rgba(255,248,236,${(0.5 * a).toFixed(3)})`; x.fillRect(CARD.x - 3, COL_Y(6) - 160, 6, COL_Y(0) - COL_Y(6) + 240)
      x.restore()
    }
    // front stars
    stars.forEach((S, i) => { if (S.front) drawStar(t, i, S, ok) })
    // NOT LOOKING sign held by violet
    const v = stars[6], sg = pop01(t, T.sign, 0.3, 2.4) * (1 - prog(t, T.glide[0] - 0.7, T.glide[0] - 0.5))
    if (sg > 0.01) pixelTag(x, v.x, v.y - 130, 'NOT LOOKING', { size: 26, alpha: clamp(sg), rot: -0.06 + 0.03 * Math.sin(t * 3), border: '#b45cff' })
    if (t > T.aww && t < T.aww + 1.6) floatHearts(x, t, 330, 1220, T.aww, T.aww + 0.8, 3, 6, 200)
    // the lock flare
    if (t > T.lock - 0.05) {
      sparkles(x, t, CARD.x, (COL_Y(0) + COL_Y(6)) / 2, T.lock, 14, 360, 1, CHAKRAS)
      const f = Math.exp(-(t - T.lock) * 5)
      if (f > 0.01) { x.save(); x.globalCompositeOperation = 'lighter'; const r = x.createRadialGradient(CARD.x, 860, 0, CARD.x, 860, 520); r.addColorStop(0, `rgba(255,246,230,${0.55 * f})`); r.addColorStop(1, 'rgba(255,246,230,0)'); x.fillStyle = r; x.fillRect(0, 300, 1080, 1120); x.restore() }
      floatHearts(x, t, CARD.x, 700, T.lock + 0.3, T.close, 6, 6, 380)
    }
  }

  function stampWord(x, t, t0, cx, cy, s) {
    const p = prog(t, t0, t0 + 0.12), a = 1 - prog(t, t0 + 0.2, t0 + 0.35)
    x.save(); x.globalAlpha = a; x.translate(cx, cy); x.rotate(-0.15); x.scale(lerp(1.8, 1, ease.outCubic(p)), lerp(1.8, 1, ease.outCubic(p)))
    x.font = '800 64px Inter, Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineWidth = 12; x.strokeStyle = INK; x.strokeText(s, 0, 0); x.fillStyle = '#ffd23f'; x.fillText(s, 0, 0)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, moon: null, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : { ...SKY_H, moon: null }
      drawSky(x, t, base)
      // the pearl moon: waxes toward full as the stars lock (as in the loop, full on the lock)
      const ph = lerp(0.32, 0.5, ease.inOutQuad(prog(t, 0, T.lock)))
      drawMoon(x, MOON.x, MOON.y + Math.sin(t * 0.8) * 6, MOON.R, ph, { alpha: 0.75 * popOut(t, T.out), glow: 1.0 + (t > T.lock ? 0.8 * Math.exp(-(t - T.lock) * 2) : 0), earthshine: 0.9, darkAlpha: 0.7 })
      if (t < T.out[1] + 0.02) drawStage(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: the box shuts, the card flips into "The stars are giving you a chance." End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 622.25, 698.46, 783.99, 932.33, 1046.5]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.1, 0, 0.026),
  ['whoosh', T.cardIn, 0.6, 0.04], ['bell', T.cardIn + 0.4, 783.99, 0.025, 2.0, 0],
  ...CHAKRAS.map((_, i) => ['pop', T.starsIn + i * 0.07 + 0.1, NOTE[i], 0.022, (i - 3) * 0.2]),
  // peek #1
  ['tick', T.peek1[0] + 0.2, 0.02], ['tick', T.peek1[0] + 0.45, 0.02], ['tick', T.peek1[0] + 0.7, 0.02],
  ['whoosh', T.peek1[1] - 0.15, 0.25, 0.04], ['boom', T.bonk1, 0.14], ['pop', T.bonk1, 392, 0.05, 0.4], ['glitter', T.bonk1 + 0.3, T.bonk1 + 0.9],
  ['pop', T.open, 783.99, 0.04, 0], ['pop', T.open + 0.06, 1046.5, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // peek #2 periscope
  ['pluck', T.peek2[0], 523.25, 0.03, 0.4, 0], ['pluck', T.peek2[0] + 0.2, 622.25, 0.03, 0.4, 0], ['pluck', T.peek2[0] + 0.4, 783.99, 0.03, 0.4, 0],
  ['boom', T.bonk2, 0.12], ['pop', T.bonk2, 349.23, 0.05, 0],
  // peek #3: NOT LOOKING
  ['pop', T.sign, 1046.5, 0.04, -0.3], ['bell', T.aww, 1567.98, 0.025, 1.2, -0.3],
  ...wordPops(T.h1, 3, 0.07, 2, 0.025), ['pop', T.h1Land, 1046.5, 0.045, 0],
  // the glide + lock
  ['riser', T.glide[0], T.lock, 0.04], ...CHAKRAS.map((_, i) => ['bell', T.glide[0] + 0.6 + i * 0.08, NOTE[i] * 2, 0.012, 1.2, (i - 3) * 0.12]),
  ['bell', T.lock, 523.25, 0.04, 3, 0], ['bell', T.lock + 0.02, 783.99, 0.03, 3, -0.2], ['bell', T.lock + 0.04, 1046.5, 0.02, 3, 0.2], ['glitter', T.lock, T.lock + 0.6],
  ['pop', T.close, 783.99, 0.03, 0], ['pop', T.close + 0.07, 523.25, 0.03, 0],
  ...wordPops(T.h2, 6, 0.07, 0, 0.025), ['pop', T.h2Land, 1046.5, 0.055, 0], ['pluck', T.h2Land, 783.99, 0.05, 0.7, 0],
  ...[0, 1, 2, 3, 4].map(k => ['pop', T.cut + 0.5556 * (k + 1), NOTE[k], 0.014, 0]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
