// nml2e04 — MOONLIGHT LANE, Ep 4: "Two Invitations, One Night" (Season 2: Winter on the Lane; 120 s vertical,
// star_advice; funk · Bb). Rows: promo/films/next30/b19.md. Show kit: ../../mlpilot/scenes/mlkit.js. Winter: ../../nml2e01.
//   0.0–5.0    COLD OPEN  "Two invitations. | *One* Saturday." (SATURDAY · 7:55 PM). ♎ Libra sprints down the snowy lane, an
//              invitation in each hand. "I said yes to *both.* that’s fair, right?"
//   5.0–7.0    ◀◀ PREVIOUSLY ON (day four · the snowbank · the lumpy scarf)
//   7.0–10.0   TITLE CARD  Ep 4 · Two Invitations, One Night.
//  10.0–20.0   ACT 1  Thursday at the flower stall: ♌ Leo "my party, saturday. you’re my *plus-fun.*" ♏ Scorpio "the
//              midnight bake. I want to show you my *favourite* part of the night."
//  20.0–26.0   "Perfectly | *balanced.*" Libra’s scale: PARTY vs BAKE, dead level. "yes!" "yes!"
//  26.0–31.0   "The plan: | *both.*" 8:00 party · 8:20 bake · 8:40 party · 9:00 bake… "I’ll just… *alternate.*"
//  31.0–35.0   8:00 PM, the rooftop party.  35.0–40.0  8:20 PM, the café kitchen.
//  40.0        card cut.
//  40.0–52.0   ACT 2  "The *shuttle.*" roof ↔ kitchen, snow on the head, flour on the face, a party hat over a baker’s cap;
//              Leo: "where do you keep *going?*"; the dough rises without them.
//  52.0–58.0   ♊ Gemini’s bad advice: "say you’re in the bathroom. *both* places."
//  58.0–70.0   "10:50 PM. | *Cold loaf.*" Scorpio alone with a heart-shaped loaf: "it’s okay. I just wanted *you* here."
//  70.0–90.0   ★ THE STARS ADVISE: You can’t split in half · Choosing isn’t unkind · Say it warmly, early.
//  90.0–104.0  ACT 3  The roof: "I want to be at the bakery *tonight.* brunch tomorrow?" Leo: "go! *GO!*" The kitchen: an
//              apron, the next loaf, together. "you came *back.*" "all of me, *this* time."
// 104.0–108.0  ★ LESSON UNLOCKED "Half here | is *nowhere.*" +1 FLOUR ON FACE
// 108.0–111.6  LANE TAG  On the roof, ♋ Cancer and ♐ Sagittarius see a shooting star; both wish, look, look away.
// 111.6–115.6  NEXT TIME ON Moonlight Lane… "The lane gets *snowed in.*" · last line "*Choose.* | Then say it kindly."
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, MONO, INTER, r3, pop01, outK, bump, loadFonts,
  drawLane, LANE, standY, drawPisces, drawCafe, CAFE, drawApartment, APT, drawPastry,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues, buildNextTime, nextTimeCues, popCues,
  drawBubble, sparkles,
} from '../../mlpilot/scenes/mlkit.js'
import { snowfall, laneSnow, windowSnow, worn, actor, key, drawScarfProp, drawSnowbank } from '../../nml2e01/scenes/winter.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN
const lab = (s, n) => `${signStar(s).glyph}︎ ${n}`
const LI = lab('libra', 'LIBRA'), SC = lab('scorpio', 'SCORPIO'), LS = lab('leo', 'LEO'), GE = lab('gemini', 'GEMINI')
const LIB_C = '#ffb3ec', SCO_C = '#ff8fa8', LEO_C = '#ffbe73', GEM_C = '#ffe27a'
const LIB_W = { hat: '#7dffb0' }
const PARTY = '#ffd36e', BAKE = '#ffb3d9'

