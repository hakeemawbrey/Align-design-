// nml2e05 — MOONLIGHT LANE, Ep 5: "Snowed In" (Season 2: Winter on the Lane; 120 s vertical, star_advice; chiptune · C).
// Rows: promo/films/next30/b19.md. Show kit: ../../mlpilot/scenes/mlkit.js. Winter add-ons: ../../nml2e01/scenes/winter.js.
//   0.0–5.0    COLD OPEN  "Snowed in. | *Everyone.*" (FRIDAY · 9:30 PM). ♉ Taurus mid-throw of a blanket across the café,
//              snow banked up the window. "nobody’s walking home in this. blankets are *free.*"
//   5.0–7.0    ◀◀ PREVIOUSLY ON (perfectly balanced · all the way here · one shooting star)
//   7.0–10.0   TITLE CARD  Ep 5 · Snowed In.
//  10.0–20.0   ACT 1  "The lane | *sleepover.*" soup, a board game, the whole lane in blankets; ♋ Cancer and ♐ Sagittarius
//              get the last one. "last blanket. you two can *share.*"
//  20.0–30.0   "Everyone | *answers.*" ♊ Gemini deals a talk card: "What’s your favourite thing about this winter?"
//              Leo "me." Taurus "soup." Pisces "all of you" (sobbing). "Sagittarius, *you’re up.*"
//  30.0–40.0   "The | *deflection.*" "fun fact: snow crystals have *six* sides!" Hands touch under the blanket:
//              "knock knock." "…who’s there?" "snow."
//  40.0        card cut.
//  40.0–52.0   ACT 2  "snow who?" "*snow-body’s* going home!" · "you always do a fact when it gets *real.*" Cancer moves
//              to the armchair.
//  52.0–62.0   "One blanket. | *One star.*" Sag alone with the talk card; the café dozes off.
//  62.0–70.0   "2:14 AM. | Still *snowing.*" ♓ Pisces cries under a blanket.
//  70.0–90.0   ★ THE STARS ADVISE: A joke can close a door · Stay in the quiet · Answer the real question.
//  90.0–104.0  ACT 3  Sag crosses the room with the card: "my favourite thing this winter? walking home with *you.*"
//              "…mine *too.*" One blanket again. "Everyone’s | *asleep.*" → "*Nobody’s* | asleep." (every eye open)
// 104.0–108.0  ★ LESSON UNLOCKED "Skip the fun fact. | *Say the real one.*" +1 SHARED BLANKET
// 108.0–111.6  LANE TAG  ♎ Libra and ♏ Scorpio asleep in a booth; Scorpio still holding a whisk.
// 111.6–115.6  NEXT TIME ON Moonlight Lane… "Secret gift swap. Cancer drew *Sagittarius.*" · last line "*Stay* in the quiet."
// Fact check: snow crystals form with six-fold (hexagonal) symmetry — true. The only fact in the episode.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, MONO, r3, pop01, outK, bump, loadFonts,
  drawLane, LANE, standY, drawPisces, drawCafe, CAFE, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues, buildNextTime, nextTimeCues, popCues,
  drawBubble, sparkles,
} from '../../mlpilot/scenes/mlkit.js'
import { snowfall, laneSnow, windowSnow, worn, actor, key, drawTalkCard, drawBlanket, drawMug, drawSnowbank } from '../../nml2e01/scenes/winter.js'

export const DURATION = 118
const STORY_END = DURATION - ENDCARD_SHORT_LEN
const lab = (s, n) => `${signStar(s).glyph}︎ ${n}`
const CS = lab('cancer', 'CANCER'), GS = lab('sagittarius', 'SAGITTARIUS'), TS = lab('taurus', 'TAURUS'), GE = lab('gemini', 'GEMINI')
const CAN_C = '#8fd8ff', SAG_C = '#d2b0ff', TAU_C = '#ffd98a', GEM_C = '#ffe27a'
const CAN_W = { hat: '#ff8fb1', scarf: '#ff8fb1', lumpy: true }, SAG_W = { scarf: '#ffd36e' }

