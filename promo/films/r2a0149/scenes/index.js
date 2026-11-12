// r2a0149: star_advice, ADVICE ROLLCALL, "Each sign's | dream weekend." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm and specific dream weekend each, with a light visual gag.
//   0.0–3.6    "Each sign’s | *dream weekend.*"
//   3.6–49.2   ♈ a sunrise hike, summit by seven · ♉ a slow brunch, then a nap · ♊ three cafés, one great chat · ♋ a blanket
//              fort with their people · ♌ dinner with friends who hype them up · ♍ a clean home and a long bath · ♎ a gallery
//              date with their match · ♏ phone off, deep talks till midnight · ♐ a last-minute flight, window seat · ♑ zero
//              emails, actually resting · ♒ stargazing with their weirdest friend · ♓ a rainy day and a good cry-movie
//  49.2        "Twelve weekends. | *Zero alarms.*"
//  52.4        LESSON UNLOCKED: "Plan the rest. | *You’ve earned it.*"  STATUS: RESTED
//  58.3        "Capricorn checked | *email. Once.*"  a little Capricorn above the group, peeking at a laptop.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, laptop, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffb3c7'
const ST = { x: -170 }

const FLAG = ['K.RRRR', 'K.RRRR', 'K.RRR.', 'K.....', 'K.....']
const PLATE = ['..WWWWWWWWW..', '.WWYYWWWGGWW.', 'WWYYYWWWGGGWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const PLATE_C = { W: CREAM, Y: '#ffd86b', G: '#5fd068' }
const CUP = ['.WWWWWW.', 'WBBBBBBW', 'WBBBBBBWWW', 'WBBBBBBW.W', 'WBBBBBBWWW', 'WBBBBBBW', '.WWWWWW.']
const CUP_C = { W: '#fff4e2', B: '#c98f6a' }
const TUB = ['W.............', 'WW............', '.WBBBBBBBBBBBB', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.', '..K........K..']
const TUB_C = { W: '#fff4e2', B: SKYB, K: INK }
const PHONE_OFF = ['KKKKKKKK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KKKGGKKK', 'KKKKKKKK']
const SCOPE = ['.........KK', '........KWWK', '......KKWWK.', '....KKBBKK..', '..KKBBBBK...', 'KKBBBBKK....', 'KBBBKK......', '.KKK.K......', '....K.K.....', '...K...K....']
const SCOPE_C = { K: INK, W: SKYB, B: '#3f6fd0' }
const TV = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSSSSHSSSSSK', 'KSSSHHHSSSSK', 'KSSSSHSSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '....K..K....', '...KKKKKK...']
const TV_C = { K: INK, S: '#6b62a8', H: PINK }

/** a mountain with a flag at the top that pops at `f` */
function mountain(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 160); x.lineTo(0, -170); x.lineTo(200, 160); x.closePath(); x.fill()
  x.fillStyle = '#7a8bb0'; x.beginPath(); x.moveTo(-186, 154); x.lineTo(0, -156); x.lineTo(186, 154); x.closePath(); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.moveTo(-58, -60); x.lineTo(0, -156); x.lineTo(58, -60); x.lineTo(20, -80); x.lineTo(-10, -60); x.closePath(); x.fill()
  if (f > 0.01) drawBits(x, FLAG, { K: INK, R: RED }, 18, -186, 9 * f)
  x.restore()
}
/** a blanket fort: a draped triangle with fairy lights */
function fort(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-210, 150); x.lineTo(0, -150); x.lineTo(210, 150); x.closePath(); x.fill()
  x.fillStyle = '#ff9fb8'; x.beginPath(); x.moveTo(-196, 144); x.lineTo(0, -136); x.lineTo(196, 144); x.closePath(); x.fill()
  x.fillStyle = '#ffd0dc'; for (let i = 0; i < 4; i++) x.fillRect(-150 + i * 90, 20 + (i % 2) * 40, 40, 40)
  x.fillStyle = '#2a1640'; x.beginPath(); x.moveTo(-70, 150); x.lineTo(0, 10); x.lineTo(70, 150); x.closePath(); x.fill()
  for (let i = 0; i < 8; i++) { const a = i / 7; x.fillStyle = [GOLD, MINT, SKYB, PINK][i % 4]; x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4 + i); x.fillRect(lerp(-170, 170, a) - 6, -30 + Math.abs(a - 0.5) * 160 - 6, 12, 12) }
  x.restore()
}
/** a framed painting on the wall */
function painting(x, cx, cy, k, col) {
  card(x, cx, cy, 190, 150, k, { bg: GOLD, rot: 0 }, () => {
    x.fillStyle = '#2a2350'; x.fillRect(-80, -60, 160, 120)
    x.fillStyle = col; x.beginPath(); x.arc(-20, -10, 34, 0, Math.PI * 2); x.fill()
    x.fillStyle = MINT; x.fillRect(-80, 30, 160, 30)
  })
}
/** an airplane window: a rounded frame with clouds drifting past */
function window_(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-130, -170, 260, 340, 110); x.fill()
  x.fillStyle = '#e8e4f4'; x.beginPath(); x.roundRect(-120, -160, 240, 320, 100); x.fill()
  x.save(); x.beginPath(); x.roundRect(-92, -132, 184, 264, 80); x.clip()
  x.fillStyle = '#8fd0ff'; x.fillRect(-100, -140, 200, 280)
  x.fillStyle = '#ffffff'; for (let i = 0; i < 4; i++) { const px = ((i * 90 - t * 60) % 360 + 360) % 360 - 180; x.fillRect(px - 40, -60 + i * 50, 80, 22); x.fillRect(px - 24, -72 + i * 50, 48, 16) }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'A sunrise hike. | *Summit by seven.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.4],
    back(x, t, lt, P) { x.save(); x.globalAlpha = 0.5 * clamp(lt / 0.5); x.fillStyle = '#ffb070'; x.beginPath(); x.arc(790, 1050, 220, Math.PI, 0); x.fill(); x.restore() },
    front(x, t, lt, P) {
      mountain(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack(prog(lt, 1.1, 1.4)))
      label(x, 790, 640, '7:00 A.M. · TOP!', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A slow brunch. | *Then a nap.*', mood: lt => lt > 1.3 ? 'sleepy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, PLATE, PLATE_C, 790, 980, 20 * k)
      drawBits(x, CUP, CUP_C, 790, 820, 16 * k)
      label(x, 790, 650, 'NO ALARMS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Three cafés. | *One great chat.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wink', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CUP, CUP_C, 680 + i * 110, 1040, 11 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      bubble(x, 760, 700, 'and THEN—', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 820, 870, 'tell me everything', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: GOLD, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'A blanket fort. | *Their people inside.*', mood: 'heart', star: { x: -200 },
    front(x, t, lt, P) {
      fort(x, t, 760, 920, pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'pisces', 730, 1020, 100 * k, { mood: 'happy', seed: 81, glyph: false, tears: 1 }); signChar(x, t, 'leo', 800, 1030, 100 * k, { mood: 'sparkle', seed: 82, glyph: false }) }
      label(x, 760, 660, 'MOVIE NIGHT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Dinner with friends | *who hype them up.*', mood: 'sparkle', star: ST, hops: [0.9, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'you look AMAZING', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
      bubble(x, 800, 820, 'tell the story again!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 30, col: MINT, tail: 'bl' })
      bubble(x, 780, 1000, 'iconic.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      sparkles(x, t, 390, 860, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'A clean home. | *A very long bath.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TUB, TUB_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      x.fillStyle = '#ffffff'; for (let i = 0; i < 7; i++) { const ph = (t * 0.5 + i * 0.15) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * clamp(lt - 0.5); x.beginPath(); x.arc(700 + (i * 41) % 200, 880 - ph * 260, 14 + (i % 3) * 6, 0, Math.PI * 2); x.fill() }
      x.globalAlpha = 1
      label(x, 790, 650, 'HOME: SPOTLESS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'A gallery date. | *With their match.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      painting(x, 690, 650, pop01(t, P.t0 + 0.2, 0.3, 2), PINK)
      painting(x, 880, 680, pop01(t, P.t0 + 0.35, 0.3, 2), SUN)
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 1000, 180 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 17, glyph: false })
      label(x, 600, 1120, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Phone off. | *Deep talks till midnight.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PHONE_OFF, { K: INK, D: '#4a4378', G: '#6b62a8' }, 880, 1010, 17 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      label(x, 880, 1150, 'OFF', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 28, bg: GREY, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 760, 660, 'what scares you?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      bubble(x, 760, 830, 'okay… honestly?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'A last-minute flight. | *Window seat.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.8],
    front(x, t, lt, P) {
      window_(x, t, 330, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 330, 1110, 'BOOKED: 2 HRS AGO', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Zero emails. | *Actually resting.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      laptop(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), () => txt(x, lt > 0.9 ? 'INBOX: 0' : 'INBOX: 1', 0, 0, { size: 40, font: MONO, weight: 700, color: MINT }))
      label(x, 790, 660, 'OUT OF OFFICE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Stargazing | with *their weirdest friend.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 760, 950, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 900, 1050, 140 * k, { mood: 'wink', look: [0, -1], seed: 18, glyph: false })
      bubble(x, 800, 640, 'is that one waving?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      sparkles(x, t, 820, 560, P.t0 + 1.4, 6, 90, 0.4, [GOLD, BONE, SKYB])
    } },
  { sign: 'pisces', cap: 'A rainy day. | *A good cry-movie.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', tears: lt => lt > 0.9 ? 3 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      x.fillStyle = SKYB
      for (let i = 0; i < 12; i++) { const ph = (t * 1.2 + i * 0.173) % 1; x.globalAlpha = 0.5 * (1 - ph); x.fillRect(140 + (i * 67) % 760, 500 + ph * 650, 6, 18) }
      x.globalAlpha = 1
    },
    front(x, t, lt, P) {
      drawBits(x, TV, TV_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'TISSUES: READY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0149', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Each sign’s | *dream weekend.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve weekends. | *Zero alarms.*' },
  lesson: { text: 'Plan the rest. | *You’ve earned it.*', chip: 'STATUS: RESTED' },
  last: {
    text: 'Capricorn checked | *email. Once.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'capricorn', 440, 775, 200 * k, { mood: 'squint', look: [1, 0], seed: 54, hops: [t - lt + 1.4] })
      laptop(x, 740, 840, 0.8 * pop01(t, t - lt + 0.8, 0.35, 2), () => txt(x, 'INBOX: 1', 0, 0, { size: 40, font: MONO, weight: 700, color: GOLD }))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
