// r2t0584: star_talk, BELIKE, "Zodiacs staying awake | in a movie *be like.*" (signs3kit social cut, music: lofi · D).
// Twelve signs in zodiac order, each one's most extreme attempt to stay awake through a film. Ending: group (everyone
// asleep, the movie still playing).
//   ♈ asleep in four minutes, says they saw it all · ♉ ate the popcorn to stay awake, then napped · ♊ kept talking to stay
//   awake, missed the movie · ♋ blanket on, gone by the opening credits · ♌ "I was resting my eyes" · ♍ an alarm every ten
//   minutes · ♎ paused it nine times · ♏ eyes open, fully asleep · ♐ walked to wake up, missed the twist · ♑ took notes
//   · ♒ wide awake, listing plot holes · ♓ slept through it, still woke up crying
//   group "Movie: still playing. | *Audience: asleep.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, zzz, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = LAV, ST = { x: -170 }
const POP = ['.W.WW.W.', 'WWWWWWWW', '.WYWWYW.', 'RRWRRWRR', 'RRWRRWRR', '.RWRRWR.', '.RWRRWR.', '..RRRR..']
const POPC = { W: CREAM, Y: '#ffe76a', R: RED }
const sleepy = (a, b = 99) => lt => lt > a && lt < b ? 'sleepy' : 'neutral'

const CAMEOS = [
  { sign: 'aries', cap: 'Asleep in four minutes. | *“Saw the whole thing.”*', mood: lt => lt < 0.8 ? 'sleepy' : lt < 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      if (lt < 0.8) zzz(x, t, 480, 720)
      L(x, 790, 760, 'ASLEEP AT 0:04', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 34)
      bubble(x, 790, 990, 'great ending!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: '#ff8a7a', tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Ate popcorn to stay awake. | *Then napped.*', mood: sleepy(1.2), look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const left = 1 - prog(lt, 0.2, 1.1)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, left > 0.05 ? POP : POP.map((r, j) => j < 3 ? r.replace(/[WY]/g, '.') : r), POPC, 800, 930, 28 * k)
      L(x, 800, 690, `POPCORN: ${Math.round(left * 100)}%`, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 32)
      if (lt > 1.2) zzz(x, t, 470, 720)
    } },
  { sign: 'gemini', cap: 'Kept talking to stay awake. | *Missed the movie.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['wait who’s that', 'is he the dad?', 'fun fact—', 'ok ok shh', 'anyway so'], n = Math.min(4, Math.floor(lt / 0.35))
      for (let i = 0; i <= n; i++) bubble(x, 760 + (i % 2) * 60, 640 + i * 105, W[i], 1, { size: 30, tail: i % 2 ? 'br' : 'bl' })
      L(x, 800, 1170, 'PLOT: UNKNOWN', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Got cosy in a blanket. | *Gone by the credits.*', mood: sleepy(0.8), look: [1, 0], star: { x: -170, y: 20 },
    front(x, t, lt, P, F) {
      bits(x, 'BLANKET', F.x, F.cy + 140, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (lt > 0.8) zzz(x, t, 480, 700)
      L(x, 790, 760, 'OPENING CREDITS', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, 0.04, 30)
      L(x, 790, 860, 'CANCER: GONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Fell asleep. | *Denied it loudly.*', mood: lt => lt < 0.8 ? 'sleepy' : 'wide', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      if (lt < 0.8) zzz(x, t, 480, 720)
      bubble(x, 800, 800, 'I was RESTING | my EYES', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: '#ffb34a', tail: 'bl' })
      L(x, 800, 1060, 'SNORING: CONFIRMED', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Set an alarm | *every ten minutes.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      const ringing = Math.floor(lt * 2) % 2
      phone(x, t, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'ALARMS', headCol: MINT, rot: 0.05 + (ringing ? Math.sin(t * 40) * 0.04 : 0), lines: [['8:10 ✓', BONE, 1], ['8:20 ✓', BONE, 1], ['8:30 ✓', BONE, 1], ['8:40 …', GOLD, 1]], size: 26 })
      L(x, 800, 1140, 'AWAKE. FURIOUS.', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Paused it for snacks. | *Nine times.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const n = 1 + Math.min(8, Math.floor(Math.max(0, lt - 0.3) / 0.18))
      label(x, 800, 820, '❚❚', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 90, bg: BONE, rot: 0.03 })
      L(x, 800, 1010, `PAUSED: ${n}x`, pop01(t, P.t0 + 0.3, 0.3, 2), PINK, -0.04, 40)
      bubble(x, 800, 640, 'one sec!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Eyes wide open. | *Fully asleep.*', mood: 'neutral', look: [0, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt > 0.6) zzz(x, t, 500, 720)
      L(x, 790, 820, 'STATUS: ???', pop01(t, P.t0 + 0.6, 0.3, 2), '#c97bff', -0.04, 38)
      L(x, 790, 960, 'DO NOT DISTURB', pop01(t, P.t0 + 1.3, 0.3, 2.2), BONE, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Took a walk to wake up. | *Missed the twist.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.7, 1.0],
    front(x, t, lt, P) {
      L(x, 790, 760, 'BRB, LAPS', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 36)
      bubble(x, 790, 960, 'wait HE’S | the dad??', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Took notes | *to stay awake.*', mood: lt => lt > 1.5 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 320, head: 'MOVIE NOTES', headBg: STEEL, headInk: INK, lines: ['act 1: setup', 'act 2: drama', 'act 3: zzzzzzz'], size: 28, align: 'left', progress: prog(lt, 0.3, 1.5), rot: -0.04 })
      if (lt > 1.5) zzz(x, t, 480, 720)
    } },
  { sign: 'aquarius', cap: 'Wide awake. | *Listing the plot holes.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      sheet(x, 800, 880, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'PLOT HOLES', headBg: MINT, headInk: INK, lines: ['1. the boat', '2. why a map', '3. physics?'], size: 30, align: 'left', progress: prog(lt, 0.3, 1.3), rot: 0.04 })
      L(x, 800, 1140, 'EVERYONE ELSE: ASLEEP', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Slept through it. | *Still woke up crying.*', mood: lt => lt < 0.8 ? 'sleepy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 0.8) zzz(x, t, 480, 720)
      bubble(x, 800, 760, 'did the dog | make it??', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 800, 1010, '(THERE WAS NO DOG)', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0584', key: 'D', accent: ACC, ending: 'group',
  title: 'Zodiacs staying awake | in a movie *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Movie: still playing. | *Audience: asleep.*',
    moods: Array(12).fill('sleepy'),
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.8, 0.35, 2)
      bits(x, 'TV', 540, 660, 24 * k)
      zzz(x, t, 300, 1040, { alpha: clamp(lt - 1), size: 44 }); zzz(x, t, 760, 1040, { alpha: clamp(lt - 1.3), size: 44 })
      label(x, 540, 630, 'THE END', pop01(t, t - lt + 2.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
