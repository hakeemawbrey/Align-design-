// mlpace — MOONLIGHT LANE, Ep 2: "Too Much, Too Soon" (120 s vertical, Star Talk, promo/films/STARTALK-EPISODES.md; pop · D).
// The show kit lives in ./mlkit.js (an unchanged copy of mlpilot's). Story 0–115.6, then the shared end card.
//   0.0–2.0    ◀◀ PREVIOUSLY ON Moonlight Lane… (three Ep 1 polaroids)
//   2.0–6.9    COLD OPEN  "One date. | *Big plans.*" (SATURDAY · 7:02 AM). ♈ Aries' plan board: TRIP ✓ JACKETS ✓ DOG ✓.
//              "I already named our dog. *Waffles.*"
//   7.0–10.0   TITLE CARD  Ep 2 · Too Much, Too Soon.
//  10.0–24.0   ACT 1  "Planned: | *everything.*" Day one a trip, day two matching jackets, day three the dog (not yet
//              acquired). "is that too much? *nah.*"
//  24.0–40.0   The café. ♍ Virgo reads the thread (GOOD MORNING!! / trip / jackets / Waffles / "(we don't have a dog
//              yet)"). Typing… stops. Typing… stops. Phone face down. "it was *one* date." ♉ Taurus: "*croissant?*"
//  40.0        card cut.
//  40.0–50.0   ACT 2  The lane at dusk. ♌ Leo's bad advice: "quiet means go *bigger.*" A 37-hour playlist goes out.
//  50.0–60.0   "The big | *gesture.*" A balloon arch builds over the lane; Virgo walks up… "this is… a *lot.*"
//  60.0–70.0   "Deflated. | *Literally.*" The arch sags, Aries sags with it. "I liked it. I just need *slower.*"
//              ♓ Pisces sobs in the window above the café.
//  70.0–90.0   ★ THE STARS ADVISE (breakdown): Match the pace · Excited is allowed · Ask, don't plan.
//  90.0–104.0  ACT 3 (lift)  "what would feel good for our next one?" → "a walk? 7 PM. one coffee." Tuesday, 7:00 PM:
//              Aries is on time, with ONE balloon. "one balloon. *perfect.*" They walk off with two coffees.
// 104.0–108.0  ★ LESSON UNLOCKED "Big feelings. | *Small steps.*" +1 PATIENCE (BARELY)
// 108.0–111.6  LANE TAG  Libra (at the flower stall): "I like people who take their time." ♏ Scorpio, rushing past
//              with a tray, overhears… and slows… way… down.
// 111.6–115.6  NEXT TIME ON Moonlight Lane… "Cancer brings a date to *family dinner.*" · last line "*Slow* is still a yes."
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, MONO, INTER, r3, pop01, outK, inR, bump, loadFonts, mixHex,
  drawLane, LANE, standY, drawSign, drawPisces, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues,
  buildNextTime, nextTimeCues, popCues, drawBubble, drawPhone, drawIcon, sparkles,
} from './mlkit.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN       // 115.6
const ARI = signStar('aries'), VIR = signStar('virgo'), LEO = signStar('leo'), TAU = signStar('taurus')
const AS = `${ARI.glyph}︎ ARIES`, VS = `${VIR.glyph}︎ VIRGO`, LS = `${LEO.glyph}︎ LEO`, TS = `${TAU.glyph}︎ TAURUS`
const ARI_C = '#ffa07a', VIR_C = '#ff9ac0', LEO_C = '#ffbe73', TAU_C = '#ffd98a'

// ── the timeline
const T = {
  prev: [0, 2.0], black: [0, 0.2],
  board: 2.15, items: [2.5, 3.0, 3.5], ticks: [2.75, 3.25, 3.75],
  title: 7.0,
  wiggle: [11.3, 14.3, 17.1], noDog: 18.4,
  cafe: 24.0, msgs: [24.6, 25.15, 25.7, 26.25, 26.9], typing: [[28.0, 28.9], [29.5, 30.2], [30.8, 31.25]], faceDown: 31.6, croissant: 36.4,
  lane: 40.0, leoOut: [49.1, 49.6], playlist: 47.9,
  arch: [50.6, 52.6], virIn: [53.2, 54.2], sag: [59.2, 61.0], pop1: 60.2,
  advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, phone: [90.25, 90.6], phoneOut: [94.5, 94.9],
  date: 95.0, virIn2: [95.9, 96.8], walk: [101.6, 104.0], coffee: 100.9,
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, scorRush: [108.1, 109.0], hear: 109.2, slow: [109.5, 111.6], libLook: 110.5,
  next: 111.7, nextOut: [115.05, 115.45],
}
const MOON = { x: 860, y: 610, r: 100 }
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Big feelings. | *Small steps.*', chip: '+1 PATIENCE (BARELY)' }

