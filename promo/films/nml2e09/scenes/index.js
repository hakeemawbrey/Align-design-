// nml2e09 — MOONLIGHT LANE, Ep 9: "What We Didn't Say" (120 s vertical, Winter on the Lane; cinematic · Dm).
// Batch b20 (promo/films/next30/b20.md). The pair: ♋ Cancer × ♐ Sagittarius (b19's setup). Kit: mlpilot/scenes/mlkit.js
// (read-only) + ../../nml2e06/scenes/winter.js. Story 0–115.6, then the shared end card.
//   0.0–5.0    HOOK + COLD OPEN  "One table. | *Nobody* says it." (SATURDAY · 7:30 PM) ♉ Taurus mid-slam of a huge soup
//              pot on the long table. "dinner rule: answer the card. *honestly.*"
//   5.0–7.0    ◀◀ PREVIOUSLY ON (the shortcut · the knock · "on purpose")
//   7.0–10.0   TITLE CARD  Ep 9 · What We Didn't Say.
//  10.0–24.0   ACT 1  The lane's winter dinner. The talk card: "What's something you haven't said this year?"
//  24.0–40.0   The truths go round: ♍ Virgo "the matching sweaters *itch.*" ♈ Aries "…mine *too!*" ♑ Capricorn "I want
//              a day *off.*" ♌ Leo "I'm… *shy* sometimes." ♓ Pisces, sobbing: "I'm *fine.*"
//  40.0        card cut.
//  40.0–52.0   ACT 2  Cancer's turn: "I… like… *soup.*" Sag's turn: "same. soup. *big* soup fan." The table knows.
//  52.0–70.0   Sag leaves "to get more *bread.*" Leo's bad advice: "let them come back to *you.*" The empty chair.
//  70.0–90.0   ★ THE STARS ADVISE: Say it to them, not the room · Say it without a demand · Go after them, gently.
//  90.0–104.0  ACT 3 (lift)  The snowy back step. "can I tell you something? just *us?*" "I've liked you since *last
//              winter.*" "you don't have to answer *tonight.*" "I've been answering for a *year.*" "you just didn't
//              *ask.*" The whole table is pressed to the café window.
// 104.0–108.0  ★ LESSON UNLOCKED "Unsaid | isn't *safe.*" +1 SAID IT
// 108.0–111.6  LANE TAG  ♏ Scorpio's card: "since the first pastry. *always.*" ♎ Libra: "I know. I kept the bag."
// 111.6–115.6  NEXT TIME "Christmas Eve. *Lights on.*" · last line "You just didn't *ask.*"
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
  buildNextTime, nextTimeCues, popCues, drawBubble, sparkles, rgba,
} from '../../mlpilot/scenes/mlkit.js'
import { snowGround, snowfall, drawWinter, drawTalkCard, drawLongTable } from '../../nml2e06/scenes/winter.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN       // 115.6
const S = id => signStar(id)
const nm = (id, n) => `${S(id).glyph}︎ ${n}`
const CA = nm('cancer', 'CANCER'), SG = nm('sagittarius', 'SAGITTARIUS'), TA = nm('taurus', 'TAURUS'), VI = nm('virgo', 'VIRGO'), AR = nm('aries', 'ARIES')
const CP = nm('capricorn', 'CAPRICORN'), LE = nm('leo', 'LEO'), PI = nm('pisces', 'PISCES'), LI = nm('libra', 'LIBRA'), SC = nm('scorpio', 'SCORPIO')
const COL = { [CA]: '#8fe6ff', [SG]: '#d6b0ff', [TA]: '#ffd98a', [VI]: '#ff9fc4', [AR]: '#ff9a7a', [CP]: '#7ff0c8', [LE]: '#ffbe73', [PI]: '#b8b2ff', [LI]: '#ffb0f0', [SC]: '#ff9fb4' }
const CAW = { scarf: '#ff8fb1', hat: '#ff8fb1', seed: 21 }, SGW = { scarf: '#ffd36e', seed: 22 }
const CARD = 'What’s something you haven’t said this year?'

