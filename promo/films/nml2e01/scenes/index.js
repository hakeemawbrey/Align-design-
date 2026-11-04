// nml2e01 — MOONLIGHT LANE, Ep 1: "First Snow" (Season 2: Winter on the Lane; 120 s vertical, star_advice; dreamy · E).
// Rows: promo/films/next30/b19.md. Show kit: ../../mlpilot/scenes/mlkit.js (read-only). Winter add-ons: ./winter.js.
//   0.0–6.9    COLD OPEN  "First snow. | *First feelings?*" (SATURDAY · 6:12 PM). The first flakes; ♐ Sagittarius hops to
//              catch them, "first snow! make a *wish!*"; ♋ Cancer looks over… heart eyes. "…oh no."
//   7.0–10.0   TITLE CARD  Ep 1 · First Snow.
//  10.0–17.5   ACT 1  Cancer's wall: four polaroids, a year of Saturdays. "Best friends. | *One whole year.*"
//  17.5–30.0   The café: ♊ Gemini deals a talk card from tonight's deck, "Who do you tell first when something good
//              happens?" Through the window, Sagittarius is building a snow-star. "…Sagittarius." "Oh. | *Oh no.*"
//  30.0–40.0   The lane: Sag builds; Cancer peeks from the window above the bench and ducks.
//  40.0        card cut.
//  40.0–48.0   ACT 2  "Cancer goes | *sideways.*" "snow-star, round two?" "can't! busy!" (under a blanket).
//  48.0–56.0   The hiding era: behind the flower cart, behind a lamp post ("…Cancer? I can *see* you.").
//  56.0–62.0   The café: hiding behind a croissant (♉ Taurus). ♌ Leo's bad advice: "ignore them for a week."
//  62.0–70.0   The bench, late: Sag alone with half a snow-star. "did I do something?" "…no. *I* did."
//  70.0–90.0   ★ THE STARS ADVISE: Feelings aren't an emergency · Don't vanish on a friend · Say the small true thing.
//  90.0–104.0  ACT 3  Cancer crosses to the bench. "sorry I went quiet. I *missed* you today." "me too. help me with
//              the *points?*" The snow-star gets its five points and its lights.
// 104.0–108.0  ★ LESSON UNLOCKED "Notice it. | *Don't vanish.*" +1 SNOW-STAR (FIVE POINTS)
// 108.0–111.6  LANE TAG  ♏ Scorpio sets a cocoa on ♎ Libra's snowy flower cart. "One year. | Still *for you.*"
// 111.6–115.6  NEXT TIME ON Moonlight Lane… "The holiday market *opens.*" · last line "*Notice* it. | Then show up."
// ♓ Pisces cries in the window above the café (and at the café's back table). Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, MONO, r3, pop01, outK, inR, bump, loadFonts,
  drawLane, LANE, standY, drawSign, drawPisces, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildAdvise, adviseCues, buildNextTime, nextTimeCues, popCues,
  drawBubble, drawPhone, drawPastry, sparkles,
} from '../../mlpilot/scenes/mlkit.js'
import { snowfall, laneSnow, windowSnow, worn, actor, key, drawSnowStar, drawTalkCard, drawMug, drawBlanket } from './winter.js'

export const DURATION = 118
const STORY_END = DURATION - ENDCARD_SHORT_LEN       // 115.6
const SS = signStar
const lab = (s, n) => `${SS(s).glyph}︎ ${n}`
const CS = lab('cancer', 'CANCER'), GS = lab('sagittarius', 'SAGITTARIUS'), GE = lab('gemini', 'GEMINI'), TS = lab('taurus', 'TAURUS'), LS = lab('leo', 'LEO')
const CAN_C = '#8fd8ff', SAG_C = '#d2b0ff', GEM_C = '#ffe27a', TAU_C = '#ffd98a', LEO_C = '#ffbe73'
// wear: Cancer's pink beanie, Sagittarius' gold scarf (the scarf that matters in Ep 2–3)
export const CAN_W = { hat: '#ff8fb1' }, SAG_W = { scarf: '#ffd36e' }

