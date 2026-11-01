// trfingerfirst: PUT A FINGER DOWN, first-date edition (30 s vertical, Star Talk Trends §8, music: house · C)
// Story 0–25.6, then the shared end card. The format look lives in ./finger.js (identical in all five trfinger* films).
// A timestamp overlay (top right) ticks toward the date: 7:31 PM … 8:15 PM.
//   0.0–2.7    "Put a finger down: | *first date* edition."  ♌ Leo pops in, cool as anything; ten fingers fan up.
//   2.8        the sticker "put a finger down if…" slaps on (the drop).
//   2.9–5.1    "…you got there | *twenty minutes* early."  A clock: 7:40. A sign: DATE 8:00. Finger.
//   5.2–7.4    "…you practiced your | laugh in the *mirror.*"  A mirror; Leo's reflection laughs on cue, ha. ha. HA. Finger.
//   7.45–9.6   "…you changed outfits | *three* times."  Three pixel shirts flick in; two get crossed out. Finger.
//   9.7–13.4   "…they said ‘enjoy your meal’ | and you said *‘you too.’*"  Leo cringes into a squash. Finger.
//              THE STARS (off-screen): "classic. *everyone* has done that."
//  13.6        card cut.
//  13.75–15.5 "Plot twist: | your date’s *playing too.*"  Split screen: Leo slides left, ♒ Aquarius slides in on the
//              right with the SAME hands and the same count: 6 and 6. Double take.
//  15.6–18.0  "…you’re nervous | *right now.*"  The music drops out. They look at each other… and both fold all six at
//              once (the hit, 17.27). 0 and 0. They burst out laughing.
//  18.0–22.4  The divider fades, a little table with two cups rises between them. THE STARS: "both of you? *zero.*" →
//              "nervous just means you *care.*" Pisces, at the next table, fountains.
//  22.5–25.5  "Everybody’s *nervous.*"  Two open hands meet in a high five over the table. Out by 25.5.
// One canvas (sky + props + stars + hands), DOM type + sticker + counters + box + bug, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, PINK, HOT, MINT, MONO, INTER, BEAT, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  fingerState, drawHand, drawHands, buildBug, buildSticker, buildCounter, buildProgress, drawBubble, fingerCues,
} from './finger.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const LEO = signStar('leo'), AQU = signStar('aquarius'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35, clock: 0.5,
  h0: 0.12, h0Land: 0.62, h0Out: [2.55, 2.75],
  heroIn: 0.25, handsIn: [0.5, 0.9], fanUp: 0.95, countIn: 1.75, pisIn: 1.2,
  sticker: BEAT(4), stickerOut: [17.85, 18.05],
  p1: 2.9, p1Out: [4.95, 5.1], clk: 3.05,
  p2: 5.2, p2Out: [7.2, 7.35], mir: 5.35, ha: [5.9, 6.2, 6.5],
  p3: 7.45, p3Out: [9.45, 9.6], shirts: [7.6, 7.9, 8.2],
  p4: 9.7, p4Out: [13.2, 13.4], cringe: BEAT(18),
  cut: 13.6,
  p5: 13.75, p5Out: [15.35, 15.5], split: [13.75, 14.3], dateIn: 14.0, dbl: 14.75,
  p6: BEAT(27), p6Out: [17.85, 18.05], allDown: BEAT(30), laugh: 17.75,
  handsOut: [18.0, 18.4], table: [18.2, 18.6], unsplit: [18.0, 18.6],
  h7: 22.5, h7Land: 22.95, five: [22.8, 23.15],
  countOut: [21.6, 21.9],
  out: [25.1, 25.5], h7Out: [25.15, 25.45], bugOut: [25.3, 25.55],
}
const STAMPS = [[0, '7:31 PM'], [T.p1, '7:40 PM'], [T.p2, '7:44 PM'], [T.p3, '7:49 PM'], [T.p4, '8:06 PM'], [T.p5, '8:09 PM'], [T.p6, '8:11 PM'], [T.handsOut[0], '8:15 PM']]
// fingers 0–4 left hand pinky → thumb, 5–9 right hand thumb → pinky. Each starts folded (−1) and fans up in the intro.
const DOWNS = [[BEAT(7)], [BEAT(11)], [BEAT(15)], [BEAT(18)], ...[0, 1, 2, 3, 4, 5].map(k => [T.allDown + k * 0.05])]
const F = fingerState(DOWNS.map((d, i) => [-1, T.fanUp + i * 0.08, ...d]))
// the date did exactly the same, off-screen (their own right-to-left order), then folds with Leo
const DDOWNS = [[BEAT(15) + 0.2], [BEAT(18) + 0.1], [BEAT(7) + 0.3], [BEAT(11) + 0.2], ...[0, 1, 2, 3, 4, 5].map(k => [T.allDown + 0.02 + k * 0.05])]
const DF = fingerState(DDOWNS.map(d => [...d]))

