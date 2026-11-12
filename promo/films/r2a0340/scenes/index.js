// r2a0340: star_advice, ADVICE ROLLCALL (twelve signs), "How each sign | *handles conflict.*" (signs3kit social cut,
// music: lofi · G). Ending: callback (Virgo's argument notes, final page: "love you.").
//   ♈ says it fast, then hugs · ♉ needs a snack before the talk · ♊ talks out both sides · ♋ goes quiet, give a soft minute
//   · ♌ wants to be heard · ♍ brings notes · ♎ apologizes first, even when right · ♏ needs honesty · ♐ jokes, then gets real
//   · ♑ wants a solution · ♒ needs space, then logic · ♓ cries a little, forgives fast
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, card, lines, phone, CUP, CUP_C, RED, CREAM, ORANGE, GREY, PURP } from './props.js'

const SANDWICH = ['.CCCCCCCCC.', 'CCCCCCCCCCC', 'GGGGGGGGGGG', 'RRRRRRRRRRR', 'YYYYYYYYYYY', 'CCCCCCCCCCC']
const SANDWICH_C = { C: '#e8b46a', G: '#5fd068', R: RED, Y: GOLD }
const FLAG = ['KWWWWWWW', 'KWWWWWWW', 'KWWWWWWW', 'KWWWWWWW', 'K.......', 'K.......', 'K.......', 'K.......', 'K.......', 'K.......']
const FLAG_C = { K: '#7a4a2e', W: '#fff' }
const PLANET = ['...PPPP...', '.PPPPPPPP.', 'RRRRRRRRRR', 'PPPPPPPPPP', 'PPPPPPPPPP', '.PPPPPPPP.', '...PPPP...']
const PLANET_C = { P: '#6fc3ff', R: GOLD }

/** Virgo's notes: a clipboard with lines; page = 'notes' or 'final' */
function notesBoard(x, cx, cy, k, lt, final = false) {
  card(x, cx, cy, 300, 380, k, 0.04, x => {
    x.fillStyle = '#6b62a8'; x.fillRect(-60, -206, 120, 34)
    if (!final) {
      lines(x, ['MY POINTS'], { size: 34, y: -140 })
      x.font = `700 26px ${MONO}`; x.textAlign = 'left'
      ;['1. feelings', '2. facts', '3. snacks?', '4. hug'].forEach((r, i) => { if (lt > 0.5 + i * 0.3) { x.fillStyle = INK; x.fillText(r, -110, -70 + i * 54) } })
    } else {
      lines(x, ['FINAL PAGE'], { size: 30, y: -140, font: MONO, weight: 700 })
      lines(x, ['love you.'], { size: 54, y: 10 })
    }
  })
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Says it fast. | *Then hugs it out.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 770, 900, 230 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 33, glyph: false })
      bubble(x, 560, 620, 'that hurt. ok, done!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      if (lt > 1.3) hearts(x, t, 600, 860, P.t0 + 1.3, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'taurus', cap: 'Needs a snack | *before the talk.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 800, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      if (lt > 1.3) L(x, 800, 1060, 'NOW WE CAN TALK', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Talks out both sides. | *Out loud.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'but you…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 860, 'but ALSO me…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
      if (lt > 1.5) L(x, 790, 1060, 'BOTH VALID', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Goes quiet. | Give them *a soft minute.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 820, 300, 180, pop01(t, P.t0 + 0.3, 0.35, 2), -0.04, x => lines(x, ['BRB:', 'FEELINGS'], { size: 40 }), LAV)
      drawBits(x, CUP, CUP_C, 800, 1040, 14 * pop01(t, P.t0 + 1.0, 0.3, 2))
    } },
  { sign: 'leo', cap: 'Wants to be heard. | *So listen big.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 800, 830, 320, 200, pop01(t, P.t0 + 0.3, 0.35, 2), 0.04, x => lines(x, ['I HEAR', 'YOU.'], { size: 50 }), '#ffe7a8')
      if (lt > 1.3) sparkles(x, t, 800, 830, P.t0 + 1.3, 8, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Brings notes | *to the argument.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) { notesBoard(x, 800, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt) } },
  { sign: 'libra', cap: 'Apologizes first. | *Even when right.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 3) * 0.06 })
      bubble(x, 560, 620, 'sorry!! (?)', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (lt > 1.5) L(x, 800, 1110, 'PEACE: RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Needs honesty. | *Nothing less.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 820, 'TRUTH ONLY', pop01(t, P.t0 + 0.3, 0.3, 2), ACC_S, -0.04, 50, CREAM)
      if (lt > 1.2) bubble(x, 800, 1020, 'thank you for that.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bc', col: MINT })
    } },
  { sign: 'sagittarius', cap: 'Cracks a joke. | *Then gets real.*', mood: lt => lt > 1.4 ? 'happy' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.3) bubble(x, 790, 760, 'knock knock…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      else bubble(x, 790, 760, 'ok. I’m sorry.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
      if (lt > 1.6) hearts(x, t, 800, 980, P.t0 + 1.6, { n: 5, life: 1.4, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: 'capricorn', cap: 'Wants a solution. | *Bring a plan.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 850, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), -0.04, x => {
        lines(x, ['FIX-IT PLAN'], { size: 32, y: -110, font: MONO, weight: 700 })
        x.font = `700 26px ${MONO}`; x.textAlign = 'left'
        ;['☑ listen', '☑ agree', '☑ high five'].forEach((r, i) => { if (lt > 0.5 + i * 0.35) { x.fillStyle = INK; x.fillText(r, -110, -40 + i * 56) } })
      })
    } },
  { sign: 'aquarius', cap: 'Needs space first. | *Then talks it through.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANET, PLANET_C, 820, 760, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.2 })
      if (lt > 1.3) L(x, 800, 1020, 'BACK FROM ORBIT', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cries a little. | *Forgives fast.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt > 1.2) { L(x, 780, 720, 'ALL FORGIVEN', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 40); hearts(x, t, 780, 1120, P.t0 + 1.3, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 6 }) }
      else bubble(x, 800, 760, 'it’s ok… sniff', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
]
var ACC_S = '#c2365a'

const F = makeFilm({
  id: 'r2a0340', key: 'G', accent: GOLD, ending: 'callback',
  title: 'How each sign | *handles conflict.*',
  cameos: CAMEOS,
  group: { cap: 'Different styles. | *Same big hearts.*' },
  last: {
    text: 'Virgo’s last note: | *“love you.”*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 1080, 270 * k, { mood: lt > 1.3 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.3, t0 + 2.0] })
      notesBoard(x, 740, 1080, pop01(t, t0 + 0.6, 0.4, 2), 3, true)
      if (lt > 1.4) hearts(x, t, 560, 1300, t0 + 1.4, { n: 6, life: 1.6, spread: 400, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
