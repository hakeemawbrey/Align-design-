// nml2e10 — MOONLIGHT LANE, Ep 10: "Lights on the Lane" (finale, 120 s vertical, Winter on the Lane; pop · C).
// Batch b20 (promo/films/next30/b20.md). The pair: ♋ Cancer × ♐ Sagittarius (b19's setup). Kit: mlpilot/scenes/mlkit.js
// (read-only) + ../../nml2e06/scenes/winter.js. Story 0–115.6, then the shared end card.
//   0.0–5.0    HOOK + COLD OPEN  "Christmas Eve. | The lights *won't* come on." (DEC 24 · 5:40 PM) ♑ Capricorn mid-
//              countdown with a clipboard under the dark string of lights across the lane. "lights on at 6:00. *every*
//              year. so…?"
//   5.0–7.0    ◀◀ PREVIOUSLY ON (the card · "since last winter" · "you just didn't ask")
//   7.0–10.0   TITLE CARD  Ep 10 · Lights on the Lane.
//  10.0–24.0   ACT 1  The big string is dead. Someone has to go up on the roof. "we'll go!" "*we'll* go." (at once)
//  24.0–40.0   The roof terrace, alone for the first time since the back step. "so are we… a—" "no labels! totally
//              *cool!*" "…totally. *so* cool."
//  40.0        card cut.
//  40.0–52.0   ACT 2  Fixing it, badly; the bulbs flicker with their nerves; ♊ Gemini's help from below. Sag's fun fact.
//  52.0–70.0   6:00 PM: the countdown, still dark. "…we'll try *next* year." The two of them, deflated on the roof,
//              the two loose cord ends between them. ♓ Pisces sobs.
//  70.0–90.0   ★ THE STARS ADVISE: New can be awkward · Ask the real question · Say what you want, clearly.
//  90.0–104.0  ACT 3 (lift)  "Cancer. I don't want *no labels.*" "I want to be your person. *officially.*" "…yes.
//              *obviously* yes." Cancer joins the two cords: the whole lane lights up, everyone cheers, Pisces sobs.
// 104.0–108.0  ★ LESSON UNLOCKED "Say it | *clearly.*" +1 PERSON (OFFICIAL)
// 108.0–111.6  LANE TAG  ♏ Scorpio: "same time next year?" ♎ Libra, who never decides anything: "*yes.*" (instantly)
// 111.6–115.6  THE END… *for now* · last line "*Lights* on."
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
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
  buildNextTime, nextTimeCues, popCues, drawBubble, sparkles,
} from '../../mlpilot/scenes/mlkit.js'
import { snowGround, snowfall, drawWinter, drawTalkCard, drawLongTable, drawStringBulbs } from '../../nml2e06/scenes/winter.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN       // 115.6
const S = id => signStar(id)
const nm = (id, n) => `${S(id).glyph}︎ ${n}`
const CA = nm('cancer', 'CANCER'), SG = nm('sagittarius', 'SAGITTARIUS'), CP = nm('capricorn', 'CAPRICORN'), GE = nm('gemini', 'GEMINI')
const LI = nm('libra', 'LIBRA'), SC = nm('scorpio', 'SCORPIO')
const COL = { [CA]: '#8fe6ff', [SG]: '#d6b0ff', [CP]: '#7ff0c8', [GE]: '#ffe27a', [LI]: '#ffb0f0', [SC]: '#ff9fb4' }
const CAW = { scarf: '#ff8fb1', hat: '#ff8fb1', seed: 21 }, SGW = { scarf: '#ffd36e', seed: 22 }
const CARD = 'What’s something you haven’t said this year?'

