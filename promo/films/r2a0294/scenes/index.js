// r2a0294: star_advice, ADVICE ROLLCALL, "How to spend a Sunday | with each sign." (~54 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "Sunday plans | *with each sign.*" (how to spend a Sunday)  The twelve line up, then dive into the pip row.
//   3.6–49.2   one warm, specific Sunday per sign, each with a light gag:
//              ♈ sunrise hike (race optional) · ♉ long brunch, then a nap · ♊ a bookshop wander · ♋ cook together, make extra
//              · ♌ dress up for no reason · ♍ a slow reset, fresh sheets · ♎ a gallery stroll · ♏ deep talks at the diner
//              · ♐ say yes to a road trip · ♑ plan the week, then truly rest · ♒ stargaze, find their sign · ♓ rainy-day films
//  49.2        group ending: "Best Sunday? | *The one together.*"  A big soft sun rises behind the group photo.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, sun, chart, CREAM, RED, ORANGE, GREY, DEEP, GREEN, WOOD, BROWN, SUN, clamp, ease, lerp, prog } from './props.js'

const ACC = SUN
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const MTN = ['......K......', '.....KWK.....', '....KWWWK....', '...KGGWGGK...', '..KGGGGGGGK..', '.KGGGGGGGGGK.', 'KGGGGGGGGGGGK']
const PANCAKES = ['....YY....', '...KRRK...', '.KKKKKKKK.', 'KTTTTTTTTK', 'KKKKKKKKKK', 'KTTTTTTTTK', 'KKKKKKKKKK', 'KTTTTTTTTK', 'KKKKKKKKKK', '.KWWWWWWK.']
const BOOKS = ['KKK.KKKK.KKK', 'KRK.KBBK.KGK', 'KRK.KBBK.KGK', 'KRK.KBBK.KGK', 'KRK.KBBK.KGK', 'KRK.KBBK.KGK', 'KKKKKKKKKKKK']
const POT = ['.S..S..S.', '..S..S..S', '.........', 'KKKKKKKKK', 'KRRRRRRRK', 'KRRRRRRRK', 'KRRRRRRRK', '.KKKKKKK.']
const BOWTIE = ['KK.....KK', 'KRK...KRK', 'KRRKKKRRK', 'KRRKRKRRK', 'KRRKKKRRK', 'KRK...KRK', 'KK.....KK']
const CAR = ['...KKKKKK....', '..KWWKWWWK...', '.KRRRRRRRRKK.', 'KRRRRRRRRRRRK', 'KRRRRRRRRRRRK', '.KKK.....KKK.', '.KGK.....KGK.']
const TELE = ['..KK....', '.KWWK...', 'KWWWWK..', '.KWWWWK.', '..KWWWWK', '...KWWK.', '....KK..', '...K.K..', '..K...K.']
const PILLOW = ['.KKKKKKKKKK.', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', '.KKKKKKKKKK.']

const CAMEOS = [
  { sign: 'aries', cap: 'A sunrise hike. | *Race optional.*', mood: 'sparkle', star: ST, hops: [0.6, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { sun(x, t, 820, 760, 60, pop01(t, P.t0 + 0.2, 0.4, 2)) },
    front(x, t, lt, P) {
      drawBits(x, MTN, { K: INK, W: '#ffffff', G: '#6b62a8' }, 800, 1000, 30 * pop01(t, P.t0 + 0.1, 0.35, 2))
      lab(x, 800, 1150, 'SUMMIT: 6:58 AM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: SUN, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'A long brunch. | *Then a nap.*', mood: lt => lt > 1.2 ? 'sleepy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PANCAKES, { K: INK, Y: SUN, R: RED, T: '#e8a24a', W: '#ffffff' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      lab(x, 790, 1110, 'NO ALARMS TODAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: LAV, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'A bookshop wander. | *Ten new topics.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, BOOKS, { K: INK, R: RED, B: SKYB, G: GREEN }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 660, 'wait, THIS one!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      lab(x, 790, 1090, 'BAG: HEAVY. HEART: FULL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: SUN, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Cook together. | *Make extra.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, POT, { K: INK, R: '#ff6b5a', S: '#e8e8f4' }, 790, 900 + (lt > 0.6 ? Math.sin(t * 8) * 2 : 0), 26 * k)
      lab(x, 790, 1100, 'LEFTOVERS: FOR YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.0, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Dress up | for *no reason.*', mood: lt => lt > 0.9 ? 'wink' : 'sparkle', star: ST, hops: [0.9],
    front(x, t, lt, P, F) {
      drawBits(x, BOWTIE, { K: INK, R: RED }, F.x, F.cy + 120, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      lab(x, 790, 820, 'OCCASION: SUNDAY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { bg: GOLD, rot: 0.05, size: 36 })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.9, 8, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'A slow reset. | *Fresh sheets.*', mood: lt => lt > 1.1 ? 'sleepy' : 'happy', star: { x: -170, y: 20 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { K: INK, W: '#e8f0ff' }, 370, 1020, 26 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      card(x, 790, 820, 260, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        ['✓ laundry', '✓ plants', '✓ rest'].forEach((s, i) => { if (lt > 0.5 + i * 0.4) txt(x, s, -100, -60 + i * 60, { size: 32, align: 'left', color: i === 2 ? GREEN : INK }) })
      })
      lab(x, 790, 1090, 'MIND: CLEAR', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'A gallery stroll. | *Pretty everything.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 830, 270, 230, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: GOLD, rot: -0.03, border: 10 }, () => {
        x.fillStyle = '#ffd6e6'; x.fillRect(-115, -95, 230, 190)
        sun(x, t, -30, -20, 30, 1); x.fillStyle = '#7ddc7a'; x.fillRect(-115, 40, 230, 55)
      })
      lab(x, 790, 1080, 'STARED: 20 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Deep talks | at the *diner.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 1000, 170 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 25, glyph: false })
      bubble(x, 760, 680, 'ok but what’s | your REAL dream?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'br' })
      lab(x, 800, 1150, 'CONNECTION: DEEP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: LAV, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Say yes | to a *road trip.*', mood: 'sparkle', star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const d = ease.inOutCubic(prog(lt, 0.3, 1.6))
      drawBits(x, CAR, { K: INK, W: SKYB, R: ORANGE, G: GREY }, lerp(960, 760, d), 960 + Math.abs(Math.sin(t * 9)) * -4, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      lab(x, 790, 700, 'DESTINATION: ???', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: ORANGE, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Plan the week. | Then *truly rest.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: ST, squash: lt => lt > 1.2 ? 0.05 : 0,
    front(x, t, lt, P) {
      card(x, 790, 820, 260, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'MON–FRI: PLANNED', 0, -40, { size: 24, font: MONO, weight: 700 })
        if (lt > 1.0) txt(x, 'SUNDAY: OFF', 0, 30, { size: 34, color: GREEN })
      })
      lab(x, 790, 1060, 'LAPTOP: CLOSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Stargaze. | *Find their sign.*', mood: 'sparkle', look: [1, -1], star: { x: -170, y: 40 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TELE, { K: INK, W: '#c9c9d8' }, 560, 900, 16 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.1 })
      const pts = [[700, 640], [780, 700], [860, 660], [900, 760], [820, 820]]
      const n = Math.floor(clamp((lt - 0.4) / 1.2) * pts.length)
      x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); pts.slice(0, n).forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
      pts.forEach(([a, b], i) => { if (i < Math.max(1, n)) { x.fillStyle = SUN; x.fillRect(a - 8, b - 8, 16, 16) } })
      lab(x, 800, 1080, 'THERE YOU ARE ♒', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: SKYB, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'Rainy-day films. | *Tissues ready.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.6 * clamp(lt * 2); x.fillStyle = SKYB
      for (let i = 0; i < 18; i++) { const ph = ((t * 0.9 + i * 0.137) % 1); x.fillRect(130 + ((i * 197) % 820), 480 + ph * 700, 5, 26) }
      x.restore()
    },
    front(x, t, lt, P) {
      card(x, 800, 820, 280, 190, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: INK, rot: 0.03, border: 8 }, () => {
        x.fillStyle = '#2a2350'; x.fillRect(-130, -85, 260, 170)
        hearts(x, t, 0, 60, P.t0 + 0.6, { n: 3, life: 1.4, spread: 140, cell: 6, seed: 1 })
      })
      lab(x, 800, 1060, 'FILM 3. STILL CRYING.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0294', key: 'E', accent: ACC, ending: 'group',
  title: 'Sunday plans | *with each sign.*',
  cameos: CAMEOS,
  group: {
    cap: 'Best Sunday? | *The one together.*',
    draw(x, t, lt) {
      const k = ease.outCubic(clamp((lt - 0.3) / 1.2))
      x.save(); x.globalAlpha = 0.9 * k; sun(x, t, 540, 760 - 80 * k, 70, 1); x.restore()
      hearts(x, t, 540, 1350, t - lt + 1.4, { n: 10, life: 2.6, spread: 760, cell: 8, seed: 11 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
