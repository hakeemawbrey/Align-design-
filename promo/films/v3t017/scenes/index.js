// v3t017: THE SIGNS AS… v3, solo, "Aquarians in love | be like." (~45 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "Aquarians in love | *be like.*"  One big Aquarius pops in, then dives into the cards.
//   3.6–37.8   nine cards, every one Aquarius:
//              caught feelings, wrote a research paper · love language: weird facts · anniversary gift: a very good rock
//              · "I love you" in binary · date night: saving the frogs · needs space, texts you from it
//              · met your parents, started a debate club · fell for you, your chart is "unusual" · "our song" is a dial-up tone
//  37.8        "Weird? | *Weirdly devoted.*"
//  41.2        callback: "You kept the rock. | *They’re so proud.*"  (the rock comes back, on a little cushion)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', GREEN = '#5fd068', CREAM = '#fff4e2', TEAL = '#6fc3ff'

const ROCK = [
  '...GGGGG...',
  '.GGGgGGGGG.',
  'GGgGGGGGgGG',
  'GGGGGGgGGGG',
  'GGGgGGGGGGG',
  '.GGGGGgGGG.',
]
const ROCK_C = { G: '#9aa5c4', g: '#c9d0e6' }
const CUSHION = ['.PPPPPPPPPPPPP.', 'PPPPPPPPPPPPPPP', 'PPPPPPPPPPPPPPP', '.Y...........Y.']
const CUSHION_C = { P: '#c24a6a', Y: GOLD }
const FROG = [
  '.WW...WW.',
  'WKWGGGWKW',
  'GGGGGGGGG',
  'GGRRRRRGG',
  'GGGGGGGGG',
  '.GG...GG.',
]
const FROG_C = { W: '#ffffff', K: INK, G: GREEN, R: '#2a6b3a' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KSWWWSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
]
const PHONE_C = { K: '#2a2350', S: SKYB, W: '#ffffff', G: '#6b62a8' }
const MODEM = [
  'KKKKKKKKKKKK',
  'KGGGGGGGGGGK',
  'KGRGYGMGGGGK',
  'KKKKKKKKKKKK',
]
const MODEM_C = { K: INK, G: '#9aa5c4', R: RED, Y: GOLD, M: MINT }

function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  const C = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = C[(i * 5) % 12]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.font = `800 ${r * 0.7}px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.rotate(-t * 0.25); x.fillText('?', 0, 4)
  x.restore()
}

const AQ = { sign: 'aquarius' }
const CAMEOS = [
  { ...AQ, cap: 'Caught feelings. | *Wrote a research paper.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -190, 280, 380); x.fillStyle = CREAM; x.fillRect(-132, -182, 264, 364)
        x.fillStyle = INK; x.font = `800 30px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.fillText('Feelings:', 0, -130); x.fillText('A Study', 0, -94)
        const rows = Math.floor(clamp((lt - 0.4) / 1.2) * 7)
        for (let i = 0; i < 7; i++) { x.fillStyle = i < rows ? '#9aa5c4' : '#e6dfd0'; x.fillRect(-100, -50 + i * 32, 180 + 20 * Math.sin(i * 2.1), 12) }
        x.restore()
      }
      label(x, 790, 1130, 'PEER REVIEWED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { ...AQ, cap: 'Love language: | *weird facts at 2 a.m.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const F = ['octopuses have | three hearts', 'snails can sleep | for 3 years', 'love you btw']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.65))
      bubble(x, 780, 800, F[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: n === 2 ? PINK : MINT, tail: 'bl' })
      label(x, 790, 1060, `FACT #${[212, 213, 214][n]}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { ...AQ, cap: 'Anniversary gift: | *a very good rock.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      drawBits(x, ROCK, ROCK_C, 790, 900, 26 * k)
      sparkles(x, t, 790, 900, P.t0 + 0.8, 7, 160, 0.3)
      label(x, 790, 700, 'HAPPY 1 YEAR', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'it’s a GOOD one', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { ...AQ, cap: 'Said “I love you.” | *In binary.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      const B = ['01001001', '00100000', '01001100', '01010101']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) * 2.5) + 1)
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#0d2a1a'; x.fillRect(-160, -140, 320, 280)
        x.fillStyle = MINT; x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        B.slice(0, n).forEach((b, i) => x.fillText(b, 0, -90 + i * 60))
        x.restore()
      }
      label(x, 790, 1100, 'TRANSLATION: ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { ...AQ, cap: 'Date night? | *Saving the frogs.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, FROG, FROG_C, 690 + i * 110, 1060 - (i % 2) * 40, 12 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2.2))
      label(x, 790, 720, 'SAVE THE FROGS', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: GREEN, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'romantic, right?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { ...AQ, cap: 'Needs space. | *Texts you from it.*', mood: 'happy', look: [-1, 0], star: { x: 230, y: -60, s: 200 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 330, 900, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.08 })
      bubble(x, 360, 680, 'miss u. | still need space', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, tail: 'br' })
      label(x, 760, 1080, 'DISTANCE: 2 M', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { ...AQ, cap: 'Met your parents. | *Started a debate club.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'capricorn', 690, 940, 180 * k, { mood: 'squint', look: [-1, 0], seed: 13, glyph: false })
        signChar(x, t, 'cancer', 860, 940, 180 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 14, glyph: false })
      }
      label(x, 780, 700, 'MOTION: PINEAPPLE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 780, 1130, 'ROUND 3', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: TEAL, rot: 0.05, font: MONO, weight: 700 })
    } },
  { ...AQ, cap: 'Fell for you. | Your chart is *“unusual.”*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 860, 130, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      label(x, 790, 1090, 'COMPATIBILITY: ???', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'perfect.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
    } },
  { ...AQ, cap: 'Picked “our song.” | *A dial-up tone.*', mood: lt => lt > 0.8 ? 'heart' : 'happy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MODEM, MODEM_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.7, 0.25, 2.2)
      bubble(x, 790 + (lt > 0.8 ? 3 * Math.sin(t * 50) : 0), 760, 'SKREEE-BONG', k, { size: 44, tail: 'bc' })
      label(x, 790, 1130, 'NOW PLAYING ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t017', key: 'D', accent: TEAL, solo: 'aquarius', ending: 'callback',
  title: 'Aquarians in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Weird? | *Weirdly devoted.*', mood: 'heart' },
  last: {
    text: 'You kept the rock. | *They’re so proud.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 2)
      drawBits(x, CUSHION, CUSHION_C, 680, 1170, 30 * k)
      drawBits(x, ROCK, ROCK_C, 680, 1060, 30 * k)
      sparkles(x, t, 640, 1070, t - lt + 0.8, 7, 170, 0.3)
      if (k > 0.01) signChar(x, t, 'aquarius', 330, 1040, 340 * k, { mood: lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], seed: 9, glyph: false, hops: [t - lt + 1.2] })
      hearts(x, t, 540, 960, t - lt + 1.4, { n: 7, life: 2.0, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
