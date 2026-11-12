// r2a0304: star_advice, ADVICE ROLL CALL, "How each sign | *can find balance.*" (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific nudge each, with a light visual gag. Ending: callback.
//   0.0–3.6    "How each sign | *can find balance.*"
//   3.6–49.2   ♈ count to ten, the fire waits · ♉ order one new dish · ♊ close nine tabs, keep the fun one · ♋ make the soup
//              for yourself too · ♌ let someone else shine, you still glow · ♍ leave one dish in the sink · ♎ pick the
//              restaurant, any restaurant · ♏ say the feeling out loud · ♐ unpack the suitcase, stay a week · ♑ log off at
//              five · ♒ big ideas yes, brunch also yes · ♓ daydream, then drink some water
//  49.2        "Balance found. | *Mostly.*"
//  52.6        CALLBACK: "Virgo’s one dish? | *Still in the sink.*"  the plate comes back; Virgo is coping. Bravely.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#9fd8a8', RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

const PLATE = ['..SSSSSSS..', '.SSSSSSSSS.', 'SSSSRRSSSSS', 'SSSRRRRSSSS', '.SSSSSSSSS.', '..SSSSSSS..']
const PLATE_C = { S: '#d8dbe8', R: ORANGE }
const SINK = ['KKKKKKKKKKKKKKKK', 'KMMMMMMMMMMMMMMK', '.KMMMMMMMMMMMMK.', '..KKKKKKKKKKKK..']
const BOWL = ['.S.S.S.', 'S.S.S..', 'KKKKKKK', 'KRRRRRK', '.KRRRK.', '..KKK..']
const CASE = ['...KKKKKK...', '...K....K...', 'KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBPPBBBBYYBK', 'KBBBBMMBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const LAPTOP = ['.KKKKKKKKKKKK.', '.KSSSSSSSSSSK.', '.KSSSSSSSSSSK.', '.KSSSSSSSSSSK.', '.KSSSSSSSSSSK.', '.KKKKKKKKKKKK.', 'KGGGGGGGGGGGGK', 'KKKKKKKKKKKKKK']
const GLASS = ['K.....K', 'KWWWWWK', 'KBBBBBK', 'KBBBBBK', 'KBBBBBK', '.KBBBK.', '..KKK..']

const sinkPlate = (x, cx, cy, cell) => { drawBits(x, PLATE, PLATE_C, cx, cy - cell * 2, cell, { rot: 0.2 }); drawBits(x, SINK, { K: INK, M: '#9aa5c4' }, cx, cy + cell * 2.5, cell) }
function tabs(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(-150 + i * 12 - 6, -140 + i * 18 - 6, 272, 182); x.fillStyle = [BONE, SKYB, CREAM, LAV][i % 4]; x.fillRect(-150 + i * 12, -140 + i * 18, 260, 170) }
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(n > 1 ? `${n} tabs open` : 'the fun one ♥', -130 + (n - 1) * 12, -60 + (n - 1) * 18)
  x.restore()
}
function clock(x, cx, cy, k, hh) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 78, 0, 7); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 68, 0, 7); x.fill()
  x.strokeStyle = INK; x.lineWidth = 8; x.lineCap = 'round'
  const a = (hh / 12) * Math.PI * 2 - Math.PI / 2
  x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 40, Math.sin(a) * 40); x.stroke()
  x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -56); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Count to ten. | *The fire waits.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', star: ST,
    front(x, t, lt, P) {
      const n = Math.min(10, 1 + Math.floor(clamp((lt - 0.2) / 1.5) * 10))
      L(x, 790, 820, `${n}…`, pop01(t, P.t0 + 0.2, 0.3, 2), n >= 10 ? MINT : ORANGE, -0.06, 90)
      L(x, 790, 1060, n >= 10 ? 'CALM: UNLOCKED' : 'BREATHING…', 1, BONE, 0.04)
    } },
  { sign: 'taurus', cap: 'Order one new dish. | *Comfort survives.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLATE, { S: '#d8dbe8', R: MINT }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'NEW DISH?!', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 36)
      L(x, 800, 1060, 'VERDICT: LOVED IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Close nine tabs. | *Keep the fun one.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.max(1, 10 - Math.floor(clamp((lt - 0.4) / 1.2) * 9))
      tabs(x, 760, 820, pop01(t, P.t0 + 0.2, 0.3, 2), Math.min(n, 7))
      L(x, 790, 1110, `TABS: ${n}`, 1, GOLD, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Make the soup | *for yourself, too.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOWL, { K: INK, R: ORANGE, S: CREAM }, 800, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'TO: ME. FROM: ME.', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Let someone else shine. | *You’ll still glow.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 1.6)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k) * 0.9; x.fillStyle = 'rgba(255,241,200,0.22)'; x.beginPath(); x.moveTo(720, 470); x.lineTo(860, 470); x.lineTo(940, 1180); x.lineTo(640, 1180); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 790, 940, 200 * k, { mood: lt > 1.2 ? 'sparkle' : 'wide', look: [-1, 0], seed: 13, glyph: false })
      L(x, 600, 680, 'GLOW: STILL ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), ORANGE, -0.05, 30)
    } },
  { sign: 'virgo', cap: 'Leave one dish | *in the sink.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sinkPlate(x, 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'ON PURPOSE', pop01(t, P.t0 + 0.9, 0.3, 2.4), MINT, 0.05, 38)
      L(x, 800, 1100, 'BREATHE…', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.04)
    } },
  { sign: 'libra', cap: 'Pick the restaurant. | *Any restaurant.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'where to eat?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      bubble(x, 790, 900, 'tacos.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 56, col: PINK, tail: 'bl' })
      L(x, 790, 1100, 'DECIDED IN 1 SEC', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Say the feeling | *out loud.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'i… missed | you.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 48, col: '#ff8fb1', tail: 'bl' })
      L(x, 790, 1030, 'BRAVERY: +1', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 36)
      hearts(x, t, 790, 700, P.t0 + 1.2, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: 'sagittarius', cap: 'Unpack the suitcase. | *Stay a week.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CASE, { K: INK, B: '#c98f5a', P: PINK, Y: GOLD, M: MINT }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'UNPACKED?!', pop01(t, P.t0 + 0.7, 0.3, 2.4), LAV, 0.05, 36)
      L(x, 800, 1100, 'HOME: COSY ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04)
    } },
  { sign: 'capricorn', cap: 'Log off at five. | *The work will keep.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const shut = lt > 1.1
      drawBits(x, LAPTOP, { K: INK, S: shut ? '#140c30' : SKYB, G: '#9aa5c4' }, 820, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: shut ? 0.35 : 1 })
      clock(x, 800, 720, pop01(t, P.t0 + 0.4, 0.3, 2), 5)
      L(x, 800, 1110, shut ? 'OFF DUTY' : '4:59…', 1, shut ? MINT : BONE, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Big ideas, yes. | *Brunch, also yes.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'brunch | sunday?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      L(x, 790, 920, 'YES ✓', pop01(t, P.t0 + 1.1, 0.3, 2.6), MINT, -0.06, 60)
      L(x, 790, 1100, 'FRIENDS: THRILLED', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Daydream, then | *drink some water.*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 2, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'a castle | by the sea…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: CREAM, tail: 'bl' })
      drawBits(x, GLASS, { K: INK, W: CREAM, B: SKYB }, 800, 940, 22 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      L(x, 800, 1110, 'HYDRATED DREAMER', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0304', key: 'E', accent: ACC, ending: 'callback',
  title: 'How each sign | *can find balance.*',
  cameos: CAMEOS,
  group: { cap: 'Balance found. | *Mostly.*' },
  last: {
    text: 'Virgo’s one dish? | *Still in the sink.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'virgo', 360, 1110, 340 * k, { mood: Math.floor(lt * 3) % 2 ? 'wide' : 'squint', look: [1, 0], seed: 33 })
      sinkPlate(x, 730, 1150, 24 * k)
      label(x, 600, 1420, 'DAY 2: COPING', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
