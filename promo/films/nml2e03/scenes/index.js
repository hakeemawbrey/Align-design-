// nml2e03 — MOONLIGHT LANE, Ep 3: "The Borrowed Scarf" (Season 2: Winter on the Lane; 120 s vertical, star_advice; lofi · Ab).
// Rows: promo/films/next30/b19.md. Show kit: ../../mlpilot/scenes/mlkit.js. Winter add-ons: ../../nml2e01/scenes/winter.js.
//   0.0–5.0    COLD OPEN  "Day four of | *keeping the scarf.*" (TUESDAY · 8:40 PM). ♋ Cancer twirls in ♐ Sagittarius' gold
//              scarf. "I’ll give it back. *eventually.*"
//   5.0–7.0    ◀◀ PREVIOUSLY ON (the market lights · two pairs of hands · the scarf)
//   7.0–10.0   TITLE CARD  Ep 3 · The Borrowed Scarf.
//  10.0–20.0   ACT 1  "It’s a scarf. | Or is it a *sign?*" Day 1 on a hook, day 2 folded, day 3 on its own little pillow.
//  20.0–31.0   The lane chat: ♌ Leo "keep it. it’s a love scarf." ♊ Gemini "return it with a four-page letter."
//              ♍ Virgo "wash it cold. gently." ♓ Pisces "the scarf is a metaphor (sobbing)".
//  31.0–40.0   "The perfect | *return.*" A gift box, a ribbon, a speech on nine cards.
//  40.0        card cut.
//  40.0–48.0   ACT 2  "Meanwhile: | *no scarf.*" Sag on the lane, sneezing.
//  48.0–56.0   "At the door. | *Panic.*" Cancer hangs the box on the knob, bolts, dives into a snowbank.
//  56.0–62.0   Sag opens the door, reads card 1 of 9: "…‘Dear Sagittarius, this scarf has *meant*’…?"
//  62.0–70.0   "Snowbank. | Population: *one.*" "the scarf was supposed to *say* it."
//  70.0–90.0   ★ THE STARS ADVISE: A kind thing is just kind · Things can’t talk for you · Give it back warmly.
//  90.0–104.0  ACT 3  "thanks for keeping me warm. walk home *tomorrow?*" "only if you wear *this* one." A lumpy hand-knit
//              scarf. "it’s… *lumpy.*" "it’s *perfect.*"
// 104.0–108.0  ★ LESSON UNLOCKED "A scarf can’t | *say it for you.*" +1 LUMPY SCARF
// 108.0–111.6  LANE TAG  ♎ Libra at the flower stall gets two invitations for the same Saturday (Leo, ♏ Scorpio).
// 111.6–115.6  NEXT TIME ON Moonlight Lane… "Libra says yes to *both.*" · last line "Thanks for keeping me | *warm.*"
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, MONO, r3, pop01, outK, bump, loadFonts,
  drawLane, LANE, standY, drawPisces, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues, buildNextTime, nextTimeCues, popCues,
  drawBubble, drawPhone, sparkles,
} from '../../mlpilot/scenes/mlkit.js'
import { snowfall, laneSnow, windowSnow, worn, actor, key, drawMarket, drawScarfProp, drawSnowbank, drawLantern } from '../../nml2e01/scenes/winter.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN
const lab = (s, n) => `${signStar(s).glyph}︎ ${n}`
const CS = lab('cancer', 'CANCER'), GS = lab('sagittarius', 'SAGITTARIUS')
const CAN_C = '#8fd8ff', SAG_C = '#d2b0ff'
const GOLDS = '#ffd36e', KNIT = '#ff8fb1'
const CAN_W = { hat: '#ff8fb1' }

const T = {
  prev: [5.0, 7.0], title: 7.0,
  days: [10.6, 13.0, 15.4], chat: 20.0, chatIn: [20.2, 20.6], chatOut: [30.5, 30.9],
  build: 31.0, box: 32.0, ribbon: 33.2, cards: 35.6,
  sneeze: [42.4, 45.2, 47.0], door: 48.0, hang: 51.6, bolt: [52.4, 53.4], open: 56.4, read: 58.0, snow: 62.0,
  advise: 70.0, adviseOut: [89.55, 90.0], cards3: [71.2, 77.2, 83.2],
  act3: 90.0, knock: 90.6, give: 93.6, knit: 96.6, wrap: [101.2, 102.0],
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, inv1: 108.6, inv2: 109.7,
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'A scarf can’t | *say it for you.*', chip: '+1 LUMPY SCARF' }

