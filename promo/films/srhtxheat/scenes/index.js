// srhtxheat (20 s vertical, Star Talk Remix of htxheat "Houston summer") · story 0–15.6, then the shared end card.
// The guide is THE SUN, which is (technically) a star: a big gold star in sunglasses, smug about the heat. ♎ Libra is
// dressed for a date; ♓ Pisces cries in the back.
//   0.00–4.60  "Houston summer: | you sweat walking | *to the car.*"  The sun-star bobs on the beat in shades over a
//              shimmering street. Libra hops to the parked car, sweat flying off, touches the handle (SIZZLE) and melts
//              into a puddle with eyes. Pisces sobs. THE SUN: "oops. that's me. *sorry.*"
//   4.60–8.40  "Too hot to waste | a night on the | *wrong person.*"  Sunset: the sun's shades pop off and fly away; the car
//              slides off, the puddle springs back into Libra at a café table. A grey date stares at a phone: "k." The
//              candle melts. LIBRA: "I melted. for a *'k.'*" Libra and the sun roll their eyes in sync.
//   8.42       card cut (deal) → the stage re-blocks
//   8.42–12.0  "Dealbreakers | come *first.*"  The DEALBREAKERS card; the sun peeks in from the edge of frame:
//              "say it *before* the date. not after the sweat." Two stamps slam: ✕ FLAKY PLANS, ✕ ONE-WORD TEXTS.
//   12.0–15.4  "Save your | *evenings.*"  Night. The sun's sunglasses drop out of the sky onto Libra; a ♐ star pops in
//              beside it with a gold spark between. Pisces cries happy fountains. Everything out by 15.42.
// One canvas, DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCells, sunRays, shadesCells, drawCar, carHandle, drawShimmer, drawStreet, drawPuddle,
  drawTable, drawPhone, drawChat, drawDealCard, drawStamp, tint, BONE, GOLD, PINK, RED, FIRE, SUN, GREY } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)   // 108 bpm grid
const LIB = signStar('libra'), PIS = signStar('pisces'), SAG = signStar('sagittarius')

const T = {
  h0: 0.12, h0Late: 1.75, h0Out: [4.42, 4.6],
  sunIn: 0.25, libIn: 0.4, pisIn: 0.75,
  steps: [BEAT(1), BEAT(2), BEAT(3), BEAT(4)], touch: BEAT(5), melt: [3.55, 4.15],
  open: 3.5, l1: 3.7,
  h1: 4.66, h1Late: 5.2, h1Out: [8.2, 8.38],
  sunset: [4.4, 5.2], shadesOff: 4.62, carOut: [4.45, 5.0], reform: [4.7, 5.25],
  table: 4.85, date: 5.05, k: BEAT(9), l2: 6.7, candle: [5.0, 8.2], roll: [7.75, 8.3],
  cut: 8.42,
  h2: 8.48, h2Late: 8.85, h2Out: [11.75, 11.95],
  card: [8.5, 8.9], peek: [8.55, 9.0], l3: 9.15, stamps: [BEAT(16), BEAT(18)], cardOut: [11.7, 11.95], unpeek: [11.6, 12.0],
  h3: 12.02, h3Late: 12.4, h3Out: [15.2, 15.42],
  move: [11.85, 12.35], close: 12.65, shadesOn: [12.55, 12.95], partner: 13.2, spark: 13.62, pis2: 12.7,
  out: [15.0, 15.42],
}
const SUNN = '☉ THE SUN', LIBN = '♎ LIBRA STAR'
const LINES = [
  { t: T.l1, speaker: SUNN, color: SUN, text: "oops. that's me. *sorry.*" },
  { t: T.l2, speaker: LIBN, color: LIB.color, text: 'I melted. for a *“k.”*' },
  { t: T.l3, speaker: SUNN, color: SUN, text: 'say it *before* the date. not after the sweat.' },
]
const CPS = 30
const GY = 1390                                  // the kerb line (star feet sit here)
const FEET = 95                                  // star centre → feet for a 230 px star (cell 6)
const CAR = { x: 800, w: 440 }
const STEP_X = [250, 345, 440, 535, 625]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const LIB_HOPS = [T.libIn + 0.3, ...T.steps, ...talkHops(LINES, LIBN, { cps: CPS }), ...T.stamps.map(s => s + 0.05), T.move[1], T.shadesOn[1], T.spark]
const SUN_HOPS = [T.sunIn + 0.3, ...talkHops(LINES, SUNN, { cps: CPS }), T.peek[1]]
const PIS_HOPS = [T.pisIn + 0.3, T.pis2 + 0.3, T.spark + 0.1]

