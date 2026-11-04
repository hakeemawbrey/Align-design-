// nml2e06 — MOONLIGHT LANE, Ep 6: "The Gift That Says Too Much" (120 s vertical, Winter on the Lane; jazzy · F).
// Batch b20 (promo/films/next30/b20.md). Kit: mlpilot/scenes/mlkit.js (read-only) + ./winter.js. Story 0–115.6, then the
// shared end card.
//   0.0–2.6    HOOK (frame 0 = thumbnail)  "The gift swap rule: | keep it *small.*" ♋ Cancer mid-wrap of a huge lumpy
//              present, tape flying, snow in the window.
//   2.6–5.0    COLD OPEN  "Cancer's gift: | *not small.*" "it's not too much. it's a *normal* amount."
//   5.0–7.0    ◀◀ PREVIOUSLY ON Moonlight Lane… (walking home · "walking home with you" · nobody said it)
//   7.0–10.0   TITLE CARD  Ep 6 · The Gift That Says Too Much.
//  10.0–24.0   ACT 1  The café. ♉ Taurus' lane gift swap: names from a jar. Cancer draws… ♐ Sagittarius.
//  24.0–40.0   Cancer's apartment: the map of every spot on the lane they've talked in a year, heart pins popping.
//              ♎ Libra drops by: "that's not a gift. that's a *love letter.*" "it's a *map!* maps are *neutral!*"
//  40.0        card cut.
//  40.0–52.0   ACT 2  The snowy lane. Plan B: a joke mug taped on top. ♊ Gemini: "just say it's a *treasure* map."
//  52.0–64.0   The swap. Sag unwraps the mug (ha!), then the map, and goes quiet. "you *made* this?" / "it's a joke!
//              haha… *maps!*" / "oh. right. a *joke.*" ♓ Pisces sobs at the back table.
//  64.0–70.0   The bench, alone in the snow. "Took it back. | *Felt worse.*"
//  70.0–90.0   ★ THE STARS ADVISE: A gift can be honest · Don't take it back · Say what it means, small.
//  90.0–104.0  ACT 3 (lift)  The bench: Sag is there with the map. A talk card: "What was your favourite moment this
//              year?" "it wasn't a joke. I made it because… this year with you *mattered* to me." "best gift I've
//              *ever* got." Sag adds a gold heart: "you missed one. *Here.*" "Card first. | *Face* last."
// 104.0–108.0  ★ LESSON UNLOCKED "Meaningful isn't | a *mistake.*" +1 HONEST GIFT
// 108.0–111.6  LANE TAG  ♏ Scorpio gives Libra a pastry shaped like a flower; Libra gives Scorpio a flower shaped
//              like a pastry.
// 111.6–115.6  NEXT TIME "Sag’s parents come to dinner. Plus one: *Cancer.*" · last line "*Mean* it."
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, MONO, r3, pop01, outK, inR, bump, loadFonts,
  drawLane, LANE, standY, drawPisces, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues,
  buildNextTime, nextTimeCues, popCues, drawBubble, drawPastry, sparkles,
} from '../../mlpilot/scenes/mlkit.js'
import { snowGround, snowfall, drawWinter, drawGift, drawMap, drawTalkCard } from './winter.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN       // 115.6
const S = id => signStar(id)
const AQ = `${S('cancer').glyph}︎ CANCER`, SG = `${S('sagittarius').glyph}︎ SAGITTARIUS`, TA = `${S('taurus').glyph}︎ TAURUS`
const LI = `${S('libra').glyph}︎ LIBRA`, GE = `${S('gemini').glyph}︎ GEMINI`
const AQ_C = '#8fe6ff', SG_C = '#d6b0ff', TA_C = '#ffd98a', LI_C = '#ffb0f0', GE_C = '#ffe27a'
// the season's looks
const AQW = { scarf: '#ff8fb1', hat: '#ff8fb1', seed: 21 }, SGW = { scarf: '#ffd36e', seed: 22 }

