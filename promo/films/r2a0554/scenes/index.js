// r2a0554: star_advice ADVICE ROLLCALL, "Each sign's | study style." (signs3kit social cut, music: lofi · E). Ending: group.
//   One warm, specific study tip per sign, each with a light visual gag:
//   ♈ sprints + breaks · ♉ snacks, then slow and steady · ♊ teach it to a friend · ♋ cozy corner · ♌ study out loud
//   · ♍ colour-coded notes and sleep · ♎ pretty notes are valid · ♏ deep dives, surface for air · ♐ learn by doing
//   · ♑ leave room for rest · ♒ trust the weird method · ♓ mind drifted, bring it back gently (tears: sad playlist).
//   group: "Different methods. | Same bright minds."
import { makeFilm, sparkles, hearts, bubble, notes, drawBits, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Study in sprints. | *Breaks count too.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.3) swapLabel(x, 800, 1060, lt, 1.2, '25 MIN: GO!', '5 MIN: BREATHE', { size: 32, fromBg: RED, toBg: MINT })
    } },
  { sign: 'taurus', cap: 'Snacks first. | Then *slow and steady.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'COOKIE', 800, 740, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1080, 'FUEL: LOADED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Teach it to a friend. | *It sticks.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 840, 960, 140, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: lt > 1.3 ? 'sparkle' : 'wide', look: [-1, 0], seed: 54 })
      bubble(x, 800, 690, 'SO basically…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1110, 'MEMORY: LOCKED IN', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Cozy corner, soft blanket. | *Brain unlocked.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'MUG', 800, 760, 10 * pop01(t, P.t0 + 0.6, 0.3, 2)); steam(x, t, 795, 720, { n: 2, h: 70 })
      L(x, 800, 1080, 'COMFORT: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Study out loud. | *Your notes, performed.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'AND THE CELL WALL…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: GOLD, tail: 'bl' })
      notes(x, t, 820, 960, { n: 4, cell: 7, col: GOLD, seed: 5 })
      L(x, 800, 1070, 'GRADE: STANDING O', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Color-coded notes help. | *So does sleep.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 290, head: 'NOTES', headBg: MINT, headInk: INK, lines: [['■ facts', '#e23d4e'], ['■ dates', '#2f8a48'], ['■ vibes', '#6b62a8']], size: 30, align: 'left' })
      if (lt > 1.4) zzz(x, t, 900, 720)
      L(x, 800, 1080, 'BEDTIME: ALSO A PLAN', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 28)
    } },
  { sign: 'libra', cap: 'Pretty notes are valid. | *They work.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, bg: '#ffe7f0', lines: ['✿ chapter 3 ✿', '~ photosynthesis ~'], size: 28, ink: '#6b2a5a' })
      bits(x, 'PEN', 880, 960, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.4 })
      L(x, 800, 1090, 'AESTHETIC & ACADEMIC', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Deep dives are your gift. | *Surface for air.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'BOOK', 800 + (i % 2) * 14, 980 - i * 64, 12 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      L(x, 800, 680, 'TABS OPEN: 40', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, 0.05, 30)
      L(x, 800, 1100, 'BREAK: SCHEDULED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Learn by doing. | *Go see it* for real.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 840, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1070, 'CLASSROOM: OUTSIDE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'You plan the whole week. | *Plan rest too.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, head: 'PLANNER', headBg: STEEL, headInk: INK, lines: ['MON–FRI: study', 'SAT: ???'], size: 30, align: 'left' })
      if (lt > 0.3) swapLabel(x, 800, 1070, lt, 1.2, 'SAT: STUDY', 'SAT: REST', { size: 34, toBg: MINT })
    } },
  { sign: 'aquarius', cap: 'Your odd method works. | *Trust it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 830, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 7) * 0.05 })
      L(x, 800, 660, 'FLASHCARDS 3.0', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, 0.05, 30)
      L(x, 800, 1070, 'RESULTS: GREAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Mind drifted? | *Bring it back gently.*', mood: 'wide', tears: lt => lt < 1.4 ? 2 : 1, look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      notes(x, t, 800, 760, { n: 4, cell: 7, col: LAV, seed: 6 })
      if (lt > 0.3) swapLabel(x, 800, 920, lt, 1.3, 'PLAYLIST: TOO SAD', 'PLAYLIST: LOFI', { size: 30, fromBg: SKYB, toBg: MINT })
      L(x, 800, 1090, 'FOCUS: RETURNING', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0554', key: 'E', accent: ACC, ending: 'group',
  title: 'Each sign’s | *study style.*',
  cameos: CAMEOS,
  group: { cap: 'Different methods. | *Same bright minds.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