const T = {
  prev: [5.0, 7.0], title: 7.0,
  slam: 0.25, card: 11.0, cardOut: [17.4, 17.8],
  truths: [24.6, 27.2, 29.8, 32.6, 35.4], hug: 27.6,
  caTurn: 41.4, sgTurn: 46.6, stare: 49.0,
  leave: [53.4, 54.4], leo: 57.6,
  advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, arrive: [90.2, 91.0], ask: 101.2,
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, bag: 110.0,
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Unsaid | isn’t *safe.*', chip: '+1 SAID IT' }

const CPS = 28
const ln = (t, sp, text) => ({ t, speaker: sp, color: COL[sp], text })
const L0 = [ln(2.75, TA, 'dinner rule: answer the card. *honestly.*')]
const L1 = [
  ln(10.8, TA, 'tonight’s card. *everyone* answers.'),
  ln(18.4, CA, '…oh *no.*'),
  ln(20.4, SG, 'easy! I’ll go *last.*'),
]
const L2 = [
  ln(T.truths[0], VI, 'the matching sweaters *itch.*'),
  ln(T.truths[1], AR, '…mine *too!*'),
  ln(T.truths[2], CP, 'I want a day *off.* a whole one.'),
  ln(T.truths[3], LE, 'I’m… *shy* sometimes.'),
  ln(T.truths[4], PI, 'I’m *fine.*'),
]
const L3 = [
  ln(T.caTurn, CA, 'I… like… *soup.*'),
  ln(44.0, TA, '…thank you?'),
  ln(T.sgTurn, SG, 'same. soup. *big* soup fan.'),
]
const L4 = [
  ln(52.6, SG, 'I’ll get more *bread.*'),
  ln(55.2, CA, 'I did it *again.*'),
  ln(T.leo, LE, 'let them come back to *you.* mysterious!'),
]
const L5 = [
  ln(90.8, CA, 'can I tell you something? just *us?*'),
  ln(93.4, CA, 'I’ve liked you since *last winter.*'),
  ln(96.0, CA, 'you don’t have to answer *tonight.*'),
  ln(98.7, SG, 'I’ve been answering for a *year.*'),
  ln(T.ask, SG, 'you just didn’t *ask.*'),
]
const L6 = [ln(108.4, SC, 'since the first pastry. *always.*')]
const BOXES = [[L0, 2.6, 4.95], [L1, 10.6, 23.6], [L2, 24.4, 39.6], [L3, 41.2, 51.6], [L4, 52.4, 62.6], [L5, 90.6, 103.9], [L6, 108.2, 111.4]]
const ALL_LINES = BOXES.flatMap(b => b[0])

const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'heart', head: 'Say it to *them.*', body: 'Big things deserve a quiet moment, not a whole table.' },
    { at: T.cards[1], icon: 'chat', head: 'No *demand* attached.', body: '“I like you. You don’t have to answer tonight.”' },
    { at: T.cards[2], icon: 'door', head: 'Go after them, *gently.*', body: '“Can I tell you something, just us?”' },
  ],
  lines: [
    { t: 71.05, text: 'Cancer, this one’s *yours.*' },
    { t: 73.95, text: 'soup was safe. it wasn’t *true.*' },
    { t: 77.5, text: 'no pressure. no deadline. just *say it.*' },
    { t: 80.4, text: 'Sag, you’re in this too. *notice.*' },
    { t: 83.5, text: 'don’t wait for them to come back.' },
    { t: 86.5, text: 'walk to the door. *gently.*' },
  ],
}

const CAPS = [
  { text: 'One table. | *Nobody* says it.', kicker: 'SATURDAY · 7:30 PM', at: -1.2, out: [4.8, 4.95], size: 88 },
  { text: 'The lane’s | winter *dinner.*', at: 10.3, out: [17.2, 17.4], late: 1, lateAt: 10.9 },
  { text: 'Cancer: | *oh no.*', at: 17.9, out: [23.6, 23.85], late: 1, lateAt: 18.4 },
  { text: 'The truths | go *round.*', at: 24.2, out: [39.5, 39.7], late: 1, lateAt: 24.8 },
  { text: 'Cancer’s | *turn.*', at: 40.3, out: [46.4, 46.55], late: 1, lateAt: 40.8 },
  { text: 'The table | *knows.*', at: T.stare, out: [51.6, 51.85], late: 1, lateAt: 49.5 },
  { text: 'Unsaid. | *Again.*', at: 62.8, out: [69.3, 69.6], late: 1, lateAt: 63.5 },
  { text: 'The back step. | *Just us.*', at: 90.2, out: [92.6, 92.8], late: 1, lateAt: 90.7 },
  { text: 'Same card. | *Same table.*', kicker: 'MEANWHILE', at: 108.15, out: [111.3, 111.5], late: 1, lateAt: 108.6 },
  { text: 'You just didn’t *ask.*', at: 112.5, out: [115.05, 115.4], size: 92, late: 1, lateAt: 112.5, top: 300 },
]