// ── the timeline
const T = {
  prev: [5.0, 7.0], title: 7.0,
  tape: [0.0, 0.55, 1.1, 2.9, 3.5], roll: 4.2,
  jar: 11.0, draw: 15.2, slip: 15.6, sagWave: 19.4,
  apt: 24.0, pins: [25.0, 26.3, 27.6, 28.9, 30.2], libIn: [30.6, 31.1], libOut: [38.9, 39.5],
  lane: 40.0, mugOn: 41.0, gemIn: [42.0, 42.5], gemOut: [50.6, 51.1], walk: [40.2, 51.8],
  swap: 52.0, unwrap: 53.2, mug: 53.7, mapOut: 54.6, quiet: 55.2, panic: 58.0, fall: 60.6,
  bench: 64.0, advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, sit: [90.4, 91.4], card: 91.6, cardFlip: [92.0, 92.4], mattered: 95.0, best: 98.0, pin: 101.0, cardOn: 101.6,
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, give1: 108.9, give2: 109.8, laugh: 110.5,
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Meaningful isn’t | a *mistake.*', chip: '+1 HONEST GIFT' }

// ── the dialogue
const CPS = 28
const L0 = [{ t: 2.75, speaker: AQ, color: AQ_C, text: 'it’s not too much. it’s a *normal* amount.' }]
const L1 = [
  { t: 10.6, speaker: TA, color: TA_C, text: 'lane gift swap! one name each. keep it *small.*' },
  { t: 16.3, speaker: AQ, color: AQ_C, text: 'small. right. *totally.*' },
  { t: 19.6, speaker: SG, color: SG_C, text: 'who’d you get? …don’t tell me! *surprise!*' },
]
const L2 = [
  { t: 31.3, speaker: LI, color: LI_C, text: 'that’s not a gift. that’s a *love letter.*' },
  { t: 34.6, speaker: AQ, color: AQ_C, text: 'it’s a *map!* maps are *neutral!*' },
  { t: 37.1, speaker: LI, color: LI_C, text: 'it has *hearts* on it, babe.' },
]
const L3 = [
  { t: 42.7, speaker: GE, color: GE_C, text: 'easy. say it’s a *treasure* map.' },
  { t: 45.4, speaker: AQ, color: AQ_C, text: 'a treasure map… to *what?*' },
  { t: 48.0, speaker: GE, color: GE_C, text: '…*you’ll* think of something.' },
]
const L4 = [
  { t: 55.5, speaker: SG, color: SG_C, text: 'Cancer… you *made* this?' },
  { t: 58.1, speaker: AQ, color: AQ_C, text: 'it’s a joke! haha… *maps!*' },
  { t: 60.8, speaker: SG, color: SG_C, text: 'oh. right. a *joke.*' },
]
const L5 = [
  { t: 92.6, speaker: AQ, color: AQ_C, text: 'it wasn’t a joke. I made it because…' },
  { t: 95.2, speaker: AQ, color: AQ_C, text: '…this year with you *mattered* to me.' },
  { t: 98.2, speaker: SG, color: SG_C, text: 'best gift I’ve *ever* got.' },
  { t: 100.5, speaker: SG, color: SG_C, text: 'you missed one spot. *here.*' },
]
const BOXES = [[L0, 2.6, 4.95], [L1, 10.4, 23.6], [L2, 31.1, 39.6], [L3, 42.5, 50.9], [L4, 55.3, 63.6], [L5, 92.4, 103.6]]
const ALL_LINES = BOXES.flatMap(b => b[0])

// THE STARS ADVISE
const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'heart', head: 'A gift can be *honest.*', body: 'Meaningful isn’t a mistake. Caring a lot is not a crime.' },
    { at: T.cards[1], icon: 'door', head: 'Don’t take it *back.*', body: 'Calling it a joke stings more than meaning it ever could.' },
    { at: T.cards[2], icon: 'chat', head: 'Say what it means, *small.*', body: '“I made it because this year with you mattered to me.”' },
  ],
  lines: [
    { t: 71.05, text: 'Cancer, this one’s *yours.*' },
    { t: 73.95, text: 'you made something real. that’s *brave.*' },
    { t: 77.5, text: '“just a joke” makes them feel *silly.*' },
    { t: 80.4, text: 'they liked it. let them *keep* liking it.' },
    { t: 83.5, text: 'one small, true sentence. *that’s all.*' },
    { t: 86.5, text: 'no speech. no big ask. just *mean it.*' },
  ],
}

// ── captions
const CAPS = [
  { text: 'The gift swap rule: | keep it *small.*', kicker: 'FRIDAY · 6:40 PM', at: -1.2, out: [2.4, 2.6], size: 84 },
  { text: 'Cancer’s gift: | *not small.*', at: 2.6, out: [4.8, 4.95], late: 1, lateAt: 3.1 },
  { text: 'One name | *each.*', kicker: 'THE CAFÉ · GIFT SWAP', at: 10.3, out: [15.0, 15.2], late: 1, lateAt: 10.9 },
  { text: 'Cancer drew… | *Sagittarius.*', at: T.slip, out: [23.6, 23.85], late: 1, lateAt: 16.2 },
  { text: 'One year. | *Every* spot.', kicker: 'THREE NIGHTS LATER', at: 24.15, out: [30.4, 30.6], late: 1, lateAt: 24.8 },
  { text: 'Plan B: | *hide the feelings.*', at: 40.3, out: [51.6, 51.85], late: 1, lateAt: 41.0 },
  { text: 'The *swap.*', kicker: 'SATURDAY · 7:00 PM', at: 52.15, out: [55.0, 55.15], late: 1, lateAt: 52.6 },
  { text: 'Took it back. | *Felt worse.*', at: 64.3, out: [69.3, 69.6], late: 1, lateAt: 65.0 },
  { text: 'One small | *true sentence.*', at: 90.3, out: [92.2, 92.35], late: 1, lateAt: 90.9 },
  { text: 'Card first. | *Face* last.', at: T.cardOn, out: [103.65, 103.85], late: 2, lateAt: 102.05 },
  { text: 'A very fair | *trade.*', kicker: 'MEANWHILE · THE STALL', at: 108.15, out: [111.3, 111.5], late: 1, lateAt: 108.6 },
  { text: '*Mean* it.', at: 112.5, out: [115.05, 115.4], size: 110, late: 1, lateAt: 112.5, top: 300 },
]

