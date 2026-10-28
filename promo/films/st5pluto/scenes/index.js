// st5pluto (40 s vertical Align ad, Star Talk season 5 "STAR-CROSSED", EP 03) · story 0–35.6, then the shared end card.
//   "The ex who got *demoted*."  Picks up EP 02's cliffhanger: the tiny grey planet watching Scorpio's photos. Pluto rolls
//   in on Taurus and Scorpio's picnic, crown slipping. The astrology stays true: Pluto was reclassified as a dwarf planet
//   in 2006 and it lives out in the Kuiper Belt; in modern astrology it is Scorpio's ruling planet (Mars rules it in the
//   traditional scheme). Pluto is grumpy and hurt, not evil; its redemption comes in EP 09–10.
//   0.00–2.40  title sting: "★ STAR-CROSSED ★ / EPISODE 3".
//   2.50       "The ex who got | *demoted.*"  Taurus and Scorpio on Taurus's quilt with snacks, heart eyes. A pixel road sign
//              (left) reads "KUIPER BELT".  2.9: Pluto rolls in from the left, bouncing, crown slipping. 4.3: gasp zoom on
//              Scorpio.  PLUTO: "I’M STILL A PLANET TO *ME.*"  →  "i’m your ruling planet. come *back.*"
//   9.90       "Taurus | *stands steady.*"  Taurus gets up and plants itself beside Scorpio (thud).
//   11.00      SCORPIO: "you rule my *chart,* not my *choices.*"  12.8: dun · dun · DUNNN, gasp zoom on Pluto (crown falls).
//   14.30      "Pluto | *pouts.*"  THE STARS: "closure is something you *give yourself.*"
//   17.82      ★ LESSON UNLOCKED: "Closure is | *yours* to give."
//   22.60      "Your ex isn’t | your *ruler.*"  Taurus and Scorpio, hearts. Pluto sits with it.  (24.4: the ghost leans out from
//              behind the KUIPER BELT sign's right edge.)
//   26.60      The cliffhanger: Pluto turns away and mutters, in a second box: "fine… but i know a *black hole.*"  A black
//              hole cracks open in the sky behind it; gasp zoom on the hole. Everything is gone by 31.2.
//   31.40–35.6 NEXT TIME ON ★ STAR-CROSSED… ★ "Gemini has | *a twin?!*"  The plain sky at 35.6, end card.
// One canvas (sky + constellation + picnic + cast + st5cast devices), DOM type, two dialogue boxes and the lesson above
// them, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { PLUTO, drawPluto, drawBlackHole, drawBits, drawTitleSting, titleStingCues, drawNextTime, nextTimeCues, gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'

export const DURATION = 40
const EP = 3
const KEY = 'Gm'
const STORY_END = DURATION - ENDCARD_LEN       // 35.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const SCO = signStar('scorpio'), TAU = signStar('taurus')

// ── the timeline
const T = {
  sting: 0,
  h0: 2.5, h0Land: 3.0, h0Out: [9.5, 9.7],
  set: 2.42, cast: 2.5, roll: [2.9, 4.25], gasp1: 4.3,
  open: 4.7, l1: 4.9, l2: 7.6,
  h1: 9.9, h1Land: 10.4, stand: [9.9, 10.5], h1Out: [14.0, 14.2],
  l3: 11.0, gasp2: 12.85,
  h2: 14.3, h2Land: 14.75, l4: 14.35, close: 17.65, h2Out: [17.5, 17.7],
  lesson: 17.82, lessonOut: [22.2, 22.4],
  h3: 22.6, h3Land: 23.2, ghost: 24.4, h3Out: [26.4, 26.6],
  turn: 26.6, open2: 26.85, l5: 27.05, hole: 28.5, gasp3: 29.0, close2: 30.75, out: [30.8, 31.2],
  next: 31.4,
}
const PLN = PLUTO.tag, SCN = '♏ SCORPIO', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: PLN, text: 'I’M STILL A PLANET TO *ME.*', color: PLUTO.tagColor },
  { t: T.l2, speaker: PLN, text: 'i’m your ruling planet. come *back.*', color: PLUTO.tagColor },
  { t: T.l3, speaker: SCN, text: 'you rule my *chart,* not my *choices.*', color: SCO.color },
  { t: T.l4, speaker: NARR, text: 'closure is something you *give yourself.*' },
]
const LINES2 = [{ t: T.l5, speaker: PLN, text: 'fine… but i know a *black hole.*', color: '#c9a6ff' }]
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Closure is | *yours* to give.', accentColor: PINK, dim: 0.55 }
const TEASE = 'Gemini has | *a twin?!*'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

