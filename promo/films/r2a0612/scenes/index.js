// r2a0612: star_advice, ADVICE SOLO (pisces), "Pisces, here's your | *Monday pep talk.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way (Pisces cries in every card): nine gentle Monday truths, each with a warm reframe and one light gag.
// Ending: lesson ("Soft heart. | *Strong week.*" MONDAY: HANDLED), then the last line.
//   snooze ×7, you still showed up · cried at an ad, your heart works · daydreamed in a meeting, ideas live there
//   · forgot lunch, feed yourself like a friend · carrying everyone's mood, set some down · "no" is allowed
//   · a song for every mood, Monday gets one too · start with one tiny thing · Monday needs soft
//   group "Feels everything. | *Shows up anyway.*"   last "Go cry at | *something nice.*"
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b7a6ff', S = 'pisces', ST = { x: -190 }
const PLANT = ['..G.G..', '.GGGGG.', 'GG.G.GG', '...G...', '.TTTTT.', '.TTTTT.', '..TTT..']
const THOUGHT = ['....WWWW....', '..WWWWWWWW..', '.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.', '..WWW..WWW..', '............', '.....WW.....', '......W.....']

const CAMEOS = [
  { sign: S, cap: 'Hit snooze seven times? | *You still showed up.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', tears: 2, look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const sh = lt < 1.2 ? Math.sin(t * 40) * 0.08 : 0
      bits(x, 'CLOCK', 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: sh })
      L(x, 800, 1060, `SNOOZE ×${Math.min(7, 1 + Math.floor(lt / 0.18))}`, pop01(t, P.t0 + 0.3, 0.3, 2), PINK, -0.04, 40)
      L(x, 800, 640, 'STILL MADE IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Cried at an ad? | *Your heart works.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.5) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 800, 820, 10 * pop01(t, P.t0 + 0.65, 0.3, 2))
      L(x, 800, 1090, 'HEART: WORKING FINE', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Daydreamed in a meeting? | *Ideas live there.*', mood: 'sparkle', tears: 2, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, THOUGHT, { W: BONE }, 790, 780, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.7, 0.3, 2)
      drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.Y.Y.', '.YYY.'], { Y: GOLD }, 740, 750, 14 * k)
      drawBits(x, ['.LL.', 'LLLL', 'LLLL', '.LL.'], { L: SKYB }, 850, 760, 14 * k)
      L(x, 800, 1060, 'IDEAS FOUND: 12', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Forgot lunch again? | *Feed yourself like a friend.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: lt => lt > 1.2 ? 2 : 3, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'APPLE', 790, 840, 24 * pop01(t, P.t0 + 1.0, 0.3, 2.4))
      L(x, 800, 1090, lt < 1.0 ? 'LUNCH: AT HOME' : 'SNACK: SECURED', pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.0 ? STEEL : MINT, -0.04, 34)
      sparkles(x, t, 790, 840, P.t0 + 1.3, 6, 160, 0.4)
    } },
  { sign: S, cap: 'Carrying everyone’s mood? | *Set some down.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const items = [['THEIR STRESS', STEEL], ['HIS BAD DAY', '#ff9a7a'], ['HER DRAMA', LAV], ['YOUR STUFF', MINT]]
      items.forEach(([s, c], i) => {
        const fall = i < 3 ? ease.inQuad(prog(lt, 1.0 + i * 0.2, 1.4 + i * 0.2)) : 0
        L(x, 800 + fall * 200, 700 + i * 110 + fall * 600, s, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2) * (1 - fall), c, (i % 2 ? 0.04 : -0.04) + fall, 32)
      })
    } },
  { sign: S, cap: 'Said yes to everything? | *“No” is allowed.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bubble(x, 720 + i * 70, 640 + i * 90, 'yes!', pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2) * (1 - prog(lt, 1.0, 1.2)), { size: 34, tail: 'bl' })
      bubble(x, 800, 860, 'no :)', pop01(t, P.t0 + 1.25 * 1.29, 0.25, 2.6), { size: 96, col: ACC, tail: 'bl' })
      L(x, 800, 1110, 'BOUNDARY: SET', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'A song for every mood? | *Monday gets one too.*', mood: 'sparkle', tears: 2, look: [1, 0], star: ST, hops: [1.0, 1.8],
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 5, cell: 9, col: ACC })
      L(x, 800, 720, 'NOW PLAYING:', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 30)
      L(x, 800, 800, 'MONDAY, BUT SOFT', pop01(t, P.t0 + 0.5, 0.3, 2), ACC, 0.03, 38)
    } },
  { sign: S, cap: 'Week feels huge? | *Start with one tiny thing.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 800, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 260, head: 'TO DO', headBg: ACC, headInk: INK, lines: ['1. water plant', ['2. that’s it', '#9aa5c4']], size: 32, align: 'left', progress: prog(lt, 0.3, 1.0) })
      drawBits(x, PLANT, { G: '#5fd068', T: '#c98f5a' }, 800, 1060, 16 * pop01(t, P.t0 + 1.1, 0.3, 2.2))
      sparkles(x, t, 800, 1040, P.t0 + 1.6, 6, 120, 0.6)
    } },
  { sign: S, cap: 'Too soft for Monday? | *Monday needs soft.*', mood: 'heart', tears: 2, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'TOO SOFT', 'JUST RIGHT', { size: 48, fromBg: STEEL, toBg: PINK })
      hearts(x, t, 800, 1060, P.t0 + 1.3, { n: 6, life: 1.8, spread: 240, cell: 8, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0612', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Pisces, here’s your | *Monday pep talk.*',
  cameos: CAMEOS,
  group: { cap: 'Feels everything. | *Shows up anyway.*', mood: 'heart' },
  lesson: { text: 'Soft heart. | *Strong week.*', chip: 'MONDAY: HANDLED' },
  last: { text: 'Go cry at | *something nice.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
