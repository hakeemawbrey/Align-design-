// r2t0322: star_talk, ROLLCALL, "The signs at | a dinner party." (signs3kit social cut, music: lofi · E). Ending: callback.
//   ♈ arrived at four, party's at seven · ♉ brought a casserole, for themself · ♊ sat in every seat · ♋ sent everyone
//   home with leftovers · ♌ seating chart by sign, centre: Leo · ♍ re-folded every napkin mid-dinner · ♎ an hour to pass
//   the salt · ♏ guessed everyone's sign by the appetizer · ♐ invited the whole bus stop · ♑ calendar invite for dessert
//   · ♒ served soup in a frisbee · ♓ cried at the cake (it said "welcome")
//  49.2  "Best night ever. | Nobody left."   52.6  callback: "Aries is back | for next year's." (the early arrival)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const CLOCK = ['..KKKKK..', '.KWWWWWK.', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKKKWK', 'KWWWWWWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']
const DISH = ['....KK....', '..KKKKKK..', '.KLLLLLLK.', 'KKKKKKKKKK', 'KOOOOOOOOK', 'KOYOOYOOOK', 'KOOOOOOOOK', '.KKKKKKKK.']
const BOX = ['KKKKKKKK', 'KMMMMMMK', 'KWWWWWWK', 'KWWWWWWK', 'KKKKKKKK']
const CHAIR = ['KKKKKK..', 'KCCCCK..', 'KCCCCK..', 'KCCCCK..', 'KCCCCKKK', 'KCCCCCCK', 'KKKKKKKK', 'K.K..K.K', 'K.K..K.K', 'K.K..K.K']
const NAPKIN = ['....W....', '...WWW...', '..WWWWW..', '.WWWWWWW.', 'WWWWWWWWW', 'KKKKKKKKK']
const SALT = ['.KKK.', 'KWWWK', 'KWWWK', 'KWWWK', 'KWWWK', 'KKKKK']
const FRISBEE = ['...RRRRRR...', '.RRRRRRRRRR.', 'RRSSSSSSSSRR', 'RRSSSSSSSSRR', '.RRRRRRRRRR.', '...RRRRRR...']
const CAKE = ['....Y.Y.Y....', '....R.R.R....', '.PPPPPPPPPPP.', '.PWWWWWWWWWP.', '.PPPPPPPPPPP.', 'CCCCCCCCCCCCC', 'CCCCCCCCCCCCC', 'KKKKKKKKKKKKK']
const BUS = ['KKKKKKKKKKKKKK', 'KYYYYYYYYYYYYK', 'KYSSYSSYSSYSSK', 'KYSSYSSYSSYSSK', 'KYYYYYYYYYYYYK', 'KYYYYYYYYYYYYK', 'KKKWWKKKKWWKKK', '...WW....WW...']

/** a seating-chart card: a round table, little sign dots, LEO in the middle */
function seating(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 316, 316)
  x.fillStyle = INK; x.fillRect(-162, -170, 324, 334); x.fillStyle = CREAM; x.fillRect(-154, -162, 308, 318)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEATED BY SIGN', 0, -134)
  x.fillStyle = '#e8d8b8'; x.beginPath(); x.arc(0, 20, 96, 0, Math.PI * 2); x.fill()
  const COL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
  COL.forEach((c, i) => { const a = i / 11 * Math.PI * 2; x.fillStyle = INK; x.fillRect(Math.cos(a) * 118 - 12, 20 + Math.sin(a) * 118 - 12, 24, 24); x.fillStyle = c; x.fillRect(Math.cos(a) * 118 - 8, 20 + Math.sin(a) * 118 - 8, 16, 16) })
  x.fillStyle = '#ffb34a'; x.fillRect(-56, -2, 112, 44); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('LEO', 0, 22)
  x.restore()
}
/** a calendar-invite card */
function invite(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 316, 210)
  x.fillStyle = INK; x.fillRect(-162, -110, 324, 214); x.fillStyle = CREAM; x.fillRect(-154, -102, 308, 198)
  x.fillStyle = '#2fc79a'; x.fillRect(-154, -102, 308, 52)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVITE', 0, -76)
  x.font = `800 30px ${INTER}`; lines.forEach((l, i) => x.fillText(l, 0, -10 + i * 44))
  x.restore()
}

