// st5eclipse (40 s vertical Align ad, Star Talk season 5 "STAR-CROSSED", EP 05) · story 0–35.6, then the shared end card.
//   "The Sun and the Moon have a *secret*."  A total solar eclipse over a Houston rooftop. The astronomy stays true: the
//   Moon and the Sun look the same size from Earth, so when the Moon passes exactly in front of the Sun it covers it, the
//   pearly corona and the pink prominences at the rim show, the horizon glows like sunset all the way round, and it is
//   safe to take the eclipse glasses off only during totality. The diamond ring flashes at the edge as it ends. Sunday
//   is named for the Sun and Monday for the Moon.
//   0.00–2.40  title sting: "★ STAR-CROSSED ★ / EPISODE 5".
//   2.45       "The Sun and the Moon | have a *secret.*"  Virgo, Leo, Aquarius and Pisces watch from the rooftop ledge in
//              pixel eclipse glasses; Leo's ring box sits on the ledge beside it (the proposal plan from EP 04).
//              THE STARS: "total eclipse: the Moon slides right in front of the *Sun.*"  LEO: "perfect lighting for a
//              *big question.*"  The Moon slides across; the Sun watches it come, sparkly-eyed.
//   totality   Everything goes dark, the glasses go up, the corona blooms. Gasp zoom on the four. "Wait… are they |
//              *blushing?*" (the prominences flush pink, a corona of hearts). MOON: "we only see each other at
//              *eclipses.*"  In the dark, a glint of teal-violet glitter lifts the ring box off the ledge (blink and you
//              miss it).  SUN: "what if we didn't *wait?*"  dun-dun-DUNN, gasp zoom on the Moon (heart eyes).
//              "Sun-day. | *Moon-day.*"  A week calendar: MOON: "sundays?" (♥ on S) SUN: "and *mondays.*" (♥ on M)
//              THE STARS: "love doesn't run on rare events. put it on the *calendar.*"  (Ghost: rises over the ledge, right.)
//   lesson     ★ LESSON UNLOCKED: "Love needs a | *schedule.*"
//   last       "Don't wait for | an *eclipse.*"  The Moon slides on, the diamond ring flashes, the light comes back… Leo
//              looks down: the ring box is gone. Gasp zoom on Leo. Everything pops out.
//   NEXT TIME  "Retro forgets | *everything.*"  The plain sky at 35.6, end card.
// One canvas (sky + constellation + skyline + eclipse + cast), DOM type, the dialogue box and the lesson above it,
// grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'
import { OPH, drawBits, drawTitleSting, titleStingCues, drawNextTime, nextTimeCues, gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'

export const DURATION = 40
const EP = 5
const KEY = 'Eb'
const STORY_END = DURATION - ENDCARD_LEN       // 35.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9b8ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SUNC = '#ffcf4a', MOONC = '#e9e4ff'
const CPS = 26                                    // dreamy: a touch slower

// ── the dialogue, chained so every line holds ≥ 1.5 s after it finishes typing
const NARR = 'THE STARS', LEON = '♌ LEO', MOONN = '☽ THE MOON', SUNN = '☉ THE SUN'
const SPEC = [
  ['l1', 3.2, NARR, 'total eclipse: the Moon slides right in front of the *Sun.*'],
  ['l2', null, LEON, 'perfect lighting for a *big question.*', signStar('leo').color],
  ['l3', 10.15, MOONN, 'we only see each other at *eclipses.*', MOONC],
  ['l4', null, SUNN, 'what if we didn’t *wait?*', SUNC],
  ['l5', 15.85, MOONN, 'sundays?', MOONC],
  ['l6', null, SUNN, 'and *mondays.*', SUNC],
  ['l7', null, NARR, 'love doesn’t run on rare events. put it on the *calendar.*'],
]
const LINES = [], LT = []
for (const [, t0, speaker, text, color] of SPEC) {
  const t = t0 ?? +(LT[LT.length - 1].done + 1.55).toFixed(2)
  LINES.push({ t, speaker, text, ...(color ? { color } : {}) })
  LT.push(lineTimes([{ t, text }], { cps: CPS })[0])
}
const L = Object.fromEntries(SPEC.map(([k], i) => [k, LINES[i].t]))
const DONE = Object.fromEntries(SPEC.map(([k], i) => [k, LT[i].done]))

const LESSON_AT = +(DONE.l7 + 1.75).toFixed(2)
const LESSON_TEXT = 'Love needs a | *schedule.*'
const LESSON_END = lessonTimes({ at: LESSON_AT, text: LESSON_TEXT }).end
const T = {
  sting: 0,
  h0: 2.5, h0Land: 2.95, h0Out: [8.6, 8.8],
  cast: 2.5, open: 3.0, moonIn: [2.45, 8.35], glassesUp: [8.45, 8.8],
  gasp1: 8.85, h1: 9.0, h1Land: 9.45, h1Out: [15.15, 15.35],
  steal: [12.0, 12.9],
  twist: DONE.l4 + 0.1, gasp2: DONE.l4 + 0.7,
  h2: 15.45, h2Land: 15.85, calIn: 15.4, stampS: DONE.l5 + 0.05, stampM: DONE.l6 + 0.05,
  ghost: DONE.l6 + 0.9,
  close: DONE.l7 + 1.55, calOut: [DONE.l7 + 1.4, DONE.l7 + 1.7], h2Out: [DONE.l7 + 1.4, DONE.l7 + 1.6],
  lesson: LESSON_AT, lessonOut: [+(LESSON_END + 2.55).toFixed(2), +(LESSON_END + 2.75).toFixed(2)],
}
T.h3 = T.lessonOut[1] + 0.05; T.h3Land = T.h3 + 0.5
T.moonOff = [T.h3 - 0.15, T.h3 + 2.6]; T.diamond = T.h3 + 0.05
T.look = T.h3 + 1.0; T.gone = T.h3 + 1.35; T.gasp3 = T.h3 + 1.55
T.out = [T.gasp3 + 1.15, T.gasp3 + 1.55]; T.h3Out = [T.gasp3 + 1.2, T.gasp3 + 1.4]
T.next = T.out[1] + 0.15
const LESSON = { at: T.lesson, out: T.lessonOut, text: LESSON_TEXT, accentColor: PINK, dim: 0.55 }
const TEASE = 'Retro forgets | *everything.*'
export const TIMES = T

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEADPH = ['.kkkkkkk.', 'k.......k', 'k.......k', 'cc.....cc', 'cc.....cc']
const HEADPH_C = { k: '#2a2350', c: '#7fe0ff' }

// ── layout
const SUN = { x: 540, y: 780, R: 150 }
const LEDGE = 1336
const CAST = [
  { id: 'virgo', x: 118, y: 1252, size: 176, seed: 61 },
  { id: 'leo', x: 400, y: 1250, size: 190, seed: 62 },
  { id: 'aquarius', x: 655, y: 1250, size: 190, seed: 63 },
  { id: 'pisces', x: 918, y: 1252, size: 176, seed: 64 },
].map((m, i) => ({ ...m, at: T.cast + 0.1 * i }))
const LEO = CAST[1]
const RING = { x: 256, y: LEDGE - 2 }
export const GHOST = { at: T.ghost, x: 1042, y: LEDGE, where: 'rising over the rooftop ledge, far right, beside Pisces, in the eclipse dark' }

/** the Moon's centre x: slides in from the left, sits dead centre for totality, slides on to the right */
function moonX(t) {
  if (t < T.moonOff[0]) return lerp(-260, SUN.x, ease.outCubic(prog(t, ...T.moonIn)))
  return lerp(SUN.x, 1400, ease.inCubic(prog(t, ...T.moonOff)))
}
/** 0 = daylight, 1 = totality (by how much of the Sun the Moon covers) */
function darkness(t) {
  const d = Math.abs(moonX(t) - SUN.x) / (2 * SUN.R)
  return ease.inQuad(clamp(1 - d)) ** 1.5
}
const TOTAL = t => t >= T.moonIn[1] && t < T.moonOff[0] + 0.05
const blushK = t => t < T.h1 ? 0 : clamp(prog(t, T.h1, T.h1 + 0.6)) * (t < T.moonOff[0] ? 1 : 0)

function castState(t, m) {
  const isLeo = m.id === 'leo'
  if (t < T.glassesUp[0]) {
    if (isLeo && t > DONE.l1 + 0.3 && t < DONE.l2 + 0.6) return { mood: 'happy', look: [-1, 1] }   // eyes on the ring box
    return { mood: 'happy', look: [0, -1] }
  }
  if (t < T.gasp1 + 1.1) return { mood: 'wide', look: [clamp((SUN.x - m.x) / 400, -1, 1), -1], blink: false }
  if (t < T.twist) return { mood: 'sparkle', look: [clamp((SUN.x - m.x) / 400, -1, 1), -1] }
  if (t < T.gasp2 + 1.2) return { mood: 'wide', look: [clamp((SUN.x - m.x) / 400, -1, 1), -1], blink: false }
  if (t < T.close) return { mood: 'heart' }
  if (t < T.h3) return { mood: 'happy', look: [0, -1] }
  if (isLeo) {
    if (t < T.look) return { mood: 'happy', look: [0, -1] }
    if (t < T.gone) return { mood: 'neutral', look: [-1, 1] }
    return { mood: 'wide', look: [-1, 1], blink: false }
  }
  return t < T.gasp3 ? { mood: 'happy', look: [0, -1] } : { mood: 'wide', look: [clamp((LEO.x - m.x) / 200, -1, 1), 0], blink: false }
}
const LEO_HOPS = [LEO.at + 0.3, ...talkHops(LINES, LEON, { cps: CPS }), T.gasp1, T.gone]
const HOPS = { [MOONN]: talkHops(LINES, MOONN, { cps: CPS }), [SUNN]: talkHops(LINES, SUNN, { cps: CPS }) }
const hopLift = (t, hops) => { let v = 0; for (const h of hops) { const d = t - h; if (d >= 0 && d < 0.32) v = Math.max(v, Math.sin(Math.PI * d / 0.32)) } return v }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 44px 'Space Mono'", "700 74px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The Sun and the Moon | have a *secret.*', { top: 190, size: 92, accentSize: 160, at: T.h0, gap: 0.07, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Wait… are they | *blushing?*', { top: 190, size: 104, accentSize: 172, at: T.h1, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Sun-day. | *Moon-day.*', { top: 190, size: 116, accentSize: 176, at: T.h2, accentColor: LAV, wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'Don’t wait for | an *eclipse.*', { top: 190, size: 108, accentSize: 176, at: T.h3, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#05040c' }, root)

  // ── pixel discs: the Sun, the lit Moon, the backlit (new) Moon
  const NG = 40
  function disc(paint) {
    const c = document.createElement('canvas'); c.width = c.height = NG + 2
    const o = c.getContext('2d'), h = NG / 2
    for (let j = -1; j <= NG; j++) for (let i = -1; i <= NG; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d <= 1) { o.fillStyle = paint(u, v, d); o.fillRect(i + 1, j + 1, 1, 1) }
      else if (d <= 1 + 1.6 / h) { o.fillStyle = INK; o.fillRect(i + 1, j + 1, 1, 1) }
    }
    return c
  }
  const CRATERS = [[-0.42, -0.2, 0.17], [0.3, 0.42, 0.13], [0.36, -0.46, 0.1], [-0.1, 0.6, 0.08]]
  const sunBuf = disc((u, v, d) => d > 0.88 ? '#f08a24' : u + v < -0.75 ? '#fff4b8' : u * 0.5 + v * 0.7 > 0.45 ? '#f7a733' : SUNC)
  const moonBuf = disc((u, v, d) => CRATERS.some(([a, b, r]) => Math.hypot(u - a, v - b) < r) ? '#c8bfe3' : d > 0.88 ? '#b9b0d8' : u + v < -0.7 ? '#fffbea' : MOONC)
  const newBuf = disc((u, v, d) => CRATERS.some(([a, b, r]) => Math.hypot(u - a, v - b) < r) ? '#1a1336' : d > 0.9 ? '#2c2352' : '#211a40')
  function blit(buf, cx, cy, R, rot = 0, alpha = 1) {
    const cell = Math.max(2, Math.round(2 * R / NG))
    x.save(); x.globalAlpha *= alpha; x.imageSmoothingEnabled = false; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
    x.drawImage(buf, -cell * (NG / 2 + 1), -cell * (NG / 2 + 1), cell * (NG + 2), cell * (NG + 2)); x.restore()
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0 || r <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  /** pixel eyes on an orb: 'open' | 'wide' | 'happy' | 'heart' | 'sparkle', plus blush cheeks */
  function orbFace(cx, cy, c, { mood = 'open', look = [0, 0], ink = INK, hi = '#ffffff', blush = 0, t = 0, seed = 0 }) {
    const [lx, ly] = look
    const blink = mood !== 'heart' && mood !== 'happy' && ((t + seed * 0.7) % 3.6) < 0.12
    for (const s of [-1, 1]) {
      const ex = Math.round(cx + s * 3 * c), ey = Math.round(cy - 0.8 * c)
      x.fillStyle = ink
      if (mood === 'happy') { x.fillRect(ex - 1.5 * c, ey + 0.5 * c, c, c); x.fillRect(ex - 0.5 * c, ey - 0.5 * c, c, c); x.fillRect(ex + 0.5 * c, ey + 0.5 * c, c, c) }
      else if (mood === 'heart') drawBits(x, HEART, HEART_C, ex, ey, c * 0.62 * (1 + 0.12 * Math.sin(t * 9)), { outline: null })
      else if (blink) x.fillRect(ex - 1.5 * c, ey + 0.4 * c, 3 * c, c * 0.8)
      else {
        const tall = mood === 'wide' ? 3.2 : 2.5, wd = mood === 'wide' ? 2.2 : 2
        x.fillRect(ex - c + lx * c * 0.6, ey - c + ly * c * 0.6, wd * c, tall * c)
        x.fillStyle = hi; x.fillRect(ex - c + lx * c * 0.6, ey - c + ly * c * 0.6, c * 0.8, c * 0.8)
        if (mood === 'sparkle') x.fillRect(ex + 0.4 * c + lx * c * 0.6, ey + 0.8 * c + ly * c * 0.6, c * 0.5, c * 0.5)
      }
    }
    if (blush > 0) { x.fillStyle = rgba('#ff7fa8', 0.8 * blush); for (const s of [-1, 1]) x.fillRect(Math.round(cx + s * 5.2 * c - c), Math.round(cy + 1.6 * c), 2.2 * c, c) }
  }
  function tag(label, col, tx, ty, k) {
    if (k <= 0.01) return
    x.save(); x.translate(tx, ty); x.scale(k, k)
    x.font = `700 30px ${MONO}`; x.letterSpacing = '4px'; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(label).width + 44
    x.fillStyle = 'rgba(13,8,32,0.92)'; x.beginPath(); x.roundRect(-tw / 2, -28, tw, 56, 28); x.fill()
    x.lineWidth = 3; x.strokeStyle = col; x.stroke(); x.fillStyle = col; x.fillText(label, 3, 2); x.letterSpacing = '0px'
    x.restore()
  }

  // ── the Houston skyline behind the ledge, the ledge, the rooftop
  const TOWERS = [[60, 80, 120], [150, 70, 190], [240, 90, 150], [330, 60, 250], [420, 84, 205], [520, 66, 290], [600, 92, 230], [700, 60, 175], [790, 86, 265], [880, 64, 200], [970, 90, 150], [1050, 60, 220]]
  function skyline(t, dk) {
    // the 360° sunset on the horizon during totality
    if (dk > 0.05) { const g = x.createLinearGradient(0, LEDGE - 330, 0, LEDGE); g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(1, `rgba(255,140,90,${0.42 * dk})`); x.fillStyle = g; x.fillRect(0, LEDGE - 330, 1080, 330) }
    for (const [cx, w, h] of TOWERS) {
      x.fillStyle = '#160f36'; x.fillRect(cx - w / 2, LEDGE - h, w, h)
      x.fillStyle = 'rgba(201,166,255,0.14)'; x.fillRect(cx - w / 2, LEDGE - h, 4, h)
      for (let j = 16; j < h - 10; j += 24) for (let i = 10; i < w - 10; i += 18) {
        if (((cx * 7 + i * 13 + j * 3) % 11) >= 4) continue
        x.fillStyle = `rgba(242,199,92,${0.18 + 0.55 * dk})`
        x.fillRect(cx - w / 2 + i, LEDGE - h + j, 6, 8)
      }
    }
  }
  function ledge() {
    x.fillStyle = INK; x.fillRect(0, LEDGE - 6, 1080, 1920 - LEDGE + 6)
    x.fillStyle = '#4a4266'; x.fillRect(0, LEDGE, 1080, 30)
    x.fillStyle = '#6a6290'; x.fillRect(0, LEDGE, 1080, 6)
    x.fillStyle = '#2b2448'; for (let i = 0; i < 1080; i += 72) x.fillRect(i, LEDGE + 10, 4, 18)
    const g = x.createLinearGradient(0, LEDGE + 30, 0, 1920); g.addColorStop(0, '#231c40'); g.addColorStop(1, '#0d0920')
    x.fillStyle = g; x.fillRect(0, LEDGE + 30, 1080, 1920 - LEDGE - 30)
  }
  /** Leo's ring box on the ledge (lid open, a gold ring with a twinkling gem); `lift` 0…1 carries it away */
  function ringBox(t, a, lift = 0) {
    if (a <= 0.01) return
    const bx = lerp(RING.x, -120, ease.inCubic(lift)), by = RING.y - Math.sin(Math.PI * Math.min(1, lift * 1.4)) * 160 * lift
    x.save(); x.globalAlpha *= a; x.translate(Math.round(bx), Math.round(by)); x.rotate(-0.25 * lift)
    x.fillStyle = INK; x.fillRect(-34, -40, 68, 40); x.fillRect(-32, -78, 64, 40)
    x.fillStyle = '#7a1838'; x.fillRect(-30, -74, 60, 34)                     // the open lid
    x.fillStyle = '#b8264f'; x.fillRect(-30, -36, 60, 32)                     // the box
    x.fillStyle = '#e04a72'; x.fillRect(-30, -36, 60, 5)
    x.fillStyle = '#3b0c1e'; x.fillRect(-22, -40, 44, 6)                      // the slot
    x.fillStyle = '#f7c948'; x.fillRect(-12, -58, 24, 4); x.fillRect(-12, -44, 24, 4); x.fillRect(-16, -54, 4, 10); x.fillRect(12, -54, 4, 10)
    x.fillStyle = '#bff3ff'; x.fillRect(-6, -68, 12, 10); x.fillStyle = '#ffffff'; x.fillRect(-4, -66, 4, 4)
    x.restore()
    const tw = (Math.sin(t * 5.3) + 1) / 2
    if (lift < 0.2 && tw > 0.6) { x.save(); x.globalAlpha = a * (tw - 0.6) * 2.5; drawPixelStar(x, bx + 2, by - 64, 22, 1, '#ffffff'); x.restore() }
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
  /** the eclipse: rays → corona + prominences → the Moon in front; faces on both */
  function eclipse(t, ok) {
    const dk = darkness(t), mx = moonX(t), bl = blushK(t)
    const sunHop = hopLift(t, HOPS[SUNN]), moonHop = hopLift(t, HOPS[MOONN])
    const sy = SUN.y - sunHop * 6, R = SUN.R * ok
    if (R <= 1) return
    // daylight glow + pixel rays (fade as the Moon covers)
    glow(SUN.x, sy, R * 2.6, SUNC, 0.9 * (1 - dk))
    if (dk < 0.98) {
      x.save(); x.translate(SUN.x, sy); x.rotate(t * 0.35); x.globalAlpha = 1 - dk
      for (let i = 0; i < 12; i++) { x.rotate(Math.PI / 6); const L = (i % 2 ? 0.34 : 0.5) * R; x.fillStyle = INK; x.fillRect(-12, -R * 1.12 - L, 24, L); x.fillStyle = i % 2 ? '#ffe28a' : SUNC; x.fillRect(-8, -R * 1.1 - L + 4, 16, L - 4) }
      x.restore()
    }
    // corona: pearly streamers, flushing pink when they blush; pink prominences at the rim
    if (dk > 0.6) {
      const ck = ease.outCubic(prog(dk, 0.6, 1)) * ok, pulse = 1 + 0.12 * sunHop
      const col = bl > 0 ? (Math.floor(t * 4) % 2 ? '#ffd6e4' : '#ffe9f0') : '#fff6dc'
      glow(SUN.x, sy, R * 2.3 * pulse, bl > 0.5 ? '#ffb3cc' : '#fff1d6', 1.1 * ck)
      x.save(); x.globalAlpha = ck
      for (let i = 0; i < 36; i++) {
        const a = i / 36 * Math.PI * 2 + 0.05 * Math.sin(t * 0.7 + i)
        const len = R * (0.35 + 0.55 * ((Math.sin(i * 2.7) + 1) / 2) + 0.12 * Math.sin(t * 1.6 + i * 1.3)) * pulse
        for (let s = 0; s < len; s += 10) {
          const q = Math.max(3, 9 - s / 22)
          x.globalAlpha = ck * (1 - s / len) * 0.85
          x.fillStyle = i % 3 ? col : (bl > 0.3 ? PINK : '#fffbea')
          x.fillRect(Math.round(SUN.x + Math.cos(a) * (R + 4 + s) - q / 2), Math.round(sy + Math.sin(a) * (R + 4 + s) - q / 2), q, q)
        }
      }
      x.globalAlpha = ck
      // a bright inner ring
      x.strokeStyle = '#fffbea'; x.lineWidth = 7; x.beginPath(); x.arc(SUN.x, sy, R + 3, 0, Math.PI * 2); x.stroke()
      // prominences: little pink loops at the rim (real; "blushing")
      for (const [a, sz] of [[-2.2, 1], [-0.5, 0.8], [0.9, 1.1], [2.5, 0.7], [3.6, 0.9]]) {
        const h = (10 + 8 * sz) * (1 + 0.6 * bl + 0.2 * Math.sin(t * 2 + a)), px = SUN.x + Math.cos(a) * (R + 2), py = sy + Math.sin(a) * (R + 2)
        x.save(); x.translate(px, py); x.rotate(a + Math.PI / 2); x.fillStyle = '#ff5d8f'
        x.fillRect(-14 * sz, -h, 6, h); x.fillRect(8 * sz, -h, 6, h); x.fillRect(-14 * sz, -h - 6, 28 * sz, 6); x.restore()
      }
      x.restore()
      // a halo of hearts drifting out of the corona once they blush
      if (bl > 0.3 && t < T.close) for (let i = 0; i < 6; i++) {
        const ph = (t * 0.32 + i / 6) % 1, a = i * 1.05 + 0.4
        drawBits(x, HEART, HEART_C, Math.round(SUN.x + Math.cos(a) * (R * 1.3 + ph * 160)), Math.round(sy + Math.sin(a) * (R * 1.3 + ph * 160)), 5, { alpha: Math.sin(Math.PI * ph) * bl })
      }
    }
    // the Sun itself + its face (it watches the Moon come)
    blit(sunBuf, SUN.x, sy, R)
    const sunMood = t < 5.5 ? { mood: 'open', look: [-1, 0] } : { mood: 'sparkle', look: [-1, 0] }
    orbFace(SUN.x, sy, Math.round(R / 9), { ...sunMood, blush: t > 6 ? 0.8 : 0.3, t, seed: 1, hi: '#fff8d0' })
    // the Moon: lit while it's beside the Sun, backlit dark in front of it
    const my = SUN.y + 6 - moonHop * 6
    if (mx > -SUN.R * 1.3 && mx < 1080 + SUN.R * 1.3) {
      blit(newBuf, mx, my, R)
      const lit = clamp(1 - dk * 1.15)
      if (lit > 0) blit(moonBuf, mx, my, R, 0, lit)
      const mm = moonMood(t)
      orbFace(mx, my, Math.round(R / 9), { ...mm, ink: dk > 0.5 ? '#efe6ff' : INK, hi: dk > 0.5 ? '#9a8cff' : '#ffffff', blush: Math.max(bl, mm.blush || 0), t, seed: 2 })
      if (t < T.gasp1) tag('MOON', MOONC, mx, my - R - 56, pop01(t, 3.0, 0.3) * (1 - dk))
    }
    if (t < T.gasp1) tag('SUN', SUNC, SUN.x + R + 40, sy - R - 30, pop01(t, 3.3, 0.3) * (1 - dk))
    // the diamond ring: a blazing bead at the Sun's left rim as the Moon slides off
    const dr = prog(t, T.diamond, T.diamond + 1.1)
    if (dr > 0 && dr < 1) {
      const a = Math.sin(Math.PI * dr), bx = SUN.x - R + 6, by = sy
      glow(bx, by, 260 * a, '#ffffff', 1.4 * a)
      x.save(); x.globalAlpha = a; drawPixelStar(x, bx, by, 70 * a + 20, 0, '#ffffff', '#fffbea'); x.restore()
      tag('DIAMOND RING', '#fffbea', bx + 30, by - 120, a > 0.2 ? 1 : a * 5)
    }
  }
  function moonMood(t) {
    if (t < 5.5) return { mood: 'open', look: [1, 0] }
    if (t < T.moonIn[1]) return { mood: 'sparkle', look: [1, 0] }
    if (t < L.l3) return { mood: 'happy' }
    if (t < T.twist) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.gasp2 + 0.6) return { mood: 'wide', look: [0, 0] }
    if (t < T.close) return { mood: 'heart' }
    return { mood: 'happy' }
  }
  /** the week calendar: Sun-day and Moon-day get stamped */
  function calendar(t) {
    const k = pop01(t, T.calIn, 0.4, 1.8) * (1 - ease.inCubic(prog(t, ...T.calOut)))
    if (k <= 0.01) return
    const w = 680, h = 190, cx = 540, cy = 1032 + Math.sin(t * 1.8) * 4
    x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.02)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#f6efdc'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#e04a72'; x.fillRect(-w / 2, -h / 2, w, 44)
    x.font = `700 26px ${MONO}`; x.letterSpacing = '5px'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff6ea'
    x.fillText('EVERY WEEK', 3, -h / 2 + 23); x.letterSpacing = '0px'
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'], cw = (w - 40) / 7
    days.forEach((d, i) => {
      const dx = -w / 2 + 20 + cw * (i + 0.5), dy = 26
      x.fillStyle = 'rgba(42,31,90,0.12)'; x.fillRect(dx - cw / 2 + 4, -h / 2 + 54, cw - 8, h - 66)
      x.font = `700 46px ${MONO}`; x.fillStyle = i < 2 ? '#2a1f5a' : 'rgba(42,31,90,0.45)'; x.fillText(d, dx, -h / 2 + 82)
      const st = i === 0 ? T.stampS : i === 1 ? T.stampM : null
      if (st != null) {
        const sk = pop01(t, st, 0.3, 2.6)
        if (sk > 0.01) { x.save(); x.translate(dx, dy + 6); x.scale(sk, sk); drawBits(x, HEART, HEART_C, 0, 0, 8); x.restore(); x.font = `700 26px 'DejaVu Sans', serif`; x.fillStyle = '#2a1f5a'; if (sk > 0.9) x.fillText(i === 0 ? '☉' : '☽', dx + 24, dy - 22) }
      }
    })
    x.restore()
    if (t > T.stampS) sparkles(t, cx - 340 + 20 + (680 - 40) / 14, 1060, T.stampS, 8, 70, 0.3, [PINK, GOLD, BONE])
    if (t > T.stampM) sparkles(t, cx - 340 + 20 + 3 * (680 - 40) / 14, 1060, T.stampM, 8, 70, 0.9, [LAV, PINK, BONE])
  }
  /** the stars' eclipse glasses: on until totality, then pushed up onto their heads (safe only in totality) */
  function glasses(r, t, m) {
    const up = ease.inOutCubic(prog(t, T.glassesUp[0] + (m.seed % 4) * 0.06, T.glassesUp[1] + (m.seed % 4) * 0.06))
    if (up >= 1 || t > T.gasp1 + 0.6) return
    const cell = Math.max(1, Math.round(r.size / 36)), ey = r.y + 1.2 * cell - up * 9 * cell
    x.save(); x.globalAlpha = 1 - ease.inQuad(prog(up, 0.6, 1))
    x.fillStyle = INK; x.fillRect(r.x - 11 * cell, ey - 3 * cell, 22 * cell, 6 * cell)
    x.fillStyle = '#141020'; x.fillRect(r.x - 10 * cell, ey - 2 * cell, 9 * cell, 4 * cell); x.fillRect(r.x + 1 * cell, ey - 2 * cell, 9 * cell, 4 * cell)
    x.fillStyle = 'rgba(255,207,74,0.6)'; x.fillRect(r.x - 9 * cell, ey - 1.5 * cell, 2 * cell, cell); x.fillRect(r.x + 2 * cell, ey - 1.5 * cell, 2 * cell, cell)
    x.fillStyle = '#f2f2f2'; x.fillRect(r.x - cell, ey - cell, 2 * cell, cell)
    x.restore()
  }
  function drawCast(t, ok) {
    let rLeo = null
    for (const m of CAST) {
      const p = pop01(t, m.at, 0.35, 2.2) * ok
      if (p <= 0.02) continue
      const st = signStar(m.id), s = castState(t, m)
      const hops = m.id === 'leo' ? LEO_HOPS : [m.at + 0.3, T.gasp1 + (m.seed % 4) * 0.05, T.gasp2 + (m.seed % 3) * 0.07, T.gasp3]
      const r = drawStarChar(x, m.x, m.y, m.size, t, { color: st.color, glyph: st.glyph, ...s, pop: p, seed: m.seed, glow: 0.85, hops })
      if (m.id === 'leo') { rLeo = r; drawBits(x, CROWN, CROWN_C, Math.round(r.x), Math.round(r.top + 2), 6 * p, { rot: -0.16 + 0.04 * Math.sin(t * 3) }) }
      if (m.id === 'aquarius') drawBits(x, HEADPH, HEADPH_C, Math.round(r.x), Math.round(r.y - r.size * 0.12), Math.max(1, Math.round(r.size / 36)) * 2.4 * p)
      glasses(r, t, m)
      if (s.mood === 'heart' && t > T.gasp2 + 1.2) for (let i = 0; i < 2; i++) {
        const ph = (t * 0.6 + i * 0.5 + m.seed * 0.17) % 1
        drawBits(x, HEART, HEART_C, Math.round(r.x + (i ? 30 : -30)), Math.round(r.top - ph * 90), 4, { alpha: Math.sin(Math.PI * ph) })
      }
    }
    return rLeo
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const dk = t < T.moonIn[0] ? 0 : darkness(t)
      // the eclipse dark: the sky goes deep night, its stars come out
      if (dk > 0) { x.save(); x.globalAlpha = 0.62 * dk; x.fillStyle = '#03020a'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      drawSeedConstellation(x, t, 100, { alpha: 0.5 + 0.3 * dk })
      const ok = popOut(t, T.out)
      const z1 = gaspZoom(t, { at: T.gasp1, dur: 1.25, x: 540, y: 1230, amount: 0.28, follow: 0.35 })
      const z2 = gaspZoom(t, { at: T.gasp2, dur: 1.3, x: SUN.x, y: SUN.y, amount: 0.4, follow: 0.5 })
      const z3 = gaspZoom(t, { at: T.gasp3, dur: 1.3, x: LEO.x - 40, y: LEO.y + 20, amount: 0.32, follow: 0.8, cy: 1260 })
      const base = x.getTransform()
      x.save(); z1.apply(x); z2.apply(x); z3.apply(x)
      if (t >= T.cast - 0.05 && ok > 0) {
        x.save(); x.globalAlpha = clamp(prog(t, T.cast - 0.05, T.cast + 0.35)) * clamp(ok)
        skyline(t, dk)
        x.restore()
        // (the Leo zoom leaves the sky still, so the Sun never slides under the last line)
        x.save(); if (z3.k > 0) x.setTransform(base)
        eclipse(t, clamp(pop01(t, T.cast - 0.05, 0.45, 1.6)) * ok)
        x.restore()
        x.save(); x.globalAlpha = clamp(prog(t, T.cast - 0.05, T.cast + 0.35)) * clamp(ok)
        ledge()
        x.restore()
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        // the ring box: stolen in the dark (teal-violet glitter, a blur off to the left)
        const lift = prog(t, T.steal[0] + 0.3, T.steal[1])
        if (lift < 1) ringBox(t, pop01(t, T.cast + 0.3, 0.35, 2.2) * ok * (1 - 0.45 * dk), lift)
        sparkles(t, RING.x, RING.y - 40, T.steal[0], 7, 46, 0.6, [OPH.teal, OPH.violet, BONE], 0.9)
        drawCast(t, ok)
        // dim the rooftop a little in the dark (the corona lights them)
        if (dk > 0) { x.save(); x.globalAlpha = 0.18 * dk; x.fillStyle = '#05030c'; x.fillRect(0, LEDGE - 190, 1080, 1920); x.restore() }
        // the empty spot: a dashed outline and a "?"
        const gk = pop01(t, T.gone, 0.3, 2.4)
        if (gk > 0.01 && t > T.steal[1]) {
          x.save(); x.globalAlpha = gk; x.fillStyle = 'rgba(239,230,214,0.85)'
          for (let i = -34; i < 34; i += 12) { x.fillRect(RING.x + i, RING.y - 42, 7, 4); x.fillRect(RING.x + i, RING.y - 2, 7, 4) }
          for (let j = -42; j < 0; j += 12) { x.fillRect(RING.x - 36, RING.y + j, 4, 7); x.fillRect(RING.x + 32, RING.y + j, 4, 7) }
          x.translate(RING.x, RING.y - 110); x.scale(gk, gk); x.font = `700 74px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
          x.fillStyle = INK; x.fillText('?', 4, 5); x.fillStyle = PINK; x.fillText('?', 0, 0)
          x.restore()
        }
        calendar(t)
        sparkles(t, SUN.x, SUN.y, T.h1Land - 0.2, 12, 260, 0.2, [PINK, '#ffd6e4', GOLD, BONE])
      }
      x.restore()
      drawGaspLines(x, t, { at: T.gasp1, dur: 1.25, x: 540, y: 1230, follow: 0.35, color: GOLD })
      drawGaspLines(x, t, { at: T.gasp2, dur: 1.3, x: SUN.x, y: SUN.y, follow: 0.5, color: PINK })
      drawGaspLines(x, t, { at: T.gasp3, dur: 1.3, x: LEO.x - 40, y: LEO.y + 20, follow: 0.8, cy: 1260, color: signStar('leo').color })
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
const CUTS = [{ t: 2.42, kind: 'flip' }, { t: +(T.lessonOut[1] - 0.02).toFixed(2), kind: 'flip' }, { t: +(T.out[1] - 0.05).toFixed(2), kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S5 E05' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine; st5cast writes its brass in KEY)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...titleStingCues(T.sting, { key: KEY, ep: EP }),
  ...wordPops(T.h0, 6, 0.07, 0, 0.022), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land, 1174.66, 0.04, 0.6, 0],
  ...CAST.map((m, i) => ['pop', r3(m.at + 0.05), NOTE[i % NOTE.length], 0.026, (m.x - 540) / 700]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 784, [LEON]: 659.25, [MOONN]: 1046.5, [SUNN]: 587.33 } }),
  // the Moon slides across: a long rising shimmer into totality
  ['riser', 5.6, T.moonIn[1], 0.06], ['bell', T.moonIn[1], 1318.51, 0.04, 2.4, 0], ['glitter', T.moonIn[1], T.moonIn[1] + 1.2],
  ['whoosh', T.glassesUp[0], 0.3, 0.03],
  ...gaspCues(T.gasp1, { key: KEY }),
  ...wordPops(T.h1, 3, 0.08, 1, 0.024), ['pop', T.h1Land, 1318.51, 0.05, 0], ['pluck', T.h1Land, 1174.66, 0.045, 0.6, 0], ['glitter', T.h1Land - 0.2, T.h1Land + 0.5],
  // the theft in the dark: a tiny glitter swish
  ['glitter', T.steal[0], T.steal[0] + 0.5], ['whoosh', T.steal[0] + 0.4, 0.3, 0.018],
  ...twistCues(T.twist, { key: KEY, gap: 0.25 }),
  ...gaspCues(T.gasp2, { key: KEY }),
  ...wordPops(T.h2, 1, 0.08, 3, 0.026), ['pop', T.h2Land, 880, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.04, 0.5, 0],
  ['pop', T.calIn, 659.25, 0.035, 0], ['pop', T.stampS, 1174.66, 0.05, -0.2], ['pop', T.stampM, 1318.51, 0.05, -0.1], ['bell', T.stampM + 0.05, 1760, 0.03, 1.2, 0],
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...wordPops(T.h3, 3, 0.08, 2, 0.026), ['pop', T.h3Land, 1174.66, 0.05, 0],
  ['bell', T.diamond + 0.3, 2093, 0.04, 1.6, 0], ['glitter', T.diamond + 0.2, T.diamond + 1.0],
  ['pop', T.gone, 440, 0.04, -0.3],
  ...twistCues(T.gasp3 - 0.5, { key: KEY, gap: 0.25 }).filter(c => c[1] < T.gasp3 - 0.05),
  ...gaspCues(T.gasp3, { key: KEY }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...nextTimeCues(T.next, { key: KEY, tease: TEASE }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const LINES_ALL = LINES