const SPEAK = 'THE STARS'
const LINES = [
  { t: 11.3, speaker: SPEAK, text: 'classic. *everyone* has done that.' },
  { t: 18.45, speaker: SPEAK, text: 'both of you? *zero.*' },
  { t: 20.85, speaker: SPEAK, text: 'nervous just means you *care.*' },
]
const CPS = 30
const BOX1 = { open: 11.1, close: 13.5 }, BOX2 = { open: 18.25, close: 23.6 }

// layout
const HERO = { x: 540, y: 960, s: 300 }, HERO_L = { x: 290, y: 980, s: 220 }, HERO_T = { x: 330, y: 960, s: 250 }
const DATE_R = { x: 790, y: 980, s: 220 }, DATE_T = { x: 750, y: 960, s: 250 }
const HANDS = { lx: 190, rx: 890, y: 900, cell: 13 }, HANDS_L = { lx: 100, rx: 470, y: 925, cell: 9 }, HANDS_R = { lx: 610, rx: 980, y: 925, cell: 9 }
const PIS_AT = { x: 900, y: 1790, s: 130 }

const HERO_HOPS = [T.heroIn + 0.35, T.countIn + 0.05, ...F.downs.filter(v => v < T.allDown), T.dbl, T.laugh, T.laugh + 0.35, T.laugh + 0.7, T.five[1]]
const DATE_HOPS = [T.dateIn + 0.3, T.dbl + 0.05, T.laugh + 0.1, T.laugh + 0.45, T.laugh + 0.8, T.five[1] + 0.03]

