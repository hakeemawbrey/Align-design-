// r2a0474: star_advice, ADVICE ROLLCALL, "Signs choosing | *themselves.*" (topic: each sign choosing themselves) (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order: one warm, specific "you're allowed" for each, with one light visual gag. Ending: group.
//   ♈ sit this one out · ♉ comfy pants are self-respect · ♊ mute the group chat · ♋ soup for you first · ♌ rest the crown
//   · ♍ leave one dish · ♎ the match who chooses you back · ♏ let one grudge float off · ♐ a solo trip is a love
//   letter · ♑ logging off is a goal too · ♒ your weird is the best part · ♓ cry it out, then pick you.
//  49.2   group (the ending): "Twelve signs. | *Each one worth it.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -190 }, ACC = '#ff9ec7'
const CROWN = ['Y..Y..Y', 'YY.Y.YY', 'YYYYYYY', 'YRYYYBY', 'YYYYYYY']
const PANTS = ['PPPPPPPP', 'PPPPPPPP', 'PPPPPPPP', 'PPP..PPP', 'PPP..PPP', 'PPP..PPP', 'PPP..PPP', 'WWW..WWW']
const DISH = ['.WWWWW.', 'WWwwwWW', '.WWWWW.']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'KKKKKKKKKKKK']
const CHAIR = ['RRRR', 'R..R', 'R...', 'RRRR', 'R..R', 'R..R']

const CAMEOS = [
  { sign: 'aries', cap: 'Aries, you can | *sit this one out.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: L, hops: [0.5],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { R: ORANGE }, 820, 970, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      label(x, 800, 700, 'BENCHED (HAPPILY)', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Taurus, comfy pants | *are self-respect.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PANTS, { P: '#c9a6ff', W: BONE }, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1130, 'DRESS CODE: COZY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Gemini, muting the chat | *is allowed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      const muted = lt > 1.0
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: muted ? 'shh.' : '99+', head: 'GROUP CHAT', msg: muted ? 'muted | for you' : 'did u see | did u see', bg: muted ? MINT : PINK, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Cancer, make the soup | *for yourself first.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'bowl', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 720, 'TABLE FOR ONE ♥︎', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Leo, rest the crown. | *Still royalty.*', mood: lt => lt > 1.2 ? 'sleepy' : 'sparkle', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const m = ease.inOutCubic(prog(lt, 0.5, 1.2))
      bits(x, 'pillow', 820, 1010, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CROWN, { Y: GOLD, R: RED, B: SKYB }, lerp(F.x, 820, m), lerp(F.top - 34, 960, m), 14)
      label(x, 820, 720, 'DAY OFF, YOUR MAJESTY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Virgo, leave one dish. | *The world survives.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 1], star: L, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, DISH, { W: PAPER, w: '#e8dcc6' }, 800, 1000, 32 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 760, lt > 1.3 ? 'WORLD: FINE ✓' : 'ONE DISH LEFT…', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: lt > 1.3 ? MINT : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Libra, pick the match | *who picks you back.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:41', head: 'NEW MATCH', msg: lt > 0.9 ? 'it’s | mutual ♥︎' : '…', bg: PINK, rot: -0.04 })
      hearts(x, t, 800, 760, P.t0 + 1.2, { n: 6, life: 1.6, spread: 200, cell: 6, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'Scorpio, let one grudge go. | *Feel lighter.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, -1], star: L, hops: [1.4],
    front(x, t, lt, P) {
      const up = ease.inCubic(prog(lt, 0.8, 2.2))
      bits(x, 'balloon', 800 + Math.sin(t * 2) * 10, 980 - up * 380, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800 + Math.sin(t * 2) * 10, 1100 - up * 380, 'GRUDGE #1', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: '#c2375a', color: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sag, a solo trip | *is a love letter to you.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      bits(x, 'suitcase', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'heart', 800, 950, 9 * pop01(t, P.t0 + 0.9, 0.3, 2.4))
      label(x, 800, 720, 'PARTY OF ONE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Capricorn, logging off | *is a goal too.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 0.7, 1.1))
      drawBits(x, LAPTOP.slice(0, 6), { K: '#9a94c0', S: shut > 0.5 ? '#9a94c0' : SKYB }, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 - 0.7 * shut })
      label(x, 800, 720, 'GOAL: OFFLINE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Aquarius, your weird | *is the best part.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wink', look: [1, -1], star: L, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 800, 900, 'ONE OF A KIND', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 44, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 0.7, 9, 200, 0.4, [SKYB, BONE, LAV])
    } },
  { sign: 'pisces', cap: 'Pisces, cry it out. | *Then pick you.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 1 : 3, look: [1, 0], star: L, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'heart', 800, 920, 20 * pop01(t, P.t0 + 1.2, 0.35, 2))
      label(x, 800, 1100, 'CHOSEN: ME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0474', key: 'E', accent: ACC, ending: 'group',
  title: 'Signs choosing | *themselves.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *Each one worth it.*',
    draw(x, t, lt) {
      label(x, 540, 720, '✦ CHOSEN ✦', pop01(t, t - lt + 1.8, 0.3, 2.2), { size: 44, bg: ACC, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
