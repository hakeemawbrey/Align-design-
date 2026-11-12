// r2t0583: star_talk, SOLO (gemini), "Geminis shopping | *be like.*" (signs3kit social cut, music: lofi · G).
// One sign the whole way: nine shopping trips, each the most extreme (and lovable) Gemini version. Ending: lesson.
//   went in for socks, left with a kayak · two carts, one per twin · three hours in the fitting room, bought the first one
//   · asked the cashier's sign, talked for an hour · changed their mind at the register, twice · sent the group a poll,
//   ignored it · returned one, bought two more · lost their friend, found three new ones · came home, forgot why they went
//   group "Two minds. | *One very full bag.*"  lesson "Curious is a superpower. | *Keep wandering.*"  VIBE: CURIOUS
//   last "Still no socks. | *Great kayak.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -190 }
const KAYAK = ['.........................Y', '..YYYYYYYYYYYYYYYYYYYYYYY.', 'YYYYYYYKKKKKKKKYYYYYYYYY..', '.YYYYYYYYYYYYYYYYYYYYYY...', '...YYYYYYYYYYYYYYYYYY.....']
const PADDLE = ['RR..............RR', 'RRWWWWWWWWWWWWWWRR', 'RR..............RR']
const CART = ['K..........', '.KKKKKKKKKK', '.KSSSSSSSSK', '.KSKSKSKSK.', '..KSSSSSSK.', '..KKKKKKKK.', '...K....K..', '..KKK..KKK.']
const SBAG = ['..K..K..', '.K....K.', 'PPPPPPPP', 'PPPPPPPP', 'PPWWWWPP', 'PPPPPPPP', 'PPPPPPPP', 'PPPPPPPP']
const bag = (x, cx, cy, cell, i = 0, o) => drawBits(x, SBAG, { K: INK, P: [PINK, MINT, LAV, SKYB, '#ffb34a'][i % 5], W: BONE }, cx, cy, cell, o)
const SOCK = ['.WWW', '.WWW', '.RRR', '.WWW', 'WWWW', 'WWW.']
const fill = (x, cx, cy, k, cols, n) => { for (let i = 0; i < n; i++) bits(x, ['GIFT', 'BOX', 'BOOK', 'GIFT'][i % 4], cx - 50 + (i % 3) * 50, cy - 40 - Math.floor(i / 3) * 34, 6 * k) }

