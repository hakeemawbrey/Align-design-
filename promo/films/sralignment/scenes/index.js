// sralignment (60 s vertical, Star Talk Remix of "Two charts walk into a date") · story 0–55.6, then the shared end card.
// Your ♉ star and Juniper's ♎ star walk into a date, each carrying a chart. A ♍ Virgo star with a protractor stacks the
// two charts and measures the angles, like the original explainer: 120° easy (Align), 60° click (Pull), 90° spicy (Push),
// then the bonus round (Venus rules them both) and Push. Pull. Align. Pisces cries in the back.
//   0.00–5.35  "Two charts walk | into a *date.*"  The two stars walk in to a tiny candlelit table. THE STARS: "stop us if
//              you've *heard this one.*" (ba-dum-tss)
//   5.45–11.0  "Meet the | *charts.*"  YOUR STAR: "hi. I brought my *chart.*" (it pops up over its head)  JUNIPER'S STAR:
//              "omg. I brought *mine.*"
//  11.1–16.5   "Now *stack* | them."  The two charts fly together and SLAM into one wheel (you outside, Juniper inside).
//              ♍ VIRGO pops in with a clipboard: "step aside. *I'm measuring.*"
//  16.60       card cut (deal)
//  16.7–22.6   "120°: | *easy.*"  The protractor sweeps Libra Rising → Gemini Moon. VIRGO: "same element. you read rooms
//              *the same way.*"  Heart-eyes; Pisces sobs.
//  22.75–28.6  "60°: they | *click.*"  Libra Sun → Sag Moon. VIRGO: "different, but they *feed each other.*"  THE STARS:
//              "she answers *like you do.*" (the two stars bump and spark)
//  28.70       card cut (shuffle)
//  28.8–35.5   "90°: | *spicy.*"  Taurus Sun ⟂ Aquarius Rising, a jittery pink zap. The two squint at each other; Pisces
//              faints. VIRGO: "you want the last word. *she wants silence.*"  THE STARS: "friction. *not a dealbreaker.*"
//  35.6–42.5   BONUS ROUND "One planet rules | you *both.*"  ♀ Venus boings into the middle and links Taurus and Libra.
//              THE STARS: "Venus runs Taurus *and* Libra."  YOUR STAR: "that explains *the candles.*"
//  42.65       card cut (flip)
//  42.75–47.1  "Push. Pull. *Align.*" on the beat; all three lines flash and the wheel spins. THE STARS: "every angle is
//              *part of the story.*"
//  47.27–51.6  ★ LESSON UNLOCKED: "Don't fear the push. | *Understand* it."  +1 CHEMISTRY
//  51.6–55.45  THE STARS: "read the angles *before the first date.*"  Then "So… what's | *your* sign?" (everyone looks at
//              you). The end card takes over at 55.6.
// One canvas (sky + table + charts + cast), DOM type + dialogue boxes + lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SIGNS, READING, SKY_H, GRAIN_H, ptOf, angOf, drawWheelH, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { pstar, GOLD, BONE, PINK, LAV, INK, MONO, INTER, SERIF, rgba, pop01, popOut, outK, inR, glow, orbChar, sparkBurst, tears, sweat, chip, hearts } from './props.js'

export const DURATION = 60
const KEY = 'Dm'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const BEAT = n => 0.6 + n * 0.5556

