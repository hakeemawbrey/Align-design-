// v3a139: ADVICE ROLL CALL, "How each sign | says I love you." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm line each: their way of saying it, one gag each. Ending: callback (Capricorn's invite: accepted).
//   ♈ says it first, day 3 · ♉ gives you the good pillow · ♊ in forty versions (ily, luv u…) · ♋ a handwritten note
//   ♌ shares the crown · ♍ remembers your allergies · ♎ matching flowers · ♏ says it once, means it forever
//   ♐ a postcard from somewhere · ♑ a calendar invite · ♒ in binary · ♓ says it, then sobs
//   49.2 "Different words. | *Same love.*"   52.6 "Cap’s invite? | *Accepted.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, PAPER, GREEN } from '../props.js'

const L = { x: -160 }
const CROWN = [['Y..Y..Y', 'YY.Y.YY', 'YYYYYYY', 'YRYPYRY', 'YYYYYYY'], { Y: GOLD, R: RED, P: PINK }]
const CAMEOS = [
  { sign: 'aries', cap: 'Says it first. | *Brave looks good on you.*', mood: 'heart', look: [1, 0], star: L, hops: [0.8],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I LOVE YOU!', pop01(t, P.t0 + 0.2, 0.25, 2.4), { size: 56, tail: 'bl' })
      label(x, 790, 920, 'DATE: 3', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: RED, color: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'me too ♡', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'br', col: LAV })
    } },
  { sign: 'taurus', cap: 'Gives you | *the good pillow.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'pillow', 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'THE GOOD ONE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 42, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'that’s love.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Says it | *every possible way.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 820, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '✦', head: 'MATCH · 6 MONTHS', msg: ['ily', 'luv u', 'love ya', 'adore u', 'ILY!!'][Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.35))], bg: GOLD, size: 40 })
    } },
  { sign: 'cancer', cap: 'Writes it down. | *By hand.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'envelope', 790, 660, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      note(x, 790, 900, pop01(t, P.t0 + 0.9, 0.3, 2), 'you’re my | favourite person.', { size: 38, w: 380, font: 'Georgia, serif', weight: 400, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Shares | *the crown.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CROWN[0], CROWN[1], 790, 800, 28 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1000, 'CO-ROYALTY ✦', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: ORANGE, rot: -0.04 })
      sparkles(x, t, 790, 800, P.t0 + 1.0, 8, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'Remembers | *your allergies.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'no nuts ✓ | no shellfish ✓ | extra love ✓', { head: 'YOUR ORDER', headBg: MINT, size: 36, w: 400 })
      label(x, 790, 1040, 'CHECKED TWICE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Brings flowers. | *Matching ones.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'flower', 730, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'flower', 850, 860, 20 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 1080, 'COLOUR-COORDINATED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Says it once. | *Means it forever.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 740, 'SAID: ONCE', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 48, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'MEANT: FOREVER', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: '#b07dff', rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1100, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: 'sagittarius', cap: 'Sends a postcard. | *From somewhere wild.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'wish you were | here. (come!)', { head: 'POSTCARD ✈', headBg: ORANGE, size: 40, w: 420, font: 'Georgia, serif', weight: 400, rot: -0.05 })
      label(x, 790, 1070, 'FROM: A VOLCANO', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Sends | *a calendar invite.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      calendar(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'INVITE', 'US ♡', { topBg: GREEN })
      label(x, 790, 1060, 'REPEATS: FOREVER', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Says it | *in binary.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 740, pop01(t, P.t0 + 0.2, 0.3, 2), '01001100 | 01001111 | 01010110…', { head: 'MESSAGE', headBg: SKYB, size: 34, w: 360, font: MONO, weight: 700 })
      label(x, 790, 1020, 'TRANSLATION: ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 42, bg: PINK, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Says it. | *Then sobs.*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 3, star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I love y—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 52, tail: 'bl', col: LAV })
      label(x, 790, 900, '*SOB*', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 52, bg: SKYB, rot: 0.06, font: MONO, weight: 700 })
      label(x, 790, 1060, 'SAID IT ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a139', key: 'G', accent: PINK, ending: 'callback',
  title: 'How each sign | *says I love you.*',
  cameos: CAMEOS,
  group: { cap: 'Different words. | *Same love.*' },
  last: {
    text: 'Cap’s invite? | *Accepted.*',
    draw(x, t, lt) {
      const t0 = t - lt
      calendar(x, 540, 1150, pop01(t, t0 + 0.6, 0.35, 2) * 1.2, 'INVITE', 'US ♡', { topBg: GREEN, rot: -0.03 })
      label(x, 540, 1400, 'ACCEPTED ✓', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 50, bg: MINT, rot: 0.04 })
      hearts(x, t, 540, 1100, t0 + 1.3, { n: 8, life: 2, spread: 500, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
