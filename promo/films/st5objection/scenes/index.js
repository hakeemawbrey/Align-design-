// st5objection (40 s vertical Align ad, Star Talk season 5 "STAR-CROSSED", EP 07) · story 0–35.6, then the shared end card.
//   "The *proposal*… interrupted."  Leo got the ring box back (EP 06's last page) and kneels on a Houston rooftop at night
//   in front of Aquarius. Ophiuchus bursts in: "I OBJECT!" Everyone points out it isn't a wedding. Saturn reads the
//   rulebook: nobody gets a vote on a couple except the couple. Saturn is kind to Ophiuchus too (lonely, not evil; its
//   redemption is EP 08). Aquarius moves to Leo's side. Then, before Aquarius can answer, the sky starts swirling.
//   0.00–2.40  title sting: "★ STAR-CROSSED ★ / EPISODE 7".
//   2.50       "The | *proposal.*"  Houston skyline, a rooftop at night. Leo kneels (crown askew) and opens the ring box;
//              Aquarius (headphones) goes heart-eyed; Saturn (rulebook) and Virgo watch. Pink rooftop fairy lights.
//              LEO: "found the ring. long story. *Aquarius…*"  LEO: "will you—"
//   burst      A glitter streak from the sky: Ophiuchus lands, staff up. "I | *OBJECT!*"  Gasp zoom on Leo and Aquarius.
//              OPHIUCHUS: "I OBJECT!"  EVERYONE: "…it’s not a *wedding.*"  OPHIUCHUS: "…oh." (it droops)
//              "Saturn checks | the *rulebook.*"  SATURN: "nobody gets a vote on a couple except the *couple.*"
//              Aquarius slides over to Leo's side, a pixel heart pops between them.
//              SATURN (to Ophiuchus, gently): "you can still *cheer,* though."  (Ghost: rises over the lid of the
//              rooftop water tower, far right.)
//   lesson     ★ LESSON UNLOCKED: "Only two | *votes* count."
//   last       "Your love, | your *call.*"  Aquarius opens its mouth to answer ("…" bubble)… and the sky starts to
//              swirl. Everyone looks up. dun-dun-DUNN, gasp zoom on the swirl.
//   NEXT TIME  "Who *is* | Ophiuchus?"  The plain sky at 35.6, end card.
// One canvas (sky + constellation + skyline + rooftop + cast + st5cast devices), DOM type, the dialogue box and the lesson
// above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'
import { OPH, SATURN, drawOphiuchus, drawSaturn, drawBits, drawTitleSting, titleStingCues, drawNextTime, nextTimeCues, gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'

export const DURATION = 40
const EP = 7
const KEY = 'Gm'
const STORY_END = DURATION - ENDCARD_LEN       // 35.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const CPS = 27
const LEO_C = signStar('leo').color, AQU_C = signStar('aquarius').color

// ── the dialogue, chained so every line holds ≥ 1.5 s after it finishes typing
const LEON = '♌ LEO', OPHN = OPH.tag, ALL = '★ EVERYONE', SATN = SATURN.tag
const SPEC = [
  ['l1', 3.2, LEON, 'found the ring. long story. *Aquarius…*', LEO_C],
  ['l2', null, LEON, 'will you—', LEO_C],
  ['l3', null, OPHN, 'I OBJECT!', OPH.tagColor],
  ['l4', null, ALL, '…it’s not a *wedding.*'],
  ['l5', null, OPHN, '…oh.', OPH.tagColor],
  ['l6', null, SATN, 'nobody gets a vote on a couple except the *couple.*', SATURN.tagColor],
  ['l7', null, SATN, 'you can still *cheer,* though.', SATURN.tagColor],
]
const LINES = [], LT = []
for (const [, t0, speaker, text, color] of SPEC) {
  const t = t0 ?? +(LT[LT.length - 1].done + 1.85).toFixed(2)
  LINES.push({ t, speaker, text, ...(color ? { color } : {}) })
  LT.push(lineTimes([{ t, text }], { cps: CPS })[0])
}
export const LINES_ALL = LINES
const L = Object.fromEntries(SPEC.map(([k], i) => [k, LINES[i].t]))
const DONE = Object.fromEntries(SPEC.map(([k], i) => [k, LT[i].done]))

const LESSON_TEXT = 'Only two | *votes* count.'
const T = {
  sting: 0,
  h0: 2.5, h0Land: 2.95,
  cast: 2.5, open: 3.0, boxOpen: DONE.l1 - 0.6,
  burst: DONE.l2 + 0.3,
}
T.h0Out = [T.burst - 0.2, T.burst]
T.land = T.burst + 0.4; T.h1 = T.burst + 0.05; T.h1Land = T.burst + 0.35; T.gasp1 = T.burst + 0.42
T.droop = DONE.l5 - 0.1
T.h1Out = [L.l5 - 0.2, L.l5]
T.h2 = L.l5 + 0.1; T.h2Land = T.h2 + 0.5
T.slide = [DONE.l6 - 0.4, DONE.l6 + 0.4]; T.heart = DONE.l6 + 0.4
T.cheer = DONE.l7 + 0.1; T.ghost = L.l7 + 0.2
T.close = +(DONE.l7 + 1.7).toFixed(2); T.h2Out = [T.close - 0.2, T.close]
T.lesson = +(T.close + 0.15).toFixed(2)
const LESSON_END = lessonTimes({ at: T.lesson, text: LESSON_TEXT }).end
T.lessonOut = [+(LESSON_END + 2.5).toFixed(2), +(LESSON_END + 2.7).toFixed(2)]
T.h3 = T.lessonOut[1] + 0.05; T.h3Land = T.h3 + 0.5
T.dots = T.h3 + 0.9; T.swirl = [T.h3 + 1.4, T.h3 + 3.8]; T.lookUp = T.h3 + 1.7; T.gasp2 = T.h3 + 2.3
T.out = [30.55, 30.95]; T.h3Out = [30.6, 30.8]; T.next = 31.2
export const TIMES = T
const LESSON = { at: T.lesson, out: T.lessonOut, text: LESSON_TEXT, accentColor: PINK, dim: 0.55 }
const TEASE = 'Who *is* | Ophiuchus?'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }

// ── layout
const LEDGE = 1336
const SAT0 = { x: 172, y: 1150, size: 300 }
const LEO = { x: 430, y: 1262, size: 232, seed: 81 }
const AQU = { x: 735, y: 1236, size: 232, seed: 82 }, AQU_SLIDE = { x: 640, y: 1236 }
const VIR = { x: 900, y: 1266, size: 160, seed: 83 }
const OPH0 = { x: 850, y: 1000, size: 270 }
const RING = { x: 560, y: 1196 }
const TANK = { x0: 978, x1: 1080, y0: 1046, y1: LEDGE }
const SWIRL = { x: 560, y: 720 }
export const GHOST = { at: T.ghost, x: 1036, y: TANK.y0, where: 'rising over the lid of the rooftop water tower, far right, behind Ophiuchus’s staff' }

function leoState(t) {
  if (t < T.boxOpen) return { mood: 'neutral', look: [1, -1] }
  if (t < T.burst) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.gasp1 + 1.3) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < L.l4) return { mood: 'squint', look: [1, -1] }
  if (t < T.heart) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.lookUp) return { mood: 'heart' }
  return { mood: 'wide', look: [1, -1], blink: false }
}
function aquState(t) {
  if (t < T.boxOpen) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.burst) return { mood: 'heart' }
  if (t < T.gasp1 + 1.3) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < L.l5) return { mood: 'eyeroll' }
  if (t < T.slide[0]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.dots) return { mood: 'heart' }
  if (t < T.lookUp) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'wide', look: [0, -1], blink: false }
}
function virState(t) {
  if (t < T.burst) return { mood: 'happy', look: [-1, 0] }
  if (t < T.gasp1 + 1.3) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < L.l5) return { mood: 'squint', look: [0, -1] }
  if (t < T.lookUp) return { mood: t > T.heart ? 'heart' : 'neutral', look: [-1, 0] }
  return { mood: 'wide', look: [-1, -1], blink: false }
}
function ophState(t) {
  if (t < L.l4) return { mood: 'wide', look: [-1, 1], snake: 'wide', glitter: 1 }
  if (t < T.droop) return { mood: 'neutral', look: [-1, 1], glitter: 0.6 }
  if (t < T.cheer) return { mood: 'sleepy', look: [0, 1], snake: 'sleepy', glitter: 0.15, zzz: false }
  if (t < T.lookUp) return { mood: 'happy', snake: 'heart', glitter: 0.5 }
  return { mood: 'wide', look: [-1, -1], snake: 'wide', glitter: 0.4, blink: false }
}
function saturnState(t) {
  if (t < T.burst) return { mood: 'happy', look: [1, 0] }
  if (t < L.l4) return { mood: 'wide', look: [1, -1] }
  if (t < L.l6) return { mood: 'squint', look: [1, 0] }
  if (t < L.l7) return { mood: 'neutral', look: [0, 1] }
  if (t < T.lookUp) return { mood: 'happy', look: [1, -1] }
  return { mood: 'wide', look: [1, -1] }
}
const LEO_HOPS = [T.cast + 0.3, ...talkHops(LINES, LEON, { cps: CPS }), T.burst + 0.1, T.heart]
const OPH_HOPS = [T.land, ...talkHops(LINES, OPHN, { cps: CPS }), T.cheer, T.lookUp]
const SAT_HOPS = [T.cast + 0.4, ...talkHops(LINES, SATN, { cps: CPS }), T.burst + 0.15]
const ALL_HOPS = talkHops(LINES, ALL, { cps: CPS })

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 74px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The | *proposal.*', { top: 190, size: 120, accentSize: 190, at: T.h0, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'I | *OBJECT!*', { top: 190, size: 130, accentSize: 200, at: T.h1, accentColor: OPH.teal, wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Saturn checks | the *rulebook.*', { top: 190, size: 104, accentSize: 168, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'Your love, | your *call.*', { top: 190, size: 116, accentSize: 184, at: T.h3, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#05040c' }, root)

  // ── Houston at night: the skyline, string lights, the ledge, the water tower
  const TOWERS = [[60, 80, 120], [150, 70, 190], [240, 90, 150], [330, 60, 250], [420, 84, 205], [520, 66, 290], [600, 92, 230], [700, 60, 175], [790, 86, 265], [880, 64, 200], [970, 90, 150], [1050, 60, 220]]
  function skyline(t) {
    for (const [cx, w, h] of TOWERS) {
      x.fillStyle = '#160f36'; x.fillRect(cx - w / 2, LEDGE - h, w, h)
      x.fillStyle = 'rgba(201,166,255,0.14)'; x.fillRect(cx - w / 2, LEDGE - h, 4, h)
      for (let j = 16; j < h - 10; j += 24) for (let i = 10; i < w - 10; i += 18) {
        if (((cx * 7 + i * 13 + j * 3) % 11) >= 4) continue
        x.fillStyle = ((i + j + Math.floor(t * 0.6)) % 5) ? 'rgba(242,199,92,0.45)' : 'rgba(255,240,200,0.8)'
        x.fillRect(cx - w / 2 + i, LEDGE - h + j, 6, 8)
      }
    }
  }
  function ledge(t) {
    x.fillStyle = INK; x.fillRect(0, LEDGE - 6, 1080, 1920 - LEDGE + 6)
    x.fillStyle = '#4a4266'; x.fillRect(0, LEDGE, 1080, 30)
    x.fillStyle = '#6a6290'; x.fillRect(0, LEDGE, 1080, 6)
    x.fillStyle = '#2b2448'; for (let i = 0; i < 1080; i += 72) x.fillRect(i, LEDGE + 10, 4, 18)
    const g = x.createLinearGradient(0, LEDGE + 30, 0, 1920); g.addColorStop(0, '#231c40'); g.addColorStop(1, '#0d0920')
    x.fillStyle = g; x.fillRect(0, LEDGE + 30, 1080, 1920 - LEDGE - 30)
    // string lights draped along the ledge
    for (let i = 0; i < 18; i++) {
      const px = 30 + i * 60, py = LEDGE + 44 + Math.sin(i * 0.9) * 4 + 10 * Math.sin(Math.PI * ((i % 6) / 6))
      const on = (Math.floor(t * 2 + i) % 3) !== 0
      x.fillStyle = INK; x.fillRect(px - 7, py - 7, 14, 14)
      x.fillStyle = on ? [PINK, GOLD, '#fff1c8'][i % 3] : '#5a4a70'; x.fillRect(px - 5, py - 5, 10, 10)
    }
  }
  function tower() {
    const { x0, x1, y0, y1 } = TANK
    x.fillStyle = INK; x.fillRect(x0 + 10, y0 + 120, 8, y1 - y0 - 120); x.fillRect(x1 - 18, y0 + 120, 8, y1 - y0 - 120)
    x.fillRect(x0 + 10, y0 + 190, x1 - x0 - 20, 6)
    x.fillRect(x0 - 4, y0 + 20, x1 - x0 + 8, 108); x.fillRect(x0 + 6, y0 - 4, x1 - x0 - 12, 28)
    x.fillStyle = '#6b4a3a'; x.fillRect(x0, y0 + 24, x1 - x0, 100)
    x.fillStyle = '#82604c'; for (let i = x0 + 6; i < x1; i += 18) x.fillRect(i, y0 + 24, 6, 100)
    x.fillStyle = '#4a4266'; x.fillRect(x0 + 10, y0, x1 - x0 - 20, 22)
    x.fillStyle = '#2b1e18'; x.fillRect(x0, y0 + 56, x1 - x0, 6); x.fillRect(x0, y0 + 98, x1 - x0, 6)
  }

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  /** the ring box, held out in front of Leo; the lid pops open */
  function ringBox(t, a) {
    if (a <= 0.01) return
    const op = easeOutBack(prog(t, T.boxOpen, T.boxOpen + 0.3), 2), bx = RING.x, by = RING.y + Math.sin(t * 2.2) * 3
    x.save(); x.globalAlpha *= a; x.translate(Math.round(bx), Math.round(by)); x.scale(1.3, 1.3)
    if (op > 0.05) {
      glow(0, -50, 120 * op, '#bff3ff', 0.7)
      x.fillStyle = INK; x.fillRect(-32, -40 - 38 * op, 64, 38 * op + 2)
      x.fillStyle = '#7a1838'; x.fillRect(-30, -38 - 34 * op, 60, 34 * op)
    }
    x.fillStyle = INK; x.fillRect(-34, -40, 68, 40)
    x.fillStyle = '#b8264f'; x.fillRect(-30, -36, 60, 32); x.fillStyle = '#e04a72'; x.fillRect(-30, -36, 60, 5)
    if (op > 0.05) {
      x.fillStyle = '#3b0c1e'; x.fillRect(-22, -40, 44, 6)
      x.fillStyle = '#f7c948'; x.fillRect(-12, -58, 24, 4); x.fillRect(-12, -44, 24, 4); x.fillRect(-16, -54, 4, 10); x.fillRect(12, -54, 4, 10)
      x.fillStyle = '#bff3ff'; x.fillRect(-6, -68, 12, 10); x.fillStyle = '#ffffff'; x.fillRect(-4, -66, 4, 4)
    } else { x.fillStyle = '#7a1838'; x.fillRect(-30, -52, 60, 14); x.fillStyle = INK; x.fillRect(-32, -54, 64, 3) }
    x.restore()
    const tw = (Math.sin(t * 5.3) + 1) / 2
    if (op > 0.5 && tw > 0.55) { x.save(); x.globalAlpha = a * (tw - 0.55) * 2.2; drawPixelStar(x, bx + 2, by - 84, 30, 1, '#ffffff'); x.restore() }
  }
  /** Aquarius's pink headphones (staraqua), over the head: band along a half ellipse, a cup on each side */
  function headphones(r) {
    const s = r.size, c = Math.max(4, Math.round(s / 30)), cupY = r.y - s * 0.06, cupX = s * 0.4, ry = -s * 0.44
    for (const [col, q] of [[INK, 1.5], ['#3a2a6e', 1]]) for (let i = 0; i <= 26; i++) {
      const a = Math.PI * i / 26, bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry
      x.fillStyle = col; x.fillRect(Math.round(bx - c * q), Math.round(by - c * q), c * 2 * q, c * 2 * q)
    }
    for (const sd of [-1, 1]) {
      const cx = r.x + sd * cupX, w = c * 5, h = c * 8
      x.fillStyle = INK; x.fillRect(Math.round(cx - w / 2 - c), Math.round(cupY - h / 2 - c), w + 2 * c, h + 2 * c)
      x.fillStyle = '#ff4fd8'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), w, h)
      x.fillStyle = '#ffb3f0'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), c, h)
      x.fillStyle = '#b02a98'; x.fillRect(Math.round(cx + w / 2 - c), Math.round(cupY - h / 2), c, h)
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV], dur = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1, seed) {
    for (let i = 0; i < 3; i++) {
      const born = t0 + ((i * 0.41 + seed * 0.13) % 1.2), life = 1.3
      for (let b = born; b < t1; b += 1.4) {
        if (t < b || t > b + life) continue
        const p = (t - b) / life, side = ((i * 37 + seed) % 7) / 6 - 0.5
        drawBits(x, HEART, HEART_C, Math.round(cx + side * 70 + Math.sin(p * 7 + i) * 8), Math.round(cy - 20 - p * 120), 4, { alpha: Math.sin(Math.PI * p) })
      }
    }
  }
  /** the swirl in the sky: pixel dashes wheeling in on a point, growing */
  function swirl(t) {
    const p = prog(t, ...T.swirl)
    if (p <= 0) return
    const R = lerp(70, 380, ease.outCubic(p)), k = clamp(p * 3)
    glow(SWIRL.x, SWIRL.y, R * 1.4, '#9a4ae8', 1.3 * k)
    x.save()
    for (let arm = 0; arm < 5; arm++) for (let i = 0; i < 34; i++) {
      const u = i / 34, a = arm * Math.PI * 2 / 5 + u * 5.2 - t * 2.6, d = R * (1 - u) + 12
      x.globalAlpha = k * (0.35 + 0.65 * (1 - u))
      const q = Math.max(5, Math.round(18 * (1 - u)))
      x.fillStyle = [LAV, '#7a3ad0', BONE, OPH.violet][(arm + i) % 4]
      x.fillRect(Math.round(SWIRL.x + Math.cos(a) * d - q / 2), Math.round(SWIRL.y + Math.sin(a) * d * 0.8 - q / 2), q, q)
    }
    x.restore()
  }
  /** a little pixel speech bubble with "…" over Aquarius: it was about to answer */
  function dotsBubble(t, bx, by) {
    const k = pop01(t, T.dots, 0.3, 2.2) * (1 - ease.inQuad(prog(t, T.lookUp + 0.4, T.lookUp + 0.7)))
    if (k <= 0.01) return
    x.save(); x.translate(bx, by); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-64, -40, 128, 72); x.fillRect(-14, 30, 20, 16)
    x.fillStyle = '#fff6ea'; x.fillRect(-58, -34, 116, 60); x.fillRect(-10, 26, 12, 12)
    x.fillStyle = INK; for (let i = 0; i < 3; i++) if ((t - T.dots) * 4 > i) x.fillRect(-34 + i * 26, -8, 14, 14)
    x.restore()
  }
  function pill(label, col, px, py, k) {
    if (k <= 0.01) return
    x.save(); x.translate(px, py); x.scale(k, k)
    x.font = `700 28px ${MONO}`; x.letterSpacing = '4px'; const tw = x.measureText(label).width
    const pw = tw + 40, ph = 52
    x.fillStyle = 'rgba(20,12,44,0.92)'; x.beginPath(); x.roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2); x.fill()
    x.lineWidth = 3; x.strokeStyle = rgba(col, 0.9); x.stroke()
    x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 2, 2); x.letterSpacing = '0px'
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const ok = popOut(t, T.out)
      const z1 = gaspZoom(t, { at: T.gasp1, dur: 1.3, x: 540, y: 1230, amount: 0.3, follow: 0.4, cy: 1150 })
      const z2 = gaspZoom(t, { at: T.gasp2, dur: 1.5, x: SWIRL.x, y: SWIRL.y + 100, amount: 0.35, follow: 0.5, cy: 900 })
      x.save(); z1.apply(x); z2.apply(x)
      if (t >= T.cast - 0.05 && ok > 0) {
        const fa = clamp(prog(t, T.cast - 0.05, T.cast + 0.35)) * clamp(ok)
        swirl(t)
        x.save(); x.globalAlpha = fa; skyline(t); tower(); x.restore()
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        x.save(); x.globalAlpha = fa; ledge(t); x.restore()
        // Saturn with the rulebook (a RULEBOOK pill while it reads)
        const rS = drawSaturn(x, SAT0.x, SAT0.y, SAT0.size, t, { ...saturnState(t), prop: 'book', pop: pop01(t, T.cast + 0.15, 0.4, 2.2) * ok, hops: SAT_HOPS })
        pill('RULEBOOK', GOLD, SAT0.x + 10, rS.top - 40, pop01(t, T.h2 + 0.2, 0.3, 2.2) * (1 - ease.inQuad(prog(t, T.close - 0.3, T.close))))
        // Virgo, watching
        const vs = signStar('virgo')
        drawStarChar(x, VIR.x, VIR.y, VIR.size, t, { color: vs.color, glyph: vs.glyph, ...virState(t), pop: pop01(t, T.cast + 0.3, 0.35, 2.2) * ok, seed: VIR.seed, glow: 0.8, hops: [T.cast + 0.6, ...ALL_HOPS, T.gasp1, T.heart] })
        // Aquarius: slides over to Leo's side
        const sl = ease.inOutCubic(prog(t, ...T.slide)), ax = lerp(AQU.x, AQU_SLIDE.x, sl), ay = AQU.y - Math.sin(Math.PI * sl) * 40
        const as = signStar('aquarius')
        const rA = drawStarChar(x, ax, ay, AQU.size, t, { color: as.color, glyph: as.glyph, ...aquState(t), pop: pop01(t, T.cast + 0.2, 0.35, 2.2) * ok, seed: AQU.seed, glow: 0.9, hops: [T.cast + 0.5, T.burst + 0.1, ...ALL_HOPS, T.slide[1], T.lookUp] })
        if (rA.size > 20 && t > T.cast + 0.25) headphones(rA)
        if (aquState(t).mood === 'heart') floatHearts(t, rA.x, rA.top + 10, T.boxOpen, T.burst - 0.2, 5)
        // Leo, kneeling (squashed, tilted toward Aquarius), crown askew
        const ls = signStar('leo'), pl = pop01(t, T.cast, 0.35, 2.2) * ok
        const stand = ease.inOutCubic(prog(t, T.slide[0], T.slide[1]))
        x.save(); x.translate(LEO.x, LEO.y + 80); x.rotate(lerp(0.14, 0.04, stand)); x.translate(-LEO.x, -LEO.y - 80)
        const rL = drawStarChar(x, LEO.x, LEO.y - stand * 20, LEO.size, t, { color: ls.color, glyph: ls.glyph, ...leoState(t), squash: lerp(0.16, 0.02, stand), pop: pl, seed: LEO.seed, glow: 0.9, hops: LEO_HOPS })
        drawBits(x, CROWN, CROWN_C, Math.round(rL.x + 8), Math.round(rL.top + 4), 6 * pl, { rot: -0.3 + 0.05 * Math.sin(t * 3) })
        x.restore()
        ringBox(t, pl)
        // the heart between them once Aquarius is at Leo's side
        const hk = pop01(t, T.heart, 0.35, 2.6)
        if (hk > 0.01 && t < T.lookUp + 0.3) { const hx = (rL.x + rA.x) / 2, hy = Math.min(rL.y, rA.y) - 70 + Math.sin(t * 3) * 6; drawBits(x, HEART, HEART_C, Math.round(hx), Math.round(hy), 10 * hk * (1 + 0.08 * Math.sin(t * 9))) }
        sparkles(t, (rL.x + rA.x) / 2, Math.min(rL.y, rA.y) - 70, T.heart, 12, 140, 0.3, [PINK, '#ff4f86', GOLD, BONE])
        dotsBubble(t, rA.x + 70, rA.top - 40)
        // Ophiuchus: a glitter streak out of the sky, a landing burst
        if (t >= T.burst) {
          const fl = ease.inCubic(prog(t, T.burst, T.land))
          const ox = lerp(1260, OPH0.x, fl), oy = lerp(260, OPH0.y, fl)
          if (fl < 1) for (let i = 0; i < 18; i++) {
            const kk = Math.max(0, fl - i * 0.03), tx = lerp(1260, OPH0.x, kk), ty = lerp(260, OPH0.y, kk)
            x.save(); x.globalAlpha = (1 - i / 18) * 0.9; x.fillStyle = [OPH.teal, OPH.violet, PINK, GOLD][i % 4]; const q = Math.max(4, 22 - i)
            x.fillRect(Math.round(tx - q / 2), Math.round(ty - q / 2), q, q); x.restore()
          }
          const po = fl >= 1 ? 1 : 0.6 + 0.4 * fl
          const sOph = ophState(t)
          const sq = t < T.droop ? 0 : 0.1 * ease.outCubic(prog(t, T.droop, T.droop + 0.4)) * (t < T.cheer ? 1 : 1 - ease.outCubic(prog(t, T.cheer, T.cheer + 0.4)))
          const fade = 1 - 0.75 * clamp(prog(t, T.lesson, T.lesson + 0.35)) * (1 - clamp(prog(t, ...T.lessonOut)))      // out of the lesson's way
          drawOphiuchus(x, ox, oy, OPH0.size, t, { ...sOph, pop: po * ok, hops: OPH_HOPS, squash: sq, side: 1, alpha: fade })
          sparkles(t, OPH0.x, OPH0.y, T.land, 16, 230, 0.4, [OPH.teal, OPH.violet, PINK, GOLD])
          sparkles(t, OPH0.x, OPH0.y, T.cheer, 10, 160, 1.1, [PINK, GOLD, BONE])
        }
      }
      x.restore()
      drawGaspLines(x, t, { at: T.gasp1, dur: 1.3, x: 540, y: 1230, follow: 0.4, cy: 1150, color: OPH.teal })
      drawGaspLines(x, t, { at: T.gasp2, dur: 1.5, x: SWIRL.x, y: SWIRL.y + 100, follow: 0.5, cy: 900, color: LAV })
      // the landing flash
      const fl = prog(t, T.land - 0.02, T.land + 0.35)
      if (fl > 0 && fl < 1) { x.save(); x.globalAlpha = (fl < 0.1 ? fl / 0.1 : 1 - ease.outQuad((fl - 0.1) / 0.9)) * 0.75; x.fillStyle = '#e8fbff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      drawTitleSting(x, t, { ep: EP, at: T.sting })
      drawNextTime(x, t, { at: T.next, tease: TEASE, y: 760, size: 70, accentSize: 100 })
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 2.42 (sting out → the rooftop), the lesson out → the last line, the cast out → NEXT TIME.
// cardfx keeps the middle one.
const CUTS = [{ t: 2.42, kind: 'flip' }, { t: +(T.lessonOut[1] - 0.02).toFixed(2), kind: 'flip' }, { t: +(T.out[1] + 0.1).toFixed(2), kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S5 E07' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine; st5cast writes its brass in KEY)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...titleStingCues(T.sting, { key: KEY, ep: EP }),
  ...wordPops(T.h0, 1, 0.08, 0, 0.025), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land, 1174.66, 0.04, 0.6, 0],
  ['pop', T.cast + 0.05, 587.33, 0.03, -0.4], ['pop', T.cast + 0.2, 739.99, 0.03, 0.3], ['pop', T.cast + 0.3, 880, 0.03, 0.6], ['pop', T.cast + 0.15, 523.25, 0.03, -0.7],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LEON]: 659.25, [OPHN]: 1046.5, [ALL]: 784, [SATN]: 520 } }),
  ['pluck', T.boxOpen, 1318.51, 0.045, 0.6, -0.1], ['bell', T.boxOpen + 0.05, 2093, 0.03, 1.6, 0], ['glitter', T.boxOpen, T.boxOpen + 0.6],
  // the burst: a riser into the glitter streak, the landing slam
  ['riser', T.burst - 0.6, T.land, 0.06], ['glitter', T.burst, T.land + 0.6], ['whoosh', T.burst, 0.4, 0.05],
  ['boom', T.land, 0.3], ['crash', T.land, { gain: 0.06, len: 2.2 }], ['tick', T.land, 0.1],
  ...wordPops(T.h1, 1, 0.08, 2, 0.03), ['pop', T.h1Land, 1318.51, 0.055, 0],
  ...gaspCues(T.gasp1, { key: KEY }),
  ['pop', T.droop, 392, 0.035, 0.3], ['pop', T.droop + 0.15, 330, 0.03, 0.3],
  ...wordPops(T.h2, 2, 0.08, 3, 0.026), ['pop', T.h2Land, 880, 0.05, 0], ['tom', T.h2 + 0.2, 98, { gain: 0.16, decay: 0.3 }],
  ['whoosh', T.slide[0], 0.35, 0.03], ['pop', T.heart, 1174.66, 0.05, 0], ['bell', T.heart + 0.05, 1760, 0.03, 1.4, 0],
  ['pop', T.cheer, 1318.51, 0.04, 0.4], ['glitter', T.cheer, T.cheer + 0.5],
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...wordPops(T.h3, 3, 0.08, 2, 0.026), ['pop', T.h3Land, 1174.66, 0.05, 0],
  ['tick', T.dots, 0.03], ['tick', T.dots + 0.25, 0.03], ['tick', T.dots + 0.5, 0.03],
  ['riser', T.swirl[0], T.gasp2, 0.06], ['whoosh', T.swirl[0] + 0.3, 0.9, 0.04],
  ...twistCues(T.gasp2 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp2 - 0.05),
  ...gaspCues(T.gasp2, { key: KEY }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...nextTimeCues(T.next, { key: KEY, tease: TEASE }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
