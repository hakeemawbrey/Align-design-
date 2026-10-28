// st5thirteenth (40 s vertical Align ad, Star Talk season 5 "STAR-CROSSED", EP 01) · story 0–35.6, then the shared end card.
//   "There's a *13th sign*?!"  The zodiac's group photo gets crashed by Ophiuchus, a glittery newcomer who says it's the
//   13th sign. The astrology stays true: the Sun's path really crosses the constellation Ophiuchus (late Nov – mid Dec),
//   but the tropical zodiac has twelve signs. Ophiuchus is lonely, not evil (its redemption comes in EP 08).
//   0.00–2.40  title sting: "★ STAR-CROSSED ★ / EPISODE 1" (st5cast), two shooting stars cross behind it.
//   2.45–7.50  "The zodiac's | *group photo.*"  The twelve sign stars pose on two photo risers; Saturn (bottom left) holds
//              the camera. SATURN: "all twelve signs, squeeze in. and… *smile.*"  The timer counts 3 · 2 · 1, then a sparkle
//              storm whirls in from the sky…
//   7.50       FLASH. Ophiuchus is front and centre, posing with its serpent staff. Gasp zoom on the twelve (wide eyes).
//              "There's a | *13th sign?!*"  OPHIUCHUS: "hi. i'm new. i'm *special.*"  Eleven stars swoon (heart eyes);
//              Aquarius rolls its eyes. OPHIUCHUS: "the Sun crosses my stars every *December.*"
//   14.8       "Saturn | *squints.*"  SATURN: "true. and the zodiac still has *twelve signs.*"  → THE STARS: "new and special
//              aren't the same as *true.*"  (19.3: the ghost leans out from behind the photo softbox, top right.)
//   22.27      ★ LESSON UNLOCKED: "Charm isn't | *character.*"
//   26.2       "New isn't | always *true.*"  The cliffhanger: Ophiuchus winks at Aquarius (a pixel heart flies over)… and Leo
//              sees it. Gasp zoom on Leo. Everything pops out by 30.95.
//   31.20–35.4 NEXT TIME ON ★ STAR-CROSSED… ★ "Ophiuchus slides into | *Aquarius’s DMs.*"  The plain sky at 35.6, end card.
// One canvas (sky + constellation + risers + cast + st5cast devices), DOM type, the dialogue box and the lesson above it,
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
import { OPH, SATURN, drawOphiuchus, drawSaturn, drawBits, drawTitleSting, titleStingCues, STING_LEN, drawNextTime, nextTimeCues, NEXT_LEN, gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'

export const DURATION = 40
const EP = 1
const KEY = 'Dm'
const STORY_END = DURATION - ENDCARD_LEN       // 35.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fdcff'

// ── the timeline
const T = {
  sting: 0,
  h0: 2.5, h0Land: 2.95, h0Out: [7.25, 7.45],
  risers: 2.42, cast: 2.5, saturn: 2.75,
  open: 3.05, l1: 3.2, count: [5.4, 5.85, 6.3], storm: [6.2, 7.5], flash: 7.5,
  gasp1: 7.62, h1: 7.75, h1Land: 8.25, h1Out: [14.45, 14.65],
  l2: 8.75, swoon: 10.5, l3: 12.1, ghost: 19.3,
  h2: 14.8, h2Land: 15.25, squint: 14.8, l4: 15.45, l5: 18.75, close: 22.0, h2Out: [21.8, 22.0],
  lesson: 22.27, lessonOut: [25.95, 26.15],
  h3: 26.2, h3Land: 26.75, wink: 27.35, heartFly: [27.5, 28.25], aquWide: 28.2, gasp2: 28.75, h3Out: [30.6, 30.8], out: [30.5, 30.95],
  next: 31.2,
}
const OPHN = OPH.tag, SATN = SATURN.tag, NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SATN, text: 'all twelve signs, squeeze in. and… *smile.*', color: SATURN.tagColor },
  { t: T.l2, speaker: OPHN, text: 'hi. i’m new. i’m *special.*', color: OPH.tagColor },
  { t: T.l3, speaker: OPHN, text: 'the Sun crosses my stars every *December.*', color: OPH.tagColor },
  { t: T.l4, speaker: SATN, text: 'true. and the zodiac still has *twelve signs.*', color: SATURN.tagColor },
  { t: T.l5, speaker: NARR, text: 'new and special aren’t the same as *true.*' },
]
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Charm isn’t | *character.*', accentColor: PINK, dim: 0.55 }
const TEASE = 'Ophiuchus slides into | *Aquarius’s DMs.*'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

