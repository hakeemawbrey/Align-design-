// v3a135: ADVICE ROLL CALL, "Each sign's | best first message." (~54 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs, one warm tip each for messaging a new match, one gag each. Ending: group ("Be kind. | Hit send.").
//   ♈ just say hi, sent in 1 sec · ♉ ask about their best meal · ♊ one question, not seventeen · ♋ compliment something real
//   ♌ "enough about me" · ♍ send before the fifth edit · ♎ pick any opener · ♏ ask deep, share too
//   ♐ where would you fly tomorrow? · ♑ skip the interview · ♒ ask the weird question (cloud or rock?)
//   ♓ send the poem (a short one), crying
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, PAPER } from '../props.js'

const L = { x: -160 }
const CAMEOS = [
  { sign: 'aries', cap: 'Just say hi. | *Bravely.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.8],
    front(x, t, lt, P) {
      phone(x, 790, 800, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '✦', head: 'NEW MATCH', msg: 'hi! you | seem fun.', bg: PINK })
      label(x, 790, 1110, 'SENT IN: 1 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Ask about | *their favourite meal.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'best thing | you’ve ever eaten?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      bits(x, 'bowl', 790, 940, 18 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1110, 'CONVO: 3 HOURS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'One question. | *Not seventeen.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), 'Q1: how’s your day? | Q2: fave colour? | Q3: siblings? | Q4–Q17: …', { head: 'TO ASK', headBg: GOLD, size: 32, w: 400, strike: lt > 1.0 ? [1, 2, 3] : [] })
      label(x, 790, 1100, 'Q1 IS PLENTY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Compliment | *something real.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 800, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '✦', head: 'TO: NEW MATCH', msg: 'your dog looks | SO happy ♡', bg: SKYB })
      bubble(x, 790, 1110, 'he IS ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
  { sign: 'leo', cap: 'Ask about them | *first.* Shine later.', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'enough about me. | tell me about YOU.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 940, 'GROWTH ✦', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 50, bg: ORANGE, rot: -0.05 })
      sparkles(x, t, 790, 940, P.t0 + 1.2, 8, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Send it before | *the fifth edit.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const d = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.25))
      label(x, 790, 720, `DRAFT ${d}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 54, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'SENT ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 60, bg: MINT, rot: 0.05 })
    } },
  { sign: 'libra', cap: 'Pick an opener. | *Any opener.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'hey · hi · hello | hiya · heyy · yo', { head: 'OPENERS', headBg: PINK, size: 38, w: 400 })
      label(x, 790, 1040, 'JUST SEND ONE ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Ask something deep. | *Share something too.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'what makes you | feel at home?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 790, 900, 'for me: | rainy sundays.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      label(x, 790, 1100, 'OPEN: A LITTLE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: '#b07dff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Where would they go | *tomorrow?* Ask.', mood: 'sparkle', look: [1, -1], star: L, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'one ticket, | anywhere. where?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      bits(x, 'suitcase', 790, 980, 24 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.06 })
    } },
  { sign: 'capricorn', cap: 'Skip the interview. | *Be curious.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'job title? | five-year goals? | best song ever?', { head: 'QUESTIONS', headBg: MINT, size: 36, w: 400, strike: lt > 1.0 ? [0, 1] : [] })
      label(x, 790, 1080, 'MUCH BETTER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Your weird question? | *Ask it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'would you rather | be a cloud | or a rock?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 960, 'cloud. obviously.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'br', col: SKYB })
      label(x, 790, 1110, 'KINDRED SPIRIT', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Send the poem. | *A short one.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: lt => lt < 1.2 ? 1 : 2, star: L,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'roses are red, | you seem nice.', { head: 'POEM (SHORT)', headBg: LAV, size: 38, w: 400, font: 'Georgia, serif', weight: 400 })
      label(x, 790, 1020, 'ONLY 2 LINES!', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a135', key: 'C', accent: GOLD, ending: 'group',
  title: 'Each sign’s | *best first message.*',
  cameos: CAMEOS,
  group: {
    cap: 'Be kind. | *Hit send.*',
    draw(x, t, lt) { label(x, 540, 870, '✦ SENT ✦', pop01(t, t - lt + 1.6, 0.35, 2.4), { size: 56, bg: GOLD, rot: -0.04, font: MONO, weight: 700 }); hearts(x, t, 540, 820, t - lt + 1.8, { n: 8, life: 2.4, spread: 700, cell: 8, seed: 2 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
