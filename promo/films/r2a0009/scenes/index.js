// r2a0009: star_advice ADVICE ROLLCALL, "Each sign's | money mindset." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: each sign's relationship with money, said kindly, with a gentle nudge and one light gag:
//   ♈ buy-now energy, sleep on it first · ♉ saves for comfort, spend on joy too (piggy bank) · ♊ twelve side hustles,
//   pick a favourite · ♋ saves for everyone, save some for you (jars: MOM, KIDS, PETS, YOU: empty) · ♌ treats everyone,
//   treat future you · ♍ budgets everything, leave room for fun (envelopes) · ♎ buys the pretty one, pretty is allowed
//   · ♏ secret savings, proud of you · ♐ spends on trips, memories count · ♑ retirement plan at nine, enjoy today too
//   · ♒ gives to causes, you're a cause too · ♓ rescues every sad plant, budget for love
//  49.2   "Every mindset | *has a gift.*"  group photo
//  52.6   callback: "Cancer’s jar for you: | *finally full.*"  the jars come back; YOU fills up.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a'
const PIGGY = [
  '..P.....P.....',
  '.PPPPPPPPPP...',
  'PPPPPPPPPPPPP.',
  'PPKPPPPPPPPPNN',
  'PPPPPPPPPPPPNN',
  'PPPPPPPPPPPPP.',
  '.PPPPPPPPPPP..',
  '..PP.PP.PP.PP.',
]
const PIGGY_C = { P: '#ff8fb1', K: INK, N: '#ff5f8f' }
const CART = [
  'K.............',
  '.KKKKKKKKKKKK.',
  '.K.K.K.K.K.K..',
  '.KKKKKKKKKKK..',
  '..K.K.K.K.K...',
  '..KKKKKKKKK...',
  '...O.....O....',
]
const CART_C = { K: '#9aa5c4', O: INK }
const COIN = ['.GGGG.', 'GGWGGG', 'GWGGGG', 'GGGGGG', 'GGGGGG', '.GGGG.']
const COIN_C = { G: GOLD, W: '#fff4e2' }
const VASE = ['..PPP..', '.P.P.P.', '..PPP..', '...G...', '.BBBBB.', 'BBWBBBB', 'BBBBBBB', '.BBBBB.']
const VASE_C = { P: '#ff8fb1', G: '#5fd068', B: '#c9a6ff', W: '#fff' }
const SAD = ['..L..', '.L.L.', 'L..L.', '..S..', '..S..', 'PPPPP', '.PPP.']
const SAD_C = { L: '#9e9a58', S: '#6b6a3a', P: '#c96a3a' }
const HAPPY_C = { L: '#5fd068', S: '#3f9e4a', P: '#c96a3a' }

