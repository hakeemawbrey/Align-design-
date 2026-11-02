// mlpilot — MOONLIGHT LANE, Ep 1: "The Blind Card" (120 s vertical, Star Talk, promo/films/STARTALK-EPISODES.md; lofi · C).
// The show kit lives in ./mlkit.js (copied unchanged by every episode). Story 0–115.6, then the shared end card.
//   0.0–6.9    COLD OPEN  "Too busy | to *date.*" (MONDAY · 6:58 PM). ♑ Capricorn's wall planner fills to the minute
//              (INBOX ZERO, INBOX ZERO (AGAIN), ALPHABETIZE SPICES…) and a red BOOKED stamp slams. "I'm not avoiding love.
//              I'm *booked.*"
//   7.0–10.0   TITLE CARD  Moonlight Lane · Ep 1 · The Blind Card.
//  10.0–30.0   ACT 1  ♊ Gemini (the roommate) bursts in with tonight's deck and deals a blind mystery card as a DARE.
//              Capricorn says yes… with an agenda: a pink "DATE · HARD STOP 8:30" squeezes into the planner and the
//              phone thread confirms "Agenda: 1) hello 2) chat 3) hard stop." / "is this a date or a meeting?" / "Yes."
//  30.0–40.0   The lane at dusk, the lamps flicker on (THURSDAY · 7:59 PM). Capricorn marches to the café with a
//              clipboard; ♓ Pisces (in the window above the café) is already crying. ♌ Leo, the blind card, bounces in.
//  40.0        card cut.
//  40.0–60.0   ACT 2  The café. "Agenda item | *one.*" It's… going well (Leo laughs; Capricorn is funny). Three time
//              checks (8:24 · 8:27 · 8:29) under Leo's goat story, then BZZT: HARD STOP. "that's *time!* great meeting."
//  60.0–70.0   The bench under the middle lamp, late. "Hard stop. | *Hard regret.*" Gemini's bad advice (a Q3
//              follow-up). Pisces sobs upstairs.
//  70.0–90.0   ★ THE STARS ADVISE (breakdown): Make room first · Curious beats impressive · Stay past the hard stop.
//  90.0–104.0  ACT 3 (lift)  The 9 PM "ALPHABETIZE SPICES" is struck off; "is the café still open? I cancelled my 9 PM."
//              Back at the table: "so… what made you *smile* today?" "honestly? *this.*" A time-lapse: Taurus stacks
//              the chairs around them (9:02 → 11:48 PM). "Card first. | *Face* last." (the blind card on the table)
// 104.0–108.0  ★ LESSON UNLOCKED "Busy isn't a | *personality.*" +1 FREE EVENING
// 108.0–111.6  LANE TAG  The last pastry: Libra and ♏ Scorpio (the night baker) both lean in; Scorpio slides it over.
// 111.6–115.6  NEXT TIME ON Moonlight Lane… "Aries has a plan. A *big* one." · last line "*Make* room."
// One canvas (sets + cast), DOM type + boxes + kit pieces, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, MONO, INTER, r3, pop01, outK, popOut, inR, bump, loadFonts,
  drawLane, LANE, standY, drawSign, drawPisces, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildAdvise, adviseCues, buildNextTime, nextTimeCues, popCues,
  drawMysteryCard, drawBubble, drawPhone, drawPastry, drawIcon, sparkles,
} from './mlkit.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN       // 115.6
const CAP = signStar('capricorn'), GEM = signStar('gemini'), LEO = signStar('leo')
const CS = `${CAP.glyph}︎ CAPRICORN`, GS = `${GEM.glyph}︎ GEMINI`, LS = `${LEO.glyph}︎ LEO`
const CAP_C = '#7ff0c8', GEM_C = '#ffe27a', LEO_C = '#ffbe73'

