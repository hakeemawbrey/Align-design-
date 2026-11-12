// r2t0652: star_talk, BELIKE, "Hydration era? | Zodiacs *be like.*" (topic: zodiacs trying to drink more water;
// signs3kit social cut, music: lofi · E). Twelve signs in zodiac order:
//   ♈ chugged a gallon in one go · ♉ only if it's a smoothie · ♊ bought six bottles, lost all six · ♋ refilled everyone's
//   glass, forgot their own · ♌ bedazzled the bottle · ♍ filtered it, filtered it again · ♎ picked a cute bottle, never
//   filled it · ♏ glass of water, intense eye contact · ♐ only drinks from waterfalls · ♑ tracks sips in a spreadsheet
//   · ♒ made their own water, somehow · ♓ cried more than they drank.
// Ending: lesson. group "Twelve bottles. | *One sip.*", LESSON "Small sips count. | *Be kind to you.*" STATUS: HYDRATED,
// last "Drink some water. | *Cancer said so.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', ST = { x: -170 }
const WATER = '#8fe3ff', GLASSC = '#d8f4ff'

const GLASS = ['G......G', 'G......G', 'GWWWWWWG', 'GWWWWWWG', 'GWWWWWWG', 'GWWWWWWG', '.GWWWWG.', '.GGGGGG.']
const GLASS_C = { G: GLASSC, W: WATER }
const EMPTYGLASS = ['G......G', 'G......G', 'G......G', 'G......G', 'G......G', 'G......G', '.G....G.', '.GGGGGG.']
const JUG = ['...KKK....', '...KKK....', '..WWWWWW..', '.WWWWWWWWW', 'WWWWWWWW.W', 'WBBBBBBW.W', 'WBBBBBBWWW', 'WBBBBBBW..', 'WBBBBBBW..', '.WWWWWW...']
const JUG_C = { K: '#4fbf6a', W: GLASSC, B: WATER }
const JUG_E = ['...KKK....', '...KKK....', '..WWWWWW..', '.WWWWWWWWW', 'WWWWWWWW.W', 'W......W.W', 'W......WWW', 'W......W..', 'W......W..', '.WWWWWW...']
const BOTTLE = ['..KK..', '..KK..', '.WWWW.', 'WBBBBW', 'WLLLLW', 'WLLLLW', 'WBBBBW', 'WBBBBW', '.WWWW.']
const BOTTLE_C = { K: '#2a2350', W: GLASSC, B: WATER, L: PINK }
const SMOOTHIE = ['.....S', '....S.', 'WWWSWWW', 'WPPPPPW', 'WPPPPPW', '.WPPPW.', '.WPPPW.', '..WWW..']
const SMOOTHIE_C = { S: RED, W: GLASSC, P: PINK }
const PITCHER = ['.WWWWWW.', 'WWWWWWWWW', 'WKKKKKKW.W', 'WBBBBBBW.W', 'WBBBBBBWW.', 'WBBBBBBW..', 'WBBBBBBW..', '.WWWWWW...']
const PITCHER_C = { W: GLASSC, K: STEEL, B: WATER }
const FLASK = ['..WW..', '..WW..', '..WW..', '.WBBW.', 'WBBBBW', 'WBBBBW', 'WBBBBW', '.WWWW.']
const FLASK_C = { W: GLASSC, B: MINT }

