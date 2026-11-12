// r2a0120: ADVICE ROLLCALL, "How each sign gets | through winter." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm, specific line each with a light visual gag.
//   0.0–3.6    "How each sign gets | *through winter.*"
//   3.6–49.2   ♈ snowball fight first, cocoa after · ♉ five blankets, zero regrets · ♊ calls a friend every snow day
//              · ♋ hosts movie night, extra socks provided · ♌ a sweater with their own face · ♍ a cozy routine, lamp on at 5
//              · ♎ matching scarf and mittens · ♏ hibernates, back in spring · ♐ plans a summer trip in January
//              · ♑ gets ahead on goals by the fire · ♒ builds a snowman, gives it opinions · ♓ watches snow fall, happy tears
//  49.2        "Stay warm. | *Stay soft.*"
//  52.6        CALLBACK: "The snowman? | *Now a best friend.*"  Aquarius and the snowman, hearts.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a', GREEN = '#5fd068', ICE = '#bfe8ff'

const MUG = ['.S.S....', '..S.S...', 'BBBBBBB.', 'BWWWWWBBB', 'BWWWWWB.B', 'BWWWWWBBB', 'BWWWWWB..', '.BBBBB...'].map(r => r.padEnd(9, '.'))
const SNOWBALL = ['.WWWW.', 'WWWWWW', 'WWWBWW', 'WWWWWW', '.WWWW.']
const PHONE = ['KKKKKK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KKGGKK']
const SOCK = ['.RRR.', '.WWW.', '.RRR.', '.WWW.', '.RRR.', '.RRRRR', '.RRRRR', '..RRR.']
const LAMP = ['..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', '....K....', '....K....', '....K....', '....K....', '..KKKKK..']
const SCARF = ['RRRRRRRRRRRR', 'RWRWRWRWRWRR', 'RRRRRRRRRRRR', '.........RRR', '.........RWR', '.........RRR', '.........W.W']
const MITTEN = ['.RRR..', 'RRRR.R', 'RRRRRR', 'RRRRRR', 'WWWWWW']
const SUN = ['..Y..Y..', 'Y.YYYY.Y', '.YYYYYY.', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', 'Y.YYYY.Y', '..Y..Y..']
const FIRE = ['...O....', '..OYO...', '.OYYO.O.', '.OYYYOO.', 'OOYYYYOO', 'BBBBBBBB', '.B.BB.B.']
const SNOWMAN = ['...KKK...', '..KKKKK..', '...WWW...', '..WKWKW..', '..WWOWW..', '...WWW...', 'RRRRRRR..', '..WWWWW..', '.WWWKWWW.', '.WWWWWWW.', '.WWWKWWW.', '..WWWWW..']

function snow(x, t, cx, cy, w, h, n = 14, alpha = 1) {
  x.save(); x.globalAlpha = alpha
  for (let i = 0; i < n; i++) {
    const ph = (t * 0.25 + i * 0.137) % 1
    const px = cx - w / 2 + ((i * 97) % w) + Math.sin(t * 1.5 + i) * 14, py = cy - h / 2 + ph * h
    x.fillStyle = INK; x.fillRect(px - 8, py - 8, 16, 16); x.fillStyle = '#ffffff'; x.fillRect(px - 6, py - 6, 12, 12)
  }
  x.restore()
}
function blankets(x, cx, cy, k, n) {
  if (k <= 0.01) return
  const COLS = [PINK, MINT, LAV, GOLD, SKYB]
  for (let i = 0; i < n; i++) {
    x.save(); x.translate(cx + (i % 2 ? 10 : -10), cy - i * 46); x.rotate((i % 2 ? 1 : -1) * 0.04); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-150, -24, 300, 48); x.fillStyle = COLS[i]; x.fillRect(-144, -18, 288, 36)
    x.fillStyle = 'rgba(255,255,255,0.35)'; for (let j = 0; j < 6; j++) x.fillRect(-130 + j * 48, -18, 14, 36)
    x.restore()
  }
}
function sweater(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -130, 300, 270); x.fillRect(-210, -110, 70, 190); x.fillRect(140, -110, 70, 190)
  x.fillStyle = RED; x.fillRect(-142, -122, 284, 254); x.fillRect(-202, -102, 62, 174); x.fillRect(140, -102, 62, 174)
  x.fillStyle = '#fff4e2'; for (let i = 0; i < 7; i++) x.fillRect(-130 + i * 40, 104, 20, 12)
  x.restore()
  signChar(x, t, 'leo', cx, cy - 10 * k, 150 * k, { mood: 'wink', seed: 51, glyph: false, glow: 0.3 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Snowball fight first. | *Cocoa after.*', mood: 'sparkle', star: { x: -170 }, hops: [0.7],
    front(x, t, lt, P) {
      const p = prog(lt, 0.4, 1.0)
      if (p > 0 && p < 1) drawBits(x, SNOWBALL, { W: '#fff', B: ICE }, lerp(470, 920, p), 760 - Math.sin(Math.PI * p) * 120, 16)
      drawBits(x, MUG, { S: BONE, B: ORANGE, W: BROWN }, 790, 990, 22 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      label(x, 790, 1150, 'IN THAT ORDER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Five blankets. | *Zero regrets.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      blankets(x, 790, 1060, pop01(t, P.t0 + 0.2, 0.3, 2), 1 + Math.floor(clamp((lt - 0.2) / 1.2) * 4.99))
      label(x, 790, 720, 'FORT: BUILT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Calls a friend | *every snow day.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: INK, S: SKYB, G: '#6b62a8' }, 760, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      bubble(x, 800, 720, 'are you SEEING | this snow?!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Hosts movie night. | *Extra socks provided.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, SOCK, { R: [RED, MINT, LAV][i], W: '#fff4e2' }, 700 + i * 90, 960, 16 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.15 })
      label(x, 790, 740, 'ALL SIZES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'A sweater with | *their own face.*', mood: 'sparkle', star: { x: -200, s: 250 },
    front(x, t, lt, P) {
      sweater(x, t, 760, 900, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 770, 900, P.t0 + 0.7, 7, 220, 0.3)
      label(x, 770, 1140, 'MERCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'A cozy routine. | *Lamp on at 5.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const on = lt > 0.9
      if (on) { x.save(); x.globalAlpha = 0.22 * clamp((lt - 0.9) / 0.3); x.fillStyle = '#ffe7a8'; x.beginPath(); x.arc(790, 880, 220, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, LAMP, { Y: on ? GOLD : '#7a7060', K: INK }, 790, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, '5:00 PM ✓', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Matching scarf | *and mittens.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCARF, { R: PINK, W: '#fff4e2' }, 790, 830, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, MITTEN, { R: PINK, W: '#fff4e2' }, 730, 1030, 18 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.15 })
      drawBits(x, MITTEN, { R: PINK, W: '#fff4e2' }, 860, 1030, 18 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: 0.15, sx: -1 })
      sparkles(x, t, 790, 920, P.t0 + 1.2, 6, 170, 0.6)
    } },
  { sign: 'scorpio', cap: 'Hibernates. | *Back in spring.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'zzz…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, col: LAV, tail: 'bl' })
      label(x, 790, 980, 'DO NOT DISTURB', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'UNTIL MARCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#ff4f86', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Plans a summer trip. | *In January.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.5 })
      label(x, 790, 1080, 'SUMMER: BOOKED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Gets ahead on goals. | *By the fire.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FIRE, { O: Math.floor(t * 8) % 2 ? ORANGE : RED, Y: GOLD, B: BROWN }, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'Q1 PLAN: DONE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Builds a snowman. | *Gives it opinions.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SNOWMAN, { K: INK, W: '#ffffff', O: ORANGE, R: RED }, 790, 970, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 840, 680, 'hot take:', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: ICE, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Watches snow fall. | *Happy tears.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: 3, look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      snow(x, t, 760, 850, 500, 600, 18, pop01(t, P.t0 + 0.2, 0.4, 1.5))
      label(x, 790, 1080, 'SO PRETTY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0120', key: 'G', accent: ICE, ending: 'callback',
  title: 'How each sign gets | *through winter.*',
  cameos: CAMEOS,
  group: { cap: 'Stay warm. | *Stay soft.*' },
  last: {
    text: 'The snowman? | *Now a best friend.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aquarius', 380, 1080, 240 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      drawBits(x, SNOWMAN, { K: INK, W: '#ffffff', O: ORANGE, R: RED }, 720, 1060, 22 * pop01(t, t - lt + 0.7, 0.35, 2))
      bubble(x, 800, 800, 'bestie.', pop01(t, t - lt + 1.3, 0.25, 2.2), { size: 42, col: ICE, tail: 'bl' })
      hearts(x, t, 560, 980, t - lt + 1.4, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 5 })
      snow(x, t, 540, 1000, 800, 600, 16, 0.8)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
