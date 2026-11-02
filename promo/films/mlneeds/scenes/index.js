// mlneeds: MOONLIGHT LANE, Ep 8 "Different Speeds" (120 s vertical, Star Talk, promo/films/STARTALK-EPISODES.md).
// Music: lofi · Eb. Story 0–115.6, then the shared end card. The show kit is ./mlkit.js (a verbatim copy of mlpilot's).
//   0.0–2.0     ◀◀ PREVIOUSLY ON Moonlight Lane… (Ep 7: Sag left for a year · "I miss you. And I'm scared." · 5 AM)
//   2.0–7.0     cold open: Pisces on the couch, phone up: "had fun! I need a quiet day tomorrow." → "they HATE me."
//   7.0–10.0    title card: EP 8 · Different Speeds
//  10.0–20.0    Friday on the bench under the lamp: a lovely date. "I'll need a quiet day to *recharge.*"
//  20.0–30.0    split, Saturday: Pisces feels it *now* (hearts popping) / Aquarius needs a *day* (book, tea, telescope).
//  30.0–40.0    the café: Gemini's bad advice ("quiet means *bored.* text them again!"), Taurus: "or… eat a bun *first?*"
//  40.0        card cut (the kept one).
//  40.0–49.0    the long message, then another; the tissue pile grows (the tissue-box gag, part 1).
//  49.0–56.0    split: Aquarius' phone buzzes twice; they type… delete… go quieter. Pisces watches the dots vanish.
//  56.0–63.0    split mirror: "am I too *much?*" / "am I too *little?*"
//  63.0–70.0    the low point: the tissue box is EMPTY. Pisces peers inside. "I'm out of *tissues.*"
//  70.0–90.0    ★ THE STARS ADVISE: Needs aren't flaws · Ask plainly · Agree on a signal (tonight's move).
//  90.0–101.4   the bench, dusk: "I need a check-in when you go *quiet.*" / "I need a day to think. it's not *you.*"
//               Aquarius holds up a pixel moon: "one moon = I'm *still here.*"
// 101.4–108.0   split, the next quiet day: Aquarius sends a moon; it flies up through the seam to Pisces' phone. Happy
//               tears. "*Still here.*" (the last line)
// 104.0–108.0   ★ LESSON UNLOCKED "Quiet isn't | *goodbye.*" +1 PIXEL MOON
// 108.0–111.6   lane tag at the café counter: Scorpio asks Libra's name for the cake… it's already piped on.
// 111.6–115.6   NEXT TIME ON Moonlight Lane… "Virgo wants to say it *first.*"
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  BONE, INK, INTER, MONO, ML_GOLD, GOLD, r3, mixHex, pop01, outK, bump,
  loadFonts, drawLane, LANE, standY, drawSign, drawPisces, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues,
  buildNextTime, nextTimeCues, drawPastry, drawBubble, drawPhone, drawIcon, sparkles,
} from './mlkit.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN          // 115.6
const KEY = 'Eb'
const P_ = signStar('pisces'), A_ = signStar('aquarius')
const PIS = `${P_.glyph}︎ PISCES`, AQU = `${A_.glyph}︎ AQUARIUS`, GEM = `${signStar('gemini').glyph}︎ GEMINI`, TAU = `${signStar('taurus').glyph}︎ TAURUS`
const PC = mixHex(P_.color, '#ffffff', 0.3), AC = mixHex(A_.color, '#ffffff', 0.35)
const GC = mixHex(signStar('gemini').color, '#ffffff', 0.2), TC = mixHex(signStar('taurus').color, '#ffffff', 0.35)

const T = {
  prev: 0, open: 2, title: 7, fri: 10, sat: 20, cafe: 30, msg: 40, quiet: 49, mirror: 56, low: 63,
  advise: 70, act3: 90, moonUp: 97.2, send: 101.4, lesson: 104, tag: 108, next: 111.6,
}
const CUTS = [20, { t: 40, kind: 'flip' }, 63]          // cardfx keeps the middle one: 40.0 (Act 1 → Act 2)

