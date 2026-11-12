// r2a0473: star_advice, ADVICE SOLO (capricorn), "A Capricorn’s | *bad-day needs.*" (topic: what Capricorns need on a bad day) (signs3kit social cut, music:
// lofi · C). One sign the whole way: nine kind things a Capricorn needs on a hard day, each a relatable truth + a warm
// reframe with one light gag. Ending: callback (the hidden emails are still hidden).
//   "I'm fine", bring snacks anyway · ask about them, not work · the list can wait · a quiet couch, zero pep talks
//   · a bad day isn't failing · their comfort show, episode one again · a match texts "proud of you" · hide the
//   emails · rest doesn't have to be earned.
//   group "Strong all day. | *Soft tonight.*"   last "And the emails? | *Still hidden.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, frame, calendar, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const ACC = '#7fd8be', S = 'capricorn', ST = { x: -190 }
const DRAWER = ['KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', 'KWWWWHHWWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']

const CAMEOS = [
  { sign: S, cap: '“I’m fine”? | *Bring snacks anyway.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      bits(x, 'cookie', 740, 960, 16 * k); bits(x, 'cookie', 860, 990, 16 * pop01(t, P.t0 + 0.6, 0.3, 2)); bits(x, 'cookie', 800, 880, 16 * pop01(t, P.t0 + 0.8, 0.3, 2))
      bubble(x, 800, 690, 'i’m fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 1120, 'SNACKS: DELIVERED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skip “how was work?” | Ask *how they are.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'how was w—', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (lt < 1.0 ? 1 : 0), { size: 40, tail: 'bl' })
      bubble(x, 800, 820, 'how are | YOU?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 50, col: MINT, tail: 'bl' })
      hearts(x, t, 560, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'The to-do list | *can wait till tomorrow.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), '☐ report | ☐ budget | ☐ everything', { head: 'TO DO', headBg: ACC, size: 34, w: 320, rot: 0.03 })
      label(x, 800, 1050, 'TOMORROW', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 52, bg: 'rgba(0,0,0,0)', color: RED, rot: -0.18, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A quiet couch. | *Zero pep talks.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'pillow', 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 720, 'PEP TALKS: 0', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A bad day | *isn’t a failed day.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      calendar(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'TUESDAY', lt > 1.2 ? 'OK' : 'BAD')
      label(x, 800, 1090, 'STILL COUNTS ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their comfort show. | *Episode one. Again.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      frame(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 280, 190, x => {
        x.fillStyle = '#2b2266'; x.fillRect(-140, -95, 280, 190)
        x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('S1 · E1', 0, -20)
        x.fillStyle = GOLD; x.fillText('▶ AGAIN', 0, 30)
      }, { col: SLATE })
      label(x, 800, 1100, 'WATCHED: LOTS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A text from their match: | *“proud of you.”*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:41', head: 'YOUR MATCH', msg: lt > 0.8 ? 'proud of | you ♥︎' : '…', bg: PINK, rot: -0.04 })
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 6, life: 1.6, spread: 200, cell: 6, seed: 6 })
    } },
  { sign: S, cap: 'Take the phone. | *Hide the emails.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.7, 1.3))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DRAWER, { K: INK, W: WOOD, H: GOLD }, 800, 1020, 26 * k)
      if (m < 1) bits(x, 'envelope', 800, 760 + m * 240, 18 * k, { alpha: 1 - m })
      label(x, 800, 700, 'INBOX: HIDDEN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rest isn’t a reward. | *They can just have it.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'moon', 820, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1060, 'REST: FREE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 820, 820, P.t0 + 1.1, 7, 150, 0.4, [BONE, GOLD, LAV])
    } },
]

const F = makeFilm({
  id: 'r2a0473', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'A Capricorn’s | *bad-day needs.*',
  cameos: CAMEOS,
  group: { cap: 'Strong all day. | *Soft tonight.*', mood: 'heart' },
  last: {
    text: 'And the emails? | *Still hidden.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 360, 1110, 240 * k, { mood: lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      drawBits(x, DRAWER, { K: INK, W: WOOD, H: GOLD }, 730, 1130, 24 * pop01(t, t - lt + 0.7, 0.35, 2))
      label(x, 730, 980, 'DO NOT OPEN ♥︎', pop01(t, t - lt + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 360, 960, t - lt + 1.6, { n: 5, life: 2.0, spread: 200, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