// ── layout: two photo risers, six stars a row; Leo and Aquarius side by side on the front row, right
const BACK = ['libra', 'scorpio', 'virgo', 'pisces', 'sagittarius', 'capricorn']
const FRONT = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'aquarius']
const XS = [175, 321, 467, 613, 759, 905]
const ROW = { back: 790, front: 952 }
const CAST = [
  ...BACK.map((id, i) => ({ id, x: XS[i] + 8, y: ROW.back, size: 118, seed: 40 + i, at: T.cast + 0.07 * i })),
  ...FRONT.map((id, i) => ({ id, x: XS[i] - 8, y: ROW.front, size: 132, seed: 50 + i, at: T.cast + 0.2 + 0.07 * i })),
]
const LEO = CAST.find(c => c.id === 'leo'), AQU = CAST.find(c => c.id === 'aquarius')
const OPH0 = { x: 556, y: 1200, size: 270 }
const SAT0 = { x: 182, y: 1262, size: 250 }
const SOFTBOX = { x0: 924, x1: 1000, y0: 596, y1: 684 }
export const GHOST = { at: T.ghost, x: SOFTBOX.x0, y: 640, where: 'leaning out from behind the photo softbox, top right, above the back row' }

/** each sign star's mood through the episode */
function castState(t, m) {
  const isAqu = m.id === 'aquarius', isLeo = m.id === 'leo'
  const toOph = [clamp((OPH0.x - m.x) / 400, -1, 1), 1]
  if (t < T.storm[0]) return { mood: 'happy', look: [0, 0] }
  if (t < T.flash) return { mood: 'wide', look: [clamp((540 - m.x) / 400, -1, 1), -1], blink: false }
  if (t < T.swoon) return { mood: 'wide', look: toOph, blink: false }
  if (t < T.l5) return isAqu ? (t < T.swoon + 1.6 ? { mood: 'eyeroll' } : { mood: 'neutral', look: [1, 0] }) : { mood: 'heart' }
  if (t < T.h3) return { mood: 'neutral', look: isAqu ? [-1, 0] : [0, 0] }
  if (isAqu) return t < T.aquWide ? { mood: 'neutral', look: [-1, 1] } : { mood: 'wide', look: [-1, 1], blink: false }
  if (isLeo) return t < T.gasp2 ? { mood: 'happy', look: [1, 0] } : { mood: 'wide', look: [-1, 1], blink: false }
  return { mood: 'neutral' }
}
function ophState(t) {
  if (t < T.l2) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.swoon) return { mood: 'wink', look: [0, 0] }
  if (t < T.l4 + 0.4) return { mood: 'happy', snake: 'heart' }
  if (t < T.l5) return { mood: 'wide', look: [-1, 0], blink: false, snake: 'wide' }
  if (t < T.h3) return { mood: 'neutral', look: [0, 1], snake: 'sleepy' }        // lonely, not evil
  if (t < T.wink - 0.3) return { mood: 'neutral', look: [1, -1] }
  if (t < T.wink + 0.9) return { mood: 'wink', look: [1, -1], snake: 'heart' }
  return { mood: 'sparkle', look: [1, -1] }
}
function saturnState(t) {
  if (t < T.storm[0]) return { mood: 'happy' }
  if (t < T.swoon + 0.3) return { mood: 'wide', look: [1, -1] }
  if (t < T.l5) return { mood: 'squint', look: [1, 0] }
  return { mood: 'neutral', look: [1, 0] }
}
const OPH_HOPS = [T.flash + 0.05, ...talkHops(LINES, OPHN, { cps: CPS }), T.swoon, T.wink]
const SAT_HOPS = [T.saturn + 0.3, ...talkHops(LINES, SATN, { cps: CPS }), T.flash + 0.05]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 74px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The zodiac’s | *group photo.*', { top: 190, size: 104, accentSize: 168, at: T.h0, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'There’s a | *13th sign?!*', { top: 190, size: 116, accentSize: 178, at: T.h1, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Saturn | *squints.*', { top: 190, size: 120, accentSize: 184, at: T.h2, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'New isn’t | always *true.*', { top: 190, size: 116, accentSize: 178, at: T.h3, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, CYAN]) {
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
  function drawRisers(k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = clamp(k)
    const step = (y0, y1, x0, x1) => {
      x.fillStyle = INK; x.fillRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 6)
      x.fillStyle = '#3a3358'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
      x.fillStyle = '#5c5480'; x.fillRect(x0, y0, x1 - x0, 8)
      x.fillStyle = '#2f2948'; for (let i = x0 + 30; i < x1; i += 90) x.fillRect(i, y0 + 20, 6, y1 - y0 - 24)
    }
    step(ROW.back + 50, ROW.front + 40, 96, 984)
    step(ROW.front + 56, ROW.front + 150, 76, 1004)
    // the softbox on its stand (top right): the ghost's hiding spot
    const { x0, x1, y0, y1 } = SOFTBOX
    x.fillStyle = INK; x.fillRect((x0 + x1) / 2 - 5, y1, 10, ROW.back + 50 - y1)
    x.fillRect((x0 + x1) / 2 - 30, ROW.back + 44, 60, 8)                       // tripod foot
    x.fillRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12)
    x.fillStyle = '#4a4266'; x.fillRect(x0, y0, x1 - x0, y1 - y0)            // housing
    x.fillStyle = '#5c5480'; x.fillRect(x0, y0, x1 - x0, 6)
    const dg = x.createLinearGradient(0, y0 + 10, 0, y1 - 10)                  // the diffuser, glowing
    dg.addColorStop(0, '#fff6dc'); dg.addColorStop(1, '#f2c98a')
    x.fillStyle = dg; x.fillRect(x0 + 10, y0 + 12, x1 - x0 - 20, y1 - y0 - 22)
    x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(x0 + 14, y0 + 16, 8, 8)
    x.restore()
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(x0, (y0 + y1) / 2, 0, x0, (y0 + y1) / 2, 160)
    g.addColorStop(0, `rgba(255,240,210,${0.25 * k})`); g.addColorStop(1, 'rgba(255,240,210,0)')
    x.fillStyle = g; x.fillRect(x0 - 160, y0 - 120, 320, 340)
    x.restore()
  }
  /** the sparkle storm: glitter spiralling in on the spot Ophiuchus will land */
  function storm(t) {
    const p = prog(t, ...T.storm)
    if (p <= 0 || p >= 1) return
    x.save()
    for (let i = 0; i < 70; i++) {
      const a0 = i * 2.399, ph = (p * 1.6 + i / 70) % 1, d = lerp(760, 30, ease.inQuad(ph)) * (1 - p * 0.35)
      const a = a0 + ph * 5 + p * 4
      x.globalAlpha = Math.sin(Math.PI * ph) * (0.4 + 0.6 * p)
      drawPixelStar(x, OPH0.x + Math.cos(a) * d, OPH0.y - 60 + Math.sin(a) * d * 0.8, 14 + (i % 4) * 7, i % 3, [OPH.teal, OPH.violet, PINK, GOLD, BONE][i % 5])
    }
    x.restore()
    // the gathering glow
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(OPH0.x, OPH0.y - 60, 0, OPH0.x, OPH0.y - 60, 260)
    g.addColorStop(0, `rgba(180,140,255,${0.6 * p})`); g.addColorStop(1, 'rgba(180,140,255,0)')
    x.fillStyle = g; x.fillRect(OPH0.x - 260, OPH0.y - 320, 520, 520); x.restore()
  }
  function countdown(t) {
    T.count.forEach((c, i) => {
      const p = prog(t, c, c + 0.42)
      if (p <= 0 || p >= 1) return
      const sc = 0.6 + 0.4 * easeOutBack(clamp(p * 3), 2.4)
      x.save(); x.globalAlpha = 1 - ease.inQuad(prog(p, 0.6, 1))
      x.translate(400, 1100); x.scale(sc, sc)
      x.font = `700 96px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(String(3 - i), 0, 7); x.fillStyle = i === 2 ? '#ff5d73' : GOLD; x.fillText(String(3 - i), 0, 0)
      x.restore()
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const ok = popOut(t, T.out)
      const z1 = gaspZoom(t, { at: T.gasp1, dur: 1.25, x: 540, y: 880, amount: 0.3, follow: 0.4 })
      const z2 = gaspZoom(t, { at: T.gasp2, dur: 1.6, x: LEO.x, y: LEO.y, amount: 0.45, follow: 0.85, cy: 1060 })
      x.save(); z1.apply(x); z2.apply(x)
      if (t >= T.risers && ok > 0) {
        drawRisers(ease.outCubic(prog(t, T.risers, T.risers + 0.4)) * ok)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
        // the twelve
        let rLeo = null, rAqu = null
        for (const m of CAST) {
          const p = pop01(t, m.at, 0.35, 2.2) * ok
          if (p <= 0.02) continue
          const st = signStar(m.id), s = castState(t, m)
          const hops = [m.at + 0.3, T.flash + 0.04 + (m.seed % 5) * 0.03, T.swoon + (m.seed % 4) * 0.06]
          const r = drawStarChar(x, m.x, m.y, m.size, t, { color: st.color, glyph: st.glyph, ...s, pop: p, seed: m.seed, glow: 0.85, hops })
          if (m.id === 'leo') { rLeo = r; drawBits(x, CROWN, CROWN_C, Math.round(r.x), Math.round(r.top + 2), 6 * p, { rot: -0.16 + 0.04 * Math.sin(t * 3) }) }
          if (m.id === 'aquarius') rAqu = r
          if (s.mood === 'heart' && t > T.swoon) floatHearts(t, r.x, r.top + 10, T.swoon, T.l5 - 0.6, m.seed)
        }
        // Saturn with the camera
        drawSaturn(x, SAT0.x, SAT0.y, SAT0.size, t, { ...saturnState(t), prop: 'camera', pop: pop01(t, T.saturn, 0.4, 2.2) * ok, hops: SAT_HOPS })
        if (t < T.flash) countdown(t)
        storm(t)
        // Ophiuchus
        if (t >= T.flash) {
          const po = pop01(t, T.flash, 0.4, 2.4) * ok
          const r = drawOphiuchus(x, OPH0.x, OPH0.y, OPH0.size, t, { ...ophState(t), pop: po, hops: OPH_HOPS })
          sparkles(t, r.x, r.y, T.flash, 14, 220, 0.4, [OPH.teal, OPH.violet, PINK, GOLD])
          sparkles(t, r.x, r.y, T.swoon, 10, 180, 1.1, [PINK, GOLD, BONE])
          // the wink: a pixel heart arcs over to Aquarius
          const hp = prog(t, ...T.heartFly)
          if (hp > 0 && hp < 1 && rAqu) {
            const hx = lerp(r.x + 70, rAqu.x, ease.inOutQuad(hp)), hy = lerp(r.y - 90, rAqu.y, hp) - Math.sin(Math.PI * hp) * 220
            drawBits(x, HEART, HEART_C, Math.round(hx), Math.round(hy), 8 + 3 * Math.sin(hp * 20))
          }
          if (rAqu) sparkles(t, rAqu.x, rAqu.y, T.heartFly[1], 8, 90, 0.2, [PINK, '#ff4f86', BONE])
        }
        void rLeo
      }
      x.restore()
      drawGaspLines(x, t, { at: T.gasp1, dur: 1.25, x: 540, y: 880, follow: 0.4, color: PINK })
      drawGaspLines(x, t, { at: T.gasp2, dur: 1.6, x: LEO.x, y: LEO.y, follow: 0.85, cy: 1060, color: LEO_COL })
      // the camera flash
      const fl = prog(t, T.flash - 0.04, T.flash + 0.4)
      if (fl > 0 && fl < 1) { x.save(); x.globalAlpha = fl < 0.1 ? fl / 0.1 : 1 - ease.outQuad((fl - 0.1) / 0.9); x.fillStyle = '#fffbf0'; x.fillRect(0, 0, 1080, 1920); x.restore() }
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
const LEO_COL = signStar('leo').color

// card-motif candidates: 2.42 (sting out → the photo), 26.15 (lesson out → the cliffhanger), 31.08 (cast out → NEXT TIME).
// cardfx keeps the middle one.
const CUTS = [{ t: 2.42, kind: 'flip' }, { t: 26.15, kind: 'flip' }, { t: 31.08, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S5 E01' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine; st5cast writes its brass in KEY)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...titleStingCues(T.sting, { key: KEY, ep: EP }),
  ...wordPops(T.h0, 2, 0.08, 0, 0.025), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['tick', T.risers, 0.05],
  ...CAST.map((m, i) => ['pop', r3(m.at + 0.05), NOTE[i % NOTE.length], 0.026, (m.x - 540) / 700]),
  ['pop', T.saturn + 0.05, 587.33, 0.04, -0.4],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SATN]: 520, [OPHN]: 1046.5, [NARR]: 784 } }),
  ...T.count.map((c, i) => ['pop', c, i === 2 ? 1318.51 : 880, 0.05, -0.3]),
  ['riser', T.storm[0], T.flash, 0.08], ['glitter', T.storm[0] + 0.5, T.flash],
  ['tick', T.flash - 0.02, 0.12], ['tick', T.flash + 0.03, 0.08], ['crash', T.flash, { gain: 0.06, len: 2.4 }], ['glitter', T.flash, T.flash + 0.7],
  ...gaspCues(T.gasp1, { key: KEY }),
  ...wordPops(T.h1, 2, 0.08, 1, 0.026), ['pop', T.h1Land, 1318.51, 0.05, 0], ['pluck', T.h1Land, 1174.66, 0.045, 0.6, 0],
  ['glitter', T.swoon, T.swoon + 0.8], ['bell', T.swoon + 0.05, 1760, 0.03, 1.4, 0], ['pluck', T.swoon, 1174.66, 0.04, 0.6, 0.2],
  ['tick', T.ghost + 0.05, 0.015],
  ...wordPops(T.h2, 1, 0.08, 3, 0.026), ['pop', T.h2Land, 587.33, 0.05, 0], ['pluck', T.h2Land, 587.33, 0.04, 0.5, -0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...wordPops(T.h3, 3, 0.08, 2, 0.026), ['pop', T.h3Land, 1174.66, 0.05, 0],
  ['pluck', T.wink, 1567.98, 0.045, 0.5, 0], ['bell', T.wink + 0.05, 2093, 0.025, 1.0, 0],
  ['whoosh', T.heartFly[0] + 0.4, 0.5, 0.035], ['pop', T.heartFly[1], 1318.51, 0.05, 0.4],
  ...twistCues(T.gasp2 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp2 - 0.05),
  ...gaspCues(T.gasp2, { key: KEY }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...nextTimeCues(T.next, { key: KEY, tease: TEASE }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void STING_LEN; void NEXT_LEN
