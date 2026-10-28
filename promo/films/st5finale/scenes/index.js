// st5finale (45 s vertical Align ad, Star Talk season 5 "STAR-CROSSED", EP 10, the season finale) · story 0–40.6, then
// the shared end card.
//   "*Star-crossed.*"  The whole cast is back on the Houston rooftop under string lights: all twelve signs, the twin (with
//   his mustache), Saturn, Ophiuchus, Pluto, and the Auntie Council floating on their doily. Leo asks again; Aquarius says
//   "yes. slowly." No rush. Ophiuchus gets its first blind date (card first, face last), Pluto and Scorpio part as friends,
//   and the ghost catches the bouquet.
//   0.00–2.40  title sting "★ STAR-CROSSED ★ / EPISODE 10".
//   2.50       "The season | *finale.*"  Everyone pops in. Leo kneels with the ring box (the one from EP 05–07).
//              LEO: "Aquarius. i asked once. i'm asking *again.*"  →  "will you marry me? *no rush.*" (the box opens)
//   8.60       gasp zoom on Aquarius (everyone, Aunties included, leans in).  AQUARIUS: "yes. *slowly.*"
//   10.3       confetti, hearts, the Aunties' tears turn into fountains. "Engaged. | *No rush.*"
//              AUNTIE CANCER: "we are NOT crying. *you're* crying."
//   14.4       "Everyone gets | *an ending.*"  A veiled profile card floats down to Ophiuchus.
//              OPHIUCHUS: "my first blind date. card first, face *last.*"  (heart eyes, the serpent too)
//              PLUTO: "Scorpio. no hard feelings. *take care.*"  They wave; Pluto's crown sits straight.
//              THE STARS: "the best love stories are *chosen*, every day."
//   25.0       ★ LESSON UNLOCKED: "Love is chosen | *daily.*"
//   29.0       "To be | *continued*…"  Aquarius tosses the bouquet over the crowd… and the ghost swoops in from the
//              left and CATCHES it (the season's last ghost spot). Gasp zoom on the ghost; it blushes.
//   35.2–40.4  NEXT TIME ON ★ STAR-CROSSED… ★ "NEXT SEASON: Venus goes | retrograde… and | *everyone's* exes | come back."
// One canvas (sky + constellation + rooftop + cast + st5cast devices), DOM type, the dialogue box and the lesson above it,
// grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostSheet } from '../../stlore.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { OPH, PLUTO, SATURN, drawOphiuchus, drawPluto, drawTwin, drawSaturn, drawBits, drawTitleSting, titleStingCues, drawNextTime, nextTimeCues, gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'
import { CROWN, CROWN_C, makeSkyline, drawRooftop, sparkles, floatHearts } from './roof.js'
import { auntie, makeDoily, drawDoily, drawTears } from './props.js'

export const DURATION = 45
const EP = 10
const KEY = 'F'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', CYAN = '#7fdcff'
const NEXT_DUR = 5.2

