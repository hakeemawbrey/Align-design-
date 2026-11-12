// r2t0513: star_talk, BE LIKE, "“Can I ask you…?” | Zodiacs *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · G)
// The five words that stop every heart: twelve signs in zodiac order, each the most extreme version of itself. Ending: lesson.
//   3.6–49.2   ♈ said yes before you finished · ♉ is it about food? · ♊ asked six questions back · ♋ apologised in advance
//              · ♌ hoped it was "what's your sign?" · ♍ wants it in writing · ♎ polled the group chat on what you meant
//              · ♏ already knows the answer · ♐ hoped it was a road trip · ♑ booked it for next quarter
//              · ♒ answered with a better question · ♓ "of course you can", sobbing
//  49.2        "Five little words. | *Twelve meltdowns.*"
//  52.4        LESSON: "Just ask. | Most answers are *kind.*"  STATUS: ASKED
//  58.3        "The question? | *“Fries or salad?”*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const QMARK = ['.QQQQ.', 'QQ..QQ', '....QQ', '...QQ.', '..QQ..', '..QQ..', '......', '..QQ..']
const Q_C = { Q: GOLD }
const ENV = ['WWWWWWWWWWWW', 'WKWWWWWWWWKW', 'WWKKWWWWKKWW', 'WWWWKKKKWWWW', 'WWWWWRRWWWWW', 'WWWWWRRWWWWW', 'WWWWWWWWWWWW']
const ENV_C = { W: CREAM, K: SLATE, R: '#e23d66' }
const FRIES = ['.Y.Y.Y.', '.YYYYY.', 'YYYYYYY', 'RRRRRRR', 'RWRRRWR', '.RRRRR.', '.RRRRR.']
const FRIES_C = { Y: '#ffd23a', R: RED, W: CREAM }

const CAMEOS = [
  { sign: 'aries', cap: 'Said yes | *before you finished.*', mood: 'sparkle', star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'can i ask y—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      bubble(x, 760, 930, 'YES.', pop01(t, P.t0 + 0.55, 0.25, 2.6), { size: 96, col: '#f0603a', tail: 'bl' })
      label(x, 790, 1120, 'TO WHAT? UNKNOWN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'First question back: | *is it about food?*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BM.PIZZA, BM.PIZZA_C, 790, 900, 22 * pop01(t, P.t0 + 0.9, 0.35, 2))
      bubble(x, 790, 690, 'snack related?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: '#e9b24a', tail: 'bl' })
      label(x, 790, 1100, 'LISTENING NOW ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked six | *questions back.*', mood: 'wink', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const Q = ['who?', 'when?', 'why me?', 'is it tea?', 'can i tell?', 'what?']
      Q.forEach((q, i) => bubble(x, 700 + (i % 2) * 170, 640 + Math.floor(i / 2) * 150, q, pop01(t, P.t0 + 0.3 + i * 0.22, 0.22, 2.2), { size: 32, col: i % 2 ? '#f2cf4a' : BONE, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Assumed the worst. | *Apologised in advance.*', mood: 'wide', look: [1, 0], star: { x: -170 }, squash: 0.04,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'i’m so sorry | for whatever | it is!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      label(x, 790, 1060, 'SORRIES: 14', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Hoped it was | *“what’s your sign?”*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2), { w: 330, h: 300, head: '♌︎ MY PROFILE', headCol: '#f39a3a', size: 30, align: 'center', rows: [
        ['sign: LEO', INK, pop01(t, P.t0 + 0.6, 0.2, 2)], ['rising: LEO', INK, pop01(t, P.t0 + 0.9, 0.2, 2)], ['moon: guess', RED, pop01(t, P.t0 + 1.2, 0.2, 2)],
      ] })
      label(x, 790, 1100, 'READY SINCE BIRTH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Asked for it | *in writing.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 380, head: 'QUESTION FORM', headCol: '#ef5c94', size: 28, rows: [
        ['topic: ______', INK], ['urgency: 1–10', INK, pop01(t, P.t0 + 0.6, 0.2, 2)], ['sources: ___', INK, pop01(t, P.t0 + 1.0, 0.2, 2)], ['sign here ✍︎', RED, pop01(t, P.t0 + 1.4, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'Polled the group chat: | *what did they mean?*', mood: 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'POLL', headCol: '#e163d6', lines: [
        ['good thing?', MINT, pop01(t, P.t0 + 0.5, 0.2, 2)], ['bad thing?', PINK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['both??', LAV, pop01(t, P.t0 + 1.1, 0.2, 2)], ['votes: 37', GOLD, pop01(t, P.t0 + 1.5, 0.2, 2), true],
      ] })
    } },
  { sign: 'scorpio', cap: 'Already knows | *the question.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ENV, ENV_C, 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 })
      label(x, 790, 690, 'ANSWER: SEALED', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: '#e23d66', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1070, 'WRITTEN: TUESDAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Hoped it was | *a road trip.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', star: { x: 150 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      drawBits(x, BM.TENT, BM.TENT_C, 320, 930, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 330, 680, 'car’s packed!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: '#a35cf0', tail: 'br' })
      label(x, 320, 1100, 'LEAVING: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Booked it | *for next quarter.*', mood: 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      sheet(x, 330, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 340, head: 'AGENDA', headCol: '#2fc79a', size: 28, rows: [
        ['ITEM 1: your q.', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['time: 4 min', INK, pop01(t, P.t0 + 0.9, 0.2, 2)], ['date: Q3', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
  { sign: 'aquarius', cap: 'Answered with | *a better question.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'but what IS | a question?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: '#38c4ec', tail: 'bl' })
      drawBits(x, QMARK, Q_C, 790, 980, 18 * pop01(t, P.t0 + 1.2, 0.35, 2), { rot: 0.1 * Math.sin(t * 3) })
    } },
  { sign: 'pisces', cap: '“Of course you can.” | *Sobbing.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you trust me | that much?!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: '#7c74f0', tail: 'bl' })
      hearts(x, t, 790, 980, P.t0 + 1.0, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0513', key: 'G', accent: GOLD, ending: 'lesson',
  title: '“Can I ask you…?” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Five little words. | *Twelve meltdowns.*' },
  lesson: { text: 'Just ask. | Most answers are *kind.*', chip: 'STATUS: ASKED' },
  last: {
    text: 'The question? | *“Fries or salad?”*',
    draw(x, t, lt) { drawBits(x, FRIES, FRIES_C, 540, 780, 21 * pop01(t, t - lt + 1.0, 0.35, 2)); sparkles(x, t, 540, 760, t - lt + 1.1, 8, 180, 0.4) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
