// nml2e07 — MOONLIGHT LANE, Ep 7: "Dinner with the Parents" (120 s vertical, Winter on the Lane; funk · G).
// Batch b20 (promo/films/next30/b20.md). The pair: ♋ Cancer × ♐ Sagittarius (b19's setup). Kit: mlpilot/scenes/mlkit.js
// (read-only) + ../../nml2e06/scenes/winter.js. Story 0–115.6, then the shared end card.
//   0.0–5.0    HOOK + COLD OPEN  "Bring a friend | to meet the *parents.*" (SUNDAY · 5:55 PM) Sag mid-panic at the café
//              door with a rules list (1. WE ARE FRIENDS · 2. SEE RULE 1). "rule one: we're just *friends.* ok?"
//   5.0–7.0    ◀◀ PREVIOUSLY ON (the map · "this year mattered to me" · the gold heart)
//   7.0–10.0   TITLE CARD  Ep 7 · Dinner with the Parents.
//  10.0–24.0   ACT 1  The café. Sag's MOM and DAD (big huggers). "so THIS is the one!" "Mom. this is Cancer. my
//              *friend.*" "the friend you talk about *every* call?"
//  24.0–40.0   The long table. Over-correcting: a chair-sized gap, "pass the bread… *friend.*" "thanks, *pal.* buddy.
//              acquaintance." "so! how did you two *meet?*"
//  40.0        card cut.
//  40.0–52.0   ACT 2  The story, in sync, every detail the same. "you finish each other's *sentences!*"
//  52.0–70.0   Mom's Push / Pull / Align reading. Sag snaps: "we are NOT together, ok?" Cancer: "…yeah. just friends."
//              Silent soup. ♓ Pisces sobs at the back table.
//  70.0–90.0   ★ THE STARS ADVISE: You don't owe a label · Don't perform distance · Check in after.
//  90.0–104.0  ACT 3 (lift)  Dessert: "sorry I snapped." "Cancer is my *favourite* person here. that's all I know."
//              Outside in the snow: "I got weird in there. are we okay?" "favourite *person?*" "…I said what I said."
// 104.0–108.0  ★ LESSON UNLOCKED "No label is | still *an answer.*" +1 KIND ANSWER
// 108.0–111.6  LANE TAG  ♎ Libra practises meeting ♏ Scorpio's parents: hug or handshake? Scorpio: "both."
// 111.6–115.6  NEXT TIME "The *long way* home." · last line "*Favourite* person."
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, MONO, r3, pop01, outK, inR, bump, loadFonts,
  drawLane, LANE, standY, drawPisces, drawCafe, CAFE,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues,
  buildNextTime, nextTimeCues, popCues, drawBubble, drawPhone, sparkles,
} from '../../mlpilot/scenes/mlkit.js'
import { snowGround, snowfall, drawWinter, drawMap, drawLongTable } from '../../nml2e06/scenes/winter.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN       // 115.6
const S = id => signStar(id)
const CA = `${S('cancer').glyph}︎ CANCER`, SG = `${S('sagittarius').glyph}︎ SAGITTARIUS`, MO = `${S('sagittarius').glyph}︎ MOM`, DA = `${S('sagittarius').glyph}︎ DAD`
const LI = `${S('libra').glyph}︎ LIBRA`, SC = `${S('scorpio').glyph}︎ SCORPIO`
const CA_C = '#8fe6ff', SG_C = '#d6b0ff', MO_C = '#ffb0d6', DA_C = '#c8b8ff', LI_C = '#ffb0f0', SC_C = '#ff9fb4'
const CAW = { scarf: '#ff8fb1', hat: '#ff8fb1', seed: 21 }, SGW = { scarf: '#ffd36e', seed: 22 }
const MOW = { scarf: '#c9a6ff', hat: '#ff9a3a', seed: 31 }, DAW = { scarf: '#9a6a48', hat: '#5a6a8a', seed: 32 }

