// r2a0697: star_advice, ADVICE SOLO (leo), "What a Leo | *won't say out loud.*" (signs3kit social cut, music: lofi · F)
// One sign (solo, 9 cards): something a Leo won't say + a warm reframe, one gag each. Ending: callback.
//   save them a front-row seat · compliments recharge them (battery) · being the fun one is tiring (party hat droops)
//   · they remember who clapped first · they check if you saw it · the crown gets heavy · big laugh, soft heart
//   · they want to be picked first · they need a hype person too (megaphone)
//   group "Loud outside. | *Soft inside.*"   last "One compliment later: | *fully charged.*" (card 2's battery, full)
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, confetti, RED, CREAM, STEEL, NIGHT, clamp, ease, prog, lerp } from './props.js'

const S = 'leo', ST = { x: -190 }, ACC = '#ffb34a'
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const HAT = ['....P....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPPP..', '.PPPPYPP.', '.PPYPPPP.', 'PPPPPPPPP']
const SEAT = ['RRRRRRRR', 'RPPPPPPR', 'RPPPPPPR', 'RPPPPPPR', 'RRRRRRRR', 'RRRRRRRR', 'K......K', 'K......K']
/** a battery that fills 0…1 */
function battery(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -60, 240, 120); x.fillRect(120, -24, 22, 48)
  x.fillStyle = BONE; x.fillRect(-110, -50, 220, 100); x.fillRect(120, -16, 14, 32)
  x.fillStyle = NIGHT; x.fillRect(-100, -40, 200, 80)
  const n = Math.round(clamp(f) * 5)
  for (let i = 0; i < n; i++) { x.fillStyle = n >= 5 ? MINT : n >= 3 ? GOLD : RED; x.fillRect(-94 + i * 39, -34, 33, 68) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'They want you there. | *Front row, please.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SEAT, { R: RED, P: '#ff6b7a', K: INK }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'RESERVED: YOU', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.05, 36)
      bubble(x, 790, 1110, 'no pressure!! (pls)', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Compliments | *recharge them.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'love that on you', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'br', col: LAV })
      battery(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 0.9 ? 0.2 : 0.2 + clamp((lt - 0.9) / 0.7) * 0.8)
      if (lt > 1.6) L(x, 790, 1080, 'CHARGED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Being the fun one | *is tiring too.*', mood: lt => lt > 1.0 ? 'sleepy' : 'sparkle', star: ST,
    front(x, t, lt, P, F) {
      const droop = clamp((lt - 0.9) / 0.6)
      drawBits(x, HAT, { P: PINK, Y: GOLD }, F.x + 10 + droop * 50, F.top - 40 + droop * 30, 11 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: droop * 1.1 })
      L(x, 790, 760, lt < 1.0 ? 'PARTY MODE' : 'OFF DUTY', 1, lt < 1.0 ? PINK : LAV, 0.05, 38)
      bubble(x, 790, 1010, 'quiet night? ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'They remember | *who clapped first.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 800, 960, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'sparkle', look: [-1, 0], hops: [P.t0 + 0.6, P.t0 + 0.9, P.t0 + 1.2] })
      bubble(x, 800, 690, 'clap clap clap', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      L(x, 800, 1150, 'FAN #1: FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'They check | *if you saw it.*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW PHOTO', headCol: ACC, size: 26, lines: [['did u see?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['…did u?', BONE, pop01(t, P.t0 + 1.0, 0.25, 2), true], ['STUNNING ♡', MINT, pop01(t, P.t0 + 1.6, 0.25, 2), false]] })
    } },
  { sign: S, cap: 'The crown gets heavy. | *Help them hold it.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), big = lerp(1, 1.5, clamp((lt - 0.3) / 0.8))
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 26 - (lt > 1.3 ? 20 : 0), 14 * big * k, { rot: lt > 1.3 ? 0 : 0.08 })
      if (lt > 1.3) friend(x, t, 'cancer', 620, 760, 160, pop01(t, P.t0 + 1.3, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 9 })
      L(x, 790, 1100, lt > 1.3 ? 'SHARED LOAD ♡' : 'HEAVY', 1, lt > 1.3 ? MINT : STEEL, 0.04, 34)
    } },
  { sign: S, cap: 'Big laugh. | *Soft heart.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.8],
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) L(x, 740 + i * 110, 690 + i * 50, 'HA!', pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2.4), [GOLD, ACC][i], (i - 0.5) * 0.2, 54)
      bits(x, 'HEARTB', 790, 990, 22 * pop01(t, P.t0 + 1.2, 0.35, 2))
    } },
  { sign: S, cap: 'They want to be | *picked first.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'MY TEAM', headBg: '#3a6a5a', lines: [['1. LEO ♡', '#c9701a'], '2. …', '3. …'], size: 36, progress: clamp((lt - 0.5) / 0.8) })
      sparkles(x, t, 790, 820, P.t0 + 1.3, 7, 180, 0.6)
    } },
  { sign: S, cap: 'They need a hype person | *too.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'aquarius', 800, 960, 190, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'sparkle', look: [-1, 0], hops: [P.t0 + 0.8, P.t0 + 1.3] })
      bits(x, 'MEGA', 700, 900, 12 * pop01(t, P.t0 + 0.4, 0.3, 2), { sx: -1 })
      bubble(x, 760, 680, 'GO LEO!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, tail: 'br' })
      confetti(x, t, 560, 880, P.t0 + 1.1)
    } },
]

const F = makeFilm({
  id: 'r2a0697', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'What a Leo won’t | *say out loud.*',
  cameos: CAMEOS,
  group: { cap: 'Loud outside. | *Soft inside.*', mood: 'heart' },
  last: {
    text: 'One compliment later: | *fully charged.*',
    draw(x, t, lt) {
      battery(x, 540, 1120, 2.1 * pop01(t, t - lt + 0.4, 0.35, 2), 0.2 + clamp((lt - 0.8) / 0.8) * 0.8)
      sparkles(x, t, 540, 1120, t - lt + 1.7, 8, 300, 0.3)
      label(x, 540, 1380, 'THANK YOU ♡', pop01(t, t - lt + 1.8, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
