// r2t0746: star_talk, ROLLCALL, "The signs | *at brunch.*" (~54 s vertical, signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each the most extreme brunch version of itself:
//   Aries ordered before sitting · Taurus vs the pancake tower · Gemini talked, never ate · Cancer brought muffins from home
//   · Leo picked the table for the lighting · Virgo sent the eggs back three times · Libra: sweet or savoury, forever
//   · Scorpio sat facing every door · Sagittarius turned it into a road trip · Capricorn brought an agenda
//   · Aquarius asked the waiter's rising sign · Pisces cried at the latte art
//  49.2  group beat (the ending): "Brunch for twelve. | *Twelve receipts.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a'
const PANCAKE = ['..PPPPPPPP..', '.PPPPPPPPPP.', 'DDDDDDDDDDDD']
const PANCAKE_C = { P: '#f2c27a', D: '#b5743a' }
const MUFFIN = ['...BBBB...', '.BBBKBBBB.', 'BBKBBBBKBB', 'BBBBBBBBBB', '.WPWPWPWP.', '.WPWPWPWP.', '..WPWPWP..']
const MUFFIN_C = { B: '#b5743a', K: '#5a3420', W: CREAM, P: PINK }
const EGG = ['..WWWW..', '.WWWWWW.', 'WWWYYWWW', 'WWYYYYWW', 'WWWYYWWW', '.WWWWWW.']
const EGG_C = { W: '#ffffff', Y: '#ffd23a' }
const LATTE = ['.WWWWWWWW...', 'WCCCCCCCCW..', 'WCCHCCHCCWWW', 'WCCHHHHCCW.W', 'WCCCHHCCCW.W', 'WCCCCCCCCWWW', '.WCCCCCCW...', '..WWWWWW....']
const LATTE_C = { W: BONE, C: '#b5743a', H: CREAM }