/** a row of glass jars with labels; fills[i] 0..1 */
function jars(x, cx, cy, k, names, fills, w = 92) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  names.forEach((n, i) => {
    const jx = (i - (names.length - 1) / 2) * (w + 18)
    x.fillStyle = INK; x.fillRect(jx - w / 2 - 5, -85, w + 10, 175)
    x.fillStyle = '#c4f0ff'; x.fillRect(jx - w / 2, -80, w, 165)
    x.fillStyle = GOLD; const h = 150 * fills[i]; x.fillRect(jx - w / 2 + 6, 80 - h, w - 12, h)
    x.fillStyle = '#9aa5c4'; x.fillRect(jx - w / 2 - 4, -100, w + 8, 20)
    x.fillStyle = '#fff4e2'; x.fillRect(jx - w / 2 + 4, -30, w - 8, 36)
    x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(n, jx, -11)
  })
  x.restore()
}
function envelopes(x, cx, cy, k, names) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  names.forEach((n, i) => {
    const ex = (i % 2 - 0.5) * 180, ey = Math.floor(i / 2) * 130 - 65
    x.fillStyle = INK; x.fillRect(ex - 85, ey - 55, 170, 110); x.fillStyle = i === names.length - 1 ? '#ffe36a' : '#fff4e2'; x.fillRect(ex - 80, ey - 50, 160, 100)
    x.strokeStyle = '#9aa5c4'; x.lineWidth = 3; x.beginPath(); x.moveTo(ex - 80, ey - 50); x.lineTo(ex, ey); x.lineTo(ex + 80, ey - 50); x.stroke()
    x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(n, ex, ey + 26)
  })
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Buy-now energy. | *Sleep on it* first.', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CART, CART_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'BUY NOW?', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: '#ff6b5a', color: '#fff4e2', rot: -0.04 })
      label(x, 790, 1110, 'ASK AGAIN TOMORROW', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Saves for comfort. | Spend on *joy* too.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PIGGY, PIGGY_C, 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'ONE TREAT: APPROVED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 800, 900, P.t0 + 1.2, 6, 170, 0.2)
    } },
  { sign: 'gemini', cap: 'Twelve side hustles. | *Pick a favourite.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const H = ['CANDLES', 'DOG WALKS', 'PODCAST', 'NAIL ART', 'TUTORING', 'MURALS']
      H.forEach((h, i) => label(x, 690 + (i % 2) * 200, 640 + Math.floor(i / 2) * 120, h, pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2), { size: 32, bg: i === 3 && lt > 1.6 ? GOLD : BONE, rot: (i % 2 ? 0.05 : -0.05) }))
      if (lt > 1.6) label(x, 790, 1090, '♥ THIS ONE', pop01(t, P.t0 + 2.1, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Saves for everyone. | *Save some for you.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const f = ease.outCubic(prog(lt, 0.4, 1.2))
      jars(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['MOM', 'KIDS', 'YOU'], [0.9 * f, 0.8 * f, 0.04])
      label(x, 790, 1100, 'YOU: EMPTY?!', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Treats everyone. | Treat *future you.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'dinner’s on me!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      label(x, 790, 900, 'FUTURE LEO SAYS', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 32, bg: BONE, rot: 0.04 })
      label(x, 790, 1010, 'THANK YOU!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: '#ffb34a', rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Budgets everything. | Leave *room for fun.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) { envelopes(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['RENT', 'FOOD', 'BILLS', 'FUN']); label(x, 790, 1130, 'FUN: FUNDED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04 }) } },
  { sign: 'libra', cap: 'Buys the pretty one. | *Pretty is allowed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, VASE, VASE_C, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, 'JOY: WORTH IT', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04 })
      sparkles(x, t, 800, 860, P.t0 + 0.8, 6, 160, 0.4)
    } },
  { sign: 'scorpio', cap: 'Secret savings. | *Proud of you.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 880); x.scale(k, k); x.fillStyle = INK; x.fillRect(-140, -140, 280, 280); x.fillStyle = '#6b62a8'; x.fillRect(-130, -130, 260, 260); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.fill(); x.fillStyle = '#9aa5c4'; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill(); x.save(); x.rotate(t * 1.5); x.fillStyle = INK; x.fillRect(-6, -50, 12, 100); x.restore(); x.restore() }
      label(x, 790, 1110, 'BALANCE: CLASSIFIED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: '#c97bff', color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Spends on trips. | *Memories count.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      ;['TRAIN', 'FERRY', 'BUS', 'TRAIN'].forEach((s, i) => label(x, 760 + (i % 2) * 60, 660 + i * 110, `TICKET · ${s}`, pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2), { size: 28, bg: ['#ffd23a', '#8fe3ff', '#ff8fb1', '#7dffb0'][i], rot: (i % 2 ? 0.07 : -0.06), font: MONO, weight: 700 }))
    } },
  { sign: 'capricorn', cap: 'Retirement plan at nine. | *Enjoy today too.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 680, 'PLAN: AGE 9 → 90', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      for (let i = 0; i < 4; i++) drawBits(x, COIN, COIN_C, 790, 1000 - i * 40, 14 * pop01(t, P.t0 + 0.5 + i * 0.12, 0.25, 2))
      label(x, 790, 1130, 'TODAY: ICE CREAM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Gives to causes. | *You’re a cause too.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;['SAVE THE BEES', 'SAVE THE PARK', 'SAVE… ME?'].forEach((s, i) => label(x, 790, 680 + i * 160, s, pop01(t, P.t0 + 0.3 + i * 0.5, 0.25, 2.2), { size: 34, bg: i === 2 ? PINK : SKYB, rot: (i - 1) * 0.04 }))
    } },
  { sign: 'pisces', cap: 'Rescues every sad plant. | *Budget for love.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ok = lt > 1.3
      for (let i = 0; i < 3; i++) drawBits(x, SAD, ok ? HAPPY_C : SAD_C, 700 + i * 95, 930, 20 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2))
      label(x, 790, 680, 'CLEARANCE: 3 FOR 1', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04 })
      label(x, 790, 1130, ok ? 'ALL THRIVING' : 'THEY NEEDED ME', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: ok ? MINT : SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0009', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *money mindset.*',
  cameos: CAMEOS,
  group: { cap: 'Every mindset | *has a gift.*' },
  last: {
    text: 'Cancer’s jar for you: | *finally full.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2), f = ease.outCubic(prog(lt, 0.9, 2.2))
      jars(x, 680, 1080, 1.5 * k, ['MOM', 'KIDS', 'YOU'], [0.9, 0.8, 0.04 + 0.86 * f], 100)
      if (k > 0.01) signChar(x, t, 'cancer', 260, 1100, 280 * k, { mood: lt > 2.0 ? 'heart' : 'wide', look: [1, 0], seed: 85, glyph: false, hops: [t - lt + 2.2] })
      sparkles(x, t, 845, 1080, t - lt + 2.2, 8, 160, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
