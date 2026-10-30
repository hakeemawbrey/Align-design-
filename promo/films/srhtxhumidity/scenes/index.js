// srhtxhumidity (20 s vertical, Star Talk Remix of htxhumidity "Houston humidity") · story 0–15.6, then the shared end
// card. The ♌ Leo star (a lion, so: the hair) gets ready for a date; ♓ Pisces (a water sign) is thriving in the steam.
//   0.00–4.60  "Houston humidity: | *100%* | hair damage."  Leo combs its sleek little quiff, glint, wink. The thermometer
//              climbs, steam rises off a pixel skyline, and the quiff frizzes on the beat (2.27, 2.82, 3.38) until POOF
//              (3.93): a full frizz cloud. Leo frozen, wide-eyed. Pisces loves it.
//   4.60–8.40  "Step outside. | *Poof.*"  PISCES: "it's not frizz, babe. it's *volume.*" Leo squints… eye-roll.
//   8.40–11.0  "Plan B: | the *bag.*"  LEO: "cancel the date. they'll see the hair." A paper bag drops over Leo (eye holes,
//              frizz poking out round it). Pisces cries for it. (card cut 11.0 → the stage re-blocks)
//   11.0–13.6  "They see your | *card* first."  The veiled mystery card floats in; Leo peeks at it from inside the bag.
//              THE STARS: "card first. face last. hair: *whenever.*"
//   13.6–15.4  "Fall for | the chart. | *Not the hair.*"  The bag flies off; Leo tosses its frizz like a lion's mane,
//              sparkling. Pisces cries happy fountains. Everything out by 15.42.
// One canvas, DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCells, drawMane, bagCells, drawThermo, drawSteam, drawSkyline, drawComb, BONE, GOLD, PINK, HAIR, FIRE, WATER } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const LEO = signStar('leo'), PIS = signStar('pisces')

