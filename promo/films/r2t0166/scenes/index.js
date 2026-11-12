// r2t0166: THE SIGNS AS… v3, ROLLCALL, "The signs | as waiters." (~57 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "The signs | *as waiters.*"
//   3.6–49.2   ♈ served all twelve tables in one lap · ♉ recommended the bread, brought six baskets · ♊ forgot your
//              order, knows your whole life · ♋ asked if you've eaten (you're at a restaurant) · ♌ signed your receipt
//              like an autograph · ♍ re-folded your napkin while you used it · ♎ asked "still or sparkling?", couldn't
//              choose · ♏ brought "your usual" on your first visit · ♐ pulled up a chair, joined your date · ♑ the bill
//              came with a five-year plan · ♒ today's special: a dish from 2090 · ♓ you tipped a little extra, happy tears
//  49.2        "Five-star service. | *Wrong table.*"
//  52.6        callback: "Libra’s still | *deciding.*"  the two glasses come back; Libra looks from one to the other.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, plate, glass, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffb34a'
const ST = { x: -170 }

const BREAD = ['..WWWWW..', '.WBWWWBW.', 'WWWWBWWWW', 'WBWWWWWBW', '.WWWWWWW.']
const BASKET = ['KKKKKKKKKKK', 'BbBbBbBbBbB', '.bBbBbBbBb.', '..BbBbBbB..']
const BREAD_C = { W: '#e8a24a', B: '#c4782e' }, BASKET_C = { K: '#8a4a2e', B: '#c98f2a', b: '#a8702a' }
const CHAIR = ['BB.......', 'BB.......', 'BB.......', 'BB.......', 'BBBBBBBBB', 'BBBBBBBBB', 'BB.....BB', 'BB.....BB', 'BB.....BB']
const CUBE = ['..CCCC..', '.CCCCCC.', 'CCDCCDCC', 'CCCCCCCC', 'CDCCCCDC', '.CCCCCC.', '..CCCC..']
const SWAN = ['.....WW.', '....WWWO', '....WW..', '....W...', 'W...W...', 'WWWWWW..', '.WWWWW..']