// ── the dialogue
const CPS = 28
const L0 = [{ t: 3.45, speaker: AS, color: ARI_C, text: 'I already named our dog. *Waffles.*' }]
const L1 = [
  { t: 11.2, speaker: AS, color: ARI_C, text: 'day one: a *trip.* anywhere!' },
  { t: 14.25, speaker: AS, color: ARI_C, text: 'day two: *matching jackets.*' },
  { t: 17.0, speaker: AS, color: ARI_C, text: 'day three: our dog, *Waffles.*' },
  { t: 19.95, speaker: AS, color: ARI_C, text: 'is that too much? *nah.*' },
]
const L2 = [
  { t: 33.3, speaker: VS, color: VIR_C, text: 'it was *one* date.' },
  { t: 35.4, speaker: TS, color: TAU_C, text: '*croissant?*' },
]
const L3 = [
  { t: 40.95, speaker: AS, color: ARI_C, text: 'Virgo went *quiet.* what do I do?' },
  { t: 43.95, speaker: LS, color: LEO_C, text: 'quiet means go *bigger.* obviously.' },
  { t: 46.95, speaker: AS, color: ARI_C, text: 'bigger. *got it.*' },
]
const L4 = [
  { t: 55.0, speaker: AS, color: ARI_C, text: 'SURPRISE! it’s an *arch!*' },
  { t: 57.6, speaker: VS, color: VIR_C, text: 'this is… a *lot.*' },
]
const L5 = [
  { t: 62.5, speaker: AS, color: ARI_C, text: '…oh. too *much?*' },
  { t: 65.1, speaker: VS, color: VIR_C, text: 'I liked it. I just need *slower.*' },
]
const L6 = [
  { t: 97.0, speaker: VS, color: VIR_C, text: 'one balloon. *perfect.*' },
  { t: 99.5, speaker: AS, color: ARI_C, text: 'I’m *really* glad you came.' },
]
const BOXES = [[L0, 3.25, 6.6], [L1, 11.0, 22.6], [L2, 33.1, 37.9], [L3, 40.75, 49.6], [L4, 54.8, 60.0], [L5, 62.3, 68.8], [L6, 96.8, 101.95]]
const ALL_LINES = BOXES.flatMap(b => b[0])

const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'clock', head: 'Match the *pace.*', body: 'Notice how fast they’re going, and meet them there.' },
    { at: T.cards[1], icon: 'heart', head: 'Excited is *allowed.*', body: 'Say it out loud. You don’t have to stage it.' },
    { at: T.cards[2], icon: 'question', head: 'Ask, don’t *plan.*', body: '“What would feel good for our next one?”' },
  ],
  lines: [
    { t: 71.05, text: 'Aries, this one’s *yours.*' },
    { t: 73.95, text: 'fast isn’t *wrong.* it’s just yours.' },
    { t: 77.5, text: 'say “I had *so* much fun.” that’s it.' },
    { t: 80.5, text: 'no arch required. *promise.*' },
    { t: 83.5, text: 'then ask, and *let them* shape it.' },
    { t: 86.5, text: 'their answer *is* the plan.' },
  ],
}

const CAPS = [
  { text: 'One date. | *Big plans.*', kicker: 'SATURDAY · 7:02 AM', at: 2.1, out: [6.7, 6.9], late: 2, lateAt: 2.9 },
  { text: 'Planned: | *everything.*', at: 10.35, out: [23.6, 23.85], late: 1, lateAt: 10.85 },
  { text: 'Virgo reads… | *all of it.*', kicker: 'SATURDAY · 7:03 AM', at: 24.15, out: [31.85, 32.05], late: 3, lateAt: 27.2 },
  { text: 'Virgo goes… | *quiet.*', at: 32.15, out: [39.6, 39.85], late: 1, lateAt: 32.9 },
  { text: 'Leo has | *advice.*', at: 40.3, out: [46.6, 46.8], late: 1, lateAt: 40.8 },
  { text: 'Aries doubles | *down.*', at: 46.9, out: [49.75, 49.95], late: 1, lateAt: 47.9 },
  { text: 'The big | *gesture.*', at: 50.1, out: [59.6, 59.85], late: 1, lateAt: 52.6 },
  { text: 'Deflated. | *Literally.*', at: 60.0, out: [69.3, 69.6], late: 1, lateAt: 60.9 },
  { text: 'Aries *asks.*', at: 90.3, out: [94.7, 94.9], late: 1, lateAt: 90.8 },
  { text: 'On time. | *One balloon.*', kicker: 'TUESDAY · 7:00 PM', at: 95.05, out: [101.35, 101.55], late: 2, lateAt: 95.9 },
  { text: 'A walk. | *One* coffee.', at: 101.65, out: [103.7, 103.9], late: 2, lateAt: 102.1 },
  { text: 'Scorpio | *overhears.*', kicker: 'MEANWHILE', at: 108.1, out: [111.3, 111.5], late: 1, lateAt: 109.3 },
  { text: '*Slow* is | still a yes.', at: 112.5, out: [115.05, 115.4], size: 104, late: 1, lateAt: 112.5, top: 260 },
]