// ── the timeline
const T = {
  prev: [5.0, 7.0], title: 7.0,
  list: 0.0, hug: 11.0, hugEnd: 13.2,
  table: 24.0, scoot: 24.6, closer: 92.0,
  sync: [40.6, 42.2, 43.8, 45.4], wow: 47.6,
  phone: [52.4, 52.8], phoneOut: [56.6, 57.0], align: 54.2, snap: 55.6, quiet: 58.4,
  advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, out: 98.0,
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, tilt: [108.6, 110.0], both: 110.3,
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'No label is | still *an answer.*', chip: '+1 KIND ANSWER' }

// ── the dialogue
const CPS = 28
const L0 = [{ t: 2.75, speaker: SG, color: SG_C, text: 'rule one: we’re just *friends.* ok?' }]
const L1 = [
  { t: 11.2, speaker: MO, color: MO_C, text: 'so THIS is the one! come *here!*' },
  { t: 14.2, speaker: SG, color: SG_C, text: 'Mom. this is Cancer. my *friend.*' },
  { t: 17.2, speaker: DA, color: DA_C, text: 'the friend you talk about *every* call?' },
  { t: 20.4, speaker: CA, color: CA_C, text: 'every… call? *huh.*' },
]
const L2 = [
  { t: 25.4, speaker: CA, color: CA_C, text: 'pass the bread… *friend.*' },
  { t: 28.2, speaker: SG, color: SG_C, text: 'here you go, *pal.* buddy. acquaintance.' },
  { t: 31.6, speaker: MO, color: MO_C, text: 'why are you two sitting so *far* apart?' },
  { t: 35.0, speaker: DA, color: DA_C, text: 'so! how did you two *meet?*' },
]
const L3 = [
  { t: T.sync[0], speaker: SG, color: SG_C, text: 'it was the first snow—' },
  { t: T.sync[1], speaker: CA, color: CA_C, text: '—last winter—' },
  { t: T.sync[2], speaker: SG, color: SG_C, text: '—and you dropped your—' },
  { t: T.sync[3], speaker: CA, color: CA_C, text: '—cookies. *all* of them.' },
  { t: T.wow, speaker: MO, color: MO_C, text: 'you finish each other’s *sentences!*' },
]
const L4 = [
  { t: 52.9, speaker: MO, color: MO_C, text: 'I did your Push / Pull reading! look!' },
  { t: T.snap, speaker: SG, color: SG_C, text: 'we are NOT *together,* ok?' },
  { t: T.quiet, speaker: CA, color: CA_C, text: '…yeah. just *friends.*' },
]
const L5 = [
  { t: 90.9, speaker: SG, color: SG_C, text: 'Mom. Dad. sorry I *snapped.*' },
  { t: 93.4, speaker: SG, color: SG_C, text: 'Cancer is my *favourite* person here.' },
  { t: 96.0, speaker: SG, color: SG_C, text: 'that’s all I know right now.' },
]
const L6 = [
  { t: 98.45, speaker: SG, color: SG_C, text: 'I got weird in there. are we *okay?*' },
  { t: 100.5, speaker: CA, color: CA_C, text: 'favourite… *person?*' },
  { t: 101.7, speaker: SG, color: SG_C, text: '…I said what I *said.*' },
]
const L7 = [
  { t: 108.7, speaker: LI, color: LI_C, text: 'your parents: hug or *handshake?*' },
  { t: T.both, speaker: SC, color: SC_C, text: '*both.*' },
]
const BOXES = [[L0, 2.6, 4.95], [L1, 11.0, 23.6], [L2, 25.2, 38.4], [L3, 40.4, 51.6], [L4, 52.7, 63.0], [L5, 90.7, 97.8], [L6, 98.3, 103.95], [L7, 108.5, 111.4]]
const ALL_LINES = BOXES.flatMap(b => b[0])

const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'question', head: 'You don’t owe *a label.*', body: '“We’re figuring it out” is a real answer. Say it calmly.' },
    { at: T.cards[1], icon: 'heart', head: 'Don’t perform *distance.*', body: 'Acting cold to prove a point hurts the person next to you.' },
    { at: T.cards[2], icon: 'chat', head: 'Check in *after.*', body: '“I got weird in there. Are we okay?”' },
  ],
  lines: [
    { t: 71.05, text: 'Sagittarius, this one’s *yours.*' },
    { t: 73.95, text: 'family asks big questions. *breathe.*' },
    { t: 77.5, text: '“NOT together” landed on *Cancer.*' },
    { t: 80.4, text: 'you can be private and still *warm.*' },
    { t: 83.5, text: 'weird moment? name it, *out loud.*' },
    { t: 86.5, text: 'then ask how *they* are. that’s it.' },
  ],
}

