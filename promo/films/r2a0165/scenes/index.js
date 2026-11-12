// r2a0165: star_advice, ADVICE ROLLCALL, "How each sign | loves with food." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm, specific "this is how you show love" line each, with a light visual gag.
//   0.0–3.6    "How each sign | *loves with food.*"  (batch topic "How each sign shows love with food", tightened to fit)
//   3.6–49.2   ♈ dinner in five minutes, love at full speed · ♉ you save them the best bite · ♊ you send them every new
//              place you find · ♋ your leftovers come with a note · ♌ dinner for two like a gala · ♍ you remember every
//              allergy, forever · ♎ you plate it like art · ♏ the family recipe, shared only with them · ♐ snacks from
//              every trip · ♑ you meal-prep their whole week · ♒ a dish invented just for them · ♓ their childhood
//              comfort food (happy tears)
//  49.2        group ending: "Pull up a chair. | *Always room.*"  hearts rise over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffb34a'
const ST = { x: -170 }

const PAN = ['..........KK', '.KKKKKKK.KK.', 'KGGGGGGGKK..', 'KGYYGGGGK...', 'KGGGGYYGK...', '.KKKKKKK....']
const PAN_C = { K: INK, G: '#6b7594', Y: GOLD }
const BOX = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWOOOGGGWK', 'KWOOOGGGWK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const BOX_C = { K: INK, W: '#e8eef4', O: ORANGE, G: '#5fd068' }
const CANDLE = ['.F.', 'FYF', '.Y.', 'WWW', 'WWW', 'WWW', 'WWW', 'WWW']
const SUITCASE = ['...KKKK...', '...K..K...', 'KKKKKKKKKK', 'KOOOOOOOOK', 'KOWOOOOWOK', 'KOOOOOOOOK', 'KOWOOOOWOK', 'KOOOOOOOOK', 'KKKKKKKKKK']
const BOWL = ['WWWWWWWWWWW', 'WOOOOOOOOOW', '.WWWWWWWWW.', '..WWWWWWW..']