// ── the timeline
const T = {
  black: [0, 0.35],
  rows0: 0.5, rowGap: 0.36, booked: 4.75,
  title: 7.0,
  gemIn: 10.25, deckIn: 10.6, deal: [18.95, 19.5], cardOut: [20.6, 20.95],
  dateRow: 21.3, phoneIn: [21.6, 22.0], phoneOut: [29.3, 29.7], eyeroll: 28.2,
  lane: 30.0, lampsAt: 30.7, walk: [30.3, 36.0], leoIn: [33.4, 34.4],
  cafe: 40.0, check: 41.65, laugh1: 47.7, laugh2: 50.35,
  glances: [51.2, 52.6, 54.0], goat: 51.6, bye: 58.0, alarm: 55.2, standUp: 55.35, exit: [58.7, 59.6],
  bench: 60.0, gemIn2: [62.1, 62.6], gemOut: [68.9, 69.4],
  advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, strike: 90.9, poof: 91.35, newRow: 91.7, phone3: [91.9, 92.2], run: [94.6, 95.0],
  cafe2: 95.0, lapse: [99.4, 103.4], cardOn: 100.3,
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, lean: 108.55, look: 109.2, slide: [109.9, 110.4], blush: 110.6,
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Busy isn’t a | *personality.*', chip: '+1 FREE EVENING' }

// ── the dialogue
const CPS = 28
const L0 = [{ t: 2.75, speaker: CS, color: CAP_C, text: 'I’m not avoiding love. I’m *booked.*' }]
const L1 = [
  { t: 11.6, speaker: GS, color: GEM_C, text: 'tonight’s deck dealt you a *blind card.*' },
  { t: 14.65, speaker: CS, color: CAP_C, text: 'I have a 7:30 with my *laundry.*' },
  { t: 17.4, speaker: GS, color: GEM_C, text: 'one date. no photo. I *dare* you.' },
]
const L2 = [
  { t: 34.35, speaker: LS, color: LEO_C, text: 'hi!! are you my *blind card?*' },
  { t: 37.1, speaker: CS, color: CAP_C, text: 'yes. thanks for *coming.*' },
]
const L3 = [
  { t: 41.0, speaker: CS, color: CAP_C, text: 'item one: *hellos.* check.' },
  { t: 43.75, speaker: LS, color: LEO_C, text: 'ha! ok… what do you do for *fun?*' },
  { t: 46.9, speaker: CS, color: CAP_C, text: 'I schedule my *fun.*' },
  { t: 49.05, speaker: LS, color: LEO_C, text: 'stop. you’re actually *funny.*' },
]
const L4 = [{ t: 55.5, speaker: CS, color: CAP_C, text: 'that’s *time!* great meeting.' }]
const L5 = [
  { t: 62.7, speaker: GS, color: GEM_C, text: 'easy fix: book a *follow-up* for Q3.' },
  { t: 65.8, speaker: CS, color: CAP_C, text: 'it was going *well.* why did I leave?' },
]
const L6 = [
  { t: 95.55, speaker: CS, color: CAP_C, text: 'so… what made you *smile* today?' },
  { t: 98.45, speaker: LS, color: LEO_C, text: 'honestly? *this.*' },
]
const BOXES = [[L0, 2.55, 6.55], [L1, 11.4, 20.55], [L2, 34.15, 39.7], [L3, 40.8, 51.8], [L4, 55.3, 58.4], [L5, 62.5, 68.8], [L6, 95.35, 100.75]]
const ALL_LINES = BOXES.flatMap(b => b[0])

// THE STARS ADVISE
const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'door', head: 'Make room *first.*', body: 'A packed calendar can be a hiding place. Leave a gap on purpose.' },
    { at: T.cards[1], icon: 'question', head: 'Curious beats *impressive.*', body: 'Skip the highlight reel. Ask one real question, then listen.' },
    { at: T.cards[2], icon: 'clock', head: 'Stay past the *hard stop.*', body: 'If it’s going well, let it run. The inbox can wait.' },
  ],
  lines: [
    { t: 71.05, text: 'Capricorn, this one’s *yours.*' },
    { t: 73.95, text: 'busy feels *safe.* make a gap anyway.' },
    { t: 77.5, text: 'try: “what made you *smile* today?”' },
    { t: 80.4, text: 'then actually *listen.* that’s the date.' },
    { t: 83.5, text: 'going well? *cancel the next thing.*' },
    { t: 86.5, text: 'the spices can wait. *promise.*' },
  ],
}

// ── headlines / captions
const CAPS = [
  { text: 'Too busy | to *date.*', kicker: 'MONDAY · 6:58 PM', at: 0.4, out: [6.7, 6.9], late: 1, lateAt: 1.35 },
  { text: 'Gemini has | a *dare.*', at: 10.35, out: [20.5, 20.7], late: 1, lateAt: 10.9 },
  { text: 'Capricorn says yes… | *with an agenda.*', at: 20.9, out: [29.55, 29.8], size: 80 },
  { text: '8:00 PM. | *Sharp.*', kicker: 'THURSDAY · 7:59 PM', at: 30.2, out: [39.55, 39.8], late: 1, lateAt: 31.2 },
  { text: 'Agenda item | *one.*', at: 40.3, out: [50.55, 50.75], late: 1, lateAt: 40.85 },
  { text: 'It’s going… | *well?*', at: 50.85, out: [55.0, 55.15], late: 1, lateAt: 51.6 },
  { text: '*HARD STOP.*', at: T.alarm, out: [59.6, 59.85], size: 110, late: 1, lateAt: T.alarm },
  { text: 'Hard stop. | *Hard regret.*', at: 60.3, out: [69.3, 69.6], late: 2, lateAt: 61.0 },
  { text: 'One small | *cancellation.*', at: 90.3, out: [94.6, 94.8], late: 1, lateAt: 90.9 },
  { text: 'Overtime. | *On purpose.*', at: 95.15, out: [100.15, 100.35], late: 2, lateAt: 95.7 },
  { text: 'Card first. | *Face* last.', at: 100.55, out: [103.65, 103.85], late: 2, lateAt: 101.0 },
  { text: 'The last | *pastry.*', kicker: 'CLOSING TIME', at: 108.15, out: [111.3, 111.5], late: 1, lateAt: 108.6 },
  { text: '*Make* room.', at: 112.5, out: [115.05, 115.4], size: 110, late: 2, lateAt: 112.5, top: 300 },
]

