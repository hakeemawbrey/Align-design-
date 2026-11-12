// r2a0132: star_advice, ADVICE SOLO, "Signs a Libra | misses you." (~52 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the soft, sideways ways a Libra says "I miss you",
// each with a warm read on it and one gag.
//   0.0–3.6    "Signs a Libra | *misses you.*"
//   3.6–37.8   liked a photo from years ago · sent a song (it's a love letter) · bought two coffees out of habit
//              · saved your seat, just in case · read your horoscope before theirs · kept your hoodie
//              · asked your friends how you are · "how's your mom?" means you · a "hi" waiting: say it first
//  37.8        "Subtle. | *Sincere.*"
//  41.0        LESSON UNLOCKED: "Soft signs count. | *Say it back.*"  MATCH: MISSED
//  46.9        "Plot twist: | *Aries texted first.*" over the match card: Libra + Aries.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP } from './props.js'

const S = 'libra', ROSE = '#ff9ccf'
const CUP = ['.s.s....', '..s.s...', 'WWWWWW..', 'BBBBBBWW', 'WWWWWW.W', 'WWWWWWWW', 'WWWWWW..', '.WWWW...']
const CUP_C = { W: CREAM, B: '#8a4a2e', s: 'rgba(239,230,214,0.7)' }
const CHAIR = ['.WWWWWW.', '.WWWWWW.', '.WWWWWW.', '.WWWWWW.', 'SSSSSSSS', 'SSSSSSSS', 'L......L', 'L......L', 'L......L']
const CHAIR_C = { W: '#c97bff', S: '#a05fd6', L: BROWN }
const HOODIE = ['...HHHH...', '..HH..HH..', '.HHHHHHHH.', 'HHHHHHHHHH', 'HH.HHHH.HH', 'HH.HPPH.HH', 'HH.HPPH.HH', '...HHHH...', '...HHHH...']
const HOODIE_C = { H: SKYB, P: '#6fc3ff' }

const CAMEOS = [
  { sign: S, cap: 'Liked your photo | from *three years ago.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 850, 280, 320, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2a2350', rot: 0.04 }, () => {
        x.fillStyle = '#8fd0ff'; x.fillRect(-120, -140, 240, 200); x.fillStyle = '#5fd068'; x.fillRect(-120, 20, 240, 40)
        x.fillStyle = GOLD; x.beginPath(); x.arc(60, -80, 30, 0, Math.PI * 2); x.fill()
        txt(x, 'posted: ages ago', 0, 110, { size: 22, font: MONO, weight: 700, color: BONE })
      })
      const h = pop01(t, P.t0 + 1.0, 0.3, 2.6)
      if (h > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 790, 830, 18 * h)
      label(x, 790, 1100, 'OOPS. (NOT OOPS.)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: ROSE, rot: -0.04 })
    } },
  { sign: S, cap: 'Sent you a song. | It’s *a love letter.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'LIBRA', headCol: ROSE, size: 28, lines: [
        ['♪ listen to this', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['no reason :)', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)]] })
      notes(x, t, 790, 760, { n: 4, cell: 7, col: ROSE, seed: 1 })
      label(x, 790, 1110, 'TRANSLATION: ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Bought two coffees. | *Out of habit.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CUP, CUP_C, 720, 900, 20 * k); drawBits(x, CUP, CUP_C, 880, 900, 20 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 880, 1060, 'YOURS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: ROSE, rot: 0.06, font: MONO, weight: 700 })
      bubble(x, 790, 680, 'oh no. again.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Saved your seat. | *Just in case.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 790, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 860, 'RESERVED', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
      label(x, 790, 650, 'DAY 9', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Read your horoscope | *before theirs.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 830, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.15)
      label(x, 790, 1060, 'YOURS FIRST', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: ROSE, rot: -0.04 })
      bubble(x, 790, 640, 'good week ahead!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Kept your hoodie. | *Wears it daily.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', star: { x: -180 },
    front(x, t, lt, P, F) {
      drawBits(x, HOODIE, HOODIE_C, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 800, 1100, 'WORN: DAILY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 650, 'NOT GIVING IT BACK', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04 })
    } },
  { sign: S, cap: 'Asks your friends | *how you’re doing.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'gemini', 720, 1000, 150 * k, { mood: 'wink', look: [-1, 0], seed: 21, glyph: false }); signChar(x, t, 'sagittarius', 880, 1000, 150 * k, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false }) }
      bubble(x, 760, 680, 'how are they? | (casually)', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 800, 1140, 'ASKED: 6 TIMES', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“How’s your mom?” | means *“how are you?”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'how’s your mom??', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 790, 960, 'also… you?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: ROSE, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'They miss you. | *Say hi first.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'YOU → LIBRA', headCol: MINT, size: 30, lines: [
        ['hi :)', MINT, pop01(t, P.t0 + 0.8, 0.3, 2.4)], ['HI!!! ♡♡', ROSE, pop01(t, P.t0 + 1.3, 0.25, 2.4)]] })
      hearts(x, t, 790, 1150, P.t0 + 1.4, { n: 6, life: 1.6, spread: 260, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0132', key: 'F', accent: ROSE, solo: S, ending: 'card',
  title: 'Signs a Libra | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'aries', chip: "IT'S A MATCH" },
  group: { cap: 'Subtle. | *Sincere.*', mood: 'heart' },
  lesson: { text: 'Soft signs count. | *Say it back.*', chip: 'MATCH: MISSED' },
  last: { text: 'Plot twist: | *Aries texted first.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
