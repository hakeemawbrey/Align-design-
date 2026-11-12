// r2a0499: star_advice, ADVICE ROLLCALL, "Each sign's | *kind of hug.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, one warm and specific hug each, with a light visual gag. Ending: callback.
//   ♈ lifts you off the ground · ♉ the long one (they don't let go) · ♋ feels like home · ♊ hugs mid-story
//   · ♌ the announced public hug · ♍ fixes your collar mid-hug · ♎ perfectly even · ♏ rare, deep, everything
//   · ♐ the airport reunion · ♑ scheduled, sincere · ♒ the side hug (still counts) · ♓ hugs you and cries
//   group "Every hug | *says I love you.*"   last "Taurus is | *still hugging.*" (the long hug, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8fb1', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
// a friend star standing next to the sign (the one being hugged)
const pal = (x, t, P, id, cx, cy, s, o = {}) => { const k = pop01(t, P.t0 + 0.2, 0.3, 2); if (k > 0.01) return signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 40 + P.i, look: [-1, 0], ...o }) }
const HOUSE = ['.....RR.....', '....RRRR....', '...RRRRRR...', '..RRRRRRRR..', '.RRRRRRRRRR.', 'RRRRRRRRRRRR', '.WWWWWWWWWW.', '.WYYWWWWYYW.', '.WYYWDDWYYW.', '.WWWWDDWWWW.', '.WWWWDDWWWW.']
const HOUSE_C = { R: '#e06a3a', W: CREAM, Y: '#ffe36b', D: BROWN }
const CASE = ['...KKKK...', '...K..K...', 'KKKKKKKKKK', 'KMMMMMMMMK', 'KMYMMMMYMK', 'KMMMMMMMMK', 'KMMMMMMMMK', 'KKKKKKKKKK', '.K......K.']