const T = {
  prev: [5.0, 7.0], title: 7.0,
  roof: 24.0, flick: [40.0, 52.0], six: 52.4, count: [52.6, 53.2, 53.8], groan: 54.6, sit: 58.0,
  advise: 70.0, adviseOut: [89.55, 90.0], cards: [71.2, 77.2, 83.2],
  act3: 90.0, join: 97.6, on: 98.0, wide: 98.3,
  lesson: 104.0, lessonOut: [107.75, 107.95],
  tag: 108.0, yes: 109.9,
  next: 111.7, nextOut: [115.05, 115.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Say it | *clearly.*', chip: '+1 PERSON (OFFICIAL)' }

const CPS = 28
const ln = (t, sp, text) => ({ t, speaker: sp, color: COL[sp], text })
const L0 = [ln(2.75, CP, 'lights on at 6:00. *every* year. so…?')]
const L1 = [
  ln(10.8, CP, 'the big string is *dead.*'),
  ln(13.6, GE, 'someone has to go up on the *roof.*'),
  ln(16.8, SG, 'we’ll go!'),
  ln(18.2, CA, '*we’ll* go.'),
]
const L2 = [
  ln(26.8, CA, 'so… about the back step.'),
  ln(29.4, SG, 'yeah. that was… *big.*'),
  ln(32.0, CA, 'so are we… a—'),
  ln(34.0, SG, 'no labels! totally *cool!*'),
  ln(36.8, CA, '…totally. *so* cool.'),
]
const L3 = [
  ln(42.0, GE, 'try the *blue* one!'),
  ln(44.6, GE, 'no, the *other* blue one!'),
  ln(47.4, SG, 'fun fact: one loose plug darkens the *whole* string.'),
]
const L4 = [
  ln(T.groan, CP, '…we’ll try *next* year.'),
  ln(60.4, CA, 'well. at least it’s *pretty* dark.'),
]
const L5 = [
  ln(90.8, SG, 'Cancer. I don’t want *no labels.*'),
  ln(93.4, SG, 'I want to be your person. *officially.*'),
  ln(96.0, CA, '…yes. *obviously* yes.'),
]
const L6 = [
  ln(108.4, SC, 'same time next *year?*'),
  ln(T.yes, LI, '*yes.*'),
]
const BOXES = [[L0, 2.6, 4.95], [L1, 10.6, 23.6], [L2, 26.6, 39.6], [L3, 41.8, 51.6], [L4, 54.4, 63.0], [L5, 90.6, 97.9], [L6, 108.2, 111.4]]
const ALL_LINES = BOXES.flatMap(b => b[0])

const ADVISE = {
  at: T.advise, out: T.adviseOut,
  cards: [
    { at: T.cards[0], icon: 'star', head: 'New can be *awkward.*', body: 'Right after the big talk, everything feels loud. That’s normal.' },
    { at: T.cards[1], icon: 'question', head: 'Ask the *real* question.', body: '“What do you want this to be?” Then really listen.' },
    { at: T.cards[2], icon: 'heart', head: 'Say what you want, *clearly.*', body: '“I want to be your person. Officially.”' },
  ],
  lines: [
    { t: 71.05, text: 'Sagittarius, this one’s *yours.*' },
    { t: 73.95, text: '“no labels” was a joke. *again.*' },
    { t: 77.5, text: 'cool is easy. *clear* is kind.' },
    { t: 80.4, text: 'Cancer, you can ask too. *always.*' },
    { t: 83.5, text: 'want something? *say it plainly.*' },
    { t: 86.5, text: 'a clear yes is the *best* light.' },
  ],
}

const CAPS = [
  { text: 'Christmas Eve. | The lights *won’t* come on.', kicker: 'DEC 24 · 5:40 PM', at: -1.2, out: [4.8, 4.95], size: 80 },
  { text: 'The big string: | *dead.*', at: 10.3, out: [16.4, 16.6], late: 1, lateAt: 10.9 },
  { text: 'Volunteers: | *suspiciously* quick.', at: 16.7, out: [23.6, 23.85], size: 84, late: 1, lateAt: 17.3 },
  { text: 'Alone. | *On a roof.*', at: 24.15, out: [26.4, 26.6], late: 1, lateAt: 24.7 },
  { text: 'Fixing it. | *Badly.*', at: 40.3, out: [51.6, 51.85], late: 1, lateAt: 40.9 },
  { text: '6:00 PM. | *Still dark.*', at: T.six, out: [57.8, 58.0], late: 1, lateAt: 53.9 },
  { text: 'Two people. | *Not saying it.*', at: 63.2, out: [69.3, 69.6], late: 1, lateAt: 63.9 },
  { text: '*Officially.*', at: T.wide, out: [103.65, 103.85], size: 110, late: 1, lateAt: T.wide },
  { text: 'Libra decided. | *Instantly.*', kicker: 'UNDER THE LIGHTS', at: 108.15, out: [111.3, 111.5], late: 1, lateAt: T.yes },
  { text: '*Lights* on.', at: 112.6, out: [115.05, 115.4], size: 110, late: 1, lateAt: 112.6, top: 300 },
]

const hops = sp => [...talkHops(ALL_LINES, sp, { cps: CPS })]
const CHEER = [98.3, 98.7, 99.1, 99.5, 100.0, 100.4, 100.9, 101.4, 102.0, 102.6]
const ALL_WIN = ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'b0', 'pisces', 'b2', 'cafe', 'c0', 'c1', 'c2', 'c3', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9']

async function build(stage) {
  await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '800 34px Inter'])
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, { size: 96, ...c }))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
  const advise = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: ML_GOLD, dim: 0.6 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, teaser: '*for now*', finale: true })
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0], stills: [
    { caption: 'The card', scene: c => stillTable(c) },
    { caption: '“Since last winter.”', scene: c => stillStep(c, false) },
    { caption: '“You just didn’t ask.”', scene: c => stillStep(c, true), crop: [700, 760, 640, 760] },
  ] })
  const title = buildTitle(root, { ep: 10, title: 'Lights on the Lane', at: T.title, len: 3 })
  const bug = showBug(root, 10, { at: 0 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function stillTable(c) {
    drawCafe(c, 10, { view: 'night' })
    ;[['virgo', 110], ['aries', 270], ['capricorn', 430], ['sagittarius', 610], ['cancer', 790], ['leo', 960]].forEach(([id, sx], i) => drawWinter(c, id, sx, standY(215, 1255), 215, 10, { mood: 'happy', seed: 50 + i, ...(id === 'cancer' ? CAW : id === 'sagittarius' ? SGW : {}) }))
    drawLongTable(c, 10, { y: 1185 })
    drawTalkCard(c, 540, 820, 380, 10, { text: CARD, size: 32 })
  }
  function stillStep(c, heart) {
    drawLane(c, 10, { time: 'late', pan: 440 }, w => {
      snowGround(w, 10)
      drawWinter(w, 'sagittarius', 1150, standY(230, 1395), 230, 10, { ...SGW, mood: heart ? 'happy' : 'heart', blush: 0.9 })
      drawWinter(w, 'cancer', 920, standY(230), 230, 10, { ...CAW, mood: heart ? 'heart' : 'sparkle', look: [1, 0], blush: 0.9 })
    })
    snowfall(c, 10, { n: 60 })
  }

  // the lights state: off until Cancer joins the cords (a quick flicker-on, then full)
  const onK = t => t < T.on ? 0 : clamp((t - T.on) / 0.5) * ([1, 0.2, 1, 0.4, 1][Math.min(4, Math.floor((t - T.on) / 0.1))] ?? 1)
  const winK = t => Object.fromEntries(ALL_WIN.map((id, i) => [id, t < T.on ? (id === 'pisces' ? 0.35 : 0) : clamp((t - T.on - (i % 7) * 0.06) / 0.25)]))

  function bigString(c, t, k, flicker = 0) { drawStringBulbs(c, t, 470, 1680, 700, 180, { k, n: 26, seed: 3, flicker }) }

  // ── the lane, wide (cold open, Act 1, 6:00, the big switch-on)
  function laneWide(t) {
    const wide = t >= T.act3
    const pan = wide ? lerp(560, 540, prog(t, T.wide, 104)) : t < 24 ? 560 : 560
    const zoom = wide ? lerp(1.08, 1.0, ease.outCubic(prog(t, T.wide, 101))) : 1
    const k = onK(t)
    drawLane(x, t, { time: 'night', pan, zoom, focus: [540, 1100], lit: winK(t), lampsAt: t < T.on ? 9999 : T.on, lights: k }, c => {
      snowGround(c, t)
      bigString(c, t, k)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 8, 104, t, { tears: wide ? 3 : 2, look: [1, 1], pull: bump(t, 55.2, 0.6) + bump(t, 99.0, 0.6) })
      const cheer = wide ? CHEER : []
      // the crowd on the pavement
      drawWinter(c, 'capricorn', 700, standY(220), 220, t, { scarf: '#9a6a48', hat: '#2fc79a', mood: wide ? 'sparkle' : t > T.groan ? 'squint' : t > 10.6 ? 'wide' : 'neutral', look: [1, -1], hops: [...hops(CP), ...cheer], seed: 5 })
      drawWinter(c, 'gemini', 920, standY(210), 210, t, { scarf: '#7dffb0', hat: '#7fe0ff', mood: wide ? 'happy' : 'neutral', look: [1, -1], hops: [...hops(GE), ...cheer.map(v => v + 0.15)], seed: 8 })
      drawWinter(c, 'taurus', 1500, standY(210), 210, t, { scarf: '#d8455f', mood: wide ? 'heart' : 'neutral', look: [-1, -1], hops: cheer.map(v => v + 0.3), seed: 9 })
      if (t < 20.4 || wide) {
        const g = ease.inCubic(prog(t, 19.6, 20.4))
        drawWinter(c, 'sagittarius', wide ? 1300 : 1110 + g * 300, wide ? standY(150, 900) : standY(220), wide ? 150 : 220, t, { ...SGW, mood: wide ? 'heart' : t > 16.6 ? 'sparkle' : 'neutral', look: wide ? [-1, 0] : [1, -1], hops: [...hops(SG), ...cheer], alpha: wide ? 1 : 1 - g })
        drawWinter(c, 'cancer', wide ? 1460 : 1300 + g * 300, wide ? standY(150, 900) : standY(220), wide ? 150 : 220, t, { ...CAW, mood: wide ? 'heart' : t > 18.0 ? 'wide' : 'neutral', look: wide ? [1, 0] : [-1, 0], hops: [...hops(CA), ...cheer], blush: t > 18.0 ? 0.9 : undefined, alpha: wide ? 1 : 1 - g })
      }
      if (wide) {
        drawWinter(c, 'libra', 1720, standY(210), 210, t, { scarf: '#c9a6ff', hat: '#7dffb0', mood: 'heart', hops: cheer.map(v => v + 0.2), seed: 10 })
        drawWinter(c, 'scorpio', 1900, standY(210), 210, t, { scarf: '#fff1c8', mood: 'happy', hops: cheer.map(v => v + 0.25), seed: 11 })
      }
    })
    snowfall(x, t, { n: 90, speed: wide ? 0.8 : 1 })
    // the clipboard countdown (cold open)
    if (t < 7.2) {
      const mins = Math.max(0, 20 - Math.floor(t * 0.6))
      drawBubble(x, 300, 980, `6:00 IN ${mins} MIN`, { size: 32, col: ML_GOLD, k: 1, tail: 'down' })
    }
    if (t > 52) {
      ;['3…', '2…', '1…'].forEach((s, i) => { const kk = pop01(t, T.count[i], 0.2, 2.4) * outK(t, [T.count[i] + 0.55, T.count[i] + 0.6]); if (kk > 0.01) drawBubble(x, 540, 900, s, { size: 60, col: BONE, k: kk, tail: null }) })
      if (t > T.groan - 0.4 && t < 58) { x.save(); x.globalAlpha = 0.85 * bump(t, T.groan - 0.4, 3.0); x.fillStyle = BONE; x.font = `800 48px ${MONO}`; x.textAlign = 'center'; x.fillText('…awww.', 540, 1000); x.restore() }
    }
    if (t > T.on && t < 104) sparkles(x, t, 540, 800, T.on, 18, 420, 7, [ML_GOLD, PINK, '#7fe0ff', '#7dffb0', BONE])
  }

  // ── the roof terrace (zoomed in): world → screen sx = (wx − 860 − 540)·1.6 + 540, sy = (wy − 317)·1.6 + 317
  function roof(t) {
    const act3 = t >= T.act3
    const fl = inR(t, ...T.flick) ? 1 : 0
    const k = onK(t)
    drawLane(x, t, { time: 'night', pan: 860, zoom: 1.6, focus: [540, 317], lit: winK(t), lampsAt: t < T.on ? 9999 : T.on, lights: k }, c => {
      snowGround(c, t)
      // the big string's end runs across the terrace; flickers with their nerves in Act 2
      drawStringBulbs(c, t, 1200, 1610, 640, 36, { k: act3 ? k : fl ? 0.9 : 0, n: 10, seed: 5, flicker: fl })
      const sitting = t > T.sit && !act3
      const sy = sitting ? standY(150, 912) : standY(150, 900)
      let sm = 'happy', sl = [1, 0], cm = 'neutral', cl = [-1, 0]
      if (t > 29.4) { sm = 'sparkle'; sl = [1, 0] }
      if (t > 32.0) { cm = 'sparkle'; cl = [-1, 0]; sm = 'wide' }
      if (t > 34.0) { sm = 'happy'; sl = undefined; cm = 'wide' }
      if (t > 36.8) { cm = 'neutral'; cl = [0, 1]; sm = 'neutral'; sl = [0, 1] }
      if (inR(t, 40, 52)) { sm = 'squint'; sl = [1, 1]; cm = 'squint'; cl = [-1, 1] }
      if (t > 47.4 && t < 52) { sm = 'sparkle'; sl = [1, 0] }
      if (sitting) { sm = 'neutral'; sl = [0, 1]; cm = 'squint'; cl = [0, 1] }
      if (act3) { sm = t > 93.4 ? 'heart' : 'neutral'; sl = [1, 0]; cm = t > 96.0 ? 'heart' : t > 93.4 ? 'wide' : 'neutral'; cl = [-1, 0] }
      drawWinter(c, 'sagittarius', 1300, sy, 150, t, { ...SGW, mood: sm, look: sl, hops: hops(SG), blush: act3 && t > 93 ? 0.9 : undefined, squash: sitting ? 0.1 : 0 })
      drawWinter(c, 'cancer', 1500, sy, 150, t, { ...CAW, mood: cm, look: cl, hops: [...hops(CA), T.join], blush: (t > 18 && t < 40) || (act3 && t > 96) ? 0.9 : undefined, squash: sitting ? 0.1 : 0 })
      // the two loose cord ends between them (joined at T.join)
      const j = ease.inOutQuad(prog(t, T.join - 0.4, T.join))
      const ax = lerp(1370, 1398, j), bx = lerp(1430, 1402, j)
      c.fillStyle = INK; c.fillRect(ax - 22, 884, 22, 10); c.fillRect(bx, 884, 22, 10)
      c.fillStyle = '#3a8a4a'; c.fillRect(ax - 60, 888, 40, 4); c.fillRect(bx + 20, 888, 40, 4)
      c.fillStyle = '#c0c0c0'; c.fillRect(ax, 886, 4, 6); c.fillRect(bx - 4, 886, 4, 6)
    })
    snowfall(x, t, { n: 80, speed: act3 ? 0.7 : 1 })
    if (inR(t, 41.8, 47.2)) drawBubble(x, 540, 1400, '(from below) ↓', { size: 26, col: '#ffe9a0', k: pop01(t, 41.8, 0.2, 2) * outK(t, [47.0, 47.2]), tail: null })
    if (t > T.join - 0.1 && t < T.on + 0.3) sparkles(x, t, 540, 1240, T.join, 12, 120, 9, [ML_GOLD, BONE, '#7fe0ff'])
    if (t > 58.5 && t < 70) drawBubble(x, 540, 1160, 'loose ends', { size: 24, col: BONE, k: pop01(t, 58.6, 0.25, 2) * outK(t, [69.3, 69.6]), tail: 'down' })
  }

  function tag(t) {               // under the lights
    drawLane(x, t, { time: 'night', pan: 1080, lit: winK(t), lights: 1 }, c => {
      snowGround(c, t)
      drawStringBulbs(c, t, 1100, 2160, 760, 120, { k: 1, n: 20, seed: 7 })
      drawWinter(c, 'scorpio', 1720, standY(240), 240, t, { scarf: '#fff1c8', mood: t > T.yes ? 'heart' : 'sparkle', look: [1, 0], hops: hops(SC), seed: 11, blush: 0.9 })
      drawWinter(c, 'libra', 1980, standY(240), 240, t, { scarf: '#c9a6ff', hat: '#7dffb0', mood: t > T.yes ? 'heart' : 'neutral', look: [-1, 0], hops: [...hops(LI), T.yes + 0.4, T.yes + 0.8], seed: 10 })
    })
    snowfall(x, t, { n: 60, seed: 7 })
    if (t > T.yes) sparkles(x, t, 760, 1100, T.yes + 0.1, 14, 220, 21, [PINK, '#ffb3d9', ML_GOLD])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.roof) laneWide(t)
      else if (t < T.six) roof(t)
      else if (t < T.sit) laneWide(t)
      else if (t < T.act3) { if (t < T.advise + 0.7) roof(t); else drawSky(x, t, SKY_H) }
      else if (t < T.wide) roof(t)
      else if (t < T.tag) laneWide(t)
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

const CUTS = [24.0, 40.0, 52.4]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
export const CUES = [
  ['tick', 0.3, 0.04], ['tick', 1.3, 0.03], ['tick', 2.3, 0.03],
  ...previouslyCues(T.prev[0], 3, T.prev[1] - T.prev[0]),
  ...titleCues(T.title, 3),
  ...popCues(CAPS[1]), ['pop', 11.4, 392, 0.03, 0],
  ...popCues(CAPS[2]), ['pop', 16.8, 987.77, 0.04, 0.3], ['pop', 18.2, 987.77, 0.04, -0.3], ['bell', 18.6, 1567.98, 0.025, 1.2, 0], ['whoosh', 19.6, 0.4, 0.04],
  ...popCues(CAPS[3]),
  ...popCues(CAPS[4]), ...Array.from({ length: 16 }, (_, i) => ['tick', r3(40.4 + i * 0.7), 0.02]),
  ...popCues(CAPS[5]), ...T.count.map((c, i) => ['pop', c, NOTE[4 - i], 0.04, 0]), ['pop', T.groan, 392, 0.035, 0], ['pop', r3(T.groan + 0.2), 349.23, 0.03, 0],
  ...popCues(CAPS[6]),
  ...adviseCues(ADVISE),
  ['bell', 93.6, 1567.98, 0.03, 1.4, 0], ['glitter', 96.2, 96.8],
  ['tick', T.join, 0.08], ['pop', T.join, 1174.66, 0.04, 0],
  ['riser', r3(T.join - 0.3), T.on, 0.03], ['boom', T.on, 0.22], ['clap', T.on, { gain: 0.25 }], ['glitter', T.on, r3(T.on + 1.2)], ['bell', T.on, 2093, 0.035, 2.0, 0],
  ...CHEER.map((c, i) => ['clap', c, { gain: 0.08 }]), ...popCues(CAPS[7]),
  ...lessonCues(LESSON.at, { ...LESSON, key: 'C' }),
  ...captionCues(CAPS[8]), ['pop', T.yes, 1318.51, 0.045, 0], ['glitter', r3(T.yes + 0.1), r3(T.yes + 0.8)],
  ...nextTimeCues(T.next), ...popCues(CAPS[9]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CA]: 932, [SG]: 698.46, [CP]: 740, [GE]: 1174.66, [LI]: 1046.5, [SC]: 659.25 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CHECK = Object.fromEntries([...BOXES.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [ADVISE.lines, ADVISE.out[0]]], ['lesson', LESSON]])