const CAPS = [
  { text: 'Bring a friend | to meet the *parents.*', kicker: 'SUNDAY · 5:55 PM', at: -1.2, out: [4.8, 4.95], size: 84 },
  { text: 'Sag’s parents. | *Big* huggers.', kicker: 'THE CAFÉ · 6:00 PM', at: 10.3, out: [16.9, 17.1], late: 1, lateAt: 10.9 },
  { text: '“Just” | *friends.*', at: 17.2, out: [23.6, 23.85], late: 1, lateAt: 17.8 },
  { text: 'Dinner. | *Very* normal.', at: 24.15, out: [34.8, 35.0], late: 1, lateAt: 24.7 },
  { text: 'Same story. | *Same details.*', at: 40.3, out: [51.6, 51.85], late: 1, lateAt: 44.0 },
  { text: 'Soup. | *Silent* soup.', at: 63.2, out: [69.3, 69.6], late: 1, lateAt: 63.9 },
  { text: 'Dessert. | *Take two.*', at: 90.2, out: [97.6, 97.85], late: 1, lateAt: 90.7 },
  { text: 'Outside. | *Just them.*', at: 98.15, out: [103.65, 103.85], late: 1, lateAt: 98.6 },
  { text: 'Meet the | *parents.*', kicker: 'MEANWHILE · THE STALL', at: 108.15, out: [111.3, 111.5], late: 1, lateAt: 108.6, top: 200 },
  { text: '*Favourite* person.', at: 112.5, out: [115.05, 115.4], size: 100, late: 1, lateAt: 112.5, top: 300 },
]

// seats behind the long table (x), feet hidden by the table
const SEAT = { mom: 170, dad: 380, sag: 640, cancer: 900 }
const SH = 260, SEATY = standY(SH, 1250)