const CPS = 28
const L0 = [{ t: 0.6, speaker: CS, color: CAN_C, text: 'I’ll give it back. *eventually.*' }]
const L1 = [{ t: 17.0, speaker: CS, color: CAN_C, text: 'a scarf is *just* a scarf. right?' }]
const L2 = [{ t: 34.2, speaker: CS, color: CAN_C, text: 'card one of nine: “Dear *Sagittarius…*”' }]
const L3 = [{ t: 63.0, speaker: CS, color: CAN_C, text: 'the scarf was supposed to *say* it.' }, { t: 66.4, speaker: CS, color: CAN_C, text: '(also, I live here now.)' }]
const L4 = [
  { t: 91.6, speaker: CS, color: CAN_C, text: 'thanks for keeping me warm. walk home *tomorrow?*' },
  { t: 95.2, speaker: GS, color: SAG_C, text: 'only if you wear *this* one.' },
  { t: 98.2, speaker: GS, color: SAG_C, text: 'I made it. it’s… *lumpy.*' },
  { t: 100.6, speaker: CS, color: CAN_C, text: 'it’s *perfect.*' },
]
const BOXES = [[L0, 0.4, 4.9], [L1, 16.8, 19.8], [L2, 34.0, 39.6], [L3, 62.8, 69.5], [L4, 91.4, 103.9]]
const ALL_LINES = BOXES.flatMap(b => b[0])

const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards3[0], icon: 'heart', head: 'A kind thing is *just kind.*', body: 'Don’t turn a sweet moment into a riddle to solve.' },
    { at: T.cards3[1], icon: 'chat', head: 'Things can’t *talk* for you.', body: 'A scarf, a gift, a playlist can’t say what you mean.' },
    { at: T.cards3[2], icon: 'moon', head: 'Give it back *warmly.*', body: '“Thanks for keeping me warm. Walk home tomorrow?”' },
  ],
  lines: [
    { t: 71.05, text: 'Cancer, this one’s *yours.*' },
    { t: 73.95, text: 'you read a whole *novel* into a scarf.' },
    { t: 77.5, text: 'maybe it meant: *you looked cold.*' },
    { t: 80.4, text: 'that’s already sweet. let it be *sweet.*' },
    { t: 83.5, text: 'keep it simple. one *warm* line.' },
    { t: 86.5, text: 'and maybe… *leave the snowbank.*' },
  ],
}

