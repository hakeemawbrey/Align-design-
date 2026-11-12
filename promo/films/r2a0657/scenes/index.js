// r2a0657: star_advice, ADVICE SOLO (aries), "Aries, you're not | *too much.*" (signs3kit social cut, music: lofi · F).
// Nine relatable Aries truths, each with a warm reframe and one light gag. Ending: group.
//   texted first (three times) · loudest in the meeting · cried at a cartoon · lost your temper, said sorry
//   · five new hobbies this week · running on fire (a nap) · waited four whole seconds · first to help every move
//   · big energy finds its match.   group "Not too much. | *Just enough.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, zzz, steam, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -180 }
const FLOWER = ['..P.P..', '.PPPPP.', 'PPPYPPP', '.PPPPP.', '..PGP..', '...G...', '..GG...', '...G...']

const CAMEOS = [
  { sign: S, cap: 'Texted first. Again? | *That’s brave.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: CRUSH', headCol: PINK, lines: [['hi!!', ACC, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['hi!!', ACC, pop01(t, P.t0 + 0.6, 0.2, 2), true], ['HI!!', ACC, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['hiii ♡', MINT, pop01(t, P.t0 + 1.5, 0.2, 2), false]], size: 30 })
      hearts(x, t, 810, 780, P.t0 + 1.6, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Loudest in the meeting? | *Your ideas matter.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'MY IDEAS', headBg: ACC, headInk: INK, lines: ['idea 1', 'idea 2', 'idea 14', ['good ones: most', '#2f8a48']], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1100, 'HEARD ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Cried at a cartoon? | *Big heart. Big feelings.*', mood: 'wide', tears: lt => lt > 0.8 ? 2 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 850, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (pop01(t, P.t0 + 0.4, 0.3, 2) > 0.5) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 800, 820, 12)
      bits(x, 'TISSUE', 800, 1060, 12 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 650, 'THE DOG WAS OK', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Lost your temper? | *Sorry is a fresh start.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      if (lt < 1.1) steam(x, t, F.x, F.top - 10, { n: 3, h: 110, alpha: 0.9 })
      drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: '#5fd068' }, 800, 880, 24 * pop01(t, P.t0 + 1.0, 0.35, 2), { rot: 0.1 })
      bubble(x, 800, 640, 'sorry. ♡', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      L(x, 800, 1100, 'FORGIVEN', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Five new hobbies this week? | *Curious is cute.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      ;[['GUITAR', GOLD], ['POTTERY', PINK], ['SKATING', SKYB], ['BREAD', CREAM], ['CHESS', MINT]].forEach(([w, c], i) => L(x, 800 + (i % 2 ? 30 : -30), 640 + i * 108, w, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2), c, (i % 2 ? 0.05 : -0.05), 36))
    } },
  { sign: S, cap: 'Running on fire? | *Naps are allowed.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      zzz(x, t, 760, 820, { alpha: clamp(lt - 0.9), size: 54 })
      L(x, 800, 1090, 'NAP: SCHEDULED', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: S, cap: 'Hate waiting? | *Good things take a minute.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      x.save(); x.translate(800, 860); x.rotate(lt < 1.4 ? Math.sin(t * 30) * 0.06 : 0); x.translate(-800, -860)
      bits(x, 'CLOCK', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2)); x.restore()
      L(x, 800, 640, `WAITED: ${Math.min(4, 1 + Math.floor(lt * 2))} SEC`, pop01(t, P.t0 + 0.4, 0.3, 2.2), ACC, 0.04, 36)
      L(x, 800, 1090, 'A NEW RECORD', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'First to help every move? | *We see you.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'BOX', 800 + (i % 2 ? 20 : -20), 1010 - i * 100, 18 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2))
      L(x, 800, 1100, 'BOXES CARRIED: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Big energy? | *The right ones match it.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: PINK, lines: [['♈ aries', ACC, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['loves: LOUD', MINT, pop01(t, P.t0 + 0.9, 0.2, 2), true], ['SAME!!!', MINT, pop01(t, P.t0 + 1.3, 0.2, 2), true]], size: 28 })
      hearts(x, t, 810, 780, P.t0 + 1.5, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0657', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'Aries, you’re not | *too much.*',
  cameos: CAMEOS,
  group: {
    cap: 'Not too much. | *Just enough.*', mood: 'heart',
    draw(x, t, lt) { hearts(x, t, 540, 1080, t - lt + 1.2, { n: 8, life: 2.4, spread: 500, cell: 8, seed: 7 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