const CAMEOS = [
  { sign: 'aries', cap: 'Lifts you off the ground. | *Joy, airborne.*', mood: 'heart', star: { x: -150, y: -40 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      pal(x, t, P, 'libra', 700, 780 - Math.abs(Math.sin(t * 5)) * 60, 180, { mood: 'sparkle' })
      L(x, 790, 1100, 'ALTITUDE: HAPPY', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
      hearts(x, t, 600, 760, P.t0 + 0.8, { n: 5, life: 1.6, spread: 260, cell: 7, seed: 1 })
    } },
  { sign: 'taurus', cap: 'The long, slow hug. | *They don’t let go.*', mood: 'heart', star: { x: -100 },
    front(x, t, lt, P) {
      pal(x, t, P, 'cancer', 640, 900, 220, { mood: lt > 1.5 ? 'wide' : 'happy' })
      const m = Math.floor(clamp((lt - 0.3) / 1.8) * 3)
      L(x, 790, 650, `HUG: ${m}:${String(Math.floor(lt * 25) % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, 0.05, 40)
      bubble(x, 790, 1110, 'five more minutes', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Hugs you mid-story. | *Keeps talking.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -120 },
    front(x, t, lt, P) {
      pal(x, t, P, 'virgo', 640, 920, 200, { mood: 'happy' })
      const W = ['and THEN—', 'so anyway—', 'wait, also—']
      bubble(x, 790, 660, W[Math.floor(lt * 1.4) % 3], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1110, 'STORY: STILL GOING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'The hug that | *feels like home.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1110, 'WELCOME BACK ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
      hearts(x, t, 790, 760, P.t0 + 1.0, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'The big public hug. | *So everyone knows.*', mood: 'sparkle', star: { x: -150 }, hops: [0.5],
    front(x, t, lt, P) {
      pal(x, t, P, 'pisces', 700, 940, 190, { mood: 'heart', tears: 1 })
      L(x, 790, 650, 'ANNOUNCING: A HUG', pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, 0.05, 34)
      sparkles(x, t, 600, 860, P.t0 + 1.0, 8, 220, 0.4)
      L(x, 790, 1120, 'CROWD: APPLAUDS', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Hugs you, then | *fixes your collar.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', star: { x: -120 },
    front(x, t, lt, P) {
      const F = pal(x, t, P, 'gemini', 660, 920, 210, { mood: lt > 1.4 ? 'sparkle' : 'neutral' })
      L(x, 800, 650, lt > 1.4 ? 'COLLAR: FIXED ✓' : 'COLLAR: CROOKED', pop01(t, P.t0 + 0.4, 0.3, 2.2), lt > 1.4 ? MINT : BONE, 0.05, 32)
      bubble(x, 800, 1110, 'there. perfect.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Perfectly balanced. | *Both arms, equal.*', mood: 'heart', star: { x: 0, y: -20, s: 260 },
    front(x, t, lt, P) {
      pal(x, t, P, 'aries', 280, 940, 170, { mood: 'happy', look: [1, 0] })
      pal(x, t, P, 'taurus', 800, 940, 170, { mood: 'happy' })
      L(x, 540, 640, 'FAIRNESS: 50 / 50', pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Rare. Deep. | *Means everything.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', star: { x: -120 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pal(x, t, P, 'leo', 650, 920, 200, { mood: lt > 1.2 ? 'wide' : 'happy' })
      L(x, 800, 650, '✦ RARE ITEM UNLOCKED', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, 0.05, 30)
      sparkles(x, t, 540, 900, P.t0 + 1.2, 8, 220, 0.6)
    } },
  { sign: 'sagittarius', cap: 'The airport hug. | *Every reunion.*', mood: 'heart', star: { x: -150 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      drawBits(x, CASE, { K: INK, M: '#b38bff', Y: GOLD }, 850, 1030, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      pal(x, t, P, 'capricorn', 700, 880, 170, { mood: 'heart' })
      L(x, 800, 640, 'ARRIVALS ✈︎', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 36)
    } },
  { sign: 'capricorn', cap: 'Scheduled. Sincere. | *Firm pat included.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', star: { x: -120 },
    front(x, t, lt, P) {
      pal(x, t, P, 'aquarius', 650, 920, 200, { mood: 'happy', squash: lt > 1.3 ? 0.04 * Math.sin(t * 20) : 0 })
      L(x, 800, 650, 'HUG: 3:00 PM ✓', pop01(t, P.t0 + 0.3, 0.3, 2.2), MINT, 0.05, 34)
      if (lt > 1.3) L(x, 800, 1110, 'PAT. PAT.', pop01(t, P.t0 + 1.35 * 1.29, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'aquarius', cap: 'The side hug. | *Still counts.*', mood: 'sparkle', look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      pal(x, t, P, 'sagittarius', 600, 900, 190, { mood: 'happy', look: [1, 0] })
      L(x, 800, 650, 'HUG ANGLE: 90°', pop01(t, P.t0 + 0.5, 0.3, 2.2), SKYB, 0.05, 32)
      L(x, 800, 1110, 'LOVE: 100%', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Hugs you and cries. | *Every single time.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -120 },
    front(x, t, lt, P) {
      pal(x, t, P, 'scorpio', 650, 920, 200, { mood: 'happy' })
      L(x, 800, 650, 'SHOULDER: SOAKED', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, 0.05, 32)
      hearts(x, t, 540, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0499', key: 'E', accent: ACC,
  title: 'Each sign’s | *kind of hug.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Every hug | *says I love you.*' },
  last: {
    text: 'Taurus is | *still hugging.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      if (k > 0.01) { signChar(x, t, 'taurus', 470, 1060, 260 * k, { mood: 'heart', seed: 5, look: [1, 0] }); signChar(x, t, 'cancer', 650, 1060, 240 * k, { mood: 'wide', seed: 6, look: [-1, 0] }) }
      label(x, 540, 1320, 'HUG: 9:41', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 900, t - lt + 1.4, { n: 7, life: 2.0, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
