// r2a0045: star_advice, ADVICE ROLLCALL, "Each sign | in their element." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific "this is where you shine" line each, with a light visual gag.
//   0.0–3.6    "Each sign | *in their element.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   ♈ day one of anything · ♉ a slow Sunday and good bread · ♊ three conversations, all great
//              · ♋ feeding everyone (a big pot: seconds?) · ♌ hosting the party (a disco ball) · ♍ a label maker, pure joy
//              · ♎ surrounded by pretty things (flowers) · ♏ a 2 a.m. deep talk · ♐ a map and no plan
//              · ♑ summit reached, next summit · ♒ stargazing with a theory (a telescope) · ♓ rain, music and a good cry
//  49.2        "Find your thing. | *Glow there.*"
//  52.6        callback: "Gemini is | *still talking.*"  Gemini comes back, on conversation three (and four).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', GREEN = '#5fd068'

const BREAD = [
  '...CCCCCCCC...',
  '.CCCWCCCCWCCC.',
  'CCCCCWCCCCWCCC',
  'CCCCCCWCCCCWCC',
  'CCCCCCCCCCCCCC',
  '.CCCCCCCCCCCC.',
]
const BREAD_C = { C: '#e8a24a', W: '#ffd9a0' }
const SLICE = ['.CCCC.', 'CWWWWC', 'CWWWWC', 'CWWWWC', 'CWWWWC', 'CCCCCC']
const SLICE_C = { C: '#c98f2a', W: '#ffe9c0' }
const POT = ['..s.s.s.s...', '.s.s.s.s....', 'KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'GKKKKKKKKKKG', '.KRRRRRRRRK.', '.KRRRRRRRRK.', '.KRRRRRRRRK.', '..KKKKKKKK..']
const POT_C = { K: INK, S: '#ffb34a', G: '#9aa5c4', R: '#ff6b5a', s: 'rgba(239,230,214,0.7)' }
const FLOWERS = ['P.Y.P.R', '.PYYPR.', 'RPPYYPP', '.G.G.G.', '..GGG..', '..BBB..', '.BBBBB.', '.BBBBB.', '..BBB..']
const FLOWERS_C = { P: '#ff8fb1', Y: GOLD, R: '#c97bff', G: GREEN, B: SKYB }
const MAP = ['WWWWWWWWWWWW', 'WGGWWBBWWGGW', 'WGGGWBBBWWGW', 'WWGWWWBBWWWW', 'WWWWRWWWWBBW', 'WGGWWRWWBBBW', 'WGGWWWRRWWWW', 'WWWWWWWXWWWW', 'WWWWWWWWWWWW']
const MAP_C = { W: '#f3e6c4', G: GREEN, B: SKYB, R: RED, X: INK }
const MOUNT = ['.......F.....', '.......FFF...', '.......F.....', '......WWW....', '.....WWGGG...', '....GGGGGGG..', '...GGGGGGGGG.', '..GGGGGGGGGGG', 'GGGGGGGGGGGGG']
const MOUNT_C = { F: RED, W: '#ffffff', G: '#9aa5c4' }
const SCOPE = ['..........KK', '........KKSK', '......KKSSKK', '....KKSSKK..', '..KKSSKK....', 'KKSSKK......', '.KKK........', '..K.K.......', '.K...K......', 'K.....K.....']
const SCOPE_C = { K: '#c9c9d6', S: '#6fc3ff' }
const RAIN = ['..GGGG....', '.GGGGGGGG.', 'GGGGGGGGGG', '.GGGGGGGG.', '..B..B..B.', '.B..B..B..']
const RAIN_C = { G: '#9aa5c4', B: SKYB }

function disco(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-3, -200, 6, 120)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  for (let i = -4; i < 4; i++) for (let j = -4; j < 4; j++) {
    const px = i * 22 + 2, py = j * 22 + 2
    if (Math.hypot(px + 10, py + 10) > 84) continue
    x.fillStyle = (i + j + Math.floor(t * 6)) % 3 === 0 ? '#ffffff' : (i + j) % 2 ? '#c9c9d6' : '#8f8fa8'; x.fillRect(px, py, 20, 20)
  }
  x.restore()
  x.save(); x.globalAlpha *= 0.5 * k
  for (let i = 0; i < 6; i++) { const a = t * 1.5 + i; x.fillStyle = [PINK, GOLD, SKYB][i % 3]; x.fillRect(cx + Math.cos(a) * 260, cy + 200 + Math.sin(a * 1.3) * 120, 14, 14) }
  x.restore()
}
function labelTape(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -70, 220, 140); x.fillStyle = '#7dffb0'; x.fillRect(-102, -62, 204, 124)
  x.fillStyle = INK; x.fillRect(-70, -40, 140, 40); x.fillStyle = '#b9ffd8'; x.fillRect(-64, -34, 128, 28)
  const L = clamp((lt - 0.4) / 0.8) * 190
  x.fillStyle = INK; x.fillRect(100, 10, L + 6, 46); x.fillStyle = CREAM; x.fillRect(100, 14, L, 38)
  if (L > 140) { x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('SPOONS', 118, 34) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Day one | of *anything.*', mood: 'sparkle', star: { x: -180 }, hops: [0.4, 0.9, 1.4],
    front(x, t, lt, P) {
      label(x, 790, 800, 'DAY 1!!', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 56, bg: GOLD, rot: -0.05 })
      bubble(x, 790, 1000, 'let’s GO', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 790, 800, P.t0 + 0.6, 8, 180, 0.2)
    } },
  { sign: 'taurus', cap: 'A slow Sunday | and *good bread.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'FRESH. WARM. MINE.', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Three conversations. | *All great.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'no WAY', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 820, 850, 'tell me more!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bl' })
      bubble(x, 760, 1040, 'wait, also—', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Feeding everyone | *at home.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 720, 'seconds?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Hosting the party. | *Glowing.*', mood: 'sparkle', star: { x: -180, y: 30 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      disco(x, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1060, 'HOST: LEO', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: '#ffb34a', rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'A label maker. | *Pure joy.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      labelTape(x, 620, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 720, 'EVERYTHING: LABELLED', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 26, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Surrounded by | *pretty things.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, FLOWERS_C, 790, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 860, P.t0 + 1.0, 8, 170, 0.3)
      label(x, 790, 1140, 'VIBES: CURATED', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'A 2 a.m. | *deep talk.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    back(x, t, lt, P) { x.save(); x.globalAlpha *= 0.35 * P.k; x.fillStyle = '#05040c'; x.fillRect(110, 480, 860, 740); x.restore() },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 820, 1000, 170 * k, { mood: 'heart', look: [-1, 0], seed: 51, glyph: false, tears: 2 })
      bubble(x, 760, 700, 'ok, but what | do you REALLY | want?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'A map | and *no plan.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, MAP, MAP_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1110, 'DESTINATION: ?', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Summit reached. | *Next summit.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 790, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1120, 'ALREADY PLANNING #2', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 28, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Stargazing | *with a theory.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 790, 990, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 680, 'what if | stars are | shy?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Rain, music | and *a good cry.*', mood: 'heart', tears: 2, look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, RAIN, RAIN_C, 790, 720 + 6 * Math.sin(t * 2), 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 790, 1040, { n: 4, cell: 8, col: PINK, alpha: pop01(t, P.t0 + 0.6, 0.3, 2) })
      label(x, 790, 1120, 'PERFECT DAY', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 32, bg: '#b7a6ff', rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0045', key: 'G', accent: '#ffd23a', ending: 'callback',
  title: 'Each sign | *in their element.*',
  cameos: CAMEOS,
  group: { cap: 'Find your thing. | *Glow there.*' },
  last: {
    text: 'Gemini is | *still talking.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 330, 1250, 240 * k, { mood: Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], seed: 9 })
      bubble(x, 740, 1080, 'and THEN—', pop01(t, t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 780, 1250, 'ok, last thing—', pop01(t, t0 + 1.5, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      bubble(x, 740, 1420, 'wait, ALSO—', pop01(t, t0 + 2.1, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
