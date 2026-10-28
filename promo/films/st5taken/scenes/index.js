// st5taken (35 s vertical Align ad, Star Talk season 5 "STAR-CROSSED", EP 02) · story 0–30.6, then the shared end card.
//   "Ophiuchus slides into *Aquarius's DMs*."  Picks up EP 01's cliffhanger (the wink). Ophiuchus floods Aquarius's phone
//   with hearts; Leo paces above them. Aquarius answers calmly and clearly: taken, for real. No drama needed, no one is
//   humiliated: Ophiuchus deflates, then nods (lonely, not evil; its redemption comes in EP 08).
//   0.00–2.40  title sting: "★ STAR-CROSSED ★ / EPISODE 2".
//   2.50       "Ophiuchus slides into | *Aquarius’s DMs.*"  Ophiuchus (left) texts from a tiny phone; pixel hearts arc over
//              into Aquarius's big phone (centre), DM bubbles stack, the badge climbs to 99+. Leo (crown) paces back and
//              forth on top. OPHIUCHUS: "hey aquarius. made you a *playlist.*"
//   6.20       gasp zoom on Leo: it sees the flood.
//   6.35       "Aquarius | *replies.*"  AQUARIUS: "flattered. i’m *taken.*" (the reply bubble lands on the phone)
//   9.20       OPHIUCHUS: "…for now?"  dun · dun · DUNNN, gasp zoom on Leo (its crown jumps).
//   11.40      AQUARIUS: "for *real.*"  Leo melts (heart eyes). (11.9: the ghost peeks over the top edge of the phone.)
//   13.50      "No mixed | *signals.*"  THE STARS: "a clear no is a *kindness.*"
//   16.16      ★ LESSON UNLOCKED: "A clear no | is *kind.*"
//   20.80      "Taken means | *taken.*"  The phone is gone; Leo floats down beside Aquarius, hearts; Ophiuchus nods, OK.
//   23.40      The cliffhanger: "MEANWHILE, FAR AWAY…"  A tiny grey planet with a slipping crown (Pluto) stares at
//              floating polaroids of Scorpio. Gasp zoom on Pluto. Gone by 26.2.
//   26.40–30.6 NEXT TIME ON ★ STAR-CROSSED… ★ "The ex who got | *demoted.*"  The plain sky at 30.6, end card.
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
import { OPH, drawOphiuchus, drawPluto, drawBits, drawTitleSting, titleStingCues, drawNextTime, nextTimeCues, gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'

export const DURATION = 35
const EP = 2
const KEY = 'Bm'
const STORY_END = DURATION - ENDCARD_LEN       // 30.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const AQ = signStar('aquarius'), LEOC = signStar('leo'), SCO = signStar('scorpio')

// ── the timeline
const T = {
  sting: 0,
  h0: 2.5, h0Land: 3.0, h0Out: [6.0, 6.2],
  cast: 2.45, phone: 2.6, pace: [2.6, 6.2],
  open: 2.9, l1: 3.1, flood: [3.3, 6.1],
  gasp1: 6.2,
  h1: 6.35, h1Land: 6.8, h1Out: [13.2, 13.4],
  l2: 6.5, l3: 9.2, gasp2: 9.9, l4: 11.4, melt: 12.0, ghost: 11.9,
  h2: 13.5, h2Land: 14.0, l5: 13.6, close: 16.0, h2Out: [15.85, 16.05],
  lesson: 16.16, lessonOut: [20.4, 20.6], phoneOut: [20.3, 20.6],
  h3: 20.8, h3Land: 21.35, settle: [20.7, 21.5], nod: 22.0, h3Out: [23.0, 23.2], out: [22.95, 23.35],
  far: 23.45, gasp3: 24.65, farOut: [25.85, 26.25],
  next: 26.4,
}
const OPHN = OPH.tag, AQN = '♒ AQUARIUS', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: OPHN, text: 'hey aquarius. made you a *playlist.*', color: OPH.tagColor },
  { t: T.l2, speaker: AQN, text: 'flattered. i’m *taken.*', color: AQ.color },
  { t: T.l3, speaker: OPHN, text: '…for now?', color: OPH.tagColor },
  { t: T.l4, speaker: AQN, text: 'for *real.*', color: AQ.color },
  { t: T.l5, speaker: NARR, text: 'a clear no is a *kindness.*' },
]
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'A clear no | is *kind.*', accentColor: PINK, dim: 0.55 }
const TEASE = 'The ex who got | *demoted.*'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