// ── threads
const THREAD1 = [
  { at: T.msgs[0], side: 'L', text: 'GOOD MORNING!!' },
  { at: T.msgs[1], side: 'L', text: 'ok so for our trip' },
  { at: T.msgs[2], side: 'L', text: 'thoughts on matching jackets?' },
  { at: T.msgs[3], side: 'L', text: 'also our dog’s name is Waffles' },
  { at: T.msgs[4], side: 'L', text: '(we don’t have a dog yet)' },
]
const THREAD2 = [
  { at: 44.2, side: 'R', text: 'made us a playlist!!' },
]
const THREAD3 = [
  { at: 90.85, side: 'R', text: 'I got excited. what would feel good for our next one?' },
  { at: 92.85, side: 'L', text: 'a walk? 7 PM. one coffee.' },
]

// hops
const ARI_HOPS = [2.3, 2.7, 3.1, ...talkHops(ALL_LINES, AS, { cps: CPS }), ...T.wiggle, T.playlist, 51.0, 51.5, 52.0, 52.6, 93.1, 93.4, 93.7, 95.2, 101.0]
const VIR_HOPS = [...talkHops(ALL_LINES, VS, { cps: CPS }), T.faceDown, 96.8]
const LEO_HOPS = [40.4, ...talkHops(ALL_LINES, LS, { cps: CPS }), 47.4]