const T = {
  prev: [5.0, 7.0], title: 7.0,
  enter: [11.6, 12.6], blanketIn: [15.8, 16.6], card: [20.3, 21.0], ans: [22.0, 23.2, 24.4], up: 26.4, look: 27.6, cardOut: [32.8, 33.2],
  touch: 34.8, laugh: 42.6, move: [48.4, 49.6], doze: 54.0, lowpt: 62.0,
  advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, cross: [90.4, 91.6], back: [97.0, 98.0], eyes: 100.4,
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0,
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Skip the fun fact. | *Say the real one.*', chip: '+1 SHARED BLANKET' }

const CPS = 28
const L0 = [{ t: 0.5, speaker: TS, color: TAU_C, text: 'nobody’s walking home in this. blankets are *free.*' }]
const L1 = [{ t: 16.8, speaker: TS, color: TAU_C, text: 'last blanket. you two can *share.*' }]
const L2 = [
  { t: 20.6, speaker: GE, color: GEM_C, text: 'talk card! everyone *answers.*' },
  { t: 26.2, speaker: GE, color: GEM_C, text: 'Sagittarius, *you’re up.*' },
]
const L3 = [
  { t: 30.6, speaker: GS, color: SAG_C, text: 'fun fact: snow crystals have *six* sides!' },
  { t: 35.6, speaker: GS, color: SAG_C, text: 'knock knock.' },
  { t: 37.0, speaker: CS, color: CAN_C, text: '…who’s there?' },
  { t: 38.4, speaker: GS, color: SAG_C, text: 'snow.' },
]
const L4 = [
  { t: 40.5, speaker: CS, color: CAN_C, text: 'snow who?' },
  { t: 41.6, speaker: GS, color: SAG_C, text: '*snow-body’s* going home!' },
  { t: 45.2, speaker: CS, color: CAN_C, text: 'you always do a fact when it gets *real.*' },
]
const L5 = [{ t: 55.0, speaker: GS, color: SAG_C, text: '(why can’t I just *answer?*)' }]
const L6 = [
  { t: 92.0, speaker: GS, color: SAG_C, text: 'my favourite thing this winter? walking home with *you.*' },
  { t: 95.9, speaker: CS, color: CAN_C, text: '…mine *too.*' },
]
const BOXES = [[L0, 0.3, 4.9], [L1, 16.6, 19.8], [L2, 20.4, 29.8], [L3, 30.4, 39.85], [L4, 40.3, 49.8], [L5, 54.8, 61.5], [L6, 91.8, 97.9]]
const ALL_LINES = BOXES.flatMap(b => b[0])

const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'chat', head: 'A joke can *close a door.*', body: 'Deflecting keeps you safe, and keeps them out.' },
    { at: T.cards[1], icon: 'moon', head: 'Stay in the *quiet.*', body: 'You don’t have to fill a soft moment. Let it sit.' },
    { at: T.cards[2], icon: 'question', head: 'Answer the *real* question.', body: '“My favourite thing this winter? Walking home with you.”' },
  ],
  lines: [
    { t: 71.05, text: 'Sagittarius, this one’s *yours.*' },
    { t: 73.95, text: 'funny is great. *funny-instead* isn’t.' },
    { t: 77.5, text: 'a soft moment isn’t a *problem* to fix.' },
    { t: 80.4, text: 'breathe. let the quiet be *warm.*' },
    { t: 83.5, text: 'they asked a real question. *answer it.*' },
    { t: 86.5, text: 'go on. cross the *room.*' },
  ],
}

