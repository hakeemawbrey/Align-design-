// r2a0564: star_advice, ADVICE ROLLCALL, "How each sign | *picks a partner.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, one warm, specific line each about what they look for, with a light visual gag.
// Ending: card (lesson, then the last line over the Libra + Virgo match card: Virgo books the table Libra can't pick).
//   ♈ someone who can keep up · ♉ someone who shares dessert · ♊ someone who keeps them curious · ♋ someone who feels like home
//   · ♌ someone who claps the loudest · ♍ someone who notices the details · ♎ someone who picks the restaurant
//   · ♏ someone they can trust completely · ♐ someone who says yes to the trip · ♑ someone who shows up, on time
//   · ♒ someone who gets the weird stuff · ♓ someone who cries at the same scenes
//   group "Everyone wants | *to be chosen.*"   lesson "The right one fits | *who you already are.*"   last "Libra’s match? | *Picked the table.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, phone, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = PINK
const SHOE = ['......RRR..', '.....RRWR..', 'RRRRRRRRRR.', 'RWRRRRRRRRR', 'WWWWWWWWWWW']
const SHOE_C = { R: '#ff6b5a', W: PAPER }
const FORK = ['W.W.W', 'W.W.W', 'WWWWW', '.WWW.', '..W..', '..W..', '..W..', '..W..']

const CAMEOS = [
  { sign: 'aries', cap: 'Someone who | *can keep up.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHOE, SHOE_C, 730, 960, 16 * k); drawBits(x, SHOE, { R: SKYB, W: PAPER }, 870, 960, 16 * k)
      label(x, 800, 760, 'PACE: MATCHED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Someone who | *shares dessert.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'cake', 800, 960, 24 * k)
      drawBits(x, FORK, { W: '#dfe3ee' }, 680, 820, 14 * k, { rot: -0.4 }); drawBits(x, FORK, { W: '#dfe3ee' }, 920, 820, 14 * k, { rot: 0.4 })
      label(x, 800, 1110, 'THE LAST BITE, EVEN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Someone who | *keeps them curious.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.5))
      bubble(x, 790, 760, ['wait, tell me | more', 'and THEN?', 'okay one more | question'][Math.min(2, n)], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1000, `TOPICS: ${12 + n * 9}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Someone who | *feels like home.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'house', 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1110, 'SLIPPERS: PROVIDED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Someone who | *claps the loudest.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      label(x, 800, 760, 'BIGGEST FAN', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04 })
      bubble(x, 800, 960, 'CLAP CLAP | CLAP!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: '#ffcf8a', tail: 'bl' })
      sparkles(x, t, 800, 860, P.t0 + 1.0, 8, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Someone who | *notices the details.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '4:02', head: 'NEW MESSAGE', msg: 'got your tea. | oat milk, | not too hot.', bg: MINT, size: 28 })
      label(x, 800, 1110, 'REMEMBERED. SWOON.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Someone who | *picks the restaurant.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 720, lt > 1.3 ? 'oh thank | goodness' : 'you pick? | no, you pick', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 980, lt > 1.3 ? 'TABLE: BOOKED ✓' : 'MENUS: 14', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: lt > 1.3 ? MINT : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Someone they can | *trust completely.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'key', 800, 860, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 700, 'SPARE KEY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1040, '(AFTER 3 YEARS)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Someone who | *says yes to the trip.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'suitcase', 730, 960, 20 * k); bits(x, 'suitcase', 880, 960, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      bubble(x, 800, 720, 'leaving when?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1110, 'PACKED: BOTH', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Someone who | *shows up on time.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      label(x, 800, 820, '7:00', pop01(t, P.t0 + 0.2, 0.35, 2), { size: 110, bg: PAPER, rot: -0.03, font: MONO, weight: 700 })
      label(x, 800, 1060, 'NOT 7:01.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Someone who | *gets the weird stuff.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you ALSO collect | old maps?!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      label(x, 790, 980, 'COMPATIBILITY: ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 190, 0.6)
    } },
  { sign: 'pisces', cap: 'Someone who cries | at *the same scenes.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt < 1.2 ? 2 : 3, look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 790, 990, 200 * k, { mood: 'wide', look: [-1, 0], seed: 19, glyph: false, tears: 2 })
      bubble(x, 790, 700, 'you’re crying | TOO?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0564', key: 'E', accent: ACC, ending: 'card',
  title: 'How each sign | *picks a partner.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'virgo', chip: 'ALIGNED' },
  group: { cap: 'Everyone wants | *to be chosen.*' },
  lesson: { text: 'The right one fits | *who you already are.*', chip: 'STATUS: CHOSEN' },
  last: { text: 'Libra’s match? | *Picked the table.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
