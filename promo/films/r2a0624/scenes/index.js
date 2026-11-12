// r2a0624: star_advice, ADVICE SOLO (libra), "Libra, you’re not | *too much.*" (signs3kit social cut, music: lofi · E).
// One sign the whole way: nine gentle truths about the "extra" side of a Libra, each with a warm reframe and one light gag.
// Ending: group (the group beat is the punchline).
//   dressed up for groceries · fifteen throw pillows · complimented a stranger's shoes · the love song on repeat
//   · the first date, starlit table · wants everyone to get along · checked in three times · moved the couch for
//   good energy · stopped for the sunset
//   group "Not too much. | *Exactly enough.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fd8', S = 'libra', ST = { x: -190 }
const GBAG = ['..G.G.G..', '.GGGGGGG.', 'BBBBBBBBB', 'BBDBBBDBB', 'BBBBBBBBB', 'BBBBBBBBB', 'BBBBBBBBB']
const SHOE = ['......RR..', '.....RRRR.', 'RRRRRRRRRR', 'RRRRRRRRRR', 'KK......KK']

const CAMEOS = [
  { sign: S, cap: 'Dressed up for groceries? | *You bring the occasion.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GBAG, { G: '#4fbf6a', B: '#c98f5a', D: '#a8703e' }, 800, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'DRESS CODE: GALA', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.05, 34)
      L(x, 800, 1140, 'ITEMS: MILK', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 30)
      sparkles(x, t, 400, 840, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Fifteen throw pillows? | *Your home, your art.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(15, Math.floor(Math.max(0, lt - 0.2) / 0.1) + 1)
      const cols = [PINK, LAV, MINT, SKYB, GOLD]
      for (let i = 0; i < n; i++) drawBits(x, B_PILLOW, { W: cols[i % 5], L: '#ffffff' }, 645 + (i % 3) * 115, 1130 - Math.floor(i / 3) * 78, 12)
    } },
  { sign: S, cap: 'Complimented a stranger? | *You made their week.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: '#ff6b9a', K: INK }, 800, 1070, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'love your shoes!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 890, 'THEIR WEEK: MADE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Love song on repeat? | *Romance is a strength.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 9, col: PINK, seed: 2 })
      L(x, 800, 760, `PLAY #${1 + Math.floor(clamp((lt - 0.2) / 1.6) * 40)}`, pop01(t, P.t0 + 0.2, 0.3, 2), PINK, 0.05, 52)
      L(x, 800, 1120, 'REPEAT: FOREVER', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: S, cap: 'Planned a dreamy first date? | *That’s a gift.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'FLOWER', 720 + i * 80, 960 - (i % 2) * 30, 12 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { rot: (i - 1) * 0.25 })
      L(x, 800, 680, '✦ TABLE: STARLIT', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 800, 1150, 'PLAYLIST: 3 HOURS', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: S, cap: 'Need everyone to get along? | *Peace is your gift.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const j = ease.inOutCubic(prog(lt, 0.6, 1.3))
      friend(x, t, 'aries', lerp(640, 720, j), 960, 160, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: j > 0.9 ? 'happy' : 'squint', look: [1, 0], seed: 41 })
      friend(x, t, 'capricorn', lerp(940, 860, j), 960, 160, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: j > 0.9 ? 'happy' : 'squint', look: [-1, 0], seed: 42 })
      bubble(x, 790, 690, 'hug it out?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      if (j > 0.9) hearts(x, t, 790, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Checked in three times? | *That’s called caring.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bubble(x, 790 + (i % 2 ? 30 : -30), 680 + i * 140, 'you okay?', pop01(t, P.t0 + 0.2 + i * 0.4, 0.25, 2.2), { size: 38, col: [BONE, PINK, LAV][i], tail: 'bl' })
      bubble(x, 800, 1130, 'yes, thank you', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: MINT, tail: 'br' })
    } },
  { sign: S, cap: 'Moved the couch | *for better energy?* Valid.', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.4, 1.2))
      bits(x, 'COUCH', lerp(840, 760, m), 1040, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.1, 0, m) })
      L(x, 800, 720, lt < 1.2 ? 'ENERGY: OFF' : 'ENERGY: ALIGNED', pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.2 ? STEEL : MINT, 0.04, 36)
    } },
  { sign: S, cap: 'Stopped for the sunset? | *Beauty matters.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      x.save(); x.beginPath(); x.rect(590, 600, 370, 420); x.clip()
      bits(x, 'SUN', 800, lerp(860, 960, clamp(lt / 2.4)), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { outline: null })
      x.restore()
      x.fillStyle = '#ff9a4a'; x.fillRect(590, 1020, 370, 14)
      L(x, 780, 1120, 'LATE. WORTH IT.', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 32)
    } },
]
const B_PILLOW = ['.WWWWWW.', 'WWLWWLWW', 'WWWWWWWW', 'WWLWWLWW', '.WWWWWW.']

const F = makeFilm({
  id: 'r2a0624', key: 'E', accent: ACC, solo: S, ending: 'group',
  title: 'Libra, you’re not | *too much.*',
  cameos: CAMEOS,
  group: { cap: 'Not too much. | *Exactly enough.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