// the balloon arch (world coords, over the lane by the middle lamp)
const ARCH = (() => { const r = rng(12), C = ['#ff6b8a', '#ffd36e', '#7fe0ff', '#c9a6ff', '#ff9a5a', '#7dffb0'], n = 22; return Array.from({ length: n }, (_, i) => ({ u: i / (n - 1), c: C[i % C.length], j: r() * 10 - 5, at: T.arch[0] + (i / (n - 1)) * (T.arch[1] - T.arch[0]) + r() * 0.08 })) })()
function balloon(c, X, Y, R, col, alpha = 1, droop = 0) {
  const s = Math.max(2, Math.round(R / 5)), rows = ['..KKKK..', '.KCCCCK.', 'KCWCCCCK', 'KCWCCCCK', 'KCCCCCCK', '.KCCCCK.', '..KCCK..', '...KK...']
  c.save(); c.globalAlpha *= alpha; c.translate(Math.round(X - 4 * s), Math.round(Y - 4 * s)); c.scale(s, s * (1 + droop * 0.25))
  rows.forEach((row, j) => { for (let i = 0; i < 8; i++) { const k = row[i]; if (k === '.') continue; c.fillStyle = k === 'K' ? INK : k === 'W' ? '#ffffff' : col; c.fillRect(i, j, 1.02, 1.02) } })
  c.fillStyle = INK; c.fillRect(4, 8, 0.5, 3 + droop * 3)
  c.restore()
}

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '700 30px Inter', '600 28px Inter'])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'Cancer brings a date to *family dinner.*' })
  const title = buildTitle(root, { ep: 2, title: 'Too Much, Too Soon', at: T.title, len: 3 })
  // PREVIOUSLY: three Ep 1 moments, drawn once with the kit
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0], stills: [
    { caption: 'A hard stop.', crop: [80, 900, 920, 1085], scene: c => { drawCafe(c, 50, {}); drawSign(c, 'capricorn', S0.x, standY(220, S0.y), 220, 50, { mood: 'wide', look: [0, -1] }); drawSign(c, 'leo', S1.x, standY(230, S1.y), 230, 50, { mood: 'wide' }); drawCafeTable(c, 50, {}); drawBubble(c, 330, 1030, 'BZZT · 8:30', { size: 38, col: '#ff7a7a' }) } },
    { caption: 'Regret, on the bench.', crop: [200, 700, 920, 1085], scene: c => drawLane(c, 64, { time: 'late', pan: 640 }, w => { drawSign(w, 'capricorn', LANE.bench.seats[0], standY(220, LANE.bench.seatY), 220, 64, { mood: 'squint', look: [0, 1], squash: 0.08 }); drawPisces(w, LANE.pisces.x, LANE.pisces.y + 8, 104, 64, { tears: 3 }) }) },
    { caption: 'Then: overtime.', crop: [80, 900, 920, 1085], scene: c => { drawCafe(c, 102, { chairsUp: 1, lights: 0.7, view: 'late' }); drawSign(c, 'capricorn', S0.x, standY(220, S0.y), 220, 102, { mood: 'heart', blush: 0.9 }); drawSign(c, 'leo', S1.x, standY(230, S1.y), 230, 102, { mood: 'happy' }); drawCafeTable(c, 102, { pastry: 'croissant' }) } },
  ] })
  const bug = showBug(root, 2, { at: T.prev[1] })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── props
  function pin(X, Y) { x.fillStyle = INK; x.fillRect(X - 7, Y - 7, 14, 14); x.fillStyle = '#e8566e'; x.fillRect(X - 5, Y - 5, 10, 10); x.fillStyle = '#ffffff'; x.fillRect(X - 3, Y - 3, 3, 3) }
  function card(X, Y, W, H, rot, k, fn) {
    if (k <= 0.01) return
    x.save(); x.translate(X, Y); x.rotate(rot); x.scale(k, k)
    x.fillStyle = 'rgba(10,6,24,0.45)'; x.fillRect(-W / 2 + 10, -H / 2 + 12, W, H)
    x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10); x.fillStyle = '#fbf3e2'; x.fillRect(-W / 2, -H / 2, W, H)
    fn(W, H); pin(0, -H / 2 + 4); x.restore()
  }
  function label(s, X, Y, size = 24, col = INK) { x.fillStyle = col; x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
  function jacket(X, Y, s, col) {
    x.save(); x.translate(X, Y); x.scale(s, s)
    x.fillStyle = INK; x.fillRect(-26, -26, 52, 56); x.fillRect(-40, -22, 14, 40); x.fillRect(26, -22, 14, 40)
    x.fillStyle = col; x.fillRect(-23, -23, 46, 50); x.fillRect(-37, -19, 10, 34); x.fillRect(27, -19, 10, 34)
    x.fillStyle = INK; x.fillRect(-2, -23, 4, 50); x.fillStyle = '#ffd36e'; x.fillRect(-14, -6, 8, 8)
    x.restore()
  }
  function board(t) {
    const k = pop01(t, T.board, 0.4, 1.6)
    if (k <= 0.01) return
    x.save(); x.translate(700, 830); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-330, -330, 660, 640); x.fillStyle = '#b07a4a'; x.fillRect(-320, -320, 640, 620)
    const r = rng(2); x.fillStyle = '#9a6a3e'; for (let i = 0; i < 90; i++) x.fillRect(-310 + r() * 620, -310 + r() * 600, 6, 6)
    label('THE PLAN', 0, -282, 34, '#fff6e8')
    x.restore()
    const wig = i => 0.06 * Math.sin((t - T.wiggle[i]) * 18) * bump(t, T.wiggle[i], 0.9)
    const big = i => 1 + 0.12 * bump(t, T.wiggle[i], 0.9)
    // 1 · the trip (a postcard: sun, sea, a tiny heart; no place named)
    card(560, 670, 250, 170, -0.07 + wig(0), pop01(t, T.items[0], 0.3, 2.2) * k * big(0), (W, H) => {
      x.fillStyle = '#7fd0f0'; x.fillRect(-W / 2 + 12, -H / 2 + 14, W - 24, 70); x.fillStyle = '#3f7cf0'; x.fillRect(-W / 2 + 12, -H / 2 + 70, W - 24, 24)
      x.fillStyle = '#ffd36e'; x.fillRect(40, -H / 2 + 26, 30, 30); x.fillStyle = '#ffe9a8'; x.fillRect(-W / 2 + 12, -H / 2 + 94, W - 24, 10)
      label('A TRIP!', 0, 42, 26); label('(somewhere)', 0, 68, 18, '#8a6a4a')
    })
    // 2 · matching jackets
    card(850, 680, 230, 180, 0.06 + wig(1), pop01(t, T.items[1], 0.3, 2.2) * k * big(1), (W, H) => { jacket(-45, -10, 1.05, '#f0603a'); jacket(45, -10, 1.05, '#ef5c94'); label('MATCHING', 0, 64, 22) })
    // 3 · the dog: a bed with a name tag… and no dog
    card(700, 970, 300, 200, -0.03 + wig(2), pop01(t, T.items[2], 0.3, 2.2) * k * big(2), (W, H) => {
      x.fillStyle = INK; x.fillRect(-90, -30, 180, 60); x.fillStyle = '#c05a6a'; x.fillRect(-84, -24, 168, 48); x.fillStyle = '#e8909a'; x.fillRect(-66, -14, 132, 26)
      label('WAFFLES', 0, -56, 30, '#c2306a'); label(t > T.noDog ? 'dog: not yet acquired' : 'our dog', 0, 66, 20, '#8a6a4a')
    })
    // ticks
    T.ticks.forEach((tt, i) => { const kk = pop01(t, tt, 0.25, 2.4); if (kk > 0.01) drawIcon(x, 'check', [650, 940, 820][i] - 20 * kk, [590, 600, 900][i] - 20 * kk, 4 * kk) })
  }
  function playlistCard(t) {
    const k = pop01(t, T.playlist, 0.35, 2) * outK(t, [49.6, 49.85])
    if (k <= 0.01) return
    x.save(); x.translate(720, 860); x.rotate(0.04); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-200, -120, 400, 240); x.fillStyle = '#2a1d5a'; x.fillRect(-194, -114, 388, 228)
    x.fillStyle = '#ff6b8a'; x.fillRect(-170, -90, 120, 120); drawIcon(x, 'heart', -150, -66, 9)
    x.fillStyle = BONE; x.font = `800 34px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('US (vol. 1–6)', -30, -60)
    x.font = `700 22px ${MONO}`; x.fillStyle = ML_GOLD; x.fillText('412 SONGS', -30, -16); x.fillText('37 HRS 12 MIN', -30, 14)
    x.fillStyle = '#5a4a8a'; x.fillRect(-170, 66, 340, 10); x.fillStyle = ML_GOLD; x.fillRect(-170, 66, 340 * ((t - T.playlist) * 0.02 % 1), 10)
    x.restore()
  }

  // ── scenes
  function apartment(t) {
    drawApartment(x, t, { time: 'dusk', lamp: 0.7 })
    board(t)
    let m = 'sparkle', l = [1, -1]
    if (t > 3.4 && t < 6) { m = 'happy'; l = undefined }
    if (t > 10) { m = 'sparkle'; l = [1, -1] }
    if (inR(t, 17.0, 19.9)) { m = 'heart'; l = undefined }
    if (inR(t, 19.95, 21.0)) { m = 'neutral'; l = [0, 0] }
    if (t > 21.0) { m = 'happy'; l = undefined }
    drawSign(x, 'aries', 250, standY(250, 1440), 250, t, { mood: m, look: l, hops: ARI_HOPS, seed: 3, pop: pop01(t, 2.05, 0.4, 1.8) })
    sparkles(x, t, 700, 830, T.board + 0.1, 12, 300, 2)
  }
  function cafeRead(t) {
    drawCafe(x, t, { behind: c => drawSign(c, 'taurus', CAFE.counter.x, standY(200, CAFE.counter.y), 200, t, { mood: t > 35.3 ? 'happy' : 'neutral', look: [-1, 1], seed: 9, hops: talkHops(ALL_LINES, TS, { cps: CPS }) }) })
    drawPisces(x, 560, standY(110, 1250), 110, t, { tears: t > 31.6 ? 3 : 2, look: [1, 0], pull: bump(t, 33.6, 0.5) })
    let m = 'neutral', l = [-1, -1]
    if (t > T.msgs[2]) { m = 'wide'; l = [-1, -1] }
    if (t > T.faceDown) { m = 'squint'; l = [0, 1] }
    if (t > 33.3 && t < 34.5) { m = 'neutral'; l = [0, 0] }
    if (t > 35.4) { m = 'happy'; l = [1, -1] }
    drawSign(x, 'virgo', S1x, standY(230, CAFE.seats[1].y), 230, t, { mood: m, look: l, hops: VIR_HOPS, seed: 4, blink: m === 'wide' ? false : undefined })
    drawCafeTable(x, t, { cups: 1, pastry: t > T.croissant ? 'croissant' : null })
    sparkles(x, t, 540, 1300, T.croissant, 8, 110, 3)
    // the phone: her thread; three typing attempts, then face down
    const fd = ease.inOutCubic(prog(t, T.faceDown, T.faceDown + 0.4))
    if (fd < 1) {
      const pin2 = ease.outBack(prog(t, T.cafe, T.cafe + 0.4))
      const typingNow = T.typing.find(([a, b]) => t >= a && t < b)
      drawPhone(x, 300, 820 + (1 - pin2) * 1000 + fd * 900, 400, 620, t, { title: '♈︎ Aries', msgs: THREAD1, typing: null, alpha: 1 - fd * 0.6 })
      if (typingNow) { const by = 820 + 310 - 70; x.fillStyle = ML_GOLD; x.fillRect(300 + 200 - 32 - 110, by, 110, 50); for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.globalAlpha = 0.4 + 0.6 * (Math.floor(t * 6) % 3 === i ? 1 : 0); x.fillRect(300 + 200 - 32 - 90 + i * 26, by + 20, 12, 12) } x.globalAlpha = 1 }
      T.typing.forEach(([a, b], i) => { const k = pop01(t, b, 0.2, 2) * outK(t, [b + 0.6, b + 0.75]); drawBubble(x, 420, 470, ['…', '…nope', '…nope.'][i], { size: 28, k, tail: null }) })
    } else {
      x.fillStyle = INK; x.fillRect(600, 1312, 120, 14); x.fillStyle = '#2a2050'; x.fillRect(604, 1314, 112, 8)
    }
  }
  const S1x = CAFE.seats[1].x

  function laneScene(t) {
    // 40–70: Leo's advice → the arch → the sag
    const pan = lerp(300, 540, ease.inOutCubic(prog(t, 49.6, 50.6)))
    const sag = ease.inOutCubic(prog(t, ...T.sag))
    drawLane(x, t, { moon: MOON, time: 'dusk', pan, lampsAt: 50.2 }, c => {
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: t > 57.8 ? 3 : 2, look: [1, 1], pull: bump(t, 58.0, 0.5) + bump(t, 66.5, 0.5) })
      // the arch, balloon by balloon; it sags at the low point
      if (t > T.arch[0]) for (const b of ARCH) {
        if (t < b.at) continue
        const k = pop01(t, b.at, 0.25, 2.4)
        const ax = lerp(860, 1440, b.u), ay = 1390 - Math.sin(Math.PI * b.u) * lerp(420, 140, sag) - (1 - Math.sin(Math.PI * b.u)) * 0 + b.j + sag * 20 * Math.sin(b.u * 9 + t)
        if (t > T.pop1 && Math.abs(b.u - 0.5) < 0.03) continue          // one balloon pops
        balloon(c, ax, ay, 30 * k, sag > 0 ? mixHex(b.c, '#6a6488', sag * 0.45) : b.c, 1, sag)
      }
      sparkles(c, t, 1150, 980, T.pop1, 8, 90, 4, ['#ff6b8a', BONE])
      // Aries
      let m = 'happy', l = [1, 0], sq = 0
      if (t < 50) { m = t > 46.95 ? 'sparkle' : 'neutral'; l = t < 43.9 ? [1, 0] : [1, -1] }
      else if (t < 57.6) { m = 'sparkle'; l = [1, 0] }
      else if (t < T.sag[0]) { m = 'wide'; l = [1, 0] }
      else { m = 'neutral'; l = [1, 1]; sq = 0.22 * sag }
      if (t > 65.1 && t > 66.6) { m = 'neutral'; l = [1, 0] }
      const ax0 = t < 50 ? 700 : 1100
      drawSign(c, 'aries', ax0, standY(240 * (1 - 0.12 * sag)), 240 * (1 - 0.12 * sag), t, { mood: m, look: l, squash: sq, hops: ARI_HOPS, seed: 3 })
      // Leo (40–49.6)
      if (t < T.leoOut[1]) {
        const o = ease.inCubic(prog(t, ...T.leoOut))
        drawSign(c, 'leo', 940 + o * 700, standY(230), 230, t, { mood: t > 43.9 ? 'wink' : 'happy', look: [-1, 0], hops: LEO_HOPS, seed: 7 })
      }
      // Virgo walks up
      if (t > T.virIn[0]) {
        const p = ease.outCubic(prog(t, ...T.virIn))
        let vm = 'wide', vl = [-1, -1]
        if (t > 57.6) { vm = 'neutral'; vl = [-1, 0] }
        if (t > 65.1) { vm = 'happy'; vl = [-1, 0] }
        drawSign(c, 'virgo', lerp(1700, 1420, p), standY(230), 230, t, { mood: vm, look: vl, hops: [...VIR_HOPS, ...Array.from({ length: 3 }, (_, i) => T.virIn[0] + i * 0.33)], seed: 4, blink: vm === 'wide' ? false : undefined })
      }
    })
    // Aries' phone → the playlist
    if (inR(t, 43.9, 49.9)) {
      const pin2 = ease.outBack(prog(t, 43.9, 44.2)), po = ease.inCubic(prog(t, 49.5, 49.9))
      drawPhone(x, 300, 850 + (1 - pin2) * 1100 + po * 1100, 360, 520, t, { title: '♍︎ Virgo', msgs: THREAD2 })
    }
    playlistCard(t)
    if (t > T.sag[0]) { const k = pop01(t, T.sag[0] + 0.2, 0.3, 2) * outK(t, [62.2, 62.4]); drawBubble(x, 560, 760, 'pfffffff…', { size: 34, k, tail: null, col: '#d8d0e8' }) }
  }

  function act3(t) {
    if (t < T.date) {
      drawLane(x, t, { moon: MOON, time: 'night', pan: 640 }, c => {
        drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: t > 93 ? 3 : 2, look: [1, 1] })
        let m = 'neutral', l = [1, -1]
        if (t > THREAD3[1].at) { m = 'heart'; l = undefined }
        drawSign(c, 'aries', LANE.bench.seats[0], standY(230, LANE.bench.seatY), 230, t, { mood: m, look: l, hops: ARI_HOPS, seed: 3 })
      })
      const pin2 = ease.outBack(prog(t, ...T.phone)), po = ease.inCubic(prog(t, ...T.phoneOut))
      drawPhone(x, 700, 860 + (1 - pin2) * 1100 + po * 1100, 420, 600, t, { title: '♍︎ Virgo', msgs: THREAD3, typing: [91.9, 92.85] })
      return
    }
    // Tuesday, 7:00 PM: on time, one balloon; then the walk
    const walk = ease.inOutQuad(prog(t, ...T.walk))
    drawLane(x, t, { moon: MOON, time: 'night', pan: lerp(560, 300, walk) }, c => {
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 3, look: [1, 1], pull: bump(t, 97.5, 0.5) })
      const ax = 1000 - walk * 380, vx = (t < T.virIn2[1] ? lerp(1700, 1180, ease.outCubic(prog(t, ...T.virIn2))) : 1180) - walk * 380
      balloon(c, ax + 70, standY(230) - 230 + 8 * Math.sin(t * 2), 34, '#ff6b8a', 1, 0)
      c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(ax + 70, standY(230) - 190); c.lineTo(ax + 60, standY(230) + 10); c.stroke()
      let am = 'happy', al = [1, 0]
      if (t < T.virIn2[0]) { am = 'neutral'; al = [1, 0] }
      if (t > 99.5) am = 'sparkle'
      const steps = walk > 0 && walk < 1 ? Array.from({ length: 6 }, (_, i) => T.walk[0] + i * 0.42) : []
      drawSign(c, 'aries', ax, standY(230), 230, t, { mood: am, look: al, hops: [...ARI_HOPS, ...steps], seed: 3 })
      if (t > T.virIn2[0]) drawSign(c, 'virgo', vx, standY(230), 230, t, { mood: t > 97 ? 'happy' : 'sparkle', look: [-1, 0], hops: [...VIR_HOPS, ...steps.map(s => s + 0.1)], seed: 4, blush: 0.9 })
      // two coffees from Taurus at the café door
      if (t > T.coffee) {
        drawSign(c, 'taurus', 630, standY(190), 190, t, { mood: 'happy', look: [1, 0], seed: 9, pop: pop01(t, T.coffee - 0.4, 0.3, 2) * outK(t, [103.0, 103.4]) })
        for (const [cx0, d] of [[ax, -1], [vx, 1]]) { const k = pop01(t, T.coffee + 0.3, 0.3, 2); c.save(); c.translate(cx0 + d * 95, standY(230) + 40); c.scale(k, k); c.fillStyle = INK; c.fillRect(-16, -22, 32, 40); c.fillStyle = '#fff8ec'; c.fillRect(-12, -18, 24, 32); c.fillStyle = '#c0703a'; c.fillRect(-12, -6, 24, 10); c.restore() }
      }
    })
    const ck = pop01(t, T.date + 0.1, 0.3, 2) * outK(t, [T.virIn2[0], T.virIn2[0] + 0.2])
    drawBubble(x, 540, 900, '7:00 PM. on the dot.', { size: 30, k: ck, tail: null, col: ML_GOLD })
  }

  function tag(t) {
    drawLane(x, t, { moon: MOON, time: 'night', pan: 1080 }, c => {
      drawSign(c, 'libra', LANE.stall.x - 60, standY(220), 220, t, { mood: t > T.libLook ? 'happy' : 'sparkle', look: t > T.libLook ? [-1, 0] : [1, 0], seed: 10, blush: t > T.libLook ? 0.9 : undefined, hops: [108.4, 108.8, T.libLook + 0.1] })
      drawPisces(c, LANE.stall.x + 130, standY(130), 130, t, { tears: 2, look: [-1, -1], box: false })
      // Scorpio: rushing with a tray… hears… slows… way… down
      const rush = prog(t, ...T.scorRush), slowP = prog(t, ...T.slow)
      const sx = t < T.hear ? lerp(1100, 1430, rush) : lerp(1430 + 330 * (T.hear - T.scorRush[0]) / 0.9 * 0 + 0, 1520, slowP)
      const hop = t < T.hear ? Array.from({ length: 6 }, (_, i) => T.scorRush[0] + i * 0.16) : [109.6, 110.5, 111.4]
      drawSign(c, 'scorpio', sx, standY(210), 210, t, { mood: t > T.hear ? 'wide' : 'neutral', look: t > T.hear ? [1, -1] : [1, 0], seed: 11, hops: hop, squash: t > T.hear ? -0.06 : 0.04, blink: t > T.hear ? false : undefined, blush: t > T.libLook ? 0.9 : undefined })
      // the tray of pastries
      c.fillStyle = INK; c.fillRect(sx - 80, standY(210) - 150, 160, 14); c.fillStyle = '#c0c0d0'; c.fillRect(sx - 76, standY(210) - 148, 152, 8)
      for (let i = 0; i < 3; i++) { c.fillStyle = '#e0963a'; c.fillRect(sx - 60 + i * 44, standY(210) - 170, 34, 20) }
      if (t < T.hear) for (let i = 0; i < 3; i++) { c.fillStyle = 'rgba(239,230,214,0.7)'; c.fillRect(sx - 160 - i * 30, standY(210) - 60 + i * 40, 60, 6) }
    })
    drawBubble(x, 760, 900, 'I like people who take their time.', { size: 28, k: pop01(t, 108.35, 0.25, 2) * outK(t, [111.3, 111.5]), tail: 'down' })
    const sk = pop01(t, T.slow[0] + 0.2, 0.25, 2) * outK(t, [111.3, 111.5])
    drawBubble(x, 420, 1120, '( s l o w l y )', { size: 26, k: sk, tail: null, col: '#ffd2e0' })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.prev[1]) drawSky(x, t, SKY_H)
      else if (t < T.cafe) apartment(t)
      else if (t < T.lane) cafeRead(t)
      else if (t < T.advise + 0.7) laneScene(t)
      else if (t < T.act3) drawSky(x, t, SKY_H)
      else if (t < T.lesson) act3(t)
      else if (t < T.tag) act3(T.lesson - 0.01 + (t - T.lesson) * 0)
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
      prev.update(t)
      next.update(t)
      title.update(t)
      bug.update(t, title.on(t) || prev.on(t) ? 0 : outK(t, T.nextOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx plays the middle one: 40.0, the café → the lane)
const CUTS = [24.0, 40.0, 95.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const CUES = [
  ...previouslyCues(T.prev[0], 3, T.prev[1] - T.prev[0]),
  // cold open: the plan board
  ...captionCues(CAPS[0]), ['pop', T.board, 659.25, 0.04, 0], ['glitter', T.board, r3(T.board + 0.5)],
  ...T.items.map((a, i) => ['pop', a, NOTE[2 + i * 2], 0.04, (i - 1) * 0.3]), ...T.ticks.map((a, i) => ['pluck', a, NOTE[3 + i] * 2, 0.03, 0.4, (i - 1) * 0.3]),
  ...titleCues(T.title, 3),
  // act 1
  ...popCues(CAPS[1]), ...T.wiggle.map((w, i) => ['pop', w, NOTE[i * 2 + 1], 0.035, (i - 1) * 0.3]), ['pop', T.noDog, 392, 0.03, 0.3],
  ...captionCues(CAPS[2]), ['whoosh', T.cafe, 0.4, 0.04],
  ...THREAD1.map((m, i) => ['pop', m.at, NOTE[i % 7] * 1.5, 0.04, -0.25]),
  ...T.typing.flatMap(([a, b]) => [['tick', a, 0.02], ['tick', r3(a + 0.15), 0.02], ['pop', b, 330, 0.03, 0.2]]),
  ...popCues(CAPS[3]), ['tick', T.faceDown + 0.35, 0.06], ['pop', T.croissant, 1174.66, 0.035, 0.3], ['glitter', T.croissant, r3(T.croissant + 0.4)],
  // act 2: Leo, the playlist, the arch, the sag
  ...popCues(CAPS[4]), ['whoosh', T.leoOut[0], 0.35, 0.03],
  ['pop', THREAD2[0].at, NOTE[4], 0.04, 0.25], ...popCues(CAPS[5]), ['pop', T.playlist, 1318.51, 0.04, 0], ['glitter', T.playlist, r3(T.playlist + 0.5)],
  ...popCues(CAPS[6]), ...ARCH.map((b, i) => ['pop', r3(b.at), NOTE[i % 7] * (i % 2 ? 1 : 1.5), 0.022, +(b.u - 0.5).toFixed(2)]),
  ['bell', T.arch[1], 1760, 0.035, 1.2, 0], ['glitter', T.arch[1], r3(T.arch[1] + 0.8)],
  ...Array.from({ length: 3 }, (_, i) => ['tick', r3(T.virIn[0] + i * 0.33), 0.02]),
  ['riser', 58.6, T.sag[0], 0.02],
  ...[880, 830.6, 783.99, 698.46].map((f, i) => ['pluck', r3(T.sag[0] + i * 0.42), f / 2, 0.04, 0.9, 0]),
  ['pop', T.pop1, 220, 0.07, 0], ['tick', T.pop1, 0.07],
  ...popCues(CAPS[7]),
  // THE STARS ADVISE
  ...adviseCues(ADVISE),
  // act 3
  ...popCues(CAPS[8]), ['whoosh', T.phone[0], 0.4, 0.04], ...THREAD3.map((m, i) => ['pop', m.at, i ? NOTE[1] * 1.5 : NOTE[4], 0.045, i ? -0.25 : 0.25]),
  ['tick', 92.0, 0.02], ['tick', 92.15, 0.02], ['tick', 92.3, 0.02], ['bell', r3(THREAD3[1].at + 0.1), 1760, 0.03, 1.0, 0],
  ...captionCues(CAPS[9]), ['pop', r3(T.date + 0.1), 987.77, 0.035, 0], ['whoosh', T.virIn2[0], 0.35, 0.035],
  ['pop', T.coffee, 880, 0.03, -0.2], ['pop', r3(T.coffee + 0.3), 1174.66, 0.035, 0], ...popCues(CAPS[10]),
  ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.walk[0] + i * 0.42), 0.015]),
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'D' }),
  // the tag: Scorpio slows down
  ...captionCues(CAPS[11]), ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.scorRush[0] + i * 0.16), 0.02]),
  ['pop', 108.35, 880, 0.03, 0.3], ['tapeStop', T.hear, 0.6], ['pluck', r3(T.hear + 0.05), 1318.51, 0.03, 0.6, -0.2],
  ...[109.6, 110.5, 111.4].map(h => ['tom', h, 70, { gain: 0.12, decay: 0.4 }]), ['bell', T.libLook, 1760, 0.025, 1.0, 0.3],
  // next time + the last line
  ...nextTimeCues(T.next), ...popCues(CAPS[12]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [AS]: 1046.5, [VS]: 880, [LS]: 932, [TS]: 659.25 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
