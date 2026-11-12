// r2a0264: star_advice, ADVICE ROLLCALL, "Each sign's | dream vacation." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm and specific dream trip each, with a light visual gag.
//   0.0–3.6    "Each sign’s | *dream vacation.*"
//   3.6–49.2   ♈ surf lessons, day one: standing · ♉ a cooking class in a villa · ♊ five cities, one backpack · ♋ a beach
//              house with the whole family · ♌ a rooftop pool, main character · ♍ a spa retreat, perfectly scheduled
//              · ♎ a flower market at sunrise · ♏ diving deep, literally · ♐ a desert road trip, no map · ♑ ancient ruins,
//              taking notes · ♒ the northern lights, front row · ♓ a tiny island, happy tears
//  49.2        "Twelve trips. | *All deserved.*"
//  52.6        ending 'callback': "Aries is still | *standing. Barely.*"  Aries back on the wobbling surfboard.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, sun, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#7fd8ff'
const ST = { x: -170 }
const BOARD = ['..YYYYYYYYYYYYYY..', '.YYRRYYYYYYYYRRYY.', 'YYYYYYYYYYYYYYYYYY', '.YYRRYYYYYYYYRRYY.', '..YYYYYYYYYYYYYY..']
const POT = ['.K......K.', 'KSSSSSSSSK', 'KSYYYYYYSK', 'KSSSSSSSSK', 'KSSSSSSSSK', '.KSSSSSSK.']
const PACK = ['...KKKK...', '..K....K..', '.GGGGGGGG.', 'GGGGGGGGGG', 'GGPPGGRRGG', 'GGPPGGRRGG', 'GGGGYYGGGG', 'GGGGGGGGGG', '.GGGGGGGG.']
const PACK_C = { K: INK, G: '#e8892a', P: PINK, R: SKYB, Y: GOLD }
const HOUSE = ['.....RR.....', '....RRRR....', '...RRRRRR...', '..RRRRRRRR..', '.WWWWWWWWWW.', '.WBBWWWWBBW.', '.WBBWDDWBBW.', '.WWWWDDWWWW.', 'SSSSSSSSSSSS']
const HOUSE_C = { R: '#ff6b5a', W: CREAM, B: SKYB, D: '#c98f6a', S: '#ffe7a8' }
const FLOAT = ['..PPPPPP..', '.PPWWWWPP.', 'PPW....WPP', 'PP......PP', 'PPW....WPP', '.PPWWWWPP.', '..PPPPPP..']
const FLOWERS = ['.P.Y.R.', 'PYPYRYR', '.P.Y.R.', '..GGG..', '..GGG..', '.KKKKK.', '.KBBBK.', '..KKK..']
const FLOWERS_C = { P: PINK, Y: GOLD, R: '#ff6b5a', G: '#5fd068', K: INK, B: LAV }
const FISH = ['..OO...', '.OOOO.O', 'OOWOOOO', '.OOOO.O', '..OO...']
const CACTUS = ['..G..', '.GGG.', 'GGGGG', '.GGG.', '.GGG.', '.GGG.']
const COLUMN = ['WWWWWW', '.WWWW.', '.WGWW.', '.WWWW.', '.WWGW.', '.WWWW.', '.WWWW.', 'WWWWWW']
const PALM = ['..GG.GG..', '.GGGGGGG.', 'GG..B..GG', '....B....', '....B....', '...B.....', '..SSSSS..', 'SSSSSSSSS']
const PALM_C = { G: '#5fd068', B: '#c98f6a', S: '#ffe7a8' }