const T = {
  prev: [5.0, 7.0], title: 7.0,
  leoIn: [10.2, 11.0], scoIn: [13.2, 14.0], scale: 20.0, yes: [23.6, 24.5], plan: 26.0,
  roof1: 31.0, kit1: 35.0,
  shuttle: [40.0, 43.0, 46.0, 49.0], gem: 52.0, low: 58.0, burst: [60.4, 61.2],
  advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, push: 95.0, kit3: 95.4, poof: 97.0,
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, streak: [108.7, 109.5], look: 110.0, away: 110.7,
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Half here | is *nowhere.*', chip: '+1 FLOUR ON FACE' }

const CPS = 28
const L0 = [{ t: 0.6, speaker: LI, color: LIB_C, text: 'I said yes to *both.* that’s fair, right?' }]
const L1 = [
  { t: 11.0, speaker: LS, color: LEO_C, text: 'my party, saturday. you’re my *plus-fun.*' },
  { t: 14.2, speaker: SC, color: SCO_C, text: 'the midnight bake. I want to show you my *favourite* part of the night.' },
]
const L2 = [{ t: 27.6, speaker: LI, color: LIB_C, text: 'I’ll just… *alternate.*' }]
const L3 = [{ t: 46.6, speaker: LS, color: LEO_C, text: 'where do you keep *going?*' }]
const L4 = [{ t: 53.0, speaker: GE, color: GEM_C, text: 'say you’re in the bathroom. *both* places.' }]
const L5 = [
  { t: 62.4, speaker: SC, color: SCO_C, text: 'it’s okay. I just wanted *you* here.' },
  { t: 66.2, speaker: LI, color: LIB_C, text: '…I was everywhere *except* here.' },
]
const L6 = [
  { t: 91.0, speaker: LI, color: LIB_C, text: 'I want to be at the bakery *tonight.* brunch tomorrow?' },
  { t: 93.9, speaker: LS, color: LEO_C, text: 'go! *GO!*' },
]
const L7 = [
  { t: 98.4, speaker: SC, color: SCO_C, text: 'you came *back.*' },
  { t: 100.3, speaker: LI, color: LIB_C, text: 'all of me, *this* time.' },
]
const BOXES = [[L0, 0.4, 4.9], [L1, 10.8, 19.8], [L2, 27.4, 30.9], [L3, 46.4, 51.8], [L4, 52.8, 57.8], [L5, 62.2, 69.5], [L6, 90.8, 95.2], [L7, 98.2, 103.9]]
const ALL_LINES = BOXES.flatMap(b => b[0])

const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'clock', head: 'You can’t *split in half.*', body: 'Half of you in two places is all of you in neither.' },
    { at: T.cards[1], icon: 'check', head: 'Choosing isn’t *unkind.*', body: 'A clear no is kinder than a tired maybe.' },
    { at: T.cards[2], icon: 'calendar', head: 'Say it warmly, *early.*', body: '“I can’t make it tonight. Brunch tomorrow?”' },
  ],
  lines: [
    { t: 71.05, text: 'Libra, this one’s *yours.*' },
    { t: 73.95, text: 'fair isn’t half and half. it’s *honest.*' },
    { t: 77.5, text: 'pick the one your heart *already* picked.' },
    { t: 80.4, text: 'the other one? tell them *kindly.*' },
    { t: 83.5, text: 'early beats perfect. say it *now.*' },
    { t: 86.5, text: 'then be *all* the way there.' },
  ],
}

const CAPS = [
  { text: 'Two invitations. | *One* Saturday.', kicker: 'SATURDAY · 7:55 PM', at: -1.2, out: [4.75, 4.95], late: 2, lateAt: -0.8, size: 86 },
  { text: 'Two invitations. | *Same night.*', kicker: 'THURSDAY', at: 10.2, out: [19.6, 19.85], late: 2, lateAt: 10.8, size: 86 },
  { text: 'Perfectly | *balanced.*', at: 20.2, out: [25.8, 26.0], late: 1, lateAt: 20.8 },
  { text: 'The plan: | *both.*', at: 26.2, out: [30.7, 30.9], late: 1, lateAt: 26.8, size: 104 },
  { text: '8:00 PM. | *Party.*', kicker: 'SATURDAY', at: 31.15, out: [34.8, 34.95], late: 1, lateAt: 31.6 },
  { text: '8:20 PM. | *Bake.*', at: 35.15, out: [39.6, 39.8], late: 1, lateAt: 35.5 },
  { text: 'The | *shuttle.*', at: 40.3, out: [51.7, 51.9], late: 1, lateAt: 40.8, size: 104 },
  { text: 'Bad advice, | *again.*', at: 52.15, out: [57.75, 57.95], late: 1, lateAt: 52.7 },
  { text: '10:50 PM. | *Cold loaf.*', at: 58.15, out: [69.35, 69.6], late: 2, lateAt: 58.8 },
  { text: 'One kind | *no.*', at: 90.25, out: [95.0, 95.2], late: 1, lateAt: 90.85, size: 104 },
  { text: 'All the way | *here.*', at: 95.5, out: [103.65, 103.85], late: 1, lateAt: 96.1, size: 104 },
  { text: 'One shooting star. | *Two wishes.*', kicker: 'ON THE ROOF', at: 108.15, out: [111.3, 111.5], late: 2, lateAt: 108.8, size: 80 },
  { text: '*Choose.* | Then say it kindly.', at: 112.5, out: [115.05, 115.4], size: 92, late: 0, top: 300 },
]
const PLAN = [['8:00', 'PARTY'], ['8:20', 'BAKE'], ['8:40', 'PARTY'], ['9:00', 'BAKE'], ['9:20', 'PARTY'], ['9:40', 'BAKE…?']]
const LIB_HOPS = talkHops(ALL_LINES, LI, { cps: CPS })

