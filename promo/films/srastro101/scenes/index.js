// srastro101 (60 s vertical, Star Talk Remix of "Astrology in 60 seconds") · story 0–55.6, then the shared end card.
// THE STARS teach astrology against a real stopwatch, in a tiny graduation cap with a pointer stick. Same beats as the
// original explainer (the zodiac road, the 12 slices, the elements, the planets as characters, the chart as a baby photo
// of the sky, the Big Three) and the same last line, now guided by the stars, with Pisces sobbing in the back.
//   0.00–4.40  "Astrology in | 60 seconds. | *Go.*"  The teacher star blows a whistle; the stopwatch starts (0:59…).
//              THE STARS: "ok. sixty seconds. *keep up.*"  Pisces pops in, sweating at the clock.
//   4.40–10.6  "The Sun drives | the *same loop.*"  A road loop; the Sun (in shades) drives one lap. THE STARS: "every
//              year, the Sun drives *one lap.*" → "that road? it's called *the zodiac.*" (a road sign pops: THE ZODIAC)
//  10.6–16.3   "Everybody's | on the *road.*"  The Moon zooms laps; Mercury, Venus, Mars cruise; Saturn crawls, asleep.
//              THE STARS: "the Moon laps it *every month.*" → "Saturn? 29 years. *take your time.*" (eye-roll)
//  16.40       card cut (deal)
//  16.5–22.3   "Slice it | into *12.*"  The loop becomes the 12-slice wheel. THE STARS: "30° a slice. *Aries* goes first."
//              ♈ ARIES skids into slot one: "FIRST. I'M FIRST. *write it down.*" The other eleven pop into their slots.
//  22.4–28.4   "Every sign gets | an *element.*"  Fire, earth, air, water triangles snap in with chips (go go go · build
//              it · talk it out · feel everything); Pisces bawls. THE STARS: "Pisces. it was *one word.*"
//  28.50       card cut (shuffle)
//  28.6–35.0   "Planets are | the *characters.*"  Five planet characters: Sun main character (shades), Moon your
//              feelings, Mercury your texts (phone), Venus your crush (heart-eyes), Mars your temper (steam).
//              THE STARS: "Mars is why you *typed in caps.*"
//  35.1–40.4   "Your chart: | the sky the | *second* you were born."  Slot-machine spin, SNAP onto May 12 1998, 5 PM,
//              Tulsa; a gold frame + plaque "BABY PHOTO · 1998". THE STARS: "a baby photo. *of space.*" (Pisces: hearts)
//  40.50       card cut (flip)
//  40.6–46.6   "Your | *Big Three.*"  THE STARS: "Sun, Moon, Rising. *meet yourselves.*"  Three cards with the app's copy.
//  46.71–51.1  ★ LESSON UNLOCKED: "You're not one sign. | You're a whole *sky.*"  +1 FLUENT
//  51.1–55.45  THE STARS: "Card first. *Face last.*" (a veiled mystery card deals in), then "Now you speak | *astrology.*";
//              the teacher slaps the stopwatch: 0:07 · NEW RECORD. The end card takes over at 55.6.
// One canvas (sky + diagrams + cast), DOM type + dialogue boxes + lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SIGNS, ELEMENT_COLOR, SKY_H, GRAIN_H, ptOf, drawWheelH, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { pstar, GOLD, BONE, PINK, LAV, INK, MONO, INTER, SERIF, rgba, pop01, popOut, outK, inR, glow, orbChar, stopwatch, gradCap, pointer, sparkBurst, tears, sweat, chip, hearts, steam, phone, frame } from './props.js'

export const DURATION = 60
const KEY = 'D'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const BEAT = n => 0.6 + n * 0.5556

// ── the timeline
const T = {
  h0: 0.2, h0Land: 0.95, h0Out: [4.2, 4.38], whistle: 1.05, watch: 1.1, pis: 2.7, toCorner: [4.3, 4.9],
  // the road
  h1: 4.5, h1Land: 4.95, h1Out: [10.45, 10.62], road: [4.6, 5.3], sun: 5.05, lap: [5.6, 8.0], sign: 9.05,
  // everybody
  h2: 10.75, h2Land: 11.2, h2Out: [16.8, 16.96], moon: 11.3, merc: 11.6, venus: 11.8, mars: 12.0, saturn: 13.2, womp: 15.3,
  cut1: 17.0,
  // slices
  h3: 17.1, h3Land: 17.55, h3Out: [22.75, 22.9], wheel: [17.15, 17.9], aries: [18.5, 18.95], ring: 21.2,
  // elements
  h4: 23.0, h4Land: 23.5, h4Out: [29.95, 30.1], tri: [23.75, 24.45, 25.15, 25.85], chipsOut: [27.0, 27.25], sob: 26.0,
  cut2: 30.15,
  // planets
  h5: 30.25, h5Land: 30.7, h5Out: [35.5, 35.65], rows: [30.9, 31.4, 31.9, 32.4, 32.9], rowsOut: [35.4, 35.65], marsLine: 33.4,
  // the chart
  h6: 35.75, h6Out: [40.85, 41.0], wheel2: [35.8, 36.2], spin: 36.0, snap: BEAT(67), pill: [36.2, 37.4], pillOut: [38.05, 38.3], photo: 38.2, chartOut: [40.6, 40.95],
  cut3: 41.0,
  // big three
  h7: 41.1, h7Land: 41.5, h7Out: [46.35, 46.5], cards: [41.95, 43.3, 44.65], cardsOut: [46.25, 46.55],
  // lesson
  lesson: BEAT(83), lessonOut: [50.9, 51.1],
  // tie-in + last line
  deal: [51.2, 51.75], dealOut: [53.05, 53.4], h8: 52.6, h8Land: 53.05, watchBig: [53.25, 53.8], stop: BEAT(96), out: [55.0, 55.45],
}
const NARR = 'THE STARS', ARI = '♈ ARIES STAR'
const ARI_COL = signStar('aries').color
const LINES1 = [
  { t: 1.5, speaker: NARR, text: 'ok. sixty seconds. *keep up.*' },
  { t: 5.05, speaker: NARR, text: 'every year, the Sun drives *one lap.*' },
  { t: 8.0, speaker: NARR, text: "that road? it's called *the zodiac.*" },
  { t: 10.95, speaker: NARR, text: 'the Moon laps it *every month.*' },
  { t: 13.6, speaker: NARR, text: 'Saturn? 29 years. *take your time.*' },
]
const LINES2 = [
  { t: 17.45, speaker: NARR, text: '30° a slice. *Aries* goes first.', color: ARI_COL },
  { t: 20.3, speaker: ARI, text: "FIRST. I'M FIRST. *write it down.*", color: ARI_COL },
]
const LINES3 = [{ t: 27.45, speaker: NARR, text: 'Pisces. it was *one word.*', color: '#7c74f0' }]
const LINES4 = [{ t: 33.4, speaker: NARR, text: 'Mars is why you *typed in caps.*', color: '#ff6a4a' }]
const LINES5 = [{ t: 38.35, speaker: NARR, text: 'a baby photo. *of space.*' }]
const LINES6 = [{ t: 41.5, speaker: NARR, text: 'Sun, Moon, Rising. *meet yourselves.*' }]
const LINES7 = [{ t: 51.35, speaker: NARR, text: 'Card first. *Face last.*' }]
const BOXES = [
  [LINES1, 1.3, 16.75], [LINES2, 17.25, 23.45], [LINES3, 27.3, 30.05], [LINES4, 33.2, 36.0], [LINES5, 38.15, 40.9],
  [LINES6, 41.3, 44.75], [LINES7, 51.15, 53.9],
]
const ALL = BOXES.flatMap(b => b[0])
const CPS = 28
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
const LESSON = { at: T.lesson, out: T.lessonOut, text: "You're not one sign. | You're a whole *sky.*", chip: '+1 FLUENT', accentColor: GOLD, dim: 0.55 }

