// r2t0767: THE SIGNS AS… v3, "The signs | *at speed dating.*" (signs3kit social cut, lofi · E).
// Twelve signs at one speed-dating night, each the most extreme version of itself. Ending: card (Scorpio + Pisces:
// Scorpio guessed "you're a Pisces" before hello; Pisces cried at a name tag).
//   ♈ rang the bell early, every round · ♉ rated the cheese board · ♊ nine stories in five minutes · ♋ asked about
//   their mom in minute one · ♌ handed out signed headshots · ♍ brought a 40-question form · ♎ ticked yes for everyone
//   · ♏ "you're a Pisces." (correct) · ♐ left with date three, for the airport · ♑ brought a résumé + references
//   · ♒ debated aliens all five minutes · ♓ cried at a name tag that said "hi"
//   group "Twelve rounds. | *Zero chill.*"  lesson "The right one | *laughs at your weird.*"  last "Scorpio and Pisces? | *Matched.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }
const BELL = ['....K....', '...YYY...', '..YYWYY..', '..YYWYY..', '.YYYYYYY.', 'YYYYYYYYY', 'KKKKKKKKK', '....K....']
const CHEESE = ['......YY', '....YYYY', '..YYYKYY', 'YYYYYYYY', 'YKYYYYKY', 'YYYYKYYY', 'YYYYYYYY']

const CAMEOS = [
  { sign: 'aries', cap: 'Rang the bell early. | *Every round.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: ST, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      drawBits(x, BELL, { K: INK, Y: GOLD, W: '#fff4c0' }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 18) * 0.12 })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 11)
      L(x, 800, 650, `ROUND ${n} OF 12`, pop01(t, P.t0 + 0.3, 0.3, 2.2), CREAM, -0.04, 34)
      L(x, 780, 1090, 'NEXT! NEXT!', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#ff6b5a', 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Skipped the dates. | *Reviewed the cheese.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHEESE, { Y: '#ffd23a', K: '#c99a2a' }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'TABLE 4: CHEESE', pop01(t, P.t0 + 0.4, 0.3, 2.2), CREAM, -0.04, 34)
      L(x, 800, 1090, '★★★★★ WOULD DATE', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Five minutes. | *Nine stories.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'wide', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 8)
      L(x, 800, 660, `STORY #${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), '#ffd23a', -0.05, 44)
      bubble(x, 800, 880, 'ok wait, this | one’s better', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 780, 1090, 'DATE: SPEECHLESS', pop01(t, P.t0 + 1.7, 0.3, 2.2), STEEL, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Asked about their mom. | *Minute one.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'how’s your | mom doing?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 780, 960, 'NEXT: CHILDHOOD', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 32)
      hearts(x, t, 560, 1000, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Handed out headshots. | *Signed.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) {
        sheet(x, 800, 850, k, { w: 240, h: 300, bg: '#ffe7a8', lines: [], rot: 0.06 })
        friend(x, t, 'leo', 800, 830, 150, k, { mood: 'wink', glow: 0.5 })
        x.save(); x.fillStyle = INK; x.font = "italic 700 34px Georgia, serif"; x.textAlign = 'center'; x.fillText('xoxo, Leo', 805, 960); x.restore()
      }
      L(x, 800, 650, '12 COPIES', pop01(t, P.t0 + 0.9, 0.3, 2.2), '#ffb34a', -0.04, 34)
      L(x, 800, 1100, 'KEEP IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Brought a form. | *Forty questions.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 310, h: 340, head: 'DATE FORM', headBg: '#5fd068', headInk: INK, lines: ['1. sign?', '2. bedtime?', '3. dishes: same day?', '…40. tabs or spaces?'], size: 26, progress: clamp((lt - 0.3) / 1.3) })
      L(x, 800, 1100, 'PEN PROVIDED', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Liked everyone. | *Picked no one.*', mood: lt => lt > 1.6 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 330, head: 'YES / NO', headBg: PINK, headInk: INK, lines: ['#1  yes!', '#2  yes!', '#3  yes!!', '#4  …all of them'], size: 28, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 780, 1100, 'DECISION: PENDING', pop01(t, P.t0 + 1.7, 0.3, 2.2), STEEL, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Guessed their sign | *before hello.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'you’re a pisces.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      L(x, 800, 920, '…CORRECT.', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 40)
      L(x, 800, 1080, 'DATE: IMPRESSED', pop01(t, P.t0 + 1.8, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Left with date three. | *For the airport.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const fl = ease.inOutCubic(clamp((lt - 0.6) / 1.4))
      bits(x, 'PLANE', lerp(700, 900, fl), lerp(940, 760, fl), 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.5 })
      L(x, 800, 650, 'ROUND 4: GONE', pop01(t, P.t0 + 0.4, 0.3, 2.2), CREAM, -0.05, 34)
      L(x, 800, 1090, 'BOARDING: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#ff9a4a', 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Brought a résumé. | *And references.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 330, head: 'RÉSUMÉ', headBg: STEEL, headInk: INK, lines: ['goals: 5-year', 'ex: “reliable”', 'refs: on request'], size: 28, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1100, 'LOOKING TO HIRE', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Debated aliens | *for all five minutes.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'but are we | the aliens?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 950, 'STILL GOING…', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#6fc3ff', -0.04, 34)
      sparkles(x, t, 800, 720, P.t0 + 1.0, 7, 170, 0.4, [SKYB, MINT, BONE])
    } },
  { sign: 'pisces', cap: 'Cried at a name tag. | *It said “hi.”*', mood: 'wide', star: ST, tears: 3,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 860, k, { w: 300, h: 220, bg: CREAM, head: 'HELLO', headBg: RED, lines: ['hi :)'], size: 52, rot: 0.04 })
      bubble(x, 800, 1090, 'so thoughtful', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0767', key: 'E', accent: ACC, ending: 'card',
  title: 'The signs | *at speed dating.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'pisces', chip: 'IT’S A MATCH' },
  group: { cap: 'Twelve rounds. | *Zero chill.*' },
  lesson: { text: 'The right one | *laughs at your weird.*', chip: 'MATCH: MADE' },
  last: {
    text: 'Scorpio and Pisces? | *Matched.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