const T = {
  h0: 0.2, h0Land: 0.9, h0Out: [5.2, 5.35], walk: [0.3, 1.7], rim: 3.25,
  h1: 5.45, h1Land: 5.85, h1Out: [10.95, 11.1], chartA: 6.3, chartB: 8.8,
  h2: 11.15, h2Out: [16.35, 16.5], toCorner: [11.2, 11.9], stack: [11.6, BEAT(21)], virgo: 13.35,
  cut1: 16.6,
  h3: 16.7, h3Land: 17.1, h3Out: [22.5, 22.65],
  h4: 22.75, h4Land: 23.2, h4Out: [28.45, 28.6], bump: 26.6,
  cut2: 28.7,
  h5: 28.8, h5Land: 29.2, h5Out: [35.35, 35.5], faint: [30.1, 30.45], getUp: [33.4, 33.8], soften: 33.6,
  h6: 35.6, h6Land: 36.05, h6Out: [42.4, 42.55], venus: 36.4, links: [37.0, 37.5],
  cut3: 42.65,
  h7: BEAT(76), h7Out: [47.05, 47.2], flash: BEAT(78), spin: [44.4, 45.8],
  lesson: BEAT(84), lessonOut: [51.4, 51.6],
  h8: 52.45, h8Land: 52.95, out: [55.0, 55.45],
}
// the three readings: [when the protractor starts, you-placement, her-placement, colour, label, degrees]
const ASP = [
  { t: 17.3, you: 195, her: 75, col: READING.align, label: 'ALIGN', deg: 120, youG: 'AC', herG: '☽' },
  { t: 23.2, you: 255, her: 195, col: READING.pull, label: 'PULL', deg: 60, youG: '☽', herG: '☉' },
  { t: 29.25, you: 45, her: 315, col: READING.push, label: 'PUSH', deg: 90, youG: '☉', herG: 'AC' },
]
const YOU_P = [{ lon: 45, g: '☉' }, { lon: 255, g: '☽' }, { lon: 195, g: 'AC' }]   // Taurus Sun · Sag Moon · Libra Rising
const HER_P = [{ lon: 195, g: '☉' }, { lon: 75, g: '☽' }, { lon: 315, g: 'AC' }]   // Libra Sun · Gemini Moon · Aquarius Rising
const TAU = signStar('taurus'), LIB = signStar('libra'), VIR = signStar('virgo'), PIS = signStar('pisces')
const NARR = 'THE STARS', YOU = `${TAU.glyph} YOUR STAR`, HER = `${LIB.glyph} JUNIPER'S STAR`, VIRN = `${VIR.glyph} VIRGO (MEASURING)`
const L = (t, speaker, text, color) => ({ t, speaker, text, color })
const BOXES = [
  [[L(1.7, NARR, "stop us if you've *heard this one.*")], 1.5, 4.9],
  [[L(5.95, YOU, 'hi. I brought my *chart.*', TAU.color), L(8.5, HER, 'omg. I brought *mine.*', LIB.color)], 5.8, 10.95],
  [[L(13.6, VIRN, "step aside. *I'm measuring.*", VIR.color)], 13.4, 16.4],
  [[L(17.6, VIRN, 'same element. you read rooms *the same way.*', READING.align)], 17.4, 21.2],
  [[L(23.0, VIRN, 'different, but they *feed each other.*', READING.pull), L(26.1, NARR, 'she answers *like you do.*', READING.pull)], 22.85, 28.55],
  [[L(29.4, VIRN, 'you want the last word. *she wants silence.*', READING.push), L(32.7, NARR, 'friction. *not a dealbreaker.*', READING.push)], 29.2, 35.45],
  [[L(37.3, NARR, 'Venus runs Taurus *and* Libra.', '#f59cc4'), L(39.95, YOU, 'that explains *the candles.*', TAU.color)], 37.1, 42.45],
  [[L(44.2, NARR, 'every angle is *part of the story.*')], 44.0, 47.05],
  [[L(51.75, NARR, 'read the angles *before the first date.*')], 51.6, 54.75],
]
const ALL = BOXES.flatMap(b => b[0])
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: "Don't fear the push. | *Understand* it.", chip: '+1 CHEMISTRY', accentColor: READING.push, dim: 0.55 }

// ── layout
const WH0 = { cx: 0, cy: 0, rOut: 300, rIn: 240, rGlyph: 270, alpha: 0.92 }
const BIG = { x: 540, y: 865 }
const R_YOU = 334, R_HER = 205
const TABLE = { x: 540, y: 1300 }
const SEAT = { you: { x: 300, y: 1160, s: 230 }, her: { x: 780, y: 1160, s: 230 } }
const CORNER = { you: { x: 150, y: 1335, s: 170 }, her: { x: 368, y: 1352, s: 158 } }
const VIRP = { x: 905, y: 1318, s: 190 }
const PISP = { x: 975, y: 610, s: 104 }
const SMALL = { you: { x: 300, y: 735, r: 150 }, her: { x: 780, y: 735, r: 150 } }

