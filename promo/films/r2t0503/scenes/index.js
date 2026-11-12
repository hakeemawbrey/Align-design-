// r2t0503: star_talk, SOLO (virgo), "Your Virgo sibling | be like." (signs3kit social cut, music: lofi · G).
// Nine cards: you borrowed their sweater, they noticed instantly · graded your birthday card · labelled everyone's
// snacks for the trip · made a "favourite child" spreadsheet · cleaned your room without asking · fact-checked your
// story at dinner · fixed your group-chat typo in four seconds · you got a cold, they brought a care binder ·
// split dessert with a ruler.
// Ending: callback (you returned the sweater… they refolded it).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, steam, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff9ec7', ST = { x: -180 }, SG = 'virgo'
const SWEATER = ['..SS..SS..', '.SSSWWSSS.', 'SSSSSSSSSS', 'SSSSSSSSSS', 'SS.SSSS.SS', 'SS.SSSS.SS', 'SS.SSSS.SS', '...SSSS...']
const FOLDED = ['SSSSSSSSSS', 'SWWSSSSWWS', 'SSSSSSSSSS', 'SSSSSSSSSS', 'DDDDDDDDDD', 'SSSSSSSSSS', 'SSSSSSSSSS']
const SW_C = { S: '#7dd18a', W: BONE, D: '#4f9a5c' }
const RULER = ['YYYYYYYYYYYYYYYY', 'YKYKYKYKYKYKYKYK', 'YYYYYYYYYYYYYYYY']

const CAMEOS = [
  { sign: SG, cap: 'Borrowed their sweater? | They *noticed instantly.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha = 0.35; drawBits(x, SWEATER, SW_C, 800, 860, 22 * k, { outline: null }); x.restore()
      x.save(); x.setLineDash([16, 12]); x.strokeStyle = BONE; x.lineWidth = 5; x.globalAlpha = k; x.strokeRect(680, 760, 240, 200); x.restore()
      L(x, 800, 1060, 'SWEATER: MISSING', pop01(t, P.t0 + 0.8, 0.3, 2.4), RED, -0.04, 32)
      bubble(x, 800, 660, '…it’s mine.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: SG, cap: 'Wrote your birthday card. | Then *graded it.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 300, head: 'HAPPY BDAY!', headBg: PINK, headInk: INK, lines: ['your so great', 'love u'], size: 34 })
      if (lt > 0.9) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(690, 800); x.lineTo(690 + 80 * clamp((lt - 0.9) / 0.3), 800); x.stroke(); x.restore() }
      L(x, 930, 700, 'B+', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, 0.12, 52)
      L(x, 800, 1070, '“YOU’RE”. SEE ME.', pop01(t, P.t0 + 1.7, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: SG, cap: 'Family road trip? | *Labelled* everyone’s snacks.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const NAMES = ['MOM', 'DAD', 'YOU']
      NAMES.forEach((n, i) => { bits(x, 'BOX', 680 + i * 125, 880, 11 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2)); L(x, 680 + i * 125, 960, n, pop01(t, P.t0 + 0.5 + i * 0.3, 0.3, 2.2), [SKYB, MINT, GOLD][i], 0.05 * (i - 1), 26) })
      L(x, 800, 720, 'DO NOT SWAP', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: SG, cap: 'Mom’s favourite? | They made *a spreadsheet.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 360, h: 330, head: 'FAVOURITE CHILD', headBg: MINT, headInk: INK, lines: ['1. me', '2. the dog', '3. you'], size: 36, align: 'left', progress: clamp((lt - 0.4) / 1.1) })
      L(x, 800, 1100, 'DATA DOESN’T LIE', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: SG, cap: 'Cleaned your room. | *Without asking.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      bits(x, 'BROOM', 760, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 * Math.sin(t * 8) })
      sparkles(x, t, 820, 860, P.t0 + 0.8, 8, 200, 0.2); sparkles(x, t, 820, 860, P.t0 + 1.5, 8, 200, 1.1)
      L(x, 800, 670, 'ALSO: ALPHABETISED', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 28)
      bubble(x, 800, 1110, 'you’re welcome.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: SG, cap: 'Fact-checked your story. | *At dinner.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 1000, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'actually, | it was Tuesday.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1140, 'SOURCE: ME', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Group-chat typo? | Fixed in *four seconds.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FAMILY CHAT', headCol: MINT, lines: [['see u tmrw', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['*tomorrow', PINK, pop01(t, P.t0 + 1.1, 0.25, 2.2), true], ['*see you', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.2), true]], size: 22 })
    } },
  { sign: SG, cap: 'You got a cold. | They brought *a binder.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 320, head: 'CARE PLAN', headBg: SKYB, headInk: INK, lines: ['12:00  soup', '12:30  tea', '1:00   nap'], size: 34, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1090, 'TAB 4: HUGS', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: SG, cap: 'Split the dessert. | With *a ruler.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 900); x.scale(k, k); x.fillStyle = INK; x.fillRect(-134, -64, 268, 128); x.fillStyle = '#e8b36a'; x.fillRect(-126, -56, 252, 112); x.fillStyle = PINK; x.fillRect(-126, -56, 252, 30); x.restore() }
      const d = ease.outCubic(prog(lt, 0.6, 1.0))
      drawBits(x, RULER, { Y: GOLD, K: INK }, 800, lerp(640, 900, d), 13, { rot: Math.PI / 2, alpha: clamp(d * 3) })
      L(x, 800, 1080, 'EXACTLY 50/50', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0503', key: 'G', accent: ACC, solo: SG, ending: 'callback',
  title: 'Your Virgo sibling | *be like.*',
  cameos: CAMEOS,
  card: { a: 'virgo', b: 'gemini', chip: 'ALIGNED' },
  group: { cap: 'Annoying. | *Always right.*', mood: 'squint' },
  last: {
    text: 'Sweater returned. | They *refolded it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, SG, 380, 1080, 260 * k, { mood: lt > 1.3 ? 'sparkle' : 'squint', seed: 7, look: [1, 0], hops: [t0 + 1.35] })
      const f = lt > 1.1
      drawBits(x, f ? FOLDED : SWEATER, SW_C, 760, 1060, (f ? 20 : 18) * pop01(t, t0 + (f ? 1.1 : 0.5), 0.3, 2), { rot: f ? 0 : 0.25 })
      L(x, 760, 1230, 'NOW IT’S RIGHT', pop01(t, t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 760, 1060, t0 + 1.1, 7, 150, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
