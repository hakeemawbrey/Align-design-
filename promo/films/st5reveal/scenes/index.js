// st5reveal (45 s vertical Align ad, Star Talk season 5 "STAR-CROSSED", EP 08) · story 0–40.6, then the shared end card.
//   "Who *is* Ophiuchus?"  Back on the Houston rooftop after the interrupted proposal (EP 07), Saturn shows the real sky.
//   The astrology is true: the Sun's yearly path (the ecliptic) does cross the constellation Ophiuchus, between Scorpius
//   and Sagittarius, but the tropical zodiac divides that path into twelve equal signs. Ophiuchus is a constellation,
//   not a sign. It deflates, admits it only wanted to belong, and Aquarius (the friend sign) gives it a seat.
//   0.00–2.40  title sting "★ STAR-CROSSED ★ / EPISODE 8".
//   2.50       "Who *is* | Ophiuchus?"  Saturn (pointer) at a sky map: THE SUN'S PATH, an arc of 12 sign chips with
//              Ophiuchus's teal constellation squeezed between ♏ and ♐. A pixel Sun travels the arc and lights it up.
//              SATURN: "the real sky. the Sun's path *does* cross your stars."  →  "but the zodiac splits that path
//              into *twelve signs.*"  The 12 chips light one by one; Ophiuchus gets a dashed "?" box; 12 SIGNS stamps.
//   9.70       gasp zoom on Ophiuchus. "Ophiuchus | *deflates.*"  (glitter off, squashed, tears.)
//              OPHIUCHUS: "so i'm… not a sign."  →  "i just wanted to *belong* somewhere."  Everyone softens.
//              (12.3: the ghost leans out from behind the map's left edge.)
//   16.4       "A seat at | *the table.*"  A long table rises; AQUARIUS: "the friend sign always has a spare seat.
//              *sit with us.*"  A place card "✦ OPHIUCHUS" slides down the table; Ophiuchus sits, heart-eyed.
//              THE STARS: "you don't need a title to be *worth loving.*"
//   24.6       ★ LESSON UNLOCKED: "You don't need | a *title.*"
//   28.7       "Everyone deserves | a *seat.*"  The cliffhanger: the little swirl that has hung in the corner all
//              episode grows into a black hole over the roof, and slurps Leo's unanswered "will you…?" bubble. Gasp.
//   36.0–40.4  NEXT TIME ON ★ STAR-CROSSED… ★ "Pluto's black hole eats | *every unsent text.*"  Then the end card.
// One canvas (sky + constellation + rooftop + cast + st5cast devices), DOM type, the dialogue box and the lesson above it,
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
import { OPH, SATURN, drawOphiuchus, drawSaturn, drawBits, drawBlackHole, drawPulledBubble, drawTitleSting, titleStingCues, drawNextTime, nextTimeCues, gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'
import { CROWN, CROWN_C, HEART, HEART_C, makeSkyline, drawRooftop, stringLights, sparkles, floatHearts, tears } from './roof.js'

export const DURATION = 45
const EP = 8
const KEY = 'Cm'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fdcff'
const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"

// ── the timeline
const T = {
  sting: 0,
  h0: 2.5, h0Land: 2.95, h0Out: [9.4, 9.6],
  roof: 2.4, map: 2.6, cast: 2.55, saturn: 2.8,
  open: 3.0, l1: 3.2, sun: [3.7, 8.7], l2: 7.0, light: [7.6, 8.8], stamp: 9.0,
  gasp1: 9.7, h1: 9.8, h1Land: 10.3, h1Out: [16.0, 16.2],
  l3: 10.8, l4: 13.4, ghost: 12.3, soften: 15.0, mapOut: [15.8, 16.3],
  h2: 16.4, h2Land: 16.95, h2Out: [24.2, 24.4], table: [16.2, 16.8],
  l5: 17.0, card: [18.9, 19.9], sit: 20.0, l6: 21.1, close: 24.4,
  lesson: 24.6, lessonOut: [28.4, 28.6],
  h3: 28.7, h3Land: 29.25, grow: [30.0, 33.6], look: 30.3, bubble: 32.0, bubbleAppear: 30.9, gasp2: 32.4,
  h3Out: [35.3, 35.5], out: [35.2, 35.75],
  next: 36.0,
}
const OPHN = OPH.tag, SATN = SATURN.tag, NARR = 'THE STARS', AQUN = '♒ AQUARIUS'
const AQU_C = signStar('aquarius').color, LEO_C = signStar('leo').color
const LINES = [
  { t: T.l1, speaker: SATN, text: 'the real sky. the Sun’s path *does* cross your stars.', color: SATURN.tagColor },
  { t: T.l2, speaker: SATN, text: 'but the zodiac splits that path into *twelve signs.*', color: SATURN.tagColor },
  { t: T.l3, speaker: OPHN, text: 'so i’m… *not a sign.*', color: OPH.tagColor },
  { t: T.l4, speaker: OPHN, text: 'i just wanted to *belong* somewhere.', color: OPH.tagColor },
  { t: T.l5, speaker: AQUN, text: 'the friend sign always has a spare seat. *sit with us.*', color: AQU_C },
  { t: T.l6, speaker: NARR, text: 'you don’t need a title to be *worth loving.*' },
]
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'You don’t need | a *title.*', accentColor: PINK, dim: 0.55 }
const TEASE = 'Pluto’s black hole eats | *every unsent text.*'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const ROOF_Y = 1330
const MAP = { x0: 100, x1: 980, y0: 590, y1: 950 }
const SAT0 = { x: 170, y: 1165, size: 240 }
const OPH0 = { x: 452, y: 1196, size: 290 }
const LEO = { x: 722, y: 1212, size: 200, seed: 54 }
const AQU = { x: 930, y: 1212, size: 200, seed: 55 }
const TABLE_Y = 1298
const HOLE0 = { x: 952, y: 512, r: 9 }, HOLE1 = { x: 540, y: 730, r: 140 }
export const GHOST = { at: T.ghost, x: MAP.x0, y: 800, where: 'leaning out from behind the left edge of Saturn’s sky map' }