const T = {
  h0: 0.12, h0Out: [4.42, 4.6],
  leoIn: 0.4, pisIn: 0.8, comb: [0.6, 1.6], glint: 1.68, wink: [1.75, 2.15],
  frizz: [BEAT(3), BEAT(4), BEAT(5)], poof: BEAT(6),
  h1: 4.66, h1Late: 5.0, h1Out: [8.2, 8.38],
  open: 5.15, l1: 5.3, roll: [7.2, 7.85],
  h1b: 8.42, h1bLate: 8.8, l2: 8.34, bag: [9.6, 9.92], h1bOut: [10.78, 10.96],
  cut: 11.0,
  h2: 11.06, card: [11.06, 11.5], l3: 11.6, h2Out: [13.45, 13.62],
  h3: 13.7, h3Late: 14.05, bagOff: [13.9, 14.5], toss: 14.15,
  close: 15.15, out: [15.0, 15.42], h3Out: [15.2, 15.42],
}
const PISN = '♓ PISCES STAR', LEON = '♌ LEO STAR', SKYN = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: PISN, color: WATER, text: "it's not frizz, babe. it's *volume.*" },
  { t: T.l2, speaker: LEON, color: HAIR, text: "cancel the date. they'll see the *hair.*" },
  { t: T.l3, speaker: SKYN, text: 'card first. face last. hair: *whenever.*' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// layout: before the 11.0 cut / after it
const LA = { x: 540, y: 1085, size: 320 }, PA = { x: 905, y: 1300, size: 160 }
const LB = { x: 775, y: 1245, size: 270 }, PB = { x: 215, y: 1305, size: 160 }
const CARD = { x: 395, y: 850, w: 380 }

const LEO_HOPS = [T.leoIn + 0.3, T.glint, ...talkHops(LINES, LEON, { cps: CPS }), T.bag[1] - 0.02, T.card[1], T.toss, T.toss + 0.62]
const PIS_HOPS = [T.pisIn + 0.3, T.frizz[1], ...talkHops(LINES, PISN, { cps: CPS }), T.card[1] + 0.1, T.toss + 0.1, T.toss + 0.72]

// frizz level: sleek quiff → three steps → POOF
function frizz(t) {
  let f = 0
  const steps = [[T.frizz[0], 0.17], [T.frizz[1], 0.34], [T.frizz[2], 0.52], [T.poof, 1]]
  for (const [s, v] of steps) if (t >= s) { const prev = f; f = lerp(prev, v, easeOutBack(prog(t, s, s + (v === 1 ? 0.3 : 0.2)), v === 1 ? 2.4 : 2.8)) }
  return f
}

function leoState(t) {
  if (t < T.glint) return { mood: 'happy', look: [1, -1] }
  if (t < T.wink[0]) return { mood: 'sparkle' }
  if (t < T.wink[1]) return { mood: 'wink' }
  if (t < T.frizz[0]) return { mood: 'happy' }
  if (t < T.poof) return { mood: 'neutral', look: [0, -1], blink: false }
  if (t < T.l1 + 0.3) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.roll[0]) return { mood: 'squint', look: [1, 0] }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.l2) return { mood: 'neutral', look: [0, 0] }
  if (t < T.bag[0]) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.cut) return { mood: 'squint', look: [0, 0] }
  if (t < T.l3 + 0.6) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.bagOff[0]) return { mood: 'heart' }
  if (t < T.toss + 0.3) return { mood: 'wide', look: [0, 0], blink: false }
  return { mood: 'sparkle' }
}
function pisState(t) {
  if (t < T.poof) return { mood: 'happy', tears: 0 }
  if (t < T.l1) return { mood: 'wide', look: [-1, 0], tears: 0, blink: false }
  if (t < T.l2) return { mood: 'happy', look: [-1, 0], tears: 0 }
  if (t < T.cut) return { mood: 'squint', tears: 2 }
  if (t < T.bagOff[0]) return { mood: 'heart', tears: 1 }
  return { mood: 'happy', tears: 3 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const card = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-profile-1.png' })
  let cardBmp = null
  if (card) { const c = document.createElement('canvas'); c.width = 760; c.height = Math.round(760 * card.height / card.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(card, 0, 0, c.width, c.height); cardBmp = c }
  const CH = cardBmp ? CARD.w * cardBmp.height / cardBmp.width : CARD.w * 1.5

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston humidity: | *100%* | hair damage.', { top: 150, size: 96, accentSize: 200, at: T.h0, gap: 0.12, accentColor: FIRE, wobble: true, lineHeight: 0.98, fit: true })
  const H1 = popText(root, 'Step outside. | *Poof.*', { top: 190, size: 112, accentSize: 190, at: T.h1, gap: 0.09, accentColor: HAIR, wobble: true, late: 1, lateAt: T.h1Late })
  const H1b = popText(root, 'Plan B: | the *bag.*', { top: 190, size: 112, accentSize: 170, at: T.h1b, gap: 0.09, accentColor: '#d6ac78', wobble: true, late: 1, lateAt: T.h1bLate })
  const H2 = popText(root, 'They see your | *card* first.', { top: 220, size: 104, accentSize: 140, at: T.h2, gap: 0.08, accentColor: GOLD })
  const H3 = popText(root, 'Fall for | the chart. | *Not* *the* *hair.*', { top: 140, size: 104, accentSize: 130, at: T.h3, gap: 0.08, accentColor: HAIR, wobble: true, late: 3, lateAt: T.h3Late, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H1b, T.h1bOut], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  function drawPisces(t, ok) {
    const pp = pop01(t, T.pisIn, 0.36, 2.1) * ok
    if (pp <= 0.02) return
    const P = t < T.cut ? PA : PB
    const st = pisState(t)
    const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const opts = { hops: PIS_HOPS, seed: 6, pop: pp, squash: sob }
    // before the POOF it basks: a little steam-glisten sparkle
    drawStarChar(x, P.x, P.y, P.size, t, { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, glow: t < T.poof ? 1.3 : 0.95, ...opts })
    const F = starFrame(P.x, P.y, P.size, t, opts)
    inSprite(x, F, () => tearsCells(x, t, st.tears))
  }

  function drawLeo(t, ok) {
    const lp = pop01(t, T.leoIn, 0.38, 2.2) * ok
    if (lp <= 0.02) return null
    const L = t < T.cut ? LA : LB
    const st = leoState(t)
    const f = frizz(t)
    let squash = 0
    if (t >= T.poof && t < T.poof + 0.6) squash = -0.18 * Math.exp(-(t - T.poof) * 6) * Math.cos((t - T.poof) * 24)
    if (t >= T.l2 && t < T.bag[0]) squash += 0.03 * Math.sin(t * 46)                         // panicking
    if (t >= T.bag[1] - 0.02 && t < T.bag[1] + 0.5) squash += 0.14 * Math.exp(-(t - T.bag[1]) * 8) * Math.cos((t - T.bag[1]) * 24)
    const opts = { hops: LEO_HOPS, seed: 3, pop: lp, squash }
    const F = starFrame(L.x, L.y, L.size, t, opts)
    // the mane sits behind the star; when it poofs it quivers
    drawMane(x, F, f, t, { quiver: t > T.poof && t < T.poof + 0.8 ? 0.6 * Math.exp(-(t - T.poof) * 3) : f > 0.5 ? 0.15 : 0, alpha: clamp(lp) })
    const r = drawStarChar(x, L.x, L.y, L.size, t, { color: LEO.color, glyph: t >= T.bag[0] && t < T.bagOff[0] ? null : LEO.glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 1.1 + (t > T.toss ? 0.3 : 0), ...opts })
    inSprite(x, F, () => {
      if (t >= T.frizz[1] && t < T.l1 + 0.3) sweatCells(x, t)
      // the paper bag: drops in, sits, flies off spinning
      if (t >= T.bag[0] && t < T.bagOff[1]) {
        const din = easeOutBack(prog(t, ...T.bag), 1.6)
        const off = prog(t, ...T.bagOff)
        x.save()
        x.translate(18, 18)
        if (off > 0) { x.translate(off * 14, -ease.inQuad(off) * 70 - Math.sin(Math.PI * off) * 10); x.rotate(off * 2.6) }
        x.translate(0, (1 - din) * -64)
        x.translate(-18, -18)
        bagCells(x, { holes: true })
        x.restore()
      }
    })
    return r
  }

  function drawCombAt(t) {
    if (t < T.comb[0] || t > T.comb[1] + 0.2) return
    const p = prog(t, ...T.comb)
    const a = clamp((t - T.comb[0]) * 5) * (1 - prog(t, T.comb[1], T.comb[1] + 0.2))
    const sweep = Math.sin(p * Math.PI * 2 - Math.PI / 2) // two passes
    const F = starFrame(LA.x, LA.y, LA.size, t, { hops: LEO_HOPS, seed: 3 })
    const topY = F.oy - F.base - F.S / 2 + 1.5 * F.cell
    x.save(); x.globalAlpha = clamp(a * 2)
    drawComb(x, LA.x + sweep * 90, topY - 34, F.cell * 0.95, -0.12 + sweep * 0.1)
    x.restore()
  }

  function drawCard(t) {
    if (!cardBmp || t < T.card[0]) return
    const pin = prog(t, ...T.card)
    const e = easeOutBack(pin, 1.5)
    const cy = lerp(CARD.y + 420, CARD.y, e) + Math.sin((t - T.card[1]) * 2.1) * 9 * (pin >= 1 ? 1 : 0)
    const a = clamp(pin * 3) * outK(t, T.out)
    const sc = lerp(0.7, 1, e)
    x.save(); x.globalAlpha = a; x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(CARD.x, cy, 30, CARD.x, cy, 460)
    g.addColorStop(0, 'rgba(255,190,220,0.38)'); g.addColorStop(0.5, 'rgba(242,199,92,0.12)'); g.addColorStop(1, 'rgba(242,199,92,0)')
    x.fillStyle = g; x.beginPath(); x.arc(CARD.x, cy, 460, 0, Math.PI * 2); x.fill()
    x.restore()
    x.save(); x.globalAlpha = a; x.translate(CARD.x, cy); x.rotate(-0.05 + 0.02 * Math.sin(t * 1.6)); x.scale(sc, sc)
    x.shadowColor = 'rgba(6,4,18,0.8)'; x.shadowBlur = 40
    x.drawImage(cardBmp, -CARD.w / 2, -CH / 2, CARD.w, CH)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      // the humid city (gone at the cut)
      const humid = t < T.cut ? clamp(t / 0.4) : 0
      drawSteam(x, t, humid * (0.5 + 0.5 * clamp(frizz(t))))
      drawSkyline(x, t, humid)
      if (t < T.cut) {
        const th = pop01(t, 0.3, 0.4, 1.8)
        if (th > 0.02) { x.save(); x.translate(118, 1220); x.scale(th, th); x.translate(-118, -1220); drawThermo(x, 118, 760, 1180, lerp(0.3, 1, ease.inOutQuad(prog(t, 0.4, T.poof))), t); x.restore() }
      }
      if (t < T.out[1] + 0.02) {
        drawCard(t)
        drawPisces(t, ok)
        const r = drawLeo(t, ok)
        drawCombAt(t)
        if (t >= T.glint && t < T.glint + 0.45 && r) { x.save(); x.globalAlpha = Math.sin(Math.PI * (t - T.glint) / 0.45); drawPixelStar(x, LA.x + 70, r.top - 30, 44, 2, '#fffbe8'); x.restore() }
        sparkles(t, LA.x, LA.y - 60, T.poof, 14, 330, 1, [HAIR, '#ffc27a', BONE])
        sparkles(t, CARD.x, CARD.y, T.card[1], 12, 280, 2, [GOLD, PINK, BONE])
        sparkles(t, LB.x, LB.y - 40, T.toss + 0.2, 14, 300, 3, [GOLD, HAIR, PINK, BONE])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.62 (hook → Poof), 11.0 (the bag → the card; also hides the stage re-blocking), 13.64.
// cardfx keeps the middle one (11.0) for a 20 s film.
const CUTS = [4.62, { t: 11.0, kind: 'deal' }, 13.64]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  ...wordPops(T.h0, 5, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 440, 0.05, 0],
  ['pop', T.leoIn + 0.05, 739.99, 0.045, 0], ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4],
  ['whoosh', T.comb[0] + 0.1, 0.18, 0.04], ['whoosh', T.comb[0] + 0.6, 0.18, 0.04],
  ['bell', T.glint, 2093, 0.025, 0.9, 0.2], ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.2],
  // frizz steps (rising boings) → POOF
  ...T.frizz.map((s, i) => ['chip', s, 330 * (1 + i * 0.25), 0.18, { ...FX, wave: 'square', duty: 0.25, slide: 7, gain: 0.02, decay: 0.12, sustain: 0.5 }]),
  ...T.frizz.map((s, i) => ['pop', s, NOTE[i + 1], 0.03, (i - 1) * 0.3]),
  ['boom', T.poof, 0.14], ['whoosh', T.poof - 0.08, 0.3, 0.08], ['glitter', T.poof, T.poof + 0.7],
  ['chip', T.poof + 0.02, 220, 0.4, { ...FX, wave: 'noise', gain: 0.03, decay: 0.2, sustain: 0.2 }],
  ['whoosh', T.h0Out[0], 0.3, 0.03], ...head(T.h1, 2, 0.09, T.h1Late, 2),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [PISN]: 1046.5, [LEON]: 660, [SKYN]: 880 } }),
  ...[0, 1, 2].map(i => ['pluck', +(T.roll[0] + 0.08 + i * 0.12).toFixed(3), 1174.66 * Math.pow(2, i / 12), 0.025, 0.3, 0]),
  // plan B: the bag
  ...head(T.h1b, 3, 0.09, T.h1bLate, 4),
  ['whoosh', T.bag[0] - 0.05, 0.3, 0.06], ['tom', T.bag[1], 110, { ...FX, gain: 0.2, decay: 0.2 }], ['chip', T.bag[1] + 0.02, 1800, 0.12, { ...FX, wave: 'noise', gain: 0.02, decay: 0.08, sustain: 0.2 }],
  ...sob(T.bag[1] + 0.3, 1400), ...sob(T.bag[1] + 0.9, 1480, 2),
  // the card
  ...wordPops(T.h2, 4, 0.08, 1, 0.026),
  ['whoosh', T.card[0], 0.4, 0.06], ['bell', T.card[1], 1318.51, 0.045, 1.8, 0], ['glitter', T.card[1], T.card[1] + 0.7],
  ['pluck', T.l3 + 1.2, 1174.66, 0.03, 0.5, 0.3],
  // bag off, hair toss
  ...wordPops(T.h3, 3, 0.08, 0, 0.026), ...[0, 1, 2].map(i => ['pop', +(T.h3Late + i * 0.1).toFixed(3), [987.77, 1174.66, 1318.51][i], 0.045, 0]),
  ['whoosh', T.bagOff[0], 0.35, 0.06], ['pluck', T.toss, 1174.66, 0.05, 0.7, 0], ['bell', T.toss + 0.2, 1567.98, 0.035, 1.4, 0], ['glitter', T.toss + 0.2, T.toss + 0.9],
  ...sob(T.toss + 0.3, 1568), ...sob(T.toss + 0.85, 1660, 2),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
