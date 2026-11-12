// r2t0618: star_talk, ROLLCALL (twelve signs), "The signs at | a *garage sale.*" (signs3kit social cut, music: lofi · G).
// Aries: open at 5:00, sold out 5:02 · Taurus: won't sell the couch, sat on it all day · Gemini: sold a lamp, told its life
// story · Cancer: sold their old blanket, bought it back · Leo: selling autographs · Virgo: price tags sorted by sign
// · Libra: talked their own price down to free · Scorpio: mystery box, won't say · Sagittarius: sold everything, bought
// a backpack · Capricorn: printed receipts · Aquarius: a gadget nobody can name · Pisces: found the old diary, sobbed.
// Ending: callback. "Closing time: | *Cancer bought it back.*" (the blanket and the boxes come home).
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, swapLabel, confetti, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Opened at 5:00. | *Sold out by 5:02.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 740, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 950, lt, 1.1, 'OPEN: 5:00 AM', 'SOLD OUT: 5:02', { size: 36, fromBg: GOLD, toBg: RED })
      confetti(x, t, 800, 900, P.t0 + 1.5 * 1.29, { n: 20, spread: 240 })
    } },
  { sign: 'taurus', cap: 'Wouldn’t sell the couch. | *Sat on it all day.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'NOT FOR SALE', pop01(t, P.t0 + 0.8 * 1.29, 0.3, 2.2), RED, 0.05, 38)
      bubble(x, 800, 1080, 'mine.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Sold a lamp. | Told *its whole life story.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAMP', 820, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 820, 1100, 'LAMP: $4', pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 32)
      bubble(x, 790, 680, 'so in 2014, | this lamp…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Sold their old blanket. | *Bought it back.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: 0, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 870, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 1060, lt, 1.2, 'SOLD: $2', 'BOUGHT BACK: $20', { size: 34, fromBg: STEEL, toBg: PINK })
      hearts(x, t, 800, 820, P.t0 + 1.7 * 1.29, { n: 4, life: 1.4, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Nobody asked. | Leo *sold autographs.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'AUTOGRAPHS', headBg: GOLD, headInk: INK, lines: ['$10 each', 'selfies $20', 'limited!!'], size: 36, progress: prog(lt, 0.3, 1.2) })
      sparkles(x, t, 800, 840, P.t0 + 1.6, 7, 190, 0.6)
      L(x, 800, 1080, 'SOLD: 0', pop01(t, P.t0 + 1.7 * 1.29, 0.3, 2.2), STEEL, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Sorted the price tags. | *By zodiac sign.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tags = [['ARIES: $1', '#ff6b5a'], ['LEO: $5', '#ffb34a'], ['VIRGO: $2', '#7dd18a'], ['PISCES: 50¢', '#b7a6ff']]
      tags.forEach(([s, c], i) => L(x, 800, 680 + i * 130, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2), c, i % 2 ? 0.04 : -0.04, 36))
    } },
  { sign: 'libra', cap: 'Talked their own price down. | *To free.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const steps = ['$10', '$8', '$5?', '$2…', 'FREE!'], i = Math.min(4, Math.floor(clamp((lt - 0.3) / 1.4) * 5))
      L(x, 800, 830, steps[i], pop01(t, P.t0 + 0.2, 0.3, 2), i === 4 ? MINT : GOLD, -0.04, 64)
      bubble(x, 800, 1060, 'is that ok?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Mystery box: $1. | *Won’t say what’s inside.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 800, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 880, '???', pop01(t, P.t0 + 0.5, 0.3, 2), RED, -0.05, 48)
      bubble(x, 800, 680, 'you’ll see.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, col: STEEL, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Sold everything they own. | *Bought a backpack.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 880, 26 * pop01(t, P.t0 + 0.9 * 1.29, 0.3, 2))
      L(x, 800, 660, 'EVERYTHING: $40', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, 0.04, 34)
      bubble(x, 800, 1090, 'bye!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Garage sale? | *Printed receipts.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 380, head: 'RECEIPT', headBg: '#2fc79a', headInk: INK, lines: ['1 mug: $1', 'tax: $0.08', 'total: $1.08', 'thank you'], size: 32, align: 'left', progress: prog(lt, 0.3, 1.4), font: MONO, weight: 700 })
      L(x, 800, 1110, 'COPY FOR YOUR FILES', pop01(t, P.t0 + 1.7 * 1.29, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Sold a gadget | *nobody can name.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'WHAT IS IT? $3', pop01(t, P.t0 + 0.6, 0.3, 2), LAV, 0.04, 34)
      bubble(x, 800, 1080, 'it’s a… | thing!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Found their old diary. | *Sobbed on the lawn.*', mood: lt => lt < 1.0 ? 'happy' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      L(x, 800, 680, 'DIARY: AGE 9', pop01(t, P.t0 + 0.5, 0.3, 2), PINK, 0.04, 34)
      bits(x, 'TISSUE', 800, 1060, 14 * pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.2))
    } },
]

const F = makeFilm({
  id: 'r2t0618', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs at | a *garage sale.*',
  cameos: CAMEOS,
  group: { cap: 'Everything must go. | *Mostly.*', moods: ['sparkle', 'heart', 'wink', 'wide', 'sparkle', 'squint', 'happy', 'wink', 'sparkle', 'neutral', 'sparkle', 'wide'] },
  last: {
    text: 'Closing time: | *Cancer bought it back.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 360, 1110, 300 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 88, glyph: false, hops: [t0 + 1.5] })
      bits(x, 'BOX', 740, 1170, 20 * pop01(t, t0 + 0.6, 0.3, 2))
      bits(x, 'BOX', 740, 1060, 18 * pop01(t, t0 + 0.8, 0.3, 2))
      bits(x, 'BLANKET', 740, 960, 12 * pop01(t, t0 + 1.0, 0.3, 2))
      L(x, 740, 1290, 'PROFIT: −$40', pop01(t, t0 + 1.4, 0.3, 2.4), PINK, -0.04, 34)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
