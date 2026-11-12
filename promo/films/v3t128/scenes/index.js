// v3t128: THE SIGNS AS… v3, "The signs | at a picnic." (~57 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    hook. The twelve line up, then dive into the pip row.
//   3.6–49.2   one picnic per sign, pushed to the extreme:
//              ♈ raced for a spot, claimed the whole park · ♉ packed forty sandwiches · ♊ talked so much the ants
//              listened · ♋ sunscreen for everyone's face · ♌ picnic outfit: a gown · ♍ brought a level for the blanket
//              · ♎ made a snack board for the ducks · ♏ sat in the shade, wore three hats · ♐ threw the frisbee into
//              the next town · ♑ brought a laptop, took a call · ♒ fed the birds, now they follow them · ♓ watched an ant
//              carry a crumb, wept
//  49.2        "Snacks: gone. | *Vibes: perfect.*"
//  52.6        callback: "The ant | *made it home.*" (the ant and its crumb come back, hearts)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', DARK = '#2a2350', STEEL = '#9aa5c4', BROWN = '#8a4a2e', GREEN = '#5fd068'

const FLAG = [
  'KRRRRRR',
  'KRRRRRR',
  'KRRRRR.',
  'K......',
  'K......',
  'K......',
  'K......',
]
const SANDWICH = [
  '.BBBBBBB.',
  'BBBBBBBBB',
  'GGGGGGGGG',
  'PPPPPPPPP',
  'BBBBBBBBB',
]
const SANDWICH_C = { B: '#e8c27a', G: GREEN, P: PINK }
const ANT = [
  '.K...K.',
  '..K.K..',
  'KK.K.KK',
  'KKKKKKK',
  '.K.K.K.',
]
const BOTTLE = [
  '..KK..',
  '..WW..',
  '.YYYY.',
  '.YWWY.',
  '.YWWY.',
  '.YYYY.',
]
const GOWN = [
  '...PP...',
  '..PPPP..',
  '..PPPP..',
  '.PPPPPP.',
  '.PPPPPP.',
  'PPPPPPPP',
  'PPPPPPPP',
  'PPPPPPPP',
]
const LEVEL = [
  'YYYYYYYYYYYYYY',
  'YYYYYKGGKYYYYY',
  'YYYYYKGGKYYYYY',
  'YYYYYYYYYYYYYY',
]
const BOARD = [
  '.BBBBBBBBBBB.',
  'BBCCBBGGBBPPB',
  'BBCCBBGGBBPPB',
  'BBBBBBBBBBBBB',
  '...........BB',
]
const BOARD_C = { B: '#c98a5a', C: GOLD, G: GREEN, P: PINK }
const DUCK = [
  '..YY...',
  '.YKYO..',
  '..YY...',
  '.YYYYY.',
  'YYYYYYY',
  '.YYYYY.',
]
const DUCK_C = { Y: '#ffd23a', K: INK, O: '#ff9a4a' }
const HAT = [
  '..KKKK..',
  '..KKKK..',
  'KKKKKKKK',
]
const DISC = [
  '..RRRR..',
  '.RWWWWR.',
  'RRRRRRRR',
]
const LAPTOP = [
  '.KKKKKKKKKK.',
  '.KSSSSSSSSK.',
  '.KSSSSSSSSK.',
  '.KSSSSSSSSK.',
  'KKKKKKKKKKKK',
]
const BIRD = [
  '..KK..',
  '.KKWK.',
  'KKKKKO',
  '.KKK..',
  '..K...',
]
const BIRD_C = { K: STEEL, W: INK, O: GOLD }