// ── layout
const D = { cx: 540, cy: 870 }
const RR = 300                                   // the road radius
const WH = { cx: D.cx, cy: D.cy, rOut: 300, rIn: 240, rGlyph: 270, alpha: 0.92 }
const TCH = { x: 150, y: 1318, s: 190 }, TCH0 = { x: 540, y: 1030, s: 330 }
const PIS = { x: 955, y: 1335, s: 124 }
const WATCH = { x: 100, y: 116, r: 54 }, WATCH_BIG = { x: 540, y: 880, r: 140 }, TCH_END = { x: 250, y: 1335, s: 230 }
const PL = {
  sun: { color: '#f6c45a', name: 'Sun', role: 'main character' },
  moon: { color: '#dcd6f2', name: 'Moon', role: 'your feelings' },
  mercury: { color: '#9fd2e8', name: 'Mercury', role: 'your texts' },
  venus: { color: '#f59cc4', name: 'Venus', role: 'your crush' },
  mars: { color: '#f0603a', name: 'Mars', role: 'your temper' },
}
const ROWS = ['sun', 'moon', 'mercury', 'venus', 'mars']
const BIRTH = { sun: 51.8, moon: 247.2, mercury: 27.2, venus: 9.4, mars: 51.4 }   // May 12 1998, 5 PM, Tulsa
const LANE = { sun: 205, moon: 178, mercury: 151, venus: 124, mars: 97 }
const SPINV = { sun: 380, moon: 520, mercury: 450, venus: 340, mars: 290 }
const BIG3 = [
  { label: 'SUN · TAURUS', id: 'taurus', col: GOLD, mood: 'happy', line: ['You at brunch.', 'Orders for the table.'] },
  { label: 'MOON · SAGITTARIUS', id: 'sagittarius', col: '#5f95ff', mood: 'sparkle', line: ['You at 2am. Plans the', "trip you won't book."] },
  { label: 'RISING · LIBRA', id: 'libra', col: '#c070ff', mood: 'wink', line: ['You to strangers. Charming.', 'Suspiciously good lighting.'] },
]

// ── motion on the road
const walked = (t, t0, w) => t <= t0 ? 0 : w * (t - t0)
const sunLon = t => 360 * ease.inOutCubic(prog(t, ...T.lap)) + walked(t, T.lap[1], 24)
const LON = {
  sun: sunLon,
  moon: t => 150 + walked(t, T.moon, 300),
  mercury: t => sunLon(t) + 22 * Math.sin(t * 1.4),
  venus: t => sunLon(t) - 40 + 10 * Math.sin(t * 0.9),
  mars: t => 205 + walked(t, T.mars, 13),
  saturn: t => 300 + walked(t, T.saturn, 1.5),
}
const ROAD_R = { sun: RR, moon: RR, mercury: RR, venus: RR, mars: RR, saturn: RR }
const ORB_R = { sun: 40, moon: 30, mercury: 22, venus: 27, mars: 26, saturn: 34 }
const ORB_AT = { sun: T.sun, moon: T.moon, mercury: T.merc, venus: T.venus, mars: T.mars, saturn: T.saturn }
const ORB_COL = { sun: PL.sun.color, moon: PL.moon.color, mercury: PL.mercury.color, venus: PL.venus.color, mars: PL.mars.color, saturn: '#e6d39a' }

