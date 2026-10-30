// srbios — "Everyone sounds the same." (20 s vertical Align ad, Star Talk Remix of promo/films/bios) · story 0–15.6,
// then the shared end card. Funk · Gm.
//   0.00–5.00  "Everyone sounds | the *same.*"  Grey bio speech bubbles pile up around THE STARS (the gold narrator
//              star): love to travel · fluent in sarcasm · partner in crime · here for the vibes · … and then "love to
//              travel" three more times, faster. The star goes from polite to squinting to asleep.
//              THE STARS: "love to travel. fluent in sarcasm. zzz…" (nods off mid-read).
//   5.00–5.60  the bubbles slide together and smear into one grey blur… poof. The star jolts awake.
//   5.60       the drop · "Your sky | *doesn't.*"  Three different stars pop in, each with a chip: ☉ SUN ♉ Taurus,
//              ☽ MOON ♋ Cancer, ↑ RISING ♐ Sagittarius. THE STARS: "one sky. three different *yous.*"
//   9.30       "Same words. | Different *sky.*"  ♐ (the Rising): "ok but i actually *do* love to travel."
//              Taurus and the gold star roll their eyes in sync; Cancer (a water sign) tears up.
//  12.27       card cut (flip) · "Your sky | says *more.*"  All four glow; Cancer cries happily; the gold star winks.
//              Everything pops out by 15.5; the end card takes over at 15.6.
// One canvas (sky + bubbles + stars + chips), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', CYAN = '#7fdcff'
const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const TAU = signStar('taurus'), CAN = signStar('cancer'), SAG = signStar('sagittarius')

// ── the bios (grey, generic). [text, x, y, rot, t]
const BIOS = [
  ['love to travel', 300, 590, -0.05, 0.45], ['fluent in sarcasm', 780, 650, 0.04, 0.8], ['partner in crime', 290, 770, 0.03, 1.15],
  ['love to laugh', 806, 830, -0.04, 1.5], ['here for the vibes', 780, 1210, 0.05, 1.85], ['work hard, play hard', 296, 1250, -0.03, 2.2],
  ['no drama please', 250, 1100, 0.04, 2.5], ['love to travel', 820, 1040, -0.06, 2.72], ['love to travel', 540, 690, 0.05, 2.9], ['love to travel', 560, 1170, -0.03, 3.05],
]

// ── the timeline
const T = {
  h0: 0.15, h0Land: 1.0, h0Out: [5.1, 5.28],
  open: 3.0, l1: 3.18, sleep: 4.6,
  smear: [5.0, 5.5], poof: BEAT(9) - 0.04, wake: BEAT(9),                       // 5.6
  h1: 5.64, h1Land: 6.02, signs: [5.82, 6.0, 6.18], l2: 6.4, h1Out: [9.12, 9.28],
  h2: 9.32, h2Land: 9.7, l3: 9.42, roll: [10.75, 11.4], tears: 11.0, close: 12.15, h2Out: [12.08, 12.24],
  h3: BEAT(21) + 0.08, h3Land: BEAT(21) + 0.5, glowUp: 13.0, wink: [14.1, 14.55], h3Out: [15.18, 15.38], out: [15.12, 15.5],
}
const SPEAK = 'THE STARS', SSPK = '♐ SAGITTARIUS STAR'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'love to travel. fluent in sarcasm. *zzz…*' },
  { t: T.l2, speaker: SPEAK, text: 'one sky. three different *yous.*' },
  { t: T.l3, speaker: SSPK, text: 'ok but i actually *do* love to travel.', color: SAG.color },
]
const CPS = 31

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }

// ── layout
const LOW = 110
const lowY = t => LOW * ease.inOutCubic(prog(t, 12.14, 12.28))
const G0 = { x: 540, y: 960, size: 244 }, G1 = { x: 540, y: 760, size: 206 }
const ROW = [
  { s: TAU, x: 214, chip: '☉', lab: 'SUN', id: 'tau', seed: 5 },
  { s: CAN, x: 540, chip: '☽', lab: 'MOON', id: 'can', seed: 7 },
  { s: SAG, x: 866, chip: '↑', lab: 'RISING', id: 'sag', seed: 9 },
]
const ROW_Y = 1110, ROW_SIZE = 188, CHIP_Y = 1286