const CAMEOS = [
  { sign: S, cap: 'Went in for socks. | Left with a *kayak.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SOCK, { W: BONE, R: RED }, 800, 720, 14 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - prog(lt, 0.9, 1.1)))
      L(x, 800, 650, 'LIST: SOCKS', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 32)
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      drawBits(x, KAYAK, { Y: '#ffb34a', K: INK }, 780, 930, 15 * k, { rot: -0.12 })
      drawBits(x, PADDLE, { R: RED, W: STEEL }, 790, 1010, 11 * k, { rot: 0.2 })
      L(x, 800, 1130, 'SOCKS: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, 0.04, 32)
    } },
  { sign: S, cap: 'Two carts. | *One per twin.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CART, { K: INK, S: STEEL }, 690, 960, 16 * k); drawBits(x, CART, { K: INK, S: STEEL }, 890, 960, 16 * k)
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.4) / 0.2))
      fill(x, 700, 920, k, null, n); fill(x, 900, 920, k, null, n)
      L(x, 690, 1130, 'TWIN 1', pop01(t, P.t0 + 0.6, 0.3, 2), ACC, -0.05, 28); L(x, 890, 1130, 'TWIN 2', pop01(t, P.t0 + 0.8, 0.3, 2), MINT, 0.05, 28)
    } },
  { sign: S, cap: 'Tried on fourteen outfits. | Bought the *first one.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const n = Math.min(14, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.1))
      L(x, 800, 680, `OUTFIT ${n}/14`, pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 36)
      sheet(x, 800, 880, pop01(t, P.t0 + 0.3, 0.3, 2), { w: 220, h: 240, bg: ['#ffb34a', MINT, PINK, LAV, SKYB][n % 5], lines: [], rot: 0.03 * Math.sin(n) })
      L(x, 800, 1110, 'FINAL: OUTFIT 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, 0.04, 32)
    } },
  { sign: S, cap: 'Asked the cashier’s sign. | *Talked for an hour.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'libra', 840, 960, 210, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.0 ? 'sparkle' : 'happy', look: [-1, 0], seed: 41 })
      bubble(x, 650, 660, 'what’s your sign?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'bc' })
      bubble(x, 840, 760, 'LIBRA. | no way!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: '#ff8fd8', tail: 'bc' })
      L(x, 800, 1150, 'LINE BEHIND: 9', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Changed their mind | at the register. *Twice.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      const phase = lt < 0.7 ? 0 : lt < 1.3 ? 1 : 2
      const C = [[RED, 'THE RED ONE'], [SKYB, 'NO, BLUE'], [RED, 'RED. FINAL.']][phase]
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 220, h: 220, bg: C[0], lines: [], rot: 0.04 })
      L(x, 800, 1080, C[1], pop01(t, P.t0 + 0.3 + [0, 0.7, 1.3][phase] * 1.29, 0.25, 2.4), BONE, -0.04, 36)
      bubble(x, 800, 660, 'sorry! sorry!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Sent the group chat a poll. | *Ignored the results.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'POLL: WHICH HAT?', headCol: ACC, lines: [['A: 7 votes', MINT, 1], ['B: 0 votes', STEEL, 1], ['bought C', PINK, lt > 1.1 ? pop01(lt, 1.1, 0.25, 2.2) : 0, true]], size: 24 })
      L(x, 800, 1140, 'DEMOCRACY: IGNORED', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Went to return one thing. | *Came back with two.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bag(x, 760, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), 0)
      bag(x, 880, 950, 18 * pop01(t, P.t0 + 1.0, 0.3, 2), 1, { rot: 0.1 })
      bag(x, 690, 1010, 16 * pop01(t, P.t0 + 1.2, 0.3, 2), 2, { rot: -0.1 })
      L(x, 800, 680, 'RETURNS DESK →', pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, -0.04, 30)
      L(x, 800, 1150, 'NET RETURNS: −2', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, 0.04, 32)
    } },
  { sign: S, cap: 'Lost their friend in the store. | *Made three new ones.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      ;['taurus', 'aquarius', 'sagittarius'].forEach((id, i) => friend(x, t, id, 690 + i * 120, 990 - (i % 2) * 40, 150, pop01(t, P.t0 + 0.4 + i * 0.25, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 50 + i }))
      L(x, 800, 690, 'FRIEND: MISSING', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 32)
      L(x, 800, 1150, 'NEW BESTIES: 3', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Got home with eight bags. | *Forgot why they went.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 8; i++) bag(x, 690 + (i % 4) * 72, 1070 - Math.floor(i / 4) * 90, 9 * k, i, { rot: (i % 3 - 1) * 0.1 })
      bubble(x, 800, 720, 'wait… | why did I go?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0583', key: 'G', accent: ACC, solo: S, ending: 'lesson',
  title: 'Geminis shopping | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Two minds. | *One very full bag.*', mood: 'sparkle' },
  lesson: { text: 'Curious is a superpower. | *Keep wandering.*', chip: 'VIBE: CURIOUS' },
  last: {
    text: 'Still no socks. | *Great kayak.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.8, 0.35, 2)
      drawBits(x, KAYAK, { Y: '#ffb34a', K: INK }, 540, 1200 + Math.sin(t * 2) * 8, 18 * k, { rot: -0.06 })
      drawBits(x, PADDLE, { R: RED, W: STEEL }, 560, 1280, 13 * k, { rot: 0.15 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