// the sky map: 13 slots along the Sun's path; Ophiuchus's constellation sits in slot 8, between ♏ and ♐
const SIGN_IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const arcAt = u => [lerp(150, 930, u), MAP.y0 + 240 - 125 * Math.sin(Math.PI * u)]
const SLOTS = SIGN_IDS.map((id, i) => { const k = i < 8 ? i : i + 1, u = (k + 0.5) / 13; const [ax, ay] = arcAt(u); return { id, u, x: ax, y: ay, ...signStar(id), lit: T.light[0] + i * (T.light[1] - T.light[0]) / 11 } })
const OPH_U = 8.5 / 13, [OPH_MX, OPH_MY] = arcAt(OPH_U)
const OPH_DOTS = [[-14, -38], [8, -30], [-20, -10], [16, -6], [-6, 8], [20, 22], [-18, 30], [2, 40]]
const OPH_LINKS = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [4, 5], [4, 6], [6, 7]]

function castMood(t, id) {
  const look = id === 'leo' ? [-1, 0] : [-1, 0]
  if (t < T.l2) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.gasp1) return { mood: 'squint', look: [-1, -1] }
  if (t < T.soften) return { mood: 'wide', look, blink: false }
  if (t < T.sit) return id === 'aquarius' && t > T.l5 ? { mood: 'happy' } : { mood: 'sparkle', look }
  if (t < T.look) return { mood: t < T.l6 + 2 ? 'heart' : 'happy' }
  if (t < T.gasp2 - 0.3) return { mood: 'wide', look: [0, -1], blink: false }
  return { mood: 'wide', look: [id === 'leo' ? -1 : -1, -1], blink: false }
}
function ophState(t) {
  if (t < T.l2) return { mood: 'sparkle', look: [-1, -1], glitter: 1, shimmer: 1, squash: 0 }
  if (t < T.gasp1) return { mood: 'neutral', look: [-1, -1], glitter: 1 - prog(t, T.l2 + 1, T.gasp1) * 0.6, shimmer: 1, squash: 0, snake: 'wide' }
  const deflate = ease.outCubic(prog(t, T.gasp1, T.gasp1 + 0.6)) * (1 - ease.inOutQuad(prog(t, T.sit - 0.3, T.sit + 0.2)))
  if (t < T.sit) return { mood: t < T.gasp1 + 1.2 ? 'wide' : 'neutral', look: t < T.l5 ? [0, 1] : [1, 0], blink: t < T.gasp1 + 1.2 ? false : 0.35, glitter: 0, shimmer: 0, squash: 0.14 * deflate, snake: 'sleepy' }
  if (t < T.look) return { mood: t < T.l6 + 1.5 ? 'heart' : 'happy', look: [0, 0], glitter: 1, shimmer: 1, squash: 0, snake: 'heart' }
  return { mood: 'wide', look: [0, -1], blink: false, glitter: 0.6, shimmer: 1, squash: 0, snake: 'wide' }
}
function saturnState(t) {
  if (t < T.gasp1) return { mood: 'neutral', look: [1, -1], pointer: true }
  if (t < T.soften) return { mood: 'squint', look: [1, 0], pointer: true }
  if (t < T.look) return { mood: 'happy', look: [1, 0], pointer: false }
  return { mood: 'wide', look: [1, -1], pointer: false }
}
const OPH_HOPS = [T.cast + 0.4, ...talkHops(LINES, OPHN, { cps: CPS }), T.sit, T.sit + 0.6]
const SAT_HOPS = [T.saturn + 0.3, ...talkHops(LINES, SATN, { cps: CPS }), T.stamp]
const AQU_HOPS = [T.cast + 0.5, ...talkHops(LINES, AQUN, { cps: CPS }), T.card[0]]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 74px 'Space Mono'", "500 30px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const SKYLINE = makeSkyline(808, { base: ROOF_Y, lo: 80, hi: 280 })

  const H0 = popText(root, 'Who *is* | Ophiuchus?', { top: 190, size: 116, accentSize: 178, at: T.h0, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Ophiuchus | *deflates.*', { top: 190, size: 116, accentSize: 178, at: T.h1, gap: 0.08, accentColor: CYAN, wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'A seat at | *the table.*', { top: 190, size: 116, accentSize: 178, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'Everyone deserves | a *seat.*', { top: 190, size: 104, accentSize: 178, at: T.h3, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function monoAt(s, px, py, size, col, align = 'center', alpha = 1) {
    x.save(); x.globalAlpha *= alpha; x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, px, py + 3); x.fillStyle = col; x.fillText(s, px, py); x.restore()
  }
  /** Saturn's sky map: the Sun's path with the 12 signs and the constellation Ophiuchus */
  function drawMap(t, k) {
    if (k <= 0) return
    const { x0, x1, y0, y1 } = MAP, P = 8
    x.save(); x.globalAlpha = clamp(k)
    x.translate(540, (y0 + y1) / 2); x.scale(lerp(0.8, 1, k), lerp(0.8, 1, k)); x.translate(-540, -(y0 + y1) / 2)
    // panel
    x.fillStyle = INK; x.fillRect(x0 - P, y0 - P, x1 - x0 + 2 * P, y1 - y0 + 2 * P)
    x.fillStyle = GOLD; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    x.fillStyle = '#0d0a26'; x.fillRect(x0 + P, y0 + P, x1 - x0 - 2 * P, y1 - y0 - 2 * P)
    x.fillStyle = 'rgba(127,220,255,0.06)'; for (let i = x0 + 40; i < x1; i += 40) x.fillRect(i, y0 + P, 2, y1 - y0 - 2 * P)
    for (let j = y0 + 40; j < y1; j += 40) x.fillRect(x0 + P, j, x1 - x0 - 2 * P, 2)
    monoAt('THE SUN’S PATH', 540, y0 + 40, 30, GOLD)
    // the arc (dotted)
    for (let i = 0; i <= 90; i++) { const [ax, ay] = arcAt(i / 90); if (i % 2) continue; x.fillStyle = 'rgba(242,199,92,0.45)'; x.fillRect(Math.round(ax) - 3, Math.round(ay) - 3, 6, 6) }
    // Ophiuchus's constellation (teal), boxed with a "?" once the twelve light up
    const glowO = 0.6 + 0.4 * Math.sin(t * 3)
    x.strokeStyle = 'rgba(79,224,212,0.55)'; x.lineWidth = 3
    for (const [a, b] of OPH_LINKS) { x.beginPath(); x.moveTo(OPH_MX + OPH_DOTS[a][0], OPH_MY + OPH_DOTS[a][1]); x.lineTo(OPH_MX + OPH_DOTS[b][0], OPH_MY + OPH_DOTS[b][1]); x.stroke() }
    OPH_DOTS.forEach(([dx, dy], i) => drawPixelStar(x, OPH_MX + dx, OPH_MY + dy, i % 3 ? 14 : 20, i % 2, i % 2 ? OPH.teal : OPH.violet))
    const q = prog(t, T.light[1], T.light[1] + 0.3)
    if (q > 0) {
      x.globalAlpha = clamp(k) * q
      x.fillStyle = 'rgba(255,143,177,0.9)'
      for (let i = -36; i < 36; i += 12) { x.fillRect(OPH_MX + i, OPH_MY - 56, 6, 4); x.fillRect(OPH_MX + i, OPH_MY + 52, 6, 4) }
      for (let j = -56; j < 56; j += 12) { x.fillRect(OPH_MX - 38, OPH_MY + j, 4, 6); x.fillRect(OPH_MX + 34, OPH_MY + j, 4, 6) }
      monoAt('?', OPH_MX, OPH_MY + 84, 34, PINK)
      x.globalAlpha = clamp(k)
    }
    // the 12 sign chips
    for (const s of SLOTS) {
      const lp = prog(t, s.lit, s.lit + 0.25), sc = 1 + 0.25 * Math.sin(Math.PI * lp)
      x.save(); x.translate(Math.round(s.x), Math.round(s.y)); x.scale(sc, sc)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 27, 0, Math.PI * 2); x.fill()
      x.fillStyle = lp > 0 ? s.color : '#2a2350'; x.beginPath(); x.arc(0, 0, 23, 0, Math.PI * 2); x.fill()
      x.font = `500 30px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = lp > 0 ? INK : 'rgba(239,230,214,0.6)'; x.fillText(s.glyph, 0, 2)
      x.restore()
      if (lp > 0 && lp < 1) sparkles(x, t, s.x, s.y, s.lit, 6, 40, s.u * 9, [GOLD, BONE])
    }
    // the Sun travelling the path
    const sp = prog(t, ...T.sun)
    if (sp > 0 && sp < 1) {
      const [sx, sy] = arcAt(sp)
      const g = x.createRadialGradient(sx, sy, 0, sx, sy, 60); g.addColorStop(0, 'rgba(255,214,120,0.75)'); g.addColorStop(1, 'rgba(255,214,120,0)')
      x.fillStyle = g; x.fillRect(sx - 60, sy - 60, 120, 120)
      drawPixelStar(x, sx, sy - 4, 34, Math.floor(t * 6) % 3, '#ffd65c', '#fff6e0')
      if (Math.abs(sp - OPH_U) < 0.06) { x.globalAlpha = clamp(k) * glowO; x.fillStyle = 'rgba(79,224,212,0.25)'; x.beginPath(); x.arc(OPH_MX, OPH_MY, 60, 0, Math.PI * 2); x.fill(); x.globalAlpha = clamp(k) }
    }
    // the stamp
    const st = prog(t, T.stamp, T.stamp + 0.25)
    if (st > 0) {
      x.save(); x.translate(540, y1 - 46); x.rotate(-0.05); const s2 = lerp(1.8, 1, easeOutBack(st, 2)); x.scale(s2, s2); x.globalAlpha *= clamp(st * 3)
      x.fillStyle = INK; x.fillRect(-150, -32, 300, 64); x.fillStyle = GOLD; x.fillRect(-144, -26, 288, 52); x.fillStyle = INK; x.fillRect(-138, -20, 276, 40)
      x.restore()
      monoAt('12 SIGNS', 540, y1 - 46, 34, GOLD, 'center', clamp(st * 3) * clamp(k))
    }
    x.restore()
  }
  function drawTable(t) {
    const p = ease.outCubic(prog(t, ...T.table))
    if (p <= 0) return
    const ty = lerp(1600, TABLE_Y, p)
    stringLights(x, t, p, 880)
    x.save()
    x.fillStyle = INK; x.fillRect(40, ty - 6, 1000, 120)
    x.fillStyle = '#efe6d6'; x.fillRect(46, ty, 988, 26)
    x.fillStyle = '#d9cbb4'; x.fillRect(46, ty + 26, 988, 70)
    for (let i = 46; i < 1034; i += 44) { x.fillStyle = '#c4b49c'; x.fillRect(i, ty + 26, 6, 70); x.fillStyle = '#d9cbb4'; x.fillRect(i + 18, ty + 92, 26, 8) }
    x.fillStyle = '#fffaf0'; x.fillRect(46, ty, 988, 6)
    // candles
    for (const cx of [280, 600, 820]) {
      x.fillStyle = INK; x.fillRect(cx - 9, ty - 44, 18, 44); x.fillStyle = BONE; x.fillRect(cx - 6, ty - 40, 12, 40)
      const fl = Math.sin(t * 13 + cx) > 0 ? 0 : 2
      x.fillStyle = '#ffb347'; x.fillRect(cx - 5, ty - 58 + fl, 10, 14); x.fillStyle = '#fff3c4'; x.fillRect(cx - 2, ty - 54 + fl, 4, 8)
      const g = x.createRadialGradient(cx, ty - 50, 0, cx, ty - 50, 70); g.addColorStop(0, 'rgba(255,190,100,0.35)'); g.addColorStop(1, 'rgba(255,190,100,0)')
      x.fillStyle = g; x.fillRect(cx - 70, ty - 120, 140, 140)
    }
    x.restore()
    return ty
  }
  function placeCard(t, ty) {
    const p = prog(t, ...T.card)
    if (p <= 0) return
    const e = ease.inOutCubic(p), cx = lerp(AQU.x - 30, OPH0.x, e), cy = ty - 16 - Math.sin(Math.PI * e) * 12
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(Math.sin(Math.PI * e) * 0.06)
    x.fillStyle = INK; x.fillRect(-112, -36, 224, 66)
    x.fillStyle = BONE; x.fillRect(-106, -30, 212, 54)
    x.fillStyle = '#d9cbb4'; x.fillRect(-106, 18, 212, 6)
    x.fillStyle = OPH.teal; x.fillRect(-98, -22, 4, 38)
    x.restore()
    monoAt('✦ OPHIUCHUS', Math.round(cx) + 4, Math.round(cy) - 4, 25, '#3a2a70')
    if (p >= 1) sparkles(x, t, cx, cy, T.card[1], 10, 110, 0.6, [OPH.teal, OPH.violet, GOLD, PINK])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const ok = popOut(t, T.out)
      // the swirl: a dot in the corner all episode, then it grows into the black hole
      const gp = ease.inOutCubic(prog(t, ...T.grow)), creep = 0.4 * prog(t, 3, 30)
      const hx = lerp(HOLE0.x, HOLE1.x, gp), hy = lerp(HOLE0.y, HOLE1.y, gp), hr = lerp(HOLE0.r + 6 * creep, HOLE1.r, gp)
      const z1 = gaspZoom(t, { at: T.gasp1, dur: 1.3, x: OPH0.x, y: OPH0.y, amount: 0.3, follow: 0.35 })
      const z2 = gaspZoom(t, { at: T.gasp2, dur: 1.6, x: HOLE1.x, y: HOLE1.y, amount: 0.35, follow: 0.5 })
      x.save(); z1.apply(x); z2.apply(x)
      if (t >= T.roof - 0.1) drawRooftop(x, t, SKYLINE, ease.outCubic(prog(t, T.roof, T.roof + 0.6)) * clamp(ok), { lights: false })
      if (ok > 0) drawBlackHole(x, hx, hy, hr, t, { strength: lerp(0.5, 1.2, gp), alpha: clamp(prog(t, 1.2, 2.4)) * clamp(ok), tilt: 0.38 })
      if (t >= T.map && ok > 0) {
        const mk = ease.outCubic(prog(t, T.map, T.map + 0.45)) * (1 - ease.inCubic(prog(t, ...T.mapOut)))
        drawMap(t, mk)
        if (mk > 0.9) drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
      }
      if (t >= T.cast && ok > 0) {
        // Saturn
        drawSaturn(x, SAT0.x, SAT0.y, SAT0.size, t, { ...saturnState(t), pop: pop01(t, T.saturn, 0.4, 2.2) * ok, hops: SAT_HOPS })
        // Leo (crown) and Aquarius
        const lp = pop01(t, T.cast + 0.15, 0.35, 2.2) * ok, ap = pop01(t, T.cast + 0.25, 0.35, 2.2) * ok
        const leoS = signStar('leo'), aquS = signStar('aquarius')
        const rL = drawStarChar(x, LEO.x, LEO.y, LEO.size, t, { color: leoS.color, glyph: leoS.glyph, ...castMood(t, 'leo'), pop: lp, seed: LEO.seed, glow: 0.85, hops: [T.cast + 0.45, T.stamp, T.sit + 0.1] })
        drawBits(x, CROWN, CROWN_C, Math.round(rL.x), Math.round(rL.top + 2), 6 * lp, { rot: -0.16 + 0.04 * Math.sin(t * 3) })
        const rA = drawStarChar(x, AQU.x, AQU.y, AQU.size, t, { color: aquS.color, glyph: aquS.glyph, ...castMood(t, 'aquarius'), pop: ap, seed: AQU.seed, glow: 0.85, hops: AQU_HOPS })
        // Ophiuchus: sparkly → deflated → seated
        const os = ophState(t), sit = ease.inOutQuad(prog(t, T.sit - 0.3, T.sit + 0.2))
        const po = pop01(t, T.cast + 0.05, 0.4, 2.4) * ok
        const rO = drawOphiuchus(x, OPH0.x, OPH0.y + 10 * sit + 14 * (os.squash / 0.14), OPH0.size, t, { ...os, pop: po, hops: OPH_HOPS })
        if (t > T.gasp1 && t < T.sit) tears(x, t, rO, OPH0.size, T.gasp1 + 1.3, T.sit - 0.3, 2)
        if (t > T.soften && t < T.sit) for (const r of [rL, rA]) floatHearts(x, t, r.x, r.top + 10, T.soften, T.sit - 0.8, r.x, 3, 50)
        if (t > T.sit && t < T.look) floatHearts(x, t, rO.x, rO.top + 20, T.sit, T.look - 1.2, 3, 5, 90)
        sparkles(x, t, rO.x, rO.y, T.sit, 14, 200, 0.3, [OPH.teal, OPH.violet, PINK, GOLD])
        // the table and the place card
        const ty = drawTable(t)
        if (ty) placeCard(t, ty)
        // the cliffhanger: Leo's unanswered question gets slurped
        drawPulledBubble(x, t, { text: 'will you…?', from: [rL.x - 40, rL.top - 70], to: [hx, hy], at: T.bubble, appear: T.bubbleAppear, dur: 1.3, size: 38, color: '#ffe3ec' })
      }
      x.restore()
      drawGaspLines(x, t, { at: T.gasp1, dur: 1.3, x: OPH0.x, y: OPH0.y, follow: 0.35, color: CYAN })
      drawGaspLines(x, t, { at: T.gasp2, dur: 1.6, x: HOLE1.x, y: HOLE1.y, follow: 0.5, color: '#b46cff' })
      drawTitleSting(x, t, { ep: EP, at: T.sting })
      drawNextTime(x, t, { at: T.next, tease: TEASE, y: 720, size: 70, accentSize: 96 })
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 2.42 (sting out → the roof), 28.6 (lesson out → the cliffhanger), 35.9 (cast out → NEXT TIME).
const CUTS = [{ t: 2.42, kind: 'flip' }, { t: 28.62, kind: 'flip' }, { t: 35.88, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S5 E08' }), cardCuts(CUTS)]

// ── sound (C minor; pop / pluck / bell are moved into the film's key by the engine; st5cast writes its brass in KEY)
const NOTE = [523.25, 587.33, 622.25, 698.46, 783.99, 932.33, 1046.5]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...titleStingCues(T.sting, { key: KEY, ep: EP }),
  ...wordPops(T.h0, 2, 0.08, 0, 0.025), ['pop', T.h0Land, 1046.5, 0.045, 0],
  ['whoosh', T.map, 0.35, 0.03], ['pop', T.map + 0.2, 783.99, 0.035, 0],
  ['pop', T.cast + 0.1, 622.25, 0.03, -0.1], ['pop', T.cast + 0.25, 783.99, 0.03, 0.3], ['pop', T.cast + 0.35, 932.33, 0.03, 0.5], ['pop', T.saturn + 0.05, 523.25, 0.04, -0.4],
  ['pop', T.open, 698.46, 0.04, 0], ['pop', T.open + 0.06, 932.33, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SATN]: 520, [OPHN]: 1046.5, [AQUN]: 880, [NARR]: 784 } }),
  ['riser', T.sun[0], T.sun[0] + 2.8, 0.03], ['bell', r3(T.sun[0] + (T.sun[1] - T.sun[0]) * OPH_U), 1567.98, 0.03, 1.2, 0.2],
  ...SLOTS.map((s, i) => ['pop', r3(s.lit), NOTE[i % NOTE.length] * (i > 6 ? 2 : 1), 0.028, (s.x - 540) / 600]),
  ['tick', T.light[1] + 0.1, 0.06], ['boom', T.stamp, 0.18], ['pop', T.stamp, 523.25, 0.05, 0],
  ...twistCues(T.gasp1 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp1 - 0.05),
  ...gaspCues(T.gasp1, { key: KEY }),
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 622.25, 0.05, 0], ['pluck', T.h1Land, 523.25, 0.04, 0.8, 0],
  ['tick', T.ghost + 0.05, 0.015],
  ['bell', T.soften, 1046.5, 0.025, 1.6, -0.2], ['bell', T.soften + 0.3, 1567.98, 0.02, 1.6, 0.2],
  ['whoosh', T.mapOut[0], 0.35, 0.03], ['boom', T.table[1] - 0.1, 0.12],
  ...wordPops(T.h2, 3, 0.08, 3, 0.026), ['pop', T.h2Land, 1046.5, 0.05, 0],
  ['whoosh', T.card[0] + 0.2, 0.6, 0.025], ['pop', T.card[1], 1318.51, 0.045, -0.1], ['glitter', T.card[1], T.card[1] + 0.6],
  ['pluck', T.sit, 1567.98, 0.045, 0.6, -0.1], ['bell', T.sit + 0.05, 2093, 0.025, 1.2, 0], ['glitter', T.sit, T.sit + 0.7],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...wordPops(T.h3, 3, 0.08, 1, 0.026), ['pop', T.h3Land, 1046.5, 0.05, 0],
  ['riser', T.grow[0], T.grow[1] - 0.6, 0.07], ['whoosh', T.bubble, 1.0, 0.045], ['tick', T.bubble + 1.25, 0.05],
  ...twistCues(T.gasp2 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp2 - 0.05),
  ...gaspCues(T.gasp2, { key: KEY }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...nextTimeCues(T.next, { key: KEY, tease: TEASE }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
