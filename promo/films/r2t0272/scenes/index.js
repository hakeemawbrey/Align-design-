// r2t0272: star_talk, BE LIKE, "Zodiacs asked for | the recipe *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, each one's most extreme answer to "can I have the recipe?". Ending: callback (Scorpio's secret ingredient).
//   ♈ step one: maximum heat · ♉ gave the recipe, kept the leftovers · ♊ sent seven recipes, none of them this one
//   · ♋ it's nana's, locked in a vault · ♌ signed the recipe card · ♍ a twelve-page doc with footnotes · ♎ sent the
//   version for your sign · ♏ gave it, left out one thing · ♐ "just vibes", no measurements · ♑ launched a cookbook
//   · ♒ invented it, can't repeat it · ♓ you liked it?? happy tears
//   group "Ask for a recipe. | *Get a saga.*"   callback "Scorpio’s ingredient? | *Still a secret.*" (the ??? jar returns)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ST = { x: -170 }
const FLAME = [['....R.....', '...RR..R..', '..RRYR.RR.', '.RRYYRRRR.', '.RYYYYYRR.', 'RRYYWYYYRR', 'RYYWWWYYYR', '.RYYWWYYR.', '..RRRRRR..'], { R: RED, Y: ORANGE, W: GOLD }]
const POT = [['...KKKKKK...', '..K......K..', 'GGGGGGGGGGGG', 'KGGGGGGGGGGK', '.GGGGGGGGGG.', '.GGGGGGGGGG.', '.GGGGGGGGGG.', '..GGGGGGGG..'], { G: '#9aa5c4', K: INK }]
const VAULT = [['SSSSSSSSSSS', 'SDDDDDDDDDS', 'SDDDDDDDDDS', 'SDDDYYYDDDS', 'SDDDYKYDDDS', 'SDDDYYYDDDS', 'SDDDDDDDDDS', 'SDDDDDDDDDS', 'SSSSSSSSSSS', '.S.......S.'], { S: '#9aa5c4', D: SLATE, Y: GOLD, K: INK }]
const JAR = [['.KKKKKKK.', '.WWWWWWW.', 'WWWWWWWWW', 'WPPPPPPPW', 'WPPPPPPPW', 'WPPPPPPPW', 'WPPPPPPPW', 'WWWWWWWWW'], { K: WOOD, W: '#cfe8ff', P: '#6b4aa8' }]
const BULB = [['..YYYY..', '.YYYYYY.', 'YYYWYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..SSSS..', '..SSSS..'], { Y: GOLD, W: '#fff', S: '#9aa5c4' }]

// a little jar labelled ??? (Scorpio's missing ingredient)
function secretJar(x, cx, cy, k, cell = 20) {
  if (k <= 0.01) return
  drawBits(x, JAR[0], JAR[1], cx, cy, cell * k, { rot: 0.05 })
  x.save(); x.translate(cx, cy + cell * 0.6 * k); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = PAPER; x.fillRect(-cell * 3, -cell * 1.1, cell * 6, cell * 2.2)
  x.fillStyle = INK; x.font = `800 ${Math.round(cell * 1.6)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('???', 0, 2)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Step one: | *maximum heat.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, FLAME[0], FLAME[1], 790, 800 + Math.sin(t * 20) * 4, 24 * k * (1 + 0.06 * Math.sin(t * 13)))
      drawBits(x, POT[0], POT[1], 790, 960, 18 * k)
      label(x, 790, 640, 'DONE IN 4 MIN', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Gave you the recipe. | *Kept the leftovers.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, POT[0], POT[1], F.x + 150, F.cy + 70, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      note(x, 800, 700, pop01(t, P.t0 + 0.5, 0.3, 2), 'flour | butter | love', { head: 'RECIPE', headBg: PINK, size: 34, w: 280 })
      label(x, 820, 1080, 'POT STAYS HERE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Sent seven recipes. | *None of them this one.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const n = Math.min(7, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.22))
      phone(x, 790, 820, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: `+${n}`, head: 'NEW MESSAGE', msg: ['soup?', 'pie?', 'tacos?', 'ramen?', 'cake??', 'chili!', 'a salad'][n - 1], bg: LAV })
    } },
  { sign: 'cancer', cap: 'It’s nana’s. | *Locked in a vault.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, VAULT[0], VAULT[1], 790, 820, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 1070, 'family only.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
    } },
  { sign: 'leo', cap: 'Sure! | *Signed the recipe card.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'cook with | confidence.', { head: 'LEO’S LASAGNA', headBg: GOLD, size: 38, w: 360 })
      label(x, 820, 980, '♌ xoxo, Leo', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.06 })
      sparkles(x, t, 790, 820, P.t0 + 1.0, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Sent twelve pages. | *With footnotes.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 2; i >= 0; i--) note(x, 790 + i * 22, 800 - i * 22, pop01(t, P.t0 + 0.2 + (2 - i) * 0.15, 0.3, 2), i ? ' | | ' : 'step 1 of 48 | see note ³', { head: i ? ' ' : 'PAGE 1/12', headBg: SKYB, size: 34, w: 330 })
      label(x, 790, 1060, 'APPENDIX B', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Sent the version | *for your sign.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'wait, what’s | your sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
      note(x, 790, 920, pop01(t, P.t0 + 1.0, 0.3, 2), 'extra cheese | for a Leo', { head: 'VERSION 3', headBg: PINK, size: 34, w: 320 })
    } },
  { sign: 'scorpio', cap: 'Gave you the recipe. | *Left out one thing.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      note(x, 800, 720, pop01(t, P.t0 + 0.2, 0.3, 2), 'garlic | lemon | ▇▇▇▇', { head: 'RECIPE', headBg: RED, size: 36, w: 300 })
      secretJar(x, F.x + 20, F.cy - 230, pop01(t, P.t0 + 1.1, 0.3, 2), 15)
      label(x, 800, 1060, 'CLASSIFIED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: '“Just vibes.” | *No measurements.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'some flour | a lot of joy | until it’s done', { head: 'RECIPE-ISH', headBg: ORANGE, size: 34, w: 360 })
      bubble(x, 790, 1060, 'you’ll feel it.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Recipe? | *Launched a cookbook.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'book', 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      label(x, 790, 640, 'VOLUME ONE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'PRE-ORDER NOW', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented it. | *Can’t make it again.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BULB[0], BULB[1], 790, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1010, 'no idea | what I did.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
    } },
  { sign: 'pisces', cap: 'You *liked* it?? | Happy tears.', mood: lt => lt > 0.9 ? 'heart' : 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'can I get | the recipe?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      hearts(x, t, 380, 700, P.t0 + 1.0, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 6 })
      label(x, 790, 1000, 'SENT IT + A HUG', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0272', key: 'E', accent: ORANGE, ending: 'callback',
  title: 'Zodiacs asked for | the recipe *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Ask for a recipe. | *Get a saga.*' },
  last: {
    text: 'Scorpio’s ingredient? | *Still a secret.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      secretJar(x, 540, 1060, k, 30)
      if (k > 0.5) signChar(x, t, 'scorpio', 760, 1180, 200, { mood: lt > 1.3 ? 'wink' : 'neutral', look: [-1, 0], seed: 77, pop: k, glyph: false })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