// a pixel waterfall pouring off a cliff
function waterfall(x, t, cx, top, h, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = '#7a86b8'; x.fillRect(cx - 160, top - 40, 200, 60)
  for (let i = 0; i < 8; i++) {
    const col = i % 2 ? WATER : '#bfeeff'
    x.fillStyle = col; x.fillRect(cx - 40 + i * 12, top + 10, 12, h)
    for (let j = 0; j < 4; j++) { const ph = ((t * 1.6 + j / 4 + i * 0.13) % 1); x.fillStyle = '#ffffff'; x.fillRect(cx - 40 + i * 12 + 2, top + 10 + ph * h, 8, 14) }
  }
  x.fillStyle = '#bfeeff'; x.fillRect(cx - 80, top + h, 180, 24)
  x.restore()
}
// sip spreadsheet: a grid of cells filling in
function spreadsheet(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -140, 316, 300)
  x.fillStyle = INK; x.fillRect(-166, -156, 332, 312)
  x.fillStyle = CREAM; x.fillRect(-158, -148, 316, 296)
  x.fillStyle = '#2fc79a'; x.fillRect(-158, -148, 316, 56)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SIPS_FINAL_v7', 0, -120)
  const n = Math.floor(clamp((lt - 0.3) / 1.4) * 20)
  for (let i = 0; i < 20; i++) {
    const c = i % 4, r = Math.floor(i / 4), px = -140 + c * 72, py = -78 + r * 44
    x.fillStyle = i < n ? WATER : '#e6dccb'; x.fillRect(px, py, 64, 36)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Chugged a gallon. | *In one go.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const empty = lt > 1.1
      drawBits(x, empty ? JUG_E : JUG, JUG_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 0.5 && !empty ? -0.4 : 0.05 })
      L(x, 790, 640, 'GO GO GO', pop01(t, P.t0 + 0.4, 0.3, 2.2), RED, 0.05, 40)
      L(x, 790, 1090, 'DONE. NEXT?', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Water? Only if | it’s *a smoothie.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 700, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - prog(lt, 0.8, 1.0) })
      drawBits(x, SMOOTHIE, SMOOTHIE_C, 820, 880, 22 * pop01(t, P.t0 + 1.0, 0.3, 2))
      bubble(x, 790, 650, 'plain? no.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1100, 'TECHNICALLY WET', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Bought six bottles. | Lost *all six.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) {
        const c = i % 3, r = Math.floor(i / 3)
        const gone = lt > 0.9 + i * 0.12
        drawBits(x, BOTTLE, BOTTLE_C, 690 + c * 100, 800 + r * 170, 13 * pop01(t, P.t0 + 0.2 + i * 0.06, 0.3, 2), { alpha: gone ? 0 : 1 })
      }
      L(x, 790, 1110, 'BOTTLES: ???', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 34)
      bubble(x, 790, 640, 'wait, where—', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Refilled everyone’s glass. | *Forgot their own.*', mood: lt => lt > 1.5 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, GLASS, GLASS_C, 680 + i * 110, 900, 12 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2))
      drawBits(x, EMPTYGLASS, GLASS_C, 470, 1090, 12 * pop01(t, P.t0 + 1.4, 0.3, 2))
      L(x, 790, 720, 'TOP-UPS ♡', pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, 0.05, 36)
      L(x, 790, 1100, 'THEIRS: EMPTY', pop01(t, P.t0 + 1.6, 0.3, 2.4), STEEL, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Bedazzled the bottle. | *Seen everywhere.*', mood: 'sparkle', star: ST, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOTTLE, { ...BOTTLE_C, L: GOLD, B: '#ffe7a8' }, 790, 860, 24 * k, { rot: 0.08 })
      for (let i = 0; i < 6; i++) { const a = i * 1.1 + t * 1.5; sparkles(x, t, 790 + Math.cos(a) * 20, 860 + Math.sin(a) * 60, P.t0 + 0.6 + i * 0.25, 5, 120, i) }
      L(x, 790, 640, '✦ 900 GEMS ✦', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, 0.05, 36)
      bubble(x, 790, 1100, 'sip with style', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Filtered it. | Filtered *it again.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PITCHER, PITCHER_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 7)
      L(x, 790, 640, `FILTER PASS ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), MINT, 0.05, 36)
      bubble(x, 790, 1100, 'almost clean', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Bought a cute bottle. | *Never filled it.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, { ...BOTTLE_C, B: '#140c30', L: '#ffc2d6' }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      hearts(x, t, 790, 760, P.t0 + 0.6, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 6 })
      L(x, 790, 640, 'SO AESTHETIC', pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, 0.05, 36)
      L(x, 790, 1100, 'CONTENTS: AIR', pop01(t, P.t0 + 1.5, 0.3, 2.4), STEEL, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Glass of water. | *Intense eye contact.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const shake = lt > 0.8 ? Math.sin(t * 40) * 4 : 0
      drawBits(x, GLASS, GLASS_C, 790 + shake, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'STARING CONTEST', pop01(t, P.t0 + 0.5, 0.3, 2.2), LAV, 0.05, 32)
      bubble(x, 790, 1100, 'the water blinked', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Tap water? | Only *waterfalls.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    back(x, t, lt, P) { waterfall(x, t, 820, 620, 420, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 1110, 'HIKED 3 HOURS. SIP.', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Tracks every sip. | In *a spreadsheet.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      spreadsheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 790, 1100, 'GOAL: ON TRACK', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Made their own water. | *Somehow.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, FLASK, FLASK_C, 700, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      drawBits(x, FLASK, { ...FLASK_C, B: LAV }, 880, 900, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.1 })
      if (lt > 1.2) sparkles(x, t, 790, 860, P.t0 + 1.2, 8, 160, 0.4, [MINT, SKYB, BONE])
      L(x, 790, 650, 'H + H + O', pop01(t, P.t0 + 0.7, 0.3, 2.2), MINT, 0.05, 40)
      L(x, 790, 1100, 'IT WORKED??', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Cried more | than *they drank.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 790, 900, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'IN: 1 GLASS', pop01(t, P.t0 + 0.5, 0.3, 2.2), SKYB, 0.05, 34)
      L(x, 790, 1090, 'OUT: A RIVER', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0652', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Hydration era? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve bottles. | *One sip.*' },
  lesson: { text: 'Small sips count. | *Be kind to you.*', chip: 'STATUS: HYDRATED' },
  last: {
    text: 'Drink some water. | *Cancer said so.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
