// r2a0514: star_advice, ADVICE ROLL CALL, "Each sign’s | *generous side.*" (~57 s vertical, signs3kit, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific way each one gives, with a light gag. Ending: callback.
//   3.6–49.2   ♈ first to help, already on the way · ♉ shares the last slice · ♊ sends songs that are so you · ♋ remembers
//              your favourite everything · ♌ hypes you up in public · ♍ fixes your CV at midnight · ♎ the best compliments
//              · ♏ keeps every secret forever · ♐ gives you the window seat · ♑ blocks out time for you · ♒ lends anything,
//              never asks back · ♓ gives you their heart (and tissues)
//  49.2        "Twelve ways | *to give.*"
//  52.6        callback: "And Taurus? | *Saved you a slice.*" (card 2's slice, set aside)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const SLICE = ['YYYYYYYYYY', '.YRYYYRYY.', '..YYYRYY..', '...YRYY...', '....YY....']
const SLICE_C = { Y: '#ffd23a', R: RED }
const WINDOW = ['.KKKKKKK.', 'KSSSSSSSK', 'KSSSWSSSK', 'KSSWWWSSK', 'KSSSSSSSK', 'KSGGGGGSK', 'KGGGGGGGK', '.KKKKKKK.']
const WINDOW_C = { K: '#c9c9d8', S: SKYB, W: '#ffffff', G: GREEN }
const TISSUE = ['..WW..', '.WWWW.', 'BBBBBB', 'BBBBBB', 'BBBBBB']
const TISSUE_C = { W: '#ffffff', B: LAV }
const MEGA = ['......KK', '....KKYK', 'KKKKYYYK', 'KYYYYYYK', 'KKKKYYYK', '....KKYK', '......KK']
const MEGA_C = { K: INK, Y: '#f39a3a' }

const CAMEOS = [
  { sign: 'aries', cap: 'First to help. | *Already on the way.*', mood: 'sparkle', star: { x: -170 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'need a hand?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: '#f0603a', tail: 'bl' })
      label(x, 790, 940, 'ETA: NOW', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 48, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, '(YOU DIDN’T ASK)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Shares the last slice. | *That’s love.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.7, 1.3))
      drawBits(x, SLICE, SLICE_C, lerp(600, 820, p), 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      label(x, 790, 700, 'THE LAST ONE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'FOR YOU ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: '#e9b24a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Sends you songs | *that are so you.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P, F) {
      notes(x, t, F.x + 40, F.cy - 110, { n: 4, cell: 7, col: '#f2cf4a', seed: 2 })
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FOR YOU', headCol: '#f2cf4a', lines: [
        ['♪ this is u', LAV, pop01(t, P.t0 + 0.5, 0.2, 2)], ['♪ also u', MINT, pop01(t, P.t0 + 0.9, 0.2, 2)], ['♪ SO u', PINK, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
  { sign: 'cancer', cap: 'Remembers your | *favourite everything.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 380, head: 'YOUR FAVES', headCol: '#3fb6f0', size: 28, rows: [
        ['tea: no sugar', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['film: the sad one', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['colour: green', INK, pop01(t, P.t0 + 1.1, 0.2, 2)], ['since: 2nd grade', RED, pop01(t, P.t0 + 1.5, 0.2, 2)],
      ] })
    } },
  { sign: 'leo', cap: 'Hypes you up | *in public.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, MEGA, MEGA_C, F.x + 180, F.cy - 20, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'MY FRIEND | IS A GENIUS', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: '#f39a3a', tail: 'bl' })
      label(x, 800, 1110, 'VOLUME: MAX', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Fixes your CV | *at midnight.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 380, head: 'YOUR CV', headCol: '#ef5c94', size: 28, rows: [
        ['skils', INK], ['→ skills', RED, pop01(t, P.t0 + 0.6, 0.2, 2)], ['team player', INK], ['→ team LEADER', RED, pop01(t, P.t0 + 1.1, 0.2, 2)], ['you’re hired ♡', GREEN, pop01(t, P.t0 + 1.6, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'Gives the best | *compliments.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const Q = ['your laugh!!', 'that jacket??', 'iconic.']
      Q.forEach((q, i) => bubble(x, 760 + (i % 2) * 50, 680 + i * 170, q, pop01(t, P.t0 + 0.3 + i * 0.45, 0.25, 2.2), { size: 38, col: i % 2 ? '#e163d6' : BONE, tail: 'bl' }))
    } },
  { sign: 'scorpio', cap: 'Keeps every secret. | *Forever.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BM.LOCK, BM.LOCK_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'SAFE WITH ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: '#e23d66', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Gives you | *the window seat.*', mood: 'happy', star: { x: 150 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, WINDOW, WINDOW_C, 330, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 330, 1110, 'YOURS ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: '#a35cf0', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Blocks out time. | *Their rarest gift.*', mood: 'happy', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      sheet(x, 330, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 380, head: 'CALENDAR', headCol: '#2fc79a', size: 28, rows: [
        ['9:00 meeting', SLATE], ['11:00 meeting', SLATE], ['2:00 YOU ♡', RED, pop01(t, P.t0 + 0.9, 0.25, 2.4)], ['4:00 meeting', SLATE],
      ] })
    } },
  { sign: 'aquarius', cap: 'Lends you anything. | *Never asks back.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BM.BOOK, BM.BOOK_C, 790, 920, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'BORROWED: 2019', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'KEEP IT ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: '#38c4ec', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Gives you their heart. | *And their tissues.*', mood: 'heart', tears: 2, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 950, 20 * pop01(t, P.t0 + 0.9, 0.3, 2))
      hearts(x, t, 790, 860, P.t0 + 0.3, { n: 6, life: 2.0, spread: 200, cell: 8, seed: 4 })
      label(x, 790, 1110, 'LAST BOX. YOURS.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: '#7c74f0', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0514', key: 'E', accent: MINT, ending: 'callback',
  title: 'Each sign’s | *generous side.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | *to give.*' },
  last: {
    text: 'And Taurus? | *Saved you a slice.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'taurus', 400, 1010, 280, { mood: 'heart', look: [1, 0], pop: k, seed: 12, hops: [t - lt + 1.0] })
      drawBits(x, SLICE, SLICE_C, 730, 1000, 22 * k, { rot: -0.1 })
      label(x, 730, 1180, 'RESERVED ♡', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 560, 900, t - lt + 1.3, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
