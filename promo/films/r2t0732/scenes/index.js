// r2t0732: star_talk, ROLLCALL, "The signs on | a *blind date.*" (signs3kit social cut, lofi · E). Ending: card.
//   ♈ showed up two hours early · ♉ date's late, already on dessert · ♊ swapped places with their twin
//   · ♋ asked about kids before the bread · ♌ brought a signed headshot · ♍ inspected the kitchen pre-date
//   · ♎ complimented the date for an hour · ♏ guessed your sign in one look · ♐ one story, ninety minutes
//   · ♑ asked for your five-year plan · ♒ wore a disguise to a blind date · ♓ fell in love at "hello"
//   group "Nobody stayed | *mysterious.*"  lesson "Show up as you. | The right one *notices.*"
//   last "Scorpio still | *saw through it.*" over the match card: Scorpio + Aquarius (the one-look guess meets the disguise)
import { makeFilm, sparkles, hearts, bubble, pop01, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Showed up early. | *Two hours* early.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 720, lt, 1.2, 'DATE AT: 8 P.M.', 'HERE SINCE: 6', { size: 34, fromBg: CREAM, toBg: '#ff6b5a' })
      L(x, 800, 1130, 'TABLE: WARMED UP', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Date’s running late? | Already *on dessert.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'CAKE', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'COURSE: 3 OF 3', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, -0.04, 34)
      bubble(x, 820, 1140, 'no rush!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Swapped places | with *their twin.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 810, 940, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'wink', look: [-1, 0], hops: [P.t0 + 1.1] })
      L(x, 810, 720, 'WAIT… WHICH ONE?', pop01(t, P.t0 + 1.0, 0.3, 2.2), STEEL, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Asked about kids | before *the bread.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BREAD', 800, 1060, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 740, 'how many kids? | names?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 920, 'NAMES: PICKED', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Brought a | *signed headshot.*', mood: 'sparkle', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'FRAME', 800, 910, 24 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
      L(x, 800, 1110, '“FOR YOU. XO, LEO”', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#ffb34a', -0.04, 30)
      sparkles(x, t, 800, 910, P.t0 + 1.1, 7, 150, 0.3)
    } },
  { sign: 'virgo', cap: 'Inspected the kitchen. | *Pre-date.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'KITCHEN CHECK', headBg: '#2fc79a', lines: ['forks: clean', 'sinks: clean', 'chef: nervous'], size: 30, progress: clamp((lt - 0.3) / 1.1) })
      L(x, 800, 1120, 'GRADE: A-', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.05, 36)
    } },
  { sign: 'libra', cap: 'Complimented the date. | *For an hour.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['your shoes!', 'your laugh!', 'your eyebrows!!', 'your fork grip!']
      bubble(x, 800, 760, W[Math.min(3, Math.floor(lt / 0.6))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 980, `COMPLIMENTS: ${Math.min(41, Math.floor(lt * 18))}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Guessed your sign. | *In one look.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'capricorn. | virgo moon.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 800, 960, '✓ CORRECT', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.05, 40)
    } },
  { sign: 'sagittarius', cap: 'Told one story. | *Ninety minutes.*', mood: 'sparkle', star: { x: 160 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bits(x, 'MAP', 320, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      bubble(x, 320, 720, '…and THEN, in Peru—', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'br' })
      L(x, 320, 1110, 'STORY TIME: 1H 30', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Asked for your | *five-year plan.*', mood: 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      sheet(x, 320, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 320, head: 'YOUR PLAN?', headBg: '#6b62a8', lines: ['year 1: ___', 'year 3: ___', 'year 5: ___'], size: 30 })
      L(x, 320, 1120, 'DUE: BY DESSERT', pop01(t, P.t0 + 1.4, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Wore a disguise. | To a *blind date.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'DISGUISE', F.x, F.cy + 10, 16 * pop01(t, P.t0 + 0.5, 0.3, 2.2))
      L(x, 800, 820, 'STATUS: INCOGNITO', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 32)
      bubble(x, 800, 1020, 'just in case', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Fell in love | at *“hello.”*', mood: lt => lt < 0.8 ? 'heart' : 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'hello!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      hearts(x, t, 820, 1120, P.t0 + 1.2, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 5 })
      L(x, 800, 960, 'WEDDING: PLANNED', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0732', key: 'E', accent: ACC, ending: 'card',
  title: 'The signs on | a *blind date.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'aquarius', chip: 'ALIGNED' },
  group: { cap: 'Nobody stayed | *mysterious.*' },
  lesson: { text: 'Show up as you. | The right one *notices.*', chip: 'MATCH: MADE' },
  last: {
    text: 'Scorpio still | *saw through it.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1040, t - lt + 1.4, 8, 240, 0.2) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