// ── layout
const GROUND = 1330
const SCO0 = { x: 860, y: 1170, size: 270 }
const TAU0 = { x: 630, y: 1200, size: 240 }, TAU1 = { x: 610, y: 1150 }
const PLU = { x0: -160, x1: 290, y: 1190, size: 230 }
const SIGN = { x0: 36, x1: 236, y0: 700, y1: 790, post: 104 }
const HOLE = { x: 380, y: 820, r: 78 }
export const GHOST = { at: T.ghost, x: SIGN.x1, y: 746, where: 'leaning out from behind the right edge of the KUIPER BELT road sign, top left' }

function plutoX(t) {
  const p = prog(t, ...T.roll)
  const base = lerp(PLU.x0, PLU.x1, ease.outCubic(p))
  const back = lerp(0, -40, ease.inOutCubic(prog(t, T.gasp2, T.gasp2 + 0.4)))     // recoils from "not my choices"
  const away = lerp(0, -30, ease.inOutCubic(prog(t, T.turn, T.turn + 0.6)))
  return base + back + away
}
const ROLL_HOPS = [3.15, 3.5, 3.8, 4.05]
function plutoState(t) {
  if (t < T.roll[1]) return { mood: 'grumpy', look: [1, 0], crownSlip: 0.3 + 0.25 * Math.sin(t * 9) }
  if (t < T.l2) return { mood: 'grumpy', look: [1, 0], crownSlip: t > T.l1 + 0.9 ? 0.55 : 0.2 }
  if (t < T.l3) return { mood: 'heart', crownSlip: 0.35 }
  if (t < T.gasp2) return { mood: 'wide', look: [1, 0], blink: false, crownSlip: 0.35 }
  if (t < T.h3) return { mood: 'sad', look: [1, 1], crownSlip: lerp(0.35, 1, ease.inOutCubic(prog(t, T.gasp2, T.gasp2 + 0.5))) }
  if (t < T.turn) return { mood: 'sad', look: [0, 1], crownSlip: 1 }
  if (t < T.hole) return { mood: 'grumpy', look: [-1, 0], crownSlip: lerp(1, 0.2, ease.outCubic(prog(t, T.turn, T.turn + 0.5))) }
  return { mood: 'squint', look: [0, -1], crownSlip: 0.2 }
}
function scoState(t) {
  if (t < T.roll[0] + 0.6) return { mood: 'heart', look: [-1, 0] }
  if (t < T.gasp1) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.l2) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.l3) return { mood: 'eyeroll' }
  if (t < T.gasp2) return { mood: 'squint', look: [-1, 0] }
  if (t < T.h2) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.h3) return { mood: 'happy', look: [-1, 0] }
  return { mood: 'heart', look: [-1, 0] }
}
function tauState(t) {
  if (t < T.roll[0] + 0.6) return { mood: 'heart', look: [1, 0] }
  if (t < T.l2) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.stand[0]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.h3) return { mood: 'neutral', look: [-1, 0] }          // steady
  return { mood: 'heart', look: [1, 0] }
}
const PL_HOPS = [...ROLL_HOPS, ...talkHops(LINES, PLN, { cps: CPS }), T.gasp2, T.turn, ...talkHops(LINES2, PLN, { cps: CPS }), T.gasp3]
const SC_HOPS = [T.cast + 0.35, T.gasp1, ...talkHops(LINES, SCN, { cps: CPS }), T.h3 + 0.1]
const TA_HOPS = [T.cast + 0.3, T.gasp1 + 0.05, T.stand[1] - 0.25, T.h3 + 0.2]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "700 74px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The ex who got | *demoted.*', { top: 190, size: 112, accentSize: 178, at: T.h0, gap: 0.08, accentColor: '#c9c2dc', wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Taurus | *stands steady.*', { top: 190, size: 120, accentSize: 170, at: T.h1, gap: 0.08, accentColor: TAU.color, wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Pluto | *pouts.*', { top: 190, size: 120, accentSize: 184, at: T.h2, gap: 0.08, accentColor: '#c9c2dc', wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'Your ex isn’t | your *ruler.*', { top: 190, size: 112, accentSize: 178, at: T.h3, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1450, width: 960, height: 290, open: T.open2, close: T.close2, cps: CPS })
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
  /** Taurus's quilt (its season-1 blanket cape, spread for a picnic) + the snack bowl */
  function picnic(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = clamp(k)
    const y0 = GROUND - 30, x0 = 440, w = 600, h = 74, P = 6
    x.fillStyle = INK; x.fillRect(x0 - P, y0 - P, w + 2 * P, h + 2 * P)
    for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) { x.fillStyle = (i + j) % 2 ? '#e4577a' : '#f7e6c8'; x.fillRect(x0 + i * 50, y0 + j * 24.6, 50, 24.6) }
    x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(x0, y0 + h - 8, w, 8)
    // snack bowl, front left of the quilt
    const bx = 500, by = y0 - 6
    x.fillStyle = INK; x.fillRect(bx - 50, by - 34, 100, 46); x.fillStyle = '#7fd1ae'; x.fillRect(bx - 44, by - 22, 88, 28); x.fillStyle = '#5fb08e'; x.fillRect(bx - 44, by, 88, 6)
    for (let i = 0; i < 6; i++) { x.fillStyle = ['#f7c948', '#ff8a3a', '#f7e6c8'][i % 3]; x.fillRect(bx - 38 + i * 13, by - 34 + (i % 2) * 5, 12, 12) }
    x.restore()
  }
  /** the road sign Pluto rolls past (the Kuiper Belt is really where Pluto lives) */
  function sign(t, k) {
    if (k <= 0) return
    const { x0, x1, y0, y1, post } = SIGN
    x.save(); x.globalAlpha = clamp(k)
    x.fillStyle = INK; x.fillRect(post - 9, y1, 18, GROUND - y1 - 20); x.fillStyle = '#6a5f8a'; x.fillRect(post - 5, y1, 10, GROUND - y1 - 20)
    step(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12, 6, INK); step(x0, y0, x1 - x0, y1 - y0, 6, '#2f8a5a')
    x.strokeStyle = BONE; x.lineWidth = 3; x.strokeRect(x0 + 9, y0 + 9, x1 - x0 - 18, y1 - y0 - 18)
    x.font = `700 30px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
    x.fillText('KUIPER', (x0 + x1) / 2, y0 + 30); x.fillText('BELT →', (x0 + x1) / 2, y0 + 62)
    x.restore()
  }
  function dust(t, px, py) {
    for (const h of [...ROLL_HOPS, T.roll[1] - 0.05]) {
      const p = prog(t, h, h + 0.5)
      if (p <= 0 || p >= 1) continue
      x.save(); x.globalAlpha = 0.7 * (1 - p)
      for (let i = 0; i < 6; i++) { const a = Math.PI + (i / 5) * Math.PI * 0.9 - 0.2, d = 30 + 60 * ease.outCubic(p); x.fillStyle = i % 2 ? '#cfc6e4' : '#9a90b8'; const s = 14 * (1 - p) + 4; x.fillRect(Math.round(px - 40 + Math.cos(a) * d - s / 2), Math.round(py + 90 + Math.sin(a) * d * 0.4 - s / 2), s, s) }
      x.restore()
    }
  }
  function thud(t, cx, cy) {
    const p = prog(t, T.stand[1] - 0.25, T.stand[1] + 0.35)
    if (p <= 0 || p >= 1) return
    x.save(); x.globalAlpha = 1 - p; x.fillStyle = BONE
    for (const s of [-1, 1]) for (let i = 0; i < 3; i++) x.fillRect(Math.round(cx + s * (110 + 50 * p + i * 22)), Math.round(cy + 10 - i * 18), 14, 6)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const ok = popOut(t, T.out)
      const px = plutoX(t)
      const z1 = gaspZoom(t, { at: T.gasp1, dur: 1.3, x: SCO0.x, y: SCO0.y, amount: 0.4, follow: 0.5 })
      const z2 = gaspZoom(t, { at: T.gasp2, dur: 1.4, x: PLU.x1 - 40, y: PLU.y, amount: 0.4, follow: 0.6, cy: 1150 })
      const z3 = gaspZoom(t, { at: T.gasp3, dur: 1.5, x: HOLE.x, y: HOLE.y, amount: 0.45, follow: 0.6 })
      x.save(); z1.apply(x); z2.apply(x); z3.apply(x)
      if (t >= T.set && ok > 0) {
        const sk = ease.outCubic(prog(t, T.set, T.set + 0.4)) * ok
        // the black hole cracks open behind Pluto (cliffhanger)
        const hk = ease.outCubic(prog(t, T.hole, T.hole + 0.9))
        if (hk > 0) drawBlackHole(x, HOLE.x, HOLE.y, HOLE.r * hk * ok, t, { strength: 0.4 + 0.8 * hk, tilt: 0.38 })
        sign(t, sk)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'left', cell: 3 })
        picnic(t, sk)
        // Taurus (stands up and plants beside Scorpio), Scorpio
        const sp = ease.inOutCubic(prog(t, ...T.stand))
        const tx = lerp(TAU0.x, TAU1.x, sp), ty = lerp(TAU0.y, TAU1.y, sp) - Math.sin(Math.PI * sp) * 40
        const rt = drawStarChar(x, tx, ty, lerp(TAU0.size, 285, sp), t, { color: TAU.color, glyph: TAU.glyph, ...tauState(t), pop: pop01(t, T.cast, 0.4, 2.2) * ok, seed: 21, hops: TA_HOPS, squash: lerp(0.16, -0.03, sp), glow: 0.9 })
        thud(t, rt.x, GROUND - 40)
        const rs = drawStarChar(x, SCO0.x, SCO0.y, SCO0.size, t, { color: SCO.color, glyph: SCO.glyph, ...scoState(t), pop: pop01(t, T.cast + 0.1, 0.4, 2.2) * ok, seed: 81, hops: SC_HOPS, glow: 0.9 })
        if (t < T.roll[0] + 0.6) { floatHearts(t, rt.x, rt.top, T.cast + 0.3, T.roll[0] + 0.3, 2); floatHearts(t, rs.x, rs.top, T.cast + 0.4, T.roll[0] + 0.3, 7) }
        if (t > T.h3) { floatHearts(t, rt.x, rt.top, T.h3 + 0.3, T.out[0], 4); floatHearts(t, rs.x, rs.top, T.h3 + 0.5, T.out[0], 8) }
        // Pluto
        if (t >= T.roll[0]) {
          dust(t, px, PLU.y)
          drawPluto(x, px, PLU.y, PLU.size, t, { ...plutoState(t), hops: PL_HOPS, pop: ok })
        }
      }
      x.restore()
      drawGaspLines(x, t, { at: T.gasp1, dur: 1.3, x: SCO0.x, y: SCO0.y, follow: 0.5, color: SCO.color })
      drawGaspLines(x, t, { at: T.gasp2, dur: 1.4, x: PLU.x1 - 40, y: PLU.y, follow: 0.6, cy: 1150, color: '#c9c2dc' })
      drawGaspLines(x, t, { at: T.gasp3, dur: 1.5, x: HOLE.x, y: HOLE.y, follow: 0.6, color: '#b46cff' })
      drawTitleSting(x, t, { ep: EP, at: T.sting })
      drawNextTime(x, t, { at: T.next, tease: TEASE, y: 760, size: 84, accentSize: 132 })
      box.update(t)
      box2.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 2.42 (sting out → the picnic), 22.42 (lesson out → your ex isn't your ruler), 31.3 (→ NEXT TIME).
const CUTS = [{ t: 2.42, kind: 'flip' }, { t: 22.42, kind: 'flip' }, { t: 31.3, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S5 E03' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine; st5cast writes its brass in KEY)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...titleStingCues(T.sting, { key: KEY, ep: EP }),
  ...wordPops(T.h0, 3, 0.08, 0, 0.025), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['tick', T.set, 0.05], ['pop', r3(T.cast + 0.05), 739.99, 0.03, 0.2], ['pop', r3(T.cast + 0.15), 880, 0.03, 0.5],
  ['whoosh', T.roll[0], 0.8, 0.04],
  ...ROLL_HOPS.map((h, i) => ['tom', r3(h + 0.3), 90 - i * 6, { gain: 0.16, decay: 0.25 }]),
  ['tick', T.roll[1] - 0.05, 0.08],
  ...gaspCues(T.gasp1, { key: KEY }),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [PLN]: 392, [SCN]: 659.25, [NARR]: 784 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [PLN]: 349.23 } }),
  ['bell', T.l2 + 1.6, 1567.98, 0.02, 1.0, -0.3],
  ...wordPops(T.h1, 1, 0.08, 1, 0.026), ['pop', T.h1Land, 1318.51, 0.05, 0],
  ['tom', r3(T.stand[1] - 0.25), 70, { gain: 0.3, decay: 0.5 }], ['boom', r3(T.stand[1] - 0.25), 0.18],
  ...twistCues(T.gasp2 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp2 - 0.05),
  ...gaspCues(T.gasp2, { key: KEY }),
  ...wordPops(T.h2, 1, 0.08, 3, 0.026), ['pop', T.h2Land, 587.33, 0.05, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...wordPops(T.h3, 3, 0.08, 2, 0.026), ['pop', T.h3Land, 1174.66, 0.05, 0], ['pluck', T.h3Land, 1174.66, 0.04, 0.6, 0.3],
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.open2, 587.33, 0.035, 0], ['pop', T.open2 + 0.06, 493.88, 0.03, 0],
  ['riser', T.hole - 0.2, T.gasp3, 0.06],
  ...twistCues(T.gasp3 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp3 - 0.05),
  ...gaspCues(T.gasp3, { key: KEY }),
  ['pop', T.close2, 880, 0.03, 0], ['whoosh', T.out[0], 0.35, 0.03],
  ...nextTimeCues(T.next, { key: KEY, tease: TEASE }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
