// r2t0514: star_talk, BE LIKE, "Paper cut? | Zodiacs *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · D)
// The smallest wound there is: twelve signs in zodiac order, each the most extreme version of itself. Ending: callback.
//   3.6–49.2   ♈ fought the paper, paper won · ♉ didn't notice, was eating · ♊ told the story forty ways · ♋ nursed it with
//              soup · ♌ wore the plaster like jewellery · ♍ filed an incident report · ♎ asked the paper if it was okay
//              · ♏ the paper is on the list · ♐ "battle scar", showed everyone · ♑ invoiced the paper · ♒ microscope
//              · ♓ tiny cut, huge sobbing
//  49.2        "Smallest wound. | *Biggest drama.*"
//  52.6        callback: "Aries | *wants a rematch.*" (card 1's paper, round 2)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const PAPER = ['WWWWWWWW', 'WLLLLLLW', 'WWWWWWWW', 'WLLLLLWW', 'WWWWWWWW', 'WLLLLLLW', 'WWWWWWWW', 'WLLLWWWW', 'WWWWWWWW']
const PAPER_C = { W: CREAM, L: '#b9b0a0' }
const PLASTER = ['..TTTTTTTT..', '.TTPTTTTPTT.', 'TTTTPPPPTTTT', 'TTTTPPPPTTTT', '.TTPTTTTPTT.', '..TTTTTTTT..']
const PLASTER_C = { T: '#e8b27a', P: '#ffd9b0' }
const GOLDP_C = { T: GOLD, P: '#fff1a8' }
const SANDW = ['..BBBBBBB..', '.BBBBBBBBB.', 'GGGGGGGGGGG', 'RRRRRRRRRRR', 'YYYYYYYYYYY', '.BBBBBBBBB.']
const SANDW_C = { B: '#e8a24a', G: GREEN, R: RED, Y: GOLD }
const SCOPE = ['....KK....', '...KSSK...', '...KSSK...', '....SS....', '....SS....', '...SSSS...', '..S....S..', '.SSS..SSS.', 'KKKKKKKKKK']
const SCOPE_C = { K: '#2a2350', S: '#c9c9d8' }

function paperFight(x, t, cx, cy, cell, lt) { drawBits(x, PAPER, PAPER_C, cx + 10 * Math.sin(t * 14) * (lt < 1.6 ? 1 : 0), cy, cell, { rot: 0.15 * Math.sin(t * 9) }) }

const CAMEOS = [
  { sign: 'aries', cap: 'Fought the paper. | *Paper won.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      paperFight(x, t, 780, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 680, 'ROUND 1', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'WINNER: PAPER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Didn’t notice. | *Was eating.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SANDW, SANDW_C, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 + 0.04 * Math.sin(t * 8) })
      label(x, 790, 700, 'PAIN: AFTER LUNCH', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told the story | *forty different ways.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const Q = ['it was SO deep', 'almost lost it', 'a shark, basically', 'version 40:']
      Q.forEach((q, i) => bubble(x, 760 + (i % 2) * 40, 640 + i * 140, q, pop01(t, P.t0 + 0.3 + i * 0.35, 0.22, 2.2), { size: 32, col: i % 2 ? '#f2cf4a' : BONE, tail: 'bl' }))
    } },
  { sign: 'cancer', cap: 'Made it soup. | *Tucked it in.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BM.SOUP, BM.SOUP_C, 790, 860, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, BM.BLANKET, BM.BLANKET_C, 790, 1040, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 680, 'GET WELL, FINGER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Wore the plaster | *like jewellery.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const gold = lt > 0.9
      drawBits(x, PLASTER, gold ? GOLDP_C : PLASTER_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      sparkles(x, t, 790, 900, P.t0 + 0.9 * (3.1 / 2.4), 8, 190, 0.2)
      label(x, 790, 1090, 'HEALING ERA ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#f39a3a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Filed an | *incident report.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 400, head: 'INCIDENT #1', headCol: '#ef5c94', size: 28, rows: [
        ['cause: A4 sheet', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['size: 2 mm', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['photos: 14', INK, pop01(t, P.t0 + 1.1, 0.2, 2)], ['severity: HIGH', RED, pop01(t, P.t0 + 1.5, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'Asked the paper | *if it was okay.*', mood: 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PAPER, PAPER_C, 800, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      bubble(x, 790, 700, 'are YOU | okay??', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, col: '#e163d6', tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'The paper | *is on the list.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 360, head: 'THE LIST', headCol: '#e23d66', size: 30, rows: [
        ['the ex', INK], ['that one aunt', INK], ['PAPER', RED, pop01(t, P.t0 + 1.0, 0.25, 2.4)],
      ] })
      label(x, 790, 1110, 'FORGIVEN: NEVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Called it a battle scar. | *Showed everyone.*', mood: 'sparkle', star: { x: 150 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      bubble(x, 330, 690, 'you should’ve | SEEN it', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: '#a35cf0', tail: 'br' })
      drawBits(x, PLASTER, PLASTER_C, 330, 920, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 330, 1100, 'TOLD: 31 PEOPLE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Kept working. | *Invoiced the paper.*', mood: 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      sheet(x, 330, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 360, head: 'INVOICE', headCol: '#2fc79a', size: 28, rows: [
        ['to: paper', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['for: damages', INK, pop01(t, P.t0 + 0.9, 0.2, 2)], ['due: today', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
  { sign: 'aquarius', cap: 'Studied the cut | *under a microscope.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'fascinating.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: '#38c4ec', tail: 'bl' })
      label(x, 790, 1110, 'PAPER: PUBLISHED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Tiny cut. | *Huge sobbing.*', mood: 'wide', tears: lt => lt < 0.7 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLASTER, PLASTER_C, 790, 900, 9 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1050, 'HOLD ME', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: '#7c74f0', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 720, 'SIZE: 1 MM', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0514', key: 'D', accent: '#ff8f6a', ending: 'callback',
  title: 'Paper cut? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Smallest wound. | *Biggest drama.*' },
  last: {
    text: 'Aries | *wants a rematch.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'aries', 400, 1010, 290, { mood: 'squint', look: [1, 0], pop: k, seed: 12, hops: [t - lt + 0.9, t - lt + 1.4, t - lt + 1.9] })
      paperFight(x, t, 730, 990, 18 * k, 0)
      label(x, 560, 1250, 'ROUND 2: FIGHT', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