// ── the planner (cold open + Act 1), and the mini one on the bench (Act 3)
const ROWS = [
  ['6:00', 'GYM'], ['6:30', 'INBOX ZERO'], ['6:31', 'INBOX ZERO (AGAIN)'], ['7:00', 'LAUNDRY STRATEGY'], ['7:30', 'LAUNDRY'],
  ['8:00', 'DATE · HARD STOP 8:30', T.dateRow], ['8:45', 'PLAN THE PLAN'], ['9:00', 'ALPHABETIZE SPICES'], ['10:00', 'SLEEP (SCHEDULED)'],
].map(([tm, tx, at], i) => ({ tm, tx, at: at ?? r3(T.rows0 + (i > 5 ? i - 1 : i) * T.rowGap), pink: !!at }))
const MINI = [
  { tm: '8:30', tx: 'HARD STOP', at: 90.2 },
  { tm: '9:00', tx: 'ALPHABETIZE SPICES', at: 90.35, strike: T.strike, gone: T.poof },
  { tm: '9:00', tx: 'CAFÉ. OVERTIME.', at: T.newRow, pink: true },
]

// ── phone threads
const THREAD1 = [
  { at: 22.4, side: 'R', text: 'Confirming Thu, 8:00–8:30 PM.' },
  { at: 23.7, side: 'R', text: 'Agenda: 1) hello 2) chat 3) hard stop.' },
  { at: 26.2, side: 'L', text: 'haha is this a date or a meeting?' },
  { at: 27.55, side: 'R', text: 'Yes.' },
]
const THREAD3 = [
  { at: 92.35, side: 'R', text: 'is the café still open? I cancelled my 9 PM.' },
  { at: 93.95, side: 'L', text: 'still here. Taurus made cocoa.' },
]

