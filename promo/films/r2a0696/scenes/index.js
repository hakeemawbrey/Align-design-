// r2a0696: star_advice, ADVICE SOLO (taurus), "Taurus, you can | *say no.*" (signs3kit social cut, music: lofi · D)
// One sign (solo, 9 cards): a relatable Taurus truth + a warm reframe, one gag each. Ending: callback.
//   yes again → "no." is a full sentence · a couch day is a real plan · stubborn? or just sure · the third favour
//   (box tower) → rest counts · no reply owed at midnight · no to them = yes to you (watering their own flower)
//   · slow still arrives (a snail with a map) · your snacks can stay yours · the right people hear no and stay
//   group "Soft heart. | *Firm no.*"   last "Tonight’s plan? | *Still the couch.*" (card 2's couch comes back)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, zzz, swapLabel, friend, RED, CREAM, STEEL, clamp, ease, prog, lerp } from './props.js'

const S = 'taurus', ST = { x: -190 }, ACC = '#7ed38a'
const SNAIL = ['......SSSS....', '....SSHHHHS...', '...SHHSSSHHS..', '...SHSHHHSHS..', '...SHSHSSHHS..', '...SHHSSHHS..K', '....SSHHHS..KK', 'BBBBBBBBBBBBBB', '.BBBBBBBBBBBB.']
const SNAIL_C = { S: '#8a4a2e', H: '#e8b36a', B: '#b5d98a', K: INK }

const CAMEOS = [
  { sign: S, cap: 'Said yes again? | *“No” is a full sentence.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'can you cover | my shift?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'br', col: LAV })
      bubble(x, 760, 900, lt < 1.1 ? 'sure…' : 'no.', pop01(t, P.t0 + (lt < 1.1 ? 0.6 : 1.1), 0.25, 2.4), { size: lt < 1.1 ? 44 : 76, tail: 'bl', col: lt < 1.1 ? BONE : '#7ed38a' })
      L(x, 790, 1120, 'NO EXPLANATION', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'A couch day | is *a real plan.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: { x: -200, y: 20 },
    back(x, t, lt, P) { bits(x, 'COUCH', 350, 1000, 30 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      sheet(x, 790, 790, pop01(t, P.t0 + 0.4, 0.3, 2), { w: 280, h: 260, head: 'SATURDAY', headBg: '#3a6a5a', lines: ['9am: couch', '1pm: couch', ['6pm: couch ♡', '#3a8a4a']], size: 30, progress: clamp((lt - 0.5) / 0.9) })
      L(x, 790, 1080, 'BOOKED SOLID', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Not stubborn. | *Just sure.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'change your | mind?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'br', col: LAV })
      drawBits(x, ['..RRRRRR..', '.RRWRRRRR.', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR', '.RRRRRRRR.'], { R: STEEL, W: '#d8dbe8' }, 790, 900, 22 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 790, 1110, 'MIND: A ROCK', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Third favour this week? | *Rest counts too.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(clamp((lt - 0.2) / 0.9) * 4))
      for (let i = 0; i < n; i++) bits(x, 'BOX', 790 + (i % 2 ? 14 : -10), 1060 - i * 110, 22, { rot: (i % 2 ? 0.04 : -0.03) })
      bubble(x, 600, 640, 'one more?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'br', col: LAV })
      if (lt > 1.4) L(x, 790, 1160, 'BREAK: TAKEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Midnight texts | *can wait till morning.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '11:58 PM', headCol: LAV, size: 26, lines: [['u up?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), false], ['quick q', BONE, pop01(t, P.t0 + 0.8, 0.25, 2), false]] })
      zzz(x, t, 420, 700, { size: 44 })
      L(x, 790, 1120, 'DO NOT DISTURB', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'No to them | is *yes to you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = clamp((lt - 0.4) / 1.2)
      bits(x, 'FLOWER', 790, 980 - 30 * g, (14 + 10 * g) * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 650, 'WATERING: ME', pop01(t, P.t0 + 0.7, 0.3, 2.2), ACC, 0.05, 34)
      sparkles(x, t, 790, 900, P.t0 + 1.6, 6, 150, 0.5)
    } },
  { sign: S, cap: 'Slow? | *You still arrive.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, 700 + 140 * clamp(lt / 2.4), 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'ETA: WORTH IT', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Your snacks | *can stay your snacks.*', mood: lt => lt > 1.1 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'can I have one?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'br', col: LAV })
      L(x, 790, 1110, 'MINE. KINDLY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'The right people | *hear no and stay.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 790, 930, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'happy', look: [-1, 0], seed: 12 })
      bubble(x, 790, 660, 'no worries ♡', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bc' })
      hearts(x, t, 570, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0696', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Taurus, you can | *say no.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Firm no.*', mood: 'sparkle' },
  last: {
    text: 'Tonight’s plan? | *Still the couch.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      bits(x, 'COUCH', 540, 1180, 40 * k)
      if (k > 0.01) signChar(x, t, S, 540, 1070, 240 * k, { mood: lt > 1.4 ? 'sleepy' : 'happy', seed: 44, hops: [t - lt + 0.9] })
      if (lt > 1.4) zzz(x, t, 640, 900, { size: 48, alpha: clamp(lt - 1.4) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
