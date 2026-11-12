// r2a0229: ADVICE ROLLCALL, "How each sign | keeps a promise." (star_advice, music: lofi · E). Ending: callback.
//   ♈ promises fast, shows up faster · ♉ said they'd come, brought snacks · ♊ forgets the time, never forgets you
//   · ♋ remembers every promise · ♌ promised a party, threw the best one · ♍ writes it down, ticks it off
//   · ♎ promised both friends, made both · ♏ rarely promises, never breaks one · ♐ promised a trip, booked it tonight
//   · ♑ their word is a contract · ♒ promised to call, called from a rooftop · ♓ promised to listen, cried with you
//   group "Different styles. | *Same big heart.*"   last (callback to Taurus) "And Taurus? | *Brought seconds.*"
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const L = { x: -150 }, R = { x: 150 }

const CAMEOS = [
  { sign: 'aries', cap: 'Promises fast. | *Shows up faster.*', mood: 'sparkle', star: L, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'I’ll be there!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 900, 'ARRIVED: EARLY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Said they’d come. | *Brought snacks too.*', mood: 'happy', star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'cookie', 760, 800, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'cookie', 860, 900, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 790, 640, 'for you ♡', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
    } },
  { sign: 'gemini', cap: 'Forgets the time. | *Never forgets you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'wait, TODAY?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 770, 900, 'STILL CAME ♡', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Remembers every promise. | *Since age seven.*', mood: 'heart', star: L,
    front(x, t, lt, P) {
      note(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'share fries ✓ | be there ✓ | forever ✓', { head: 'PINKY SWEARS', headBg: PINK, size: 36, w: 340 })
    } },
  { sign: 'leo', cap: 'Promised a party. | *Threw the best one.*', mood: 'sparkle', star: L, hops: [0.9],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'balloon', 700 + i * 90, 760 - (i % 2) * 50 + 8 * Math.sin(t * 2 + i), 16 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      label(x, 790, 1040, 'AS PROMISED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Writes it down. | *Ticks it off.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.4) / 0.4))
      const it = ['help you move', 'call on friday', 'return the book'].map((s, i) => s + (i < n ? ' ✓' : ''))
      note(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), it.join(' | '), { head: 'PROMISES', headBg: MINT, size: 34, w: 350 })
    } },
  { sign: 'libra', cap: 'Promised both friends. | *Made both.*', mood: 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 720, 'BRUNCH 11:00 ✓', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 860, 'DINNER 7:00 ✓', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 790, P.t0 + 1.4, 6, 170, 0.2)
    } },
  { sign: 'scorpio', cap: 'Rarely promises. | *Never breaks one.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'key', 790, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      label(x, 790, 960, 'LOCKED IN', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 42, bg: RED, color: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Promised a trip. | *Booked it that night.*', mood: 'sparkle', star: R, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bits(x, 'suitcase', 310, 760, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 310, 970, 'TICKETS: 2', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Their word | *is a contract.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      note(x, 310, 790, pop01(t, P.t0 + 0.2, 0.3, 2), 'I will be there. | — signed, ♑︎', { head: 'AGREEMENT', headBg: MINT, size: 34, w: 340 })
    } },
  { sign: 'aquarius', cap: 'Promised to call. | Called *from a rooftop.*', mood: 'sparkle', look: [1, -1], star: L, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 800, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '23:58', head: 'CALLING YOU', msg: 'look at | the stars!', bg: MINT })
    } },
  { sign: 'pisces', cap: 'Promised to listen. | *Cried with you.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I’m here. | tell me.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
      hearts(x, t, 790, 1100, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0229', key: 'E', accent: GOLD, ending: 'callback',
  title: 'How each sign | *keeps a promise.*',
  cameos: CAMEOS,
  group: { cap: 'Different styles. | *Same big heart.*' },
  last: {
    text: 'And Taurus? | *Brought seconds.*',
    draw(x, t, lt) {
      signChar(x, t, 'taurus', 540, 1040, 260, { mood: lt > 1.0 ? 'happy' : 'sparkle', pop: pop01(t, t - lt + 0.3, 0.4, 1.8), hops: [t - lt + 1.0], seed: 9 })
      for (let i = 0; i < 3; i++) bits(x, 'cookie', 400 + i * 140, 1280, 16 * pop01(t, t - lt + 0.9 + i * 0.2, 0.3, 2.2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
