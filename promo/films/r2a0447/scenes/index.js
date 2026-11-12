// r2a0447: star_advice, ADVICE SOLO, "How to befriend | *a Taurus.*" (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one light gag each. Ending: callback.
//   3.6–37.8   feed them first · slow to open up, worth the wait · don't rush the plan (the snail) · meet the plants
//              · same café every week is love · cosy night in · stubborn = loyalty · ask about their chart
//              · they share food: you're family
//  37.8        "Slow to start. | *Friends for life.*"
//  41.2        callback: "The snail | *made it.*" (card 3's snail finally arrives)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, meter, chartWheel, BM, RED, CREAM, ORANGE, WOOD, GREEN } from './props.js'

const S = 'taurus', TGREEN = '#5fd068'
const SNAIL = ['....SSSS....', '...SBBBBS...', '..SBSSSSBS..', '..SBSBBSBS.K', '..SBSSBSBS.K', '...SBBBBS.YY', 'YYYYYYYYYYYY', '.YYYYYYYYYY.']
const SNAIL_C = { S: '#c98f5a', B: '#e8b27a', Y: '#b6e08a', K: INK }
const BREAD = ['..BBBBBB..', '.BWBBBBWB.', 'BBBBBBBBBB', 'BBBBBBBBBB', '.BBBBBBBB.']
const BREAD_C = { B: '#e8a24a', W: '#ffd8a0' }

function snail(x, cx, cy, cell, t) { drawBits(x, SNAIL, SNAIL_C, cx, cy + Math.sin(t * 4) * 2, cell) }

const CAMEOS = [
  { sign: S, cap: 'Feed them first. | *Talk second.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      drawBits(x, BM.SOUP.slice(2), BM.SOUP_C, 790, 1000, 20 * k)
      drawBits(x, BREAD, BREAD_C, 790, 880, 18 * k)
      label(x, 790, 680, lt > 1.2 ? 'MOOD: FED ✓' : 'MOOD: LOADING', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: lt > 1.2 ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow to open up. | *Worth the wait.*', mood: lt => lt > 1.6 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 700, 'TRUST', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: BONE, rot: 0, font: MONO, weight: 700 })
      meter(x, 790, 810, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inCubic(prog(lt, 0.3, 1.7)), { w: 320, h: 52, col: TGREEN, text: lt > 1.7 ? 'FULL ♡' : '' })
      label(x, 790, 960, lt > 1.7 ? 'DAY 40: BESTIES' : 'DAY 1…', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: lt > 1.7 ? PINK : LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 810, P.t0 + 0.05 + 1.7 * (3.1 / 2.4), 8, 180, 0.3)
    } },
  { sign: S, cap: 'Don’t rush the plan. | They *like it slow.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      snail(x, lerp(700, 760, prog(lt, 0, 2.4)), 980, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), t)
      bubble(x, 790, 700, 'on my way!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: TGREEN, tail: 'bl' })
      label(x, 800, 1130, 'ETA: SATURDAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Meet the plants. | *All of them.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const N = ['FERN', 'BASIL', 'DAVE']
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2)
        drawBits(x, BM.PLANT, BM.PLANT_C, 660 + i * 130, 920, 13 * k)
        label(x, 660 + i * 130, 1030, N[i], k, { size: 26, bg: BONE, rot: i % 2 ? 0.06 : -0.06, font: MONO, weight: 700 })
      }
      label(x, 790, 680, '+ 37 MORE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: TGREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Same café every week? | *That’s love.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, BM.MUG, BM.MUG_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillStyle = BONE; x.fillRect(740 + i * 40 + Math.sin(ph * 6) * 8, 800 - ph * 100, 10, 26); x.restore() }
      label(x, 790, 1070, 'THE USUAL ✓', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 660, 'VISIT 312', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cosy night in? | Their *dream plan.*', mood: 'sleepy', look: [1, 0], star: { x: -150, y: 10 },
    front(x, t, lt, P) {
      drawBits(x, BM.BLANKET, BM.BLANKET_C, 390, 1010, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, BM.SOUP, BM.SOUP_C, 790, 950, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 790, 700, 'pyjamas | at 6 p.m.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Stubborn? | It’s *loyalty in disguise.*', mood: 'neutral', look: [1, 0], star: { x: -170 }, squash: 0.03,
    front(x, t, lt, P) {
      const sw = lt > 1.3
      label(x, 790, 760, sw ? 'STAYING. FOR YOU.' : 'NOT MOVING.', pop01(t, P.t0 + 0.3, 0.3, 2), { size: sw ? 36 : 44, bg: sw ? PINK : BONE, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, BM.SHIELD, BM.SHIELD_C, 790, 960, 14 * pop01(t, P.t0 + 1.3, 0.3, 2))
      sparkles(x, t, 790, 760, P.t0 + 1.3 * (3.1 / 2.4), 7, 180, 0.2)
    } },
  { sign: S, cap: 'Ask about their chart. | *Bring snacks.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 120)
      label(x, 790, 1010, 'EARTH SIGN ♉︎', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: TGREEN, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'TALK TIME: 3 HRS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They share food? | *You’re family now.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 920, 220 * k, { mood: lt > 1.5 ? 'heart' : 'wide', look: [-1, 0], seed: 33, glyph: false })
      const slide = ease.inOutCubic(prog(lt, 0.8, 1.4))
      drawBits(x, BM.CHEESE, BM.CHEESE_C, 520, 1050, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.8) drawBits(x, BM.CHEESE, BM.CHEESE_C, lerp(560, 720, slide), 1040, 13)
      label(x, 600, 640, 'HALF. FOR YOU.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0447', key: 'F', accent: '#5fd068', solo: S, ending: 'callback',
  title: 'How to befriend | *a Taurus.*',
  cameos: CAMEOS,
  group: { cap: 'Slow to start. | *Friends for life.*', mood: 'heart' },
  last: {
    text: 'The snail | *made it.*',
    draw(x, t, lt) {
      const p = ease.outCubic(prog(lt, 0.2, 2.4))
      drawBits(x, SNAIL, SNAIL_C, lerp(-40, 540, p), 1000 + Math.sin(t * 4) * 3, 22)
      if (lt > 2.0) label(x, 540, 1180, 'ARRIVED ✓', pop01(t, t - lt + 2.0, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 980, t - lt + 2.1, 8, 200, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