// ── the timeline
const T = {
  sting: 0,
  h0: 2.5, h0Land: 2.95, h0Out: [9.2, 9.4],
  roof: 2.4, cast: 2.5, aunties: 2.9,
  open: 3.3, l1: 3.5, l2: 6.9, boxOpen: 7.2, gasp1: 8.6,
  l3: 9.6, yes: 10.3, confetti: [10.3, 14.6],
  h1: 10.4, h1Land: 10.9, h1Out: [14.1, 14.3],
  l4: 11.8,
  h2: 14.5, h2Land: 15.0, h2Out: [24.6, 24.8],
  card: [14.3, 15.0], cardOut: [21.2, 21.6], l5: 14.8, l6: 18.3, wave: 20.2, l7: 21.5, close: 24.9,
  lesson: 25.0, lessonOut: [28.7, 28.9],
  h3: 29.0, h3Land: 29.5, toss: [30.3, 31.6], fly: [30.8, 31.6], catch: 31.6, gasp2: 31.7,
  h3Out: [34.7, 34.9], out: [34.6, 35.1],
  next: 35.2,
}
const LEON = '♌ LEO', AQUN = '♒ AQUARIUS', AUNN = '♋ AUNTIE CANCER', OPHN = OPH.tag, PLN = PLUTO.tag, NARR = 'THE STARS'
const COL = id => signStar(id).color
const LINES = [
  { t: T.l1, speaker: LEON, text: 'Aquarius. i asked once. i’m asking *again.*', color: COL('leo') },
  { t: T.l2, speaker: LEON, text: 'will you marry me? *no rush.*', color: COL('leo') },
  { t: T.l3, speaker: AQUN, text: 'yes. *slowly.*', color: COL('aquarius') },
  { t: T.l4, speaker: AUNN, text: 'we are NOT crying. *you’re* crying.', color: '#ffb3c7' },
  { t: T.l5, speaker: OPHN, text: 'my first blind date. card first, face *last.*', color: OPH.tagColor },
  { t: T.l6, speaker: PLN, text: 'Scorpio. no hard feelings. *take care.*', color: PLUTO.tagColor },
  { t: T.l7, speaker: NARR, text: 'the best love stories are *chosen*, every day.' },
]
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Love is chosen | *daily.*', accentColor: PINK, dim: 0.55 }
const TEASE = 'NEXT SEASON: Venus goes | retrograde… and | *everyone’s* exes | come back.'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout: the back row (ten, the twin among them), a middle row, Leo kneeling to Aquarius in front, Aunties aloft
const ROOF_Y = 1330
const BACK = ['aries', 'taurus', 'gemini', 'twin', 'cancer', 'virgo', 'libra', 'sagittarius', 'capricorn', 'pisces']
const BACK_POS = BACK.map((id, i) => ({ id, x: 92 + i * 99, y: 912 + (i % 2) * 14, size: 88, seed: 70 + i, at: T.cast + 0.04 * i }))
const SAT0 = { x: 136, y: 1110, size: 200 }
const OPH0 = { x: 318, y: 1120, size: 190 }
const SCO = { x: 790, y: 1120, size: 140, seed: 81 }
const PLU = { x: 944, y: 1150, size: 112 }
const LEO = { x: 404, y: 1262, size: 196, seed: 82 }
const AQU = { x: 692, y: 1240, size: 196, seed: 83 }
const RINGBOX = { x: 548, y: 1328 }
const DOILY = { x: 862, y: 716, rx: 215, ry: 50 }
const AUN_C = { x: 772, y: 632, s: 152 }, AUN_T = { x: 952, y: 640, s: 144 }
const CATCH = { x: 470, y: 700 }
export const GHOST = { at: T.fly[0], x: CATCH.x, y: CATCH.y, where: 'swoops in from the left and catches the bouquet mid-air over the rooftop crowd' }