const CAPS = [
  { text: '“I need a | *quiet day.*”', kicker: 'SATURDAY · 11:02 AM', at: 2.15, out: [6.7, 6.95] },
  { text: 'Friday: | *perfect.*', kicker: 'FRIDAY · 9:40 PM', at: 10.3, out: [19.6, 19.9] },
  { text: 'Pisces feels it | *right now.*', at: 20.3, out: [29.6, 29.9], top: 130, size: 76 },
  { text: 'Aquarius needs | *a day.*', at: 21.6, out: [29.6, 29.9], top: 1000, size: 76, accentColor: '#9fd8ff' },
  { text: 'Expert *advice.*', at: 30.3, out: [39.5, 39.85] },
  { text: 'Message *one.*', at: 40.3, out: [44.3, 44.55] },
  { text: 'Message *two.*', at: 44.7, out: [48.6, 48.9] },
  { text: 'Aquarius goes | *quieter.*', at: 49.3, out: [55.6, 55.9], top: 1000, size: 76, accentColor: '#9fd8ff' },
  { text: 'am I too | *much?*', at: 56.3, out: [62.6, 62.9], top: 130, size: 80 },
  { text: 'am I too | *little?*', at: 57.6, out: [62.6, 62.9], top: 1000, size: 80, accentColor: '#9fd8ff' },
  { text: 'Rock *bottom.*', at: 63.3, out: [69.6, 69.95] },
  { text: '*Saying it* plainly.', kicker: 'SUNDAY · 7:15 PM', at: 90.3, out: [96.6, 96.9] },
  { text: '*Still here.*', at: 102.3, out: [103.75, 103.95], top: 150, size: 104 },
  { text: '*Already* knew.', at: 109.7, out: [111.2, 111.5], size: 88 },
]

const L_OPEN = [{ t: 3.6, speaker: PIS, color: PC, text: 'they HATE me.' }]
const L_FRI = [
  { t: 10.7, speaker: PIS, color: PC, text: 'tonight was SO nice I could *cry.*' },
  { t: 13.5, speaker: AQU, color: AC, text: 'you ARE crying. it’s *sweet.*' },
  { t: 16.2, speaker: AQU, color: AC, text: 'I’ll need a quiet day to *recharge.*' },
]
const L_CAFE = [
  { t: 30.7, speaker: GEM, color: GC, text: 'quiet means *bored.* text them again!' },
  { t: 33.7, speaker: TAU, color: TC, text: 'or… eat a bun *first?*' },
  { t: 36.3, speaker: PIS, color: PC, text: 'I’ll do *BOTH.*' },
]
const L_LOW = [{ t: 64.3, speaker: PIS, color: PC, text: 'I’m out of *tissues.*' }, { t: 66.9, speaker: PIS, color: PC, text: 'and *dignity.*' }]
const L_ACT3 = [
  { t: 90.7, speaker: PIS, color: PC, text: 'I need a check-in when you go *quiet.*' },
  { t: 93.6, speaker: AQU, color: AC, text: 'I need a day to think. it’s not *you.*' },
  { t: 97.4, speaker: AQU, color: AC, text: 'one moon = I’m *still here.*' },
]
const ALL_LINES = [...L_OPEN, ...L_FRI, ...L_CAFE, ...L_LOW, ...L_ACT3]
const BOXES = [[L_OPEN, 3.4, 6.85], [L_FRI, 10.5, 19.75], [L_CAFE, 30.5, 39.6], [L_LOW, 64.1, 69.75], [L_ACT3, 90.5, 101.2]]

const ADVISE = {
  at: T.advise, out: [89.55, 90.0],
  cards: [
    { at: 70.95, icon: 'heart', head: 'Needs aren’t *flaws.*', body: 'Space and closeness are both normal. Neither one is wrong.' },
    { at: 76.95, icon: 'chat', head: 'Ask *plainly.*', body: '“I need a check-in when you go quiet.” “I need a day to think.”' },
    { at: 82.95, icon: 'moon', head: 'Agree on a *signal.*', body: 'One small thing that means “I’m still here,” even on a quiet day.' },
  ],
  lines: [
    { t: 71.5, text: 'Pisces, Aquarius: this one’s *yours.*' },
    { t: 77.5, text: 'different speeds. same *direction.*' },
    { t: 83.5, text: 'pick one tiny thing that says *“here.”*' },
  ],
}
const LESSON = { at: T.lesson, out: [107.75, 108.0], text: 'Quiet isn’t | *goodbye.*', chip: '+1 PIXEL MOON' }
const NEXT = { at: T.next, out: [115.25, 115.6], teaser: 'Virgo wants to say it *first.*' }

