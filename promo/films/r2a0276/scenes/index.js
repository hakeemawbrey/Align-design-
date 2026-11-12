// r2a0276: star_advice, ADVICE SOLO (capricorn), "Capricorn, let yourself | be loved." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One Capricorn the whole way through: nine relatable truths, each with a warm reframe and one light visual gag.
//   0.0–3.6    "Capricorn, let yourself | *be loved.*"
//   3.6–37.8   nine cards: you plan every birthday, let someone plan yours · help isn't weakness, it's a team · you don't
//              have to earn a hug · take the compliment, don't return it · rest is maintenance · someone made you soup, let
//              them · you're more than your to-do list · your soft side, we love it · they said they're proud, believe them
//  37.8        the group beat is the ending: "You carry so much. | *Let love carry you.*" (solo: the big star, in love).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, bar, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'capricorn', ACC = '#7dffb0'
const ST = { x: -170 }

const BOX = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWWWTTWWWK', 'KWWWTTWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const BOX_C = { K: BROWN, W: WOOD, T: CREAM }
const BOWL = ['OOOOOOOOOOOOO', 'OYYYYYYYYYYYO', '.OWWWWWWWWWO.', '..OWWWWWWWO..', '...OOOOOOO...']
const BOWL_C = { S: '#ffffff', O: INK, Y: '#ffd86b', W: '#e8eef8' }
const CASE = ['...KKKK...', '...K..K...', 'KKKKKKKKKK', 'KBBBBBBBBK', 'KBBBGGBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KKKKKKKKKK']
const CASE_C = { K: INK, B: '#5b3a24', G: GOLD }
const PLUSH = ['.BB....BB.', 'BBBBBBBBBB', 'BBWBBBBWBB', 'BBKBBBBKBB', 'BBBBPPBBBB', '.BBBBBBBB.', '..BBBBBB..']
const PLUSH_C = { B: '#c98f6a', W: '#fff', K: INK, P: PINK }