// Libra: where it stands and how melted it is
function libPose(t) {
  if (t < T.cut) {
    let x = STEP_X[0]
    T.steps.forEach((s, i) => { x = lerp(x, STEP_X[i + 1], ease.inOutQuad(prog(t, s + 0.05, s + 0.31))) })
    x = lerp(x, 645, ease.outQuad(prog(t, T.touch, T.touch + 0.12)))       // the reach for the handle
    x = lerp(x, 645, 1)
    if (t >= T.reform[0]) x = lerp(645, 300, ease.inOutCubic(prog(t, ...T.reform)))
    const m = t < T.reform[0] ? ease.inQuad(prog(t, ...T.melt)) : 1 - easeOutBack(prog(t, ...T.reform), 2.4)
    return { x, y: GY - FEET, size: 230, melt: m }
  }
  if (t < T.move[0]) return { x: 150, y: 1320, size: 170, melt: 0 }
  const p = ease.inOutCubic(prog(t, ...T.move))
  return { x: lerp(150, 370, p), y: lerp(1320, 1240, p), size: lerp(170, 290, p), melt: 0 }
}
function libMood(t) {
  if (t < T.steps[0]) return { mood: 'happy', look: [1, 0] }
  if (t < T.touch) return { mood: 'squint', look: [1, 0] }
  if (t < T.melt[1]) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.reform[1]) return { mood: 'sleepy', zzz: false }
  if (t < T.k) return { mood: 'happy', look: [1, 0] }
  if (t < T.l2) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.roll[0]) return { mood: 'squint', look: [1, 0] }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.cut) return { mood: 'neutral', look: [0, 0] }
  if (t < T.stamps[0]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.move[0]) return { mood: 'happy' }
  if (t < T.partner) return { mood: 'sparkle', look: [0, 0] }
  return { mood: 'heart', look: [1, 0] }
}
function sunMood(t) {
  if (t < T.shadesOff) return { mood: 'happy' }
  if (t < T.shadesOff + 0.7) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.roll[0]) return { mood: 'squint', look: [-1, 1] }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.cut) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.stamps[1] + 0.4) return { mood: 'neutral', look: [-1, 0] }
  return { mood: 'happy', look: [-1, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 54px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 38px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston summer: | you sweat walking | *to* *the* *car.*', { top: 140, size: 92, accentSize: 150, at: T.h0, gap: 0.1, accentColor: FIRE, wobble: true, late: 3, lateAt: T.h0Late, lineHeight: 1.0, fit: true })
  const H1 = popText(root, 'Too hot to waste | a night on the | *wrong* *person.*', { top: 150, size: 94, accentSize: 140, at: T.h1, gap: 0.06, accentColor: PINK, wobble: true, late: 2, lateAt: T.h1Late, lineHeight: 1.0, fit: true })
  const H2 = popText(root, 'Dealbreakers | come *first.*', { top: 190, size: 120, accentSize: 160, at: T.h2, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h2Late })
  const H3 = popText(root, 'Save your | *evenings.*', { top: 200, size: 140, accentSize: 200, at: T.h3, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h3Late })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
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
  function steam(t, cx, cy, t0, dur = 0.9) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    x.save()
    for (let i = 0; i < 5; i++) {
      const p = clamp((tt - i * 0.06) / (dur * 0.8))
      if (p <= 0) continue
      x.globalAlpha = 0.75 * Math.sin(Math.PI * p)
      x.fillStyle = i % 2 ? BONE : '#d8d4ea'
      const px = cx + (i - 2) * 26 + Math.sin(p * 9 + i) * 14, py = cy - p * 190
      for (const [dx, dy, r] of [[0, 0, 22], [16, -10, 16], [-14, -8, 15]]) { x.beginPath(); x.arc(px + dx, py + dy, r * (0.6 + p), 0, Math.PI * 2); x.fill() }
    }
    x.restore()
  }

  // ── THE SUN (a star in shades)
  function sunPose(t) {
    if (t < T.cut) {
      const p = ease.inOutCubic(prog(t, ...T.sunset))
      return { x: lerp(800, 930, p), y: lerp(720, 820, p), size: lerp(260, 180, p), rays: 1 - 0.6 * p }
    }
    const pin = ease.outBack(prog(t, ...T.peek)), pout = ease.inCubic(prog(t, ...T.unpeek))
    return { x: lerp(1220, 1000, pin) + pout * 260, y: 800, size: 250, rays: 0.5 }
  }
  function drawSun(t) {
    const sp = pop01(t, T.sunIn, 0.4, 2.0)
    if (sp <= 0.02 || t > T.unpeek[1]) return
    const P = sunPose(t), st = sunMood(t)
    const roll = t >= T.roll[0] && t < T.roll[1]
    sunRays(x, P.x, P.y + 0.045 * P.size, P.size * 0.5 * sp, t, P.rays * clamp(sp))
    const opts = { hops: SUN_HOPS, seed: 2, pop: sp, squash: roll ? 0.04 : 0 }
    drawStarChar(x, P.x, P.y, P.size, t, { color: SUN, mood: st.mood, look: st.look, blink: st.blink, glow: 1.35, ...opts })
    if (t < T.shadesOff) {
      const F = starFrame(P.x, P.y, P.size, t, opts)
      // smug: the shades tilt on the beat
      const u = (t - 0.6) / 0.5556, ph = u - Math.floor(u)
      inSprite(x, F, () => { x.translate(18, 19); x.rotate(-0.06 + 0.07 * Math.sin(Math.PI * Math.min(1, ph * 2)) * (t > 0.6 ? 1 : 0)); x.translate(-18, -19); shadesCells(x) })
    }
  }
  // the shades: on the sun → fly off at sunset → (act 4) drop onto Libra
  function drawFlyingShades(t) {
    const cellOf = s => Math.max(1, Math.round(s / 36))
    if (t >= T.shadesOff && t < T.shadesOff + 0.9) {
      const P = sunPose(T.shadesOff), p = (t - T.shadesOff) / 0.9
      const c = cellOf(P.size)
      const cx = P.x - 600 * p, cy = P.y + 0 - 1300 * p + 900 * p * p - 400 * p
      x.save(); x.translate(cx, cy); x.rotate(-p * 9); x.scale(c, c); x.translate(-18, -19); shadesCells(x); x.restore()
    }
    if (t >= T.shadesOn[0] && t < T.shadesOn[1]) {
      const L = libPose(t), p = ease.inQuad(prog(t, ...T.shadesOn))
      const F = starFrame(L.x, L.y, L.size, t, { hops: LIB_HOPS, seed: 4 })
      const c = F.cell, ex = F.ox, ey = F.oy - F.base + (19 - 18) * c
      x.save(); x.translate(ex, lerp(-120, ey, p)); x.rotate((1 - p) * 2.4); x.scale(c, c); x.translate(-18, -19); shadesCells(x); x.restore()
    }
  }

  function drawLibra(t, ok) {
    const lp = pop01(t, T.libIn, 0.38, 2.2) * ok
    if (lp <= 0.02) return null
    const L = libPose(t), st = libMood(t)
    let squash = L.melt * 0.86
    if (t >= T.touch && t < T.touch + 0.35) squash -= 0.22 * Math.sin(Math.PI * (t - T.touch) / 0.35)          // jolt
    if (t >= T.reform[0] && t < T.reform[1] + 0.4) squash += 0.12 * Math.exp(-(t - T.reform[1]) * 7) * Math.cos((t - T.reform[1]) * 26) * (t > T.reform[1] ? 1 : 0)
    if (t >= T.shadesOn[1] && t < T.shadesOn[1] + 0.5) squash += 0.16 * Math.exp(-(t - T.shadesOn[1]) * 8) * Math.cos((t - T.shadesOn[1]) * 24)
    const opts = { hops: L.melt > 0.05 ? null : LIB_HOPS, seed: 4, pop: lp, squash }
    // the puddle under the melt
    if (L.melt > 0.02 && t < T.cut) drawPuddle(x, L.x, GY + 4, L.size * 1.9 * L.melt, LIB.color, clamp(L.melt * 2) * 0.85)
    const r = drawStarChar(x, L.x, L.y, L.size, t, { color: LIB.color, glyph: L.melt > 0.3 ? null : LIB.glyph, mood: st.mood, look: st.look, blink: st.blink, zzz: false, glow: 1.0, ...opts })
    const F = starFrame(L.x, L.y, L.size, t, opts)
    inSprite(x, F, () => {
      if (t >= T.steps[0] && t < T.melt[1]) sweatCells(x, t, t < T.steps[2] ? 1 : 2)
      if (t >= T.shadesOn[1]) shadesCells(x)
    })
    return r
  }
  function drawPisces(t) {
    let P, pp
    if (t < T.cut) { P = { x: 120, y: 990, size: 130 }; pp = pop01(t, T.pisIn, 0.36, 2.1) * outK(t, [8.2, 8.4]) }
    else { P = { x: 140, y: 1000, size: 130 }; pp = pop01(t, T.pis2, 0.36, 2.1) * popOut(t, T.out) }
    if (pp <= 0.02) return
    const tears = t < T.melt[0] ? 0 : t < T.reform[1] ? 2 : t < T.cut ? 1 : t < T.spark ? 0 : 3
    const mood = t < T.melt[0] ? 'happy' : t < T.reform[1] ? 'squint' : t < T.cut ? 'neutral' : t < T.spark ? 'sparkle' : 'happy'
    const sob = tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const opts = { hops: PIS_HOPS, seed: 6, pop: pp, squash: sob }
    drawStarChar(x, P.x, P.y, P.size, t, { color: PIS.color, glyph: PIS.glyph, mood, look: [1, 0], ...opts })
    inSprite(x, starFrame(P.x, P.y, P.size, t, opts), () => tearsCells(x, t, tears))
  }
  function drawDate(t) {
    const dp = pop01(t, T.date, 0.36, 2.0) * outK(t, [8.2, 8.4])
    if (dp <= 0.02) return
    const D = { x: 790, y: GY - FEET, size: 220 }
    const look = t < T.roll[0] ? [0, 1] : [-1, 1]
    drawStarChar(x, D.x, D.y, D.size, t, { color: GREY, mood: 'neutral', look, glow: 0.4, seed: 9, pop: dp, bob: 2, blink: 0.45 })
    drawPhone(x, D.x - 95, D.y + 25, 0.75 * dp, clamp(dp), 0.25)
    drawChat(x, D.x - 60, D.y - 210, 150, 104, 'k.', pop01(t, T.k, 0.3, 2.4) * outK(t, [8.2, 8.4]))
  }
  function drawCardAndStamps(t) {
    if (t < T.card[0] || t > T.cardOut[1]) return
    const pin = easeOutBack(prog(t, ...T.card), 1.6), pout = ease.inCubic(prog(t, ...T.cardOut))
    const sc = lerp(0.6, 1, pin) * (1 - 0.6 * pout), a = clamp(prog(t, ...T.card) * 3) * (1 - pout)
    const cx = 490, cy = lerp(1100, 990, pin) + Math.sin(t * 1.8) * 6
    x.save(); x.globalAlpha = a; x.translate(cx, cy); x.rotate(-0.03); x.scale(sc, sc)
    drawDealCard(x, 560, 620)
    ;[['✕ FLAKY PLANS', -40, -5], ['✕ ONE-WORD TEXTS', 150, 4]].forEach(([text, y, rot], i) => {
      const s0 = T.stamps[i]
      if (t < s0 - 0.12) return
      const p = prog(t, s0 - 0.12, s0)
      const k = p < 1 ? lerp(2.4, 1, ease.inQuad(p)) : 1 + 0.08 * Math.exp(-(t - s0) * 9) * Math.cos((t - s0) * 30)
      x.save(); x.translate(0, y); x.rotate(rot * Math.PI / 180); x.scale(k, k); drawStamp(x, text, clamp(p * 2), 50); x.restore()
    })
    x.restore()
  }
  function drawPartner(t) {
    const pp = pop01(t, T.partner, 0.4, 2.3) * popOut(t, T.out)
    if (pp <= 0.02) return
    drawStarChar(x, 745, 1255, 260, t, { color: SAG.color, glyph: SAG.glyph, mood: t < T.spark ? 'wide' : 'heart', look: [-1, 0], hops: [T.partner + 0.35, T.spark + 0.05], seed: 7, pop: pp })
  }
  function drawSpark(t) {
    if (t < T.spark) return
    const a = clamp((t - T.spark) * 4) * outK(t, T.out)
    const p = ease.outCubic(prog(t, T.spark, T.spark + 0.5))
    x.save(); x.globalAlpha = a; x.globalCompositeOperation = 'lighter'
    x.strokeStyle = GOLD; x.lineWidth = 8; x.shadowColor = GOLD; x.shadowBlur = 24; x.lineCap = 'round'
    x.beginPath()
    const x0 = 480, x1 = 640, ym = 1040 - 30 * Math.sin(t * 3)
    for (let i = 0; i <= 20 * p; i++) { const u = i / 20, px = lerp(x0, x1, u), py = 1140 - Math.sin(Math.PI * u) * (1140 - ym); i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke(); x.restore()
    x.save(); x.globalAlpha = a
    const tw = 0.6 + 0.4 * Math.sin(t * 9)
    drawPixelStar(x, 560, ym - 20, 44 * tw + 10, 2, '#fffbe8')
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { zoom: 1.5, dim: 0.56, moon: t > T.h3 ? { x: 930, y: 150, r: 44, phase: 0.12, alpha: clamp((t - T.h3) * 2) } : null })
      const heat = t < T.cut ? clamp(t / 0.4) * (1 - 0.7 * prog(t, ...T.sunset)) : 0
      const dusk = t < T.cut ? prog(t, ...T.sunset) : 0
      tint(x, heat, dusk)
      const ok = popOut(t, T.out)
      if (t < T.cut) {
        drawSun(t)
        drawStreet(x, GY, clamp(t / 0.4) * outK(t, [8.2, 8.4]), 1 - dusk)
        drawShimmer(x, 120, 1000, GY - 20, t, heat * (1 - dusk))
        drawCar(x, CAR.x + ease.inCubic(prog(t, ...T.carOut)) * 760, GY, CAR.w, clamp((t - T.touch) * 6) * (1 - prog(t, T.touch + 0.6, T.touch + 1.6)), pop01(t, 0.3, 0.4, 1.6))
        const tb = pop01(t, T.table, 0.36, 1.8) * outK(t, [8.2, 8.4])
        if (tb > 0.02) { x.save(); x.translate(545, 1390); x.scale(tb, tb); x.translate(-545, -1390); drawTable(x, 545, 1245, 300, t, ease.inQuad(prog(t, ...T.candle)), clamp(tb)); x.restore() }
        drawPisces(t)
        drawDate(t)
        drawLibra(t, ok)
        const H = carHandle(CAR.x, GY, CAR.w)
        steam(t, H.x, H.y - 20, T.touch)
        sparkles(t, H.x, H.y, T.touch, 10, 90, 1, [RED, FIRE, BONE])
      } else {
        drawCardAndStamps(t)
        drawSun(t)
        drawPisces(t)
        drawSpark(t)
        drawPartner(t)
        drawLibra(t, ok)
        T.stamps.forEach((s, i) => sparkles(t, 490, 990 + (i ? 150 : -40), s, 10, 240, 2 + i, [RED, BONE, GOLD]))
        sparkles(t, 560, 1100, T.spark, 14, 300, 3, [GOLD, PINK, BONE])
      }
      drawFlyingShades(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.62 (hook → sunset), 8.42 (the date → dealbreakers; hides the re-block), 12.0.
// cardfx keeps the middle one (8.42) for a 20 s film.
const CUTS = [4.62, { t: T.cut, kind: 'deal' }, 12.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  ...head(T.h0, 5, 0.1, T.h0Late, 0),
  ['pop', T.sunIn + 0.05, 587.33, 0.045, 0.3], ['pop', T.libIn + 0.05, 880, 0.04, -0.3], ['pop', T.pisIn + 0.05, 1046.5, 0.03, -0.5],
  // the walk: little sweaty steps
  ...T.steps.map((s, i) => ['chip', s + 0.05, 520 + i * 40, 0.08, { ...FX, wave: 'square', duty: 0.25, slide: 4, gain: 0.014, decay: 0.06, sustain: 0.3 }]),
  // SIZZLE on the handle, then the melt (a long sliding-down chip)
  ['chip', T.touch, 3200, 0.7, { ...FX, wave: 'noise', gain: 0.04, decay: 0.5, sustain: 0.4 }], ['pop', T.touch, 1318.51, 0.05, 0.2],
  ['chip', T.melt[0], 880, 0.6, { ...FX, wave: 'tri', slide: -24, gain: 0.03, decay: 0.5, sustain: 0.6 }], ['tom', T.melt[1], 90, { ...FX, gain: 0.14, decay: 0.25 }],
  ...sob(T.melt[0] + 0.2, 1400), ...sob(T.melt[0] + 0.8, 1480, 2),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SUNN]: 520, [LIBN]: 880 } }),
  // sunset: shades fly off, car whooshes away, the puddle springs back
  ['whoosh', T.h0Out[0], 0.3, 0.03], ...head(T.h1, 6, 0.06, T.h1Late, 2),
  ['whoosh', T.shadesOff, 0.35, 0.06], ['pluck', T.shadesOff, 1567.98, 0.035, 0.4, -0.3],
  ['whoosh', T.carOut[0] + 0.1, 0.4, 0.05],
  ...[0, 1, 2].map(i => ['chip', +(T.reform[0] + 0.1 + i * 0.1).toFixed(3), 440 * (1 + i * 0.3), 0.12, { ...FX, wave: 'square', duty: 0.25, slide: 8, gain: 0.018, decay: 0.1, sustain: 0.4 }]),
  ['pop', T.table + 0.05, 659.25, 0.035, 0], ['pop', T.date + 0.05, 440, 0.035, 0.3],
  ['tick', T.k, 0.05], ['pop', T.k + 0.02, 392, 0.04, 0.3],
  ...[0, 1, 2].map(i => ['pluck', +(T.roll[0] + 0.08 + i * 0.12).toFixed(3), 1174.66 * Math.pow(2, i / 12), 0.025, 0.3, 0]),
  // dealbreakers
  ...head(T.h2, 2, 0.1, T.h2Late, 4),
  ['whoosh', T.card[0], 0.35, 0.05], ['bell', T.card[1], 1318.51, 0.04, 1.4, 0], ['whoosh', T.peek[0], 0.3, 0.04],
  ...T.stamps.flatMap(s => [['whoosh', s - 0.14, 0.15, 0.05], ['boom', s, 0.12], ['tom', s, 120, { ...FX, gain: 0.2, decay: 0.2 }], ['chip', s + 0.01, 1600, 0.1, { ...FX, wave: 'noise', gain: 0.025, decay: 0.08, sustain: 0.2 }]]),
  // save your evenings
  ...head(T.h3, 2, 0.1, T.h3Late, 1),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.shadesOn[0], 0.3, 0.05], ['pluck', T.shadesOn[1], 1174.66, 0.05, 0.7, 0], ['bell', T.shadesOn[1] + 0.05, 1567.98, 0.035, 1.2, 0], ['glitter', T.shadesOn[1], T.shadesOn[1] + 0.6],
  ['pop', T.partner + 0.05, 987.77, 0.045, 0.3], ['bell', T.spark, 1318.51, 0.045, 1.8, 0], ['glitter', T.spark, T.spark + 0.8],
  ...sob(T.spark + 0.3, 1568), ...sob(T.spark + 0.85, 1660, 2),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
