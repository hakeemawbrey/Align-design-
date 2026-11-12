// r2a0565: star_advice, ADVICE ROLLCALL, "How each sign | *learns best.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, one warm, specific line each about how they learn, with a light visual gag.
// Ending: group (the group beat is the warm punchline).
//   ♈ learns by doing, manual unopened · ♉ takes it slow, never forgets (a sprout grows) · ♊ three things at once
//   · ♋ with a kind friend · ♌ fastest by teaching · ♍ at a very tidy desk · ♎ in a study group
//   · ♏ goes deep, footnotes included · ♐ on the road, every trip is class · ♑ with a plan and a deadline
//   · ♒ by asking "but why?" · ♓ through stories (cried at the ending)
//   group "Every brain | *is a good brain.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, phone, calendar, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = MINT
const PENCIL = ['......PP', '.....YYP', '....YYY.', '...YYY..', '..YYY...', '.YYY....', 'WYY.....', 'K.......']
const PENCIL_C = { P: PINK, Y: GOLD, W: '#e8c9a0', K: INK }
const MAP = ['GGGBBBBBGG', 'GGBBBGGBBB', 'BBBGGGGBBB', 'BBGGGGGGBB', 'BBBGGGBBBB', 'GBBBBBBBGG']
const MAP_C = { G: '#5fd068', B: '#6fc3ff' }

const CAMEOS = [
  { sign: 'aries', cap: 'Learns by doing. | *Manual: unopened.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bits(x, 'book', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 900, 'SEALED', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 34, bg: RED, color: PAPER, rot: -0.12, font: MONO, weight: 700 })
      label(x, 800, 690, 'BUILT IT ANYWAY ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Takes it slow. | Then *never forgets.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'plant', 800, 940, (10 + 16 * ease.outCubic(prog(lt, 0.2, 1.8))) * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1110, 'ROOTS: DEEP', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Learns three things | *at once.* Somehow.', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'book', 720, 830, 14 * k, { rot: -0.2 }); bits(x, 'book', 870, 800, 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.15 }); bits(x, 'book', 800, 980, 14 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: 0.05 })
      label(x, 800, 1120, 'FRENCH · CHESS · CAKES', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 26, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Learns best | *with a kind friend.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 790, 990, 190 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 790, 720, 'you’ve got | this.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      hearts(x, t, 580, 860, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Learns fastest | *by teaching.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = '#2a5a3e'; x.fillRect(-160, -110, 320, 220)
        x.fillStyle = BONE; x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TODAY:', 0, -50); x.fillText('ME, TEACHING', 0, 10); x.fillText('YOU', 0, 60)
        x.restore()
      }
      label(x, 800, 1090, 'CLASS: GATHER ROUND', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Learns best | at *a very tidy desk.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(620, 1000, 360, 30); x.fillStyle = WOOD; x.fillRect(626, 1004, 348, 20); x.restore()
      for (let i = 0; i < 4; i++) drawBits(x, PENCIL, { ...PENCIL_C, Y: [GOLD, PINK, SKYB, MINT][i] }, 690 + i * 74, 930, 12 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2), { rot: -0.785 })
      label(x, 800, 760, 'PENCILS: ALIGNED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Learns best | *in a study group.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'gemini', 680, 1000, 130 * k, { mood: 'sparkle', look: [-1, 0], seed: 31, glyph: false }); signChar(x, t, 'aquarius', 795, 1000, 130 * k, { mood: 'happy', look: [-1, 0], seed: 32, glyph: false }); signChar(x, t, 'taurus', 905, 1000, 120 * k, { mood: 'sleepy', seed: 33, glyph: false }) }
      bubble(x, 820, 740, 'snacks first, | then chapter 4', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Goes deep. | *Footnotes included.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const pg = Math.round(lerp(12, 412, clamp((lt - 0.3) / 1.5)))
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), `page ${pg} | *see note 87 | **see note 88`, { head: 'THE DEEP DIVE', headBg: '#c97bff', size: 32, w: 320, rot: -0.04 })
      label(x, 790, 1110, 'ASSIGNED: 10 PAGES', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Learns on the road. | *Every trip is class.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      drawBits(x, MAP, MAP_C, 800, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 800, 1070, 'CLASSROOM: EVERYWHERE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 860, 680, '✦ YOU ARE HERE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 26, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Learns with a plan | *and a deadline.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      calendar(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'EXAM IN', lt > 1.2 ? 'READY' : '30 DAYS', { topBg: '#2fc79a' })
      label(x, 800, 1080, 'DAY 1: ALREADY DONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Learns by asking | *“but why?”*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.4))
      bubble(x, 790, 760, ['but why?', 'but WHY?', 'okay but | why that?', 'ohhh. | got it.'][n - 1], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      label(x, 790, 1000, `QUESTIONS: ${n * 7}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Learns through stories. | *Cried at the ending.*', mood: 'wide', tears: lt => lt < 1.1 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'book', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'HISTORY, CHAPTER 9', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'REMEMBERS ALL OF IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0565', key: 'G', accent: ACC, ending: 'group',
  title: 'How each sign | *learns best.*',
  cameos: CAMEOS,
  group: { cap: 'Every brain | *is a good brain.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