// ── who's where
function teacherPos(t) {
  if (t < T.toCorner[0]) return TCH0
  if (t > T.watchBig[0]) { const e = ease.inOutCubic(prog(t, ...T.watchBig)); return { x: lerp(TCH.x, TCH_END.x, e), y: lerp(TCH.y, TCH_END.y, e) - Math.sin(Math.PI * e) * 80, s: lerp(TCH.s, TCH_END.s, e) } }
  const e = ease.inOutCubic(prog(t, ...T.toCorner))
  return { x: lerp(TCH0.x, TCH.x, e), y: lerp(TCH0.y, TCH.y, e) - Math.sin(Math.PI * e) * 120, s: lerp(TCH0.s, TCH.s, e) }
}
function teacherState(t) {
  if (t < T.whistle + 0.6) return { mood: t < T.whistle ? 'neutral' : 'squint', look: [0, 0] }
  if (t < 4.3) return { mood: 'happy', look: [0, 0] }
  if (t < LT1[4].done) return { mood: 'neutral', look: [1, -1] }
  if (t < T.cut1) return { mood: 'eyeroll' }
  if (t < LT2[1].start) return { mood: 'neutral', look: [1, -1] }
  if (t < T.ring) return { mood: 'squint', look: [1, -1] }
  if (t < T.sob) return { mood: 'happy', look: [1, -1] }
  if (t < T.cut2) return { mood: t < LINES3[0].t ? 'wide' : 'eyeroll', look: [1, 0] }
  if (t < T.marsLine) return { mood: 'neutral', look: [1, -1] }
  if (t < T.h6) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.photo) return { mood: 'neutral', look: [1, -1] }
  if (t < T.cut3) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.lesson) return { mood: 'happy', look: [1, -1] }
  if (t < T.stop) return { mood: 'sparkle', look: [1, -1] }
  return { mood: 'heart' }
}
function pisState(t) {
  if (t < T.toCorner[1]) return { mood: 'wide', look: [-1, -1], blink: false, sweat: true }
  if (t < T.tri[3]) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.cut2 + 1.2) return { mood: 'squint', tears: 1, look: [0, 0] }
  if (t < T.photo + 0.2) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.cut3) return { mood: 'heart', tears: 0.7 }
  return { mood: 'happy', look: [-1, -1] }
}
const T_HOPS = [...talkHops(ALL, NARR, { cps: CPS }), T.whistle, T.toCorner[1], T.stop, T.lesson + 0.1]
const A_HOPS = [...talkHops(ALL, ARI, { cps: CPS }), T.aries[1] + 0.1]
const P_HOPS = [T.pis + 0.3, T.tri[3] + 0.15, T.sob + 0.4, T.sob + 0.8, T.photo + 0.3, T.stop + 0.1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 54px Inter", "700 44px Inter", "italic 500 168px 'EB Garamond'", "italic 500 62px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const CARD = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-profile-3.png' })

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const big = { size: 112, accentSize: 168, gap: 0.08, wobble: true, fit: true }
  const H0 = popText(root, 'Astrology in | 60 seconds. | *Go.*', { top: 190, ...big, size: 104, at: T.h0, late: 1, lateAt: T.h0Land, accentColor: GOLD })
  const H1 = popText(root, 'The Sun drives | the *same loop.*', { top: 200, ...big, size: 104, at: T.h1, late: 2, lateAt: T.h1Land, accentColor: GOLD })
  const H2 = popText(root, "Everybody's | on the *road.*", { top: 200, ...big, at: T.h2, late: 1, lateAt: T.h2Land, accentColor: PINK })
  const H3 = popText(root, 'Slice it | into *12.*', { top: 200, ...big, at: T.h3, late: 1, lateAt: T.h3Land, accentColor: ARI_COL })
  const H4 = popText(root, 'Every sign gets | an *element.*', { top: 200, ...big, size: 100, accentSize: 150, at: T.h4, late: 1, lateAt: T.h4Land, accentColor: ELEMENT_COLOR.air })
  const H5 = popText(root, 'Planets are | the *characters.*', { top: 190, ...big, size: 104, accentSize: 150, at: T.h5, late: 1, lateAt: T.h5Land, accentColor: GOLD })
  const H6 = popText(root, 'Your chart: | the sky the *second* | you were born.', { top: 160, ...big, size: 84, accentSize: 120, at: T.h6, accentColor: GOLD })
  const H7 = popText(root, 'Your | *Big Three.*', { top: 170, ...big, at: T.h7, late: 2, lateAt: T.h7Land, accentColor: GOLD })
  const H8 = popText(root, 'Now you speak | *astrology.*', { top: 210, ...big, size: 108, accentSize: 176, at: T.h8, late: 1, lateAt: T.h8Land, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.out]]
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1450, width: 960, height: 290, open, close, cps: CPS }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const P = (lon, r) => ptOf(lon, r, WH)

  // ── the road (4.6–16.4)
  function drawRoad(t) {
    if (t < T.road[0] || t >= T.cut1) return
    const k = ease.outCubic(prog(t, ...T.road))
    x.save()
    x.lineWidth = 52; x.strokeStyle = 'rgba(20,12,44,0.85)'
    x.beginPath(); x.arc(D.cx, D.cy, RR, Math.PI, Math.PI + Math.PI * 2 * k, false); x.stroke()
    x.lineWidth = 4; x.strokeStyle = rgba(BONE, 0.85)
    for (const d of [-26, 26]) { x.beginPath(); x.arc(D.cx, D.cy, RR + d, Math.PI, Math.PI + Math.PI * 2 * k, false); x.stroke() }
    x.setLineDash([22, 22]); x.lineDashOffset = t * 90; x.lineWidth = 5; x.strokeStyle = rgba(GOLD, 0.9)
    x.beginPath(); x.arc(D.cx, D.cy, RR, Math.PI, Math.PI + Math.PI * 2 * k, false); x.stroke()
    x.restore()
    // the road sign
    const sk = pop01(t, T.sign, 0.34, 2.4)
    if (sk > 0) {
      x.save(); x.translate(D.cx, D.cy); x.scale(sk, sk)
      x.fillStyle = INK; x.fillRect(-8, 10, 16, 70)
      x.restore()
      chip(x, 'THE ZODIAC', D.cx, D.cy, { size: 40, k: sk, fg: GOLD, bg: '#173a2a', border: BONE })
    }
  }
  function drawRoadOrbs(t) {
    if (t < T.sun || t >= T.cut1) return
    for (const id of ['saturn', 'mars', 'venus', 'mercury', 'moon', 'sun']) {
      if (t < ORB_AT[id]) continue
      const lon = LON[id](t), p = P(lon, ROAD_R[id])
      const pk = pop01(t, ORB_AT[id], 0.35, 2.2)
      // speed streaks: the Sun on its lap, the Moon always
      const fast = id === 'moon' ? 1 : id === 'sun' ? Math.sin(Math.PI * prog(t, ...T.lap)) : 0
      if (fast > 0.05) for (let k = 1; k <= 9; k++) {
        const q = P(lon - k * 5, ROAD_R[id])
        x.save(); x.globalAlpha = fast * (1 - k / 10) * 0.6; x.fillStyle = ORB_COL[id]
        const s = ORB_R[id] * (1.1 - k * 0.09); x.fillRect(q.x - s / 2, q.y - s / 2, s, s); x.restore()
      }
      let mood = 'neutral', look = [0, 0], wob = 0
      if (id === 'sun') mood = 'shades'
      if (id === 'moon') mood = 'happy'
      if (id === 'saturn') {
        mood = 'sleepy'
        const d = ((LON.moon(t) - lon) % 360 + 360) % 360
        if (t > T.moon && d < 22) wob = Math.sin(t * 40) * 0.25 * (1 - d / 22)
      }
      x.save(); x.translate(p.x, p.y); x.rotate(wob)
      orbChar(x, 0, 0, ORB_R[id], t, { color: ORB_COL[id], mood, look, seed: id.length, ring: id === 'saturn', pop: pk })
      x.restore()
      if (id === 'saturn' && t > T.saturn + 0.5) sweat(x, t, p.x + 30, p.y - 50, 5)
    }
  }

  // ── the wheel + the twelve (16.5–28.4)
  function drawSlices(t) {
    if (t < T.cut1 || t >= T.cut2) return
    const k = ease.outCubic(prog(t, ...T.wheel))
    drawWheelH(x, { W: WH, k, glyphK: prog(t, T.wheel[1] - 0.3, T.wheel[1] + 0.2) })
    // element triangles
    ;['fire', 'earth', 'air', 'water'].forEach((elx, j) => {
      const t0 = T.tri[j]
      if (t < t0) return
      const sk = ease.outCubic(prog(t, t0, t0 + 0.3)), out = 1 - prog(t, T.h4Out[0] - 0.2, T.h4Out[1])
      const idx = SIGNS.map((s, i) => s.el === elx ? i : -1).filter(i => i >= 0)
      const pts = idx.map(i => P(i * 30 + 15, WH.rIn - 12))
      const w = 9 + 10 * Math.exp(-(t - t0) * 6)
      x.save(); x.globalAlpha = clamp(out); x.strokeStyle = ELEMENT_COLOR[elx]; x.lineWidth = w; x.lineJoin = 'round'; x.shadowColor = ELEMENT_COLOR[elx]; x.shadowBlur = 24
      x.beginPath()
      const c = { x: D.cx, y: D.cy }
      pts.forEach((p, i) => { const q = { x: lerp(c.x, p.x, sk), y: lerp(c.y, p.y, sk) }; i ? x.lineTo(q.x, q.y) : x.moveTo(q.x, q.y) })
      x.closePath(); x.stroke(); x.restore()
      pts.forEach((p, i) => sparkBurst(x, t, p.x, p.y, t0 + 0.25, { n: 6, R: 70, size: 16, seed: j * 3 + i, cols: [ELEMENT_COLOR[elx], BONE] }))
    })
  }
  function signPos(i, t) {
    const p = P(i * 30 + 15, 352)
    if (i === 0) {
      const e = ease.outCubic(prog(t, ...T.aries))
      return { x: lerp(-120, p.x, e), y: p.y - Math.sin(Math.PI * e) * 40, s: 96 }
    }
    return { x: p.x, y: p.y, s: 66 }
  }
  function drawTwelve(t) {
    if (t < T.aries[0] || t >= T.cut2) return
    SIGNS.forEach((s, i) => {
      const at = i === 0 ? T.aries[0] : T.ring + (i - 1) * 0.05
      if (t < at) return
      const pk = i === 0 ? 1 : pop01(t, at, 0.3, 2.4)
      const q = signPos(i, t)
      const triT = T.tri[['fire', 'earth', 'air', 'water'].indexOf(s.el)]
      const hops = i === 0 ? A_HOPS : [at + 0.3, triT + 0.05]
      let mood = 'happy', look = [0, 0]
      if (i === 0) mood = t < T.aries[1] + 0.2 ? 'wide' : t < LT2[1].done + 0.2 ? 'squint' : 'happy'
      if (s.el === 'water' && t > T.tri[3]) mood = 'sparkle'
      if (i === 11 && t > T.tri[3]) mood = 'squint'
      const r = drawStarChar(x, q.x, q.y, q.s, t, { color: s.color, glyph: null, mood, look, hops, seed: 30 + i, pop: pk, glow: 0.7, squash: i === 0 && inR(t, [T.aries[1], T.aries[1] + 0.25]) ? 0.18 : 0 })
      if (i === 0 && t < T.aries[1] + 0.3) for (let k = 1; k < 6; k++) { x.save(); x.globalAlpha = 0.5 * (1 - k / 6) * (1 - prog(t, T.aries[1], T.aries[1] + 0.3)); x.fillStyle = s.color; x.fillRect(q.x - 40 - k * 26, q.y - 6 + (k % 2) * 14, 20, 8); x.restore() }
      if (i === 11 && t > T.tri[3]) tears(x, t, r.x, r.y - 6, 12, { amount: 0.9, cell: 4, seed: 2 })
    })
    sparkBurst(x, t, signPos(0, t).x, signPos(0, t).y, T.aries[1], { n: 10, R: 120, size: 20, seed: 4, cols: [ARI_COL, GOLD] })
  }
  const CHIPS = [
    ['fire', 'FIRE: go go go.'], ['earth', 'EARTH: build it.'], ['air', 'AIR: talk it out.'], ['water', 'WATER: feel everything.'],
  ]
  function drawElementChips(t) {
    if (t < T.tri[0] || t > T.chipsOut[1]) return
    const o = popOut(t, T.chipsOut)
    CHIPS.forEach(([elx, text], j) => {
      const k = pop01(t, T.tri[j], 0.32, 2.4) * o
      chip(x, text, 540, 1490 + j * 80, { size: 42, k, fg: j === 3 ? '#cfe0ff' : BONE, border: ELEMENT_COLOR[elx] })
    })
  }

  // ── the planet characters (28.6–35.0)
  function drawRows(t) {
    if (t < T.cut2 || t >= T.h6) return
    const o = popOut(t, T.rowsOut)
    ROWS.forEach((id, i) => {
      const t0 = T.rows[i]
      if (t < t0) return
      const k = pop01(t, t0, 0.4, 2.2) * o
      if (k <= 0.01) return
      const y = 570 + i * 150, ox = 230, drop = (1 - ease.outCubic(prog(t, t0, t0 + 0.35))) * -60
      const hop = (t > T.rows[4] + 0.5 && t < T.rowsOut[0] - 0.4) ? Math.max(0, Math.sin((t - T.rows[4] - 0.5 - i * 0.12) * Math.PI / 0.5556)) * 10 : 0
      let mood = 'neutral'
      if (id === 'sun') mood = 'shades'
      if (id === 'moon') mood = 'wide'
      if (id === 'venus') mood = 'heart'
      if (id === 'mars') mood = t > T.marsLine + 0.1 ? 'angry' : 'squint'
      if (id === 'mercury') mood = 'neutral'
      const cy = y + drop - hop
      orbChar(x, ox, cy, 60, t, { color: PL[id].color, mood, look: id === 'mercury' ? [1, 1] : [0, 0], seed: i + 3, pop: k })
      if (id === 'mercury') phone(x, ox + 52, cy + 30, 54, t, { alpha: clamp(k), buzz: inR(t, [t0 + 0.4, t0 + 1.2]) ? 1 : 0 })
      if (id === 'mars') steam(x, t, ox, cy - 60, { amount: clamp(k) * (t > T.marsLine + 0.1 ? 1.4 : 0.5) })
      if (id === 'moon') tears(x, t, ox, cy, 18, { amount: 0.8 * clamp(k), cell: 5, seed: 5 })
      // the row text
      x.save(); x.globalAlpha = clamp(k); x.textBaseline = 'middle'; x.textAlign = 'left'
      x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 16
      x.font = `800 60px ${INTER}`; x.fillStyle = BONE
      const name = PL[id].name + ':', nw = x.measureText(name).width
      const tx = 315 + (1 - k) * 30
      x.fillText(name, tx, cy + 2)
      x.font = `italic 500 72px ${SERIF}`; x.fillStyle = PL[id].color
      x.fillText(PL[id].role, tx + nw + 18, cy + 2)
      x.restore()
    })
  }

  // ── the chart: slot machine → SNAP → baby photo (35.1–40.45)
  function drawChart(t) {
    if (t < T.wheel2[0] || t >= T.cut3) return
    const o = popOut(t, T.chartOut)
    const k = easeOutBack(prog(t, ...T.wheel2), 1.6) * o
    if (k <= 0.01) return
    x.save(); x.translate(D.cx, D.cy); x.scale(k, k); x.translate(-D.cx, -D.cy)
    drawWheelH(x, { W: WH, k: clamp(k) })
    // lanes
    x.strokeStyle = rgba(BONE, 0.14); x.lineWidth = 2
    for (const id of ROWS) { x.beginPath(); x.arc(D.cx, D.cy, LANE[id], 0, Math.PI * 2); x.stroke() }
    const after = t - T.snap
    for (const id of ROWS) {
      const tgt = BIRTH[id]
      const lon = after < 0 ? tgt - SPINV[id] * -after - 40 * Math.sin(-after * 3) : tgt + 5 * Math.sin(after * 22) * Math.exp(-after * 7)
      const p = ptOf(lon, LANE[id], WH)
      const pk = pop01(t, T.spin + ROWS.indexOf(id) * 0.06, 0.3, 2.2)
      if (after < 0) for (let s = 1; s <= 5; s++) { const q = ptOf(lon - s * 6, LANE[id], WH); x.save(); x.globalAlpha = 0.4 * (1 - s / 6); x.fillStyle = PL[id].color; x.fillRect(q.x - 8, q.y - 8, 16, 16); x.restore() }
      orbChar(x, p.x, p.y, 22, t, { color: PL[id].color, mood: after < 0 ? 'wide' : id === 'sun' ? 'shades' : 'happy', seed: 9 + ROWS.indexOf(id), pop: pk, glowK: 0.7 })
    }
    x.restore()
    // the SNAP pulse
    const sp = prog(t, T.snap, T.snap + 0.6)
    if (sp > 0 && sp < 1) { x.save(); x.globalAlpha = (1 - sp) * 0.8; x.strokeStyle = '#fff6dc'; x.lineWidth = 10 * (1 - sp); x.beginPath(); x.arc(D.cx, D.cy, 80 + sp * 360, 0, Math.PI * 2); x.stroke(); x.restore() }
    sparkBurst(x, t, D.cx, D.cy, T.snap, { n: 16, R: 380, size: 26, seed: 7 })
    // the birth pill (types in)
    if (t >= T.pill[0] && t < T.pillOut[1]) {
      const pk = pop01(t, T.pill[0], 0.3, 2.2) * popOut(t, T.pillOut)
      const full = 'MAY 12, 1998 · 5:00 PM · TULSA', n = Math.round(full.length * prog(t, T.pill[0] + 0.15, T.pill[1]))
      x.save(); x.font = `700 34px ${MONO}`; const w = x.measureText(full).width + 60
      x.translate(600, 1228); x.scale(pk, pk)
      x.fillStyle = GOLD; x.fillRect(-w / 2 - 5, -36, w + 10, 72); x.fillStyle = 'rgba(16,9,38,0.96)'; x.fillRect(-w / 2, -31, w, 62)
      x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(full.slice(0, n) + (n < full.length && Math.sin(t * 20) > 0 ? '▌' : ''), -w / 2 + 30, 2)
      x.restore()
    }
    // the frame + plaque
    const fk = pop01(t, T.photo, 0.42, 2.4) * o
    if (fk > 0.01) {
      frame(x, D.cx, D.cy, 640, 640, { k: fk * 0.92 })
      chip(x, 'BABY PHOTO · 1998', D.cx, D.cy + 0.92 * 352 * fk, { size: 30, k: fk, fg: INK, bg: '#f4dc98', border: '#8a5a1e' })
    }
  }

  // ── the Big Three cards (40.6–46.6)
  function drawBig3(t) {
    if (t < T.cut3 || t >= T.lesson + 0.5) return
    const o = popOut(t, T.cardsOut)
    BIG3.forEach((c, i) => {
      const t0 = T.cards[i]
      if (t < t0) return
      const k = pop01(t, t0, 0.42, 2.0) * o
      if (k <= 0.01) return
      const cy = 625 + i * 228, w = 940, h = 205
      x.save(); x.translate(540, cy); x.scale(k, k); x.rotate((1 - clamp(k)) * 0.2 * (i % 2 ? 1 : -1))
      x.shadowColor = rgba(c.col, 0.6); x.shadowBlur = 40
      x.fillStyle = 'rgba(16,9,38,0.94)'; x.fillRect(-w / 2, -h / 2, w, h)
      x.shadowBlur = 0
      x.strokeStyle = c.col; x.lineWidth = 6; x.strokeRect(-w / 2, -h / 2, w, h)
      x.fillStyle = c.col; x.font = `700 32px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText(c.label, -w / 2 + 210, -h / 2 + 44)
      x.fillStyle = BONE; x.font = `700 44px ${INTER}`
      c.line.forEach((ln, j) => x.fillText(ln, -w / 2 + 210, -h / 2 + 102 + j * 52))
      x.restore()
      const s = signStar(c.id)
      drawStarChar(x, 540 - w / 2 * k + 105 * k, cy + 10, 150 * k, t, { color: s.color, glyph: s.glyph, mood: c.mood, look: [1, 0], seed: 50 + i, hops: [t0 + 0.35], glow: 0.8 })
    })
  }

  // ── the veiled mystery card (51.2–53.4)
  function drawDeal(t) {
    if (t < T.deal[0] || t > T.dealOut[1] || !CARD) return
    const e = ease.outCubic(prog(t, ...T.deal)), o = popOut(t, T.dealOut)
    const h = 660 * o, w = h * CARD.width / CARD.height
    const cx = 560, cy = lerp(1500, 860, e)
    if (h <= 1) return
    glow(x, cx, cy, h * 0.8, LAV, 0.8 * clamp(e))
    x.save(); x.translate(cx, cy); x.rotate(lerp(0.5, -0.04, e) + Math.sin(t * 1.4) * 0.015)
    x.globalAlpha = clamp(e * 2); x.drawImage(CARD, -w / 2, -h / 2, w, h); x.restore()
    sparkBurst(x, t, cx, 860, T.deal[1], { n: 12, R: 420, size: 26, seed: 21 })
  }

  // ── the cast
  function drawTeacher(t) {
    const p = teacherPos(t), st = teacherState(t), o = popOut(t, T.out)
    const pk = pop01(t, 0.15, 0.45, 2.2) * o
    if (pk <= 0.01) return
    const r = drawStarChar(x, p.x, p.y, p.s, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, hops: T_HOPS, seed: 2, pop: pk })
    const cell = Math.max(2, Math.round(r.size / 36))
    gradCap(x, r.x - cell, r.top + cell * 2, cell, t, { alpha: clamp(pk) })
    // the whistle (hook)
    if (t > T.whistle - 0.15 && t < T.whistle + 0.9) {
      const wk = pop01(t, T.whistle - 0.15, 0.2, 2.2) * (1 - prog(t, T.whistle + 0.6, T.whistle + 0.9))
      x.save(); x.translate(r.x + r.size * 0.12, r.y + r.size * 0.1); x.scale(wk, wk)
      x.fillStyle = INK; x.fillRect(-6, -22, 70, 44); x.fillStyle = '#c7ccd8'; x.fillRect(0, -16, 58, 32); x.fillStyle = GOLD; x.fillRect(46, -16, 12, 32)
      x.restore()
      if (t > T.whistle) for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha = 1 - prog(t, T.whistle, T.whistle + 0.8); x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.arc(r.x + r.size * 0.12 + 80, r.y + r.size * 0.1, 30 + i * 26 + (t - T.whistle) * 60, -0.6, 0.6); x.stroke(); x.restore() }
    }
    // the pointer: aims at whatever we're on
    const aim = pointerAim(t)
    if (aim && t > T.toCorner[1]) {
      const ak = clamp(pop01(t, aim.at, 0.3, 2.2)) * o
      const bx = r.x + r.size * 0.3, by = r.y - r.size * 0.05
      const tx = lerp(bx, aim.x, 0.62), ty = lerp(by, aim.y, 0.62) + Math.sin(t * 5) * 6
      pointer(x, bx, by, lerp(bx, tx, ak), lerp(by, ty, ak), { alpha: clamp(ak) })
    }
  }
  function pointerAim(t) {
    if (t < T.cut1) { if (t < T.moon) { const p = P(sunLon(t), RR); return { ...p, at: T.sun } } const p = P(LON.saturn(t), RR); return t < T.saturn ? { x: 540, y: 720, at: T.moon } : { ...p, at: T.saturn } }
    if (t < T.h4) { const q = signPos(0, t); return { x: q.x + 20, y: q.y, at: T.aries[1] } }
    if (t < T.cut2) return { x: 540, y: 870, at: T.tri[0] }
    if (t < T.h6) return { x: 300, y: 1190, at: T.marsLine }
    if (t < T.cut3) return { x: 540, y: 870, at: T.spin }
    if (t < T.lesson) return { x: 300, y: 1090, at: T.cards[2] }
    if (t > T.lessonOut[1] && t < T.dealOut[0]) return { x: 520, y: 1000, at: T.deal[1] }
    return null
  }
  function drawPisces(t) {
    if (t < T.pis) return
    const st = pisState(t), o = popOut(t, T.out)
    const pk = pop01(t, T.pis, 0.4, 2.4) * o
    if (pk <= 0.01) return
    const r = drawStarChar(x, PIS.x, PIS.y, PIS.s, t, { color: signStar('pisces').color, mood: st.mood, look: st.look, blink: st.blink, hops: P_HOPS, seed: 17, pop: pk, glow: 0.8, squash: st.tears ? 0.04 * Math.sin(t * 22) : 0 })
    if (st.sweat) sweat(x, t, r.x + 34, r.y - 52, 5)
    if (st.tears) tears(x, t, r.x, r.y - 4, 18, { amount: st.tears * clamp(pk), cell: 9, seed: 9, color: '#a8e6ff' })
    if (st.mood === 'heart') hearts(x, t, r.x, r.top, T.photo + 0.3, { n: 5, px: 6, spread: 90 })
  }
  function drawWatch(t) {
    if (t < T.watch - 0.3) return
    const o = popOut(t, T.out), k = pop01(t, T.watch - 0.3, 0.35, 2.4) * o
    if (k <= 0.01) return
    const secs = 60 - Math.min(t, T.stop)
    const flash = t > T.stop ? Math.exp(-(t - T.stop) * 3) : 0
    const press = inR(t, [T.stop - 0.08, T.stop + 0.12]) ? 1 : 0
    const e = ease.inOutCubic(prog(t, ...T.watchBig)), wob = Math.sin(Math.PI * e) * 0.3
    const W_ = { x: lerp(WATCH.x, WATCH_BIG.x, e), y: lerp(WATCH.y, WATCH_BIG.y, e), r: lerp(WATCH.r, WATCH_BIG.r, e) * (1 + 0.12 * flash) }
    x.save(); x.translate(W_.x, W_.y); x.scale(k, k); x.rotate(wob); x.translate(-W_.x, -W_.y)
    stopwatch(x, W_.x, W_.y, W_.r, t, secs, { press, flash: flash * 0.6, color: secs < 10 && t < T.stop ? PINK : GOLD, below: e > 0.5 })
    x.restore()
    if (t > T.stop) chip(x, 'NEW RECORD', WATCH_BIG.x, WATCH_BIG.y + WATCH_BIG.r * 2.25, { size: 44, k: pop01(t, T.stop + 0.1, 0.3, 2.6) * o, fg: INK, bg: GOLD, border: BONE })
  }
  function confetti(t) {
    const p = prog(t, T.stop, T.stop + 1.6)
    if (p <= 0 || p >= 1) return
    for (let i = 0; i < 26; i++) {
      const a = -Math.PI / 2 + (i / 26 - 0.5) * 2.6, v = 600 + (i * 97 % 300)
      const px = WATCH_BIG.x + Math.cos(a) * v * p * 1.2, py = WATCH_BIG.y + Math.sin(a) * v * p + 900 * p * p
      if (i % 3 === 0) { x.save(); x.globalAlpha = 1 - p; x.font = `700 44px ${SERIF}`; x.fillStyle = SIGNS[i % 12].color; x.textAlign = 'center'; x.fillText(SIGNS[i % 12].glyph + '︎', px, py); x.restore() }
      else pstar(x, px, py, 24, 1 - p, [GOLD, PINK, BONE, LAV][i % 4])
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        drawRoad(t); drawRoadOrbs(t)
        drawSlices(t); drawTwelve(t); drawElementChips(t)
        drawRows(t)
        drawChart(t)
        drawBig3(t)
        drawDeal(t)
        drawPisces(t)
        drawTeacher(t)
        drawWatch(t)
        confetti(t)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change); the default selection keeps 17.0 (→ the slices), 30.15 (→ the planets)
// and 41.0 (→ the Big Three), one per 11–13 s. The others play as plain beat changes.
const CUTS = [4.42, { t: T.cut1, kind: 'deal' }, 22.95, { t: T.cut2, kind: 'shuffle' }, 35.7, { t: T.cut3, kind: 'flip' }, 46.6]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (D major; pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.08, base), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const chipS = (t, f, len, o = {}) => ['chip', r3(t), f, len, { gain: 0.05, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.7, rev: 0.12, dly: 0.1, bus: 'lead', ...o }]
const whistle = t => [chipS(t, 1760, 0.12, { slide: 300, gain: 0.05, duty: 0.5 }), chipS(t + 0.14, 2093, 0.42, { slide: -80, gain: 0.05, duty: 0.5, vib: 0.02 })]
const womp = t => [[440, 0], [415.3, 0.3], [392, 0.6]].map(([f, d]) => chipS(t + d, f, 0.26, { duty: 0.5, gain: 0.045, slide: -0.6 })).concat([chipS(t + 0.9, 370, 0.8, { duty: 0.5, gain: 0.045, slide: -1.5, vib: 0.03 })])
const ticks = (a, b, gap, gain = 0.02) => { const o = []; for (let t = a; t < b; t += gap) o.push(['tick', r3(t), gain]); return o }
const sob = (t0, n) => Array.from({ length: n }, (_, i) => chipS(t0 + i * 0.28, [659.25, 622.25, 587.33][i % 3], 0.18, { duty: 0.5, gain: 0.03, slide: -0.4, vib: 0.05 }))

export const CUES = [
  // hook
  ...wordPops(T.h0, 5, 0.08, 0), ['pop', T.h0Land, 1174.66, 0.055, 0], ['pluck', T.h0Land, 1174.66, 0.045, 0.6, 0],
  ...whistle(T.whistle), ['pop', T.watch, 1318.51, 0.035, -0.4], ...ticks(T.watch + 0.5, 4.3, 1.0, 0.03),
  ['pop', T.pis + 0.05, 1174.66, 0.03, 0.6], ['pop', T.pis + 0.6, 880, 0.02, 0.6],
  ['whoosh', T.toCorner[0], 0.5, 0.04],
  // the road
  ...head(T.h1, 4, T.h1Land, 1), ['whoosh', T.road[0], 0.7, 0.03],
  ['pop', T.sun, 880, 0.04, -0.2], ['riser', T.lap[0], T.lap[1] - 1.2, 0.03], ['whoosh', T.lap[0] + 0.8, 0.9, 0.05], ['whoosh', T.lap[1] - 0.9, 0.7, 0.04], ['bell', T.lap[1], 1760, 0.03, 1.2, 0],
  ['pop', T.sign, 987.77, 0.05, 0], ['pluck', T.sign + 0.05, 1318.51, 0.035, 0.5, 0],
  // everybody
  ...head(T.h2, 3, T.h2Land, 2),
  ['pop', T.moon, 1318.51, 0.04, 0.3], ...Array.from({ length: 4 }, (_, i) => ['whoosh', r3(T.moon + 0.4 + i * 1.2), 0.35, 0.03]),
  ['pop', T.merc, 1567.98, 0.03, 0.2], ['pop', T.venus, 1318.51, 0.03, -0.2], ['pop', T.mars, 783.99, 0.03, 0.1],
  ['pop', T.saturn, 440, 0.04, 0], ...womp(T.womp),
  // slices
  ...head(T.h3, 3, T.h3Land, 3), ['whoosh', T.wheel[0], 0.6, 0.035], ...ticks(T.wheel[0] + 0.15, T.wheel[1] + 0.05, 0.055, 0.03),
  ['whoosh', T.aries[0] - 0.1, 0.4, 0.06], ['tom', T.aries[1], 110, { gain: 0.25, decay: 0.3, rev: 0.15 }], ['glitter', T.aries[1], T.aries[1] + 0.4],
  ...SIGNS.slice(1).map((s, i) => ['pop', r3(T.ring + i * 0.05), NOTE[i % NOTE.length] * 2, 0.02, (i % 2 ? 0.3 : -0.3)]),
  // elements
  ...head(T.h4, 4, T.h4Land, 4),
  ...T.tri.flatMap((t, j) => [['pluck', r3(t), [587.33, 739.99, 880, 1174.66][j], 0.045, 0.7, (j - 1.5) * 0.3], ['pop', r3(t + 0.02), [1174.66, 1318.51, 1479.98, 1760][j], 0.03, 0], ['glitter', r3(t + 0.2), r3(t + 0.5)]]),
  ...sob(T.sob, 6), ['tick', T.chipsOut[0] + 0.1, 0.02],
  // planets
  ...head(T.h5, 3, T.h5Land, 0),
  ...T.rows.flatMap((t, i) => [['pop', r3(t), NOTE[(i * 2) % NOTE.length], 0.045, -0.3], ['pluck', r3(t + 0.05), NOTE[(i * 2 + 2) % NOTE.length] * 2, 0.025, 0.4, 0.2]]),
  ...ticks(T.rows[2] + 0.4, T.rows[2] + 1.2, 0.08, 0.02),     // Mercury's phone buzz
  ['boom', T.marsLine + 0.15, 0.1], ...ticks(T.marsLine + 0.3, T.marsLine + 1.3, 0.12, 0.02),        // Mars steams
  // the chart
  ...wordPops(T.h6, 9, 0.08, 1),
  ['whoosh', T.wheel2[0], 0.5, 0.03], ...ticks(T.spin, T.snap - 0.05, 0.07, 0.03), ['riser', T.spin, T.snap, 0.035],
  ...ticks(T.pill[0] + 0.15, T.pill[1], 0.045, 0.018),
  ['crash', T.snap, { gain: 0.06, len: 1.6 }], ['bell', T.snap + 0.02, 1760, 0.04, 1.6, 0], ['glitter', T.snap, T.snap + 0.6],
  ['pop', T.photo, 783.99, 0.05, 0], ['pluck', T.photo + 0.05, 1174.66, 0.04, 0.6, 0], ['bell', T.photo + 0.5, 2349.32, 0.02, 1.2, 0.4],
  // big three
  ...head(T.h7, 1, T.h7Land, 2),
  ...T.cards.flatMap((t, i) => [['whoosh', r3(t - 0.1), 0.3, 0.03], ['pop', r3(t + 0.1), [880, 1046.5, 1318.51][i], 0.05, 0], ['pluck', r3(t + 0.15), [1760, 2093, 2637][i] / 2, 0.03, 0.5, 0]]),
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // tie-in + last line
  ['whoosh', T.deal[0], 0.6, 0.045], ['pop', T.deal[1], 1174.66, 0.045, 0], ['glitter', T.deal[1], T.deal[1] + 0.6],
  ['whoosh', T.dealOut[0], 0.3, 0.03],
  ...head(T.h8, 3, T.h8Land, 3),
  ...ticks(T.h8, T.stop - 0.05, 0.25, 0.03),
  ['pop', T.stop, 1567.98, 0.06, -0.4], ['bell', T.stop + 0.02, 2349.32, 0.05, 1.8, -0.3], ['crash', T.stop, { gain: 0.05, len: 1.4 }], ['glitter', T.stop, T.stop + 1.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  // dialogue blips
  ...BOXES.flatMap(([lines]) => talkCues(lines, { cps: CPS, pitch: { [NARR]: 784, [ARI]: 988 } })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const __CHECK = { boxes: BOXES, lesson: LESSON }
