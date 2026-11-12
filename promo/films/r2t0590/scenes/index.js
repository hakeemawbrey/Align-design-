// r2t0590: star_talk, ROLLCALL, "The signs | *in costume.*" (signs3kit social cut, music: lofi · F).
// Twelve signs in zodiac order at a costume party, each the most extreme version of itself. Ending: group.
//   ♈ came as a superhero, started saving people · ♉ came as a pizza, ate some of it · ♊ two costumes, swapped
//   mid-party · ♋ matching costumes with mom · ♌ came as themselves · ♍ hand-stitched, seams perfect
//   · ♎ judged the contest, everyone won · ♏ came as a ghost, nobody saw them leave · ♐ costume: whatever was in the car
//   · ♑ came as a CEO (not a costume) · ♒ came as a concept · ♓ someone loved the mermaid tail, Pisces cried
//   group "Best dressed: | *Leo (self-voted).*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -160 }
const CAPE = ['RRRRRRRRRR', 'RRRYYYYRRR', 'RRRYRRYRRR', 'RRRYYYYRRR', 'RRRYRRRRRR', 'RRRYRRRRRR', 'RRRRRRRRRR', '.RRRRRRRR.', '..RRRRRR..']
const PIZZA_BIT = ['CCCCCCC...', '.YRYYYY...', '.YYYYRYY..', '..YRYYYY..', '..YYYYR...', '...YYY....', '...YR.....', '....Y.....']
const MASK = ['.KKKKKKKKKK.', 'KMMMMMMMMMMK', 'KMKKMMMMKKMK', 'KMKKMMMMKKMK', 'KMMMMKKMMMMK', '.KMMK..KMMK.', '..KK....KK..']
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYPYYRY', 'YYYYYYYYY']
const GHOST = ['...WWWW...', '..WWWWWW..', '.WWWWWWWW.', '.WKKWWKKW.', '.WKKWWKKW.', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'W.WW.WW.WW']
const TIE = ['..RRR..', '..RRR..', '...R...', '..RRR..', '.RRRRR.', '.RRRRR.', '..RRR..', '...R...']
const TAIL = ['.....TT...', '....TTTT..', '...TTSTT..', '...TTTTT..', '..TTSTTT..', '..TTTTT...', '...TTT....', '..T.T.T...', '.TT...TT..', 'TT.....TT.']

const CAMEOS = [
  { sign: 'aries', cap: 'Came as a superhero. | *Started saving people.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.3],
    front(x, t, lt, P) {
      drawBits(x, CAPE, { R: RED, Y: GOLD }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 * Math.sin(t * 6) })
      L(x, 790, 1110, 'HERO MODE: ON', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
      bubble(x, 780, 640, 'stand back!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: '#ff6b5a', tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Came as a pizza. | *Ate some of it.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, lt < 1.1 ? 'PIZZA' : 'PIZZA', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      if (lt > 1.1) { x.save(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(890, 790, 46, 0, Math.PI * 2); x.fill(); x.restore() }
      L(x, 790, 1110, 'COSTUME: 80% LEFT', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Brought two costumes. | *Swapped mid-party.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const sw = lt > 1.2
      drawBits(x, MASK, { K: INK, M: sw ? MINT : GOLD }, 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2) * (sw ? pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.4) : 1))
      L(x, 790, 1080, sw ? 'LOOK 2 OF 2' : 'LOOK 1 OF 2', pop01(t, P.t0 + 0.5, 0.3, 2), LAV, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Matching costumes | *with their mom.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 820, 930, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0] })
      drawBits(x, CROWN, { Y: GOLD, R: RED, P: PINK }, 820, 800, 10 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 640, 'MOM’S IDEA. (MINE.)', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Came as themselves. | *“Iconic, right?”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, CROWN, { Y: GOLD, R: RED, P: PINK }, 800, 760, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 980, 'it’s me.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 56, col: GOLD, tail: 'bl' })
      sparkles(x, t, 800, 760, P.t0 + 0.7, 8, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Hand-stitched the costume. | *Seams: perfect.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'PATTERN', headBg: MINT, headInk: INK, lines: ['cut: ✓', 'pin: ✓', 'stitch: ✓✓✓'], size: 36, rot: 0.04, progress: clamp(lt / 1.2) })
      L(x, 790, 1100, 'TOOK 3 MONTHS', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Judged the costume contest. | *Everyone won.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'TROPHY', 680 + i * 120, 880 - (i === 1 ? 40 : 0), 12 * pop01(t, P.t0 + 0.4 + i * 0.25, 0.3, 2.2))
      L(x, 790, 1090, 'WINNERS: ALL OF YOU', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Came as a ghost. | *Nobody saw them leave.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fade = 1 - ease.inOutCubic(prog(lt, 1.0, 1.8))
      drawBits(x, GHOST, { W: '#efe6ff', K: INK }, 820 + (1 - fade) * 60, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 0.25 + 0.75 * fade })
      L(x, 790, 1100, 'LEFT AT 9:14. QUIETLY.', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, -0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Costume: whatever | *was in the car.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, ['KKKKK.KKKKK', 'KSSSKKKSSSK', 'KSSSK.KSSSK', '.KKK...KKK.'], { K: GOLD, S: '#3a3a5a' }, 720, 760, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bits(x, 'BACKPACK', 880, 860, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.1 })
      bits(x, 'BOOK', 730, 960, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.3 })
      L(x, 790, 1110, 'A PIRATE? A CHEF?', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Came as a CEO. | *It wasn’t a costume.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TIE, { R: RED }, 800, 840, 32 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'DRESS CODE: MONDAY', pop01(t, P.t0 + 1.1, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Came as a concept. | *Nobody gets it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(800, 830); x.scale(k, k); x.rotate(t * 0.8)
      x.fillStyle = INK; x.fillRect(-84, -84, 168, 168); x.fillStyle = SKYB; x.fillRect(-76, -76, 152, 152)
      x.fillStyle = PINK; x.beginPath(); x.arc(0, 0, 54, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.fillRect(-16, -100, 32, 200)
      x.restore()
      bubble(x, 800, 1060, 'it’s “tuesday.”', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Someone loved the tail. | Pisces *cried.*', mood: lt => lt < 1.0 ? 'happy' : 'wide', look: [1, 0], tears: lt => lt < 1.0 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      drawBits(x, TAIL, { T: '#7dffb0', S: '#bfe6ff' }, 820, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 3) })
      bubble(x, 800, 640, 'love the tail!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      hearts(x, t, 820, 820, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0590', key: 'F', accent: ACC, ending: 'group',
  title: 'The signs | *in costume.*',
  cameos: CAMEOS,
  group: { cap: 'Best dressed: | *Leo (self-voted).*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