// hops
const CAP_HOPS = [...talkHops(ALL_LINES, CS, { cps: CPS }), T.booked + 0.05, T.deal[1], T.check, T.standUp, 94.15, 94.45, 101.0]
const GEM_HOPS = [T.gemIn + 0.4, ...talkHops(ALL_LINES, GS, { cps: CPS }), T.deal[0], T.gemIn2[1] + 0.05]
const LEO_HOPS = [T.leoIn[1], ...talkHops(ALL_LINES, LS, { cps: CPS }), T.laugh1, T.laugh1 + 0.38, T.laugh2, 52.0, 52.6, 99.0, 100.0]

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '700 30px Inter', '600 28px Inter'])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'Aries has a plan. A *big* one.' })
  const title = buildTitle(root, { ep: 1, title: 'The Blind Card', at: T.title, len: 3 })
  const bug = showBug(root, 1, { at: 0.5 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── props
  function planner(t, X, Y, W, rows, { k = 1, alpha = 1, head = 'THIS WEEK', stamp = null, rowH = 50 } = {}) {
    if (k <= 0.01 || alpha <= 0.01) return
    const vis = rows.map(r => ({ r, a: clamp(prog(t, r.at, r.at + 0.22)) * (r.gone ? 1 - prog(t, r.gone, r.gone + 0.35) : 1) }))
    const H = 84 + vis.reduce((s, v) => s + v.a * rowH, 0) + 20
    x.save(); x.globalAlpha *= alpha; x.translate(X + W / 2, Y); x.scale(k, k); x.translate(-W / 2, 0)
    x.fillStyle = INK; x.fillRect(-8, -8, W + 16, H + 16)
    x.fillStyle = '#fbf3e2'; x.fillRect(0, 0, W, H)
    x.fillStyle = '#d8455f'; x.fillRect(0, 0, W, 64)
    for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(30 + i * (W - 60) / 5 - 5, -16, 10, 26) }
    x.fillStyle = '#fff6e8'; x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(head, 22, 34)
    let y = 84
    x.font = `700 24px ${MONO}`
    for (const { r, a } of vis) {
      if (a <= 0.001) continue
      const h = rowH * a
      x.save(); x.beginPath(); x.rect(0, y - 6, W, h); x.clip(); x.globalAlpha *= clamp(a * 1.4)
      if (r.pink) { x.fillStyle = '#ffd2e0'; x.fillRect(10, y - 4, W - 20, rowH - 6) }
      x.fillStyle = r.pink ? '#c2306a' : '#8a6a4a'; x.fillText(r.tm, 20, y + rowH / 2 - 6)
      x.fillStyle = r.pink ? '#c2306a' : INK; x.fillText(r.tx, 112, y + rowH / 2 - 6)
      if (r.strike && t > r.strike) { const s = prog(t, r.strike, r.strike + 0.25); x.fillStyle = '#d8455f'; x.fillRect(104, y + rowH / 2 - 9, (W - 120) * s, 6) }
      x.fillStyle = '#e8dcc4'; x.fillRect(10, y + rowH - 6, W - 20, 2)
      x.restore()
      y += h
    }
    if (stamp && t > stamp.at) {
      const p = prog(t, stamp.at, stamp.at + 0.18), s = lerp(2.2, 1, ease.outCubic(p))
      x.save(); x.translate(W / 2, H * 0.55); x.rotate(-0.22); x.scale(s, s); x.globalAlpha *= clamp(p * 3)
      x.strokeStyle = '#d8455f'; x.lineWidth = 10; x.strokeRect(-190, -56, 380, 112)
      x.fillStyle = 'rgba(216,69,95,0.12)'; x.fillRect(-190, -56, 380, 112)
      x.fillStyle = '#d8455f'; x.font = `800 84px ${INTER}`; x.textAlign = 'center'; x.fillText(stamp.text, 0, 6)
      x.restore()
    }
    x.restore()
  }
  function deck(t, X, Y, k) {      // tonight's deck, fanned (card backs)
    if (k <= 0.01) return
    for (let i = 0; i < 5; i++) {
      if (i === 4 && t > T.deal[0]) continue
      const a = (i - 2) * 0.16 + 0.04 * Math.sin(t * 2 + i)
      drawMysteryCard(x, X + (i - 2) * 26, Y + Math.abs(i - 2) * 8, 110 * k, t, { back: true, rot: a })
    }
  }
  function blindCard(t) {          // dealt from Gemini's fan to Capricorn
    if (t < T.deal[0] || t > T.cardOut[1]) return
    const p = ease.outCubic(prog(t, ...T.deal)), o = 1 - ease.inCubic(prog(t, ...T.cardOut))
    const cx = lerp(770, 470, p), cy = lerp(1000, 1020, p) - Math.sin(Math.PI * p) * 160, spin = (1 - p) * 6.28
    const sx = Math.cos(spin)
    if (sx < 0) drawMysteryCard(x, cx, cy, 170, t, { back: true, scaleX: Math.max(0.03, -sx), alpha: o })
    else drawMysteryCard(x, cx, cy + 6 * Math.sin(t * 2), 170, t, { sign: 'leo', rot: -0.06 * p, scaleX: Math.max(0.03, sx), glow: bump(t, T.deal[1], 0.8), alpha: o })
    sparkles(x, t, 470, 1020, T.deal[1], 10, 150, 3)
  }
  function clipboard(X, Y, s, checked) {
    x.save(); x.translate(X, Y); x.scale(s, s)
    x.fillStyle = INK; x.fillRect(-36, -48, 72, 96); x.fillStyle = '#9a6a48'; x.fillRect(-32, -44, 64, 88); x.fillStyle = '#fbf3e2'; x.fillRect(-26, -34, 52, 74)
    x.fillStyle = '#b0b0b0'; x.fillRect(-14, -52, 28, 12)
    for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.fillRect(-20, -24 + i * 22, 10, 10); x.fillRect(-4, -21 + i * 22, 24, 4); if (checked > i) { x.fillStyle = '#2fa86a'; x.fillRect(-18, -22 + i * 22, 6, 6) } }
    x.restore()
  }
  function timeChip(X, Y, txt, k, col = BONE) { drawBubble(x, X, Y, txt, { size: 28, col, k, tail: 'down' }) }
  function lapseClock(t) {
    if (!inR(t, T.lapse[0] - 0.3, 104.0)) return
    const p = ease.inOutQuad(prog(t, ...T.lapse)), mins = Math.round(lerp(9 * 60 + 2, 11 * 60 + 48, p))
    const hh = Math.floor(mins / 60), mm = String(mins % 60).padStart(2, '0')
    const k = pop01(t, T.lapse[0] - 0.3, 0.3, 2) * outK(t, [103.7, 103.95])
    drawBubble(x, 280, 980, `▶▶ ${hh}:${mm} PM`, { size: 34, col: ML_GOLD, k, tail: null })
  }

  // ── scenes
  function apartment(t) {
    drawApartment(x, t, { lamp: 1 })
    // the planner on the wall
    const pk = pop01(t, 0.2, 0.4, 1.6) * (t < 7 ? 1 : 1)
    planner(t, 70, 440, 470, ROWS, { k: pk, stamp: { at: T.booked, text: 'BOOKED' } })
    // Capricorn on the couch
    let cm = 'neutral', cl = [-1, -1]
    if (t > 2.6 && t < 7) { cm = 'happy'; cl = undefined }
    if (t > T.booked && t < T.booked + 0.6) { cm = 'wide'; cl = [-1, -1] }
    if (t > 10) { cm = 'neutral'; cl = [1, 0] }
    if (t > 14.6 && t < 17.4) { cm = 'squint'; cl = [1, 0] }
    if (t > T.deal[1]) { cm = 'wide'; cl = [0, -1] }
    if (t > T.dateRow) { cm = 'happy'; cl = undefined }
    if (t > 26.2 && t < 27.5) { cm = 'neutral'; cl = [1, -1] }
    if (t > 27.5) { cm = 'sparkle'; cl = [1, 0] }
    drawSign(x, 'capricorn', APT.couch.seats[0], standY(250, APT.couch.seatY), 250, t, { mood: cm, look: cl, hops: CAP_HOPS, seed: 5, pop: pop01(t, 0.1, 0.4, 1.8) })
    // Gemini bursts in with the deck
    if (t > T.gemIn) {
      const p = ease.outBack(prog(t, T.gemIn, T.gemIn + 0.5))
      const gx2 = lerp(1250, 790, p)
      let gm = 'happy', gl = [-1, 0]
      if (t > 14.6 && t < 17.4) { gm = 'eyeroll'; gl = undefined }
      if (t > 17.4) { gm = 'wink'; gl = [-1, 0] }
      if (t > T.eyeroll) { gm = 'eyeroll'; gl = undefined }
      drawSign(x, 'gemini', gx2, standY(240, 1440), 240, t, { mood: gm, look: gl, hops: GEM_HOPS, seed: 8 })
      if (t < T.phoneIn[0] + 0.4) deck(t, gx2 - 10, 1070, pop01(t, T.deckIn, 0.35, 2) * (1 - prog(t, T.phoneIn[0], T.phoneIn[0] + 0.3)))
      sparkles(x, t, gx2 - 10, 1060, T.deckIn, 8, 130, 4)
    }
    blindCard(t)
    // the phone: the agenda
    if (t > T.phoneIn[0] && t < T.phoneOut[1]) {
      const pin = ease.outBack(prog(t, ...T.phoneIn)), po = ease.inCubic(prog(t, ...T.phoneOut))
      drawPhone(x, 760, 900 + (1 - pin) * 1000 + po * 1000, 420, 640, t, { title: '♌︎ blind card', msgs: THREAD1, typing: [25.3, 26.2] })
    }
  }

  function laneWalk(t) {
    const w = ease.inOutQuad(prog(t, ...T.walk))
    const pan = lerp(60, 380, ease.inOutCubic(prog(t, 30.0, 35.5)))
    drawLane(x, t, { time: 'dusk', pan, lampsAt: T.lampsAt }, c => {
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: t > 35.5 ? 3 : 2, look: [1, 1], pull: bump(t, 35.6, 0.5) })
      // Capricorn marches (little hops = steps), clipboard tucked
      const cxw = lerp(420, 840, w), walking = t < T.walk[1]
      const steps = walking ? Array.from({ length: 14 }, (_, i) => T.walk[0] + i * 0.4) : []
      let cm = walking ? 'neutral' : 'happy', cl = walking ? [1, 0] : [1, 0]
      if (t > T.leoIn[0] && t < 35.4) { cm = 'wide'; cl = [1, 0] }
      drawSign(c, 'capricorn', cxw, standY(220), 220, t, { mood: cm, look: cl, hops: [...steps, ...CAP_HOPS], seed: 5 })
      clipboard(cxw - 118, 1300, 1.0, 0)
      // Leo bounces in (the blind card)
      if (t > T.leoIn[0]) {
        const p = ease.outBack(prog(t, ...T.leoIn))
        drawSign(c, 'leo', lerp(1500, 1110, p), standY(230), 230, t, { mood: t < 36.8 ? 'happy' : 'sparkle', look: [-1, 0], hops: [T.leoIn[0] + 0.3, ...LEO_HOPS], seed: 7, squash: 0.06 * bump(t, T.leoIn[1], 0.3) })
        sparkles(c, t, 1110, 1260, T.leoIn[1], 10, 170, 5)
      }
    })
  }

  function cafeScene(t, { act3 = false, lights = 1, chairsUp = 0 } = {}) {
    drawCafe(x, t, { lights, chairsUp, view: act3 ? 'late' : 'night', behind: c => drawSign(c, 'taurus', CAFE.counter.x, standY(200, CAFE.counter.y), 200, t, { mood: act3 && t > 101.5 ? 'sleepy' : 'happy', look: act3 ? undefined : [-1, 1], seed: 9 }) })
    const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
    if (!act3) {
      // Pisces at the back table, sobbing happily for two strangers
      drawPisces(x, 92, standY(120, 1250), 120, t, { tears: t > 47 ? 3 : 2, look: [1, 0], pull: bump(t, T.laugh2, 0.5) })
      // Capricorn (stands up at the alarm, then leaves)
      const up = ease.outBack(prog(t, T.standUp, T.standUp + 0.3)), ex = ease.inCubic(prog(t, ...T.exit))
      let cm = 'neutral', cl = [1, 0]
      if (t > 46.6 && t < 48.7) { cm = 'happy'; cl = undefined }
      if (t > 48.85) { cm = 'happy'; cl = [1, 0] }
      if (T.glances.some(g => inR(t, g, g + 0.7))) { cm = 'neutral'; cl = [-1, 1] }
      if (t > T.alarm) { cm = 'wide'; cl = [0, -1] }
      if (t > 55.9) { cm = 'happy'; cl = [1, 0] }
      if (t > T.bye) { cm = 'neutral'; cl = [-1, 0] }
      if (ex < 1) drawSign(x, 'capricorn', S0.x - ex * 600, standY(220, S0.y) - up * 50, 220, t, { mood: cm, look: cl, hops: CAP_HOPS, seed: 5, blush: t > 48.9 && t < 55 ? 0.9 : undefined })
      // Leo
      let lm = 'happy', ll = [-1, 0], lsq = 0
      if (inR(t, T.laugh1, T.laugh1 + 1) || inR(t, T.laugh2, T.laugh2 + 1)) { lm = 'happy'; ll = undefined; lsq = 0.06 * Math.sin((t - T.laugh1) * 18) }
      if (inR(t, 51.2, T.alarm)) { lm = 'sparkle'; ll = [-1, -1] }
      if (t > T.alarm) { lm = 'wide'; ll = [-1, 0] }
      if (t > T.bye) { lm = 'neutral'; ll = [-1, 1]; lsq = 0.1 * ease.outCubic(prog(t, T.bye, T.bye + 0.7)) }
      drawSign(x, 'leo', S1.x, standY(230, S1.y), 230, t, { mood: lm, look: ll, hops: LEO_HOPS, seed: 7, squash: lsq })
      drawCafeTable(x, t, { cups: 2, pastry: 'bun' })
      clipboard(470, 1265, 0.8, t > T.check ? 1 : 0)
      // laughs, the goat story, the time checks, the alarm
      if (t > T.laugh1) sparkles(x, t, S1.x, 1150, T.laugh1, 8, 140, 6, [ML_GOLD, PINK, BONE])
      if (t > T.laugh2) sparkles(x, t, 540, 1120, T.laugh2, 10, 180, 7, [PINK, '#ff6b9a', BONE])
      const gk = pop01(t, T.goat, 0.3, 2) * outK(t, [T.alarm - 0.15, T.alarm])
      drawBubble(x, 760, 1020, '…and THEN the goat—', { size: 30, k: gk, tail: 'down' })
      ;['8:24', '8:27', '8:29'].forEach((s, i) => timeChip(300, 1050 - i * 6, s, pop01(t, T.glances[i], 0.22, 2) * outK(t, [T.glances[i] + 1.0, T.glances[i] + 1.2]), i === 2 ? '#ffd2e0' : BONE))
      drawBubble(x, 770, 1040, 'oh. ok… bye?', { size: 30, k: pop01(t, T.bye, 0.25, 2) * outK(t, [59.6, 59.85]), tail: 'down' })
      const ak = pop01(t, T.alarm, 0.25, 2.6) * outK(t, [57.6, 57.85])
      if (ak > 0.01) { const sh = 6 * Math.sin(t * 60) * (t < T.alarm + 1.2 ? 1 : 0.3); drawBubble(x, 330 + sh, 1030, 'BZZT · 8:30', { size: 38, col: '#ff7a7a', k: ak, tail: 'down' }) }
    } else {
      // Act 3: back at the table; the time-lapse; Pisces at the window, outside
      drawPisces(x, 400, 760, 150, t, { tears: t > 98.6 ? 3 : 2, look: [1, 1], box: false, alpha: 0.92 })
      const lapse = prog(t, ...T.lapse)
      drawSign(x, 'capricorn', S0.x, standY(220, S0.y), 220, t, { mood: t > 98.5 ? 'heart' : 'sparkle', look: t < 98.5 ? [1, 0] : undefined, hops: CAP_HOPS, seed: 5, blush: 0.9 })
      drawSign(x, 'leo', S1.x, standY(230, S1.y), 230, t, { mood: t > 98.4 ? 'happy' : 'sparkle', look: [-1, 0], hops: LEO_HOPS, seed: 7, blush: 0.9 })
      drawCafeTable(x, t, { cups: 2, pastry: lapse > 0.5 ? 'croissant' : null })
      // their chat, sped up: little hearts and laugh bits float
      if (lapse > 0 && lapse < 1) for (let i = 0; i < 6; i++) { const ph = ((t - T.lapse[0]) * 0.9 + i / 6) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); drawIcon(x, i % 2 ? 'heart' : 'chat', 500 + Math.sin(i * 2.3) * 160, 1180 - ph * 260, 4); x.restore() }
      if (t > T.cardOn) { const k = pop01(t, T.cardOn, 0.35, 2); drawMysteryCard(x, 540, 1252 - 10 * (1 - k), 76 * k, t, { sign: 'leo', rot: 0.05, glow: 0.4 }) }
      lapseClock(t)
    }
  }

  function bench(t, act3) {
    drawLane(x, t, { time: 'late', pan: 640, moon: { x: 860, y: 600, r: 105 }, lit: act3 ? ['a4', 'pisces', 'cafe', 'c2', 'd6'] : ['a4', 'pisces', 'cafe', 'd6'] }, c => {
      const B = LANE.bench
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 3, look: [1, 1], pull: bump(t, 66.2, 0.6) + bump(t, 91.4, 0.5) })
      if (!act3) {
        drawSign(c, 'capricorn', B.seats[0], standY(220, B.seatY), 220, t, { mood: t > 65.8 && t < 67.3 ? 'neutral' : 'squint', look: t > 62.6 && t < 68.8 ? [1, 0] : [0, 1], hops: CAP_HOPS, seed: 5, squash: 0.08 })
        if (t > T.gemIn2[0] && t < T.gemOut[1]) {
          const p = ease.outBack(prog(t, ...T.gemIn2)), o = ease.inCubic(prog(t, ...T.gemOut))
          drawSign(c, 'gemini', lerp(1760, 1420, p) + o * 400, standY(220), 220, t, { mood: t > 65.8 ? 'wide' : 'wink', look: [-1, 0], hops: GEM_HOPS, seed: 8 })
        }
      } else {
        const run = ease.inCubic(prog(t, ...T.run))
        let cm = 'neutral', cl = [1, -1]
        if (t > T.poof) { cm = 'happy'; cl = undefined }
        if (t > T.phone3[0]) { cm = 'neutral'; cl = [1, -1] }
        if (t > THREAD3[1].at) { cm = 'sparkle'; cl = [1, 0] }
        drawSign(c, 'capricorn', B.seats[0] + run * 700, standY(220, B.seatY) - run * 30, 220, t, { mood: cm, look: cl, hops: CAP_HOPS, seed: 5 })
      }
    })
    if (act3) {
      const k = pop01(t, 90.1, 0.35, 1.8) * outK(t, [91.95, 92.2])
      planner(t, 120, 760, 470, MINI, { k, head: 'TONIGHT', rowH: 50 })
      sparkles(x, t, 355, 920, T.poof, 10, 150, 8, ['#d8455f', BONE, ML_GOLD])
      if (t > T.phone3[0] && t < 95.0) {
        const pin = ease.outBack(prog(t, ...T.phone3)), po = ease.inCubic(prog(t, 94.55, 94.95))
        drawPhone(x, 700, 860 + (1 - pin) * 1100 + po * 1100, 420, 600, t, { title: '♌︎ Leo', msgs: THREAD3, typing: [93.25, 93.95] })
      }
    }
  }

  function tag(t) {
    // a close-up on the counter: world → screen = (w − (650, 880))·1.5 + (540, 960)
    x.save(); x.setTransform(1.5, 0, 0, 1.5, 540 - 650 * 1.5, 960 - 880 * 1.5)
    drawCafe(x, t, { lights: 0.7, chairsUp: 1, view: 'late', behind: c => {
      const lean = ease.outCubic(prog(t, T.lean, T.lean + 0.25)) * (1 - ease.inOutCubic(prog(t, T.slide[0], T.slide[1])))
      drawSign(c, 'scorpio', CAFE.counter.x + 20 - lean * 30, standY(200, 905), 200, t, { mood: t > T.look ? (t > T.slide[1] ? 'happy' : 'neutral') : 'neutral', look: t > T.look && t < T.slide[1] + 0.3 ? [-1, 0] : [-1, 1], seed: 11, blush: t > T.slide[1] ? 0.9 : undefined, hops: [T.slide[0]] })
    } })
    const lean = ease.outCubic(prog(t, T.lean, T.lean + 0.25)) * (1 - ease.inOutCubic(prog(t, T.slide[0], T.slide[1])))
    let lm = 'sparkle', ll = [1, -1]
    if (t > T.look) { lm = 'wide'; ll = [1, -1] }
    if (t > T.slide[1]) { lm = 'heart'; ll = undefined }
    drawSign(x, 'libra', 470 + lean * 40, standY(210, 1180), 210, t, { mood: lm, look: ll, seed: 10, hops: [T.lean, T.blush] })
    const px = lerp(660, 618, ease.inOutCubic(prog(t, ...T.slide)))
    drawPastry(x, px, 872, 5, 'croissant')
    if (t > T.look && t < T.slide[0] + 0.2) { x.save(); x.globalAlpha = bump(t, T.look, T.slide[0] + 0.2 - T.look); x.fillStyle = PINK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.fillText('!', 560, 960); x.fillText('!', 730, 720); x.restore() }
    drawBubble(x, 790, 700, 'yours.', { size: 30, k: pop01(t, T.slide[1] - 0.1, 0.25, 2.2) * outK(t, [111.25, 111.45]), tail: 'down' })
    sparkles(x, t, 470, 1000, T.blush, 10, 150, 9, [PINK, '#ffb3d9', ML_GOLD])
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.lane) apartment(t)
      else if (t < T.cafe) laneWalk(t)
      else if (t < T.bench) cafeScene(t)
      else if (t < T.act3) { if (t < T.advise + 0.7) bench(t, false); else drawSky(x, t, SKY_H) }
      else if (t < T.cafe2) bench(t, true)
      else if (t < T.tag) cafeScene(t, { act3: true, lights: lerp(1, 0.65, prog(t, ...T.lapse)), chairsUp: ease.inOutQuad(prog(t, ...T.lapse)) })
      else if (t < 111.6) tag(t)
      if (t >= 111.45) {
        // hand-off: the café dissolves to the plain sky H (the end card's sky) under NEXT TIME
        const k = ease.inOutQuad(prog(t, 111.45, 111.75))
        if (k >= 1 || t >= 111.6) drawSky(x, t, SKY_H)
        else { x.save(); x.globalAlpha = k; drawSky(x, t, SKY_H); x.restore() }
      }
      for (const c of caps) c.update(t)
      for (const b of boxes) b.update(t)
      advise.update(t)
      lesson.update(t)
      next.update(t)
      title.update(t)
      bug.update(t, title.on(t) ? 0 : outK(t, T.nextOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx plays the middle one: 40.0, the lane → the café)
const CUTS = [30.0, 40.0, 60.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const ring = (t0, n = 6) => Array.from({ length: n }, (_, i) => ['pluck', r3(t0 + i * 0.09), i % 2 ? 1760 : 1567.98, 0.035, 0.12, i % 2 ? 0.3 : -0.3])
export const CUES = [
  // cold open: the planner fills, BOOKED
  ['pop', 0.25, 659.25, 0.035, -0.3],
  ...ROWS.filter(r => !r.pink).map((r, i) => ['tick', r.at, 0.035 + 0.004 * i]),
  ...ROWS.filter(r => !r.pink).map((r, i) => ['pop', r3(r.at + 0.02), NOTE[i % 7], 0.02, -0.25]),
  ['tom', T.booked, 84, { gain: 0.3, decay: 0.3 }], ['boom', T.booked, 0.25], ['clap', T.booked, { gain: 0.2 }],
  ...captionCues(CAPS[0]),
  // title
  ...titleCues(T.title, 3),
  // act 1: Gemini, the deck, the deal; the agenda thread
  ['whoosh', T.gemIn, 0.4, 0.045], ['pop', r3(T.gemIn + 0.45), 987.77, 0.04, 0.3], ['glitter', T.deckIn, r3(T.deckIn + 0.6)],
  ...popCues(CAPS[1]),
  ['whoosh', T.deal[0], 0.4, 0.05], ['tick', T.deal[1], 0.07], ['pop', T.deal[1], 1174.66, 0.045, -0.2], ['bell', r3(T.deal[1] + 0.05), 1760, 0.03, 1.2, 0], ['glitter', T.deal[1], r3(T.deal[1] + 0.6)],
  ['whoosh', T.cardOut[0], 0.3, 0.03],
  ...popCues(CAPS[2]), ['pop', T.dateRow, 1318.51, 0.04, -0.3], ['tick', T.dateRow, 0.04],
  ['whoosh', T.phoneIn[0], 0.4, 0.04],
  ...THREAD1.map((m, i) => ['pop', m.at, m.side === 'R' ? NOTE[4] : NOTE[1] * 1.5, 0.045, m.side === 'R' ? 0.25 : -0.25]),
  ['tick', 25.3, 0.02], ['tick', 25.45, 0.02], ['tick', 25.6, 0.02],
  ['pop', T.eyeroll, 523.25, 0.03, 0.3], ['whoosh', T.phoneOut[0], 0.35, 0.03],
  // the lane: lamps flicker on, the walk, Leo
  ...captionCues(CAPS[3]),
  ...[0, 1, 2].flatMap(i => [['tick', r3(T.lampsAt + i * 0.32), 0.04], ['tick', r3(T.lampsAt + i * 0.32 + 0.18), 0.03], ['pluck', r3(T.lampsAt + i * 0.32 + 0.36), NOTE[2 + i] * 2, 0.02, 0.4, (i - 1) * 0.4]]),
  ...Array.from({ length: 14 }, (_, i) => ['tick', r3(T.walk[0] + i * 0.4), 0.015]),
  ['whoosh', T.leoIn[0], 0.4, 0.04], ['pop', T.leoIn[1], 1174.66, 0.045, 0.3], ['glitter', T.leoIn[1], r3(T.leoIn[1] + 0.5)],
  // act 2: the café
  ...popCues(CAPS[4]), ['tick', T.check, 0.06], ['pop', T.check, 1318.51, 0.035, -0.2],
  ['pop', T.laugh1, 987.77, 0.03, 0.3], ['pop', r3(T.laugh1 + 0.12), 1174.66, 0.03, 0.3], ['pop', T.laugh2, 1174.66, 0.035, 0], ['glitter', T.laugh2, r3(T.laugh2 + 0.5)],
  ...popCues(CAPS[5]), ['pop', T.goat, 880, 0.03, 0.3],
  ...T.glances.map((g, i) => ['tick', g, 0.04 + i * 0.01]),
  ...ring(T.alarm, 8), ['tom', T.alarm, 90, { gain: 0.28, decay: 0.3 }], ...popCues(CAPS[6]),
  ['whoosh', T.exit[0], 0.4, 0.04], ['pop', T.bye, 440, 0.035, 0.3], ['pop', r3(T.bye + 0.2), 392, 0.03, 0.3],
  // the bench
  ...popCues(CAPS[7]), ['whoosh', T.gemIn2[0], 0.35, 0.035], ['whoosh', T.gemOut[0], 0.35, 0.03],
  // THE STARS ADVISE
  ...adviseCues(ADVISE),
  // act 3
  ...popCues(CAPS[8]), ['tick', T.strike, 0.05], ['pop', T.poof, 1318.51, 0.04, -0.3], ['glitter', T.poof, r3(T.poof + 0.5)], ['pop', T.newRow, 1567.98, 0.035, -0.3],
  ['whoosh', T.phone3[0], 0.4, 0.04], ...THREAD3.map((m, i) => ['pop', m.at, i ? NOTE[1] * 1.5 : NOTE[4], 0.045, i ? -0.25 : 0.25]),
  ['tick', 93.3, 0.02], ['tick', 93.45, 0.02], ['tick', 93.6, 0.02], ['whoosh', T.run[0], 0.4, 0.045],
  ...popCues(CAPS[9]),
  ['riser', T.lapse[0], T.lapse[1], 0.025], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.lapse[0] + 0.25 + i * 0.5), 0.03]),
  ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.lapse[0] + 0.6 + i * 0.9), 330, 0.025, i % 2 ? 0.4 : -0.4]),
  ...popCues(CAPS[10]), ['pop', T.cardOn, 1174.66, 0.035, 0], ['glitter', T.cardOn, r3(T.cardOn + 0.5)],
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'C' }),
  // the lane tag: the last pastry
  ...captionCues(CAPS[11]), ['pop', T.lean, 880, 0.03, -0.2], ['pop', r3(T.lean + 0.05), 987.77, 0.03, 0.2],
  ['pluck', T.look, 1318.51, 0.03, 0.4, 0], ['whoosh', T.slide[0], 0.3, 0.03], ['pop', T.slide[1], 1174.66, 0.04, 0], ['bell', T.blush, 1760, 0.03, 1.2, 0], ['glitter', T.blush, r3(T.blush + 0.6)],
  // next time + the last line
  ...nextTimeCues(T.next), ...popCues(CAPS[12]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CS]: 740, [GS]: 1046.5, [LS]: 932 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
// (checks: node /tmp/…/chk.mjs mlpilot reads this)
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
