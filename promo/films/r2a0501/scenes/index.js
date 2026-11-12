// r2a0501: star_advice, ADVICE SOLO (aries), "Aries, protect | your peace." (signs3kit social cut, music: lofi · D).
// Nine cards: a relatable Aries truth + a warm reframe, one gag each: walk sometimes · not every fight is yours ·
// let someone else drive · rest is refuelling · say no, the couch says yes · your fire is a gift, not an alarm ·
// mute the group chat · blanket, tea, done · a new match: go slow.
// Ending: group ("Your peace | is the win.").
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, swapLabel, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8a5a', ST = { x: -180 }, SG = 'aries'

const CAMEOS = [
  { sign: SG, cap: 'You sprint everywhere. | *Walk* sometimes.', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [0.25, 0.5, 0.75, 1.0],
    front(x, t, lt, P) {
      swapLabel(x, 790, 820, lt, 1.2, 'SPEED: 4x', 'SPEED: 1x', { size: 44, fromBg: RED, toBg: MINT })
      L(x, 790, 1040, 'NICE VIEW, HUH?', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Not every fight | is *yours* to win.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const down = ease.inOutCubic(prog(lt, 0.9, 1.4))
      bits(x, 'GLOVE', 800, lerp(800, 1000, down), 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(-0.2, 0.9, down) })
      L(x, 800, 650, 'GLOVES OFF', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 40)
    } },
  { sign: SG, cap: 'You always lead. | Let someone *else drive.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 800, 930, 200, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 22 })
      bits(x, 'MAP', 800, 690, 19 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.06 })
      L(x, 800, 1120, 'PASSENGER SEAT: YOURS', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: SG, cap: 'Rest isn’t *losing.* | It’s refuelling.', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        bits(x, 'BATT', 800, 850, 22 * k)
        const p = clamp((lt - 0.4) / 1.6)
        x.save(); x.fillStyle = MINT; const w = 22 * 10 * p; x.fillRect(800 - 22 * 5.5, 850 - 22 * 1.5, w * k, 22 * 3 * k); x.restore()
      }
      zzz(x, t, 440, 700)
      L(x, 800, 1070, lt > 2.0 ? 'FULL. GO GET ’EM.' : 'CHARGING…', pop01(t, P.t0 + 0.6, 0.3, 2.4), lt > 2.0 ? GOLD : MINT, -0.04, 34)
    } },
  { sign: SG, cap: 'Say *no* to plans. | Your couch says yes.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    back(x, t, lt, P) { bits(x, 'COUCH', 790, 1000, 28 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 700, 920, 10 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.2 })
      bubble(x, 790, 680, 'no thanks! ♡', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 860, 1180, 'yes.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
    } },
  { sign: SG, cap: 'Your fire is *a gift.* | Not an alarm.', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fl = 1 + 0.06 * Math.sin(t * 9)
      bits(x, 'CANDLE', 800, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: fl })
      L(x, 800, 1110, 'COZY, NOT CHAOS', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 800, 760, P.t0 + 1.3, 6, 140, 0.4)
    } },
  { sign: SG, cap: 'Mute the group chat. | *Peace* unlocked.', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const n = Math.min(99, Math.floor(clamp((lt - 0.2) / 1.0) * 99))
      if (lt < 1.3) bubble(x, 790, 820, `GROUP CHAT: ${n}+`, pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      else L(x, 790, 820, 'MUTED. ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 48)
      if (lt > 1.4) hearts(x, t, 560, 860, P.t0 + 1.4, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 5 })
    } },
  { sign: SG, cap: 'Hard day? | Blanket. *Tea.* Done.', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      bits(x, 'BLANKET', F.x, F.cy + 90, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'MUG', 800, 920, 18 * pop01(t, P.t0 + 0.6, 0.3, 2)); steam(x, t, 780, 840, { n: 2 })
      L(x, 800, 690, 'PEACE MODE', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 36)
    } },
  { sign: SG, cap: 'New match? | Go *slow.* It’s allowed.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ♈︎', headCol: PINK, lines: [['coffee sunday?', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['perfect. no rush', BONE, pop01(t, P.t0 + 1.2, 0.25, 2.2), true]], size: 22 })
      hearts(x, t, 790, 640, P.t0 + 1.4, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0501', key: 'D', accent: ACC, solo: SG, ending: 'group',
  title: 'Aries, protect | *your peace.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'taurus', chip: 'ALIGNED' },
  group: {
    cap: 'Your peace | *is the win.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