// the table: seated behind it (x), feet hidden
const SEATS = [['virgo', 110, VI, { scarf: '#ef5c94', hat: '#7dffb0' }], ['aries', 270, AR, { scarf: '#ef5c94', hat: '#7dffb0' }], ['capricorn', 430, CP, { scarf: '#9a6a48' }], ['sagittarius', 610, SG, SGW], ['cancer', 790, CA, CAW], ['leo', 960, LE, { scarf: '#7dffb0', hat: '#d8455f' }]]
const SZ = 215, SY = standY(SZ, 1255)

const hops = sp => [...talkHops(ALL_LINES, sp, { cps: CPS })]

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '800 34px Inter'])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'Christmas Eve. *Lights on.*' })
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0], stills: [
    { caption: 'The shortcut. Too fast.', scene: c => stillLane(c, 0) },
    { caption: '“One more block?”', scene: c => stillLane(c, 1) },
    { caption: '“The long way, on purpose.”', scene: c => stillLane(c, 2), crop: [700, 760, 640, 760] },
  ] })
  const title = buildTitle(root, { ep: 9, title: 'What We Didn’t Say', at: T.title, len: 3 })
  const bug = showBug(root, 9, { at: 0 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function stillLane(c, k) {
    drawLane(c, 10, { time: k ? 'late' : 'night', pan: 560 }, w => {
      snowGround(w, 10)
      const gap = k === 0 ? 260 : 190
      drawWinter(w, 'cancer', 1010 - gap / 2, standY(230), 230, 10, { ...CAW, mood: k === 2 ? 'heart' : k ? 'happy' : 'neutral', look: [1, 0] })
      drawWinter(w, 'sagittarius', 1010 + gap / 2, standY(240), 240, 10, { ...SGW, mood: k === 2 ? 'heart' : k ? 'sparkle' : 'neutral', look: [-1, 0] })
    })
    snowfall(c, 10, { n: 60 })
  }

  const windowSnow = t => { const r = CAFE.window; x.save(); x.beginPath(); x.rect(r.x, r.y, r.w, r.h); x.clip(); snowfall(x, t, { n: 40, big: 0.8, seed: 9 }); x.restore() }
  function spot(px, k) {          // a warm spotlight behind whoever's answering
    if (k <= 0.01) return
    const g = x.createRadialGradient(px, 1060, 0, px, 1060, 200); g.addColorStop(0, rgba(ML_GOLD, 0.35 * k)); g.addColorStop(1, rgba(ML_GOLD, 0))
    x.fillStyle = g; x.fillRect(px - 200, 860, 400, 400)
  }
  function pot(t, X, Y, k = 1) {
    x.save(); x.translate(X, Y); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-120, -100, 240, 112); x.fillRect(-150, -80, 30, 20); x.fillRect(120, -80, 30, 20)
    x.fillStyle = '#c0504a'; x.fillRect(-112, -92, 224, 96); x.fillStyle = '#e07a6a'; x.fillRect(-112, -92, 224, 14)
    x.fillStyle = '#ffd98a'; x.fillRect(-100, -104, 200, 10)
    for (let i = 0; i < 4; i++) { const s = Math.sin(t * 2 + i) * 8; x.globalAlpha = 0.45; x.fillStyle = '#ffffff'; x.fillRect(-60 + i * 40 + s, -170 - i * 6, 10, 50); x.globalAlpha = 1 }
    x.restore()
  }

  // ── the dinner (cold open → Act 2)
  function dinner(t) {
    drawCafe(x, t, { view: 'night', behind: c => t >= T.title && drawWinter(c, 'taurus', CAFE.counter.x, standY(200, CAFE.counter.y), 200, t, { scarf: '#d8455f', mood: t > T.caTurn && t < 46 ? 'squint' : 'happy', look: [-1, 1], hops: hops(TA), seed: 9 }) })
    windowSnow(t)
    drawPisces(x, 930, standY(120, 985), 120, t, { tears: t > T.truths[4] ? 3 : 2, look: [-1, 1], pull: bump(t, T.truths[4], 0.6) + bump(t, 58.0, 0.6) })
    // spotlight on the speaker during the truths
    const order = [110, 270, 430, 960, 930]
    T.truths.forEach((s, i) => spot(order[i], bump(t, s - 0.2, 2.7)))
    spot(790, bump(t, T.caTurn - 0.2, 2.8)); spot(610, bump(t, T.sgTurn - 0.2, 2.6))
    for (const [id, sx, sp, w] of SEATS) {
      let mood = 'happy', look = undefined
      const gone = id === 'sagittarius' ? ease.inCubic(prog(t, ...T.leave)) : 0
      if (gone >= 1) continue
      if (t > T.card && t < 24) { mood = 'neutral'; look = [0, 1] }
      if (id === 'cancer') { if (t > 18.2) { mood = 'wide'; look = [-1, 0] } if (t > 24) { mood = 'neutral'; look = [-1, 0] } if (t > T.caTurn) { mood = 'squint'; look = [0, 1] } if (t > T.sgTurn) { mood = 'wide'; look = [-1, 0] } if (t > T.leave[0]) { mood = 'neutral'; look = [-1, 1] } if (t > 55) { mood = 'squint'; look = [0, 1] } }
      if (id === 'sagittarius') { if (t > 20.2) { mood = 'sparkle'; look = [1, 0] } if (t > T.caTurn) { mood = 'neutral'; look = [1, 0] } if (t > T.sgTurn) { mood = 'happy'; look = undefined } if (t > T.stare) { mood = 'wide'; look = [0, -1] } }
      if (['virgo', 'aries', 'capricorn', 'leo'].includes(id) && t > T.stare && t < 53.4) { mood = 'squint'; look = [sx < 700 ? 1 : -1, 0] }
      if (id === 'aries' && inR(t, T.hug, 29.6)) { mood = 'heart'; look = undefined }
      if (id === 'virgo' && inR(t, T.hug, 29.6)) { mood = 'heart'; look = undefined }
      if (id === 'leo' && inR(t, T.truths[3], T.truths[3] + 2.5)) { mood = 'squint'; look = [0, 1] }
      const hug = (id === 'virgo' ? 30 : id === 'aries' ? -30 : 0) * bump(t, T.hug, 2.0)
      drawWinter(x, id, sx + hug, SY - gone * 30, SZ, t, { ...w, mood, look, hops: [...hops(sp), ...(t > 52 && id === 'sagittarius' ? [52.9, 53.2] : [])], alpha: 1 - gone, blush: id === 'leo' && inR(t, T.truths[3], T.truths[3] + 2.5) ? 0.9 : undefined, squash: id === 'cancer' && t > 55 ? 0.08 : 0 })
    }
    // Taurus, front and centre for the cold open (the slam)
    if (t < T.title) drawWinter(x, 'taurus', 540, standY(300, 1160) + 30 * bump(t, T.slam, 0.3), 300, t, { scarf: '#d8455f', mood: t < 0.6 ? 'wide' : 'happy', look: t < 0.6 ? [0, 1] : undefined, hops: hops(TA), seed: 9, squash: 0.12 * bump(t, T.slam, 0.3) })
    drawLongTable(x, t, { y: 1185, x0: 30, x1: 1050, candles: true })
    // the soup pot: slammed down in the cold open (it's served by the title)
    const drop = ease.inCubic(prog(t, -0.4, 0))
    if (t < T.title) pot(t, 540, lerp(1100, 1182, drop), 1 + 0.08 * bump(t, T.slam, 0.25))
    if (t < 1.2) sparkles(x, t, 540, 1160, T.slam, 10, 200, 3, [BONE, ML_GOLD, '#ffd98a'])
    if (t < 1.0) { x.save(); x.globalAlpha = 1 - t; x.fillStyle = BONE; x.font = `800 46px ${MONO}`; x.textAlign = 'center'; x.fillText('CLANG!', 800, 960); x.restore() }
    // the talk card, big, then small on the table
    const ck = pop01(t, T.card, 0.4, 1.7) * outK(t, T.cardOut)
    if (ck > 0.01) drawTalkCard(x, 540, 760, 400 * ck, t, { text: CARD, rot: -0.03, size: 32 })
    if (t > T.cardOut[0]) drawTalkCard(x, 540, 1290, 110, t, { text: CARD, rot: 0.15, size: 30, alpha: Math.min(1, (t - T.cardOut[0]) * 3) })
    if (t > T.stare && t < 53.4) { x.save(); x.globalAlpha = 0.85 * bump(t, T.stare, 4.4); x.fillStyle = BONE; x.font = `800 44px ${MONO}`; x.textAlign = 'center'; x.fillText('…', 300, 940); x.fillText('…', 920, 900); x.restore() }
    if (t > T.leave[0] && t < 62) { x.save(); x.globalAlpha = 0.7 * Math.min(1, t - T.leave[0]); x.fillStyle = '#6a4a5a'; x.fillRect(560, 1130, 100, 50); x.restore() }
  }

  // ── the back step
  function backStep(t) {
    drawLane(x, t, { time: 'late', pan: 440, lit: ['a4', 'pisces', 'cafe', 'c2'] }, c => {
      snowGround(c, t)
      // the whole table pressed to the café window (silent cheering)
      const win = LANE.windows.find(w => w.id === 'cafe')
      const k = ease.outCubic(prog(t, 95.0, 96.0))
      ;[['virgo', 0.12], ['aries', 0.3], ['capricorn', 0.48], ['leo', 0.66], ['taurus', 0.84]].forEach(([id, u], i) => {
        if (k > 0.01) drawWinter(c, id, win.x + u * win.w, standY(90, win.y + win.h + 10) + (1 - k) * 60, 90, t, { mood: t > T.ask ? 'heart' : 'wide', look: [1, 0], hops: t > T.ask ? [T.ask + 0.2 + i * 0.1, T.ask + 0.8 + i * 0.1] : [], seed: 40 + i })
      })
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 3, look: [1, 1], pull: bump(t, 101.6, 0.6) })
      // Sag on the step (sitting), Cancer arrives from the door
      const ar = ease.inOutQuad(prog(t, ...T.arrive))
      let sm = 'neutral', sl = [0, 1]
      if (t > 91) { sm = 'wide'; sl = [-1, 0] }
      if (t > 93.6) { sm = 'heart'; sl = [-1, 0] }
      if (t > 98.6) { sm = 'happy'; sl = undefined }
      drawWinter(c, 'sagittarius', 1150, standY(230, 1395), 230, t, { ...SGW, mood: sm, look: sl, hops: hops(SG), blush: t > 93.4 ? 0.9 : undefined })
      let cm = 'neutral', cl = [1, 0]
      if (t > 93.4) { cm = 'sparkle'; cl = [1, 0] }
      if (t > 98.7) { cm = 'wide'; cl = [1, 0] }
      if (t > T.ask) { cm = 'heart'; cl = undefined }
      drawWinter(c, 'cancer', lerp(970, 920, ar), standY(230), 230, t, { ...CAW, mood: cm, look: cl, hops: hops(CA), blush: t > 93.4 ? 0.9 : undefined })
    })
    snowfall(x, t, { n: 70, speed: 0.6, wind: 0.08 })
    if (t > T.ask) sparkles(x, t, 600, 1150, T.ask + 0.3, 14, 220, 13, [PINK, '#ffb3d9', ML_GOLD])
  }

  function tag(t) {               // Libra × Scorpio at the cleared table
    drawCafe(x, t, { view: 'late', lights: 0.7, chairsUp: 1 })
    drawWinter(x, 'libra', 360, standY(260, 1190), 260, t, { scarf: '#c9a6ff', hat: '#7dffb0', mood: t > T.bag ? 'heart' : 'sparkle', look: [1, 0], seed: 10, hops: [T.bag] })
    drawWinter(x, 'scorpio', 720, standY(260, 1190), 260, t, { scarf: '#fff1c8', mood: t > 109.6 ? 'heart' : 'neutral', look: [-1, 0], seed: 11, hops: hops(SC), blush: 0.9 })
    drawLongTable(x, t, { y: 1185, x0: 120, x1: 960, dishes: false, candles: true })
    drawTalkCard(x, 540, 1150, 120, t, { text: CARD, rot: -0.1, size: 30 })
    // the bag Libra kept (a little paper pastry bag)
    const bk = pop01(t, T.bag, 0.3, 2)
    if (bk > 0.01) { x.save(); x.translate(250, 1000); x.scale(bk, bk); x.fillStyle = INK; x.fillRect(-46, -60, 92, 120); x.fillStyle = '#d9b48a'; x.fillRect(-40, -54, 80, 108); x.fillStyle = '#c49a6a'; x.fillRect(-40, -54, 80, 16); x.fillStyle = '#d8455f'; x.fillRect(-12, -10, 24, 20); x.restore() }
    drawBubble(x, 480, 860, 'I know. I kept the bag.', { size: 34, k: pop01(t, T.bag, 0.25, 2) * outK(t, [111.25, 111.45]), tail: 'down' })
    if (t > T.bag) sparkles(x, t, 540, 1000, T.bag + 0.2, 12, 200, 21, [PINK, '#ffb3d9', ML_GOLD])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.act3) { if (t < T.advise + 0.7) dinner(t); else drawSky(x, t, SKY_H) }
      else if (t < T.tag) backStep(t)
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

