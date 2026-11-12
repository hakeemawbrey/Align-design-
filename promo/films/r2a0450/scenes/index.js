// r2a0450: star_advice, ADVICE ROLLCALL, "One kind act | for *each sign.*" (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one small, warm, doable kindness each, with a light visual gag. Ending: group.
//   3.6–49.2   ♈ cheer at their finish line · ♉ bring them flowers · ♊ send a funny voice note · ♋ call just to say hi
//              · ♌ compliment them in public · ♍ do one chore for them · ♎ write a sweet note · ♏ check in, mean it
//              · ♐ plan a tiny adventure · ♑ tell them to take a break · ♒ say yes to their weird idea · ♓ send a cute animal pic
//  49.2        ending (group): "Pick one. | *Do it this week.*" (hearts over the group photo)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, clock, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const FLOWERS = ['.P.Y.R.', 'PYPYRYR', '.P.Y.R.', '.G.G.G.', '..GGG..', '...G...', '..WWW..', '.WWWWW.']
const FLOWERS_C = { P: PINK, Y: GOLD, R: '#ff6b5a', G: GREEN, W: LAV }
const BROOM = ['....K', '...K.', '..K..', '.K...', 'YYY..', 'YYYY.', 'YYYYY']
const BROOM_C = { K: WOOD, Y: GOLD }
const NOTE = ['WWWWWWWWWW', 'WKWWWWWWKW', 'WWKKWWKKWW', 'WWWWPPWWWW', 'WWWPPPPWWW', 'WWWWPPWWWW', 'WWWWWWWWWW']
const NOTE_C = { W: CREAM, K: SLATE, P: PINK }
const BUNNY_PIC = BM.BUNNY

const CAMEOS = [
  { sign: 'aries', cap: 'Cheer at their | *finish line.*', mood: 'sparkle', star: { x: -160 }, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), br = lt > 1.0
      if (k > 0.01) {
        x.save(); x.fillStyle = INK; x.fillRect(640, 760, 16, 340); x.fillRect(930, 760, 16, 340)
        x.fillStyle = RED; if (!br) x.fillRect(656, 830, 274 * k, 16); else { x.fillRect(656, 830, 60, 16); x.fillRect(870, 830, 60, 16) }
        x.restore()
      }
      bubble(x, 790, 680, 'GO GO GO!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, col: GOLD, tail: 'bl' })
      label(x, 790, 1000, 'YOU DID IT!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 830, P.t0 + 1.0 * (3.1 / 2.4), 8, 180, 0.2)
    } },
  { sign: 'taurus', cap: 'Bring them | *fresh flowers.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, FLOWERS_C, 790, 900, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 680, 'FOR NO REASON ♡', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Send them | *a silly voice note.*', mood: lt => lt > 1.0 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, 780, 860, k, { head: 'VOICE NOTE', headCol: '#ffd23a', lines: [] })
      if (k > 0.6) { x.save(); x.fillStyle = MINT; for (let i = 0; i < 10; i++) { const h = 20 + 60 * Math.abs(Math.sin(t * 6 + i * 1.3)); x.fillRect(680 + i * 21, 860 - h / 2, 12, h) } x.restore() }
      label(x, 790, 1120, '0:47 OF GIGGLING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Call them. | *Just to say hi.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt < 1.0 ? 'INCOMING…' : 'ON A CALL', headCol: MINT, rot: 0.05 * Math.sin(t * 30) * (lt < 1.0 ? 1 : 0), lines: [
        ['hi! no reason', BONE, pop01(t, P.t0 + 1.1, 0.2, 2)], ['just missed you', PINK, pop01(t, P.t0 + 1.4, 0.2, 2)],
      ] })
    } },
  { sign: 'leo', cap: 'Compliment them | *in public.*', mood: 'sparkle', star: { x: -160 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'everyone! look | how great!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: GOLD, tail: 'br' })
      label(x, 790, 920, 'GLOW: +100', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 380, 860, P.t0 + 1.2, 8, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Do one chore | *for them.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BROOM, BROOM_C, 780 + 30 * Math.sin(t * 7), 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'DISHES: DONE ✓', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 1000, P.t0 + 1.0, 7, 140, 0.2, [BONE, SKYB, MINT])
    } },
  { sign: 'libra', cap: 'Write them | *a sweet note.*', mood: 'heart', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, NOTE, NOTE_C, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.05 })
      label(x, 790, 1080, 'HANDWRITTEN ✓', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Check in. | *Mean it.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'how are you? | really?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'br' })
      label(x, 790, 920, 'LISTENING: FULLY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Plan a | *tiny adventure.*', mood: 'sparkle', star: { x: 150 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      sheet(x, 320, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 260, head: 'SATURDAY', headCol: ORANGE, size: 30, rows: [
        ['new café?', INK, pop01(t, P.t0 + 0.6, 0.2, 2)], ['a long walk?', INK, pop01(t, P.t0 + 0.9, 0.2, 2)], ['YES ✓', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
      label(x, 320, 1080, 'BACK BY DINNER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Tell them to | *take a break.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      clock(x, 320, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 5, 0, 110)
      label(x, 320, 1020, 'LAPTOP: CLOSED ✓', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 330, 640, 'fine. 10 min.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Say yes to | *their weird idea.*', mood: 'sparkle', look: [1, -1], star: { x: -160 }, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 780, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 220, head: 'THE IDEA', headCol: SKYB, size: 30, rows: [['picnic on', INK], ['the roof?', INK]] })
      label(x, 790, 1020, 'YES!', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 64, bg: GOLD, rot: -0.08, font: MONO, weight: 700 })
      sparkles(x, t, 790, 1020, P.t0 + 1.2 * (3.1 / 2.4), 8, 170, 0.5)
    } },
  { sign: 'pisces', cap: 'Send them | *a cute animal pic.*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 2, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, 780, 860, k, { head: 'NEW PIC', headCol: PINK, lines: [] })
      if (k > 0.6) drawBits(x, BUNNY_PIC, BM.BUNNY_C, 780, 850, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 1130, 'HAPPY TEARS ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0450', key: 'G', accent: MINT, ending: 'group',
  title: 'One kind act | for *each sign.*',
  cameos: CAMEOS,
  group: {
    cap: 'Pick one. | *Do it this week.*',
    draw(x, t, lt) { hearts(x, t, 540, 900, t - lt + 1.5, { n: 12, life: 3, spread: 800, cell: 8, seed: 11 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
