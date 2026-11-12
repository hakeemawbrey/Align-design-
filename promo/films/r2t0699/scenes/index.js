// r2t0699: star_talk, BELIKE, "One slice left? | Zodiacs be like." (signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme version of itself over the last slice of pizza. Ending: lesson.
//   ♈ already ate it · ♉ ordered three backup pizzas · ♊ argued with themself · ♋ saved it for you (foil) · ♌ gave an
//   acceptance speech · ♍ measured it · ♎ split it twelve ways · ♏ checked everyone's chart for the thief · ♐ threw it
//   like a frisbee · ♑ auctioned it · ♒ put pineapple on it · ♓ gave it to their match, cried
//   group "Twelve signs. | *One slice.*"  LESSON "The last slice is nice. | *Sharing is nicer.*"  last "Next time? | *Two pizzas.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, chart, friend, RED, CREAM, STEEL, WOOD, clamp, ease, prog, lerp } from './props.js'

const ST = { x: -200 }
const slice = (x, cx, cy, cell, o) => bits(x, 'PIZZA', cx, cy, cell, o)
const PINE = ['..G.G..', '...G...', '.YYYYY.', 'YYKYKYY', 'YKYYYKY', 'YYKYKYY', '.YYYYY.']
const GAVEL = ['WWWWWW....', 'WWWWWW....', 'WWWWWW....', '...WW.....', '...WW.....', '...WW.....', '...WW.....']
const RULER = ['YYYYYYYYYYYYYYYY', 'YKYKYKYKYKYKYKYK', 'YKYYYKYYYKYYYKYY', 'YYYYYYYYYYYYYYYY']

const CAMEOS = [
  { sign: 'aries', cap: 'One slice left. | Aries *already ate it.*', mood: lt => lt > 0.8 ? 'wink' : 'wide', look: [1, 0], star: ST, hops: [0.4, 0.7],
    front(x, t, lt, P) {
      if (lt < 0.7) slice(x, 790, 880, 22 * pop01(t, P.t0 + 0.1, 0.3, 2))
      else { x.fillStyle = '#c98f2a'; for (let i = 0; i < 6; i++) x.fillRect(720 + i * 26, 960 + (i % 2) * 14, 12, 10) }
      if (lt > 0.8) L(x, 790, 760, 'GONE.', pop01(t, P.t0 + 0.8, 0.3, 2.4), RED, -0.05, 56)
      if (lt > 1.4) L(x, 790, 1100, 'TIME: 0.2 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'One slice left? | Taurus *ordered three more.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BOX', 790 + (i % 2 ? 12 : -8), 1040 - i * 95, 20 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2))
      L(x, 790, 680, 'BACKUP PIZZA ×3', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'One slice left. | Gemini *argued with themself.*', mood: lt => Math.floor(lt * 3) % 2 ? 'squint' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      slice(x, 790, 920, 18 * pop01(t, P.t0 + 0.1, 0.3, 2))
      bubble(x, 700, 660, 'eat it', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 860, 760, 'DON’T', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'br', col: '#ffd23a' })
    } },
  { sign: 'cancer', cap: 'One slice left. | Cancer *saved it for you.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const w = clamp((lt - 0.5) / 0.6)
      slice(x, 790, 900, 22 * pop01(t, P.t0 + 0.1, 0.3, 2))
      if (w > 0) { x.save(); x.globalAlpha = 0.85 * w; x.fillStyle = '#d8dbe8'; x.fillRect(690, 800, 200, 200); x.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) x.fillRect(700 + i * 38, 810 + (i % 2) * 60, 18, 18); x.restore() }
      L(x, 790, 1110, 'FOR YOU ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 38)
    } },
  { sign: 'leo', cap: 'Got the last slice. | Gave *a speech.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      slice(x, 520, 980, 12 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: -0.3 })
      bubble(x, 790, 720, 'I’d like to | thank my fans…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 1060, 'ACCEPTANCE SPEECH', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'One slice left. | Virgo *measured it.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      slice(x, 790, 860, 22 * pop01(t, P.t0 + 0.1, 0.3, 2))
      drawBits(x, RULER, { Y: '#ffe76a', K: INK }, 790, 1010, 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.03 })
      L(x, 790, 680, 'EXACTLY 1/8 ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'One slice left. | Split it *twelve ways.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 11)
      for (let i = 0; i < n; i++) slice(x, 680 + (i % 4) * 72, 760 + Math.floor(i / 4) * 110, 7, { rot: (i % 3 - 1) * 0.2 })
      L(x, 790, 1120, 'FAIR. VERY FAIR.', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Slice vanished. | Scorpio *checked charts.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 860, 140, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      bits(x, 'LENS', 860, 940, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 1110, 'SUSPECT: ARIES', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'One slice left. | Sag *threw it like a frisbee.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      const f = clamp((lt - 0.5) / 1.2)
      slice(x, lerp(460, 880, f), 900 - Math.sin(Math.PI * f) * 240, 14, { rot: t * 12 })
      bubble(x, 800, 1080, 'CATCH!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'One slice left. | Capricorn *auctioned it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      slice(x, 820, 880, 18 * pop01(t, P.t0 + 0.1, 0.3, 2))
      drawBits(x, GAVEL, { W: WOOD }, 600, 760, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: lt > 1.2 ? 0.5 : -0.2 })
      L(x, 800, 1110, lt > 1.2 ? 'SOLD!' : 'DO I HEAR TEN?', 1, lt > 1.2 ? MINT : GOLD, -0.04, 38)
    } },
  { sign: 'aquarius', cap: 'One slice left. | Aquarius *added pineapple.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      slice(x, 790, 900, 22 * pop01(t, P.t0 + 0.1, 0.3, 2))
      drawBits(x, PINE, { G: '#4fbf6a', Y: '#ffd23a', K: '#c98f2a' }, 790, 680 + 120 * ease.outCubic(clamp((lt - 0.4) / 0.6)), 14)
      L(x, 790, 1110, 'BOLD CHOICE', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Gave the last slice | *to their match.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', look: [1, 0], tears: lt => lt > 0.9 ? 3 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const f = ease.inOutCubic(clamp((lt - 0.4) / 0.8))
      friend(x, t, 'cancer', 820, 980, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0] })
      slice(x, lerp(520, 780, f), lerp(960, 830, f), 12)
      bubble(x, 790, 660, 'for you…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
]

const F = makeFilm({
  id: 'r2t0699', key: 'D', accent: '#ffb34a', ending: 'lesson',
  title: 'One slice left? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One slice.*' },
  lesson: { text: 'The last slice is nice. | *Sharing is nicer.*', chip: 'SLICES: SHARED' },
  last: {
    text: 'Next time? | *Two pizzas.*',
    draw(x, t, lt) { for (let i = 0; i < 2; i++) slice(x, 440 + i * 200, 1500, 16 * pop01(t, t - lt + 0.7 + i * 0.25, 0.35, 2), { rot: (i ? 0.2 : -0.2) }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
