// nml2e02 — MOONLIGHT LANE, Ep 2: "The Market Stall" (Season 2: Winter on the Lane; 120 s vertical, star_advice; jazzy · F).
// Rows: promo/films/next30/b19.md. Show kit: ../../mlpilot/scenes/mlkit.js. Winter add-ons: ../../nml2e01/scenes/winter.js.
//   0.0–5.0    COLD OPEN  "Sagittarius: | *“I’ve got it.”*" (MARKET DAY · 4:30 PM). ♐ Sag carries a teetering tower of
//              star lanterns; ♋ Cancer: "need a hand?" "nope! I’ve *got* it!" (the top one tips; Sag catches it).
//   5.0–7.0    ◀◀ PREVIOUSLY ON (the first snow · the talk card · five points)
//   7.0–10.0   TITLE CARD  Ep 2 · The Market Stall.
//  10.0–20.0   ACT 1  "The market | *opens.*" Stalls on the corner; one stall, two halves: cookies and lanterns.
//              "you do cookies. I’ll do… *everything else.*"
//  20.0–31.0   "Three offers. | *Three no’s.*" hold the ladder? / watch the till? / carry the— · got it. got it! GOT IT.
//  31.0–40.0   "Then: | the *rush.*" a queue; ♊ Gemini’s bad advice: "never let them see you *need* help."
//  40.0        card cut.
//  40.0–52.0   ACT 2  "It’s… | *a lot.*" the lights tangle, the snow sags the canopy, a lantern rolls off, the queue grows.
//  52.0–62.0   "Help, | *declined.*" Cancer, quietly: "you know I *like* helping, right?" and steps back.
//  62.0–70.0   Sag alone under the sagging canopy with one unlit lantern; ♓ Pisces cries buying an ornament.
//  70.0–90.0   ★ THE STARS ADVISE: Help is closeness · Independent isn’t alone · Say “yes, thank you.”
//  90.0–104.0  ACT 3  "actually… can you hold this end?" The canopy is cleared, the lights go up, the queue is served,
//              the last lantern goes to Pisces. "we’re a good *team.*"
// 104.0–108.0  ★ LESSON UNLOCKED "Let them | *hold the ladder.*" +1 EXTRA PAIR OF HANDS
// 108.0–111.6  LANE TAG  packing up: Cancer shivers; Sag wraps their gold scarf round Cancer. "Cold hands. | *Warm scarf.*"
// 111.6–115.6  NEXT TIME ON Moonlight Lane… "Cancer has the *scarf.* Now what?" · last line "*Yes,* thank you."
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
  drawLane, LANE, standY, drawPisces, drawCafe, drawCafeTable, CAFE,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues, buildNextTime, nextTimeCues, popCues,
  drawBubble, sparkles,
} from '../../mlpilot/scenes/mlkit.js'
import { snowfall, laneSnow, windowSnow, worn, actor, key, drawSnowStar, drawTalkCard, drawMarket, drawLantern } from '../../nml2e01/scenes/winter.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN
const SS = signStar
const lab = (s, n) => `${SS(s).glyph}︎ ${n}`
const CS = lab('cancer', 'CANCER'), GS = lab('sagittarius', 'SAGITTARIUS'), GE = lab('gemini', 'GEMINI')
const CAN_C = '#8fd8ff', SAG_C = '#d2b0ff', GEM_C = '#ffe27a'
const CAN_W = { hat: '#ff8fb1' }, SAG_W = { scarf: '#ffd36e' }
const LCOL = ['#ffd36e', '#ff8fb1', '#7fe0ff', '#7dffb0', '#c9a6ff']

