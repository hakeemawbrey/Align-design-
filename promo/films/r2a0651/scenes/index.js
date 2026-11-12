// r2a0651: star_advice, ADVICE SOLO, "Aries, you don't have | *to be perfect.*" (~51 s vertical, signs3kit social cut,
// music: lofi · D). One sign the whole way (makeFilm solo mode, 9 cards): a relatable Aries truth + a warm reframe.
//   0.0–3.6    "Aries, you don’t | *need perfect.*" (topic hook, trimmed to fit two lines); one big Aries pops in.
//   3.6–37.8   nine cards: came second (still ran the race) · burnt toast (breakfast still counts) · said the wrong
//              thing (say sorry, done) · resting is a pit stop · ten projects started, one done is plenty · typo text
//              (they got the message) · missed the goal (brave to shoot) · impatient? the plant grows anyway
//              · your best today is enough (report card: EFFORT A+)
//  37.8        "Bold heart. | *Not a robot.*"
//  41.0        LESSON: "Messy and brave | *beats perfect.*"  STATUS: ENOUGH
//  46.9        "Second place. | *First in our hearts.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'aries', ACC = '#ff6b5a', ST = { x: -170 }
const SILVER = '#d8dbe8', GREEN = '#5fd068'

const MEDAL = ['RR....RR', '.RR..RR.', '..RRRR..', '...SS...', '..SSSS..', '.SSSSSS.', 'SSWSSSSS', 'SWSSSSSS', 'SSSSSSKS', '.SSSSKS.', '..SSSS..']
const MEDAL_C = { R: '#6fc3ff', S: SILVER, K: '#8a8aa0', W: '#ffffff' }
const TOAST = ['.BBBBBBBB.', 'BKKKKKKKKB', 'BKKKKKKKKB', 'BKKkKKKKKB', 'BKKKKKkKKB', 'BKKKKKKKKB', 'BKKKKKKKKB', 'BBBBBBBBBB']
const TOAST_C = { B: '#5a3420', K: '#3a2418', k: '#1b1236' }
const FLAG = ['P........', 'PWKWKWKWK', 'PKWKWKWKW', 'PWKWKWKWK', 'PKWKWKWKW', 'P........', 'P........', 'P........', 'P........', 'P........']
const FLAG_C = { P: STEEL, W: '#ffffff', K: INK }
const BALL = ['..WWWW..', '.WKWWKW.', 'WWWKKWWW', 'WKWKKWKW', 'WWKWWKWW', 'WKWWWWKW', '.WWKKWW.', '..WWWW..']
const BALL_C = { W: '#ffffff', K: INK }
const NET = ['PPPPPPPPPPPP', 'P.N.N.N.N.NP', 'PN.N.N.N.N.P', 'P.N.N.N.N.NP', 'PN.N.N.N.N.P', 'P.N.N.N.N.NP', 'PN.N.N.N.N.P', 'P..........P']
const NET_C = { P: '#ffffff', N: STEEL }
const POT = ['.RRRRRRRR.', 'RRRRRRRRRR', '.RRRRRRRR.', '.RRRRRRRR.', '..RRRRRR..', '..RRRRRR..']
const POT_C = { R: '#d9744a' }
const LEAF = ['.G...G.', 'GGG.GGG', '.GGGGG.', '...G...', '...G...', '...G...']
const LEAF_C = { G: GREEN }

const CAMEOS = [
  { sign: S, cap: 'Came in second? | *Still* ran the race.', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: lt => lt > 1.3 ? [0, 0] : [0, 1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, MEDAL, MEDAL_C, 790, 840, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.08 })
      L(x, 790, 640, '2ND PLACE', pop01(t, P.t0 + 0.5, 0.3, 2.2), SILVER, 0.05, 40)
      L(x, 790, 1080, 'FINISHED. PROUD.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 790, 840, P.t0 + 1.4, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Burnt the toast? | Breakfast *still counts.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TOAST, TOAST_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      steam(x, t, 790, 760, { n: 3, h: 150, alpha: 0.9 })
      L(x, 790, 640, 'EXTRA CRISPY', pop01(t, P.t0 + 0.6, 0.3, 2.2), '#ffb34a', 0.05, 36)
      bubble(x, 790, 1090, 'crunchy is a vibe', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Said the wrong thing? | *Say sorry.* Done.', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'oops. sorry!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 930, 200 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.5] })
      L(x, 800, 1120, 'FORGIVEN ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: S, cap: 'Resting isn’t quitting. | It’s *a pit stop.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -150, y: 20 },
    back(x, t, lt, P) { drawBits(x, FLAG, FLAG_C, 800, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 390, 1060, 22 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 830, 1050, 'PIT STOP: 20 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Ten projects started? | *One done* is plenty.', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const done = lt > 1.5
      sheet(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 330, h: 400, head: 'PROJECTS', headBg: ACC, lines: [[done ? '✓ the mural' : '□ the mural', done ? '#2f8a48' : INK], '□ learn drums', '□ start a band', '□ run a marathon', '□ write a book'], size: 30, align: 'left', progress: clamp((lt - 0.4) / 0.8) })
      L(x, 790, 1110, 'ONE DONE ✦ NICE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Typos in the text? | They *got the message.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE ♡', headCol: PINK, lines: [['im so prod', ACC, pop01(t, P.t0 + 0.4, 0.25, 2.2), true], ['of yuo!!', ACC, pop01(t, P.t0 + 0.6, 0.25, 2.2), true], ['love u too', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2)]] })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Missed the goal? | Still *brave to shoot.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.4],
    back(x, t, lt, P) { drawBits(x, NET, NET_C, 820, 800, 20 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const p = prog(lt, 0.4, 1.2)
      const bx = lerp(480, 1000, p), by = lerp(1000, 560, p) + 120 * Math.sin(Math.PI * p) * -0.5
      if (p < 1) drawBits(x, BALL, BALL_C, bx, by, 12, { rot: lt * 6 })
      L(x, 800, 1080, 'MISSED. LEGEND ANYWAY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Impatient again? | The plant *grows anyway.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, POT_C, 790, 1030, 22 * k)
      const g = ease.outCubic(prog(lt, 0.6, 2.0))
      if (k > 0.5) drawBits(x, LEAF, LEAF_C, 790, 1030 - 60 - 110 * g, 10 + 14 * g)
      bubble(x, 800, 640, 'grow faster!!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 380, 1140, 'IT’S TRYING ♡', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Your best today | *is enough.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 850, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 320, h: 330, rot: 0.04, head: 'REPORT CARD', headBg: LAV, headInk: INK, lines: ['perfect: nope', 'tried: yes', ['EFFORT: A+', '#d23a4a']], size: 32, progress: clamp((lt - 0.4) / 0.9) })
      L(x, 790, 1110, 'GOLD STAR ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 36)
      sparkles(x, t, 790, 850, P.t0 + 1.3, 7, 190, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0651', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aries, you don’t | *need perfect.*',
  cameos: CAMEOS,
  group: { cap: 'Bold heart. | *Not a robot.*', mood: 'sparkle' },
  lesson: { text: 'Messy and brave | *beats perfect.*', chip: 'STATUS: ENOUGH' },
  last: {
    text: 'Second place. | *First in our hearts.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