const hopsOf = sp => talkHops(ALL_LINES, sp)
const PIS_HOPS = [...hopsOf(PIS), 2.3, 21.0, 21.6, 22.2, 23.4, 24.0, 41.0, 45.0, 98.6, 102.9, 103.2]
const AQU_HOPS = [...hopsOf(AQU), 49.6, 50.6, 98.2, 101.6]
const GEM_HOPS = [...hopsOf(GEM), 31.2, 31.5]
const TAU_HOPS = [...hopsOf(TAU), 34.4]

function bits(ctx, rows, pal, x, y, cell, { alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(x), Math.round(y)); ctx.scale(cell, cell)
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) } } })
  ctx.restore()
}
const cbits = (ctx, rows, pal, cx, cy, cell, o) => bits(ctx, rows, pal, cx - rows[0].length * cell / 2, cy - rows.length * cell / 2, cell, o)
const PAL = { K: INK, W: '#fff8ec', G: GOLD, L: '#c8c0d8', S: '#7fe0ff', B: '#9fd8ff', D: '#6fb6e8', N: '#8a5a3a', R: '#e8566e', Y: '#ffe9a8' }
const PHONE = ['KKKKK', 'KSSSK', 'KSSSK', 'KSSSK', 'KSSSK', 'KKWKK']
const TISSUE = ['..KKK..', '.KWWWK.', 'KWWLWWK', 'KWLWWWK', '.KWWWK.', '..KKK..']
const BOOK = ['KKKKKKKKKK', 'KRRRRKBBBK', 'KRRRRKBBBK', 'KRRRRKBBBK', 'KKKKKKKKKK']
const MOON = ['...KKKK..', '..KYYYK..', '.KYYYK...', 'KYYYK....', 'KYYYK....', 'KYYYYK...', '.KYYYYKKK', '..KYYYYYK', '...KKKKK.']
const BIGBOX = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBKKKKKKBBK', 'KBBKKKKKKBBK', 'KBBBBBBBBBBK', 'KBWBBWBBWBBK', 'KBBBBBBBBBBK', 'KDDDDDDDDDDK', 'KKKKKKKKKKKK']

function pill(ctx, text, rx, y, { col = ML_GOLD, size = 30, alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.font = `700 ${size}px ${MONO}`
  const w = ctx.measureText(text).width + 44, h = size + 24, x0 = rx - w
  ctx.fillStyle = INK; ctx.fillRect(x0 - 7, y - 7, w + 14, h + 14); ctx.fillStyle = col; ctx.fillRect(x0 - 3, y - 3, w + 6, h + 6)
  ctx.fillStyle = 'rgba(11,18,54,0.95)'; ctx.fillRect(x0, y, w, h)
  ctx.fillStyle = col; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, x0 + 22, y + h / 2 + 1)
  ctx.restore()
}
function split(ctx, top, bot) {
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1080, 956); ctx.clip(); top(ctx); ctx.restore()
  ctx.save(); ctx.beginPath(); ctx.rect(0, 964, 1080, 956); ctx.clip(); ctx.translate(0, 964); bot(ctx); ctx.restore()
  ctx.fillStyle = INK; ctx.fillRect(0, 948, 1080, 24); ctx.fillStyle = ML_GOLD; ctx.fillRect(0, 956, 1080, 8)
}
// Pisces' apartment cropped into the top half (apartment y 560…1516 → 0…956)
function aptTop(ctx, t, o, fg) { ctx.save(); ctx.translate(0, -560); drawApartment(ctx, t, o); if (fg) fg(ctx); ctx.restore() }
// the tissue pile (n tissues heaped at x, floor y)
function tissuePile(ctx, x, y, n, cell = 8) {
  for (let i = 0; i < n; i++) { const row = Math.floor(Math.sqrt(i * 1.6)), k = i - Math.round(row * row / 1.6); cbits(ctx, TISSUE, PAL, x + (k - row / 2) * 38 + (i % 3) * 6, y - row * 26, cell) }
}

