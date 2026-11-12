// r2a0680: ADVICE SOLO, "Signs a Sagittarius | misses you." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign (solo, 9 cards): the little signs a Sag misses you, each with a warm read, one gag each. Ending: card.
//   a meme at 3 a.m. (a love letter) · tells your stories to strangers · a trip with you in it (two boarding passes)
//   · "remember when…?" · "was in the area" (not really) · a random sunset photo · restless without you
//   · laughs out loud at your texts · checks your horoscope before their own
//   group "Hard to read? | *Not really.*"   LESSON "Missed by a Sag? | *That’s special.*"
//   last "Boarding passes: | *still two.*" over the match card: Sagittarius + Aries.
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER } from '../props.js'

const S = 'sagittarius', L = { x: -170 }, SAG = '#ff9a4a'
const DOOR = [
  'WWWWWWWWW',
  'WDDDDDDDW',
  'WDdddddDW',
  'WDdddddDW',
  'WDDDDDDDW',
  'WDdddddDW',
  'WDdddddYW',
  'WDdddddDW',
  'WDDDDDDDW',
  'WDdddddDW',
  'WDDDDDDDW',
]
const DOOR_C = { W: BONE, D: WOOD, d: '#a8743f', Y: GOLD }

const CAMEOS = [
  { sign: S, cap: 'A meme at 3 a.m.? | *That’s a love letter.*', mood: lt => lt > 1.2 ? 'happy' : 'wink', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 820, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '3:07', head: 'NEW MESSAGE', msg: 'lol this | is so you', bg: MINT })
      hearts(x, t, 790, 640, P.t0 + 1.2, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Tells your stories | *to strangers.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'okay so my | friend once…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 940, 'STORY #12: YOU', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: SAG, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plans a trip | *with you in it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 750, 770, pop01(t, P.t0 + 0.2, 0.3, 2), 'SAG | SEAT 1A', { head: 'BOARDING PASS', headBg: SKYB, size: 36, w: 280, rot: -0.06, font: MONO, weight: 700 })
      note(x, 820, 990, pop01(t, P.t0 + 0.8, 0.3, 2), 'YOU | SEAT 1B', { head: 'BOARDING PASS', headBg: PINK, size: 36, w: 280, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Remember when…?” | *They’re time-travelling.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, -1], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'remember when | we got lost?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      label(x, 790, 940, 'MEMORY LANE: OPEN', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Was in the area.” | *They weren’t.*', mood: 'wink', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 830, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 660, 'knock knock!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'br' })
      label(x, 790, 1120, 'DROVE 2 HRS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: SAG, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sent you a sunset? | *Wish you were there.*', mood: 'sleepy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, 790, 830, 1.1 * k, { top: '7:42 PM', head: 'PHOTO', msg: ' | | ', bg: '#ff9a4a' })
      bits(x, 'sun', 795, 870, 12 * k)
    } },
  { sign: S, cap: 'Restless without you? | *That’s missing you.*', mood: 'wide', look: [1, 0], star: L, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      label(x, 780, 760, 'PACING: LEVEL 9', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'what are you | doing rn?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Laughs out loud | *at your texts.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', look: [1, 0], star: L, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, 790, 820, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '♐︎', head: 'YOU', msg: 'my plant | has a cold', bg: LAV })
      label(x, 790, 1100, 'LOL (OUT LOUD)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checks your horoscope | *before their own.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'YOUR SIGN: | a lucky day ✦ | MINE: | later', { head: 'TODAY', headBg: GOLD, size: 38, w: 360 })
      label(x, 790, 1080, 'CHECKED FIRST ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0680', key: 'G', accent: SAG, solo: S, ending: 'card',
  title: 'Signs a Sagittarius | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'sagittarius', b: 'aries', chip: 'IT’S A MATCH' },
  group: { cap: 'Hard to read? | *Not really.*', mood: 'heart' },
  lesson: { text: 'Missed by a Sag? | *That’s special.*', chip: 'MISSED: A LOT' },
  last: { text: 'Boarding passes: | *still two.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
