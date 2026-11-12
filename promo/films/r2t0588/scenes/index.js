// r2t0588: star_talk, SOLO (capricorn), "Capricorn birthdays | *be like.*" (signs3kit social cut, music: lofi · G).
// One sign the whole way: nine things a Capricorn does on their birthday, each pushed to the extreme. Ending: callback.
//   scheduled their own surprise party · blew out the candles, checked emails · asked for the receipt · a year older =
//   "experience" · wished for a raise · left their own party at 9 sharp · birthday business hours · replied to the texts
//   in order received · secretly loved every minute
//   group "Celebrated. | *Efficiently.*"  callback: "Next year’s surprise: | *already scheduled.*" (the agenda comes back)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, confetti, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'capricorn', ST = { x: -180 }
const CAKE = ['..Y...Y...Y..', '..W...W...W..', '..W...W...W..', 'PPPPPPPPPPPPP', 'PCPCPCPCPCPCP', 'CCCCCCCCCCCCC', 'RRRRRRRRRRRRR', 'CCCCCCCCCCCCC', 'CCCCCCCCCCCCC']
const CAKE_C = { Y: '#ffb34a', W: CREAM, P: PINK, C: '#e8b36a', R: RED }
const HAT = ['....Y....', '...PPP...', '...PMP...', '..PPPPP..', '..PMPPP..', '.PPPPMPP.', '.PMPPPPP.', 'PPPPPPMPP', 'YYYYYYYYY']
const HAT_C = { Y: GOLD, P: '#7dffb0', M: PINK }
const AGENDA = { w: 340, h: 300, head: 'BIRTHDAY AGENDA', headBg: STEEL, headInk: INK, lines: ['7:00 surprise', '7:01 act shocked', '9:00 bed'], size: 32, rot: -0.04, align: 'left' }

const CAMEOS = [
  { sign: S, cap: 'Scheduled their own | *surprise party.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { ...AGENDA, progress: clamp(lt / 1.4) })
      L(x, 800, 1110, 'SURPRISE: ON TIME', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Blew out the candles. | *Checked emails.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const lit = lt < 0.8
      drawBits(x, lit ? CAKE : CAKE.map((r, j) => j === 0 ? '.............' : r), CAKE_C, 810, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.0) bits(x, 'LAPTOP', 810, 700, 17 * pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2))
      L(x, 800, 1130, 'INBOX: ZERO', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Opened a gift. | Asked *for the receipt.*', mood: lt => lt > 1.1 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GIFT', 810, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'receipt?', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 52, col: STEEL, tail: 'bl' })
      L(x, 800, 1100, 'FOR THE RECORDS', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'A year older? | They call it *“experience.”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 0.9, 'AGE: +1', 'EXPERIENCE: +1', { size: 40, fromBg: STEEL, toBg: GOLD })
      sparkles(x, t, 800, 820, P.t0 + 1.6, 6, 180, 0.3)
    } },
  { sign: S, cap: 'Made a wish. | It was *a raise.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 810, 1000, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 700, 'a raise.', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 62, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Left their own party | *at 9 sharp.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [-1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 810, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      confetti(x, t, 810, 900, P.t0 + 0.4, { n: 14, spread: 200 })
      L(x, 800, 1100, 'GOODNIGHT, EVERYONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.04, 28)
    } },
  { sign: S, cap: 'Birthday month? | *Birthday business hours.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, head: 'CELEBRATING', headBg: PINK, headInk: INK, lines: ['MON–FRI', '9 AM – 5 PM'], size: 40, rot: 0.04 })
      L(x, 800, 1100, 'CLOSED WEEKENDS', pop01(t, P.t0 + 1.4, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: S, cap: 'Answered the birthday texts | *in order received.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(48, 1 + Math.floor(Math.max(0, lt - 0.3) * 24))
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `REPLY ${n} / 48`, headCol: STEEL, lines: [['hbd!!', PINK, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['thank you.', BONE, pop01(t, P.t0 + 0.7, 0.2, 2), true], ['next.', BONE, pop01(t, P.t0 + 1.2, 0.2, 2), true]], size: 30 })
    } },
  { sign: S, cap: 'Secretly loved | *every single minute.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.1, 1.5],
    front(x, t, lt, P) {
      drawBits(x, HAT, HAT_C, 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.15 })
      bubble(x, 800, 1060, 'don’t tell anyone.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0588', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Capricorn birthdays | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Celebrated. | *Efficiently.*', mood: 'sparkle' },
  last: {
    text: 'Next year’s surprise: | *already scheduled.*',
    draw(x, t, lt) {
      sheet(x, 540, 1120, 1.35 * pop01(lt, 0.4, 0.35, 2), { ...AGENDA, head: 'NEXT YEAR', lines: ['7:00 surprise', '7:01 act shocked', '9:00 bed'] })
      sparkles(x, t, 540, 1120, t - lt + 0.8, 8, 240, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