const T = {
  prev: [5.0, 7.0], title: 7.0,
  open: 10.0, offers: 20.0, ladder: [20.0, 23.6], till: [23.6, 27.2], crate: [27.2, 31.0], rush: 31.0,
  mess: 40.0, tangle: 40.7, roll: [43.6, 46.6], lowpt: 52.0, step: [55.4, 56.6], alone: 62.0,
  advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, walk: [90.3, 91.0], clear: [95.0, 95.8], up: 96.6, serve: [97.6, 100.4], lastSale: 100.6,
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, shiver: 108.4, wrap: [109.3, 110.1],
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Let them | *hold the ladder.*', chip: '+1 EXTRA PAIR OF HANDS' }

const CPS = 28
const L0 = [
  { t: 0.7, speaker: CS, color: CAN_C, text: 'need a hand?' },
  { t: 2.2, speaker: GS, color: SAG_C, text: 'nope! I’ve *got* it!' },
]
const L1 = [
  { t: 13.6, speaker: CS, color: CAN_C, text: 'cookies left, lanterns right?' },
  { t: 16.3, speaker: GS, color: SAG_C, text: 'you do cookies. I’ll do… *everything else.*' },
]
const L2 = [
  { t: 20.6, speaker: CS, color: CAN_C, text: 'hold the ladder?' }, { t: 22.2, speaker: GS, color: SAG_C, text: 'got it.' },
  { t: 24.2, speaker: CS, color: CAN_C, text: 'watch the till?' }, { t: 25.8, speaker: GS, color: SAG_C, text: 'got it!' },
  { t: 27.8, speaker: CS, color: CAN_C, text: 'carry the—' }, { t: 28.7, speaker: GS, color: SAG_C, text: '*GOT IT.*' },
]
const L3 = [{ t: 33.6, speaker: GE, color: GEM_C, text: 'tip: never let them see you *need* help.' }]
const L4 = [{ t: 53.0, speaker: CS, color: CAN_C, text: 'you know I *like* helping, right?' }]
const L5 = [{ t: 64.4, speaker: GS, color: SAG_C, text: 'why is “yes” so *hard* to say?' }]
const L6 = [
  { t: 91.0, speaker: GS, color: SAG_C, text: 'actually… can you hold this *end?*' },
  { t: 93.7, speaker: CS, color: CAN_C, text: '*yes.* I thought you’d never ask.' },
]
const L7 = [{ t: 101.0, speaker: GS, color: SAG_C, text: 'we’re a good *team.*' }]
const BOXES = [[L0, 0.5, 4.9], [L1, 13.4, 19.8], [L2, 20.4, 30.9], [L3, 33.4, 39.6], [L4, 52.8, 58.2], [L5, 64.2, 69.5], [L6, 90.8, 96.4], [L7, 100.8, 103.9]]
const ALL_LINES = BOXES.flatMap(b => b[0])

const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'heart', head: 'Help is *closeness.*', body: 'Letting someone in is a gift to them, too.' },
    { at: T.cards[1], icon: 'star', head: 'Independent isn’t *alone.*', body: 'You can do it yourself, and still not have to.' },
    { at: T.cards[2], icon: 'check', head: 'Say *“yes, thank you.”*', body: '“Actually… can you hold this end?”' },
  ],
  lines: [
    { t: 71.05, text: 'Sagittarius, this one’s *yours.*' },
    { t: 73.95, text: 'doing it all alone isn’t *strength.*' },
    { t: 77.5, text: 'they offered because they *like* you.' },
    { t: 80.4, text: 'free spirit. still allowed a *ladder holder.*' },
    { t: 83.5, text: 'one small yes. that’s *it.*' },
    { t: 86.5, text: 'try it tonight. at the *stall.*' },
  ],
}

const CAPS = [
  { text: 'Sagittarius: | *“I’ve got it.”*', kicker: 'MARKET DAY · 4:30 PM', at: -1.2, out: [4.75, 4.95], late: 3, lateAt: -0.8, size: 86 },
  { text: 'The market | *opens.*', at: 10.3, out: [19.6, 19.85], late: 1, lateAt: 10.9 },
  { text: 'Three offers. | *Three no’s.*', at: 20.15, out: [30.6, 30.85], late: 2, lateAt: 20.6 },
  { text: 'Then: | the *rush.*', kicker: '6:00 PM', at: 31.15, out: [39.55, 39.8], late: 1, lateAt: 31.8 },
  { text: 'It’s… | *a lot.*', at: 40.3, out: [51.6, 51.85], late: 2, lateAt: 40.9, size: 104 },
  { text: 'Help, | *declined.*', at: 52.15, out: [61.6, 61.85], late: 1, lateAt: 52.7 },
  { text: 'One lantern. | *Unlit.*', kicker: '8:45 PM', at: 62.15, out: [69.35, 69.6], late: 1, lateAt: 62.9 },
  { text: 'One small | *yes.*', at: 90.25, out: [94.8, 95.05], late: 1, lateAt: 90.85, size: 104 },
  { text: 'Two pairs | of *hands.*', at: 95.3, out: [103.65, 103.85], late: 1, lateAt: 95.9 },
  { text: 'Cold hands. | *Warm scarf.*', kicker: 'PACKING UP', at: 108.15, out: [111.3, 111.5], late: 2, lateAt: 108.7 },
  { text: '*Yes,* | thank you.', at: 112.5, out: [115.05, 115.4], size: 110, late: 0, top: 300 },
]

