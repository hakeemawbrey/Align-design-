// st5blackhole (45 s vertical Align ad, Star Talk season 5 "STAR-CROSSED", EP 09) · story 0–40.6, then the shared end card.
//   "The *black hole*."  The swirl over the Houston rooftop (EP 08) is Pluto's black hole, and it eats every star's
//   UNSENT texts. The only way out is to say them out loud: each one said shrinks it, until it is a dot.
//   0.00–2.40  title sting "★ STAR-CROSSED ★ / EPISODE 9".
//   2.50       "The | *black hole.*"  Unsent bubbles lift off the stars and spiral in: "i love you" (Pisces), "i'm proud
//              of you" (Cancer), "i'm sorry" (Pluto), "i miss you" (Virgo). Everyone leans toward it, wide-eyed.
//              THE STARS: "it's eating every text you never *sent.*"  →  PLUTO (crown slipping): "okay. i *may* have fed it."
//   9.00       it surges: gasp zoom. "Say it | *out loud.*"  THE STARS: "the only way out? say them *out loud.*"
//              PISCES → VIRGO: "Virgo… i love you. *out loud*, this time."  (the bubble flies back out to Virgo; it shrinks)
//              CANCER → CAPRICORN: "Capricorn, i'm so *proud of you.*"  (it shrinks again)
//              (16.6: the ghost rises from behind the rooftop water tank, right under the hole, and holds on.)
//              PLUTO → SCORPIO: "Scorpio… i'm sorry. and i'm *happy for you.*"  Gasp zoom on Scorpio; Pluto's crown
//              settles straight. The hole shrinks to a dot.
//   21.8       "Down to | *a dot.*"  THE STARS: "say it while you *can.*"
//   25.0       ★ LESSON UNLOCKED: "Say it *before* | it's gone."
//   29.2       "Unsent is | *unsaid.*"  The dot spits out one last bubble, Leo's "will you…?" from EP 08, which floats back
//              to Leo. Leo turns to Aquarius. LEO: "so… about that *question.*"  Gasp zoom on Aquarius.
//   36.0–40.4  NEXT TIME ON ★ STAR-CROSSED… ★ "The finale: Leo asks | *one more time.*"  Then the end card.
// One canvas (sky + constellation + rooftop + cast + st5cast devices), DOM type, two dialogue boxes and the lesson,
// grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { PLUTO, drawPluto, drawBits, drawBlackHole, drawPulledBubble, drawTitleSting, titleStingCues, drawNextTime, nextTimeCues, gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'
import { CROWN, CROWN_C, makeSkyline, drawRooftop, sparkles, floatHearts } from './roof.js'

export const DURATION = 45
const EP = 9
const KEY = 'Ebm'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"