function waves(x, t, cx, cy, w, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  for (let r = 0; r < 3; r++) { x.fillStyle = ['#3f6fd0', '#5f8fe8', '#8fb8ff'][r]; for (let i = 0; i < w / 40; i++) x.fillRect(cx - w / 2 + i * 40, cy + r * 26 + 10 * Math.sin(t * 2 + i * 0.8 + r), 40, 26) }
  x.restore()
}
function surf(x, t, cx, cy, k, wob) {
  waves(x, t, cx, cy + 70, 360, k)
  drawBits(x, BOARD, { Y: SUN, R: '#ff6b5a' }, cx, cy + 40, 14 * k, { rot: wob })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Surf lessons. | *Day one: standing.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', star: { x: 0, y: -80, s: 260 }, hops: [1.3],
    back(x, t, lt, P) { surf(x, t, 540, 960, pop01(t, P.t0 + 0.1, 0.35, 2), 0.12 * Math.sin(t * 5)) },
    front(x, t, lt, P) { label(x, 790, 620, 'STOOD UP! (2 SEC)', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 }) } },
  { sign: 'taurus', cap: 'A cooking class | *in a villa.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, { K: INK, S: GREY, Y: '#ffd86b' }, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      x.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) { const ph = (t * 0.6 + i * 0.2) % 1; x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillRect(740 + i * 25 + Math.sin(ph * 6) * 10, 860 - ph * 160, 14, 20) }
      x.globalAlpha = 1
      label(x, 790, 680, 'FRESH PASTA, DAY 3', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Five cities. | *One backpack.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 4)
      label(x, 790, 650, `CITY ${n} OF 5`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A beach house. | *The whole family.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, HOUSE, HOUSE_C, 790, 900, 24 * k)
      if (k > 0.5) { signChar(x, t, 'leo', 712, 868, 56, { mood: 'happy', seed: 31, glyph: false, glow: 0.4 }); signChar(x, t, 'pisces', 868, 868, 56, { mood: 'happy', seed: 32, glyph: false, glow: 0.4, tears: 1 }) }
      label(x, 790, 1130, 'ROOM FOR EVERYONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'A rooftop pool. | *Main character.*', mood: 'sparkle', star: { x: 0, y: -60, s: 260 },
    back(x, t, lt, P) { waves(x, t, 540, 1000, 600, pop01(t, P.t0 + 0.1, 0.35, 2)); drawBits(x, FLOAT, { P: '#ff8fb1', W: '#fff' }, 540, 1000, 20 * pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      sun(x, t, 840, 620, 50, pop01(t, P.t0 + 0.6, 0.4, 1.8))
      label(x, 300, 640, 'GOLDEN HOUR', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'A spa retreat. | *Perfectly scheduled.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = MINT; x.fillRect(-160, -180, 320, 60)
        txt(x, 'MY DAY', 0, -148, { size: 30, font: MONO, weight: 700 })
        const rows = ['9:00 tea', '9:15 massage', '10:30 nap', '11:00 nap 2']
        rows.forEach((r, i) => { txt(x, r, -130, -80 + i * 64, { size: 30, align: 'left' }); if (lt > 0.6 + i * 0.35) txt(x, '✓', 120, -80 + i * 64, { size: 34, color: GREEN }) })
      })
    } },
  { sign: 'libra', cap: 'A flower market | *at sunrise.*', mood: 'heart', look: [1, 0], star: ST,
    back(x, t, lt, P) { x.save(); x.globalAlpha = 0.45 * clamp(lt / 0.5); x.fillStyle = '#ffb070'; x.beginPath(); x.arc(790, 1080, 200, Math.PI, 0); x.fill(); x.restore() },
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, FLOWERS_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 640, 'ONE OF EACH, PLEASE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Diving deep. | *Literally.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    back(x, t, lt, P) { x.save(); x.globalAlpha = 0.5 * clamp(lt / 0.6); x.fillStyle = '#1f4fa0'; x.fillRect(110, 480, 860, 740); x.restore() },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, FISH, { O: [ORANGE, GOLD, PINK][i], W: '#fff' }, 620 + ((t * 40 + i * 120) % 300), 720 + i * 150, 12 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2))
      x.fillStyle = '#bfe6ff'; for (let i = 0; i < 6; i++) { const ph = (t * 0.8 + i * 0.17) % 1; x.globalAlpha = 1 - ph; x.beginPath(); x.arc(420 + Math.sin(i * 3) * 30, 780 - ph * 260, 8 + i % 3 * 4, 0, Math.PI * 2); x.fill() }
      x.globalAlpha = 1
      label(x, 790, 1120, 'DEPTH: YES', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'A desert road trip. | *No map.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.globalAlpha = k; x.fillStyle = '#e8b46a'; x.fillRect(560, 1000, 380, 40); x.fillStyle = '#4a4378'; x.fillRect(560, 1040, 380, 30)
      x.fillStyle = GOLD; for (let i = 0; i < 5; i++) x.fillRect(560 + ((i * 80 - t * 160) % 340 + 340) % 340, 1052, 40, 8); x.restore()
      for (let i = 0; i < 2; i++) drawBits(x, CACTUS, { G: '#5fd068' }, 650 + i * 230, 930, 18 * k)
      sun(x, t, 820, 700, 54, pop01(t, P.t0 + 0.6, 0.4, 1.8))
      label(x, 790, 1150, 'LEFT AT THE CACTUS?', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ancient ruins. | *Taking notes.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, COLUMN, { W: '#e8e0d0', G: '#b9b0a0' }, 720, 900, 24 * k)
      drawBits(x, COLUMN.slice(0, 5), { W: '#e8e0d0', G: '#b9b0a0' }, 880, 950, 24 * k, { rot: 0.1 })
      card(x, 800, 1110, 220, 90, pop01(t, P.t0 + 1.0, 0.3, 2), { bg: CREAM, rot: -0.05 }, () => txt(x, 'notes: p. 14', 0, 4, { size: 28, font: MONO, weight: 700 }))
    } },
  { sign: 'aquarius', cap: 'The northern lights. | *Front row.*', mood: 'sparkle', look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = clamp(lt / 0.8)
      x.save(); x.globalAlpha = 0.55 * k
      for (let b = 0; b < 3; b++) { x.fillStyle = [MINT, '#8fe3ff', '#c97bff'][b]; for (let i = 0; i < 35; i++) { const px = 130 + i * 23, py = 640 + b * 50 + 50 * Math.sin(i * 0.35 + t * 1.2 + b); x.fillRect(px, py, 24, 70) } }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 1100, 'WORTH THE COLD', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A tiny island. | *Happy tears.*', mood: 'happy', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      waves(x, t, 790, 1020, 340, k)
      drawBits(x, PALM, PALM_C, 790, 900, 24 * k)
      label(x, 790, 640, 'POPULATION: ME', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0264', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *dream vacation.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve trips. | *All deserved.*' },
  last: {
    text: 'Aries is still | *standing. Barely.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      surf(x, t, 540, 1000, k, 0.18 * Math.sin(t * 6))
      if (k > 0.01) signChar(x, t, 'aries', 540, 900, 240 * k, { mood: 'wide', seed: 54, squash: 0.04 * Math.sin(t * 9) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