function ant(x, cx, cy, cell, k, t) {
  drawBits(x, ANT, { K: '#ff6b5a' }, cx, cy + Math.sin(t * 20) * 1.5, cell * k)
  x.fillStyle = INK; x.fillRect(cx - cell * 1.5 - 3, cy - cell * 4.5 - 3, cell * 3 + 6, cell * 3 + 6)
  x.fillStyle = '#e8c27a'; x.fillRect(cx - cell * 1.5, cy - cell * 4.5, cell * 3 * k, cell * 3 * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Raced for a spot. | *Claimed the whole park.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', star: { x: -150 }, hops: [0.3, 0.6, 1.0],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: BONE, R: RED }, 800, 860, 24 * pop01(t, P.t0 + 0.6, 0.3, 2.2))
      label(x, 790, 1080, 'ALL OF IT: MINE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Packed the basket. | *Forty sandwiches.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      const n = Math.min(8, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.16))
      for (let i = 0; i < n; i++) drawBits(x, SANDWICH, SANDWICH_C, 790 + Math.sin(i * 2.3) * 14, 1080 - i * 44, 15, { rot: Math.sin(i * 1.7) * 0.06 })
      label(x, 790, 660, 'SANDWICHES: 40', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Talked so much | *the ants listened.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'and ANOTHER | thing—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      for (let i = 0; i < 4; i++) drawBits(x, ANT, { K: '#ff6b5a' }, 660 + i * 90, 1060, 12 * pop01(t, P.t0 + 0.8 + i * 0.15, 0.3, 2))
      label(x, 790, 940, 'AUDIENCE: ANTS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Brought sunscreen | *for everyone’s face.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, { K: DARK, W: BONE, Y: '#ffd23a' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      bubble(x, 790, 660, 'hold still.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Picnic outfit: | *a ball gown.*', mood: 'sparkle', star: { x: -160 }, hops: [1.0],
    back(x, t, lt, P, F) { drawBits(x, GOWN, { P: '#ffb34a' }, F.x, F.cy + 120, 30 * pop01(t, P.t0 + 0.4, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'DRESS CODE: ME', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: '#ffb34a', rot: 0.05 })
      sparkles(x, t, 390, 900, P.t0 + 0.7, 8, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Brought a level | *for the blanket.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const tilt = lt < 1.2 ? 0.08 * Math.cos(lt * 6) : 0
      drawBits(x, LEVEL, { Y: '#ffd23a', K: INK, G: MINT }, 790, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: tilt })
      label(x, 790, 740, lt > 1.2 ? 'LEVEL: YES' : 'LEVEL: NO', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: lt > 1.2 ? MINT : RED, color: lt > 1.2 ? INK : BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Made a snack board. | *For the ducks.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOARD, BOARD_C, 790, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 2; i++) drawBits(x, DUCK, DUCK_C, 720 + i * 150, 800 + Math.sin(t * 4 + i) * 6, 16 * pop01(t, P.t0 + 0.9 + i * 0.25, 0.3, 2))
      label(x, 790, 640, 'TABLE FOR 2', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Sat in the shade. | Wore *three hats.*', mood: 'neutral', look: [1, 0], star: { x: -160, y: 40 },
    front(x, t, lt, P, F) {
      for (let i = 0; i < 3; i++) drawBits(x, HAT, { K: [INK, '#c97bff', DARK][i] }, F.x, F.top - 10 - i * 40, (24 - i * 3) * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2))
      label(x, 790, 860, 'SUN: AVOIDED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Threw the frisbee. | *Into the next town.*', mood: lt => lt > 0.6 ? 'wide' : 'sparkle', look: [1, -1], star: { x: -170 }, hops: [0.4],
    front(x, t, lt, P) {
      const p = prog(lt, 0.4, 1.4)
      if (p > 0 && p < 1) drawBits(x, DISC, { R: RED, W: BONE }, lerp(480, 1000, p), lerp(800, 520, p) - Math.sin(Math.PI * p) * 120, 14 * (1 - 0.6 * p))
      label(x, 790, 960, 'WHERE’D IT GO?', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05 })
      bubble(x, 790, 1100, 'my bad!', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Brought a laptop. | *Took a call.*', mood: lt => lt < 1.0 ? 'neutral' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: DARK, S: SKYB }, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'per my last | sandwich', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Fed the birds. | *Now they follow them.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.25))
      for (let i = 0; i < n; i++) drawBits(x, BIRD, BIRD_C, 660 + (i % 3) * 120, 760 + Math.floor(i / 3) * 140 + Math.sin(t * 6 + i) * 6, 14)
      label(x, 790, 1100, 'FLOCK: 6', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw an ant | carry a crumb. *Wept.*', mood: lt => lt < 0.7 ? 'happy' : 'wide', tears: lt => lt < 0.7 ? 1 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = clamp(lt / 2.4)
      ant(x, lerp(700, 880, p), 1000, 12, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      bubble(x, 790, 720, 'you can | DO it', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t128', key: 'E', accent: GREEN, ending: 'callback',
  title: 'The signs | *at a picnic.*',
  cameos: CAMEOS,
  group: { cap: 'Snacks: gone. | *Vibes: perfect.*' },
  last: {
    text: 'The ant | *made it home.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.3, 2)
      if (k > 0.01) {
        x.fillStyle = INK; x.fillRect(640, 1060, 240, 150); x.fillStyle = '#8a4a2e'; x.fillRect(652, 1072, 216, 138); x.fillStyle = '#5fd068'; x.fillRect(630, 1040, 260, 30); x.fillStyle = INK; x.fillRect(730, 1130, 60, 80)
        ant(x, lerp(300, 620, ease.outCubic(clamp((lt - 0.4) / 1.4))), 1180, 22, k, t)
      }
      label(x, 760, 980, 'HOME', pop01(t, t - lt + 1.7, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
      hearts(x, t, 540, 1150, t - lt + 1.8, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