// ── the timeline
const T = {
  sting: 0,
  h0: 2.5, h0Land: 2.95, h0Out: [9.6, 9.8],
  roof: 2.4, cast: 2.5,
  open: 3.3, l1: 3.5, l2: 6.7,
  gasp1: 9.0, surge: [8.7, 9.4],
  h1: 9.9, h1Land: 10.4, h1Out: [21.4, 21.6],
  l3: 9.5, l4: 12.6, ret1: [14.4, 15.2], l5: 15.9, ret2: [17.4, 18.2], ghost: 16.6,
  l6: 18.9, gasp2: 20.9, ret3: [20.9, 21.7],
  h2: 21.8, h2Land: 22.3, h2Out: [24.7, 24.9],
  l7: 22.4, close: 24.9,
  lesson: 25.0, lessonOut: [28.9, 29.1],
  h3: 29.2, h3Land: 29.7, spit: [30.1, 31.2], turn: 31.3, open2: 31.45, l8: 31.65, gasp3: 33.0, close2: 34.7,
  h3Out: [35.3, 35.5], out: [35.2, 35.75],
  next: 36.0,
}
const NARR = 'THE STARS', PLN = PLUTO.tag, PISN = '♓ PISCES', CANN = '♋ CANCER', LEON = '♌ LEO'
const COL = id => signStar(id).color
const LINES = [
  { t: T.l1, speaker: NARR, text: 'it’s eating every text you never *sent.*' },
  { t: T.l2, speaker: PLN, text: 'okay. i *may* have fed it.', color: PLUTO.tagColor },
  { t: T.l3, speaker: NARR, text: 'the only way out? say them *out loud.*' },
  { t: T.l4, speaker: PISN, text: 'Virgo… i love you. *out loud*, this time.', color: COL('pisces') },
  { t: T.l5, speaker: CANN, text: 'Capricorn, i’m so *proud of you.*', color: COL('cancer') },
  { t: T.l6, speaker: PLN, text: 'Scorpio… i’m sorry. and i’m *happy for you.*', color: PLUTO.tagColor },
  { t: T.l7, speaker: NARR, text: 'say it while you *can.*' },
]
const LINES2 = [{ t: T.l8, speaker: LEON, text: 'so… about that *question.*', color: COL('leo') }]
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Say it *before* | it’s gone.', accentColor: PINK, dim: 0.55 }
const TEASE = 'The finale: Leo asks | *one more time.*'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const ROOF_Y = 1330
const HOLE = { x: 540, y: 720 }
const TANK = { x: 668, top: 1040 }
const CAST = {
  pisces: { x: 118, y: 1040, size: 124, seed: 61 }, virgo: { x: 276, y: 1040, size: 124, seed: 62 },
  cancer: { x: 838, y: 1040, size: 124, seed: 63 }, capricorn: { x: 976, y: 1040, size: 124, seed: 64 },
  taurus: { x: 112, y: 1236, size: 150, seed: 65 }, scorpio: { x: 296, y: 1236, size: 158, seed: 66 },
  leo: { x: 776, y: 1236, size: 170, seed: 67 }, aquarius: { x: 956, y: 1236, size: 158, seed: 68 },
}
const PLU = { x: 540, y: 1262, size: 140 }
const ORDER = ['pisces', 'virgo', 'cancer', 'capricorn', 'taurus', 'scorpio', 'leo', 'aquarius']
const RET = [
  { text: 'i love you', from: 'pisces', to: 'virgo', w: T.ret1 },
  { text: 'i’m proud of you', from: 'cancer', to: 'capricorn', w: T.ret2 },
  { text: 'i’m happy for you', from: 'pluto', to: 'scorpio', w: T.ret3 },
]
const EATEN = [
  { text: 'i love you', who: 'pisces', appear: 2.9, at: 4.1 },
  { text: 'i’m proud of you', who: 'cancer', appear: 3.3, at: 4.7 },
  { text: 'i’m sorry', who: 'pluto', appear: 3.7, at: 5.3 },
  { text: 'i miss you', who: 'virgo', appear: 4.1, at: 5.9 },
]
export const GHOST = { at: T.ghost, x: TANK.x, y: TANK.top, where: 'rising from behind the rooftop water tank, right under the black hole' }