const CAN_HOPS = talkHops(ALL_LINES, CS, { cps: CPS }), SAG_HOPS = talkHops(ALL_LINES, GS, { cps: CPS })
const STALL = { x: 640, w: 470 }        // the shared stall (world = screen at pan 0)
const BEHIND = 1300
const ZM = 1.55, MPAN = 100
const SX = wx => (wx - MPAN - 540) * ZM + 540, SY = wy => (wy - 1420) * ZM + 1420   // market world → screen                       // feet-y for a star standing behind the counter

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '700 30px Inter', "italic 600 40px 'EB Garamond'"])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: 'Cancer has the *scarf.* Now what?' })
  const title = buildTitle(root, { ep: 2, title: 'The Market Stall', at: T.title, len: 3 })
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0], stills: [
    { caption: 'The first snow.', crop: [200, 880, 920, 1085], scene: c => drawLane(c, 3, { pan: 640 }, w => { laneSnow(w, 3, { depth: 0.25 }); worn(w, 'cancer', 960, standY(220), 220, 3, { mood: 'heart' }, CAN_W); worn(w, 'sagittarius', 1330, standY(230), 230, 3, { mood: 'sparkle', look: [0, -1] }, SAG_W) }) },
    { caption: '“…Sagittarius.”', crop: [80, 520, 920, 1085], scene: c => { drawCafe(c, 27, {}); drawTalkCard(c, 560, 790, 330, 27, { q: 'Who do you tell first when something good happens?' }); worn(c, 'cancer', CAFE.seats[0].x, standY(220, CAFE.seats[0].y), 220, 27, { mood: 'wide', look: [0, -1] }, CAN_W); drawCafeTable(c, 27, {}) } },
    { caption: 'Five points.', crop: [300, 860, 920, 1085], scene: c => drawLane(c, 102, { time: 'late', pan: 700 }, w => { laneSnow(w, 102, { depth: 0.8 }); drawSnowStar(w, 1440, LANE.feet, 190, 102, { points: 5, lit: 1 }); worn(w, 'cancer', 1280, standY(220), 220, 102, { mood: 'heart' }, CAN_W); worn(w, 'sagittarius', 1600, standY(220), 220, 102, { mood: 'heart' }, SAG_W) }) },
  ] })
  const bug = showBug(root, 2, { at: -1 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── the market set (pan 0: the home row + the café front). opts: time, lights, sag, tangle, lanterns (lit 0…1)
  function market(t, { time = 'night', lights = 1, sag = 0, tangle = 0, lit = 1, stock = 4, fg = null, snowN = 120, pan = MPAN, zoom = ZM } = {}) {
    drawLane(x, t, { time, pan, zoom, focus: [540, 1420], lampsAt: time === 'dusk' ? 9999 : undefined, lit: time === 'dusk' ? ['a1', 'a3', 'pisces', 'cafe'] : undefined }, c => {
      laneSnow(c, t, { depth: 0.85 })
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 2, look: [-1, 1] })
      // Virgo's ornament stall (left) and Taurus' cocoa stall (right, by the café)
      drawMarket(c, 150, LANE.feet, t, { w: 270, col: ['#4fae8a', '#f3e6d0'], goods: 'ornaments', lights })
      drawMarket(c, 1080, LANE.feet, t, { w: 300, col: ['#7a4aa0', '#f3e6d0'], goods: 'cocoa', lights })
      if (fg) fg(c, 'behind')
      drawMarket(c, STALL.x, LANE.feet, t, { w: STALL.w, col: ['#d8455f', '#f3e6d0'], goods: null, lights, sag, tangle })
      // our stall's goods: lanterns (left half), cookies (right half)
      const L0 = STALL.x - STALL.w / 2
      for (let i = 0; i < stock; i++) drawLantern(c, L0 + 30 + i * 34, LANE.feet - 172 + Math.sin(t * 2 + i) * 2, 4, t, { lit: lit, col: LCOL[i % 5] })
      for (let i = 0; i < 4; i++) { const cx = STALL.x + 110 + i * 34; c.fillStyle = INK; c.fillRect(cx - 18, LANE.feet - 160, 36, 14); c.fillStyle = '#e0963a'; c.fillRect(cx - 15, LANE.feet - 158, 30, 10); c.fillStyle = '#5a2e1c'; c.fillRect(cx - 6, LANE.feet - 156, 4, 4) }
      if (fg) fg(c, 'front')
    })
    snowfall(x, t, { n: snowN, seed: 4 })
  }
  const behind = (sign, X, t, moods, wear, o = {}) => actor(x, t, { sign, size: 200, x: X, y: BEHIND, walk: false, moods, wear, ...o })

  // ── cold open: the lantern tower
  function coldOpen(t) {
    market(t, { time: 'dusk', lights: 0, stock: 0, snowN: 90, fg: (c, layer) => {
      if (layer !== 'front') return
      const sx = key(t, [[-1, 600], [4.9, 760]], ease.linear)
      actor(c, t, { sign: 'cancer', size: 210, seed: 2, step: 0.4, hops: CAN_HOPS,
        moods: [[-1, 'happy', [1, 0]], [2.3, 'squint', [1, -1]]], wear: CAN_W, x: [[-1, 380], [4.9, 540]], xEase: ease.linear })
      actor(c, t, { sign: 'sagittarius', size: 220, x: [[-1, 600], [4.9, 760]], xEase: ease.linear, seed: 4, step: 0.4, hops: SAG_HOPS,
        moods: [[-1, 'happy', [-1, -1]], [3.6, 'wide', [0, -1]], [4.4, 'sparkle', [0, -1]]], wear: SAG_W })
      // the tower: five lanterns stacked over Sag's top point, swaying; the top one tips at 3.5 and is caught at 4.3
      const sway = Math.sin(t * 3.4) * 0.06 + bump(t, 3.3, 1.2) * 0.12
      for (let i = 0; i < 5; i++) {
        let lx = sx + Math.sin(sway * (i + 1)) * 40 * (i + 1) * 0.5, ly = LANE.feet - 250 - i * 62
        if (i === 4) { const f = prog(t, 3.5, 4.3); lx += f * 120; ly += Math.sin(Math.PI * f) * -60 + f * 90 }
        drawLantern(c, lx, ly, 6, t, { lit: 0.4, col: LCOL[i], rot: sway * (i + 1) * 0.4 + (i === 4 ? prog(t, 3.5, 4.3) * 2 : 0) })
      }
      sparkles(c, t, sx + 120, LANE.feet - 300, 4.3, 8, 120, 3)
    } })
  }

  // ── act 1: the market opens, three offers, the rush
  function act1(t) {
    const night = t > T.rush
    market(t, { time: night ? 'night' : 'dusk', lights: night ? 1 : 0, stock: 4, fg: (c, layer) => {
      if (t < T.offers) {
        if (layer === 'behind') { behind('sagittarius', 600, t, [[0, 'happy', [1, 0]], [16.3, 'sparkle', [1, 0]]], SAG_W, { seed: 4, hops: [10.6, ...SAG_HOPS] }); behind('cancer', 790, t, [[0, 'happy', [-1, 0]], [17.6, 'squint', [-1, 0]]], CAN_W, { seed: 2, hops: [10.9, ...CAN_HOPS] }) }
        return
      }
      if (t < T.ladder[1]) {             // the ladder at the stall's left post
        if (layer !== 'front') return
        const lx = STALL.x - STALL.w / 2 - 30
        c.fillStyle = '#8a5a3a'; c.fillRect(lx - 40, LANE.feet - 300, 10, 300); c.fillRect(lx + 30, LANE.feet - 300, 10, 300)
        for (let r = 0; r < 6; r++) c.fillRect(lx - 40, LANE.feet - 280 + r * 48, 80, 8)
        actor(c, t, { sign: 'sagittarius', size: 200, x: lx + Math.sin(t * 5) * 6, y: LANE.feet - 230, seed: 4, walk: false, hops: SAG_HOPS, rot: Math.sin(t * 5) * 0.05,
          moods: [[0, 'neutral', [1, -1]], [22.1, 'squint', [1, 0]]], wear: SAG_W })
        actor(c, t, { sign: 'cancer', size: 200, x: lx + 220, seed: 2, walk: false, hops: CAN_HOPS, moods: [[0, 'happy', [-1, -1]], [22.4, 'neutral', [-1, -1]]], wear: CAN_W })
        return
      }
      if (t < T.till[1]) {
        if (layer === 'behind') {
          behind('sagittarius', 600, t, [[0, 'squint', [0, 1]], [25.7, 'wink', [1, 0]]], SAG_W, { seed: 4, hops: SAG_HOPS })
          behind('cancer', 790, t, [[0, 'happy', [-1, 0]], [26.0, 'neutral', [-1, 0]]], CAN_W, { seed: 2, hops: CAN_HOPS })
        }
        if (layer === 'front') { const n = Math.min(7, Math.floor((t - 23.8) * 3)); drawBubble(c, 600, 1100, n > 0 ? Array.from({ length: n }, (_, i) => i + 1).join(', ') + '…' : '…', { size: 26, k: pop01(t, 23.8, 0.25, 2) * outK(t, [26.9, 27.1]) }) }
        return
      }
      if (t < T.crate[1]) {
        if (layer !== 'front') return
        const cx = key(t, [[27.2, 120], [30.9, 960]], ease.linear)
        actor(c, t, { sign: 'cancer', size: 200, x: [[27.2, 520], [27.9, 600], [29.2, 600], [29.6, 520]], seed: 2, hops: CAN_HOPS, moods: [[0, 'happy', [1, 0]], [28.7, 'wide', [1, 0]]], wear: CAN_W })
        actor(c, t, { sign: 'sagittarius', size: 210, x: [[27.2, 120], [30.9, 960]], xEase: ease.linear, seed: 4, step: 0.3, hops: SAG_HOPS, moods: [[0, 'squint', [1, 0]], [28.7, 'wide', [1, 0]]], wear: SAG_W })
        c.fillStyle = INK; c.fillRect(cx - 70, LANE.feet - 330, 140, 96); c.fillStyle = '#a8744a'; c.fillRect(cx - 64, LANE.feet - 324, 128, 84); c.fillStyle = '#6a4028'; c.fillRect(cx - 64, LANE.feet - 290, 128, 8)
        return
      }
      // the rush: a queue in front of the stall
      if (layer === 'behind') { behind('sagittarius', 560, t, [[0, 'wide', [1, 1]], [34.4, 'squint', [1, 1]]], SAG_W, { seed: 4, hops: [32.2, 33.0, 35.6, 36.4, 38.0] }); behind('cancer', 780, t, [[0, 'happy', [1, 1]]], CAN_W, { seed: 2 }) }
      if (layer === 'front') queue(c, t, 31.2, 4)
    } })
  }
  // queue stars in front of the stall; n grows; served = how many have left (with a lantern)
  const QUEUE = ['gemini', 'leo', 'virgo', 'aries', 'capricorn', 'taurus']
  function queue(c, t, t0, n, served = 0, serveT = []) {
    for (let i = 0; i < n; i++) {
      const s = QUEUE[i % QUEUE.length], X = 420 + i * 105
      const gone = served > i ? prog(t, serveT[i], serveT[i] + 0.8) : 0
      if (gone >= 1) continue
      actor(c, t, { sign: s, size: 130, x: X + gone * 900, y: 1452, seed: 20 + i, walk: false, pop: pop01(t, t0 + i * 0.5, 0.3, 2), hops: gone > 0 ? [serveT[i], serveT[i] + 0.4] : [t0 + i * 0.5 + 2.2],
        moods: [[0, gone > 0 ? 'happy' : (t - t0 > 6 ? 'squint' : 'neutral'), [-1, -1]]], ...(s === 'gemini' ? { hops: talkHops(ALL_LINES, GE, { cps: CPS }) } : {}) })
      if (gone > 0) drawLantern(c, X + gone * 900 + 55, 1400, 3, t, { lit: 1, col: LCOL[i % 5] })
    }
  }

  // ── act 2: it all goes sideways
  function act2(t) {
    const sag = key(t, [[40, 0.1], [50, 1]], ease.linear)
    market(t, { lights: t > T.tangle ? 0 : 1, sag, tangle: t > T.tangle ? 1 : 0, lit: 0.2, stock: t > T.roll[0] ? 3 : 4, snowN: 170, fg: (c, layer) => {
      if (t < T.lowpt) {
        if (layer === 'behind') {
          behind('sagittarius', key(t, [[40, 580], [42, 640], [44, 540], [47, 660], [49.5, 600]]), t, [[0, 'wide', [1, 1]], [44, 'wide', [-1, 1]], [47, 'squint', [1, 1]]], SAG_W, { seed: 4, hops: [40.8, 41.5, 43.7, 44.4, 46.2, 47.6, 48.9, 49.6], walk: false })
          behind('cancer', 790, t, [[0, 'neutral', [-1, 0]], [49.2, 'wide', [-1, 0]]], CAN_W, { seed: 2, hops: [48.9] })
        }
        if (layer === 'front') {
          queue(c, t, 39.0, 5)
          // the runaway lantern
          if (t > T.roll[0]) { const p = prog(t, ...T.roll); drawLantern(c, lerp(560, 1250, p), LANE.feet - 30 - Math.abs(Math.sin(p * 9)) * 40, 5, t, { lit: 0, col: LCOL[3], rot: p * 12 }) }
        }
        return
      }
      if (t < T.alone) {
        if (layer === 'behind') {
          behind('sagittarius', 600, t, [[0, 'neutral', [1, 0]], [54.6, 'squint', [1, 0]]], SAG_W, { seed: 4 })
          actor(x, t, { sign: 'cancer', size: 200, x: [[52, 790], [T.step[0], 790], [T.step[1], 930]], y: BEHIND, seed: 2, hops: CAN_HOPS, moods: [[0, 'neutral', [-1, 0], 0.4], [55.0, 'squint', [1, 1]]], wear: CAN_W })
        }
        if (layer === 'front') queue(c, t, 50.0, 3)
        return
      }
      if (layer === 'behind') behind('sagittarius', 560, t, [[0, 'squint', [0, 1]], [64.3, 'neutral', [0, -1]], [66.6, 'squint', [0, 1]]], SAG_W, { seed: 4, squash: 0.08, hops: SAG_HOPS })
      if (layer === 'front') {
        drawLantern(c, 660, LANE.feet - 200, 5, t, { lit: 0, col: LCOL[0] })
        // Pisces at Virgo's stall, buying an ornament, sobbing
        drawPisces(c, 400, standY(130, 1452), 130, t, { tears: 3, look: [1, 0], pull: bump(t, 66.2, 0.6) })
      }
    } })
    if (t > 46.2 && t < 49.9) drawBubble(x, SX(620), 1060, 'the lights! the—', { size: 30, k: pop01(t, 44.6, 0.25, 2) * outK(t, [49.6, 49.85]) })
    drawBubble(x, SX(790), 1040, 'I can—', { size: 30, k: pop01(t, 48.9, 0.25, 2) * outK(t, [50.9, 51.1]) })
    drawBubble(x, SX(580), 1000, 'I’ve GOT—', { size: 30, col: '#ffd2e0', k: pop01(t, 49.6, 0.25, 2) * outK(t, [51.4, 51.6]) })
    if (t < 46.2) drawBubble(x, SX(620), 1060, 'the lights!', { size: 30, k: pop01(t, T.tangle, 0.25, 2) * outK(t, [43.4, 43.6]) })
    if (t > 43.4) drawBubble(x, SX(500), 1060, 'the lantern!', { size: 30, k: pop01(t, 43.7, 0.25, 2) * outK(t, [46.0, 46.2]) })
  }

  // ── act 3: yes, thank you
  function act3(t) {
    const sag = key(t, [[90, 1], [T.clear[0], 1], [T.clear[1], 0]], ease.inOutQuad)
    const up = clamp(prog(t, T.up, T.up + 0.6))
    market(t, { lights: up, sag, tangle: t > T.up ? 0 : 1, lit: up, stock: t > T.lastSale ? 0 : t > 99.4 ? 1 : t > 98.4 ? 2 : 3, fg: (c, layer) => {
      if (layer === 'behind') {
        behind('sagittarius', key(t, [[90, 580], [T.walk[0], 580], [T.walk[1], 640]]), t, [[0, 'neutral', [1, 0]], [92.5, 'neutral', [1, 0], 0.7], [93.8, 'happy', [1, 0], 0.9], [T.up, 'sparkle', [0, -1]], [101.0, 'happy', [1, 0], 0.9]], SAG_W, { seed: 4, hops: [...SAG_HOPS, T.clear[0], T.clear[0] + 0.4, T.up, 98.0, 99.0, 100.0], walk: true })
        behind('cancer', 840, t, [[0, 'neutral', [-1, 0]], [93.6, 'sparkle', [-1, 0]], [T.up, 'heart', undefined], [101.6, 'heart', [-1, 0], 1]], CAN_W, { seed: 2, hops: [...CAN_HOPS, T.clear[0] + 0.2, T.up + 0.1] })
        // the light string, held between them (until it's up)
        if (t > 91.6 && t < T.up) { c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(660, 1200); c.quadraticCurveTo(750, 1250, 820, 1200); c.stroke() }
      }
      if (layer === 'front') {
        queue(c, t, 88.0, 3, 3, [97.8, 98.8, 99.8])
        if (t > T.lastSale - 0.2) { const p = prog(t, T.lastSale, T.lastSale + 2.4); drawPisces(c, lerp(940, 870, p), standY(130, 1452), 130, t, { tears: 3, look: [-1, -1], pop: pop01(t, T.lastSale - 0.2, 0.3, 2) }); if (t > T.lastSale + 0.4) drawLantern(c, lerp(940, 870, p) - 75, 1390, 4, t, { lit: 1, col: LCOL[0] }) }
      }
    } })
    sparkles(x, t, SX(740), 960, T.up, 14, 260, 5, [ML_GOLD, PINK, '#7fe0ff', BONE])
    sparkles(x, t, SX(740), 960, T.clear[0], 10, 200, 6, ['#ffffff', '#dff0ff'])
  }
  function tag(t) {
    drawLane(x, t, { time: 'late', pan: 380, lit: ['a4', 'pisces', 'cafe'] }, c => {
      laneSnow(c, t, { depth: 0.9 })
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: 3, look: [-1, 1], pull: bump(t, 110.3, 0.6) })
      drawMarket(c, STALL.x, LANE.feet, t, { w: STALL.w, col: ['#d8455f', '#f3e6d0'], goods: null, lights: 0.6 })
      const wk = ease.inOutCubic(prog(t, ...T.wrap))
      actor(c, t, { sign: 'cancer', size: 220, x: 760, seed: 2, walk: false, squash: t < T.wrap[1] ? 0.04 * Math.sin(t * 40) : 0, hops: [T.wrap[1] + 0.1],
        moods: [[0, 'squint', [0, 0]], [T.wrap[0], 'wide', [1, 0]], [T.wrap[1], 'heart', undefined, 1]], wear: { ...CAN_W, scarf: '#ffd36e', scarfK: wk } })
      actor(c, t, { sign: 'sagittarius', size: 220, x: [[108, 1180], [109.0, 1000]], seed: 4, hops: [T.wrap[0]],
        moods: [[0, 'neutral', [-1, 0]], [T.wrap[0], 'happy', [-1, 0], 0.9]], wear: { scarf: '#ffd36e', scarfK: 1 - wk } })
    })
    snowfall(x, t, { n: 140, seed: 8 })
    drawBubble(x, 760 - 380, 1080, 'brr…', { size: 30, k: pop01(t, T.shiver, 0.25, 2) * outK(t, [109.2, 109.4]) })
    sparkles(x, t, 760 - 380, 1250, T.wrap[1], 10, 150, 9, [PINK, '#ffb3d9', ML_GOLD])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.prev[0]) coldOpen(t)
      else if (t < T.open) drawSky(x, t, SKY_H)
      else if (t < T.mess) act1(t)
      else if (t < T.act3) { if (t < T.advise + 0.7) act2(t); else drawSky(x, t, SKY_H) }
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