const CA_HOPS = [...talkHops(ALL_LINES, CA, { cps: CPS }), T.hug + 0.3, 101.4]
const SG_HOPS = [...talkHops(ALL_LINES, SG, { cps: CPS }), 0.4, 1.2, T.scoot, T.snap]
const MO_HOPS = [...talkHops(ALL_LINES, MO, { cps: CPS }), T.hug, T.wow + 0.3, T.align]
const DA_HOPS = [...talkHops(ALL_LINES, DA, { cps: CPS }), T.hug + 0.2]
const LI_HOPS = [...talkHops(ALL_LINES, LI, { cps: CPS }), 109.2, 110.8, 111.0]
const SC_HOPS = [...talkHops(ALL_LINES, SC, { cps: CPS })]

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '800 34px Inter'])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'The *long way* home.' })
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0], stills: [
    { caption: 'The map', scene: c => stillMap(c, false) },
    { caption: '“This year mattered to me.”', scene: c => stillBench(c) },
    { caption: 'One more heart. Here.', scene: c => stillMap(c, true) },
  ] })
  const title = buildTitle(root, { ep: 7, title: 'Dinner with the Parents', at: T.title, len: 3 })
  const bug = showBug(root, 7, { at: 0 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function stillMap(c, pin) {
    c.fillStyle = '#2a1f4a'; c.fillRect(0, 0, 1080, 1920)
    drawMap(c, 540, 1100, 900, 20, { pins: [[0.36, 0.42, 'CAFÉ'], [0.6, 0.3, 'ROOF'], [0.84, 0.58, 'MARKET'], [0.3, 0.8, 'SNOW-STAR'], [0.68, 0.82, 'WALK HOME']], newPin: pin ? { at: 0, x: 0.14, y: 0.6, label: 'HERE' } : null })
  }
  function stillBench(c) {
    drawLane(c, 10, { time: 'late', pan: 640 }, w => {
      snowGround(w, 10)
      const B = LANE.bench
      drawWinter(w, 'cancer', B.seats[0] - 10, standY(220, B.seatY), 220, 10, { ...CAW, mood: 'happy' })
      drawWinter(w, 'sagittarius', B.seats[1] + 30, standY(220, B.seatY), 220, 10, { ...SGW, mood: 'heart' })
    })
    snowfall(c, 10, { n: 60 })
  }

  const windowSnow = t => { const r = CAFE.window; x.save(); x.beginPath(); x.rect(r.x, r.y, r.w, r.h); x.clip(); snowfall(x, t, { n: 40, big: 0.8, seed: 9 }); x.restore() }
  const taurus = (t, mood = 'happy') => c => drawWinter(c, 'taurus', CAFE.counter.x, standY(200, CAFE.counter.y), 200, t, { mood, look: [-1, 1], seed: 9, scarf: '#d8455f' })

  // ── the rules list
  function rules(t, X, Y, k) {
    if (k <= 0.01) return
    x.save(); x.translate(X, Y); x.rotate(-0.06); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-130, -96, 260, 192); x.fillStyle = '#fbf3e2'; x.fillRect(-122, -88, 244, 176)
    x.fillStyle = '#d8455f'; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('TONIGHT’S RULES', -106, -60)
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText('1. WE ARE FRIENDS', -106, -16); x.fillText('2. SEE RULE 1', -106, 22)
    x.fillStyle = '#8a6a4a'; x.font = `700 20px ${MONO}`; x.fillText('3. don’t be cute', -106, 58)
    x.restore()
  }

  // ── scenes
  function door(t) {             // cold open: the café door, snowing
    drawLane(x, t, { time: 'night', pan: 560 }, c => {
      snowGround(c, t)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 2, look: [1, 1] })
      const sq = 0.05 * Math.sin(t * 14)
      drawWinter(c, 'sagittarius', 860, standY(240), 240, t, { ...SGW, mood: t < 2.6 ? 'wide' : 'squint', look: [1, 0], hops: SG_HOPS, squash: sq })
      drawWinter(c, 'cancer', 1180, standY(230), 230, t, { ...CAW, mood: t > 3.6 ? 'neutral' : 'sparkle', look: [-1, 0], hops: CA_HOPS })
    })
    snowfall(x, t, { n: 80 })
    rules(t, 300, 1000, 1)
  }

  function greet(t) {            // Act 1: the parents, by the counter
    drawCafe(x, t, { view: 'night', behind: taurus(t) })
    windowSnow(t)
    drawPisces(x, 92, standY(120, 1250), 120, t, { tears: t > T.hug ? 3 : 2, look: [1, 0], pull: bump(t, 12.0, 0.5) })
    const F = 1460
    // Mom rushes in for the hug on Cancer
    const hp = ease.outBack(prog(t, T.hug - 0.3, T.hug + 0.1)), back = ease.inOutQuad(prog(t, T.hugEnd, T.hugEnd + 0.5))
    const momX = lerp(820, 590, hp * (1 - back) + 0.3 * back)
    drawWinter(x, 'sagittarius', momX, standY(240, F), 240, t, { ...MOW, mood: t < T.hugEnd ? 'happy' : 'sparkle', look: [-1, 0], hops: MO_HOPS, squash: inR(t, T.hug, T.hugEnd) ? 0.08 : 0 })
    drawWinter(x, 'sagittarius', 940, standY(250, F), 250, t, { ...DAW, mood: t > 17.0 && t < 20 ? 'wink' : 'happy', look: [-1, 0], hops: DA_HOPS })
    let cm = 'sparkle', cl = [1, 0]
    if (inR(t, T.hug, T.hugEnd)) { cm = 'wide'; cl = [1, -1] }
    if (t > 17.4) { cm = 'wide'; cl = [-1, 0] }
    if (t > 20.4) { cm = 'heart'; cl = [-1, 0] }
    drawWinter(x, 'cancer', 420, standY(220, F), 220, t, { ...CAW, mood: cm, look: cl, hops: CA_HOPS, blush: t > 17.4 ? 0.9 : undefined, squash: inR(t, T.hug, T.hugEnd) ? -0.08 : 0 })
    let sm = 'neutral', sl = [1, 0]
    if (t > 14.0) { sm = 'squint'; sl = [1, 0] }
    if (t > 17.3) { sm = 'wide'; sl = [1, -1] }
    if (t > 20.4) { sm = 'neutral'; sl = [0, 1] }
    drawWinter(x, 'sagittarius', 180, standY(220, F), 220, t, { ...SGW, mood: sm, look: sl, hops: SG_HOPS, blush: t > 17.3 ? 0.9 : undefined })
    if (inR(t, T.hug, T.hugEnd + 0.4)) sparkles(x, t, 500, 1150, T.hug, 12, 180, 3, [PINK, '#ffb3d9', ML_GOLD])
  }

  function dinner(t, act3 = false) {    // the long table
    drawCafe(x, t, { view: act3 ? 'late' : 'night', behind: taurus(t, inR(t, T.snap, 70) ? 'neutral' : 'happy') })
    windowSnow(t)
    drawPisces(x, 930, standY(120, 985), 120, t, { tears: t > T.snap ? 3 : 2, look: [-1, 1], pull: bump(t, 59.2, 0.6) + bump(t, 95.0, 0.5) })
    // the gap: Sag scoots away at the start; Act 3 they sit close
    const gap = ease.outBack(prog(t, T.scoot, T.scoot + 0.4)) * (1 - ease.inOutQuad(prog(t, T.closer, T.closer + 0.6)))
    const sx = SEAT.sag - gap * 120, cx = SEAT.cancer + gap * 60 - (act3 ? 60 * ease.inOutQuad(prog(t, T.closer, T.closer + 0.6)) : 0)
    let mm = 'happy', ml = [1, 0]
    if (inR(t, 31.4, 34.6)) { mm = 'squint'; ml = [1, 0] }
    if (t > T.wow) { mm = 'heart'; ml = undefined }
    if (t > T.snap) { mm = 'wide'; ml = [1, 0] }
    if (t > 62) { mm = 'neutral'; ml = [1, 1] }
    if (act3) { mm = t > 93.6 ? 'heart' : 'neutral'; ml = [1, 0] }
    drawWinter(x, 'sagittarius', SEAT.mom, SEATY, SH, t, { ...MOW, mood: mm, look: ml, hops: MO_HOPS })
    let dm = 'happy', dl = [1, 0]
    if (t > T.snap) { dm = 'wide'; dl = [1, 0] }
    if (t > 62) { dm = 'neutral'; dl = [0, 1] }
    if (act3) { dm = t > 93.6 ? 'happy' : 'neutral'; dl = t > 93.6 ? undefined : [1, 0] }
    drawWinter(x, 'sagittarius', SEAT.dad, SEATY, SH + 10, t, { ...DAW, mood: dm, look: dl, hops: DA_HOPS })
    let sm = 'neutral', sl = [1, 0]
    if (t > 28.0 && t < 31) { sm = 'happy'; sl = undefined }
    if (inR(t, 40.4, 47.4)) { sm = 'sparkle'; sl = [1, 0] }
    if (t > T.wow) { sm = 'wide'; sl = [-1, 0] }
    if (t > T.snap) { sm = 'squint'; sl = [-1, 0] }
    if (t > 57) { sm = 'neutral'; sl = [0, 1] }
    if (act3) { sm = t > 93.4 ? 'sparkle' : 'neutral'; sl = t > 93.4 ? [1, 0] : [-1, 0] }
    drawWinter(x, 'sagittarius', sx, SEATY, SH, t, { ...SGW, mood: sm, look: sl, hops: SG_HOPS, blush: act3 && t > 93.4 ? 0.9 : undefined })
    let cm = 'neutral', cl = [-1, 0]
    if (t > 25.2 && t < 28) { cm = 'squint'; cl = [-1, 0] }
    if (inR(t, 40.4, 47.4)) { cm = 'sparkle'; cl = [-1, 0] }
    if (t > T.wow) { cm = 'wide'; cl = [-1, -1] }
    if (t > T.snap + 0.2) { cm = 'wide'; cl = [-1, 0] }
    if (t > T.quiet) { cm = 'neutral'; cl = [0, 1] }
    if (act3) { cm = t > 93.6 ? 'heart' : 'neutral'; cl = [-1, 0] }
    drawWinter(x, 'cancer', cx, SEATY, SH, t, { ...CAW, mood: cm, look: cl, hops: CA_HOPS, squash: inR(t, T.quiet, 70) ? 0.08 : 0, blush: (inR(t, T.wow, T.snap) || (act3 && t > 93.6)) ? 0.9 : undefined })
    drawLongTable(x, t, { y: 1185, x0: 30, x1: 1050, candles: true })
    // the in-sync story: little matching thought bubbles
    T.sync.forEach((s, i) => { const k = pop01(t, s, 0.22, 2) * outK(t, [T.wow, T.wow + 0.2]); if (k > 0.01) drawBubble(x, i % 2 ? cx : sx, 900 - i * 6, ['snow!', 'winter!', 'oops!', 'cookies!'][i], { size: 28, k, tail: 'down', col: i % 2 ? '#d2f0ff' : '#ecdcff' }) })
    if (t > T.wow) sparkles(x, t, 740, 900, T.wow, 12, 200, 5, [PINK, ML_GOLD, BONE])
    // Mom's phone: the reading
    if (t > T.phone[0] && t < T.phoneOut[1]) {
      const pin = ease.outBack(prog(t, ...T.phone)), po = ease.inCubic(prog(t, ...T.phoneOut))
      drawPhone(x, 330, 880 + (1 - pin) * 1100 + po * 1100, 380, 520, t, { title: 'tonight’s reading', msgs: [{ at: 53.2, side: 'L', text: 'PUSH · PULL · …' }, { at: T.align, side: 'L', text: 'ALIGN!' }] })
    }
    if (t > T.snap && t < T.snap + 0.5) { x.save(); x.globalAlpha = bump(t, T.snap, 0.5); x.fillStyle = '#ff7a7a'; x.font = `800 70px ${MONO}`; x.textAlign = 'center'; x.fillText('!!', sx, 1030); x.restore() }
    if (t > T.quiet + 1) { x.save(); x.globalAlpha = 0.5 * outK(t, [69, 69.6]); x.fillStyle = BONE; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.fillText('slurp.', 300, 1260); x.fillText('…slurp.', 800, 1270); x.restore() }
  }

  function outside(t) {          // Act 3b: outside the café, snow
    drawLane(x, t, { time: 'late', pan: 560, lit: ['a4', 'pisces', 'cafe', 'c2'] }, c => {
      snowGround(c, t)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 3, look: [1, 1], pull: bump(t, 102.8, 0.5) })
      drawWinter(c, 'sagittarius', 900, standY(230), 230, t, { ...SGW, mood: t > 101.7 ? 'happy' : 'neutral', look: t > 101.7 ? undefined : [1, 0], hops: SG_HOPS, blush: t > 101 ? 0.9 : undefined })
      drawWinter(c, 'cancer', 1150, standY(230), 230, t, { ...CAW, mood: t > 100.5 ? (t > 102.4 ? 'heart' : 'sparkle') : 'neutral', look: [-1, 0], hops: CA_HOPS, blush: t > 101 ? 0.9 : undefined })
    })
    snowfall(x, t, { n: 70, speed: 0.7, wind: 0.1 })
    if (t > 102.9) sparkles(x, t, 600, 1150, 102.9, 12, 200, 8, [PINK, '#ffb3d9', ML_GOLD])
  }

  function tag(t) {              // the stall: hug or handshake
    drawLane(x, t, { time: 'night', pan: 1080 }, c => {
      snowGround(c, t)
      const tilt = Math.sin((t - T.tilt[0]) * 7) * 0.22 * (inR(t, ...T.tilt) ? 1 : 0)
      drawWinter(c, 'libra', 1720, standY(230), 230, t, { scarf: '#c9a6ff', hat: '#7dffb0', mood: t > T.both + 0.3 ? 'happy' : 'squint', look: [1, 0], hops: LI_HOPS, seed: 10, rot: tilt })
      drawWinter(c, 'scorpio', 2000, standY(230), 230, t, { scarf: '#fff1c8', mood: t > T.both ? 'happy' : 'neutral', look: [-1, 0], hops: SC_HOPS, seed: 11 })
    })
    snowfall(x, t, { n: 60, seed: 7 })
    const k1 = pop01(t, 109.0, 0.2, 2) * outK(t, [T.both, T.both + 0.2]), k2 = pop01(t, 109.5, 0.2, 2) * outK(t, [T.both, T.both + 0.2])
    drawBubble(x, 470, 960, 'HUG?', { size: 34, k: k1, tail: 'down', col: '#ffd2e0' })
    drawBubble(x, 760, 900, 'HANDSHAKE?', { size: 34, k: k2, tail: 'down', col: '#d2f0ff' })
    if (t > T.both) sparkles(x, t, 760, 1150, T.both + 0.4, 12, 200, 9, [PINK, ML_GOLD, BONE])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.title + 0.2) door(t)
      else if (t < T.table) greet(t)
      else if (t < T.act3) { if (t < T.advise + 0.7) dinner(t); else drawSky(x, t, SKY_H) }
      else if (t < T.out) dinner(t, true)
      else if (t < T.tag) outside(t)
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

