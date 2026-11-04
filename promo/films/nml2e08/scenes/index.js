// nml2e08 — MOONLIGHT LANE, Ep 8: "The Long Way Home" (120 s vertical, Winter on the Lane; dreamy · Ab).
// Batch b20 (promo/films/next30/b20.md). The pair: ♋ Cancer × ♐ Sagittarius (b19's setup). Kit: mlpilot/scenes/mlkit.js
// (read-only) + ../../nml2e06/scenes/winter.js. Story 0–115.6, then the shared end card.
//   0.0–5.0    HOOK + COLD OPEN  "Shortcut, | or the *long way?*" (THURSDAY · 9:40 PM) Sag and Cancer mid-step at a snowy
//              signpost: SHORTCUT → / ← LONG WAY. "long way. obviously. it's *snowing.*"
//   5.0–7.0    ◀◀ PREVIOUSLY ON (dinner with the parents · "favourite person" · outside, just them)
//   7.0–10.0   TITLE CARD  Ep 8 · The Long Way Home.
//  10.0–24.0   ACT 1  The map route, on purpose: the snow-star, the market. Sag's fun fact (snow makes the lane quieter).
//  24.0–40.0   "Cancer decides: | *tonight.*" Try one: "Sag, can I tell you some—" ♌ Leo, carolling: "LA LA LAAA!"
//  40.0        card cut.
//  40.0–52.0   ACT 2  Try two: ♊ Gemini and ♉ Taurus' snowman loses its head. Try three: ♓ Pisces sobs at the window.
//              "…so. snow. *cold.*"
//  52.0–70.0   Sag reads it wrong: "you seem tired. shortcut?" The shortcut: very short. "night!" / "night." Cancer alone.
//  70.0–90.0   ★ THE STARS ADVISE: Nerves aren't a no · Slow down out loud · Ask for one more.
//  90.0–104.0  ACT 3 (lift)  Cancer knocks: "walk with me one more block?" Slowly, under the lamps: "I didn't want the walk
//              to end." "me neither. I took the long way *on purpose.*"
// 104.0–108.0  ★ LESSON UNLOCKED "Nervous means | it *matters.*" +1 EXTRA BLOCK
// 108.0–111.6  LANE TAG  ♏ Scorpio walks ♎ Libra home: 40 steps. "*worth* it."
// 111.6–115.6  NEXT TIME "One table. *Everything* unsaid." · last line "*One more* block."
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, MONO, r3, pop01, outK, inR, bump, loadFonts,
  drawLane, LANE, standY, drawPisces, drawCafe, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues,
  buildNextTime, nextTimeCues, popCues, drawBubble, sparkles,
} from '../../mlpilot/scenes/mlkit.js'
import { snowGround, snowfall, drawWinter, drawMap, drawLongTable, drawSnowman } from '../../nml2e06/scenes/winter.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN       // 115.6
const S = id => signStar(id)
const CA = `${S('cancer').glyph}︎ CANCER`, SG = `${S('sagittarius').glyph}︎ SAGITTARIUS`, LE = `${S('leo').glyph}︎ LEO`, GE = `${S('gemini').glyph}︎ GEMINI`
const LI = `${S('libra').glyph}︎ LIBRA`, SC = `${S('scorpio').glyph}︎ SCORPIO`
const CA_C = '#8fe6ff', SG_C = '#d6b0ff', LE_C = '#ffbe73', GE_C = '#ffe27a', LI_C = '#ffb0f0', SC_C = '#ff9fb4'
const CAW = { scarf: '#ff8fb1', hat: '#ff8fb1', seed: 21 }, SGW = { scarf: '#ffd36e', seed: 22 }