const R = { x: -160 }
const CAMEOS = [
  { sign: 'aries', cap: 'Arrived at four. | Party’s *at seven.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: R, hops: [0.6, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CLOCK, { K: INK, W: CREAM }, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1030, 'IT IS 4:02', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 36)
      bubble(x, 780, 610, 'hellooo??', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Brought a casserole. | *For themself.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: R,
    front(x, t, lt, P) {
      drawBits(x, DISH, { K: INK, L: '#c9c9d8', O: '#e8a24a', Y: '#ffd23a' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'PRIVATE DISH', pop01(t, P.t0 + 0.7, 0.3, 2.4), RED, -0.05, 34)
      bubble(x, 780, 1110, 'potluck means | I pick.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Sat in every seat. | *Same night.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', hideStar: true,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      for (let i = 0; i < 4; i++) drawBits(x, CHAIR, { K: INK, C: ['#ffd23a', PINK, MINT, LAV][i] }, 230 + i * 205, 1040, 18 * k)
      const seat = Math.min(3, Math.floor(lt * 1.8))
      signChar(x, t, 'gemini', 230 + seat * 205, 900, 220 * k, { mood: seat % 2 ? 'wink' : 'sparkle', seed: 5, hops: [P.t0 + 0.1 + seat * 0.43] })
      L(x, 540, 620, `SEAT ${seat + 1} OF 12`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.03, 36)
    } },
  { sign: 'cancer', cap: 'Sent everyone home | with *leftovers.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: R,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.4) * 6)
      for (let i = 0; i < n; i++) drawBits(x, BOX, { K: INK, M: [PINK, MINT, GOLD, SKYB, LAV, '#ff9a4a'][i], W: CREAM }, 790 + (i % 2 ? 24 : -24), 1100 - i * 70, 16)
      L(x, 790, 600, 'ONE FOR YOU.', pop01(t, P.t0 + 0.5, 0.3, 2), PINK, -0.04, 32)
      hearts(x, t, 790, 900, P.t0 + 1.6, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Seating chart: | *centre, Leo.*', mood: 'sparkle', star: R, hops: [1.2],
    front(x, t, lt, P) {
      seating(x, 790, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 880, P.t0 + 0.9, 6, 150, 0.3)
    } },
  { sign: 'virgo', cap: 'Re-folded every napkin. | *Mid-dinner.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.2) * 3)
      for (let i = 0; i < 3; i++) drawBits(x, NAPKIN, { W: i < n ? '#ffffff' : '#b9b0a0', K: INK }, 670 + i * 125, 1040, 15 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: i < n ? 0 : 0.4 - i * 0.3 })
      L(x, 790, 820, 'SWANS: FIXED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
      bubble(x, 780, 640, 'keep eating!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Took an hour | to *pass the salt.*', mood: lt => lt > 1.9 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: R,
    front(x, t, lt, P) {
      const sx = 790 + 90 * Math.sin(lt * 4)
      drawBits(x, SALT, { K: INK, W: '#ffffff' }, sx, 960, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 680, Math.floor(lt * 2.5) % 2 ? 'left? right?' : 'or pepper?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1130, '9:58 P.M.', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Guessed everyone’s sign. | By *the appetizer.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const G = ['VIRGO.', 'LEO, OBVIOUSLY.', 'GEMINI. BOTH.']
      G.forEach((g, i) => L(x, 790, 640 + i * 120, g, pop01(t, P.t0 + 0.4 + i * 0.35, 0.3, 2.4), [MINT, '#ffb34a', GOLD][i], i % 2 ? 0.04 : -0.04, 32))
      bubble(x, 790, 1060, 'nailed it.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Invited the whole | *bus stop.*', mood: 'sparkle', star: { x: 160 }, hops: [0.5, 1.3],
    front(x, t, lt, P) {
      drawBits(x, BUS, { K: INK, Y: GOLD, S: SKYB, W: '#9aa5c4' }, 300, 760, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 300, 960, '+11 GUESTS', pop01(t, P.t0 + 0.8, 0.3, 2.4), MINT, -0.05, 38)
      bubble(x, 760, 620, 'the more | the merrier!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Calendar invite | for *dessert.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      invite(x, 310, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['DESSERT', '8:15 – 8:30'])
      L(x, 310, 1040, 'ACCEPTED: 0', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Served the soup | in a *frisbee.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: R, hops: [1.3],
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.3, 1.0))
      drawBits(x, FRISBEE, { R: '#6fc3ff', S: '#e8a24a' }, lerp(500, 790, p), 900 - Math.sin(Math.PI * p) * 160, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: (1 - p) * 0.6 })
      L(x, 790, 650, 'BOWLS ARE A CONSTRUCT', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Cried at the cake. | It said *“welcome.”*', mood: lt => lt < 0.8 ? 'sparkle' : 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAKE, { Y: GOLD, R: RED, P: PINK, W: CREAM, C: '#fff0f5', K: INK }, 800, 950, 22 * k)
      if (k > 0.9) { x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('welcome', 800, 917) }
      bubble(x, 790, 680, 'to ME??', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0322', key: 'E', accent: '#ffb34a', ending: 'callback',
  title: 'The signs at | a *dinner party.*',
  cameos: CAMEOS,
  group: { cap: 'Best night ever. | *Nobody left.*' },
  last: {
    text: 'Aries is back | for *next year’s.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 420, 1000, 300 * k, { mood: lt > 1.2 ? 'sparkle' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.0, t0 + 1.6] })
      drawBits(x, CLOCK, { K: INK, W: CREAM }, 760, 960, 18 * pop01(t, t0 + 0.6, 0.4, 2))
      L(x, 700, 1200, 'PARTY: IN 364 DAYS', pop01(t, t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 36)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