// Aquarius' study (local 1080 × 960): calm teal, shelves, a desk lamp, a little telescope at the window
function drawStudy(ctx, t, { dusk = 0 } = {}) {
  const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
  R(0, 0, 1080, 640, '#2f5a66'); for (let y = 30; y < 640; y += 60) for (let x = ((y / 60) % 2) * 45; x < 1080; x += 90) R(x, y, 6, 6, '#3a6a76')
  const W0 = { x: 600, y: 70, w: 400, h: 360 }
  R(W0.x - 16, W0.y - 16, W0.w + 32, W0.h + 32, '#1e3a44')
  const g = ctx.createLinearGradient(0, W0.y, 0, W0.y + W0.h); g.addColorStop(0, mixHex('#8fd0f0', '#3a2a6a', dusk)); g.addColorStop(1, mixHex('#e0f4ff', '#ff9a7a', dusk))
  ctx.fillStyle = g; ctx.fillRect(W0.x, W0.y, W0.w, W0.h)
  R(W0.x, W0.y + 290, W0.w, 70, '#7a8aa8'); R(W0.x + 40, W0.y + 250, 90, 110, '#6a7a98'); R(W0.x + 230, W0.y + 270, 120, 90, '#6a7a98')
  R(W0.x + W0.w / 2 - 6, W0.y, 12, W0.h, '#1e3a44'); R(W0.x - 26, W0.y + W0.h + 10, W0.w + 52, 16, '#1e3a44')
  // telescope on the sill
  R(W0.x + 40, W0.y + 330, 8, 60, INK); R(W0.x + 70, W0.y + 330, 8, 60, INK); ctx.save(); ctx.translate(W0.x + 60, W0.y + 320); ctx.rotate(-0.5); R(-10, -16, 120, 30, '#e8e0d0'); R(-14, -20, 20, 38, INK); ctx.restore()
  // shelves with books + a plant
  for (const sy of [150, 300]) { R(60, sy, 420, 14, '#6a4a3a'); for (let i = 0; i < 9; i++) R(76 + i * 40, sy - 70 + (i % 3) * 10, 30, 70 - (i % 3) * 10, ['#e8566e', '#ffd27a', '#7fe0ff', '#c9a6ff', '#7dffb0'][i % 5]) }
  R(400, 220, 50, 80, '#c0703a'); R(390, 180, 70, 44, '#3f8a5a')
  // floor + rug
  R(0, 640, 1080, 320, '#3a3050'); for (let y = 660; y < 960; y += 40) R(0, y, 1080, 4, '#302844')
  R(140, 780, 800, 120, '#2f8a8a'); R(156, 792, 768, 96, '#3fa4a2')
  // armchair (right) + side table with tea
  R(620, 560, 300, 160, '#5a3a6a'); R(600, 620, 340, 120, '#6a4a7a'); R(590, 600, 50, 160, '#4a2a5a'); R(900, 600, 50, 160, '#4a2a5a')
  R(470, 640, 100, 12, INK); R(514, 652, 12, 80, INK)
  drawIcon(ctx, 'cup', 482, 588, 5)
}
function botStudy(ctx, t, o) { drawStudy(ctx, t, o) }

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, c))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, open, close, y: 1600, height: 250, size: 48, cps: 28 }))
  const prev = buildPreviously(root, { at: 0, len: 2, stills: [
    { caption: 'Sag left for a year.', crop: [200, 760, 640, 755], scene: c => drawLane(c, 3, { moon: { x: 860, y: 610, r: 100 }, time: 'dusk', pan: 520, lights: 0 }, w => {
      drawSign(w, 'cancer', 1160, standY(230), 230, 3, { mood: 'happy', look: [1, 0] })
      drawSign(w, 'sagittarius', 1460, standY(230), 230, 3, { mood: 'happy', look: [-1, 0] })
    }) },
    { caption: '“I miss you. And I’m scared.”', crop: [140, 900, 800, 944], scene: c => { drawApartment(c, 3, {}); drawSign(c, 'cancer', 400, standY(260, 1400), 260, 3, { mood: 'happy', look: [1, -0.3] }); cbits(c, PHONE, PAL, 560, 1220, 12) } },
    { caption: 'Libra & Scorpio, 5 AM.', crop: [180, 760, 640, 755], scene: c => drawLane(c, 3, { moon: { x: 860, y: 610, r: 100 }, time: 'dusk', pan: 720, lights: 0 }, w => {
      drawSign(w, 'libra', LANE.bench.seats[0] - 20, standY(170, LANE.bench.seatY), 170, 3, { mood: 'sparkle', look: [0.6, -1] })
      drawSign(w, 'scorpio', LANE.bench.seats[1] + 20, standY(170, LANE.bench.seatY), 170, 3, { mood: 'happy', look: [0.6, -1] })
    }) },
  ] })
  const title = buildTitle(root, { ep: 8, title: 'Different Speeds', at: T.title, len: 3 })
  const adv = buildAdvise(root, ADVISE)
  const next = buildNextTime(root, NEXT)
  const lesson = buildLesson(root, LESSON)
  const bug = showBug(root, 8, { at: 2.1 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function coldOpen(t) {
    drawApartment(x, t, { time: 'night' })
    const pk = t > 3.4
    drawPisces(x, APT.couch.seats[0] + 40, standY(250, APT.couch.seatY), 250, t, { tears: pk ? 3 : 1, mood: pk ? 'wide' : 'sparkle', look: [1, -0.8], hops: PIS_HOPS, pull: bump(t, 4.6, 0.5) + bump(t, 5.6, 0.5) })
    drawPhone(x, 760, 860, 400, 560, t, { title: `${A_.glyph}︎ Aquarius`, alpha: pop01(t, 2.1, 0.3, 1.8), msgs: [
      { at: 2.0, side: 'L', text: 'had fun!' }, { at: 2.6, side: 'L', text: 'I need a quiet day tomorrow.' },
    ] })
  }
  function friday(t) {
    drawLane(x, t, { moon: { x: 860, y: 610, r: 100 }, pan: 650 }, c => {
      const quiet = t > 16.2
      drawPisces(c, LANE.bench.seats[0] - 90, standY(200, LANE.bench.seatY), 200, t, { tears: 2, mood: quiet && t > 17.6 ? 'wide' : 'heart', look: [1, 0], hops: PIS_HOPS })
      drawSign(c, 'aquarius', LANE.bench.seats[1] + 90, standY(200, LANE.bench.seatY), 200, t, { mood: quiet ? 'happy' : 'sparkle', look: [-1, 0], hops: AQU_HOPS, seed: 4 })
    })
    // the word that echoes in Pisces' head
    if (t > 17.6) for (let i = 0; i < 3; i++) { const t0 = 17.6 + i * 0.45; drawBubble(x, 330 + i * 70, 780 - i * 90, 'quiet…', { size: 30 - i * 3, k: pop01(t, t0, 0.25, 2), alpha: 1 - i * 0.25 }) }
  }
  function saturday(t) {
    split(x, c => aptTop(c, t, { lamp: 1 }, w => {
      // Pisces: everything, immediately (hearts pop out)
      drawPisces(w, 540, standY(240, APT.couch.seatY), 240, t, { tears: 2, mood: 'heart', look: [0, -0.5], hops: PIS_HOPS })
      for (let i = 0; i < 6; i++) { const t0 = 20.8 + i * 1.3, p = prog(t, t0, t0 + 1.6); if (p > 0 && p < 1) drawIcon(w, 'heart', 540 + Math.sin(i * 2.3) * 220 - 20, 1250 - p * 260, 6 * (1 - p * 0.4)) }
    }), c => {
      drawStudy(c, t)
      // Aquarius: one book, one tea, one quiet day
      drawSign(c, 'aquarius', 770, standY(210, 640), 210, t, { mood: 'sleepy', zzz: false, look: [0, 1], hops: AQU_HOPS, seed: 4 })
      cbits(c, BOOK, PAL, 770, 600, 9)
    })
  }
  function cafe(t) {
    drawCafe(x, t, { behind: c => drawSign(c, 'taurus', CAFE.counter.x - 10, standY(200, CAFE.counter.y), 200, t, { mood: t > 33.7 ? 'happy' : 'neutral', look: [-1, 0.5], hops: TAU_HOPS, seed: 8 }) })
    drawSign(x, 'gemini', CAFE.seats[1].x, standY(220, CAFE.seats[1].y), 220, t, { mood: t < 33.6 ? 'wink' : 'eyeroll', look: [-1, 0], hops: GEM_HOPS, seed: 6 })
    drawPisces(x, CAFE.seats[0].x, standY(220, CAFE.seats[0].y), 220, t, { tears: 2, mood: t > 36.2 ? 'happy' : 'wide', look: [1, 0], hops: PIS_HOPS, box: false })
    drawCafeTable(x, t, { cups: 1, pastry: 'bun' })
    if (t > 36.5) { cbits(x, PHONE, PAL, CAFE.seats[0].x + 120, CAFE.seats[0].y - 160, 9) }
  }
  // the long message, then another; tissues pile up
  function message(t) {
    drawApartment(x, t, { lamp: 1 })
    const n = Math.floor(clamp((t - 40.5) / 8.3) * 11)
    tissuePile(x, 260, 1470, n)
    drawPisces(x, APT.couch.seats[0] + 20, standY(230, APT.couch.seatY), 230, t, { tears: 3, mood: 'wide', look: [1, -0.6], hops: PIS_HOPS, pull: [41.3, 42.6, 43.9, 45.2, 46.5, 47.8].reduce((a, c) => a + bump(t, c, 0.45), 0) })
    drawPhone(x, 770, 830, 460, 700, t, { title: `${A_.glyph}︎ Aquarius`, alpha: pop01(t, 40.1, 0.3, 1.8), msgs: [
      { at: 39.0, side: 'L', text: 'I need a quiet day tomorrow.' },
      { at: 41.0, side: 'R', text: 'hiii!! no pressure!! last night was SO lovely and I keep thinking about the moon and the bench and you, and also is everything ok?? no pressure!!' },
      { at: 45.0, side: 'R', text: 'sorry for the long text!! ignore it!! (don’t ignore it)' },
    ] })
  }
  function quiet(t) {
    const typing = [50.4, 52.6]
    split(x, c => aptTop(c, t, { lamp: 1 }, w => {
      tissuePile(w, 260, 1470, 11)
      drawPisces(w, APT.couch.seats[0] + 20, standY(220, APT.couch.seatY), 220, t, { tears: t > 52.6 ? 3 : 2, mood: t > 50.4 && t < 52.6 ? 'sparkle' : 'wide', look: [1, -0.4], seed: 12 })
      // Pisces' view: the dots… then nothing
      const on = t > typing[0] && t < typing[1]
      if (on) { const bx = 700, by = 1060; w.fillStyle = INK; w.fillRect(bx - 6, by - 6, 152, 72); w.fillStyle = '#e9e2f5'; w.fillRect(bx, by, 140, 60); for (let i = 0; i < 3; i++) { w.fillStyle = Math.floor(t * 6) % 3 === i ? INK : '#9a90b0'; w.fillRect(bx + 26 + i * 34, by + 24, 16, 16) } }
      if (t > 52.8) drawBubble(w, 760, 1080, '…oh.', { size: 32, k: pop01(t, 52.8, 0.25, 2) })
    }), c => {
      drawStudy(c, t)
      const buzz = [49.6, 50.0].some(b => t > b && t < b + 0.3)
      drawSign(c, 'aquarius', 770, standY(210, 640), 210, t, { mood: t < 49.6 ? 'sleepy' : t < 53 ? 'wide' : 'neutral', zzz: false, look: [-0.6, 0.6], hops: AQU_HOPS, seed: 4, squash: t > 53 ? 0.06 : 0 })
      cbits(c, PHONE, PAL, 560 + (buzz ? Math.sin(t * 90) * 5 : 0), 610, 9)
      if (t > 50.4 && t < 52.6) drawBubble(c, 520, 470, 'typing… deleting…', { size: 28, k: pop01(t, 50.4, 0.25, 2) })
      if (t > 53.0) { c.fillStyle = 'rgba(80,60,110,0.85)'; const k = ease.outCubic(prog(t, 53, 53.6)); c.fillRect(650, 690 - 170 * k, 240, 170 * k) }   // the hoodie/blanket goes up
    })
    pill(x, 'AQUARIUS · SAT 4:20 PM', 1040, 1820)
  }
  function mirror(t) {
    split(x, c => aptTop(c, t, { lamp: 0.6 }, w => {
      tissuePile(w, 260, 1470, 13)
      drawPisces(w, 560, standY(230, APT.couch.seatY), 230, t, { tears: 3, mood: 'wide', look: [0, 1], seed: 12, rot: -0.1 })
    }), c => {
      drawStudy(c, t, { dusk: 0.6 })
      drawSign(c, 'aquarius', 560, standY(220, 700), 220, t, { mood: 'neutral', look: [0, 1], seed: 4, rot: 0.1, blush: false })
    })
  }
  function lowPoint(t) {
    drawApartment(x, t, { lamp: 0.55, time: 'late' })
    tissuePile(x, 230, 1480, 22, 7)
    tissuePile(x, 860, 1480, 9, 7)
    const peer = t > 65.4
    const P = { x: 540, y: standY(260, 1440) }
    drawPisces(x, P.x, P.y, 260, t, { tears: 3, mood: peer ? 'wide' : 'neutral', look: peer ? [0, 1] : [0, 0], seed: 12, box: false, rot: peer ? 0.12 : 0 })
    // the empty box, held up and shaken: one sad puff
    const shake = t > 64.0 && t < 65.2 ? Math.sin(t * 50) * 10 : 0
    cbits(x, BIGBOX, PAL, P.x + 210 + shake, P.y - 30, 12)
    if (t > 64.6 && t < 66) { const p = prog(t, 64.6, 66); x.save(); x.globalAlpha = 1 - p; x.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) x.fillRect(P.x + 200 + Math.sin(i * 2) * 40 * p, P.y - 110 - p * 120 - i * 14, 14, 14); x.restore() }
  }
  function act3(t) {
    const zoom = 1 + 0.25 * ease.inOutCubic(prog(t, 96.9, 98.0))
    drawLane(x, t, { moon: { x: 860, y: 610, r: 100 }, time: 'dusk', pan: 650, lampsAt: 90.8, zoom, focus: [540, 1200] }, c => {
      drawPisces(c, LANE.bench.seats[0] - 90, standY(200, LANE.bench.seatY), 200, t, { tears: t > 98.4 ? 3 : 1, mood: t > 98.4 ? 'happy' : t > 93.6 ? 'sparkle' : 'neutral', look: [1, 0], hops: PIS_HOPS, pull: bump(t, 99.3, 0.5) })
      drawSign(c, 'aquarius', LANE.bench.seats[1] + 90, standY(200, LANE.bench.seatY), 200, t, { mood: t > 93.6 ? 'happy' : 'neutral', look: [-1, 0], hops: AQU_HOPS, seed: 4 })
      const mk = easeOutBack(prog(t, T.moonUp, T.moonUp + 0.45), 1.8)
      if (mk > 0.01) { cbits(c, MOON, PAL, LANE.bench.seats[1] + 90, 1020 - mk * 40, 14 * mk); sparkles(c, t, LANE.bench.seats[1] + 90, 1000, T.moonUp + 0.1, 10, 140, 3, [ML_GOLD, BONE]) }
    })
  }
  function send(t) {
    const fly = prog(t, 101.9, 102.6)
    split(x, c => aptTop(c, t, { lamp: 1 }, w => {
      drawPisces(w, 540, standY(240, APT.couch.seatY), 240, t, { tears: 3, mood: t > 102.6 ? 'happy' : 'neutral', look: t > 102.6 ? [0, -0.6] : [1, 0.4], hops: PIS_HOPS, pull: bump(t, 103.1, 0.5) })
      cbits(w, PHONE, PAL, 720, 1260, 9)
      if (t > 102.6) { cbits(w, MOON, PAL, 720, 1150, 8 * easeOutBack(prog(t, 102.6, 102.9), 2)); sparkles(w, t, 720, 1150, 102.6, 10, 140, 5, [ML_GOLD, BONE]) }
    }), c => {
      drawStudy(c, t)
      drawSign(c, 'aquarius', 770, standY(210, 640), 210, t, { mood: 'happy', zzz: false, look: [-0.6, 0.6], hops: AQU_HOPS, seed: 4 })
      cbits(c, BOOK, PAL, 820, 600, 8); cbits(c, PHONE, PAL, 600, 600, 9)
    })
    if (fly > 0 && fly < 1) { const fx = lerp(600, 720, fly), fy = lerp(1560, 700, ease.inOutQuad(fly)); cbits(x, MOON, PAL, fx, fy, 9); for (let i = 1; i < 5; i++) cbits(x, ['Y'], PAL, fx - i * 4, fy + i * 40, 8, { alpha: 1 - i * 0.2 }) }
    pill(x, 'AQUARIUS · QUIET DAY', 1040, 1820)
  }
  function tagScene(t) {
    drawCafe(x, t, { behind: c => {
      drawSign(c, 'scorpio', CAFE.counter.x - 10, standY(200, CAFE.counter.y), 200, t, { mood: t > 109.6 ? 'squint' : 'neutral', look: [-1, 0.4], seed: 9, blush: t > 109.6, hops: [108.25] })
    } })
    drawSign(x, 'libra', 330, standY(240, 1420), 240, t, { mood: t > 109.6 ? 'heart' : 'happy', look: [1, -0.4], seed: 7, hops: [109.7] })
    // the cake on the counter, already piped with the name
    const ck = easeOutBack(prog(t, 109.0, 109.4), 1.8)
    if (ck > 0.01) {
      x.save(); x.translate(560, 980); x.scale(ck, ck)
      x.fillStyle = INK; x.fillRect(-150, -84, 300, 120); x.fillStyle = '#fff4e0'; x.fillRect(-142, -76, 284, 104); x.fillStyle = '#ff8fb1'; x.fillRect(-142, -76, 284, 22); x.fillRect(-142, 8, 284, 20)
      x.fillStyle = '#c2306a'; x.font = `italic 600 50px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Libra', 0, -20)
      x.restore()
    }
    drawBubble(x, 760, 620, 'name for the cake?', { size: 32, k: pop01(t, 108.2, 0.25, 2) * outK(t, [109.4, 109.6]) })
    // Pisces, upstairs regular, at the back table: crying at the cake
    drawPisces(x, 150, standY(130, 1180), 130, t, { tears: t > 109.6 ? 3 : 1, look: [1, 0] })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.open) drawSky(x, t, SKY_H)
      else if (t < T.fri) coldOpen(t)
      else if (t < T.sat) friday(t)
      else if (t < T.cafe) saturday(t)
      else if (t < T.msg) cafe(t)
      else if (t < T.quiet) message(t)
      else if (t < T.mirror) quiet(t)
      else if (t < T.low) mirror(t)
      else if (t < T.advise + 0.7) lowPoint(t)
      else if (t < T.act3 - 0.05) drawSky(x, t, SKY_H)
      else if (t < T.send) act3(t)
      else if (t < T.tag) send(t)
      else if (t < T.next) tagScene(t)
      else drawSky(x, t, SKY_H)
      caps.forEach(c => c.update(t)); boxes.forEach(b => b.update(t))
      prev.update(t); title.update(t); adv.update(t); next.update(t); lesson.update(t)
      bug.update(t, prev.on(t) || title.on(t) ? 0 : 1)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

const N = [622.25, 698.46, 783.99, 932.33, 1046.5, 1244.51, 1396.91]
export const CUES = [
  ...previouslyCues(0, 3, 2),
  ...CAPS.flatMap(c => captionCues(c)),
  ...titleCues(T.title, 3),
  ['pop', 2.0, N[2], 0.035, 0.3], ['pop', 2.6, N[3], 0.035, 0.3], ['pluck', 3.4, N[0], 0.04, 0.6, -0.2],
  ...[17.6, 18.05, 18.5].map((t0, i) => ['pop', t0, N[4 - i], 0.03 - i * 0.006, -0.2]),
  ...Array.from({ length: 6 }, (_, i) => ['pop', r3(20.8 + i * 1.3), N[(i * 2) % 7], 0.02, 0.2]),
  ['pop', 36.5, N[5], 0.035, -0.2],
  ['pop', 41.0, N[3], 0.04, 0.3], ['whoosh', 41.0, 0.4, 0.03], ['pop', 45.0, N[4], 0.04, 0.3],
  ...[41.3, 42.6, 43.9, 45.2, 46.5, 47.8].map(t0 => ['tick', t0, 0.03]),
  ['pluck', 49.6, N[5], 0.03, 0.2, 0.3], ['pluck', 50.0, N[5], 0.03, 0.2, 0.3], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(50.5 + i * 0.35), 0.015]), ['pluck', 52.7, N[0] / 2, 0.035, 0.8, 0],
  ['tick', 64.0, 0.04], ['tick', 64.2, 0.04], ['tick', 64.4, 0.04], ['whoosh', 64.6, 0.3, 0.02],
  ...adviseCues(ADVISE),
  ['whoosh', T.moonUp, 0.4, 0.035], ['bell', T.moonUp + 0.2, N[5], 0.03, 1.2, 0], ['glitter', T.moonUp + 0.1, T.moonUp + 0.8],
  ['whoosh', 101.9, 0.45, 0.04], ['pop', 102.6, N[5], 0.05, 0], ['bell', 102.65, N[6], 0.03, 1.2, 0], ['glitter', 102.6, 103.2],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['pop', 108.2, N[2], 0.035, 0.2], ['pop', 109.0, N[4], 0.04, 0], ['pluck', 109.6, N[5], 0.04, 0.6, 0],
  ...nextTimeCues(NEXT.at),
  ...talkCues(ALL_LINES, { cps: 28 }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
