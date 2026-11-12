// r2t0675: star_talk, BE LIKE, "Say their nickname? | *Zodiacs be like.*" (topic "Zodiacs when someone uses their
// nickname be like", shortened to fit two lines; signs3kit social cut, music: lofi · F). Ending: callback.
//   ♈ "champ": title accepted · ♉ "bun": now wants a bun · ♊ nine nicknames, answers to all · ♋ "sweetie": adopted you
//   · ♌ "superstar": finally, correct · ♍ misspelled, corrected · ♎ "my match": planned the wedding · ♏ the childhood
//   nickname: how do you know · ♐ "Sag": now a band name · ♑ "Cappy": filed a complaint · ♒ gave themself a
//   nickname nobody uses (ZORP) · ♓ "bestie": sobbed
//   group "Twelve signs. | *Forty nicknames.*"
//   last "Still nobody | *calls them Zorp.*" (card 11 paid off: the name tag comes back)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, nameTag, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }
const call = (x, t, P, txt, y = 680) => bubble(x, 800, y, txt, pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })

const CAMEOS = [
  { sign: 'aries', cap: '“Hey, champ.” | *Title accepted.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      call(x, t, P, 'hey, champ')
      L(x, 800, 940, 'CHAMP (SELF-CERTIFIED)', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 28)
      sparkles(x, t, 370, 860, P.t0 + 1.0, 7, 170, 0.2)
    } },
  { sign: 'taurus', cap: 'Called “bun”? | Now *wants a bun.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: ST,
    front(x, t, lt, P) {
      call(x, t, P, 'hi bun!')
      bits(x, 'BUN', 800, 930, 22 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 1120, 'SNACK: REQUIRED', pop01(t, P.t0 + 1.6, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Nine nicknames. | *Answers to all.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      ['Gem?', 'G?', 'Twinny?', 'Mini?'].forEach((s, i) => bubble(x, 680 + (i % 2) * 220, 700 + Math.floor(i / 2) * 170, s, pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2), { size: 36, col: [BONE, GOLD, PINK, MINT][i], tail: 'bc' }))
      L(x, 800, 1110, 'ALL CORRECT', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Called “sweetie”? | *Adopted you.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      call(x, t, P, 'thanks, sweetie')
      friend(x, t, 'gemini', 820, 960, 160, pop01(t, P.t0 + 0.9, 0.35, 2), { mood: 'wide', look: [-1, 0] })
      L(x, 800, 1140, 'FAMILY NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 32)
      hearts(x, t, 820, 900, P.t0 + 1.1, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Called “superstar”? | *Finally. Correct.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      call(x, t, P, 'hey superstar')
      L(x, 800, 920, 'TITLE: ACCURATE', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 34)
      bubble(x, 800, 1110, 'say it again', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: '#ffb34a', tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Nickname misspelled? | *Corrected it.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'HI VIRG0!!', 'HI VIRGO.', { size: 44, fromBg: BONE, toBg: MINT })
      L(x, 800, 1060, 'ZERO ≠ O', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Called “my match”? | *Planned the wedding.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      call(x, t, P, 'hi, my match!')
      sheet(x, 800, 960, pop01(t, P.t0 + 0.9, 0.3, 2), { w: 300, h: 250, head: 'WEDDING ✦', headBg: PINK, headInk: INK, lines: ['venue: ✓', 'cake: ✓', 'date: one'], size: 28, progress: clamp((lt - 1.0) / 0.8) })
      hearts(x, t, 380, 760, P.t0 + 1.1, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Their childhood nickname? | *How do you know.*', mood: lt => lt > 0.9 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      call(x, t, P, 'hi, Scorpy!')
      L(x, 800, 930, 'WHO TOLD YOU', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 36)
      bubble(x, 800, 1110, '(your mom)', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, col: STEEL, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Called “Sag”? | Now *a band name.*', mood: 'sparkle', star: ST, hops: [1.1, 1.7],
    front(x, t, lt, P) {
      call(x, t, P, 'sup, Sag')
      L(x, 800, 900, '✦ THE SAGS ✦', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, -0.05, 40)
      notes(x, t, 420, 760, { n: 4, cell: 7, col: GOLD, seed: 3 })
      L(x, 800, 1130, 'FIRST GIG: FRIDAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Called “Cappy”? | *Filed a complaint.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      call(x, t, P, 'morning, Cappy!')
      sheet(x, 800, 960, pop01(t, P.t0 + 0.9, 0.3, 2), { w: 300, h: 250, head: 'COMPLAINT', headBg: STEEL, headInk: INK, lines: ['re: “Cappy”', 'status: filed'], size: 30, progress: clamp((lt - 1.0) / 0.8) })
    } },
  { sign: 'aquarius', cap: 'Gave themself a nickname. | *Nobody uses it.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      nameTag(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'ZORP')
      bubble(x, 800, 1110, 'hi… Aquarius?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: STEEL, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Called “bestie”? | *Sobbed.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 1, star: ST,
    front(x, t, lt, P) {
      call(x, t, P, 'ok bestie')
      L(x, 800, 930, 'HAPPY TEARS', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, 0.04, 34)
      hearts(x, t, 800, 1160, P.t0 + 1.2, { n: 5, life: 1.8, spread: 260, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0675', key: 'F', accent: ACC, ending: 'callback',
  title: 'Say their nickname? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Forty nicknames.*' },
  last: {
    text: 'Still nobody | *calls them Zorp.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.35, 2)
      nameTag(x, 620, 1180, k * 1.1, 'ZORP', -0.06)
      if (k > 0.01) signChar(x, t, 'aquarius', 340, 1180, 200 * k, { mood: 'happy', glyph: false, seed: 71, look: [1, 0] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
