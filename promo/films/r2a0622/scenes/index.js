// r2a0622: star_advice, ADVICE SOLO (gemini), "Gemini, you can | *be a beginner.*" (the batch topic "Gemini, you’re allowed | to be a beginner.", tightened to fit two lines) (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine gentle truths about a Gemini starting things, each with a warm reframe and one light gag.
// Ending: group (the group beat is the ending).
//   guitar, day two · five hobbies this week · not good YET · the "dumb" question · the first pancake
//   · the bookmark halfway · a pro's first drawing · learning their sign (the chart) · a tiny win, celebrated loudly
//   group "New at everything. | *Great at being new.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -190 }
const GUITAR = ['......KK', '.....KK.', '....KK..', '...BB...', '.OOBO...', 'OOOOOO..', 'OOKKOO..', 'OOKKOO..', '.OOOO...']
const PANCAKE = ['..BBBBBB..', '.BBDBBBBB.', 'BBBBBBDBBB', '.BBBBBBBB.', '..BBBBBB..']
const HOBBIES = ['GUITAR', 'POTTERY', 'CHESS', 'FRENCH', 'BREAD', 'YO-YO']

const CAMEOS = [
  { sign: S, cap: 'Quit guitar on day two? | *Try day three.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GUITAR, { K: WOOD, B: INK, O: '#ff9a4a' }, 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      swapLabel(x, 800, 1110, lt, 1.3, 'DAY 2: DONE', 'DAY 3: MAYBE', { size: 34, fromBg: STEEL, toBg: MINT })
      if (lt > 1.6) notes(x, t, 820, 720, { n: 3, cell: 7, col: GOLD, seed: 1 })
    } },
  { sign: S, cap: 'Five new hobbies this week? | *That’s curiosity.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) L(x, 790 + (i % 2 ? 30 : -30), 640 + i * 110, HOBBIES[i + 1], pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2.2), [PINK, MINT, SKYB, LAV, GOLD][i], (i % 2 ? 0.05 : -0.05), 34)
    } },
  { sign: S, cap: 'Not good at it? | Add *“yet.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 760, 'NOT GOOD', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 48)
      L(x, 800, 920, '…YET', pop01(t, P.t0 + 1.1, 0.35, 2.6), GOLD, 0.06, 80)
      sparkles(x, t, 800, 920, P.t0 + 1.2, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Asked the “dumb” question? | *Everyone wanted to.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'wait… why?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      for (let i = 0; i < 4; i++) bubble(x, 640 + i * 105, 940, '!', pop01(t, P.t0 + 1.0 + i * 0.15, 0.25, 2.2), { size: 40, col: [PINK, MINT, SKYB, LAV][i], tail: 'bc' })
      L(x, 800, 1110, 'CLASS: RELIEVED', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'First pancake flopped? | *First ones always do.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fl = prog(lt, 0.3, 1.0)
      drawBits(x, PANCAKE, { B: '#e8b36a', D: '#8a5a32' }, 800, lerp(1040, 640, Math.sin(Math.PI * fl)), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: fl * 3.5, sy: lt > 1.0 ? 0.55 : 1 })
      bits(x, 'PLATE', 800, 1080, 16)
      L(x, 800, 860, 'PANCAKE 1: ABSTRACT', pop01(t, P.t0 + 1.3, 0.3, 2.2), CREAM, -0.04, 28)
    } },
  { sign: S, cap: 'Bored halfway through? | *Pause. Don’t quit.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.fillStyle = RED; x.fillRect(790, 760, 22, lerp(0, 150, clamp((lt - 0.6) / 0.5))); x.restore()
      L(x, 800, 1110, 'BOOKMARK: STAYS', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'The experts? | *Had a day one too.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 860, k, { w: 320, h: 300, head: 'A PRO’S FIRST TRY', headBg: LAV, headInk: INK, lines: [] })
      if (k > 0.9) { x.save(); x.translate(800, 890); x.rotate(-0.04); x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.arc(-40, 0, 46, 0.3, 5.6); x.moveTo(30, -50); x.lineTo(70, 60); x.lineTo(110, -30); x.stroke(); x.restore() }
      L(x, 800, 1110, 'EVERYONE STARTS HERE', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Learning their sign? | *Ask. Don’t guess.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 800, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 800, 1070, 'teach me yours?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Tiny win today? | *Celebrate it loudly.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.9, 1.4, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 820, 'LEVEL 1: CLEARED', pop01(t, P.t0 + 0.4, 0.3, 2.2), MINT, -0.04, 38)
      confetti(x, t, 800, 900, P.t0 + 0.8, { n: 24, spread: 260 })
      bubble(x, 800, 1080, 'WOOO!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 50, col: GOLD, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0622', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'Gemini, you can | *be a beginner.*',
  cameos: CAMEOS,
  group: {
    cap: 'New at everything. | *Great at being new.*', mood: 'sparkle',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
