// r2t0598: star_talk, BELIKE, "After a breakup? | *Zodiacs be like.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, each the most extreme version of itself the week after a breakup:
//   ♈ "I'm so fine", ran twenty miles · ♉ the whole cake, with dignity · ♊ over it / not over it · ♋ the first-date photos
//   · ♌ new haircut, glow-up era · ♍ a 48-slide review · ♎ still friends with their whole family · ♏ deleted everything,
//   remembers everything · ♐ one-way trip, tonight · ♑ employee of the month by Friday · ♒ updated their profile
//   · ♓ eleven sad poems
// Ending: card. Lesson ("Heal at your pace. | *Love* finds you.") then "Aquarius? | *New match.*" over
// Aquarius + Gemini (the updated profile, paid off).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, swapLabel, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -160 }
const CAKE = ['..Y...Y...Y..', '..W...W...W..', '.PPPPPPPPPPP.', 'PPWPPPWPPPWPP', 'CCCCCCCCCCCCC', 'PPPPPPPPPPPPP', 'CCCCCCCCCCCCC', 'BBBBBBBBBBBBB']
const CAKE_C = { Y: GOLD, W: CREAM, P: PINK, C: '#7a4a32', B: BONE }
const CRUMB = ['.............', '.............', '.............', '.............', '.........CC..', '......PPPPP..', '....CCCCCCCC.', 'BBBBBBBBBBBBB']

const CAMEOS = [
  { sign: 'aries', cap: '“I’m SO fine.” | Ran *twenty miles.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.4, 0.7, 1.0, 1.3, 1.6],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'I’M SO FINE.', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 46, col: '#ff6b5a', tail: 'bl' })
      const n = Math.floor(clamp((lt - 0.5) / 1.3) * 20)
      L(x, 800, 960, `MILE ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.04, 48)
      L(x, 800, 1100, 'NOT TIRED. AT ALL.', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'The whole cake. | *With dignity.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, lt > 1.2 ? CRUMB : CAKE, CAKE_C, 820, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, lt > 1.2 ? 'CAKE: GONE. CHIN: UP.' : 'JUST ONE SLICE', pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Over it! | *Not* over it.', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 0.9, 'OVER IT ✓', 'NOT OVER IT', { size: 46, fromBg: MINT, toBg: '#ff6b5a' })
      L(x, 800, 1040, 'MOOD UPDATES: HOURLY', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Rewatching the | *first-date* photos.', mood: 'wide', look: [1, 0], tears: lt => lt > 0.9 ? 2 : 1, star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'PHOTOS ♡', headCol: PINK, size: 22, lines: [['photo 1 of 312', BONE, pop01(t, P.t0 + 0.4, 0.2, 2.2)], ['…photo 2', LAV, pop01(t, P.t0 + 0.9, 0.2, 2.2)], ['(sniff)', SKYB, pop01(t, P.t0 + 1.4, 0.2, 2.2), true]] })
    } },
  { sign: 'leo', cap: 'New haircut. | *Glow-up* era.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      bubble(x, 790, 700, 'NEW ME.', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 56, col: GOLD, tail: 'bl' })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.6, 8, 180, 0.2)
      sparkles(x, t, F.x, F.cy, P.t0 + 1.4, 8, 200, 0.9)
      L(x, 800, 1060, 'GLOW-UP: ACTIVE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: 'virgo', cap: 'Made a slideshow: | *what went wrong.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 300, head: 'BREAKUP REVIEW', headBg: MINT, headInk: INK, align: 'left', size: 30, lines: ['1. timeline', '2. red flags', '3. lessons (41)'], progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1090, 'SLIDE 1 OF 48', pop01(t, P.t0 + 1.4, 0.3, 2.4), STEEL, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Still friends with | *their whole family.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      ;[['cancer', 690], ['taurus', 810], ['leo', 930]].forEach(([id, px], i) => friend(x, t, id, px, 900, 140, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 40 + i }))
      L(x, 810, 1090, 'SUNDAY LUNCH, AS USUAL', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 28)
      hearts(x, t, 810, 780, P.t0 + 1.0, { n: 5, life: 1.5, spread: 220, cell: 6, seed: 1 })
    } },
  { sign: 'scorpio', cap: 'Deleted everything. | *Remembers* everything.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 760, 'PHOTOS: 0', pop01(t, P.t0 + 0.2, 0.3, 2.2), STEEL, 0.04, 42)
      L(x, 800, 960, 'MEMORY: 100%', pop01(t, P.t0 + 1.1, 0.3, 2.4), RED, -0.04, 42)
    } },
  { sign: 'sagittarius', cap: 'Booked a one-way trip. | *Tonight.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const f = ease.inOutCubic(prog(lt, 0.6, 1.6))
      bits(x, 'PLANE', lerp(660, 940, f), lerp(800, 660, f), 22 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.4 })
      L(x, 800, 1110, 'DESTINATION: ANYWHERE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Promoted by Friday. | *Coping.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 820, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'EMPLOYEE OF THE MONTH', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Updated their profile. | *Feeling free.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MY PROFILE ♒︎', headCol: SKYB, size: 22, lines: [['status: single', BONE, pop01(t, P.t0 + 0.4, 0.2, 2.2)], ['mood: free', MINT, pop01(t, P.t0 + 0.8, 0.2, 2.2)], ['new match! ✦', PINK, pop01(t, P.t0 + 1.4, 0.2, 2.4), true]] })
    } },
  { sign: 'pisces', cap: 'Wrote eleven | *sad poems.*', mood: 'wide', look: [1, 0], tears: 3, star: ST,
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 820, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bits(x, 'PEN', 700, 1000, 12 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.5 })
      L(x, 800, 1100, 'POEM #11: “WHY”', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0598', key: 'G', accent: ACC, ending: 'card',
  title: 'After a breakup? | *Zodiacs be like.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'gemini', chip: 'NEW MATCH' },
  group: { cap: 'Heartbroken. | *Thriving*, somehow.' },
  lesson: { text: 'Heal at your pace. | *Love* finds you.', chip: 'STATUS: HEALING' },
  last: { text: 'Aquarius? | *New match.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