const CAPS = [
  { text: 'Day four of | *keeping the scarf.*', kicker: 'TUESDAY · 8:40 PM', at: -1.2, out: [4.75, 4.95], late: 3, lateAt: -0.8, size: 86 },
  { text: 'It’s a scarf. | Or is it a *sign?*', at: 10.25, out: [16.6, 16.8], late: 1, lateAt: 11.0, size: 88 },
  { text: 'The lane | *weighs in.*', at: 20.25, out: [30.6, 30.85], late: 2, lateAt: 20.8 },
  { text: 'The perfect | *return.*', at: 31.15, out: [39.55, 39.8], late: 1, lateAt: 31.7 },
  { text: 'Meanwhile: | *no scarf.*', at: 40.3, out: [47.7, 47.95], late: 2, lateAt: 40.9 },
  { text: 'At the door. | *Panic.*', at: 48.15, out: [55.8, 56.05], late: 1, lateAt: 48.8 },
  { text: 'Card one | *of nine.*', at: 56.25, out: [61.6, 61.85], late: 2, lateAt: 56.9 },
  { text: 'Snowbank. | Population: *one.*', at: 62.15, out: [69.35, 69.6], late: 1, lateAt: 62.8, size: 88 },
  { text: 'One warm | *line.*', at: 90.25, out: [96.2, 96.45], late: 1, lateAt: 90.85, size: 104 },
  { text: 'Knit by | *hand.*', at: 96.6, out: [103.65, 103.85], late: 1, lateAt: 97.2, size: 104 },
  { text: 'Two invitations. | *Same Saturday.*', kicker: 'MEANWHILE', at: 108.15, out: [111.3, 111.5], late: 2, lateAt: 108.8, size: 84 },
  { text: 'Thanks for keeping me | *warm.*', at: 112.5, out: [115.05, 115.4], size: 92, late: 0, top: 300 },
]
const CHAT = [
  { at: 21.2, side: 'L', text: 'Leo: keep it. it’s a love scarf.' },
  { at: 23.4, side: 'L', text: 'Gemini: return it w/ a 4-page letter' },
  { at: 25.6, side: 'L', text: 'Virgo: wash it cold. gently.' },
  { at: 27.6, side: 'L', text: 'Pisces: the scarf is a metaphor' },
  { at: 28.9, side: 'L', text: 'Pisces: (sobbing)' },
]
const CAN_HOPS = talkHops(ALL_LINES, CS, { cps: CPS }), SAG_HOPS = talkHops(ALL_LINES, GS, { cps: CPS })
// the door scenes: the lane's home-row door, zoomed in
const DZ = 1.4, DSX = wx => (wx - 540) * DZ + 540, DSY = wy => (wy - 1420) * DZ + 1420

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '700 30px Inter', "italic 600 40px 'EB Garamond'"])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'Libra says yes to *both.*' })
  const title = buildTitle(root, { ep: 3, title: 'The Borrowed Scarf', at: T.title, len: 3 })
  const ST = { x: 640, w: 470 }
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0], stills: [
    { caption: 'The lights went up.', crop: [120, 900, 840, 1000], scene: c => drawLane(c, 97, { pan: 100, zoom: 1.55, focus: [540, 1420] }, w => { laneSnow(w, 97, { depth: 0.85 }); worn(w, 'sagittarius', 640, standY(200, 1300), 200, 97, { mood: 'sparkle' }, { scarf: GOLDS }); worn(w, 'cancer', 840, standY(200, 1300), 200, 97, { mood: 'heart' }, CAN_W); drawMarket(w, ST.x, LANE.feet, 97, { w: ST.w, goods: 'lanterns', lights: 1 }) }) },
    { caption: '“Can you hold this end?”', crop: [120, 900, 840, 1000], scene: c => drawLane(c, 92, { pan: 100, zoom: 1.55, focus: [540, 1420] }, w => { laneSnow(w, 92, { depth: 0.85 }); worn(w, 'sagittarius', 640, standY(200, 1300), 200, 92, { mood: 'happy', blush: 0.9 }, { scarf: GOLDS }); worn(w, 'cancer', 840, standY(200, 1300), 200, 92, { mood: 'sparkle' }, CAN_W); drawMarket(w, ST.x, LANE.feet, 92, { w: ST.w, goods: 'lanterns', lights: 0, sag: 1 }) }) },
    { caption: 'Cold hands. Warm scarf.', crop: [120, 860, 840, 1000], scene: c => drawLane(c, 110, { time: 'late', pan: 380 }, w => { laneSnow(w, 110, { depth: 0.9 }); worn(w, 'cancer', 760, standY(220), 220, 110, { mood: 'heart' }, { ...CAN_W, scarf: GOLDS }); worn(w, 'sagittarius', 1000, standY(220), 220, 110, { mood: 'happy' }, {}) }) },
  ] })
  const bug = showBug(root, 3, { at: -1 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function apt(t, depth = 0.8) {
    drawApartment(x, t, { lamp: 1 })
    windowSnow(x, t, [APT.window.x, APT.window.y, APT.window.w, APT.window.h], { depth, seed: 11 })
  }
  // ── cold open: the twirl
  function coldOpen(t) {
    apt(t)
    const spin = Math.sin(t * 3.2) * 0.12
    actor(x, t, { sign: 'cancer', size: 270, x: 540 + Math.sin(t * 1.6) * 60, y: 1440, seed: 2, walk: false, rot: spin, hops: [0.0, 0.8, 1.6, 2.4, 3.2, 4.0],
      moods: [[-1, 'heart', undefined, 1], [0.6, 'happy', undefined, 1], [2.4, 'wink', [1, 0], 1]], wear: { ...CAN_W, scarf: GOLDS } })
    for (let i = 0; i < 5; i++) { const ph = (t * 0.5 + i / 5) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9; x.fillStyle = PINK; x.fillRect(380 + i * 80, 1130 - ph * 220, 14, 14); x.fillRect(374 + i * 80, 1136 - ph * 220, 26, 4); x.restore() }
  }
  // ── act 1: the scarf montage, the lane chat, the perfect return
  function act1(t) {
    apt(t)
    const day = t < T.days[1] ? 0 : t < T.days[2] ? 1 : 2
    if (t < T.chat) {
      const kind = ['hook', 'folded', 'pillow'][day], at = T.days[day]
      const k = pop01(t, at, 0.3, 2)
      const pos = [[300, 760], [540, 1210], [540, 1180]][day]
      actor(x, t, { sign: 'cancer', size: 220, x: day === 0 ? 690 : 800, y: APT.couch.seatY, seed: 2, walk: false, hops: [...T.days, ...CAN_HOPS],
        moods: [[0, 'heart', [-1, -1], 0.9], [16.8, 'squint', [-1, 0]], [18.8, 'heart', [-1, 0], 1]], wear: CAN_W })
      if (day === 0) { x.fillStyle = INK; x.fillRect(pos[0] - 8, pos[1] - 100, 16, 16) }
      drawScarfProp(x, pos[0], pos[1], 7 * k, t, { col: GOLDS, kind })
      drawBubble(x, 540, 1000, ['DAY 1', 'DAY 2', 'DAY 3'][day], { size: 34, col: ML_GOLD, k: pop01(t, at, 0.25, 2.2) * outK(t, [at + 2.0, at + 2.2]), tail: null })
      if (day === 2) sparkles(x, t, 540, 1150, T.days[2], 10, 160, 3)
      return
    }
    if (t < T.build) {
      drawScarfProp(x, 300, 1210, 6, t, { col: GOLDS, kind: 'pillow' })
      actor(x, t, { sign: 'cancer', size: 220, x: 800, y: APT.couch.seatY, seed: 2, walk: false, hops: CHAT.map(m => m.at + 0.1),
        moods: [[0, 'neutral', [-1, -1]], [21.3, 'heart', [-1, -1], 1], [23.5, 'wide', [-1, -1]], [25.7, 'squint', [-1, -1]], [27.7, 'wide', [-1, -1]]], wear: { ...CAN_W, scarf: GOLDS } })
      const pin = ease.outBack(prog(t, ...T.chatIn)), po = ease.inCubic(prog(t, ...T.chatOut))
      drawPhone(x, 470, 860 + (1 - pin) * 1100 + po * 1100, 560, 640, t, { title: 'the lane chat', msgs: CHAT, typing: [26.6, 27.6] })
      return
    }
    // the perfect return: the box, the ribbon, nine cards fanned out on the rug
    const bk = pop01(t, T.box, 0.3, 2)
    drawScarfProp(x, 540, 1300, 9 * bk, t, { col: GOLDS, kind: 'box' })
    if (t < T.ribbon) drawScarfProp(x, 540, 1170 - (1 - prog(t, T.box, T.ribbon)) * 80, 6, t, { col: GOLDS, kind: 'folded' })
    sparkles(x, t, 540, 1220, T.ribbon, 10, 170, 4)
    for (let i = 0; i < 9; i++) {
      const k = pop01(t, T.cards + i * 0.22, 0.25, 2)
      if (k <= 0.01) continue
      x.save(); x.translate(210 + i * 82, 1590 - Math.abs(i - 4) * 14); x.rotate((i - 4) * 0.08); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-38, -52, 76, 104); x.fillStyle = '#fbf3e2'; x.fillRect(-34, -48, 68, 96)
      x.fillStyle = '#c0a080'; for (let l = 0; l < 5; l++) x.fillRect(-24, -30 + l * 14, 48 - (l % 2) * 14, 4)
      x.fillStyle = INK; x.font = `700 16px ${MONO}`; x.textAlign = 'center'; x.fillText(`${i + 1}/9`, 0, 40)
      x.restore()
    }
    actor(x, t, { sign: 'cancer', size: 220, x: [[31, 860], [32.6, 820]], y: APT.couch.seatY, seed: 2, hops: [T.box, T.ribbon, ...CAN_HOPS], moods: [[0, 'sparkle', [-1, 1]], [36.0, 'happy', [-1, 1]], [38.4, 'squint', [-1, 1]]], wear: { ...CAN_W, scarf: GOLDS } })
  }
  // ── act 2
  function meanwhile(t) {
    drawLane(x, t, { time: 'night', pan: 640 }, c => {
      laneSnow(c, t, { depth: 0.85 })
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 2, look: [1, 1], pull: bump(t, 45.3, 0.5) })
      const sn = T.sneeze.reduce((a, s) => a + bump(t, s, 0.35), 0)
      actor(c, t, { sign: 'sagittarius', size: 220, x: [[40, 1780], [47.9, 860]], xEase: ease.linear, seed: 4, step: 0.45, squash: -0.1 * sn,
        moods: [[0, 'neutral', [-1, 0]], ...T.sneeze.flatMap(s => [[s - 0.3, 'squint', [0, -1]], [s + 0.4, 'neutral', [-1, 0]]])] })
    })
    snowfall(x, t, { n: 150, seed: 12, wind: 0.6 })
    const sx = key(t, [[40, 1780], [47.9, 860]], ease.linear) - 640
    T.sneeze.forEach((s, i) => drawBubble(x, sx + 40, 1060 - i * 10, i === 2 ? 'ACHOO!!' : 'achoo!', { size: 30 + i * 4, k: pop01(t, s, 0.2, 2.4) * outK(t, [s + 0.9, s + 1.1]) }))
  }
  function doorScene(t, act3 = false) {
    drawLane(x, t, { time: 'night', pan: 0, zoom: DZ, focus: [540, 1420], lit: ['a0', 'a2', 'a3', 'a4', 'a6', 'pisces', 'cafe'] }, c => {
      laneSnow(c, t, { depth: 0.9 })
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 3, look: [-1, 1], pull: bump(t, 64.4, 0.6) + bump(t, 101.4, 0.6) })
      const opened = act3 ? clamp(prog(t, 92.2, 92.6)) : clamp(prog(t, T.open, T.open + 0.4))
      if (opened > 0) { c.fillStyle = '#ffcf7a'; c.fillRect(388, 1178, 74 * opened, 152); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(425, 1260, 0, 425, 1260, 260); g.addColorStop(0, `rgba(255,190,100,${0.35 * opened})`); g.addColorStop(1, 'rgba(255,190,100,0)'); c.fillStyle = g; c.fillRect(165, 1000, 520, 520); c.globalCompositeOperation = 'source-over' }
      // the snowbank by the café, and whoever's in it
      const inBank = !act3 && t > T.bolt[1]
      if (!act3) {
        if (!inBank) {
          actor(c, t, { sign: 'cancer', size: 190, x: [[48, 900], [49.4, 560], [T.hang, 560], [T.hang + 0.3, 500], [T.bolt[0], 520], [T.bolt[1], 740]], seed: 2, step: 0.3,
            moods: [[0, 'neutral', [-1, 0]], [49.6, 'squint', [-1, 0]], [50.6, 'wide', [-1, -1]], [T.bolt[0], 'wide', [1, 0]]], wear: { ...CAN_W, scarf: t < T.hang ? null : null }, squash: 0.05 * Math.sin(t * 30) * (t > 50.6 && t < T.bolt[0] ? 1 : 0) })
          if (t < T.hang) drawScarfProp(c, key(t, [[48, 900], [49.4, 560]]) + 70, 1330, 3.4, t, { kind: 'box' })
        } else {
          // only the hat and the eyes, peeking out of the drift
          const peek = t > 57.6 ? 1 : 0.4
          actor(c, t, { sign: 'cancer', size: 190, x: 740, y: t > 57.6 ? 1385 : 1430, seed: 2, walk: false, moods: [[0, 'wide', [-1, 0]], [62.8, 'squint', [0, 1]], [66.3, 'neutral', [0, 1]]], wear: CAN_W, hops: talkHops(ALL_LINES, CS, { cps: CPS }) })
        }
        drawSnowbank(c, 600, 1530, 280, 240, 7)
        if (t > T.hang && t < T.open + 1.2) drawScarfProp(c, 455, 1270 + Math.sin(t * 4) * 3, 3, t, { kind: 'box' })
        if (t > T.open) {
          actor(c, t, { sign: 'sagittarius', size: 190, x: [[T.open, 425], [T.open + 1, 430]], y: [[T.open, 1330], [T.open + 0.6, LANE.feet]], seed: 4, walk: false, hops: [T.open + 0.3, T.read + 0.6],
            moods: [[0, 'happy', [1, 0]], [T.open + 0.9, 'wide', [0, 1]], [T.read, 'squint', [0, 1]], [60.4, 'neutral', [1, 0]]] })
          if (t > T.open + 1.0) {   // the card, read
            c.save(); c.translate(500, 1300); c.rotate(-0.1); c.fillStyle = INK; c.fillRect(-30, -40, 60, 80); c.fillStyle = '#fbf3e2'; c.fillRect(-27, -37, 54, 74); c.fillStyle = INK; c.font = `700 13px ${MONO}`; c.textAlign = 'center'; c.fillText('1/9', 0, 28); c.restore()
            drawScarfProp(c, 340, 1400, 2.6, t, { kind: 'box' })
          }
        }
      } else {
        // act 3: Cancer at the door with the scarf; Sag comes out with the knitted one
        const wk = ease.inOutCubic(prog(t, ...T.wrap))
        actor(c, t, { sign: 'cancer', size: 200, x: [[90, 900], [91.2, 600]], seed: 2, step: 0.32, hops: [T.knock, T.knock + 0.25, T.knock + 0.5, ...CAN_HOPS, T.wrap[1] + 0.1],
          moods: [[0, 'neutral', [-1, 0]], [91.6, 'neutral', [-1, 0], 0.6], [95.2, 'wide', [-1, 0]], [96.8, 'sparkle', [-1, 0], 0.9], [100.6, 'heart', undefined, 1]],
          wear: { ...CAN_W, scarf: wk > 0 ? KNIT : null, scarfK: wk, lumpy: true } })
        if (t < T.give + 0.6) drawScarfProp(c, key(t, [[90, 900], [91.2, 600]]) - 40, 1300, 3, t, { col: GOLDS, kind: 'folded' })
        if (t > 92.2) {
          const giveK = prog(t, T.give, T.give + 0.5)
          actor(c, t, { sign: 'sagittarius', size: 200, x: [[92.2, 425], [93.0, 410]], y: [[92.2, 1330], [92.8, LANE.feet]], seed: 4, walk: false, hops: [92.6, ...SAG_HOPS, T.knit, T.wrap[0]],
            moods: [[0, 'happy', [1, 0]], [93.0, 'sparkle', [1, 0]], [95.0, 'happy', [1, 0], 0.9], [98.2, 'squint', [1, 0], 1], [100.7, 'heart', undefined, 1]], wear: { scarf: giveK > 0.5 ? GOLDS : null } })
          // the knitted scarf, held out, then wrapped
          if (t > T.knit && t < T.wrap[0]) { const k = pop01(t, T.knit, 0.3, 2); drawScarfProp(c, 505, 1290, 3.2 * k, t, { col: KNIT, kind: 'folded', lumpy: true }); c.fillStyle = ML_GOLD; c.fillRect(495, 1276, 8, 8) }
        }
        sparkles(c, t, 505, 1240, T.knit, 10, 140, 6, [PINK, ML_GOLD, BONE])
        sparkles(c, t, 600, 1200, T.wrap[1], 12, 170, 7, [PINK, '#ffb3d9', ML_GOLD])
      }
    })
    snowfall(x, t, { n: 140, seed: 13 })
    if (!act3) drawBubble(x, DSX(560), 900, '“Dear Sagittarius, this scarf has meant…”', { size: 26, k: pop01(t, T.read, 0.25, 2) * outK(t, [61.6, 61.85]) })
  }
  function tag(t) {
    drawLane(x, t, { time: 'night', pan: 1080, lit: ['d1', 'd3', 'd4', 'd6', 'd9', 'c3'] }, c => {
      laneSnow(c, t, { depth: 0.85 })
      actor(c, t, { sign: 'libra', size: 220, x: 1860, seed: 10, walk: false, hops: [T.inv1 + 0.4, T.inv2 + 0.4, 110.8, 111.1],
        moods: [[0, 'happy', [1, 0]], [T.inv1 + 0.3, 'sparkle', [-1, 0]], [T.inv2 + 0.3, 'sparkle', [1, 0]], [110.6, 'wide', [0, -1]]], wear: { hat: '#7dffb0' } })
      actor(c, t, { sign: 'leo', size: 210, x: [[108, 1300], [T.inv1, 1640]], seed: 7, moods: [[0, 'sparkle', [1, 0]]] })
      actor(c, t, { sign: 'scorpio', size: 210, x: [[108, 2400], [T.inv2 - 0.6, 2400], [T.inv2, 2060]], seed: 11, moods: [[0, 'happy', [-1, 0], 0.8]] })
      const card = (X, Y, k, txt, col) => { if (k <= 0.01) return; c.save(); c.translate(X, Y); c.scale(k, k); c.rotate(X < 1860 ? -0.12 : 0.12); c.fillStyle = INK; c.fillRect(-70, -46, 140, 92); c.fillStyle = col; c.fillRect(-64, -40, 128, 80); c.fillStyle = INK; c.font = `700 20px ${MONO}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, -10); c.fillText('SAT · 8 PM', 0, 18); c.restore() }
      card(1730, 1110, pop01(t, T.inv1, 0.3, 2), 'PARTY!', '#ffd36e')
      card(1990, 1110, pop01(t, T.inv2, 0.3, 2), 'BAKE?', '#ffb3d9')
    })
    snowfall(x, t, { n: 110, seed: 14 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.prev[0]) coldOpen(t)
      else if (t < 10) drawSky(x, t, SKY_H)
      else if (t < 40) act1(t)
      else if (t < T.door) meanwhile(t)
      else if (t < T.act3) { if (t < T.advise + 0.7) doorScene(t); else drawSky(x, t, SKY_H) }
      else if (t < T.tag) doorScene(t, true)
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

const CUTS = [31.0, 40.0, 62.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

const NOTE = [830.61, 932.33, 1046.5, 1108.73, 1244.51, 1396.91, 1567.98]   // Ab major
export const CUES = [
  ...[0.0, 0.8, 1.6, 2.4, 3.2, 4.0].map((a, i) => ['pop', a, NOTE[i % 7], 0.025, i % 2 ? 0.3 : -0.3]),
  ...previouslyCues(T.prev[0], 3, T.prev[1] - T.prev[0]),
  ...titleCues(T.title, 3),
  ...popCues(CAPS[1]), ...T.days.map((a, i) => ['pop', a, NOTE[i + 2], 0.04, (i - 1) * 0.3]), ['glitter', T.days[2], r3(T.days[2] + 0.6)],
  ...popCues(CAPS[2]), ['whoosh', T.chatIn[0], 0.4, 0.04], ...CHAT.map((m, i) => ['pop', m.at, NOTE[i % 7] * 0.75, 0.045, -0.25]), ['tick', 26.6, 0.02], ['tick', 26.75, 0.02], ['whoosh', T.chatOut[0], 0.35, 0.03],
  ...popCues(CAPS[3]), ['pop', T.box, 1046.5, 0.04, 0], ['glitter', T.ribbon, r3(T.ribbon + 0.5)], ...Array.from({ length: 9 }, (_, i) => ['tick', r3(T.cards + i * 0.22), 0.03]),
  ...popCues(CAPS[4]), ...T.sneeze.map((s, i) => ['tom', s, 110 - i * 10, { gain: 0.18 + i * 0.04, decay: 0.2 }]),
  ...popCues(CAPS[5]), ['tick', T.hang, 0.05], ['whoosh', T.bolt[0], 0.4, 0.05], ['tom', T.bolt[1], 70, { gain: 0.25, decay: 0.35 }],
  ...popCues(CAPS[6]), ['tick', T.open, 0.04], ['pop', T.open + 0.2, 659.25, 0.03, -0.2], ['pop', T.read, 523.25, 0.03, -0.2],
  ...popCues(CAPS[7]),
  ...adviseCues(ADVISE),
  ...popCues(CAPS[8]), ['tick', T.knock, 0.06], ['tick', T.knock + 0.25, 0.06], ['tick', T.knock + 0.5, 0.06], ['tick', 92.2, 0.04],
  ...popCues(CAPS[9]), ['pop', T.knit, 1244.51, 0.045, 0], ['glitter', T.knit, r3(T.knit + 0.5)], ['bell', T.wrap[1], 1760, 0.035, 1.6, 0], ['glitter', T.wrap[1], r3(T.wrap[1] + 0.7)],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Ab' }),
  ...captionCues(CAPS[10]), ['pop', T.inv1, 1046.5, 0.04, -0.3], ['pop', T.inv2, 1244.51, 0.04, 0.3], ['pop', 110.6, 392, 0.03, 0],
  ...nextTimeCues(T.next), ...popCues(CAPS[11]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CS]: 880, [GS]: 659.25 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
].filter(c => c[1] >= 0)
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