// the map's pins (the bench is the one Cancer missed)
const PINS = [[0.36, 0.42, 'CAFÉ'], [0.6, 0.3, 'ROOF'], [0.84, 0.58, 'MARKET'], [0.3, 0.8, 'SNOW-STAR'], [0.68, 0.82, 'WALK HOME']]
const BENCH_PIN = { x: 0.14, y: 0.6, label: 'HERE' }

// hops
const AQ_HOPS = [...talkHops(ALL_LINES, AQ, { cps: CPS }), ...T.tape, T.slip, T.panic, 91.4, 96.8]
const SG_HOPS = [...talkHops(ALL_LINES, SG, { cps: CPS }), T.sagWave, T.mug, T.best + 0.2, T.pin]
const TA_HOPS = [...talkHops(ALL_LINES, TA, { cps: CPS }), T.jar, T.draw]
const LI_HOPS = [T.libIn[1], ...talkHops(ALL_LINES, LI, { cps: CPS }), T.give2, T.laugh]
const GE_HOPS = [T.gemIn[1], ...talkHops(ALL_LINES, GE, { cps: CPS })]

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '800 34px Inter'])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'Sag’s parents come to dinner. Plus one: *Cancer.*' })
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0], stills: [
    { caption: 'Walking home, every night', scene: c => stillLane(c, 'bench') },
    { caption: '“Walking home with you.”', scene: c => stillCafe(c) },
    { caption: 'Still nobody said it…', scene: c => stillLane(c, 'apart'), crop: [700, 760, 640, 760] },
  ] })
  const title = buildTitle(root, { ep: 6, title: 'The Gift That Says Too Much', at: T.title, len: 3 })
  const bug = showBug(root, 6, { at: 0 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── stills for PREVIOUSLY (drawn once at build)
  function stillLane(c, mode) {
    const pan = 640
    drawLane(c, 10, { time: 'night', pan }, w => {
      snowGround(w, 10)
      const B = LANE.bench
      if (mode === 'bench') {
        drawWinter(w, 'sagittarius', B.seats[0], standY(200, B.seatY), 200, 10, { ...SGW, mood: 'happy', look: [1, 0] })
        drawWinter(w, 'cancer', B.seats[1] + 40, standY(200, B.seatY), 200, 10, { ...AQW, mood: 'sparkle', look: [-1, 0] })
      } else {
        drawWinter(w, 'sagittarius', B.seats[0] - 20, standY(200, B.seatY), 200, 10, { ...SGW, mood: 'neutral', look: [-1, 1] })
        drawWinter(w, 'cancer', B.seats[1] + 60, standY(200, B.seatY), 200, 10, { ...AQW, mood: 'neutral', look: [1, 1], blush: 0.9 })
      }
    })
    snowfall(c, 10, { n: 70 })
  }
  function stillCafe(c) {
    drawCafe(c, 10, { view: 'late' })
    c.save(); c.beginPath(); c.rect(CAFE.window.x, CAFE.window.y, CAFE.window.w, CAFE.window.h); c.clip(); snowfall(c, 10, { n: 60, big: 0.8 }); c.restore()
    drawWinter(c, 'sagittarius', CAFE.seats[0].x, standY(210, CAFE.seats[0].y), 210, 10, { ...SGW, mood: 'happy' })
    drawWinter(c, 'cancer', CAFE.seats[1].x, standY(210, CAFE.seats[1].y), 210, 10, { ...AQW, mood: 'happy' })
    drawCafeTable(c, 10, { cups: 2, pastry: 'bun' })
  }

  // ── helpers
  const windowSnow = (t, r, n = 40) => { x.save(); x.beginPath(); x.rect(r.x, r.y, r.w, r.h); x.clip(); snowfall(x, t, { n, big: 0.8, seed: 9 }); x.restore() }
  function tapeStrip(t, t0, ax, ay) {        // a strip of tape flies off the roll
    const p = prog(t, t0, t0 + 0.5)
    if (p <= 0 || p >= 1) return
    x.save(); x.globalAlpha = 1 - p; x.translate(ax + p * 120, ay - Math.sin(Math.PI * p) * 120); x.rotate(p * 4)
    x.fillStyle = INK; x.fillRect(-34, -9, 68, 18); x.fillStyle = 'rgba(220,240,255,0.9)'; x.fillRect(-30, -5, 60, 10); x.restore()
  }

  // ── scenes
  function apartment(t) {        // cold open (0–7) and the map nights (24–40)
    drawApartment(x, t, { lamp: 1 })
    windowSnow(t, APT.window, 46)
    const mapNights = t >= T.apt
    if (!mapNights) {
      // the huge lumpy present on the rug; Cancer wrapping it
      const bob = 4 * Math.sin(t * 9)
      const roll = ease.inCubic(prog(t, T.roll, T.roll + 0.8))
      drawGift(x, 640 + roll * 600, 1250 - bob * 0.2, 360, 300, t, { col: '#3a8fd8', ribbon: ML_GOLD, lumpy: 1, rot: -0.04 + roll * 1.2 })
      let am = 'squint', al = [1, 0]
      if (t > 3.5 && t < 6.2) { am = 'happy'; al = undefined }
      if (t > T.roll) { am = 'wide'; al = [1, 0] }
      drawWinter(x, 'cancer', 290, standY(270, 1440), 270, t, { ...AQW, hat: null, mood: am, look: al, hops: AQ_HOPS, squash: 0.05 * Math.sin(t * 10) })
      for (const tt of T.tape) tapeStrip(t, tt, 420, 1150)
      // the gift tag
      drawBubble(x, 760, 1020, 'TO: ♐︎ SAG', { size: 30, col: '#fff1c8', k: outK(t, [T.roll, T.roll + 0.2]), tail: null })
      return
    }
    // the map on the wall, the pins popping one by one; Cancer at the desk-couch with a pen
    const mk = pop01(t, T.apt + 0.1, 0.4, 1.6)
    const pins = PINS.filter((_, i) => t > T.pins[i])
    drawMap(x, 330, 640, 460, t, { k: mk, rot: -0.03, pins, label: 'OUR LANE' })
    T.pins.forEach((p, i) => { if (t > p && t < p + 0.6) sparkles(x, t, 330 - 230 + PINS[i][0] * 460, 640 - 166 + PINS[i][1] * 331, p, 6, 70, 20 + i, ['#ff6b8a', ML_GOLD, BONE]) })
    let am = 'sparkle', al = [-1, -1]
    if (t > T.libIn[1]) { am = 'wide'; al = [1, 0] }
    if (t > 34.5) { am = 'squint'; al = [1, 0] }
    if (t > 37.1) { am = 'neutral'; al = [-1, -1]; }
    drawWinter(x, 'cancer', APT.couch.seats[0], standY(230, APT.couch.seatY), 230, t, { ...AQW, hat: null, mood: am, look: al, hops: AQ_HOPS, blush: t > 37.2 ? 0.9 : undefined })
    if (t > T.libIn[0]) {
      const p = ease.outBack(prog(t, ...T.libIn)), o = ease.inCubic(prog(t, ...T.libOut))
      drawWinter(x, 'libra', lerp(1250, 800, p) + o * 500, standY(220, 1440), 220, t, { scarf: '#c9a6ff', hat: '#7dffb0', mood: t > 37 ? 'wink' : 'sparkle', look: [-1, -1], hops: LI_HOPS, seed: 10 })
    }
  }

  function cafeSwapDraw(t) {      // Act 1: names from the jar
    drawCafe(x, t, { view: 'night', behind: c => drawWinter(c, 'taurus', CAFE.counter.x, standY(200, CAFE.counter.y), 200, t, { mood: 'happy', look: [-1, 1], hops: TA_HOPS, seed: 9, scarf: '#d8455f' }) })
    windowSnow(t, CAFE.window)
    drawPisces(x, 92, standY(120, 1250), 120, t, { tears: t > T.slip ? 3 : 2, look: [1, 0], pull: bump(t, 17.0, 0.5) })
    const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
    let am = 'neutral', al = [1, -1]
    if (t > T.draw) { am = 'squint'; al = [0, 1] }
    if (t > T.slip + 0.2) { am = 'wide'; al = [0, 1] }
    if (t > 16.2) { am = 'happy'; al = undefined }
    if (t > 19.6) { am = 'wide'; al = [1, 0] }
    if (t > 22.2) { am = 'happy'; al = [1, 0] }
    drawWinter(x, 'cancer', S0.x, standY(220, S0.y), 220, t, { ...AQW, mood: am, look: al, hops: AQ_HOPS, blush: t > T.slip + 0.5 ? 0.9 : undefined })
    drawWinter(x, 'sagittarius', S1.x, standY(220, S1.y), 220, t, { ...SGW, mood: t > 19.5 ? 'sparkle' : 'happy', look: [-1, 0], hops: SG_HOPS })
    drawCafeTable(x, t, { cups: 2, pastry: 'croissant' })
    // the jar of names
    const jk = pop01(t, T.jar, 0.35, 2)
    if (jk > 0.01) {
      x.save(); x.translate(540, 1250); x.scale(jk, jk)
      x.fillStyle = INK; x.fillRect(-56, -110, 112, 120); x.fillStyle = 'rgba(200,230,255,0.55)'; x.fillRect(-48, -102, 96, 104)
      x.fillStyle = '#d8455f'; x.fillRect(-52, -124, 104, 20)
      for (let i = 0; i < 7; i++) { x.fillStyle = ['#fff1c8', '#ffd2e0', '#d2f0ff'][i % 3]; x.fillRect(-40 + (i * 23) % 76, -70 + (i * 17) % 60, 24, 14) }
      x.restore()
    }
    // the slip: pulled up, unfolded
    if (t > T.draw) {
      const p = ease.outBack(prog(t, T.draw, T.slip + 0.3))
      const sx = lerp(540, 470, p), sy = lerp(1160, 980, p)
      x.save(); x.translate(sx, sy); x.rotate(-0.06)
      const w = lerp(30, 230, p), h = lerp(16, 90, p)
      x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = '#fff6e0'; x.fillRect(-w / 2, -h / 2, w, h)
      if (p > 0.7) { x.globalAlpha = clamp((p - 0.7) / 0.3); x.fillStyle = '#7a2fb8'; x.font = `800 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♐︎ SAG', 0, 4) }
      x.restore()
      sparkles(x, t, 470, 980, T.slip, 10, 160, 4, [ML_GOLD, PINK, BONE])
    }
    if (t > T.slip && t < T.slip + 1.2) { x.save(); x.globalAlpha = bump(t, T.slip, 1.2); x.fillStyle = PINK; x.font = `700 60px ${MONO}`; x.textAlign = 'center'; x.fillText('!', S0.x + 90, 1060); x.restore() }
  }

  function laneWalk(t) {          // Act 2a: the snowy lane, the bigger package, Gemini
    const pan = lerp(80, 420, ease.inOutCubic(prog(t, ...T.walk)))
    drawLane(x, t, { time: 'night', pan }, c => {
      snowGround(c, t)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 2, look: [1, 1], pull: bump(t, 46.2, 0.5) })
      const w = ease.inOutQuad(prog(t, ...T.walk)), ax = lerp(560, 960, w), walking = t < T.walk[1] && !inR(t, 42.4, 50.2)
      const steps = walking ? Array.from({ length: 30 }, (_, i) => T.walk[0] + i * 0.4).filter(s => !inR(s, 42.4, 50.2)) : []
      let am = 'neutral', al = [1, 0]
      if (t > 45.2 && t < 47.8) { am = 'squint'; al = [1, 0] }
      if (t > 47.9) { am = 'eyeroll'; al = undefined }
      if (t > 50.4) { am = 'neutral'; al = [1, 0] }
      drawWinter(c, 'cancer', ax, standY(220), 220, t, { ...AQW, mood: am, look: al, hops: [...steps, ...AQ_HOPS] })
      // the package (with Plan B on top: a joke mug)
      drawGift(c, ax + 150, 1236, 170, 140, t, { col: '#3a8fd8', ribbon: ML_GOLD, rot: 0.05 * Math.sin(t * 4) })
      const mk = pop01(t, T.mugOn, 0.3, 2.2)
      if (mk > 0.01) {
        c.save(); c.translate(ax + 150, 1130 + 10 * (1 - mk)); c.scale(mk, mk)
        c.fillStyle = INK; c.fillRect(-36, -40, 72, 76); c.fillRect(30, -24, 24, 40); c.fillStyle = '#fff6e0'; c.fillRect(-30, -34, 60, 64); c.fillStyle = '#fff6e0'; c.fillRect(36, -18, 12, 28); c.fillStyle = INK; c.fillRect(38, -12, 8, 16)
        c.fillStyle = '#d8455f'; c.font = `800 22px ${MONO}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('LOL', 0, -2)
        c.restore()
      }
      if (t > T.gemIn[0] && t < T.gemOut[1]) {
        const p = ease.outBack(prog(t, ...T.gemIn)), o = ease.inCubic(prog(t, ...T.gemOut))
        drawWinter(c, 'gemini', pan + lerp(1250, 830, p) + o * 600, standY(220), 220, t, { scarf: '#7dffb0', hat: '#7fe0ff', mood: t > 47.9 ? 'wink' : 'happy', look: [-1, 0], hops: GE_HOPS, seed: 8 })
      }
    })
    snowfall(x, t, { n: 90 })
    // the treasure "X"
    const xk = pop01(t, 43.4, 0.25, 2.2) * outK(t, [47.6, 47.8])
    if (xk > 0.01) drawBubble(x, 760, 1000, 'X marks the… ?', { size: 30, k: xk, tail: 'down' })
  }

  function swapScene(t) {         // the swap at the café
    drawCafe(x, t, { view: 'night', behind: c => drawWinter(c, 'taurus', CAFE.counter.x, standY(200, CAFE.counter.y), 200, t, { mood: t > T.quiet ? 'neutral' : 'happy', look: t > T.quiet ? [-1, 1] : undefined, seed: 9, scarf: '#d8455f' }) })
    windowSnow(t, CAFE.window)
    drawPisces(x, 92, standY(120, 1250), 120, t, { tears: 3, look: [1, 0], pull: bump(t, 56.2, 0.5) + bump(t, 61.2, 0.6) })
    const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
    let am = 'sparkle', al = [1, 0], asq = 0
    if (t > T.quiet) { am = 'wide'; al = [1, 0] }
    if (t > T.panic) { am = 'happy'; al = undefined; asq = 0.05 * Math.sin(t * 22) }
    if (t > 60.6) { am = 'wide'; al = [1, 1] }
    if (t > 62.0) { am = 'neutral'; al = [0, 1]; asq = 0.08 }
    drawWinter(x, 'cancer', S0.x, standY(220, S0.y), 220, t, { ...AQW, mood: am, look: al, hops: AQ_HOPS, squash: asq })
    let sm = 'sparkle', sl = [-1, 1]
    if (t > T.mug) { sm = 'happy'; sl = undefined }
    if (t > T.mapOut) { sm = 'wide'; sl = [0, 1] }
    if (t > 55.4) { sm = 'heart'; sl = [-1, 0] }
    if (t > T.panic + 0.3) { sm = 'wide'; sl = [-1, 0] }
    if (t > T.fall) { sm = 'neutral'; sl = [0, 1] }
    drawWinter(x, 'sagittarius', S1.x, standY(220, S1.y), 220, t, { ...SGW, mood: sm, look: sl, hops: SG_HOPS, squash: t > T.fall ? 0.06 : 0 })
    drawCafeTable(x, t, { cups: 2, pastry: null })
    // the box opens; the mug pops out; then the map unfolds over the table
    if (t < T.mapOut + 0.4) drawGift(x, 560, 1240, 150, 110, t, { col: '#3a8fd8', ribbon: ML_GOLD, lid: ease.outCubic(prog(t, T.unwrap, T.unwrap + 0.4)), alpha: 1 - prog(t, T.mapOut, T.mapOut + 0.4) })
    const mk = pop01(t, T.mug, 0.3, 2) * outK(t, [T.mapOut, T.mapOut + 0.3])
    if (mk > 0.01) drawBubble(x, 600, 1060, 'a mug! LOL!', { size: 30, k: mk, tail: 'down' })
    const mapK = pop01(t, T.mapOut, 0.45, 1.5)
    drawMap(x, 560, 980, 420, t, { k: mapK, rot: 0.03, pins: PINS, alpha: 1 - prog(t, 63.4, 63.9) })
    if (t > 55.2 && t < 58) sparkles(x, t, 560, 980, 55.2, 10, 220, 31, [ML_GOLD, '#ff6b8a', BONE])
  }

  function bench(t, act3) {
    drawLane(x, t, { time: 'late', pan: 640, moon: { x: 860, y: 600, r: 105 }, lit: act3 ? ['a4', 'pisces', 'cafe', 'c2', 'd6'] : ['a4', 'pisces', 'd6'] }, c => {
      snowGround(c, t)
      const B = LANE.bench
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 3, look: [1, 1], pull: bump(t, 66.2, 0.6) + bump(t, 98.5, 0.5) })
      if (!act3) {
        drawWinter(c, 'cancer', B.seats[0], standY(220, B.seatY), 220, t, { ...AQW, mood: t > 67 ? 'squint' : 'neutral', look: [0, 1], hops: AQ_HOPS, squash: 0.1 })
      } else {
        // Sag already on the bench with the map; Cancer walks in and sits
        const p = ease.inOutQuad(prog(t, ...T.sit))
        let am = 'neutral', al = [1, 0]
        if (t > 95.2) { am = 'happy'; al = undefined }
        if (t > T.best) { am = 'heart'; al = [1, 0] }
        if (t > T.pin + 0.4) { am = 'sparkle'; al = [1, 1] }
        drawWinter(c, 'cancer', lerp(820, B.seats[0] - 10, p), standY(220, lerp(LANE.feet, B.seatY, p)), 220, t, { ...AQW, mood: am, look: al, hops: [90.6, 91.0, ...AQ_HOPS], blush: t > 95 ? 0.9 : undefined })
        let sm = 'neutral', sl = [0, 1]
        if (t > T.sit[1]) { sm = 'sparkle'; sl = [-1, 0] }
        if (t > T.best - 0.3) { sm = 'happy'; sl = undefined }
        if (t > 100.4) { sm = 'wink'; sl = [-1, 0] }
        drawWinter(c, 'sagittarius', B.seats[1] + 30, standY(220, B.seatY), 220, t, { ...SGW, mood: sm, look: sl, hops: SG_HOPS, blush: t > 98 ? 0.9 : undefined })
      }
    })
    snowfall(x, t, { n: act3 ? 60 : 110, speed: act3 ? 0.7 : 1, wind: act3 ? 0.1 : 0.4 })
    if (act3) {
      // the talk card (deals in, flips) and the map, held up between them
      const ck = pop01(t, T.card, 0.35, 1.8) * outK(t, [94.8, 95.1])
      const fl = t < T.cardFlip[0] ? -1 : t < T.cardFlip[1] ? lerp(-1, 1, ease.inOutQuad(prog(t, ...T.cardFlip))) : 1
      if (ck > 0.01) drawTalkCard(x, 540, 820, 300 * ck, t, { text: 'What was your favourite moment this year?', flip: fl, rot: -0.04 })
      const mk = pop01(t, 95.2, 0.4, 1.6)
      if (mk > 0.01) drawMap(x, 540, 860, 440, t, { k: mk, rot: 0.02, pins: PINS, newPin: { at: T.pin, ...BENCH_PIN } })
      if (t > T.pin) sparkles(x, t, 540 - 220 + BENCH_PIN.x * 440, 860 - 158 + BENCH_PIN.y * 317, T.pin, 10, 120, 41, [ML_GOLD, '#ff6b8a', BONE])
      const ck2 = pop01(t, T.cardOn, 0.3, 2)
      if (ck2 > 0.01) drawTalkCard(x, 860, 1070, 150 * ck2, t, { text: 'What was your favourite moment this year?', rot: 0.12, size: 30 })
    }
  }

  function tag(t) {               // the flower stall: the fair trade
    drawLane(x, t, { time: 'night', pan: 1080 }, c => {
      snowGround(c, t)
      const g1 = ease.outBack(prog(t, T.give1, T.give1 + 0.4)), g2 = ease.outBack(prog(t, T.give2, T.give2 + 0.4))
      drawWinter(c, 'libra', 1700, standY(230), 230, t, { scarf: '#c9a6ff', hat: '#7dffb0', mood: t > T.give1 + 0.3 ? 'heart' : 'sparkle', look: [1, 0], hops: LI_HOPS, seed: 10 })
      drawWinter(c, 'scorpio', 2000, standY(230), 230, t, { scarf: '#fff1c8', mood: t > T.give2 + 0.3 ? 'heart' : 'happy', look: [-1, 0], hops: [T.give1, T.laugh], seed: 11, blush: t > T.give2 ? 0.9 : undefined })
      // Scorpio → Libra: a pastry shaped like a flower (a bun with five crust petals)
      if (t > T.give1 - 0.1) {
        const fx = lerp(1900, 1790, g1), fy = 1170
        for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28; c.fillStyle = INK; c.fillRect(Math.round(fx + Math.cos(a) * 34 - 18), Math.round(fy + Math.sin(a) * 34 - 18), 36, 36) }
        for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28; c.fillStyle = i % 2 ? '#e8a656' : '#f1c27a'; c.fillRect(Math.round(fx + Math.cos(a) * 34 - 14), Math.round(fy + Math.sin(a) * 34 - 14), 28, 28) }
        c.fillStyle = '#c47a34'; c.fillRect(Math.round(fx - 16), Math.round(fy - 16), 32, 32); c.fillStyle = '#fff1c8'; c.fillRect(Math.round(fx - 6), Math.round(fy - 10), 8, 6)
      }
      // Libra → Scorpio: a flower shaped like a pastry (a croissant of petals on a stem)
      if (t > T.give2 - 0.1) {
        const px = lerp(1790, 1900, g2), py = 1040
        c.fillStyle = '#3f8a5a'; c.fillRect(Math.round(px - 4), py + 20, 8, 70)
        for (let i = 0; i < 5; i++) { const ox = px - 66 + i * 28, oy = py + Math.abs(i - 2) * 10 - 10; c.fillStyle = INK; c.fillRect(Math.round(ox - 3), Math.round(oy - 3), 32, 36); c.fillStyle = ['#ffb3d9', '#ff8fb1', '#ffc6e2', '#ff8fb1', '#ffb3d9'][i]; c.fillRect(Math.round(ox), Math.round(oy), 26, 30) }
      }
    })
    snowfall(x, t, { n: 60, seed: 7 })
    drawBubble(x, 520, 1010, 'a flower… pastry?', { size: 28, k: pop01(t, T.give1 + 0.35, 0.25, 2) * outK(t, [111.25, 111.45]), tail: 'down' })
    drawBubble(x, 860, 900, 'a pastry… flower!', { size: 28, k: pop01(t, T.give2 + 0.35, 0.25, 2) * outK(t, [111.25, 111.45]), tail: 'down' })
    sparkles(x, t, 540, 1000, T.laugh, 10, 180, 51, [PINK, '#ffb3d9', ML_GOLD])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.title + 0.2 || inR(t, T.apt, T.lane)) apartment(t)
      else if (t < T.apt) cafeSwapDraw(t)
      else if (t < T.swap) laneWalk(t)
      else if (t < T.bench) swapScene(t)
      else if (t < T.act3) { if (t < T.advise + 0.7) bench(t, false); else drawSky(x, t, SKY_H) }
      else if (t < T.tag) bench(t, true)
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

