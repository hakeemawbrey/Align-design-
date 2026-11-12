// r2t0246: star_talk, ROLLCALL, "The signs | ordering takeout." (~57 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "The signs | *ordering takeout.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   twelve orders (3.8 s each), each pushed to the extreme:
//              ♈ ordered before the menu loaded · ♉ one of everything · ♊ four restaurants, four drivers
//              · ♋ invited the driver in for dinner · ♌ asked the driver to applaud · ♍ special instructions, four pages
//              · ♎ still deciding, restaurant closed · ♏ the spiciest thing, didn't blink · ♐ ordered what they can't pronounce
//              · ♑ a spreadsheet for dumplings · ♒ pancakes at 3 a.m. · ♓ the fortune cookie made them sob
//  49.2        "Dinner arrived. | *Eventually.*"
//  52.6        callback: "Libra finally ordered. | *Breakfast.*"  The CLOSED sign flips back to OPEN, the sun comes up.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, clock, sun, beam, confetti, BOX, BOX_C, BAG, BAG_C, sign, CREAM, RED, ORANGE, BROWN, GREY, DEEP, SUN, clamp, ease, lerp, prog } from './props.js'

const ACC = ORANGE
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const CHILI = ['......GG', '.....GG.', '..RRRR..', '.RRRRRR.', 'RRWRRRR.', 'RRRRRR..', 'RRRRR...', '.RRR....', '..R.....']
const CHILI_C = { G: '#5fd068', R: RED, W: '#ffb0a0' }
const COOKIE = ['....YYYYY....', '..YYYYYYYYY..', '.YYYYYYYYYYY.', 'YYYYYY.YYYYYY', 'YYYYY...YYYYY', '.YYY.....YYY.']
const COOKIE_C = { Y: '#e8a24a' }
const DUMP = ['...WWWW...', '..WWWWWW..', '.WWKWWKWW.', 'WWWWWWWWWW', '.WWWWWWWW.']
const PANCAKE = ['....BB....', '.YYYYYYYY.', 'TTTTTTTTTT', '.YYYYYYYY.', 'TTTTTTTTTT', '.YYYYYYYY.', 'TTTTTTTTTT']
const PANCAKE_C = { B: '#fff1b0', Y: '#e8a24a', T: '#c98f2a' }
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']