function backMood(t, m) {
  const toLeo = [clamp((LEO.x + 110 - m.x) / 400, -1, 1), 1]
  if (t < T.gasp1) return { mood: 'happy', look: toLeo }
  if (t < T.yes) return { mood: 'wide', look: toLeo, blink: false }
  if (t < T.yes + 3.2) return { mood: 'heart' }
  if (t < T.toss[0]) return { mood: 'happy' }
  if (t < T.catch) return { mood: 'wide', look: [clamp((CATCH.x - m.x) / 400, -1, 1), -1], blink: false }
  if (t < T.catch + 1.6) return { mood: 'wide', look: [clamp((CATCH.x - m.x) / 400, -1, 1), -1], blink: false }
  return { mood: 'heart' }
}
function leoState(t) {
  if (t < T.l2) return { mood: 'sparkle', look: [1, 0], squash: 0.16 }
  if (t < T.gasp1) return { mood: 'heart', look: [1, 0], squash: 0.16 }
  if (t < T.yes) return { mood: 'wide', look: [1, 0], blink: false, squash: 0.16 }
  if (t < T.toss[0]) return { mood: 'heart', squash: 0.16 * (1 - prog(t, T.yes, T.yes + 0.3)) }
  if (t < T.catch + 1.6) return { mood: 'wide', look: [0, -1], blink: false }
  return { mood: 'happy' }
}
function aquState(t) {
  if (t < T.gasp1) return { mood: 'sparkle', look: [-1, 1] }
  if (t < T.l3) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.yes) return { mood: 'happy', blush: true }
  if (t < T.toss[0]) return { mood: 'heart' }
  if (t < T.catch + 1.6) return { mood: 'wide', look: [-1, -1], blink: false }
  return { mood: 'happy' }
}
function ophState(t) {
  if (t < T.gasp1) return { mood: 'happy', look: [1, 1], snake: 'neutral' }
  if (t < T.yes) return { mood: 'wide', look: [1, 1], blink: false, snake: 'wide' }
  if (t < T.card[0]) return { mood: 'sparkle', snake: 'heart' }
  if (t < T.card[1] + 0.2) return { mood: 'wide', look: [0, -1], blink: false, snake: 'wide' }
  if (t < T.cardOut[1]) return { mood: 'heart', look: [0, -1], snake: 'heart' }
  if (t < T.toss[0]) return { mood: 'happy', snake: 'heart' }
  if (t < T.catch + 1.6) return { mood: 'wide', look: [1, -1], blink: false, snake: 'wide' }
  return { mood: 'sparkle', snake: 'heart' }
}
function scoState(t) {
  if (t < T.gasp1) return { mood: 'happy', look: [-1, 1] }
  if (t < T.yes) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.l6) return { mood: 'happy' }
  if (t < T.wave) return { mood: 'neutral', look: [1, 0] }
  if (t < T.toss[0]) return { mood: 'happy', look: [1, 0] }
  if (t < T.catch + 1.6) return { mood: 'wide', look: [-1, -1], blink: false }
  return { mood: 'heart' }
}
function plutoState(t) {
  if (t < T.gasp1) return { mood: 'neutral', look: [-1, 1], crownSlip: 0 }
  if (t < T.yes) return { mood: 'wide', look: [-1, 1], crownSlip: 0.3 }
  if (t < T.l6) return { mood: 'happy', crownSlip: 0.1 }
  if (t < T.wave) return { mood: 'neutral', look: [-1, 0], crownSlip: 0 }
  if (t < T.toss[0]) return { mood: 'happy', crownSlip: 0 }
  if (t < T.catch + 1.6) return { mood: 'wide', look: [-1, -1], crownSlip: 0.4 }
  return { mood: 'heart', crownSlip: 0 }
}
function auntieState(t, which) {
  const g = which === 'c' ? { frame: '#b3203f', hi: '#ffe08a', chain: true, down: 0, fog: 0 } : { frame: '#5a2e14', hi: '#ffd98a', down: 0, fog: 0 }
  const look = [clamp((LEO.x - AUN_C.x) / 400, -1, 1), 1]
  if (t < T.gasp1) return { mood: 'sparkle', look, g }
  if (t < T.yes) return { mood: 'wide', look, blink: false, g: { ...g, down: 0.7 } }
  if (t < T.toss[0]) return { mood: (which === 'c' && t > T.l4 && t < T.l4 + 2.4) ? 'squint' : 'heart', g: { ...g, fog: 0.3 * prog(t, T.yes, T.yes + 1.2) } }
  if (t < T.catch + 1.6) return { mood: 'wide', look: [-1, 0], blink: false, g: { ...g, down: 0.7 } }
  return { mood: 'heart', g: { ...g, fog: 0.25 } }
}
const LEO_HOPS = [T.cast + 0.4, ...talkHops(LINES, LEON, { cps: CPS }), T.yes, T.yes + 0.5]
const AQU_HOPS = [T.cast + 0.45, ...talkHops(LINES, AQUN, { cps: CPS }), T.yes, T.yes + 0.5, T.toss[0]]
const OPH_HOPS = [T.cast + 0.4, ...talkHops(LINES, OPHN, { cps: CPS }), T.yes + 0.1, T.card[1]]
const PL_HOPS = [...talkHops(LINES, PLN, { cps: CPS }), T.wave, T.wave + 0.45, T.yes + 0.2]
const AUN_HOPS = [...talkHops(LINES, AUNN, { cps: CPS }), T.yes, T.yes + 0.45, T.catch + 0.1]