const T = {
  prev: [5.0, 7.0], title: 7.0,
  walk1: [10.0, 24.0], pins: [12.0, 20.6, 26.0],
  walk2: [24.0, 40.0], try1: 33.0, leoIn: [34.6, 35.0], leoOut: [38.8, 39.4],
  try2: 41.2, thud: 43.0, try3: 47.2, sob: 48.6, nerve: 50.0,
  shortcut: [56.6, 58.6], doors: 58.8, alone: 64.0,
  advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, knock: [90.4, 90.9], open: 92.4, stroll: [94.0, 104.0],
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, steps: [108.3, 110.3],
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Nervous means | it *matters.*', chip: '+1 EXTRA BLOCK' }

const CPS = 28
const L0 = [{ t: 2.75, speaker: SG, color: SG_C, text: 'long way. obviously. it’s *snowing.*' }]
const L1 = [
  { t: 11.2, speaker: CA, color: CA_C, text: 'let’s do the *map* route.' },
  { t: 14.0, speaker: SG, color: SG_C, text: 'fun fact: snow makes the lane *quieter.*' },
  { t: 17.6, speaker: CA, color: CA_C, text: 'it does. it’s… *nice.*' },
  { t: 20.4, speaker: SG, color: SG_C, text: 'stop one: our *snow-star!*' },
]
const L2 = [
  { t: 26.2, speaker: SG, color: SG_C, text: 'stop two: the *market.* remember?' },
  { t: T.try1, speaker: CA, color: CA_C, text: 'Sag, can I tell you some—' },
  { t: 35.2, speaker: LE, color: LE_C, text: 'LA LA LAAA! happy *winter,* friends!' },
]
const L3 = [
  { t: T.try2, speaker: CA, color: CA_C, text: 'ok. so. I—' },
  { t: 44.0, speaker: GE, color: GE_C, text: 'little help? his head fell *off!*' },
  { t: T.try3, speaker: CA, color: CA_C, text: 'Sag. I really…' },
  { t: T.nerve, speaker: CA, color: CA_C, text: '…so. snow. *cold.*' },
]
const L4 = [
  { t: 52.6, speaker: SG, color: SG_C, text: 'you seem tired. *shortcut?*' },
  { t: 55.0, speaker: CA, color: CA_C, text: '…sure. *shortcut.*' },
  { t: 59.4, speaker: SG, color: SG_C, text: 'night!' },
  { t: 61.0, speaker: CA, color: CA_C, text: 'night.' },
]
const L5 = [
  { t: 91.2, speaker: CA, color: CA_C, text: 'walk with me one more *block?*' },
  { t: 93.8, speaker: SG, color: SG_C, text: '…yeah. *yeah.*' },
  { t: 96.2, speaker: CA, color: CA_C, text: 'I didn’t want the walk to *end.*' },
  { t: 99.2, speaker: SG, color: SG_C, text: 'me neither. I took the long way *on purpose.*' },
]
const L6 = [
  { t: 108.5, speaker: LI, color: LI_C, text: 'you know I live right *there.*' },
  { t: 110.2, speaker: SC, color: SC_C, text: '*worth* it.' },
]
const BOXES = [[L0, 2.6, 4.95], [L1, 11.0, 23.7], [L2, 26.0, 39.4], [L3, 41.0, 51.8], [L4, 52.4, 63.0], [L5, 91.0, 103.85], [L6, 108.3, 111.4]]
const ALL_LINES = BOXES.flatMap(b => b[0])

const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'heart', head: 'Nerves *aren’t a no.*', body: 'Scared usually means it matters. You can be nervous and still go.' },
    { at: T.cards[1], icon: 'clock', head: 'Slow down *out loud.*', body: '“I don’t want this walk to end yet.” Let them hear it.' },
    { at: T.cards[2], icon: 'door', head: 'Ask for *one more.*', body: '“Walk with me one more block?” Small, clear, kind.' },
  ],
  lines: [
    { t: 71.05, text: 'Cancer, this one’s *yours.*' },
    { t: 73.95, text: 'three tries is *brave,* not a fail.' },
    { t: 77.5, text: '“snow. cold.” told them *nothing.*' },
    { t: 80.4, text: 'so tell them you want to *stay.*' },
    { t: 83.5, text: 'it’s not too late. *knock.*' },
    { t: 86.5, text: 'one more block is *plenty.*' },
  ],
}