// ── the timeline
const T = {
  title: 7.0,
  apt: 10.0, polar: [10.9, 11.35, 11.8, 12.25],
  cafe: 17.5, fan: 18.3, deal: [19.4, 20.1], flipAt: 20.1, realise: 26.9, cardOut: [29.4, 29.8],
  lane1: 30.0, duck: 37.6,
  apt2: 40.0, typing: [42.1, 42.9],
  hide: 48.0, lampAt: 51.6, see: 53.4, run: [54.6, 55.6],
  cafe2: 56.0, croissantUp: 56.15,
  bench: 62.0,
  advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, walk: [90.4, 92.2], up: 98.5, build: [99.0, 101.6], lit: 101.9,
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, set: [108.5, 109.3], blush: 109.7,
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Notice it. | *Don’t vanish.*', chip: '+1 SNOW-STAR (FIVE POINTS)' }

// ── the dialogue
const CPS = 28
const L0 = [
  { t: 1.0, speaker: GS, color: SAG_C, text: 'first snow! make a *wish!*' },
  { t: 4.35, speaker: CS, color: CAN_C, text: '…oh *no.*' },
]
const L1 = [{ t: 13.4, speaker: CS, color: CAN_C, text: 'same café. same walk home. every *saturday.*' }]
const L2 = [
  { t: 21.2, speaker: GE, color: GEM_C, text: 'easy one. Cancer, *go.*' },
  { t: 23.1, speaker: CS, color: CAN_C, text: 'oh that’s easy. it’s…' },
  { t: 25.2, speaker: CS, color: CAN_C, text: '…*Sagittarius.*' },
]
const L3 = [
  { t: 32.6, speaker: GS, color: SAG_C, text: 'Cancer! it needs *points!* come help!' },
  { t: 35.7, speaker: CS, color: CAN_C, text: '(why is my heart doing *that?*)' },
]
const L4 = [
  { t: 56.4, speaker: TS, color: TAU_C, text: 'hon. you’re hiding behind a *croissant.*' },
  { t: 59.1, speaker: LS, color: LEO_C, text: 'ignore them for a week. *mysterious.*' },
]
const L5 = [
  { t: 63.4, speaker: GS, color: SAG_C, text: 'did I do something?' },
  { t: 66.5, speaker: CS, color: CAN_C, text: '…no. *I* did.' },
]
const L6 = [
  { t: 92.6, speaker: CS, color: CAN_C, text: 'sorry I went quiet. I *missed* you today.' },
  { t: 95.7, speaker: GS, color: SAG_C, text: 'me too. help me with the *points?*' },
]
const BOXES = [[L0, 0.8, 6.6], [L1, 13.2, 17.3], [L2, 21.0, 29.3], [L3, 32.4, 39.5], [L4, 56.2, 61.85], [L5, 63.2, 69.5], [L6, 92.4, 98.4]]
const ALL_LINES = BOXES.flatMap(b => b[0])

const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'heart', head: 'Feelings aren’t an *emergency.*', body: 'You don’t have to act on it tonight. Notice it first.' },
    { at: T.cards[1], icon: 'door', head: 'Don’t *vanish* on a friend.', body: 'Hiding hurts them too. Keep showing up as you.' },
    { at: T.cards[2], icon: 'chat', head: 'Say the small *true* thing.', body: '“Sorry I went quiet. I missed you today.”' },
  ],
  lines: [
    { t: 71.05, text: 'Cancer, this one’s *yours.*' },
    { t: 73.95, text: 'a crush on a friend? *normal.* breathe.' },
    { t: 77.5, text: 'quiet feels safe. to them, it feels *cold.*' },
    { t: 80.4, text: 'show up the way you *always* do.' },
    { t: 83.5, text: 'no big speech. one *true* line.' },
    { t: 86.5, text: 'then go help with the *points.*' },
  ],
}

// ── captions
const CAPS = [
  { text: 'First snow. | *First feelings?*', kicker: 'SATURDAY · 6:12 PM', at: -1.2, out: [6.65, 6.9], late: 2, lateAt: -0.8, size: 92 },
  { text: 'Best friends. | *One whole year.*', at: 10.2, out: [17.2, 17.45], late: 3, lateAt: 10.8 },
  { text: 'Tonight’s deck: | a *talk card.*', at: 17.7, out: [26.5, 26.7], late: 2, lateAt: 18.3 },
  { text: 'Oh. | *Oh no.*', at: 26.9, out: [29.5, 29.75], size: 110, late: 2, lateAt: 27.3 },
  { text: 'Best friend. | *Big feelings.*', at: 30.2, out: [39.6, 39.85], late: 2, lateAt: 30.8 },
  { text: 'Cancer goes | *sideways.*', at: 40.25, out: [47.7, 47.95], late: 1, lateAt: 40.85 },
  { text: 'The *hiding* | era.', at: 48.15, out: [55.6, 55.85], late: 0 },
  { text: 'Half a | *snow-star.*', kicker: 'SUNDAY · 11:40 PM', at: 62.15, out: [69.35, 69.6], late: 1, lateAt: 62.9 },
  { text: 'One small | *true thing.*', at: 90.25, out: [94.6, 94.85], late: 2, lateAt: 90.85 },
  { text: 'Five points. | *Together.*', at: 98.7, out: [103.65, 103.85], late: 1, lateAt: 99.3 },
  { text: 'One year. | Still *for you.*', kicker: 'MEANWHILE', at: 108.15, out: [111.3, 111.5], late: 2, lateAt: 108.7 },
  { text: '*Notice* it. | Then show up.', at: 112.5, out: [115.05, 115.4], size: 100, late: 0, top: 300 },
]