/** the hole's radius + strength: surge, then a step down after each thing said out loud, then a dot, then gone */
function holeState(t) {
  let r = 120, s = 1
  r += 30 * ease.outCubic(prog(t, ...T.surge)); s += 0.3 * prog(t, ...T.surge)
  const step = (w, to, st) => { const p = easeOutBack(prog(t, w[1], w[1] + 0.5), 2.2); r = lerp(r, to, p); s = lerp(s, st, clamp(p)) }
  step(T.ret1, 98, 1.05); step(T.ret2, 58, 0.8); step(T.ret3, 7, 0.45)
  const gone = ease.inCubic(prog(t, T.spit[0] + 0.2, T.spit[0] + 0.6))
  return { r: r * (1 - gone), s: s * (1 - gone), pull: clamp((r - 7) / 143) }
}
function mood(t, id) {
  const look = [clamp((HOLE.x - CAST[id].x) / 400, -1, 1), -1]
  if (t < T.cast + 0.4) return { mood: 'neutral', look: [0, 0] }
  if (t < T.ret1[0]) return id === 'pisces' && t > T.l4 ? { mood: 'sparkle', look: [1, 0] } : { mood: 'wide', look, blink: false }
  const after = (w) => t > w[1]
  const recv = { virgo: T.ret1, capricorn: T.ret2, scorpio: T.ret3 }[id]
  if (recv && after(recv)) return t < T.turn ? { mood: 'heart' } : { mood: 'happy' }
  if (id === 'pisces') return { mood: t > T.ret1[1] ? 'happy' : 'sparkle', look: [1, 0] }
  if (id === 'cancer') return t > T.l5 ? { mood: t > T.ret2[1] ? 'happy' : 'sparkle', look: [1, 0] } : { mood: 'wide', look, blink: false }
  if (id === 'taurus') return t > T.ret3[1] ? { mood: 'happy' } : { mood: 'wide', look, blink: false }
  if (id === 'leo') {
    if (t < T.ret3[1]) return { mood: 'wide', look, blink: false }
    if (t < T.spit[0]) return { mood: 'happy' }
    if (t < T.turn) return { mood: 'wide', look: [0, -1], blink: false }
    return { mood: 'sparkle', look: [1, 0] }
  }
  if (id === 'aquarius') {
    if (t < T.ret3[1]) return { mood: 'wide', look, blink: false }
    if (t < T.gasp3 - 0.1) return t < T.turn ? { mood: 'happy' } : { mood: 'neutral', look: [-1, 0] }
    return { mood: 'wide', look: [-1, 0], blink: false, blush: true }
  }
  if (t > T.ret3[1]) return { mood: 'happy' }
  return { mood: 'wide', look, blink: false }
}
function plutoState(t) {
  if (t < T.l2) return { mood: 'grumpy', look: [0, -1], crownSlip: 0.25 }
  if (t < T.l3) return { mood: 'sad', look: [0, 1], crownSlip: 0.75 }
  if (t < T.l6) return { mood: 'wide', look: [0, -1], crownSlip: 0.5 }
  if (t < T.ret3[1]) return { mood: 'sad', look: [-1, 0], crownSlip: 0.5 * (1 - prog(t, T.l6 + 1, T.ret3[1])) }
  return { mood: 'happy', crownSlip: 0 }
}
const HOPS = {
  pisces: talkHops(LINES, PISN, { cps: CPS }), cancer: talkHops(LINES, CANN, { cps: CPS }),
  virgo: [T.ret1[1]], capricorn: [T.ret2[1]], scorpio: [T.ret3[1], T.ret3[1] + 0.5],
  leo: [...talkHops(LINES2, LEON, { cps: CPS }), T.spit[1]], aquarius: [T.gasp3], taurus: [T.ret3[1] + 0.2],
}
const PL_HOPS = [...talkHops(LINES, PLN, { cps: CPS }), T.ret3[1] + 0.1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 74px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const SKYLINE = makeSkyline(909, { base: ROOF_Y, lo: 80, hi: 300 })

  const H0 = popText(root, 'The | *black hole.*', { top: 190, size: 120, accentSize: 184, at: T.h0, gap: 0.08, accentColor: LAV, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Say it | *out loud.*', { top: 190, size: 120, accentSize: 184, at: T.h1, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Down to | *a dot.*', { top: 190, size: 120, accentSize: 184, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'Unsent is | *unsaid.*', { top: 190, size: 120, accentSize: 184, at: T.h3, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1450, width: 960, height: 290, open: T.open2, close: T.close2, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  /** a pixel bubble flying OUT of the hole, back to whoever it was meant for */
  function returnBubble(t, text, [fx, fy], [tx, ty], [a, b]) {
    const p = prog(t, a, b)
    if (p <= 0 || p >= 1) return
    const e = ease.outCubic(p), sc = lerp(0.15, 1, easeOutBack(clamp(p * 1.6), 1.6)) * (1 - ease.inCubic(prog(p, 0.85, 1)))
    const px = lerp(fx, tx, e) + Math.sin(p * Math.PI) * 60 * Math.sign(tx - fx || 1), py = lerp(fy, ty, e) - Math.sin(p * Math.PI) * 120
    x.save(); x.font = `700 32px ${MONO}`
    const w = Math.round(x.measureText(text).width + 44), h = 60, P = 6
    const qx = clamp(px, w * sc / 2 + 24, 1056 - w * sc / 2)
    x.translate(Math.round(qx), Math.round(py)); x.scale(sc, sc); x.rotate(Math.sin(p * 9) * 0.18 * (1 - e))
    x.fillStyle = INK; x.fillRect(-w / 2 - P, -h / 2, w + 2 * P, h); x.fillRect(-w / 2, -h / 2 - P, w, h + 2 * P)
    x.fillStyle = '#ffe3ec'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#ffffff'; x.fillRect(-w / 2 + P, -h / 2 + P, w - 2 * P, 4)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
    x.restore()
  }
  function drawTank(k) {
    if (k <= 0) return
    const { x: cx, top } = TANK
    x.save(); x.globalAlpha = clamp(k)
    x.fillStyle = INK
    for (const lx of [-40, -14, 14, 40]) x.fillRect(cx + lx - 4, top + 86, 8, ROOF_Y - top - 86)
    x.fillRect(cx - 46, top + 150, 92, 6)
    x.fillRect(cx - 52, top - 6, 104, 98)
    x.fillStyle = '#5a3e74'; x.fillRect(cx - 46, top + 10, 92, 76)
    x.fillStyle = '#6c4d8a'; for (let i = cx - 46; i < cx + 46; i += 16) x.fillRect(i, top + 10, 4, 76)
    x.fillStyle = '#3d2b55'; x.fillRect(cx - 46, top + 46, 92, 6)
    x.fillStyle = '#4a3466'; x.fillRect(cx - 50, top, 100, 12); x.fillStyle = '#7a5aa0'; x.fillRect(cx - 50, top, 100, 4)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const ok = popOut(t, T.out)
      const hs = holeState(t)
      const z1 = gaspZoom(t, { at: T.gasp1, dur: 1.3, x: HOLE.x, y: HOLE.y, amount: 0.3, follow: 0.3 })
      const z2 = gaspZoom(t, { at: T.gasp2, dur: 1.4, x: CAST.scorpio.x, y: CAST.scorpio.y, amount: 0.32, follow: 0.6, cy: 1080 })
      const z3 = gaspZoom(t, { at: T.gasp3, dur: 1.5, x: CAST.aquarius.x, y: CAST.aquarius.y, amount: 0.45, follow: 0.75, cy: 1000 })
      x.save(); z1.apply(x); z2.apply(x); z3.apply(x)
      const rk = ease.outCubic(prog(t, T.roof, T.roof + 0.6)) * clamp(ok)
      drawRooftop(x, t, SKYLINE, rk, { lights: false })
      drawTank(rk)
      if (ok > 0) drawBlackHole(x, HOLE.x, HOLE.y, hs.r, t, { strength: hs.s, alpha: clamp(prog(t, 0.9, 1.8)) * clamp(ok), tilt: 0.38 })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3, look: [0, -1] })
      if (t >= T.cast && ok > 0) {
        const R = {}
        // the pull: everyone leans toward the hole while it's big
        const lean = (px) => (HOLE.x - px) * 0.05 * hs.pull * (1 + 0.25 * Math.sin(t * 9))
        ORDER.forEach((id, i) => {
          const c = CAST[id], st = signStar(id)
          const p = pop01(t, T.cast + 0.05 * i, 0.35, 2.2) * ok
          R[id] = drawStarChar(x, c.x + lean(c.x), c.y, c.size, t, { color: st.color, glyph: st.glyph, ...mood(t, id), pop: p, seed: c.seed, glow: 0.85, hops: HOPS[id], squash: -0.06 * hs.pull })
          if (id === 'leo') drawBits(x, CROWN, CROWN_C, Math.round(R.leo.x), Math.round(R.leo.top + 2), 6 * p, { rot: -0.16 + 0.04 * Math.sin(t * 3) })
        })
        const pp = pop01(t, T.cast + 0.3, 0.4, 2.2) * ok
        R.pluto = drawPluto(x, PLU.x, PLU.y, PLU.size, t, { ...plutoState(t), pop: pp, hops: PL_HOPS })
        // unsent texts, slurped
        for (const b of EATEN) { const r = R[b.who]; drawPulledBubble(x, t, { text: b.text, from: [r.x, r.top - 50], to: [HOLE.x, HOLE.y], at: b.at, appear: b.appear, dur: 1.3, size: 30, color: '#ffe3ec' }) }
        // said out loud: they come back out, to the right star
        for (const b of RET) {
          const to = R[b.to]
          returnBubble(t, b.text, [HOLE.x, HOLE.y], [to.x, to.top - 46], b.w)
          sparkles(x, t, to.x, to.y, b.w[1], 12, to.size * 0.75, 0.4, [PINK, GOLD, BONE])
          if (t > b.w[1]) floatHearts(x, t, to.x, to.top + 10, b.w[1], b.w[1] + 3.2, to.x, 4, 60)
        }
        // the dot spits out Leo's question
        returnBubble(t, 'will you…?', [HOLE.x, HOLE.y], [R.leo.x - 10, R.leo.top - 54], T.spit)
        sparkles(x, t, R.leo.x, R.leo.y, T.spit[1], 12, 140, 0.9, [GOLD, PINK, BONE])
        if (t > T.spit[1] && t < T.out[0]) {
          // it stays as a little badge over Leo
          const k = easeOutBack(prog(t, T.spit[1], T.spit[1] + 0.3), 2)
          x.save(); x.translate(Math.round(R.leo.x - 10), Math.round(R.leo.top - 54)); x.scale(k * 0.8, k * 0.8)
          x.font = `700 32px ${MONO}`; const w = Math.round(x.measureText('will you…?').width + 44)
          x.fillStyle = INK; x.fillRect(-w / 2 - 6, -30, w + 12, 60); x.fillRect(-w / 2, -36, w, 72)
          x.fillStyle = '#ffe3ec'; x.fillRect(-w / 2, -30, w, 60)
          x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('will you…?', 0, 3)
          x.restore()
        }
        if (t > T.gasp3) floatHearts(x, t, R.aquarius.x, R.aquarius.top + 10, T.gasp3 + 0.4, T.out[0], 5, 4, 50)
      }
      x.restore()
      drawGaspLines(x, t, { at: T.gasp1, dur: 1.3, x: HOLE.x, y: HOLE.y, follow: 0.3, color: LAV })
      drawGaspLines(x, t, { at: T.gasp2, dur: 1.4, x: CAST.scorpio.x, y: CAST.scorpio.y, follow: 0.6, cy: 1080, color: COL('scorpio') })
      drawGaspLines(x, t, { at: T.gasp3, dur: 1.5, x: CAST.aquarius.x, y: CAST.aquarius.y, follow: 0.75, cy: 1000, color: COL('aquarius') })
      drawTitleSting(x, t, { ep: EP, at: T.sting })
      drawNextTime(x, t, { at: T.next, tease: TEASE, y: 720, size: 70, accentSize: 96 })
      box.update(t); box2.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 2.42 (sting out → the roof), 29.12 (lesson out → the cliffhanger), 35.88 (cast out → NEXT TIME).
const CUTS = [{ t: 2.42, kind: 'flip' }, { t: 29.12, kind: 'flip' }, { t: 35.88, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S5 E09' }), cardCuts(CUTS)]

// ── sound (E♭ minor; pop / pluck / bell are moved into the film's key by the engine; st5cast writes its brass in KEY)
const NOTE = [622.25, 698.46, 739.99, 830.61, 932.33, 987.77, 1108.73]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...titleStingCues(T.sting, { key: KEY, ep: EP }),
  ...wordPops(T.h0, 1, 0.08, 0, 0.025), ['pop', T.h0Land, 1244.51, 0.045, 0],
  ...ORDER.map((id, i) => ['pop', r3(T.cast + 0.05 * i + 0.05), NOTE[i % NOTE.length], 0.024, (CAST[id].x - 540) / 700]),
  ['pop', T.cast + 0.35, 622.25, 0.035, 0],
  ['riser', 1.0, 8.6, 0.035],
  ...EATEN.flatMap(b => [['pop', r3(b.appear), 1244.51, 0.025, 0], ['whoosh', r3(b.at), 1.1, 0.035], ['tick', r3(b.at + 1.25), 0.04]]),
  ['pop', T.open, 830.61, 0.04, 0], ['pop', T.open + 0.06, 1108.73, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 784, [PLN]: 440, [PISN]: 1046.5, [CANN]: 932.33 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [LEON]: 659.25 } }),
  ...twistCues(T.gasp1 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp1 - 0.05),
  ...gaspCues(T.gasp1, { key: KEY }), ['boom', T.surge[0] + 0.2, 0.2],
  ...wordPops(T.h1, 2, 0.08, 2, 0.026), ['pop', T.h1Land, 1244.51, 0.05, 0], ['pluck', T.h1Land, 932.33, 0.04, 0.7, 0],
  ...RET.flatMap((b, i) => [['whoosh', r3(b.w[0]), 0.8, 0.03], ['pop', r3(b.w[1]), NOTE[(i * 2 + 3) % NOTE.length] * 2, 0.05, 0], ['bell', r3(b.w[1] + 0.05), 1864.66 * (1 + i * 0.12), 0.025, 1.2, 0], ['glitter', r3(b.w[1]), r3(b.w[1] + 0.6)], ['boom', r3(b.w[1] + 0.1), 0.1]]),
  ['tick', T.ghost + 0.05, 0.015],
  ...gaspCues(T.gasp2, { key: KEY }),
  ...wordPops(T.h2, 2, 0.08, 1, 0.026), ['pop', T.h2Land, 1479.98, 0.05, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...wordPops(T.h3, 2, 0.08, 3, 0.026), ['pop', T.h3Land, 1244.51, 0.05, 0],
  ['whoosh', T.spit[0], 0.7, 0.035], ['pop', T.spit[1], 1479.98, 0.05, 0.3], ['glitter', T.spit[1], T.spit[1] + 0.5],
  ['pop', T.open2, 830.61, 0.04, 0], ['pop', T.open2 + 0.06, 1108.73, 0.03, 0],
  ...twistCues(T.gasp3 - 0.6, { key: KEY, gap: 0.3 }).filter(c => c[1] < T.gasp3 - 0.05),
  ...gaspCues(T.gasp3, { key: KEY }),
  ['pop', T.close2, 880, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...nextTimeCues(T.next, { key: KEY, tease: TEASE }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
