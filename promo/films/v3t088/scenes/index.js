// v3t088: THE SIGNS AS… v3, "Zodiacs on a budget | be like." (~54 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "Zodiacs on a budget | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one sign per card (3.8 s each), each pushed to the extreme:
//              ♈ bought it, then checked the price · ♉ budget zero, still the nice cheese · ♊ ten budget planners, zero budgets
//              · ♋ kept every receipt, sentimental reasons · ♌ broke, still tipped big · ♍ price-compared one banana
//              · ♎ returned it, bought the other colour · ♏ never forgets who owes them four bucks · ♐ free samples as dinner
//              · ♑ a budget for the budget · ♒ built their own toaster · ♓ saw the price tag, wept
//  49.2        group ending: "Payday tomorrow. | *Rich for a day.*" with coins raining over the photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#5fd068', RED = '#e23d4e', BROWN = '#8a4a2e', CREAM = '#fff4e2', ORANGE = '#ffb34a'

const COIN = ['.YYY.', 'YYWYY', 'YWYYY', 'YYYYY', '.YYY.']
const COIN_C = { Y: GOLD, W: '#fff1b0' }
const CHEESE = [
  '.........YY',
  '.......YYYY',
  '.....YYYYYY',
  '...YYYOYYYY',
  '.YYYYYYYYOY',
  'YYOYYYYYYYY',
  'YYYYYYYOYYY',
  'YYYYOYYYYYY',
]
const CHEESE_C = { Y: '#ffd23a', O: '#e9a92a' }
const BANANA = ['.......KK', '......YY.', '.....YYY.', '...YYYY..', 'YYYYYY...', '.YYYY....']
const BANANA_C = { K: BROWN, Y: '#ffe14a' }
const SHIRT = ['CC.....CC', 'CCCC.CCCC', 'CCCCCCCCC', '.CCCCCCC.', '.CCCCCCC.', '.CCCCCCC.', '.CCCCCCC.']
const TOAST = [
  '.A.....A..',
  '..A...A...',
  '.SSSSSSSS.',
  'SSKKSSKKSS',
  'SSSSSSSSSS',
  'SSSSSSSSSL',
  'SSSSSSSSSL',
  'SSSSSSSSSS',
  '.S......S.',
]
const TOAST_C = { A: GOLD, S: '#c9c9d8', K: INK, L: RED }
const TAG = ['..K.....', '.KTTTTTT', 'KTTTTTTT', '.KTTTTTT', '..K.....']

