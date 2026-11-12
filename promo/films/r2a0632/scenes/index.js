// r2a0632: star_advice, ADVICE SOLO (leo), "How to surprise | *a Leo.*" (signs3kit social cut, music: lofi · F). Ending: lesson.
//   guest of honour · a note they read out loud · hype the shoes · the little thing they mentioned once · cheer the tiny win
//   · breakfast plated fancy · a playlist all about them · ask about the dream · just show up
//   lesson "Leos light up | when they feel *seen.*"  SURPRISE: SUCCESS   last "Bonus points | *for confetti.*"
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -190 }
const SHOE = ['......RRR...', '.....RRRRR..', '....RRRWRR..', 'RRRRRRRRRRR.', 'RRRRRRRRRRRR', 'WWWWWWWWWWWW']
const STARRY = ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '.Y.Y.']

const CAMEOS = [
  { sign: S, cap: 'Throw a party? | Make them *guest of honour.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      L(x, 790, 700, 'GUEST OF HONOUR', pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, -0.04, 34)
      bubble(x, 800, 960, 'SURPRISE!', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 48, col: PINK, tail: 'bl' })
      confetti(x, t, 780, 900, P.t0 + 1.0)
    } },
  { sign: S, cap: 'Leave them a note. | *They’ll read it aloud.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 240, rot: 0.04, lines: ['you are', 'my favourite'], size: 38 })
      bubble(x, 800, 1080, 'AHEM. “you are…”', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Compliment the outfit. | *Especially the shoes.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: RED, W: BONE }, 800, 950, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'THE SHOES?!', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 46, tail: 'bl' })
      sparkles(x, t, 800, 950, P.t0 + 1.2, 7, 160, 0.4)
    } },
  { sign: S, cap: 'Remember the little thing | *they said once.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 770, 690, 'you remembered?!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 800, 1060, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Tiny win? | Cheer *like it’s huge.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      L(x, 800, 760, 'PARKED FIRST TRY', pop01(t, P.t0 + 0.2, 0.3, 2.2), MINT, -0.04, 34)
      bits(x, 'TROPHY', 800, 980, 20 * pop01(t, P.t0 + 0.8, 0.3, 2.4))
      confetti(x, t, 800, 900, P.t0 + 1.0, { n: 18, spread: 240 })
    } },
  { sign: S, cap: 'Breakfast in bed? | *Plate it fancy.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, '★★★★★ CHEF', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Make a playlist | *all about them.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 320, head: 'FOR LEO', headBg: ACC, headInk: INK, lines: ['1. you, glowing', '2. you, again', '3. still you'], size: 28, progress: clamp((lt - 0.4) / 1.2) })
      notes(x, t, 800, 700, { n: 4, cell: 7, col: ACC, seed: 1 })
    } },
  { sign: S, cap: 'Ask about the big dream. | *Then really listen.*', mood: 'heart', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'one day, | i’ll…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      for (let i = 0; i < 5; i++) drawBits(x, STARRY, { Y: [GOLD, PINK, SKYB, MINT, LAV][i] }, 680 + i * 60, 920 - Math.sin(i) * 40, 9 * pop01(t, P.t0 + 0.8 + i * 0.15, 0.3, 2.2))
      L(x, 800, 1100, 'YOU: ALL EARS', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: S, cap: 'Just show up. | *That’s the big one.*', mood: lt => lt > 0.9 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'DOORX', 790, 900, 30 * k)
      if (lt > 0.8) friend(x, t, 'sagittarius', 780, 950, 190, pop01(t, P.t0 + 0.8 * 1.29, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 800, 1180, 'YOU CAME!', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0632', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to surprise | *a Leo.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger reactions.*', mood: 'sparkle' },
  lesson: { text: 'Leos light up | when they feel *seen.*', chip: 'SURPRISE: SUCCESS' },
  last: {
    text: 'Bonus points | *for confetti.*',
    draw(x, t, lt) { confetti(x, t, 540, 1420, t - lt + 0.7, { n: 26, spread: 420 }); confetti(x, t, 540, 1420, t - lt + 1.9, { n: 22, spread: 380 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