const FLOWER = ['.p.w.p.', 'pPpwpPp', '.p.y.p.', 'w.gPg.w', 'wyw.yYw', '.wgggw.', '..ggg..', '...r...', '..rRr..', '...g...', '...g...']
const FLOWER_C = { p: '#ff8fb1', P: '#ff4f86', w: '#fff3f8', y: '#f7c948', Y: '#ffe08a', g: '#5fc46a', r: '#c9a6ff', R: '#a46cff' }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 74px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = ASSETS + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [cardIm] = await Promise.all([loadImg('card-profile-3.png')])
  const CARD = bake(cardIm, 300)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const SKYLINE = makeSkyline(1010, { base: ROOF_Y, lo: 90, hi: 330 })
  const DOILY_IMG = makeDoily(document, 66)

  const H0 = popText(root, 'The season | *finale.*', { top: 190, size: 116, accentSize: 184, at: T.h0, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Engaged. | *No rush.*', { top: 190, size: 116, accentSize: 184, at: T.h1, gap: 0.08, accentColor: PINK, wobble: true, late: 2, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Everyone gets | *an ending.*', { top: 190, size: 112, accentSize: 178, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'To be | *continued*…', { top: 190, size: 120, accentSize: 190, at: T.h3, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function ringBox(t, a) {
    if (a <= 0.01) return
    const open = ease.outBack(prog(t, T.boxOpen, T.boxOpen + 0.3))
    x.save(); x.globalAlpha *= clamp(a); x.translate(RINGBOX.x, RINGBOX.y); x.scale(1.5 * a, 1.5 * a)
    x.fillStyle = INK; x.fillRect(-34, -40, 68, 40)
    x.fillStyle = '#b8264f'; x.fillRect(-30, -36, 60, 32)
    x.fillStyle = '#e04a72'; x.fillRect(-30, -36, 60, 5)
    if (open > 0.05) {
      x.save(); x.translate(0, -38); x.scale(1, clamp(open, 0, 1.2))
      x.fillStyle = INK; x.fillRect(-32, -40, 64, 40); x.fillStyle = '#7a1838'; x.fillRect(-30, -36, 60, 34)
      x.restore()
      x.fillStyle = '#3b0c1e'; x.fillRect(-22, -40, 44, 6)
      x.fillStyle = '#f7c948'; x.fillRect(-12, -58, 24, 4); x.fillRect(-12, -44, 24, 4); x.fillRect(-16, -54, 4, 10); x.fillRect(12, -54, 4, 10)
      x.fillStyle = '#bff3ff'; x.fillRect(-6, -68, 12, 10); x.fillStyle = '#ffffff'; x.fillRect(-4, -66, 4, 4)
    } else { x.fillStyle = INK; x.fillRect(-34, -52, 68, 14); x.fillStyle = '#9a1d42'; x.fillRect(-30, -48, 60, 10) }
    x.restore()
    const tw = (Math.sin(t * 5.3) + 1) / 2
    if (open > 0.5 && tw > 0.55) { x.save(); x.globalAlpha = clamp(a) * (tw - 0.55) * 2.2; drawPixelStar(x, RINGBOX.x + 3, RINGBOX.y - 96, 30, 1, '#ffffff'); x.restore() }
    sparkles(x, t, RINGBOX.x, RINGBOX.y - 90, T.boxOpen, 12, 110, 0.2, [GOLD, CYAN, BONE])
  }
  function confetti(t) {
    const [a, b] = T.confetti
    if (t < a || t > b) return
    const r = rng(1010), fade = 1 - prog(t, b - 0.8, b)
    const cols = [GOLD, PINK, CYAN, LAV, '#7dffb0', BONE]
    x.save()
    for (let i = 0; i < 90; i++) {
      const x0 = r() * 1080, sp = 260 + r() * 260, delay = r() * 1.2, sw = r() * 6, c = cols[i % cols.length]
      const tt = t - a - delay
      if (tt < 0) continue
      const py = -30 + tt * sp, px = x0 + Math.sin(tt * 3 + sw) * 40
      if (py > 1400) continue
      const flip = Math.abs(Math.sin(tt * 8 + sw))
      x.globalAlpha = fade; x.fillStyle = c
      x.fillRect(Math.round(px), Math.round(py), Math.max(2, Math.round(14 * flip)), 8)
    }
    x.restore()
  }
  function profileCard(t) {
    const p = prog(t, ...T.card), q = prog(t, ...T.cardOut)
    if (p <= 0 || q >= 1 || !CARD) return
    const e = easeOutBack(p, 1.5)
    const cx = lerp(OPH0.x - 120, OPH0.x + 6, e), cy = lerp(560, 862, ease.outCubic(p)) + Math.sin(t * 2) * 6
    const w = 190, h = Math.round(w * CARD.height / CARD.width)
    x.save(); x.globalAlpha = 1 - ease.inQuad(q); x.translate(Math.round(cx), Math.round(cy)); x.rotate(lerp(-0.4, -0.06, ease.outCubic(p)) + Math.sin(t * 1.6) * 0.03)
    const g = x.createRadialGradient(0, 0, 0, 0, 0, 200); g.addColorStop(0, 'rgba(201,166,255,0.45)'); g.addColorStop(1, 'rgba(201,166,255,0)')
    x.fillStyle = g; x.fillRect(-200, -200, 400, 400)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.drawImage(CARD, -w / 2, -h / 2, w, h)
    x.restore()
    sparkles(x, t, cx, cy, T.card[1], 12, 150, 0.5, [LAV, PINK, GOLD, BONE])
  }
  /** the bouquet: Aquarius tosses it, it arcs up, the ghost catches it and holds it up */
  function bouquetAt(t) {
    const p = prog(t, ...T.toss)
    const x0 = AQU.x + 40, y0 = AQU.y - 120, x1 = CATCH.x, y1 = CATCH.y - 108
    const e = ease.inOutQuad(p)
    return [lerp(x0, x1, e), lerp(y0, y1, p) - Math.sin(Math.PI * p) * 210, p]
  }
  function ghostCatch(t, ok) {
    if (t < T.toss[0] || ok <= 0) return
    const [bx, by, bp] = bouquetAt(t)
    // the ghost flies in from the left
    const fp = prog(t, ...T.fly)
    let gx2 = lerp(-140, CATCH.x, ease.outCubic(fp)), gy2 = CATCH.y + Math.sin(fp * Math.PI) * -40
    const held = t >= T.catch
    if (held) { const s = t - T.catch; gx2 = CATCH.x + Math.sin(s * 2.2) * 8; gy2 = CATCH.y + Math.sin(s * 3) * 6 - 14 * Math.exp(-s * 4) * Math.sin(s * 20) }
    if (fp > 0) {
      x.save(); x.globalAlpha = clamp(ok)
      drawGhostSheet(x, t, gx2, gy2, 5, { look: held ? (t < T.gasp2 + 1.3 ? [0, -1] : [0, 0]) : [1, -1], wide: held && t < T.gasp2 + 1.3, blush: held ? clamp((t - T.catch - 0.6) * 2) : 0, rot: held ? 0 : lerp(0.35, 0, fp) })
      x.restore()
    }
    // the bouquet: flying, then in the ghost's "hands" over its head
    const fx = held ? gx2 : bx, fy = held ? gy2 - 122 : by, rot = held ? Math.sin(t * 3) * 0.08 : bp * 9
    drawBits(x, FLOWER, FLOWER_C, Math.round(fx), Math.round(fy), 9 * clamp(ok), { rot })
    if (held) {
      sparkles(x, t, fx, fy, T.catch, 14, 160, 0.3, [PINK, GOLD, BONE, LAV])
      floatHearts(x, t, gx2, gy2 - 150, T.catch + 0.8, T.out[0], 7, 5, 120)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const ok = popOut(t, T.out)
      const z1 = gaspZoom(t, { at: T.gasp1, dur: 1.4, x: AQU.x, y: AQU.y, amount: 0.4, follow: 0.6, cy: 1060 })
      const z2 = gaspZoom(t, { at: T.gasp2, dur: 1.6, x: CATCH.x, y: CATCH.y, amount: 0.35, follow: 0.5 })
      x.save(); z1.apply(x); z2.apply(x)
      const rk = ease.outCubic(prog(t, T.roof, T.roof + 0.6)) * clamp(ok)
      drawRooftop(x, t, SKYLINE, rk, { lights: false })
      // string lights, two strands, sagging over the party
      if (rk > 0) for (const [y0, ph] of [[820, 0], [870, 1.3]]) {
        x.save(); x.globalAlpha = rk
        for (let i = 0; i <= 54; i++) {
          const u = i / 54, px = lerp(-10, 1090, u), py = y0 + Math.sin(Math.PI * u) * (y0 === 820 ? -60 : 50)
          x.fillStyle = '#2a2148'; x.fillRect(Math.round(px), Math.round(py), 20, 3)
          if (i % 3 === 0) { x.globalAlpha = rk * (0.6 + 0.4 * Math.sin(t * 2.3 + i + ph)); x.fillStyle = (i / 3) % 2 ? '#ffd98a' : '#ffb3cc'; x.fillRect(Math.round(px) - 4, Math.round(py) + 4, 9, 11); x.globalAlpha = rk }
        }
        x.restore()
      }
      if (t >= T.cast && ok > 0) {
        // the Aunties on their doily
        const ap = pop01(t, T.aunties, 0.5, 1.8) * ok
        const dy = Math.sin(t * 1.3) * 6 + (1 - ap) * -200
        drawDoily(x, DOILY_IMG, DOILY.x, DOILY.y + dy, DOILY.rx * ap, DOILY.ry * ap, clamp(ap))
        const cs = auntieState(t, 'c'), ts = auntieState(t, 't'), CAN = signStar('cancer'), TAU = signStar('taurus')
        const rc = auntie(x, AUN_C.x, AUN_C.y + dy, AUN_C.s, t, { color: CAN.color, glyph: CAN.glyph, mood: cs.mood, look: cs.look, blink: cs.blink, hops: AUN_HOPS, seed: 3, pop: ap, glasses: cs.g })
        const rt = auntie(x, AUN_T.x, AUN_T.y + dy, AUN_T.s, t, { color: TAU.color, glyph: TAU.glyph, mood: ts.mood, look: ts.look, blink: ts.blink, hops: [T.yes + 0.1, T.yes + 0.55, T.catch + 0.15], seed: 8, pop: ap, glasses: ts.g })
        // happy tears from the "yes" on: fountains at first, then a steady trickle
        if (t > T.yes - 0.2) {
          const fountain = (t > T.yes && t < T.yes + 4.5) || t > T.catch + 0.3
          for (const [r, sd] of [[rc, 2], [rt, 5]]) if (r.eyeY) drawTears(x, t, r.x, r.eyeY + r.cell * 3, r.eyeDX, Math.max(9, r.cell * 1.7), { amount: clamp(prog(t, T.yes - 0.2, T.yes + 0.2)) * clamp(ok), seed: sd, fountain })
        }
        // the back row
        for (const m of BACK_POS) {
          const p = pop01(t, m.at, 0.35, 2.2) * ok
          if (p <= 0.02) continue
          const hops = [m.at + 0.3, T.yes + (m.seed % 5) * 0.05, T.catch + (m.seed % 4) * 0.06]
          const s = backMood(t, m)
          if (m.id === 'twin') drawTwin(x, m.x, m.y, m.size, t, { ...s, pop: p, seed: m.seed, glow: 0.8, hops })
          else { const st = signStar(m.id); drawStarChar(x, m.x, m.y, m.size, t, { color: st.color, glyph: null, ...s, pop: p, seed: m.seed, glow: 0.8, hops }) }
          if (s.mood === 'heart' && t > T.yes && t < T.yes + 3.2) floatHearts(x, t, m.x, m.y - 50, T.yes, T.yes + 2.6, m.seed, 3, 40)
        }
        // the middle row: Saturn, Ophiuchus, Scorpio + Pluto
        drawSaturn(x, SAT0.x, SAT0.y, SAT0.size, t, { mood: t > T.gasp1 && t < T.yes ? 'wide' : t > T.toss[0] && t < T.catch + 1.6 ? 'wide' : 'happy', look: [1, 1], pop: pop01(t, T.cast + 0.2, 0.4, 2.2) * ok, hops: [T.cast + 0.5, T.yes + 0.15, T.catch + 0.1] })
        profileCard(t)
        const os = ophState(t)
        const rO = drawOphiuchus(x, OPH0.x, OPH0.y, OPH0.size, t, { ...os, pop: pop01(t, T.cast + 0.25, 0.4, 2.2) * ok, hops: OPH_HOPS })
        if (t > T.card[1] && t < T.cardOut[1]) floatHearts(x, t, rO.x, rO.top + 10, T.card[1] + 0.2, T.cardOut[0], 2, 4, 70)
        const sc = signStar('scorpio')
        const rS = drawStarChar(x, SCO.x, SCO.y, SCO.size, t, { color: sc.color, glyph: sc.glyph, ...scoState(t), pop: pop01(t, T.cast + 0.3, 0.35, 2.2) * ok, seed: SCO.seed, glow: 0.85, hops: [T.cast + 0.6, T.yes + 0.2, T.wave + 0.2, T.wave + 0.65, T.catch + 0.2] })
        drawPluto(x, PLU.x, PLU.y, PLU.size, t, { ...plutoState(t), pop: pop01(t, T.cast + 0.35, 0.4, 2.2) * ok, hops: PL_HOPS })
        if (t > T.wave && t < T.wave + 2.4) {
          // the wave: a little pixel "hand" flap over each of them, then a shared heart between them
          for (const [hx, hy, s] of [[rS.x + 58, rS.top + 30, 1], [PLU.x - 44, PLU.y - 70, -1]]) {
            const fl = Math.sin((t - T.wave) * 14) * 0.5
            x.save(); x.translate(hx, hy); x.rotate(fl * s); x.fillStyle = INK; x.fillRect(-8, -22, 16, 30); x.fillStyle = BONE; x.fillRect(-5, -19, 10, 24); x.restore()
          }
          sparkles(x, t, (rS.x + PLU.x) / 2, PLU.y - 80, T.wave + 0.4, 8, 70, 0.4, [PINK, GOLD])
        }
        // the front: Leo kneeling with the ring box, Aquarius
        const lp = pop01(t, T.cast + 0.15, 0.35, 2.2) * ok
        const ls = leoState(t)
        const rL = drawStarChar(x, LEO.x, LEO.y + (ls.squash || 0) * 110, LEO.size, t, { color: COL('leo'), glyph: signStar('leo').glyph, ...ls, pop: lp, seed: LEO.seed, glow: 0.9, hops: LEO_HOPS })
        drawBits(x, CROWN, CROWN_C, Math.round(rL.x), Math.round(rL.top + 2), 7 * lp, { rot: -0.16 + 0.04 * Math.sin(t * 3) })
        const rA = drawStarChar(x, AQU.x, AQU.y, AQU.size, t, { color: COL('aquarius'), glyph: signStar('aquarius').glyph, ...aquState(t), pop: pop01(t, T.cast + 0.2, 0.35, 2.2) * ok, seed: AQU.seed, glow: 0.9, hops: AQU_HOPS })
        ringBox(t, pop01(t, T.cast + 0.5, 0.35, 2.2) * ok * (1 - prog(t, T.toss[0] - 0.4, T.toss[0])))
        if (t > T.yes && t < T.toss[0]) { floatHearts(x, t, rL.x, rL.top + 10, T.yes, T.toss[0] - 0.5, 1, 5, 80); floatHearts(x, t, rA.x, rA.top + 10, T.yes + 0.2, T.toss[0] - 0.5, 4, 5, 80) }
        sparkles(x, t, (rL.x + rA.x) / 2, rA.y - 40, T.yes, 18, 300, 0.1, [GOLD, PINK, CYAN, BONE])
        confetti(t)
        // the bouquet and the ghost
        ghostCatch(t, ok)
      }
      x.restore()
      drawGaspLines(x, t, { at: T.gasp1, dur: 1.4, x: AQU.x, y: AQU.y, follow: 0.6, cy: 1060, color: COL('aquarius') })
      drawGaspLines(x, t, { at: T.gasp2, dur: 1.6, x: CATCH.x, y: CATCH.y, follow: 0.5, color: PINK })
      drawTitleSting(x, t, { ep: EP, at: T.sting })
      drawNextTime(x, t, { at: T.next, tease: TEASE, dur: NEXT_DUR, y: 660, size: 64, accentSize: 92 })
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 2.42 (sting out → the roof), 28.92 (lesson out → the bouquet), 35.12 (cast out → NEXT TIME).
const CUTS = [{ t: 2.42, kind: 'flip' }, { t: 28.92, kind: 'flip' }, { t: 35.12, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S5 E10' }), cardCuts(CUTS)]

// ── sound (F major; pop / pluck / bell are moved into the film's key by the engine; st5cast writes its brass in KEY)
const NOTE = [698.46, 783.99, 880, 932.33, 1046.5, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...titleStingCues(T.sting, { key: KEY, ep: EP }),
  ...wordPops(T.h0, 2, 0.08, 0, 0.025), ['pop', T.h0Land, 1396.91, 0.045, 0],
  ...BACK_POS.map((m, i) => ['pop', r3(m.at + 0.05), NOTE[i % NOTE.length], 0.022, (m.x - 540) / 700]),
  ['pop', T.cast + 0.2, 698.46, 0.03, -0.3], ['pop', T.cast + 0.3, 880, 0.03, 0.4], ['pop', T.cast + 0.45, 1046.5, 0.035, 0],
  ['whoosh', T.aunties, 0.5, 0.03], ['bell', T.aunties + 0.4, 1760, 0.02, 1.2, 0.5],
  ['pop', T.open, 880, 0.04, 0], ['pop', T.open + 0.06, 1174.66, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LEON]: 659.25, [AQUN]: 880, [AUNN]: 1046.5, [OPHN]: 1174.66, [PLN]: 440, [NARR]: 784 } }),
  ['pluck', T.boxOpen, 1396.91, 0.05, 0.8, 0], ['bell', T.boxOpen + 0.05, 2093, 0.03, 1.6, 0], ['glitter', T.boxOpen, T.boxOpen + 0.6],
  ...twistCues(T.gasp1 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp1 - 0.05),
  ...gaspCues(T.gasp1, { key: KEY }),
  ['crash', T.yes, { gain: 0.06, len: 2.6 }], ['boom', T.yes, 0.22], ['glitter', T.yes, T.yes + 1.4], ['riser', T.yes - 0.6, T.yes, 0.05],
  ['bell', T.yes + 0.05, 1396.91, 0.03, 1.8, -0.3], ['bell', T.yes + 0.2, 1760, 0.03, 1.8, 0.3], ['bell', T.yes + 0.35, 2093, 0.03, 1.8, 0],
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 1396.91, 0.05, 0], ['pop', T.h1Land + 0.1, 1760, 0.045, 0],
  ...wordPops(T.h2, 2, 0.08, 3, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pop', T.h2Land + 0.1, 1396.91, 0.045, 0],
  ['whoosh', T.card[0], 0.6, 0.03], ['pop', T.card[1], 1567.98, 0.045, -0.3], ['glitter', T.card[1], T.card[1] + 0.6],
  ['pluck', T.wave, 1174.66, 0.04, 0.5, 0.4], ['pluck', T.wave + 0.45, 1396.91, 0.04, 0.5, 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 698.46, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...wordPops(T.h3, 2, 0.08, 1, 0.026), ['pop', T.h3Land, 1396.91, 0.05, 0],
  ['whoosh', T.toss[0], 1.2, 0.04], ['riser', T.toss[0], T.catch, 0.05], ['whoosh', T.fly[0], 0.8, 0.035],
  ...twistCues(T.gasp2 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp2 - 0.05),
  ['pop', T.catch, 1760, 0.06, 0], ['glitter', T.catch, T.catch + 0.9],
  ...gaspCues(T.gasp2, { key: KEY }),
  ['bell', T.catch + 1.0, 2093, 0.025, 1.6, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...nextTimeCues(T.next, { key: KEY, tease: TEASE, dur: NEXT_DUR }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