// ── phone thread (Act 2)
const THREAD = [
  { at: 41.2, side: 'L', text: 'snow-star, round two?' },
  { at: 43.0, side: 'R', text: 'can’t! busy!' },
  { at: 45.6, side: 'L', text: 'oh ok! next time :)' },
]

const CAN_HOPS = talkHops(ALL_LINES, CS, { cps: CPS }), SAG_HOPS = talkHops(ALL_LINES, GS, { cps: CPS })

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '700 30px Inter', "italic 600 40px 'EB Garamond'"])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'The holiday market *opens.*' })
  const title = buildTitle(root, { ep: 1, title: 'First Snow', at: T.title, len: 3 })
  const bug = showBug(root, 1, { at: -1 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // the snow on the ground deepens through the episode
  const depthAt = t => key(t, [[0, 0.22], [30, 0.4], [48, 0.55], [62, 0.7], [90, 0.8], [108, 0.9]], ease.linear)

  // ── the cold open: the first flakes
  function coldOpen(t) {
    drawLane(x, t, { time: 'night', pan: 640, moon: { x: 820, y: 420, r: 120 } }, c => {
      laneSnow(c, t, { depth: depthAt(t) })
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 3, look: [1, 1], pull: bump(t, 4.6, 0.6) })
      actor(c, t, { sign: 'sagittarius', size: 230, x: 1330, seed: 4, hops: [0.0, 0.6, 1.2, 1.9, 2.6, ...SAG_HOPS], walk: false,
        moods: [[-1, 'sparkle', [0, -1]], [3.0, 'happy', undefined], [4.4, 'neutral', [-1, 0]]], wear: SAG_W })
      actor(c, t, { sign: 'cancer', size: 220, x: 960, seed: 2, hops: [3.75, ...CAN_HOPS], walk: false,
        moods: [[-1, 'happy', undefined], [3.6, 'neutral', [1, 0]], [3.9, 'heart', [1, 0], 0.95], [4.35, 'wide', [0, 1], 0.95]], wear: CAN_W })
      sparkles(c, t, 1150, 1210, 3.9, 12, 180, 2, [PINK, '#ffb3d9', ML_GOLD])
    })
    snowfall(x, t, { n: 110, from: -14, seed: 3 })
  }

  // ── act 1: the polaroids on Cancer's wall
  function polaroid(X, Y, k, season, t) {
    if (k <= 0.01) return
    x.save(); x.translate(X, Y); x.rotate([-0.06, 0.05, 0.04, -0.05][season]); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-92, -102, 184, 214); x.fillStyle = '#f7efdd'; x.fillRect(-86, -96, 172, 202)
    const BG = ['#ffc6dc', '#ffb36b', '#d9823a', '#2a3a7a'][season]
    x.fillStyle = BG; x.fillRect(-74, -84, 148, 140)
    x.save(); x.beginPath(); x.rect(-74, -84, 148, 140); x.clip()
    if (season === 0) for (let i = 0; i < 8; i++) { x.fillStyle = ['#ff6b9a', '#ffffff', '#ffd36e'][i % 3]; x.fillRect(-70 + i * 19, 30 + (i % 2) * 8, 10, 10) }
    if (season === 1) { x.fillStyle = '#fff1a0'; x.fillRect(30, -76, 36, 36) }
    if (season === 2) for (let i = 0; i < 7; i++) { x.fillStyle = ['#ff7a3a', '#ffb347', '#b8452a'][i % 3]; x.fillRect(-66 + i * 21, -70 + ((i * 37) % 90), 10, 8) }
    if (season === 3) { x.fillStyle = '#f4f7ff'; x.fillRect(-74, 34, 148, 22); for (let i = 0; i < 10; i++) x.fillRect(-70 + ((i * 47) % 140), -80 + ((i * 31) % 100), 6, 6) }
    drawSign(x, 'cancer', -30, standY(66, 52), 66, t, { mood: 'happy', seed: 2 + season, bob: 0 })
    drawSign(x, 'sagittarius', 30, standY(70, 52), 70, t, { mood: season === 3 ? 'sparkle' : 'happy', seed: 4 + season, bob: 0 })
    x.restore()
    x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(['SPRING', 'SUMMER', 'AUTUMN', 'FIRST SNOW'][season], 0, 82)
    x.restore()
  }
  function aptPolaroids(t) {
    drawApartment(x, t, { lamp: 1 })
    windowSnow(x, t, [APT.window.x, APT.window.y, APT.window.w, APT.window.h], { depth: 0.5, seed: 8 })
    ;[[230, 640], [430, 650], [240, 870], [440, 880]].forEach(([X, Y], i) => polaroid(X, Y, pop01(t, T.polar[i], 0.32, 2), i, t))
    actor(x, t, { sign: 'cancer', size: 240, x: APT.couch.seats[1], y: APT.couch.seatY, seed: 2, walk: false, hops: [T.polar[3] + 0.4, ...CAN_HOPS],
      moods: [[0, 'happy', [-1, -1]], [13.3, 'happy', undefined], [15.9, 'sparkle', [-1, -1]]], wear: CAN_W })
    drawMug(x, APT.couch.seats[1] + 120, 1290, 6, t, { col: '#ffd36e' })
  }

  // ── the café, the talk card
  function cafe1(t) {
    drawCafe(x, t, { lights: 1, behind: c => drawSign(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: 'happy', look: [-1, 1], seed: 9 }) })
    // through the window: Sagittarius building a snow-star in the falling snow
    const W0 = CAFE.window
    x.save(); x.beginPath(); x.rect(W0.x, W0.y, W0.w, W0.h); x.clip()
    x.fillStyle = '#e8eeff'; x.fillRect(W0.x, W0.y + W0.h - 70, W0.w, 70)
    drawSnowStar(x, W0.x + 140, W0.y + W0.h - 30, 120, t, { points: key(t, [[17.5, 0.6], [29.5, 2.2]], ease.linear) })
    drawSign(x, 'sagittarius', W0.x + 300, standY(110, W0.y + W0.h - 22), 110, t, { mood: 'happy', seed: 4, hops: [19, 21.5, 24, 26.4, 28.8] })
    x.restore()
    windowSnow(x, t, [W0.x, W0.y, W0.w, W0.h], { depth: 0.6, seed: 9, n: 46 })
    drawPisces(x, 92, standY(120, 1250), 120, t, { tears: t > T.realise ? 3 : 2, look: [1, 0], pull: bump(t, T.realise + 0.3, 0.5) })
    const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
    actor(x, t, { sign: 'cancer', size: 220, x: S0.x, y: S0.y, seed: 2, walk: false, hops: [T.realise, ...CAN_HOPS],
      moods: [[0, 'happy', [1, -1]], [23.1, 'sparkle', [1, -1]], [25.0, 'neutral', [-1, -1]], [T.realise, 'wide', [0, -1], 0.95]], wear: CAN_W })
    actor(x, t, { sign: 'gemini', size: 220, x: S1.x, y: S1.y, seed: 8, walk: false, hops: [T.fan, T.deal[0], T.realise + 0.6, ...talkHops(ALL_LINES, GE, { cps: CPS })],
      moods: [[0, 'happy', [-1, 0]], [T.deal[1], 'wink', [-1, 0]], [25.3, 'wide', [-1, 0]], [T.realise + 0.5, 'sparkle', [-1, 0]]] })
    drawCafeTable(x, t, { cups: 2, pastry: 'bun' })
    // the deck fan, then the dealt card (flips from back to the question)
    const fanK = pop01(t, T.fan, 0.3, 2) * (1 - prog(t, T.deal[1], T.deal[1] + 0.3))
    for (let i = 0; i < 5; i++) if (fanK > 0.01) drawTalkCard(x, S1.x - 10 + (i - 2) * 24, 1130 + Math.abs(i - 2) * 6, 90 * fanK, t, { back: true, rot: (i - 2) * 0.16 })
    if (t > T.deal[0] && t < T.cardOut[1]) {
      const p = ease.outCubic(prog(t, ...T.deal)), o = 1 - ease.inCubic(prog(t, ...T.cardOut))
      const cx = lerp(S1.x, 560, p), cy = lerp(1120, 790, p) - Math.sin(Math.PI * p) * 120, spin = (1 - p) * 6.28
      const sx = Math.cos(spin), w = lerp(90, 330, p)
      drawTalkCard(x, cx, cy + 6 * Math.sin(t * 2), w, t, { back: sx < 0, scaleX: Math.max(0.03, Math.abs(sx)), alpha: o, q: 'Who do you tell first when something good happens?', glow: bump(t, T.realise, 1.2) + bump(t, T.deal[1], 0.7) })
    }
    sparkles(x, t, 560, 790, T.deal[1], 10, 170, 3)
    sparkles(x, t, S0.x, 1170, T.realise, 12, 170, 4, [PINK, '#ffb3d9', ML_GOLD])
    drawBubble(x, 820, 1040, 'ohhh?', { size: 32, k: pop01(t, 27.9, 0.25, 2.2) * outK(t, [29.4, 29.6]), tail: 'down' })
  }

  // a star peeking out of a lane window (clipped to the glass), in world coordinates
  function inWindow(c, t, id, sign, k, mood, look, wear) {
    const w = LANE.windows.find(v => v.id === id)
    c.save(); c.beginPath(); c.rect(w.x, w.y, w.w, w.h); c.clip()
    worn(c, sign, w.x + w.w / 2, standY(96, w.y + w.h + 40 - 52 * k), 96, t, { mood, look, seed: 2 }, wear)
    c.restore()
  }
  function lane1(t) {
    const pan = key(t, [[30, 560], [36, 660]])
    drawLane(x, t, { time: 'night', pan, lit: ['a0', 'a2', 'a4', 'b0', 'pisces', 'cafe', 'c1', 'c3', 'd1', 'd3', 'd9'] }, c => {
      laneSnow(c, t, { depth: depthAt(t) })
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 2, look: [1, 1] })
      drawSnowStar(c, 1440, LANE.feet, 190, t, { points: key(t, [[30, 2.2], [39, 2.6]], ease.linear) })
      actor(c, t, { sign: 'sagittarius', size: 220, x: [[30, 1180], [31.4, 1290]], seed: 4, hops: [33.8, 34.5, 37.2, ...SAG_HOPS],
        moods: [[0, 'happy', [1, 0]], [32.4, 'sparkle', [1, -1]], [37.9, 'neutral', [1, -1]]], wear: SAG_W })
      const pk = key(t, [[31.6, 0], [32.2, 1], [T.duck, 1], [T.duck + 0.25, 0]], ease.outCubic)
      inWindow(c, t, 'c1', 'cancer', pk, t > 34.4 ? 'heart' : 'happy', [1, 1], CAN_W)
    })
    snowfall(x, t, { n: 120, seed: 5 })
    sparkles(x, t, 1400 - key(t, [[30, 560], [36, 660]]), 1010, 34.6, 8, 120, 5, [PINK, '#ffb3d9'])
  }

  // ── act 2
  function apt2(t) {
    drawApartment(x, t, { lamp: 1 })
    windowSnow(x, t, [APT.window.x, APT.window.y, APT.window.w, APT.window.h], { depth: 0.7, seed: 8 })
    actor(x, t, { sign: 'cancer', size: 240, x: APT.couch.seats[0] + 40, y: APT.couch.seatY, seed: 2, walk: false, squash: 0.06,
      moods: [[0, 'neutral', [1, -1]], [T.typing[0], 'squint', [1, -1]], [44.2, 'neutral', [1, 0]], [45.8, 'squint', [0, 1]]], wear: CAN_W })
    drawBlanket(x, 230, 1335, 420, 100, t, { col: '#c05a6a' })
    drawMug(x, 210, 1240, 5, t, { col: '#7fe0ff' })
    // a cookie tin, open
    x.fillStyle = INK; x.fillRect(540, 1214, 110, 44); x.fillStyle = '#d8455f'; x.fillRect(546, 1220, 98, 32)
    for (let i = 0; i < 3; i++) { x.fillStyle = '#e0963a'; x.fillRect(556 + i * 30, 1206, 22, 12) }
    const pin = ease.outBack(prog(t, 40.5, 40.9)), po = ease.inCubic(prog(t, 47.4, 47.85))
    drawPhone(x, 790, 900 + (1 - pin) * 1100 + po * 1100, 420, 600, t, { title: '♐︎ Sagittarius', msgs: THREAD, typing: T.typing })
  }
  function hiding(t) {
    const pan = 1080
    drawLane(x, t, { time: 'night', pan }, c => {
      laneSnow(c, t, { depth: depthAt(t) })
      // Sagittarius strolls by, looking for Cancer
      actor(c, t, { sign: 'sagittarius', size: 220, x: [[48, 2300], [50.6, 1640], [52.4, 1560], [53.2, 1520]], seed: 4, step: 0.42,
        moods: [[0, 'neutral', [-1, 0]], [50.6, 'neutral', [-1, 1]], [52.4, 'neutral', [1, 0]], [T.see, 'squint', [1, 0]], [54.6, 'happy', [1, 0]]], wear: SAG_W })
      // hiding spot 1: behind the flower cart (peeking over), then spot 2: the lamp post
      if (t < T.lampAt) {
        actor(c, t, { sign: 'cancer', size: 220, x: 1880, y: key(t, [[48, 1420], [48.4, 1352], [49.9, 1352], [50.1, 1392], [50.6, 1352]]), seed: 2, walk: false,
          moods: [[0, 'wide', [1, 0]], [50.0, 'squint', [1, 0]]], wear: CAN_W })
        c.fillStyle = '#7a4a3a'; c.fillRect(1730, 1300, 330, 100); c.fillStyle = '#9a6a48'; c.fillRect(1730, 1300, 330, 10)
        c.fillStyle = '#5e3828'; for (let xx = 1750; xx < 2050; xx += 40) c.fillRect(xx, 1316, 4, 80)
        c.fillStyle = 'rgba(244,247,255,0.95)'; c.fillRect(1730, 1290, 330, 12)
      } else {
        const lx = LANE.lamps[2]
        actor(c, t, { sign: 'cancer', size: 220, x: [[T.lampAt, 1640], [T.lampAt + 0.4, lx], [T.run[0], lx], [T.run[1], 2320]], seed: 2, squash: 0.1,
          moods: [[0, 'squint', [-1, 0]], [T.see + 0.2, 'wide', [-1, 0]], [T.run[0], 'wide', [1, 0]]], wear: CAN_W })
        c.fillStyle = '#1b1530'; c.fillRect(lx - 6, 1040, 12, 424)
      }
    })
    snowfall(x, t, { n: 120, seed: 6 })
    drawBubble(x, 1640 - pan, 1110, 'Cancer?', { size: 30, k: pop01(t, 50.7, 0.25, 2) * outK(t, [52.3, 52.5]), tail: 'down' })
    drawBubble(x, 1520 - pan, 1110, '…I can see you.', { size: 30, k: pop01(t, T.see, 0.25, 2) * outK(t, [55.5, 55.8]), tail: 'down' })
    drawBubble(x, LANE.lamps[2] - pan, 950, 'too thin!', { size: 30, col: '#ffd2e0', k: pop01(t, 52.1, 0.25, 2) * outK(t, [53.2, 53.4]), tail: 'down' })
  }
  function cafe2(t) {
    drawCafe(x, t, { lights: 1, behind: c => drawSign(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: t > 57.6 ? 'eyeroll' : 'happy', look: [-1, 1], seed: 9, hops: talkHops(ALL_LINES, TS, { cps: CPS }) }) })
    windowSnow(x, t, [CAFE.window.x, CAFE.window.y, CAFE.window.w, CAFE.window.h], { depth: 0.7, seed: 9 })
    drawPisces(x, 92, standY(120, 1250), 120, t, { tears: 2, look: [1, 0] })
    const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
    actor(x, t, { sign: 'cancer', size: 220, x: S0.x, y: S0.y, seed: 2, walk: false, moods: [[0, 'wide', [1, 0]], [59.0, 'squint', [1, 0]]], wear: CAN_W })
    actor(x, t, { sign: 'leo', size: 230, x: S1.x, y: S1.y, seed: 7, walk: false, hops: talkHops(ALL_LINES, LS, { cps: CPS }), moods: [[0, 'neutral', [-1, 0]], [59.0, 'wink', [-1, 0]]] })
    drawCafeTable(x, t, { cups: 2, pastry: null })
    // the croissant shield
    const k = pop01(t, T.croissantUp, 0.3, 2)
    drawPastry(x, S0.x + 10, 1250 + (1 - k) * 160, 13 * Math.max(0.2, k), 'croissant')
  }
  function bench(t, act3) {
    drawLane(x, t, { time: 'late', pan: 700, moon: { x: 860, y: 560, r: 105 }, lit: act3 ? ['a4', 'pisces', 'cafe', 'c2', 'd6'] : ['a4', 'pisces', 'cafe', 'c1', 'c2', 'd6'] }, c => {
      const B = LANE.bench
      laneSnow(c, t, { depth: depthAt(t) })
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 3, look: [1, 1], pull: bump(t, 66.8, 0.6) + bump(t, 96.2, 0.6) })
      const pts = act3 ? key(t, [[T.build[0], 2.6], [T.build[1], 5]], ease.inOutQuad) : 2.6
      drawSnowStar(c, 1440, LANE.feet, 190, t, { points: pts, lit: act3 ? ease.outCubic(prog(t, T.lit, T.lit + 0.5)) : 0 })
      if (!act3) {
        actor(c, t, { sign: 'sagittarius', size: 220, x: B.seats[1], y: B.seatY, seed: 4, walk: false, squash: 0.08, hops: SAG_HOPS,
          moods: [[0, 'neutral', [0, 1]], [63.3, 'neutral', [0, -1]], [66.4, 'squint', [0, 1]]], wear: SAG_W })
        inWindow(c, t, 'c1', 'cancer', key(t, [[62.4, 0], [63.0, 1]], ease.outCubic), t > 66.3 ? 'squint' : 'wide', [-1, 1], CAN_W)
      } else {
        actor(c, t, { sign: 'sagittarius', size: 220, x: [[0, B.seats[1]], [T.up, B.seats[1]], [T.up + 0.6, 1600]], y: [[0, B.seatY], [T.up, B.seatY], [T.up + 0.3, LANE.feet]], seed: 4, hops: [93.9, ...SAG_HOPS, ...[99.2, 99.9, 100.6, 101.3, 102.0]],
          moods: [[0, 'neutral', [0, 1]], [91.8, 'wide', [-1, 0]], [94.0, 'happy', [-1, 0], 0.9], [95.6, 'sparkle', [-1, 0], 0.9], [T.lit, 'heart', undefined]], wear: SAG_W })
        actor(c, t, { sign: 'cancer', size: 220, x: [[0, 900], [T.walk[0], 900], [T.walk[1], B.seats[0]], [T.up, B.seats[0]], [T.up + 0.6, 1280]], y: [[0, LANE.feet], [T.walk[1] - 0.2, LANE.feet], [T.walk[1], B.seatY], [T.up, B.seatY], [T.up + 0.3, LANE.feet]], seed: 2, hops: [...CAN_HOPS, 99.5, 100.2, 100.9, 101.6],
          moods: [[0, 'neutral', [1, 0]], [92.5, 'neutral', [1, 0], 0.6], [94.0, 'happy', [1, 0], 0.9], [T.lit, 'heart', undefined]], wear: CAN_W })
        sparkles(c, t, 1440, 1280, T.lit, 14, 220, 7, [ML_GOLD, PINK, '#7fe0ff', BONE])
        for (let i = 0; i < 4; i++) sparkles(c, t, 1440 + [-80, 80, -60, 60][i], 1200 + [60, 40, -60, -90][i], r3(T.build[0] + i * 0.62), 6, 90, 10 + i, ['#ffffff', '#dff0ff'])
      }
    })
    snowfall(x, t, { n: 150, seed: 7, wind: 0.5 })
  }
  function tag(t) {
    drawLane(x, t, { time: 'late', pan: 1080, moon: { x: 700, y: 520, r: 105 }, lit: ['d1', 'd4', 'd6', 'd9', 'c3'] }, c => {
      laneSnow(c, t, { depth: 0.9 })
      actor(c, t, { sign: 'libra', size: 220, x: 1740, seed: 10, walk: false, hops: [T.blush, T.blush + 0.5], moods: [[0, 'neutral', [0, 1]], [T.set[1] - 0.2, 'wide', [1, 0]], [T.blush, 'heart', undefined]], wear: { hat: '#7dffb0' } })
      actor(c, t, { sign: 'scorpio', size: 210, x: [[0, 2300], [T.set[0], 1950]], seed: 11, moods: [[0, 'neutral', [-1, 0]], [T.blush, 'happy', [-1, 0], 0.9]], hops: [T.set[1]] })
      const mk = pop01(t, T.set[1], 0.25, 2)
      if (t > T.set[1]) { drawMug(c, 1845, 1296, 5 * mk, t, { col: '#ff8fb1' }); c.fillStyle = INK; c.font = `700 18px ${MONO}`; c.textAlign = 'center'; c.fillStyle = '#fbf3e2'; c.fillRect(1800, 1232, 90, 26); c.fillStyle = INK; c.fillText('for you', 1845, 1246) }
      sparkles(c, t, 1740, 1200, T.blush, 10, 150, 9, [PINK, '#ffb3d9', ML_GOLD])
    })
    snowfall(x, t, { n: 110, seed: 9 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.title) coldOpen(t)
      else if (t < T.apt) drawSky(x, t, SKY_H)
      else if (t < T.cafe) aptPolaroids(t)
      else if (t < T.lane1) cafe1(t)
      else if (t < T.apt2) lane1(t)
      else if (t < T.hide) apt2(t)
      else if (t < T.cafe2) hiding(t)
      else if (t < T.bench) cafe2(t)
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
      title.update(t)
      bug.update(t, title.on(t) ? 0 : outK(t, T.nextOut))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51, 1479.98]      // E major-ish
const chime = (t0, n = 4, base = 4) => Array.from({ length: n }, (_, i) => ['pluck', r3(t0 + i * 0.11), NOTE[(base + i) % 7] * (i > 2 ? 2 : 1), 0.025, 0.5, (i - 1.5) * 0.3])
export const CUES = [
  // cold open: the first flakes, the wish, the heart eyes
  ...chime(0.15, 4, 2), ['glitter', 0.6, 1.4],
  ['pop', 3.9, 1318.51, 0.045, 0], ['bell', 3.95, 1760, 0.03, 1.4, 0], ['glitter', 3.9, 4.6],
  ['pop', 4.4, 392, 0.035, -0.2],
  ...titleCues(T.title, 3),
  // act 1
  ...popCues(CAPS[1]), ...T.polar.map((a, i) => ['pop', a, NOTE[i + 1], 0.04, (i - 1.5) * 0.3]), ...T.polar.map(a => ['tick', a, 0.03]),
  ['whoosh', T.cafe, 0.4, 0.04], ...popCues(CAPS[2]),
  ['glitter', T.fan, r3(T.fan + 0.5)], ['whoosh', T.deal[0], 0.4, 0.05], ['tick', T.deal[1], 0.07], ['pop', T.deal[1], 1318.51, 0.045, 0], ['bell', r3(T.deal[1] + 0.05), 1760, 0.03, 1.2, 0],
  ['pop', T.realise, 1318.51, 0.05, 0], ['bell', T.realise, 2093, 0.03, 1.6, 0], ['glitter', T.realise, r3(T.realise + 0.8)], ...popCues(CAPS[3]),
  ['pop', 27.9, 880, 0.035, 0.3], ['whoosh', T.cardOut[0], 0.3, 0.03],
  ...popCues(CAPS[4]), ['pop', 31.8, 987.77, 0.03, 0.2], ['glitter', 34.6, 35.2], ['whoosh', T.duck, 0.3, 0.035], ['tick', T.duck + 0.2, 0.05],
  // act 2
  ...popCues(CAPS[5]), ['whoosh', 40.5, 0.4, 0.04],
  ...THREAD.map(m => ['pop', m.at, m.side === 'R' ? NOTE[4] : NOTE[1] * 1.5, 0.045, m.side === 'R' ? 0.25 : -0.25]),
  ['tick', T.typing[0], 0.02], ['tick', r3(T.typing[0] + 0.15), 0.02], ['tick', r3(T.typing[0] + 0.3), 0.02],
  ...popCues(CAPS[6]), ['whoosh', 48.3, 0.3, 0.03], ['pop', 50.1, 523.25, 0.03, 0.3], ['pop', 50.7, 880, 0.03, 0.2],
  ['whoosh', T.lampAt, 0.3, 0.035], ['pop', 52.1, 1318.51, 0.035, 0.2], ['pop', T.see, 587.33, 0.04, 0.2], ['whoosh', T.run[0], 0.45, 0.045],
  ['whoosh', T.cafe2, 0.35, 0.035], ['pop', T.croissantUp, 1046.5, 0.045, -0.2],
  ...captionCues(CAPS[7]), ['pop', 66.8, 392, 0.03, -0.3],
  // THE STARS ADVISE
  ...adviseCues(ADVISE),
  // act 3
  ...popCues(CAPS[8]), ...Array.from({ length: 5 }, (_, i) => ['tick', r3(T.walk[0] + i * 0.36), 0.015]),
  ...popCues(CAPS[9]), ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.build[0] + i * 0.62), NOTE[2 + i], 0.04, (i - 1.5) * 0.3]),
  ['riser', T.build[0], T.lit, 0.02], ['pop', T.lit, 1318.51, 0.05, 0], ['bell', T.lit, 1760, 0.035, 1.6, 0], ['glitter', T.lit, r3(T.lit + 0.8)],
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'E' }),
  // the lane tag
  ...captionCues(CAPS[10]), ['tick', T.set[1], 0.05], ['pop', T.set[1], 1174.66, 0.04, 0], ['bell', T.blush, 1760, 0.03, 1.2, 0], ['glitter', T.blush, r3(T.blush + 0.6)],
  // next time + the last line
  ...nextTimeCues(T.next), ...popCues(CAPS[11]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CS]: 880, [GS]: 659.25, [GE]: 1046.5, [TS]: 523.25, [LS]: 932 } }),
  ...endcardCues(STORY_END, { short: true }),
].filter(c => c[1] >= 0)
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