// card-cut candidates (cardfx plays the middle one: 40.0, the apartment → the snowy lane)
const CUTS = [24.0, 40.0, 52.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [698.46, 783.99, 880, 1046.5, 1174.66, 1396.91, 1567.98]
export const CUES = [
  // hook + cold open: tape, the lumpy present rolls away
  ...T.tape.flatMap((tt, i) => [['tick', r3(tt + 0.02), 0.05], ['pop', r3(tt + 0.05), NOTE[i % 7], 0.025, 0.3]]),
  ['whoosh', T.roll, 0.4, 0.04], ['tom', r3(T.roll + 0.5), 90, { gain: 0.2, decay: 0.25 }],
  ...previouslyCues(T.prev[0], 3, T.prev[1] - T.prev[0]),
  ...captionCues(CAPS[1]),
  ...titleCues(T.title, 3),
  // act 1: the jar, the slip
  ...captionCues(CAPS[2]), ['pop', T.jar, 880, 0.035, 0], ['tick', T.draw, 0.05], ['whoosh', T.draw, 0.3, 0.03],
  ['pop', T.slip, 1174.66, 0.045, -0.2], ['bell', r3(T.slip + 0.05), 1760, 0.03, 1.2, 0], ['glitter', T.slip, r3(T.slip + 0.6)],
  ...popCues(CAPS[3]), ['pop', T.sagWave, 987.77, 0.03, 0.3],
  // the map nights
  ...captionCues(CAPS[4]),
  ...T.pins.flatMap((p, i) => [['pop', p, NOTE[(i + 2) % 7], 0.035, -0.2], ['pluck', r3(p + 0.03), NOTE[(i + 4) % 7] * 2, 0.02, 0.4, -0.2]]),
  ['whoosh', T.libIn[0], 0.35, 0.035], ['whoosh', T.libOut[0], 0.3, 0.03],
  // act 2: the lane
  ...popCues(CAPS[5]), ['pop', T.mugOn, 1318.51, 0.04, 0.2],
  ...Array.from({ length: 28 }, (_, i) => T.walk[0] + i * 0.4).filter(s => !inR(s, 42.4, 50.2) && s < T.walk[1]).map(s => ['tick', r3(s), 0.012]),
  ['whoosh', T.gemIn[0], 0.35, 0.04], ['pop', 43.4, 880, 0.03, 0.3], ['whoosh', T.gemOut[0], 0.35, 0.03],
  // the swap
  ...captionCues(CAPS[6]), ['tick', T.unwrap, 0.05], ['whoosh', T.unwrap, 0.3, 0.03], ['pop', T.mug, 1046.5, 0.04, 0.2],
  ['whoosh', T.mapOut, 0.4, 0.04], ['glitter', T.quiet, r3(T.quiet + 0.6)], ['bell', 55.3, 1567.98, 0.025, 1.4, 0],
  ['pop', T.panic, 523.25, 0.04, -0.2], ['pop', r3(T.panic + 0.15), 587.33, 0.035, -0.2], ['pop', T.fall, 392, 0.035, 0.3], ['pop', r3(T.fall + 0.2), 349.23, 0.03, 0.3],
  // the bench, alone
  ...popCues(CAPS[7]),
  ...adviseCues(ADVISE),
  // act 3
  ...popCues(CAPS[8]), ['whoosh', T.card, 0.3, 0.03], ['tick', T.cardFlip[0], 0.05], ['pop', T.cardFlip[1], 1174.66, 0.04, 0],
  ['whoosh', 95.2, 0.35, 0.03], ['glitter', T.best, r3(T.best + 0.5)],
  ['pop', T.pin, 1396.91, 0.045, -0.2], ['bell', r3(T.pin + 0.05), 1760, 0.03, 1.2, -0.2], ['glitter', T.pin, r3(T.pin + 0.6)],
  ...popCues(CAPS[9]), ['pop', T.cardOn, 1174.66, 0.035, 0.3],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'F' }),
  // the lane tag
  ...captionCues(CAPS[10]), ['whoosh', T.give1, 0.3, 0.03], ['pop', r3(T.give1 + 0.3), 1046.5, 0.035, 0.2], ['whoosh', T.give2, 0.3, 0.03], ['pop', r3(T.give2 + 0.3), 1174.66, 0.035, -0.2], ['bell', T.laugh, 1760, 0.03, 1.2, 0], ['glitter', T.laugh, r3(T.laugh + 0.6)],
  ...nextTimeCues(T.next), ...popCues(CAPS[11]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [AQ]: 932, [SG]: 698.46, [TA]: 587.33, [LI]: 1046.5, [GE]: 1174.66 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
