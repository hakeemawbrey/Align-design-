// srp2constellation (20 s vertical Align ad, Star Talk Remix of the P2 "Constellation" loop) · story 0–15.6, then the end card.
// The loop's image (an aurora sky, a ring of portraits, a slow wave of constellation lines) becomes a ring of the twelve
// sign stars, with eyes, linking up around one lonely star in the middle: you.
//   0.00–2.80  "Connect | the *dots.*"  Aurora curtains sway. Twelve sign stars blink awake in a ring; in the middle a
//              little bone star tagged YOU looks around, alone.
//   2.82–6.00  THE STARS: "you drew lines between us for *centuries*." → the gold lines draw round the ring in one slow
//              wave, each pair blushing as it links. The wave reaches ♒ Aquarius… who ducks (no line). ♓ Pisces gets
//              linked and sobs.
//   6.00–12.1  "Our *turn.*"  THE STARS: "now we draw lines between *you*." → tonight's deck deals three cards under you
//              and a gold line shoots from you to each. THE STARS: "tonight's deck. dealt by *us*." → the middle card
//              flips to a veiled mystery card; you go heart-eyed.
//   12.1–15.5  card flip · "Dating, dealt | by the *stars.*"  The whole ring is linked (Aquarius too, blushing), you're
//              linked to your card.
//   15.6→      the end card.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, PINK, BEAT, pop01, outK, popOut, sparkles, floatHearts, tears, pixelTag, loadImg, drawCard, CROP_PROFILE, CROP_BACK } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6

const T = {
  h0: 0.12, h0Land: 0.55, h0Out: [5.86, 6.04],
  wake: 0.5, youIn: 1.3, open: 2.62, l1: BEAT(4) + 0.02, wave: 3.0, waveStep: 0.24, duck: null,
  h1: 6.1, h1Land: 6.45, l2: 6.15, deal: [7.75, 8.05, 8.35], links: 8.75, l3: 9.3, flip: [10.55, 10.95], heart: 11.0,
  close: 12.0, h1Out: [11.86, 12.04],
  cut: 12.08, h2: 12.14, h2Land: 12.7, out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'you drew lines between us for *centuries*.' },
  { t: T.l2, speaker: SPEAK, text: 'now we draw lines between *you*.' },
  { t: T.l3, speaker: SPEAK, text: "tonight's deck. dealt by *us*." },
]
const CPS = 30
const AQU = 10, PIS = 11

// ── layout: the ring (12 signs, offset half a step so nobody sits dead-centre top or bottom)
const RING = { x: 540, y: 915, rx: 412, ry: 400 }
const RS = SIGNS.map((s, i) => {
  const a = -Math.PI / 2 + (i + 0.5) * Math.PI / 6
  return { ...s, i, x: RING.x + RING.rx * Math.cos(a), y: RING.y + RING.ry * Math.sin(a), size: 102, seed: 20 + i * 3 }
})
const YOU = { x: 540, y: 815, size: 170 }
const CARDS = [{ x: 395, y: 1100, rot: -0.12 }, { x: 540, y: 1080, rot: 0 }, { x: 685, y: 1100, rot: 0.12 }]
const CW = 140
const edgeT = k => T.wave + k * T.waveStep                       // edge k links star k → k+1
const skipped = k => k === AQU - 1 || k === AQU                   // Aquarius ducks both of its lines (until the cut)
const linkedAt = i => Math.min(...[i - 1 < 0 ? 11 : i - 1, i].filter(k => !skipped(k)).map(edgeT))
const DUCK = edgeT(AQU - 1) - 0.1

const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