function receiptPile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const n = Math.floor(clamp((lt - 0.2) / 1.3) * 7) + 1
  for (let i = 0; i < n; i++) {
    x.save(); x.translate(cx + Math.sin(i * 2.3) * 70, cy - i * 34); x.rotate(Math.sin(i * 1.7) * 0.4); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-64, -84, 128, 168); x.fillStyle = CREAM; x.fillRect(-58, -78, 116, 156)
    x.fillStyle = '#b9b0a0'; for (let j = 0; j < 5; j++) x.fillRect(-42, -56 + j * 24, 70 + (j % 2) * 14, 7)
    x.restore()
  }
}
function tray(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -12, 340, 34); x.fillStyle = '#d8dbe8'; x.fillRect(-162, -6, 324, 22)
  const n = 6 - Math.floor(clamp((lt - 0.6) / 1.2) * 5)
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(-140 + i * 50, -46, 36, 40); x.fillStyle = [ORANGE, PINK, GREEN][i % 3]; x.fillRect(-136 + i * 50, -42, 28, 34) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Bought it. | *Then* checked the price.', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.3],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'MINE!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, tail: 'bl' })
      drawBits(x, TAG, { K: INK, T: GOLD }, 800, 880, 30 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: -0.2 })
      label(x, 800, 1100, 'RECEIPT: OUCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Budget: zero. | Still *the nice cheese.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CHEESE, CHEESE_C, 800, 880, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      sparkles(x, t, 800, 880, P.t0 + 1.0, 7, 170, 0.2)
      label(x, 800, 1100, 'ESSENTIAL ITEM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Ten budget planners. | *Zero budgets.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.2) * 10)
      for (let i = 0; i < n; i++) { const px = 680 + (i % 4) * 80 - (i > 7 ? -80 : 0), py = 660 + Math.floor(i / 4) * 130; x.fillStyle = INK; x.fillRect(px - 32, py - 46, 64, 92); x.fillStyle = [PINK, MINT, SKYB, LAV, GOLD][i % 5]; x.fillRect(px - 26, py - 40, 52, 80) }
      label(x, 800, 1110, 'PAGES USED: 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Kept every receipt. | *Sentimental reasons.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      receiptPile(x, t, 800, 980, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 800, 640, 'our first coffee!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: PINK, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Totally broke. | Still *tipped big.*', mood: 'sparkle', star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { const d = prog(lt, 0.4 + i * 0.15, 0.9 + i * 0.15); if (d > 0) drawBits(x, COIN, COIN_C, 700 + i * 50, lerp(620, 960 - i * 20, ease.outBounce ? ease.outBounce(d) : d), 12) }
      label(x, 800, 1100, 'WALLET: EMPTY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'keep the change', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Price-compared | *one banana.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BANANA, BANANA_C, 800, 640, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      ;['SHOP A: 31¢', 'SHOP B: 29¢', 'SHOP C: 30¢'].forEach((s, i) => label(x, 800, 820 + i * 100, s, pop01(t, P.t0 + 0.6 + i * 0.35, 0.3, 2.2), { size: 32, bg: i === 1 ? MINT : BONE, rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 }))
    } },
  { sign: 'libra', cap: 'Returned it. | Bought *the other colour.*', mood: lt => lt > 1.4 ? 'squint' : 'sparkle', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const pick = Math.floor(lt * 2) % 2
      drawBits(x, SHIRT, { C: PINK }, 710, 870 + (pick ? -30 : 0), 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SHIRT, { C: '#ff9fb8' }, 890, 870 + (pick ? 0 : -30), 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 800, 1100, 'SAME PINK. DIFFERENT.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Never forgets | who owes *four bucks.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(800, 870); x.rotate(0.04); x.scale(k, k); x.fillStyle = INK; x.fillRect(-140, -170, 280, 340); x.fillStyle = '#2a2350'; x.fillRect(-132, -162, 264, 324)
        x.fillStyle = RED; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('OWED', 0, -116)
        x.fillStyle = CREAM; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; ['gemini: $4', 'since 2019', 'interest: ✓'].forEach((s, i) => x.fillText(s, -110, -50 + i * 60)); x.restore() }
      label(x, 800, 1110, 'NEVER FORGOTTEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Dinner tonight? | *Free samples.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -180 }, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      tray(x, 760, 900, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 690, 'LAP 6 OF THE SHOP', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1100, 'so full', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Has a budget | *for the budget.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 800, 660, 'BUDGET', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 44, bg: MINT, rot: -0.04 })
      label(x, 800, 800, 'BUDGET (BUDGET)', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04 })
      label(x, 800, 930, 'BUDGET³', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04 })
      label(x, 800, 1100, 'UNDER BUDGET: 0.01¢', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Too pricey? | *Built their own* toaster.', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, TOAST, TOAST_C, 800, 880 + (lt > 1.3 && lt < 1.6 ? -10 : 0), 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (lt > 1.3) { const up = ease.outCubic(prog(lt, 1.3, 1.8)); x.fillStyle = INK; x.fillRect(758, 760 - up * 120, 84, 64); x.fillStyle = '#e9b26a'; x.fillRect(764, 766 - up * 120, 72, 52) }
      label(x, 800, 1110, 'IT (MOSTLY) WORKS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw the price tag. | *Wept.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TAG, { K: INK, T: PINK }, 800, 850, 32 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      label(x, 800, 1080, 'IT WAS A SOCK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t088', key: 'E', accent: GREEN, ending: 'group',
  title: 'Zodiacs on a budget | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Payday tomorrow. | *Rich for a day.*',
    draw(x, t, lt) {
      for (let i = 0; i < 14; i++) { const ph = ((lt - 1.2) * 0.6 + i / 14) % 1; if (lt < 1.2) break; drawBits(x, COIN, COIN_C, 120 + (i * 137) % 840, 560 + ph * 420, 10, { alpha: Math.sin(Math.PI * ph) }) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