const lerpP = (A, B, e) => ({ x: lerp(A.x, B.x, e), y: lerp(A.y, B.y, e), s: lerp(A.s, B.s, e) })
function starPos(who, t) {
  const seat = SEAT[who], off = who === 'you' ? -260 : 260
  if (t < T.walk[1]) {
    const e = ease.outCubic(prog(t, T.walk[0] + (who === 'her' ? 0.1 : 0), T.walk[1]))
    return { x: lerp(seat.x + off * 2, seat.x, e), y: seat.y - Math.abs(Math.sin(e * Math.PI * 4)) * 26 * (1 - e), s: seat.s }
  }
  if (t < T.toCorner[0]) return seat
  return lerpP(seat, CORNER[who], ease.inOutCubic(prog(t, ...T.toCorner)))
}
const inSeg = (t, a, b) => t >= a && t < b
function moodOf(who, t) {
  const other = who === 'you' ? [1, 0] : [-1, 0]
  if (t < T.walk[1]) return { mood: 'neutral', look: other }
  if (t < T.h1) return { mood: t < T.rim ? 'happy' : 'wink', look: [0, 0] }
  if (t < T.toCorner[0]) return { mood: (who === 'you' ? t > 6.3 : t > 8.8) ? 'sparkle' : 'neutral', look: [0, -1] }
  if (t < T.cut1) return { mood: t > T.virgo ? 'neutral' : 'wide', look: t > T.virgo ? [1, 0] : [1, -1] }
  if (t < T.h4) return { mood: t > ASP[0].t + 0.9 ? 'heart' : 'neutral', look: [1, -1] }
  if (t < T.cut2) return { mood: t > T.bump ? 'happy' : 'sparkle', look: other }
  if (t < T.h6) return { mood: t < T.soften ? 'squint' : 'happy', look: other }
  if (t < T.cut3) return { mood: t > T.links[1] ? 'sparkle' : 'wide', look: [1, -1], blush: t > T.links[1] }
  if (t < T.lesson) return { mood: 'happy', look: [1, -1] }
  if (t < T.h8) return { mood: 'happy', look: other }
  return { mood: who === 'you' ? 'wink' : 'happy', look: [0, 0] }
}
const HOPS = {
  you: [...talkHops(ALL, YOU, { cps: CPS }), T.walk[1], T.stack[1] + 0.05, ASP[0].t + 0.95, T.bump, T.links[1] + 0.1, T.flash, T.h8Land],
  her: [...talkHops(ALL, HER, { cps: CPS }), T.walk[1] + 0.1, T.stack[1] + 0.1, ASP[0].t + 1.0, T.bump, T.links[1] + 0.15, T.flash + 0.05, T.h8Land + 0.08],
  virgo: [...talkHops(ALL, VIRN, { cps: CPS }), T.virgo + 0.35, T.flash + 0.1, T.h8Land + 0.15],
  stars: talkHops(ALL, NARR, { cps: CPS }),
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 168px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const big = { size: 112, accentSize: 168, gap: 0.08, wobble: true, fit: true }
  const H0 = popText(root, 'Two charts walk | into a *date.*', { top: 200, ...big, size: 104, at: T.h0, late: 1, lateAt: T.h0Land, accentColor: PINK })
  const H1 = popText(root, 'Meet the | *charts.*', { top: 200, ...big, at: T.h1, late: 1, lateAt: T.h1Land, accentColor: GOLD })
  const H2 = popText(root, 'Now *stack* them.', { top: 200, ...big, at: T.h2, gap: 0.12, accentColor: GOLD })
  const H3 = popText(root, '120°: | *easy.*', { top: 190, ...big, at: T.h3, late: 1, lateAt: T.h3Land, accentColor: READING.align })
  const H4 = popText(root, '60°: they | *click.*', { top: 190, ...big, at: T.h4, late: 1, lateAt: T.h4Land, accentColor: READING.pull })
  const H5 = popText(root, '90°: | *spicy.*', { top: 190, ...big, at: T.h5, late: 1, lateAt: T.h5Land, accentColor: READING.push })
  const H6 = popText(root, 'One planet rules | you *both.*', { top: 220, ...big, size: 96, accentSize: 150, at: T.h6, late: 1, lateAt: T.h6Land, accentColor: '#f59cc4' })
  const H7 = popText(root, 'Push. Pull. *Align.*', { top: 230, ...big, size: 100, accentSize: 150, at: T.h7, gap: 0.5556, accentColor: READING.align })
  const H8 = popText(root, "So… what's | *your* sign?", { top: 200, ...big, at: T.h8, late: 2, lateAt: T.h8Land, lateGap: 0.14, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.out]]
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1450, width: 960, height: 290, open, close, cps: CPS }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the table (hook)
  function drawTable(t) {
    if (t > T.toCorner[1]) return
    const k = pop01(t, 0.5, 0.4, 2.2) * (1 - ease.inCubic(prog(t, T.toCorner[0], T.toCorner[0] + 0.35)))
    if (k <= 0.01) return
    const { x: cx, y: cy } = TABLE
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-14, 0, 28, 150); x.fillRect(-70, 140, 140, 18)
    x.fillStyle = INK; x.fillRect(-196, -24, 392, 40)
    x.fillStyle = '#efe6d6'; x.fillRect(-188, -18, 376, 22); x.fillStyle = '#f59cc4'; for (let i = -180; i < 180; i += 24) x.fillRect(i, 4, 12, 8)
    // candle
    x.fillStyle = INK; x.fillRect(-14, -84, 28, 64); x.fillStyle = '#fff1d6'; x.fillRect(-9, -80, 18, 58)
    const fl = 1 + 0.15 * Math.sin(t * 17) + 0.08 * Math.sin(t * 29)
    x.fillStyle = '#ffb347'; x.fillRect(-7, -84 - 26 * fl, 14, 26 * fl); x.fillStyle = '#fff4b0'; x.fillRect(-3, -84 - 16 * fl, 6, 14 * fl)
    x.restore()
    glow(x, cx, cy - 100 * k, 160 * k, '#ffb347', 0.8 * k)
  }

  // ── a chart (wheel + one or both sets of placements), drawn around (cx, cy) at scale s
  function placements(set, R, col, k, t, size = 26) {
    set.forEach((p, i) => {
      const q = ptOf(p.lon, R, { cx: 0, cy: 0 }), pk = clamp(k)
      if (pk <= 0) return
      x.save(); x.globalAlpha = pk
      x.fillStyle = 'rgba(14,8,32,0.92)'; x.beginPath(); x.arc(q.x, q.y, size, 0, Math.PI * 2); x.fill()
      x.strokeStyle = col; x.lineWidth = 5; x.stroke()
      x.fillStyle = col; x.font = `700 ${p.g === 'AC' ? 20 : 30}px ${p.g === 'AC' ? MONO : "'DejaVu Sans', 'Segoe UI Symbol', sans-serif"}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(p.g === 'AC' ? 'AC' : p.g + '︎', q.x, q.y + 2)
      x.restore()
    })
  }
  function chartAt(cx, cy, s, rot, k, t, { you = 0, her = 0 } = {}) {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
    drawWheelH(x, { W: WH0, k: clamp(k) })
    // tracks
    x.strokeStyle = rgba(BONE, 0.16 * k); x.lineWidth = 2
    if (you > 0) { x.beginPath(); x.arc(0, 0, R_YOU, 0, Math.PI * 2); x.stroke() }
    if (her > 0) { x.beginPath(); x.arc(0, 0, R_HER, 0, Math.PI * 2); x.stroke() }
    x.restore()
    return { cx, cy, s, rot }
  }
  const toScreen = (C, lon, R) => { const q = ptOf(lon, R, { cx: 0, cy: 0 }), c = Math.cos(C.rot), sn = Math.sin(C.rot); return { x: C.cx + (q.x * c - q.y * sn) * C.s, y: C.cy + (q.x * sn + q.y * c) * C.s } }
  function dots(C, set, R, col, k, t) {
    x.save(); x.translate(C.cx, C.cy); x.rotate(C.rot); x.scale(C.s, C.s); placements(set, R, col, k, t); x.restore()
  }

  function drawCharts(t) {
    if (t < T.chartA) return
    const o = popOut(t, T.out)
    if (t < T.stack[0]) {
      for (const who of ['you', 'her']) {
        const at = who === 'you' ? T.chartA : T.chartB
        if (t < at) continue
        const k = pop01(t, at, 0.4, 2.2) * o, S = SMALL[who]
        const C = chartAt(S.x, S.y, (S.r / 300) * k, Math.sin(t * 0.8 + (who === 'you' ? 0 : 2)) * 0.05, k, t, { [who]: 1 })
        dots(C, who === 'you' ? YOU_P : HER_P, who === 'you' ? R_YOU : R_HER, who === 'you' ? TAU.color : LIB.color, k, t)
        // a string from the chart down to its star (they're holding it up)
        const sp = starPos(who, t)
        x.save(); x.strokeStyle = rgba(BONE, 0.5 * k); x.lineWidth = 3; x.beginPath(); x.moveTo(S.x, S.y + S.r * k); x.lineTo(sp.x, sp.y - sp.s * 0.42); x.stroke(); x.restore()
      }
      return
    }
    // stacking: both fly to the middle, scale up and slam
    const e = ease.inCubic(prog(t, ...T.stack))
    const land = t - T.stack[1]
    const squash = land > 0 ? 1 + 0.07 * Math.sin(land * 26) * Math.exp(-land * 6) : 1
    const spinK = ease.inOutCubic(prog(t, ...T.spin))
    const rot = spinK * Math.PI * 2
    const bump = 1 + 0.06 * Math.sin(Math.PI * spinK)
    if (land < 0) {
      for (const who of ['you', 'her']) {
        const S = SMALL[who]
        const C = chartAt(lerp(S.x, BIG.x, e), lerp(S.y, BIG.y, e), lerp(S.r / 300, 1, e), (who === 'you' ? -1 : 1) * e * 1.2, 1, t, { [who]: 1 })
        dots(C, who === 'you' ? YOU_P : HER_P, who === 'you' ? R_YOU : R_HER, who === 'you' ? TAU.color : LIB.color, 1, t)
      }
      return
    }
    const C = chartAt(BIG.x, BIG.y, squash * bump * clamp(o), rot, clamp(o), t, { you: 1, her: 1 })
    drawAspects(t, C)
    dots(C, YOU_P, R_YOU, TAU.color, clamp(o), t)
    dots(C, HER_P, R_HER, LIB.color, clamp(o), t)
    drawVenus(t, C)
    // slam shockwave
    const sp = prog(t, T.stack[1], T.stack[1] + 0.6)
    if (sp > 0 && sp < 1) { x.save(); x.globalAlpha = (1 - sp) * 0.8; x.strokeStyle = '#fff6dc'; x.lineWidth = 12 * (1 - sp); x.beginPath(); x.arc(BIG.x, BIG.y, 300 + sp * 260, 0, Math.PI * 2); x.stroke(); x.restore() }
    sparkBurst(x, t, BIG.x, BIG.y, T.stack[1], { n: 18, R: 460, size: 28, seed: 3 })
    // legend chips: YOU outside, JUNIPER inside
    const lk = pop01(t, T.stack[1] + 0.3, 0.3, 2.4) * (1 - prog(t, T.cut1 - 0.3, T.cut1))
    if (lk > 0) {
      chip(x, 'YOU · OUTSIDE', 290, 478, { size: 26, k: lk, fg: TAU.color, border: TAU.color })
      chip(x, 'JUNIPER · INSIDE', 760, 478, { size: 26, k: lk, fg: LIB.color, border: LIB.color })
    }
  }

  // ── the three readings: a protractor sweep + count, then the chord stays
  function drawAspects(t, C) {
    const dimV = t > T.h6 && t < T.flash ? 0.35 : 1
    ASP.forEach((a, i) => {
      if (t < a.t) return
      const A_ = toScreen(C, a.you, R_YOU), B_ = toScreen(C, a.her, R_HER)
      const lk = ease.inOutCubic(prog(t, a.t + 0.9, a.t + 1.3))
      const active = (i === 0 && t < T.h4) || (i === 1 && inSeg(t, T.h4, T.cut2)) || (i === 2 && inSeg(t, T.cut2, T.h6))
      // the protractor (only while its beat is on)
      if (active) {
        const pk = pop01(t, a.t, 0.3, 2.2)
        const sw = ease.inOutCubic(prog(t, a.t + 0.2, a.t + 1.0))
        const a0 = angOf(a.you) + C.rot, a1 = angOf(a.her) + C.rot
        let d = a1 - a0; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2
        x.save(); x.globalAlpha = clamp(pk)
        // the two spokes
        x.setLineDash([10, 10]); x.strokeStyle = rgba(BONE, 0.7); x.lineWidth = 4
        for (const P of [A_, B_]) { x.beginPath(); x.moveTo(BIG.x, BIG.y); x.lineTo(P.x, P.y); x.stroke() }
        x.setLineDash([])
        // the protractor body: a translucent half-disc of ticks
        x.fillStyle = rgba(a.col, 0.18); x.beginPath(); x.moveTo(BIG.x, BIG.y); x.arc(BIG.x, BIG.y, 140 * pk, a0, a0 + d * sw, d < 0); x.closePath(); x.fill()
        x.strokeStyle = a.col; x.lineWidth = 8; x.shadowColor = a.col; x.shadowBlur = 18
        x.beginPath(); x.arc(BIG.x, BIG.y, 140 * pk, a0, a0 + d * sw, d < 0); x.stroke()
        x.restore()
        // the count
        const n = Math.round(a.deg * sw)
        x.save(); x.globalAlpha = clamp(pk); x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(n + '°', BIG.x + 3, BIG.y + 5); x.fillStyle = sw >= 1 ? a.col : BONE; x.fillText(n + '°', BIG.x, BIG.y)
        x.restore()
      }
      if (lk <= 0) return
      // the chord: smooth for align/pull, a jittery zap for push
      const pulse = 1 + 0.5 * Math.exp(-Math.max(0, t - a.t - 1.3) * 4) + (inR(t, [T.flash, T.flash + 0.6]) ? 0.6 * (1 - prog(t, T.flash, T.flash + 0.6)) : 0)
      x.save(); x.globalAlpha = dimV * (active || t > T.flash ? 1 : 0.6); x.strokeStyle = a.col; x.lineCap = 'round'; x.lineJoin = 'round'; x.lineWidth = 10 * pulse; x.shadowColor = a.col; x.shadowBlur = 26
      x.beginPath(); x.moveTo(A_.x, A_.y)
      const N = 24, nx = -(B_.y - A_.y), ny = B_.x - A_.x, nl = Math.hypot(nx, ny) || 1
      for (let s = 1; s <= Math.round(N * lk); s++) {
        const u = s / N, j = a.label === 'PUSH' && s < N ? Math.sin(s * 2.3 + Math.floor(t * 14)) * 16 : 0
        x.lineTo(lerp(A_.x, B_.x, u) + nx / nl * j, lerp(A_.y, B_.y, u) + ny / nl * j)
      }
      x.stroke(); x.restore()
      if (lk >= 1) {
        const ck = pop01(t, a.t + 1.3, 0.3, 2.4) * dimV * (1 - prog(t, T.h8 - 0.3, T.h8))   // labels off before the last line (no 'Align' in the final 2 s)
        chip(x, a.label, (A_.x + B_.x) / 2, (A_.y + B_.y) / 2, { size: 28, k: ck, fg: a.col, border: a.col })
      }
      sparkBurst(x, t, B_.x, B_.y, a.t + 1.3, { n: 10, R: 110, size: 22, seed: 11 + i, cols: [a.col, '#fff3e0'] })
    })
  }

  // ── Venus: the bonus round
  function drawVenus(t, C) {
    if (t < T.venus || t > T.cut3 + 0.05) return
    const k = pop01(t, T.venus, 0.5, 3) * popOut(t, [T.cut3 - 0.3, T.cut3])
    if (k <= 0.01) return
    const glyphs = [{ lon: 45, at: T.links[0] }, { lon: 195, at: T.links[1] }]
    for (const g of glyphs) {
      const lk = ease.outCubic(prog(t, g.at, g.at + 0.35)) * clamp(k)
      if (lk <= 0) continue
      const P = toScreen(C, g.lon, 270)
      x.save(); x.strokeStyle = '#f59cc4'; x.lineWidth = 9; x.lineCap = 'round'; x.shadowColor = '#f59cc4'; x.shadowBlur = 24
      x.beginPath(); x.moveTo(BIG.x, BIG.y); x.lineTo(lerp(BIG.x, P.x, lk), lerp(BIG.y, P.y, lk)); x.stroke(); x.restore()
      if (lk >= 1) { glow(x, P.x, P.y, 90, '#f59cc4', 1); hearts(x, t, P.x, P.y - 30, g.at + 0.35, { n: 3, px: 5, spread: 60 }) }
      sparkBurst(x, t, P.x, P.y, g.at + 0.35, { n: 8, R: 90, size: 20, seed: 30 + g.lon, cols: ['#f59cc4', GOLD] })
    }
    orbChar(x, BIG.x, BIG.y, 70, t, { color: '#f59cc4', mood: t > T.links[1] + 0.3 ? 'heart' : 'happy', seed: 4, pop: k })
    x.save(); x.globalAlpha = clamp(k); x.font = `700 40px 'DejaVu Sans', sans-serif`; x.textAlign = 'center'; x.fillStyle = '#fff0f6'; x.fillText('♀︎', BIG.x, BIG.y + 112); x.restore()
    sparkBurst(x, t, BIG.x, BIG.y, T.venus + 0.1, { n: 16, R: 260, size: 26, seed: 8, cols: ['#f59cc4', '#ffd2e6', GOLD] })
  }

  // ── the cast
  function drawCouple(t) {
    const o = popOut(t, T.out)
    if (o <= 0.01) return
    const R = {}
    for (const who of ['her', 'you']) {
      const p = starPos(who, t), st = moodOf(who, t), s = who === 'you' ? TAU : LIB
      // the bump: they lean in on "click"
      let dx = 0
      if (inR(t, [T.bump - 0.2, T.bump + 0.6])) dx = Math.sin(Math.PI * prog(t, T.bump - 0.2, T.bump + 0.6)) * 34 * (who === 'you' ? 1 : -1)
      // the squint-off: they lean toward each other, then back
      if (inR(t, [T.h5Land, T.soften])) dx = 16 * ease.outCubic(prog(t, T.h5Land, T.h5Land + 0.4)) * (who === 'you' ? 1 : -1)
      R[who] = drawStarChar(x, p.x + dx, p.y, p.s, t, { color: s.color, glyph: p.s > 120 ? s.glyph : null, mood: st.mood, look: st.look, blush: st.blush, hops: HOPS[who], seed: who === 'you' ? 5 : 9, pop: o })
    }
    if (inR(t, [T.bump, T.bump + 0.6])) sparkBurst(x, t, (R.you.x + R.her.x) / 2, R.you.y - 20, T.bump, { n: 10, R: 120, size: 22, seed: 6, cols: [READING.pull, BONE] })
    if (inR(t, [ASP[0].t + 0.95, T.h4])) { hearts(x, t, R.you.x, R.you.top, ASP[0].t + 1.0, { n: 4, px: 6 }); hearts(x, t, R.her.x, R.her.top, ASP[0].t + 1.1, { n: 4, px: 6 }) }
    if (inR(t, [T.h5Land + 0.3, T.soften])) for (const who of ['you', 'her']) sweat(x, t, R[who].x + 40, R[who].top + 10, 5)
  }
  function drawVirgo(t) {
    if (t < T.virgo) return
    const o = popOut(t, T.out), k = pop01(t, T.virgo, 0.4, 2.4) * o
    if (k <= 0.01) return
    let mood = 'squint', look = [-1, -1]
    if (t > T.cut1 && t < ASP[0].t + 1.0) look = [-1, -1]
    if (inR(t, [ASP[2].t + 1.2, T.soften])) mood = 'wide'
    if (t > T.h6) mood = t > T.links[1] ? 'happy' : 'neutral'
    if (t > T.flash) mood = 'happy'
    if (t > T.h8) { mood = 'neutral'; look = [0, 0] }
    const r = drawStarChar(x, VIRP.x, VIRP.y, VIRP.s, t, { color: VIR.color, glyph: VIR.glyph, mood, look, hops: HOPS.virgo, seed: 13, pop: k })
    // the clipboard (and a pencil that scribbles while measuring)
    const cx = r.x - r.size * 0.52, cy = r.y + r.size * 0.06
    x.save(); x.globalAlpha = clamp(k); x.translate(cx, cy); x.rotate(-0.18)
    x.fillStyle = INK; x.fillRect(-46, -62, 92, 124); x.fillStyle = '#b07a3a'; x.fillRect(-40, -56, 80, 112)
    x.fillStyle = BONE; x.fillRect(-32, -42, 64, 90); x.fillStyle = '#8a8fa3'; x.fillRect(-14, -64, 28, 14)
    x.fillStyle = INK; const ticks = Math.min(3, ASP.filter(a => t > a.t + 1.3).length)
    for (let i = 0; i < 3; i++) { x.fillRect(-24, -30 + i * 26, 30, 5); if (i < ticks) { x.fillStyle = '#2fb36a'; x.fillRect(12, -36 + i * 26, 6, 12); x.fillRect(6, -30 + i * 26, 6, 6); x.fillStyle = INK } }
    const scrib = ASP.some(a => inR(t, [a.t, a.t + 1.3]))
    x.fillStyle = GOLD; x.fillRect(22 + (scrib ? Math.sin(t * 30) * 8 : 0), -20 + (scrib ? Math.cos(t * 23) * 6 : 0), 10, 50)
    x.restore()
  }
  function drawPisces(t) {
    const o = popOut(t, T.out), k = pop01(t, 2.4, 0.4, 2.4) * o
    if (k <= 0.01) return
    let mood = 'neutral', look = [-1, 1], rot = 0, dy = 0, cry = 0
    if (t < T.cut1) mood = t > T.stack[1] ? 'wide' : 'happy'
    else if (t < T.h4) { mood = t > ASP[0].t + 1.0 ? 'squint' : 'neutral'; cry = t > ASP[0].t + 1.0 ? 1 : 0 }
    else if (t < T.cut2) mood = 'sparkle'
    else if (t < T.h6) {
      const f = ease.outCubic(prog(t, ...T.faint)) * (1 - ease.inOutCubic(prog(t, ...T.getUp)))
      rot = -1.5 * f; dy = 40 * f; mood = f > 0.5 ? 'sleepy' : 'wide'
    } else if (t < T.cut3) { mood = t > T.links[1] ? 'heart' : 'neutral'; cry = t > T.links[1] ? 0.6 : 0 }
    else mood = 'happy'
    x.save(); x.translate(PISP.x, PISP.y + dy); x.rotate(rot)
    const r = drawStarChar(x, 0, 0, PISP.s, t, { color: PIS.color, mood, look, seed: 17, pop: k, glow: 0.8, zzz: false, hops: [2.7, ASP[0].t + 1.2, T.getUp[1], T.flash] })
    x.restore()
    if (cry) tears(x, t, PISP.x, PISP.y + r.y - 4, 14, { amount: cry * clamp(k), cell: 7, seed: 3, color: '#a8e6ff' })
    if (rot < -0.5) for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.094; pstar(x, PISP.x + Math.cos(a) * 50, PISP.y + dy - 70 + Math.sin(a) * 14, 20, 1, [GOLD, BONE, PINK][i]) }
  }
  function drawEyebrow(t) {
    const k = pop01(t, T.h6 - 0.15, 0.3, 2.6) * outK(t, T.h6Out)
    if (t < T.h6 - 0.15 || k <= 0) return
    chip(x, '★ BONUS ROUND ★', 540, 160, { size: 34, k, fg: INK, bg: '#f59cc4', border: BONE })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        drawTable(t)
        drawCharts(t)
        drawPisces(t)
        drawCouple(t)
        drawVirgo(t)
        drawEyebrow(t)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change); the default selection keeps 16.6 (→ 120°), 28.7 (→ 90°) and 42.65
// (→ Push. Pull. Align.), one per 12–14 s. The others play as plain beat changes.
const CUTS = [5.38, { t: T.cut1, kind: 'deal' }, 22.7, { t: T.cut2, kind: 'shuffle' }, 35.55, { t: T.cut3, kind: 'flip' }, 47.2]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (D minor; pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [587.33, 659.25, 698.46, 783.99, 880, 1046.5, 1174.66]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.08, base), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const chipS = (t, f, len, o = {}) => ['chip', r3(t), f, len, { gain: 0.05, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.7, rev: 0.12, dly: 0.1, bus: 'lead', ...o }]
const ticks = (a, b, gap, gain = 0.02) => { const o = []; for (let t = a; t < b; t += gap) o.push(['tick', r3(t), gain]); return o }
const rimshot = t => [['tom', r3(t), 150, { gain: 0.22, decay: 0.15, rev: 0.1 }], ['tom', r3(t + 0.18), 110, { gain: 0.24, decay: 0.2, rev: 0.1 }], ['crash', r3(t + 0.42), { gain: 0.06, len: 1.0 }]]
const zap = t => [chipS(t, 2400, 0.08, { wave: 'noise', gain: 0.05, bus: 'drums', decay: 0.04, rev: 0.05, dly: 0 }), chipS(t + 0.1, 1900, 0.08, { wave: 'noise', gain: 0.05, bus: 'drums', decay: 0.04, rev: 0.05, dly: 0 }), chipS(t + 0.2, 2800, 0.12, { wave: 'noise', gain: 0.05, bus: 'drums', decay: 0.05, rev: 0.05, dly: 0 })]
const womp = t => [[440, 0], [415.3, 0.3], [392, 0.6]].map(([f, d]) => chipS(t + d, f, 0.26, { duty: 0.5, gain: 0.04, slide: -0.6 })).concat([chipS(t + 0.9, 370, 0.7, { duty: 0.5, gain: 0.04, slide: -1.5, vib: 0.03 })])
const boing = t => [chipS(t, 330, 0.35, { slide: 2.2, duty: 0.5, gain: 0.05, vib: 0.08 })]
const sob = (t0, n) => Array.from({ length: n }, (_, i) => chipS(t0 + i * 0.28, [659.25, 622.25, 587.33][i % 3], 0.18, { duty: 0.5, gain: 0.028, slide: -0.4, vib: 0.05 }))

export const CUES = [
  ...head(T.h0, 5, T.h0Land, 0),
  ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.walk[0] + 0.1 + i * 0.17), 0.03]),   // little footsteps
  ['pop', 0.6, 880, 0.03, 0], ['bell', 1.0, 1760, 0.02, 1.0, 0],                           // the candle
  ...rimshot(T.rim),
  ...head(T.h1, 2, T.h1Land, 2),
  ['pop', T.chartA, 783.99, 0.045, -0.4], ['pluck', T.chartA + 0.05, 1174.66, 0.035, 0.5, -0.4],
  ['pop', T.chartB, 880, 0.045, 0.4], ['pluck', T.chartB + 0.05, 1318.51, 0.035, 0.5, 0.4],
  ...wordPops(T.h2, 3, 0.12, 3), ['whoosh', T.stack[0], 0.6, 0.05], ['boom', T.stack[1], 0.25], ['crash', T.stack[1], { gain: 0.07, len: 1.6 }], ['glitter', T.stack[1], T.stack[1] + 0.6],
  ['pop', T.virgo, 1046.5, 0.045, 0.5], ['pop', T.virgo + 0.08, 1318.51, 0.035, 0.5],
  // the readings
  ...head(T.h3, 1, T.h3Land, 0), ...head(T.h4, 2, T.h4Land, 2), ...head(T.h5, 1, T.h5Land, 4),
  ...ASP.flatMap((a, i) => [['pop', r3(a.t), 659.25, 0.035, 0], ...ticks(a.t + 0.2, a.t + 1.0, 0.06, 0.022), ['pluck', r3(a.t + 1.0), [1174.66, 1046.5, 880][i], 0.045, 0.7, 0], ['bell', r3(a.t + 1.3), [1760, 1567.98, 1318.51][i], 0.03, 1.2, 0], ['glitter', r3(a.t + 1.3), r3(a.t + 1.7)]]),
  ...sob(ASP[0].t + 1.3, 5),
  ['pop', T.bump, 1318.51, 0.05, 0], ['pluck', T.bump + 0.03, 1760, 0.035, 0.5, 0],
  ...zap(ASP[2].t + 1.0), ...zap(ASP[2].t + 1.6),
  ['whoosh', T.faint[0], 0.35, 0.04], ['boom', T.faint[1], 0.12], ...womp(T.faint[1] + 0.2),
  ['pop', T.getUp[1], 1046.5, 0.035, 0.5], ['bell', T.soften, 1318.51, 0.025, 1.4, 0],
  // bonus round
  ['pop', T.h6 - 0.15, 1318.51, 0.04, 0], ['pop', T.h6 - 0.08, 1760, 0.03, 0], ...head(T.h6, 4, T.h6Land, 1),
  ...boing(T.venus), ['glitter', T.venus + 0.1, T.venus + 0.6],
  ...T.links.flatMap((t, i) => [['pluck', r3(t), [1174.66, 1567.98][i], 0.04, 0.7, (i ? 0.3 : -0.3)], ['pop', r3(t + 0.35), 1318.51, 0.035, 0]]),
  // push pull align
  ...[0, 1, 2].map(i => ['pop', r3(T.h7 + i * 0.5556), [783.99, 987.77, 1174.66][i], 0.05, 0]), ['pluck', T.flash, 1174.66, 0.05, 0.8, 0],
  ['crash', T.flash, { gain: 0.06, len: 1.6 }], ['glitter', T.flash, T.flash + 0.8], ['whoosh', T.spin[0], 1.2, 0.04], ['bell', T.spin[1], 2349.32, 0.03, 1.4, 0],
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // the last line
  ...head(T.h8, 4, T.h8Land, 3), ['pop', T.h8Land + 0.14, 1567.98, 0.04, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...BOXES.flatMap(([lines]) => talkCues(lines, { cps: CPS, pitch: { [NARR]: 784, [YOU]: 659.25, [HER]: 987.77, [VIRN]: 880 } })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const __CHECK = { boxes: BOXES, lesson: LESSON }
