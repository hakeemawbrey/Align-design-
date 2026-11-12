// r2t0631: star_talk, ROLL CALL, "The signs | *decking the halls.*" (signs3kit social cut, music: lofi · C). Ending: callback.
//   ♈ tree up November 1st · ♉ hung cookies on the tree, ate them · ♊ changed the theme four times · ♋ every ornament
//   has a backstory · ♌ tree topper: themself · ♍ ornaments spaced with a ruler · ♎ moved one bauble forty times
//   · ♏ all-black tree, still festive · ♐ booked a flight instead · ♑ a budget for the tinsel · ♒ decorated a cactus
//   · ♓ cried at the first snowflake
//   group "Festive? | *Aggressively.*"   last "Taurus saved you | *one cookie.*" (the cookie tree, paid off)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, B, C, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -190 }
const TREE = [
  '.....Y.....',
  '....YYY....',
  '.....G.....',
  '....GGG....',
  '...GGRGG...',
  '..GGGGGGG..',
  '...GBGGG...',
  '..GGGGGRG..',
  '.GGRGGGGGG.',
  'GGGGGGBGGGG',
  '....DDD....',
  '....DDD....',
]
const TREE_C = (g = '#3fae5a', r = RED, b = SKYB, y = GOLD) => ({ G: g, R: r, B: b, Y: y, D: WOOD })
const BAUBLE = ['..KK..', '.RRRR.', 'RRWRRR', 'RRRRRR', 'RRRRRR', '.RRRR.']
const bauble = (x, cx, cy, cell, col, o) => drawBits(x, BAUBLE, { K: STEEL, R: col, W: '#ffffff' }, cx, cy, cell, o)
const CACTUS = ['....G....', '....G....', 'G..GGG...', 'G..GGG..G', 'GG.GGG..G', '.GGGGG.GG', '...GGGGG.', '...GGG...', '..PPPPP..', '..PPPPP..', '...PPP...']
const RULER = ['YYYYYYYYYYYYYYYY', 'YKYYYKYYYKYYYKYY', 'YKYKYKYKYKYKYKYY', 'YYYYYYYYYYYYYYYY']
// tree at (cx, cy) with cell size; returns the cell so callers can place things on it
const tree = (x, cx, cy, cell, cols = TREE_C(), o) => drawBits(x, TREE, cols, cx, cy, cell, o)
// blinking pixel fairy lights along a curve
function lights(x, t, pts, alpha = 1) {
  const cols = [GOLD, PINK, MINT, SKYB, '#ff6b5a']
  pts.forEach(([px, py], i) => { x.save(); x.globalAlpha = alpha * (0.45 + 0.55 * (Math.sin(t * 6 + i * 1.7) > 0 ? 1 : 0)); x.fillStyle = INK; x.fillRect(px - 9, py - 9, 18, 18); x.fillStyle = cols[i % cols.length]; x.fillRect(px - 6, py - 6, 12, 12); x.restore() })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Tree up by | *November first.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      tree(x, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.25, 2.4))
      L(x, 800, 620, 'NOV 1 · 12:01 AM', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.05, 32)
      sparkles(x, t, 800, 900, P.t0 + 0.5, 7, 190, 0.4)
    } },
  { sign: 'taurus', cap: 'Hung cookies on the tree. | *Ate them all.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      tree(x, 800, 900, 26 * k, TREE_C('#3fae5a', '#3fae5a', '#3fae5a'))
      const spots = [[760, 820], [840, 880], [740, 960], [860, 980], [800, 1040]]
      const left = 5 - Math.floor(clamp((lt - 0.6) / 1.2) * 5)
      if (k > 0.8) spots.slice(0, left).forEach(([a, b]) => bits(x, 'COOKIE', a, b, 7))
      L(x, 800, 1180, `ORNAMENTS: ${left}`, pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Changed the theme | *four times.* Today.', mood: lt => lt > 1.6 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.4) / 0.45))
      const th = [['PINK', PINK], ['DISCO', SKYB], ['BEACH', '#ffd23a'], ['GOTHIC', LAV]][n]
      tree(x, 800, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), TREE_C('#3fae5a', th[1], th[1]))
      L(x, 800, 640, `THEME: ${th[0]}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), th[1], 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Every ornament | has a *backstory.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bauble(x, 800, 960, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), '#ff9ac0')
      bubble(x, 790, 680, 'grandma made | this one…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1180, 'STORY 1 OF 86', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Tree topper? | *Themselves.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      tree(x, 800, 960, 26 * k, TREE_C('#3fae5a', RED, SKYB, '#3fae5a'))
      const d = ease.outCubic(prog(lt, 0.6, 1.1))
      if (lt > 0.6) friend(x, t, 'leo', 800, lerp(500, 760, d), 130, 1, { mood: 'sparkle' })
      L(x, 800, 1210, 'TOPPER: ME', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 34)
      sparkles(x, t, 800, 760, P.t0 + 1.1, 7, 120, 0.2)
    } },
  { sign: 'virgo', cap: 'Ornaments spaced | *with a ruler.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      ;[700, 800, 900].forEach((a, i) => bauble(x, a, 860, 13 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2), [RED, GOLD, SKYB][i]))
      drawBits(x, RULER, { Y: '#ffe27a', K: INK }, 800, 960, 18 * k)
      L(x, 800, 1130, 'GAP: 4.00 IN', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Moved one bauble | *forty times.*', mood: lt => lt > 1.8 ? 'happy' : 'neutral', look: lt => [Math.sin(lt * 5) > 0 ? 1 : 0, 0], star: ST,
    front(x, t, lt, P) {
      tree(x, 800, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), TREE_C('#3fae5a', '#3fae5a', '#3fae5a'))
      const px = 800 + Math.sin(lt * 5) * 80 * (lt < 1.8 ? 1 : 0)
      if (lt > 0.4) bauble(x, px, 930, 11, PINK)
      bubble(x, 800, 640, 'hmm… left?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'All-black tree. | *Still festive.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      tree(x, 800, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), TREE_C('#3a2a52', '#d0204a', '#7a4aa6', '#d0204a'), { outline: '#b9a6e6' })
      L(x, 800, 1180, 'MOODY + MERRY', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#c94a6a', 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Decorating? | They *booked a flight.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const fly = ease.inOutCubic(prog(lt, 0.8, 2.0))
      bits(x, 'PLANE', lerp(640, 960, fly), lerp(760, 620, fly), 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.3 })
      L(x, 800, 1190, 'BACK IN JANUARY', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Made a budget | for the *tinsel.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 330, head: 'TINSEL BUDGET', headBg: '#3fae5a', lines: [['tinsel · 2 m', INK], ['lights · 1 set', INK], ['joy · approved', '#3fae5a']], size: 30, progress: clamp((lt - 0.4) / 1.1) })
    } },
  { sign: 'aquarius', cap: 'Skipped the tree. | Decorated *a cactus.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CACTUS, { G: '#4fbf6a', P: '#c98f5a' }, 800, 930, 28 * k)
      if (lt > 0.8) lights(x, t, [[700, 820], [760, 850], [840, 830], [890, 880], [740, 930], [860, 960]])
      L(x, 800, 1180, 'TREES: TOO NORMAL', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#5fd1ff', 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cried at the | *first snowflake.*', mood: 'heart', look: [1, -1], tears: 3, star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) { const ph = ((t * 0.35 + i / 6) % 1 + 1) % 1; bits(x, 'SNOW', 660 + (i * 53) % 280 + Math.sin(ph * 6 + i) * 20, 620 + ph * 480, 10, { alpha: Math.sin(Math.PI * ph) }) }
      bits(x, 'TISSUE', 800, 1120, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 800, 680, 'it’s so pretty', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0631', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs | *decking the halls.*',
  cameos: CAMEOS,
  group: { cap: 'Festive? | *Aggressively.*' },
  last: {
    text: 'Taurus saved you | *one cookie.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.35, 2)
      friend(x, t, 'taurus', 430, 1200, 380, k, { mood: 'heart', look: [1, 0] })
      bits(x, 'COOKIE', 700, 1180, 28 * pop01(t, t - lt + 1.1, 0.35, 2))
      sparkles(x, t, 700, 1180, t - lt + 1.3, 7, 120, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
