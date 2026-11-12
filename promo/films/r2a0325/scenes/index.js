// r2a0325: star_advice, ADVICE ROLLCALL, "How each sign | makes a friend feel seen." (signs3kit social cut, music:
// lofi · G). Hook shortened to fit: "How each sign | sees you." One warm, specific way per sign. Ending: callback (Leo's hype sign).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const PASTA = ['...YY.Y.YY...', '..YYRYYYRYY..', '.YYYYYRYYYYY.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWLWWWWWWLWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const VAULT = ['KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGGGGGGGGGGK', 'KGGGYYYGGGGK', 'KGGYKKKYGGGK', 'KGGYKKKYGGGK', 'KGGGYYYGGGGK', 'KGGGGGGGGGGK', 'KKKKKKKKKKKK']
const CARD = ['KKKKKKKKKKKK', 'KSSSSSWWWWWK', 'KSSGSSWKKKWK', 'KSGGGSWWWWWK', 'KGGGGGWKKWWK', 'KKKKKKKKKKKK']

function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2); x.restore()
  })
  x.restore()
}
function placard(x, t, cx, cy, k, text, bg = GOLD) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05 * Math.sin(t * 5)); x.scale(k, k)
  x.fillStyle = '#8a4a2e'; x.fillRect(-7, 50, 14, 170)
  x.fillStyle = INK; x.fillRect(-170, -84, 340, 148); x.fillStyle = bg; x.fillRect(-162, -76, 324, 132)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  text.split('|').forEach((s, i, a) => x.fillText(s, 0, -10 + (i - (a.length - 1) / 2) * 42))
  x.restore()
}

const R = { x: -160 }
const CAMEOS = [
  { sign: 'aries', cap: 'Shows up first. | *Every time.*', mood: 'sparkle', star: R, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'on my way!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 880, '(ALREADY HERE)', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, 0.04, 34)
      hearts(x, t, 790, 1080, P.t0 + 1.3, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'taurus', cap: 'Makes you dinner. | *Without asking.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: R,
    front(x, t, lt, P) {
      drawBits(x, PASTA, { Y: '#ffd23a', R: RED, W: CREAM }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'SECONDS: INCLUDED', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.04, 30)
      bubble(x, 790, 680, 'you looked hungry.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Asks your rising sign. | *And listens.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bubble(x, 780, 640, "what's your | rising?", pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 900, 'wait, and then??', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      L(x, 790, 1100, 'FOLLOW-UPS: 12', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Remembers the hard day. | *Checks in.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: R,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TUESDAY', headCol: SKYB, lines: [
        ['how did it go?', MINT, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['you remembered', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.2), true],
        ['always', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
    } },
  { sign: 'leo', cap: 'Hypes you up. | *In public.*', mood: 'sparkle', star: R, hops: [0.8, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      placard(x, t, 790, 780, pop01(t, P.t0 + 0.3, 0.35, 2), "THAT'S MY|FRIEND!!")
      sparkles(x, t, 790, 780, P.t0 + 0.5, 8, 200, 0.4)
      L(x, 790, 1100, 'VOLUME: MAX', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#ffb34a', -0.04, 34)
    } },
  { sign: 'virgo', cap: 'Notices you’re tired. | *Before you do.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { W: '#ffffff', L: LAV }, 790, 960, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 720, 'NAP: PRESCRIBED', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Lets you pick | *the restaurant.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: R,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'you choose. | really.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      L(x, 790, 960, 'FOR ONCE: YOUR PICK', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Keeps your secrets. | *Forever.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, VAULT, { K: INK, G: '#6b62a8', Y: GOLD }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1100, 'VAULT: SEALED', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Sends you postcards. | *From everywhere.*', mood: 'sparkle', star: { x: 160 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.2) * 4)
      for (let i = 0; i < n; i++) drawBits(x, CARD, { K: INK, S: [SKYB, '#ff9a4a', MINT, PINK][i], G: '#5fd068', W: CREAM }, 300 + (i % 2) * 30, 1000 - i * 100, 16, { rot: (i % 2 ? 0.08 : -0.08) })
      L(x, 300, 620, 'THOUGHT OF YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Tracks your wins. | *On a spreadsheet.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(310, 850); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -140, 320, 280); x.fillStyle = CREAM; x.fillRect(-152, -132, 304, 264)
        x.fillStyle = '#2fc79a'; x.fillRect(-152, -132, 304, 50); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOUR WINS', 0, -107)
        for (let i = 0; i < 5; i++) { const h = (40 + i * 30) * ease.outCubic(prog(lt, 0.4 + i * 0.15, 0.7 + i * 0.15)); x.fillStyle = ['#9aa5c4', '#6fc3ff', '#2fc79a', '#ffd23a', PINK][i]; x.fillRect(-130 + i * 54, 110 - h, 40, h) }
        x.restore()
      }
      L(x, 310, 1080, 'UP AND TO THE RIGHT', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Loves your | *weirdest idea.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: R, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'what if... | soup cereal?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 800, 900, 'tell me | EVERYTHING.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cries at your | *good news.*', mood: lt => lt < 0.8 ? 'sparkle' : 'heart', tears: lt => lt < 0.8 ? 2 : 3, star: R,
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'I got the job!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 900, 'SO PROUD', pop01(t, P.t0 + 0.9, 0.3, 2.4), LAV, 0.04, 44)
      hearts(x, t, 600, 1150, P.t0 + 1.1, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0325', key: 'G', accent: GOLD, ending: 'callback',
  title: 'How each sign | *sees you.*',
  cameos: CAMEOS,
  group: { cap: 'Seen. Heard. | *Kept.*' },
  last: {
    text: 'Leo’s sign | *is still up.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 380, 1100, 280 * k, { mood: 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 1.0, t0 + 1.6] })
      placard(x, t, 720, 960, pop01(t, t0 + 0.6, 0.4, 2), "STILL MY|FRIEND!!")
      if (lt > 1.2) hearts(x, t, 560, 1000, t0 + 1.2, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