const G_HOPS = [...talkHops(LINES.slice(0, 2), SPEAK, { cps: CPS }), T.wake + 0.02, T.h3Land, T.wink[0]].sort((a, b) => a - b)
const SAG_HOPS = [T.signs[2] + 0.3, ...talkHops(LINES, SSPK, { cps: CPS }), T.h3Land + 0.1]
const ROW_HOPS = { tau: [T.signs[0] + 0.3, T.h3Land + 0.04], can: [T.signs[1] + 0.3, T.h3Land + 0.07], sag: SAG_HOPS }

function goldPos(t) {
  const r = ease.inOutCubic(prog(t, T.wake, T.wake + 0.45))
  return { x: G0.x, y: lerp(G0.y, G1.y, r) + lowY(t), size: lerp(G0.size, G1.size, r) }
}
function goldState(t) {
  const n = BIOS.filter(b => t >= b[4]).length
  if (t < T.l1) return n < 4 ? { mood: 'neutral', look: [n % 2 ? 1 : -1, -0.5] } : n < 8 ? { mood: 'squint', look: [n % 2 ? 1 : -1, 0] } : { mood: 'eyeroll', blink: false }
  if (t < T.sleep) return { mood: 'squint', look: [0, 1] }
  if (t < T.wake) return { mood: 'sleepy' }
  if (t < T.wake + 0.5) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.l3) return { mood: 'happy', look: [0, 1] }
  if (t < T.roll[0]) return { mood: 'neutral', look: [1, 1] }
  if (t < T.roll[1]) return { mood: 'eyeroll', blink: false }
  if (t < T.h3) return { mood: 'happy' }
  if (t < T.wink[0]) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.wink[1]) return { mood: 'wink' }
  return { mood: 'happy' }
}
function rowState(id, t) {
  if (t < T.l2 + 0.2) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.l3) return { mood: 'happy', look: id === 'tau' ? [1, -1] : id === 'sag' ? [-1, -1] : [0, -1] }
  if (id === 'sag') return t < T.h3 ? { mood: 'sparkle', look: [0, 0] } : { mood: 'happy' }
  if (id === 'tau') return t >= T.roll[0] && t < T.roll[1] ? { mood: 'eyeroll', blink: false } : t < T.h3 ? { mood: 'neutral', look: [1, 0] } : { mood: 'happy' }
  // Cancer
  if (t < T.tears) return { mood: 'neutral', look: [1, 0] }
  return { mood: t < T.h3 ? 'sparkle' : 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "italic 500 176px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 34px 'Space Mono'", "bold 40px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const HEADS = [
    [popText(root, 'Everyone sounds | the *same.*', { top: 210, size: 98, accentSize: 150, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: '#b8b2c8', lineHeight: 1.04 }), T.h0Out],
    [popText(root, 'Your sky | *doesn’t.*', { top: 196, size: 124, accentSize: 184, at: T.h1, gap: 0.1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK, lineHeight: 0.98 }), T.h1Out],
    [popText(root, 'Same words. | Different *sky.*', { top: 196, size: 118, accentSize: 168, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Land, wobble: true, accentColor: CYAN, lineHeight: 1.04 }), T.h2Out],
    [popText(root, 'Your sky | says *more.*', { top: 196, size: 124, accentSize: 184, at: T.h3, gap: 0.12, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 }), T.h3Out],
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }

  // ─────────────────────────────── the grey bios (pixel-ish speech balloons)
  function drawBubble(text, cx, cy, rot, s, alpha, grey = 0, side = 1) {
    if (s <= 0.01 || alpha <= 0.01) return
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
    x.font = `700 30px ${MONO}`
    const w = Math.round(x.measureText(text).width + 52), h = 70, P = 6
    // stepped corners: ink outline, fill, a tail
    x.fillStyle = INK
    x.fillRect(-w / 2 - P, -h / 2, w + 2 * P, h); x.fillRect(-w / 2, -h / 2 - P, w, h + 2 * P)
    x.fillRect(side * w * 0.2 - 3 * P, h / 2, 5 * P, 3 * P)
    const fillC = `rgb(${Math.round(lerp(214, 150, grey))},${Math.round(lerp(208, 146, grey))},${Math.round(lerp(224, 160, grey))})`
    x.fillStyle = fillC
    x.fillRect(-w / 2, -h / 2 + P, w, h - 2 * P); x.fillRect(-w / 2 + P, -h / 2, w - 2 * P, h)
    x.fillRect(side * w * 0.2 - 2 * P, h / 2, 3 * P, 2 * P)
    x.fillStyle = '#4a4458'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    x.restore()
  }
  function drawBios(t) {
    if (t > T.poof + 0.05) return
    const sm = prog(t, ...T.smear), e = ease.inCubic(sm)
    x.save()
    if (sm > 0) x.filter = `blur(${(10 * e).toFixed(1)}px)`
    BIOS.forEach(([txt, bx, by, rot, t0], i) => {
      const s = pop01(t, t0, 0.3, 2.6)
      const cx = lerp(bx, G0.x, e) + Math.sin(t * 1.3 + i) * 4, cy = lerp(by, G0.y, e) + Math.cos(t * 1.1 + i * 2) * 4
      drawBubble(txt, cx, cy, rot * (1 - e), s * lerp(1, 0.55, e), 1, Math.min(1, e * 1.5), bx < 540 ? 1 : -1)
    })
    x.restore()
  }

  // ─────────────────────────────── stars, chips, tears
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function drawPoof(t) {
    const tt = t - T.poof
    if (tt < 0 || tt > 0.6) return
    const p = tt / 0.6, r = rng(13)
    for (let i = 0; i < 14; i++) {
      const a = r() * Math.PI * 2, d = 60 + 220 * ease.outCubic(p) * (0.6 + 0.6 * r()), s = (22 + 30 * r()) * (1 - p)
      x.fillStyle = `rgba(170,165,185,${0.7 * (1 - p)})`; x.fillRect(G0.x + Math.cos(a) * d - s / 2, G0.y + Math.sin(a) * d - s / 2, s, s)
    }
  }
  function drawChip(r, t, cx, cy, k) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 30px ${MONO}`; const tw = x.measureText(r.lab).width + 98
    x.fillStyle = 'rgba(16,9,38,0.9)'; rr(-tw / 2, -32, tw, 64, 32); x.fill()
    x.lineWidth = 4; x.strokeStyle = r.s.color; rr(-tw / 2, -32, tw, 64, 32); x.stroke()
    x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = r.s.color; x.font = `700 38px ${GLYPH_FONT}`; x.fillText(r.chip + '︎', -tw / 2 + 24, 2)
    x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.fillText(r.lab, -tw / 2 + 70, 3)
    x.restore()
  }
  function drawTears(t, cx, cy, size, t0, a) {
    for (let k = 0; k < 4; k++) {
      const ph = ((t - t0) * 1.6 + k * 0.25) % 1, side = k % 2 ? 1 : -1
      x.globalAlpha = (1 - ph) * a; x.fillStyle = CYAN
      x.fillRect(Math.round(cx + side * (size * 0.16 + ph * 34)), Math.round(cy - size * 0.02 + ph * 90), 8, 10); x.globalAlpha = 1
    }
  }
  function drawRow(t) {
    const ok = popOut(t, T.out)
    ROW.forEach((r, i) => {
      const k = pop01(t, T.signs[i], 0.36, 2.2) * ok
      if (k <= 0.02) return
      const drop = 1 - ease.outCubic(prog(t, T.signs[i] - 0.1, T.signs[i] + 0.22))
      const y = ROW_Y - drop * 300 + lowY(t)
      const glow = 0.95 + (t > T.glowUp ? 0.35 : 0)
      const cry = r.id === 'can' && t > T.tears
      drawStarChar(x, r.x, y, ROW_SIZE, t, { color: r.s.color, glyph: r.s.glyph, ...rowState(r.id, t), hops: ROW_HOPS[r.id], pop: k, seed: r.seed, glow, squash: cry ? 0.04 * Math.sin(t * 22) : 0 })
      if (cry) drawTears(t, r.x, y, ROW_SIZE, T.tears, clamp(k))
      drawChip(r, t, r.x, CHIP_Y + lowY(t), pop01(t, T.signs[i] + 0.25, 0.3, 2.6) * ok)
      if (t > T.glowUp) sparkles(t, r.x, y, T.glowUp + i * 0.12, 8, 130, i, [r.s.color, BONE, GOLD])
    })
  }
  function drawGold(t) {
    const ok = popOut(t, T.out)
    const k = pop01(t, 0.25, 0.4, 2) * ok
    if (k <= 0.02) return
    const P = goldPos(t)
    const jolt = t >= T.wake && t < T.wake + 0.5 ? -0.14 * Math.exp(-(t - T.wake) * 7) * Math.cos((t - T.wake) * 20) : 0
    const nod = t >= T.sleep && t < T.wake ? 0.06 + 0.03 * Math.sin((t - T.sleep) * 3) : 0
    x.save(); x.translate(P.x, P.y); x.rotate(t >= T.sleep && t < T.wake ? 0.12 * ease.outCubic(prog(t, T.sleep, T.sleep + 0.5)) : 0); x.translate(-P.x, -P.y)
    drawStarChar(x, P.x, P.y, P.size, t, { color: STAR.sky, ...goldState(t), hops: G_HOPS, pop: k, squash: jolt + nod, seed: 4, glow: 1.1 })
    x.restore()
    sparkles(t, P.x, P.y, T.wake, 10, 210, 1)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const lift = ease.inOutCubic(prog(t, T.smear[0], T.wake + 0.4))
      drawSky(x, t, { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, lift), dim: (SKY_H.dim ?? 1) * lerp(0.62, 1, lift) })
      if (t < T.out[1] + 0.05) {
        drawGold(t)
        drawBios(t)
        drawPoof(t)
        drawRow(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.6 (the poof → "Your sky doesn't.") and 12.27 (box shut → "Your sky says more.").
// cardfx keeps one for a 20 s film (the 12.27 flip). End card flips at 15.6.
const CUTS = [5.6, { t: 12.27, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.024), ['pop', T.h0Land, 880, 0.04, 0],
  // the bios pop in: the same flat note every time (that's the joke)
  ...BIOS.map(([, bx, , , t0]) => ['pop', t0 + 0.04, 659.25, 0.03, bx < 540 ? -0.4 : 0.4]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SSPK]: 990 } }),
  ['tick', T.sleep + 0.3, 0.02], ['tick', T.sleep + 0.9, 0.02],
  // smear → poof → wake
  ['whoosh', T.smear[0], 0.55, 0.04], ['boom', T.poof, 0.12], ['pop', T.poof + 0.02, 440, 0.04, 0],
  ['bell', T.wake + 0.05, 1760, 0.03, 0.8, 0], ['glitter', T.wake, T.wake + 0.4],
  ...wordPops(T.h1, 2, 0.1, 2, 0.025), ['pop', T.h1Land, 1318.51, 0.05, 0],
  ...T.signs.flatMap((s, i) => [['pop', s + 0.05, NOTE[i * 2], 0.045, (i - 1) * 0.5], ['bell', s + 0.27, NOTE[i * 2 + 1] * 2, 0.022, 0.8, (i - 1) * 0.5]]),
  // same words, different sky
  ...wordPops(T.h2, 3, 0.09, 1, 0.025), ['pop', T.h2Land, 1174.66, 0.045, 0],
  ['whoosh', T.roll[0], 0.4, 0.025], ['tick', T.roll[1], 0.03],
  ['pluck', T.tears, 659.25, 0.03, 0.5, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // your sky says more
  ...wordPops(T.h3, 3, 0.12, 0, 0.026), ['pop', T.h3Land, 1318.51, 0.05, 0],
  ['glitter', T.glowUp, T.glowUp + 0.6], ['bell', T.glowUp, 1174.66, 0.03, 1.2, 0],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
