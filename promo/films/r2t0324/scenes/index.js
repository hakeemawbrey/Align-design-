// r2t0324: star_talk, BELIKE, "Zodiacs at dessert | be like." (signs3kit social cut, music: lofi · D). Ending: lesson.
//   ♈ ate it before it landed · ♉ hugged the cake · ♊ tried everyone's · ♋ saved you a slice and a backup slice
//   · ♌ a sparkler, for no reason · ♍ perfect squares · ♎ compatibility check, cake vs pie · ♏ guarding the last bite
//   · ♐ the spiciest ice cream · ♑ split the bill per crumb · ♒ dessert for breakfast, on principle · ♓ matched with the
//   tiramisu, sobbing.  49.2 "Dinner was | the warm-up."  52.4 LESSON  58.3 "Aries already | ate yours."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const CAKE = ['....Y.Y.Y....', '....R.R.R....', '.PPPPPPPPPPP.', '.PWWWWWWWWWP.', '.PPPPPPPPPPP.', 'CCCCCCCCCCCCC', 'CCCCCCCCCCCCC', 'KKKKKKKKKKKKK']
const CAKE_C = { Y: GOLD, R: RED, P: PINK, W: CREAM, C: '#fff0f5', K: INK }
const SLAB = ['PPPPPPPPPPPP', 'WWWWWWWWWWWW', 'CCCCCCCCCCCC', 'CCCCCCCCCCCC', 'WWWWWWWWWWWW', 'CCCCCCCCCCCC', 'CCCCCCCCCCCC']
const SLICE = ['......PP', '....PPWW', '..PPWWCC', 'PPWWCCCC', 'WWCCCCCC', 'CCCCCCCC', 'KKKKKKKK']
const PIE = ['..OOOOOOOO..', '.OYOYOYOYOO.', 'OOOOOOOOOOOO', 'KKKKKKKKKKKK', '.KKKKKKKKKK.']
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.']
const CONE = ['..PPPP..', '.PRPPRP.', 'PPPRPPPP', '.PPPPPP.', 'KOOOOOOK', '.KOOOOK.', '.KOOOOK.', '..KOOK..', '..KOOK..', '...KK...']
const TIRA = ['BBBBBBBBBBBB', 'CCCCCCCCCCCC', 'BBBBBBBBBBBB', 'CCCCCCCCCCCC', 'BBBBBBBBBBBB', 'KKKKKKKKKKKK']
const FORK = ['K.K.K', 'K.K.K', 'KKKKK', '..K..', '..K..', '..K..', '..K..', '..K..']
const CLOCK = ['..KKKKK..', '.KWWWWWK.', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKKKWK', 'KWWWWWWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']

const R = { x: -160 }
const CAMEOS = [
  { sign: 'aries', cap: 'Ate it before | it *landed.*', mood: lt => lt > 0.8 ? 'sparkle' : 'wide', star: R, hops: [0.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      drawBits(x, PLATE, { W: CREAM }, 790, lerp(620, 1000, ease.outCubic(prog(lt, 0.1, 0.9))), 18 * k)
      if (lt < 0.45) drawBits(x, SLICE, { P: PINK, W: CREAM, C: '#e8a24a', K: INK }, 790, lerp(580, 760, lt / 0.45), 16 * k)
      L(x, 790, 760, 'TIME: 0.4 SEC', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 34)
      bubble(x, 540, 600, 'more?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Hugged the cake. | *Mine now.*', mood: 'heart', star: { x: -120, s: 280 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 700, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 620, 820, P.t0 + 0.8, { n: 6, life: 1.8, spread: 240, cell: 7, seed: 2 })
      L(x, 800, 640, 'DO NOT DISTURB', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Tried a bite | of *everyone’s.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: 0, y: -20, s: 260 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2)
        const cx = 200 + i * 227, bite = lt > 0.6 + i * 0.35
        drawBits(x, PLATE, { W: CREAM }, cx, 1110, 12 * k)
        drawBits(x, bite ? SLICE.slice(2) : SLICE, { P: [PINK, MINT, GOLD, LAV][i], W: CREAM, C: '#e8a24a', K: INK }, cx, 1070, 11 * k)
      }
      bubble(x, 540, 620, 'just one bite!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Saved you a slice. | *And a backup.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: R,
    front(x, t, lt, P) {
      drawBits(x, SLICE, { P: PINK, W: CREAM, C: '#e8a24a', K: INK }, 720, 980, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SLICE, { P: MINT, W: CREAM, C: '#e8a24a', K: INK }, 870, 980, 16 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 720, 840, 'YOU', pop01(t, P.t0 + 0.4, 0.3, 2), PINK, -0.05, 32)
      L(x, 870, 840, 'BACKUP', pop01(t, P.t0 + 1.1, 0.3, 2), MINT, 0.05, 32)
      bubble(x, 790, 640, 'in case.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Asked for a sparkler. | *No reason.*', mood: 'sparkle', star: R, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAKE.slice(2), CAKE_C, 790, 1020, 18 * k)
      if (k > 0.9) { x.fillStyle = '#c9c9d8'; x.fillRect(786, 880, 8, 90); sparkles(x, t, 790, 870, P.t0 + 0.5 + Math.floor(lt * 3) * 0.33, 6, 50, lt, [GOLD, '#ffffff', '#ffb34a']) }
      bubble(x, 790, 660, 'it’s my | un-birthday.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Cut it into | *perfect squares.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SLAB, { P: PINK, W: CREAM, C: '#e8a24a' }, 790, 900, 24 * k)
      if (k > 0.9) {
        x.fillStyle = INK
        const n = Math.floor(clamp((lt - 0.4) / 1.0) * 6)
        for (let i = 1; i <= Math.min(3, n); i++) x.fillRect(790 - 144 + i * 72 - 3, 816, 6, 168)
        for (let j = 1; j <= Math.max(0, n - 3); j++) x.fillRect(646, 816 + j * 42 - 3, 288, 6)
      }
      L(x, 790, 1100, '16 EQUAL. CHECKED.', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Compatibility check: | *cake vs. pie.*', mood: lt => lt > 1.9 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: -40, s: 260 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 250, 1060, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PIE, { O: '#e8a24a', Y: '#ffd23a', K: INK }, 830, 1080, 14 * pop01(t, P.t0 + 0.35, 0.3, 2))
      L(x, 540, 1160, 'MATCH: BOTH ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.03, 34)
      bubble(x, 540, 600, Math.floor(lt * 2.5) % 2 ? 'pie?' : 'cake?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Guarding the last bite. | *Don’t.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: CREAM }, 790, 1000, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SLICE.slice(3), { P: PINK, W: CREAM, C: '#e8a24a', K: INK }, 790, 975, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      x.save(); x.globalAlpha = 0.35 * clamp((lt - 0.6) / 0.3); x.fillStyle = LAV; x.beginPath(); x.ellipse(790, 990, 160, 60, 0, 0, Math.PI * 2); x.fill(); x.restore()
      L(x, 790, 760, 'MINE.', pop01(t, P.t0 + 0.9, 0.3, 2.4), LAV, -0.05, 44)
    } },
  { sign: 'sagittarius', cap: 'Ordered the spiciest | *ice cream.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: 160 }, hops: [1.3, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CONE, { P: '#ff6b5a', R: RED, O: '#e8a24a', K: INK }, 300, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 300, 1100, 'GHOST PEPPER SWIRL', pop01(t, P.t0 + 0.6, 0.3, 2.4), RED, -0.04, 28)
      bubble(x, 760, 620, 'AMAZING!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Split the bill. | *Per crumb.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(310, 850); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -200, 260, 400); x.fillStyle = CREAM; x.fillRect(-122, -192, 244, 384)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        ;['CAKE SPLIT', '----------', 'crumb 1  A', 'crumb 2  B', 'crumb 3  A', 'crumb 4  C', 'crumb 5  B', '...'].forEach((l, i) => { if (lt > 0.3 + i * 0.15) x.fillText(l, -104, -160 + i * 44) })
        x.restore()
      }
      L(x, 310, 1110, 'FAIR. TO THE CRUMB.', pop01(t, P.t0 + 1.6, 0.3, 2.4), '#2fc79a', 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Dessert for breakfast. | *On principle.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, CLOCK, { K: INK, W: CREAM }, 790, 700, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 840, '8:00 A.M.', pop01(t, P.t0 + 0.4, 0.3, 2), SKYB, 0.04, 34)
      drawBits(x, CAKE, CAKE_C, 790, 1020, 16 * pop01(t, P.t0 + 0.9, 0.3, 2))
      bubble(x, 540, 600, 'rules are | a suggestion.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Matched with tiramisu. | *Sobbing.*', mood: lt => lt < 0.8 ? 'heart' : 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TIRA, { B: '#8a4a2e', C: '#fff4e2', K: INK }, 790, 950, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'IT’S A MATCH ✦', pop01(t, P.t0 + 0.6, 0.3, 2.4), GOLD, -0.04, 34)
      hearts(x, t, 790, 900, P.t0 + 1.0, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0324', key: 'D', accent: '#ff8fb1', ending: 'lesson',
  title: 'Zodiacs at dessert | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Dinner was | *the warm-up.*' },
  lesson: { text: 'Life is short. | *Order the dessert.*', chip: 'STATUS: SWEET' },
  last: {
    text: 'Aries already | *ate yours.*',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