/** a plate seen from above; fn draws the food on it */
function plate(x, cx, cy, k, fn, { r = 120 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.ellipse(8, 12, r, r * 0.5, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, r + 6, r * 0.5 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 0, r, r * 0.5, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e8dfcf'; x.beginPath(); x.ellipse(0, 0, r * 0.7, r * 0.33, 0, 0, Math.PI * 2); x.fill()
  if (fn) fn()
  x.restore()
}
function steam(x, cx, cy, t, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath()
  for (let i = 0; i <= 10; i++) { const yy = cy - i * 10, xx = cx + Math.sin(i * 0.9 + t * 5) * 9; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
  x.stroke(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Dinner in five minutes. | *Love at full speed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      drawBits(x, PAN, PAN_C, 770, 920, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 14) * 0.06 })
      steam(x, 720, 840, t, pop01(t, P.t0 + 0.4, 0.3, 2) * 0.8); steam(x, 790, 840, t + 1, pop01(t, P.t0 + 0.4, 0.3, 2) * 0.8)
      const s = Math.max(0, 300 - Math.floor(prog(lt, 0.2, 2.2) * 300))
      label(x, 790, 690, `TIMER ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'SERVED HOT. WITH LOVE.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'You save them | *the best bite.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      plate(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), () => { x.fillStyle = '#c98f6a'; x.fillRect(-20, -22, 40, 30); x.fillStyle = GOLD; x.fillRect(-12, -30, 24, 10) })
      const g = pop01(t, P.t0 + 0.9, 0.3, 2.4)
      if (g > 0.01) { x.save(); x.translate(790, 940); x.scale(g, g); x.strokeStyle = '#fff1b0'; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.stroke(); x.restore() }
      label(x, 790, 760, 'BEST BITE: YOURS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'You send them | *every new spot you find.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const L = ['taco place!!', 'noodle spot?', 'tiny bakery!', 'when r u free'].map((s, i) => [s, i === 3 ? PINK : [GOLD, MINT, SKYB][i], pop01(t, P.t0 + 0.4 + i * 0.35, 0.25, 2)])
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: YOU', headCol: GOLD, size: 28, w: 300, h: 420, lines: L })
    } },
  { sign: 'cancer', cap: 'Your leftovers | *come with a note.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 760, 1000, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      card(x, 830, 790, 260, 150, pop01(t, P.t0 + 0.9, 0.35, 2.2), { bg: '#fff27a', rot: 0.08 }, () => { txt(x, 'eat this.', 0, -24, { size: 36 }); txt(x, 'love you.', 0, 28, { size: 36, color: RED }) })
      label(x, 790, 1130, 'REHEAT 2 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Dinner for two? | *You throw a gala.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      plate(x, 790, 1000, k, () => { x.fillStyle = ORANGE; x.fillRect(-26, -18, 52, 26) }, { r: 100 })
      for (let i = 0; i < 2; i++) { drawBits(x, CANDLE, { F: ORANGE, Y: GOLD, W: CREAM }, 660 + i * 260, 900, 14 * k); x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(660 + i * 260, 840, 50 + 6 * Math.sin(t * 9 + i), 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 720, '✦ TABLE FOR TWO ✦', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'DRESS CODE: SPARKLE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'You remember | *every allergy. Forever.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const R = ['no peanuts', 'no cilantro', 'extra pickles', 'sauce on side']
      card(x, 790, 880, 340, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'THEIR ORDER', 0, -130, { size: 30, font: MONO, weight: 700 })
        R.forEach((s, i) => { if (lt > 0.4 + i * 0.3) { txt(x, s, -140, -66 + i * 58, { size: 30, weight: 700, align: 'left' }); x.strokeStyle = GREEN; x.lineWidth = 7; x.beginPath(); x.moveTo(110, -68 + i * 58); x.lineTo(122, -56 + i * 58); x.lineTo(144, -84 + i * 58); x.stroke() } })
      })
      label(x, 790, 1110, 'MEMORISED: 2019', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'You plate it | *like it’s art.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const d = prog(lt, 0.3, 1.4)
      plate(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.strokeStyle = PINK; x.lineWidth = 10; x.beginPath(); for (let i = 0; i <= 40 * d; i++) { const a = i / 40 * Math.PI * 3, r = 10 + i * 1.6; i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.45) : x.moveTo(Math.cos(a) * r, Math.sin(a) * r * 0.45) } x.stroke()
        if (d >= 1) { x.fillStyle = MINT; x.fillRect(-8, -16, 16, 16); x.fillStyle = GOLD; x.fillRect(30, -6, 10, 10); x.fillRect(-44, 6, 10, 10) }
      }, { r: 140 })
      label(x, 790, 720, 'FRAME-WORTHY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      if (d >= 1) sparkles(x, t, 790, 900, P.t0 + 1.4 * 1.29, 6, 180, 0.3)
    } },
  { sign: 'scorpio', cap: 'The family recipe? | *Shared with them only.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const open = ease.inOutCubic(prog(lt, 0.8, 1.3))
      card(x, 790, 900, 340, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#e8dfcf', rot: -0.04 }, () => {
        if (open < 1) { x.fillStyle = '#c9b89a'; x.beginPath(); x.moveTo(-170, -120); x.lineTo(0, -120 + 140 * (1 - open)); x.lineTo(170, -120); x.fill() }
        x.fillStyle = RED; x.beginPath(); x.arc(0, 20 - 120 * open, 26, 0, Math.PI * 2); x.fill()
        if (open > 0.5) { txt(x, 'GRANDMA’S SAUCE', 0, 10, { size: 30, font: MONO, weight: 700 }); txt(x, 'for: you', 0, 60, { size: 30, color: RED }) }
      })
      label(x, 790, 700, 'FOR YOUR EYES ONLY', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'You bring snacks | *home from every trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SUITCASE, { K: INK, O: ORANGE, W: CREAM }, 790, 990, 22 * k)
      for (let i = 0; i < 5; i++) { const p = ease.outCubic(prog(lt, 0.7 + i * 0.15, 1.2 + i * 0.15)); if (p > 0.01) { x.save(); x.translate(790 + (i - 2) * 70 * p, 900 - 200 * p + 40 * p * p); x.rotate(i + p * 3); x.fillStyle = INK; x.fillRect(-26, -18, 52, 36); x.fillStyle = [PINK, MINT, GOLD, SKYB, LAV][i]; x.fillRect(-22, -14, 44, 28); x.restore() } }
      label(x, 790, 1150, 'SOUVENIRS: EDIBLE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'You meal-prep | *their whole week.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2.2), cx = 625 + (i % 3) * 140, cy = 800 + Math.floor(i / 3) * 180
        drawBits(x, BOX, BOX_C, cx, cy, 13 * k); if (k > 0.01) { x.save(); x.translate(cx, cy - 56); x.scale(k, k); x.fillStyle = INK; x.fillRect(-26, -20, 52, 40); x.fillStyle = BONE; x.fillRect(-22, -16, 44, 32); txt(x, 'MTWTF'[i], 0, 2, { size: 26, font: MONO, weight: 700 }); x.restore() }
      }
      label(x, 790, 1120, 'LUNCH: HANDLED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'You invent a dish | *just for them.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOWL, { W: CREAM, O: '#c97bff' }, 790, 950, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      for (let i = 0; i < 5; i++) { const ph = (t * 1.2 + i / 5) % 1; x.save(); x.globalAlpha = (1 - ph) * clamp(lt - 0.4); x.fillStyle = [MINT, LAV, SKYB][i % 3]; x.beginPath(); x.arc(720 + i * 35, 890 - ph * 140, 12 + ph * 8, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 720, 'NAMED AFTER YOU', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'TASTES LIKE… STARS?', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'You cook their | *childhood comfort food.*', mood: lt => lt < 0.9 ? 'happy' : 'heart', tears: lt => lt < 0.9 ? 1 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOWL, { W: CREAM, O: ORANGE }, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      steam(x, 750, 910, t, 0.8); steam(x, 830, 910, t + 1.3, 0.8)
      hearts(x, t, 790, 900, P.t0 + 0.8, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 8 })
      bubble(x, 790, 700, 'tastes like home…', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0165', key: 'G', accent: ACC, ending: 'group',
  title: 'How each sign | *loves with food.*',
  cameos: CAMEOS,
  group: {
    cap: 'Pull up a chair. | *Always room.*',
    moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'happy', 'sparkle', 'heart'],
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 1.2, { n: 10, life: 2.4, spread: 760, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
