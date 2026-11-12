// r2t0472: star_talk, BELIKE, "“No offense, but…” | Zodiacs be like." (topic: zodiacs when someone says "no offense")
// (signs3kit social cut, music: lofi · E). Twelve signs in zodiac order, each the most extreme version of itself the
// moment someone says "no offense". Ending: the group beat.
//   ♈ offended before you finished · ♉ stopped chewing, very slowly · ♊ a reply in eleven parts · ♋ "it's fine", wrote
//   a diary entry · ♌ called a press conference · ♍ corrected your grammar, no offense · ♎ "none taken!" (all taken)
//   · ♏ added to the notebook · ♐ doesn't mind, invented it · ♑ "noted, next item" · ♒ took it as a compliment
//   · ♓ cried for a week, then said sorry to you.
//  49.2   group (the ending): "No offense, but… | *we're all like this.*"
import { clamp, prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -190 }, ACC = '#ff7a8a'
const PLATE = ['...OO.GG...', '..WOOWGGW..', '.WWwwwwwWW.', 'WWwwwwwwwWW', '.WWwwwwwWW.', '..WWWWWWW..']
const PLATE_C = { W: PAPER, w: '#e8dcc6', O: ORANGE, G: GREEN }
const MIC = ['.KKK.', 'KMMMK', 'KMMMK', 'KMMMK', '.KKK.', '..S..', '..S..', '..S..', '..S..', '..S..', '..S..', '.SSS.', 'SSSSS']
const MIC_C = { K: INK, M: '#c9c3e0', S: '#8a84a8' }

const CAMEOS = [
  { sign: 'aries', cap: '“No offense, b—” | *Offense taken.*', mood: 'squint', look: [1, 0], star: L, hops: [0.3],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'no offense, b—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      label(x, 800, 960, 'OFFENDED.', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 52, bg: RED, color: BONE, rot: -0.06 })
      sparkles(x, t, 800, 960, P.t0 + 0.8, 7, 170, 0.2, [RED, ORANGE, BONE])
    } },
  { sign: 'taurus', cap: 'Stopped chewing. | *Very slowly.*', mood: lt => lt > 0.9 ? 'neutral' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 800, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, '…go on.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 50, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Typed a reply. | *In eleven parts.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: L, hops: [1.0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 10.99)
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: `${n}/11`, head: 'ME', msg: 'ok so | first of all', bg: MINT, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Said “it’s fine.” | *Wrote a diary entry.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'it’s fine!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      note(x, 800, 940, pop01(t, P.t0 + 1.0, 0.3, 2), 'dear diary, | today someone | said “no offense”', { head: 'PAGE 1 OF 9', headBg: PINK, size: 32, w: 350, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Gasped. | *Called a press conference.*', mood: 'wide', look: [1, -1], star: { x: -180, y: -10 }, hops: [0.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, MIC, MIC_C, 670, 980, 20 * k); drawBits(x, MIC, MIC_C, 800, 960, 20 * k, { rot: 0.1 }); drawBits(x, MIC, MIC_C, 920, 990, 20 * k, { rot: -0.1 })
      label(x, 800, 700, 'STATEMENT AT 5', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 820, P.t0 + 1.3, 8, 190, 0.4, [BONE, GOLD, BONE])
    } },
  { sign: 'virgo', cap: 'Corrected your grammar. | *No offense.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'no offense, | but your | late again', { head: 'YOU SAID', headBg: SKYB, size: 38, w: 320, rot: 0.03, strike: lt > 0.9 ? [1] : [] })
      label(x, 860, 1040, 'you’re*', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.06 })
    } },
  { sign: 'libra', cap: '“None taken!” | *All of it taken.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: L, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'none taken! :)', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      const flip = lt > 1.2
      label(x, 800, 960, flip ? 'ALL TAKEN' : 'NONE TAKEN', pop01(t, P.t0 + 0.8, 0.3, 2.2) * (flip ? 1 + 0.15 * Math.max(0, 1 - (lt - 1.2) * 5) : 1), { size: 46, bg: flip ? RED : MINT, color: flip ? BONE : INK, rot: flip ? 0.06 : -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Smiled. | *You’re in the notebook now.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.3, 0.3, 2), 'loud chewer | “no offense” | guy', { head: 'THE NOTEBOOK', headBg: '#c2375a', size: 34, w: 330, rot: 0.04 })
      label(x, 800, 1100, 'NOTED.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sag doesn’t mind. | *Sag invented it.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'no offense, but | your shoes?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      label(x, 800, 990, '© SAGITTARIUS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: '“Noted.” | *Next item on the agenda.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), '1. “no offense” | 2. budget | 3. lunch', { head: 'AGENDA', headBg: BONE, size: 32, w: 340, font: MONO, weight: 700, rot: -0.03, strike: lt > 1.0 ? [0] : [] })
      label(x, 800, 1090, 'MOVING ON.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Took it as | *a compliment.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: L, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'wow, thank you!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      bits(x, 'trophy', 800, 960, 18 * pop01(t, P.t0 + 1.0, 0.3, 2))
      sparkles(x, t, 800, 960, P.t0 + 1.1, 8, 170, 0.4, [SKYB, BONE, GOLD])
    } },
  { sign: 'pisces', cap: 'Cried for a week. | *Then said sorry to you.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 2, look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'sorry for | being offended', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      label(x, 800, 980, 'DAY 7', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0472', key: 'E', accent: ACC, ending: 'group',
  title: '“No offense, but…” | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'No offense, but… | *we’re all like this.*',
    draw(x, t, lt) {
      bubble(x, 540, 720, 'none taken.', pop01(t, t - lt + 1.8, 0.3, 2.2), { size: 44, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