// the rooftop, zoomed: world (1400, 880) → screen (540, 1150)
const ROOF = { pan: 860, zoom: 1.6, focus: [540, 430] }
const RX = wx => (wx - ROOF.pan - 540) * ROOF.zoom + 540, RY = wy => (wy - 430) * ROOF.zoom + 430

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '700 30px Inter', "italic 600 40px 'EB Garamond'"])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'The lane gets *snowed in.*' })
  const title = buildTitle(root, { ep: 4, title: 'Two Invitations, One Night', at: T.title, len: 3 })
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0], stills: [
    { caption: 'Day four.', crop: [120, 700, 840, 1000], scene: c => { drawApartment(c, 2, {}); worn(c, 'cancer', 540, standY(270, 1440), 270, 2, { mood: 'heart' }, { hat: '#ff8fb1', scarf: '#ffd36e' }) } },
    { caption: 'Snowbank: population one.', crop: [100, 820, 880, 1050], scene: c => drawLane(c, 64, { pan: 0, zoom: 1.4, focus: [540, 1420] }, w => { laneSnow(w, 64, { depth: 0.9 }); worn(w, 'cancer', 740, standY(190, 1385), 190, 64, { mood: 'squint', look: [0, 1] }, { hat: '#ff8fb1' }); drawSnowbank(w, 600, 1530, 280, 240, 7) }) },
    { caption: '“It’s perfect.”', crop: [100, 820, 880, 1050], scene: c => drawLane(c, 102, { pan: 0, zoom: 1.4, focus: [540, 1420] }, w => { laneSnow(w, 102, { depth: 0.9 }); worn(w, 'cancer', 600, standY(200), 200, 102, { mood: 'heart' }, { hat: '#ff8fb1', scarf: '#ff8fb1', lumpy: true }); worn(w, 'sagittarius', 410, standY(200), 200, 102, { mood: 'heart' }, { scarf: '#ffd36e' }) }) },
  ] })
  const bug = showBug(root, 4, { at: -1 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // an invitation card held at (X, Y)
  function invite(c, X, Y, k, txt, col, rot = 0) {
    if (k <= 0.01) return
    c.save(); c.translate(X, Y); c.rotate(rot); c.scale(k, k)
    c.fillStyle = INK; c.fillRect(-60, -40, 120, 80); c.fillStyle = col; c.fillRect(-54, -34, 108, 68)
    c.fillStyle = INK; c.font = `700 19px ${MONO}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, -8); c.font = `700 14px ${MONO}`; c.fillText('SAT · 8 PM', 0, 16)
    c.restore()
  }
  // Libra's frazzle: snow on the head / flour specks / a party hat over the baker's cap
  function frazzle(c, X, feetY, size, t, { snow = 0, flour = 0, hats = 0 } = {}) {
    const top = feetY - size * 0.93
    if (snow > 0) { c.fillStyle = '#f4f7ff'; c.fillRect(X - size * 0.12, top - 6 - snow * 10, size * 0.24, 10 + snow * 10) }
    if (flour > 0) { c.fillStyle = 'rgba(255,255,255,0.9)'; for (let i = 0; i < 6 * flour; i++) c.fillRect(X - size * 0.25 + ((i * 37) % 100) / 100 * size * 0.5, feetY - size * 0.55 + ((i * 53) % 100) / 100 * size * 0.3, 8, 8) }
    if (hats > 0) {
      c.fillStyle = INK; c.fillRect(X - 26, top - 30, 52, 30); c.fillStyle = '#fffaf0'; c.fillRect(X - 22, top - 26, 44, 22)
      c.fillStyle = INK; c.beginPath(); c.moveTo(X - 26, top - 30); c.lineTo(X, top - 92); c.lineTo(X + 26, top - 30); c.fill()
      c.fillStyle = '#ff8fb1'; c.beginPath(); c.moveTo(X - 20, top - 33); c.lineTo(X, top - 84); c.lineTo(X + 20, top - 33); c.fill()
      c.fillStyle = ML_GOLD; c.fillRect(X - 7, top - 100, 14, 14)
    }
  }

  // ── cold open: the sprint
  function coldOpen(t) {
    const pan = key(t, [[-1, 300], [5, 700]], ease.linear)
    drawLane(x, t, { time: 'night', pan }, c => {
      laneSnow(c, t, { depth: 0.85 })
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 2, look: [1, 1] })
      const lx = key(t, [[-1, 760], [5, 1400]], ease.linear)
      actor(c, t, { sign: 'libra', size: 230, x: lx, seed: 10, walk: false, hops: Array.from({ length: 22 }, (_, i) => r3(-1 + i * 0.27)), squash: 0.04,
        moods: [[-1, 'wide', [1, 0]], [1.4, 'happy', [-1, -1]], [3.6, 'wide', [1, 0]]], wear: LIB_W })
      invite(c, lx - 150, 1230 + Math.sin(t * 12) * 10, 0.9, 'PARTY!', PARTY, -0.25 + Math.sin(t * 12) * 0.1)
      invite(c, lx + 150, 1230 + Math.cos(t * 12) * 10, 0.9, 'BAKE?', BAKE, 0.25 - Math.sin(t * 12) * 0.1)
    })
    snowfall(x, t, { n: 140, seed: 21, wind: -0.8 })
  }
  // ── act 1: Thursday at the flower stall, the scale, the plan
  function stall(t) {
    drawLane(x, t, { time: 'night', pan: 1080 }, c => {
      laneSnow(c, t, { depth: 0.8 })
      actor(c, t, { sign: 'libra', size: 220, x: 1860, seed: 10, walk: false, hops: [T.leoIn[1] + 0.3, T.scoIn[1] + 0.3, 16.6, 17.0],
        moods: [[0, 'happy', [-1, 0]], [T.leoIn[1], 'sparkle', [-1, 0]], [T.scoIn[1], 'sparkle', [1, 0]], [16.4, 'heart', [1, 0], 1], [18.4, 'wide', [0, 1]]], wear: LIB_W })
      actor(c, t, { sign: 'leo', size: 210, x: [[10, 1300], [T.leoIn[1], 1640]], seed: 7, hops: talkHops(ALL_LINES, LS, { cps: CPS }), moods: [[0, 'sparkle', [1, 0]]] })
      actor(c, t, { sign: 'scorpio', size: 210, x: [[10, 2400], [T.scoIn[0], 2400], [T.scoIn[1], 2070]], seed: 11, hops: talkHops(ALL_LINES, SC, { cps: CPS }), moods: [[0, 'happy', [-1, 0], 0.9]] })
      invite(c, 1730, 1100, pop01(t, T.leoIn[1], 0.3, 2), 'PARTY!', PARTY, -0.12)
      invite(c, 1990, 1100, pop01(t, T.scoIn[1] + 0.6, 0.3, 2), 'BAKE?', BAKE, 0.12)
    })
    snowfall(x, t, { n: 110, seed: 22 })
  }
  function scale(t) {
    drawApartment(x, t, { lamp: 1 })
    windowSnow(x, t, [APT.window.x, APT.window.y, APT.window.w, APT.window.h], { depth: 0.8, seed: 23 })
    if (t < T.plan) {
      // the balance: a post, a beam that wobbles and settles dead level, a card on each pan
      const k = pop01(t, 20.2, 0.35, 2), wob = Math.sin(t * 7) * 0.2 * Math.exp(-(t - 20.4) * 1.1)
      x.save(); x.translate(540, 1240); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-14, -420, 28, 420); x.fillRect(-110, -10, 220, 26); x.fillStyle = ML_GOLD; x.fillRect(-8, -414, 16, 408); x.fillRect(-104, -4, 208, 14)
      x.save(); x.translate(0, -420); x.rotate(wob)
      x.fillStyle = INK; x.fillRect(-330, -12, 660, 24); x.fillStyle = ML_GOLD; x.fillRect(-326, -8, 652, 16)
      for (const d of [-1, 1]) {
        x.save(); x.translate(d * 300, 0); x.rotate(-wob)
        x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-80, 150); x.moveTo(0, 0); x.lineTo(80, 150); x.stroke()
        x.fillStyle = INK; x.fillRect(-96, 146, 192, 20); x.fillStyle = ML_GOLD; x.fillRect(-92, 150, 184, 12)
        invite(x, 0, 100, 1, d < 0 ? 'PARTY!' : 'BAKE?', d < 0 ? PARTY : BAKE)
        x.restore()
      }
      x.restore(); x.restore()
      actor(x, t, { sign: 'libra', size: 220, x: 540, y: 1460, seed: 10, walk: false, hops: [...T.yes, 25.0],
        moods: [[0, 'neutral', [-1, -1]], [21.5, 'neutral', [1, -1]], [T.yes[0], 'sparkle', [-1, -1]], [T.yes[1], 'sparkle', [1, -1]]], wear: LIB_W })
      drawBubble(x, 250, 1060, 'yes!', { size: 40, col: PARTY, k: pop01(t, T.yes[0], 0.22, 2.4) * outK(t, [25.6, 25.8]) })
      drawBubble(x, 830, 1060, 'yes!', { size: 40, col: BAKE, k: pop01(t, T.yes[1], 0.22, 2.4) * outK(t, [25.6, 25.8]) })
      return
    }
    // the plan: a list with arrows bouncing between PARTY and BAKE
    const k = pop01(t, T.plan, 0.3, 2)
    x.save(); x.translate(540, 760); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-240, -20, 480, 470); x.fillStyle = '#fbf3e2'; x.fillRect(-232, -12, 464, 454)
    x.fillStyle = '#d8455f'; x.fillRect(-232, -12, 464, 56); x.fillStyle = '#fff6e8'; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('SATURDAY', -210, 16)
    PLAN.forEach(([tm, tx], i) => {
      const a = clamp(prog(t, T.plan + 0.3 + i * 0.35, T.plan + 0.5 + i * 0.35))
      if (a <= 0) return
      x.globalAlpha = a
      x.fillStyle = '#8a6a4a'; x.font = `700 26px ${MONO}`; x.fillText(tm, -200, 80 + i * 60)
      x.fillStyle = tx.startsWith('PARTY') ? '#b07a20' : '#c2306a'; x.fillText(tx, -90, 80 + i * 60)
      if (i > 0) { x.fillStyle = INK; x.fillText(i % 2 ? '↘' : '↙', 150, 50 + i * 60) }
      x.globalAlpha = 1
    })
    x.restore()
    actor(x, t, { sign: 'libra', size: 220, x: 540, y: 1460, seed: 10, walk: false, hops: LIB_HOPS, moods: [[0, 'sparkle', [0, -1]], [28.6, 'squint', [0, -1]]], wear: LIB_W })
  }
  // ── the two places
  const DANCERS = [['leo', 1250, 7], ['cancer', 1350, 2], ['sagittarius', 1540, 4], ['gemini', 1630, 8]]
  function roof(t, { libra = null, leoLook = null, dim = 0 } = {}) {
    drawLane(x, t, { time: 'night', pan: ROOF.pan, zoom: ROOF.zoom, focus: ROOF.focus, lights: 1, dim }, c => {
      laneSnow(c, t, { depth: 0.8 })
      for (const [s, X, seed] of DANCERS) {
        const beat = Array.from({ length: 40 }, (_, i) => r3(Math.floor(t) - 4 + i * 0.278 + seed * 0.03))
        const wear = s === 'cancer' ? { hat: '#ff8fb1', scarf: '#ff8fb1', lumpy: true } : s === 'sagittarius' ? { scarf: '#ffd36e' } : {}
        let mood = 'happy', look
        if (s === 'leo' && leoLook) { mood = leoLook.mood; look = leoLook.look }
        worn(c, s, X, standY(130, 900), 130, t, { mood, look, seed, hops: beat }, wear)
      }
      if (libra) libra(c)
    })
    snowfall(x, t, { n: 100, seed: 24 })
    // music notes over the party
    for (let i = 0; i < 6; i++) { const ph = (t * 0.7 + i / 6) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = [ML_GOLD, PINK, '#7fe0ff'][i % 3]; const nx = 200 + i * 130, ny = 900 - ph * 200; x.fillRect(nx, ny, 14, 14); x.fillRect(nx + 10, ny - 34, 4, 38); x.fillRect(nx + 10, ny - 34, 14, 6); x.restore() }
  }
  function kitchen(t, { libra = null, loaf = 1, cold = false, lights = 1, scoMood = 'happy', scoLook = [1, 0], scoBlush, scoHops = [] } = {}) {
    // a close-up on the counter: world (600, 900) → screen (540, 1150), ×1.5
    x.save(); x.setTransform(1.5, 0, 0, 1.5, 540 - 600 * 1.5, 1150 - 900 * 1.5)
    drawCafe(x, t, { lights, view: 'late', behind: c => {
      windowSnow(c, t, [CAFE.window.x, CAFE.window.y, CAFE.window.w, CAFE.window.h], { depth: 0.8, seed: 25 })
      // Pisces, outside, nose to the café window, sobbing
      c.save(); c.beginPath(); c.rect(CAFE.window.x, CAFE.window.y, CAFE.window.w, CAFE.window.h); c.clip()
      drawPisces(c, 300, standY(110, 890), 110, t, { tears: 3, look: [1, 0], box: false })
      c.restore()
      actor(c, t, { sign: 'scorpio', size: 210, x: 640, y: CAFE.counter.y, seed: 11, walk: false, mood: scoMood, look: scoLook, blush: scoBlush, hops: [...scoHops, ...talkHops(ALL_LINES, SC, { cps: CPS })] })
      if (libra) libra(c)
    } })
    // the dough / loaf on the counter (a heart pressed into it)
    const s = 4 + 3 * loaf
    drawPastry(x, 760, 870 - s * 3, s, 'loaf')
    x.fillStyle = cold ? '#c08060' : '#ff6b8a'; x.fillRect(752, 864 - s * 3, 16, 10); x.fillRect(748, 860 - s * 3, 8, 6); x.fillRect(764, 860 - s * 3, 8, 6)
    if (!cold) { x.save(); x.globalAlpha = 0.45; for (let k = 0; k < 3; k++) x.fillRect(740 + k * 16 + Math.sin(t * 3 + k) * 3, 820 - s * 6 - k * 10 - ((t * 20) % 12), 5, 9); x.restore() }
    x.restore()
  }
  function shuttle(t) {
    const i = t < T.shuttle[1] ? 0 : t < T.shuttle[2] ? 1 : t < T.shuttle[3] ? 2 : 3
    const t0 = T.shuttle[i], fr = { snow: i >= 1 ? i / 3 : 0, flour: i >= 2 ? 1 : 0, hats: i >= 2 ? 1 : 0 }
    const clock = ['8:40 PM', '9:00 PM', '9:20 PM', '9:40 PM'][i]
    if (i % 2 === 0) {
      roof(t, { leoLook: { mood: t > 46.6 ? 'squint' : 'happy', look: [1, 0] }, libra: c => {
        const X = key(t, [[t0, 1800], [t0 + 0.6, 1440], [t0 + 2.4, 1440], [t0 + 3, 1900]])
        actor(c, t, { sign: 'libra', size: 140, x: [[t0, 1800], [t0 + 0.6, 1440], [t0 + 2.4, 1440], [t0 + 3, 1900]], y: 900, seed: 10, step: 0.2, wear: LIB_W, moods: [[0, 'wide', [-1, 0]], [t0 + 0.7, 'happy', [-1, 0]], [t0 + 2.3, 'wide', [1, 0]]] })
        frazzle(c, X, 900, 140, t, fr)
      } })
    } else {
      kitchen(t, { loaf: 0.3 + i * 0.25, scoMood: 'neutral', scoLook: [1, 0], libra: c => {
        const X = key(t, [[t0, -150], [t0 + 0.5, 470], [t0 + 2.4, 470], [t0 + 3, -180]])
        actor(c, t, { sign: 'libra', size: 210, x: [[t0, -150], [t0 + 0.5, 470], [t0 + 2.4, 470], [t0 + 3, -180]], y: CAFE.counter.y, seed: 10, step: 0.2, wear: { ...LIB_W, hat: null }, moods: [[0, 'wide', [-1, 0]], [t0 + 0.6, 'happy', [-1, 0]], [t0 + 2.3, 'wide', [1, 0]]] })
        frazzle(c, X, CAFE.counter.y, 210, t, fr)
      } })
    }
    drawBubble(x, 860, 560, clock, { size: 34, col: ML_GOLD, k: pop01(t, t0 + 0.1, 0.25, 2) * outK(t, [t0 + 2.7, t0 + 2.9]), tail: null })
    if (i % 2 === 0) sparkles(x, t, 540, 1150, t0 + 0.6, 8, 120, 30 + i, ['#ffffff', '#dff0ff'])
  }
  function gemini(t) {
    roof(t, { libra: c => {
      actor(c, t, { sign: 'libra', size: 140, x: 1440, y: 900, seed: 10, walk: false, wear: LIB_W, moods: [[0, 'squint', [1, 0]], [54.6, 'wide', [1, 0]]] })
      frazzle(c, 1440, 900, 140, t, { snow: 1, flour: 1, hats: 1 })
    } })
    // Gemini (in the dancers) leans in; a little whisper bubble
    drawBubble(x, RX(1630), RY(700), 'psst.', { size: 28, k: pop01(t, 52.4, 0.25, 2) * outK(t, [53.4, 53.6]) })
  }
  function lowPoint(t) {
    kitchen(t, { lights: 0.55, cold: true, loaf: 1, scoMood: t > 61.2 ? 'neutral' : 'squint', scoLook: t > 61.2 ? [1, 0] : [0, 1], libra: c => {
      if (t < T.burst[0]) return
      actor(c, t, { sign: 'libra', size: 210, x: [[T.burst[0], -150], [T.burst[1], 470]], y: CAFE.counter.y, seed: 10, step: 0.18, rot: t > 66 ? -0.12 : 0, squash: t > 66 ? 0.1 : 0,
        moods: [[0, 'wide', [-1, 0]], [62.4, 'neutral', [-1, 0]], [66.0, 'squint', [0, 1]]], wear: LIB_W })
      frazzle(c, 470, CAFE.counter.y, 210, t, { snow: 1, flour: 1, hats: 1 })
    } })
    // the clock on the wall
    drawBubble(x, 860, 560, '10:50 PM', { size: 34, col: '#ffd2e0', k: pop01(t, 58.4, 0.25, 2) * outK(t, [69.2, 69.4]), tail: null })
  }
  function act3(t) {
    if (t < T.kit3) {
      roof(t, { leoLook: { mood: t > 93.8 ? 'sparkle' : 'happy', look: [1, 0] }, libra: c => {
        actor(c, t, { sign: 'libra', size: 140, x: [[90, 1800], [90.6, 1440], [T.push, 1440], [T.kit3, 1900]], y: 900, seed: 10, step: 0.22, hops: LIB_HOPS, wear: LIB_W,
          moods: [[0, 'neutral', [-1, 0]], [91.0, 'neutral', [-1, 0], 0.6], [93.9, 'sparkle', [-1, 0]], [T.push, 'happy', [1, 0]]] })
      } })
      sparkles(x, t, RX(1440), RY(780), 94.0, 10, 160, 40)
      return
    }
    const flour = bump(t, T.poof, 1.0)
    kitchen(t, { loaf: key(t, [[95.4, 0.3], [102, 1]], ease.linear), scoMood: t > 98.4 ? 'heart' : 'wide', scoLook: [1, 0], scoBlush: t > 98.4 ? 1 : undefined, scoHops: [T.poof, 100.3], libra: c => {
      actor(c, t, { sign: 'libra', size: 210, x: [[95.4, -150], [96.0, 480]], y: CAFE.counter.y, seed: 10, step: 0.2, hops: [T.poof, ...LIB_HOPS],
        moods: [[0, 'sparkle', [-1, 0]], [T.poof, 'happy', undefined], [100.3, 'heart', [-1, 0], 1]], wear: LIB_W })
      // an apron
      if (t > 96.0) { c.fillStyle = INK; c.fillRect(446, 870, 68, 70); c.fillStyle = '#fbf3e2'; c.fillRect(450, 874, 60, 62); c.fillStyle = PINK; c.fillRect(472, 890, 16, 12) }
    } })
    if (flour > 0) { x.save(); x.globalAlpha = flour; for (let i = 0; i < 26; i++) { const a = i * 2.4, r = 40 + 150 * prog(t, T.poof, T.poof + 1); x.fillStyle = '#ffffff'; x.fillRect(450 + Math.cos(a) * r, 1050 + Math.sin(a) * r * 0.6, 14, 14) } x.restore() }
  }
  function tag(t) {
    drawLane(x, t, { time: 'late', pan: ROOF.pan, zoom: ROOF.zoom, focus: ROOF.focus, lights: 0.6, moon: { x: 300, y: 300, r: 90 } }, c => {
      laneSnow(c, t, { depth: 0.85 })
      worn(c, 'cancer', 1360, standY(140, 900), 140, t, { seed: 2, mood: t < T.streak[1] + 0.2 ? 'sparkle' : t < T.look ? 'squint' : t < T.away ? 'heart' : 'happy', look: t < T.streak[1] ? [1, -1] : t < T.look ? undefined : t < T.away ? [1, 0] : [-1, 1], blush: t > T.look ? 1 : undefined, hops: [T.look] }, { hat: '#ff8fb1', scarf: '#ff8fb1', lumpy: true })
      worn(c, 'sagittarius', 1500, standY(140, 900), 140, t, { seed: 4, mood: t < T.streak[1] + 0.2 ? 'sparkle' : t < T.look ? 'squint' : t < T.away ? 'heart' : 'happy', look: t < T.streak[1] ? [-1, -1] : t < T.look ? undefined : t < T.away ? [-1, 0] : [1, 1], blush: t > T.look ? 1 : undefined, hops: [T.look + 0.1] }, { scarf: '#ffd36e' })
    })
    // the shooting star (a quick streak; meteors are real, the wishes are tradition)
    const p = prog(t, ...T.streak)
    if (p > 0 && p < 1) {
      const sx = lerp(980, 220, p), sy = lerp(260, 620, p)
      const g = x.createLinearGradient(sx, sy, sx + 260, sy - 120); g.addColorStop(0, 'rgba(255,250,220,0.95)'); g.addColorStop(1, 'rgba(255,250,220,0)')
      x.strokeStyle = g; x.lineWidth = 6; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + 260, sy - 120); x.stroke()
      x.fillStyle = '#ffffff'; x.fillRect(sx - 6, sy - 6, 12, 12)
    }
    sparkles(x, t, RX(1430), RY(770), T.look, 10, 150, 41, [PINK, '#ffb3d9', ML_GOLD])
    snowfall(x, t, { n: 80, seed: 26, alpha: 0.7 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.prev[0]) coldOpen(t)
      else if (t < 10) drawSky(x, t, SKY_H)
      else if (t < T.scale) stall(t)
      else if (t < T.roof1) scale(t)
      else if (t < T.kit1) roof(t, { libra: c => actor(c, t, { sign: 'libra', size: 140, x: [[31, 1800], [31.8, 1440]], y: 900, seed: 10, step: 0.25, wear: LIB_W, moods: [[0, 'sparkle', [-1, 0]]], hops: [33.0, 33.4] }) })
      else if (t < 40) kitchen(t, { loaf: 0.3, scoMood: t > 36 ? 'heart' : 'happy', scoBlush: t > 36 ? 0.9 : undefined, libra: c => { actor(c, t, { sign: 'libra', size: 210, x: [[35, -150], [35.6, 470]], y: CAFE.counter.y, seed: 10, step: 0.2, wear: LIB_W, moods: [[0, 'happy', [-1, 0]], [37.6, 'wide', [0, -1]]], hops: [38.6, 38.9] }) } })
      else if (t < T.gem) shuttle(t)
      else if (t < T.low) gemini(t)
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

const CUTS = [31.0, 40.0, 58.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

const NOTE = [932.33, 1046.5, 1174.66, 1244.51, 1396.91, 1567.98, 1760]   // Bb major
export const CUES = [
  ...Array.from({ length: 18 }, (_, i) => ['tick', r3(i * 0.27), 0.018]),
  ...previouslyCues(T.prev[0], 3, T.prev[1] - T.prev[0]),
  ...titleCues(T.title, 3),
  ...captionCues(CAPS[1]), ['pop', T.leoIn[1], NOTE[2], 0.04, -0.3], ['pop', r3(T.scoIn[1] + 0.6), NOTE[4], 0.04, 0.3],
  ...popCues(CAPS[2]), ...Array.from({ length: 6 }, (_, i) => ['tick', r3(20.5 + i * 0.4), 0.03 - i * 0.004]), ['pop', T.yes[0], NOTE[3], 0.05, -0.4], ['pop', T.yes[1], NOTE[5], 0.05, 0.4],
  ...popCues(CAPS[3]), ...PLAN.map((_, i) => ['pop', r3(T.plan + 0.3 + i * 0.35), NOTE[i % 2 ? 4 : 2], 0.035, i % 2 ? 0.3 : -0.3]),
  ...captionCues(CAPS[4]), ['whoosh', T.roof1, 0.4, 0.04], ...popCues(CAPS[5]), ['whoosh', T.kit1, 0.4, 0.04],
  ...popCues(CAPS[6]), ...T.shuttle.flatMap(a => [['whoosh', a, 0.35, 0.045], ['tick', r3(a + 0.1), 0.04], ['whoosh', r3(a + 2.4), 0.3, 0.035]]),
  ...popCues(CAPS[7]), ['pop', 52.4, 659.25, 0.03, 0.3],
  ...popCues(CAPS[8]), ['whoosh', T.burst[0], 0.4, 0.045], ['tom', T.burst[1], 80, { gain: 0.2, decay: 0.3 }], ['pop', 66.2, 392, 0.03, 0],
  ...adviseCues(ADVISE),
  ...popCues(CAPS[9]), ['whoosh', T.push, 0.4, 0.045], ['glitter', 94.0, 94.6],
  ...popCues(CAPS[10]), ['tom', T.poof, 100, { gain: 0.16, decay: 0.3 }], ['glitter', T.poof, r3(T.poof + 0.8)], ['bell', 100.4, 1760, 0.03, 1.4, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Bb' }),
  ...captionCues(CAPS[11]), ['riser', T.streak[0], T.streak[1], 0.02], ['bell', T.streak[1], 2093, 0.03, 1.6, 0], ['glitter', T.look, r3(T.look + 0.6)], ['pop', T.away, 523.25, 0.03, 0],
  ...nextTimeCues(T.next), ...popCues(CAPS[12]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [LI]: 987.77, [SC]: 587.33, [LS]: 932, [GE]: 1046.5 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
].filter(c => c[1] >= 0)
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