// card-cut candidates (cardfx plays the middle one: 40.0, the question → the story)
const CUTS = [24.0, 40.0, 52.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [783.99, 880, 987.77, 1174.66, 1318.51, 1567.98, 1760]
export const CUES = [
  ['pop', 0.3, 880, 0.03, -0.3], ['tick', 0.32, 0.04],
  ...previouslyCues(T.prev[0], 3, T.prev[1] - T.prev[0]),
  ...titleCues(T.title, 3),
  ...captionCues(CAPS[1]), ['whoosh', r3(T.hug - 0.3), 0.4, 0.045], ['pop', T.hug, 1174.66, 0.045, 0], ['glitter', T.hug, r3(T.hug + 0.6)],
  ...popCues(CAPS[2]), ['bell', 20.6, 1567.98, 0.025, 1.2, 0.2],
  ...popCues(CAPS[3]), ['whoosh', T.scoot, 0.3, 0.03], ['tick', r3(T.scoot + 0.3), 0.05],
  ...popCues(CAPS[4]), ...T.sync.map((s, i) => ['pop', s, NOTE[i], 0.035, i % 2 ? 0.3 : -0.3]), ['glitter', T.wow, r3(T.wow + 0.6)], ['bell', T.wow, 1760, 0.03, 1.2, 0],
  ['whoosh', T.phone[0], 0.35, 0.04], ['pop', 53.2, 987.77, 0.035, -0.3], ['pop', T.align, 1318.51, 0.045, -0.3], ['glitter', T.align, r3(T.align + 0.5)], ['whoosh', T.phoneOut[0], 0.3, 0.03],
  ['tom', T.snap, 84, { gain: 0.28, decay: 0.3 }], ['clap', T.snap, { gain: 0.15 }],
  ['pop', T.quiet, 392, 0.03, 0.3], ['pop', r3(T.quiet + 0.25), 349.23, 0.025, 0.3],
  ...popCues(CAPS[5]), ['tick', 64.8, 0.02], ['tick', 66.4, 0.02], ['tick', 67.9, 0.02],
  ...adviseCues(ADVISE),
  ...popCues(CAPS[6]), ['whoosh', T.closer, 0.3, 0.03], ['bell', 93.6, 1567.98, 0.03, 1.2, 0], ['glitter', 93.6, 94.2],
  ...popCues(CAPS[7]), ['glitter', 102.9, 103.5], ['bell', 103.0, 1760, 0.03, 1.2, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'G' }),
  ...captionCues(CAPS[8]), ['pop', 109.0, 880, 0.035, -0.2], ['pop', 109.5, 987.77, 0.035, 0.2], ['pop', T.both, 1174.66, 0.045, 0], ['glitter', r3(T.both + 0.4), r3(T.both + 1.0)],
  ...nextTimeCues(T.next), ...popCues(CAPS[9]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CA]: 932, [SG]: 698.46, [MO]: 1046.5, [DA]: 523.25, [LI]: 1046.5, [SC]: 659.25 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