const CUTS = [31.0, 40.0, 62.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

const NOTE = [698.46, 783.99, 880, 932.33, 1046.5, 1174.66, 1318.51]      // F major
export const CUES = [
  ...Array.from({ length: 6 }, (_, i) => ['tick', r3(0.2 + i * 0.4), 0.02]), ['whoosh', 3.5, 0.3, 0.04], ['pop', 4.3, 1174.66, 0.045, 0.3], ['glitter', 4.3, 4.8],
  ...previouslyCues(T.prev[0], 3, T.prev[1] - T.prev[0]),
  ...titleCues(T.title, 3),
  ...popCues(CAPS[1]), ...[10.6, 10.9].map((a, i) => ['pop', a, NOTE[i + 2], 0.035, (i - 0.5) * 0.4]),
  ...popCues(CAPS[2]), ['whoosh', T.ladder[0], 0.35, 0.035], ['whoosh', T.till[0], 0.35, 0.035], ['whoosh', T.crate[0], 0.35, 0.035],
  ...Array.from({ length: 7 }, (_, i) => ['tick', r3(24.1 + i / 3), 0.025]), ['tom', 28.7, 90, { gain: 0.22, decay: 0.25 }],
  ...captionCues(CAPS[3]), ...Array.from({ length: 4 }, (_, i) => ['pop', r3(31.2 + i * 0.5), NOTE[i + 1], 0.03, (i - 1.5) * 0.3]),
  ...popCues(CAPS[4]), ['whoosh', T.tangle, 0.3, 0.04], ['tom', T.tangle + 0.1, 80, { gain: 0.2, decay: 0.3 }], ['pop', 43.7, 523.25, 0.03, -0.3],
  ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.roll[0] + i * 0.36), 0.025]), ['pop', 49.6, 392, 0.035, 0],
  ...popCues(CAPS[5]), ['whoosh', T.step[0], 0.3, 0.03],
  ...captionCues(CAPS[6]), ['pop', 66.3, 392, 0.03, -0.3],
  ...adviseCues(ADVISE),
  ...popCues(CAPS[7]), ...popCues(CAPS[8]), ['whoosh', T.clear[0], 0.4, 0.04], ['glitter', T.clear[0], r3(T.clear[0] + 0.6)],
  ['riser', 95.8, T.up, 0.02], ['pop', T.up, 1396.91, 0.05, 0], ['bell', T.up, 1760, 0.035, 1.6, 0], ['glitter', T.up, r3(T.up + 0.8)],
  ...[97.8, 98.8, 99.8].map((a, i) => ['pop', a, NOTE[3 + i], 0.035, 0.3]), ['pop', T.lastSale, 1318.51, 0.04, 0.2],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'F' }),
  ...captionCues(CAPS[9]), ['pop', T.shiver, 440, 0.03, -0.2], ['whoosh', T.wrap[0], 0.3, 0.03], ['bell', T.wrap[1], 1760, 0.03, 1.2, 0], ['glitter', T.wrap[1], r3(T.wrap[1] + 0.6)],
  ...nextTimeCues(T.next), ...popCues(CAPS[10]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CS]: 880, [GS]: 659.25, [GE]: 1046.5 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
].filter(c => c[1] >= 0)
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