// ── layout
const OPH0 = { x: 186, y: 1210, size: 250 }
const AQU0 = { x: 892, y: 1210, size: 250 }
const PH = { x: 540, y: 1070, w: 320, h: 500 }                 // Aquarius's phone (centre)
const LEO_Y = 640
const LEO_END = { x: 640, y: 1190 }
export const GHOST = { at: T.ghost, x: 452, y: PH.y - PH.h / 2, where: 'peeking up over the top edge of Aquarius’s phone, left of the 99+ badge' }

// the DM thread on Aquarius's phone: a flood of heart bubbles, then the replies
const HEART_TIMES = Array.from({ length: 14 }, (_, i) => +(T.flood[0] + i * 0.2 + (i % 3) * 0.03).toFixed(3))
const MSGS = [
  ...HEART_TIMES.map((t, i) => ({ t, side: 'in', hearts: 1 + (i * 7 % 3) })),
  { t: T.l2 + 0.9, side: 'out', text: ['flattered.', 'i’m taken.'] },
  { t: T.l3 + 0.55, side: 'in', text: ['…for now?'] },
  { t: T.l4 + 0.45, side: 'out', text: ['for real.'] },
]

// Leo paces 1.5 lengths of the top (ends centred on the gasp)
const paceX = t => 540 + 250 * Math.sin(Math.PI * 2 * (clamp(t, ...T.pace) - T.pace[0]) / 2.4)
const paceDir = t => (t > T.pace[0] && t < T.pace[1]) ? Math.sign(Math.cos(Math.PI * 2 * (t - T.pace[0]) / 2.4)) : 0