const CAPS = [
  { text: 'Shortcut, | or the *long way?*', kicker: 'THURSDAY · 9:40 PM', at: -1.2, out: [4.8, 4.95], size: 88 },
  { text: 'The long way. | *On purpose.*', at: 10.3, out: [19.9, 20.1], late: 1, lateAt: 10.9 },
  { text: 'Every *heart* | on the map.', at: 20.3, out: [29.6, 29.8], late: 1, lateAt: 20.3 },
  { text: 'Cancer decides: | *tonight.*', at: 29.9, out: [32.7, 32.9], late: 1, lateAt: 30.5 },
  { text: 'Try *one.*', at: 33.0, out: [39.5, 39.7], size: 100, late: 1, lateAt: 33.0 },
  { text: 'Try *two.*', at: T.try2, out: [47.0, 47.15], size: 100, late: 1, lateAt: T.try2 },
  { text: 'Try *three.*', at: T.try3, out: [51.8, 52.0], size: 100, late: 1, lateAt: T.try3 },
  { text: 'The shortcut: | *very* short.', at: 56.4, out: [63.4, 63.6], late: 1, lateAt: 57.0 },
  { text: 'Two minutes. | *Too* fast.', at: 64.3, out: [69.3, 69.6], late: 1, lateAt: 65.0 },
  { text: 'One more | *block.*', at: 90.2, out: [93.4, 93.6], late: 1, lateAt: 90.8 },
  { text: 'Forty steps. | *Every* night.', kicker: 'MEANWHILE', at: 108.15, out: [111.3, 111.5], late: 1, lateAt: 108.6 },
  { text: '*One more* block.', at: 112.5, out: [115.05, 115.4], size: 100, late: 1, lateAt: 112.5, top: 300 },
]

const PINS = [[0.36, 0.42, 'CAFÉ'], [0.6, 0.3, 'ROOF'], [0.84, 0.58, 'MARKET'], [0.3, 0.8, 'SNOW-STAR'], [0.68, 0.82, 'WALK HOME'], [0.14, 0.6, 'HERE']]

