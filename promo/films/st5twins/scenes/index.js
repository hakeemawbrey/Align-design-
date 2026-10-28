// st5twins (35 s vertical Align ad, Star Talk season 5 "STAR-CROSSED", EP 04) · story 0–30.6, then the shared end card.
//   "Gemini has a *twin*?!"  Sagittarius gets a breakup text from "Gemini". It wasn't Gemini: it was the twin, drawn
//   identical but with a pixel mustache. The myth is real: the Gemini constellation is the twins Castor and Pollux.
//   Mischief, not cruelty: nobody gets humiliated, and the twin's redemption comes later in the season.
//   0.00–2.40  title sting: "★ STAR-CROSSED ★ / EPISODE 4".
//   2.50       "A text from | *“Gemini”…*"  Sagittarius (backpack on, packed for Peru) reads its phone: a bubble from
//              ♊ GEMINI.  “GEMINI”: "we should see other *people.*"
//   5.00       Sag's eyes shatter (pixel cracks + glass shards), gasp zoom.  SAG: "…but we booked *Peru.*"
//   8.40       The real Gemini bounces in, all smiles; the phone shrinks away.
//   9.45       "Gemini has | *a twin?!*"  A second Gemini pops up behind it, with a mustache. dun · dun · DUNNN, gasp zoom.
//              GEMINI: "that wasn’t *me!!*"
//   12.20      "Sound like | *them?*"  THE STARS: "if a text doesn’t sound like them, *ask them.*"  Sag asks; Gemini nods.
//   16.16      ★ LESSON UNLOCKED: "Ask, don’t | *assume.*"
//   20.60      "Check before | you *wreck.*"  Sag and Gemini, hearts. The twin slinks off right, twitching its mustache.
//   23.10      The cliffhanger: the twin waves… and Ophiuchus waves back from the edge. A pixel high-five. Gasp zoom on the
//              pair: they're working together. Gone by 26.15.
//   26.40–30.6 NEXT TIME ON ★ STAR-CROSSED… ★ "The Sun and the Moon | have a *secret.*"  The plain sky at 30.6, end card.
//   (7.2: the ghost hangs upside down from the bottom edge of Sag's phone.)
// One canvas (sky + constellation + cast + phone + st5cast devices), DOM type, the dialogue box and the lesson above it,
// grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { OPH, drawOphiuchus, drawTwin, drawBits, drawTitleSting, titleStingCues, drawNextTime, nextTimeCues, gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'

export const DURATION = 35
const EP = 4
const KEY = 'G'
const STORY_END = DURATION - ENDCARD_LEN       // 30.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const GEM = signStar('gemini'), SAG = signStar('sagittarius')

// ── the timeline
const T = {
  sting: 0,
  h0: 2.5, h0Land: 3.05, h0Out: [9.1, 9.3],
  cast: 2.45, phone: 2.6, buzz: [2.9, 3.25], bubble: 3.3,
  open: 3.1, l1: 3.3, shatter: 5.0, l2: 6.25, ghost: 7.2,
  phoneOut: [8.15, 8.45], gem: 8.4,
  twin: 9.4, gasp2: 9.45, h1: 9.45, h1Land: 9.95, h1Out: [11.9, 12.1],
  l3: 10.0,
  h2: 12.2, h2Land: 12.65, l4: 12.3, ask: 14.6, close: 15.85, h2Out: [15.7, 15.9],
  lesson: 16.16, lessonOut: [20.2, 20.4],
  h3: 20.6, h3Land: 21.15, hug: [20.5, 21.2], slink: [23.0, 23.6], h3Out: [22.8, 23.0], pairOut: [22.85, 23.2],
  oph: 23.4, wave: 23.6, five: 24.25, gasp3: 24.35, out: [25.75, 26.15],
  next: 26.4,
}
const GEN = '♊ GEMINI', FAKE = '♊ “GEMINI”', SGN = '♐ SAGITTARIUS', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: FAKE, text: 'we should see other *people.*', color: GEM.color },
  { t: T.l2, speaker: SGN, text: '…but we booked *Peru.*', color: SAG.color },
  { t: T.l3, speaker: GEN, text: 'that wasn’t *me!!*', color: GEM.color },
  { t: T.l4, speaker: NARR, text: 'if a text doesn’t sound like them, *ask them.*' },
]
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Ask, don’t | *assume.*', accentColor: GEM.color, dim: 0.55 }
const TEASE = 'The Sun and the Moon | have a *secret.*'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const sm = (t, a, b) => ease.inOutCubic(prog(t, a, b))

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
const PACK = ['..oooo..', '.oBBBBo.', 'oBBBBBBo', 'oBLLLLBo', 'oBLyyLBo', 'oBLLLLBo', 'oBBBBBBo', 'oBBBBBBo', '.oooooo.']
const PACK_C = { o: '#6b3d1f', B: '#b8743a', L: '#cf8f52', y: '#f7c948' }
const HAND = ['.f.f.f.', '.f.f.f.', 'fffffff', 'fffffff', '.fffff.', '..fff..']