function leoState(t) {
  if (t < T.gasp1) return { mood: 'squint', look: [paceDir(t), 1] }
  if (t < T.l2) return { mood: 'wide', look: [0, 1], blink: false }
  if (t < T.l2 + 1.2) return { mood: 'wide', look: [1, 1], blink: false }
  if (t < T.gasp2) return { mood: 'sparkle', look: [1, 1] }
  if (t < T.melt) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.h2) return { mood: 'heart' }
  if (t < T.h3) return { mood: 'happy', look: [1, 1] }
  return { mood: 'heart' }
}
function aquState(t) {
  if (t < T.flood[0] + 1.2) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.l2) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.l3) return { mood: 'neutral', look: [0, 0] }
  if (t < T.l4) return { mood: 'squint', look: [-1, 0] }
  if (t < T.h2) return { mood: 'happy', look: [-1, -1] }
  if (t < T.h3) return { mood: 'neutral', look: [0, 0] }
  return { mood: 'heart' }
}
function ophState(t) {
  if (t < T.flood[0]) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.l2) return { mood: 'wink', look: [1, 0], snake: 'heart' }
  if (t < T.l3) return { mood: 'wide', look: [1, 0], blink: false, snake: 'wide' }
  if (t < T.l4) return { mood: 'wink', look: [1, -1] }
  if (t < T.l5) return { mood: 'wide', look: [1, 0], blink: false, snake: 'wide' }
  if (t < T.nod) return { mood: 'neutral', look: [0, 1], snake: 'sleepy' }          // deflates
  return { mood: 'happy', look: [1, 0] }                                            // …and nods: OK
}
function plutoState(t) {
  if (t < T.gasp3) return { mood: 'sad', look: [1, -1], crownSlip: 0.15 }
  return { mood: 'squint', look: [1, -1], crownSlip: lerp(0.15, 0.5, ease.outCubic(prog(t, T.gasp3, T.gasp3 + 0.6))) }
}
const OPH_HOPS = [T.cast + 0.3, ...talkHops(LINES, OPHN, { cps: CPS }), T.nod]
const AQU_HOPS = [T.cast + 0.35, ...talkHops(LINES, AQN, { cps: CPS }), T.h3 + 0.1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "700 74px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Ophiuchus slides into | *Aquarius’s DMs.*', { top: 190, size: 96, accentSize: 150, at: T.h0, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Aquarius | *replies.*', { top: 190, size: 120, accentSize: 184, at: T.h1, gap: 0.08, accentColor: '#7fdcff', wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'No mixed | *signals.*', { top: 190, size: 120, accentSize: 184, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'Taken means | *taken.*', { top: 190, size: 116, accentSize: 184, at: T.h3, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
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
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  /** Aquarius's phone: the DM thread with Ophiuchus, buzzing with each arrival */
  function drawPhone(t, k) {
    if (k <= 0) return
    const { w, h } = PH
    let buzz = 0
    for (const m of MSGS) { const d = t - m.t; if (d >= 0 && d < 0.14) buzz = Math.sin(d * 140) * 4 }
    x.save(); x.translate(PH.x + buzz, PH.y); x.scale(k, k); x.rotate(0.03)
    const x0 = -w / 2, y0 = -h / 2, P = 6
    step(x0 - P, y0 - P, w + 2 * P, h + 2 * P, P, INK)
    step(x0, y0, w, h, P, '#3a3360')
    x.fillStyle = '#4c447a'; x.fillRect(x0 + 2 * P, y0 + P, w - 4 * P, P)
    const sx0 = x0 + 16, sy0 = y0 + 40, sw = w - 32, sh = h - 76
    x.fillStyle = '#0f0a26'; x.fillRect(sx0, sy0, sw, sh)
    x.fillStyle = INK; x.fillRect(-26, y0 + 16, 52, 8)                             // speaker slot
    x.fillRect(-20, y0 + h - 26, 40, 10)                                            // home bar
    // header: who's sliding in
    x.fillStyle = '#1e1844'; x.fillRect(sx0, sy0, sw, 42)
    x.font = `700 20px 'Space Mono', monospace`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillStyle = OPH.tagColor; x.fillText(OPH.tag, sx0 + 12, sy0 + 22)
    // the thread
    x.save(); x.beginPath(); x.rect(sx0, sy0 + 42, sw, sh - 42); x.clip()
    const vis = MSGS.filter(m => t >= m.t)
    let yb = sy0 + sh - 10
    for (let i = vis.length - 1; i >= 0; i--) {
      const m = vis[i], g = ease.outCubic(prog(t, m.t, m.t + 0.18)), sc = easeOutBack(prog(t, m.t, m.t + 0.25), 2.2)
      const bh = m.text ? 18 + 28 * m.text.length : 46
      if (m.text) x.font = `700 22px 'Space Mono', monospace`
      const bw = m.text ? Math.max(...m.text.map(s => x.measureText(s).width)) + 28 : 26 + m.hearts * 30
      const bx = m.side === 'in' ? sx0 + 10 : sx0 + sw - 10 - bw
      const by = yb - bh
      x.save(); x.translate(bx + (m.side === 'in' ? 0 : bw), by + bh); x.scale(sc, sc); x.translate(-(bx + (m.side === 'in' ? 0 : bw)), -(by + bh))
      step(bx, by, bw, bh, 4, m.side === 'in' ? '#6a4fc8' : AQ.color)
      if (m.text) {
        x.fillStyle = m.side === 'in' ? '#fffbea' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'
        m.text.forEach((s, j) => x.fillText(s, bx + 14, by + 23 + j * 28))
      } else for (let j = 0; j < m.hearts; j++) drawBits(x, HEART, HEART_C, bx + 28 + j * 30, by + bh / 2, 4, { outline: null })
      x.restore()
      yb -= (bh + 8) * g
      if (yb < sy0 + 42) break
    }
    x.restore()
    // the unread badge (climbs to 99+)
    const n = HEART_TIMES.filter(v => t >= v).length
    if (n > 0) {
      const lab = n >= 12 ? '99+' : String(n * 8), bp = easeOutBack(prog(t, HEART_TIMES[0], HEART_TIMES[0] + 0.25), 2.4)
      const kick = 1 + 0.15 * Math.max(0, 1 - (t - HEART_TIMES[Math.max(0, n - 1)]) / 0.15)
      x.save(); x.translate(w / 2 - 6, y0 + 6); x.scale(bp * kick, bp * kick)
      x.font = `700 26px 'Space Mono', monospace`; const bw = x.measureText(lab).width + 26
      step(-bw / 2 - 4, -24, bw + 8, 48, 4, INK); step(-bw / 2, -20, bw, 40, 4, '#ff3d6e')
      x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lab, 0, 1)
      x.restore()
    }
    x.restore()
  }
  /** the tiny phone Ophiuchus types on */
  function ophPhone(r, k) {
    if (k <= 0) return
    const px = Math.round(r.x + 92), py = Math.round(r.y + 24)
    x.save(); x.translate(px, py); x.scale(k, k); x.rotate(0.18)
    step(-24, -38, 48, 76, 4, INK); step(-20, -34, 40, 68, 4, '#3a3360')
    x.fillStyle = '#9fe8ff'; x.fillRect(-14, -26, 28, 46)
    drawBits(x, HEART, HEART_C, 0, -3, 3, { outline: null })
    x.restore()
  }
  /** the polaroids Pluto stares at: Scorpio, Scorpio, Scorpio */
  function polaroid(t, cx, cy, rot, k, seed, mood) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.rotate(rot + 0.03 * Math.sin(t * 1.3 + seed)); x.scale(k, k)
    step(-86, -100, 172, 200, 6, INK); step(-80, -94, 160, 188, 6, '#fbf4e4')
    x.fillStyle = '#251a4a'; x.fillRect(-64, -78, 128, 124)
    x.save(); x.beginPath(); x.rect(-64, -78, 128, 124); x.clip()
    drawStarChar(x, 0, -14, 110, t, { color: SCO.color, glyph: null, mood, seed, glow: 0.6, bob: 0, tips: false })
    x.restore()
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const ok = popOut(t, T.out)
      const lx = t < T.settle[0] ? paceX(t) : lerp(paceX(t), LEO_END.x, ease.inOutCubic(prog(t, ...T.settle)))
      const ly = t < T.settle[0] ? LEO_Y : lerp(LEO_Y, LEO_END.y, ease.inOutCubic(prog(t, ...T.settle)))
      const z1 = gaspZoom(t, { at: T.gasp1, dur: 1.3, x: 540, y: LEO_Y, amount: 0.45, follow: 0.5 })
      const z2 = gaspZoom(t, { at: T.gasp2, dur: 1.4, x: 540, y: LEO_Y, amount: 0.5, follow: 0.5 })
      const z3 = gaspZoom(t, { at: T.gasp3, dur: 1.3, x: 480, y: 1060, amount: 0.5, follow: 0.6 })
      x.save(); z1.apply(x); z2.apply(x); z3.apply(x)
      if (t >= T.cast && ok > 0) {
        // the phone + the ghost peeking over it
        const pk = pop01(t, T.phone, 0.4, 2) * popOut(t, T.phoneOut) * ok
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        drawPhone(t, pk)
        // Ophiuchus, left, its tiny phone, the hearts it sends flying
        const po = pop01(t, T.cast, 0.4, 2.2) * ok
        const ro = drawOphiuchus(x, OPH0.x, OPH0.y, OPH0.size, t, { ...ophState(t), side: -1, pop: po, hops: OPH_HOPS })
        ophPhone(ro, po * popOut(t, [T.l5, T.l5 + 0.3]))
        for (const ht of HEART_TIMES) {
          const hp = prog(t, ht - 0.45, ht)
          if (hp <= 0 || hp >= 1) continue
          const hx = lerp(ro.x + 100, PH.x - 90, ease.inOutQuad(hp)), hy = lerp(ro.y, PH.y + 120, hp) - Math.sin(Math.PI * hp) * 200
          drawBits(x, HEART, HEART_C, Math.round(hx), Math.round(hy), 6 + 2 * Math.sin(hp * 18))
        }
        sparkles(t, ro.x, ro.y, T.nod, 8, 140, 0.6, [OPH.teal, OPH.violet, BONE])
        // Aquarius, right
        const pa = pop01(t, T.cast + 0.12, 0.4, 2.2) * ok
        const ra = drawStarChar(x, AQU0.x, AQU0.y, AQU0.size, t, { color: AQ.color, glyph: AQ.glyph, ...aquState(t), pop: pa, seed: 61, hops: AQU_HOPS, glow: 0.9 })
        if (t > T.h3 + 0.4) floatHearts(t, ra.x, ra.top, T.h3 + 0.4, T.out[0], 3)
        // Leo pacing on top (crown), then floating down beside Aquarius
        const pl = pop01(t, T.cast + 0.05, 0.4, 2.2) * ok
        const leoHops = [T.cast + 0.4, T.gasp1, T.gasp2, T.melt, T.settle[1]]
        const lsz = lerp(190, 250, ease.inOutCubic(prog(t, ...T.settle)))
        const rl = drawStarChar(x, lx, ly, lsz, t, { color: LEOC.color, glyph: LEOC.glyph, ...leoState(t), pop: pl, seed: 55, hops: leoHops, glow: 0.9 })
        const jump = 46 * Math.sin(Math.PI * prog(t, T.gasp2, T.gasp2 + 0.55))
        drawBits(x, CROWN, CROWN_C, Math.round(rl.x), Math.round(rl.top + 2 - jump), 6 * pl, { rot: -0.16 + 0.04 * Math.sin(t * 3) + jump * 0.006 })
        if (t > T.melt && t < T.h2) floatHearts(t, rl.x, rl.top, T.melt, T.h2 - 0.3, 5)
        if (t > T.h3 + 0.4) floatHearts(t, rl.x, rl.top, T.h3 + 0.6, T.out[0], 9)
      }
      // the cliffhanger: far away, Pluto and the polaroids
      if (t >= T.far && t < T.farOut[1]) {
        const fo = popOut(t, T.farOut)
        polaroid(t, 240, 870, -0.16, pop01(t, T.far + 0.3, 0.35, 2) * fo, 3, 'happy')
        polaroid(t, 840, 850, 0.14, pop01(t, T.far + 0.45, 0.35, 2) * fo, 4, 'wink')
        polaroid(t, 820, 1300, -0.08, pop01(t, T.far + 0.6, 0.35, 2) * fo, 5, 'sparkle')
        drawPluto(x, 480, 1110, 250, t, { ...plutoState(t), pop: pop01(t, T.far + 0.15, 0.4, 2.2) * fo, hops: [T.far + 0.5, T.gasp3] })
      }
      x.restore()
      drawGaspLines(x, t, { at: T.gasp1, dur: 1.3, x: 540, y: LEO_Y, follow: 0.5, color: LEOC.color })
      drawGaspLines(x, t, { at: T.gasp2, dur: 1.4, x: 540, y: LEO_Y, follow: 0.5, color: PINK })
      drawGaspLines(x, t, { at: T.gasp3, dur: 1.3, x: 480, y: 1060, follow: 0.6, color: '#b9b0e0' })
      if (t >= T.far && t < T.farOut[1]) {
        const fo = popOut(t, T.farOut)
        const n = Math.floor((t - T.far - 0.1) / 0.04) + 1, cap = 'MEANWHILE, FAR AWAY…'
        if (n > 0) {
          x.save(); x.globalAlpha = fo; x.font = `700 44px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
          if ('letterSpacing' in x) x.letterSpacing = '6px'
          const s = cap.slice(0, n); x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, 540, 404); x.fillStyle = GOLD; x.fillText(s, 540, 400)
          if ('letterSpacing' in x) x.letterSpacing = '0px'
          x.restore()
        }
      }
      drawTitleSting(x, t, { ep: EP, at: T.sting })
      drawNextTime(x, t, { at: T.next, tease: TEASE, y: 760, size: 76, accentSize: 120 })
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 2.42 (sting out → the DMs), 20.62 (lesson out → taken means taken), 26.3 (Pluto out → NEXT TIME).
const CUTS = [{ t: 2.42, kind: 'flip' }, { t: 20.62, kind: 'flip' }, { t: 26.3, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S5 E02' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine; st5cast writes its brass in KEY)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...titleStingCues(T.sting, { key: KEY, ep: EP }),
  ...wordPops(T.h0, 3, 0.08, 0, 0.025), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', r3(T.cast + 0.05), 739.99, 0.03, -0.5], ['pop', r3(T.cast + 0.15), 880, 0.03, 0.5], ['pop', r3(T.phone + 0.05), 987.77, 0.035, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [OPHN]: 1046.5, [AQN]: 659.25, [NARR]: 784 } }),
  ...HEART_TIMES.map((ht, i) => ['pop', ht, NOTE[(i * 3) % NOTE.length] * 2, 0.022, 0.1]),
  ...HEART_TIMES.filter((_, i) => i % 3 === 0).map(ht => ['whoosh', r3(ht - 0.4), 0.3, 0.012]),
  ['glitter', T.flood[0], T.flood[1]],
  ...gaspCues(T.gasp1, { key: KEY }),
  ...wordPops(T.h1, 1, 0.08, 1, 0.026), ['pop', T.h1Land, 1318.51, 0.05, 0], ['pluck', T.h1Land, 1174.66, 0.04, 0.6, 0],
  ...MSGS.filter(m => m.text).map(m => ['tick', r3(m.t), 0.05]),
  ...twistCues(T.gasp2 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp2 - 0.05),
  ...gaspCues(T.gasp2, { key: KEY }),
  ['bell', T.melt, 1760, 0.03, 1.4, 0], ['pluck', T.melt, 1174.66, 0.04, 0.6, -0.2],
  ['tick', T.ghost + 0.05, 0.015],
  ...wordPops(T.h2, 2, 0.08, 3, 0.026), ['pop', T.h2Land, 587.33, 0.05, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['whoosh', T.phoneOut[0], 0.3, 0.025],
  ...wordPops(T.h3, 2, 0.08, 2, 0.026), ['pop', T.h3Land, 1174.66, 0.05, 0],
  ['glitter', T.nod, T.nod + 0.6], ['pluck', T.nod, 1567.98, 0.035, 0.5, -0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...'MEANWHILE, FAR AWAY…'.split('').map((ch, i) => ch === ' ' ? null : ['tick', r3(T.far + 0.1 + i * 0.04), 0.022]).filter(Boolean),
  ['pop', r3(T.far + 0.3), 659.25, 0.03, -0.4], ['pop', r3(T.far + 0.45), 739.99, 0.03, 0.4], ['pop', r3(T.far + 0.6), 880, 0.03, 0.3],
  ...twistCues(T.gasp3 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp3 - 0.05),
  ...gaspCues(T.gasp3, { key: KEY }),
  ...nextTimeCues(T.next, { key: KEY, tease: TEASE }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
