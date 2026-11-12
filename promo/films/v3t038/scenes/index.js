// v3t038: THE SIGNS AS… v3, "The signs meet | the parents." (~57 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    the hook, the twelve line up, then dive into the pip row.
//   3.6–49.2   meeting the parents, one sign per card, each pushed to the extreme:
//              ♈ minute one: called them Mom · ♉ stayed for the lasagna · ♊ Dad told one story, Gemini told nine
//              · ♋ now texts your mom more than you do · ♌ left a signed photo on the fridge · ♍ washed the dishes, then the oven
//              · ♎ sided with Mom, and with Dad · ♏ silent all dinner, Grandma loves them · ♐ invited them on a road trip
//              · ♑ brought a résumé, just in case · ♒ taught Grandma to code · ♓ Mom asked their sign, Pisces sobbed
//  49.2        group: "Parents: *obsessed.*"
//  52.6        callback: "Taurus left | *with the leftovers.*" (the lasagna from Taurus' card)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CREAM = '#fff4e2'

const LASAGNA = [
  '.s....s....s..',
  '..s....s....s.',
  'KKKKKKKKKKKKKK',
  'KRRRRRRRRRRRRK',
  'KYYYYYYYYYYYYK',
  'KRRRRRRRRRRRRK',
  'KYYYYYYYYYYYYK',
  '.KKKKKKKKKKKK.',
]
const LAS_C = { s: 'rgba(239,230,214,0.7)', K: '#c4c8e0', R: '#d84a3a', Y: '#ffd23a' }
const FRIDGE = [
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  'WWWWWWWWKW',
  'WWWWWWWWKW',
  'WWWWWWWWWW',
  'SSSSSSSSSS',
  'WWWWWWWWWW',
  'WWWWWWWWKW',
  'WWWWWWWWKW',
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  'WWWWWWWWWW',
]
const PLATE = [
  '..WWWWWWW..',
  '.WWSSSSSWW.',
  'WWSSSSSSSWW',
  '.WWSSSSSWW.',
  '..WWWWWWW..',
]
const LAPTOP = [
  '.SSSSSSSSSSSS.',
  '.SBBBBBBBBBBS.',
  '.SBGGGBBBBBBS.',
  '.SBBBGGGGBBBS.',
  '.SBGGBBBBBBBS.',
  '.SBBBBBBBBBBS.',
  '.SSSSSSSSSSSS.',
  'KKKKKKKKKKKKKK',
]
const LAPTOP_C = { S: '#9aa5c4', B: '#2a2350', G: MINT, K: '#5a5a7a' }

// a sheet of paper with a heading and lines
function paper(x, cx, cy, k, head, { rot = 0.04, lines = 4, w = 260, h = 340, col = '#b9b0a0' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 46)
  x.fillStyle = col; for (let i = 0; i < lines; i++) x.fillRect(-w / 2 + 30, -h / 2 + 100 + i * 52, w - 60 - (i % 2) * 50, 16)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Minute one: | called them *“Mom.”*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'hi MOM!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 960, 'TIME: 0:59', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Came to meet them. | *Stayed for lasagna.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LASAGNA, LAS_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1100, 'PLATE #3', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Dad told one story. | *Gemini told nine.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const W = ['so ANYWAY', 'which reminds me', 'okay two more', 'and THEN—']
      bubble(x, 790, 700, W[Math.min(3, Math.floor(lt / 0.55))], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 980, 'STORIES: ' + Math.min(9, 1 + Math.floor(lt * 4)), pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Now texts your mom | *more than you do.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      const M = ['soup recipe?', 'love u ♥', 'sunday lunch?']
      for (let i = 0; i < 3; i++) bubble(x, 760 + (i % 2) * 40, 650 + i * 150, M[i], pop01(t, P.t0 + 0.3 + i * 0.45, 0.25, 2.2), { size: 38, col: [CREAM, PINK, SKYB][i], tail: i % 2 ? 'br' : 'bl' })
    } },
  { sign: 'leo', cap: 'Left a signed photo | *on the fridge.*', mood: 'sparkle', star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, FRIDGE, { W: '#e8ecf4', S: '#9aa5c4', K: '#9aa5c4' }, 790, 880, 34 * k)
      const p = pop01(t, P.t0 + 0.9, 0.3, 2.2)
      if (p > 0.01) {
        x.save(); x.translate(760, 780); x.rotate(-0.08); x.scale(p, p)
        x.fillStyle = INK; x.fillRect(-70, -80, 140, 160); x.fillStyle = GOLD; x.fillRect(-62, -72, 124, 144); x.restore()
        signChar(x, t, 'leo', 760, 780, 110 * clamp(p), { mood: 'wink', seed: 31, glyph: false })
      }
      label(x, 790, 1150, '“XOXO, LEO”', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Washed the dishes. | *Then the oven.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 4; i++) drawBits(x, PLATE, { W: CREAM, S: '#c4e8f4' }, 790, 1060 - i * 50, 22 * k)
      sparkles(x, t, 790, 900, P.t0 + 0.8, 8, 180, 0.3, [BONE, SKYB])
      label(x, 790, 650, 'OVEN: SPOTLESS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Sided with Mom. | *And* with Dad.', mood: lt => Math.floor(lt * 2) % 2 ? 'sparkle' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { y: -60 },
    front(x, t, lt, P) {
      bubble(x, 290, 640, 'so true, Mom!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'br' })
      bubble(x, 790, 640, 'so true, Dad!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 540, 1120, 'PEACE: KEPT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Silent all dinner. | Grandma *loves them.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 690, '. . .', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 70, tail: 'bl' })
      label(x, 790, 1000, 'GRANDMA: ♥♥♥', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 4, life: 1.0, spread: 260, cell: 6, seed: 8 })
    } },
  { sign: 'sagittarius', cap: 'Invited the parents | *on a road trip.*', mood: 'sparkle', star: { x: 150 }, hops: [0.4, 0.9, 1.4],
    front(x, t, lt, P) {
      paper(x, 330, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'ROUTE', { lines: 4, col: '#9b5cff' })
      label(x, 330, 1110, 'LEAVING: NOW', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Brought a résumé. | *Just in case.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'RÉSUMÉ', { lines: 4, col: '#2fc79a' })
      label(x, 790, 1110, 'REFERENCES: 12', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Taught Grandma | *to code.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 670, 'hello world!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      label(x, 790, 1100, 'GRANDMA.EXE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Mom asked their sign. | *Pisces sobbed.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'what’s | your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1000, 'SHE CARES!!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'v3t038', key: 'E', accent: '#ff8fb1', ending: 'callback',
  title: 'The signs meet | *the parents.*',
  cameos: CAMEOS,
  group: { cap: 'Parents: | *obsessed.*' },
  last: {
    text: 'Taurus left | *with the leftovers.*',
    draw(x, t, lt) {
      drawBits(x, LASAGNA, LAS_C, 540, 1130, 30 * pop01(t, t - lt + 0.4, 0.4, 2))
      signChar(x, t, 'taurus', 540, 1440, 200, { mood: 'heart', pop: pop01(t, t - lt + 0.8, 0.4, 1.8), seed: 12, hops: [t - lt + 1.4] })
      label(x, 540, 950, 'FOR LATER ♥', pop01(t, t - lt + 1.5, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