function receipt(x, cx, cy, k, rot, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-58, -78, 116, 156); x.fillStyle = '#ffffff'; x.fillRect(-52, -72, 104, 144)
  x.fillStyle = STEEL; for (let i = 0; i < 4; i++) x.fillRect(-38, -50 + i * 22, 76, 8)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`#${n}`, 0, 50)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ordered for the table | before *sitting down.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', star: { x: -160 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bubble(x, 780, 650, 'EVERYTHING. GO.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      sheet(x, 790, 900, pop01(t, P.t0 + 0.7, 0.35, 2), { w: 300, h: 250, head: 'ORDER', headBg: RED, lines: ['all of page 1', 'all of page 2', 'pancakes x5'], size: 28, align: 'left', progress: clamp((lt - 0.8) / 0.8) })
      L(x, 790, 1110, 'SEATED: NOT YET', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Bottomless pancakes? | *Challenge accepted.*', mood: lt => lt > 1.8 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(14, Math.floor(clamp((lt - 0.3) / 1.6) * 14) + 1)
      for (let i = 0; i < n; i++) drawBits(x, PANCAKE, PANCAKE_C, 790 + Math.sin(i * 1.7) * 8, 1110 - i * 34, 14)
      L(x, 790, 600, `STACK: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), MINT, 0.05, 36)
      bubble(x, 420, 640, 'keep them | coming', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'gemini', cap: 'Talked for two hours. | Food *untouched.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'PLATE', 790, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const TOP = ['so my chart says…', 'okay but ALSO', 'wait, one more']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.6))
      bubble(x, 780, 660, TOP[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 850, 'BITES: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.05, 36)
    } },
  { sign: 'cancer', cap: 'Brought muffins from home. | *To a restaurant.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, MUFFIN, MUFFIN_C, 720, 960, 14 * k); drawBits(x, MUFFIN, MUFFIN_C, 860, 980, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      drawBits(x, MUFFIN, MUFFIN_C, 790, 850, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 790, 640, 'JUST IN CASE ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 34)
      hearts(x, t, 790, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Chose the table | for the *lighting.*', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    back(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.3, 0.7))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#ffe7a8'
      x.beginPath(); x.moveTo(F.x - 40, 470); x.lineTo(F.x + 40, 470); x.lineTo(F.x + 190, 1140); x.lineTo(F.x - 190, 1140); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      L(x, 790, 720, 'GOLDEN HOUR', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.05, 36)
      bubble(x, 790, 920, 'take ten more', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 370, 800, P.t0 + 0.9, 7, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Sent the eggs back. | *Three times.*', mood: lt => lt > 1.6 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.55))
      const wob = Math.sin(lt * 20) * 0.03
      bits(x, 'PLATE', 790, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: wob })
      drawBits(x, EGG, EGG_C, 790, 960, 11 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 760, `ATTEMPT ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), RED, 0.05, 38)
      bubble(x, 790, 620, 'a bit less runny?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Sweet or savoury? | *Still deciding.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const side = Math.floor(lt * 2) % 2
      L(x, 690, 780, 'SWEET', pop01(t, P.t0 + 0.3, 0.3, 2) * (side ? 0.8 : 1.15), PINK, -0.06, 38)
      L(x, 880, 900, 'SAVOURY', pop01(t, P.t0 + 0.5, 0.3, 2) * (side ? 1.15 : 0.8), MINT, 0.06, 38)
      bits(x, 'CLOCK', 790, 620, 12 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 790, 1090, 'WAITER: LEFT', pop01(t, P.t0 + 1.8, 0.3, 2.4), STEEL, -0.03, 30)
    } },
  { sign: 'scorpio', cap: 'Sat facing | *every door.*', mood: 'squint', look: lt => [Math.round(Math.sin(lt * 4)), 0], star: { x: -170 },
    front(x, t, lt, P) {
      const doors = [[650, 760], [930, 760], [790, 1020]]
      doors.forEach(([dx, dy], i) => { L(x, dx, dy, 'DOOR', pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2), STEEL, (i - 1) * 0.06, 32) })
      L(x, 790, 610, 'ALL EXITS: SEEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#c04a8a', 0.04, 30)
      bubble(x, 790, 900, 'just in case.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Brunch became | a *road trip.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      bits(x, 'MAP', 790, 830, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 })
      bits(x, 'SUITCASE', 800, 1040, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 790, 640, 'NEXT STOP: ???', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
      bubble(x, 420, 640, 'check, | please!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Brought an *agenda.* | To brunch.', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 320, h: 330, head: 'AGENDA', headBg: '#6b62a8', lines: ['1. toast', '2. eggs', '3. Q3 goals', '4. leave 11:59'], size: 28, align: 'left', progress: clamp((lt - 0.4) / 1.1) })
      L(x, 790, 1110, 'MINUTES: TAKEN', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Asked the waiter | their *rising sign.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 1000, 190 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 19, glyph: false })
      bubble(x, 760, 650, 'and your rising?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 820, 820, 'BIRTH CHART: PENDING', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 26)
    } },
  { sign: 'pisces', cap: 'Cried at | the *latte art.*', mood: 'wide', tears: 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LATTE, LATTE_C, 800, 950, 20 * pop01(t, P.t0 + 0.25, 0.3, 2))
      steam(x, t, 780, 860, { n: 3, h: 120 })
      L(x, 790, 680, 'IT’S A LITTLE HEART', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.04, 30)
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0746', key: 'C', accent: ACC, ending: 'group',
  title: 'The signs | *at brunch.*',
  cameos: CAMEOS,
  group: {
    cap: 'One table. | *Twelve receipts.*',
    draw(x, t, lt) {
      for (let i = 0; i < 12; i++) receipt(x, 150 + (i % 6) * 156 + (i >= 6 ? 78 : 0), 560 + Math.floor(i / 6) * 130 + Math.sin(i * 2.1) * 12, 0.8 * pop01(t, t - lt + 1.4 + i * 0.12, 0.3, 2), Math.sin(i * 1.3) * 0.25, i + 1)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