/** the receipt: a tall cream slip; rows is a list of [text, size] */
function receipt(x, cx, cy, k, rows, { rot = 0.05, w = 260, h = 340 } = {}) {
  card(x, cx, cy, w, h, k, { bg: CREAM, rot }, () => {
    x.fillStyle = CREAM; for (let i = 0; i < 9; i++) { x.beginPath(); x.moveTo(-w / 2 + i * w / 9, h / 2); x.lineTo(-w / 2 + (i + 0.5) * w / 9, h / 2 + 14); x.lineTo(-w / 2 + (i + 1) * w / 9, h / 2); x.fill() }
    rows.forEach(([s, size, col], i) => txt(x, s, 0, -h / 2 + 46 + i * 52, { size: size || 26, font: MONO, weight: 700, color: col || INK }))
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Served all twelve tables | *in one lap.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', star: { x: -160 }, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const n = Math.min(6, 1 + Math.floor(prog(lt, 0.3, 1.3) * 6))
      for (let i = 0; i < n; i++) plate(x, 790 + Math.sin(i * 1.7) * 12, 1010 - i * 58, k, () => { x.fillStyle = [RED, GREEN, SUN, ORANGE, PINK, MINT][i]; x.beginPath(); x.ellipse(0, -10, 50, 18, 0, 0, Math.PI * 2); x.fill() }, { r: 100 })
      // speed lines behind the star
      if (lt > 0.4) { x.fillStyle = 'rgba(239,230,214,0.5)'; for (let i = 0; i < 4; i++) x.fillRect(F.x - 260 - i * 18, F.cy - 70 + i * 46, 140 - i * 20, 10) }
      label(x, 790, 1130, 'TABLES: 12/12', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Recommended the bread. | Brought *six baskets.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(prog(lt, 0.3, 1.6) * 6))
      for (let i = 0; i < n; i++) {
        const bx = 720 + (i % 2) * 150, by = 1060 - Math.floor(i / 2) * 150, kk = pop01(t, P.t0 + 0.3 + i * 0.2, 0.25, 2)
        drawBits(x, BASKET, BASKET_C, bx, by + 30, 13 * kk)
        drawBits(x, BREAD, BREAD_C, bx, by - 6, 12 * kk)
      }
      bubble(x, 800, 600, 'it’s SO good', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Forgot your order. | Knows your *whole life.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const ROWS = [['ORDER: ???', 28, RED], ['SIGN: LIBRA', 26], ['CAT: MOCHI', 26], ['EX: “a lot”', 26], ['DREAM: BAKERY', 24]]
      const n = Math.min(5, Math.floor(prog(lt, 0.4, 1.9) * 5) + 1)
      card(x, 790, 850, 300, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff9c8', rot: 0.05 }, () => {
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) x.fillRect(-150, -130 + i * 60, 300, 3)
        ROWS.slice(0, n).forEach(([s, size, col], i) => txt(x, s, 0, -150 + i * 62, { size, font: MONO, weight: 700, color: col || INK }))
      })
      bubble(x, 790, 600, 'and your mom?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Asked if you’ve eaten. | *You’re at a restaurant.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 810, 980, 170 * k, { mood: 'wide', look: [-1, 0], seed: 14, glyph: false })
      bubble(x, 760, 640, 'have you eaten | today, sweetie?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl', col: PINK })
      label(x, 810, 1130, 'MENU: IN HAND', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Signed your receipt. | *Like an autograph.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      receipt(x, 790, 860, k, [['TOTAL ......', 26], ['THANK YOU', 26]])
      if (k > 0.5) {
        const p = prog(lt, 0.6, 1.5)
        x.save(); x.translate(790, 860); x.rotate(0.05)
        x.strokeStyle = '#d23a8a'; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath()
        for (let i = 0; i <= 40 * p; i++) { const u = i / 40; const px = -100 + u * 200, py = 40 + Math.sin(u * 18) * 24 - u * 20; i ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke(); x.restore()
      }
      label(x, 790, 1110, 'XOXO, LEO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 790, 880, P.t0 + 1.5, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Re-folded your napkin | *while you used it.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SWAN, { W: '#ffffff', O: ORANGE }, 800, 860, 30 * k)
      const n = 1 + Math.floor(prog(lt, 0.5, 2.0) * 8)
      label(x, 800, 650, `FOLD #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1090, 'one sec, crease.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Asked “still or sparkling?” | Then *couldn’t choose.*', mood: 'neutral', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const a = Math.floor(lt * 2.4) % 2
      glass(x, t, 700, 900, k * (a ? 0.9 : 1.08), {})
      glass(x, t, 880, 900, k * (a ? 1.08 : 0.9), { bubbles: true, fillCol: '#d6f5ff' })
      txt(x, 'STILL', 700, 1020, { size: 28, font: MONO, weight: 700, color: BONE })
      txt(x, 'SPARKLING', 880, 1020, { size: 28, font: MONO, weight: 700, color: BONE })
      bubble(x, 790, 650, 'hmm. | both? neither?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1120, 'DECIDING…', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Brought “your usual.” | *First time here.*', mood: lt => lt > 1.1 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      plate(x, 800, 960, pop01(t, P.t0 + 0.2, 0.3, 2), () => { x.fillStyle = '#e8a24a'; x.fillRect(-60, -46, 120, 40); x.fillStyle = GREEN; x.fillRect(-50, -58, 100, 14); x.fillStyle = '#8a4a2e'; x.fillRect(-60, -18, 120, 14) }, { r: 120 })
      bubble(x, 790, 660, 'the usual.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
      label(x, 800, 1110, 'YOUR VISITS: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Pulled up a chair. | *Joined your date.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -60, y: 20 },
    back(x, t, lt, P) {
      drawBits(x, CHAIR, { B: WOOD }, 560, 1060, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'libra', 300, 960, 150 * k, { mood: 'wide', look: [1, 0], seed: 21, glyph: false }); signChar(x, t, 'taurus', 820, 960, 150 * k, { mood: 'wide', look: [-1, 0], seed: 22, glyph: false }) }
      bubble(x, 560, 620, 'so how’d you | two meet?!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 560, 1150, 'PARTY OF 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'The bill came | with *a five-year plan.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const n = Math.min(5, Math.floor(prog(lt, 0.4, 1.7) * 5) + 1)
      receipt(x, 790, 850, k, [['YOUR PLAN', 28, RED], ...['YR 1: SAVE', 'YR 2: INVEST', 'YR 3: ASSETS', 'YR 5: DESSERT'].slice(0, n - 1).map(s => [s, 24])], { h: 360 })
      label(x, 790, 1110, 'NO MINTS. GOALS.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Today’s special: | *a dish from 2090.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      plate(x, 800, 1000, k, null, { r: 120 })
      const g = pop01(t, P.t0 + 0.6, 0.4, 2)
      x.save(); x.shadowColor = SKYB; x.shadowBlur = 30
      drawBits(x, CUBE, { C: '#6fe8ff', D: '#ffffff' }, 800, 920 + Math.sin(t * 3) * 10, 16 * g, { rot: t * 0.8 })
      x.restore()
      label(x, 800, 680, 'FLAVOUR: FUTURE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1130, 'trust me.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'You tipped a little extra. | *Happy tears.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      receipt(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), [['TIP ✓', 30], ['have a', 24], ['lovely day!', 24]], { h: 240, w: 240 })
      bubble(x, 800, 1090, 'you’re so | KIND', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl', col: PINK })
      hearts(x, t, 800, 800, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0166', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs | *as waiters.*',
  cameos: CAMEOS,
  group: { cap: 'Five-star service. | *Wrong table.*' },
  last: {
    text: 'Libra’s still | *deciding.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      const a = Math.floor(Math.max(0, lt - 1.2) * 2.4) % 2
      if (k > 0.01) signChar(x, t, 'libra', 540, 1000, 300 * k, { mood: 'neutral', look: [a ? 1 : -1, 0], seed: 51 })
      glass(x, t, 300, 1180, 1.3 * pop01(t, t - lt + 0.9, 0.35, 2), {})
      glass(x, t, 780, 1180, 1.3 * pop01(t, t - lt + 1.0, 0.35, 2), { bubbles: true, fillCol: '#d6f5ff' })
      label(x, 540, 1420, 'TABLE 4: STILL WAITING', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