const CAMEOS = [
  { sign: S, cap: 'You plan every birthday. | Let *someone plan yours.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 820, 330, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = RED; x.fillRect(-165, -150, 330, 60)
        txt(x, 'YOUR BIRTHDAY', 0, -120, { size: 28, font: MONO, weight: 700, color: CREAM })
        txt(x, 'PLANNED BY:', 0, -40, { size: 26, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, lt > 1.1 ? 'US!' : 'you?', 0, 40, { size: 70, color: lt > 1.1 ? GREEN : GREY })
      })
      confetti(x, t, 790, 800, P.t0 + 1.2, { n: 18, spread: 200, h: 480 })
      label(x, 790, 1110, 'JUST SHOW UP', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Needing help isn’t weak. | It’s *a team.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), g = ease.inOutCubic(prog(lt, 0.9, 1.5))
      const f = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (f > 0.01) signChar(x, t, 'taurus', 890, 1110, 140 * f, { mood: lt > 1.5 ? 'sparkle' : 'happy', look: [-1, -1], seed: 21, glyph: false })
      for (let i = 0; i < 5; i++) {
        const mine = i < 2, j = i - 2
        const bx = mine ? 650 : lerp(650, 890, g), by = mine ? 1110 - i * 84 : lerp(1110 - i * 84, 990 - j * 84, g)
        drawBits(x, BOX, BOX_C, bx, by, 14 * k, { rot: Math.sin(i * 2.1 + t * (g < 1 ? 3 : 0)) * 0.04 })
      }
      bubble(x, 860, 620, 'I got these', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: S, cap: 'You don’t have to | *earn a hug.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 830, 300, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'RECEIPT', 0, -140, { size: 30, font: MONO, weight: 700 })
        x.fillStyle = '#b9b0a0'; x.fillRect(-110, -96, 220, 3); x.fillRect(-110, 76, 220, 3)
        txt(x, 'HUG ×1', -100, -40, { size: 30, font: MONO, weight: 700, align: 'left' })
        txt(x, 'COST:', -100, 30, { size: 30, font: MONO, weight: 700, align: 'left', color: '#6b62a8' })
        txt(x, lt > 1.0 ? 'FREE' : '???', 100, 30, { size: 34, font: MONO, weight: 700, align: 'right', color: lt > 1.0 ? GREEN : RED })
        txt(x, 'ALWAYS.', 0, 120, { size: 40 })
      })
      hearts(x, t, 560, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Take the compliment. | *Keep it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'you’re amazing', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: PINK, tail: 'br' })
      const out = prog(lt, 0.7, 1.0)
      label(x, 790, 880, 'RETURN TO SENDER', pop01(t, P.t0 + 0.4, 0.3, 2) * (1 - out), { size: 32, bg: GREY, rot: -0.06, font: MONO, weight: 700 })
      label(x, 790, 880, 'ACCEPTED ✓', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 52, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.05, 7, 170, 0.5)
    } },
  { sign: S, cap: 'Rest isn’t lazy. | It’s *maintenance.*', mood: lt => lt > 0.8 ? 'sleepy' : 'neutral', star: { x: -170, y: 20 },
    front(x, t, lt, P) {
      const p = clamp((lt - 0.5) / 1.6)
      bar(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05 + 0.95 * p, p < 1 ? 'CHARGING…' : 'FULLY CHARGED', { col: p < 0.3 ? RED : MINT, w: 300 })
      label(x, 790, 680, 'BATTERY: YOU', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'NAP: APPROVED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04 })
    } },
  { sign: S, cap: 'Someone made you soup. | *Let them.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const kb = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BOWL, BOWL_C, 760, 1000, 26 * kb)
      if (kb > 0.9) { x.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) { const ph = (t * 0.6 + i * 0.2) % 1; x.globalAlpha = 0.7 * Math.sin(Math.PI * ph); x.fillRect(700 + i * 30 + 8 * Math.sin(ph * 6 + i), 920 - ph * 150, 12, 24) } x.globalAlpha = 1 }
      const f = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (f > 0.01) signChar(x, t, 'cancer', 900, 720, 170 * f, { mood: 'heart', look: [-1, 1], seed: 22, glyph: false })
      bubble(x, 690, 640, 'sit. eat.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'br' })
      label(x, 770, 1120, 'NO EMAILS AT THE TABLE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: MINT, rot: -0.03 })
    } },
  { sign: S, cap: 'You’re more than | your *to-do list.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ITEMS = ['email boss', 'fix budget', 'gym 5 a.m.', 'be loved']
      card(x, 790, 850, 340, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'TO DO', 0, -150, { size: 34, font: MONO, weight: 700 })
        ITEMS.forEach((s, i) => {
          const y = -80 + i * 72, last = i === 3, on = lt > 0.5 + i * 0.35
          x.fillStyle = INK; x.fillRect(-140, y - 18, 36, 36); x.fillStyle = CREAM; x.fillRect(-134, y - 12, 24, 24)
          if (on) { x.fillStyle = last ? PINK : GREEN; x.fillRect(-130, y - 8, 16, 16) }
          txt(x, s, -86, y, { size: last ? 34 : 28, align: 'left', color: last ? '#d4366a' : INK })
        })
      })
      hearts(x, t, 560, 880, P.t0 + 1.6, { n: 4, life: 1.5, spread: 100, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Your soft side? | We *love it.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CASE, CASE_C, 790, 1000, 26 * k)
      const p = pop01(t, P.t0 + 1.0, 0.4, 2.2)
      if (p > 0.01) drawBits(x, PLUSH, PLUSH_C, 790, lerp(990, 770, p), 18 * p, { rot: 0.08 * Math.sin(t * 3) })
      label(x, 790, 610, 'SERIOUS BRIEFCASE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 770, P.t0 + 1.2, 6, 140, 0.2)
    } },
  { sign: S, cap: 'They said they’re proud. | *Believe them.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 790, 860, 1.25 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: '✦ YOUR MATCH', headCol: PINK, size: 26, lines: [
        ['how was today?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['busy. fine.', GREY, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
        ['proud of you', PINK, pop01(t, P.t0 + 1.2, 0.25, 2.2)],
      ] })
      hearts(x, t, 560, 860, P.t0 + 1.4, { n: 5, life: 1.6, spread: 100, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0276', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'Capricorn, let | yourself *be loved.*',
  cameos: CAMEOS,
  group: { cap: 'You carry so much. | *Let love carry you.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