const steps = (a, b, gap = 0.42) => Array.from({ length: Math.floor((b - a) / gap) }, (_, i) => r3(a + i * gap))
const CA_HOPS = [...talkHops(ALL_LINES, CA, { cps: CPS }), ...steps(T.walk1[0], 32.6), ...steps(52.0, 58.6, 0.3), ...steps(T.stroll[0], T.stroll[1], 0.6)]
const SG_HOPS = [...talkHops(ALL_LINES, SG, { cps: CPS }), ...steps(T.walk1[0] + 0.2, 32.6), ...steps(52.1, 58.6, 0.3), ...steps(T.stroll[0] + 0.3, T.stroll[1], 0.6), T.open]
const LE_HOPS = [...talkHops(ALL_LINES, LE, { cps: CPS }), T.leoIn[1], 36.0, 36.6, 37.2]
const GE_HOPS = [...talkHops(ALL_LINES, GE, { cps: CPS }), T.thud + 0.1]

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '800 34px Inter'])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'One table. *Everything* unsaid.' })
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0], stills: [
    { caption: 'Dinner with the parents', scene: c => stillDinner(c) },
    { caption: '“My favourite person.”', scene: c => stillOut(c, false) },
    { caption: '“I said what I said.”', scene: c => stillOut(c, true), crop: [640, 760, 640, 760] },
  ] })
  const title = buildTitle(root, { ep: 8, title: 'The Long Way Home', at: T.title, len: 3 })
  const bug = showBug(root, 8, { at: 0 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function stillDinner(c) {
    drawCafe(c, 10, { view: 'night' })
    ;[[170, '#c9a6ff', '#ff8fb1', 'sagittarius'], [380, '#9a6a48', '#5a6a8a', 'sagittarius'], [640, '#ffd36e', null, 'sagittarius'], [900, '#ff8fb1', '#ff8fb1', 'cancer']].forEach(([sx, sc, h, sg], i) => drawWinter(c, sg, sx, standY(260, 1250), 260, 10, { scarf: sc, hat: h, mood: 'happy', seed: 30 + i }))
    drawLongTable(c, 10, { y: 1185 })
  }
  function stillOut(c, heart) {
    drawLane(c, 10, { time: 'late', pan: 560 }, w => {
      snowGround(w, 10)
      drawWinter(w, 'sagittarius', 900, standY(230), 230, 10, { ...SGW, mood: 'happy', blush: 0.9 })
      drawWinter(w, 'cancer', 1150, standY(230), 230, 10, { ...CAW, mood: heart ? 'heart' : 'sparkle', look: [-1, 0] })
    })
    snowfall(c, 10, { n: 60 })
  }

  // ── props
  function signpost(c, wx, t) {
    const R = (a, b, w, h, col) => { c.fillStyle = col; c.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
    R(wx - 8, 1020, 16, 320, INK); R(wx - 4, 1024, 8, 316, '#6a4a3a')
    // right arrow: SHORTCUT
    R(wx - 6, 1040, 230, 70, INK); R(wx, 1046, 200, 58, '#d8455f'); c.beginPath(); c.moveTo(wx + 200, 1040); c.lineTo(wx + 250, 1075); c.lineTo(wx + 200, 1110); c.fillStyle = INK; c.fill(); c.beginPath(); c.moveTo(wx + 200, 1048); c.lineTo(wx + 240, 1075); c.lineTo(wx + 200, 1102); c.fillStyle = '#d8455f'; c.fill()
    // left arrow: LONG WAY
    R(wx - 224, 1126, 230, 70, INK); R(wx - 200, 1132, 200, 58, '#4fae8a'); c.beginPath(); c.moveTo(wx - 200, 1126); c.lineTo(wx - 250, 1161); c.lineTo(wx - 200, 1196); c.fillStyle = INK; c.fill(); c.beginPath(); c.moveTo(wx - 200, 1134); c.lineTo(wx - 240, 1161); c.lineTo(wx - 200, 1188); c.fillStyle = '#4fae8a'; c.fill()
    c.fillStyle = '#fff6e0'; c.font = `700 30px ${MONO}`; c.textAlign = 'center'; c.textBaseline = 'middle'
    c.fillText('SHORTCUT', wx + 100, 1076); c.fillText('LONG WAY', wx - 100, 1162)
    R(wx - 230, 1118, 240, 10, '#f4f6ff'); R(wx - 10, 1032, 236, 10, '#f4f6ff')
  }
  function miniMap(t, k, pins) { if (k > 0.01) drawMap(x, 760, 500, 380, t, { k, rot: 0.05, pins }) }

  // ── scenes
  function coldOpen(t) {
    drawLane(x, t, { time: 'night', pan: 260 }, c => {
      snowGround(c, t)
      signpost(c, 800, t)
      drawWinter(c, 'cancer', 620, standY(230), 230, t, { ...CAW, mood: t > 2.75 ? 'sparkle' : 'neutral', look: [1, -1], hops: [0.0, 0.42, 0.84, ...CA_HOPS] })
      drawWinter(c, 'sagittarius', 1000, standY(240), 240, t, { ...SGW, mood: 'happy', look: [-1, 0], hops: [0.2, 0.62, 1.04, ...SG_HOPS], squash: 0.04 * Math.sin(t * 8) })
    })
    snowfall(x, t, { n: 100 })
  }

  function walk(t) {              // 10–40: the map route (left → right along the lane)
    const w1 = ease.inOutQuad(prog(t, 10.0, 32.6))
    const wx = lerp(300, 1720, w1)                  // the pair's midpoint in world x
    const pan = clamp(wx - 540, 0, 1080)
    const leoK = t > T.leoIn[0] ? ease.outBack(prog(t, ...T.leoIn)) * (1 - ease.inCubic(prog(t, ...T.leoOut))) : 0
    drawLane(x, t, { time: 'night', pan }, c => {
      snowGround(c, t)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 2, look: [1, 1], pull: bump(t, 18.0, 0.5) })
      if (t < 24.5) drawSnowman(c, 760, 1420, 1.6, t)          // the snow-star stop: a little snowman beside it
      let cm = 'sparkle', cl = [1, 0]
      if (t > 29.9) { cm = 'squint'; cl = [1, 0] }
      if (t > T.try1) { cm = 'wide'; cl = [1, 0] }
      if (t > 35.2) { cm = 'wide'; cl = [-1, -1] }
      drawWinter(c, 'cancer', wx - 120, standY(230), 230, t, { ...CAW, mood: cm, look: cl, hops: CA_HOPS })
      drawWinter(c, 'sagittarius', wx + 120, standY(240), 240, t, { ...SGW, mood: t > 35.2 ? 'happy' : 'sparkle', look: [-1, 0], hops: SG_HOPS })
      if (leoK > 0.01) drawWinter(c, 'leo', pan + lerp(1250, 860, leoK), standY(230), 230, t, { hat: '#d8455f', scarf: '#7dffb0', mood: 'happy', look: [-1, 0], hops: LE_HOPS, seed: 7 })
    })
    snowfall(x, t, { n: 90 })
    // the map in the corner, pins lighting as they pass
    const pk = pop01(t, 11.2, 0.35, 1.8) * outK(t, [29.6, 29.9])
    miniMap(t, pk, [PINS[3], PINS[2], PINS[0], PINS[4]].map((p, i) => i === 0 && t < T.pins[0] ? [p[0], p[1], ''] : p))
    T.pins.forEach((p, i) => { if (inR(t, p, p + 0.7)) sparkles(x, t, 760, 500, p, 8, 140, 10 + i, [ML_GOLD, '#ff6b8a', BONE]) })
    if (leoK > 0.01) { drawBubble(x, 820, 980, 'LA LA LAAA!', { size: 32, k: leoK, tail: 'down', col: '#ffe0b0' }) }
    if (t > T.try1 && t < 35.2) { x.save(); x.globalAlpha = 0.6; x.fillStyle = BONE; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.fillText('…', 300, 1140); x.restore() }
  }

  function tries(t) {             // 40–64: tries two and three, the shortcut, the doors
    const fast = ease.inOutQuad(prog(t, ...T.shortcut))
    const wx = lerp(1200, 1240, prog(t, 40, 56))
    const pan = 860 - fast * 600
    drawLane(x, t, { time: 'night', pan, lit: { a4: 1, pisces: 1, cafe: 1, c0: 1, c2: 1, d1: 1, d3: 1, d5: 1, d9: 1, a0: t > 61.2 ? 1 : 0 } }, c => {
      snowGround(c, t)
      // Pisces at the window, sobbing on try three
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: t > T.sob ? 3 : 2, look: [1, 1], pull: bump(t, T.sob, 0.6) })
      // Gemini + Taurus' snowman (the head falls on try two)
      if (t < 52) {
        c.save(); c.translate(1730, 1420); c.rotate(t > T.thud ? -0.25 : 0.05); drawSnowman(c, 0, 0, 1.8, t); c.restore()
        drawWinter(c, 'gemini', 1580, standY(200), 200, t, { scarf: '#7dffb0', hat: '#7fe0ff', mood: t > T.thud ? 'wide' : 'happy', look: [1, 0], hops: GE_HOPS, seed: 8 })
        drawWinter(c, 'taurus', 1880, standY(200), 200, t, { scarf: '#d8455f', mood: t > T.thud ? 'wide' : 'happy', look: [-1, 0], seed: 9 })
      }
      if (t < T.shortcut[0]) {
        let cm = 'squint', cl = [1, 0]
        if (inR(t, T.thud, T.try3)) { cm = 'wide'; cl = [1, 0] }
        if (t > T.sob) { cm = 'wide'; cl = [-1, -1] }
        if (t > T.nerve) { cm = 'neutral'; cl = [0, 1] }
        if (t > 52.6) { cm = 'neutral'; cl = [1, 0] }
        drawWinter(c, 'cancer', wx - 130, standY(230), 230, t, { ...CAW, mood: cm, look: cl, hops: CA_HOPS })
        let sm = 'sparkle', sl = [-1, 0]
        if (inR(t, T.thud, T.try3)) { sm = 'happy'; sl = [1, 0] }
        if (t > T.nerve + 0.4) { sm = 'neutral'; sl = [-1, 0] }
        drawWinter(c, 'sagittarius', wx + 110, standY(240), 240, t, { ...SGW, mood: sm, look: sl, hops: SG_HOPS })
      } else {
        // the shortcut: a fast walk to the two doors (Cancer: the home-row door · Sag: the café door, upstairs)
        const cx = lerp(1070, LANE.home.x, fast), sx = lerp(1350, LANE.cafeDoor.x, fast)
        drawWinter(c, 'cancer', cx, standY(230), 230, t, { ...CAW, mood: 'neutral', look: t > T.doors ? [1, 0] : [-1, 0], hops: CA_HOPS, alpha: 1 - prog(t, 61.8, 62.4) })
        drawWinter(c, 'sagittarius', sx, standY(240), 240, t, { ...SGW, mood: t > 59.4 ? 'happy' : 'neutral', look: [-1, 0], hops: SG_HOPS, alpha: 1 - prog(t, 61.4, 62.0) })
      }
    })
    snowfall(x, t, { n: 90 })
    const tk = pop01(t, T.thud, 0.2, 2.4) * outK(t, [45.6, 45.8])
    if (tk > 0.01) drawBubble(x, 870, 1010, 'THUD.', { size: 40, k: tk, tail: 'down', col: '#d2f0ff' })
    const sk = pop01(t, T.sob, 0.2, 2.4) * outK(t, [50.6, 50.8])
    if (sk > 0.01) drawBubble(x, 300, 760, 'SOB!!', { size: 40, k: sk, tail: 'down', col: '#d2e0ff' })
    if (inR(t, T.shortcut[0] - 0.2, T.shortcut[1] + 0.2)) drawBubble(x, 540, 980, '▶▶ 2 MIN', { size: 36, col: ML_GOLD, k: pop01(t, T.shortcut[0] - 0.2, 0.25, 2) * outK(t, [T.shortcut[1], T.shortcut[1] + 0.2]), tail: null })
  }

  function alone(t) {             // 64–70: Cancer's apartment, slumped
    drawApartment(x, t, { lamp: 0.6, time: 'night' })
    const r = APT.window; x.save(); x.beginPath(); x.rect(r.x, r.y, r.w, r.h); x.clip(); snowfall(x, t, { n: 40, big: 0.8, seed: 9 }); x.restore()
    drawWinter(x, 'cancer', APT.couch.seats[0], standY(230, APT.couch.seatY), 230, t, { ...CAW, hat: null, mood: 'squint', look: [0, 1], squash: 0.12, rot: -0.1 })
  }

  function act3(t) {              // 90–104: the knock, the extra block
    const st = ease.inOutQuad(prog(t, ...T.stroll))
    const wx = lerp(1010, 1460, st)
    drawLane(x, t, { time: 'late', pan: t < T.stroll[0] ? 440 : clamp(wx - 540, 0, 1080), lit: ['a4', 'pisces', 'cafe', 'c2', 'd6'] }, c => {
      snowGround(c, t)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 3, look: [1, 1], pull: bump(t, 99.6, 0.5) })
      if (t < T.stroll[0]) {
        const knock = [90.4, 90.65, 90.9].some(k => inR(t, k, k + 0.12)) ? 6 : 0
        drawWinter(c, 'cancer', 830 + knock, standY(230), 230, t, { ...CAW, mood: t > 93.8 ? 'happy' : 'neutral', look: [1, 0], hops: CA_HOPS })
        const op = pop01(t, T.open, 0.3, 1.6)
        if (op > 0.01) drawWinter(c, 'sagittarius', 1060, standY(240), 240, t, { ...SGW, mood: t > 93.8 ? 'happy' : 'wide', look: [-1, 0], hops: SG_HOPS, pop: op })
      } else {
        let cm = 'happy', sm = 'sparkle'
        if (t > 96.2) cm = 'heart'
        if (t > 99.2) sm = 'heart'
        drawWinter(c, 'cancer', wx - 100, standY(230), 230, t, { ...CAW, mood: cm, look: [1, 0], hops: CA_HOPS, blush: 0.9 })
        drawWinter(c, 'sagittarius', wx + 90, standY(240), 240, t, { ...SGW, mood: sm, look: [-1, 0], hops: SG_HOPS, blush: t > 99 ? 0.9 : undefined })
      }
    })
    snowfall(x, t, { n: 70, speed: 0.6, wind: 0.08 })
    if (t > 100.6) sparkles(x, t, 540, 1150, 100.6, 12, 200, 13, [PINK, '#ffb3d9', ML_GOLD])
    if (inR(t, 90.4, 91.2)) { x.save(); x.globalAlpha = 0.8; x.fillStyle = BONE; x.font = `800 40px ${MONO}`; x.textAlign = 'center'; x.fillText('knock knock', 560, 1040); x.restore() }
  }

  function tag(t) {               // 40 steps
    const p = ease.inOutQuad(prog(t, ...T.steps)), n = Math.min(40, Math.round(p * 40))
    drawLane(x, t, { time: 'night', pan: 1080 }, c => {
      snowGround(c, t)
      drawWinter(c, 'scorpio', lerp(1500, 1820, p), standY(230), 230, t, { scarf: '#fff1c8', mood: t > 110.2 ? 'heart' : 'happy', look: [1, 0], hops: steps(T.steps[0], T.steps[1], 0.25), seed: 11 })
      drawWinter(c, 'libra', lerp(1720, 2020, p), standY(230), 230, t, { scarf: '#c9a6ff', hat: '#7dffb0', mood: t > 110.4 ? 'heart' : 'sparkle', look: [-1, 0], hops: steps(T.steps[0] + 0.1, T.steps[1], 0.25), seed: 10 })
    })
    snowfall(x, t, { n: 60, seed: 7 })
    drawBubble(x, 300, 1000, `STEPS: ${n}`, { size: 34, col: ML_GOLD, k: pop01(t, 108.3, 0.25, 2) * outK(t, [111.25, 111.45]), tail: null })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.title + 0.2) coldOpen(t)
      else if (t < 40) walk(t)
      else if (t < T.alone) tries(t)
      else if (t < T.act3) { if (t < T.advise + 0.7) alone(t); else drawSky(x, t, SKY_H) }
      else if (t < T.tag) act3(t)
      else if (t < 111.6) tag(t)
      if (t >= 111.45) {
        const k = ease.inOutQuad(prog(t, 111.45, 111.75))
        if (k >= 1 || t >= 111.6) drawSky(x, t, SKY_H)
        else { x.save(); x.globalAlpha = k; drawSky(x, t, SKY_H); x.restore() }
      }
      for (const c of caps) c.update(t)
      for (const b of boxes) b.update(t)
      advise.update(t)
      lesson.update(t)
      next.update(t)
      prev.update(t)
      title.update(t)
      bug.update(t, title.on(t) || prev.on(t) ? 0 : outK(t, T.nextOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [24.0, 40.0, 64.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [830.61, 932.33, 1046.5, 1108.73, 1244.51, 1396.91, 1567.98]
export const CUES = [
  ...[0.0, 0.42, 0.84].map(s => ['tick', r3(s + 0.02), 0.02]),
  ...previouslyCues(T.prev[0], 3, T.prev[1] - T.prev[0]),
  ...titleCues(T.title, 3),
  ...popCues(CAPS[1]), ['whoosh', 11.2, 0.35, 0.03],
  ...T.pins.flatMap((p, i) => [['pop', p, NOTE[(i * 2) % 7], 0.035, 0.3], ['pluck', r3(p + 0.03), NOTE[(i * 2 + 2) % 7] * 2, 0.02, 0.4, 0.3]]),
  ...popCues(CAPS[2]), ...popCues(CAPS[3]), ...popCues(CAPS[4]),
  ['whoosh', T.leoIn[0], 0.35, 0.04], ['pop', T.leoIn[1], 1174.66, 0.04, 0.3], ['pluck', 35.4, 1318.51, 0.03, 0.4, 0.3], ['pluck', 35.8, 1567.98, 0.03, 0.4, 0.3], ['pluck', 36.2, 1760, 0.03, 0.6, 0.3], ['whoosh', T.leoOut[0], 0.3, 0.03],
  ...popCues(CAPS[5]), ['tom', T.thud, 70, { gain: 0.3, decay: 0.35 }], ['boom', T.thud, 0.2],
  ...popCues(CAPS[6]), ['pop', T.sob, 523.25, 0.04, -0.3], ['pop', r3(T.sob + 0.18), 493.88, 0.035, -0.3], ['pop', T.nerve, 392, 0.03, 0],
  ...popCues(CAPS[7]), ['riser', T.shortcut[0], T.shortcut[1], 0.02], ...steps(T.shortcut[0], T.shortcut[1], 0.15).map(s => ['tick', s, 0.012]),
  ['tick', 61.9, 0.05], ['tick', 62.2, 0.05],
  ...popCues(CAPS[8]),
  ...adviseCues(ADVISE),
  ...popCues(CAPS[9]), ['tick', 90.4, 0.08], ['tick', 90.65, 0.08], ['tick', 90.9, 0.08], ['pop', T.open, 987.77, 0.035, 0.2],
  ['glitter', 96.4, 97.0], ['bell', 100.6, 1760, 0.03, 1.4, 0], ['glitter', 100.6, 101.2],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Ab' }),
  ...captionCues(CAPS[10]), ...steps(T.steps[0], T.steps[1], 0.25).map(s => ['tick', s, 0.015]), ['bell', 110.4, 1567.98, 0.03, 1.2, 0], ['glitter', 110.4, 111.0],
  ...nextTimeCues(T.next), ...popCues(CAPS[11]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CA]: 932, [SG]: 698.46, [LE]: 880, [GE]: 1174.66, [LI]: 1046.5, [SC]: 659.25 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