const CUTS = [24.0, 40.0, 52.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [587.33, 659.25, 698.46, 880, 987.77, 1174.66, 1318.51]
export const CUES = [
  ['tom', T.slam, 80, { gain: 0.3, decay: 0.3 }], ['clap', T.slam, { gain: 0.2 }], ['bell', r3(T.slam + 0.02), 1318.51, 0.03, 0.8, 0.2],
  ...previouslyCues(T.prev[0], 3, T.prev[1] - T.prev[0]),
  ...titleCues(T.title, 3),
  ...popCues(CAPS[1]), ['whoosh', T.card, 0.4, 0.04], ['pop', r3(T.card + 0.35), 1174.66, 0.045, 0], ['glitter', T.card, r3(T.card + 0.6)], ['whoosh', T.cardOut[0], 0.3, 0.03],
  ...popCues(CAPS[2]),
  ...popCues(CAPS[3]), ...T.truths.map((s, i) => ['pluck', r3(s - 0.15), NOTE[(i * 2) % 7], 0.025, 0.4, (i - 2) * 0.2]), ['glitter', T.hug, r3(T.hug + 0.6)], ['pop', r3(T.truths[4] + 0.6), 523.25, 0.035, 0.3],
  ...popCues(CAPS[4]), ['pop', r3(T.caTurn + 1.6), 392, 0.03, 0], ['pop', r3(T.sgTurn + 1.6), 392, 0.03, 0],
  ...popCues(CAPS[5]), ['tick', T.stare, 0.05], ['tick', r3(T.stare + 0.4), 0.05],
  ['whoosh', T.leave[0], 0.4, 0.04], ['pop', 55.2, 349.23, 0.03, 0.2],
  ...popCues(CAPS[6]),
  ...adviseCues(ADVISE),
  ...popCues(CAPS[7]), ['whoosh', T.arrive[0], 0.3, 0.03], ['bell', 93.6, 1567.98, 0.03, 1.4, 0], ['glitter', 95.2, 95.8],
  ['bell', T.ask, 1760, 0.035, 1.6, 0], ['glitter', r3(T.ask + 0.3), r3(T.ask + 1.0)], ['clap', r3(T.ask + 0.3), { gain: 0.12 }],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Dm' }),
  ...captionCues(CAPS[8]), ['pop', T.bag, 1174.66, 0.04, 0], ['glitter', r3(T.bag + 0.2), r3(T.bag + 0.8)],
  ...nextTimeCues(T.next), ...popCues(CAPS[9]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CA]: 932, [SG]: 698.46, [TA]: 587.33, [VI]: 1108.73, [AR]: 880, [CP]: 740, [LE]: 830.61, [PI]: 1244.51, [LI]: 1046.5, [SC]: 659.25 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
