// r2t0599: star_talk, SOLO (sagittarius), "Your Sag roommate | *be like.*" (signs3kit social cut, music: lofi · D).
// Nine cards, the most extreme Sagittarius roommate: left for "one night", back in March · brought home a tour group
// · rent paid in souvenirs · their whole room is one backpack · 3 a.m. "road trip?" · too honest about your outfit
// · lost the keys, came in the window · matched with someone in another country · their plants are yours now.
// Ending: callback. "Rent’s due? | Here’s *a magnet.*" (the souvenir rent, paid again: a palm-tree magnet on the bill).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, zzz, swapLabel, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#f2c75c', ST = { x: -180 }, SG = 'sagittarius'
const MAGNET = ['....GGG.', '..GGGGGG', '.GG.N.GG', '....N...', '....N...', '...N....', 'YYYYYYYY', 'BBBBBBBB']
const MAGNET_C = { G: '#4fbf6a', N: '#8a4a2e', Y: '#ffe27a', B: SKYB }
const POT = ['.GG.GG.', 'GGGGGGG', '.GGGGG.', 'OOOOOOO', '.OOOOO.', '.OOOOO.', '..OOO..']

const CAMEOS = [
  { sign: SG, cap: 'Left for “one night.” | Back in *March.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 820, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const m = ['NOV', 'DEC', 'JAN', 'FEB', 'MAR'][Math.min(4, Math.floor(clamp((lt - 0.4) / 1.2) * 5))]
      L(x, 810, 720, `BACK: ${m}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.04, 42)
      L(x, 800, 1090, '“BACK TOMORROW!”', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: SG, cap: 'Brought home | a *tour group.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      ;[['aries', 690], ['leo', 810], ['gemini', 930]].forEach(([id, px], i) => friend(x, t, id, px, 900, 140, pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 50 + i }))
      L(x, 810, 720, 'GUESTS: 9', pop01(t, P.t0 + 0.9, 0.3, 2.4), MINT, 0.04, 36)
      bubble(x, 810, 1080, 'they’re staying!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: SG, cap: 'Rent? | Paid in *souvenirs.*', mood: 'wink', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, head: 'RENT DUE', headBg: RED, headInk: CREAM, size: 34, lines: ['amount: half', 'paid: …'] })
      drawBits(x, MAGNET, MAGNET_C, 920, 990, 12 * pop01(t, P.t0 + 0.9, 0.3, 2.4), { rot: 0.15 })
      L(x, 800, 1090, 'PAID: 1 FRIDGE MAGNET', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: SG, cap: 'Their whole room: | *one backpack.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 820, 890, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1090, 'FURNITURE: 0', pop01(t, P.t0 + 1.1, 0.3, 2.4), STEEL, 0.04, 38)
    } },
  { sign: SG, cap: '3 a.m., at your door: | *“Road trip?”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 840, 760, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 960, 'ROAD TRIP?!', pop01(t, P.t0 + 0.6, 0.25, 2.4), { size: 54, col: ACC, tail: 'bl' })
      L(x, 800, 1110, 'YOU: ASLEEP', pop01(t, P.t0 + 1.4, 0.3, 2.4), STEEL, -0.04, 32)
    } },
  { sign: SG, cap: 'Honest about your outfit. | *Too* honest.', mood: 'squint', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      friend(x, t, 'libra', 860, 920, 190, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.0 ? 'wide' : 'sparkle', look: [-1, 0], seed: 54 })
      bubble(x, 600, 660, 'that? no.', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 46, tail: 'bl' })
      L(x, 840, 1110, 'REVIEW: 2 STARS', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: SG, cap: 'Lost the keys. | Came in *the window.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(840, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -130, 240, 260); x.fillStyle = SKYB; x.fillRect(-108, -118, 216, 236)
        x.fillStyle = INK; x.fillRect(-6, -118, 12, 236); x.fillRect(-108, -6, 216, 12)
        x.restore()
      }
      L(x, 800, 1060, 'DOOR: OPTIONAL', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: SG, cap: 'New match? | *Another country.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ♐︎', headCol: PINK, size: 22, lines: [['hola! ♡', PINK, pop01(t, P.t0 + 0.5, 0.2, 2.2)], ['bonjour! ♡', LAV, pop01(t, P.t0 + 0.9, 0.2, 2.2)], ['booking flight', MINT, pop01(t, P.t0 + 1.4, 0.2, 2.4), true]] })
    } },
  { sign: SG, cap: 'Their plants? | *Yours now.*', mood: 'wink', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, POT, { G: '#4fbf6a', O: '#d9774a' }, 820, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 820, 680, 'water them? ♡', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1090, 'GOOD LUCK', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 38)
    } },
]

const F = makeFilm({
  id: 'r2t0599', key: 'D', accent: ACC, solo: SG, ending: 'callback',
  title: 'Your Sag roommate | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never home. | *Always* fun.', mood: 'sparkle' },
  last: {
    text: 'Rent’s due? | Here’s *a magnet.*',
    draw(x, t, lt) {
      const t0 = t - lt
      sheet(x, 720, 1060, pop01(t, t0 + 0.4, 0.35, 2), { w: 360, h: 300, head: 'RENT DUE', headBg: RED, headInk: CREAM, size: 40, lines: ['amount: half', 'paid: …'] })
      drawBits(x, MAGNET, MAGNET_C, 860, 1250, 18 * pop01(t, t0 + 1.2, 0.3, 2.4), { rot: 0.15 })
      const k = pop01(t, t0 + 0.6, 0.4, 2)
      if (k > 0.01) signChar(x, t, SG, 330, 1080, 320 * k, { mood: lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], seed: 86, glyph: false, hops: [t0 + 1.3] })
      sparkles(x, t, 860, 1250, t0 + 1.3, 7, 120, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