function aurora(x, t) {
  x.save(); x.globalCompositeOperation = 'lighter'
  const cols = [[70, 240, 190], [160, 120, 255], [110, 200, 255]]
  for (let c = 0; c < 3; c++) {
    for (let i = 0; i < 54; i++) {
      const u = i / 53, xx = u * 1080
      const edge = 1180 + c * 90 + 70 * Math.sin(u * 5.3 + t * 0.55 + c * 1.7) + 40 * Math.sin(u * 11 - t * 0.8 + c)
      const h = 420 + 140 * Math.sin(u * 7 + t * 0.4 + c * 2)
      const a = (0.06 + 0.05 * Math.sin(u * 23 + t * 1.1 + c)) * (1 - c * 0.2)
      const g = x.createLinearGradient(0, edge - h, 0, edge + 20)
      const [r, gg, b] = cols[c]
      g.addColorStop(0, `rgba(${r},${gg},${b},0)`); g.addColorStop(0.85, `rgba(${r},${gg},${b},${a})`); g.addColorStop(1, `rgba(${r},${gg},${b},0)`)
      x.fillStyle = g; x.fillRect(xx - 12, edge - h, 24, h + 20)
    }
  }
  x.restore()
}

/** a gold constellation hairline from a to b grown to p (0…1), with a joint sparkle as it lands */
function line(x, t, a, b, p, alpha = 1, t0 = null) {
  if (p <= 0) return
  const bx = lerp(a.x, b.x, p), by = lerp(a.y, b.y, p)
  x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = alpha
  x.strokeStyle = 'rgba(242,199,92,0.35)'; x.lineWidth = 12; x.lineCap = 'round'
  x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(bx, by); x.stroke()
  x.strokeStyle = 'rgba(255,240,200,0.95)'; x.lineWidth = 3.5
  x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(bx, by); x.stroke()
  x.restore()
  if (t0 !== null && t > t0 && t < t0 + 0.5) { x.save(); x.globalAlpha = alpha * (1 - (t - t0) / 0.5); drawPixelStar(x, b.x, b.y, 34, 2, '#fffbe8'); x.restore() }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [backIm, faceIm] = await Promise.all([loadImg(A + 'card-back.png'), loadImg(A + 'card-profile-1.png')])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Connect | the *dots.*', { top: 150, size: 116, accentSize: 168, at: T.h0, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land })
  const H1 = popText(root, 'Our *turn.*', { top: 196, size: 140, accentSize: 196, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Dating, dealt | by the *stars.*', { top: 150, size: 112, accentSize: 164, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function ringPos(s, t) {
    let y = s.y, sq = 0
    if (s.i === AQU && t < T.cut) {                                // the duck: dips down and squashes as the line arrives
      const d = ease.outCubic(prog(t, DUCK, DUCK + 0.18)) * (1 - ease.inOutQuad(prog(t, DUCK + 1.4, DUCK + 1.8)))
      y += 46 * d; sq = 0.22 * d
    }
    return { x: s.x, y, sq }
  }

  function ringMood(s, t) {
    if (t >= T.cut) return s.i === PIS ? { mood: 'sparkle', look: [0, 0] } : { mood: 'happy', blush: s.i === AQU ? 1 : undefined }
    if (t < T.wake + s.i * 0.08 + 0.3) return { mood: 'sleepy', zzz: false }
    if (s.i === AQU && t > DUCK - 0.05 && t < DUCK + 1.6) return { mood: 'eyeroll' }
    const lk = s.i === AQU ? Infinity : linkedAt(s.i)
    if (t > T.deal[0] - 0.2 && t < T.links + 0.6) return { mood: 'wide', look: [clamp((540 - s.x) / 200, -1, 1), clamp((1070 - s.y) / 200, -1, 1)], blink: false }
    if (t > lk) return s.i === PIS ? { mood: 'sparkle', look: [0, 0] } : { mood: 'happy' }
    return { mood: 'neutral', look: [clamp((YOU.x - s.x) / 200, -1, 1), clamp((YOU.y - s.y) / 200, -1, 1)] }
  }

  function youMood(t) {
    if (t < T.l1) return { mood: 'neutral', look: [Math.round(Math.sin(t * 1.6)), -0.2] }        // looks around, alone
    if (t < T.l2) return { mood: 'neutral', look: [Math.round(Math.sin(t * 1.2)), 0] }
    if (t < T.deal[0]) return { mood: 'wide', look: [0, 0], blink: false }                            // "…me?"
    if (t < T.heart) return { mood: 'wide', look: [0, 1], blink: false }
    return { mood: 'heart' }
  }

  function drawStage(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const P = RS.map(s => ringPos(s, t))
    // ring lines (the wave), all linked after the cut
    for (let k = 0; k < 12; k++) {
      const a = P[k], b = P[(k + 1) % 12]
      if (t >= T.cut) { line(x, t, a, b, 1, clamp(ok)); continue }
      if (skipped(k)) continue
      line(x, t, a, b, ease.inOutQuad(prog(t, edgeT(k), edgeT(k) + 0.3)), 1, edgeT(k) + 0.3)
    }
    // lines from you to the cards
    CARDS.forEach((c, i) => {
      if (t >= T.cut && i !== 1) return
      const t0 = T.links + i * 0.12
      line(x, t, { x: YOU.x, y: YOU.y + 40 }, { x: c.x, y: c.y - 110 }, ease.outCubic(prog(t, t0, t0 + 0.25)), clamp(ok) * (t > T.flip[0] && i !== 1 ? 1 - prog(t, T.flip[0], T.flip[1]) * 0.6 : 1), t0 + 0.25)
    })
    // the ring stars
    RS.forEach((s, i) => {
      const pin = pop01(t, T.wake + i * 0.08, 0.35, 2) * ok
      const lk = linkedAt(i), lh = t > lk + 0.3 && t < lk + 0.9 ? [lk + 0.3] : []
      drawStarChar(x, P[i].x, P[i].y, s.size, t, { color: s.color, glyph: null, ...ringMood(s, t), seed: s.seed, pop: pin, squash: P[i].sq, hops: lh, glow: 0.9 })
      if (pin > 0.5) { x.save(); x.globalAlpha = clamp(ok); x.font = "700 34px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"; x.textAlign = 'center'; x.fillStyle = s.color; x.fillText(s.glyph + '︎', P[i].x, P[i].y + 84); x.restore() }
    })
    tears(x, t, P[PIS].x, P[PIS].y - 4, linkedAt(PIS) + 0.35, T.deal[0], 4, 26)
    if (t > T.cut) tears(x, t, P[PIS].x, P[PIS].y - 4, T.cut + 0.6, 15.0, 4, 26)
    // you
    const yp = pop01(t, T.youIn, 0.4, 2.2) * ok
    if (yp > 0.01) {
      drawStarChar(x, YOU.x, YOU.y, YOU.size, t, { color: BONE, ...youMood(t), seed: 2, pop: yp, glow: 1.1, hops: [T.youIn + 0.4, T.heart, T.cut + 0.6] })
      pixelTag(x, YOU.x, YOU.y - 128, 'YOU', { size: 24, alpha: clamp(yp) * clamp(ok), border: BONE })
      if (t > T.heart) floatHearts(x, t, YOU.x, YOU.y, T.heart, T.close, 3, 6, 200)
    }
    // tonight's deck: three cards deal in from the top; the middle one flips to a mystery card
    CARDS.forEach((c, i) => {
      if (t >= T.cut && i !== 1) return
      const d = ease.outCubic(prog(t, T.deal[i], T.deal[i] + 0.35))
      if (d <= 0) return
      const fade = i !== 1 ? 1 - 0.55 * prog(t, T.flip[0], T.flip[1]) : 1
      const cx = lerp(540, c.x, d), cy = lerp(-300, c.y, d), rot = lerp(1.2, c.rot, d)
      if (i === 1) {
        const f = prog(t, ...T.flip), sx = Math.abs(Math.cos(Math.PI * f))
        const face = f > 0.5
        const w = t >= T.cut ? 170 : CW
        drawCard(x, face ? faceIm : backIm, cx, cy, w, { rot, sx: Math.max(0.02, sx), alpha: clamp(ok), glow: face ? 1 : 0.5, crop: face ? CROP_PROFILE : CROP_BACK, glowCol: face ? '255,190,240' : '190,170,255' })
        if (f >= 1 && t < T.cut) sparkles(x, t, cx, cy, T.flip[1], 10, 150, 1)
      } else drawCard(x, backIm, cx, cy, CW, { rot, alpha: fade, glow: 0.5, crop: CROP_BACK, glowCol: '190,170,255' })
    })
    if (t > T.deal[0] - 0.1 && t < T.cut) pixelTag(x, 540, 1258, "TONIGHT'S DECK", { size: 22, alpha: prog(t, T.deal[2] + 0.2, T.deal[2] + 0.4), border: GOLD })
    if (t > T.cut) sparkles(x, t, RING.x, RING.y, T.cut + 0.3, 14, 380, 2, [GOLD, BONE, PINK])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, moon: null, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : { ...SKY_H, moon: null }
      drawSky(x, t, base)
      aurora(x, t)
      if (t < T.out[1] + 0.02) drawStage(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: the box shuts, the card flips into "Dating, dealt by the stars." End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.045, 0],
  ...RS.map((s, i) => ['pop', T.wake + i * 0.08 + 0.1, NOTE[i % 7] * (i > 6 ? 2 : 1), 0.014, Math.cos(-Math.PI / 2 + (i + 0.5) * Math.PI / 6) * 0.6]),
  ['pop', T.youIn + 0.1, 659.25, 0.04, 0], ['bell', T.youIn + 0.3, 1318.51, 0.02, 1.4, 0],
  ['pop', T.open, 783.99, 0.04, 0], ['pop', T.open + 0.06, 1046.5, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // the wave of lines (a soft bell as each lands; Aquarius ducks with a bwomp)
  ...Array.from({ length: 12 }, (_, k) => k).filter(k => !skipped(k)).map(k => ['bell', edgeT(k) + 0.3, [1046.5, 880, 783.99, 659.25, 587.33][k % 5], 0.014, 1.4, Math.cos(-Math.PI / 2 + (k + 1) * Math.PI / 6) * 0.6]),
  ['pop', DUCK, 261.63, 0.05, 0.4], ['pluck', DUCK + 0.08, 196, 0.04, 0.5, 0.4],
  ['glitter', linkedAt(PIS) + 0.3, linkedAt(PIS) + 0.8],
  ...wordPops(T.h1, 1, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.05, 0],
  // tonight's deck
  ...T.deal.map(d => ['whoosh', d, 0.25, 0.045]), ...T.deal.map(d => ['tick', d + 0.33, 0.06]),
  ...[0, 1, 2].map(i => ['pluck', T.links + i * 0.12 + 0.25, [783.99, 1046.5, 1318.51][i], 0.04, 0.5, (i - 1) * 0.4]),
  ['whoosh', T.flip[0], 0.3, 0.04], ['bell', T.flip[1], 1567.98, 0.03, 1.4, 0], ['glitter', T.flip[1], T.flip[1] + 0.5],
  ['pluck', T.heart, 1046.5, 0.045, 0.5, 0], ['pluck', T.heart + 0.12, 1318.51, 0.04, 0.5, 0],
  ['pop', T.close, 783.99, 0.03, 0], ['pop', T.close + 0.07, 523.25, 0.03, 0],
  ...wordPops(T.h2, 4, 0.07, 0, 0.025), ['pop', T.h2Land, 1046.5, 0.055, 0], ['pluck', T.h2Land, 783.99, 0.05, 0.7, 0],
  ['glitter', T.cut + 0.3, T.cut + 0.9], ['bell', 13.6, 1567.98, 0.02, 1.6, -0.2], ['bell', 14.4, 2093, 0.014, 1.6, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