// ── layout
const SAG0 = { x: 800, y: 1180, size: 290 }, SAG1 = { x: 650, y: 1180 }
const GEM0 = { x: 280, y: 1180, size: 270 }, GEM1 = { x: 410, y: 1180 }
const TWN0 = { x: 480, y: 1050, size: 250 }, TWN1 = { x: 990, y: 960 }, TWN2 = { x: 400, y: 1130 }
const PH = { x: 370, y: 1050, w: 360, h: 520 }
const OPH0 = { x: 820, y: 1090, size: 260 }
export const GHOST = { at: T.ghost, x: 318, y: PH.y + PH.h / 2 + 4, where: 'hanging upside down from the bottom edge of Sagittarius’s phone' }

function sagState(t) {
  if (t < T.bubble + 0.4) return { mood: 'happy', look: [-1, 0] }
  if (t < T.shatter) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.l2) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.gem) return { mood: 'sleepy', blink: 0.55, zzz: false, look: [0, 1] }
  if (t < T.twin) return { mood: 'squint', look: [-1, 0] }
  if (t < T.l4) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.ask) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.h3) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'heart' }
}
function gemState(t) {
  if (t < T.gem + 0.6) return { mood: 'happy', look: [1, 0] }
  if (t < T.twin) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.l3) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.l4) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.ask) return { mood: 'neutral', look: [1, 0] }
  if (t < T.h3) return { mood: 'happy', look: [1, 0] }
  return { mood: 'heart' }
}
function twinState(t) {
  if (t < T.l3) return { mood: 'wink', look: [1, 0] }
  if (t < T.l4) return { mood: 'eyeroll' }
  if (t < T.h3) return { mood: 'squint', look: [1, 0] }
  if (t < T.oph) return { mood: 'neutral', look: [1, 0] }
  if (t < T.five) return { mood: 'happy', look: [1, -1] }
  return { mood: 'wink', look: [1, -1] }
}
const SG_HOPS = [T.cast + 0.35, T.bubble + 0.1, T.shatter, ...talkHops(LINES, SGN, { cps: CPS }), T.twin + 0.05, T.ask, T.hug[1] - 0.3]
const GM_HOPS = [T.gem + 0.3, T.gem + 0.7, ...talkHops(LINES, GEN, { cps: CPS }), T.ask + 0.25, T.hug[1] - 0.25]
const TW_HOPS = [T.twin + 0.05, T.h3 + 0.2, T.h3 + 0.5, T.slink[0] + 0.3, T.slink[0] + 0.7, T.wave, T.wave + 0.45, T.five - 0.2]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 74px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'A text from | *“Gemini”…*', { top: 190, size: 116, accentSize: 184, at: T.h0, gap: 0.08, accentColor: GEM.color, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Gemini has | *a twin?!*', { top: 190, size: 120, accentSize: 184, at: T.h1, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Sound like | *them?*', { top: 190, size: 120, accentSize: 184, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'Check before | you *wreck.*', { top: 190, size: 116, accentSize: 184, at: T.h3, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const step = (x0, y0, w, h, P, col) => {
    x.fillStyle = col
    x.fillRect(x0 + 2 * P, y0, w - 4 * P, h); x.fillRect(x0, y0 + 2 * P, w, h - 4 * P); x.fillRect(x0 + P, y0 + P, w - 2 * P, h - 2 * P)
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 4, spread = 70) {
    for (let i = 0; i < 4; i++) {
      const born = t0 + ((i * 0.37 + seed * 0.13) % 1.4), life = 1.3
      for (let b = born; b < t1; b += 1.5) {
        if (t < b || t > b + life) continue
        const p = (t - b) / life, side = ((i * 37 + seed) % 7) / 6 - 0.5
        drawBits(x, HEART, HEART_C, Math.round(cx + side * spread + Math.sin(p * 7 + i) * 8), Math.round(cy - 20 - p * 120), cell, { alpha: Math.sin(Math.PI * p) })
      }
    }
  }
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
  /** Sag's phone: the text from "Gemini" */
  function drawPhone(t, k) {
    if (k <= 0) return
    const { w, h } = PH
    const bz = t > T.buzz[0] && t < T.buzz[1] ? Math.sin(t * 120) * 6 : 0
    x.save(); x.translate(PH.x + bz, PH.y); x.scale(k, k); x.rotate(-0.04)
    const x0 = -w / 2, y0 = -h / 2, P = 6
    step(x0 - P, y0 - P, w + 2 * P, h + 2 * P, P, INK)
    step(x0, y0, w, h, P, '#3a3360')
    const sx0 = x0 + 16, sy0 = y0 + 40, sw = w - 32, sh = h - 76
    x.fillStyle = '#0f0a26'; x.fillRect(sx0, sy0, sw, sh)
    x.fillStyle = INK; x.fillRect(-26, y0 + 16, 52, 8); x.fillRect(-20, y0 + h - 26, 40, 10)
    x.fillStyle = '#1e1844'; x.fillRect(sx0, sy0, sw, 42)
    x.font = `700 22px 'Space Mono', monospace`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillStyle = GEM.color; x.fillText(GEN, sx0 + 12, sy0 + 22)
    // an older happy message, then the bomb
    const msg = (y, lines, col, ink, at) => {
      const s = easeOutBack(prog(t, at, at + 0.25), 2.2); if (s <= 0) return
      x.save(); x.translate(sx0 + 12, y); x.scale(s, s)
      const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 28, bh = 18 + 30 * lines.length
      step(0, 0, bw, bh, 4, col); x.fillStyle = ink
      lines.forEach((l, j) => x.fillText(l, 14, 24 + j * 30))
      x.restore()
    }
    x.font = `700 24px 'Space Mono', monospace`
    msg(sy0 + 70, ['peru!! 3 weeks', 'can’t wait ✈'], '#3d3570', BONE, -1)
    msg(sy0 + 200, ['we should see', 'other people.'], GEM.color, INK, T.bubble)
    // the unread dot
    if (t > T.buzz[0] && t < T.bubble + 0.3) { x.fillStyle = '#ff3d6e'; x.fillRect(w / 2 - 30, y0 + 4, 24, 24) }
    x.restore()
  }
  /** Sag's eyes shatter: pixel cracks across both eyes and glass shards flying out */
  function shatter(t, r) {
    const p = prog(t, T.shatter, T.shatter + 0.25), fade = 1 - ease.inQuad(prog(t, T.gem - 0.6, T.gem))
    if (p <= 0 || fade <= 0) return
    const c = Math.max(3, Math.round(r.size / 36)), ey = r.y - r.size * 0.02
    x.save(); x.globalAlpha = fade
    const pts = [[0, -4], [1, -3], [1, -2], [0, -1], [-1, 0], [-1, 1], [0, 2], [1, 3], [0, 4]]
    for (const s of [-1, 1]) {
      const ex = r.x + s * r.size * 0.135, n = Math.round(pts.length * p)
      for (let i = 0; i < n; i++) {
        const [a, b] = pts[i], px = Math.round(ex + a * c * s - c), py = Math.round(ey + b * c)
        x.fillStyle = INK; x.fillRect(px - c / 2, py, c * 2, c)
        x.fillStyle = '#fffbea'; x.fillRect(px + c / 2, py, c / 2 + 1, c)
      }
    }
    x.restore()
    const q = prog(t, T.shatter, T.shatter + 0.8)
    if (q > 0 && q < 1) {
      x.save(); x.globalAlpha = 1 - q
      for (let i = 0; i < 14; i++) {
        const a = -Math.PI / 2 + (i / 13 - 0.5) * 2.6, d = 40 + 200 * ease.outCubic(q), sz = 6 + (i % 3) * 4
        x.fillStyle = i % 2 ? '#bfe9ff' : '#fffbea'
        x.fillRect(Math.round(r.x + Math.cos(a) * d), Math.round(ey + Math.sin(a) * d + 160 * q * q), sz, sz)
      }
      x.restore()
    }
    // a tear, once the shards settle
    if (t > T.l2 && t < T.gem) {
      const tp = ((t - T.l2) * 0.9) % 1
      x.save(); x.globalAlpha = fade * (1 - tp); x.fillStyle = '#8fd8ff'
      x.fillRect(Math.round(r.x - r.size * 0.13), Math.round(ey + r.size * 0.06 + tp * 60), c * 1.4, c * 2); x.restore()
    }
  }
  function hand(cx, cy, cell, t, t0, col) {
    const w = Math.sin((t - t0) * 14) * 0.35
    drawBits(x, HAND, { f: col }, Math.round(cx), Math.round(cy), cell, { rot: w })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const ok = popOut(t, T.out), pk = popOut(t, T.pairOut)
      const z1 = gaspZoom(t, { at: T.shatter, dur: 1.3, x: SAG0.x, y: SAG0.y, amount: 0.45, follow: 0.5 })
      const z2 = gaspZoom(t, { at: T.gasp2, dur: 1.4, x: TWN0.x, y: TWN0.y, amount: 0.45, follow: 0.5 })
      const z3 = gaspZoom(t, { at: T.gasp3, dur: 1.35, x: 610, y: 1090, amount: 0.35, follow: 0.6 })
      x.save(); z1.apply(x); z2.apply(x); z3.apply(x)
      if (t >= T.cast && ok > 0) {
        // the twin, peeking from behind Gemini, then slinking right, then waving at Ophiuchus
        const tt = sm(t, ...T.slink)
        const t1 = sm(t, T.h3, T.h3 + 0.7)
        const twx = lerp(lerp(TWN0.x, TWN1.x, t1), TWN2.x, tt), twy = lerp(lerp(TWN0.y, TWN1.y, t1), TWN2.y, tt)
        const twp = pop01(t, T.twin, 0.35, 2.4) * ok
        // Ophiuchus at the right edge, waving back
        const op = pop01(t, T.oph, 0.4, 2.2) * ok
        if (op > 0) {
          const ro = drawOphiuchus(x, OPH0.x + 260 * (1 - sm(t, T.oph, T.oph + 0.5)), OPH0.y, OPH0.size, t, { mood: t < T.five ? 'sparkle' : 'wink', look: [-1, 0], side: 1, pop: op, hops: [T.oph + 0.3, T.five - 0.2] })
          if (t > T.oph + 0.3) hand(ro.x - 150, ro.y - 50, 7, t, T.oph, OPH.violet)
        }
        // the pair: Sag (backpack) and Gemini; they hug in the middle on the last line
        const hg = sm(t, ...T.hug)
        const gx2 = lerp(GEM0.x, GEM1.x, hg), sx2 = lerp(SAG0.x, SAG1.x, hg)
        const gp = pop01(t, T.gem, 0.35, 2.4) * pk
        if (twp > 0) {
          const rt = drawTwin(x, twx, twy, TWN0.size, t, { ...twinState(t), pop: twp, hops: TW_HOPS, twitch: [T.l3 + 0.8, T.h3 + 0.8, T.five + 0.1] })
          if (t > T.wave && t < T.out[0]) hand(rt.x + 150, rt.y - 50, 7, t, T.wave, GEM.color)
          sparkles(t, rt.x, rt.y, T.twin, 12, 170, 0.3, [GEM.color, BONE, PINK])
        }
        const ps = pop01(t, T.cast, 0.4, 2.2) * pk
        drawBits(x, PACK, PACK_C, Math.round(sx2 + 112), Math.round(SAG0.y - 10), 11 * ps, { rot: 0.12 })
        const rs = drawStarChar(x, sx2, SAG0.y, SAG0.size, t, { color: SAG.color, glyph: SAG.glyph, ...sagState(t), pop: ps, seed: 91, hops: SG_HOPS, glow: 0.9 })
        shatter(t, rs)
        if (gp > 0) {
          const rg = drawStarChar(x, gx2 - 200 * (1 - sm(t, T.gem, T.gem + 0.35)), GEM0.y, GEM0.size, t, { color: GEM.color, glyph: GEM.glyph, ...gemState(t), pop: gp, seed: 31, hops: GM_HOPS, glow: 0.9 })
          if (t > T.ask + 0.3 && t < T.lesson) floatHearts(t, (rg.x + rs.x) / 2, Math.min(rg.top, rs.top), T.ask + 0.3, T.lesson, 4)
          if (t > T.h3) { floatHearts(t, rg.x, rg.top, T.h3 + 0.3, T.pairOut[0], 5); floatHearts(t, rs.x, rs.top, T.h3 + 0.5, T.pairOut[0], 8) }
        }
        // the phone (and the ghost hanging under it)
        const phk = pop01(t, T.phone, 0.4, 2) * popOut(t, T.phoneOut) * ok
        if (phk > 0) { drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'above', cell: 3 }); drawPhone(t, phk) }
        // the high-five spark
        const f = prog(t, T.five, T.five + 0.5)
        if (f > 0 && f < 1) { sparkles(t, 610, 1040, T.five, 12, 120, 0.2, [GOLD, OPH.teal, GEM.color, BONE]) }
      }
      x.restore()
      drawGaspLines(x, t, { at: T.shatter, dur: 1.3, x: SAG0.x, y: SAG0.y, follow: 0.5, color: SAG.color })
      drawGaspLines(x, t, { at: T.gasp2, dur: 1.4, x: TWN0.x, y: TWN0.y, follow: 0.5, color: GEM.color })
      drawGaspLines(x, t, { at: T.gasp3, dur: 1.35, x: 610, y: 1090, follow: 0.6, color: OPH.teal })
      drawTitleSting(x, t, { ep: EP, at: T.sting })
      drawNextTime(x, t, { at: T.next, tease: TEASE, y: 760, size: 74, accentSize: 110 })
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 2.42 (sting out → the text), 20.42 (lesson out → check before you wreck), 26.3 (→ NEXT TIME).
const CUTS = [{ t: 2.42, kind: 'flip' }, { t: 20.42, kind: 'flip' }, { t: 26.3, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S5 E04' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine; st5cast writes its brass in KEY)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...titleStingCues(T.sting, { key: KEY, ep: EP }),
  ...wordPops(T.h0, 3, 0.08, 0, 0.025), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', r3(T.cast + 0.05), 739.99, 0.03, 0.4], ['pop', r3(T.phone + 0.05), 880, 0.035, -0.3],
  ...[0, 0.12, 0.24].map(d => ['tick', r3(T.buzz[0] + d), 0.06]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ['pop', T.bubble, 1318.51, 0.04, -0.3],
  ...talkCues(LINES, { cps: CPS, pitch: { [FAKE]: 880, [SGN]: 587.33, [GEN]: 880, [NARR]: 784 } }),
  ...gaspCues(T.shatter, { key: KEY }), ['glitter', T.shatter, T.shatter + 0.5], ['tick', T.shatter + 0.05, 0.1], ['tick', T.shatter + 0.12, 0.08],
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.phoneOut[0], 0.3, 0.03], ['pop', r3(T.gem + 0.05), 1174.66, 0.04, -0.5], ['pop', r3(T.gem + 0.3), 1318.51, 0.03, -0.4],
  ...twistCues(T.gasp2 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp2 - 0.05),
  ...gaspCues(T.gasp2, { key: KEY }),
  ...wordPops(T.h1, 2, 0.08, 1, 0.026), ['pop', T.h1Land, 1318.51, 0.05, 0],
  ...wordPops(T.h2, 2, 0.08, 3, 0.026), ['pop', T.h2Land, 987.77, 0.05, 0],
  ['bell', T.ask, 1760, 0.03, 1.2, 0], ['pluck', T.ask + 0.25, 1174.66, 0.04, 0.6, -0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...wordPops(T.h3, 3, 0.08, 2, 0.026), ['pop', T.h3Land, 1174.66, 0.05, 0],
  ['whoosh', T.slink[0], 0.6, 0.025], ['whoosh', T.pairOut[0], 0.3, 0.025],
  ['pop', r3(T.wave + 0.05), 1318.51, 0.03, 0.3], ['glitter', T.oph, T.oph + 0.6], ['pop', r3(T.oph + 0.05), 1567.98, 0.035, 0.6],
  ['pop', T.five, 1760, 0.05, 0.4], ['crash', T.five, { gain: 0.03, len: 1.2 }],
  ...gaspCues(T.gasp3, { key: KEY }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...nextTimeCues(T.next, { key: KEY, tease: TEASE }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