const CAPS = [
  { text: 'Snowed in. | *Everyone.*', kicker: 'FRIDAY · 9:30 PM', at: -1.2, out: [4.75, 4.95], late: 1, lateAt: -0.8 },
  { text: 'The lane | *sleepover.*', at: 10.2, out: [16.3, 16.5], late: 1, lateAt: 10.8 },
  { text: 'One blanket. | *Two friends.*', at: 16.6, out: [19.6, 19.85], late: 2, lateAt: 17.1 },
  { text: 'Everyone | *answers.*', at: 20.15, out: [29.6, 29.85], late: 1, lateAt: 20.7 },
  { text: 'The | *deflection.*', at: 30.2, out: [39.6, 39.85], late: 1, lateAt: 30.7, size: 104 },
  { text: 'Another | *joke.*', at: 40.25, out: [44.9, 45.1], late: 1, lateAt: 40.8, size: 104 },
  { text: 'When it gets | *real…*', at: 45.2, out: [51.7, 51.9], late: 1, lateAt: 45.8 },
  { text: 'One blanket. | *One star.*', at: 52.15, out: [61.6, 61.85], late: 2, lateAt: 52.7 },
  { text: '2:14 AM. | Still *snowing.*', at: 62.15, out: [69.35, 69.6], late: 1, lateAt: 62.8 },
  { text: 'Cross | the *room.*', at: 90.25, out: [96.9, 97.1], late: 1, lateAt: 90.8, size: 104 },
  { text: 'Everyone’s | *asleep.*', at: 97.3, out: [100.15, 100.35], late: 1, lateAt: 97.8, size: 104 },
  { text: '*Nobody’s* | asleep.', at: 100.45, out: [103.65, 103.85], late: 0, size: 104 },
  { text: 'Meanwhile, | in the *booth.*', kicker: '3:30 AM', at: 108.15, out: [111.3, 111.5], late: 2, lateAt: 108.7 },
  { text: '*Stay* in | the quiet.', at: 112.5, out: [115.05, 115.4], size: 104, late: 0, top: 300 },
]
const CAN_HOPS = talkHops(ALL_LINES, CS, { cps: CPS }), SAG_HOPS = talkHops(ALL_LINES, GS, { cps: CPS })
const SEAT = { can: 440, sag: 640, y: 1420 }, CHAIR = 880
// every café shot is framed 1.4× about world (560, 1250) → screen (540, 1100)
const CZ = 1.4, CSX = wx => (wx - 560) * CZ + 540, CSY = wy => (wy - 1250) * CZ + 1100

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '700 30px Inter', "italic 600 40px 'EB Garamond'"])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'Secret gift swap. Cancer drew *Sagittarius.*' })
  const title = buildTitle(root, { ep: 5, title: 'Snowed In', at: T.title, len: 3 })
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0], stills: [
    { caption: 'Perfectly balanced.', crop: [100, 700, 880, 1000], scene: c => { drawApartment(c, 24, {}); worn(c, 'libra', 540, standY(220, 1460), 220, 24, { mood: 'sparkle', look: [1, -1] }, { hat: '#7dffb0' }) } },
    { caption: '“All of me, this time.”', crop: [100, 700, 880, 1000], scene: c => { c.save(); c.setTransform(1.5, 0, 0, 1.5, 540 - 900, 1150 - 1350); drawCafe(c, 100, { view: 'late', behind: w => { worn(w, 'scorpio', 640, standY(210, 950), 210, 100, { mood: 'heart' }, {}); worn(w, 'libra', 480, standY(210, 950), 210, 100, { mood: 'heart' }, { hat: '#7dffb0' }) } }); c.restore() } },
    { caption: 'Two wishes.', crop: [100, 760, 880, 1000], scene: c => drawLane(c, 110.2, { time: 'late', pan: 860, zoom: 1.6, focus: [540, 430] }, w => { laneSnow(w, 110, { depth: 0.85 }); worn(w, 'cancer', 1360, standY(140, 900), 140, 110.2, { mood: 'heart', look: [1, 0] }, CAN_W); worn(w, 'sagittarius', 1500, standY(140, 900), 140, 110.2, { mood: 'heart', look: [-1, 0] }, SAG_W) }) },
  ] })
  const bug = showBug(root, 5, { at: -1 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function armchair(X) {
    x.fillStyle = INK; x.fillRect(X - 130, 1250, 260, 230); x.fillStyle = '#7a4aa0'; x.fillRect(X - 122, 1258, 244, 214)
    x.fillStyle = '#8f5cb8'; x.fillRect(X - 96, 1278, 192, 120); x.fillStyle = '#6a3a90'; x.fillRect(X - 130, 1330, 44, 150); x.fillRect(X + 86, 1330, 44, 150)
  }
  // the café, snowed in: snow banked up the window, the lane in blankets
  function cafe(t, { lights = 1, sleepy = 0, eyes = 0, cancerAt = null, cancerSeat = null, blanketOn = 1, sagAt = null, sagMoods, canMoods, extra = null, wextra = null } = {}) {
    const dz = sleepy > 0.5 && eyes < 0.5
    x.save(); x.transform(CZ, 0, 0, CZ, 540 - 560 * CZ, 1100 - 1250 * CZ)
    drawCafe(x, t, { lights, view: 'late', behind: c => drawSign2(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: dz ? 'sleepy' : eyes > 0.5 ? 'sparkle' : 'happy', look: [-1, 1], seed: 9, hops: talkHops(ALL_LINES, TS, { cps: CPS }) }) })
    const W0 = CAFE.window
    windowSnow(x, t, [W0.x, W0.y, W0.w, W0.h], { depth: 1, seed: 31, n: 70 })
    x.save(); x.beginPath(); x.rect(W0.x, W0.y, W0.w, W0.h); x.clip(); drawSnowbank(x, W0.x - 20, W0.y + W0.h + 10, W0.w + 40, 230, 5); x.restore()
    // the back row: the neighbours on the floor in blankets (Leo, Gemini; Libra and Scorpio by the counter)
    const BACK = [['leo', 330, 7, '#ffbe73'], ['gemini', 460, 8, '#ffe27a'], ['libra', 700, 10, '#c9a6ff'], ['scorpio', 830, 11, '#7fe0ff']]
    for (const [s, X, seed, col] of BACK) {
      const mood = dz ? 'sleepy' : eyes > 0.5 ? 'sparkle' : 'happy'
      worn(x, s, X, standY(150, 1270), 150, t, { mood, seed, look: eyes > 0.5 ? [X < 540 ? 1 : -1, 1] : undefined, hops: s === 'gemini' ? talkHops(ALL_LINES, GE, { cps: CPS }) : [], zzz: dz }, s === 'libra' ? { hat: '#7dffb0' } : {})
      drawBlanket(x, X - 80, 1222, 160, 60, t, { col })
    }
    // Pisces at the back table, sobbing (always)
    drawPisces(x, 215, standY(120, 1270), 120, t, { tears: 3, look: [1, 0], pull: bump(t, T.ans[2], 0.5) + bump(t, 66.0, 0.6) + bump(t, 96.2, 0.6) })
    armchair(CHAIR)
    // the front: Cancer and Sagittarius
    if (sagAt !== null) actor(x, t, { sign: 'sagittarius', size: 220, x: sagAt, y: SEAT.y, seed: 4, moods: sagMoods, wear: SAG_W, hops: [...SAG_HOPS] })
    if (cancerAt !== null) actor(x, t, { sign: 'cancer', size: 220, x: cancerAt, y: cancerSeat ?? SEAT.y, seed: 2, moods: canMoods, wear: CAN_W, hops: [...CAN_HOPS] })
    if (blanketOn > 0.01) drawBlanket(x, 270, 1385 + (1 - blanketOn) * -400, 540, 90, t, { col: '#3fa48a' })
    // soup + the board game on a low tray
    if (wextra) wextra()
    x.restore()
    if (extra) extra()
  }
  // drawSign through worn (no wear), keeps zzz
  function drawSign2(c, s, X, Y, size, t, o) { return worn(c, s, X, Y, size, t, o, {}) }

  function coldOpen(t) {
    cafe(t, { cancerAt: null, sagAt: null, blanketOn: 0, wextra: () => {
      actor(x, t, { sign: 'taurus', size: 240, x: 560, y: 1440, seed: 9, walk: false, hops: [-0.6, 1.2, 3.0, ...talkHops(ALL_LINES, TS, { cps: CPS })], rot: Math.sin(t * 2.6) * 0.08,
        moods: [[-1, 'happy', [-1, -1]], [1.2, 'wink', [1, -1]], [3.0, 'happy', [-1, -1]]] })
      // two more blankets in the air
      for (const [t0, x1, col] of [[-1.6, 860, '#ffd36e'], [0.6, 300, '#7fe0ff']]) {
        const q = clamp(prog(t, t0, t0 + 2.6))
        if (q > 0 && q < 1) { x.save(); x.translate(lerp(560, x1, q), lerp(1200, 1250, q) - Math.sin(Math.PI * q) * 320); x.rotate(Math.sin(t * 4 + t0) * 0.4); drawBlanket(x, -80, -34, 160, 68, t, { col }); x.restore() }
      }
      // Taurus' blanket, mid-flight (it lands on Leo at 3.6)
      const p = clamp(prog(t, -1, 3.6))
      if (p < 1) { const bx = lerp(760, 330, p), by = lerp(820, 1180, p) - Math.sin(Math.PI * p) * 260; x.save(); x.translate(bx, by); x.rotate(Math.sin(t * 5) * 0.3); drawBlanket(x, -90, -40, 180, 80, t, { col: '#ff8fb1' }); x.restore() }
      // a stack of blankets on the counter
      for (let i = 0; i < 4; i++) drawBlanket(x, 640, 860 - i * 26, 150, 24, t, { col: ['#3fa48a', '#ffd36e', '#c05a6a', '#7fe0ff'][i] })
    } })
  }
  function act1(t) {
    const inK = ease.inOutQuad(prog(t, ...T.blanketIn))
    const sagMoods = [[0, 'happy', [-1, 0]], [16.0, 'wide', [-1, 0]], [17.4, 'happy', [-1, 0], 0.9], [20.6, 'sparkle', [0, -1]], [T.up, 'wide', [0, -1]], [T.look, 'neutral', [-1, 0], 0.9]]
    const canMoods = [[0, 'happy', [1, 0]], [16.0, 'wide', [1, 0]], [17.4, 'happy', [1, 0], 0.9], [20.6, 'sparkle', [0, -1]], [T.look + 0.2, 'heart', [1, 0], 1]]
    cafe(t, {
      sagAt: [[10, 1250], [T.enter[0], 1250], [T.enter[1], SEAT.sag]], cancerAt: [[10, 1350], [T.enter[0] + 0.2, 1350], [T.enter[1] + 0.3, SEAT.can]],
      sagMoods, canMoods, blanketOn: t < T.blanketIn[0] ? 0 : inK,
      extra: () => {
        // the talk card + the answers
        if (t > T.card[0] && t < T.cardOut[1] + 10) {
          const p = ease.outCubic(prog(t, ...T.card)), sx = Math.cos((1 - p) * 6.28)
          drawTalkCard(x, lerp(400, 540, p), lerp(930, 740, p), lerp(80, 300, p), t, { back: sx < 0, scaleX: Math.max(0.03, Math.abs(sx)), q: 'What’s your favourite thing about this winter?', glow: bump(t, T.look, 1.0) })
        }
        ;[['me.', CSX(330), '#ffbe73'], ['soup.', CSX(860), '#ffd98a'], ['all of you!!', 170, '#d2c8ff']].forEach(([s, X, col], i) => drawBubble(x, X, i === 1 ? 500 : i === 0 ? 900 : 990, s, { size: 32, col, k: pop01(t, T.ans[i], 0.25, 2.2) * outK(t, [T.ans[i] + 1.8, T.ans[i] + 2.0]) }))
        sparkles(x, t, 540, 740, T.card[1], 10, 170, 32)
      },
    })
  }
  function deflect(t) {
    const pre = t < T.move[0]
    cafe(t, {
      sagAt: SEAT.sag, cancerAt: pre ? SEAT.can : [[T.move[0], SEAT.can], [T.move[1], CHAIR]], cancerSeat: pre ? SEAT.y : [[T.move[0], SEAT.y], [T.move[1], 1400]],
      sagMoods: [[0, 'sparkle', [-1, 0]], [31.0, 'happy', [0, -1]], [T.touch, 'wide', [-1, 1], 0.9], [35.6, 'wink', [-1, 0]], [41.6, 'happy', [0, -1]], [45.2, 'wide', [-1, 0]], [47.4, 'neutral', [-1, 0], 0.4], [T.move[1], 'squint', [1, 0]]],
      canMoods: [[0, 'heart', [1, 0]], [31.4, 'neutral', [1, 0]], [T.touch, 'heart', [0, 1], 1], [35.8, 'neutral', [1, 0]], [42.0, 'squint', [1, 0]], [45.2, 'neutral', [1, 0], 0.4], [T.move[0], 'squint', [0, 1]], [T.move[1], 'neutral', [-1, 0]]],
      blanketOn: 1,
      extra: () => {
        if (t < T.cardOut[1]) { const o = 1 - ease.inCubic(prog(t, ...T.cardOut)); drawTalkCard(x, 540, 740 - (1 - o) * 200, 300, t, { q: 'What’s your favourite thing about this winter?', alpha: o }) }
        // hands touch under the blanket: a little spark
        sparkles(x, t, CSX(540), CSY(1400), T.touch, 10, 150, 33, [PINK, '#ffb3d9', ML_GOLD])
        drawBubble(x, CSX(330), 900, 'HA!', { size: 34, col: '#ffbe73', k: pop01(t, T.laugh, 0.22, 2.4) * outK(t, [43.8, 44.0]) })
        drawBubble(x, CSX(460), 900, '…', { size: 34, k: pop01(t, 31.4, 0.22, 2) * outK(t, [32.8, 33.0]) })
      },
    })
  }
  function alone(t) {
    const dim = key(t, [[52, 1], [54.5, 0.55]])
    cafe(t, {
      lights: dim, sleepy: t > T.doze ? 1 : 0,
      sagAt: SEAT.sag, cancerAt: CHAIR, cancerSeat: 1400,
      sagMoods: [[0, 'squint', [0, 1]], [55.0, 'neutral', [1, 0]], [57.6, 'squint', [0, 1]]],
      canMoods: [[0, 'neutral', [-1, 0]], [T.doze, 'sleepy', undefined]], blanketOn: 1,
      wextra: () => { drawTalkCard(x, SEAT.sag - 90, 1330, 90, t, { q: 'What’s your favourite thing about this winter?', rot: -0.2 }) },
    })
  }
  function lowPoint(t) {
    // a close-up: Pisces, under a blanket, sobbing
    x.save(); x.setTransform(2.2, 0, 0, 2.2, 540 - 70 * 2.2, 1050 - 1060 * 2.2)
    cafe(t, { lights: 0.5, sleepy: 1, sagAt: SEAT.sag, cancerAt: CHAIR, cancerSeat: 1400, sagMoods: [[0, 'squint', [0, 1]]], canMoods: [[0, 'sleepy']], blanketOn: 1 })
    drawBlanket(x, -30, 1080, 170, 70, t, { col: '#c9a6ff' })
    x.restore()
  }
  function act3(t) {
    const back = t > T.back[0]
    const ey = t > T.eyes ? 1 : 0
    cafe(t, {
      lights: key(t, [[90, 0.55], [98, 0.7]]), sleepy: 1, eyes: ey,
      sagAt: [[90, SEAT.sag], [T.cross[0], SEAT.sag], [T.cross[1], CHAIR - 190], [T.back[0], CHAIR - 190], [T.back[1], SEAT.sag]],
      cancerAt: back ? [[T.back[0], CHAIR], [T.back[1], SEAT.can]] : CHAIR, cancerSeat: back ? [[T.back[0], 1400], [T.back[1], SEAT.y]] : 1400,
      sagMoods: [[0, 'neutral', [1, 0]], [92.0, 'neutral', [1, 0], 0.8], [95.9, 'heart', [1, 0], 1], [T.back[1], 'happy', [-1, 0], 1]],
      canMoods: [[0, 'sleepy'], [91.0, 'neutral', [-1, 0]], [93.4, 'wide', [-1, 0], 0.7], [95.8, 'heart', [-1, 0], 1], [T.back[1], 'happy', [1, 0], 1]],
      blanketOn: key(t, [[90, 0], [T.back[1], 0], [T.back[1] + 0.6, 1]], ease.inOutQuad),
      wextra: () => {
        if (t < T.back[0]) { const X = key(t, [[90, SEAT.sag - 90], [T.cross[0], SEAT.sag - 90], [T.cross[1], CHAIR - 300]]); drawTalkCard(x, X, 1270, 100, t, { q: 'What’s your favourite thing about this winter?', rot: 0.1 }) }
        sparkles(x, t, 800, 1250, 95.9, 12, 170, 34, [PINK, '#ffb3d9', ML_GOLD])
      },
      extra: () => {
        sparkles(x, t, 540, 1000, T.eyes, 14, 400, 35)
        for (let i = 0; i < 3; i++) drawBubble(x, [CSX(330), CSX(700), CSX(830)][i], 900 - i * 10, '!', { size: 30, col: PINK, k: pop01(t, T.eyes + i * 0.15, 0.2, 2.4) * outK(t, [103.0, 103.3]) })
      },
    })
  }
  function tag(t) {
    // the booth: Libra and Scorpio asleep, leaning on each other; Scorpio still holding a whisk
    x.save(); x.setTransform(1.7, 0, 0, 1.7, 540 - 827 * 1.7, 1100 - 1050 * 1.7)
    cafe(t, { lights: 0.6, sleepy: 1, sagAt: SEAT.sag, cancerAt: SEAT.can, sagMoods: [[0, 'sleepy']], canMoods: [[0, 'sleepy']], blanketOn: 1 })
    // the whisk in Scorpio's arm
    x.fillStyle = INK; x.fillRect(985, 1010, 6, 60); x.strokeStyle = '#d8dce8'; x.lineWidth = 3
    for (let k = -2; k <= 2; k++) { x.beginPath(); x.ellipse(988 + k * 2, 990, 10 - Math.abs(k) * 2, 26, 0, 0, 6.29); x.stroke() }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.prev[0]) coldOpen(t)
      else if (t < 10) drawSky(x, t, SKY_H)
      else if (t < 30) act1(t)
      else if (t < 52) deflect(t)
      else if (t < T.lowpt) alone(t)
      else if (t < T.act3) { if (t < T.advise + 0.7) lowPoint(t); else drawSky(x, t, SKY_H) }
      else if (t < T.tag) act3(t)
      else if (t < 111.6) tag(t)
      if (t >= 111.45) {
        const k = ease.inOutQuad(prog(t, 111.45, 111.75))
        if (k >= 1 || t >= 111.6) drawSky(x, t, SKY_H)
        else { x.save(); x.globalAlpha = k; drawSky(x, t, SKY_H); x.restore() }
      }
      prev.update(t)
      for (const c of caps) c.update(t)
      for (const b of boxes) b.update(t)
      advise.update(t)
      lesson.update(t)
      next.update(t)
      title.update(t)
      bug.update(t, title.on(t) || prev.on(t) ? 0 : outK(t, T.nextOut))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

const NOTE = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77]   // C major
export const CUES = [
  ['whoosh', 0.1, 0.5, 0.04], ['pop', 3.6, 392, 0.04, -0.4],
  ...previouslyCues(T.prev[0], 3, T.prev[1] - T.prev[0]),
  ...titleCues(T.title, 3),
  ...popCues(CAPS[1]), ['whoosh', T.enter[0], 0.4, 0.04], ...Array.from({ length: 4 }, (_, i) => ['tick', r3(T.enter[0] + i * 0.3), 0.02]),
  ...popCues(CAPS[2]), ['whoosh', T.blanketIn[0], 0.4, 0.045], ['pop', T.blanketIn[1], 659.25, 0.04, 0],
  ...popCues(CAPS[3]), ['whoosh', T.card[0], 0.4, 0.05], ['pop', T.card[1], 1318.51, 0.045, 0], ['bell', r3(T.card[1] + 0.05), 1760, 0.03, 1.2, 0],
  ...T.ans.map((a, i) => ['pop', a, NOTE[3 + i] * 2, 0.04, (i - 1) * 0.4]), ['pop', T.look, 1046.5, 0.04, 0],
  ...popCues(CAPS[4]), ['pop', 31.4, 392, 0.03, -0.3], ['bell', T.touch, 2093, 0.03, 1.4, 0], ['glitter', T.touch, r3(T.touch + 0.6)],
  ...Array.from({ length: 3 }, (_, i) => ['tick', r3(35.6 + i * 0.12), 0.04]),
  ...popCues(CAPS[5]), ['pop', T.laugh, 783.99, 0.04, -0.4], ['pop', r3(T.laugh + 0.12), 880, 0.035, -0.4],
  ...popCues(CAPS[6]), ['whoosh', T.move[0], 0.4, 0.035],
  ...popCues(CAPS[7]), ['riser', 52.0, 54.5, 0.012],
  ...popCues(CAPS[8]), ['pop', 66.0, 392, 0.03, -0.3],
  ...adviseCues(ADVISE),
  ...popCues(CAPS[9]), ...Array.from({ length: 4 }, (_, i) => ['tick', r3(T.cross[0] + i * 0.3), 0.018]),
  ['bell', 95.9, 1760, 0.035, 1.6, 0], ['glitter', 95.9, 96.6], ['whoosh', T.back[0], 0.35, 0.03],
  ...popCues(CAPS[10]), ...popCues(CAPS[11]), ['pop', T.eyes, 1046.5, 0.04, -0.3], ['pop', r3(T.eyes + 0.15), 1174.66, 0.04, 0.3], ['pop', r3(T.eyes + 0.3), 1318.51, 0.04, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'C' }),
  ...captionCues(CAPS[12]),
  ...nextTimeCues(T.next), ...popCues(CAPS[13]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CS]: 880, [GS]: 659.25, [TS]: 523.25, [GE]: 1046.5 } }),
  ...endcardCues(STORY_END, { short: true }),
].filter(c => c[1] >= 0)
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