const CAMEOS = [
  { sign: 'aries', cap: 'Ordered before | the menu *loaded.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: ST, hops: [0.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const dots = '.'.repeat(1 + Math.floor(t * 4) % 3)
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MENU', headCol: ORANGE, lines: [[`loading${dots}`, GREY, 1]] })
      lab(x, 790, 1100, 'ORDER: PLACED', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.05 })
      sparkles(x, t, 790, 1100, P.t0 + 0.8, 6, 130, 0.3)
      bubble(x, 790, 610, 'I want | the food.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Ordered one | of *everything.*', mood: lt => lt > 1.8 ? 'heart' : 'happy', star: ST,
    back(x, t, lt, P) {
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.22, 0.25, 2.2)
        drawBits(x, BOX, BOX_C, 790 + (i % 2 ? 22 : -22), 1140 - i * 88, 13 * k)
      }
    },
    front(x, t, lt, P) { lab(x, 790, 600, 'MENU: ALL OF IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: GOLD, rot: 0.05 }) } },
  { sign: 'gemini', cap: 'Four restaurants. | *Four drivers.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const POS = [[700, 760], [880, 760], [700, 990], [880, 990]]
      POS.forEach(([px, py], i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2)
        drawBits(x, BAG, BAG_C, px, py, 13 * k)
        if (k > 0.5) txt(x, String(i + 1), px, py + 30, { size: 30, font: MONO, weight: 700 })
      })
      lab(x, 790, 1150, 'DRIVERS: 4', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: SUN, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Invited the driver | in for *dinner.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 960, 180 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 11, glyph: false, hops: [P.t0 + 1.4] })
      drawBits(x, BAG, BAG_C, 880, 1080, 11 * k)
      lab(x, 800, 790, 'DRIVER', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: BONE, rot: 0.05 })
      bubble(x, 790, 640, 'stay! | there’s soup!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      hearts(x, t, 540, 860, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Asked the driver | to *applaud.*', mood: 'sparkle', star: { x: -150 }, hops: [1.0],
    back(x, t, lt, P) { beam(x, 390, 490, 390, 1150, 200, ease.outCubic(prog(lt, 0.2, 0.5))) },
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 790, 950, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'clap… clap?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bc' })
      lab(x, 790, 1130, 'TIP: AN AUTOGRAPH', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: ORANGE, rot: -0.05 })
      sparkles(x, t, 390, 820, P.t0 + 1.1, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Special instructions: | *four pages.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const u = ease.outCubic(prog(lt, 0.3, 1.6)), k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 560); x.scale(k, k)
        const h = 80 + u * 560
        x.fillStyle = INK; x.fillRect(-126, 0, 252, h + 8); x.fillStyle = CREAM; x.fillRect(-120, 4, 240, h)
        for (let i = 0; i * 34 + 30 < h - 10; i++) { x.fillStyle = i % 4 === 0 ? INK : GREY; x.fillRect(-96, 24 + i * 34, i % 4 === 0 ? 120 : 180 - (i * 37) % 60, 10) }
        x.fillStyle = BROWN; x.fillRect(-140, -14, 280, 28); x.fillRect(-140, h - 6, 280, 26)
        x.restore()
      }
      lab(x, 790, 660, 'SAUCE: 2 CM LEFT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: MINT, rot: -0.05, size: 30 })
    } },
  { sign: 'libra', cap: 'Still deciding. | Restaurant *closed.*', mood: lt => lt > 1.7 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const shut = lt > 1.5
      sign(x, 790, 700, pop01(t, P.t0 + 0.15, 0.3, 2), shut ? 'CLOSED' : 'OPEN', { bg: shut ? RED : MINT, rot: shut ? 0.05 : -0.03 })
      const w = Math.floor(lt * 2.4) % 2 ? 'noodles?' : 'tacos?'
      bubble(x, 790, 930, shut ? '…oh.' : w, pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      lab(x, 790, 1120, 'DECIDING: 3 HRS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: PINK, rot: 0.05 })
    } },
  { sign: 'scorpio', cap: 'Ordered the spiciest. | Didn’t *blink.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CHILI, CHILI_C, 790, 860, 26 * k, { rot: 0.2 + 0.04 * Math.sin(t * 6) })
      lab(x, 790, 640, 'HEAT: MAXIMUM', pop01(t, P.t0 + 0.5, 0.3, 2.2), { bg: RED, color: BONE, rot: -0.05 })
      bubble(x, 790, 1100, 'mild.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Ordered what they | can’t *pronounce.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wink', look: [-1, 0], star: { x: 160 }, hops: [1.4],
    front(x, t, lt, P) {
      card(x, 320, 820, 280, 300, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'MENU', 0, -110, { size: 30, font: MONO, weight: 700 })
        for (let i = 0; i < 5; i++) { x.fillStyle = i === 3 ? ORANGE : GREY; x.fillRect(-100, -60 + i * 40, i === 3 ? 200 : 150, 18) }
      })
      bubble(x, 320, 600, 'the… uh… | that one!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'br' })
      lab(x, 320, 1080, 'MYSTERY: ORDERED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: GOLD, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Made a spreadsheet. | For *dumplings.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      card(x, 790, 820, 340, 330, k, { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'DUMPLINGS', 0, -130, { size: 28, font: MONO, weight: 700 })
        for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
          x.fillStyle = INK; x.fillRect(-150 + c * 100, -95 + r * 56, 98, 54)
          const best = r === 2 && lt > 1.2
          x.fillStyle = best ? MINT : r === 0 ? '#e8dfcf' : CREAM; x.fillRect(-147 + c * 100, -92 + r * 56, 92, 48)
          if (r > 0) { x.fillStyle = GREY; x.fillRect(-130 + c * 100, -72 + r * 56, 50, 10) }
        }
      })
      drawBits(x, DUMP, { W: CREAM, K: INK }, 790, 1090, 14 * pop01(t, P.t0 + 1.3, 0.3, 2.2))
      lab(x, 790, 610, 'BEST VALUE: ROW 3', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: MINT, rot: -0.04, size: 30 })
    } },
  { sign: 'aquarius', cap: 'Ordered pancakes | at *3 a.m.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      clock(x, 700, 700, 80, pop01(t, P.t0 + 0.15, 0.3, 2), 3, 0)
      drawBits(x, MOON, { Y: SUN }, 890, 640, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, PANCAKE, PANCAKE_C, 790, 980, 20 * pop01(t, P.t0 + 0.8, 0.35, 2))
      lab(x, 790, 1140, 'BREAKFAST: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: SKYB, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'The fortune cookie | made them *sob.*', mood: lt => lt < 1.0 ? 'happy' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, COOKIE, COOKIE_C, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const s = ease.outCubic(prog(lt, 0.5, 0.9))
      card(x, 790, lerp(1000, 780, s), 330, 110, clamp(s * 2), { bg: CREAM, rot: -0.04 }, () => txt(x, 'you are loved', 0, 2, { size: 34 }))
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0246', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs | *ordering takeout.*',
  cameos: CAMEOS,
  group: { cap: 'Dinner arrived. | *Eventually.*' },
  last: {
    text: 'Libra finally ordered. | *Breakfast.*',
    draw(x, t, lt) {
      const t0 = t - lt
      sun(x, t, 800, 900, 80, pop01(t, t0 + 0.4, 0.5, 1.6))
      sign(x, 480, 880, pop01(t, t0 + 0.7, 0.4, 2), 'OPEN', { bg: MINT, w: 380, h: 140, size: 72 })
      const s = pop01(t, t0 + 1.2, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'libra', 540, 1230, 340 * s, { mood: 'sparkle', seed: 52, hops: [t0 + 1.8, t0 + 2.6] })
      sparkles(x, t, 480, 880, t0 + 0.9, 8, 220, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