const MIRROR = ['..FFFFFF..', '.FGGGGGGF.', 'FGGGGGGGGF', 'FGGGGGGGGF', 'FGGGGGGGGF', 'FGGGGGGGGF', 'FGGGGGGGGF', 'FGGGGGGGGF', 'FGGGGGGGGF', '.FGGGGGGF.', '..FFFFFF..']
const SHIRT = ['BB....BB', 'BBBBBBBB', 'BBBBBBBB', '.BBBBBB.', '.BBBBBB.', '.BBBBBB.']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 46px Inter", "800 28px Inter", "700 34px Inter", "italic 500 150px 'EB Garamond'", "700 120px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const PT = { top: 262, size: 84, accentSize: 112, gap: 0.08, fit: true }
  const H0 = popText(root, 'Put a finger down: | *first date* edition.', { top: 190, size: 92, accentSize: 128, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: LEO.color })
  const P1 = popText(root, '…you got there | *twenty minutes* early.', { ...PT, at: T.p1, accentColor: GOLD })
  const P2 = popText(root, '…you practiced your | laugh in the *mirror.*', { ...PT, at: T.p2, accentColor: '#7fd0ff' })
  const P3 = popText(root, '…you changed outfits | *three* times.', { ...PT, at: T.p3, accentColor: HOT })
  const P4 = popText(root, '…they said ‘enjoy your meal’ | and you said *‘you too.’*', { ...PT, size: 76, at: T.p4, accentColor: MINT })
  const P5 = popText(root, 'Plot twist: | your date’s *playing too.*', { ...PT, at: T.p5, accentColor: AQU.color })
  const P6 = popText(root, '…you’re nervous | *right now.*', { ...PT, at: T.p6, late: 2, lateAt: T.p6 + 0.5, wobble: true, accentColor: HOT })
  const H7 = popText(root, 'Everybody’s | *nervous.*', { top: 210, size: 112, accentSize: 170, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [P1, T.p1Out], [P2, T.p2Out], [P3, T.p3Out], [P4, T.p4Out], [P5, T.p5Out], [P6, T.p6Out], [H7, T.h7Out]]
  const sticker = buildSticker(root, { at: T.sticker })
  const counter = buildCounter(root, { top: 1170 })
  const cL = buildCounter(root, { top: 1150, left: 290, size: 96 }), cR = buildCounter(root, { top: 1150, left: 790, size: 96 })
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const bar = buildProgress(root, { end: STORY_END })
  const stamp = el('div', { position: 'absolute', right: '56px', top: '58px', font: `700 30px ${MONO}`, letterSpacing: '0.08em', color: BONE, padding: '4px 14px', background: 'rgba(6,4,18,0.55)', border: '2px solid rgba(239,230,214,0.5)', display: 'none', transformOrigin: '100% 50%' }, root, '7:31 PM')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  let stampTxt = ''

  // ── layout over time
  const sp = t => ease.inOutCubic(prog(t, ...T.split)) * (1 - ease.inOutCubic(prog(t, ...T.unsplit)))
  const tog = t => ease.inOutCubic(prog(t, ...T.unsplit))
  const L3 = (a, b, c, t) => { const s = sp(t), g = tog(t); return t < T.unsplit[0] ? lerp(a, b, s) : lerp(b, c, g) }

  function pisces(t) {
    const k = pop01(t, T.pisIn, 0.35, 2) * popOut(t, T.out)
    if (k <= 0.01) return
    const tears = t > T.allDown ? 3 : t > BEAT(11) ? 2 : 1
    const opts = { color: PIS.color, mood: t > T.laugh ? 'happy' : 'sparkle', look: [-1, -1], seed: 6, glow: 0.8, pop: k, hops: [T.allDown + 0.05, T.five[1]] }
    drawStarChar(x, PIS_AT.x, PIS_AT.y, PIS_AT.s, t, opts)
    inSprite(x, starFrame(PIS_AT.x, PIS_AT.y, PIS_AT.s, t, opts), () => tearsCells(x, t, tears))
    drawHands(x, t, F, { lx: PIS_AT.x - 110, rx: PIS_AT.x + 110, y: PIS_AT.y - 22, cell: 5, color: PIS.color, pop: k * outK(t, T.handsOut), sway: 0.4 })
    // Pisces' own little table + cup: the next table over
    if (t > T.table[0]) { const tk = pop01(t, T.table[0] + 0.2, 0.3, 2) * popOut(t, T.out); if (tk > 0.01) { x.save(); x.globalAlpha = tk; x.fillStyle = INK; x.fillRect(PIS_AT.x - 110, PIS_AT.y + 50, 220, 22); x.fillStyle = '#8a5a2e'; x.fillRect(PIS_AT.x - 104, PIS_AT.y + 54, 208, 14); x.restore() } }
  }

  function hero(t) {
    const k = pop01(t, T.heroIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.01) return
    const P = { x: L3(HERO.x, HERO_L.x, HERO_T.x, t), y: L3(HERO.y, HERO_L.y, HERO_T.y, t), s: L3(HERO.s, HERO_L.s, HERO_T.s, t) }
    let mood = 'happy', look = [0, 0], blink, squash = 0
    if (t < T.p1) { mood = 'wink' }
    else if (t < BEAT(7)) { mood = 'neutral'; look = [1, -1] }
    else if (t < T.p2) { mood = 'squint' }
    else if (t < T.p3) { mood = Math.floor((t - T.ha[0]) * 3.4) % 2 && t > T.ha[0] ? 'happy' : 'neutral'; look = [-1, -1] }
    else if (t < T.p4) { mood = 'neutral'; look = [0, -1] }
    else if (t < T.cringe) { mood = 'happy' }
    else if (t < T.p5) { mood = 'squint'; squash = 0.18 * ease.outCubic(prog(t, T.cringe, T.cringe + 0.3)) * (1 - prog(t, LINES[0].t + 0.6, LINES[0].t + 1.2)) }
    else if (t < T.dbl) { mood = 'neutral'; look = [1, 0] }
    else if (t < T.p6) { mood = 'wide'; look = [1, 0]; blink = false }
    else if (t < T.allDown) { mood = 'wide'; look = [1, 0] }
    else if (t < T.laugh) { mood = 'wide'; look = [1, 0] }
    else if (t < T.h7) { mood = 'happy'; look = undefined }
    else { mood = 'sparkle'; look = [1, 0] }
    drawStarChar(x, P.x, P.y, P.s, t, { color: LEO.color, glyph: LEO.glyph, mood, look, blink, hops: HERO_HOPS, pop: k, seed: 3, glow: 1.1, squash })
    if (t > T.cringe && t < T.cringe + 1.2) drawBits(x, ['B..B', '.BB.', 'B..B'], { B: BONE }, P.x + 150, P.y - 140, 7, { alpha: Math.sin(Math.PI * prog(t, T.cringe, T.cringe + 1.2)) })
  }
  function date(t) {
    if (t < T.dateIn) return
    const k = pop01(t, T.dateIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.01) return
    const sl = ease.outCubic(prog(t, T.dateIn, T.dateIn + 0.45))
    const P = { x: lerp(1250, L3(DATE_R.x, DATE_R.x, DATE_T.x, t), sl), y: L3(DATE_R.y, DATE_R.y, DATE_T.y, t), s: L3(DATE_R.s, DATE_R.s, DATE_T.s, t) }
    let mood = 'neutral', look = [-1, 0], blink
    if (t > T.dbl && t < T.p6) { mood = 'wide'; blink = false }
    else if (t > T.p6 && t < T.laugh) mood = 'wide'
    else if (t > T.laugh && t < T.h7) { mood = 'happy'; look = undefined }
    else if (t > T.h7) { mood = 'sparkle' }
    drawStarChar(x, P.x, P.y, P.s, t, { color: AQU.color, glyph: AQU.glyph, mood, look, blink, hops: DATE_HOPS, pop: k, seed: 8, glow: 1.1 })
    const hk = sl * outK(t, T.handsOut)
    if (hk > 0.01) drawHands(x, t, DF, { ...HANDS_R, lx: HANDS_R.lx + (1 - sl) * 700, rx: HANDS_R.rx + (1 - sl) * 700, y: HANDS_R.y + ease.inCubic(prog(t, ...T.handsOut)) * 700, color: AQU.color, pop: 1, alpha: hk })
  }
  function divider(t) {
    const a = sp(t)
    if (a <= 0.01) return
    x.save(); x.globalAlpha = 0.8 * a
    x.fillStyle = INK; x.fillRect(536, 470, 10, 1000 * a)
    x.fillStyle = BONE; x.fillRect(538, 470, 6, 1000 * a)
    x.restore()
  }
  function table(t) {
    if (t < T.table[0]) return
    const k = easeOutBack(prog(t, ...T.table), 1.4) * popOut(t, T.out)
    if (k <= 0.01) return
    const y = lerp(1500, 1075, clamp(k))
    x.save(); x.globalAlpha = clamp(k * 2)
    x.fillStyle = INK; x.fillRect(150, y - 8, 780, 44); x.fillRect(250, y + 30, 30, 70); x.fillRect(800, y + 30, 30, 70)
    x.fillStyle = '#8a5a2e'; x.fillRect(158, y, 764, 28); x.fillStyle = '#a8703c'; x.fillRect(158, y, 764, 8)
    for (const cx of [478, 602]) { x.fillStyle = INK; x.fillRect(cx - 34, y - 70, 68, 70); x.fillStyle = BONE; x.fillRect(cx - 28, y - 64, 56, 60); x.fillStyle = '#8a5a2e'; x.fillRect(cx - 28, y - 64, 56, 12)
      for (let i = 0; i < 2; i++) { x.fillStyle = `rgba(239,230,214,${0.4 * Math.max(0, Math.sin(t * 2 + i + cx))})`; x.fillRect(cx - 10 + i * 16, y - 100 - ((t * 30 + i * 13) % 26), 6, 18) } }
    x.restore()
  }
  function highFive(t) {
    if (t < T.five[0]) return
    const p = ease.outCubic(prog(t, ...T.five)), k = popOut(t, T.out)
    if (k <= 0.01) return
    const dt = t - T.five[1], j = dt > 0 && dt < 0.4 ? Math.exp(-dt * 10) * 14 : 0
    drawHand(x, lerp(-60, 478, p) - j, 720, 12 * k, t, { side: -1, color: LEO.color })
    drawHand(x, lerp(1140, 602, p) + j, 720, 12 * k, t, { side: 1, color: AQU.color })
    sparkles(x, t, 540, 700, T.five[1], 12, 170, 1, [GOLD, BONE, HOT])
  }

  // props
  function prop1(t) {
    const o = [T.p1Out[0] - 0.1, T.p1Out[1]]
    const k = pop01(t, T.clk, 0.3, 2.2) * popOut(t, o)
    if (k <= 0.01) return
    x.save(); x.translate(380, 640); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = INK; x.fillRect(Math.cos(a) * 82 - 5, Math.sin(a) * 82 - 5, 10, 10) }
    const mA = -Math.PI / 2 + Math.PI * 2 * (40 / 60) + (t - T.clk) * 0.8, hA = -Math.PI / 2 + Math.PI * 2 * (7.67 / 12)
    x.strokeStyle = INK; x.lineCap = 'square'; x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(hA) * 50, Math.sin(hA) * 50); x.stroke()
    x.strokeStyle = HOT; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(mA) * 76, Math.sin(mA) * 76); x.stroke()
    x.restore()
    drawBubble(x, t, { cx: 760, cy: 620, text: 'DATE: 8:00', at: T.clk + 0.3, out: o, side: 'L', size: 44, weight: 800, font: MONO, col: '#ffe27a' })
  }
  function prop2(t) {
    const o = [T.p2Out[0] - 0.1, T.p2Out[1]]
    const k = pop01(t, T.mir, 0.32, 2) * popOut(t, o)
    if (k <= 0.01) return
    drawBits(x, MIRROR, { F: GOLD, G: '#9ed7f0' }, 540, 640, 24 * k)
    const laughing = t > T.ha[0] && Math.floor((t - T.ha[0]) * 3.4) % 2 === 0
    drawStarChar(x, 540, 655, 150 * k, t, { color: LEO.color, mood: laughing ? 'happy' : 'neutral', look: [1, -1], seed: 4, glow: 0.4, hops: T.ha })
    ;['ha.', 'ha.', 'HA.'].forEach((s, i) => drawBubble(x, t, { cx: 760 + i * 30, cy: 520 + i * 70, text: s, at: T.ha[i], out: o, side: 'L', size: 34 + i * 10, weight: 800 }))
  }
  function prop3(t) {
    const o = [T.p3Out[0] - 0.1, T.p3Out[1]]
    const cols = ['#4f8df0', '#e2475e', '#2fbf6a']
    T.shirts.forEach((at, i) => {
      const k = pop01(t, at, 0.3, 2.4) * popOut(t, o)
      if (k <= 0.01) return
      const cx = 300 + i * 240
      drawBits(x, SHIRT, { B: cols[i] }, cx, 640, 22 * k, { rot: (i - 1) * 0.08 })
      if (i < 2 && t > T.shirts[i + 1]) { const s = prog(t, T.shirts[i + 1], T.shirts[i + 1] + 0.15); x.save(); x.strokeStyle = HOT; x.lineWidth = 14; x.globalAlpha = k > 0.5 ? 1 : k; x.beginPath(); x.moveTo(cx - 90, 560); x.lineTo(cx - 90 + 180 * s, 560 + 160 * s); x.stroke(); x.restore() }
      if (i === 2 && t > at + 0.3) drawBits(x, ['.....G', '....GG', 'G..GG.', 'GGGG..', '.GG...'], { G: MINT }, cx + 90, 560, 8 * k)
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 2.5))
      const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      const dS = t - T.allDown, shake = dS > 0 && dS < 0.45 ? 14 * Math.exp(-dS * 9) * Math.sin(dS * 55) : 0
      if (t < T.out[1] + 0.02) {
        pisces(t)
        prop1(t); prop2(t); prop3(t)
        x.save(); x.translate(0, shake)
        divider(t)
        hero(t)
        const hk = pop01(t, T.handsIn[0], T.handsIn[1] - T.handsIn[0], 1.8)
        const ho = ease.inCubic(prog(t, ...T.handsOut)), s = sp(t)
        if (ho < 1) drawHands(x, t, F, { lx: lerp(HANDS.lx, HANDS_L.lx, s), rx: lerp(HANDS.rx, HANDS_L.rx, s), y: lerp(HANDS.y, HANDS_L.y, s) + (1 - clamp(hk)) * 500 + ho * 700, cell: lerp(HANDS.cell, HANDS_L.cell, s), color: LEO.color, pop: clamp(hk, 0, 1.2), alpha: 1 - ho })
        date(t)
        table(t)
        highFive(t)
        x.restore()
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      sticker.update(t, outK(t, T.stickerOut))
      counter.update(t, F, pop01(t, T.countIn, 0.3, 2.2) * outK(t, [T.split[0], T.split[0] + 0.2]), { at: T.countIn })
      const ck = pop01(t, T.split[1] - 0.1, 0.3, 2.2) * outK(t, T.countOut)
      cL.update(t, F, ck, { at: T.split[1] - 0.1 }); cR.update(t, DF, ck * clamp(pop01(t, T.dateIn + 0.4, 0.3, 2.2)), { at: T.dateIn + 0.4 })
      box1.update(t); box2.update(t)
      bug.update(t, outK(t, T.bugOut))
      bar.update(t)
      // timestamp overlay
      let s2 = STAMPS[0][1], sAt = 0; for (const [a, v] of STAMPS) if (t >= a) { s2 = v; sAt = a }
      if (s2 !== stampTxt) { stamp.textContent = s2; stampTxt = s2 }
      const sk = pop01(t, T.clock, 0.3, 2) * outK(t, T.bugOut)
      stamp.style.display = sk > 0.01 ? 'block' : 'none'
      const bump = t - sAt < 0.3 && sAt > 0 ? 0.15 * Math.sin(Math.PI * (t - sAt) / 0.3) : 0
      stamp.style.opacity = String(clamp(sk * 2)); stamp.style.transform = `scale(${(sk * (1 + bump)).toFixed(3)})`
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.6, right before the split-screen twist)
const CUTS = [9.62, { t: T.cut, kind: 'flip' }, 17.98]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // cold open
  ...wordPops(T.h0, 4, 0.07, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0], ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.clock, 0.04],
  ['pop', T.heroIn + 0.05, 739.99, 0.04, 0], ['whoosh', T.handsIn[0], 0.4, 0.04], ['pop', T.countIn, 1318.51, 0.04, 0],
  ['pop', T.pisIn + 0.05, 987.77, 0.025, 0.5],
  ['tick', T.sticker, 0.08], ['pop', T.sticker + 0.02, 659.25, 0.05, 0], ['whoosh', T.sticker - 0.12, 0.25, 0.03],
  ...STAMPS.slice(1).map(([a]) => ['tick', +(a + 0.02).toFixed(3), 0.035]),
  // prompts
  ...wordPops(T.p1, 4, 0.08, 1), ['pop', T.clk, 880, 0.04, -0.2], ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.clk + 0.3 + i * 0.25).toFixed(3), 0.02]),
  ...wordPops(T.p2, 5, 0.08, 2), ['pop', T.mir, 739.99, 0.04, 0], ...T.ha.map((v, i) => ['pop', v, [880, 880, 1318.51][i], 0.04, 0.3]),
  ...wordPops(T.p3, 5, 0.08, 3), ...T.shirts.map((v, i) => ['pop', v, NOTE[i * 2], 0.04, (i - 1) * 0.3]), ['whoosh', T.shirts[1], 0.15, 0.025], ['whoosh', T.shirts[2], 0.15, 0.025], ['pluck', T.shirts[2] + 0.3, 1567.98, 0.035, 0.4, 0.3],
  ...wordPops(T.p4, 6, 0.08, 4), ['pop', T.cringe + 0.05, 392, 0.04, 0], ['pluck', T.cringe + 0.2, 329.63, 0.03, 0.6, 0],
  // plot twist: the split
  ...wordPops(T.p5, 5, 0.08, 0), ['whoosh', T.split[0], 0.45, 0.04], ['whoosh', T.dateIn, 0.4, 0.04], ['pop', T.dateIn + 0.4, 1318.51, 0.04, 0.3],
  ['pop', T.dbl, 1174.66, 0.045, -0.2], ['pop', T.dbl + 0.05, 1174.66, 0.045, 0.2],
  // nervous right now: silence, then twelve fingers at once
  ...wordPops(T.p6, 2, 0.08, 1), ['pop', T.p6 + 0.5, 1174.66, 0.045, 0], ['pop', T.p6 + 0.6, 1567.98, 0.04, 0],
  ['riser', T.p6 + 0.8, T.allDown - 0.05, 0.025],
  ['boom', T.allDown, 0.3], ['tom', T.allDown, 92, { gain: 0.28, decay: 0.3 }], ['glitter', T.allDown + 0.05, T.allDown + 0.45],
  ...[0, 0.35, 0.7].map(d => ['pop', +(T.laugh + d).toFixed(3), 1174.66, 0.035, 0]), ...[0.1, 0.45, 0.8].map(d => ['pop', +(T.laugh + d).toFixed(3), 1567.98, 0.03, 0.2]),
  // the table
  ['whoosh', T.handsOut[0], 0.4, 0.035], ['whoosh', T.table[0], 0.35, 0.03], ['tick', T.table[1], 0.06],
  ...talkCues(LINES, { cps: CPS }),
  // the high five
  ['pop', T.h7Land, 1174.66, 0.045, 0], ['pop', T.h7Land + 0.1, 1567.98, 0.04, 0],
  ['whoosh', T.five[0], 0.3, 0.035], ['clap', T.five[1], { gain: 0.3 }], ['bell', T.five[1] + 0.03, 1760, 0.03, 1.1, 0], ['glitter', T.five[1], T.five[1] + 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...fingerCues(F),
  ...DF.downs.filter(v => v > T.allDown).map((v, i) => ['tick', +v.toFixed(3), 0.03]),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
